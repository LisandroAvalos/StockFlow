import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useProducts } from '../../../hooks/useProducts';
import { useLowStockProducts } from '../../../hooks/useLowStockProducts';
import { useSalesByDateRange } from '../../../hooks/useSalesByDateRange';
import { toDateInputValue, startOfDay, endOfDay, firstDayOfMonth } from '../../../utils/dateRange';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const { usuario } = useAuth();

  const now = new Date();
  const todayValue = toDateInputValue(now);
  const monthStartValue = toDateInputValue(firstDayOfMonth(now));

  const products = useProducts();
  const lowStock = useLowStockProducts();
  // Una sola consulta con las ventas del mes; las de hoy se sacan de ese mismo resultado.
  const monthSales = useSalesByDateRange(startOfDay(monthStartValue), endOfDay(todayValue));

  const todaySales = monthSales.data?.filter((sale) => sale.date.startsWith(todayValue));
  const todayTotal = todaySales?.reduce((sum, sale) => sum + sale.total, 0) ?? 0;
  const monthTotal = monthSales.data?.reduce((sum, sale) => sum + sale.total, 0) ?? 0;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Bienvenido, {usuario?.nombre}</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Productos activos"
          value={String(products.data?.length ?? 0)}
          isLoading={products.isLoading}
          isError={products.isError}
          to="/productos"
        />
        <StatCard
          title="Productos con bajo stock"
          value={String(lowStock.data?.length ?? 0)}
          detail="Ver en Reportes"
          isLoading={lowStock.isLoading}
          isError={lowStock.isError}
          to="/reportes"
        />
        <StatCard
          title="Ventas de hoy"
          value={`$${todayTotal.toFixed(2)}`}
          detail={`${todaySales?.length ?? 0} venta(s)`}
          isLoading={monthSales.isLoading}
          isError={monthSales.isError}
          to="/ventas"
        />
        <StatCard
          title="Ventas del mes"
          value={`$${monthTotal.toFixed(2)}`}
          detail={`${monthSales.data?.length ?? 0} venta(s)`}
          isLoading={monthSales.isLoading}
          isError={monthSales.isError}
          to="/reportes"
        />
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          to="/ventas/nueva"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Nueva venta
        </Link>
        <Link
          to="/movimientos"
          className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Ver movimientos de stock
        </Link>
      </div>
    </div>
  );
}
