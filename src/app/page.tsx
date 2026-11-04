import Link from "next/link";
import Calculator from "@/components/Calculator";
import LeadForm from "@/components/LeadForm";
import { Num, Sources } from "@/components/Sourced";

export default function Home() {
  return (
    <div className="prose-guide">
      <p className="font-mono text-sm text-cyan">Independent guide · not a government site</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight text-zinc-50 sm:text-5xl">
        How much subsidy will you actually get for rooftop solar?
      </h1>
      <p className="text-lg">
        Under PM Surya Ghar the central subsidy is <Num k="ratePerKwFirstTwo" /> per kW for the first 2 kW and <Num k="rateThirdKw" /> for a third kW, so a
        household can get at most <Num k="maxSubsidy" />. This site shows the arithmetic, the steps and the checks, and links every figure to its source.
      </p>

      <h2>Test a vendor&apos;s quote</h2>
      <p>Put in the size and the price you were quoted. Nothing you type leaves your browser.</p>
      <Calculator />

      <h2>Start here</h2>
      <ul>
        <li><Link href="/pm-surya-ghar-subsidy/">What the subsidy covers, by system size and state category</Link></li>
        <li><Link href="/pm-surya-ghar-apply/">How to apply, step by step</Link></li>
        <li><Link href="/pm-surya-ghar-subsidy-status/">How to check your application and subsidy status</Link></li>
      </ul>

      <h2>Want a second opinion on a quote?</h2>
      <p>Send the quote or a question. I will tell you what the numbers mean, not sell you a panel.</p>
      <LeadForm context="home" />

      <Sources keys={["ratePerKwFirstTwo", "rateThirdKw", "maxSubsidy"]} />
    </div>
  );
}
