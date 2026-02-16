import { CardAnimationWrapper, MorphoVaultBadge, WidgetContainer } from '@jetstreamgg/sky-widgets';
import { SharedProps } from '@/modules/app/types/Widgets';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { VaultsIntent } from '@/lib/enums';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/react/macro';
import { AnimatePresence } from 'framer-motion';
import { MorphoVaultWidgetPane } from '@/modules/morpho/components/MorphoVaultWidgetPane';
import { VaultsIntentMapping, QueryParams, TX_AGENT_ENABLED } from '@/lib/constants';
import { useSearchParams } from 'react-router-dom';
import { MorphoVaultStatsCard } from '@/modules/expert/components/MorphoVaultStatsCard';
import { MORPHO_VAULTS } from '@jetstreamgg/sky-hooks';
import { useChainId } from 'wagmi';
import { TokenIcon } from '@/modules/ui/components/TokenIcon';
import { HStack } from '@/modules/layout/components/HStack';
import { VStack } from '@/modules/layout/components/VStack';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Hardcoded demo vaults that don't exist yet
const DEMO_VAULTS = [
  { name: 'USDS Flagship', tokenSymbol: 'USDS', rate: '6.50%', tvl: '—', liquidity: '—' },
  { name: 'USDC Risk Capital', tokenSymbol: 'USDC', rate: '8.20%', tvl: '—', liquidity: '—' },
  { name: 'USDT Risk Capital', tokenSymbol: 'USDT', rate: '7.80%', tvl: '—', liquidity: '—' }
];

function DemoVaultCard({ name, tokenSymbol, rate, tvl, liquidity }: (typeof DEMO_VAULTS)[number]) {
  return (
    <Card className="from-card to-card h-full bg-radial-(--gradient-position) transition-[background-color,background-image,opacity] lg:p-5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <HStack className="items-center" gap={2}>
          <TokenIcon className="h-6 w-6" token={{ symbol: tokenSymbol }} />
          <Text>{name}</Text>
          <MorphoVaultBadge />
        </HStack>
        <Text className="text-bullish text-sm font-semibold">{rate}</Text>
      </CardHeader>
      <CardContent className="mt-5 p-0">
        <HStack className="justify-between" gap={2}>
          <VStack className="items-stretch justify-between" gap={2}>
            <Text className="text-textSecondary text-sm leading-4">
              <Trans>Liquidity</Trans>
            </Text>
            <Text>{liquidity}</Text>
          </VStack>
          <VStack className="items-stretch justify-between text-right" gap={2}>
            <Text className="text-textSecondary text-sm leading-4">
              <Trans>TVL</Trans>
            </Text>
            <Text>{tvl}</Text>
          </VStack>
        </HStack>
      </CardContent>
    </Card>
  );
}

export function VaultsWidgetPane(sharedProps: SharedProps) {
  const { selectedVaultsOption, setSelectedVaultsOption } = useConfigContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const chainId = useChainId();

  const selectedVaultAddress = searchParams.get(QueryParams.Vault) as `0x${string}` | null;

  const selectedVault =
    MORPHO_VAULTS.find(v => v.vaultAddress[chainId]?.toLowerCase() === selectedVaultAddress?.toLowerCase()) ||
    MORPHO_VAULTS[0];

  const handleSelectMorphoVault = (vaultAddress: `0x${string}`) => {
    setSearchParams(params => {
      params.set(QueryParams.VaultModule, VaultsIntentMapping[VaultsIntent.MORPHO_VAULT_INTENT]);
      params.set(QueryParams.Vault, vaultAddress);
      return params;
    });
    setSelectedVaultsOption(VaultsIntent.MORPHO_VAULT_INTENT);
  };

  const renderSelectedWidget = () => {
    switch (selectedVaultsOption) {
      case VaultsIntent.MORPHO_VAULT_INTENT:
        return (
          <MorphoVaultWidgetPane
            {...sharedProps}
            vaultAddress={selectedVault.vaultAddress}
            assetToken={selectedVault.assetToken}
            vaultName={selectedVault.name}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <CardAnimationWrapper key={selectedVaultsOption} className="h-full">
        {selectedVaultsOption ? (
          renderSelectedWidget()
        ) : (
          <WidgetContainer
            header={
              <Heading variant="x-large">
                <Trans>Vaults</Trans>
              </Heading>
            }
            subHeader={
              <Text className="text-textSecondary" variant="small">
                <Trans>Third-party vault integrations with Sky ecosystem tokens</Trans>
              </Text>
            }
            rightHeader={sharedProps.rightHeaderComponent}
          >
            <CardAnimationWrapper className="flex flex-col gap-4">
              {MORPHO_VAULTS.map(vault => {
                const vaultAddressForChain = vault.vaultAddress[chainId];
                if (!vaultAddressForChain) return null;
                return (
                  <MorphoVaultStatsCard
                    key={vaultAddressForChain}
                    vaultAddress={vault.vaultAddress}
                    vaultName={vault.name}
                    assetToken={vault.assetToken}
                    onClick={() => handleSelectMorphoVault(vaultAddressForChain)}
                  />
                );
              })}
              {TX_AGENT_ENABLED &&
                DEMO_VAULTS.map(vault => <DemoVaultCard key={vault.name} {...vault} />)}
            </CardAnimationWrapper>
          </WidgetContainer>
        )}
      </CardAnimationWrapper>
    </AnimatePresence>
  );
}
