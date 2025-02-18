import { SealModuleWidget as CoreSealModuleWidget } from '@jetstreamgg/widgets';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useCustomConnectModal } from '../../hooks/useCustomConnectModal';
// import { usePositionsAtRisk } from '@jetstreamgg/hooks';
import { ExternalWidgetState } from '@jetstreamgg/widgets';

export function SealModuleWidgetDisplay({
  externalWidgetState,
  setSealInitialState
}: {
  externalWidgetState: ExternalWidgetState;
  setSealInitialState: (state: ExternalWidgetState) => void;
}) {
  const addRecentTransaction = useAddRecentTransaction();
  const onConnectModal = useCustomConnectModal();

  // const { data: positionsAtRisk } = usePositionsAtRisk();

  // TODO: fetch urn and vault addresses dynamically
  // const { mutate: mutateSelectedRewardContract } = useUrnSelectedRewardContract({
  //   urn: '0x3CbcbaCA7025b03e4f564f50c404C6a4C931aF37'
  // });
  // const { mutate: mutateSelectedVoteDelegate } = useUrnSelectedVoteDelegate({
  //   urn: '0x3CbcbaCA7025b03e4f564f50c404C6a4C931aF37'
  // });
  // const { execute: openUrn } = useOpenUrn({});
  // const { execute: selectRewardContract } = useSelectRewardContract({
  //   urn: '0x3CbcbaCA7025b03e4f564f50c404C6a4C931aF37',
  //   rewardContract: '0xa138575a030a2f4977d19cc900781e7be3fd2bc0',
  //   // rewardContract: ZERO_ADDRESS,
  //   onSuccess: () => {
  //     mutateSelectedRewardContract();
  //   }
  // });
  // const { execute: selectVoteDelegate } = useSelectVoteDelegate({
  //   urn: '0x3CbcbaCA7025b03e4f564f50c404C6a4C931aF37',
  //   voteDelegate: '0xc0389a30243e9dd1ebb513a92333b2737f265748',
  //   // voteDelegate: ZERO_ADDRESS,
  //   onSuccess: () => {
  //     mutateSelectedVoteDelegate();
  //   }
  // });

  // const { execute: claimRewards } = useClaimRewards({
  //   urn: '0x3CbcbaCA7025b03e4f564f50c404C6a4C931aF37',
  //   rewardContract: '0xa138575a030a2f4977d19cc900781e7be3fd2bc0',
  //   to: address || ZERO_ADDRESS
  // });

  // const { data: vaultData } = useVault('0x0E7ee4Dc75243b6eA543E0d3e6F76324a010aa02');

  // const { execute: drawNst } = useDrawUsds({
  //   urn: '0x0E7ee4Dc75243b6eA543E0d3e6F76324a010aa02',
  //   to: address || ZERO_ADDRESS,
  //   amount: vaultData?.maxSafeBorrowableIntAmount || 0n
  // });

  {
    /* <button
          onClick={openUrn}
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Open Urn
        </button>
        <button
          onClick={selectRewardContract}
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Select Urn Reward Contract
        </button>
        <button
          onClick={selectVoteDelegate}
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Select Urn Vote Delegate
        </button>
        <button
          onClick={claimRewards}
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Claim Urn Rewards
        </button> */
  }
  {
    /* <button
          onClick={drawNst}
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Draw USDS for urn
        </button> */
  }

  return (
    <CoreSealModuleWidget
      onConnect={onConnectModal}
      addRecentTransaction={addRecentTransaction}
      locale="en"
      rightHeaderComponent={undefined}
      onSealUrnChange={urn => {
        console.log('urn', urn);
        setSealInitialState({ urnIndex: urn?.urnIndex ? Number(urn.urnIndex) : undefined });
      }}
      externalWidgetState={externalWidgetState}
      onWidgetStateChange={params => {
        console.log('onWidgetStateChange - displayToken: ', params?.displayToken?.symbol);
      }}
      referralCode={1}
    />
  );
}
