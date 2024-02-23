import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {DWEBName} from "@decentraweb/core";
import {getRegistry} from "../../../utils/domain";
import useRegistry from "../../../hooks/useRegistry";
import {useAppContext} from "../../../App/context";

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

