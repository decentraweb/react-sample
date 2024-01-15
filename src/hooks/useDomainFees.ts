import {useQuery} from "@tanstack/react-query";
import useSubdomainRegistrar from "./useSubdomainRegistrar";

export interface ServiceFees {
  registrationFee: number;
  renewalFee: number;
}

function useDomainFees() {
  const registrar = useSubdomainRegistrar();
  return useQuery<ServiceFees>({
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
