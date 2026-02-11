import { CardAnimationWrapper, WidgetContainer } from '@jetstreamgg/sky-widgets';
import { SharedProps } from '@/modules/app/types/Widgets';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { ConvertIntent } from '@/lib/enums';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/react/macro';
import { AnimatePresence } from 'framer-motion';
import { UpgradeWidgetPane } from '@/modules/upgrade/components/UpgradeWidgetPane';
import { TradeWidgetPane } from '@/modules/trade/components/TradeWidgetPane';
import { ConvertIntentMapping, QueryParams } from '@/lib/constants';
import { useSearchParams } from 'react-router-dom';
import { Card, CardHeader } from '@/components/ui/card';
import { HStack } from '@/modules/layout/components/HStack';
import { Upgrade, Trade } from '@/modules/icons';
import { useChainId } from 'wagmi';
import { isL2ChainId } from '@jetstreamgg/sky-utils';

export function ConvertWidgetPane(sharedProps: SharedProps) {
  const { selectedConvertOption, setSelectedConvertOption } = useConfigContext();
  const [, setSearchParams] = useSearchParams();
  const chainId = useChainId();
  const isL2 = isL2ChainId(chainId);

  const handleSelectOption = (convertIntent: ConvertIntent) => {
    setSearchParams(params => {
      params.set(QueryParams.ConvertModule, ConvertIntentMapping[convertIntent]);
      return params;
    });
    setSelectedConvertOption(convertIntent);
  };

  const renderSelectedWidget = () => {
    switch (selectedConvertOption) {
      case ConvertIntent.UPGRADE_INTENT:
        return <UpgradeWidgetPane {...sharedProps} />;
      case ConvertIntent.TRADE_INTENT:
        return <TradeWidgetPane {...sharedProps} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <CardAnimationWrapper key={selectedConvertOption} className="h-full">
        {selectedConvertOption ? (
          renderSelectedWidget()
        ) : (
          <WidgetContainer
            header={
              <Heading variant="x-large">
                <Trans>Convert</Trans>
              </Heading>
            }
            subHeader={
              <Text className="text-textSecondary" variant="small">
                <Trans>Upgrade legacy tokens or trade for Sky ecosystem tokens</Trans>
              </Text>
            }
            rightHeader={sharedProps.rightHeaderComponent}
          >
            <CardAnimationWrapper className="flex flex-col gap-4">
              {!isL2 && (
                <Card
                  className="from-card to-card hover:from-primary-start/100 hover:to-primary-end/100 cursor-pointer bg-radial-(--gradient-position) transition-[background-color,background-image] lg:p-5"
                  onClick={() => handleSelectOption(ConvertIntent.UPGRADE_INTENT)}
                >
                  <CardHeader className="flex flex-row items-center space-y-0">
                    <HStack className="items-center gap-3">
                      <Upgrade color="inherit" />
                      <div>
                        <Text>
                          <Trans>Upgrade</Trans>
                        </Text>
                        <Text className="text-textSecondary" variant="small">
                          <Trans>Upgrade your DAI to USDS and MKR to SKY</Trans>
                        </Text>
                      </div>
                    </HStack>
                  </CardHeader>
                </Card>
              )}

              <Card
                className="from-card to-card hover:from-primary-start/100 hover:to-primary-end/100 cursor-pointer bg-radial-(--gradient-position) transition-[background-color,background-image] lg:p-5"
                onClick={() => handleSelectOption(ConvertIntent.TRADE_INTENT)}
              >
                <CardHeader className="flex flex-row items-center space-y-0">
                  <HStack className="items-center gap-3">
                    <Trade color="inherit" />
                    <div>
                      <Text>
                        <Trans>Trade</Trans>
                      </Text>
                      <Text className="text-textSecondary" variant="small">
                        <Trans>Trade popular tokens for Sky Ecosystem tokens</Trans>
                      </Text>
                    </div>
                  </HStack>
                </CardHeader>
              </Card>
            </CardAnimationWrapper>
          </WidgetContainer>
        )}
      </CardAnimationWrapper>
    </AnimatePresence>
  );
}
