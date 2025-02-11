export const normalizeNetworkName = (networkName: string) => {
  return networkName.toLowerCase().replaceAll(' ', '');
};
