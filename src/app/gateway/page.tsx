'use client';

import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { GatewayContainer, OverlayText, SkipLink, LoadingFallback, ToggleButton } from './styles';

// Dynamically import the scene to prevent SSR issues with Three.js
const GatewayScene = dynamic(() => import('@/components/3D/GatewayScene'), {
  ssr: false,
  loading: () => <LoadingFallback>Entering the Mushroom Forest...</LoadingFallback>
});

export default function GatewayPage() {
  const [isNight, setIsNight] = useState(true);

  return (
    <GatewayContainer style={{ backgroundColor: isNight ? '#0B0B0B' : '#E6F0E8', transition: 'background-color 1s ease' }}>
      <SkipLink href="/">Skip to Home &rarr;</SkipLink>
      
      <ToggleButton onClick={() => setIsNight(!isNight)}>
        {isNight ? '☀️ Day Canopy' : '🌙 Night Bioluminescence'}
      </ToggleButton>

      <Suspense fallback={<LoadingFallback>Entering the Mushroom Forest...</LoadingFallback>}>
        <GatewayScene isNight={isNight} />
      </Suspense>

      <OverlayText style={{ color: isNight ? '#F7F3EF' : '#0B0B0B' }}>
        Click a mushroom to explore
      </OverlayText>
    </GatewayContainer>
  );
}

