'use client';
import { styled } from 'styled-components';

export const DetailWrapper = styled.main`
  background: var(--Background);
  min-height: 100vh;
  padding: 8rem 0 4rem;
  font-family: 'Inter', sans-serif;
  color: var(--white);
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const BackLink = styled.div`
  margin-bottom: 2rem;
  
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--light-gray);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--primary);
    }
  }
`;

export const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ImageGallery = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 1.5rem;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--light-gray);
    margin-bottom: 2rem;
  }
`;

export const AddToCartBtn = styled.button`
  background: linear-gradient(135deg, var(--primary) 0%, #f39bc4 100%);
  color: var(--Background);
  font-size: 1.125rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(246, 175, 207, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
