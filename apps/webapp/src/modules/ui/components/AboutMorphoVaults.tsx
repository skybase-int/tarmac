import { getBannerByIdAndModule, filterBannersByConnectionStatus } from '@/data/banners/helpers';
import { parseBannerContent } from '@/utils/bannerContentParser';
import { useConnectedContext } from '../context/ConnectedContext';
import { AboutCard } from './AboutCard';
import { Trans } from '@lingui/react/macro';
import { Morpho } from '@jetstreamgg/sky-widgets';

export const AboutMorphoVaults = () => {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();

  const banner = getBannerByIdAndModule('morpho-vaults', 'vaults-banners');

  if (!banner) return null;

  if (banner.display) {
    const filtered = filterBannersByConnectionStatus([banner], isConnectedAndAcceptedTerms);
    if (filtered.length === 0) return null;
  }

  const contentText = banner.description ? parseBannerContent(banner.description) : '';

  return (
    <AboutCard
      title={<Trans>Morpho Vaults</Trans>}
      icon={<Morpho className="h-6 w-6 rounded-sm" />}
      description={contentText}
      linkHref="https://morpho.org"
      linkLabel={<Trans>Learn more</Trans>}
      colorMiddle="linear-gradient(360deg, #2470FF 0%, #1B4ECF 300%)"
    />
  );
};
