# SparkCore Investment — Full SEO Audit

**Site:** https://sparkcore.fund/
**Date:** 2026-06-21
**Project alias:** `sci` (claude-seo + backlinks switched and verified)
**Property type:** YMYL — regulated AIFM, crypto-asset funds, professional investors only (€50k min)
**Stack:** Cloudflare Pages · static HTML + Tailwind + vanilla JS · gtag.js direct (no GTM) · GA4 `530665322` · GSC `sc-domain:sparkcore.fund` · Bing WMT verified · **no paid ads**
**Entity:** SparkCore.investment OÜ — Reg. 16265864 · LEI `8945003BBN0RVNNB0S84` · supervised by Finantsinspektsioon · audited by KPMG Estonia

**Baselines compared:**
- **Baseline #1** — [`audit-2026-05-06/FULL-AUDIT-REPORT.md`](../audit-2026-05-06/FULL-AUDIT-REPORT.md) — **66/100 (C+)**, projected 88–92 post Sprint 1
- **Bridge** — [`audit-2026-06-05/CHECKPOINT-30DAY.md`](../audit-2026-06-05/CHECKPOINT-30DAY.md) — **~77/100 (B−)** J+30, indexation recovered, perf flagged as the sole blocker

---

## Executive Summary

### Overall SEO Health Score: **79 / 100 — B−**

| Category | Weight | Baseline 05-06 | Checkpoint 06-05 | **Audit 06-21** | Δ vs checkpoint | Contribution |
|---|---|---|---|---|---|---|
| Technical SEO | 22% | 78 | ~82 | **84** | +2 | 18.5 |
| Content Quality (E-E-A-T + cluster) | 23% | 65 | ~83 | **82** | −1 | 18.9 |
| On-Page SEO (canonicals + hreflang) | 20% | 55 | ~72 | **80** | +8 | 16.0 |
| Schema / Structured Data | 10% | 75 | ~86 | **83** | −3 | 8.3 |
| Performance (Mobile CWV) | 10% | 55 | ~56 | **57** | +1 | 5.7 |
| AI Search Readiness (GEO) | 10% | 71 | ~81 | **82** | +1 | 8.2 |
| Images | 5% | 72 | 72 | **71** | −1 | 3.6 |
| **Weighted total** | | **66.9** | **~77.4** | **79.1** | **+1.7** | |

### The trajectory: 66 → 77 → 79

The site is on a **healthy, monotonic upward trajectory** and the Sprint-1 gains have fully held. Three of the four "drag" categories from the baseline have closed:

- **Indexation** (the baseline's #1 CRITICAL, "blog 100% invisible to Google") is fully resolved and **held**: 7/7 indexable URLs sampled return `PASS` in GSC URL Inspection. The gated factsheets — including the brand-new **Equinoxe** factsheet shipped this branch — correctly return `NEUTRAL` (noindex defense-in-depth holding, no leak).
- **On-Page / hreflang** (baseline 55 → **80**, +25 over two cycles) is the biggest structural win: the baseline's CRITICAL "23 of 27 sitemap URLs missing hreflang alternates" is **fully remediated**, and the dual-cluster bilingual policy is now correctly expressed.
- **Schema, GEO, Content** are all in the low-to-mid 80s and stable.

### What's keeping the score off the 88–92 projection

The optimistic baseline projection assumed a performance sprint that would lift mobile CWV. The infrastructure half of that sprint **was executed** since the checkpoint (fonts self-hosted, critical CSS inlined, scripts deferred, render-blocking eliminated) — but it **did not move the user-facing CWV outcome**, and a second CWV metric has surfaced as failing:

1. **Mobile CWV is the ceiling (Performance = 57/100, the single largest score drag).** Mobile LCP remains **POOR (8.4–11.0 s)** on both homepages despite the infra work, and **CLS is now catastrophic (0.475 on the pillar, 1.061 on a sampled article)** across the entire content cluster. This 10%-weighted category alone is ~3 points below where the rest of the site sits.
2. **Visibility without traffic.** The cluster genuinely ranks (9,256 impressions/28d, positions 6–9 on a real regulatory query set), but CTR is ~0.7% and GA4 logs **1 organic session / 28d**. This is half structural (AI-Overview-style queries + a deliberately tiny €50k-minimum audience) and half fixable (titles/snippets + AI-citation capture).

> **Net read:** the site is technically and editorially in good shape (B−). The remaining upside is concentrated, not diffuse: **fix mobile CWV** (especially the precisely-diagnosed CLS) and **convert impressions into citations/clicks**. Neither requires new content volume.

### Top 5 Critical / High issues

1. **[CRITICAL] Catastrophic CLS on every content page.** Pillar CLS 0.475, article CLS 1.061 (threshold: <0.1). Root cause is precisely diagnosed: the hero `<img>` declares `width="1260" height="750"` (ratio 1.68) while the Unsplash file is served at `w=1200&h=630` (ratio 1.90), and `class="w-full max-h-[420px] object-cover"` defeats the reserved box → a 0.372 single shift. Secondary shifts from the consent banner image and web-font swap. **This is the shared md-to-html hero pattern → ~25 pages affected.** Most fixable critical on the site. *Evidence: `data/psi-article.json`, raw PSI layout-shift nodes.*
2. **[CRITICAL · time-boxed] YMYL regulatory factual drift in 10 days.** **8 pages** discuss the Estonian VASP sunset of **1 July 2026** in the future tense, with `dateModified` frozen at `2026-05-08`. On July 2 these passages become silently false on YMYL regulated-finance content at the exact moment the event they predict materialises. *Evidence: `data/content-eeat.md`; grep confirms 8 files.*
3. **[HIGH] Mobile LCP POOR (8.4–11.0 s) on both homepages.** Render-blocking is eliminated and FCP (1.7 s) / TBT (20 ms) are now good, yet the LCP element paints at 8–11 s — an 8 s FCP→LCP gap that points to the LCP element's own timing, not render-blocking or main-thread. Needs a DevTools-level LCP-element identification pass. Desktop is perfect (LCP 1.0 s, perf 99). *Evidence: `data/psi-home-en.json`, `data/psi-home-fr.json`.*
4. **[HIGH] Site-wide freshness drift, all stamped 2026-05-08.** `dateModified` (every sampled article), sitemap `<lastmod>` (33/35 entries), and `llms.txt` ("Last updated 2026-05-06") were all batch-stamped by the May Sprint and never refreshed. The April 2026 quarterly YMYL review was bundled into the May launch rather than run as a pass, so dated content is effectively one cycle behind. *Evidence: `data/content-eeat.md`, `data/technical-onpage.md`.*
5. **[HIGH] `why-invest-in-crypto-funds-2026` CTR collapse (877 impr / 0 clicks).** A consumer-listicle title ("7 Best Reasons for 2026") on a page targeting institutional allocators. Emblematic of the broader impressions-without-clicks pattern across the EN regulatory cluster. *Evidence: `data/gsc-pages-28d.json`, `data/content-eeat.md`.*

### Top 5 Quick Wins (≤ 1 hour each)

1. **Fix the hero CLS pattern** (≈45 min, repo-wide): match declared `width`/`height` to the served `1200×630`, add `h-auto`, and replace `max-h-[420px] object-cover` with an `aspect-[1200/630]` wrapper so the box is reserved before load. Kills the dominant shift on ~25 pages. *Highest score ROI on the site.*
2. **Update `llms.txt`** (15 min): bump the date, add the CLARITY Act article + content shipped since May 6. Outsized AI-citation benefit for a tiny edit.
3. **Replace "Big Four firm" → "KPMG Estonia"** on the homepage trust strip + `llms.txt` + author bios (10 min, *if* not contractually restricted). A verifiable named auditor is a materially stronger YMYL/E-E-A-T signal.
4. **Add `foundingDate` to the Organization JSON-LD** on both homepages (10 min; confirm date from ariregister.rik.ee, company 16265864). The checkpoint assumed this existed — it does not.
5. **Add an AIFMD Article 3 threshold Quick Answer box** to `aif-vs-aifm` (30 min): convert the position-7-9 / near-zero-CTR "eur-lex … article 3 thresholds 100/500m" impressions into an AI-citable passage. Mirror in FAQPage JSON-LD.

---

## 1. Score bridge & methodology note

This audit is a full multi-agent orchestration (4 specialist subagents + inline performance/images/search analysis), unlike the J+30 checkpoint which was a scripted GSC/PSI delta. Scores are built from:

- **Live Google APIs (Tier 2):** GSC URL Inspection (9 URLs), GSC Search Analytics (query + page, 28d), CrUX History, PageSpeed Insights v5 (4 pages × mobile/desktop), GA4 organic, drift-compare vs baseline #1.
- **4 specialist subagents:** `seo-content` (E-E-A-T), `seo-schema`, `seo-geo`, `seo-technical` — each wrote a full findings file to `data/` and returned a scored summary.
- **Direct repo inspection** for performance root-cause (CLS/LCP), image sizing, font/CSS strategy, and verification of the highest-stakes claims.

Two checkpoint records were **corrected** by direct verification this cycle:
- `foundingDate` was listed as "added" in the checkpoint — it is **absent** from every page (grep: 0 occurrences).
- The Schema score's checkpoint estimate (~86) was optimistic; the corrected current value is 83.

---

## 2. Technical SEO — 84 / 100 (+2)

**Full detail: [`data/technical-onpage.md`](data/technical-onpage.md)**

### Passes (held from baseline + checkpoint)
- HTTPS-only, HSTS preload-enabled, HTTP/3, CSP via CF Transform Rule, full security-header set (X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy).
- **Gated-content triple-layer defense exemplary** — all 3 factsheets (`cryptovision`, `dynamic-trends`, **`equinoxe`** new) blocked by `<meta robots noindex>` + `X-Robots-Tag` + `robots.txt Disallow` + zero sitemap entries. No regression from the colorimetry/factsheet branch.
- Static SSR HTML, IndexNow key served, Bing WMT verified, `_redirects` slug 301s + trailing-slash + `/en/→/` intact.
- **Indexation healthy:** 7/7 indexable URLs `PASS`; factsheets correctly `NEUTRAL`. *(`data/gsc-inspect.json`)*

### Issues
| Sev | Issue | Fix |
|---|---|---|
| LOW | Sitemap `<lastmod>` stale (33/35 at 2026-05-08) | Bump on changed pages; batch with next deploy |
| LOW | Privacy-policy: sitemap declares hreflang, HTML omits it | Add 2 `<link rel="alternate">` tags to the HTML head |
| LOW | robots.txt: newer AI crawlers (`anthropic-ai`, `Bytespider`, `Applebot-Extended`, `cohere-ai`, `meta-externalagent`) not explicitly named — they fall through to `User-agent: *` (functionally protected, best-practice gap) | Add named stanzas mirroring the ClaudeBot pattern |

---

## 3. Content Quality / E-E-A-T — 82 / 100 (−1)

**Full detail: [`data/content-eeat.md`](data/content-eeat.md)**

The −1 is entirely freshness drift; structure and authority held. This is a YMYL site, so freshness + factual accuracy are scored heavily.

### Strengths
- **Practitioner authorship with verifiable credentials.** Every article carries Alexandre VINAL's byline with inline links to the Finantsinspektsioon registry, the GLEIF LEI record, and Reg. No. 16265864 — in the bio text, not just the footer. Exactly what the Sept-2025 QRG rewards on YMYL finance.
- **Best-in-niche citation architecture** — "Citation capsule" blockquotes, Quick Answer boxes, 8-entry FAQPage, 15+ named-and-dated sources on `why-invest` (AIMA/PwC Nov 2025, BlackRock 2025, Galaxy Jan 2025).
- **Genuine content depth** — pillar ≈3,000 words / 13 H2s using the firm's own AIFM registration as a worked example.

### Issues
| Sev | Issue | Fix |
|---|---|---|
| CRITICAL | **VASP sunset (1 Jul 2026) future-tense on 8 pages**, dateModified frozen | On/after Jul 1: update tense, add a "status confirmed" note, bump `dateModified` (all 4 surfaces) |
| HIGH | **dateModified frozen ~44 days** across all articles; April quarterly review never run as a pass | Execute the July quarterly review now; bump `dateModified` + visible "Last reviewed" on touched pages |
| HIGH | **`why-invest` CTR collapse** (877 impr / 0 clk) — listicle title wrong for institutional audience | Retitle (e.g. "Why Institutional Investors Allocate to Crypto Funds: 7 Evidence-Based Arguments"); rewrite meta to lead with governance |
| MEDIUM | Auditor named "Big Four firm" not **KPMG Estonia** (homepage trust strip + llms.txt + bios) | Name KPMG explicitly (if not contractually restricted) |
| MEDIUM | `llms.txt` stale (46 days; missing the best-converting CLARITY Act article) | Refresh date + add recent content |

> **YMYL accuracy watch:** AIFMD II transposition (16 Apr 2026) is already past but discussed as future on several pages; the FR CLARITY Act article asserts a "4 July 2026 White House signature target" that remains unsigned as of audit date. Both need a tense/status pass alongside the VASP fix.

---

## 4. On-Page SEO (canonicals + hreflang) — 80 / 100 (+8)

**Full detail: [`data/technical-onpage.md`](data/technical-onpage.md)**

The cycle's biggest structural gain (+25 over two cycles).

### Resolved from baseline
- **Sitemap hreflang CRITICAL — RESOLVED.** Every EN structural URL (homepages, blog indexes, 23 EN articles, pillar, privacy) now carries correct `<xhtml:link>` alternates. The "4 FR articles point x-default at themselves" bug is gone.
- Dual-cluster policy correctly expressed: EN articles self-hreflang (`en` + `x-default` → self, no FR cross-link); homepages + blog indexes carry reciprocal en/fr/x-default. Non-mirror article hreflang is now **intentional architecture**, not a defect.

### Issues
| Sev | Issue | Fix |
|---|---|---|
| MEDIUM | **FR articles carry zero hreflang signal** (sitemap + HTML) — only `lang="fr"` + path infer language. Risk of FR-SERP mis-assignment | Add self-hreflang to FR articles (`fr` + `x-default` → self), HTML heads + sitemap |
| MEDIUM | Pillar meta description 206 chars (truncates ~160) | Trim to ≤155, keep AIFMD / sub-threshold / MiCA terms |
| LOW | Self-canonicals correct across sample; titles/H1s clean | — |

---

## 5. Schema / Structured Data — 83 / 100 (−3, corrected)

**Full detail: [`data/schema.md`](data/schema.md)**

The −3 is a correction, not a regression: the checkpoint's ~86 assumed `foundingDate` had been added (it had not) and didn't flag the factsheet Organization divergence.

### What changed on the homepage (drift `schema_modified` explained)
Not structural — the `@graph` still has the same 7 nodes/@ids. The hash moved because the **FAQPage Q4 answer was rewritten to name Equinoxe** as the third fund ("market-neutral — planned launch 2026"), and the HTML fund-card grid now renders a full Equinoxe card. **No new `@type` was added for the funds.**

### Strengths
- Entity graph solid and EN/FR-consistent: `#organization` carries LEI, taxID, 4× `sameAs` (LinkedIn, YouTube/Cointips, GLEIF, FI.ee), 3 structured `Person` nodes with `@id`, `FinancialService` with full address.
- Article/BlogPosting markup complete and publisher-linked (`@id`, author→`#person-alexandre-vinal`, ImageObject w/ dims, wordCount, 3-level BreadcrumbList).
- Factsheets carry well-formed `FinancialProduct` (fees, category, Offer, eligibleRegion) — read by AI crawlers despite noindex.

### Issues
| Sev | Issue | Fix |
|---|---|---|
| CRITICAL→easy | **`foundingDate` absent** on all pages (checkpoint wrongly assumed present) | Add `"foundingDate"` to Organization on both homepages (confirm via ariregister.rik.ee 16265864) |
| HIGH | **Pillar standalone Person block** has no `@id`, inconsistent `jobTitle` ("Founder & AIFM…"), inline `worksFor` | Replace with canonical block referencing `#person-alexandre-vinal` + `worksFor:{@id:#organization}` |
| MEDIUM | **Factsheet Organization = stripped duplicate** (no LEI/founder/sameAs) → contradicts homepage entity for AI crawlers | Replace inline Org with `{"@id":".../#organization"}` (same pattern articles use for publisher) |
| MEDIUM | No `FinancialProduct` schema for the 3 funds **on the indexable homepage** (only on noindex factsheets) | Add a homepage JSON-LD block: 3 `FinancialProduct` nodes (DT, CryptoVision, Equinoxe) `provider:{@id:#organization}` |
| LOW | Pillar Article `@id` missing trailing slash (`…estonia#article` vs canonical `…estonia/`) | Normalise to `…estonia/#article` |

> **Policy note (not a defect):** FAQPage rich results were retired by Google for all sites on **2026-05-07**. Existing FAQPage is retained for AI/LLM citation value — do **not** remove, do **not** add new FAQPage for SERP benefit.

---

## 6. Performance — Mobile CWV — 57 / 100 (+1)

**Data: `data/psi-*.json`, `data/crux-history.json`, `data/drift-compare.txt`**

This is the **single largest drag on the global score** and the clearest remaining upside.

### Lab measurements (PSI v5, this audit)

| Page | Strategy | Perf | LCP | FCP | TBT | CLS | Verdict |
|---|---|---|---|---|---|---|---|
| Home EN | mobile | 69 | **10.6 s** | 2.6 s | 20 ms | 0 | LCP FAIL |
| Home EN | desktop | **99** | 1.0 s | 0.4 s | 0 | 0 | PASS |
| Home FR | mobile | 67 | **11.0 s** | 2.6 s | 50 ms | 0 | LCP FAIL |
| Home FR | desktop | **99** | 1.0 s | 0.4 s | 10 ms | 0 | PASS |
| Pillar | mobile | 80 | 0.9 s | 0.9 s | 50 ms | **0.475** | CLS FAIL |
| Article | mobile | 75 | 1.8 s | 0.8 s | 40 ms | **1.061** | CLS FAIL |

- **CrUX field data: still none** ("insufficient Chrome traffic") — lab is Google's only CWV signal, so these don't yet rank-penalise, but they're the only available read. *(`data/crux-history.json`)*
- **Drift vs baseline #1:** homepage LCP regressed 5.6 s → 7.7 s (+39%) in drift's own lab run; FCP and TBT improved. *(`data/drift-compare.txt`)*

### What was done (and helped) since the checkpoint
The performance infrastructure sprint **was executed**: fonts are now **self-hosted** (12× woff2, zero Google Fonts requests), **critical CSS + @font-face inlined**, hero fonts **preloaded** (`crossorigin`), `analytics.js` and all non-essential JS **deferred**, Tailwind loaded async — **render-blocking resources audit is now empty**. This moved FCP (3.3 → 1.7 s) and TBT (to 20 ms).

### Why the score barely moved
The infra work fixed render-blocking and main-thread — but **neither was the LCP bottleneck**. Two separate CWV metrics still fail:

1. **CLS (the precisely-diagnosed, most-fixable item):** the hero `<img>` declares `width="1260" height="750"` but the Unsplash file is `w=1200&h=630`; combined with `w-full max-h-[420px] object-cover`, the browser cannot reserve the correct box → 0.372 single shift, plus consent-banner-image + web-font-swap shifts. Shared md-to-html pattern → **~25 content pages**.
2. **Homepage mobile LCP (8–11 s):** with render-blocking gone (FCP 1.7 s) and TBT 20 ms, the 8 s FCP→LCP gap is the **LCP element's own timing**. No AOS on the homepage (ruled out). Requires DevTools LCP-element identification (candidate: `hero-graph-img.webp` / a late-bound hero composite vs the preloaded `hero-image.webp`). Desktop renders the same page in 1.0 s, so the fix is mobile-specific.

> **Scoring rationale:** +1 only. The infra work is real and de-risks the LCP fix, but the two user-facing CWV metrics that this category measures both fail on the most important pages — and CLS is actively catastrophic.

---

## 7. AI Search Readiness (GEO) — 82 / 100 (+1)

**Full detail: [`data/geo-ai.md`](data/geo-ai.md)**

Strategically central here: GSC shows the site ranking for AI-Overview-style queries (clarity act, EUR-Lex thresholds) with near-zero CTR — exactly where AI **citation** beats blue-link clicks.

### Strengths
- Citation-capsule pattern (verbatim EUR-Lex statutory text + article cite + link) is best-in-niche for AI extraction.
- Technical accessibility ~perfect: static HTML, 6 AI crawlers explicitly allowed, lang-redirect scripts bot-exempt all crawlers, no render barrier.
- **LEI-anchored entity chain** (site → GLEIF → FI.ee) is the key defence against the "chainscore/redcore/capcore/fundcore" brand-confusion collapse showing in GSC.

### Top opportunities
| Sev | Opportunity | Fix |
|---|---|---|
| HIGH | "eur-lex … article 3 thresholds 100/500m" ranks pos 7–9, ~0 CTR | Add a 47-word AIFMD Art. 3 Quick Answer box to `aif-vs-aifm` + mirror in FAQPage |
| HIGH | "clarity act date 2026" ranks pos 4.4 but serves the **FR** article to EN queries | Create a short **EN** "CLARITY Act — key 2026 dates" explainer w/ Quick Answer |
| MEDIUM | llms.txt stale + "Big Four" not "KPMG" | Refresh + name auditor |
| MEDIUM | FAQ answers ~50 words (borderline for verbatim extraction) | Extend to 85–100 words (HTML + JSON-LD in lockstep) |
| MEDIUM | `speakable` only on pillar | Batch `speakable` onto articles in the July quarterly pass |

> **Highest-ROI brand action:** add one Cointips YouTube video description / community post naming "SparkCore Fund Management (sparkcore.fund)" to build the YouTube→domain entity bridge (YouTube↔AI-citation correlation is high).

---

## 8. Images — 71 / 100 (−1)

- **Good:** all sampled `<img>` carry explicit `width`/`height`; WebP throughout; homepage hero uses responsive `srcset` (480/768/full); descriptive, keyword-relevant alt text on heroes.
- **Issue (−1):** the systematic **hero aspect-ratio declaration error** (1260×750 declared vs 1200×630 served) across ~25 pages is the root of the content-page CLS. It is fixed in the same edit as §6 item 1. External Unsplash heroes mean no control over compression, but they are sized and lazy/eager-flagged appropriately.

---

## 9. Search performance & the traffic reality

**Data: `data/gsc-queries-28d.json`, `data/gsc-pages-28d.json`, `data/ga4-28d.json` (window 2026-05-24 → 06-18/20)**

| Metric | Value | Read |
|---|---|---|
| Total impressions (28d) | **9,256** | Strong visibility for a 1-month-old-cluster institutional site |
| Total clicks | 64 | CTR 0.69% |
| GA4 organic sessions (28d) | **1** | Tiny by design (€50k min, email-gated factsheets, recommendation-driven) |
| Non-brand named queries | 140 | Topical authority is real |
| Non-brand impr > 5 | 44 | (checkpoint: 44 — flat) |
| CrUX field data | none | Below Chrome-traffic eligibility |

**Top pages by impressions:** pillar 2,402 (pos 6.9), `aif-vs-aifm` 1,443 (pos 7.0), **FR clarity-act 1,264 / 14 clicks (best converter)**, `delta-neutral` 899, homepage 891 / 26 clicks (brand), `why-invest` 877 / **0 clicks**.

**Two structural signals:**
1. **Impressions ≫ clicks.** The EN regulatory cluster ranks page-1-bottom / page-2 on informational queries that increasingly resolve in AI Overviews. The lever is **CTR (titles/snippets) + AI citation (GEO)**, not more content. The FR markets cluster (clarity-act) already converts far better (1.1% CTR) — a model for the EN cluster.
2. **Brand-confusion noise.** ~8 of the top-20 non-brand queries are other "*core" companies (chainscore, redcore invest, capcore, profitina fundcore, aurentcore, margen stockcore). SparkCore surfaces for them but won't convert — reinforcing why **entity disambiguation** (LEI, foundingDate, KPMG, distinct sameAs) matters here more than for a typical site.

---

## 10. Indexation & drift status

- **URL Inspection (9 URLs, `data/gsc-inspect.json`):** 7/7 indexable = `PASS`; `/factsheets/equinoxe` + `/factsheets/dynamic-trends` = `NEUTRAL` (noindex holding — the new Equinoxe factsheet did **not** leak).
- **Sitemap (`data/gsc-sitemaps.json`):** submitted, 0 errors/warnings; sitemap-indexed counter remains a known `sc-domain:` display artefact (contradicted by the 7/7 PASS).
- **Drift vs baseline #1 (`data/drift-compare.txt`):** 0 critical, 3 WARNING + 1 INFO — meta description improved (adds legal entity + regulator), schema modified (Equinoxe FAQ text), homepage content hash changed (expected), CWV-LCP regressed (the §6 finding). **No P0 regressions.**

---

## 11. Cross-cutting synthesis

1. **Mobile CWV is the ceiling.** Everything else is low-80s; Performance at 57 is what holds the global score at 79 instead of low-80s. CLS is precisely diagnosed and repo-wide-fixable in one edit; LCP needs one investigation pass. This is the highest-leverage work on the site.
2. **Freshness is drifting from a single May-08 stamp** — articles' `dateModified`, sitemap `<lastmod>`, and `llms.txt` all froze together. With VASP (Jul 1) and AIFMD II (Apr, past), YMYL factual drift is imminent on 8 pages. **The July quarterly review is the one vehicle that resolves freshness + accuracy + speakable + FAQ-expansion together.**
3. **Visibility without traffic is the strategic reality** — optimise for CTR + AI citation, not volume. The audience is deliberately tiny; impressions and citations are the right success metric, not sessions.
4. **Entity precision pays double here** because of the "*core" brand-confusion noise — foundingDate, named KPMG, factsheet Org `@id` reference, and the pillar Person fix all tighten the machine-verifiable entity graph that keeps SparkCore distinct in both classic SERPs and AI answers.

---

## Annex — data inventory

| File | Contents |
|---|---|
| `data/content-eeat.md` | Full E-E-A-T / YMYL findings (seo-content agent) |
| `data/schema.md` | Full JSON-LD inventory + validation (seo-schema agent) |
| `data/geo-ai.md` | Full GEO / AI-readiness findings (seo-geo agent) |
| `data/technical-onpage.md` | Full technical + sitemap + hreflang findings (seo-technical agent) |
| `data/gsc-inspect.json` | URL Inspection, 9 URLs |
| `data/gsc-queries-28d.json` / `gsc-pages-28d.json` | Search Analytics (query / page) |
| `data/gsc-sitemaps.json` | Sitemap status |
| `data/psi-home-en.json` / `psi-home-fr.json` / `psi-pillar.json` / `psi-article.json` | PageSpeed v5 lab data |
| `data/crux-history.json` | CrUX (empty — insufficient traffic) |
| `data/ga4-28d.json` | GA4 organic traffic |
| `data/drift-compare.txt` | Drift vs baseline #1 (2026-05-06) |

**Action plan:** [`ACTION-PLAN.md`](ACTION-PLAN.md)
