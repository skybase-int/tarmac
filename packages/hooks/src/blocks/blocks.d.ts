import { ReadHook } from '../hooks';

export type Block = {
  timestamp: string;
  number: any;
};

export type BlocksHookResponse = ReadHook & {
  data?: Block[];
};
