import { useMemo } from 'react';
import { Data, TimeFrame } from '@/modules/ui/components/Chart';
import { useParseSavingsChartData } from '@/modules/savings/hooks/useParseSavingsChartData';

type StUsdsChartInfoParsed = {
  blockTimestamp: number;
  amount: bigint;
  rate?: bigint;
};

export function useParseStUsdsChartData(
  timeFrame: TimeFrame,
  chartData: StUsdsChartInfoParsed[]
): { tvl: Data[]; rate: Data[] } {
  // For TVL, use amount field
  const tvlData = useParseSavingsChartData(timeFrame, chartData);

  // For rate, transform the data to use rate field as amount
  const rateChartData = useMemo(
    () =>
      chartData.map(item => ({
        blockTimestamp: item.blockTimestamp,
        amount: item.rate || 0n // Use rate as amount for the parser
      })),
    [chartData]
  );

  // Parse rate data
  const parsedRateData = useParseSavingsChartData(timeFrame, rateChartData);

  // Convert rate values to percentages
  const rateData = useMemo(
    () =>
      parsedRateData.map(point => ({
        ...point,
        value: point.value / 1e16 // Convert from 1e18 to percentage
      })),
    [parsedRateData]
  );

  return { tvl: tvlData, rate: rateData };
}
