"use client";

import React, { Component, Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SanctuaryCenterpiece from "./SanctuaryCenterpiece";
import type { GatewaySkinV1 } from "../spec";

interface TransparentModelStageProps {
  skin: GatewaySkinV1;
  isNight: boolean;
  reducedMotion: boolean;
  pointerOffset: { x: number; y: number };
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Isolates WebGL / GLB runtime failures so a missing WebGL context or corrupt model
 * never breaks the San Juan Islands painted backdrop or orbiting navigation wheel.
 */
class Gateway3DErrorBoundary extends Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(err: Error) {
    console.warn("[Gateway3DErrorBoundary] Falling back to 2D layered view:", err.message);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function ParallaxRig({
  pointerOffset,
  reducedMotion,
  children,
}: {
  pointerOffset: { x: number; y: number };
  reducedMotion: boolean;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current || reducedMotion) return;
    const targetRotY = pointerOffset.x * 0.28;
    const targetRotX = -pointerOffset.y * 0.12;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.06
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={0.78}>
      {children}
    </group>
  );
}

/**
 * Layer 5 (Piece #08 + Piece #05 slot):
 * True transparent Three.js Canvas floating directly OVER the painted PNW backdrop,
 * protected by Gateway3DErrorBoundary + webglcontextlost handler.
 */
export default function TransparentModelStage({
  skin,
  isNight,
  reducedMotion,
  pointerOffset,
}: TransparentModelStageProps) {
  const [webglLost, setWebglLost] = useState(false);

  if (webglLost) return null;

  return (
    <Gateway3DErrorBoundary>
      <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center">
        <Canvas
          className="h-full w-full"
          camera={{ position: [0, 1.35, 6.4], fov: 44 }}
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
          <ambientLight intensity={isNight ? 0.65 : 1.05} />
          <hemisphereLight
            args={[
              isNight ? "#89A6C4" : "#FFE0B5",
              isNight ? "#12211B" : "#2D4A3E",
              isNight ? 0.65 : 0.9,
            ]}
          />
          <directionalLight
            position={[4, 8, 6]}
            intensity={isNight ? 1.7 : 2.3}
            color={isNight ? "#F6AFCF" : "#FFE8C8"}
          />
          <directionalLight
            position={[-6, 4, -4]}
            intensity={1.1}
            color={isNight ? "#A9C0B0" : "#E5B8F4"}
          />

          <Suspense fallback={null}>
            <ParallaxRig
              pointerOffset={pointerOffset}
              reducedMotion={reducedMotion}
            >
              <SanctuaryCenterpiece
                skin={{
                  ...skin,
                  centerpiece: {
                    ...skin.centerpiece,
                    position: [0, -1.25, 0],
                  },
                }}
                isNight={isNight}
                motionState={isNight ? "night" : "day"}
                reducedMotion={reducedMotion}
              />
            </ParallaxRig>
          </Suspense>
        </Canvas>
      </div>
    </Gateway3DErrorBoundary>
  );
}
