import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Sweet Psilocybe',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-transparent text-cream pt-28 pb-20 px-4">
      <AgeGate />
      <section className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#0B0D12]/80 backdrop-blur-xl px-6 sm:px-10 py-10">
        <h1 className="text-4xl font-bold text-petal mb-6">Frequently Asked Questions</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-fern mb-2">Is this medical advice?</h2>
            <p>No. This site provides educational resources only.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-fern mb-2">Do you sell psilocybin?</h2>
            <p>No. We only provide educational materials and merchandise.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
