import type { Block } from "@/lib/content";
import type { PageKey } from "@/lib/i18n";

/**
 * Sections that exist in English only. They are deliberately kept out of src/content/i18n/*.json:
 * verify-i18n requires every key in every language, and new guide text is never machine-translated.
 * The other twelve languages simply do not show these sections until a native reader has translated them
 * (then they move into the JSON files). Figures use the same {{tokens}} as the JSON content, so they still
 * come from facts.ts with their sources.
 */
export interface EnExtra {
  /** Insert the blocks after this index of the page's own blocks. */
  after: number;
  blocks: Block[];
  faqs?: { q: string; a: string }[];
  /** Extra facts used by these sections, added to the page's source list. */
  sourceKeys: string[];
  /** Day these English sections were written or last changed. */
  updated: string;
}

export const EN_EXTRA: Partial<Record<PageKey, EnExtra>> = {
  calculator: {
    after: 6,
    updated: "2026-11-19",
    sourceKeys: ["specialThirdKw", "claimDays", "benchmarkFirstTwo", "benchmarkThirdKw", "cmcYears", "sizeByUnits", "societyRate"],
    blocks: [
      { t: "h2", x: "The sums in detail" },
      { t: "p", x: "The calculator does four sums, in this order, inside your browser. It uses the same code that builds the subsidy and cost tables on the rest of this site, so a figure here cannot drift from a figure there." },
      { t: "h3", x: "1. Central subsidy" },
      { t: "p", x: "The size you enter is capped at 3 kW, because the guidelines give a home no central subsidy beyond 3 kW. The first 2 kW earn {{fact:ratePerKwFirstTwo}} per kW and the part between 2 and 3 kW earns {{fact:rateThirdKw}} per kW. Part kilowatts count in proportion, the same way the Ministry's own worked examples do. If you tick the special category box, the rates become {{fact:specialFirstTwo}} and {{fact:specialThirdKw}}." },
      { t: "ul", items: [
        "1.5 kW: {{sub:1.5}} (the guidelines' first worked example)",
        "2.5 kW: {{sub:2.5}} (their second example)",
        "3 kW: {{sub:3}}, the most a household can get",
        "6 kW: still {{sub:6}}; the extra 3 kW earn nothing",
        "3 kW in a special category state or UT: {{sub:3:s}}",
      ] },
      { t: "h3", x: "2. Cost after subsidy" },
      { t: "p", x: "Your quote minus the subsidy, never below zero. This is what the system finally costs you, not what you pay on the day: under the scheme you pay the vendor the full amount first, and the subsidy reaches your bank account after the DISCOM has inspected the plant and you have redeemed the subsidy on the portal. The guidelines say it is processed within {{num:claimDays}} days of the DISCOM's approval." },
      { t: "h3", x: "3. Price per kW" },
      { t: "p", x: "The quote divided by the full size you entered (not the capped size). Compare it with the Ministry's benchmark cost: {{fact:benchmarkFirstTwo}} per kW for the first 2 kW and {{fact:benchmarkThirdKw}} for the additional kW, which makes {{bench:3}} for a 3 kW system. The benchmark is a reference figure fixed from 13 February 2024, not a price cap and not a market survey. If a quote is far above it, ask the vendor to break the price down by part: modules, inverter, structure, wiring and the metering work. The [cost guide](/solar-system-cost-india-subsidy/) shows the table for 1, 2 and 3 kW." },
      { t: "h3", x: "4. Payback" },
      { t: "p", x: "Yearly saving is your monthly bill × 12 × the share of the bill you expect the system to remove. Payback is the cost after subsidy divided by that yearly saving. If the saving works out to zero, the calculator shows n/a instead of dividing by zero." },
      { t: "h2", x: "Choosing the inputs" },
      { t: "ul", items: [
        "**System size.** The official portal suggests a size from your average monthly consumption: {{num:sizeByUnits}}. Your units per month are printed on your electricity bill.",
        "**Quote.** Use the vendor's all-in price for the whole job, including the structure and metering, not the price of the panels alone.",
        "**Monthly bill.** An average of several months is more honest than your highest summer bill.",
        "**Share of the bill removed.** This is your guess, and it drives the payback more than anything else. A bill usually carries fixed charges and taxes that solar does not remove, so the share stays below 100% even when the panels cover all your units. Try two or three values and see how much the payback moves.",
      ] },
      { t: "h2", x: "What the calculator leaves out" },
      { t: "ul", items: [
        "State top-ups. Where a state adds its own subsidy on top of the central one, it is not included, because it differs by state and changes over time.",
        "Loan interest. If you borrow, interest adds to the real cost; see [the loan guide](/pm-surya-ghar-loan-rooftop-solar/).",
        "Tariff and net metering rules. How exported units are credited depends on your state's rules; see [net metering](/rooftop-solar-net-metering-india/).",
        "Maintenance. The registered vendor must repair and maintain the plant free of cost for {{num:cmcYears}} years from commissioning, so those years should not cost you extra; later years are not modelled.",
        "Housing societies. Common facilities of a society or RWA get {{fact:societyRate}} per kW on different limits; the [housing society guide](/pm-surya-ghar-housing-society-rwa/) explains that sum.",
      ] },
    ],
    faqs: [
      { q: "Does the calculator include my state's subsidy?", a: "No. It shows the central subsidy only, from the rates in the Ministry's guidelines. If your state adds its own, check it with your DISCOM and subtract it yourself." },
      { q: "Why does the subsidy stop at 3 kW?", a: "The guidelines give no central subsidy for residential capacity beyond 3 kW, so a 5 kW system gets the same {{fact:maxSubsidy}} as a 3 kW one. You can still install more; you pay for the extra yourself." },
      { q: "Is the payback figure a promise?", a: "No. It is your bill and your own guess of how much of it the system removes, put through one division. It ignores tariff changes, loan interest and panel ageing." },
    ],
  },
  home: {
    after: 5,
    updated: "2026-11-19",
    sourceKeys: ["benchmarkFirstTwo", "claimDays", "deemedKw", "cmcYears", "schemeEnd", "domesticContent", "societyRate"],
    blocks: [
      { t: "h2", x: "The scheme in six facts" },
      { t: "ul", items: [
        "**Subsidy:** {{fact:ratePerKwFirstTwo}} per kW for the first 2 kW, {{fact:rateThirdKw}} for the third, so {{sub:1}} for 1 kW, {{sub:2}} for 2 kW and {{sub:3}} for 3 kW or more. Special category states and UTs get a higher rate ([details](/pm-surya-ghar-subsidy/)).",
        "**Benchmark cost:** the Ministry's reference cost is {{fact:benchmarkFirstTwo}} per kW for the first 2 kW, which puts a 3 kW system at {{bench:3}} before subsidy and {{net:3}} after ([cost guide](/solar-system-cost-india-subsidy/)).",
        "**You pay first:** the subsidy is paid back to your bank account after the DISCOM inspects the plant, within {{num:claimDays}} days of its approval according to the guidelines ([status guide](/pm-surya-ghar-subsidy-status/)).",
        "**Made in India panels:** only modules that meet the {{num:domesticContent}} qualify ([technical rules](/rooftop-solar-technical-specifications-india/)).",
        "**Free upkeep:** the registered vendor must repair and maintain the plant free for {{num:cmcYears}} years from commissioning ([choosing a vendor](/pm-surya-ghar-vendor-guide/)).",
        "**Deadline:** the scheme runs until {{num:schemeEnd}} ([scheme details](/pm-surya-ghar-scheme-details/)).",
      ] },
      { t: "h2", x: "Find the guide for your question" },
      { t: "ul", items: [
        "Living in a flat? A housing society or RWA can claim {{fact:societyRate}} per kW for common facilities: [housing society guide](/pm-surya-ghar-housing-society-rwa/).",
        "Short of cash up front? [Loans for rooftop solar](/pm-surya-ghar-loan-rooftop-solar/) under the scheme.",
        "Wondering what happens to units you do not use? [Net metering](/rooftop-solar-net-metering-india/).",
        "Comparing installers? [How to choose a vendor](/pm-surya-ghar-vendor-guide/) and what to check in the contract.",
        "Want the numbers behind one result? [How the calculator works](/solar-subsidy-calculator/), sum by sum.",
      ] },
      { t: "h2", x: "How this guide stays accurate" },
      { t: "p", x: "Every figure on this site is stored once with its source and the date it was checked, and the build fails if one loses either. They are re-checked against the Ministry's operational guidelines and the official portal, and the source list at the bottom of each page shows the date of the last check. Each underlined figure links to the document it comes from. [About this guide](/about/) lists every source and what was taken from it." },
    ],
  },
};
