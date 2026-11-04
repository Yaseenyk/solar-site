import Link from "next/link";
import { getContent, availableLangs } from "@/lib/content";
import { pagePath, hreflang } from "@/lib/i18n";
import { PORTFOLIO_URL } from "@/lib/site";

/**
 * Header, language switcher and footer around a page. The wrapper carries the page's language and direction.
 * Phone layout: brand and language button on one row, the five main links as a swipeable row of 44px pills below.
 * The language list opens as a full-width two-column panel under the header (never off-screen, whatever the script).
 */
export default function Chrome({ lang, slug, children }: { lang: string; slug: string; children: React.ReactNode }) {
  const c = getContent(lang);
  const langs = availableLangs();
  const nav = [
    { href: pagePath(lang, "pm-surya-ghar-subsidy"), label: c.ui.nav.subsidy },
    { href: pagePath(lang, "solar-system-cost-india-subsidy"), label: c.ui.nav.cost },
    { href: pagePath(lang, "pm-surya-ghar-apply"), label: c.ui.nav.apply },
    { href: pagePath(lang, "pm-surya-ghar-subsidy-status"), label: c.ui.nav.status },
    { href: pagePath(lang, "solar-subsidy-calculator"), label: c.ui.nav.calculator },
  ];
  return (
    <div lang={hreflang(lang)} dir={c.meta.dir} className="overflow-x-clip">
      <header className="relative border-b border-zinc-800/70">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 px-4 sm:px-6" aria-label="Main">
          <Link href={pagePath(lang, "")} className="order-1 inline-flex min-h-11 items-center py-1 font-semibold text-zinc-50">
            ☀ {c.ui.siteName}
          </Link>

          <details className="order-2 ms-auto md:order-3 md:ms-0">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg border border-zinc-700 px-3 text-sm text-zinc-200 hover:border-zinc-500 [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true">🌐</span> {c.meta.name}
            </summary>
            <ul
              className="absolute inset-x-3 top-full z-20 mt-1 grid max-h-[70vh] grid-cols-2 gap-1 overflow-y-auto rounded-xl border border-zinc-700 bg-ink p-2 shadow-2xl sm:inset-x-auto sm:end-6 sm:w-80"
              aria-label={c.ui.language}
            >
              {langs.map((l) => (
                <li key={l}>
                  <Link
                    href={pagePath(l, slug)}
                    hrefLang={hreflang(l)}
                    lang={hreflang(l)}
                    className={`flex min-h-11 items-center rounded-lg px-3 text-sm hover:bg-zinc-800 ${l === lang ? "bg-zinc-900 font-semibold text-cyan" : "text-zinc-300"}`}
                  >
                    {getContent(l).meta.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <div className="order-3 -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 md:order-2 md:mx-0 md:w-auto md:flex-1 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-zinc-800 bg-zinc-900/60 px-4 text-sm text-zinc-300 hover:border-cyan hover:text-zinc-50 md:border-transparent md:bg-transparent md:px-3"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <footer className="mx-auto mt-12 w-full max-w-5xl border-t border-zinc-800/60 px-4 py-8 text-sm text-zinc-500 sm:mt-16 sm:px-6 sm:py-10">
        <p className="leading-relaxed">{c.ui.disclaimer}</p>
        <p className="mt-3 leading-relaxed">
          © {new Date().getFullYear()} {c.ui.siteName}. {c.ui.written} <a href={`${PORTFOLIO_URL}/`} className="text-zinc-300 underline">Yaseen Khatib</a> ·{" "}
          <Link href={pagePath(lang, "privacy")} className="inline-block py-2 underline">{c.ui.privacy}</Link>
        </p>
      </footer>
    </div>
  );
}
