# Migration — Pipeline Prospects & Newsletter vers l'app Admin

> **But** : se séparer **complètement de FormCarry** (2 formulaires du site) + retirer **Make.com** + **arrêter tout appel au SM** (`app.sparkcore-investment.com`). Toute la gestion (réception, stockage, notifications, emails, liste Mailjet) passe désormais dans l'**app Admin SparkCore**.
>
> **Statut** : SPEC de handoff. Le **site** (`alexvl64/sci`) est préparé ici. L'**app Admin** est un repo séparé (non accessible depuis cette session) → ce document est le **contrat** que l'équipe Admin doit implémenter.
>
> **Date** : 2026-06-23
>
> **État au 2026-10-13** : spec historique de la migration de juin (Mailjet et ses listes ont depuis laissé la place à
> Listmonk, `source_tracking` est retiré). La doc vivante est dans `sparkcore-vps` : `server/apps/admin-prospect-intake.md`
> et `server/infra/listmonk.md`. Ce qui a changé côté site depuis :
> - **double opt-in** de la newsletter : l'Admin envoie un lien `…/newsletter-confirm#t=<jeton>` (FR :
>   `/fr/confirmation-newsletter#t=…`) ; la page ne fait rien au chargement, son bouton POSTe le jeton à
>   `functions/api/newsletter-confirm.js`, qui relaie vers `POST {ADMIN_API_BASE}/prospects/newsletter/confirm`
>   (Bearer). Réponse `{ok, status}`, `status` = confirmed | already | invalid | expired | refused | retry. Pages gated
>   (meta, `_headers`, `robots.txt`, hors sitemap) ;
> - **campagne de la visite** : `analytics.js` garde pour la session de l'onglet les `utm_source` / `utm_campaign` de la
>   page d'arrivée (`sessionStorage` `sc_utm`), `index.js` les joint aux deux formulaires, les Functions les relaient
>   nettoyés (`[A-Za-z0-9_.-]{1,64}`).

---

## 0. TL;DR

| Composant | Avant | Après |
|---|---|---|
| Backend de formulaire | FormCarry (`oHdZL-AalnM` contact, `_xD89dyxiXb` newsletter) | **supprimé** |
| Orchestrateur | Make.com (webhook + router + modules) | **supprimé** |
| Création prospect | SM `POST /prospect/widget/create/hP30R4dl4427m` | **supprimé — plus aucun appel SM** |
| Stockage prospects | SM | **app Admin (DB propre + UI)** |
| Notif équipe | email Mailjet (tpl 6562257) + Telegram (erreurs) | **app Admin** |
| Email prospect (contact) | Mailjet tpl 7461276 | **app Admin** |
| Email abonné (newsletter) | Mailjet tpl 6564289 | **app Admin** |
| Liste Mailjet (newsletter) | mise à jour par le **SM** à l'ajout prospect | **app Admin** |
| Anti-spam | Turnstile + honeypot (validés par FormCarry) | **CF Pages Function du site** (Turnstile + honeypot), voir §3 |

Deux flux distincts : **(A) Contact** (formulaire sidebar) et **(B) Newsletter** (champ email). Détail §5–§6.

---

## 1. Flux legacy (ce qui est remplacé) — référence

Scénario Make.com actuel (déclenché par webhook FormCarry) :

```
NEW CONTACT (webhook FormCarry)
  → SET VARS (module 5 : firstname, lastname, telephone, email, source, source_tracking)
  → ROUTER
     ├─ 1ʳᵉ voie : SET VAR source_format (8) → POST SM /prospect/widget/create/hP30R4dl4427m (3) → Telegram SEND ERROR si erreur réelle (10)
     ├─ 2ᵉ voie : SEND EMAIL équipe — Mailjet tpl 6562257 (6)
     └─ 3ᵉ voie : GET FACTSHEET CV (11) + GET FACTSHEET DT (12) + GET CALENDAR FR LINK (13) → SEND EMAIL prospect — Mailjet tpl 7461276 (9)
```

- **`source_format`** (module 8) = transformation de `source` faite dans Make, envoyée au SM.
- **`cv_link` / `dt_link` / `calendar_link`** = anciennement lus dans un **Google Sheet** (colonne 15 des modules 11/12/13). → **Résolu (D-3)** : ces liens sont **déjà présents dans la config `ResourceLink` de l'app Admin**. L'app Admin les lit directement depuis ResourceLink pour construire les emails — plus aucune dépendance au Google Sheet.
- **Telegram** = module `SEND ERROR`, déclenché uniquement sur **erreur réelle** de l'appel SM (pas une notif de succès).

Le flux newsletter (FormCarry `_xD89dyxiXb`) faisait : **même appel SM** (ajout prospect → le SM mettait à jour la liste Mailjet) + email abonné Mailjet tpl 6564289. **Pas** de notif équipe, **pas** de Telegram.

---

## 2. Schéma de champs canonique

Le navigateur POST en **JSON** vers la CF Function (`/api/contact` ou `/api/newsletter`), avec en plus `turnstileToken` (consommé par la Function, non relayé). La Function relaie ensuite ces champs en JSON vers l'API Admin. Réponse Function→navigateur : `{ "ok": true }` en succès, `{ "ok": false, "error": "..." }` sinon.

### (A) Contact
| Champ envoyé | Type | Mapping legacy | Obligatoire |
|---|---|---|---|
| `prenom` | string | `firstname` (SM `name`) | ✅ |
| `nom` | string | `lastname` (SM `last_name`) | ✅ |
| `telephone` | string | `telephone` (SM `mobile`) | ✅ |
| `email` | string | `email` | ✅ |
| `source` | string | dropdown du formulaire (SM `source` après `source_format`) | ✅ |
| `lang` | `en`\|`fr` | `document.documentElement.lang` (ajouté à la migration) | ✅ |
| `utm_source`, `utm_campaign` | string | campagne de la visite (2026-10-13) | optionnel |

### (B) Newsletter
| Champ envoyé | Type | Obligatoire |
|---|---|---|
| `email` | string | ✅ |
| `lang` | `en`\|`fr` | ✅ |
| `utm_source`, `utm_campaign` | string | optionnel |

> Le **token Turnstile** (`cf-turnstile-response`) et le **honeypot** (`website`) sont **consommés et validés par la CF Function du site** (§3) — ils **ne sont pas** transmis à l'app Admin.

---

## 3. Architecture cible — CF Function proxy (décidée, D-1)

> **Décidé 2026-06-23** : option **proxy** retenue. Compatible **CF plan gratuit** (Pages Functions = 100 000 req/jour, très au-dessus du volume formulaires ; le site exécute déjà des Functions). Coût nul.

```
┌────────────┐   POST FormData    ┌──────────────────────────────┐   POST JSON + secret partagé   ┌─────────────────────┐
│  Formulaire │ ─────────────────▶ │  CF Pages Function (site)     │ ─────────────────────────────▶ │   API app Admin      │
│  (browser) │   /api/contact     │  functions/api/contact.js     │   Authorization: Bearer <S>    │   (repo séparé)      │
│            │   /api/newsletter  │  functions/api/newsletter.js  │                                │                     │
└────────────┘                    │  - vérifie honeypot vide      │                                │  - stocke prospect   │
                                  │  - vérifie Turnstile (secret) │                                │  - Telegram          │
                                  │  - normalise le payload       │                                │  - emails Mailjet    │
                                  │  - forward server-to-server   │                                │  - liste Mailjet     │
                                  └──────────────────────────────┘                                └─────────────────────┘
                                         (renvoie {status:"success"} au browser)
```

**Pourquoi ce design (CF Function proxy) plutôt que « le browser appelle directement l'app Admin » :**

1. **Secrets côté serveur** : la clé secrète Turnstile (siteverify) et le secret d'authentification de l'API Admin ne touchent jamais le navigateur.
2. **Moins de travail côté Admin** : l'app Admin **n'a pas** à valider Turnstile ni à gérer le CORS (preflight). Elle reçoit un appel serveur-à-serveur déjà authentifié et déjà anti-spam.
3. **Pas d'endpoint Admin exposé publiquement** : l'API Admin n'accepte que les appels portant le secret partagé → pas d'abus direct depuis Internet.
4. **Infra déjà en place** : le site a déjà des CF Pages Functions (`functions/_middleware.js`, `functions/ressources/[[path]].js`) et Turnstile.
5. **Contrat unique et stable** : un seul format JSON entre la Function et l'app Admin.

> **Alternative** (si l'équipe Admin préfère) : le browser POST directement vers l'API Admin. Dans ce cas l'app Admin **doit** : valider le token Turnstile (siteverify avec sa clé secrète), gérer le **CORS** (origines `https://sparkcore.fund` + previews), implémenter le honeypot, et rate-limiter. C'est **plus** de travail côté Admin et expose l'endpoint. → Voir décision **D-1**.

---

## 4. Côté SITE (`alexvl64/sci`) — préparé ici

> Ces changements sont faits dans ce repo. Ils n'ont **aucune dépendance** au déploiement de l'app Admin tant que l'URL/secret cible ne sont pas branchés (variables d'env CF Pages).

### 4.1 Nouvelles CF Pages Functions
- `functions/api/contact.js` — reçoit le FormData du formulaire contact, vérifie honeypot + Turnstile (siteverify), construit le JSON canonique (§2-A), POST server-to-server vers `ADMIN_API_BASE/prospects/contact` avec `Authorization: Bearer ADMIN_API_SECRET`. Renvoie `{ "status": "success" }` (ou `{ "status": "error" }` + code HTTP) au browser.
- `functions/api/newsletter.js` — idem pour la newsletter (§2-B) → `ADMIN_API_BASE/prospects/newsletter`.

> **Endpoints attendus côté Admin** : `POST {ADMIN_API_BASE}/prospects/contact` et `POST {ADMIN_API_BASE}/prospects/newsletter`, body **JSON** (§2), header `Authorization: Bearer {ADMIN_API_SECRET}`, réponse 2xx = OK.

### 4.2 Variables d'environnement (CF Pages → Settings → Variables and Secrets — Production + Preview)
| Variable | Rôle |
|---|---|
| `TURNSTILE_SECRET_KEY` | clé secrète Turnstile (siteverify) — sitekey publique déjà sur le site : `0x4AAAAAACy5d4Ot-ahI-r9S` |
| `ADMIN_API_BASE` | base URL de l'API app Admin : `https://admin.sparkcore-investment.com` (sans slash final) |
| `ADMIN_API_SECRET` | secret partagé Function ↔ Admin (généré, stocké des 2 côtés) |

### 4.3 Modifs JS (`assets/js/index.js`)
- Contact : `fetch("/api/contact", …)` en **JSON** (`Content-Type: application/json`), body = `{ prenom, nom, telephone, email, source, source_tracking, lang, turnstileToken }`. Succès = `data.ok === true` → event GA4 `contact_form_submit`, reset, fermeture sidebar, toast (inchangés).
- Newsletter : `fetch("/api/newsletter", …)` en JSON, body = `{ email, source_tracking, lang, turnstileToken }`. Succès = `data.ok === true`.
- Honeypot (`website`) reste un garde-fou client ; Turnstile est désormais **validé côté Function** (siteverify) au lieu de FormCarry.

### 4.4 CSP (Transform Rule Cloudflare)
- `connect-src` : **retirer** `https://formcarry.com` (plus utilisé) ; `/api/*` est same-origin (`'self'`, déjà autorisé). Aucune nouvelle origine à whitelister si on garde le proxy (le browser ne parle qu'à `sparkcore.fund`).
- Si l'alternative « appel direct Admin » est retenue (D-1), ajouter le domaine de l'API Admin à `connect-src`.

---

## 5. Côté APP ADMIN — flux (A) Contact

Sur réception d'un POST authentifié `…/contact` (JSON §2-A) :

1. **Stocker le prospect** (DB Admin) : `prenom, nom, telephone, email, source, source_tracking, lang, type="contact", created_at`. Visible dans l'UI de gestion (§8).
2. **Notif équipe — email Mailjet (template `6562257`)** :
   ```json
   {
     "Messages": [{
       "From":  { "Email": "prospects@sparkcore.fund", "Name": "SparkCore | Prospects" },
       "To":    [{ "Email": "contact@sparkcore.fund", "Name": "SparkCore | Fund" }],
       "TemplateID": 6562257,
       "TemplateLanguage": true,
       "Subject": "Un prospect a rempli le formulaire : {prenom} {nom}",
       "Variables": {
         "firstname": "{prenom}", "lastname": "{nom}", "email": "{email}",
         "telephone": "{telephone}", "source": "{source}",
         "source_tracking": "{source_tracking}", "year": "{YYYY}"
       }
     }]
   }
   ```
3. **Email prospect — Mailjet (template `7461276`)** :
   ```json
   {
     "Messages": [{
       "From":  { "Email": "contact@sparkcore.fund", "Name": "SparkCore | Fund" },
       "To":    [{ "Email": "{email}", "Name": "{prenom} {nom}" }],
       "TemplateID": 7461276,
       "TemplateLanguage": true,
       "Subject": "Investment Information & Documentation",
       "Variables": {
         "firstname": "{prenom}",
         "cv_link": "{lien factsheet CryptoVision}",
         "dt_link": "{lien factsheet Dynamic Trends}",
         "calendar_link": "{lien calendrier Cal.com}",
         "year": "{YYYY}"
       }
     }]
   }
   ```
4. **Telegram** (cf. décision **D-4**) : legacy = alerte d'**erreur** uniquement. Recommandé : alerter l'équipe sur un **échec** du pipeline (email/DB), et **optionnellement** une notif « nouveau prospect » (le user a décrit un Telegram à la création — à confirmer).
5. **Liste Mailjet** (D-2 = **oui**) : ajouter aussi le prospect contact à la **liste newsletter Mailjet** (même mécanisme qu'au §6.3, `Action: addnoforce`), comme le SM le faisait à l'ajout d'un prospect.

---

## 6. Côté APP ADMIN — flux (B) Newsletter

Sur réception d'un POST authentifié `…/newsletter` (JSON §2-B) :

1. **Stocker** : `email, source_tracking, lang, type="newsletter", created_at`.
2. **PAS de notif équipe, PAS de Telegram.**
3. **Mettre à jour la liste Mailjet (newsletter)** — *c'est ce que le SM faisait, à reprendre ici* :
   - Créer/retrouver le contact Mailjet (`POST /v3/REST/contact` ou idempotent) puis l'abonner à la **liste newsletter** (`POST /v3/REST/contact/{email}/managecontactslists` avec `{ "ContactsLists":[{ "ListID": <LIST_ID>, "Action":"addnoforce" }] }`), ou `managemanycontacts`.
   - **`<LIST_ID>`** = ID de la liste Mailjet newsletter → **à fournir** (décision **D-3**).
   - `Action: addnoforce` = abonne sans réécraser un désabonnement existant (respect RGPD/désinscription).
4. **Email abonné — Mailjet (template `6564289`)** :
   ```json
   {
     "Messages": [{
       "From":  { "Email": "contact@sparkcore.fund", "Name": "SparkCore | Fund" },
       "To":    [{ "Email": "{email}", "Name": "{email}" }],
       "TemplateID": 6564289,
       "TemplateLanguage": true,
       "Subject": "Confirmation d'inscription à notre newsletter",
       "Variables": {
         "cv_link": "{lien factsheet CryptoVision}",
         "dt_link": "{lien factsheet Dynamic Trends}"
       }
     }]
   }
   ```

---

## 7. Configuration requise côté app Admin

| Secret / config | Usage | Source |
|---|---|---|
| **Mailjet API key + secret** | envoi emails (tpl 6562257 / 7461276 / 6564289) + gestion liste | compte Mailjet SparkCore |
| **Mailjet `LIST_ID` newsletter** | abonnement liste (§6.3) | compte Mailjet (à récupérer) |
| **Telegram bot token + chat id** | notifs équipe / erreurs | bot Telegram existant |
| **`ADMIN_API_SECRET`** | auth de l'appel venant de la CF Function du site | généré, partagé avec le site |
| **`cv_link`, `dt_link`** | liens factsheets dans les emails | ✅ déjà dans la **config `ResourceLink`** de l'app Admin |
| **`calendar_link`** | lien Cal.com | ✅ déjà dans la **config `ResourceLink`** ; choisir la variante EN/FR via `lang` si disponible |
| **Turnstile secret** | *uniquement si* alternative « appel direct » (D-1) | Cloudflare |

> ⚠️ Les **templates Mailjet** (6562257, 7461276, 6564289) vivent déjà dans le compte Mailjet — **à réutiliser tels quels**, ne pas recréer. Vérifier que la clé API utilisée par l'app Admin a accès à ce compte.

---

## 8. UI de gestion des prospects (app Admin)

- Liste paginée des prospects : `prenom, nom, email, telephone, source, source_tracking, lang, type (contact|newsletter), date`.
- Filtres : type, source, période, langue.
- Export CSV.
- (Optionnel) statut (`nouveau / contacté / qualifié / …`) pour le suivi commercial.
- (Optionnel) lien rapide vers le contact Mailjet correspondant.

---

## 9. Anti-spam (porté par la CF Function du site — recommandation §3)

- **Honeypot** : champ `website` (id `honeypot` / `honeypot-newsletter`) doit être **vide**, sinon rejet silencieux (`{status:"success"}` factice, pas d'appel Admin).
- **Turnstile** : `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` avec `secret=TURNSTILE_SECRET_KEY` + `response=<token>`. Si `success !== true` → rejet.
- **Rate-limit** : optionnel au niveau CF (WAF / KV) — l'app Admin peut aussi dédupliquer par email+fenêtre.

---

## 10. Checklist de décommissionnement

- [ ] **Site** : `index.js` ne pointe plus vers `formcarry.com` (contact + newsletter) → `/api/*`.
- [ ] **CSP** : retirer `formcarry.com` de `connect-src`.
- [ ] **FormCarry** : désactiver/supprimer les 2 formulaires (`oHdZL-AalnM`, `_xD89dyxiXb`) une fois la bascule validée. Résilier l'abonnement si plus aucun usage.
- [ ] **Make.com** : désactiver puis archiver le scénario (webhook NEW CONTACT + router + modules SM/Mailjet/Sheets).
- [ ] **SM** : confirmer qu'aucun appel `/prospect/widget/create/hP30R4dl4427m` n'est plus émis (ni site, ni Make).
- [ ] **Mailjet** : vérifier que la liste newsletter continue d'être alimentée (désormais par l'app Admin).
- [ ] **Google Sheet** factsheets/calendrier : décider migration en config Admin ou conservation (D-3).

---

## 11. Décisions à confirmer

| ID | Décision | Recommandation |
|---|---|---|
| **D-1** | ✅ **DÉCIDÉ** : CF Function proxy | Fait — secrets serveur, pas de CORS, CF gratuit |
| **D-2** | ✅ **DÉCIDÉ** : oui — contact **et** newsletter alimentent la liste Mailjet | Fait |
| **D-3** | ✅ **RÉSOLU** : liens déjà dans la **config `ResourceLink`** de l'app Admin (factsheets + calendrier). L'app les lit depuis ResourceLink. | Fait — reste à confirmer une variante calendrier EN/FR via `lang` si elle existe |
| **D-4** | Telegram : garder une notif **succès « nouveau prospect »**, ou seulement **alerte d'erreur** (legacy) ? | Erreur (fiabilité) + succès optionnel |
| **D-5** | Domaine de l'API Admin (`ADMIN_API_BASE`) + génération du `ADMIN_API_SECRET` | À fournir par l'équipe Admin |

---

## 12. Plan de test (avant bascule prod)

1. Déployer les CF Functions sur un **preview** (ou `beta.sparkcore.fund`) avec `ADMIN_API_BASE` pointant vers un **staging** de l'app Admin.
2. **Contact** : soumission → vérifier (a) prospect en DB Admin, (b) email équipe reçu (tpl 6562257), (c) email prospect avec liens factsheets + calendrier (tpl 7461276), (d) toast succès site.
3. **Newsletter** : soumission → vérifier (a) prospect en DB, (b) **contact ajouté à la liste Mailjet**, (c) email abonné (tpl 6564289), (d) pas de notif équipe/Telegram.
4. **Anti-spam** : honeypot rempli → rejet ; token Turnstile absent/invalide → rejet.
5. **Erreur** : couper l'app Admin → la Function renvoie `{status:"error"}`, le site affiche le toast d'erreur, (option) Telegram d'alerte.
6. Bascule prod + checklist §10.

---

## Références

- Site : `alexvl64/sci` — `assets/js/index.js` (handlers L217-300 contact, L375-459 newsletter), `index.html` / `fr/index.html` (forms + honeypot + Turnstile), `functions/` (CF Pages Functions).
- Templates Mailjet : `6562257` (équipe), `7461276` (prospect contact), `6564289` (abonné newsletter).
- Sitekey Turnstile publique : `0x4AAAAAACy5d4Ot-ahI-r9S`.
- Ce document : `MD/admin-app/PROSPECT-NEWSLETTER-PIPELINE.md`.
