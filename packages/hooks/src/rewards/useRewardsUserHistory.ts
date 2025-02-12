import { request, gql } from 'graphql-request';
import { ReadHook } from '../hooks';
import { TRUST_LEVELS, TrustLevelEnum, ModuleEnum, TransactionTypeEnum } from '../constants';
import { getMakerSubgraphUrl } from '../helpers/getSubgraphUrl';
import { useQuery } from '@tanstack/react-query';
import { RewardUserHistoryItem, RewardUserHistoryResponse } from './rewards';
import { useAccount, useChainId } from 'wagmi';

async function fetchRewardsUserHistory(
  urlSubgraph: string,
  rewardContractAddress: string,
  userAddress: string
): Promise<RewardUserHistoryItem[] | undefined> {
  if (!rewardContractAddress || !userAddress) return [];
  const query = gql`
    {
        reward(id:"${rewardContractAddress}"){
            supplyInstances(where: {user: "${userAddress}"}) {
            blockTimestamp,
            transactionHash
            amount
            }
            withdrawals(where: {user: "${userAddress}"})  { 
            blockTimestamp,
            transactionHash
            amount
            }
            rewardClaims(where: {user: "${userAddress}"}) {
            blockTimestamp
            transactionHash
            amount
            }
        }
    }
  `;

  const response = (await request(urlSubgraph, query)) as RewardUserHistoryResponse;

  const reward = response.reward;

  if (!reward) {
    return undefined;
  }

  const supplyInstances = reward.supplyInstances.map(e => ({
    blockTimestamp: new Date(parseInt(e.blockTimestamp, 10) * 1000),
    transactionHash: e.transactionHash,
    amount: BigInt(e.amount),
    rewardsClaim: false,
    module: ModuleEnum.REWARDS,
    type: TransactionTypeEnum.SUPPLY
  }));
  const withdrawals = reward.withdrawals.map(e => ({
    blockTimestamp: new Date(parseInt(e.blockTimestamp, 10) * 1000),
    transactionHash: e.transactionHash,
    amount: BigInt(-e.amount), //negative for withdrawals
    rewardsClaim: false,
    module: ModuleEnum.REWARDS,
    type: TransactionTypeEnum.WITHDRAW
  }));
  const rewardClaims = reward.rewardClaims.map(e => ({
    blockTimestamp: new Date(parseInt(e.blockTimestamp, 10) * 1000),
    transactionHash: e.transactionHash,
    amount: BigInt(e.amount),
    rewardsClaim: true,
    module: ModuleEnum.REWARDS,
    type: TransactionTypeEnum.REWARD
  }));
  const allParsed = [...supplyInstances, ...withdrawals, ...rewardClaims];
  return allParsed.sort((a, b) => b.blockTimestamp.getTime() - a.blockTimestamp.getTime());
}

export function useRewardsUserHistory({
  subgraphUrl,
  rewardContractAddress
}: {
  subgraphUrl?: string;
  rewardContractAddress: string;
}): ReadHook & { data?: RewardUserHistoryItem[] } {
  const chainId = useChainId();
  const { address: userAddress } = useAccount();
  const urlSubgraph = subgraphUrl ? subgraphUrl : getMakerSubgraphUrl(chainId) || '';

  const {
    data,
    error,
    refetch: mutate,
    isLoading
  } = useQuery({
    enabled: Boolean(urlSubgraph && rewardContractAddress && userAddress),
    queryKey: ['rewards-user-history', urlSubgraph, rewardContractAddress, userAddress, chainId],
    queryFn: () => fetchRewardsUserHistory(urlSubgraph, rewardContractAddress, userAddress || '')
  });

  return {
    data,
    isLoading,
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
