/* ── Cal.eu Embed — Booking Page ── */

const CAL_LINK = "sparkcore/discovery";
const CAL_ORIGIN = "https://app.cal.com";

const T = {
  en: {
    htmlLang: 'en',
    hdrTitle: 'Discovery Call',
    bookingTitle: 'Book a Discovery Call',
    bookingSubtitle: 'Schedule a call with our team to discuss our crypto-asset investment strategies, the investment process, and how our funds can align with your goals.',
    valDisclaimer: '<strong>Disclaimer:</strong> This page is provided for informational purposes only and does not constitute an investment offer. SparkCore.investment OÜ is registered and supervised by the Finantsinspektsioon (Estonia).',
    ftrCompany: 'SparkCore.investment OÜ · Reg. No. 16265864',
    ftrAddress: 'Männimäe 1, Pudisoo, 74626 Harju County, Estonia',
    ftrPrivacy: 'Privacy Policy',
  },
  fr: {
    htmlLang: 'fr',
    hdrTitle: 'Appel Découverte',
    bookingTitle: 'Planifier un Appel Découverte',
    bookingSubtitle: 'Échangez avec notre équipe sur nos stratégies d\'investissement en crypto-actifs, le processus d\'investissement et comment nos fonds peuvent s\'aligner sur vos objectifs.',
    valDisclaimer: '<strong>Avertissement :</strong> Cette page est fournie à titre informatif uniquement et ne constitue pas une offre d\'investissement. SparkCore.investment OÜ est enregistrée et supervisée par la Finantsinspektsioon (Estonie).',
    ftrCompany: 'SparkCore.investment OÜ · N° d\'enregistrement 16265864',
    ftrAddress: 'Männimäe 1, Pudisoo, 74626 Comté de Harju, Estonie',
    ftrPrivacy: 'Politique de confidentialité',
  }
};

/* ── i18n ── */
let currentLang = 'en';

function applyLang(lang) {
  const t = T[lang];
  document.documentElement.lang = t.htmlLang;

  document.title = lang === 'fr'
    ? 'Appel Découverte — SparkCore Fund Management'
    : 'Discovery Call — SparkCore Fund Management';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = lang === 'fr'
      ? 'Planifiez un appel découverte avec SparkCore Fund Management pour échanger sur nos fonds d\'investissement en crypto-actifs réglementés.'
      : 'Schedule a discovery call with SparkCore Fund Management to discuss our regulated crypto-asset investment funds and strategies.';
  }

  const s = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const h = (id, v) => { const el = document.getElementById(id); if (el) el.innerHTML = v; };

  s('hdr-title', t.hdrTitle);
  s('booking-title', t.bookingTitle);
  s('booking-subtitle', t.bookingSubtitle);
  h('val-disclaimer', t.valDisclaimer);
  s('ftr-company', t.ftrCompany);
  s('ftr-address', t.ftrAddress);
  s('ftr-privacy', t.ftrPrivacy);

  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');
  document.getElementById('btn-fr').classList.toggle('active', lang === 'fr');
  document.getElementById('btn-fr').setAttribute('aria-pressed', lang === 'fr');
}

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem('sc_booking_lang', lang); } catch (e) {}
  applyLang(lang);
}

(function initLang() {
  let saved = null;
  try { saved = localStorage.getItem('sc_booking_lang'); } catch (e) {}
  const browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
  const detected = saved || (browser.startsWith('fr') ? 'fr' : 'en');
  currentLang = detected;
  applyLang(detected);
})();

/* ── Cal.eu Embed Init ── */
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal;
    let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A + "/embed/embed.js";
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, CAL_ORIGIN, "init");

Cal("init", { origin: CAL_ORIGIN });

Cal("inline", {
  elementOrSelector: "#cal-embed",
  calLink: CAL_LINK,
  config: {
    layout: "month_view",
    theme: "light"
  }
});

Cal("ui", {
  theme: "light",
  cssVarsPerTheme: {
    light: { "cal-brand": "#0E1117" }
  }
});

/* GA4 cal_booking_complete listener vit dans assets/js/analytics.js (chargé partout) — couvre /discovery-call ET les Cal popups des factsheets. */
