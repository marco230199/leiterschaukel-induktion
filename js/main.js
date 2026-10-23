// ------------------------------------------------------------------
// Start der Simulation und Render-Schleife
// ------------------------------------------------------------------
import * as THREE from 'three';
import { renderer, scene, camera, controls, resetView } from './szene.js';
import { state } from './state.js';
import { stepPhysics } from './physik.js';
import { syncApparatus } from './aufbau.js';
import { syncMeter } from './messgeraet.js';
import { initUi, animateFlip, updateValue } from './bedienfeld.js';
import './ziehen.js';

initUi();
resetView();

const SLOW_MOTION = 0.25;
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  animateFlip(dt);
  stepPhysics(state.slowMotion ? dt * SLOW_MOTION : dt);
  syncApparatus();
  syncMeter();
  updateValue();
  controls.update();
  renderer.render(scene, camera);
});
