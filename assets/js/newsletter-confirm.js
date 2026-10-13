// Newsletter confirmation page (double opt-in, 2026-10-13).
// The email's link carries the token in the URL fragment (#t=…): a fragment never reaches a server nor the analytics.
// Nothing happens on load — a security scanner that follows the link must not confirm in the person's place: only the
// click on the button POSTs the token to /api/newsletter-confirm. The fragment is taken off the address bar at once.
(function () {
  var token = "";
  var m = /(?:^#|&)t=([A-Za-z0-9_-]{20,128})(?:&|$)/.exec(window.location.hash || "");
  if (m) token = m[1];
  if (window.location.hash) {
    try { history.replaceState(null, "", window.location.pathname); } catch (e) {}
  }

  function t(key) {
    var lang = (typeof currentLang !== "undefined" && translations[currentLang]) ? currentLang : "en";
    return translations[lang][key] || translations.en[key] || "";
  }

  var box = document.getElementById("nl-confirm-message");
  var button = document.getElementById("nl-confirm-button");
  var back = document.getElementById("nl-confirm-back");

  function show(key, done) {
    box.setAttribute("data-i18n", key);      // the language toggle keeps the message in the chosen language
    box.textContent = t(key);
    if (done) {          // Tailwind classes: « flex » would win over the hidden attribute
      button.classList.add("hidden");
      back.classList.remove("hidden");
      back.classList.add("flex");
    }
  }

  if (!token) {
    show("nlConfirmInvalid", true);
    return;
  }

  button.addEventListener("click", function () {
    button.disabled = true;
    button.setAttribute("data-i18n", "nlConfirmWorking");
    button.textContent = t("nlConfirmWorking");
    fetch("/api/newsletter-confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ token: token }),
    })
      .then(function (r) { return r.json().catch(function () { return { status: "retry" }; }); })
      .then(function (data) {
        var status = data && data.status;
        var key = {
          confirmed: "nlConfirmDone", already: "nlConfirmAlready", expired: "nlConfirmExpired",
          invalid: "nlConfirmInvalid", refused: "nlConfirmRefused",
        }[status] || "nlConfirmRetry";
        if (key === "nlConfirmRetry") {
          show(key, false);
          button.disabled = false;
          button.setAttribute("data-i18n", "nlConfirmButton");
          button.textContent = t("nlConfirmButton");
          return;
        }
        if (status === "confirmed" && typeof window.gtag === "function") {
          window.gtag("event", "newsletter_confirm", { lang: document.documentElement.lang || "en" });
        }
        show(key, true);
      })
      .catch(function () {
        show("nlConfirmRetry", false);
        button.disabled = false;
        button.setAttribute("data-i18n", "nlConfirmButton");
        button.textContent = t("nlConfirmButton");
      });
  });
})();
