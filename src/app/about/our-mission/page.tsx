import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Our Mission',
  description: 'Sweet Psilocybe mission - education, research, natural alternatives',
};

export default function OurMissionPage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <AgeGate />
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-petal mb-6">Our Mission</h1>
        <p className="mb-4">
          Sweet Psilocybe is dedicated to advancing evidence-based education and natural alternatives practices
          around psilocybin research. We provide accessible resources for researchers, clinicians, and the
          public while emphasizing safety, legal compliance, and community support.
        </p>
        <p>
          Our focus is on sharing peer-reviewed findings, connecting research partners, and promoting
          responsible conversations about plant medicine in therapeutic and research contexts.
        </p>
      </section>
    </main>
  );
}
