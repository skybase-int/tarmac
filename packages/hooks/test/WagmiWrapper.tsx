/// <reference types="vite/client" />

import React from 'react';
import { mock } from 'wagmi/connectors';

import { createConfig, WagmiProvider, http } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { getTenderlyChains } from './tenderlyChain';
import { TEST_WALLET_ADDRESS } from './constants';
import { createTestClient } from 'viem';

const [tenderlyMainnet, tenderlyBase] = getTenderlyChains();

export const config = createConfig({
  chains: [tenderlyMainnet, tenderlyBase],
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
    [tenderlyBase.id]: http()
  }
});

const queryClient = new QueryClient();

export function WagmiWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export const testClientMainnet = createTestClient({
  chain: tenderlyMainnet,
  mode: 'anvil',
  transport: http()
});

export const testClientBase = createTestClient({
  chain: tenderlyBase,
  mode: 'anvil',
  transport: http()
});
