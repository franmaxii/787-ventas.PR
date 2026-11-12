import type { Swatch } from './categories';

/*
 * Publicaciones de ejemplo, al estilo Facebook Marketplace: personas y negocios
 * publican, los compradores escriben por chat y se encuentran en persona.
 * Cuando haya backend, reemplaza estos arreglos manteniendo las interfaces.
 */

export interface Seller {
  id: string;
  name: string;
  /** Nombre de usuario público (se muestra en mayúsculas en el perfil). */
  username: string;
  town: string;
  kind: 'persona' | 'negocio';
  sales: number;
  rating: number;
  /** Identidad verificada. */
  star: boolean;
  since: number;
  followers: number;
  /** Tiempo típico de respuesta en el chat. */
  responds: string;
}

export type ListingStatus = 'activo' | 'vendido' | 'expirado';
/** articulo · vehiculo · alquiler (renta mensual) · propiedad (venta de bienes raíces) */
export type ListingType = 'articulo' | 'vehiculo' | 'alquiler' | 'propiedad';

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  miles: number;
  transmission: 'Automática' | 'Estándar';
}

/** Cuartos y baños de una propiedad (en alquiler o a la venta). */
export interface Rental {
  beds: number;
  baths: number;
  furnished: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  details: string[];
  /** USD. 0 = gratis. En alquileres es la renta mensual; en renta de artículos, por día. */
  price: number;
  /** Precio anterior: se muestra "Bajó de precio". */
  originalPrice?: number;
  category: string;
  condition: 'nuevo' | 'usado';
  sellerId: string;
  /** Pueblo de la publicación. Por defecto, el del vendedor. */
  town?: string;
  /** Días desde que se publicó. */
  daysAgo: number;
  type?: ListingType;
  vehicle?: Vehicle;
  rental?: Rental;
  emoji: string;
  color: Swatch;
  /** Foto o ilustración en `public/`. Reemplaza el SVG por una foto real cuando la tengas. */
  image?: string;
  featured?: boolean;
  /** Hecho en Puerto Rico (artesanías y sabores): sale en su sección de la portada. */
  local?: boolean;
  /** Estado de la publicación. Por defecto 'activo'. Solo las activas salen en el catálogo. */
  status?: ListingStatus;
}

export const sellers: Seller[] = [
  { id: 'yari-pr', name: 'Yarielis', username: 'YARI_PR', town: 'Carolina', kind: 'persona', sales: 23, rating: 4.9, star: true, since: 2022, followers: 54, responds: 'en unos 15 minutos' },
  { id: 'josemiguel787', name: 'José Miguel', username: 'JOSEMIGUEL787', town: 'Arecibo', kind: 'persona', sales: 12, rating: 4.7, star: true, since: 2023, followers: 18, responds: 'en menos de 1 hora' },
  { id: 'nando-autos', name: 'Nando Autos', username: 'NANDO_AUTOS', town: 'Caguas', kind: 'negocio', sales: 140, rating: 4.8, star: true, since: 2018, followers: 1290, responds: 'en menos de 1 hora' },
  { id: 'alquileres-isla', name: 'Alquileres Isla', username: 'ALQUILERESISLA', town: 'San Juan', kind: 'negocio', sales: 75, rating: 4.6, star: true, since: 2019, followers: 860, responds: 'en unas horas' },
  { id: 'tecnoisla', name: 'TecnoIsla', username: 'TECNOISLA', town: 'Bayamón', kind: 'negocio', sales: 1520, rating: 4.8, star: true, since: 2019, followers: 1284, responds: 'en menos de 1 hora' },
  { id: 'energia-boricua', name: 'Energía Boricua', username: 'ENERGIABORICUA', town: 'Caguas', kind: 'negocio', sales: 870, rating: 4.9, star: true, since: 2018, followers: 2310, responds: 'en menos de 1 hora' },
  { id: 'casa-criolla', name: 'Casa Criolla', username: 'CASACRIOLLA', town: 'Ponce', kind: 'negocio', sales: 430, rating: 4.6, star: false, since: 2021, followers: 415, responds: 'en unas horas' },
  { id: 'artesanias-mediania', name: 'Artesanías Medianía', username: 'ARTESANIASLOIZA', town: 'Loíza', kind: 'negocio', sales: 210, rating: 5, star: true, since: 2020, followers: 3120, responds: 'en unas horas' },
  { id: 'playa-y-mas', name: 'Playa y Más', username: 'PLAYAYMAS', town: 'Rincón', kind: 'negocio', sales: 640, rating: 4.7, star: false, since: 2020, followers: 760, responds: 'en menos de 1 hora' },
  { id: 'gomera-del-oeste', name: 'Gomera del Oeste', username: 'GOMERADELOESTE', town: 'Mayagüez', kind: 'negocio', sales: 980, rating: 4.7, star: true, since: 2017, followers: 538, responds: 'en unas horas' },
  { id: 'hacienda-cafetal', name: 'Hacienda Cafetal', username: 'HACIENDACAFETAL', town: 'Yauco', kind: 'negocio', sales: 1210, rating: 4.9, star: true, since: 2016, followers: 4870, responds: 'en menos de 1 hora' },
  { id: 'fiestas-del-este', name: 'Fiestas del Este', username: 'FIESTASDELESTE', town: 'Humacao', kind: 'negocio', sales: 260, rating: 4.8, star: true, since: 2021, followers: 1430, responds: 'en menos de 1 hora' },
  { id: 'moda-787', name: 'Moda 787', username: 'MODA787', town: 'San Juan', kind: 'negocio', sales: 300, rating: 4.5, star: false, since: 2022, followers: 990, responds: 'en unas horas' },
];

const img = (name: string) => `/img/productos/${name}.svg`;

export const products: Product[] = [
  // Autos y piezas
  {
    id: 'toyota-corolla-2016', title: 'Toyota Corolla 2016', type: 'vehiculo',
    description: 'Un solo dueño, mantenimiento al día y marbete hasta diciembre. Aire bien frío.',
    details: ['Marbete al día', 'Gomas nuevas', 'Cámara de reversa', 'Título limpio'],
    vehicle: { year: 2016, make: 'Toyota', model: 'Corolla', miles: 78000, transmission: 'Automática' },
    price: 11500, originalPrice: 12500, category: 'vehiculos', condition: 'usado', sellerId: 'nando-autos',
    daysAgo: 2, emoji: '🚗', color: 'azul', image: img('carro'), featured: true,
  },
  {
    id: 'jeep-wrangler-2012', title: 'Jeep Wrangler 2012 4x4', type: 'vehiculo',
    description: 'Listo para la playa y el monte. Capota nueva. Se puede ver en Caguas.',
    details: ['4x4', 'Capota nueva', 'Aros de 17"', 'Inspección al día'],
    vehicle: { year: 2012, make: 'Jeep', model: 'Wrangler', miles: 112000, transmission: 'Estándar' },
    price: 18900, category: 'vehiculos', condition: 'usado', sellerId: 'nando-autos',
    daysAgo: 6, emoji: '🚙', color: 'amarillo', image: img('carro'),
  },
  {
    id: 'scooter-electrico-plegable', title: 'Scooter eléctrico plegable',
    description: 'Hasta 25 km de autonomía. Perfecto pa’l Viejo San Juan.',
    details: ['25 km de autonomía', 'Velocidad máx. 25 km/h', 'Plegable', 'Luz delantera'],
    price: 349, originalPrice: 399, category: 'vehiculos', condition: 'nuevo', sellerId: 'gomera-del-oeste',
    daysAgo: 1, emoji: '🛴', color: 'verde', image: img('scooter'), featured: true,
  },
  {
    id: 'gomas-all-terrain-265-70r17', title: 'Juego de 4 gomas all-terrain 265/70R17',
    description: 'Incluye montura y balanceo en Mayagüez.',
    details: ['265/70R17', 'All-terrain', 'Montura y balanceo incluidos'],
    price: 560, originalPrice: 640, category: 'vehiculos', condition: 'nuevo', sellerId: 'gomera-del-oeste',
    daysAgo: 4, emoji: '🛞', color: 'amarillo', image: img('gomas'),
  },
  {
    id: 'camara-reversa-pantalla', title: 'Cámara de reversa con pantalla de 5″',
    description: 'Visión nocturna y líneas guía. Te la instalo si la recoges en el taller.',
    details: ['Pantalla de 5″', 'Visión nocturna', 'Líneas guía', 'Resistente al agua'],
    price: 45, category: 'vehiculos', condition: 'nuevo', sellerId: 'gomera-del-oeste',
    daysAgo: 9, emoji: '🚗', color: 'azul', image: img('camara-reversa'),
  },

  // Alquiler de bienes raíces
  {
    id: 'apartamento-rio-piedras', title: 'Apartamento 2 cuartos en Río Piedras', type: 'alquiler',
    description: 'Cerca de la UPR y del tren. Agua incluida. Se requiere un mes de depósito.',
    details: ['2 cuartos, 1 baño', 'Agua incluida', 'Estacionamiento', 'Cerca del Tren Urbano'],
    rental: { beds: 2, baths: 1, furnished: false },
    price: 950, category: 'alquileres', condition: 'usado', sellerId: 'alquileres-isla', town: 'San Juan',
    daysAgo: 1, emoji: '🏠', color: 'azul', image: img('casa'), featured: true,
  },
  {
    id: 'casa-dorado-3-cuartos', title: 'Casa 3 cuartos con marquesina en Dorado', type: 'alquiler',
    description: 'Urbanización con control de acceso, cerca de la playa. Placas solares y cisterna.',
    details: ['3 cuartos, 2 baños', 'Placas solares', 'Cisterna', 'Marquesina para 2 carros'],
    rental: { beds: 3, baths: 2, furnished: false },
    price: 1600, category: 'alquileres', condition: 'usado', sellerId: 'alquileres-isla', town: 'Dorado',
    daysAgo: 5, emoji: '🏡', color: 'verde', image: img('casa'),
  },
  {
    id: 'cuarto-estudiante-mayaguez', title: 'Cuarto amueblado para estudiante en Mayagüez', type: 'alquiler',
    description: 'A 5 minutos del RUM. Luz, agua e internet incluidos.',
    details: ['1 cuarto amueblado', 'Baño compartido', 'Luz, agua e internet incluidos'],
    rental: { beds: 1, baths: 1, furnished: true },
    price: 400, category: 'alquileres', condition: 'usado', sellerId: 'alquileres-isla', town: 'Mayagüez',
    daysAgo: 3, emoji: '🛏️', color: 'rojito', image: img('casa'),
  },

  // Donaciones (gratis)
  {
    id: 'sofa-gratis-carolina', title: 'Sofá de 3 plazas (gratis)',
    description: 'Me mudo y no cabe. Está en buenas condiciones. Hay que recogerlo este fin de semana.',
    details: ['3 plazas', 'Tela lavable', 'Hay que recogerlo'],
    price: 0, category: 'donaciones', condition: 'usado', sellerId: 'yari-pr',
    daysAgo: 0, emoji: '🛋️', color: 'verde', image: img('sofa-gratis'), featured: true,
  },
  {
    id: 'cajas-mudanza-gratis', title: 'Cajas de mudanza (gratis)',
    description: 'Unas 15 cajas en buen estado. Paso por el pueblo de Arecibo en las tardes.',
    details: ['~15 cajas', 'Varios tamaños'],
    price: 0, category: 'donaciones', condition: 'usado', sellerId: 'josemiguel787',
    daysAgo: 1, emoji: '📦', color: 'amarillo', image: img('cajas'),
  },

  // Electrónica / Tecnología
  {
    id: 'audifonos-cancelacion-ruido', title: 'Audífonos inalámbricos con cancelación de ruido',
    description: 'Hasta 40 horas de batería, carga rápida y sonido envolvente.',
    details: ['Bluetooth 5.3', 'Batería de 40 h', 'Cancelación activa de ruido', 'Estuche incluido'],
    price: 59.99, originalPrice: 89.99, category: 'tecnologia', condition: 'nuevo', sellerId: 'tecnoisla',
    daysAgo: 2, emoji: '🎧', color: 'azul', image: img('audifonos'), featured: true,
  },
  {
    id: 'celular-128gb-reacondicionado', title: 'Celular 128 GB desbloqueado',
    description: 'Lo usé un año, siempre con cover y protector. Funciona con todas las compañías.',
    details: ['128 GB', 'Desbloqueado', 'Batería al 90%', 'Cargador incluido'],
    price: 219, originalPrice: 260, category: 'tecnologia', condition: 'usado', sellerId: 'yari-pr',
    daysAgo: 3, emoji: '📱', color: 'rojito', image: img('celular'), featured: true,
  },
  {
    id: 'bocina-bluetooth-agua', title: 'Bocina Bluetooth a prueba de agua',
    description: 'Ideal pa’ la playa o el río. Resiste salpicones y arena.',
    details: ['Resistencia IP67', '12 h de batería', 'Flota en el agua'],
    price: 30, category: 'tecnologia', condition: 'usado', sellerId: 'josemiguel787',
    daysAgo: 8, emoji: '🔊', color: 'amarillo', image: img('bocina'),
  },

  // Energía (en Hogar y vida; la estación portátil en Electrónica)
  {
    id: 'planta-electrica-inverter-4500w', title: 'Planta eléctrica inverter 4,500 W silenciosa',
    description: 'Arranque eléctrico, bajo consumo y segura para equipos sensibles.',
    details: ['4,500 W pico / 3,700 W continuos', 'Arranque eléctrico', '58 dB', 'Ruedas incluidas'],
    price: 749, originalPrice: 899, category: 'hogar', condition: 'nuevo', sellerId: 'energia-boricua',
    daysAgo: 1, emoji: '⚡', color: 'amarillo', image: img('planta-electrica'), featured: true,
  },
  {
    id: 'estacion-energia-1000wh', title: 'Estación de energía portátil 1000 Wh',
    description: 'Batería de litio con salidas AC, USB-C y carga solar.',
    details: ['1000 Wh', '3 salidas AC', 'Carga con placa solar', 'Pantalla LCD'],
    price: 499, originalPrice: 599, category: 'tecnologia', condition: 'nuevo', sellerId: 'energia-boricua',
    daysAgo: 6, emoji: '🔋', color: 'verde', image: img('estacion-energia'),
  },
  {
    id: 'placa-solar-plegable-200w', title: 'Placa solar plegable 200 W',
    description: 'Liviana y portátil. Compatible con estaciones de energía.',
    details: ['200 W', 'Plegable en 4 paneles', 'Patas ajustables', 'Cable MC4 incluido'],
    price: 189, category: 'hogar', condition: 'nuevo', sellerId: 'energia-boricua',
    daysAgo: 12, emoji: '☀️', color: 'azul', image: img('placa-solar'),
  },

  // Hogar y vida
  {
    id: 'abanico-techo-control', title: 'Abanico de techo con luz LED y control',
    description: '52 pulgadas, 6 velocidades. Lo quité porque puse aire.',
    details: ['52 pulgadas', '6 velocidades', 'Luz LED', 'Control remoto'],
    price: 45, originalPrice: 60, category: 'hogar', condition: 'usado', sellerId: 'yari-pr',
    daysAgo: 4, emoji: '🌀', color: 'azul', image: img('abanico'), featured: true,
  },
  {
    id: 'greca-aluminio-6-tazas', title: 'Greca de aluminio para 6 tazas',
    description: 'El cafecito de siempre, como lo hacía abuela.',
    details: ['6 tazas', 'Aluminio', 'Estufa de gas o eléctrica'],
    price: 18.5, category: 'hogar', condition: 'nuevo', sellerId: 'casa-criolla',
    daysAgo: 7, emoji: '🫖', color: 'rojito', image: img('greca'),
  },
  {
    id: 'pilon-madera-capa', title: 'Pilón de madera para mofongo',
    description: 'Tallado a mano. Perfecto pa’ mofongo y ajo machacado.',
    details: ['Madera dura', 'Mazo incluido'],
    price: 32, category: 'hogar', condition: 'nuevo', sellerId: 'casa-criolla',
    daysAgo: 10, emoji: '🥘', color: 'amarillo', image: img('pilon'),
  },
  {
    id: 'sabanas-algodon-queen', title: 'Juego de sábanas de algodón Queen',
    description: 'Frescas para el calor. 4 piezas, 400 hilos. En su empaque.',
    details: ['Queen', '100% algodón', '4 piezas'],
    price: 35, category: 'hogar', condition: 'nuevo', sellerId: 'casa-criolla',
    daysAgo: 14, emoji: '🛏️', color: 'verde', image: img('sabanas'),
  },

  // Moda
  {
    id: 'camiseta-bandera-pr', title: 'Camiseta bandera de Puerto Rico',
    description: '100% algodón, estampado que no se despega con el lavado.',
    details: ['100% algodón', 'Tallas S a 2XL', 'Unisex'],
    price: 22, category: 'moda', condition: 'nuevo', sellerId: 'moda-787',
    daysAgo: 2, emoji: '👕', color: 'rojito', image: img('camiseta'),
  },
  {
    id: 'chancletas-playa-unisex', title: 'Chancletas de playa unisex',
    description: 'Suela antideslizante y secado rápido.',
    details: ['Tallas 6 a 12', 'Antideslizantes'],
    price: 15, category: 'moda', condition: 'nuevo', sellerId: 'moda-787',
    daysAgo: 9, emoji: '🩴', color: 'amarillo', image: img('chancletas'),
  },
  {
    id: 'gafas-sol-polarizadas', title: 'Gafas de sol polarizadas',
    description: 'Protección UV400 y estuche rígido incluido.',
    details: ['Polarizadas', 'UV400', 'Estuche'],
    price: 27, originalPrice: 35, category: 'moda', condition: 'nuevo', sellerId: 'moda-787',
    daysAgo: 5, emoji: '🕶️', color: 'azul', image: img('gafas'),
  },

  // Hecho en PR (Hogar y vida, marcadas local)
  {
    id: 'careta-vejigante-loiza', title: 'Careta de vejigante hecha en Loíza',
    description: 'Tallada en coco y pintada a mano. Pieza única.',
    details: ['Hecha a mano', 'Coco y pintura acrílica', 'Lista para colgar'],
    price: 65, category: 'hogar', condition: 'nuevo', sellerId: 'artesanias-mediania',
    daysAgo: 3, emoji: '🎭', local: true, color: 'rojito', image: img('vejigante'), featured: true,
  },
  {
    id: 'cuatro-puertorriqueno', title: 'Cuatro puertorriqueño artesanal',
    description: 'Hecho por luthier del país. Sonido brillante y afinado.',
    details: ['10 cuerdas', 'Madera del país', 'Estuche incluido'],
    price: 850, category: 'hogar', condition: 'nuevo', sellerId: 'artesanias-mediania',
    daysAgo: 11, emoji: '🎸', local: true, color: 'amarillo', image: img('cuatro'),
  },
  {
    id: 'coqui-ceramica', title: 'Coquí de cerámica pintado a mano',
    description: 'El cantito de la isla pa’ tu casa o tu oficina.',
    details: ['Cerámica', '10 cm de alto', 'Pintado a mano'],
    price: 24, category: 'hogar', condition: 'nuevo', sellerId: 'artesanias-mediania',
    daysAgo: 6, emoji: '🐸', local: true, color: 'verde', image: img('coqui'),
  },

  // Deportes y playa
  {
    id: 'cooler-ruedas-60', title: 'Cooler con ruedas de 60 cuartos',
    description: 'Mantiene el hielo hasta 5 días. Lo usé dos veces.',
    details: ['60 cuartos', 'Ruedas todo terreno', 'Portavasos'],
    price: 40, originalPrice: 55, category: 'playa', condition: 'usado', sellerId: 'josemiguel787',
    daysAgo: 2, emoji: '🧊', color: 'azul', image: img('cooler'), featured: true,
  },
  {
    id: 'tabla-surf-funboard', title: 'Tabla de surf funboard 7′2″',
    description: 'Usada, en buenas condiciones. Ideal para aprender en Rincón.',
    details: ['7′2″', 'Quillas incluidas', 'Leash incluido'],
    price: 380, category: 'playa', condition: 'usado', sellerId: 'playa-y-mas',
    daysAgo: 8, emoji: '🏄', color: 'verde', image: img('tabla-surf'),
  },
  {
    id: 'bicicleta-montana-29', title: 'Bicicleta de montaña aro 29',
    description: '21 cambios, frenos de disco y suspensión delantera.',
    details: ['Aro 29', '21 velocidades', 'Frenos de disco'],
    price: 220, originalPrice: 260, category: 'playa', condition: 'usado', sellerId: 'yari-pr',
    daysAgo: 5, emoji: '🚲', color: 'rojito', image: img('bicicleta'),
  },

  // Sabores de PR (Hogar y vida, marcadas local)
  {
    id: 'cafe-altura-yauco-1lb', title: 'Café de altura tostado de Yauco (1 lb)',
    description: 'Tueste medio, molido para greca. Entrego en el pueblo los sábados.',
    details: ['1 libra', 'Tueste medio', 'Molido para greca'],
    price: 14, category: 'hogar', condition: 'nuevo', sellerId: 'hacienda-cafetal',
    daysAgo: 1, emoji: '☕', local: true, color: 'verde', image: img('cafe'),
  },
  {
    id: 'sofrito-casero', title: 'Sofrito casero (pack de 4)',
    description: 'Ají dulce, recao y cilantrillo frescos. Congelado.',
    details: ['4 envases de 12 oz', 'Ingredientes del país'],
    price: 12, category: 'hogar', condition: 'nuevo', sellerId: 'hacienda-cafetal',
    daysAgo: 4, emoji: '🌿', local: true, color: 'verde', image: img('sofrito'),
  },
  {
    id: 'pique-botella-artesanal', title: 'Pique de botella artesanal',
    description: 'Ají caballero, vinagre y especias. Pica rico.',
    details: ['375 ml', 'Ají caballero'],
    price: 9.5, category: 'hogar', condition: 'nuevo', sellerId: 'hacienda-cafetal',
    daysAgo: 13, emoji: '🌶️', local: true, color: 'rojito', image: img('pique'),
  },

  // Venta de bienes raíces
  {
    id: 'casa-arecibo-venta', title: 'Casa 3 cuartos, 2 baños en Arecibo (dueño directo)', type: 'propiedad',
    description: 'Urbanización tranquila cerca del expreso. Techo sellado, cisterna y verjas. Título limpio, cualifica para FHA.',
    details: ['3 cuartos, 2 baños', 'Solar de 400 m²', 'Marquesina doble', 'Cisterna de 1,000 galones'],
    rental: { beds: 3, baths: 2, furnished: false },
    price: 145000, category: 'venta-bienes-raices', condition: 'usado', sellerId: 'josemiguel787',
    daysAgo: 3, emoji: '🏡', color: 'azul', image: img('casa-venta'), featured: true,
  },
  {
    id: 'apartamento-guaynabo-venta', title: 'Apartamento 2 cuartos con piscina en Guaynabo', type: 'propiedad',
    description: 'Piso alto con vista. Control de acceso, piscina y generador en áreas comunes. Mantenimiento $210 al mes.',
    details: ['2 cuartos, 2 baños', 'Piscina y gimnasio', 'Control de acceso', '2 estacionamientos'],
    rental: { beds: 2, baths: 2, furnished: false },
    price: 189000, originalPrice: 199000, category: 'venta-bienes-raices', condition: 'usado', sellerId: 'alquileres-isla', town: 'Guaynabo',
    daysAgo: 8, emoji: '🏢', color: 'verde', image: img('casa-venta'),
  },

  // Bebés y maternidad
  {
    id: 'coche-bebe-travel-system', title: 'Coche de bebé con car seat (travel system)',
    description: 'Lo usamos poco, sin manchas. Incluye la base del car seat para el carro.',
    details: ['Car seat con base', 'Se dobla con una mano', 'Canasta grande', 'Lavado y desinfectado'],
    price: 90, originalPrice: 120, category: 'bebes', condition: 'usado', sellerId: 'yari-pr',
    daysAgo: 2, emoji: '👶', color: 'amarillo', image: img('coche-bebe'), featured: true,
  },
  {
    id: 'ropa-bebe-lote', title: 'Lote de ropa de bebé 0–6 meses (40 piezas)',
    description: 'Mamelucos, medias y gorritos. Todo lavado. Para nena o nene.',
    details: ['40 piezas', 'Tallas 0–6 meses', 'Lavado'],
    price: 35, category: 'bebes', condition: 'usado', sellerId: 'josemiguel787',
    daysAgo: 5, emoji: '🍼', color: 'azul', image: img('mameluco'),
  },

  // Salud y belleza
  {
    id: 'secadora-pelo-profesional', title: 'Secadora de pelo profesional 1875 W',
    description: 'Nueva en caja. El “blower” que usan en los salones: seca rápido y deja el pelo sin frizz.',
    details: ['1875 W', 'Iónica', 'Boquilla y difusor', 'Garantía de 1 año'],
    price: 38, category: 'salud-belleza', condition: 'nuevo', sellerId: 'moda-787',
    daysAgo: 1, emoji: '💇', color: 'verde', image: img('secadora'),
  },
  {
    id: 'perfume-coco-playa', title: 'Perfume de coco y vainilla (100 ml)',
    description: 'Hecho en la isla en pequeños lotes. Huele a playa.',
    details: ['100 ml', 'Hecho en PR', 'Sellado'],
    price: 28, category: 'salud-belleza', condition: 'nuevo', sellerId: 'artesanias-mediania',
    daysAgo: 6, emoji: '🌺', local: true, color: 'amarillo', image: img('perfume'),
  },

  // Muebles
  {
    id: 'sofa-seccional-l', title: 'Sofá seccional en L',
    description: 'En buen estado, sin roturas. Se puede ver en Ponce. Necesitas pickup o guagua para llevártelo.',
    details: ['Tela lavable', '2.6 × 1.7 m', 'Chaise reversible'],
    price: 350, originalPrice: 420, category: 'muebles', condition: 'usado', sellerId: 'casa-criolla',
    daysAgo: 2, emoji: '🛋️', color: 'amarillo', image: img('sofa'),
  },
  {
    id: 'comoda-6-gavetas', title: 'Cómoda de 6 gavetas en madera',
    description: 'Madera sólida, gavetas corren bien. Ideal para el cuarto de los nenes.',
    details: ['6 gavetas', 'Madera sólida', '1.4 m de ancho'],
    price: 90, category: 'muebles', condition: 'usado', sellerId: 'josemiguel787',
    daysAgo: 4, emoji: '🗄️', color: 'verde', image: img('comoda'),
  },

  // Renta de artículos (precio por día)
  {
    id: 'brincolin-castillo-renta', title: 'Brincolín de castillo para fiestas',
    description: 'Para cumpleaños y actividades. Lo montamos y lo recogemos. Reserva con tiempo los fines de semana.',
    details: ['4 × 4 m', 'Montaje y soplador incluidos', 'Edades de 3 a 10', 'Entrega en el área este'],
    price: 120, category: 'renta-articulos', condition: 'usado', sellerId: 'fiestas-del-este',
    daysAgo: 1, emoji: '🎈', color: 'azul', image: img('brincolin'), featured: true,
  },
  {
    id: 'planta-electrica-renta', title: 'Planta eléctrica 7,500 W en renta',
    description: 'Para cuando se va la luz o para actividades. Se entrega con el tanque lleno.',
    details: ['7,500 W', 'Arranque eléctrico', 'Cables incluidos', 'Mínimo 2 días'],
    price: 65, category: 'renta-articulos', condition: 'usado', sellerId: 'energia-boricua',
    daysAgo: 3, emoji: '⚡', color: 'verde', image: img('planta-electrica'),
  },

  // ---- Vendidas y expiradas (solo salen en el perfil del vendedor) ----
  {
    id: 'honda-civic-2014', title: 'Honda Civic 2014', type: 'vehiculo', description: 'Vendido. Gracias por la confianza.',
    details: ['Automático'], vehicle: { year: 2014, make: 'Honda', model: 'Civic', miles: 96000, transmission: 'Automática' },
    price: 9800, category: 'vehiculos', condition: 'usado', sellerId: 'nando-autos', daysAgo: 30,
    emoji: '🚗', color: 'rojito', image: img('carro'), status: 'vendido',
  },
  {
    id: 'audifonos-gaming-microfono', title: 'Audífonos gaming con micrófono', description: 'Sonido 7.1 y luces RGB.',
    details: ['Micrófono desmontable'], price: 45, category: 'tecnologia', condition: 'usado', sellerId: 'tecnoisla',
    daysAgo: 21, emoji: '🎧', color: 'azul', image: img('audifonos'), status: 'vendido',
  },
  {
    id: 'celular-64gb-usado', title: 'Celular 64 GB usado', description: 'Funciona bien, pantalla con detalle.',
    details: ['64 GB'], price: 120, category: 'tecnologia', condition: 'usado', sellerId: 'tecnoisla',
    daysAgo: 45, emoji: '📱', color: 'rojito', image: img('celular'), status: 'expirado',
  },
  {
    id: 'placa-solar-100w', title: 'Placa solar 100 W', description: 'Rígida, ideal para techo o balcón.',
    details: ['100 W'], price: 95, category: 'hogar', condition: 'nuevo', sellerId: 'energia-boricua',
    daysAgo: 18, emoji: '☀️', color: 'verde', image: img('placa-solar'), status: 'vendido',
  },
  {
    id: 'greca-3-tazas', title: 'Greca de 3 tazas', description: 'Para el cafecito de uno.',
    details: ['3 tazas'], price: 14, category: 'hogar', condition: 'nuevo', sellerId: 'casa-criolla',
    daysAgo: 25, emoji: '🫖', color: 'azul', image: img('greca'), status: 'vendido',
  },
  {
    id: 'careta-vejigante-mediana', title: 'Careta de vejigante mediana', description: 'Pintada a mano en Loíza.',
    details: ['Coco'], price: 45, category: 'hogar', condition: 'nuevo', sellerId: 'artesanias-mediania',
    daysAgo: 16, emoji: '🎭', local: true, color: 'azul', image: img('vejigante'), status: 'vendido',
  },
  {
    id: 'coqui-ceramica-set-3', title: 'Coquís de cerámica (set de 3)', description: 'Tres tamaños, pintados a mano.',
    details: ['Set de 3'], price: 60, category: 'hogar', condition: 'nuevo', sellerId: 'artesanias-mediania',
    daysAgo: 40, emoji: '🐸', local: true, color: 'amarillo', image: img('coqui'), status: 'expirado',
  },
  {
    id: 'mesa-comedor-gratis', title: 'Mesa de comedor (gratis)', description: 'Ya se la llevaron.',
    details: ['4 sillas'], price: 0, category: 'donaciones', condition: 'usado', sellerId: 'yari-pr',
    daysAgo: 20, emoji: '🪑', color: 'verde', image: img('sofa-gratis'), status: 'vendido',
  },
  {
    id: 'cafe-altura-2lb', title: 'Café de altura de Yauco (2 lb)', description: 'Tueste oscuro, en grano.',
    details: ['2 libras'], price: 26, category: 'hogar', condition: 'nuevo', sellerId: 'hacienda-cafetal',
    daysAgo: 22, emoji: '☕', local: true, color: 'amarillo', image: img('cafe'), status: 'vendido',
  },
];

export const sampleReviews = [
  { name: 'Yamaris', town: 'Carolina', stars: 5, text: 'Muy responsable, llegó a la hora acordada y todo como en la foto. ¡Wepa!' },
  { name: 'José L.', town: 'Arecibo', stars: 5, text: 'Contestó enseguida por el chat y nos vimos en un lugar seguro.' },
  { name: 'Keila', town: 'Humacao', stars: 4, text: 'Buen trato. Llegó un poquito tarde pero avisó.' },
  { name: 'Ramón', town: 'Guaynabo', stars: 5, text: 'Lo recogí en persona, todo bien. Lo recomiendo.' },
  { name: 'Natalia', town: 'Cayey', stars: 4, text: 'Buen precio y aceptó ATH Móvil al momento de la entrega.' },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getSeller = (id: string) => sellers.find((s) => s.id === id);
export const statusOf = (p: Product): ListingStatus => p.status ?? 'activo';
/** Pueblo donde está la publicación. */
export const townOf = (p: Product) => p.town ?? getSeller(p.sellerId)?.town ?? 'San Juan';
/** Solo publicaciones activas: lo que se muestra en portada, búsqueda y categorías. */
export const activeProducts = products.filter((p) => statusOf(p) === 'activo');
export const productsBySeller = (sellerId: string) => products.filter((p) => p.sellerId === sellerId);
