// Valor para <input type="date"> (YYYY-MM-DD) usando la fecha LOCAL.
// toISOString() convierte a UTC y, pasadas las 21:00 en Argentina, devolvería el día siguiente.
export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// El backend espera LocalDateTime ISO (YYYY-MM-DDTHH:mm:ss), no solo la fecha.
export function startOfDay(dateValue: string): string {
  return `${dateValue}T00:00:00`;
}

export function endOfDay(dateValue: string): string {
  return `${dateValue}T23:59:59.999`;
}

export function firstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
