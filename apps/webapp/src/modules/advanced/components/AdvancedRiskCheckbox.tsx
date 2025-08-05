import { Trans } from '@lingui/react/macro';
import { AlertTriangle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/modules/layout/components/Typography';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';

export function AdvancedRiskCheckbox() {
  const { advancedRiskAcknowledged, setAdvancedRiskAcknowledged } = useConfigContext();

  return (
    <div className="mb-4">
      <div className="mb-2 flex gap-2">
        <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-red-500" />
        <Text variant="medium" className="text-text" dataTestId="advanced-risk-disclaimer">
          <Trans>
            These advanced modules involve higher risk and are intended for experienced users. Please ensure
            you understand the risks before proceeding.
          </Trans>
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="risk-acknowledgment"
          data-testid="advanced-risk-checkbox"
          checked={advancedRiskAcknowledged}
          onCheckedChange={checked => setAdvancedRiskAcknowledged(!!checked)}
        />
        <label htmlFor="risk-acknowledgment" className="cursor-pointer">
          <Text variant="medium" className="text-text">
            <Trans>I acknowledge and accept the higher risk</Trans>
          </Text>
        </label>
      </div>
    </div>
  );
}
