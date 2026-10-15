import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import { useStockMovementsByProduct } from '../../../hooks/useStockMovements';
import { useDeleteProduct } from '../../../hooks/useDeleteProduct';
import { useStockEntry } from '../../../hooks/useStockEntry';
import { useAdjustStockPositive } from '../../../hooks/useAdjustStockPositive';
import { useAdjustStockNegative } from '../../../hooks/useAdjustStockNegative';
import { useAuth } from '../../../context/AuthContext';
import { getApiErrorMessage } from '../../../api/errorHandling';
import { formatDate } from '../../../utils/formatDate';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = Number(id);
  const { usuario } = useAuth();

  const { data: product, isLoading, isError, error } = useProduct(productId);
  const {
    data: movements,
    isLoading: isLoadingMovements,
    isError: isErrorMovements,
    error: movementsError,
  } = useStockMovementsByProduct(productId);

  const deleteProductMutation = useDeleteProduct();
  const stockEntryMutation = useStockEntry();
  const adjustPositiveMutation = useAdjustStockPositive();
  const adjustNegativeMutation = useAdjustStockNegative();

  const [quantity, setQuantity] = useState('');
  const [quantityError, setQuantityError] = useState('');

  const isStockPending =
    stockEntryMutation.isPending ||
    adjustPositiveMutation.isPending ||
    adjustNegativeMutation.isPending;

  const stockError =
    stockEntryMutation.error ?? adjustPositiveMutation.error ?? adjustNegativeMutation.error;

  function handleDelete() {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar "${product?.name}"? Esta acción no se puede deshacer desde la interfaz.`
    );
    if (!confirmed) return;

    deleteProductMutation.mutate(productId, {
      onSuccess: () => navigate('/productos'),
    });
  }

  function handleStockAction(actionLabel: string, mutation: typeof stockEntryMutation) {
    const parsed = Number(quantity);
    if (!quantity || !Number.isInteger(parsed) || parsed <= 0) {
      setQuantityError('Ingresá una cantidad entera mayor a 0');
      return;
    }
    setQuantityError('');

    const confirmed = window.confirm(
      `¿Confirmás ${actionLabel} de ${parsed} unidades de "${product?.name}"?`
    );
    if (!confirmed) return;

    // Limpia errores viejos de las otras acciones para no mostrar uno desactualizado
    stockEntryMutation.reset();
    adjustPositiveMutation.reset();
    adjustNegativeMutation.reset();

    mutation.mutate({ productId, quantity: parsed }, { onSuccess: () => setQuantity('') });
  }

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

      {/* Sección de acciones */}
      <div className="mt-8 space-y-4 border-t pt-6">
        <div>
          <h2 className="text-lg font-semibold">Movimientos de stock</h2>
          <div className="mt-2 flex flex-wrap items-start gap-3">
            <div>
              <input
                type="number"
                min="1"
                placeholder="Cantidad"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-32 rounded border px-3 py-2"
              />
              {quantityError && (
                <p className="mt-1 text-sm text-red-600">{quantityError}</p>
              )}
            </div>

            <button
              onClick={() => handleStockAction('un ingreso de mercadería', stockEntryMutation)}
              disabled={isStockPending}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
            >
              Registrar ingreso
            </button>

            {usuario?.rol === 'ADMIN' && (
              <>
                <button
                  onClick={() =>
                    handleStockAction('un ajuste positivo', adjustPositiveMutation)
                  }
                  disabled={isStockPending}
                  className="rounded border border-green-600 px-4 py-2 text-green-700 hover:bg-green-50 disabled:opacity-50"
                >
                  Ajuste (+)
                </button>
                <button
                  onClick={() =>
                    handleStockAction('un ajuste negativo', adjustNegativeMutation)
                  }
                  disabled={isStockPending}
                  className="rounded border border-red-600 px-4 py-2 text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  Ajuste (−)
                </button>
              </>
            )}
          </div>

          {stockError && (
            <p className="mt-2 text-sm text-red-600">{getApiErrorMessage(stockError)}</p>
          )}
        </div>

        {usuario?.rol === 'ADMIN' && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/productos/${productId}/editar`)}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Editar producto
            </button>

            <div>
              {deleteProductMutation.isError && (
                <p className="mb-2 text-sm text-red-600">
                  {getApiErrorMessage(deleteProductMutation.error)}
                </p>
              )}
              <button
                onClick={handleDelete}
                disabled={deleteProductMutation.isPending}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleteProductMutation.isPending ? 'Eliminando...' : 'Eliminar producto'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}