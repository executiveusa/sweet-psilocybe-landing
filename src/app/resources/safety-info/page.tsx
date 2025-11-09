import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Safety Info',
  description: 'Safety and natural alternatives information for psilocybin',
};

export default function SafetyInfoPage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <AgeGate />
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-petal mb-6">Safety Information</h1>
        <p className="mb-4">Natural alternatives principles: set and setting, dose awareness, integration, and medical screening.</p>
        <ul className="list-disc list-inside">
          <li>Start with low doses and avoid mixing with other substances.</li>
          <li>Ensure supportive set and setting.</li>
          <li>Seek professional help for mental health concerns.</li>
        </ul>
      </section>
    </main>
  );
}
