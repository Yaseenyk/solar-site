# AdSense readiness changes, solar.streamerosai.com (16 Nov 2026)

Context: the parent domain streamerosai.com was rejected for "Low-value content"; subdomains are judged with it. Policy notes: `portfolio/docs/adsense-readiness-2026-11-16.md`. Ads stay OFF (`AD_MODE = "off"`, empty `ADSENSE_CLIENT`); this repo has no `verify-no-ads` script (only the other sites do), and nothing here turns ads on.

## Audit (word counts of the visible `<main>` in the built `out/`, 170 HTML files)

| Group | Pages | Words (en) | Verdict |
|---|---|---|---|
| Guides: subsidy, cost, scheme details, apply, status, vendor guide, specs, net metering, loan, RWA | 10 x 13 languages | 490 to 1,010 in English (translations 370 to 1,200 depending on script) | Substantive, sourced, FAQ per page. Keep. |
| Home | 13 | 345 en | Short hub with the answer box, tables and links. Acceptable as a hub, thin in some scripts (277 to 400). |
| Calculator | 13 | 253 en | A working tool plus explanation. Thinnest guide page; see weaknesses. |
| Privacy | 13 | 200 en | Real policy but missing the visit counter and an owner/contact trail; updated below. |
| About / Contact / Terms | 0 (404) | - | Missing. Added below. |

Duplicate or templated pages: none found. The 13 language versions are translations of one guide, they carry `hreflang`, `INDEXED_LANGS` lists all 13 (the owner confirmed each with native readers on 13 Nov), and a language outside that list would still get `noindex` and be left out of the sitemap and hreflang. That logic in `src/lib/meta.ts`, `src/app/sitemap.ts` and `src/lib/site.ts` is untouched. No stubs, no placeholder text, no "under construction". Internal link check over every built page: 0 broken links.

## Changes

| Page | Before | After |
|---|---|---|
| `/about/` | 404 | New, English, about 1,100 words: who runs it (Yaseen Khatib, solo, Hyderabad), what the site is and is not, how numbers are sourced and the build gate, a generated list of every source document with the claims taken from it and the date checked (read from `src/lib/facts.ts`, so it cannot drift), language policy, money and ads, corrections. |
| `/contact/` | 404 | New: email, what to write about (wrong figure, translation error, data deletion), what cannot be helped with, what not to send. |
| `/terms/` | 404 | New: information not advice, figures can be out of date, no affiliation with MNRE/DISCOMs/vendors, external links, calculator and form, reuse, advertising, governing law. |
| `/privacy/` (13 languages) | Calculator, form, analytics (GA, Clarity), advertising paragraphs | Analytics paragraph gains one sentence on the first-party visit counter (no cookies, no IP, nothing typed, 90-day retention, off with Do Not Track or Global Privacy Control). Translated into the 12 other languages in the same block; `verify-i18n` passes. The advertising paragraph already covered Google ads, cookies and the Google ad settings opt-out. |
| Footer, every page, every language | Privacy link only | Privacy plus About, Contact and Terms (English labels, `lang="en"`, because those three pages are English only). The language switcher on those pages goes to each language home. |
| `sitemap.xml` | 169 URLs | 172: the three new pages (English only, no hreflang). |

No page was merged, noindexed or removed. No translation was removed.

## Gates

`npm run build` (next build, llms-full, verify-facts: 34 facts all sourced and dated, verify-i18n: 12 translations match) and `npm run lint` pass. No gate was changed.

## Remaining weaknesses

- Calculator page (about 250 words in English) and the home hub are the thinnest indexable pages. They were not extended because any new block in `en.json` must be mirrored in all 12 translations, and I did not machine-translate new guide text into languages the owner has to vouch for. A "how the calculator works" section written in English and translated by the owner's native readers is the best next step.
- About, Contact and Terms exist in English only; a Hindi reader gets English trust pages. Honest and disclosed on About, but not ideal.
- The privacy sentence was translated by the assistant into 12 languages; the owner's native readers should skim it.
- All figures were last checked on 4 Nov 2026. Scheme rules change, so a re-check of `facts.ts` is overdue soon. A site that shows a stale "updated" date reads as unmaintained.
- Thirteen languages of one guide is a lot of near-parallel text on one small site. It is legitimate (real translations, hreflang), but a reviewer sees 170 pages for one scheme.
- Lead form on the site collects name, email, phone, state; Terms and Privacy describe it, but the AdSense reviewer may still weigh it.

## Honest assessment

The site was already one of the stronger ones: sourced figures, a build gate against unsourced numbers, real depth. The clear policy gap was missing About, Contact and Terms, now fixed. Whether AdSense accepts the domain family depends on the domain-level review, not on this subdomain alone.

## Owner to-dos

1. Re-check `src/lib/facts.ts` against the portal and bump `CHECKED`.
2. Have a native reader skim the new privacy sentence (all 12 languages).
3. Confirm the About statements are true as written: no commission from vendors, no paid listings, and that the lead form data is not passed to installers.
4. Request the AdSense review only after all four sites are live with their trust pages.
