import { http, WalletRpcSchema, EIP1193Parameters } from 'viem';
import { createConfig, createConnector, createStorage, noopStorage } from 'wagmi';
import {
  getTestTenderlyChains,
  TENDERLY_ARBITRUM_CHAIN_ID,
  TENDERLY_BASE_CHAIN_ID,
  TENDERLY_CHAIN_ID
} from './testTenderlyChain';
import { mock, MockParameters } from 'wagmi/connectors';
import { TEST_WALLET_ADDRESSES } from '@/test/e2e/utils/testWallets';
import { optimism, unichain } from 'viem/chains';

const [tenderlyMainnet, tenderlyBase, tenderlyArbitrum, tenderlyOptimism, tenderlyUnichain] =
  getTestTenderlyChains();

function extendedMock(params: MockParameters) {
  return createConnector(config => {
    const base = mock(params)(config);

    return {
      ...base,
      async getProvider({ chainId } = {}) {
        const provider = await base.getProvider({ chainId });

        return new Proxy(provider, {
          get(target, prop) {
            if (prop === 'request') {
              return async (args: EIP1193Parameters<WalletRpcSchema>) => {
                if (args.method === 'wallet_getCapabilities') {
                  return {
                    [TENDERLY_CHAIN_ID]: { atomic: { status: 'supported' } },
                    [TENDERLY_BASE_CHAIN_ID]: { atomic: { status: 'supported' } },
                    [TENDERLY_ARBITRUM_CHAIN_ID]: { atomic: { status: 'supported' } },
                    [optimism.id]: { atomic: { status: 'supported' } },
                    [unichain.id]: { atomic: { status: 'supported' } }
                  };
                }

                if (args.method === 'wallet_sendCalls') {
                  const params = args.params as any;
                  const calls = params[0].calls;
                  const from = params[0].from;

                  const modifiedParams = [
                    {
                      ...params[0],
                      calls: calls.map((call: any) => ({
                        ...call,
                        ...(typeof from !== 'undefined' ? { from } : {})
                      }))
                    }
                  ];

                  const modifiedArgs = {
                    method: args.method,
                    params: modifiedParams
                  } as EIP1193Parameters<WalletRpcSchema>;

                  return await target.request(modifiedArgs);
                }

                return target.request(args);
              };
            }
            return target[prop as keyof typeof target];
          }
        });
      }
    };
  });
}

// Get the account from the injected window variable or environment
function getWorkerAccount(): [`0x${string}`, ...`0x${string}`[]] {
  if (typeof window !== 'undefined') {
    const testAccount = (window as any).__TEST_ACCOUNT__;
    if (testAccount) {
      // Return only the specific account for this worker
      return [testAccount as `0x${string}`];
    }
  }

  // Fallback to environment variable
  const workerIndex = Number(import.meta.env.VITE_TEST_WORKER_INDEX || 0);
  const account = TEST_WALLET_ADDRESSES[workerIndex % TEST_WALLET_ADDRESSES.length];
  return [account];
}

export const mockWagmiConfig = createConfig({
  chains: [tenderlyMainnet, tenderlyBase, tenderlyArbitrum, tenderlyOptimism, tenderlyUnichain],
  connectors: [
    mock({
      accounts: getWorkerAccount(),
      features: {
        reconnect: true
      }
    }),
    extendedMock({
      accounts: getWorkerAccount(),
      features: {
        reconnect: true
      }
    })
  ],
  transports: {
    [tenderlyMainnet.id]: http(),
    [tenderlyBase.id]: http(),
    [tenderlyArbitrum.id]: http(),
    [optimism.id]: http(),
    [unichain.id]: http()
  },
  storage: createStorage({
    storage: typeof window !== 'undefined' && window.localStorage ? window.localStorage : noopStorage,
    key: `wagmi-mock-${(window as any).__WORKER_INDEX__ || 0}`
  })
});
