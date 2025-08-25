import { TokenInput } from '@widgets/shared/components/ui/token/TokenInput';
import { TOKENS, useTokenBalance } from '@jetstreamgg/sky-hooks';
import { t } from '@lingui/core/macro';
import { useContext, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { SealModuleWidgetContext } from '../context/context';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { SealFlow } from '../lib/constants';

export const Lock = ({
  isConnectedAndEnabled,
  onChange
}: {
  isConnectedAndEnabled: boolean;
  onChange?: (val: bigint, userTriggered?: boolean) => void;
}) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const { widgetState } = useContext(WidgetContext);
  const { mkrToLock, setMkrToLock, skyToLock, acceptedExitFee, setIsLockCompleted } =
    useContext(SealModuleWidgetContext);

  const { data: mkrBalance } = useTokenBalance({ address, token: TOKENS.mkr.address[chainId], chainId });
  const { data: skyBalance } = useTokenBalance({ address, token: TOKENS.sky.address[chainId], chainId });

  useEffect(() => {
    // If the user is managing their position, they have already accepted the exit fee
    const hasAcceptedExitFee = widgetState.flow === SealFlow.MANAGE || acceptedExitFee || mkrToLock === 0n;
    const canLockZeroWhenManaging = mkrToLock > 0n || skyToLock > 0n || widgetState.flow === SealFlow.MANAGE; // can lock 0 when managing
    const hasSufficientMkrBalance = !!mkrBalance && mkrToLock <= mkrBalance.value;

    setIsLockCompleted(hasAcceptedExitFee && canLockZeroWhenManaging && hasSufficientMkrBalance);
  }, [acceptedExitFee, mkrToLock, mkrBalance, skyToLock, skyBalance, widgetState.flow]);

  const isMkrSupplyBalanceError =
    address &&
    (mkrBalance?.value || mkrBalance?.value === 0n) &&
    mkrToLock > mkrBalance.value &&
    mkrToLock !== 0n; //don't wait for debouncing on default state

  return (
    <div>
      <TokenInput
        className="w-full"
        label={t`How much MKR would you like to seal?`}
        placeholder={t`Enter amount`}
        token={TOKENS.mkr}
        tokenList={[TOKENS.mkr, TOKENS.sky]}
        balance={mkrBalance?.value}
        value={mkrToLock}
        onChange={(val, event) => {
          setMkrToLock(val);
          onChange?.(val, !!event);
        }}
        dataTestId="supply-first-input-lse"
        error={isMkrSupplyBalanceError ? t`Insufficient funds` : undefined}
        showPercentageButtons={isConnectedAndEnabled}
        enabled={isConnectedAndEnabled}
      />
    </div>
  );
};
