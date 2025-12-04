/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurveQuote } from './useCurveQuote';
import { RATE_PRECISION } from './constants';

// Mock wagmi hooks
vi.mock('wagmi', () => ({
  useChainId: vi.fn(() => 1)
}));

// Mock generated hooks
vi.mock('../../generated', () => ({
  useReadCurveStUsdsUsdsPoolGetDy: vi.fn()
}));

// Mock useCurvePoolData
vi.mock('./useCurvePoolData', () => ({
  useCurvePoolData: vi.fn()
}));

// Mock isTestnetId
vi.mock('@jetstreamgg/sky-utils', () => ({
  isTestnetId: vi.fn(() => false)
}));

import { useReadCurveStUsdsUsdsPoolGetDy } from '../../generated';
import { useCurvePoolData } from './useCurvePoolData';

describe('useCurveQuote', () => {
  const WAD = RATE_PRECISION.WAD;
  const BPS = RATE_PRECISION.BPS_DIVISOR;

  beforeEach(() => {
    vi.clearAllMocks();

    // Default pool data mock
    (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        usdsReserve: 1000000n * WAD,
        stUsdsReserve: 950000n * WAD,
        fee: 4000000n,
        adminFee: 5000000000n,
        priceOracle: (105n * WAD) / 100n, // 1.05 USDS per stUSDS
        coin0: '0x0000000000000000000000000000000000000001',
        coin1: '0x0000000000000000000000000000000000000002',
        tokenIndices: { usds: 0, stUsds: 1 }
      },
      isLoading: false,
      error: null,
      refetch: vi.fn()
    });
  });

  describe('USDS to stUSDS quote (deposit)', () => {
    it('should return correct quote for USDS input', () => {
      const inputAmount = 1000n * WAD;
      const outputAmount = 950n * WAD; // Approximate after fees

      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockReturnValue({
        data: outputAmount,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveQuote({
          inputToken: 'USDS',
          inputAmount,
          enabled: true
        })
      );

      expect(result.current.data).toBeDefined();
      expect(result.current.data?.outputAmount).toBe(outputAmount);
      expect(result.current.data?.effectiveRate).toBe((outputAmount * WAD) / inputAmount);
      expect(result.current.isLoading).toBe(false);
    });

    it('should calculate price impact for USDS deposit', () => {
      const inputAmount = 1000n * WAD;
      // Oracle says 1 stUSDS = 1.05 USDS, so for 1000 USDS we expect ~952.38 stUSDS
      // Expected rate = WAD * WAD / priceOracle = WAD * WAD / (1.05 * WAD) = ~0.952 WAD
      const priceOracle = (105n * WAD) / 100n;
      const expectedRate = (WAD * WAD) / priceOracle; // ~0.952 * WAD

      // Actual output is less due to fees/slippage
      const outputAmount = 940n * WAD;
      const actualRate = (outputAmount * WAD) / inputAmount; // 0.94 * WAD

      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve: 950000n * WAD,
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle,
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockReturnValue({
        data: outputAmount,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveQuote({
          inputToken: 'USDS',
          inputAmount,
          enabled: true
        })
      );

      expect(result.current.data?.priceImpactBps).toBeGreaterThan(0);
      // Price impact = (expected - actual) / expected * 10000
      const expectedImpact = Number(((expectedRate - actualRate) * BPS) / expectedRate);
      expect(result.current.data?.priceImpactBps).toBeCloseTo(expectedImpact, 0);
    });
  });

  describe('stUSDS to USDS quote (withdraw)', () => {
    it('should return correct quote for stUSDS input', () => {
      const inputAmount = 1000n * WAD;
      const outputAmount = 1050n * WAD; // stUSDS is worth more than USDS

      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockReturnValue({
        data: outputAmount,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveQuote({
          inputToken: 'stUSDS',
          inputAmount,
          enabled: true
        })
      );

      expect(result.current.data).toBeDefined();
      expect(result.current.data?.outputAmount).toBe(outputAmount);
      expect(result.current.data?.effectiveRate).toBe((outputAmount * WAD) / inputAmount);
    });

    it('should calculate price impact for stUSDS withdraw', () => {
      const inputAmount = 1000n * WAD;
      const priceOracle = (105n * WAD) / 100n; // 1.05 USDS per stUSDS
      // For stUSDS -> USDS, expected rate = priceOracle
      // Actual output is less due to fees
      const outputAmount = 1040n * WAD;
      const actualRate = (outputAmount * WAD) / inputAmount;

      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve: 950000n * WAD,
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle,
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockReturnValue({
        data: outputAmount,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveQuote({
          inputToken: 'stUSDS',
          inputAmount,
          enabled: true
        })
      );

      expect(result.current.data?.priceImpactBps).toBeGreaterThan(0);
      // Price impact = (expected - actual) / expected * 10000
      const expectedImpact = Number(((priceOracle - actualRate) * BPS) / priceOracle);
      expect(result.current.data?.priceImpactBps).toBeCloseTo(expectedImpact, 0);
    });
  });

  describe('edge cases', () => {
    it('should return undefined when inputAmount is 0', () => {
      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveQuote({
          inputToken: 'USDS',
          inputAmount: 0n,
          enabled: true
        })
      );

      expect(result.current.data).toBeUndefined();
    });

    it('should return undefined when outputAmount is undefined', () => {
      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveQuote({
          inputToken: 'USDS',
          inputAmount: 1000n * WAD,
          enabled: true
        })
      );

      expect(result.current.data).toBeUndefined();
    });

    it('should not calculate price impact when getting better than oracle rate', () => {
      const inputAmount = 1000n * WAD;
      const priceOracle = (105n * WAD) / 100n;
      // Output is better than expected (higher rate)
      const outputAmount = 1060n * WAD;

      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve: 950000n * WAD,
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle,
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockReturnValue({
        data: outputAmount,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveQuote({
          inputToken: 'stUSDS',
          inputAmount,
          enabled: true
        })
      );

      // When getting better rate, price impact should be 0 (no negative impact)
      expect(result.current.data?.priceImpactBps).toBe(0);
    });

    it('should handle zero price oracle gracefully', () => {
      const inputAmount = 1000n * WAD;
      const outputAmount = 950n * WAD;

      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve: 950000n * WAD,
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle: 0n,
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockReturnValue({
        data: outputAmount,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveQuote({
          inputToken: 'USDS',
          inputAmount,
          enabled: true
        })
      );

      expect(result.current.data?.priceImpactBps).toBe(0);
    });
  });

  describe('loading state', () => {
    it('should combine loading states from pool and quote', () => {
      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
        refetch: vi.fn()
      });

      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveQuote({
          inputToken: 'USDS',
          inputAmount: 1000n * WAD,
          enabled: true
        })
      );

      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('disabled state', () => {
    it('should not fetch when disabled', () => {
      const getDyMock = vi.fn().mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      (useReadCurveStUsdsUsdsPoolGetDy as ReturnType<typeof vi.fn>).mockImplementation(getDyMock);

      renderHook(() =>
        useCurveQuote({
          inputToken: 'USDS',
          inputAmount: 1000n * WAD,
          enabled: false
        })
      );

      // Check that the query was called with enabled: false
      expect(getDyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.objectContaining({
            enabled: false
          })
        })
      );
    });
  });
});
