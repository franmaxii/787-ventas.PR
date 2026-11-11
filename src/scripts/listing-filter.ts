/*
 * Filtro del historial de publicaciones del perfil:
 * texto (buscador) + estado (Todas / Activos / Vendidos / Expirados).
 * Las tarjetas llevan data-status y data-title.
 */

const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

interface Options {
  grid: HTMLElement;
  chips: HTMLElement;
  input?: HTMLInputElement | null;
  empty?: HTMLElement | null;
}

export function initListingFilter({ grid, chips, input, empty }: Options) {
  let status = chips.querySelector<HTMLElement>('[aria-pressed="true"]')?.dataset.status ?? '';

  function apply() {
    const items = Array.from(grid.querySelectorAll<HTMLElement>('[data-status]'));
    const words = normalize(input?.value ?? '').split(/\s+/).filter(Boolean);

    // contadores por estado
    const counts: Record<string, number> = { '': items.length };
    for (const it of items) counts[it.dataset.status!] = (counts[it.dataset.status!] ?? 0) + 1;
    chips.querySelectorAll<HTMLElement>('[data-status]').forEach((chip) => {
      const c = chip.querySelector('.count');
      if (c) c.textContent = String(counts[chip.dataset.status ?? ''] ?? 0);
    });

    let visible = 0;
    for (const it of items) {
      const text = normalize(it.dataset.title ?? '');
      const match = (!status || it.dataset.status === status) && words.every((w) => text.includes(w));
      it.hidden = !match;
      if (match) visible++;
    }
    if (empty) empty.hidden = visible > 0;
  }

  chips.addEventListener('click', (e) => {
    const chip = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-status]');
    if (!chip) return;
    status = chip.dataset.status ?? '';
    chips.querySelectorAll('[data-status]').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    apply();
  });
  input?.addEventListener('input', apply);

  apply();
  return { apply };
}
