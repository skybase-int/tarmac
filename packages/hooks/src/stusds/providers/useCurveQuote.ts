import { useMemo } from 'react';
import { useChainId } from 'wagmi';
import { useReadCurveStUsdsUsdsPoolGetDy } from '../../generated';
import { isTestnetId } from '@jetstreamgg/sky-utils';
import { TENDERLY_CHAIN_ID } from '../../constants';
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
  const chainId = isTestnetId(connectedChainId) ? TENDERLY_CHAIN_ID : 1;

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

    // Calculate price impact using the oracle price
    // The oracle price represents the EMA price of stUSDS in terms of USDS (scaled by 1e18)
    // i.e., priceOracle = how many USDS per 1 stUSDS
    let priceImpactBps = 0;
    if (poolData?.priceOracle && poolData.priceOracle > 0n) {
      let expectedRate: bigint;

      if (inputToken === 'USDS') {
        // USDS -> stUSDS: We expect to receive less stUSDS per USDS (inverse of oracle)
        // Expected rate = WAD / priceOracle (stUSDS per USDS)
        expectedRate = (RATE_PRECISION.WAD * RATE_PRECISION.WAD) / poolData.priceOracle;
      } else {
        // stUSDS -> USDS: We expect to receive priceOracle USDS per stUSDS
        // Expected rate = priceOracle (USDS per stUSDS)
        expectedRate = poolData.priceOracle;
      }

      // Price impact is the difference between expected and actual rate
      // Positive impact means we're getting less than expected (negative for user)
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
  }, [outputAmount, inputAmount, poolData?.priceOracle, inputToken]);

  return {
    data,
    isLoading: isPoolLoading || isQuoteLoading,
    error: quoteError as Error | null,
    refetch
  };
}
