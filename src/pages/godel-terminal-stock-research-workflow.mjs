import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { COMMANDS } from '../data/commands.mjs';
import { ctaRow, faqSection, note, esc } from '../lib/components.mjs';

/**
 * A full research pass built exclusively from documented commands. Every
 * behavioural claim below comes from the command's own doc-page description in
 * commands.mjs — the helper throws at build time if a mnemonic drifts out of
 * the data module, so this page cannot silently outlive the command set.
 */
const cmd = (m) => {
  const c = COMMANDS.find((x) => x.mnemonic === m);
  if (!c) { throw new Error(`workflow page references unknown command ${m}`); }
  return c;
};

const step = (mnemonic, role) => {
  const c = cmd(mnemonic);
  return `<article class="cmd">
  <div class="cmd-head">
    <span class="cmd-mnemonic">${esc(c.mnemonic)}</span>
    <span class="cmd-name">${esc(c.name)}</span>
    <code class="cmd-example">${esc(c.example)}</code>
  </div>
  <p><strong>${esc(role)}</strong> ${esc(c.summary)}</p>
</article>`;
};

const faqs = [
  {
    q: `Can I run this workflow on the free trial?`,
    a: `Yes — ${PRODUCT.name}'s pricing page states the ${PRICING.freeTrial.days}-day trial opens up most of the product, including real-time Nasdaq quotes, news, SEC filings, financials, charting and the full command set. Running one real research pass is exactly what a trial is for. <a href="/godel-terminal-free-trial/">How the trial works</a>.`,
  },
  {
    q: `Do all of these commands need a ticker in front?`,
    a: `Security-specific screens do — <span class="mono">AAPL DES</span>, <span class="mono">AAPL FA</span>. Market-wide screens (WEI, IMAP, MOST, TOP) run bare. The <a href="/godel-terminal-commands/">command reference</a> shows an example for every one.`,
  },
  {
    q: `Is this the same workflow a Bloomberg user would run?`,
    a: `The shape is similar and many mnemonics will feel familiar, but the products are not equivalents — <a href="/godel-terminal-vs-bloomberg/">our comparison</a> covers what does and does not transfer, and <a href="/godel-terminal-data-coverage/">the data-coverage page</a> covers where the underlying data is real-time versus delayed.`,
  },
  {
    q: `Where does charting fit?`,
    a: `Anywhere you want it: <span class="mono">G</span> opens the documented chart window (indicators powered by TradingView, per ${PRODUCT.name}'s own docs), and <span class="mono">HMS</span> overlays multiple securities for relative work. We put them under "context" below, but chart-first researchers can start there.`,
  },
];

export const page = {
  path: '/godel-terminal-stock-research-workflow/',
  title: 'Godel Terminal Stock Research Workflow, Command by Command',
  description: 'A complete stock-research pass using only documented Godel Terminal commands — orient with DES, verify with CF and FA, then estimates, ownership and options.',
  summary: 'A full command-by-command stock research workflow built entirely from documented Godel Terminal commands.',
  datePublished: '2026-08-06',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-stock-research-workflow/', label: 'Research workflow' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    return `
<h1>A stock research workflow in ${esc(PRODUCT.name)}, command by command</h1>

<p class="lede">This is a complete research pass on a single name — orientation, news, filings, numbers,
street view, ownership, context, optionality — using only commands that appear in ${esc(PRODUCT.name)}'s
own documentation. Each step names the command, what its documentation says it shows, and the question
it answers in the pass. The <a href="/starter-guide/">starter guide</a> covers your first 30 minutes in
the product; this page is what a full working session looks like after that.</p>

${note(`<strong>How this page is built:</strong> every behavioural claim is drawn from the command's own
documentation page, harvested and verified against ${esc(PRODUCT.name)}'s sitemap. We have not sat a
trading desk with it, and we don't pretend otherwise — what we can promise is that every command below is
real, current, and checkable at <span class="mono">godelterminal.com/docs/commands/&lt;mnemonic&gt;</span>.`)}

<h2>1. Orient</h2>
<p class="prose">One screen to know what the company is, what it is worth, and what is coming up.</p>
${step('DES', 'Start here.')}

<h2>2. What is moving it</h2>
<p class="prose">Before reading a single filing, know what the market is reacting to right now.</p>
${step('N', 'The name-specific feed.')}
${step('TOP', 'The macro tape.')}
${step('TAS', 'The microstructure.')}
${step('HALT', 'If something looks frozen.')}

<h2>3. Verify against primary sources</h2>
<p class="prose">The step most retail workflows skip. Narrative comes from coverage; verification comes
from documents.</p>
${step('CF', 'The filings themselves.')}
${step('TRAN', 'What management actually said.')}

<h2>4. The numbers</h2>
${step('FA', 'The statements.')}
${step('DVD', 'The payout record.')}
${step('HP', 'The price history, exportable.')}
${step('HCP', 'Day-by-day moves in table form.')}

<h2>5. What the street thinks</h2>
${step('EM', 'Consensus, with history.')}
${step('ERN', 'How good the estimates have been.')}
${step('ANR', 'Ratings and targets.')}

<h2>6. Who owns it, who is against it</h2>
${step('HDS', 'The institutional register.')}
${step('SI', 'The short side.')}

<h2>7. Context</h2>
<p class="prose">A name is cheap or expensive relative to something.</p>
${step('GR', 'Head-to-head against a peer.')}
${step('HMS', 'Several names on one chart.')}
${step('G', 'The chart itself.')}
${step('IMAP', 'Where the sector sits today.')}

<h2>8. Optionality</h2>
${step('OMON', 'The chain.')}
${step('OVME', 'Pricing a position.')}

<h2>9. Keep what you learned</h2>
${step('NOTE', 'Write it down where the ticker lives.')}
${step('AL', 'Let the terminal watch the level.')}
${step('QM', 'Put the name on the list.')}

<h2>Running it for real</h2>
<p class="prose">The honest way to evaluate whether this workflow beats your current stack is to run it
on a name you already know deeply, during the ${PRICING.freeTrial.days}-day trial, and see where the data
or the workflow falls short of what you pay for today. The
<a href="/godel-terminal-free-trial/">trial guide</a> has a day-by-day version of exactly that test, and
the <a href="/godel-terminal-data-coverage/">data-coverage page</a> tells you in advance where the
delayed-data boundaries are.</p>

${ctaRow({ primary: `Start the trial and apply ${PROMO.code}`, secondary: { href: '/godel-terminal-commands/', label: 'Full command reference' } })}

${faqSection(faqs)}
`;
  },
};
