"use client";

import React, { useEffect, useState } from "react";

type Firefly = {
  id: number;
  top: string;
  left: string;
  size: number;
  animationDuration: string;
  delay: string;
};

const createFirefly = (idx: number): Firefly => ({
  id: idx + Math.random(),
  top: `${Math.random() * 88 + 6}%`,
  left: `${Math.random() * 90 + 5}%`,
  size: Math.floor(Math.random() * 7 + 8),
  animationDuration: `${(Math.random() * 4 + 4.5).toFixed(1)}s`,
  delay: `${(Math.random() * 3).toFixed(1)}s`,
});

/**
 * Layer 4 (Piece #10): Luminous drifting fireflies/spores.
 * Mobile-optimized: renders 7 lightweight GPU-composited fireflies on <768px
 * (without expensive box-shadow repaints) and 18 on desktop.
 */
export default function FireFliesBackground({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const count = mobile ? 7 : 18;
    setFireflies(Array.from({ length: count }, (_, i) => createFirefly(i)));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="living-anim absolute rounded-full bg-firefly-radial"
          style={{
            top: f.top,
            left: f.left,
            width: `${f.size}px`,
            height: `${f.size}px`,
            boxShadow: isMobile ? "none" : "0 0 12px rgba(254, 240, 165, 0.65)",
            willChange: reducedMotion ? "auto" : "transform, opacity",
            animation: reducedMotion
              ? "none"
              : `firefly-drift ${f.animationDuration} ease-in-out ${f.delay} infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
