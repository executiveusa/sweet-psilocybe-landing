"use client";

import React, { Component, Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SanctuaryCenterpiece from "./SanctuaryCenterpiece";
import type { GatewaySkinV1 } from "../spec";
import type { OrbitalNavItem } from "./OrbitalNavigation";

interface TransparentModelStageProps {
  skin: GatewaySkinV1;
  isNight: boolean;
  reducedMotion: boolean;
  pointerOffset: { x: number; y: number };
  activeDoor: OrbitalNavItem | null;
  spinTrigger: number;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class Gateway3DErrorBoundary extends Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(err: Error) {
    console.warn(
      "[Gateway3DErrorBoundary] Falling back to 2D layered view:",
      err.message
    );
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function InteractiveHeroRig({
  pointerOffset,
  reducedMotion,
  activeDoor,
  spinTrigger,
  accentColor,
  children,
}: {
  pointerOffset: { x: number; y: number };
  reducedMotion: boolean;
  activeDoor: OrbitalNavItem | null;
  spinTrigger: number;
  accentColor: string;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const burstRingRef = useRef<THREE.Mesh>(null);
  const spinOffsetRef = useRef(0);
  const lastTriggerRef = useRef(spinTrigger);
  const burstProgressRef = useRef(1);

  if (spinTrigger !== lastTriggerRef.current) {
    lastTriggerRef.current = spinTrigger;
    spinOffsetRef.current += Math.PI * 2;
    burstProgressRef.current = 0;
  }

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (groupRef.current) {
      const doorYaw = activeDoor
        ? Math.cos((activeDoor.angleDeg * Math.PI) / 180) * 0.42
        : 0;
      const targetRotY = pointerOffset.x * 0.3 + doorYaw + spinOffsetRef.current;
      const targetRotX = -pointerOffset.y * 0.14;
      const targetScale = activeDoor ? 0.98 : 0.92;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.075
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.07
      );
      const s = THREE.MathUtils.lerp(
        groupRef.current.scale.x,
        targetScale,
        0.08
      );
      groupRef.current.scale.setScalar(s);
    }

    // Celebratory glowing spore ring burst when Mushroom Spirit is clicked
    if (burstRingRef.current && burstProgressRef.current < 1) {
      burstProgressRef.current = Math.min(1, burstProgressRef.current + delta * 1.4);
      const p = burstProgressRef.current;
      const scale = 0.6 + p * 2.8;
      burstRingRef.current.scale.set(scale, scale, 1);
      const mat = burstRingRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - p) * 0.75;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]} scale={0.92}>
      {children}
      <mesh ref={burstRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <ringGeometry args={[0.9, 1.06, 48]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Layer 5 (Piece #08 + Piece #05 + Upgrade #2):
 * Transparent 3D Canvas with portal-tracking rotation, dynamic lantern accent glow,
 * and click-to-spin spore burst reaction.
 */
export default function TransparentModelStage({
  skin,
  isNight,
  reducedMotion,
  pointerOffset,
  activeDoor,
  spinTrigger,
}: TransparentModelStageProps) {
  const [webglLost, setWebglLost] = useState(false);

  if (webglLost) return null;

  const accentColor = activeDoor?.accent || "#FFE0A3";

  return (
    <Gateway3DErrorBoundary>
      <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center">
        <Canvas
          className="h-full w-full"
          camera={{ position: [0, 0.2, 5.2], fov: 42 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setWebglLost(true);
            });
          }}
        >
          <ambientLight intensity={isNight ? 0.85 : 1.25} />
          <hemisphereLight
            args={[
              isNight ? "#9BB8D8" : "#FFE6C2",
              isNight ? "#162A22" : "#2D4A3E",
              isNight ? 0.75 : 1.0,
            ]}
          />
          <directionalLight
            position={[4, 7, 6]}
            intensity={isNight ? 2.1 : 2.6}
            color={isNight ? "#F6AFCF" : "#FFF0D8"}
          />
          <directionalLight
            position={[-6, 4, -4]}
            intensity={1.35}
            color={isNight ? "#A9C0B0" : "#E5B8F4"}
          />
          {/* Dynamic lantern / portal-reactive accent light */}
          <pointLight
            position={[0, -0.25, 1.9]}
            intensity={activeDoor ? 2.4 : isNight ? 1.5 : 0.85}
            color={accentColor}
            distance={7}
          />

          <Suspense fallback={null}>
            <InteractiveHeroRig
              pointerOffset={pointerOffset}
              reducedMotion={reducedMotion}
              activeDoor={activeDoor}
              spinTrigger={spinTrigger}
              accentColor={accentColor}
            >
              <SanctuaryCenterpiece
                skin={{
                  ...skin,
                  centerpiece: {
                    ...skin.centerpiece,
                    position: [0, 0, 0],
                  },
                }}
                isNight={isNight}
                motionState={activeDoor ? "hover" : isNight ? "night" : "day"}
                reducedMotion={reducedMotion}
              />
            </InteractiveHeroRig>
          </Suspense>
        </Canvas>
      </div>
    </Gateway3DErrorBoundary>
  );
}
