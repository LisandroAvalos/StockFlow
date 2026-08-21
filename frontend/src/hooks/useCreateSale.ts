import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSale } from '../api/sales';

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {},
  });
}