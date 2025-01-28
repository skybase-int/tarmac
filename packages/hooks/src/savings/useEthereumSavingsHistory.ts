import { request, gql } from 'graphql-request';
import { ReadHook } from '../hooks';
import { TRUST_LEVELS, TrustLevelEnum, ModuleEnum, TransactionTypeEnum } from '../constants';
import { getMakerSubgraphUrl } from '../helpers/getSubgraphUrl';
import {
  SavingsSupply,
  SavingsHistory,
  SavingsWithdrawal,
  SavingsSupplyResponse,
  SavingsWithdrawalResponse
} from './savings';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { TOKENS } from '../tokens/tokens.constants';

async function fetchEthereumSavingsHistory(
  urlSubgraph: string,
  address?: string
): Promise<SavingsHistory | undefined> {
  if (!address) return [];
  const query = gql`
    {
      savingsSupplies(where: {owner: "${address}"}) {
        assets
        blockTimestamp
        transactionHash
      }
      savingsWithdraws(where: {owner: "${address}"}) {
        blockTimestamp
        assets
        transactionHash
      }
    }
  `;

  const response = (await request(urlSubgraph, query)) as any;
  const supplies: SavingsSupply[] = response.savingsSupplies.map((d: SavingsSupplyResponse) => ({
    assets: BigInt(d.assets),
    blockTimestamp: new Date(parseInt(d.blockTimestamp) * 1000),
    transactionHash: d.transactionHash,
    module: ModuleEnum.SAVINGS,
    type: TransactionTypeEnum.SUPPLY,
    token: TOKENS.usds
  }));

  const withdraws: SavingsWithdrawal[] = response.savingsWithdraws.map((w: SavingsWithdrawalResponse) => ({
    assets: -BigInt(w.assets), //make withdrawals negative
    blockTimestamp: new Date(parseInt(w.blockTimestamp) * 1000),
    transactionHash: w.transactionHash,
    module: ModuleEnum.SAVINGS,
    type: TransactionTypeEnum.WITHDRAW,
    token: TOKENS.usds
  }));

  const combined = [...supplies, ...withdraws];
  return combined.sort((a, b) => b.blockTimestamp.getTime() - a.blockTimestamp.getTime());
}

export function useEthereumSavingsHistory({
  subgraphUrl,
  enabled = true
}: {
  subgraphUrl?: string;
  enabled?: boolean;
} = {}): ReadHook & { data?: SavingsHistory } {
  const { address } = useAccount();
  const chainId = useChainId();
  const urlSubgraph = subgraphUrl ? subgraphUrl : getMakerSubgraphUrl(chainId) || '';

  const {
    data,
    error,
    refetch: mutate,
    isLoading
  } = useQuery({
    enabled: Boolean(urlSubgraph) && enabled,
    queryKey: ['savings-history', urlSubgraph, address, chainId],
    queryFn: () => fetchEthereumSavingsHistory(urlSubgraph, address)
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
