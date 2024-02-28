import {useQuery} from "@tanstack/react-query";
import {useAppContext} from "../App/context";
import {utils} from "ethers";

interface Props {
  amount: number;
  currency: 'ETH' | 'DWEB' | 'WETH';
}


function useCryptoPrice(amount: number, currency: Props["currency"]): string | null {
  const {network, api} = useAppContext();
  const {data: price, isPending} = useQuery({
    queryKey: ['price', amount, currency, network],
    queryFn: async () => {
      const result = await api.convertPrice(amount);
      const key = currency === 'WETH' ? 'eth' : currency.toLowerCase() as keyof typeof result;
      const amountWei = result[key];
      if(!amountWei) {
        return null;
      }
      return utils.formatEther(amountWei);
    }
  });
  if (isPending || !price) {
    return null;
  }
  return price;
}

function CryptoAmount({amount, currency}: Props): JSX.Element | null {
  const price = useCryptoPrice(amount, currency);
  if(!price) {
    return null;
  }
  return (
    <>
      ~{price} {currency}
    </>
  );
}


export default CryptoAmount;
