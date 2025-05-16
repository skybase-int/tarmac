import { positionAnimations } from '@widgets/shared/animation/presets';
import { ExternalLink } from '@widgets/shared/components/ExternalLink';
import { Text } from '@widgets/shared/components/ui/Typography';
import { HStack } from '@widgets/shared/components/ui/layout/HStack';
import { MotionHStack } from '@widgets/shared/components/ui/layout/MotionHStack';
import { MotionVStack } from '@widgets/shared/components/ui/layout/MotionVStack';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { DelegateInfo } from '@jetstreamgg/hooks';
import { formatBigInt } from '@jetstreamgg/utils';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Dispatch, SetStateAction } from 'react';
import { StatsOverviewCardCoreAccordion } from '@widgets/shared/components/ui/card/StatsOverviewCardCoreAccordion';
import { getAddress } from 'viem';
import { JazziconComponent } from './Jazzicon';
import { cn } from '@widgets/lib/utils';

const getDelegateName = (delegate: DelegateInfo) => {
  const delegates = [
    { address: '0x0F23dE72e1581857eacD6308aebb69cF3a49CC86', name: 'cloaky' },
    { address: '0x173a1c04b79ed9266721c1154daa29addc0b9558', name: 'blue' },
    { address: '0xfc48fbca739079aab08216c4d5e506b96593753d', name: 'bonapublica' }
  ];

  const del = delegates.find(d => d.address.toLowerCase() === delegate.id.toLowerCase());
  return del?.name || '';
};

export const DelegateCard = ({
  delegate,
  selectedDelegate,
  setSelectedDelegate,
  onExternalLinkClicked
}: {
  delegate: DelegateInfo;
  selectedDelegate?: `0x${string}` | undefined;
  setSelectedDelegate?: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  const handleSelectDelegate = () => {
    setSelectedDelegate?.(prev => (prev === delegate.id ? undefined : delegate.id));
  };

  return (
    <StatsOverviewCardCoreAccordion
      className={`transition-colors ${
        selectedDelegate && getAddress(selectedDelegate) === getAddress(delegate.id)
          ? 'bg-radial-(--gradient-position) from-primary-start/100 to-primary-end/100'
          : ''
      } ${setSelectedDelegate ? 'cursor-pointer' : 'cursor-default'}`}
      headerLeftContent={
        <VStack className="mr-2 grow">
          <MotionHStack className="w-full items-center" gap={2} variants={positionAnimations}>
            <JazziconComponent address={delegate.ownerAddress} />
            <div className={cn('flex flex-col items-start', delegate.metadata?.name ? '' : 'py-2.5')}>
              {/* {delegate.metadata?.name && <Text>{delegate.metadata.name}</Text>} */}
              <Text>{getDelegateName(delegate)}</Text>
              <Text className="text-textSecondary text-sm">
                {delegate.id.slice(0, 6) + '...' + delegate.id.slice(-4)}
              </Text>
            </div>
          </MotionHStack>
        </VStack>
      }
      content={
        <VStack className="items-end">
          <HStack className="mt-5 w-full justify-between" gap={2}>
            <MotionVStack className="justify-between" gap={2} variants={positionAnimations}>
              <Text className="text-textSecondary text-sm leading-4">{t`SKY delegated by you`}</Text>
              <Text>{formatBigInt(delegate.delegations?.[0]?.amount || 0n, { maxDecimals: 0 })}</Text>
            </MotionVStack>
            <MotionVStack className="justify-between" gap={2} variants={positionAnimations}>
              <Text className="text-textSecondary text-sm leading-4">{t`Total SKY delegated`}</Text>
              <Text>{formatBigInt(delegate.totalDelegated, { maxDecimals: 0 })}</Text>
            </MotionVStack>
          </HStack>
          <ExternalLink
            href={
              delegate.metadata?.externalProfileURL ||
              `https://vote.sky.money/address/${delegate.id.toLowerCase()}`
            }
            iconSize={13}
            className="text-textEmphasis text-sm leading-4"
            onExternalLinkClicked={onExternalLinkClicked}
          >
            <Trans>View delegate profile</Trans>
          </ExternalLink>
        </VStack>
      }
      onClick={handleSelectDelegate}
    />
  );
};
