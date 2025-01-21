import { useMemo } from 'react';
import { useTradeHistory } from '@jetstreamgg/hooks';
import { formatTradeAmount, useFormatDates } from '@jetstreamgg/utils';
import { HistoryTable } from './HistoryTable';
import { getTokenDecimals } from '@jetstreamgg/hooks';
import { useChainId } from 'wagmi';
import { TokenForChain } from '@jetstreamgg/hooks';

export function TradeHistory() {
  const { data: tradeHistory, isLoading: tradeHistoryLoading, error } = useTradeHistory();
  const chainId = useChainId();
  const memoizedDates = useMemo(() => {
    return tradeHistory ? tradeHistory.map(s => s.blockTimestamp) : [];
  }, [tradeHistory]);

  const formattedDates = useFormatDates(memoizedDates || [], 'en-US', 'MMMM d, yyyy, h:mm a');

  // map tradehistory to rows
  const history = tradeHistory?.map((s, index) => ({
    id: s.transactionHash,
    textLeft: formatTradeAmount(s.fromAmount, getTokenDecimals(s.fromToken as TokenForChain, chainId)),
    tokenLeft: s.fromToken.symbol,
    textRight: formatTradeAmount(s.toAmount, getTokenDecimals(s.toToken as TokenForChain, chainId)),
    tokenRight: s.toToken.symbol,
    formattedDate: formattedDates.length > index ? formattedDates[index] : '',
    rawDate: s.blockTimestamp,
    transactionHash: s.transactionHash
    //cowOrderStatus: s.cowOrderStatus
  }));

  return (
    <HistoryTable
      history={history}
      error={error}
      isLoading={tradeHistoryLoading}
      transactionHeader={'Trades'}
      cowExplorerLink
    />
  );
}
