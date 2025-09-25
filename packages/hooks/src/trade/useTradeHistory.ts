import { useCowswapTradeHistory } from './useCowswapTradeHistory';
import { usePsmTradeHistory } from '../psm/usePsmTradeHistory';
import { isCowSupportedChainId } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';

export function useTradeHistory(subgraphUrl?: string) {
  const chainId = useChainId();

  // Use CowSwap API for all chains that support it (mainnet, base, arbitrum)
  const cowswapTradeHistory = useCowswapTradeHistory({ enabled: isCowSupportedChainId(chainId) });

  // Use PSM subgraph for chains that don't support CowSwap (optimism, unichain)
  const psmTradeHistory = usePsmTradeHistory({
    subgraphUrl,
    enabled: !isCowSupportedChainId(chainId)
  });

  if (isCowSupportedChainId(chainId)) {
    return cowswapTradeHistory;
  }
  return psmTradeHistory;
}
