import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Disclaimers',
  description: 'Important disclaimers about content on Sweet Psilocybe',
};

export default function DisclaimersPage() {
  return (
    <main className="min-h-screen bg-transparent text-cream pt-28 pb-20 px-4">
      <AgeGate />
      <section className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#0B0D12]/80 backdrop-blur-xl px-6 sm:px-10 py-10">
        <h1 className="text-4xl font-bold text-petal mb-6">Disclaimers</h1>
        <p className="mb-4">Content is educational only. We do not provide medical or legal advice. Psilocybin is illegal in many jurisdictions; know your local laws.</p>
        <ul className="list-disc list-inside">
          <li>18+ only</li>
          <li>Educational content, not medical advice</li>
          <li>Check local laws before taking any action</li>
        </ul>
      </section>
    </main>
  );
}
