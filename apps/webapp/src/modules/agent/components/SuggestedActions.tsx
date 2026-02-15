import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAccount, useChainId, useChains } from 'wagmi';
import { normalizeUrlParam } from '@/lib/helpers/string/normalizeUrlParam';
import { Text } from '@/modules/layout/components/Typography';
import { TokenIcon } from '@/modules/ui/components/TokenIcon';
import { useTokenBalances, TOKENS, type TokenItem } from '@jetstreamgg/sky-hooks';
import { Savings, Upgrade, RewardsModule, Stake, Expert } from '@/modules/icons';
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
  stusds: Expert
};

type ActionWithModule = SuggestedAction & { module?: string };

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
  balanceMap: Record<string, number>
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

  return { label, input };
}

export function SuggestedActions({ widget }: { widget: string }) {
  const [, setSearchParams] = useSearchParams();
  const { address } = useAccount();
  const chainId = useChainId();
  const chains = useChains();

  const connectedChain = chains.find(c => c.id === chainId);
  const networkName = connectedChain ? normalizeUrlParam(connectedChain.name) : 'ethereum';

  const showModuleIcons = widget === 'all';

  // "all" combines every widget's actions into one list, tagging each with its module
  const actions = useMemo<ActionWithModule[]>(() => {
    if (widget === 'all') {
      return Object.entries(SUGGESTED_ACTIONS).flatMap(([key, acts]) =>
        acts.filter(a => !a.hideFromAll).map(a => ({ ...a, module: key }))
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
    <div className="flex flex-col gap-1">
      {actions.map(action => {
        const resolved = resolveAction(action, balanceMap);
        const ModuleIcon = showModuleIcons && action.module ? MODULE_ICONS[action.module] : null;
        return (
          <button
            key={action.input}
            onClick={() => handleClick(resolved.input)}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 px-3 py-2 text-left transition-colors hover:border-white/25 hover:bg-white/5"
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
          </button>
        );
      })}
    </div>
  );
}
