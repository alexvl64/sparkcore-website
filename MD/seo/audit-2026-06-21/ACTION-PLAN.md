# SparkCore — SEO Action Plan (audit 2026-06-21)

**Source audit:** [`FULL-AUDIT-REPORT.md`](FULL-AUDIT-REPORT.md) — score **79/100 (B−)**, +13 vs baseline 66, +2 vs checkpoint 77.
**Context:** YMYL regulated AIFM, static HTML on Cloudflare Pages, bilingual EN/FR dual-cluster, **no paid ads**. Workflow: feature branch → PR → `main` auto-deploys (~30–60 s).

Each item carries: **Why** (first-principle observation it rests on) · **How** · **Depends on** · **Falsifiable** (how we'd know it failed) · **Leading indicator** (monitor without re-auditing) · **Effort**.

---

## Recommended sequencing

**The single highest-leverage chain is Performance — it is the only category below 70 and the entire drag on the global score.**

1. **Sprint A — Mobile CWV (this week).** Hero CLS fix (C-1) → LCP investigation (H-1). One PR can ship C-1; H-1 needs an investigation step first. Target: Performance 57 → 72+, global 79 → ~80–81.
2. **Sprint B — July quarterly review (on/just after 1 July).** One editorial pass that resolves the VASP accuracy CRITICAL (C-2), the freshness-drift HIGH (H-2), the `why-invest` retitle (H-3), llms.txt + KPMG (M-3/M-4), FAQ expansion (M-7), and `speakable` (L-5) together. This is the natural batch — do not scatter these.
3. **Sprint C — Entity + GEO precision (anytime, low-risk).** foundingDate (M-1), pillar Person fix (M-2), factsheet Org `@id` (M-5), homepage FinancialProduct (M-6), the two GEO Quick-Answer/explainer plays (H-4, M-8). Tightens the entity graph against the "*core" brand-confusion noise.
4. **Backlog — LOW items**, batched into whichever PR touches the relevant file.

---

## CRITICAL

### C-1 · Fix the hero CLS pattern (repo-wide)
- **What:** Content pages shift catastrophically — pillar CLS **0.475**, article CLS **1.061** (threshold <0.1).
- **Why:** The hero `<img>` declares `width="1260" height="750"` (ratio 1.68) while the Unsplash file is served `w=1200&h=630` (ratio 1.90); `class="w-full max-h-[420px] object-cover"` prevents the browser from reserving the correct box → a 0.372 single shift, compounded by the consent-banner image and web-font swap. It is the shared md-to-html hero pattern, so ~25 content pages are affected.
- **How:** (a) Set the declared `width`/`height` to the **served** ratio (`width="1200" height="630"`). (b) Add `h-auto` so `w-full` preserves aspect-ratio cleanly. (c) Replace `max-h-[420px] object-cover` with an aspect-ratio wrapper, e.g. wrap in `<figure class="... aspect-[1200/630]">` and let the img be `w-full h-full object-cover`, so the box is reserved pre-load. (d) Give the consent-banner inner `<img>` explicit dimensions. (e) Update the md-to-html convention in `MD/CLAUDE.md` so new articles inherit the fix. Script the bulk edit across `blog/*.html`, `fr/blog/*.html`, `resources/*/index.html`.
- **Depends on:** nothing. Ship first.
- **Falsifiable:** re-run `pagespeed_check.py <article> --strategy mobile` → CLS must drop below **0.1** on pillar + a sampled article. If CLS stays >0.25, the wrapper isn't reserving the box (revisit the Tailwind `aspect-[]` arbitrary value / `object-cover` interaction).
- **Leading indicator:** PSI mobile CLS on any one article; later, CrUX CLS "good" share *if* field data ever populates.
- **Effort:** ~45 min (incl. bulk script + spot-check 3 pages).

### C-2 · VASP sunset accuracy pass (time-boxed: on/after 1 July 2026)
- **What:** **8 pages** describe the Estonian VASP sunset of **1 July 2026** in the future tense; `dateModified` is frozen at `2026-05-08`. After July 1 these become silently false YMYL regulatory statements.
- **Why:** Google's Sept-2025 QRG treats regulatory inaccuracy on financial pages as a *trust* failure, not a minor content issue — and the failure lands exactly when the predicted event occurs.
- **How:** On or just after 1 July: change tense ("After 1 July 2026…" → "Since 1 July 2026…"), add a one-line "status confirmed" note, and bump **all 4 freshness surfaces** per `MD/CLAUDE.md` (JSON-LD `dateModified`, OG `article:modified_time`, visible "Last reviewed" byline, sitemap `<lastmod>`). Also sweep the AIFMD II (16 Apr 2026, already past) and FR CLARITY Act "4 July signature target" claims in the same pass.
- **Depends on:** the calendar (do not pre-date). Fold into Sprint B.
- **Falsifiable:** grep the 8 files for future-tense "1 July 2026" → must be 0 after the pass; `dateModified` must read the review date on every touched page.
- **Leading indicator:** GSC position on "estonia vasp 2026 / aifm transition" queries post-update; absence of manual-action / quality flags.
- **Effort:** ~2–3 h (real review, not a stamp).

---

## HIGH

### H-1 · Identify & fix the homepage mobile LCP element
- **What:** Home EN/FR mobile LCP **10.6 / 11.0 s** (desktop 1.0 s). FCP 1.7 s, TBT 20 ms, render-blocking eliminated — so the bottleneck is the LCP element's own timing, not infra.
- **Why:** With render-blocking and main-thread already solved, an 8 s FCP→LCP gap means the element that *is* the LCP paints late on throttled mobile — usually a large/late-bound image or a composite hero element. You cannot fix what you haven't identified.
- **How:** Run Chrome DevTools (mobile throttle) **Performance → LCP** on `/` to name the element. Likely candidates: `hero-graph-img.webp` (not preloaded) vs the already-preloaded `hero-image.webp`, or a CSS-bound hero composite. Then: ensure the *actual* LCP element is the preloaded one (move `fetchpriority="high"` / `<link rel=preload as=image imagesrcset>` to it), serve a smaller mobile variant, and avoid lazy-loading anything above the fold.
- **Depends on:** the DevTools identification step (don't guess the fix).
- **Falsifiable:** PSI mobile LCP on `/` must drop below **2.5 s** (good) or at least <4 s. If LCP stays >6 s after prioritising the named element, the element is CSS/JS-gated — escalate to render-path analysis.
- **Leading indicator:** PSI mobile LCP on `/`; mobile perf score (currently 69).
- **Effort:** ~1–2 h (investigation + fix).

### H-2 · Run the July quarterly YMYL review (clears the freshness drift)
- **What:** `dateModified` frozen ~44 days on every article; the April pass was bundled into the May launch, so dated content is one cycle behind.
- **Why:** YMYL content decays; a single batch stamp with no subsequent deltas reads as unmaintained, and Google penalises "fake refresh" (date bump with no content change) — so the review must carry a real editorial delta per page.
- **How:** Execute the cron-driven triage (`~/cron-prompts/sci/quarterly-content-review.md`), then a human pass: one substantive change per touched article (new stat/source/regulation note), bump all 4 surfaces. Batch C-2, H-3, M-3/4, M-7, L-5 into this pass.
- **Depends on:** ideally after C-2 (same review window).
- **Falsifiable:** ≥80% of indexable articles show a `dateModified` ≥ review date with a non-trivial content diff in git; sitemap `<lastmod>` matches.
- **Leading indicator:** GSC "Last crawled" recency on refreshed URLs; impressions trend on refreshed pages.
- **Effort:** ~1 day (batched).

### H-3 · Retitle `why-invest-in-crypto-funds-2026` (CTR collapse)
- **What:** 877 impressions / **0 clicks** over 28 d. Title "Why Invest in Crypto Funds? 7 Best Reasons for 2026" reads as consumer listicle to an institutional audience.
- **Why:** Title is the dominant SERP click-decision input; a format mismatch with the searcher's intent suppresses CTR regardless of ranking. Emblematic of the cluster-wide impressions-without-clicks pattern.
- **How:** Retitle to audience-accurate, e.g. *"Why Institutional Investors Allocate to Crypto Funds: 7 Evidence-Based Arguments"*; rewrite meta to lead with governance (audited NAV, AIFMD depositary, MiCA) over the raw statistic. Apply the same lens to other 0-click / high-impression cluster pages.
- **Depends on:** nothing; fold into Sprint B.
- **Falsifiable:** CTR on the page's main query moves off 0% within ~21 d of recrawl. If impressions hold but CTR stays ~0, intent is genuinely informational/AI-Overview — pivot that page to GEO/citation (H-4 pattern).
- **Leading indicator:** GSC page-level CTR (28-d rolling) for this URL.
- **Effort:** ~20 min/page.

### H-4 · AIFMD Article 3 threshold Quick Answer box (GEO capture)
- **What:** "eur-lex … article 3 thresholds 100/500m" ranks pos 7–9 with ~0 CTR across many query variants — the firm ranks but isn't the cited source.
- **Why:** These are AI-Overview-style queries; the win is being the *cited passage*, which requires a self-contained, source-attributed answer block, not a buried body paragraph.
- **How:** Add a Quick Answer box after the relevant H2 in `aif-vs-aifm`: ~47 words stating the €100M (leveraged) / €500M (unleveraged, 5-yr lock) sub-threshold rule, citing "EUR-Lex, AIFMD consolidated text, Directive 2011/61/EU Art. 3(2)". Mirror verbatim in FAQPage JSON-LD.
- **Depends on:** nothing; pairs naturally with Sprint C.
- **Falsifiable:** the article's position on the threshold query set improves toward page-1-top and/or it begins appearing as the AI-Overview source within ~30–60 d. If position/impressions don't move, the passage isn't being selected — tighten wording to match the query phrasing.
- **Leading indicator:** GSC impressions/position on the "article 3 thresholds" query cluster.
- **Effort:** ~30 min.

---

## MEDIUM

### M-1 · Add `foundingDate` to Organization JSON-LD
- **Why:** Key E-E-A-T/entity signal for a YMYL financial entity; the checkpoint wrongly assumed it existed (it does not — 0 occurrences repo-wide).
- **How:** Confirm the incorporation date from ariregister.rik.ee (company 16265864), add `"foundingDate":"YYYY-MM-DD"` to the `#organization` node on `/` and `/fr/`. Cascade to factsheets once M-5 lands.
- **Falsifiable:** Rich Results Test parses `foundingDate`; grep > 0. **Leading indicator:** Knowledge-panel completeness over time. **Effort:** 10 min.

### M-2 · Fix the pillar standalone Person block
- **Why:** A second `Person` with no `@id`, an inconsistent `jobTitle` ("Founder & AIFM…"), and an inline `worksFor` fragments the entity graph — two Alexandre VINAL nodes instead of one.
- **How:** Replace with a block referencing `#person-alexandre-vinal`, canonical `jobTitle` ("Founder & Managing Partner, SparkCore Fund Management"), and `worksFor:{"@id":".../#organization"}` (clean block in `data/schema.md` §12).
- **Falsifiable:** only one Person `@id` resolves across the pillar; jobTitle matches sitewide. **Leading indicator:** consistency on next schema drift. **Effort:** 10 min.

### M-3 · Refresh `llms.txt`
- **Why:** 46 days stale, missing the best-converting CLARITY Act article; the "Last updated" line is an explicit staleness signal to AI crawlers.
- **How:** Bump the date, add content shipped since May 6, confirm the 3-fund roster (incl. Equinoxe). **Falsifiable:** date current, new URLs listed. **Leading indicator:** AI-crawler hits in logs. **Effort:** 15 min. Batch into Sprint B.

### M-4 · Name KPMG explicitly (replace "Big Four firm")
- **Why:** A verifiable named auditor is a materially stronger trust signal than an unnamed tier; "Big Four" appears 3× on the homepage + 2× in llms.txt, 0× named.
- **How:** Replace on the homepage trust strip, llms.txt, and author bios — **only if** the engagement doesn't contractually restrict public client identification (verify first). **Falsifiable:** "KPMG Estonia" present, "Big Four" absent. **Leading indicator:** n/a (trust signal). **Effort:** 10 min.

### M-5 · Replace stripped factsheet Organization with `@id` reference
- **Why:** Factsheets re-declare Organization without LEI/founder/sameAs → AI crawlers (which ignore noindex) read an entity that contradicts the homepage.
- **How:** Swap the inline Org for `{"@id":"https://sparkcore.fund/#organization"}` (the pattern articles already use for `publisher`). **Falsifiable:** factsheet JSON-LD references the canonical Org `@id`; no divergent inline Org remains. **Effort:** 10 min.

### M-6 · Add homepage FinancialProduct schema for the 3 funds
- **Why:** Three funds are visible (cards + FAQ copy) but unrepresented in the *indexable* homepage graph (FinancialProduct lives only on noindex factsheets).
- **How:** Add a homepage JSON-LD block: 3 `FinancialProduct` nodes (Dynamic Trends, CryptoVision, Equinoxe) with `provider:{"@id":".../#organization"}`. Keep Equinoxe flagged as planned-2026. **Falsifiable:** Rich Results Test parses 3 products; consistent with factsheet data. **Leading indicator:** fund-name AI answers citing sparkcore.fund. **Effort:** 30 min.

### M-7 · Extend FAQ answers to 85–100 words
- **Why:** ~50-word answers are borderline for verbatim AI extraction; richer self-contained answers are cited more.
- **How:** Expand AIFMD II + "Estonia viable post-MiCA" answers with concrete figures (e.g. €27k vs €125k); keep HTML and JSON-LD identical. **Falsifiable:** answer length ≥85 words, HTML==JSON-LD. **Effort:** ~2 h. Batch into Sprint B.

### M-8 · Create an EN "CLARITY Act — key 2026 dates" explainer
- **Why:** "clarity act date 2026" ranks pos 4.4 but the only serving page is the **FR** article — wrong language for EN queries.
- **How:** 600–800-word EN explainer with a 50-word Quick Answer (US scope, current status, EU/MiCA non-applicability), self-canonical, EN cluster. **Falsifiable:** new URL indexed and serving for the EN query within ~30 d. **Leading indicator:** GSC impressions on "clarity act" EN queries attributed to the new URL. **Effort:** ~2–3 h.

### M-9 · Add self-hreflang to FR articles
- **Why:** FR articles carry zero hreflang (sitemap + HTML) — Google infers language only from `lang="fr"` + path, risking FR-SERP mis-assignment.
- **How:** Add `hreflang="fr"` + `hreflang="x-default"` → self (the 2-tag pattern EN articles use), in HTML heads and sitemap `<xhtml:link>`. **Falsifiable:** each FR article exposes 2 self-hreflang tags in both surfaces. **Leading indicator:** GSC FR-query impressions for `/fr/blog/*`. **Effort:** ~30 min.

### M-10 · Trim the pillar meta description to ≤155 chars
- **Why:** 206 chars truncates in SERP (~160), losing signal on a flagship page. **How:** Rewrite ≤155, retain AIFMD / sub-threshold / MiCA terms. **Falsifiable:** length ≤155. **Effort:** 10 min.

---

## LOW (batch into whichever PR touches the file)

- **L-1 · Sitemap `<lastmod>` refresh** — 33/35 stale at 2026-05-08; bump on changed pages. *Falsifiable:* changed pages show current lastmod.
- **L-2 · Privacy-policy hreflang** — sitemap declares en/x-default, HTML omits; add 2 `<link rel=alternate>` tags. *Falsifiable:* HTML == sitemap.
- **L-3 · Pillar Article `@id` trailing slash** — `…estonia#article` → `…estonia/#article`. *Falsifiable:* `@id` matches canonical.
- **L-4 · robots.txt — name newer AI crawlers** (`anthropic-ai`, `Bytespider`, `Applebot-Extended`, `cohere-ai`, `meta-externalagent`) with the explicit Allow + gated-Disallow stanza. *Falsifiable:* each has a named stanza.
- **L-5 · `speakable` schema on articles** — pillar has it, articles don't; 3-line JSON-LD addition each. Batch into Sprint B. *Falsifiable:* every BlogPosting carries `speakable`.
- **L-6 · Cointips → SparkCore entity bridge** — one YouTube video description / community post naming "SparkCore Fund Management (sparkcore.fund)". Highest-ROI brand action. *Falsifiable:* the cross-platform mention exists and is crawlable.

---

## Success criteria for the next checkpoint (~J+30, 2026-07-21)

| Metric | Now | Target |
|---|---|---|
| Global score | 79 | ≥ 83 |
| Performance (mobile CWV) | 57 | ≥ 72 |
| Content-page mobile CLS | 0.475 / 1.061 | < 0.1 |
| Home mobile LCP | 10.6 s | < 4 s (ideally < 2.5) |
| VASP future-tense pages | 8 | 0 |
| Articles with current `dateModified` | ~0% | ≥ 80% |
| `foundingDate` in Org schema | absent | present (EN+FR) |

> The score gate is achievable **from Performance alone** (C-1 + H-1 ≈ +3–4 global). Everything else compounds E-E-A-T, entity precision, and AI-citation capture — the right long-game for a visibility-rich, traffic-thin YMYL site.
