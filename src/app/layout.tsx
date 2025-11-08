import Layout from '@/components/Layout';
import './globals.css';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetpsilocybe.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sweet Psilocybe | Research-First Plant Medicine Hub',
    template: '%s | Sweet Psilocybe',
  },
  description: 'Explore evidence-based psilocybin research, play educational games, and support the science through beautiful merchandise. 18+ Educational content only.',
  applicationName: 'Sweet Psilocybe',
  authors: [{ name: 'Sweet Psilocybe Team' }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  creator: 'Sweet Psilocybe',
  publisher: 'Sweet Psilocybe',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Sweet Psilocybe',
    title: 'Sweet Psilocybe | Research-First Plant Medicine Hub',
    description: 'Explore evidence-based psilocybin research, play educational games, and support the science through beautiful merchandise. 18+ Educational content only.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sweet Psilocybe - Research-First Plant Medicine Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sweet Psilocybe | Research-First Plant Medicine Hub',
    description: 'Explore evidence-based psilocybin research, play educational games, and support the science through beautiful merchandise.',
    images: ['/images/twitter-image.png'],
    creator: '@sweetpsilocybe',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
  },
  category: 'education',
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
