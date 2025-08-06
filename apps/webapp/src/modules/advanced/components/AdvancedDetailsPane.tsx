import { DetailSection } from '@/modules/ui/components/DetailSection';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { t } from '@lingui/core/macro';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { Text } from '@/modules/layout/components/Typography';
import { AdvancedOverview } from './AdvancedOverview';
import { AdvancedChart } from './AdvancedChart';
import { AdvancedAbout } from './AdvancedAbout';

export function AdvancedDetailsPane() {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();

  return (
    <DetailSectionWrapper>
      <DetailSection title={t`Expert modules overview`}>
        <DetailSectionRow>
          <AdvancedOverview />
        </DetailSectionRow>
      </DetailSection>
      {isConnectedAndAcceptedTerms && (
        <DetailSection title={t`Combined Actions`}>
          <DetailSectionRow>
            <Text className="text-text">TODO</Text>
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`Expert activity`}>
        <DetailSectionRow>
          <AdvancedChart />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`About Native Sky Protocol Tokens`}>
        <DetailSectionRow>
          <AdvancedAbout />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <Text className="text-text">TODO</Text>
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
