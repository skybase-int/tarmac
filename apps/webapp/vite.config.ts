import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { configDefaults } from 'vitest/config';
import { lingui } from '@lingui/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import simpleHtmlPlugin from 'vite-plugin-simple-html';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

enum modeEnum {
  development = 'development',
  production = 'production'
}

// https://vitejs.dev/config/
export default ({ mode }: { mode: modeEnum }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const RPC_PROVIDER_MAINNET = process.env.VITE_RPC_PROVIDER_MAINNET || '';
  const RPC_PROVIDER_SEPOLIA = process.env.VITE_RPC_PROVIDER_SEPOLIA || '';
  const RPC_PROVIDER_TENDERLY = process.env.VITE_RPC_PROVIDER_TENDERLY || '';
  const RPC_PROVIDER_BASE = process.env.VITE_RPC_PROVIDER_BASE || '';
  const RPC_PROVIDER_TENDERLY_BASE = process.env.VITE_RPC_PROVIDER_TENDERLY_BASE || '';
  const RPC_PROVIDER_ARBITRUM = process.env.VITE_RPC_PROVIDER_ARBITRUM || '';
  const RPC_PROVIDER_TENDERLY_ARBITRUM = process.env.VITE_RPC_PROVIDER_TENDERLY_ARBITRUM || '';

  // TODO: Remove this once we have the endpoint working with localhost so we don't have to use the proxy to prevent CORS issues
  const CHATBOT_ENDPOINT_HOST = process.env.VITE_CHATBOT_ENDPOINT_HOST || '';
  const CHATBOT_API_KEY = process.env.VITE_CHATBOT_API_KEY || '';

  const CONTENT_SECURITY_POLICY = `
    default-src 'self';
    script-src 'self'
      'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='
      https://static.cloudflareinsights.com
      https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://explorer-api.walletconnect.com;
    font-src 'self';
    connect-src 'self'
      ${RPC_PROVIDER_MAINNET}
      ${RPC_PROVIDER_TENDERLY}
      ${RPC_PROVIDER_SEPOLIA}
      ${RPC_PROVIDER_BASE}
      ${RPC_PROVIDER_TENDERLY_BASE}
      ${RPC_PROVIDER_ARBITRUM}
      ${RPC_PROVIDER_TENDERLY_ARBITRUM}
      https://virtual.mainnet.rpc.tenderly.co
      https://virtual.base.rpc.tenderly.co
      https://virtual.arbitrum.rpc.tenderly.co
      https://rpc.sepolia.org
      https://mainnet.base.org
      https://safe-transaction-mainnet.safe.global
      https://safe-transaction-base.safe.global
      https://safe-transaction-arbitrum.safe.global
      https://safe-transaction-sepolia.safe.global
      https://vote.makerdao.com
      https://query-subgraph-testnet.sky.money
      https://query-subgraph-staging.sky.money
      https://query-subgraph.sky.money
      https://api.thegraph.com
      https://staging-api.sky.money
      https://api.sky.money
      https://api.ipify.org
      https://info-sky.blockanalitica.com
      https://sky-tenderly.blockanalitica.com
      https://api.cow.fi/
      wss://relay.walletconnect.com
      wss://relay.walletconnect.org
      https://pulse.walletconnect.org
      wss://www.walletlink.org
      https://explorer-api.walletconnect.com/
      https://enhanced-provider.rainbow.me
      ${CHATBOT_ENDPOINT_HOST}
      cloudflareinsights.com;
    frame-src 'self'
      https://verify.walletconnect.com
      https://verify.walletconnect.org
`;

  // Need to remove whitespaces otherwise the app won't build due to unsupported characters
  const parsedCSP = CONTENT_SECURITY_POLICY.replace(/\n/g, '');

  return defineConfig({
    server: {
      // vite default is 5173
      port: 3000,
      // TODO: Remove this once we have the endpoint working with localhost so we don't have to use the proxy to prevent CORS issues
      proxy: {
        '/chatbot-api': {
          target: CHATBOT_ENDPOINT_HOST,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/chatbot-api/, CHATBOT_ENDPOINT_HOST),
          secure: false,
          configure: proxy => {
            proxy.on('proxyReq', proxyReq => {
              // Add custom headers to the proxied request
              proxyReq.setHeader('Authorization', `Bearer ${CHATBOT_API_KEY}`);
            });
          }
        }
      }
    },
    preview: {
      port: 3000
    },
    root: 'src',
    envDir: '../',
    build: {
      outDir: '../dist',
      emptyOutDir: true
    },
    test: {
      exclude: [...configDefaults.exclude],
      globals: true,
      environment: 'happy-dom'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        // If we're in dev mode, alias the packages to their local TypeScript source code for faster HMR
        ...(mode === modeEnum.development
          ? {
              '@jetstreamgg/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
              '@jetstreamgg/utils': path.resolve(__dirname, '../../packages/utils/src'),
              '@jetstreamgg/widgets': path.resolve(__dirname, '../../packages/widgets/src'),
              '@widgets': path.resolve(__dirname, '../../packages/widgets/src')
            }
          : {})
      }
    },
    optimizeDeps: {
      // Optimize safe-apps-provider dependency to get rid of the Safe connector issue
      // and be able to connect Safe apps
      include: ['wagmi > @safe-global/safe-apps-provider']
    },
    plugins: [
      simpleHtmlPlugin({
        minify: true,
        inject: {
          tags: [
            {
              tag: 'meta',
              attrs: {
                'http-equiv': 'Content-Security-Policy',
                content: parsedCSP
              }
            }
          ]
        }
      }),
      nodePolyfills({
        globals: {
          process: false
        },
        include: ['buffer']
      }),
      react({
        plugins: [['@lingui/swc-plugin', {}]]
      }),
      tailwindcss(),
      lingui()
    ]
  });
};
