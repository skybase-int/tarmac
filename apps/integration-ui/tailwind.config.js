/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './modules/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@jetstreamgg/widgets/**/*.js'
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
    // do not use this, the styles should come from the widget package
    extend: {
      colors: {}
    }
  },
  plugins: [plugin]
};
