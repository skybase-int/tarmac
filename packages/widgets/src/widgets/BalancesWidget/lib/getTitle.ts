import { TransactionTypeEnum, ModuleEnum } from '@jetstreamgg/hooks';
import { captitalizeFirstLetter } from '@jetstreamgg/utils';
import { t } from '@lingui/core/macro';

export const getTitle = ({ type, module }: { type: TransactionTypeEnum; module: ModuleEnum }) => {
  switch (type) {
    case TransactionTypeEnum.DAI_TO_USDS:
    case TransactionTypeEnum.MKR_TO_SKY:
      return t`Upgrade`;
    case TransactionTypeEnum.SKY_TO_MKR:
    case TransactionTypeEnum.USDS_TO_DAI:
      return t`Revert`;
    case TransactionTypeEnum.TRADE:
      return t`Trade`;
    case TransactionTypeEnum.SUPPLY:
      if (module === ModuleEnum.REWARDS) {
        return t`Rewards Supply`;
      } else if (module === ModuleEnum.SAVINGS) {
        return t`Savings Supply`;
      }
      return t`Supply`;
    case TransactionTypeEnum.WITHDRAW:
      if (module === ModuleEnum.REWARDS) {
        return t`Rewards Withdraw `;
      } else if (module === ModuleEnum.SAVINGS) {
        return t`Savings Withdraw`;
      }
      return t`Withdraw`;
    case TransactionTypeEnum.REWARD:
      return t`Claim rewards`;
    default:
      return captitalizeFirstLetter((type || module).toLowerCase().replace('_', ' '));
  }
};
