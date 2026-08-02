'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import MushroomPortal from './MushroomPortal';
import SporeParticles from './SporeParticles';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface GatewaySceneProps {
  isNight?: boolean;
}

export default function GatewayScene({ isNight = true }: GatewaySceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bgColor = isNight ? '#0B0B0B' : '#A9C0B0';
  const fogColor = isNight ? '#0B0B0B' : '#E6F0E8';
  const dirLightColor = isNight ? '#F6AFCF' : '#FFF5E6';
  const dirLightIntensity = isNight ? 1 : 2.5;

  return (
    <div style={{ width: '100%', height: '100%', transition: 'background-color 1s ease' }}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[bgColor]} />
        <fogExp2 attach="fog" args={[fogColor, isNight ? 0.05 : 0.02]} />

        <ambientLight intensity={isNight ? 0.4 : 0.9} />
        <directionalLight 
          position={isNight ? [5, 10, 5] : [10, 20, 10]} 
          intensity={dirLightIntensity} 
          color={dirLightColor} 
          castShadow 
        />

        <Suspense fallback={null}>
          <group position={[0, -2, 0]}>
            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[60, 60]} />
              <meshStandardMaterial 
                color={isNight ? "#050505" : "#2D4A3E"} 
                roughness={0.6} 
                metalness={0.2} 
              />
            </mesh>

            {/* Portals */}
            <MushroomPortal position={[-4, 0, -2]} color="#F6AFCF" label="Shop" href="/store" scale={1.2} />
            <MushroomPortal position={[-2, 0, -4]} color="#A9C0B0" label="Research" href="/blog" scale={1} />
            <MushroomPortal position={[0, 0, -1]} color="#FFEDEE" label="Home" href="/" scale={1.5} />
            <MushroomPortal position={[2, 0, -4]} color="#FFD700" label="Play" href="/games" scale={1} />
            <MushroomPortal position={[4, 0, -2]} color="#B19CD9" label="Library" href="/library" scale={1.2} />

            <SporeParticles count={isNight ? 300 : 150} />
          </group>

          {isNight ? (
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          ) : null}

          <Environment preset={isNight ? "night" : "forest"} />
        </Suspense>

        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={3}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={isNight ? 0.5 : 0.3}
        />

        <EffectComposer>
          <Bloom luminanceThreshold={isNight ? 0.2 : 0.5} mipmapBlur intensity={isNight ? 1.5 : 0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

