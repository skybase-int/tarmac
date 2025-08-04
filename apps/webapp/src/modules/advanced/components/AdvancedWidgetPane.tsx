import { CardAnimationWrapper, WidgetContainer } from '@jetstreamgg/sky-widgets';
import { SharedProps } from '@/modules/app/types/Widgets';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { AdvancedIntent } from '@/lib/enums';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/react/macro';
import { AnimatePresence } from 'framer-motion';
import { StUSDSWidgetPane } from '@/modules/stusds/components/StUSDSWidgetPane';
import { ADVANCED_WIDGET_OPTIONS, AdvancedIntentMapping, QueryParams } from '@/lib/constants';
import { useSearchParams } from 'react-router-dom';
import { AdvancedRiskCheckbox } from './AdvancedRiskCheckbox';
import { StusdsStatsCard } from './StusdsStatsCard';

export function AdvancedWidgetPane(sharedProps: SharedProps) {
  const { selectedAdvancedOption, setSelectedAdvancedOption, advancedRiskAcknowledged } = useConfigContext();
  const [, setSearchParams] = useSearchParams();

  const handleSelectAdvancedOption = (advancedIntent: AdvancedIntent) => {
    setSearchParams(params => {
      params.set(QueryParams.AdvancedModule, AdvancedIntentMapping[advancedIntent]);
      return params;
    });
    setSelectedAdvancedOption(advancedIntent);
  };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <CardAnimationWrapper key={selectedAdvancedOption} className="h-full">
        {selectedAdvancedOption === AdvancedIntent.STUSDS_INTENT ? (
          <StUSDSWidgetPane {...sharedProps} />
        ) : (
          <WidgetContainer
            header={
              <div className="space-y-1">
                <Heading variant="x-large">
                  <Trans>Advanced</Trans>
                </Heading>
                <Text className="text-textSecondary" variant="small">
                  <Trans>Advanced, higher risk options</Trans>
                </Text>
              </div>
            }
            rightHeader={sharedProps.rightHeaderComponent}
          >
            <CardAnimationWrapper className="flex flex-col gap-4">
              <AdvancedRiskCheckbox />
              {ADVANCED_WIDGET_OPTIONS.map(widget => {
                switch (widget.id) {
                  case AdvancedIntent.STUSDS_INTENT:
                    return (
                      <StusdsStatsCard
                        key={widget.id}
                        onClick={() => handleSelectAdvancedOption(widget.id)}
                        disabled={!advancedRiskAcknowledged}
                      />
                    );
                  // Add more cases here for future contracts
                  default:
                    return null;
                }
              })}
            </CardAnimationWrapper>
          </WidgetContainer>
        )}
      </CardAnimationWrapper>
    </AnimatePresence>
  );
}
