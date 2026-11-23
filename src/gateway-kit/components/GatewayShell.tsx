"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useForestAudio } from "../audio/useForestAudio";
import FireFliesBackground from "./FireFliesBackground";
import LivingAtmosphere from "./LivingAtmosphere";
import OrbitalNavigation, { type OrbitalNavItem } from "./OrbitalNavigation";
import type { GatewaySkinV1 } from "../spec";

const TransparentModelStage = dynamic(
  () => import("./TransparentModelStage"),
  { ssr: false }
);

interface GatewayShellProps {
  skin: GatewaySkinV1;
}

/**
 * Living 7-Layer profilepalette-style Gateway:
 * - Layer 3 (z-0):  PNW San Juan Islands painted backdrops + mouse parallax
 * - Layer 4 (z-10): LivingAtmosphere (coastal mist, canopy light rays, breathing aura, bokeh, cursor glow) + FireFlies
 * - Layer 5 (z-20): Transparent 3D Canvas holding the interactive Mushroom Spirit (portal-tracking + click-to-spin)
 * - Layer 6 (z-30): Glowing 40s Orbiting Radial Glassmorphic Navigation Wheel
 * - Layer 7 (z-40): Brand Identity + Top-Right Controls + Live Portal Spotlight Pill
 */
export default function GatewayShell({ skin }: GatewayShellProps) {
  const [isNight, setIsNight] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("en");
  // Default motion ON so Windows OS power-saver/reduced-motion never silently freezes the 3D scene;
  // users can toggle motion pause anytime via the top-right Motion button.
  const [motionPaused, setMotionPaused] = useState(false);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [pointerPx, setPointerPx] = useState({ x: 0, y: 0 });
  const [activeDoor, setActiveDoor] = useState<OrbitalNavItem | null>(null);
  const [spinTrigger, setSpinTrigger] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const audio = useForestAudio({ volume: skin.audio.volume });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const updateVp = () => setIsMobileViewport(mq.matches);
    updateVp();
    mq.addEventListener?.("change", updateVp);

    const onPointerMove = (e: PointerEvent) => {
      if (mq.matches) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setPointerOffset({ x: nx, y: ny });
      setPointerPx({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      mq.removeEventListener?.("change", updateVp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const bgTransform =
    motionPaused || isMobileViewport
      ? "scale(1)"
      : `scale(1.04) translate3d(${(-pointerOffset.x * 12).toFixed(1)}px, ${(-pointerOffset.y * 8).toFixed(1)}px, 0)`;

  const activeAccent = activeDoor?.accent || "#F6AFCF";

  return (
    <main
      className={`relative flex h-[100dvh] w-full flex-col items-center justify-between overflow-hidden bg-ink ${
        motionPaused ? "motion-paused" : ""
      }`}
    >
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
            isNight ? "opacity-0" : "opacity-85"
          }`}
        />
        <Image
          priority
          fill
          sizes="100vw"
          src="/background/home-twilight.webp"
          alt="Enchanted Pacific Northwest forest clearing overlooking the San Juan Islands at blue-hour twilight with orcas"
          className={`object-cover object-center transition-opacity duration-1000 ${
            isNight ? "opacity-85" : "opacity-0"
          }`}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(7, 10, 12, 0.14) 0%, rgba(7, 10, 12, 0.52) 100%)",
          }}
        />
      </div>

      {/* LAYER 4 (z-10): Living Atmosphere (Mist, Light Rays, Breathing Aura, Bokeh, Cursor Glow) + FireFlies */}
      <LivingAtmosphere
        isNight={isNight}
        accentColor={activeAccent}
        pointerPx={pointerPx}
        reducedMotion={motionPaused}
      />
      <FireFliesBackground reducedMotion={motionPaused} />

      {/* LAYER 5 (z-20): Interactive 3D Mushroom Spirit */}
      <TransparentModelStage
        skin={skin}
        isNight={isNight}
        reducedMotion={motionPaused}
        pointerOffset={pointerOffset}
        activeDoor={activeDoor}
        spinTrigger={spinTrigger}
      />

      {/* Center transparent click-target over the Mushroom Spirit for celebratory 360° twirl + spore burst */}
      <button
        type="button"
        onClick={() => setSpinTrigger((n) => n + 1)}
        aria-label="Spin the Sweet Psilocybe Mushroom Spirit"
        title="Click to spin the Mushroom Spirit"
        className="fixed left-1/2 top-1/2 z-[25] h-52 w-44 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petal/60"
      />

      {/* LAYER 6 (z-30): Glowing 28s Orbiting Radial Glassmorphic Nav Wheel */}
      <OrbitalNavigation
        lang={lang}
        reducedMotion={motionPaused}
        activeDoor={activeDoor}
        onHoverDoor={setActiveDoor}
      />

      {/* LAYER 7 (z-40): Top Identity Bar & Controls (320px-safe, 44x44 touch targets) */}
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-40 flex flex-wrap items-center justify-between gap-2 p-2.5 sm:items-start sm:gap-3 sm:p-6">
        <div className="custom-bg pointer-events-auto flex items-center gap-2.5 rounded-2xl px-3 py-2 text-cream sm:max-w-sm sm:gap-3.5 sm:px-4 sm:py-2.5">
          <Image
            src="/images/sweet-psilocybe-crest-transparent.png"
            alt="Sweet Psilocybe Logo"
            width={52}
            height={52}
            priority
            className="h-10 w-10 shrink-0 rounded-full object-contain sm:h-12 sm:w-12"
          />
          <div className="min-w-0">
            <h1
              className="truncate text-sm font-semibold text-[#F7F3EF] sm:text-xl"
              style={{ letterSpacing: "0.08em" }}
            >
              {skin.identity.brandName}
            </h1>
            <p className="mt-0.5 hidden text-[11px] leading-snug text-cream/80 sm:block sm:text-xs">
              {skin.identity.complianceBadge[lang]}
            </p>
          </div>
        </div>

        <div className="pointer-events-auto flex flex-nowrap items-center gap-1.5 sm:flex-wrap sm:gap-2">
          <button
            type="button"
            onClick={() => setIsNight((v) => !v)}
            style={{ touchAction: "manipulation" }}
            className="custom-bg inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-cream transition-transform duration-150 active:scale-[0.96] sm:px-3.5 cursor-pointer"
            aria-label="Toggle Golden Dusk or Twilight Mist backdrop"
          >
            <span aria-hidden="true">{isNight ? "🌅" : "🌙"}</span>
            <span className="hidden md:inline">
              {isNight ? "Golden Dusk" : "Twilight Mist"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMotionPaused((v) => !v)}
            style={{ touchAction: "manipulation" }}
            className="custom-bg inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-cream transition-transform duration-150 active:scale-[0.96] sm:px-3 cursor-pointer"
            aria-label="Pause or resume animations"
            title={motionPaused ? "Resume animations" : "Pause animations"}
          >
            <span aria-hidden="true">{motionPaused ? "▶️" : "⏸"}</span>
            <span className="hidden md:inline">Motion</span>
          </button>

          {skin.audio.enabled && (
            <button
              type="button"
              onClick={audio.toggle}
              style={{ touchAction: "manipulation" }}
              className="custom-bg inline-flex h-11 w-11 items-center justify-center rounded-full text-sm text-cream transition-transform duration-150 active:scale-[0.96] cursor-pointer"
              aria-label="Toggle forest ambient audio"
              title={audio.isPlaying ? "Mute forest sound" : "Play forest sound"}
            >
              {audio.isPlaying ? "🔊" : "🔇"}
            </button>
          )}

          <button
            type="button"
            onClick={() => setLang((l) => (l === "en" ? "es" : "en"))}
            style={{ touchAction: "manipulation" }}
            className="custom-bg inline-flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold text-cream transition-transform duration-150 active:scale-[0.96] cursor-pointer"
            aria-label="Switch language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          <Link
            href={skin.navigation.skipHref}
            style={{ touchAction: "manipulation" }}
            className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-petal px-3.5 text-xs font-bold text-ink shadow-glow-petal transition-transform duration-150 hover:bg-spore active:scale-[0.97] sm:px-4"
          >
            <span className="sm:hidden">{lang === "en" ? "Explore →" : "Explorar →"}</span>
            <span className="hidden sm:inline">{skin.navigation.skipLabel[lang]} &rarr;</span>
          </Link>
        </div>
      </header>

      {/* Live Bottom Portal Spotlight Pill */}
      <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 w-[min(92vw,520px)] -translate-x-1/2 text-center">
        <div
          className="custom-bg inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-medium text-cream transition-all duration-300"
          style={
            activeDoor
              ? {
                  borderColor: `${activeDoor.accent}99`,
                  boxShadow: `0 0 24px ${activeDoor.accent}44`,
                }
              : undefined
          }
        >
          {activeDoor ? (
            <>
              <span className="text-base">{activeDoor.icon}</span>
              <span className="font-bold">{activeDoor.label[lang]}</span>
              <span className="opacity-60">·</span>
              <span className="text-cream/85">{activeDoor.subtitle[lang]}</span>
            </>
          ) : (
            <span className="tracking-wider uppercase text-[11px] text-cream/85">
              {isMobileViewport
                ? lang === "en"
                  ? "Tap any portal to explore • Tap the Spirit to spin"
                  : "Toca cualquier portal • Toca el Espíritu Hongo"
                : lang === "en"
                  ? "Click the Mushroom Spirit to spin • Hover any portal to explore"
                  : "Haz clic en el Espíritu Hongo • Pasa el cursor por cualquier portal"}
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
