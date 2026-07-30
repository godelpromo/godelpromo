/**
 * Apex -> www 301.
 *
 * Every canonical tag on the site points at www.godelpromo.com, so the apex
 * must redirect rather than serve a second copy of the same content.
 *
 * This is a Worker rather than a Pages `_redirects` entry because Pages only
 * matches relative paths in `_redirects` — an absolute URL on the left-hand
 * side is silently ignored (that syntax is a Netlify extension). A Cloudflare
 * Redirect Rule would be the more idiomatic fix and needs no code, but it
 * requires the zone "Dynamic Redirect" token permission; this achieves the
 * same result with permissions the deploy token already has.
 *
 * The route is scoped to the apex only, so www never reaches this Worker.
 * If the Worker is ever removed, apex falls back to serving the site directly
 * via its Pages custom domain — degraded (duplicate content) but not broken.
 */
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'www.godelpromo.com';
    url.protocol = 'https:';
    url.port = '';
    // 301 rather than 302: this is permanent, and search engines only pass
    // full ranking signal through a permanent redirect.
    return Response.redirect(url.toString(), 301);
  },
};
