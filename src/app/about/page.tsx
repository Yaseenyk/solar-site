import { FACTS } from "@/lib/facts";
import { CONTACT_EMAIL, PORTFOLIO_URL } from "@/lib/site";
import TrustPage, { trustMetadata } from "@/components/TrustPage";

export const metadata = trustMetadata(
  "about",
  "About Surya Ghar Guide: who runs it and where the numbers come from",
  "An independent, one-person guide to the PM Surya Ghar rooftop solar subsidy. Who writes it, what it is not, which official documents the figures come from, and what it cannot tell you.",
);

/** Group every fact by its source so the page lists each document once with what was taken from it. */
function sourcesTable() {
  const by = new Map<string, { name: string; checked: string; claims: string[] }>();
  for (const f of Object.values(FACTS)) {
    const e = by.get(f.source) ?? { name: f.sourceName, checked: f.checked, claims: [] };
    e.claims.push(f.text);
    by.set(f.source, e);
  }
  return [...by];
}

export default function Page() {
  const sources = sourcesTable();
  return (
    <TrustPage
      slug="about"
      crumb="About"
      title="About Surya Ghar Guide"
      lead="Surya Ghar Guide is an independent guide to the PM Surya Ghar: Muft Bijli Yojana rooftop solar subsidy. It is written and maintained by one person, it is not a government site, and it does not sell solar systems."
    >
      <h2>Who runs it</h2>
      <p>
        I am <a href={`${PORTFOLIO_URL}/`}>Yaseen Khatib</a>, a software developer based in Hyderabad. I build this site on my own: I read the scheme documents, write the guide, build the calculator and answer the emails. There is no company, editorial team or sponsor behind it.
      </p>
      <p>
        I made it because the questions people ask about the scheme (how much subsidy for my system size, what happens after I apply, why my status has not moved) are answered in official documents that are long and spread over several places. The guide puts the figures that matter in one place and links every one of them to the document it came from, so you can check me instead of trusting me.
      </p>

      <h2>What this site is, and what it is not</h2>
      <ul>
        <li>It is an explainer and a calculator for homeowners and housing societies thinking about rooftop solar under the central scheme.</li>
        <li>It is not the official portal. Applications, the consumer login and vendor lists live on <a href={FACTS.officialPortal.source} rel="noopener">pmsuryaghar.gov.in</a>. This site never asks for your application ID, Aadhaar or bank details.</li>
        <li>It is not an installer, a lender or an agent. I do not take commission from vendors, and no vendor can pay to be listed or ranked here.</li>
        <li>It is not legal, financial or engineering advice. Treat the calculator as a way to test whether a quote is reasonable, not as a quotation.</li>
      </ul>

      <h2>How the numbers are kept honest</h2>
      <p>
        Every figure on the guide pages (subsidy per kW, benchmark cost, maximum subsidy, processing time, technical limits) is stored once in a single file together with its source link and the date I last checked it. The pages read from that file, so a number cannot be typed into a page without a source. The site build fails if an entry loses its source or its date. The subsidy and cost tables and the calculator compute their results from the same entries rather than from separate copies.
      </p>
      <p>
        The figures were last checked on {FACTS.rateThirdKw.checked}. Scheme rules change: subsidy rates, the benchmark cost, state-level procedures and the end date of the scheme ({String(FACTS.schemeEnd.value)}) can all be revised. Where a state or distribution company (DISCOM) works differently from the central rule, the official portal and your DISCOM decide, not this guide.
      </p>

      <h2>Where the figures come from</h2>
      <p>The guide relies on the Ministry of New and Renewable Energy (MNRE) operational guidelines and the official portal, plus a trade publication for the launch details. Each source below is listed with what was taken from it.</p>
      {sources.map(([url, s]) => (
        <section key={url}>
          <h3>
            <a href={url} rel="noopener">{s.name}</a> (checked {s.checked})
          </h3>
          <ul>
            {s.claims.map((c) => (
              <li key={c}>{c}.</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Languages</h2>
      <p>
        The guide is published in English and twelve Indian languages: Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese and Urdu. A translation changes the words, never the figures: an automated check compares every translated page with the English one and fails the build if a number, link or table differs. Each language was opened to search engines only after native readers had confirmed the translation reads correctly. If you find a translation error, tell me and I will fix it. This About page, the contact page and the terms are in English only.
      </p>

      <h2>Money</h2>
      <p>
        The site is free to read. It does not currently show advertising. I may apply for Google AdSense in future to cover running costs; if ads appear they will be labelled, kept out of the way of the guide text, and will never change what the guide says. The privacy page explains what is collected today and what would change.
      </p>

      <h2>Corrections and contact</h2>
      <p>
        If a figure is wrong, out of date or missing its source, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the page address and, if you can, a link to the official document. See also the <a href="/contact/">contact page</a>, the <a href="/privacy/">privacy policy</a> and the <a href="/terms/">terms of use</a>.
      </p>
    </TrustPage>
  );
}
