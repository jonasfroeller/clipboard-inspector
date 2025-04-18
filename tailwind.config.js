/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3766F4',
          600: '#2F55D9',
          700: '#2644B5',
        },
        purple: {
          500: '#7E57C2',
          600: '#6A48A8',
          700: '#563B8A',
        },
        teal: {
          500: '#26A69A',
          600: '#1F8C82',
          700: '#197269',
        },
        gray: {
          750: '#111827',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};