import { useParams, useNavigate } from 'react-router-dom';
import { useSale } from '../../../hooks/useSale';
import { getApiErrorMessage } from '../../../api/errorHandling';
import { formatDate } from '../../../utils/formatDate';

export default function SaleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: sale, isLoading, isError, error } = useSale(Number(id));

  if (isLoading) {
    return <div className="p-8">Cargando venta...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar la venta: {getApiErrorMessage(error)}
      </div>
    );
  }

  if (!sale) {
    return <div className="p-8">Venta no encontrada.</div>;
  }

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/ventas')}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver a Ventas
      </button>

      <h1 className="mt-4 text-2xl font-bold">Venta #{sale.id}</h1>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Fecha:</span> {formatDate(sale.date)}
        </div>
        <div>
          <span className="font-medium">Vendedor:</span> {sale.userName}
        </div>
        <div>
          <span className="font-medium">Total:</span> ${sale.total.toFixed(2)}
        </div>
        <div>
          <span className="font-medium">Descuento total:</span> $
          {sale.totalDiscount.toFixed(2)}
        </div>
      </div>

      <h2 className="mt-6 text-lg font-semibold">Detalle de productos</h2>
      <table className="mt-2 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4">Producto</th>
            <th className="py-2 pr-4">Cantidad</th>
            <th className="py-2 pr-4">Precio unitario</th>
            <th className="py-2 pr-4">Descuento</th>
            <th className="py-2 pr-4">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {sale.details.map((detail) => (
            <tr key={detail.id} className="border-b">
              <td className="py-2 pr-4">{detail.product.name}</td>
              <td className="py-2 pr-4">{detail.quantity}</td>
              <td className="py-2 pr-4">${detail.unitPrice.toFixed(2)}</td>
              <td className="py-2 pr-4">{detail.discount}%</td>
              <td className="py-2 pr-4">${detail.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}