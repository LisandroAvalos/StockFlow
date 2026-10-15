import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerStockEntry } from '../api/stocks';

export function useStockEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerStockEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['stock'] });
    },
    onError: () => {},
  });
}