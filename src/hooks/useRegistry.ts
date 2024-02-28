import { DWEBRegistry } from '@decentraweb/core';
import { useMemo } from 'react';
import { useAppContext } from '../App/context';

/**
 * Get registry instance for the current network. This instance is using connected wallet as signer,
 * so it can be used to write to the registry and get writable domain instances.
 */
function useRegistry() {
  const { network, provider } = useAppContext();
  return useMemo(() => {
    const signer = provider.getSigner();
    return new DWEBRegistry({
      network,
      provider,
      signer
    });
  }, [network, provider]);
}

export default useRegistry;
