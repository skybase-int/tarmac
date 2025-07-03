import { Intent } from '../../../lib/enums';
import { SealToken } from '../../seal/constants';
import { StakeToken } from '../../stake/constants';
export type UserConfig = {
  locale?: string;
  intent: Intent;
  sealToken?: SealToken;
  chatSuggested: boolean;
  stakeToken?: StakeToken;
  batchEnabled: boolean;
};
