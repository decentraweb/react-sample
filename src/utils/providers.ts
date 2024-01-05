import {providers} from "ethers";
import config from "../config";

export const ethNetwork = config.production ? 'mainnet' : 'goerli';

export const ethProvider = new providers.InfuraProvider(ethNetwork, config.infuraApiKey);

export const maticNetwork = config.production ? 'matic' : 'maticmum';

export const polygonProvider = new providers.InfuraProvider(maticNetwork, config.infuraApiKey);
