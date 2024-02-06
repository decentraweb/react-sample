import {createWeb3Modal, defaultConfig} from '@web3modal/ethers5/react';
import config from "../config";

export const CHAIN_NAMES: Record<number, string> = {
  1: 'Mainnet',
  5: 'Goerli',
  137: 'Polygon',
  80001: 'Mumbai'
};

function setupWeb3Modal() {

  const metadata = {
    name: config.walletConnect.title,
    description: config.walletConnect.description,
    url: config.walletConnect.url,
    icons: config.walletConnect.icons,
  };

  createWeb3Modal({
    ethersConfig: defaultConfig({metadata}),
    chains: config.chains,
    defaultChain: config.chains[0],
    projectId: config.walletConnect.id,
  });
}

export default setupWeb3Modal;
