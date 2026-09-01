(() => {
  const params = new URLSearchParams(location.search);
  const requested = params.get('file') || 'snov.ipynb';
  const notebooks = {
    'snov.ipynb': 'Snov',
    'izpitiRP.ipynb': 'Izpiti RP'
  };
  const file = Object.prototype.hasOwnProperty.call(notebooks, requested) ? requested : 'snov.ipynb';
  const title = notebooks[file];

  const notebookEl = document.querySelector('#notebook');
  const tocEl = document.querySelector('#toc');
  const loadingEl = document.querySelector('#loading');
  const errorEl = document.querySelector('#error');
  const nameEl = document.querySelector('#notebook-name');
  const searchEl = document.querySelector('#toc-search');
  const toggleCodeBtn = document.querySelector('#toggle-code');

  document.title = `${title} — Python priročnik`;
  nameEl.textContent = title;

  const asText = (value) => Array.isArray(value) ? value.join('') : String(value ?? '');
  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  function slugify(text, used) {
    const base = text
      .toLocaleLowerCase('sl')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
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
      if (mime === 'image/svg+xml') {
        return `data:${mime};utf8,${encodeURIComponent(payload)}`;
      }
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
    if (data['image/png']) {
      return `<img alt="izhod" src="data:image/png;base64,${asText(data['image/png'])}">`;
    }
    if (data['image/jpeg']) {
      return `<img alt="izhod" src="data:image/jpeg;base64,${asText(data['image/jpeg'])}">`;
    }
    if (data['image/svg+xml']) {
      return `<div class="output-html">${asText(data['image/svg+xml'])}</div>`;
    }
    if (data['text/html']) {
      return `<div class="output-html">${asText(data['text/html'])}</div>`;
    }
    if (data['application/json']) {
      const value = data['application/json'];
      return `<pre>${escapeHtml(typeof value === 'string' ? value : JSON.stringify(value, null, 2))}</pre>`;
    }
    if (data['text/plain']) {
      return `<pre>${escapeHtml(asText(data['text/plain']))}</pre>`;
    }
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
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.className = `level-${level}`;
    a.textContent = text;
    a.title = text;
    tocEl.appendChild(a);
  }

  function renderNotebook(nb) {
    const usedSlugs = new Set();
    let codeIndex = 0;

    for (const cell of nb.cells || []) {
      if (cell.cell_type === 'markdown') {
        const section = document.createElement('section');
        section.className = 'nb-cell markdown-cell';
        section.innerHTML = renderMarkdown(cell);
        section.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => {
          addTocEntry(h, Number(h.tagName.slice(1)), usedSlugs);
        });
        notebookEl.appendChild(section);
        continue;
      }

      if (cell.cell_type === 'code') {
        codeIndex += 1;
        const section = document.createElement('section');
        section.className = 'nb-cell code-cell';

        const prompt = document.createElement('div');
        prompt.className = 'prompt';
        const executionCount = cell.execution_count ?? '';
        prompt.textContent = executionCount === '' ? '[ ]:' : `[${executionCount}]:`;

        const input = document.createElement('div');
        input.className = 'input-area';
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-python';
        code.textContent = asText(cell.source);
        pre.appendChild(code);
        input.appendChild(pre);

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
      other.innerHTML = `<pre>${escapeHtml(asText(cell.source))}</pre>`;
      notebookEl.appendChild(other);
    }

    if (!tocEl.children.length) {
      tocEl.innerHTML = '<div class="toc-footer">V zvezku ni Markdown naslovov za samodejno kazalo.</div>';
    }

    if (window.hljs) {
      notebookEl.querySelectorAll('pre code.language-python').forEach((block) => hljs.highlightElement(block));
    }
    if (window.MathJax?.typesetPromise) MathJax.typesetPromise([notebookEl]).catch(() => {});

    loadingEl.hidden = true;
    notebookEl.hidden = false;
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
      errorEl.textContent = `${error.message} Preveri, ali je zvezek že naložen v GitHub.`;
    }
  }

  searchEl.addEventListener('input', () => {
    const q = searchEl.value.trim().toLocaleLowerCase('sl');
    tocEl.querySelectorAll('a').forEach((a) => {
      a.classList.toggle('filtered', Boolean(q) && !a.textContent.toLocaleLowerCase('sl').includes(q));
    });
  });

  toggleCodeBtn.addEventListener('click', () => {
    const hidden = notebookEl.classList.toggle('code-hidden');
    toggleCodeBtn.textContent = hidden ? 'Prikaži kodo' : 'Skrij kodo';
  });

  document.querySelector('#scroll-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  loadNotebook();
})();
