import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Intent } from '@/lib/enums';

type WidgetNetworkState = {
  [Intent.TRADE_INTENT]?: number;
  [Intent.SAVINGS_INTENT]?: number;
  // Balances widget is excluded from tracking
};

interface NetworkSwitchContextValue {
  isSwitchingNetwork: boolean;
  setIsSwitchingNetwork: (isSwitching: boolean) => void;
  widgetNetworks: WidgetNetworkState;
  saveWidgetNetwork: (intent: Intent, chainId: number) => void;
  getWidgetNetwork: (intent: Intent) => number | undefined;
  clearWidgetNetwork: (intent: Intent) => void;
}

const NetworkSwitchContext = createContext<NetworkSwitchContextValue | undefined>(undefined);

export function NetworkSwitchProvider({ children }: { children: ReactNode }) {
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);
  const [widgetNetworks, setWidgetNetworks] = useState<WidgetNetworkState>({});

  const saveWidgetNetwork = useCallback((intent: Intent, chainId: number) => {
    setWidgetNetworks(prev => ({
      ...prev,
      [intent]: chainId
    }));
  }, []);

  const getWidgetNetwork = useCallback(
    (intent: Intent): number | undefined => {
      return widgetNetworks[intent as keyof WidgetNetworkState];
    },
    [widgetNetworks]
  );

  const clearWidgetNetwork = useCallback((intent: Intent) => {
    setWidgetNetworks(prev => {
      const next = { ...prev };
      delete next[intent as keyof WidgetNetworkState];
      return next;
    });
  }, []);

  return (
    <NetworkSwitchContext.Provider
      value={{
        isSwitchingNetwork,
        setIsSwitchingNetwork,
        widgetNetworks,
        saveWidgetNetwork,
        getWidgetNetwork,
        clearWidgetNetwork
      }}
    >
      {children}
    </NetworkSwitchContext.Provider>
  );
}

export const useNetworkSwitch = () => {
  const context = useContext(NetworkSwitchContext);
  if (!context) {
    throw new Error('useNetworkSwitch must be used within NetworkSwitchProvider');
  }
  return context;
};
