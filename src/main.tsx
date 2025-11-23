import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Mount React first
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// --- Chatwoot Safe Loader (cannot be removed by React or Bolt) ---
(function () {
  console.log("Chatwoot script injected AFTER React mount");

  const BASE_URL = "https://12keys-agency-chatwoot.go13ce.easypanel.host";
  const sdkUrl = BASE_URL + "/packs/js/sdk.js";

  function loadChatwoot() {
    console.log("Loading Chatwoot SDK…");

    const script = document.createElement("script");
    script.src = sdkUrl;
    script.async = true;

    script.onload = function () {
      console.log("Chatwoot SDK loaded, waiting for global...");
      waitForChatwoot();
    };

    script.onerror = function (e) {
      console.error("Chatwoot SDK failed:", e);
    };

    document.body.appendChild(script);
  }

  function waitForChatwoot() {
    if (!window.chatwootSDK) {
      console.log("Chatwoot not ready, retrying…");
      setTimeout(waitForChatwoot, 200);
      return;
    }

    console.log("Chatwoot ready — initializing widget");

    window.chatwootSDK.run({
      websiteToken: "JqdHQ2WwSuyfvKNf5PsZsmR7",
      baseUrl: BASE_URL
    });

    console.log("Chatwoot widget initialized successfully");
  }

  // Run only after React has hydrated the DOM
  window.addEventListener("load", loadChatwoot);
})();
