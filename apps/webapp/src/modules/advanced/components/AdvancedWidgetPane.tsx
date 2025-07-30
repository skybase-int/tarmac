import { CardAnimationWrapper, WidgetContainer } from '@jetstreamgg/sky-widgets';
import { SharedProps } from '@/modules/app/types/Widgets';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { Intent } from '@/lib/enums';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/react/macro';
import { AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { StUSDSWidgetPane } from '@/modules/stusds/components/StUSDSWidgetPane';

interface WidgetCard {
  id: Intent;
  name: string;
}

const WIDGET_CARDS: WidgetCard[] = [
  { id: Intent.TRADE_INTENT, name: 'Trade' },
  { id: Intent.SAVINGS_INTENT, name: 'Savings' },
  { id: Intent.REWARDS_INTENT, name: 'Rewards' },
  { id: Intent.STUSDS_INTENT, name: 'stUSDS' }
];

export function AdvancedWidgetPane(sharedProps: SharedProps) {
  const { selectedAdvancedOption, setSelectedAdvancedOption } = useConfigContext();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <CardAnimationWrapper key={selectedAdvancedOption} className="h-full">
        {selectedAdvancedOption === Intent.STUSDS_INTENT ? (
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
              {WIDGET_CARDS.map(widget => (
                <Card
                  key={widget.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedAdvancedOption(widget.id)}
                >
                  <CardHeader>
                    <CardTitle>{widget.name}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </CardAnimationWrapper>
          </WidgetContainer>
        )}
      </CardAnimationWrapper>
    </AnimatePresence>
  );
}
