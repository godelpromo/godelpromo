import { PRODUCT, PROMO } from '../data/site.mjs';
import { PLATFORMS, VENDOR_PAGES } from '../data/research.mjs';
import { ALIASES, COMMANDS } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

const cmd = (m) => {
  const c = COMMANDS.find((x) => x.mnemonic === m);
  if (!c) { throw new Error(`layouts page references unknown command ${m}`); }
  return c;
};

const DOCS_SHORTCUTS = VENDOR_PAGES.docsHub;

/** The backtick key, written as an entity so it survives the template literal. */
const TICK = '<span class="mono">&#96;</span>';

const key = (s) => `<span class="mono">${s}</span>`;

/**
 * The global keystroke table exactly as published in the "Keyboard shortcuts"
 * section of godelterminal.com/docs and repeated on the HELP command page's
 * Keystrokes tab, read 3 September 2026. Action text is the vendor's.
 */
const KEYSTROKES = [
  { keys: '&#96;', action: 'Focus the terminal' },
  { keys: 'Esc (double tap)', action: 'Close the current window' },
  { keys: 'Tab', action: 'Cycle through open windows' },
  { keys: 'Shift + Tab', action: 'Cycle through open windows in reverse' },
  { keys: 'F1', action: 'Open HELP' },
  { keys: 'Shift + arrow', action: 'Move the active window' },
  { keys: 'Ctrl + Shift + arrow', action: 'Snap the active window to the edge of the screen' },
  { keys: 'Option + arrow (Alt on Windows)', action: 'Resize the active window' },
  { keys: 'Option + Shift + arrow', action: 'Resize the active window to the edge of the screen' },
  { keys: 'Ctrl + Option + &uarr;', action: 'Increase terminal input + top-nav size' },
  { keys: 'Ctrl + Option + &darr;', action: 'Decrease terminal input + top-nav size' },
  { keys: 'Cmd + Z (Ctrl + Z on Windows)', action: 'Undo last window close' },
];

/**
 * Per-command window limits as each command's own doc page states them.
 * Quotation marks below mark the vendor's exact wording; the rest is
 * paraphrase. The point of the table is the unevenness: most doc pages
 * publish no limit at all, so the blanks are content rather than omissions.
 */
const WINDOW_LIMITS = [
  { m: 'G', limit: 'Up to 30 per screen on every account tier; no cap across screens' },
  { m: 'QM', limit: 'Paid: unlimited per screen and across screens. Anonymous / "piker": no hard cap, but bid and ask lock to a dash' },
  { m: 'N', limit: 'Paid: unlimited within and across screens. Anonymous / "piker": up to 2 per screen — though the same page&#39;s FAQ instead says free users get a single News window' },
  { m: 'CHAT', limit: 'Single-instance — "only one chat window is allowed at a time per layout"' },
  { m: 'HELP', limit: 'Single-instance — "HELP is limited to a single open window"' },
  { m: 'BROK', limit: 'Single open window, and the doc marks the command as beta' },
];

const faqs = [
  {
    q: `What is the keyboard shortcut to open the ${PRODUCT.name} command line?`,
    a: `The backtick key (<span class="mono">&#96;</span>), published as "Focus the terminal" in the keyboard-shortcuts table on the vendor's documentation hub and on the HELP page. It is rebindable: PDF settings carries a Terminal Key field where you click, press the new key and save. HELP notes its own shortcut list follows the rebind.`,
  },
  {
    q: `How do I close a window in ${PRODUCT.name}, and can I undo it?`,
    a: `Double-tap <span class="mono">Esc</span> closes the current window; <span class="mono">Cmd + Z</span> (<span class="mono">Ctrl + Z</span> on Windows) is published as "Undo last window close". Both sit in the vendor's global shortcut table, so they work anywhere rather than inside one component.`,
  },
  {
    q: `Can you save a layout in ${PRODUCT.name}?`,
    a: `Not as a named layout you save and load — no such command or setting is documented, though "Layouts" is one of the capabilities the vendor names on its own homepage. What is documented is automatic persistence: QM column widths "survive layout reloads", N reopens the article you had open, and G chart settings "persist across sessions on your account". Your arrangement comes back; keeping several and switching is not published.`,
  },
  {
    q: `How many windows can I have open in ${PRODUCT.name}?`,
    a: `It depends on the command, and only some doc pages state a limit. G allows up to 30 chart windows per screen; QM and N are unlimited for paid accounts; CHAT and HELP are single-instance. TAS, OMON and HMAP publish no limit at all.`,
  },
  {
    q: `Can a ${PRODUCT.name} window pop out to a second monitor?`,
    a: `Some can. The FOCUS doc says the component pops out to your operating system's desktop via the popout icon, and QM's documented window header carries one too. The G doc goes the other way: "G does not popout to a native OS window: the chart lives inside the terminal only". Most other pages say nothing either way.`,
  },
  {
    q: `Is there a ${PRODUCT.name} cheat sheet for shortcuts?`,
    a: `The vendor publishes one: a "Keyboard shortcuts" section on its documentation hub, mirrored in the Keystrokes tab of the in-app HELP window, which <span class="mono">F1</span> opens. This page reproduces it with attribution and adds the per-window keys that appear only on individual command pages.`,
  },
];

export const page = {
  path: '/godel-terminal-layouts-and-shortcuts/',
  title: 'Godel Terminal Layouts and Shortcuts: Keyboard Guide',
  description: 'The documented Godel Terminal keystroke table, per-command window limits, colour-linked windows, popouts, and what is not published about layouts.',
  summary: 'Practical reference for Godel Terminal layouts and shortcuts: the vendor keystroke table, window limits per command, colour linking, popouts, and the layout features that are not published.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-layouts-and-shortcuts/', label: 'Layouts & shortcuts' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    const keystrokeRows = KEYSTROKES.map((k) => ({ cells: [key(k.keys), k.action] }));

    const limitRows = WINDOW_LIMITS.map((w) => ({
      cells: [
        `<span class="mono">${esc(w.m)}</span> — ${esc(cmd(w.m).name)}`,
        w.limit.replace(/"/g, '&quot;'),
      ],
    }));

    return `
<h1>Godel Terminal Layouts and Shortcuts: the window system, keystroke by keystroke</h1>

<p class="lede">${esc(PRODUCT.name)} is a windowing environment that happens to live in a browser tab. The
${TICK} key focuses the command line and heads a published table of ${KEYSTROKES.length} global keystrokes that also cycle,
move, resize, snap and un-close windows; individual commands cap how many copies you can open; and some
components pop out onto the desktop while others state plainly that they do not. The
<a href="/starter-guide/">starter guide</a> covers what to type; this is the workspace you type it into.</p>

${note(`<strong>Sourcing:</strong> the keystroke table comes from the
<a href="${DOCS_SHORTCUTS}" rel="nofollow noopener" target="_blank">Keyboard shortcuts section of the vendor's
documentation hub</a> and the Keystrokes tab described on the
<a href="${cmd('HELP').docUrl}" rel="nofollow noopener" target="_blank">HELP</a> page. Limits, popouts and
per-window keys come from individual command doc pages, all read on 3 September 2026. Where the documentation is
silent, this page says so.`)}

<h2>The command line, and the key that opens it</h2>

<p class="prose">The terminal input is reached with the ${TICK} key — the vendor's action text is "Focus the
terminal". HELP publishes the full grammar as
<span class="mono">[Security Identifier] [Asset Class] [Command Shortcut] [Argument 1] [Argument 2]</span>,
longer than the <span class="mono">[TICKER] MNEMONIC</span> shorthand most walkthroughs use. Vendor examples run
both lengths — HELP's is <span class="mono">AAPL EQ G</span>, the FOCUS page writes
<span class="mono">NVDA US EQ FOCUS</span> — which reads as the extra fields disambiguating a listing rather than
being required on every line, though neither page says which are optional. Nor is the key fixed: PDF settings
carries a Terminal Key field, "Rebind the key used to focus the terminal input", and HELP's shortcut list follows
the rebind.</p>

<h2>The ${KEYSTROKES.length} global keystrokes</h2>

<p class="prose">Published as the shortcuts that work globally inside the terminal, so they apply without
opening a window first. Action wording is the vendor's.</p>

${table({
  head: ['Keys', 'What it does'],
  rows: keystrokeRows,
  caption: `Keyboard shortcuts as published on ${esc(PRODUCT.name)}'s documentation hub and HELP page, read 3 September 2026.`,
})}

<p class="prose">Three groups do real work: double-tap ${key('Esc')} closes a window and ${key('Cmd + Z')}
undoes the last close; ${key('Shift')} and ${key('Ctrl + Shift')} with the arrows move and snap it, so a grid
needs no mouse; and ${key('Ctrl + Option + &uarr;')} / ${key('&darr;')} resize the terminal input and top
navigation — the pair in the table that changes the frame rather than its contents.</p>

<h2>How many windows each command allows</h2>

<p class="prose">No global window budget is published; some command pages state their own limit, most do not.</p>

${table({
  head: ['Command', 'Documented window limit'],
  rows: limitRows,
  caption: 'Limits as each command’s own doc page states them, read 3 September 2026; quotation marks are the vendor’s wording.',
})}

<p class="prose">The <span class="mono">TAS</span>, <span class="mono">OMON</span> and
<span class="mono">HMAP</span> pages publish no limit either way — undocumented rather than unlimited. The free
"piker" tier is where the caps bite, and there the vendor disagrees with itself: N's instance-limits section caps
anonymous users at two news windows per screen, while the same page's FAQ says "Free users get a single News
window" (the <a href="/godel-terminal-news-feed/">news feed page</a> keeps the dated record). G frames its
30-chart allowance as deliberate: "grid layouts of intraday charts are intentionally supported". Note the unit,
too: limits are counted "per screen" and "across screens", and CHAT allows one "at a time per layout" — screens
and layouts are objects in the product's own vocabulary, yet how you create or switch between them is not
published.</p>

<h2>Linking windows so they follow one ticker</h2>

<p class="prose">The closest thing to a wired-together layout is documented on the G chart page: clicking the
link icon in a window title opens a link-colour picker, and "any other window set to the same color will follow
whichever ticker you type into G". The G page names the companions it has in mind — the picker is "useful for
running a G, DES, N, and OMON side-by-side that all sync when you change symbol" — but that is an example rather
than a roster, and most other command pages do not mention link colours at all, so the full set of components
that honour a group is not published. Watchlist scope travels separately: QM states watchlists are not
per-window, and N describes that scope reaching news windows without a link colour.</p>

<h2>Popouts: which windows leave the browser</h2>

<p class="prose">${esc(PRODUCT.name)} runs in the browser and no official desktop build is published; the
<a href="/godel-terminal-desktop-and-mobile/">desktop and mobile page</a> covers that and the popout story in
general. What is not collected anywhere is which components actually pop out:</p>

<ul class="prose">
  <li><strong>${key('FOCUS')} pops out</strong> to your operating system's desktop via the popout icon, with
  Safari recommended "for a cleaner window title".</li>
  <li><strong>${key('QM')} carries the icon too.</strong> The QM page describes its window header as "popout
  icon, gear (Settings), close", so FOCUS is not the only component whose documentation shows one.</li>
  <li><strong>${key('G')} does not.</strong> "G does not popout to a native OS window: the chart lives inside the
  terminal only." Plan around that if charts belong on a second display.</li>
  <li><strong>Most pages say nothing.</strong> PDF exposes a setting for the visibility of help and popout icons
  in window toolbars, implying a general affordance, but no list of them is published.</li>
</ul>

<h2>What persists, and what "saving a layout" means here</h2>

<p class="prose">Persistence is documented in several places, each of them per-window rather than
per-workspace. QM column order and widths are "persisted on this window's props, so they survive layout reloads".
On N, "if you close and reopen the layout, the article you were reading is still open". G settings are "saved per
chart window" and "persist across sessions on your account". PDF preferences "sync with your user account, so the
same theme, keybinds, and click behavior follow you across devices and browsers".</p>

<p class="prose">What is <em>not</em> published is any control for saving a layout under a name, loading a
different one, exporting it or sharing it. The gap is visible in the vendor's own materials: "Layouts" is one of
the capabilities named on its homepage and PDF's summary line mentions default layouts, yet the sections PDF
actually documents are colours, display options, keyboard overrides, command settings and a few extras — no
layout section among them. Treat it as one persistent workspace per account, not a library of saved ones.</p>

<h2>Settings that change the shape of the workspace</h2>

<p class="prose">Four PDF settings do more to a layout than a preferences screen suggests. <strong>Snap windows
to grid</strong> is configurable from 2 to 50 px. <strong>Terminal zoom</strong>, marked experimental, scales the
input and top navigation from 1&times; to 3&times;, with the documented trade-off that "increasing zoom hides
parts of the top bar". <strong>Pinned commands</strong> "pin your most-used commands to the top navigation so
they're one click away". <strong>Ticker click behaviour</strong> sets what a ticker click opens across QM, MOST,
WEI, WEIF, GLCO, HALT, TREND, FOCUS and CHAT. The cosmetic controls are documented in the same detail — colour
presets, a four-item font list (Oxygen Mono, IBM Plex Mono, JetBrains Mono and Doto), six table-animation options
of which one is "No animation", and a Command Titles control set to Use Title, Use Shortcut or Hide.</p>

<h2>Shortcuts that only work inside one window</h2>

<p class="prose">Separate from the global table, doc pages publish keys that apply while their own window has
focus. No single vendor page collects them:</p>

<ul class="prose">
  <li><strong>${key('G')}</strong> — ${key('&#8997;L')} logarithmic scale, ${key('&#8997;P')} percent scale,
  ${key('&#8997;I')} invert. The page adds that Godel's own window-management hotkeys "also work while the chart
  is focused", with the caveat that if TradingView steals keyboard focus you re-enable "Disable Focusing into
  TradingView" in PDF settings, where it is on by default.</li>
  <li><strong>${key('N')}</strong> — ${key('/')} focuses the search input, ${key('Enter')} runs it,
  ${key('Esc')} clears it.</li>
  <li><strong>${key('CHAT')}</strong> — ${key('Enter')} sends, ${key('Shift + Enter')} inserts a newline,
  ${key('&uarr;')} edits your last message when the composer is empty, ${key('Esc')} cancels.</li>
  <li><strong>${key('QM')}</strong> — ${key('Ctrl + I')} opens batch import, the practical route to the
  documented 400-ticker watchlist cap.</li>
</ul>

<p class="prose">${ALIASES.length} more mnemonics are aliases with no doc page of their own, several shorter than the command
they open; the <a href="/godel-terminal-commands/">command reference</a> lists each against its canonical target,
and the <a href="/godel-terminal-commands-that-dont-exist/">phantom-command page</a> records what resolves.</p>

<h2>What the vendor has not published</h2>

<ul class="prose">
  <li>How a screen is created, named or switched, though limits are counted per screen.</li>
  <li>Any save, load, export or share control for a named layout.</li>
  <li>A full list of which components pop out: FOCUS and QM document a popout icon, G documents that it has none, and the rest are silent.</li>
  <li>A full list of windows that respond to a link colour; the G page offers G, DES, N and OMON as an example rather than a roster.</li>
  <li>Window limits for most commands, including TAS, OMON and HMAP.</li>
  <li>Whether any global keystroke besides the terminal-focus key can be rebound.</li>
</ul>

<p class="prose">None of those gaps is fatal to a keyboard workflow, but they do mean a multi-monitor build
should be tested during <a href="/godel-terminal-free-trial/">the trial</a> rather than assumed. The vendor's own
framing sets the scope: "${esc(PLATFORMS.notABroker.quote)}"</p>

<p class="prose">None of this changes what the workspace costs. Promo code
<strong class="mono">${esc(PROMO.code)}</strong> takes ${PROMO.percent}% off your ${esc(PROMO.appliesTo)} of
${esc(PRODUCT.name)} — the one code this site has promoted, and the one carrying a checkout verification date of
${esc(longDate(PROMO.lastVerified))}. The <a href="/promo-codes/">promo codes page</a> keeps the dated record of
every other code claimed for the terminal.</p>

${codeBox()}

${ctaRow({ secondary: { href: '/godel-terminal-stock-research-workflow/', label: 'A full research workflow' } })}

${faqSection(faqs)}
`;
  },
};
