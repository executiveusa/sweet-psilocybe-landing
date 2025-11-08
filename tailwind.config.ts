import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(11 11 11 / <alpha-value>)',
        petal: 'rgb(246 175 207 / <alpha-value>)',
        spore: 'rgb(255 237 238 / <alpha-value>)',
        fern: 'rgb(169 192 176 / <alpha-value>)',
        cream: 'rgb(247 243 239 / <alpha-value>)',
      },
      boxShadow: {
        'glow-petal': '0 10px 30px rgba(246, 175, 207, 0.25)',
        'glow-fern': '0 10px 30px rgba(169, 192, 176, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
