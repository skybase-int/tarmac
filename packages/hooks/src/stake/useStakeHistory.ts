import { request, gql } from 'graphql-request';
import { ReadHook } from '../hooks';
import { TRUST_LEVELS, TrustLevelEnum, ModuleEnum, TransactionTypeEnum } from '../constants';
import { getMakerSubgraphUrl } from '../helpers/getSubgraphUrl';
import {
  BaseStakeHistoryItem,
  StakeHistoryItemWithAmount,
  StakeSelectDelegate,
  StakeSelectReward,
  StakeClaimReward,
  StakeHistory,
  BaseStakeHistoryItemResponse,
  StakeSelectDelegateResponse,
  StakeSelectRewardResponse,
  StakeHistoryKick
} from './stakeModule';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { isTestnetId, chainId as chainIdMap } from '@jetstreamgg/utils';

async function fetchStakeHistory(
  urlSubgraph: string,
  chainId: number,
  address?: string,
  index?: number
): Promise<StakeHistory | undefined> {
  if (!address) return [];
  const indexQuery = index ? `, index: "${index}"` : '';
  // TODO: Update this query when the stake module is deployed and subgraph is updated
  const query = gql`
    {
      sealOpens(where: {owner: "${address}"${indexQuery}}) {
        index
        blockTimestamp
        transactionHash
      }
      sealSelectVoteDelegates(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        index
        voteDelegate {
          id
        }
        blockTimestamp
        transactionHash
      }
      sealSelectRewards(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        index
        reward {
          id
        }
        blockTimestamp
        transactionHash
      }
      sealLocks(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        index
        wad
        blockTimestamp
        transactionHash
      }
      sealLockSkies(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        index
        wad
        blockTimestamp
        transactionHash
      }
      sealFrees(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        index
        freed
        blockTimestamp
        transactionHash
      }
      sealFreeSkies(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        index
        skyFreed
        blockTimestamp
        transactionHash
      }
      sealDraws(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        index
        wad
        blockTimestamp
        transactionHash
      }
      sealWipes(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        index
        wad
        blockTimestamp
        transactionHash
      }
      sealGetRewards(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        index
        reward
        amt
        blockTimestamp
        transactionHash
      }
      sealOnKicks(where: { urn_: {owner: "${address}"${indexQuery}}}) {
        id
        wad
        blockTimestamp
        transactionHash
        urn {
          id
        }
      }
    }
  `;

  const response = (await request(urlSubgraph, query)) as any;

  const opens: BaseStakeHistoryItem[] = response.sealOpens.map((e: BaseStakeHistoryItemResponse) => ({
    urnIndex: +e.index,
    blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
    transactionHash: e.transactionHash,
    module: ModuleEnum.STAKE,
    type: TransactionTypeEnum.STAKE_OPEN,
    chainId
  }));

  const selectVoteDelegates: StakeSelectDelegate[] = response.sealSelectVoteDelegates.map(
    (e: StakeSelectDelegateResponse) => ({
      urnIndex: +e.index,
      delegate: e.voteDelegate?.id || '',
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.STAKE,
      type: TransactionTypeEnum.STAKE_SELECT_DELEGATE,
      chainId
    })
  );

  const selectRewards: StakeSelectReward[] = response.sealSelectRewards.map(
    (e: StakeSelectRewardResponse) => ({
      urnIndex: +e.index,
      rewardContract: e.reward?.id || '',
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.STAKE,
      type: TransactionTypeEnum.STAKE_SELECT_REWARD,
      chainId
    })
  );

  const stakes: StakeHistoryItemWithAmount[] = response.sealLocks.map(
    (e: BaseStakeHistoryItemResponse & { wad: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.wad),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.STAKE,
      type: TransactionTypeEnum.STAKE,
      chainId
    })
  );

  const unstakes: StakeHistoryItemWithAmount[] = response.sealFrees.map(
    (e: BaseStakeHistoryItemResponse & { freed: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.freed),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.STAKE,
      type: TransactionTypeEnum.UNSTAKE,
      chainId
    })
  );

  const borrows: StakeHistoryItemWithAmount[] = response.sealDraws.map(
    (e: BaseStakeHistoryItemResponse & { wad: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.wad),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.STAKE,
      type: TransactionTypeEnum.STAKE_BORROW,
      chainId
    })
  );

  const repays: StakeHistoryItemWithAmount[] = response.sealWipes.map(
    (e: BaseStakeHistoryItemResponse & { wad: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.wad),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.STAKE,
      type: TransactionTypeEnum.STAKE_REPAY,
      chainId
    })
  );

  const rewards: StakeClaimReward[] = response.sealGetRewards.map(
    (e: BaseStakeHistoryItemResponse & { reward: string; amt: string }) => ({
      urnIndex: +e.index,
      rewardContract: e.reward,
      amount: BigInt(e.amt),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.STAKE,
      type: TransactionTypeEnum.STAKE_REWARD,
      chainId
    })
  );

  const kicks: StakeHistoryKick[] = response.sealOnKicks.map(
    (e: BaseStakeHistoryItemResponse & { wad: string; urn: { id: string } }) => ({
      amount: BigInt(e.wad),
      urnAddress: e.urn.id,
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.STAKE,
      type: TransactionTypeEnum.UNSTAKE_KICK,
      chainId
    })
  );

  const combined = [
    ...opens,
    ...selectVoteDelegates,
    ...selectRewards,
    ...stakes,
    ...unstakes,
    ...borrows,
    ...repays,
    ...rewards,
    ...kicks
  ];
  return combined.sort((a, b) => b.blockTimestamp.getTime() - a.blockTimestamp.getTime());
}

export function useStakeHistory({
  subgraphUrl,
  index
}: {
  subgraphUrl?: string;
  index?: number;
} = {}): ReadHook & { data?: StakeHistory } {
  const { address } = useAccount();
  const currentChainId = useChainId();
  const urlSubgraph = subgraphUrl ? subgraphUrl : getMakerSubgraphUrl(currentChainId) || '';
  const chainIdToUse = isTestnetId(currentChainId) ? chainIdMap.tenderly : chainIdMap.mainnet;

  const {
    data,
    error,
    refetch: mutate,
    isLoading
  } = useQuery({
    enabled: Boolean(urlSubgraph),
    queryKey: ['stake-history', urlSubgraph, address, index, chainIdToUse],
    queryFn: () => fetchStakeHistory(urlSubgraph, chainIdToUse, address, index)
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
