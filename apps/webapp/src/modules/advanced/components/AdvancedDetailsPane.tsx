import { DetailSection } from '@/modules/ui/components/DetailSection';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { t } from '@lingui/core/macro';
// import { useBreakpointIndex, BP } from '@/modules/ui/hooks/useBreakpointIndex';
// import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
// import { getSupportedChainIds } from '@/data/wagmi/config/config.default';
// import { useChainId } from 'wagmi';
import { Intent } from '@/lib/enums';
import { ConnectCard } from '@/modules/layout/components/ConnectCard';
import { Text } from '@/modules/layout/components/Typography';

export function AdvancedDetailsPane() {
  // const { bpi } = useBreakpointIndex();
  // const isDesktop = bpi > BP.lg;
  // const { isConnectedAndAcceptedTerms } = useConnectedContext();
  // const chainId = useChainId();
  // const supportedChainIds = getSupportedChainIds(chainId);

  return (
    <DetailSectionWrapper>
      <DetailSectionRow>
        <ConnectCard intent={Intent.ADVANCED_INTENT} className="mb-4" />
      </DetailSectionRow>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <Text className="text-text">TODO</Text>
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
