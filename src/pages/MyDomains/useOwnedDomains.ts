import { useInfiniteQuery } from '@tanstack/react-query';
import useRegistry from '../../hooks/useRegistry';
import { useMemo } from 'react';

const domainsPerPage = 20;

function useOwnedDomains(address: string) {
  const registry = useRegistry();
  const { data, fetchNextPage, hasNextPage, isPending } = useInfiniteQuery({
    queryKey: ['owned-domains', registry.network, address],
    queryFn: ({ pageParam }) => registry.getOwnedDomains(address, pageParam, domainsPerPage),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage.length >= domainsPerPage ? lastPageParam + domainsPerPage : null
  });

  const domains = useMemo(() => data?.pages.flatMap((page) => page) ?? [], [data]);

  return {
    domains,
    isPending,
    fetchNextPage,
    hasNextPage
  };
}

export default useOwnedDomains;
