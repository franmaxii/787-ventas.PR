export type Swatch = 'azul' | 'rojito' | 'amarillo' | 'verde';

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  color: Swatch;
  blurb: string;
}

export const categories: Category[] = [
  { slug: 'tecnologia', name: 'Tecnología', emoji: '📱', color: 'azul', blurb: 'Celulares, audio y gadgets.' },
  { slug: 'energia', name: 'Energía', emoji: '⚡', color: 'amarillo', blurb: 'Plantas, baterías y placas solares.' },
  { slug: 'hogar', name: 'Hogar', emoji: '🏠', color: 'rojito', blurb: 'Todo para la casa.' },
  { slug: 'moda', name: 'Moda', emoji: '👕', color: 'verde', blurb: 'Ropa, chancletas y accesorios.' },
  { slug: 'hecho-en-pr', name: 'Hecho en PR', emoji: '🎨', color: 'rojito', blurb: 'Artesanías de la isla.' },
  { slug: 'playa', name: 'Deportes y playa', emoji: '🏖️', color: 'azul', blurb: 'Pa’ la playa y el monte.' },
  { slug: 'vehiculos', name: 'Vehículos', emoji: '🚗', color: 'amarillo', blurb: 'Gomas, accesorios y más.' },
  { slug: 'sabores', name: 'Sabores de PR', emoji: '🍌', color: 'verde', blurb: 'Café, sofrito y pique.' },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
