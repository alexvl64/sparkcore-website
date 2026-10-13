/**
 * CF Pages Function — Newsletter : confirmation de l'inscription (double opt-in, 2026-10-13)
 *
 * La page /newsletter-confirm (ou /fr/confirmation-newsletter) lit le jeton dans le fragment de l'URL de l'e-mail
 * (#t=…, jamais envoyé à un serveur ni à l'analytique) et le POSTe ici au clic sur son bouton : un scanner de
 * sécurité qui suit le lien en GET ne confirme donc pas à la place de la personne.
 * Relais serveur-à-serveur vers {ADMIN_API_BASE}/prospects/newsletter/confirm avec le Bearer (jamais exposé au
 * navigateur). Le jeton n'est jamais journalisé.
 *
 * Le navigateur POST : { token }
 * Réponses : 200 {ok, status} avec status = confirmed | already | invalid | expired | refused | retry ·
 *            502 {ok:false, status:"retry"} si l'Admin ne répond pas · 503 si non configuré.
 * Env : ADMIN_API_BASE, ADMIN_API_SECRET
 * Spec : MD/admin-app/PROSPECT-NEWSLETTER-PIPELINE.md
 */
const TOKEN = /^[A-Za-z0-9_-]{20,128}$/;

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, status: "invalid" }, { status: 400 });
  }
  const token = typeof body.token === "string" ? body.token.trim() : "";
  if (!TOKEN.test(token)) {
    return Response.json({ ok: false, status: "invalid" });
  }
  if (!env.ADMIN_API_BASE || !env.ADMIN_API_SECRET) {
    return Response.json({ ok: false, status: "retry" }, { status: 503 });
  }
  let r;
  try {
    r = await fetch(`${env.ADMIN_API_BASE.replace(/\/$/, "")}/prospects/newsletter/confirm`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${env.ADMIN_API_SECRET}` },
      body: JSON.stringify({ token }),
    });
  } catch {
    return Response.json({ ok: false, status: "retry" }, { status: 502 });
  }
  if (!r.ok) {
    return Response.json({ ok: false, status: "retry" }, { status: 502 });
  }
  let out;
  try {
    out = await r.json();
  } catch {
    return Response.json({ ok: false, status: "retry" }, { status: 502 });
  }
  const allowed = ["confirmed", "already", "invalid", "expired", "refused", "retry"];
  const status = allowed.includes(out.status) ? out.status : "retry";
  return Response.json({ ok: status === "confirmed" || status === "already", status });
}
// Seul POST est géré ; CF Pages renvoie automatiquement 405 sur les autres méthodes.
