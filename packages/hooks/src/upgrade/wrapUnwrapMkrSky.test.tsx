import { describe, expect, it, afterAll } from 'vitest';
import { renderHook, waitFor, cleanup } from '@testing-library/react';
import { WagmiWrapper, TEST_WALLET_ADDRESS, GAS } from '../../test';

import { parseEther } from 'viem';
import { useTokenBalance } from '../tokens/useTokenBalance';
import { mkrAddress, skyAddress } from '../generated';
import { useMkrSkyApprove } from './useMkrSkyApprove';
import { useMkrToSky } from './useMkrToSky';
import { useSkyToMkr } from './useSkyToMkr';
import { TENDERLY_CHAIN_ID } from '../constants';
import { waitForPreparedExecuteAndMine } from '../../test/helpers';

describe('Upgrade and revert MKR SKY', async () => {
  it(
    'Should upgrade and revert',
    {
      timeout: 90000
    },
    async () => {
      const wrapper = WagmiWrapper;

      // Approve token to upgrade
      const { result: resultApproveMkr } = renderHook(
        () =>
          useMkrSkyApprove({
            amount: parseEther('10'),
            tokenAddress: mkrAddress[TENDERLY_CHAIN_ID],
            gas: GAS
          }),

        {
          wrapper
        }
      );

      // Get the balance of mkr for that user
      const { result: resultBalanceMkr } = renderHook(
        () =>
          useTokenBalance({
            address: TEST_WALLET_ADDRESS,
            token: mkrAddress[TENDERLY_CHAIN_ID],
            chainId: TENDERLY_CHAIN_ID
          }),
        {
          wrapper
        }
      );

      // The user should have some MKR
      await waitFor(
        () => {
          expect(resultBalanceMkr.current.data?.formatted).toEqual('100');
          return;
        },
        { timeout: 5000 }
      );

      await waitForPreparedExecuteAndMine(resultApproveMkr);

      // Upgrade MKR to SKY
      const { result: resultUpgrade } = renderHook(
        () =>
          useMkrToSky({
            amount: parseEther('10'),
            enabled: true,
            gas: GAS
          }),
        {
          wrapper
        }
      );

      await waitForPreparedExecuteAndMine(resultUpgrade);

      // Get the balance of MKR for that user
      const { result: resultBalanceMkrAfterUpgrade } = renderHook(
        () =>
          useTokenBalance({
            address: TEST_WALLET_ADDRESS,
            token: mkrAddress[TENDERLY_CHAIN_ID],
            chainId: TENDERLY_CHAIN_ID
          }),
        {
          wrapper
        }
      );

      // The user should have less MKR after upgrade
      await waitFor(
        () => {
          expect(resultBalanceMkrAfterUpgrade.current.data?.formatted).toEqual('90');
          return;
        },
        { timeout: 5000 }
      );

      // Get the balance of SKY for that user
      const { result: resultBalanceNgtAfterUpgrade } = renderHook(
        () =>
          useTokenBalance({
            address: TEST_WALLET_ADDRESS,
            token: skyAddress[TENDERLY_CHAIN_ID],
            chainId: TENDERLY_CHAIN_ID
          }),
        {
          wrapper
        }
      );

      // The user should have more SKY after upgrade
      await waitFor(
        () => {
          expect(resultBalanceNgtAfterUpgrade.current.data?.formatted).toEqual('240000');
          return;
        },
        { timeout: 5000 }
      );

      // Revert SKY to MKR
      // Approve token to revert
      const { result: resultApproveNgt } = renderHook(
        () =>
          useMkrSkyApprove({
            amount: parseEther('240000'),
            tokenAddress: skyAddress[TENDERLY_CHAIN_ID],
            gas: GAS
          }),

        {
          wrapper
        }
      );

      await waitForPreparedExecuteAndMine(resultApproveNgt);

      // Revert SKY to MKR
      const { result: resultRevert } = renderHook(
        () =>
          useSkyToMkr({
            amount: parseEther('240000'),
            enabled: true,
            gas: GAS
          }),
        {
          wrapper
        }
      );

      await waitForPreparedExecuteAndMine(resultRevert);

      // Get the balance of MKR for that user
      const { result: resultBalanceMkrAfterRevert } = renderHook(
        () =>
          useTokenBalance({
            address: TEST_WALLET_ADDRESS,
            token: mkrAddress[TENDERLY_CHAIN_ID],
            chainId: TENDERLY_CHAIN_ID
          }),
        {
          wrapper
        }
      );

      // The user should have more MKR after revert
      await waitFor(
        () => {
          expect(resultBalanceMkrAfterRevert.current.data?.formatted).toEqual('100');
          return;
        },
        { timeout: 5000 }
      );

      // Get the balance of SKY for that user
      const { result: resultBalanceNgtAfterRevert } = renderHook(
        () =>
          useTokenBalance({
            address: TEST_WALLET_ADDRESS,
            token: skyAddress[TENDERLY_CHAIN_ID],
            chainId: TENDERLY_CHAIN_ID
          }),
        {
          wrapper
        }
      );

      // The user should have less SKY after revert
      await waitFor(
        () => {
          expect(resultBalanceNgtAfterRevert.current.data?.formatted).toEqual('0');
          return;
        },
        { timeout: 5000 }
      );
    }
  );

  afterAll(() => {
    cleanup();
  });
});
