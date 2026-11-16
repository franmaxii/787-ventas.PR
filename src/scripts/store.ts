/*
 * Estado del usuario guardado en el navegador (localStorage).
 * Es un prototipo: cuando haya backend, reemplaza estas funciones por llamadas a la API
 * (ver docs/ → Apéndice B).
 */

// ---------------------------------------------------------------- Tipos

export interface Listing {
  id: string;
  date: string;
  type: 'articulo' | 'vehiculo' | 'alquiler' | 'propiedad';
  title: string;
  /** 0 = gratis. En alquileres, renta mensual; en renta de artículos, por día. */
  price: number;
  category: string;
  condition: string;
  town: string;
  description: string;
  photos: string[];
  /** Datos extra según el tipo (año, millaje, cuartos…). */
  extra?: Record<string, string>;
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

export interface ChatMessage {
  from: 'yo' | 'ellos';
  text: string;
  at: string;
}

export interface Conversation {
  /** Id de la conversación (una por publicación). */
  id: string;
  listingId: string;
  role: 'comprando' | 'vendiendo';
  title: string;
  price: number;
  type?: string;
  category?: string;
  image?: string;
  color: string;
  /** Con quién hablas. */
  withName: string;
  withId?: string;
  messages: ChatMessage[];
  updatedAt: string;
  unread: number;
}

/** Colección de favoritos ("Pa' la casa", "Regalos"…). Sus publicaciones también están en Favoritos. */
export interface Collection {
  id: string;
  name: string;
  /** Ids de publicaciones, la más reciente primero. */
  ids: string[];
  createdAt: string;
}

export interface Location {
  town: string;
  /** Millas. 0 = toda la isla. */
  radius: number;
}

// ---------------------------------------------------------------- Almacenamiento

const KEYS = {
  favs: 'p787:favs',
  collections: 'p787:collections',
  listings: 'p787:listings',
  profile: 'p787:profile',
  following: 'p787:following',
  chats: 'p787:chats',
  location: 'p787:location',
  notifSeen: 'p787:notif-seen',
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

// ---------------------------------------------------------------- Favoritos

export const favs = {
  ids: () => read<string[]>(KEYS.favs, []),
  has: (id: string) => favs.ids().includes(id),
  /** Devuelve true si quedó guardado. Al quitarlo de Favoritos sale también de sus colecciones. */
  toggle(id: string) {
    const ids = favs.ids();
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [id, ...ids];
    write(KEYS.favs, next);
    const saved = next.includes(id);
    if (!saved) collections.forget(id);
    return saved;
  },
  add(id: string) {
    if (!favs.has(id)) write(KEYS.favs, [id, ...favs.ids()]);
  },
};

// ---------------------------------------------------------------- Colecciones de favoritos

/** Largo máximo del nombre de una colección. */
export const COLLECTION_NAME_MAX = 40;

const cleanName = (name: string) => name.replace(/\s+/g, ' ').trim().slice(0, COLLECTION_NAME_MAX);

export const collections = {
  all: () => read<Collection[]>(KEYS.collections, []),
  get: (id: string) => collections.all().find((c) => c.id === id),
  /** Colecciones que tienen esta publicación. */
  of: (itemId: string) => collections.all().filter((c) => c.ids.includes(itemId)),
  /**
   * Crea una colección (opcionalmente con una publicación adentro) y la devuelve.
   * Si ya hay una con el mismo nombre, usa esa. Devuelve null si el nombre está vacío.
   */
  create(name: string, itemId?: string): Collection | null {
    const clean = cleanName(name);
    if (!clean) return null;
    const all = collections.all();
    let col = all.find((c) => c.name.toLocaleLowerCase('es') === clean.toLocaleLowerCase('es'));
    if (!col) {
      col = { id: uid(), name: clean, ids: [], createdAt: new Date().toISOString() };
      all.push(col);
    }
    if (itemId && !col.ids.includes(itemId)) {
      col.ids = [itemId, ...col.ids];
      favs.add(itemId);
    }
    write(KEYS.collections, all);
    return col;
  },
  rename(id: string, name: string) {
    const clean = cleanName(name);
    if (!clean) return false;
    return write(KEYS.collections, collections.all().map((c) => (c.id === id ? { ...c, name: clean } : c)));
  },
  /** Borra la colección; sus publicaciones siguen en Favoritos. Devuelve la borrada (para deshacer). */
  remove(id: string) {
    const all = collections.all();
    const gone = all.find((c) => c.id === id);
    write(KEYS.collections, all.filter((c) => c.id !== id));
    return gone;
  },
  /** Vuelve a poner una colección borrada (botón "Deshacer"). */
  restore(col: Collection) {
    const all = collections.all().filter((c) => c.id !== col.id);
    write(KEYS.collections, [...all, col].sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
  },
  /** Pone o quita la publicación de la colección. Devuelve true si quedó adentro. */
  toggle(id: string, itemId: string) {
    let inside = false;
    const next = collections.all().map((c) => {
      if (c.id !== id) return c;
      inside = !c.ids.includes(itemId);
      return { ...c, ids: inside ? [itemId, ...c.ids] : c.ids.filter((x) => x !== itemId) };
    });
    write(KEYS.collections, next);
    if (inside) favs.add(itemId);
    return inside;
  },
  /** Saca la publicación de todas las colecciones. */
  forget(itemId: string) {
    const all = collections.all();
    if (all.some((c) => c.ids.includes(itemId))) {
      write(KEYS.collections, all.map((c) => ({ ...c, ids: c.ids.filter((x) => x !== itemId) })));
    }
  },
};

// ---------------------------------------------------------------- Mis publicaciones

export const listings = {
  all: () => read<Listing[]>(KEYS.listings, []),
  add: (l: Listing) => write(KEYS.listings, [l, ...listings.all()]),
  remove: (id: string) => write(KEYS.listings, listings.all().filter((l) => l.id !== id)),
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

// ---------------------------------------------------------------- Perfil

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

// ---------------------------------------------------------------- Mensajes

export const chats = {
  all: () =>
    read<Conversation[]>(KEYS.chats, []).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
  get: (id: string) => chats.all().find((c) => c.id === id),
  /** Crea la conversación si no existe y la devuelve. */
  ensure(base: Omit<Conversation, 'messages' | 'updatedAt' | 'unread'>) {
    const existing = chats.get(base.id);
    if (existing) return existing;
    const conv: Conversation = { ...base, messages: [], updatedAt: new Date().toISOString(), unread: 0 };
    write(KEYS.chats, [conv, ...chats.all()]);
    return conv;
  },
  send(id: string, text: string, from: ChatMessage['from'] = 'yo') {
    const at = new Date().toISOString();
    return write(
      KEYS.chats,
      chats.all().map((c) =>
        c.id === id
          ? { ...c, messages: [...c.messages, { from, text, at }], updatedAt: at, unread: from === 'ellos' ? c.unread + 1 : c.unread }
          : c,
      ),
    );
  },
  markRead: (id: string) =>
    chats.get(id)?.unread ? write(KEYS.chats, chats.all().map((c) => (c.id === id ? { ...c, unread: 0 } : c))) : true,
  unread: () => chats.all().reduce((n, c) => n + c.unread, 0),
  remove: (id: string) => write(KEYS.chats, chats.all().filter((c) => c.id !== id)),
};

// ---------------------------------------------------------------- Ubicación

export const location = {
  get(): Location {
    const saved = read<Location | null>(KEYS.location, null);
    if (saved) return saved;
    return { town: profile.get()?.public.town ?? 'San Juan', radius: 50 };
  },
  set: (l: Location) => write(KEYS.location, l),
};

// ---------------------------------------------------------------- Notificaciones

export const notifSeen = {
  get: () => read<string>(KEYS.notifSeen, '1970-01-01T00:00:00.000Z'),
  mark: () => write(KEYS.notifSeen, new Date().toISOString()),
};
