"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AgeGate, EmailCapture } from "@/components";
import { BLOG_ARTICLES } from "@/data/blogArticles";
import {
  CURATED_PREVIEW_PRODUCTS,
  type StoreCatalogResponse,
  type StoreProduct,
} from "@/data/storeCatalog";

interface GatewayRealm {
  id: string;
  number: string;
  name: string;
  tagline: string;
  whatYouCanDo: string;
  howToUse: string;
  ctaLabel: string;
  href: string;
  accent: string;
}

const GATEWAY_REALMS: GatewayRealm[] = [
  {
    id: "store",
    number: "01",
    name: "The Collection",
    tagline: "Wearable Pacific Northwest mycology art",
    whatYouCanDo:
      "Browse organic cotton tees, heavyweight hoodies, ceramic mugs, and archival forest art prints printed on demand via Printify.",
    howToUse:
      "Select the Store portal on the 3D wheel — pick your edition and size. 100% artistic merch; we never sell psilocybin or controlled substances.",
    ctaLabel: "Browse Merch Collection",
    href: "/store",
    accent: "#F6AFCF",
  },
  {
    id: "research",
    number: "02",
    name: "Research & Science",
    tagline: "Peer-reviewed studies on the healing potential of mushrooms",
    whatYouCanDo:
      "Read plain-language summaries of Johns Hopkins & Imperial College clinical trials, functional mushroom neuroscience (Lion's Mane, Reishi), and Washington State policy.",
    howToUse:
      "Select the Research portal to search by topic or tag. Every article links directly to PubMed, Nature, NIH, or official state statutes.",
    ctaLabel: "Read Cited Research",
    href: "/blog",
    accent: "#A9C0B0",
  },
  {
    id: "library",
    number: "03",
    name: "The 3D Library",
    tagline: "Curated books, documentaries, and films from around the world",
    whatYouCanDo:
      "Explore 17 verified references spanning seminal mycology books (Merlin Sheldrake, Paul Stamets, Michael Pollan), documentaries (Fantastic Fungi, Dosed), and cinema.",
    howToUse:
      "Drag to look around the 3D Victorian conservatory and click any glowing bookshelf wing to switch between Books, Documentaries, and Movies.",
    ctaLabel: "Open the 3D Library",
    href: "/library",
    accent: "#D4B8E8",
  },
  {
    id: "arcade",
    number: "04",
    name: "Mycology Arcade",
    tagline: "Free browser games that make fungal ecology playful",
    whatYouCanDo:
      "Play our original San Juan canopy game (Canopy Catch) alongside 5 live-verified open-source mushroom games — completely free with zero downloads.",
    howToUse:
      "Select the Games portal, play inline or in Full-Screen Theater Mode, and click Return Home at the top bar anytime.",
    ctaLabel: "Play Free in Arcade",
    href: "/games",
    accent: "#FFE9A8",
  },
];

const RESEARCH_HIGHLIGHTS = BLOG_ARTICLES.slice(0, 3);

export default function LandingClient() {
  const [activeRealmId, setActiveRealmId] = useState<string>(
    GATEWAY_REALMS[0].id
  );
  const [featured, setFeatured] = useState<StoreProduct[]>(
    CURATED_PREVIEW_PRODUCTS.slice(0, 3)
  );

  useEffect(() => {
    let active = true;
    fetch("/api/store/printify/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((payload: StoreCatalogResponse | null) => {
        if (!active || !payload?.products?.length) return;
        setFeatured(payload.products.slice(0, 3));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const activeRealm =
    GATEWAY_REALMS.find((r) => r.id === activeRealmId) ?? GATEWAY_REALMS[0];

  return (
    <main className="min-h-screen bg-transparent text-[#F7F3EF]">
      <AgeGate />

      {/* BEAT 1 — HERO: 2-Second Orientation (Single H1 on the page) */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-20">
        <div className="max-w-3xl rounded-3xl border border-white/12 bg-[#0B0D12]/65 p-7 backdrop-blur-md sm:p-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#A9C0B0]">
            Welcome to Sweet Psilocybe &middot; Pacific Northwest &middot; 18+
            Education &amp; Merch
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#F7F3EF] sm:text-6xl">
            Mushroom science, global film &amp; books, and{" "}
            <span className="text-[#F6AFCF]">wearable forest art.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#F7F3EF]/80 sm:text-lg">
            Sweet Psilocybe is an independent, faceless mycology sanctuary.
            Learn about the healing and ecological benefits of mushrooms through
            cited clinical research, explore our 3D library of books and
            documentaries, play free games, and support the project with
            original print-on-demand apparel.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/gateway"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#F6AFCF] px-7 py-3 text-sm font-bold text-[#0B0D12] transition hover:bg-[#FFEDEE]"
            >
              Enter the 3D Gateway →
            </Link>
            <Link
              href="/store"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-[#0B0D12]/65 px-6 py-3 text-sm font-semibold text-[#F7F3EF] backdrop-blur-md transition hover:border-[#A9C0B0] hover:text-[#A9C0B0]"
            >
              Shop Artistic Merch
            </Link>
          </div>

          <p className="mt-5 text-xs text-[#F7F3EF]/55">
            Educational resource &amp; artistic merchandise only — Sweet
            Psilocybe does not sell psilocybin or controlled substances.
          </p>
        </div>
      </section>

      {/* BEAT 2 — PROGRESSIVE DISCLOSURE: Guide to the 4 Areas of the 3D Gateway */}
      <section
        aria-labelledby="gateway-guide-heading"
        className="mx-auto max-w-6xl border-t border-white/10 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mb-10 max-w-2xl">
          <h2
            id="gateway-guide-heading"
            className="text-2xl font-bold tracking-tight text-[#F7F3EF] sm:text-4xl"
          >
            How to Explore
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#F7F3EF]/75 sm:text-base">
            Enter our interactive{" "}
            <Link
              href="/gateway"
              className="text-[#F6AFCF] underline underline-offset-4 hover:text-[#FFEDEE]"
            >
              3D Gateway
            </Link>
            . You will see four glowing portals orbiting the central Mushroom
            Spirit. Choose any area to see what lives inside and jump straight
            in.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left selector rail (progressive disclosure tabs) */}
          <div
            role="tablist"
            aria-label="Areas of Sweet Psilocybe"
            className="flex flex-col gap-2.5 lg:col-span-5"
          >
            {GATEWAY_REALMS.map((realm) => {
              const isSelected = realm.id === activeRealm.id;
              return (
                <button
                  key={realm.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveRealmId(realm.id)}
                  className={`flex min-h-[60px] w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition cursor-pointer ${
                    isSelected
                      ? "border-[#F6AFCF]/60 bg-[#0B0D12]/88 shadow-lg"
                      : "border-white/10 bg-[#0B0D12]/55 hover:border-white/25 hover:bg-[#0B0D12]/75"
                  }`}
                >
                  <div className="flex items-baseline gap-3.5">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: realm.accent }}
                    >
                      {realm.number}
                    </span>
                    <div>
                      <div className="text-base font-semibold text-[#F7F3EF]">
                        {realm.name}
                      </div>
                      <div className="mt-0.5 text-xs text-[#F7F3EF]/65">
                        {realm.tagline}
                      </div>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`text-sm transition-transform ${
                      isSelected
                        ? "translate-x-0.5 text-[#F6AFCF]"
                        : "text-white/35"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right detail panel for the selected portal */}
          <div
            role="tabpanel"
            className="flex flex-col justify-between rounded-3xl border border-white/15 bg-[#0B0D12]/82 p-7 backdrop-blur-xl sm:p-9 lg:col-span-7"
          >
            <div>
              <span
                className="font-mono text-xs font-bold uppercase tracking-widest"
                style={{ color: activeRealm.accent }}
              >
                Portal {activeRealm.number} &middot; {activeRealm.name}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-[#F7F3EF] sm:text-3xl">
                {activeRealm.tagline}
              </h3>

              <div className="mt-6 space-y-4 border-t border-white/10 pt-6 text-sm leading-relaxed text-[#F7F3EF]/80 sm:text-base">
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#A9C0B0]">
                    What you&apos;ll find
                  </div>
                  <p>{activeRealm.whatYouCanDo}</p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#A9C0B0]">
                    How to interact
                  </div>
                  <p>{activeRealm.howToUse}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={activeRealm.href}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold text-[#0B0D12] transition hover:opacity-90"
                style={{ backgroundColor: activeRealm.accent }}
              >
                {activeRealm.ctaLabel} →
              </Link>
              <Link
                href="/gateway"
                className="text-xs font-medium text-[#F7F3EF]/70 underline underline-offset-4 hover:text-[#F7F3EF]"
              >
                Or open in 3D Gateway
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEAT 3 — REAL PROOF: Healing Benefits & Cited Science */}
      <section
        aria-labelledby="science-heading"
        className="mx-auto max-w-6xl border-t border-white/10 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9C0B0]">
              Evidence-First Education
            </p>
            <h2
              id="science-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-[#F7F3EF] sm:text-4xl"
            >
              Learn the real healing science behind mushrooms.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#F7F3EF]/75 sm:text-base">
              From clinical trials on psilocybin-assisted therapy for major
              depression to Lion&apos;s Mane neurotrophic research and Pacific
              Northwest mycorrhizal forests — every article cites primary
              journals so you can verify every claim yourself.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex min-h-[44px] items-center rounded-full border border-[#A9C0B0]/50 bg-[#A9C0B0]/15 px-5 py-2 text-sm font-semibold text-[#A9C0B0] transition hover:bg-[#A9C0B0]/25"
              >
                All Cited Articles →
              </Link>
              <Link
                href="/library"
                className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-[#0B0D12]/60 px-5 py-2 text-sm font-medium text-[#F7F3EF]/85 transition hover:border-white/35"
              >
                Books &amp; Films
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 lg:col-span-7">
            {RESEARCH_HIGHLIGHTS.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-white/12 bg-[#0B0D12]/78 p-5 backdrop-blur-md transition hover:border-[#A9C0B0]/60"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#A9C0B0]">
                    {article.tags[0] || "Research"}
                  </span>
                  <span className="text-[#F7F3EF]/55">
                    ✓ {article.citations.length} Verified Primary Sources
                  </span>
                </div>
                <h3 className="text-lg font-semibold leading-snug text-[#F7F3EF] transition group-hover:text-[#F6AFCF]">
                  {article.title}
                </h3>
                <p className="line-clamp-2 text-sm text-[#F7F3EF]/70">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEAT 4 — WEAR THE MOVEMENT: Artistic Merch Preview */}
      <section
        aria-labelledby="merch-heading"
        className="mx-auto max-w-6xl border-t border-white/10 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F6AFCF]">
              Support Independent Education
            </p>
            <h2
              id="merch-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-[#F7F3EF] sm:text-4xl"
            >
              Original mycology apparel &amp; prints.
            </h2>
          </div>
          <Link
            href="/store"
            className="inline-flex min-h-[44px] items-center rounded-full border border-[#F6AFCF]/45 bg-[#F6AFCF]/12 px-5 py-2 text-sm font-semibold text-[#F6AFCF] transition hover:bg-[#F6AFCF]/22"
          >
            View Full Store →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={`/store/${item.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0B0D12]/78 backdrop-blur-md transition hover:-translate-y-1 hover:border-[#F6AFCF]/60"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#A9C0B0]">
                    {item.category}
                  </div>
                  <h3 className="mt-0.5 text-base font-semibold text-[#F7F3EF]">
                    {item.title}
                  </h3>
                </div>
                <span className="shrink-0 text-sm font-bold text-[#F6AFCF]">
                  {item.priceFormatted}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEAT 5 — STAY IN THE CANOPY */}
      <EmailCapture />
    </main>
  );
}
