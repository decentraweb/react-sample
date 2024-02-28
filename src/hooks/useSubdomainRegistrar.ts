import {registrars} from "@decentraweb/core";
import {useMemo} from "react";
import {useAppContext} from "../App/context";

/**
 * Get subdomain registrar instance for the current network.
 * Instance has signer attached, so it can be used for registrations.
 */
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
