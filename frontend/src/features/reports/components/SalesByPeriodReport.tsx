import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSalesByDateRange } from '../../../hooks/useSalesByDateRange';
import { getApiErrorMessage } from '../../../api/errorHandling';
import { formatDate } from '../../../utils/formatDate';
import {
  toDateInputValue,
  startOfDay,
  endOfDay,
  firstDayOfMonth,
} from '../../../utils/dateRange';

export default function SalesByPeriodReport() {
  const navigate = useNavigate();
  const today = new Date();

  const [startDate, setStartDate] = useState(toDateInputValue(firstDayOfMonth(today)));
  const [endDate, setEndDate] = useState(toDateInputValue(today));

  const isRangeValid = Boolean(startDate) && Boolean(endDate) && startDate <= endDate;

  const {
    data: sales,
    isLoading,
    isError,
    error,
  } = useSalesByDateRange(startOfDay(startDate), endOfDay(endDate), { enabled: isRangeValid });

  const totalAmount = sales?.reduce((sum, sale) => sum + sale.total, 0) ?? 0;
  const totalDiscount = sales?.reduce((sum, sale) => sum + sale.totalDiscount, 0) ?? 0;

  return (
    <section>
      <h2 className="text-lg font-semibold">Ventas por período</h2>

      <div className="mt-3 flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium">
            Desde
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 rounded border px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium">
            Hasta
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 rounded border px-3 py-2"
          />
        </div>
      </div>

      {!isRangeValid && (
        <p className="mt-3 text-sm text-red-600">
          Elegí un rango válido: la fecha "Desde" no puede ser posterior a "Hasta".
        </p>
      )}

      {isRangeValid && isLoading && <p className="mt-3 text-sm">Cargando...</p>}
      {isRangeValid && isError && (
        <p className="mt-3 text-sm text-red-600">
          Error al cargar el reporte: {getApiErrorMessage(error)}
        </p>
      )}

      {isRangeValid && sales && sales.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">No hay ventas en el período seleccionado.</p>
      )}

      {isRangeValid && sales && sales.length > 0 && (
        <>
          <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Ventas:</span> {sales.length}
            </div>
            <div>
              <span className="font-medium">Total:</span> ${totalAmount.toFixed(2)}
            </div>
            <div>
              <span className="font-medium">Descuentos:</span> ${totalDiscount.toFixed(2)}
            </div>
          </div>

          <table className="mt-3 w-full border-collapse text-left">
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
              {sales.map((sale) => {
                const totalUnits = sale.details.reduce((sum, d) => sum + d.quantity, 0);
                return (
                  <tr
                    key={sale.id}
                    onClick={() => navigate(`/ventas/${sale.id}`)}
                    className="cursor-pointer border-b hover:bg-gray-50"
                  >
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
        </>
      )}
    </section>
  );
}
