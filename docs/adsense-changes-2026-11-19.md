# AdSense revamp, solar.streamerosai.com (19 Nov 2026)

Follows `docs/adsense-changes-2026-11-16.md`. The owner lifted the content freeze on 19 Nov 2026. Ads stay OFF (`AD_MODE = "off"`, empty `ADSENSE_CLIENT`, no ad code added). No translation was added or machine-translated.

## 1. Facts re-check (`src/lib/facts.ts`)

| Source | Reached? | What was checked |
|---|---|---|
| MNRE Operational Guidelines, 7 June 2024 (JBVNL copy): https://jbvnl.co.in/SOLAR/Operational%20Guidelines%20to%20PM%20Suryaghar%207%20June%2024.pdf | Yes, PDF fetched 19 Nov 2026, text extracted and re-read | Every value sourced to it matches the text: 30,000 / 18,000 per kW, 78,000 cap, special 33,000 / 19,800, GHS/RWA 18,000 (special 19,800) per kW up to 500 kW at 3 kW per house, benchmark 50,000 / 45,000 (special 55,000 / 49,500), 15 days claim processing (6(t)), 10 kW deemed feasibility (6(h)), 5 years CMC (7(d)), 31 March 2027 end (2(d)), 13 Feb 2024 start (2(c)), 300 units (3(b)), 1 crore active applications (8(c)), 30 days grievance (11(a)), 11,814 crore Phase II (4(a)), PR 75%, module warranty 5 years, fill factor 75%, 8 ft elevated clearance, 600 mm mounting clearance, DCR. |
| National portal: https://pmsuryaghar.gov.in/ | Yes (HTTP 200). WebFetch got 403, so the page text was read from the portal's own published JavaScript bundle (the page is a single-page app) | Live text says: Rs. 30,000 per kW up to 2 kW; Rs. 18,000 per kW for additional capacity up to 3 kW; Rs. 78,000 total subsidy for systems larger than 3 kW; GHS/RWA Rs. 18,000 per kW, EV charging, up to 500 kW, @3 kW per house; "For special states, an additional 10% Subsidy will be applicable per kW" (so 33,000 / 19,800); "Scheme closes on 31 March 2027"; target of 1 crore solar rooftops; DCR undertaking certificate mandatory; plant size by consumption (0-150 units: 1-2 kW; 150-300: 2-3 kW; >300: above 3 kW). |
| Consumer login: https://consumer.pmsuryaghar.gov.in/consumer/ | Yes (HTTP 200) | Still the official login URL. |
| mnre.gov.in (scheme and rooftop pages) | No, timed out twice | Could not check for amendments published only on MNRE's site after June 2024. Values left as they were; the portal agrees on all the money figures and the end date. |

Changes in `facts.ts`:

- `CHECKED` 2026-11-04 to 2026-11-19 (all entries were re-read in their source today; a comment in the file records what was compared).
- The four facts that cited SolarQuarter (a trade publication) now cite the official guidelines, which state the same values: outlay Rs 75,021 crore (section 1(a), 1(b) table), target of 1 crore installations by FY 2026-27 (1(a), 3(a)), approval on 29 February 2024 (1(a)), capex mode (2(a)). The cabinet-approval label now reads "Date the Government of India approved the scheme", matching the guideline's wording. No values changed.
- New fact `sizeByUnits` (portal's size-by-consumption table), sourced to the portal, checked 2026-11-19.
- `verify-facts`: 35 facts, all sourced and dated.

## 2. Pages

| Page | Change | Why |
|---|---|---|
| `/solar-subsidy-calculator/` (English) | About 250 to 1,040 words. New "The sums in detail" (subsidy with the cap and pro rata rule, five worked results computed by the same code, cost after subsidy and when the money arrives, price per kW against the benchmark, payback formula and the n/a case), "Choosing the inputs" (portal's size-by-units table, what to put in each field), "What the calculator leaves out" (state top-ups, loan interest, net metering, CMC years, societies), three FAQs (also in FAQPage JSON-LD). Updated date and article `dateModified` 2026-11-19. | Thinnest indexable page; describes exactly what `src/lib/subsidy.ts` and `Calculator.tsx` do, with every figure from `facts.ts`. |
| `/` home (English) | About 345 to 660 words. New "The scheme in six facts" (subsidy, benchmark, pay-first and claim days, DCR, CMC, deadline, each linking to its guide), "Find the guide for your question" (links to the six guides the hub did not link: RWA, loan, net metering, vendor, calculator), "How this guide stays accurate". | Thin hub with links to only four of eleven guides. |
| `/about/` | Dropped "plus a trade publication" (no longer true); Languages paragraph now says a few newer English sections appear in other languages only after native translation. | Accuracy. |
| All pages, all languages | Source lists show "checked 2026-11-19"; the source tooltip for the four ex-SolarQuarter facts names the guideline section. | Fact re-check. |
| 12 non-English languages, home and calculator | No change: they do not show the new sections. | New text is never machine-translated. |

How the English-only text works: `src/content/en-extra.ts` holds the new blocks and FAQs; `PageView` merges them only when `lang === "en"`. They are outside `src/content/i18n/*.json`, so `verify-i18n` (12 translations match en.json) is unaffected, and the other languages render exactly as before. To translate later, move a section into `en.json` and all twelve language files together.

## 3. Checks on the built `out/`

- `npm run build` (next build, llms-full, verify-facts, verify-i18n) and `npm run lint` pass.
- robots: `index, follow` on English and Hindi calculator and home (all 13 languages stay indexable, as decided on 13 Nov); only the 404 is noindex. robots.txt unchanged.
- sitemap: 172 URLs (unchanged); hreflang: 13 languages plus x-default on each guide page, 2,366 `xhtml:link` entries in the sitemap (unchanged).
- New sections present in `out/index.html` and `out/solar-subsidy-calculator/index.html`, absent in `hi/` and `ta/` versions. No unresolved `{{tokens}}`, no "solarquarter" left in any page.

## 4. What remains

- Non-English calculator pages are still short (Hindi about 270 words) and indexed. Options for the owner: have native readers translate the new calculator section (then move it into the JSON files), or noindex the non-English calculator pages until then.
- About, Contact and Terms remain English only.
- mnre.gov.in was unreachable; a manual look at MNRE's notifications page for any post-June 2024 amendment is still worth doing.
- The guideline PDF is a DISCOM-hosted copy (JBVNL). An MNRE-hosted URL would be a stronger citation if one can be found from a browser.
- 13 languages of one guide is still a large parallel footprint for a small site; legitimate, but a reviewer sees about 170 pages for one scheme.

## Owner to-dos

1. Decide on the non-English calculator pages (translate the new section or noindex them).
2. Skim the new English sections on the home and calculator pages.
3. Check mnre.gov.in for any amendment to the PM Surya Ghar guidelines after June 2024.

## 5. Ad code gated by language (second change, 19 Nov 2026)

Ads stay OFF (`AD_MODE = "off"`, empty `ADSENSE_CLIENT`); this change only makes sure that, when ads are switched on later, they can never appear on a page in a language AdSense does not support.

AdSense supported languages, read from https://support.google.com/adsense/answer/9727 on 19 Nov 2026, against the site's 13:

| Code | Language | On Google's list? |
|---|---|---|
| en | English | Yes |
| hi | Hindi | Yes |
| mr | Marathi | Yes |
| gu | Gujarati | Yes |
| bn | Bengali | Yes ("Bengali (Bangla)") |
| ta | Tamil | Yes |
| te | Telugu | Yes |
| kn | Kannada | Yes |
| ml | Malayalam | Yes |
| pa | Punjabi | Yes |
| ur | Urdu | Yes |
| or | Odia | **No** |
| as | Assamese | **No** |

What changed:

- `src/lib/site.ts`: new explicit allow-list `ADSENSE_LANGS` (the 11 supported codes, with the source URL and check date) and `adsAllowed(lang)`.
- The AdSense loader moved out of the root layout (which cannot know the page language) into `src/components/AdScript.tsx`, rendered per page by `Chrome` with the page's `lang`. It renders only when `AD_MODE === "live"`, `ADSENSE_CLIENT` is set and the language is on the allow-list.
- `AdSlot` now takes `lang` and returns nothing for a language not on the list, in every mode (off, preview, live). Odia and Assamese pages no longer carry even the empty `data-ad-slot` placeholders.
- New `scripts/verify-ad-langs.mjs`, run at the end of `npm run build` (so in CI on every deploy) and as `npm run check:ad-langs`. It works out the unsupported languages from `LANG_ORDER` minus `ADSENSE_LANGS`, finds each built page's language by folder and by the content wrapper's `lang` attribute, and fails if any such `.html` or RSC `.txt` file contains `adsbygoogle`, `pagead2.`, `googlesyndication`, `data-ad-client` or `data-ad-slot`. It also fails if `or` or `as` is ever added to the allow-list, or if it finds no pages for the unsupported languages (broken detection).

Indexing unchanged: Odia and Assamese pages stay `index, follow` and in the sitemap with hreflang. Google's documentation says unsupported-language pages cannot show ads; it does not say they must be removed, and they are real translations.

Checks:

- Run against the build from before the change, the new check failed (Assamese and Odia pages had `data-ad-slot` placeholders), so it does catch ad markup.
- `npm run build` passes: `verify-ad-langs: 52 built files in or, as (not AdSense-supported) carry no ad code` (13 pages x 2 languages x HTML and RSC payload). `npm run lint` passes.
- `out/index.html` and `out/hi/index.html`: 6 `data-ad-slot` placeholders (off mode, as before), no `pagead2`. `out/or/index.html`, `out/as/solar-subsidy-calculator/index.html`: 0 placeholders, no `pagead2`, robots `index, follow`.
- Not tested: a build with `AD_MODE = "live"`, because ads must not be switched on, even locally. The gate is a plain early return before any live branch, in both components.

## Privacy and crawl audit (19 Nov 2026)

Method: / and /hi/ loaded in headless Chromium with every third-party request and cookie recorded, /ml/ and
/mr/pm-surya-ghar-subsidy/ fetched raw, and `src/app/layout.tsx` read (not edited) for scripts injected later.

- Loaded on solar.streamerosai.com: Google Analytics 4 (googletagmanager.com, analytics.google.com,
  stats.g.doubleclick.net; cookies `_ga`, `_ga_9F1T1EQZBH`), Microsoft Clarity (clarity.ms, c.bing.com; cookies `_clck`,
  `_clsk`, plus Microsoft's `MUID`/`MR`/`SM`), Pulse (pulse.yaseenyk.workers.dev, no cookies). No AdSense request
  (`ADSENSE_CLIENT` is empty, so the gated loader stays off), no Google Fonts request.
- Privacy page fixed (English, `src/content/i18n/en.json`): the Pulse text missed what it records (country, network name,
  clicks, form name on submit) and the daily-rotating visitor code; Clarity's cookies and a GA opt-out were missing. The
  advertising paragraph said "This site may show ads"; it now says no ads run today and ads may come later (kept, not
  removed). The 12 translated privacy pages already name the same three services (GA, Clarity, the counter) and nothing
  that is not used; they do not yet carry the extra Pulse detail. Translating that is left for a reviewed translation
  pass rather than unreviewed machine text.
- Crawl: robots.txt allows crawling and names the sitemap. All 172 sitemap URLs return 200 (one, /pa/, timed out once and
  returned 200 on retry), none redirects, none is noindex, every canonical matches.
- Raw HTML: main text is in the static HTML (English home about 750 words, /mr/pm-surya-ghar-subsidy/ about 680).
