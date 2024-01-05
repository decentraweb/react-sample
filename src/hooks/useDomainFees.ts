import {useQuery} from "@tanstack/react-query";
import useSubdomainRegistrar from "./useSubdomainRegistrar";


function useDomainFees() {
  const registrar = useSubdomainRegistrar();
  return useQuery({
    queryKey: [registrar?.network, 'domain-fees'],
    queryFn: async () => {
      return {
        registrationFee: await registrar?.getServiceFee() || 0,
        renewalFee: await registrar?.getRenewalServiceFee() || 0,
      };
    }
  });
}

export default useDomainFees;
