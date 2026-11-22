import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Research Hub',
  description: 'Curated psilocybin research resources',
};

export default function ResearchHubPage() {
  return (
    <main className="min-h-screen bg-transparent text-cream pt-28 pb-20 px-4">
      <AgeGate />
      <section className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#0B0D12]/80 backdrop-blur-xl px-6 sm:px-10 py-10">
        <h1 className="text-4xl font-bold text-petal mb-6">Research Hub</h1>
        <p className="mb-4">Curated list of peer-reviewed studies and research resources about psilocybin and therapeutic applications.</p>
        <ul className="list-disc list-inside">
          <li>Griffiths et al. (2016) - psilocybin and depression/anxiety</li>
          <li>Carhart-Harris et al. (2016) - neural correlates</li>
          <li>Davis et al. (2020) - psilocybin-assisted therapy</li>
        </ul>
      </section>
    </main>
  );
}
