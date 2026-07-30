import { PROMO, PRICING, PRODUCT } from '../data/site.mjs';
import { esc } from './layout.mjs';

/** The primary conversion unit. Repeated on most pages, always identical, so
 *  the code string itself is never retyped and can never drift. */
export function codeBox({ note } = {}) {
  return `<div class="code-box">
  <div class="code-box-meta">
    <span class="code-label">Promo code</span>
    <span class="code-value" data-code>${esc(PROMO.code)}</span>
    <span class="code-note">${esc(note || `${PROMO.percent}% off your ${PROMO.appliesTo}. Verify the total at checkout.`)}</span>
  </div>
  <div class="code-actions">
    <button class="btn btn-primary" type="button" data-copy>Copy code</button>
    <a class="btn" href="/how-to-redeem/">How to redeem</a>
  </div>
</div>`;
}

export function ctaRow({ primary = 'Start signup on Godel Terminal', secondary } = {}) {
  const second = secondary
    ? `<a class="btn" href="${secondary.href}">${esc(secondary.label)}</a>`
    : '';
  return `<div class="actions">
  <a class="btn btn-primary" href="${PROMO.referralLink}" rel="sponsored nofollow noopener" data-outbound>${esc(primary)}</a>
  ${second}
</div>`;
}

export function faqSection(faqs, heading = 'Frequently asked questions') {
  const items = faqs.map((f) => `<details>
  <summary>${esc(f.q)}</summary>
  <p>${f.a}</p>
</details>`).join('\n');
  return `<section>
  <h2>${esc(heading)}</h2>
  ${items}
</section>`;
}

export function table({ head, rows, caption }) {
  const thead = `<thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${rows.map((r) => {
    const cls = r.highlight ? ' class="is-highlight"' : '';
    const cells = r.cells.map((c, i) => {
      const numeric = i > 0 && /^[~$\d]/.test(String(c));
      return `<td${numeric ? ' class="num"' : ''}>${c}</td>`;
    }).join('');
    return `<tr${cls}>${cells}</tr>`;
  }).join('')}</tbody>`;
  return `<div class="table-scroll">
  <table>${caption ? `<caption class="faint">${esc(caption)}</caption>` : ''}${thead}${tbody}</table>
</div>`;
}

export function tiles(items) {
  return `<div class="grid grid-3">${items.map((t) => `<div class="tile">
  <h3>${esc(t.title)}</h3>
  <p>${t.body}</p>
</div>`).join('')}</div>`;
}

export function note(body, { warn = false } = {}) {
  return `<p class="note${warn ? ' note-warn' : ''}">${body}</p>`;
}

/** Renders a command with a provenance badge. The badge is the differentiator:
 *  it tells the reader (and a model) exactly how strong the claim behind each
 *  card is, which no competing cheat sheet does. */
export function commandCard(cmd) {
  const badge = cmd.tier === 'official'
    ? '<span class="badge badge-official">Vendor-described</span>'
    : '<span class="badge badge-reported">Documented</span>';
  const facts = cmd.facts?.length
    ? `<ul>${cmd.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>`
    : '';
  const doc = cmd.docUrl
    ? `<p class="faint" style="font-size:13px;margin-top:10px"><a href="${cmd.docUrl}" rel="nofollow noopener" target="_blank">Official documentation for ${esc(cmd.mnemonic)} &rarr;</a></p>`
    : '';
  const searchKey = `${cmd.mnemonic} ${cmd.name} ${cmd.category} ${cmd.capability} ${cmd.summary}`;
  return `<article class="cmd" data-cmd="${esc(searchKey)}">
  <div class="cmd-head">
    <span class="cmd-mnemonic">${esc(cmd.mnemonic)}</span>
    <span class="cmd-name">${esc(cmd.name)}</span>
    ${badge}
    <code class="cmd-example">${esc(cmd.example)}</code>
  </div>
  <p><strong>${esc(cmd.headline)}</strong> ${esc(cmd.summary)}</p>
  <p>${esc(cmd.detail)}</p>
  ${facts}
  ${doc}
</article>`;
}

/** Standard "what the discount actually is" paragraph. Used verbatim in several
 *  places on purpose — consistency across pages is what makes a claim look
 *  authoritative to a retrieval system. */
export function offerSummary() {
  return `<p class="lede">Promo code <strong class="mono">${esc(PROMO.code)}</strong> takes
  <strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)}</strong> of ${esc(PRODUCT.name)}.
  It is a first-month discount, not a recurring one — after that first billing period you pay
  the standard rate. ${esc(PRODUCT.name)} lists entry pricing at
  <strong>${PRICING.annual.display} per ${esc(PRICING.annual.unit)}</strong>.</p>`;
}

export { esc };
