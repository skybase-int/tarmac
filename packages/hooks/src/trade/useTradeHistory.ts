import { useCowswapTradeHistory } from './useCowswapTradeHistory';
import { usePsmTradeHistory } from '../psm/usePsmTradeHistory';
import { isCowSupportedChainId } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';

export function useTradeHistory(subgraphUrl?: string) {
  const chainId = useChainId();

  const cowswapTradeHistory = useCowswapTradeHistory({ enabled: isCowSupportedChainId(chainId) });

  const psmTradeHistory = usePsmTradeHistory({
    subgraphUrl,
    enabled: !isCowSupportedChainId(chainId)
  });

  if (isCowSupportedChainId(chainId)) {
    return cowswapTradeHistory;
  }
  return psmTradeHistory;
}
