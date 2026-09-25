// currentLang is declared in translations.js (loaded before this file)
let currentTranslations = translations[currentLang];

// === LANGUAGE SYSTEM ===
function applyTranslations(lang) {
  currentTranslations = translations[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (currentTranslations[key] !== undefined) el.textContent = currentTranslations[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-html');
    if (currentTranslations[key] !== undefined) el.innerHTML = currentTranslations[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-placeholder');
    if (currentTranslations[key] !== undefined) el.placeholder = currentTranslations[key];
  });

  // Update lang toggle buttons in nav and footer
  ['nav', 'footer', 'footer-mobile'].forEach(function(zone) {
    var btnEn = document.getElementById('btn-en-' + zone);
    var btnFr = document.getElementById('btn-fr-' + zone);
    if (btnEn) { btnEn.classList.toggle('active', lang === 'en'); btnEn.setAttribute('aria-pressed', String(lang === 'en')); }
    if (btnFr) { btnFr.classList.toggle('active', lang === 'fr'); btnFr.setAttribute('aria-pressed', String(lang === 'fr')); }
  });
}

function setLang(lang) {
  try { localStorage.setItem('sc_lang', lang); } catch(e) {}
  var path = (window.location.pathname || '/').replace(/\/$/, '') || '/';
  var onFr = path.indexOf('/fr') === 0;
  if (onFr && lang === 'en') {
    window.location.href = '/';
    return;
  }
  if ((path === '/' || path === '/index.html') && lang === 'fr') {
    window.location.href = '/fr/';
    return;
  }
  currentLang = lang;
  applyTranslations(lang);
}

applyTranslations(currentLang);

//  ======== GET VARIABLE ===========

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Récupérer la variable de l'URL (DSM ou PAP)
let sourceTracking = getUrlParameter('source');
if (sourceTracking !== 'DSM' && sourceTracking !== 'PAP') {
	sourceTracking = 'UNKNOWN';
}

//  ======== FORM SIDEBAR ===========
// Get button and sidebar elements
const openSidebarButtons = document.querySelectorAll(".open-sidebar");
const closeSidebarButton = document.getElementById("close-sidebar");
const sidebar = document.getElementById("form-sidebar");

// Turnstile script is loaded in <head> (needed for newsletter widget on page load)

// Open the sidebar for each button
openSidebarButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // GA4: capture which CTA opened the sidebar (re-used by contact_form_submit on success)
    // Fund CTAs carry data-fund; data-i18n moved to the inner text span (kept as fallback).
    const i18n = button.dataset.i18n || "";
    const fund = button.dataset.fund
               || (i18n === "dtFactsheet" ? "dynamic-trends"
                 : i18n === "cvFactsheet" ? "cryptovision"
                 : null);
    if (fund) {
      window.__lastCtaOrigin = `factsheet-${fund}`;
      if (typeof window.gtag === "function") {
        window.gtag("event", "factsheet_request_open", {
          fund,
          lang: document.documentElement.lang || "en"
        });
      }
    } else {
      window.__lastCtaOrigin = button.closest("nav") ? "nav-contact" : "hero";
    }

    sidebar.classList.remove("-right-full");
    sidebar.classList.add("right-0");
    document.body.classList.add("overflow-hidden");
  });
});

// Deep link from secondary pages (e.g. /white-label): /?contact=<origin>
// opens the contact sidebar on arrival.
(function () {
  const origin = getUrlParameter("contact");
  if (!origin || !sidebar) return;
  window.__lastCtaOrigin = origin.replace(/[^a-z0-9-]/gi, "").slice(0, 40) || "deep-link";
  sidebar.classList.remove("-right-full");
  sidebar.classList.add("right-0");
  document.body.classList.add("overflow-hidden");
})();

// Close the sidebar
closeSidebarButton.addEventListener("click", () => {
  sidebar.classList.remove("right-0");
  sidebar.classList.add("-right-full");
  document.body.classList.remove("overflow-hidden");
});

// Close sidebar when clicking outside
window.addEventListener("click", (e) => {
  if (
    !sidebar.contains(e.target) &&
    !e.target.closest(".open-sidebar") && // Ensure it's not a sidebar button
    sidebar.classList.contains("right-0")
  ) {
    sidebar.classList.remove("right-0");
    sidebar.classList.add("-right-full");
    document.body.classList.remove("overflow-hidden");
  }
});

// Get form and custom select elements
const form = document.getElementById("contact-form");
const selectInput = document.getElementById("select-input");
const dropdownOptions = document.getElementById("dropdown-options");
const selectArrow = document.getElementById("select-arrow");

// Get input fields
const prenomInput = document.getElementById("prenom");
const nomInput = document.getElementById("nom");
const telephoneInput = document.getElementById("telephone");
const emailInputs = document.getElementById("email");
const countryCodeSelect = document.getElementById("country-code");

// Get error message elements
const prenomError = document.getElementById("prenom-error");
const nomError = document.getElementById("nom-error");
const emailError = document.getElementById("email-error");
const telephoneError = document.getElementById("telephone-error");
const selectError = document.getElementById("select-error");

// === COUNTRY DIAL CODE SELECT (champ téléphone) ===
// Données compactes [ISO-3166, indicatif, nom EN] ; le drapeau est calculé depuis l'ISO.
const COUNTRY_CODES = [
  ["AD", "+376", "Andorra"], ["AE", "+971", "United Arab Emirates"], ["AL", "+355", "Albania"],
  ["AR", "+54", "Argentina"], ["AT", "+43", "Austria"], ["AU", "+61", "Australia"],
  ["BA", "+387", "Bosnia and Herzegovina"], ["BE", "+32", "Belgium"], ["BG", "+359", "Bulgaria"],
  ["BH", "+973", "Bahrain"], ["BR", "+55", "Brazil"], ["BY", "+375", "Belarus"],
  ["CA", "+1", "Canada"], ["CH", "+41", "Switzerland"], ["CL", "+56", "Chile"],
  ["CN", "+86", "China"], ["CO", "+57", "Colombia"], ["CY", "+357", "Cyprus"],
  ["CZ", "+420", "Czechia"], ["DE", "+49", "Germany"], ["DK", "+45", "Denmark"],
  ["DZ", "+213", "Algeria"], ["EE", "+372", "Estonia"], ["EG", "+20", "Egypt"],
  ["ES", "+34", "Spain"], ["FI", "+358", "Finland"], ["FR", "+33", "France"],
  ["GB", "+44", "United Kingdom"], ["GE", "+995", "Georgia"], ["GI", "+350", "Gibraltar"],
  ["GR", "+30", "Greece"], ["HK", "+852", "Hong Kong"], ["HR", "+385", "Croatia"],
  ["HU", "+36", "Hungary"], ["ID", "+62", "Indonesia"], ["IE", "+353", "Ireland"],
  ["IL", "+972", "Israel"], ["IN", "+91", "India"], ["IS", "+354", "Iceland"],
  ["IT", "+39", "Italy"], ["JO", "+962", "Jordan"], ["JP", "+81", "Japan"],
  ["KR", "+82", "South Korea"], ["KW", "+965", "Kuwait"], ["KZ", "+7", "Kazakhstan"],
  ["LB", "+961", "Lebanon"], ["LI", "+423", "Liechtenstein"], ["LT", "+370", "Lithuania"],
  ["LU", "+352", "Luxembourg"], ["LV", "+371", "Latvia"], ["MA", "+212", "Morocco"],
  ["MC", "+377", "Monaco"], ["MD", "+373", "Moldova"], ["ME", "+382", "Montenegro"],
  ["MK", "+389", "North Macedonia"], ["MT", "+356", "Malta"], ["MU", "+230", "Mauritius"],
  ["MX", "+52", "Mexico"], ["MY", "+60", "Malaysia"], ["NG", "+234", "Nigeria"],
  ["NL", "+31", "Netherlands"], ["NO", "+47", "Norway"], ["NZ", "+64", "New Zealand"],
  ["OM", "+968", "Oman"], ["PE", "+51", "Peru"], ["PH", "+63", "Philippines"],
  ["PK", "+92", "Pakistan"], ["PL", "+48", "Poland"], ["PT", "+351", "Portugal"],
  ["QA", "+974", "Qatar"], ["RO", "+40", "Romania"], ["RS", "+381", "Serbia"],
  ["RU", "+7", "Russia"], ["SA", "+966", "Saudi Arabia"], ["SE", "+46", "Sweden"],
  ["SG", "+65", "Singapore"], ["SI", "+386", "Slovenia"], ["SK", "+421", "Slovakia"],
  ["SM", "+378", "San Marino"], ["SN", "+221", "Senegal"], ["TH", "+66", "Thailand"],
  ["TN", "+216", "Tunisia"], ["TR", "+90", "Turkey"], ["TW", "+886", "Taiwan"],
  ["UA", "+380", "Ukraine"], ["US", "+1", "United States"], ["UY", "+598", "Uruguay"],
  ["VN", "+84", "Vietnam"], ["ZA", "+27", "South Africa"],
];
// Pays mis en avant en tête de liste (marchés prioritaires).
const COUNTRY_PINNED = ["FR", "BE", "CH", "LU", "MC", "GB", "US", "CA"];

function isoToFlag(iso) {
  return iso.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

(function initCountryCode() {
  if (!countryCodeSelect) return;

  const byIso = {};
  COUNTRY_CODES.forEach((c) => { byIso[c[0]] = c; });
  const pinned = COUNTRY_PINNED.map((iso) => byIso[iso]).filter(Boolean);
  const rest = COUNTRY_CODES
    .filter((c) => !COUNTRY_PINNED.includes(c[0]))
    .sort((a, b) => a[2].localeCompare(b[2]));

  const frag = document.createDocumentFragment();
  pinned.concat(rest).forEach(([iso, dial, name]) => {
    const opt = document.createElement("option");
    opt.value = dial;
    opt.dataset.iso = iso;
    opt.dataset.full = `${isoToFlag(iso)} ${dial} ${name}`;
    opt.dataset.short = `${isoToFlag(iso)} ${dial}`;
    opt.textContent = opt.dataset.full;
    frag.appendChild(opt);
  });
  countryCodeSelect.appendChild(frag);

  // Liste déroulante = nom complet ; champ compact = "drapeau + indicatif" sur
  // l'option sélectionnée uniquement (un select natif partage le même texte
  // ouvert/fermé, on raccourcit donc juste l'option courante).
  function refreshCollapsedLabel() {
    const opts = countryCodeSelect.options;
    for (let i = 0; i < opts.length; i++) opts[i].textContent = opts[i].dataset.full;
    const sel = opts[countryCodeSelect.selectedIndex];
    if (sel) sel.textContent = sel.dataset.short;
  }
  countryCodeSelect.addEventListener("change", refreshCollapsedLabel);

  // Sélectionne l'option exacte par ISO (gère les indicatifs partagés, ex. +1 US/CA).
  function selectByIso(iso) {
    const opt = countryCodeSelect.querySelector(`option[data-iso="${iso}"]`);
    if (opt) opt.selected = true;
    refreshCollapsedLabel();
  }

  // Défaut : France (marché principal), écrasé par la géo-détection si dispo.
  selectByIso("FR");

  // Auto-détection du pays au niveau edge Cloudflare (gratuit, sans API IP tierce).
  fetch("/api/geo")
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => { if (d && d.country) selectByIso(d.country); })
    .catch(() => {});
})();

// Handle Custom Select Dropdown
selectInput.addEventListener("click", () => {
  dropdownOptions.classList.toggle("hidden");
  selectArrow.classList.toggle("rotate-180");
});

dropdownOptions.addEventListener("click", (event) => {
  const selectedOption = event.target;

  // Update the displayed text and store value
  const selectText = selectInput.querySelector("p");
  selectText.textContent = selectedOption.textContent;
  selectInput.dataset.value = selectedOption.dataset.value;

  // Hide the error
  selectError.style.display = "none";

  // Close the dropdown
  dropdownOptions.classList.add("hidden");
  selectArrow.classList.remove("rotate-180");
});

// Close the dropdown if clicked outside
document.addEventListener("click", (event) => {
  if (
    !selectInput.contains(event.target) &&
    !dropdownOptions.contains(event.target)
  ) {
    dropdownOptions.classList.add("hidden");
    selectArrow.classList.remove("rotate-180");
  }
});

// FORM VALIDATION
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const prenom = prenomInput.value.trim();
  const nom = nomInput.value.trim();
  const phoneRaw = telephoneInput.value.trim();
  const dialCode = countryCodeSelect ? countryCodeSelect.value : "";
  const telephone = phoneRaw
    ? (dialCode ? `${dialCode} ${phoneRaw}` : phoneRaw)
    : "Non renseigné";
  const email = emailInputs.value.trim();
  const source = selectInput.dataset.value; // Utiliser la valeur sélectionnée

  let isValid = true;

  // Validation des champs obligatoires
  if (!prenom) {
    prenomError.style.display = "block";
    isValid = false;
  } else {
    prenomError.style.display = "none";
  }

  if (!nom) {
    nomError.style.display = "block";
    isValid = false;
  } else {
    nomError.style.display = "none";
  }

  if (!email || !isValidEmail(email)) {
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  if (!source) {
    selectError.style.display = "block";
    isValid = false;
  } else {
    selectError.style.display = "none";
  }

  // Si un champ est invalide, on stoppe la soumission
  if (!isValid) {
    return;
  }

  // Honeypot check (côté client)
  const honeypot = document.getElementById("honeypot");
  if (honeypot && honeypot.value) {
    return;
  }

  // Récupérer le token Turnstile
  const turnstileToken = turnstile.getResponse("#cf-turnstile");
  if (!turnstileToken) {
    Toastify({
      text: currentTranslations.recaptchaError,
      duration: 5000,
      gravity: "bottom",
      position: "right",
      avatar: "/assets/images/svg/error-icon.svg",
      stopOnFocus: true,
    }).showToast();
    return;
  }

  // Créer les données à envoyer (JSON → Pages Function /api/contact)
  const payload = {
    prenom,
    nom,
    telephone,
    email,
    source,
    source_tracking: sourceTracking,
    lang: document.documentElement.lang || "en",
    turnstileToken,
  };

  // Désactivez le bouton pour éviter les doubles soumissions
  const submitButton = event.target.querySelector("[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = currentTranslations.formSubmitLoading;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.ok) {
      // GA4: contact_form_submit (Key Event) — captures dropdown source + CTA origin
      if (typeof window.gtag === "function") {
        window.gtag("event", "contact_form_submit", {
          form_source: source || "unknown",
          cta_origin: window.__lastCtaOrigin || "unknown",
          lang: document.documentElement.lang || "en"
        });
      }

      form.reset();
      turnstile.reset("#cf-turnstile");

      // Masquer la sidebar
      sidebar.classList.remove("right-0");
      sidebar.classList.add("-right-full");
      document.body.classList.remove("overflow-hidden");

      Toastify({
        text: currentTranslations.formSubmitSuccess,
        duration: 5000,
        gravity: "bottom",
        position: "right",
        avatar: "/assets/images/svg/success-icon.svg",
        stopOnFocus: true,
      }).showToast();
    } else {
      Toastify({
        text: currentTranslations.formSubmitError,
        duration: 5000,
        gravity: "bottom",
        position: "right",
        avatar: "/assets/images/svg/error-icon.svg",
        stopOnFocus: true,
      }).showToast();
    }
  } catch (error) {
    console.error("Error:", error);

    Toastify({
      text: currentTranslations.connectionError,
      duration: 5000,
      gravity: "bottom",
      position: "right",
      avatar: "/assets/images/svg/error-icon.svg",
      stopOnFocus: true,
    }).showToast();
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = currentTranslations.contactButton;
  }
});

prenomInput.addEventListener("input", () => {
  if (prenomInput.value) {
    prenomError.style.display = "none";
  } else {
    prenomError.style.display = "block";
  }
});

nomInput.addEventListener("input", () => {
  if (nomInput.value) {
    nomError.style.display = "none";
  } else {
    nomError.style.display = "block";
  }
});
selectInput.addEventListener("select", () => {
  if (selectInput.value) {
    selectError.style.display = "none";
  } else {
    selectError.style.display = "block";
  }
});

emailInputs.addEventListener("input", () => {
  const emailValue = emailInputs.value.trim();

  if (!emailValue || !isValidEmail(emailValue)) {
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }
});

// FORM NEWSLETTER
document.addEventListener("DOMContentLoaded", () => {

  // Elements
  const emailInput = document.getElementById("emailInput");
  const subscribeButton = document.getElementById("subscribeButton");
  const errorText = document.getElementById("errorText");

  // Handle Email Input Validation
  emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value.trim();
    if (isValidEmail(emailValue)) {
      errorText.classList.add("hidden");
      emailInput.classList.remove("border-red-500");
    } else {
      errorText.classList.remove("hidden");
      emailInput.classList.add("border-red-500");
    }
  });

  // Handle Form Submission
  subscribeButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const emailValue = emailInput.value.trim();

    if (!isValidEmail(emailValue)) {
      errorText.classList.remove("hidden");
      emailInput.classList.add("border-red-500");
      return;
    }

    errorText.classList.add("hidden");
    emailInput.classList.remove("border-red-500");

    // Honeypot check
    const honeypotNewsletter = document.getElementById("honeypot-newsletter");
    if (honeypotNewsletter && honeypotNewsletter.value) {
      return;
    }

    // Turnstile check
    const turnstileToken = turnstile.getResponse("#cf-turnstile-newsletter");
    if (!turnstileToken) {
      return;
    }

    subscribeButton.disabled = true;
    subscribeButton.textContent = currentTranslations.subscribeLoading;

    // Créer les données à envoyer (JSON → Pages Function /api/newsletter)
    const payload = {
      email: emailValue,
      source_tracking: sourceTracking,
      lang: document.documentElement.lang || "en",
      turnstileToken,
    };

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.ok) {
        emailInput.value = "";
        turnstile.reset("#cf-turnstile-newsletter");

        Toastify({
          text: currentTranslations.subscribeSuccess,
          duration: 5000,
          gravity: "bottom",
          position: "right",
          avatar: "/assets/images/svg/success-icon.svg",
          stopOnFocus: true,
        }).showToast();
      } else {
        Toastify({
          text: currentTranslations.subscribeError,
          duration: 5000,
          gravity: "bottom",
          position: "right",
          avatar: "/assets/images/svg/error-icon.svg",
          stopOnFocus: true,
        }).showToast();
      }
    } catch (error) {
      console.error("Error:", error);

      Toastify({
        text: currentTranslations.connectionError,
        duration: 5000,
        gravity: "bottom",
        position: "right",
        avatar: "/assets/images/svg/error-icon.svg",
        stopOnFocus: true,
      }).showToast();
    } finally {
      subscribeButton.disabled = false;
      subscribeButton.textContent = currentTranslations.subscribeButton;
    }
  });
});

// EMAIL VALIDATION FUNCTION (GLOBAL)
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// FOOTER
let copyYear = document.querySelector("#year");
let year = new Date().getFullYear();
copyYear.textContent = year;

// BACK TO TOP
let mybutton = document.getElementById("back-top");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.classList.add("!block");
  } else {
    mybutton.classList.remove("!block");
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
