import {
  HeroSection,
  BrandStrip,
  ProductShowcase,
  EmailCapture,
  FAQ,
  AgeGate,
} from '@/components';

export default function Home() {
  return (
    <main>
      <AgeGate />
      <HeroSection />
      <BrandStrip />
      <ProductShowcase />
      <EmailCapture />
      <FAQ />
    </main>
  );
}
