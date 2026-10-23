// ------------------------------------------------------------------
// Zustand des Versuchs (wird vom Bedienfeld geändert und von Physik und Darstellung gelesen)
// ------------------------------------------------------------------
export const state = {
  setup: 'drehbar',   // 'drehbar' (Magnet im Drehgelenk) oder 'tisch' (Magnet liegt auf dem Tisch, verschiebbar)
  northUp: true,      // Nordpol am oberen Schenkel (in Grundstellung α = 0°)
  angle: 0,           // eingestellter Drehwinkel α des Magneten in Grad (0° … 90°)
  magnetAngle: 0,     // aktueller Drehwinkel (läuft dem eingestellten Winkel hinterher)
  meterMode: 'U',     // 'U': Spannung messen (hochohmig, kein Strom) · 'I': Strom messen (Kreis geschlossen)
  range: 3,           // Messbereich ±3 mV bzw. ±3 mA
  brakeBoost: false,  // Gedankenexperiment: Bremskraft bei Strommessung stark verstärkt
  slowMotion: false,
  showValue: false,   // Messwert zusätzlich als Zahl
};
