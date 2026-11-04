/** Production base URL: canonical links, OpenGraph, JSON-LD, sitemap. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://solar.streamerosai.com";

export const SITE_NAME = "Surya Ghar Guide";

/** The author's portfolio. Links to it are deliberate and few. */
export const PORTFOLIO_URL = "https://yk.streamerosai.com";

export const SITE_DESCRIPTION =
  "An independent guide to the PM Surya Ghar rooftop solar subsidy: what you get per kW, how to apply, how to check your status, and a calculator to test a vendor's quote. Every number links to its source.";

/** Search-engine verification codes. Empty strings are omitted from the page. */
export const VERIFICATION = { google: "", bing: "" };

/** GA4 measurement ID and Clarity project ID. Create a new GA4 web stream for
 *  solar.streamerosai.com, paste the G- ID here; empty means the tag is not emitted. */
export const GA_ID = "";
export const CLARITY_ID = "";

export const CONTACT_EMAIL = "contact@streamerosai.com";

/** Shared Cloudflare worker that stores leads; it allow-lists the origin. */
export const CONCIERGE_URL = process.env.NEXT_PUBLIC_CONCIERGE_URL ?? "";

/** Not a government site, and the pages must always say so. */
export const DISCLAIMER =
  "This is an independent guide, not a government website and not affiliated with MNRE or the PM Surya Ghar portal. Rules and rates change: confirm on the official portal before you pay anyone.";
