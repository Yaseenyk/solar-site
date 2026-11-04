import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site collects, why, and who can see it.",
  alternates: { canonical: `${SITE_URL}/privacy/` },
};

export default function Privacy() {
  return (
    <article className="prose-guide">
      <h1 className="text-3xl font-bold text-zinc-50">Privacy</h1>
      <h2>The calculator</h2>
      <p>Runs in your browser. The numbers you type are not sent anywhere.</p>
      <h2>The form</h2>
      <p>
        If you send the second-opinion form, your name, email, optional phone, state and message are stored so I can reply. I do not sell them or share them with
        installers. Ask for deletion any time at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <h2>Analytics</h2>
      <p>
        Google Analytics counts visits and clicks, including which site or campaign sent you. Microsoft Clarity may record anonymised sessions (clicks and
        scrolling); text typed into forms is masked. Both set cookies or local storage. Block them in your browser if you prefer.
      </p>
    </article>
  );
}
