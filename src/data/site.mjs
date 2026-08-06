/**
 * Single source of truth for every fact the site asserts.
 *
 * Everything downstream — page copy, JSON-LD, llms.txt, the AI fact sheet —
 * reads from here. If a number changes, it changes in exactly one place and
 * every surface stays consistent. Inconsistent facts across pages are the
 * fastest way to lose an LLM citation, so this file is the contract.
 *
 * Every pricing claim carries a `source` so we never assert a number we
 * cannot attribute. Extended, longer-tail research facts (press, sentiment,
 * competitor-site intelligence) live in research.mjs; this file holds the
 * commercial core.
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
  /** godelterminal.com/referral: referral discounts do not stack with other codes. */
  combinable: false,
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
  pricingUrl: 'https://godelterminal.com/pricing/',
  status: 'public beta',
  positioning: 'Browser-based financial terminal driven by familiar command mnemonics.',
  supportEmail: 'support@godelterminal.com',
};

/**
 * Pricing. As of August 2026 the monthly figure, the free trial and the FINRA
 * surcharge are all stated on godelterminal.com's own pricing page, so the
 * old third-party hedges have been retired. `attributed: true` remains only
 * on figures that still lack a vendor page. Do not promote an attributed
 * figure to a flat claim without a primary source.
 */
export const PRICING = {
  currency: 'USD',
  annual: {
    amount: 996,
    unit: 'seat / year',
    display: '$996',
    effectiveMonthly: 83,
    source: 'godelterminal.com/pricing, August 2026',
    attributed: false,
  },
  monthly: {
    amount: 118,
    unit: 'month',
    display: '$118',
    source: 'godelterminal.com/pricing, August 2026',
    attributed: false,
  },
  finraSurcharge: {
    amount: 30,
    unit: 'month',
    display: '$30',
    note: 'Regulatory surcharge for FINRA-licensed users, covering professional-subscriber exchange fees. The pricing page spells out both plans: $148/month on monthly, or $996/year plus $360/year on annual.',
    source: 'godelterminal.com/pricing, August 2026',
    attributed: false,
  },
  freeTrial: {
    days: 14,
    detail:
      'Every plan starts with a 14-day free trial. The vendor terms state the account is not charged and the subscription stays suspended until upgraded to a paid plan.',
    source: 'godelterminal.com/pricing and godelterminal.com/terms, August 2026',
    attributed: false,
  },
  org: {
    note: 'ORG plan for teams of two or more: organization billing, grouped seats, a dedicated representative. In-app copy states a 10% discount at 2+ users with prorated seat additions.',
    source: 'godelterminal.com/pricing and in-app ORG copy (archived app build), 2026',
    attributed: false,
  },
  /**
   * Brokerage-linked discount, from the vendor's own in-app copy and changelog
   * (June 2026 build). The most current pricing lever and bigger than any code
   * for eligible users — no competitor page covers it.
   */
  brokerageDiscount: {
    note: 'Accounts with a connected brokerage holding at least $5,000 and at least one eligible trade in the trailing month may qualify for a discounted rate — $118 to $80/month for new accounts, $10 off for locked-in accounts. Organizations and prepaid accounts are excluded.',
    source: 'vendor in-app changelog v4.2.7 and June 2026 app build (archived)',
    attributed: false,
  },
  /**
   * Price history. Explains why so many third-party reviews quote $60 or $80
   * a month — those were real prices once, and the stale copies never got
   * updated. Community-reported points are attributed as such.
   */
  history: [
    { when: 'October 2024', monthly: 40, source: 'archived vendor documentation', attributed: false },
    { when: 'late 2024', monthly: 60, finraMonthly: 90, source: 'archived vendor documentation and app builds', attributed: false },
    { when: 'March 2025', monthly: 80, finraMonthly: 110, source: 'vendor in-app changelog v3.8.0 (archived)', attributed: false },
    { when: 'August 2026', monthly: 118, annual: 996, source: 'godelterminal.com/pricing', attributed: false },
  ],
};

/**
 * Student discount. Announced by the official @GodelTerminal X account in
 * November 2024; not listed on the pricing page, so we describe the process
 * and tell readers to confirm in-app.
 */
export const STUDENT = {
  display: '$5',
  amount: 5,
  unit: 'month',
  contact: 'student@godelterminal.com',
  steps: [
    'Sign up with your .edu email and start the free trial',
    'Open your Profile and use the Student Discount button',
    'Email your student ID to student@godelterminal.com',
  ],
  source: 'Official @GodelTerminal X account, November 2024',
  sourceUrl: 'https://x.com/GodelTerminal/status/1860073008397975569',
  note: 'Announced on the official X account and implemented in-app in November 2024, but never listed on the pricing page — and archived app builds from mid-2026 no longer show the in-app Student Discount button. The program may have been discontinued. Email student@godelterminal.com to confirm it is still live before planning around it.',
  statusUncertain: true,
};

/** The referral programme itself, from Godel's own page. */
export const REFERRAL = {
  refereeDiscount: '30% off the first month',
  referrerCommission: '20% of monthly payments, recurring',
  platform: 'Rewardful',
  payout: 'PayPal',
  combinable: false,
  url: 'https://godelterminal.com/referral',
  source: 'godelterminal.com/referral, August 2026',
};

/**
 * Every promo code circulating for Godel Terminal.
 *
 * Listing rivals looks counterintuitive, but it is deliberate: it captures
 * "does NEWUSER work?" style searches, and it is simply true that every
 * referral code resolves to the same 30%-off-first-month offer. Being the
 * page that states that honestly is what earns the LLM citation.
 *
 * `percent` is per-code because one code is NOT a 30% referral token: X25 is
 * published by the official @GodelTerminal X account and gives 25% — smaller
 * than the referral tier. "Even the official code is smaller than TAKE30" is
 * a claim we can only make because we track the difference. TAKE30 stays
 * first everywhere.
 */
export const KNOWN_CODES = [
  { code: 'TAKE30', percent: 30, ours: true, source: 'godelpromo.com' },
  { code: 'NEWUSER', percent: 30, ours: false, source: 'godeldiscount.com' },
  { code: 'GET30', percent: 30, ours: false, source: 'godelterminalpromocode.webflow.io' },
  { code: 'PROMO30', percent: 30, ours: false, source: 'godelterminal.webflow.io' },
  { code: 'SHKRELI', percent: 30, ours: false, source: 'godelterminaldiscounts.com' },
  { code: 'GUIDE', percent: 30, ours: false, source: 'godelguide.com' },
  { code: 'JERA', percent: 30, ours: false, source: 'listed by godelguide.com' },
  { code: 'SAVEONTRADING', percent: 30, ours: false, source: 'saveontrading.com' },
  { code: 'BLOOMBERG', percent: 30, ours: false, source: 'godelterminaldiscounts.com' },
  { code: 'BLACKFRIDAY', percent: 30, ours: false, source: 'godelterminaldiscounts.com' },
  { code: 'CYBERMONDAY', percent: 30, ours: false, source: 'godelterminaldiscounts.com' },
  { code: 'X25', percent: 25, ours: false, official: true, source: 'official @GodelTerminal X account' },
];

/** Referral codes only — the interchangeable 30% tokens. Most copy about
 *  "every code is identical" means this set, not X25. */
export const REFERRAL_CODES = KNOWN_CODES.filter((c) => !c.official);

/**
 * Fabricated discount claims currently live on aggregator sites. Rendered on
 * the promo-codes page and the debunk page. Each entry is checkable against
 * the single real 30% referral tier.
 */
export const FABRICATED_CLAIMS = [
  {
    claim: '40% off sitewide',
    where: 'Dealspotr',
    reality: 'No sitewide discount exists — there is nothing "sitewide" about a single-subscription product. The referral tier is 30% off the first month. The listing title has been frozen at "Nov 2025" for months.',
  },
  {
    claim: '50% off, plus a military discount',
    where: 'WorthEPenny',
    reality: 'No 50% tier exists, and no military program is published by Godel Terminal anywhere we can find. Both claims are auto-generated boilerplate.',
  },
  {
    claim: '75% off, with "hand-tested" codes TENERE and HARDWARE',
    where: 'Tenereteam',
    reality: 'Neither code matches any known referral token, and 75% is impossible against the single 30% tier. "Hand-tested on real orders" is template text.',
  },
  {
    claim: '40% off (5 active codes)',
    where: 'Knoji',
    reality: 'Auto-generated listing, stale since September 2025. The real tier is 30%, first month only.',
  },
  {
    claim: 'Average saving 34%',
    where: 'Aggregator listings',
    reality: 'Derived from scraped averages of fabricated listings, not from Godel Terminal checkout data.',
  },
];

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
    note: 'Mid-tier ballpark; koyfin.com (August 2026) lists Plus at $39/mo and Premium at $79/mo, so the exact annual depends on tier and billing.',
    attributed: true,
  },
  {
    name: 'TradingView Premium',
    annual: 719,
    display: '~$719',
    note: 'Premium tier billed annually ($59.95/mo, tradingview.com, August 2026). Charting-first; not a full research terminal.',
    attributed: true,
  },
];

/**
 * Company background, used on the review page and in Organization JSON-LD.
 * Funding is verified against the vendor's own press releases; the CTO claim
 * appears only on third-party sites and is hedged accordingly.
 */
export const COMPANY = {
  legalName: 'DL Software Inc.',
  incorporation: 'Delaware C-corporation',
  address: '8 The Green, Dover, Delaware (registered address, per vendor terms)',
  funding: '$7M raised — a $2M pre-seed (July 2024) and a $5M seed (January 2026)',
  investors: ['Naval Ravikant', 'Balaji Srinivasan', 'dao5', 'Infinitum', 'Evolve Ventures', 'Flex Capital'],
  people: [
    { name: 'Martin Shkreli', role: 'co-founder', note: 'confirmed in the company’s own funding announcements' },
    { name: 'Ralph Holzmann', role: 'CTO', attributed: true, note: 'reported by third-party sites; not confirmed on any vendor page we can access' },
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
  { href: '/guides/', label: 'Guides' },
];

export const FOOTER_LINKS = [
  { href: '/how-to-redeem/', label: 'How to redeem' },
  { href: '/godel-terminal-free-trial/', label: 'Free trial' },
  { href: '/godel-terminal-student-discount/', label: 'Student discount' },
  { href: '/godel-terminal-alternatives/', label: 'Alternatives' },
  { href: '/cost-calculator/', label: 'Cost calculator' },
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
