import React, { useEffect, useState } from 'react';
import { Seal } from '../../icons';
import { Intent } from '@/lib/enums';
import { useLingui } from '@lingui/react';
import { useCustomConnectModal } from '@/modules/ui/hooks/useCustomConnectModal';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { WidgetNavigation } from '@/modules/app/components/WidgetNavigation';
import { withErrorBoundary } from '@/modules/utils/withErrorBoundary';
import { DualSwitcher } from '@/components/DualSwitcher';
import { IconProps } from '@/modules/icons/Icon';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { useNotification } from '../hooks/useNotification';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { ArrowLeft } from 'lucide-react';
import { HStack } from '@/modules/layout/components/HStack';
import { Link, useSearchParams } from 'react-router-dom';
import {
  SealAction,
  SealFlow,
  SealModuleWidget,
  TxStatus,
  WidgetStateChangeParams
} from '@jetstreamgg/widgets';
import { useCurrentUrnIndex } from '@jetstreamgg/hooks';
import { isL2ChainId } from '@jetstreamgg/utils';
import { useChainId } from 'wagmi';
import { useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';
import { BP } from '@/modules/ui/hooks/useBreakpointIndex';
import { ChainModal } from '@/modules/ui/components/ChainModal';
import { IntentMapping } from '@/lib/constants';
import { QueryParams } from '@/lib/constants';

export type WidgetContent = [
  Intent,
  string,
  (props: IconProps) => React.ReactNode,
  React.ReactNode | null,
  boolean,
  { disabled?: boolean }?
][];

type WidgetPaneProps = {
  children?: React.ReactNode;
};

export const SealMigrationWidgetPane = ({ children }: WidgetPaneProps) => {
  const { i18n } = useLingui();
  const onConnect = useCustomConnectModal();
  const { data: currentUrnIndex } = useCurrentUrnIndex();
  const addRecentTransaction = useAddRecentTransaction();
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const onNotification = useNotification();
  const { onExternalLinkClicked, setSelectedSealUrnIndex } = useConfigContext();
  const [shouldHideLink, setShouldHideLink] = useState(false);
  const locale = i18n.locale;
  const chainId = useChainId();
  const isL2 = isL2ChainId(chainId);
  const { bpi } = useBreakpointIndex();
  const isMobile = bpi < BP.md;
  const [searchParams, setSearchParams] = useSearchParams();

  const referralCode = Number(import.meta.env.VITE_REFERRAL_CODE) || 0; // fallback to 0 if invalid

  const rightHeaderComponent = <DualSwitcher />;

  const onSealWidgetStateChange = ({ widgetState, txStatus }: WidgetStateChangeParams) => {
    const shouldHide =
      txStatus !== TxStatus.IDLE ||
      (widgetState.action === SealAction.MULTICALL &&
        currentUrnIndex !== undefined &&
        currentUrnIndex > 0n &&
        (widgetState.flow === SealFlow.OPEN || widgetState.flow === SealFlow.MANAGE));

    setShouldHideLink(shouldHide);
  };

  const onSealUrnChange = (urn?: { urnAddress: `0x${string}` | undefined; urnIndex: bigint | undefined }) => {
    setSearchParams(params => {
      if (urn?.urnAddress && urn?.urnIndex !== undefined) {
        params.set(QueryParams.Widget, IntentMapping[Intent.SEAL_INTENT]);
        params.set(QueryParams.UrnIndex, urn.urnIndex.toString());
      } else {
        params.delete(QueryParams.UrnIndex);
      }
      return params;
    });
    setSelectedSealUrnIndex(urn?.urnIndex !== undefined ? Number(urn.urnIndex) : undefined);
  };

  // Reset detail pane urn index when widget is mounted
  useEffect(() => {
    const urnIndexParam = searchParams.get(QueryParams.UrnIndex);
    setSelectedSealUrnIndex(
      urnIndexParam ? (isNaN(Number(urnIndexParam)) ? undefined : Number(urnIndexParam)) : undefined
    );

    // Reset when unmounting
    return () => {
      setSelectedSealUrnIndex(undefined);
    };
  }, []);

  let termsLink: any[] = [];
  try {
    termsLink = JSON.parse(import.meta.env.VITE_TERMS_LINK);
  } catch (error) {
    console.error('Error parsing terms link: ', error);
  }

  const sharedProps = {
    onConnect,
    addRecentTransaction,
    locale,
    rightHeaderComponent,
    onNotification,
    enabled: isConnectedAndAcceptedTerms,
    onExternalLinkClicked,
    referralCode,
    onSealUrnChange
  };

  const widgetContent: WidgetContent = [
    [
      Intent.SEAL_INTENT,
      'Seal',
      Seal,
      withErrorBoundary(
        <>
          {!shouldHideLink && (
            <Link to="/" className="text-textSecondary">
              <HStack className="mb-3 space-x-2">
                <ArrowLeft className="self-center" />
                <Heading tag="h3" variant="small" className="text-textSecondary">
                  Back to Home
                </Heading>
              </HStack>
            </Link>
          )}
          {isL2 ? (
            <div className="text-center">
              <Heading variant="large">Connect to Mainnet</Heading>
              <Text className="text-text mt-8">
                This module is not available on L2s. Please connect to mainnet to use it.
              </Text>
              <div className="mt-10 flex justify-center gap-3">
                <ChainModal dataTestId="chain-modal-trigger-header" showLabel={!isMobile} variant="widget" />
              </div>
              <Text variant="captionSm" className="text-text text-textSecondary mt-2">
                Select mainnet in the chain selector
              </Text>
            </div>
          ) : currentUrnIndex === 0n ? (
            <div className="mt-10 text-center">
              <Heading variant="large">Seal Engine is deprecated</Heading>
              <Text className="text-text mt-8">
                Creation of new positions has been disabled. Management of existing positions remains
                available.
              </Text>
              <Text className="text-text mt-8">You don&apos;t have any open positions.</Text>
            </div>
          ) : (
            <SealModuleWidget
              {...sharedProps}
              onWidgetStateChange={onSealWidgetStateChange}
              termsLink={termsLink[0]}
            />
          )}
        </>
      ),
      false
    ]
  ];

  return (
    <WidgetNavigation hideTabs widgetContent={widgetContent} intent={Intent.SEAL_INTENT}>
      {children}
    </WidgetNavigation>
  );
};
