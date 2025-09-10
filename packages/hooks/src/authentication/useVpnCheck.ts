import { useQuery } from '@tanstack/react-query';
import { ReadHookParams } from '../hooks';

type VpnResponse = {
  isConnectedToVpn: boolean;
  isRestrictedRegion: boolean;
  countryCode: string;
};

const checkVpn = async (authUrl: string): Promise<VpnResponse> => {
  if (!authUrl) {
    throw new Error('Missing auth URL');
  }

  let isConnectedToVpn = false;
  let isRestrictedRegion = false;
  let countryCode = '';

  const vpnRes = await fetch(`${authUrl}/ip/status`);
  if (!vpnRes.ok) {
    throw new Error('Could not fetch VPN status');
  }

  const { country_code, is_vpn, is_restricted_region } = await vpnRes.json();

  countryCode = country_code;
  isConnectedToVpn = is_vpn;
  isRestrictedRegion = is_restricted_region;

  return { countryCode, isConnectedToVpn, isRestrictedRegion };
};

type Props = ReadHookParams<VpnResponse> & { authUrl: string };

export const useVpnCheck = ({
  authUrl,
  refetchInterval = 60000, // default to perform VPN check every 60 seconds
  ...options
}: Props): { data: VpnResponse | undefined; error: any | undefined; isLoading: boolean } => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['vpn'],
    queryFn: () => checkVpn(authUrl),
    refetchInterval,
    ...options
  });

  return { data, error, isLoading: !data && isLoading };
};
