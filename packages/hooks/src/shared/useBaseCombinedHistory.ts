import { useBaseSavingsHistory } from '../psm/useBaseSavingsHistory';
import { useBaseTradeHistory } from '../psm/useBaseTradeHistory';
import { CombinedHistoryItem } from './shared';
import { useMemo } from 'react';

export function useBaseCombinedHistory() {
  const savingsHistory = useBaseSavingsHistory();
  const tradeHistory = useBaseTradeHistory();

  const combinedData = useMemo(() => {
    return [...(savingsHistory.data || []), ...(tradeHistory.data || [])].sort(
      (a: CombinedHistoryItem, b: CombinedHistoryItem) => b.blockTimestamp - a.blockTimestamp
    );
  }, [savingsHistory.data, tradeHistory.data]);

  return {
    data: combinedData,
    isLoading: savingsHistory.isLoading || tradeHistory.isLoading,
    error: savingsHistory.error || tradeHistory.error,
    mutate: () => {
      savingsHistory.mutate();
      tradeHistory.mutate();
    }
  };
}
