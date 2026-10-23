// ------------------------------------------------------------------
// Schaukel mit Maus oder Finger ziehen. Greift man daneben, dreht sich wie gewohnt die Ansicht.
// ------------------------------------------------------------------
import * as THREE from 'three';
import { PIVOT_Y } from './config.js';
import { startDrag, dragTo, endDrag } from './physik.js';
import { grabTargets } from './aufbau.js';
import { renderer, camera, controls } from './szene.js';

const canvas = renderer.domElement;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);   // Schwingebene x = const
const hit = new THREE.Vector3();
let activeId = null;

function setRay(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
}

// Winkel der Schaukel, bei dem sie durch den Punkt unter dem Finger geht
function angleAtPointer() {
  if (!raycaster.ray.intersectPlane(plane, hit)) return null;
  return Math.atan2(hit.z, PIVOT_Y - hit.y);
}

const grabbed = () => raycaster.intersectObjects(grabTargets, false)[0];

// Erfassungsphase: läuft vor den OrbitControls, die dann für diesen Zug abgeschaltet werden
canvas.addEventListener('pointerdown', event => {
  if (activeId !== null) return;
  setRay(event);
  const target = grabbed();
  if (!target) return;
  activeId = event.pointerId;
  controls.enabled = false;
  plane.constant = -target.point.x;
  canvas.setPointerCapture(event.pointerId);
  canvas.style.cursor = 'grabbing';
  startDrag(angleAtPointer() ?? 0);
}, { capture: true });

canvas.addEventListener('pointermove', event => {
  setRay(event);
  if (event.pointerId !== activeId) {
    if (activeId === null && event.pointerType === 'mouse') canvas.style.cursor = grabbed() ? 'grab' : '';
    return;
  }
  const theta = angleAtPointer();
  if (theta !== null) dragTo(theta);
});

function release(event) {
  if (event.pointerId !== activeId) return;
  activeId = null;
  endDrag();
  controls.enabled = true;
  canvas.style.cursor = '';
}
canvas.addEventListener('pointerup', release);
canvas.addEventListener('pointercancel', release);
