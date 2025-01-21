import { chainId as chainIdMap } from './chainId';

export const isBaseChainId = (chainId: number) => {
  return chainId === chainIdMap.base || chainId === chainIdMap.tenderlyBase;
};
