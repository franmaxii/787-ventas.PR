/*
 * Anuncios: ocultarlos (con "Deshacer") y mantener el anuncio nativo en su lugar
 * cuando la cuadrícula se filtra o se reordena en el navegador.
 */
import { adsHidden, onChange } from './store';
import { toast } from './ui';

function applyHidden() {
  const hidden = new Set(adsHidden.ids());
  document.querySelectorAll<HTMLElement>('[data-ad]').forEach((el) => {
    // los ejemplos de /anunciate se ven siempre
    if (el.closest('[data-ad-demo]')) return;
    el.hidden = hidden.has(el.dataset.ad!) || el.dataset.adEmpty === 'true';
  });
}

/** Pone el anuncio de la cuadrícula después de N publicaciones visibles (N = data-ad-slot). */
export function placeAd(grid: HTMLElement) {
  const ad = grid.querySelector<HTMLElement>(':scope > [data-ad]');
  if (!ad) return;
  const slot = Number(ad.dataset.adSlot) || 4;
  const visible = Array.from(grid.querySelectorAll<HTMLElement>(':scope > [data-id]')).filter((c) => !c.hidden);
  const after = visible[Math.min(slot, visible.length) - 1];
  if (after) after.after(ad);
  // sin resultados no tiene sentido un anuncio solo
  ad.dataset.adEmpty = String(visible.length === 0);
  applyHidden();
}

export function initAds() {
  applyHidden();
  onChange(applyHidden);
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-ad-hide]');
    if (!btn) return;
    e.preventDefault();
    const id = btn.closest<HTMLElement>('[data-ad]')?.dataset.ad;
    if (!id) return;
    adsHidden.add(id);
    toast('Anuncio ocultado', { label: 'Deshacer', run: () => adsHidden.remove(id) });
  });
}
