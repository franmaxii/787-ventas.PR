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
  image?: string;
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
  /** 'activo' | 'vendido'. "Expirado" se calcula: activo y con más de LISTING_DAYS días. */
  status?: 'activo' | 'vendido';
}

export type ListingState = 'activo' | 'vendido' | 'expirado';

/** Días que dura una publicación antes de expirar. */
export const LISTING_DAYS = 30;

export function listingState(l: Listing, now = Date.now()): ListingState {
  if (l.status === 'vendido') return 'vendido';
  const age = now - new Date(l.date).getTime();
  return age > LISTING_DAYS * 864e5 ? 'expirado' : 'activo';
}

/** Lo que se muestra en el perfil público. */
export interface PublicProfile {
  username: string;
  town: string;
  photo?: string;
  showFollowers: boolean;
}

/**
 * Información personal: nunca se muestra en el perfil.
 * En producción va cifrada en el servidor, no en el navegador.
 */
export interface PrivateInfo {
  firstName: string;
  phone: string;
  birthDate: string;
  email: string;
}

export interface Profile {
  public: PublicProfile;
  private: PrivateInfo;
  /** Solo se guarda que la identidad se verificó y cuándo. La foto de la ID NO se guarda. */
  verifiedAt?: string;
  createdAt: string;
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
  profile: 'p787:profile',
  following: 'p787:following',
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

export const profile = {
  get: () => read<Profile | null>(KEYS.profile, null),
  save: (p: Profile) => write(KEYS.profile, p),
  updatePublic(patch: Partial<PublicProfile>) {
    const current = profile.get();
    if (!current) return false;
    return write(KEYS.profile, { ...current, public: { ...current.public, ...patch } });
  },
  updatePrivate(patch: Partial<PrivateInfo>) {
    const current = profile.get();
    if (!current) return false;
    return write(KEYS.profile, { ...current, private: { ...current.private, ...patch } });
  },
  remove: () => {
    try {
      localStorage.removeItem(KEYS.profile);
    } catch {
      /* sin almacenamiento */
    }
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { key: KEYS.profile } }));
  },
};

export const following = {
  ids: () => read<string[]>(KEYS.following, []),
  has: (id: string) => following.ids().includes(id),
  /** Devuelve true si quedó siguiendo. */
  toggle(id: string) {
    const ids = following.ids();
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    write(KEYS.following, next);
    return next.includes(id);
  },
};

export const listingActions = {
  markSold: (id: string) =>
    write(KEYS.listings, listings.all().map((l) => (l.id === id ? { ...l, status: 'vendido' } : l))),
  renew: (id: string) =>
    write(
      KEYS.listings,
      listings.all().map((l) => (l.id === id ? { ...l, status: 'activo', date: new Date().toISOString() } : l)),
    ),
};
