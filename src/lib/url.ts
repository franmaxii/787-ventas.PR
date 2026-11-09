/**
 * Ruta base del sitio (config `base` de Astro). Es '' cuando se publica en la raíz
 * de un dominio y '/nombre-repo' en GitHub Pages de proyecto.
 */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Antepone la ruta base a un enlace interno. Deja igual las URLs externas y data:. */
export function url(path: string): string {
  if (!path || /^(https?:|data:|blob:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
