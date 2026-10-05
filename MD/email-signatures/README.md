# Signatures email SparkCore

> **Statut : LIVE** · MAJ 2026-10-05 · vérifié jamais · Périmètre : signatures HTML des adresses contact@, alex@ et olivier@sparkcore.fund (Proton Mail)

Signatures en HTML (tableaux, styles en ligne), en français et en anglais, qui
remplacent les anciennes bannières image. Images hébergées sur
`https://sparkcore.fund/assets/images/email-signature/` : elles ne s'affichent
chez les destinataires qu'une fois `beta` promu sur `main`.

- `build_assets.py` : images à double résolution (logo blanc, symbole sur tuile
  marron, pictogrammes, photos recadrées depuis `assets/images/webp/team-member-*`).
  Lancer avec le Playwright de `~/ops/pw` et Pillow système sur le `PYTHONPATH`.
- `build_signatures.py` : écrit `html/<adresse>-<langue>.html` (fragments à
  coller) et `preview.html` (aperçu autonome, copie en un clic, étapes Proton).
  Rôles repris de `assets/js/translations.js`, mentions de la page réglementaire.
- Nom d'affichage Proton de contact@ : « SparkCore Fund Management ».

Régénérer après tout changement de rôle, de mention légale ou de photo.
