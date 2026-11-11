/** Pestañas accesibles: [role=tablist] > [role=tab][aria-controls]. Flechas para moverse. */
export function initTabs(list: HTMLElement) {
  const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));

  function select(tab: HTMLButtonElement, focus = false) {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = !on;
    }
    if (focus) tab.focus();
    list.dispatchEvent(new CustomEvent('tabs:change', { detail: tab.getAttribute('aria-controls') }));
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      select(tabs[(i + step + tabs.length) % tabs.length], true);
    });
  });

  const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];
  if (initial) select(initial);

  return {
    open(panelId: string) {
      const tab = tabs.find((t) => t.getAttribute('aria-controls') === panelId);
      if (tab) select(tab);
    },
  };
}
