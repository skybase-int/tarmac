import { MorphoVaultHistory } from './MorphoVaultHistory';
import { MorphoVaultBalanceDetails } from './MorphoVaultBalanceDetails';
import { MorphoVaultInfoDetails } from './MorphoVaultInfoDetails';
import { MorphoVaultAllocationsDetails } from './MorphoVaultAllocationsDetails';
import { MorphoVaultFaq } from './MorphoVaultFaq';
import { t } from '@lingui/core/macro';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { DetailSection } from '@/modules/ui/components/DetailSection';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { MorphoVaultChart } from './MorphoVaultChart';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { Token } from '@jetstreamgg/sky-hooks';
import { AboutStUsds } from '@/modules/ui/components/AboutStUsds';
import { AboutUsds } from '@/modules/ui/components/AboutUsds';
import { ActionsShowcase } from '@/modules/ui/components/ActionsShowcase';
import { VaultsIntentMapping } from '@/lib/constants';
import { VaultsIntent } from '@/lib/enums';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useUserSuggestedActions } from '@/modules/ui/hooks/useUserSuggestedActions';
import { filterActionsByIntent } from '@/lib/utils';
import { TX_AGENT_ENABLED } from '@/lib/constants';
import { SuggestedActions } from '@/modules/agent/components/SuggestedActions';

type MorphoVaultDetailsProps = {
  /** The Morpho vault contract address */
  vaultAddress: `0x${string}`;
  /** The underlying asset token */
  assetToken: Token;
  /** Display name for the vault */
  vaultName: string;
};

export function MorphoVaultDetails({
  vaultAddress,
  assetToken,
  vaultName
}: MorphoVaultDetailsProps): React.ReactElement {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const { linkedActionConfig } = useConfigContext();
  const widget = VaultsIntentMapping[VaultsIntent.MORPHO_VAULT_INTENT];
  const { data: actionData } = useUserSuggestedActions(undefined, widget);

  return (
    <DetailSectionWrapper>
      {TX_AGENT_ENABLED && (
        <DetailSection title={t`Things you can do in Vaults`}>
          <DetailSectionRow>
            <SuggestedActions widget="morpho" />
          </DetailSectionRow>
        </DetailSection>
      )}
      {isConnectedAndAcceptedTerms && (
        <DetailSection title={t`Your balances`} dataTestId="morpho-vault-stats-section">
          <DetailSectionRow>
            <MorphoVaultBalanceDetails vaultAddress={vaultAddress} assetToken={assetToken} />
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`${vaultName} info`}>
        <DetailSectionRow>
          <MorphoVaultInfoDetails vaultAddress={vaultAddress} assetToken={assetToken} />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`Exposure`}>
        <DetailSectionRow>
          <MorphoVaultAllocationsDetails vaultAddress={vaultAddress} />
        </DetailSectionRow>
      </DetailSection>
      {isConnectedAndAcceptedTerms &&
        !linkedActionConfig?.showLinkedAction &&
        (filterActionsByIntent(actionData?.linkedActions || [], widget).length ?? 0) > 0 && (
          <DetailSection title={t`Combined actions`}>
            <DetailSectionRow>
              <ActionsShowcase widget={widget} currentExpertModule={widget} />
            </DetailSectionRow>
          </DetailSection>
        )}
      {isConnectedAndAcceptedTerms && (
        <DetailSection title={t`Your ${vaultName} vault transaction history`}>
          <DetailSectionRow>
            <MorphoVaultHistory vaultAddress={vaultAddress} />
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`Metrics`}>
        <DetailSectionRow>
          <MorphoVaultChart vaultAddress={vaultAddress} assetToken={assetToken} />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`About Native Sky Protocol Tokens`}>
        <DetailSectionRow>
          <div>
            <AboutStUsds module="stusds-module-banners" />
            <AboutUsds />
          </div>
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <MorphoVaultFaq vaultName={vaultName} />
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
