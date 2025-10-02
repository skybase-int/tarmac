import { Button } from '@/components/ui/button';
import { Trans } from '@lingui/react/macro';
import { ExternalLinkIcon } from 'lucide-react';
import { ExternalLink } from '@/modules/layout/components/ExternalLink';
import { Heading } from '@/modules/layout/components/Typography';
import { getEtherscanLink } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';
import { stUsdsAddress } from '@jetstreamgg/sky-hooks';
import { GradientShapeCard } from './GradientShapeCard';
import { TokenIcon } from './TokenIcon';
import { getBannerById } from '@/data/banners/banners';
import { parseBannerContent } from '@/utils/bannerContentParser';
import { useConnectedContext } from '../context/ConnectedContext';

export const AboutStUsds = ({ isOverview = false }: { isOverview?: boolean }) => {
  const chainId = useChainId();
  const { isConnectedAndAcceptedTerms } = useConnectedContext();

  const stUsdsEtherscanLink = getEtherscanLink(
    chainId,
    stUsdsAddress[chainId as keyof typeof stUsdsAddress],
    'address'
  );

  // Use SKY-like colors for overview, original colors for details
  const colors = isOverview
    ? {
        colorLeft: 'radial-gradient(217.45% 249.6% at 116.69% 275.4%, #A273FF 0%, #4331E9 100%)',
        colorMiddle: 'linear-gradient(360deg, #FDC079 0%, #EC63DA 300%)',
        colorRight: '#1e1a4b'
      }
    : {
        colorLeft: 'radial-gradient(258.73% 268.92% at 116.69% 275.4%, #F7A7F9 0%, #6D28FF 100%)',
        colorMiddle: 'linear-gradient(0deg, #FDC079 0%, #EC63DA 300%)',
        colorRight: 'bg-card'
      };

  // Determine banner ID based on connection status and isOverview
  const bannerId = isOverview
    ? isConnectedAndAcceptedTerms
      ? 'stusds-2'
      : 'stusds'
    : isConnectedAndAcceptedTerms
      ? 'stusds-4'
      : 'stusds-3';

  const banner = getBannerById(bannerId);
  const heading = banner?.title || 'stUSDS';
  const contentText = banner?.description ? parseBannerContent(banner.description) : '';

  return (
    <GradientShapeCard
      colorLeft={colors.colorLeft}
      colorMiddle={colors.colorMiddle}
      colorRight={colors.colorRight}
      className="mb-6"
    >
      <div className="w-[80%] space-y-2 lg:w-2/3">
        <Heading className="flex items-center gap-2">
          <TokenIcon token={{ symbol: 'stUSDS' }} width={24} className="h-6 w-6" showChainIcon={false} />
          {heading}
        </Heading>
        {contentText}
      </div>
      <ExternalLink href={stUsdsEtherscanLink} showIcon={false} className="mt-3 w-fit lg:mt-0">
        <Button variant="outline" className="border-border gap-2">
          <Trans>View contract</Trans>
          <ExternalLinkIcon size={16} />
        </Button>
      </ExternalLink>
    </GradientShapeCard>
  );
};
