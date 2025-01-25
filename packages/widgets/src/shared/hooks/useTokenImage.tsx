import { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import { isBaseChainId } from '@jetstreamgg/utils';

const NOT_FOUND = 'image_not_found';
const EXTENSIONS = ['svg', 'png']; // Add more extensions if needed

export const useTokenImage = (symbol: string, chainId?: number) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const connectedChainId = useChainId();
  const chainIdToUse = chainId || connectedChainId;

  useEffect(() => {
    if (!symbol) return;

    const symbolLower = symbol.toLowerCase();
    let currentIndex = 0;

    const checkNextExtension = () => {
      if (currentIndex >= EXTENSIONS.length) {
        setImageSrc(NOT_FOUND);
        return;
      }

      const extension = EXTENSIONS[currentIndex];
      const path = `/tokens/${isBaseChainId(chainIdToUse) ? 'base/' : ''}${symbolLower}.${extension}`;

      const img = new Image();
      img.onload = () => {
        setImageSrc(path);
      };
      img.onerror = () => {
        currentIndex++;
        checkNextExtension();
      };
      img.src = path;
    };

    checkNextExtension();
  }, [symbol, chainIdToUse]);

  return imageSrc;
};
