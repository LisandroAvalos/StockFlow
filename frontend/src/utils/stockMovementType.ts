import type { StockMovementType } from '../types/stockMovement';

export const STOCK_MOVEMENT_LABELS: Record<StockMovementType, string> = {
  COMPRA: 'Ingreso',
  AJUSTE_POSITIVO: 'Ajuste (+)',
  AJUSTE_NEGATIVO: 'Ajuste (−)',
  VENTA: 'Venta',
};

export const STOCK_MOVEMENT_BADGE_STYLES: Record<StockMovementType, string> = {
  COMPRA: 'bg-green-100 text-green-800',
  AJUSTE_POSITIVO: 'bg-blue-100 text-blue-800',
  AJUSTE_NEGATIVO: 'bg-orange-100 text-orange-800',
  VENTA: 'bg-purple-100 text-purple-800',
};

// El backend guarda siempre la cantidad en positivo; el signo lo da el tipo de movimiento.
const INCREASES_STOCK: Record<StockMovementType, boolean> = {
  COMPRA: true,
  AJUSTE_POSITIVO: true,
  AJUSTE_NEGATIVO: false,
  VENTA: false,
};

export function isStockIncrease(type: StockMovementType): boolean {
  return INCREASES_STOCK[type];
}
