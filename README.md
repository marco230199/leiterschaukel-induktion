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

Der Knopf „Link zeigen“ (unten links) öffnet ein großes Fenster mit QR-Code und Adresse der Simulation zum
Abscannen vom Beamer. Der Code wird im Browser aus der eigenen Adresse erzeugt; bei lokal geöffneter Seite
(localhost) zeigt er die öffentliche Adresse <https://marco230199.github.io/leiterschaukel-induktion/>
(`PUBLIC_URL` in `js/config.js`). Die QR-Code-Bibliothek
[qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT) wird beim ersten Öffnen aus dem
Internet geladen.

## Starten

Die Simulation lädt [three.js](https://threejs.org) aus dem Internet und muss über einen Webserver
geöffnet werden (ein Doppelklick auf `index.html` reicht nicht):

- **VS Code:** Erweiterung „Live Server“, Rechtsklick auf `index.html` → „Open with Live Server“
- **Terminal:** im Projektordner `python3 -m http.server` ausführen und <http://localhost:8000> öffnen

## Projektstruktur

```text
leiterschaukel-induktion/
├── index.html          # Seitengerüst und Bedienfeld
├── css/style.css
├── js/
│   ├── main.js         # Start und Render-Schleife
│   ├── config.js       # Maße und Modellgrößen
│   ├── state.js        # Zustand (Magnet, Messgerät, …)
│   ├── physik.js       # Schaukel, Induktionsspannung, Strom, Bremskraft, Zeiger (ohne 3D, testbar)
│   ├── szene.js        # Renderer, Kamera, Licht, Tisch
│   ├── aufbau.js       # Stativ, Leiterschaukel, Hufeisenmagnet mit Drehgelenk
│   ├── messgeraet.js   # Zeigermessgerät und Kabel
│   ├── led.js          # LED statt Messgerät (Gedankenexperiment)
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
