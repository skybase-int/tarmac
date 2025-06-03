import { readFile } from 'fs/promises';
import { NetworkName } from './constants';

type TestnetData = { NETWORK: string; TENDERLY_TESTNET_ID: string; TENDERLY_RPC_URL: string };

export const getRpcUrlFromFile = async (network: NetworkName): Promise<string> => {
  const file = await readFile('../../tenderlyTestnetData.json', 'utf-8');
  const data = JSON.parse(file);

  data.map((item, i) => console.log('Index and Item', i, item));

  // Convert NetworkName to the corresponding chain name
  const chainName = {
    [NetworkName.mainnet]: 'mainnet',
    [NetworkName.base]: 'base',
    [NetworkName.arbitrum]: 'arbitrum',
    [NetworkName.optimism]: 'optimism',
    [NetworkName.unichain]: 'unichain'
  }[network];

  const networkData = data.find((item: TestnetData) => item.NETWORK === chainName);
  if (!networkData) {
    console.error(`ChainName: ${chainName}. Data to review: ${data}`);
    throw new Error(`No RPC URL found for network ${network}`);
  }

  return networkData.TENDERLY_RPC_URL;
};
