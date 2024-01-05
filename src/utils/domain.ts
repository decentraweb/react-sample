import {DWEBRegistry, utils} from "@decentraweb/core";
import {ethProvider, polygonProvider} from "./providers";
import config from "../config";

const dwebEth = new DWEBRegistry({
  network: config.production ? 'mainnet' : 'goerli',
  provider: ethProvider,
});

const dwebPolygon = new DWEBRegistry({
  network: config.production ? 'matic' : 'maticmum',
  provider: polygonProvider,
});

export function isDomainValid(domain: string): boolean {
  try {
    utils.normalizeName(domain);
  } catch (e) {
    return false;
  }
  return true;
}

export async function checkDomainExists(domain: string) {
  const data = await Promise.all([
    dwebEth.nameExists(domain),
    dwebPolygon.nameExists(domain),
  ]);
  return data[0] || data[1];
}
