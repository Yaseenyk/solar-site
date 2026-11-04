"use client";

import { useState } from "react";
import { evaluate, centralSubsidy } from "@/lib/subsidy";
import { rupees } from "@/lib/facts";
import { fill } from "@/lib/rich";
import type { Ui } from "@/lib/content";

const num = (s: string) => {
  const n = Number(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const field = "mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900/70 px-3 py-2.5 text-zinc-100 focus:border-cyan focus:outline-none";

export default function Calculator({ t }: { t: Ui["calc"] }) {
  const [kw, setKw] = useState("3");
  const [quote, setQuote] = useState("200000");
  const [bill, setBill] = useState("3000");
  const [cut, setCut] = useState("80");
  const [special, setSpecial] = useState(false);

  const r = evaluate({ quote: num(quote), kw: num(kw), special, monthlyBill: num(bill), billCut: Math.min(100, Math.max(0, num(cut))) / 100 });
  const over = num(kw) > 3;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-7" data-calculator>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-zinc-400">
          {t.size}
          <input inputMode="decimal" className={field} value={kw} onChange={(e) => setKw(e.target.value)} aria-describedby="kw-note" />
        </label>
        <label className="block text-sm text-zinc-400">
          {t.quote}
          <input inputMode="numeric" className={field} value={quote} onChange={(e) => setQuote(e.target.value)} />
        </label>
        <label className="block text-sm text-zinc-400">
          {t.bill}
          <input inputMode="numeric" className={field} value={bill} onChange={(e) => setBill(e.target.value)} />
        </label>
        <label className="block text-sm text-zinc-400">
          {t.cut}
          <input inputMode="numeric" className={field} value={cut} onChange={(e) => setCut(e.target.value)} />
        </label>
      </div>
      <label className="mt-3 flex min-h-11 items-start gap-3 py-2 text-sm text-zinc-300">
        <input type="checkbox" checked={special} onChange={(e) => setSpecial(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-cyan" />
        <span>{t.special}</span>
      </label>
      <p id="kw-note" className="mt-2 text-xs text-zinc-500">
        {over ? t.noteOver : fill(t.note, { kw: num(kw) || 0, amount: rupees(centralSubsidy(num(kw), special)) })}
      </p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <div className="rounded-xl bg-ink/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-zinc-500">{t.subsidy}</dt>
          <dd className="mt-1 text-2xl font-semibold text-cyan">{rupees(r.subsidy)}</dd>
        </div>
        <div className="rounded-xl bg-ink/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-zinc-500">{t.net}</dt>
          <dd className="mt-1 text-2xl font-semibold text-zinc-100">{rupees(r.net)}</dd>
        </div>
        <div className="rounded-xl bg-ink/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-zinc-500">{t.payback}</dt>
          <dd className="mt-1 text-2xl font-semibold text-zinc-100">{r.paybackYears === null ? t.na : fill(t.years, { n: r.paybackYears.toFixed(1) })}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm text-zinc-400">
        {fill(t.perKw, { amount: rupees(r.perKw) })} {t.footnote}
      </p>
    </div>
  );
}
