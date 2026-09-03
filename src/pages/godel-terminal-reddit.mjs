import { PROMO, PRODUCT, PRICING, REFERRAL, REFERRAL_CODES, STUDENT } from '../data/site.mjs';
import { SENTIMENT } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, note, esc, longDate } from '../lib/components.mjs';

/** Permalinks are load-bearing here: every claim on this page is a specific
 *  thread a reader can open. Kept in one list so a dead link is a one-line fix. */
const T = {
  mega: 'https://www.reddit.com/r/GodelTerminal/comments/1myawt3/mega_thread_buyselltrade_existing_godel_price/',
  updatedLook: 'https://www.reddit.com/r/GodelTerminal/comments/1n0txcq/an_updated_look_into_godel/',
  cheaper: 'https://www.reddit.com/r/GodelTerminal/comments/1tvag5r/is_there_any_way_to_get_godel_at_a_cheaper_price/',
  tooLate: 'https://www.reddit.com/r/GodelTerminal/comments/1o4zgid/is_it_to_late/',
  brokerage: 'https://www.reddit.com/r/GodelTerminal/comments/1okk016/whats_the_discount_for_connecting_your_brokerage/',
  api: 'https://www.reddit.com/r/GodelTerminal/comments/1w07fq9/does_godel_have_a_historical_data_api_for/',
  selling60: 'https://www.reddit.com/r/GodelTerminal/comments/1vt5ys0/selling_60month_locked_account/',
  splc: 'https://www.reddit.com/r/GodelTerminal/comments/1vzyxdp/new_command_supply_chain_splc/',
};

const link = (href, label) => `<a href="${href}" rel="nofollow noopener" target="_blank">${esc(label)}</a>`;

const faqs = [
  {
    q: 'Is there an official Godel Terminal subreddit?',
    a: `Yes — r/GodelTerminal, which reads more like a release-notes channel than a forum. Of the 25 posts its public feed returned on 3 September 2026, 11 came from ${esc(PRODUCT.name)} accounts and 14 from users, mostly how-to questions and bug reports.`,
  },
  {
    q: 'Is Godel Terminal worth it, according to Reddit?',
    a: `Reddit is split on price, not on the product. In the ${link(T.cheaper, '3 June 2026 pricing thread')} u/Stock-Ad-3347 called it "clean and functional but definitely not worth that price for retail"; the same account called a $10/month student rate "a steal" on 28 August 2026. Our verdict: <a href="/is-godel-terminal-worth-it/">is Godel Terminal worth it</a>.`,
  },
  {
    q: 'Are the Godel Terminal promo codes posted on Reddit legit?',
    a: `They work, but none is special and none is official. SAVE appears in the pinned mega thread, GODEL in a release-notes post, GODEL30 in comments — all referral tokens giving the same ${PROMO.percent}% off the ${esc(PROMO.appliesTo)}, the one tier published on ${esc(REFERRAL.url)}. Detail on our <a href="/godel-terminal-promo-code-reddit/">Reddit promo code page</a>.`,
  },
  {
    q: 'Can you buy a price-locked Godel Terminal account on Reddit?',
    a: `People try. The pinned ${link(T.mega, 'mega thread')} exists because standalone buy/sell posts kept appearing after, in its words, "the Godel price-lock window ended"; it directs both sides to the Godel team's site chat. Sellers there quote $60, $50 and $40 a month, and a commenter on 30 June 2026 said "Godel customer service handles the account transfer". No vendor page publishes a price lock — <a href="/godel-terminal-price-lock/">what is and is not published</a>.`,
  },
  {
    q: 'What do Reddit threads say the Godel Terminal student price is?',
    a: `A commenter in the ${link(T.cheaper, 'pricing thread')} on 23 August 2026 asked whether it is worth it "at student pricing(10 dollars a month)" — double the ${esc(STUDENT.display)}/month rate the official @GodelTerminal X account announced in November 2024. Neither figure appears on the pricing page; email ${esc(STUDENT.contact)} to confirm. See the <a href="/godel-terminal-student-discount/">student discount page</a>.`,
  },
  {
    q: 'Does Godel Terminal have an API? What did Reddit say?',
    a: `Asked on ${link(T.api, '27 August 2026')} about a historical-data API for backtesting, a u/Godel-Staff account replied next day that it is "coming soon" and that for now there is "an entitlement to get down to 1min interval price data exporting via JSON/XLSX". No API documentation is published — <a href="/godel-terminal-api/">the API page</a>.`,
  },
  {
    q: 'Why does searching Reddit for Godel Terminal return so little?',
    a: `The volume genuinely is small: ${esc(SENTIMENT.caveat)} Reddit's own search for the term also surfaces referral spam rather than the subreddit, so web search is the practical way in.`,
  },
];

export const page = {
  path: '/godel-terminal-reddit/',
  title: 'Godel Terminal Reddit: What the Threads Actually Say',
  description: 'What r/GodelTerminal really contains: release notes, price-lock resale, staff answers found nowhere else, and referral codes posted right beside them.',
  summary: 'A read of the Godel Terminal subreddit as it stands: mostly changelog and support, a price-lock resale market, staff answers not published anywhere else, and referral codes that look official because of where they sit.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-reddit/', label: 'Reddit' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.8',
  render() {
    return `
<h1>Godel Terminal Reddit: what the threads actually say</h1>

<p class="lede">Almost all ${esc(PRODUCT.name)} discussion on Reddit sits in one place, r/GodelTerminal, and
that subreddit works more like a release-notes channel than a forum. The single most useful thing to know
before you read it: the promo codes posted there sit directly beneath company announcements, which makes them
look official. They are not. They are ordinary referral tokens, worth the same
<strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)}</strong> as every other code in circulation. Every
claim below carries a date and a permalink, because Reddit's own search for this term returns referral spam
rather than the subreddit, and general search results are dominated by affiliate pages.</p>

<h2>The direct answer</h2>
<p class="prose">Of the 25 posts the subreddit's public feed returned on 3 September 2026, 11 came from
${esc(PRODUCT.name)} accounts — u/SpeculatingFarmer, u/GodelOps and u/Godel-Staff — announcing features such as
${link(T.splc, 'the SPLC supply-chain command')} on 27 August 2026 or a rebuilt DES on 20 August 2026. The other
14 came from users: nine how-to questions, bug reports or feature requests, five about price or account
transfers. There is no long-running review thread and nothing like the volume the search results imply. What
there is, is specific and datable.</p>

${codeBox()}

<h2>A code posted next to release notes is still a referral code</h2>
<p class="prose">The subreddit's pinned ${link(T.mega, 'buy/sell/trade mega thread')} — posted 23 August 2025
by u/SpeculatingFarmer, the account that also posts the release notes, and marked "Last updated: April, 2026" —
closes with "use code: SAVE to get 30% off your first month". The
${link(T.updatedLook, 'An updated look into Godel')} post of 26 August 2025 ends the same way with GODEL, though
it words the offer as "30% off your first payment" where the vendor's referral page says the first month. In
ordinary comments the token is GODEL30: u/AceROI pasted the identical sentence into
${link(T.cheaper, 'the pricing thread')} and ${link(T.tooLate, 'a price-lock thread')} on 22 July 2026, fourteen
seconds apart.</p>
<p class="prose">All three are the same thing. ${esc(PRODUCT.name)} runs one referral tier —
${esc(REFERRAL.refereeDiscount)} for the person signing up, ${esc(REFERRAL.referrerCommission)} for the code's
owner, per ${esc(REFERRAL.url)} — and the ${REFERRAL_CODES.length} codes in circulation all resolve to it.
Position on the page proves nothing. What separates them is whether anyone has checked one lately:
${esc(PROMO.code)} is the code this site promotes and the one last applied at a real checkout, on
${esc(longDate(PROMO.lastVerified))}. More on our <a href="/godel-terminal-promo-code-reddit/">Reddit promo
code page</a>; the one vendor-published code is
<a href="/godel-terminal-official-promo-code/">X25, at 25%</a>.</p>

${note(`Nothing on Reddit supports the 40%, 60% or 75% figures coupon aggregators advertise. Those are
template output, not offers — <a href="/do-godel-terminal-coupons-work/">every claim checked &rarr;</a>`,
  { warn: true })}

<h2>The price-lock resale market</h2>
<p class="prose">The most active user topic is not features, it is buying somebody else's old price. The mega
thread exists, in its own words, because "since the Godel price-lock window ended, multiple standalone posts
have popped up about buying or selling existing price locks"; standalone posts are removed and the thread
directs people to the Godel team's chat on godelterminal.com. Users post outside it anyway —
${link(T.selling60, 'Selling 60/Month Locked Account')}, 20 August 2026.</p>
<p class="prose">The numbers quoted there are old list prices, not discounts anyone can sign up for:
want-to-buy posts capped at $60/month in August and September 2025, a "selling 50/mo account" comment on 12
June 2026, and another the same day claiming "my fee is $60 a month forever. Some are $40 and some early birds
have $20" — signed with the commenter's own referral link. They tally with the documented history:
$${PRICING.history[0].monthly}/month in ${esc(PRICING.history[0].when)}, $${PRICING.history[1].monthly} in
${esc(PRICING.history[1].when)}, $${PRICING.history[2].monthly} in ${esc(PRICING.history[2].when)},
${PRICING.monthly.display} today per ${esc(PRICING.monthly.source)}. A seller wrote on 30 June 2026 that "Godel
customer service handles the account transfer", and u/GodelOps pointed people to the in-app marketplace chat on
5 November 2025. No vendor page publishes a price lock, a lifetime plan or a transfer policy —
<a href="/godel-terminal-price-lock/">what is and is not published</a>.</p>

<h2>Two things staff answered on Reddit and nowhere else</h2>
<p class="prose">This is the subreddit's real value. Asked on ${link(T.brokerage, '31 October 2025')}
"Whats the discount for connecting your brokerage?", u/GodelOps replied on 5 November 2025: "we'll be
announcing the official details on Friday. But in short, you'll be exempted from our upcoming price increase."
The asker followed up two days later with "Didn't see any announcement", and the thread ends there. The
eligibility test was later documented on the vendor's AUM command page — hold over $5,000 across linked
brokerages plus one eligible trade in the past month — but the rate it unlocks is on no vendor page; the
$80/month figure comes from archived in-app copy. Those tiers are kept apart on our
<a href="/godel-terminal-brokerage-link/">brokerage link page</a>.</p>
<p class="prose">Second, backtesting data. Asked on ${link(T.api, '27 August 2026')} whether there is a
historical-data API, a user answered "No api rn u would have to download the data in excel", and a
u/Godel-Staff account confirmed next day that an API is "coming soon" while "there's an entitlement to get down
to 1min interval price data exporting via JSON/XLSX". No API documentation exists to check that against —
<a href="/godel-terminal-api/">the API page</a>, <a href="/godel-terminal-excel/">Excel export</a>.</p>

<h2>What Reddit thinks it is worth</h2>
<p class="prose">The complaints are about price, not quality. In the ${link(T.cheaper, '3 June 2026 thread')}
the poster asked for a sale because "these prices are insane for retail investors"; u/Stock-Ad-3347 replied the
same day that they "cancelled my subscription once they jacked it", while conceding "Great UI, and product is
clean and functional". When a commenter raised student pricing at ten dollars a month on 23 August 2026, that
same sceptic called it "a steal" five days later. The tool is not the argument; the
${PRICING.monthly.display}/month sticker is. Older threads argue at prices that no longer exist —
${esc(SENTIMENT.negative[0].quote)}, from ${esc(SENTIMENT.negative[0].who)} in
${esc(SENTIMENT.negative[0].when)} — beside warmer notes such as ${esc(SENTIMENT.positive[0].who)} in
${esc(SENTIMENT.positive[0].when)} calling it the "${esc(SENTIMENT.positive[0].quote)}".</p>
<p class="prose">Read them beside <a href="/godel-terminal-pricing/">the current published pricing</a> and
our <a href="/godel-terminal-review/">evidence-based review</a>.</p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/is-godel-terminal-worth-it/', label: 'Is it worth it?' } })}

${faqSection(faqs)}
`;
  },
};
