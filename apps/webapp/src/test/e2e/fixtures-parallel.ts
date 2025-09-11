import { test as baseTest, expect } from './fixtures';
import { getTestWalletAddress } from './utils/testWallets';
import { WorkerInfo } from '@playwright/test';

type TestFixtures = {
  testAccount: `0x${string}`;
  isolatedPage: typeof baseTest.prototype.page;
};

// Extend the existing fixture that already handles snapshots and balances
export const test = baseTest.extend<TestFixtures>({
  // Each test gets the worker's account from the existing fixture setup
  testAccount: async (_, use, workerInfo) => {
    const account = getTestWalletAddress(workerInfo.workerIndex).toLowerCase() as `0x${string}`;
    await use(account);
  },

  // Use the same page but ensure it uses the worker-specific account
  isolatedPage: async ({ page }, use, workerInfo: WorkerInfo) => {
    // The worker index is already set in process.env.VITE_TEST_WORKER_INDEX by the base fixture
    // Just verify it's set correctly
    const expectedIndex = String(workerInfo.workerIndex);
    if (process.env.VITE_TEST_WORKER_INDEX !== expectedIndex) {
      console.warn(
        `Worker index mismatch: expected ${expectedIndex}, got ${process.env.VITE_TEST_WORKER_INDEX}`
      );
    }

    // Inject the worker-specific account into the page for client-side access
    const account = getTestWalletAddress(workerInfo.workerIndex);
    await page.addInitScript(
      data => {
        (window as any).__TEST_ACCOUNT__ = data.account;
        (window as any).__WORKER_INDEX__ = data.index;
      },
      { account, index: workerInfo.workerIndex }
    );

    await use(page);
  }
});

export { expect };
