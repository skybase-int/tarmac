import { useMemo } from 'react';
import { useSavingsHistory } from '@jetstreamgg/hooks';
import { formatBigInt, useFormatDates } from '@jetstreamgg/utils';
import { absBigInt } from '@/lib/absBigInt';
import { ArrowDown } from '../icons/ArrowDown';
import { SavingsSupply } from '../icons/SavingsSupply';
import { HistoryTable } from './HistoryTable';

export function SavingsHistory() {
  const { data: savingsHistory, isLoading: savingsHistoryLoading, error } = useSavingsHistory();

  const memoizedDates = useMemo(() => savingsHistory?.map(s => s.blockTimestamp), [savingsHistory]);
  const formattedDates = useFormatDates(memoizedDates, 'en-US', 'MMMM d, yyyy, h:mm a');

  // map savings history to rows
  const history = savingsHistory?.map((s, index) => ({
    id: s.transactionHash,
    type: s.assets > 0 ? 'Supply' : 'Withdrawal',
    highlightText: s.assets > 0,
    textLeft: `${formatBigInt(absBigInt(s.assets), { compact: true })} USDS`,
    iconLeft:
      s.assets > 0 ? (
        <SavingsSupply width={14} height={13} className="mr-1" />
      ) : (
        <ArrowDown width={10} height={14} className="mr-1 fill-white" />
      ),
    formattedDate: formattedDates.length > index ? formattedDates[index] : '',
    rawDate: s.blockTimestamp,
    transactionHash: s.transactionHash
  }));

  return (
    <HistoryTable
      dataTestId="savings-history"
      history={history}
      error={error}
      isLoading={savingsHistoryLoading}
      transactionHeader={'Amount'}
      typeColumn
    />
  );
}
