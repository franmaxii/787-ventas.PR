# Documentación de Plaza 787

| Archivo | Qué es |
| :------ | :----- |
| [`Plaza787-Infraestructura-y-Arquitectura.pdf`](Plaza787-Infraestructura-y-Arquitectura.pdf) | Presentación v2.0 (31 diapositivas), modelo tipo Facebook Marketplace: visión, las 5 reglas de oro, arquitectura (chat en tiempo real, búsqueda por distancia), flujos, ingresos sin comisión, encuentros/vehículos/alquileres, resiliencia, seguridad y leyes, stack, costos, equipo, hoja de ruta, métricas, riesgos, próximos 90 días y apéndices técnicos. |
| [`presentacion/index.html`](presentacion/index.html) | Fuente editable de la presentación (HTML + CSS, íconos Heroicons incluidos). |

## Editar y volver a generar el PDF

1. Edita `presentacion/index.html` (cada diapositiva es un `<section class="slide">` de 1280×720).
2. Ábrelo en Chrome **desde esta carpeta del repo** (usa las ilustraciones de `public/img/productos/`
   y las fuentes de Google Fonts, así que hace falta internet).
3. Imprimir → Destino: **Guardar como PDF** → Márgenes: **Ninguno** → activa **Gráficos de fondo**.

El tamaño de página ya está definido en el CSS (`@page`), así que cada diapositiva sale en su propia página.

> Los costos, tarifas y referencias legales son estimados de planificación (noviembre 2026), no
> cotizaciones ni asesoría legal. Validar con proveedores, abogado y CPA antes de decidir.
