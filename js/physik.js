// ------------------------------------------------------------------
// Physik: Bewegung der Leiterschaukel, Induktionsspannung, Strom mit Bremskraft (Lenz) und Zeiger
// Ohne Darstellung und ohne Browser – lässt sich mit Node testen (tests/physik.test.mjs).
//
// Die Funktionen barVelocity(), fieldAtBar() und emf() liefern alle Größen am Stab, die eine spätere
// mikroskopische Ansicht (Elektronen im Stab, Lorentzkraft auf die Elektronen) braucht.
// ------------------------------------------------------------------
import {
  SWING, MAGNET, B_FIELD, L_FIELD, G, PENDULUM_L, SWING_MASS, AIR_DAMPING, CIRCUIT_R, BRAKE_BOOST,
  MAGNET_TURN_SPEED, DRAG_TIME, DRAG_MAX_OMEGA, PUSH_ANGLE, METER,
} from './config.js';
import { state } from './state.js';

const degToRad = deg => deg * Math.PI / 180;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Schaukel: Auslenkwinkel θ gegen die Senkrechte (positiv = Stab nach vorne), Winkelgeschwindigkeit ω
export const swing = { theta: 0, omega: 0, dragging: false, target: 0 };
// Zeiger des Messgeräts: Ausschlag als Anteil des Vollausschlags (−1 … 1), Geschwindigkeit
export const needle = { pos: 0, vel: 0 };

// ---------------- Geometrie

// Lage der Stabmitte relativ zur Ruhelage in cm
export function barOffset(theta = swing.theta) {
  return { y: SWING.LENGTH * (1 - Math.cos(theta)), z: SWING.LENGTH * Math.sin(theta) };
}

// Punkt (y, z) relativ zur Drehachse → Koordinaten des Magneten: u entlang der Schenkel, w quer zum Spalt
// (der Magnet ist um −α um die x-Achse gedreht, also hier um +α zurückdrehen)
export function toMagnetFrame({ y, z }, alphaDeg = state.magnetAngle) {
  const a = degToRad(alphaDeg);
  return { u: y * Math.sin(a) + z * Math.cos(a), w: y * Math.cos(a) - z * Math.sin(a) };
}

// Berührt der Stab (Querschnitt: Kreis) den Magneten? Schenkel als Rechtecke, Bogen als halber Kreisring.
export function collides(theta, alphaDeg) {
  const { u, w } = toMagnetFrame(barOffset(theta), alphaDeg);
  const r = SWING.BAR_R, inner = MAGNET.GAP / 2, outer = inner + MAGNET.THICK;
  for (const sign of [1, -1]) {
    const du = Math.max(MAGNET.Z_IN - u, u - MAGNET.Z_OPEN, 0);
    const dw = Math.max(inner - sign * w, sign * w - outer, 0);
    if (du * du + dw * dw < r * r) return true;
  }
  if (u <= MAGNET.Z_IN) {
    const d = Math.hypot(u - MAGNET.Z_IN, w);
    if (d + r > inner && d - r < outer) return true;
  }
  return false;
}

// Bewegungsbereich der Schaukel [θmin, θmax] bei Magnetwinkel α (abgetastet, zwischengespeichert)
const limitCache = new Map();
export function swingLimits(alphaDeg = state.magnetAngle) {
  const key = Math.round(alphaDeg * 10);
  if (!limitCache.has(key)) {
    const step = degToRad(0.1), max = degToRad(SWING.MAX_ANGLE);
    const scan = sign => {
      let theta = 0;
      while (Math.abs(theta) < max && !collides(theta + sign * step, key / 10)) theta += sign * step;
      return theta;
    };
    limitCache.set(key, [scan(-1), scan(1)]);
  }
  return limitCache.get(key);
}

// ---------------- Feld, Geschwindigkeit, Spannung, Strom

// Anteil des Feldes am Ort des Stabs (1 im Polbereich und vor dem Bogen, Randfeld fällt linear ab)
export function fieldFactor(theta = swing.theta, alphaDeg = state.magnetAngle) {
  const { u, w } = toMagnetFrame(barOffset(theta), alphaDeg);
  const du = Math.max(MAGNET.Z_IN - MAGNET.GAP / 2 - u, u - MAGNET.Z_OPEN, 0);
  const dw = Math.max(Math.abs(w) - MAGNET.GAP / 2, 0);
  return Math.max(0, 1 - Math.hypot(du, dw) / MAGNET.FRINGE);
}

// Flussdichte am Stab in T (Vektor). Feld vom Nord- zum Südpol: bei Nordpol oben und α = 0° nach unten,
// beim Drehen kippt es in der y-z-Ebene: B = B · (0, −cos α, sin α).
export function fieldAtBar() {
  const a = degToRad(state.magnetAngle);
  const b = (state.northUp ? 1 : -1) * B_FIELD * fieldFactor();
  return { x: 0, y: -b * Math.cos(a), z: b * Math.sin(a) };
}

// Geschwindigkeit des Stabs in m/s (Vektor, tangential zur Kreisbahn)
export function barVelocity() {
  const v = PENDULUM_L * swing.omega;
  return { x: 0, y: v * Math.sin(swing.theta), z: v * Math.cos(swing.theta) };
}

// Induktionsspannung in V: U = l · (v × B) · x̂, positiv = rechtes Stabende (+x) ist Pluspol
export function emf() {
  const v = barVelocity(), B = fieldAtBar();
  return L_FIELD * (v.y * B.z - v.z * B.y);
}

// Stromstärke in A (in x-Richtung durch den Stab); bei Spannungsmessung fließt praktisch kein Strom
export const inducedCurrent = () => (state.meterMode === 'I' ? emf() / CIRCUIT_R : 0);

// Anzeige des Messgeräts in mV bzw. mA
export const meterReading = () => 1000 * (state.meterMode === 'I' ? inducedCurrent() : emf());

// Kraft auf den stromdurchflossenen Stab, Anteil entlang der Bahn in N: F = I · l · (x̂ × B)
// (immer gegen die Bewegung gerichtet – Lenz'sche Regel)
export function brakeForce() {
  const B = fieldAtBar();
  const f = inducedCurrent() * L_FIELD * (state.brakeBoost ? BRAKE_BOOST : 1);
  const fy = -f * B.z, fz = f * B.y;
  return fy * Math.sin(swing.theta) + fz * Math.cos(swing.theta);
}

// ---------------- Zeitschritt

function stepSwing(dt) {
  if (swing.dragging) {
    swing.omega = clamp((swing.target - swing.theta) / DRAG_TIME, -DRAG_MAX_OMEGA, DRAG_MAX_OMEGA);
  } else {
    const acc = -G / PENDULUM_L * Math.sin(swing.theta) - AIR_DAMPING * swing.omega
      + brakeForce() / (SWING_MASS * PENDULUM_L);
    swing.omega += acc * dt;
  }
  swing.theta += swing.omega * dt;
  // Anschlag am Magneten (bzw. größte Auslenkung): kaum Rückprall
  const [lo, hi] = swingLimits();
  if (swing.theta < lo || swing.theta > hi) {
    swing.theta = clamp(swing.theta, lo, hi);
    swing.omega = swing.dragging ? 0 : -0.2 * swing.omega;
  }
}

// Zeiger: gedämpfter Schwinger, der dem Messwert folgt; Anschläge knapp hinter dem Skalenende
function stepNeedle(dt) {
  const w0 = 2 * Math.PI * METER.FREQ;
  const target = clamp(meterReading() / state.range, -METER.STOP, METER.STOP);
  needle.vel += (w0 * w0 * (target - needle.pos) - 2 * METER.DAMPING * w0 * needle.vel) * dt;
  needle.pos += needle.vel * dt;
  if (Math.abs(needle.pos) > METER.STOP) {
    needle.pos = Math.sign(needle.pos) * METER.STOP;
    needle.vel = -0.3 * needle.vel;
  }
}

// Magnet dreht sich gleichmäßig zum eingestellten Winkel und schiebt die Schaukel ggf. vor sich her
function turnMagnet(dt) {
  const diff = state.angle - state.magnetAngle;
  if (diff === 0) return;
  state.magnetAngle += Math.sign(diff) * Math.min(Math.abs(diff), MAGNET_TURN_SPEED * dt);
  const [lo, hi] = swingLimits();
  if (swing.theta < lo || swing.theta > hi) {
    swing.theta = clamp(swing.theta, lo, hi);
    swing.omega = 0;
  }
}

// Ein Zeitschritt der gesamten Physik (dt in s)
export function stepPhysics(dt) {
  const SUBSTEPS = 8;
  const h = dt / SUBSTEPS;
  for (let i = 0; i < SUBSTEPS; i++) {
    turnMagnet(h);
    stepSwing(h);
    stepNeedle(h);
  }
}

// ---------------- Bedienung

export function startDrag(theta) {
  swing.dragging = true;
  dragTo(theta);
}
export function dragTo(theta) {
  const max = degToRad(SWING.MAX_ANGLE);
  swing.target = clamp(theta, -max, max);
}
export function endDrag() {
  swing.dragging = false;
}

// Schaukel nach vorne auslenken und ruhig loslassen
export function pushSwing() {
  swing.dragging = false;
  swing.theta = Math.min(degToRad(PUSH_ANGLE), swingLimits()[1]);
  swing.omega = 0;
}

export function stopSwing() {
  Object.assign(swing, { theta: 0, omega: 0, dragging: false, target: 0 });
}

export function resetPhysics() {
  stopSwing();
  Object.assign(needle, { pos: 0, vel: 0 });
}
