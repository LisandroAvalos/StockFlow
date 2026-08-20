import { Link } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import { useAuth } from '../../../context/AuthContext';
import { getApiErrorMessage } from '../../../api/errorHandling';

export default function Products() {
  const { data: products, isLoading, isError, error } = useProducts();
  const { usuario } = useAuth();

  if (isLoading) {
    return <div className="p-8">Cargando productos...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar productos: {getApiErrorMessage(error)}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        {usuario?.rol === 'ADMIN' && (
          <Link
            to="/productos/nuevo"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Nuevo producto
          </Link>
        )}
      </div>
      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4">Nombre</th>
            <th className="py-2 pr-4">Código</th>
            <th className="py-2 pr-4">Precio</th>
            <th className="py-2 pr-4">Stock</th>
            <th className="py-2 pr-4">Categoría</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2 pr-4">{product.name}</td>
              <td className="py-2 pr-4">{product.code}</td>
              <td className="py-2 pr-4">${product.price}</td>
              <td className="py-2 pr-4">{product.stock}</td>
              <td className="py-2 pr-4">{product.category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}