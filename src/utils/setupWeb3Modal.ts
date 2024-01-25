import {createWeb3Modal, defaultConfig} from '@web3modal/ethers5/react';

export const CHAIN_NAMES: Record<number, string> = {
  1: 'Mainnet',
  5: 'Goerli',
  137: 'Polygon',
  80001: 'Mumbai'
};

export interface WCOptions {
  id: string;
  title: string;
  description: string;
  url: string;
  icons: string[];
}

interface Options {
  walletConnect: WCOptions;
  production?: boolean;
}

function setupWeb3Modal({walletConnect, production}: Options) {
  let chains;
  if (production) {
    chains = [
      {
        chainId: 1,
        name: 'Ethereum',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://cloudflare-eth.com'
      },
      {
        chainId: 137,
        name: 'Polygon',
        currency: 'MATIC',
        explorerUrl: 'https://polygonscan.com',
        rpcUrl: 'https://polygon-rpc.com'
      }
    ];
  } else {
    chains = [
      {
        chainId: 5,
        name: 'Goerli',
        currency: 'ETH',
        explorerUrl: 'https://goerli.etherscan.io',
        rpcUrl: 'https://rpc.ankr.com/eth_goerli'
      },
      {
        chainId: 80001,
        name: 'Polygon Mumbai',
        currency: 'MATIC',
        explorerUrl: 'https://mumbai.polygonscan.com',
        rpcUrl: 'https://rpc.ankr.com/polygon_mumbai'
      }
    ];
  }

  const metadata = {
    name: walletConnect.title,
    description: walletConnect.description,
    url: walletConnect.url,
    icons: []
  };

  createWeb3Modal({
    ethersConfig: defaultConfig({metadata}),
    chains: chains,
    defaultChain: chains[0],
    projectId: walletConnect.id,
  });
}

export default setupWeb3Modal;
