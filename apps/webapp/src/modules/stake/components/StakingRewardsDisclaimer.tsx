import { ModuleDisclaimer } from '@/modules/ui/components/ModuleDisclaimer';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';

export function StakingRewardsDisclaimer() {
  const { stakingRewardsDisclaimerDismissed, setStakingRewardsDisclaimerDismissed } = useConfigContext();

  return (
    <ModuleDisclaimer
      dataTestId="staking-rewards-disclaimer"
      dismissButtonTestId="staking-rewards-dismiss"
      type="info"
      text="USDS rewards have been disabled and SKY has been added as a Staking Reward option."
      isDismissed={stakingRewardsDisclaimerDismissed}
      onDismiss={() => setStakingRewardsDisclaimerDismissed(true)}
    />
  );
}
