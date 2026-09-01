> **Copie d'archive** — prompt cron de claude-vps-01 (`~/cron-prompts/sci/blog-monthly-sci.md`), cron pausé depuis 2026-06-21. Transféré lors du handover du site vers le VPS SparkCore (2026-09-01).

/blog audit ~/Documents/Claude/github-projets/sci/blog/

ATTENTION : audit aussi les articles FR via `/blog audit ~/Documents/Claude/github-projets/sci/fr/blog/` (deux dossiers séparés EN + FR).

CRITIQUE — persistance MD obligatoire :
- Crée `MD/content/blog-audit-$(date +%Y-%m-%d).md` dans le repo sci (cwd)
- Inclure : score moyen EN + FR séparé, distribution scores par article, top 5 articles à rewriter (priorité YMYL crypto fund — E-E-A-T crypto/financial signals), action queue priorisée, freshness signals (articles >12 mois), parité EN↔FR (articles EN sans pendant FR ou vice versa)
- Contexte : ~22 articles EN dans `blog/`, ~6 articles FR dans `fr/blog/` au baseline 2026-05-07. Sprint 1 SEO a flippé 3 articles `noindex → index` le 2026-05-07 (cost-to-launch, fees-2026, eresidency).
- Termine la sortie par un bloc fencé `===TG===` … `===END===` (≤6 lignes, seul ce qui est entre les marqueurs est envoyé) compressant : score moyen EN+FR, articles critiques, gaps EN↔FR, chemin du rapport MD (`📝`).
- Si analyse incomplète, écris squelette MD avec ce que tu as + flag `[INCOMPLET]` en tête
