import {useQuery} from "@tanstack/react-query";
import useSubdomainRegistrar from "./useSubdomainRegistrar";


function useDomainStakingState(domain: string) {
  const registrar = useSubdomainRegistrar();
  return useQuery({
    queryKey: [registrar.network, 'domain-staking-state', domain],
    queryFn: async () => {
      const data = await registrar.stakingStatus([domain]);
      return data[0];
    }
  });
}

export default useDomainStakingState;
