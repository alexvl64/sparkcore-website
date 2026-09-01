> **Copie d'archive** — prompt cron de claude-vps-01 (`~/cron-prompts/sci/quarterly-content-review-sci.md`), cron pausé depuis 2026-06-21. Transféré lors du handover du site vers le VPS SparkCore (2026-09-01).

# Quarterly content review — SparkCore

## Context

Quarterly editorial review of all indexable articles on sparkcore.fund. The goal is to detect content that has gone stale and to recommend specific edits — NOT to auto-edit YMYL content.

## Project

You are operating in `/home/alex/Documents/Claude/github-projets/sci/`. This is the SparkCore.fund codebase: bilingual EN/FR static HTML site, regulated AIFM in Estonia, YMYL financial. The site has 24 indexable articles + 1 pillar at `/resources/regulated-crypto-fund-estonia/`.

The audit baseline is at `MD/seo/audit-2026-05-08/`. The quarterly review cadence is documented in `MD/CLAUDE.md` section "dateModified review cadence — Mode A (quarterly)".

## Task

Produce a **triage report** of articles that need editorial refreshes. For each article, output:

1. **Article URL + slug**
2. **Current `dateModified`** (from JSON-LD)
3. **Days since last review**
4. **Staleness signals detected** — specific concrete reasons, not generic. Examples of what to flag:
   - Regulation references that have been superseded since the article's `dateModified` (look for AIFMD, MiCA, VASP, FATF, EU directives, FSA/Finantsinspektsioon publications)
   - Statistics or market data referenced as "as of YYYY" where YYYY is now > 12 months old
   - Forward-looking deadlines that have now passed (e.g., the article says "transposition deadline 16 April 2026" and today is past that date — needs to update to retrospective framing)
   - Broken external links (do a HEAD request on each external link, flag 4xx/5xx)
   - Sources older than 18 months that have likely newer versions (PwC tax summaries, CSSF AUM data, Tracxn counts, etc.)
   - Counts/figures cited from a named registry that may have updated (Estonian VASP count, FIU register, etc.)
4. **Refresh priority**: Critical / High / Medium / Low / None
5. **Suggested edit (1-2 sentences)** — what specifically to change

## Sources to check freshness against

- AIFMD II transposition status — has Estonia transposed by deadline? https://www.fi.ee/
- MiCA implementing acts published since article last reviewed
- VASP/CASP register updates — https://fiu.ee/ , https://www.fi.ee/
- ESMA Q&As updated quarterly
- CSSF AUM data — https://www.cssf.lu/en/publications-statistics/
- Estonian e-Residency stats — annual updates
- Tax Foundation Tax Competitiveness Index — annual

For the Estonian regulator, also check https://www.fi.ee/en/news for any announcements affecting fund management.

## Output

Write the report to `/home/alex/reports/sci-quarterly-content-review-YYYY-MM-DD.md` (replace YYYY-MM-DD with today's date). Format:

```markdown
# SparkCore content review — quarterly — YYYY-MM-DD

## Summary
- Total articles reviewed: N
- Articles needing refresh: M
  - Critical: X
  - High: Y
  - Medium: Z
  - Low: W
- Average days since last review: N

## Critical priority (do this week)

### /blog/<slug>
- dateModified: YYYY-MM-DD (Z days ago)
- Staleness signals:
  - [specific signal 1]
  - [specific signal 2]
- Suggested edit: [1-2 sentences]

[repeat per article]

## High priority (do this month)
[same format]

## Medium priority (do this quarter)
[same format]

## Low priority / no action needed

[bullet list of slugs with "no staleness signals detected"]
```

## Constraints

- Do NOT auto-edit any article content. Triage only.
- Do NOT auto-bump `dateModified` for articles you didn't actually modify — that defeats the purpose of the freshness signal.
- If you cannot fetch an external URL after 2 retries, flag it but don't block the review.
- Report should be < 4000 words total. Use brevity per article.
- If 0 articles need refresh, that's a valid output — say so explicitly with confidence ("All 24 articles current as of <date>") rather than padding.

## Reference

- Audit baseline: `MD/seo/audit-2026-05-08/`
- Article inventory: `sitemap.xml`
- Project conventions: `MD/CLAUDE.md`
