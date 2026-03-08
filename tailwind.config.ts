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
          black: '#000000',
          'near-black': '#111111',
          charcoal: '#1A1A1A',
          gold: '#C9B45A',
          cream: '#F2EDE3',
          'off-white': '#FAF9F6',
          orange: '#E8922E',
          'orange-light': '#F0A030',
          'orange-dark': '#D07B28',
          amber: '#F5A623',
        },
      },
      fontFamily: {
        primary: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1320px',
        'container-wide': '1600px',
      },
    },
  },
  plugins: [],
}

export default config
