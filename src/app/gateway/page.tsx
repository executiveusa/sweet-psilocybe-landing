'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { GatewayContainer, OverlayText, SkipLink, LoadingFallback } from './styles';

// Dynamically import the scene to prevent SSR issues with Three.js
const GatewayScene = dynamic(() => import('@/components/3D/GatewayScene'), {
  ssr: false,
  loading: () => <LoadingFallback>Entering the Mushroom Forest...</LoadingFallback>
});

export default function GatewayPage() {
  return (
    <GatewayContainer>
      <SkipLink href="/">Skip to Home &rarr;</SkipLink>
      
      <Suspense fallback={<LoadingFallback>Entering the Mushroom Forest...</LoadingFallback>}>
        <GatewayScene />
      </Suspense>

      <OverlayText>Click a mushroom to explore</OverlayText>
    </GatewayContainer>
  );
}
