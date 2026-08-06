import { PRODUCT } from '../data/site.mjs';
import { ADVERTISED_CAPABILITIES } from '../data/commands.mjs';
import { API_FACTS } from '../data/research.mjs';
import { ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `Is there a Godel Terminal Excel plugin or add-in?`,
    a: `No. No Excel add-in, plugin or formula language is documented anywhere on the vendor's site or in its command documentation. What is documented is export: FA, EQS, HP and IPO write their output to Excel CSV or JSON files that you open in Excel yourself.`,
  },
  {
    q: `Can I get live prices in Excel from Godel Terminal?`,
    a: `Not via any documented route. Exports are snapshots, not live links, and the vendor's terms prohibit scraping and automated retrieval — so building your own live bridge is against the rules as well as undocumented. If a live-linked sheet is a hard requirement, this is currently the wrong tool for that job.`,
  },
  {
    q: `What can I actually export from Godel Terminal?`,
    a: `Four documented commands export to Excel CSV or JSON: <strong>FA</strong> (income statement, balance sheet, cash flow), <strong>EQS</strong> (screener result sets), <strong>HP</strong> (historical prices as daily or intraday OHLCV tables) and <strong>IPO</strong> (upcoming and recent IPO calendars).`,
  },
  {
    q: `Do exports cost extra?`,
    a: `The docs attach no separate price to exporting. The one documented gate is on the data itself: HP's intraday resolutions require an entitlement on top of the base subscription. Beyond that, nothing about export pricing is published.`,
  },
];

export const page = {
  path: '/godel-terminal-excel/',
  title: `Godel Terminal Excel Integration: What Is Documented`,
  description: `Excel is one of Godel Terminal's advertised capabilities and FA exports financial statements. What the documentation supports, and what remains unstated.`,
  summary: 'No Excel add-in exists for Godel Terminal; what is documented is export — FA, EQS, HP and IPO write Excel CSV/JSON. The export-and-model workflow, honestly framed.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-excel/', label: 'Excel' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    return `
<h1>Godel Terminal and Excel: exports, not an add-in</h1>

<p class="lede">There is no ${esc(PRODUCT.name)} Excel add-in. "Excel" appears verbatim on the
vendor's advertised capability list, and what the documentation behind that word supports is
<strong>export</strong>: four commands write their output to Excel CSV or JSON files. The workflow
is export-and-model — pull a snapshot, build in your own spreadsheet — not live-linked cells.</p>

<h2>What "Excel" means on the vendor's site</h2>

<p class="prose">${esc(PRODUCT.name)}'s homepage names ${ADVERTISED_CAPABILITIES.length} capabilities,
and "${esc(ADVERTISED_CAPABILITIES.find((c) => c === 'Excel'))}" is one of them. That single word is
easy to over-read. Checked against the command documentation, the substance behind it is export
functionality on specific commands — there is no add-in installer, no formula reference, no
plugin page anywhere we can find. We would rather define the word precisely than let it imply a
product that is not documented to exist.</p>

<h2>The documented exports</h2>

${table({
  head: ['Command', 'What you get', 'Format'],
  rows: [
    { cells: ['<strong class="mono">FA</strong>', 'Income statement, balance sheet and cash-flow statement, quarterly and annual', 'Excel CSV / JSON'] },
    { cells: ['<strong class="mono">EQS</strong>', 'Equity screener result sets', 'Excel CSV / JSON'] },
    { cells: ['<strong class="mono">HP</strong>', 'Historical prices as daily or intraday OHLCV tables (intraday resolutions require an entitlement)', 'Excel CSV / JSON'] },
    { cells: ['<strong class="mono">IPO</strong>', 'Upcoming and recent IPO calendars', 'Excel CSV / JSON'] },
  ],
  caption: 'Export support as stated in the vendor command documentation, August 2026.',
})}

<p class="prose">That set covers the classic fundamental workflow well: screen with EQS, pull FA for
the names that survive, pull HP for the price history, and model in your own sheet. Each command is
covered with provenance in the <a href="/godel-terminal-commands/">command reference →</a></p>

<h2>How this differs from the legacy live-plugin workflow</h2>

<p class="prose">Legacy terminals ship live-linked Excel add-ins — formulas in the sheet pull current
values and keep them current. ${esc(PRODUCT.name)} documents no equivalent: no
add-in, no formula language, no live link between terminal and spreadsheet. An export is a
snapshot; refreshing it means exporting again. For periodic model updates that is a
non-issue. For a sheet that has to tick, it is disqualifying — and worth knowing before you
subscribe, not after. The broader capability gap is mapped in
<a href="/godel-terminal-vs-bloomberg/">the Bloomberg comparison →</a></p>

${note(`<strong>Also worth knowing:</strong> ${esc(API_FACTS.tosNote)} So the unofficial workaround
— scripting your own data bridge into Excel — is prohibited, not merely undocumented.`, { warn: true })}

<h2>If you need more than snapshots</h2>

<p class="prose">Programmatic access is its own honest-no story: no public API exists, with a
community roadmap mention and an enterprise hint but nothing documented. The full sourced picture
is on <a href="/godel-terminal-api/">the API page →</a> And before deciding whether the export set
covers your universe at all, check <a href="/godel-terminal-data-coverage/">what data the terminal
actually carries →</a></p>

${ctaRow({ secondary: { href: '/godel-terminal-data-coverage/', label: 'Data coverage in full' } })}

${faqSection(faqs)}
`;
  },
};
