import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        charcoal: '#1a1a1d',
        'muted-lavender': '#9b8fa6',
        'sage-green': '#8a9a8e',
        'off-white': '#f5f5f0',
      },
    },
  },
  plugins: [],
} satisfies Config;
