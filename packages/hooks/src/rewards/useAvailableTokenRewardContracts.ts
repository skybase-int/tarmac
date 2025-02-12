import { useMemo } from 'react';
import { RewardContract } from './rewards';
import { cleRewardAddress, usdsSkyRewardAddress } from '../generated';
import { TOKENS } from '../tokens/tokens.constants';

// Returns the available reward contracts for the current chainId

export function useAvailableTokenRewardContracts(chainId: number) {
  const rewardContracts: RewardContract[] = useMemo(() => {
    return [
      {
        supplyToken: TOKENS.usds,
        rewardToken: TOKENS.sky,
        contractAddress: usdsSkyRewardAddress[chainId as keyof typeof usdsSkyRewardAddress],
        chainId: chainId,
        name: 'With: USDS Get: SKY',
        description: 'Supply USDS, get SKY',
        externalLink: 'https://usds.sky',
        logo: 'https://via.placeholder.com/400x400/04d19a/ffffff?text=SKY',
        featured: true
      },
      {
        supplyToken: TOKENS.usds,
        rewardToken: TOKENS.cle,
        contractAddress: cleRewardAddress[chainId as keyof typeof cleRewardAddress],
        chainId: chainId,
        name: 'Chronicle Points',
        description: 'Supply USDS, get CLE',
        externalLink: 'https://usds.sky',
        logo: 'https://via.placeholder.com/400x400/04d19a/9CD33B?text=CLE'
      }
    ];
  }, [chainId]);

  return rewardContracts;
}
