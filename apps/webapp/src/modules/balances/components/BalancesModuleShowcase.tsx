import { Carousel, CarouselContent, CarouselItem, CarouselDots } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { RewardsCard } from './modules/RewardsCard';
import { SavingsCard } from './modules/SavingsCard';
import { TradeCard } from './modules/TradeCard';
import { UpgradeCard } from './modules/UpgradeCard';
import { StakingRewardsCard } from './modules/StakingRewardsCard';

export function BalancesModuleShowcase() {
  const isRestrictedBuild = import.meta.env.VITE_RESTRICTED_BUILD === 'true';
  const isRestrictedMiCa = import.meta.env.VITE_RESTRICTED_BUILD_MICA === 'true';

  return (
    <Carousel
      opts={{ loop: true }}
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
      <CarouselDots className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2" />
    </Carousel>
  );
}
