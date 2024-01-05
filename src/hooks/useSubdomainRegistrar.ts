import {registrars} from "@decentraweb/core";
import {useMemo} from "react";
import {useAppContext} from "../App/context";


function useSubdomainRegistrar() {
  const {network, provider} = useAppContext();
  return useMemo(() => {
    const signer = provider.getSigner();
    return new registrars.SubdomainRegistrar({
      network: network,
      provider: provider,
      signer,
    })
  }, [network, provider]);
}

export default useSubdomainRegistrar;
