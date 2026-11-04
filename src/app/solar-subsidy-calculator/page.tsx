import type { Metadata } from "next";
import GuidePage from "@/components/GuidePage";
import Calculator from "@/components/Calculator";
import { Sources } from "@/components/Sourced";
import { SITE_URL } from "@/lib/site";

const TITLE = "Rooftop Solar Subsidy Calculator: Cost After Subsidy and Payback";
const DESC = "Enter your system size and a vendor's quote to see the PM Surya Ghar central subsidy, the cost after subsidy and a payback estimate. Runs in your browser.";
const PATH = "/solar-subsidy-calculator/";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${SITE_URL}${PATH}` } };

export default function Page() {
  return (
    <GuidePage
      title={TITLE}
      description={DESC}
      path={PATH}
      crumb="Calculator"
      answer={<p>Enter the size, the quote and your bill. The subsidy comes from the official rates; the payback uses your own estimate of how much of the bill the system removes.</p>}
    >
      <h2>Calculator</h2>
      <Calculator />
      <h2>How it works</h2>
      <ul>
        <li>Subsidy: the central rates, capped at 3 kW. State top-ups are not included.</li>
        <li>Cost after subsidy: your quote minus the subsidy.</li>
        <li>Payback: cost after subsidy divided by (monthly bill × 12 × the share you enter). It is a rough guide, not a guarantee.</li>
      </ul>
      <Sources keys={["ratePerKwFirstTwo", "rateThirdKw", "maxSubsidy", "specialFirstTwo"]} />
    </GuidePage>
  );
}
