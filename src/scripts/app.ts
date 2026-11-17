/*
 * Comportamiento global: favoritos, distancias según tu ubicación
 * y contadores (mensajes y notificaciones).
 */
import { distanceLabel, milesBetween } from '../data/pueblos';
import { chats, favs, location, onChange } from './store';
import { unreadNotifications } from './notifications';
import { toast } from './ui';
import { initAds } from './ads';

function setBadge(selector: string, count: number) {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    el.textContent = count > 99 ? '99+' : String(count);
    el.hidden = count === 0;
  });
}

function renderSaved() {
  const ids = new Set(favs.ids());
  document.querySelectorAll<HTMLButtonElement>('[data-fav]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(ids.has(btn.dataset.fav!)));
  });
  setBadge('[data-saved-count]', ids.size);
  document.querySelectorAll<HTMLElement>('[data-saved-count-sr]').forEach((el) => {
    el.textContent = ids.size ? `${ids.size} ${ids.size === 1 ? 'favorito' : 'favoritos'}` : 'sin favoritos';
  });
}

/** "Bayamón · a ≈ 6 mi" en cada tarjeta, según el pueblo elegido. */
function renderDistances() {
  const loc = location.get();
  document.querySelectorAll<HTMLElement>('[data-dist]').forEach((el) => {
    const town = el.dataset.dist!;
    const label = distanceLabel(milesBetween(loc.town, town));
    el.textContent = label ? `${town} · ${label}` : town;
  });
  document.querySelectorAll<HTMLElement>('[data-location-label]').forEach((el) => {
    el.textContent = loc.radius ? `${loc.town} · ${loc.radius} mi` : `${loc.town} · Toda la isla`;
  });
}

function renderAll() {
  renderSaved();
  renderDistances();
  setBadge('[data-badge="mensajes"]', chats.unread());
  setBadge('[data-badge="notificaciones"]', unreadNotifications());
}

renderAll();
onChange(renderAll);
initAds();

document.addEventListener('click', (e) => {
  const favBtn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-fav]');
  if (!favBtn) return;
  e.preventDefault();
  const id = favBtn.dataset.fav!;
  const saved = favs.toggle(id);
  if (saved) {
    toast('Añadido a favoritos', {
      label: 'Añadir a colección',
      run: () => window.dispatchEvent(new CustomEvent('p787:collect', { detail: { id } })),
    });
  } else {
    toast('Quitado de favoritos');
  }
});
