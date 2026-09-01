const baseScript = document.createElement("script");
baseScript.src = "app-base.js";

baseScript.onload = () => {
  const fileGroup = functionGroups.find((group) => group.id === "slovar-datoteke");
  if (fileGroup && !fileGroup.entries.some((entry) => entry.name === "writelines")) {
    fileGroup.entries.push(
      f(
        "writelines",
        "datoteka · seznam nizov",
        "datoteka.writelines(seznam_nizov)",
        "Zaporedoma zapiše vse nize iz podanega seznama v datoteko.",
        "None.",
        "vrstice = [\"prva\\n\", \"druga\\n\"]\nwith open(\"a.txt\", \"w\", encoding=\"utf-8\") as dat:\n    dat.writelines(vrstice)",
        "datoteka vsebuje dve vrstici: prva in druga",
        "Ko imaš že pripravljen seznam vrstic in jih želiš naenkrat zapisati v datoteko.",
        "writelines() sama ne doda znaka \\n; če želiš vsako vrednost v novi vrstici, mora posamezni niz že vsebovati \\n."
      )
    );
    buildFunctionReference();
    buildFunctionNavigation();
  }

  const filesGrid = document.querySelector("#datoteke .grid");
  if (filesGrid && !document.querySelector("#vzorec-neprazna-vrstica")) {
    filesGrid.insertAdjacentHTML(
      "beforeend",
      `<article id="vzorec-neprazna-vrstica" class="card search-item" data-keywords="datoteka prazna vrstica strip preskok if">
        <h3>Preskoči prazne vrstice</h3>
        <pre><code>for vrstica in dat:
    if vrstica.strip():
        # obdelaj samo neprazno vrstico
        ...</code></pre>
        <p><code>vrstica.strip()</code> odstrani presledke in <code>\\n</code> z robov. Če nič ne ostane, dobimo prazen niz <code>""</code>, ki je v pogoju <code>False</code>.</p>
      </article>`
    );
  }

  const loopsGrid = document.querySelector("#zanke .grid");
  if (loopsGrid && !document.querySelector("#vzorec-prazen-neprazen")) {
    loopsGrid.insertAdjacentHTML(
      "beforeend",
      `<article id="vzorec-prazen-neprazen" class="card search-item" data-keywords="if seznam niz slovar prazen neprazen truthy falsy bool pogoj">
        <h3>Prazen ali neprazen objekt v pogoju</h3>
        <pre><code>if seznam:
    # seznam ni prazen
    ...

if not seznam:
    # seznam je prazen
    ...

if niz:
    # niz ni prazen
    ...</code></pre>
        <p>Prazni <code>[]</code>, <code>""</code>, <code>{}</code>, <code>()</code> in <code>set()</code> se v pogoju obnašajo kot <code>False</code>; neprazni kot <code>True</code>.</p>
      </article>`
    );
  }

  const nav = document.querySelector(".nav");
  if (nav && !nav.querySelector('a[href="zvezki.html"]')) {
    const link = document.createElement("a");
    link.href = "zvezki.html";
    link.textContent = "Zvezki";
    link.className = "emphasis";
    const functionsLink = nav.querySelector('a[href="#funkcije"]');
    if (functionsLink) functionsLink.insertAdjacentElement("afterend", link);
    else nav.appendChild(link);
  }

  const hero = document.querySelector(".hero");
  if (hero && !document.querySelector(".notebook-shortcuts")) {
    const shortcuts = document.createElement("div");
    shortcuts.className = "notebook-shortcuts";
    shortcuts.innerHTML = `
      <span class="notebook-shortcuts-label">Zvezki</span>
      <a href="notebook.html?file=snov.ipynb"><strong>Snov</strong><span>teorija in primeri</span></a>
      <a href="notebook.html?file=izpitiRP.ipynb"><strong>Izpiti RP</strong><span>naloge in rešitve</span></a>
      <a class="all-notebooks" href="zvezki.html">Vsi zvezki →</a>`;
    const searchWrap = hero.querySelector(".search-wrap");
    if (searchWrap) searchWrap.insertAdjacentElement("afterend", shortcuts);
    else hero.appendChild(shortcuts);
  }

  if (!document.querySelector("#notebook-shortcut-styles")) {
    const style = document.createElement("style");
    style.id = "notebook-shortcut-styles";
    style.textContent = `
      .notebook-shortcuts {
        display: grid;
        grid-template-columns: auto repeat(2, minmax(150px, 1fr)) auto;
        align-items: stretch;
        gap: 8px;
        margin-top: 16px;
      }
      .notebook-shortcuts-label {
        display: flex;
        align-items: center;
        padding-right: 5px;
        color: var(--muted);
        font-size: .76rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: .08em;
      }
      .notebook-shortcuts a {
        display: grid;
        gap: 1px;
        padding: 9px 11px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: rgba(255,255,255,.62);
        color: var(--text);
        text-decoration: none;
      }
      .notebook-shortcuts a:hover { border-color: #8aaecb; background: white; }
      .notebook-shortcuts a span { color: var(--muted); font-size: .76rem; }
      .notebook-shortcuts .all-notebooks { display: flex; align-items: center; color: #315b7d; font-weight: 700; }
      @media (max-width: 760px) {
        .notebook-shortcuts { grid-template-columns: 1fr 1fr; }
        .notebook-shortcuts-label { grid-column: 1 / -1; }
        .notebook-shortcuts .all-notebooks { grid-column: 1 / -1; }
      }
    `;
    document.head.appendChild(style);
  }
};

baseScript.onerror = () => {
  console.error("Ni bilo mogoče naložiti osnovnega priročnika.");
};

document.head.appendChild(baseScript);
