import { describe, expect, it, afterAll } from 'vitest';
import { renderHook, waitFor, cleanup } from '@testing-library/react';
import { WagmiWrapper, TEST_WALLET_ADDRESS, GAS } from '../../test';
import { useAvailableTokenRewardContracts } from './useAvailableTokenRewardContracts';
import { useRewardsSupply } from './useRewardsSupply';
import { parseEther } from 'viem';
import { useTokenBalance } from '../tokens/useTokenBalance';
import { useApproveToken } from '../tokens/useApproveToken';
import { useRewardsWithdraw } from './useRewardsWithdraw';
import { TENDERLY_CHAIN_ID } from '../constants';
import { waitForPreparedExecuteAndMine } from '../../test/helpers';
import { usdsAddress, usdsSkyRewardAddress } from '../generated';
import { useTokenAllowance } from '../tokens/useTokenAllowance';
import { useBatchRewardsSupply } from './useBatchRewardsSupply';

describe('Supply and withdraw in rewards', async () => {
  it(
    'Should return data about the total supplied',
    {
      timeout: 90000
    },
    async () => {
      const { result: resultRewardContracts } = renderHook(
        () => useAvailableTokenRewardContracts(TENDERLY_CHAIN_ID),
        {
          wrapper: WagmiWrapper
        }
      );

      await waitFor(
        () => {
          expect(resultRewardContracts.current.length).toBeGreaterThan(0);
          return;
        },
        { timeout: 5000 }
      );

      // Approve token spending in the reward contract
      const { result: resultApprove } = renderHook(
        () =>
          useApproveToken({
            contractAddress: resultRewardContracts.current[0].supplyToken.address[TENDERLY_CHAIN_ID],
            spender: resultRewardContracts.current[0].contractAddress as `0x${string}`,
            amount: parseEther('1'),
            gas: GAS
          }),

        {
          wrapper: WagmiWrapper
        }
      );

      // Get the balance of tokens for that user
      const { result: resultBalance } = renderHook(
        () =>
          useTokenBalance({
            address: TEST_WALLET_ADDRESS,
            token: resultRewardContracts.current[0].supplyToken.address[TENDERLY_CHAIN_ID],
            chainId: TENDERLY_CHAIN_ID
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      // The user should have some USDS tokens
      let initialBalance: string = '0';
      await waitFor(
        () => {
          expect(resultBalance.current.data?.formatted).toBeDefined();
          expect(Number(resultBalance.current.data?.formatted)).toBeGreaterThanOrEqual(1);
          initialBalance = resultBalance.current.data?.formatted ?? '0';
          return;
        },
        { timeout: 5000 }
      );

      await waitForPreparedExecuteAndMine(resultApprove);

      // Get the first reward contract and call the supply function
      const { result: resultSupply } = renderHook(
        () =>
          useRewardsSupply({
            contractAddress: resultRewardContracts.current[0].contractAddress as `0x${string}`,
            supplyTokenAddress: resultRewardContracts.current[0].supplyToken.address[TENDERLY_CHAIN_ID],
            amount: parseEther('1'),
            enabled: true,
            gas: GAS
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      await waitForPreparedExecuteAndMine(resultSupply);

      // Get the balance of tokens for that user
      const { result: resultBalance2 } = renderHook(
        () =>
          useTokenBalance({
            address: TEST_WALLET_ADDRESS,
            token: resultRewardContracts.current[0].supplyToken.address[TENDERLY_CHAIN_ID],
            chainId: TENDERLY_CHAIN_ID
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      // The user should have less USDS tokens after supplying
      const expectedBalanceAfterSupply = (Number(initialBalance) - 1).toString();
      await waitFor(
        () => {
          expect(resultBalance2.current.data?.formatted).toEqual(expectedBalanceAfterSupply);
          return;
        },
        { timeout: 15000 }
      );
    }
  );

  it(
    'should withdraw',
    {
      timeout: 90000
    },
    async () => {
      const { result: resultRewardContracts } = renderHook(
        () => useAvailableTokenRewardContracts(TENDERLY_CHAIN_ID),
        {
          wrapper: WagmiWrapper
        }
      );

      await waitFor(
        () => {
          expect(resultRewardContracts.current.length).toBeGreaterThan(0);
          return;
        },
        { timeout: 10000 }
      );

      // Get the first reward contract and call the supply function
      const { result: resultWithdraw } = renderHook(
        () =>
          useRewardsWithdraw({
            contractAddress: resultRewardContracts.current[0].contractAddress as `0x${string}`,
            amount: parseEther('1'),
            enabled: true,
            gas: GAS
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      await waitForPreparedExecuteAndMine(resultWithdraw);

      // Get the balance of tokens for that user before withdrawal
      const { result: resultBalanceBefore } = renderHook(
        () =>
          useTokenBalance({
            address: TEST_WALLET_ADDRESS,
            token: resultRewardContracts.current[0].supplyToken.address[TENDERLY_CHAIN_ID],
            chainId: TENDERLY_CHAIN_ID
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      let initialBalance: string = '0';
      await waitFor(
        () => {
          expect(resultBalanceBefore.current.data?.formatted).toBeDefined();
          expect(Number(resultBalanceBefore.current.data?.formatted)).toBeGreaterThanOrEqual(1);
          initialBalance = resultBalanceBefore.current.data?.formatted ?? '0';
          return;
        },
        { timeout: 15000 }
      );

      // After withdrawal, get balance again and verify it increased
      const { result: resultBalanceAfter } = renderHook(
        () =>
          useTokenBalance({
            address: TEST_WALLET_ADDRESS,
            token: resultRewardContracts.current[0].supplyToken.address[TENDERLY_CHAIN_ID],
            chainId: TENDERLY_CHAIN_ID
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      // The user should have more tokens after withdrawing
      const expectedBalanceAfterWithdraw = (Number(initialBalance) + 1).toString();
      await waitFor(
        () => {
          expect(resultBalanceAfter.current.data?.formatted).toEqual(expectedBalanceAfterWithdraw);
          return;
        },
        { timeout: 15000 }
      );
    }
  );

  it('Batch - should supply', { timeout: 90000 }, async () => {
    const supplyTokenAddres = usdsAddress[TENDERLY_CHAIN_ID];
    const rewardContractAddress = usdsSkyRewardAddress[TENDERLY_CHAIN_ID];

    // Get initial balance
    const { result: resultInitialBalance } = renderHook(
      () =>
        useTokenBalance({
          address: TEST_WALLET_ADDRESS,
          token: supplyTokenAddres,
          chainId: TENDERLY_CHAIN_ID
        }),
      {
        wrapper: WagmiWrapper
      }
    );

    let initialBalance: string = '0';
    await waitFor(
      () => {
        expect(resultInitialBalance.current.data?.formatted).toBeDefined();
        expect(Number(resultInitialBalance.current.data?.formatted)).toBeGreaterThanOrEqual(2);
        initialBalance = resultInitialBalance.current.data?.formatted ?? '0';
        return;
      },
      { timeout: 5000 }
    );

    // Refetch USDS allowance
    const { result: resultAllowanceUsds } = renderHook(
      () =>
        useTokenAllowance({
          chainId: TENDERLY_CHAIN_ID,
          contractAddress: supplyTokenAddres,
          owner: TEST_WALLET_ADDRESS,
          spender: rewardContractAddress
        }),
      {
        wrapper: WagmiWrapper
      }
    );

    resultAllowanceUsds.current.mutate();
    await waitFor(
      () => {
        expect(resultAllowanceUsds.current.data).toEqual(0n);
        return;
      },
      { timeout: 15000 }
    );

    const { result: resultBatchSupply } = renderHook(
      () =>
        useBatchRewardsSupply({
          contractAddress: rewardContractAddress,
          supplyTokenAddress: supplyTokenAddres,
          amount: parseEther('2'),
          enabled: true,
          gas: GAS
        }),
      {
        wrapper: WagmiWrapper
      }
    );

    await waitForPreparedExecuteAndMine(resultBatchSupply);

    // Get the balance of tokens for that user
    const { result: resultBalance } = renderHook(
      () =>
        useTokenBalance({
          address: TEST_WALLET_ADDRESS,
          token: supplyTokenAddres,
          chainId: TENDERLY_CHAIN_ID
        }),
      {
        wrapper: WagmiWrapper
      }
    );

    // The user should have less USDS tokens after supplying
    const expectedBalanceAfterSupply = (Number(initialBalance) - 2).toString();
    await waitFor(
      () => {
        expect(resultBalance.current.data?.formatted).toEqual(expectedBalanceAfterSupply);
        return;
      },
      { timeout: 15000 }
    );
  });

  afterAll(() => {
    cleanup();
  });
});
