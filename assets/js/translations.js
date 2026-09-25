const translations = {
  fr: {
    // === FORM / UI (existing keys) ===
    recaptchaError: "Veuillez valider le contrôle de sécurité pour continuer.",
    formSubmitLoading: "Envoi en cours...",
    formSubmitSuccess: "Votre message a bien été envoyé.",
    formSubmitError: "Une erreur est survenue. Veuillez réessayer.",
    formValidationError: "Veuillez entrer une adresse e-mail valide.",
    subscribeLoading: "Envoi en cours...",
    subscribeSuccess: "Inscription confirmée. Merci.",
    subscribeError: "Une erreur est survenue. Veuillez réessayer.",
    connectionError: "Impossible d'envoyer le message. Vérifiez votre connexion.",
    contactButton: "Nous contacter",
    subscribeButton: "S'abonner",
    footerYear: "Tous droits réservés",

    // === NAVIGATION ===
    navContact: "Nous contacter",
    navArticles: "Articles",
    navPortal: "Espace investisseur",

    // === SIDEBAR FORM ===
    sidebarTitle: "En savoir plus sur SparkCore ?",
    sidebarFirstName: "Prénom *",
    sidebarFirstNamePlaceholder: "Votre prénom",
    sidebarLastName: "Nom *",
    sidebarLastNamePlaceholder: "Votre nom",
    sidebarPhone: "Téléphone",
    sidebarPhonePlaceholder: "Votre numéro de téléphone",
    sidebarEmail: "Adresse e-mail *",
    sidebarEmailPlaceholder: "Votre adresse e-mail",
    sidebarHowKnow: "Comment nous avez-vous connu ? *",
    sidebarSelectPlaceholder: "Choisissez une option",
    sidebarOpt1: "Communauté d'Alexandre VINAL (Cointips)",
    sidebarOpt2: "DSM (anciens clients ou clients)",
    sidebarOpt4: "Recherche en ligne",
    sidebarOpt5: "Réseaux sociaux (LinkedIn, etc.)",
    sidebarOpt6: "Recommandation d'un proche",
    sidebarOpt7: "Événements ou conférences",
    sidebarOpt8: "Autre",
    sidebarFieldRequired: "Veuillez remplir ce champ obligatoire.",
    sidebarSubmit: "Nous contacter",

    // === HERO ===
    heroLatestArticle: "<span class=\"hero-latest-badge__label\">Nouveau</span><span class=\"hero-latest-badge__title\">STRC à 11,5 % : pourquoi ce rendement sous-rémunère le risque</span><span class=\"hero-latest-badge__arrow\" aria-hidden=\"true\">→</span>",
    heroTitle: "Stratégies institutionnelles <span class=\"block\">sur les actifs numériques</span>",
    heroTagline: "Trois approches distinctes. Un cadre réglementé. Conçu pour les investisseurs qui exigent la rigueur.",
    heroCtaPrimary: "Planifier un appel →",
    heroCtaSecondary: "Demander la documentation",
    heroCommentaryLink: "Lire notre dernier commentaire de marché →",

    // === OUR APPROACH ===
    approachTitle: "Notre approche",
    approachSubtitle: "Une exposition disciplinée aux marchés des actifs numériques — avec la rigueur opérationnelle attendue des gérants alternatifs institutionnels.",
    approachP1Title: "Disciplinée",
    approachP1: "Chaque stratégie opère avec des objectifs de risque explicites, un dimensionnement de position systématique et un noyau défensif algorithmique indépendant.",
    approachP2Title: "Transparente",
    approachP2: "Lettres mensuelles aux investisseurs, VL quotidienne, comptabilité tenue par un cabinet Big Four et espace investisseur sécurisé.",
    approachP3Title: "Réglementée",
    approachP3: "Structure AIF estonienne supervisée par la Finantsinspektsioon — le même cadre opérationnel que les gestionnaires alternatifs traditionnels.",

    // === FUNDS SECTION ===
    fundsTitle: "Nos stratégies d'investissement en actifs numériques",
    fundsParagraph: "Trois fonds complémentaires — <span class=\"text-darkGray font-medium\">Dynamic Trends, CryptoVision et Equinoxe</span> — conçus pour répondre à différents profils de risque dans un cadre de gestion institutionnel et réglementé.",

    // === DYNAMIC TRENDS CARD ===
    dtRisk: "Risque élevé (maîtrisé)",
    dtPitch: "Synthèse",
    dtPitchText: "Une stratégie directionnelle optimisée pour surperformer le Bitcoin.",
    dtObjective: "Objectif",
    dtObjectiveText: "Surperformer le Bitcoin sur le moyen / long terme en captant les grandes tendances haussières tout en limitant les phases correctives.",
    dtOffensiveBlock: "Bloc Offensif",
    dtOffensiveBlockText: "Bloc principal — exposition directionnelle Bitcoin avec levier modéré (max 2x), strictement encadré.",
    dtDefensiveBlock: "Bloc Défensif",
    dtDefensiveBlockText: "Bloc minoritaire — stratégies neutres, arbitrages systémiques, modèles quantitatifs à drawdown contrôlé.",
    dtFactsheet: "Demander la factsheet",

    // === CRYPTOVISION CARD ===
    cvRisk: "Risque modéré",
    cvPitch: "Synthèse",
    cvPitchText: "Une stratégie défensive et disciplinée sur les crypto-actifs majeurs.",
    cvObjective: "Objectif",
    cvObjectiveText: "Offrir une performance régulière avec une volatilité maîtrisée et un drawdown limité, même lors des phases d'instabilité du marché.",
    cvDefensiveBlock: "Bloc Défensif",
    cvDefensiveBlockText: "Bloc principal — stratégies neutres au marché, arbitrages systémiques, modèles quantitatifs. Aucun effet de levier directionnel.",
    cvOffensiveBlock: "Bloc Offensif",
    cvOffensiveBlockText: "Bloc minoritaire — exposition dynamique sur Bitcoin, Ethereum et crypto-actifs liquides. Levier modéré, strictement encadré.",
    cvFactsheet: "Demander la factsheet",

    // === EQUINOXE CARD ===
    eqRisk: "Risque faible",
    eqLaunch: "Lancement prévu en 2026",
    eqPitch: "Synthèse",
    eqPitchText: "Stratégie neutre — rendement régulier, indépendant de la direction du marché.",
    eqObjective: "Objectif",
    eqObjectiveText: "Générer une performance stable et faiblement volatile, sans prise de risque directionnel, quel que soit le contexte de marché.",
    eqDeltaNeutralText: "Arbitrage sur dérivés — exploite les écarts entre spot et futures/taux de financement. Exposition nette proche de zéro.",
    eqBetaNeutralText: "Pairs trading & arbitrage statistique — long/short sur actifs corrélés pour profiter de leur convergence.",
    eqFactsheetNote: "Factsheet disponible à l'ouverture du fonds.",

    // === PERFORMANCE SECTION ===
    perfTitle: "Évolution de la performance",
    perfDisclaimer: "Le fonds Dynamic Trends est opérationnel depuis le 1er août 2025. Les performances antérieures proviennent de stratégies réelles exécutées sur comptes gérés, sans aucun backtest. Les performances passées ne garantissent pas les performances futures.",

    // === TEAM ===
    teamTitle: "Rencontrez notre équipe",
    teamRoleOlivier: "Associé gérant · Trading & stratégie",
    teamRoleAlex: "Associé gérant · Systèmes & risques",
    govTitle: "Gouvernance",
    govBody: "SparkCore.investment OÜ est supervisée par la Finantsinspektsioon (autorité estonienne de surveillance financière) au titre du régime des gestionnaires de petite taille. La gestion des fonds est assurée par Olivier Sayegh et Alexandre Vinal.",
    govBoardLabel: "Management Board",
    govAmlLabel: "Supervision LCB-FT",
    govAml: "Double MLRO : un responsable interne enregistré auprès de la FIU et un responsable externe spécialisé crypto-actifs.",
    teamBioOlivier: "Actif dans le trading depuis plus de vingt ans, Olivier a commencé sur les marchés actions avant de se tourner vers les crypto-actifs en 2017. Cofondateur de DSM, il utilise une méthodologie combinant analyse technique et stratégies innovantes pour optimiser les performances des portefeuilles.",
    teamBioAlex: "Ingénieur en informatique, Alexandre investit dans les crypto-actifs depuis 2014. Fondateur de la chaîne YouTube Cointips en 2017 et co-fondateur de DSM en 2020, il dirige également une communauté privée d'investisseurs en crypto-actifs.",

    // === NEWSLETTER ===
    newsletterTitle: "Abonnez-vous à notre newsletter",
    newsletterSubtitle: "Recevez chaque mois une analyse approfondie du marché des crypto-actifs.",
    newsletterPlaceholder: "Votre e-mail",
    newsletterButton: "S'abonner",
    newsletterError: "Veuillez entrer une adresse e-mail valide.",
    newsletterConsent: "En vous abonnant, vous consentez à recevoir notre newsletter mensuelle. Aucune donnée n'est transmise à des tiers. Vous pouvez vous désabonner à tout moment. <a href=\"/privacy-policy\" class=\"underline underline-offset-2 hover:text-white transition-colors duration-200\">Politique de confidentialité</a>.",
    newsletterConsentLink: "Politique de confidentialité",

    // === INVEST SECTION ===
    investTitle: "Investissez avec nous",
    investText: "Nos fonds sont commercialisés auprès d'investisseurs professionnels. D'autres investisseurs peuvent, sous conditions, y accéder dans les limites du régime estonien. Le capital minimum par investisseur est de 50 000 €, en EUR, USD ou stablecoins réglementés. La VL est calculée quotidiennement ; les rachats sont traités chaque trimestre.",
    investStep1: "Demander des informations",
    investStep2: "Nous vous contacterons avec plus de détails",
    investStep3: "Signer les documents nécessaires",
    investStep4: "Devenez investisseur",

    // === WHITE LABEL SECTION ===
    wlSubtitle: "Services aux gestionnaires",
    wlTitle: "Solution Marque Blanche",
    wlIntro: "SparkCore met à disposition son infrastructure réglementée pour permettre à des gestionnaires tiers de lancer leur propre fonds d'investissement alternatif.",
    wlWhatTitle: "Ce que SparkCore apporte",
    wlItem1Title: "Gestionnaire de fonds enregistré",
    wlItem1Desc: "Enregistré auprès de la Finantsinspektsioon (EFSA) — régime Small Fund Manager supervisé. Licence Institution Financière délivrée par l'EFIU (KYC/AML).",
    wlItem2Title: "Structuration juridique complète",
    wlItem2Desc: "Création du véhicule de fonds (usaldusfond), rédaction des documents réglementaires (Accord de partenariat, Contrat de souscription, Demande de rachat de parts).",
    wlItem3Title: "Infrastructure opérationnelle",
    wlItem3Desc: "Accès aux plateformes (Binance, Kraken, OKX, ByBit), accès bancaire EUR/USD — SEPA & SWIFT, sécurité multisignature, logiciel de gestion NAV/performance.",
    wlItem4Title: "Comptabilité & reporting",
    wlItem4Desc: "Comptabilité assurée par un cabinet membre du Big Four. Production et envoi du reporting investisseurs. Reporting réglementaire EFSA et Banque Centrale d'Estonie. Calcul automatique des frais et de la NAV.",
    wlItem5Title: "Fiscalité favorable",
    wlItem5Desc: "Pas d'imposition au niveau du fonds. Aucune retenue à la source sur les distributions aux investisseurs étrangers.",
    wlDays: "jours",
    wlDaysDesc: "De la décision à l'ouverture du fonds aux souscriptions. Certaines plateformes peuvent nécessiter un délai supplémentaire selon leurs procédures KYB internes.",
    wlYourTitle: "Ce que vous gérez",
    wlStrategy: "Stratégie",
    wlStrategyDesc: "Définition et exécution de la politique d'investissement du fonds.",
    wlFundraising: "Levée de fonds",
    wlFundraisingDesc: "Relation investisseurs et commercialisation du fonds.",
    wlCommentary: "Commentaire de gestion",
    wlCommentaryDesc: "Vous fournissez à SparkCore un commentaire périodique intégré au reporting transmis à vos investisseurs.",
    wlRegTitle: "Cadre réglementaire",
    wlReg1: "FIA structuré sous droit estonien (usaldusfond)",
    wlReg2: "Investisseurs qualifiés / accrédités (sans limite) et jusqu'à 149 retail par pays UE",
    wlReg3: "Double dispositif MLRO : interne (enregistré FIU) + externe spécialisé crypto, en contact direct avec les investisseurs.",
    wlReg4: "Conforme AML 5 / AML 6 — SparkCore comme représentant réglementaire officiel",

    // === FOOTER ===
    footerCopyright: " SparkCore.investment OÜ — Tous droits réservés.",
    footerRegText: "Société de gestion spécialisée dans les crypto-actifs, enregistrée en Estonie. Supervisée par la Finantsinspektsioon :",
    footerLicenceLabel: "Licence :",
    footerLicenceLink: "EFIU (Institution Financière)",
    footerAddress: "N° d'enregistrement : 16265864 — Männimäe 1, Pudisoo, 74626 comté de Harju, Estonie",
    footerDisclaimerLabel: "Avertissement :",
    footerWarning: "Les performances passées ne garantissent pas les performances futures. Les crypto-actifs présentent un risque élevé, incluant un risque de perte totale. Ce site et les graphiques de performance sont fournis à titre informatif uniquement et ne constituent pas une offre d'investissement. Nos fonds sont commercialisés auprès d'investisseurs professionnels ; d'autres investisseurs peuvent, sous conditions, y accéder dans les limites du régime estonien. Investissement minimum : 50 000 €. Veuillez évaluer votre situation personnelle et obtenir un avis indépendant avant d'investir.",
    footerPrivacyLink: "Politique de confidentialité",
    footerInsightsLink: "Articles",

    // === VALIDATION PAGE ===
    validationTitle: "Vérification complétée",
    validationSubtitle: "Merci d'avoir complété le processus de vérification.",
    validationBody: "Votre soumission est en cours d'examen. Vous recevrez sous peu un e-mail de confirmation si votre vérification est validée, accompagné des instructions pour finaliser votre investissement.",
    validationContact: "Nous contacter",

    // === ERROR PAGES ===
    error404Title: "Page introuvable",
    error404Subtitle: "La page que vous cherchez n'existe pas ou a été déplacée.",
    error500Title: "Erreur serveur",
    error500Subtitle: "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement.",
    error403Title: "Accès refusé",
    error403Subtitle: "Vous n'avez pas l'autorisation d'accéder à cette page.",
    errorBackHome: "Retour à l'accueil",
  },

  en: {
    // === FORM / UI (existing keys) ===
    recaptchaError: "Please complete the security check to proceed.",
    formSubmitLoading: "Sending...",
    formSubmitSuccess: "Your message has been successfully sent.",
    formSubmitError: "An error occurred. Please try again.",
    formValidationError: "Please enter a valid email address.",
    subscribeLoading: "Sending...",
    subscribeSuccess: "Subscription confirmed. Thank you.",
    subscribeError: "An error occurred. Please try again.",
    connectionError: "Unable to send the message. Please check your connection.",
    contactButton: "Contact Us",
    subscribeButton: "Subscribe",
    footerYear: "All rights reserved",

    // === NAVIGATION ===
    navContact: "Contact Us",
    navArticles: "Articles",
    navPortal: "Investor login",

    // === SIDEBAR FORM ===
    sidebarTitle: "Learn more about SparkCore?",
    sidebarFirstName: "First name *",
    sidebarFirstNamePlaceholder: "Your first name",
    sidebarLastName: "Last name *",
    sidebarLastNamePlaceholder: "Your last name",
    sidebarPhone: "Phone",
    sidebarPhonePlaceholder: "Your phone number",
    sidebarEmail: "Email address *",
    sidebarEmailPlaceholder: "Your email address",
    sidebarHowKnow: "How did you hear about us? *",
    sidebarSelectPlaceholder: "Select an option",
    sidebarOpt1: "Alexandre VINAL's community (Cointips)",
    sidebarOpt2: "DSM (past or current clients)",
    sidebarOpt4: "Online search",
    sidebarOpt5: "Social media (LinkedIn, etc.)",
    sidebarOpt6: "Referral by a contact",
    sidebarOpt7: "Events or conferences",
    sidebarOpt8: "Other",
    sidebarFieldRequired: "Please fill in this required field.",
    sidebarSubmit: "Contact Us",

    // === HERO ===
    heroLatestArticle: "<span class=\"hero-latest-badge__label\">New</span><span class=\"hero-latest-badge__title\">AIF vs AIFM: What's the Difference for Crypto Funds</span><span class=\"hero-latest-badge__arrow\" aria-hidden=\"true\">→</span>",
    heroTitle: "Institutional-grade strategies <span class=\"block\">in digital assets</span>",
    heroTagline: "Three distinct approaches. One regulated framework. Managed for investors who demand precision.",
    heroCtaPrimary: "Schedule a Discovery Call →",
    heroCtaSecondary: "Request Documentation",
    heroCommentaryLink: "Read our latest market commentary →",

    // === OUR APPROACH ===
    approachTitle: "Our approach",
    approachSubtitle: "Disciplined, regulated exposure to digital asset markets — with the operational rigour you expect from institutional alternative managers.",
    approachP1Title: "Disciplined",
    approachP1: "Each strategy operates with explicit risk targets, systematic position-sizing, and an independent algorithmic defensive core.",
    approachP2Title: "Transparent",
    approachP2: "Monthly investor letters, daily NAV, accounting by a Big Four firm, and a secure investor portal.",
    approachP3Title: "Regulated",
    approachP3: "Estonian AIF structure supervised by Finantsinspektsioon — the same operational framework as traditional alternative asset managers.",

    // === FUNDS SECTION ===
    fundsTitle: "Our digital asset investment strategies",
    fundsParagraph: "Three complementary funds — <span class=\"text-darkGray font-medium\">Dynamic Trends, CryptoVision and Equinoxe</span> — designed for different risk profiles within a regulated institutional management framework.",

    // === DYNAMIC TRENDS CARD ===
    dtRisk: "High (controlled) risk",
    dtPitch: "Summary",
    dtPitchText: "A directional strategy optimised to outperform Bitcoin.",
    dtObjective: "Objective",
    dtObjectiveText: "Outperform Bitcoin over the medium / long term by capturing major bull trends while limiting corrective phases.",
    dtOffensiveBlock: "Offensive Block",
    dtOffensiveBlockText: "Primary block — directional Bitcoin exposure with moderate leverage (max 2x), strictly controlled.",
    dtDefensiveBlock: "Defensive Block",
    dtDefensiveBlockText: "Secondary block — neutral strategies, systemic arbitrage, quantitative models with controlled drawdown.",
    dtFactsheet: "Request the Factsheet",

    // === CRYPTOVISION CARD ===
    cvRisk: "Moderate risk",
    cvPitch: "Summary",
    cvPitchText: "A defensive, disciplined strategy on major crypto-assets.",
    cvObjective: "Objective",
    cvObjectiveText: "Deliver consistent performance with controlled volatility and limited drawdown, including during market instability.",
    cvDefensiveBlock: "Defensive Block",
    cvDefensiveBlockText: "Primary block — market-neutral strategies, systemic arbitrage, quantitative models. No directional leverage.",
    cvOffensiveBlock: "Offensive Block",
    cvOffensiveBlockText: "Secondary block — dynamic exposure to Bitcoin, Ethereum and liquid crypto-assets. Moderate leverage, strictly controlled.",
    cvFactsheet: "Request the Factsheet",

    // === EQUINOXE CARD ===
    eqRisk: "Low risk",
    eqLaunch: "Expected launch 2026",
    eqPitch: "Summary",
    eqPitchText: "Neutral strategy — steady returns, independent of market direction.",
    eqObjective: "Objective",
    eqObjectiveText: "Generate stable, low-volatility performance with no directional risk, regardless of market conditions.",
    eqDeltaNeutralText: "Derivatives arbitrage — exploits spreads between spot and futures/funding rates. Net exposure near zero.",
    eqBetaNeutralText: "Pairs trading & statistical arbitrage — long/short on correlated assets to capture convergence.",
    eqFactsheetNote: "Factsheet available at fund launch.",

    // === PERFORMANCE SECTION ===
    perfTitle: "Performance Evolution",
    perfDisclaimer: "The Dynamic Trends fund has been operational since 1 August 2025. Prior performance data derives from real strategies executed on managed accounts, with no backtesting. Past performance does not guarantee future results.",

    // === TEAM ===
    teamTitle: "Meet our team",
    teamRoleOlivier: "Managing Partner · Trading & Strategy",
    teamRoleAlex: "Managing Partner · Systems & Risk",
    govTitle: "Governance",
    govBody: "SparkCore.investment OÜ is supervised by Finantsinspektsioon (Estonian Financial Supervisory Authority) as a Small Fund Manager. Investment management is carried out by Olivier Sayegh and Alexandre Vinal.",
    govBoardLabel: "Management Board",
    govAmlLabel: "AML supervision",
    govAml: "Dual MLRO structure: internal officer registered with the FIU and external crypto-specialist officer.",
    teamBioOlivier: "Active in trading for over twenty years, Olivier began in equity markets before turning to crypto-assets in 2017. Co-founder of DSM, he applies a methodology combining technical analysis and innovative strategies to optimise portfolio performance.",
    teamBioAlex: "Software engineer, Alexandre has invested in crypto-assets since 2014. Founder of the Cointips YouTube channel in 2017 and co-founder of DSM in 2020, he also leads a private community of crypto-asset investors.",

    // === NEWSLETTER ===
    newsletterTitle: "Subscribe to our newsletter",
    newsletterSubtitle: "Receive in-depth monthly analysis of the crypto-asset market.",
    newsletterPlaceholder: "Your email",
    newsletterButton: "Subscribe",
    newsletterError: "Please enter a valid email address.",
    newsletterConsent: "By subscribing, you consent to receiving our monthly newsletter. No data is shared with third parties. You may unsubscribe at any time. <a href=\"/privacy-policy\" class=\"underline underline-offset-2 hover:text-white transition-colors duration-200\">Privacy Policy</a>.",
    newsletterConsentLink: "Privacy Policy",

    // === INVEST SECTION ===
    investTitle: "Invest with us",
    investText: "SparkCore funds are marketed to professional investors. Other investors may, subject to conditions, access them within the limits of the Estonian regime. The minimum investment per investor is €50,000, in EUR, USD or regulated stablecoins. NAV is calculated daily; redemptions are processed quarterly.",
    investStep1: "Request information",
    investStep2: "We will contact you with further details",
    investStep3: "Sign the required documents",
    investStep4: "Become an investor",

    // === WHITE LABEL SECTION ===
    wlSubtitle: "Services for managers",
    wlTitle: "White Label Solution",
    wlIntro: "SparkCore makes its regulated infrastructure available to enable third-party managers to launch their own alternative investment fund.",
    wlWhatTitle: "What SparkCore provides",
    wlItem1Title: "Registered fund manager",
    wlItem1Desc: "Registered with Finantsinspektsioon (EFSA) — supervised Small Fund Manager regime. Financial Institution licence issued by EFIU (KYC/AML).",
    wlItem2Title: "Full legal structuring",
    wlItem2Desc: "Creation of the fund vehicle (usaldusfond), drafting of regulatory documents (Partnership Agreement, Subscription Agreement, Redemption Request).",
    wlItem3Title: "Operational infrastructure",
    wlItem3Desc: "Access to platforms (Binance, Kraken, OKX, ByBit), EUR/USD banking access — SEPA & SWIFT, multi-signature security, NAV/performance management software.",
    wlItem4Title: "Accounting & reporting",
    wlItem4Desc: "Accounting handled by a Big Four firm. Production and distribution of investor reporting. Regulatory reporting to EFSA and the Bank of Estonia. Automated fee and NAV calculation.",
    wlItem5Title: "Favourable taxation",
    wlItem5Desc: "No tax at fund level. No withholding tax on distributions to foreign investors.",
    wlDays: "days",
    wlDaysDesc: "From decision to fund opening for subscriptions. Some platforms may require additional time subject to their internal KYB procedures.",
    wlYourTitle: "What you manage",
    wlStrategy: "Strategy",
    wlStrategyDesc: "Definition and execution of the fund's investment policy.",
    wlFundraising: "Fundraising",
    wlFundraisingDesc: "Investor relations and fund marketing.",
    wlCommentary: "Management commentary",
    wlCommentaryDesc: "You provide SparkCore with a periodic commentary integrated into the reporting sent to your investors.",
    wlRegTitle: "Regulatory framework",
    wlReg1: "AIF structured under Estonian law (usaldusfond)",
    wlReg2: "Qualified/accredited investors (no limit), up to 149 retail investors per EU country",
    wlReg3: "Dual MLRO system: internal (FIU-registered) + external crypto-specialist, in direct contact with investors.",
    wlReg4: "AML 5 / AML 6 compliant — SparkCore as official regulatory representative",

    // === FOOTER ===
    footerCopyright: " SparkCore.investment OÜ — All rights reserved.",
    footerRegText: "Asset management company specialising in crypto-assets, registered in Estonia. Supervised by Finantsinspektsioon:",
    footerLicenceLabel: "Licence:",
    footerLicenceLink: "EFIU (Financial Institution)",
    footerAddress: "Reg. No. 16265864 — Männimäe 1, Pudisoo, 74626 Harju County, Estonia",
    footerDisclaimerLabel: "Disclaimer:",
    footerWarning: "Past performance does not guarantee future results. Crypto-assets carry a high level of risk, including the risk of total loss. This website and performance charts are provided for informational purposes only and do not constitute an investment offer. SparkCore funds are marketed to professional investors; other investors may, subject to conditions, access them within the limits of the Estonian regime. Minimum investment: €50,000. Please assess your personal situation and seek independent advice before investing.",
    footerPrivacyLink: "Privacy Policy",
    footerInsightsLink: "Articles",

    // === VALIDATION PAGE ===
    validationTitle: "Verification Complete",
    validationSubtitle: "Thank you for completing the verification process.",
    validationBody: "Your submission is under review. You will shortly receive a confirmation email if your verification is validated, along with instructions to finalise your investment.",
    validationContact: "Contact Us",

    // === ERROR PAGES ===
    error404Title: "Page Not Found",
    error404Subtitle: "The page you are looking for does not exist or has been moved.",
    error500Title: "Server Error",
    error500Subtitle: "An unexpected error occurred. Please try again later.",
    error403Title: "Access Denied",
    error403Subtitle: "You do not have permission to access this page.",
    errorBackHome: "Back to home",
  }
};

// Language detection — runs immediately so currentLang is available for main.js
// Order of precedence:
//   1. URL path (authoritative — /fr/* is always French, everything else English)
//   2. localStorage (explicit user choice on a previous visit)
//   3. navigator.language (first-time visitor fallback)
// Rationale: the URL must take precedence so that crawlers (Googlebot, AI bots,
// social previewers) rendering /fr/ always get French content, regardless of
// their default navigator.language or lack of localStorage.
var currentLang = (function() {
  var path = (window.location.pathname || '/').toLowerCase();
  if (path === '/fr' || path.indexOf('/fr/') === 0) return 'fr';

  var saved = null;
  try { saved = localStorage.getItem('sc_lang'); } catch(e){}
  if (saved === 'fr' || saved === 'en') return saved;

  var browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
  return browser.indexOf('fr') === 0 ? 'fr' : 'en';
})();
