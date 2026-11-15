import { CONTACT_EMAIL } from "@/lib/site";
import TrustPage, { trustMetadata } from "@/components/TrustPage";

export const metadata = trustMetadata(
  "terms",
  "Terms of use: Surya Ghar Guide",
  "The terms for using Surya Ghar Guide: information only and not advice, the figures can be out of date, no affiliation with the government, links to other sites, and how to ask for a correction.",
);

export default function Page() {
  return (
    <TrustPage
      slug="terms"
      crumb="Terms"
      title="Terms of use"
      lead="Surya Ghar Guide is free information about a government scheme. By using it you accept these terms. They are short because the site is simple: please read the first two sections before you act on any figure."
    >
      <h2>Information only, not advice</h2>
      <p>
        The guide and the calculator explain the PM Surya Ghar rooftop solar subsidy in general terms. They are not legal, financial, tax or engineering advice and they are not an offer, a quotation or a guarantee that you will receive a subsidy. Your eligibility, your subsidy and the timing of payment are decided by the government of India, your state and your electricity distribution company (DISCOM).
      </p>

      <h2>Figures can be out of date</h2>
      <p>
        Scheme rules change. Each figure on the site carries a link to its source and the date I checked it, and the pages show when they were last updated. Before you pay a vendor or sign anything, confirm the current rules on the official portal at pmsuryaghar.gov.in or with your DISCOM. I do my best to keep the guide correct but give no warranty that it is complete or current, and I am not liable for decisions made on the strength of it.
      </p>

      <h2>No affiliation</h2>
      <p>
        This is an independent site. It is not run by, endorsed by or connected to the Ministry of New and Renewable Energy, the Government of India, any state agency, any DISCOM, or any solar vendor or lender. Names of schemes and bodies are used only to describe them.
      </p>

      <h2>Links to other sites</h2>
      <p>
        The guide links to official documents and a few other websites so you can check the figures. I do not control those sites and am not responsible for their content or availability.
      </p>

      <h2>The calculator and the form</h2>
      <p>
        The calculator runs in your browser and gives an estimate from the published rates. Real quotes depend on your roof, your state and your vendor. If you send the second-opinion form, you agree that I may use what you typed to reply to you; see the <a href="/privacy/">privacy policy</a> for how it is stored and deleted. Please do not submit anything unlawful or anyone else&apos;s personal data.
      </p>

      <h2>Content and reuse</h2>
      <p>
        The text of the guide and the translations were written for this site. You may quote short passages with a link back to the page. Please do not copy whole pages or republish the translations without asking. The underlying facts come from public government documents and are not owned by me.
      </p>

      <h2>Advertising</h2>
      <p>
        The site does not show ads today. If it does in future, ads will be labelled and served by Google AdSense; the privacy policy describes the cookies involved and how to opt out of personalised ads. Advertisers have no influence on what the guide says.
      </p>

      <h2>Changes and contact</h2>
      <p>
        I may update these terms; the date at the top of the page shows the latest version. Questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or use the <a href="/contact/">contact page</a>. These terms are governed by the laws of India.
      </p>
    </TrustPage>
  );
}
