import { useStakeHistoricData, useCollateralData, SupportedCollateralTypes } from '@jetstreamgg/hooks';
import { formatDecimalPercentage, formatNumber, math, formatBigInt } from '@jetstreamgg/utils';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { DetailSection } from '@/modules/ui/components/DetailSection';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { HStack } from '@/modules/layout/components/HStack';
import { StatsCard } from '@/modules/ui/components/StatsCard';
import { TokenIconWithBalance } from '@/modules/ui/components/TokenIconWithBalance';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { AboutStakeModule } from '@/modules/ui/components/AboutStakeModule';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { StakeHistory } from './StakeHistory';
import { StakeRewardsOverview } from './StakeRewardsOverview';
import { StakeFaq } from './StakeFaq';
import { StakeChart } from './StakeChart';
import { PopoverRateInfo } from '@/modules/ui/components/PopoverRateInfo';
import { useMemo } from 'react';
import { StakeToken } from '../constants';

export function StakeOverview() {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const { data, isLoading, error } = useStakeHistoricData();
  const mostRecentData = data?.sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  )[0];

  const skySealed = useMemo(() => {
    return formatNumber(
      mostRecentData?.totalMkr ? mostRecentData?.totalMkr * Number(math.MKR_TO_SKY_PRICE_RATIO) : 0
    );
  }, [mostRecentData?.totalMkr]);

  const borrowRate = mostRecentData?.borrowRate ?? 0;
  const tvl = mostRecentData?.tvl ?? 0;
  const numberOfUrns = mostRecentData?.numberOfUrns ?? 0;

  const {
    data: collateralData,
    isLoading: collateralDataLoading,
    error: collateralDataError
  } = useCollateralData(SupportedCollateralTypes.LSEV2_A);
  const debtCeiling = collateralData?.debtCeiling ?? 0n;
  const totalDebt = collateralData?.totalDaiDebt ?? 0n;

  return (
    <DetailSectionWrapper>
      <DetailSection title={t`Staking Engine Overview`}>
        <DetailSectionRow>
          <HStack gap={2} className="scrollbar-thin w-full overflow-auto">
            <StatsCard
              title={t`Total SKY staked`}
              isLoading={isLoading}
              error={error}
              content={
                <TokenIconWithBalance
                  className="mt-2"
                  token={{ name: StakeToken.SKY, symbol: StakeToken.SKY }}
                  balance={skySealed}
                />
              }
            />
            <StatsCard
              title={t`Total USDS borrowed`}
              isLoading={collateralDataLoading}
              error={collateralDataError}
              content={
                <TokenIconWithBalance
                  className="mt-2"
                  token={{ name: 'USDS', symbol: 'USDS' }}
                  balance={formatBigInt(totalDebt)}
                />
              }
            />
            <StatsCard
              title={t`Debt ceiling`}
              isLoading={collateralDataLoading}
              error={collateralDataError}
              content={
                <TokenIconWithBalance
                  className="mt-2"
                  token={{ name: 'USDS', symbol: 'USDS' }}
                  balance={formatBigInt(debtCeiling)}
                />
              }
            />
          </HStack>
        </DetailSectionRow>
        <DetailSectionRow>
          <HStack gap={2} className="scrollbar-thin w-full overflow-auto">
            <StatsCard
              title={
                <HStack gap={1} className="items-center">
                  <Heading tag="h3" className="text-textSecondary text-sm font-normal leading-tight">
                    <Trans>Borrow Rate</Trans>
                  </Heading>
                  <PopoverRateInfo type="sbr" />
                </HStack>
              }
              isLoading={isLoading}
              error={error}
              content={<Text className="mt-2">{formatDecimalPercentage(borrowRate)}</Text>}
            />
            <StatsCard
              title={t`TVL`}
              isLoading={isLoading}
              error={error}
              content={<Text className="mt-2">{`$${formatNumber(tvl)}`}</Text>}
            />
            <StatsCard
              title={t`Stake Positions`}
              isLoading={isLoading}
              error={error}
              content={<Text className="mt-2">{numberOfUrns}</Text>}
            />
          </HStack>
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`Rewards overview`}>
        <DetailSectionRow>
          <StakeRewardsOverview />
        </DetailSectionRow>
      </DetailSection>
      {isConnectedAndAcceptedTerms && (
        <DetailSection title={t`Your Staking Engine transaction history`}>
          <DetailSectionRow>
            <StakeHistory />
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`Metrics`}>
        <DetailSectionRow>
          <StakeChart />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`About Staking Rewards`}>
        <DetailSectionRow>
          <AboutStakeModule />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <StakeFaq />
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
