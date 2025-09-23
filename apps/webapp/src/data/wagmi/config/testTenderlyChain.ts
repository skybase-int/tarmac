import { Chain, defineChain } from 'viem';
import tenderlyTestnetData from '../../../../../../tenderlyTestnetData.json' with { type: 'json' };
import { arbitrum, base, mainnet, optimism, unichain } from 'viem/chains';
import { NetworkName } from '../../../test/e2e/utils/constants';

export const TENDERLY_CHAIN_ID = 314310;

// only works if hardcoded, cannot be set via env variable. Corresponds to the public RPC of `mainnet-fork-sep-9-2025`
export const TENDERLY_RPC_URL =
  'https://virtual.mainnet.eu.rpc.tenderly.co/7f1bbe9c-f9b9-4350-95ce-5a969f32568b';

export const getTestTenderlyChains = () => {
  const mainnetData = tenderlyTestnetData.find(data => data.NETWORK === NetworkName.mainnet);
  const arbitrumData = tenderlyTestnetData.find(data => data.NETWORK === NetworkName.arbitrum);
  const baseData = tenderlyTestnetData.find(data => data.NETWORK === NetworkName.base);
  const optimismData = tenderlyTestnetData.find(data => data.NETWORK === NetworkName.optimism);
  const unichainData = tenderlyTestnetData.find(data => data.NETWORK === NetworkName.unichain);

  if (!mainnetData || !arbitrumData || !baseData || !optimismData || !unichainData) {
    throw new Error('Missing required network data from tenderlyTestnetData file');
  }

  return [
    defineChain({
      ...mainnet,
      id: TENDERLY_CHAIN_ID,
      name: 'Tenderly Mainnet',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: { http: [mainnetData.TENDERLY_RPC_URL || TENDERLY_RPC_URL] }
      }
    }),
    defineChain({
      ...base,
      name: 'Tenderly Base',
      rpcUrls: {
        default: { http: [baseData.TENDERLY_RPC_URL] }
      }
    }),
    defineChain({
      ...arbitrum,
      name: 'Tenderly Arbitrum',
      rpcUrls: {
        default: { http: [arbitrumData.TENDERLY_RPC_URL] }
      }
    }),
    defineChain({
      ...optimism,
      name: 'Tenderly Optimism',
      rpcUrls: {
        default: { http: [optimismData.TENDERLY_RPC_URL] }
      }
    }),
    defineChain({
      ...unichain,
      name: 'Tenderly Unichain',
      rpcUrls: {
        default: { http: [unichainData.TENDERLY_RPC_URL] }
      }
    })
  ] as readonly Chain[];
};
