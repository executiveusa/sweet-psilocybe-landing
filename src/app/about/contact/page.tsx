import { AgeGate } from '@/components';
import React from 'react';

export const metadata = {
  title: 'Contact',
  description: 'Contact Sweet Psilocybe for research and inquiries',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <AgeGate />
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-petal mb-6">Contact</h1>
        <p className="mb-4">For research inquiries or partnerships, email <strong>info@sweetpsilocybe.com</strong>.</p>
        <p>We aim to respond within 48 hours for educational and research-related messages.</p>
      </section>
    </main>
  );
}
