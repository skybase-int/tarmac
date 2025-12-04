import { useMemo } from 'react';
import { useNativeStUsdsProvider } from './useNativeStUsdsProvider';
import { useCurveStUsdsProvider } from './useCurveStUsdsProvider';
import { compareRates } from './rateComparison';
import { STUSDS_PROVIDER_CONFIG } from './constants';
import {
  StUsdsProviderType,
  StUsdsProviderStatus,
  StUsdsSelectionReason,
  StUsdsQuoteParams,
  StUsdsProviderSelectionResult
} from './types';

/**
 * Main orchestration hook that selects the optimal provider for stUSDS operations.
 *
 * Selection logic:
 * 1. If native is blocked and Curve available → select Curve
 * 2. If Curve is blocked and native available → select native
 * 3. If both available → compare rates with threshold buffer
 * 4. If both blocked → set allProvidersBlocked: true
 *
 * @param params - Quote parameters (amount and direction)
 * @returns Selection result with recommended provider and reasoning
 */
export function useStUsdsProviderSelection(params: StUsdsQuoteParams): StUsdsProviderSelectionResult {
  const { direction } = params;

  // Get data from both providers
  const {
    data: nativeData,
    isLoading: isNativeLoading,
    error: nativeError,
    refetch: refetchNative
  } = useNativeStUsdsProvider(params);

  const {
    data: curveData,
    isLoading: isCurveLoading,
    error: curveError,
    refetch: refetchCurve
  } = useCurveStUsdsProvider(params);

  // Determine which provider to use
  const selection = useMemo(() => {
    // Default values while loading
    let selectedProvider = StUsdsProviderType.NATIVE;
    let selectionReason = StUsdsSelectionReason.NATIVE_DEFAULT;
    let allProvidersBlocked = false;
    let rateDifferencePercent = 0;

    // Log exchange rates for debugging
    if (nativeData?.quote || curveData?.quote) {
      const nativeQuote = nativeData?.quote;
      const curveQuote = curveData?.quote;

      console.group('📊 stUSDS Exchange Rate Comparison');
      console.log(`Direction: ${direction}`);
      console.log(`Input Amount: ${params.amount.toString()}`);
      console.log('---');

      if (nativeQuote) {
        const nativeRate = nativeQuote.rateInfo.effectiveRate;
        const nativeRateDecimal = Number(nativeRate) / 1e18;
        console.log(
          `🏦 NATIVE: ${nativeQuote.inputAmount.toString()} → ${nativeQuote.outputAmount.toString()} (rate: ${nativeRateDecimal.toFixed(6)})`
        );
        console.log(
          `   Status: ${nativeData?.state.status}, Can${direction === 'deposit' ? 'Deposit' : 'Withdraw'}: ${direction === 'deposit' ? nativeData?.state.canDeposit : nativeData?.state.canWithdraw}`
        );
      } else {
        console.log('🏦 NATIVE: No quote available');
        console.log(`   Status: ${nativeData?.state.status ?? 'unknown'}`);
      }

      if (curveQuote) {
        const curveRate = curveQuote.rateInfo.effectiveRate;
        const curveRateDecimal = Number(curveRate) / 1e18;
        console.log(
          `🔄 CURVE:  ${curveQuote.inputAmount.toString()} → ${curveQuote.outputAmount.toString()} (rate: ${curveRateDecimal.toFixed(6)})`
        );
        console.log(
          `   Status: ${curveData?.state.status}, Can${direction === 'deposit' ? 'Deposit' : 'Withdraw'}: ${direction === 'deposit' ? curveData?.state.canDeposit : curveData?.state.canWithdraw}`
        );
        console.log(`   Price Impact: ${curveQuote.rateInfo.priceImpactBps} bps`);
      } else {
        console.log('🔄 CURVE:  No quote available');
        console.log(`   Status: ${curveData?.state.status ?? 'unknown'}`);
      }

      // Show which provider has better rate (regardless of availability)
      if (nativeQuote && curveQuote) {
        const nativeRate = Number(nativeQuote.rateInfo.effectiveRate);
        const curveRate = Number(curveQuote.rateInfo.effectiveRate);
        const diff = ((curveRate - nativeRate) / nativeRate) * 100;
        const betterProvider = curveRate > nativeRate ? 'CURVE' : nativeRate > curveRate ? 'NATIVE' : 'EQUAL';
        const diffAbs = Math.abs(diff).toFixed(4);
        console.log('---');
        console.log(
          `💰 Better Rate: ${betterProvider}${betterProvider !== 'EQUAL' ? ` (+${diffAbs}% better)` : ''}`
        );
      }

      console.groupEnd();
    }

    // Check availability based on direction
    const isNativeAvailable =
      nativeData?.state.status === StUsdsProviderStatus.AVAILABLE &&
      (direction === 'deposit' ? nativeData.state.canDeposit : nativeData.state.canWithdraw);

    const isCurveAvailable =
      curveData?.state.status === StUsdsProviderStatus.AVAILABLE &&
      (direction === 'deposit' ? curveData.state.canDeposit : curveData.state.canWithdraw);

    // Selection logic
    if (!isNativeAvailable && !isCurveAvailable) {
      // Both providers blocked
      allProvidersBlocked = true;
      selectionReason = StUsdsSelectionReason.ALL_BLOCKED;
      // Default to native for display purposes
      selectedProvider = StUsdsProviderType.NATIVE;
    } else if (!isNativeAvailable && isCurveAvailable) {
      // Only Curve available
      selectedProvider = StUsdsProviderType.CURVE;
      selectionReason = StUsdsSelectionReason.CURVE_ONLY_AVAILABLE;
    } else if (isNativeAvailable && !isCurveAvailable) {
      // Only native available
      selectedProvider = StUsdsProviderType.NATIVE;
      selectionReason = StUsdsSelectionReason.NATIVE_ONLY_AVAILABLE;
    } else {
      // Both available - compare rates
      const comparison = compareRates(nativeData?.quote, curveData?.quote, STUSDS_PROVIDER_CONFIG);

      rateDifferencePercent = comparison.differencePercent;

      if (comparison.isSignificantDifference && comparison.betterProvider) {
        if (comparison.betterProvider === StUsdsProviderType.CURVE) {
          selectedProvider = StUsdsProviderType.CURVE;
          selectionReason = StUsdsSelectionReason.CURVE_BETTER_RATE;
        } else {
          selectedProvider = StUsdsProviderType.NATIVE;
          selectionReason = StUsdsSelectionReason.NATIVE_BETTER_RATE;
        }
      } else {
        // Rates are similar, prefer native
        selectedProvider = StUsdsProviderType.NATIVE;
        selectionReason = StUsdsSelectionReason.NATIVE_DEFAULT;
      }
    }

    // Log selection result
    if (nativeData?.quote || curveData?.quote) {
      console.log(
        `✅ Selected: ${selectedProvider.toUpperCase()} (reason: ${selectionReason}, rateDiff: ${rateDifferencePercent.toFixed(4)}%)`
      );
    }

    return {
      selectedProvider,
      selectionReason,
      allProvidersBlocked,
      rateDifferencePercent
    };
  }, [nativeData, curveData, direction, params.amount]);

  const isLoading = isNativeLoading || isCurveLoading;
  const error = nativeError || curveError;

  const refetch = () => {
    refetchNative();
    refetchCurve();
  };

  // Get the quote from the selected provider
  const selectedQuote =
    selection.selectedProvider === StUsdsProviderType.CURVE ? curveData?.quote : nativeData?.quote;

  return {
    selectedProvider: selection.selectedProvider,
    selectionReason: selection.selectionReason,
    selectedQuote,
    nativeProvider: nativeData,
    curveProvider: curveData,
    allProvidersBlocked: selection.allProvidersBlocked,
    rateDifferencePercent: selection.rateDifferencePercent,
    isLoading,
    error: error as Error | null,
    refetch
  };
}
