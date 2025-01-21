import { useBaseCombinedHistory } from './useBaseCombinedHistory';
import { useEthereumCombinedHistory } from './useEthereumCombinedHistory';
import { useChainId } from 'wagmi';
import { isBaseChainId } from '@jetstreamgg/utils';

export const useCombinedHistory = () => {
  const chainId = useChainId();
  const baseHistory = useBaseCombinedHistory();
  const ethereumHistory = useEthereumCombinedHistory();

  return isBaseChainId(chainId) ? baseHistory : ethereumHistory;
};
