"use client";

import React, { useEffect, useState } from "react";

type Firefly = {
  id: number;
  top: string;
  left: string;
  size: number;
  animationDuration: string;
};

const createFirefly = (): Firefly => ({
  id: Math.random(),
  top: `${Math.random() * 92 + 4}%`,
  left: `${Math.random() * 92 + 4}%`,
  size: Math.floor(Math.random() * 6 + 8),
  animationDuration: `${(Math.random() * 5 + 5).toFixed(1)}s`,
});

/**
 * Layer 4 (Piece #10): Drifting glowing fireflies/spores floating over the painted backdrop.
 * Fixes profilepalette's `roudned-full` typo and cleans up interval on unmount.
 */
export default function FireFliesBackground({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    setFireflies(Array.from({ length: reducedMotion ? 6 : 12 }, createFirefly));
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setFireflies((current) => [...current.slice(-14), createFirefly()]);
    }, 900);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-firefly-radial"
          style={{
            top: f.top,
            left: f.left,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animation: reducedMotion
              ? "none"
              : `firefly-drift ${f.animationDuration} ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
