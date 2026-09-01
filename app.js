const searchInput = document.querySelector("#search");
const searchableItems = [...document.querySelectorAll(".search-item")];
const sections = [...document.querySelectorAll(".section")];
const noResults = document.querySelector("#no-results");

function normalize(value) {
  return value
    .toLocaleLowerCase("sl")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function updateSearch() {
  const query = normalize(searchInput.value.trim());
  let visible = 0;

  searchableItems.forEach((item) => {
    const haystack = normalize(`${item.dataset.keywords || ""} ${item.textContent}`);
    const matches = !query || haystack.includes(query);
    item.classList.toggle("hidden-by-search", !matches);
    if (matches) visible += 1;
  });

  sections.forEach((section) => {
    const hasVisibleCard = section.querySelector(".search-item:not(.hidden-by-search)");
    section.classList.toggle("hidden-by-search", Boolean(query) && !hasVisibleCard);
  });

  noResults.style.display = query && visible === 0 ? "block" : "none";
}

searchInput.addEventListener("input", updateSearch);

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
    searchInput.select();
  }

  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    updateSearch();
    searchInput.blur();
  }
});

// Splošen videz priročnika brez izpitnih oznak.
document.title = "Python priročnik";

const brand = document.querySelector(".brand");
if (brand) brand.textContent = "Python priročnik";

document.querySelector(".brand-subtitle")?.remove();
document.querySelector(".notice")?.remove();

const patternsNav = document.querySelector('a[href="#vzorci"]');
if (patternsNav) patternsNav.textContent = "Programerski vzorci";

const patternsHeading = document.querySelector("#vzorci .section-heading h2");
if (patternsHeading) patternsHeading.textContent = "Programerski vzorci";

const patternsDescription = document.querySelector("#vzorci .section-heading p");
if (patternsDescription) {
  patternsDescription.textContent =
    "Prevod pogoste ideje v standardni in pregleden programski zapis.";
}

const dictionarySection = document.querySelector("#slovarji");
if (dictionarySection) {
  dictionarySection.querySelectorAll("pre code").forEach((code) => {
    code.textContent = code.textContent.replace(
      "# zelo pogost izpitni vzorec:",
      "# zelo pogost vzorec:"
    );
  });
}

const classesDescription = document.querySelector("#razredi .section-heading p");
if (classesDescription) {
  classesDescription.textContent = "Osnovni zapis razreda in posebnih metod.";
}

const hero = document.querySelector(".hero");
if (hero) {
  [...hero.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === "#") {
      node.remove();
    }
  });
}
