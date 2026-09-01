# Blog Audit — SparkCore Investment (sparkcore.fund)

**Audit Date:** 2026-06-21
**Type:** RE-AUDIT (baseline: `blog-audit-2026-05-16.md`, ~5 weeks prior)
**Scope:** 23 EN articles in `blog/` + 6 FR articles in `fr/blog/` (hub `index.html` and `fr/blog/repurposed/` excluded by design)
**Methodology:** 8 parallel `blog-reviewer` agents, 5-category 100-point scoring (Content 30 / SEO 25 / E-E-A-T 15 / Tech 15 / AI 15), file-only analysis (no web fetches). Deterministic metadata (dates, schema, word-count proxies, KPMG strings, defects) extracted by grep and cross-verified before scoring. Baseline scores supplied to agents for delta tracking only; independent re-scoring with justification required for any divergence > 3 pts.
**Site nature:** YMYL — regulated AIFM (SparkCore Investment OÜ, supervised by Finantsinspektsioon, LEI `8945003BBN0RVNNB0S84`) addressed to qualified/professional investors only (min €50k).

---

## TL;DR

| KPI | EN (n=23) | FR (n=6) | Corpus (n=29) |
|---|---|---|---|
| **Average score (2026-06-21)** | **84.3/100 (B)** | **82.5/100 (B−)** | **83.9/100 (B)** |
| Average score (2026-05-16 baseline) | 85.0 | 87.2 | 85.5 |
| **Delta** | **−0.7** | **−4.7** | **−1.6** |
| 90+ Exceptional | 7 (was 9) | 0 (was 1) | 7 (was 10) |
| 80-89 Strong | 8 (was 5) | 6 (was 5) | 14 (was 10) |
| 70-79 Acceptable | 8 (was 9) | 0 | 8 (was 9) |
| <70 Rewrite | 0 | 0 | 0 |
| YMYL bar met (floor) | 23/23 ✓ | 6/6 ✓ | 29/29 ✓ |
| YMYL **concern** flagged | 1 (crypto-arbitrage) | 4 (strc, strategies-options, le-vrai-cout, agents-ia) | 5 |
| Stale > 12 months | 0 | 0 | 0 |
| **Within 30-day GEO window** | **0/23** (was 23/23) | **0/6** (was 6/6) | **0/29** |
| FAQPage schema present | 13/23 (57%) | 6/6 (100%) | — |

### Headline findings (what moved since the 2026-05-16 baseline)

1. **The whole corpus aged out of the 30-day freshness window.** Every `dateModified` is frozen at **2026-05-08** (FR clarity-act 05-09, strc 05-11) = **41–44 days stale** as of 2026-06-21. At baseline the entire corpus was < 8 days old. This is the single largest systematic score driver this cycle (uniform AI-Citation drag). **No article is > 12 months or even > 90 days** — the issue is the breached 30-day GEO window, not deep decay. The next quarterly review (CLAUDE.md Mode A: Jul 2026) is now due.
2. **FR fell ~3× harder than EN (−4.7 vs −0.7).** The FR cluster is time-sensitive *market commentary* (Iran-war macro, CLARITY Act legislative calendar, Q1-2026 stablecoin volumes) — it decays far faster than EN evergreen regulatory content, and re-scrutiny re-priced its Tier-3 sourcing. **strc dropped 91→84 (−7)** as the baseline over-credited a draft carrying unresolved legal risk.
3. **P0 legal risk on strc (FR) is only PARTIALLY mitigated.** The "Ponzi" passage was *softened* since baseline (added "la distinction avec un Ponzi classique est que l'actif sous-jacent existe") but the loaded financial-crime term **"Ponzi" still sits in a crawlable H3 heading** ("Une mécanique structurellement proche d'un schéma de Ponzi") applied to a **named, SEC-listed issuer (Strategy Inc./MSTR) and a named controlling person (Saylor)**. Still live defamation / market-manipulation surface. **Remains P0.**
4. **KPMG removal is in progress but INCOMPLETE.** Commit `d6269b1` (2026-05-29) removed KPMG from `aif-vs-aifm` only. **KPMG still appears in 4 EN articles** (cost-to-launch L576, do-crypto-mica L247/272, estonia-lux-malta L451/630/643, regulated-crypto-fund-manager-estonia L392) — all user-visible (body cells, chart sources, figcaptions). Policy compliance is now a mechanical P1 cleanup.
5. **3 NEW factual defects confirmed by grep** (not present/caught at baseline):
   - `crypto-fund-for-qualified-investors` — **visible byline reads "Published on 13 March 2025"** while schema says 2026-03-13. A wrong year on a YMYL page.
   - `strategies-options` (FR) — **internal self-contradiction**: JHEQX 2022 stated as **−8,06%** (7×) and **−5,8%** (4×) on the same page's most-repeated stat.
   - `what-a-market-neutral` — brand anchor "SparkCore Fund Management" **links to `/fr/`** (French homepage) from an EN article.
6. **Two articles slipped below the 80 band**: `crypto-fund-compliance-guide` (80→78) and `crypto-fund-for-qualified-investors` (80→78). Still no < 70 rewrite-tier articles in either locale.
7. **EN↔FR parity = 0, and that is now formally intentional** — the dual-cluster split is documented in `MD/CLAUDE.md` ("Bilingual policy — dual-cluster strategy"). Baseline action SD-1 is effectively **closed**.

---

## Health Overview

| Metric | Value | vs Baseline |
|---|---|---|
| Total scored articles | 29 (23 EN + 6 FR) | unchanged |
| Average corpus score | 83.9/100 | −1.6 |
| Articles flagged for **rewrite** (<70) | 0 | unchanged |
| Articles in 70-79 upgrade band | 8 (all EN) | −1 |
| Articles flagged **P0 legal** | 1 (FR/strc) | unchanged (softened, not closed) |
| Articles with **NEW factual defect** | 3 (qualified-investors date, strategies-options stat, market-neutral anchor) | +3 |
| **KPMG cleanup pending** | 4 EN articles | NEW (policy started 05-29) |
| `dateModified` not bumped after edit | 1 (aif-vs-aifm, edited 05-29) | NEW |
| Cannibalization candidates | 2 EN pairs (unchanged) + entity-overlap watch | unchanged |
| FAQPage schema present | 13/23 EN (57%) · 6/6 FR | unchanged |
| In-body SVG/figure visuals | 7/23 EN · 0/6 FR | unchanged |
| Article-specific OG image | ~3/23 EN · 5/6 FR | unchanged |
| External Unsplash hotlink (CWV/GDPR) | 2 EN (sub-threshold, aif-vs-aifm) · 1 FR (strategies-options) | unchanged |
| Author Person schema + LEI + Finantsinspektsioon + disclaimer | 29/29 ✓ | unchanged |
| Schema `wordCount` under-declared vs body | ~corpus-wide | NEW (flagged independently by 5/8 agents) |

---

## EN — Per-Article Scores (23 articles)

| File | 06-21 | 05-16 | Δ | C/30 | SEO/25 | EEA/15 | T/15 | AI/15 | FAQ | SVG | Top issue |
|---|---|---|---|---|---|---|---|---|---|---|---|
| sub-threshold-aifm-crypto-estonia | **95** | 96 | −1 | 29 | 24 | 15 | 14 | 13 | ✓ | 4 | Unsplash hotlink hero/OG |
| do-crypto-fund-managers-need-mica-casp-license | **93** | 95 | −2 | 28 | 24 | 14 | 14 | 13 | ✓ | 3 | **KPMG** L247/272; bare-homepage FAQ cites |
| cost-to-launch-regulated-crypto-fund-europe ⭐ | **92** | 95 | −3 | 28 | 23 | 15 | 13 | 13 | ✓ | 4 | **KPMG** L576 ("KPMG-equivalent"); generic OG |
| estonia-eresidency-crypto-fund-eu ⭐ | **92** | 93 | −1 | 27 | 24 | 14 | 13 | 14 | ✓ | 4 | Jul-1-2026 deadline copy now under-urgent |
| crypto-fund-fees-2026 ⭐ | **91** | 93 | −2 | 27 | 23 | 14 | 13 | 14 | ✓ | 3 | schema image≠og:image; wordCount drift |
| aif-vs-aifm-crypto-explained | **90** | 92 | −2 | 27 | 22 | 14 | 12 | 15 | ✓ | 0 | **dateModified not bumped** after 05-29 edit; hotlink |
| estonia-luxembourg-malta-crypto-fund | **90** | 94 | −4 | 28 | 21 | 14 | 14 | 13 | ✓ | 3 | **title 88 chars**; **KPMG** L451/630/643 |
| why-invest-in-crypto-funds-2026 | **89** | 93 | −4 | 27 | 23 | 14 | 13 | 12 | ✓ | 4 | 7/10 H2s are questions (AI tic); 2026 forecasts age poorly |
| how-to-launch-a-crypto-fund-estonia | **88** | 89 | −1 | 26 | 23 | 13 | 14 | 12 | ✓ | 0 | 7-step process ships text-only (best SVG candidate) |
| regulated-crypto-fund-manager-estonia | **87** | 90 | −3 | 25 | 23 | 13 | 13 | 13 | ✓ | 0 | **KPMG** L392 (named auditor) |
| what-is-a-crypto-aifm | **85** | 86 | −1 | 25 | 22 | 14 | 12 | 12 | ✓ | 0 | entity-overlap watch vs aif-vs-aifm |
| delta-neutral-crypto-strategies-explained | **85** | 88 | −3 | 25 | 22 | 13 | 13 | 12 | ✓ | 0 | cannibalization vs market-neutral ("market neutral" ×29) |
| crypto-fund-vs-etf | **82** | 86 | −4 | 24 | 22 | 12 | 13 | 11 | ✓ | 0 | rhetorical-Q H2s; no comparison table; thin footer |
| white-label-crypto-fund-manager-services | **81** | 83 | −2 | 25 | 21 | 13 | 11 | 11 | ✗ | 0 | cannibalization vs platform; **no FAQ**; unsourced 150-investor/tax claims |
| regulated-crypto-investment-fund | **80** | 79 | +1 | 23 | 21 | 13 | 11 | 12 | ✗ | 0 | no FAQ; no strategy-comparison table |
| what-an-institutional-crypto-fund-manager-does | **79** | 77 | +2 | 24 | 21 | 13 | 11 | 10 | ✗ | 0 | no FAQ (richest content of thin cohort); verify `/resources/` link |
| bitcoin-outperformance-strategy-fund | **78** | 78 | 0 | 23 | 20 | 12 | 11 | 12 | ✗ | 0 | 84%/77% drawdown on CoinGecko only (Tier 4) |
| crypto-fund-compliance-guide | **78** | 80 | −2 | 23 | 20 | 13 | 11 | 11 | ✗ | 0 | "Guide" with zero tables/lists/FAQ; claim-to-cite gap |
| what-an-alternative-investment-fund-platform-does | **78** | 76 | +2 | 23 | 20 | 13 | 9 | 13 | ✗ | 0 | abstract; no concrete anchors; no FAQ/table |
| crypto-arbitrage-investment-fund | **77** | 76 | +1 | 23 | 20 | 12 | 11 | 11 | ✗ | 0 | **YMYL: zero EU-regulator inline cite** on risk-centric page |
| crypto-fund-for-qualified-investors | **78** | 80 | −2 | 24 | 20 | 13 | 11 | 10 | ✗ | 0 | **visible "2025" byline date error**; no FAQ |
| what-a-market-neutral-crypto-fund-does | **76** | 75 | +1 | 23 | 19 | 13 | 9 | 12 | ✗ | 0 | cannibalization vs delta-neutral; **`/fr/` brand anchor** |
| white-label-crypto-fund-platform | **74** | 74 | 0 | 22 | 18 | 13 | 9 | 12 | ✗ | 0 | hardest cannibalization vs services; lowest score |

⭐ = Sprint 1 (2026-05-07) noindex→index flip — all 3 remain safely above the YMYL bar (91–92).

### EN Score Distribution

| Band | 06-21 | 05-16 | Articles (06-21) |
|---|---|---|---|
| 90+ Exceptional | 7 | 9 | sub-threshold, do-crypto-mica, cost-to-launch, estonia-eresidency, crypto-fund-fees, aif-vs-aifm, estonia-lux-malta |
| 80-89 Strong | 8 | 5 | why-invest, how-to-launch, regulated-crypto-fund-manager-estonia, what-is-crypto-aifm, delta-neutral, crypto-fund-vs-etf, white-label-manager-services, regulated-crypto-investment-fund |
| 70-79 Acceptable | 8 | 9 | what-an-institutional, bitcoin-outperformance, crypto-fund-compliance-guide, what-an-AIF-platform, crypto-arbitrage, crypto-fund-for-qualified-investors, what-a-market-neutral, white-label-platform |
| <70 | 0 | 0 | — |

The 90+ tier lost 2 (why-invest 93→89, estonia-lux-malta dropped within the band edge) — both fell on the uniform freshness drag + specific defects (question-cadence tic; title length + KPMG), not content rot.

### EN Sub-category averages

| Category | 06-21 | 05-16 | Comment |
|---|---|---|---|
| Content / 30 | 25.2 | 24.6 | Stable; thin March cohort still ~2,000w vs flagship 4,000-5,000w |
| SEO / 25 | 21.6 | 21.9 | 1 title overflow (estonia-lux-malta 88ch); rhetorical-Q H2 clusters |
| E-E-A-T / 15 | 13.3 | 13.7 | Floor intact 23/23; dip from KPMG pull + tighter source scrutiny |
| Technical / 15 | 12.0 | 12.7 | Biggest drag: 10/23 no FAQ, 16/23 no SVG, generic OG, wordCount drift |
| AI Citation / 15 | 12.2 | 12.4 | Uniform 44-day freshness drag; question-cadence tics on flagships |

---

## FR — Per-Article Scores (6 articles)

| File | 06-21 | 05-16 | Δ | C/30 | SEO/25 | EEA/15 | T/15 | AI/15 | YMYL | Top issue |
|---|---|---|---|---|---|---|---|---|---|---|
| clarity-act-us-impacts-investisseurs | **86** | 89 | −3 | 26 | 22 | 13 | 14 | 11 | pass | live legislative-calendar copy now 6 wks stale; EN-cluster internal links |
| strc-strategy-yield-sous-remunere-analyse | **84** | 91 | **−7** | 26 | 21 | 13 | 13 | 11 | ⚠ | **P0: "Ponzi" in H3 heading on named SEC issuer**; title/og/schema drift |
| indicateurs-marche-crypto-actifs | **83** | 88 | −5 | 25 | 20 | 12 | 14 | 12 | pass | OI-ATH 45 Md$ on CoinReporter (T4); $19B liq on Amberdata (T3); 0 internal links |
| agents-ia-blockchain-economie-agentique | **82** | 86 | −4 | 25 | 21 | 12 | 13 | 11 | ⚠ | **28T/76% headline stat on Cryptonews.net (T3)** + MEXC (T4) |
| le-vrai-cout-du-market-timing | **80** | 85 | −5 | 25 | 20 | 12 | 12 | 11 | ⚠ | **Iran-war macro on Tier-3/4 secondary, no primary**; emotive framing vs disclaimer |
| strategies-options-protection-portefeuille-actions | **80** | 84 | −4 | 26 | 21 | 12 | 9 | 12 | ⚠ | **internal contradiction JHEQX −8,06% vs −5,8%**; Unsplash hotlink hero+OG+schema |

### FR Score Distribution

| Band | 06-21 | 05-16 |
|---|---|---|
| 90+ Exceptional | 0 | 1 (strc) |
| 80-89 Strong | 6 | 5 |
| <80 | 0 | 0 |

### FR Sub-category averages

| Category | 06-21 | 05-16 | Comment |
|---|---|---|---|
| Content / 30 | 25.5 | 26.3 | Long-form depth (3.8k-7k words) remains a strength |
| SEO / 25 | 20.8 | 22.2 | title/og/H1 headline divergence on strc & clarity; 1 article 0 internal links |
| E-E-A-T / 15 | 12.3 | 13.8 | Largest drop: strc legal exposure + Tier-3 headline-stat sourcing across cluster |
| Technical / 15 | 12.5 | 13.0 | strategies-options Unsplash hotlink (TECH 9); otherwise FAQ 6/6 ✓ |
| AI Citation / 15 | 11.3 | 11.8 | Lowest sub-cat corpus-wide — jargon density + 44-day freshness on dated events |

---

## Top 5 Articles to Rewrite (YMYL-priority queue)

Sorted: legal exposure → factual defect → YMYL sourcing gap. (Cannibalization/thin rewrites are in the Action Queue P1 below — they are lower YMYL risk.)

### P0 — Legal exposure (this week)

| # | File | Locale | Score | Issue | Action | Effort |
|---|---|---|---|---|---|---|
| 1 | strc-strategy-yield-sous-remunere-analyse | FR | 84 | **"Ponzi" still in a crawlable H3 heading** ("Une mécanique structurellement proche d'un schéma de Ponzi") + body, applied to named SEC-listed Strategy Inc./MSTR + named person (Saylor). Softening since baseline ("l'actif sous-jacent existe") mitigates but does NOT neutralize — the term sits in an AI-citable, FAQ-extractable heading position. Defamation / market-manipulation exposure for a Finantsinspektsioon-regulated AIFM under a real byline. | **Reframe the H3** to a neutral structural label (e.g. "Un modèle dépendant de l'émission continue de titres"). Remove "Ponzi" from all heading/extractable positions; confine any analogy to a single attributed, qualified clause. Preserve the analytical conclusion (yield under-prices the risk). Then bump `dateModified` + reconcile title/og/headline. | 30 min |

### P1 — Factual / YMYL defects (this week)

| # | File | Locale | Score | Issue | Action | Effort |
|---|---|---|---|---|---|---|
| 2 | strategies-options-protection-portefeuille-actions | FR | 80 | **Internal self-contradiction** on the most-repeated stat: JHEQX 2022 = −8,06% (7×, body+FAQ schema) vs −5,8% (4×, conclusion+updated FAQ) — confirmed by grep. Plus **Unsplash external hotlink** for hero + og:image + schema ImageObject (GDPR IP-leak + render-blocking LCP on a regulated YMYL page). | Reconcile JHEQX 2022 to ONE verified figure across body/FAQ/conclusion (also check −18,11% vs −18,1% S&P). Self-host hero as AVIF/WebP; repoint og:image + schema image to a sparkcore.fund asset. | 1.5h |
| 3 | crypto-fund-for-qualified-investors | EN | 78 | **Visible byline "Published on 13 March 2025"** while schema datePublished = 2026-03-13 (confirmed). Wrong year on a YMYL page = credibility + freshness defect. Also dropped below 80; no FAQPage. | Fix byline year → 2026. Add FAQPage (eligibility / min ticket / direct-vs-fund / liquidity — all FAQ-natural). Add a direct-vs-fund comparison table. | 1.5h |
| 4 | crypto-arbitrage-investment-fund | EN | 77 | **YMYL concern**: the article's whole thesis is regulatory/operational risk, yet there is **zero EU-regulator inline citation** in the body; the only external cite is CoinGecko ×1 carrying the load-bearing 84%/77% drawdown claim. Weakest sourcing of the thin cohort. | Add ≥1 Tier-1 regulator inline cite (MiCA market-abuse / ESMA arbitrage guidance / AIFMD). Add FAQPage + an arbitrage-types comparison table + a drawdown SVG. | 3h |

### P1 — FR sourcing fact-check (this week)

| # | File | Locale | Score | Issue | Action | Effort |
|---|---|---|---|---|---|---|
| 5 | le-vrai-cout-du-market-timing | FR | 80 | The load-bearing 2026 Iran-war macro hook (S&P retraced 100% / −7,8% trough, Brent +68%, Ormuz 24→4 tankers, helium +40-100%) rests on **Tier-3/4 secondary** (FXStreet, "The Middle East Insider", Mexico Business News) with **no primary** (EIA/ICE/S&P/exchange). Emotive "panic narrative" sits next to the formal YMYL disclaimer. | Run `/blog factcheck`; anchor S&P to S&P/exchange data, Brent to EIA/ICE; downgrade secondary cites to corroboration. Tone-calibrate the emotive lede. The evergreen DALBAR/JP Morgan/PLOS spine (Tier 1-2) is fine. | 1.5h |

**Runner-up (P1, just below the cut):** `agents-ia` (FR, 82) — re-anchor the "28T stablecoins / 76% agent-piloted" headline from Cryptonews.net (T3)/MEXC (T4) to Visa Onchain Analytics / Chainalysis / Allium primary. Same fact-check class as #5.

---

## Action Queue

### P0 — Legal (do first)

| ID | Action | Article | Effort |
|---|---|---|---|
| L-1 | Reframe "Ponzi" H3 heading + body → neutral structural label; keep analytical conclusion | FR/strc | 30 min |

### P1 — YMYL defects + policy compliance (this week)

| ID | Action | Scope | Effort |
|---|---|---|---|
| Y-1 | Reconcile JHEQX 2022 stat to one figure; self-host Unsplash hero/OG | FR/strategies-options | 1.5h |
| Y-2 | Fix visible "2025" byline → 2026 | EN/crypto-fund-for-qualified-investors | 5 min |
| Y-3 | Add ≥1 Tier-1 regulator inline cite (YMYL gap) | EN/crypto-arbitrage | 1h |
| Y-4 | Primary fact-check macro hook + tone calibration | FR/le-vrai-cout | 1.5h |
| Y-5 | Re-source 28T/76% headline stat to primary | FR/agents-ia | 45 min |
| **K-1** | **Strip remaining KPMG strings** (genericize to "a recognised audit firm" / "Big Four-equivalent"; Acumum alone supports the Malta tax figure) | EN: cost-to-launch L576, do-crypto-mica L247/272, estonia-lux-malta L451/630/643, regulated-crypto-fund-manager-estonia L392 | 30 min |
| F-1 | Fix `/fr/` brand anchor → EN fund/services URL | EN/what-a-market-neutral | 5 min |
| T-1 | Trim title tag 88→≤60 chars | EN/estonia-lux-malta | 5 min |

### P1 — Cannibalization rewrites (this month)

| ID | Decision/Action | Pair | Effort |
|---|---|---|---|
| C-1 | **Merge-or-differentiate** white-label-platform (74) vs white-label-manager-services (81). Both target "white label crypto fund"; both even share the same CTA to the services page. Either hard-differentiate (platform = multi-cell shared infra/cells/sub-funds, strip the duplicated "AIFM provides X" sections) or 301 platform → services. | white-label pair | 4h merge / 6h differentiate |
| C-2 | **Differentiate** what-a-market-neutral (76) vs delta-neutral (85). Reposition market-neutral as the *fund/vehicle* view (governance, NAV, allocation role), demote mechanics to a link-out to delta-neutral; add reciprocal internal link (currently missing both ways). | neutral pair | 4h |

### P2 — Corpus-wide freshness + programmatic (batch)

| ID | Action | Scope | Effort |
|---|---|---|---|
| **FR-1** | **Quarterly review pass (CLAUDE.md Mode A, due Jul 2026)**: substantive editorial delta per article, then bump all 4 freshness surfaces (JSON-LD `dateModified` + `article:modified_time` + visible byline + sitemap `<lastmod>`). NOT a no-op refresh. Start with aif-vs-aifm (already content-edited 05-29 but `dateModified` never bumped — quick win). | All 29 | ~varies (human-in-loop) |
| CW-1 | Add FAQPage schema + 4-6 visible Q&A | 10 EN missing FAQ | ~30 min × 10 = 5h |
| CW-2 | Add ≥1 SVG visual (chart/diagram/payoff) | 16 EN + 6 FR (FR has 0 SVG) | ~45 min each |
| CW-3 | Replace generic `/meta-image.webp` OG with article-specific image | ~20 EN | ~15 min each |
| CW-4 | Correct schema `wordCount` to actual body length (under-declared corpus-wide, several off ~30-50%) | ~all | batch script |
| CW-5 | Self-host remaining Unsplash hotlinks | sub-threshold, aif-vs-aifm (EN) | 30 min each |

### P3 — Strategic (carryover, mostly resolved/standing)

| ID | Decision | Status |
|---|---|---|
| SD-1 | EN↔FR split-audience policy | **CLOSED** — formalized in `MD/CLAUDE.md` "Bilingual policy — dual-cluster strategy" |
| SD-2 | External reviewer/co-author for technical-strategy YMYL articles (delta-neutral, market-neutral, arbitrage) | Open — would lift E-E-A-T defensibility above operator-authority |
| SD-3 | Audio narration rollout policy (2/6 FR have it, 0/23 EN) | Open |
| SD-4 | Fact-check cadence for time-sensitive FR (le-vrai-cout, indicateurs, agents-ia, clarity-act) | **Elevated** — this audit shows FR decays 3× faster; tie to the quarterly cron |

---

## Freshness Signals

**Reference date:** 2026-06-21.

| Bucket (by `dateModified`) | EN | FR | vs Baseline |
|---|---|---|---|
| ≤ 30 days (within GEO window) | 0 | 0 | was 23 / 6 |
| 30–90 days | 23 | 6 | was 0 / 0 |
| 90–180 days | 0 | 0 | — |
| > 180 days | 0 | 0 | — |
| > 365 days | 0 | 0 | — |

**By `datePublished` (true age):** oldest = 2026-03-09 (delta-neutral, how-to-launch, regulated-crypto-fund-manager-estonia, white-label-manager-services) ≈ 104 days / 3.4 months. All published 2026-03-09 → 2026-05-11. **No article exceeds 12 months — or even 6 months — of true age.**

**The actionable finding is the 30-day GEO window, not deep decay.** All 29 `dateModified` values are frozen at the 2026-05-08 batch republish and are now 41–44 days old. Two compounding signals:

- **Fake-freshness risk (carryover):** the 2026-05-08 stamp was a one-shot batch sweep; bumping it again without a real content delta is exactly the pattern Google's Dec-2025 Core Update penalizes. The CLAUDE.md Mode A cadence (real review + 4-surface bump) is the correct vehicle — do not script a bare `dateModified` rewrite.
- **Governance miss:** `aif-vs-aifm` was genuinely content-edited 2026-05-29 (KPMG removal) but its `dateModified` still reads 2026-05-08 — the project's own "bump all 4 surfaces" rule was not followed. It should now read ≥ 2026-05-29.
- **FR time-sensitivity:** clarity-act ("markup semaine du 11 mai", "cible 4 juillet 2026", Polymarket 46%→64%), le-vrai-cout (Feb-2026 Iran event), indicateurs (dated OI/IBIT figures), agents-ia (Q1-2026 volumes) all assert live-calendar/market facts that are now 6 weeks overtaken. These 4 should lead the next review and get a dated "as-of" status box.

---

## EN↔FR Parity Analysis

**Finding unchanged: zero direct parity, zero shared topic — and it is now a documented, intentional strategy (not a gap).**

- **EN cluster** (`/blog/`, 23 articles) = regulated-AIFM mechanics, MiCA/AIFMD/Estonian compliance, fund-launch buyer journey — institutional B2B.
- **FR cluster** (`/fr/blog/`, 6 articles) = crypto market commentary, options strategies, on-chain indicators, US regulatory news — French HNW / Cointips cross-promo audience.

Every EN article has **no** FR equivalent and vice versa. `MD/CLAUDE.md` now formalizes this as the "**Bilingual policy — dual-cluster strategy**": no mirror translations, blog articles are self-canonical with no `hreflang` cross-link, only `/`↔`/fr/` and the blog index pages carry full EN/FR alternates. The future-content rule is explicit: if full parity is ever needed for one article, both versions ship simultaneously with reciprocal `hreflang` — never single-language-then-backfill.

**Conclusion: baseline SD-1 is CLOSED.** The split is documented and editorially defensible. No `hreflang` penalty applies (asymmetric self-canonical is ignored, not penalized). One minor cross-cluster hygiene item: the FR articles (clarity-act, strc) and EN/what-a-market-neutral link *across* clusters (FR→`/blog/*`, EN→`/fr/`) — prefer same-locale targets where they exist (F-1 above).

---

## Cannibalization

| Pair | Scores | Recommendation |
|---|---|---|
| white-label-crypto-fund-platform (74) vs white-label-crypto-fund-manager-services (81) | gap 7 | **Hardest overlap.** Both target "white label crypto fund"; both share the same CTA to the services page; "platform" asserts a tech/infra angle in its intro but the body drifts into the services article's "AIFM provides X / manager retains Y" territory. **Merge (301 → services) OR hard-differentiate** (platform = multi-cell shared infrastructure/cells/sub-funds only). (C-1) |
| what-a-market-neutral-crypto-fund-does (76) vs delta-neutral-crypto-strategies-explained (85) | gap 9 | **Differentiate.** delta-neutral owns the mechanical/definitional query (FAQ, delta-vs-beta, BTC drawdowns) and even uses "market neutral" ×29. Reposition market-neutral as the *vehicle/fund* view; add the reciprocal internal link (missing both ways). (C-2) |
| aif-vs-aifm-crypto-explained (90) vs what-is-a-crypto-aifm (85) | gap 5 | **Light differentiation, partially mitigated.** what-is-crypto-aifm now links out to aif-vs-aifm ("Related reading") and keeps to the manager role, but two sections still re-explain AIF-vs-manager territory. Tighten the explainer to defer entity-distinction fully to aif-vs-aifm. Monitor SERP overlap. |

No new cannibalization pairs detected this cycle.

---

## YMYL E-E-A-T Critical Review

**Trust floor met across all 29 articles** (verified by grep, 29/29):
- Named author + Person schema (`@id` person-alexandre-vinal) + visible byline ✓
- Body-level disclaimer ("not investment advice" / "ne constitue pas un conseil") ✓
- Footer Finantsinspektsioon URL + LEI `8945003BBN0RVNNB0S84` ✓
- "Qualified/professional investors only" framing ✓

**Auditor (KPMG) signal — now in deliberate removal.** Policy started 2026-05-29 (commit `d6269b1`). KPMG is **not** a footer-universal signal (the baseline's "23/23 footer" claim conflated it with Finantsinspektsioon/LEI — KPMG only ever lived in ~5 article bodies). Trust floor does **not** depend on it. But the removal is incomplete (4 EN articles still name KPMG visibly) → K-1.

**Specific YMYL concerns (5 articles):**

| # | Article | Concern | Severity |
|---|---|---|---|
| 1 | FR/strc | "Ponzi" in crawlable H3 on named SEC issuer (softened, not closed) | **HIGH — legal** |
| 2 | FR/strategies-options | Internal stat contradiction (JHEQX −8,06% vs −5,8%) on the headline figure | MEDIUM — factual |
| 3 | EN/crypto-fund-for-qualified-investors | Visible "2025" publish date (wrong year) | MEDIUM — credibility |
| 4 | FR/le-vrai-cout | Load-bearing 2026 macro on Tier-3/4 secondary, no primary; emotive framing next to disclaimer | MEDIUM — sourcing |
| 5 | FR/agents-ia | 28T/76% headline stat on Cryptonews.net (T3) + MEXC (T4) | MEDIUM — sourcing |
| — | FR/indicateurs | OI-ATH 45 Md$ on CoinReporter (T4); liq $19B on Amberdata (T3) — CFTC COT named in-text but not linked | LOW-MED — sourcing |
| — | EN/crypto-arbitrage | Zero EU-regulator inline cite on a risk-thesis page | LOW-MED — sourcing |
| — | EN (operator authority) | Author credentials are operator/founder, not CFA/CAIA — defensible under regulated-AIFM context; co-author would lift defense (SD-2) | LOW |

---

## Methodology / Limitations

- **No web fetching** — scores are file-content only. Source liveness and stat drift were NOT verified online; run `/blog factcheck` on the 5 flagged YMYL articles (strc, strategies-options, le-vrai-cout, agents-ia, indicateurs).
- **Word counts** are markup-stripped proxies (include some nav/footer/schema text), ±10%. Schema `wordCount` under-declaration was flagged independently by 5/8 agents and is a real corpus-wide signal defect (CW-4).
- **Score deltas vs baseline** partly reflect tighter re-scrutiny (metadata drift, sourcing tiers, AI-cadence tics caught this pass) on top of the genuine 44-day freshness drag — not all of the −1.6 is content decay. The 3 NEW factual defects (qualified-investors date, strategies-options stat, market-neutral anchor) were grep-confirmed and are unambiguous.
- **Hub `index.html`** (EN + FR) and `fr/blog/repurposed/` (6 social/LinkedIn/Discord/YouTube derivatives) excluded by scope.
- **No GSC/GA4 pulled** — to see whether low-scoring articles also under-perform in impressions/clicks, run `/blog google search-console` (switch claude-seo to `sci` first).

---

## Suggested Next Steps

1. **Today:** L-1 (strc Ponzi reframe, 30 min) — highest legal exposure. Y-2 (qualified-investors 2025→2026, 5 min). F-1 + T-1 (anchor + title, 10 min).
2. **This week:** Y-1 (strategies-options stat + hotlink), Y-3/Y-4/Y-5 (YMYL sourcing), K-1 (KPMG scrub of 4 EN articles, 30 min).
3. **This month:** C-1/C-2 cannibalization decisions; CW-1 FAQ batch on 10 EN articles.
4. **Quarterly (Jul 2026, due now):** FR-1 — real review pass + 4-surface freshness bump per CLAUDE.md Mode A. Lead with the 4 time-sensitive FR articles + aif-vs-aifm (dateModified governance miss).
5. **Next re-audit:** 2026-09-21 (90-day). Watchdog if `dateModified` drifts > 90 days on any 90+ flagship.

---

## Report references

- This re-audit: `MD/content/blog-audit-2026-06-21.md`
- Previous content audit: `MD/content/blog-audit-2026-05-16.md` (baseline)
- Source articles: `blog/` (23 EN) + `fr/blog/` (6 FR)
- Bilingual policy of record: `MD/CLAUDE.md` → "Internationalization" / "Bilingual policy — dual-cluster strategy"
- Freshness cadence of record: `MD/CLAUDE.md` → "dateModified review cadence — Mode A (quarterly)" + `~/cron-prompts/sci/quarterly-content-review.md`
- Adjacent: `/blog factcheck <file>` for the 5 flagged YMYL articles

---

## Telegram Summary

```
📊 BLOG AUDIT sci/sparkcore.fund — 2026-06-21 (re-audit vs 05-16)
Moyennes : EN 84.3 ▼0.7 · FR 82.5 ▼4.7 · Corpus 83.9 ▼1.6
0 art <70 · 0 art >12 mois

⚠️ #1 FRESHNESS : corpus figé au 2026-05-08 (41-44j)
→ 0/29 dans la fenêtre GEO 30j (était 29/29).
Revue trimestrielle Mode A (juil.) = due maintenant.

🔴 YMYL critiques :
• strc (FR 84 ▼7) — "Ponzi" tjs dans un H3 crawlable
  sur émetteur coté MSTR → P0 reformuler le titre
• strategies-options (FR 80) — contradiction JHEQX
  −8,06% vs −5,8% + hotlink Unsplash
• qualified-investors (EN 78) — byline "2025" (mauvaise année)
• le-vrai-cout / agents-ia (FR) — stats vedettes Tier-3

🧹 KPMG : retrait entamé 05-29 mais incomplet → 4 art EN

TOP 5 rewrite : strc · strategies-options · qualified-investors
· crypto-arbitrage · le-vrai-cout

Parité EN↔FR : 0 (dual-cluster volontaire, SD-1 clôs)
Cannibalisation : white-label & market/delta-neutral (inchangé)

📄 MD/content/blog-audit-2026-06-21.md
```
