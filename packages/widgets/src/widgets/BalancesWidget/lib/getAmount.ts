import { CombinedHistoryItem, ModuleEnum, TransactionTypeEnum } from '@jetstreamgg/hooks';
import { formatBigInt } from '@jetstreamgg/utils';
import { absBigInt } from './absBigInt';
import { getTokenDecimals } from '@jetstreamgg/hooks';

// TODO this needs to be standardized across modules so that amount is the same property name on each module
export const getAmount = ({
  item,
  type,
  chainId
}: {
  item: CombinedHistoryItem;
  type: TransactionTypeEnum;
  chainId: number;
}) => {
  switch (item.module) {
    case ModuleEnum.TRADE:
      return formatBigInt(absBigInt(item.fromAmount), {
        compact: true,
        unit: getTokenDecimals(item.fromToken, chainId)
      });
    case ModuleEnum.UPGRADE:
      switch (item.type) {
        case TransactionTypeEnum.MKR_TO_SKY:
          return formatBigInt(absBigInt(item.skyAmt), { compact: true });
        case TransactionTypeEnum.SKY_TO_MKR:
          return formatBigInt(absBigInt(item.skyAmt), { compact: true });
        case TransactionTypeEnum.DAI_TO_USDS:
          return formatBigInt(absBigInt(item.wad), { compact: true });
        case TransactionTypeEnum.USDS_TO_DAI:
          return formatBigInt(absBigInt(item.wad), { compact: true });
      }
      break;
    case ModuleEnum.REWARDS:
    case ModuleEnum.SEAL:
      return [TransactionTypeEnum.SELECT_DELEGATE, TransactionTypeEnum.SELECT_REWARD].includes(type)
        ? ''
        : formatBigInt(absBigInt(item.amount), { compact: true });
    case ModuleEnum.SAVINGS:
      return formatBigInt(absBigInt(item.assets), {
        compact: true,
        unit: getTokenDecimals(item.token, chainId)
      });
  }
};
