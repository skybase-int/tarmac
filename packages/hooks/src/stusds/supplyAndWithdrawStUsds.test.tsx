import { describe, expect, it, afterAll } from 'vitest';
import { renderHook, waitFor, cleanup } from '@testing-library/react';
import { WagmiWrapper, TEST_WALLET_ADDRESS, GAS } from '../../test';
import { parseEther } from 'viem';
import { useStUsdsApprove } from './useStUsdsApprove';
import { useStUsdsDeposit } from './useStUsdsDeposit';
import { useStUsdsWithdraw } from './useStUsdsWithdraw';
import { waitForPreparedExecuteAndMine } from '../../test/helpers';
import { useStUsdsData } from './useStUsdsData';

describe('stUSDS - Supply and withdraw', () => {
  it(
    'Should supply and withdraw from stUSDS vault',
    {
      timeout: 90000
    },
    async () => {
      // Approve USDS spending
      const { result: resultApprove } = renderHook(
        () =>
          useStUsdsApprove({
            amount: parseEther('10'),
            gas: GAS
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      await waitForPreparedExecuteAndMine(resultApprove);

      // Supply USDS to stUSDS vault
      const { result: resultDeposit } = renderHook(
        () =>
          useStUsdsDeposit({
            amount: parseEther('10'),
            enabled: true,
            gas: GAS
          }),
        {
          wrapper: WagmiWrapper
        }
      );
      await waitForPreparedExecuteAndMine(resultDeposit);

      // Withdraw 5 USDS from stUSDS vault
      const { result: resultWithdraw } = renderHook(
        () =>
          useStUsdsWithdraw({
            amount: parseEther('5'),
            enabled: true,
            gas: GAS
          }),
        {
          wrapper: WagmiWrapper
        }
      );
      await waitForPreparedExecuteAndMine(resultWithdraw);
    }
  );

  it(
    'Should handle referral code in deposit',
    {
      timeout: 90000
    },
    async () => {
      // Approve USDS spending
      const { result: resultApprove } = renderHook(
        () =>
          useStUsdsApprove({
            amount: parseEther('20'),
            gas: GAS
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      await waitForPreparedExecuteAndMine(resultApprove);

      // Supply with referral code
      const { result: resultDepositWithReferral } = renderHook(
        () =>
          useStUsdsDeposit({
            amount: parseEther('20'),
            enabled: true,
            gas: GAS,
            referral: 12345
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      await waitForPreparedExecuteAndMine(resultDepositWithReferral);

      // Should complete successfully (referral code should be handled)
      expect(resultDepositWithReferral.current.error).toBeNull();
    }
  );

  it(
    'Should handle max withdraw correctly',
    {
      timeout: 90000
    },
    async () => {
      // Get stUSDS data to check withdrawable balance (using balance from previous test)
      const { result: resultStUsdsData } = renderHook(() => useStUsdsData(TEST_WALLET_ADDRESS), {
        wrapper: WagmiWrapper
      });

      await waitFor(
        () => {
          expect(resultStUsdsData.current.isLoading).toBe(false);
          expect(resultStUsdsData.current.data?.userMaxWithdraw).toBeGreaterThan(0n);
        },
        { timeout: 15000 }
      );

      // Withdraw max amount
      const { result: resultMaxWithdraw } = renderHook(
        () =>
          useStUsdsWithdraw({
            amount: resultStUsdsData.current.data?.userMaxWithdraw || 0n,
            enabled: true,
            gas: GAS,
            max: true
          }),
        {
          wrapper: WagmiWrapper
        }
      );

      await waitForPreparedExecuteAndMine(resultMaxWithdraw);

      // Should complete successfully
      expect(resultMaxWithdraw.current.error).toBeNull();
    }
  );

  it('Should validate withdrawal amount against user balance', async () => {
    // Get stUSDS data (using balance from previous tests)
    const { result: resultStUsdsData } = renderHook(() => useStUsdsData(TEST_WALLET_ADDRESS), {
      wrapper: WagmiWrapper
    });

    await waitFor(
      () => {
        expect(resultStUsdsData.current.isLoading).toBe(false);
      },
      { timeout: 15000 }
    );

    const userMaxWithdraw = resultStUsdsData.current.data?.userMaxWithdraw || 0n;

    // Try to withdraw more than available
    const { result: resultExcessiveWithdraw } = renderHook(
      () =>
        useStUsdsWithdraw({
          amount: userMaxWithdraw + parseEther('1000'),
          enabled: true,
          gas: GAS
        }),
      {
        wrapper: WagmiWrapper
      }
    );

    await waitFor(
      () => {
        // Should not be prepared due to insufficient balance
        expect(resultExcessiveWithdraw.current.prepared).toBe(false);
      },
      { timeout: 5000 }
    );
  });

  it('Should handle precision issues correctly', async () => {
    // First, ensure the wallet has stUSDS balance by depositing
    // Approve USDS spending
    const { result: resultApprove } = renderHook(
      () =>
        useStUsdsApprove({
          amount: parseEther('10'),
          gas: GAS
        }),
      {
        wrapper: WagmiWrapper
      }
    );

    await waitForPreparedExecuteAndMine(resultApprove);

    // Deposit USDS to get stUSDS
    const { result: resultDeposit } = renderHook(
      () =>
        useStUsdsDeposit({
          amount: parseEther('10'),
          enabled: true,
          gas: GAS
        }),
      {
        wrapper: WagmiWrapper
      }
    );
    await waitForPreparedExecuteAndMine(resultDeposit);

    // Get stUSDS data
    const { result: resultStUsdsData } = renderHook(() => useStUsdsData(TEST_WALLET_ADDRESS), {
      wrapper: WagmiWrapper
    });
    await waitFor(
      () => {
        expect(resultStUsdsData.current.isLoading).toBe(false);
        expect(resultStUsdsData.current.data?.userMaxWithdraw).toBeGreaterThan(0n);
      },
      { timeout: 15000 }
    );

    // The precision buffer should allow withdrawal of exact amounts
    const userMaxWithdraw = resultStUsdsData.current.data?.userMaxWithdraw || 0n;

    // Try to withdraw the exact amount (should work with precision buffer)
    const { result: resultExactWithdraw } = renderHook(
      () =>
        useStUsdsWithdraw({
          amount: userMaxWithdraw - 1n, // Subtract 1 wei to account for buffer
          enabled: true,
          gas: GAS
        }),
      {
        wrapper: WagmiWrapper
      }
    );

    await waitForPreparedExecuteAndMine(resultExactWithdraw);
  });

  afterAll(() => {
    cleanup();
  });
});
