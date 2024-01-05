import React from "react";
import {Network} from "@decentraweb/core";
import {providers} from "ethers";

export interface AppContextType {
  network: Network;
  provider: providers.Web3Provider;
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType);

export function useAppContext() {
  return React.useContext(AppContext);
}
