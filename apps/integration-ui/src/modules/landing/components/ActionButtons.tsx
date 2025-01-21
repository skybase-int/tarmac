import React from 'react';
import { ExternalWidgetState } from '@jetstreamgg/widgets';

interface ActionButtonsProps {
  activeWidget: string;
  restricted?: boolean;
  setUpgradeInitialState?: (state: ExternalWidgetState) => void;
  setRewardsInitialState?: (state: ExternalWidgetState) => void;
  setSavingsInitialState?: (state: ExternalWidgetState) => void;
  setSealInitialState?: (state: ExternalWidgetState) => void;
  setRestricted?: (state: boolean) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  activeWidget,
  restricted,
  setUpgradeInitialState,
  setRewardsInitialState,
  setSavingsInitialState,
  setSealInitialState,
  setRestricted
}) => {
  return (
    <div className="mb-4 flex flex-row space-x-4">
      {activeWidget === 'upgrade' && (
        <>
          <button
            onClick={() =>
              setUpgradeInitialState && setUpgradeInitialState({ initialUpgradeToken: 'MKR', amount: '10' })
            }
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Upgrade 10 MKR
          </button>
          <button
            onClick={() =>
              setUpgradeInitialState && setUpgradeInitialState({ initialUpgradeToken: 'DAI', amount: '90' })
            }
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Upgrade 90 DAI
          </button>
          <button
            onClick={() =>
              setUpgradeInitialState && setUpgradeInitialState({ initialUpgradeToken: 'DAI', amount: '1000' })
            }
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Upgrade 1000 DAI
          </button>
        </>
      )}
      {activeWidget === 'rewards' && (
        <>
          <button
            onClick={() => setRewardsInitialState && setRewardsInitialState({ amount: '500' })}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Supply 500 USDS to Sky Token Rewards
          </button>
          <button
            onClick={() => setRewardsInitialState && setRewardsInitialState?.({ amount: '900' })}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Supply 900 USDS to Sky Token Rewards
          </button>
        </>
      )}
      {activeWidget === 'savings' && (
        <>
          <button
            onClick={() => setSavingsInitialState && setSavingsInitialState?.({ amount: '300' })}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Supply 300 USDS
          </button>
          <button
            onClick={() => setSavingsInitialState && setSavingsInitialState?.({ amount: '9000' })}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Supply 9000 USDS
          </button>
          <button
            onClick={() => setRestricted && setRestricted(!restricted)}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            {restricted ? 'Unrestrict' : 'Restrict'}
          </button>
        </>
      )}
      {activeWidget === 'Seal' && (
        <>
          <button
            onClick={() => setSealInitialState && setSealInitialState?.({ urnIndex: 0 })}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Open Urn 0
          </button>
          <button
            onClick={() => setSealInitialState && setSealInitialState?.({ urnIndex: 2 })}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Open Urn 2
          </button>
          <button
            onClick={() => {
              setSealInitialState && setSealInitialState?.({ urnIndex: undefined });
              window.location.reload(); // simulate a page refresh
            }}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Reset Index
          </button>
        </>
      )}
    </div>
  );
};
