"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { GatewayMotionState, GatewaySkinV1 } from "../spec";

interface SanctuaryCenterpieceProps {
  skin: GatewaySkinV1;
  isNight: boolean;
  motionState: GatewayMotionState;
  reducedMotion: boolean;
}

function GlbCenterpiece({
  url,
  scale,
}: {
  url: string;
  scale: number;
}) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} scale={scale} />;
}

/**
 * Parts 05–17: Sweet Psilocybe Enchanted Mushroom Sanctuary + Spore Sprite Companion.
 * Supports drop-in normalized Blender .glb via skin.centerpiece.glbUrl,
 * with a rich multi-mesh procedural sanctuary as default zero-404 fallback.
 */
export default function SanctuaryCenterpiece({
  skin,
  isNight,
  motionState,
  reducedMotion,
}: SanctuaryCenterpieceProps) {
  const rootRef = useRef<THREE.Group>(null);
  const spriteRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  const { materials, position, scale, mode, glbUrl } = skin.centerpiece;
  const { companion } = skin;

  // Satellite mushrooms arranged organically around the mossy mound
  const satellites = useMemo(
    () => [
      { pos: [-1.15, 0.08, 0.55] as [number, number, number], s: 0.42, rot: [0.12, 0.4, 0.18] as [number, number, number], color: materials.secondaryCap },
      { pos: [1.1, 0.05, 0.45] as [number, number, number], s: 0.36, rot: [-0.08, -0.5, -0.15] as [number, number, number], color: materials.primaryCap },
      { pos: [-0.75, 0.04, -0.9] as [number, number, number], s: 0.3, rot: [0.1, 1.1, 0.1] as [number, number, number], color: "#B19CD9" },
      { pos: [0.85, 0.06, -0.85] as [number, number, number], s: 0.34, rot: [-0.12, -1.2, -0.12] as [number, number, number], color: "#FFD700" },
      { pos: [0.15, 0.03, 1.15] as [number, number, number], s: 0.25, rot: [0.18, 0.2, -0.05] as [number, number, number], color: materials.secondaryCap },
    ],
    [materials.primaryCap, materials.secondaryCap]
  );

  // Bioluminescent spots on the hero cap
  const capSpots = useMemo(() => {
    const spots: Array<{ pos: [number, number, number]; size: number }> = [];
    const rings = [
      { y: 2.88, r: 0.72, count: 6, size: 0.1 },
      { y: 2.58, r: 1.25, count: 9, size: 0.12 },
      { y: 2.32, r: 1.56, count: 12, size: 0.09 },
    ];
    rings.forEach((ring, rIdx) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2 + rIdx * 0.4;
        spots.push({
          pos: [Math.cos(angle) * ring.r, ring.y, Math.sin(angle) * ring.r],
          size: ring.size,
        });
      }
    });
    return spots;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (reducedMotion) return;

    // Gentle organic breathing on the hero sanctuary
    if (rootRef.current) {
      const amp = motionState === "hover" || motionState === "focus" ? 0.08 : 0.04;
      rootRef.current.position.y = position[1] + Math.sin(t * 0.9) * amp;
      rootRef.current.rotation.y = Math.sin(t * 0.25) * 0.08;
    }

    // Orbiting Spore Sprite Companion (Part 17)
    if (spriteRef.current && companion.enabled) {
      const speed = motionState === "hover" ? 1.1 : 0.65;
      spriteRef.current.position.x = Math.cos(t * speed) * companion.orbitRadius;
      spriteRef.current.position.z = Math.sin(t * speed) * companion.orbitRadius;
      spriteRef.current.position.y =
        companion.orbitHeight + Math.sin(t * 2.1) * 0.35;
    }

    // Mycelium pulse ring at the base
    if (pulseRingRef.current) {
      const pulse = 1 + Math.sin(t * 1.4) * 0.06;
      pulseRingRef.current.scale.set(pulse, pulse, 1);
    }
  });

  const emissiveBoost = isNight ? 1.0 : 0.35;

  return (
    <group ref={rootRef} position={position} scale={scale}>
      {mode === "glb" && glbUrl ? (
        <GlbCenterpiece url={glbUrl} scale={1} />
      ) : (
        <group name="sweet-psilocybe-sanctuary">
          {/* Mossy forest sanctuary mound */}
          <mesh position={[0, -0.15, 0]} receiveShadow>
            <cylinderGeometry args={[1.9, 2.6, 0.5, 32]} />
            <meshStandardMaterial
              color={isNight ? "#15251F" : materials.moss}
              roughness={0.92}
              metalness={0.05}
            />
          </mesh>

          {/* Glowing mycelium halo ring */}
          <mesh
            ref={pulseRingRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.12, 0]}
          >
            <ringGeometry args={[1.85, 2.02, 48]} />
            <meshStandardMaterial
              color={materials.emissive}
              emissive={materials.emissive}
              emissiveIntensity={0.85 * emissiveBoost}
              transparent
              opacity={isNight ? 0.75 : 0.35}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Hero Mushroom Stem (tapered, organic silhouette) */}
          <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.24, 0.44, 2.3, 24]} />
            <meshStandardMaterial
              color={materials.stem}
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>

          {/* Hero Stem Annulus / Veil Ring */}
          <mesh position={[0, 1.72, 0]} rotation={[0.1, 0, 0]}>
            <torusGeometry args={[0.31, 0.06, 12, 24]} />
            <meshStandardMaterial
              color={materials.gills}
              emissive={materials.primaryCap}
              emissiveIntensity={0.25 * emissiveBoost}
              roughness={0.5}
            />
          </mesh>

          {/* Hero Mushroom Cap Dome */}
          <mesh position={[0, 2.15, 0]} scale={[1.75, 1.05, 1.75]} castShadow>
            <sphereGeometry
              args={[1, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.56]}
            />
            <meshStandardMaterial
              color={materials.primaryCap}
              emissive={materials.primaryCap}
              emissiveIntensity={0.48 * emissiveBoost}
              roughness={0.28}
              metalness={0.12}
            />
          </mesh>

          {/* Glowing Underside Gills Disc */}
          <mesh position={[0, 2.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.72, 36]} />
            <meshStandardMaterial
              color={materials.gills}
              emissive={materials.gills}
              emissiveIntensity={0.9 * emissiveBoost}
              roughness={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Bioluminescent Cap Spots */}
          {capSpots.map((spot, idx) => (
            <mesh key={idx} position={spot.pos}>
              <sphereGeometry args={[spot.size, 12, 12]} />
              <meshStandardMaterial
                color="#FFF7FA"
                emissive="#FFF0F6"
                emissiveIntensity={1.25 * emissiveBoost}
                roughness={0.2}
              />
            </mesh>
          ))}

          {/* Warm under-cap glow */}
          <pointLight
            position={[0, 1.9, 0]}
            color={materials.primaryCap}
            intensity={isNight ? 3.2 : 1.1}
            distance={8}
          />

          {/* Satellite Cluster Mushrooms */}
          {satellites.map((sat, idx) => (
            <group
              key={idx}
              position={sat.pos}
              rotation={sat.rot}
              scale={sat.s}
            >
              <mesh position={[0, 0.9, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.28, 1.8, 16]} />
                <meshStandardMaterial color={materials.stem} roughness={0.75} />
              </mesh>
              <mesh position={[0, 1.75, 0]} scale={[1.35, 0.85, 1.35]} castShadow>
                <sphereGeometry
                  args={[1, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]}
                />
                <meshStandardMaterial
                  color={sat.color}
                  emissive={sat.color}
                  emissiveIntensity={0.6 * emissiveBoost}
                  roughness={0.3}
                />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* Part 17: Orbiting Spore Sprite Companion */}
      {companion.enabled && (
        <group
          ref={spriteRef}
          position={[companion.orbitRadius, companion.orbitHeight, 0]}
        >
          <mesh>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial
              color={companion.color}
              emissive={companion.color}
              emissiveIntensity={1.8 * emissiveBoost}
              roughness={0.1}
            />
          </mesh>
          <pointLight
            color={companion.color}
            intensity={isNight ? 1.8 : 0.6}
            distance={4.5}
          />
        </group>
      )}
    </group>
  );
}
