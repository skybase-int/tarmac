import { useChainId } from 'wagmi';
import { ReadHook } from '../hooks';
import { useQuery } from '@tanstack/react-query';
import { TRUST_LEVELS, TrustLevelEnum } from '../constants';
import { formatBaLabsUrl } from '../helpers';
import { getBaLabsApiUrl } from '../helpers/getSubgraphUrl';

type ApiStakeHistoricData = {
  date: string;
  datetime: string;
  total_mkr: string; // TODO: Check if this is correct in new endpoint
  total_collateral: string;
  total_debt: string;
  borrow_rate: string;
  tvl: string;
  number_of_urns: number;
  total_rewards: string;
  total_exit_fees: string;
  mkr_price: string;
};

type StakeHistoricData = {
  date: string;
  datetime: string;
  totalMkr: number;
  totalCollateral: number;
  totalDebt: number;
  borrowRate: number;
  tvl: number;
  numberOfUrns: number;
  totalRewards: number;
  totalExitFees: number;
  mkrPrice: number;
};

const fetchStakeHistoricData = async (url: URL): Promise<StakeHistoricData[] | undefined> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data: ApiStakeHistoricData[] = await response.json();
    return data.map(item => ({
      date: item.date,
      datetime: item.datetime,
      totalMkr: parseFloat(item.total_mkr),
      totalCollateral: parseFloat(item.total_collateral),
      totalDebt: parseFloat(item.total_debt),
      borrowRate: parseFloat(item.borrow_rate),
      tvl: parseFloat(item.tvl),
      numberOfUrns: item.number_of_urns,
      totalRewards: parseFloat(item.total_rewards),
      totalExitFees: parseFloat(item.total_exit_fees),
      mkrPrice: parseFloat(item.mkr_price)
    }));
  } catch (error) {
    console.error('Error fetching Stake historic data:', error);
    return undefined;
  }
};

export function useStakeHistoricData(): ReadHook & { data?: StakeHistoricData[] } {
  const chainId = useChainId();

  const baseUrl = getBaLabsApiUrl(chainId) || '';
  let url: URL | undefined;
  if (baseUrl) {
    // TODO: Update this endpoint if lse changes to sth else
    const endpoint = `${baseUrl}/lsev2/historic/`;
    url = formatBaLabsUrl(new URL(endpoint));
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['stake-historic-data', chainId],
    queryFn: () => (url ? fetchStakeHistoricData(url) : Promise.resolve(undefined))
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
