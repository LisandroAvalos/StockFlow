import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../api/products';
import type { ProductUpdateRequest } from '../types/product';

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductUpdateRequest }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {},
  });
}