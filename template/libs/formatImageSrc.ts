export const formatImageSrc = <T extends string | undefined | null>(src: T): T | string => {
  if (!src || !src.startsWith('https://images.microcms-assets.io/assets/')) return src;

  const glue = src.includes('?') ? '&' : '?';
  return `${src}${glue}auto=compress`;
};
