import {
  usePrices,
  useMorphoVaultOnChainData,
  useMorphoVaultMarketApiData,
  MORPHO_VAULTS
} from '@jetstreamgg/sky-hooks';
import {
  formatBigInt,
  formatDecimalPercentage,
  formatNumber,
  isTestnetId,
  chainId
} from '@jetstreamgg/sky-utils';
import { Text } from '@widgets/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { InteractiveStatsCard } from '@widgets/shared/components/ui/card/InteractiveStatsCard';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { formatUnits } from 'viem';
import { ModuleCardVariant } from './ModulesBalances';
import { useChainId } from 'wagmi';
import { RateLineWithArrow } from '@widgets/shared/components/ui/RateLineWithArrow';
import { InteractiveStatsCardAlt } from '@widgets/shared/components/ui/card/InteractiveStatsCardAlt';
import { MorphoVaultBadge } from '@widgets/widgets/MorphoVaultWidget/components/MorphoVaultBadge';

export const VaultsBalanceCard = ({
  url,
  onExternalLinkClicked,
  variant = ModuleCardVariant.default
}: {
  url?: string;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  variant?: ModuleCardVariant;
}) => {
  const connectedChainId = useChainId();
  const vaultChainId = isTestnetId(connectedChainId) ? chainId.tenderly : chainId.mainnet;

  const defaultMorphoVault = MORPHO_VAULTS[0];
  const morphoVaultAddress = defaultMorphoVault?.vaultAddress[vaultChainId];
  const { data: morphoData, isLoading: morphoDataLoading } = useMorphoVaultOnChainData({
    vaultAddress: morphoVaultAddress
  });
  const { data: morphoSingleMarketData, isLoading: morphoSingleMarketLoading } =
    useMorphoVaultMarketApiData({
      vaultAddress: morphoVaultAddress
    });

  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  const morphoSupplied = morphoData?.userAssets ?? 0n;
  const morphoRate = morphoSingleMarketData?.rate.netRate ? morphoSingleMarketData.rate.netRate : 0;

  const isBalanceLoading = morphoDataLoading;
  const isRateLoading = morphoSingleMarketLoading;

  const vaultsIcon = <MorphoVaultBadge className="h-full w-full rounded-sm" />;

  return variant === ModuleCardVariant.default ? (
    <InteractiveStatsCard
      title={t`Supplied to Vaults`}
      icon={vaultsIcon}
      headerRightContent={
        isBalanceLoading ? (
          <Skeleton className="w-32" />
        ) : (
          <Text>{formatBigInt(morphoSupplied)}</Text>
        )
      }
      footer={
        isRateLoading ? (
          <Skeleton className="h-4 w-20" />
        ) : morphoRate > 0 ? (
          <RateLineWithArrow
            rateText={`Rate: ${formatDecimalPercentage(morphoRate)}`}
            popoverType="expert"
            onExternalLinkClicked={onExternalLinkClicked}
          />
        ) : (
          <></>
        )
      }
      footerRightContent={
        isBalanceLoading || pricesLoading ? (
          <Skeleton className="h-[13px] w-20" />
        ) : morphoSupplied > 0n && !!pricesData?.USDS ? (
          <Text variant="small" className="text-textSecondary">
            $
            {formatNumber(
              parseFloat(formatUnits(morphoSupplied, 18)) * parseFloat(pricesData.USDS.price),
              {
                maxDecimals: 2
              }
            )}
          </Text>
        ) : undefined
      }
      url={url}
    />
  ) : (
    <InteractiveStatsCardAlt
      title={t`Supplied to Vaults`}
      icon={vaultsIcon}
      url={url}
      logoName="expert"
      content={
        isBalanceLoading ? (
          <Skeleton className="w-32" />
        ) : (
          <Text>{formatBigInt(morphoSupplied)} USDS</Text>
        )
      }
    />
  );
};
