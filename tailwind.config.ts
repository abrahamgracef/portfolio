import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAFAF9',
          warm: '#FBFBFB',
          subtle: '#F4F4F2',
        },
        surface: '#FFFFFF',
        accent: {
          blue: {
            DEFAULT: '#0055FF',
            hover: '#0040CC',
            light: '#E6EFFF',
            subtle: 'rgba(0, 85, 255, 0.08)',
          },
        },
        technical: {
          black: '#0A0A0A',
          muted: '#525252',
          subtle: '#737373',
          border: '#000000',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'Barlow Condensed', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderWidth: {
        '1': '1px',
      },
      boxShadow: {
        'hard': '2px 2px 0px #000000',
        'hard-blue': '2px 2px 0px #0055FF',
        'none': 'none',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.85)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
