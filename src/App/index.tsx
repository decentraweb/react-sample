import React, {useMemo} from 'react';
import AppHeader from "./AppHeader";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import styles from './styles.module.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppContext, AppContextType} from "./context";
import {providers} from "ethers";
import getNetwork from "../utils/getNetwork";
import {useWeb3ModalAccount, useWeb3ModalProvider} from "@web3modal/ethers5/react";
import routes from "./routes";
import {api} from "@decentraweb/core";


const router = createBrowserRouter(routes);

// Create a client
const queryClient = new QueryClient()

interface ConnectedAppProps {
  chainId: number;
  signerAddress: string;
  walletProvider: providers.ExternalProvider;
}

function ConnectedApp({chainId, signerAddress, walletProvider}: ConnectedAppProps) {
  const ctx = useMemo<AppContextType>(() => ({
    network: getNetwork(chainId),
    isPolygon: chainId === 137 || chainId === 80001,
    provider: new providers.Web3Provider(walletProvider),
    signerAddress,
    api: new api.DecentrawebAPI(getNetwork(chainId))
  }), [chainId, signerAddress, walletProvider]);
  return (
    <AppContext.Provider value={ctx}>
      <RouterProvider router={router}/>
    </AppContext.Provider>
  )
}

function App() {
  const {walletProvider} = useWeb3ModalProvider();
  const {chainId, address} = useWeb3ModalAccount();
  let content;
  if (walletProvider && chainId && address) {
    content = (
      <ConnectedApp
        chainId={chainId}
        signerAddress={address}
        walletProvider={walletProvider}
      />
    );
  } else {
    content = <ConnectWallet/>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppHeader/>
      <div className={styles.appContainer}>
        {content}
      </div>
    </QueryClientProvider>
  );
}

export default App;
