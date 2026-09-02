import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import { useStockMovementsByProduct } from '../../../hooks/useStockMovements';
import { getApiErrorMessage } from '../../../api/errorHandling';
import { formatDate } from '../../../utils/formatDate';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = Number(id);

  const { data: product, isLoading, isError, error } = useProduct(productId);
  const {
    data: movements,
    isLoading: isLoadingMovements,
    isError: isErrorMovements,
    error: movementsError,
  } = useStockMovementsByProduct(productId);

  if (isLoading) {
    return <div className="p-8">Cargando producto...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar el producto: {getApiErrorMessage(error)}
      </div>
    );
  }

  if (!product) {
    return <div className="p-8">Producto no encontrado.</div>;
  }

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/productos')}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver a Productos
      </button>

      <h1 className="mt-4 text-2xl font-bold">{product.name}</h1>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Código:</span> {product.code}
        </div>
        <div>
          <span className="font-medium">Categoría:</span> {product.category.name}
        </div>
        <div>
          <span className="font-medium">Descripción:</span> {product.description}
        </div>
        <div>
          <span className="font-medium">Stock actual:</span> {product.stock}
        </div>
        <div>
          <span className="font-medium">Stock mínimo:</span> {product.minStock}
        </div>
        <div>
          <span className="font-medium">Precio:</span> ${product.price.toFixed(2)}
        </div>
        {product.offerPrice !== null && (
          <div>
            <span className="font-medium">Precio de oferta:</span> $
            {product.offerPrice.toFixed(2)}
          </div>
        )}
      </div>

      <h2 className="mt-6 text-lg font-semibold">Proveedor</h2>
      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Nombre:</span> {product.supplier.name}
        </div>
        <div>
          <span className="font-medium">Teléfono:</span> {product.supplier.telephone}
        </div>
        <div>
          <span className="font-medium">Email:</span> {product.supplier.email}
        </div>
      </div>

      <h2 className="mt-6 text-lg font-semibold">Historial de movimientos</h2>
      {isLoadingMovements && <p className="mt-2 text-sm">Cargando movimientos...</p>}
      {isErrorMovements && (
        <p className="mt-2 text-sm text-red-600">
          Error al cargar movimientos: {getApiErrorMessage(movementsError)}
        </p>
      )}
      {movements && movements.length === 0 && (
        <p className="mt-2 text-sm text-gray-500">
          Este producto no tiene movimientos registrados.
        </p>
      )}
      {movements && movements.length > 0 && (
        <table className="mt-2 w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4">Fecha</th>
              <th className="py-2 pr-4">Tipo</th>
              <th className="py-2 pr-4">Cantidad</th>
              <th className="py-2 pr-4">Usuario</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id} className="border-b">
                <td className="py-2 pr-4">{formatDate(movement.date)}</td>
                <td className="py-2 pr-4">{movement.type}</td>
                <td className="py-2 pr-4">{movement.quantity}</td>
                <td className="py-2 pr-4">{movement.userName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}