"use client";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Wrapper, Inner, Pill, HeroTextContainer } from "./styles";
import ic_chevron_right from "../../../../public/svgs/ic_chevron_right.svg";
import { GetStartedButton } from "@/components";
import MaskText from "@/components/Common/MaskText";
import { useIsMobile } from "../../../../libs/useIsMobile";
import {
  mobileParagraphPhrases,
  mobilePhrases,
  paragraphPhrases,
  phrases,
} from "./constants";

const HeroSection = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect: background moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -100]);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      // Disable parallax for users who prefer reduced motion
    }
  }, []);

  return (
    <Wrapper ref={containerRef}>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "120vh", // Slightly larger for parallax effect
          zIndex: 0,
          overflow: "hidden",
          y, // Apply parallax transform
        }}
      >
        <Image
          src={"/images/sweet pslocybe.webp"}
          alt="Sweet Psilocybe Hero Background"
          fill
          style={{
            objectFit: isMobile ? "cover" : "contain", // Show full artwork on desktop
            objectPosition: "center",
            zIndex: 0,
            transition: "opacity 0.3s ease",
            opacity: imageLoaded ? 1 : 0,
          }}
          priority
          onLoadingComplete={() => setImageLoaded(true)}
          sizes="100vw"
        />
      </motion.div>
      <Inner style={{ position: "relative", zIndex: 1 }}>
        <Pill>
          <span>18+ Educational Content Only</span>
          <Image src={ic_chevron_right} alt="chevron-right" />
        </Pill>
        <HeroTextContainer>
          {isMobile ? (
            <>
              <MaskText phrases={mobilePhrases} tag="h1" />
              <MaskText phrases={mobileParagraphPhrases} tag="p" />
            </>
          ) : (
            <>
              <MaskText phrases={phrases} tag="h1" />
              <MaskText phrases={paragraphPhrases} tag="p" />
            </>
          )}
        </HeroTextContainer>
        <GetStartedButton padding="1rem 2rem" />
      </Inner>
    </Wrapper>
  );
};

export default HeroSection;
