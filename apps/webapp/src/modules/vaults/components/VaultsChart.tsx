import { MORPHO_VAULTS, useMorphoVaultMultipleChartInfo, useMorphoVaultsCombinedTvl } from '@jetstreamgg/sky-hooks';
import { Chart, TimeFrame } from '@/modules/ui/components/Chart';
import { useState, useMemo } from 'react';
import { ErrorBoundary } from '@/modules/layout/components/ErrorBoundary';
import { Trans } from '@lingui/react/macro';
import { useParseTvlChartData } from '@/modules/ui/hooks/useParseTvlChartData';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mainnet } from 'viem/chains';
import { parseUnits } from 'viem';

type TvlChartInfoParsed = {
  blockTimestamp: number;
  amount: bigint;
};

const deduplicateByTimestamp = (data: TvlChartInfoParsed[]): TvlChartInfoParsed[] => {
  const map = new Map<number, TvlChartInfoParsed>();
  data.forEach(d => map.set(d.blockTimestamp, d));
  return [...map.values()];
};

const normalizeToDay = (data: TvlChartInfoParsed[]): TvlChartInfoParsed[] =>
  deduplicateByTimestamp(
    data.map(d => ({
      ...d,
      blockTimestamp: Math.floor(d.blockTimestamp / 86400) * 86400
    }))
  );

const normalizeToHour = (data: TvlChartInfoParsed[]): TvlChartInfoParsed[] =>
  deduplicateByTimestamp(
    data.map(d => ({
      ...d,
      blockTimestamp: Math.floor(d.blockTimestamp / 3600) * 3600
    }))
  );

function calculateCumulativeTotalSupply(chartData: TvlChartInfoParsed[]) {
  if (!chartData || chartData.length === 0) return [];

  const mergedData = new Map<number, TvlChartInfoParsed>();

  chartData.forEach(entry => {
    const foundData = mergedData.get(entry.blockTimestamp);
    if (foundData) {
      mergedData.set(entry.blockTimestamp, {
        ...foundData,
        amount: foundData.amount + entry.amount
      });
    } else {
      mergedData.set(entry.blockTimestamp, entry);
    }
  });

  return [...mergedData.values()].sort((a, b) => a.blockTimestamp - b.blockTimestamp);
}

function useVaultsChartInfo(useHourlyInterval?: boolean, hourlyWindow?: 'w' | 'm') {
  const vaultAddresses = MORPHO_VAULTS.map(vault => vault.vaultAddress[mainnet.id]) as `0x${string}`[];

  const {
    data: morphoChartData,
    isLoading,
    error
  } = useMorphoVaultMultipleChartInfo({ vaultAddresses, useHourlyInterval, hourlyWindow });

  const data = useMemo(() => {
    const normalize = useHourlyInterval ? normalizeToHour : normalizeToDay;
    const normalizedMorpho = (morphoChartData || []).flatMap(vaultData => {
      if (!vaultData) return [];
      const usdData = vaultData.map(d => ({
        blockTimestamp: d.blockTimestamp,
        amount: parseUnits(d.amountUsd.toString(), 18)
      }));
      return normalize(usdData);
    });

    return calculateCumulativeTotalSupply(normalizedMorpho);
  }, [morphoChartData, useHourlyInterval]);

  return { data, isLoading, error };
}

export function VaultsChart() {
  const [activeChart, setActiveChart] = useState('tvl');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('w');

  const useHourlyInterval = timeFrame === 'w' || timeFrame === 'm';
  const hourlyWindow = timeFrame === 'w' || timeFrame === 'm' ? timeFrame : undefined;
  const intervalOverride = useHourlyInterval ? 3600 : undefined;

  const { data: vaultsChartData, isLoading, error } = useVaultsChartInfo(useHourlyInterval, hourlyWindow);
  const { totalAssetsUsd, isLoading: isCombinedTvlLoading, error: combinedTvlError } = useMorphoVaultsCombinedTvl();

  const parsedChartData = useParseTvlChartData(timeFrame, vaultsChartData, undefined, intervalOverride);

  // Append live data point to chart data
  const chartData = useMemo(() => {
    if (isCombinedTvlLoading || combinedTvlError || parsedChartData.length === 0) return parsedChartData;
    return [
      ...parsedChartData,
      {
        value: totalAssetsUsd,
        date: new Date(),
        tooltipLabel: 'Current value'
      }
    ];
  }, [parsedChartData, totalAssetsUsd, isCombinedTvlLoading, combinedTvlError]);

  const tooltipLabel = useHourlyInterval ? 'Hourly average' : 'Daily average';

  return (
    <div>
      <ErrorBoundary variant="small">
        <div className="mb-4 flex">
          <Tabs value={activeChart} onValueChange={value => setActiveChart(value)}>
            <TabsList className="flex">
              <TabsTrigger position="whole" value="tvl">
                <Trans>TVL</Trans>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Chart
          dataTestId="vaults-chart"
          data={chartData}
          isLoading={isLoading}
          error={error}
          prefix="$"
          tooltipLabel={tooltipLabel}
          onTimeFrameChange={tf => {
            setTimeFrame(tf);
          }}
        />
      </ErrorBoundary>
    </div>
  );
}
