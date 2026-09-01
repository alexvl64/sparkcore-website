> **Copie d'archive** — prompt cron de claude-vps-01 (`~/cron-prompts/sci/seo-monthly-sci.md`), cron pausé depuis 2026-06-21. Transféré lors du handover du site vers le VPS SparkCore (2026-09-01).

/seo audit https://sparkcore.fund

CRITIQUE — persistance MD obligatoire :
- Crée le dossier `MD/seo/audit-$(date +%Y-%m-%d)/` dans le repo sci (cwd)
- Écris au minimum 3 fichiers : `FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`, et un sous-dossier `data/` avec les JSON bruts si pertinent
- Baseline à comparer : `MD/seo/audit-2026-05-06/FULL-AUDIT-REPORT.md` (score 66/100, projeté 88-92 post Sprint 1 mergé 05-06/05-07)
- Contexte YMYL crypto fund Estonie : E-E-A-T critique (auteurs, mentions Finantsinspektsioon, KPMG audit, LEI), pas d'ads connectés (SEO uniquement)
- Si checkpoint 30j (`MD/seo/audit-2026-06-05/CHECKPOINT-30DAY.md`) existe, intègre-le comme bridge baseline → audit du jour
- Termine la sortie par un bloc fencé `===TG===` … `===END===` (≤6 lignes, seul ce qui est entre les marqueurs est envoyé) compressant : score global + delta vs baseline 66, top finding, chemin du rapport MD (`📝`).
- Si analyse incomplète, écris squelette MD avec ce que tu as + flag `[INCOMPLET]` en tête de `FULL-AUDIT-REPORT.md`
