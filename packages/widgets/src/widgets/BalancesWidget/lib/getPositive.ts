import { TransactionTypeEnum } from '@jetstreamgg/hooks';

export const getPositive = ({ type }: { type: TransactionTypeEnum }) => {
  switch (type) {
    case TransactionTypeEnum.SELECT_DELEGATE:
    case TransactionTypeEnum.SELECT_REWARD:
    case TransactionTypeEnum.OPEN:
      return undefined;

    case TransactionTypeEnum.WITHDRAW:
    case TransactionTypeEnum.REWARD:
    case TransactionTypeEnum.MKR_TO_SKY:
    case TransactionTypeEnum.DAI_TO_USDS:
    case TransactionTypeEnum.REPAY:
    case TransactionTypeEnum.SEAL:
      return true;
    case TransactionTypeEnum.USDS_TO_DAI:
    case TransactionTypeEnum.SKY_TO_MKR:
    case TransactionTypeEnum.TRADE:
    case TransactionTypeEnum.SUPPLY:
    case TransactionTypeEnum.BORROW:
    case TransactionTypeEnum.UNSEAL:
    default:
      return false;
  }
};
