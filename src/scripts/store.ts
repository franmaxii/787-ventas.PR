/*
 * Estado del usuario guardado en el navegador (localStorage).
 * Es un prototipo: cuando haya backend, reemplaza estas funciones por llamadas a la API.
 */

export interface CartLine {
  id: string;
  qty: number;
}

export interface OrderLine {
  id: string;
  title: string;
  price: number;
  qty: number;
  emoji: string;
  color: string;
}

export interface Order {
  id: string;
  date: string;
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  payment: string;
  name: string;
  town: string;
  delivery: 'envio' | 'recogido';
}

export interface Listing {
  id: string;
  date: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  town: string;
  description: string;
  freeShipping: boolean;
  photos: string[];
}

export interface AskedQuestion {
  productId: string;
  productTitle: string;
  text: string;
  date: string;
}

const KEYS = {
  cart: 'p787:cart',
  favs: 'p787:favs',
  orders: 'p787:orders',
  listings: 'p787:listings',
  questions: 'p787:questions',
} as const;

type Key = (typeof KEYS)[keyof typeof KEYS];

export const CHANGE_EVENT = 'p787:change';

function read<T>(key: Key, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: Key, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { key } }));
    return true;
  } catch {
    return false;
  }
}

export function onChange(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  // cambios hechos en otra pestaña
  window.addEventListener('storage', (e) => {
    if (e.key?.startsWith('p787:')) cb();
  });
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export const cart = {
  lines: () => read<CartLine[]>(KEYS.cart, []),
  count: () => cart.lines().reduce((n, l) => n + l.qty, 0),
  add(id: string, qty = 1, max = 99) {
    const lines = cart.lines();
    const line = lines.find((l) => l.id === id);
    if (line) line.qty = Math.min(line.qty + qty, max);
    else lines.push({ id, qty: Math.min(qty, max) });
    return write(KEYS.cart, lines);
  },
  setQty(id: string, qty: number) {
    const lines = cart.lines().map((l) => (l.id === id ? { ...l, qty } : l)).filter((l) => l.qty > 0);
    return write(KEYS.cart, lines);
  },
  remove: (id: string) => write(KEYS.cart, cart.lines().filter((l) => l.id !== id)),
  clear: () => write(KEYS.cart, []),
};

export const favs = {
  ids: () => read<string[]>(KEYS.favs, []),
  has: (id: string) => favs.ids().includes(id),
  /** Devuelve true si quedó guardado en favoritos. */
  toggle(id: string) {
    const ids = favs.ids();
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [id, ...ids];
    write(KEYS.favs, next);
    return next.includes(id);
  },
};

export const orders = {
  all: () => read<Order[]>(KEYS.orders, []),
  add: (order: Order) => write(KEYS.orders, [order, ...orders.all()]),
};

export const listings = {
  all: () => read<Listing[]>(KEYS.listings, []),
  add: (l: Listing) => write(KEYS.listings, [l, ...listings.all()]),
  remove: (id: string) => write(KEYS.listings, listings.all().filter((l) => l.id !== id)),
};

export const questions = {
  all: () => read<AskedQuestion[]>(KEYS.questions, []),
  add: (q: AskedQuestion) => write(KEYS.questions, [q, ...questions.all()]),
};
