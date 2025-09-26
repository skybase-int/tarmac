import { useL2SavingsHistory } from '../psm/useL2SavingsHistory';
import { usePsmTradeHistory } from '../psm/usePsmTradeHistory';
import { useCowswapTradeHistory } from '../trade/useCowswapTradeHistory';
import { useMemo } from 'react';
import { isCowSupportedChainId } from '@jetstreamgg/sky-utils';

export function useL2CombinedHistory(chainId?: number) {
  const savingsHistory = useL2SavingsHistory({ chainId });

  const isCowSupported = chainId ? isCowSupportedChainId(chainId) : false;

  const cowswapTradeHistory = useCowswapTradeHistory({
    enabled: isCowSupported,
    chainId
  });
  const psmTradeHistory = usePsmTradeHistory({
    chainId,
    excludeSUsds: true,
    enabled: !isCowSupported
  });

  const tradeHistory = isCowSupported ? cowswapTradeHistory : psmTradeHistory;

  const combinedData = useMemo(() => {
    return [...(savingsHistory.data || []), ...(tradeHistory.data || [])].sort(
      (a, b) => b.blockTimestamp.getTime() - a.blockTimestamp.getTime()
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
