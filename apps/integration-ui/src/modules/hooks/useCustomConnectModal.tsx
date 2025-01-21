import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export function useCustomConnectModal() {
  const { openConnectModal } = useConnectModal();

  const { isConnected } = useAccount();

  const action = useMemo(() => {
    return openConnectModal;
  }, [openConnectModal, isConnected]);

  return action;
}
