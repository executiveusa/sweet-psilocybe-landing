import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Sweet Psilocybe handles your data',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <AgeGate />
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-petal mb-6">Privacy Policy</h1>
        <p className="mb-4">We collect minimal data (email for newsletters) and use industry-standard safeguards. We do not sell personal information.</p>
        <p>If you wish to opt out, contact info@sweetpsilocybe.com.</p>
      </section>
    </main>
  );
}
