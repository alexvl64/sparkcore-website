// Privacy Policy page — translations & language logic

const ppTranslations = {
  fr: {
    ppLabel: "Politique de confidentialité",
    ppTitle: "Politique de confidentialité & RGPD",
    ppIntro: "SparkCore.investment OÜ s'engage à protéger les données personnelles des personnes qui interagissent avec notre site. Ce document décrit la manière dont nous collectons, utilisons et protégeons ces données, en conformité avec le Règlement Général sur la Protection des Données (RGPD) (UE) 2016/679.",
    ppLastUpdated: "Dernière mise à jour : mars 2026",
    pp1Title: "1. Responsable du traitement",
    pp1Text: "Le responsable du traitement des données est :",
    pp1Address: "<strong>SparkCore.investment OÜ</strong><br>Männimäe 1, Pudisoo, 74626, Estonie<br>Code d'enregistrement : 16265864<br>E-mail : <!--email_off--><a href='mailto:contact@sparkcore.fund'>contact@sparkcore.fund</a><!--email_on-->",
    pp1Reg: "SparkCore.investment OÜ est enregistrée en tant que gestionnaire de fonds d'investissement alternatif de petite taille auprès de l'Autorité de surveillance financière estonienne (Finantsinspektsioon) et détient une licence d'Institution Financière délivrée par l'Unité de renseignement financier estonienne (FIU). Enregistrement : <a href='https://www.fi.ee/en/guides/fund-management-companies/investment-market/small-fund-managers-without-activity-licence/sparkcoreinvestment-ou' target='_blank' rel='noopener noreferrer'>Registre EFSA</a>.",
    pp2Title: "2. Données collectées",
    pp2Intro: "Nous collectons uniquement les données que vous nous communiquez volontairement via les deux canaux suivants :",
    pp2ColChannel: "Canal",
    pp2ColData: "Données collectées",
    pp2ColBasis: "Base légale",
    pp2Row1Channel: "Inscription à la newsletter",
    pp2Row1Data: "Adresse e-mail",
    pp2Row1Basis: "Consentement (Art. 6(1)(a) RGPD)",
    pp2Row2Channel: "Formulaire de contact",
    pp2Row2Data: "Prénom, nom, adresse e-mail, numéro de téléphone (optionnel), source de référencement",
    pp2Row2Basis: "Intérêt légitime — communication précontractuelle (Art. 6(1)(b) et (f) RGPD)",
    pp2NoMore: "Nous ne collectons aucune autre donnée personnelle via notre site. Nous n'utilisons pas de pixels de tracking, de systèmes de publicité ciblée ni aucune forme de profilage comportemental.",
    pp3Title: "3. Finalités du traitement",
    pp3Item1: "<strong>Newsletter :</strong> envoi d'analyses mensuelles du marché des crypto-actifs aux abonnés ayant explicitement donné leur consentement.",
    pp3Item2: "<strong>Formulaire de contact :</strong> traitement des demandes d'investisseurs ou de partenaires potentiels et engagement d'un dialogue précontractuel.",
    pp3NoSell: "Vos données ne sont jamais vendues, louées ni transmises à des tiers à des fins commerciales ou marketing. Elles sont utilisées exclusivement aux fins décrites ci-dessus.",
    pp4Title: "4. Durée de conservation",
    pp4ColType: "Type de données",
    pp4ColPeriod: "Durée de conservation",
    pp4Row1Type: "Adresse e-mail newsletter",
    pp4Row1Period: "Jusqu'à désinscription ou demande de suppression",
    pp4Row2Type: "Données formulaire de contact",
    pp4Row2Period: "3 ans à compter du dernier échange, sauf établissement d'une relation contractuelle",
    pp4Row3Type: "Dossier investisseur (si onboarding)",
    pp4Row3Period: "10 ans minimum — obligation réglementaire AML/KYC (MLTFPA)",
    pp5Title: "5. Services tiers",
    pp5Intro: "Notre site utilise deux services tiers susceptibles de traiter des données techniques :",
    pp5RecaptchaDesc: "utilisé sur le formulaire de contact et l'inscription à la newsletter pour prévenir les soumissions automatisées. Cloudflare peut collecter l'adresse IP et des signaux de navigation à des fins de détection de bots. Aucun profilage comportemental ni usage publicitaire. Ce service est régi par la <a href='https://www.cloudflare.com/privacypolicy/' target='_blank' rel='noopener noreferrer'>Politique de confidentialité de Cloudflare</a>. Base légale : intérêt légitime à la sécurité du site (Art. 6(1)(f) RGPD).",
    pp5CronitorDesc: "service de surveillance des performances utilisé pour mesurer les performances techniques de notre site (temps de chargement, erreurs). Il ne collecte pas de données d'identité personnelle. Les données sont traitées conformément à la <a href='https://cronitor.io/privacy' target='_blank' rel='noopener noreferrer'>Politique de confidentialité de Cronitor</a>. Base légale : intérêt légitime à la performance du site (Art. 6(1)(f) RGPD).",
    pp5NoCookieBanner: "Notre site utilise Google Analytics 4 afin de mesurer l'audience. Conformément à Consent Mode v2, les signaux analytiques ne sont activés qu'après votre consentement via la bannière de cookies affichée lors de votre visite.",
    pp6Title: "6. Vos droits au titre du RGPD",
    pp6Intro: "En tant que personne concernée, vous disposez des droits suivants :",
    pp6R1: "<strong>Droit d'accès</strong> — obtenir confirmation du traitement de vos données et en recevoir une copie.",
    pp6R2: "<strong>Droit de rectification</strong> — demander la correction de données inexactes ou incomplètes.",
    pp6R3: "<strong>Droit à l'effacement</strong> — demander la suppression de vos données, sous réserve des obligations légales de conservation.",
    pp6R4: "<strong>Droit à la limitation</strong> — demander la suspension temporaire du traitement de vos données.",
    pp6R5: "<strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré et lisible par machine.",
    pp6R6: "<strong>Droit d'opposition</strong> — vous opposer au traitement fondé sur l'intérêt légitime, y compris à des fins de prospection commerciale.",
    pp6R7: "<strong>Droit de retrait du consentement</strong> — retirer votre consentement à la newsletter à tout moment via le lien de désinscription présent dans chaque e-mail.",
    pp6HowTo: "Pour exercer l'un de ces droits, contactez-nous à : <!--email_off--><a href='mailto:contact@sparkcore.fund'>contact@sparkcore.fund</a><!--email_on-->. Nous répondrons dans un délai de 30 jours.",
    pp7Title: "7. Autorité de contrôle",
    pp7Text: "Vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente. En Estonie, il s'agit de l'<a href='https://www.aki.ee/en' target='_blank' rel='noopener noreferrer'>Inspection estonienne de la protection des données (Andmekaitse Inspektsioon — AKI)</a>. Vous pouvez également contacter l'autorité de contrôle de votre pays de résidence au sein de l'UE.",
    pp8Title: "8. Sécurité des données",
    pp8Text: "SparkCore met en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données personnelles contre tout accès non autorisé, perte ou divulgation. Toute transmission de données via notre site est chiffrée par TLS. L'accès aux données collectées est strictement limité au personnel autorisé.",
    pp9Title: "9. Mises à jour de cette politique",
    pp9Text: "Cette politique peut être mise à jour pour refléter l'évolution de nos pratiques ou de la réglementation applicable. La date de dernière révision est indiquée en haut de cette page. Nous vous encourageons à consulter régulièrement ce document.",
    ppBack: "← Retour à l'accueil",
    footerCopyright: " SparkCore.investment OÜ — Tous droits réservés.",
    footerRegText: "Société de gestion spécialisée dans les crypto-actifs, enregistrée en Estonie. Supervisée par la Finantsinspektsioon :",
    footerLicenceLabel: "Licence :",
    footerLicenceLink: "EFIU (Institution Financière)",
    footerDisclaimerLabel: "Avertissement :",
    footerWarning: "Les performances passées ne garantissent pas les performances futures. Les crypto-actifs présentent un risque élevé, incluant un risque de perte totale. Ce site et les graphiques de performance sont fournis à titre informatif uniquement et ne constituent pas une offre d'investissement. Les fonds SparkCore sont commercialisés auprès d'investisseurs professionnels. Veuillez évaluer votre situation personnelle et obtenir un avis indépendant avant d'investir.",
    footerPrivacyLink: "Politique de confidentialité",
    footerRegLink: "Informations réglementaires",
    footerWlLink: "Solution white label",
  },
  en: {
    ppLabel: "Privacy Policy",
    ppTitle: "Privacy Policy & GDPR",
    ppIntro: "SparkCore.investment OÜ is committed to protecting the personal data of individuals who interact with our website. This document describes how we collect, use and protect that data, in compliance with the General Data Protection Regulation (EU) 2016/679 (GDPR).",
    ppLastUpdated: "Last updated: March 2026",
    pp1Title: "1. Data Controller",
    pp1Text: "The data controller is:",
    pp1Address: "<strong>SparkCore.investment OÜ</strong><br>Männimäe 1, Pudisoo, 74626, Estonia<br>Registry code: 16265864<br>Email: <!--email_off--><a href='mailto:contact@sparkcore.fund'>contact@sparkcore.fund</a><!--email_on-->",
    pp1Reg: "SparkCore.investment OÜ is registered as a small alternative investment fund manager with the Estonian Financial Supervision Authority (Finantsinspektsioon) and holds a Financial Institution licence issued by the Estonian Financial Intelligence Unit (FIU). Registration: <a href='https://www.fi.ee/en/guides/fund-management-companies/investment-market/small-fund-managers-without-activity-licence/sparkcoreinvestment-ou' target='_blank' rel='noopener noreferrer'>EFSA register</a>.",
    pp2Title: "2. Data We Collect",
    pp2Intro: "We collect only the data you voluntarily provide through the following two channels:",
    pp2ColChannel: "Channel",
    pp2ColData: "Data collected",
    pp2ColBasis: "Legal basis",
    pp2Row1Channel: "Newsletter subscription",
    pp2Row1Data: "Email address",
    pp2Row1Basis: "Consent (Art. 6(1)(a) GDPR)",
    pp2Row2Channel: "Contact form",
    pp2Row2Data: "First name, last name, email address, phone number (optional), referral source",
    pp2Row2Basis: "Legitimate interest — pre-contractual communication (Art. 6(1)(b) and (f) GDPR)",
    pp2NoMore: "We do not collect any other personal data through our website. We do not use tracking pixels, targeted advertising systems, or any form of behavioural profiling.",
    pp3Title: "3. Purpose of Processing",
    pp3Item1: "<strong>Newsletter:</strong> sending monthly analysis of the crypto-asset market to subscribers who have explicitly opted in.",
    pp3Item2: "<strong>Contact form:</strong> handling enquiries from prospective investors or partners and initiating a pre-contractual dialogue.",
    pp3NoSell: "Your data is never sold, rented or transferred to third parties for commercial or marketing purposes. It is used solely for the purposes described above.",
    pp4Title: "4. Data Retention",
    pp4ColType: "Data type",
    pp4ColPeriod: "Retention period",
    pp4Row1Type: "Newsletter email address",
    pp4Row1Period: "Until unsubscription or deletion request",
    pp4Row2Type: "Contact form data",
    pp4Row2Period: "3 years from last exchange, unless a contractual relationship is established",
    pp4Row3Type: "Investor file (if onboarding)",
    pp4Row3Period: "10 years minimum — AML/KYC regulatory obligation (MLTFPA)",
    pp5Title: "5. Third-Party Services",
    pp5Intro: "Our website uses two third-party services that may process technical data:",
    pp5RecaptchaDesc: "used on the contact form and newsletter subscription to prevent automated submissions. Cloudflare may collect IP address and browser signals for bot detection purposes. No behavioural profiling or advertising use. This service is governed by Cloudflare's <a href='https://www.cloudflare.com/privacypolicy/' target='_blank' rel='noopener noreferrer'>Privacy Policy</a>. Legal basis: legitimate interest in website security (Art. 6(1)(f) GDPR).",
    pp5CronitorDesc: "real user monitoring service used to measure technical performance of our website (page load times, errors). It does not collect personal identity data. Data is processed in accordance with <a href='https://cronitor.io/privacy' target='_blank' rel='noopener noreferrer'>Cronitor's Privacy Policy</a>. Legal basis: legitimate interest in website performance (Art. 6(1)(f) GDPR).",
    pp5NoCookieBanner: "Our website uses Google Analytics 4 to measure audience usage. In line with Consent Mode v2, analytics signals are only enabled after your consent via the cookie consent banner displayed on your visit.",
    pp6Title: "6. Your Rights Under GDPR",
    pp6Intro: "As a data subject, you have the following rights:",
    pp6R1: "<strong>Right of access</strong> — obtain confirmation of whether we process your data and receive a copy.",
    pp6R2: "<strong>Right to rectification</strong> — request correction of inaccurate or incomplete data.",
    pp6R3: "<strong>Right to erasure</strong> — request deletion of your data, subject to legal retention obligations.",
    pp6R4: "<strong>Right to restriction</strong> — request that we temporarily limit processing of your data.",
    pp6R5: "<strong>Right to data portability</strong> — receive your data in a structured, machine-readable format.",
    pp6R6: "<strong>Right to object</strong> — object to processing based on legitimate interest, including for direct marketing purposes.",
    pp6R7: "<strong>Right to withdraw consent</strong> — withdraw newsletter consent at any time via the unsubscribe link in each email.",
    pp6HowTo: "To exercise any of these rights, contact us at: <!--email_off--><a href='mailto:contact@sparkcore.fund'>contact@sparkcore.fund</a><!--email_on-->. We will respond within 30 days.",
    pp7Title: "7. Supervisory Authority",
    pp7Text: "You have the right to lodge a complaint with the competent supervisory authority. In Estonia, this is the <a href='https://www.aki.ee/en' target='_blank' rel='noopener noreferrer'>Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon — AKI)</a>. You may also contact the supervisory authority of your country of residence within the EU.",
    pp8Title: "8. Data Security",
    pp8Text: "SparkCore implements appropriate technical and organisational measures to protect personal data against unauthorised access, loss or disclosure. All data transmission via our website is encrypted using TLS. Access to collected data is strictly limited to authorised personnel.",
    pp9Title: "9. Updates to This Policy",
    pp9Text: "This policy may be updated to reflect changes in our practices or applicable law. The date of the last revision is indicated at the top of this page. We encourage you to review this policy periodically.",
    ppBack: "← Back to homepage",
    footerCopyright: " SparkCore.investment OÜ — All rights reserved.",
    footerRegText: "Asset management company specialising in crypto-assets, registered in Estonia. Supervised by Finantsinspektsioon:",
    footerLicenceLabel: "Licence:",
    footerLicenceLink: "EFIU (Financial Institution)",
    footerDisclaimerLabel: "Disclaimer:",
    footerWarning: "Past performance does not guarantee future results. Crypto-assets carry a high level of risk, including the risk of total loss. This website and performance charts are provided for informational purposes only and do not constitute an investment offer. SparkCore funds are marketed to professional investors. Please assess your personal situation and seek independent advice before investing.",
    footerPrivacyLink: "Privacy Policy",
    footerRegLink: "Regulatory information",
    footerWlLink: "White-label solution",
  }
};

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (ppTranslations[lang] && ppTranslations[lang][key] !== undefined) {
      el.innerHTML = ppTranslations[lang][key];
    }
  });
  ['', '-footer', '-footer-mobile'].forEach(function(suffix) {
    var btnEn = document.getElementById('btn-en' + suffix);
    var btnFr = document.getElementById('btn-fr' + suffix);
    if (btnEn) { btnEn.classList.toggle('active', lang === 'en'); btnEn.setAttribute('aria-pressed', String(lang === 'en')); }
    if (btnFr) { btnFr.classList.toggle('active', lang === 'fr'); btnFr.setAttribute('aria-pressed', String(lang === 'fr')); }
  });
  document.getElementById('html-root').lang = lang;
}

function setLang(lang) {
  try { localStorage.setItem('sc_lang', lang); } catch(e) {}
  applyTranslations(lang);
}

// Init
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('year').textContent = new Date().getFullYear();

  var savedLang = null;
  try { savedLang = localStorage.getItem('sc_lang'); } catch(e) {}
  var browserLang = (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  var initLang = savedLang || browserLang;
  applyTranslations(initLang);
});
