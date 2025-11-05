import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { t } from '@lingui/core/macro';
import { X, ExternalLink, Clock } from 'lucide-react';
import { Text } from '@/modules/layout/components/Typography';
import { CustomAvatar } from '@/modules/ui/components/Avatar';
import { useRecentTransactions } from '../hooks/useRecentTransactions';
import { getEtherscanLink } from '@jetstreamgg/sky-utils';

interface ConnectedModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  chainId: number;
  ensName?: string | null;
  ensAvatar?: string | null;
  connectorName?: string;
  onDisconnect: () => void;
}

export function ConnectedModal({
  isOpen,
  onOpenChange,
  address,
  chainId,
  ensName,
  ensAvatar,
  connectorName,
  onDisconnect
}: ConnectedModalProps) {
  const { transactions } = useRecentTransactions(address, chainId);
  const recentTransactions = transactions.slice(0, 5); // Show only the 5 most recent

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-containerDark p-0 sm:max-w-[400px]">
        <div className="border-borderPrimary flex items-center justify-between border-b px-6 py-5">
          <DialogTitle>
            <Text className="text-text text-xl font-semibold">{t`Account`}</Text>
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="text-textSecondary hover:text-text h-8 w-8 rounded-full p-0">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>

        <div className="p-6">
          <div className="mb-6 flex flex-col items-center gap-4">
            {ensAvatar ? (
              <img alt="ENS Avatar" className="h-20 w-20 rounded-full" src={ensAvatar} />
            ) : (
              <CustomAvatar address={address} size={80} />
            )}
            <div className="text-center">
              <div className="text-text text-lg font-medium">{ensName || formatAddress(address)}</div>
              {ensName && <div className="text-textSecondary mt-1 text-sm">{formatAddress(address)}</div>}
              {connectorName && (
                <div className="text-textSecondary mt-2 text-sm">Connected with {connectorName}</div>
              )}
            </div>
          </div>

          {/* Recent Transactions Section */}
          {recentTransactions.length > 0 && (
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <Text className="text-textSecondary text-sm font-medium">{t`Recent Transactions`}</Text>
                <a
                  href={getEtherscanLink(chainId, address, 'address')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-text text-xs transition-colors"
                >
                  {t`View all`} →
                </a>
              </div>
              <div className="border-borderPrimary space-y-2 rounded-lg border">
                {recentTransactions.map((tx, index) => (
                  <a
                    key={tx.hash}
                    href={getEtherscanLink(chainId, tx.hash, 'tx')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:bg-containerLight flex items-center justify-between p-3 transition-colors ${
                      index !== recentTransactions.length - 1 ? 'border-borderPrimary border-b' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="text-textSecondary h-4 w-4 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-text truncate text-sm">{tx.description}</div>
                        <div className="text-textSecondary text-xs">{formatTimestamp(tx.timestamp)}</div>
                      </div>
                    </div>
                    <ExternalLink className="text-textSecondary h-4 w-4 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <Button variant="connect" onClick={onDisconnect} className="w-full">
            {t`Disconnect Wallet`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
