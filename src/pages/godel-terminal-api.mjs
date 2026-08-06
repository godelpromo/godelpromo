import { PRODUCT } from '../data/site.mjs';
import { API_FACTS, ROADMAP, VENDOR_PAGES } from '../data/research.mjs';
import { faqSection, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `Does Godel Terminal have a public API?`,
    a: `No. No public API documentation exists — no endpoint reference, no authentication docs, no rate limits. The only trace of programmatic access is docs-hub metadata mentioning REST API and WebSocket access, described in search-indexed snippets as enterprise, case-by-case.`,
  },
  {
    q: `Can I scrape Godel Terminal instead?`,
    a: `The vendor's terms prohibit scraping and automated retrieval. So the do-it-yourself route is not a grey area — it is against the terms you agree to at signup, and we will not describe workarounds.`,
  },
  {
    q: `Will Godel Terminal add an API?`,
    a: `The only signal is a February 2025 post on the official subreddit listing 'data APIs' in the product pipeline. It is community-posted, with no date and no commitment, and we can find nothing more recent to cite. Treat it as an aspiration, not a plan.`,
  },
  {
    q: `Is there an enterprise API?`,
    a: `Possibly — the docs hub metadata mentions REST API and WebSocket access, and search-indexed snippets describe it as enterprise, case-by-case. Nothing public documents it. If you have an enterprise use case, ask the vendor directly at ${PRODUCT.supportEmail}; nothing on this page can substitute for their answer.`,
  },
];

export const page = {
  path: '/godel-terminal-api/',
  title: `Does Godel Terminal Have an API? What the Docs Show`,
  description: `What Godel Terminal publishes about programmatic access, what users ask for, and what remains undocumented. The sourced answer, kept current.`,
  summary: 'Godel Terminal has no public API; the ToS bans scraping, an enterprise REST/WebSocket hint exists in docs metadata, and a community roadmap mention carries no commitment.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-api/', label: 'API' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    return `
<h1>Does Godel Terminal have an API? No — here is the whole picture</h1>

<p class="lede">${esc(PRODUCT.name)} publishes no public API. Its terms prohibit scraping and
automated retrieval, and the only trace of programmatic access anywhere in its materials is
docs-hub metadata mentioning REST API and WebSocket access — described in search-indexed snippets
as enterprise, case-by-case. That is the complete sourced answer; everything below is the detail
and what to do instead.</p>

<h2>What the vendor actually publishes</h2>

<p class="prose">Two facts, rendered precisely because the difference between them matters:</p>

<ul class="prose">
  <li><strong>The terms of service prohibit scraping and automated retrieval.</strong> That is a
  flat vendor statement. It closes off the build-your-own-feed route entirely, whatever a browser
  devtools session might tempt you into.</li>
  <li><strong>The <a href="${VENDOR_PAGES.docsHub}" rel="nofollow noopener" target="_blank">docs
  hub</a>'s page metadata mentions REST API and WebSocket access</strong>, and search-indexed
  snippets describe that access as enterprise, case-by-case. That is metadata and snippets — not a
  documentation page. No endpoint reference, no authentication guide and no rate-limit table exist
  anywhere public. We state it at exactly that strength and no stronger.</li>
</ul>

<h2>The demand is real</h2>

<p class="prose">This is not a question nobody asks. On r/GodelTerminal in January 2025 a user asked
directly whether it is possible to download data or access it via API; in February 2025 an
r/algotrading user praised the news feed speed while noting the lack of API access in the same
breath. Community posts, so attributed as such — but they show the gap is felt by exactly the users
a terminal like this courts.</p>

<h2>The roadmap mention, weighed honestly</h2>

${note(`A February 2025 post on the official subreddit — the "${esc('Godel’s Growing Pipeline')}"
post — listed <strong>data APIs</strong> among planned work, alongside ${esc(ROADMAP.items.filter((i) => i !== 'Data APIs').slice(0, 3).join(', ').toLowerCase())}
and more (${esc(ROADMAP.source)}). It is community-posted, carries no date and no commitment, and
we can find nothing more recent. A roadmap mention is a mood, not a deliverable — do not buy a
subscription on the strength of it.`)}

<h2>What to do instead</h2>

<p class="prose">If your need is periodic data in a model, the documented route exists and works
without breaking any rules: FA exports standardized financials, EQS exports screener results, HP
exports historical prices and IPO exports calendars, all to Excel CSV or JSON. The full
export-and-model story is on <a href="/godel-terminal-excel/">the Excel page →</a></p>

<p class="prose">If your need is a programmatic feed — a pipeline, a backtest, an app — then the
honest conclusion is that ${esc(PRODUCT.name)} is a terminal you use, not a feed you build on.
Price a dedicated market-data API vendor for that job and run it alongside the terminal, or
instead of it. We do not endorse a specific provider here because we have not verified one; what
we can tell you is what Godel carries and does not, on
<a href="/godel-terminal-data-coverage/">the data coverage page →</a>, and how it compares to
other research seats on <a href="/godel-terminal-alternatives/">the alternatives page →</a></p>

${faqSection(faqs)}
`;
  },
};
