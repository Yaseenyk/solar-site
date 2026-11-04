/** Production base URL: canonical links, OpenGraph, JSON-LD, sitemap. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://solar.streamerosai.com";

export const SITE_NAME = "Surya Ghar Guide";

/** The author's portfolio. Links to it are deliberate and few. */
export const PORTFOLIO_URL = "https://yk.streamerosai.com";

export const SITE_DESCRIPTION =
  "An independent guide to the PM Surya Ghar rooftop solar subsidy: what you get per kW, how to apply, how to check your status, and a calculator to test a vendor's quote. Every number links to its source.";

/** Search-engine verification codes. Empty strings are omitted from the page. */
export const VERIFICATION = { google: "OG5PRiRPw3I5jB5p-G7nDzf_mlxdiZzrpLaFYCZ0p1M", bing: "" };

/** GA4 measurement ID and Clarity project ID. Create a new GA4 web stream for
 *  solar.streamerosai.com, paste the G- ID here; empty means the tag is not emitted. */
export const GA_ID = "";
export const CLARITY_ID = "";

export const CONTACT_EMAIL = "contact@streamerosai.com";

/** Shared Cloudflare worker that stores leads; it allow-lists the origin. */
export const CONCIERGE_URL = process.env.NEXT_PUBLIC_CONCIERGE_URL ?? "";

/**
 * Google AdSense. Every ad space on the site is an <AdSlot slot="..."/>.
 *   "preview": draws a labelled, dashed placeholder where each ad will go (current setting, to review the layout)
 *   "live":    loads AdSense and fills the slots; needs ADSENSE_CLIENT and, per slot, an ad unit id in AD_UNITS
 *   "off":     renders nothing visible (the slot names stay in the markup as data-ad-slot)
 * AdSense also needs public/ads.txt with your publisher line once the account is approved.
 */
export const AD_MODE: "preview" | "live" | "off" = "preview";
export const ADSENSE_CLIENT = ""; // "ca-pub-XXXXXXXXXXXXXXXX"
export const AD_UNITS: Record<string, string> = {}; // slot name -> AdSense ad unit id (data-ad-slot)
