import React from 'react';

import { Landing } from '../modules/landing/Landing';
import '../globals.css'; // uncommenting this fixes the padding issues, why?
import { useChainId } from 'wagmi';
import { sepolia, base } from 'wagmi/chains';
import { LandingSepolia } from '@/modules/landing/LandingSepolia';
import { LandingBase } from '@/modules/landing/LandingBase';
import { TENDERLY_BASE_CHAIN_ID } from '@/modules/providers/wagmi';

function Home(): React.ReactElement {
  const chainId = useChainId();

  if (chainId === sepolia.id) {
    return <LandingSepolia />;
  }

  if (chainId === base.id || chainId === TENDERLY_BASE_CHAIN_ID) {
    return <LandingBase />;
  }

  return <Landing />;
}

export default Home;
