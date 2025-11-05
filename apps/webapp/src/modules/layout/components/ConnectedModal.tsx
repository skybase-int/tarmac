import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { t } from '@lingui/core/macro';
import { X } from 'lucide-react';
import { Text } from '@/modules/layout/components/Typography';
import { CustomAvatar } from '@/modules/ui/components/Avatar';

interface ConnectedModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  ensName?: string | null;
  ensAvatar?: string | null;
  connectorName?: string;
  onDisconnect: () => void;
}

export function ConnectedModal({
  isOpen,
  onOpenChange,
  address,
  ensName,
  ensAvatar,
  connectorName,
  onDisconnect
}: ConnectedModalProps) {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
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

          <Button variant="connect" onClick={onDisconnect} className="w-full">
            {t`Disconnect Wallet`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
