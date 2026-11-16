import type { IconName } from '../components/Icon.astro';

export type Swatch = 'azul' | 'rojito' | 'amarillo' | 'verde';

export interface Category {
  slug: string;
  /** Nombre completo (menú, títulos, filtros). */
  name: string;
  /** Nombre corto para los círculos de la portada. */
  short: string;
  emoji: string;
  color: Swatch;
  blurb: string;
  /** Ícono de Heroicons (nombre corto de Icon.astro): menú, círculos de la portada y encabezado. */
  icon: IconName;
  /** Ilustración de respaldo para publicaciones sin foto. */
  image: string;
}

/** Mismo orden que el menú "Tu Plaza". */
export const categories: Category[] = [
  { slug: 'alquileres', name: 'Alquiler bienes raíces', short: 'Alquileres', emoji: '🏠', color: 'verde', icon: 'key', blurb: 'Casas, apartamentos y cuartos en alquiler.', image: '/img/productos/casa.svg' },
  { slug: 'venta-bienes-raices', name: 'Venta bienes raíces', short: 'Bienes raíces', emoji: '🏡', color: 'azul', icon: 'homeModern', blurb: 'Casas, apartamentos y solares a la venta.', image: '/img/productos/casa-venta.svg' },
  { slug: 'hogar', name: 'Hogar y vida', short: 'Hogar y vida', emoji: '🏺', color: 'amarillo', icon: 'home', blurb: 'Cocina, enseres, energía, artesanías y sabores de la isla.', image: '/img/productos/greca.svg' },
  { slug: 'vehiculos', name: 'Autos y piezas', short: 'Autos y piezas', emoji: '🚗', color: 'azul', icon: 'truck', blurb: 'Carros, guaguas, motoras, gomas y piezas.', image: '/img/productos/carro.svg' },
  { slug: 'bebes', name: 'Bebés y maternidad', short: 'Bebés', emoji: '👶', color: 'amarillo', icon: 'faceSmile', blurb: 'Coches, car seats, ropita y todo pa’l bebé.', image: '/img/productos/coche-bebe.svg' },
  { slug: 'tecnologia', name: 'Electrónica / Tecnología', short: 'Electrónica', emoji: '📱', color: 'rojito', icon: 'phone', blurb: 'Celulares, audio, energía portátil y gadgets.', image: '/img/productos/celular.svg' },
  { slug: 'playa', name: 'Deportes y playa', short: 'Deportes y playa', emoji: '🏖️', color: 'azul', icon: 'sun', blurb: 'Pa’ la playa, el monte y el gimnasio.', image: '/img/productos/tabla-surf.svg' },
  { slug: 'salud-belleza', name: 'Salud y belleza', short: 'Salud y belleza', emoji: '💄', color: 'verde', icon: 'sparkles', blurb: 'Cuidado personal, cabello y bienestar.', image: '/img/productos/secadora.svg' },
  { slug: 'muebles', name: 'Muebles', short: 'Muebles', emoji: '🛋️', color: 'amarillo', icon: 'inboxStack', blurb: 'Sofás, cómodas, comedores y más.', image: '/img/productos/sofa.svg' },
  { slug: 'moda', name: 'Moda', short: 'Moda', emoji: '👕', color: 'verde', icon: 'bag', blurb: 'Ropa, chancletas y accesorios.', image: '/img/productos/camiseta.svg' },
  { slug: 'donaciones', name: 'Donaciones', short: 'Donaciones', emoji: '🎁', color: 'verde', icon: 'gift', blurb: 'Cosas que se regalan. Solo tienes que recogerlas.', image: '/img/productos/donaciones.svg' },
  { slug: 'renta-articulos', name: 'Renta de artículos', short: 'Renta de artículos', emoji: '🎈', color: 'azul', icon: 'calendar', blurb: 'Brincolines, carpas, plantas y equipo por día.', image: '/img/productos/brincolin.svg' },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

/** Categorías con reglas propias (sin opción "Gratis" ni condición de artículo). */
export const SPECIAL_CATEGORIES = ['vehiculos', 'alquileres', 'venta-bienes-raices', 'donaciones', 'renta-articulos'];
