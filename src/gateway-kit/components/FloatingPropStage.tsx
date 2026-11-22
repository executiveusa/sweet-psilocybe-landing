"use client";

import React, { Component, Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface FloatingPropStageProps {
  glbUrl: string;
  height?: number;
  accentColor?: string;
}

class PropErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function SpinningProp({ glbUrl }: { glbUrl: string }) {
  const { scene } = useGLTF(glbUrl);
  const groupRef = useRef<THREE.Group>(null);

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const factor = 2.2 / maxDim;
    clone.scale.setScalar(factor);
    clone.position.set(
      -center.x * factor,
      -center.y * factor,
      -center.z * factor
    );
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.45;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.3) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <primitive object={normalized} />
    </group>
  );
}

/**
 * Pieces #06 & #07: Lightweight, crash-proof floating 3D .glb prop header
 * for inner pages (/store and /blog), matching profilepalette's Hat & Staff props.
 */
export default function FloatingPropStage({
  glbUrl,
  height = 200,
  accentColor = "#F6AFCF",
}: FloatingPropStageProps) {
  const [lost, setLost] = useState(false);
  if (lost) return null;

  return (
    <PropErrorBoundary>
      <div
        className="pointer-events-none mx-auto w-full max-w-xs"
        style={{ height: `${height}px` }}
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0.2, 4.2], fov: 40 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setLost(true);
            });
          }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[4, 6, 5]} intensity={2.1} color="#FFF2DC" />
          <directionalLight position={[-5, 3, -4]} intensity={1.1} color={accentColor} />
          <Suspense fallback={null}>
            <SpinningProp glbUrl={glbUrl} />
          </Suspense>
        </Canvas>
      </div>
    </PropErrorBoundary>
  );
}
