import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAccount, useChainId, useChains } from 'wagmi';
import { normalizeUrlParam } from '@/lib/helpers/string/normalizeUrlParam';
import { Text } from '@/modules/layout/components/Typography';
import { TokenIcon } from '@/modules/ui/components/TokenIcon';
import {
  useTokenBalances,
  TOKENS,
  type TokenItem,
  useOverallSkyData,
  useStUsdsData,
  useMorphoVaultSingleMarketApiData,
  MORPHO_VAULTS,
  useAvailableTokenRewardContracts,
  useRewardsChartInfo,
  useHighestRateFromChartData,
  filterDeprecatedRewardContracts,
  useStakeRewardContracts,
  useMultipleRewardsChartInfo
} from '@jetstreamgg/sky-hooks';
import { formatDecimalPercentage, calculateApyFromStr, isTestnetId, chainId as chainIdConstants } from '@jetstreamgg/sky-utils';
import { Savings, Upgrade, RewardsModule, Stake, Expert, Vaults } from '@/modules/icons';
import { type IconProps } from '@/modules/icons/Icon';
import { parseIntent } from '../engine/intent-parser';
import { intentToWidgetParams } from '../engine/intent-to-widget';
import { SUGGESTED_ACTIONS, type SuggestedAction } from '../lib/examples';

// Map token symbols to TOKENS keys for address lookup
const SYMBOL_TO_TOKEN_KEY: Record<string, keyof typeof TOKENS> = {
  USDS: 'usds',
  DAI: 'dai',
  MKR: 'mkr',
  SKY: 'sky',
  sUSDS: 'susds'
};

// Map widget/module names to their icon components
const MODULE_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  savings: Savings,
  upgrade: Upgrade,
  rewards: RewardsModule,
  stake: Stake,
  stusds: Expert,
  morpho: Vaults
};

type ActionWithModule = SuggestedAction;

/** Round to a friendly human-readable number at roughly half the balance. */
function niceAmount(balance: number): number {
  const half = balance * 0.5;
  if (half <= 0) return 0;
  if (half < 1) return Math.floor(half * 10) / 10;
  if (half < 10) return Math.floor(half);
  if (half < 100) return Math.floor(half / 5) * 5;
  if (half < 1000) return Math.floor(half / 50) * 50;
  if (half < 10000) return Math.floor(half / 500) * 500;
  return Math.floor(half / 1000) * 1000;
}

function formatAmount(n: number): string {
  return n % 1 === 0 ? n.toFixed(0) : n.toFixed(1);
}

function formatDisplay(n: number): string {
  return n % 1 === 0 ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { maximumFractionDigits: 1 });
}

function resolveAction(
  action: SuggestedAction,
  balanceMap: Record<string, number>,
  rateMap: Record<string, string>
): { label: string; input: string } {
  let label = action.label;
  let input = action.input;

  if (action.sourceToken && action.defaultAmount !== undefined) {
    const balance = balanceMap[action.sourceToken];
    const amount = balance && balance > 0 ? niceAmount(balance) : 0;
    const raw = amount > 0 ? amount : action.defaultAmount;
    label = label.replace('{amount}', formatDisplay(raw));
    input = input.replace('{amount}', formatAmount(raw));
  }

  if (action.rateKey) {
    const rate = rateMap[action.rateKey] ?? '';
    label = label.replace('{rate}', rate);
  }

  return { label, input };
}

/** Fetch rates for actions that have a rateKey. */
function useActionRates(actions: SuggestedAction[], chainId: number): Record<string, string> {
  const rateKeys = useMemo(() => {
    const keys = new Set<string>();
    for (const action of actions) {
      if (action.rateKey) keys.add(action.rateKey);
    }
    return keys;
  }, [actions]);

  const hasRates = rateKeys.size > 0;
  const mainnetChainId = isTestnetId(chainId) ? chainIdConstants.tenderly : chainIdConstants.mainnet;

  // Savings rate
  const { data: overallSkyData } = useOverallSkyData();

  // stUSDS rate
  const { data: stUsdsData } = useStUsdsData();

  // Morpho vault rate
  const defaultMorphoVault = MORPHO_VAULTS[0];
  const morphoVaultAddress = defaultMorphoVault?.vaultAddress[mainnetChainId];
  const { data: morphoSingleMarketData } = useMorphoVaultSingleMarketApiData({
    vaultAddress: morphoVaultAddress
  });

  // Rewards rate
  const allRewardContracts = useAvailableTokenRewardContracts(mainnetChainId);
  const activeRewardContracts = filterDeprecatedRewardContracts(allRewardContracts, mainnetChainId);

  const usdsSpkRewardContract = activeRewardContracts.find(
    contract =>
      contract.supplyToken.symbol === TOKENS.usds.symbol && contract.rewardToken.symbol === TOKENS.spk.symbol
  );
  const usdsCleRewardContract = activeRewardContracts.find(
    contract =>
      contract.supplyToken.symbol === TOKENS.usds.symbol && contract.rewardToken.symbol === TOKENS.cle.symbol
  );

  const { data: usdsSpkChartData } = useRewardsChartInfo({
    rewardContractAddress: usdsSpkRewardContract?.contractAddress as string
  });
  const { data: usdsCleChartData } = useRewardsChartInfo({
    rewardContractAddress: usdsCleRewardContract?.contractAddress as string
  });
  const rewardsHighestRate = useHighestRateFromChartData([usdsSpkChartData, usdsCleChartData]);

  // Staking rate
  const { data: stakeRewardContracts } = useStakeRewardContracts();
  const { data: stakeRewardsChartsInfoData } = useMultipleRewardsChartInfo({
    rewardContractAddresses: stakeRewardContracts?.map(c => c.contractAddress) || []
  });
  const stakeHighestRateData = useHighestRateFromChartData(stakeRewardsChartsInfoData || []);

  return useMemo(() => {
    if (!hasRates) return {};

    const rates: Record<string, string> = {};

    if (rateKeys.has('savings')) {
      const rate = parseFloat(overallSkyData?.skySavingsRatecRate ?? '0');
      rates.savings = rate > 0 ? formatDecimalPercentage(rate) : '0%';
    }

    if (rateKeys.has('stusds')) {
      const rate = stUsdsData?.moduleRate ? calculateApyFromStr(stUsdsData.moduleRate) : 0;
      rates.stusds = rate > 0 ? `${rate.toFixed(2)}%` : '0%';
    }

    if (rateKeys.has('vaults')) {
      const rate = morphoSingleMarketData?.rate.netRate ? morphoSingleMarketData.rate.netRate * 100 : 0;
      rates.vaults = rate > 0 ? `${rate.toFixed(2)}%` : '0%';
    }

    if (rateKeys.has('rewards')) {
      const rate = rewardsHighestRate ? parseFloat(rewardsHighestRate.rate) : 0;
      rates.rewards = rate > 0 ? formatDecimalPercentage(rate) : '0%';
    }

    if (rateKeys.has('staking')) {
      const rate = stakeHighestRateData ? parseFloat(stakeHighestRateData.rate) : 0;
      rates.staking = rate > 0 ? formatDecimalPercentage(rate) : '0%';
    }

    return rates;
  }, [hasRates, rateKeys, overallSkyData, stUsdsData, morphoSingleMarketData, rewardsHighestRate, stakeHighestRateData]);
}

export function SuggestedActions({ widget }: { widget: string }) {
  const [, setSearchParams] = useSearchParams();
  const { address } = useAccount();
  const chainId = useChainId();
  const chains = useChains();

  const connectedChain = chains.find(c => c.id === chainId);
  const networkName = connectedChain ? normalizeUrlParam(connectedChain.name) : 'ethereum';

  // "all" combines every widget's actions into one list, tagging each with its module
  const actions = useMemo<ActionWithModule[]>(() => {
    if (widget === 'all') {
      return Object.entries(SUGGESTED_ACTIONS).flatMap(([key, acts]) =>
        acts.filter(a => !a.hideFromAll).map(a => ({ ...a, module: a.module ?? key }))
      );
    }
    return SUGGESTED_ACTIONS[widget] ?? [];
  }, [widget]);

  // Collect unique source tokens we need balances for
  const tokenItems = useMemo<TokenItem[]>(() => {
    const seen = new Set<string>();
    const items: TokenItem[] = [];
    for (const action of actions) {
      if (!action.sourceToken || seen.has(action.sourceToken)) continue;
      seen.add(action.sourceToken);
      const key = SYMBOL_TO_TOKEN_KEY[action.sourceToken];
      if (!key) continue;
      const token = TOKENS[key];
      const tokenAddress = token.address[chainId];
      if (!tokenAddress) continue;
      items.push({ address: tokenAddress, symbol: action.sourceToken });
    }
    return items;
  }, [actions, chainId]);

  const { data: balances } = useTokenBalances({
    address,
    tokens: tokenItems,
    chainId,
    enabled: !!address && tokenItems.length > 0
  });

  // Build symbol -> numeric balance map
  const balanceMap = useMemo(() => {
    const map: Record<string, number> = {};
    balances?.forEach(b => {
      map[b.symbol] = parseFloat(b.formatted);
    });
    return map;
  }, [balances]);

  // Fetch rates for actions with rateKey
  const rateMap = useActionRates(actions, chainId);

  const handleClick = useCallback(
    (input: string) => {
      const intent = parseIntent(input);
      if (!intent) return;

      const params = intentToWidgetParams(intent, chainId, networkName);
      if (!params) return;

      setSearchParams(prev => {
        params.forEach((value, key) => {
          prev.set(key, value);
        });
        return prev;
      });
    },
    [chainId, networkName, setSearchParams]
  );

  if (actions.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-1 xl:grid-cols-2">
      {actions.map(action => {
        const resolved = resolveAction(action, balanceMap, rateMap);
        const ModuleIcon = action.module ? MODULE_ICONS[action.module] : null;
        return (
          <button
            key={action.input}
            onClick={() => handleClick(resolved.input)}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 px-3 py-2 text-left transition-colors hover:bg-brandLight/20"
          >
            {ModuleIcon && (
              <ModuleIcon boxSize={16} className="text-textSecondary shrink-0" />
            )}
            <div className="flex -space-x-1.5">
              {action.tokens.map(symbol => (
                <TokenIcon
                  key={symbol}
                  token={{ symbol, name: symbol }}
                  className="h-5 w-5"
                  width={20}
                  showChainIcon={false}
                />
              ))}
            </div>
            <Text variant="small" className="text-textSecondary">
              {resolved.label}
            </Text>
            {action.badge && (
              <span className="ml-auto shrink-0 rounded-full bg-textEmphasis/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-textEmphasis">
                {action.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
