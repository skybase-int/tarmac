import { useState, useEffect } from 'react';
import { useConnect, useConnectors, Connector } from 'wagmi';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Text } from '@/modules/layout/components/Typography';
import { Close } from '@/modules/icons';
import { t } from '@lingui/core/macro';
import { cn } from '@/lib/utils';
import { useIsSafeWallet } from '@jetstreamgg/sky-utils';
import { WalletIcon } from './WalletIcon';
import { WALLET_ICONS } from '@/lib/constants';
import { ConnectWallet } from '@jetstreamgg/sky-widgets';
import { Trans } from '@lingui/react/macro';
import { ExternalLink } from '@/modules/layout/components/ExternalLink';

interface ConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectModal({ open, onOpenChange }: ConnectModalProps) {
  const connectors = useConnectors();
  const isSafeWallet = useIsSafeWallet();
  const { connect, isPending, variables, error } = useConnect({
    mutation: {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: error => {
        console.error('Connection error:', error);
      }
    }
  });
  const [ready, setReady] = useState<Record<string, boolean>>({});
  const [icons, setIcons] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if each connector is ready and get icons
    if (!open) return; // Only check when modal is open

    connectors.forEach(async connector => {
      try {
        // For injected wallets, check if provider is available
        // Injected wallets have type 'injected' or contain 'injected' in their id
        const isInjectedType =
          connector.type === 'injected' ||
          connector.id.toLowerCase().includes('metamask') ||
          connector.id.toLowerCase().includes('injected');

        if (isInjectedType) {
          // For injected wallets, check if provider exists
          const provider = await connector.getProvider();
          setReady(prev => ({ ...prev, [connector.uid]: !!provider }));
        } else {
          // Non-injected wallets (WalletConnect, Coinbase, etc) are always "ready"
          // They work via QR/deep links
          setReady(prev => ({ ...prev, [connector.uid]: true }));
        }

        // Try to get the connector's icon
        setIcons(prev => ({
          ...prev,
          [connector.uid]: connector.icon || WALLET_ICONS[connector.id as keyof typeof WALLET_ICONS] || ''
        }));
      } catch (err) {
        console.warn(`Connector ${connector.name} not available:`, err);
        setReady(prev => ({ ...prev, [connector.uid]: false }));
      }
    });
  }, [connectors, open]);

  // Categorize wallets
  const alwaysAvailable = ['walletConnect', 'coinbaseWallet', 'baseAccount', 'safe'];
  const suggestedIds = ['metaMask', 'baseAccount', 'coinbaseWallet', 'walletConnect', 'safe'];

  // Separate installed wallets from suggested
  const installedWallets = connectors.filter(c => {
    // Don't show Safe wallet if not in Safe context
    if (c.id === 'safe' && !isSafeWallet) return false;

    // Only show injected wallets that are detected
    const isInjectedType =
      c.type === 'injected' ||
      c.id.toLowerCase().includes('metamask') ||
      c.id.toLowerCase().includes('injected');

    // Must be injected type AND ready (detected)
    return isInjectedType && ready[c.uid] === true;
  });

  const suggestedWallets = connectors.filter(c => {
    // Don't show Safe wallet if not in Safe context
    if (c.id === 'safe' && !isSafeWallet) return false;

    // Check if this wallet is already in installedWallets
    const isAlreadyInstalled = installedWallets.some(installed => installed.uid === c.uid);
    if (isAlreadyInstalled) return false;

    // Include if it's both suggested AND always available (QR/universal wallets)
    if (suggestedIds.includes(c.id) && alwaysAvailable.includes(c.id)) return true;

    return false;
  });

  const renderConnectorButton = (connector: Connector) => {
    const isConnecting = isPending && variables?.connector === connector;
    const isReady = ready[connector.uid] ?? false;

    return (
      <Button
        key={connector.uid}
        onClick={() => connect({ connector })}
        disabled={!isReady || isPending}
        variant="ghost"
        className={cn(
          'hover:bg-containerLight flex w-full items-center justify-between p-3',
          isConnecting && 'bg-containerLight opacity-70'
        )}
      >
        <div className="flex items-center gap-3">
          <WalletIcon connector={connector} iconUrl={icons[connector.uid]} />
          <div className="flex flex-col items-start">
            <Text className="text-text text-base font-medium">{connector.name}</Text>
            {isConnecting && <Text className="text-textSecondary text-sm">{t`Connecting...`}</Text>}
            {!isReady && !isConnecting && alwaysAvailable.includes(connector.id) && (
              <Text className="text-textSecondary text-sm">{t`Connect via QR`}</Text>
            )}
          </div>
        </div>
      </Button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-containerDark gap-6 p-0 sm:max-w-[440px] sm:min-w-[440px]"
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}
      >
        <div className="flex items-center justify-between pt-2">
          <DialogTitle className="text-text text-2xl">{t`Connect your wallet`}</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="text-textSecondary hover:text-text h-8 w-8 rounded-full p-0"
              data-testid="connect-modal-close"
            >
              <Close className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1.5">
            <ConnectWallet width={45} height={55} />
          </div>
          <div className="space-y-1">
            <Text className="text-text">
              <Trans>Connect to explore Sky Protocol features</Trans>
            </Text>
            <ExternalLink
              href="https://sky.money/features"
              iconSize={12}
              iconColor="#d298ff"
              contentClassName="items-center gap-1 text-textEmphasis"
            >
              <Trans>Sky Protocol features</Trans>
            </ExternalLink>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {installedWallets.length > 0 && (
            <>
              <Text className="text-textSecondary text-md font-medium uppercase">{t`Installed Wallets`}</Text>
              <div className="flex flex-col gap-6">{installedWallets.map(renderConnectorButton)}</div>
              <Text className="text-textSecondary text-center text-[13px] leading-4">
                {t`By connecting, you agree to our Terms of Service`}
              </Text>
            </>
          )}

          {suggestedWallets.length > 0 && (
            <>
              <Text className="text-textSecondary text-md font-medium uppercase">{t`Suggested Wallets`}</Text>
              <div className="flex flex-col gap-6">{suggestedWallets.map(renderConnectorButton)}</div>
            </>
          )}
        </div>

        {error && <Text className="text-sm text-red-500">{t`Failed to connect. Please try again.`}</Text>}
      </DialogContent>
    </Dialog>
  );
}
