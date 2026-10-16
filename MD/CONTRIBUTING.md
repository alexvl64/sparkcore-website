# Contribuer à sparkcore-website

Ce fichier s'adresse aux contributeurs qui travaillent **hors des serveurs SparkCore**, sur leur propre machine
(aujourd'hui Olivier). Il est dans `MD/` et non à la racine pour une raison : **tout fichier hors de `MD/` est publié
sur sparkcore.fund** (voir plus bas).

## Le principe

**Tu proposes, Alex décide.** Toute modification arrive par une pull request **vers `beta`**, qu'Alex relit puis
fusionne. Elle apparaît alors sur beta.sparkcore.fund. Elle n'atteint sparkcore.fund que lorsqu'Alex promeut `beta`
sur `main` (les deux branches doivent rester identiques après chaque promotion).

Les deux branches sont protégées sur GitHub : on ne peut ni y pousser directement, ni y fusionner une PR sans
l'approbation d'Alex.

| Branche | Rôle | Ce que tu en fais |
|---|---|---|
| `main` | sparkcore.fund, la production | rien : jamais de PR vers `main` |
| `beta` | beta.sparkcore.fund, la revue | la cible de toutes tes PR |

Chaque branche poussée reçoit aussi un aperçu Cloudflare Pages : l'adresse s'affiche dans la PR, pratique pour
montrer le résultat avant fusion.

## Le circuit

1. Une branche par sujet, partie de `beta` à jour :
   `git switch beta && git pull && git switch -c olivier/<sujet>`.
2. Une refonte ou un changement de structure commence par une proposition écrite, pas par du code : un fichier
   `MD/<sujet>-AAAA-MM-JJ.md` dans une PR, et le code seulement après le go d'Alex (règle 1 de
   [`CLAUDE.md`](CLAUDE.md)). Les petites corrections (coquilles, liens cassés) vont directement en PR.
3. Avant de demander la relecture, remets ta branche à jour : `git fetch && git rebase origin/beta`.
4. La description de la PR dit : quoi, pourquoi, quelles pages, et l'adresse de l'aperçu.
5. Alex relit, approuve et fusionne en « squash » dans `beta`. La branche est supprimée.

## Les pièges propres au site

- **Tout ce qui est hors de `MD/` est public.** Cloudflare Pages publie le dépôt tel quel. N'ajoute jamais de note,
  de brouillon ou de document de travail ailleurs que dans `MD/`, que la Function `functions/MD/[[path]].js` rend
  inaccessible. Jamais de secret nulle part : `form_config.php` est exclu de Git pour cette raison.
- **CSS** : Tailwind est compilé localement et le résultat est committé. Si tu changes des classes :
  `npm ci && npm run build:css`, puis committe `assets/css/tailwind.min.css` avec ta modification, et augmente le
  `?v=` de la feuille modifiée dans les pages qui la chargent (sinon les navigateurs gardent l'ancienne).
- **Une nouvelle ressource externe** (script, police, iframe, domaine appelé) : signale-la. La politique de sécurité
  du contenu (CSP) n'est pas dans le dépôt, Alex la modifie dans Cloudflare ; sans cela, la ressource est bloquée
  en production.
- **Bilingue** : une page modifiée en anglais l'est aussi en français (`fr/`), et inversement.

## Conventions

Les règles de rédaction et de design sont dans [`CLAUDE.md`](CLAUDE.md), section « Règles de travail » : angles à
4 px maximum, publication d'un article de blog (trois fichiers dans le même commit), interdiction de nommer KPMG
sur une page indexée, formulation des coupons. Zéro emoji, partout.

## Avec Claude Code

Lance `claude` à la racine du clone et demande-lui de lire d'abord `MD/CLAUDE.md` et ce fichier : à la racine, il
n'y a pas de `CLAUDE.md` (il serait publié). Ta session ne tente aucune connexion aux serveurs et termine par une PR
vers `beta`.
