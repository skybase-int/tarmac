import { TransactionTypeEnum, ModuleEnum } from '@jetstreamgg/hooks';
import { SavingsSupply } from '@widgets/shared/components/icons/SavingsSupply';
import { SavingsSupply as SavingsSupplyBase } from '@widgets/shared/components/icons/base/SavingsSupply';
import { ArrowDown } from '@widgets/shared/components/icons/ArrowDown';
import { ArrowDown as ArrowDownBase } from '@widgets/shared/components/icons/base/ArrowDown';
import { Trade } from '@widgets/shared/components/icons/Trade';
import { Trade as TradeBase } from '@widgets/shared/components/icons/base/Trade';
import { Upgrade } from '@widgets/shared/components/icons/Upgrade';
import { Revert } from '@widgets/shared/components/icons/Revert';
import { Supply } from '@widgets/shared/components/icons/Supply';
import { Withdraw } from '@widgets/shared/components/icons/Withdraw';
import { Reward } from '@widgets/shared/components/icons/Reward';
import { Seal } from '@widgets/shared/components/icons/Seal';
import { isBaseChainId } from '@jetstreamgg/utils';

export const getIcon = ({
  type,
  module,
  chainId
}: {
  type?: TransactionTypeEnum;
  module: ModuleEnum;
  chainId: number;
}) => {
  const isBase = isBaseChainId(chainId);
  switch (module) {
    case ModuleEnum.SAVINGS:
      return type === TransactionTypeEnum.SUPPLY ? (
        isBase ? (
          <SavingsSupplyBase width={14} height={14} />
        ) : (
          <SavingsSupply width={14} height={14} />
        )
      ) : isBase ? (
        <ArrowDownBase width={14} height={14} />
      ) : (
        <ArrowDown width={14} height={14} />
      );
    case ModuleEnum.UPGRADE:
      return type === TransactionTypeEnum.DAI_TO_USDS || type === TransactionTypeEnum.MKR_TO_SKY ? (
        <Upgrade width={14} height={14} />
      ) : (
        <Revert width={14} height={14} />
      );
    case ModuleEnum.TRADE:
      return isBase ? <TradeBase width={14} height={14} /> : <Trade width={14} height={14} />;
    case ModuleEnum.REWARDS:
      return type === TransactionTypeEnum.SUPPLY ? (
        <Supply width={14} height={14} />
      ) : type === TransactionTypeEnum.REWARD ? (
        <Reward width={14} height={14} />
      ) : (
        <Withdraw width={14} height={14} />
      );
    case ModuleEnum.SEAL:
      return <Seal width={14} height={14} />;
  }
};
