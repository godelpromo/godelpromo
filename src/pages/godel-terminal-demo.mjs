import { PROMO, PRODUCT, PRICING, KNOWN_CODES, REFERRAL } from '../data/site.mjs';
import { PRESS, ROADMAP_VENDOR, VENDOR_PAGES } from '../data/research.mjs';
import { commandCount, CORRECTIONS } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

/** Every YouTube and vendor surface on this page was fetched on this date. */
const CHECKED = '2026-09-03';

/**
 * The official channel, read from YouTube's own channel and about pages on
 * 2026-09-03. Handle and channel id both resolve; the two are cross-checked
 * against each other so a renamed handle cannot silently change what this
 * page asserts.
 */
const OFFICIAL = {
  name: 'Godel',
  handle: '@Godel_Terminal',
  channelId: 'UCjADAuJOLejhfojlPO3OGuA',
  url: 'https://www.youtube.com/@Godel_Terminal',
  joined: 'Joined Oct 15, 2025',
  subscribers: '88 subscribers',
  channelViews: '208 views',
  videoCount: '2 videos',
  description:
    'Where equity, credit, and private markets meet. Join our investor community and find your next idea at app.godelterminal.com',
  /** The single link in the channel's Links section, titled "Godel Promo". */
  link: { label: 'Godel Promo', href: 'app.godelterminal.com/?via=GodelVIP', token: 'GodelVIP' },
};

/**
 * The only two videos the official channel has published. Both confirmed by
 * fetching their watch pages directly — title, publishDate, lengthSeconds and
 * viewCount all come from the page's own metadata, not from a search snippet.
 * Nothing else is listed on the channel's videos or streams tabs.
 */
const OFFICIAL_VIDEOS = [
  {
    title: 'Introducing Godel DES',
    id: 'BxoJqj7xxPw',
    published: '2026-08-20',
    lengthDisplay: '43 seconds',
    lengthAdjective: '43-second',
    views: 156,
    kind: 'Upload',
    description:
      'We wanted a better way to profile global equities, bonds, private companies, and funds. Try Godel today for free:',
  },
  {
    title: 'Godel Live Stream',
    id: 'iDopVM6n88k',
    published: '2026-08-26',
    streamedLabel: 'Streamed live on Aug 25, 2026',
    lengthDisplay: '1 hour 56 minutes',
    lengthAdjective: '1-hour-56-minute',
    views: 58,
    kind: 'Live stream',
    description: null,
  },
];

/**
 * One of two third-party channels carrying Godel volume; the larger catalogue
 * is The Shkreli Pill's, below. Figures from the channel's about page and from
 * its own on-channel search for "godel", both fetched 2026-09-03. GODEL_TITLED
 * counts videos with Godel or Gödel in the title on the first page of those
 * results — a floor, not a total.
 */
const SHKRELI_PLANET = {
  name: 'Shkreli Planet',
  handle: '@ShkreliPlanet',
  channelId: 'UCiPavLqvIE5-AwFrUGuMYyw',
  url: 'https://www.youtube.com/@ShkreliPlanet',
  joined: 'Joined Oct 8, 2023',
  subscribers: '51.3K subscribers',
  channelViews: '5,507,343 views',
  videoCount: '1,400 videos',
  godelTitled: 16,
  godelViews: '54,197',
  /** Verbatim from the description of every Godel video we checked on the channel. */
  linkLine: 'Sign Up For Godel Terminal: https://app.godelterminal.com/?via=shkreliplanet',
  codeLine: 'Use Promo Code: Shkreliplanet For 30% Off The First Month',
  otherAffiliates: 'All six also carry the same three Amazon book links; an Interactive Brokers link appears on the August 2026 video and an eToro link on the June 2026 one.',
};

/** Six of the 16, each confirmed on its own watch page. */
const SHKRELI_PLANET_VIDEOS = [
  { title: 'Martin Shkreli Speaks On Godel Terminal’s Product Roadmap', published: '2024-09-25', length: '27:23', views: '4,111' },
  { title: 'Martin Shkreli Gives A Demo Of Godel Terminal', published: '2025-06-01', length: '9:02', views: '11,597' },
  { title: 'Martin Shkreli Speaks On Godel Terminal (The Bloomberg Terminal Killer)', published: '2025-11-21', length: '9:15', views: '3,722' },
  { title: 'Martin Shkreli Talks About Why Godel Terminal Is Better Than Bloomberg Terminal', published: '2026-02-12', length: '19:57', views: '7,164' },
  { title: 'Martin Shkreli Shows New Godel Terminal Features', published: '2026-06-26', length: '23:24', views: '1,490' },
  { title: 'Martin Shkreli Releases Supply Chain Data On Godel Terminal', published: '2026-08-27', length: '1:02', views: '3,182' },
];

/** The second Shkreli-adjacent channel running Godel material. */
const SHKRELI_PILL = {
  name: 'The Shkreli Pill',
  handle: '@TheShkreliPill',
  subscribers: '84.1K subscribers',
  /** Its own on-channel search for "godel", fetched 2026-09-03. First page only — a floor, not a total. */
  godelTitled: 22,
  godelViews: '196,948',
  code: 'THESHKRELIPILL',
};

/**
 * The vendor's own "Get a demo" path, read off godelterminal.com on
 * 2026-09-03. The button is an on-page anchor, not a booking page: it opens a
 * sales-contact modal.
 */
const VENDOR_DEMO = {
  anchor: 'godelterminal.com/#demo',
  eyebrow: 'See it in action',
  heading: 'A full financial terminal starting at $996/seat.',
  body: "We'll walk through how the research workflow runs end-to-end, quotes, filings, financials, news, and options chains in one workspace. ~10 minutes.",
  modalHeading: 'Reach out to our sales team',
  modalBody: "We'll respond within 24 hours.",
};

/** Silent product clips embedded on the vendor's marketing and doc pages. */
const INLINE_CLIPS = [
  'assets/seo/img/hedge-funds-hero.webm',
  'assets/docs/des/des_terminal.mp4',
  'assets/docs/des/des-tour.webm',
  'assets/docs/qm/qm-01.webm',
  'assets/docs/cf/cf_terminal.mp4',
  'assets/docs/fa/fa-pctrev.webm',
  'assets/docs/wei/wei-01.webm',
];

/** The login-free page we re-checked for this page, on a name the supply-chain page does not use. */
const PUBLIC_AAPL = {
  url: 'app.godelterminal.com/splc/AAPL.US',
  title: 'Apple Inc. (AAPL) Supply Chain: Customers, Suppliers, and Competitors',
  relationships: 151,
  prompt: 'Unlock the full terminal.',
};

const SP_CODE = KNOWN_CODES.find((c) => c.code === 'SHKRELIPLANET');
if (!SP_CODE) { throw new Error('demo page requires the SHKRELIPLANET entry in KNOWN_CODES'); }

const PILL_CODE = KNOWN_CODES.find((c) => c.code === SHKRELI_PILL.code);
if (!PILL_CODE) { throw new Error('demo page requires the THESHKRELIPILL entry in KNOWN_CODES'); }

const SHKRELI_DEMO = PRESS.find((p) => p.title === 'Martin Shkreli Gives A Demo Of Godel Terminal');
if (!SHKRELI_DEMO) { throw new Error('demo page requires the Shkreli demo entry in PRESS'); }

/**
 * The ledger row that dates OUR correction of the command count — not the date
 * the vendor's documentation actually grew, which is not published anywhere.
 */
const GROWTH_CORRECTION = CORRECTIONS.find((c) => c.was === '17 commands documented');
if (!GROWTH_CORRECTION) { throw new Error('demo page requires the 17-to-48 entry in CORRECTIONS'); }

const officialViews = OFFICIAL_VIDEOS.reduce((n, v) => n + v.views, 0);

const faqs = [
  {
    q: `Does ${PRODUCT.name} have an official YouTube channel?`,
    a: `Yes — <span class="mono">${esc(OFFICIAL.handle)}</span>, channel id <span class="mono">${esc(OFFICIAL.channelId)}</span>, listed as "${esc(OFFICIAL.name)}". On ${esc(longDate(CHECKED))} it showed ${esc(OFFICIAL.subscribers)}, ${esc(OFFICIAL.videoCount)}, ${esc(OFFICIAL.channelViews)} lifetime on the about tab (the two watch pages sum to ${officialViews}) and "${esc(OFFICIAL.joined)}" — about ten months older than its first upload, on ${esc(longDate(OFFICIAL_VIDEOS[0].published))}.`,
  },
  {
    q: `Is there a ${PRODUCT.name} demo you can see without signing up?`,
    a: `Three things load with no account: the silent clips embedded on the vendor's marketing and documentation pages, the public supply-chain pages such as <span class="mono">${esc(PUBLIC_AAPL.url)}</span>, and the ${commandCount()} command doc pages. The "Get a demo" button plays no video — it opens a form headed "${esc(VENDOR_DEMO.modalHeading)}". <a href="/godel-terminal-supply-chain/">What the public pages show →</a>`,
  },
  {
    q: `How long is the ${PRODUCT.name} demo?`,
    a: `The vendor's figure is "~10 minutes": "${esc(VENDOR_DEMO.body)}" That is a guided session arranged through the sales form, not a recording. The whole first-party catalogue, by contrast, is ${esc(OFFICIAL_VIDEOS[0].lengthDisplay)} of product plus a ${esc(OFFICIAL_VIDEOS[1].lengthAdjective)} live stream.`,
  },
  {
    q: 'Are the Shkreli Planet Godel videos sponsored?',
    a: `They are affiliate content. Every Godel video we checked on the channel carries "${esc(SHKRELI_PLANET.codeLine)}" above a link ending <span class="mono">?via=shkreliplanet</span>, which under the vendor's referral programme pays the code's owner ${esc(REFERRAL.referrerCommission)}. Whether any arrangement beyond that exists is not published. This site runs on the same programme with ${esc(PROMO.code)}, which is why it says so rather than calling those videos independent.`,
  },
  {
    q: `Do the videos show the current version of ${PRODUCT.name}?`,
    a: `Mostly not. The third-party catalogue spans ${esc(longDate(SHKRELI_PLANET_VIDEOS[0].published))} to ${esc(longDate(SHKRELI_PLANET_VIDEOS[5].published))}, and the product moved underneath it: on ${esc(longDate(GROWTH_CORRECTION.date))} this site corrected its own count from "${esc(GROWTH_CORRECTION.was)}" to "${esc(GROWTH_CORRECTION.now)}", checked against the vendor's sitemap. When the vendor's documentation actually grew is not published, so a 2024 or 2025 walkthrough cannot be dated against a feature set — treat it as showing an earlier product, not the current one. Our <a href="/godel-terminal-commands-that-dont-exist/">corrections ledger</a> carries that entry.`,
  },
  {
    q: `What is in the official ${PRODUCT.name} DES video?`,
    a: `"${esc(OFFICIAL_VIDEOS[0].description)}" — that is the whole of the visible text, ending on a colon, with anything after it behind the watch page's "more" expander. Three of those four asset types are worth checking: neither bonds nor funds get a section on the <a href="${VENDOR_PAGES.dataCoverage}" rel="nofollow noopener" target="_blank">coverage page</a>, and the pricing page lists "ETFs and mutual funds" and "More private-company data" under "Working on" rather than "In Godel today". <a href="/godel-terminal-data-coverage/">Coverage, tier by tier →</a>`,
  },
];

export const page = {
  path: '/godel-terminal-demo/',
  title: 'Godel Terminal Demo: What You Can Watch Before Paying',
  description:
    "Godel Terminal's official YouTube channel held two videos in September 2026. What a demo gets you: silent site clips, a sales call, login-free pages.",
  summary:
    'What a Godel Terminal demo actually consists of — a two-video official YouTube channel, silent clips on the vendor site, a sales-call "Get a demo" form, login-free supply-chain pages, and affiliate third-party video.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-demo/', label: 'Demo' },
  ],
  faqs,
  priority: '0.8',
  render() {
    const officialRows = OFFICIAL_VIDEOS.map((v) => ({
      cells: [
        `<strong>${esc(v.title)}</strong><br><span class="faint mono">youtube.com/watch?v=${esc(v.id)}</span>`,
        esc(v.kind),
        esc(v.streamedLabel || longDate(v.published)),
        esc(v.lengthDisplay),
        String(v.views),
      ],
    }));

    const spRows = SHKRELI_PLANET_VIDEOS.map((v) => ({
      cells: [esc(v.title), esc(longDate(v.published)), esc(v.length), esc(v.views)],
    }));

    return `
<h1>Godel Terminal Demo: what you can actually watch before you pay</h1>

<p class="lede">The vendor publishes no self-serve demo environment for ${esc(PRODUCT.name)} on any surface we
checked. What it does publish, as of ${esc(longDate(CHECKED))}, is five separate things: an official YouTube
channel holding <strong>${OFFICIAL_VIDEOS.length} videos, ${officialViews} views between them</strong>; silent
product clips
embedded on the vendor's own marketing and documentation pages; a "Get a demo" button that opens a sales-contact
form rather than a video; two public pages that load with no login; and the
${PRICING.freeTrial.days}-day trial. Far more ${esc(PRODUCT.name)} video sits on third-party channels paid per
conversion than on any of those, and this page names that plainly.</p>

${note(`<strong>Sourcing:</strong> every channel, video, view count and date below was read on
${esc(longDate(CHECKED))} from YouTube's own channel, about and watch pages, and from
<a href="${PRODUCT.officialUrl}" rel="nofollow noopener" target="_blank">godelterminal.com</a>. View counts move,
so they are recorded as a dated snapshot. No video is embedded here, and none is described beyond its published
title, length, date and description text.`)}

<h2>The official channel, in full</h2>

<p class="prose">The channel is listed as "${esc(OFFICIAL.name)}" at <span class="mono">${esc(OFFICIAL.handle)}</span>
(channel id <span class="mono">${esc(OFFICIAL.channelId)}</span>). Its about tab reads
${esc(OFFICIAL.subscribers)}, ${esc(OFFICIAL.videoCount)}, ${esc(OFFICIAL.channelViews)} and
"${esc(OFFICIAL.joined)}" — so the account published nothing public for roughly ten months before its first upload. Its
description: "${esc(OFFICIAL.description)}"</p>

${table({
  head: ['Video', 'Type', 'Published', 'Length', 'Views'],
  rows: officialRows,
  caption: `Both read from their own watch pages on ${longDate(CHECKED)}; the about tab reported ${OFFICIAL.channelViews} in total the same day, and the two counters do not reconcile exactly.`,
})}

<p class="prose">So the first-party catalogue is one ${esc(OFFICIAL_VIDEOS[0].lengthAdjective)} clip about a single
command, plus an unedited ${esc(OFFICIAL_VIDEOS[1].lengthAdjective)} live stream with no description and no chapters.
If you came looking for a guided product tour from the vendor, that is the whole of it.</p>

<p class="prose">The short one's description, as far as the watch page renders it before the "more" expander, reads
"${esc(OFFICIAL_VIDEOS[0].description)}" — ending on a colon, with anything after it collapsed.
Three of the four asset types it names sit outside what the vendor's other pages
document: neither bonds nor funds get a section on the
<a href="${VENDOR_PAGES.dataCoverage}" rel="nofollow noopener" target="_blank">coverage page</a>, whose headings
run Equities, Indices, Futures &amp; Commodities, FX, Crypto, Options and Filings &amp; News; and the pricing page
puts "ETFs and mutual funds" and "More private-company data" under "Working on" rather than "In Godel today"
(${esc(ROADMAP_VENDOR.source)}) — <a href="/godel-terminal-data-coverage/">coverage, tier by tier</a>.</p>

<p class="prose">The channel's Links section holds one entry, "${esc(OFFICIAL.link.label)}", pointing at
<span class="mono">${esc(OFFICIAL.link.href)}</span>: a referral-tokened URL on the vendor's own channel. Who
collects on <span class="mono">${esc(OFFICIAL.link.token)}</span> is not published, and the token is not a checkout
code, so it is not one of the <a href="/promo-codes/">codes we track</a>.</p>

<h2>The demo the vendor actually offers is a sales call</h2>

<p class="prose">"Get a demo" appears in the site header, the hero, and beside most feature blocks on the
<a href="${PRODUCT.officialUrl}" rel="nofollow noopener" target="_blank">vendor's marketing site</a>. Every instance
points at the same on-page anchor,
<span class="mono">${esc(VENDOR_DEMO.anchor)}</span>, which opens a modal headed
"${esc(VENDOR_DEMO.modalHeading)}" with the line "${esc(VENDOR_DEMO.modalBody)}" The section that explains what the
demo covers is headed "${esc(VENDOR_DEMO.eyebrow)}" over "${esc(VENDOR_DEMO.heading)}", and reads:
"${esc(VENDOR_DEMO.body)}"</p>

<p class="prose">That is a clear offer, and worth taking if you are buying seats for a team. It is also not a
recording and not instant, and the same page puts "Try It Now" straight into registration beside most demo buttons —
for one person, the faster path, and free until you upgrade under the vendor terms.
<a href="/godel-terminal-free-trial/">How the ${PRICING.freeTrial.days}-day trial works →</a></p>

<h2>The silent clips nobody calls a demo</h2>

<p class="prose">The most watchable first-party material is not on YouTube at all. Most feature blocks on the
marketing site, and the doc pages behind them, embed short screen-capture clips served from the vendor's own
domain — for example:</p>

<ul class="prose">
  ${INLINE_CLIPS.map((c) => `<li><span class="mono">godelterminal.com/${esc(c)}</span></li>`).join('\n  ')}
</ul>

<p class="prose">They are silent, unnarrated and undated, and there are more of them than the channel has videos.
Read alongside the <a href="/godel-terminal-commands/">command reference</a>, they are the closest thing to a
walkthrough the vendor publishes without a form in front of it: pick the command you would live in, open its doc
page, watch what the panel does.</p>

<h2>What loads without a login</h2>

<p class="prose">Three things load with no account: the clips above, the ${commandCount()} command doc pages, and
the public supply-chain pages — and of those three, only the supply-chain pages are the running application rather
than marketing or documentation about it. We checked one on a name our
<a href="/godel-terminal-supply-chain/">supply-chain page</a> does not use:
<span class="mono">${esc(PUBLIC_AAPL.url)}</span>, fetched ${esc(longDate(CHECKED))}, is titled
"${esc(PUBLIC_AAPL.title)}", counts <strong>Relationships: ${PUBLIC_AAPL.relationships}</strong> and carries the same
"${esc(PUBLIC_AAPL.prompt)}" prompt as the NVDA page — so the pattern holds across tickers rather than being one
hand-picked URL. The market-wide Atlas page is the companion view, covered in detail there.</p>

<p class="prose">The limit: one function — SPLC, which the vendor announced on X and has not documented under
<span class="mono">/docs/commands/</span>, so it is not one of the ${commandCount()} pages — rendered outside the
terminal. It says nothing about the command line, the panel layout, latency, or the news feed. A sample of the data,
not a demo of the product.</p>

<h2>The third-party catalogue, and who is paid for it</h2>

<p class="prose">${esc(SHKRELI_PLANET.name)} (<span class="mono">${esc(SHKRELI_PLANET.handle)}</span>,
${esc(SHKRELI_PLANET.subscribers)}, ${esc(SHKRELI_PLANET.videoCount)}, ${esc(SHKRELI_PLANET.channelViews)} in
total, "${esc(SHKRELI_PLANET.joined)}") is a third-party channel built around ${esc(PRODUCT.name)}'s co-founder. Its
own search for "godel" on ${esc(longDate(CHECKED))} returned ${SHKRELI_PLANET.godelTitled} Godel-titled videos on
the first page alone, carrying ${esc(SHKRELI_PLANET.godelViews)} views between them — roughly
${Math.round(Number(SHKRELI_PLANET.godelViews.replace(/,/g, '')) / officialViews / 10) * 10} times the official
channel's whole output. Six, each confirmed on its own watch page:</p>

${table({
  head: ['Title', 'Published', 'Length', 'Views'],
  rows: spRows,
  caption: `As published on each video's own watch page, ${longDate(CHECKED)}.`,
})}

<p class="prose">Every one of those descriptions carries the same two lines:
"${esc(SHKRELI_PLANET.linkLine)}" and "${esc(SHKRELI_PLANET.codeLine)}".
${esc(SHKRELI_PLANET.otherAffiliates)} That makes them affiliate videos on the vendor's referral programme, which
pays the code owner ${esc(REFERRAL.referrerCommission)}. Our code table already carries
<span class="mono">${esc(SP_CODE.code)}</span>, sourced to that channel.</p>

<p class="prose">It is not even the larger catalogue of the two. ${esc(SHKRELI_PILL.name)}
(<span class="mono">${esc(SHKRELI_PILL.handle)}</span>, ${esc(SHKRELI_PILL.subscribers)}) run through the same
method on the same day — its own on-channel search for "godel", ${esc(longDate(CHECKED))} — returned
${SHKRELI_PILL.godelTitled} Godel-titled videos on the first page alone, carrying
${esc(SHKRELI_PILL.godelViews)} views between them, under its own token
<span class="mono">${esc(PILL_CODE.code)}</span>. That is more videos and more views than
${esc(SHKRELI_PLANET.name)}'s Godel material, on the same search and the same first-page floor, and neither number
is a channel total.</p>

<p class="prose">Saying so is not an accusation, and the footage is not worthless — the longest of the six tabled
above runs ${esc(SHKRELI_PLANET_VIDEOS[0].length)}, against the ${esc(OFFICIAL_VIDEOS[0].lengthDisplay)} the vendor
has published outside its one live stream. It changes what the video <em>is</em>: a conversion asset rather than an
evaluation. This site runs on the same programme, which is why it says so here, and the <a href="/godel-terminal-review/">evidence-based review</a> follows the same rule. One of
these — ${esc(SHKRELI_DEMO.title)}, ${esc(longDate(SHKRELI_DEMO.date))} — is logged in this site's press list as
the first-party product demo, though <a href="/who-owns-godel-terminal/">the ownership page</a> cites the Summation
podcast instead, for what the founder says rather than for what the product does.</p>

<h2>What no video answers</h2>

<ul class="prose">
  <li><strong>What you will pay.</strong> None of the eight videos tabled above names a price in its title or its
  description. The published numbers are ${PRICING.monthly.display} a month, or ${PRICING.annual.display} a year per
  seat, plus a ${PRICING.finraSurcharge.display}/month surcharge for FINRA-licensed users —
  <a href="/godel-terminal-pricing/">the pricing breakdown</a>.</li>
  <li><strong>Which version you are watching.</strong> None of these videos is labelled with a build or feature
  date, and the vendor's documentation now runs to ${commandCount()} command pages. How much of that existed when
  any given recording was made is not published.</li>
  <li><strong>Coverage on your own names.</strong> No recording can run your universe through the screener. That
  test only exists inside the trial.</li>
  <li><strong>A transcript you can cite.</strong> No uploader has published one. The watch pages we read carry
  YouTube's auto-generated English caption track — the live stream carries none at all — so the words are readable
  but the text is machine output nobody stands behind, not a published page you can quote and link the way the
  command documentation can be quoted and linked.</li>
</ul>

<h2>A better sequence than watching</h2>

<ol class="prose">
  <li>Open <span class="mono">${esc(PUBLIC_AAPL.url)}</span> and swap the ticker for a name you know well.</li>
  <li>Read the <a href="/godel-terminal-commands/">doc pages</a> for the two or three commands you would use daily,
  and watch the clips embedded in them.</li>
  <li>Start the ${PRICING.freeTrial.days}-day trial and run the
  <a href="/starter-guide/">first-30-minutes starter guide</a> — DES on your most obscure name, then a real
  watchlist, then the news feed for a full session.</li>
  <li>Only then book the vendor's ~10-minute sales call, if you are buying for a team and need the questions a
  trial cannot answer.</li>
</ol>

<p class="prose">If watching and trialling leads you to buy, ${esc(PROMO.code)} takes ${PROMO.percent}% off the
${esc(PROMO.appliesTo)} of ${esc(PRODUCT.name)} — the same 30%-off-first-month offer the ${esc(SHKRELI_PLANET.name)}
descriptions carry under their own code, and the one code this site has promoted, carrying a checkout verification
date of ${esc(longDate(PROMO.lastVerified))}.</p>

${codeBox()}

${ctaRow({ primary: 'Start the free trial on Godel Terminal', secondary: { href: '/godel-terminal-free-trial/', label: 'How the trial works' } })}

${faqSection(faqs)}
`;
  },
};
