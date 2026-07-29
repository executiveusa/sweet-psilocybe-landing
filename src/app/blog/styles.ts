"use client";
import { styled } from "styled-components";
import Link from "next/link";

export const BlogWrapper = styled.main`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const BlogHero = styled.div`
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
    margin-bottom: 2.5rem;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

export const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #f6afcf;
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

export const ArticleCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(246, 175, 207, 0.3);
    background: rgba(255, 255, 255, 0.05);
  }

  h2 {
    font-size: 1.5rem;
    color: rgb(var(--cream));
    margin: 1rem 0;
    line-height: 1.4;
  }

  p {
    color: rgba(247, 243, 239, 0.7);
    margin-bottom: 1.5rem;
    flex-grow: 1;
    line-height: 1.6;
  }
`;

export const ArticleTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(169, 192, 176, 0.15);
  color: rgb(var(--fern));
  font-weight: 600;
`;

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: rgba(247, 243, 239, 0.5);
  flex-wrap: wrap;
`;
