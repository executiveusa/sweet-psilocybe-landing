import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Research Hub',
  description: 'Curated psilocybin research resources',
};

export default function ResearchHubPage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <AgeGate />
      <section className="max-w-4xl mx-auto px-6 py-12">
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
