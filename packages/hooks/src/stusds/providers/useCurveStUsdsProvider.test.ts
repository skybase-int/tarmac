/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurveStUsdsProvider } from './useCurveStUsdsProvider';
import { StUsdsProviderType, StUsdsProviderStatus } from './types';
import { RATE_PRECISION, STUSDS_PROVIDER_CONFIG } from './constants';

// Mock the Curve hooks
vi.mock('./useCurvePoolData', () => ({
  useCurvePoolData: vi.fn()
}));

vi.mock('./useCurveQuote', () => ({
  useCurveQuote: vi.fn()
}));

import { useCurvePoolData } from './useCurvePoolData';
import { useCurveQuote } from './useCurveQuote';

describe('useCurveStUsdsProvider', () => {
  const WAD = RATE_PRECISION.WAD;
  const MIN_LIQUIDITY = 10n ** 16n; // 0.01 tokens

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

    // Default quote mock
    (useCurveQuote as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        outputAmount: 950n * WAD,
        priceImpactBps: 10,
        effectiveRate: (950n * WAD * WAD) / (1000n * WAD)
      },
      isLoading: false,
      error: null,
      refetch: vi.fn()
    });
  });

  describe('provider type', () => {
    it('should return CURVE provider type', () => {
      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.providerType).toBe(StUsdsProviderType.CURVE);
      expect(result.current.data?.state.providerType).toBe(StUsdsProviderType.CURVE);
    });
  });

  describe('deposit availability', () => {
    it('should be available when stUSDS reserve > minimum', () => {
      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.state.status).toBe(StUsdsProviderStatus.AVAILABLE);
      expect(result.current.data?.state.canDeposit).toBe(true);
    });

    it('should be blocked when stUSDS reserve < minimum', () => {
      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve: MIN_LIQUIDITY / 2n, // Below threshold
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle: WAD,
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.state.status).toBe(StUsdsProviderStatus.BLOCKED);
      expect(result.current.data?.state.canDeposit).toBe(false);
      expect(result.current.data?.state.errorMessage).toBe('Insufficient stUSDS liquidity in Curve pool');
    });
  });

  describe('withdraw availability', () => {
    it('should be available when USDS reserve > minimum', () => {
      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'withdraw'
        })
      );

      expect(result.current.data?.state.status).toBe(StUsdsProviderStatus.AVAILABLE);
      expect(result.current.data?.state.canWithdraw).toBe(true);
    });

    it('should be blocked when USDS reserve < minimum', () => {
      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: MIN_LIQUIDITY / 2n, // Below threshold
          stUsdsReserve: 950000n * WAD,
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle: WAD,
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'withdraw'
        })
      );

      expect(result.current.data?.state.status).toBe(StUsdsProviderStatus.BLOCKED);
      expect(result.current.data?.state.canWithdraw).toBe(false);
      expect(result.current.data?.state.errorMessage).toBe('Insufficient USDS liquidity in Curve pool');
    });
  });

  describe('max amounts', () => {
    it('should calculate maxDeposit using priceOracle and slippage', () => {
      const stUsdsReserve = 1000000n * WAD;
      const priceOracle = (105n * WAD) / 100n; // 1.05 USDS per stUSDS
      const slippageMultiplier = RATE_PRECISION.BPS_DIVISOR - BigInt(STUSDS_PROVIDER_CONFIG.maxSlippageBps);

      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve,
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

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      // maxDeposit = stUsdsReserve * priceOracle * slippageMultiplier / (WAD * BPS_DIVISOR)
      const expectedMaxDeposit =
        (stUsdsReserve * priceOracle * slippageMultiplier) / (WAD * RATE_PRECISION.BPS_DIVISOR);
      expect(result.current.data?.state.maxDeposit).toBe(expectedMaxDeposit);
    });

    it('should calculate maxWithdraw using priceOracle and slippage', () => {
      const usdsReserve = 1000000n * WAD;
      const priceOracle = (105n * WAD) / 100n;
      const slippageMultiplier = RATE_PRECISION.BPS_DIVISOR - BigInt(STUSDS_PROVIDER_CONFIG.maxSlippageBps);

      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve,
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

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'withdraw'
        })
      );

      // maxWithdraw = usdsReserve * WAD * slippageMultiplier / (priceOracle * BPS_DIVISOR)
      const expectedMaxWithdraw =
        (usdsReserve * WAD * slippageMultiplier) / (priceOracle * RATE_PRECISION.BPS_DIVISOR);
      expect(result.current.data?.state.maxWithdraw).toBe(expectedMaxWithdraw);
    });

    it('should use 1:1 rate when priceOracle is missing', () => {
      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve: 950000n * WAD,
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle: undefined, // Missing oracle
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      // With 1:1 rate, maxDeposit should be based on stUsdsReserve directly
      expect(result.current.data?.state.maxDeposit).toBeGreaterThan(0n);
    });
  });

  describe('quote generation', () => {
    it('should generate valid deposit quote', () => {
      const inputAmount = 1000n * WAD;
      const outputAmount = 950n * WAD;

      (useCurveQuote as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          outputAmount,
          priceImpactBps: 10,
          effectiveRate: (outputAmount * WAD) / inputAmount
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: inputAmount,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.quote).toBeDefined();
      expect(result.current.data?.quote?.inputAmount).toBe(inputAmount);
      expect(result.current.data?.quote?.outputAmount).toBe(outputAmount);
      expect(result.current.data?.quote?.isValid).toBe(true);
    });

    it('should not generate quote when amount is 0', () => {
      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 0n,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.quote).toBeUndefined();
    });

    it('should mark quote invalid when deposits unavailable', () => {
      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve: 0n, // No liquidity
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle: WAD,
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.quote?.isValid).toBe(false);
      expect(result.current.data?.quote?.invalidReason).toBe('Curve pool deposits unavailable');
    });

    it('should mark quote invalid when price impact too high', () => {
      (useCurveQuote as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          outputAmount: 900n * WAD,
          priceImpactBps: STUSDS_PROVIDER_CONFIG.maxPriceImpactBps + 100, // Exceeds threshold
          effectiveRate: (900n * WAD * WAD) / (1000n * WAD)
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.quote?.isValid).toBe(false);
      expect(result.current.data?.quote?.invalidReason).toBe('Price impact too high');
    });

    it('should mark quote invalid when amount exceeds pool liquidity', () => {
      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve: 100n * WAD, // Limited stUSDS
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle: WAD,
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD, // More than available
          direction: 'deposit'
        })
      );

      expect(result.current.data?.quote?.isValid).toBe(false);
      expect(result.current.data?.quote?.invalidReason).toBe('Amount exceeds Curve pool liquidity');
    });
  });

  describe('rate info', () => {
    it('should include estimated slippage from config', () => {
      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.quote?.rateInfo.estimatedSlippageBps).toBe(
        STUSDS_PROVIDER_CONFIG.maxSlippageBps
      );
    });

    it('should include price impact from quote', () => {
      const priceImpactBps = 25;

      (useCurveQuote as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          outputAmount: 950n * WAD,
          priceImpactBps,
          effectiveRate: (950n * WAD * WAD) / (1000n * WAD)
        },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.quote?.rateInfo.priceImpactBps).toBe(priceImpactBps);
    });

    it('should have zero fee amount (included in quote)', () => {
      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.data?.quote?.rateInfo.feeAmount).toBe(0n);
    });
  });

  describe('loading state', () => {
    it('should be loading when pool data is loading', () => {
      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.isLoading).toBe(true);
    });

    it('should be loading when quote is loading (with amount > 0)', () => {
      (useCurveQuote as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should return undefined data when pool data is undefined', () => {
      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.data).toBeUndefined();
    });

    it('should pass through pool error', () => {
      const testError = new Error('Pool fetch failed');

      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: testError,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.error).toBe(testError);
    });

    it('should pass through quote error', () => {
      const testError = new Error('Quote fetch failed');

      (useCurveQuote as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: testError,
        refetch: vi.fn()
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      expect(result.current.error).toBe(testError);
    });
  });

  describe('refetch', () => {
    it('should call both pool and quote refetch functions', () => {
      const refetchPool = vi.fn();
      const refetchQuote = vi.fn();

      (useCurvePoolData as ReturnType<typeof vi.fn>).mockReturnValue({
        data: {
          usdsReserve: 1000000n * WAD,
          stUsdsReserve: 950000n * WAD,
          fee: 4000000n,
          adminFee: 5000000000n,
          priceOracle: WAD,
          coin0: '0x0000000000000000000000000000000000000001',
          coin1: '0x0000000000000000000000000000000000000002',
          tokenIndices: { usds: 0, stUsds: 1 }
        },
        isLoading: false,
        error: null,
        refetch: refetchPool
      });

      (useCurveQuote as ReturnType<typeof vi.fn>).mockReturnValue({
        data: { outputAmount: 950n * WAD, priceImpactBps: 10, effectiveRate: WAD },
        isLoading: false,
        error: null,
        refetch: refetchQuote
      });

      const { result } = renderHook(() =>
        useCurveStUsdsProvider({
          amount: 1000n * WAD,
          direction: 'deposit'
        })
      );

      result.current.refetch();

      expect(refetchPool).toHaveBeenCalled();
      expect(refetchQuote).toHaveBeenCalled();
    });
  });
});
