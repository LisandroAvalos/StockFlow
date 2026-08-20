import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCategory } from '../../../hooks/useCreateCategory';
import { getApiErrorMessage } from '../../../api/errorHandling';

export default function CreateCategory() {
    const navigate = useNavigate();
    const createCategoryMutation = useCreateCategory();

    const [name, setName] = useState('');
    const [validationError, setValidationError] = useState('');

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!name.trim()) {
            setValidationError('El nombre es obligatorio');
            return;
        }
        setValidationError('');

        try {
            await createCategoryMutation.mutateAsync({ name: name.trim() });
            navigate('/categorias');
        } catch {
            // El error ya queda reflejado en createCategoryMutation.isError / .error,
            // que la UI usa para mostrar el mensaje. Acá solo evitamos que la
            // promesa rechazada quede "unhandled" en la consola del navegador.
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Nueva categoría</h1>

            <form onSubmit={onSubmit} className="mt-6 max-w-lg space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full rounded border px-3 py-2"
                    />
                    {validationError && (
                        <p className="mt-1 text-sm text-red-600">{validationError}</p>
                    )}
                </div>

                {createCategoryMutation.isError && (
                    <p className="text-sm text-red-600">
                        {getApiErrorMessage(createCategoryMutation.error)}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={createCategoryMutation.isPending}
                    className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {createCategoryMutation.isPending ? 'Guardando...' : 'Crear categoría'}
                </button>
            </form>
        </div>
    );
}