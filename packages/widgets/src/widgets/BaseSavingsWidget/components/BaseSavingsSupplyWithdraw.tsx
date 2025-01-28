import React from 'react';
import { WidgetProps } from '@/shared/types/widgetState';
import { VStack } from '@/shared/components/ui/layout/VStack';
import { TokenInput } from '@/shared/components/ui/token/TokenInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Token, useOverallSkyData, getTokenDecimals } from '@jetstreamgg/hooks';
import { TransactionOverview } from '@/shared/components/ui/transaction/TransactionOverview';
import { t } from '@lingui/core/macro';
import { motion } from 'framer-motion';
import { positionAnimations } from '@/shared/animation/presets';
import { BaseSavingsStatsCard } from './BaseSavingsStatsCard';
import { formatBigInt, formatDecimalPercentage } from '@jetstreamgg/utils';
import { useChainId } from 'wagmi';

type Props = WidgetProps & {
  leftTabTitle: string;
  rightTabTitle: string;
  originAmount: bigint;
  originBalance: bigint;
  originToken: Token;
  originOptions?: Token[];
  convertedBalance?: {
    value: bigint;
    formatted: string;
  };
  tabIndex: 0 | 1;
  error?: boolean;
  onToggle: (number: 0 | 1) => void;
  onOriginInputChange: (val: bigint) => void;
  onMenuItemChange?: (token: Token) => void;
  isConnectedAndEnabled: boolean;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  setMaxWithdraw?: (val: boolean) => void;
};

export function BaseSavingsSupplyWithdraw({
  leftTabTitle,
  rightTabTitle,
  originToken,
  originOptions,
  originAmount,
  originBalance,
  convertedBalance,
  tabIndex,
  error,
  onToggle,
  onOriginInputChange,
  onMenuItemChange,
  onExternalLinkClicked,
  setMaxWithdraw,
  isConnectedAndEnabled = true
}: Props): React.ReactElement {
  const { data: overallSkyData } = useOverallSkyData();
  const chainId = useChainId();
  const skySavingsRatecRate = overallSkyData?.skySavingsRatecRate
    ? formatDecimalPercentage(parseFloat(overallSkyData.skySavingsRatecRate))
    : '0%';

  const finalBalance =
    tabIndex === 0 ? (originBalance || 0n) - originAmount : (originBalance || 0n) + originAmount;
  const finalSavingsBalance =
    tabIndex === 0
      ? (convertedBalance?.value || 0n) + originAmount
      : (convertedBalance?.value || 0n) - originAmount;

  return (
    <VStack className="w-full items-center justify-center">
      <Tabs defaultValue={tabIndex === 0 ? 'left' : 'right'} className="w-full">
        <motion.div variants={positionAnimations}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              position="left"
              data-testid="upgrade-toggle-left"
              value="left"
              onClick={() => onToggle(0)}
            >
              {leftTabTitle}
            </TabsTrigger>
            <TabsTrigger
              position="right"
              data-testid="upgrade-toggle-right"
              value="right"
              onClick={() => onToggle(1)}
            >
              {rightTabTitle}
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <motion.div variants={positionAnimations}>
          <BaseSavingsStatsCard
            isConnectedAndEnabled={isConnectedAndEnabled}
            onExternalLinkClicked={onExternalLinkClicked}
            convertedBalance={convertedBalance}
            originToken={originToken}
          />
        </motion.div>

        <VStack className="w-full" gap={0}>
          <TabsContent value="left">
            <motion.div className="flex w-full flex-col" variants={positionAnimations}>
              <TokenInput
                className="w-full"
                label={t`How much ${originToken?.symbol} would you like to supply?`}
                placeholder={t`Enter amount`}
                token={originToken}
                tokenList={originOptions || []}
                balance={originBalance}
                onChange={onOriginInputChange}
                onTokenSelected={token => {
                  onMenuItemChange?.(token as Token);
                }}
                value={originAmount}
                dataTestId="base-savings-suuply-input"
                error={error ? t`Insufficient funds` : undefined}
                showPercentageButtons={isConnectedAndEnabled}
                enabled={isConnectedAndEnabled}
              />
            </motion.div>
          </TabsContent>
          <TabsContent value="right">
            <motion.div className="flex w-full flex-col" variants={positionAnimations}>
              <TokenInput
                className="w-full"
                token={originToken}
                balance={convertedBalance?.value}
                onChange={onOriginInputChange}
                value={originAmount}
                dataTestId="base-savings-withdraw-input"
                label={t`How much ${originToken?.symbol} would you like to withdraw?`}
                tokenList={originOptions || []}
                onTokenSelected={token => {
                  onMenuItemChange?.(token as Token);
                }}
                error={error ? t`Insufficient funds` : undefined}
                showPercentageButtons={isConnectedAndEnabled}
                enabled={isConnectedAndEnabled}
                onSetMax={setMaxWithdraw}
              />
            </motion.div>
          </TabsContent>
          {!!originAmount && !error && (
            <motion.div variants={positionAnimations}>
              <TransactionOverview
                title={t`Transaction overview`}
                isFetching={false}
                fetchingMessage={t`Fetching transaction details`}
                transactionData={[
                  {
                    label: tabIndex === 0 ? t`You will supply` : t`You will withdraw`,
                    value: `${formatBigInt(originAmount, {
                      maxDecimals: 2,
                      unit: getTokenDecimals(originToken, chainId)
                    })} ${originToken?.symbol}`
                  },
                  ...(isConnectedAndEnabled
                    ? [
                        ...(tabIndex === 0
                          ? [
                              {
                                label: t`Rate`,
                                value: skySavingsRatecRate
                              }
                            ]
                          : []),
                        {
                          label: t`Your wallet ${originToken?.symbol} balance will be`,
                          value: `${formatBigInt(finalBalance, { maxDecimals: 2, unit: getTokenDecimals(originToken, chainId) })} ${originToken?.symbol}`
                        },
                        {
                          label: t`Your Savings ${originToken?.symbol} balance will be`,
                          value: `${formatBigInt(finalSavingsBalance, { maxDecimals: 2, unit: getTokenDecimals(originToken, chainId) })} ${originToken?.symbol}`
                        }
                      ]
                    : [])
                ]}
              />
            </motion.div>
          )}
        </VStack>
      </Tabs>
    </VStack>
  );
}
