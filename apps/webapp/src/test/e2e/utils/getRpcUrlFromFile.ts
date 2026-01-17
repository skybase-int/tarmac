import { readFile } from 'fs/promises';
import { NetworkName } from './constants';

type TestnetData = { NETWORK: string; TENDERLY_TESTNET_ID: string; TENDERLY_RPC_URL: string };

/**
 * Get the appropriate VNet data file based on environment
 * - stUSDS tests use tenderlyTestnetData-stusds.json (has Curve pool for stUSDS)
 * - All other tests use tenderlyTestnetData.json (standard fork)
 */
function getVnetDataFile(): string {
  const useStUsdsVnet = process.env.USE_STUSDS_VNET === 'true';
  return useStUsdsVnet ? '../../tenderlyTestnetData-stusds.json' : '../../tenderlyTestnetData.json';
}

export const getRpcUrlFromFile = async (network: NetworkName): Promise<string> => {
  const vnetFile = getVnetDataFile();
  const file = await readFile(vnetFile, 'utf-8');
  const data = JSON.parse(file);

  const networkData = data.find((item: TestnetData) => item.NETWORK === network);

  if (!networkData) {
    throw new Error(`No RPC URL found for network ${network} in ${vnetFile}`);
  }

  return networkData.TENDERLY_RPC_URL;
};
