import type { Metadata } from "next";
import GuidePage from "@/components/GuidePage";
import { Sources } from "@/components/Sourced";
import { FACTS } from "@/lib/facts";
import { SITE_URL } from "@/lib/site";

const TITLE = "PM Surya Ghar Subsidy Status: How to Check Your Application";
const DESC = "Where to check your PM Surya Ghar application and subsidy status, what to have ready, and what to do if the status does not move.";
const PATH = "/pm-surya-ghar-subsidy-status/";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${SITE_URL}${PATH}` } };

const FAQS = [
  { q: "Can I check status without logging in?", a: "Application progress is tracked on the National Portal after you log in with the mobile number you registered. This site cannot see your application." },
  { q: "Who do I contact if my subsidy is delayed?", a: "Start with the vendor who installed the system and your electricity distribution company (DISCOM), then raise it through the portal's help options." },
];

export default function Page() {
  return (
    <GuidePage
      title={TITLE}
      description={DESC}
      path={PATH}
      crumb="Check status"
      faqs={FAQS}
      answer={
        <p>
          Log in to the <a href={FACTS.officialPortal.value}>National Portal for Rooftop Solar</a> with the mobile number you registered with. Application
          progress is tracked there. This site cannot see your application, and no one else can check it for you.
        </p>
      }
    >
      <h2>What to have ready</h2>
      <ul>
        <li>The mobile number you registered with (the portal sends an OTP to it).</li>
        <li>Your electricity consumer number.</li>
        <li>The vendor&apos;s name and your application reference.</li>
      </ul>

      <h2>If the status does not move</h2>
      <ol>
        <li>Ask the vendor which stage the file is waiting at; many delays are a missing document.</li>
        <li>Ask your DISCOM about inspection or net-metering, which are theirs to complete.</li>
        <li>Use the portal&apos;s help options and keep a screenshot of each status with its date.</li>
      </ol>
      <p>
        Be careful with websites, calls or messages offering to &quot;speed up&quot; or &quot;release&quot; your subsidy for a fee. The subsidy is paid through the official process.
      </p>

      <Sources keys={["officialPortal"]} />
    </GuidePage>
  );
}
