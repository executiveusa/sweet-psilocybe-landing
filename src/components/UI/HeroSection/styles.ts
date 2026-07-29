"use client";
import { styled } from "styled-components";

export const Wrapper = styled.section`
  margin-top: 6.25rem;
`;

export const Inner = styled.div`
  background: radial-gradient(
    circle at 50% 0%,
    rgba(246, 175, 207, 0.15),
    transparent 70%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  background-position: top center;
  background-size: contain;
`;

export const Pill = styled.div`
  display: flex;
  padding: 0.375rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 6.25rem;
  border: 0.2px solid #989898;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  margin-bottom: 1rem;

  span {
    color: var(--light-gray);
    font-size: 1rem;
    font-weight: 400;
  }
`;

export const HeroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 15rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;

  h1 {
    font-size: 4.8rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #ffffff 0%, #f6afcf 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeInUp 0.8s ease-out 0.4s both;

    @media (max-width: 1280px) {
      font-size: 3.6rem;
    }

    @media (max-width: 1024px) {
      font-size: 2.8rem;
    }

    @media (max-width: 768px) {
      font-size: 2rem;
      font-weight: 400;
      line-height: 1.2;
    }

    @media (max-width: 475px) {
      font-size: 1.6rem;
    }
  }

  p {
    max-width: 41.75rem;
    color: #bdbdbd;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.6;
    margin: 0 auto;
    animation: fadeInUp 0.8s ease-out 0.6s both;

    @media (max-width: 1280px) {
      font-size: 1rem;
    }

    @media (max-width: 1024px) {
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      font-size: 0.8rem;
      line-height: 1.5rem;
    }

    @media (max-width: 475px) {
      font-size: 0.72rem;
      line-height: 1.4;
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding-bottom: 6rem;
  }

  @media (max-width: 475px) {
    gap: 0.75rem;
    padding-bottom: 4rem;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ParallaxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  .parallax {
    overflow: hidden;
    white-space: nowrap;
  }

  .scroller {
    display: flex;
    font-size: 4rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
    color: var(--white);
  }

  @media (max-width: 768px) {
    .scroller {
      font-size: 1.8rem;
      letter-spacing: 0.125rem;
    }
  }
`;
