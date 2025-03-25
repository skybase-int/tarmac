import { StatsCard } from '@widgets/shared/components/ui/card/StatsCard';
import { TokenIconWithBalance } from '@widgets/shared/components/ui/token/TokenIconWithBalance';
import { useUpgradeTotals } from '@jetstreamgg/hooks';
import { formatBigInt } from '@jetstreamgg/utils';
import { t } from '@lingui/core/macro';
import { useRef } from 'react';

export const UpgradeStats = () => {
  // TODO handle loading and error states
  const { data } = useUpgradeTotals();
  const ref = useRef<HTMLDivElement>(null);
  // const isCompact = (ref.current?.offsetWidth || 0) <= 350;
  const isCompact = true;

  return (
    <div ref={ref} className="my-4 flex justify-between gap-3">
      <StatsCard
        title={t`Total DAI migrated`}
        content={
          <TokenIconWithBalance
            className="mt-1"
            token={{ symbol: 'DAI', name: 'dai' }}
            balance={
              data?.totalDaiUpgraded ? formatBigInt(data?.totalDaiUpgraded, { compact: isCompact }) : '0'
            }
            compact={isCompact}
          />
        }
      ></StatsCard>

      <StatsCard
        title={t`Total MKR migrated`}
        content={
          <TokenIconWithBalance
            className="mt-1"
            token={{ symbol: 'MKR', name: 'mkr' }}
            balance={
              data?.totalMkrUpgraded ? formatBigInt(data?.totalMkrUpgraded, { compact: isCompact }) : '0'
            }
            compact={isCompact}
          />
        }
      ></StatsCard>
    </div>
  );
};
