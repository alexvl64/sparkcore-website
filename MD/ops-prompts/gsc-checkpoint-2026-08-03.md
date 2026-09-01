> **Copie d'archive** — prompt cron de claude-vps-01 (`~/cron-prompts/sci/gsc-checkpoint-2026-08-03.md`), cron pausé depuis 2026-06-21. Transféré lors du handover du site vers le VPS SparkCore (2026-09-01).

# Checkpoint GSC J+90 — sparkcore.fund full re-audit (à exécuter le 2026-08-03 09:00)

Tu es Claude Code en mode headless sur le VPS `claude-vps-01`. Tu fais un **re-audit complet GSC** 90j après le travail de fond du 2026-05-05 (refonte indexation, redirects, noindex factsheets, Indexing API push, GA4 events). Le wrapper t'a placé dans `~/Documents/Claude/github-projets/sci` avec `claude-seo` switché sur `sci`.

## Baseline 2026-05-05 (à comparer)

| Catégorie GSC | Volume |
|---|---|
| Indexed (sitemap) | 14/28 |
| Discovered/Crawled - not indexed | 14 |
| Bloquée par robots.txt | 5 (3 intentionnel + 2 PDFs deindex en cours) |
| Page avec redirection | 5 (toutes correctes) |
| Introuvable 404 | 3 (fixées via 301 le 2026-05-05) |
| Autre canonique correct | 3 (toutes correctes) |
| Indexée malgré blocage robots | 3 PDFs warning |

Stack tracking GA4 : 6 Key Events (factsheet_request_open, contact_form_submit, cal_booking_complete, discovery_call_view, factsheet_view_cryptovision, factsheet_view_dynamic_trends). Trafic baseline : 2 sessions / 28j.

## Tâches

### 1. Stats GSC Search Analytics — évolution clicks/impressions

```bash
python3 ~/.claude/skills/seo/scripts/gsc_query.py query \
  --property "sc-domain:sparkcore.fund" \
  --days 90 --limit 30
```

Compare aux 28j de baseline (clicks 11, imp 444, CTR 2.48%) :
- 90j vs 28j × 3 → projection si trafic stable
- Quick wins identifiés (position 5-10 avec impressions > 50)

### 2. Stats GA4 — évolution sessions et engagement

```bash
python3 ~/.claude/skills/seo/scripts/ga4_report.py --property properties/530665322 --days 90
```

Compare aux 28j baseline (2 sessions / 2 users). Cible minimale pour évaluer les Key Events : 30+ sessions/mois.

### 3. Re-batch URL Inspection sur le sitemap

```bash
cd ~/Documents/Claude/github-projets/sci
grep -oE '<loc>[^<]+</loc>' sitemap.xml | sed 's/<[^>]*>//g' > /tmp/sci_urls_t90.txt
python3 ~/.claude/skills/seo/scripts/gsc_inspect.py \
  --batch /tmp/sci_urls_t90.txt \
  --site-url "sc-domain:sparkcore.fund" \
  --delay 1.5 --json > /tmp/sci_inspect_t90.json
```

Tally par verdict + coverage (script Python pour parser le JSON).

Attendu :
- Indexed (sitemap) : > 24/28 (idéalement 28/28)
- Discovered/Crawled - not indexed : < 5
- Si stagnation < 20/28, escalader : "trust YMYL ne progresse pas, plan d'amélioration E-E-A-T requis"

### 4. Vérification fixes du 2026-05-05 — non-régression

Tous les 4 fixes doivent toujours être actifs :

```bash
# 4 redirects 301
for url in \
  "https://sparkcore.fund/en/" \
  "https://sparkcore.fund/blog/estonian-aifm-crypto-fund" \
  "https://sparkcore.fund/blog/how-white-label-funds-launch-in-crypto" \
  "https://sparkcore.fund/blog/low-volatility-crypto-strategy"; do
  echo "$url → $(curl -sS -o /dev/null -w '%{http_code}' "$url")"
done

# noindex factsheets + discovery-call (HTTP + meta)
for url in \
  "https://sparkcore.fund/factsheets/cryptovision" \
  "https://sparkcore.fund/factsheets/dynamic-trends" \
  "https://sparkcore.fund/discovery-call"; do
  echo "=== $url ==="
  curl -sS -I "$url" | grep -i "x-robots"
  curl -sS "$url" | grep '<meta name="robots"' | head -1
done

# IndexNow key file still served
curl -sS -I "https://sparkcore.fund/27994a06b868d24820429dc36c1bafee.txt" | grep -i "HTTP\|content-type"

# X-Robots-Tag PDFs intact
curl -sS -I "https://sparkcore.fund/ressources/contrats/lpa_cv_fr.pdf" | grep -i "x-robots"
```

### 5. PDFs warning — confirm deindexed

```bash
for pdf in factsheet_dynamic_trends_fr.pdf deck_fr.pdf factsheet_cryptovision_fr.pdf deck_cryptovision_fr.pdf factsheet_cryptovision_en.pdf; do
  url="https://sparkcore.fund/ressources/$pdf"
  python3 ~/.claude/skills/seo/scripts/gsc_inspect.py "$url" --site-url "sc-domain:sparkcore.fund" 2>&1 | grep -E "Verdict|Coverage|Last Crawl"
done
```

Attendu : tous "URL is unknown" ou pages NOT_FOUND.

### 6. GA4 Key Events — sont-ils déclenchés ?

Si trafic > 30 sessions/mois :

```bash
# Note : ga4_report.py ne supporte pas custom events filter par défaut.
# Vérifier manuellement via GA4 UI : Reports → Engagement → Events → filter date 90d
```

Reporter quel(s) Key Events ont été déclenchés au moins une fois dans les 90j :
- `factsheet_request_open` — combien ? quels funds ?
- `contact_form_submit` — combien ? quelles `form_source` ?
- `cal_booking_complete` — combien ? quel `booking_source` ?
- `discovery_call_view` — combien ?
- `factsheet_view_cryptovision` / `factsheet_view_dynamic_trends` — combien ?

Si encore tous à 0 après 90j → re-évaluer si volume suffisant pour pilotage data, sinon décision "trop tôt, retour patience".

## Rapport attendu (Telegram + stdout)

**Telegram** — termine la sortie par ce bloc (seul ce qui est entre les marqueurs est envoyé) :
```
===TG===
<emoji verdict> GSC J+90 sparkcore.fund — <verdict 1 phrase>
GSC <X> clicks/<Y> imp · GA4 <X> sessions · Indexed <X>/28 (baseline 14)
Non-régression fixes: <OK/KO> · PDFs deindex <X>/3
📝 baseline maj MD/CLAUDE.md (sci)
===END===
```

**stdout** (rapport complet, pas envoyé à Telegram) :
```
=== GSC J+90 sparkcore.fund — re-audit complet ===

📊 Trafic 90j vs baseline 28j (× 3 attendu si stable)
  GSC : <X> clicks (vs ~33 projeté), <Y> imp, CTR <Z>%
  GA4 : <X> sessions (vs ~6 projeté), <Y> users

📑 Indexation sitemap
  Indexed : <X>/28  (baseline : 14/28, cible : 24+/28)
  Discovered/Crawled non-indexed : <Y>  (baseline : 14, cible : <5)
  Régression vs baseline : <Z URLs>

🔁 Non-régression fixes 2026-05-05
  4 redirects 301 : OK / KO listés
  3 pages noindex : OK / KO
  IndexNow key file : OK / KO
  X-Robots-Tag PDFs : OK / KO

⚠️ PDFs warning deindex
  3/3 URL unknown ✅ / X restant indexé 🔴

📈 GA4 Key Events (90j)
  factsheet_request_open : <count>
  contact_form_submit : <count> (form_source breakdown)
  cal_booking_complete : <count> (booking_source breakdown)
  discovery_call_view : <count>
  factsheet_view_* : <count>

🎯 Verdict global
  ✅ Tout va bien — site progresse normalement
  🟡 Progression OK mais signal faible — patience
  🔴 Régression ou stagnation — plan d'action requis
```

Si verdict 🔴 ou 🟡 avec stagnation : esquisser un plan d'action pour les 90j suivants (E-E-A-T improvements, internal linking, content gaps, backlink strategy).

Mettre à jour la baseline dans `MD/CLAUDE.md` (`MD/CLAUDE.md` sci) avec les nouveaux chiffres si trafic > 30 sessions/mois.
