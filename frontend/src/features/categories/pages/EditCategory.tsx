import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';
import { useUpdateCategory } from '../../../hooks/useUpdateCategory';
import { getApiErrorMessage } from '../../../api/errorHandling';
import type { CategoryResponse } from '../../../types/category';

const categorySchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);

  // No hay un hook por id: la lista de categorías activas ya está en caché y alcanza.
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <div className="p-8">Cargando categoría...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar la categoría: {getApiErrorMessage(error)}
      </div>
    );
  }

  const category = categories?.find((c) => c.id === categoryId);

  if (!category) {
    return <div className="p-8">Categoría no encontrada.</div>;
  }

  return <EditCategoryForm category={category} />;
}

function EditCategoryForm({ category }: { category: CategoryResponse }) {
  const navigate = useNavigate();
  const updateCategoryMutation = useUpdateCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: category.name },
  });

  async function onSubmit(data: CategoryFormData) {
    try {
      await updateCategoryMutation.mutateAsync({ id: category.id, data });
      navigate('/categorias');
    } catch {
      // El error queda en updateCategoryMutation.error y se muestra abajo.
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Editar categoría</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {updateCategoryMutation.isError && (
          <p className="text-sm text-red-600">{getApiErrorMessage(updateCategoryMutation.error)}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={updateCategoryMutation.isPending}
            className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {updateCategoryMutation.isPending ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/categorias')}
            className="flex-1 rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
