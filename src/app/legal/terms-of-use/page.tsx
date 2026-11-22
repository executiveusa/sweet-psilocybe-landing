import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of Sweet Psilocybe',
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-transparent text-cream pt-28 pb-20 px-4">
      <AgeGate />
      <section className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#0B0D12]/80 backdrop-blur-xl px-6 sm:px-10 py-10">
        <h1 className="text-4xl font-bold text-petal mb-6">Terms of Use</h1>
        <p className="mb-4">By using Sweet Psilocybe you agree to our terms. This site is for educational purposes and restricted to adults (18+).</p>
        <p>We do not provide medical or legal advice. Use responsibly and comply with local laws.</p>
      </section>
    </main>
  );
}
