import { useMemo } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Text } from '@widgets/shared/components/ui/Typography';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { Tabs, TabsContent } from '@widgets/components/ui/tabs';
import { BalancesTabsList } from '@widgets/widgets/BalancesWidget/components/BalancesTabsList';
import { AssetsNoWalletConnected } from '@widgets/widgets/BalancesWidget/components/AssetsNoWalletConnected';
import { HistoryNoWalletConnected } from '@widgets/widgets/BalancesWidget/components/HistoryNoWalletConnected';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Card } from '@widgets/components/ui/card';
import { CopyToClipboard } from '@widgets/shared/components/ui/CopyToClipboard';
import { ExternalLink } from '@widgets/shared/components/ExternalLink';
import { useSwitchChain } from 'wagmi';
import { Button } from '@widgets/components/ui/button';
import { useChainId } from 'wagmi';
import { isBaseChainId } from '@jetstreamgg/utils';

export const BalancesHeader = ({
  initialTabSide,
  isConnectedAndEnabled,
  onExternalLinkClicked
}: {
  initialTabSide?: 'left' | 'right';
  isConnectedAndEnabled: boolean;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}): React.ReactElement => {
  const chainId = useChainId();
  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: ethBalance, isLoading: isEthBalanceLoading } = useBalance({ address });
  const truncatedAddress = useMemo(
    () => address && address.slice(0, 7) + '...' + address.slice(-5),
    [address]
  );
  const isBaseChain = useMemo(() => isBaseChainId(chainId), [chainId]);

  const jazziconComponent = useMemo(() => {
    return address ? <Jazzicon diameter={24} seed={jsNumberForAddress(address)} /> : null;
  }, [address]);

  return !isConnectedAndEnabled ? (
    <div>
      <Tabs defaultValue={initialTabSide || 'left'}>
        <BalancesTabsList />
        <TabsContent className="mt-4" value="left">
          <AssetsNoWalletConnected />
        </TabsContent>
        <TabsContent className="mt-4" value="right">
          <HistoryNoWalletConnected />
        </TabsContent>
      </Tabs>
    </div>
  ) : isEthBalanceLoading || !ethBalance || !address ? (
    <Skeleton className="bg-card h-8" />
  ) : (
    <Card variant="address" className="mb-3">
      <div className="flex justify-between">
        <div className="flex">
          {jazziconComponent}
          <Text className="ml-3">{truncatedAddress}</Text>
        </div>
        <CopyToClipboard text={address} />
      </div>
      {isBaseChain && (
        <div className="mt-3 flex">
          <Text variant="medium">
            Ethereum balances are not shown when connected to Base.{' '}
            <Button
              variant="purpleLink"
              className="mx-0 my-0 inline h-0 p-0"
              onClick={() => switchChain({ chainId: 1 })}
            >
              Connect to Mainnet
            </Button>{' '}
            instead or{' '}
            <ExternalLink
              href="https://bridge.base.org/deposit"
              iconSize={11}
              className="text-textEmphasis inline"
              inline
              onExternalLinkClicked={onExternalLinkClicked}
            >
              <span className="inline">bridge your assets to Base.</span>
            </ExternalLink>
          </Text>
        </div>
      )}
    </Card>
  );
};
