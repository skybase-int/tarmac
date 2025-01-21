import { useMakerHooks } from '@jetstreamgg/hooks';

export function useIpfsToHttp(cid?: string): string {
  const { ipfs } = useMakerHooks();

  return `https://${cid}.ipfs.${ipfs.gateway}`;
}
