/*
 * Filtra y ordena en el navegador las tarjetas ya renderizadas
 * (las tarjetas traen data-* con lo necesario, ver ProductCard `filterable`).
 * Aplica también el radio de distancia elegido en "¿Dónde estás?".
 */
import { milesBetween } from '../data/pueblos';
import { location, onChange } from './store';
import { placeAd } from './ads';

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

/** Sinónimos boricuas: buscar "guagua" también encuentra "carro". */
const SYNONYMS: Record<string, string[]> = {
  guagua: ['carro', 'jeep', 'vehiculo'],
  carro: ['guagua', 'vehiculo'],
  zafacon: ['basurero'],
  mahones: ['jeans', 'pantalon'],
  gomas: ['llantas', 'neumaticos'],
  llantas: ['gomas'],
  chancletas: ['sandalias'],
  abanico: ['ventilador'],
  ventilador: ['abanico'],
  planta: ['generador'],
  generador: ['planta'],
  apartamento: ['apto', 'alquiler'],
  cuarto: ['habitacion', 'alquiler'],
  blower: ['secadora'],
  secadora: ['blower'],
  coche: ['cochecito', 'stroller'],
  cochecito: ['coche'],
  brincolin: ['inflable'],
  inflable: ['brincolin'],
  mueble: ['sofa'],
  sofa: ['mueble'],
  regalo: ['gratis'],
  donacion: ['gratis'],
};

const FIELDS = ['q', 'categoria', 'condicion', 'orden', 'min', 'max', 'gratis', 'baja', 'dias'] as const;

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
      orden: get('orden'),
      min: get('min'),
      max: get('max'),
      dias: get('dias'),
      gratis: checked('gratis'),
      baja: checked('baja'),
    };
  }

  function apply() {
    const s = state();
    const loc = location.get();
    const words = normalize(s.q)
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => [w, ...(SYNONYMS[w] ?? [])]);
    const min = s.min ? Number(s.min) : -Infinity;
    const max = s.max ? Number(s.max) : Infinity;
    const days = s.dias ? Number(s.dias) : Infinity;

    let visible = 0;
    for (const card of cards) {
      const d = card.dataset;
      const price = Number(d.price);
      const miles = milesBetween(loc.town, d.town ?? '');
      d.miles = String(miles);
      const text = searchText.get(card) ?? '';
      const match =
        words.every((alts) => alts.some((w) => text.includes(w))) &&
        (!s.categoria || d.category === s.categoria) &&
        (!s.condicion || d.condition === s.condicion) &&
        (!s.gratis || price === 0) &&
        (!s.baja || d.drop === 'true') &&
        Number(d.days) <= days &&
        price >= min &&
        price <= max &&
        (!loc.radius || miles <= loc.radius);
      card.hidden = !match;
      if (match) visible++;
    }

    const key = (c: HTMLElement) => {
      switch (s.orden) {
        case 'cerca': return Number(c.dataset.miles);
        case 'recientes': return Number(c.dataset.days);
        case 'menor': return Number(c.dataset.price);
        case 'mayor': return -Number(c.dataset.price);
        default: return Number(c.dataset.index);
      }
    };
    [...cards].sort((a, b) => key(a) - key(b)).forEach((c) => grid.appendChild(c));
    placeAd(grid);

    if (count) {
      const where = loc.radius ? ` a ${loc.radius} mi de ${loc.town}` : ' en toda la isla';
      count.textContent = `${visible} ${visible === 1 ? 'resultado' : 'resultados'}${where}`;
    }
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
  onChange(apply); // si cambia la ubicación o el radio

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
