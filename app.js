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
