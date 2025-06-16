import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@widgets/components/ui/tabs';
import { Lock } from './Lock';
import { Borrow } from './Borrow';
import { Free } from './Free';
import { Repay } from './Repay';
import { Trans } from '@lingui/react/macro';
import { HStack } from '@widgets/shared/components/ui/layout/HStack';
import { Button } from '@widgets/components/ui/button';
import { Info } from '@widgets/shared/components/icons/Info';
import { Text } from '@widgets/shared/components/ui/Typography';

export const UnconnectedState = ({
  onInputAmountChange,
  onShowHelpModal
}: {
  onInputAmountChange: (val: bigint, userTriggered?: boolean) => void;
  onShowHelpModal?: () => void;
}) => {
  return (
    <div className={`mb-8 space-y-2 ${onShowHelpModal ? 'mt-2' : 'mt-6'}`}>
      {onShowHelpModal && (
        <HStack className="text-textSecondary mb-0 items-center">
          <Text variant="small" className="mr-2">
            <Trans>How does the Staking Engine work?</Trans>
          </Text>
          <Button className="text-textSecondary p-0" onClick={onShowHelpModal}>
            <Info />
          </Button>
        </HStack>
      )}
      <Tabs defaultValue="left">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger position="left" value="left">
            <Trans>Stake and borrow</Trans>
          </TabsTrigger>
          <TabsTrigger position="right" value="right">
            <Trans>Unstake and pay back</Trans>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="left">
          <VStack gap={2} className="mt-4">
            <Lock isConnectedAndEnabled={false} onChange={onInputAmountChange} />
            <Borrow isConnectedAndEnabled={false} />
          </VStack>
        </TabsContent>
        <TabsContent value="right">
          <VStack gap={2} className="mt-4">
            <Free isConnectedAndEnabled={false} sealedAmount={0n} onChange={onInputAmountChange} />
            <Repay isConnectedAndEnabled={false} />
          </VStack>
        </TabsContent>
      </Tabs>
    </div>
  );
};
