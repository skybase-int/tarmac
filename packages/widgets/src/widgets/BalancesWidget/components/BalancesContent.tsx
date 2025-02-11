import { type GetBalanceData } from 'wagmi/query';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { VStack } from '@/shared/components/ui/layout/VStack';
import { TokenBalances } from './TokenBalances';
import { BalancesHistory } from './BalancesHistory';
import { BalancesTabsList } from './BalancesTabsList';
import { ModulesBalances } from './ModulesBalances';
import { motion } from 'framer-motion';
import { positionAnimations } from '@/shared/animation/presets';
import { BalancesWidgetState } from '@/shared/types/widgetState';
import { TokenForChain } from '@jetstreamgg/hooks';
import { Heading } from '@/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';
import { BalancesFilter } from './BalancesFilter';
import { useState } from 'react';

export interface TokenBalanceResponse extends GetBalanceData {
  tokenAddress?: string;
  formatted: string;
}

interface BalancesContentProps {
  validatedExternalState?: BalancesWidgetState;
  customTokenMap?: { [chainId: number]: TokenForChain[] };
  hideModuleBalances?: boolean;
  chainIds?: number[];
  actionForToken?: (
    symbol: string,
    balance: string,
    tokenChainId: number
  ) => { label: string; actionUrl: string; image: string } | undefined;
  rewardsCardUrl?: string;
  savingsCardUrlMap?: Record<number, string>;
  sealCardUrl?: string;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const BalancesContent = ({
  validatedExternalState,
  customTokenMap,
  hideModuleBalances,
  actionForToken,
  chainIds,
  rewardsCardUrl,
  savingsCardUrlMap,
  sealCardUrl,
  onExternalLinkClicked
}: BalancesContentProps): React.ReactElement => {
  const [showAllNetworks, setShowAllNetworks] = useState(false);
  const [showAllBalances, setShowAllBalances] = useState(true);
  return (
    <Tabs defaultValue={validatedExternalState?.tab || 'left'} className="w-full">
      <BalancesTabsList />
      <TabsContent value="left" className="mt-0">
        <VStack className="items-stretch pt-4">
          <motion.div variants={positionAnimations}>
            <BalancesFilter
              showBalanceFilter={true}
              showAllNetworks={showAllNetworks}
              showAllBalances={showAllBalances}
              setShowAllNetworks={setShowAllNetworks}
              setShowAllBalances={setShowAllBalances}
            />
            <Heading variant="small" className="mb-3 leading-6">
              <Trans>Supplied Funds</Trans>
            </Heading>
            <ModulesBalances
              rewardsCardUrl={rewardsCardUrl}
              savingsCardUrlMap={savingsCardUrlMap}
              sealCardUrl={sealCardUrl}
              onExternalLinkClicked={onExternalLinkClicked}
              hideModuleBalances={hideModuleBalances}
              chainIds={chainIds}
              hideZeroBalances={!showAllBalances}
            />
          </motion.div>

          <motion.div variants={positionAnimations}>
            <Heading variant="small" className="mb-3 leading-6">
              <Trans>Wallet Funds</Trans>
            </Heading>
            <TokenBalances
              actionForToken={actionForToken}
              customTokenMap={customTokenMap}
              chainIds={chainIds}
              hideZeroBalances={!showAllBalances}
            />
          </motion.div>
        </VStack>
      </TabsContent>
      <TabsContent value="right" className="mt-0">
        <motion.div variants={positionAnimations}>
          <BalancesFilter
            showBalanceFilter={false}
            showAllNetworks={showAllNetworks}
            showAllBalances={showAllBalances}
            setShowAllNetworks={setShowAllNetworks}
            setShowAllBalances={setShowAllBalances}
          />
          <BalancesHistory onExternalLinkClicked={onExternalLinkClicked} />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};
