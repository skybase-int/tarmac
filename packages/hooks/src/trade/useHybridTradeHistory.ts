import { useMemo } from 'react';
import { useCowswapTradeHistory } from './useCowswapTradeHistory';
import { usePsmTradeHistory } from '../psm/usePsmTradeHistory';
import { TRADE_CUTOFF_DATES } from './tradeCutoffDates';
import { ReadHook } from '../hooks';

/**
 * Hook that fetches both PSM and CowSwap trade histories and merges them based on a cutoff date
 * PSM trades before the cutoff date and CowSwap trades after the cutoff date
 */
export function useHybridTradeHistory({
  chainId,
  excludeSUsds = false,
  subgraphUrl,
  enabled = true
}: {
  chainId: number;
  excludeSUsds?: boolean;
  subgraphUrl?: string;
  enabled?: boolean;
}): ReadHook & { data?: any[] } {
  const cutoffDate = TRADE_CUTOFF_DATES[chainId];

  // If not enabled or no cutoff date, disable both sub-hooks
  const shouldFetch = enabled && !!cutoffDate;

  const psmHistory = usePsmTradeHistory({
    chainId,
    excludeSUsds,
    subgraphUrl,
    enabled: shouldFetch
  });

  const cowswapHistory = useCowswapTradeHistory({
    chainId,
    enabled: shouldFetch
  });

  const mergedData = useMemo(() => {
    // If no cutoff date or not enabled, return empty array
    if (!cutoffDate || !shouldFetch) {
      return [];
    }

    const psmData = psmHistory.data || [];
    const cowswapData = cowswapHistory.data || [];

    const filteredPsmData = psmData.filter(trade => trade.blockTimestamp < cutoffDate);

    const filteredCowswapData = cowswapData.filter(trade => trade.blockTimestamp >= cutoffDate);

    return [...filteredPsmData, ...filteredCowswapData].sort(
      (a, b) => b.blockTimestamp.getTime() - a.blockTimestamp.getTime()
    );
  }, [psmHistory.data, cowswapHistory.data, cutoffDate, shouldFetch]);

  return {
    data: mergedData,
    isLoading: psmHistory.isLoading || cowswapHistory.isLoading,
    error: psmHistory.error || cowswapHistory.error,
    mutate: () => {
      psmHistory.mutate();
      cowswapHistory.mutate();
    },
    dataSources: [...(psmHistory.dataSources || []), ...(cowswapHistory.dataSources || [])]
  };
}
