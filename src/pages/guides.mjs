import { PRODUCT } from '../data/site.mjs';
import { esc } from '../lib/components.mjs';

/**
 * Hub for every guide and deep-dive page. Exists so long-tail pages have a
 * crawlable home two clicks from the root, and so their breadcrumbs resolve
 * to something more useful than the homepage.
 */

const GROUPS = [
  {
    heading: 'Codes and deals',
    items: [
      { href: '/promo-codes/', label: 'Every promo code compared', blurb: 'Every circulating code, and why the referral ones are identical.' },
      { href: '/how-to-redeem/', label: 'How to redeem TAKE30', blurb: 'Step-by-step checkout walkthrough with troubleshooting.' },
      { href: '/godel-terminal-student-discount/', label: 'Student discount', blurb: 'The official $5/month rate — bigger than any code.' },
      { href: '/godel-terminal-official-promo-code/', label: 'The official code, X25', blurb: 'Real, official — and smaller than the referral codes.' },
      { href: '/godel-terminal-newuser-code/', label: 'Does NEWUSER work?', blurb: 'The honest answer, with the site behind it examined.' },
      { href: '/godel-terminal-get30-code/', label: 'GET30, examined', blurb: 'The code from the single-page site topping the rankings.' },
      { href: '/godel-terminal-shkreli-code/', label: 'The SHKRELI code', blurb: 'Yes, it works; the name is the interesting part.' },
      { href: '/godel-terminal-promo-code-reddit/', label: 'What Reddit says', blurb: 'The threads, fact-checked, including the thin parts.' },
      { href: '/do-godel-terminal-coupons-work/', label: 'Do the 40–75% coupons work?', blurb: 'No. How fabricated listings happen and how to spot one.' },
      { href: '/godel-terminal-black-friday/', label: 'Black Friday & Cyber Monday', blurb: 'Why the holiday-named codes work in April too.' },
      { href: '/godel-terminal-referral-program/', label: 'How the referral program works', blurb: 'The machinery behind every code page, including this one.' },
    ],
  },
  {
    heading: 'Pricing and plans',
    items: [
      { href: '/godel-terminal-pricing/', label: 'Pricing breakdown', blurb: 'Every figure sourced, including the FINRA surcharge.' },
      { href: '/godel-terminal-monthly-vs-annual/', label: 'Monthly vs annual', blurb: 'The arithmetic, and where the promo code lands in it.' },
      { href: '/godel-terminal-free-trial/', label: 'Free trial', blurb: 'Vendor-published terms, and how the trial interacts with the code.' },
      { href: '/how-to-cancel-godel-terminal/', label: 'How to cancel', blurb: 'What the terms publish, and the refund policy that is not published.' },
      { href: '/cost-calculator/', label: 'Cost calculator', blurb: 'Multi-seat, multi-year comparison against five rivals.' },
      { href: '/bloomberg-terminal-cost/', label: 'Bloomberg Terminal cost', blurb: 'The real per-seat numbers behind the $30k anchor.' },
    ],
  },
  {
    heading: 'Using the terminal',
    items: [
      { href: '/godel-terminal-commands/', label: 'Command reference', blurb: 'Every documented command, grouped the way the vendor groups them.' },
      { href: '/godel-terminal-commands-that-dont-exist/', label: 'Commands that "don\'t exist"', blurb: 'Our dated corrections ledger — what changed and when.' },
      { href: '/starter-guide/', label: 'Starter guide', blurb: 'A first 30 minutes that tests what actually matters.' },
      { href: '/godel-terminal-stock-research-workflow/', label: 'Full research workflow', blurb: 'A complete research pass, command by command.' },
      { href: '/godel-terminal-data-coverage/', label: 'Data coverage', blurb: 'Real-time vs delayed, by market — the honest split.' },
      { href: '/godel-terminal-excel/', label: 'Excel integration', blurb: 'Export exists; a live plugin does not.' },
      { href: '/godel-terminal-api/', label: 'API access', blurb: 'No public API — the full sourced answer.' },
      { href: '/godel-terminal-desktop-and-mobile/', label: 'Desktop & mobile', blurb: 'What exists, what does not, and the unofficial wrapper.' },
    ],
  },
  {
    heading: 'Decide whether it is worth it',
    items: [
      { href: '/godel-terminal-review/', label: 'The review', blurb: 'Evidence-based verdict on who the product suits.' },
      { href: '/is-godel-terminal-worth-it/', label: 'Worth it?', blurb: 'The short answer, with links to the evidence.' },
      { href: '/is-godel-terminal-legit/', label: 'Is it legit?', blurb: 'The evidence for and against, sourced both ways.' },
      { href: '/who-owns-godel-terminal/', label: 'Who owns it?', blurb: 'DL Software, the Shkreli record, and the funding history.' },
      { href: '/godel-terminal-vs-bloomberg/', label: 'vs Bloomberg', blurb: 'Function-by-function, including what Godel cannot replace.' },
      { href: '/godel-terminal-vs-tradingview/', label: 'vs TradingView', blurb: 'Different tools — the overlap is smaller than it looks.' },
      { href: '/godel-terminal-vs-koyfin/', label: 'vs Koyfin', blurb: 'The closest competitor, compared honestly.' },
      { href: '/godel-terminal-vs-factset/', label: 'vs FactSet', blurb: 'What the institutional seat buys that Godel does not.' },
      { href: '/godel-terminal-vs-seeking-alpha/', label: 'vs Seeking Alpha', blurb: 'Terminal or research subscription — usually not a real either/or.' },
      { href: '/godel-terminal-alternatives/', label: 'All alternatives', blurb: 'The whole field compared across price and coverage.' },
    ],
  },
];

export const page = {
  path: '/guides/',
  title: 'Godel Terminal Guides: Every Deep-Dive on One Page',
  description: 'Every GodelPromo guide in one place — codes, pricing math, command references, comparisons and the honest answers to the questions people actually ask.',
  summary: 'Index of every guide and deep-dive page on the site, grouped by what the reader is trying to decide.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
  ],
  priority: '0.7',
  render() {
    const sections = GROUPS.map((g) => `
<h2>${esc(g.heading)}</h2>
<div class="grid grid-2">${g.items.map((i) => `<div class="tile">
  <h3><a href="${i.href}">${esc(i.label)}</a></h3>
  <p>${esc(i.blurb)}</p>
</div>`).join('')}</div>`).join('\n');

    return `
<h1>Godel Terminal guides</h1>

<p class="lede">Everything on this site, grouped by the decision it helps with. Every page follows the same
rule: facts are sourced, reported figures are flagged as reported, and where something about
${esc(PRODUCT.name)} is not published anywhere, we say so instead of guessing.</p>
${sections}
`;
  },
};
