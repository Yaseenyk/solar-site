/**
 * Every number the site states lives here, with where it came from and the day it was checked.
 * Pages import from this file instead of typing figures inline, and scripts/verify-facts.mjs
 * fails the build if an entry loses its source or its date. When a rule changes, change it here once.
 */
export interface Fact {
  /** Plain-language claim. */
  text: string;
  value: number | string;
  source: string;
  sourceName: string;
  checked: string;
}

const CHECKED = "2026-11-04";
const SQ_2026 = "https://solarquarter.com/2026/09/01/pm-surya-ghar-scheme-mnre-details-rooftop-solar-subsidy-guidelines-for-residential-consumers/";
const SQ_2024 = "https://solarquarter.com/2024/03/18/india-launches-pm-surya-ghar-muft-bijli-yojana-with-%e2%82%b975021-crore-outlay-for-rooftop-solar-power-adoption";
const PORTAL = "https://pmsuryaghar.gov.in/";
const LOGIN = "https://consumer.pmsuryaghar.gov.in/consumer/";
// The Ministry's own operational guidelines (7 June 2024). The PDF is a copy hosted by JBVNL, a state DISCOM.
const GUIDE = "https://jbvnl.co.in/SOLAR/Operational%20Guidelines%20to%20PM%20Suryaghar%207%20June%2024.pdf";
const GUIDE_NAME = "MNRE Operational Guidelines for PM Surya Ghar (7 June 2024)";

export const FACTS = {
  ratePerKwFirstTwo: {
    text: "Central subsidy per kW for the first 2 kW of a residential system",
    value: 30000,
    source: GUIDE,
    sourceName: GUIDE_NAME,
    checked: CHECKED,
  },
  rateThirdKw: {
    text: "Central subsidy for the additional (third) kW",
    value: 18000,
    source: GUIDE,
    sourceName: GUIDE_NAME,
    checked: CHECKED,
  },
  maxSubsidy: {
    text: "Maximum central subsidy per household (capped at 3 kW)",
    value: 78000,
    source: GUIDE,
    sourceName: GUIDE_NAME,
    checked: CHECKED,
  },
  specialFirstTwo: {
    text: "Subsidy per kW for the first 2 kW in special category states and UTs",
    value: 33000,
    source: GUIDE,
    sourceName: GUIDE_NAME,
    checked: CHECKED,
  },
  specialThirdKw: {
    text: "Subsidy for the third kW in special category states and UTs",
    value: 19800,
    source: GUIDE,
    sourceName: GUIDE_NAME,
    checked: CHECKED,
  },
  societyRate: {
    text: "Subsidy per kW for common facilities of a housing society or RWA, up to 500 kW",
    value: 18000,
    source: GUIDE,
    sourceName: GUIDE_NAME,
    checked: CHECKED,
  },
  outlayCrore: {
    text: "Total outlay of the scheme, in rupees crore",
    value: 75021,
    source: SQ_2024,
    sourceName: "SolarQuarter, 18 Mar 2024",
    checked: CHECKED,
  },
  targetHomes: {
    text: "Target: households with rooftop solar by FY 2026-27",
    value: "one crore (10 million)",
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  cabinetApproval: {
    text: "Union Cabinet approval date",
    value: "29 February 2024",
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026 (other reports give 15 Feb 2024 for the launch)",
    checked: CHECKED,
  },
  capexOnly: {
    text: "The residential subsidy applies to the capex model: you pay the installation cost first",
    value: "capex model",
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  domesticContent: {
    text: "Subsidised modules must be domestically manufactured using domestic cells",
    value: "Domestic Content Requirement",
    source: GUIDE,
    sourceName: GUIDE_NAME,
    checked: CHECKED,
  },
  claimDays: {
    text: "Days within which the subsidy is processed after the DISCOM approves the application",
    value: 15,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 6(t)",
    checked: CHECKED,
  },
  cmcYears: {
    text: "Years of free repair and maintenance the registered vendor must provide from commissioning",
    value: 5,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 7(d)",
    checked: CHECKED,
  },
  deemedKw: {
    text: "Systems up to this size (kW) are deemed accepted without a DISCOM technical feasibility approval, once the state has put the rule into practice",
    value: 10,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 6(h)",
    checked: CHECKED,
  },
  benchmarkFirstTwo: {
    text: "Benchmark cost per kW for the first 2 kW (from 13 Feb 2024)",
    value: 50000,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 5(g)",
    checked: CHECKED,
  },
  benchmarkThirdKw: {
    text: "Benchmark cost for the additional kW (from 13 Feb 2024)",
    value: 45000,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 5(g)",
    checked: CHECKED,
  },
  benchmarkSpecialFirstTwo: {
    text: "Benchmark cost per kW for the first 2 kW in special category states and UTs",
    value: 55000,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 5(g)",
    checked: CHECKED,
  },
  benchmarkSpecialThirdKw: {
    text: "Benchmark cost for the additional kW in special category states and UTs",
    value: 49500,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 5(g)",
    checked: CHECKED,
  },
  consumerLogin: {
    text: "Official consumer login and registration page",
    value: LOGIN,
    source: LOGIN,
    sourceName: "PM Surya Ghar consumer portal, MNRE",
    checked: CHECKED,
  },
  officialPortal: {
    text: "Official national portal for applications",
    value: PORTAL,
    source: PORTAL,
    sourceName: "National Portal for Rooftop Solar, MNRE",
    checked: CHECKED,
  },
} satisfies Record<string, Fact>;

export type FactKey = keyof typeof FACTS;

export const rupees = (n: number) => "₹" + n.toLocaleString("en-IN");

/** Special category states and UTs named in the scheme guidelines. */
export const SPECIAL_CATEGORY = [
  "North-Eastern states (including Sikkim)",
  "Uttarakhand",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Ladakh",
  "Andaman & Nicobar Islands",
  "Lakshadweep",
];
