import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sweet Psilocybe - Research-First Plant Medicine Hub',
    short_name: 'Sweet Psilocybe',
    description: 'Explore evidence-based psilocybin research, play educational games, and support the science through beautiful merchandise.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0B0B',
    theme_color: '#F6AFCF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['education', 'research', 'health'],
    orientation: 'portrait-primary',
  };
}
