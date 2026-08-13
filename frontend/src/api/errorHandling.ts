import { isAxiosError } from 'axios';

/**
 * Extrae el mensaje real que mandó el backend en el body de una respuesta
 * de error (nuestro GlobalExceptionHandler devuelve el mensaje como texto
 * plano en el body). Si el error no es de Axios, o no tiene body de texto,
 * devuelve un mensaje genérico de respaldo.
 */
export function getApiErrorMessage(
  error: unknown,
  fallback = 'Ocurrió un error inesperado'
): string {
  if (isAxiosError(error) && typeof error.response?.data === 'string' && error.response.data) {
    return error.response.data;
  }
  return fallback;
}