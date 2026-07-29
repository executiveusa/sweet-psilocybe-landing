"use client";
import { styled, keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.section`
  padding: 4rem 0;
  background: linear-gradient(
    135deg,
    rgba(246, 175, 207, 0.1) 0%,
    rgba(169, 192, 176, 0.1) 100%
  );
  margin: 12rem 0 8rem 0;
`;

export const Inner = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
`;

export const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #f6afcf 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  @media (max-width: 1280px) {
    font-size: 2.8rem;
  }

  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 475px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #bdbdbd;
  font-weight: 400;
  line-height: 1.6;
  margin: 0 auto;
  max-width: 32rem;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  @media (max-width: 1280px) {
    font-size: 1.1rem;
  }

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 475px) {
    font-size: 0.8rem;
  }
`;
