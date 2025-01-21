import { useState } from 'react';
import { getEtherscanLink, formatAddress, getCowExplorerLink, getExplorerName } from '@jetstreamgg/utils';
import { Card } from '@/components/ui/card';
import { LinkExternal } from '@/shared/components/icons/LinkExternal';
import { Text } from '@/shared/components/ui/Typography';
import { getPositive } from '../lib/getPositive';
import { ModuleEnum, TransactionTypeEnum, CombinedHistoryItem } from '@jetstreamgg/hooks';
import { getIcon } from '../lib/getIcon';
import { getTitle } from '../lib/getTitle';
import { ExternalLink } from '@/shared/components/ExternalLink';
import { getHistoryRightText } from '../lib/getHistoryRightText';
import { isBaseChainId } from '@jetstreamgg/utils';

interface BalancesHistoryItemProps {
  transactionHash: string;
  module: ModuleEnum;
  type: TransactionTypeEnum;
  formattedDate: string;
  chainId?: number;
  savingsToken?: string;
  tradeFromToken?: string;
  item: CombinedHistoryItem;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

interface IconWrapperProps {
  chainId?: number;
  children: React.ReactNode;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ chainId, children }) => {
  const baseClasses = 'mr-3';
  const ethereumClasses =
    'mr-3 bg-surface inline-flex h-8 w-8 min-w-8 items-center justify-center rounded-full text-white';
  return <div className={`${!isBaseChainId(chainId || 1) ? ethereumClasses : baseClasses}`}>{children}</div>;
};

export const BalancesHistoryItem: React.FC<BalancesHistoryItemProps> = ({
  transactionHash,
  module,
  type,
  formattedDate,
  chainId,
  savingsToken,
  tradeFromToken,
  item,
  onExternalLinkClicked
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const href =
    type === TransactionTypeEnum.TRADE && !isBaseChainId(chainId || 1)
      ? getCowExplorerLink(chainId || 1, transactionHash)
      : getEtherscanLink(chainId || 1, transactionHash, 'tx');
  const explorerName = getExplorerName(chainId || 1);
  const positive = getPositive({ type });
  return (
    <ExternalLink
      href={href}
      showIcon={false}
      className="w-full"
      wrapperClassName="w-full justify-stretch"
      onExternalLinkClicked={onExternalLinkClicked}
    >
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variant="history"
        className="w-full"
      >
        <div className="flex items-center">
          <IconWrapper chainId={chainId}>{getIcon({ type, module, chainId: chainId || 1 })}</IconWrapper>
          <div className="flex w-full items-center justify-between">
            <div>
              <Text>{getTitle({ type, module })}</Text>
              {isHovered ? (
                <div className="text-textEmphasis flex items-center">
                  <Text variant="small" className="mr-[7px]">
                    View on
                    {module === ModuleEnum.TRADE && !isBaseChainId(chainId || 1)
                      ? ' Cow Explorer'
                      : ` ${explorerName}`}
                  </Text>
                  <LinkExternal boxSize={12} />
                </div>
              ) : (
                <Text variant="small" className="text-textSecondary">
                  {formatAddress(transactionHash, 6, 6)}
                </Text>
              )}
            </div>
            <div className="text-right">
              <Text className={positive ? 'text-bullish' : ''}>
                <span>{positive ? '+' : positive === false ? '-' : ''}</span>
                <span className="ml-[2px]">
                  {getHistoryRightText({ item, type, tradeFromToken, savingsToken, chainId: chainId || 1 })}
                </span>
              </Text>
              <Text variant="small" className="text-textSecondary">
                {formattedDate}
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </ExternalLink>
  );
};
