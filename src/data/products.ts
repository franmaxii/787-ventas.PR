import type { Swatch } from './categories';

/*
 * Catálogo de ejemplo. Cuando conectes una base de datos o API,
 * reemplaza estos arreglos manteniendo las mismas interfaces.
 */

export interface Seller {
  id: string;
  name: string;
  town: string;
  sales: number;
  rating: number;
  star: boolean; // "Vendedor Estrella 787"
  since: number;
  /** Nombre de usuario público (se muestra en mayúsculas en el perfil). */
  username: string;
  followers: number;
}

export type ListingStatus = 'activo' | 'vendido' | 'expirado';

export interface Question {
  q: string;
  a?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  details: string[];
  price: number;
  originalPrice?: number;
  category: string;
  condition: 'nuevo' | 'usado';
  /** Costo de envío en USD. 0 = envío gratis. */
  shipping: number;
  pickup: boolean;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  sellerId: string;
  emoji: string;
  color: Swatch;
  /** Foto o ilustración en `public/`. Reemplaza el SVG por una foto real cuando la tengas. */
  image?: string;
  featured?: boolean;
  /** Estado de la publicación. Por defecto 'activo'. Solo las activas salen en el catálogo. */
  status?: ListingStatus;
  questions?: Question[];
}

export const sellers: Seller[] = [
  { id: 'tecnoisla', name: 'TecnoIsla', town: 'Bayamón', sales: 1520, rating: 4.8, star: true, since: 2019, username: 'TECNOISLA', followers: 1284 },
  { id: 'energia-boricua', name: 'Energía Boricua', town: 'Caguas', sales: 870, rating: 4.9, star: true, since: 2018, username: 'ENERGIABORICUA', followers: 2310 },
  { id: 'casa-criolla', name: 'Casa Criolla', town: 'Ponce', sales: 430, rating: 4.6, star: false, since: 2021, username: 'CASACRIOLLA', followers: 415 },
  { id: 'artesanias-mediania', name: 'Artesanías Medianía', town: 'Loíza', sales: 210, rating: 5, star: true, since: 2020, username: 'ARTESANIASLOIZA', followers: 3120 },
  { id: 'playa-y-mas', name: 'Playa y Más', town: 'Rincón', sales: 640, rating: 4.7, star: false, since: 2020, username: 'PLAYAYMAS', followers: 760 },
  { id: 'gomera-del-oeste', name: 'Gomera del Oeste', town: 'Mayagüez', sales: 980, rating: 4.7, star: true, since: 2017, username: 'GOMERADELOESTE', followers: 538 },
  { id: 'hacienda-cafetal', name: 'Hacienda Cafetal', town: 'Yauco', sales: 1210, rating: 4.9, star: true, since: 2016, username: 'HACIENDACAFETAL', followers: 4870 },
  { id: 'moda-787', name: 'Moda 787', town: 'San Juan', sales: 300, rating: 4.5, star: false, since: 2022, username: 'MODA787', followers: 990 },
];

export const products: Product[] = [
  // Tecnología
  {
    id: 'audifonos-cancelacion-ruido',
    title: 'Audífonos inalámbricos con cancelación de ruido',
    description: 'Hasta 40 horas de batería, carga rápida y sonido envolvente.',
    details: ['Bluetooth 5.3', 'Batería de 40 h', 'Cancelación activa de ruido', 'Estuche incluido'],
    price: 59.99, originalPrice: 89.99, category: 'tecnologia', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 25, sold: 312, rating: 4.6, reviews: 128,
    sellerId: 'tecnoisla', emoji: '🎧', color: 'azul', image: '/img/productos/audifonos.svg', featured: true,
    questions: [
      { q: '¿Funcionan con Android y iPhone?', a: '¡Sí! Funcionan con cualquier equipo con Bluetooth.' },
      { q: '¿Tienen garantía?', a: 'Garantía de 6 meses con nosotros en Bayamón.' },
    ],
  },
  {
    id: 'celular-128gb-reacondicionado',
    title: 'Celular 128 GB reacondicionado y desbloqueado',
    description: 'Probado y certificado. Funciona con todas las compañías de la isla.',
    details: ['128 GB de almacenamiento', 'Desbloqueado', 'Batería al 90%+', 'Cargador incluido'],
    price: 219, originalPrice: 279, category: 'tecnologia', condition: 'usado',
    shipping: 0, pickup: true, stock: 6, sold: 87, rating: 4.4, reviews: 41,
    sellerId: 'tecnoisla', emoji: '📱', color: 'rojito', image: '/img/productos/celular.svg', featured: true,
  },
  {
    id: 'bocina-bluetooth-agua',
    title: 'Bocina Bluetooth a prueba de agua',
    description: 'Ideal pa’ la playa o el río. Resiste salpicones y arena.',
    details: ['Resistencia IP67', '12 h de batería', 'Flota en el agua', 'Correa para colgar'],
    price: 34.99, category: 'tecnologia', condition: 'nuevo',
    shipping: 4.99, pickup: true, stock: 40, sold: 205, rating: 4.5, reviews: 77,
    sellerId: 'tecnoisla', emoji: '🔊', color: 'amarillo', image: '/img/productos/bocina.svg',
  },

  // Energía
  {
    id: 'planta-electrica-inverter-4500w',
    title: 'Planta eléctrica inverter 4,500 W silenciosa',
    description: 'Arranque eléctrico, bajo consumo y segura para equipos sensibles.',
    details: ['4,500 W pico / 3,700 W continuos', 'Arranque eléctrico y manual', '58 dB de ruido', 'Ruedas incluidas'],
    price: 749, originalPrice: 899, category: 'energia', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 8, sold: 154, rating: 4.8, reviews: 96,
    sellerId: 'energia-boricua', emoji: '⚡', color: 'amarillo', image: '/img/productos/planta-electrica.svg', featured: true,
    questions: [
      { q: '¿Corre con gasolina o gas?', a: 'Es dual: gasolina y gas propano.' },
      { q: '¿Aguanta una nevera y un abanico?', a: 'Sin problema, y te sobra para cargar los celulares.' },
    ],
  },
  {
    id: 'estacion-energia-1000wh',
    title: 'Estación de energía portátil 1000 Wh',
    description: 'Batería de litio con salidas AC, USB-C y carga solar.',
    details: ['1000 Wh de capacidad', '3 salidas AC', 'Carga con placa solar', 'Pantalla LCD'],
    price: 499, originalPrice: 599, category: 'energia', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 12, sold: 98, rating: 4.7, reviews: 52,
    sellerId: 'energia-boricua', emoji: '🔋', color: 'verde', image: '/img/productos/estacion-energia.svg', featured: true,
  },
  {
    id: 'placa-solar-plegable-200w',
    title: 'Placa solar plegable 200 W',
    description: 'Liviana y portátil. Compatible con estaciones de energía.',
    details: ['200 W', 'Plegable en 4 paneles', 'Patas ajustables', 'Cable MC4 incluido'],
    price: 189, category: 'energia', condition: 'nuevo',
    shipping: 9.99, pickup: true, stock: 15, sold: 61, rating: 4.6, reviews: 29,
    sellerId: 'energia-boricua', emoji: '☀️', color: 'azul', image: '/img/productos/placa-solar.svg',
  },

  // Hogar
  {
    id: 'abanico-techo-control',
    title: 'Abanico de techo con luz LED y control remoto',
    description: '52 pulgadas, 6 velocidades y modo reversa para todo el año.',
    details: ['52 pulgadas', '6 velocidades', 'Luz LED regulable', 'Control remoto'],
    price: 79, originalPrice: 99, category: 'hogar', condition: 'nuevo',
    shipping: 0, pickup: false, stock: 20, sold: 143, rating: 4.5, reviews: 64,
    sellerId: 'casa-criolla', emoji: '🌀', color: 'azul', image: '/img/productos/abanico.svg', featured: true,
  },
  {
    id: 'greca-aluminio-6-tazas',
    title: 'Greca de aluminio para 6 tazas',
    description: 'El cafecito de siempre, como lo hacía abuela.',
    details: ['6 tazas', 'Aluminio', 'Apta para estufa de gas y eléctrica'],
    price: 18.5, category: 'hogar', condition: 'nuevo',
    shipping: 3.99, pickup: true, stock: 60, sold: 520, rating: 4.9, reviews: 233,
    sellerId: 'casa-criolla', emoji: '🫖', color: 'rojito', image: '/img/productos/greca.svg',
  },
  {
    id: 'pilon-madera-capa',
    title: 'Pilón de madera para mofongo',
    description: 'Tallado a mano. Perfecto pa’ mofongo y ajo machacado.',
    details: ['Madera dura', 'Mazo incluido', 'Acabado natural'],
    price: 32, category: 'hogar', condition: 'nuevo',
    shipping: 5.99, pickup: true, stock: 14, sold: 88, rating: 4.8, reviews: 40,
    sellerId: 'casa-criolla', emoji: '🥘', color: 'amarillo', image: '/img/productos/pilon.svg',
  },
  {
    id: 'sabanas-algodon-queen',
    title: 'Juego de sábanas de algodón Queen',
    description: 'Frescas para el calor. 4 piezas, 400 hilos.',
    details: ['Tamaño Queen', '100% algodón', '4 piezas', '400 hilos'],
    price: 39, originalPrice: 49, category: 'hogar', condition: 'nuevo',
    shipping: 0, pickup: false, stock: 30, sold: 77, rating: 4.4, reviews: 22,
    sellerId: 'casa-criolla', emoji: '🛏️', color: 'verde', image: '/img/productos/sabanas.svg',
  },

  // Moda
  {
    id: 'camiseta-bandera-pr',
    title: 'Camiseta bandera de Puerto Rico',
    description: '100% algodón, estampado que no se despega con el lavado.',
    details: ['100% algodón', 'Tallas S a 2XL', 'Unisex'],
    price: 22, category: 'moda', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 80, sold: 410, rating: 4.7, reviews: 150,
    sellerId: 'moda-787', emoji: '👕', color: 'rojito', image: '/img/productos/camiseta.svg', featured: true,
  },
  {
    id: 'chancletas-playa-unisex',
    title: 'Chancletas de playa unisex',
    description: 'Suela antideslizante y secado rápido.',
    details: ['Tallas 6 a 12', 'Antideslizantes', 'Varios colores'],
    price: 15.99, category: 'moda', condition: 'nuevo',
    shipping: 2.99, pickup: true, stock: 100, sold: 640, rating: 4.3, reviews: 98,
    sellerId: 'moda-787', emoji: '🩴', color: 'amarillo', image: '/img/productos/chancletas.svg',
  },
  {
    id: 'gafas-sol-polarizadas',
    title: 'Gafas de sol polarizadas',
    description: 'Protección UV400 y estuche rígido incluido.',
    details: ['Lentes polarizados', 'UV400', 'Estuche rígido'],
    price: 27, originalPrice: 35, category: 'moda', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 35, sold: 133, rating: 4.5, reviews: 47,
    sellerId: 'moda-787', emoji: '🕶️', color: 'azul', image: '/img/productos/gafas.svg',
  },

  // Hecho en PR
  {
    id: 'careta-vejigante-loiza',
    title: 'Careta de vejigante hecha en Loíza',
    description: 'Tallada en coco y pintada a mano. Pieza única.',
    details: ['Hecha a mano', 'Coco y pintura acrílica', 'Lista para colgar', 'Pieza única'],
    price: 65, category: 'hecho-en-pr', condition: 'nuevo',
    shipping: 6.99, pickup: true, stock: 4, sold: 39, rating: 5, reviews: 21,
    sellerId: 'artesanias-mediania', emoji: '🎭', color: 'rojito', image: '/img/productos/vejigante.svg', featured: true,
    questions: [{ q: '¿Hacen envíos fuera de la isla?', a: 'Sí, a EE. UU. con costo adicional. Escríbenos.' }],
  },
  {
    id: 'cuatro-puertorriqueno',
    title: 'Cuatro puertorriqueño artesanal',
    description: 'Hecho por luthier del país. Sonido brillante y afinado.',
    details: ['10 cuerdas', 'Madera del país', 'Estuche incluido', 'Hecho a mano'],
    price: 850, category: 'hecho-en-pr', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 2, sold: 11, rating: 5, reviews: 8,
    sellerId: 'artesanias-mediania', emoji: '🎸', color: 'amarillo', image: '/img/productos/cuatro.svg',
  },
  {
    id: 'coqui-ceramica',
    title: 'Coquí de cerámica pintado a mano',
    description: 'El cantito de la isla pa’ tu casa o tu oficina.',
    details: ['Cerámica', '10 cm de alto', 'Pintado a mano'],
    price: 24, category: 'hecho-en-pr', condition: 'nuevo',
    shipping: 3.99, pickup: true, stock: 18, sold: 156, rating: 4.9, reviews: 60,
    sellerId: 'artesanias-mediania', emoji: '🐸', color: 'verde', image: '/img/productos/coqui.svg',
  },

  // Deportes y playa
  {
    id: 'cooler-ruedas-60',
    title: 'Cooler con ruedas de 60 cuartos',
    description: 'Mantiene el hielo hasta 5 días. Con portavasos.',
    details: ['60 cuartos', 'Hielo hasta 5 días', 'Ruedas todo terreno', 'Portavasos'],
    price: 54.99, originalPrice: 69.99, category: 'playa', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 22, sold: 189, rating: 4.6, reviews: 71,
    sellerId: 'playa-y-mas', emoji: '🧊', color: 'azul', image: '/img/productos/cooler.svg', featured: true,
  },
  {
    id: 'tabla-surf-funboard',
    title: 'Tabla de surf funboard 7′2″',
    description: 'Usada, en buenas condiciones. Ideal para aprender en Rincón.',
    details: ['7′2″', 'Quillas incluidas', 'Leash incluido', 'Pequeñas reparaciones'],
    price: 380, category: 'playa', condition: 'usado',
    shipping: 0, pickup: true, stock: 1, sold: 3, rating: 4.7, reviews: 3,
    sellerId: 'playa-y-mas', emoji: '🏄', color: 'verde', image: '/img/productos/tabla-surf.svg',
  },
  {
    id: 'bicicleta-montana-29',
    title: 'Bicicleta de montaña aro 29',
    description: '21 cambios, frenos de disco y suspensión delantera.',
    details: ['Aro 29', '21 velocidades', 'Frenos de disco', 'Cuadro de aluminio'],
    price: 289, originalPrice: 340, category: 'playa', condition: 'nuevo',
    shipping: 14.99, pickup: true, stock: 7, sold: 45, rating: 4.5, reviews: 19,
    sellerId: 'playa-y-mas', emoji: '🚲', color: 'rojito', image: '/img/productos/bicicleta.svg',
  },

  // Vehículos
  {
    id: 'gomas-all-terrain-265-70r17',
    title: 'Juego de 4 gomas all-terrain 265/70R17',
    description: 'Incluye montura y balanceo en Mayagüez.',
    details: ['265/70R17', 'All-terrain', 'Montura y balanceo incluidos', 'Garantía de 50,000 millas'],
    price: 560, originalPrice: 640, category: 'vehiculos', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 10, sold: 72, rating: 4.7, reviews: 33,
    sellerId: 'gomera-del-oeste', emoji: '🚙', color: 'amarillo', image: '/img/productos/gomas.svg',
  },
  {
    id: 'camara-reversa-pantalla',
    title: 'Cámara de reversa con pantalla de 5″',
    description: 'Visión nocturna y líneas guía. Fácil de instalar.',
    details: ['Pantalla de 5″', 'Visión nocturna', 'Líneas guía', 'Resistente al agua'],
    price: 45, category: 'vehiculos', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 26, sold: 120, rating: 4.3, reviews: 44,
    sellerId: 'gomera-del-oeste', emoji: '🚗', color: 'azul', image: '/img/productos/camara-reversa.svg',
  },
  {
    id: 'scooter-electrico-plegable',
    title: 'Scooter eléctrico plegable',
    description: 'Hasta 25 km de autonomía. Perfecto pa’l Viejo San Juan.',
    details: ['25 km de autonomía', 'Velocidad máx. 25 km/h', 'Plegable', 'Luz delantera'],
    price: 349, originalPrice: 399, category: 'vehiculos', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 9, sold: 58, rating: 4.4, reviews: 26,
    sellerId: 'gomera-del-oeste', emoji: '🛴', color: 'verde', image: '/img/productos/scooter.svg', featured: true,
  },

  // Sabores de PR
  {
    id: 'cafe-altura-yauco-1lb',
    title: 'Café de altura tostado de Yauco (1 lb)',
    description: 'Tueste medio, molido para greca. Cosecha de la montaña.',
    details: ['1 libra', 'Tueste medio', 'Molido para greca', 'Cosecha local'],
    price: 14, category: 'sabores', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 200, sold: 1840, rating: 4.9, reviews: 612,
    sellerId: 'hacienda-cafetal', emoji: '☕', color: 'verde', image: '/img/productos/cafe.svg', featured: true,
    questions: [{ q: '¿Lo tienen en grano?', a: 'Sí, déjanos una nota en la compra y te lo enviamos en grano.' }],
  },
  {
    id: 'sofrito-casero',
    title: 'Sofrito casero (pack de 4)',
    description: 'Ají dulce, recao y cilantrillo frescos. Congelado.',
    details: ['4 envases de 12 oz', 'Ingredientes del país', 'Congelado'],
    price: 12, category: 'sabores', condition: 'nuevo',
    shipping: 4.99, pickup: true, stock: 50, sold: 390, rating: 4.8, reviews: 140,
    sellerId: 'hacienda-cafetal', emoji: '🌿', color: 'verde', image: '/img/productos/sofrito.svg',
  },
  {
    id: 'pique-botella-artesanal',
    title: 'Pique de botella artesanal',
    description: 'Ají caballero, vinagre y especias. Pica rico.',
    details: ['375 ml', 'Ají caballero', 'Hecho en Yauco'],
    price: 9.5, category: 'sabores', condition: 'nuevo',
    shipping: 3.99, pickup: true, stock: 70, sold: 455, rating: 4.7, reviews: 118,
    sellerId: 'hacienda-cafetal', emoji: '🌶️', color: 'rojito', image: '/img/productos/pique.svg',
  },
  // ---- Publicaciones vendidas y expiradas (solo salen en el perfil del vendedor) ----
  {
    id: 'audifonos-gaming-microfono', title: 'Audífonos gaming con micrófono', description: 'Sonido 7.1 y luces RGB.',
    details: ['Micrófono desmontable', 'Cable USB'], price: 45, category: 'tecnologia', condition: 'usado',
    shipping: 0, pickup: true, stock: 0, sold: 1, rating: 4.5, reviews: 2, sellerId: 'tecnoisla',
    emoji: '🎧', color: 'azul', image: '/img/productos/audifonos.svg', status: 'vendido',
  },
  {
    id: 'celular-64gb-usado', title: 'Celular 64 GB usado', description: 'Funciona bien, pantalla con detalle.',
    details: ['64 GB', 'Desbloqueado'], price: 120, category: 'tecnologia', condition: 'usado',
    shipping: 0, pickup: true, stock: 1, sold: 0, rating: 0, reviews: 0, sellerId: 'tecnoisla',
    emoji: '📱', color: 'rojito', image: '/img/productos/celular.svg', status: 'expirado',
  },
  {
    id: 'placa-solar-100w', title: 'Placa solar 100 W', description: 'Rígida, ideal para techo o balcón.',
    details: ['100 W', 'Marco de aluminio'], price: 95, category: 'energia', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 0, sold: 1, rating: 5, reviews: 1, sellerId: 'energia-boricua',
    emoji: '☀️', color: 'verde', image: '/img/productos/placa-solar.svg', status: 'vendido',
  },
  {
    id: 'greca-3-tazas', title: 'Greca de 3 tazas', description: 'Para el cafecito de uno.',
    details: ['3 tazas', 'Aluminio'], price: 14, category: 'hogar', condition: 'nuevo',
    shipping: 3.99, pickup: true, stock: 0, sold: 1, rating: 5, reviews: 1, sellerId: 'casa-criolla',
    emoji: '🫖', color: 'azul', image: '/img/productos/greca.svg', status: 'vendido',
  },
  {
    id: 'careta-vejigante-mediana', title: 'Careta de vejigante mediana', description: 'Pintada a mano en Loíza.',
    details: ['Coco', 'Pintura acrílica'], price: 45, category: 'hecho-en-pr', condition: 'nuevo',
    shipping: 6.99, pickup: true, stock: 0, sold: 1, rating: 5, reviews: 1, sellerId: 'artesanias-mediania',
    emoji: '🎭', color: 'azul', image: '/img/productos/vejigante.svg', status: 'vendido',
  },
  {
    id: 'coqui-ceramica-set-3', title: 'Coquís de cerámica (set de 3)', description: 'Tres tamaños, pintados a mano.',
    details: ['Cerámica', 'Set de 3'], price: 60, category: 'hecho-en-pr', condition: 'nuevo',
    shipping: 3.99, pickup: true, stock: 1, sold: 0, rating: 0, reviews: 0, sellerId: 'artesanias-mediania',
    emoji: '🐸', color: 'amarillo', image: '/img/productos/coqui.svg', status: 'expirado',
  },
  {
    id: 'tabla-surf-shortboard', title: 'Tabla de surf shortboard 6′', description: 'Para olas de Rincón.',
    details: ['6′', 'Quillas FCS'], price: 290, category: 'playa', condition: 'usado',
    shipping: 0, pickup: true, stock: 0, sold: 1, rating: 5, reviews: 1, sellerId: 'playa-y-mas',
    emoji: '🏄', color: 'azul', image: '/img/productos/tabla-surf.svg', status: 'vendido',
  },
  {
    id: 'gafas-sol-clasicas', title: 'Gafas de sol clásicas', description: 'Marco negro, lentes UV400.',
    details: ['UV400'], price: 18, category: 'moda', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 1, sold: 0, rating: 0, reviews: 0, sellerId: 'moda-787',
    emoji: '🕶️', color: 'rojito', image: '/img/productos/gafas.svg', status: 'expirado',
  },
  {
    id: 'gomas-225-65r17-par', title: 'Par de gomas 225/65R17', description: 'Con 80% de vida útil.',
    details: ['225/65R17', 'Par'], price: 180, category: 'vehiculos', condition: 'usado',
    shipping: 0, pickup: true, stock: 0, sold: 1, rating: 4.5, reviews: 1, sellerId: 'gomera-del-oeste',
    emoji: '🚙', color: 'azul', image: '/img/productos/gomas.svg', status: 'vendido',
  },
  {
    id: 'cafe-altura-2lb', title: 'Café de altura de Yauco (2 lb)', description: 'Tueste oscuro, en grano.',
    details: ['2 libras', 'En grano'], price: 26, category: 'sabores', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 0, sold: 1, rating: 5, reviews: 1, sellerId: 'hacienda-cafetal',
    emoji: '☕', color: 'amarillo', image: '/img/productos/cafe.svg', status: 'vendido',
  },
];

export const statusOf = (p: Product): ListingStatus => p.status ?? 'activo';
/** Solo publicaciones activas: lo que se muestra en portada, búsqueda y categorías. */
export const activeProducts = products.filter((p) => statusOf(p) === 'activo');
export const productsBySeller = (sellerId: string) => products.filter((p) => p.sellerId === sellerId);

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getSeller = (id: string) => sellers.find((s) => s.id === id);

export const sampleReviews = [
  { name: 'Yamaris', town: 'Carolina', stars: 5, text: 'Llegó rapidísimo y tal como en la foto. ¡Wepa!' },
  { name: 'José L.', town: 'Arecibo', stars: 5, text: 'Excelente calidad. El vendedor contestó todo enseguida.' },
  { name: 'Keila', town: 'Humacao', stars: 4, text: 'Muy bueno, solo tardó un día más de lo esperado.' },
  { name: 'Ramón', town: 'Guaynabo', stars: 5, text: 'Lo recogí en persona, todo bien. Lo recomiendo.' },
  { name: 'Natalia', town: 'Cayey', stars: 4, text: 'Buen precio para lo que es. Volvería a comprar.' },
];
