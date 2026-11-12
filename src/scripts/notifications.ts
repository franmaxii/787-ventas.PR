/*
 * Notificaciones derivadas del estado (en producción las enviaría el servidor por push/SMS):
 * mensajes nuevos, bajadas de precio en favoritos, publicaciones de vendedores que sigues
 * y publicaciones propias por vencer.
 */
import { activeProducts, getProduct, getSeller } from '../data/products';
import { formatMoney, priceLabel } from '../lib/format';
import { chats, favs, following, LISTING_DAYS, listingState, listings, notifSeen, profile } from './store';

export interface Notification {
  key: string;
  icon: 'chat' | 'tag' | 'user' | 'clock' | 'id';
  title: string;
  body: string;
  href: string;
  at: string;
  unread: boolean;
}

const DAY = 864e5;
const ago = (days: number) => new Date(Date.now() - days * DAY).toISOString();

export function getNotifications(): Notification[] {
  const seen = notifSeen.get();
  const list: Omit<Notification, 'unread'>[] = [];

  for (const c of chats.all()) {
    if (!c.unread) continue;
    const last = c.messages[c.messages.length - 1];
    list.push({
      key: `chat:${c.id}`,
      icon: 'chat',
      title: `${c.withName} te respondió`,
      body: `${c.title}: “${last?.text ?? ''}”`,
      href: `/mensajes?c=${encodeURIComponent(c.id)}`,
      at: c.updatedAt,
    });
  }

  for (const id of favs.ids()) {
    const p = getProduct(id);
    if (!p?.originalPrice || p.status) continue;
    list.push({
      key: `drop:${p.id}`,
      icon: 'tag',
      title: 'Bajó de precio uno de tus favoritos',
      body: `${p.title}: de ${formatMoney(p.originalPrice)} a ${priceLabel(p)}`,
      href: `/producto/${p.id}`,
      at: ago(p.daysAgo),
    });
  }

  const followed = new Set(following.ids());
  for (const p of activeProducts) {
    if (!followed.has(p.sellerId) || p.daysAgo > 3) continue;
    list.push({
      key: `new:${p.id}`,
      icon: 'user',
      title: `${getSeller(p.sellerId)?.username ?? 'Un vendedor'} publicó algo nuevo`,
      body: `${p.title} · ${priceLabel(p)}`,
      href: `/producto/${p.id}`,
      at: ago(p.daysAgo),
    });
  }

  for (const l of listings.all()) {
    if (listingState(l) !== 'activo') continue;
    const left = Math.ceil(LISTING_DAYS - (Date.now() - new Date(l.date).getTime()) / DAY);
    if (left > 5) continue;
    list.push({
      key: `exp:${l.id}`,
      icon: 'clock',
      title: 'Tu publicación vence pronto',
      body: `${l.title} vence en ${left} ${left === 1 ? 'día' : 'días'}. Renuévala desde tu perfil.`,
      href: '/cuenta',
      at: new Date(new Date(l.date).getTime() + (LISTING_DAYS - 5) * DAY).toISOString(),
    });
  }

  if (!profile.get()) {
    list.push({
      key: 'welcome',
      icon: 'id',
      title: 'Crea tu perfil verificado',
      body: 'Para vender necesitas un perfil con identidad verificada. Toma 2 minutos.',
      href: '/registro',
      at: '2026-01-01T00:00:00.000Z',
    });
  }

  return list
    .map((n) => ({ ...n, unread: n.at > seen }))
    .sort((a, b) => b.at.localeCompare(a.at));
}

export const unreadNotifications = () => getNotifications().filter((n) => n.unread).length;
