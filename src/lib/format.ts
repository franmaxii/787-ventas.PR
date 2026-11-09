import { site } from '../data/site';

const money = new Intl.NumberFormat('es-PR', { style: 'currency', currency: 'USD' });
const moneyRound = new Intl.NumberFormat('es-PR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/** $1,234.50 — o $899 si el monto es redondo. */
export function formatMoney(value: number): string {
  return Number.isInteger(value) ? moneyRound.format(value) : money.format(value);
}

export function discountPct(price: number, original?: number): number {
  if (!original || original <= price) return 0;
  return Math.round((1 - price / original) * 100);
}

/** Texto de pagos sin intereses, o null si el precio no califica. */
export function installmentsText(price: number): string | null {
  if (price < site.installmentsFrom) return null;
  const each = Math.ceil((price / site.installments) * 100) / 100;
  return `o ${site.installments} pagos de ${money.format(each)} sin intereses`;
}

export function shippingText(shipping: number): string {
  return shipping === 0 ? 'Envío gratis' : `Envío ${formatMoney(shipping)}`;
}
