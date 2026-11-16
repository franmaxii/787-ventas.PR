let toastTimer: number | undefined;

export interface ToastAction {
  label: string;
  run: () => void;
}

/**
 * Muestra un aviso corto abajo de la pantalla.
 * Con `action` lleva un botón (ej. "Añadir a colección", "Deshacer") y dura más.
 * Es solo un atajo: lo mismo se puede hacer desde la página, sin depender del aviso.
 */
export function toast(message: string, action?: ToastAction) {
  const el = document.getElementById('toast');
  if (!el) return;
  const hide = () => {
    el.classList.remove('is-visible', 'has-action');
    // que el botón no quede enfocable mientras el aviso está oculto
    el.querySelector('.toast__action')?.remove();
  };
  el.textContent = message;
  el.classList.toggle('has-action', !!action);
  if (action) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'toast__action';
    btn.textContent = action.label;
    btn.addEventListener('click', () => {
      window.clearTimeout(toastTimer);
      hide();
      action.run();
    });
    el.append(btn);
  }
  el.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(hide, action ? 6000 : 2600);
}

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapa texto antes de meterlo en innerHTML. */
export const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-PR', { day: 'numeric', month: 'short', year: 'numeric' });
