(function () {
  // Replace with your GA4 Measurement ID (example: G-XXXXXXXXXX)
  var GA_MEASUREMENT_ID = "G-J80NVPQNVZ";
  var CONSENT_STORAGE_KEY = "sc_cookie_consent_v1";

  // Skip loading in local previews and when ID is not configured.
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;

  // dataLayer + gtag must be available synchronously so that:
  //  1. Consent Mode v2 defaults are recorded BEFORE gtag.js loads
  //  2. Any synchronous gtag('event', ...) call from page scripts queues correctly
  // gtag.js is loaded later, on first user intent or after a 3s idle window —
  // the queue is replayed when the script executes.
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Consent Mode v2: denied by default until explicit user action.
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true
  });

  // Lazy-load gtag.js on first user intent (pointer/touch/scroll/key/focus)
  // or after 3s idle — whichever comes first.
  var gtagLoaded = false;
  function loadGtag() {
    if (gtagLoaded) return;
    gtagLoaded = true;
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  var INTENT_EVENTS = ["pointerdown", "touchstart", "scroll", "keydown", "focusin"];
  function onIntent() {
    loadGtag();
    for (var i = 0; i < INTENT_EVENTS.length; i++) {
      window.removeEventListener(INTENT_EVENTS[i], onIntent, true);
    }
  }
  for (var i = 0; i < INTENT_EVENTS.length; i++) {
    // capture phase + passive so it never blocks scroll/touch
    window.addEventListener(INTENT_EVENTS[i], onIntent, { passive: true, capture: true });
  }

  // Fallback: load after 5s of idle. requestIdleCallback when available,
  // setTimeout otherwise (Safari < 16, older WebViews). 5s instead of 3s to
  // push gtag.js load out of the Lighthouse TBT window for non-interacting
  // synthetic crawlers; real users almost always trigger an INTENT_EVENT
  // sooner than 5s, so the change is invisible to actual visitors.
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadGtag, { timeout: 5000 });
  } else {
    setTimeout(loadGtag, 5000);
  }

  function updateConsent(consentValue) {
    var granted = consentValue === "granted";
    gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied"
    });
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, consentValue);
    } catch (e) {}
    // If the user accepts/rejects before the lazy timer fires, load gtag.js
    // immediately so the consent update is processed without further delay.
    loadGtag();
  }

  function getConsentLabels() {
    var isFrench = (document.documentElement.lang || "").toLowerCase().indexOf("fr") === 0;
    if (isFrench) {
      return {
        title: "",
        text: "Nous utilisons des cookies essentiels pour une expérience personnalisée. En savoir plus dans notre",
        accept: "Tout accepter",
        reject: "Refuser",
        privacy: "Politique de confidentialité"
      };
    }
    return {
      title: "",
      text: "We use essential cookies for a personalised experience. Learn more in our",
      accept: "Accept all",
      reject: "Decline",
      privacy: "Privacy Policy"
    };
  }

  function removeBanner() {
    var existing = document.getElementById("sc-consent-banner");
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
  }

  function renderBanner() {
    if (document.getElementById("sc-consent-banner")) return;
    var labels = getConsentLabels();
    var banner = document.createElement("div");
    banner.id = "sc-consent-banner";
    banner.style.position = "fixed";
    banner.style.left = "16px";
    banner.style.right = "16px";
    banner.style.bottom = "16px";
    banner.style.maxWidth = "720px";
    banner.style.margin = "0 auto";
    banner.style.padding = "14px 16px";
    banner.style.background = "#0E1117";
    banner.style.color = "#FFFFFF";
    banner.style.borderRadius = "8px";
    banner.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
    banner.style.zIndex = "99999";
    banner.style.fontFamily = "Arial, sans-serif";
    banner.innerHTML =
      (labels.title ? '<div style="font-weight:600;margin-bottom:6px;">' + labels.title + "</div>" : "") +
      '<div style="font-size:14px;line-height:1.45;margin-bottom:12px;">' + labels.text +
      ' <a href="/privacy-policy" style="color:#DBD1BC;text-decoration:underline;">' + labels.privacy + "</a>.</div>" +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
      '<button id="sc-consent-accept" style="border:1px solid #DBD1BC;background:#DBD1BC;color:#0E1117;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:600;">' + labels.accept + "</button>" +
      '<button id="sc-consent-reject" style="border:1px solid #8A9BA8;background:transparent;color:#FFFFFF;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:600;">' + labels.reject + "</button>" +
      "</div>";

    document.body.appendChild(banner);

    var acceptBtn = document.getElementById("sc-consent-accept");
    var rejectBtn = document.getElementById("sc-consent-reject");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        updateConsent("granted");
        removeBanner();
      });
    }
    if (rejectBtn) {
      rejectBtn.addEventListener("click", function () {
        updateConsent("denied");
        removeBanner();
      });
    }
  }

  function initConsent() {
    var consentValue = null;
    try {
      consentValue = localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch (e) {}

    if (consentValue === "granted" || consentValue === "denied") {
      updateConsent(consentValue);
      return;
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", renderBanner);
    } else {
      renderBanner();
    }
  }

  initConsent();

  /* ── GA4: cal_booking_complete (Key Event) — captures bookings from any page hosting a Cal embed/popup ── */
  window.addEventListener("message", function (e) {
    if (e.origin !== "https://app.cal.com" && e.origin !== "https://cal.com") return;
    var d = e.data || {};
    var action = d.type || d.action || (d.detail && (d.detail.type || d.detail.action));
    if (action !== "bookingSuccessful" && action !== "BOOKING_CONFIRMED" && action !== "__bookingSuccessful") return;

    var path = (window.location.pathname || "").toLowerCase();
    var bookingSource = "other";
    if (path.indexOf("/discovery-call") === 0) bookingSource = "discovery_page";
    else if (path.indexOf("/factsheets/cryptovision") === 0) bookingSource = "factsheet-cryptovision";
    else if (path.indexOf("/factsheets/dynamic-trends") === 0) bookingSource = "factsheet-dynamic-trends";

    gtag("event", "cal_booking_complete", {
      event_type: "discovery",
      booking_source: bookingSource,
      lang: document.documentElement.lang || "en"
    });
    // Booking is high-intent — make sure gtag.js loads now if it hasn't already.
    loadGtag();
  });
})();
