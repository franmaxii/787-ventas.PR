/*
 * Índice del catálogo que CollectionDialog deja en cada página (título, imagen y color por id),
 * para dibujar las portadas de las colecciones sin cargar todo products.ts en el navegador.
 */
import stackIcon from 'heroicons/24/outline/rectangle-stack.svg?raw';
import { esc } from './ui';

export interface CatalogItem {
  /** Título */
  t: string;
  /** Imagen (ya con la ruta base) */
  i: string;
  /** Color de fondo de la paleta */
  c: string;
}

let cache: Record<string, CatalogItem> | undefined;

function index() {
  if (!cache) {
    try {
      cache = JSON.parse(document.querySelector('[data-catalog-index]')?.textContent ?? '{}');
    } catch {
      cache = {};
    }
  }
  return cache!;
}

export const catalogItem = (id: string | undefined): CatalogItem | undefined => (id ? index()[id] : undefined);

/** Ícono de "colección" (Heroicons rectangle-stack) para portadas vacías. */
export const stackIconHtml = stackIcon.replace('<svg', '<svg class="icon" width="24" height="24"');

/** Miniatura de una publicación; si no hay, el ícono de colección. */
export function coverHtml(id: string | undefined) {
  const item = catalogItem(id);
  if (!item?.i) return stackIconHtml;
  const photo = !item.i.endsWith('.svg');
  return `<img src="${esc(item.i)}" alt="" loading="lazy" class="tile--${esc(item.c)}${photo ? '' : ' is-art'}" />`;
}
