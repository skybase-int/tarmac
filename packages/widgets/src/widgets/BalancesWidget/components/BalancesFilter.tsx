import { Checkbox } from '@/components/ui/checkbox';

type BalancesFilterProps = {
  showBalanceFilter: boolean;
  showAllNetworks: boolean;
  showAllBalances: boolean;
  setShowAllNetworks: (value: boolean) => void;
  setShowAllBalances: (value: boolean) => void;
};

export const BalancesFilter = ({
  showBalanceFilter,
  showAllNetworks,
  showAllBalances,
  setShowAllNetworks,
  setShowAllBalances
}: BalancesFilterProps): React.ReactElement => {
  return (
    <div className="mb-4 mt-3 flex justify-between">
      <div className="flex items-center gap-2">
        <span className="text-textSecondary text-sm">Network:</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowAllNetworks(true)}
            className={`text-sm ${showAllNetworks ? 'text-text' : 'text-textSecondary'}`}
          >
            All
          </button>
          <span className="text-sm">|</span>
          <button
            onClick={() => setShowAllNetworks(false)}
            // TODO update disabled text color
            className={`text-sm ${!showAllNetworks ? 'text-text' : 'text-textSecondary'}`}
          >
            Active
          </button>
        </div>
      </div>

      {showBalanceFilter && (
        <div className="flex items-center gap-1.5">
          <Checkbox
            id="all-balances"
            checked={!showAllBalances}
            onCheckedChange={checked => setShowAllBalances(!checked)}
          />
          <label htmlFor="all-balances" className="text-textSecondary cursor-pointer select-none text-sm">
            Hide 0 Balances
          </label>
        </div>
      )}
    </div>
  );
};
