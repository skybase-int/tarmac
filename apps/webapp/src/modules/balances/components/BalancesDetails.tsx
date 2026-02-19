import { DetailSection } from '@/modules/ui/components/DetailSection';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { t } from '@lingui/core/macro';
import { BalancesModuleShowcase } from './BalancesModuleShowcase';
import { BalancesChart } from './BalancesChart';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { BalancesFaq } from './BalancesFaq';
import { Intent } from '@/lib/enums';
import { ConnectCard } from '@/modules/layout/components/ConnectCard';

export function BalancesDetails() {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();

  return (
    <DetailSectionWrapper>
      <DetailSectionRow>
        <BalancesModuleShowcase />
      </DetailSectionRow>
      {!isConnectedAndAcceptedTerms && (
        <DetailSectionRow>
          <ConnectCard intent={Intent.BALANCES_INTENT} className="mb-4" />
        </DetailSectionRow>
      )}
      <DetailSection title={t`Sky Protocol activity`}>
        <DetailSectionRow>
          <BalancesChart />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <BalancesFaq />
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
