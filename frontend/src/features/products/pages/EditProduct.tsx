import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import { useCategories } from '../../../hooks/useCategories';
import { useSuppliers } from '../../../hooks/useSuppliers';
import { useUpdateProduct } from '../../../hooks/useUpdateProduct';
import type { ProductResponse, ProductUpdateRequest } from '../../../types/product';
import type { CategoryResponse } from '../../../types/category';
import type { SupplierResponse } from '../../../types/supplier';
import { getApiErrorMessage } from '../../../api/errorHandling';

const productSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  code: z.string().min(1, 'El código es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  price: z
    .string()
    .min(1, 'El precio es obligatorio')
    .refine((v) => Number(v) > 0, 'El precio debe ser mayor a 0'),
  offerPrice: z.string().optional(),
  minStock: z
    .string()
    .min(1, 'El stock mínimo es obligatorio')
    .refine((v) => Number.isInteger(Number(v)) && Number(v) >= 0, 'No puede ser negativo'),
  categoryId: z.string().min(1, 'Seleccioná una categoría'),
  supplierId: z.string().min(1, 'Seleccioná un proveedor'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = Number(id);

  const { data: product, isLoading: isLoadingProduct } = useProduct(productId);
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: suppliers, isLoading: isLoadingSuppliers } = useSuppliers();
  const updateProductMutation = useUpdateProduct();

  if (isLoadingProduct || isLoadingCategories || isLoadingSuppliers) {
    return <div className="p-8">Cargando datos del formulario...</div>;
  }

  if (!product) {
    return <div className="p-8">Producto no encontrado.</div>;
  }

  return (
    <EditProductForm
      product={product}
      categories={categories}
      suppliers={suppliers}
      productId={productId}
      updateProductMutation={updateProductMutation}
      navigate={navigate}
    />
  );
}

function EditProductForm({
  product,
  categories,
  suppliers,
  productId,
  updateProductMutation,
  navigate,
}: {
  product: ProductResponse;
  categories: CategoryResponse[] | undefined;
  suppliers: SupplierResponse[] | undefined;
  productId: number;
  updateProductMutation: ReturnType<typeof useUpdateProduct>;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      code: product.code,
      description: product.description,
      price: product.price.toString(),
      offerPrice: product.offerPrice?.toString() ?? '',
      minStock: product.minStock.toString(),
      categoryId: product.category.id.toString(),
      supplierId: product.supplier.id.toString(),
    },
  });

  async function onSubmit(data: ProductFormData) {
    const payload: ProductUpdateRequest = {
      name: data.name,
      code: data.code,
      description: data.description,
      price: Number(data.price),
      offerPrice: data.offerPrice ? Number(data.offerPrice) : null,
      minStock: Number(data.minStock),
      categoryId: Number(data.categoryId),
      supplierId: Number(data.supplierId),
    };

    updateProductMutation.mutate(
      { id: productId, data: payload },
      { onSuccess: () => navigate(`/productos/${productId}`) }
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Editar producto</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium">
            Código
          </label>
          <input
            id="code"
            type="text"
            {...register('code')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="description"
            {...register('description')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              Precio
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register('price')}
              className="mt-1 w-full rounded border px-3 py-2"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>

          <div>
            <label htmlFor="offerPrice" className="block text-sm font-medium">
              Precio de oferta (opcional)
            </label>
            <input
              id="offerPrice"
              type="number"
              step="0.01"
              {...register('offerPrice')}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="minStock" className="block text-sm font-medium">
            Stock mínimo
          </label>
          <input
            id="minStock"
            type="number"
            {...register('minStock')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.minStock && (
            <p className="mt-1 text-sm text-red-600">{errors.minStock.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium">
            Categoría
          </label>
          <select
            id="categoryId"
            {...register('categoryId')}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="supplierId" className="block text-sm font-medium">
            Proveedor
          </label>
          <select
            id="supplierId"
            {...register('supplierId')}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            {suppliers?.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.supplierId && (
            <p className="mt-1 text-sm text-red-600">{errors.supplierId.message}</p>
          )}
        </div>

        {updateProductMutation.isError && (
          <p className="text-sm text-red-600">
            {getApiErrorMessage(updateProductMutation.error)}
          </p>
        )}
        <div className="flex gap-3">
        <button
            type="submit"
            disabled={updateProductMutation.isPending}
            className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
            {updateProductMutation.isPending ? 'Guardando...' : 'Guardar cambios'}
        </button>

        <button
            type="button"
            onClick={() => navigate(`/productos/${productId}`)}
            className="flex-1 rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
            Cancelar
        </button>
        </div>
      </form>
    </div>
  );
}