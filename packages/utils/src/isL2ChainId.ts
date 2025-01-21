import { chainId as chainIdMap } from './chainId';

export const isArbitrumChainId = (chainId: number) => {
  return chainId === chainIdMap.tenderlyArbitrum; //TODO: add arbitrum
};

export const isBaseChainId = (chainId: number) => {
  return chainId === chainIdMap.base || chainId === chainIdMap.tenderlyBase;
};

export const isL2ChainId = (chainId: number) => {
  return isArbitrumChainId(chainId) || isBaseChainId(chainId);
};
