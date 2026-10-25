# Induktion: Leiterschaukel im Magnetfeld

Interaktive 3D-Simulation für den Physikunterricht (Jahrgangsstufe 10, elektromagnetische Induktion,
Tablet geeignet). Eine Leiterschaukel – ein Kupferstab an zwei Messingbügeln – hängt an einem Stativ
zwischen den Polen eines großen Hufeisenmagneten. Bewegt man die Schaukel, wird im Stab eine Spannung
induziert, die ein großes Demonstrations-Zeigermessgerät (Nullpunkt in der Mitte) anzeigt.

## Funktionen

Zwei Versuche, per Knopf umschaltbar:

- **Drehbarer Magnet:** Der Magnet sitzt in einem Drehgelenk mit Winkelskala (siehe unten).
- **Magnet auf dem Tisch:** Der Magnet liegt flach auf dem Tisch und lässt sich mit Maus/Finger nach vorne
  und hinten schieben. Die Querstange ist dafür tiefer am Stativ eingespannt. Entscheidend für die
  Spannung ist die Relativbewegung: Magnet nach hinten ziehen wirkt wie Schaukel nach vorne bewegen.
  Schiebt man den Magneten gegen den Stab, drückt der Bogen die Schaukel mit.

- **Schaukel bewegen:** Stab oder Bügel mit Maus/Finger fassen und ziehen. Beim Loslassen schwingt die
  Schaukel gedämpft weiter. „Auslenken und loslassen“ startet eine gleichmäßige Schwingung, „Anhalten“
  bringt sie zur Ruhe. Am Magneten schlägt die Schaukel an.
- **Zeitlupe** (¼ der Geschwindigkeit), damit man Bewegung und Zeiger gleichzeitig verfolgen kann
- **Magnet umdrehen (N ↔ S):** Der Zeiger schlägt andersherum aus.
- **Langer Hufeisenmagnet** (in beiden Versuchen): Schenkel 32 statt 11 cm, sie reichen 16 cm vor und hinter
  den Stab. Die Schaukel kann bis etwa 37° ausschwingen, ohne anzustoßen („Auslenken und loslassen“ startet
  hier mit 25°). Beim drehbaren Magneten liegt die Drehachse dafür höher (26 statt 18 cm), damit der Bogen
  beim Drehen nicht in den Tisch fährt; Querstange und Drehgelenk sind entsprechend höher eingespannt.
- **Magnet drehen (α = 0° … 90°):** Der Magnet sitzt in einem Drehgelenk mit Winkelskala und dreht sich
  um die Achse des Stabs. Bei 0° steht das Feld senkrecht zur Bewegung (größte Spannung), bei 90°
  stehen die Schenkel vor und hinter dem Stab, das Feld zeigt in Schwingrichtung – keine Spannung.
  Dazwischen gilt U ∼ cos α.
- **Messgerät:** Spannung (mV) oder Stromstärke (mA), Messbereiche ±1, ±3, ±10. Der Zeiger ist träge,
  schwingt leicht nach und bleibt bei Überlast am Anschlag. Wahlweise Messwert zusätzlich als Zahl.
  „Anhalten“ setzt den Zeiger sofort auf 0. Das Messgerät lässt sich anfassen und durch seitliches Ziehen
  um die senkrechte Achse drehen; „Messgerät zu mir drehen“ richtet die Skala zur aktuellen Ansicht aus.
  Die Kabel laufen dabei um das Gerät herum mit.
- **Kabel vertauschen** (Messgerät und LED): Das rote Kabel vom rechten Stabende steckt dann in der
  Minus-Buchse bzw. an der Kathode, das schwarze in der Plus-Buchse bzw. an der Anode. Der Zeiger schlägt
  andersherum aus, die LED leuchtet bei der jeweils anderen Halbschwingung.
- **Strommessung und Lenz'sche Regel:** Bei Strommessung ist der Kreis geschlossen, der Induktionsstrom
  bremst die Schaukel. Bei einem echten Aufbau ist das kaum zu merken; per Gedankenexperiment lässt sich
  die Bremskraft 1000-fach verstärken.

## LED statt Messgerät (Gedankenexperiment)

Unter „Anzeige“ lässt sich statt des Zeigermessgeräts eine LED auf einer Steckplatte anschließen
(rote Buchse = Anode, am rechten Stabende; schwarze Buchse = Kathode). In der Simulation steht dazu bewusst
kein Erklärtext – die Einordnung gehört in den Unterricht:

- **In Wirklichkeit leuchtet hier keine LED.** Die Leiterschaukel liefert nur U = B · l · v ≈ 0,1 T · 0,06 m
  · 0,3 m/s ≈ 2 mV (kräftig gezogen höchstens einige mV). Eine LED braucht etwa 1,8 V (rot) bis 3 V
  (weiß/blau), ein Glühlämpchen mindestens rund 1 V und einige 10 mA – es fehlt ein Faktor 300 bis 1000.
- **Im Gedankenexperiment** ist die Schwellspannung der LED auf 1 mV herabgesetzt (statt etwa 1,8 V). Darüber
  wird sie mit wachsender Spannung heller, ab 3 mV leuchtet sie voll. Die LED wirkt nicht auf die Schaukel
  zurück (keine Bremsung).
- Wie eine echte LED leuchtet sie **nur in Durchlassrichtung**, also nur, wenn das rechte Stabende Pluspol ist.
  Beim Pendeln blitzt sie deshalb nur bei jeder zweiten Halbschwingung auf; nach „Magnet umdrehen“ in der
  jeweils anderen.
- **Wie es wirklich geht:** Mit einer Spule aus vielen Windungen addieren sich die Spannungen der einzelnen
  Leiterstücke. Mit einigen hundert bis tausend Windungen und schneller Bewegung erreicht man Volt –
  so arbeiten Fahrraddynamo und Generator.

## Glühlampe statt Messgerät (Gedankenexperiment)

Als dritte Anzeige lässt sich eine Glühlampe in einer Fassung anschließen. Auch hier steht in der Simulation
kein Erklärtext:

- **Noch unrealistischer als die LED.** Ein kleines Glühlämpchen (z. B. 3,8 V / 0,07 A) braucht rund 1 V, um
  überhaupt sichtbar zu glühen, und vor allem Leistung: einige 10 mW. Die Leiterschaukel liefert etwa 2 mV
  und – bei einem Kreiswiderstand um 1 Ω – nur Mikrowatt; es fehlen mehrere Zehnerpotenzen.
- **Im Gedankenexperiment** glüht der Draht sichtbar ab 1,5 mV und ist bei 5 mV voll hell. Die Helligkeit folgt
  der Leistung (∝ U²); der Draht heizt sich kurz auf und glüht nach (Zeitkonstante 0,08 s). Er glüht erst
  dunkelrot, dann orange, bei voller Leistung warmweiß. Die Lampe wirkt nicht auf die Schaukel zurück.
- **Unterschied zur LED:** Die Glühlampe leuchtet **in beiden Stromrichtungen**, also bei jeder Halbschwingung;
  „Kabel vertauschen“ ändert nichts. Bei kleinen Schwingungen bleibt sie dunkel, während die LED (Schwelle
  1 mV) schon aufblitzt.

## Erklärung: Elektron im Leiter

Der Knopf „Erklärung: Elektron im Leiter“ blendet alles Störende aus (Stative, Querstange, Halter, Messgerät,
Kabel, Tisch). Es bleiben der Magnet und die Schaukel. Der Stab ist dicker und
durchsichtig; in seiner Mitte sitzt ein (stark vergrößertes) Elektron, dargestellt als blaue Kugel mit
„−“ darin (Atomrümpfe bei „Viele Elektronen“: rote Kugeln mit „+“). Die Zeitlupe ist eingeschaltet, die
Kamera schaut schräg von vorne auf den Stab. Schaukel (und auf dem Tisch der Magnet) lassen sich weiter ziehen.
Links erscheint ein eigenes Bedienfeld für den Erklärmodus:

- **Pause / Weiter:** friert die Bewegung ein (Schaukel, Magnet, Elektron). Die Pfeile zeigen den Augenblick,
  so bleibt z. B. der Geschwindigkeitspfeil v sichtbar, obwohl nichts mehr läuft.
- **Zeitlupe:** wie im Bedienfeld rechts (beide Schalter sind gekoppelt).
- **Leiter festhalten:** Der Leiter pendelt nicht mehr, er bleibt, wo er ist. Mit dem Regler „Lage des
  Leiters“ (Winkel in Grad, vorne +, hinten −) oder durch Ziehen lässt er sich bewegen; er folgt direkt und
  bleibt beim Loslassen stehen. „Auslenken und loslassen“ beendet das Festhalten.
- **v, B, F_L, Hand:** Pfeil v, Feldlinien B, Pfeil F_L und Hand einzeln ein- und ausblenden; beim Wechsel
  in den Erklärmodus sind alle vier zunächst ausgeschaltet.
- **Viele Elektronen:** 11 Elektronen (blau) und ebenso viele ortsfeste positive Atomrümpfe (rot) im Stab.
  Die Lorentzkraft schiebt alle Elektronen zum selben Ende; sie drängen sich dort zusammen
  (Elektronenüberschuss, Minuspol), am anderen Ende bleiben nur die Atomrümpfe (Elektronenmangel, Pluspol).
  Beschriftungen an den Stabenden erscheinen, sobald sich die Elektronen merklich verschoben haben.
- **Elektron:** beobachtetes Elektron ein-/ausblenden (zu Beginn an). Bei „Viele Elektronen“ bleibt es in der
  Reihe, nur seine Hervorhebung (weißer Rand) verschwindet.
- **Magnet umdrehen (N ↔ S)** – derselbe Knopf wie in der rechten Leiste
- **Elektronen zurücksetzen**
- **Tafel:** Unter dem Magneten steht eine kleine Tafel mit einem festen Bild des Leiters im Magnetfeld
  (`bilder/tafel.jpg`). Antippen (oder „Tafel öffnen“ im Bedienfeld) öffnet sie groß. Dort zeichnet man mit
  Apple Pencil, Finger oder Maus: Stifte v (grün), B (blau), F_L (rot), Stift (schwarz), Radierer, Freihand oder
  gerader Pfeil, Rückgängig, Alles löschen. Der Stiftdruck bestimmt die Strichbreite; sobald der Pencil benutzt
  wurde, werden Finger und Handballen auf der Zeichenfläche ignoriert. Die Zeichnung bleibt im Browser gespeichert.
  Läuft die Seite über den Abgabe-Server (siehe unten), können Schüler sie mit „Teilen“ abgeben.

- Pfeile am Elektron: Geschwindigkeit v des Leiters (grün) und Lorentzkraft F_L auf das Elektron (rot);
  die Längen wachsen mit v bzw. v·B. Das Magnetfeld B zeigen Feldlinien im Polspalt (blau, von N nach S).
- Das Elektron wandert stark verlangsamt entlang des Stabs, solange die Lorentzkraft wirkt, und bleibt
  am Stabende stehen. Schwingt die Schaukel zurück, wandert es zurück. „Auslenken und loslassen“ und
  „Elektron in die Mitte“ setzen es wieder in die Mitte.
- Rechte Hand zur Drei-Finger-Regel (abschaltbar): Daumen v (Bewegung der positiven Ladungen mit dem Leiter),
  Zeigefinger B, Mittelfinger Kraft auf eine positive Ladung. Sie dreht sich mit der Bewegungsrichtung.
  Die Kraft auf das Elektron zeigt entgegengesetzt zum Mittelfinger.
- Beim Magneten auf dem Tisch zählt die Bewegung des Leiters relativ zum Magneten (Schulmodell).

## Link zeigen

Der Knopf „Link / QR-Code zeigen“ (ganz oben im Bedienfeld rechts) öffnet ein großes Fenster mit QR-Code und Adresse der Simulation zum
Abscannen vom Beamer. Der Code wird im Browser aus der eigenen Adresse erzeugt; bei lokal geöffneter Seite
(localhost) zeigt er die öffentliche Adresse <https://marco230199.github.io/leiterschaukel-induktion/>
(`PUBLIC_URL` in `js/config.js`). Die QR-Code-Bibliothek
[qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT) wird beim ersten Öffnen aus dem
Internet geladen.

## Abgabe im Unterricht (Abgabe-Server)

Schüler zeichnen auf der Tafel und schicken ihre Zeichnung mit **„Teilen“** an den Lehrer-Laptop. Die Lehrerseite
zeigt alle Abgaben live; ein Klick öffnet eine Abgabe groß auf der Tafel.

Dafür läuft auf dem Laptop ein kleiner Node.js-Server, der **die Simulation selbst mit ausliefert** – Schüler und
Lehrer öffnen alles über `http://<Laptop-IP>:8080`. (Die GitHub-Pages-Seite läuft über HTTPS und dürfte einen
unverschlüsselten Server im lokalen Netz gar nicht ansprechen.) Die GitHub-Pages-Version funktioniert weiter
wie bisher; ohne Server ist der Knopf „Teilen“ einfach ausgeblendet.

### Installation (einmalig)

```bash
sudo dnf install nodejs        # Node.js ab Version 18; prüfen mit: node --version
```

Weitere Pakete sind nicht nötig (kein `npm install`). Optional, solange Internet da ist:

```bash
npm run offline                # lädt three.js und die QR-Code-Bibliothek nach server/offline/ (ca. 1,4 MB)
```

Dann liefert der Server diese Bibliotheken selbst aus, und die Simulation läuft auch in einem Netz **ohne
Internet** (z. B. im Hotspot des Laptops). Ohne diesen Schritt holen die Geräte three.js wie bisher aus dem Internet.

### Start

Im Ordner `leiterschaukel-induktion`:

```bash
npm start
```

Die Konsole zeigt die Adresse für die Schüler, die Lehrerseite und die **PIN**, z. B.:

```text
  Schüler:  http://192.168.2.51:8080/
  Lehrer:   http://localhost:8080/lehrer      PIN: 483920
```

Eigene PIN oder anderer Port: `PIN=2468 PORT=8090 npm start`. Beenden mit **Strg+C** – dabei sind alle Abgaben weg.

### Ablauf in der Stunde

1. Lehrer-Laptop: `http://localhost:8080/lehrer` öffnen, PIN eingeben. Unten erscheint die Leiste **„Abgaben“** mit
   Adresse und QR-Code (Klick auf „Groß“ zeigt den QR-Code groß und alle Abgaben als Raster; „Link / QR-Code
   zeigen“ zeigt jetzt ebenfalls die Schüleradresse).
2. Schüler scannen den QR-Code, öffnen „Erklärung: Elektron im Leiter“, tippen auf die Tafel und zeichnen.
   Optional Name/Kürzel eintragen, dann **„Teilen“** → „Geteilt ✓“. Erneutes Teilen ersetzt die vorige Abgabe
   dieses Geräts.
3. Neue Abgaben erscheinen in der Leiste ohne Neuladen (kurz grün umrandet). Ein Klick öffnet die Abgabe auf der
   Tafel; die kleine Tafel in der Szene zeigt dann ebenfalls diese Abgabe, Antippen öffnet sie wieder.
4. Die geöffnete Abgabe lässt sich mit denselben Werkzeugen ergänzen und radieren. Das ist **nur eine Arbeitskopie
   auf dem Lehrer-Laptop**: Der Schüler sieht nichts davon, das Original bleibt erhalten. „Original
   wiederherstellen“ verwirft die Änderungen. Teilt der Schüler erneut, während die Kopie bearbeitet ist, steht
   „neue Version eingegangen“ im Titel – „Original wiederherstellen“ lädt sie.
5. „Abgabe löschen“ (in der Tafel) bzw. „Alle löschen“ (in der Leiste) fragen einmal nach („Wirklich …?“).
   „Eigene Tafel“ in der Leiste führt zurück zur eigenen Zeichnung.

**Mehrere Klassen gleichzeitig:** Raumcode an die Lehreradresse hängen, z. B. `http://localhost:8080/lehrer?raum=10b`.
Der QR-Code enthält den Raum dann automatisch; jede Lehrerseite sieht nur die Abgaben ihres Raums.

### Firewall freigeben (Fedora, firewalld)

Auf Fedora Workstation sind in der Standardzone die Ports 1025–65535 meist schon offen. Prüfen:

```bash
firewall-cmd --get-active-zones          # welche Zone hat das WLAN?
firewall-cmd --list-all                  # Port 8080 bzw. 1025-65535 unter „ports“?
```

Falls nicht freigegeben:

```bash
sudo firewall-cmd --add-port=8080/tcp                                         # bis zum Neustart
sudo firewall-cmd --permanent --add-port=8080/tcp && sudo firewall-cmd --reload  # dauerhaft
sudo firewall-cmd --permanent --remove-port=8080/tcp && sudo firewall-cmd --reload  # wieder schließen
```

Liegt das WLAN in einer anderen Zone als der Standardzone, `--zone=<Zone>` ergänzen (beim Laptop-Hotspot heißt sie
meist `nm-shared`: `sudo firewall-cmd --zone=nm-shared --add-port=8080/tcp`).

### Wenn das Schul-WLAN die Geräte voneinander isoliert

Viele Schul- und Gäste-WLANs lassen Geräte nicht miteinander sprechen („Client-Isolation“). Erkennbar daran, dass
die Schülergeräte die Adresse nicht öffnen können, obwohl die Firewall offen ist. Auswege:

- **Hotspot vom Laptop:** GNOME-Einstellungen → WLAN → Menü ⋮ → „WLAN-Hotspot einschalten …“ oder im Terminal
  `nmcli device wifi hotspot ssid Physik password 'geheim123'`. Die Laptop-Adresse ist dann meist `10.42.0.1`;
  der Server zeigt sie beim Start bzw. auf der Lehrerseite an (Server erst **nach** dem Einschalten des Hotspots
  starten oder Lehrerseite neu laden). Der Laptop ist dabei meist nicht mehr im Internet → vorher
  `npm run offline` ausführen. Firewall-Zone siehe oben (`nm-shared`).
- **Hotspot vom Handy:** Laptop und Schülergeräte ins Handy-WLAN – dann haben alle auch Internet.
- **Schul-IT fragen** nach einem Netz ohne Client-Isolation (z. B. ein Lehrer- oder Präsentations-WLAN).

### Kurzer Testablauf (Laptop + iPad)

1. Laptop: `npm start`, dann `http://localhost:8080/lehrer` öffnen, PIN eingeben.
2. iPad im selben WLAN: QR-Code aus der Leiste scannen (Safari).
3. iPad: „Erklärung: Elektron im Leiter“ → Tafel antippen → mit dem Pencil einen Pfeil zeichnen; die Handfläche
   darf dabei aufliegen. Strichbreite folgt dem Druck, die Seite scrollt nicht.
4. Name eintragen, „Teilen“ → „Geteilt ✓“. Auf dem Laptop erscheint die Abgabe sofort in der Leiste.
5. Laptop: Abgabe anklicken, etwas ergänzen und radieren → Titel „(bearbeitet)“. Auf dem iPad ändert sich nichts.
   „Original wiederherstellen“ zeigt wieder genau die Schülerzeichnung.
6. iPad: weiterzeichnen, erneut „Teilen“ → auf dem Laptop bleibt es eine Kachel, mit neuem Inhalt.

### Datenschutz und Schutzmaßnahmen

- Abgaben liegen **nur im Arbeitsspeicher** des Servers; nichts wird auf die Festplatte geschrieben, es gibt keine
  Accounts und keine externen Dienste. Beim Beenden des Servers ist alles weg. (Die eigene Zeichnung und der Name
  bleiben nur im Browser des jeweiligen Geräts gespeichert.)
- Lehrerseite, Abgabenliste und Löschen nur nach PIN (zufällig beim Start oder per `PIN=…`); nach der Anmeldung
  merkt sich der Browser das per Cookie, bis der Server neu startet. Höchstens 5 PIN-Versuche pro Minute und Gerät.
- Pro Abgabe höchstens 1,5 MB, 1500 Striche und 60 000 Punkte; höchstens 6 Abgaben pro Minute je Gerät und je
  IP-Adresse; höchstens 150 Abgaben pro Raum und 20 Räume.
- Der Server liefert nur die Dateien der Simulation aus (nicht `server/`, `tests/` oder versteckte Dateien).

### Technik

- `server/server.js`: statische Dateien, Anmeldung (`POST /api/login`), Erkennung (`GET /api/status`) und ein
  WebSocket unter `/ws` für alles Weitere. `server/websocket.js` ist ein minimaler WebSocket-Server nur mit
  Node-Bordmitteln (RFC 6455, Textnachrichten). Die Nachrichten sind oben in `server.js` beschrieben.
- Zeichnungen werden als **Vektordaten** übertragen (`js/striche.js`): Freihandstriche als Punkte mit Stiftdruck,
  Pfeile als Anfangs- und Endpunkt, jeweils mit Farbe. Koordinaten beziehen sich auf das Tafelbild (1600 × 1000).
  Dieselbe Datei prüft die Abgaben auf dem Server.
- Der **Zustand der Simulation** liegt zentral in `js/state.js`: Einstellungen, bewegte Teile (Schaukel, Zeiger,
  Magnet, Elektronen), Drehung des Messgeräts, Kameraansicht und Tafel (Werkzeug, Zeichnungen). Die Darstellung
  wird in jedem Bild daraus gezeichnet; `zustandAlsDaten()` liefert eine JSON-fähige Kopie. Das ist die Grundlage
  für einen späteren Live-Modus (Simulation eines Schülers auf den Beamer spiegeln): Der Schüler schickt diese
  Daten regelmäßig über seinen WebSocket, der Server reicht sie an die Lehrerseite weiter.
- Das Tafelbild `bilder/tafel.jpg` ist ein Screenshot des Erklärmodus (Startansicht, drehbarer kurzer Magnet,
  Nordpol oben). Es lässt sich durch ein anderes Bild im Seitenverhältnis 16 : 10 ersetzen – dann passen aber
  bereits geteilte Zeichnungen nicht mehr dazu.

## Starten

Die Simulation lädt [three.js](https://threejs.org) aus dem Internet und muss über einen Webserver
geöffnet werden (ein Doppelklick auf `index.html` reicht nicht):

- **Mit Abgabe-Funktion:** `npm start` (siehe oben)
- **VS Code:** Erweiterung „Live Server“, Rechtsklick auf `index.html` → „Open with Live Server“
- **Terminal:** im Projektordner `python3 -m http.server` ausführen und <http://localhost:8000> öffnen

## Projektstruktur

```text
leiterschaukel-induktion/
├── index.html          # Seitengerüst und Bedienfeld
├── css/style.css
├── bilder/tafel.jpg    # Bild auf der Tafel (Leiter im Magnetfeld)
├── server/
│   ├── server.js       # Abgabe-Server: liefert die Simulation aus, Abgaben per WebSocket (npm start)
│   ├── websocket.js    # minimaler WebSocket-Server ohne Abhängigkeiten
│   └── offline.js      # lädt three.js & Co. für den Betrieb ohne Internet (npm run offline)
├── js/
│   ├── main.js         # Start und Render-Schleife
│   ├── config.js       # Maße und Modellgrößen
│   ├── state.js        # zentraler Zustand (Einstellungen, bewegte Teile, Ansicht, Tafel)
│   ├── tafel.js        # Tafel in der Szene und großes Zeichenfenster (Pencil, Druck, Handballen)
│   ├── striche.js      # Striche: Datenformat, Prüfung, Zeichnen (auch vom Server genutzt)
│   ├── abgabe.js       # Teilen (Schüler) und Lehrerseite (Abgaben live, PIN, QR-Code)
│   ├── physik.js       # Schaukel, Induktionsspannung, Strom, Bremskraft, Zeiger (ohne 3D, testbar)
│   ├── szene.js        # Renderer, Kamera, Licht, Tisch
│   ├── aufbau.js       # Stativ, Leiterschaukel, Hufeisenmagnet mit Drehgelenk
│   ├── messgeraet.js   # Zeigermessgerät und Kabel
│   ├── led.js          # LED statt Messgerät (Gedankenexperiment)
│   ├── gluehlampe.js   # Glühlampe statt Messgerät (Gedankenexperiment)
│   ├── erklaerung.js   # Erklärmodus: Elektron, Pfeile v/B/F_L, Hand zur Drei-Finger-Regel
│   ├── link.js         # „Link zeigen“: QR-Code und Adresse
│   ├── ziehen.js       # Schaukel bzw. Magnet (auf dem Tisch) mit Maus/Finger ziehen
│   ├── bedienfeld.js   # Knöpfe, Regler, Anzeigen
│   ├── hilfen.js       # Hilfsfunktionen
│   └── materialien.js  # gemeinsame Materialien
├── tests/physik.test.mjs
└── package.json
```

## Physikalisches Modell

- Induktionsspannung U = l · (v × B) · x̂ mit der Länge l = 6 cm des Stabs im Feld (Breite der Pole),
  B = 0,1 T zwischen den Polen, Randfeld fällt außerhalb der Pole über 2,5 cm linear ab.
  Positive Anzeige: rechtes Stabende (rote Buchse) ist der Pluspol.
- Schaukel als Pendel (Länge 22 cm, Masse 80 g) mit leichter Luft-/Lagerdämpfung. Typisch:
  v ≈ 0,3 m/s → U ≈ 2 mV.
- Strommessung: Widerstand des Kreises 1 Ω, also I in mA = U in mV. Kraft auf den Stab
  F = I · l × B, immer gegen die Bewegung (Lenz). Real ist die Bremsung etwa 1000-mal schwächer als die
  Luftdämpfung, deshalb die verstärkbare Bremskraft als Gedankenexperiment.
- Zeiger: gedämpfter Schwinger (Eigenfrequenz 1,2 Hz, Dämpfungsgrad 0,55), Anschlag bei 108 %.
- Magnet auf dem Tisch: In U geht die Geschwindigkeit des Stabs relativ zum Magneten ein
  (`relativeVelocity`).
- Erklärmodus: Lorentzkraft pro Ladung auf das Elektron F/e = −(v × B) (`electronForce`); das Elektron
  wandert mit 330 cm/s pro V/m entlang des Stabs (stark übertrieben, real driften Elektronen sehr langsam).
- Für die mikroskopische Ansicht liefert `physik.js` Geschwindigkeit des Stabs (`barVelocity`),
  Feld am Stab (`fieldAtBar`) und Spannung (`emf`); der Stab hat in `aufbau.js` eine eigene Gruppe
  (`swingGroup`/`bar`), an die sich Elektronen anhängen lassen.

## Tests

```bash
npm test
```
