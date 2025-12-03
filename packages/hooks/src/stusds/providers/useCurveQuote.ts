import { useMemo } from 'react';
import { useChainId } from 'wagmi';
import { useReadCurveStUsdsUsdsPoolGetDy } from '../../generated';
import { isTestnetId } from '@jetstreamgg/sky-utils';
import { useCurvePoolData } from './useCurvePoolData';
import { RATE_PRECISION } from './constants';

/**
 * Parameters for the Curve quote hook.
 */
export type CurveQuoteParams = {
  /** Token being swapped in ('USDS' or 'stUSDS') */
  inputToken: 'USDS' | 'stUSDS';
  /** Amount of input token */
  inputAmount: bigint;
  /** Whether the quote should be fetched */
  enabled?: boolean;
};

/**
 * Quote result from Curve pool.
 */
export type CurveQuoteData = {
  /** Expected output amount */
  outputAmount: bigint;
  /** Price impact in basis points (approximate) */
  priceImpactBps: number;
  /** Effective rate (output/input) scaled by 1e18 */
  effectiveRate: bigint;
};

/**
 * Return type for useCurveQuote hook.
 */
export type CurveQuoteHookResult = {
  data: CurveQuoteData | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Hook to get a quote from the Curve USDS/stUSDS pool.
 * Uses get_dy which returns the output amount after fees.
 *
 * @param params - Quote parameters
 * @returns Quote data including output amount and price impact
 */
export function useCurveQuote(params: CurveQuoteParams): CurveQuoteHookResult {
  const { inputToken, inputAmount, enabled = true } = params;

  const connectedChainId = useChainId();
  const chainId = isTestnetId(connectedChainId) ? 314310 : 1;

  // Get pool data to determine token indices
  const { data: poolData, isLoading: isPoolLoading } = useCurvePoolData();

  // Determine input/output indices based on token
  const inputIndex = useMemo(() => {
    if (!poolData) return 0;
    return inputToken === 'USDS' ? poolData.tokenIndices.usds : poolData.tokenIndices.stUsds;
  }, [poolData, inputToken]);

  const outputIndex = useMemo(() => {
    if (!poolData) return 1;
    return inputToken === 'USDS' ? poolData.tokenIndices.stUsds : poolData.tokenIndices.usds;
  }, [poolData, inputToken]);

  // Call get_dy to get the expected output
  // get_dy returns output AFTER fees are deducted
  const {
    data: outputAmount,
    isLoading: isQuoteLoading,
    error: quoteError,
    refetch
  } = useReadCurveStUsdsUsdsPoolGetDy({
    args: [BigInt(inputIndex), BigInt(outputIndex), inputAmount],
    chainId,
    query: {
      enabled: enabled && inputAmount > 0n && !!poolData
    }
  });

  const data: CurveQuoteData | undefined = useMemo(() => {
    if (!outputAmount || inputAmount === 0n) return undefined;

    // Calculate effective rate (output / input) scaled by 1e18
    const effectiveRate = (outputAmount * RATE_PRECISION.WAD) / inputAmount;

    // Calculate approximate price impact
    // Compare against the oracle price for a rough estimate
    let priceImpactBps = 0;
    if (poolData?.priceOracle && poolData.priceOracle > 0n) {
      // Oracle price is stUSDS per USDS (or vice versa depending on pool config)
      // For simplicity, we compare the effective rate to what we'd expect from a 1:1 rate
      // A more accurate calculation would use the oracle price directly
      const expectedRate = RATE_PRECISION.WAD; // 1:1 baseline
      if (effectiveRate < expectedRate) {
        const impact = ((expectedRate - effectiveRate) * RATE_PRECISION.BPS_DIVISOR) / expectedRate;
        priceImpactBps = Number(impact);
      }
    }

    return {
      outputAmount,
      priceImpactBps,
      effectiveRate
    };
  }, [outputAmount, inputAmount, poolData?.priceOracle]);

  return {
    data,
    isLoading: isPoolLoading || isQuoteLoading,
    error: quoteError as Error | null,
    refetch
  };
}
