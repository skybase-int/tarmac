import { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import {
  isBaseChainId,
  isMainnetId,
  isArbitrumChainId,
  isUnichainChainId,
  isOptimismChainId
} from '@jetstreamgg/sky-utils';

const NOT_FOUND = 'image_not_found';
const EXTENSIONS = ['svg', 'png']; // Add more extensions if needed

export const useTokenImage = (symbol: string, chainId?: number, noChain?: boolean) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const connectedChainId = useChainId();
  const chainIdToUse = noChain ? undefined : chainId || connectedChainId;

  useEffect(() => {
    if (!symbol) {
      setImageSrc(undefined);
      return;
    }

    // Clear old icon immediately when token changes
    setImageSrc(undefined);

    const symbolLower = symbol.toLowerCase();
    let currentIndex = 0;
    let isCancelled = false; // Flag to prevent stale callbacks

    const checkNextExtension = () => {
      if (isCancelled) return;

      if (currentIndex >= EXTENSIONS.length) {
        if (!isCancelled) {
          setImageSrc(NOT_FOUND);
        }
        return;
      }

      const extension = EXTENSIONS[currentIndex];
      const path = `/tokens/${!chainIdToUse ? '' : isBaseChainId(chainIdToUse) ? 'base/' : isMainnetId(chainIdToUse) ? 'ethereum/' : isArbitrumChainId(chainIdToUse) ? 'arbitrum/' : isUnichainChainId(chainIdToUse) ? 'unichain/' : isOptimismChainId(chainIdToUse) ? 'optimism/' : ''}${symbolLower}.${extension}`;

      const img = new Image();
      img.onload = () => {
        // Only update if this effect hasn't been cancelled
        if (!isCancelled) {
          setImageSrc(path);
        }
      };
      img.onerror = () => {
        if (!isCancelled) {
          currentIndex++;
          checkNextExtension();
        }
      };
      img.src = path;
    };

    checkNextExtension();

    // Cancel pending loads when token changes
    return () => {
      isCancelled = true;
    };
  }, [symbol, chainIdToUse]);

  return imageSrc;
};
