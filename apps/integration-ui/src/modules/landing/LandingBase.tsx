import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { BalancesWidgetDisplay } from './widgets/BalancesWidgetDisplay';
import { L2SavingsWidgetDisplay } from './widgets/L2SavingsWidgetDisplay';
import { L2TradeWidgetDisplay } from './widgets/L2TradeWidgetDisplay';
import { ExternalWidgetState } from '@jetstreamgg/widgets';
import { ActionButtons } from './components/ActionButtons';
import { L2TradeHistory } from '@/components/historyTable/L2TradeHistory';
import { L2SavingsHistory } from '@/components/historyTable/L2SavingsHistory';
import { TOKENS } from '@jetstreamgg/hooks';

export type CustomNavigation = { href: string; label: string };
// Style container div for widget
const widgetContainerStyle =
  'bg-card m-2 min-w-[416px] max-w-[376px] rounded-[20px] lg:p-5 lg:pt-11 lg:pr-2.5';

export function LandingBase(): React.ReactElement {
  const [activeWidget, setActiveWidget] = useState<string>('savings');
  const [restricted, setRestricted] = useState<boolean>(false);

  const [savingsInitialState, setSavingsInitialState] = useState<ExternalWidgetState>({
    tab: 'left',
    token: 'USDS',
    targetToken: 'USDS',
    amount: '100'
  });

  const widgetsToShow = ['balances', 'savings', 'trade'];

  const renderActiveWidget = () => {
    switch (activeWidget) {
      case 'balances':
        return <BalancesWidgetDisplay />;
      case 'savings':
        return (
          <L2SavingsWidgetDisplay
            externalWidgetState={savingsInitialState}
            disallowedTokens={restricted ? { supply: [TOKENS.usdc], withdraw: [TOKENS.usdc] } : undefined}
          />
        );
      case 'trade':
        return <L2TradeWidgetDisplay externalWidgetState={savingsInitialState} />;
      default:
        return null;
    }
  };

  const renderActiveDetails = () => {
    switch (activeWidget) {
      case 'trade':
        return <L2TradeHistory />;
      case 'savings':
        return <L2SavingsHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <ConnectButton />
      </div>

      <div className="mb-4 flex flex-row space-x-4">
        <div>
          <select
            value={activeWidget}
            onChange={e => setActiveWidget(e.target.value)}
            className="rounded-sm border p-2"
          >
            {widgetsToShow.map(widget => (
              <option key={widget} value={widget}>
                {widget.charAt(0).toUpperCase() + widget.slice(1)} Widget
              </option>
            ))}
          </select>
        </div>

        <ActionButtons
          activeWidget={activeWidget}
          setSavingsInitialState={setSavingsInitialState}
          restricted={restricted}
          setRestricted={setRestricted}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex h-[750px] space-x-4 p-4">
          <ErrorBoundary>
            <div className={widgetContainerStyle}>{renderActiveWidget()}</div>
            <div className="flex-1">{renderActiveDetails()}</div>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
