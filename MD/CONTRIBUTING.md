# Contribuer à sparkcore-website

Ce fichier s'adresse aux contributeurs qui travaillent **hors des serveurs SparkCore**, sur leur propre machine
(aujourd'hui Olivier). Il est dans `MD/` et non à la racine pour une raison : **tout fichier hors de `MD/` est publié
sur sparkcore.fund** (voir plus bas).

## Le principe

**Tu proposes, Alex décide.** Tu lis ce dépôt avec une clé de déploiement **en lecture seule** : tu ne peux rien y
pousser, sur aucune branche. Une proposition est une branche que tu pousses sur **ton propre dépôt privé**. Une
session Claude du serveur la récupère, Alex la relit avec elle, puis la session la fusionne dans `beta`. Elle
apparaît alors sur beta.sparkcore.fund. Elle n'atteint sparkcore.fund que lorsqu'Alex promeut `beta` sur `main`
(les deux branches restent identiques après chaque promotion).

| Branche | Rôle | Ce que tu en fais |
|---|---|---|
| `main` | sparkcore.fund, la production | rien : aucune branche ne part de `main` |
| `beta` | beta.sparkcore.fund, la revue | le point de départ de toutes tes branches |

## Les deux dépôts de ton clone

| Remote | Adresse | Usage |
|---|---|---|
| `origin` | `git@github-sparkcore-website:alexvl64/sparkcore-website.git` | lecture seule, par ta clé de déploiement (alias SSH `github-sparkcore-website`) |
| `propositions` | `git@github.com:<ton-compte>/sparkcore-website-olivier.git` | ton dépôt privé : tu y pousses tes branches |

Ton dépôt `sparkcore-website-olivier` porte une clé de déploiement **en lecture** du serveur
(`ubuntu@sparkcore-strategies lecture des propositions site d Olivier`) : c'est par elle que la session récupère tes
branches. Ne lui donne jamais le droit d'écriture, et ne la retire pas.

## Voir tes modifications

Ton dépôt n'est pas relié à Cloudflare Pages : tes branches n'ont pas d'aperçu en ligne. Pour regarder une page,
lance `python3 -m http.server 8000` à la racine du clone et ouvre-la par son nom de fichier
(`http://localhost:8000/white-label.html`). Les Functions (`functions/` : formulaires, newsletter) ne tournent pas
ainsi ; elles se vérifient sur beta.sparkcore.fund après la fusion.

## Le circuit

1. Une branche par sujet, partie de `beta` à jour :
   `git switch beta && git pull && git switch -c olivier/<sujet>`.
2. Une refonte ou un changement de structure commence par une proposition écrite, pas par du code : un fichier
   `MD/<sujet>-AAAA-MM-JJ.md` sur ta branche, et le code seulement après le go d'Alex (règle 1 de
   [`CLAUDE.md`](CLAUDE.md)). Les petites corrections (coquilles, liens cassés) se proposent directement.
3. Avant de la proposer, remets ta branche à jour : `git fetch origin && git rebase origin/beta`.
4. Les messages de commit décrivent la proposition : quoi, pourquoi, quelles pages. La session qui relit n'a que ta
   branche sous les yeux.
5. Pousse-la : `git push propositions olivier/<sujet>` (après un rebase : `--force-with-lease`). Puis préviens
   Alex : le nom de la branche, en une phrase.
6. Alex la fait relire par une session du serveur et te transmet les remarques. Tu corriges sur la même branche et
   tu repousses.
7. Après son accord, la session fusionne la branche en « squash » dans `beta` (un commit) et la pousse. Supprime
   alors ta branche (`git branch -D olivier/<sujet>` et `git push propositions --delete olivier/<sujet>`) et
   repars de `beta` à jour.

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
sur une page indexée, formulation des coupons. Messages de commit en français. Zéro emoji, partout.

## Avec Claude Code

Lance `claude` à la racine du clone et demande-lui de lire d'abord `MD/CLAUDE.md` et ce fichier : à la racine, il
n'y a pas de `CLAUDE.md` (il serait publié). Ta session ne tente aucune connexion aux serveurs, ne pousse que sur
`propositions`, et termine en te donnant le nom de la branche à transmettre à Alex.
