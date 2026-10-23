// ------------------------------------------------------------------
// Bedienfeld: Knöpfe, Regler und Anzeigen
// ------------------------------------------------------------------
import { METER } from './config.js';
import { state } from './state.js';
import { pushSwing, stopSwing, meterReading, resetPhysics, resetMagnet } from './physik.js';
import { applyMagnetPoles, setMagnetOpacity, applySetup, syncApparatus } from './aufbau.js';
import { updateMeterFace, buildCables, turnMeterTowards } from './messgeraet.js';
import { cancelDrag } from './ziehen.js';
import { resetView, camera } from './szene.js';
import { formatNumber } from './hilfen.js';

const $ = id => document.getElementById(id);
const unit = () => (state.meterMode === 'U' ? 'mV' : 'mA');

// Magnet umdrehen: ausblenden, Pole tauschen, wieder einblenden
const FLIP_DURATION = 0.8;
const flip = { active: false, t: 0, swapped: false };

function updateUi() {
  const rotatable = state.setup === 'drehbar';
  for (const [id, setup] of [['setupDrehbarBtn', 'drehbar'], ['setupTischBtn', 'tisch']]) {
    $(id).classList.toggle('active', state.setup === setup);
    $(id).setAttribute('aria-pressed', String(state.setup === setup));
  }
  $('angleControls').hidden = !rotatable;
  $('tableControls').hidden = rotatable;
  $('magnetStatus').textContent = (state.northUp
    ? 'Nordpol (rot) oben, Südpol (grün) unten'
    : 'Südpol (grün) oben, Nordpol (rot) unten') + (rotatable ? ' – bei α = 0°' : '');
  $('flipBtn').disabled = flip.active;
  $('angleOut').textContent = state.angle + '°';
  for (const [id, mode] of [['modeUBtn', 'U'], ['modeIBtn', 'I']]) {
    $(id).classList.toggle('active', state.meterMode === mode);
    $(id).setAttribute('aria-pressed', String(state.meterMode === mode));
  }
  $('modeStatus').textContent = state.meterMode === 'U'
    ? 'Spannungsmessung: Das Messgerät ist hochohmig, es fließt praktisch kein Strom.'
    : 'Strommessung: Der Stromkreis ist über das Messgerät geschlossen (R ≈ 1 Ω). '
      + 'Der Induktionsstrom bremst die Schaukel – bei diesem Aufbau aber kaum merklich.';
  $('brakeBox').hidden = state.meterMode !== 'I';
  for (const button of $('rangeButtons').children) {
    const active = Number(button.dataset.range) === state.range;
    button.textContent = `±${button.dataset.range} ${unit()}`;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  $('valueOut').hidden = !state.showValue;
  updateMeterFace();
}

// Messwert als Zahl (nur sichtbar, wenn eingeschaltet)
export function updateValue() {
  if (!state.showValue) return;
  const value = meterReading();
  $('valueOut').textContent = (value < 0 ? '−' : '') + formatNumber(Math.abs(value), 2) + ' ' + unit();
}

export function animateFlip(dt) {
  if (!flip.active) return;
  flip.t = Math.min(flip.t + dt / FLIP_DURATION, 1);
  if (flip.t >= 0.5 && !flip.swapped) {
    state.northUp = !state.northUp;
    applyMagnetPoles();
    flip.swapped = true;
    updateUi();
  }
  setMagnetOpacity(Math.abs(1 - 2 * flip.t));
  if (flip.t >= 1) {
    flip.active = false;
    setMagnetOpacity(1);
    updateUi();
  }
}

// Versuch wechseln: Magnet in Grundstellung, Schaukel in Ruhe, Querstange und Kabel neu, Startansicht
function setSetup(setup) {
  if (setup === state.setup) return;
  cancelDrag();
  if (flip.active) {   // laufendes Umdrehen sofort abschließen
    if (!flip.swapped) state.northUp = !state.northUp;
    flip.active = false;
    applyMagnetPoles();
    setMagnetOpacity(1);
  }
  state.setup = setup;
  state.angle = state.magnetAngle = 0;
  $('angleSlider').value = 0;
  resetPhysics();
  applySetup();
  buildCables();
  resetView();
  updateUi();
}

export function initUi() {
  for (const range of METER.RANGES) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.range = range;
    button.addEventListener('click', () => { state.range = range; updateUi(); });
    $('rangeButtons').append(button);
  }
  $('slowCheck').checked = state.slowMotion;
  $('brakeCheck').checked = state.brakeBoost;
  $('valueCheck').checked = state.showValue;
  $('angleSlider').value = state.angle;

  $('resetView').addEventListener('click', resetView);
  $('setupDrehbarBtn').addEventListener('click', () => setSetup('drehbar'));
  $('setupTischBtn').addEventListener('click', () => setSetup('tisch'));
  $('resetMagnetBtn').addEventListener('click', () => {
    cancelDrag();
    resetMagnet();
    stopSwing();
    syncApparatus();
  });
  $('pushBtn').addEventListener('click', pushSwing);
  $('stopBtn').addEventListener('click', stopSwing);
  $('meterTurnBtn').addEventListener('click', () => turnMeterTowards(camera.position));
  $('slowCheck').addEventListener('change', e => { state.slowMotion = e.target.checked; });
  $('flipBtn').addEventListener('click', () => {
    if (flip.active) return;
    Object.assign(flip, { active: true, t: 0, swapped: false });
    updateUi();
  });
  $('angleSlider').addEventListener('input', e => { state.angle = Number(e.target.value); updateUi(); });
  $('modeUBtn').addEventListener('click', () => { state.meterMode = 'U'; updateUi(); });
  $('modeIBtn').addEventListener('click', () => { state.meterMode = 'I'; updateUi(); });
  $('brakeCheck').addEventListener('change', e => { state.brakeBoost = e.target.checked; });
  $('valueCheck').addEventListener('change', e => { state.showValue = e.target.checked; updateUi(); });

  applyMagnetPoles();
  applySetup();
  buildCables();
  updateUi();
}
