"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface OrbitalNavItem {
  id: string;
  label: { en: string; es: string };
  subtitle: { en: string; es: string };
  href: string;
  icon: string;
  accent: string;
  angleDeg: number;
}

export const ORBITAL_DOORS: OrbitalNavItem[] = [
  {
    id: "landing",
    label: { en: "Landing", es: "Inicio" },
    subtitle: { en: "Brand Story & Mission", es: "Historia y Misión" },
    href: "/landing",
    icon: "🌿",
    accent: "#FFEDEE",
    angleDeg: 0,
  },
  {
    id: "store",
    label: { en: "Merch Store", es: "Tienda" },
    subtitle: { en: "Original Mycology Apparel", es: "Ropa Micológica Original" },
    href: "/store",
    icon: "🛒",
    accent: "#F6AFCF",
    angleDeg: 45,
  },
  {
    id: "blog",
    label: { en: "Research", es: "Investigación" },
    subtitle: { en: "Peer-Reviewed Cited Studies", es: "Estudios Científicos Citados" },
    href: "/blog",
    icon: "🔬",
    accent: "#A9C0B0",
    angleDeg: 90,
  },
  {
    id: "library",
    label: { en: "Library", es: "Biblioteca" },
    subtitle: { en: "Global Books & Documentaries", es: "Libros y Documentales" },
    href: "/library",
    icon: "📖",
    accent: "#B19CD9",
    angleDeg: 135,
  },
  {
    id: "games",
    label: { en: "Arcade", es: "Juegos" },
    subtitle: { en: "Interactive Mushroom Games", es: "Juegos Micológicos" },
    href: "/games",
    icon: "🎮",
    accent: "#FFD700",
    angleDeg: 180,
  },
  {
    id: "mission",
    label: { en: "Mission", es: "Misión" },
    subtitle: { en: "Education-First Standards", es: "Educación Primero" },
    href: "/about/our-mission",
    icon: "🍄",
    accent: "#F6AFCF",
    angleDeg: 225,
  },
  {
    id: "faq",
    label: { en: "FAQ", es: "Preguntas" },
    subtitle: { en: "Legal & Safety Answers", es: "Respuestas Legales y Seguridad" },
    href: "/resources/faq",
    icon: "✨",
    accent: "#FFE9A8",
    angleDeg: 270,
  },
  {
    id: "contact",
    label: { en: "Contact", es: "Contacto" },
    subtitle: { en: "Connect With Our Team", es: "Conecta Con Nosotros" },
    href: "/about/contact",
    icon: "✉️",
    accent: "#A9C0B0",
    angleDeg: 315,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { scale: 0.92, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
};

/**
 * Layer 6 (Piece #09 + Upgrade #1):
 * - Glowing circular orbital track ring connecting all 8 glassmorphic portals
 * - 40s slow orbit, pauses on hover, counter-rotates icons upright
 * - Reports active hovered portal to GatewayShell so the 3D Mushroom Spirit & Aura react live
 */
export default function OrbitalNavigation({
  lang,
  reducedMotion,
  activeDoor,
  onHoverDoor,
}: {
  lang: "en" | "es";
  reducedMotion: boolean;
  activeDoor: OrbitalNavItem | null;
  onHoverDoor: (door: OrbitalNavItem | null) => void;
}) {
  const [screenWidth, setScreenWidth] = useState<number>(1280);

  useEffect(() => {
    const update = () => setScreenWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isDesktopWheel = screenWidth >= 640;
  const isLarge = screenWidth >= 1024;
  const isMedium = screenWidth >= 768;
  const angleIncrement = 360 / ORBITAL_DOORS.length;

  if (!isDesktopWheel) {
    const leftHalf = ORBITAL_DOORS.slice(0, 4);
    const rightHalf = ORBITAL_DOORS.slice(4);

    return (
      <nav
        aria-label="Gateway Navigation"
        className="pointer-events-none fixed inset-0 z-30 flex items-center justify-between px-2.5 pt-28 pb-16"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="pointer-events-auto flex flex-col gap-2.5"
        >
          {leftHalf.map((btn) => (
            <motion.div key={btn.id} variants={itemVariants}>
              <Link
                href={btn.href}
                aria-label={btn.label[lang]}
                onMouseEnter={() => onHoverDoor(btn)}
                onMouseLeave={() => onHoverDoor(null)}
                style={{ touchAction: "manipulation" }}
                className="custom-bg group relative flex min-h-[48px] min-w-[60px] flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-1.5 text-cream transition-transform duration-150 active:scale-[0.95]"
              >
                <span className="text-base leading-none">{btn.icon}</span>
                <span className="text-[10px] font-semibold leading-tight text-cream/90">
                  {btn.label[lang].split(" ")[0]}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="pointer-events-auto flex flex-col gap-2.5"
        >
          {rightHalf.map((btn) => (
            <motion.div key={btn.id} variants={itemVariants}>
              <Link
                href={btn.href}
                aria-label={btn.label[lang]}
                onMouseEnter={() => onHoverDoor(btn)}
                onMouseLeave={() => onHoverDoor(null)}
                style={{ touchAction: "manipulation" }}
                className="custom-bg group relative flex min-h-[48px] min-w-[60px] flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-1.5 text-cream transition-transform duration-150 active:scale-[0.95]"
              >
                <span className="text-base leading-none">{btn.icon}</span>
                <span className="text-[10px] font-semibold leading-tight text-cream/90">
                  {btn.label[lang].split(" ")[0]}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </nav>
    );
  }

  const radiusCss = isLarge
    ? "min(20vw, 250px)"
    : isMedium
      ? "min(28vw, 220px)"
      : "min(36vw, 180px)";

  const ringDiameterCss = `calc(${radiusCss} * 2)`;

  return (
    <nav
      aria-label="Gateway Orbital Navigation"
      className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
    >
      {/* Glowing Orbital Mycelium Track Ring */}
      <div
        aria-hidden="true"
        className="living-anim pointer-events-none absolute rounded-full transition-all duration-500"
        style={{
          width: ringDiameterCss,
          height: ringDiameterCss,
          border: `1.5px dashed ${
            activeDoor ? `${activeDoor.accent}aa` : "rgba(246, 175, 207, 0.42)"
          }`,
          boxShadow: activeDoor
            ? `0 0 42px ${activeDoor.accent}44, inset 0 0 32px ${activeDoor.accent}28`
            : "0 0 28px rgba(246, 175, 207, 0.22)",
          animation: reducedMotion ? "none" : "ring-pulse 4.5s ease-in-out infinite",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`relative flex h-max w-max items-center justify-center ${
          reducedMotion ? "" : "orbital-wheel"
        }`}
      >
        {ORBITAL_DOORS.map((btn, index) => {
          const angleRad = (index * angleIncrement * Math.PI) / 180;
          const x = `calc(${radiusCss} * ${Math.cos(angleRad).toFixed(4)})`;
          const y = `calc(${radiusCss} * ${Math.sin(angleRad).toFixed(4)})`;
          const isActive = activeDoor?.id === btn.id;

          return (
            <div
              key={btn.id}
              className="pointer-events-auto absolute z-30 cursor-pointer"
              style={{ transform: `translate(${x}, ${y})` }}
            >
              <motion.div variants={itemVariants}>
                <Link
                  href={btn.href}
                  aria-label={btn.label[lang]}
                  onMouseEnter={() => onHoverDoor(btn)}
                  onMouseLeave={() => onHoverDoor(null)}
                  onFocus={() => onHoverDoor(btn)}
                  onBlur={() => onHoverDoor(null)}
                  className="custom-bg relative flex h-14 w-14 items-center justify-center rounded-full text-cream transition-transform hover:scale-115 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petal"
                  style={
                    isActive
                      ? {
                          borderColor: btn.accent,
                          boxShadow: `0 0 28px ${btn.accent}99`,
                        }
                      : undefined
                  }
                >
                  <span
                    className={`relative flex h-full w-full items-center justify-center ${
                      reducedMotion ? "" : "orbital-counter"
                    }`}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {btn.icon}
                    </span>
                    <span className="peer absolute inset-0 rounded-full" />
                    <span className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-petal/40 bg-ink/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-cream shadow-lg backdrop-blur-md peer-hover:block">
                      {btn.label[lang]}
                    </span>
                  </span>
                </Link>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </nav>
  );
}
