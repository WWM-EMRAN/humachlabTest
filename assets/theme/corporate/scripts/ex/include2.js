async function loadIncludes() {
  const nodes = document.querySelectorAll("[data-include]");

  for (const node of nodes) {
    const file = node.getAttribute("data-include");
    try {
      const res = await fetch(file, { cache: "no-cache" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const html = await res.text();

      // 1) inject HTML
      node.innerHTML = html;

      // 2) execute scripts in-order (critical for jquery -> bootstrap -> layout.js)
      const scripts = Array.from(node.querySelectorAll("script"));

      for (const oldScript of scripts) {
        const newScript = document.createElement("script");

        // copy attributes (src, type, etc.)
        for (const attr of oldScript.attributes) {
          newScript.setAttribute(attr.name, attr.value);
        }

        if (oldScript.src) {
          // external script: append and wait for load
          await new Promise((resolve, reject) => {
            newScript.onload = resolve;
            newScript.onerror = reject;
            newScript.src = oldScript.src;
            document.body.appendChild(newScript);
          });
        } else {
          // inline script: execute
          newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
        }

        oldScript.remove(); // prevent duplicates
      }

    } catch (err) {
      node.innerHTML = `<!-- include failed: ${file} -->`;
      console.error("Include error:", file, err);
    }
  }

  // ✅ Now included HTML exists AND included scripts have executed
  if (window.initThemeCustomizer) {
    window.initThemeCustomizer();
  }

  // ✅ If you moved Layout.init() into includes, DO NOT rely on that inline script.
  // Call it here instead (safe):
  if (window.Layout && window.jQuery) {
    jQuery(function () {
      Layout.init();
      Layout.initOWL?.();
      Layout.initTwitter?.();
      Layout.initFixHeaderWithPreHeader?.();
      Layout.initNavScrolling?.();
    });
  }
}


function signalComponentsReady() {
  if (window.__componentsReadyFired) return;
  window.__componentsReadyFired = true;
  window.dispatchEvent(new Event("components:ready"));
}


document.addEventListener("DOMContentLoaded", loadIncludes);
