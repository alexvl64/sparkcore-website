# SparkCore — charte graphique du site (sparkcore.fund)

> Statut : RÉFÉRENCE · créée 2026-09-25 · formalise l'identité existante du site,
> elle ne la remplace pas. Toute nouvelle page ou section la respecte ; toute
> nouvelle règle validée par Alex s'ajoute ici.

Registre : société de gestion régulée (Finantsinspektsioon). Sobre, précis,
institutionnel. Rien qui évoque le trading grand public ou le « crypto-hype ».

## 1. Tokens

### Couleurs de base (`assets/js/tailwind.config.js`)

| Token | Valeur | Usage |
|---|---|---|
| `darkGray` | `#0E1117` | texte principal, bouton primaire, fond des sections sombres |
| `mediumGray` | `#465467` | texte courant secondaire |
| `steelBlue` | `#667085` | texte d'appoint, libellés |
| `softBlueGray` | `#98A2B3` | séparateurs typographiques |
| `lightGray` | `#D0DAE3` | bordures fines, filets |
| `paleBlue` | `#EAECF0` | filets très clairs |
| surface claire | `#F3F5F7` | bandeaux (trust strip, panneau Gouvernance) |
| `cream` | `#DBD1BC` | accent sur fond sombre (courbe DT, CTA secondaire du hero) |
| `charcoal` | `#545047` | série de référence sur fond sombre |

### Une couleur par fonds (source de vérité : PR #156)

| Fonds | Bandeau | Fond carte | Bordure |
|---|---|---|---|
| Dynamic Trends | `#11161E` | `#F7F7F8` | `#EAEBEB` |
| CryptoVision | `#AD9A7E` | `#F3EFE7` | `#DED6CB` |
| Equinoxe | `#4C5B7A` | `#EDEEF1` | `#E0E4E4` |

La couleur d'un fonds est un **marqueur d'identité**, jamais une décoration :
elle ne sert qu'aux éléments de ce fonds.

### Typographie

- Titres : **Funnel Display** (400/500/600) ; texte : **Inter** (400/500/600).
  Auto-hébergées (`assets/css/fonts.css`, OFL). Toute page charge `fonts.css`
  (ou l'équivalent inline de l'accueil).
- Chiffres (performances, VL, montants) : `font-variant-numeric: tabular-nums`.
- Libellés de section / d'étiquette : Inter 10-11 px, 600, majuscules,
  `letter-spacing: 0.08em`, `#667085`.

### Formes et profondeur

- **Angles vifs** ; le seul rayon autorisé est **4 px** (boutons, badges,
  cartes, pills). Jamais plus.
- Profondeur par **filets de 1 px** (`#D0DAE3`) et aplats (`#F3F5F7`), pas par
  des ombres. Seule exception existante : l'ombre du header sticky.

## 2. Composants

- **Bouton primaire** : fond `#0E1117`, texte blanc, rayon 4 px ; survol :
  transparent + bordure `#0E1117`.
- **Bouton secondaire** (`.nav-articles-link`) : contour 1 px `#0E1117`.
- **Lien texte** (`.nav-portal-link`) : sans bordure, soulignement au survol.
- **Liste de faits** (`.team-governance__list`, `.reg-facts`) : `dl`, libellé
  en capitales grises au-dessus ou à gauche, valeur en `#0E1117`, filets
  entre lignes.
- **Graphiques de performance** : base 100 datée, séries fonds (trait plein)
  vs référence (pointillé), **période hors fonds grisée et nommée**, repère
  vertical au lancement du fonds, date d'arrêt affichée, mention net/brut de
  frais sous le graphique.

## 3. Règles de contenu liées au régulateur

- Aucun chiffre inventé, arrondi flatteur ou exemple « réaliste » : toute
  performance vient du JSON publié par l'Admin (`/data/funds/<slug>.json`).
- Performance d'un fonds : toujours avec sa date de lancement, la période,
  la date d'arrêt, la référence, net ou brut de frais, et l'avertissement
  « les performances passées… ». L'historique hors fonds est toujours
  **visuellement séparé** et **nommé**.
- Éligibilité (formulation validée 2026-09-25) : « Nos fonds sont
  commercialisés auprès d'investisseurs professionnels. D'autres investisseurs
  peuvent, sous conditions, y accéder dans les limites du régime estonien. »
- Pas d'urgence artificielle, pas de promesse de rendement, pas de superlatifs
  (« best », « guaranteed », « next-gen »…).
- Ne jamais nommer KPMG (« Big Four firm » / « cabinet Big Four »).

## 4. Interdits visuels

Pas de dégradés décoratifs, de néon, de texte en dégradé, de glassmorphism,
d'animations au défilement gratuites, de curseurs personnalisés, d'images de
banque d'images ou de services d'images tiers. Toute animation respecte
`prefers-reduced-motion`.

## 5. Checklist avant livraison d'un écran

1. Tokens ci-dessus uniquement (pas de nouvelle couleur sans validation).
2. Rayon ≤ 4 px, filets plutôt qu'ombres.
3. Chiffres en `tabular-nums`, alignés à droite dans les tableaux.
4. Contraste texte ≥ 4,5:1 ; focus clavier visible ; cibles tactiles ≥ 40 px.
5. EN et FR mis à jour ensemble (`index.html`, `fr/index.html`,
   `translations.js`) ; cache-buster `?v=` incrémenté pour tout CSS/JS modifié.
6. Mentions réglementaires (section 3) présentes là où il y a une performance.
7. Rendu vérifié à 360, 768 et 1440 px.

## Origine

Principes retenus lors du scan du 2026-09-25 de trois dépôts publics
(`VoltAgent/awesome-design-md` : sobriété type IBM Carbon, chiffres
tabulaires type Stripe/Coinbase ; `Leonxlnx/taste-skill` : réglage
« secteur régulé », interdits anti-« AI slop » ; `affaan-m/ECC` : finitions
d'interface, budgets de performance). Aucun de ces outils n'est installé ;
seules les idées sont reprises, adaptées au registre réglementé.
