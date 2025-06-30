import { useMemo } from 'react';
import { useChainId } from 'wagmi';
import {
  isBaseChainId,
  isMainnetId,
  isArbitrumChainId,
  isUnichainChainId,
  isOptimismChainId
} from '@jetstreamgg/sky-utils';

export const useTokenImage = (symbol: string, chainId?: number, noChain?: boolean) => {
  const connectedChainId = useChainId();
  const chainIdToUse = noChain ? undefined : chainId || connectedChainId;

  return useMemo(() => {
    if (!symbol) return undefined;

    const symbolLower = symbol.toLowerCase();
    const chainPath = !chainIdToUse
      ? ''
      : isBaseChainId(chainIdToUse)
        ? 'base/'
        : isMainnetId(chainIdToUse)
          ? 'ethereum/'
          : isArbitrumChainId(chainIdToUse)
            ? 'arbitrum/'
            : isUnichainChainId(chainIdToUse)
              ? 'unichain/'
              : isOptimismChainId(chainIdToUse)
                ? 'optimism/'
                : '';

    // All tokens use .svg format
    return `/tokens/${chainPath}${symbolLower}.svg`;
  }, [symbol, chainIdToUse]);
};
