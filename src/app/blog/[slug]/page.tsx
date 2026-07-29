"use client";

import { motion } from "framer-motion";
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

// This would typically come from a CMS or API
const ARTICLE_DATA = {
  title: "The State of Psilocybin Research in 2026",
  author: "Dr. Elena Rostova",
  date: "July 24, 2026",
  readTime: "8 min read",
  content: `
    <p>The landscape of psychedelic research has shifted dramatically over the past decade. As we move through 2026, the scientific community is no longer asking <em>if</em> psilocybin has therapeutic potential, but rather <em>how best to optimize its application</em> across a diverse range of mental health conditions.<sup><a href="#cite-1">1</a></sup></p>
    
    <h2>Clinical Trials and Efficacy</h2>
    <p>Recent phase 3 trials have demonstrated sustained remission rates for treatment-resistant depression that outpace traditional SSRIs by a significant margin.<sup><a href="#cite-2">2</a></sup> What's particularly noteworthy is the durability of the effect—many participants report continued benefits six to twelve months after a single guided session.</p>
    
    <p>Neuroimaging studies suggest this durability is linked to increased global brain connectivity and a temporary relaxing of the default mode network (DMN). This temporary "reset" appears to allow patients to break out of rigid thought patterns characteristic of depression and anxiety disorders.<sup><a href="#cite-3">3</a></sup></p>
    
    <h2>The Importance of Set and Setting</h2>
    <p>While the pharmacology of psilocin (the active metabolite) is well understood, clinical outcomes remain deeply intertwined with therapeutic context. The integration phase—the therapy that follows the active dose—is increasingly recognized as the critical variable in long-term success.<sup><a href="#cite-4">4</a></sup></p>
  `,
  citations: [
    { id: 1, text: "Carhart-Harris, R. L., et al. (2025). Psilocybin for treatment-resistant depression: a phase 3 randomized clinical trial. Journal of Psychopharmacology, 39(2), 145-156.", link: "#" },
    { id: 2, text: "Gukasyan, N., et al. (2024). Efficacy and safety of psilocybin-assisted therapy for major depressive disorder: A systematic review. American Journal of Psychiatry, 181(4), 299-310.", link: "#" },
    { id: 3, text: "Doss, M. K., et al. (2025). Neuroimaging correlates of psychedelic-induced therapeutic effects. Nature Neuroscience, 28(7), 1012-1020.", link: "#" },
    { id: 4, text: "Watts, R., & Luoma, J. B. (2024). The use of the psychological flexibility model to support psychedelic assisted therapy. Journal of Contextual Behavioral Science, 15, 92-102.", link: "#" },
  ]
};

const RELATED_ARTICLES = [
  {
    slug: "executive-order-14401-analysis",
    title: "Understanding Executive Order 14401",
    date: "June 15, 2026",
  },
  {
    slug: "washington-state-law-guide",
    title: "Washington State Supported Psilocybin Services",
    date: "May 22, 2026",
  },
  {
    slug: "functional-mushrooms-synergy",
    title: "The Entourage Effect in Functional Mushrooms",
    date: "April 10, 2026",
  }
];

export default function ArticlePage() {
  return (
    <ArticleWrapper
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MainContent>
        <BackLink href="/blog">
          &larr; Back to articles
        </BackLink>
        
        <ArticleHeader>
          <h1>{ARTICLE_DATA.title}</h1>
          <HeaderMeta>
            <span>By {ARTICLE_DATA.author}</span>
            <span>&bull;</span>
            <span>{ARTICLE_DATA.date}</span>
            <span>&bull;</span>
            <span>{ARTICLE_DATA.readTime}</span>
          </HeaderMeta>
        </ArticleHeader>

        <ArticleBody dangerouslySetInnerHTML={{ __html: ARTICLE_DATA.content }} />

        <Citations>
          <h3>References</h3>
          <ol>
            {ARTICLE_DATA.citations.map((cite) => (
              <li id={`cite-${cite.id}`} key={cite.id}>
                {cite.text} <a href={cite.link} target="_blank" rel="noopener noreferrer">[Link]</a>
              </li>
            ))}
          </ol>
        </Citations>
      </MainContent>

      <Sidebar>
        <RelatedWidget>
          <h3>Related Research</h3>
          {RELATED_ARTICLES.map((article) => (
            <RelatedArticle href={`/blog/${article.slug}`} key={article.slug}>
              <h4>{article.title}</h4>
              <span>{article.date}</span>
            </RelatedArticle>
          ))}
        </RelatedWidget>
      </Sidebar>
    </ArticleWrapper>
  );
}
