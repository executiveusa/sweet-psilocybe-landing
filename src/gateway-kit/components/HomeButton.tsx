"use client";

import React from "react";
import Link from "next/link";

/**
 * Piece #12: Floating glassmorphic return-to-gateway button on all inner pages.
 */
export default function HomeButton() {
  return (
    <Link
      href="/"
      aria-label="Return to 3D Enchanted Canopy Gateway"
      title="Return to 3D Gateway"
      className="custom-bg fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full px-3.5 py-2.5 text-xs font-semibold text-cream shadow-lg hover:scale-105"
    >
      <span className="text-base" aria-hidden="true">
        🍄
      </span>
      <span className="hidden sm:inline">3D Gateway</span>
    </Link>
  );
}
