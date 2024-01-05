import {useQuery} from "@tanstack/react-query";
import {checkDomainExists, isDomainValid} from "../utils/domain";

interface Result {
  available: boolean;
  errorType: 'invalid' | 'exists' | null;
  error?: string;
}

function useDomainAvailable(domain: string) {
  return useQuery<Result>({
    queryKey: ['domain-available', domain],
    queryFn: async () => {
      if (!isDomainValid(domain)) {
        return {
          available: false,
          errorType: 'invalid',
          error: 'Invalid domain name'
        };
      }
      const domainExists = await checkDomainExists(domain);
      return {
        available: !domainExists,
        errorType: domainExists ? 'exists' : null,
        error: domainExists ? 'Domain already registered' : undefined
      };
    }
  });
}

export default useDomainAvailable;
