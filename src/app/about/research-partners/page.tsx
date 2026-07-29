import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Research Partners',
  description: 'Research partners collaborating with Sweet Psilocybe',
};

export default function ResearchPartnersPage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <AgeGate />
      <section className="max-w-4xl mx-auto px-6 py-12">
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
