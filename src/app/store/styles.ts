'use client';
import { styled } from 'styled-components';

export const StoreWrapper = styled.main`
  background: var(--Background);
  min-height: 100vh;
  padding: 8rem 0 4rem;
  font-family: 'Inter', sans-serif;
`;

export const StoreHero = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 4rem;
  padding: 0 1.5rem;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    color: var(--light-gray);
    line-height: 1.6;
    max-width: 40rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(246, 175, 207, 0.15);

    img {
      transform: scale(1.05);
    }
  }
`;

export const ProductImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(246, 175, 207, 0.05) 0%, rgba(169, 192, 176, 0.05) 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
`;

export const ProductInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: var(--light-gray);
    line-height: 1.5;
    margin-bottom: 1.5rem;
    flex: 1;
  }
`;

export const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 1rem;
`;

export const ViewButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: rgba(246, 175, 207, 0.1);
  border: 1px solid rgba(246, 175, 207, 0.3);
  color: var(--primary);
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;

  ${ProductCard}:hover & {
    background: rgba(246, 175, 207, 0.2);
    border-color: var(--primary);
  }
`;
