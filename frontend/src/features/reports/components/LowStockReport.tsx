import { useLowStockProducts } from '../../../hooks/useLowStockProducts';
import { getApiErrorMessage } from '../../../api/errorHandling';

export default function LowStockReport() {
  const { data: products, isLoading, isError, error } = useLowStockProducts();

  return (
    <section>
      <h2 className="text-lg font-semibold">Productos con bajo stock</h2>
      <p className="text-sm text-gray-500">Stock actual menor o igual al stock mínimo.</p>

      {isLoading && <p className="mt-3 text-sm">Cargando...</p>}
      {isError && (
        <p className="mt-3 text-sm text-red-600">
          Error al cargar el reporte: {getApiErrorMessage(error)}
        </p>
      )}
      {products && products.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">No hay productos con bajo stock.</p>
      )}
      {products && products.length > 0 && (
        <table className="mt-3 w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4">Producto</th>
              <th className="py-2 pr-4">Código</th>
              <th className="py-2 pr-4">Stock</th>
              <th className="py-2 pr-4">Mínimo</th>
              <th className="py-2 pr-4">Proveedor</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 pr-4">{product.name}</td>
                <td className="py-2 pr-4">{product.code}</td>
                <td className="py-2 pr-4 font-medium text-red-700">{product.stock}</td>
                <td className="py-2 pr-4">{product.minStock}</td>
                <td className="py-2 pr-4">{product.supplier.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
