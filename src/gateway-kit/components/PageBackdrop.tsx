"use client";

import React from "react";
import Image from "next/image";
import FireFliesBackground from "./FireFliesBackground";

function resolveBackdrop(pathname: string): { src: string; alt: string } {
  if (pathname.startsWith("/store")) {
    return {
      src: "/background/store-background.webp",
      alt: "Enchanted Pacific Northwest cedar apothecary overlooking the San Juan Islands",
    };
  }
  if (pathname.startsWith("/blog") || pathname.startsWith("/resources")) {
    return {
      src: "/background/blog-background.webp",
      alt: "Candlelit Pacific Northwest naturalist and mycologist study",
    };
  }
  if (pathname.startsWith("/library")) {
    return {
      src: "/background/library-background.webp",
      alt: "Misty Pacific Northwest Victorian glass conservatory and mycology archive",
    };
  }
  if (pathname.startsWith("/games")) {
    return {
      src: "/background/games-background.webp",
      alt: "Bioluminescent Pacific Northwest old-growth mushroom grove and twilight arcade clearing",
    };
  }
  return {
    src: "/background/home-twilight.webp",
    alt: "Enchanted Pacific Northwest forest clearing overlooking the San Juan Islands",
  };
}

/**
 * Pieces #02, #03, #04: Route-aware PNW painterly backdrop at z-0 (above body's dark base,
 * below z-10 page content) so Store, Blog, Library, Games, and Landing all display their
 * painted PNW worlds behind frosted-glass cards.
 */
export default function PageBackdrop({ pathname }: { pathname: string }) {
  const { src, alt } = resolveBackdrop(pathname || "/landing");

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden bg-ink"
      >
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          priority
          className="h-full w-full object-cover object-center opacity-95"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7, 10, 12, 0.22) 0%, rgba(7, 10, 12, 0.34) 55%, rgba(7, 10, 12, 0.62) 100%)",
          }}
        />
      </div>
      <FireFliesBackground />
    </>
  );
}
