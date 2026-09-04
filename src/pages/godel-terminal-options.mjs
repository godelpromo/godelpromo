import { PRODUCT, PRICING } from '../data/site.mjs';
import { PLATFORMS, ROADMAP, API_FACTS, VENDOR_PAGES } from '../data/research.mjs';
import { COMMANDS, ALIASES, CORRECTIONS } from '../data/commands.mjs';
import { ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const OMON = COMMANDS.find((c) => c.mnemonic === 'OMON');
const OVME = COMMANDS.find((c) => c.mnemonic === 'OVME');
const G = COMMANDS.find((c) => c.mnemonic === 'G');
const FOCUS = COMMANDS.find((c) => c.mnemonic === 'FOCUS');
const AL = COMMANDS.find((c) => c.mnemonic === 'AL');
const EQS = COMMANDS.find((c) => c.mnemonic === 'EQS');

const optionAliases = ALIASES.filter((a) => a.canonical === 'OMON');
const optCorrection = CORRECTIONS.find((c) => c.was.startsWith('OPT'));

/**
 * Read off godelterminal.com/docs/commands/omon and /ovme on 3 September 2026.
 * Held as constants so the prose below cannot drift from what the doc pages say.
 */
const OMON_COLUMNS = ['Last', 'Bid', 'Ask', 'Volume', 'IV'];
const OMON_GREEKS = ['Delta', 'Gamma', 'Vega', 'Theta', 'Rho', 'Lambda', 'Epsilon'];
const OVME_GREEKS = ['Delta', 'Gamma', 'Vega', 'Theta', 'Rho'];
const DEFAULT_STRIKES = 10;

const faqs = [
  {
    q: 'Does Godel Terminal have an options chain?',
    a: `Yes. <strong>OMON</strong> is the documented option-chain command: every strike and expiration for a security with last, bid, ask, volume, implied volatility and ${OMON_GREEKS.length} Greeks, streamed over websocket. The doc page states OMON is "available on every Godel plan", so the chain is not a paid add-on tier. Open it by prefixing a security — the doc's example is <code class="mono">AAPL US EQ OMON</code>.`,
  },
  {
    q: 'Does the OPT command work in Godel Terminal?',
    a: `Yes, as an alias. The OMON doc states "OPT, CALL, and PUT are all aliases for OMON: they open the same options chain", with OPT the legacy mnemonic predating the 2025 standardisation. The confusion is that <code class="mono">godelterminal.com/docs/commands/opt</code> is a genuine 404 while the typed command works. This site listed OPT as nonexistent until ${esc(optCorrection ? optCorrection.date : '2026-08-05')} and <a href="/godel-terminal-commands-that-dont-exist/">corrected it in public</a>.`,
  },
  {
    q: 'Which Greeks does Godel Terminal show?',
    a: `The OMON chain documents ${OMON_GREEKS.length}: ${OMON_GREEKS.join(', ').toLowerCase()}. The OVME Black-Scholes calculator documents ${OVME_GREEKS.length} — ${OVME_GREEKS.join(', ').toLowerCase()} — alongside a theoretical price, in separate call and put columns. Lambda and epsilon appear on the chain and not in the calculator. Neither doc page defines which sign or scaling convention it uses.`,
  },
  {
    q: 'Can you trade options in Godel Terminal?',
    a: `No. The vendor's own positioning line is "${esc(PLATFORMS.notABroker.quote)}" There is no documented order ticket, no multi-leg builder and no paper trading. The BROK command connects brokerages read-only through SnapTrade — <a href="/godel-terminal-brokerage-link/">what that link does and does not do</a>. OMON is a screen you read, not one you send from.`,
  },
  {
    q: 'Is OVME accurate for American-style options?',
    a: `The doc page answers that itself: "Because it uses Black-Scholes, outputs assume European-style exercise; results are approximations for American-style contracts." It also notes the OVME label is kept as the Bloomberg-familiar mnemonic and that today it exposes only the Black-Scholes model, with more models possibly added later. For early-exercise-sensitive positions, treat the output as an approximation the vendor has already flagged.`,
  },
  {
    q: 'Does Godel Terminal have a volatility surface or an options flow scanner?',
    a: `Not published. Among the ${COMMANDS.length} documented command pages there is no volatility-surface, skew, term-structure, unusual-activity or options-screener page. ${EQS.mnemonic} screens the equity universe, not contracts. If a guide tells you otherwise, ask it for the doc URL.`,
  },
  {
    q: 'Does the Godel Terminal options chain show open interest?',
    a: `The vendor's traders page advertises an "options chain with greeks, IV, and open interest", but the column list on the OMON doc page names ${OMON_COLUMNS.join(', ').toLowerCase()} and the Greeks, without naming open interest. Two vendor surfaces, one gap between them. Check the column selector in your own session before relying on it.`,
  },
];

export const page = {
  path: '/godel-terminal-options/',
  title: 'Godel Terminal Options: OMON, OVME, Greeks and Gaps',
  description: 'Godel Terminal options: OMON is the documented chain with 7 Greeks, OVME prices Black-Scholes, OPT is an alias — and there is no execution or vol surface.',
  summary: 'What Godel Terminal documents for options — the OMON chain, its seven Greeks, the OVME Black-Scholes calculator, the OPT/CALL/PUT aliases — and the options-desk features that are not published.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-options/', label: 'Options' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    const aliasRows = optionAliases.map((a) => ({
      cells: [
        `<code class="mono">${esc(a.alias)}</code>`,
        `<code class="mono">${esc(a.canonical)}</code>`,
        `<code class="mono">godelterminal.com/docs/commands/${a.alias.toLowerCase()}</code> — 404`,
      ],
    }));

    return `
<h1>Godel Terminal Options: what OMON and OVME document, and what they do not</h1>

<p class="lede">${esc(PRODUCT.name)} has two documented options commands and no third.
<strong>OMON</strong> is the live chain — every strike and expiration with bid, ask, last, volume,
implied volatility and ${OMON_GREEKS.length} Greeks — and <strong>OVME</strong> is a Black-Scholes
calculator for a single theoretical contract. Both doc pages state the command is available on every
Godel plan, so options are not gated behind a higher tier. What is absent is the rest of an options
desk: no order entry, no strategy payoff, no volatility surface, and a pricing model the vendor itself
labels an approximation for American-style contracts.</p>

${note(`<strong>Sourcing:</strong> the behaviour on this page comes from the vendor's own
<a href="${OMON.docUrl}" rel="nofollow noopener" target="_blank">OMON</a> and
<a href="${OVME.docUrl}" rel="nofollow noopener" target="_blank">OVME</a> documentation pages, plus the
<a href="${G.docUrl}" rel="nofollow noopener" target="_blank">G</a> and
<a href="${FOCUS.docUrl}" rel="nofollow noopener" target="_blank">FOCUS</a> pages and the
<a href="${VENDOR_PAGES.dataCoverage}" rel="nofollow noopener" target="_blank">asset-class coverage page</a>,
all read on 3 September 2026. Where those pages are silent, this page says "not published" instead of
filling the gap.`)}

<h2>OMON: the chain, column by column</h2>

<p class="prose">The doc gives the command grammar as
<em>security identifier / ticker, country / instrument, asset class, then OMON</em> — its worked example is
<code class="mono">AAPL US EQ OMON</code>, and the FAQ adds that you can type OMON bare or prefix it with a
ticker such as <code class="mono">NVDA US EQ OMON</code>. What opens is a chain with three display modes:</p>

<ul class="prose">
  <li><strong>Both</strong> — calls on the left, puts on the right, the strike column centred.</li>
  <li><strong>Calls</strong> — calls only, with the full column depth in view.</li>
  <li><strong>Puts</strong> — puts only, same expanded treatment.</li>
</ul>

<p class="prose">The doc notes each mode keeps its own column order and its own Greeks selection, stored as a
bitmask per mode, so a layout you build for the calls-only view does not disturb the two-sided view. Columns
reorder by dragging headers and resize by dragging the right edge. The default column set is
${OMON_COLUMNS.join(', ').toLowerCase()}, plus the Greeks below.</p>

<p class="prose">Navigation is an expiration dropdown with arrow keys either side of it, a months-out selector,
and a control for how many strikes appear above and below spot — the documented default is
${DEFAULT_STRIKES} each way. A QuickQuote chip carries the underlying's live price, and a highlighted band
reading "Last Price: x.xx" sits between the in-the-money and out-of-the-money halves of the grid, which is how
you see where spot cuts the ladder without reading strikes. The doc states rows update live over websocket,
and that the navigation controls are debounced by roughly 300ms so that dragging through expirations does not
fire a request per keystroke. When a name has no chain, the window renders
"No options data found for [ticker]" rather than an empty grid.</p>

<p class="prose">Clicking a contract opens a context menu that launches into three other commands: FOCUS,
G for a chart of that contract, and OVME. That is the documented path from a strike you noticed to a chart or a
theoretical price, and it is worth knowing because typing an option symbol at the command line is not a flow
any doc page describes.</p>

<h3>The ${OMON_GREEKS.length} Greeks on the chain, and the ${OVME_GREEKS.length} in the calculator</h3>

<p class="prose">The two options commands do not carry the same Greeks, which matters if you plan to move
between them:</p>

${table({
  head: ['Greek', 'OMON chain', 'OVME calculator', 'Conventional reading'],
  rows: [
    { cells: ['Delta', 'Yes', 'Yes', 'Sensitivity to the underlying price'] },
    { cells: ['Gamma', 'Yes', 'Yes', 'Rate of change of delta'] },
    { cells: ['Vega', 'Yes', 'Yes', 'Sensitivity to volatility'] },
    { cells: ['Theta', 'Yes', 'Yes', 'Time decay'] },
    { cells: ['Rho', 'Yes', 'Yes', 'Sensitivity to the interest rate'] },
    { highlight: true, cells: ['Lambda', 'Yes', 'Not listed', 'Elasticity — percentage move in the option per percentage move in the underlying'] },
    { highlight: true, cells: ['Epsilon', 'Yes', 'Not listed', 'Sensitivity to the dividend yield'] },
  ],
  caption: 'Greeks named on the OMON and OVME doc pages, 3 September 2026. The right-hand column is the standard textbook reading; neither doc page states its own sign or scaling convention.',
})}

<p class="prose">Lambda and epsilon are the unusual inclusions — plenty of retail chains stop at the first
four. Both are toggled through the same Greeks selector as the rest, so a working layout can hide them.</p>

<h2>OPT, CALL and PUT: three ways into one window</h2>

<p class="prose">The OMON doc is explicit: "OPT, CALL, and PUT are all aliases for OMON: they open the same
options chain", with OPT described as the legacy mnemonic from before the 2025 standardisation, and a note that
"OMON replaces the legacy OPT command: they are now the same component". The trap for anyone writing a cheat
sheet from URLs alone:</p>

${table({
  head: ['Typed', 'Opens', 'Its own doc URL'],
  rows: aliasRows,
  caption: 'Aliases are documented on the OMON page and have no pages of their own.',
})}

<p class="prose">That is why "OPT is not a real command" circulated for so long, this site included: the URL check
passes for OMON and fails for OPT, and a guide built on URL checks concludes the command is fake. It is not. The
full alias set and our dated correction live on
<a href="/godel-terminal-commands-that-dont-exist/">the phantom-commands page</a>.</p>

<h2>OVME: one contract, five inputs, European exercise</h2>

<p class="prose">OVME opens two ways per its doc. Scoped — <code class="mono">AAPL US EQ OVME</code> — pre-populates
the calculator from live spot pricing. Bare — <code class="mono">OVME</code> — opens an empty calculator you fill
in yourself. Five inputs, with the doc's stated defaults:</p>

${table({
  head: ['Input', 'Default', 'Behaviour per the doc'],
  rows: [
    { cells: ['Underlying price', 'Live quote', 'Populated from live quotes while attached to a security; editable once detached'] },
    { cells: ['Strike price', 'From spot data', 'Seeded from realtime spot, then freeform numeric entry'] },
    { cells: ['Volatility', '20%', 'Annualised percentage'] },
    { cells: ['Risk-free rate', '5%', 'Annualised percentage'] },
    { cells: ['Time to expiration', '30 days', 'Units selectable — days, months or years'] },
  ],
  caption: 'OVME inputs and defaults, per godelterminal.com/docs/commands/ovme, 3 September 2026.',
})}

<p class="prose">Every edit recalculates immediately, and the output is two columns — call and put — each showing
a theoretical price and ${OVME_GREEKS.length} Greeks. Currency symbols follow the underlying's native
denomination.</p>

<p class="prose">Then the caveat that decides whether OVME is useful to you, in the vendor's words: "Because it
uses Black-Scholes, outputs assume European-style exercise; results are approximations for American-style
contracts." US listed single-name equity options are American-style by convention, so for most of what OMON will
put in front of you, OVME is an approximation rather than a valuation. The doc adds a second piece of candour
worth quoting: the OVME name is "retained as the Bloomberg-familiar mnemonic; today it exposes only the
Black-Scholes model (more pricing models may be added in the future)". It is a mnemonic borrowed from a much
larger function, and the doc says so.</p>

<h2>Which options data you are actually reading</h2>

<p class="prose">The coverage page sources options from OPRA — "consolidated U.S. options" — and Cboe, lists
equity, ETF and index options as real-time, and names SPX, VIX and RUT among the index options carried at
real-time speed. It lists no non-US options feed. The OMON doc, meanwhile, answers its own FAQ with "OMON loads
the options chain for any optionable security, including ETFs and index options" and says it works for non-US
securities. Those two statements are not obviously reconcilable: a chain that loads for a non-US name still needs
a feed the coverage table does not list. Nothing published resolves it, so test a non-US chain during the
${PRICING.freeTrial.days}-day trial rather than assuming either reading. The rest of the delay and entitlement
picture is on the <a href="/godel-terminal-data-coverage/">data-coverage page</a>.</p>

<h2>Charting a contract: G defaults to one-minute candles</h2>

<p class="prose">Because OMON's context menu launches G on a selected contract, the G doc's resolution table is
part of the options story: it lists "Options (OPT): 1 Minute" as the default candle resolution, against the
one-day default the same table gives other asset classes. The same page carries a constraint worth knowing before
you blame the contract: "Chart data is gated on the AGGREGATE_RTH feed; if a security is missing that feed, the
chart area will render empty." An empty option chart is therefore a feed question, not necessarily a liquidity
question.</p>

<p class="prose">One loose end: FOCUS is the third launch target from the chain, but the FOCUS doc lists its
supported asset classes as equities, treasuries, currency pairs, crypto, indices and futures, without naming
options. Whether a contract in a FOCUS window is documented behaviour or simply undocumented behaviour is not
something the pages settle.</p>

<h2>Measured against a full options platform</h2>

<p class="prose">If you came from a dedicated options tool, this is the honest gap list. Every "not published"
below means we could not find it on any vendor page, not that we tested and found it missing.</p>

${table({
  head: ['What an options desk expects', 'Status in ' + PRODUCT.name, 'Evidence'],
  rows: [
    { cells: ['Order entry, multi-leg tickets', 'Not present', `Vendor: "${esc(PLATFORMS.notABroker.quote)}"`] },
    { cells: ['Paper trading', 'Not published', 'No doc page; the vendor positions the product as a data layer'] },
    { cells: ['Options backtesting', 'Not published', `Backtesting appears only on a community-posted pipeline list (${esc(ROADMAP.source)}) with no date`] },
    { cells: ['Volatility surface, skew, term structure', 'Not published', `No such page among the ${COMMANDS.length} documented commands`] },
    { cells: ['Options screener or flow scanner', 'Not published', `${EQS.mnemonic} screens the equity universe; no contract-level screen is documented`] },
    { cells: ['Historical chains or historical IV', 'Not published', 'HP is the historical price table; no options-history page exists'] },
    { cells: ['Strategy payoff diagrams', 'Not published', 'OVME prices one call and one put; no multi-leg builder is documented'] },
    { cells: ['American-style or binomial pricing', 'Not present', 'OVME states European-style exercise and calls American results approximations'] },
    { cells: ['Chain export to Excel', 'Not published', `Export is documented for ${esc(API_FACTS.exportNote.replace(/^Several documented commands export to Excel CSV\/JSON instead: /, ''))} — OMON is not among them`] },
    { cells: ['Alerts on a contract', 'Not published', `${AL.mnemonic} documents price, volume and intraday-change conditions; option contracts are not named`] },
    { highlight: true, cells: ['Real-time US chain with full Greeks', 'Present', 'OMON, on every plan, streamed over websocket'] },
  ],
  caption: 'Compiled from the vendor doc pages and coverage page, September 2026.',
})}

<p class="prose">Read that as a scope statement rather than a verdict. Where the gap bites is the volatility
work — surfaces, skew, term structure and contract history are what an options-first user will miss soonest, and
none of them have a published page. Rebuilding them yourself is not on the table either:
${esc(API_FACTS.vendorStatus)}, per ${esc(API_FACTS.vendorStatusSource)} —
<a href="/godel-terminal-api/">the API situation in full</a>.</p>

<h2>What options cost here</h2>

<p class="prose">Nothing extra, as far as anything published says. Both option commands state they are available
on every Godel plan, and no options data add-on appears on the pricing page, so the chain and the calculator come
with the seat: ${PRICING.monthly.display}/month or ${PRICING.annual.display}/year per
${esc(PRICING.annual.unit)}. The exception is regulatory rather than product: FINRA-licensed users pay the
${PRICING.finraSurcharge.display}/month surcharge. ${esc(PRICING.finraSurcharge.note)} Whether an anonymous
session or a ${PRICING.freeTrial.days}-day trial account gets live option quotes rather than a gated view is not
stated on either doc page.</p>

<h2>Related reading</h2>

<ul class="prose">
  <li>All ${COMMANDS.length} documented commands with provenance badges: <a href="/godel-terminal-commands/">the command reference →</a></li>
  <li>Which feeds are real-time and which are delayed: <a href="/godel-terminal-data-coverage/">data coverage →</a></li>
  <li>Why OPT was on phantom-command lists: <a href="/godel-terminal-commands-that-dont-exist/">the corrections ledger →</a></li>
  <li>Getting numbers out of the terminal: <a href="/godel-terminal-excel/">Excel and export →</a></li>
  <li>How the options story compares to the incumbent's derivatives analytics: <a href="/godel-terminal-vs-bloomberg/">vs Bloomberg →</a></li>
</ul>

${ctaRow({ primary: 'Open a chain on the free trial', secondary: { href: '/godel-terminal-pricing/', label: 'What a seat costs' } })}

${faqSection(faqs)}
`;
  },
};
