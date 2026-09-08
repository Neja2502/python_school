const currentScript = document.createElement("script");
currentScript.src = "app-current.js";

currentScript.onload = () => {
  let attempts = 0;
  const loadAudit = () => {
    if (document.querySelector("#viri")) {
      const auditScript = document.createElement("script");
      auditScript.src = "app-audit.js";

      auditScript.onload = () => {
        // Viri naj bodo zadnje poglavje priročnika, za Slovarjem funkcij.
        const sourcesSection = document.querySelector("#viri");
        const functionsSection = document.querySelector("#funkcije");
        if (sourcesSection && functionsSection) {
          functionsSection.insertAdjacentElement("afterend", sourcesSection);
        }

        // Enak vrstni red tudi v levem kazalu: Viri čisto na konec.
        const nav = document.querySelector(".nav");
        const sourcesLink = nav?.querySelector('a[href="#viri"]');
        if (nav && sourcesLink) {
          nav.appendChild(sourcesLink);
        }
      };

      document.head.appendChild(auditScript);
      return;
    }

    attempts += 1;
    if (attempts < 400) setTimeout(loadAudit, 25);
  };

  loadAudit();
};

currentScript.onerror = () => {
  console.error("Ni bilo mogoče naložiti priročnika.");
};

document.head.appendChild(currentScript);
