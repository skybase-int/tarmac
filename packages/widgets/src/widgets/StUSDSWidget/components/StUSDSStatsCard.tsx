import { useChainId } from 'wagmi';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { t } from '@lingui/core/macro';
import { HStack } from '@widgets/shared/components/ui/layout/HStack';
import { MotionVStack } from '@widgets/shared/components/ui/layout/MotionVStack';
import { Text } from '@widgets/shared/components/ui/Typography';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { StUSDSStatsCardCore } from './StUSDSStatsCardCore';
import { StatsAccordionCard } from '@widgets/shared/components/ui/card/StatsAccordionCard';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { AlertCircle } from 'lucide-react';

export type StUSDSStats = {
  totalAssets: bigint;
  userUsdsBalance: bigint;
  availableLiquidity?: bigint;
  maxWithdraw?: bigint;
  maxDeposit?: bigint;
};

type StUSDSStatsProps = {
  isLoading: boolean;
  address?: string;
  stats: StUSDSStats;
  utilizationRate?: number;
  isConnectedAndEnabled: boolean;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const StUSDSStatsCard = ({
  isLoading,
  address,
  stats,
  utilizationRate = 0,
  isConnectedAndEnabled = true,
  onExternalLinkClicked
}: StUSDSStatsProps) => {
  const chainId = useChainId();

  const isHighUtilization = utilizationRate > 90;
  const utilizationColor =
    utilizationRate > 90 ? 'text-error' : utilizationRate > 75 ? 'text-orange-400' : 'text-textSecondary';

  const accordionContent = (
    <div className="mt-5 space-y-4">
      <HStack className="justify-between" gap={2}>
        <MotionVStack
          className="justify-between"
          gap={2}
          variants={positionAnimations}
          data-testid="supplied-balance-container"
        >
          <Text className="text-textSecondary text-sm leading-4">{t`Supplied to stUSDS`}</Text>
          {isLoading ? (
            <Skeleton className="bg-textSecondary h-6 w-10" />
          ) : isConnectedAndEnabled && stats?.userUsdsBalance !== undefined ? (
            <Text dataTestId="supplied-balance">
              {formatBigInt(stats.userUsdsBalance, { compact: true })} USDS
            </Text>
          ) : (
            <Text>--</Text>
          )}
        </MotionVStack>
        <MotionVStack
          className="items-stretch justify-between text-right"
          gap={2}
          variants={positionAnimations}
          data-testid="tvl-container"
        >
          <Text className="text-textSecondary text-sm leading-4">{t`TVL`}</Text>
          {isLoading ? (
            <div className="flex justify-end">
              <Skeleton className="bg-textSecondary h-6 w-10" />
            </div>
          ) : (
            <Text dataTestId="stusds-tvl">
              {formatBigInt(stats.totalAssets, { unit: 18, compact: true })} USDS
            </Text>
          )}
        </MotionVStack>
      </HStack>
      <MotionVStack gap={2} variants={positionAnimations} data-testid="utilization-container">
        <HStack className="justify-between">
          <Text className="text-textSecondary text-sm leading-4">{t`Utilization`}</Text>
          {isLoading ? (
            <Skeleton className="bg-textSecondary h-6 w-10" />
          ) : (
            <HStack className="items-center" gap={1}>
              <Text className={utilizationColor} dataTestId="stusds-utilization">
                {utilizationRate.toFixed(1)}%
              </Text>
              {isHighUtilization && <AlertCircle className="text-error h-4 w-4" />}
            </HStack>
          )}
        </HStack>
        <div className="w-full">
          <div className="bg-secondary h-[5px] overflow-hidden rounded-full">
            <div
              className={`h-full transition-all duration-300 ${
                utilizationRate > 90
                  ? 'bg-error'
                  : utilizationRate > 75
                    ? 'bg-orange-400'
                    : 'bg-textSecondary'
              }`}
              style={{ width: `${Math.min(utilizationRate, 100)}%` }}
            />
          </div>
        </div>
      </MotionVStack>
      {isConnectedAndEnabled && stats.maxDeposit !== undefined && (
        <MotionVStack gap={2} variants={positionAnimations} data-testid="max-deposit-container">
          <HStack className="justify-between">
            <Text className="text-textSecondary text-sm leading-4">{t`Max deposit`}</Text>
            {isLoading ? (
              <Skeleton className="bg-textSecondary h-6 w-10" />
            ) : (
              <Text dataTestId="max-deposit" className={stats.maxDeposit === 0n ? 'text-warning' : ''}>
                {formatBigInt(stats.maxDeposit, { unit: 18, maxDecimals: 2, compact: true })} USDS
              </Text>
            )}
          </HStack>
          {stats.maxDeposit === 0n && (
            <Text className="text-warning text-xs">{t`Vault has reached its capacity limit`}</Text>
          )}
        </MotionVStack>
      )}
      {isConnectedAndEnabled && stats.maxWithdraw !== undefined && (
        <MotionVStack gap={2} variants={positionAnimations} data-testid="max-withdraw-container">
          <HStack className="justify-between">
            <Text className="text-textSecondary text-sm leading-4">{t`Max withdrawable`}</Text>
            {isLoading ? (
              <Skeleton className="bg-textSecondary h-6 w-10" />
            ) : (
              <Text dataTestId="max-withdrawable" className={stats.maxWithdraw === 0n ? 'text-warning' : ''}>
                {formatBigInt(stats.maxWithdraw, { unit: 18, maxDecimals: 2, compact: true })} USDS
              </Text>
            )}
          </HStack>
          {stats.maxWithdraw === 0n && (
            <Text className="text-warning text-xs">
              {t`Vault has insufficient liquidity for withdrawals`}
            </Text>
          )}
        </MotionVStack>
      )}
    </div>
  );

  return (
    <StUSDSStatsCardCore
      isLoading={isLoading}
      content={
        <StatsAccordionCard
          chainId={chainId}
          address={address}
          accordionTitle="stUSDS info"
          accordionContent={accordionContent}
          onExternalLinkClicked={onExternalLinkClicked}
        />
      }
      onExternalLinkClicked={onExternalLinkClicked}
    />
  );
};
