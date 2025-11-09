import {
  HeroSection,
  BrandStrip,
  ProductShowcase,
  EmailCapture,
  FAQ,
  AgeGate,
  PlayLearnGrow,
} from "@/components";

export default function Home() {
  return (
    <main>
      <AgeGate />
      <HeroSection />
      <PlayLearnGrow />
      <BrandStrip />
      <ProductShowcase />
      <EmailCapture />
      <FAQ />
    </main>
  );
}
