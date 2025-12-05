import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trans } from '@lingui/react/macro';
import { Text } from './Typography';
import { ModuleCardVariant, ModulesBalances } from '@jetstreamgg/sky-widgets';

enum ConnectedModalTabsEnum {
  SUPPLIED_FUNDS = 'supplied_funds',
  WALLET_FUNDS = 'wallet_funds',
  ACTIVITY = 'activity'
}

export function ConnectedModalTabs() {
  return (
    <Tabs defaultValue={ConnectedModalTabsEnum.SUPPLIED_FUNDS}>
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <TabsTrigger position="left" value={ConnectedModalTabsEnum.SUPPLIED_FUNDS}>
          <Trans>Supplied Funds</Trans>
        </TabsTrigger>
        <TabsTrigger position="middle" value={ConnectedModalTabsEnum.WALLET_FUNDS}>
          <Trans>Wallet Funds</Trans>
        </TabsTrigger>
        <TabsTrigger position="right" value={ConnectedModalTabsEnum.ACTIVITY}>
          <Trans>Activity</Trans>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={ConnectedModalTabsEnum.SUPPLIED_FUNDS} className="flex flex-col gap-6">
        <ModulesBalances variant={ModuleCardVariant.alt} />
      </TabsContent>
      <TabsContent value={ConnectedModalTabsEnum.WALLET_FUNDS}>
        <Text className="text-text">Wallet</Text>
      </TabsContent>
      <TabsContent value={ConnectedModalTabsEnum.ACTIVITY}>
        <Text className="text-text">Activity</Text>
      </TabsContent>
    </Tabs>
  );
}
