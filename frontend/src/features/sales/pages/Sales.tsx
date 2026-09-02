import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSales } from '../../../hooks/useSales';
import { getApiErrorMessage } from '../../../api/errorHandling';
import { formatDate } from '../../../utils/formatDate';

export default function Sales() {
  const navigate = useNavigate();
  const { data: sales, isLoading, isError, error } = useSales();

  if (isLoading) {
    return <div className="p-8">Cargando ventas...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar ventas: {getApiErrorMessage(error)}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ventas</h1>
        <Link
          to="/ventas/nueva"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Nueva venta
        </Link>
      </div>
      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4">Fecha</th>
            <th className="py-2 pr-4">Vendedor</th>
            <th className="py-2 pr-4">Unidades</th>
            <th className="py-2 pr-4">Total</th>
            <th className="py-2 pr-4">Descuento</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => {
            const totalUnits = sale.details.reduce((sum, d) => sum + d.quantity, 0);
            return (
              <tr key={sale.id} onClick={() => navigate(`/ventas/${sale.id}`)} className="cursor-pointer border-b hover:bg-gray-50">
                <td className="py-2 pr-4">{formatDate(sale.date)}</td>
                <td className="py-2 pr-4">{sale.userName}</td>
                <td className="py-2 pr-4">{totalUnits}</td>
                <td className="py-2 pr-4">${sale.total.toFixed(2)}</td>
                <td className="py-2 pr-4">${sale.totalDiscount.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}