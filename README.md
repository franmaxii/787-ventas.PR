# Plaza 787 🇵🇷

Marketplace local para Puerto Rico al estilo **Facebook Marketplace**, hecho con [Astro](https://astro.build):
las personas publican gratis, los compradores escriben por chat ("¿Sigue disponible?") y se
encuentran en persona. No hay carrito: se paga al recibir (efectivo o ATH Móvil).
Diseño "Liquid Glass" (vidrio esmerilado estilo iPhone) con la paleta de la marca:
**Azul DTMF**, **Rojito**, **Crema**, **Amarillo**, **Verde** y **Blanco**.

- Íconos: [Heroicons](https://heroicons.com) de Tailwind Labs (MIT), leídos del paquete `heroicons` al compilar.
- Imágenes de productos: **fotos reales con licencia libre** (CC0, dominio público, CC BY y CC BY-SA:
  todas permiten uso comercial y cambios), encontradas con [Openverse](https://openverse.org) en Flickr y
  Wikimedia Commons. Están recortadas en cuadrado (800 px, WebP) en `public/img/productos/fotos/` y sus
  créditos en `src/data/fotos.json`: salen debajo de la foto de cada publicación y en `/creditos`.
  Cada foto tiene además una versión de 400 px (`<id>-400.webp`) para tarjetas y miniaturas; el navegador
  elige con `srcset` (`src/lib/img.ts`). Las publicaciones sin foto usan las ilustraciones SVG de
  `public/img/productos/`.

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
| `/`                      | Portada: video, buscador, ubicación, categorías, selecciones cerca de ti, autos, alquiler y venta de bienes raíces, donaciones, renta de artículos, hecho en PR |
| `/buscar`                | Búsqueda con radio en millas, sinónimos boricuas, Gratis, Bajó de precio, fecha y orden |
| `/categoria/[slug]`      | Publicaciones de una de las 12 categorías (ver abajo)              |
| `/producto/[id]`         | Publicación: mensaje al vendedor, ofertas, favorito, compartir, reportar, encuentro seguro |
| `/mensajes`              | Chat: pestañas Comprando / Vendiendo, mensajes rápidos (respuestas demo automáticas) |
| `/favoritos`             | Favoritos y **colecciones** (crear, renombrar, eliminar con deshacer; enlace `?c=`) |
| `/notificaciones`        | Mensajes, bajadas de precio, publicaciones de quien sigues, publicaciones por vencer |
| `/vender`                | Publicar artículo, vehículo, alquiler o propiedad en venta (requiere perfil verificado) |
| `/registro`              | Crear perfil: público → info privada → verificación de ID          |
| `/cuenta`                | Mi perfil: foto, usuario, pueblo, seguidores, estrellas, pestañas  |
| `/vendedor/[id]`         | Perfil público de un vendedor (seguir, publicaciones, reviews)     |
| `/sobre`                 | Sobre Plaza 787: cómo funciona, perfiles verificados, privacidad   |
| `/terminos`              | Términos y privacidad (**borrador**: debe revisarlo un abogado)    |
| `/contacto`              | Contáctanos: formulario (demo, no envía nada) y preguntas frecuentes |
| `/creditos`              | Créditos y licencias de las fotos de las publicaciones de ejemplo  |
| `/anunciate`             | Para negocios: formatos de anuncio y reglas; los anuncios de ejemplo llevan aquí |

## Menú "Tu Plaza" (diseño de la socia)

El botón ☰ abre un menú con tres secciones:

- **Comunidad y ayuda:** Sobre Plaza 787, Términos y privacidad, Contáctanos.
- **Mi Plaza:** Mi cuenta (`/cuenta?tab=info`), Favoritos, Mis compras (las conversaciones de
  *Comprando* en Mensajes, porque los pagos son en persona) y Mis publicaciones.
- **Categorías:** Alquiler bienes raíces, Venta bienes raíces, Hogar y vida, Autos y piezas,
  Bebés y maternidad, Electrónica / Tecnología, Deportes y playa, Salud y belleza, Muebles, Moda,
  Donaciones y Renta de artículos.

Cada categoría tiene un ícono de Heroicons (campo `icon` en `src/data/categories.ts`): sale en el
menú, en los círculos de la portada, en los títulos de sus secciones y en el encabezado de la categoría.

Reglas de las categorías: lo que se marca como **gratis** va a *Donaciones*; *Renta de artículos*
muestra el precio **por día**; *Venta bienes raíces* usa el tipo `propiedad` (cuartos y baños, sin
"Nuevo/Usado"). Las artesanías y sabores de la isla viven en *Hogar y vida* con `local: true` y
salen en la sección "Hecho en Puerto Rico" de la portada.

## Espacios publicitarios (ejemplo)

Anuncios **de ejemplo** con negocios inventados (`src/data/ads.ts`, fotos en `public/img/anuncios/`):

- **Tarjeta nativa** dentro de la cuadrícula (`AdCard`): misma forma que una publicación, después de
  4 publicaciones en la portada y de 6 en categorías y búsqueda. Al filtrar u ordenar se queda en su lugar
  (`scripts/ads.ts`) y no cuenta en "N resultados".
- **Banner** entre secciones (`AdBanner`): en la portada y debajo de cada publicación.
- **Por contexto:** car wash en Autos, mudanza en Muebles y Donaciones, ferretería en Hogar, surf en Playa,
  inspección en Venta de bienes raíces, salón en Salud y Moda; si no hay uno propio, el café.
- **Para que no molesten:** siempre dicen *Patrocinado*, máximo dos por página, se ocultan con la ✕
  (con *Deshacer*, se recuerda en `p787:ads-hidden`) y nunca salen en Mensajes, Vender, Favoritos,
  Notificaciones ni el perfil.

## Favoritos y colecciones

- El corazón guarda en **Favoritos**. El aviso que sale ofrece **Añadir a colección**.
- **Colección** en una publicación, o la carpeta en cada tarjeta de Favoritos, abre "Guardar en
  colección": marca una o varias colecciones o crea una nueva ("Pa' la casa", "Regalos"…).
- Lo que está en una colección también está en Favoritos; si le quitas el corazón, sale de sus colecciones.
- En `/favoritos` cada colección tiene portada con sus últimas fotos y se puede renombrar o eliminar
  (con **Deshacer**). Se guardan en `localStorage` (`p787:collections`), igual que los favoritos.

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
- **Video de portada:** está en `public/video/promo.mp4` (hecho con Google Flow / Veo, 8 s con audio) y su
  imagen de portada en `public/video/poster.webp`; las rutas van en `heroVideo` y `heroPoster` de
  `src/data/site.ts`. Para cambiarlo, comprímelo antes:
  `ffmpeg -i video.mp4 -c:v libx264 -crf 25 -preset slow -c:a aac -b:a 128k -movflags +faststart public/video/promo.mp4`.
- **Publicaciones, vendedores y categorías:** `src/data/products.ts` y `src/data/categories.ts`.
- **Pueblos y distancias:** `src/data/pueblos.ts` (centro aproximado de los 78 municipios).
  Cada producto tiene `image: foto('<id>')` (foto real) o `image: img('<nombre>')` (ilustración SVG).
  Para cambiar una foto, reemplaza `public/img/productos/fotos/<id>.webp` (cuadrada) y actualiza su
  crédito en `src/data/fotos.json`; si es una foto tuya, borra su entrada para que no salga crédito.
- **Ilustraciones:** se generan con `python3 scripts/generar-ilustraciones.py public/img/productos`;
  también puedes editar cada SVG a mano.
- **Íconos:** `src/components/Icon.astro` mapea nombres cortos a archivos de Heroicons.

## Estructura

```text
src/
├── components/   Header, Logo, BottomNav, HeroVideo, SearchBar, CategoryRow, ProductCard,
│                 ProfileHeader, Stars, Icon (Heroicons), Footer…
├── data/         site.ts, categories.ts, products.ts (ejemplo), pueblos.ts (coordenadas)
├── layouts/      Layout.astro
├── lib/          format.ts (precios, "Gratis", "/mes", "hace X días"), url.ts
├── pages/        rutas del sitio
├── scripts/      store.ts (localStorage: favoritos, chats, ubicación, perfil, publicaciones),
│                 notifications.ts, app.ts, filter.ts, listing-filter.ts, tabs.ts, image.ts, ui.ts
└── styles/       global.css
```

## Documentación

La presentación de infraestructura y arquitectura (las 5 reglas de oro, costos, equipo y hoja de ruta)
está en [`docs/Plaza787-Infraestructura-y-Arquitectura.pdf`](docs/Plaza787-Infraestructura-y-Arquitectura.pdf).
Ver [`docs/README.md`](docs/README.md) para editarla.

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

El sitio es 100% estático. Favoritos, conversaciones, ubicación, perfil y publicaciones se guardan
en el `localStorage` del navegador (ver `src/scripts/store.ts`): no se comparten entre usuarios
ni dispositivos, y **las respuestas en el chat son automáticas de demostración**. Para producción falta:

1. Backend + base de datos (usuarios, publicaciones, conversaciones) con búsqueda geográfica.
   La información personal debe guardarse cifrada en el servidor, nunca en el navegador.
2. Chat en tiempo real (WebSockets) y notificaciones push/SMS.
3. Autenticación y verificación de identidad real con un proveedor (que no retenga la imagen de la ID).
4. Moderación y antifraude (estafas en el chat, artículos prohibidos, reportes).
5. Subida de fotos a un almacenamiento (S3, R2…).
