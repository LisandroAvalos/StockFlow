import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adjustStockPositive } from '../api/stocks';

export function useAdjustStockPositive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adjustStockPositive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['stock'] });
    },
    onError: () => {},
  });
}