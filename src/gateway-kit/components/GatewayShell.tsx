"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useForestAudio } from "../audio/useForestAudio";
import FireFliesBackground from "./FireFliesBackground";
import OrbitalNavigation from "./OrbitalNavigation";
import type { GatewaySkinV1 } from "../spec";

const TransparentModelStage = dynamic(
  () => import("./TransparentModelStage"),
  { ssr: false }
);

interface GatewayShellProps {
  skin: GatewaySkinV1;
}

/**
 * True 7-Layer profilepalette-style Gateway with subtle mouse-parallax depth:
 * - Layer 3 (z-0):  Approved PNW San Juan Islands painted backdrop (Dusk + Twilight cross-fade)
 * - Layer 4 (z-10): Drifting FireFliesBackground over the painting
 * - Layer 5 (z-20): Transparent 3D Canvas holding the centered Mushroom Figure (Piece #05 slot)
 * - Layer 6 (z-30): 40s Orbiting Radial Glassmorphic Navigation Wheel (Piece #09)
 * - Layer 7 (z-40): Minimal Brand Identity badge + Top-Right Audio / Dusk-Twilight / EN-ES controls
 */
export default function GatewayShell({ skin }: GatewayShellProps) {
  const [isNight, setIsNight] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("en");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const audio = useForestAudio({ volume: skin.audio.volume });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);

    const onPointerMove = (e: PointerEvent) => {
      if (mq.matches) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setPointerOffset({ x: nx, y: ny });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const bgTransform = reducedMotion
    ? "scale(1.02)"
    : `scale(1.05) translate3d(${(-pointerOffset.x * 12).toFixed(1)}px, ${(-pointerOffset.y * 8).toFixed(1)}px, 0)`;

  return (
    <main className="relative flex h-screen w-screen flex-col items-center justify-between overflow-hidden bg-ink">
      {/* LAYER 3 (z-0): Piece #01 — Approved San Juan Islands PNW Painted Backdrops + Parallax */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-transform duration-300 ease-out"
        style={{ transform: bgTransform }}
      >
        <Image
          priority
          fill
          sizes="100vw"
          src="/background/home-golden-dusk.webp"
          alt="Enchanted Pacific Northwest forest clearing overlooking the San Juan Islands at golden dusk with breaching orcas"
          className={`object-cover object-center transition-opacity duration-1000 ${
            isNight ? "opacity-0" : "opacity-80"
          }`}
        />
        <Image
          priority
          fill
          sizes="100vw"
          src="/background/home-twilight.webp"
          alt="Enchanted Pacific Northwest forest clearing overlooking the San Juan Islands at blue-hour twilight with orcas"
          className={`object-cover object-center transition-opacity duration-1000 ${
            isNight ? "opacity-80" : "opacity-0"
          }`}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(7, 10, 12, 0.16) 0%, rgba(7, 10, 12, 0.52) 100%)",
          }}
        />
      </div>

      {/* LAYER 4 (z-10): Piece #10 — Drifting Fireflies / Spores */}
      <FireFliesBackground reducedMotion={reducedMotion} />

      {/* LAYER 5 (z-20): Piece #05 + #08 — Transparent 3D Canvas Hero Figure */}
      <TransparentModelStage
        skin={skin}
        isNight={isNight}
        reducedMotion={reducedMotion}
        pointerOffset={pointerOffset}
      />

      {/* LAYER 6 (z-30): Piece #09 — 40s Orbiting Radial Glassmorphic Nav Wheel */}
      <OrbitalNavigation lang={lang} reducedMotion={reducedMotion} />

      {/* LAYER 7 (z-40): Top Identity Bar & Controls */}
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-40 flex flex-wrap items-start justify-between gap-3 p-4 sm:p-6">
        <div className="custom-bg pointer-events-auto max-w-xs rounded-2xl px-4 py-2.5 text-cream">
          <h1 className="text-base font-bold tracking-tight sm:text-lg">
            🍄 {skin.identity.brandName}
          </h1>
          <p className="mt-0.5 text-[11px] leading-snug text-cream/80 sm:text-xs">
            {skin.identity.complianceBadge[lang]}
          </p>
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsNight((v) => !v)}
            className="custom-bg rounded-full px-3.5 py-2 text-xs font-semibold text-cream"
            aria-label="Toggle Golden Dusk or Twilight Mist backdrop"
          >
            {isNight ? "🌅 Golden Dusk" : "🌙 Twilight Mist"}
          </button>

          {skin.audio.enabled && (
            <button
              type="button"
              onClick={audio.toggle}
              className="custom-bg flex h-9 w-9 items-center justify-center rounded-full text-sm text-cream"
              aria-label="Toggle forest ambient audio"
              title={audio.isPlaying ? "Mute forest sound" : "Play forest sound"}
            >
              {audio.isPlaying ? "🔊" : "🔇"}
            </button>
          )}

          <button
            type="button"
            onClick={() => setLang((l) => (l === "en" ? "es" : "en"))}
            className="custom-bg flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-cream"
            aria-label="Switch language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          <Link
            href={skin.navigation.skipHref}
            className="rounded-full bg-petal px-4 py-2 text-xs font-bold text-ink shadow-glow-petal transition hover:bg-spore"
          >
            {skin.navigation.skipLabel[lang]} &rarr;
          </Link>
        </div>
      </header>

      <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 text-center">
        <p className="rounded-full bg-ink/55 px-4 py-1.5 text-[11px] font-medium tracking-widest uppercase text-cream/80 backdrop-blur-md">
          {lang === "en"
            ? "Hover any orbiting portal to pause • Click to enter"
            : "Pasa el cursor para pausar • Haz clic para entrar"}
        </p>
      </div>
    </main>
  );
}
