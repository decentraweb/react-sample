import {EthereumNetwork, PolygonNetwork} from "@decentraweb/core";

interface Config {
  production: boolean;
  infuraApiKey: string;
  stakedDomains: string[];
  ethNetwork: EthereumNetwork;
  polygonNetwork: PolygonNetwork;
  walletConnect: {
    id: string;
    title: string;
    description: string;
    url: string;
    icons: string[];
  };
  chains: Array<{
    chainId: number;
    name: string;
    currency: string;
    explorerUrl: string;
    rpcUrl: string;
  }>;
}

const config: Config = {
  production: false,
  infuraApiKey: 'f270207d8b864a65b074f4b449570db0',
  ethNetwork: 'mainnet',
  polygonNetwork: 'matic',
  stakedDomains: [
    'demo',
    'crypto-wallet',
    '🙂🙂🙂'
  ],
  walletConnect: {
    id: '25dedc15312b0d1514661ce87fcf73e8',
    title: 'Decentraweb Demo',
    description: 'Buy and manage cool web3 domains',
    url: 'https://demo.decentraweb.org',
    icons: ['https://demo.decentraweb.org/favicon.ico'],
  },
  chains: [],
}

if( config.production ) {
  config.chains = [
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
  config.ethNetwork = 'goerli';
  config.polygonNetwork = 'maticmum';
  config.chains = [
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


export default config;
