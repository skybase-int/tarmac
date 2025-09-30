import { useRef } from 'react';
import { t } from '@lingui/core/macro';
import { Carousel, CarouselContent, CarouselItem, CarouselControls } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { TradeHistory } from './TradeHistory';
import { TradeFaq } from './TradeFaq';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { DetailSection } from '@/modules/ui/components/DetailSection';
import { AboutUsds } from '@/modules/ui/components/AboutUsds';
import { ActionsShowcase } from '@/modules/ui/components/ActionsShowcase';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { IntentMapping } from '@/lib/constants';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useUserSuggestedActions } from '@/modules/ui/hooks/useUserSuggestedActions';
import { filterActionsByIntent } from '@/lib/utils';
import { AboutSky } from '@/modules/ui/components/AboutSky';
import { AboutSpk } from '@/modules/ui/components/AboutSpk';
import { AboutSUsds } from '@/modules/ui/components/AboutSUsds';
import { BP, useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';

export function TradeDetails(): React.ReactElement {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const { linkedActionConfig } = useConfigContext();
  const { data: actionData } = useUserSuggestedActions();
  const widget = IntentMapping.TRADE_INTENT;

  const { bpi } = useBreakpointIndex();
  const isMobileOrTablet = bpi < BP['2xl'];
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <DetailSectionWrapper>
      {isConnectedAndAcceptedTerms &&
        !linkedActionConfig?.showLinkedAction &&
        (filterActionsByIntent(actionData?.linkedActions || [], widget).length ?? 0) > 0 && (
          <DetailSection title={t`Combined actions`}>
            <DetailSectionRow>
              <ActionsShowcase widget={widget} />
            </DetailSectionRow>
          </DetailSection>
        )}
      {isConnectedAndAcceptedTerms && (
        <DetailSection title={t`Your Trade transaction history`}>
          <DetailSectionRow>
            <TradeHistory />
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`About Sky Ecosystem Tokens`}>
        <Carousel
          ref={carouselRef}
          opts={{ loop: true, watchDrag: isMobileOrTablet }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              rootNode: emblaRoot => carouselRef.current || emblaRoot
            }),
            Fade()
          ]}
          className="relative"
        >
          <CarouselContent>
            <CarouselItem>
              <div className="pb-6">
                <AboutUsds />
              </div>
            </CarouselItem>
            {import.meta.env.VITE_RESTRICTED_BUILD !== 'true' && (
              <CarouselItem>
                <div className="pb-6">
                  <AboutSUsds />
                </div>
              </CarouselItem>
            )}
            <CarouselItem>
              <div className="pb-6">
                <AboutSky />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="pb-6">
                <AboutSpk />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselControls className="absolute bottom-1 left-1/2 -translate-x-1/2" />
        </Carousel>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <TradeFaq />
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
