import { useMemo } from 'react';
import { TOKENS } from '../tokens/tokens.constants';
import { useChainId } from 'wagmi';

export function useTokenAddressMap() {
  const chainId = useChainId();

  return useMemo(() => {
    const mapping: { [address: string]: (typeof TOKENS)[keyof typeof TOKENS] } = {};
    Object.values(TOKENS).forEach(token => {
      if (token.address[chainId]) {
        mapping[token.address[chainId].toLowerCase()] = token;
      }
    });
    return mapping;
  }, [chainId]);
}
