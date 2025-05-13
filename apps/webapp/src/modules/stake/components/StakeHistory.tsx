import { useMemo } from 'react';
import { TransactionTypeEnum, useStakeHistory } from '@jetstreamgg/hooks';
import { formatBigInt, useFormatDates } from '@jetstreamgg/utils';
import { t } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { SavingsSupply, ArrowDown } from '@/modules/icons';
import { HistoryTable } from '@/modules/ui/components/historyTable/HistoryTable';

// TODO: This needs to be updated once we have the stake history coming from hooks
const mapTypeEnumToColumn = (type: TransactionTypeEnum) => {
  switch (type) {
    case TransactionTypeEnum.STAKE_OPEN:
      return t`Open position`;
    case TransactionTypeEnum.STAKE:
      return t`Stake`;
    case TransactionTypeEnum.UNSTAKE:
      return t`Unstake`;
    case TransactionTypeEnum.STAKE_REWARD:
      return t`Claim rewards`;
    case TransactionTypeEnum.STAKE_BORROW:
      return t`Borrow`;
    case TransactionTypeEnum.STAKE_REPAY:
      return t`Repay`;
    case TransactionTypeEnum.STAKE_SELECT_DELEGATE:
      return t`Select delegate`;
    case TransactionTypeEnum.STAKE_SELECT_REWARD:
      return t`Select reward`;
    case TransactionTypeEnum.UNSTAKE_KICK:
      return t`Liquidation`;
    default:
      return '';
  }
};

// TODO: Eventually rewards will be claimed for different tokens as well,
// so we would need to fetch the reward token dynamically
const mapTypeEnumToTokenSymbol = (type: TransactionTypeEnum) => {
  switch (type) {
    case TransactionTypeEnum.STAKE:
    case TransactionTypeEnum.UNSTAKE:
      return 'SKY';
    case TransactionTypeEnum.STAKE_BORROW:
    case TransactionTypeEnum.STAKE_REPAY:
    case TransactionTypeEnum.STAKE_REWARD:
      return 'USDS';
    default:
      return '';
  }
};

const highlightedEvents = [TransactionTypeEnum.STAKE, TransactionTypeEnum.STAKE_REPAY];

export function StakeHistory({ index }: { index?: number }) {
  const { data: stakeHistory, isLoading: stakeHistoryLoading, error } = useStakeHistory({ index });
  console.log('stakeHistory', stakeHistory);
  const { i18n } = useLingui();

  const memoizedDates = useMemo(() => stakeHistory?.map(s => s.blockTimestamp), [stakeHistory]);
  const formattedDates = useFormatDates(memoizedDates, i18n.locale, 'MMM d, yyyy, h:mm a');

  // map stake history to rows
  const history = stakeHistory?.map((s, index) => ({
    id: `${s.transactionHash}-${s.type}`,
    type: mapTypeEnumToColumn(s.type),
    highlightText: highlightedEvents.includes(s.type),
    textLeft:
      'amount' in s
        ? `${formatBigInt(s.amount || 0n, { compact: true })} ${mapTypeEnumToTokenSymbol(s.type)}`
        : '',
    iconLeft:
      'amount' in s ? (
        highlightedEvents.includes(s.type) ? (
          <SavingsSupply width={14} height={13} className="mr-1" />
        ) : (
          <ArrowDown width={10} height={14} className="mr-1 fill-white" />
        )
      ) : (
        <></>
      ),
    formattedDate: formattedDates.length > index ? formattedDates[index] : '',
    rawDate: s.blockTimestamp,
    transactionHash: s.transactionHash
  }));

  return (
    <HistoryTable
      dataTestId="stake-history"
      history={history}
      error={error}
      isLoading={stakeHistoryLoading}
      transactionHeader={t`Amount`}
      typeColumn
    />
  );
}
