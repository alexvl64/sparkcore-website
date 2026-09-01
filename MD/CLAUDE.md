# CLAUDE.md — SparkCore Investment Website

Context and configuration reference for Claude Code sessions on the `alexvl64/sci` repository.

---

## Project overview

- **Site:** sparkcore.fund — static HTML/CSS/JS, bilingual EN/FR
- **Hosting:** Cloudflare Pages (migrated from OVH 2026-05-06)
  - Prod: `sparkcore-fund` project → `main` branch → `sparkcore.fund`
  - Beta: `sparkcore-fund-beta` project → `beta` branch → `beta.sparkcore.fund`
- **Stack:** Tailwind CSS (local build, `tailwind.min.css?v=1.0`), custom CSS (`style.css?v=1.4`), vanilla JS
- **Entity:** SparkCore.investment OÜ — regulated AIFM (small fund manager), supervised by Finantsinspektsioon (Estonia)
- **Ads:** aucune publicité payante (Google Ads, Meta, LinkedIn, etc.) — site institutionnel YMYL réservé aux investisseurs professionnels

---

## Tracking & Analytics

> Site institutionnel sans pub. Tracking uniquement pour comprendre le comportement (sessions, sources organiques, scroll, clics formulaires/CTA). **Pas de Google Tag Manager** — overkill pour 1 seul tag, pas d'équipe marketing à autoguider.

### Stack tracking

| Élément | Valeur | Localisation |
|---|---|---|
| **GA4 Property** | `530665322` ("SparkCore.investment OÜ") | account `Sparkcore` (`389436882`) |
| **GA4 Measurement ID** | `G-J80NVPQNVZ` | hardcodé `assets/js/analytics.js:3` |
| **Loader** | `gtag.js` direct (pas de GTM container) | `<script defer src="/assets/js/analytics.js">` injecté sur toutes les pages |
| **Consent Mode** | v2, denied par défaut | banner cookie FR/EN auto-localisé via `<html lang>` |
| **Anonymisation IP** | `anonymize_ip: true` | configuré dans le `gtag('config', ...)` |
| **localStorage key** | `sc_cookie_consent_v1` | persiste le choix accept/decline |

### Events tracked

GA4 enhanced measurement actif → events automatiques sans code custom :
- `page_view`, `session_start`, `first_visit`, `user_engagement`
- `scroll` (90% page)
- `click` outbound (FormCarry, app.cal.eu, LinkedIn, jsdelivr, etc.)
- `file_download` (clics PDFs `/ressources/contrats/*.pdf`)
- `form_start` / `form_submit` (sidebar + newsletter FormCarry)

**Custom events GA4 (ajoutés 2026-05-05)** — 6 Key Events pour le funnel complet, en deux familles :

**Famille 1 — Code (gtag push depuis JS)** : intention déclarative et conversions actives.

| Event | Trigger | Paramètres | Fichier |
|---|---|---|---|
| `factsheet_request_open` | Click sur `.open-sidebar` avec `data-i18n=dtFactsheet` ou `cvFactsheet` | `fund` (dynamic-trends\|cryptovision), `lang` | `assets/js/index.js` |
| `contact_form_submit` | Submit succès du sidebar form (FormCarry `oHdZL-AalnM`) | `form_source` (dropdown), `cta_origin` (factsheet-*\|nav-contact\|hero), `lang` | `assets/js/index.js` |
| `cal_booking_complete` | postMessage `bookingSuccessful` depuis `app.cal.eu` (capté sur **toutes** les pages avec Cal — `/discovery-call` + factsheets popup) | `event_type=discovery`, `booking_source` (discovery_page \| factsheet-cryptovision \| factsheet-dynamic-trends \| other), `lang` | `assets/js/analytics.js` (centralisé pour couvrir popups factsheets ET embed `/discovery-call`) |

**Famille 2 — GA4 Admin (custom events filtrés sur `page_view`)** : signal d'arrivée sur les pages gated email-only. Aucun code — créés dans Admin → Affichage des données → Événements personnalisés.

| Event | Match conditions |
|---|---|
| `discovery_call_view` | `event_name = page_view` AND `page_location contains /discovery-call` |
| `factsheet_view_cryptovision` | `event_name = page_view` AND `page_location contains /factsheets/cryptovision` |
| `factsheet_view_dynamic_trends` | `event_name = page_view` AND `page_location contains /factsheets/dynamic-trends` |

> ⚠️ **Tous marqués Key Event dans GA4 Admin** (Administration → Affichage des données → Événements → "Marquer comme événement clé") pour les utiliser comme conversions.

Tous les events code-side guard `typeof window.gtag === "function"` → silencieux sous Consent Mode v2 denied + en localhost. Pour ajouter un nouvel event custom : si signal "arrivée sur une page" → Famille 2 (GA4 Admin, no code) ; si signal d'action utilisateur (click, submit, postMessage) → Famille 1 (snippet + Key Event Admin).

**Funnel mesurable** :
```
Homepage / pages publiques
  → factsheet_request_open  (Tier 1 — intent fund spécifique)
  → contact_form_submit     (Tier 1 — qualified lead, source dropdown)
[email avec lien factsheet ou /discovery-call envoyé manuellement]
  → factsheet_view_*        (Tier 1 — taux d'ouverture-clic email factsheet)
  → discovery_call_view     (Tier 1 — taux d'arrivée page Cal)
  → cal_booking_complete    (Tier 1 — conversion ultime, booking_source distingue origine)
```

### Pages gated (jamais indexer) — défense en profondeur (2026-05-05)

Les pages `/factsheets/cryptovision`, `/factsheets/dynamic-trends` et `/discovery-call` sont des **landings email-only** envoyées manuellement aux prospects qualifiés. **Ne JAMAIS** les indexer.

Quatre couches de protection en place :

| Couche | Implémentation |
|---|---|
| Meta tag HTML | `<meta name="robots" content="noindex, nofollow" />` sur les 3 pages |
| Header HTTP | `X-Robots-Tag: noindex, nofollow, noarchive` via `_headers` (règles `/factsheets/*`, `/discovery-call`, `/discovery-call.html`, `/validation`, `/validation.html`) — couvre les rewritten paths sans `.html` et les bots qui ignorent les meta |
| `robots.txt` | `Disallow: /factsheets/`, `Disallow: /discovery-call` répliqué sur **6 AI crawlers** (GPTBot, OAI-SearchBot, Google-Extended, ClaudeBot, PerplexityBot, CCBot) + `User-agent: *`. **`/ressources/` retiré du Disallow le 2026-05-05** : la protection vit désormais sur le X-Robots-Tag des PDFs (defense en profondeur) — sinon Google ne pouvait pas crawler les vieux PDFs et les laissait indexés malgré tout (paradoxe robots.txt + noindex). |
| `llms.txt` + `llms-full.txt` | URLs factsheets retirées, mention textuelle gardée : `factsheet available on request to qualified investors` |

Sitemap.xml ne contient PAS ces 3 pages (volontaire). GSC URL Inspection 2026-05-05 a confirmé qu'aucune n'était indexée par Google.

> Si une nouvelle page gated est créée à l'avenir, propager les 4 couches — sinon elle peut fuiter via `llms.txt` ou les AI crawlers même avec un meta noindex.

### APIs connectées (config `~/.config/claude-seo/projects/sci.json`)

| API | Statut | Notes |
|---|---|---|
| GA4 Data API | ✅ | property `530665322` |
| GSC Search Analytics | ✅ | `sc-domain:sparkcore.fund` |
| GSC URL Inspection | ✅ | |
| GSC Indexing API | ✅ | |
| PageSpeed Insights | ⚠️ | bug script `audit_details` côté skill (credentials OK) |
| CrUX history | ⚠️ | trafic Chrome insuffisant — normal pour site récent |
| Cloudflare API | ✅ Read-only | clé `cloudflare_api_token`, IP-restreinte au VPS, créée 2026-05-06. Voir section Cloudflare ci-dessous pour usage. |
| Google Ads | ❌ | non applicable (pas d'ads) |
| Bing Webmaster | ✅ | clé dans `backlinks-projects/sci.json`, voir section Bing WMT |
| IndexNow | ✅ | clé `27994a06b868d24820429dc36c1bafee`, script `scripts/ops/indexnow_ping.py` |

Service Account partagé : `claude-seo@sparkcore-projet-1733486598578.iam.gserviceaccount.com` (Viewer sur GA4, Full sur GSC).

> ⚠️ **Note historique 2026-05-02** : la config sci pointait par erreur vers `properties/529476067` (orphelin, 0 row). Corrigé vers `530665322` après triangulation : repo `analytics.js:3` + `curl https://sparkcore.fund/assets/js/analytics.js` + GA4 admin `dataStreams.list`. Toujours croiser ces 3 sources avant de déclarer le tracking en panne.

### Vérifier le tracking depuis le navigateur

1. **DevTools Network** : F12 → filtre `collect` → recharger → requête `https://www.google-analytics.com/g/collect?v=2&tid=G-J80NVPQNVZ&...`
2. **Console JS** : `window.dataLayer.find(x => x[0] === 'config')` → `['config', 'G-J80NVPQNVZ', { anonymize_ip: true }]`
3. **GA4 Realtime** : property `SparkCore.investment OÜ` → Reports → Realtime → +1 user dans les 30s

### Bots & exclusions

- Tracking ne tourne **pas en localhost** (`localhost`/`127.0.0.1` skipped en début de `analytics.js`)
- Pas d'exclusion bot custom dans GA4 (filtres bot par défaut activés au niveau property)
- Auto-redirect `/` ↔ `/fr/` via `lang-redirect-{en,fr}.js` skip une longue liste de bots (Googlebot, ClaudeBot, GPTBot, PerplexityBot, etc.) — ces requêtes ne sont jamais redirigées

### Bing Webmaster Tools (mis en place 2026-05-05)

| Élément | Valeur |
|---|---|
| **Compte Bing WMT** | `sparkcore.public.df59f6@gmail.com` (Owner) |
| **Vérification** | `BingSiteAuth.xml` à la racine, GUID `0739094849505C87C0C6BCFDCA094258` |
| **API key** | stockée dans `~/.config/claude-seo/backlinks-projects/sci.json` (chmod 600) |
| **Sitemap soumis** | `https://sparkcore.fund/sitemap.xml` (27 URLs, last crawl ~ daily) |
| **Sitemap obsolète** | `https://www.sparkcore.fund/sitemap.xml` (10 URLs, à supprimer côté UI Bing — cosmétique) |

Le skill `seo-backlinks` lit la config via le symlink `~/.config/claude-seo/backlinks-api.json` qui suit le projet actif (switch via `~/.config/claude-seo/switch.sh sci`). **Connexion à GSC depuis Bing WMT NON nécessaire** — le site est déjà vérifié et indexé indépendamment.

> **Note sur les "404" du skill `seo-backlinks`** (audit 2026-05-08, S6-1) : la config projet (`bing_verified_sites: ["https://sparkcore.fund/"]`) est correcte et matche `GetSiteRoles` Bing exactement. Les erreurs HTTP 404 viennent du skill qui appelle un endpoint déprécié (`GetLinkDetails`). L'endpoint vivant est `GetLinkCounts` qui retourne `{Links: [], TotalPages: 0}` — ce n'est pas une erreur, le site n'a juste **aucun backlink indexé chez Bing à date** (normal pour une fondation 1 mois). Re-checker à 3 mois post-launch. Aucune action côté projet.

### IndexNow (mis en place 2026-05-05)

Protocole de ping pour notifier Bing/Yandex/Seznam/Yep/Naver des URLs nouvelles ou modifiées (indépendant de Bing WMT API).

| Élément | Valeur |
|---|---|
| **Clé IndexNow** | `27994a06b868d24820429dc36c1bafee` |
| **Fichier servi** | `https://sparkcore.fund/27994a06b868d24820429dc36c1bafee.txt` (HTTP 200, `text/plain`, 32 octets) |
| **Script** | `scripts/ops/indexnow_ping.py` (stdlib only, pas de dépendances) |
| **Log** | `logs/indexnow.log` (gitignored, rotation 30j auto) |
| **Premier ping live** | 2026-05-05 — HTTP 202 Accepted (key validation pending, comportement normal) |

Usage :
```bash
# Après publication d'un nouvel article :
python3 scripts/ops/indexnow_ping.py \
  https://sparkcore.fund/blog/new-slug \
  https://sparkcore.fund/fr/blog/new-slug

# Ré-ping global depuis sitemap.xml :
python3 scripts/ops/indexnow_ping.py --all

# Inspection sans envoi :
python3 scripts/ops/indexnow_ping.py --all --dry-run
```

> **Ne PAS partager la clé** entre projets — chaque domaine doit avoir sa propre clé. Celle de dsungkur (`e3fe89c6...a2bd`) est isolée et ne doit jamais apparaître ici.

### Microsoft Clarity — décision 2026-05-05 : non installé

Décision argumentée de **ne PAS installer Clarity** sur sparkcore.fund :
- **Volume insuffisant** : 2 sessions / 28j en GA4 → heatmaps et session replays ont besoin de 100+ sessions/mois pour produire des insights non-anecdotiques
- **YMYL financier régulé** (Finantsinspektsioon) : ajouter Microsoft comme sous-traitant data demande update DPA + cookie policy + privacy-policy.html
- **Audience HNW institutionnelle** : session replay capture des comportements sensibles sur le formulaire discovery-call
- **Stack minimaliste par design** (pas de GTM) : ajouter Clarity contredirait cette philosophie

À reconsidérer **uniquement si** : trafic > 100 sessions/mois pendant 3 mois consécutifs ET point de friction CRO identifié ET bandwidth pour mettre à jour le compliance legal.

### Audio narration — Cloud Text-to-Speech (mis en place 2026-05-07)

Génération d'audio de narration pour les articles longs (ex: `/fr/blog/clarity-act-us-impacts-investisseurs`). Player UI custom charte SparkCore + sticky mini-bar bottom (`assets/css/audio-player.css` + `assets/js/audio-player.js`).

| Élément | Valeur |
|---|---|
| **Service** | Google **Cloud** Text-to-Speech (≠ Gemini AI Studio TTS) |
| **Endpoint** | `texttospeech.googleapis.com` |
| **Projet GCP** | `sparkcore-projet-1733486598578` (numéro `319198584479`) — owner `sparkcore.public.df59f6@gmail.com` |
| **Auth** | Service account existant `claude-seo@sparkcore-projet-1733486598578.iam.gserviceaccount.com` (déjà configuré pour GSC/GA4) |
| **Script** | `scripts/ops/tts_cloud_long.py` — chunking par paragraphe (max 4500 chars/chunk) + concat ffmpeg avec 0,4s silence inter-chunk |
| **Voix par défaut** | `fr-FR-Neural2-G` (MALE, narrative pro) — gratuite via free tier 1M chars/mois |
| **Voix premium** | `fr-FR-Chirp3-HD-Charon` (MALE, $30/1M chars), `fr-FR-Studio-D` (MALE broadcast, $160/1M chars) |
| **Format output** | MP3 mono 96 kbps 24 kHz |

#### Pourquoi Cloud TTS et pas Gemini TTS Flash AI Studio

Gemini TTS Flash (`gemini-2.5-flash-preview-tts`) a une **limite de durée audio output non documentée** : pour un texte de ~4 600 mots / 30 000 chars, il compresse la prosodie pour rester sous ~10 min audio, donnant un débit anormal de **~420 wpm** au lieu de 130-160 wpm normal en français. Vérifié 2026-05-07 sur l'article CLARITY Act (audio livré $3,67, débit non uniforme entre début et fin).

Cloud TTS Neural2 / Chirp3-HD n'a **pas cette limite** : chaque chunk de 4 500 chars est généré indépendamment avec un débit naturel uniforme. Concaténation propre via ffmpeg avec petit silence inter-section pour respiration.

#### Pricing Cloud TTS (vérifié 2026-05-07)

| Tier | Prix /1M chars | Free tier mensuel | Pour article 30k chars |
|---|---|---|---|
| Standard | $4 | 4M chars/mois | $0 |
| Wavenet / Neural2 | $16 | **1M chars/mois** | **$0** (volume sci faible) |
| Chirp3-HD (Gemini-based) | $30 | aucun | $0,90 |
| Studio (broadcast) | $160 | 100k chars/mois | $4,80 |

Sci faisant ~12 articles/an avec audio, Neural2 reste largement sous le free tier → coût effectif **$0/an**.

#### Activation

API activée le 2026-05-07 sur le projet sparkcore depuis le compte `sparkcore.public.df59f6@gmail.com`. Aucune nouvelle clé créée — réutilisation du SA existant. Pour activer une nouvelle voix premium ou modifier les permissions IAM, utiliser le compte `sparkcore.public.df59f6@gmail.com` (pas `alex@cointips.fr`).

#### Deux modes : résumé court vs lecture intégrale

**Mode résumé (recommandé par défaut)** — 200-300 mots, 1-2 min audio, 600-900 KB. Couvre les 4-5 takeaways clés en français naturel narratif. C'est ce qui charge sur le player de l'article. Taux d'écoute attendu beaucoup plus élevé qu'une lecture intégrale.

**Mode lecture intégrale** — 4 000-5 000 mots, 25-30 min audio, 12-13 MB. Lecture du body article. Optionnel, pour readers qui veulent l'expérience complète. Pas chargé par défaut sur le player ; peut être référencé via lien direct.

#### Naming convention assets/audio/

| Fichier | Contenu | Player |
|---|---|---|
| `<slug>-resume.mp3` | Résumé 200-300 mots, 1-2 min | **Default** sur le player de l'article |
| `<slug>.mp3` | Lecture intégrale du body | Optionnel, lien direct |

#### Procédure complète (à reproduire pour chaque nouvel article)

**Étape 1** — Rédiger le script résumé (200-300 mots, français parlé naturel) :

Règles :
- **Intro standardisée obligatoire** (toujours identique d'un article à l'autre) — ouvrir avec : *"Cet article vous est présenté par SparkCore, société de gestion régulée en Europe spécialisée sur les crypto-actifs. [Titre de l'article]."* Ne **jamais** nommer l'auteur ni sa fonction dans l'audio (le byline reste sur la page HTML uniquement). Pas d'équivalent en outro — la signature marque est en intro seulement.
- Enchaîner avec le finding/answer principal (vote, statut, deadline...)
- 4-5 takeaways clés couverts
- Pas de meta-commentaire ("dans cet article", "nous allons voir")
- Phrase de clôture qui pointe vers l'article complet ("Article complet sur sparkcore point fund")
- Acronymes prononcés en lettres ou en mots selon usage (ex: "CFTC" lu "C-F-T-C", "AIFM" lu "A-I-F-M" ou "AIF-M")
- Nombres écrits en chiffres (le TTS gère bien : "294 contre 134", "$320 milliards")

Sauver dans `/tmp/<slug>_summary.txt`.

**Étape 2** — Générer l'audio :

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/alex/.config/claude-seo/service_account.json"
/tmp/tts_venv/bin/python scripts/ops/tts_cloud_long.py \
  --input /tmp/<slug>_summary.txt \
  --output assets/audio/<slug>-resume.mp3 \
  --voice fr-FR-Neural2-G
```

**Étape 3** — Re-encode en 64 kbps mono pour optimiser la bande passante CF Pages :

```bash
ffmpeg -y -i assets/audio/<slug>-resume.mp3 -b:a 64k -ac 1 -ar 24000 /tmp/.opt.mp3 \
  && mv /tmp/.opt.mp3 assets/audio/<slug>-resume.mp3
```

**Étape 4** — Embed dans l'article HTML, après le `<h1>` et avant le bloc "En bref" :

```html
<aside class="article-audio-player"
       data-src="/assets/audio/<slug>-resume.mp3"
       data-label="Écouter le résumé audio · X min XX"
       aria-label="Lecteur audio résumé de l'article"></aside>
```

Et dans le `<head>` (si pas déjà présent dans le template d'article) :

```html
<link rel="stylesheet" href="/assets/css/audio-player.css?v=1.0" />
```

Et avant `</body>` :

```html
<script defer src="/assets/js/audio-player.js?v=1.0"></script>
```

Le JS gère automatiquement : main player, mini-bar sticky bottom (apparaît dès que le main sort du viewport), bouton X pour dismiss, vitesses 1x→2x cyclique, seek keyboard ArrowLeft/Right, sync state main+mini.

**Étape 5** — Bump `dateModified` dans le JSON-LD BlogPosting de l'article et commit.

#### Venv Python persistant

Le venv `/tmp/tts_venv/` est temporaire (perdu au reboot). Pour persistance :

```bash
python3 -m venv ~/.config/claude-seo/tts-venv
~/.config/claude-seo/tts-venv/bin/pip install google-cloud-texttospeech
```

Puis remplacer dans la procédure : `/tmp/tts_venv/bin/python` → `~/.config/claude-seo/tts-venv/bin/python`.

#### Coût récap

| Volume mensuel | Coût Neural2 |
|---|---|
| 1-30 articles audio (résumés 250 mots) | $0 (free tier 1M chars/mois) |
| 30-100 articles audio | $0-$0.40 |
| Articles intégraux 4 000+ mots | $0 jusqu'à 8 articles, puis ~$0.05/article |

Pour sci avec ~12 articles/an dont une partie audio : **$0/an effectif**.

---

## Git workflow & déploiement

- Always create a **new branch from `main`** for each task
- Branch naming: `claude/<short-description>`
- Commit, push, create PR, then merge (squash)
- Never push directly to `main`

### Déploiement automatique (Cloudflare Pages)

| Action | Résultat | Délai |
|---|---|---|
| Merge PR → `main` | Deploy auto sur `sparkcore.fund` | ~30-60 sec |
| Push → `beta` | Deploy auto sur `beta.sparkcore.fund` | ~30-60 sec |
| PR ouverte (feature branch) | Preview URL `branch.sparkcore-fund-beta.pages.dev` | ~30-60 sec |

Workflow recommandé : feature branch → PR vers `beta` (tester sur beta.sparkcore.fund) → PR vers `main` (prod).

---

## Files intentionally excluded from git

The exclusion list itself lives in `.gitignore` at the repo root — read it
there rather than duplicating it here. `form_config.php` in particular holds
secrets and must never be committed.

> The `MD/` directory IS tracked in git (since 2026-04-15) for versioning. CF Pages publishes `MD/*` to the static asset store by default. HTTP access is blocked by the Function `functions/MD/[[path]].js` (returns the branded 404 with status 404 + noindex), plus `X-Robots-Tag: noindex` from `_headers` as defense in depth. **History (2026-09-01)**: the previous block relied on `_redirects` rules with status `404`, which Cloudflare Pages silently ignores (only 301/302/303/307/308 are supported) — `/MD/*`, `/.gitignore`, `/package.json` and `/package-lock.json` were publicly fetchable (noindexed, but served 200) from the 2026-05-06 migration until this fix. The three root files are now hidden behind a 301 to `/`.

---

## Security architecture

### Backend — CF Pages Functions (post migration 2026-05-06)

Plus de PHP. Le seul backend est une **CF Pages Function** en JS :

| Fichier | État | Rôle |
|---|---|---|
| `proxy.php` | ❌ Supprimé | Code mort |
| `form_config.php` | ❌ Supprimé | Code mort |
| `secure_pdf.php` | ❌ Supprimé | Remplacé par `functions/ressources/[[path]].js` |
| `functions/ressources/[[path]].js` | ✅ Actif | Gate SHA-256 pour PDFs dépôt sur CF Pages |

### Formulaires de contact

Les deux formulaires (sidebar + newsletter) appellent **FormCarry directement** depuis le JS, sans backend PHP intermédiaire :
- Sidebar : `fetch("https://formcarry.com/s/oHdZL-AalnM", ...)` (`assets/js/index.js:233`)
- Newsletter : `fetch("https://formcarry.com/s/_xD89dyxiXb", ...)` (`assets/js/index.js:380`)

Le token Turnstile (`cf-turnstile-response`) est joint au FormData. La validation server-side est faite par FormCarry (clé secrète configurée dans leur dashboard).

### Headers de sécurité actifs

Deux sources complémentaires :

| Source | Headers |
|---|---|
| `_headers` (CF Pages) | `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Robots-Tag` sur pages gated + MD/ |
| CF Transform Rule | `Content-Security-Policy` (couvre toute la zone, y compris beta) |
| CF Pages Function | `Cache-Control: no-store`, `X-Robots-Tag: noindex` sur PDFs protégés |

### PDF gate — CF Pages Function

- Fichier : `functions/ressources/[[path]].js`
- PDFs protégés (`instructions_depot_*`, `deposit_*`) : accès bloqué sans `?h=<sha256>` correct → 403
- Contrats (`/ressources/contrats/*.pdf`) : pass-through vers le static asset store
- Hash comparison XOR (constant-time, réplique `hash_equals()` PHP)
- URL format : `/ressources/<filename>.pdf?h=<sha256-du-fichier>`
- **Mettre à jour les hashes dans la Function si un PDF est remplacé** (`sha256sum <fichier>`)

Hashes actuels (2026-05-06) :
```
instructions_depot_dynamic_trends.pdf  → 6dd4b62679ebe03a60acca7d1d0ed853a52becfffa61515de03fb0958209d3f8
instructions_depot_cryptovision.pdf    → bbe56dfa98a64d40b195d8ff548300e8fdf4ac8e66ab4b78b78c81621ee43e55
deposit_instructions_quants_space.pdf  → 660385624f4f305eab4b0b4a3a2f940d88816d06427efceff1bb70d3d40fe0a2
```

### Décisions de sécurité explicites (assumées, non corrigées)

| Item | Audit | Décision | Justification |
|---|---|---|---|
| **SRI sur scripts CDN** (ApexCharts, Toastify) | HIGH (65/100) | ❌ Skipped | Coût maintenance perpétuelle (regénération hash à chaque update) > bénéfice (jsdelivr jamais compromis en 10 ans). À reconsidérer si on commence à traiter des paiements ou auth. |
| **CSP `'unsafe-inline'`** | HIGH (60/100) | ✅ Conservé | Nécessaire pour le site statique sans Workers. À retirer si migration vers Cloudflare Workers. |
| **Contrats `/ressources/contrats/` accessibles par URL directe** | CRITICAL (90/100) | ✅ Conservé | Modèle de menace assumé : URLs partagées uniquement par email, documents non-critiques, `X-Robots-Tag: noindex` empêche l'indexation. |

### Actions de remediation : aucune en attente

L'audit recommandait initialement :
- ~~Rotate la clé Turnstile~~
- ~~Mettre à jour la nouvelle clé dans FormCarry~~
- ~~Purger l'historique git de `form_config.php`~~

**Décision : non requis.** Le repo `alexvl64/sci` est **privé** sur GitHub. La clé Turnstile présente dans l'historique git de `form_config.php` n'est accessible qu'aux collaborateurs autorisés du repo. Combiné avec le fait que :
- La clé permet uniquement la *validation* de tokens (pas la génération de faux tokens)
- `form_config.php` n'a jamais été inclus en prod (code mort)
- FormCarry gère sa propre validation Turnstile avec sa propre clé

→ Le risque résiduel est négligeable. Aucune action requise.

---

## Cloudflare Pages — configuration infrastructure

Le `.htaccess` a été **supprimé du repo le 2026-05-09** (commit `claude/cf-error-pages-htaccess-cleanup`). Il n'était plus exécuté depuis la migration CF Pages (2026-05-06) — gardé en référence quelques jours puis dégagé une fois toutes les règles portées. Les équivalents CF Pages :

| Ancienne règle `.htaccess` | Équivalent CF Pages |
|---|---|
| Redirects 301 slugs blog + trailing slash | `_redirects` |
| Headers sécurité (X-Frame, nosniff, Referrer, Permissions) | `_headers` |
| CSP | CF Transform Rule (toute la zone) |
| Cache-Control 1y assets | CF Pages CDN défaut + ETag |
| HSTS preload | CF SSL/TLS settings |
| HTTPS + www→apex | CF DNS/SSL settings + Redirect Rule |
| `RewriteRule ^MD(/\|$) - [F,L]` | `_redirects` `/MD/* /404.html 404` |
| Block dotfiles + dev files (`package.json`, `.gitignore`) | `_redirects` (CF Pages auto-exclut `.git`, `.env`, `.DS_Store`, `_headers`, `_redirects`, `README.md`) |
| Blocage PDFs dépôt (hash gate) | `functions/ressources/[[path]].js` |
| `noindex` factsheets/discovery-call/validation/contrats | `_headers` |
| URL rewriting `.html` (try_files) | Natif CF Pages |
| `ErrorDocument 404 /404.html` | Natif CF Pages |
| `ErrorDocument 403/500/502/503/504` | `functions/_middleware.js` (rebrand response avec `/403.html` ou `/500.html`) |

### CF Pages projects

| Projet | Branche | Domaine |
|---|---|---|
| `sparkcore-fund` | `main` | `sparkcore.fund` |
| `sparkcore-fund-beta` | `beta` | `beta.sparkcore.fund` |

### `_redirects` — redirects actifs

```
/blog/low-volatility-crypto-strategy   → /blog/what-a-market-neutral-crypto-fund-does  301
/blog/estonian-aifm-crypto-fund        → /blog/regulated-crypto-fund-manager-estonia   301
/blog/how-white-label-funds-launch-in-crypto → /blog/white-label-crypto-fund-manager-services 301
/en/                                   → /  301
/blog/:slug/                           → /blog/:slug  301
```

### Cloudflare zone — règles actives (audit 2026-05-06)

| Type | Règle | Statut |
|---|---|---|
| Transform Rule | CSP header (toute la zone) | ✅ actif |
| Redirect Rule | www → non-www (301) | ✅ actif |
| Redirect Rule | blog trailing slash removal | ✅ actif |
| Firewall Custom | Block archiving bots | ✅ actif |
| Page Rule | sitemap.xml cache bypass | ⚠️ legacy OVH, peut être supprimé |

### Cloudflare zone — settings (vérifié via API 2026-05-06)

État actuel (lu via Cloudflare API `/zones/{id}/settings/{key}`) :

```
ssl: strict          ✅
tls_1_3: zrt         ✅ (= TLS 1.3 + 0-RTT, mieux qu'on)
http3: on            ✅
brotli: on           ✅
browser_cache_ttl: 31536000  ✅
always_use_https: on         ✅
min_tls_version: 1.2         ✅
0rtt: on                     ✅
early_hints: on              ✅
```

> Tous les recommendations de l'audit `2026-05-06` sont **déjà appliqués**. La config CF zone est en l'état idéal pour Free plan.

### Cloudflare API — token disponible

Token "Read-all" dans `~/.config/claude-seo/projects/sci.json` clé `cloudflare_api_token` :
- Scope : Read-only sur le compte (lecture zones/settings/DNS)
- IP-restriction : `158.220.123.20` (VPS uniquement — IPv6 sortant doit être désactivé pour les appels API, force IPv4 via `socket.AF_INET`)
- Créé : 2026-05-06

Usage typique :
```bash
TOKEN=$(jq -r .cloudflare_api_token ~/.config/claude-seo/projects/sci.json)
curl -4 -H "Authorization: Bearer $TOKEN" \
  https://api.cloudflare.com/client/v4/zones?name=sparkcore.fund
```

Si besoin d'écrire des settings (modifier zone, créer Page Rules, etc.) → créer un nouveau token avec `Zone:Zone Settings:Edit` permissions, IP-restriction au VPS, et le sauver sous une clé séparée `cloudflare_api_token_write` dans le même fichier (ne jamais réutiliser le read-only).

> **Le token de dsungkur n'existe pas** (`cloudflare_api_token` absent de `projects/dsungkur.json`). Si dsungkur en a besoin, créer un token séparé scoped à la zone dsungkur.com — ne pas partager celui de sci.

---

## Cloudflare configuration

All settings below are live on the `sparkcore.fund` zone.

### Caching → Configuration

| Parameter | Value |
|---|---|
| Browser Cache TTL | **1 year** |

> Set to 1 year. Cloudflare instructs browsers to cache static assets (CSS, JS, images, fonts) for 1 year. HTML is not cached by Cloudflare on the free plan by default, so pages remain always fresh.

### SSL/TLS → Edge Certificates — HSTS

| Parameter | Value |
|---|---|
| Enable HSTS | ✅ |
| Max-age | 12 months (31 536 000 s) |
| Include Subdomains | ✅ |
| No-sniff | ✅ |
| Preload | ✅ enabled 2026-05-08, submitted to hstspreload.org (status: pending inclusion). ETA Chromium pickup 6-12 weeks. Per audit Sprint 1 / S1-6. |

### Rules → Transform Rules → Modify Response Header

**Rule name:** `Add Content-Security-Policy`
**Condition:** All incoming requests
**Header:** `Content-Security-Policy`
**Value:**
```
default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://challenges.cloudflare.com https://www.googletagmanager.com https://rum.cronitor.io https://static.cloudflareinsights.com https://app.cal.eu 'unsafe-inline'; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net https://app.cal.eu 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://formcarry.com https://docs.google.com https://www.google-analytics.com https://analytics.google.com https://rum.cronitor.io https://a.nel.cloudflare.com https://cdn.jsdelivr.net https://app.cal.eu; frame-src https://challenges.cloudflare.com https://app.cal.eu; report-uri /csp-report
```

> Note: `'unsafe-inline'` is intentional for a static site with no user authentication. Replace with nonces only if moving to Cloudflare Workers.

### Rules → Redirect Rules

**Rule name:** `Remove trailing slash — blog articles`
**Type:** Wildcard pattern

| Field | Value |
|---|---|
| Source URL | `https://sparkcore.fund/blog/*/` |
| Target URL | `https://sparkcore.fund/blog/$1` |
| Status code | 301 |

### Network

| Feature | Status |
|---|---|
| HTTP/3 (QUIC) | Not available — free plan only |
| HTTP/2 | ✅ enabled by Cloudflare automatically |

---

## Internationalization (EN / FR)

The site is bilingual with **English as the base language** and a dedicated `/fr/` page for SEO. Both pages are statically pre-rendered in their own language — do not assume the FR body is generated by JS.

### Architecture

| File | Role |
|---|---|
| `/index.html` | English homepage — full body in English |
| `/fr/index.html` | French homepage — **full body pre-rendered in French**, with French `<head>`, French JSON-LD `FinancialService`, and `data-i18n` attributes still present (so the JS layer is a no-op in steady state) |
| `assets/js/translations.js` | Translation dictionary (EN+FR) and `currentLang` detection |
| `assets/js/index.js` | `applyTranslations()` and `setLang()` — runs on DOMContentLoaded, swaps text via `data-i18n` |
| `assets/js/lang-redirect-en.js` | Loaded on `/` only — auto-redirects FR browsers to `/fr/` on first visit |
| `assets/js/lang-redirect-fr.js` | Loaded on `/fr/` only — sends explicit-EN users back to `/` |
| `sitemap.xml` | Declares `xhtml:link hreflang` alternates (`en`, `fr`, `x-default`) for `/` and `/fr/` |

### Language detection rules (`translations.js`)

`currentLang` is computed in this order — **URL path first, always**:

1. If `location.pathname` starts with `/fr` → `fr`
2. Else if `localStorage.sc_lang` is `'en'` or `'fr'` → that value
3. Else if `navigator.language` starts with `fr` → `fr`
4. Else → `en`

> ⚠️ This URL-priority is **critical**: it guarantees Googlebot (whose `navigator.language` is `en`) renders `/fr/` in French. Do not reorder these rules.

### Auto-redirect rules (`lang-redirect-{en,fr}.js`)

Both scripts:
- **Skip bots** via a wide regex: `bot|crawl|spider|slurp|…|gptbot|claudebot|perplexitybot|ccbot|google-extended|oai-searchbot|bytespider|amazonbot|headlesschrome|…`
- **Guard with `sessionStorage['sc_lang_redirected']`** — only redirect once per tab so the Back button and manual EN↔FR navigation work
- **Never run on blog articles** (English only)

The auto-redirect from `/` → `/fr/` for FR-language browsers is intentional and must be preserved.

### When editing FR content

- **Edit `/fr/index.html` directly** — the body is already in French. Don't rely on `translations.js` to translate it at runtime.
- If you add a new section to `/index.html`, you must also add the French version to `/fr/index.html` manually.
- The FR JSON-LD (`FinancialService` block in `/fr/index.html`) must mirror the EN one with `url: https://sparkcore.fund/fr/` and a French `description`.
- The active `lang-btn` is FR on `/fr/` and EN on `/` — set via the `active` class on the `<button>`.

### Bilingual policy — EN-only content, bilingual homepage (updated 2026-06-23)

> **Policy change 2026-06-23 — the FR blog cluster was retired.** The previous dual-cluster strategy (separate EN `/blog/` + FR `/fr/blog/` clusters, formalized 2026-05-07) is **discontinued**. The site now runs **a single English content cluster**; French survives only as the **homepage landing** (`/fr/index.html`) for the bilingual `/` ↔ `/fr/` experience and its hreflang pair. The 6 FR articles + the FR blog index + the 6 repurposed derivatives were deleted; `/fr/blog/*` now returns **HTTP 410 Gone** via `functions/fr/blog/[[path]].js`, and the matching `sitemap.xml` / `llms-full.txt` entries were removed.

**1. EN cluster — the only content cluster (`/blog/`)**

- 23 indexable articles + 1 pillar page at `/resources/regulated-crypto-fund-estonia/`.
- Topics: AIFMD, MiCA, Estonia AIFM, white-label, custody, fund structure, fee benchmarks, eligibility, sub-threshold thresholds.
- Audience: prospective fund managers + institutional allocators evaluating regulated crypto fund vehicles.
- All articles carry `"inLanguage": "en"` and `<html lang="en">`.

**2. FR surface = homepage only.**

- `/fr/index.html` stays (localized landing + EN↔FR toggle + auto-redirect of FR browsers). It has **no blog**: its nav + footer "Articles" links point to the EN `/blog/`, and the hero "latest article" badge (which promoted the FR strc article) was removed.
- `/fr/blog/*` is a **retired namespace** → 410 Gone. Do not recreate pages under it without restoring the full SEO surface (sitemap, hreflang, internal links).
- The sitemap keeps EN/FR `hreflang` alternates **only for the homepage** (`/` ↔ `/fr/`). The `/blog/` index is now EN self-canonical (its FR alternate was removed).

**3. Future content rule.**

- All new content → EN cluster (`/blog/`), `"inLanguage": "en"`.
- If French content is ever wanted again, treat it as a **new decision**: either (a) a true EN↔FR parity pair shipped simultaneously with reciprocal `hreflang`, or (b) a deliberately re-scoped FR cluster — but the lone FR mini-cluster experiment is closed. Do not resurrect `/fr/blog/` ad hoc.

> **Why the change:** the FR mini-cluster was time-sensitive market commentary that decayed ~3× faster than the EN evergreen regulatory content (blog-audit 2026-06-21: FR −4.7 vs EN −0.7), carried the heaviest YMYL/legal exposure (the strc "Ponzi" P0 on a named SEC issuer), and shared no topic or audience overlap with the EN buyer-journey hub. Consolidating on EN removes the maintenance + legal surface and concentrates authority on one cluster.

### Common pitfalls

- ❌ Reverting `/fr/index.html` to a copy of `/index.html` with `data-i18n` placeholders only — this breaks the snippet Google captures
- ❌ Removing the URL-first check in `translations.js` `currentLang` IIFE
- ❌ Narrowing the bot regex in `lang-redirect-{en,fr}.js` (Googlebot/AI crawlers must never be redirected)
- ❌ Forgetting to update `sitemap.xml` `lastmod` after meaningful FR/EN content changes

---

## Blog article conventions

- Schema: `"@type": "BlogPosting"` (not `Article`). **Exception**: `/resources/regulated-crypto-fund-estonia/` pillar uses `"@type": "Article"` + `"articleSection": "Regulatory Guide"` since it's a comprehensive guide, not a blog post (matches breadcrumb label).
- Publisher logo: `https://sparkcore.fund/assets/images/png/favicon-192x192.png`
- `"inLanguage": "en"` on all EN articles
- Footer year script: `<script src="/assets/js/set-year.js"></script>`
- External link class: `class="text-darkGray underline underline-offset-2 hover:text-steelBlue transition-colors duration-200" target="_blank" rel="noopener noreferrer"`
- Internal link class: `class="text-darkGray underline underline-offset-2 hover:text-steelBlue transition-colors duration-200"`
- Author: Alexandre VINAL — `https://www.linkedin.com/in/alexandrevinal/`. Full author Person schema (with `@id: "https://sparkcore.fund/#person-alexandre-vinal"`, `jobTitle`, `sameAs` to LinkedIn + Cointips YouTube) on every article. EN articles use `"jobTitle": "Founder & Managing Partner, SparkCore Fund Management"`. FR articles use `"jobTitle": "Fondateur & Managing Partner, SparkCore Fund Management"`.

### Byline format (visible at top of article)

- **EN articles + pillar**: `Published on DD Month YYYY &middot; Last reviewed DD Month YYYY &middot; By <a>Alexandre VINAL</a> &middot; N min read`
- **FR articles**: `Publié le DD month YYYY &middot; Mis à jour le DD month YYYY &middot; Par <a>Alexandre VINAL</a> &middot; N min de lecture`

### dateModified review cadence — Mode A (quarterly)

YMYL financial content requires a review cadence. Frozen `dateModified == datePublished` is the largest E-E-A-T trust signal failure on the site (per audit-2026-05-08).

**Cadence**: every 3 months (Jan / Apr / Jul / Oct), CRON-driven from the VPS — see `~/cron-prompts/sci/quarterly-content-review.md`.

**The review is a real review** — not a no-op refresh. Each article must receive at least one substantive editorial change (new paragraph, updated statistic, fresh source link, new regulation reference). Google detects "fake refresh" patterns where `dateModified` bumps without content delta and can penalise the page.

**When you bump `dateModified`, you MUST simultaneously bump all 4 surfaces** (otherwise the signals diverge):

1. JSON-LD `"dateModified": "YYYY-MM-DD"` in the article schema
2. OG meta `<meta property="article:modified_time" content="YYYY-MM-DDTHH:MM:SS+00:00">`
3. Visible byline — `Last reviewed DD Month YYYY` (EN) / `Mis à jour le DD month YYYY` (FR)
4. `sitemap.xml` `<lastmod>YYYY-MM-DD</lastmod>` for that article

**Event-driven reviews** are also allowed (in addition to the quarterly pass) when a regulatory milestone changes the content materially:
- AIFMD II transposition (April 2026)
- Estonian VASP licence sunset (1 July 2026)
- MiCA Phase 2 milestones
- Auditor / regulator status changes
- New fund launches

The CRON produces a triage report (which articles need updates and why) — actual editorial changes are made by a human-in-the-loop pass after the report lands. The CRON does NOT auto-edit YMYL content.

---

# Instructions pour Claude Code — SparkCore / site statique

## Conversion Markdown → HTML

Le mode opératoire complet (template de référence, workflow obligatoire en
4 étapes, règles de conversion, pièges du footer) vit dans la compétence
`md-to-html` : `.claude/skills/md-to-html/SKILL.md`. Elle se charge à la
demande — inutile de la garder en contexte permanent.
