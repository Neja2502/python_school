function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function f(name, target, meaning, syntax, example, when, note = "") {
  return { name, target, meaning, syntax, example, when, note };
}

const functionGroups = [
  {
    title: "Python — splošne funkcije",
    description: "Vgrajene funkcije, ki jih uporabljaš pri različnih tipih podatkov.",
    entries: [
      f("abs", "število", "Vrne absolutno vrednost števila.", "abs(x)", "abs(-7)  # 7", "Ko potrebuješ velikost vrednosti brez predznaka.", "Za NumPy tabele uporabi np.abs(...)."),
      f("all", "seznam · iterable", "Vrne True samo, če so vsi elementi oziroma vsi preverjeni pogoji resnični.", "all(iterable)", "all(x > 0 for x in [2, 5, 1])  # True", "Ko mora pogoj veljati za vse elemente.", "Za NumPy tabele uporabi np.all(...)."),
      f("any", "seznam · iterable", "Vrne True, če je vsaj en element oziroma pogoj resničen.", "any(iterable)", "any(x < 0 for x in [2, -5, 1])  # True", "Ko zadostuje, da pogoj velja za vsaj en element.", "Za NumPy tabele uporabi np.any(...)."),
      f("enumerate", "niz · seznam · iterable", "Med iteriranjem hkrati vrača indeks in element.", "enumerate(iterable, start=0)", "for i, x in enumerate([10, 20]):\n    print(i, x)", "Ko v zanki potrebuješ tako indeks kot element."),
      f("int", "število · niz", "Pretvori vrednost v celo število.", "int(x)", "int(\"42\")  # 42", "Ko bereš cela števila iz nizov ali želiš celoštevilsko vrednost."),
      f("len", "niz · seznam · slovar · tuple · NumPy", "Vrne dolžino oziroma število elementov prve ravni.", "len(objekt)", "len([4, 7, 9])  # 3", "Ko potrebuješ dolžino zaporedja ali število ključev slovarja.", "Pri 2D NumPy tabeli len(tab) vrne število vrstic, ne skupnega števila elementov."),
      f("list", "iterable", "Iz iterable objekta ustvari seznam.", "list(iterable)", "list(\"abc\")  # ['a', 'b', 'c']", "Ko želiš podatke pretvoriti v spremenljiv seznam."),
      f("max", "seznam · tuple · iterable", "Vrne največji element.", "max(iterable)", "max([4, 9, 2])  # 9", "Ko potrebuješ največjo vrednost v običajnem Python zaporedju.", "Za NumPy tabelo uporabi np.max(...)."),
      f("min", "seznam · tuple · iterable", "Vrne najmanjši element.", "min(iterable)", "min([4, 9, 2])  # 2", "Ko potrebuješ najmanjšo vrednost v običajnem Python zaporedju.", "Za NumPy tabelo uporabi np.min(...)."),
      f("open", "datoteka", "Odpre datoteko za branje, pisanje ali dodajanje.", "open(pot, način, encoding=\"utf-8\")", "with open(\"podatki.txt\", \"r\", encoding=\"utf-8\") as dat:\n    vsebina = dat.read()", "Ko bereš ali zapisuješ tekstovne datoteke.", "Najvarneje je uporabljati with open(...), ker se datoteka samodejno zapre."),
      f("print", "karkoli", "Izpiše vrednosti v konzolo ali v datoteko.", "print(vrednost1, vrednost2, ..., file=None)", "print(\"rezultat:\", 5)\nprint(\"vrstica\", file=dat)", "Za prikaz ali zapis izpisa.", "print ne vrača rezultata funkcije; za to uporabi return."),
      f("range", "zanka", "Ustvari zaporedje celih števil, najpogosteje za for zanko.", "range(konec)\nrange(začetek, konec)\nrange(začetek, konec, korak)", "for i in range(0, 6, 2):\n    print(i)  # 0, 2, 4", "Ko potrebuješ indekse ali določeno zaporedje celih števil.", "Konec ni vključen."),
      f("round", "število", "Zaokroži število na izbrano število decimalnih mest.", "round(x, ndigits)", "round(3.14159, 2)  # 3.14", "Ko želiš zaokrožen rezultat."),
      f("set", "iterable", "Ustvari množico unikatnih elementov.", "set(iterable)", "set([1, 1, 2, 3])  # {1, 2, 3}", "Ko želiš odstraniti ponovitve ali hitro preverjati pripadnost."),
      f("slice", "niz · seznam · NumPy", "Ustvari objekt rezine, ki opisuje začetek, konec in korak.", "slice(začetek, konec, korak)", "rezina = slice(0, 8, 2)\na[rezina]", "Ko moraš rezino sestaviti programsko, npr. pri večdimenzionalnih NumPy tabelah.", "Običajno je krajši zapis a[začetek:konec:korak]."),
      f("sorted", "niz · seznam · iterable", "Vrne nov urejen seznam; originala ne spremeni.", "sorted(iterable, key=None, reverse=False)", "sorted([3, 1, 2])  # [1, 2, 3]", "Ko želiš urejeno kopijo podatkov.", "Za spremembo obstoječega seznama uporabi seznam.sort()."),
      f("str", "karkoli", "Pretvori vrednost v niz.", "str(x)", "str(42)  # '42'", "Ko sestavljaš besedilo ali pripravljaš vrednost za zapis v datoteko."),
      f("sum", "seznam · tuple · iterable", "Sešteje elemente.", "sum(iterable)", "sum([2, 4, 6])  # 12", "Ko seštevaš običajno Python zaporedje števil.", "Za NumPy tabele uporabi np.sum(...)."),
      f("tuple", "iterable", "Ustvari nabor (tuple), nespremenljivo zaporedje.", "tuple(iterable)", "tuple([1, 2])  # (1, 2)", "Za pare, več vrnjenih vrednosti ali podatke, ki jih ne želiš spreminjati."),
      f("type", "karkoli", "Vrne tip objekta.", "type(objekt)", "type([1, 2])  # <class 'list'>", "Ko preverjaš, kakšen tip vrednosti imaš."),
      f("zip", "niz · seznam · iterable", "Poveže elemente več iterable objektov po istem položaju.", "zip(a, b, ...)", "for ime, tocke in zip(imena, rezultati):\n    print(ime, tocke)", "Ko imaš vzporedne sezname in želiš hoditi po njih hkrati.", "Ustavi se pri najkrajšem iterable objektu.")
    ]
  },
  {
    title: "Python — matematične funkcije (math)",
    description: "Za računanje z enim številom. Najprej napiši import math. Za cele NumPy tabele uporabi ustrezno np. funkcijo.",
    entries: [
      f("math.sqrt", "število · math", "Izračuna kvadratni koren enega števila.", "import math\nmath.sqrt(x)", "math.sqrt(25)  # 5.0", "Ko računaš koren skalarne vrednosti.", "Za NumPy tabelo uporabi np.sqrt(tab)."),
      f("math.sin", "število · math", "Izračuna sinus kota v radianih.", "import math\nmath.sin(kot)", "math.sin(math.pi / 2)  # 1.0", "Ko računaš sinus enega kota.", "Kot mora biti v radianih. Za NumPy tabelo uporabi np.sin(...)."),
      f("math.cos", "število · math", "Izračuna kosinus kota v radianih.", "import math\nmath.cos(kot)", "math.cos(0)  # 1.0", "Ko računaš kosinus enega kota.", "Za NumPy tabelo uporabi np.cos(...)."),
      f("math.asin", "število · math", "Inverzni sinus: iz vrednosti sinusa vrne kot v radianih.", "import math\nmath.asin(x)", "math.asin(0.5)  # približno 0.524", "Ko iz sinusa iščeš en sam kot.", "V modulu math je ime asin, v NumPy pa se pogosto piše np.arcsin(...)."),
      f("math.radians", "število · math", "Pretvori stopinje v radiane.", "math.radians(stopinje)", "math.radians(180)  # približno 3.14159", "Pred sin/cos, če je kot podan v stopinjah."),
      f("math.degrees", "število · math", "Pretvori radiane v stopinje.", "math.degrees(radiani)", "math.degrees(math.pi / 2)  # 90.0", "Ko želiš kot iz radianov pretvoriti nazaj v stopinje."),
      f("math.pi", "število · math", "Konstanta π.", "math.pi", "kot = math.pi / 4", "Ko potrebuješ π v skalarnem izračunu.", "To ni funkcija, zato nima oklepajev."),
      f("math.exp", "število · math", "Izračuna e na potenco x.", "math.exp(x)", "math.exp(1)  # e", "Za eksponentno funkcijo enega števila.", "Za NumPy tabelo uporabi np.exp(...)."),
      f("math.log", "število · math", "Izračuna naravni logaritem.", "math.log(x)", "math.log(math.exp(1))  # 1.0", "Za naravni logaritem pozitivnega števila.", "Za NumPy tabelo uporabi np.log(...).")
    ]
  },
  {
    title: "Nizi — metode",
    description: "Metode se kličejo na nizu. Nizi so nespremenljivi, zato metode praviloma vrnejo nov niz.",
    entries: [
      f("split", "niz", "Razdeli niz na seznam delov.", "niz.split(ločilo)\nniz.split()", "\"a;b;c\".split(\";\")  # ['a', 'b', 'c']", "Ko razčlenjuješ besedilo, zapise iz datoteke ali besede.", "Brez argumenta razdeli po poljubnih presledkih."),
      f("strip", "niz", "Odstrani presledke ali podane znake z začetka in konca niza.", "niz.strip()\nniz.strip(znaki)", "\"  abc  \".strip()  # 'abc'", "Pri čiščenju vrstic iz datoteke in delov po split(...).", "Ne odstranjuje znakov iz sredine niza."),
      f("join", "niz · seznam nizov", "Združi več nizov z izbranim ločilom.", "ločilo.join(seznam_nizov)", "\"-\".join([\"a\", \"b\", \"c\"])  # 'a-b-c'", "Ko iz seznama nizov sestavljaš en niz.", "Metodo kličeš na ločilu; vsi elementi morajo biti nizi."),
      f("replace", "niz", "Vrne nov niz z zamenjanimi pojavitvami.", "niz.replace(staro, novo)", "\"miza\".replace(\"a\", \"e\")  # 'mize'", "Ko sistematično zamenjuješ dele besedila."),
      f("lower", "niz", "Vrne niz z malimi črkami.", "niz.lower()", "\"Python\".lower()  # 'python'", "Za primerjave besedila brez razlikovanja velikih in malih črk."),
      f("upper", "niz", "Vrne niz z velikimi črkami.", "niz.upper()", "\"Python\".upper()  # 'PYTHON'", "Ko želiš poenotiti ali oblikovati besedilo."),
      f("count", "niz · seznam", "Prešteje, kolikokrat se element ali podniz pojavi.", "niz.count(x)\nseznam.count(x)", "\"banana\".count(\"a\")  # 3", "Ko želiš število pojavitev brez ročnega števca."),
      f("find", "niz", "Vrne indeks prve pojavitve podniza; če ga ni, vrne -1.", "niz.find(podniz)", "\"program\".find(\"gram\")  # 3", "Ko iščeš položaj podniza in odsotnost ne sme povzročiti napake.", "Za strožjo različico uporabi index(...)."),
      f("index", "niz · seznam", "Vrne indeks prve pojavitve; če elementa ni, sproži ValueError.", "niz.index(x)\nseznam.index(x)", "[4, 7, 9].index(7)  # 1", "Ko veš, da element obstaja in potrebuješ njegov položaj."),
      f("format", "niz", "Vstavi vrednosti v označena mesta v nizu.", "\"{0}, {1}\".format(a, b)", "\"{0},{1}\".format(\"Miha\", 8)  # 'Miha,8'", "Ko sestavljaš oblikovan niz, npr. za zapis v datoteko.", "V novejši kodi so pogosto preglednejši f-nizi: f\"{a},{b}\".")
    ]
  },
  {
    title: "Seznami — metode",
    description: "Večina teh metod spremeni obstoječ seznam in ne vrne novega seznama.",
    entries: [
      f("append", "seznam", "Doda en element na konec seznama.", "seznam.append(x)", "a = [1, 2]\na.append(3)\n# [1, 2, 3]", "Ko rezultat gradiš element za elementom.", "append spremeni seznam in vrne None."),
      f("extend", "seznam", "Na konec doda vse elemente drugega iterable objekta.", "seznam.extend(iterable)", "a = [1, 2]\na.extend([3, 4])\n# [1, 2, 3, 4]", "Ko želiš dodati več elementov posebej.", "append([3, 4]) bi dodal notranji seznam kot en element."),
      f("insert", "seznam", "Vstavi element na določen indeks.", "seznam.insert(i, x)", "a = [1, 3]\na.insert(1, 2)\n# [1, 2, 3]", "Ko mora biti nov element na točno določenem mestu."),
      f("remove", "seznam", "Odstrani prvo pojavitev dane vrednosti.", "seznam.remove(x)", "a = [1, 2, 2]\na.remove(2)\n# [1, 2]", "Ko poznaš vrednost, ki jo želiš odstraniti.", "Če vrednosti ni, sproži ValueError."),
      f("pop", "seznam · slovar", "Odstrani in vrne element. Pri seznamu po indeksu, pri slovarju po ključu.", "seznam.pop(i=-1)\nslovar.pop(ključ)", "a = [10, 20, 30]\nx = a.pop()  # x = 30", "Ko želiš element hkrati odstraniti in uporabiti njegovo vrednost."),
      f("sort", "seznam", "Uredi obstoječ seznam na mestu.", "seznam.sort(key=None, reverse=False)", "a = [3, 1, 2]\na.sort()\n# [1, 2, 3]", "Ko želiš spremeniti obstoječ seznam v urejeno obliko.", "Vrne None. Za novo urejeno kopijo uporabi sorted(...)."),
      f("reverse", "seznam", "Obrne vrstni red elementov v obstoječem seznamu.", "seznam.reverse()", "a = [1, 2, 3]\na.reverse()\n# [3, 2, 1]", "Ko želiš obrniti seznam brez ustvarjanja novega."),
      f("copy", "seznam · slovar", "Vrne plitvo kopijo objekta.", "seznam.copy()\nslovar.copy()", "b = a.copy()", "Ko želiš spreminjati kopijo, ne originala.", "b = a ne naredi kopije; obe imeni kažeta na isti objekt."),
      f("count", "seznam · niz", "Prešteje pojavitve elementa.", "seznam.count(x)", "[1, 2, 1].count(1)  # 2", "Ko želiš hitro prešteti določeno vrednost."),
      f("index", "seznam · niz", "Vrne indeks prve pojavitve elementa.", "seznam.index(x)", "[5, 8, 9].index(8)  # 1", "Ko poznaš vrednost in potrebuješ njen indeks.")
    ]
  },
  {
    title: "Slovarji in množice",
    description: "Metode za delo s pari ključ–vrednost ter unikatnimi elementi.",
    entries: [
      f("get", "slovar", "Vrne vrednost za ključ; če ključa ni, lahko vrne privzeto vrednost.", "slovar.get(ključ, privzeto)", "stevci[x] = stevci.get(x, 0) + 1", "Za varno branje ključa in posebej za števce oziroma akumulacijo.", "Za razliko od slovar[ključ] odsoten ključ ne povzroči KeyError."),
      f("items", "slovar", "Vrne pare (ključ, vrednost) za iteriranje.", "slovar.items()", "for kljuc, vrednost in slovar.items():\n    print(kljuc, vrednost)", "Ko v zanki potrebuješ hkrati ključ in njegovo vrednost."),
      f("keys", "slovar", "Vrne pogled na ključe slovarja.", "slovar.keys()", "for kljuc in slovar.keys():\n    print(kljuc)", "Ko te zanimajo samo ključi.", "V for zanki lahko običajno napišeš tudi for kljuc in slovar."),
      f("values", "slovar", "Vrne pogled na vrednosti slovarja.", "slovar.values()", "sum(slovar.values())", "Ko te zanimajo samo vrednosti."),
      f("update", "slovar", "Doda pare drugega slovarja in prepiše vrednosti enakih ključev.", "slovar.update(drugi)", "a = {\"x\": 1}\na.update({\"y\": 2})", "Ko združuješ ali posodabljaš slovarje."),
      f("pop", "slovar · seznam", "Pri slovarju odstrani ključ in vrne njegovo vrednost.", "slovar.pop(ključ)", "vrednost = podatki.pop(\"masa\")", "Ko želiš podatek iz slovarja hkrati vzeti in odstraniti."),
      f("add", "množica", "Doda en element v množico.", "mnozica.add(x)", "s = set()\ns.add(3)", "Ko gradiš množico unikatnih elementov."),
      f("copy", "slovar · seznam", "Naredi plitvo kopijo.", "slovar.copy()", "nov = slovar.copy()", "Ko želiš spremeniti kopijo brez spreminjanja originala.")
    ]
  },
  {
    title: "Datoteke — metode",
    description: "Metode objekta datoteke, navadno znotraj with open(...).",
    entries: [
      f("read", "datoteka", "Prebere vsebino datoteke in jo vrne kot niz.", "dat.read()", "with open(\"a.txt\", \"r\", encoding=\"utf-8\") as dat:\n    besedilo = dat.read()", "Ko potrebuješ celotno datoteko naenkrat."),
      f("write", "datoteka", "Zapiše niz v datoteko.", "dat.write(niz)", "with open(\"a.txt\", \"w\", encoding=\"utf-8\") as dat:\n    dat.write(\"Pozdrav\\n\")", "Ko zapisuješ besedilo v datoteko.", "write sam ne doda znaka za novo vrstico \\n.")
    ]
  },
  {
    title: "NumPy — ustvarjanje, oblika in tipi",
    description: "Ustvarjanje tabel, njihove dimenzije, preoblikovanje in podatkovni tipi.",
    entries: [
      f("np.array", "NumPy", "Iz Python zaporedja ustvari NumPy tabelo.", "np.array(podatki)", "a = np.array([1, 2, 3])", "Ko želiš uporabljati vektorizirane NumPy operacije."),
      f("np.zeros", "NumPy", "Ustvari tabelo ničel dane oblike.", "np.zeros(shape, dtype=float)", "np.zeros((3, 4))\nnp.zeros((2, 2), dtype=int)", "Za začetno prazno numerično tabelo ali rezervacijo prostora."),
      f("np.ones", "NumPy", "Ustvari tabelo enic dane oblike.", "np.ones(shape, dtype=float)", "np.ones((2, 3))", "Ko potrebuješ začetno tabelo enic."),
      f("np.arange", "NumPy", "Ustvari enakomerno zaporedje z določenim korakom; konec ni vključen.", "np.arange(start, stop, step)", "np.arange(0, 10, 2)  # [0 2 4 6 8]", "Ko poznaš korak med vrednostmi.", "Če poznaš število želenih točk, je pogosto boljši np.linspace(...)."),
      f("np.linspace", "NumPy", "Ustvari določeno število enakomerno razporejenih vrednosti med robovoma.", "np.linspace(start, stop, num)", "np.linspace(0, 1, 5)", "Ko poznaš število želenih točk, ne koraka.", "Privzeto sta oba robova vključena."),
      f("np.shape", "NumPy", "Vrne obliko tabele kot tuple dimenzij.", "np.shape(tab)", "np.shape(tab)  # npr. (3, 4)", "Ko potrebuješ število elementov po posameznih oseh."),
      f("tab.shape", "NumPy", "Atribut, ki vsebuje obliko NumPy tabele.", "tab.shape", "n, m = tab.shape", "Najpogostejši način za razpakiranje števila vrstic in stolpcev."),
      f("np.size", "NumPy", "Vrne skupno število elementov ali velikost izbrane osi.", "np.size(tab)\nnp.size(tab, axis=0)", "np.size(np.zeros((2, 3)))  # 6", "Ko potrebuješ skupno število elementov ali velikost osi."),
      f("np.reshape", "NumPy", "Vrne tabelo z novo obliko, če ostane enako število elementov.", "np.reshape(tab, newshape)\ntab.reshape(newshape)", "np.arange(6).reshape((2, 3))", "Ko želiš iste elemente preurediti v drugo obliko."),
      f("tab.T", "NumPy", "Transponira tabelo: vrstice in stolpci zamenjajo vloge.", "tab.T", "a = np.array([[1, 2], [3, 4]])\na.T", "Ko želiš transponirano matriko ali moraš zamenjati osi pri 2D tabeli."),
      f("np.newaxis", "NumPy", "Pri indeksiranju doda novo os dolžine 1.", "tab[np.newaxis, :]\ntab[:, np.newaxis]", "a = np.array([1, 2, 3])\na[:, np.newaxis]  # oblika (3, 1)", "Ko 1D tabelo spreminjaš v vrstico ali stolpec za broadcasting ali združevanje."),
      f("np.atleast_2d", "NumPy", "Poskrbi, da ima vhod vsaj dve dimenziji.", "np.atleast_2d(tab)", "np.atleast_2d([1, 2, 3])  # oblika (1, 3)", "Ko funkcija zahteva 2D tabelo, vhod pa je lahko 1D."),
      f("astype", "NumPy", "Pretvori podatkovni tip elementov in vrne novo tabelo.", "tab.astype(tip)", "graf = (tab > 0).astype(int)\nx = tab.astype(float)", "Ko želiš npr. bool pretvoriti v 0/1 ali integer v float.", "Originalne tabele ne spremeni; rezultat shrani ali vrni."),
      f("np.fromfunction", "NumPy", "Ustvari tabelo tako, da funkcijo izračuna na indeksih.", "np.fromfunction(function, shape)", "np.fromfunction(lambda i, j: i + j, (3, 4))", "Ko je vrednost elementa določena s formulo glede na njegov indeks."),
      f("np.meshgrid", "NumPy", "Iz koordinatnih 1D tabel naredi koordinatne mreže.", "np.meshgrid(x, y, indexing=\"ij\")", "i, j = np.meshgrid(np.arange(n), np.arange(m), indexing=\"ij\")", "Ko potrebuješ vse kombinacije koordinat ali indeksov.")
    ]
  },
  {
    title: "NumPy — združevanje in preurejanje",
    description: "Spajanje tabel ter spreminjanje njihovega vrstnega reda.",
    entries: [
      f("np.append", "NumPy", "Vrne novo tabelo z dodanimi vrednostmi.", "np.append(arr, values, axis=None)", "nova = np.append(a, b)", "Za preprosto dodajanje vrednosti, predvsem pri 1D tabelah.", "Brez axis tabeli splošči; originala ne spremeni."),
      f("np.concatenate", "NumPy", "Združi zaporedje tabel vzdolž izbrane osi.", "np.concatenate([a, b], axis=0)", "np.concatenate([a, b])", "Ko združuješ tabele enakih dimenzij po določeni osi."),
      f("np.vstack", "NumPy", "Zloži tabele navpično; 1D tabele postanejo vrstice.", "np.vstack([a, b])", "np.vstack([np.array([1, 2]), np.array([3, 4])])", "Ko želiš iz več vrstic sestaviti 2D tabelo."),
      f("np.hstack", "NumPy", "Zloži tabele vodoravno.", "np.hstack([a, b])", "np.hstack([np.array([1, 2]), np.array([3, 4])])", "Ko želiš podatke dodati v smeri stolpcev oziroma vodoravno."),
      f("np.flip", "NumPy", "Obrne vrstni red elementov po vseh ali izbrani osi.", "np.flip(tab, axis=None)", "np.flip(tab, axis=0)", "Ko želiš obrniti vrstice, stolpce ali celotno zaporedje."),
      f("np.roll", "NumPy", "Ciklično premakne elemente; elementi z roba se pojavijo na drugem robu.", "np.roll(tab, shift, axis=None)", "np.roll(np.array([1, 2, 3]), 1)  # [3 1 2]", "Pri periodičnih premikih ali primerjanju s sosednjimi elementi."),
      f("np.pad", "NumPy", "Doda rob okoli tabele po izbranem načinu.", "np.pad(tab, pad_width, mode=\"constant\")", "np.pad(np.array([1, 2, 3]), 1)  # [0 1 2 3 0]", "Ko potrebuješ dodatne robne elemente, pogosto ničle."),
      f("np.sort", "NumPy", "Vrne urejeno kopijo tabele vzdolž izbrane osi.", "np.sort(tab, axis=-1)", "np.sort(np.array([3, 1, 2]))  # [1 2 3]", "Ko želiš urejene NumPy podatke brez spreminjanja originala.")
    ]
  },
  {
    title: "NumPy — pogoji, indeksi in izbira",
    description: "Vektorizirani pogoji: brez ročnih zank preveri ali izberi več elementov naenkrat.",
    entries: [
      f("np.where", "NumPy", "Za vsak element izbere eno vrednost, če pogoj velja, in drugo, če ne.", "np.where(pogoj, če_velja, če_ne_velja)", "pozitivni = np.where(tab > 0, tab, 0)", "Ko želiš elemente pogojno zamenjati ali izdelati novo tabelo glede na masko."),
      f("np.all", "NumPy", "Vrne True, če so vsi elementi pogoja True; lahko računa tudi po osi.", "np.all(pogoj, axis=None)", "np.all(tab > 0)", "Ko mora NumPy pogoj veljati za vse elemente."),
      f("np.any", "NumPy", "Vrne True, če je vsaj en element pogoja True; lahko računa tudi po osi.", "np.any(pogoj, axis=None)", "np.any(tab == 0)", "Ko preverjaš, ali obstaja vsaj en element z določeno lastnostjo."),
      f("np.less_equal", "NumPy", "Element po elementu preveri manjše ali enako.", "np.less_equal(a, b)", "maska = np.less_equal(a, b)", "Ko želiš eksplicitno funkcijsko obliko primerjave a <= b.", "V večini nalog je krajši in preglednejši zapis a <= b."),
      f("np.nonzero", "NumPy", "Vrne tuple tabel indeksov elementov, kjer je vrednost neničelna oziroma kjer pogoj velja.", "np.nonzero(pogoj)", "vrstice, stolpci = np.nonzero(tab > 0)", "Ko pri večdimenzionalni tabeli potrebuješ indekse po posameznih oseh."),
      f("np.flatnonzero", "NumPy", "Vrne 1D indekse neničelnih elementov sploščene tabele.", "np.flatnonzero(pogoj)", "idx = np.flatnonzero(a > b)", "Ko želiš enostaven seznam indeksov pri 1D podatkih ali sploščenem pogledu."),
      f("np.argmax", "NumPy", "Vrne indeks največje vrednosti.", "np.argmax(tab, axis=None)", "i = np.argmax(vrednosti)", "Ko poleg maksimuma potrebuješ njegov položaj."),
      f("np.argmin", "NumPy", "Vrne indeks najmanjše vrednosti.", "np.argmin(tab, axis=None)", "i = np.argmin(vrednosti)", "Ko poleg minimuma potrebuješ njegov položaj.")
    ]
  },
  {
    title: "NumPy — agregacije, osi in statistika",
    description: "Funkcije, ki več vrednosti združijo v eno ali v rezultat po izbrani osi.",
    entries: [
      f("np.sum", "NumPy", "Sešteje elemente celotne tabele ali po osi.", "np.sum(tab, axis=None)", "vsote_vrstic = np.sum(tab, axis=1)", "Za vektorizirano seštevanje tabele, vrstic ali stolpcev.", "axis=0 združuje po vrsticah in vrne rezultat za vsak stolpec; axis=1 združuje po stolpcih in vrne rezultat za vsako vrstico."),
      f("np.min", "NumPy", "Vrne najmanjšo vrednost celotne tabele ali po osi.", "np.min(tab, axis=None)", "minimumi = np.min(tab, axis=1)", "Ko potrebuješ minimume po vrsticah, stolpcih ali globalni minimum."),
      f("np.max", "NumPy", "Vrne največjo vrednost celotne tabele ali po osi.", "np.max(tab, axis=None)", "maksimumi = np.max(tab, axis=0)", "Ko potrebuješ maksimume po osi ali globalni maksimum."),
      f("np.maximum", "NumPy", "Primerja dve tabeli element po elementu in na vsakem mestu vrne večjo vrednost.", "np.maximum(a, b)", "np.maximum(np.array([1, 5]), np.array([3, 2]))  # [3 5]", "Ko primerjaš dve tabeli element po elementu.", "Ni isto kot np.max(...), ki zmanjša število vrednosti."),
      f("np.mean", "NumPy", "Izračuna aritmetično povprečje.", "np.mean(tab, axis=None)", "np.mean(tab, axis=0)", "Ko želiš navadno povprečje celotne tabele ali po osi."),
      f("np.average", "NumPy", "Izračuna povprečje; omogoča tudi uteži.", "np.average(tab, axis=None, weights=None)", "np.average(tab, axis=0)", "Za povprečje, posebej če potrebuješ uteženo povprečje."),
      f("np.std", "NumPy", "Izračuna standardni odklon.", "np.std(tab, axis=None)", "np.std(meritve)", "Ko ocenjuješ razpršenost numeričnih podatkov."),
      f("np.prod", "NumPy", "Zmnoži elemente.", "np.prod(tab, axis=None)", "np.prod(np.array([2, 3, 4]))  # 24", "Ko potrebuješ produkt več elementov."),
      f("np.cumsum", "NumPy", "Vrne kumulativne vsote.", "np.cumsum(tab, axis=None)", "np.cumsum([2, 3, 4])  # [2 5 9]", "Ko želiš tekočo oziroma sprotno vsoto.")
    ]
  },
  {
    title: "NumPy — matematične funkcije",
    description: "Funkcije delujejo element po elementu na celotni NumPy tabeli.",
    entries: [
      f("np.abs", "NumPy · matematika", "Vrne absolutno vrednost vsakega elementa.", "np.abs(tab)", "odstopanja = np.abs(meritve - pricakovano)", "Za absolutne razlike in velikosti vrednosti v tabeli."),
      f("np.sqrt", "NumPy · matematika", "Izračuna kvadratni koren element po elementu.", "np.sqrt(tab)", "np.sqrt(np.array([1, 4, 9]))  # [1. 2. 3.]", "Ko uporabljaš koren na več NumPy vrednostih."),
      f("np.square", "NumPy · matematika", "Kvadrira vsak element.", "np.square(tab)", "np.square(np.array([2, 3]))  # [4 9]", "Ko želiš elementne kvadrate.", "Enakovreden pogost zapis je tab ** 2."),
      f("np.sin", "NumPy · matematika", "Izračuna sinus vsakega elementa; koti morajo biti v radianih.", "np.sin(koti)", "koti = np.radians([0, 30, 90])\nnp.sin(koti)", "Ko računaš sinus za eno ali več NumPy vrednosti.", "Za eno navadno Python število lahko uporabiš math.sin(...)."),
      f("np.cos", "NumPy · matematika", "Izračuna kosinus vsakega elementa; koti morajo biti v radianih.", "np.cos(koti)", "np.cos(np.radians([0, 60, 90]))", "Ko računaš kosinus za NumPy podatke."),
      f("np.arcsin", "NumPy · matematika", "Inverzni sinus: iz vrednosti sinusa izračuna kot v radianih, element po elementu.", "np.arcsin(vrednosti)", "koti = np.arcsin(np.array([0, 0.5, 1]))", "Ko iz vrednosti sinusa iščeš kote za celo tabelo.", "Za eno število v knjižnici math se funkcija imenuje math.asin(...), ne math.arcsin(...)."),
      f("np.exp", "NumPy · matematika", "Izračuna e na potenco vsakega elementa.", "np.exp(tab)", "np.exp(np.array([0, 1]))", "Pri eksponentnih funkcijah nad več vrednostmi."),
      f("np.log", "NumPy · matematika", "Izračuna naravni logaritem element po elementu.", "np.log(tab)", "np.log(np.array([1, np.e]))", "Pri logaritmih pozitivnih NumPy vrednosti."),
      f("np.radians", "NumPy · matematika", "Pretvori stopinje v radiane element po elementu.", "np.radians(stopinje)", "r = np.radians([0, 90, 180])", "Pred np.sin/np.cos, če so koti podani v stopinjah."),
      f("np.degrees", "NumPy · matematika", "Pretvori radiane v stopinje element po elementu.", "np.degrees(radiani)", "np.degrees(np.pi / 2)  # 90.0", "Ko želiš rezultate kotov prikazati v stopinjah."),
      f("np.pi", "NumPy · matematika", "Konstanta π.", "np.pi", "t = np.linspace(0, 2 * np.pi, 100)", "Ko v NumPy izračunih potrebuješ π.", "To ni funkcija, zato nima oklepajev.")
    ]
  },
  {
    title: "NumPy — kompleksna števila in posebne vrednosti",
    description: "Funkcije in zapisi, ki se pojavijo v zvezku pri kompleksnih podatkih in manjkajočih vrednostih.",
    entries: [
      f("np.real", "NumPy · kompleksna", "Vrne realni del vsakega kompleksnega elementa.", "np.real(tab)", "realni = np.real(np.array([1 + 2j, 3 + 0j]))", "Ko iz kompleksne NumPy tabele potrebuješ samo realne komponente."),
      f("np.imag", "NumPy · kompleksna", "Vrne imaginarni del vsakega kompleksnega elementa.", "np.imag(tab)", "imaginarni = np.imag(np.array([1 + 2j, 3 + 0j]))", "Ko želiš preverjati ali uporabljati imaginarne komponente."),
      f("np.nan", "NumPy · posebna vrednost", "Posebna vrednost 'Not a Number', pogosto za manjkajoč ali neveljaven numerični rezultat.", "np.nan", "rezultat = np.array([1.2, np.nan, 3.4])", "Ko moraš v numerični tabeli označiti, da veljavne številčne vrednosti ni.", "To ni funkcija, zato nima oklepajev."),
      f("1j", "Python · NumPy · kompleksna", "Imaginarna enota. Z njo zapisuješ kompleksna števila.", "a + b * 1j\n# ali: a + bj", "z = 2 + 3j\nnp.real(z)  # 2\nnp.imag(z)  # 3", "Ko naloga uporablja kompleksna števila."),
      f("astype", "NumPy · tip podatkov", "Pretvori elemente tabele v drug podatkovni tip.", "tab.astype(int)\ntab.astype(float)", "maska = (tab > 0).astype(int)", "Ko želiš npr. True/False pretvoriti v 1/0 ali spremeniti numerični tip.", "Vrne novo tabelo; original ostane nespremenjen.")
    ]
  }
];

function renderFunctionEntry(entry) {
  const targets = entry.target
    .split("·")
    .map((target) => `<span class="use-tag">${esc(target.trim())}</span>`)
    .join("");

  return `
    <details class="function-entry search-item" data-keywords="${esc(
      `${entry.name} ${entry.target} ${entry.meaning} ${entry.when} ${entry.note}`
    )}">
      <summary>
        <code>${esc(entry.name)}</code>
        <span class="use-tags">${targets}</span>
      </summary>
      <div class="function-body">
        <div class="function-meaning"><strong>Kaj pomeni:</strong> ${esc(entry.meaning)}</div>
        <div class="function-two-col">
          <div>
            <div class="mini-label">Zapis</div>
            <pre><code>${esc(entry.syntax)}</code></pre>
          </div>
          <div>
            <div class="mini-label">Primer</div>
            <pre><code>${esc(entry.example)}</code></pre>
          </div>
        </div>
        <p><strong>Kdaj uporabim:</strong> ${esc(entry.when)}</p>
        ${entry.note ? `<div class="function-note"><strong>Pozor:</strong> ${esc(entry.note)}</div>` : ""}
      </div>
    </details>`;
}

function installFunctionReferenceFixes() {
  const style = document.createElement("style");
  style.textContent = `
    .function-two-col {
      align-items: start;
      margin-bottom: 18px;
    }

    .function-two-col > div {
      min-width: 0;
    }

    .function-two-col pre {
      height: auto !important;
      min-height: 88px;
      margin: 5px 0 0 !important;
    }

    .function-body > p {
      clear: both;
      margin-top: 0 !important;
      padding-top: 2px;
    }

    @media (max-width: 920px) {
      .function-two-col pre {
        min-height: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function buildFunctionReference() {
  const section = document.querySelector("#funkcije");
  if (!section) return;

  const heading = section.querySelector(".section-heading");
  if (heading) {
    const title = heading.querySelector("h2");
    const description = heading.querySelector("p");
    if (title) title.textContent = "Indeks funkcij";
    if (description) {
      description.textContent =
        "Klikni funkcijo za pomen, zapis, primer in informacijo, na katerih podatkih jo uporabljaš.";
    }
  }

  const oldGrid = section.querySelector(".grid");
  if (!oldGrid) return;

  const intro = `
    <div class="function-legend">
      <strong>Kako bereš indeks:</strong>
      oznake ob imenu pokažejo, ali funkcijo uporabljaš na nizu, seznamu, slovarju, datoteki, enem številu ali NumPy tabeli.
      Pri matematiki si zapomni predvsem razliko: <code>math.sin(x)</code> za eno število in <code>np.sin(tab)</code> za NumPy tabelo; inverzni sinus je <code>math.asin(x)</code> oziroma <code>np.arcsin(tab)</code>.
    </div>`;

  const groups = functionGroups
    .map(
      (group) => `
        <article class="card wide function-group">
          <div class="function-group-heading">
            <h3>${esc(group.title)}</h3>
            <p>${esc(group.description)}</p>
          </div>
          <div class="function-list">
            ${group.entries.map(renderFunctionEntry).join("")}
          </div>
        </article>`
    )
    .join("");

  oldGrid.outerHTML = `${intro}<div class="grid function-reference">${groups}</div>`;
}

function cleanGeneralPageLabels() {
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
}

cleanGeneralPageLabels();
installFunctionReferenceFixes();
buildFunctionReference();

const searchInput = document.querySelector("#search");
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
  const searchableItems = [...document.querySelectorAll(".search-item")];
  let visible = 0;

  searchableItems.forEach((item) => {
    const haystack = normalize(`${item.dataset.keywords || ""} ${item.textContent}`);
    const matches = !query || haystack.includes(query);
    item.classList.toggle("hidden-by-search", !matches);
    if (matches) visible += 1;
  });

  document.querySelectorAll(".function-group").forEach((group) => {
    const hasVisibleEntry = group.querySelector(
      ".function-entry:not(.hidden-by-search)"
    );
    group.classList.toggle(
      "hidden-by-search",
      Boolean(query) && !hasVisibleEntry
    );
  });

  sections.forEach((section) => {
    const hasVisibleCard = section.querySelector(
      ".search-item:not(.hidden-by-search)"
    );
    section.classList.toggle(
      "hidden-by-search",
      Boolean(query) && !hasVisibleCard
    );
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
