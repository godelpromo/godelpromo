import { PROMO, PRODUCT } from '../data/site.mjs';
import { COMMANDS, PHANTOM_COMMANDS, ADVERTISED_CAPABILITIES, officialCommands, documentedCommands, commandCount } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, commandCard, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `How many commands does ${PRODUCT.name} have?`,
    a: `${commandCount()} commands currently have their own page in ${PRODUCT.name}'s official documentation: ${COMMANDS.map((c) => c.mnemonic).join(', ')}. ${PRODUCT.name} is in ${PRODUCT.status} and states that more commands are under development, so this list grows.`,
  },
  {
    q: `Why doesn't the OPT command work in ${PRODUCT.name}?`,
    a: `Because ${PRODUCT.name}'s options function is documented as <strong>OMON</strong>, not OPT. Several popular ${PRODUCT.name} guides list OPT, but there is no OPT page in the official command documentation. The same applies to HDS (use <strong>HMS</strong>), G and GIP (use <strong>HP</strong>), MOST (use <strong>EQS</strong>) and FOCUS (use <strong>QM</strong>).`,
  },
  {
    q: `How do I run a command in ${PRODUCT.name}?`,
    a: `${PRODUCT.name} is driven by a command line at the top of the workspace. You type a short mnemonic, optionally prefixed with a security identifier — for example <code class="mono">AAPL DES</code> for Apple's overview screen, or <code class="mono">WEI</code> on its own for world indices, which needs no ticker.`,
  },
  {
    q: `Are these commands the same as Bloomberg's?`,
    a: `Many of them deliberately match. DES, N, CF, FA, EM, ERN, ANR, HP, EQS, TAS and OMON all follow the mnemonic conventions used by legacy terminals, which is a stated design goal — ${PRODUCT.name} markets itself as "browser based with familiar commands". That is why an analyst moving across can be productive quickly. It does not mean the underlying screens are identical.`,
  },
  {
    q: `Do I need a paid plan to use these commands?`,
    a: `You need an account. Promo code <strong>${PROMO.code}</strong> takes ${PROMO.percent}% off your ${PROMO.appliesTo} if you subscribe. See <a href="/how-to-redeem/">how to redeem</a>.`,
  },
];

export const page = {
  path: '/godel-terminal-commands/',
  title: `Godel Terminal Commands: All ${commandCount()} Documented Functions`,
  description: `The complete Godel Terminal command list, built from Godel's own docs — plus the commands other guides publish that do not actually exist.`,
  summary: `Complete verified Godel Terminal command reference — ${commandCount()} documented commands, with sourcing for each and a list of commonly-cited commands that are not real.`,
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/godel-terminal-commands/', label: 'Commands' },
  ],
  faqs,
  priority: '0.9',

  // ItemList makes the command set machine-readable as an ordered reference,
  // which is what lets the list be surfaced or cited as a set rather than as
  // seventeen unrelated paragraphs.
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
    const phantomRows = PHANTOM_COMMANDS.map((p) => ({
      cells: [
        `<strong class="mono">${esc(p.claimed)}</strong>`,
        esc(p.claimedAs),
        `<strong class="mono" style="color:var(--accent-2)">${esc(p.instead)}</strong>`,
        esc(p.note),
      ],
    }));

    return `
<h1>Godel Terminal commands: all ${commandCount()} documented functions</h1>

<p class="lede">This reference is built from ${esc(PRODUCT.name)}'s own command documentation URLs, not from
guesswork. Every command below has a page in the official docs, and each card tells you whether the
description comes from ${esc(PRODUCT.name)}'s published prose or only from the documentation index.</p>

${note(`<strong>Why this list is shorter than others you will find:</strong> several widely-copied
${esc(PRODUCT.name)} cheat sheets include commands — OPT, HDS, GIP, MOST, FOCUS — that have no page in the
official documentation. We have listed them separately below with the documented command to use instead,
rather than padding the count.`)}

<div class="card">
  <label for="cmd-filter" style="display:block;font-size:13px;color:var(--muted);margin-bottom:8px;font-weight:650">Filter commands</label>
  <input id="cmd-filter" type="search" data-cmd-filter placeholder="Try &quot;options&quot;, &quot;news&quot;, or &quot;FA&quot;"
    style="width:100%;padding:12px 14px;border-radius:11px;border:1px solid var(--border);background:rgba(0,0,0,.28);color:var(--text);font-size:15px;font-family:inherit">
</div>

<h2>Commands ${esc(PRODUCT.name)} describes directly</h2>
<p class="prose">These ${officialCommands().length} commands have prose descriptions published by ${esc(PRODUCT.name)} itself.
Everything in these cards is restated from the vendor.</p>

<div class="grid">
${officialCommands().map(commandCard).join('\n')}
</div>

<h2>Commands with official documentation pages</h2>
<p class="prose">These ${documentedCommands().length} commands each have a documentation page at
<code class="mono">godelterminal.com/docs/commands/</code>, and each maps to a capability ${esc(PRODUCT.name)} advertises
by name. We state that they exist and what they cover — we do not invent behavioural detail we have not seen.</p>

<div class="grid">
${documentedCommands().map(commandCard).join('\n')}
</div>

<p data-cmd-empty hidden class="muted">No commands match that filter.</p>

<h2>Commands other guides list that don't exist</h2>
<p class="prose">If you have typed one of these into ${esc(PRODUCT.name)} and got nothing back, this is why.
Each of these appears in at least one popular ${esc(PRODUCT.name)} guide, and none has a page in the official
command documentation. In most cases the guide has copied a legacy-terminal mnemonic that ${esc(PRODUCT.name)}
did not adopt.</p>

${table({
  head: ['Commonly listed', 'Claimed function', 'Use instead', 'Why'],
  rows: phantomRows,
})}

<p class="prose faint">To be fair to those guides: ${esc(PRODUCT.name)} is in ${esc(PRODUCT.status)} and its command
set is actively changing, so some of these may have existed once or may exist later. As of this page's last update,
they are not in the documentation.</p>

<h2>Capabilities ${esc(PRODUCT.name)} advertises</h2>
<p class="prose">${esc(PRODUCT.name)} names these capabilities on its own homepage. Most map cleanly onto a
documented command; a few (Layouts, Excel) are workspace features rather than command-line functions.</p>

<p class="prose">${ADVERTISED_CAPABILITIES.map((c) => `<code class="cmd-example">${esc(c)}</code>`).join(' ')}</p>

<h2>How the command line works</h2>
<p class="prose">${esc(PRODUCT.name)} puts a command line at the top of the workspace. The pattern is
<code class="mono">[TICKER] MNEMONIC</code>:</p>

<ul class="prose">
  <li><code class="mono">AAPL DES</code> — Apple's overview screen</li>
  <li><code class="mono">NVDA N</code> — news filtered to NVIDIA</li>
  <li><code class="mono">MSFT FA</code> — Microsoft's standardized financials</li>
  <li><code class="mono">WEI</code> — world equity indices, no ticker needed</li>
  <li><code class="mono">EQS</code> — the equity screener, no ticker needed</li>
</ul>

<p class="prose">Screens that describe a single security take a ticker prefix. Market-wide screens
(WEI, GLCO, FX, EQS, QM) do not.</p>

<h2>Try the commands yourself</h2>
${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-pricing/', label: 'See pricing' } })}

${faqSection(faqs)}
`;
  },
};
