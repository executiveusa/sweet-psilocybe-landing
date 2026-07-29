"use client";
import { styled } from "styled-components";
import Link from "next/link";

export const LibraryWrapper = styled.main`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const LibraryHero = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #ffffff 0%, #a9c0b0 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.25rem;
    color: rgba(247, 243, 239, 0.7);
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.$active ? 'rgba(169, 192, 176, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  background: ${props => props.$active ? 'rgba(169, 192, 176, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.$active ? 'rgb(var(--fern))' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.$active ? 'rgba(169, 192, 176, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
    color: ${props => props.$active ? 'rgb(var(--fern))' : 'rgb(var(--cream))'};
  }
`;

export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

export const MediaCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, rgb(var(--fern)), rgb(var(--petal)));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border-color: rgba(169, 192, 176, 0.3);

    &::before {
      opacity: 1;
    }
  }

  h2 {
    font-size: 1.5rem;
    color: rgb(var(--cream));
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
`;

export const MediaMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(247, 243, 239, 0.5);
  margin-bottom: 1rem;
  flex-wrap: wrap;

  span.highlight {
    color: rgb(var(--fern));
  }
`;

export const MediaDescription = styled.p`
  color: rgba(247, 243, 239, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

export const ViewLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(var(--petal));
  font-weight: 500;
  text-decoration: none;
  font-size: 0.95rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
  
  &::after {
    content: '→';
    font-size: 1.1em;
    transition: transform 0.2s ease;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`;
