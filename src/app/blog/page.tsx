"use client";

import { motion } from "framer-motion";
import {
  BlogWrapper,
  BlogHero,
  SearchContainer,
  SearchInput,
  ArticleGrid,
  ArticleCard,
  ArticleTags,
  Tag,
  ArticleMeta,
  StyledLink,
} from "./styles";

const SAMPLE_ARTICLES = [
  {
    slug: "psilocybin-research-2026",
    title: "The State of Psilocybin Research in 2026",
    excerpt: "A comprehensive review of the latest clinical trials and neuroimaging studies...",
    date: "July 24, 2026",
    readTime: "8 min read",
    citations: 12,
    tags: ["Research", "Neuroscience"]
  },
  {
    slug: "executive-order-14401-analysis",
    title: "Understanding Executive Order 14401",
    excerpt: "How the new federal guidelines reshape access to psychedelic therapies...",
    date: "June 15, 2026",
    readTime: "5 min read",
    citations: 8,
    tags: ["Policy", "Law"]
  },
  {
    slug: "washington-state-law-guide",
    title: "Washington State Supported Psilocybin Services",
    excerpt: "A practical guide to the recently implemented Washington state regulatory framework...",
    date: "May 22, 2026",
    readTime: "6 min read",
    citations: 15,
    tags: ["State Law", "Access"]
  },
  {
    slug: "functional-mushrooms-synergy",
    title: "The Entourage Effect in Functional Mushrooms",
    excerpt: "Exploring the synergistic benefits of combining Lion's Mane, Reishi, and active compounds...",
    date: "April 10, 2026",
    readTime: "10 min read",
    citations: 24,
    tags: ["Mycology", "Wellness"]
  }
];

export default function BlogPage() {
  return (
    <BlogWrapper>
      <BlogHero as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1>Research &amp; Education</h1>
        <p>Every claim backed by science. Every article cited.</p>
        <SearchContainer>
          <SearchInput type="text" placeholder="Search articles, research, and policy..." />
        </SearchContainer>
      </BlogHero>

      <ArticleGrid>
        {SAMPLE_ARTICLES.map((article, i) => (
          <StyledLink href={`/blog/${article.slug}`} key={article.slug}>
            <ArticleCard
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ArticleTags>
                {article.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ArticleTags>
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
              <ArticleMeta>
                <span>{article.date}</span>
                <span>&bull;</span>
                <span>{article.readTime}</span>
                <span>&bull;</span>
                <span>{article.citations} Citations</span>
              </ArticleMeta>
            </ArticleCard>
          </StyledLink>
        ))}
      </ArticleGrid>
    </BlogWrapper>
  );
}
