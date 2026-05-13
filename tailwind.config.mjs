/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Deep space palette
        space: {
          950: '#03060f',
          900: '#060d1f',
          800: '#0a1530',
          700: '#0f2050',
          600: '#152a6e',
        },
        star: {
          gold:    '#f5c842',
          silver:  '#c8d8e8',
          white:   '#eef4ff',
        },
        nebula: {
          blue:    '#4a9eff',
          purple:  '#9b6dff',
          teal:    '#2dd4bf',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Source Serif 4"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        stargazer: {
          css: {
            '--tw-prose-body':         theme('colors.star.silver'),
            '--tw-prose-headings':     theme('colors.star.white'),
            '--tw-prose-links':        theme('colors.nebula.blue'),
            '--tw-prose-bold':         theme('colors.star.white'),
            '--tw-prose-code':         theme('colors.star.gold'),
            '--tw-prose-quotes':       theme('colors.star.silver'),
            '--tw-prose-quote-borders':theme('colors.nebula.purple'),
            maxWidth: 'none',
          },
        },
      }),
      backgroundImage: {
        'star-field': "radial-gradient(ellipse at top, #0f2050 0%, #060d1f 50%, #03060f 100%)",
        'nebula-glow': "radial-gradient(ellipse at 30% 50%, rgba(155,109,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(74,158,255,0.12) 0%, transparent 50%)",
      },
      animation: {
        'twinkle':     'twinkle 3s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'fade-up':     'fadeUp 0.6s ease-out forwards',
        'slide-in':    'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.3 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
