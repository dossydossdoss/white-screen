import { toolOrder, translations, type Language, type ToolSlug } from "./i18n";

export function buildRelatedLinks(lang: Language, current: ToolSlug) {
  const prefix = lang === "en" ? "" : `/${lang}`;
  return toolOrder
    .filter((slug) => slug !== current)
    .map((slug) => {
      const label = translations[lang].tools[slug].h1;
      return { href: `${prefix}/${slug}`, label };
    });
}
