import { Trans } from '@lingui/react/macro';
import { Dispatch, SetStateAction, useRef } from 'react';
import { TradeConfigMenu } from './TradeConfigMenu';
import { Heading, Text } from '@/shared/components/ui/Typography';
import { ExternalLink } from '@/shared/components/ExternalLink';
import { useAccount } from 'wagmi';
import { SAFE_CONNECTOR_ID, WALLETCONNECT_CONNECTOR } from '../lib/constants';
import { TokenForChain } from '@jetstreamgg/hooks';
import { sepolia } from 'viem/chains';

type PropTypes = {
  slippage: string;
  setSlippage: (newSlippage: string) => void;
  isEthFlow?: boolean;
  ttl: string;
  originToken?: TokenForChain;
  setTtl: Dispatch<SetStateAction<string>>;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const TradeHeader = ({
  slippage,
  setSlippage,
  isEthFlow = false,
  ttl,
  setTtl,
  originToken,
  onExternalLinkClicked
}: PropTypes): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const collisionBoundary = ref.current?.parentElement?.parentElement || null;
  const { connector, chainId } = useAccount();
  const shouldShowUSDTWarning = originToken?.symbol === 'USDT' && chainId === sepolia.id;

  return (
    <div>
      <div ref={ref} className="flex items-baseline justify-between gap-2">
        <Heading variant="x-large">
          <Trans>Trade</Trans>
        </Heading>
        <TradeConfigMenu
          boundary={collisionBoundary}
          slippage={slippage}
          setSlippage={setSlippage}
          isEthFlow={isEthFlow}
          ttl={ttl}
          setTtl={setTtl}
        />
      </div>
      <Text className="text-text mt-6 text-sm font-normal leading-none">
        Powered by{' '}
        <ExternalLink
          href="https://cow.fi/"
          showIcon={false}
          className="underline"
          onExternalLinkClicked={onExternalLinkClicked}
        >
          CoW Protocol
        </ExternalLink>
      </Text>
      {shouldShowUSDTWarning && (
        <Text className="mt-1 text-[11px] font-normal leading-none text-orange-400">
          Need to reset the allowance to 0 before approving a new amount
        </Text>
      )}
      {(connector?.id === WALLETCONNECT_CONNECTOR || connector?.id === SAFE_CONNECTOR_ID) && (
        <Text className="text-text mt-6 text-sm font-normal leading-none">
          Currently trades for Safe Smart Accounts and other smart contract wallets are not supported in this
          app. Please visit the CoW Swap app instead.
        </Text>
      )}
    </div>
  );
};
