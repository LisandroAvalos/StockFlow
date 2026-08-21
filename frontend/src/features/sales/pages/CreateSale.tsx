import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import { useCreateSale } from '../../../hooks/useCreateSale';
import type { SaleCreateRequest } from '../../../types/sale';
import { getApiErrorMessage } from '../../../api/errorHandling';

const saleDetailSchema = z.object({
  productId: z.string().min(1, 'Seleccioná un producto'),
  quantity: z
    .string()
    .min(1, 'La cantidad es obligatoria')
    .refine((v) => Number.isInteger(Number(v)) && Number(v) > 0, 'Debe ser un entero mayor a 0'),
  discount: z
    .string()
    .min(1, 'El descuento es obligatorio (0 si no aplica)')
    .refine((v) => Number(v) >= 0 && Number(v) <= 100, 'Debe estar entre 0 y 100'),
});

const saleSchema = z.object({
  details: z.array(saleDetailSchema).min(1, 'La venta debe tener al menos un producto'),
});

type SaleFormData = z.infer<typeof saleSchema>;

export default function CreateSale() {
  const navigate = useNavigate();
  const { data: products, isLoading: isLoadingProducts } = useProducts();
  const createSaleMutation = useCreateSale();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SaleFormData>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      details: [{ productId: '', quantity: '1', discount: '0' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });
  
  const watchedDetails = watch('details');

  async function onSubmit(data: SaleFormData) {
    const payload: SaleCreateRequest = {
      details: data.details.map((d) => ({
        productId: Number(d.productId),
        quantity: Number(d.quantity),
        discount: Number(d.discount),
      })),
    };

    try {
      await createSaleMutation.mutateAsync(payload);
      navigate('/ventas');
    } catch {
    }
  }

  if (isLoadingProducts) {
    return <div className="p-8">Cargando productos...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Nueva venta</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-3xl space-y-6">
        {fields.map((field, index) => {
          const selectedProductId = watchedDetails?.[index]?.productId;
          const selectedProduct = products?.find(
            (p) => p.id === Number(selectedProductId)
          );
          const quantity = Number(watchedDetails?.[index]?.quantity) || 0;

          const estimatedUnitPrice = selectedProduct
            ? (selectedProduct.offerPrice ?? selectedProduct.price)
            : null;
          const estimatedSubtotal = estimatedUnitPrice
            ? estimatedUnitPrice * quantity
            : null;

          const insufficientStock =
            selectedProduct && quantity > selectedProduct.stock;

          return (
            <div key={field.id} className="rounded border p-4 space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">Producto</label>
                  <select
                    {...register(`details.${index}.productId`)}
                    className="mt-1 w-full rounded border px-3 py-2"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Seleccioná un producto
                    </option>
                    {products?.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  {errors.details?.[index]?.productId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.details[index]?.productId?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">Cantidad</label>
                  <input
                    type="number"
                    {...register(`details.${index}.quantity`)}
                    className="mt-1 w-full rounded border px-3 py-2"
                  />
                  {errors.details?.[index]?.quantity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.details[index]?.quantity?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">Descuento (%)</label>
                  <input
                    type="number"
                    {...register(`details.${index}.discount`)}
                    className="mt-1 w-full rounded border px-3 py-2"
                  />
                  {errors.details?.[index]?.discount && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.details[index]?.discount?.message}
                    </p>
                  )}
                </div>
              </div>

              {estimatedSubtotal !== null && (
                <p className="text-sm text-gray-600">
                  Precio estimado: ${estimatedUnitPrice?.toFixed(2)} x {quantity} = $
                  {estimatedSubtotal.toFixed(2)}
                </p>
              )}

              {insufficientStock && (
                <p className="text-sm text-amber-600">
                  ⚠ Stock disponible: {selectedProduct?.stock}. La cantidad pedida
                  supera el stock actual; el backend validará esto al confirmar.
                </p>
              )}

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Quitar producto
                </button>
              )}
            </div>
          );
        })}

        {errors.details?.root && (
          <p className="text-sm text-red-600">{errors.details.root.message}</p>
        )}

        <button
          type="button"
          onClick={() => append({ productId: '', quantity: '1', discount: '0' })}
          className="rounded border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
        >
          + Agregar producto
        </button>

        {createSaleMutation.isError && (
          <p className="text-sm text-red-600">
            {getApiErrorMessage(createSaleMutation.error)}
          </p>
        )}

        <button
          type="submit"
          disabled={createSaleMutation.isPending}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {createSaleMutation.isPending ? 'Guardando...' : 'Confirmar venta'}
        </button>
      </form>
    </div>
  );
}