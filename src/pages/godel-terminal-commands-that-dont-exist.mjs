import { PRODUCT } from '../data/site.mjs';
import { COMMANDS, ALIASES, CORRECTIONS, commandCount } from '../data/commands.mjs';
import { faqSection, table, note, esc } from '../lib/components.mjs';

const cmd = (m) => COMMANDS.find((c) => c.mnemonic === m);
const docLink = (m, label) => {
  const c = cmd(m);
  return `<a href="${c.docUrl}" rel="nofollow noopener" target="_blank">${esc(label || `official ${c.mnemonic} documentation`)}</a>`;
};

const faqs = [
  {
    q: `Does the OPT command work in ${PRODUCT.name}?`,
    a: `Yes. OPT is a documented alias of <strong>OMON</strong>, the option-chain command — as are CALL and PUT. Aliases run when typed but have no doc page of their own, which is how OPT ended up on phantom-command lists (including ours): the URL godelterminal.com/docs/commands/opt genuinely 404s, while the command genuinely works.`,
  },
  {
    q: `Is HDS a real ${PRODUCT.name} command now?`,
    a: `Yes. HDS is the documented <strong>Holders</strong> command: institutional ownership for any company — owner name, market value, share amount, change and change percentage — with links to the underlying Form 13F filings. It had no doc page when we first checked in July 2026; it does now.`,
  },
  {
    q: `If HDS is holders, what is HMS?`,
    a: `HMS is <strong>Historical Multiple Security</strong> — a charting command that compares multiple securities historically on a single chart, with normalize, overlay and side-by-side views. We previously described HMS as the holders screen; that was wrong, and the correction is logged above.`,
  },
  {
    q: `How many commands does ${PRODUCT.name} document?`,
    a: `${commandCount()}, verified against godelterminal.com's own sitemap on ${CORRECTIONS[0].date} — up from 17 a month earlier. Every one is in our <a href="/godel-terminal-commands/">command reference</a> with a link to its official doc page.`,
  },
];

export const page = {
  path: '/godel-terminal-commands-that-dont-exist/',
  title: `Godel Terminal Commands That “Don’t Exist”: An Update`,
  description: `Five commands we once flagged as phantom now have official doc pages, and OPT and GIP turn out to be working aliases. The dated corrections ledger, in public.`,
  summary: `Public corrections ledger: five formerly-"phantom" Godel Terminal commands now have official doc pages, and OPT/GIP work as documented aliases.`,
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-commands-that-dont-exist/', label: 'Command corrections' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    const correctionRows = CORRECTIONS.map((c) => ({
      cells: [
        `<span class="mono">${esc(c.date)}</span>`,
        esc(c.was),
        `<strong>${esc(c.now)}</strong>`,
        esc(c.note),
      ],
    }));

    const aliasRows = ALIASES.map((a) => ({
      cells: [
        `<strong class="mono">${esc(a.alias)}</strong>`,
        `<strong class="mono" style="color:var(--accent-2)">${esc(a.canonical)}</strong>`,
        esc(cmd(a.canonical).name),
      ],
    }));

    return `
<h1>Godel Terminal commands that “don’t exist”: an update</h1>

<p class="lede">If a guide told you OPT or HDS did not exist in ${esc(PRODUCT.name)} — and until
${esc(CORRECTIONS[0].date)}, this site was one of those guides — here is what changed. ${esc(PRODUCT.name)}'s
documented command set grew from 17 pages to ${commandCount()}. Five mnemonics we had flagged as
undocumented (HDS, G, MOST, FOCUS, SECF) now have real doc pages, and two more (OPT, GIP) turn out to work
in-app as documented aliases. This page is the dated record of every claim we changed.</p>

${note(`The original version of this page said seven commands did not exist. Most of that was accurate against
${esc(PRODUCT.name)}'s documentation as we harvested it in July 2026 — and stopped being accurate as the docs
expanded. Parts of it were simply wrong: we described SECF as an SEC-filings command when it is the Securities
Finder, and calling OPT nonexistent missed that it works in-app as an alias. The ledger below records all of it.
Rather than quietly rewriting history, we log the changes.`)}

<h2>The corrections, dated</h2>

${table({
  head: ['Date', 'What we said', 'What is true now', 'Detail'],
  rows: correctionRows,
})}

<h2>Aliases: commands with no doc page that still work</h2>

<p class="prose">The subtlest entry in the ledger. An alias runs when typed into the terminal, but has no
standalone documentation page — it is documented on its canonical command's page instead, and its own doc URL
(<code class="mono">godelterminal.com/docs/commands/opt</code>, say) is a genuine 404. So "OPT is not in the
docs" was true, while "OPT does not exist" was false. ${esc(PRODUCT.name)} currently documents
${ALIASES.length} aliases:</p>

${table({
  head: ['Typed alias', 'Opens', 'Command name'],
  rows: aliasRows,
})}

<p class="prose">Try <code class="mono">${esc(cmd('OMON').example)}</code> — or type OPT and land in the same
window. See the ${docLink('OMON')} and the ${docLink('G')}.</p>

<h2>Why this keeps happening</h2>

<p class="prose">${esc(PRODUCT.name)} is in ${esc(PRODUCT.status)} and ships faster than its cheat sheets —
including the vendor's own: the product even has a <span class="mono">CHANGE</span> command whose whole job is
tracking what shipped. Its documentation nearly tripled in a matter of weeks, from 17 command pages to
${commandCount()}. Any third-party guide written against a snapshot goes stale, and most guides never say
which snapshot they were written against. That is the actual root cause of phantom-command lists in both
directions: commands asserted that were never documented, and commands denied that have since become real.</p>

<p class="prose">You can check any mnemonic yourself in seconds:
<code class="mono">godelterminal.com/docs/commands/&lt;mnemonic&gt;</code> — lowercase, no extension (the older
<span class="mono">.html</span> URLs still resolve). If the page loads, the command is documented; if it 404s,
it is either an alias, unreleased, or not real. Our <a href="/godel-terminal-commands/">command reference →</a>
links the official page for all ${commandCount()} entries, and one more wrinkle is worth knowing: a doc page
can also precede the command — EVT (Company Events) has a page but is marked in active development and not yet
available.</p>

<h2>Why we publish corrections instead of editing silently</h2>

<p class="prose">Because trust is the product. This site's only advantage over the guides that invent 75%-off
codes and copy Bloomberg mnemonics wholesale is that every claim here is checkable — and a claim ledger you
can audit is worth more than a page that has always quietly been right. When the facts move, the honest
response is a dated correction, not an unmarked edit. If you find something else on this site that no longer
matches ${esc(PRODUCT.name)}'s own pages, it belongs in this table; <a href="/about/">tell us →</a>.</p>

<h2>Learning the real command set</h2>

<p class="prose">The <a href="/godel-terminal-commands/">command reference →</a> covers all ${commandCount()}
documented commands, grouped by the vendor's own categories, with a provenance badge and an official doc link
on every card. If you are starting from zero, the <a href="/starter-guide/">starter guide →</a> sequences the
commands worth learning first.</p>

${faqSection(faqs)}
`;
  },
};
