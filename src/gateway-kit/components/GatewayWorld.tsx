"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import MushroomPortal from "@/components/3D/MushroomPortal";
import SporeParticles from "@/components/3D/SporeParticles";
import SanctuaryCenterpiece from "./SanctuaryCenterpiece";
import type { GatewayDoor, GatewayMotionState, GatewaySkinV1 } from "../spec";

interface GatewayWorldProps {
  skin: GatewaySkinV1;
  isNight: boolean;
  lang: "en" | "es";
  isMobile: boolean;
  reducedMotion: boolean;
  focusedDoor: GatewayDoor | null;
  onFocusDoor: (door: GatewayDoor | null) => void;
}

function CameraRig({
  skin,
  isMobile,
  focusedDoor,
  reducedMotion,
}: {
  skin: GatewaySkinV1;
  isMobile: boolean;
  focusedDoor: GatewayDoor | null;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const desiredPos = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (reducedMotion) return;
    const base = isMobile ? skin.camera.mobile.position : skin.camera.desktop.position;
    if (focusedDoor) {
      desiredPos.set(
        base[0] + focusedDoor.position[0] * 0.18,
        base[1] + 0.15,
        base[2] - 0.6
      );
    } else {
      desiredPos.set(base[0], base[1], base[2]);
    }
    camera.position.lerp(desiredPos, 0.035);
  });

  return null;
}

function ProceduralSkyDome({
  topColor,
  bottomColor,
}: {
  topColor: string;
  bottomColor: string;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      topColor: { value: new THREE.Color(topColor) },
      bottomColor: { value: new THREE.Color(bottomColor) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(() => {
    if (matRef.current) {
      matRef.current.uniforms.topColor.value.lerp(new THREE.Color(topColor), 0.06);
      matRef.current.uniforms.bottomColor.value.lerp(
        new THREE.Color(bottomColor),
        0.06
      );
    }
  });

  return (
    <mesh scale={[65, 65, 65]}>
      <sphereGeometry args={[1, 24, 16]} />
      <shaderMaterial
        ref={matRef}
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition).y;
            float factor = clamp(h * 0.7 + 0.35, 0.0, 1.0);
            gl_FragColor = vec4(mix(bottomColor, topColor, factor), 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function GatewayWorld({
  skin,
  isNight,
  lang,
  isMobile,
  reducedMotion,
  focusedDoor,
  onFocusDoor,
}: GatewayWorldProps) {
  const [webglLost, setWebglLost] = useState(false);

  const mode = isNight ? skin.world.modes.night : skin.world.modes.day;
  const cam = isMobile ? skin.camera.mobile : skin.camera.desktop;

  const motionState: GatewayMotionState = focusedDoor
    ? "focus"
    : isNight
      ? "night"
      : "day";

  const particleCount = reducedMotion
    ? skin.particles.reducedMotionCount
    : isMobile
      ? skin.particles.mobileCount
      : skin.particles.desktopCount;

  if (webglLost) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, ${mode.skyBottom}, ${mode.background})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F7F3EF",
          fontFamily: "Inter, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
            3D WebGL context paused — use the navigation doors below to explore.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        transition: "background-color 0.8s ease",
        backgroundColor: mode.background,
      }}
    >
      <Canvas
        shadows
        camera={{ position: cam.position, fov: cam.fov }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setWebglLost(true);
          });
        }}
      >
        <color attach="background" args={[mode.background]} />
        <fogExp2 attach="fog" args={[mode.fogColor, mode.fogDensity]} />

        {/* Part 02: Self-hosted procedural sky dome (zero external CDN/CSP risk) */}
        <ProceduralSkyDome
          topColor={mode.skyTop}
          bottomColor={mode.skyBottom}
        />

        {/* Part 03: Explicit Key / Fill / Rim / Hemisphere lighting */}
        <ambientLight intensity={mode.ambientIntensity} />
        <hemisphereLight
          args={[mode.skyTop, mode.groundColor, isNight ? 0.35 : 0.75]}
        />
        <directionalLight
          position={isNight ? [6, 12, 6] : [12, 18, 8]}
          intensity={mode.keyLightIntensity}
          color={mode.keyLightColor}
          castShadow
        />
        <directionalLight
          position={[-8, 6, -6]}
          intensity={mode.rimLightIntensity}
          color={mode.rimLightColor}
        />

        <CameraRig
          skin={skin}
          isMobile={isMobile}
          focusedDoor={focusedDoor}
          reducedMotion={reducedMotion}
        />

        <Suspense fallback={null}>
          {/* Ground Plane */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2.0, 0]}
            receiveShadow
          >
            <planeGeometry args={[80, 80]} />
            <meshStandardMaterial
              color={mode.groundColor}
              roughness={0.85}
              metalness={0.08}
            />
          </mesh>

          {/* Parts 05–17: Hero Enchanted Sanctuary + Companion */}
          <SanctuaryCenterpiece
            skin={skin}
            isNight={isNight}
            motionState={motionState}
            reducedMotion={reducedMotion}
          />

          {/* Part 20: 3D Portal Mushrooms driven from skin.navigation.doors */}
          <group position={[0, -2.0, 0]}>
            {skin.navigation.doors.map((door) => (
              <group
                key={door.id}
                onPointerOver={() => onFocusDoor(door)}
                onPointerOut={() => onFocusDoor(null)}
              >
                <MushroomPortal
                  position={door.position}
                  color={door.color}
                  label={`${door.icon} ${door.label[lang]}`}
                  href={door.href}
                  scale={door.scale}
                />
              </group>
            ))}

            {/* Part 18: Budget-capped Spore Particles */}
            {skin.particles.kind !== "none" && (
              <SporeParticles count={particleCount} />
            )}
          </group>

          {mode.showStars && (
            <Stars
              radius={90}
              depth={45}
              count={reducedMotion ? 800 : 3500}
              factor={3.5}
              saturation={0.15}
              fade
              speed={reducedMotion ? 0 : 0.8}
            />
          )}
        </Suspense>

        <OrbitControls
          enablePan={false}
          target={cam.target}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 2 - 0.06}
          minDistance={skin.camera.minDistance}
          maxDistance={skin.camera.maxDistance}
          autoRotate={!reducedMotion && !focusedDoor}
          autoRotateSpeed={isNight ? 0.45 : 0.28}
        />

        <EffectComposer>
          <Bloom
            luminanceThreshold={mode.bloomThreshold}
            mipmapBlur
            intensity={mode.bloomIntensity}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
