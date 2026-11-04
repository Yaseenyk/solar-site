import type { MetadataRoute } from "next";
import { INDEXED_LANGS, SITE_URL } from "@/lib/site";
import { availableLangs } from "@/lib/content";
import { PAGES, hreflang, pagePath } from "@/lib/i18n";
import { routeDate } from "@/lib/lastmod";

export const dynamic = "force-static";

const FALLBACK = "2026-11-04";

/** Every page in every language, each carrying its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const langs = availableLangs().filter((l) => INDEXED_LANGS.includes(l)); // only languages cleared for indexing
  return PAGES.flatMap((p) =>
    langs.map((lang) => {
      const languages: Record<string, string> = {};
      for (const l of langs) languages[hreflang(l)] = `${SITE_URL}${pagePath(l, p.slug)}`;
      languages["x-default"] = `${SITE_URL}${pagePath("en", p.slug)}`;
      return {
        url: `${SITE_URL}${pagePath(lang, p.slug)}`,
        lastModified: routeDate(`src/content/i18n/${lang}.json`, FALLBACK),
        changeFrequency: p.key === "home" ? ("weekly" as const) : ("monthly" as const),
        priority: p.key === "privacy" ? 0.2 : p.key === "home" ? 1 : lang === "en" ? 0.8 : 0.7,
        alternates: { languages },
      };
    }),
  );
}
