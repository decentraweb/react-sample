import { DWEBName, Network } from '@decentraweb/core';
import useRegistry from '../../hooks/useRegistry';
import {getDwebNameInstance} from '../../utils/domain';
import { useEffect, useState } from 'react';

type Result =
  // Name is on the same network as connected wallet. `isOwner` is true if connected wallet is owner of the name.
  | { status: 'ready'; name: DWEBName; isOwner: boolean }
  // Connected wallet owns domain, but name is on the different network. `correctNetwork` is the network on which name is.
  | { status: 'wrong_network'; name: DWEBName; correctNetwork: Network }
  // Name is not found, most likely it does not exist
  | { status: 'not_found' }
  | { status: 'loading' }
  | { status: 'error' };

/**
 * Get domain instance. Instance may be read-only if connected wallet is
 * not owner of the domain or domain is on another network.
 * @param domain
 */
function useManageableDomain(domain: string) {
  const registryWithSigner = useRegistry();
  const [result, setResult] = useState<Result>({ status: 'loading' });
  useEffect(() => {
    setResult({ status: 'loading' });
    getDwebNameInstance(domain)
      .then(async (name) => {
        // Name is not found
        if (!name) {
          setResult({ status: 'not_found' });
          return;
        }
        const owner = await name.getOwner();
        const signerAddress = await registryWithSigner.signer?.getAddress();
        // Name is not owned by current user, we can show records but can not change them
        if(owner !== signerAddress) {
          setResult({ status: 'ready', name, isOwner: false });
          return;
        }
        // User is owner, but signer is not connected to the different network,
        // we can show records can not change records
        if (name.network !== registryWithSigner.network) {
          setResult({ status: 'wrong_network', name, correctNetwork: name.network });
          return;
        }
        // User is owner and signer is connected to the correct network, create a writable instance
        setResult({ status: 'ready', name: registryWithSigner.name(domain), isOwner: true});
      })
      .catch((e) => setResult({ status: 'error' }));
  }, [domain, registryWithSigner]);
  return result;
}

export default useManageableDomain;
