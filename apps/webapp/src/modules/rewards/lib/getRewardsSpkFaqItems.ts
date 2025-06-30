export interface Item {
  question: string;
  answer: string;
  type?: 'restricted' | 'unrestricted';
}
export const getRewardsSpkFaqItems = (): Item[] => mainnetFaqItems;

const mainnetFaqItems = [
  {
    question: 'What is SPK?',
    answer:
      'SPK is the native governance and staking token of Spark. Designed with a long-term vision for sustainability, decentralization, and ecosystem alignment, SPK enables protocol governance, protocol security via staking, and reward distribution to participants.'
  }
];
