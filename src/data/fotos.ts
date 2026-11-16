/*
 * Créditos de las fotos de las publicaciones de ejemplo.
 * fotos.json lo genera el script de selección de fotos (Openverse: Flickr y Wikimedia Commons);
 * todas tienen licencias que permiten uso comercial y modificación (CC0, dominio público, CC BY, CC BY-SA).
 */
import data from './fotos.json';

export interface PhotoCredit {
  /** Título original de la foto */
  title: string;
  creator: string;
  creatorUrl: string;
  /** 'flickr' | 'wikimedia' | … */
  source: string;
  /** Página original de la foto */
  url: string;
  /** 'cc0' | 'pdm' | 'by' | 'by-sa' */
  license: string;
  licenseVersion: string;
  licenseUrl: string;
}

export const photoCredits = data as Record<string, PhotoCredit>;

export const photoCredit = (productId: string): PhotoCredit | undefined => photoCredits[productId];

/** "CC BY 2.0", "CC0", "Dominio público" */
export function licenseLabel(c: PhotoCredit) {
  if (c.license === 'cc0') return 'CC0';
  if (c.license === 'pdm') return 'Dominio público';
  return `CC ${c.license.toUpperCase()} ${c.licenseVersion}`.trim();
}

export const sourceLabel = (c: PhotoCredit) =>
  ({ flickr: 'Flickr', wikimedia: 'Wikimedia Commons', stocksnap: 'StockSnap' })[c.source] ?? c.source;
