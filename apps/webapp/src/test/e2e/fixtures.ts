import { test as playwrightTest, expect } from '@playwright/test';
import { waitForVnetsReady } from './utils/waitForVnetsReady';
import { evmRevert, evmSnapshot } from './utils/snapshotTestnet';
import { mockRpcCalls } from './mock-rpc-call';
import { mockVpnCheck } from './mock-vpn-check';
import { setErc20Balance, setEthBalance } from './utils/setBalance';
import {
  mcdDaiAddress,
  mkrAddress,
  skyAddress,
  usdcAddress,
  usdcBaseAddress,
  usdsAddress,
  usdsBaseAddress
} from '@jetstreamgg/hooks';
import { TENDERLY_BASE_CHAIN_ID, TENDERLY_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain';
import { NetworkName } from './utils/constants';

type WorkerFixture = {
  snapshotIds: string[];
};

type TestFixture = {
  autoTestFixture: void;
};

export const test = playwrightTest.extend<TestFixture, WorkerFixture>({
  // One-time setup fixture. This will run once at the beginning of the worker and provide the EVM snapshotIds to the tests or to other fixtures
  snapshotIds: [
    async (_, use) => {
      await waitForVnetsReady();

      // Fund address before taking the snapshot, so we can return to a point where the address already has the funds
      await Promise.all([
        // Mainnet funding
        await setErc20Balance(usdsAddress[TENDERLY_CHAIN_ID], '100'),
        await setErc20Balance(mcdDaiAddress[TENDERLY_CHAIN_ID], '100'),
        await setErc20Balance(mkrAddress[TENDERLY_CHAIN_ID], '10'),
        await setErc20Balance(skyAddress[TENDERLY_CHAIN_ID], '100000000'),
        await setErc20Balance(usdcAddress[TENDERLY_CHAIN_ID], '10', 6),
        // Base funding
        await setEthBalance('100', NetworkName.base),
        await setErc20Balance(usdsBaseAddress[TENDERLY_BASE_CHAIN_ID], '100', 18, NetworkName.base),
        await setErc20Balance(usdcBaseAddress[TENDERLY_BASE_CHAIN_ID], '100', 6, NetworkName.base)
      ]);

      const snapshotIds = await evmSnapshot();

      await use(snapshotIds);
    },
    { scope: 'worker', auto: true }
  ],
  // Auto fixture that will run for each test. By adding its code after the `use` call, we ensure that the fixture runs after the test
  autoTestFixture: [
    async ({ snapshotIds }, use) => {
      await use();

      // Restore the EVM snapshot after each test
      const allRevertsSuccessful = await evmRevert(snapshotIds);
      expect(allRevertsSuccessful).toBe(true);
    },
    { scope: 'test', auto: true }
  ]
});

test.beforeAll(async ({ page }) => {
  await page.route('https://virtual.**.rpc.tenderly.co/**', mockRpcCalls);
  await page.route('**/ip/status?ip=*', mockVpnCheck);
});

export { expect };
