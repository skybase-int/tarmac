import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ExternalLink } from '@/modules/layout/components/ExternalLink';
import { Text } from '@/modules/layout/components/Typography';
import { VStack } from '@/modules/layout/components/VStack';
import { useIsSafeWallet } from '@jetstreamgg/utils';
import { Trans } from '@lingui/react/macro';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const WALLET_CONNECT_CONNECTOR_ID = 'walletConnect';

export const useSafeAppNotification = () => {
  const { connector } = useAccount();
  const isSafeWallet = useIsSafeWallet();

  useEffect(() => {
    const toastDismissed = window.localStorage.getItem('safe-wallet-toast-dismissed');

    if (isSafeWallet && connector?.id === WALLET_CONNECT_CONNECTOR_ID && toastDismissed !== 'true') {
      toast({
        title: (
          <Text variant="medium" className="text-selectActive">
            <Trans>There is a better way to interact with the app using your Safe Wallet</Trans>
          </Text>
        ),
        description: (
          <VStack className="mt-4 gap-4">
            <Text variant="medium" className="text-balance">
              <Trans>
                Sky.money is officially listed as a Safe App, you can now open the app through your Safe
                Wallet and enjoy a seamless experience.
                <br />
              </Trans>
            </Text>
            <Button className="place-self-start">
              <ExternalLink
                href="https://app.safe.global/share/safe-app?appUrl=https%3A%2F%2Fapp.sky.money%2F"
                showIcon={false}
              >
                Go to the Safe Wallet app
              </ExternalLink>
            </Button>
          </VStack>
        ),
        variant: 'info',
        duration: Infinity,
        onClose: () => {
          window.localStorage.setItem('safe-wallet-toast-dismissed', 'true');
        }
      });
    }
  }, [connector?.id, isSafeWallet]);
};
