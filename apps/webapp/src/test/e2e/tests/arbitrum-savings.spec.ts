import { test } from '@playwright/test';
import { TENDERLY_ARBITRUM_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';
import { NetworkName } from '../utils/constants.ts';
import { runL2SavingsTests } from './l2-savings.ts';

test.describe('Arbitrum savings tests', async () => {
  await runL2SavingsTests({ networkName: NetworkName.arbitrum, chainId: TENDERLY_ARBITRUM_CHAIN_ID });
});
