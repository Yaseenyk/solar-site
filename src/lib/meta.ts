import type { Metadata } from "next";
import { getContent, availableLangs } from "./content";
import { PAGES, hreflang, pagePath, type PageKey } from "./i18n";
import { INDEXED_LANGS, SITE_URL } from "./site";
import { plain } from "./rich";

/** Whether Google is asked to index this language (see INDEXED_LANGS in site.ts). */
export const isIndexed = (lang: string) => INDEXED_LANGS.includes(lang);

/** Title, description, canonical and hreflang alternates for one page in one language. */
export function pageMetadata(lang: string, key: PageKey): Metadata {
  const c = getContent(lang);
  const p = c.pages[key];
  const slug = PAGES.find((x) => x.key === key)!.slug;
  const url = `${SITE_URL}${pagePath(lang, slug)}`;
  const description = plain(p.description);
  const base: Metadata = {
    // absolute: the titles are already written to fit a search result, so no site-name suffix is appended
    title: { absolute: p.metaTitle },
    description,
    openGraph: { type: "website", url, title: p.metaTitle, description, siteName: c.ui.siteName, locale: lang === "en" ? "en_IN" : `${lang}_IN` },
  };
  // A language that is not indexed yet: live for visitors, hidden from search, and not advertised in hreflang.
  if (!isIndexed(lang)) return { ...base, alternates: { canonical: url }, robots: { index: false, follow: true } };

  const languages: Record<string, string> = {};
  for (const l of availableLangs().filter(isIndexed)) languages[hreflang(l)] = `${SITE_URL}${pagePath(l, slug)}`;
  languages["x-default"] = `${SITE_URL}${pagePath("en", slug)}`;
  return { ...base, alternates: { canonical: url, languages } };
}
