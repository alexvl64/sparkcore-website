/**
 * Block public access to /MD/* — internal docs that CF Pages ships with the
 * static deploy.
 *
 * The legacy `_redirects` rule `/MD/* /404.html 404` was SILENTLY IGNORED by
 * Cloudflare Pages (only 301/302/303/307/308 are supported in _redirects;
 * 404-status rewrites are not) — the directory was publicly fetchable from
 * the 2026-05-06 migration until 2026-09-01. A Function route always wins
 * over static assets, so the block lives here.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  url.pathname = '/404.html';
  url.search = '';

  let body = null;
  try {
    const page = await context.env.ASSETS.fetch(new Request(url.toString()));
    if (page.ok) body = page.body;
  } catch {
    // fall through to plain 404
  }

  return new Response(body ?? 'Not Found', {
    status: 404,
    headers: {
      'Content-Type': body ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
