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

/** Precio como se muestra en una publicación: "Gratis", "$950/mes", "$120/día" o "$45". */
export function priceLabel(p: { price: number; type?: string; category?: string }): string {
  if (p.price === 0) return 'Gratis';
  if (p.type === 'alquiler') return `${formatMoney(p.price)}/mes`;
  if (p.category === 'renta-articulos') return `${formatMoney(p.price)}/día`;
  return formatMoney(p.price);
}

/** "Hoy", "Ayer", "Hace 3 días", "Hace 2 semanas"… */
export function timeAgo(days: number): string {
  if (days <= 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  if (days < 7) return `Hace ${days} días`;
  if (days < 30) {
    const w = Math.round(days / 7);
    return `Hace ${w} ${w === 1 ? 'semana' : 'semanas'}`;
  }
  const m = Math.round(days / 30);
  return `Hace ${m} ${m === 1 ? 'mes' : 'meses'}`;
}

export const formatMiles = (miles: number) => new Intl.NumberFormat('es-PR').format(miles);
