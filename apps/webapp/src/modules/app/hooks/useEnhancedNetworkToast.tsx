import { useCallback, useState } from 'react';
import { useChains } from 'wagmi';
import { toast } from '@/components/ui/use-toast';
import { Text } from '@/modules/layout/components/Typography';
import { getChainIcon } from '@jetstreamgg/sky-utils';
import { ArrowRightLong } from '@/modules/icons';
import { Intent } from '@/lib/enums';
import { isMultichain } from '@/lib/widget-network-map';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useChainModalContext } from '@/modules/ui/context/ChainModalContext';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '@/lib/constants';
import { normalizeUrlParam } from '@/lib/helpers/string/normalizeUrlParam';
import { Loader2 } from 'lucide-react';
import { getSupportedChainIds } from '@/data/wagmi/config/config.default';

interface NetworkToastProps {
  previousChain?: { id: number; name: string };
  currentChain: { id: number; name: string };
  currentIntent?: Intent;
  onNetworkSwitch?: (chainId: number) => void;
}

const getWidgetName = (intent: Intent): string => {
  switch (intent) {
    case Intent.TRADE_INTENT:
      return 'Trade';
    case Intent.SAVINGS_INTENT:
      return 'Savings';
    case Intent.BALANCES_INTENT:
      return 'Balances';
    case Intent.UPGRADE_INTENT:
      return 'Upgrade';
    case Intent.REWARDS_INTENT:
      return 'Rewards';
    case Intent.STAKE_INTENT:
      return 'Stake';
    case Intent.EXPERT_INTENT:
      return 'Expert';
    case Intent.SEAL_INTENT:
      return 'Seal';
    default:
      return 'this widget';
  }
};

const NetworkQuickSwitchButtons = ({
  currentChainId,
  currentIntent,
  onNetworkSwitch
}: {
  currentChainId: number;
  currentIntent?: Intent;
  onNetworkSwitch: (chainId: number) => void;
}) => {
  const chains = useChains();
  const [switchingTo, setSwitchingTo] = useState<number | null>(null);

  // Get supported chains for current widget
  const supportedChainIds = getSupportedChainIds(currentChainId);
  const availableChains = chains.filter(
    chain => supportedChainIds.includes(chain.id) && chain.id !== currentChainId
  );

  // Don't show quick switch for mainnet-only widgets or if no other chains available
  if (!currentIntent || !isMultichain(currentIntent) || availableChains.length === 0) {
    return null;
  }

  // Don't show for Balances widget (it doesn't track network preferences)
  if (currentIntent === Intent.BALANCES_INTENT) {
    // Could still show buttons but with different behavior if desired
    // For now, following the spec to keep Balances simple
    return null;
  }

  const widgetName = getWidgetName(currentIntent);

  return (
    <div className="mt-3 flex flex-col gap-2">
      <Text className="text-text/60 text-xs">Other networks {widgetName} is supported on</Text>
      <div className="flex flex-wrap gap-2">
        {availableChains.map(chain => (
          <Button
            key={chain.id}
            size="xs"
            variant="outline"
            className={cn(
              'border-text/20 bg-container/50 hover:bg-container/80 h-7 gap-1.5 px-2.5 py-1',
              switchingTo === chain.id && 'cursor-wait opacity-50'
            )}
            disabled={switchingTo !== null}
            onClick={() => {
              setSwitchingTo(chain.id);
              onNetworkSwitch(chain.id);
            }}
          >
            {switchingTo === chain.id ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              getChainIcon(chain.id, 'h-3.5 w-3.5')
            )}
            <span className="text-xs">{chain.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export function useEnhancedNetworkToast() {
  const chains = useChains();
  const { handleSwitchChain } = useChainModalContext();
  const [, setSearchParams] = useSearchParams();

  const showNetworkToast = useCallback(
    ({ previousChain, currentChain, currentIntent, onNetworkSwitch }: NetworkToastProps) => {
      const handleQuickSwitch = (targetChainId: number) => {
        handleSwitchChain({
          chainId: targetChainId,
          onSuccess: (_, { chainId: newChainId }) => {
            const newChainName = chains.find(c => c.id === newChainId)?.name;
            if (newChainName) {
              setSearchParams((params: URLSearchParams) => {
                params.set(QueryParams.Network, normalizeUrlParam(newChainName));
                return params;
              });
            }
            // Call the callback if provided (for saving widget network preference)
            onNetworkSwitch?.(newChainId);
          }
        });
      };

      const toastContent = (
        <div className="mt-2 w-full">
          <div className="flex items-center gap-5">
            {previousChain && (
              <>
                <div className="flex items-center gap-2">
                  {getChainIcon(previousChain.id, 'h-[22px] w-[22px]')}
                  <Text className="text-small sm:text-medium md:text-large">{previousChain.name}</Text>
                </div>
                <ArrowRightLong width={18} height={18} />
              </>
            )}
            <div className="flex items-center gap-2">
              {getChainIcon(currentChain.id, 'h-[22px] w-[22px]')}
              <Text className="text-small sm:text-medium md:text-large">{currentChain.name}</Text>
            </div>
          </div>
          <NetworkQuickSwitchButtons
            currentChainId={currentChain.id}
            currentIntent={currentIntent}
            onNetworkSwitch={handleQuickSwitch}
          />
        </div>
      );

      // Extend duration if we're showing quick switch buttons
      const hasQuickSwitch =
        currentIntent && isMultichain(currentIntent) && currentIntent !== Intent.BALANCES_INTENT;

      toast({
        title: previousChain ? 'The network has changed' : `Switched to ${currentChain.name}`,
        description: toastContent,
        duration: hasQuickSwitch ? 8000 : 5000 // Extended duration for multichain widgets
      });
    },
    [chains, handleSwitchChain, setSearchParams]
  );

  return { showNetworkToast };
}
