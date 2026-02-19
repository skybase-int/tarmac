import { MORPHO_VAULTS, useMorphoVaultMultipleChartInfo } from '@jetstreamgg/sky-hooks';
import { Chart, TimeFrame } from '@/modules/ui/components/Chart';
import { useState, useMemo } from 'react';
import { ErrorBoundary } from '@/modules/layout/components/ErrorBoundary';
import { Trans } from '@lingui/react/macro';
import { useParseTvlChartData } from '@/modules/ui/hooks/useParseTvlChartData';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mainnet } from 'viem/chains';
import { math } from '@jetstreamgg/sky-utils';

type TvlChartInfoParsed = {
  blockTimestamp: number;
  amount: bigint;
};

const normalizeToDay = (data: TvlChartInfoParsed[]): TvlChartInfoParsed[] =>
  data.map(d => ({
    ...d,
    blockTimestamp: Math.floor(d.blockTimestamp / 86400) * 86400
  }));

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

function useVaultsChartInfo() {
  const {
    data: morphoChartData,
    isLoading,
    error
  } = useMorphoVaultMultipleChartInfo({
    vaultAddresses: MORPHO_VAULTS.map(v => v.vaultAddress[mainnet.id])
  });

  const data = useMemo(() => {
    const normalizedMorpho = (morphoChartData || []).flatMap((vaultData, index) => {
      const vault = MORPHO_VAULTS[index];
      const decimals = math.resolveDecimals(vault.assetToken.decimals, mainnet.id);
      return normalizeToDay(vaultData).map(d => ({
        ...d,
        amount: math.scaleToBaseDecimals(d.amount, decimals)
      }));
    });

    return calculateCumulativeTotalSupply(normalizedMorpho);
  }, [morphoChartData]);

  return { data, isLoading, error };
}

export function VaultsChart() {
  const [activeChart, setActiveChart] = useState('tvl');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('w');

  const { data: vaultsChartData, isLoading, error } = useVaultsChartInfo();

  const chartData = useParseTvlChartData(timeFrame, vaultsChartData);

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
          symbol={'USDS'}
          onTimeFrameChange={tf => {
            setTimeFrame(tf);
          }}
        />
      </ErrorBoundary>
    </div>
  );
}
