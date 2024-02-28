import { DWEBName } from '@decentraweb/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const COINS = ['ETH', 'BTC'];

const queryKey = (name: DWEBName) => ['domain-wallets', name.network, name.name];

/**
 * Get wallet addresses assigned to the domain.
 * @param name - domain name to check
 */
export function useDomainWallets(name: DWEBName) {
  return useQuery({
    queryKey: queryKey(name),
    queryFn: async () => name.getAddressBatch(COINS)
  });
}

/**
 * Update wallet addresses assigned to the domain.
 * @param name - domain name, it must be writable
 */
export function useUpdateWallets(name: DWEBName) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...queryKey(name), 'update'],
    mutationFn: async (wallets: Record<string, string>) => {
      const tx = await name.setAddressBatch(wallets);
      await tx.wait(1);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(name) });
    }
  });
}
