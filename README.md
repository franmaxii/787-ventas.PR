# Plaza 787 🇵🇷

Marketplace estilo Mercado Libre para Puerto Rico, hecho con [Astro](https://astro.build).
Diseño "Liquid Glass" (vidrio esmerilado estilo iPhone) con la paleta de la marca:
**Azul DTMF**, **Rojito**, **Crema**, **Amarillo**, **Verde** y **Blanco**.

- Íconos: [Heroicons](https://heroicons.com) de Tailwind Labs (MIT), leídos del paquete `heroicons` al compilar.
- Imágenes de productos: ilustraciones SVG ficticias en `public/img/productos/`.

## Comandos

| Comando             | Qué hace                                      |
| :------------------ | :-------------------------------------------- |
| `npm install`       | Instala dependencias                          |
| `npm run dev`       | Servidor local en `http://localhost:4321`     |
| `npm run build`     | Genera el sitio estático en `./dist/`         |
| `npm run preview`   | Sirve el build localmente                     |
| `npx astro check`   | Revisa tipos de TypeScript                    |

## Páginas

| Ruta                     | Contenido                                                          |
| :----------------------- | :----------------------------------------------------------------- |
| `/`                      | Portada: video, buscador, categorías, recomendados, ofertas        |
| `/buscar`                | Búsqueda con filtros (categoría, condición, precio, envío, orden)  |
| `/categoria/[slug]`      | Productos de una categoría                                         |
| `/producto/[id]`         | Detalle: precio, pagos, envío, vendedor, preguntas, opiniones      |
| `/carrito`               | Carrito y checkout (envío o recogido; ATH Móvil, tarjeta, efectivo)|
| `/compras`               | Historial de pedidos                                               |
| `/favoritos`             | Productos guardados                                                |
| `/mensajes`              | Preguntas hechas a vendedores                                      |
| `/vender`                | Publicar con fotos (requiere perfil verificado)                    |
| `/registro`              | Crear perfil: público → info privada → verificación de ID          |
| `/cuenta`                | Mi perfil: foto, usuario, pueblo, seguidores, estrellas, pestañas  |
| `/vendedor/[id]`         | Perfil público de un vendedor (seguir, publicaciones, reviews)     |

## Perfil (diseño de la socia)

- **Público:** foto, nombre de usuario, pueblo y seguidores (se pueden ocultar en Ajustes).
- **Historial de publicaciones:** Activos, Vendidos y Expirados (expiran a los 30 días; se pueden
  marcar como vendidas o volver a publicar desde el perfil).
- **Información personal privada:** nombre de pila, teléfono, fecha de nacimiento y email. No aparece
  en el perfil; en "Mi info" se ve enmascarada y se revela con "Mostrar".
- **ID:** se pide una vez en el registro para verificar la identidad. La imagen se descarta al instante:
  solo se guarda la fecha de verificación. En esta demo la verificación es simulada.

## Personalizar

- **Colores y tipografía:** `src/styles/global.css` (variables `--azul`, `--rojito`, `--crema`…).
- **Logo:** por defecto es un logo de texto (`src/components/Logo.astro`). Para usar tu archivo,
  ponlo en `public/` (ej. `public/logo.png`) y escribe `logo: '/logo.png'` en `src/data/site.ts`.
- **Video de portada:** pon el video en `public/video/promo.mp4` y escribe
  `heroVideo: '/video/promo.mp4'` en `src/data/site.ts`.
- **Productos, vendedores y categorías:** `src/data/products.ts` y `src/data/categories.ts`.
  Cada producto tiene `image: '/img/productos/....svg'`; cámbialo por una foto real
  (por ejemplo `'/fotos/nevera.jpg'`) y se mostrará llenando el cuadro.
- **Ilustraciones:** se generan con `python3 scripts/generar-ilustraciones.py public/img/productos`;
  también puedes editar cada SVG a mano.
- **Íconos:** `src/components/Icon.astro` mapea nombres cortos a archivos de Heroicons.

## Estructura

```text
src/
├── components/   Header, Logo, BottomNav, HeroVideo, SearchBar, CategoryRow, ProductCard,
│                 ProfileHeader, Stars, Icon (Heroicons), Footer…
├── data/         site.ts, categories.ts, products.ts (catálogo de ejemplo)
├── layouts/      Layout.astro
├── lib/          format.ts (precios, descuentos, pagos)
├── pages/        rutas del sitio
├── scripts/      store.ts (localStorage: carrito, perfil, publicaciones…), app.ts, filter.ts,
│                 listing-filter.ts, tabs.ts, image.ts, ui.ts
└── styles/       global.css
```

## Publicar en GitHub Pages

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) compila y publica el sitio
automáticamente en cada push a `main`. Detecta solo la ruta base (`/nombre-del-repo`).

1. Crea un repositorio en GitHub (público si usas el plan gratis).
2. En el repo: **Settings → Pages → Source: GitHub Actions**.
3. Sube el código:

   ```sh
   git init -b main
   git add .
   git commit -m "Plaza 787"
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

4. Al terminar el workflow (pestaña **Actions**), el sitio queda en
   `https://TU_USUARIO.github.io/TU_REPO/`.

Para probar localmente con subruta: `BASE_PATH=/TU_REPO npm run build && BASE_PATH=/TU_REPO npm run preview`.

**Otros hostings (Cloudflare Pages, Netlify, Vercel):** comando `npm run build`, carpeta `dist`.
Publican en la raíz del dominio, así que no hace falta `BASE_PATH`.

## Importante: es un prototipo

El sitio es 100% estático. El carrito, favoritos, compras, preguntas y publicaciones se guardan
en el `localStorage` del navegador (ver `src/scripts/store.ts`): no se comparten entre usuarios
ni dispositivos y **no se cobra nada**. Para producción falta:

1. Backend + base de datos (productos, usuarios, pedidos). La información personal debe guardarse
   cifrada en el servidor, nunca en el navegador como en esta demo.
2. Autenticación (inicio de sesión) y verificación de identidad real con un proveedor
   (que no retenga la imagen de la ID).
3. Pagos reales (ATH Móvil Business, Stripe, etc.).
4. Subida de fotos a un almacenamiento (S3, R2…).
