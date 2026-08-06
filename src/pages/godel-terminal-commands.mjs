import { PROMO, PRODUCT } from '../data/site.mjs';
import { COMMANDS, ALIASES, CATEGORIES, CORRECTIONS, ADVERTISED_CAPABILITIES, officialCommands, commandCount } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, commandCard, note, esc } from '../lib/components.mjs';

const byCategory = (cat) => COMMANDS.filter((c) => c.category === cat);

const faqs = [
  {
    q: `How many commands does ${PRODUCT.name} have?`,
    a: `${commandCount()} commands currently have their own page in ${PRODUCT.name}'s official documentation, verified against the vendor's sitemap on ${CORRECTIONS[0].date}: ${COMMANDS.map((c) => c.mnemonic).join(', ')}. ${PRODUCT.name} is in ${PRODUCT.status} and the set keeps growing — it stood at 17 documented commands as recently as July 2026.`,
  },
  {
    q: `Does the OPT command work in ${PRODUCT.name}?`,
    a: `Yes — OPT is a documented alias of <strong>OMON</strong>, the option-chain command, along with CALL and PUT. Aliases work when typed but have no doc pages of their own. The other documented aliases: GIP and GP open <strong>G</strong> (chart), CN and NH open <strong>N</strong> (news), TR opens <strong>TAS</strong> (time and sales), and SEARCH and TK open <strong>SECF</strong> (securities finder).`,
  },
  {
    q: `How do I run a command in ${PRODUCT.name}?`,
    a: `${PRODUCT.name} is driven by a command line — the backtick key opens the terminal. You type a short mnemonic, optionally prefixed with a security identifier: for example <code class="mono">AAPL DES</code> for Apple's overview screen, or <code class="mono">WEI</code> on its own for world indices, which needs no ticker.`,
  },
  {
    q: `Which ${PRODUCT.name} commands are in beta or unreleased?`,
    a: `Godel's docs flag <strong>ALLQ</strong> (all quotes) and <strong>HMAP</strong> (market heatmap) as beta, and mark <strong>EVT</strong> (company events) as in active development — its doc page exists but the command is not yet available. Two smaller gates: HP's intraday resolutions require an entitlement, and bid/ask in ALLQ requires registration.`,
  },
  {
    q: `Are these commands the same as Bloomberg's?`,
    a: `Many mnemonics will look familiar to users of legacy terminals — ${PRODUCT.name} positions itself as a browser-based terminal driven by familiar command mnemonics, and that is why an analyst moving across can be productive quickly. It does not mean the underlying screens are identical.`,
  },
  {
    q: `Do I need a paid plan to use these commands?`,
    a: `You need an account. Promo code <strong>${PROMO.code}</strong> takes ${PROMO.percent}% off your ${PROMO.appliesTo} if you subscribe. See <a href="/how-to-redeem/">how to redeem</a>.`,
  },
];

export const page = {
  path: '/godel-terminal-commands/',
  title: `Godel Terminal Commands: All ${commandCount()} Documented Functions`,
  description: `All ${commandCount()} Godel Terminal commands, verified against the vendor sitemap and grouped by vendor category — plus the aliases (OPT, GIP) that work without a doc page.`,
  summary: `Complete verified Godel Terminal command reference — ${commandCount()} documented commands grouped by the vendor's own six categories, with the alias table and dated corrections.`,
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/godel-terminal-commands/', label: 'Commands' },
  ],
  faqs,
  priority: '0.9',

  // ItemList makes the command set machine-readable as an ordered reference,
  // which is what lets the list be surfaced or cited as a set rather than as
  // forty-eight unrelated paragraphs.
  extraNodes: [{
    '@type': 'ItemList',
    '@id': 'https://www.godelpromo.com/godel-terminal-commands/#commandlist',
    name: `${PRODUCT.name} documented commands`,
    numberOfItems: COMMANDS.length,
    itemListElement: COMMANDS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${c.mnemonic} — ${c.name}`,
      description: c.summary,
      url: c.docUrl,
    })),
  }],

  render() {
    const aliasRows = ALIASES.map((a) => ({
      cells: [
        `<strong class="mono">${esc(a.alias)}</strong>`,
        `<strong class="mono" style="color:var(--accent-2)">${esc(a.canonical)}</strong>`,
        esc(a.note),
      ],
    }));

    const categorySections = CATEGORIES.map((cat) => `
<h2>${esc(cat)}</h2>
<div class="grid">
${byCategory(cat).map(commandCard).join('\n')}
</div>`).join('\n');

    return `
<h1>Godel Terminal commands: all ${commandCount()} documented functions</h1>

<p class="lede">${esc(PRODUCT.name)} currently documents ${commandCount()} commands. Every entry below was
verified against godelterminal.com's own sitemap on ${esc(CORRECTIONS[0].date)}, is grouped under the six
categories the vendor's docs hub uses, and links its official documentation page — so every claim on this
page is independently checkable in seconds.</p>

${note(`<strong>Corrected ${esc(CORRECTIONS[0].date)}:</strong> until today this page listed 17 commands and
flagged OPT, HDS, G, GIP, MOST, FOCUS and SECF as commands that do not exist. ${esc(PRODUCT.name)}'s
documentation has since grown to ${commandCount()} commands: HDS, G, MOST, FOCUS and SECF now have real doc
pages, and OPT and GIP work in-app as aliases. <a href="/godel-terminal-commands-that-dont-exist/">Read the
full dated corrections ledger →</a>`)}

<div class="card">
  <label for="cmd-filter" style="display:block;font-size:13px;color:var(--muted);margin-bottom:8px;font-weight:650">Filter commands</label>
  <input id="cmd-filter" type="search" data-cmd-filter placeholder="Try &quot;options&quot;, &quot;news&quot;, or &quot;FA&quot;"
    style="width:100%;padding:12px 14px;border-radius:11px;border:1px solid var(--border);background:rgba(0,0,0,.28);color:var(--text);font-size:15px;font-family:inherit">
</div>

<p class="prose">Two provenance badges appear on the cards. <strong>Vendor-described</strong>
(${officialCommands().length} commands) means ${esc(PRODUCT.name)} publishes marketing prose about the command
beyond its doc page, and the card restates it. <strong>Documented</strong> means the card restates the
official documentation page and nothing else — we do not invent behavioural detail we have not seen.</p>
${categorySections}

<p data-cmd-empty hidden class="muted">No commands match that filter.</p>

<h2>Aliases: commands that work without a doc page</h2>
<p class="prose">These ${ALIASES.length} mnemonics run when typed, but have no standalone documentation page —
each is documented as an alias on its canonical command's page, and its own doc URL
(<code class="mono">godelterminal.com/docs/commands/opt</code>, for instance) is a genuine 404. If a cheat
sheet lists OPT or GIP as a ${esc(PRODUCT.name)} command, this table is the precise sense in which it is right.</p>

${table({
  head: ['Alias', 'Opens', 'Note'],
  rows: aliasRows,
})}

<h2>Capabilities ${esc(PRODUCT.name)} advertises</h2>
<p class="prose">${esc(PRODUCT.name)} names these capabilities on its own homepage. Most map cleanly onto a
documented command; a few (Layouts, Excel) map to layout and export features rather than single commands.</p>

<p class="prose">${ADVERTISED_CAPABILITIES.map((c) => `<code class="cmd-example">${esc(c)}</code>`).join(' ')}</p>

<h2>How the command line works</h2>
<p class="prose">${esc(PRODUCT.name)} is driven from a command line (opened with the backtick key). The pattern is
<code class="mono">[TICKER] MNEMONIC</code>:</p>

<ul class="prose">
  <li><code class="mono">AAPL DES</code> — Apple's overview screen</li>
  <li><code class="mono">AAPL G</code> — the chart window (GIP and GP land in the same place)</li>
  <li><code class="mono">NVDA N</code> — news filtered to NVIDIA</li>
  <li><code class="mono">MSFT FA</code> — Microsoft's standardized financials</li>
  <li><code class="mono">WEI</code> — world equity indices, no ticker needed</li>
  <li><code class="mono">CALC</code> — the financial calculator, no ticker needed</li>
</ul>

<p class="prose">Screens that describe a single security take a ticker prefix. Market-wide screens
(WEI, GLCO, FX, MOST, EQS, QM) and utilities (CALC, CHAT, HELP, NOTE) do not.</p>

<h2>Try the commands yourself</h2>
${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-pricing/', label: 'See pricing' } })}

${faqSection(faqs)}
`;
  },
};
