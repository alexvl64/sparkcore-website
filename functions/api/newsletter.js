/**
 * CF Pages Function — Newsletter subscribe (proxy serveur-à-serveur → API Admin)
 *
 * Le navigateur POST du JSON : { email, lang, turnstileToken, website? }
 * Vérifie Turnstile côté serveur (TURNSTILE_SECRET_KEY), puis relaie vers
 * {ADMIN_API_BASE}/prospects/newsletter avec `Authorization: Bearer {ADMIN_API_SECRET}`.
 *
 * Réponses : 200 {ok:true} · 400 {ok:false,error:"captcha"|"bad_request"} ·
 *            502 {ok:false,error:"upstream"} · 503 si non configuré.
 * Env : TURNSTILE_SECRET_KEY, ADMIN_API_BASE, ADMIN_API_SECRET
 * Spec : MD/admin-app/PROSPECT-NEWSLETTER-PIPELINE.md
 */
export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot — accepter silencieusement, ne pas relayer
  if ((body.website || "").trim() !== "") {
    return Response.json({ ok: true });
  }

  // Vérif Turnstile (serveur)
  const verify = await (
    await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: body.turnstileToken || "",
        remoteip: request.headers.get("CF-Connecting-IP") || "",
      }),
    })
  ).json();
  if (!verify.success) {
    return Response.json({ ok: false, error: "captcha" }, { status: 400 });
  }

  if (!env.ADMIN_API_BASE || !env.ADMIN_API_SECRET) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const clientIp = request.headers.get("CF-Connecting-IP") || "";
  const headers = {
    "content-type": "application/json",
    authorization: `Bearer ${env.ADMIN_API_SECRET}`,
  };
  // IP réelle du visiteur en tête du XFF ; nginx ajoute la sienne derrière (peut être IPv6).
  if (clientIp) headers["x-forwarded-for"] = clientIp;
  const r = await fetch(`${env.ADMIN_API_BASE.replace(/\/$/, "")}/prospects/newsletter`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      type: "newsletter",
      email: body.email || "",
      lang: body.lang === "fr" ? "fr" : "en",
    }),
  });
  if (!r.ok) {
    return Response.json({ ok: false, error: "upstream", status: r.status }, { status: 502 });
  }
  return Response.json({ ok: true });
}
// Seul POST est géré ; CF Pages renvoie automatiquement 405 sur les autres méthodes.
