import { HStack } from '@/modules/layout/components/HStack';
import { DetailsSwitcher } from './DetailsSwitcher';
import { NetworkSwitcher } from './NetworkSwitcher';
import { JSX } from 'react';

export function DualSwitcher(): JSX.Element {
  return (
    <HStack className="items-center gap-4 space-x-0">
      <NetworkSwitcher />
      <DetailsSwitcher />
    </HStack>
  );
}
