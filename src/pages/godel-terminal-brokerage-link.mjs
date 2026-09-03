import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { PLATFORMS } from '../data/research.mjs';
import { COMMANDS } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

const BROK = COMMANDS.find((c) => c.mnemonic === 'BROK');
const AUM = COMMANDS.find((c) => c.mnemonic === 'AUM');

/**
 * The brokerage-linked rate, as stated in PRICING.brokerageDiscount.note
 * (vendor in-app changelog v4.2.7 and June 2026 app build). The dollar
 * figures are pulled out here only so the arithmetic below cannot drift from
 * the sentence the site actually asserts.
 */
const BROKERAGE_RATE = 80;
const LOCKED_IN_OFF = 10;
const AUM_THRESHOLD = '$5,000';

/** The 14 names on godelterminal.com/docs/commands/brok, fetched 3 September 2026. */
const SUPPORTED_BROKERAGES = [
  'Chase',
  'E-Trade',
  'Fidelity',
  'Interactive Brokers',
  'Public',
  'Questrade',
  'Robinhood',
  'Schwab',
  'Stake Australia',
  'tastytrade',
  'TD Direct Investing',
  'Trading212',
  'Webull',
  'Wells Fargo',
];

const monthly = PRICING.monthly.amount;
const firstMonthWithCode = (monthly * (1 - PROMO.percent / 100)).toFixed(2);
const codeSaving = (monthly * PROMO.percent / 100).toFixed(2);
const rateSaving = monthly - BROKERAGE_RATE;

const faqs = [
  {
    q: 'Does Godel Terminal work with Robinhood?',
    a: `Yes, as a read-only link. Robinhood is one of the ${SUPPORTED_BROKERAGES.length} brokerages listed on the vendor's BROK documentation page (September 2026), connected through SnapTrade. The link pulls your holdings into ${esc(PRODUCT.name)} for the AUM view; it does not let you place Robinhood orders from the terminal. The doc has no Robinhood-specific caveats; SnapTrade's own integration page covers the auth flow and supported regions.`,
  },
  {
    q: 'Can I place trades or paper trade in Godel Terminal?',
    a: `No. The vendor's own line is "${esc(PLATFORMS.notABroker.quote)}" The BROK documentation states that access is read-only and that ${esc(PRODUCT.name)} "never has the ability to place trades on your behalf". No paper-trading or backtesting feature is published either. Treat the brokerage link as a portfolio view, not a trading pipe.`,
  },
  {
    q: 'Does Godel Terminal connect to Interactive Brokers?',
    a: `Yes, with a different login flow. Per the BROK doc, IBKR authenticates through a Query ID and Token generated in Client Portal (Flex Queries and the Flex Web Service), not a password. Supported regions are listed as US, Europe, Australia, India and Canada. The doc is explicit that the IBKR integration pulls account and portfolio data via Flex Query and does not support placing trades.`,
  },
  {
    q: 'What is the Godel Terminal brokerage discount?',
    a: `${esc(PRICING.brokerageDiscount.note)} The eligibility test is documented on the vendor's AUM command page; the AUM Personal tab shows whether your linked accounts meet it. The rate does not appear on the public pricing page as of September 2026, so confirm it in-app before planning around it.`,
  },
  {
    q: `Can I use ${PROMO.code} on top of the brokerage rate?`,
    a: `Nothing published says the two combine, and the vendor's referral page states referral discounts do not combine with other codes. There is also little to gain: ${esc(PROMO.code)} saves about $${codeSaving} once, while the brokerage rate saves $${rateSaving} every month you qualify. If you are eligible, take the brokerage rate; if you are not, ${esc(PROMO.code)} is the largest discount left.`,
  },
  {
    q: 'Do I need a paid account to use BROK?',
    a: `The BROK doc's notes section says BROK requires a paid account and that anonymous and free users see an upgrade prompt. The FAQ on the same page says BROK is "available on every Godel plan", which is consistent if "plan" means paid plan, but the page does not say so. Whether a ${PRICING.freeTrial.days}-day trial account counts as paid for this purpose is not published.`,
  },
];

export const page = {
  path: '/godel-terminal-brokerage-link/',
  title: 'Godel Terminal Brokerage Link: BROK, AUM and the $80 Rate',
  description: `Godel Terminal's BROK command links 14 brokerages read-only via SnapTrade, with no trading. Plus the in-app $80/month brokerage rate, compared to ${PROMO.code}.`,
  summary: 'What the Godel Terminal brokerage link (BROK) actually does — 14 read-only SnapTrade connections, no execution — and how the in-app $80/month brokerage rate compares to the promo code.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-brokerage-link/', label: 'Brokerage link' },
  ],
  faqs,
  priority: '0.8',
  render() {
    const brokerageList = SUPPORTED_BROKERAGES.map((b) => `<li>${esc(b)}</li>`).join('\n  ');
    return `
<h1>Godel Terminal Brokerage Link: what BROK does, and the $${BROKERAGE_RATE} rate it unlocks</h1>

<p class="lede">${esc(PRODUCT.name)} is not a broker and does not execute trades. What it has is a
<strong>read-only brokerage link</strong>: the documented <code class="mono">BROK</code> command connects
${SUPPORTED_BROKERAGES.length} brokerages — Robinhood, Interactive Brokers, Schwab and Fidelity among them —
through SnapTrade, so your holdings show up inside the terminal. The reason to care beyond a portfolio view
is money: the vendor's in-app copy offers connected accounts holding ${AUM_THRESHOLD}+ a rate of
<strong>$${BROKERAGE_RATE}/month instead of ${PRICING.monthly.display}</strong>, which is a bigger saving than any promo
code, including ours.</p>

${note(`<strong>Sourcing:</strong> the command behaviour on this page comes from the vendor's own
<a href="${BROK.docUrl}" rel="nofollow noopener" target="_blank">BROK</a> and
<a href="${AUM.docUrl}" rel="nofollow noopener" target="_blank">AUM</a> documentation pages, read in
September 2026. The discount figures come from ${esc(PRICING.brokerageDiscount.source)}. The rate does not
appear on the public pricing page as of September 2026, so treat it as an in-app offer that can change
without notice.`)}

<h2>What the brokerage link is, and what it is not</h2>

<p class="prose">The vendor's positioning is a single sentence: "${esc(PLATFORMS.notABroker.quote)}" The
BROK doc backs that up in plainer terms — access is read-only and ${esc(PRODUCT.name)} "never has the ability to
place trades on your behalf". So, concretely:</p>

<ul class="prose">
  <li><strong>No order execution.</strong> You cannot buy or sell from the terminal, through any of the
  ${SUPPORTED_BROKERAGES.length} connections.</li>
  <li><strong>No paper trading, no backtesting.</strong> Neither is published as a feature anywhere we can cite.</li>
  <li><strong>What you do get:</strong> your linked holdings totalled in the AUM view, and, if you clear the
  threshold, a lower monthly price.</li>
</ul>

<p class="prose">Three more constraints from the doc's notes: BROK is <strong>in beta</strong>, it is limited to a
single open window, and it requires a paid account (anonymous and free users see an upgrade prompt instead of the
brokerage list). Connecting means signing in to your brokerage inside a SnapTrade portal that opens in the BROK
window, and accepting SnapTrade's terms the first time you connect anything, so the trust decision is partly about
SnapTrade, not only about ${esc(PRODUCT.vendor)}</p>

<h2>The ${SUPPORTED_BROKERAGES.length} supported brokerages</h2>

<p class="prose">As listed on the BROK doc in September 2026. The doc says the list is kept in sync with SnapTrade's
supported integrations, and that a brokerage shown grayed out may be temporarily unavailable on SnapTrade's side.</p>

<ul class="prose">
  ${brokerageList}
</ul>

<p class="prose">Anything not on that list is not supported. The doc offers a "Don't see your brokerage? Submit it
here" form at the bottom of the window, with no commitment attached. Disconnecting is a toggle in BROK with a
confirmation toast; an expired connection reconnects by flipping the toggle again, which runs a
disconnect-then-reconnect cycle.</p>

<h3>Interactive Brokers is the special case</h3>

<p class="prose">IBKR gets its own section on the doc because it does not use a password. You generate a Query ID
(Client Portal, Performance &amp; Reports, Flex Queries) and a Token (Account Settings, Configure Flex Web Service),
then submit both on IBKR's site after SnapTrade redirects you there. Supported regions per the doc: US, Europe,
Australia, India, Canada. Because the integration reads via Flex Query, it cannot place trades even in principle.
You can also cut the link from the IBKR side by revoking the token, though the doc notes the BROK card may still
show as connected until the next poll.</p>

<h2>What AUM shows once you are connected</h2>

<p class="prose">The <code class="mono">AUM</code> command is the payoff. Per its doc page it has two tabs:</p>

<ul class="prose">
  <li><strong>Global</strong> — total USD assets across every connected ${esc(PRODUCT.name)} user, the number of
  connected brokerage users, and a "Stale Data Cutoff" timestamp. Paid accounts only.</li>
  <li><strong>Personal</strong> — the combined USD value of the brokerages you linked through BROK, when it was
  last refreshed, and a line stating whether the <strong>brokerage discount threshold is met</strong>. Any logged-in
  account.</li>
</ul>

<p class="prose">Balances refresh roughly every 24 hours, so a deposit made today will not flip the threshold line
until tomorrow. The doc states the threshold as over ${AUM_THRESHOLD} USD (or equivalent) across linked brokerages
<em>and</em> at least one eligible trade in the past month. What counts as an "eligible trade" is not defined
anywhere we can find.</p>

<h2>The brokerage rate: $${BROKERAGE_RATE}/month against ${PRICING.monthly.display}</h2>

<p class="prose">The vendor's in-app copy and changelog state the offer as: ${esc(PRICING.brokerageDiscount.note)}
The AUM doc confirms the threshold mechanics but does not print the price; the ${PRICING.monthly.display} and
$${BROKERAGE_RATE} figures come from the archived in-app copy, not from a public web page. If the number in your own
account differs, the in-app number wins.</p>

<p class="prose">Two exclusions matter. <strong>Organizations</strong> on the ORG plan are out. <strong>Prepaid
accounts</strong> are out too, and whether that covers every annual subscriber is not spelled out; read it as a
monthly-billing offer until the vendor says otherwise. Accounts on a locked-in price get $${LOCKED_IN_OFF} off rather
than the $${BROKERAGE_RATE} rate.</p>

<h2>Brokerage rate vs ${esc(PROMO.code)}: the arithmetic</h2>

${table({
  head: ['Option', 'What you pay', 'Saving vs list', 'Who it is for'],
  rows: [
    {
      highlight: true,
      cells: [
        'Brokerage rate',
        `$${BROKERAGE_RATE}/month while the threshold is met`,
        `$${rateSaving} every month`,
        `Connected brokerage with ${AUM_THRESHOLD}+ and a recent eligible trade; not ORG or prepaid`,
      ],
    },
    {
      cells: [
        `Code <span class="mono">${esc(PROMO.code)}</span>`,
        `$${firstMonthWithCode} first month, then ${PRICING.monthly.display}`,
        `$${codeSaving}, once`,
        'Anyone without a qualifying brokerage link',
      ],
    },
    {
      cells: [
        'Annual plan',
        `${PRICING.annual.display}/year, about $${PRICING.annual.effectiveMonthly}/month`,
        `$${monthly - PRICING.annual.effectiveMonthly}/month equivalent`,
        'Anyone sure enough to prepay a year',
      ],
    },
  ],
  caption: `List price ${PRICING.monthly.display}/month per ${PRICING.monthly.source}. Brokerage rate per vendor in-app copy.`,
})}

<p class="prose">For anyone eligible, the brokerage rate wins and it is not close: $${rateSaving} a month for as
long as you qualify, against $${codeSaving} once from a referral code. Twelve months at $${BROKERAGE_RATE} is
$${BROKERAGE_RATE * 12}, which also undercuts the ${PRICING.annual.display} annual plan without the prepayment.</p>

<p class="prose">Are the two stackable? <strong>Not published.</strong> The vendor's referral page states that
referral discounts do not combine with other codes, and nothing we can cite describes a referral code being applied
to a brokerage-rate account. Plan on one or the other. Every referral code in circulation is the same
${PROMO.percent}%-off-first-month offer; ${esc(PROMO.code)} is the one this site has promoted and the only one here
carrying a checkout verification date, ${esc(longDate(PROMO.lastVerified))}.</p>

${codeBox({ note: `${PROMO.percent}% off your first month, for readers who do not qualify for the brokerage rate.` })}

<h2>Which route to take</h2>

<ol class="prose">
  <li><strong>You hold ${AUM_THRESHOLD}+ at one of the ${SUPPORTED_BROKERAGES.length} brokerages and trade at least
  monthly.</strong> Start the ${PRICING.freeTrial.days}-day trial, run BROK, connect, then check the Personal tab of AUM
  the next day for "threshold met". Confirm the rate shown in-app before you convert.</li>
  <li><strong>Your broker is not listed, or you are below the threshold.</strong> The brokerage rate is not
  available to you. ${esc(PROMO.code)} on monthly billing, or the annual plan if you are committed —
  <a href="/godel-terminal-monthly-vs-annual/">the full comparison</a>.</li>
  <li><strong>You are on an ORG plan or prepaid.</strong> Excluded by the vendor's own wording. The
  <a href="/godel-terminal-pricing/">pricing page</a> covers the ORG discount separately.</li>
</ol>

<h2>What the vendor has not published</h2>

<ul class="prose">
  <li>What qualifies as an "eligible trade".</li>
  <li>Whether eligibility is re-checked each billing cycle, and what happens to the rate if you drop below
  ${AUM_THRESHOLD}.</li>
  <li>Whether the rate is applied automatically once the threshold reads "Yes", or has to be requested.</li>
  <li>How the $${BROKERAGE_RATE} rate interacts with the ${PRICING.finraSurcharge.display}/month FINRA surcharge.</li>
  <li>Whether a trial account counts as "paid" for BROK access.</li>
</ul>

<p class="prose">When any of those get a vendor answer, this page will change. Until then, the link is a read-only
portfolio view with a real discount attached, on terms that only the in-app copy states.</p>

<h2>Related reading</h2>

<ul class="prose">
  <li>Every command with its provenance tier: <a href="/godel-terminal-commands/">the command reference →</a></li>
  <li>What data the terminal carries once your holdings are in it: <a href="/godel-terminal-data-coverage/">coverage and delay tiers →</a></li>
  <li>Where the terminal runs, since there is no native app to link a broker from: <a href="/godel-terminal-desktop-and-mobile/">desktop and mobile →</a></li>
  <li>Every price lever in one place: <a href="/godel-terminal-pricing/">the pricing breakdown →</a></li>
</ul>

${ctaRow({ primary: 'Start the free trial and run BROK', secondary: { href: '/cheapest-way-to-get-godel-terminal/', label: 'Cheapest route overall' } })}

${faqSection(faqs)}
`;
  },
};
