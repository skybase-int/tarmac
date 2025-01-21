import { useEthereumSavingsHistory } from './useEthereumSavingsHistory';
import { useBaseSavingsHistory } from '../psm/useBaseSavingsHistory';
import { isBaseChainId } from '@jetstreamgg/utils';
import { useChainId } from 'wagmi';

export function useSavingsHistory(subgraphUrl?: string) {
  const chainId = useChainId();
  const baseSavingsHistory = useBaseSavingsHistory({ subgraphUrl, enabled: isBaseChainId(chainId) });
  const ethereumSavingsHistory = useEthereumSavingsHistory({ subgraphUrl, enabled: !isBaseChainId(chainId) });

  if (isBaseChainId(chainId)) {
    return baseSavingsHistory;
  }
  return ethereumSavingsHistory;
}
