import { Heading, Text } from '@widgets/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';
import { useContext, useEffect, useMemo } from 'react';
import { SealModuleWidgetContext } from '../context/context';
import {
  TOKENS,
  useDelegateOwner,
  useNextMigrationUrnIndex,
  useRewardContractTokens,
  useStakeUrnAddress,
  useUrnSelectedRewardContract,
  useUrnSelectedVoteDelegate,
  useVault,
  ZERO_ADDRESS
} from '@jetstreamgg/hooks';
import { formatBigInt, math } from '@jetstreamgg/utils';
import { Checkbox } from '@widgets/components/ui/checkbox';
import { Card, CardContent } from '@widgets/components/ui/card';
import { MotionVStack } from '@widgets/shared/components/ui/layout/MotionVStack';
import { motion } from 'framer-motion';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { LineItem } from './LineItem';
import { TokenIcon } from '@widgets/shared/components/ui/token/TokenIcon';
import { t } from '@lingui/core/macro';
import { cn } from '@widgets/lib/utils';
import { JazziconComponent } from '@widgets/widgets/StakeModuleWidget/components/Jazzicon';

export const MigrateAbout = () => {
  const {
    setIsLockCompleted,
    setIsBorrowCompleted,
    setNewStakeUrn,
    acceptedMkrUpgrade,
    setAcceptedMkrUpgrade,
    activeUrn
  } = useContext(SealModuleWidgetContext);

  const { data: stakeUrnIndex } = useNextMigrationUrnIndex();
  const { data: stakeUrnAddress, isLoading: isStakeUrnAddressLoading } = useStakeUrnAddress(
    stakeUrnIndex || 0n
  );

  const { data: vaultData } = useVault(activeUrn?.urnAddress || ZERO_ADDRESS);
  const { data: existingRewardContract } = useUrnSelectedRewardContract({
    urn: activeUrn?.urnAddress || ZERO_ADDRESS
  });
  const { data: existingRewardContractTokens, isLoading: isRewardContractTokensLoading } =
    useRewardContractTokens(existingRewardContract);
  const { data: existingSelectedVoteDelegate } = useUrnSelectedVoteDelegate({
    urn: activeUrn?.urnAddress || ZERO_ADDRESS
  });
  const { data: existingDelegateOwner } = useDelegateOwner(existingSelectedVoteDelegate);

  const isStakeUrnCreated =
    !!stakeUrnAddress && stakeUrnAddress !== ZERO_ADDRESS && !isStakeUrnAddressLoading;

  // We automatically complete this steps to proceed with migration flow
  // TODO: make sure to clear this if the user clicks back to enter manage flow
  useEffect(() => {
    setIsLockCompleted(true);
    setIsBorrowCompleted(true);
    setAcceptedMkrUpgrade(false);
  }, []);

  useEffect(() => {
    setNewStakeUrn({ urnAddress: stakeUrnAddress, urnIndex: stakeUrnIndex }, () => {});
  }, [stakeUrnIndex]);

  const sealedPositionItems = useMemo(() => {
    return [
      {
        label: t`Sealing`,
        updated: false,
        value: `${formatBigInt(vaultData?.collateralAmount || 0n)} ${TOKENS.mkr.symbol}`,
        icon: <TokenIcon noChain token={TOKENS.mkr} className="h-5 w-5" />
      },
      {
        label: t`Borrowing`,
        updated: false,
        value: `${formatBigInt(vaultData?.debtValue || 0n)} ${TOKENS.usds.symbol}`,
        icon: <TokenIcon noChain token={TOKENS.usds} className="h-5 w-5" />
      },
      {
        label: t`Seal reward`,
        updated: false,
        value: existingRewardContractTokens?.rewardsToken.symbol,
        icon:
          existingRewardContractTokens && !isRewardContractTokensLoading ? (
            <TokenIcon noChain token={existingRewardContractTokens?.rewardsToken} className="h-5 w-5" />
          ) : undefined
      },
      {
        label: t`Delegate`,
        updated: false,
        value: existingDelegateOwner,
        icon: <JazziconComponent address={existingDelegateOwner} diameter={20} />
      }
    ];
  }, [
    vaultData?.debtValue,
    vaultData?.collateralAmount,
    existingRewardContractTokens?.rewardsToken.symbol,
    existingDelegateOwner
  ]);

  const stakingPositionItems = useMemo(() => {
    return [
      {
        label: t`Collateral to Migrate`,
        updated: false,
        value: vaultData?.collateralAmount
          ? [
              `${formatBigInt(vaultData?.collateralAmount || 0n)} ${TOKENS.mkr.symbol}`,
              `${formatBigInt(math.calculateConversion(TOKENS.mkr, vaultData?.collateralAmount || 0n))} ${TOKENS.sky.symbol}`
            ]
          : '0 MKR',
        icon: <TokenIcon noChain token={TOKENS.mkr} className="h-5 w-5" />
      },
      {
        label: t`Debt to Migrate`,
        updated: false,
        value: vaultData?.debtValue
          ? `${formatBigInt(vaultData?.debtValue || 0n)} ${TOKENS.usds.symbol}`
          : '0 USDS',
        icon: <TokenIcon noChain token={TOKENS.usds} className="h-5 w-5" />
      },
      {
        label: t`Stake reward`,
        updated: false,
        value: t`Cannot be migrated`,
        icon: <TokenIcon noChain token={TOKENS.usds} className="h-5 w-5" />
      },
      {
        label: t`Delegate`,
        updated: false,
        value: t`Cannot be migrated`,
        icon: <JazziconComponent address={ZERO_ADDRESS} diameter={20} />
      }
    ];
  }, [vaultData?.debtValue, vaultData?.collateralAmount]);

  return (
    <div className="mb-4">
      <Heading variant="medium">
        <Trans>Migration</Trans>
      </Heading>
      <img className="mt-4" src="/images/banner_migration.png" alt="banner_migration" />
      <Text className="mt-4">
        <Trans>Migrate your positions from the Seal Engine to the Staking Engine—no exit fee applies.</Trans>
      </Text>
      <Text className="mt-4">
        <Trans>Migrate from:</Trans>
      </Text>
      <InfoCard
        title={
          isStakeUrnCreated
            ? t`Your Seal Position ${activeUrn?.urnIndex !== undefined ? `${activeUrn?.urnIndex + 1n}` : ''}`
            : t`Seal Position ${activeUrn?.urnIndex !== undefined ? `${activeUrn?.urnIndex + 1n}` : ''}`
        }
        lineItemsFiltered={sealedPositionItems}
        className="mt-4"
      />
      <Text className="mt-4">
        <Trans>Migrate from:</Trans>
      </Text>
      {!isStakeUrnCreated && (
        <>
          <Text className="text-textSecondary mt-4">
            <Trans>You&apos;ll need an open Staking Engine position —</Trans>
          </Text>
          <Text className="text-textSecondary">
            <Trans>create one beforehand or during the migration flow.</Trans>
          </Text>
        </>
      )}
      <InfoCard
        lineItemsFiltered={stakingPositionItems}
        title={
          isStakeUrnCreated
            ? t`Staking position ${stakeUrnIndex !== undefined ? `${stakeUrnIndex + 1n}` : ''}`
            : t`Open new Staking position`
        }
        className={`mt-4 ${isStakeUrnCreated ? '' : 'border-2 border-dashed'}`}
      />
      <div className="mt-4">
        <div className="flex gap-2">
          <Checkbox
            className="mt-1"
            checked={acceptedMkrUpgrade}
            onCheckedChange={(checked: boolean) => {
              setAcceptedMkrUpgrade(checked === true);
            }}
          />
          <div
            className="cursor-pointer"
            onClick={() => {
              setAcceptedMkrUpgrade(!acceptedMkrUpgrade);
            }}
          >
            <Text variant="medium" className="text-textSecondary">
              <Trans>
                I acknowledge the fact that my MKR collateral will be upgraded to SKY and there is no way to
                retrieve my MKR.
              </Trans>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({
  lineItemsFiltered,
  title,
  className
}: {
  lineItemsFiltered: Record<string, any>[];
  title: string;
  className?: string;
}) => {
  return (
    <Card className={cn(className)}>
      <CardContent>
        <MotionVStack gap={2} variants={positionAnimations} className="space-y-3">
          <motion.div key="overview" variants={positionAnimations}>
            <Text variant="medium" className="mb-1 font-medium">
              {title}
            </Text>
            {lineItemsFiltered
              .filter(item => !!item.value)
              .map(i => {
                const { label, value, icon, className, tooltipText } = i;
                return (
                  <LineItem
                    key={label}
                    label={label}
                    value={value}
                    tooltipText={tooltipText}
                    icon={icon}
                    className={className}
                  />
                );
              })}
          </motion.div>
        </MotionVStack>
      </CardContent>
    </Card>
  );
};
