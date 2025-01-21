import { useEthereumTradeHistory } from './useEthereumTradeHistory';
import { useBaseTradeHistory } from '../psm/useBaseTradeHistory';
import { isBaseChainId } from '@jetstreamgg/utils';
import { useChainId } from 'wagmi';

export function useTradeHistory(subgraphUrl?: string) {
  const chainId = useChainId();
  const baseTradeHistory = useBaseTradeHistory({ subgraphUrl, enabled: isBaseChainId(chainId) });
  const ethereumTradeHistory = useEthereumTradeHistory({ enabled: !isBaseChainId(chainId) });

  if (isBaseChainId(chainId)) {
    return baseTradeHistory;
  }
  return ethereumTradeHistory;
}
