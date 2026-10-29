#!/usr/bin/env python3
"""Recopie l'adresse de SparkCore et des fonds dans les pages du site, depuis la source unique.

La source est l'Admin (Config -> Funds, table ``adm_fund_profile`` du dépôt sparkcore-vps) : son job quotidien des
fiches publie ``funds/entities.json`` sur R2, servi par ``functions/data/funds/[slug].js`` à
``https://sparkcore.fund/data/funds/entities.json``. Ce script la recopie là où l'adresse s'écrit en clair (le
référencement lit le HTML, pas le JavaScript) ; une adresse ne se change donc jamais à la main dans le site.

Trois formes, toutes recopiées telles que l'Admin les compose (rien n'est recomposé ici) :

* texte HTML entre repères : ``<!--entity:GP:footer:en-->…<!--/entity-->`` ;
* ligne de JS ou de Python portant le repère en commentaire de fin, ``// entity:GP:line:fr`` ou
  ``# entity:GP:line:en`` : la première chaîne entre guillemets de la ligne est réécrite ;
* blocs JSON-LD ``"address": {"@type": "PostalAddress", …}`` : réécrits en entier depuis les parties de
  l'adresse de SparkCore (``GP``), car un commentaire n'a pas sa place dans du JSON. Tous les blocs du site
  décrivent la société, y compris dans les fiches des fonds.

Usage :
  python3 scripts/ops/sync_entities.py                  # lit l'URL publique, écrit les fichiers
  python3 scripts/ops/sync_entities.py --json f.json    # lit un fichier local (sans R2, hors ligne)
  python3 scripts/ops/sync_entities.py --check          # n'écrit rien ; code 1 si une page n'est pas à jour

Idempotent : relancé sans changement de la source, il ne modifie rien. Puis relancer
``MD/email-signatures/build_signatures.py`` si ce fichier a changé (les signatures en sont générées).
"""
from __future__ import annotations

import argparse
import html
import json
import re
import sys
import urllib.request
from pathlib import Path

SITE = Path(__file__).resolve().parents[2]
URL = "https://sparkcore.fund/data/funds/entities.json"
SKIP_DIRS = {".git", "node_modules", "seo"}            # MD/seo : instantanés d'audit, figés
SUFFIXES = {".html", ".js", ".py"}

# Rien n'est composé ici : la ligne d'adresse et le pied de page viennent tout faits de l'Admin (admin.entities).
FORMATS = {
    "line": lambda e, lang: e["address_line"][lang],
    "footer": lambda e, lang: e["footer"][lang],
}

HTML_MARK = re.compile(r"<!--entity:(\w+):(\w+):(en|fr)-->(.*?)<!--/entity-->", re.S)
LINE_MARK = re.compile(r"(?://|#) entity:(\w+):(\w+):(en|fr)\s*$")
STRING = re.compile(r"""(['"])((?:\\.|(?!\1).)*)\1""")
POSTAL = re.compile(r'"address":\s*\{\s*"@type":\s*"PostalAddress"[^{}]*\}')


def load(args) -> dict:
    if args.json:
        data = json.loads(Path(args.json).read_text())
    else:
        req = urllib.request.Request(args.url, headers={"User-Agent": "sparkcore-sync-entities"})
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.load(r)
    ents = data.get("entities") or {}
    gp = ents.get("GP") or {}
    if not (gp.get("address") and gp.get("address_line", {}).get("en") and gp.get("footer", {}).get("en")):
        sys.exit("Source sans adresse ni numéro d'enregistrement pour GP : rien n'est écrit.")
    return ents


def value(ents: dict, code: str, fmt: str, lang: str, where: str) -> str:
    if code not in ents or fmt not in FORMATS:
        sys.exit(f"{where} : repère inconnu ({code}:{fmt}:{lang}) — rien n'est écrit.")
    return FORMATS[fmt](ents[code], lang)


def postal_block(match: re.Match, gp: dict) -> str:
    """The whole PostalAddress object, from the GP's parts; the block keeps its layout (one line, or one key per
    line at its own indentation)."""
    a = gp["address"]
    fields = [f'"{k}": {json.dumps(v, ensure_ascii=False)}' for k, v in (
        ("@type", "PostalAddress"), ("streetAddress", a["street"]), ("addressLocality", a["city"]),
        ("postalCode", a["postal_code"]), ("addressCountry", a["country_code"]))]
    lines = match.group(0).split("\n")
    if len(lines) < 2:
        return '"address": {' + ", ".join(fields) + "}"
    inner = re.match(r"\s*", lines[1]).group(0)
    outer = re.match(r"\s*", lines[-1]).group(0)
    return '"address": {\n' + ",\n".join(inner + f for f in fields) + "\n" + outer + "}"


def sync_text(path: Path, text: str, ents: dict) -> str:
    rel = path.relative_to(SITE)
    if path.suffix == ".html":
        text = HTML_MARK.sub(lambda m: (f"<!--entity:{m[1]}:{m[2]}:{m[3]}-->"
                                        f"{html.escape(value(ents, m[1], m[2], m[3], rel), quote=False)}"
                                        "<!--/entity-->"), text)
        text = POSTAL.sub(lambda m: postal_block(m, ents["GP"]), text)
    out = []
    for line in text.split("\n"):
        m = LINE_MARK.search(line)
        if m and path.suffix in (".js", ".py"):
            v = value(ents, m[1], m[2], m[3], rel)
            s = STRING.search(line)
            if not s:
                sys.exit(f"{rel} : repère sans chaîne sur la ligne « {line.strip()} » — rien n'est écrit.")
            q = s[1]
            lit = q + v.replace("\\", "\\\\").replace(q, "\\" + q) + q
            line = line[:s.start()] + lit + line[s.end():]
        out.append(line)
    return "\n".join(out)


def files():
    for p in sorted(SITE.rglob("*")):
        if p.suffix in SUFFIXES and p.is_file() and not SKIP_DIRS & set(p.relative_to(SITE).parts[:-1]):
            if p.resolve() != Path(__file__).resolve():
                yield p


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    src = ap.add_mutually_exclusive_group()
    src.add_argument("--json", help="fichier entities.json local au lieu de l'URL publique")
    src.add_argument("--url", default=URL)
    ap.add_argument("--check", action="store_true", help="n'écrit rien ; code 1 si une page n'est pas à jour")
    args = ap.parse_args()
    ents = load(args)

    # Everything is computed before anything is written: a bad marker stops the run with no file touched.
    changes = []
    marks = 0
    for p in files():
        text = p.read_text(encoding="utf-8")
        marks += len(HTML_MARK.findall(text)) + len(POSTAL.findall(text)) + sum(
            1 for ln in text.split("\n") if LINE_MARK.search(ln))
        new = sync_text(p, text, ents)
        if new != text:
            changes.append((p, new))
    for p, _ in changes:
        print(("à mettre à jour : " if args.check else "mis à jour : ") + str(p.relative_to(SITE)))
    if not args.check:
        for p, new in changes:
            p.write_text(new, encoding="utf-8")
    print(f"{marks} emplacement(s) suivis, {len(changes)} fichier(s) " +
          ("à mettre à jour." if args.check else "modifié(s)."))
    if args.check and changes:
        sys.exit(1)


if __name__ == "__main__":
    main()
