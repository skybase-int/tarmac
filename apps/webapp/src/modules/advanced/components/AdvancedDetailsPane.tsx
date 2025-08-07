import { DetailSection } from '@/modules/ui/components/DetailSection';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { t } from '@lingui/core/macro';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { Text } from '@/modules/layout/components/Typography';
import { AdvancedOverview } from './AdvancedOverview';
import { AdvancedChart } from './AdvancedChart';
import { AdvancedAbout } from './AdvancedAbout';
import { ActionsShowcase } from '@/modules/ui/components/ActionsShowcase';
import { IntentMapping } from '@/lib/constants';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useUserSuggestedActions } from '@/modules/ui/hooks/useUserSuggestedActions';
import { filterActionsByIntent } from '@/lib/utils';

export function AdvancedDetailsPane() {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const { linkedActionConfig } = useConfigContext();
  const { data: actionData } = useUserSuggestedActions();
  const widget = IntentMapping.ADVANCED_INTENT;

  return (
    <DetailSectionWrapper>
      <DetailSection title={t`Expert modules overview`}>
        <DetailSectionRow>
          <AdvancedOverview />
        </DetailSectionRow>
      </DetailSection>
      {isConnectedAndAcceptedTerms &&
        !linkedActionConfig?.showLinkedAction &&
        (filterActionsByIntent(actionData?.linkedActions || [], widget).length ?? 0) > 0 && (
          <DetailSection title={t`Combined actions`}>
            <DetailSectionRow>
              <ActionsShowcase widget={widget} />
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
