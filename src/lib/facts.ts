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

// Re-checked 19 Nov 2026: every GUIDE figure was re-read in the PDF below (fetched that day), and the residential
// rates, the 78,000 cap, the GHS/RWA rate and limits, the extra 10% for special states, the 1 crore target and the
// 31 March 2027 closing date matched the text of the live national portal (pmsuryaghar.gov.in). mnre.gov.in timed
// out, so an amendment published only there after June 2024 could not be checked. Log: docs/adsense-changes-2026-11-19.md.
const CHECKED = "2026-11-19";
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
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 1(a) and 1(b)",
    checked: CHECKED,
  },
  targetHomes: {
    text: "Target: households with rooftop solar by FY 2026-27",
    value: "one crore (10 million)",
    source: GUIDE,
    sourceName: GUIDE_NAME + ", sections 1(a) and 3(a)",
    checked: CHECKED,
  },
  cabinetApproval: {
    text: "Date the Government of India approved the scheme",
    value: "29 February 2024",
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 1(a) (applications count from the 13 Feb 2024 launch)",
    checked: CHECKED,
  },
  capexOnly: {
    text: "The residential subsidy applies to the capex model: you pay the installation cost first",
    value: "capex model",
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 2(a)",
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
  schemeEnd: {
    text: "Implementation period of the scheme ends",
    value: "31 March 2027",
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 2(d)",
    checked: CHECKED,
  },
  startDate: {
    text: "Applications counted from the launch date",
    value: "13 February 2024",
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 2(c)",
    checked: CHECKED,
  },
  freeUnits: {
    text: "Objective: free or low-cost electricity for households, up to this many units per month",
    value: 300,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 3(b)",
    checked: CHECKED,
  },
  activeApplicationLimit: {
    text: "The portal accepts only this many active applications (fund-limited scheme)",
    value: "1 crore (10 million)",
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 8(c)",
    checked: CHECKED,
  },
  grievanceDays: {
    text: "Days within which a grievance raised on the portal is to be resolved",
    value: 30,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 11(a)",
    checked: CHECKED,
  },
  performanceRatio: {
    text: "Performance Ratio (percent) a plant must reach at commissioning, and keep during the 5-year warranty",
    value: 75,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", Annexure 2, clause 18",
    checked: CHECKED,
  },
  moduleWarrantyYears: {
    text: "Minimum years of manufacturer warranty against defects on solar modules",
    value: 5,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", Annexure 3, clause 1.10",
    checked: CHECKED,
  },
  fillFactor: {
    text: "Minimum module fill factor (percent)",
    value: 75,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", Annexure 3, clause 1.8",
    checked: CHECKED,
  },
  elevatedClearanceFeet: {
    text: "Minimum ground clearance (feet) for a system on an elevated structure",
    value: 8,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", Annexure 3",
    checked: CHECKED,
  },
  mountingClearanceMm: {
    text: "Minimum clearance (mm) of module mounting structures from the roof surface at the lowest point",
    value: 600,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", Annexure 3",
    checked: CHECKED,
  },
  societyPerHouseKw: {
    text: "kW of subsidised capacity counted per house in a housing society",
    value: 3,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 5(e), item 4",
    checked: CHECKED,
  },
  societyMaxKw: {
    text: "Maximum kW of common-facility capacity a society can get the subsidy on",
    value: 500,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 5(e), item 4",
    checked: CHECKED,
  },
  societySpecialRate: {
    text: "Subsidy per kW for society common facilities in special category states and UTs",
    value: 19800,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 5(e), item 4",
    checked: CHECKED,
  },
  phaseTwoOutlayCrore: {
    text: "Budget outlay of the earlier Grid Connected Rooftop Solar Phase II Programme, in rupees crore",
    value: 11814,
    source: GUIDE,
    sourceName: GUIDE_NAME + ", section 4(a)",
    checked: CHECKED,
  },
  sizeByUnits: {
    text: "Plant size the national portal suggests for a household, by average monthly consumption",
    value: "0 to 150 units a month: 1 to 2 kW; 150 to 300 units: 2 to 3 kW; above 300 units: above 3 kW",
    source: PORTAL,
    sourceName: "National Portal for Rooftop Solar, MNRE (table on the home page)",
    checked: "2026-11-19",
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
