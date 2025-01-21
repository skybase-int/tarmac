import { useBalance, useReadContracts } from 'wagmi';
import { erc20Abi, formatUnits } from 'viem';
import type { ReadContractsErrorType, GetBalanceErrorType } from '@wagmi/core';

type UseTokenBalanceParameters = {
  address?: `0x${string}`;
  token?: `0x${string}`;
  chainId?: number;
  isNative?: boolean;
  enabled?: boolean;
};

type TokenItem = {
  address?: `0x${string}`;
  isNative?: boolean;
  symbol: string;
};

type UseTokenBalancesParameters = {
  address?: `0x${string}`;
  tokens: TokenItem[];
  chainId?: number;
  enabled?: boolean;
};

export type TokenBalance = {
  value: bigint;
  decimals: number;
  formatted: string;
  symbol?: string;
};

type TokenBalanceRequiredSymbol = {
  value: bigint;
  decimals: number;
  formatted: string;
  symbol: string;
};

type UseTokenBalanceReturnType = {
  data?: TokenBalance;
  refetch: () => void;
  isLoading: boolean;
  error: GetBalanceErrorType | ReadContractsErrorType | null;
};

type UseTokenBalancesReturnType = {
  data?: TokenBalanceRequiredSymbol[];
  refetch: () => void;
  isLoading: boolean;
  error: GetBalanceErrorType | ReadContractsErrorType | null;
};

export function useTokenBalance({
  address,
  token,
  isNative = false,
  chainId,
  enabled = true
}: UseTokenBalanceParameters): UseTokenBalanceReturnType {
  const {
    data: tokenResultData,
    refetch: refetchTokenResult,
    isLoading: isTokenResultLoading,
    error: tokenResultError
  } = useReadContracts({
    contracts: [
      {
        address: token,
        abi: erc20Abi,
        chainId,
        functionName: 'balanceOf',
        args: address ? [address] : undefined
      },
      {
        address: token,
        abi: erc20Abi,
        chainId,
        functionName: 'decimals'
      }
    ],
    allowFailure: false,
    query: {
      enabled: enabled && !!address && !!token && !isNative
    }
  });

  const {
    data: nativeResultData,
    refetch: refetchNativeResult,
    isLoading: isNativeResultLoading,
    error: nativeResultError
  } = useBalance({
    address,
    chainId,
    query: { enabled: enabled && isNative }
  });

  return {
    data: isNative
      ? nativeResultData
      : tokenResultData
        ? {
            value: tokenResultData[0],
            decimals: tokenResultData[1],
            formatted: formatUnits(tokenResultData[0], tokenResultData[1])
          }
        : undefined,
    refetch: isNative ? refetchNativeResult : refetchTokenResult,
    isLoading: isNativeResultLoading || isTokenResultLoading,
    error: nativeResultError || tokenResultError
  };
}

//takes in an array of tokens
export function useTokenBalances({
  address,
  tokens,
  chainId,
  enabled = true
}: UseTokenBalancesParameters): UseTokenBalancesReturnType {
  const nonNativeTokens = tokens.filter(tokenItem => !tokenItem.isNative);
  const nativeToken = tokens.find(tokenItem => tokenItem.isNative) || null;
  const {
    data: tokenResultData,
    refetch: refetchTokenResult,
    isLoading: isTokenResultLoading,
    error: tokenResultError
  } = useReadContracts({
    contracts: nonNativeTokens
      .map(tokenItem => [
        {
          address: tokenItem.address,
          abi: erc20Abi,
          chainId,
          functionName: 'balanceOf',
          args: address ? [address] : undefined
        },
        {
          address: tokenItem.address,
          abi: erc20Abi,
          chainId,
          functionName: 'decimals'
        }
      ])
      .flat(),
    allowFailure: false,
    query: {
      enabled: enabled && !!address && nonNativeTokens.length > 0
    }
  });

  const formattedTokenResultData = tokenResultData?.reduce<TokenBalance[]>((acc, _, index, array) => {
    if (index % 2 === 0) {
      const tokenIndex = index / 2;
      const tokenItem = nonNativeTokens[tokenIndex];
      acc.push({
        value: array[index] as bigint,
        decimals: array[index + 1] as number,
        formatted: formatUnits(tokenResultData[index] as bigint, tokenResultData[index + 1] as number),
        symbol: tokenItem.symbol
      });
    }
    return acc;
  }, []);

  const {
    data: nativeResultData,
    refetch: refetchNativeResult,
    isLoading: isNativeResultLoading,
    error: nativeResultError
  } = useBalance({
    address,
    chainId,
    query: { enabled: enabled && !!nativeToken }
  });

  const nativeResultWithSymbol =
    nativeToken && nativeResultData
      ? {
          ...nativeResultData,
          symbol: nativeToken.symbol
        }
      : null;

  //if one of the tokens is an eth token, then the eth balance will be appended at the end of the array
  //TODO: should maybe update to return tokens in order they were inputted
  return {
    data:
      formattedTokenResultData || nativeResultWithSymbol
        ? ([
            ...(formattedTokenResultData || []),
            ...(nativeResultWithSymbol ? [nativeResultWithSymbol] : [])
          ] as TokenBalanceRequiredSymbol[])
        : undefined,
    refetch: async () => {
      await Promise.all([refetchTokenResult(), refetchNativeResult()]);
    },
    isLoading: isNativeResultLoading || isTokenResultLoading,
    error: nativeResultError || tokenResultError
  };
}
