import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Research Partners',
  description: 'Research partners collaborating with Sweet Psilocybe',
};

export default function ResearchPartnersPage() {
  return (
    <main className="min-h-screen bg-transparent text-cream pt-28 pb-20 px-4">
      <AgeGate />
      <section className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#0B0D12]/80 backdrop-blur-xl px-6 sm:px-10 py-10">
        <h1 className="text-4xl font-bold text-petal mb-6">Research Partners</h1>
        <p className="mb-4">We collaborate with universities and non-profits to advance psilocybin research and safety.</p>
        <ul className="list-disc list-inside">
          <li>Johns Hopkins Center for Psychedelic and Consciousness Research</li>
          <li>Imperial College London</li>
          <li>MAPS (Multidisciplinary Association for Psychedelic Studies)</li>
        </ul>
      </section>
    </main>
  );
}
