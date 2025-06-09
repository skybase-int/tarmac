import React, { createContext, useContext, useCallback } from 'react';
import { useChains, useSwitchChain } from 'wagmi';
import { Intent } from '@/lib/enums';

type ChainModalContextType = {
  handleSwitchChain: ({
    chainId,
    nextIntent,
    onSuccess,
    onSettled
  }: {
    chainId: number;
    nextIntent?: Intent;
    onSuccess?: (data: any, variables: { chainId: number }) => void;
    onSettled?: () => void;
  }) => void;
};

const ChainModalContext = createContext<ChainModalContextType>({
  handleSwitchChain: () => {}
});

export const ChainModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const chains = useChains();
  const { switchChain } = useSwitchChain();

  const handleSwitchChain = useCallback(
    ({
      chainId,
      onSuccess,
      onSettled
    }: {
      chainId: number;
      onSuccess?: (data: any, variables: { chainId: number }) => void;
      onSettled?: () => void;
    }) => {
      switchChain(
        { chainId },
        {
          onSuccess,
          onSettled
        }
      );
    },
    [switchChain, chains]
  );

  return (
    <ChainModalContext.Provider
      value={{
        handleSwitchChain
      }}
    >
      {children}
    </ChainModalContext.Provider>
  );
};

export const useChainModalContext = () => useContext(ChainModalContext);
