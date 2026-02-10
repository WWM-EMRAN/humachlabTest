// (function () {
//   const PRELOADER_ID = "preloader-logo";
//
//   function hidePreloader() {
//     const el = document.getElementById(PRELOADER_ID);
//     if (!el) return;
//
//     el.style.opacity = "0";
//     el.style.transition = "opacity 0.3s ease";
//
//     setTimeout(() => el.remove(), 300);
//   }
//
//   /*
//    We listen for a custom event instead of touching include.js
//    This keeps concerns clean and avoids regressions
//   */
//   window.addEventListener("components:ready", hidePreloader);
//
//   // Safety fallback (in case event never fires)
//   window.addEventListener("load", () => {
//     setTimeout(hidePreloader, 2500);
//   });
// })();


// (function () {
//   const LOGO_SRC = "../../myresources/icons/HML-FavIcon-red.png"; // change if needed
//
//   function setLogo() {
//     const gray = document.querySelector(".preload-logo .logo-gray");
//     const color = document.querySelector(".preload-logo .logo-color");
//     if (!gray || !color) return;
//
//     gray.style.backgroundImage = `url("${LOGO_SRC}")`;
//     color.style.backgroundImage = `url("${LOGO_SRC}")`;
//   }
//
//   function hidePreloader() {
//     const p = document.getElementById("preloader");
//     if (!p) return;
//     p.style.opacity = "0";
//     p.style.transition = "opacity 250ms ease";
//     setTimeout(() => p.remove(), 260);
//   }
//
//   // expose so include.js can call it after components load
//   window.Preload = { setLogo, hidePreloader };
//
//   document.addEventListener("DOMContentLoaded", () => {
//     setLogo(); // show preloader immediately
//   });
// })();




const UI = {
  preloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    // Optional delay so user sees it briefly
    setTimeout(() => {
      preloader.style.transition = "opacity 0.6s ease";
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 600);
    }, 1000);
  },

  // If you don't have this function, remove the call below
  scrollTopButton() {}
};

document.addEventListener("DOMContentLoaded", () => {
  UI.preloader();
  // only call this if it exists
  if (typeof UI.scrollTopButton === "function") UI.scrollTopButton();
});

// Allow other scripts (like include.js) to hide it after components load
window.hide_preloader = () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.style.transition = "opacity 0.6s ease";
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
};



