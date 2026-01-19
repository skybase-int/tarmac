import { readFile } from 'fs/promises';
import { NetworkName, TEST_WALLET_ADDRESS } from './constants';
import { parseEther, parseUnits, toHex } from 'viem';
import { getRpcUrlFromFile } from './getRpcUrlFromFile';

async function backOffRetry<T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay * 1000));
    return backOffRetry(fn, retries - 1, delay * 2);
  }
}

const setErc20BalanceRequest = async (
  tokenAddress: string,
  amount: string,
  decimals: number = 18,
  network = NetworkName.mainnet
) => {
  const rpcUrl = await getRpcUrlFromFile(network);

  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      method: 'tenderly_setErc20Balance',
      params: [tokenAddress, [TEST_WALLET_ADDRESS], toHex(parseUnits(amount, decimals))],
      id: 42,
      jsonrpc: '2.0'
    })
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
};

export const setErc20Balance = async (
  tokenAddress: string,
  amount: string,
  decimals: number = 18,
  network = NetworkName.mainnet
) => {
  await backOffRetry(() => setErc20BalanceRequest(tokenAddress, amount, decimals, network), 3, 1);
};

const setEthBalanceRequest = async (amount: string, network = NetworkName.mainnet) => {
  const rpcUrl = await getRpcUrlFromFile(network);

  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      method: 'tenderly_setBalance',
      params: [[TEST_WALLET_ADDRESS], toHex(parseEther(amount))],
      id: 42,
      jsonrpc: '2.0'
    })
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
};

export const setEthBalance = async (amount: string, network = NetworkName.mainnet) => {
  await backOffRetry(() => setEthBalanceRequest(amount, network), 3, 1);
};

const waitForVnetsReadyRequest = async () => {
  // Use alternate VNet config when USE_ALTERNATE_VNET env var is set
  const useAlternateVnet = process.env.USE_ALTERNATE_VNET === 'true';
  const configFile = useAlternateVnet
    ? '../../tenderlyTestnetData-alternate.json'
    : '../../tenderlyTestnetData.json';
  const file = await readFile(configFile, 'utf-8');
  const testnetsData = JSON.parse(file);

  // We send an `eth_blockNumber` request to the RPC endpoints to "ping" them
  const responses = await Promise.all(
    testnetsData.map(({ TENDERLY_RPC_URL }: { TENDERLY_RPC_URL: string }) =>
      fetch(TENDERLY_RPC_URL, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          method: 'eth_blockNumber',
          params: [],
          id: 42,
          jsonrpc: '2.0'
        })
      })
    )
  );

  // If all of the RPC endpoints respond with status 200, it means they are ready
  if (!responses.every(({ status }: { status: number }) => status === 200)) {
    throw new Error('Virtual testnets are not ready');
  }
};

export const waitForVnetsReady = async () => {
  await backOffRetry(() => waitForVnetsReadyRequest(), 6, 1);
};

/**
 * Set storage at a specific slot in a contract on the VNet.
 * Used to configure protocol parameters like debt ceilings.
 */
const setStorageAtRequest = async (
  contractAddress: string,
  slot: string,
  value: string,
  network = NetworkName.mainnet
) => {
  const rpcUrl = await getRpcUrlFromFile(network);

  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      method: 'tenderly_setStorageAt',
      params: [contractAddress, slot, value],
      id: 42,
      jsonrpc: '2.0'
    })
  });

  if (!response.ok) {
    throw new Error(`Error setting storage: ${response.statusText}`);
  }

  const result = await response.json();
  if (result.error) {
    throw new Error(`RPC error: ${result.error.message}`);
  }
};

export const setStorageAt = async (
  contractAddress: string,
  slot: string,
  value: string,
  network = NetworkName.mainnet
) => {
  await backOffRetry(() => setStorageAtRequest(contractAddress, slot, value, network), 3, 1);
};

// MakerDAO Vat contract address
const VAT_ADDRESS = '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B';

// Storage slot for LSEV2-SKY-A ilk's line (debt ceiling)
// Computed as: keccak256(ilk, 2) + 3, where ilk = 0x4c534556322d534b592d41... and 2 is the ilks mapping slot
const LSEV2_SKY_A_LINE_SLOT = '0x0b2fb9dcfebfeb5c8f6985ea98125a38a1adb70b7194dc26531c5e9ab986e536';

// Very high debt ceiling value (1e60 in RAD)
const HIGH_DEBT_CEILING = '0x000000000000009f4f2726179a224501d762422c946590d91000000000000000';

/**
 * Set high debt ceiling for the Stake module's SKY ilk (LSEV2-SKY-A).
 * This is needed because the fork may have a low or zero debt ceiling.
 */
export const setStakeModuleDebtCeiling = async () => {
  await setStorageAt(VAT_ADDRESS, LSEV2_SKY_A_LINE_SLOT, HIGH_DEBT_CEILING);
};

// stUSDS contract address
const STUSDS_ADDRESS = '0x99CD4Ec3f88A45940936F469E4bB72A2A701EEB9';

// Storage slot for stUSDS cap (slot 7 in the implementation)
const STUSDS_CAP_SLOT = '0x0000000000000000000000000000000000000000000000000000000000000007';

// Very high cap value (1e30)
const HIGH_STUSDS_CAP = '0x000000000000000000000000000000000000000c9f2c9cd04674edea40000000';

/**
 * Set high supply cap for stUSDS.
 * This is needed because the fork may have reached its supply cap.
 */
export const setStUsdsCap = async () => {
  await setStorageAt(STUSDS_ADDRESS, STUSDS_CAP_SLOT, HIGH_STUSDS_CAP);
};
