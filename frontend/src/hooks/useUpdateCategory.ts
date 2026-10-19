import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../api/categories';
import type { CategoryUpdateRequest } from '../types/category';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdateRequest }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // Los productos llevan la categoría embebida: si cambia el nombre, hay que refrescarlos.
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {},
  });
}
