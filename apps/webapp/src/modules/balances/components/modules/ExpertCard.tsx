import { Intent } from '@/lib/enums';
import { ModuleCard } from '../ModuleCard';
import { t } from '@lingui/core/macro';
import { HStack } from '@/modules/layout/components/HStack';
import { PairTokenIcons } from '@jetstreamgg/sky-widgets';
import { Text } from '@/modules/layout/components/Typography';
import { isL2ChainId } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';
import { mainnet } from 'viem/chains';

export function ExpertCard() {
  const chainId = useChainId();
  const isL2 = isL2ChainId(chainId);

  return (
    <ModuleCard
      intent={Intent.EXPERT_INTENT}
      module={t`Expert`}
      title={t`Advanced strategies for experienced users`}
      className="from-[#1a1a1a] to-[#4a4a4a]"
      notAvailable={isL2}
      logoName="expert"
      subHeading={
        <div className="flex flex-wrap gap-2 lg:gap-4">
          <HStack gap={2}>
            <PairTokenIcons leftToken="USDS" rightToken="STUSDS" chainId={mainnet.id} />
            <Text className="text-textSecondary">Stake USDS for stUSDS</Text>
          </HStack>
        </div>
      }
      emphasisText={
        <Text className="text-2xl lg:text-[32px]">
          <span className="text-lg">Higher-risk options with</span> potentially higher rewards
        </Text>
      }
    />
  );
}
