import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Sweet Psilocybe',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <AgeGate />
      <section className="max-w-4xl mx-auto px-6 py-12">
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
