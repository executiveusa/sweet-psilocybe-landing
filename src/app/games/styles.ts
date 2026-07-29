"use client";
import { styled } from "styled-components";
import Link from "next/link";

export const GamesWrapper = styled.main`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const GamesHero = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #ffffff 0%, #f6afcf 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.25rem;
    color: rgb(var(--fern));
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
`;

export const GameCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(246, 175, 207, 0.3);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 10px 30px rgba(246, 175, 207, 0.1);
  }
`;

export const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
    color: rgb(var(--cream));
    line-height: 1.3;
    max-width: 75%;
  }
`;

export const TechBadge = styled.span<{ $type?: "html5" | "webgl" | "threejs" | "p5js" }>`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-weight: 600;
  
  background: ${props => {
    switch(props.$type) {
      case 'webgl': return 'rgba(246, 175, 207, 0.15)';
      case 'threejs': return 'rgba(169, 192, 176, 0.15)';
      case 'p5js': return 'rgba(255, 237, 238, 0.15)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  
  color: ${props => {
    switch(props.$type) {
      case 'webgl': return 'rgb(var(--petal))';
      case 'threejs': return 'rgb(var(--fern))';
      case 'p5js': return 'rgb(var(--spore))';
      default: return 'rgba(255, 255, 255, 0.8)';
    }
  }};
`;

export const GameDescription = styled.p`
  color: rgba(247, 243, 239, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
  flex-grow: 1;
`;

export const PlayButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem;
  border-radius: 0.75rem;
  background: rgba(246, 175, 207, 0.1);
  color: rgb(var(--petal));
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid rgba(246, 175, 207, 0.2);

  &:hover {
    background: rgba(246, 175, 207, 0.2);
    transform: translateY(-2px);
  }
`;
