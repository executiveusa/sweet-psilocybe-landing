import {
  HeroSection,
  BrandStrip,
  AgeGate,
  PlayLearnGrow,
  SiteNavCards,
} from "@/components";

export default function Home() {
  return (
    <main>
      <AgeGate />
      <HeroSection />
      <PlayLearnGrow />
      <BrandStrip />
      <SiteNavCards />
    </main>
  );
}
