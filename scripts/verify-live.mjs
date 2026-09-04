#!/usr/bin/env node
/**
 * Post-deploy check of the LIVE site, not the build.
 *
 * scripts/check.mjs validates what we generate. This validates what the edge
 * actually serves, which is not the same thing and was not the same thing for
 * an unknown number of months: Cloudflare's managed robots.txt setting was
 * prepending `Disallow: /` for GPTBot, ClaudeBot, Google-Extended, CCBot and
 * five others ahead of our allow-all rules. Nothing in this repo could see it,
 * because the file we build was correct. Only fetching the live URL shows it.
 *
 * Anything that can be flipped on in a dashboard and silently invert the
 * site's strategy belongs in here.
 *
 *   node scripts/verify-live.mjs [origin]
 */

const ORIGIN = process.argv[2] || 'https://www.godelpromo.com';

const problems = [];
const notes = [];

const get = async (path, init = {}) => {
  const url = `${ORIGIN}${path}${path.includes('?') ? '&' : '?'}cb=${Date.now()}`;
  const res = await fetch(url, { redirect: 'follow', ...init });
  return { status: res.status, headers: res.headers, body: await res.text() };
};

// --- robots.txt: the file that decides whether any of this is readable ---
{
  const { status, body } = await get('/robots.txt');
  if (status !== 200) {
    problems.push(`robots.txt returned HTTP ${status}`);
  } else {
    const disallows = (body.match(/^\s*Disallow:\s*\/\s*$/gim) || []).length;
    if (disallows) { problems.push(`robots.txt carries ${disallows} blanket "Disallow: /" rule(s) — check Cloudflare's managed robots.txt setting (bot_management.is_robots_txt_managed)`); }
    if (/BEGIN Cloudflare Managed/i.test(body)) { problems.push('robots.txt contains a Cloudflare-injected managed block'); }
    if (/ai-train\s*=\s*no/i.test(body)) { problems.push('robots.txt declares Content-Signal ai-train=no — this site wants to be read by AI'); }
    if (!/^# godelpromo\.com/m.test(body.split('\n')[0] ? body : '')) {
      if (!body.trimStart().startsWith('# godelpromo.com')) { problems.push('robots.txt does not begin with our own file — something is prepending content'); }
    }
    for (const agent of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot', 'Google-Extended']) {
      if (!new RegExp(`User-agent:\\s*${agent}\\b`, 'i').test(body)) { problems.push(`robots.txt no longer names ${agent}`); }
    }
    notes.push(`robots.txt: ${body.length} bytes, ${disallows} blanket disallows`);
  }
}

// --- the machine-facing artefacts ---
for (const [path, must] of [['/llms.txt', 'TAKE30'], ['/llms-full.txt', 'TAKE30'], ['/sitemap.xml', '<loc>']]) {
  const { status, body, headers } = await get(path);
  if (status !== 200) { problems.push(`${path} returned HTTP ${status}`); continue; }
  if (!body.includes(must)) { problems.push(`${path} does not contain ${must}`); }
  if (path.endsWith('.txt') && !/noindex/i.test(headers.get('x-robots-tag') || '')) {
    problems.push(`${path} is missing its X-Robots-Tag: noindex header`);
  }
  notes.push(`${path}: ${body.length} bytes`);
}

// --- every sitemap URL resolves, and none is soft-404ing ---
{
  const { body } = await get('/sitemap.xml');
  const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  notes.push(`sitemap lists ${urls.length} URLs`);
  const bad = [];
  await Promise.all(urls.map(async (u) => {
    try {
      const r = await fetch(u, { method: 'HEAD' });
      if (r.status !== 200) { bad.push(`${u} -> ${r.status}`); }
    } catch (e) { bad.push(`${u} -> ${e.message}`); }
  }));
  for (const b of bad.slice(0, 10)) { problems.push(`sitemap URL not 200: ${b}`); }
}

// --- a genuinely unknown path must 404, not soft-404 with the homepage ---
{
  const { status } = await get('/definitely-not-a-real-page-xyz/');
  if (status !== 404) { problems.push(`unknown path returned HTTP ${status}, expected 404`); }
}

// --- the promo code is actually on the homepage ---
{
  const { body } = await get('/');
  if (!body.includes('TAKE30')) { problems.push('homepage does not contain TAKE30'); }
  if (!body.includes('offer-take30')) { problems.push('homepage JSON-LD is missing the TAKE30 Offer node'); }
}

for (const n of notes) { console.log(`  ${n}`); }
if (problems.length) {
  console.error(`\n${problems.length} live-site problem(s):`);
  for (const p of problems) { console.error(`  x ${p}`); }
  process.exit(1);
}
console.log('\nlive site OK');
