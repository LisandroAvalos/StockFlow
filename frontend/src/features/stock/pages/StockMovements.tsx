import { useAllStockMovements } from '../../../hooks/useStockMovements';
import { getApiErrorMessage } from '../../../api/errorHandling';
import { formatDate } from '../../../utils/formatDate';
import {
  STOCK_MOVEMENT_LABELS,
  STOCK_MOVEMENT_BADGE_STYLES,
  isStockIncrease,
} from '../../../utils/stockMovementType';

export default function StockMovements() {
  const { data: movements, isLoading, isError, error } = useAllStockMovements();

  if (isLoading) {
    return <div className="p-8">Cargando movimientos...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar movimientos: {getApiErrorMessage(error)}
      </div>
    );
  }

  if (!movements || movements.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Movimientos de stock</h1>
        <p className="mt-4 text-gray-500">Todavía no hay movimientos registrados.</p>
      </div>
    );
  }

  // El backend los devuelve del más viejo al más nuevo. Ordenamos por id descendente:
  // el id es autoincremental, así que equivale al orden cronológico y es determinista.
  const sortedMovements = [...movements].sort((a, b) => b.id - a.id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Movimientos de stock</h1>
      <p className="mt-1 text-sm text-gray-500">
        Historial completo, del más reciente al más antiguo.
      </p>

      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4">Fecha</th>
            <th className="py-2 pr-4">Producto</th>
            <th className="py-2 pr-4">Tipo</th>
            <th className="py-2 pr-4">Cantidad</th>
            <th className="py-2 pr-4">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {sortedMovements.map((movement) => {
            const increase = isStockIncrease(movement.type);
            return (
              <tr key={movement.id} className="border-b">
                <td className="py-2 pr-4">{formatDate(movement.date)}</td>
                <td className="py-2 pr-4">
                  {movement.product.name}{' '}
                  <span className="text-sm text-gray-500">({movement.product.code})</span>
                  {!movement.product.active && (
                    <span className="ml-2 rounded bg-gray-200 px-1.5 py-0.5 text-xs text-gray-700">
                      inactivo
                    </span>
                  )}
                </td>
                <td className="py-2 pr-4">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${STOCK_MOVEMENT_BADGE_STYLES[movement.type]}`}
                  >
                    {STOCK_MOVEMENT_LABELS[movement.type]}
                  </span>
                </td>
                <td
                  className={`py-2 pr-4 font-medium ${increase ? 'text-green-700' : 'text-red-700'}`}
                >
                  {increase ? '+' : '−'}
                  {movement.quantity}
                </td>
                <td className="py-2 pr-4">{movement.userName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
