import {useQuery} from "@tanstack/react-query";
import {providers} from "ethers";


function useWaitTransaction(tx: providers.TransactionResponse | undefined) {
  const {isPending, data, error } = useQuery({
    queryKey: ['waitTransaction', tx?.hash],
    queryFn: async () => {
      return tx?.wait(1);
    },
    enabled: !!tx
  })

  return { isPending: isPending || !data, receipt: data, error };
}

export default useWaitTransaction;
