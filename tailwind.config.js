/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#F8F5FF',
          100: '#F0E8FF',
          200: '#E2D5FF',
          300: '#D3BBFF',
          400: '#C6B9FF',
          500: '#8C7CF0',
          600: '#7A69E0',
          700: '#6856D0',
          800: '#5643C0',
          900: '#4430B0',
        },
        secondary: {
          green: '#94E1B5',
          yellow: '#FFE6A6',
          orange: '#FFC8A2',
        },
        background: {
          light: '#FAFAFF',
          card: '#FFFFFF',
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(140, 124, 240, 0.1)',
        'hover': '0 8px 30px rgba(140, 124, 240, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
