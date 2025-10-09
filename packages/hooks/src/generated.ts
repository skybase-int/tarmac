import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent
} from 'wagmi/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// cleReward
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const cleRewardAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_rewardsDistribution', internalType: 'address', type: 'address' },
      { name: '_rewardsToken', internalType: 'address', type: 'address' },
      { name: '_stakingToken', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldOwner', internalType: 'address', type: 'address', indexed: false },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'OwnerChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'OwnerNominated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'isPaused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'PauseChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Recovered'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'referral', internalType: 'uint16', type: 'uint16', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Referral'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardAdded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'RewardPaid'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newRewardsDistribution', internalType: 'address', type: 'address', indexed: false }],
    name: 'RewardsDistributionUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newDuration', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardsDurationUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Staked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Withdrawn'
  },
  { type: 'function', inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  { type: 'function', inputs: [], name: 'exit', outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', inputs: [], name: 'getReward', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'getRewardForDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastPauseTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'nominateNewOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'nominatedOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'periodFinish',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'rewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDistribution',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDistribution', internalType: 'address', type: 'address' }],
    name: 'setRewardsDistribution',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDuration', internalType: 'uint256', type: 'uint256' }],
    name: 'setRewardsDuration',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'referral', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userRewardPerTokenPaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const cleRewardAddress = {
  1: '0x10ab606B067C9C461d8893c47C7512472E19e2Ce',
  314310: '0x10ab606B067C9C461d8893c47C7512472E19e2Ce'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const cleRewardConfig = { address: cleRewardAddress, abi: cleRewardAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// daiUsds
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const daiUsdsAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'daiJoin_', internalType: 'address', type: 'address' },
      { name: 'usdsJoin_', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'DaiToUsds'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'UsdsToDai'
  },
  {
    type: 'function',
    inputs: [],
    name: 'dai',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'daiJoin',
    outputs: [{ name: '', internalType: 'contract DaiJoinLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'daiToUsds',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usds',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdsJoin',
    outputs: [{ name: '', internalType: 'contract UsdsJoinLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'usdsToDai',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const daiUsdsAddress = {
  1: '0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A',
  314310: '0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const daiUsdsConfig = { address: daiUsdsAddress, abi: daiUsdsAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// dsProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const dsProxyAbi = [
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'owner_', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: '_target', type: 'address' },
      { name: '_data', type: 'bytes' }
    ],
    name: 'execute',
    outputs: [{ name: 'response', type: 'bytes32' }],
    stateMutability: 'payable'
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: '_code', type: 'bytes' },
      { name: '_data', type: 'bytes' }
    ],
    name: 'execute',
    outputs: [
      { name: 'target', type: 'address' },
      { name: 'response', type: 'bytes32' }
    ],
    stateMutability: 'payable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'cache',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'authority_', type: 'address' }],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_cacheAddr', type: 'address' }],
    name: 'setCache',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: '_cacheAddr', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  { payable: true, type: 'fallback', stateMutability: 'payable' },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', type: 'bytes4', indexed: true },
      { name: 'guy', type: 'address', indexed: true },
      { name: 'foo', type: 'bytes32', indexed: true },
      { name: 'bar', type: 'bytes32', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false },
      { name: 'fax', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'authority', type: 'address', indexed: true }],
    name: 'LogSetAuthority'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', type: 'address', indexed: true }],
    name: 'LogSetOwner'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const dsProxyAddress = {
  1: '0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc',
  314310: '0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const dsProxyConfig = { address: dsProxyAddress, abi: dsProxyAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ethFlow
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const ethFlowAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_cowSwapSettlement', internalType: 'contract ICoWSwapSettlement', type: 'address' },
      { name: '_wrappedNativeToken', internalType: 'contract IWrappedNativeToken', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  { type: 'error', inputs: [], name: 'EthTransferFailed' },
  { type: 'error', inputs: [], name: 'IncorrectEthAmount' },
  {
    type: 'error',
    inputs: [{ name: 'orderHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'NotAllowedToInvalidateOrder'
  },
  { type: 'error', inputs: [], name: 'NotAllowedZeroSellAmount' },
  { type: 'error', inputs: [], name: 'OrderIsAlreadyExpired' },
  {
    type: 'error',
    inputs: [{ name: 'orderHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'OrderIsAlreadyOwned'
  },
  { type: 'error', inputs: [], name: 'ReceiverMustBeSet' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'orderUid', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'OrderInvalidation'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'order',
        internalType: 'struct GPv2Order.Data',
        type: 'tuple',
        components: [
          { name: 'sellToken', internalType: 'contract IERC20', type: 'address' },
          { name: 'buyToken', internalType: 'contract IERC20', type: 'address' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'sellAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'buyAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'validTo', internalType: 'uint32', type: 'uint32' },
          { name: 'appData', internalType: 'bytes32', type: 'bytes32' },
          { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'kind', internalType: 'bytes32', type: 'bytes32' },
          { name: 'partiallyFillable', internalType: 'bool', type: 'bool' },
          { name: 'sellTokenBalance', internalType: 'bytes32', type: 'bytes32' },
          { name: 'buyTokenBalance', internalType: 'bytes32', type: 'bytes32' }
        ],
        indexed: false
      },
      {
        name: 'signature',
        internalType: 'struct ICoWSwapOnchainOrders.OnchainSignature',
        type: 'tuple',
        components: [
          { name: 'scheme', internalType: 'enum ICoWSwapOnchainOrders.OnchainSigningScheme', type: 'uint8' },
          { name: 'data', internalType: 'bytes', type: 'bytes' }
        ],
        indexed: false
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'OrderPlacement'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'orderUid', internalType: 'bytes', type: 'bytes', indexed: false },
      { name: 'refunder', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'OrderRefund'
  },
  {
    type: 'function',
    inputs: [],
    name: 'cowSwapSettlement',
    outputs: [{ name: '', internalType: 'contract ICoWSwapSettlement', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'order',
        internalType: 'struct EthFlowOrder.Data',
        type: 'tuple',
        components: [
          { name: 'buyToken', internalType: 'contract IERC20', type: 'address' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'sellAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'buyAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'appData', internalType: 'bytes32', type: 'bytes32' },
          { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'validTo', internalType: 'uint32', type: 'uint32' },
          { name: 'partiallyFillable', internalType: 'bool', type: 'bool' },
          { name: 'quoteId', internalType: 'int64', type: 'int64' }
        ]
      }
    ],
    name: 'createOrder',
    outputs: [{ name: 'orderHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'order',
        internalType: 'struct EthFlowOrder.Data',
        type: 'tuple',
        components: [
          { name: 'buyToken', internalType: 'contract IERC20', type: 'address' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'sellAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'buyAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'appData', internalType: 'bytes32', type: 'bytes32' },
          { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'validTo', internalType: 'uint32', type: 'uint32' },
          { name: 'partiallyFillable', internalType: 'bool', type: 'bool' },
          { name: 'quoteId', internalType: 'int64', type: 'int64' }
        ]
      }
    ],
    name: 'invalidateOrder',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'orderArray',
        internalType: 'struct EthFlowOrder.Data[]',
        type: 'tuple[]',
        components: [
          { name: 'buyToken', internalType: 'contract IERC20', type: 'address' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'sellAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'buyAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'appData', internalType: 'bytes32', type: 'bytes32' },
          { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'validTo', internalType: 'uint32', type: 'uint32' },
          { name: 'partiallyFillable', internalType: 'bool', type: 'bool' },
          { name: 'quoteId', internalType: 'int64', type: 'int64' }
        ]
      }
    ],
    name: 'invalidateOrdersIgnoringNotAllowed',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'orderHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'isValidSignature',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'orders',
    outputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'validTo', internalType: 'uint32', type: 'uint32' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'unwrap',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'wrap',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  { type: 'function', inputs: [], name: 'wrapAll', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'wrappedNativeToken',
    outputs: [{ name: '', internalType: 'contract IWrappedNativeToken', type: 'address' }],
    stateMutability: 'view'
  },
  { type: 'receive', stateMutability: 'payable' }
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const ethFlowAddress = {
  1: '0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC',
  8453: '0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC',
  42161: '0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC',
  314310: '0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC'
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const ethFlowConfig = { address: ethFlowAddress, abi: ethFlowAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// gPv2Settlement
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const gPv2SettlementAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'authenticator_', internalType: 'contract GPv2Authentication', type: 'address' },
      { name: 'vault_', internalType: 'contract IVault', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'target', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'selector', internalType: 'bytes4', type: 'bytes4', indexed: false }
    ],
    name: 'Interaction'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'orderUid', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'OrderInvalidated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'orderUid', internalType: 'bytes', type: 'bytes', indexed: false },
      { name: 'signed', internalType: 'bool', type: 'bool', indexed: false }
    ],
    name: 'PreSignature'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'solver', internalType: 'address', type: 'address', indexed: true }],
    name: 'Settlement'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'sellToken', internalType: 'contract IERC20', type: 'address', indexed: false },
      { name: 'buyToken', internalType: 'contract IERC20', type: 'address', indexed: false },
      { name: 'sellAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'buyAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'feeAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'orderUid', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'Trade'
  },
  {
    type: 'function',
    inputs: [],
    name: 'authenticator',
    outputs: [{ name: '', internalType: 'contract GPv2Authentication', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'domainSeparator',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    name: 'filledAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'orderUids', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'freeFilledAmountStorage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'orderUids', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'freePreSignatureStorage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'offset', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'getStorageAt',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'orderUid', internalType: 'bytes', type: 'bytes' }],
    name: 'invalidateOrder',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    name: 'preSignature',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'orderUid', internalType: 'bytes', type: 'bytes' },
      { name: 'signed', internalType: 'bool', type: 'bool' }
    ],
    name: 'setPreSignature',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
      { name: 'clearingPrices', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'trades',
        internalType: 'struct GPv2Trade.Data[]',
        type: 'tuple[]',
        components: [
          { name: 'sellTokenIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'buyTokenIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'sellAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'buyAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'validTo', internalType: 'uint32', type: 'uint32' },
          { name: 'appData', internalType: 'bytes32', type: 'bytes32' },
          { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'flags', internalType: 'uint256', type: 'uint256' },
          { name: 'executedAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' }
        ]
      },
      {
        name: 'interactions',
        internalType: 'struct GPv2Interaction.Data[][3]',
        type: 'tuple[][3]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' }
        ]
      }
    ],
    name: 'settle',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'targetContract', internalType: 'address', type: 'address' },
      { name: 'calldataPayload', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'simulateDelegatecall',
    outputs: [{ name: 'response', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'targetContract', internalType: 'address', type: 'address' },
      { name: 'calldataPayload', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'simulateDelegatecallInternal',
    outputs: [{ name: 'response', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'swaps',
        internalType: 'struct IVault.BatchSwapStep[]',
        type: 'tuple[]',
        components: [
          { name: 'poolId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'assetInIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'assetOutIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'userData', internalType: 'bytes', type: 'bytes' }
        ]
      },
      { name: 'tokens', internalType: 'contract IERC20[]', type: 'address[]' },
      {
        name: 'trade',
        internalType: 'struct GPv2Trade.Data',
        type: 'tuple',
        components: [
          { name: 'sellTokenIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'buyTokenIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'sellAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'buyAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'validTo', internalType: 'uint32', type: 'uint32' },
          { name: 'appData', internalType: 'bytes32', type: 'bytes32' },
          { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'flags', internalType: 'uint256', type: 'uint256' },
          { name: 'executedAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' }
        ]
      }
    ],
    name: 'swap',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'vault',
    outputs: [{ name: '', internalType: 'contract IVault', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'vaultRelayer',
    outputs: [{ name: '', internalType: 'contract GPv2VaultRelayer', type: 'address' }],
    stateMutability: 'view'
  },
  { type: 'receive', stateMutability: 'payable' }
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const gPv2SettlementAddress = {
  1: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41',
  8453: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41',
  42161: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41',
  314310: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41'
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const gPv2SettlementConfig = { address: gPv2SettlementAddress, abi: gPv2SettlementAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lsMkr
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const lsMkrAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const lsMkrAddress = {
  1: '0xb4e0e45e142101dC3Ed768bac219fC35EDBED295',
  314310: '0xb4e0e45e142101dC3Ed768bac219fC35EDBED295'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const lsMkrConfig = { address: lsMkrAddress, abi: lsMkrAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lsMkrUsdsReward
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const lsMkrUsdsRewardAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_rewardsDistribution', internalType: 'address', type: 'address' },
      { name: '_rewardsToken', internalType: 'address', type: 'address' },
      { name: '_stakingToken', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldOwner', internalType: 'address', type: 'address', indexed: false },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'OwnerChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'OwnerNominated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'isPaused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'PauseChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Recovered'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'referral', internalType: 'uint16', type: 'uint16', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Referral'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardAdded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'RewardPaid'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newRewardsDistribution', internalType: 'address', type: 'address', indexed: false }],
    name: 'RewardsDistributionUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newDuration', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardsDurationUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Staked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Withdrawn'
  },
  { type: 'function', inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  { type: 'function', inputs: [], name: 'exit', outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', inputs: [], name: 'getReward', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'getRewardForDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastPauseTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'nominateNewOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'nominatedOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'periodFinish',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'rewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDistribution',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDistribution', internalType: 'address', type: 'address' }],
    name: 'setRewardsDistribution',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDuration', internalType: 'uint256', type: 'uint256' }],
    name: 'setRewardsDuration',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'referral', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userRewardPerTokenPaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const lsMkrUsdsRewardAddress = {
  1: '0x92282235a39bE957fF1f37619fD22A9aE5507CB1',
  314310: '0x92282235a39bE957fF1f37619fD22A9aE5507CB1'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const lsMkrUsdsRewardConfig = { address: lsMkrUsdsRewardAddress, abi: lsMkrUsdsRewardAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lsSky
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const lsSkyAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const lsSkyAddress = {
  1: '0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C',
  314310: '0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const lsSkyConfig = { address: lsSkyAddress, abi: lsSkyAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lsSkySpkReward
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const lsSkySpkRewardAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_rewardsDistribution', internalType: 'address', type: 'address' },
      { name: '_rewardsToken', internalType: 'address', type: 'address' },
      { name: '_stakingToken', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldOwner', internalType: 'address', type: 'address', indexed: false },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'OwnerChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'OwnerNominated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'isPaused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'PauseChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Recovered'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'referral', internalType: 'uint16', type: 'uint16', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Referral'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardAdded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'RewardPaid'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newRewardsDistribution', internalType: 'address', type: 'address', indexed: false }],
    name: 'RewardsDistributionUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newDuration', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardsDurationUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Staked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Withdrawn'
  },
  { type: 'function', inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  { type: 'function', inputs: [], name: 'exit', outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', inputs: [], name: 'getReward', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'getRewardForDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastPauseTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'nominateNewOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'nominatedOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'periodFinish',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'rewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDistribution',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDistribution', internalType: 'address', type: 'address' }],
    name: 'setRewardsDistribution',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDuration', internalType: 'uint256', type: 'uint256' }],
    name: 'setRewardsDuration',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'referral', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userRewardPerTokenPaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const lsSkySpkRewardAddress = {
  1: '0x99cBC0e4E6427F6939536eD24d1275B95ff77404',
  314310: '0x99cBC0e4E6427F6939536eD24d1275B95ff77404'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const lsSkySpkRewardConfig = { address: lsSkySpkRewardAddress, abi: lsSkySpkRewardAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lsSkyUsdsReward
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const lsSkyUsdsRewardAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_rewardsDistribution', internalType: 'address', type: 'address' },
      { name: '_rewardsToken', internalType: 'address', type: 'address' },
      { name: '_stakingToken', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldOwner', internalType: 'address', type: 'address', indexed: false },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'OwnerChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'OwnerNominated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'isPaused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'PauseChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Recovered'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'referral', internalType: 'uint16', type: 'uint16', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Referral'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardAdded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'RewardPaid'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newRewardsDistribution', internalType: 'address', type: 'address', indexed: false }],
    name: 'RewardsDistributionUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newDuration', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardsDurationUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Staked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Withdrawn'
  },
  { type: 'function', inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  { type: 'function', inputs: [], name: 'exit', outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', inputs: [], name: 'getReward', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'getRewardForDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastPauseTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'nominateNewOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'nominatedOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'periodFinish',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'rewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDistribution',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDistribution', internalType: 'address', type: 'address' }],
    name: 'setRewardsDistribution',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDuration', internalType: 'uint256', type: 'uint256' }],
    name: 'setRewardsDuration',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'referral', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userRewardPerTokenPaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const lsSkyUsdsRewardAddress = {
  1: '0x38E4254bD82ED5Ee97CD1C4278FAae748d998865',
  314310: '0x38E4254bD82ED5Ee97CD1C4278FAae748d998865'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const lsSkyUsdsRewardConfig = { address: lsSkyUsdsRewardAddress, abi: lsSkyUsdsRewardAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mcdDai
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const mcdDaiAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'chainId_', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', internalType: 'address', type: 'address', indexed: true },
      { name: 'guy', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'arg1', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg2', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', internalType: 'address', type: 'address', indexed: true },
      { name: 'dst', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'holder', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'allowed', internalType: 'bool', type: 'bool' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'pull',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'push',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const mcdDaiAddress = {
  1: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  8453: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
  42161: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  314310: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const mcdDaiConfig = { address: mcdDaiAddress, abi: mcdDaiAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mcdJug
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const mcdJugAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'vat_', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'arg1', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg2', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'base',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32' }],
    name: 'drip',
    outputs: [{ name: 'rate', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'address', type: 'address' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ilks',
    outputs: [
      { name: 'duty', internalType: 'uint256', type: 'uint256' },
      { name: 'rho', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32' }],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vat',
    outputs: [{ name: '', internalType: 'contract VatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vow',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const mcdJugAddress = {
  1: '0x19c0976f590D67707E62397C87829d896Dc0f1F1',
  314310: '0x19c0976f590D67707E62397C87829d896Dc0f1F1'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const mcdJugConfig = { address: mcdJugAddress, abi: mcdJugAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mcdPot
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const mcdPotAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'vat_', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'arg1', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg2', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'Pie',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'cage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'chi',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'drip',
    outputs: [{ name: 'tmp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'dsr',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'exit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'addr', internalType: 'address', type: 'address' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'join',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'live',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'pie',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'rho',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vat',
    outputs: [{ name: '', internalType: 'contract VatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vow',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const mcdPotAddress = {
  1: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7',
  314310: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const mcdPotConfig = { address: mcdPotAddress, abi: mcdPotAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mcdSpot
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const mcdSpotAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'vat_', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'arg1', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg2', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'spot', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Poke'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'cage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'pip_', internalType: 'address', type: 'address' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ilks',
    outputs: [
      { name: 'pip', internalType: 'contract PipLike', type: 'address' },
      { name: 'mat', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'live',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'par',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32' }],
    name: 'poke',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vat',
    outputs: [{ name: '', internalType: 'contract VatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const mcdSpotAddress = {
  1: '0x65C79fcB50Ca1594B025960e539eD7A9a6D434A3',
  314310: '0x65C79fcB50Ca1594B025960e539eD7A9a6D434A3'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const mcdSpotConfig = { address: mcdSpotAddress, abi: mcdSpotAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mcdVat
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const mcdVatAbi = [
  { payable: false, type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'arg1', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg2', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg3', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'Line',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'cage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'can',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'dai',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'debt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'flux',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'i', internalType: 'bytes32', type: 'bytes32' },
      { name: 'u', internalType: 'address', type: 'address' },
      { name: 'rate', internalType: 'int256', type: 'int256' }
    ],
    name: 'fold',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'dink', internalType: 'int256', type: 'int256' },
      { name: 'dart', internalType: 'int256', type: 'int256' }
    ],
    name: 'fork',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'i', internalType: 'bytes32', type: 'bytes32' },
      { name: 'u', internalType: 'address', type: 'address' },
      { name: 'v', internalType: 'address', type: 'address' },
      { name: 'w', internalType: 'address', type: 'address' },
      { name: 'dink', internalType: 'int256', type: 'int256' },
      { name: 'dart', internalType: 'int256', type: 'int256' }
    ],
    name: 'frob',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'gem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'i', internalType: 'bytes32', type: 'bytes32' },
      { name: 'u', internalType: 'address', type: 'address' },
      { name: 'v', internalType: 'address', type: 'address' },
      { name: 'w', internalType: 'address', type: 'address' },
      { name: 'dink', internalType: 'int256', type: 'int256' },
      { name: 'dart', internalType: 'int256', type: 'int256' }
    ],
    name: 'grab',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'rad', internalType: 'uint256', type: 'uint256' }],
    name: 'heal',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'hope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ilks',
    outputs: [
      { name: 'Art', internalType: 'uint256', type: 'uint256' },
      { name: 'rate', internalType: 'uint256', type: 'uint256' },
      { name: 'spot', internalType: 'uint256', type: 'uint256' },
      { name: 'line', internalType: 'uint256', type: 'uint256' },
      { name: 'dust', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32' }],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'live',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'rad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'nope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'sin',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'int256', type: 'int256' }
    ],
    name: 'slip',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'u', internalType: 'address', type: 'address' },
      { name: 'v', internalType: 'address', type: 'address' },
      { name: 'rad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'suck',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'urns',
    outputs: [
      { name: 'ink', internalType: 'uint256', type: 'uint256' },
      { name: 'art', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const mcdVatAddress = {
  1: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B',
  314310: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const mcdVatConfig = { address: mcdVatAddress, abi: mcdVatAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// merkleDistributor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const merkleDistributorAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'token_', internalType: 'address', type: 'address' },
      { name: 'merkleRoot_', internalType: 'bytes32', type: 'bytes32' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'account', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Claimed'
  },
  {
    type: 'function',
    inputs: [
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' }
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'isClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'merkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const merkleDistributorAddress = {
  1: '0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe',
  314310: '0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const merkleDistributorConfig = {
  address: merkleDistributorAddress,
  abi: merkleDistributorAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mkr
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const mkrAbi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'stop',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'owner_', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'name_', type: 'bytes32' }],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'src', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'stopped',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'authority_', type: 'address' }],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'push',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'start',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', type: 'address' }],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'guy', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'pull',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'symbol_', type: 'bytes32' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guy', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Mint'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guy', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Burn'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'authority', type: 'address', indexed: true }],
    name: 'LogSetAuthority'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', type: 'address', indexed: true }],
    name: 'LogSetOwner'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', type: 'bytes4', indexed: true },
      { name: 'guy', type: 'address', indexed: true },
      { name: 'foo', type: 'bytes32', indexed: true },
      { name: 'bar', type: 'bytes32', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false },
      { name: 'fax', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const mkrAddress = {
  1: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
  314310: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const mkrConfig = { address: mkrAddress, abi: mkrAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mkrSky
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const mkrSkyAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'mkr_', internalType: 'address', type: 'address' },
      { name: 'sky_', internalType: 'address', type: 'address' },
      { name: 'rate_', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'skyAmt', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'Burn'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'take', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Collect'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'File'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'mkrAmt', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'skyAmt', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'skyFee', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'MkrToSky'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'function',
    inputs: [{ name: 'skyAmt', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'collect',
    outputs: [{ name: 'take_', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'mkr',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'mkrAmt', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mkrToSky',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'sky',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'take',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const mkrSkyAddress = {
  1: '0xA1Ea1bA18E88C381C724a75F23a130420C403f9a',
  314310: '0xA1Ea1bA18E88C381C724a75F23a130420C403f9a'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const mkrSkyConfig = { address: mkrSkyAddress, abi: mkrSkyAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// proxyActions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const proxyActionsAbi = [
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'ok', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'cdpAllow',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'apt', internalType: 'address', type: 'address' },
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'daiJoin_join',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'jug', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'draw',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'enter',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: 'apt', internalType: 'address', type: 'address' },
      { name: 'urn', internalType: 'address', type: 'address' }
    ],
    name: 'ethJoin_join',
    outputs: [],
    stateMutability: 'payable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'ethJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'exitETH',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'gemJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'exitGem',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'flux',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'ethJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'freeETH',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'gemJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'freeGem',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'dink', internalType: 'int256', type: 'int256' },
      { name: 'dart', internalType: 'int256', type: 'int256' }
    ],
    name: 'frob',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'apt', internalType: 'address', type: 'address' },
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' },
      { name: 'transferFrom', internalType: 'bool', type: 'bool' }
    ],
    name: 'gemJoin_join',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'give',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'proxyRegistry', internalType: 'address', type: 'address' },
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'dst', internalType: 'address', type: 'address' }
    ],
    name: 'giveToProxy',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'obj', internalType: 'address', type: 'address' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'hope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'ethJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'lockETH',
    outputs: [],
    stateMutability: 'payable'
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'jug', internalType: 'address', type: 'address' },
      { name: 'ethJoin', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wadD', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'lockETHAndDraw',
    outputs: [],
    stateMutability: 'payable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'gemJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' },
      { name: 'transferFrom', internalType: 'bool', type: 'bool' }
    ],
    name: 'lockGem',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'jug', internalType: 'address', type: 'address' },
      { name: 'gemJoin', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wadC', internalType: 'uint256', type: 'uint256' },
      { name: 'wadD', internalType: 'uint256', type: 'uint256' },
      { name: 'transferFrom', internalType: 'bool', type: 'bool' }
    ],
    name: 'lockGemAndDraw',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'gemJoin', internalType: 'address', type: 'address' }],
    name: 'makeGemBag',
    outputs: [{ name: 'bag', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'rad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'obj', internalType: 'address', type: 'address' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'nope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'open',
    outputs: [{ name: 'cdp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'jug', internalType: 'address', type: 'address' },
      { name: 'ethJoin', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'wadD', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'openLockETHAndDraw',
    outputs: [{ name: 'cdp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'jug', internalType: 'address', type: 'address' },
      { name: 'gntJoin', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'wadC', internalType: 'uint256', type: 'uint256' },
      { name: 'wadD', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'openLockGNTAndDraw',
    outputs: [
      { name: 'bag', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'jug', internalType: 'address', type: 'address' },
      { name: 'gemJoin', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'wadC', internalType: 'uint256', type: 'uint256' },
      { name: 'wadD', internalType: 'uint256', type: 'uint256' },
      { name: 'transferFrom', internalType: 'bool', type: 'bool' }
    ],
    name: 'openLockGemAndDraw',
    outputs: [{ name: 'cdp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'dst', internalType: 'address', type: 'address' }
    ],
    name: 'quit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'ethJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'safeLockETH',
    outputs: [],
    stateMutability: 'payable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'gemJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' },
      { name: 'transferFrom', internalType: 'bool', type: 'bool' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'safeLockGem',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'safeWipe',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'safeWipeAll',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'cdpSrc', internalType: 'uint256', type: 'uint256' },
      { name: 'cdpOrg', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'shift',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'gem', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'ok', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'urnAllow',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipe',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipeAll',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'ethJoin', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wadC', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipeAllAndFreeETH',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'gemJoin', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wadC', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipeAllAndFreeGem',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'ethJoin', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wadC', internalType: 'uint256', type: 'uint256' },
      { name: 'wadD', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipeAndFreeETH',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'manager', internalType: 'address', type: 'address' },
      { name: 'gemJoin', internalType: 'address', type: 'address' },
      { name: 'daiJoin', internalType: 'address', type: 'address' },
      { name: 'cdp', internalType: 'uint256', type: 'uint256' },
      { name: 'wadC', internalType: 'uint256', type: 'uint256' },
      { name: 'wadD', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipeAndFreeGem',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const proxyActionsAddress = {
  1: '0x82ecD135Dce65Fbc6DbdD0e4237E0AF93FFD5038',
  314310: '0x82ecD135Dce65Fbc6DbdD0e4237E0AF93FFD5038'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const proxyActionsConfig = { address: proxyActionsAddress, abi: proxyActionsAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// proxyRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4)
 */
export const proxyRegistryAbi = [
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'build',
    outputs: [{ name: 'proxy', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'proxies',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'build',
    outputs: [{ name: 'proxy', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'factory_', type: 'address' }],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4)
 */
export const proxyRegistryAddress = {
  1: '0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4',
  314310: '0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4)
 */
export const proxyRegistryConfig = { address: proxyRegistryAddress, abi: proxyRegistryAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// psm3L2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const psm3L2Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'owner_', internalType: 'address', type: 'address' },
      { name: 'usdc_', internalType: 'address', type: 'address' },
      { name: 'usds_', internalType: 'address', type: 'address' },
      { name: 'susds_', internalType: 'address', type: 'address' },
      { name: 'rateProvider_', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'receiver', internalType: 'address', type: 'address', indexed: true },
      { name: 'assetsDeposited', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'sharesMinted', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Deposit'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'OwnershipTransferred'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldPocket', internalType: 'address', type: 'address', indexed: true },
      { name: 'newPocket', internalType: 'address', type: 'address', indexed: true },
      { name: 'amountTransferred', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'PocketSet'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'assetIn', internalType: 'address', type: 'address', indexed: true },
      { name: 'assetOut', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      { name: 'receiver', internalType: 'address', type: 'address', indexed: true },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'referralCode', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Swap'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'receiver', internalType: 'address', type: 'address', indexed: true },
      { name: 'assetsWithdrawn', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'sharesBurned', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Withdraw'
  },
  {
    type: 'function',
    inputs: [{ name: 'numShares', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToAssetValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'numShares', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'convertToAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'assets', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'convertToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'assetValue', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'assetsToDeposit', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'deposit',
    outputs: [{ name: 'newShares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'pocket',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'assetsToDeposit', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'previewDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetIn', internalType: 'address', type: 'address' },
      { name: 'assetOut', internalType: 'address', type: 'address' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'previewSwapExactIn',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetIn', internalType: 'address', type: 'address' },
      { name: 'assetOut', internalType: 'address', type: 'address' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'previewSwapExactOut',
    outputs: [{ name: 'amountIn', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'maxAssetsToWithdraw', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'previewWithdraw',
    outputs: [
      { name: 'sharesToBurn', internalType: 'uint256', type: 'uint256' },
      { name: 'assetsWithdrawn', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rateProvider',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'newPocket', internalType: 'address', type: 'address' }],
    name: 'setPocket',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'shares',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'susds',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetIn', internalType: 'address', type: 'address' },
      { name: 'assetOut', internalType: 'address', type: 'address' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'referralCode', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'swapExactIn',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetIn', internalType: 'address', type: 'address' },
      { name: 'assetOut', internalType: 'address', type: 'address' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'maxAmountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'referralCode', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'swapExactOut',
    outputs: [{ name: 'amountIn', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdc',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usds',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'maxAssetsToWithdraw', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'withdraw',
    outputs: [{ name: 'assetsWithdrawn', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const psm3L2Address = {
  10: '0xe0F9978b907853F354d79188A3dEfbD41978af62',
  130: '0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f',
  8453: '0x1601843c5E9bC251A3272907010AFa41Fa18347E',
  42161: '0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266'
} as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const psm3L2Config = { address: psm3L2Address, abi: psm3L2Abi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// sUsds
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD)
 */
export const sUsdsAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: true }],
    name: 'Upgraded'
  },
  { type: 'fallback', stateMutability: 'payable' }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD)
 */
export const sUsdsAddress = {
  1: '0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD',
  314310: '0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD)
 */
export const sUsdsConfig = { address: sUsdsAddress, abi: sUsdsAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// sUsdsImplementation
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const sUsdsImplementationAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'usdsJoin_', internalType: 'address', type: 'address' },
      { name: 'vow_', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'assets', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'shares', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Deposit'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'chi', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'diff', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Drip'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'File'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'version', internalType: 'uint64', type: 'uint64', indexed: false }],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'referral', internalType: 'uint16', type: 'uint16', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'assets', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'shares', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Referral'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: true }],
    name: 'Upgraded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'receiver', internalType: 'address', type: 'address', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'assets', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'shares', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Withdraw'
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'asset',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'chi',
    outputs: [{ name: '', internalType: 'uint192', type: 'uint192' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' }
    ],
    name: 'deposit',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'referral', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'deposit',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'drip',
    outputs: [{ name: 'nChi', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'getImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  { type: 'function', inputs: [], name: 'initialize', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'maxRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'maxWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'referral', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'mint',
    outputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' }
    ],
    name: 'mint',
    outputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'previewDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'previewMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'previewRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'previewWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'redeem',
    outputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rho',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'ssr',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usds',
    outputs: [{ name: '', internalType: 'contract UsdsLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdsJoin',
    outputs: [{ name: '', internalType: 'contract UsdsJoinLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'vat',
    outputs: [{ name: '', internalType: 'contract VatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'vow',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'withdraw',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const sUsdsImplementationAddress = {
  1: '0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0',
  314310: '0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const sUsdsImplementationConfig = {
  address: sUsdsImplementationAddress,
  abi: sUsdsImplementationAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// sUsdsL2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xb5B2dc7fd34C249F4be7fB1fCea07950784229e0)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0xA06b10Db9F390990364A3984C04FaDf1c13691b5)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x5875eEE11Cf8398102FdAd704C9E96607675467a)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xdDb46999F8891663a8F2828d25298f70416d7610)
 */
export const sUsdsL2Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: true }],
    name: 'Upgraded'
  },
  { type: 'fallback', stateMutability: 'payable' }
] as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xb5B2dc7fd34C249F4be7fB1fCea07950784229e0)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0xA06b10Db9F390990364A3984C04FaDf1c13691b5)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x5875eEE11Cf8398102FdAd704C9E96607675467a)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xdDb46999F8891663a8F2828d25298f70416d7610)
 */
export const sUsdsL2Address = {
  10: '0xb5B2dc7fd34C249F4be7fB1fCea07950784229e0',
  130: '0xA06b10Db9F390990364A3984C04FaDf1c13691b5',
  8453: '0x5875eEE11Cf8398102FdAd704C9E96607675467a',
  42161: '0xdDb46999F8891663a8F2828d25298f70416d7610'
} as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xb5B2dc7fd34C249F4be7fB1fCea07950784229e0)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0xA06b10Db9F390990364A3984C04FaDf1c13691b5)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x5875eEE11Cf8398102FdAd704C9E96607675467a)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xdDb46999F8891663a8F2828d25298f70416d7610)
 */
export const sUsdsL2Config = { address: sUsdsL2Address, abi: sUsdsL2Abi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// sealModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const sealModuleAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'voteDelegateFactory_', internalType: 'address', type: 'address' },
      { name: 'usdsJoin_', internalType: 'address', type: 'address' },
      { name: 'ilk_', internalType: 'bytes32', type: 'bytes32' },
      { name: 'mkrSky_', internalType: 'address', type: 'address' },
      { name: 'lsmkr_', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'farm', internalType: 'address', type: 'address', indexed: false }],
    name: 'AddFarm'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'farm', internalType: 'address', type: 'address', indexed: false }],
    name: 'DelFarm'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Draw'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'File'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'File'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'freed', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Free'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'FreeNoFee'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'skyWad', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'skyFreed', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'FreeSky'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'farm', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'amt', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'GetReward'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'Hope'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'ref', internalType: 'uint16', type: 'uint16', indexed: false }
    ],
    name: 'Lock'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'skyWad', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'ref', internalType: 'uint16', type: 'uint16', indexed: false }
    ],
    name: 'LockSky'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'Nope'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'OnKick'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address', indexed: true },
      { name: 'sold', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'burn', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'refund', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'OnRemove'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address', indexed: true },
      { name: 'who', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'OnTake'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'urn', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'Open'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'farm', internalType: 'address', type: 'address', indexed: true },
      { name: 'ref', internalType: 'uint16', type: 'uint16', indexed: false }
    ],
    name: 'SelectFarm'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'voteDelegate', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'SelectVoteDelegate'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Wipe'
  },
  {
    type: 'function',
    inputs: [{ name: 'farm', internalType: 'address', type: 'address' }],
    name: 'addFarm',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'farm', internalType: 'address', type: 'address' }],
    name: 'delFarm',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'draw',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'farm', internalType: 'address', type: 'address' }],
    name: 'farms',
    outputs: [{ name: '', internalType: 'enum LockstakeEngine.FarmStatus', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'address', type: 'address' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'free',
    outputs: [{ name: 'freed', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'freeNoFee',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'skyWad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'freeSky',
    outputs: [{ name: 'skyFreed', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'farm', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' }
    ],
    name: 'getReward',
    outputs: [{ name: 'amt', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'hope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'ilk',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'isUrnAuth',
    outputs: [{ name: 'ok', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'jug',
    outputs: [{ name: '', internalType: 'contract JugLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' },
      { name: 'ref', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'lock',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'skyWad', internalType: 'uint256', type: 'uint256' },
      { name: 'ref', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'lockSky',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lsmkr',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'mkr',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'mkrSky',
    outputs: [{ name: '', internalType: 'contract MkrSkyLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'mkrSkyRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'nope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'onKick',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'sold', internalType: 'uint256', type: 'uint256' },
      { name: 'left', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'onRemove',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'who', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'onTake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'open',
    outputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ownerUrns',
    outputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ownerUrnsCount',
    outputs: [{ name: 'count', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'farm', internalType: 'address', type: 'address' },
      { name: 'ref', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'selectFarm',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'voteDelegate', internalType: 'address', type: 'address' }
    ],
    name: 'selectVoteDelegate',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'sky',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    name: 'urnAuctions',
    outputs: [{ name: 'auctionsCount', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'urnCan',
    outputs: [{ name: 'allowed', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    name: 'urnFarms',
    outputs: [{ name: 'farm', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'urnImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    name: 'urnOwners',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    name: 'urnVoteDelegates',
    outputs: [{ name: 'voteDelegate', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usds',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdsJoin',
    outputs: [{ name: '', internalType: 'contract UsdsJoinLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'vat',
    outputs: [{ name: '', internalType: 'contract VatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'voteDelegateFactory',
    outputs: [{ name: '', internalType: 'contract VoteDelegateFactoryLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: 'allowed', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipe',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipeAll',
    outputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const sealModuleAddress = {
  1: '0x2b16C07D5fD5cC701a0a871eae2aad6DA5fc8f12',
  314310: '0x2b16C07D5fD5cC701a0a871eae2aad6DA5fc8f12'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const sealModuleConfig = { address: sealModuleAddress, abi: sealModuleAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// sky
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const skyAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'deploymentChainId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const skyAddress = {
  1: '0x56072C95FAA701256059aa122697B133aDEd9279',
  314310: '0x56072C95FAA701256059aa122697B133aDEd9279'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const skyConfig = { address: skyAddress, abi: skyAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// spk
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const spkAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'string', type: 'string', indexed: false }
    ],
    name: 'File'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'deploymentChainId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'string', type: 'string' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const spkAddress = {
  1: '0xc20059e0317DE91738d13af027DfC4a50781b066',
  314310: '0xc20059e0317DE91738d13af027DfC4a50781b066'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const spkConfig = { address: spkAddress, abi: spkAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ssrAuthOracle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const ssrAuthOracleAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'previousAdminRole', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'newAdminRole', internalType: 'bytes32', type: 'bytes32', indexed: true }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'maxSSR', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'SetMaxSSR'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nextData',
        internalType: 'struct ISSROracle.SUSDSData',
        type: 'tuple',
        components: [
          { name: 'ssr', internalType: 'uint96', type: 'uint96' },
          { name: 'chi', internalType: 'uint120', type: 'uint120' },
          { name: 'rho', internalType: 'uint40', type: 'uint40' }
        ],
        indexed: false
      }
    ],
    name: 'SetSUSDSData'
  },
  {
    type: 'function',
    inputs: [],
    name: 'DATA_PROVIDER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAPR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChi',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    name: 'getConversionRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'getConversionRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    name: 'getConversionRateBinomialApprox',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'getConversionRateBinomialApprox',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    name: 'getConversionRateLinearApprox',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'getConversionRateLinearApprox',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRho',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSSR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSUSDSData',
    outputs: [
      {
        name: '',
        internalType: 'struct ISSROracle.SUSDSData',
        type: 'tuple',
        components: [
          { name: 'ssr', internalType: 'uint96', type: 'uint96' },
          { name: 'chi', internalType: 'uint120', type: 'uint120' },
          { name: 'rho', internalType: 'uint40', type: 'uint40' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxSSR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_maxSSR', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxSSR',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'nextData',
        internalType: 'struct ISSROracle.SUSDSData',
        type: 'tuple',
        components: [
          { name: 'ssr', internalType: 'uint96', type: 'uint96' },
          { name: 'chi', internalType: 'uint120', type: 'uint120' },
          { name: 'rho', internalType: 'uint40', type: 'uint40' }
        ]
      }
    ],
    name: 'setSUSDSData',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  }
] as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const ssrAuthOracleAddress = {
  10: '0x6E53585449142A5E6D5fC918AE6BEa341dC81C68',
  130: '0x1566BFA55D95686a823751298533D42651183988',
  8453: '0x65d946e533748A998B1f0E430803e39A6388f7a1',
  42161: '0xEE2816c1E1eed14d444552654Ed3027abC033A36'
} as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const ssrAuthOracleConfig = { address: ssrAuthOracleAddress, abi: ssrAuthOracleAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// stakeModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const stakeModuleAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'voteDelegateFactory_', internalType: 'address', type: 'address' },
      { name: 'usdsJoin_', internalType: 'address', type: 'address' },
      { name: 'ilk_', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sky_', internalType: 'address', type: 'address' },
      { name: 'lssky_', internalType: 'address', type: 'address' },
      { name: 'fee_', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'farm', internalType: 'address', type: 'address', indexed: false }],
    name: 'AddFarm'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'farm', internalType: 'address', type: 'address', indexed: false }],
    name: 'DelFarm'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Draw'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'File'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'freed', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Free'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'FreeNoFee'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'farm', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'amt', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'GetReward'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'Hope'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'ref', internalType: 'uint16', type: 'uint16', indexed: false }
    ],
    name: 'Lock'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'Nope'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'OnKick'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address', indexed: true },
      { name: 'sold', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'burn', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'refund', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'OnRemove'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address', indexed: true },
      { name: 'who', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'OnTake'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'urn', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'Open'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'farm', internalType: 'address', type: 'address', indexed: true },
      { name: 'ref', internalType: 'uint16', type: 'uint16', indexed: false }
    ],
    name: 'SelectFarm'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'voteDelegate', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'SelectVoteDelegate'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'index', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Wipe'
  },
  {
    type: 'function',
    inputs: [{ name: 'farm', internalType: 'address', type: 'address' }],
    name: 'addFarm',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'farm', internalType: 'address', type: 'address' }],
    name: 'delFarm',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'draw',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'farm', internalType: 'address', type: 'address' }],
    name: 'farms',
    outputs: [{ name: '', internalType: 'enum LockstakeEngine.FarmStatus', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'address', type: 'address' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'free',
    outputs: [{ name: 'freed', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'freeNoFee',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'farm', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' }
    ],
    name: 'getReward',
    outputs: [{ name: 'amt', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'hope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'ilk',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'isUrnAuth',
    outputs: [{ name: 'ok', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'jug',
    outputs: [{ name: '', internalType: 'contract JugLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' },
      { name: 'ref', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'lock',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lssky',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'nope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'onKick',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'sold', internalType: 'uint256', type: 'uint256' },
      { name: 'left', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'onRemove',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'who', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'onTake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'open',
    outputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ownerUrns',
    outputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ownerUrnsCount',
    outputs: [{ name: 'count', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'farm', internalType: 'address', type: 'address' },
      { name: 'ref', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'selectFarm',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'voteDelegate', internalType: 'address', type: 'address' }
    ],
    name: 'selectVoteDelegate',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'sky',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    name: 'urnAuctions',
    outputs: [{ name: 'auctionsCount', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'urn', internalType: 'address', type: 'address' },
      { name: 'usr', internalType: 'address', type: 'address' }
    ],
    name: 'urnCan',
    outputs: [{ name: 'allowed', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    name: 'urnFarms',
    outputs: [{ name: 'farm', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'urnImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    name: 'urnOwners',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'urn', internalType: 'address', type: 'address' }],
    name: 'urnVoteDelegates',
    outputs: [{ name: 'voteDelegate', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usds',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdsJoin',
    outputs: [{ name: '', internalType: 'contract UsdsJoinLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'vat',
    outputs: [{ name: '', internalType: 'contract VatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'voteDelegateFactory',
    outputs: [{ name: '', internalType: 'contract VoteDelegateFactoryLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: 'allowed', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipe',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'wipeAll',
    outputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const stakeModuleAddress = {
  1: '0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3',
  314310: '0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const stakeModuleConfig = { address: stakeModuleAddress, abi: stakeModuleAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdc
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const usdcAbi = [
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'newImplementation', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: 'newImplementation', type: 'address' },
      { name: 'data', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'newAdmin', type: 'address' }],
    name: 'changeAdmin',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: '_implementation', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  { payable: true, type: 'fallback', stateMutability: 'payable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousAdmin', type: 'address', indexed: false },
      { name: 'newAdmin', type: 'address', indexed: false }
    ],
    name: 'AdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', type: 'address', indexed: false }],
    name: 'Upgraded'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const usdcAddress = {
  1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  314310: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const usdcConfig = { address: usdcAddress, abi: usdcAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdcL2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const usdcL2Abi = [
  {
    type: 'constructor',
    inputs: [{ name: 'implementationContract', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousAdmin', internalType: 'address', type: 'address', indexed: false },
      { name: 'newAdmin', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'AdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: false }],
    name: 'Upgraded'
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'newAdmin', internalType: 'address', type: 'address' }],
    name: 'changeAdmin',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'newImplementation', internalType: 'address', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable'
  }
] as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const usdcL2Address = {
  10: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
  130: '0x078D782b760474a361dDA0AF3839290b0EF57AD6',
  8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'
} as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const usdcL2Config = { address: usdcL2Address, abi: usdcL2Abi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usds
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdC035D45d973E3EC169d2276DDab16f1e407384F)
 */
export const usdsAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: true }],
    name: 'Upgraded'
  },
  { type: 'fallback', stateMutability: 'payable' }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdC035D45d973E3EC169d2276DDab16f1e407384F)
 */
export const usdsAddress = {
  1: '0xdC035D45d973E3EC169d2276DDab16f1e407384F',
  314310: '0xdC035D45d973E3EC169d2276DDab16f1e407384F'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdC035D45d973E3EC169d2276DDab16f1e407384F)
 */
export const usdsConfig = { address: usdsAddress, abi: usdsAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdsL2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4F13a96EC5C4Cf34e442b46Bbd98a0791F20edC3)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7E10036Acc4B56d4dFCa3b77810356CE52313F9C)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x820C137fa70C8691f0e44Dc420a5e53c168921Dc)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x6491c05A82219b8D1479057361ff1654749b876b)
 */
export const usdsL2Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: true }],
    name: 'Upgraded'
  },
  { type: 'fallback', stateMutability: 'payable' }
] as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4F13a96EC5C4Cf34e442b46Bbd98a0791F20edC3)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7E10036Acc4B56d4dFCa3b77810356CE52313F9C)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x820C137fa70C8691f0e44Dc420a5e53c168921Dc)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x6491c05A82219b8D1479057361ff1654749b876b)
 */
export const usdsL2Address = {
  10: '0x4F13a96EC5C4Cf34e442b46Bbd98a0791F20edC3',
  130: '0x7E10036Acc4B56d4dFCa3b77810356CE52313F9C',
  8453: '0x820C137fa70C8691f0e44Dc420a5e53c168921Dc',
  42161: '0x6491c05A82219b8D1479057361ff1654749b876b'
} as const;

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4F13a96EC5C4Cf34e442b46Bbd98a0791F20edC3)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7E10036Acc4B56d4dFCa3b77810356CE52313F9C)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x820C137fa70C8691f0e44Dc420a5e53c168921Dc)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x6491c05A82219b8D1479057361ff1654749b876b)
 */
export const usdsL2Config = { address: usdsL2Address, abi: usdsL2Abi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdsSkyReward
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const usdsSkyRewardAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_rewardsDistribution', internalType: 'address', type: 'address' },
      { name: '_rewardsToken', internalType: 'address', type: 'address' },
      { name: '_stakingToken', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldOwner', internalType: 'address', type: 'address', indexed: false },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'OwnerChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'OwnerNominated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'isPaused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'PauseChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Recovered'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'referral', internalType: 'uint16', type: 'uint16', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Referral'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardAdded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'RewardPaid'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newRewardsDistribution', internalType: 'address', type: 'address', indexed: false }],
    name: 'RewardsDistributionUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newDuration', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardsDurationUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Staked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Withdrawn'
  },
  { type: 'function', inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  { type: 'function', inputs: [], name: 'exit', outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', inputs: [], name: 'getReward', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'getRewardForDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastPauseTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'nominateNewOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'nominatedOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'periodFinish',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'rewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDistribution',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDistribution', internalType: 'address', type: 'address' }],
    name: 'setRewardsDistribution',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDuration', internalType: 'uint256', type: 'uint256' }],
    name: 'setRewardsDuration',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'referral', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userRewardPerTokenPaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const usdsSkyRewardAddress = {
  1: '0x0650CAF159C5A49f711e8169D4336ECB9b950275',
  314310: '0x0650CAF159C5A49f711e8169D4336ECB9b950275'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const usdsSkyRewardConfig = { address: usdsSkyRewardAddress, abi: usdsSkyRewardAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdsSpkReward
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const usdsSpkRewardAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_rewardsDistribution', internalType: 'address', type: 'address' },
      { name: '_rewardsToken', internalType: 'address', type: 'address' },
      { name: '_stakingToken', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldOwner', internalType: 'address', type: 'address', indexed: false },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: false }
    ],
    name: 'OwnerChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'OwnerNominated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'isPaused', internalType: 'bool', type: 'bool', indexed: false }],
    name: 'PauseChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Recovered'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'referral', internalType: 'uint16', type: 'uint16', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Referral'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardAdded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'reward', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'RewardPaid'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newRewardsDistribution', internalType: 'address', type: 'address', indexed: false }],
    name: 'RewardsDistributionUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newDuration', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'RewardsDurationUpdated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Staked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Withdrawn'
  },
  { type: 'function', inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  { type: 'function', inputs: [], name: 'exit', outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', inputs: [], name: 'getReward', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'getRewardForDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastPauseTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'nominateNewOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'nominatedOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'periodFinish',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'rewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDistribution',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDistribution', internalType: 'address', type: 'address' }],
    name: 'setRewardsDistribution',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '_rewardsDuration', internalType: 'uint256', type: 'uint256' }],
    name: 'setRewardsDuration',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'referral', internalType: 'uint16', type: 'uint16' }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userRewardPerTokenPaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const usdsSpkRewardAddress = {
  1: '0x173e314C7635B45322cd8Cb14f44b312e079F3af',
  314310: '0x173e314C7635B45322cd8Cb14f44b312e079F3af'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const usdsSpkRewardConfig = { address: usdsSpkRewardAddress, abi: usdsSpkRewardAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdt
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const usdtAbi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_upgradedAddress', type: 'address' }],
    name: 'deprecate',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'deprecated',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_evilUser', type: 'address' }],
    name: 'addBlackList',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'upgradedAddress',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'maximumFee',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: '_totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_maker', type: 'address' }],
    name: 'getBlackListStatus',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' }
    ],
    name: 'allowed',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'who', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'getOwner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'newBasisPoints', type: 'uint256' },
      { name: 'newMaxFee', type: 'uint256' }
    ],
    name: 'setParams',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'issue',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'redeem',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'basisPointsRate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'isBlackListed',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_clearedUser', type: 'address' }],
    name: 'removeBlackList',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'MAX_UINT',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: '_blackListedUser', type: 'address' }],
    name: 'destroyBlackFunds',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [
      { name: '_initialSupply', type: 'uint256' },
      { name: '_name', type: 'string' },
      { name: '_symbol', type: 'string' },
      { name: '_decimals', type: 'uint256' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'amount', type: 'uint256', indexed: false }],
    name: 'Issue'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'amount', type: 'uint256', indexed: false }],
    name: 'Redeem'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newAddress', type: 'address', indexed: false }],
    name: 'Deprecate'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'feeBasisPoints', type: 'uint256', indexed: false },
      { name: 'maxFee', type: 'uint256', indexed: false }
    ],
    name: 'Params'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_blackListedUser', type: 'address', indexed: false },
      { name: '_balance', type: 'uint256', indexed: false }
    ],
    name: 'DestroyedBlackFunds'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_user', type: 'address', indexed: false }],
    name: 'AddedBlackList'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_user', type: 'address', indexed: false }],
    name: 'RemovedBlackList'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Pause' },
  { type: 'event', anonymous: false, inputs: [], name: 'Unpause' }
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const usdtAddress = {
  1: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  8453: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
  42161: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  314310: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const usdtConfig = { address: usdtAddress, abi: usdtAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// weth
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const wethAbi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  { payable: true, type: 'fallback', stateMutability: 'payable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', type: 'address', indexed: true },
      { name: 'guy', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', type: 'address', indexed: true },
      { name: 'dst', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'dst', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Deposit'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Withdrawal'
  }
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const wethAddress = {
  1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  8453: '0x4200000000000000000000000000000000000006',
  42161: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  314310: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const wethConfig = { address: wethAddress, abi: wethAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleReward = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"earned"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardEarned = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'earned'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"getRewardForDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardGetRewardForDuration = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'getRewardForDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"lastPauseTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardLastPauseTime = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'lastPauseTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"lastTimeRewardApplicable"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardLastTimeRewardApplicable = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'lastTimeRewardApplicable'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"lastUpdateTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardLastUpdateTime = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'lastUpdateTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"nominatedOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardNominatedOwner = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'nominatedOwner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardOwner = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardPaused = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'paused'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"periodFinish"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardPeriodFinish = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'periodFinish'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"rewardPerToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardRewardPerToken = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'rewardPerToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"rewardPerTokenStored"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardRewardPerTokenStored = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'rewardPerTokenStored'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"rewardRate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardRewardRate = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'rewardRate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"rewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardRewards = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'rewards'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"rewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardRewardsDistribution = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'rewardsDistribution'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"rewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardRewardsDuration = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'rewardsDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"rewardsToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardRewardsToken = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'rewardsToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"stakingToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'stakingToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"userRewardPerTokenPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useReadCleRewardUserRewardPerTokenPaid = /*#__PURE__*/ createUseReadContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'userRewardPerTokenPaid'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleReward = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardAcceptOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardExit = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardGetReward = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardNominateNewOwner = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardNotifyRewardAmount = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardRecoverErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardSetPaused = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardSetRewardsDistribution = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardSetRewardsDuration = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardStake = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWriteCleRewardWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleReward = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardAcceptOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardExit = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardGetReward = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardNominateNewOwner = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardNotifyRewardAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardRecoverErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardSetPaused = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardSetRewardsDistribution = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardSetRewardsDuration = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardStake = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cleRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useSimulateCleRewardWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleReward = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"OwnerChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardOwnerChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'OwnerChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"OwnerNominated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardOwnerNominated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'OwnerNominated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"PauseChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardPauseChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'PauseChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"Recovered"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardRecovered = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'Recovered'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"Referral"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardReferral = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'Referral'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"RewardAdded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardRewardAdded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'RewardAdded'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"RewardPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardRewardPaid = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'RewardPaid'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"RewardsDistributionUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardRewardsDistributionUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'RewardsDistributionUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"RewardsDurationUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardRewardsDurationUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'RewardsDurationUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"Staked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardStaked = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'Staked'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cleRewardAbi}__ and `eventName` set to `"Withdrawn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce)
 */
export const useWatchCleRewardWithdrawn = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cleRewardAbi,
  address: cleRewardAddress,
  eventName: 'Withdrawn'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiUsdsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useReadDaiUsds = /*#__PURE__*/ createUseReadContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiUsdsAbi}__ and `functionName` set to `"dai"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useReadDaiUsdsDai = /*#__PURE__*/ createUseReadContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  functionName: 'dai'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiUsdsAbi}__ and `functionName` set to `"daiJoin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useReadDaiUsdsDaiJoin = /*#__PURE__*/ createUseReadContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  functionName: 'daiJoin'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiUsdsAbi}__ and `functionName` set to `"usds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useReadDaiUsdsUsds = /*#__PURE__*/ createUseReadContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  functionName: 'usds'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiUsdsAbi}__ and `functionName` set to `"usdsJoin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useReadDaiUsdsUsdsJoin = /*#__PURE__*/ createUseReadContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  functionName: 'usdsJoin'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link daiUsdsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useWriteDaiUsds = /*#__PURE__*/ createUseWriteContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link daiUsdsAbi}__ and `functionName` set to `"daiToUsds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useWriteDaiUsdsDaiToUsds = /*#__PURE__*/ createUseWriteContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  functionName: 'daiToUsds'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link daiUsdsAbi}__ and `functionName` set to `"usdsToDai"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useWriteDaiUsdsUsdsToDai = /*#__PURE__*/ createUseWriteContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  functionName: 'usdsToDai'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link daiUsdsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useSimulateDaiUsds = /*#__PURE__*/ createUseSimulateContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link daiUsdsAbi}__ and `functionName` set to `"daiToUsds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useSimulateDaiUsdsDaiToUsds = /*#__PURE__*/ createUseSimulateContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  functionName: 'daiToUsds'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link daiUsdsAbi}__ and `functionName` set to `"usdsToDai"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useSimulateDaiUsdsUsdsToDai = /*#__PURE__*/ createUseSimulateContract({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  functionName: 'usdsToDai'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link daiUsdsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useWatchDaiUsds = /*#__PURE__*/ createUseWatchContractEvent({
  abi: daiUsdsAbi,
  address: daiUsdsAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link daiUsdsAbi}__ and `eventName` set to `"DaiToUsds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useWatchDaiUsdsDaiToUsds = /*#__PURE__*/ createUseWatchContractEvent({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  eventName: 'DaiToUsds'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link daiUsdsAbi}__ and `eventName` set to `"UsdsToDai"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A)
 */
export const useWatchDaiUsdsUsdsToDai = /*#__PURE__*/ createUseWatchContractEvent({
  abi: daiUsdsAbi,
  address: daiUsdsAddress,
  eventName: 'UsdsToDai'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dsProxyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useReadDsProxy = /*#__PURE__*/ createUseReadContract({
  abi: dsProxyAbi,
  address: dsProxyAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"cache"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useReadDsProxyCache = /*#__PURE__*/ createUseReadContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'cache'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useReadDsProxyOwner = /*#__PURE__*/ createUseReadContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"authority"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useReadDsProxyAuthority = /*#__PURE__*/ createUseReadContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'authority'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dsProxyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useWriteDsProxy = /*#__PURE__*/ createUseWriteContract({
  abi: dsProxyAbi,
  address: dsProxyAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"setOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useWriteDsProxySetOwner = /*#__PURE__*/ createUseWriteContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'setOwner'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"execute"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useWriteDsProxyExecute = /*#__PURE__*/ createUseWriteContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'execute'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"setAuthority"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useWriteDsProxySetAuthority = /*#__PURE__*/ createUseWriteContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'setAuthority'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"setCache"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useWriteDsProxySetCache = /*#__PURE__*/ createUseWriteContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'setCache'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dsProxyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useSimulateDsProxy = /*#__PURE__*/ createUseSimulateContract({
  abi: dsProxyAbi,
  address: dsProxyAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"setOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useSimulateDsProxySetOwner = /*#__PURE__*/ createUseSimulateContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'setOwner'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"execute"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useSimulateDsProxyExecute = /*#__PURE__*/ createUseSimulateContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'execute'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"setAuthority"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useSimulateDsProxySetAuthority = /*#__PURE__*/ createUseSimulateContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'setAuthority'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dsProxyAbi}__ and `functionName` set to `"setCache"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useSimulateDsProxySetCache = /*#__PURE__*/ createUseSimulateContract({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  functionName: 'setCache'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dsProxyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useWatchDsProxy = /*#__PURE__*/ createUseWatchContractEvent({
  abi: dsProxyAbi,
  address: dsProxyAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dsProxyAbi}__ and `eventName` set to `"LogNote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useWatchDsProxyLogNote = /*#__PURE__*/ createUseWatchContractEvent({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  eventName: 'LogNote'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dsProxyAbi}__ and `eventName` set to `"LogSetAuthority"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useWatchDsProxyLogSetAuthority = /*#__PURE__*/ createUseWatchContractEvent({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  eventName: 'LogSetAuthority'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link dsProxyAbi}__ and `eventName` set to `"LogSetOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc)
 */
export const useWatchDsProxyLogSetOwner = /*#__PURE__*/ createUseWatchContractEvent({
  abi: dsProxyAbi,
  address: dsProxyAddress,
  eventName: 'LogSetOwner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ethFlowAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useReadEthFlow = /*#__PURE__*/ createUseReadContract({
  abi: ethFlowAbi,
  address: ethFlowAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"cowSwapSettlement"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useReadEthFlowCowSwapSettlement = /*#__PURE__*/ createUseReadContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'cowSwapSettlement'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"isValidSignature"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useReadEthFlowIsValidSignature = /*#__PURE__*/ createUseReadContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'isValidSignature'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"orders"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useReadEthFlowOrders = /*#__PURE__*/ createUseReadContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'orders'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"wrappedNativeToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useReadEthFlowWrappedNativeToken = /*#__PURE__*/ createUseReadContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'wrappedNativeToken'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ethFlowAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWriteEthFlow = /*#__PURE__*/ createUseWriteContract({
  abi: ethFlowAbi,
  address: ethFlowAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"createOrder"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWriteEthFlowCreateOrder = /*#__PURE__*/ createUseWriteContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'createOrder'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"invalidateOrder"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWriteEthFlowInvalidateOrder = /*#__PURE__*/ createUseWriteContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'invalidateOrder'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"invalidateOrdersIgnoringNotAllowed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWriteEthFlowInvalidateOrdersIgnoringNotAllowed = /*#__PURE__*/ createUseWriteContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'invalidateOrdersIgnoringNotAllowed'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"unwrap"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWriteEthFlowUnwrap = /*#__PURE__*/ createUseWriteContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'unwrap'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"wrap"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWriteEthFlowWrap = /*#__PURE__*/ createUseWriteContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'wrap'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"wrapAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWriteEthFlowWrapAll = /*#__PURE__*/ createUseWriteContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'wrapAll'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ethFlowAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useSimulateEthFlow = /*#__PURE__*/ createUseSimulateContract({
  abi: ethFlowAbi,
  address: ethFlowAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"createOrder"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useSimulateEthFlowCreateOrder = /*#__PURE__*/ createUseSimulateContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'createOrder'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"invalidateOrder"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useSimulateEthFlowInvalidateOrder = /*#__PURE__*/ createUseSimulateContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'invalidateOrder'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"invalidateOrdersIgnoringNotAllowed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useSimulateEthFlowInvalidateOrdersIgnoringNotAllowed = /*#__PURE__*/ createUseSimulateContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'invalidateOrdersIgnoringNotAllowed'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"unwrap"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useSimulateEthFlowUnwrap = /*#__PURE__*/ createUseSimulateContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'unwrap'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"wrap"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useSimulateEthFlowWrap = /*#__PURE__*/ createUseSimulateContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'wrap'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ethFlowAbi}__ and `functionName` set to `"wrapAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useSimulateEthFlowWrapAll = /*#__PURE__*/ createUseSimulateContract({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  functionName: 'wrapAll'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ethFlowAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWatchEthFlow = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ethFlowAbi,
  address: ethFlowAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ethFlowAbi}__ and `eventName` set to `"OrderInvalidation"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWatchEthFlowOrderInvalidation = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  eventName: 'OrderInvalidation'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ethFlowAbi}__ and `eventName` set to `"OrderPlacement"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWatchEthFlowOrderPlacement = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  eventName: 'OrderPlacement'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ethFlowAbi}__ and `eventName` set to `"OrderRefund"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xbA3cB449bD2B4ADddBc894D8697F5170800EAdeC)
 */
export const useWatchEthFlowOrderRefund = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ethFlowAbi,
  address: ethFlowAddress,
  eventName: 'OrderRefund'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gPv2SettlementAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useReadGPv2Settlement = /*#__PURE__*/ createUseReadContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"authenticator"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useReadGPv2SettlementAuthenticator = /*#__PURE__*/ createUseReadContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'authenticator'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"domainSeparator"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useReadGPv2SettlementDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'domainSeparator'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"filledAmount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useReadGPv2SettlementFilledAmount = /*#__PURE__*/ createUseReadContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'filledAmount'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"getStorageAt"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useReadGPv2SettlementGetStorageAt = /*#__PURE__*/ createUseReadContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'getStorageAt'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"preSignature"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useReadGPv2SettlementPreSignature = /*#__PURE__*/ createUseReadContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'preSignature'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"vault"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useReadGPv2SettlementVault = /*#__PURE__*/ createUseReadContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'vault'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"vaultRelayer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useReadGPv2SettlementVaultRelayer = /*#__PURE__*/ createUseReadContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'vaultRelayer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gPv2SettlementAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWriteGPv2Settlement = /*#__PURE__*/ createUseWriteContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"freeFilledAmountStorage"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWriteGPv2SettlementFreeFilledAmountStorage = /*#__PURE__*/ createUseWriteContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'freeFilledAmountStorage'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"freePreSignatureStorage"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWriteGPv2SettlementFreePreSignatureStorage = /*#__PURE__*/ createUseWriteContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'freePreSignatureStorage'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"invalidateOrder"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWriteGPv2SettlementInvalidateOrder = /*#__PURE__*/ createUseWriteContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'invalidateOrder'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"setPreSignature"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWriteGPv2SettlementSetPreSignature = /*#__PURE__*/ createUseWriteContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'setPreSignature'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"settle"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWriteGPv2SettlementSettle = /*#__PURE__*/ createUseWriteContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'settle'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"simulateDelegatecall"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWriteGPv2SettlementSimulateDelegatecall = /*#__PURE__*/ createUseWriteContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'simulateDelegatecall'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"simulateDelegatecallInternal"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWriteGPv2SettlementSimulateDelegatecallInternal = /*#__PURE__*/ createUseWriteContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'simulateDelegatecallInternal'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"swap"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWriteGPv2SettlementSwap = /*#__PURE__*/ createUseWriteContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'swap'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gPv2SettlementAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useSimulateGPv2Settlement = /*#__PURE__*/ createUseSimulateContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"freeFilledAmountStorage"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useSimulateGPv2SettlementFreeFilledAmountStorage = /*#__PURE__*/ createUseSimulateContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'freeFilledAmountStorage'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"freePreSignatureStorage"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useSimulateGPv2SettlementFreePreSignatureStorage = /*#__PURE__*/ createUseSimulateContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'freePreSignatureStorage'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"invalidateOrder"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useSimulateGPv2SettlementInvalidateOrder = /*#__PURE__*/ createUseSimulateContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'invalidateOrder'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"setPreSignature"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useSimulateGPv2SettlementSetPreSignature = /*#__PURE__*/ createUseSimulateContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'setPreSignature'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"settle"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useSimulateGPv2SettlementSettle = /*#__PURE__*/ createUseSimulateContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'settle'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"simulateDelegatecall"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useSimulateGPv2SettlementSimulateDelegatecall = /*#__PURE__*/ createUseSimulateContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'simulateDelegatecall'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"simulateDelegatecallInternal"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useSimulateGPv2SettlementSimulateDelegatecallInternal = /*#__PURE__*/ createUseSimulateContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'simulateDelegatecallInternal'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `functionName` set to `"swap"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useSimulateGPv2SettlementSwap = /*#__PURE__*/ createUseSimulateContract({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  functionName: 'swap'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gPv2SettlementAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWatchGPv2Settlement = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `eventName` set to `"Interaction"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWatchGPv2SettlementInteraction = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  eventName: 'Interaction'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `eventName` set to `"OrderInvalidated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWatchGPv2SettlementOrderInvalidated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  eventName: 'OrderInvalidated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `eventName` set to `"PreSignature"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWatchGPv2SettlementPreSignature = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  eventName: 'PreSignature'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `eventName` set to `"Settlement"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWatchGPv2SettlementSettlement = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  eventName: 'Settlement'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gPv2SettlementAbi}__ and `eventName` set to `"Trade"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)
 */
export const useWatchGPv2SettlementTrade = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gPv2SettlementAbi,
  address: gPv2SettlementAddress,
  eventName: 'Trade'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useReadLsMkr = /*#__PURE__*/ createUseReadContract({ abi: lsMkrAbi, address: lsMkrAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useReadLsMkrAllowance = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useReadLsMkrBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useReadLsMkrDecimals = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useReadLsMkrName = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useReadLsMkrSymbol = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useReadLsMkrTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"version"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useReadLsMkrVersion = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'version'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useReadLsMkrWards = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWriteLsMkr = /*#__PURE__*/ createUseWriteContract({ abi: lsMkrAbi, address: lsMkrAddress });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWriteLsMkrApprove = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWriteLsMkrBurn = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWriteLsMkrDeny = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWriteLsMkrMint = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWriteLsMkrRely = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWriteLsMkrTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWriteLsMkrTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useSimulateLsMkr = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrAbi,
  address: lsMkrAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useSimulateLsMkrApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useSimulateLsMkrBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useSimulateLsMkrDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useSimulateLsMkrMint = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useSimulateLsMkrRely = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useSimulateLsMkrTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useSimulateLsMkrTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWatchLsMkr = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrAbi,
  address: lsMkrAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWatchLsMkrApproval = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrAbi}__ and `eventName` set to `"Deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWatchLsMkrDeny = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  eventName: 'Deny'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrAbi}__ and `eventName` set to `"Rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWatchLsMkrRely = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  eventName: 'Rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb4e0e45e142101dc3ed768bac219fc35edbed295)
 */
export const useWatchLsMkrTransfer = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrAbi,
  address: lsMkrAddress,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsReward = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"earned"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardEarned = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'earned'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"getRewardForDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardGetRewardForDuration = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'getRewardForDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"lastPauseTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardLastPauseTime = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'lastPauseTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"lastTimeRewardApplicable"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardLastTimeRewardApplicable = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'lastTimeRewardApplicable'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"lastUpdateTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardLastUpdateTime = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'lastUpdateTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"nominatedOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardNominatedOwner = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'nominatedOwner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardOwner = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardPaused = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'paused'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"periodFinish"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardPeriodFinish = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'periodFinish'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"rewardPerToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardRewardPerToken = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'rewardPerToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"rewardPerTokenStored"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardRewardPerTokenStored = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'rewardPerTokenStored'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"rewardRate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardRewardRate = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'rewardRate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"rewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardRewards = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'rewards'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"rewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardRewardsDistribution = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'rewardsDistribution'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"rewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardRewardsDuration = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'rewardsDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"rewardsToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardRewardsToken = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'rewardsToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"stakingToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'stakingToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"userRewardPerTokenPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useReadLsMkrUsdsRewardUserRewardPerTokenPaid = /*#__PURE__*/ createUseReadContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'userRewardPerTokenPaid'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsReward = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardAcceptOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardExit = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardGetReward = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardNominateNewOwner = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardNotifyRewardAmount = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardRecoverErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardSetPaused = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardSetRewardsDistribution = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardSetRewardsDuration = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardStake = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWriteLsMkrUsdsRewardWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsReward = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardAcceptOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardExit = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardGetReward = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardNominateNewOwner = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardNotifyRewardAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardRecoverErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardSetPaused = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardSetRewardsDistribution = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardSetRewardsDuration = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardStake = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useSimulateLsMkrUsdsRewardWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsReward = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"OwnerChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardOwnerChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'OwnerChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"OwnerNominated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardOwnerNominated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'OwnerNominated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"PauseChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardPauseChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'PauseChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"Recovered"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardRecovered = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'Recovered'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"Referral"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardReferral = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'Referral'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"RewardAdded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardRewardAdded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'RewardAdded'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"RewardPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardRewardPaid = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'RewardPaid'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"RewardsDistributionUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardRewardsDistributionUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'RewardsDistributionUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"RewardsDurationUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardRewardsDurationUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'RewardsDurationUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"Staked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardStaked = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'Staked'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsMkrUsdsRewardAbi}__ and `eventName` set to `"Withdrawn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x92282235a39be957ff1f37619fd22a9ae5507cb1)
 */
export const useWatchLsMkrUsdsRewardWithdrawn = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsMkrUsdsRewardAbi,
  address: lsMkrUsdsRewardAddress,
  eventName: 'Withdrawn'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useReadLsSky = /*#__PURE__*/ createUseReadContract({ abi: lsSkyAbi, address: lsSkyAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useReadLsSkyAllowance = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useReadLsSkyBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useReadLsSkyDecimals = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useReadLsSkyName = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useReadLsSkySymbol = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useReadLsSkyTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"version"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useReadLsSkyVersion = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'version'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useReadLsSkyWards = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWriteLsSky = /*#__PURE__*/ createUseWriteContract({ abi: lsSkyAbi, address: lsSkyAddress });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWriteLsSkyApprove = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWriteLsSkyBurn = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWriteLsSkyDeny = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWriteLsSkyMint = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWriteLsSkyRely = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWriteLsSkyTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWriteLsSkyTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useSimulateLsSky = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyAbi,
  address: lsSkyAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useSimulateLsSkyApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useSimulateLsSkyBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useSimulateLsSkyDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useSimulateLsSkyMint = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useSimulateLsSkyRely = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useSimulateLsSkyTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useSimulateLsSkyTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWatchLsSky = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyAbi,
  address: lsSkyAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWatchLsSkyApproval = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyAbi}__ and `eventName` set to `"Deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWatchLsSkyDeny = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  eventName: 'Deny'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyAbi}__ and `eventName` set to `"Rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWatchLsSkyRely = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  eventName: 'Rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C)
 */
export const useWatchLsSkyTransfer = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyAbi,
  address: lsSkyAddress,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkReward = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"earned"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardEarned = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'earned'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"getRewardForDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardGetRewardForDuration = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'getRewardForDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"lastPauseTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardLastPauseTime = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'lastPauseTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"lastTimeRewardApplicable"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardLastTimeRewardApplicable = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'lastTimeRewardApplicable'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"lastUpdateTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardLastUpdateTime = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'lastUpdateTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"nominatedOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardNominatedOwner = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'nominatedOwner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardOwner = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardPaused = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'paused'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"periodFinish"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardPeriodFinish = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'periodFinish'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"rewardPerToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardRewardPerToken = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'rewardPerToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"rewardPerTokenStored"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardRewardPerTokenStored = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'rewardPerTokenStored'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"rewardRate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardRewardRate = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'rewardRate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"rewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardRewards = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'rewards'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"rewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardRewardsDistribution = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'rewardsDistribution'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"rewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardRewardsDuration = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'rewardsDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"rewardsToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardRewardsToken = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'rewardsToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"stakingToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'stakingToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"userRewardPerTokenPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useReadLsSkySpkRewardUserRewardPerTokenPaid = /*#__PURE__*/ createUseReadContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'userRewardPerTokenPaid'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkReward = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardAcceptOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardExit = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardGetReward = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardNominateNewOwner = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardNotifyRewardAmount = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardRecoverErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardSetPaused = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardSetRewardsDistribution = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardSetRewardsDuration = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardStake = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWriteLsSkySpkRewardWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkReward = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardAcceptOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardExit = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardGetReward = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardNominateNewOwner = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardNotifyRewardAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardRecoverErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardSetPaused = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardSetRewardsDistribution = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardSetRewardsDuration = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardStake = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useSimulateLsSkySpkRewardWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkReward = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"OwnerChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardOwnerChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'OwnerChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"OwnerNominated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardOwnerNominated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'OwnerNominated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"PauseChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardPauseChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'PauseChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"Recovered"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardRecovered = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'Recovered'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"Referral"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardReferral = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'Referral'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"RewardAdded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardRewardAdded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'RewardAdded'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"RewardPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardRewardPaid = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'RewardPaid'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"RewardsDistributionUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardRewardsDistributionUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'RewardsDistributionUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"RewardsDurationUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardRewardsDurationUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'RewardsDurationUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"Staked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardStaked = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'Staked'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkySpkRewardAbi}__ and `eventName` set to `"Withdrawn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x99cBC0e4E6427F6939536eD24d1275B95ff77404)
 */
export const useWatchLsSkySpkRewardWithdrawn = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkySpkRewardAbi,
  address: lsSkySpkRewardAddress,
  eventName: 'Withdrawn'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsReward = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"earned"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardEarned = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'earned'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"getRewardForDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardGetRewardForDuration = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'getRewardForDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"lastPauseTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardLastPauseTime = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'lastPauseTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"lastTimeRewardApplicable"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardLastTimeRewardApplicable = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'lastTimeRewardApplicable'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"lastUpdateTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardLastUpdateTime = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'lastUpdateTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"nominatedOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardNominatedOwner = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'nominatedOwner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardOwner = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardPaused = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'paused'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"periodFinish"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardPeriodFinish = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'periodFinish'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"rewardPerToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardRewardPerToken = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'rewardPerToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"rewardPerTokenStored"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardRewardPerTokenStored = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'rewardPerTokenStored'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"rewardRate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardRewardRate = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'rewardRate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"rewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardRewards = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'rewards'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"rewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardRewardsDistribution = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'rewardsDistribution'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"rewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardRewardsDuration = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'rewardsDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"rewardsToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardRewardsToken = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'rewardsToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"stakingToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'stakingToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"userRewardPerTokenPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useReadLsSkyUsdsRewardUserRewardPerTokenPaid = /*#__PURE__*/ createUseReadContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'userRewardPerTokenPaid'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsReward = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardAcceptOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardExit = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardGetReward = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardNominateNewOwner = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardNotifyRewardAmount = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardRecoverErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardSetPaused = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardSetRewardsDistribution = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardSetRewardsDuration = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardStake = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWriteLsSkyUsdsRewardWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsReward = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardAcceptOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardExit = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardGetReward = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardNominateNewOwner = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardNotifyRewardAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardRecoverErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardSetPaused = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardSetRewardsDistribution = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardSetRewardsDuration = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardStake = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useSimulateLsSkyUsdsRewardWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsReward = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"OwnerChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardOwnerChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'OwnerChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"OwnerNominated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardOwnerNominated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'OwnerNominated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"PauseChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardPauseChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'PauseChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"Recovered"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardRecovered = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'Recovered'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"Referral"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardReferral = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'Referral'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"RewardAdded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardRewardAdded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'RewardAdded'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"RewardPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardRewardPaid = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'RewardPaid'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"RewardsDistributionUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardRewardsDistributionUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'RewardsDistributionUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"RewardsDurationUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardRewardsDurationUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'RewardsDurationUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"Staked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardStaked = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'Staked'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lsSkyUsdsRewardAbi}__ and `eventName` set to `"Withdrawn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x38E4254bD82ED5Ee97CD1C4278FAae748d998865)
 */
export const useWatchLsSkyUsdsRewardWithdrawn = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lsSkyUsdsRewardAbi,
  address: lsSkyUsdsRewardAddress,
  eventName: 'Withdrawn'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDai = /*#__PURE__*/ createUseReadContract({ abi: mcdDaiAbi, address: mcdDaiAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'DOMAIN_SEPARATOR'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiPermitTypehash = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'PERMIT_TYPEHASH'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiAllowance = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiDecimals = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiName = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"nonces"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiNonces = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'nonces'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiSymbol = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"version"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiVersion = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'version'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"wards"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useReadMcdDaiWards = /*#__PURE__*/ createUseReadContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDai = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiApprove = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiBurn = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"deny"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiDeny = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiMint = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"move"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiMove = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'move'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiPermit = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'permit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"pull"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiPull = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'pull'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"push"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiPush = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'push'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"rely"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiRely = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWriteMcdDaiTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDai = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"deny"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiMint = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"move"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiMove = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'move'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'permit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"pull"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiPull = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'pull'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"push"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiPush = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'push'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"rely"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiRely = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdDaiAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useSimulateMcdDaiTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdDaiAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWatchMcdDai = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdDaiAbi,
  address: mcdDaiAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdDaiAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWatchMcdDaiApproval = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdDaiAbi}__ and `eventName` set to `"LogNote"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWatchMcdDaiLogNote = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  eventName: 'LogNote'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdDaiAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1)
 */
export const useWatchMcdDaiTransfer = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdDaiAbi,
  address: mcdDaiAddress,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdJugAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useReadMcdJug = /*#__PURE__*/ createUseReadContract({ abi: mcdJugAbi, address: mcdJugAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"base"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useReadMcdJugBase = /*#__PURE__*/ createUseReadContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'base'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"ilks"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useReadMcdJugIlks = /*#__PURE__*/ createUseReadContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'ilks'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"vat"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useReadMcdJugVat = /*#__PURE__*/ createUseReadContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'vat'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"vow"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useReadMcdJugVow = /*#__PURE__*/ createUseReadContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'vow'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useReadMcdJugWards = /*#__PURE__*/ createUseReadContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdJugAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useWriteMcdJug = /*#__PURE__*/ createUseWriteContract({
  abi: mcdJugAbi,
  address: mcdJugAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useWriteMcdJugDeny = /*#__PURE__*/ createUseWriteContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"drip"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useWriteMcdJugDrip = /*#__PURE__*/ createUseWriteContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'drip'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useWriteMcdJugFile = /*#__PURE__*/ createUseWriteContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"init"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useWriteMcdJugInit = /*#__PURE__*/ createUseWriteContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'init'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useWriteMcdJugRely = /*#__PURE__*/ createUseWriteContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdJugAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useSimulateMcdJug = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdJugAbi,
  address: mcdJugAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useSimulateMcdJugDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"drip"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useSimulateMcdJugDrip = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'drip'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useSimulateMcdJugFile = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"init"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useSimulateMcdJugInit = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'init'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdJugAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useSimulateMcdJugRely = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdJugAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useWatchMcdJug = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdJugAbi,
  address: mcdJugAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdJugAbi}__ and `eventName` set to `"LogNote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x19c0976f590d67707e62397c87829d896dc0f1f1)
 */
export const useWatchMcdJugLogNote = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdJugAbi,
  address: mcdJugAddress,
  eventName: 'LogNote'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPot = /*#__PURE__*/ createUseReadContract({ abi: mcdPotAbi, address: mcdPotAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"Pie"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPotPie = /*#__PURE__*/ createUseReadContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'Pie'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"chi"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPotChi = /*#__PURE__*/ createUseReadContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'chi'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"dsr"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPotDsr = /*#__PURE__*/ createUseReadContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'dsr'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"live"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPotLive = /*#__PURE__*/ createUseReadContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'live'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"pie"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPotPie_2 = /*#__PURE__*/ createUseReadContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'pie'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"rho"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPotRho = /*#__PURE__*/ createUseReadContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'rho'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"vat"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPotVat = /*#__PURE__*/ createUseReadContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'vat'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"vow"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPotVow = /*#__PURE__*/ createUseReadContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'vow'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useReadMcdPotWards = /*#__PURE__*/ createUseReadContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdPotAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWriteMcdPot = /*#__PURE__*/ createUseWriteContract({
  abi: mcdPotAbi,
  address: mcdPotAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"cage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWriteMcdPotCage = /*#__PURE__*/ createUseWriteContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'cage'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWriteMcdPotDeny = /*#__PURE__*/ createUseWriteContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"drip"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWriteMcdPotDrip = /*#__PURE__*/ createUseWriteContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'drip'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWriteMcdPotExit = /*#__PURE__*/ createUseWriteContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWriteMcdPotFile = /*#__PURE__*/ createUseWriteContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"join"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWriteMcdPotJoin = /*#__PURE__*/ createUseWriteContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'join'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWriteMcdPotRely = /*#__PURE__*/ createUseWriteContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdPotAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useSimulateMcdPot = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdPotAbi,
  address: mcdPotAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"cage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useSimulateMcdPotCage = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'cage'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useSimulateMcdPotDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"drip"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useSimulateMcdPotDrip = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'drip'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useSimulateMcdPotExit = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useSimulateMcdPotFile = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"join"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useSimulateMcdPotJoin = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'join'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdPotAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useSimulateMcdPotRely = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdPotAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWatchMcdPot = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdPotAbi,
  address: mcdPotAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdPotAbi}__ and `eventName` set to `"LogNote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const useWatchMcdPotLogNote = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdPotAbi,
  address: mcdPotAddress,
  eventName: 'LogNote'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdSpotAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useReadMcdSpot = /*#__PURE__*/ createUseReadContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"ilks"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useReadMcdSpotIlks = /*#__PURE__*/ createUseReadContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'ilks'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"live"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useReadMcdSpotLive = /*#__PURE__*/ createUseReadContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'live'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"par"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useReadMcdSpotPar = /*#__PURE__*/ createUseReadContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'par'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"vat"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useReadMcdSpotVat = /*#__PURE__*/ createUseReadContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'vat'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useReadMcdSpotWards = /*#__PURE__*/ createUseReadContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdSpotAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useWriteMcdSpot = /*#__PURE__*/ createUseWriteContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"cage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useWriteMcdSpotCage = /*#__PURE__*/ createUseWriteContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'cage'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useWriteMcdSpotDeny = /*#__PURE__*/ createUseWriteContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useWriteMcdSpotFile = /*#__PURE__*/ createUseWriteContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"poke"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useWriteMcdSpotPoke = /*#__PURE__*/ createUseWriteContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'poke'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useWriteMcdSpotRely = /*#__PURE__*/ createUseWriteContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdSpotAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useSimulateMcdSpot = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"cage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useSimulateMcdSpotCage = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'cage'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useSimulateMcdSpotDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useSimulateMcdSpotFile = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"poke"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useSimulateMcdSpotPoke = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'poke'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdSpotAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useSimulateMcdSpotRely = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdSpotAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useWatchMcdSpot = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdSpotAbi,
  address: mcdSpotAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdSpotAbi}__ and `eventName` set to `"LogNote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useWatchMcdSpotLogNote = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  eventName: 'LogNote'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdSpotAbi}__ and `eventName` set to `"Poke"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65c79fcb50ca1594b025960e539ed7a9a6d434a3)
 */
export const useWatchMcdSpotPoke = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdSpotAbi,
  address: mcdSpotAddress,
  eventName: 'Poke'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVat = /*#__PURE__*/ createUseReadContract({ abi: mcdVatAbi, address: mcdVatAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"Line"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatLine = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'Line'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"can"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatCan = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'can'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"dai"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatDai = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'dai'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"debt"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatDebt = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'debt'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"gem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatGem = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'gem'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"ilks"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatIlks = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'ilks'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"live"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatLive = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'live'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"sin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatSin = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'sin'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"urns"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatUrns = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'urns'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"vice"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatVice = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'vice'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useReadMcdVatWards = /*#__PURE__*/ createUseReadContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVat = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"cage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatCage = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'cage'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatDeny = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatFile = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"flux"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatFlux = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'flux'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"fold"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatFold = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'fold'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"fork"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatFork = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'fork'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"frob"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatFrob = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'frob'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"grab"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatGrab = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'grab'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"heal"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatHeal = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'heal'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatHope = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'hope'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"init"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatInit = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'init'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"move"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatMove = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'move'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatNope = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'nope'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatRely = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"slip"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatSlip = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'slip'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"suck"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWriteMcdVatSuck = /*#__PURE__*/ createUseWriteContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'suck'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVat = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"cage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatCage = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'cage'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatFile = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"flux"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatFlux = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'flux'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"fold"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatFold = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'fold'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"fork"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatFork = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'fork'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"frob"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatFrob = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'frob'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"grab"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatGrab = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'grab'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"heal"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatHeal = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'heal'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatHope = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'hope'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"init"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatInit = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'init'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"move"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatMove = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'move'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatNope = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'nope'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatRely = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"slip"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatSlip = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'slip'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mcdVatAbi}__ and `functionName` set to `"suck"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useSimulateMcdVatSuck = /*#__PURE__*/ createUseSimulateContract({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  functionName: 'suck'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdVatAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWatchMcdVat = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdVatAbi,
  address: mcdVatAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mcdVatAbi}__ and `eventName` set to `"LogNote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b)
 */
export const useWatchMcdVatLogNote = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mcdVatAbi,
  address: mcdVatAddress,
  eventName: 'LogNote'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleDistributorAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useReadMerkleDistributor = /*#__PURE__*/ createUseReadContract({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleDistributorAbi}__ and `functionName` set to `"isClaimed"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useReadMerkleDistributorIsClaimed = /*#__PURE__*/ createUseReadContract({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress,
  functionName: 'isClaimed'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleDistributorAbi}__ and `functionName` set to `"merkleRoot"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useReadMerkleDistributorMerkleRoot = /*#__PURE__*/ createUseReadContract({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress,
  functionName: 'merkleRoot'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleDistributorAbi}__ and `functionName` set to `"token"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useReadMerkleDistributorToken = /*#__PURE__*/ createUseReadContract({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress,
  functionName: 'token'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleDistributorAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useWriteMerkleDistributor = /*#__PURE__*/ createUseWriteContract({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleDistributorAbi}__ and `functionName` set to `"claim"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useWriteMerkleDistributorClaim = /*#__PURE__*/ createUseWriteContract({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress,
  functionName: 'claim'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleDistributorAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useSimulateMerkleDistributor = /*#__PURE__*/ createUseSimulateContract({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleDistributorAbi}__ and `functionName` set to `"claim"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useSimulateMerkleDistributorClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress,
  functionName: 'claim'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link merkleDistributorAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useWatchMerkleDistributor = /*#__PURE__*/ createUseWatchContractEvent({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link merkleDistributorAbi}__ and `eventName` set to `"Claimed"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe)
 */
export const useWatchMerkleDistributorClaimed = /*#__PURE__*/ createUseWatchContractEvent({
  abi: merkleDistributorAbi,
  address: merkleDistributorAddress,
  eventName: 'Claimed'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkr = /*#__PURE__*/ createUseReadContract({ abi: mkrAbi, address: mkrAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkrName = /*#__PURE__*/ createUseReadContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkrTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkrDecimals = /*#__PURE__*/ createUseReadContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkrBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"stopped"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkrStopped = /*#__PURE__*/ createUseReadContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'stopped'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkrOwner = /*#__PURE__*/ createUseReadContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkrSymbol = /*#__PURE__*/ createUseReadContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"authority"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkrAuthority = /*#__PURE__*/ createUseReadContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'authority'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useReadMkrAllowance = /*#__PURE__*/ createUseReadContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkr = /*#__PURE__*/ createUseWriteContract({ abi: mkrAbi, address: mkrAddress });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"stop"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrStop = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'stop'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrApprove = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"setOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrSetOwner = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'setOwner'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrMint = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrBurn = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"setName"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrSetName = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'setName'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"setAuthority"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrSetAuthority = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'setAuthority'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"push"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrPush = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'push'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"move"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrMove = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'move'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"start"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrStart = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'start'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"pull"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWriteMkrPull = /*#__PURE__*/ createUseWriteContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'pull'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkr = /*#__PURE__*/ createUseSimulateContract({ abi: mkrAbi, address: mkrAddress });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"stop"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrStop = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'stop'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"setOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrSetOwner = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'setOwner'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrMint = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"setName"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrSetName = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'setName'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"setAuthority"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrSetAuthority = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'setAuthority'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"push"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrPush = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'push'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"move"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrMove = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'move'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"start"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrStart = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'start'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrAbi}__ and `functionName` set to `"pull"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useSimulateMkrPull = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrAbi,
  address: mkrAddress,
  functionName: 'pull'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWatchMkr = /*#__PURE__*/ createUseWatchContractEvent({ abi: mkrAbi, address: mkrAddress });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrAbi}__ and `eventName` set to `"Mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWatchMkrMint = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrAbi,
  address: mkrAddress,
  eventName: 'Mint'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrAbi}__ and `eventName` set to `"Burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWatchMkrBurn = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrAbi,
  address: mkrAddress,
  eventName: 'Burn'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrAbi}__ and `eventName` set to `"LogSetAuthority"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWatchMkrLogSetAuthority = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrAbi,
  address: mkrAddress,
  eventName: 'LogSetAuthority'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrAbi}__ and `eventName` set to `"LogSetOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWatchMkrLogSetOwner = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrAbi,
  address: mkrAddress,
  eventName: 'LogSetOwner'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrAbi}__ and `eventName` set to `"LogNote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWatchMkrLogNote = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrAbi,
  address: mkrAddress,
  eventName: 'LogNote'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWatchMkrTransfer = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrAbi,
  address: mkrAddress,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const useWatchMkrApproval = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrAbi,
  address: mkrAddress,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrSkyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useReadMkrSky = /*#__PURE__*/ createUseReadContract({ abi: mkrSkyAbi, address: mkrSkyAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"fee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useReadMkrSkyFee = /*#__PURE__*/ createUseReadContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'fee'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"mkr"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useReadMkrSkyMkr = /*#__PURE__*/ createUseReadContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'mkr'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"rate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useReadMkrSkyRate = /*#__PURE__*/ createUseReadContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'rate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"sky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useReadMkrSkySky = /*#__PURE__*/ createUseReadContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'sky'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"take"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useReadMkrSkyTake = /*#__PURE__*/ createUseReadContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'take'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useReadMkrSkyWards = /*#__PURE__*/ createUseReadContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrSkyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWriteMkrSky = /*#__PURE__*/ createUseWriteContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWriteMkrSkyBurn = /*#__PURE__*/ createUseWriteContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"collect"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWriteMkrSkyCollect = /*#__PURE__*/ createUseWriteContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'collect'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWriteMkrSkyDeny = /*#__PURE__*/ createUseWriteContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWriteMkrSkyFile = /*#__PURE__*/ createUseWriteContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"mkrToSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWriteMkrSkyMkrToSky = /*#__PURE__*/ createUseWriteContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'mkrToSky'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWriteMkrSkyRely = /*#__PURE__*/ createUseWriteContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrSkyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useSimulateMkrSky = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useSimulateMkrSkyBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"collect"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useSimulateMkrSkyCollect = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'collect'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useSimulateMkrSkyDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useSimulateMkrSkyFile = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"mkrToSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useSimulateMkrSkyMkrToSky = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'mkrToSky'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mkrSkyAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useSimulateMkrSkyRely = /*#__PURE__*/ createUseSimulateContract({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrSkyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWatchMkrSky = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrSkyAbi,
  address: mkrSkyAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrSkyAbi}__ and `eventName` set to `"Burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWatchMkrSkyBurn = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  eventName: 'Burn'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrSkyAbi}__ and `eventName` set to `"Collect"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWatchMkrSkyCollect = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  eventName: 'Collect'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrSkyAbi}__ and `eventName` set to `"Deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWatchMkrSkyDeny = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  eventName: 'Deny'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrSkyAbi}__ and `eventName` set to `"File"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWatchMkrSkyFile = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  eventName: 'File'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrSkyAbi}__ and `eventName` set to `"MkrToSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWatchMkrSkyMkrToSky = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  eventName: 'MkrToSky'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mkrSkyAbi}__ and `eventName` set to `"Rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA1Ea1bA18E88C381C724a75F23a130420C403f9a)
 */
export const useWatchMkrSkyRely = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mkrSkyAbi,
  address: mkrSkyAddress,
  eventName: 'Rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActions = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"cdpAllow"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsCdpAllow = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'cdpAllow'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"daiJoin_join"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsDaiJoinJoin = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'daiJoin_join'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"draw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsDraw = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'draw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"enter"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsEnter = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'enter'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"ethJoin_join"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsEthJoinJoin = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'ethJoin_join'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"exitETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsExitEth = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'exitETH'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"exitGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsExitGem = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'exitGem'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"flux"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsFlux = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'flux'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"freeETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsFreeEth = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'freeETH'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"freeGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsFreeGem = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'freeGem'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"frob"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsFrob = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'frob'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"gemJoin_join"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsGemJoinJoin = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'gemJoin_join'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"give"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsGive = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'give'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"giveToProxy"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsGiveToProxy = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'giveToProxy'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsHope = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'hope'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"lockETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsLockEth = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'lockETH'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"lockETHAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsLockEthAndDraw = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'lockETHAndDraw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"lockGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsLockGem = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'lockGem'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"lockGemAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsLockGemAndDraw = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'lockGemAndDraw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"makeGemBag"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsMakeGemBag = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'makeGemBag'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"move"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsMove = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'move'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsNope = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'nope'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"open"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsOpen = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'open'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"openLockETHAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsOpenLockEthAndDraw = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'openLockETHAndDraw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"openLockGNTAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsOpenLockGntAndDraw = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'openLockGNTAndDraw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"openLockGemAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsOpenLockGemAndDraw = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'openLockGemAndDraw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"quit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsQuit = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'quit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"safeLockETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsSafeLockEth = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'safeLockETH'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"safeLockGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsSafeLockGem = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'safeLockGem'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"safeWipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsSafeWipe = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'safeWipe'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"safeWipeAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsSafeWipeAll = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'safeWipeAll'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"shift"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsShift = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'shift'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"urnAllow"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsUrnAllow = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'urnAllow'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsWipe = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipe'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsWipeAll = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAll'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAllAndFreeETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsWipeAllAndFreeEth = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAllAndFreeETH'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAllAndFreeGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsWipeAllAndFreeGem = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAllAndFreeGem'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAndFreeETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsWipeAndFreeEth = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAndFreeETH'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAndFreeGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useWriteProxyActionsWipeAndFreeGem = /*#__PURE__*/ createUseWriteContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAndFreeGem'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActions = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"cdpAllow"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsCdpAllow = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'cdpAllow'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"daiJoin_join"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsDaiJoinJoin = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'daiJoin_join'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"draw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsDraw = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'draw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"enter"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsEnter = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'enter'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"ethJoin_join"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsEthJoinJoin = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'ethJoin_join'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"exitETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsExitEth = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'exitETH'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"exitGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsExitGem = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'exitGem'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"flux"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsFlux = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'flux'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"freeETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsFreeEth = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'freeETH'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"freeGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsFreeGem = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'freeGem'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"frob"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsFrob = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'frob'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"gemJoin_join"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsGemJoinJoin = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'gemJoin_join'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"give"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsGive = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'give'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"giveToProxy"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsGiveToProxy = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'giveToProxy'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsHope = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'hope'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"lockETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsLockEth = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'lockETH'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"lockETHAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsLockEthAndDraw = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'lockETHAndDraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"lockGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsLockGem = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'lockGem'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"lockGemAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsLockGemAndDraw = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'lockGemAndDraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"makeGemBag"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsMakeGemBag = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'makeGemBag'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"move"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsMove = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'move'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsNope = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'nope'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"open"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsOpen = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'open'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"openLockETHAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsOpenLockEthAndDraw = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'openLockETHAndDraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"openLockGNTAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsOpenLockGntAndDraw = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'openLockGNTAndDraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"openLockGemAndDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsOpenLockGemAndDraw = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'openLockGemAndDraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"quit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsQuit = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'quit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"safeLockETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsSafeLockEth = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'safeLockETH'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"safeLockGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsSafeLockGem = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'safeLockGem'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"safeWipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsSafeWipe = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'safeWipe'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"safeWipeAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsSafeWipeAll = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'safeWipeAll'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"shift"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsShift = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'shift'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"urnAllow"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsUrnAllow = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'urnAllow'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsWipe = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipe'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsWipeAll = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAll'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAllAndFreeETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsWipeAllAndFreeEth = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAllAndFreeETH'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAllAndFreeGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsWipeAllAndFreeGem = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAllAndFreeGem'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAndFreeETH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsWipeAndFreeEth = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAndFreeETH'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyActionsAbi}__ and `functionName` set to `"wipeAndFreeGem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038)
 */
export const useSimulateProxyActionsWipeAndFreeGem = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyActionsAbi,
  address: proxyActionsAddress,
  functionName: 'wipeAndFreeGem'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proxyRegistryAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4)
 */
export const useReadProxyRegistry = /*#__PURE__*/ createUseReadContract({
  abi: proxyRegistryAbi,
  address: proxyRegistryAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proxyRegistryAbi}__ and `functionName` set to `"proxies"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4)
 */
export const useReadProxyRegistryProxies = /*#__PURE__*/ createUseReadContract({
  abi: proxyRegistryAbi,
  address: proxyRegistryAddress,
  functionName: 'proxies'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyRegistryAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4)
 */
export const useWriteProxyRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: proxyRegistryAbi,
  address: proxyRegistryAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link proxyRegistryAbi}__ and `functionName` set to `"build"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4)
 */
export const useWriteProxyRegistryBuild = /*#__PURE__*/ createUseWriteContract({
  abi: proxyRegistryAbi,
  address: proxyRegistryAddress,
  functionName: 'build'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyRegistryAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4)
 */
export const useSimulateProxyRegistry = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyRegistryAbi,
  address: proxyRegistryAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link proxyRegistryAbi}__ and `functionName` set to `"build"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4)
 */
export const useSimulateProxyRegistryBuild = /*#__PURE__*/ createUseSimulateContract({
  abi: proxyRegistryAbi,
  address: proxyRegistryAddress,
  functionName: 'build'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2 = /*#__PURE__*/ createUseReadContract({ abi: psm3L2Abi, address: psm3L2Address });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"convertToAssetValue"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2ConvertToAssetValue = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'convertToAssetValue'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"convertToAssets"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2ConvertToAssets = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'convertToAssets'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"convertToShares"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2ConvertToShares = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'convertToShares'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2Owner = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"pocket"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2Pocket = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'pocket'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"previewDeposit"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2PreviewDeposit = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'previewDeposit'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"previewSwapExactIn"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2PreviewSwapExactIn = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'previewSwapExactIn'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"previewSwapExactOut"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2PreviewSwapExactOut = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'previewSwapExactOut'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"previewWithdraw"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2PreviewWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'previewWithdraw'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"rateProvider"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2RateProvider = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'rateProvider'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"shares"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2Shares = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'shares'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"susds"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2Susds = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'susds'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"totalAssets"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2TotalAssets = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'totalAssets'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"totalShares"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2TotalShares = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'totalShares'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"usdc"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2Usdc = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'usdc'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"usds"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useReadPsm3L2Usds = /*#__PURE__*/ createUseReadContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'usds'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link psm3L2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWritePsm3L2 = /*#__PURE__*/ createUseWriteContract({
  abi: psm3L2Abi,
  address: psm3L2Address
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWritePsm3L2Deposit = /*#__PURE__*/ createUseWriteContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'deposit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWritePsm3L2RenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'renounceOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"setPocket"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWritePsm3L2SetPocket = /*#__PURE__*/ createUseWriteContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'setPocket'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"swapExactIn"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWritePsm3L2SwapExactIn = /*#__PURE__*/ createUseWriteContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'swapExactIn'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"swapExactOut"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWritePsm3L2SwapExactOut = /*#__PURE__*/ createUseWriteContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'swapExactOut'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWritePsm3L2TransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWritePsm3L2Withdraw = /*#__PURE__*/ createUseWriteContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link psm3L2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useSimulatePsm3L2 = /*#__PURE__*/ createUseSimulateContract({
  abi: psm3L2Abi,
  address: psm3L2Address
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useSimulatePsm3L2Deposit = /*#__PURE__*/ createUseSimulateContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'deposit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useSimulatePsm3L2RenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'renounceOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"setPocket"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useSimulatePsm3L2SetPocket = /*#__PURE__*/ createUseSimulateContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'setPocket'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"swapExactIn"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useSimulatePsm3L2SwapExactIn = /*#__PURE__*/ createUseSimulateContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'swapExactIn'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"swapExactOut"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useSimulatePsm3L2SwapExactOut = /*#__PURE__*/ createUseSimulateContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'swapExactOut'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useSimulatePsm3L2TransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link psm3L2Abi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useSimulatePsm3L2Withdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: psm3L2Abi,
  address: psm3L2Address,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link psm3L2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWatchPsm3L2 = /*#__PURE__*/ createUseWatchContractEvent({
  abi: psm3L2Abi,
  address: psm3L2Address
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link psm3L2Abi}__ and `eventName` set to `"Deposit"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWatchPsm3L2Deposit = /*#__PURE__*/ createUseWatchContractEvent({
  abi: psm3L2Abi,
  address: psm3L2Address,
  eventName: 'Deposit'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link psm3L2Abi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWatchPsm3L2OwnershipTransferred = /*#__PURE__*/ createUseWatchContractEvent({
  abi: psm3L2Abi,
  address: psm3L2Address,
  eventName: 'OwnershipTransferred'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link psm3L2Abi}__ and `eventName` set to `"PocketSet"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWatchPsm3L2PocketSet = /*#__PURE__*/ createUseWatchContractEvent({
  abi: psm3L2Abi,
  address: psm3L2Address,
  eventName: 'PocketSet'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link psm3L2Abi}__ and `eventName` set to `"Swap"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWatchPsm3L2Swap = /*#__PURE__*/ createUseWatchContractEvent({
  abi: psm3L2Abi,
  address: psm3L2Address,
  eventName: 'Swap'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link psm3L2Abi}__ and `eventName` set to `"Withdraw"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266)
 */
export const useWatchPsm3L2Withdraw = /*#__PURE__*/ createUseWatchContractEvent({
  abi: psm3L2Abi,
  address: psm3L2Address,
  eventName: 'Withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD)
 */
export const useWatchSUsds = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsAbi,
  address: sUsdsAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsAbi}__ and `eventName` set to `"Upgraded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD)
 */
export const useWatchSUsdsUpgraded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsAbi,
  address: sUsdsAddress,
  eventName: 'Upgraded'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementation = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'DOMAIN_SEPARATOR'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationPermitTypehash = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'PERMIT_TYPEHASH'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'UPGRADE_INTERFACE_VERSION'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationAllowance = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"asset"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationAsset = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'asset'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"chi"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationChi = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'chi'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"convertToAssets"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationConvertToAssets = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'convertToAssets'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"convertToShares"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationConvertToShares = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'convertToShares'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationDecimals = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"getImplementation"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationGetImplementation = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'getImplementation'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"maxDeposit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationMaxDeposit = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'maxDeposit'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"maxMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationMaxMint = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'maxMint'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"maxRedeem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationMaxRedeem = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'maxRedeem'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"maxWithdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationMaxWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'maxWithdraw'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationName = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"nonces"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationNonces = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'nonces'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"previewDeposit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationPreviewDeposit = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'previewDeposit'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"previewMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationPreviewMint = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'previewMint'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"previewRedeem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationPreviewRedeem = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'previewRedeem'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"previewWithdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationPreviewWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'previewWithdraw'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'proxiableUUID'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"rho"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationRho = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'rho'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"ssr"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationSsr = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'ssr'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationSymbol = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"totalAssets"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationTotalAssets = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'totalAssets'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"usds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationUsds = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'usds'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"usdsJoin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationUsdsJoin = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'usdsJoin'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"vat"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationVat = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'vat'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"version"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationVersion = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'version'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"vow"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationVow = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'vow'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useReadSUsdsImplementationWards = /*#__PURE__*/ createUseReadContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementation = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationApprove = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationDeny = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"deposit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'deposit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"drip"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationDrip = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'drip'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationFile = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'initialize'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationMint = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationPermit = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'permit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"redeem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationRedeem = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'redeem'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationRely = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'upgradeToAndCall'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWriteSUsdsImplementationWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementation = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"deposit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'deposit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"drip"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationDrip = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'drip'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationFile = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'initialize'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationMint = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'permit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"redeem"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationRedeem = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'redeem'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationRely = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'upgradeToAndCall'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useSimulateSUsdsImplementationWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementation = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationApproval = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationDeny = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Deny'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Deposit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationDeposit = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Deposit'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Drip"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationDrip = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Drip'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"File"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationFile = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'File'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Initialized"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationInitialized = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Initialized'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Referral"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationReferral = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Referral'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationRely = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationTransfer = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Upgraded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationUpgraded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Upgraded'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsImplementationAbi}__ and `eventName` set to `"Withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0)
 */
export const useWatchSUsdsImplementationWithdraw = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsImplementationAbi,
  address: sUsdsImplementationAddress,
  eventName: 'Withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsL2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xb5B2dc7fd34C249F4be7fB1fCea07950784229e0)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0xA06b10Db9F390990364A3984C04FaDf1c13691b5)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x5875eEE11Cf8398102FdAd704C9E96607675467a)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xdDb46999F8891663a8F2828d25298f70416d7610)
 */
export const useWatchSUsdsL2 = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsL2Abi,
  address: sUsdsL2Address
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sUsdsL2Abi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xb5B2dc7fd34C249F4be7fB1fCea07950784229e0)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0xA06b10Db9F390990364A3984C04FaDf1c13691b5)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x5875eEE11Cf8398102FdAd704C9E96607675467a)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xdDb46999F8891663a8F2828d25298f70416d7610)
 */
export const useWatchSUsdsL2Upgraded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sUsdsL2Abi,
  address: sUsdsL2Address,
  eventName: 'Upgraded'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModule = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"farms"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleFarms = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'farms'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"fee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleFee = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'fee'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"ilk"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleIlk = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'ilk'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"isUrnAuth"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleIsUrnAuth = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'isUrnAuth'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"jug"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleJug = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'jug'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"lsmkr"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleLsmkr = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'lsmkr'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"mkr"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleMkr = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'mkr'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"mkrSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleMkrSky = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'mkrSky'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"mkrSkyRate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleMkrSkyRate = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'mkrSkyRate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"ownerUrns"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleOwnerUrns = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'ownerUrns'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"ownerUrnsCount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleOwnerUrnsCount = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'ownerUrnsCount'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"sky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleSky = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'sky'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"urnAuctions"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleUrnAuctions = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'urnAuctions'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"urnCan"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleUrnCan = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'urnCan'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"urnFarms"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleUrnFarms = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'urnFarms'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"urnImplementation"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleUrnImplementation = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'urnImplementation'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"urnOwners"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleUrnOwners = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'urnOwners'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"urnVoteDelegates"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleUrnVoteDelegates = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'urnVoteDelegates'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"usds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleUsds = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'usds'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"usdsJoin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleUsdsJoin = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'usdsJoin'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"vat"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleVat = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'vat'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"voteDelegateFactory"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleVoteDelegateFactory = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'voteDelegateFactory'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useReadSealModuleWards = /*#__PURE__*/ createUseReadContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModule = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"addFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleAddFarm = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'addFarm'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"delFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleDelFarm = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'delFarm'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleDeny = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"draw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleDraw = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'draw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleFile = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"free"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleFree = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'free'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"freeNoFee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleFreeNoFee = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'freeNoFee'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"freeSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleFreeSky = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'freeSky'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleGetReward = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleHope = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'hope'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"lock"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleLock = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'lock'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"lockSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleLockSky = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'lockSky'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"multicall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleMulticall = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'multicall'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleNope = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'nope'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"onKick"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleOnKick = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'onKick'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"onRemove"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleOnRemove = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'onRemove'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"onTake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleOnTake = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'onTake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"open"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleOpen = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'open'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleRely = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"selectFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleSelectFarm = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'selectFarm'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"selectVoteDelegate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleSelectVoteDelegate = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'selectVoteDelegate'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"wipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleWipe = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'wipe'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"wipeAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWriteSealModuleWipeAll = /*#__PURE__*/ createUseWriteContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'wipeAll'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModule = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"addFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleAddFarm = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'addFarm'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"delFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleDelFarm = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'delFarm'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"draw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleDraw = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'draw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleFile = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"free"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleFree = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'free'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"freeNoFee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleFreeNoFee = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'freeNoFee'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"freeSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleFreeSky = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'freeSky'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleGetReward = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleHope = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'hope'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"lock"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleLock = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'lock'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"lockSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleLockSky = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'lockSky'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"multicall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleMulticall = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'multicall'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleNope = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'nope'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"onKick"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleOnKick = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'onKick'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"onRemove"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleOnRemove = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'onRemove'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"onTake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleOnTake = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'onTake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"open"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleOpen = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'open'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleRely = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"selectFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleSelectFarm = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'selectFarm'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"selectVoteDelegate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleSelectVoteDelegate = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'selectVoteDelegate'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"wipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleWipe = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'wipe'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sealModuleAbi}__ and `functionName` set to `"wipeAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useSimulateSealModuleWipeAll = /*#__PURE__*/ createUseSimulateContract({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  functionName: 'wipeAll'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModule = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"AddFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleAddFarm = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'AddFarm'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"DelFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleDelFarm = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'DelFarm'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"Deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleDeny = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'Deny'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"Draw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleDraw = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'Draw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"File"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleFile = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'File'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"Free"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleFree = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'Free'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"FreeNoFee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleFreeNoFee = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'FreeNoFee'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"FreeSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleFreeSky = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'FreeSky'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"GetReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleGetReward = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'GetReward'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"Hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleHope = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'Hope'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"Lock"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleLock = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'Lock'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"LockSky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleLockSky = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'LockSky'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"Nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleNope = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'Nope'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"OnKick"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleOnKick = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'OnKick'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"OnRemove"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleOnRemove = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'OnRemove'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"OnTake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleOnTake = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'OnTake'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"Open"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleOpen = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'Open'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"Rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleRely = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'Rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"SelectFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleSelectFarm = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'SelectFarm'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"SelectVoteDelegate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleSelectVoteDelegate = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'SelectVoteDelegate'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sealModuleAbi}__ and `eventName` set to `"Wipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12)
 */
export const useWatchSealModuleWipe = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sealModuleAbi,
  address: sealModuleAddress,
  eventName: 'Wipe'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSky = /*#__PURE__*/ createUseReadContract({ abi: skyAbi, address: skyAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'DOMAIN_SEPARATOR'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyPermitTypehash = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'PERMIT_TYPEHASH'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyAllowance = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyDecimals = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"deploymentChainId"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyDeploymentChainId = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'deploymentChainId'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyName = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"nonces"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyNonces = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'nonces'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkySymbol = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"version"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyVersion = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'version'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useReadSkyWards = /*#__PURE__*/ createUseReadContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWriteSky = /*#__PURE__*/ createUseWriteContract({ abi: skyAbi, address: skyAddress });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWriteSkyApprove = /*#__PURE__*/ createUseWriteContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWriteSkyBurn = /*#__PURE__*/ createUseWriteContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWriteSkyDeny = /*#__PURE__*/ createUseWriteContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWriteSkyMint = /*#__PURE__*/ createUseWriteContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWriteSkyPermit = /*#__PURE__*/ createUseWriteContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'permit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWriteSkyRely = /*#__PURE__*/ createUseWriteContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWriteSkyTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWriteSkyTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useSimulateSky = /*#__PURE__*/ createUseSimulateContract({ abi: skyAbi, address: skyAddress });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useSimulateSkyApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useSimulateSkyBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useSimulateSkyDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useSimulateSkyMint = /*#__PURE__*/ createUseSimulateContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useSimulateSkyPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'permit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useSimulateSkyRely = /*#__PURE__*/ createUseSimulateContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useSimulateSkyTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useSimulateSkyTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: skyAbi,
  address: skyAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWatchSky = /*#__PURE__*/ createUseWatchContractEvent({ abi: skyAbi, address: skyAddress });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWatchSkyApproval = /*#__PURE__*/ createUseWatchContractEvent({
  abi: skyAbi,
  address: skyAddress,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyAbi}__ and `eventName` set to `"Deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWatchSkyDeny = /*#__PURE__*/ createUseWatchContractEvent({
  abi: skyAbi,
  address: skyAddress,
  eventName: 'Deny'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyAbi}__ and `eventName` set to `"Rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWatchSkyRely = /*#__PURE__*/ createUseWatchContractEvent({
  abi: skyAbi,
  address: skyAddress,
  eventName: 'Rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279)
 */
export const useWatchSkyTransfer = /*#__PURE__*/ createUseWatchContractEvent({
  abi: skyAbi,
  address: skyAddress,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpk = /*#__PURE__*/ createUseReadContract({ abi: spkAbi, address: spkAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'DOMAIN_SEPARATOR'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkPermitTypehash = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'PERMIT_TYPEHASH'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkAllowance = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkDecimals = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"deploymentChainId"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkDeploymentChainId = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'deploymentChainId'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkName = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"nonces"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkNonces = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'nonces'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkSymbol = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"version"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkVersion = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'version'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useReadSpkWards = /*#__PURE__*/ createUseReadContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpk = /*#__PURE__*/ createUseWriteContract({ abi: spkAbi, address: spkAddress });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpkApprove = /*#__PURE__*/ createUseWriteContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpkBurn = /*#__PURE__*/ createUseWriteContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpkDeny = /*#__PURE__*/ createUseWriteContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpkFile = /*#__PURE__*/ createUseWriteContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpkMint = /*#__PURE__*/ createUseWriteContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpkPermit = /*#__PURE__*/ createUseWriteContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'permit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpkRely = /*#__PURE__*/ createUseWriteContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpkTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWriteSpkTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpk = /*#__PURE__*/ createUseSimulateContract({ abi: spkAbi, address: spkAddress });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpkApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpkBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'burn'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpkDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpkFile = /*#__PURE__*/ createUseSimulateContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpkMint = /*#__PURE__*/ createUseSimulateContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpkPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'permit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpkRely = /*#__PURE__*/ createUseSimulateContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpkTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link spkAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useSimulateSpkTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: spkAbi,
  address: spkAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link spkAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWatchSpk = /*#__PURE__*/ createUseWatchContractEvent({ abi: spkAbi, address: spkAddress });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link spkAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWatchSpkApproval = /*#__PURE__*/ createUseWatchContractEvent({
  abi: spkAbi,
  address: spkAddress,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link spkAbi}__ and `eventName` set to `"Deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWatchSpkDeny = /*#__PURE__*/ createUseWatchContractEvent({
  abi: spkAbi,
  address: spkAddress,
  eventName: 'Deny'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link spkAbi}__ and `eventName` set to `"File"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWatchSpkFile = /*#__PURE__*/ createUseWatchContractEvent({
  abi: spkAbi,
  address: spkAddress,
  eventName: 'File'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link spkAbi}__ and `eventName` set to `"Rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWatchSpkRely = /*#__PURE__*/ createUseWatchContractEvent({
  abi: spkAbi,
  address: spkAddress,
  eventName: 'Rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link spkAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc20059e0317DE91738d13af027DfC4a50781b066)
 */
export const useWatchSpkTransfer = /*#__PURE__*/ createUseWatchContractEvent({
  abi: spkAbi,
  address: spkAddress,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracle = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"DATA_PROVIDER_ROLE"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleDataProviderRole = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'DATA_PROVIDER_ROLE'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'DEFAULT_ADMIN_ROLE'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"getAPR"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleGetApr = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'getAPR'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"getChi"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleGetChi = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'getChi'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"getConversionRate"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleGetConversionRate = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'getConversionRate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"getConversionRateBinomialApprox"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleGetConversionRateBinomialApprox = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'getConversionRateBinomialApprox'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"getConversionRateLinearApprox"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleGetConversionRateLinearApprox = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'getConversionRateLinearApprox'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"getRho"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleGetRho = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'getRho'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'getRoleAdmin'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"getSSR"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleGetSsr = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'getSSR'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"getSUSDSData"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleGetSusdsData = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'getSUSDSData'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleHasRole = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'hasRole'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"maxSSR"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleMaxSsr = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'maxSSR'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useReadSsrAuthOracleSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'supportsInterface'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWriteSsrAuthOracle = /*#__PURE__*/ createUseWriteContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWriteSsrAuthOracleGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'grantRole'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWriteSsrAuthOracleRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'renounceRole'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWriteSsrAuthOracleRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'revokeRole'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"setMaxSSR"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWriteSsrAuthOracleSetMaxSsr = /*#__PURE__*/ createUseWriteContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'setMaxSSR'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"setSUSDSData"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWriteSsrAuthOracleSetSusdsData = /*#__PURE__*/ createUseWriteContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'setSUSDSData'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useSimulateSsrAuthOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useSimulateSsrAuthOracleGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'grantRole'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useSimulateSsrAuthOracleRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'renounceRole'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useSimulateSsrAuthOracleRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'revokeRole'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"setMaxSSR"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useSimulateSsrAuthOracleSetMaxSsr = /*#__PURE__*/ createUseSimulateContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'setMaxSSR'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `functionName` set to `"setSUSDSData"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useSimulateSsrAuthOracleSetSusdsData = /*#__PURE__*/ createUseSimulateContract({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  functionName: 'setSUSDSData'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ssrAuthOracleAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWatchSsrAuthOracle = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWatchSsrAuthOracleRoleAdminChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  eventName: 'RoleAdminChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWatchSsrAuthOracleRoleGranted = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  eventName: 'RoleGranted'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWatchSsrAuthOracleRoleRevoked = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  eventName: 'RoleRevoked'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `eventName` set to `"SetMaxSSR"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWatchSsrAuthOracleSetMaxSsr = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  eventName: 'SetMaxSSR'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ssrAuthOracleAbi}__ and `eventName` set to `"SetSUSDSData"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x6E53585449142A5E6D5fC918AE6BEa341dC81C68)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x1566BFA55D95686a823751298533D42651183988)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x65d946e533748A998B1f0E430803e39A6388f7a1)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xEE2816c1E1eed14d444552654Ed3027abC033A36)
 */
export const useWatchSsrAuthOracleSetSusdsData = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ssrAuthOracleAbi,
  address: ssrAuthOracleAddress,
  eventName: 'SetSUSDSData'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModule = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"farms"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleFarms = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'farms'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"fee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleFee = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'fee'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"ilk"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleIlk = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'ilk'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"isUrnAuth"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleIsUrnAuth = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'isUrnAuth'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"jug"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleJug = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'jug'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"lssky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleLssky = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'lssky'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"ownerUrns"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleOwnerUrns = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'ownerUrns'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"ownerUrnsCount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleOwnerUrnsCount = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'ownerUrnsCount'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"sky"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleSky = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'sky'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"urnAuctions"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleUrnAuctions = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'urnAuctions'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"urnCan"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleUrnCan = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'urnCan'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"urnFarms"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleUrnFarms = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'urnFarms'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"urnImplementation"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleUrnImplementation = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'urnImplementation'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"urnOwners"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleUrnOwners = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'urnOwners'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"urnVoteDelegates"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleUrnVoteDelegates = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'urnVoteDelegates'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"usds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleUsds = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'usds'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"usdsJoin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleUsdsJoin = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'usdsJoin'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"vat"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleVat = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'vat'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"voteDelegateFactory"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleVoteDelegateFactory = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'voteDelegateFactory'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"wards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useReadStakeModuleWards = /*#__PURE__*/ createUseReadContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'wards'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModule = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"addFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleAddFarm = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'addFarm'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"delFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleDelFarm = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'delFarm'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleDeny = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"draw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleDraw = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'draw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleFile = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"free"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleFree = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'free'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"freeNoFee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleFreeNoFee = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'freeNoFee'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleGetReward = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleHope = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'hope'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"lock"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleLock = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'lock'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"multicall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleMulticall = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'multicall'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleNope = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'nope'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"onKick"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleOnKick = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'onKick'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"onRemove"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleOnRemove = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'onRemove'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"onTake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleOnTake = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'onTake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"open"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleOpen = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'open'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleRely = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"selectFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleSelectFarm = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'selectFarm'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"selectVoteDelegate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleSelectVoteDelegate = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'selectVoteDelegate'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"wipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleWipe = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'wipe'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"wipeAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWriteStakeModuleWipeAll = /*#__PURE__*/ createUseWriteContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'wipeAll'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModule = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"addFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleAddFarm = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'addFarm'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"delFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleDelFarm = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'delFarm'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleDeny = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'deny'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"draw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleDraw = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'draw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"file"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleFile = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'file'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"free"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleFree = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'free'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"freeNoFee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleFreeNoFee = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'freeNoFee'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleGetReward = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleHope = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'hope'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"lock"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleLock = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'lock'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"multicall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleMulticall = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'multicall'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleNope = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'nope'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"onKick"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleOnKick = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'onKick'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"onRemove"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleOnRemove = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'onRemove'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"onTake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleOnTake = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'onTake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"open"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleOpen = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'open'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleRely = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'rely'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"selectFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleSelectFarm = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'selectFarm'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"selectVoteDelegate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleSelectVoteDelegate = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'selectVoteDelegate'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"wipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleWipe = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'wipe'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeModuleAbi}__ and `functionName` set to `"wipeAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useSimulateStakeModuleWipeAll = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  functionName: 'wipeAll'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModule = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"AddFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleAddFarm = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'AddFarm'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"DelFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleDelFarm = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'DelFarm'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"Deny"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleDeny = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'Deny'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"Draw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleDraw = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'Draw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"File"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleFile = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'File'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"Free"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleFree = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'Free'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"FreeNoFee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleFreeNoFee = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'FreeNoFee'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"GetReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleGetReward = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'GetReward'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"Hope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleHope = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'Hope'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"Lock"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleLock = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'Lock'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"Nope"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleNope = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'Nope'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"OnKick"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleOnKick = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'OnKick'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"OnRemove"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleOnRemove = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'OnRemove'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"OnTake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleOnTake = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'OnTake'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"Open"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleOpen = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'Open'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"Rely"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleRely = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'Rely'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"SelectFarm"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleSelectFarm = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'SelectFarm'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"SelectVoteDelegate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleSelectVoteDelegate = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'SelectVoteDelegate'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeModuleAbi}__ and `eventName` set to `"Wipe"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3)
 */
export const useWatchStakeModuleWipe = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeModuleAbi,
  address: stakeModuleAddress,
  eventName: 'Wipe'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useReadUsdc = /*#__PURE__*/ createUseReadContract({ abi: usdcAbi, address: usdcAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"implementation"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useReadUsdcImplementation = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'implementation'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"admin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useReadUsdcAdmin = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'admin'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useWriteUsdc = /*#__PURE__*/ createUseWriteContract({ abi: usdcAbi, address: usdcAddress });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useWriteUsdcUpgradeTo = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'upgradeTo'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useWriteUsdcUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'upgradeToAndCall'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"changeAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useWriteUsdcChangeAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'changeAdmin'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useSimulateUsdc = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useSimulateUsdcUpgradeTo = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'upgradeTo'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useSimulateUsdcUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'upgradeToAndCall'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"changeAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useSimulateUsdcChangeAdmin = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'changeAdmin'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useWatchUsdc = /*#__PURE__*/ createUseWatchContractEvent({ abi: usdcAbi, address: usdcAddress });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"AdminChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useWatchUsdcAdminChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdcAbi,
  address: usdcAddress,
  eventName: 'AdminChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Upgraded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
 */
export const useWatchUsdcUpgraded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdcAbi,
  address: usdcAddress,
  eventName: 'Upgraded'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcL2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useReadUsdcL2 = /*#__PURE__*/ createUseReadContract({ abi: usdcL2Abi, address: usdcL2Address });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcL2Abi}__ and `functionName` set to `"admin"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useReadUsdcL2Admin = /*#__PURE__*/ createUseReadContract({
  abi: usdcL2Abi,
  address: usdcL2Address,
  functionName: 'admin'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcL2Abi}__ and `functionName` set to `"implementation"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useReadUsdcL2Implementation = /*#__PURE__*/ createUseReadContract({
  abi: usdcL2Abi,
  address: usdcL2Address,
  functionName: 'implementation'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcL2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useWriteUsdcL2 = /*#__PURE__*/ createUseWriteContract({
  abi: usdcL2Abi,
  address: usdcL2Address
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcL2Abi}__ and `functionName` set to `"changeAdmin"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useWriteUsdcL2ChangeAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: usdcL2Abi,
  address: usdcL2Address,
  functionName: 'changeAdmin'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcL2Abi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useWriteUsdcL2UpgradeTo = /*#__PURE__*/ createUseWriteContract({
  abi: usdcL2Abi,
  address: usdcL2Address,
  functionName: 'upgradeTo'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcL2Abi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useWriteUsdcL2UpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: usdcL2Abi,
  address: usdcL2Address,
  functionName: 'upgradeToAndCall'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcL2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useSimulateUsdcL2 = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcL2Abi,
  address: usdcL2Address
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcL2Abi}__ and `functionName` set to `"changeAdmin"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useSimulateUsdcL2ChangeAdmin = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcL2Abi,
  address: usdcL2Address,
  functionName: 'changeAdmin'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcL2Abi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useSimulateUsdcL2UpgradeTo = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcL2Abi,
  address: usdcL2Address,
  functionName: 'upgradeTo'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcL2Abi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useSimulateUsdcL2UpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcL2Abi,
  address: usdcL2Address,
  functionName: 'upgradeToAndCall'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcL2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useWatchUsdcL2 = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdcL2Abi,
  address: usdcL2Address
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcL2Abi}__ and `eventName` set to `"AdminChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useWatchUsdcL2AdminChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdcL2Abi,
  address: usdcL2Address,
  eventName: 'AdminChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcL2Abi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x078D782b760474a361dDA0AF3839290b0EF57AD6)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831)
 */
export const useWatchUsdcL2Upgraded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdcL2Abi,
  address: usdcL2Address,
  eventName: 'Upgraded'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdC035D45d973E3EC169d2276DDab16f1e407384F)
 */
export const useWatchUsds = /*#__PURE__*/ createUseWatchContractEvent({ abi: usdsAbi, address: usdsAddress });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsAbi}__ and `eventName` set to `"Upgraded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdC035D45d973E3EC169d2276DDab16f1e407384F)
 */
export const useWatchUsdsUpgraded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsAbi,
  address: usdsAddress,
  eventName: 'Upgraded'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsL2Abi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4F13a96EC5C4Cf34e442b46Bbd98a0791F20edC3)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7E10036Acc4B56d4dFCa3b77810356CE52313F9C)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x820C137fa70C8691f0e44Dc420a5e53c168921Dc)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x6491c05A82219b8D1479057361ff1654749b876b)
 */
export const useWatchUsdsL2 = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsL2Abi,
  address: usdsL2Address
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsL2Abi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4F13a96EC5C4Cf34e442b46Bbd98a0791F20edC3)
 * - [__View Contract on Unichain Uniscan__](https://uniscan.xyz/address/0x7E10036Acc4B56d4dFCa3b77810356CE52313F9C)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x820C137fa70C8691f0e44Dc420a5e53c168921Dc)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x6491c05A82219b8D1479057361ff1654749b876b)
 */
export const useWatchUsdsL2Upgraded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsL2Abi,
  address: usdsL2Address,
  eventName: 'Upgraded'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyReward = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"earned"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardEarned = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'earned'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"getRewardForDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardGetRewardForDuration = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'getRewardForDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"lastPauseTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardLastPauseTime = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'lastPauseTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"lastTimeRewardApplicable"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardLastTimeRewardApplicable = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'lastTimeRewardApplicable'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"lastUpdateTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardLastUpdateTime = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'lastUpdateTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"nominatedOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardNominatedOwner = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'nominatedOwner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardOwner = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardPaused = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'paused'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"periodFinish"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardPeriodFinish = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'periodFinish'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"rewardPerToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardRewardPerToken = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'rewardPerToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"rewardPerTokenStored"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardRewardPerTokenStored = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'rewardPerTokenStored'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"rewardRate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardRewardRate = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'rewardRate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"rewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardRewards = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'rewards'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"rewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardRewardsDistribution = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'rewardsDistribution'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"rewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardRewardsDuration = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'rewardsDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"rewardsToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardRewardsToken = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'rewardsToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"stakingToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'stakingToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"userRewardPerTokenPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useReadUsdsSkyRewardUserRewardPerTokenPaid = /*#__PURE__*/ createUseReadContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'userRewardPerTokenPaid'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyReward = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardAcceptOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardExit = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardGetReward = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardNominateNewOwner = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardNotifyRewardAmount = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardRecoverErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardSetPaused = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardSetRewardsDistribution = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardSetRewardsDuration = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardStake = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWriteUsdsSkyRewardWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyReward = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardAcceptOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardExit = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardGetReward = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardNominateNewOwner = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardNotifyRewardAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardRecoverErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardSetPaused = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardSetRewardsDistribution = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardSetRewardsDuration = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardStake = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useSimulateUsdsSkyRewardWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyReward = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"OwnerChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardOwnerChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'OwnerChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"OwnerNominated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardOwnerNominated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'OwnerNominated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"PauseChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardPauseChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'PauseChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"Recovered"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardRecovered = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'Recovered'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"Referral"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardReferral = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'Referral'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"RewardAdded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardRewardAdded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'RewardAdded'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"RewardPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardRewardPaid = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'RewardPaid'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"RewardsDistributionUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardRewardsDistributionUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'RewardsDistributionUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"RewardsDurationUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardRewardsDurationUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'RewardsDurationUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"Staked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardStaked = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'Staked'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSkyRewardAbi}__ and `eventName` set to `"Withdrawn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275)
 */
export const useWatchUsdsSkyRewardWithdrawn = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSkyRewardAbi,
  address: usdsSkyRewardAddress,
  eventName: 'Withdrawn'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkReward = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"earned"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardEarned = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'earned'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"getRewardForDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardGetRewardForDuration = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'getRewardForDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"lastPauseTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardLastPauseTime = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'lastPauseTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"lastTimeRewardApplicable"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardLastTimeRewardApplicable = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'lastTimeRewardApplicable'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"lastUpdateTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardLastUpdateTime = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'lastUpdateTime'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"nominatedOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardNominatedOwner = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'nominatedOwner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardOwner = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardPaused = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'paused'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"periodFinish"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardPeriodFinish = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'periodFinish'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"rewardPerToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardRewardPerToken = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'rewardPerToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"rewardPerTokenStored"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardRewardPerTokenStored = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'rewardPerTokenStored'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"rewardRate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardRewardRate = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'rewardRate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"rewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardRewards = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'rewards'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"rewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardRewardsDistribution = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'rewardsDistribution'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"rewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardRewardsDuration = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'rewardsDuration'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"rewardsToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardRewardsToken = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'rewardsToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"stakingToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'stakingToken'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"userRewardPerTokenPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useReadUsdsSpkRewardUserRewardPerTokenPaid = /*#__PURE__*/ createUseReadContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'userRewardPerTokenPaid'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkReward = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardAcceptOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardExit = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardGetReward = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardNominateNewOwner = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardNotifyRewardAmount = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardRecoverErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardSetPaused = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardSetRewardsDistribution = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardSetRewardsDuration = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardStake = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWriteUsdsSpkRewardWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkReward = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardAcceptOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'acceptOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"exit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardExit = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'exit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"getReward"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardGetReward = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'getReward'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"nominateNewOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardNominateNewOwner = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'nominateNewOwner'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardNotifyRewardAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'notifyRewardAmount'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"recoverERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardRecoverErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'recoverERC20'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardSetPaused = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'setPaused'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"setRewardsDistribution"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardSetRewardsDistribution = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'setRewardsDistribution'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardSetRewardsDuration = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'setRewardsDuration'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardStake = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'stake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useSimulateUsdsSpkRewardWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkReward = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"OwnerChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardOwnerChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'OwnerChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"OwnerNominated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardOwnerNominated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'OwnerNominated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"PauseChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardPauseChanged = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'PauseChanged'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"Recovered"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardRecovered = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'Recovered'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"Referral"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardReferral = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'Referral'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"RewardAdded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardRewardAdded = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'RewardAdded'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"RewardPaid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardRewardPaid = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'RewardPaid'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"RewardsDistributionUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardRewardsDistributionUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'RewardsDistributionUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"RewardsDurationUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardRewardsDurationUpdated = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'RewardsDurationUpdated'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"Staked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardStaked = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'Staked'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdsSpkRewardAbi}__ and `eventName` set to `"Withdrawn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x173e314C7635B45322cd8Cb14f44b312e079F3af)
 */
export const useWatchUsdsSpkRewardWithdrawn = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdsSpkRewardAbi,
  address: usdsSpkRewardAddress,
  eventName: 'Withdrawn'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdt = /*#__PURE__*/ createUseReadContract({ abi: usdtAbi, address: usdtAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtName = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"deprecated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtDeprecated = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'deprecated'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"upgradedAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtUpgradedAddress = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'upgradedAddress'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"balances"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtBalances = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'balances'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"maximumFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtMaximumFee = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'maximumFee'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"_totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtTotalSupply_2 = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: '_totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"getBlackListStatus"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtGetBlackListStatus = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'getBlackListStatus'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"allowed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtAllowed = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'allowed'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtPaused = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'paused'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"getOwner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtGetOwner = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'getOwner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtOwner = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"basisPointsRate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtBasisPointsRate = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'basisPointsRate'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"isBlackListed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtIsBlackListed = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'isBlackListed'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"MAX_UINT"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useReadUsdtMaxUint = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'MAX_UINT'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdt = /*#__PURE__*/ createUseWriteContract({ abi: usdtAbi, address: usdtAddress });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"deprecate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtDeprecate = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'deprecate'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"addBlackList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtAddBlackList = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'addBlackList'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'unpause'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtPause = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'pause'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"setParams"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtSetParams = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'setParams'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"issue"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtIssue = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'issue'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"redeem"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtRedeem = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'redeem'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"removeBlackList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtRemoveBlackList = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'removeBlackList'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"destroyBlackFunds"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWriteUsdtDestroyBlackFunds = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'destroyBlackFunds'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdt = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"deprecate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtDeprecate = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'deprecate'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"addBlackList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtAddBlackList = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'addBlackList'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'unpause'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtPause = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'pause'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"setParams"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtSetParams = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'setParams'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"issue"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtIssue = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'issue'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"redeem"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtRedeem = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'redeem'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"removeBlackList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtRemoveBlackList = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'removeBlackList'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"destroyBlackFunds"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useSimulateUsdtDestroyBlackFunds = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'destroyBlackFunds'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdt = /*#__PURE__*/ createUseWatchContractEvent({ abi: usdtAbi, address: usdtAddress });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Issue"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtIssue = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'Issue'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Redeem"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtRedeem = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'Redeem'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Deprecate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtDeprecate = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'Deprecate'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Params"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtParams = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'Params'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"DestroyedBlackFunds"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtDestroyedBlackFunds = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'DestroyedBlackFunds'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"AddedBlackList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtAddedBlackList = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'AddedBlackList'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"RemovedBlackList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtRemovedBlackList = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'RemovedBlackList'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtApproval = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtTransfer = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtPause = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'Pause'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9)
 */
export const useWatchUsdtUnpause = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
  eventName: 'Unpause'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useReadWeth = /*#__PURE__*/ createUseReadContract({ abi: wethAbi, address: wethAddress });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useReadWethName = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useReadWethTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useReadWethDecimals = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useReadWethBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useReadWethSymbol = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useReadWethAllowance = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWriteWeth = /*#__PURE__*/ createUseWriteContract({ abi: wethAbi, address: wethAddress });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWriteWethApprove = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWriteWethTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWriteWethWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWriteWethTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWriteWethDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'deposit'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useSimulateWeth = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  address: wethAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useSimulateWethApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useSimulateWethTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useSimulateWethWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'withdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useSimulateWethTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useSimulateWethDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  address: wethAddress,
  functionName: 'deposit'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWatchWeth = /*#__PURE__*/ createUseWatchContractEvent({ abi: wethAbi, address: wethAddress });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWatchWethApproval = /*#__PURE__*/ createUseWatchContractEvent({
  abi: wethAbi,
  address: wethAddress,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWatchWethTransfer = /*#__PURE__*/ createUseWatchContractEvent({
  abi: wethAbi,
  address: wethAddress,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__ and `eventName` set to `"Deposit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWatchWethDeposit = /*#__PURE__*/ createUseWatchContractEvent({
  abi: wethAbi,
  address: wethAddress,
  eventName: 'Deposit'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__ and `eventName` set to `"Withdrawal"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4200000000000000000000000000000000000006)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1)
 */
export const useWatchWethWithdrawal = /*#__PURE__*/ createUseWatchContractEvent({
  abi: wethAbi,
  address: wethAddress,
  eventName: 'Withdrawal'
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// stUsds
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * stUSDS (ERC-4626 Vault) - Ethereum Mainnet
 */
export const stUsdsAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'usdsJoin_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'jug_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'clip_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'vow_',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'Deposit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint16',
        name: 'referral',
        type: 'uint16'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'Referral',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'Withdraw',
    type: 'event'
  },
  {
    inputs: [],
    name: 'asset',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'cap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'chi',
    outputs: [
      {
        internalType: 'uint192',
        name: '',
        type: 'uint192'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'convertToAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    name: 'convertToShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      }
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'uint16',
        name: 'referral',
        type: 'uint16'
      }
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'drip',
    outputs: [
      {
        internalType: 'uint256',
        name: 'nChi',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'line',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'maxDeposit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'maxWithdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    name: 'previewDeposit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    name: 'previewWithdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'withdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'str',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

/**
 * stUSDS Contract Address
 * Using proxy address for contract interactions
 */
export const stUsdsAddress = {
  1: '0x99CD4Ec3f88A45940936F469E4bB72A2A701EEB9',
  314310: '0x99CD4Ec3f88A45940936F469E4bB72A2A701EEB9'
} as const;

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stUsdsAbi}__
 */
export const useReadStUsds = /*#__PURE__*/ createUseReadContract({
  abi: stUsdsAbi,
  address: stUsdsAddress
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stUsdsAbi}__
 */
export const useWriteStUsds = /*#__PURE__*/ createUseWriteContract({
  abi: stUsdsAbi,
  address: stUsdsAddress
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stUsdsAbi}__
 */
export const useSimulateStUsds = /*#__PURE__*/ createUseSimulateContract({
  abi: stUsdsAbi,
  address: stUsdsAddress
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stUsdsAbi}__
 */
export const useWatchStUsds = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stUsdsAbi,
  address: stUsdsAddress
});
