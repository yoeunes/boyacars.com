/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_vehicles/**/*.md',
    './pages/**/*.html',
    './index.html',
    './frontend/**/*.{js,css}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4E4BC',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        'premium': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'premium-lg': '0 20px 60px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
