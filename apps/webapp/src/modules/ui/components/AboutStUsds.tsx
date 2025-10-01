import { Trans } from '@lingui/react/macro';
import { getEtherscanLink } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';
import { stUsdsAddress } from '@jetstreamgg/sky-hooks';
import { AboutCard } from './AboutCard';
import { TokenIcon } from './TokenIcon';

export const AboutStUsds = ({ isOverview = false }: { isOverview?: boolean }) => {
  const chainId = useChainId();

  const stUsdsEtherscanLink = getEtherscanLink(
    chainId,
    stUsdsAddress[chainId as keyof typeof stUsdsAddress],
    'address'
  );

  // Use different colorMiddle for overview vs details
  const colorMiddle = isOverview
    ? 'linear-gradient(360deg, #FDC079 0%, #EC63DA 300%)'
    : 'linear-gradient(0deg, #FDC079 0%, #EC63DA 300%)';

  return (
    <AboutCard
      title={
        <>
          <TokenIcon token={{ symbol: 'stUSDS' }} width={24} className="h-6 w-6" showChainIcon={false} />
          <Trans>stUSDS</Trans>
        </>
      }
      description={
        <Trans>
          stUSDS is an ERC-4626 vault token that enables USDS holders to earn yield through Sky-backed lending
          activities. When you deposit USDS into the stUSDS vault, you receive stUSDS tokens representing your
          share of the vault. The value of your stUSDS increases over time as the vault earns yield from
          borrowers who use USDS liquidity, providing a variable rate return on your deposited USDS.
        </Trans>
      }
      linkHref={stUsdsEtherscanLink}
      colorMiddle={colorMiddle}
    />
  );
};
