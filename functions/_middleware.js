/**
 * Cloudflare Pages root middleware — branded error pages
 *
 * Replaces the legacy .htaccess ErrorDocument directives:
 *   ErrorDocument 403 /403.html
 *   ErrorDocument 500 /500.html
 *   ErrorDocument 502 /500.html
 *   ErrorDocument 503 /500.html
 *   ErrorDocument 504 /500.html
 *
 * Only runs when a request matches a Function (not on static-asset routes,
 * which CF Pages handles natively — 404 already serves /404.html).
 *
 * - Wraps next() in try/catch so a thrown Function returns 500.html.
 * - Rewrites 403 responses with /403.html.
 * - Rewrites 500/502/503/504 responses with /500.html.
 * - Preserves the original status code; only the body and a few headers change.
 * - Non-production hosts (beta.sparkcore.fund, *.pages.dev previews) get
 *   `X-Robots-Tag: noindex, nofollow` on every response. The same code ships
 *   to prod (main = beta), where the host check makes it a no-op.
 */

const PROD_HOSTS = new Set(['sparkcore.fund', 'www.sparkcore.fund']);

function isNonProdHost(request) {
  const host = new URL(request.url).hostname;
  return !PROD_HOSTS.has(host);
}

function withNoindex(response) {
  const r = new Response(response.body, response);
  r.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return r;
}

const ERROR_MAP = {
  403: '/403.html',
  500: '/500.html',
  502: '/500.html',
  503: '/500.html',
  504: '/500.html',
};

async function brandedErrorResponse(context, status) {
  const path = ERROR_MAP[status];
  if (!path) return null;

  const url = new URL(context.request.url);
  url.pathname = path;
  url.search = '';

  try {
    const page = await context.env.ASSETS.fetch(new Request(url.toString()));
    if (!page.ok) return null;
    return new Response(page.body, {
      status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return null;
  }
}

export async function onRequest(context) {
  const response = await handle(context);
  return isNonProdHost(context.request) ? withNoindex(response) : response;
}

async function handle(context) {
  let response;
  try {
    response = await context.next();
  } catch {
    const branded = await brandedErrorResponse(context, 500);
    return branded || new Response('Internal Server Error', { status: 500 });
  }

  if (response.status in ERROR_MAP) {
    const branded = await brandedErrorResponse(context, response.status);
    if (branded) return branded;
  }

  return response;
}
