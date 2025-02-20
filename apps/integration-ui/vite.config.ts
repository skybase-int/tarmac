import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { configDefaults } from 'vitest/config';
import { lingui } from '@lingui/vite-plugin';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // this was originally changed from vite's default of 5173 to work with cypress
    // we no longer use cypress, so can change back, but everyone is used to port 3000 now
    port: 3000
  },
  root: 'src',
  envDir: '../',
  build: {
    outDir: '../dist'
  },
  test: {
    exclude: [...configDefaults.exclude],
    globals: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    // Optimize safe-apps-provider dependency to get rid of the Safe connector issue
    // and be able to connect Safe apps
    include: ['wagmi > @safe-global/safe-apps-provider']
  },
  plugins: [
    react({
      plugins: [['@lingui/swc-plugin', {}]]
    }),
    tailwindcss(),
    lingui(),
    visualizer()
  ]
});
