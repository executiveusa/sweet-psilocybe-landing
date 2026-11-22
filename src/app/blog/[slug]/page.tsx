"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { BLOG_ARTICLES, getArticleBySlug } from "@/data/blogArticles";
import {
  ArticleWrapper,
  MainContent,
  BackLink,
  ArticleHeader,
  HeaderMeta,
  ArticleBody,
  Citations,
  Sidebar,
  RelatedWidget,
  RelatedArticle,
} from "./styles";

export default function ArticlePage() {
  const params = useParams<{ slug?: string }>();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <ArticleWrapper>
        <MainContent>
          <BackLink href="/blog">&larr; Back to Research &amp; Education</BackLink>
          <ArticleHeader>
            <h1>Article Not Found</h1>
          </ArticleHeader>
          <p className="text-cream/80">
            The requested research article could not be found. Browse our
            peer-reviewed articles below.
          </p>
        </MainContent>
      </ArticleWrapper>
    );
  }

  const related = BLOG_ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <ArticleWrapper
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <MainContent className="custom-bg rounded-3xl p-6 sm:p-10">
        <BackLink href="/blog">&larr; Back to all cited articles</BackLink>

        <ArticleHeader>
          <h1>{article.title}</h1>
          <HeaderMeta>
            <span>By {article.author}</span>
            <span>&bull;</span>
            <span>{article.date}</span>
            <span>&bull;</span>
            <span>{article.readTime}</span>
            <span>&bull;</span>
            <span>✓ {article.citations.length} Primary Sources</span>
          </HeaderMeta>
        </ArticleHeader>

        <ArticleBody>
          {article.sections.map((section, idx) => (
            <section key={idx}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((text, pIdx) => (
                <p key={pIdx}>{text}</p>
              ))}
            </section>
          ))}
        </ArticleBody>

        <Citations>
          <h3>Verified Primary Sources &amp; Citations</h3>
          <ol>
            {article.citations.map((cite) => (
              <li id={`cite-${cite.id}`} key={cite.id}>
                <span>
                  {cite.authors} ({cite.year}). <em>{cite.title}</em>.{" "}
                  {cite.publication}.{" "}
                </span>
                <a
                  href={cite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [Verify Source ↗]
                </a>
              </li>
            ))}
          </ol>
        </Citations>
      </MainContent>

      <Sidebar>
        <RelatedWidget className="custom-bg">
          <h3>More Peer-Reviewed Research</h3>
          {related.map((item) => (
            <RelatedArticle href={`/blog/${item.slug}`} key={item.slug}>
              <h4>{item.title}</h4>
              <span>
                {item.readTime} · {item.citations.length} Citations
              </span>
            </RelatedArticle>
          ))}
        </RelatedWidget>
      </Sidebar>
    </ArticleWrapper>
  );
}
