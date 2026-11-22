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
  size: Math.floor(Math.random() * 8 + 9),
  animationDuration: `${(Math.random() * 4 + 4.5).toFixed(1)}s`,
  delay: `${(Math.random() * 3).toFixed(1)}s`,
});

/**
 * Layer 4 (Piece #10): 22 luminous drifting fireflies/spores floating across the PNW scene.
 */
export default function FireFliesBackground({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    setFireflies(Array.from({ length: 22 }, (_, i) => createFirefly(i)));
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
            boxShadow: "0 0 14px rgba(254, 240, 165, 0.7)",
            animation: reducedMotion
              ? "none"
              : `firefly-drift ${f.animationDuration} ease-in-out ${f.delay} infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
