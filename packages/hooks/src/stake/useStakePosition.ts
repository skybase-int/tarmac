import { request, gql } from 'graphql-request';
import { ReadHook } from '../hooks';
import { TRUST_LEVELS, TrustLevelEnum } from '../constants';
import { getMakerSubgraphUrl } from '../helpers/getSubgraphUrl';
import { Bark, StakePosition } from './stakeModule';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';

type StakePositionResponse = {
  // TODO: Update this to stakeUrns once the subgraph is updated
  sealUrns: {
    mkrLocked: string; // Update mkrLocked once the subgraph is updated
    usdsDebt: string;
    voteDelegate: {
      id: string;
    } | null;
    reward: {
      id: string;
    } | null;
    barks: Bark[];
  }[];
};

async function fetchStakePosition(
  urlSubgraph: string,
  urnIndex: number,
  address?: string
): Promise<StakePosition | undefined> {
  if (!address) return;
  // TODO: Update this query once the subgraph is updated
  const query = gql`
    {
      sealUrns(where: {owner: "${address}", index: "${urnIndex}"}) {
        mkrLocked
        usdsDebt
        voteDelegate {
          id
        }
        reward {
          id
        }
        barks {
          id
          ilk
          clipperId
        }
      }
    }
  `;

  const response: StakePositionResponse = await request(urlSubgraph, query);

  if (!response.sealUrns || response.sealUrns.length === 0) return;
  const { mkrLocked, usdsDebt, voteDelegate, reward } = response.sealUrns[0];

  return {
    owner: address,
    index: urnIndex,
    mkrLocked: BigInt(mkrLocked),
    usdsDebt: BigInt(usdsDebt),
    selectedDelegate: voteDelegate?.id,
    selectedReward: reward?.id,
    barks: response.sealUrns[0].barks
  };
}

export function useStakePosition({
  subgraphUrl,
  urnIndex
}: {
  subgraphUrl?: string;
  urnIndex: number;
}): ReadHook & { data?: StakePosition } {
  const { address } = useAccount();
  const chainId = useChainId();
  const urlSubgraph = subgraphUrl ? subgraphUrl : getMakerSubgraphUrl(chainId) || '';

  const {
    data,
    error,
    refetch: mutate,
    isLoading
  } = useQuery({
    enabled: Boolean(urlSubgraph),
    queryKey: ['stake-position-details', urlSubgraph, address, urnIndex],
    queryFn: () => fetchStakePosition(urlSubgraph, urnIndex, address)
  });

  return {
    data,
    isLoading: !data && isLoading,
    error: error as Error,
    mutate,
    dataSources: [
      {
        title: 'Sky Ecosystem subgraph',
        href: urlSubgraph,
        onChain: false,
        trustLevel: TRUST_LEVELS[TrustLevelEnum.ONE]
      }
    ]
  };
}
