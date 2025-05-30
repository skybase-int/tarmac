import { chainId } from './chainId';

export const getChainSpecificText = (
  chainTexts: {
    ethereum?: string;
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
      return chainTexts.base;
    case chainId.arbitrum:
    case chainId.tenderlyArbitrum:
      return chainTexts.arbitrum;
    case chainId.optimism:
      return chainTexts.optimism;
    case chainId.unichain:
      return chainTexts.unichain;
    default:
      return chainTexts.default;
  }
};
