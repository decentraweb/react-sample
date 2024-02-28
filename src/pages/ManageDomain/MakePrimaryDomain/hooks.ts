import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {DWEBName} from "@decentraweb/core";
import {getRegistry} from "../../../utils/domain";
import useRegistry from "../../../hooks/useRegistry";
import {useAppContext} from "../../../App/context";

/**
 * Check if given domain is primary for the connected wallet. This means:
 * 1. Domain has ethereum address assigned to it
 * 2. That address has reverse record pointing to this domain
 * NOTE: This does not mean that the domain is primary for the connected wallet.
 * It only checks if it is primary for any wallet.
 * @param name
 */
export function useIsPrimaryDomain(name: DWEBName){
  return useQuery({
    queryKey: ['isPrimaryDomain', name.network, name.name],
    queryFn: async () => {
      const ethAddress = await name.getAddress('ETH');
      const registry = getRegistry(name.network);
      let reverseMatch = false;
      if(ethAddress){
        const reverseRecord = await registry.getReverseRecord(ethAddress);
        reverseMatch = reverseRecord === name.name;
      }
      return {
        address: ethAddress,
        reverseMatch
      }
    }
  });
}

/**
 * Make given domain primary for the connected wallet. This means:
 * 1. Set ethereum address for the domain to the connected wallet address
 * 2. Set reverse record for the connected wallet to the given domain
 * @param name
 */
export function useMakePrimaryDomain(name: DWEBName){
  const {signerAddress} = useAppContext();
  const queryClient = useQueryClient();
  const writableRegistry = useRegistry();
  return useMutation({
    mutationKey: ['makePrimaryDomain', name.network, name.name, signerAddress],
    mutationFn: async () => {
      // This should never happen
      if(!writableRegistry.signer){
        throw new Error('No signer available');
      }
      const owner = await writableRegistry.signer.getAddress();
      const ethAddress = await name.getAddress('ETH');
      const reverseRecord = await writableRegistry.getReverseRecord(owner);
      let addrTx;
      let reverseTx;
      if(ethAddress !== owner){
        addrTx = await name.setAddress('ETH', owner);
      }
      if(reverseRecord !== name.name){
        reverseTx = await writableRegistry.setReverseRecord(name.name);
      }
      addrTx && await addrTx.wait(1);
      reverseTx && await reverseTx.wait(1);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['isPrimaryDomain']
      });
      queryClient.invalidateQueries({
        queryKey: ['domain-wallets', name.network, name.name]
      });
    }
  });
}

