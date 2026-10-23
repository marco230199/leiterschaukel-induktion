// ------------------------------------------------------------------
// Maße und Modellgrößen des Versuchs
// Maße in cm (1 Einheit ≙ 1 cm), physikalische Größen in SI-Einheiten.
// Koordinaten: x = nach rechts (entlang des Leiterstabs), y = nach oben, z = nach vorne (zum Betrachter).
// Ursprung der Versuchsgeometrie: Lage der Stabmitte, wenn die Schaukel ruhig hängt (AXIS).
// ------------------------------------------------------------------

// Ruhelage der Stabmitte (zugleich Drehachse des Magneten)
export const AXIS_Y = 18;

// Leiterschaukel: Kupferstab an zwei starren Messingbügeln, die an einer Querstange hängen
export const SWING = {
  LENGTH: 22,                 // Pendellänge: Querstange bis Stabachse
  BAR_LEN: 15,                // Länge des Kupferstabs
  BAR_R: 0.4,
  HANGER_X: 7,                // Bügel bei x = ±7 (außerhalb der Polschuhe)
  HANGER_R: 0.18,
  MAX_ANGLE: 50,              // größte Auslenkung beim Ziehen in Grad
};
export const PIVOT_Y = AXIS_Y + SWING.LENGTH;   // Höhe der Querstange

// Stativ: zwei Stangen links und rechts, verbunden durch die Querstange
export const STAND = { X: 19, R: 0.6, TOP: PIVOT_Y + 5 };

// Großer Hufeisenmagnet. Maße im Koordinatensystem des Magneten (Grundstellung α = 0°):
// Er liegt auf der Seite, Schenkel entlang z, ein Pol über und einer unter dem Stab, der Bogen hinten.
// Beim Drehen um die Stabachse (x) wandert der Bogen nach unten; bei α = 90° stehen die Schenkel
// hinter und vor dem Stab, das Feld zeigt dann in Schwingrichtung.
export const MAGNET = {
  GAP: 10,                    // Abstand der Polflächen
  THICK: 3,                   // Dicke der Schenkel
  WIDTH: 6,                   // Breite der Pole (entlang des Stabs) = Länge des Stabs im Feld
  Z_IN: -6,                   // Schenkel beginnen am Bogen ...
  Z_OPEN: 5,                  // ... und enden vorne offen
  FRINGE: 2.5,                // Randfeld: Abfall auf 0 über 2,5 cm außerhalb des Polbereichs
  HOLDER_X: 11,               // Drehgelenk mit Winkelskala rechts neben dem Magneten
};

// Physikalische Modellgrößen (SI)
export const B_FIELD = 0.1;                    // Flussdichte zwischen den Polen in T
export const L_FIELD = MAGNET.WIDTH / 100;     // Länge des Stabs im Feld in m
export const G = 9.81;
export const PENDULUM_L = SWING.LENGTH / 100;  // in m
export const SWING_MASS = 0.08;                // Kupferstab (≈ 60 g) und Bügel, in kg
export const AIR_DAMPING = 0.1;                // Dämpfung durch Luft und Lager in 1/s
export const CIRCUIT_R = 1;                    // Widerstand des Stromkreises bei Strommessung in Ω
export const BRAKE_BOOST = 1000;               // Gedankenexperiment: Bremskraft 1000-fach verstärkt
export const MAGNET_TURN_SPEED = 45;           // Drehgeschwindigkeit des Magneten in °/s
export const DRAG_TIME = 0.05;                 // Ziehen: Schaukel folgt dem Finger mit dieser Zeitkonstante (s)
export const DRAG_MAX_OMEGA = 7;               // ... höchstens mit dieser Winkelgeschwindigkeit (rad/s)
export const PUSH_ANGLE = 15;                  // „Auslenken und loslassen“: Startwinkel in Grad (nach vorne)

// Zeigermessgerät: Zeiger als gedämpfter Schwinger (Eigenfrequenz, Dämpfungsgrad)
export const METER = {
  FREQ: 1.2,                  // in Hz
  DAMPING: 0.55,              // leicht unterkritisch: Zeiger schwingt etwas nach
  FULL_ANGLE: 50,             // Vollausschlag nach jeder Seite in Grad
  STOP: 1.08,                 // Anschlag knapp hinter dem Skalenende (Anteil des Vollausschlags)
  RANGES: [1, 3, 10],         // Messbereiche: ±1, ±3, ±10 mV bzw. mA
};
