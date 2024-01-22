import useSubdomainRegistrar from '../../../hooks/useSubdomainRegistrar';
import { useMutation } from '@tanstack/react-query';
import { registrars } from '@decentraweb/core';

function useFinishRegistration(approval: registrars.ApprovedRegistration) {
  const registrar = useSubdomainRegistrar();
  const { isPending, mutate, error, data } = useMutation({
    mutationKey: ['finishRegistration', registrar?.network, approval.approval.signature],
    mutationFn: async () => {
      return registrar.finishRegistration(approval);
    }
  });

  return { isPending: isPending, submit: mutate, error, transaction: data };
}

export default useFinishRegistration;
