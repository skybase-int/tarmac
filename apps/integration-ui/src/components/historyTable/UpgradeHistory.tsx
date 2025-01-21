import { useMemo } from 'react';
import { useUpgradeHistory, TransactionTypeEnum } from '@jetstreamgg/hooks';
import { formatBigInt, useFormatDates } from '@jetstreamgg/utils';
import { absBigInt } from '@/lib/absBigInt';
// import { ArrowUp } from '../icons/ArrowUp';
import { ArrowDown } from '../icons/ArrowDown';
import { HistoryTable } from './HistoryTable';

export function UpgradeHistory() {
  const { data: upgradeHistory, isLoading: upgradeHistoryLoading, error } = useUpgradeHistory();

  const memoizedDates = useMemo(() => upgradeHistory?.map(u => u.blockTimestamp), [upgradeHistory]);
  const formattedDates = useFormatDates(memoizedDates, 'en-US', 'MMMM d, yyyy, h:mm a');

  // map upgrade history to rows
  const history = upgradeHistory?.map((u, index) => {
    const isUpgrade = u.type === TransactionTypeEnum.DAI_TO_USDS || u.type === TransactionTypeEnum.MKR_TO_SKY;
    const amount = 'wad' in u ? u.wad : u.mkrAmt;
    const symbol = u.type.includes('DAI') ? 'DAI' : 'MKR';
    const targetSymbol = u.type.includes('DAI') ? 'USDS' : 'SKY';

    return {
      id: u.transactionHash,
      type: isUpgrade ? 'Upgrade' : 'Revert',
      highlightText: isUpgrade,
      textLeft: `${formatBigInt(absBigInt(amount), { compact: true })} ${symbol}`,
      textRight: `${formatBigInt(absBigInt('skyAmt' in u ? u.skyAmt : amount), {
        compact: true
      })} ${targetSymbol}`,
      iconLeft: isUpgrade ? (
        <ArrowDown width={10} height={14} className="mr-1 fill-white" />
      ) : (
        <ArrowDown width={10} height={14} className="mr-1 fill-white" />
      ),
      formattedDate: formattedDates.length > index ? formattedDates[index] : '',
      rawDate: u.blockTimestamp,
      transactionHash: u.transactionHash
    };
  });

  return (
    <HistoryTable
      dataTestId="upgrade-history"
      history={history}
      error={error}
      isLoading={upgradeHistoryLoading}
      transactionHeader={'Amount'}
      typeColumn
    />
  );
}
