import { DWEBRegistry } from '@decentraweb/core';
import { useMemo } from 'react';
import { useAppContext } from '../App/context';

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
