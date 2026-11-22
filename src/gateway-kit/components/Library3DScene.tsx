"use client";

import React, { Component, Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export type LibraryTab = "books" | "documentaries" | "movies";

interface Library3DSceneProps {
  activeTab: LibraryTab;
  onSelectTab: (tab: LibraryTab) => void;
}

class Library3DErrorBoundary extends Component<
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

function CenterGrimoire() {
  const { scene } = useGLTF("/models/blog-prop.glb");
  const ref = useRef<THREE.Group>(null);

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const factor = 1.85 / maxDim;
    clone.scale.setScalar(factor);
    clone.position.set(-center.x * factor, -center.y * factor, -center.z * factor);
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
    ref.current.position.y = 0.25 + Math.sin(state.clock.elapsedTime * 1.4) * 0.12;
  });

  return (
    <group ref={ref} position={[0, 0.25, 0]}>
      <primitive object={normalized} />
    </group>
  );
}

function InteractiveBookshelfWing({
  position,
  rotationY,
  label,
  icon,
  accent,
  isActive,
  onClick,
}: {
  position: [number, number, number];
  rotationY: number;
  label: string;
  icon: string;
  accent: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const books = useMemo(
    () => [
      { x: -0.62, h: 0.72, color: "#8C4A68" },
      { x: -0.38, h: 0.85, color: "#2F5241" },
      { x: -0.14, h: 0.66, color: "#6F538C" },
      { x: 0.1, h: 0.82, color: "#9C6B3B" },
      { x: 0.34, h: 0.74, color: "#3B6B5C" },
      { x: 0.58, h: 0.68, color: "#B85D82" },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetY =
      position[1] +
      (isActive ? 0.22 : hovered ? 0.12 : 0) +
      Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.05;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.08
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Carved cedar wood shelf plank */}
      <mesh position={[0, -0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.75, 0.12, 0.52]} />
        <meshStandardMaterial
          color="#3A271C"
          roughness={0.75}
          emissive={isActive || hovered ? accent : "#000000"}
          emissiveIntensity={isActive ? 0.22 : hovered ? 0.12 : 0}
        />
      </mesh>

      {/* Books standing on shelf */}
      {books.map((b, idx) => (
        <mesh key={idx} position={[b.x, -0.4 + b.h / 2, 0]} castShadow>
          <boxGeometry args={[0.19, b.h, 0.36]} />
          <meshStandardMaterial
            color={b.color}
            roughness={0.55}
            emissive={isActive ? accent : "#000000"}
            emissiveIntensity={isActive ? 0.18 : 0}
          />
        </mesh>
      ))}

      {/* Subtle accent halo light when active or hovered */}
      <pointLight
        position={[0, 0.3, 0.5]}
        color={accent}
        intensity={isActive ? 2.2 : hovered ? 1.4 : 0.4}
        distance={4}
      />

      <Html position={[0, 0.85, 0]} center style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: isActive
              ? "rgba(246, 175, 207, 0.92)"
              : "rgba(11, 13, 18, 0.82)",
            color: isActive ? "#0B0B0B" : "#F7F3EF",
            border: `1px solid ${accent}`,
            borderRadius: "999px",
            padding: "5px 14px",
            fontSize: "12px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            backdropFilter: "blur(8px)",
            boxShadow: isActive ? `0 0 18px ${accent}88` : "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          {icon} {label}
        </div>
      </Html>
    </group>
  );
}

/**
 * Interactive 3D Digital Mycology Library Stage for /library.
 * Click any 3D glowing bookshelf wing to switch between Books, Documentaries, and Movies.
 */
export default function Library3DScene({
  activeTab,
  onSelectTab,
}: Library3DSceneProps) {
  const [lost, setLost] = useState(false);

  const wings: Array<{
    id: LibraryTab;
    icon: string;
    label: string;
    hint: string;
    accent: string;
  }> = [
    {
      id: "books",
      icon: "📚",
      label: "Books Wing",
      hint: "7 verified global mycology works",
      accent: "#F6AFCF",
    },
    {
      id: "documentaries",
      icon: "🎥",
      label: "Documentaries Wing",
      hint: "6 clinical & ecological films",
      accent: "#A9C0B0",
    },
    {
      id: "movies",
      icon: "🎬",
      label: "Movies & Media",
      hint: "4 fungal cinema classics",
      accent: "#B19CD9",
    },
  ];

  if (lost) {
    return (
      <div className="mx-auto mb-10 grid max-w-4xl gap-4 rounded-3xl border border-fern/30 bg-[#0B0D12]/65 p-6 backdrop-blur-md sm:grid-cols-3">
        {wings.map((w) => {
          const isActive = activeTab === w.id;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => onSelectTab(w.id)}
              className={`rounded-2xl border p-5 text-left transition cursor-pointer ${
                isActive
                  ? "border-[#F6AFCF] bg-[#F6AFCF]/15"
                  : "border-white/15 bg-black/40 hover:border-white/35"
              }`}
            >
              <div className="text-2xl">{w.icon}</div>
              <div className="mt-2 font-bold text-[#F7F3EF]">{w.label}</div>
              <div className="mt-1 text-xs text-[#F7F3EF]/70">{w.hint}</div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <Library3DErrorBoundary>
      <div className="relative mx-auto mb-10 h-[340px] w-full max-w-4xl overflow-hidden rounded-3xl border border-fern/30 bg-[#0B0D12]/30 backdrop-blur-[4px] shadow-2xl sm:h-[400px]">
        <Canvas
          camera={{ position: [0, 0.8, 6.2], fov: 44 }}
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
          <ambientLight intensity={0.9} />
          <hemisphereLight args={["#A9C0B0", "#1A1F1C", 0.7]} />
          <directionalLight position={[5, 8, 6]} intensity={2.0} color="#FFEBD2" />
          <directionalLight position={[-6, 4, -4]} intensity={1.1} color="#B19CD9" />

          <Suspense fallback={null}>
            <CenterGrimoire />

            <InteractiveBookshelfWing
              position={[-2.45, -0.1, 0.35]}
              rotationY={0.35}
              label="Books"
              icon="📚"
              accent="#F6AFCF"
              isActive={activeTab === "books"}
              onClick={() => onSelectTab("books")}
            />
            <InteractiveBookshelfWing
              position={[0, -0.95, 1.35]}
              rotationY={0}
              label="Documentaries"
              icon="🎥"
              accent="#A9C0B0"
              isActive={activeTab === "documentaries"}
              onClick={() => onSelectTab("documentaries")}
            />
            <InteractiveBookshelfWing
              position={[2.45, -0.1, 0.35]}
              rotationY={-0.35}
              label="Movies & Media"
              icon="🎬"
              accent="#B19CD9"
              isActive={activeTab === "movies"}
              onClick={() => onSelectTab("movies")}
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 5}
            maxAzimuthAngle={Math.PI / 5}
          />
        </Canvas>

        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-4 py-1 text-[11px] font-medium tracking-wider uppercase text-cream/85 backdrop-blur-md">
          Drag to look around • Click any 3D shelf to filter the archive
        </div>
      </div>
    </Library3DErrorBoundary>
  );
}
