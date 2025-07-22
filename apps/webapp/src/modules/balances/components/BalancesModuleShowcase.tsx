import { Carousel, CarouselContent, CarouselItem, CarouselControls } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { RewardsCard } from './modules/RewardsCard';
import { SavingsCard } from './modules/SavingsCard';
import { TradeCard } from './modules/TradeCard';
import { UpgradeCard } from './modules/UpgradeCard';
import { StakingRewardsCard } from './modules/StakingRewardsCard';
import { BP, useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';

export function BalancesModuleShowcase() {
  const isRestrictedBuild = import.meta.env.VITE_RESTRICTED_BUILD === 'true';
  const isRestrictedMiCa = import.meta.env.VITE_RESTRICTED_BUILD_MICA === 'true';

  const { bpi } = useBreakpointIndex();
  const isMobileOrTablet = bpi < BP['2xl'];

  return (
    <Carousel
      opts={{ loop: true, watchDrag: isMobileOrTablet }}
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }), Fade()]}
      className="relative"
    >
      <CarouselContent>
        {!isRestrictedBuild && (
          <CarouselItem>
            <RewardsCard />
          </CarouselItem>
        )}
        {!isRestrictedBuild && (
          <CarouselItem>
            <SavingsCard />
          </CarouselItem>
        )}
        <CarouselItem>
          <UpgradeCard />
        </CarouselItem>
        {!isRestrictedMiCa && (
          <CarouselItem>
            <TradeCard />
          </CarouselItem>
        )}
        <CarouselItem>
          <StakingRewardsCard />
        </CarouselItem>
      </CarouselContent>
      <CarouselControls className="absolute bottom-1 left-1/2 z-10 -translate-x-1/2 2xl:bottom-4" />
    </Carousel>
  );
}
