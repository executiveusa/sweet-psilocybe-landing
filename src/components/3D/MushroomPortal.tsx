'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

interface MushroomPortalProps {
  position: [number, number, number];
  color: string;
  label: string;
  href: string;
  scale?: number;
}

export default function MushroomPortal({ position, color, label, href, scale = 1 }: MushroomPortalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const initialY = position[1];
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 1.5 + timeOffset) * 0.2;
      const targetScale = hovered ? scale * 1.1 : scale;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        router.push(href);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Stem */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 2, 16]} />
        <meshStandardMaterial color="#F7F3EF" roughness={0.8} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 2, 0]} scale={[1.5, 0.7, 1.5]} castShadow>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.2} 
        />
      </mesh>
      
      {/* Light for the glow */}
      <pointLight position={[0, 2, 0]} color={color} intensity={hovered ? 2 : 1} distance={5} />

      {/* Floating Label */}
      <Html position={[0, 3, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: '#F7F3EF',
          background: 'rgba(11, 11, 11, 0.6)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          border: `1px solid ${color}`,
          backdropFilter: 'blur(4px)',
          opacity: hovered ? 1 : 0.7,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.2s ease',
          boxShadow: hovered ? `0 0 10px ${color}` : 'none'
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}
