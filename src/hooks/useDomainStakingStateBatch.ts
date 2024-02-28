import {useQuery} from "@tanstack/react-query";
import useSubdomainRegistrar from "./useSubdomainRegistrar";

/**
 * Get the staking state for mutliple domains.
 * More details on data fromat: https://decentraweb.github.io/decentrawebjs/types/_decentraweb_core.registrars.StakingState.html
 * @param domains
 */
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
