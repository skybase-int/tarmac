import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
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
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]}
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
    </Carousel>
  );
}
