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
  return {
    src: "/background/home-twilight.webp",
    alt: "Enchanted Pacific Northwest forest clearing overlooking the San Juan Islands",
  };
}

/**
 * Pieces #02, #03, #04: Route-aware PNW painterly backdrop + subtle scrim + drifting fireflies
 * rendered behind all inner pages (/landing, /store, /blog, /library, /games).
 */
export default function PageBackdrop({ pathname }: { pathname: string }) {
  const { src, alt } = resolveBackdrop(pathname || "/landing");

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-ink"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-center opacity-45"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7, 10, 12, 0.58) 0%, rgba(7, 10, 12, 0.72) 55%, rgba(7, 10, 12, 0.88) 100%)",
          }}
        />
      </div>
      <FireFliesBackground />
    </>
  );
}
