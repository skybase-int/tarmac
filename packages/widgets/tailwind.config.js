/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        // sm - xl are tailwind defaults, adding for reference
        // overriding lg from 1024px to 912px
        // 'sm': '640px',
        // 'md': '768px',
        lg: '912px',
        // 'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        graphik: ['GraphikStd'],
        circle: ['CircleStd']
      },
      colors: {
        // Typographic colors
        text: 'var(--primary-white)',
        textSecondary: 'var(--transparent-white-overlay-40)',
        bullish: 'var(--service-green)',
        textEmphasis: 'var(--primary-pink)',
        textMuted: 'var(--transparent-white-overlay-15)',
        error: 'var(--service-red)',
        textDimmed: 'rgba(255, 255, 255, 0.25)',
        textDesaturated: 'rgba(255, 255, 255, 0.5)',

        // Background colors
        containerDark: 'var(--transparent-black-85)',
        container: 'var(--transparent-black-65)',
        surface: 'var(--transparent-white-25)',
        surfaceAlt: 'var(--transparent-white-20)',
        panel: 'var(--transparent-white-25)',
        selectBackground: 'var(--transparent-white-25)',
        selectActive: 'var(--transparent-white-40)',
        widget: 'transparent',

        // Button colors
        primary: 'transparent',
        primaryHover: 'hsla(300, 100%, 25%, 0.5)',
        primaryActive: 'hsla(300, 100%, 25%, 0.2)',
        primaryFocus: 'hsla(300, 100%, 25%, 0.7)',
        primaryDisabled: 'hsla(200, 100%, 25%, 1)',

        secondary: 'var(--transparent-black-20)',
        secondaryHover: 'var(--transparent-black-20)',
        secondaryActive: 'var(--transparent-black-20)',
        secondaryFocus: 'var(--transparent-black-20)',
        secondaryDisabled: 'var(--transparent-black-20)',

        tab: 'var(--transparent-white-70)',
        tabPrimary: 'var(--transparent-white-40)',

        card: 'var(--transparent-white-15)',
        border: 'var(--transparent-white-15)',
        borderActive: '--transparent-white-25',
        cardHover: 'var(--service-purple-5)',

        brand: 'rgb(var(--brand-purple) / <alpha-value>)',
        brandLight: 'rgb(var(--brand-light-purple) / <alpha-value>)',

        // TODO: keep these until we delete the @apply rules in globals.css
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))'
      },
      backgroundImage: {
        // TODO: All button states need to either be in 'colors' or 'backgroundImage', or they will overlap. To use gradients, they must be in 'backgroundImage'
        primary:
          'radial-gradient(116.48% 116.48% at 50% 2.27%, rgba(61, 47, 164, var(--gradient-opacity)) 0%,rgba(76, 61, 183, var(--gradient-opacity)) 100%)',
        primaryAlt:
          'radial-gradient(116.48% 116.48% at 50% 2.27%, rgba(98, 89, 191, var(--gradient-opacity)) 0%,rgba(123, 113, 204, var(--gradient-opacity)) 100%)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.7, 0.0, 0.84, 0.0)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.03, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'bezier-mouse': 'cubic-bezier(0.4, 0.0, 0.2, 1)'
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms'
      },
      transitionProperty: {
        'gradient-opacity': '--gradient-opacity',
        'gradient-and-colors':
          '--gradient-opacity, color, background-color, border-color, text-decoration-color, fill, stroke'
      }
    }
  },
  plugins: [plugin]
};
