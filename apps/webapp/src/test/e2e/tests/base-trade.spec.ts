import { test } from '@playwright/test';
import { TENDERLY_BASE_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';
import { NetworkName } from '../utils/constants.ts';
import { runL2TradeTests } from './l2-trade.ts';

test.describe('Base trade tests', async () => {
  await runL2TradeTests({ networkName: NetworkName.base, chainId: TENDERLY_BASE_CHAIN_ID });
});
