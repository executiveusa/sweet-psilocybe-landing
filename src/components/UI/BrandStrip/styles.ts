'use client';
import { styled } from 'styled-components';

export const Wrapper = styled.section`
  background-color: var(--Background);
`;

export const Inner = styled.div`
  max-width: 1440px;
  width: 90%;
  margin: 8rem auto;
  padding: 4rem 0;

  @media (max-width: 768px) {
    margin: 4rem auto;
    padding: 2rem 0;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 6rem;

  h1 {
    font-size: 4rem;
    font-weight: 600;
    color: var(--white);
  }

  p {
    max-width: 41.75rem;
    color: var(--light-gray);
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.75rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
    
    h1 {
      font-size: 2.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

export const Pillars = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const PillarCard = styled.div`
  position: relative;
  overflow: hidden;
  padding: 3rem 2.5rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    background: rgba(246, 175, 207, 0.05);
    box-shadow: 0 20px 40px rgba(246, 175, 207, 0.15);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const IconWrapper = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

export const PillarTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const PillarDescription = styled.p`
  color: var(--light-gray);
  font-size: 1.125rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
