/*
 * Filtra y ordena en el navegador las tarjetas de producto ya renderizadas
 * (las tarjetas traen data-* con lo necesario, ver ProductCard `filterable`).
 */

interface Options {
  form: HTMLFormElement;
  grid: HTMLElement;
  queryInput?: HTMLInputElement | null;
  count?: HTMLElement | null;
  empty?: HTMLElement | null;
  syncUrl?: boolean;
}

const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

const FIELDS = ['q', 'categoria', 'condicion', 'municipio', 'orden', 'min', 'max', 'envio', 'ofertas'] as const;

export function initFilters({ form, grid, queryInput, count, empty, syncUrl = false }: Options) {
  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-id]'));
  cards.forEach((card, i) => (card.dataset.index = String(i)));
  const searchText = new Map(cards.map((c) => [c, normalize(c.dataset.title ?? '')]));

  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;

  // Rellenar los controles desde la URL (?q=...&categoria=...)
  if (syncUrl) {
    const params = new URLSearchParams(window.location.search);
    for (const name of FIELDS) {
      const value = params.get(name);
      if (value === null) continue;
      if (name === 'q' && queryInput) queryInput.value = value;
      const el = field(name);
      if (!el) continue;
      if (el instanceof HTMLInputElement && el.type === 'checkbox') el.checked = value === '1';
      else el.value = value;
    }
  }

  function state() {
    const get = (name: string) => field(name)?.value ?? '';
    const checked = (name: string) => (field(name) as HTMLInputElement | null)?.checked ?? false;
    return {
      q: queryInput?.value ?? '',
      categoria: get('categoria'),
      condicion: get('condicion'),
      municipio: get('municipio'),
      orden: get('orden'),
      min: get('min'),
      max: get('max'),
      envio: checked('envio'),
      ofertas: checked('ofertas'),
    };
  }

  function apply() {
    const s = state();
    const words = normalize(s.q).split(/\s+/).filter(Boolean);
    const min = s.min ? Number(s.min) : -Infinity;
    const max = s.max ? Number(s.max) : Infinity;

    let visible = 0;
    for (const card of cards) {
      const d = card.dataset;
      const price = Number(d.price);
      const text = searchText.get(card) ?? '';
      const match =
        words.every((w) => text.includes(w)) &&
        (!s.categoria || d.category === s.categoria) &&
        (!s.condicion || d.condition === s.condicion) &&
        (!s.municipio || d.town === s.municipio) &&
        (!s.envio || d.free === 'true') &&
        (!s.ofertas || Number(d.off) > 0) &&
        price >= min &&
        price <= max;
      card.hidden = !match;
      if (match) visible++;
    }

    const key = (c: HTMLElement) => {
      switch (s.orden) {
        case 'menor': return Number(c.dataset.price);
        case 'mayor': return -Number(c.dataset.price);
        case 'vendidos': return -Number(c.dataset.sold);
        default: return Number(c.dataset.index);
      }
    };
    [...cards].sort((a, b) => key(a) - key(b)).forEach((c) => grid.appendChild(c));

    if (count) count.textContent = `${visible} ${visible === 1 ? 'resultado' : 'resultados'}`;
    if (empty) empty.hidden = visible > 0;

    if (syncUrl) {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(s)) {
        if (v === true) params.set(k, '1');
        else if (typeof v === 'string' && v) params.set(k, v);
      }
      const qs = params.toString();
      history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
    }
    form.dispatchEvent(new CustomEvent('filters:applied', { detail: s }));
  }

  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    apply();
  });
  form.addEventListener('reset', () => setTimeout(apply));

  if (queryInput) {
    queryInput.addEventListener('input', apply);
    queryInput.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      queryInput.blur();
      apply();
    });
  }

  apply();
}
