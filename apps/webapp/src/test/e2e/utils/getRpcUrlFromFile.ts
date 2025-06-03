import { readFile } from 'fs/promises';
import { NetworkName } from './constants';

export const getRpcUrlFromFile = async (network: NetworkName): Promise<string> => {
  const file = await readFile('../../tenderlyTestnetData.json', 'utf-8');
  const data = JSON.parse(file);

  // Convert NetworkName to the corresponding chain name
  const chainName = {
    [NetworkName.mainnet]: 'mainnet',
    [NetworkName.base]: 'base',
    [NetworkName.arbitrum]: 'arbitrum',
    [NetworkName.optimism]: 'optimism',
    [NetworkName.unichain]: 'unichain'
  }[network];

  if (!data[chainName]) {
    throw new Error(`No RPC URL found for network ${network}`);
  }

  return data[chainName].TENDERLY_RPC_URL;
};
