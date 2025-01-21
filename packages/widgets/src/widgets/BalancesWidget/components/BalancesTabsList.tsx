import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trans } from '@lingui/react/macro';

interface BalancesTabsListProps {
  disabled?: boolean;
}

export const BalancesTabsList: React.FC<BalancesTabsListProps> = ({ disabled = false }) => (
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger position="left" disabled={disabled} data-testid="balances-toggle-left" value="left">
      <Trans>Funds</Trans>
    </TabsTrigger>
    <TabsTrigger position="right" disabled={disabled} data-testid="balances-toggle-right" value="right">
      <Trans>Transaction history</Trans>
    </TabsTrigger>
  </TabsList>
);
