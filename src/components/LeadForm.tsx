"use client";

import { useState } from "react";
import { CONCIERGE_URL, CONTACT_EMAIL } from "@/lib/site";

type State = "idle" | "sending" | "done" | "error";

const field = "w-full rounded-lg border border-zinc-700 bg-zinc-900/70 px-3 py-2.5 text-zinc-100 focus:border-cyan focus:outline-none";

/** Quote-review request. Stored by the shared concierge worker; if it is unreachable the visitor is given an email fallback. */
export default function LeadForm({ context = "quote-review" }: { context?: string }) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("company")) return; // honeypot
    setState("sending");
    let ok = false;
    try {
      if (CONCIERGE_URL) {
        const res = await fetch(`${CONCIERGE_URL}/api/lead`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "solar",
            name: f.get("name"),
            email: f.get("email"),
            phone: f.get("phone"),
            interest: f.get("state"),
            context,
            message: f.get("message") || "(no message)",
            page: window.location.pathname,
          }),
        });
        ok = res.ok;
      }
    } catch {
      ok = false;
    }
    if (ok) {
      window.gaEvent?.("generate_lead", { form_name: "solar-lead", cta_text: context });
      setState("done");
    } else {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="rounded-xl border border-cyan/40 bg-cyan/10 p-5 text-zinc-100">Thanks, I have your details and will reply by email.</p>;
  }

  return (
    <form onSubmit={onSubmit} data-clarity-mask="True" className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-zinc-400">Name<input name="name" required autoComplete="name" className={field} /></label>
        <label className="text-sm text-zinc-400">Email<input name="email" type="email" required autoComplete="email" className={field} /></label>
        <label className="text-sm text-zinc-400">Phone (optional)<input name="phone" inputMode="tel" autoComplete="tel" className={field} /></label>
        <label className="text-sm text-zinc-400">State<input name="state" required className={field} /></label>
      </div>
      <label className="text-sm text-zinc-400">
        Your quote, system size, or question
        <textarea name="message" rows={4} className={field} />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button
        disabled={state === "sending"}
        className="rounded-lg bg-cyan px-5 py-3 font-semibold text-ink transition hover:opacity-90 disabled:opacity-50"
      >
        {state === "sending" ? "Sending…" : "Ask for a free second opinion"}
      </button>
      {state === "error" && (
        <p className="text-sm text-amber-300">
          Could not send it from here. Please email <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> instead.
        </p>
      )}
      <p className="text-xs text-zinc-500">Used only to reply to you. See the <a href="/privacy/" className="underline">privacy notice</a>. This is advice on reading a quote, not an installation service.</p>
    </form>
  );
}

declare global {
  interface Window {
    gaEvent?: (name: string, params?: Record<string, unknown>) => void;
  }
}
