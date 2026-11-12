/*
 * Centro aproximado de cada pueblo de Puerto Rico (lat, lng).
 * Sirve para calcular distancias "a ≈ X mi" como en Facebook Marketplace.
 * Son aproximaciones: con datos reales se usaría la ubicación exacta de la publicación (PostGIS).
 */
export const pueblos: Record<string, [number, number]> = {
  Adjuntas: [18.163, -66.723], Aguada: [18.379, -67.188], Aguadilla: [18.428, -67.154],
  'Aguas Buenas': [18.257, -66.103], Aibonito: [18.14, -66.266], Añasco: [18.283, -67.14],
  Arecibo: [18.472, -66.716], Arroyo: [17.966, -66.061], Barceloneta: [18.451, -66.539],
  Barranquitas: [18.186, -66.306], Bayamón: [18.398, -66.155], 'Cabo Rojo': [18.087, -67.146],
  Caguas: [18.234, -66.035], Camuy: [18.484, -66.845], Canóvanas: [18.379, -65.901],
  Carolina: [18.381, -65.957], Cataño: [18.441, -66.118], Cayey: [18.112, -66.166],
  Ceiba: [18.264, -65.648], Ciales: [18.336, -66.469], Cidra: [18.176, -66.161],
  Coamo: [18.08, -66.358], Comerío: [18.219, -66.226], Corozal: [18.341, -66.317],
  Culebra: [18.303, -65.302], Dorado: [18.459, -66.268], Fajardo: [18.326, -65.652],
  Florida: [18.363, -66.561], Guánica: [17.972, -66.908], Guayama: [17.984, -66.114],
  Guayanilla: [18.019, -66.792], Guaynabo: [18.357, -66.111], Gurabo: [18.254, -65.973],
  Hatillo: [18.486, -66.825], Hormigueros: [18.14, -67.127], Humacao: [18.15, -65.827],
  Isabela: [18.501, -67.024], Jayuya: [18.219, -66.592], 'Juana Díaz': [18.053, -66.507],
  Juncos: [18.228, -65.921], Lajas: [18.05, -67.059], Lares: [18.295, -66.878],
  'Las Marías': [18.252, -66.992], 'Las Piedras': [18.183, -65.866], Loíza: [18.432, -65.88],
  Luquillo: [18.373, -65.717], Manatí: [18.428, -66.492], Maricao: [18.181, -66.98],
  Maunabo: [18.007, -65.899], Mayagüez: [18.201, -67.139], Moca: [18.395, -67.113],
  Morovis: [18.326, -66.407], Naguabo: [18.212, -65.735], Naranjito: [18.301, -66.245],
  Orocovis: [18.227, -66.391], Patillas: [18.004, -66.016], Peñuelas: [18.056, -66.721],
  Ponce: [18.011, -66.614], Quebradillas: [18.474, -66.939], Rincón: [18.34, -67.25],
  'Río Grande': [18.38, -65.831], 'Sabana Grande': [18.078, -66.961], Salinas: [17.977, -66.298],
  'San Germán': [18.081, -67.041], 'San Juan': [18.466, -66.106], 'San Lorenzo': [18.19, -65.961],
  'San Sebastián': [18.337, -66.99], 'Santa Isabel': [17.966, -66.405], 'Toa Alta': [18.388, -66.248],
  'Toa Baja': [18.444, -66.254], 'Trujillo Alto': [18.355, -66.007], Utuado: [18.266, -66.701],
  'Vega Alta': [18.412, -66.331], 'Vega Baja': [18.444, -66.388], Vieques: [18.126, -65.44],
  Villalba: [18.127, -66.492], Yabucoa: [18.05, -65.879], Yauco: [18.035, -66.85],
};

/** Distancia en millas entre dos pueblos (fórmula de haversine). */
export function milesBetween(a: string, b: string): number {
  const pa = pueblos[a];
  const pb = pueblos[b];
  if (!pa || !pb) return Infinity;
  const rad = Math.PI / 180;
  const dLat = (pb[0] - pa[0]) * rad;
  const dLng = (pb[1] - pa[1]) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(pa[0] * rad) * Math.cos(pb[0] * rad) * Math.sin(dLng / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(h));
}

/** Pueblo más cercano a unas coordenadas (para "Usar mi ubicación"). */
export function nearestPueblo(lat: number, lng: number): string {
  let best = 'San Juan';
  let bestD = Infinity;
  for (const [name, [plat, plng]] of Object.entries(pueblos)) {
    const d = (plat - lat) ** 2 + (plng - lng) ** 2;
    if (d < bestD) {
      bestD = d;
      best = name;
    }
  }
  return best;
}

/** Texto corto de distancia: "en el pueblo", "≈ 6 mi". */
export function distanceLabel(miles: number): string {
  if (!Number.isFinite(miles)) return '';
  if (miles < 1.5) return 'en tu pueblo';
  return `a ≈ ${Math.round(miles)} mi`;
}

export const RADIUS_OPTIONS = [5, 10, 25, 50, 0] as const; // 0 = toda la isla
