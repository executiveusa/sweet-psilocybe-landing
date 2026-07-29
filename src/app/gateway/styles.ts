'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const GatewayContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0B0B0B;
  overflow: hidden;
  position: relative;
`;

export const OverlayText = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #F7F3EF;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  opacity: 0;
  animation: ${fadeIn} 2s ease-out 1s forwards;
  pointer-events: none;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const SkipLink = styled(Link)`
  position: absolute;
  top: 30px;
  right: 40px;
  color: #F7F3EF;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  z-index: 10;
  
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

export const LoadingFallback = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0B0B0B;
  color: #F6AFCF;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  z-index: 5;
`;
