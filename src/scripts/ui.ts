let toastTimer: number | undefined;

/** Muestra un aviso corto abajo de la pantalla. */
export function toast(message: string) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('is-visible'), 2600);
}

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapa texto antes de meterlo en innerHTML. */
export const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-PR', { day: 'numeric', month: 'short', year: 'numeric' });
