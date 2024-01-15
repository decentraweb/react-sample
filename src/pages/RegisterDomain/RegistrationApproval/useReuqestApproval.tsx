import {useMutation} from "@tanstack/react-query";
import useSubdomainRegistrar from "../../../hooks/useSubdomainRegistrar";
import {useAppContext} from "../../../App/context";

function useReuqestApproval(domain: string, subdomain: string, duration: number, isFeeInDWEB: boolean) {
  const registrar = useSubdomainRegistrar();
  const {signerAddress} = useAppContext();
  const {isPending, mutate, error, data} = useMutation({
    mutationKey: ['requestApproval', registrar?.network, signerAddress, domain, subdomain, duration, isFeeInDWEB],
    mutationFn: async () => {
      return registrar.approveOndemandRegistration({name: domain, label: subdomain, duration}, isFeeInDWEB)
    }
  });

  return {isPending, requestApproval: mutate, error, approval: data};
}

export default useReuqestApproval;
