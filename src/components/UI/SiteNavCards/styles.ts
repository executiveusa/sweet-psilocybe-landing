import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

export const Section = styled.section`
  padding: 6rem 0;
  background-color: var(--background);
`;

export const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Card = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  backdrop-filter: blur(10px);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: rgba(246, 175, 207, 0.5); /* petal glow */
    box-shadow: 0 0 20px rgba(246, 175, 207, 0.2);
    transform: translateY(-5px);
  }
`;

export const Icon = styled.span`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: var(--light-gray);
  line-height: 1.5;
`;
