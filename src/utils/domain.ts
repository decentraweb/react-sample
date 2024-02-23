import {DWEBRegistry, Network, registrars, utils} from "@decentraweb/core";
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

export async function getDomainNetwork(domain: string) {
  if (await dwebEth.nameExists(domain)) {
    return dwebEth.network;
  }
  if (await dwebPolygon.nameExists(domain)) {
    return dwebPolygon.network;
  }
  return null;
}

export async function getDwebNameInstance(domain: string) {
  if (await dwebEth.nameExists(domain)) {
    return dwebEth.name(domain);
  }
  if (await dwebPolygon.nameExists(domain)) {
    return dwebPolygon.name(domain);
  }
  return null;
}

export function getRegistry(network: Network) {
  switch (network) {
    case 'mainnet':
    case 'goerli':
      return dwebEth;
    case 'matic':
    case 'maticmum':
      return dwebPolygon;
    default:
      throw new Error(`Unsupported network ${network}`);
  }
}

type ServiceFee = {amount: number, paidWith: 'ETH' | 'WETH'};
type OwnerFee = {amount: number, paidWith: 'ETH' | 'WETH' | 'DWEB'};

export function getSubdomainFees(
  data: registrars.StakedDomain,
  duration: number,
  registrationFee: number,
  renewalFee: number,
  payInDweb: boolean,
  isPolygon: boolean
): {total: number, serviceFee: ServiceFee, ownerFee: OwnerFee} {
  const serviceFee: ServiceFee = {
    amount: registrationFee,
    paidWith: isPolygon ? 'WETH' : 'ETH',
  }
  const ownerFee: OwnerFee = {
    amount: data.price,
    paidWith: payInDweb ? 'DWEB' : (isPolygon ? 'WETH' : 'ETH'),
  }

  if (data.renewalType === 'renewed') {
    const renewalYears = (duration / registrars.DURATION.ONE_YEAR) - 1;
    serviceFee.amount += renewalFee * renewalYears;
    ownerFee.amount += data.renewalFee * renewalYears;
  }


  return {
    total: ownerFee.amount + serviceFee.amount,
    serviceFee,
    ownerFee,
  };
}
