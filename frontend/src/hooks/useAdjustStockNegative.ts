import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adjustStockNegative } from '../api/stocks';

export function useAdjustStockNegative() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adjustStockNegative,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['stock'] });
    },
    onError: () => {},
  });
}