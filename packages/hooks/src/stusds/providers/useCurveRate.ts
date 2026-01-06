import { useMemo } from 'react';
import { useCurveQuote } from './useCurveQuote';
import { StUsdsDirection } from './types';
import { RATE_PRECISION } from './constants';

export type CurveRateResult = {
  curveRate: bigint | undefined;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Hook to get the current exchange rate from the Curve pool.
 * Calculates the average of buy and sell rates to provide a balanced mid-market rate.

 */
export function useCurveRate(): CurveRateResult {
  // Get quote for selling 1 stUSDS for USDS (withdraw direction)
  const {
    data: withdrawQuote,
    isLoading: isWithdrawLoading,
    error: withdrawError
  } = useCurveQuote({
    direction: StUsdsDirection.WITHDRAW,
    amount: RATE_PRECISION.WAD,
    enabled: true
  });

  // Get quote for buying stUSDS with 1 USDS (supply direction)
  const {
    data: supplyQuote,
    isLoading: isSupplyLoading,
    error: supplyError
  } = useCurveQuote({
    direction: StUsdsDirection.SUPPLY,
    amount: RATE_PRECISION.WAD,
    enabled: true
  });

  const curveRate = useMemo(() => {
    if (!withdrawQuote || !supplyQuote) {
      return undefined;
    }

    const withdrawRate =
      withdrawQuote.stUsdsAmount > 0n
        ? (RATE_PRECISION.WAD * RATE_PRECISION.WAD) / withdrawQuote.stUsdsAmount
        : 0n;

    const supplyRate =
      supplyQuote.stUsdsAmount > 0n
        ? (RATE_PRECISION.WAD * RATE_PRECISION.WAD) / supplyQuote.stUsdsAmount
        : 0n;

    if (withdrawRate === 0n) return supplyRate > 0n ? supplyRate : undefined;
    if (supplyRate === 0n) return withdrawRate;

    return (withdrawRate + supplyRate) / 2n;
  }, [withdrawQuote, supplyQuote]);

  return {
    curveRate,
    isLoading: isWithdrawLoading || isSupplyLoading,
    error: withdrawError || supplyError || null
  };
}
