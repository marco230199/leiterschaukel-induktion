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
- **Strommessung und Lenz'sche Regel:** Bei Strommessung ist der Kreis geschlossen, der Induktionsstrom
  bremst die Schaukel. Bei einem echten Aufbau ist das kaum zu merken; per Gedankenexperiment lässt sich
  die Bremskraft 1000-fach verstärken.

## Erklärung: Elektron im Leiter

Der Knopf „Erklärung: Elektron im Leiter“ blendet alles Störende aus (Stative, Querstange, Halter, Messgerät,
Kabel, Tisch). Es bleiben der Magnet mit Feldlinien im Spalt und die Schaukel. Der Stab ist dicker und
durchsichtig; in seiner Mitte sitzt ein (stark vergrößertes) Elektron. Die Zeitlupe ist eingeschaltet, die
Kamera schaut schräg von vorne auf den Stab. Schaukel (und auf dem Tisch der Magnet) lassen sich weiter ziehen.
Links erscheint ein eigenes Bedienfeld für den Erklärmodus:

- **Pause / Weiter:** friert die Bewegung ein (Schaukel, Magnet, Elektron). Die Pfeile zeigen den Augenblick,
  so bleibt z. B. der Geschwindigkeitspfeil v sichtbar, obwohl nichts mehr läuft.
- **Zeitlupe:** wie im Bedienfeld rechts (beide Schalter sind gekoppelt).
- **Leiter festhalten:** Der Leiter pendelt nicht mehr, er bleibt, wo er ist. Mit dem Regler „Lage des
  Leiters“ (Winkel in Grad, vorne +, hinten −) oder durch Ziehen gibt man das Ziel vor; der Leiter fährt
  immer gleichmäßig mit der am Regler „Geschwindigkeit“ eingestellten Winkelgeschwindigkeit dorthin
  (5–60 °/s, Anzeige auch in m/s) – unabhängig davon, wie schnell man schiebt oder zieht – und bleibt dort
  stehen. „Auslenken und loslassen“ beendet das Festhalten.
- **v, B, F_L, Hand:** Pfeile und Hand einzeln ein- und ausblenden.
- **Elektron in die Mitte**

- Pfeile am Elektron: Geschwindigkeit v des Leiters (grün), Magnetfeld B (blau), Lorentzkraft F_L auf das
  Elektron (rot); die Längen wachsen mit v, B und v·B.
- Das Elektron wandert stark verlangsamt entlang des Stabs, solange die Lorentzkraft wirkt, und bleibt
  am Stabende stehen. Schwingt die Schaukel zurück, wandert es zurück. „Auslenken und loslassen“ und
  „Elektron in die Mitte“ setzen es wieder in die Mitte.
- Rechte Hand zur Drei-Finger-Regel (abschaltbar): Daumen v (Bewegung der positiven Ladungen mit dem Leiter),
  Zeigefinger B, Mittelfinger Kraft auf eine positive Ladung. Sie dreht sich mit der Bewegungsrichtung.
  Die Kraft auf das Elektron zeigt entgegengesetzt zum Mittelfinger.
- Beim Magneten auf dem Tisch zählt die Bewegung des Leiters relativ zum Magneten (Schulmodell).

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
│   ├── erklaerung.js   # Erklärmodus: Elektron, Pfeile v/B/F_L, Hand zur Drei-Finger-Regel
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
