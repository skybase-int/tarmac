import { chainId } from './chainId';

export const getChainSpecificText = (
  chainTexts: {
    ethereum?: string;
    allL2s?: string;
    base?: string;
    arbitrum?: string;
    optimism?: string;
    unichain?: string;
    default: string;
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
