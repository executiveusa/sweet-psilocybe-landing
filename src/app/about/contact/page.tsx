import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Contact',
  description: 'Contact Sweet Psilocybe for research and inquiries',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent text-cream pt-28 pb-20 px-4">
      <AgeGate />
      <section className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#0B0D12]/80 backdrop-blur-xl px-6 sm:px-10 py-10">
        <h1 className="text-4xl font-bold text-petal mb-6">Contact</h1>
        <p className="mb-4">For research inquiries or partnerships, email <strong>info@sweetpsilocybe.com</strong>.</p>
        <p>We aim to respond within 48 hours for educational and research-related messages.</p>
      </section>
    </main>
  );
}
