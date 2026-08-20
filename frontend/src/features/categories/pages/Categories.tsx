import { Link } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';
import { useAuth } from '../../../context/AuthContext';
import { getApiErrorMessage } from '../../../api/errorHandling';

export default function Categories() {
  const { data: categories, isLoading, isError, error } = useCategories();
  const { usuario } = useAuth();

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
        {usuario?.rol === 'ADMIN' && (
          <Link
            to="/categorias/nueva"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Nueva categoría
          </Link>
        )}
      </div>
      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="py-2 pr-4">{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}