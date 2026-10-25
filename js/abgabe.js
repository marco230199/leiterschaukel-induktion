// ------------------------------------------------------------------
// Abgabe im Unterricht (nur wenn die Seite vom Abgabe-Server auf dem Lehrer-Laptop kommt, siehe server/)
//
// Schüler:  „Teilen“ schickt die eigene Tafelzeichnung als Vektordaten an den Server; erneutes Teilen ersetzt
//           die vorige Abgabe dieses Geräts.
// Lehrer:   /lehrer (PIN) – Leiste mit allen Abgaben, live per WebSocket, und QR-Code für die Schüler.
//           Eine Abgabe öffnet sich auf der Tafel als Arbeitskopie: Ergänzen und Radieren bleiben nur hier,
//           das Original auf dem Server bleibt unverändert („Original wiederherstellen“).
// Ohne Server (GitHub Pages, lokaler Testserver) bleibt das alles ausgeblendet.
// Nachrichten über den WebSocket: siehe Beschreibung in server/server.js.
// ------------------------------------------------------------------
import { packen, entpacken, zeichneAlle, GRENZEN } from './striche.js';
import {
  tafelBild, bildGeladen, eigenesDokument, aktuellesDokument, zeigeDokument, dokumentGeaendert, aufAenderung,
  oeffneTafel, schliesseTafel, mitRueckfrage,
} from './tafel.js';
import { setLinkUrl, qrSvg, showLink } from './link.js';

const $ = id => document.getElementById(id);
const parameter = new URLSearchParams(location.search);
const raum = (parameter.get('raum') ?? '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 20);
const mitRaum = weg => weg + (raum ? (weg.includes('?') ? '&' : '?') + 'raum=' + raum : '');

function speicher(schluessel, wert) {
  try {
    if (wert === undefined) return localStorage.getItem(schluessel);
    localStorage.setItem(schluessel, wert);
  } catch { /* privates Fenster o. Ä. */ }
  return null;
}

async function anfrage(weg, optionen = {}) {
  const antwort = await fetch(weg, {
    cache: 'no-store',
    ...optionen,
    headers: optionen.body ? { 'Content-Type': 'application/json' } : undefined,
  });
  const daten = await antwort.json().catch(() => ({}));
  if (!antwort.ok) throw Object.assign(new Error(daten.fehler ?? 'Fehler ' + antwort.status), { status: antwort.status });
  return daten;
}

// Läuft die Seite über den Abgabe-Server? (GitHub Pages ist HTTPS und hat keinen – dann gar nicht erst fragen)
async function serverStatus() {
  if (location.protocol !== 'http:') return null;
  try {
    const status = await anfrage('/api/status', { signal: AbortSignal.timeout(10000) });
    return status.server === 'leiterschaukel-abgabe' ? status : null;
  } catch {
    return null;
  }
}

// WebSocket zum Server, der sich nach einer Unterbrechung (WLAN weg, Laptop zugeklappt) selbst neu verbindet
class Leitung {
  constructor(hallo, beiNachricht, beiStatus = () => {}) {
    Object.assign(this, { hallo, beiNachricht, beiStatus, ws: null, warten: 1000, aus: false });
    this.verbinden();
  }

  verbinden() {
    const ws = new WebSocket(`ws://${location.host}/ws`);
    this.ws = ws;
    ws.onopen = () => {
      this.warten = 1000;
      ws.send(JSON.stringify(this.hallo));
      this.beiStatus(true);
    };
    ws.onmessage = event => this.beiNachricht(JSON.parse(event.data));
    ws.onclose = event => {
      this.beiStatus(false);
      if (this.aus || event.code === 4001) return;   // 4001: PIN fehlt
      setTimeout(() => this.verbinden(), this.warten);
      this.warten = Math.min(this.warten * 2, 10_000);
    };
  }

  get offen() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  senden(nachricht) {
    if (!this.offen) return false;
    this.ws.send(JSON.stringify(nachricht));
    return true;
  }
}

export async function initAbgabe() {
  const status = await serverStatus();
  if (!status) return;
  if (parameter.has('lehrer')) {
    if (status.lehrer) starteLehrer(); else zeigePinDialog();
  } else {
    starteSchueler();
  }
}

// ================= Schüler

function geraeteId() {
  let id = speicher('leiterschaukel-geraet');
  if (!id || !/^[a-z0-9]{8,40}$/.test(id)) {
    id = Array.from(crypto.getRandomValues(new Uint8Array(12)), b => b.toString(36).padStart(2, '0')).join('');
    speicher('leiterschaukel-geraet', id);
  }
  return id;
}

function starteSchueler() {
  if (raum) setLinkUrl(location.origin + '/?raum=' + raum);
  $('tafelSchueler').hidden = false;
  const name = $('tafelName');
  name.maxLength = GRENZEN.NAME;
  name.value = speicher('leiterschaukel-name') ?? '';
  name.addEventListener('change', () => speicher('leiterschaukel-name', name.value.trim()));
  const knopf = $('tafelTeilen');
  const meldung = $('tafelTeilenStatus');
  let zeit = null, wartet = null;
  const melde = (text, ok) => {
    clearTimeout(zeit);
    clearTimeout(wartet);
    knopf.disabled = false;
    meldung.textContent = text;
    meldung.classList.toggle('ok', ok);
    zeit = setTimeout(() => { meldung.textContent = ''; }, ok ? 4000 : 8000);
  };
  const leitung = new Leitung({ typ: 'hallo', rolle: 'schueler', raum, geraet: geraeteId() }, nachricht => {
    if (nachricht.typ === 'geteilt') melde('Geteilt ✓', true);
    if (nachricht.typ === 'fehler') melde(nachricht.text, false);
  });
  const KEINE_VERBINDUNG = 'Keine Verbindung zum Lehrer-Laptop – bitte gleich noch einmal versuchen.';
  knopf.addEventListener('click', () => {
    const gesendet = leitung.senden({ typ: 'abgabe', name: name.value.trim(), striche: packen(eigenesDokument.striche) });
    if (!gesendet) return melde(KEINE_VERBINDUNG, false);
    knopf.disabled = true;
    wartet = setTimeout(() => melde(KEINE_VERBINDUNG, false), 8000);
  });
}

// ================= Lehrer

function zeigePinDialog(meldung = '') {
  $('pinOverlay').hidden = false;
  $('pinFehler').textContent = meldung;
  $('pinInput').value = '';
  $('pinInput').focus();
}

$('pinForm').addEventListener('submit', async event => {
  event.preventDefault();
  try {
    await anfrage('/api/login', { method: 'POST', body: JSON.stringify({ pin: $('pinInput').value.trim() }) });
    $('pinOverlay').hidden = true;
    starteLehrer();
  } catch (fehler) {
    zeigePinDialog(fehler.message);
  }
});

// Abgaben: id → { abgabe (Original vom Server), arbeit (Arbeitskopie oder null), kachel }
const abgaben = new Map();
let gestartet = false;

async function starteLehrer() {
  if (gestartet) return verbinden();
  gestartet = true;
  document.body.classList.add('lehrer');
  $('abgaben').hidden = false;
  $('tafelLehrer').hidden = false;
  eigeneKachel();
  zeigeTitel();

  $('abgabenRaum').textContent = raum ? 'Raum ' + raum : '';
  $('abgabenQr').addEventListener('click', showLink);
  $('abgabenGross').addEventListener('click', () => {
    const gross = $('abgaben').classList.toggle('gross');
    $('abgabenGross').textContent = gross ? 'Verkleinern' : 'Groß';
  });
  mitRueckfrage($('abgabenAlleLoeschen'), 'Wirklich alle?', () => {
    leitung.senden({ typ: 'alle-loeschen' });
  });
  $('tafelOriginal').addEventListener('click', () => {
    const eintrag = offenerEintrag();
    if (!eintrag) return;
    Object.assign(eintrag.arbeit, { striche: entpacken(eintrag.abgabe.striche), verlauf: [], bearbeitet: false, neuer: false });
    dokumentGeaendert();
    zeigeTitel();
    kachelZeichnen(eintrag);
  });
  mitRueckfrage($('tafelAbgabeLoeschen'), 'Wirklich löschen?', () => {
    const eintrag = offenerEintrag();
    if (!eintrag) return;
    leitung.senden({ typ: 'loeschen', id: eintrag.abgabe.id });
  });
  aufAenderung(dok => {
    const eintrag = offenerEintrag();
    if (eintrag && eintrag.arbeit === dok) {
      zeigeTitel();
      kachelZeichnen(eintrag);
    }
  });
  verbinden();
}

let leitung = null;
function verbinden() {
  if (leitung) leitung.aus = true;
  leitung = new Leitung({ typ: 'hallo', rolle: 'lehrer', raum }, nachricht => {
    if (nachricht.typ === 'willkommen') adresseZeigen(nachricht);
    if (nachricht.typ === 'liste') {
      const ids = new Set(nachricht.abgaben.map(a => a.id));
      for (const id of [...abgaben.keys()]) if (!ids.has(id)) entfernen(id);
      for (const abgabe of nachricht.abgaben) eintragen(abgabe, false);
    }
    if (nachricht.typ === 'abgabe') eintragen(nachricht.abgabe, true);
    if (nachricht.typ === 'geloescht') entfernen(nachricht.id);
    if (nachricht.typ === 'geleert') for (const id of [...abgaben.keys()]) entfernen(id);
    if (nachricht.typ === 'online') $('abgabenOnline').textContent = `${nachricht.anzahl} Gerät${nachricht.anzahl === 1 ? '' : 'e'} verbunden`;
    // Server neu gestartet: Anmeldung ist ungültig → PIN erneut abfragen
    if (nachricht.typ === 'fehler' && nachricht.code === 'pin') {
      zeigePinDialog('Der Server wurde neu gestartet – bitte PIN erneut eingeben.');
    }
  }, offen => {
    if (!offen) $('abgabenOnline').textContent = 'Verbindung zum Server unterbrochen …';
  });
}

// Adresse und QR-Code für die Schüler (Adresse des Laptops im lokalen Netz)
let adresseGezeigt = false;
async function adresseZeigen({ adressen, port }) {
  if (adresseGezeigt) return;
  adresseGezeigt = true;
  const url = mitRaum(adressen.length ? `http://${adressen[0]}:${port}/` : location.origin + '/');
  setLinkUrl(url);
  $('abgabenAdresse').textContent = url.replace(/^http:\/\//, '');
  $('abgabenAdresse').title = adressen.length > 1
    ? 'Weitere Adressen des Laptops: ' + adressen.slice(1).map(a => `${a}:${port}`).join(', ') : '';
  try {
    $('abgabenQrBild').innerHTML = await qrSvg(url);
  } catch {
    $('abgabenQrBild').textContent = 'QR-Code nicht verfügbar';
  }
}

const offenerEintrag = () => [...abgaben.values()].find(e => e.arbeit && e.arbeit === aktuellesDokument());

function zeigeTitel() {
  const eintrag = offenerEintrag();
  $('tafelOriginal').hidden = $('tafelAbgabeLoeschen').hidden = !eintrag;
  if (!eintrag) {
    $('tafelTitel').textContent = 'Eigene Tafel';
    return;
  }
  const name = eintrag.abgabe.name || 'ohne Namen';
  $('tafelTitel').textContent = 'Abgabe: ' + name + (eintrag.arbeit.bearbeitet ? ' (bearbeitet)' : '')
    + (eintrag.neuer ? ' – neue Version eingegangen' : '');
  for (const e of abgaben.values()) e.kachel.classList.toggle('offen', e === eintrag);
}

// Neue oder ersetzte Abgabe
function eintragen(abgabe, neu) {
  let eintrag = abgaben.get(abgabe.id);
  if (!eintrag) {
    eintrag = { abgabe, arbeit: null, kachel: neueKachel() };
    eintrag.kachel.addEventListener('click', () => oeffnen(eintrag));
    abgaben.set(abgabe.id, eintrag);
    $('abgabenListe').append(eintrag.kachel);
  }
  eintrag.abgabe = abgabe;
  // Arbeitskopie: unbearbeitet → neue Version übernehmen; bearbeitet → Hinweis, „Original wiederherstellen“ lädt sie
  if (eintrag.arbeit) {
    if (eintrag.arbeit.bearbeitet) {
      eintrag.neuer = true;
    } else {
      Object.assign(eintrag.arbeit, { striche: entpacken(abgabe.striche), verlauf: [] });
      if (eintrag.arbeit === aktuellesDokument()) dokumentGeaendert();
    }
  }
  eintrag.kachel.querySelector('.kachel-name').textContent = abgabe.name || 'ohne Namen';
  kachelZeichnen(eintrag);
  if (neu) {
    eintrag.kachel.classList.remove('neu');
    void eintrag.kachel.offsetWidth;   // Animation neu starten
    eintrag.kachel.classList.add('neu');
  }
  zaehlen();
  zeigeTitel();
}

function entfernen(id) {
  const eintrag = abgaben.get(id);
  if (!eintrag) return;
  abgaben.delete(id);
  eintrag.kachel.remove();
  if (eintrag.arbeit && eintrag.arbeit === aktuellesDokument()) {
    zeigeDokument(eigenesDokument);
    schliesseTafel();
  }
  zaehlen();
  zeigeTitel();
}

function oeffnen(eintrag) {
  eintrag.arbeit ??= { striche: entpacken(eintrag.abgabe.striche), verlauf: [], bearbeitet: false };
  zeigeDokument(eintrag.arbeit);
  zeigeTitel();
  oeffneTafel();
}

const zaehlen = () => { $('abgabenZahl').textContent = abgaben.size; };

// ---------------- Kacheln (Vorschaubilder)

function neueKachel(text = '') {
  const kachel = document.createElement('button');
  kachel.type = 'button';
  kachel.className = 'kachel';
  kachel.innerHTML = '<canvas></canvas><span class="kachel-name"></span><span class="kachel-marke">bearbeitet</span>';
  kachel.querySelector('.kachel-name').textContent = text;
  return kachel;
}

function eigeneKachel() {
  const kachel = neueKachel('Eigene Tafel');
  kachel.classList.add('eigen');
  kachel.addEventListener('click', () => {
    zeigeDokument(eigenesDokument);
    zeigeTitel();
    for (const e of abgaben.values()) e.kachel.classList.remove('offen');
    oeffneTafel();
  });
  $('abgabenListe').append(kachel);
  bildGeladen.then(() => vorschau(kachel, []));
}

// Vorschau zeigt immer das Original; ist die Arbeitskopie bearbeitet, steht „bearbeitet“ daran
function kachelZeichnen(eintrag) {
  eintrag.kachel.classList.toggle('bearbeitet', Boolean(eintrag.arbeit?.bearbeitet));
  bildGeladen.then(() => vorschau(eintrag.kachel, entpacken(eintrag.abgabe.striche)));
}

function vorschau(kachel, striche) {
  const canvas = kachel.querySelector('canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = 240 * dpr;
  canvas.height = 150 * dpr;
  const ctx = canvas.getContext('2d');
  if (tafelBild.naturalWidth) ctx.drawImage(tafelBild, 0, 0, canvas.width, canvas.height);
  zeichneAlle(ctx, striche, canvas.width, 2.5);   // Striche dicker, damit man sie im kleinen Bild erkennt
}
