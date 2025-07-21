import { Intent } from '@/lib/enums';
import { ModuleCard } from '../ModuleCard';
import { t } from '@lingui/core/macro';
import { Text } from '@/modules/layout/components/Typography';
import { ExternalLink } from '@/modules/layout/components/ExternalLink';

export function TradeCard() {
  return (
    <ModuleCard
      intent={Intent.TRADE_INTENT}
      module={t`Trade`}
      title={t`Trade your crypto tokens`}
      className="from-[#543381] to-[#7a41c0]"
      logoName="trade"
      subHeading={
        <Text className="text-textSecondary">
          Trades are powered by{' '}
          <ExternalLink href="https://cow.fi/" showIcon={false} className="text-textSecondary underline">
            CoW Protocol
          </ExternalLink>
          .
        </Text>
      }
    />
  );
}
