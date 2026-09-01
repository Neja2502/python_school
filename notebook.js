(() => {
  const params = new URLSearchParams(location.search);
  const requested = params.get('file') || 'snov.ipynb';
  const notebooks = {
    'snov.ipynb': {
      title: 'Snov',
      description: 'Teorija, primeri, Python in NumPy.'
    },
    'izpitiRP.ipynb': {
      title: 'Izpiti RP',
      description: 'Naloge, rešitve in zapiski.'
    }
  };
  const file = Object.prototype.hasOwnProperty.call(notebooks, requested) ? requested : 'snov.ipynb';
  const meta = notebooks[file];

  const notebookEl = document.querySelector('#notebook');
  const tocEl = document.querySelector('#toc');
  const loadingEl = document.querySelector('#loading');
  const errorEl = document.querySelector('#error');
  const nameEl = document.querySelector('#notebook-name');
  const descriptionEl = document.querySelector('#notebook-description');
  const searchEl = document.querySelector('#notebook-search');
  const searchStatusEl = document.querySelector('#search-status');
  const tocCountEl = document.querySelector('#toc-count');
  const tabsEl = document.querySelector('#notebook-tabs');
  const toggleCodeBtn = document.querySelector('#toggle-code');

  document.title = `${meta.title} — Python priročnik`;
  nameEl.textContent = meta.title;
  descriptionEl.textContent = meta.description;

  Object.entries(notebooks).forEach(([notebookFile, notebookMeta]) => {
    const link = document.createElement('a');
    link.href = `notebook.html?file=${encodeURIComponent(notebookFile)}`;
    link.textContent = notebookMeta.title;
    if (notebookFile === file) link.classList.add('active');
    tabsEl.appendChild(link);
  });

  const asText = (value) => Array.isArray(value) ? value.join('') : String(value ?? '');
  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const normalize = (value) => String(value ?? '')
    .toLocaleLowerCase('sl')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  function slugify(text, used) {
    const base = normalize(text)
      .replace(/<[^>]*>/g, '')
      .replace(/[^a-z0-9čšžćđ]+/gi, '-')
      .replace(/^-+|-+$/g, '') || 'poglavje';
    let slug = base;
    let n = 2;
    while (used.has(slug)) slug = `${base}-${n++}`;
    used.add(slug);
    return slug;
  }

  function resolveAttachments(markdown, cell) {
    const attachments = cell.attachments || {};
    return markdown.replace(/attachment:([^\s)"']+)/g, (whole, filename) => {
      const data = attachments[filename];
      if (!data) return whole;
      const mime = Object.keys(data)[0];
      if (!mime) return whole;
      const payload = asText(data[mime]);
      if (mime === 'image/svg+xml') return `data:${mime};utf8,${encodeURIComponent(payload)}`;
      return `data:${mime};base64,${payload}`;
    });
  }

  function renderMarkdown(cell) {
    const source = resolveAttachments(asText(cell.source), cell);
    if (window.marked) return marked.parse(source, { gfm: true, breaks: false });
    return `<pre>${escapeHtml(source)}</pre>`;
  }

  function renderMime(data) {
    if (!data) return '';
    if (data['image/png']) return `<img loading="lazy" alt="izhod" src="data:image/png;base64,${asText(data['image/png'])}">`;
    if (data['image/jpeg']) return `<img loading="lazy" alt="izhod" src="data:image/jpeg;base64,${asText(data['image/jpeg'])}">`;
    if (data['image/svg+xml']) return `<div class="output-html">${asText(data['image/svg+xml'])}</div>`;
    if (data['text/html']) return `<div class="output-html">${asText(data['text/html'])}</div>`;
    if (data['application/json']) {
      const value = data['application/json'];
      return `<pre>${escapeHtml(typeof value === 'string' ? value : JSON.stringify(value, null, 2))}</pre>`;
    }
    if (data['text/plain']) return `<pre>${escapeHtml(asText(data['text/plain']))}</pre>`;
    return '';
  }

  function outputSearchText(output) {
    if (output.output_type === 'stream') return asText(output.text);
    if (output.output_type === 'error') return `${asText(output.ename)} ${asText(output.evalue)} ${asText(output.traceback)}`;
    const data = output.data || {};
    if (data['text/plain']) return asText(data['text/plain']);
    if (data['text/html']) return asText(data['text/html']).replace(/<[^>]+>/g, ' ');
    if (data['application/json']) return JSON.stringify(data['application/json']);
    return '';
  }

  function renderOutput(output) {
    const div = document.createElement('div');
    div.className = 'output-item';
    if (output.output_type === 'stream') {
      div.innerHTML = `<pre>${escapeHtml(asText(output.text))}</pre>`;
    } else if (output.output_type === 'error') {
      div.classList.add('error-output');
      div.innerHTML = `<pre>${escapeHtml(asText(output.traceback).replace(/\u001b\[[0-9;]*m/g, ''))}</pre>`;
    } else {
      div.innerHTML = renderMime(output.data);
    }
    return div;
  }

  function addTocEntry(heading, level, used) {
    const text = heading.textContent.trim();
    if (!text) return;
    const id = slugify(text, used);
    heading.id = id;
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.className = `level-${level}`;
    link.textContent = text;
    link.title = text;
    link.dataset.headingId = id;
    tocEl.appendChild(link);
  }

  function addCopyButton(input, codeText) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = 'Kopiraj';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeText);
        button.textContent = 'Kopirano';
      } catch {
        button.textContent = 'Ni uspelo';
      }
      window.setTimeout(() => { button.textContent = 'Kopiraj'; }, 1200);
    });
    input.appendChild(button);
  }

  function installActiveHeadingObserver() {
    const headings = [...notebookEl.querySelectorAll('h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]')];
    if (!headings.length || !('IntersectionObserver' in window)) return;

    const links = new Map([...tocEl.querySelectorAll('a')].map((a) => [a.dataset.headingId, a]));
    let currentId = headings[0].id;

    const setActive = (id) => {
      if (!id || id === currentId) return;
      currentId = id;
      links.forEach((link, key) => link.classList.toggle('active', key === id));
      const active = links.get(id);
      if (active && !active.classList.contains('filtered')) active.scrollIntoView({ block: 'nearest' });
    };

    links.get(currentId)?.classList.add('active');
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-58px 0px -72% 0px', threshold: [0, 1] });

    headings.forEach((heading) => observer.observe(heading));
  }

  function renderNotebook(nb) {
    const usedSlugs = new Set();
    let cellIndex = 0;

    for (const cell of nb.cells || []) {
      cellIndex += 1;
      if (cell.cell_type === 'markdown') {
        const section = document.createElement('section');
        section.className = 'nb-cell markdown-cell';
        section.dataset.searchText = normalize(asText(cell.source));
        section.dataset.cellIndex = String(cellIndex);
        section.innerHTML = renderMarkdown(cell);
        section.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => addTocEntry(h, Number(h.tagName.slice(1)), usedSlugs));
        notebookEl.appendChild(section);
        continue;
      }

      if (cell.cell_type === 'code') {
        const codeText = asText(cell.source);
        const outputText = (cell.outputs || []).map(outputSearchText).join('\n');
        const section = document.createElement('section');
        section.className = 'nb-cell code-cell';
        section.dataset.searchText = normalize(`${codeText}\n${outputText}`);
        section.dataset.cellIndex = String(cellIndex);

        const prompt = document.createElement('div');
        prompt.className = 'prompt';
        const executionCount = cell.execution_count ?? '';
        prompt.textContent = executionCount === '' ? '[ ]:' : `[${executionCount}]:`;

        const input = document.createElement('div');
        input.className = 'input-area';
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-python';
        code.textContent = codeText;
        pre.appendChild(code);
        input.appendChild(pre);
        addCopyButton(input, codeText);

        section.appendChild(prompt);
        section.appendChild(input);

        const outputs = document.createElement('div');
        outputs.className = 'outputs';
        for (const output of cell.outputs || []) outputs.appendChild(renderOutput(output));
        if (outputs.children.length) section.appendChild(outputs);
        notebookEl.appendChild(section);
        continue;
      }

      const other = document.createElement('section');
      other.className = 'nb-cell markdown-cell';
      other.dataset.searchText = normalize(asText(cell.source));
      other.dataset.cellIndex = String(cellIndex);
      other.innerHTML = `<pre>${escapeHtml(asText(cell.source))}</pre>`;
      notebookEl.appendChild(other);
    }

    const headingCount = tocEl.querySelectorAll('a').length;
    tocCountEl.textContent = headingCount ? `${headingCount} naslovov` : '';
    if (!headingCount) tocEl.innerHTML = '<div class="toc-footer">V zvezku ni Markdown naslovov za samodejno kazalo.</div>';

    if (window.hljs) notebookEl.querySelectorAll('pre code.language-python').forEach((block) => hljs.highlightElement(block));
    if (window.MathJax?.typesetPromise) MathJax.typesetPromise([notebookEl]).catch(() => {});

    loadingEl.hidden = true;
    notebookEl.hidden = false;
    installActiveHeadingObserver();
    updateSearch();
  }

  function updateSearch() {
    const query = normalize(searchEl.value.trim());
    const cells = [...notebookEl.querySelectorAll('.nb-cell')];
    let visibleCells = 0;

    cells.forEach((cell) => {
      const matches = !query || (cell.dataset.searchText || '').includes(query);
      cell.classList.toggle('search-hidden', !matches);
      if (matches) visibleCells += 1;
    });

    const tocLinks = [...tocEl.querySelectorAll('a')];
    tocLinks.forEach((link) => {
      const matches = !query || normalize(link.textContent).includes(query);
      link.classList.toggle('filtered', !matches);
    });

    let empty = notebookEl.querySelector('.search-empty');
    if (query && visibleCells === 0) {
      if (!empty) {
        empty = document.createElement('div');
        empty.className = 'search-empty';
        notebookEl.appendChild(empty);
      }
      empty.textContent = `Ni zadetkov za “${searchEl.value.trim()}”.`;
      empty.hidden = false;
    } else if (empty) {
      empty.hidden = true;
    }

    if (!query) searchStatusEl.textContent = `Prikazane so vse celice (${cells.length}).`;
    else searchStatusEl.textContent = `${visibleCells} od ${cells.length} celic vsebuje iskani izraz.`;
  }

  async function loadNotebook() {
    try {
      const response = await fetch(file, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Datoteke ${file} ni bilo mogoče odpreti (${response.status}).`);
      const nb = await response.json();
      renderNotebook(nb);
    } catch (error) {
      loadingEl.hidden = true;
      errorEl.hidden = false;
      errorEl.textContent = `${error.message} Preveri, ali je zvezek naložen v GitHub.`;
    }
  }

  searchEl.addEventListener('input', updateSearch);
  searchEl.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      searchEl.value = '';
      updateSearch();
      searchEl.blur();
    }
  });

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      searchEl.focus();
      searchEl.select();
    }
  });

  toggleCodeBtn.addEventListener('click', () => {
    const hidden = notebookEl.classList.toggle('code-hidden');
    toggleCodeBtn.textContent = hidden ? 'Prikaži kodo' : 'Skrij kodo';
  });

  document.querySelector('#scroll-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  loadNotebook();
})();
