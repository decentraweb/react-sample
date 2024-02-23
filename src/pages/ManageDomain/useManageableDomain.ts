import { DWEBName, Network } from '@decentraweb/core';
import useRegistry from '../../hooks/useRegistry';
import {getDwebNameInstance} from '../../utils/domain';
import { useEffect, useState } from 'react';

type Result =
  | { status: 'ready'; name: DWEBName; isOwner: boolean }
  | { status: 'wrong_network'; name: DWEBName; correctNetwork: Network }
  | { status: 'not_found' }
  | { status: 'loading' }
  | { status: 'error' };

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
