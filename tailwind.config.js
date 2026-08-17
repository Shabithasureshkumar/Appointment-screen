/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#F1ECFB',
          100: '#E4D9F9',
          400: '#9A6AFB',
          500: '#8B5CF6',
          600: '#6B38D4',
          700: '#5C24FF',
          800: '#590FED',
          900: '#4F46E5',
          // Semantic aliases for values that repeat across components (kept
          // distinct from the numeric scale since they're not tint/shade
          // steps of the same hue).
          mist: '#ECE9FF',
          accent: '#744BFF',
        },
        ink: {
          900: '#25253A',
          400: '#9292A5',
        },
        danger: {
          50: '#FFF1F1',
          200: '#FFB8B8',
          500: '#EF4444',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(93deg, #9A6AFB 0%, #5C24FF 100%)',
        'brand-gradient-btn': 'linear-gradient(92deg, #5C24FF 0%, #A880FF 100%)',
        'brand-gradient-vertical': 'linear-gradient(180deg, #AF88FF 0%, #5C24FF 100%)',
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(91, 51, 219, 0.06)',
        soft: '0 2px 12px 0 rgba(16, 24, 40, 0.04)',
      },
    },
  },
  plugins: [],
}
