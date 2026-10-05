"""Signatures email SparkCore en HTML (2026-10-05).

Ecrit pour chaque adresse et chaque langue un fragment HTML pret a coller
(tableaux + styles en ligne, images hebergees sur sparkcore.fund), plus
preview.html : apercu autonome (images en data:) avec boutons de copie.
Les textes viennent du site : roles de translations.js, mentions de la page
reglementaire. Relancer apres tout changement de role ou de mention.
"""
import base64
import html
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = HERE.parents[1]
IMG_DIR = SITE / "assets/images/email-signature"
IMG_URL = "https://sparkcore.fund/assets/images/email-signature/"

NAVY, CREAM, MUTED, LINE, GREY = "#0E1117", "#DBD1BC", "#8FA3B8", "#2A3342", "#8B929C"
SANS = "Inter,'Helvetica Neue',Helvetica,Arial,sans-serif"
DISPLAY = "'Funnel Display',Inter,'Helvetica Neue',Helvetica,Arial,sans-serif"
LINKEDIN_CO = "https://www.linkedin.com/company/sparkcore-investment-o%C3%BC/"

TXT = {
    "fr": {
        "site": "https://sparkcore.fund/fr/",
        "book": "Réserver un appel",
        "contact_role": "Gestionnaire de fonds crypto réglementé · Estonie",
        "legal": "SparkCore.investment OÜ · Gestionnaire de fonds d'investissement alternatifs de petite taille, "
                 "supervisé par la Finantsinspektsioon (Estonie) · Code registre 16265864 · "
                 "Männimäe 1, Pudisoo, 74626 comté de Harju, Estonie",
        "disclaimer": "Le contenu de cet e-mail est confidentiel et destiné uniquement au destinataire spécifié "
                      "dans le message. Il est strictement interdit de partager toute partie de ce message avec un "
                      "tiers, sans le consentement écrit de l'expéditeur. Si vous avez reçu ce message par erreur, "
                      "veuillez répondre à cet e-mail et procéder à sa suppression, afin que nous puissions éviter "
                      "qu'une telle erreur ne se reproduise à l'avenir.",
    },
    "en": {
        "site": "https://sparkcore.fund/",
        "book": "Book a call",
        "contact_role": "Regulated crypto fund manager · Estonia",
        "legal": "SparkCore.investment OÜ · Small alternative investment fund manager supervised by "
                 "Finantsinspektsioon (Estonia) · Registry code 16265864 · "
                 "Männimäe 1, Pudisoo, 74626 Harju County, Estonia",
        "disclaimer": "The content of this email is confidential and intended solely for the recipient specified "
                      "in the message. It is strictly forbidden to share any part of this message with a third "
                      "party without the written consent of the sender. If you received this message by mistake, "
                      "please reply to this email and delete it, so that we can ensure such a mistake does not "
                      "occur in the future.",
    },
}

PEOPLE = {
    "contact": {"lines": ("SparkCore", "Fund Management"), "img": "mark-tile.png", "alt": "SparkCore",
                "role": None, "email": "contact@sparkcore.fund", "linkedin": LINKEDIN_CO,
                "book": True, "logo": False},
    "alexandre-vinal": {"lines": ("Alexandre", "Vinal"), "img": "alexandre-vinal.jpg", "alt": "Alexandre Vinal",
                        "role": {"fr": "Associé gérant · Systèmes & risques", "en": "Managing Partner · Systems & Risk"},
                        "email": "alex@sparkcore.fund", "linkedin": "https://www.linkedin.com/in/alexandrevinal/",
                        "book": False, "logo": True},
    "olivier-sayegh": {"lines": ("Olivier", "Sayegh"), "img": "olivier-sayegh.jpg", "alt": "Olivier Sayegh",
                       "role": {"fr": "Associé gérant · Trading & stratégie", "en": "Managing Partner · Trading & Strategy"},
                       "email": "olivier@sparkcore.fund", "linkedin": "https://www.linkedin.com/in/olivier-sayegh-5b89b3135/",
                       "book": False, "logo": True},
}

e = html.escape
TABLE = 'cellpadding="0" cellspacing="0" border="0" role="presentation"'


def img(src, name, w, h, alt, extra=""):
    return (f'<img src="{src(name)}" width="{w}" height="{h}" alt="{e(alt)}" '
            f'style="display:block;border:0;outline:none;width:{w}px;height:{h}px;{extra}">')


def contact_line(src, icon, label, href):
    return (f'<tr><td width="16" valign="middle" style="padding:3px 10px 3px 0;width:16px">'
            f'{img(src, icon, 16, 16, "")}</td>'
            f'<td valign="middle" style="padding:3px 0;font-family:{SANS};font-size:13px;line-height:18px;white-space:nowrap">'
            f'<a href="{e(href)}" style="color:#FFFFFF;text-decoration:none">{e(label)}</a></td></tr>')


def signature(key, lang, src):
    p, t = PEOPLE[key], TXT[lang]
    role = p["role"][lang] if p["role"] else t["contact_role"]
    lines = [contact_line(src, "icon-mail.png", p["email"], f"mailto:{p['email']}"),
             contact_line(src, "icon-web.png", "sparkcore.fund", t["site"]),
             contact_line(src, "icon-linkedin.png", "LinkedIn", p["linkedin"])]
    if p["book"]:
        lines.append(contact_line(src, "icon-calendar.png", t["book"], "https://sparkcore.fund/discovery-call"))
    logo_row = ""
    if p["logo"]:
        logo_row = (f'<tr><td colspan="5" align="right" style="padding:0 0 10px 0">'
                    f'<a href="{t["site"]}" style="text-decoration:none">{img(src, "logo-white.png", 105, 20, "SparkCore")}</a></td></tr>')
    top_pad = "16px" if p["logo"] else "22px"
    role_wrap = "white-space:nowrap" if p["role"] else "max-width:210px"
    name = "<br>".join(e(x) for x in p["lines"])
    card = (
        f'<table {TABLE} bgcolor="{NAVY}" style="border-collapse:separate;background:{NAVY};border-radius:4px">'
        f'<tr><td style="padding:{top_pad} 24px 22px 22px">'
        f'<table {TABLE} style="border-collapse:collapse">{logo_row}<tr>'
        f'<td valign="middle" style="padding:0 18px 0 0">{img(src, p["img"], 96, 96, p["alt"], "border-radius:4px")}</td>'
        f'<td valign="middle" style="padding:0">'
        f'<div style="font-family:{DISPLAY};font-size:23px;line-height:26px;font-weight:500;color:#FFFFFF;letter-spacing:-0.2px;white-space:nowrap">{name}</div>'
        f'<div style="font-family:{SANS};font-size:12px;line-height:17px;color:{CREAM};padding-top:8px;{role_wrap}">{e(role)}</div></td>'
        f'<td width="22" style="width:22px;font-size:0;line-height:0">&nbsp;</td>'
        f'<td width="1" bgcolor="{LINE}" style="width:1px;background:{LINE};font-size:0;line-height:0">&nbsp;</td>'
        f'<td valign="middle" style="padding:0 0 0 22px"><table {TABLE} style="border-collapse:collapse">{"".join(lines)}</table></td>'
        f'</tr></table></td></tr></table>'
    )
    small = f"font-family:{SANS};color:{GREY};margin:0;max-width:600px"
    return (
        f'<table {TABLE} style="border-collapse:collapse;max-width:600px"><tr><td style="padding:0">{card}</td></tr>'
        f'<tr><td style="padding:14px 0 0 0"><p style="{small};font-size:11px;line-height:16px">{e(t["legal"])}</p></td></tr>'
        f'<tr><td style="padding:8px 0 0 0"><p style="{small};font-size:10px;line-height:15px">{e(t["disclaimer"])}</p></td></tr>'
        f'</table>'
    )


def url_src(name):
    return IMG_URL + name


_cache = {}


def data_src(name):
    if name not in _cache:
        mime = "image/jpeg" if name.endswith(".jpg") else "image/png"
        _cache[name] = f"data:{mime};base64," + base64.b64encode((IMG_DIR / name).read_bytes()).decode()
    return _cache[name]


def main():
    out = HERE / "html"
    out.mkdir(exist_ok=True)
    preview = {}
    for key in PEOPLE:
        for lang in TXT:
            frag = signature(key, lang, url_src)
            (out / f"{key}-{lang}.html").write_text(frag + "\n")
            preview[f"{key}-{lang}"] = {"view": signature(key, lang, data_src), "copy": frag}
            print(f"{key}-{lang}: {len(frag)} caracteres")
    page = (HERE / "preview.template.html").read_text().replace("/*DATA*/null", json.dumps(preview))
    (HERE / "preview.html").write_text(page)


if __name__ == "__main__":
    main()
