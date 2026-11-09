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
}

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
  /** Ruta a una foto real en `public/` (opcional). Si no hay, se usa el emoji. */
  image?: string;
  featured?: boolean;
  questions?: Question[];
}

export const sellers: Seller[] = [
  { id: 'tecnoisla', name: 'TecnoIsla', town: 'Bayamón', sales: 1520, rating: 4.8, star: true, since: 2019 },
  { id: 'energia-boricua', name: 'Energía Boricua', town: 'Caguas', sales: 870, rating: 4.9, star: true, since: 2018 },
  { id: 'casa-criolla', name: 'Casa Criolla', town: 'Ponce', sales: 430, rating: 4.6, star: false, since: 2021 },
  { id: 'artesanias-mediania', name: 'Artesanías Medianía', town: 'Loíza', sales: 210, rating: 5, star: true, since: 2020 },
  { id: 'playa-y-mas', name: 'Playa y Más', town: 'Rincón', sales: 640, rating: 4.7, star: false, since: 2020 },
  { id: 'gomera-del-oeste', name: 'Gomera del Oeste', town: 'Mayagüez', sales: 980, rating: 4.7, star: true, since: 2017 },
  { id: 'hacienda-cafetal', name: 'Hacienda Cafetal', town: 'Yauco', sales: 1210, rating: 4.9, star: true, since: 2016 },
  { id: 'moda-787', name: 'Moda 787', town: 'San Juan', sales: 300, rating: 4.5, star: false, since: 2022 },
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
    sellerId: 'tecnoisla', emoji: '🎧', color: 'azul', featured: true,
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
    sellerId: 'tecnoisla', emoji: '📱', color: 'rojito', featured: true,
  },
  {
    id: 'bocina-bluetooth-agua',
    title: 'Bocina Bluetooth a prueba de agua',
    description: 'Ideal pa’ la playa o el río. Resiste salpicones y arena.',
    details: ['Resistencia IP67', '12 h de batería', 'Flota en el agua', 'Correa para colgar'],
    price: 34.99, category: 'tecnologia', condition: 'nuevo',
    shipping: 4.99, pickup: true, stock: 40, sold: 205, rating: 4.5, reviews: 77,
    sellerId: 'tecnoisla', emoji: '🔊', color: 'amarillo',
  },

  // Energía
  {
    id: 'planta-electrica-inverter-4500w',
    title: 'Planta eléctrica inverter 4,500 W silenciosa',
    description: 'Arranque eléctrico, bajo consumo y segura para equipos sensibles.',
    details: ['4,500 W pico / 3,700 W continuos', 'Arranque eléctrico y manual', '58 dB de ruido', 'Ruedas incluidas'],
    price: 749, originalPrice: 899, category: 'energia', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 8, sold: 154, rating: 4.8, reviews: 96,
    sellerId: 'energia-boricua', emoji: '⚡', color: 'amarillo', featured: true,
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
    sellerId: 'energia-boricua', emoji: '🔋', color: 'verde', featured: true,
  },
  {
    id: 'placa-solar-plegable-200w',
    title: 'Placa solar plegable 200 W',
    description: 'Liviana y portátil. Compatible con estaciones de energía.',
    details: ['200 W', 'Plegable en 4 paneles', 'Patas ajustables', 'Cable MC4 incluido'],
    price: 189, category: 'energia', condition: 'nuevo',
    shipping: 9.99, pickup: true, stock: 15, sold: 61, rating: 4.6, reviews: 29,
    sellerId: 'energia-boricua', emoji: '☀️', color: 'azul',
  },

  // Hogar
  {
    id: 'abanico-techo-control',
    title: 'Abanico de techo con luz LED y control remoto',
    description: '52 pulgadas, 6 velocidades y modo reversa para todo el año.',
    details: ['52 pulgadas', '6 velocidades', 'Luz LED regulable', 'Control remoto'],
    price: 79, originalPrice: 99, category: 'hogar', condition: 'nuevo',
    shipping: 0, pickup: false, stock: 20, sold: 143, rating: 4.5, reviews: 64,
    sellerId: 'casa-criolla', emoji: '🌀', color: 'azul', featured: true,
  },
  {
    id: 'greca-aluminio-6-tazas',
    title: 'Greca de aluminio para 6 tazas',
    description: 'El cafecito de siempre, como lo hacía abuela.',
    details: ['6 tazas', 'Aluminio', 'Apta para estufa de gas y eléctrica'],
    price: 18.5, category: 'hogar', condition: 'nuevo',
    shipping: 3.99, pickup: true, stock: 60, sold: 520, rating: 4.9, reviews: 233,
    sellerId: 'casa-criolla', emoji: '🫖', color: 'rojito',
  },
  {
    id: 'pilon-madera-capa',
    title: 'Pilón de madera para mofongo',
    description: 'Tallado a mano. Perfecto pa’ mofongo y ajo machacado.',
    details: ['Madera dura', 'Mazo incluido', 'Acabado natural'],
    price: 32, category: 'hogar', condition: 'nuevo',
    shipping: 5.99, pickup: true, stock: 14, sold: 88, rating: 4.8, reviews: 40,
    sellerId: 'casa-criolla', emoji: '🥘', color: 'amarillo',
  },
  {
    id: 'sabanas-algodon-queen',
    title: 'Juego de sábanas de algodón Queen',
    description: 'Frescas para el calor. 4 piezas, 400 hilos.',
    details: ['Tamaño Queen', '100% algodón', '4 piezas', '400 hilos'],
    price: 39, originalPrice: 49, category: 'hogar', condition: 'nuevo',
    shipping: 0, pickup: false, stock: 30, sold: 77, rating: 4.4, reviews: 22,
    sellerId: 'casa-criolla', emoji: '🛏️', color: 'verde',
  },

  // Moda
  {
    id: 'camiseta-bandera-pr',
    title: 'Camiseta bandera de Puerto Rico',
    description: '100% algodón, estampado que no se despega con el lavado.',
    details: ['100% algodón', 'Tallas S a 2XL', 'Unisex'],
    price: 22, category: 'moda', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 80, sold: 410, rating: 4.7, reviews: 150,
    sellerId: 'moda-787', emoji: '👕', color: 'rojito', featured: true,
  },
  {
    id: 'chancletas-playa-unisex',
    title: 'Chancletas de playa unisex',
    description: 'Suela antideslizante y secado rápido.',
    details: ['Tallas 6 a 12', 'Antideslizantes', 'Varios colores'],
    price: 15.99, category: 'moda', condition: 'nuevo',
    shipping: 2.99, pickup: true, stock: 100, sold: 640, rating: 4.3, reviews: 98,
    sellerId: 'moda-787', emoji: '🩴', color: 'amarillo',
  },
  {
    id: 'gafas-sol-polarizadas',
    title: 'Gafas de sol polarizadas',
    description: 'Protección UV400 y estuche rígido incluido.',
    details: ['Lentes polarizados', 'UV400', 'Estuche rígido'],
    price: 27, originalPrice: 35, category: 'moda', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 35, sold: 133, rating: 4.5, reviews: 47,
    sellerId: 'moda-787', emoji: '🕶️', color: 'azul',
  },

  // Hecho en PR
  {
    id: 'careta-vejigante-loiza',
    title: 'Careta de vejigante hecha en Loíza',
    description: 'Tallada en coco y pintada a mano. Pieza única.',
    details: ['Hecha a mano', 'Coco y pintura acrílica', 'Lista para colgar', 'Pieza única'],
    price: 65, category: 'hecho-en-pr', condition: 'nuevo',
    shipping: 6.99, pickup: true, stock: 4, sold: 39, rating: 5, reviews: 21,
    sellerId: 'artesanias-mediania', emoji: '🎭', color: 'rojito', featured: true,
    questions: [{ q: '¿Hacen envíos fuera de la isla?', a: 'Sí, a EE. UU. con costo adicional. Escríbenos.' }],
  },
  {
    id: 'cuatro-puertorriqueno',
    title: 'Cuatro puertorriqueño artesanal',
    description: 'Hecho por luthier del país. Sonido brillante y afinado.',
    details: ['10 cuerdas', 'Madera del país', 'Estuche incluido', 'Hecho a mano'],
    price: 850, category: 'hecho-en-pr', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 2, sold: 11, rating: 5, reviews: 8,
    sellerId: 'artesanias-mediania', emoji: '🎸', color: 'amarillo',
  },
  {
    id: 'coqui-ceramica',
    title: 'Coquí de cerámica pintado a mano',
    description: 'El cantito de la isla pa’ tu casa o tu oficina.',
    details: ['Cerámica', '10 cm de alto', 'Pintado a mano'],
    price: 24, category: 'hecho-en-pr', condition: 'nuevo',
    shipping: 3.99, pickup: true, stock: 18, sold: 156, rating: 4.9, reviews: 60,
    sellerId: 'artesanias-mediania', emoji: '🐸', color: 'verde',
  },

  // Deportes y playa
  {
    id: 'cooler-ruedas-60',
    title: 'Cooler con ruedas de 60 cuartos',
    description: 'Mantiene el hielo hasta 5 días. Con portavasos.',
    details: ['60 cuartos', 'Hielo hasta 5 días', 'Ruedas todo terreno', 'Portavasos'],
    price: 54.99, originalPrice: 69.99, category: 'playa', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 22, sold: 189, rating: 4.6, reviews: 71,
    sellerId: 'playa-y-mas', emoji: '🧊', color: 'azul', featured: true,
  },
  {
    id: 'tabla-surf-funboard',
    title: 'Tabla de surf funboard 7′2″',
    description: 'Usada, en buenas condiciones. Ideal para aprender en Rincón.',
    details: ['7′2″', 'Quillas incluidas', 'Leash incluido', 'Pequeñas reparaciones'],
    price: 380, category: 'playa', condition: 'usado',
    shipping: 0, pickup: true, stock: 1, sold: 3, rating: 4.7, reviews: 3,
    sellerId: 'playa-y-mas', emoji: '🏄', color: 'verde',
  },
  {
    id: 'bicicleta-montana-29',
    title: 'Bicicleta de montaña aro 29',
    description: '21 cambios, frenos de disco y suspensión delantera.',
    details: ['Aro 29', '21 velocidades', 'Frenos de disco', 'Cuadro de aluminio'],
    price: 289, originalPrice: 340, category: 'playa', condition: 'nuevo',
    shipping: 14.99, pickup: true, stock: 7, sold: 45, rating: 4.5, reviews: 19,
    sellerId: 'playa-y-mas', emoji: '🚲', color: 'rojito',
  },

  // Vehículos
  {
    id: 'gomas-all-terrain-265-70r17',
    title: 'Juego de 4 gomas all-terrain 265/70R17',
    description: 'Incluye montura y balanceo en Mayagüez.',
    details: ['265/70R17', 'All-terrain', 'Montura y balanceo incluidos', 'Garantía de 50,000 millas'],
    price: 560, originalPrice: 640, category: 'vehiculos', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 10, sold: 72, rating: 4.7, reviews: 33,
    sellerId: 'gomera-del-oeste', emoji: '🚙', color: 'amarillo',
  },
  {
    id: 'camara-reversa-pantalla',
    title: 'Cámara de reversa con pantalla de 5″',
    description: 'Visión nocturna y líneas guía. Fácil de instalar.',
    details: ['Pantalla de 5″', 'Visión nocturna', 'Líneas guía', 'Resistente al agua'],
    price: 45, category: 'vehiculos', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 26, sold: 120, rating: 4.3, reviews: 44,
    sellerId: 'gomera-del-oeste', emoji: '🚗', color: 'azul',
  },
  {
    id: 'scooter-electrico-plegable',
    title: 'Scooter eléctrico plegable',
    description: 'Hasta 25 km de autonomía. Perfecto pa’l Viejo San Juan.',
    details: ['25 km de autonomía', 'Velocidad máx. 25 km/h', 'Plegable', 'Luz delantera'],
    price: 349, originalPrice: 399, category: 'vehiculos', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 9, sold: 58, rating: 4.4, reviews: 26,
    sellerId: 'gomera-del-oeste', emoji: '🛴', color: 'verde', featured: true,
  },

  // Sabores de PR
  {
    id: 'cafe-altura-yauco-1lb',
    title: 'Café de altura tostado de Yauco (1 lb)',
    description: 'Tueste medio, molido para greca. Cosecha de la montaña.',
    details: ['1 libra', 'Tueste medio', 'Molido para greca', 'Cosecha local'],
    price: 14, category: 'sabores', condition: 'nuevo',
    shipping: 0, pickup: true, stock: 200, sold: 1840, rating: 4.9, reviews: 612,
    sellerId: 'hacienda-cafetal', emoji: '☕', color: 'verde', featured: true,
    questions: [{ q: '¿Lo tienen en grano?', a: 'Sí, déjanos una nota en la compra y te lo enviamos en grano.' }],
  },
  {
    id: 'sofrito-casero',
    title: 'Sofrito casero (pack de 4)',
    description: 'Ají dulce, recao y cilantrillo frescos. Congelado.',
    details: ['4 envases de 12 oz', 'Ingredientes del país', 'Congelado'],
    price: 12, category: 'sabores', condition: 'nuevo',
    shipping: 4.99, pickup: true, stock: 50, sold: 390, rating: 4.8, reviews: 140,
    sellerId: 'hacienda-cafetal', emoji: '🌿', color: 'verde',
  },
  {
    id: 'pique-botella-artesanal',
    title: 'Pique de botella artesanal',
    description: 'Ají caballero, vinagre y especias. Pica rico.',
    details: ['375 ml', 'Ají caballero', 'Hecho en Yauco'],
    price: 9.5, category: 'sabores', condition: 'nuevo',
    shipping: 3.99, pickup: true, stock: 70, sold: 455, rating: 4.7, reviews: 118,
    sellerId: 'hacienda-cafetal', emoji: '🌶️', color: 'rojito',
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getSeller = (id: string) => sellers.find((s) => s.id === id);

export const sampleReviews = [
  { name: 'Yamaris', town: 'Carolina', stars: 5, text: 'Llegó rapidísimo y tal como en la foto. ¡Wepa!' },
  { name: 'José L.', town: 'Arecibo', stars: 5, text: 'Excelente calidad. El vendedor contestó todo enseguida.' },
  { name: 'Keila', town: 'Humacao', stars: 4, text: 'Muy bueno, solo tardó un día más de lo esperado.' },
  { name: 'Ramón', town: 'Guaynabo', stars: 5, text: 'Lo recogí en persona, todo bien. Lo recomiendo.' },
  { name: 'Natalia', town: 'Cayey', stars: 4, text: 'Buen precio para lo que es. Volvería a comprar.' },
];
