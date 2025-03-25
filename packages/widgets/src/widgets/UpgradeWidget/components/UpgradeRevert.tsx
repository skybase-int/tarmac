import { WidgetProps } from '@widgets/shared/types/widgetState';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { TokenInput } from '@widgets/shared/components/ui/token/TokenInput';
import { Tabs, TabsList, TabsTrigger } from '@widgets/components/ui/tabs';
import { getTokenDecimals, Token } from '@jetstreamgg/hooks';
import { UpgradeStats } from './UpgradeStats';
import { TransactionOverview } from '@widgets/shared/components/ui/transaction/TransactionOverview';
import { t } from '@lingui/core/macro';
import { formatBigInt } from '@jetstreamgg/utils';
import { motion } from 'framer-motion';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { useChainId } from 'wagmi';

type Props = WidgetProps & {
  leftTabTitle: string;
  rightTabTitle: string;
  originTitle: string;
  originAmount: bigint;
  targetAmount: bigint;
  originBalance?: bigint;
  targetBalance?: bigint;
  originToken?: Token;
  targetToken?: Token;
  originOptions?: Token[];
  tabIndex: 0 | 1;
  error?: Error;
  onToggle: (number: 0 | 1) => void;
  onOriginInputChange: (val: bigint) => void;
  onMenuItemChange?: (token: Token) => void;
  isConnectedAndEnabled: boolean;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export function UpgradeRevert({
  leftTabTitle,
  rightTabTitle,
  originToken,
  targetToken,
  originOptions,
  originTitle,
  originAmount,
  targetAmount,
  originBalance,
  tabIndex,
  error,
  onToggle,
  onOriginInputChange,
  onMenuItemChange,
  isConnectedAndEnabled = true
}: Props): React.ReactElement {
  const chainId = useChainId();

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
          <UpgradeStats />
        </motion.div>

        <VStack className="w-full" gap={0}>
          <motion.div variants={positionAnimations}>
            <TokenInput
              className="w-full"
              token={originToken}
              balance={originBalance}
              onChange={onOriginInputChange}
              value={originAmount}
              dataTestId="upgrade-input-origin"
              label={originTitle}
              tokenList={originOptions || []}
              onTokenSelected={token => {
                onMenuItemChange?.(token);
              }}
              error={error?.message}
              showPercentageButtons={isConnectedAndEnabled}
              enabled={isConnectedAndEnabled}
            />
          </motion.div>
          {!!originAmount && !error && (
            // TODO add additional data points
            <motion.div variants={positionAnimations}>
              <TransactionOverview
                title={t`Transaction overview`}
                isFetching={!!originAmount && !targetAmount}
                fetchingMessage={t`Fetching transaction details`}
                transactionData={[
                  {
                    label: t`Exchange rate`,
                    value: `${formatBigInt(originAmount, {
                      unit: originToken ? getTokenDecimals(originToken, chainId) : 18
                    })} ${originToken?.symbol} = ${formatBigInt(targetAmount, {
                      unit: targetToken ? getTokenDecimals(targetToken, chainId) : 18
                    })} ${targetToken?.symbol} `
                  },
                  {
                    label: t`Tokens to receive`,
                    value: `${formatBigInt(targetAmount, {
                      unit: targetToken ? getTokenDecimals(targetToken, chainId) : 18
                    })} ${targetToken?.symbol}`
                  }
                ]}
              />
            </motion.div>
          )}
        </VStack>
      </Tabs>
    </VStack>
  );
}
