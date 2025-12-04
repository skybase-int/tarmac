import { RATE_PRECISION } from './constants';
import type { StUsdsProviderType, StUsdsQuote, StUsdsRateComparisonConfig } from './types';

/**
 * Result of comparing rates between two providers.
 */
export type RateComparisonResult = {
  /** The provider with the better rate (null if both undefined or equal) */
  betterProvider: StUsdsProviderType | null;
  /** Percentage difference between rates (positive = first provider better) */
  differencePercent: number;
  /** Whether the difference exceeds the threshold for switching */
  isSignificantDifference: boolean;
};

/**
 * Calculate the effective rate from input/output amounts.
 * Returns rate scaled by 1e18 (WAD precision).
 *
 * @param inputAmount - Amount of input tokens
 * @param outputAmount - Amount of output tokens
 * @returns Effective rate (outputAmount / inputAmount) scaled by 1e18
 */
export function calculateEffectiveRate(inputAmount: bigint, outputAmount: bigint): bigint {
  if (inputAmount === 0n) {
    return 0n;
  }
  return (outputAmount * RATE_PRECISION.WAD) / inputAmount;
}

/**
 * Calculate the percentage difference between two rates.
 *
 * @param rateA - First rate (scaled by 1e18)
 * @param rateB - Second rate (scaled by 1e18)
 * @returns Percentage difference (positive if rateA > rateB)
 */
export function calculateRateDifferencePercent(rateA: bigint, rateB: bigint): number {
  if (rateB === 0n) {
    return rateA > 0n ? 100 : 0;
  }

  // Calculate (rateA - rateB) / rateB * 100
  // Use higher precision to avoid losing decimal places
  const diff = rateA - rateB;
  const percentScaled = (diff * 10000n) / rateB; // Scale by 10000 to get 2 decimal places

  return Number(percentScaled) / 100; // Convert back to percentage with decimals
}

/**
 * Check if a rate difference (in percent) exceeds the threshold.
 *
 * @param differencePercent - Rate difference in percent
 * @param thresholdBps - Threshold in basis points
 * @returns True if the absolute difference exceeds the threshold
 */
export function isRateDifferenceSignificant(differencePercent: number, thresholdBps: number): boolean {
  const thresholdPercent = thresholdBps / 100;
  return Math.abs(differencePercent) >= thresholdPercent;
}

/**
 * Calculate the minimum output amount after applying slippage.
 *
 * @param outputAmount - Expected output amount
 * @param slippageBps - Slippage tolerance in basis points
 * @returns Minimum acceptable output amount
 */
export function calculateMinOutputWithSlippage(outputAmount: bigint, slippageBps: number): bigint {
  const slippageMultiplier = RATE_PRECISION.BPS_DIVISOR - BigInt(slippageBps);
  return (outputAmount * slippageMultiplier) / RATE_PRECISION.BPS_DIVISOR;
}

/**
 * Compare rates between native and Curve providers.
 *
 * @param nativeQuote - Quote from native provider (or undefined if unavailable)
 * @param curveQuote - Quote from Curve provider (or undefined if unavailable)
 * @param config - Rate comparison configuration
 * @returns Comparison result indicating which provider is better
 */
export function compareRates(
  nativeQuote: StUsdsQuote | undefined,
  curveQuote: StUsdsQuote | undefined,
  config: StUsdsRateComparisonConfig
): RateComparisonResult {
  // Handle cases where one or both quotes are missing
  if (!nativeQuote?.isValid && !curveQuote?.isValid) {
    return {
      betterProvider: null,
      differencePercent: 0,
      isSignificantDifference: false
    };
  }

  if (!nativeQuote?.isValid) {
    return {
      betterProvider: 'curve' as StUsdsProviderType,
      differencePercent: 100, // Curve is infinitely better (native unavailable)
      isSignificantDifference: true
    };
  }

  if (!curveQuote?.isValid) {
    return {
      betterProvider: 'native' as StUsdsProviderType,
      differencePercent: -100, // Native is infinitely better (curve unavailable)
      isSignificantDifference: true
    };
  }

  // Both quotes are valid - compare effective rates
  const nativeRate = nativeQuote.rateInfo.effectiveRate;
  const curveRate = curveQuote.rateInfo.effectiveRate;

  // Positive difference means Curve is better
  const differencePercent = calculateRateDifferencePercent(curveRate, nativeRate);
  const isSignificant = isRateDifferenceSignificant(differencePercent, config.rateSwitchThresholdBps);

  let betterProvider: StUsdsProviderType | null = null;

  if (isSignificant) {
    betterProvider =
      differencePercent > 0 ? ('curve' as StUsdsProviderType) : ('native' as StUsdsProviderType);
  }

  return {
    betterProvider,
    differencePercent,
    isSignificantDifference: isSignificant
  };
}
