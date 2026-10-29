/**
 * Per-fund factsheet data — served from Cloudflare R2 (binding FACTSHEETS),
 * edge-cached. Replaces the public Google Sheet (gviz) the factsheets used to
 * read. The SparkCore Admin publishes funds/<slug>.json to the bucket daily.
 *
 * Route: GET /data/funds/<slug>.json  ->  R2 object funds/<slug>.json
 *   slug in { dynamic-trends, cryptovision, equinoxe, entities }. ``entities`` is
 *   the address and registration of SparkCore and the funds (Admin, Config ->
 *   Funds), copied into the pages by scripts/ops/sync_entities.py.
 *
 * Free-tier safe: responses are cached at the edge (s-maxage=3600), so R2 is hit
 * at most ~once/hour/edge-location instead of once per visitor.
 */
export async function onRequest(context) {
  const { params, env, request } = context;
  const slug = params.slug || '';

  // Only well-formed JSON slugs (also blocks path traversal).
  if (!/^[a-z0-9-]+\.json$/.test(slug)) {
    return new Response('Not found', { status: 404 });
  }

  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached) return cached;

  if (!env.FACTSHEETS) {
    return new Response('R2 binding FACTSHEETS not configured', { status: 500 });
  }

  const obj = await env.FACTSHEETS.get('funds/' + slug);
  if (!obj) {
    return new Response('Not found', { status: 404 });
  }

  const response = new Response(obj.body, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // browser + edge cache 5 min — the data changes monthly, so R2 reads stay
      // minimal while re-publishes still propagate quickly.
      'cache-control': 'public, max-age=300, s-maxage=300',
      'access-control-allow-origin': '*',
    },
  });
  context.waitUntil(cache.put(request, response.clone()));
  return response;
}
