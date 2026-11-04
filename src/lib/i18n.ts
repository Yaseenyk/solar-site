/** The pages, in nav order. `slug` is the same in every language; "" is the home page. */
export const PAGES = [
  { key: "home", slug: "" },
  { key: "subsidy", slug: "pm-surya-ghar-subsidy" },
  { key: "cost", slug: "solar-system-cost-india-subsidy" },
  { key: "scheme", slug: "pm-surya-ghar-scheme-details" },
  { key: "apply", slug: "pm-surya-ghar-apply" },
  { key: "status", slug: "pm-surya-ghar-subsidy-status" },
  { key: "vendor", slug: "pm-surya-ghar-vendor-guide" },
  { key: "specs", slug: "rooftop-solar-technical-specifications-india" },
  { key: "metering", slug: "rooftop-solar-net-metering-india" },
  { key: "loan", slug: "pm-surya-ghar-loan-rooftop-solar" },
  { key: "rwa", slug: "pm-surya-ghar-housing-society-rwa" },
  { key: "calculator", slug: "solar-subsidy-calculator" },
  { key: "privacy", slug: "privacy" },
] as const;

export type PageKey = (typeof PAGES)[number]["key"];

/** Languages in the order the switcher shows them. A language is only published when its file exists in src/content/i18n. */
export const LANG_ORDER = ["en", "hi", "bn", "mr", "te", "ta", "gu", "kn", "ml", "pa", "or", "as", "ur"] as const;
export type LangCode = (typeof LANG_ORDER)[number];

export const DEFAULT_LANG: LangCode = "en";

/** URL of a page in a language. English lives at the root, the others under /<lang>/. */
export function pagePath(lang: string, slug: string): string {
  const tail = slug ? `${slug}/` : "";
  return lang === DEFAULT_LANG ? `/${tail}` : `/${lang}/${tail}`;
}

/** Turn an internal link written in the content (e.g. "/privacy/") into the same page in this language. */
export function localizeHref(lang: string, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  return lang === DEFAULT_LANG ? href : `/${lang}${href}`;
}

/** BCP 47 tag used for hreflang and og:locale. */
export function hreflang(lang: string): string {
  return lang === "en" ? "en-IN" : lang;
}
