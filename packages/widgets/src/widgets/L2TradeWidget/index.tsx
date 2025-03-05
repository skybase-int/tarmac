import { WidgetProps, WidgetState } from '@widgets/shared/types/widgetState';
import { WidgetContext, WidgetProvider } from '@widgets/context/WidgetContext';
import {
  useTokenBalance,
  TokenForChain,
  usePsmSwapExactIn,
  getTokenDecimals,
  useTokenAllowance,
  psm3L2Address,
  useApproveToken,
  Token,
  useReadSsrAuthOracleGetChi,
  useReadSsrAuthOracleGetRho,
  useReadSsrAuthOracleGetSsr,
  usePsmSwapExactOut,
  tokenForChainToToken,
  usePreviewSwapExactIn,
  usePreviewSwapExactOut,
  ZERO_ADDRESS
} from '@jetstreamgg/hooks';
import { useContext, useEffect, useMemo, useState } from 'react';
import { formatBigInt, getEtherscanLink, math, useDebounce } from '@jetstreamgg/utils';
import { useAccount, useChainId } from 'wagmi';
import { t } from '@lingui/core/macro';
import { notificationTypeMaping, TxStatus, EPOCH_LENGTH } from '@widgets/shared/constants';
import { WidgetContainer } from '@widgets/shared/components/ui/widget/WidgetContainer';
import { SUPPORTED_TOKEN_SYMBOLS, TradeAction, TradeFlow, TradeScreen, TradeSide } from '@widgets/index';
import { getAllowedTargetTokens } from '../TradeWidget/lib/utils';
import { defaultConfig } from '@widgets/config/default-config';
import { useLingui } from '@lingui/react';
import { parseUnits } from 'viem';
import { getValidatedState } from '@widgets/lib/utils';
import { L2TradeInputs } from './components/L2TradeInputs';
import { WidgetButtons } from '@widgets/shared/components/ui/widget/WidgetButtons';
import { useAddTokenToWallet } from '@widgets/shared/hooks/useAddTokenToWallet';
import { ErrorBoundary } from '@widgets/shared/components/ErrorBoundary';
import { AnimatePresence } from 'framer-motion';
import { CardAnimationWrapper } from '@widgets/shared/animation/Wrappers';
import { useNotifyWidgetState } from '@widgets/shared/hooks/useNotifyWidgetState';
import { Heading } from '@widgets/shared/components/ui/Typography';
import { TradeTransactionStatus } from '../TradeWidget/components/TradeTransactionStatus';
import { useTokenImage } from '@widgets/shared/hooks/useTokenImage';

const useMaxInForWithdraw = (
  targetAmount: bigint,
  originToken?: TokenForChain,
  targetToken?: TokenForChain
) => {
  const chainId = useChainId();

  //used to calculate regular withdraw maxIn amount
  const { value } = usePreviewSwapExactOut(
    targetAmount,
    originToken
      ? tokenForChainToToken(originToken, originToken?.address || ZERO_ADDRESS, chainId)
      : undefined,
    targetToken ? tokenForChainToToken(targetToken, targetToken?.address || ZERO_ADDRESS, chainId) : undefined
  );

  return { value };
};

const useMaxOutForDeposit = (
  originAmount: bigint,
  originToken?: TokenForChain,
  targetToken?: TokenForChain
) => {
  const chainId = useChainId();

  const { value } = usePreviewSwapExactIn(
    originAmount,
    originToken
      ? tokenForChainToToken(originToken, originToken?.address || ZERO_ADDRESS, chainId)
      : undefined,
    targetToken ? tokenForChainToToken(targetToken, targetToken?.address || ZERO_ADDRESS, chainId) : undefined
  );

  return { value };
};

export type TradeWidgetProps = WidgetProps & {
  customTokenList?: TokenForChain[];
  disallowedPairs?: Record<string, SUPPORTED_TOKEN_SYMBOLS[]>;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  widgetTitle?: string;
};

export const L2TradeWidget = ({
  onConnect,
  addRecentTransaction,
  locale,
  rightHeaderComponent,
  customTokenList,
  disallowedPairs = defaultConfig.tradeDisallowedPairs,
  externalWidgetState,
  onStateValidated,
  onNotification,
  onWidgetStateChange,
  onCustomNavigation,
  customNavigationLabel,
  onExternalLinkClicked,
  enabled = true,
  referralCode,
  widgetTitle
}: TradeWidgetProps) => {
  return (
    <ErrorBoundary componentName="TradeWidget">
      <WidgetProvider locale={locale}>
        <TradeWidgetWrapped
          onConnect={onConnect}
          addRecentTransaction={addRecentTransaction}
          rightHeaderComponent={rightHeaderComponent}
          customTokenList={customTokenList}
          disallowedPairs={disallowedPairs}
          locale={locale}
          externalWidgetState={externalWidgetState}
          onStateValidated={onStateValidated}
          onNotification={onNotification}
          onWidgetStateChange={onWidgetStateChange}
          customNavigationLabel={customNavigationLabel}
          onCustomNavigation={onCustomNavigation}
          onExternalLinkClicked={onExternalLinkClicked}
          enabled={enabled}
          referralCode={referralCode}
          widgetTitle={widgetTitle}
        />
      </WidgetProvider>
    </ErrorBoundary>
  );
};

function TradeWidgetWrapped({
  onConnect,
  addRecentTransaction,
  rightHeaderComponent,
  customTokenList = [],
  disallowedPairs,
  locale,
  externalWidgetState,
  onStateValidated,
  onNotification,
  onWidgetStateChange,
  onCustomNavigation,
  customNavigationLabel,
  onExternalLinkClicked,
  enabled = true,
  referralCode,
  widgetTitle
}: TradeWidgetProps): React.ReactElement {
  const { mutate: addToWallet } = useAddTokenToWallet();
  const [showAddToken, setShowAddToken] = useState(false);
  const validatedExternalState = getValidatedState(externalWidgetState);

  useEffect(() => {
    onStateValidated?.(validatedExternalState);
  }, [onStateValidated, validatedExternalState]);

  const [lastUpdated, setLastUpdated] = useState<TradeSide>(TradeSide.IN);

  const chainId = useChainId();
  const { address, isConnecting, isConnected } = useAccount();
  const isConnectedAndEnabled = useMemo(() => isConnected && enabled, [isConnected, enabled]);
  const linguiCtx = useLingui();

  const { data: chi } = useReadSsrAuthOracleGetChi();
  const { data: rho } = useReadSsrAuthOracleGetRho();
  const { data: dsr } = useReadSsrAuthOracleGetSsr();

  const [updatedChiForDeposit, setUpdatedChiForDeposit] = useState(0n);

  const tokenList = useMemo(() => {
    const configOriginList = defaultConfig.tradeTokenList[chainId];
    const tokenListToUse = customTokenList.length ? customTokenList : configOriginList;
    const seen = new Set<string>();
    const uniqueTokens = tokenListToUse.filter(token => {
      const duplicate = seen.has(token.symbol);
      if (token.symbol) {
        seen.add(token.symbol);
      }
      return !duplicate;
    });
    return uniqueTokens;
  }, [customTokenList, chainId, defaultConfig.tradeTokenList]);

  const originTokenList = useMemo(() => {
    // We don't include the token if it has no pairs
    return tokenList.filter(
      token => getAllowedTargetTokens(token.symbol, tokenList, disallowedPairs).length > 0
    );
  }, [tokenList, disallowedPairs]);

  const initialOriginTokenIndex = 0;
  const initialOriginToken =
    originTokenList.find(
      token => token.symbol.toLowerCase() === validatedExternalState?.token?.toLowerCase()
    ) || (originTokenList.length ? originTokenList[initialOriginTokenIndex] : undefined);

  const [originToken, setOriginToken] = useState<TokenForChain | undefined>(initialOriginToken);

  const targetTokenList = useMemo(() => {
    return getAllowedTargetTokens(originToken?.symbol || '', tokenList, disallowedPairs);
  }, [originToken?.symbol, tokenList, disallowedPairs]);

  const initialTargetToken = targetTokenList.find(
    token =>
      token.symbol.toLowerCase() === validatedExternalState?.targetToken?.toLowerCase() &&
      token.symbol !== originToken?.symbol
  );
  const [targetToken, setTargetToken] = useState<TokenForChain | undefined>(initialTargetToken);

  const initialOriginAmount = parseUnits(
    validatedExternalState?.amount || '0',
    originToken ? getTokenDecimals(originToken, chainId) : 18
  );

  const [originAmount, setOriginAmount] = useState(initialOriginAmount);
  const debouncedOriginAmount = useDebounce(originAmount);

  const initialTargetAmount = parseUnits(
    validatedExternalState?.amount || '0',
    targetToken ? getTokenDecimals(targetToken, chainId) : 18
  );

  const [targetAmount, setTargetAmount] = useState(initialTargetAmount);
  const debouncedTargetAmount = useDebounce(targetAmount);

  const { value: maxAmountInForWithdraw } = useMaxInForWithdraw(
    debouncedTargetAmount,
    originToken,
    targetToken
  );

  const { value: maxAmountOutForDeposit } = useMaxOutForDeposit(
    debouncedOriginAmount,
    originToken,
    targetToken
  );

  const originTokenAddress = originToken?.address;
  const targetTokenAddress = targetToken?.address;

  const {
    setButtonText,
    setBackButtonText,
    setIsLoading,
    setIsDisabled,
    setTxStatus,
    setExternalLink,
    txStatus,
    widgetState,
    setWidgetState,
    setShowStepIndicator
  } = useContext(WidgetContext);

  useNotifyWidgetState({
    widgetState,
    txStatus,
    targetToken: targetToken?.symbol,
    onWidgetStateChange
  });

  const pairValid = !!originToken && !!targetToken && originToken.symbol !== targetToken.symbol;

  const { data: originBalance, refetch: mutateOriginBalance } = useTokenBalance({
    address,
    token: originTokenAddress,
    chainId
  });

  const isBalanceError = Boolean(
    txStatus === TxStatus.IDLE &&
      originBalance &&
      debouncedOriginAmount > originBalance.value &&
      originAmount !== 0n
  );

  const { data: targetBalance, refetch: mutateTargetBalance } = useTokenBalance({
    address,
    token: targetTokenAddress,
    chainId
  });

  const {
    data: allowance,
    mutate: mutateAllowance,
    isLoading: allowanceLoading
  } = useTokenAllowance({
    chainId,
    contractAddress: originToken?.address as `0x${string}`,
    owner: address,
    spender: psm3L2Address[chainId as keyof typeof psm3L2Address]
  });

  const needsAllowance = !!(!allowance || allowance < debouncedOriginAmount);

  useEffect(() => {
    if (rho && dsr && chi) {
      const timestamp = Math.floor(Date.now() / 1000);
      const elapsedTimeWithEpoch = BigInt(timestamp) + BigInt(EPOCH_LENGTH) - rho;
      const updatedChi = math.updatedChi(dsr, Number(elapsedTimeWithEpoch), chi);

      setUpdatedChiForDeposit(updatedChi);
    }
  }, [rho, dsr, chi]);

  useEffect(() => {
    if (lastUpdated === TradeSide.IN) {
      // stables <-> stables
      if (originToken?.symbol === 'USDS' && targetToken?.symbol === 'USDC') {
        setTargetAmount(math.convertWadtoUSDC(debouncedOriginAmount));
      }
      if (originToken?.symbol === 'USDC' && targetToken?.symbol === 'USDS') {
        setTargetAmount(math.convertUSDCtoWad(debouncedOriginAmount));
      }

      // stables -> sUSDS
      if (originToken?.symbol === 'USDS' && targetToken?.symbol === 'sUSDS')
        setTargetAmount(math.calculateSharesFromAssets(debouncedOriginAmount, updatedChiForDeposit));

      if (originToken?.symbol === 'USDC' && targetToken?.symbol === 'sUSDS')
        setTargetAmount(
          math.roundDownLastTwelveDigits(
            math.calculateSharesFromAssets(math.convertUSDCtoWad(debouncedOriginAmount), updatedChiForDeposit)
          )
        );

      // sUSDS -> stables
      if (
        originToken?.symbol === 'sUSDS' &&
        targetToken?.symbol === 'USDS' &&
        maxAmountOutForDeposit !== undefined &&
        maxAmountOutForDeposit !== 0n
      ) {
        setTargetAmount(maxAmountOutForDeposit);
      }
      if (
        originToken?.symbol === 'sUSDS' &&
        targetToken?.symbol === 'USDC' &&
        maxAmountOutForDeposit !== undefined &&
        maxAmountOutForDeposit !== 0n
      ) {
        setTargetAmount(maxAmountOutForDeposit);
      }
    }

    if (lastUpdated === TradeSide.OUT) {
      // stables <-> stables
      if (originToken?.symbol === 'USDS' && targetToken?.symbol === 'USDC') {
        setOriginAmount(math.convertUSDCtoWad(debouncedTargetAmount));
      }
      if (originToken?.symbol === 'USDC' && targetToken?.symbol === 'USDS') {
        setOriginAmount(math.convertWadtoUSDC(debouncedTargetAmount));
      }

      // stables -> sUSDS
      if (originToken?.symbol === 'USDS' && targetToken?.symbol === 'sUSDS')
        setOriginAmount(math.calculateAssetsFromShares(debouncedTargetAmount, updatedChiForDeposit));

      if (originToken?.symbol === 'USDC' && targetToken?.symbol === 'sUSDS')
        setOriginAmount(
          math.roundUpLastTwelveDigits(
            math.convertWadtoUSDC(math.calculateAssetsFromShares(debouncedTargetAmount, updatedChiForDeposit))
          )
        );

      // sUSDS -> stables
      if (
        originToken?.symbol === 'sUSDS' &&
        targetToken?.symbol === 'USDS' &&
        maxAmountInForWithdraw !== undefined &&
        maxAmountInForWithdraw !== 0n
      ) {
        setOriginAmount(maxAmountInForWithdraw);
      }
      if (
        originToken?.symbol === 'sUSDS' &&
        targetToken?.symbol === 'USDC' &&
        maxAmountInForWithdraw !== undefined &&
        maxAmountInForWithdraw !== 0n
      ) {
        setOriginAmount(maxAmountInForWithdraw);
      }
    }
  }, [
    originToken,
    debouncedOriginAmount,
    targetToken,
    debouncedTargetAmount,
    lastUpdated,
    updatedChiForDeposit,
    maxAmountOutForDeposit,
    maxAmountInForWithdraw
  ]);

  const {
    execute: approveExecute,
    prepareError: approvePrepareError,
    isLoading: approveIsLoading,
    prepared: approvePrepared
  } = useApproveToken({
    amount: debouncedOriginAmount,
    contractAddress: originTokenAddress,
    spender: psm3L2Address[chainId as keyof typeof psm3L2Address],
    onStart: (hash: string) => {
      addRecentTransaction?.({
        hash,
        description: t`Approving ${formatBigInt(debouncedOriginAmount, {
          locale,
          unit: originToken && getTokenDecimals(originToken, chainId)
        })} ${originToken?.symbol ?? ''}`
      });
      setExternalLink(getEtherscanLink(chainId, hash, 'tx'));
      setTxStatus(TxStatus.LOADING);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.LOADING });
    },
    onSuccess: (hash: string) => {
      onNotification?.({
        title: t`Approve successful`,
        description: t`You approved ${originToken?.symbol ?? ''}`,
        status: TxStatus.SUCCESS
      });
      setTxStatus(TxStatus.SUCCESS);
      mutateAllowance();
      retryTradePrepare();
      retryTradeOutPrepare();

      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.SUCCESS });
    },
    onError: (error: Error, hash: string) => {
      onNotification?.({
        title: t`Approval failed`,
        description: t`We could not approve your token allowance.`,
        status: TxStatus.ERROR
      });
      setTxStatus(TxStatus.ERROR);
      mutateAllowance();
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.ERROR });
      console.log(error);
    },
    enabled: widgetState.action === TradeAction.APPROVE && allowance !== undefined && !!originToken
  });

  const {
    execute: tradeExecute,
    retryPrepare: retryTradePrepare,
    prepared: tradePrepared
  } = usePsmSwapExactIn({
    amountIn: debouncedOriginAmount,
    assetIn: originToken?.address as `0x${string}`,
    assetOut: targetToken?.address as `0x${string}`,
    minAmountOut: debouncedTargetAmount,
    onStart: (hash: string) => {
      addRecentTransaction?.({
        hash,
        description: t`Trading ${formatBigInt(debouncedOriginAmount, {
          locale,
          unit: originToken && getTokenDecimals(originToken, chainId)
        })} ${originToken?.symbol ?? ''}`
      });
      setExternalLink(getEtherscanLink(chainId, hash, 'tx'));
      setTxStatus(TxStatus.LOADING);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.LOADING });
    },
    onSuccess: hash => {
      setTxStatus(TxStatus.SUCCESS);
      onNotification?.({
        title: t`Trade successful`,
        description: t`You traded ${formatBigInt(debouncedOriginAmount, {
          locale,
          unit: originToken && getTokenDecimals(originToken, chainId)
        })} ${originToken?.symbol ?? ''} for ${formatBigInt(debouncedTargetAmount, {
          locale,
          unit: targetToken && getTokenDecimals(targetToken, chainId)
        })} ${targetToken?.symbol ?? ''}`,
        status: TxStatus.SUCCESS,
        type: notificationTypeMaping[targetToken?.symbol?.toUpperCase() || 'none']
      });
      setBackButtonText(t`Back to Trade`);
      mutateAllowance();
      mutateOriginBalance();
      mutateTargetBalance();
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.SUCCESS });
      setShowAddToken(true);
    },
    onError: (error, hash) => {
      onNotification?.({
        title: t`Trade failed`,
        description: t`Something went wrong with your transaction. Please try again.`,
        status: TxStatus.ERROR
      });
      setTxStatus(TxStatus.ERROR);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.ERROR });
      console.log(error);
    },
    referralCode: referralCode ? BigInt(referralCode) : undefined,
    enabled: widgetState.action === TradeAction.TRADE && !!(originToken?.address && targetToken?.address)
  });

  const {
    execute: tradeOutExecute,
    retryPrepare: retryTradeOutPrepare,
    prepared: tradeOutPrepared
  } = usePsmSwapExactOut({
    amountOut: debouncedTargetAmount,
    assetIn: originToken?.address as `0x${string}`,
    assetOut: targetToken?.address as `0x${string}`,
    maxAmountIn: originToken?.symbol === 'sUSDS' ? maxAmountInForWithdraw : debouncedOriginAmount,
    onStart: (hash: string) => {
      addRecentTransaction?.({
        hash,
        description: t`Trading ${formatBigInt(debouncedOriginAmount, {
          locale,
          unit: originToken && getTokenDecimals(originToken, chainId)
        })} ${originToken?.symbol ?? ''}`
      });
      setExternalLink(getEtherscanLink(chainId, hash, 'tx'));
      setTxStatus(TxStatus.LOADING);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.LOADING });
    },
    onSuccess: hash => {
      setTxStatus(TxStatus.SUCCESS);
      onNotification?.({
        title: t`Trade successful`,
        description: t`You traded ${formatBigInt(debouncedOriginAmount, {
          locale,
          unit: originToken && getTokenDecimals(originToken, chainId)
        })} ${originToken?.symbol ?? ''} for ${formatBigInt(debouncedTargetAmount, {
          locale,
          unit: targetToken && getTokenDecimals(targetToken, chainId)
        })} ${targetToken?.symbol ?? ''}`,
        status: TxStatus.SUCCESS,
        type: notificationTypeMaping[targetToken?.symbol?.toUpperCase() || 'none']
      });
      setBackButtonText(t`Back to Trade`);
      mutateAllowance();
      mutateOriginBalance();
      mutateTargetBalance();
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.SUCCESS });
      setShowAddToken(true);
    },
    onError: (error, hash) => {
      onNotification?.({
        title: t`Trade failed`,
        description: t`Something went wrong with your transaction. Please try again.`,
        status: TxStatus.ERROR
      });
      setTxStatus(TxStatus.ERROR);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.ERROR });
      console.log(error);
    },
    referralCode: referralCode ? BigInt(referralCode) : undefined,
    enabled: widgetState.action === TradeAction.TRADE && !!(originToken?.address && targetToken?.address)
  });

  const prepareError = approvePrepareError;

  const isAmountWaitingForDebounce =
    debouncedOriginAmount !== originAmount || debouncedTargetAmount !== targetAmount;

  const approveDisabled =
    [TxStatus.INITIALIZED, TxStatus.LOADING].includes(txStatus) ||
    !approvePrepared ||
    isBalanceError ||
    approveIsLoading ||
    !pairValid ||
    (!originToken.isNative && allowance === undefined) ||
    allowanceLoading ||
    (txStatus === TxStatus.SUCCESS && (lastUpdated === TradeSide.OUT ? !tradeOutPrepared : !tradePrepared)) ||
    isAmountWaitingForDebounce ||
    !originAmount ||
    !targetAmount;

  const tradeDisabled =
    [TxStatus.INITIALIZED, TxStatus.LOADING].includes(txStatus) ||
    isBalanceError ||
    !pairValid ||
    (lastUpdated === TradeSide.OUT ? !tradeOutPrepared : !tradePrepared) ||
    (!originToken.isNative && allowance === undefined) ||
    allowanceLoading ||
    isAmountWaitingForDebounce;

  useEffect(() => {
    if (isConnectedAndEnabled) {
      //Initialize the trade flow
      setWidgetState({
        flow: TradeFlow.TRADE,
        action: TradeAction.TRADE,
        screen: TradeScreen.ACTION
      });
    } else {
      // Reset widget state when we are not connected
      setWidgetState({
        flow: null,
        action: null,
        screen: null
      });
    }
  }, [isConnectedAndEnabled]);

  // If we need allowance, set the action to approve
  useEffect(() => {
    if (
      isConnectedAndEnabled &&
      widgetState.flow === TradeFlow.TRADE &&
      widgetState.screen === TradeScreen.ACTION
    ) {
      setWidgetState((prev: WidgetState) => ({
        ...prev,
        action: needsAllowance && !allowanceLoading ? TradeAction.APPROVE : TradeAction.TRADE
      }));
    }
  }, [widgetState.flow, widgetState.screen, needsAllowance, allowanceLoading, isConnectedAndEnabled]);

  // Update button state according to action and tx
  useEffect(() => {
    if (isConnectedAndEnabled) {
      if (widgetState.action === TradeAction.APPROVE && txStatus === TxStatus.SUCCESS) {
        setButtonText(t`Continue`);
      } else if (txStatus === TxStatus.SUCCESS) {
        if (showAddToken) {
          setButtonText(t`Add ${targetToken?.symbol || ''} to wallet`);
          // This should run after adding the token
        } else if (customNavigationLabel && !showAddToken) {
          setButtonText(customNavigationLabel);
        } else {
          setButtonText(t`Back to Trade`);
        }
      } else if (txStatus === TxStatus.ERROR) {
        setButtonText(t`Retry`);
      } else if (widgetState.screen === TradeScreen.ACTION && !targetToken) {
        setButtonText(t`Select a token`);
      } else if (widgetState.screen === TradeScreen.ACTION && originAmount === 0n) {
        setButtonText(t`Enter amount`);
      } else if (widgetState.screen === TradeScreen.ACTION && widgetState.action === TradeAction.APPROVE) {
        setButtonText(t`Approve trade amount`);
      } else if (widgetState.screen === TradeScreen.ACTION && widgetState.action === TradeAction.TRADE) {
        setButtonText(t`Trade`);
      }
    } else {
      setButtonText(t`Connect Wallet`);
    }
  }, [
    txStatus,
    isConnectedAndEnabled,
    customNavigationLabel,
    originAmount,
    linguiCtx,
    widgetState,
    chainId,
    targetToken,
    showAddToken
  ]);

  // set widget button to be disabled depending on which action we're performing
  useEffect(() => {
    setIsDisabled(
      isConnectedAndEnabled &&
        !!(
          (widgetState.action === TradeAction.APPROVE && approveDisabled) ||
          (widgetState.action === TradeAction.TRADE && tradeDisabled)
        )
    );
  }, [isConnectedAndEnabled, approveDisabled, tradeDisabled, widgetState.action]);

  // set isLoading to be consumed by WidgetButton
  useEffect(() => {
    setIsLoading(isConnecting || txStatus === TxStatus.LOADING || txStatus === TxStatus.INITIALIZED);
  }, [isConnecting, txStatus]);

  useEffect(() => {
    setOriginToken(initialOriginToken);
  }, [chainId, initialOriginTokenIndex]);

  useEffect(() => {
    if (targetTokenList.length === 1) {
      // Theres only one token in the list, we select it
      setTargetToken(targetTokenList[0]);
    } else if (!targetTokenList.find(iterable => iterable.symbol === targetToken?.symbol)) {
      // if current target token isn't in the list, set to undefined
      setTargetToken(undefined);
    }
    // do nothing, the current target token is correct
  }, [targetTokenList]);

  useEffect(() => {
    if (prepareError) {
      console.log(prepareError);
      onNotification?.({
        title: t`Error preparing transaction`,
        description: prepareError.message,
        status: TxStatus.ERROR
      });
    }
  }, [prepareError]);

  useEffect(() => {
    setShowStepIndicator(!originToken?.isNative);
  }, [originToken?.isNative]);

  // Reset widget state after switching network
  useEffect(() => {
    // Reset all state variables
    setOriginAmount(initialOriginAmount);
    setTargetAmount(initialTargetAmount);
    setLastUpdated(TradeSide.IN);
    setOriginToken(initialOriginToken);
    setTargetToken(initialTargetToken);
    setTxStatus(TxStatus.IDLE);
    setShowAddToken(false);
    setExternalLink(undefined);

    // Reset widget state to initial screen
    setWidgetState({
      flow: TradeFlow.TRADE,
      action: TradeAction.TRADE,
      screen: TradeScreen.ACTION
    });
  }, [chainId]);

  const approveOnClick = () => {
    setWidgetState((prev: WidgetState) => ({
      ...prev,
      screen: TradeScreen.TRANSACTION
    }));
    setTxStatus(TxStatus.INITIALIZED);
    setExternalLink(undefined);
    approveExecute();
  };

  const tradeOnClick = () => {
    setWidgetState((prev: WidgetState) => ({
      ...prev,
      screen: TradeScreen.TRANSACTION,
      action: TradeAction.TRADE
    }));
    setTxStatus(TxStatus.INITIALIZED);
    setExternalLink(undefined);
    const executeFunction = lastUpdated === TradeSide.OUT ? tradeOutExecute : tradeExecute;
    executeFunction();
  };

  const nextOnClick = () => {
    setTxStatus(TxStatus.IDLE);

    // After a successful trade, reset the origin amount
    if (widgetState.action !== TradeAction.APPROVE) {
      setOriginAmount(0n);
      setTargetAmount(0n);
      setOriginToken(initialOriginToken);
      setTargetToken(initialTargetToken);
    }

    if (widgetState.action === TradeAction.APPROVE && !needsAllowance) {
      // If we just finished approving, we want to go directly to the next action
      return tradeOnClick();
    }

    setWidgetState((prev: WidgetState) => ({
      ...prev,
      action: needsAllowance ? TradeAction.APPROVE : TradeAction.TRADE,
      screen: TradeScreen.ACTION
    }));
  };

  const onClickBack = () => {
    if (widgetState.action === TradeAction.TRADE && txStatus === TxStatus.SUCCESS) {
      // If success trade we restart the flow
      nextOnClick();
    } else {
      setTxStatus(TxStatus.IDLE);
      setWidgetState((prev: WidgetState) => ({
        ...prev,
        screen: TradeScreen.ACTION
      }));
    }
  };

  const baseUrl = window.location.origin;
  const imgSrc = useTokenImage(targetToken?.symbol || '');

  const onAddToken = () => {
    if (targetToken && targetToken?.symbol && targetToken?.address) {
      // add currency to wallet
      addToWallet({
        type: 'ERC20',
        options: {
          address: targetToken.address,
          decimals: getTokenDecimals(targetToken, chainId),
          symbol: targetToken.symbol,
          ...(baseUrl && imgSrc && { image: `${baseUrl}/${imgSrc}` })
        }
      });

      // If we have a custom navigation label, leave the state as-is to proceed with custom navigation
      if (!customNavigationLabel) {
        // clear inputs and reset tx and widget state
        setOriginAmount(0n);
        setTargetAmount(0n);
        setOriginToken(initialOriginToken);
        setTargetToken(initialTargetToken);
        setTxStatus(TxStatus.IDLE);
        setWidgetState({
          flow: TradeFlow.TRADE,
          action: TradeAction.TRADE,
          screen: TradeScreen.ACTION
        });
      }
      setShowAddToken(false);
    }
  };

  // Handle the error onClicks separately to keep it clean
  const errorOnClick = () => {
    return widgetState.action === TradeAction.TRADE
      ? tradeOnClick
      : widgetState.action === TradeAction.APPROVE
        ? approveOnClick
        : undefined;
  };

  const onClickAction = !isConnectedAndEnabled
    ? onConnect
    : widgetState.action === TradeAction.TRADE && txStatus === TxStatus.SUCCESS && showAddToken
      ? onAddToken
      : txStatus === TxStatus.SUCCESS && customNavigationLabel
        ? onCustomNavigation
        : txStatus === TxStatus.SUCCESS
          ? nextOnClick
          : txStatus === TxStatus.ERROR
            ? errorOnClick
            : widgetState.action === TradeAction.APPROVE
              ? approveOnClick
              : widgetState.action === TradeAction.TRADE
                ? tradeOnClick
                : undefined;

  const showSecondaryButton =
    !!customNavigationLabel ||
    txStatus === TxStatus.ERROR ||
    (widgetState.action === TradeAction.TRADE && txStatus === TxStatus.SUCCESS) ||
    // After a successful approve transaction, show the back button
    (txStatus === TxStatus.SUCCESS &&
      widgetState.action === TradeAction.APPROVE &&
      widgetState.screen === TradeScreen.TRANSACTION);

  return (
    <WidgetContainer
      header={<Heading variant="x-large">{widgetTitle || 'Trade'}</Heading>}
      rightHeader={rightHeaderComponent}
      footer={
        <WidgetButtons
          onClickAction={onClickAction}
          onClickBack={onClickBack}
          showSecondaryButton={showSecondaryButton}
          enabled={enabled}
          onExternalLinkClicked={onExternalLinkClicked}
        />
      }
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {originToken && targetToken && txStatus !== TxStatus.IDLE ? (
          <CardAnimationWrapper key="widget-transaction-status">
            <TradeTransactionStatus
              originToken={originToken as Token}
              originAmount={originAmount}
              targetToken={targetToken as Token}
              targetAmount={targetAmount}
              isEthFlow={false}
              onExternalLinkClicked={onExternalLinkClicked}
            />
          </CardAnimationWrapper>
        ) : (
          <CardAnimationWrapper key="widget-inputs">
            <L2TradeInputs
              setOriginAmount={setOriginAmount}
              onOriginInputChange={newValue => {
                setOriginAmount(newValue);
              }}
              onOriginInputInput={() => {
                setLastUpdated(TradeSide.IN);
              }}
              originAmount={originAmount}
              originBalance={originBalance}
              originToken={originToken}
              targetBalance={targetToken ? targetBalance : undefined}
              targetToken={targetToken}
              setOriginToken={setOriginToken}
              setTargetToken={setTargetToken}
              setTargetAmount={setTargetAmount}
              onTargetInputChange={newValue => {
                setTargetAmount(newValue);
              }}
              onTargetInputInput={() => {
                setLastUpdated(TradeSide.OUT);
              }}
              onUserSwitchTokens={() => {
                setLastUpdated(prevValue => (prevValue === TradeSide.IN ? TradeSide.OUT : TradeSide.IN));
              }}
              targetAmount={targetAmount}
              originTokenList={originTokenList}
              targetTokenList={targetTokenList}
              isBalanceError={isBalanceError}
              canSwitchTokens={true}
              isConnectedAndEnabled={isConnectedAndEnabled}
            />
          </CardAnimationWrapper>
        )}
      </AnimatePresence>
    </WidgetContainer>
  );
}
