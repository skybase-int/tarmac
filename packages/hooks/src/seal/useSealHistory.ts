import { request, gql } from 'graphql-request';
import { ReadHook } from '../hooks';
import { TRUST_LEVELS, TrustLevelEnum, ModuleEnum, TransactionTypeEnum } from '../constants';
import { getMakerSubgraphUrl } from '../helpers/getSubgraphUrl';
import {
  BaseSealHistoryItem,
  SealHistoryItemWithAmount,
  SealSelectDelegate,
  SealSelectReward,
  SealClaimReward,
  SealHistory,
  BaseSealHistoryItemResponse,
  SealSelectDelegateResponse,
  SealSelectRewardResponse,
  SealHistoryKick
} from './sealModule';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';

async function fetchSealHistory(
  urlSubgraph: string,
  address?: string,
  index?: number
): Promise<SealHistory | undefined> {
  if (!address) return [];
  const indexQuery = index ? `, index: "${index}"` : '';
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

  const opens: BaseSealHistoryItem[] = response.sealOpens.map((e: BaseSealHistoryItemResponse) => ({
    urnIndex: +e.index,
    blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
    transactionHash: e.transactionHash,
    module: ModuleEnum.SEAL,
    type: TransactionTypeEnum.OPEN
  }));

  const selectVoteDelegates: SealSelectDelegate[] = response.sealSelectVoteDelegates.map(
    (e: SealSelectDelegateResponse) => ({
      urnIndex: +e.index,
      delegate: e.voteDelegate?.id || '',
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.SEAL,
      type: TransactionTypeEnum.SELECT_DELEGATE
    })
  );

  const selectRewards: SealSelectReward[] = response.sealSelectRewards.map((e: SealSelectRewardResponse) => ({
    urnIndex: +e.index,
    rewardContract: e.reward?.id || '',
    blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
    transactionHash: e.transactionHash,
    module: ModuleEnum.SEAL,
    type: TransactionTypeEnum.SELECT_REWARD
  }));

  const seals: SealHistoryItemWithAmount[] = response.sealLocks.map(
    (e: BaseSealHistoryItemResponse & { wad: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.wad),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.SEAL,
      type: TransactionTypeEnum.SEAL
    })
  );

  const sealSkies: SealHistoryItemWithAmount[] = response.sealLockSkies.map(
    (e: BaseSealHistoryItemResponse & { wad: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.wad),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.SEAL,
      type: TransactionTypeEnum.SEAL_SKY
    })
  );

  const unseals: SealHistoryItemWithAmount[] = response.sealFrees.map(
    (e: BaseSealHistoryItemResponse & { freed: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.freed),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.SEAL,
      type: TransactionTypeEnum.UNSEAL
    })
  );

  const unsealSkies: SealHistoryItemWithAmount[] = response.sealFreeSkies.map(
    (e: BaseSealHistoryItemResponse & { skyFreed: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.skyFreed),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.SEAL,
      type: TransactionTypeEnum.UNSEAL_SKY
    })
  );

  const borrows: SealHistoryItemWithAmount[] = response.sealDraws.map(
    (e: BaseSealHistoryItemResponse & { wad: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.wad),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.SEAL,
      type: TransactionTypeEnum.BORROW
    })
  );

  const repays: SealHistoryItemWithAmount[] = response.sealWipes.map(
    (e: BaseSealHistoryItemResponse & { wad: string }) => ({
      urnIndex: +e.index,
      amount: BigInt(e.wad),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.SEAL,
      type: TransactionTypeEnum.REPAY
    })
  );

  const rewards: SealClaimReward[] = response.sealGetRewards.map(
    (e: BaseSealHistoryItemResponse & { reward: string; amt: string }) => ({
      urnIndex: +e.index,
      rewardContract: e.reward,
      amount: BigInt(e.amt),
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.SEAL,
      type: TransactionTypeEnum.SEAL_REWARD
    })
  );

  const kicks: SealHistoryKick[] = response.sealOnKicks.map(
    (e: BaseSealHistoryItemResponse & { wad: string; urn: { id: string } }) => ({
      amount: BigInt(e.wad),
      urnAddress: e.urn.id,
      blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
      transactionHash: e.transactionHash,
      module: ModuleEnum.SEAL,
      type: TransactionTypeEnum.UNSEAL_KICK
    })
  );

  const combined = [
    ...opens,
    ...selectVoteDelegates,
    ...selectRewards,
    ...seals,
    ...sealSkies,
    ...unseals,
    ...unsealSkies,
    ...borrows,
    ...repays,
    ...rewards,
    ...kicks
  ];
  return combined.sort((a, b) => b.blockTimestamp.getTime() - a.blockTimestamp.getTime());
}

export function useSealHistory({
  subgraphUrl,
  index
}: {
  subgraphUrl?: string;
  index?: number;
} = {}): ReadHook & { data?: SealHistory } {
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
    queryKey: ['seal-history', urlSubgraph, address, index, chainId],
    queryFn: () => fetchSealHistory(urlSubgraph, address, index)
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
