import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of Sweet Psilocybe',
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <AgeGate />
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-petal mb-6">Terms of Use</h1>
        <p className="mb-4">By using Sweet Psilocybe you agree to our terms. This site is for educational purposes and restricted to adults (18+).</p>
        <p>We do not provide medical or legal advice. Use responsibly and comply with local laws.</p>
      </section>
    </main>
  );
}
