import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getWagmiClientAndChains } from '../modules/providers/wagmi';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { MakerHooksProvider } from '@jetstreamgg/hooks';

import '@jetstreamgg/widgets/globals.css';

import '@fontsource/plus-jakarta-sans';
import '@rainbow-me/rainbowkit/styles.css';
import Home from './Home';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const App = () => {
  return (
    // <I18nProvider i18n={i18n}>
    <Wrapped />
    // </I18nProvider>
  );
};

const queryClient = new QueryClient();

const Wrapped = () => {
  // Chains should be regenerated each time the config.rpcs change
  const wagmiConfig = getWagmiClientAndChains('app-name');

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <MakerHooksProvider
          config={{
            delegates: {
              ens: 'vitalik.eth' // TODO: Change this to a real ENS address
            },
            ipfs: {
              gateway: ''
            }
          }}
        >
          <RainbowKitProvider
            theme={lightTheme()}
            showRecentTransactions={true}
            // initialChain={1}
          >
            <RouterProvider router={router} fallbackElement={<Home />} />
          </RainbowKitProvider>
        </MakerHooksProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
