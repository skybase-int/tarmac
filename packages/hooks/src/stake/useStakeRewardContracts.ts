import request, { gql } from 'graphql-request';
import { useChainId, useConfig } from 'wagmi';
import { getMakerSubgraphUrl } from '../helpers/getSubgraphUrl';
import { useQuery } from '@tanstack/react-query';
import { TRUST_LEVELS, TrustLevelEnum } from '../constants';
import { ReadHook } from '../hooks';
import { stakeModuleAbi, stakeModuleAddress } from '../generated';
import { readContracts } from '@wagmi/core';
import type { Config } from '@wagmi/core';

// Hardcoded fallback reward contracts (lsSky rewards)
const HARDCODED_REWARD_CONTRACTS: { contractAddress: `0x${string}` }[] = [
  { contractAddress: '0x38E4254bD82ED5Ee97CD1C4278FAae748d998865' }, // lsSkyUsdsReward
  { contractAddress: '0x99cBC0e4E6427F6939536eD24d1275B95ff77404' }, // lsSkySpkReward
  { contractAddress: '0xB44C2Fb4181D7Cb06bdFf34A46FdFe4a259B40Fc' } // lsSkySkyReward
];

// FarmStatus enum: 0 = INACTIVE, 1 = ACTIVE
const FARM_STATUS_ACTIVE = 1;

async function fetchStakeRewardContracts(urlSubgraph: string) {
  const query = gql`
    {
      rewards(where: { stakingEngineActive: true }) {
        id
      }
    }
  `;

  const response = await request<{ rewards: { id: `0x${string}` }[] }>(urlSubgraph, query);
  const parsedRewardContracts = response.rewards;
  if (!parsedRewardContracts) {
    return [];
  }

  return parsedRewardContracts.map(f => ({
    contractAddress: f.id
  }));
}

async function validateHardcodedContracts(config: Config, chainId: number) {
  const moduleAddress = stakeModuleAddress[chainId as keyof typeof stakeModuleAddress];

  if (!moduleAddress) {
    return [];
  }

  // Query farm status for all hardcoded contracts in parallel
  const results = await readContracts(config, {
    contracts: HARDCODED_REWARD_CONTRACTS.map(({ contractAddress }) => ({
      address: moduleAddress,
      abi: stakeModuleAbi,
      functionName: 'farms',
      args: [contractAddress],
      chainId
    }))
  });

  // Filter to only include contracts with ACTIVE status
  return HARDCODED_REWARD_CONTRACTS.filter((_, index) => {
    const result = results[index];
    return result.status === 'success' && Number(result.result) === FARM_STATUS_ACTIVE;
  });
}

export function useStakeRewardContracts({
  subgraphUrl
}: {
  subgraphUrl?: string;
} = {}): ReadHook & { data: { contractAddress: `0x${string}` }[] | undefined } {
  const chainId = useChainId();
  const config = useConfig();
  const urlSubgraph = subgraphUrl ? subgraphUrl : getMakerSubgraphUrl(chainId) || '';

  // Primary query: GraphQL endpoint with hardcoded placeholder
  const {
    data: graphqlData,
    error: graphqlError,
    refetch: mutate,
    isLoading: isGraphqlLoading
  } = useQuery({
    queryKey: ['stakeRewardContracts', urlSubgraph],
    queryFn: () => fetchStakeRewardContracts(urlSubgraph),
    enabled: !!urlSubgraph,
    placeholderData: HARDCODED_REWARD_CONTRACTS
  });

  // Fallback query: On-chain validation (only runs when GraphQL fails)
  const { data: validatedData, isLoading: isValidationLoading } = useQuery({
    queryKey: ['stakeRewardContracts', 'validated', chainId],
    queryFn: () => validateHardcodedContracts(config, chainId),
    enabled: !!graphqlError,
    staleTime: 60000 // Cache for 1 minute
  });

  // Determine which data to return
  const data = graphqlError ? validatedData : graphqlData;
  const isLoading = graphqlError ? isValidationLoading : isGraphqlLoading;

  // Build data sources
  const dataSources = [
    {
      title: 'Sky Ecosystem subgraph',
      href: urlSubgraph,
      onChain: false,
      trustLevel: TRUST_LEVELS[TrustLevelEnum.ONE]
    }
  ];

  // Add on-chain data source if using fallback
  if (graphqlError && validatedData) {
    const moduleAddress = stakeModuleAddress[chainId as keyof typeof stakeModuleAddress];
    dataSources.push({
      title: 'StakeModule.farms (on-chain)',
      href: `https://etherscan.io/address/${moduleAddress}`,
      onChain: true,
      trustLevel: TRUST_LEVELS[TrustLevelEnum.ONE]
    });
  }

  return {
    isLoading,
    data,
    error: graphqlError,
    mutate,
    dataSources
  };
}
