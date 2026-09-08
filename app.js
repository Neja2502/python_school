const baseScript = document.createElement("script");
baseScript.src = "app-base.js";

baseScript.onload = () => {
  const addEntry = (groupId, entry) => {
    const group = functionGroups.find((item) => item.id === groupId);
    if (!group || group.entries.some((item) => item.name === entry.name)) return;
    group.entries.push(entry);
  };

  // ---------------------------------------------------------------------------
  // Slovar funkcij: dopolnitve iz snovi in tipičnih nalog
  // ---------------------------------------------------------------------------
  addEntry(
    "slovar-python",
    f(
      "float",
      "niz · število",
      "float(vrednost)",
      "Pretvori vrednost v realno število.",
      "Število tipa float.",
      "float(\"3.14\")",
      "3.14",
      "Ko iz datoteke ali niza bereš decimalna števila.",
      "Decimalna pika je v Pythonovem zapisu števila pika, ne vejica."
    )
  );
  addEntry(
    "slovar-python",
    f(
      "bool",
      "karkoli",
      "bool(vrednost)",
      "Pretvori vrednost v logično vrednost po Pythonovih pravilih resničnosti.",
      "True ali False.",
      "bool([])\nbool([1])",
      "False\nTrue",
      "Ko želiš eksplicitno preveriti, kako se objekt obnaša v pogoju.",
      "Prazni nizi, seznami, slovarji, množice, tuple in število 0 se obnašajo kot False."
    )
  );
  addEntry(
    "slovar-python",
    f(
      "iter",
      "iterable",
      "iter(objekt)",
      "Iz iterabilnega objekta pridobi iterator.",
      "Iterator.",
      "it = iter([10, 20])\nnext(it)",
      "10",
      "Ko želiš ročno uporabljati next ali razumeti delovanje for zanke."
    )
  );
  addEntry(
    "slovar-python",
    f(
      "next",
      "iterator · generator",
      "next(iterator)",
      "Vrne naslednjo vrednost iteratorja oziroma generatorja.",
      "Naslednji element; ko elementov zmanjka, sproži StopIteration.",
      "g = (x * x for x in range(3))\nnext(g)\nnext(g)",
      "0\n1",
      "Pri generatorjih in ročnem premikanju po iteratorju."
    )
  );

  addEntry(
    "slovar-nizi",
    f(
      "endswith",
      "niz",
      "niz.endswith(konec)",
      "Preveri, ali se niz konča z danim podnizom.",
      "True ali False.",
      "\"porocilo.txt\".endswith(\".txt\")",
      "True",
      "Ko preverjaš končnico ali pripono niza."
    )
  );
  addEntry(
    "slovar-nizi",
    f(
      "isalpha",
      "niz",
      "niz.isalpha()",
      "Preveri, ali je niz neprazen in vsebuje samo črke.",
      "True ali False.",
      "\"Postaja\".isalpha()\n\"1A\".isalpha()",
      "True\nFalse",
      "Ko želiš ločiti besedilo od zapisov, ki vsebujejo številke."
    )
  );
  addEntry(
    "slovar-nizi",
    f(
      "isalnum",
      "niz",
      "niz.isalnum()",
      "Preveri, ali je niz neprazen in vsebuje samo črke in števke.",
      "True ali False.",
      "\"1A\".isalnum()",
      "True",
      "Ko dovoljuješ črke in števke, ne pa ločil ali presledkov."
    )
  );
  addEntry(
    "slovar-nizi",
    f(
      "find",
      "niz",
      "niz.find(podniz)",
      "Poišče prvo pojavitev podniza.",
      "Indeks prve pojavitve ali -1, če podniza ni.",
      "\"programiranje\".find(\"gram\")\n\"programiranje\".find(\"xyz\")",
      "3\n-1",
      "Ko želiš iskati brez napake, če podniza ni.",
      "niz.index(...) je podoben, vendar sproži ValueError, če podniza ni."
    )
  );

  addEntry(
    "slovar-datoteke",
    f(
      "writelines",
      "datoteka · seznam nizov",
      "datoteka.writelines(seznam_nizov)",
      "Zaporedoma zapiše vse nize iz podanega seznama v datoteko.",
      "None.",
      "vrstice = [\"prva\\n\", \"druga\\n\"]\nwith open(\"a.txt\", \"w\", encoding=\"utf-8\") as dat:\n    dat.writelines(vrstice)",
      "datoteka vsebuje dve vrstici: prva in druga",
      "Ko imaš že pripravljen seznam vrstic in jih želiš zapisati naenkrat.",
      "writelines() sama ne doda znaka \\n."
    )
  );

  if (!functionGroups.some((group) => group.id === "slovar-regex")) {
    functionGroups.push({
      id: "slovar-regex",
      nav: "Regex",
      title: "Regularni izrazi — modul re",
      description: "Iskanje, izločanje in zamenjevanje vzorcev v besedilu. Pred uporabo napiši import re.",
      entries: [
        f(
          "re.search",
          "niz · regex",
          "re.search(vzorec, besedilo, flags=0)",
          "Poišče prvo pojavitev vzorca kjerkoli v besedilu.",
          "Objekt Match ali None.",
          "m = re.search(r\"\\d+\", \"Cena je 42 EUR\")\nm.group()",
          "'42'",
          "Ko želiš ugotoviti, ali se vzorec pojavi, in nato dostopati do zadetka."
        ),
        f(
          "re.match",
          "niz · regex",
          "re.match(vzorec, besedilo, flags=0)",
          "Preveri ujemanje samo na začetku besedila.",
          "Objekt Match ali None.",
          "re.match(r\"\\d+\", \"123 abc\").group()",
          "'123'",
          "Ko mora biti vzorec na začetku niza.",
          "Za ujemanje kjerkoli uporabi re.search."
        ),
        f(
          "re.findall",
          "niz · regex",
          "re.findall(vzorec, besedilo, flags=0)",
          "Poišče vse nepokrite zadetke vzorca.",
          "Seznam nizov; če vzorec vsebuje zajemne skupine, seznam vsebin teh skupin.",
          "re.findall(r\"\\b\\w+\\b\", \"ena dva tri\")",
          "['ena', 'dva', 'tri']",
          "Ko želiš vse zadetke dobiti neposredno kot seznam."
        ),
        f(
          "re.finditer",
          "niz · regex",
          "re.finditer(vzorec, besedilo, flags=0)",
          "Poišče vse zadetke in jih vrača kot objekte Match.",
          "Iterator objektov Match.",
          "[m.group() for m in re.finditer(r\"\\d+\", \"2 in 15\")]",
          "['2', '15']",
          "Ko potrebuješ celoten zadetek, skupine ali položaj vsakega zadetka."
        ),
        f(
          "re.sub",
          "niz · regex",
          "re.sub(vzorec, nadomestek, besedilo, flags=0)",
          "Vsak zadetek zamenja z nizom ali z rezultatom nadomestne funkcije.",
          "Nov niz.",
          "re.sub(r\"\\?+\", \"?\", \"Kaj??? Res??\")",
          "'Kaj? Res?'",
          "Ko popravljaš ali preoblikuješ besedilo.",
          "Drugi argument je lahko tudi funkcija, ki sprejme Match."
        ),
        f(
          "Match.group",
          "Match · regex",
          "zadetek.group()\nzadetek.group(1)",
          "Vrne celoten zadetek oziroma vsebino izbrane zajemne skupine.",
          "Niz.",
          "m = re.search(r\"(\\d+)-(\\d+)\", \"12-34\")\nm.group(2)",
          "'34'",
          "Ko v regexu uporabljaš oklepaje in potrebuješ ujeti del besedila."
        )
      ]
    });
  }

  buildFunctionReference();
  buildFunctionNavigation();

  // ---------------------------------------------------------------------------
  // Dopolnitve obstoječih poglavij
  // ---------------------------------------------------------------------------
  const stringsGrid = document.querySelector("#nizi .grid");
  if (stringsGrid && !document.querySelector("#nizi-preverjanje")) {
    stringsGrid.insertAdjacentHTML(
      "beforeend",
      `<article id="nizi-preverjanje" class="card wide search-item" data-keywords="isdigit isalpha isalnum startswith endswith find index nizi preverjanje">
        <h3>Preverjanje vsebine in položaja v nizu</h3>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr><td><code>niz.isdigit()</code></td><td><code>bool</code>: samo števke in niz ni prazen</td></tr>
              <tr><td><code>niz.isalpha()</code></td><td><code>bool</code>: samo črke in niz ni prazen</td></tr>
              <tr><td><code>niz.isalnum()</code></td><td><code>bool</code>: samo črke in števke</td></tr>
              <tr><td><code>niz.startswith(x)</code></td><td><code>bool</code>: ali se niz začne z <code>x</code></td></tr>
              <tr><td><code>niz.endswith(x)</code></td><td><code>bool</code>: ali se niz konča z <code>x</code></td></tr>
              <tr><td><code>niz.find(x)</code></td><td>indeks ali <code>-1</code></td></tr>
              <tr><td><code>niz.index(x)</code></td><td>indeks; če <code>x</code> manjka, napaka</td></tr>
            </tbody>
          </table>
        </div>
        <pre><code>vrstica = "1A"
vrstica[0].isdigit()      # True
vrstica.isdigit()         # False

"porocilo.txt".endswith(".txt")   # True</code></pre>
      </article>`
    );
  }

  const listsGrid = document.querySelector("#seznami .grid");
  if (listsGrid && !document.querySelector("#seznami-vracanje")) {
    listsGrid.insertAdjacentHTML(
      "beforeend",
      `<article id="seznami-vracanje" class="card wide search-item" data-keywords="seznam metode append extend insert remove pop sort reverse index count vrne None">
        <h3>Metode seznamov: kaj spremenijo in kaj vrnejo?</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Metoda</th><th>Spremeni seznam?</th><th>Vrne</th></tr></thead>
            <tbody>
              <tr><td><code>append(x)</code></td><td>da</td><td><code>None</code></td></tr>
              <tr><td><code>extend(xs)</code></td><td>da</td><td><code>None</code></td></tr>
              <tr><td><code>insert(i, x)</code></td><td>da</td><td><code>None</code></td></tr>
              <tr><td><code>remove(x)</code></td><td>da</td><td><code>None</code></td></tr>
              <tr><td><code>pop(i)</code></td><td>da</td><td>odstranjeni element</td></tr>
              <tr><td><code>sort()</code></td><td>da</td><td><code>None</code></td></tr>
              <tr><td><code>reverse()</code></td><td>da</td><td><code>None</code></td></tr>
              <tr><td><code>index(x)</code></td><td>ne</td><td>indeks</td></tr>
              <tr><td><code>count(x)</code></td><td>ne</td><td>število pojavitev</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout"><strong>Pogosta napaka:</strong> <code>seznam = seznam.extend(drugi)</code> nastavi <code>seznam</code> na <code>None</code>. Pravilno je najprej <code>seznam.extend(drugi)</code>, nato posebej <code>return seznam</code>.</div>
      </article>`
    );
  }

  const dictGrid = document.querySelector("#slovarji .grid");
  if (dictGrid && !document.querySelector("#slovarji-vracanje")) {
    dictGrid.insertAdjacentHTML(
      "beforeend",
      `<article id="slovarji-vracanje" class="card wide search-item" data-keywords="slovar get items keys values pop update metode kaj vrne">
        <h3>Slovarji: najpomembnejše metode in rezultat</h3>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr><td><code>slovar.get(k)</code></td><td>vrednost ali <code>None</code></td></tr>
              <tr><td><code>slovar.get(k, privzeto)</code></td><td>vrednost ali podano privzeto vrednost</td></tr>
              <tr><td><code>slovar.keys()</code></td><td>pogled ključev, uporaben v zanki</td></tr>
              <tr><td><code>slovar.values()</code></td><td>pogled vrednosti</td></tr>
              <tr><td><code>slovar.items()</code></td><td>pare <code>(ključ, vrednost)</code></td></tr>
              <tr><td><code>slovar.pop(k)</code></td><td>odstrani ključ in vrne njegovo vrednost</td></tr>
              <tr><td><code>slovar.update(drugi)</code></td><td>spremeni slovar in vrne <code>None</code></td></tr>
            </tbody>
          </table>
        </div>
        <pre><code># štetje / akumulacija
stevci[x] = stevci.get(x, 0) + 1

# ključ in vrednost hkrati
for kljuc, vrednost in slovar.items():
    ...</code></pre>
      </article>`
    );
  }

  const filesGrid = document.querySelector("#datoteke .grid");
  if (filesGrid && !document.querySelector("#datoteke-pregled")) {
    filesGrid.insertAdjacentHTML(
      "beforeend",
      `<article id="datoteke-pregled" class="card wide search-item" data-keywords="datoteke read readlines for write writelines print file r w a encoding vrne">
        <h3>Branje in pisanje: hiter pregled</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Zapis</th><th>Kaj naredi?</th><th>Vrne</th></tr></thead>
            <tbody>
              <tr><td><code>dat.read()</code></td><td>prebere celotno vsebino</td><td>en niz</td></tr>
              <tr><td><code>dat.readlines()</code></td><td>prebere vse vrstice</td><td>seznam nizov</td></tr>
              <tr><td><code>for vrstica in dat</code></td><td>bere vrstico po vrstico</td><td>iterira po nizih</td></tr>
              <tr><td><code>dat.write(niz)</code></td><td>zapiše niz</td><td>število zapisanih znakov</td></tr>
              <tr><td><code>dat.writelines(vrstice)</code></td><td>zapiše več nizov</td><td><code>None</code></td></tr>
              <tr><td><code>print(..., file=dat)</code></td><td>piše v datoteko in doda novo vrstico</td><td><code>None</code></td></tr>
            </tbody>
          </table>
        </div>
        <pre><code>with open(ime, "r", encoding="utf-8") as dat:
    for vrstica in dat:
        deli = vrstica.strip().split(",")

with open(izhod, "w", encoding="utf-8") as dat:
    print(" -> ".join(postaje), file=dat)</code></pre>
      </article>`
    );
  }

  if (filesGrid && !document.querySelector("#datoteke-nacini")) {
    filesGrid.insertAdjacentHTML(
      "beforeend",
      `<article id="datoteke-nacini" class="card search-item" data-keywords="open mode r w a x plus branje pisanje dodajanje">
        <h3>Načini <code>open</code></h3>
        <ul>
          <li><code>"r"</code> — branje; datoteka mora obstajati.</li>
          <li><code>"w"</code> — pisanje; prejšnjo vsebino izbriše.</li>
          <li><code>"a"</code> — dodajanje na konec; prejšnje vsebine ne izbriše.</li>
          <li><code>"x"</code> — ustvari novo datoteko; napaka, če že obstaja.</li>
          <li><code>"+"</code> — kombinacija branja in pisanja.</li>
        </ul>
      </article>`
    );
  }

  if (filesGrid && !document.querySelector("#vzorec-neprazna-vrstica")) {
    filesGrid.insertAdjacentHTML(
      "beforeend",
      `<article id="vzorec-neprazna-vrstica" class="card search-item" data-keywords="datoteka prazna vrstica strip preskok if">
        <h3>Preskoči prazne vrstice</h3>
        <pre><code>for vrstica in dat:
    if vrstica.strip():
        # obdelaj samo neprazno vrstico
        ...</code></pre>
        <p><code>vrstica.strip()</code> odstrani presledke in <code>\\n</code> z robov. Prazen niz se v pogoju obnaša kot <code>False</code>.</p>
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
    ...</code></pre>
        <p>Prazni <code>[]</code>, <code>""</code>, <code>{}</code>, <code>()</code> in <code>set()</code> se obnašajo kot <code>False</code>; neprazni kot <code>True</code>.</p>
      </article>`
    );
  }

  // ---------------------------------------------------------------------------
  // Razredi — razširjen pregled
  // ---------------------------------------------------------------------------
  const classesSection = document.querySelector("#razredi");
  if (classesSection) {
    classesSection.innerHTML = `
      <div class="section-heading">
        <h2>Razredi</h2>
        <p>Objekti, atributi, metode in posebne metode, ki določajo obnašanje objektov.</p>
      </div>

      <div class="grid">
        <article id="razredi-osnove" class="card wide search-item" data-keywords="class razred objekt atribut metoda self init konstruktor">
          <h3>Osnovni vzorec</h3>
          <pre><code>class Predmet:
    def __init__(self, masa, starost):
        self.masa = masa
        self.starost = starost

    def opis(self):
        return self.masa + self.starost

p = Predmet(4, 2)
p.masa          # 4
p.opis()        # 6</code></pre>
          <ul>
            <li><code>self</code> je trenutni objekt.</li>
            <li><code>self.masa</code> je atribut tega objekta.</li>
            <li>Pri klicu <code>p.opis()</code> argumenta <code>self</code> ne podamo sami.</li>
            <li><code>__init__</code> nastavi objekt in ne vrača uporabniške vrednosti.</li>
          </ul>
        </article>

        <article class="card wide search-item" data-keywords="posebne metode dunder str repr eq lt add getitem vsebuje operator">
          <h3>Posebne metode: zapis → metoda → rezultat</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Zapis</th><th>Python pokliče</th><th>Tipičen rezultat</th></tr></thead>
              <tbody>
                <tr><td><code>print(x)</code></td><td><code>x.__str__()</code></td><td><code>str</code></td></tr>
                <tr><td>prikaz <code>x</code></td><td><code>x.__repr__()</code></td><td><code>str</code></td></tr>
                <tr><td><code>x == y</code></td><td><code>x.__eq__(y)</code></td><td><code>bool</code></td></tr>
                <tr><td><code>x &lt; y</code></td><td><code>x.__lt__(y)</code></td><td><code>bool</code></td></tr>
                <tr><td><code>x + y</code></td><td><code>x.__add__(y)</code></td><td>vrednost ali nov objekt</td></tr>
                <tr><td><code>x[i]</code></td><td><code>x.__getitem__(i)</code></td><td>element ali rezina</td></tr>
                <tr><td><code>a in x</code></td><td><code>x.__contains__(a)</code></td><td><code>bool</code></td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="card search-item" data-keywords="str repr format f niz razred">
          <h3><code>__str__</code> in <code>__repr__</code></h3>
          <pre><code>def __str__(self):
    return self.beseda

def __repr__(self):
    return "Beseda('{0}')".format(self.beseda)</code></pre>
          <p>Obe metodi morata vrniti <strong>niz</strong>. Uporabiš lahko f-niz ali <code>.format()</code>.</p>
        </article>

        <article class="card search-item" data-keywords="getitem indeks rezina slice beseda">
          <h3><code>__getitem__</code>: omogoči <code>objekt[i]</code></h3>
          <pre><code>def __getitem__(self, i):
    return self.beseda[i]</code></pre>
          <p>Če atribut že podpira indeksiranje in rezine, jih lahko samo posreduješ. Zato lahko delujeta tako <code>a[0]</code> kot <code>a[1:5]</code>.</p>
        </article>

        <article class="card wide search-item" data-keywords="lt primerjava slovenska abeceda leksikografsko other razred">
          <h3><code>__lt__</code>: lastno pravilo za <code>&lt;</code> in sortiranje</h3>
          <pre><code>def __lt__(self, other):
    abeceda = "abcčdefghijklmnoprsštuvzž"

    for i in range(min(len(self.beseda), len(other.beseda))):
        a = abeceda.index(self.beseda[i])
        b = abeceda.index(other.beseda[i])
        if a &lt; b:
            return True
        elif a &gt; b:
            return False

    return len(self.beseda) &lt; len(other.beseda)</code></pre>
          <p>Če sta trenutni črki enaki, ne vrnemo ničesar, ampak pustimo zanki, da primerja naslednji črki. <code>list.sort()</code> nato uporablja to pravilo primerjanja.</p>
        </article>

        <article class="card search-item" data-keywords="class dedovanje razširitev podnaloga class Beseda Beseda">
          <h3>Razširitev že definiranega razreda</h3>
          <pre><code>class Beseda(Beseda):
    def __lt__(self, other):
        ...</code></pre>
          <p>Tak zapis se pri zaporednih podnalogah uporablja za razširitev prejšnje definicije. Pri prvi definiciji napišeš samo <code>class Beseda:</code>.</p>
        </article>

        <article class="card search-item" data-keywords="kopija seznam atribut alias polinom konstruktor">
          <h3>Ko konstruktor prejme seznam</h3>
          <pre><code>class Polinom:
    def __init__(self, koef):
        self.koef = koef[:]</code></pre>
          <p><code>koef[:]</code> naredi plitvo kopijo. Tako poznejša sprememba originalnega seznama ne spremeni avtomatsko atributa objekta.</p>
        </article>
      </div>`;
  }

  // ---------------------------------------------------------------------------
  // Rekurzija
  // ---------------------------------------------------------------------------
  let recursionSection = document.querySelector("#rekurzija");
  if (!recursionSection) {
    recursionSection = document.createElement("section");
    recursionSection.id = "rekurzija";
    recursionSection.className = "section";
    recursionSection.innerHTML = `
      <div class="section-heading">
        <h2>Rekurzija</h2>
        <p>Funkcija pokliče samo sebe na manjšem problemu, dokler ne doseže osnovnega primera.</p>
      </div>
      <div class="grid">
        <article class="card wide search-item" data-keywords="rekurzija osnovni primer base case recursive call vzorec">
          <h3>Dva obvezna dela rekurzije</h3>
          <pre><code>def funkcija(n):
    if osnovni_primer:
        return neposreden_rezultat

    return nekaj + funkcija(manjši_problem)</code></pre>
          <ol>
            <li><strong>Osnovni primer</strong> ustavi klice.</li>
            <li><strong>Rekurzivni korak</strong> mora problem zmanjšati oziroma približati osnovnemu primeru.</li>
          </ol>
          <div class="callout danger">Če se argument ne približuje osnovnemu primeru, dobiš neskončno rekurzijo in nato <code>RecursionError</code>.</div>
        </article>

        <article class="card search-item" data-keywords="fakulteta factorial rekurzija n minus ena">
          <h3>Fakulteta</h3>
          <pre><code>def fakulteta(n):
    if n == 0:
        return 1
    return n * fakulteta(n - 1)</code></pre>
          <p><code>0! = 1</code> je osnovni primer; sicer velja <code>n! = n · (n-1)!</code>.</p>
        </article>

        <article class="card search-item" data-keywords="vsota števk digits modulo deljenje rekurzija">
          <h3>Vsota števk</h3>
          <pre><code>def vsota_stevk(n):
    if n == 0:
        return 0
    return n % 10 + vsota_stevk(n // 10)</code></pre>
          <p><code>n % 10</code> vzame zadnjo števko, <code>n // 10</code> pa jo odstrani.</p>
        </article>

        <article class="card wide search-item" data-keywords="binomski simbol rekurzija dve veji pascal">
          <h3>Dve rekurzivni veji: binomski simbol</h3>
          <pre><code>def binomski(n, k):
    if k == 0 or k == n:
        return 1
    return binomski(n - 1, k) + binomski(n - 1, k - 1)</code></pre>
          <p>Rekurzija ni vedno en sam klic. Formula lahko zahteva več rekurzivnih vej.</p>
        </article>

        <article class="card wide search-item" data-keywords="merge sort zlivanje rekurzija razdeli in vladaj divide conquer">
          <h3>Vzorec »razdeli in vladaj«</h3>
          <pre><code>def uredi(seznam):
    if len(seznam) &lt;= 1:
        return seznam

    sredina = len(seznam) // 2
    leva = uredi(seznam[:sredina])
    desna = uredi(seznam[sredina:])
    return zlij(leva, desna)</code></pre>
          <p>Problem razdeliš, oba dela rekurzivno rešiš in nato rezultata združiš.</p>
        </article>
      </div>`;

    const loopsSection = document.querySelector("#zanke");
    loopsSection?.insertAdjacentElement("beforebegin", recursionSection);
  }

  // ---------------------------------------------------------------------------
  // Generatorji
  // ---------------------------------------------------------------------------
  let generatorsSection = document.querySelector("#generatorji");
  if (!generatorsSection) {
    generatorsSection = document.createElement("section");
    generatorsSection.id = "generatorji";
    generatorsSection.className = "section";
    generatorsSection.innerHTML = `
      <div class="section-heading">
        <h2>Generatorji</h2>
        <p><code>yield</code> vrne naslednjo vrednost in si zapomni stanje funkcije.</p>
      </div>
      <div class="grid">
        <article class="card wide search-item" data-keywords="generator yield next return StopIteration">
          <h3><code>yield</code> proti <code>return</code></h3>
          <pre><code>def potence_naravnih(k):
    n = 1
    while True:
        yield n ** k
        n += 1

g = potence_naravnih(2)
next(g)   # 1
next(g)   # 4
next(g)   # 9</code></pre>
          <p><code>return</code> funkcijo konča. <code>yield</code> jo samo začasno ustavi; naslednji <code>next</code> nadaljuje za prejšnjim <code>yield</code>.</p>
        </article>

        <article class="card search-item" data-keywords="generator končen while delitelji collatz yield">
          <h3>Končen generator</h3>
          <pre><code>def delitelji(n):
    for i in range(1, n + 1):
        if n % i == 0:
            yield i</code></pre>
          <p>Ko funkcija pride do konca, generator ob naslednjem <code>next</code> sproži <code>StopIteration</code>.</p>
        </article>

        <article class="card search-item" data-keywords="generator neskončen while True">
          <h3>Neskončen generator</h3>
          <pre><code>def naravna():
    n = 1
    while True:
        yield n
        n += 1</code></pre>
          <p>Neskončno zaporedje je varno, dokler uporabnik zahteva le toliko elementov, kolikor jih potrebuje.</p>
        </article>
      </div>`;

    document.querySelector("#razredi")?.insertAdjacentElement("afterend", generatorsSection);
  }

  // ---------------------------------------------------------------------------
  // Regularni izrazi
  // ---------------------------------------------------------------------------
  let regexSection = document.querySelector("#regex");
  if (!regexSection) {
    regexSection = document.createElement("section");
    regexSection.id = "regex";
    regexSection.className = "section";
    regexSection.innerHTML = `
      <div class="section-heading">
        <h2>Regularni izrazi</h2>
        <p>Za iskanje in preoblikovanje besedila z modulom <code>re</code>.</p>
      </div>
      <div class="grid">
        <article class="card wide search-item" data-keywords="regex regularni izrazi import re raw string r zapis">
          <h3>Osnovni zapis</h3>
          <pre><code>import re

vzorec = r"\\b\\w+\\b"
re.findall(vzorec, "Tri kratke besede.")
# ['Tri', 'kratke', 'besede']</code></pre>
          <p>Za regex je praktičen <strong>raw string</strong> <code>r"..."</code>, ker poševnic <code>\\</code> ni treba dodatno podvajati.</p>
        </article>

        <article class="card wide search-item" data-keywords="regex znaki b w d s pika plus zvezdica vprasaj skupina oklepaj character class">
          <h3>Najpomembnejši znaki</h3>
          <div class="table-wrap">
            <table>
              <tbody>
                <tr><td><code>\\d</code></td><td>števka</td></tr>
                <tr><td><code>\\w</code></td><td>znak besede: črka, števka ali <code>_</code></td></tr>
                <tr><td><code>\\s</code></td><td>presledek / whitespace</td></tr>
                <tr><td><code>\\b</code></td><td>meja besede</td></tr>
                <tr><td><code>.</code></td><td>poljuben znak</td></tr>
                <tr><td><code>*</code></td><td>0 ali več ponovitev</td></tr>
                <tr><td><code>+</code></td><td>1 ali več ponovitev</td></tr>
                <tr><td><code>?</code></td><td>0 ali 1 ponovitev</td></tr>
                <tr><td><code>[abc]</code></td><td>eden izmed navedenih znakov</td></tr>
                <tr><td><code>(...)</code></td><td>zajemna skupina</td></tr>
                <tr><td><code>|</code></td><td>ali</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="card search-item" data-keywords="findall seznam regex besede predpona pripona">
          <h3><code>re.findall</code> → seznam zadetkov</h3>
          <pre><code>podniz = "de"
vzorec = r"\\b\\w*" + podniz + r"\\w*\\b"
set(re.findall(vzorec, besedilo))</code></pre>
          <p>Uporabno, ko želiš vse besede, ki vsebujejo dan podniz, predpono ali pripono.</p>
        </article>

        <article class="card search-item" data-keywords="sub zamenjava vprašaji regex re.sub">
          <h3><code>re.sub</code> → nov popravljen niz</h3>
          <pre><code>re.sub(r"\\?+", "?", "Kaj??? Res??")
# 'Kaj? Res?'

re.sub(r"-?\\d+(?:,\\d+)?", "10", naloga)</code></pre>
          <p>Vzorec drugega primera ujame tudi negativen predznak in decimalni del z vejico.</p>
        </article>

        <article class="card wide search-item" data-keywords="regex skupine group backreference povratni sklic denar enota re.sub">
          <h3>Skupine in uporaba ujetih delov</h3>
          <pre><code># € 2 ali $3  →  2 € oziroma 3 $
re.sub(r"([€$])\\s*(\\d+)", r"\\2 \\1", besedilo)

# dvojna črka: ista črka dvakrat zapored
vzorec = r"\\b\\w*(\\w)\\1\\w*\\b"
rezultat = {m.group() for m in re.finditer(vzorec, besedilo)}</code></pre>
          <ul>
            <li><code>(...)</code> ustvari skupino.</li>
            <li><code>\\1</code>, <code>\\2</code> se sklicujeta na prej ujeti skupini.</li>
            <li><code>m.group()</code> vrne celoten zadetek; <code>m.group(1)</code> prvo skupino.</li>
          </ul>
        </article>

        <article class="card wide search-item" data-keywords="re.sub funkcija nadomestek Match cenzura ignorecase flags">
          <h3>Nadomestek je lahko funkcija</h3>
          <pre><code>def nadomestek(zadetek):
    return "X" * len(zadetek.group())

vzorec = r"\\b(" + "|".join(nedopustne_besede) + r")\\b"
return re.sub(
    vzorec,
    nadomestek,
    besedilo,
    flags=re.IGNORECASE,
)</code></pre>
          <p><code>re.IGNORECASE</code> pomeni, da pri ujemanju ne razlikujemo med velikimi in malimi črkami.</p>
        </article>
      </div>`;

    document.querySelector("#nizi")?.insertAdjacentElement("afterend", regexSection);
  }

  // ---------------------------------------------------------------------------
  // Viri
  // ---------------------------------------------------------------------------
  let sourcesSection = document.querySelector("#viri");
  if (!sourcesSection) {
    sourcesSection = document.createElement("section");
    sourcesSection.id = "viri";
    sourcesSection.className = "section";
    sourcesSection.innerHTML = `
      <div class="section-heading">
        <h2>Viri</h2>
        <p>Daljše razlage, primeri in zvezki, iz katerih je smiselno nadaljevati učenje.</p>
      </div>
      <div class="grid">
        <article class="card wide search-item" data-keywords="viri matija pretnar uvod programiranje teorija">
          <h3>Uvod v programiranje — Matija Pretnar</h3>
          <p>Obsežnejši učbenik za osnove Pythona, rekurzijo, nize, zanke, sezname, slovarje, razrede, datoteke in regularne izraze.</p>
          <p><a href="https://matija.pretnar.info/uvod-v-programiranje/00-uvod.html" target="_blank" rel="noopener">Odpri Uvod v programiranje ↗</a></p>
        </article>

        <article class="card wide search-item" data-keywords="viri rok kuk python racunalniski praktikum fizika vaje">
          <h3>Računalniški praktikum (fizika) — Rok Kuk</h3>
          <p>Kratki zapiski za Python, zanke, sezname in nize, slovarje, datoteke, NumPy ter dodatne teme.</p>
          <p><a href="https://python.rokuk.org/" target="_blank" rel="noopener">Odpri python.rokuk.org ↗</a></p>
        </article>

        <article class="card search-item" data-keywords="zvezek snov ipynb teorija primeri">
          <h3>Snov</h3>
          <p>Celoten lokalni zvezek s teorijo, primeri in vajami.</p>
          <p><a href="notebook.html?file=snov.ipynb">Odpri <code>snov.ipynb</code> →</a></p>
        </article>

        <article class="card search-item" data-keywords="izpiti RP naloge resitve zvezek">
          <h3>Izpiti RP</h3>
          <p>Zbirka nalog in rešitev za preverjanje programerskih vzorcev v konkretnih problemih.</p>
          <p><a href="notebook.html?file=izpitiRP.ipynb">Odpri <code>izpitiRP.ipynb</code> →</a></p>
        </article>
      </div>`;

    document.querySelector("#funkcije")?.insertAdjacentElement("beforebegin", sourcesSection);
  }

  // ---------------------------------------------------------------------------
  // Navigacija
  // ---------------------------------------------------------------------------
  const nav = document.querySelector(".nav");
  const addNavLink = (href, text, beforeSelector = null) => {
    if (!nav || nav.querySelector(`a[href="${href}"]`)) return;
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    const before = beforeSelector ? nav.querySelector(beforeSelector) : null;
    if (before) before.insertAdjacentElement("beforebegin", link);
    else nav.appendChild(link);
  };

  addNavLink("#rekurzija", "Rekurzija", 'a[href="#zanke"]');
  addNavLink("#regex", "Regularni izrazi", 'a[href="#seznami"]');
  addNavLink("#generatorji", "Generatorji", 'a[href="#funkcije"]');
  addNavLink("#viri", "Viri", 'a[href="#funkcije"]');

  if (nav && !nav.querySelector('a[href="zvezki.html"]')) {
    const link = document.createElement("a");
    link.href = "zvezki.html";
    link.textContent = "Zvezki";
    link.className = "emphasis";
    const functionsLink = nav.querySelector('a[href="#funkcije"]');
    if (functionsLink) functionsLink.insertAdjacentElement("afterend", link);
    else nav.appendChild(link);
  }

  // ---------------------------------------------------------------------------
  // Zgornje bližnjice in nekaj nevtralnih opisov
  // ---------------------------------------------------------------------------
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
      #viri a { font-weight: 700; }
      @media (max-width: 760px) {
        .notebook-shortcuts { grid-template-columns: 1fr 1fr; }
        .notebook-shortcuts-label { grid-column: 1 / -1; }
        .notebook-shortcuts .all-notebooks { grid-column: 1 / -1; }
      }
    `;
    document.head.appendChild(style);
  }

  // app-base.js shrani seznam sekcij ob nalaganju; dodamo tudi dinamične sekcije,
  // da jih iskalnik pravilno skriva in kaže.
  if (typeof sections !== "undefined") {
    [recursionSection, generatorsSection, regexSection, sourcesSection].forEach((section) => {
      if (section && !sections.includes(section)) sections.push(section);
    });
  }

  if (typeof updateSearch === "function") updateSearch();
};

baseScript.onerror = () => {
  console.error("Ni bilo mogoče naložiti osnovnega priročnika.");
};

document.head.appendChild(baseScript);
