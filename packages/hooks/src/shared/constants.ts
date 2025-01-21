import { parseAbi } from 'viem';

export const SAFE_CONNECTOR_ID = 'safe';
export const safeAbi = parseAbi(['event ExecutionSuccess(bytes32 txHash, uint256 payment)']);
