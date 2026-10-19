import { useBestSellingProducts } from '../../../hooks/useBestSellingProducts';
import { getApiErrorMessage } from '../../../api/errorHandling';

export default function BestSellingReport() {
  const { data: items, isLoading, isError, error } = useBestSellingProducts();

  return (
    <section>
      <h2 className="text-lg font-semibold">Productos más vendidos</h2>
      <p className="text-sm text-gray-500">Top 10 por cantidad total de unidades vendidas.</p>

      {isLoading && <p className="mt-3 text-sm">Cargando...</p>}
      {isError && (
        <p className="mt-3 text-sm text-red-600">
          Error al cargar el reporte: {getApiErrorMessage(error)}
        </p>
      )}
      {items && items.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">Todavía no hay ventas registradas.</p>
      )}
      {items && items.length > 0 && (
        <table className="mt-3 w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4">Producto</th>
              <th className="py-2 pr-4">Código</th>
              <th className="py-2 pr-4">Unidades vendidas</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.product.id} className="border-b">
                <td className="py-2 pr-4">{index + 1}</td>
                <td className="py-2 pr-4">{item.product.name}</td>
                <td className="py-2 pr-4">{item.product.code}</td>
                <td className="py-2 pr-4 font-medium">{item.totalSold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
