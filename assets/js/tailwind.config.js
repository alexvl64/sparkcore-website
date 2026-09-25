/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./fr/**/*.html",
    "./blog/**/*.html",
    "./resources/**/*.html",
    "./factsheets/**/*.html",
    "./assets/js/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "funnel-display": ["Funnel Display", "sans-serif"],
      },
      colors: {
        lightBlue: "#ADBDCA",
        darkGray: "#0E1117",
        lightGray: "#D0DAE3",
        mediumGray: "#465467",
        steelBlue: "#667085",
        softBlueGray: "#98A2B3",
        accessiblePlaceholder: "#6b7280",
        cream: "#DBD1BC",
        charcoal: "#545047",
        charcoalBlue: "#334054",
        paleBlue: "#EAECF0",
      },
      fontSize: {
        "custom-3xl": "28px",
        "custom-4xl": "32px",
        "custom-5xl": "40px",
        "custom-5xxl": "56px",
        "custom-6xl": "64px",
      },
      lineHeight: {
        110: "110%",
        120: "120%",
        140: "140%",
        160: "160%",
      },
      screens: {
        "custom-xs": "576px",
      },
    },
  },
};
