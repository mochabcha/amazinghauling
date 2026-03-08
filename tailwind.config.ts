import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1628',
          blue: '#1B3A5C',
          gold: '#D4A843',
          'gold-light': '#E8C96A',
          orange: '#E87C2E',
          'orange-dark': '#C4601A',
          white: '#FFFFFF',
          'off-white': '#F5F3EF',
          'gray-light': '#E8E6E1',
          gray: '#8A8A8A',
          'gray-dark': '#4A4A4A',
          black: '#1A1A1A',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        section: '6rem',
        'section-sm': '3rem',
      },
      maxWidth: {
        container: '1280px',
        'container-wide': '1440px',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up-reveal': {
          '0%': { opacity: '0', transform: 'translateY(80px)', clipPath: 'inset(100% 0 0 0)' },
          '100%': { opacity: '1', transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' },
        },
        'counter-up': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'draw-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'parallax-slow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.8s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'slide-up-reveal': 'slide-up-reveal 1s ease-out forwards',
        'counter-up': 'counter-up 0.5s ease-out forwards',
        'draw-line': 'draw-line 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
