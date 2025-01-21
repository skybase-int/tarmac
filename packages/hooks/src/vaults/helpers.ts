import { mainnet } from 'viem/chains';
import { SupportedCollateralTypes } from './vaults.constants';
import { TENDERLY_CHAIN_ID } from '../constants';

// SupportedCollateralTypes.LOCKSTAKE correspond to the current ilkName used in the Tenderly testnet
// `mainnet_sep_30_0`, https://virtual.mainnet.rpc.tenderly.co/b333d3ac-c24f-41fa-ad41-9176fa719ac3
// TODO: Update the value when we switch to a new testnet
export const getIlkName = (chainId: number): SupportedCollateralTypes => {
  switch (chainId) {
    case mainnet.id:
      return SupportedCollateralTypes.LSE_MKR_A;
    case TENDERLY_CHAIN_ID:
    default:
      return SupportedCollateralTypes.LOCKSTAKE;
  }
};
