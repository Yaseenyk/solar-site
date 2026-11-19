import { AD_MODE, ADSENSE_CLIENT, adsAllowed } from "@/lib/site";

/**
 * The AdSense loader. Rendered per page (from Chrome) rather than in the root layout, because only the page knows its
 * language: pages in a language AdSense does not support (see ADSENSE_LANGS) never load it, even with AD_MODE "live".
 */
export default function AdScript({ lang }: { lang: string }) {
  if (AD_MODE !== "live" || !ADSENSE_CLIENT || !adsAllowed(lang)) return null;
  return <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous" />;
}
