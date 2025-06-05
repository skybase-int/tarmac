import { readFile } from 'fs/promises';
import { NetworkName } from './constants';

// export const getRpcUrlFromFile2 = async (network: NetworkName): Promise<string> => {
//   const file = await readFile('../../tenderlyTestnetData.json', 'utf-8');
//   const [
//     { TENDERLY_RPC_URL: TENDERLY_MAINNET_RPC_URL },
//     { TENDERLY_RPC_URL: TENDERLY_BASE_RPC_URL },
//     { TENDERLY_RPC_URL: TENDERLY_ARBITRUM_RPC_URL },
//     { TENDERLY_RPC_URL: OPTIMISM_RPC_URL },
//     { TENDERLY_RPC_URL: UNICHAIN_RPC_URL }
//   ] = JSON.parse(file);

//   if (network === NetworkName.base) return TENDERLY_BASE_RPC_URL;
//   if (network === NetworkName.arbitrum) return TENDERLY_ARBITRUM_RPC_URL;
//   if (network === NetworkName.optimism) return OPTIMISM_RPC_URL;
//   if (network === NetworkName.unichain) return UNICHAIN_RPC_URL;
//   return TENDERLY_MAINNET_RPC_URL;
// };

type TestnetData = { NETWORK: string; TENDERLY_TESTNET_ID: string; TENDERLY_RPC_URL: string };

export const getRpcUrlFromFile = async (network: NetworkName = NetworkName.mainnet): Promise<string> => {
  const file = await readFile('../../tenderlyTestnetData.json', 'utf-8');
  const data = JSON.parse(file);

  // Convert NetworkName to the corresponding chain name
  // const chainName = {
  //   [NetworkName.mainnet]: 'mainnet',
  //   [NetworkName.base]: 'base',
  //   [NetworkName.arbitrum]: 'arbitrum',
  //   [NetworkName.optimism]: 'optimism',
  //   [NetworkName.unichain]: 'unichain'
  // }[network];

  const networkData = data.find((item: TestnetData) => item.NETWORK === network);
  console.log('looking for network', network);
  if (!networkData) {
    console.error(`ChainName: ${network}. Data to review: ${data}`);
    throw new Error(`No RPC URL found for network ${network}`);
  }

  return networkData.TENDERLY_RPC_URL;
};
