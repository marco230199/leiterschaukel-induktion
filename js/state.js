// ------------------------------------------------------------------
// Zustand des Versuchs (wird vom Bedienfeld geändert und von Physik und Darstellung gelesen)
// ------------------------------------------------------------------
export const state = {
  setup: 'drehbar',   // 'drehbar' (Magnet im Drehgelenk) oder 'tisch' (Magnet liegt auf dem Tisch, verschiebbar)
  longMagnet: false,  // langer Hufeisenmagnet (Schenkel 32 statt 11 cm)
  northUp: true,      // Nordpol am oberen Schenkel (in Grundstellung α = 0°)
  angle: 0,           // eingestellter Drehwinkel α des Magneten in Grad (0° … 90°)
  magnetAngle: 0,     // aktueller Drehwinkel (läuft dem eingestellten Winkel hinterher)
  cablesSwapped: false, // Kabel am Messgerät bzw. an der LED vertauscht (rot an −, schwarz an +)
  display: 'meter',   // Anzeige am Ende der Kabel: 'meter' (Zeigermessgerät) oder 'led' (Gedankenexperiment)
  meterMode: 'U',     // 'U': Spannung messen (hochohmig, kein Strom) · 'I': Strom messen (Kreis geschlossen)
  range: 3,           // Messbereich ±3 mV bzw. ±3 mA
  brakeBoost: false,  // Gedankenexperiment: Bremskraft bei Strommessung stark verstärkt
  slowMotion: false,
  showValue: false,   // Messwert zusätzlich als Zahl
  explain: false,     // Erklärmodus: nur Magnet und Schaukel, Elektron im Leiter mit Pfeilen und Hand
  showExplainHand: false,
  showElectron: true, // Erklärmodus: beobachtetes Elektron zeigen (bei „Viele Elektronen“: hervorheben)
  manyElectrons: false, // Erklärmodus: viele Elektronen und positive Atomrümpfe statt eines Elektrons
  showV: false,       // Erklärmodus: Pfeil v, Feldlinien B, Pfeil F_L ein-/ausblenden (zu Beginn aus)
  showB: false,
  showF: false,
  hold: false,        // Erklärmodus: Leiter festgehalten (pendelt nicht), Lage per Schieberegler oder Ziehen
  paused: false,      // Erklärmodus: Bewegung angehalten (Pfeile zeigen den Augenblick)
};
