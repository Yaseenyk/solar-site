import type { Metadata } from "next";
import Link from "next/link";
import GuidePage from "@/components/GuidePage";
import LeadForm from "@/components/LeadForm";
import { Sources } from "@/components/Sourced";
import { FACTS } from "@/lib/facts";
import { SITE_URL } from "@/lib/site";

const TITLE = "How to Apply for PM Surya Ghar Rooftop Solar, Step by Step";
const DESC = "The application steps for the PM Surya Ghar rooftop solar subsidy: national portal, choosing a registered vendor, agreeing the price, and tracking progress.";
const PATH = "/pm-surya-ghar-apply/";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${SITE_URL}${PATH}` } };

const FAQS = [
  { q: "Where do I apply?", a: "On the National Portal for Rooftop Solar run by MNRE (pmsuryaghar.gov.in). Use the official address, not a lookalike." },
  { q: "Do I choose the installer?", a: "Yes. You select a registered vendor of your choice on the portal and agree the installation price with them directly." },
];

export default function Page() {
  return (
    <GuidePage
      title={TITLE}
      description={DESC}
      path={PATH}
      crumb="How to apply"
      faqs={FAQS}
      answer={
        <p>
          Apply online on the <a href={FACTS.officialPortal.value}>National Portal for Rooftop Solar</a>, pick a registered vendor, agree the installation price
          with that vendor, then track the application on the portal. You pay for the system first; the subsidy follows.
        </p>
      }
    >
      <h2>The steps</h2>
      <ol>
        <li><strong>Register on the national portal</strong> and apply online for your home.</li>
        <li><strong>Select a registered vendor</strong> of your choice. Only registered vendors are covered by the scheme.</li>
        <li><strong>Agree the installation price directly with the vendor.</strong> The price is between you and them; compare at least three written quotes.</li>
        <li><strong>Track the application on the portal</strong> as the installation and inspection move forward.</li>
      </ol>
      <p>
        The portal and your electricity distribution company (DISCOM) set the details for each stage, and they can differ by state. Follow the portal&apos;s
        current instructions for those, because I do not list stage timings I cannot source.
      </p>

      <h2>Before you pay the vendor</h2>
      <ul>
        <li>Put the system size, panel make and the total price in writing.</li>
        <li>Check that the modules meet the domestic content rule.</li>
        <li>Run the quote through the <Link href="/solar-subsidy-calculator/">calculator</Link> to see the cost after subsidy and the payback.</li>
      </ul>

      <h2>Not sure about a quote?</h2>
      <LeadForm context="apply" />

      <Sources keys={["officialPortal", "capexOnly", "domesticContent"]} />
    </GuidePage>
  );
}
