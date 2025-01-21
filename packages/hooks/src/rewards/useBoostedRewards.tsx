import { useAccount, useChainId } from 'wagmi';
import { ReadHook } from '../hooks';
import { useQuery } from '@tanstack/react-query';
import { BoostedRewardsData } from './rewards';
import { TRUST_LEVELS, TrustLevelEnum } from '../constants';
import { formatBaLabsUrl } from '../helpers';
import { getBaLabsApiUrl } from '../helpers/getSubgraphUrl';

const fetchBoostedRewards = async (url: URL): Promise<BoostedRewardsData | undefined> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data: BoostedRewardsData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching BaLabs data:', error);
    return undefined;
  }
};

export function useBoostedRewards(paramAddress?: `0x${string}`): ReadHook & { data?: BoostedRewardsData } {
  const chainId = useChainId();
  const { address: connectedAddress } = useAccount();
  const address = paramAddress || connectedAddress;

  const baseUrl = getBaLabsApiUrl(chainId) || '';
  let url: URL | undefined;
  if (baseUrl) {
    const endpoint = `${baseUrl}/boosted-rewards/${address}`;
    url = formatBaLabsUrl(new URL(endpoint));
  }

  const { data, isLoading, error, refetch } = useQuery({
    enabled: !!address && !!url,
    queryKey: ['user-boosted-rewards', address, chainId],
    queryFn: () => (url ? fetchBoostedRewards(url) : Promise.resolve(undefined))
  });

  return {
    data,
    isLoading,
    error,
    mutate: refetch,
    dataSources: [
      {
        title: 'BA Labs API',
        href: url?.href || 'https://blockanalitica.com/',
        onChain: false,
        trustLevel: TRUST_LEVELS[TrustLevelEnum.TWO]
      }
    ]
  };
}
