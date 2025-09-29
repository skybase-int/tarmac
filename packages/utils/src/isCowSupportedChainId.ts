import { isMainnetId } from './isMainnetId';
import { TRADE_CUTOFF_DATES } from '../../hooks/src/trade/tradeCutoffDates';

export const isCowSupportedChainId = (chainId: number) => {
  return isMainnetId(chainId) || chainId in TRADE_CUTOFF_DATES;
};
