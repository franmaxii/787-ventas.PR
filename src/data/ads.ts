/*
 * Anuncios de EJEMPLO para enseñar los espacios publicitarios. Los negocios son inventados.
 * Fotos: Flickr con licencia libre (créditos en fotos-anuncios.json y en /creditos).
 *
 * Reglas para que no se sientan invasivos:
 * - Como máximo un anuncio por bloque (una tarjeta en una cuadrícula o un banner) y dos por página.
 * - Siempre dicen "Patrocinado", se pueden ocultar y no salen en Mensajes, Vender, Favoritos ni el perfil.
 * - Son del contexto: en Autos sale el car wash, en Muebles la mudanza, en Playa la escuela de surf…
 */

export interface Ad {
  id: string;
  advertiser: string;
  town: string;
  headline: string;
  text: string;
  cta: string;
  image: string;
  /** Categorías donde tiene sentido mostrarlo. */
  categories: string[];
}

const foto = (id: string) => `/img/anuncios/${id}.webp`;

export const ads: Ad[] = [
  {
    id: 'cafe',
    advertiser: 'Café El Punto',
    town: 'Caguas',
    headline: 'El punto de encuentro de tu pueblo',
    text: '¿Cerraste una venta? Encuéntrense aquí, con cámaras y buena luz: el cafecito va por la casa.',
    cta: 'Ver dónde queda',
    image: foto('cafe'),
    categories: ['bebes', 'renta-articulos'],
  },
  {
    id: 'ferreteria',
    advertiser: 'Ferretería Flamboyán',
    town: 'Bayamón',
    headline: 'Listos pa’ la temporada',
    text: 'Baterías, linternas y extensiones con 15% de descuento esta semana.',
    cta: 'Ver ofertas',
    image: foto('ferreteria'),
    categories: ['hogar', 'tecnologia'],
  },
  {
    id: 'mudanzas',
    advertiser: 'Mudanzas Coquí',
    town: 'San Juan',
    headline: '¿Compraste un mueble? Te lo llevamos',
    text: 'El mismo día en el área metro, desde $45 con dos ayudantes.',
    cta: 'Pedir cotización',
    image: foto('mudanzas'),
    categories: ['muebles', 'donaciones', 'alquileres'],
  },
  {
    id: 'carwash',
    advertiser: 'Brillo Express',
    town: 'Carolina',
    headline: 'Véndelo brillando',
    text: 'Lavado, cera y detallado interior antes de sacarle las fotos a tu carro.',
    cta: 'Reservar turno',
    image: foto('carwash'),
    categories: ['vehiculos'],
  },
  {
    id: 'surf',
    advertiser: 'Olas del Oeste',
    town: 'Rincón',
    headline: 'Tu primera ola en Rincón',
    text: 'Clases de surf para principiantes y alquiler de tablas por día.',
    cta: 'Reservar clase',
    image: foto('surf'),
    categories: ['playa'],
  },
  {
    id: 'inspeccion',
    advertiser: 'Casa Segura PR',
    town: 'Guaynabo',
    headline: 'Inspecciona antes de firmar',
    text: 'Inspección completa de casa o apartamento, con informe en 48 horas.',
    cta: 'Coordinar visita',
    image: foto('inspeccion'),
    categories: ['venta-bienes-raices'],
  },
  {
    id: 'salon',
    advertiser: 'Salón Brisas',
    town: 'Ponce',
    headline: 'Brilla este fin de semana',
    text: 'Corte, blower y tratamiento con 20% de descuento para clientes nuevos.',
    cta: 'Hacer cita',
    image: foto('salon'),
    categories: ['salud-belleza', 'moda'],
  },
];

export const getAd = (id: string) => ads.find((a) => a.id === id)!;

/** El anuncio que va con una categoría; sin categoría (o sin uno propio), el del café. */
export const adFor = (category?: string) => ads.find((a) => category && a.categories.includes(category)) ?? getAd('cafe');
