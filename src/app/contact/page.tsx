import { CONTACT_EMAIL, PORTFOLIO_URL } from "@/lib/site";
import TrustPage, { trustMetadata } from "@/components/TrustPage";

export const metadata = trustMetadata(
  "contact",
  "Contact Surya Ghar Guide: corrections, questions, privacy requests",
  "How to reach the person who runs Surya Ghar Guide: email for corrections, translation fixes, privacy requests and questions about the site, and what this site cannot help with.",
);

export default function Page() {
  return (
    <TrustPage
      slug="contact"
      crumb="Contact"
      title="Contact"
      lead={`The best way to reach me is email: ${CONTACT_EMAIL}. I read every message myself. This is a one-person site, so a reply can take a few days.`}
    >
      <h2>Write to me about</h2>
      <ul>
        <li><strong>A wrong or outdated figure.</strong> Send the page address, the figure you think is wrong and, if you have it, a link to the official document. Corrections are checked against the source and the date on the page is updated.</li>
        <li><strong>A translation mistake</strong> in Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese or Urdu. Tell me the language, the page and the sentence.</li>
        <li><strong>Your data.</strong> If you sent the second-opinion form and want what you typed deleted, email from the same address you used. See the <a href="/privacy/">privacy policy</a>.</li>
        <li><strong>The site itself:</strong> something broken, a page that does not load on your phone, or a question about how the calculator works.</li>
      </ul>

      <h2>What I cannot help with</h2>
      <ul>
        <li>I am not the government and cannot see, approve, speed up or change any application. For your application status use the consumer login on the <a href="https://pmsuryaghar.gov.in/" rel="noopener">official portal</a>, or contact your DISCOM. The guide page on subsidy status explains the stages.</li>
        <li>I do not sell, install or recommend a particular vendor, and I cannot verify a quote you have received beyond what the calculator shows.</li>
        <li>I cannot give legal or financial advice.</li>
      </ul>

      <h2>Please do not send</h2>
      <p>Aadhaar numbers, bank details, OTPs or passwords. I never need them and will not ask for them.</p>

      <h2>About the author</h2>
      <p>
        The site is built and maintained by <a href={`${PORTFOLIO_URL}/`}>Yaseen Khatib</a> in Hyderabad. More about the site is on the <a href="/about/">about page</a>.
      </p>
    </TrustPage>
  );
}
