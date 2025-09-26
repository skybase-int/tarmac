import { useCowswapTradeHistory } from './useCowswapTradeHistory';
import { usePsmTradeHistory } from '../psm/usePsmTradeHistory';
import { isCowSupportedChainId } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';

export function useTradeHistory({
  subgraphUrl,
  chainId: providedChainId,
  excludeSUsds = false
}: {
  subgraphUrl?: string;
  chainId?: number;
  excludeSUsds?: boolean;
} = {}) {
  const currentChainId = useChainId();
  const chainId = providedChainId ?? currentChainId;

  const cowswapTradeHistory = useCowswapTradeHistory({
    enabled: isCowSupportedChainId(chainId),
    chainId
  });

  const psmTradeHistory = usePsmTradeHistory({
    subgraphUrl,
    enabled: !isCowSupportedChainId(chainId),
    chainId,
    excludeSUsds
  });

  if (isCowSupportedChainId(chainId)) {
    return cowswapTradeHistory;
  }
  return psmTradeHistory;
}
