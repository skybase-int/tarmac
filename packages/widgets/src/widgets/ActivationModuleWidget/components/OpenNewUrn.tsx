import { Text } from '@widgets/shared/components/ui/Typography';
import { useUrnAddress, useVault } from '@jetstreamgg/hooks';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useContext, useMemo } from 'react';
import { ActivationModuleWidgetContext } from '../context/context';
import { Lock } from './Lock';
import { Borrow } from './Borrow';
import { Free } from './Free';
import { Repay } from './Repay';
import { Button } from '@widgets/components/ui/button';
import { HStack } from '@widgets/shared/components/ui/layout/HStack';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { formatUrnIndex, getNextStep } from '../lib/utils';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { ActivationAction, ActivationFlow, ActivationStep } from '../lib/constants';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@widgets/components/ui/tabs';
import { motion } from 'framer-motion';

export const OpenNewUrn = ({
  isConnectedAndEnabled,
  onClickTrigger,
  tabSide
}: {
  isConnectedAndEnabled: boolean;
  onClickTrigger: any;
  tabSide: 'left' | 'right';
}) => {
  const { widgetState } = useContext(WidgetContext);
  const {
    setSkyToLock,
    currentStep,
    setCurrentStep,
    setUsdsToBorrow,
    setUsdsToWipe,
    activeUrn,
    setSkyToFree,
    setIsLockCompleted,
    setIsBorrowCompleted
  } = useContext(ActivationModuleWidgetContext);

  const { data: urnAddress } = useUrnAddress(activeUrn?.urnIndex || 0n);

  const { data: vaultData } = useVault(urnAddress);

  const showTabs = useMemo(
    () =>
      widgetState.flow === ActivationFlow.MANAGE &&
      widgetState.action !== ActivationAction.OVERVIEW &&
      currentStep === ActivationStep.OPEN_BORROW,
    [widgetState.action, widgetState.flow, currentStep]
  );

  const clearInputs = () => {
    setSkyToLock(0n);
    setSkyToFree(0n);
    setUsdsToWipe(0n);
    setUsdsToBorrow(0n);
  };

  const handleSkip = () => {
    clearInputs();
    setIsLockCompleted(true);
    setIsBorrowCompleted(true);
    setCurrentStep(getNextStep(currentStep));
  };

  return (
    <div className="mb-4 space-y-2">
      <HStack className="items-center justify-between">
        <HStack gap={1} className="items-center">
          <div className="flex items-center">
            <Text>
              {activeUrn?.urnIndex !== undefined && activeUrn?.urnIndex >= 0n
                ? t`Manage Position ${formatUrnIndex(activeUrn?.urnIndex || 0n)}`
                : t`Open Position`}
            </Text>
          </div>
        </HStack>
        {widgetState.flow !== ActivationFlow.OPEN && (
          <Button variant="link" className="text-white" onClick={handleSkip}>
            Skip
          </Button>
        )}
      </HStack>
      <Tabs defaultValue={tabSide}>
        {showTabs && (
          <motion.div variants={positionAnimations}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                position="left"
                value="left"
                onClick={() => {
                  clearInputs();
                  onClickTrigger(0);
                }}
              >
                <Trans>Seal and borrow</Trans>
              </TabsTrigger>
              <TabsTrigger
                position="right"
                value="right"
                onClick={() => {
                  clearInputs();
                  onClickTrigger(1);
                }}
              >
                <Trans>Unseal and pay back</Trans>
              </TabsTrigger>
            </TabsList>
          </motion.div>
        )}
        <TabsContent value="left">
          <VStack gap={2} className="mt-4">
            <Lock isConnectedAndEnabled={isConnectedAndEnabled} />
            <Borrow isConnectedAndEnabled={isConnectedAndEnabled} />
          </VStack>
        </TabsContent>
        <TabsContent value="right">
          <VStack gap={2} className="mt-4">
            <Free isConnectedAndEnabled={isConnectedAndEnabled} sealedAmount={vaultData?.collateralAmount} />
            <Repay isConnectedAndEnabled={isConnectedAndEnabled} />
          </VStack>
        </TabsContent>
      </Tabs>
    </div>
  );
};
