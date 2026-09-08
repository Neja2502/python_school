(() => {
  function installAuditAdditions() {
    if (typeof functionGroups === "undefined" || typeof f === "undefined") {
      setTimeout(installAuditAdditions, 25);
      return;
    }

    // Počakamo, da se izvede obstoječi app.js in zgradi trenutne razširitve.
    if (!document.querySelector("#viri")) {
      setTimeout(installAuditAdditions, 25);
      return;
    }

    const addEntry = (groupId, entry) => {
      const group = functionGroups.find((item) => item.id === groupId);
      if (!group || group.entries.some((item) => item.name === entry.name)) return;
      group.entries.push(entry);
    };

    addEntry(
      "slovar-python",
      f(
        "input",
        "uporabniški vnos",
        "input(poziv)",
        "Prebere eno vrstico uporabnikovega vnosa.",
        "Vedno vrne niz str.",
        "n = input(\"Vnesi število: \")\ntype(n)",
        "<class 'str'>",
        "Ko program podatke dobi neposredno od uporabnika.",
        "Če želiš število, ga nato pretvori z int(...) ali float(...)."
      )
    );

    addEntry(
      "slovar-nizi",
      f(
        "title",
        "niz",
        "niz.title()",
        "Vsako besedo zapiše z veliko začetnico, preostale črke pa z malimi.",
        "Nov niz str.",
        "\"micka kovačeva\".title()",
        "'Micka Kovačeva'",
        "Ko želiš poenotiti zapis imen ali naslovov.",
        "Originalnega niza ne spremeni."
      )
    );
    addEntry(
      "slovar-nizi",
      f(
        "isnumeric",
        "niz",
        "niz.isnumeric()",
        "Preveri, ali je niz neprazen in so vsi njegovi znaki številski.",
        "True ali False.",
        "\"123\".isnumeric()\n\"-123\".isnumeric()",
        "True\nFalse",
        "Ko pred pretvorbo preverjaš zapis nenegativnega števila.",
        "Predznak minus ni številski znak, zato ga pri negativnih številih preveri posebej."
      )
    );

    addEntry(
      "slovar-slovarji",
      f(
        "set.pop",
        "množica",
        "množica.pop()",
        "Odstrani in vrne en poljuben element množice.",
        "Odstranjeni element.",
        "s = {2, 5, 8}\nx = s.pop()",
        "x je eden od elementov; ta element je odstranjen iz s",
        "Ko želiš iz množice vzeti poljuben element.",
        "Množica nima vrstnega reda, zato ne računaj, kateri element bo pop() vrnil."
      )
    );
    addEntry(
      "slovar-slovarji",
      f(
        "set.update",
        "množica",
        "množica.update(zaporedje)",
        "V množico doda vse elemente podanega iterable objekta.",
        "None; spremeni originalno množico.",
        "s = {1, 2}\ns.update([2, 3, 4])",
        "s je {1, 2, 3, 4}",
        "Ko želiš množico razširiti z več elementi naenkrat."
      )
    );

    addEntry(
      "slovar-datoteke",
      f(
        "readlines",
        "datoteka",
        "datoteka.readlines()",
        "Prebere vse vrstice datoteke.",
        "Seznam nizov; posamezni nizi praviloma še vsebujejo \\n.",
        "with open(\"a.txt\", encoding=\"utf-8\") as dat:\n    vrstice = dat.readlines()",
        "vrstice je seznam nizov",
        "Ko res potrebuješ vse vrstice hkrati.",
        "Za veliko datoteko je navadno bolje iterirati: for vrstica in dat:."
      )
    );

    addEntry(
      "slovar-numpy-osnove",
      f(
        "np.eye",
        "NumPy",
        "np.eye(N, M=None, k=0, dtype=float)",
        "Ustvari tabelo z enicami na izbrani diagonali in ničlami drugje.",
        "Novo 2D NumPy tabelo.",
        "np.eye(3, dtype=int)",
        "array([[1, 0, 0], [0, 1, 0], [0, 0, 1]])",
        "Ko potrebuješ identično ali diagonalno matriko."
      )
    );
    addEntry(
      "slovar-numpy-osnove",
      f(
        "np.identity",
        "NumPy",
        "np.identity(n, dtype=float)",
        "Ustvari kvadratno identično matriko velikosti n × n.",
        "Novo 2D NumPy tabelo.",
        "np.identity(3, dtype=int)",
        "array([[1, 0, 0], [0, 1, 0], [0, 0, 1]])",
        "Ko potrebuješ kvadratno identično matriko.",
        "np.eye je splošnejši: dovoljuje tudi pravokotno matriko in zamik diagonale."
      )
    );
    addEntry(
      "slovar-numpy-statistika",
      f(
        "tabela.mean",
        "NumPy · metoda",
        "tabela.mean(axis=os)",
        "Izračuna povprečje vseh elementov ali po izbrani osi.",
        "Eno število ali NumPy tabelo povprečij.",
        "a = np.array([[1, 3], [5, 7]])\na.mean(axis=1)",
        "array([2., 6.])",
        "Ko želiš metodo na že obstoječi NumPy tabeli.",
        "Enakovredno np.mean(a, axis=...)."
      )
    );
    addEntry(
      "slovar-numpy-statistika",
      f(
        "tabela.std",
        "NumPy · metoda",
        "tabela.std(axis=os)",
        "Izračuna standardni odklon vseh elementov ali po izbrani osi.",
        "Eno število ali NumPy tabelo standardnih odklonov.",
        "a = np.array([[1, 1], [1, 3]])\na.std(axis=1)",
        "array([0., 1.])",
        "Ko želiš standardni odklon kot metodo NumPy tabele.",
        "Enakovredno np.std(a, axis=...)."
      )
    );

    if (!functionGroups.some((group) => group.id === "slovar-dodatni-moduli")) {
      functionGroups.push({
        id: "slovar-dodatni-moduli",
        nav: "Dodatni moduli",
        title: "Dodatni moduli iz zvezka",
        description: "Manj pogosti pripomočki iz modulov string in scipy.special, ki se pojavijo v snov.ipynb.",
        entries: [
          f(
            "string.ascii_uppercase",
            "modul string · konstanta",
            "import string\nstring.ascii_uppercase",
            "Niz vseh velikih angleških črk od A do Z.",
            "Niz str.",
            "string.ascii_uppercase[:5]",
            "'ABCDE'",
            "Ko potrebuješ standardni seznam črk, npr. pri zapisih števil z bazami do 36.",
            "To je konstanta, ne funkcija, zato nima oklepajev."
          ),
          f(
            "sp.binom",
            "SciPy · scipy.special",
            "import scipy.special as sp\nsp.binom(n, k)",
            "Izračuna binomski koeficient.",
            "Število; scipy.special.binom praviloma uporablja plavajoči tip.",
            "sp.binom(5, 2)",
            "10.0",
            "Ko naloga izrecno uporablja scipy.special za binomski koeficient."
          )
        ]
      });
    }

    if (typeof buildFunctionReference === "function") buildFunctionReference();
    if (typeof buildFunctionNavigation === "function") buildFunctionNavigation();

    const listsGrid = document.querySelector("#seznami .grid");
    if (listsGrid && !document.querySelector("#izpeljani-zapisi")) {
      listsGrid.insertAdjacentHTML(
        "beforeend",
        `<article id="izpeljani-zapisi" class="card wide search-item" data-keywords="list comprehension set comprehension dict comprehension generator expression lambda pogojni izraz ternary key sort">
          <h3>Izpeljani zapisi, generator izraz in <code>lambda</code></h3>
          <div class="table-wrap"><table>
            <thead><tr><th>Zapis</th><th>Vrne</th></tr></thead>
            <tbody>
              <tr><td><code>[f(x) for x in podatki if pogoj]</code></td><td>nov seznam</td></tr>
              <tr><td><code>{f(x) for x in podatki if pogoj}</code></td><td>novo množico</td></tr>
              <tr><td><code>{k: v for k, v in pari}</code></td><td>nov slovar</td></tr>
              <tr><td><code>(f(x) for x in podatki)</code></td><td>generator, ne seznam</td></tr>
              <tr><td><code>lambda x: izraz</code></td><td>kratko anonimno funkcijo</td></tr>
              <tr><td><code>a if pogoj else b</code></td><td><code>a</code> ali <code>b</code></td></tr>
            </tbody>
          </table></div>
          <pre><code>kvadrati = [x ** 2 for x in range(5)]
# [0, 1, 4, 9, 16]

pari.sort(key=lambda p: (-p[1], p[0]))

vsota = sum(x for x in podatki if x &gt; 0)</code></pre>
          <p>Oglati oklepaji naredijo seznam, zaviti množico oziroma slovar, okrogli oklepaji pri takem zapisu pa generator.</p>
        </article>`
      );
    }

    if (listsGrid && !document.querySelector("#mnozice-metode")) {
      listsGrid.insertAdjacentHTML(
        "beforeend",
        `<article id="mnozice-metode" class="card search-item" data-keywords="set množica add update pop unija presek elementi">
          <h3>Množica <code>set</code>: pogoste operacije</h3>
          <pre><code>s = set()          # prazna množica
s.add(3)           # doda en element; vrne None
s.update([4, 5])   # doda več elementov; vrne None
x = s.pop()        # odstrani in vrne poljuben element

a | b              # unija
a &amp; b              # presek
a - b              # razlika množic</code></pre>
          <p>Množica hrani unikatne elemente in nima indeksov oziroma določenega vrstnega reda.</p>
        </article>`
      );
    }

    // V slovarju funkcij je float že dodan v prejšnji plasti; dodamo še jasno opombo o neskončnosti.
    const floatGroup = functionGroups.find((group) => group.id === "slovar-python");
    const floatEntry = floatGroup?.entries.find((entry) => entry.name === "float");
    if (floatEntry && !String(floatEntry.note || "").includes("-inf")) {
      floatEntry.note = `${floatEntry.note || ""} float(\"inf\") in float(\"-inf\") predstavljata pozitivno in negativno neskončnost.`.trim();
    }

    if (typeof buildFunctionReference === "function") buildFunctionReference();
    if (typeof buildFunctionNavigation === "function") buildFunctionNavigation();
    if (typeof updateSearch === "function") updateSearch();
  }

  installAuditAdditions();
})();