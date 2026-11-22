import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Sweet Psilocybe handles your data',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-transparent text-cream pt-28 pb-20 px-4">
      <AgeGate />
      <section className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#0B0D12]/80 backdrop-blur-xl px-6 sm:px-10 py-10">
        <h1 className="text-4xl font-bold text-petal mb-6">Privacy Policy</h1>
        <p className="mb-4">We collect minimal data (email for newsletters) and use industry-standard safeguards. We do not sell personal information.</p>
        <p>If you wish to opt out, contact info@sweetpsilocybe.com.</p>
      </section>
    </main>
  );
}
