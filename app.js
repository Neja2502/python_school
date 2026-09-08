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

  const classesSection = document.querySelector("#razredi");
  if (classesSection && !document.querySelector("#razredi-osnove")) {
    classesSection.innerHTML = `
      <div class="section-heading">
        <h2>Razredi</h2>
        <p>Objekti, atributi, metode, posebne metode, iteratorji in generatorji.</p>
      </div>

      <div class="grid">
        <article id="razredi-osnove" class="card wide search-item" data-keywords="class razred objekt atribut metoda self instance osnove">
          <h3>Razred, objekt, atribut in metoda</h3>
          <p><strong>Razred</strong> je skupna definicija vrste objektov. <strong>Objekt</strong> je posamezen primerek razreda. Vsak objekt ima svoje <strong>atribute</strong>, vsi objekti istega razreda pa uporabljajo iste definicije <strong>metod</strong>.</p>
          <pre><code>class Predmet:
    pass

p = Predmet()       # ustvarimo objekt
p.masa = 5          # nastavimo atribut
print(p.masa)       # 5</code></pre>
          <p>Do atributa dostopamo z <code>objekt.atribut</code>. Imena razredov se po dogovoru pišejo z veliko začetnico.</p>
        </article>

        <article class="card search-item" data-keywords="self metoda argument parameter atribut trenutni objekt">
          <h3><code>self</code> in navadne metode</h3>
          <pre><code>class Zaporedje:
    def clen(self, i):
        return self.zacetni + i * self.razlika

z.clen(3)</code></pre>
          <p><code>self</code> je objekt, na katerem je bila metoda poklicana. Zato prek <code>self.atribut</code> dostopamo do njegovih podatkov. Pri klicu <code>z.clen(3)</code> argumenta <code>self</code> ne podamo sami.</p>
        </article>

        <article class="card search-item" data-keywords="init konstruktor inicializacija self atribut objekt return None">
          <h3><code>__init__</code> — inicializacija objekta</h3>
          <pre><code>class Predmet:
    def __init__(self, masa, starost):
        self.masa = masa
        self.starost = starost

p = Predmet(4, 2)
p.masa       # 4</code></pre>
          <p>Python pokliče <code>__init__</code> takoj po ustvaritvi novega objekta. Njegova naloga je predvsem nastaviti atribute.</p>
          <div class="callout"><strong>Pomembno:</strong> <code>__init__</code> ne vrača uporabniške vrednosti. Ne pišemo <code>return nekaj</code>; brez eksplicitnega <code>return</code> metoda vrne <code>None</code>.</div>
        </article>

        <article class="card wide search-item" data-keywords="konstruktor obdelava argumentov krajšanje gcd ulomek kopija seznam rezina alias polinom">
          <h3>Konstruktor lahko argumente najprej obdela</h3>
          <p>Atributov ni treba shraniti takoj. Najprej lahko podatke popravimo, normaliziramo ali skopiramo, nato jih shranimo v <code>self</code>.</p>
          <pre><code># primer: vedno okrajšan ulomek
class Ulomek:
    def __init__(self, st, im):
        if im &lt; 0:
            st, im = -st, -im

        d = gcd(st, im)
        self.st = st // d
        self.im = im // d

# primer: naredimo kopijo seznama
class Polinom:
    def __init__(self, koef):
        self.koef = koef[:]</code></pre>
          <ul>
            <li>Če atribut mora ostati celo število, uporabi ustrezno celoštevilsko operacijo, npr. <code>//</code>.</li>
            <li><code>self.koef = koef</code> bi kazal na isti seznam; <code>koef[:]</code> naredi novo kopijo.</li>
            <li>Če pozneje spremenimo originalni seznam, se atribut zato ne spremeni.</li>
          </ul>
        </article>

        <article class="card wide search-item" data-keywords="posebne metode magic dunder str repr eq add sub mul contains getitem return">
          <h3>Posebne metode: operator → metoda</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Zapis</th><th>Python pokliče</th><th>Običajno vrne</th></tr></thead>
              <tbody>
                <tr><td><code>print(x)</code></td><td><code>x.__str__()</code></td><td>človeku prijazen niz</td></tr>
                <tr><td>prikaz <code>x</code> v konzoli</td><td><code>x.__repr__()</code></td><td>niz za predstavitev objekta</td></tr>
                <tr><td><code>x == y</code></td><td><code>x.__eq__(y)</code></td><td><code>True</code> ali <code>False</code></td></tr>
                <tr><td><code>x + y</code></td><td><code>x.__add__(y)</code></td><td>rezultat seštevanja, pogosto nov objekt</td></tr>
                <tr><td><code>x - y</code></td><td><code>x.__sub__(y)</code></td><td>rezultat odštevanja</td></tr>
                <tr><td><code>x * y</code></td><td><code>x.__mul__(y)</code></td><td>rezultat množenja</td></tr>
                <tr><td><code>x in y</code></td><td><code>y.__contains__(x)</code></td><td><code>True</code> ali <code>False</code></td></tr>
                <tr><td><code>x[i]</code></td><td><code>x.__getitem__(i)</code></td><td>element oziroma izračunano vrednost</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="card search-item" data-keywords="str repr izpis print predstavitev f string">
          <h3><code>__str__</code> in <code>__repr__</code></h3>
          <pre><code>class Predmet:
    def __str__(self):
        return f"Predmet z maso {self.masa}."

    def __repr__(self):
        return f"Predmet({self.masa}, {self.starost})"</code></pre>
          <p><code>__str__</code> je namenjen prijaznemu izpisu za človeka. <code>__repr__</code> je namenjen uporabni predstavitvi objekta v Pythonu. Obe metodi vračata <strong>niz</strong>.</p>
        </article>

        <article class="card search-item" data-keywords="eq enakost other drugi self atribut primerjava ulomek bool">
          <h3><code>__eq__(self, other)</code> — enakost objektov</h3>
          <pre><code>class Ulomek:
    def __eq__(self, other):
        return self.st == other.st and self.im == other.im</code></pre>
          <p><code>other</code> je drugi objekt. Primerjamo njegove atribute, npr. <code>other.st</code>, ne pa celega objekta z enim številom.</p>
          <div class="callout"><code>self.other = other</code> tu ni potrebno. Parameter <code>other</code> že neposredno uporabljamo.</div>
        </article>

        <article class="card search-item" data-keywords="add seštevanje objektov nov objekt specialna metoda">
          <h3><code>__add__</code> lahko vrne nov objekt</h3>
          <pre><code>class Tocka:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Tocka(self.x + other.x,
                     self.y + other.y)</code></pre>
          <p>Če napišemo <code>a + b</code>, Python pokliče <code>a.__add__(b)</code>.</p>
        </article>

        <article class="card wide search-item" data-keywords="class Ulomek Ulomek dedovanje nadaljevanje podnaloga razširitev inheritance">
          <h3>Zakaj je v rešitvah včasih <code>class Ulomek(Ulomek):</code>?</h3>
          <pre><code># prejšnja podnaloga je že definirala Ulomek
class Ulomek(Ulomek):
    def __eq__(self, other):
        return self.st == other.st and self.im == other.im</code></pre>
          <p>Pri nalogah po podnalogah se ta zapis lahko uporabi za <strong>razširitev že obstoječega razreda</strong>: novi <code>Ulomek</code> podeduje prejšnje metode in doda novo. Pri prvi definiciji razreda pa napišemo samo <code>class Ulomek:</code>.</p>
        </article>

        <article class="card wide search-item" data-keywords="metode return None bool str objekt vrednost pregled">
          <h3>Kaj metode vračajo?</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Metoda</th><th>Namen</th><th>Tipičen rezultat</th></tr></thead>
              <tbody>
                <tr><td><code>__init__</code></td><td>nastavi objekt</td><td><code>None</code></td></tr>
                <tr><td>navadna računska metoda</td><td>izračuna rezultat</td><td>število, niz, seznam, objekt …</td></tr>
                <tr><td><code>__str__</code></td><td>izpis za človeka</td><td><code>str</code></td></tr>
                <tr><td><code>__repr__</code></td><td>predstavitev objekta</td><td><code>str</code></td></tr>
                <tr><td><code>__eq__</code></td><td>enakost</td><td><code>bool</code></td></tr>
                <tr><td><code>__contains__</code></td><td>preverjanje <code>in</code></td><td><code>bool</code></td></tr>
                <tr><td><code>__getitem__</code></td><td>dostop z <code>[i]</code></td><td>element / vrednost</td></tr>
                <tr><td><code>__add__</code></td><td>operator <code>+</code></td><td>rezultat operacije</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="card wide search-item" data-keywords="iterator next StopIteration __next__ iteracija">
          <h3>Iterator in <code>__next__</code></h3>
          <p>Iterator si zapomni, kje v zaporedju je. Funkcija <code>next(it)</code> pokliče posebno metodo <code>it.__next__()</code>. Ko ni več vrednosti, iterator sproži <code>StopIteration</code>.</p>
          <pre><code>class IteratorCezNiz:
    def __init__(self, niz):
        self.niz = niz
        self.i = 0

    def __next__(self):
        if self.i &lt; len(self.niz):
            znak = self.niz[self.i]
            self.i += 1
            return znak
        raise StopIteration

it = IteratorCezNiz("abc")
next(it)   # 'a'
next(it)   # 'b'</code></pre>
        </article>

        <article class="card wide search-item" data-keywords="generator yield next StopIteration return funkcija iterator">
          <h3>Generatorji in <code>yield</code></h3>
          <p>Generator je preprostejši način pisanja iteratorja. <code>yield</code> vrne naslednjo vrednost, vendar izvajanja funkcije ne konča trajno; ob naslednjem <code>next</code> se nadaljuje za prejšnjim <code>yield</code>.</p>
          <pre><code>def znaki(niz):
    i = 0
    while i &lt; len(niz):
        yield niz[i]
        i += 1

g = znaki("abc")
next(g)   # 'a'
next(g)   # 'b'
next(g)   # 'c'
# naslednji next sproži StopIteration</code></pre>
          <div class="callout"><code>return</code> funkcijo konča. <code>yield</code> jo začasno ustavi in omogoči nadaljevanje.</div>
        </article>

        <article class="card wide search-item" data-keywords="iterabilni __iter__ for iter next generator zanka">
          <h3>Iterabilni objekti in <code>__iter__</code></h3>
          <p>Objekt je iterabilen, če lahko iz njega dobimo iterator. Zanka <code>for</code> v ozadju najprej uporabi <code>iter(obj)</code>, nato ponavlja <code>next(...)</code>, dokler ne dobi <code>StopIteration</code>.</p>
          <pre><code>class Zaporedje:
    def __init__(self, zacetni, razlika):
        self.zacetni = zacetni
        self.razlika = razlika

    def __iter__(self):
        x = self.zacetni
        while True:
            yield x
            x += self.razlika

z = Zaporedje(2, 5)
for x in z:
    print(x)
    if x &gt; 20:
        break</code></pre>
          <p><code>__iter__</code> mora vrniti iterator; generator z <code>yield</code> je pogosto najkrajši način.</p>
        </article>

        <article class="card wide search-item" data-keywords="razredi vir matija pretnar uvod programiranje">
          <h3>Vir za teorijo</h3>
          <p>Razširjeni zapiski temeljijo na poglavju <strong>Razredi</strong> v učbeniku Matije Pretnarja in na vzorcih iz rešenih nalog.</p>
          <p><a href="https://matija.pretnar.info/uvod-v-programiranje/08-razredi.html">Uvod v programiranje — Razredi</a></p>
        </article>
      </div>`;
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
