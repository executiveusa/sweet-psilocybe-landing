'use client';
import { styled } from 'styled-components';

export const Wrapper = styled.section`
  background: var(--Background);
  padding: 10rem 0;

  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`;

export const Inner = styled.div`
  max-width: 1440px;
  width: 90%;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 4rem;

  h2 {
    font-size: 4rem;
    font-weight: 700;
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
    margin-bottom: 2.5rem;
    
    h2 {
      font-size: 2.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
`;

export const ProductCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(246, 175, 207, 0.2);

    img {
      transform: scale(1.05);
    }
  }

  &:focus-within {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
`;

export const ProductImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(246, 175, 207, 0.1) 0%, rgba(169, 192, 176, 0.1) 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  /* Placeholder gradient if image doesn't exist */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    opacity: 0.1;
    z-index: -1;
  }
`;

export const ProductInfo = styled.div`
  padding: 1.5rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: var(--light-gray);
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;

    h3 {
      font-size: 1.125rem;
    }

    p {
      font-size: 0.875rem;
    }
  }
`;

export const ViewButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background: rgba(246, 175, 207, 0.1);
  border: 1px solid rgba(246, 175, 207, 0.3);
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(246, 175, 207, 0.2);
    border-color: var(--primary);
    transform: translateY(-2px);

    svg {
      transform: translateX(2px);
    }
  }

  &:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.8125rem;
  }
`;

export const StoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const StoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, var(--primary) 0%, #f39bc4 100%);
  color: var(--Background);
  font-size: 1.125rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(246, 175, 207, 0.3);

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(246, 175, 207, 0.4);

    svg {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
    justify-content: center;
  }
`;

export const ComingSoonBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background: rgba(246, 175, 207, 0.15);
  border: 1px solid rgba(246, 175, 207, 0.3);
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.875rem;
  }
`;
