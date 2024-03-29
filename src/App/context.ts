import React from "react";
import {api, Network} from "@decentraweb/core";
import {providers} from "ethers";

export interface AppContextType {
  network: Network;
  isPolygon: boolean;
  signerAddress: string;
  provider: providers.Web3Provider;
  api: api.DecentrawebAPI;
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType);

export function useAppContext() {
  return React.useContext(AppContext);
}
