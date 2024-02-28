import {useQuery} from "@tanstack/react-query";
import useSubdomainRegistrar from "./useSubdomainRegistrar";

/**
 * Get the staking state for a domain.
 * More details on data fromat: https://decentraweb.github.io/decentrawebjs/types/_decentraweb_core.registrars.StakingState.html
 * NOTE: Since staking state is retrieved from API, it would return
 * status no matter on which network domain is.
 * @param domain - domain name to check
 */
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
