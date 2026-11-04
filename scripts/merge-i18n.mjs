// Folds the translated fragments in src/content/i18n/_new/<lang>.json into <lang>.json (pages only),
// and adds ui.moreGuides. Run once after the fragments pass `verify-i18n.mjs --new`; then delete _new/.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/content/i18n";
const MORE = {
  en: "More guides", hi: "और गाइड", bn: "আরও গাইড", mr: "आणखी मार्गदर्शक", te: "మరిన్ని గైడ్‌లు", ta: "மேலும் வழிகாட்டிகள்",
  gu: "વધુ માર્ગદર્શિકાઓ", kn: "ಇನ್ನಷ್ಟು ಮಾರ್ಗದರ್ಶಿಗಳು", ml: "കൂടുതൽ ഗൈഡുകൾ", pa: "ਹੋਰ ਗਾਈਡ", or: "ଅଧିକ ଗାଇଡ୍", as: "অধিক গাইড", ur: "مزید گائیڈز",
};
for (const f of readdirSync(join(DIR, "_new")).filter((x) => x.endsWith(".json"))) {
  const lang = f.replace(".json", "");
  const main = JSON.parse(readFileSync(join(DIR, `${lang}.json`), "utf-8"));
  const frag = JSON.parse(readFileSync(join(DIR, "_new", f), "utf-8"));
  Object.assign(main.pages, frag.pages);
  main.ui.moreGuides = MORE[lang];
  writeFileSync(join(DIR, `${lang}.json`), JSON.stringify(main, null, 2) + "\n");
  console.log("merged", lang, Object.keys(frag.pages).join(","));
}
