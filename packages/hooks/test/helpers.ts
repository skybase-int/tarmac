import { expect, vi } from 'vitest';
import { WriteHook } from '../src';
import { renderHook, waitFor } from '@testing-library/react';
import { WagmiWrapper } from './WagmiWrapper';
import { BatchWriteHook } from '../src/hooks';
import { TEST_WALLET_ADDRESS } from './constants';

export const waitForPreparedExecuteAndMine = async (
  result: { current: WriteHook | BatchWriteHook },
  loadingTimeout: number = 3000
) => {
  await waitFor(
    () => {
      expect(result.current.prepared).toBe(true);
    },
    { timeout: 15000 }
  );
  result.current.execute();

  await waitFor(
    () => {
      expect(result.current.isLoading).toBe(true);
    },
    { timeout: loadingTimeout }
  );
  await waitFor(
    () => {
      expect(result.current.isLoading).toBe(false);
    },
    { timeout: loadingTimeout }
  );
  expect(result.current.error).toBeNull();
};

export const getUrnAddress = async (urnIndex: bigint, useUrnAddress: any) => {
  const { result: resultUrnAddress } = renderHook(() => useUrnAddress(urnIndex), { wrapper: WagmiWrapper });
  await waitFor(
    () => {
      expect(resultUrnAddress.current.data).toBeDefined();
      return;
    },
    { timeout: 5000 }
  );
  return resultUrnAddress.current.data as `0x${string}`;
};

export const getUseCapabilitiesMockedResponse = (chainId: number) =>
  ({
    data: { [chainId]: { atomic: { status: 'supported' } } },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
    isError: false,
    isPending: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    isPlaceholderData: false,
    status: 'success',
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: Date.now(),
    failureCount: 0,
    failureReason: null,
    errorUpdateCount: 0,
    isFetched: true,
    isFetchedAfterMount: true,
    isFetching: false,
    isRefetching: false,
    isInitialLoading: false,
    isStale: false,
    isPaused: false,
    fetchStatus: 'idle',
    promise: Promise.resolve(),
    queryKey: ['capabilities', { account: TEST_WALLET_ADDRESS }]
  }) as const;
