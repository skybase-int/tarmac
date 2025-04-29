import { Heading, Text } from '@widgets/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';
import { useContext, useEffect, useMemo } from 'react';
import { SealModuleWidgetContext } from '../context/context';
import { TOKENS, useNextMigrationUrnIndex, useStakeUrnAddress, ZERO_ADDRESS } from '@jetstreamgg/hooks';
import { Checkbox } from '@widgets/components/ui/checkbox';
import { Card, CardContent } from '@widgets/components/ui/card';
import { MotionVStack } from '@widgets/shared/components/ui/layout/MotionVStack';
import { motion } from 'framer-motion';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { LineItem } from './LineItem';
import { TokenIcon } from '@widgets/shared/components/ui/token/TokenIcon';
import { t } from '@lingui/core/macro';
import { cn } from '@widgets/lib/utils';

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

  const isStakeUrnCreated =
    !!stakeUrnAddress && stakeUrnAddress !== ZERO_ADDRESS && !isStakeUrnAddressLoading;

  // We automatically complete this steps to proceed with migration flow
  // TODO: make sure to clear this if the user clicks back to enter manage flow
  useEffect(() => {
    setIsLockCompleted(true);
    setIsBorrowCompleted(true);
  }, []);

  useEffect(() => {
    setNewStakeUrn({ urnAddress: stakeUrnAddress, urnIndex: stakeUrnIndex }, () => {});
  }, [stakeUrnIndex]);

  const sealedPositionItems = useMemo(() => {
    return [
      {
        label: t`Sealing`,
        updated: false,
        value: '300 MKR',
        icon: <TokenIcon token={TOKENS.mkr} className="h-5 w-5" />
      },
      {
        label: t`Borrowing`,
        updated: false,
        value: '300 USDS',
        icon: <TokenIcon token={TOKENS.usds} className="h-5 w-5" />
      },
      {
        label: t`Seal reward`,
        updated: false,
        value: 'USDS',
        icon: <TokenIcon token={TOKENS.usds} className="h-5 w-5" />
      },
      {
        label: t`Delegate`,
        updated: false,
        value: '0xabc...123',
        icon: <TokenIcon token={TOKENS.usds} className="h-5 w-5" />
      }
    ];
  }, []);

  const stakingPositionItems = useMemo(() => {
    return [
      {
        label: t`Collateral to Migrate`,
        updated: false,
        value: ['300 MKR', '3000 SKY'],
        icon: <TokenIcon token={TOKENS.mkr} className="h-5 w-5" />
      },
      {
        label: t`Debt to Migrate`,
        updated: false,
        value: '300 USDS',
        icon: <TokenIcon token={TOKENS.usds} className="h-5 w-5" />
      },
      {
        label: t`Stake reward`,
        updated: false,
        value: t`Cannot be migrated`,
        icon: <TokenIcon token={TOKENS.usds} className="h-5 w-5" />
      },
      {
        label: t`Delegate`,
        updated: false,
        value: t`Cannot be migrated`,
        icon: <TokenIcon token={TOKENS.usds} className="h-5 w-5" />
      }
    ];
  }, []);

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
          <Text className="mt-4">
            <Trans>You&apos;ll need an open Staking Engine position —</Trans>
          </Text>
          <Text>
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
            <Text variant="medium">
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
