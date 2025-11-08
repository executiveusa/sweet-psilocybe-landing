import Layout from '@/components/Layout';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sweet Psilocybe | Research-First Plant Medicine Hub',
  description: 'Explore evidence-based psilocybin research, play educational games, and support the science through beautiful merchandise. 18+ Educational content only.',
  keywords: ['psilocybin', 'mushrooms', 'research', 'education', 'harm reduction', 'psychedelics'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
