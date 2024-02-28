import {providers} from "ethers";
import config from "../config";

export const ethProvider = new providers.JsonRpcProvider(config.chains[0].rpcUrl, config.chains[0].chainId);

export const polygonProvider = new providers.JsonRpcProvider(config.chains[1].rpcUrl, config.chains[1].chainId);
