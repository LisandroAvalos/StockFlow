import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';
import { useSuppliers } from '../../../hooks/useSuppliers';
import { useCreateProduct } from '../../../hooks/useCreateProduct';
import type { ProductCreateRequest } from '../../../types/product';
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
    initialStock: z
        .string()
        .min(1, 'El stock inicial es obligatorio')
        .refine((v) => Number.isInteger(Number(v)) && Number(v) >= 0, 'No puede ser negativo'),
    minStock: z
        .string()
        .min(1, 'El stock mínimo es obligatorio')
        .refine((v) => Number.isInteger(Number(v)) && Number(v) >= 0, 'No puede ser negativo'),
    categoryId: z.string().min(1, 'Seleccioná una categoría'),
    supplierId: z.string().min(1, 'Seleccioná un proveedor'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function CreateProduct() {
    const navigate = useNavigate();
    const { data: categories, isLoading: isLoadingCategories } = useCategories();
    const { data: suppliers, isLoading: isLoadingSuppliers } = useSuppliers();
    const createProductMutation = useCreateProduct();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
        initialStock: '0',
        minStock: '0',
        },
    });

    async function onSubmit(data: ProductFormData) {
    const payload: ProductCreateRequest = {
        name: data.name,
        code: data.code,
        description: data.description,
        price: Number(data.price),
        offerPrice: data.offerPrice ? Number(data.offerPrice) : null,
        initialStock: Number(data.initialStock),
        minStock: Number(data.minStock),
        categoryId: Number(data.categoryId),
        supplierId: Number(data.supplierId),
    };
    
    try {
        await createProductMutation.mutateAsync(payload);
        navigate('/productos');
      } catch {
        // El error ya queda reflejado en createProductMutation.isError / .error,
        // que la UI usa para mostrar el mensaje. Acá solo evitamos que la
        // promesa rechazada quede "unhandled" en la consola del navegador.
      }
    }

    if (isLoadingCategories || isLoadingSuppliers) {
        return <div className="p-8">Cargando datos del formulario...</div>;
    }

    return (
        <div className="p-8">
        <h1 className="text-2xl font-bold">Nuevo producto</h1>

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
            {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
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
            {errors.code && (
                <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
            )}
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
                {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
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

            <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="initialStock" className="block text-sm font-medium">
                Stock inicial
                </label>
                <input
                id="initialStock"
                type="number"
                {...register('initialStock')}
                className="mt-1 w-full rounded border px-3 py-2"
                />
                {errors.initialStock && (
                <p className="mt-1 text-sm text-red-600">{errors.initialStock.message}</p>
                )}
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
            </div>

            <div>
            <label htmlFor="categoryId" className="block text-sm font-medium">
                Categoría
            </label>
            <select
                id="categoryId"
                {...register('categoryId')}
                className="mt-1 w-full rounded border px-3 py-2"
                defaultValue=""
            >
                <option value="" disabled>
                Seleccioná una categoría
                </option>
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
                defaultValue=""
            >
                <option value="" disabled>
                Seleccioná un proveedor
                </option>
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

            {createProductMutation.isError && (
                <p className="text-sm text-red-600">
                {getApiErrorMessage(createProductMutation.error)}
                </p>
            )}

            <button
            type="submit"
            disabled={createProductMutation.isPending}
            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
            {createProductMutation.isPending ? 'Guardando...' : 'Crear producto'}
            </button>
        </form>
        </div>
    );
}