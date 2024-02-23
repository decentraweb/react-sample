import {providers} from "ethers";
import config from "../config";

export const ethProvider = new providers.InfuraProvider(config.ethNetwork, config.infuraApiKey);

export const polygonProvider = new providers.InfuraProvider(config.polygonNetwork, config.infuraApiKey);
