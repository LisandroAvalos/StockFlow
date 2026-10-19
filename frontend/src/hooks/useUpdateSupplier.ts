import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSupplier } from '../api/suppliers';
import type { SupplierUpdateRequest } from '../types/supplier';

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SupplierUpdateRequest }) =>
      updateSupplier(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {},
  });
}
