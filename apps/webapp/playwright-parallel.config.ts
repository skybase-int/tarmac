import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/test/e2e/tests',

  // Enable full parallelization
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // Use all available workers for true parallelization
  workers: process.env.CI ? 10 : 4, // Increase workers since we have 10 test accounts

  timeout: 120000,

  expect: {
    timeout: 15000
  },

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    video: 'off',
    // Add explicit viewport for all tests
    viewport: { width: 1920, height: 1080 },
    // Wait for network to be idle
    actionTimeout: 30000,
    navigationTimeout: 30000
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    }
  ],

  webServer: {
    command: 'VITE_PARALLEL_TEST=true pnpm dev:mock',
    port: 3000,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
    // Wait for the server to be fully ready
    stdout: 'pipe',
    stderr: 'pipe'
  }
});
