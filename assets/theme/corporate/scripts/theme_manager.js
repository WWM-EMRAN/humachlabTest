(function () {
  const THEME_KEY = "hml_theme";

  // map theme -> assets
  const THEME_MAP = {
    red: {
      css: "assets/theme/corporate/css/themes/red.css",
      favicon: "assets/myresources/icons/HML-FavIcon-red.png",
      logo: "assets/myresources/logos/hml-logo-only-white.png" // change per theme if you have variants
    },
    blue: {
      css: "assets/theme/corporate/css/themes/blue.css",
      favicon: "assets/myresources/icons/HML-FavIcon-blue.png",
      logo: "assets/myresources/logos/hml-logo-only-white.png"
    },
    green: {
      css: "assets/theme/corporate/css/themes/green.css",
      favicon: "assets/myresources/icons/HML-FavIcon-green.png",
      logo: "assets/myresources/logos/hml-logo-only-white.png"
    },
    // add others: black, gray, orange, turquoise, purple, cyan, yellow...
  };

  function applyTheme(theme) {
    const t = THEME_MAP[theme] ? theme : "red";
    const conf = THEME_MAP[t];

    // swap CSS
    const styleLink = document.getElementById("style-color");
    if (styleLink) styleLink.href = conf.css + "?v=" + Date.now(); // cache-bust

    // swap favicon
    const fav = document.getElementById("fav-icon");
    if (fav) fav.href = conf.favicon;

    // swap header logo
    const logo = document.getElementById("header-logo");
    if (logo) logo.src = conf.logo;

    localStorage.setItem(THEME_KEY, t);
  }

  function restoreTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "red";
    applyTheme(saved);
  }

  // expose for layout.js / clicks
  window.HMLTheme = { applyTheme, restoreTheme };

  document.addEventListener("DOMContentLoaded", restoreTheme);
})();
