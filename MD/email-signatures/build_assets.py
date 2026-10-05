"""Images des signatures email (2026-10-05) -> assets/images/email-signature/.

Rendu a double resolution (affichage a la moitie) : logo blanc, symbole sur
tuile marron, pictogrammes, photos recadrees depuis les photos equipe du site.
Lancer avec le Playwright de ~/ops/pw (voir la memoire ui_diagnostic_jsdom).
"""
import re
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

SITE = Path(__file__).resolve().parents[2]
OUT = SITE / "assets/images/email-signature"
OUT.mkdir(parents=True, exist_ok=True)

logo = (SITE / "assets/images/svg/logo.svg").read_text()
paths = re.findall(r"<path [^>]*/>", logo)
white = [p.replace('fill="#0E1117"', 'fill="#FFFFFF"') for p in paths]
mark = "".join(white[:3])

ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#8FA3B8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">{}</svg>'
ICONS = {
    "icon-mail": '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    "icon-web": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/>',
    "icon-linkedin": '<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.2c0-1.6 1-2.7 2.3-2.7S16.5 11.4 16.5 13v4"/>',
    "icon-calendar": '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/>',
}

SHOTS = {
    "logo-white": (378, 72, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 40" width="378" height="72">{"".join(white)}</svg>'),
    "mark-tile": (192, 192, '<div style="width:192px;height:192px;background:#5C4E3E;border-radius:8px;display:flex;align-items:center;justify-content:center">'
                  f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 40" width="102" height="100">{mark}</svg></div>'),
    **{k: (32, 32, ICON.format(v)) for k, v in ICONS.items()},
}

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(device_scale_factor=1)
    for name, (w, h, body) in SHOTS.items():
        page.set_viewport_size({"width": w, "height": h})
        page.set_content(f'<html><body style="margin:0;background:transparent"><div id="x" style="width:{w}px;height:{h}px">{body}</div></body></html>')
        page.locator("#x").screenshot(path=str(OUT / f"{name}.png"), omit_background=True)
    browser.close()

# Photos : carre plein cadre (tete et epaules), 192 px (affiche en 96).
CROPS = {"olivier-sayegh": ("team-member-second", (16, 0, 816, 800)),
         "alexandre-vinal": ("team-member-third", (16, 0, 816, 800))}
for name, (src, box) in CROPS.items():
    im = Image.open(SITE / f"assets/images/webp/{src}.webp").convert("RGB").crop(box)
    im.resize((192, 192), Image.LANCZOS).save(OUT / f"{name}.jpg", quality=88, optimize=True, progressive=True)

for f in sorted(OUT.iterdir()):
    print(f.name, f.stat().st_size)
