import { DetailSection } from '@/modules/ui/components/DetailSection';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { t } from '@lingui/core/macro';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { ExpertOverview } from './ExpertOverview';
import { ExpertChart } from './ExpertChart';
import { ExpertAbout } from './ExpertAbout';
import { ExpertFaq } from './ExpertFaq';
import { ActionsShowcase } from '@/modules/ui/components/ActionsShowcase';
import { IntentMapping, TX_AGENT_ENABLED } from '@/lib/constants';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useUserSuggestedActions } from '@/modules/ui/hooks/useUserSuggestedActions';
import { filterActionsByIntent } from '@/lib/utils';
import { SuggestedActions } from '@/modules/agent/components/SuggestedActions';

type ExpertDetailsPaneProps = {
  isVaultsOverview?: boolean;
};

export function ExpertDetailsPane({ isVaultsOverview }: ExpertDetailsPaneProps) {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const { linkedActionConfig } = useConfigContext();
  const { data: actionData } = useUserSuggestedActions();
  const widget = IntentMapping.EXPERT_INTENT;

  return (
    <DetailSectionWrapper>
      {TX_AGENT_ENABLED && isVaultsOverview && (
        <DetailSection title={t`Things you can do in Vaults`}>
          <DetailSectionRow>
            <SuggestedActions widget="morpho" />
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`Expert overview`}>
        <DetailSectionRow>
          <ExpertOverview />
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
          <ExpertChart />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`About Native Sky Protocol Tokens`}>
        <DetailSectionRow>
          <ExpertAbout />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <ExpertFaq />
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
