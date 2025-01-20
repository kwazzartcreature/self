import { getAbsoluteLocaleUrl } from "astro:i18n";

export const checkPath = (
  lang: string,
  currentPath: string,
  targetPath: string
) => {
  return (
    getAbsoluteLocaleUrl(lang, currentPath) ===
    getAbsoluteLocaleUrl(lang, targetPath)
  );
};
