import { ReactNode } from 'react';
import { chainId } from './chainId';

type TextElement = string | ReactNode;

export const getChainSpecificText = (
  chainTexts: {
    ethereum?: TextElement;
    allL2s?: TextElement;
    base?: TextElement;
    arbitrum?: TextElement;
    optimism?: TextElement;
    unichain?: TextElement;
    default: TextElement;
  },
  id: number
) => {
  switch (id) {
    case chainId.mainnet:
    case chainId.sepolia:
    case chainId.tenderly:
      return chainTexts.ethereum || chainTexts.default;
    case chainId.base:
    case chainId.tenderlyBase:
      return chainTexts.base || chainTexts.allL2s;
    case chainId.arbitrum:
    case chainId.tenderlyArbitrum:
      return chainTexts.arbitrum || chainTexts.allL2s;
    case chainId.optimism:
      return chainTexts.optimism || chainTexts.allL2s;
    case chainId.unichain:
      return chainTexts.unichain || chainTexts.allL2s;
    default:
      return chainTexts.default;
  }
};
