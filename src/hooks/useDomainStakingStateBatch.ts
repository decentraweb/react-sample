import {useQuery} from "@tanstack/react-query";
import useSubdomainRegistrar from "./useSubdomainRegistrar";


function useDomainStakingStateBatch(domains: string[]) {
  const registrar = useSubdomainRegistrar();
  return useQuery({
    queryKey: [registrar.network, 'domain-staking-state-batch', domains],
    queryFn: async () => {
      return registrar.stakingStatus(domains);
    }
  });
}

export default useDomainStakingStateBatch;
