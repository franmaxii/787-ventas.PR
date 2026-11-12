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
  /** Ilustración que representa la categoría. */
  image: string;
}

/** Mismo orden que el menú "Tu Plaza". */
export const categories: Category[] = [
  { slug: 'alquileres', name: 'Alquiler bienes raíces', short: 'Alquileres', emoji: '🏠', color: 'verde', blurb: 'Casas, apartamentos y cuartos en alquiler.', image: '/img/productos/casa.svg' },
  { slug: 'venta-bienes-raices', name: 'Venta bienes raíces', short: 'Bienes raíces', emoji: '🏡', color: 'azul', blurb: 'Casas, apartamentos y solares a la venta.', image: '/img/productos/casa-venta.svg' },
  { slug: 'hogar', name: 'Hogar y vida', short: 'Hogar y vida', emoji: '🏺', color: 'amarillo', blurb: 'Cocina, enseres, energía, artesanías y sabores de la isla.', image: '/img/productos/greca.svg' },
  { slug: 'vehiculos', name: 'Autos y piezas', short: 'Autos y piezas', emoji: '🚗', color: 'azul', blurb: 'Carros, guaguas, motoras, gomas y piezas.', image: '/img/productos/carro.svg' },
  { slug: 'bebes', name: 'Bebés y maternidad', short: 'Bebés', emoji: '👶', color: 'amarillo', blurb: 'Coches, car seats, ropita y todo pa’l bebé.', image: '/img/productos/coche-bebe.svg' },
  { slug: 'tecnologia', name: 'Electrónica / Tecnología', short: 'Electrónica', emoji: '📱', color: 'rojito', blurb: 'Celulares, audio, energía portátil y gadgets.', image: '/img/productos/celular.svg' },
  { slug: 'playa', name: 'Deportes y playa', short: 'Deportes y playa', emoji: '🏖️', color: 'azul', blurb: 'Pa’ la playa, el monte y el gimnasio.', image: '/img/productos/tabla-surf.svg' },
  { slug: 'salud-belleza', name: 'Salud y belleza', short: 'Salud y belleza', emoji: '💄', color: 'verde', blurb: 'Cuidado personal, cabello y bienestar.', image: '/img/productos/secadora.svg' },
  { slug: 'muebles', name: 'Muebles', short: 'Muebles', emoji: '🛋️', color: 'amarillo', blurb: 'Sofás, cómodas, comedores y más.', image: '/img/productos/sofa.svg' },
  { slug: 'moda', name: 'Moda', short: 'Moda', emoji: '👕', color: 'verde', blurb: 'Ropa, chancletas y accesorios.', image: '/img/productos/camiseta.svg' },
  { slug: 'donaciones', name: 'Donaciones', short: 'Donaciones', emoji: '🎁', color: 'verde', blurb: 'Cosas que se regalan. Solo tienes que recogerlas.', image: '/img/productos/donaciones.svg' },
  { slug: 'renta-articulos', name: 'Renta de artículos', short: 'Renta de artículos', emoji: '🎈', color: 'azul', blurb: 'Brincolines, carpas, plantas y equipo por día.', image: '/img/productos/brincolin.svg' },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

/** Categorías con reglas propias (sin opción "Gratis" ni condición de artículo). */
export const SPECIAL_CATEGORIES = ['vehiculos', 'alquileres', 'venta-bienes-raices', 'donaciones', 'renta-articulos'];
