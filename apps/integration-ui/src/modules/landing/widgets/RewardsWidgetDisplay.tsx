import { RewardsWidget as BaseRewardsWidget, ExternalWidgetState } from '@jetstreamgg/widgets';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useCustomConnectModal } from '../../hooks/useCustomConnectModal';

interface RewardsWidgetProps {
  externalWidgetState: ExternalWidgetState;
}

export function RewardsWidgetDisplay({ externalWidgetState }: RewardsWidgetProps) {
  const addRecentTransaction = useAddRecentTransaction();
  const onConnectModal = useCustomConnectModal();

  return (
    <BaseRewardsWidget
      onConnect={onConnectModal}
      addRecentTransaction={addRecentTransaction}
      locale="en"
      referralCode={1}
      rightHeaderComponent={undefined}
      externalWidgetState={externalWidgetState}
      onExternalLinkClicked={e => {
        const href = e.currentTarget.getAttribute('href');
        const linkText = e.currentTarget.textContent;
        console.log(href);
        console.log(linkText);

        const isAllowed = true; // Check here if the link is allowed
        if (!isAllowed) {
          e.preventDefault();
          console.log('Show modal');
        }
      }}
      // selectedRewardContract: {
      //   supplyToken: {
      //     address: {
      //       '314310': '0xdC035D45d973E3EC169d2276DDab16f1e407384F'
      //     },
      //     name: 'USDS',
      //     symbol: 'USDS',
      //     color: '#1AAB9B',
      //     decimals: 18
      //   },
      //   rewardToken: {
      //     address: {
      //       '314310': '0x56072C95FAA701256059aa122697B133aDEd9279'
      //     },
      //     name: 'SKY',
      //     symbol: 'SKY',
      //     color: '#1AAB9B',
      //     decimals: 18
      //   },
      //   contractAddress: '0x0650CAF159C5A49f711e8169D4336ECB9b950275',
      //   chainId: 314310,
      //   name: 'With: USDS Get: SKY',
      //   description: 'Supply USDS, get SKY',
      //   externalLink: 'https://usds.sky',
      //   logo: 'https://via.placeholder.com/400x400/04d19a/ffffff?text=SKY',
      //   featured: true
      // }
    />
  );
}
