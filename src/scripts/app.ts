/*
 * Comportamiento global: contador del carrito, botones de favoritos
 * y botones "Agregar al carrito" / "Comprar ahora".
 */
import { cart, favs, onChange, profile } from './store';
import { url } from '../lib/url';
import { toast } from './ui';

function renderCartBadge(bump = false) {
  const count = cart.count();
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
    el.dataset.empty = String(count === 0);
    el.textContent = count === 0 ? '+' : count > 99 ? '99+' : String(count);
    if (bump) {
      el.classList.remove('bump');
      void el.offsetWidth; // reinicia la animación
      el.classList.add('bump');
    }
  });
  document.querySelectorAll<HTMLElement>('[data-cart-count-sr]').forEach((el) => {
    el.textContent = count === 0 ? 'vacío' : `${count} productos`;
  });
}

function renderFavButtons() {
  const ids = new Set(favs.ids());
  document.querySelectorAll<HTMLButtonElement>('[data-fav]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(ids.has(btn.dataset.fav!)));
  });
}

/** Saludo y foto del menú lateral según el perfil guardado. */
function renderProfileBits() {
  const p = profile.get();
  document.querySelectorAll<HTMLElement>('[data-profile-greeting]').forEach((el) => {
    el.textContent = p ? `¡Hola, ${p.private.firstName || p.public.username}!` : '¡Hola!';
  });
  document.querySelectorAll<HTMLElement>('[data-profile-sub]').forEach((el) => {
    el.textContent = p ? `@${p.public.username.toLowerCase()} · ${p.public.town}` : 'Crea tu perfil para vender';
  });
  document.querySelectorAll<HTMLElement>('[data-profile-avatar]').forEach((el) => {
    const img = el.querySelector('img');
    if (p?.public.photo) {
      if (img) img.src = p.public.photo;
      else {
        const i = document.createElement('img');
        i.src = p.public.photo;
        i.alt = '';
        el.replaceChildren(i);
      }
    }
  });
}

let lastCount = cart.count();
renderCartBadge();
renderFavButtons();
renderProfileBits();

onChange(() => {
  const count = cart.count();
  renderCartBadge(count > lastCount);
  lastCount = count;
  renderFavButtons();
  renderProfileBits();
});

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  const favBtn = target.closest<HTMLButtonElement>('[data-fav]');
  if (favBtn) {
    e.preventDefault();
    const saved = favs.toggle(favBtn.dataset.fav!);
    toast(saved ? 'Guardado en favoritos' : 'Quitado de favoritos');
    return;
  }

  const addBtn = target.closest<HTMLButtonElement>('[data-add-to-cart]');
  if (addBtn) {
    e.preventDefault();
    const id = addBtn.dataset.addToCart!;
    const max = Number(addBtn.dataset.max ?? 99);
    const qtySelect = addBtn.dataset.qtyFrom
      ? document.querySelector<HTMLSelectElement>(addBtn.dataset.qtyFrom)
      : null;
    const qty = Number(qtySelect?.value ?? 1);
    const inCart = cart.lines().find((l) => l.id === id)?.qty ?? 0;

    if (!cart.add(id, qty, max)) {
      toast('No se pudo guardar el carrito en este navegador');
      return;
    }
    if (addBtn.dataset.buyNow !== undefined) {
      window.location.href = url('/carrito');
      return;
    }
    toast(inCart + qty > max ? `Solo hay ${max} disponibles` : 'Agregado al carrito');
  }
});
