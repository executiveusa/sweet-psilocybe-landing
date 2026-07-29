'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import MushroomPortal from './MushroomPortal';
import SporeParticles from './SporeParticles';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function GatewayScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0B0B0B']} />
        <fogExp2 attach="fog" args={['#0B0B0B', 0.05]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} color="#F7F3EF" />

        <Suspense fallback={null}>
          <group position={[0, -2, 0]}>
            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#050505" roughness={0.6} metalness={0.2} />
            </mesh>

            {/* Portals */}
            <MushroomPortal position={[-4, 0, -2]} color="#F6AFCF" label="Shop" href="/store" scale={1.2} />
            <MushroomPortal position={[-2, 0, -4]} color="#A9C0B0" label="Research" href="/blog" scale={1} />
            <MushroomPortal position={[0, 0, -1]} color="#FFEDEE" label="Home" href="/" scale={1.5} />
            <MushroomPortal position={[2, 0, -4]} color="#FFD700" label="Play" href="/games" scale={1} />
            <MushroomPortal position={[4, 0, -2]} color="#B19CD9" label="Library" href="/library" scale={1.2} />

            <SporeParticles count={300} />
          </group>

          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="night" />
        </Suspense>

        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={3}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
