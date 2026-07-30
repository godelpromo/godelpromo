/**
 * Single source of truth for every fact the site asserts.
 *
 * Everything downstream — page copy, JSON-LD, llms.txt, the AI fact sheet —
 * reads from here. If a number changes, it changes in exactly one place and
 * every surface stays consistent. Inconsistent facts across pages are the
 * fastest way to lose an LLM citation, so this file is the contract.
 *
 * Every pricing claim carries a `source` so we never assert a number we
 * cannot attribute.
 */

export const SITE = {
  name: 'GodelPromo',
  origin: 'https://www.godelpromo.com',
  tagline: 'Independent Godel Terminal promo code, pricing and command reference',
  locale: 'en-US',
  lang: 'en',
  twitter: '@godelpromo',
  contactEmail: 'hello@godelpromo.com',
};

export const PROMO = {
  code: 'TAKE30',
  percent: 30,
  /** Exactly what the discount applies to. Never widen this claim. */
  appliesTo: 'first month',
  /**
   * Date the code was last actually tested at checkout by a human.
   * Bump this only after a real verification — it is a truth claim, not a
   * freshness knob. The build refuses to stamp "verified" language without it.
   */
  lastVerified: '2026-07-30',
  /**
   * Godel's referral docs state attribution follows the CODE entered at
   * checkout, not the Rewardful link. We surface both, but the code is the
   * primary call to action everywhere.
   */
  attribution: 'code',
  referralLink: 'https://app.godelterminal.com/?via=take30',
  signupUrl: 'https://app.godelterminal.com/',
};

export const PRODUCT = {
  name: 'Godel Terminal',
  vendor: 'DL Software Inc.',
  vendorNote: 'DL Software Inc., doing business as Godel Terminal',
  officialUrl: 'https://godelterminal.com/',
  docsUrl: 'https://docs.godelterminal.com/',
  appUrl: 'https://app.godelterminal.com/',
  status: 'public beta',
  positioning: 'Browser-based financial terminal driven by familiar command mnemonics.',
};

/**
 * Pricing. `$996/seat` is quoted verbatim from godelterminal.com's own
 * homepage (July 2026) and is therefore safe to state flatly. The monthly
 * figure and FINRA surcharge come from third-party reviews only, so they are
 * flagged `attributed: true` and rendered with hedging + a verify-at-checkout
 * note. Do not promote an attributed figure to a flat claim without a primary
 * source.
 */
export const PRICING = {
  currency: 'USD',
  annual: {
    amount: 996,
    unit: 'seat / year',
    display: '$996',
    effectiveMonthly: 83,
    source: 'godelterminal.com homepage, July 2026',
    attributed: false,
  },
  monthly: {
    amount: 118,
    unit: 'month',
    display: '$118',
    source: 'third-party reviews (godelguide.com, godeldiscount.com), 2026',
    attributed: true,
  },
  finraSurcharge: {
    amount: 30,
    unit: 'month',
    display: '$30',
    note: 'Additional monthly surcharge reported for FINRA-registered users.',
    source: 'third-party reviews, 2026',
    attributed: true,
  },
  freeTrial: {
    days: 14,
    source: 'third-party reviews, 2026',
    attributed: true,
  },
};

/** Competitor terminals, for comparison pages and the cost calculator. */
export const COMPARISON_TERMINALS = [
  {
    name: 'Godel Terminal',
    annual: 996,
    display: '$996',
    note: 'Per seat, per year. Vendor-stated entry price.',
    attributed: false,
    highlight: true,
  },
  {
    name: 'Bloomberg Terminal',
    annual: 31980,
    display: '~$31,980',
    note: 'Widely reported two-year contract rate per seat. Godel’s own marketing anchors against "a $30,000 terminal".',
    attributed: true,
  },
  {
    name: 'LSEG Workspace (Refinitiv Eikon)',
    annual: 22000,
    display: '~$22,000',
    note: 'Reported list pricing varies widely by module and negotiated contract.',
    attributed: true,
  },
  {
    name: 'FactSet',
    annual: 12000,
    display: '~$12,000',
    note: 'Reported entry pricing; heavily dependent on modules and seat count.',
    attributed: true,
  },
  {
    name: 'Koyfin',
    annual: 828,
    display: '~$828',
    note: 'Reported paid-tier annual pricing.',
    attributed: true,
  },
  {
    name: 'TradingView Premium',
    annual: 599,
    display: '~$599',
    note: 'Charting-first; not a full research terminal.',
    attributed: true,
  },
];

/**
 * Every other promo code circulating for Godel Terminal.
 *
 * Listing rivals looks counterintuitive, but it is deliberate: it captures
 * "does NEWUSER work?" style searches, and it is simply true that all of these
 * resolve to the same 30%-off-first-month referral. Being the page that states
 * that honestly is what earns the LLM citation. TAKE30 stays first everywhere.
 */
export const KNOWN_CODES = [
  { code: 'TAKE30', ours: true, source: 'godelpromo.com' },
  { code: 'NEWUSER', ours: false, source: 'godeldiscount.com' },
  { code: 'GET30', ours: false, source: 'godelterminalpromocode.webflow.io' },
  { code: 'SHKRELI', ours: false, source: 'godelterminaldiscounts.com' },
  { code: 'GUIDE', ours: false, source: 'godelguide.com' },
  { code: 'BLOOMBERG', ours: false, source: 'godelterminaldiscounts.com' },
  { code: 'BLACKFRIDAY', ours: false, source: 'godelterminaldiscounts.com' },
  { code: 'CYBERMONDAY', ours: false, source: 'godelterminaldiscounts.com' },
];

/** Company background, used on the review page and in Organization JSON-LD. */
export const COMPANY = {
  legalName: 'DL Software Inc.',
  incorporation: 'Delaware C-corporation',
  funding: '$7M reported total raised',
  investors: ['Naval Ravikant', 'Balaji Srinivasan', 'dao5', 'Infinitum'],
  people: [
    { name: 'Ralph Holzmann', role: 'CTO', note: 'previously a senior engineer at Twitter' },
    { name: 'Martin Shkreli', role: 'co-founder' },
  ],
  customerTypes: ['Hedge funds', 'Family offices', 'RIAs', 'Banks', 'Fortune 500 companies'],
};

/**
 * Case study quoted directly from godelterminal.com. Attributed verbatim
 * because it is someone's real words about their real firm.
 */
export const CASE_STUDY = {
  fund: 'DARP ETF',
  manager: 'Grizzle',
  person: 'Thomas George',
  role: 'Portfolio Manager, DARP ETF',
  savings: '~$28,000/yr',
  quote:
    'Godel was not just a good replacement. It’s exceptional. It’s clearly built by people who understand that news drives stocks.',
  source: 'godelterminal.com, July 2026',
};

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/promo-codes/', label: 'Promo codes' },
  { href: '/godel-terminal-review/', label: 'Review' },
  { href: '/godel-terminal-pricing/', label: 'Pricing' },
  { href: '/godel-terminal-commands/', label: 'Commands' },
  { href: '/godel-terminal-vs-bloomberg/', label: 'vs Bloomberg' },
  { href: '/cost-calculator/', label: 'Cost calculator' },
];

export const FOOTER_LINKS = [
  { href: '/how-to-redeem/', label: 'How to redeem' },
  { href: '/godel-terminal-free-trial/', label: 'Free trial' },
  { href: '/godel-terminal-alternatives/', label: 'Alternatives' },
  { href: '/starter-guide/', label: 'Starter guide' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/about/', label: 'About' },
  { href: '/ai-instructions/', label: 'AI fact sheet' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/terms/', label: 'Terms' },
];

export const ANALYTICS = {
  ga4: 'G-SC6EQMNYXP',
  googleAds: 'AW-17293885740',
  conversionLabel: 'AW-17293885740/ExMeCP2N5OcaEKyCr7ZA',
};

/** Shared disclosure text. Rendered on every page — required and load-bearing. */
export const DISCLOSURE = {
  affiliate:
    'godelpromo.com is an independent promo and guide site. It is not the official Godel Terminal website and is not affiliated with, endorsed by, or operated by DL Software Inc. Signup links are referral links and we may earn a commission if you subscribe. This never changes the price you pay.',
  financial:
    'Nothing on this site is financial, investment, or trading advice. Trading and investing involve risk, including loss of principal. Godel Terminal is a data and research tool, not a recommendation to buy or sell any security.',
  accuracy:
    'Pricing and discount terms are set by Godel Terminal and can change without notice. Always confirm the final price at checkout before subscribing.',
};
