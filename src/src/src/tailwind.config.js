/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066FF', // Electric Blue
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        secondary: {
          50: '#fffce6',
          100: '#fff9cc',
          200: '#fff399',
          300: '#ffec66',
          400: '#ffe633',
          500: '#FFDD00', // Neon Yellow
          600: '#ccb100',
          700: '#998500',
          800: '#665800',
          900: '#332c00',
        },
        gray: {
          900: '#111111', // Near Black
          800: '#222222',
          700: '#333333',
          600: '#444444',
          500: '#666666',
          400: '#888888',
          300: '#AAAAAA',
          200: '#CCCCCC',
          100: '#EEEEEE',
          50: '#F7F7F7',
        },
        success: {
          500: '#10B981', // Emerald
        },
        warning: {
          500: '#F59E0B', // Amber
        },
        error: {
          500: '#EF4444', // Red
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};
