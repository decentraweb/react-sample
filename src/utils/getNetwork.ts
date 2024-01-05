import {Network} from "@decentraweb/core";

function getNetwork(chainId: number): Network {
  switch (chainId) {
    case 1:
      return 'mainnet';
    case 5:
      return 'goerli';
    case 137:
      return 'matic';
    case 80001:
      return 'maticmum';
    default:
      throw new Error(`Unsupported chainId ${chainId}`);
  }
}

export default getNetwork;
