import { useMemo } from 'react';
import { RewardContract, useRewardsUserHistory, TransactionTypeEnum } from '@jetstreamgg/hooks';
import { formatBigInt, useFormatDates } from '@jetstreamgg/utils';
import { absBigInt } from '@/lib/absBigInt';
import { Supply } from '@/components/icons/Supply';
import { Withdraw } from '@/components/icons/Withdraw';
import { Reward } from '@/components/icons/Reward';
import { HistoryTable } from '@/components/historyTable/HistoryTable';

export function RewardsHistory({ rewardContract }: { rewardContract: RewardContract }) {
  const {
    data: allRewardsHistory,
    isLoading: rewardsHistoryLoading,
    error
  } = useRewardsUserHistory({ rewardContractAddress: rewardContract.contractAddress });
  const rewardsHistory = allRewardsHistory; //TODO: filter this by the reward contract

  const memoizedDates = useMemo(() => rewardsHistory?.map(s => s.blockTimestamp), [rewardsHistory]);
  const formattedDates = useFormatDates(memoizedDates, 'en-US', 'MMMM d, yyyy, h:mm a');

  // map reward history to rows
  const history = rewardsHistory?.map((r, index) => ({
    id: r.transactionHash,
    type:
      r.type === TransactionTypeEnum.REWARD
        ? 'Claim rewards'
        : r.type === TransactionTypeEnum.SUPPLY
          ? 'Supply'
          : 'Withdraw',
    highlightText: r.type === TransactionTypeEnum.SUPPLY,
    textLeft: `${formatBigInt(absBigInt(r.amount), { compact: true })} ${
      r.type === TransactionTypeEnum.REWARD
        ? rewardContract.rewardToken.symbol
        : rewardContract.supplyToken.symbol
    }`,
    iconLeft:
      r.type === TransactionTypeEnum.REWARD ? (
        <Reward width={14} height={14} className="mr-1" />
      ) : r.type === TransactionTypeEnum.SUPPLY ? (
        <Supply width={14} height={14} className="text-bullish mr-1" />
      ) : (
        <Withdraw width={14} height={14} className="mr-1" />
      ),
    formattedDate: formattedDates.length > index ? formattedDates[index] : '',
    rawDate: r.blockTimestamp,
    transactionHash: r.transactionHash
  }));

  return (
    <HistoryTable
      history={history}
      error={error}
      isLoading={rewardsHistoryLoading}
      transactionHeader="Amount"
      typeColumn
    />
  );
}
