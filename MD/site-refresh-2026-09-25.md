# Rafraîchissement du site — feuille de route (2026-09-25)

> Statut : CHANTIER · go Alex 2026-09-25 · branche `claude/site-refresh-2026-09`
> → `beta` (beta.sparkcore.fund) · promotion `main` validée par Alex uniquement.

## Décisions actées (Alex, 2026-09-25)

- **Équipe** : la gestion est présentée par **Olivier Sayegh et Alexandre Vinal**
  (Managing Partners, opérationnels). Paul-Antoine Pons n'apparaît plus que dans
  un bloc **Gouvernance** : membre du Management Board, aux côtés d'Alexandre
  (pas de titre particulier, pas de photo, pas de bio, pas de lien). Aucun
  changement MLRO (double MLRO inchangé).
- **Performance** : Dynamic Trends reste le fonds mis en avant sur l'accueil.
  Historique antérieur au fonds ramené à **2 ans (départ août 2023)**,
  visuellement séparé du fonds (lancé le 01/08/2025). Equinoxe : garde ses
  8 mois de comptes gérés (janv.–août 2025), séparés de la même façon.
  CryptoVision : pas d'historique antérieur.
- **Header** : lien vers le portail investisseur
  (`investor.sparkcore-investment.com`).
- **White label** : sort de l'accueil vers une page dédiée.
- **Textes** : VL quotidienne, rachats trimestriels ; « comptabilité tenue par
  un cabinet Big Four » (tenue, pas audit ; jamais nommer KPMG) ; éligibilité :
  « Nos fonds sont commercialisés auprès d'investisseurs professionnels. D'autres
  investisseurs peuvent, sous conditions, y accéder dans les limites du régime
  estonien. » La mention « 149 investisseurs non professionnels par pays » reste
  propre à la page white label.
- **Page « Informations réglementaires »** : à créer.

## Lots

### Lot 1 — Équipe, gouvernance, portail, textes

- Accueil EN/FR + `translations.js` : 2 cartes équipe + bloc Gouvernance ;
  retrait de l'option « communauté Paul-Antoine » du formulaire ; FAQ JSON-LD
  « Who founded » → « Who manages » ; nœud `Person` et `founder` retirés.
- Factsheets CV/DT/EQ : bloc équipe à 2 gérants + ligne Management Board.
- `llms.txt` / `llms-full.txt` : section Team alignée.
- Lien « Investor login / Espace investisseur » dans le header des 28 pages.
- Textes VL / comptabilité / éligibilité.

### Lot 2 — Graphique et factsheets

- Données inchangées côté Admin/R2 (communes à beta et prod) : la fenêtre est
  appliquée côté site, sur beta seulement.
- Accueil : courbe DT vs Bitcoin rebasée à 100 en août 2023, zone antérieure au
  fonds grisée + légende « comptes gérés, stratégie réelle, sans backtest »,
  repère vertical au lancement du fonds.
- Factsheet DT : même fenêtre ; chiffres clés recalculés sur la fenêtre.
  Factsheet EQ : séparation visuelle de la période comptes gérés.
- Relecture des mentions (source, net de frais, période, avertissement).

### Lot 3 — Pages et rafraîchissement visuel

- Page `/white-label` (contenu actuel de l'accueil + liens blog white label) ;
  l'accueil ne garde qu'un lien.
- Page « Informations réglementaires » (statut, régulateur, gouvernance, AML,
  réclamations, conflits d'intérêts, périmètre SFDR à confirmer avec le conseil).
- `SPARKCORE-DESIGN.md` : charte formalisant l'identité existante (Funnel
  Display + Inter, `#0E1117`, rayon 4 px, couleur par fonds) ; principes issus
  du scan 2026-09-25 (IBM Carbon : bordures fines, pas d'ombres ; chiffres
  tabulaires ; un accent ; pas de néon/dégradés/mots creux ;
  `prefers-reduced-motion`). Aucun outil tiers installé.
- Couleurs de fonds sorties des `style=""` inline vers des classes.

## Avancement

- Lot 1 : fait (beta, commit `55ed836`).
- Lot 2 : fait (beta, commit `a15843d`).
- Lot 3 : pages `/white-label` + `/regulatory-information` (paires EN/FR),
  liens de pied de page sur tout le site, polices de marque chargées sur les
  31 pages qui ne les chargeaient pas, charte `MD/SPARKCORE-DESIGN.md`.
  **Reporté** : sortie des couleurs de fonds des `style=""` inline (pur
  confort de maintenance, aucun effet visible).
- En attente d'Alex : sections réclamations, conflits d'intérêts, SFDR et
  rémunération de la page réglementaire (non publiées sans texte validé).

## Hors périmètre

Aucune modification Admin/R2, aucun envoi. Relecture Hedman Partners des
mentions réglementaires et de performance à décider par Alex avant `main`.
