function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function f(name, target, syntax, meaning, returns, example, result, when, note = "") {
  return { name, target, syntax, meaning, returns, example, result, when, note };
}

const functionGroups = [
  {
    id: "slovar-python",
    nav: "Python",
    title: "Python — splošne funkcije",
    description: "Vgrajene funkcije, ki jih uporabljaš pri različnih tipih podatkov.",
    entries: [
      f("abs", "število", "abs(število)", "Absolutna vrednost brez predznaka.", "Število.", "abs(-7)", "7", "Ko potrebuješ velikost vrednosti brez predznaka.", "Za NumPy tabelo uporabi np.abs(...)."),
      f("all", "iterable · pogoji", "all(pogoji)", "Preveri, ali so vsi elementi oziroma pogoji resnični.", "True ali False.", "all(x > 0 for x in [2, 5, 1])", "True", "Ko mora pogoj veljati za vse elemente.", "Za NumPy tabelo uporabi np.all(...)."),
      f("any", "iterable · pogoji", "any(pogoji)", "Preveri, ali je vsaj en element oziroma pogoj resničen.", "True ali False.", "any(x < 0 for x in [2, -5, 1])", "True", "Ko zadostuje, da pogoj velja za vsaj en element.", "Za NumPy tabelo uporabi np.any(...)."),
      f("enumerate", "niz · seznam · iterable", "enumerate(zaporedje, začetni_indeks=0)", "Med iteriranjem poveže indeks in element.", "Pare (indeks, element), po katerih lahko iteriraš.", "for i, x in enumerate([10, 20]):\n    print(i, x)", "0 10\n1 20", "Ko v zanki potrebuješ indeks in element hkrati."),
      f("int", "niz · število", "int(vrednost)", "Pretvori vrednost v celo število.", "Celo število int.", "int(\"42\")", "42", "Ko bereš cela števila iz nizov ali pretvarjaš numerični tip."),
      f("len", "niz · seznam · slovar · tuple · NumPy", "len(objekt)", "Prešteje elemente prve ravni objekta.", "Celo število.", "len([4, 7, 9])", "3", "Ko potrebuješ dolžino zaporedja ali število ključev slovarja.", "Pri 2D NumPy tabeli len(tab) vrne število vrstic, ne vseh elementov."),
      f("list", "iterable", "list(zaporedje)", "Iz drugega iterable objekta ustvari seznam.", "Nov seznam.", "list(\"abc\")", "['a', 'b', 'c']", "Ko želiš podatke pretvoriti v seznam."),
      f("max", "iterable", "max(zaporedje)", "Poišče največji element.", "Največji element.", "max([4, 9, 2])", "9", "Ko potrebuješ največjo vrednost običajnega Python zaporedja.", "Za NumPy tabelo uporabi np.max(...)."),
      f("min", "iterable", "min(zaporedje)", "Poišče najmanjši element.", "Najmanjši element.", "min([4, 9, 2])", "2", "Ko potrebuješ najmanjšo vrednost običajnega Python zaporedja.", "Za NumPy tabelo uporabi np.min(...)."),
      f("open", "datoteka", "open(pot, način, encoding=\"utf-8\")", "Odpre datoteko za branje, pisanje ali dodajanje.", "Objekt datoteke.", "with open(\"podatki.txt\", \"r\", encoding=\"utf-8\") as dat:\n    vsebina = dat.read()", "vsebina vsebuje besedilo datoteke", "Ko bereš ali zapisuješ datoteke.", "Najvarneje je uporabljati with open(...), ker se datoteka samodejno zapre."),
      f("print", "karkoli", "print(vrednost1, vrednost2, ...)", "Izpiše vrednosti.", "None; rezultat samo izpiše.", "print(\"rezultat:\", 5)", "rezultat: 5", "Za prikaz rezultata ali preverjanje kode.", "print ni isto kot return."),
      f("range", "zanka", "range(konec)\nrange(začetek, konec)\nrange(začetek, konec, korak)", "Ustvari zaporedje celih števil za iteriranje.", "Objekt range, po katerem lahko iteriraš.", "list(range(0, 6, 2))", "[0, 2, 4]", "Najpogosteje v for zanki, kadar potrebuješ indekse ali določeno zaporedje števil.", "Konec ni vključen."),
      f("round", "število", "round(število, št_decimalnih_mest)", "Zaokroži število.", "Zaokroženo število.", "round(3.14159, 2)", "3.14", "Ko želiš zaokrožen končni rezultat."),
      f("set", "iterable", "set(zaporedje)", "Ustvari množico unikatnih elementov.", "Novo množico set.", "set([1, 1, 2, 3])", "{1, 2, 3}", "Ko želiš odstraniti ponovitve ali hitro preverjati pripadnost."),
      f("slice", "niz · seznam · NumPy", "slice(začetek, konec, korak)", "Ustvari objekt rezine.", "Objekt slice.", "rezina = slice(0, 6, 2)\n[0, 1, 2, 3, 4, 5][rezina]", "[0, 2, 4]", "Ko moraš rezino sestaviti programsko.", "Običajno je krajši zapis podatki[začetek:konec:korak]."),
      f("sorted", "niz · seznam · iterable", "sorted(zaporedje, reverse=False)", "Uredi elemente, ne da bi spremenil original.", "Nov urejen seznam.", "sorted([3, 1, 2], reverse=True)", "[3, 2, 1]", "Ko želiš urejeno kopijo podatkov.", "seznam.sort() spremeni original in vrne None."),
      f("str", "karkoli", "str(vrednost)", "Pretvori vrednost v niz.", "Niz str.", "str(42)", "'42'", "Ko sestavljaš besedilo ali zapisuješ vrednosti v datoteko."),
      f("sum", "iterable", "sum(zaporedje)", "Sešteje elemente.", "Vsoto elementov.", "sum([2, 4, 6])", "12", "Ko seštevaš običajno Python zaporedje števil.", "Za NumPy tabelo uporabi np.sum(...)."),
      f("tuple", "iterable", "tuple(zaporedje)", "Ustvari nabor oziroma tuple.", "Nov tuple.", "tuple([1, 2])", "(1, 2)", "Za pare, več vrnjenih vrednosti ali nespremenljivo zaporedje."),
      f("type", "karkoli", "type(objekt)", "Pove tip objekta.", "Objekt tipa type.", "type([1, 2])", "<class 'list'>", "Ko preverjaš, kakšen tip vrednosti imaš."),
      f("zip", "iterable", "zip(zaporedje1, zaporedje2, ...)", "Poveže elemente več zaporedij po istem položaju.", "Pare oziroma tuple, po katerih lahko iteriraš.", "list(zip([1, 2], [\"a\", \"b\"]))", "[(1, 'a'), (2, 'b')]", "Ko imaš vzporedne sezname in želiš hoditi po njih hkrati.", "Ustavi se pri najkrajšem zaporedju.")
    ]
  },
  {
    id: "slovar-math",
    nav: "Python math",
    title: "Python — matematične funkcije (math)",
    description: "Za eno navadno število. Pred uporabo napiši import math.",
    entries: [
      f("math.sqrt", "število · math", "math.sqrt(število)", "Izračuna kvadratni koren.", "Eno število float.", "math.sqrt(25)", "5.0", "Ko računaš koren ene skalarne vrednosti.", "Za NumPy tabelo uporabi np.sqrt(...)."),
      f("math.sin", "število · math", "math.sin(kot_v_radianih)", "Izračuna sinus enega kota.", "Eno število med -1 in 1.", "math.sin(math.pi / 2)", "1.0", "Ko računaš sinus enega kota.", "Kot mora biti v radianih; za NumPy tabelo uporabi np.sin(...)."),
      f("math.cos", "število · math", "math.cos(kot_v_radianih)", "Izračuna kosinus enega kota.", "Eno število med -1 in 1.", "math.cos(0)", "1.0", "Ko računaš kosinus enega kota.", "Za NumPy tabelo uporabi np.cos(...)."),
      f("math.asin", "število · math", "math.asin(vrednost_sinusa)", "Inverzni sinus: iz vrednosti sinusa izračuna kot.", "Kot v radianih.", "math.asin(0.5)", "približno 0.524", "Ko iz sinusa iščeš en sam kot.", "V NumPy se funkcija imenuje np.arcsin(...)."),
      f("math.radians", "število · math", "math.radians(stopinje)", "Pretvori stopinje v radiane.", "Kot v radianih.", "math.radians(180)", "približno 3.14159", "Pred math.sin/math.cos, če je kot podan v stopinjah."),
      f("math.degrees", "število · math", "math.degrees(radiani)", "Pretvori radiane v stopinje.", "Kot v stopinjah.", "math.degrees(math.pi / 2)", "90.0", "Ko želiš rezultat kota v stopinjah."),
      f("math.pi", "konstanta · math", "math.pi", "Konstanta π.", "Število približno 3.14159.", "2 * math.pi", "približno 6.28318", "Ko potrebuješ π.", "To ni funkcija, zato nima oklepajev."),
      f("math.exp", "število · math", "math.exp(eksponent)", "Izračuna e na dano potenco.", "Eno število float.", "math.exp(0)", "1.0", "Pri eksponentnih funkcijah za eno vrednost."),
      f("math.log", "število · math", "math.log(pozitivno_število)", "Izračuna naravni logaritem.", "Eno število float.", "math.log(math.e)", "1.0", "Pri naravnem logaritmu ene pozitivne vrednosti.")
    ]
  },
  {
    id: "slovar-nizi",
    nav: "Nizi",
    title: "Nizi — metode",
    description: "Metode se kličejo na nizu. Nizi so nespremenljivi, zato praviloma vrnejo nov niz ali drugo vrednost.",
    entries: [
      f("split", "niz", "niz.split(ločilo)", "Razdeli niz na dele.", "Seznam nizov.", "\"a;b;c\".split(\";\")", "['a', 'b', 'c']", "Ko razčlenjuješ besedilo ali vrstico iz datoteke."),
      f("strip", "niz", "niz.strip()", "Odstrani presledke z začetka in konca.", "Nov očiščen niz.", "\"  abc  \".strip()", "'abc'", "Pri čiščenju vhodnega besedila.", "Ne odstranjuje presledkov iz sredine niza."),
      f("join", "niz · seznam nizov", "ločilo.join(seznam_nizov)", "Združi več nizov z izbranim ločilom.", "En nov niz.", "\"-\".join([\"a\", \"b\", \"c\"])", "'a-b-c'", "Ko iz seznama nizov sestavljaš en niz."),
      f("replace", "niz", "niz.replace(staro, novo)", "Zamenja pojavitve podniza.", "Nov niz.", "\"miza\".replace(\"a\", \"e\")", "'mize'", "Ko sistematično zamenjuješ dele besedila."),
      f("lower", "niz", "niz.lower()", "Pretvori črke v male.", "Nov niz.", "\"PyThOn\".lower()", "'python'", "Za primerjave brez razlikovanja velikih in malih črk."),
      f("upper", "niz", "niz.upper()", "Pretvori črke v velike.", "Nov niz.", "\"Python\".upper()", "'PYTHON'", "Ko želiš poenotiti ali oblikovati besedilo."),
      f("count", "niz · seznam", "niz.count(podniz)\nseznam.count(element)", "Prešteje pojavitve.", "Celo število.", "\"banana\".count(\"a\")", "3", "Ko želiš število pojavitev brez ročnega števca."),
      f("find", "niz", "niz.find(podniz)", "Poišče prvo pojavitev podniza.", "Indeks ali -1, če podniza ni.", "\"program\".find(\"gram\")", "3", "Ko želiš položaj podniza, odsotnost pa ne sme povzročiti napake."),
      f("index", "niz · seznam", "niz.index(element)\nseznam.index(element)", "Poišče prvo pojavitev elementa.", "Indeks.", "[4, 7, 9].index(7)", "1", "Ko veš, da element obstaja in potrebuješ njegov položaj.", "Če elementa ni, sproži ValueError."),
      f("format", "niz", "\"...{}...\".format(vrednost)", "Vstavi vrednosti v označena mesta niza.", "Nov oblikovan niz.", "\"x = {}\".format(5)", "'x = 5'", "Ko sestavljaš oblikovano besedilo.", "Danes so pogosto preglednejši f-nizi: f\"x = {x}\".")
    ]
  },
  {
    id: "slovar-seznami",
    nav: "Seznami",
    title: "Seznami — metode",
    description: "Pomembno: večina metod seznama spremeni originalni seznam in vrne None.",
    entries: [
      f("append", "seznam", "seznam.append(element)", "Doda en element na konec seznama.", "None; spremeni originalni seznam.", "a = [1, 2]\na.append(3)", "a je [1, 2, 3]", "Ko rezultat gradiš element za elementom."),
      f("extend", "seznam", "seznam.extend(zaporedje)", "Na konec doda vse elemente drugega zaporedja.", "None; spremeni originalni seznam.", "a = [1, 2]\na.extend([3, 4])", "a je [1, 2, 3, 4]", "Ko želiš dodati več elementov posebej.", "append([3, 4]) bi dodal notranji seznam kot en element."),
      f("insert", "seznam", "seznam.insert(indeks, element)", "Vstavi element na izbrani indeks.", "None; spremeni originalni seznam.", "a = [1, 3]\na.insert(1, 2)", "a je [1, 2, 3]", "Ko mora biti element na točno določenem mestu."),
      f("remove", "seznam", "seznam.remove(vrednost)", "Odstrani prvo pojavitev vrednosti.", "None; spremeni originalni seznam.", "a = [1, 2, 2]\na.remove(2)", "a je [1, 2]", "Ko poznaš vrednost, ki jo želiš odstraniti.", "Če vrednosti ni, sproži ValueError."),
      f("pop", "seznam", "seznam.pop(indeks=-1)", "Odstrani element in ga hkrati vrne.", "Odstranjeni element; seznam se spremeni.", "a = [10, 20, 30]\nx = a.pop()", "x je 30, a je [10, 20]", "Ko želiš element odstraniti in njegovo vrednost še uporabiti."),
      f("sort", "seznam", "seznam.sort(reverse=False)", "Uredi obstoječ seznam.", "None; spremeni originalni seznam.", "a = [3, 1, 2]\na.sort()", "a je [1, 2, 3]", "Ko želiš urediti prav obstoječi seznam.", "Za nov urejen seznam uporabi sorted(seznam)."),
      f("reverse", "seznam", "seznam.reverse()", "Obrne vrstni red elementov.", "None; spremeni originalni seznam.", "a = [1, 2, 3]\na.reverse()", "a je [3, 2, 1]", "Ko želiš obrniti obstoječi seznam."),
      f("copy", "seznam · slovar", "seznam.copy()\nslovar.copy()", "Naredi plitvo kopijo.", "Nov objekt z isto vsebino.", "a = [1, 2]\nb = a.copy()\nb.append(3)", "a je [1, 2], b je [1, 2, 3]", "Ko želiš spreminjati kopijo, ne originala.", "b = a ne naredi kopije."),
      f("count", "seznam · niz", "seznam.count(element)", "Prešteje pojavitve elementa.", "Celo število.", "[1, 2, 1].count(1)", "2", "Ko želiš hitro prešteti določeno vrednost."),
      f("index", "seznam · niz", "seznam.index(element)", "Poišče prvo pojavitev elementa.", "Indeks.", "[5, 8, 9].index(8)", "1", "Ko poznaš vrednost in potrebuješ njen indeks.")
    ]
  },
  {
    id: "slovar-slovarji",
    nav: "Slovarji",
    title: "Slovarji in množice",
    description: "Delo s pari ključ–vrednost in z unikatnimi elementi.",
    entries: [
      f("get", "slovar", "slovar.get(ključ, privzeta_vrednost)", "Varno prebere vrednost pri ključu.", "Vrednost pri ključu ali privzeto vrednost.", "stevci = {}\nstevci[\"a\"] = stevci.get(\"a\", 0) + 1", "stevci je {'a': 1}", "Za varno branje ključa in zelo pogosto pri števcih oziroma akumulaciji.", "slovar[ključ] pri manjkajočem ključu sproži KeyError."),
      f("items", "slovar", "slovar.items()", "Pripravi pare ključ–vrednost za iteriranje.", "Pogled na pare (ključ, vrednost).", "for kljuc, vrednost in {\"a\": 1}.items():\n    print(kljuc, vrednost)", "a 1", "Ko v zanki potrebuješ ključ in vrednost hkrati."),
      f("keys", "slovar", "slovar.keys()", "Pripravi ključe slovarja.", "Pogled na ključe.", "list({\"a\": 1, \"b\": 2}.keys())", "['a', 'b']", "Ko te zanimajo samo ključi."),
      f("values", "slovar", "slovar.values()", "Pripravi vrednosti slovarja.", "Pogled na vrednosti.", "list({\"a\": 1, \"b\": 2}.values())", "[1, 2]", "Ko te zanimajo samo vrednosti."),
      f("update", "slovar", "slovar.update(drugi_slovar)", "Doda oziroma posodobi pare ključ–vrednost.", "None; spremeni originalni slovar.", "a = {\"x\": 1}\na.update({\"y\": 2})", "a je {'x': 1, 'y': 2}", "Ko združuješ ali posodabljaš slovarje."),
      f("pop", "slovar · seznam", "slovar.pop(ključ)", "Odstrani ključ in vrne njegovo vrednost.", "Odstranjeno vrednost; slovar se spremeni.", "d = {\"x\": 5}\nv = d.pop(\"x\")", "v je 5, d je {}", "Ko želiš podatek iz slovarja hkrati vzeti in odstraniti."),
      f("add", "množica", "množica.add(element)", "Doda element v množico.", "None; spremeni množico.", "s = set()\ns.add(3)", "s je {3}", "Ko gradiš množico unikatnih elementov.")
    ]
  },
  {
    id: "slovar-datoteke",
    nav: "Datoteke",
    title: "Datoteke — metode",
    description: "Metode objekta datoteke, navadno znotraj with open(...).",
    entries: [
      f("read", "datoteka", "datoteka.read()", "Prebere celotno vsebino datoteke.", "Niz str.", "with open(\"a.txt\", \"r\", encoding=\"utf-8\") as dat:\n    besedilo = dat.read()", "besedilo vsebuje celotno datoteko", "Ko potrebuješ celotno datoteko naenkrat."),
      f("write", "datoteka", "datoteka.write(niz)", "Zapiše niz v datoteko.", "Število zapisanih znakov.", "with open(\"a.txt\", \"w\", encoding=\"utf-8\") as dat:\n    dat.write(\"Pozdrav\\n\")", "v datoteki je vrstica Pozdrav", "Ko zapisuješ besedilo v datoteko.", "write sam ne doda znaka za novo vrstico." )
    ]
  },
  {
    id: "slovar-numpy-osnove",
    nav: "NumPy — osnove",
    title: "NumPy — ustvarjanje, oblika in tipi",
    description: "Ustvarjanje tabel, njihove dimenzije, preoblikovanje in podatkovni tipi.",
    entries: [
      f("np.array", "NumPy", "np.array(podatki)", "Iz Python podatkov ustvari NumPy tabelo.", "NumPy array.", "np.array([1, 2, 3])", "array([1, 2, 3])", "Ko želiš uporabljati vektorizirane NumPy operacije."),
      f("np.zeros", "NumPy", "np.zeros((št_vrstic, št_stolpcev), dtype=tip)", "Ustvari tabelo ničel dane oblike.", "Novo NumPy tabelo ničel.", "np.zeros((2, 3), dtype=int)", "array([[0, 0, 0], [0, 0, 0]])", "Za začetno prazno numerično tabelo ali rezervacijo prostora."),
      f("np.ones", "NumPy", "np.ones((št_vrstic, št_stolpcev), dtype=tip)", "Ustvari tabelo enic dane oblike.", "Novo NumPy tabelo enic.", "np.ones((2, 2), dtype=int)", "array([[1, 1], [1, 1]])", "Ko potrebuješ začetno tabelo enic."),
      f("np.arange", "NumPy", "np.arange(začetek, konec, korak)", "Ustvari zaporedje s podanim korakom; konec ni vključen.", "1D NumPy tabelo.", "np.arange(0, 10, 2)", "array([0, 2, 4, 6, 8])", "Ko poznaš korak med vrednostmi.", "Če poznaš število želenih točk, je primernejši np.linspace(...)."),
      f("np.linspace", "NumPy", "np.linspace(začetek, konec, število_elementov)", "Ustvari določeno število enakomerno razporejenih vrednosti med robovoma.", "1D NumPy tabelo podane dolžine.", "np.linspace(0, 1, 5)", "array([0.  , 0.25, 0.5 , 0.75, 1.  ])", "Ko poznaš število želenih elementov, ne koraka.", "Privzeto sta začetek in konec vključena."),
      f("np.shape", "NumPy", "np.shape(tabela)", "Pove dimenzije tabele.", "Tuple z velikostmi osi.", "np.shape(np.zeros((3, 4)))", "(3, 4)", "Ko potrebuješ število vrstic, stolpcev ali drugih dimenzij."),
      f("tabela.shape", "NumPy", "tabela.shape", "Atribut z obliko tabele.", "Tuple z velikostmi osi.", "tab = np.zeros((3, 4))\nn, m = tab.shape", "n je 3, m je 4", "Najpogostejši način za razpakiranje števila vrstic in stolpcev."),
      f("np.size", "NumPy", "np.size(tabela)\nnp.size(tabela, axis=os)", "Prešteje vse elemente ali elemente po izbrani osi.", "Celo število.", "np.size(np.zeros((2, 3)))", "6", "Ko potrebuješ skupno število elementov ali velikost osi."),
      f("np.reshape", "NumPy", "np.reshape(tabela, nova_oblika)\ntabela.reshape(nova_oblika)", "Spremeni obliko tabele, ne da bi spremenil število elementov.", "NumPy tabelo nove oblike.", "np.arange(6).reshape((2, 3))", "array([[0, 1, 2], [3, 4, 5]])", "Ko želiš iste elemente preurediti v drugo obliko."),
      f("tabela.T", "NumPy", "tabela.T", "Transponira tabelo: vrstice in stolpci zamenjajo vloge.", "Transponirano NumPy tabelo oziroma pogled.", "np.array([[1, 2], [3, 4]]).T", "array([[1, 3], [2, 4]])", "Ko želiš zamenjati vrstice in stolpce."),
      f("np.newaxis", "NumPy", "tabela[:, np.newaxis]", "Pri indeksiranju doda novo os dolžine 1.", "Pogled tabele z dodatno dimenzijo.", "a = np.array([1, 2, 3])\na[:, np.newaxis]", "oblika je (3, 1)", "Ko 1D tabelo spreminjaš v stolpec ali vrstico za broadcasting."),
      f("np.atleast_2d", "NumPy", "np.atleast_2d(tabela)", "Poskrbi, da ima vhod vsaj dve dimenziji.", "Vsaj 2D NumPy tabelo.", "np.atleast_2d([1, 2, 3])", "array([[1, 2, 3]])", "Ko funkcija zahteva 2D tabelo, vhod pa je lahko 1D."),
      f("astype", "NumPy", "tabela.astype(tip)", "Pretvori tip vseh elementov.", "Novo NumPy tabelo izbranega tipa.", "np.array([True, False]).astype(int)", "array([1, 0])", "Ko želiš npr. bool pretvoriti v 0/1 ali int v float.", "Originalne tabele ne spremeni."),
      f("np.fromfunction", "NumPy", "np.fromfunction(funkcija, oblika)", "Ustvari tabelo iz formule, ki uporablja indekse.", "Novo NumPy tabelo.", "np.fromfunction(lambda i, j: i + j, (2, 3))", "array([[0., 1., 2.], [1., 2., 3.]])", "Ko je vrednost elementa določena s formulo glede na njegov indeks."),
      f("np.meshgrid", "NumPy", "np.meshgrid(x, y, indexing=\"ij\")", "Iz 1D koordinat naredi koordinatne mreže.", "Tuple koordinatnih NumPy tabel.", "i, j = np.meshgrid(np.arange(2), np.arange(3), indexing=\"ij\")", "i in j sta 2D koordinatni tabeli", "Ko potrebuješ vse kombinacije koordinat ali indeksov.")
    ]
  },
  {
    id: "slovar-numpy-zdruzevanje",
    nav: "NumPy — združevanje",
    title: "NumPy — združevanje in preurejanje",
    description: "Spajanje tabel ter spreminjanje njihovega vrstnega reda.",
    entries: [
      f("np.append", "NumPy", "np.append(tabela, nove_vrednosti, axis=os)", "Doda vrednosti in vrne novo tabelo.", "Novo NumPy tabelo.", "np.append(np.array([1, 2]), 3)", "array([1, 2, 3])", "Za preprosto dodajanje vrednosti, predvsem pri 1D tabelah.", "Brez axis se podatki sploščijo; originala ne spremeni."),
      f("np.concatenate", "NumPy", "np.concatenate([tabela1, tabela2], axis=os)", "Združi več tabel vzdolž izbrane osi.", "Novo združeno NumPy tabelo.", "np.concatenate([np.array([1, 2]), np.array([3, 4])])", "array([1, 2, 3, 4])", "Ko združuješ tabele enakih dimenzij po določeni osi."),
      f("np.vstack", "NumPy", "np.vstack([vrstica1, vrstica2, ...])", "Zloži tabele navpično.", "Novo 2D NumPy tabelo.", "np.vstack([np.array([1, 2]), np.array([3, 4])])", "array([[1, 2], [3, 4]])", "Ko želiš iz več vrstic sestaviti 2D tabelo."),
      f("np.hstack", "NumPy", "np.hstack([tabela1, tabela2, ...])", "Zloži tabele vodoravno.", "Novo NumPy tabelo.", "np.hstack([np.array([1, 2]), np.array([3, 4])])", "array([1, 2, 3, 4])", "Ko želiš podatke dodati vodoravno."),
      f("np.flip", "NumPy", "np.flip(tabela, axis=os)", "Obrne vrstni red elementov po izbrani osi.", "Novo oziroma obrnjeno NumPy tabelo.", "np.flip(np.array([1, 2, 3]))", "array([3, 2, 1])", "Ko želiš obrniti vrstice, stolpce ali zaporedje."),
      f("np.roll", "NumPy", "np.roll(tabela, premik, axis=os)", "Ciklično premakne elemente.", "Premaknjeno NumPy tabelo.", "np.roll(np.array([1, 2, 3]), 1)", "array([3, 1, 2])", "Pri periodičnih premikih ali primerjanju s sosednjimi elementi."),
      f("np.pad", "NumPy", "np.pad(tabela, širina_roba, mode=\"constant\")", "Doda rob okoli tabele.", "Novo večjo NumPy tabelo.", "np.pad(np.array([1, 2, 3]), 1)", "array([0, 1, 2, 3, 0])", "Ko potrebuješ dodatne robne elemente, pogosto ničle."),
      f("np.sort", "NumPy", "np.sort(tabela, axis=os)", "Uredi elemente vzdolž izbrane osi.", "Urejeno kopijo NumPy tabele.", "np.sort(np.array([3, 1, 2]))", "array([1, 2, 3])", "Ko želiš urediti NumPy podatke brez spreminjanja originala.")
    ]
  },
  {
    id: "slovar-numpy-pogoji",
    nav: "NumPy — pogoji",
    title: "NumPy — pogoji, indeksi in izbira",
    description: "Vektorizirani pogoji in iskanje položajev brez ročnih zank.",
    entries: [
      f("np.where", "NumPy · pogoji", "np.where(pogoj, vrednost_če_drži, vrednost_če_ne)", "Za vsak element izbere eno od dveh vrednosti glede na pogoj.", "Novo NumPy tabelo izbranih vrednosti.", "np.where(np.array([-2, 3, -1]) > 0, 1, 0)", "array([0, 1, 0])", "Ko želiš elemente pogojno zamenjati ali izdelati novo tabelo glede na masko."),
      f("np.all", "NumPy · pogoji", "np.all(pogoj)", "Preveri, ali vsi elementi pogoja veljajo.", "Brez axis: eno True ali False. Z axis: logično tabelo po izbrani osi.", "np.all(np.array([2, 5, 1]) > 0)", "True", "Ko mora pogoj veljati za vse elemente."),
      f("np.any", "NumPy · pogoji", "np.any(pogoj)", "Preveri, ali vsaj en element pogoja velja.", "Brez axis: eno True ali False. Z axis: logično tabelo po izbrani osi.", "np.any(np.array([2, -5, 1]) < 0)", "True", "Ko zadostuje, da pogoj velja za vsaj en element."),
      f("np.less_equal", "NumPy · pogoji", "np.less_equal(a, b)", "Element po elementu preveri a ≤ b.", "Logično NumPy tabelo True/False.", "np.less_equal(np.array([1, 4]), 2)", "array([ True, False])", "Ko želiš funkcijsko obliko primerjave.", "V večini nalog je krajši zapis a <= b."),
      f("np.nonzero", "NumPy · indeksi", "np.nonzero(pogoj)", "Poišče indekse mest, kjer je vrednost neničelna oziroma pogoj True.", "Tuple NumPy tabel indeksov po oseh.", "np.nonzero(np.array([0, 5, 0, 2]))", "(array([1, 3]),)", "Ko pri večdimenzionalni tabeli potrebuješ indekse po posameznih oseh."),
      f("np.flatnonzero", "NumPy · indeksi", "np.flatnonzero(pogoj)", "Poišče 1D indekse neničelnih oziroma True elementov.", "1D NumPy tabelo indeksov.", "np.flatnonzero(np.array([0, 5, 0, 2]))", "array([1, 3])", "Ko želiš preprost seznam indeksov."),
      f("np.argmax", "NumPy · indeksi", "np.argmax(tabela, axis=os)", "Poišče položaj največje vrednosti.", "Indeks; z axis lahko tabelo indeksov.", "np.argmax(np.array([4, 9, 2]))", "1", "Ko poleg maksimuma potrebuješ njegov položaj."),
      f("np.argmin", "NumPy · indeksi", "np.argmin(tabela, axis=os)", "Poišče položaj najmanjše vrednosti.", "Indeks; z axis lahko tabelo indeksov.", "np.argmin(np.array([4, 9, 2]))", "2", "Ko poleg minimuma potrebuješ njegov položaj.")
    ]
  },
  {
    id: "slovar-numpy-statistika",
    nav: "NumPy — statistika",
    title: "NumPy — agregacije, osi in statistika",
    description: "Funkcije, ki več vrednosti združijo v eno ali računajo po izbrani osi.",
    entries: [
      f("np.sum", "NumPy · axis", "np.sum(tabela, axis=os)", "Sešteje elemente celotne tabele ali po izbrani osi.", "Eno število ali NumPy tabelo vsot.", "tab = np.array([[1, 2], [3, 4]])\nnp.sum(tab, axis=1)", "array([3, 7])", "Za vsote celotne tabele, vrstic ali stolpcev.", "axis=0 vrne rezultat za vsak stolpec; axis=1 za vsako vrstico."),
      f("np.min", "NumPy · axis", "np.min(tabela, axis=os)", "Poišče minimum globalno ali po osi.", "Eno vrednost ali NumPy tabelo minimumov.", "np.min(np.array([[4, 2], [7, 1]]), axis=1)", "array([2, 1])", "Ko potrebuješ najmanjše vrednosti."),
      f("np.max", "NumPy · axis", "np.max(tabela, axis=os)", "Poišče maksimum globalno ali po osi.", "Eno vrednost ali NumPy tabelo maksimumov.", "np.max(np.array([[4, 2], [7, 1]]), axis=0)", "array([7, 2])", "Ko potrebuješ največje vrednosti."),
      f("np.maximum", "NumPy", "np.maximum(a, b)", "Primerja a in b element po elementu in na vsakem mestu vzame večjo vrednost.", "NumPy tabelo elementnih maksimumov.", "np.maximum(np.array([1, 5]), np.array([3, 2]))", "array([3, 5])", "Ko primerjaš dve tabeli element po elementu.", "Ni isto kot np.max(...), ki agregira vrednosti."),
      f("np.mean", "NumPy · axis", "np.mean(tabela, axis=os)", "Izračuna aritmetično povprečje.", "Eno število ali NumPy tabelo povprečij.", "np.mean(np.array([2, 4, 6]))", "4.0", "Ko želiš navadno povprečje."),
      f("np.average", "NumPy · axis", "np.average(tabela, axis=os, weights=uteži)", "Izračuna povprečje in omogoča uteži.", "Eno število ali NumPy tabelo povprečij.", "np.average(np.array([10, 20]), weights=[1, 3])", "17.5", "Ko potrebuješ uteženo povprečje."),
      f("np.std", "NumPy · statistika", "np.std(tabela, axis=os)", "Izračuna standardni odklon.", "Eno število ali NumPy tabelo standardnih odklonov.", "np.std(np.array([2, 2, 2]))", "0.0", "Ko ocenjuješ razpršenost numeričnih podatkov."),
      f("np.prod", "NumPy · axis", "np.prod(tabela, axis=os)", "Zmnoži elemente.", "Eno število ali NumPy tabelo produktov.", "np.prod(np.array([2, 3, 4]))", "24", "Ko potrebuješ produkt več elementov."),
      f("np.cumsum", "NumPy", "np.cumsum(tabela, axis=os)", "Izračuna sprotne kumulativne vsote.", "NumPy tabelo kumulativnih vsot.", "np.cumsum(np.array([2, 3, 4]))", "array([2, 5, 9])", "Ko želiš tekočo oziroma sprotno vsoto.")
    ]
  },
  {
    id: "slovar-numpy-matematika",
    nav: "NumPy — matematika",
    title: "NumPy — matematične funkcije",
    description: "Delujejo element po elementu na celotni NumPy tabeli.",
    entries: [
      f("np.abs", "NumPy · matematika", "np.abs(tabela)", "Izračuna absolutno vrednost vsakega elementa.", "NumPy tabelo absolutnih vrednosti.", "np.abs(np.array([-2, 3]))", "array([2, 3])", "Za absolutne razlike in velikosti vrednosti."),
      f("np.sqrt", "NumPy · matematika", "np.sqrt(tabela)", "Izračuna kvadratni koren vsakega elementa.", "NumPy tabelo korenov.", "np.sqrt(np.array([1, 4, 9]))", "array([1., 2., 3.])", "Ko uporabljaš koren na več NumPy vrednostih."),
      f("np.square", "NumPy · matematika", "np.square(tabela)", "Kvadrira vsak element.", "NumPy tabelo kvadratov.", "np.square(np.array([2, 3]))", "array([4, 9])", "Ko želiš elementne kvadrate.", "Pogost zapis je tudi tabela ** 2."),
      f("np.sin", "NumPy · matematika", "np.sin(koti_v_radianih)", "Izračuna sinus vsakega elementa.", "NumPy tabelo sinusov.", "np.sin(np.radians(np.array([0, 30, 90])))", "približno array([0. , 0.5, 1. ])", "Ko računaš sinus za NumPy tabelo.", "Če imaš stopinje, jih prej pretvori z np.radians(...)."),
      f("np.cos", "NumPy · matematika", "np.cos(koti_v_radianih)", "Izračuna kosinus vsakega elementa.", "NumPy tabelo kosinusov.", "np.cos(np.radians(np.array([0, 60, 90])))", "približno array([1. , 0.5, 0. ])", "Ko računaš kosinus za NumPy tabelo."),
      f("np.arcsin", "NumPy · matematika", "np.arcsin(vrednosti_sinusa)", "Inverzni sinus: iz vrednosti sinusov izračuna kote.", "NumPy tabelo kotov v radianih.", "np.arcsin(np.array([0, 0.5, 1]))", "približno array([0. , 0.524, 1.571])", "Ko iz vrednosti sinusa iščeš kote za celo tabelo.", "Za eno število v modulu math je ime math.asin(...)."),
      f("np.exp", "NumPy · matematika", "np.exp(tabela)", "Izračuna e na potenco vsakega elementa.", "NumPy tabelo eksponentnih vrednosti.", "np.exp(np.array([0, 1]))", "array([1.        , 2.71828183])", "Pri eksponentnih funkcijah nad več vrednostmi."),
      f("np.log", "NumPy · matematika", "np.log(pozitivna_tabela)", "Izračuna naravni logaritem element po elementu.", "NumPy tabelo logaritmov.", "np.log(np.array([1, np.e]))", "array([0., 1.])", "Pri naravnih logaritmih pozitivnih NumPy vrednosti."),
      f("np.radians", "NumPy · matematika", "np.radians(stopinje)", "Pretvori stopinje v radiane element po elementu.", "NumPy tabelo kotov v radianih.", "np.radians(np.array([0, 90, 180]))", "približno array([0. , 1.571, 3.142])", "Pred np.sin/np.cos, če so koti podani v stopinjah."),
      f("np.degrees", "NumPy · matematika", "np.degrees(radiani)", "Pretvori radiane v stopinje element po elementu.", "NumPy tabelo kotov v stopinjah.", "np.degrees(np.array([0, np.pi / 2]))", "array([ 0., 90.])", "Ko želiš rezultate kotov v stopinjah."),
      f("np.pi", "NumPy · konstanta", "np.pi", "Konstanta π.", "Število približno 3.14159.", "2 * np.pi", "približno 6.28318", "Ko v NumPy izračunih potrebuješ π.", "To ni funkcija, zato nima oklepajev.")
    ]
  },
  {
    id: "slovar-numpy-posebno",
    nav: "NumPy — posebno",
    title: "NumPy — kompleksna števila in posebne vrednosti",
    description: "Kompleksne komponente, posebne vrednosti in pretvorbe tipov.",
    entries: [
      f("np.real", "NumPy · kompleksna", "np.real(tabela)", "Vzeme realni del kompleksnih elementov.", "NumPy tabelo realnih delov.", "np.real(np.array([1 + 2j, 3 + 0j]))", "array([1., 3.])", "Ko iz kompleksne tabele potrebuješ realne komponente."),
      f("np.imag", "NumPy · kompleksna", "np.imag(tabela)", "Vzeme imaginarni del kompleksnih elementov.", "NumPy tabelo imaginarnih delov.", "np.imag(np.array([1 + 2j, 3 + 0j]))", "array([2., 0.])", "Ko potrebuješ imaginarne komponente."),
      f("np.nan", "NumPy · posebna vrednost", "np.nan", "Posebna vrednost Not a Number.", "Posebno plavajočo vrednost nan.", "np.array([1.2, np.nan, 3.4])", "array([1.2, nan, 3.4])", "Ko moraš označiti manjkajočo ali neveljavno numerično vrednost.", "To ni funkcija, zato nima oklepajev."),
      f("1j", "Python · kompleksna", "realni_del + imaginarni_del * 1j", "Imaginarna enota za zapis kompleksnih števil.", "Kompleksno število.", "z = 2 + 3j\nz", "(2+3j)", "Ko naloga uporablja kompleksna števila.")
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
      `${entry.name} ${entry.target} ${entry.syntax} ${entry.meaning} ${entry.returns} ${entry.when}`
    )}">
      <summary>
        <code>${esc(entry.name)}</code>
        <span class="use-tags">${targets}</span>
      </summary>
      <div class="function-body">
        <div class="function-syntax-main">
          <div class="mini-label">Kako zapišem</div>
          <pre><code>${esc(entry.syntax)}</code></pre>
        </div>
        <div class="function-facts">
          <p><strong>Kaj naredi:</strong> ${esc(entry.meaning)}</p>
          <p class="function-return"><strong>Vrne:</strong> ${esc(entry.returns)}</p>
          <p><strong>Kdaj uporabim:</strong> ${esc(entry.when)}</p>
        </div>
        <div class="function-example-grid">
          <div>
            <div class="mini-label">Primer uporabe</div>
            <pre><code>${esc(entry.example)}</code></pre>
          </div>
          <div>
            <div class="mini-label">Rezultat</div>
            <pre class="result-box"><code>${esc(entry.result)}</code></pre>
          </div>
        </div>
        ${entry.note ? `<div class="function-note"><strong>Pozor:</strong> ${esc(entry.note)}</div>` : ""}
      </div>
    </details>`;
}

function installCompactStyles() {
  const style = document.createElement("style");
  style.textContent = `
    html { font-size: 14px; }
    body { line-height: 1.48; }
    .content { padding-top: 32px; padding-bottom: 68px; }
    .hero { padding: clamp(22px, 3vw, 36px); }
    .section { margin-top: 46px; }
    .card { padding: 16px; }
    pre { font-size: 0.82rem; }
    .sidebar { padding-top: 22px; }
    .nav a { padding-top: 6px; padding-bottom: 6px; font-size: 0.87rem; }

    .function-nav-sub {
      display: grid;
      gap: 1px;
      margin: 2px 0 7px 13px;
      padding-left: 9px;
      border-left: 1px solid #35445f;
    }
    .function-nav-sub a {
      padding: 4px 7px;
      color: #aeb9cc;
      font-size: 0.76rem;
      font-weight: 500;
    }
    .function-nav-sub a:hover { color: white; }

    .function-reference { grid-template-columns: 1fr; }
    .function-group { padding: 0; overflow: hidden; scroll-margin-top: 18px; }
    .function-group-heading { padding: 16px 18px 13px; }
    .function-group-heading h3 { font-size: 1.08rem; }
    .function-group-heading p { margin-top: 4px; }
    .function-entry summary { padding: 10px 16px; }
    .function-entry summary code { min-width: 118px; }
    .function-body { padding: 6px 16px 16px; }

    .function-syntax-main { margin-bottom: 12px; }
    .function-syntax-main pre { margin: 4px 0 0; }
    .function-facts {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin: 0 0 13px;
    }
    .function-facts p {
      margin: 0 !important;
      padding: 9px 10px;
      border: 1px solid var(--line);
      border-radius: 9px;
      background: white;
      color: var(--text);
      font-size: 0.86rem;
    }
    .function-facts .function-return {
      border-color: #badfd5;
      background: #eef9f5;
    }
    .function-example-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.85fr);
      align-items: start;
      gap: 10px;
    }
    .function-example-grid > div { min-width: 0; }
    .function-example-grid pre {
      height: auto !important;
      min-height: 72px;
      margin: 4px 0 0 !important;
    }
    .result-box { background: #172235; }
    .function-note { margin-top: 10px; }
    .function-legend { font-size: 0.87rem; }

    @media (max-width: 920px) {
      html { font-size: 14px; }
      .function-facts, .function-example-grid { grid-template-columns: 1fr; }
      .function-example-grid pre { min-height: 0; }
      .function-nav-sub { display: none; }
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
    if (title) title.textContent = "Slovar funkcij";
    if (description) {
      description.textContent =
        "Hiter slovar sintakse: kako funkcijo zapišeš, kaj naredi, kaj vrne in konkreten primer z rezultatom.";
    }
  }

  const oldGrid = section.querySelector(".grid");
  if (!oldGrid) return;

  const intro = `
    <div class="function-legend">
      <strong>Kako uporabljaš slovar:</strong>
      poišči ime funkcije ali klikni podpoglavje v levem kazalu. Pri vsaki funkciji najprej vidiš natančen zapis, nato kaj naredi in kaj vrne, spodaj pa primer ter rezultat.
      Pri matematiki: <code>math.sin(x)</code> je za eno število, <code>np.sin(tabela)</code> pa za NumPy podatke.
    </div>`;

  const groups = functionGroups
    .map(
      (group) => `
        <article id="${esc(group.id)}" class="card wide function-group">
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

function buildFunctionNavigation() {
  const mainLink = document.querySelector('a[href="#funkcije"]');
  if (!mainLink) return;

  mainLink.textContent = "Slovar funkcij";
  document.querySelector(".function-nav-sub")?.remove();

  const subnav = document.createElement("div");
  subnav.className = "function-nav-sub";
  subnav.innerHTML = functionGroups
    .map((group) => `<a href="#${esc(group.id)}">${esc(group.nav)}</a>`)
    .join("");
  mainLink.insertAdjacentElement("afterend", subnav);
}

function cleanGeneralPageLabels() {
  document.title = "Python priročnik";

  const brand = document.querySelector(".brand");
  if (brand) brand.textContent = "Python priročnik";

  document.querySelector(".brand-subtitle")?.remove();
  document.querySelector(".notice")?.remove();

  const notebookLink = document.querySelector('a[href*="snov.ipynb"]');
  notebookLink?.remove();

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
installCompactStyles();
buildFunctionReference();
buildFunctionNavigation();

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
    const hasVisibleEntry = group.querySelector(".function-entry:not(.hidden-by-search)");
    group.classList.toggle("hidden-by-search", Boolean(query) && !hasVisibleEntry);
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
