import { useStUsdsChartInfo, MORPHO_VAULTS, useMorphoVaultMultipleChartInfo } from '@jetstreamgg/sky-hooks';
import { Chart, TimeFrame } from '@/modules/ui/components/Chart';
import { useState, useMemo } from 'react';
import { ErrorBoundary } from '@/modules/layout/components/ErrorBoundary';
import { Trans } from '@lingui/react/macro';
import { useParseTvlChartData } from '@/modules/ui/hooks/useParseTvlChartData';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mainnet } from 'viem/chains';
import { resolveDecimals, scaleToBaseDecimals } from '@/modules/utils/math';

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

// Hook to fetch and aggregate expert modules chart data
function useExpertModulesChartInfo() {
  const { data: stUsdsChartData, isLoading: isLoadingStUsds, error: errorStUsds } = useStUsdsChartInfo();
  const {
    data: morphoChartData,
    isLoading: isLoadingMorpho,
    error: errorMorpho
  } = useMorphoVaultMultipleChartInfo({
    // Morpho API is mainnet-only
    vaultAddresses: MORPHO_VAULTS.map(v => v.vaultAddress[mainnet.id])
  });

  // Normalize timestamps to day boundaries, scale to common decimals, combine, and aggregate
  const data = useMemo(() => {
    // stUSDS data is already in 18 decimals
    const normalizedStUsds = normalizeToDay(stUsdsChartData || []);

    // Normalize each Morpho vault's data to 18 decimals before combining
    const normalizedMorpho = (morphoChartData || []).flatMap((vaultData, index) => {
      const vault = MORPHO_VAULTS[index];
      const decimals = resolveDecimals(vault.assetToken.decimals, mainnet.id);
      return normalizeToDay(vaultData).map(d => ({
        ...d,
        amount: scaleToBaseDecimals(d.amount, decimals)
      }));
    });

    return calculateCumulativeTotalSupply([...normalizedStUsds, ...normalizedMorpho]);
  }, [stUsdsChartData, morphoChartData]);

  return {
    data,
    isLoading: isLoadingStUsds || isLoadingMorpho,
    error: errorStUsds || errorMorpho
  };
}

export function ExpertChart() {
  const [activeChart, setActiveChart] = useState('tvl');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('w');

  // Fetch and aggregate chart data for all expert modules
  const { data: expertModulesChartData, isLoading, error } = useExpertModulesChartInfo();

  const chartData = useParseTvlChartData(timeFrame, expertModulesChartData);

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
          dataTestId="expert-chart"
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
