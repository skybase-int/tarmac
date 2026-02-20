import { Tabs, TabsContent } from '@widgets/components/ui/tabs';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { BalancesHistory } from './BalancesHistory';
import { BalancesTabsList } from './BalancesTabsList';
import { ModulesBalances } from './ModulesBalances';
import { motion } from 'framer-motion';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { BalancesWidgetState } from '@widgets/shared/types/widgetState';
import { Heading } from '@widgets/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';
import { BalancesFlow } from '../constants';
import { BalancesFilter } from './BalancesFilter';
import { useState } from 'react';
import { useChainId } from 'wagmi';

interface BalancesContentProps {
  validatedExternalState?: BalancesWidgetState;
  hideModuleBalances?: boolean;
  tabIndex: 0 | 1;
  chainIds?: number[];
  rewardsCardUrl?: string;
  savingsCardUrlMap?: Record<number, string>;
  sealCardUrl?: string;
  stakeCardUrl?: string;
  stusdsCardUrl?: string;
  morphoCardUrl?: string;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onToggle: (number: 0 | 1) => void;
  showAllNetworks?: boolean;
  hideZeroBalances?: boolean;
  setShowAllNetworks?: (showAllNetworks: boolean) => void;
  setHideZeroBalances?: (hideZeroBalances: boolean) => void;
}

export const BalancesContent = ({
  hideModuleBalances,
  onExternalLinkClicked,
  onToggle,
  tabIndex,
  chainIds,
  rewardsCardUrl,
  savingsCardUrlMap,
  sealCardUrl,
  stakeCardUrl,
  stusdsCardUrl,
  morphoCardUrl,
  showAllNetworks: showAllNetworksProp,
  hideZeroBalances: hideZeroBalancesProp,
  setShowAllNetworks: setShowAllNetworksProp,
  setHideZeroBalances: setHideZeroBalancesProp
}: BalancesContentProps): React.ReactElement => {
  const [showAllNetworksInternal, setShowAllNetworksInternal] = useState(true);
  const [hideZeroBalancesInternal, setHideZeroBalancesInternal] = useState(false);

  const showAllNetworks = showAllNetworksProp ?? showAllNetworksInternal;
  const hideZeroBalances = hideZeroBalancesProp ?? hideZeroBalancesInternal;
  const setShowAllNetworks = setShowAllNetworksProp ?? setShowAllNetworksInternal;
  const setHideZeroBalances = setHideZeroBalancesProp ?? setHideZeroBalancesInternal;

  const chainId = useChainId();

  return (
    <Tabs value={tabIndex === 1 ? BalancesFlow.TX_HISTORY : BalancesFlow.FUNDS} className="w-full">
      <BalancesTabsList onToggle={onToggle} />
      <TabsContent value={BalancesFlow.FUNDS} className="mt-0">
        <VStack className="items-stretch">
          <motion.div variants={positionAnimations}>
            <BalancesFilter
              showBalanceFilter={true}
              showAllNetworks={showAllNetworks}
              hideZeroBalances={hideZeroBalances}
              setShowAllNetworks={setShowAllNetworks}
              setHideZeroBalances={setHideZeroBalances}
              chainId={chainId}
            />
            {!hideModuleBalances && (
              <Heading variant="small" className="mb-3 leading-6">
                <Trans>Supplied funds</Trans>
              </Heading>
            )}
            <ModulesBalances
              rewardsCardUrl={rewardsCardUrl}
              savingsCardUrlMap={savingsCardUrlMap}
              sealCardUrl={sealCardUrl}
              stakeCardUrl={stakeCardUrl}
              stusdsCardUrl={stusdsCardUrl}
              morphoCardUrl={morphoCardUrl}
              onExternalLinkClicked={onExternalLinkClicked}
              chainIds={chainIds}
              hideZeroBalances={hideZeroBalances}
              showAllNetworks={showAllNetworks}
            />
          </motion.div>
        </VStack>
      </TabsContent>
      <TabsContent value={BalancesFlow.TX_HISTORY} className="mt-0">
        <motion.div variants={positionAnimations}>
          <BalancesFilter
            showBalanceFilter={false}
            showAllNetworks={showAllNetworks}
            hideZeroBalances={hideZeroBalances}
            setShowAllNetworks={setShowAllNetworks}
            setHideZeroBalances={setHideZeroBalances}
            chainId={chainId}
          />
          <BalancesHistory onExternalLinkClicked={onExternalLinkClicked} showAllNetworks={showAllNetworks} />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};
