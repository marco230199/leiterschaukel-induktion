// Tests der Physik (ohne Browser): npm test  bzw.  node --test tests/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { state } from '../js/state.js';
import { SWING } from '../js/config.js';
import {
  swing, needle, emf, meterReading, swingLimits, collides, stepPhysics, resetPhysics, pushSwing, startDrag, dragTo, endDrag,
} from '../js/physik.js';

const rad = deg => deg * Math.PI / 180;

// Versuch einstellen, Schaukel aus der Auslenkung loslassen und laufen lassen; gibt Extremwerte der Spannung zurück
function run(settings = {}, { seconds = 3, start = 10 } = {}) {
  Object.assign(state, { northUp: true, angle: 0, meterMode: 'U', range: 3, brakeBoost: false }, settings);
  state.magnetAngle = state.angle;
  resetPhysics();
  swing.theta = Math.min(rad(start), swingLimits()[1]);
  let max = -Infinity, min = Infinity, firstSign = 0, maxTheta = 0;
  for (let i = 0; i < seconds * 600; i++) {
    stepPhysics(1 / 600);
    const u = emf();
    max = Math.max(max, u);
    min = Math.min(min, u);
    if (!firstSign && Math.abs(u) > 1e-4) firstSign = Math.sign(u);
    if (i > seconds * 300) maxTheta = Math.max(maxTheta, Math.abs(swing.theta));
  }
  return { max, min, firstSign, maxTheta };
}

test('ruhende Schaukel: keine Spannung', () => {
  const r = run({}, { start: 0 });
  assert.equal(r.max, 0);
  assert.equal(r.min, 0);
});

test('schwingende Schaukel: Wechselspannung in der Größenordnung U = B·l·v', () => {
  const r = run();
  // v_max = sqrt(2 g L (1 − cos 10°)) ≈ 0,26 m/s → U ≈ 0,1 T · 0,06 m · 0,26 m/s ≈ 1,5 mV
  assert.ok(r.max > 1.2e-3 && r.max < 1.8e-3, `U_max = ${r.max}`);
  assert.ok(r.min < -1.2e-3, 'Spannung wechselt das Vorzeichen');
});

test('Magnet umdrehen kehrt die Spannung um', () => {
  assert.equal(run().firstSign, -run({ northUp: false }).firstSign);
});

test('Feld parallel zur Bewegung (α = 90°): praktisch keine Spannung', () => {
  const normal = run({}, { start: 8 }), parallel = run({ angle: 90 }, { start: 8 });
  assert.ok(parallel.max < 0.1 * normal.max, `${parallel.max} vs. ${normal.max}`);
  const half = run({ angle: 60 }, { start: 8 });
  assert.ok(Math.abs(half.max / normal.max - 0.5) < 0.08, 'U ∼ cos α');
});

test('Schaukel dringt nie in den Magneten ein', () => {
  for (const angle of [0, 30, 60, 90]) {
    Object.assign(state, { angle, magnetAngle: angle });
    const [lo, hi] = swingLimits();
    assert.ok(lo < 0 && hi > 0);
    assert.ok(!collides(lo, angle) && !collides(hi, angle));
    resetPhysics();
    startDrag(rad(SWING.MAX_ANGLE));
    for (let i = 0; i < 300; i++) stepPhysics(1 / 60);
    assert.ok(swing.theta <= hi + 1e-9);
    dragTo(-rad(SWING.MAX_ANGLE));
    for (let i = 0; i < 300; i++) stepPhysics(1 / 60);
    assert.ok(swing.theta >= lo - 1e-9);
    endDrag();
  }
  // α = 90°: die Schenkel stehen vor und hinter dem Stab und begrenzen die Auslenkung
  assert.ok(swingLimits(90)[1] < rad(15));
});

test('Strommessung ohne Verstärkung: Bremsung kaum merklich, mit Verstärkung deutlich (Lenz)', () => {
  const voltage = run({}, { seconds: 6 }).maxTheta;
  const current = run({ meterMode: 'I' }, { seconds: 6 }).maxTheta;
  const boosted = run({ meterMode: 'I', brakeBoost: true }, { seconds: 6 }).maxTheta;
  assert.ok(Math.abs(current - voltage) < 0.01 * voltage);
  assert.ok(boosted < 0.5 * voltage, `${boosted} vs. ${voltage}`);
});

test('Zeiger folgt dem Messwert und bleibt am Anschlag', () => {
  Object.assign(state, { angle: 0, magnetAngle: 0, meterMode: 'U', range: 1 });
  resetPhysics();
  // Schaukel mit der Hand hin und her führen (1 Hz, ±12°): U_max ≈ 1,7 mV, also über dem Messbereich ±1 mV
  startDrag(0);
  let maxPos = 0;
  for (let i = 0; i < 180; i++) {
    dragTo(rad(12) * Math.sin(2 * Math.PI * i / 60));
    stepPhysics(1 / 60);
    maxPos = Math.max(maxPos, Math.abs(needle.pos));
  }
  assert.ok(maxPos > 1 && maxPos <= 1.08 + 1e-9, `Anschlag ${maxPos}`);
  endDrag();
  resetPhysics();
  assert.equal(meterReading(), 0);
  pushSwing();
  assert.ok(swing.theta > 0);
});

// ---------------- Magnet auf dem Tisch

import { magnetMotion, startMagnetDrag, dragMagnetTo, endMagnetDrag, stopSwing } from '../js/physik.js';

function tisch() {
  Object.assign(state, { setup: 'tisch', northUp: true, angle: 0, magnetAngle: 0, meterMode: 'U', range: 3, brakeBoost: false });
  resetPhysics();
}

test('Tisch: Magnet bewegen statt Schaukel – gleiche Relativbewegung, gleiche Spannung', () => {
  // Schaukel ruht, Magnet wird nach hinten gezogen (Stab bewegt sich relativ nach vorne)
  tisch();
  startMagnetDrag(0);
  let magnetU = 0;
  for (let i = 0; i < 30; i++) { dragMagnetTo(-0.5 * (i + 1)); stepPhysics(1 / 60); magnetU = Math.max(magnetU, emf()); }
  endMagnetDrag();
  assert.equal(swing.theta, 0, 'Schaukel bleibt in Ruhe');
  // Schaukel wird nach vorne gezogen, Magnet ruht
  tisch();
  startDrag(0);
  let swingU = 0;
  for (let i = 0; i < 30; i++) { dragTo(Math.asin(0.5 * (i + 1) / SWING.LENGTH)); stepPhysics(1 / 60); swingU = Math.max(swingU, emf()); }
  endDrag();
  assert.ok(magnetU > 0 && swingU > 0, 'gleiches Vorzeichen');
  assert.ok(Math.abs(magnetU / swingU - 1) < 0.15, `${magnetU} vs. ${swingU}`);
});

test('Tisch: Magnet nach vorne schieben – der Bogen schiebt die Schaukel mit, ohne einzudringen', () => {
  tisch();
  startMagnetDrag(0);
  for (let i = 0; i < 120; i++) {
    dragMagnetTo(0.25 * (i + 1));
    stepPhysics(1 / 60);
    assert.ok(!collides(swing.theta, 0, magnetMotion.z), `Schritt ${i}`);
  }
  endMagnetDrag();
  assert.ok(swing.theta > rad(10), 'Schaukel wurde nach vorne gedrückt');
  for (let i = 0; i < 120; i++) {
    stepPhysics(1 / 60);
    assert.ok(!collides(swing.theta, 0, magnetMotion.z));
  }
  stopSwing();
  assert.ok(!collides(swing.theta, 0, magnetMotion.z), 'Anhalten: Schaukel lehnt am Magneten');
  state.setup = 'drehbar';
});

test('Anhalten: Zeiger springt sofort auf 0', () => {
  Object.assign(state, { setup: 'drehbar', angle: 0, magnetAngle: 0, meterMode: 'U', range: 3 });
  resetPhysics();
  pushSwing();
  for (let i = 0; i < 20; i++) stepPhysics(1 / 60);
  assert.ok(Math.abs(needle.pos) > 0.05);
  stopSwing();
  assert.equal(needle.pos, 0);
  stepPhysics(1 / 60);
  assert.equal(needle.pos, 0);
});

test('langer Magnet: Schaukel schwingt weit aus, ohne anzustoßen', () => {
  for (const setup of ['drehbar', 'tisch']) {
    Object.assign(state, { setup, longMagnet: true, angle: 0, magnetAngle: 0, meterMode: 'U', range: 3, brakeBoost: false });
    resetPhysics();
    swing.theta = rad(30);
    let maxTheta = 0, minTheta = 0;
    for (let i = 0; i < 1200; i++) {
      stepPhysics(1 / 600);
      maxTheta = Math.max(maxTheta, swing.theta);
      minTheta = Math.min(minTheta, swing.theta);
    }
    // ungestörte Schwingung: nahezu dieselbe Amplitude auf beiden Seiten (nur Luftdämpfung)
    assert.ok(minTheta < -rad(29), `${setup}: ${minTheta}`);
    assert.ok(maxTheta < rad(30.2), `${setup}: ${maxTheta}`);
  }
  // kurzer Magnet zum Vergleich: stößt hinten an den Bogen
  Object.assign(state, { setup: 'drehbar', longMagnet: false });
  assert.ok(swingLimits(0)[0] > -rad(30));
  // drehbar bis 90°: der Bogen des langen Magneten bleibt über dem Tisch (Achse 26 cm, Bogen bis 24 cm)
  state.longMagnet = true;
  assert.ok(swingLimits(90)[1] > 0);
  state.longMagnet = false;
});
