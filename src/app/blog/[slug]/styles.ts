"use client";
import { styled } from "styled-components";
import Link from "next/link";

export const ArticleWrapper = styled.main`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.article`
  max-width: 800px;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(var(--fern));
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.2s ease;

  &:hover {
    color: rgb(var(--petal));
  }
`;

export const ArticleHeader = styled.header`
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
    color: rgb(var(--cream));

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

export const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(247, 243, 239, 0.6);
  font-size: 0.9rem;
  flex-wrap: wrap;

  span {
    display: inline-flex;
    align-items: center;
  }
`;

export const ArticleBody = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(247, 243, 239, 0.85);

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    color: rgb(var(--cream));
    margin: 2.5rem 0 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: rgb(var(--cream));
    margin: 2rem 0 1rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: rgb(var(--petal));
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  sup {
    font-size: 0.75rem;
    line-height: 0;
    vertical-align: super;
    margin-left: 2px;
    
    a {
      color: rgb(var(--fern));
      background: rgba(169, 192, 176, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      text-decoration: none;
    }
  }
`;

export const Citations = styled.section`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    font-size: 1.5rem;
    color: rgb(var(--cream));
    margin-bottom: 1.5rem;
  }

  ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    color: rgba(247, 243, 239, 0.6);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  li {
    margin-bottom: 1rem;
    
    a {
      color: rgb(var(--fern));
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const RelatedWidget = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;

  h3 {
    font-size: 1.25rem;
    color: rgb(var(--cream));
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.75rem;
  }
`;

export const RelatedArticle = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  h4 {
    color: rgb(var(--cream));
    font-size: 1rem;
    margin-bottom: 0.25rem;
    line-height: 1.4;
  }

  span {
    color: rgb(var(--fern));
    font-size: 0.8rem;
  }

  &:hover {
    h4 {
      color: rgb(var(--petal));
    }
  }
`;
