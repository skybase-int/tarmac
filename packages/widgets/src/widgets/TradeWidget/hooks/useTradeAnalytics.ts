import { useCallback } from 'react';
import { formatUnits } from 'viem';
import { TokenForChain, getTokenDecimals, OrderQuoteResponse } from '@jetstreamgg/sky-hooks';
import { useChainId } from 'wagmi';
import { WidgetAnalyticsEvent } from '@widgets/shared/types/analyticsEvents';

interface UseTradeAnalyticsParams {
  onAnalyticsEvent?: (event: WidgetAnalyticsEvent) => void;
  originToken?: TokenForChain;
  targetToken?: TokenForChain;
  debouncedOriginAmount: bigint;
  targetAmount: bigint;
  quoteData?: OrderQuoteResponse | null;
  batchEnabled: boolean;
}

export function useTradeAnalytics({
  onAnalyticsEvent,
  originToken,
  targetToken,
  debouncedOriginAmount,
  targetAmount,
  quoteData,
  batchEnabled
}: UseTradeAnalyticsParams) {
  const chainId = useChainId();

  const swapData: Record<string, unknown> = {
    module: 'swap',
    swapProvider: 'cowswap',
    tokenAddressFrom: originToken?.address,
    tokenSymbolFrom: originToken?.symbol,
    tokenAddressTo: targetToken?.address,
    tokenSymbolTo: targetToken?.symbol,
    amountFrom: originToken
      ? Number(formatUnits(debouncedOriginAmount, getTokenDecimals(originToken, chainId)))
      : undefined,
    amountTo: targetToken
      ? Number(formatUnits(targetAmount, getTokenDecimals(targetToken, chainId)))
      : undefined,
    isEthFlow: !!originToken?.isNative,
    slippage: quoteData?.quote?.slippageTolerance,
    quoteKind: quoteData?.quote?.kind,
    isBatchTx: batchEnabled
  };

  const fireAnalytics = useCallback(
    (event: WidgetAnalyticsEvent) => {
      try {
        onAnalyticsEvent?.(event);
      } catch {
        // Silently swallow — analytics must never break functionality
      }
    },
    [onAnalyticsEvent]
  );

  return { fireAnalytics, swapData };
}
