import { Intent } from '@/lib/enums';
import { ModuleCard } from '../ModuleCard';
import { t } from '@lingui/core/macro';
import { HStack } from '@/modules/layout/components/HStack';
import { PairTokenIcons, PopoverRateInfo } from '@jetstreamgg/sky-widgets';
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
      title={t`Access the stUSDS Rate`}
      className="[background:linear-gradient(90deg,rgba(26,24,85,0.40)_5.85%,rgba(26,24,85,0.00)_92.78%),linear-gradient(to_bottom,#EB5EDF,#FFCD6B)]"
      notAvailable={isL2}
      logoName="expert"
      subHeading={
        <div className="flex flex-wrap gap-2 lg:gap-4">
          <HStack gap={2}>
            <PairTokenIcons leftToken="USDS" rightToken="STUSDS" chainId={mainnet.id} />
            <Text className="text-textSecondary">With: USDS Get: stUSDS</Text>
          </HStack>
        </div>
      }
      emphasisText={
        <Text className="text-2xl lg:text-[32px]">
          Rate 6.77%
          <PopoverRateInfo type="stusds" iconClassName="mt-auto -translate-y-1/4 ml-2" />
        </Text>
      }
    />
  );
}
