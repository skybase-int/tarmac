import { useEffect, useRef } from 'react';
import { useChainId, useChains } from 'wagmi';
import { toast } from '@/components/ui/use-toast';
import { Text } from '@/modules/layout/components/Typography';
import { getChainIcon } from '@jetstreamgg/utils';
import { ArrowRightLong } from '@/modules/icons';

export function useNetworkChangeNotification() {
  const chainId = useChainId();
  const chains = useChains();
  const previousChainNameRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const chain = chains.find(c => c.id === chainId);
    if (chain?.name) {
      if (previousChainNameRef.current && previousChainNameRef.current !== chain.name) {
        toast({
          title: 'Your Network switched:',
          description: (
            <div className="mt-3 flex items-center gap-5">
              <div className="flex items-center gap-2">
                {getChainIcon(chainId, 'h-[22px] w-[22px]')}
                <Text variant="large">{previousChainNameRef.current}</Text>
              </div>
              <ArrowRightLong width={18} height={18} />
              <div className="flex items-center gap-2">
                {getChainIcon(chainId, 'h-[22px] w-[22px]')}
                <Text variant="large">{chain.name}</Text>
              </div>
            </div>
          ),
          duration: 5000
        });
      }
      previousChainNameRef.current = chain.name;
    }
  }, [chainId, chains]);
}
