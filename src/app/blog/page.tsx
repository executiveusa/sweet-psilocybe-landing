"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BLOG_ARTICLES, getAllBlogTags } from "@/data/blogArticles";
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

const FloatingPropStage = dynamic(
  () => import("@/gateway-kit/components/FloatingPropStage"),
  { ssr: false }
);

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const allTags = useMemo(() => ["All", ...getAllBlogTags()], []);

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_ARTICLES.filter((article) => {
      const matchesTag =
        selectedTag === "All" || article.tags.includes(selectedTag);
      if (!matchesTag) return false;
      if (!q) return true;
      return (
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q)) ||
        article.citations.some(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.publication.toLowerCase().includes(q)
        )
      );
    });
  }, [query, selectedTag]);

  return (
    <BlogWrapper>
      <BlogHero
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FloatingPropStage
          glbUrl="/models/blog-prop.glb"
          height={190}
          accentColor="#A9C0B0"
        />
        <h1>Research &amp; Education</h1>
        <p>Every claim backed by peer-reviewed science. Every article cited with live proof.</p>

        <SearchContainer>
          <SearchInput
            type="search"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder="Search studies, PubMed citations, Washington law, or mycology..."
            aria-label="Search research articles"
          />
        </SearchContainer>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-petal text-ink shadow-glow-petal"
                    : "border border-white/15 bg-ink/60 text-cream/85 backdrop-blur-md hover:border-petal/60"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </BlogHero>

      {filteredArticles.length === 0 ? (
        <div className="custom-bg mx-auto max-w-md rounded-2xl p-8 text-center">
          <p className="text-sm text-cream/85">
            No articles matched &ldquo;{query}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedTag("All");
            }}
            className="mt-4 rounded-full bg-petal px-5 py-2 text-xs font-bold text-ink"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <ArticleGrid>
          {filteredArticles.map((article, i) => (
            <StyledLink href={`/blog/${article.slug}`} key={article.slug}>
              <ArticleCard
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <ArticleTags>
                  {article.tags.map((tag) => (
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
                  <span>✓ {article.citations.length} Verified Citations</span>
                </ArticleMeta>
              </ArticleCard>
            </StyledLink>
          ))}
        </ArticleGrid>
      )}
    </BlogWrapper>
  );
}
