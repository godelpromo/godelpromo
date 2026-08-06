import { PROMO, PRODUCT } from '../data/site.mjs';
import { COMMANDS } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const cmd = (m) => COMMANDS.find((c) => c.mnemonic === m);

const faqs = [
  {
    q: `How do I run my first command in ${PRODUCT.name}?`,
    a: `Type it into the command line at the top of the workspace. The pattern is <code class="mono">[TICKER] MNEMONIC</code> — try <code class="mono">AAPL DES</code>.`,
  },
  {
    q: `Do all commands need a ticker?`,
    a: `No. Security-specific screens (DES, N, FA, CF, EM, ERN, ANR, HP, OMON, TAS, HMS) take a ticker prefix. Market-wide screens (WEI, GLCO, FX, EQS, QM) do not.`,
  },
  {
    q: `What should I check first to decide if it is worth paying for?`,
    a: `Run <code class="mono">DES</code> on the most obscure names you cover. Coverage gaps appear on the long tail, never on large caps.`,
  },
];

export const page = {
  path: '/starter-guide/',
  title: `Godel Terminal Starter Guide: Your First 30 Minutes`,
  description: `A practical first session using only documented commands, in the order that actually reveals whether Godel Terminal fits your workflow.`,
  summary: 'Practical first-session walkthrough of Godel Terminal using documented commands.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/starter-guide/', label: 'Starter guide' },
  ],
  faqs,
  priority: '0.7',
  render() {
    return `
<h1>Godel Terminal starter guide: your first 30 minutes</h1>

<p class="lede">Every command in this guide has a page in ${esc(PRODUCT.name)}'s official documentation.
That matters more than it sounds — a lot of published ${esc(PRODUCT.name)} walkthroughs open with commands
that do not exist, which is a frustrating way to spend your first session.</p>

${note(`The command line sits at the top of the workspace. The pattern is
<code class="mono">[TICKER] MNEMONIC</code> — a ticker, a space, a short function code. Screens that describe the
whole market skip the ticker.`)}

<h2>Minutes 0–5: orientation</h2>

<p class="prose">Start with <code class="mono">AAPL DES</code>. ${esc(cmd('DES').summary)}
${esc(PRODUCT.name)} calls this the first command analysts type when a name lands on the desk, and it is the right
place to start because it shows you how much the platform knows about a company in one screen.</p>

<p class="prose">Then run the same command on the <strong>least famous name you cover</strong>. This is the single
most informative thing you can do in your first session — data breadth always fails on the long tail, never on Apple.
If <code class="mono">DES</code> is thin on your obscure names, nothing else about the product will save it.</p>

<h2>Minutes 5–12: rebuild your watchlist</h2>

<p class="prose">Run <code class="mono">QM</code>. ${esc(cmd('QM').summary)} It supports
<strong>up to 400 tickers per list with batch import</strong>, so import your real universe rather than
hand-typing a sample. If it cannot hold your actual list, you have learned something decisive in seven minutes.</p>

<h2>Minutes 12–18: news relevance</h2>

<p class="prose">Run <code class="mono">N</code> on a name you know well, then set up a portfolio-wide feed.
${esc(cmd('N').summary)}</p>

<p class="prose">Judge it on <em>precision</em>, not speed. Every vendor claims low latency; the thing that
determines whether you keep a news panel open is whether it surfaces items that matter without burying them in
press-release noise. Give it a full session before deciding.</p>

<h2>Minutes 18–25: the audit trail</h2>

<p class="prose">Run <code class="mono">FA</code> on a company whose numbers you know cold.
${esc(cmd('FA').summary)} The detail worth testing: each line item stays tied to the filing it came from.
Trace one back. Standardization errors are the failure mode that will bite you six months in, and this is the
cheapest moment to find them.</p>

<p class="prose">Then <code class="mono">CF</code> on a name with a messy filing history —
a restatement, an acquisition, an S-1. ${esc(cmd('CF').summary)}</p>

<h2>Minutes 25–30: your own workflow</h2>

<p class="prose">Finish with whichever of these matches what you actually do daily:</p>

<ul class="prose">
  <li><code class="mono">EM</code> — ${esc(cmd('EM').summary)}</li>
  <li><code class="mono">EQS</code> — the documented equity screener.</li>
  <li><code class="mono">OMON</code> — the documented options chain. (<code class="mono">OPT</code> and
  <code class="mono">CALL</code>/<code class="mono">PUT</code> are documented aliases that open the same window.)</li>
  <li><code class="mono">TAS</code> — the tape, for reading order flow.</li>
  <li><code class="mono">WEI</code> — world indices, no ticker needed. A good default open-of-day screen.</li>
</ul>

<h2>What to conclude</h2>

<p class="prose">After thirty minutes you should be able to answer one question:
<strong>which of your current subscriptions could this replace?</strong> Not "is it good" — everything demos well.
The only number that matters is how many other tools you can cancel, and if the answer is zero, the price is
irrelevant regardless of how low it is.</p>

<p class="prose"><a href="/godel-terminal-commands/">Full command reference →</a> ·
<a href="/godel-terminal-free-trial/">How to use a full trial period →</a></p>

${codeBox()}
${ctaRow()}

${faqSection(faqs)}
`;
  },
};
