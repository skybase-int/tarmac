import { MkrUpgradedToSky } from './MkrUpgradedToSky';
import { MkrUpgradedPercentage } from './MkrUpgradedPercentage';
import { MkrDelayedUpgradePenalty } from './MkrDelayedUpgradePenalty';

export function UpgradeStats() {
  return (
    <div data-testid="upgrade-stats-details" className="flex w-full flex-wrap justify-between gap-3">
      <div className="min-w-[250px] flex-1">
        <MkrUpgradedToSky />
      </div>
      <div className="min-w-[250px] flex-1">
        <MkrUpgradedPercentage />
      </div>
      <div className="min-w-[250px] flex-1">
        <MkrDelayedUpgradePenalty />
      </div>
    </div>
  );
}
