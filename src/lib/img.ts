/**
 * Las fotos (publicaciones y anuncios) existen en 800 px y en una versión de 400 px (`-400.webp`)
 * para tarjetas y miniaturas: pesan una cuarta parte y el celular gasta mucha menos memoria.
 */
const HAS_SMALL = /\/img\/(productos\/fotos|anuncios)\/[^/]+\.webp$/;

export const isPhotoSrc = (src?: string) => !!src && !src.endsWith('.svg');

/** Versión de 400 px si existe; si no (ilustración SVG, foto subida), la misma imagen. */
export const smallSrc = (src: string) => (HAS_SMALL.test(src) && !src.endsWith('-400.webp') ? src.replace(/\.webp$/, '-400.webp') : src);
