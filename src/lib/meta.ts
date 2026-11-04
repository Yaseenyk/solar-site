import type { Metadata } from "next";
import { getContent, availableLangs } from "./content";
import { PAGES, hreflang, pagePath, type PageKey } from "./i18n";
import { SITE_URL } from "./site";
import { plain } from "./rich";

/** Title, description, canonical and hreflang alternates for one page in one language. */
export function pageMetadata(lang: string, key: PageKey): Metadata {
  const c = getContent(lang);
  const p = c.pages[key];
  const slug = PAGES.find((x) => x.key === key)!.slug;
  const url = `${SITE_URL}${pagePath(lang, slug)}`;
  const languages: Record<string, string> = {};
  for (const l of availableLangs()) languages[hreflang(l)] = `${SITE_URL}${pagePath(l, slug)}`;
  languages["x-default"] = `${SITE_URL}${pagePath("en", slug)}`;
  const description = plain(p.description);
  return {
    title: key === "home" ? { absolute: `${p.metaTitle} | ${c.ui.siteName}` } : p.metaTitle,
    description,
    alternates: { canonical: url, languages },
    openGraph: { type: "website", url, title: p.metaTitle, description, siteName: c.ui.siteName, locale: lang === "en" ? "en_IN" : `${lang}_IN` },
  };
}
