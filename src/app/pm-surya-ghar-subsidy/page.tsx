import type { Metadata } from "next";
import Link from "next/link";
import GuidePage from "@/components/GuidePage";
import { Num, Sources } from "@/components/Sourced";
import { FACTS, rupees, SPECIAL_CATEGORY } from "@/lib/facts";
import { centralSubsidy } from "@/lib/subsidy";
import { SITE_URL } from "@/lib/site";

const TITLE = "PM Surya Ghar Subsidy: Amount per kW, Cap and Examples";
const DESC = "How much central subsidy PM Surya Ghar pays for 1, 2, 3 kW rooftop solar, the 78,000 cap, special category state rates and worked examples, with sources.";
const PATH = "/pm-surya-ghar-subsidy/";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${SITE_URL}${PATH}` } };

const SIZES = [1, 2, 2.5, 3, 5];

const FAQS = [
  {
    q: "What is the maximum subsidy under PM Surya Ghar?",
    a: `${rupees(FACTS.maxSubsidy.value)} per household, for a system of 3 kW. Capacity above 3 kW gets no extra central subsidy.`,
  },
  {
    q: "Is the subsidy paid before or after installation?",
    a: "After. The residential subsidy applies to the capex model, which means you pay the installation cost first.",
  },
  {
    q: "Do the panels have to be made in India?",
    a: "Yes. Subsidised modules must meet the Domestic Content Requirement: domestically manufactured, using domestic cells.",
  },
];

export default function Page() {
  return (
    <GuidePage
      title={TITLE}
      description={DESC}
      path={PATH}
      crumb="Subsidy"
      faqs={FAQS}
      answer={
        <p>
          The central subsidy is <Num k="ratePerKwFirstTwo" /> per kW for the first 2 kW plus <Num k="rateThirdKw" /> for the third kW, capped at 3 kW, so the most
          any household gets is <Num k="maxSubsidy" />. Special category states and UTs get <Num k="specialFirstTwo" /> and <Num k="specialThirdKw" />.
        </p>
      }
    >
      <h2>Subsidy by system size</h2>
      <p>Worked from the rates above. Your state may add its own top-up on top; this table is the central part only.</p>
      <table>
        <thead>
          <tr><th>System</th><th>Normal states</th><th>Special category</th></tr>
        </thead>
        <tbody>
          {SIZES.map((kw) => (
            <tr key={kw}>
              <td>{kw} kW{kw > 3 ? " (capped at 3 kW)" : ""}</td>
              <td>{rupees(centralSubsidy(kw))}</td>
              <td>{rupees(centralSubsidy(kw, true))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>The arithmetic</h2>
      <p>
        For 2.5 kW in a normal state: 2 kW × {rupees(FACTS.ratePerKwFirstTwo.value)} + 0.5 kW × {rupees(FACTS.rateThirdKw.value)} = {rupees(centralSubsidy(2.5))}.
        You can try your own size in the <Link href="/solar-subsidy-calculator/">calculator</Link>.
      </p>

      <h2>Special category states and UTs</h2>
      <ul>{SPECIAL_CATEGORY.map((s) => <li key={s}>{s}</li>)}</ul>

      <h2>Housing societies and RWAs</h2>
      <p>
        For common facilities (lifts, lights, pumps), the subsidy is <Num k="societyRate" /> per kW, up to 500 kW.
      </p>

      <h2>What to know before you sign with a vendor</h2>
      <ul>
        <li>You pay the full price first and the subsidy follows, so check the vendor&apos;s quote against the net cost, not only the subsidy.</li>
        <li>Modules must meet the domestic content rule, or the system may not qualify.</li>
        <li>Apply on the <a href={FACTS.officialPortal.value}>official portal</a>, not through a middleman who asks for an advance &quot;subsidy fee&quot;.</li>
      </ul>

      <Sources keys={["ratePerKwFirstTwo", "specialFirstTwo", "societyRate", "capexOnly", "domesticContent", "officialPortal"]} />
    </GuidePage>
  );
}
