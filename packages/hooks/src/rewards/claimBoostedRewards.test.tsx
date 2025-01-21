import { describe, expect, it } from 'vitest';
import { GAS, WagmiWrapper } from '../../test';
import { renderHook, waitFor } from '@testing-library/react';
import { useTokenBalance } from '../tokens/useTokenBalance';
import { TENDERLY_CHAIN_ID } from '../constants';
import { waitForPreparedExecuteAndMine } from '../../test/helpers';
import { TOKENS } from '../tokens/tokens.constants';
import { useBoostedRewards } from './useBoostedRewards';
import { useClaimBoostedRewards } from './useClaimBoostedRewards';

describe('Boosted rewards claim hooks test', async () => {
  const wrapper = WagmiWrapper;
  const ADDRESS_TO_CLAIM = '0xAe093A04db8C418541538B071B2f69165F727d39';
  const AMOUNT_TO_CLAIM = 11259375n;

  it('Should claim boosted rewards for a given address', async () => {
    const { result: resultBoostedRewards } = renderHook(() => useBoostedRewards(ADDRESS_TO_CLAIM), {
      wrapper
    });

    await waitFor(
      () => {
        expect(resultBoostedRewards.current.data?.amount).toEqual(AMOUNT_TO_CLAIM.toString());
        return;
      },
      { timeout: 5000 }
    );

    const { result: resultSKYBalance } = renderHook(
      () => useTokenBalance({ address: ADDRESS_TO_CLAIM, token: TOKENS.sky.address[TENDERLY_CHAIN_ID] }),
      {
        wrapper
      }
    );

    // The address to claim should not have any SKY balance
    await waitFor(() => {
      expect(resultSKYBalance.current.data?.value).toEqual(0n);
      return;
    });

    const { result: resultClaimBoostedRewards } = renderHook(
      () =>
        useClaimBoostedRewards({
          address: ADDRESS_TO_CLAIM,
          boostedRewardsData: resultBoostedRewards.current.data,
          gas: GAS
        }),
      {
        wrapper
      }
    );

    await waitForPreparedExecuteAndMine(resultClaimBoostedRewards);

    resultSKYBalance.current.refetch();
    // After claiming, the address SKY balance should be equal to the amount that was claimed
    await waitFor(() => {
      expect(resultSKYBalance.current.data?.value).toEqual(AMOUNT_TO_CLAIM);
      return;
    });
  });
});
