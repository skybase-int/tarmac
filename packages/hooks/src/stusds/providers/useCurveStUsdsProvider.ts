import { useMemo } from 'react';
import { useCurvePoolData } from './useCurvePoolData';
import { useCurveQuote } from './useCurveQuote';
import { STUSDS_PROVIDER_CONFIG, RATE_PRECISION } from './constants';
import {
  StUsdsProviderType,
  StUsdsProviderStatus,
  StUsdsProviderData,
  StUsdsProviderState,
  StUsdsQuote,
  StUsdsQuoteParams,
  StUsdsProviderHookResult,
  StUsdsRateInfo
} from './types';

/**
 * Minimum liquidity threshold to consider the pool available.
 * Prevents issues with very small pool balances.
 */
const MIN_LIQUIDITY_THRESHOLD = 10n ** 16n; // 0.01 tokens

/**
 * Hook that provides Curve pool integration in the provider abstraction format.
 * Enables swapping USDS <-> stUSDS via the Curve pool as an alternative to native contract.
 *
 * @param params - Quote parameters (amount and direction)
 * @returns Provider data in the standard format
 */
export function useCurveStUsdsProvider(params: StUsdsQuoteParams): StUsdsProviderHookResult {
  const { amount, direction } = params;

  // Get Curve pool data
  const {
    data: poolData,
    isLoading: isPoolLoading,
    error: poolError,
    refetch: refetchPool
  } = useCurvePoolData();

  // Determine input token based on direction
  const inputToken = direction === 'deposit' ? 'USDS' : 'stUSDS';

  // Get quote from Curve pool
  const {
    data: quoteData,
    isLoading: isQuoteLoading,
    error: quoteError,
    refetch: refetchQuote
  } = useCurveQuote({
    inputToken,
    inputAmount: amount,
    enabled: amount > 0n && !!poolData
  });

  // Determine provider state based on pool liquidity
  const state: StUsdsProviderState | undefined = useMemo(() => {
    if (!poolData) return undefined;

    // Check if there's sufficient liquidity for deposits (need stUSDS in pool)
    // When depositing USDS, we get stUSDS out, so we need stUSDS liquidity
    const canDeposit = poolData.stUsdsReserve > MIN_LIQUIDITY_THRESHOLD;

    // Check if there's sufficient liquidity for withdrawals (need USDS in pool)
    // When withdrawing, we swap stUSDS for USDS, so we need USDS liquidity
    const canWithdraw = poolData.usdsReserve > MIN_LIQUIDITY_THRESHOLD;

    // Determine overall status based on requested direction
    let status: StUsdsProviderStatus;
    if (direction === 'deposit') {
      status = canDeposit ? StUsdsProviderStatus.AVAILABLE : StUsdsProviderStatus.BLOCKED;
    } else {
      status = canWithdraw ? StUsdsProviderStatus.AVAILABLE : StUsdsProviderStatus.BLOCKED;
    }

    // Max amounts need to account for the exchange rate between USDS and stUSDS.
    // The priceOracle returns the price of stUSDS in terms of USDS (scaled by 1e18).
    // For deposits (USDS → stUSDS): maxDeposit = stUsdsReserve * priceOracle / WAD
    // For withdrawals (stUSDS → USDS): maxWithdraw = usdsReserve * WAD / priceOracle
    const slippageMultiplier = RATE_PRECISION.BPS_DIVISOR - BigInt(STUSDS_PROVIDER_CONFIG.maxSlippageBps);

    // Use price oracle if available, otherwise fall back to 1:1
    const priceOracle = poolData.priceOracle || RATE_PRECISION.WAD;

    const maxDeposit = canDeposit
      ? (poolData.stUsdsReserve * priceOracle * slippageMultiplier) /
        (RATE_PRECISION.WAD * RATE_PRECISION.BPS_DIVISOR)
      : 0n;

    const maxWithdraw = canWithdraw
      ? (poolData.usdsReserve * RATE_PRECISION.WAD * slippageMultiplier) /
        (priceOracle * RATE_PRECISION.BPS_DIVISOR)
      : 0n;

    return {
      providerType: StUsdsProviderType.CURVE,
      status,
      canDeposit,
      canWithdraw,
      maxDeposit,
      maxWithdraw,
      errorMessage:
        status === StUsdsProviderStatus.BLOCKED
          ? direction === 'deposit'
            ? 'Insufficient stUSDS liquidity in Curve pool'
            : 'Insufficient USDS liquidity in Curve pool'
          : undefined
    };
  }, [poolData, direction]);

  // Build quote if amount > 0
  const quote: StUsdsQuote | undefined = useMemo(() => {
    if (!state || amount === 0n) return undefined;

    if (!quoteData || quoteData.outputAmount === 0n) {
      return {
        providerType: StUsdsProviderType.CURVE,
        inputAmount: amount,
        outputAmount: 0n,
        rateInfo: {
          outputAmount: 0n,
          effectiveRate: 0n,
          feeAmount: 0n,
          estimatedSlippageBps: 0,
          priceImpactBps: 0
        },
        isValid: false,
        invalidReason: 'Unable to get Curve quote'
      };
    }

    // Check if the operation is valid
    let isValid = true;
    let invalidReason: string | undefined;

    if (direction === 'deposit') {
      if (!state.canDeposit) {
        isValid = false;
        invalidReason = 'Curve pool deposits unavailable';
      } else if (amount > state.maxDeposit) {
        isValid = false;
        invalidReason = 'Amount exceeds Curve pool liquidity';
      }
    } else {
      if (!state.canWithdraw) {
        isValid = false;
        invalidReason = 'Curve pool withdrawals unavailable';
      } else if (amount > state.maxWithdraw) {
        isValid = false;
        invalidReason = 'Amount exceeds Curve pool liquidity';
      }
    }

    // Check for excessive price impact
    if (quoteData.priceImpactBps > STUSDS_PROVIDER_CONFIG.maxSlippageBps) {
      isValid = false;
      invalidReason = 'Price impact too high';
    }

    // Curve fees are already included in the quote (get_dy returns post-fee amount)
    // We don't have a separate fee amount, so set to 0
    const rateInfo: StUsdsRateInfo = {
      outputAmount: quoteData.outputAmount,
      effectiveRate: quoteData.effectiveRate,
      feeAmount: 0n, // Fees included in quote
      estimatedSlippageBps: STUSDS_PROVIDER_CONFIG.maxSlippageBps,
      priceImpactBps: quoteData.priceImpactBps
    };

    return {
      providerType: StUsdsProviderType.CURVE,
      inputAmount: amount,
      outputAmount: quoteData.outputAmount,
      rateInfo,
      isValid,
      invalidReason
    };
  }, [state, amount, direction, quoteData]);

  // Combine into provider data
  const data: StUsdsProviderData | undefined = useMemo(() => {
    if (!state) return undefined;

    return {
      providerType: StUsdsProviderType.CURVE,
      state,
      quote
    };
  }, [state, quote]);

  const isLoading = isPoolLoading || (amount > 0n && isQuoteLoading);
  const error = poolError || quoteError;

  const refetch = () => {
    refetchPool();
    refetchQuote();
  };

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch
  };
}
