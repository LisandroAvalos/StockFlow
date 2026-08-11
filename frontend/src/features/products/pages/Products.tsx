import { useProducts } from '../../../hooks/useProducts';

export default function Products() {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <div className="p-8">Cargando productos...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar productos: {error.message}
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Productos</h1>

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