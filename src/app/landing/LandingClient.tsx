"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  AgeGate,
  BrandStrip,
  EmailCapture,
  PlayLearnGrow,
  SiteNavCards,
} from "@/components";

interface FeaturedItem {
  id: string;
  title: string;
  price: string;
  image: string;
}

const FALLBACK_FEATURED: FeaturedItem[] = [
  {
    id: "1",
    title: "Mycelium Network Organic Tee",
    price: "$35.00",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Spore Print Heavyweight Hoodie",
    price: "$65.00",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Botanical Mycology Ceramic Mug",
    price: "$18.00",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
  },
];

const RESEARCH_HIGHLIGHTS = [
  {
    slug: "psilocybin-research-2026",
    tag: "Neuroscience",
    title: "The State of Psilocybin Clinical Research",
    citations: "12 Peer-Reviewed Citations",
  },
  {
    slug: "washington-state-law-guide",
    tag: "Washington State Policy",
    title: "Washington State Regulatory & Legal Framework",
    citations: "15 Primary Legal Sources",
  },
  {
    slug: "functional-mushrooms-synergy",
    tag: "Mycology",
    title: "Functional Mushrooms: Lion's Mane, Reishi & Cordyceps",
    citations: "24 PubMed Citations",
  },
];

const PageShell = styled.main`
  background: transparent;
  color: #f7f3ef;
  min-height: 100vh;
`;

const HeroSectionWrap = styled.section`
  position: relative;
  padding: 7.5rem 1.5rem 5rem;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(246, 175, 207, 0.14),
      transparent 45%
    ),
    radial-gradient(
      circle at 80% 30%,
      rgba(169, 192, 176, 0.14),
      transparent 45%
    );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  background: rgba(169, 192, 176, 0.14);
  color: #a9c0b0;
  border: 1px solid rgba(169, 192, 176, 0.35);
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4.4rem);
  line-height: 1.06;
  font-weight: 800;
  margin: 1.25rem 0 1rem;
  max-width: 820px;
  letter-spacing: -0.03em;

  span {
    color: #f6afcf;
  }
`;

const HeroLead = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.22rem);
  line-height: 1.6;
  color: rgba(247, 243, 239, 0.8);
  max-width: 680px;
  margin: 0 0 2rem;
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
`;

const PrimaryCta = styled(Link)`
  background: #f6afcf;
  color: #0b0b0b;
  padding: 0.9rem 1.65rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: #ffedee;
    transform: translateY(-2px);
  }
`;

const SecondaryCta = styled(Link)`
  background: rgba(255, 255, 255, 0.06);
  color: #f7f3ef;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.9rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: #a9c0b0;
    transform: translateY(-2px);
  }
`;

const Band = styled.section`
  padding: 4.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const BandHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;

  h2 {
    font-size: clamp(1.65rem, 3vw, 2.3rem);
    margin: 0;
  }

  p {
    margin: 0.35rem 0 0;
    color: rgba(247, 243, 239, 0.72);
    font-size: 0.95rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.4rem;
`;

const MerchCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #f6afcf;
  }

  img {
    width: 100%;
    height: 230px;
    object-fit: cover;
  }

  .body {
    padding: 1.15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  .price {
    color: #f6afcf;
    font-weight: 700;
    white-space: nowrap;
  }
`;

const ResearchCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background: rgba(169, 192, 176, 0.05);
  border: 1px solid rgba(169, 192, 176, 0.2);
  border-radius: 18px;
  padding: 1.4rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #a9c0b0;
  }

  .tag {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #a9c0b0;
    font-weight: 700;
  }

  h3 {
    margin: 0;
    font-size: 1.15rem;
    line-height: 1.35;
  }

  .meta {
    margin-top: auto;
    font-size: 0.82rem;
    color: rgba(247, 243, 239, 0.68);
  }
`;

export default function LandingClient() {
  const [featured, setFeatured] = useState<FeaturedItem[]>(FALLBACK_FEATURED);

  useEffect(() => {
    let active = true;
    fetch("/api/store/printify/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (!active || !payload) return;
        const list = Array.isArray(payload) ? payload : payload.data;
        if (Array.isArray(list) && list.length > 0) {
          const mapped: FeaturedItem[] = list.slice(0, 3).map((item: any) => ({
            id: String(item.id),
            title: item.title || "Sweet Psilocybe Edition",
            price: item.variants?.[0]?.price
              ? `$${(Number(item.variants[0].price) / 100).toFixed(2)}`
              : "$35.00",
            image:
              item.images?.[0]?.src ||
              FALLBACK_FEATURED[0].image,
          }));
          setFeatured(mapped);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <PageShell>
      <AgeGate />

      <HeroSectionWrap>
        <Container>
          <Badge>🍄 18+ Mycology Education & Artistic Merch — No Psilocybin Sold</Badge>
          <HeroTitle>
            Wear the <span>Mycology Movement</span>. Read the Real Science.
          </HeroTitle>
          <HeroLead>
            Sweet Psilocybe is an independent, faceless brand combining
            peer-reviewed psychedelic &amp; functional mushroom education, a
            global multimedia library, and original print-on-demand apparel.
          </HeroLead>
          <CtaRow>
            <PrimaryCta href="/store">Shop the Collection &rarr;</PrimaryCta>
            <SecondaryCta href="/blog">Read Cited Research</SecondaryCta>
            <SecondaryCta href="/gateway">✨ Re-Enter 3D Gateway</SecondaryCta>
          </CtaRow>
        </Container>
      </HeroSectionWrap>

      <Band>
        <Container>
          <BandHeader>
            <div>
              <h2>Featured Apparel &amp; Objects</h2>
              <p>Fulfilled on demand via Printify — designed to fund open mycology education.</p>
            </div>
            <SecondaryCta href="/store">View Full Store &rarr;</SecondaryCta>
          </BandHeader>

          <CardGrid>
            {featured.map((item) => (
              <MerchCard key={item.id} href={`/store/${item.id}`}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="body">
                  <h3>{item.title}</h3>
                  <span className="price">{item.price}</span>
                </div>
              </MerchCard>
            ))}
          </CardGrid>
        </Container>
      </Band>

      <Band>
        <Container>
          <BandHeader>
            <div>
              <h2>Fact-Based Research &amp; Policy</h2>
              <p>Every article links directly to peer-reviewed journals and primary legal texts.</p>
            </div>
            <SecondaryCta href="/blog">All Articles &rarr;</SecondaryCta>
          </BandHeader>

          <CardGrid>
            {RESEARCH_HIGHLIGHTS.map((post) => (
              <ResearchCard key={post.slug} href={`/blog/${post.slug}`}>
                <span className="tag">{post.tag}</span>
                <h3>{post.title}</h3>
                <span className="meta">✓ {post.citations}</span>
              </ResearchCard>
            ))}
          </CardGrid>
        </Container>
      </Band>

      <PlayLearnGrow />
      <BrandStrip />
      <SiteNavCards />
      <EmailCapture />
    </PageShell>
  );
}
