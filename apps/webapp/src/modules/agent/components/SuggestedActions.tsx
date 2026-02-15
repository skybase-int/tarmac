import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useChainId, useChains } from 'wagmi';
import { normalizeUrlParam } from '@/lib/helpers/string/normalizeUrlParam';
import { Text } from '@/modules/layout/components/Typography';
import { parseIntent } from '../engine/intent-parser';
import { intentToWidgetParams } from '../engine/intent-to-widget';
import { SUGGESTED_ACTIONS } from '../lib/examples';

export function SuggestedActions({ widget }: { widget: string }) {
  const [, setSearchParams] = useSearchParams();
  const chainId = useChainId();
  const chains = useChains();

  const connectedChain = chains.find(c => c.id === chainId);
  const networkName = connectedChain ? normalizeUrlParam(connectedChain.name) : 'ethereum';

  const actions = SUGGESTED_ACTIONS[widget];

  const handleClick = useCallback(
    (input: string) => {
      const intent = parseIntent(input);
      if (!intent) return;

      const params = intentToWidgetParams(intent, chainId, networkName);
      if (!params) return;

      setSearchParams(prev => {
        // Merge agent params into existing params (preserving network, chat, etc.)
        params.forEach((value, key) => {
          prev.set(key, value);
        });
        return prev;
      });
    },
    [chainId, networkName, setSearchParams]
  );

  if (!actions || actions.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {actions.map(action => (
        <button
          key={action.input}
          onClick={() => handleClick(action.input)}
          className="cursor-pointer rounded-lg border border-white/10 px-3 py-2 text-left text-xs transition-colors hover:border-white/25 hover:bg-white/5"
        >
          <Text variant="small" className="text-textSecondary">
            {action.label}
          </Text>
        </button>
      ))}
    </div>
  );
}
