import { http } from 'viem';
import { createConfig, createStorage, noopStorage } from 'wagmi';
import { getTestTenderlyChains } from './testTenderlyChain';
import { mock } from 'wagmi/connectors';
import { getTestWalletAddress } from '@/test/e2e/utils/testWallets';

const [tenderlyMainnet, tenderlyBase, tenderlyArbitrum] = getTestTenderlyChains();

// Get worker index from environment variable or default to 0
const workerIndex = Number(import.meta.env.VITE_TEST_WORKER_INDEX || 0);
const TEST_WALLET_ADDRESS = getTestWalletAddress(workerIndex);

export const mockWagmiConfig = createConfig({
  chains: [tenderlyMainnet, tenderlyBase, tenderlyArbitrum],
  connectors: [
    mock({
      accounts: [TEST_WALLET_ADDRESS],
      features: {
        reconnect: true
      }
    })
  ],
  transports: {
    [tenderlyMainnet.id]: http(),
    [tenderlyBase.id]: http(),
    [tenderlyArbitrum.id]: http()
  },
  storage: createStorage({
    storage: typeof window !== 'undefined' && window.localStorage ? window.localStorage : noopStorage,
    key: `wagmi-mock-${workerIndex}`
  })
});
