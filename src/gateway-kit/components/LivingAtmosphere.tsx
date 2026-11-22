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
  { left: "48%", top: "88%", size: 36, delay: "2.2s", dur: "15s" },
  { left: "62%", top: "84%", size: 24, delay: "6s", dur: "11s" },
];

/**
 * Upgrades #3, #4, #5:
 * - Drifting San Juan Islands coastal mist ribbons
 * - Breathing diagonal canopy light shafts (golden sunbeams / twilight moonbeams)
 * - Bioluminescent breathing halo behind the 3D Mushroom Spirit (reacts to hovered portal color)
 * - Soft midground bokeh spores + subtle desktop cursor glow
 */
export default function LivingAtmosphere({
  isNight,
  accentColor,
  pointerPx,
  reducedMotion,
}: LivingAtmosphereProps) {
  const rayColor = isNight
    ? "rgba(169, 192, 176, 0.24)"
    : "rgba(255, 224, 170, 0.30)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {/* Canopy Light Rays filtering through the Douglas Firs */}
      <div
        className="absolute -top-24 left-[18%] h-[115vh] w-[28vw] origin-top blur-2xl"
        style={{
          background: `linear-gradient(180deg, ${rayColor} 0%, transparent 78%)`,
          animation: reducedMotion
            ? "none"
            : "ray-breathe 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -top-20 right-[16%] h-[110vh] w-[24vw] origin-top blur-2xl"
        style={{
          background: `linear-gradient(180deg, ${rayColor} 0%, transparent 72%)`,
          animation: reducedMotion
            ? "none"
            : "ray-breathe 12s ease-in-out 2.5s infinite",
        }}
      />

      {/* Drifting Salish Sea Coastal Mist Bands */}
      <div
        className="absolute bottom-[18%] left-[-10%] h-[28vh] w-[120vw] blur-3xl"
        style={{
          background: isNight
            ? "radial-gradient(ellipse at 50% 50%, rgba(169, 192, 176, 0.22), transparent 70%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(255, 232, 210, 0.28), transparent 70%)",
          animation: reducedMotion
            ? "none"
            : "mist-drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[8%] left-[-15%] h-[24vh] w-[130vw] blur-3xl"
        style={{
          background: isNight
            ? "radial-gradient(ellipse at 50% 50%, rgba(246, 175, 207, 0.14), transparent 72%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(246, 175, 207, 0.20), transparent 72%)",
          animation: reducedMotion
            ? "none"
            : "mist-drift 24s ease-in-out 4s infinite reverse",
        }}
      />

      {/* Bioluminescent Breathing Halo behind the 3D Mushroom Spirit */}
      <div
        className="absolute left-1/2 top-1/2 h-[340px] w-[340px] rounded-full blur-3xl transition-colors duration-500 sm:h-[420px] sm:w-[420px]"
        style={{
          background: `radial-gradient(circle, ${accentColor}52 0%, rgba(255, 224, 163, 0.24) 42%, transparent 72%)`,
          animation: reducedMotion
            ? "none"
            : "aura-breathe 5.5s ease-in-out infinite",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Midground Soft Bokeh Spores */}
      {!reducedMotion &&
        BOKEH_ORBS.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-md"
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

      {/* Subtle Desktop Cursor Spotlight Halo */}
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
