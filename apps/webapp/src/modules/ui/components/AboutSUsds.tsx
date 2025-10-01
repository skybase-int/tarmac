import { Trans } from '@lingui/react/macro';
import { getEtherscanLink, isL2ChainId } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';
import { sUsdsAddress, sUsdsL2Address } from '@jetstreamgg/sky-hooks';
import { AboutCard } from './AboutCard';

export const AboutSUsds = ({ height }: { height?: number | undefined }) => {
  const chainId = useChainId();

  const sUsdsEtherscanLink = getEtherscanLink(
    chainId,
    isL2ChainId(chainId)
      ? sUsdsL2Address[chainId as keyof typeof sUsdsL2Address]
      : sUsdsAddress[chainId as keyof typeof sUsdsAddress],
    'address'
  );

  return (
    <AboutCard
      tokenSymbol="sUSDS"
      description={
        <Trans>
          sUSDS is a savings token for eligible users. When you supply USDS to the Sky Savings Rate module,
          you access the Sky Savings Rate and may receive sUSDS tokens. These sUSDS tokens serve as a digital
          record of your USDS interaction with the SSR module and any value accrued to your position.
        </Trans>
      }
      linkHref={sUsdsEtherscanLink}
      colorMiddle="linear-gradient(0deg, #FFEF79 0%, #00C2A1 300%)"
      height={height}
    />
  );
};
