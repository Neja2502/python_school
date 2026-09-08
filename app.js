const currentScript = document.createElement("script");
currentScript.src = "app-current.js";

currentScript.onload = () => {
  let attempts = 0;
  const loadAudit = () => {
    if (document.querySelector("#viri")) {
      const auditScript = document.createElement("script");
      auditScript.src = "app-audit.js";
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
