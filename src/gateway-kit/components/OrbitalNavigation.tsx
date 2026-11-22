"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface OrbitalNavItem {
  id: string;
  label: { en: string; es: string };
  href: string;
  icon: string;
}

const ORBITAL_DOORS: OrbitalNavItem[] = [
  { id: "landing", label: { en: "Landing", es: "Inicio" }, href: "/landing", icon: "🌿" },
  { id: "store", label: { en: "Merch Store", es: "Tienda" }, href: "/store", icon: "🛒" },
  { id: "blog", label: { en: "Research", es: "Investigación" }, href: "/blog", icon: "🔬" },
  { id: "library", label: { en: "Library", es: "Biblioteca" }, href: "/library", icon: "📖" },
  { id: "games", label: { en: "Arcade", es: "Juegos" }, href: "/games", icon: "🎮" },
  { id: "mission", label: { en: "Mission", es: "Misión" }, href: "/about/our-mission", icon: "🍄" },
  { id: "faq", label: { en: "FAQ", es: "Preguntas" }, href: "/resources/faq", icon: "✨" },
  { id: "contact", label: { en: "Contact", es: "Contacto" }, href: "/about/contact", icon: "✉️" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};

/**
 * Layer 6 (Piece #09): Exact profilepalette 40s slowly orbiting radial glassmorphic wheel.
 * - Desktop/Tablet (>=480px): Circular orbit around the 3D centerpiece, pauses on hover,
 *   counter-rotates icons to stay upright, reveals floating glass pill tooltip on hover.
 * - Mobile (<480px): Splits cleanly into Left & Right vertical icon columns framing the center.
 */
export default function OrbitalNavigation({
  lang,
  reducedMotion,
}: {
  lang: "en" | "es";
  reducedMotion: boolean;
}) {
  const [screenWidth, setScreenWidth] = useState<number>(1280);

  useEffect(() => {
    const update = () => setScreenWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isDesktopWheel = screenWidth >= 480;
  const isLarge = screenWidth >= 1024;
  const isMedium = screenWidth >= 768;
  const angleIncrement = 360 / ORBITAL_DOORS.length;

  if (!isDesktopWheel) {
    const leftHalf = ORBITAL_DOORS.slice(0, 4);
    const rightHalf = ORBITAL_DOORS.slice(4);

    return (
      <nav
        aria-label="Gateway Navigation"
        className="pointer-events-none fixed inset-0 z-30 flex items-center justify-between px-3"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="pointer-events-auto flex flex-col gap-3.5"
        >
          {leftHalf.map((btn) => (
            <motion.div key={btn.id} variants={itemVariants}>
              <Link
                href={btn.href}
                aria-label={btn.label[lang]}
                className="custom-bg group relative flex h-12 w-12 items-center justify-center rounded-full text-cream"
              >
                <span className="text-lg">{btn.icon}</span>
                <span className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink/85 px-2.5 py-1 text-xs font-semibold text-cream opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100">
                  {btn.label[lang]}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="pointer-events-auto flex flex-col gap-3.5"
        >
          {rightHalf.map((btn) => (
            <motion.div key={btn.id} variants={itemVariants}>
              <Link
                href={btn.href}
                aria-label={btn.label[lang]}
                className="custom-bg group relative flex h-12 w-12 items-center justify-center rounded-full text-cream"
              >
                <span className="text-lg">{btn.icon}</span>
                <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink/85 px-2.5 py-1 text-xs font-semibold text-cream opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100">
                  {btn.label[lang]}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Gateway Orbital Navigation"
      className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`group relative flex h-max w-max items-center justify-center ${
          reducedMotion ? "" : "animate-spin-slow hover:pause"
        }`}
      >
        {ORBITAL_DOORS.map((btn, index) => {
          const angleRad = (index * angleIncrement * Math.PI) / 180;
          const radius = isLarge
            ? "min(20vw, 250px)"
            : isMedium
              ? "min(28vw, 220px)"
              : "min(36vw, 180px)";

          const x = `calc(${radius} * ${Math.cos(angleRad).toFixed(4)})`;
          const y = `calc(${radius} * ${Math.sin(angleRad).toFixed(4)})`;

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
                  className="custom-bg relative flex h-14 w-14 items-center justify-center rounded-full text-cream transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petal"
                >
                  <span
                    className={`relative flex h-full w-full items-center justify-center ${
                      reducedMotion
                        ? ""
                        : "animate-spin-slow-reverse group-hover:pause"
                    }`}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {btn.icon}
                    </span>
                    <span className="peer absolute inset-0 rounded-full" />
                    <span className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-petal/30 bg-ink/85 px-3 py-1.5 text-xs font-semibold tracking-wide text-cream shadow-lg backdrop-blur-md peer-hover:block">
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
