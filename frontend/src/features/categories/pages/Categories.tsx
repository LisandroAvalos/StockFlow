import { Link } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';
import { useDeleteCategory } from '../../../hooks/useDeleteCategory';
import { useAuth } from '../../../context/AuthContext';
import { getApiErrorMessage } from '../../../api/errorHandling';
import type { CategoryResponse } from '../../../types/category';

export default function Categories() {
  const { data: categories, isLoading, isError, error } = useCategories();
  const deleteCategoryMutation = useDeleteCategory();
  const { usuario } = useAuth();
  const isAdmin = usuario?.rol === 'ADMIN';

  function handleDelete(category: CategoryResponse) {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar la categoría "${category.name}"?`
    );
    if (!confirmed) return;

    deleteCategoryMutation.reset();
    deleteCategoryMutation.mutate(category.id);
  }

  if (isLoading) {
    return <div className="p-8">Cargando categorías...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar categorías: {getApiErrorMessage(error)}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorías</h1>
        {isAdmin && (
          <Link
            to="/categorias/nueva"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Nueva categoría
          </Link>
        )}
      </div>

      {deleteCategoryMutation.isError && (
        <p className="mt-4 text-sm text-red-600">
          {getApiErrorMessage(deleteCategoryMutation.error)}
        </p>
      )}

      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4">Nombre</th>
            {isAdmin && <th className="py-2 pr-4">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => {
            const isDeleting =
              deleteCategoryMutation.isPending && deleteCategoryMutation.variables === category.id;
            return (
              <tr key={category.id} className="border-b">
                <td className="py-2 pr-4">{category.name}</td>
                {isAdmin && (
                  <td className="py-2 pr-4">
                    <div className="flex gap-3 text-sm">
                      <Link
                        to={`/categorias/${category.id}/editar`}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(category)}
                        disabled={deleteCategoryMutation.isPending}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
