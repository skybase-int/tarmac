import { useMemo } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { useTokenBalance } from '../tokens/useTokenBalance';
import { usdsAddress, stUsdsAddress, useReadStUsds } from '../generated';
import { TRUST_LEVELS, TrustLevelEnum } from '../constants';
import { DataSource, ReadHook } from '../hooks';
import { getEtherscanLink } from '@jetstreamgg/sky-utils';

export type StUsdsHookData = {
  totalAssets: bigint;
  totalSupply: bigint;
  assetPerShare: bigint;
  availableLiquidity: bigint;
  userStUsdsBalance: bigint;
  userUsdsBalance: bigint;
  userSuppliedUsds: bigint;
  userMaxDeposit: bigint;
  userMaxWithdraw: bigint;
  moduleRate: bigint;
  chi: bigint;
  cap: bigint;
  line: bigint;
};

export type StUsdsHook = ReadHook & {
  data?: StUsdsHookData;
};

export function useStUsdsData(address?: `0x${string}`): StUsdsHook {
  const chainId = useChainId();
  const { address: connectedAddress } = useAccount();
  const acct = address || connectedAddress;

  const { data: totalAssets } = useReadStUsds({
    functionName: 'totalAssets',
    chainId: chainId as keyof typeof useReadStUsds
  });

  const { data: totalSupply } = useReadStUsds({
    functionName: 'totalSupply',
    chainId: chainId as keyof typeof useReadStUsds
  });

  const { data: cap } = useReadStUsds({
    functionName: 'cap',
    chainId: chainId as keyof typeof useReadStUsds
  });

  const { data: line } = useReadStUsds({
    functionName: 'line',
    chainId: chainId as keyof typeof useReadStUsds
  });

  const { data: ysr } = useReadStUsds({
    functionName: 'ysr',
    chainId: chainId as keyof typeof useReadStUsds
  });

  const { data: chi } = useReadStUsds({
    functionName: 'chi',
    chainId: chainId as keyof typeof useReadStUsds
  });

  const { data: userStUsdsBalance } = useReadStUsds({
    functionName: 'balanceOf',
    args: [acct || '0x0'],
    chainId: chainId as keyof typeof useReadStUsds,
    query: { enabled: !!acct }
  });

  const { data: userMaxDeposit } = useReadStUsds({
    functionName: 'maxDeposit',
    args: [acct || '0x0'],
    chainId: chainId as keyof typeof useReadStUsds,
    query: { enabled: !!acct }
  });

  const { data: userMaxWithdraw } = useReadStUsds({
    functionName: 'maxWithdraw',
    args: [acct || '0x0'],
    chainId: chainId as keyof typeof useReadStUsds,
    query: { enabled: !!acct }
  });

  const { data: userUsdsBalance } = useTokenBalance({
    address: acct,
    chainId: chainId as keyof typeof useReadStUsds,
    token: usdsAddress[chainId as keyof typeof usdsAddress]
  });

  // Get vault's USDS balance (available liquidity)
  const stUsdsContractAddress = stUsdsAddress[chainId as keyof typeof stUsdsAddress];
  const { data: vaultUsdsBalance } = useTokenBalance({
    address: stUsdsContractAddress,
    chainId: chainId,
    token: usdsAddress[chainId as keyof typeof usdsAddress]
  });

  const assetPerShare = useMemo(() => {
    const assets = totalAssets as bigint;
    const supply = totalSupply as bigint;
    if (!assets || !supply || supply === 0n) return 0n;
    return (assets * 10n ** 18n) / supply;
  }, [totalAssets, totalSupply]);

  const userSuppliedUsds = useMemo(() => {
    const balance = userStUsdsBalance as bigint;
    const assets = totalAssets as bigint;
    const supply = totalSupply as bigint;
    if (!balance || balance === 0n) return 0n;
    if (assets && supply && supply > 0n) {
      return (balance * assets) / supply;
    }
    return balance;
  }, [userStUsdsBalance, totalAssets, totalSupply]);

  const data: StUsdsHookData = {
    totalAssets: (totalAssets as bigint) || 0n,
    totalSupply: (totalSupply as bigint) || 0n,
    assetPerShare,
    availableLiquidity: vaultUsdsBalance?.value || 0n,
    userStUsdsBalance: (userStUsdsBalance as bigint) || 0n,
    userUsdsBalance: userUsdsBalance?.value || 0n,
    userSuppliedUsds,
    userMaxDeposit: (userMaxDeposit as bigint) || 0n,
    userMaxWithdraw: (userMaxWithdraw as bigint) || 0n,
    moduleRate: (ysr as bigint) || 0n,
    chi: (chi as bigint) || 0n,
    cap: (cap as bigint) || 0n,
    line: (line as bigint) || 0n
  };

  const dataSources: DataSource[] = [
    {
      title: 'stUSDS Contract',
      onChain: true,
      href: getEtherscanLink(chainId, stUsdsAddress[chainId as keyof typeof stUsdsAddress], 'address'),
      trustLevel: TRUST_LEVELS[TrustLevelEnum.ZERO]
    }
  ];

  return {
    isLoading: false, // update with actual loading conditions
    error: null, // update with actual error conditions
    data,
    mutate: () => {}, // implement if needed
    dataSources
  };
}
