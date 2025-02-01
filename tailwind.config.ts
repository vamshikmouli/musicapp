import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E0A6F0', // Very Light Lavender
          100: '#C45EDC', // Light Lavender
          200: '#B351CC', // Soft Purple
          300: '#A344BC', // Lilac Purple
          400: '#9335AC', // Medium Purple
          500: '#832296', // Deep Purple (Original)
          600: '#722583', // Dark Grape
          700: '#621F70', // Plum Purple
          800: '#511B5C', // Rich Eggplant
          900: '#411649', // Deep Violet
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
