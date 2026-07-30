#!/usr/bin/env node
/**
 * Post-build validation.
 *
 * Catches the failure modes that are invisible in a browser but expensive in
 * search: a link to a page that was renamed, JSON-LD that stopped parsing after
 * an unescaped quote, two pages competing for the same title. Run after every
 * build; exits non-zero so CI fails loudly.
 */

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

const problems = [];
const warnings = [];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { out.push(...await walk(p)); }
    else if (e.name.endsWith('.html')) { out.push(p); }
  }
  return out;
}

/** dist/foo/index.html -> /foo/ ; dist/index.html -> / */
const routeOf = (file) => {
  const rel = path.relative(dist, file).replace(/index\.html$/, '');
  return '/' + rel.replace(/\\/g, '/');
};

const files = await walk(dist);
const routes = new Set(files.map(routeOf));
const titles = new Map();
const descriptions = new Map();

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const route = routeOf(file);

  // --- JSON-LD parses ---
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ld) {
    problems.push(`${route}: no JSON-LD block`);
  } else {
    try {
      const graph = JSON.parse(ld[1]);
      if (!graph['@graph']?.length) { problems.push(`${route}: JSON-LD has no @graph nodes`); }
      // Every node referenced by @id should exist in the graph, or the entity
      // links dangle and the graph does not resolve.
      const ids = new Set(graph['@graph'].map((n) => n['@id']).filter(Boolean));
      const refs = JSON.stringify(graph['@graph']).match(/\{"@id":"([^"]+)"\}/g) || [];
      for (const r of refs) {
        const id = r.match(/\{"@id":"([^"]+)"\}/)[1];
        if (!ids.has(id)) { problems.push(`${route}: JSON-LD references missing node ${id}`); }
      }
    } catch (e) {
      problems.push(`${route}: JSON-LD does not parse — ${e.message}`);
    }
  }

  // --- title / description ---
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) { problems.push(`${route}: missing <title>`); }
  else {
    if (titles.has(title)) { problems.push(`${route}: duplicate title, also on ${titles.get(title)}`); }
    titles.set(title, route);
    if (title.length > 65) { warnings.push(`${route}: title is ${title.length} chars, likely truncated in SERPs`); }
  }

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) { problems.push(`${route}: missing meta description`); }
  else {
    if (descriptions.has(desc)) { problems.push(`${route}: duplicate description, also on ${descriptions.get(desc)}`); }
    descriptions.set(desc, route);
    if (desc.length > 165) { warnings.push(`${route}: description is ${desc.length} chars, likely truncated`); }
    if (desc.length < 70) { warnings.push(`${route}: description is only ${desc.length} chars`); }
  }

  // --- canonical ---
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) { problems.push(`${route}: missing canonical`); }
  else if (!canonical.endsWith(route)) { problems.push(`${route}: canonical mismatch — ${canonical}`); }

  // --- exactly one h1 ---
  const h1s = html.match(/<h1[^>]*>/g) || [];
  if (h1s.length !== 1) { problems.push(`${route}: expected 1 <h1>, found ${h1s.length}`); }

  // --- internal links resolve ---
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const href of new Set(hrefs)) {
    if (/\.(css|js|ico|png|jpg|svg|xml|txt)$/.test(href)) { continue; }
    if (!routes.has(href)) { problems.push(`${route}: broken internal link -> ${href}`); }
  }

  // --- outbound affiliate links carry the right rel ---
  for (const m of html.matchAll(/<a\s+[^>]*href="https:\/\/app\.godelterminal\.com[^"]*"[^>]*>/g)) {
    if (!/rel="[^"]*sponsored/.test(m[0])) {
      problems.push(`${route}: affiliate link missing rel="sponsored" — ${m[0].slice(0, 90)}`);
    }
  }
}

// --- sitemap covers every indexable route ---
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
for (const route of routes) {
  if (!sitemap.includes(`${route}<`) && !sitemap.includes(`${route}</loc>`)) {
    const full = `https://www.godelpromo.com${route}`;
    if (!sitemap.includes(full)) { problems.push(`sitemap: missing ${route}`); }
  }
}

console.log(`checked ${files.length} pages`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  ! ${w}`));
}
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach((p) => console.log(`  x ${p}`));
  process.exit(1);
}
console.log('\nall checks passed');
