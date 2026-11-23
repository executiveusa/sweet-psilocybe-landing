"use client";

import React from "react";

interface LivingAtmosphereProps {
  isNight: boolean;
  accentColor: string;
  pointerPx: { x: number; y: number };
  reducedMotion: boolean;
}

const BOKEH_ORBS = [
  { left: "14%", top: "76%", size: 42, delay: "0s", dur: "14s" },
  { left: "28%", top: "82%", size: 28, delay: "3s", dur: "12s" },
  { left: "72%", top: "78%", size: 48, delay: "1.5s", dur: "16s" },
  { left: "84%", top: "72%", size: 32, delay: "4.5s", dur: "13s" },
];

/**
 * Living PNW Atmosphere (Android-optimized):
 * - On mobile (<768px): skips expensive multi-layer CSS blur-3xl / blur-2xl filters
 *   and renders a single GPU-friendly radial aura so Android stays silky at 60fps.
 * - On desktop (>=768px): full canopy rays, coastal mist, bokeh orbs & cursor glow.
 */
export default function LivingAtmosphere({
  isNight,
  accentColor,
  pointerPx,
  reducedMotion,
}: LivingAtmosphereProps) {
  const rayColor = isNight
    ? "rgba(169, 192, 176, 0.22)"
    : "rgba(255, 224, 170, 0.28)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {/* Desktop-only Canopy Light Rays */}
      <div
        className="hidden md:block absolute -top-24 left-[18%] h-[115vh] w-[28vw] origin-top blur-2xl"
        style={{
          background: `linear-gradient(180deg, ${rayColor} 0%, transparent 78%)`,
          animation: reducedMotion
            ? "none"
            : "ray-breathe 9s ease-in-out infinite",
        }}
      />
      <div
        className="hidden md:block absolute -top-20 right-[16%] h-[110vh] w-[24vw] origin-top blur-2xl"
        style={{
          background: `linear-gradient(180deg, ${rayColor} 0%, transparent 72%)`,
          animation: reducedMotion
            ? "none"
            : "ray-breathe 12s ease-in-out 2.5s infinite",
        }}
      />

      {/* Desktop-only Drifting Salish Sea Coastal Mist */}
      <div
        className="hidden md:block absolute bottom-[18%] left-[-10%] h-[28vh] w-[120vw] blur-3xl"
        style={{
          background: isNight
            ? "radial-gradient(ellipse at 50% 50%, rgba(169, 192, 176, 0.22), transparent 70%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(255, 232, 210, 0.28), transparent 70%)",
          animation: reducedMotion
            ? "none"
            : "mist-drift 18s ease-in-out infinite",
        }}
      />

      {/* Lightweight Bioluminescent Breathing Halo (radial gradient — zero blur filter on mobile!) */}
      <div
        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] rounded-full transition-colors duration-500 sm:h-[420px] sm:w-[420px] md:blur-2xl"
        style={{
          background: `radial-gradient(circle, ${accentColor}45 0%, rgba(255, 224, 163, 0.18) 42%, transparent 70%)`,
          animation: reducedMotion
            ? "none"
            : "aura-breathe 5.5s ease-in-out infinite",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Desktop-only Midground Soft Bokeh Spores */}
      {!reducedMotion &&
        BOKEH_ORBS.map((orb, i) => (
          <div
            key={i}
            className="hidden md:block absolute rounded-full blur-md"
            style={{
              left: orb.left,
              top: orb.top,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background:
                i % 2 === 0
                  ? `radial-gradient(circle, ${accentColor}66, transparent 70%)`
                  : "radial-gradient(circle, rgba(255, 234, 168, 0.55), transparent 70%)",
              animation: `bokeh-rise ${orb.dur} ease-in-out ${orb.delay} infinite`,
            }}
          />
        ))}

      {/* Desktop-only Cursor Spotlight Halo */}
      {!reducedMotion && pointerPx.x > 0 && (
        <div
          className="hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-300 md:block"
          style={{
            position: "fixed",
            left: `${pointerPx.x}px`,
            top: `${pointerPx.y}px`,
            background: `radial-gradient(circle, ${accentColor}26 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
