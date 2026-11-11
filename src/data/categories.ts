export type Swatch = 'azul' | 'rojito' | 'amarillo' | 'verde';

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  color: Swatch;
  blurb: string;
  /** Ilustración que representa la categoría. */
  image: string;
}

export const categories: Category[] = [
  { slug: 'tecnologia', name: 'Tecnología', emoji: '📱', color: 'azul', blurb: 'Celulares, audio y gadgets.', image: '/img/productos/celular.svg' },
  { slug: 'energia', name: 'Energía', emoji: '⚡', color: 'amarillo', blurb: 'Plantas, baterías y placas solares.', image: '/img/productos/placa-solar.svg' },
  { slug: 'hogar', name: 'Hogar', emoji: '🏠', color: 'rojito', blurb: 'Todo para la casa.', image: '/img/productos/abanico.svg' },
  { slug: 'moda', name: 'Moda', emoji: '👕', color: 'verde', blurb: 'Ropa, chancletas y accesorios.', image: '/img/productos/camiseta.svg' },
  { slug: 'hecho-en-pr', name: 'Hecho en PR', emoji: '🎨', color: 'rojito', blurb: 'Artesanías de la isla.', image: '/img/productos/vejigante.svg' },
  { slug: 'playa', name: 'Deportes y playa', emoji: '🏖️', color: 'azul', blurb: 'Pa’ la playa y el monte.', image: '/img/productos/tabla-surf.svg' },
  { slug: 'vehiculos', name: 'Vehículos', emoji: '🚗', color: 'amarillo', blurb: 'Gomas, accesorios y más.', image: '/img/productos/gomas.svg' },
  { slug: 'sabores', name: 'Sabores de PR', emoji: '🍌', color: 'verde', blurb: 'Café, sofrito y pique.', image: '/img/productos/cafe.svg' },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
