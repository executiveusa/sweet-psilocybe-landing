"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CanopyCatchGame from "@/components/Games/CanopyCatchGame";
import {
  GamesWrapper,
  GamesHero,
  GamesGrid,
  GameCard,
  GameHeader,
  TechBadge,
  GameDescription,
} from "./styles";

interface ArcadeGame {
  id: string;
  title: string;
  description: string;
  tech: "html5" | "webgl" | "threejs" | "p5js";
  badgeLabel: string;
  kind: "native" | "embed";
  embedUrl?: string;
  repoUrl?: string;
  credit: string;
}

const ARCADE_GAMES: ArcadeGame[] = [
  {
    id: "canopy-catch",
    title: "Mushroom Spirit: Canopy Catch",
    description:
      "Sweet Psilocybe original! Glide across the San Juan Islands forest floor catching glowing spores & chanterelles while unlocking real mycology science facts.",
    tech: "html5",
    badgeLabel: "Original",
    kind: "native",
    credit: "Sweet Psilocybe Native Original",
  },
  {
    id: "frog-jumper",
    title: "Frog Jumper",
    description:
      "Fast-paced animated HTML5 Canvas platformer leaping across woodland mushrooms and forest obstacles. Works with keyboard or touch.",
    tech: "html5",
    badgeLabel: "HTML5 Canvas",
    kind: "embed",
    embedUrl: "https://shmily40686.github.io/frog-jumper/",
    repoUrl: "https://github.com/shmily40686/frog-jumper",
    credit: "shmily40686 (Apache-2.0)",
  },
  {
    id: "glimmerwood-dash",
    title: "Glimmerwood Dash",
    description:
      "Modern animated endless runner through an enchanted glowing forest dodging mushroom hazards and collecting woodland relics.",
    tech: "html5",
    badgeLabel: "React Canvas",
    kind: "embed",
    embedUrl: "https://glimmerwood-dash.vercel.app",
    credit: "Open-Source React Canvas",
  },
  {
    id: "fungus-puzzle",
    title: "Fungus (Decomposition Puzzle)",
    description:
      "Award-style js13kgames puzzle where you guide fungal networks to decompose organic matter — complete with a built-in level editor.",
    tech: "html5",
    badgeLabel: "Puzzle",
    kind: "embed",
    embedUrl: "https://fungus.vercel.app",
    repoUrl: "https://github.com/alexejrotar/fungus",
    credit: "alexejrotar (Open Source)",
  },
  {
    id: "mycelium-first-bloom",
    title: "Mycelium — First Bloom",
    description:
      "Real-time-with-pause underground survival roguelike. Expand from a single spore through dark soil to trade nitrogen and sugar with trees.",
    tech: "webgl",
    badgeLabel: "Roguelike",
    kind: "embed",
    embedUrl: "https://koramak.github.io/mycelium/",
    repoUrl: "https://github.com/koramak/mycelium",
    credit: "koramak (Open Source)",
  },
  {
    id: "underneath-fungal",
    title: "Underneath (Fungal Network)",
    description:
      "Deep incremental forest-floor simulator: switch to the Fungal Network theme to balance nutrients, grow hyphal tips, and fruit spores.",
    tech: "html5",
    badgeLabel: "Simulation",
    kind: "embed",
    embedUrl: "https://mundaplus.github.io/Underneath/",
    repoUrl: "https://github.com/MundaPlus/Underneath",
    credit: "MundaPlus (Open Source)",
  },
];

export default function GamesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<ArcadeGame | null>(ARCADE_GAMES[0]);
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const cabinetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (theaterMode) {
          setTheaterMode(false);
        } else if (selected) {
          setSelected(null);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [theaterMode, selected]);

  // Lock background page scroll while in Full-Screen Theater mode
  useEffect(() => {
    if (!theaterMode) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [theaterMode]);

  const selectGame = (game: ArcadeGame, openTheater = false) => {
    setSelected(game);
    setTheaterMode(openTheater);
    if (game.kind === "embed") {
      setIframeLoading(true);
      setIframeKey((k) => k + 1);
    }
    if (!openTheater) {
      window.setTimeout(() => {
        cabinetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
    }
  };

  const exitGame = () => {
    setTheaterMode(false);
    setSelected(null);
  };

  const returnHome = () => {
    setTheaterMode(false);
    router.push("/");
  };

  const restartEmbed = () => {
    setIframeLoading(true);
    setIframeKey((k) => k + 1);
  };

  return (
    <GamesWrapper>
      {/* Full-Viewport In-App Theater Mode (keeps Return Home permanently pinned above the game) */}
      {theaterMode && selected && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-[#070A0C]"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} Full-Screen Arcade`}
        >
          <header className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/15 bg-[#0B0D12]/95 px-4 py-2.5 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={returnHome}
                className="rounded-full bg-petal px-4 py-1.5 text-xs font-bold text-ink transition hover:bg-spore cursor-pointer"
              >
                🍄 ← Return Home
              </button>
              <button
                type="button"
                onClick={() => setTheaterMode(false)}
                className="rounded-full border border-fern/50 bg-fern/15 px-3.5 py-1.5 text-xs font-semibold text-fern transition hover:bg-fern/25 cursor-pointer"
              >
                🕹️ All Games
              </button>
              <span className="hidden text-sm font-bold text-cream sm:inline">
                {selected.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {selected.kind === "embed" && (
                <button
                  type="button"
                  onClick={restartEmbed}
                  className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-cream hover:border-petal cursor-pointer"
                >
                  ↻ Restart
                </button>
              )}
              <button
                type="button"
                onClick={exitGame}
                className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-cream hover:border-petal hover:text-petal cursor-pointer"
              >
                ✕ Close Game
              </button>
            </div>
          </header>

          <div className="relative flex-1 overflow-auto">
            {selected.kind === "native" ? (
              <div className="flex min-h-full items-center justify-center p-4">
                <CanopyCatchGame />
              </div>
            ) : (
              <>
                {iframeLoading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#070A0C]/90 text-sm text-petal">
                    <span>🍄 Loading {selected.title}...</span>
                  </div>
                )}
                <iframe
                  key={`theater-${selected.id}-${iframeKey}`}
                  src={selected.embedUrl}
                  title={selected.title}
                  sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
                  allow="autoplay"
                  onLoad={() => setIframeLoading(false)}
                  className="h-full w-full border-0"
                />
              </>
            )}
          </div>
        </div>
      )}

      <GamesHero
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Mycology Arcade</h1>
        <p>
          Play our original Sweet Psilocybe game or launch 5 live-verified
          open-source mushroom games right inside the arcade — 100% free, no
          downloads, and always one click back home.
        </p>
      </GamesHero>

      {/* Active In-Page Arcade Cabinet */}
      {selected && !theaterMode && (
        <section
          ref={cabinetRef}
          className="custom-bg mb-14 rounded-3xl p-4 sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-fern">
                Now Playing · {selected.credit}
              </span>
              <h2 className="mt-0.5 text-xl font-bold text-cream sm:text-2xl">
                {selected.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={returnHome}
                className="rounded-full bg-petal px-3.5 py-1.5 text-xs font-bold text-ink hover:bg-spore transition cursor-pointer"
              >
                🍄 ← Return Home
              </button>
              <button
                type="button"
                onClick={() => setTheaterMode(true)}
                className="rounded-full border border-fern/50 bg-fern/15 px-3.5 py-1.5 text-xs font-semibold text-fern hover:bg-fern/25 transition cursor-pointer"
              >
                ⛶ Full Screen (With Home Bar)
              </button>
              <button
                type="button"
                onClick={exitGame}
                className="rounded-full border border-white/20 bg-ink/70 px-3.5 py-1.5 text-xs font-semibold text-cream hover:border-petal transition cursor-pointer"
              >
                ✕ Close Game
              </button>
              {selected.kind === "embed" && selected.embedUrl && (
                <button
                  type="button"
                  onClick={restartEmbed}
                  className="rounded-full border border-white/20 bg-ink/70 px-3.5 py-1.5 text-xs font-semibold text-cream hover:border-petal cursor-pointer"
                >
                  ↻ Restart
                </button>
              )}
              {selected.repoUrl && (
                <a
                  href={selected.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 bg-ink/70 px-3.5 py-1.5 text-xs font-semibold text-cream/80 hover:border-fern hover:text-fern"
                >
                  GitHub Source
                </a>
              )}
            </div>
          </div>

          {selected.kind === "native" ? (
            <CanopyCatchGame />
          ) : (
            <div className="relative h-[540px] w-full overflow-hidden rounded-2xl border border-petal/25 bg-ink sm:h-[640px]">
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-ink/85 text-sm text-petal">
                  <span>🍄 Loading {selected.title}...</span>
                </div>
              )}
              <iframe
                key={`${selected.id}-${iframeKey}`}
                src={selected.embedUrl}
                title={selected.title}
                sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
                allow="autoplay"
                onLoad={() => setIframeLoading(false)}
                className="h-full w-full border-0"
              />
            </div>
          )}
        </section>
      )}

      {/* Arcade Game Selector Grid */}
      <GamesGrid>
        {ARCADE_GAMES.map((game, i) => {
          const isCurrent = selected?.id === game.id;
          return (
            <GameCard
              as={motion.div}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              key={game.id}
              style={
                isCurrent
                  ? {
                      borderColor: "#F6AFCF",
                      boxShadow: "0 0 28px rgba(246, 175, 207, 0.28)",
                    }
                  : undefined
              }
            >
              <GameHeader>
                <h2>{game.title}</h2>
                <TechBadge $type={game.tech}>{game.badgeLabel}</TechBadge>
              </GameHeader>

              <GameDescription>{game.description}</GameDescription>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => selectGame(game, false)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition cursor-pointer ${
                      isCurrent
                        ? "bg-fern text-ink"
                        : "bg-petal text-ink hover:bg-spore"
                    }`}
                  >
                    {isCurrent ? "● Playing Now" : "▶ Play Here"}
                  </button>
                  <button
                    type="button"
                    onClick={() => selectGame(game, true)}
                    className="rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-cream hover:border-petal hover:text-petal transition cursor-pointer"
                  >
                    ⛶ Full Screen
                  </button>
                </div>

                <span className="text-[11px] text-cream/60">{game.credit}</span>
              </div>
            </GameCard>
          );
        })}
      </GamesGrid>
    </GamesWrapper>
  );
}
