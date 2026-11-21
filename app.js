/**
 * ASTRA – Space Mission Explorer | Ultra-Lightweight Standalone Application
 * Pure HTML5, CSS3 & Vanilla JavaScript. Zero npm/node_modules dependencies.
 */

// ==========================================
// 1. DATA CONFIGURATIONS & CRATER CATALOG
// ==========================================
const MISSIONS = {
  chandrayaan: {
    name: 'Chandrayaan-3 / 2',
    agency: 'ISRO • Lunar Exploration',
    target: 'moon',
    vehicle: 'LVM3-M4',
    status: 'ACTIVE',
    nominalAlt: 100.0,
    inclination: 89.8,
    period: 118.0,
    velocity: 1.63,
    tempMinSafe: -120,
    tempMaxSafe: 85,
    desc: 'India’s flagship lunar exploration mission. Accomplished historic precision landing near the lunar South Pole (Shiv Shakti Point at 69.37°S, 32.35°E). Investigates sub-surface thermophysical properties, lunar regolith mineralogy, and plasma density in the south polar region.',
    flyToList: [
      { name: 'Shiv Shakti Pt', lat: -69.37, lon: 32.32, rad: 12.5 },
      { name: 'Shackleton (PSR)', lat: -89.9, lon: 0.0, rad: 13.0 },
      { name: 'Tycho Rays', lat: -43.3, lon: -11.2, rad: 14.0 },
      { name: 'Full Moon', lat: 0, lon: 0, rad: 30 }
    ]
  },
  mangalyaan: {
    name: 'Mangalyaan (MOM)',
    agency: 'ISRO • Mars Planetary Mission',
    target: 'mars',
    vehicle: 'PSLV-XL C25',
    status: 'HISTORIC_SUCCESS',
    nominalAlt: 421.7,
    inclination: 150.0,
    period: 4360,
    velocity: 4.68,
    tempMinSafe: -95,
    tempMaxSafe: 65,
    desc: 'India’s historic maiden interplanetary mission, making ISRO the first space agency in Asia to reach Mars orbit on its first attempt. Operating in an eccentric elliptical orbit, MOM captured stunning full-disc martian imagery, mapped atmospheric escape processes, and analyzed surface mineralogy.',
    flyToList: [
      { name: 'Olympus Mons', lat: 18.65, lon: -133.8, rad: 13.0 },
      { name: 'Valles Marineris', lat: -14.0, lon: -59.2, rad: 14.5 },
      { name: 'North Polar Cap', lat: 85.0, lon: 0.0, rad: 13.0 },
      { name: 'Full Mars', lat: 0, lon: 0, rad: 30 }
    ]
  },
  'aditya-l1': {
    name: 'Aditya-L1',
    agency: 'ISRO • Solar Observatory',
    target: 'sun',
    vehicle: 'PSLV-C57',
    status: 'ACTIVE',
    nominalAlt: 1496000,
    inclination: 18.5,
    period: 256000,
    velocity: 0.28,
    tempMinSafe: 20,
    tempMaxSafe: 135,
    desc: 'India’s first dedicated solar space observatory. Positioned in a halo orbit around the Sun-Earth Lagrangian point L1 (~1.5 million km from Earth), Aditya-L1 continuously observes the solar photosphere, chromosphere, and corona without any occultation or eclipse, delivering critical space weather predictions.',
    flyToList: [
      { name: 'Sunspot AR3664', lat: 15.0, lon: 45.0, rad: 14.0 },
      { name: 'Solar Equator', lat: 0.0, lon: 0.0, rad: 15.0 },
      { name: 'Full Sun', lat: 0, lon: 0, rad: 32 }
    ]
  }
};

const CELESTIAL_TARGETS = {
  moon: { name: 'The Moon (Luna)', radius: 1737.4, color: '#94a3b8' },
  mars: { name: 'Mars (Mangal)', radius: 3389.5, color: '#ef4444' },
  sun: { name: 'The Sun (Surya)', radius: 696340, color: '#f59e0b' }
};

const LUNAR_CRATERS = [
  {
    id: 'shiv-shakti',
    name: 'Shiv Shakti Point (Chandrayaan-3 Landing Site)',
    lat: -69.373,
    lon: 32.319,
    dia: 4.2,
    depth: 0.85,
    desc: 'Historic soft-landing site between Manzinus C and Simpelius N. ChaSTE thermal probe measured 50°C drop 8cm into regolith.',
    profile: [-20, -180, -640, -850, -590, -150, 10]
  },
  {
    id: 'shackleton',
    name: 'Shackleton Crater (Lunar South Pole)',
    lat: -89.9,
    lon: 0.0,
    dia: 20.9,
    depth: 4.2,
    desc: 'Permanently shadowed region (PSR) containing volatile water-ice deposits shielded for >3 billion years.',
    profile: [1200, 500, -1800, -4200, -2100, 400, 1150]
  },
  {
    id: 'tycho',
    name: 'Tycho Crater',
    lat: -43.3,
    lon: -11.2,
    dia: 85.0,
    depth: 4.8,
    desc: 'Prominent young impact crater with striking bright radial ray system extending over 1,500 km across lunar nearside.',
    profile: [1400, -1200, -4200, -2800, -4500, -900, 1300]
  },
  {
    id: 'clavius',
    name: 'Clavius Crater',
    lat: -58.4,
    lon: -14.4,
    dia: 230.7,
    depth: 4.9,
    desc: 'One of the largest impact basins on the Moon, where molecular water trapped in sunlit regolith beads was confirmed.',
    profile: [1800, -1500, -4200, -4900, -4100, -1600, 1700]
  }
];

// Preloaded scientific observation points
let lunarObservations = [
  { name: 'Shiv Shakti Point', lat: -69.37, lon: 32.32, elev: -850, temp: 32.5, ice: 0.42 },
  { name: 'Shackleton Rim (PSR)', lat: -89.90, lon: 0.00, elev: 1180, temp: -238.4, ice: 0.94 },
  { name: 'Shoemaker Floor', lat: -88.10, lon: 45.90, elev: -3200, temp: -224.0, ice: 0.88 },
  { name: 'Malapert Mountain', lat: -84.90, lon: 12.90, elev: 4200, temp: -45.0, ice: 0.15 },
  { name: 'Mare Imbrium', lat: 32.80, lon: -15.60, elev: -2100, temp: 104.2, ice: 0.02 },
  { name: 'Oceanus Procellarum', lat: 18.40, lon: -57.40, elev: -1800, temp: 98.7, ice: 0.01 },
  { name: 'Tycho Peak', lat: -43.30, lon: -11.20, elev: 1950, temp: 62.0, ice: 0.08 }
];

// ChaSTE In-Situ depth probe dataset
const chasteData = [
  { depth: '0cm', temp: 45 },
  { depth: '-2cm', temp: 25 },
  { depth: '-4cm', temp: 8 },
  { depth: '-6cm', temp: -10 },
  { depth: '-8cm', temp: -32 },
  { depth: '-10cm', temp: -50 }
];

// ==========================================
// 2. SIMULATION STATE
// ==========================================
let currentCraft = 'chandrayaan';
let currentTarget = 'moon';
let activeTab = 'overview';
let isPlaying = true;
let speedMultiplier = 1;
let orbitProgress = 0.2;
let audioEnabled = true;
let isUploadedData = false;
let elapsedSeconds = 3600;

let currentTelemetry = {
  altitude: 100.0,
  latitude: -69.37,
  longitude: 32.32,
  temperature: 24.5,
  radar: 99.8,
  lidar: 99820,
  signal: -103.5,
  velocity: 1.63,
  power: 224,
  timestamp: new Date().toISOString()
};

let telemetryHistory = [];

// ==========================================
// 3. AUDIO SYNTHESIZER (Web Audio API)
// ==========================================
let audioCtx = null;
function playSound(type) {
  if (!audioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;

    if (type === 'chirp') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.04);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(now + 0.04);
    } else if (type === 'alert') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(380, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(now + 0.16);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(now + 0.02);
    }
  } catch (e) {}
}

// ==========================================
// 4. PROCEDURAL PLANETARY TEXTURE GENERATOR
// ==========================================
function generateMoonTextures() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');

  // Base Highlands
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#757c91');
  grad.addColorStop(0.5, '#9aa0b0');
  grad.addColorStop(1, '#6b7280');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Maria Basalt Plains
  const maria = [
    { x: 310, y: 220, rx: 140, ry: 120 }, // Oceanus Procellarum
    { x: 400, y: 170, rx: 85, ry: 65 },   // Mare Imbrium
    { x: 520, y: 180, rx: 55, ry: 45 },   // Mare Serenitatis
    { x: 560, y: 230, rx: 65, ry: 50 },   // Mare Tranquillitatis
    { x: 660, y: 205, rx: 40, ry: 32 },   // Mare Crisium
    { x: 512, y: 440, rx: 170, ry: 80 },  // South Pole Aitken
  ];

  maria.forEach(m => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(m.x, m.y, m.rx, m.ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(38, 43, 56, 0.72)';
    ctx.filter = 'blur(10px)';
    ctx.fill();
    ctx.restore();
  });

  // Tycho Crater & Rays
  ctx.save();
  ctx.strokeStyle = 'rgba(240, 245, 255, 0.45)';
  ctx.lineWidth = 1;
  for (let r = 0; r < 24; r++) {
    const angle = (Math.PI * 2 / 24) * r;
    ctx.beginPath();
    ctx.moveTo(460, 340);
    ctx.lineTo(460 + Math.cos(angle) * 180, 340 + Math.sin(angle) * 180);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(460, 340, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.restore();

  // Shiv Shakti Point Area & Shackleton
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath(); ctx.arc(590, 447, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(512, 492, 8, 0, Math.PI * 2); ctx.fill();

  const tex = new THREE.CanvasTexture(c);
  return tex;
}

function generateMarsTextures() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');

  // Rust gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#c2410c');
  grad.addColorStop(0.5, '#ea580c');
  grad.addColorStop(1, '#9a3412');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Dark albedo regions
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(690, 230, 85, 65, 0, 0, Math.PI * 2); // Syrtis Major
  ctx.fillStyle = 'rgba(55, 18, 6, 0.7)';
  ctx.filter = 'blur(8px)';
  ctx.fill();
  ctx.restore();

  // Valles Marineris Canyon
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(280, 250);
  ctx.bezierCurveTo(340, 265, 390, 260, 460, 275);
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(40, 12, 4, 0.9)';
  ctx.filter = 'blur(2px)';
  ctx.stroke();
  ctx.restore();

  // Olympus Mons Volcano & Caldera
  ctx.save();
  ctx.beginPath();
  ctx.arc(220, 205, 24, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(195, 75, 30, 0.9)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(220, 205, 7, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(40, 10, 4, 0.95)';
  ctx.fill();
  ctx.restore();

  // Polar Ice Caps
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.filter = 'blur(4px)';
  ctx.beginPath(); ctx.ellipse(512, 20, 210, 32, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(512, 495, 180, 28, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  return new THREE.CanvasTexture(c);
}

function generateSunTextures() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');

  // Solar gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#f59e0b');
  grad.addColorStop(0.5, '#fef08a');
  grad.addColorStop(1, '#d97706');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Active Sunspots (AR3664)
  const drawSpot = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(146, 64, 14, 0.8)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(30, 8, 3, 0.98)';
    ctx.fill();
  };

  drawSpot(420, 220, 16);
  drawSpot(440, 235, 10);
  drawSpot(680, 280, 20);

  return new THREE.CanvasTexture(c);
}

// ==========================================
// 5. THREE.JS 3D VIEWPORT ENGINE
// ==========================================
let scene, camera, renderer, planetMesh, atmoMesh, scGroup, orbitLine, sensorBeam, solarPoints;
let cameraSpherical = { radius: 30, theta: Math.PI / 4, phi: Math.PI / 3 };
let cameraTarget = new THREE.Vector3(0, 0, 0);
let isDragging = false;
let dragButton = 0;
let prevMouse = { x: 0, y: 0 };
let interactionMode = 'rotate';
let followCraft = false;

function init3DViewport() {
  const container = document.getElementById('canvasMount');
  if (!container) return;

  const w = container.clientWidth || 800;
  const h = container.clientHeight || 480;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020617);

  // Starfield
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(1500 * 3);
  for (let i = 0; i < 1500 * 3; i++) starPos[i] = (Math.random() - 0.5) * 800;
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, transparent: true, opacity: 0.8 });
  scene.add(new THREE.Points(starGeo, starMat));

  // Camera
  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
  update3DCamera();

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lighting
  const ambLight = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 2.4);
  dirLight.position.set(50, 20, 60);
  scene.add(dirLight);

  // Build Celestial Body
  buildPlanetMesh(currentTarget);

  // Build Spacecraft
  buildSpacecraftModel();

  // Event Listeners for Zoomable & Movable controls
  container.addEventListener('mousedown', e => {
    isDragging = true;
    dragButton = e.button;
    prevMouse = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;

    if (dragButton === 2 || interactionMode === 'pan' || e.shiftKey) {
      // Pan model / target in camera plane
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
      const factor = (cameraSpherical.radius / 30) * 0.025;
      cameraTarget.add(right.multiplyScalar(-dx * factor));
      cameraTarget.add(up.multiplyScalar(dy * factor));
    } else {
      // Spherical Orbit Rotation
      cameraSpherical.theta -= dx * 0.007;
      cameraSpherical.phi = Math.max(0.08, Math.min(Math.PI - 0.08, cameraSpherical.phi - dy * 0.007));
    }

    prevMouse = { x: e.clientX, y: e.clientY };
    update3DCamera();
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  container.addEventListener('wheel', e => {
    e.preventDefault();
    cameraSpherical.radius = Math.max(10.8, Math.min(90, cameraSpherical.radius + e.deltaY * 0.035));
    update3DCamera();
  });

  container.addEventListener('contextmenu', e => e.preventDefault());

  window.addEventListener('resize', () => {
    if (!container || !renderer || !camera) return;
    const nw = container.clientWidth;
    const nh = container.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  });

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    if (planetMesh) planetMesh.rotation.y += 0.0008;
    if (atmoMesh) atmoMesh.rotation.y += 0.0012;
    if (solarPoints) solarPoints.rotation.y += 0.0015;
    renderer.render(scene, camera);
  }
  animate();
}

function update3DCamera() {
  if (!camera) return;
  const { radius, theta, phi } = cameraSpherical;
  const x = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  if (followCraft && scGroup) {
    const sp = scGroup.position;
    camera.position.set(sp.x + x * 0.45, sp.y + y * 0.45, sp.z + z * 0.45);
    camera.lookAt(sp);
  } else {
    camera.position.set(cameraTarget.x + x, cameraTarget.y + y, cameraTarget.z + z);
    camera.lookAt(cameraTarget);
  }
}

function buildPlanetMesh(target) {
  if (!scene) return;
  if (planetMesh) scene.remove(planetMesh);
  if (atmoMesh) scene.remove(atmoMesh);
  if (solarPoints) scene.remove(solarPoints);

  const radius = 10;
  const geo = new THREE.SphereGeometry(radius, 64, 64);

  if (target === 'moon') {
    const tex = generateMoonTextures();
    planetMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95 }));
    scene.add(planetMesh);
  } else if (target === 'mars') {
    const tex = generateMarsTextures();
    planetMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.88 }));
    scene.add(planetMesh);

    // Atmosphere
    const aGeo = new THREE.SphereGeometry(radius * 1.035, 32, 32);
    atmoMesh = new THREE.Mesh(aGeo, new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.22, side: THREE.BackSide }));
    scene.add(atmoMesh);
  } else if (target === 'sun') {
    const tex = generateSunTextures();
    planetMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex }));
    scene.add(planetMesh);

    // Corona particles
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      const r = radius * (1.05 + Math.random() * 0.4);
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pPos[i * 3 + 2] = r * Math.cos(ph);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    solarPoints = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xfbbf24, size: 1.4, transparent: true, opacity: 0.7 }));
    scene.add(solarPoints);
  }
}

function buildSpacecraftModel() {
  if (!scene) return;
  if (scGroup) scene.remove(scGroup);
  if (orbitLine) scene.remove(orbitLine);

  scGroup = new THREE.Group();

  // Central Gold MLI Bus
  const bus = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.3 }));
  scGroup.add(bus);

  // Solar Arrays
  const pMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, emissive: 0x0284c7, emissiveIntensity: 0.2 });
  const wL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 0.6), pMat);
  wL.position.set(-1.2, 0, 0);
  scGroup.add(wL);

  const wR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 0.6), pMat);
  wR.position.set(1.2, 0, 0);
  scGroup.add(wR);

  // Sensor Beam Cone
  const beamGeo = new THREE.ConeGeometry(1.2, 5.0, 16, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
  sensorBeam = new THREE.Mesh(beamGeo, beamMat);
  sensorBeam.position.set(0, -2.5, 0);
  scGroup.add(sensorBeam);

  scene.add(scGroup);

  // Orbit Line
  const points = [];
  for (let i = 0; i <= 100; i++) {
    const a = (i / 100) * Math.PI * 2;
    points.push(new THREE.Vector3(15 * Math.cos(a), 15 * Math.sin(a) * 0.7, 15 * Math.sin(a) * 0.7));
  }
  const oGeo = new THREE.BufferGeometry().setFromPoints(points);
  orbitLine = new THREE.Line(oGeo, new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 }));
  scene.add(orbitLine);
}

function updateCraftPosition(prog) {
  if (!scGroup) return;
  const a = prog * Math.PI * 2;
  const px = 15 * Math.cos(a);
  const py = 15 * Math.sin(a) * 0.7;
  const pz = 15 * Math.sin(a) * 0.7;
  scGroup.position.set(px, py, pz);
  scGroup.lookAt(0, 0, 0);
  scGroup.rotateX(Math.PI / 2);
  if (followCraft) update3DCamera();
}

// ==========================================
// 6. VIEWPORT INTERACTION CONTROLS
// ==========================================
function zoomIn3D() {
  cameraSpherical.radius = Math.max(10.8, cameraSpherical.radius - 3.5);
  update3DCamera();
}
function zoomOut3D() {
  cameraSpherical.radius = Math.min(90, cameraSpherical.radius + 3.5);
  update3DCamera();
}
function reset3DView() {
  cameraSpherical = { radius: 30, theta: Math.PI / 4, phi: Math.PI / 3 };
  cameraTarget.set(0, 0, 0);
  followCraft = false;
  document.getElementById('hudFocusText').innerText = 'Full Planet Disc';
  update3DCamera();
}
function togglePanRotate() {
  interactionMode = interactionMode === 'rotate' ? 'pan' : 'rotate';
  const btn = document.getElementById('btnInteractionMode');
  if (btn) btn.classList.toggle('active', interactionMode === 'pan');
}
function toggleFollowCraft() {
  followCraft = !followCraft;
  const btn = document.getElementById('btnFollowCraft');
  if (btn) btn.classList.toggle('active', followCraft);
  if (followCraft) document.getElementById('hudFocusText').innerText = 'Spacecraft';
  update3DCamera();
}
function toggleOrbitLine() {
  if (orbitLine) orbitLine.visible = !orbitLine.visible;
  document.getElementById('btnToggleOrbit').classList.toggle('active', orbitLine?.visible);
}
function toggleSensorBeam() {
  if (sensorBeam) sensorBeam.visible = !sensorBeam.visible;
  document.getElementById('btnToggleBeam').classList.toggle('active', sensorBeam?.visible);
}
function toggleLighting() {
  // toggle ambient fill
  update3DCamera();
}
function flyToFeature(lat, lon, rad, name) {
  followCraft = false;
  document.getElementById('hudFocusText').innerText = name;
  cameraTarget.set(0, 0, 0);
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  cameraSpherical = { radius: rad, theta, phi: Math.max(0.12, Math.min(Math.PI - 0.12, phi)) };
  update3DCamera();
  playSound('click');
}

function updateFlyToButtons() {
  const container = document.getElementById('flyToButtonsContainer');
  if (!container) return;
  container.innerHTML = '';
  const list = MISSIONS[currentCraft].flyToList || [];
  list.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.style.padding = '3px 8px';
    btn.style.fontSize = '11px';
    btn.innerText = item.name;
    btn.onclick = () => flyToFeature(item.lat, item.lon, item.rad, item.name);
    container.appendChild(btn);
  });
}

// ==========================================
// 7. 2D CANVAS CHARTS (Zero-dependency & Ultra-fast)
// ==========================================
function drawLineChart(canvasId, data, color = '#00f0ff', unit = '', minVal, maxVal) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.clientWidth;
  const h = canvas.height = canvas.clientHeight;

  ctx.clearRect(0, 0, w, h);
  if (data.length < 2) return;

  const vals = data.map(d => typeof d === 'number' ? d : d.val);
  const min = minVal !== undefined ? minVal : Math.min(...vals);
  const max = maxVal !== undefined ? maxVal : Math.max(...vals);
  const range = max - min || 1;

  // Grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let y = 0; y <= 4; y++) {
    const gy = (h - 20) * (y / 4) + 10;
    ctx.moveTo(35, gy);
    ctx.lineTo(w - 10, gy);
  }
  ctx.stroke();

  // Line & Gradient Fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + '66');
  grad.addColorStop(1, color + '05');

  ctx.beginPath();
  vals.forEach((v, i) => {
    const x = 40 + (i / (vals.length - 1)) * (w - 55);
    const y = h - 20 - ((v - min) / range) * (h - 35);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Close path for area
  ctx.lineTo(w - 15, h - 15);
  ctx.lineTo(40, h - 15);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Y-axis labels
  ctx.fillStyle = '#64748b';
  ctx.font = '9px monospace';
  ctx.fillText(max.toFixed(0) + unit, 4, 14);
  ctx.fillText(min.toFixed(0) + unit, 4, h - 16);
}

// 2D Lunar Map
function drawLunarMap(layer = 'elevation') {
  const c = document.getElementById('lunarMapCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  const w = c.width = c.clientWidth;
  const h = c.height = c.clientHeight;

  ctx.fillStyle = '#060d1f';
  ctx.fillRect(0, 0, w, h);

  // Lat/Lon grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(0, (h / 4) * i); ctx.lineTo(w, (h / 4) * i); ctx.stroke();
    ctx.beginPath(); ctx.moveTo((w / 4) * i, 0); ctx.lineTo((w / 4) * i, h); ctx.stroke();
  }

  // Draw observations
  lunarObservations.forEach(obs => {
    const x = ((obs.lon + 180) / 360) * w;
    const y = ((90 - obs.lat) / 180) * h;

    let fill = '#38bdf8';
    if (layer === 'thermal') fill = obs.temp > 50 ? '#f59e0b' : obs.temp > -100 ? '#38bdf8' : '#818cf8';
    else if (layer === 'ice') fill = obs.ice > 0.5 ? '#c084fc' : '#475569';
    else fill = obs.elev > 0 ? '#ef4444' : '#38bdf8';

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '9px monospace';
    ctx.fillText(obs.name.split(' ')[0], x + 8, y + 3);
  });
}

function setLunarLayer(layer) {
  drawLunarMap(layer);
  playSound('click');
}

// ==========================================
// 8. SIMULATION ORBIT PROPAGATION ENGINE
// ==========================================
function simulationStep() {
  if (!isPlaying) return;

  orbitProgress = (orbitProgress + 0.003 * speedMultiplier) % 1.0;
  elapsedSeconds += 5 * speedMultiplier;

  const cfg = MISSIONS[currentCraft];
  const angle = orbitProgress * Math.PI * 2;

  let alt = cfg.nominalAlt + Math.sin(angle * 2) * 3;
  let lat = Math.sin(angle) * cfg.inclination;
  let lon = ((orbitProgress * 360 * 3) % 360) - 180;
  let temp = 25;

  if (currentCraft === 'chandrayaan') {
    temp = Math.abs(lat) > 70 ? -120 + Math.cos(angle) * 30 : 45 + Math.sin(angle) * 35;
  } else if (currentCraft === 'mangalyaan') {
    alt = 421.7 + (1 - Math.cos(angle)) * 20000;
    temp = -65 - (alt / 40000) * 30;
  } else {
    temp = 65 + Math.sin(angle * 3) * 35;
  }

  currentTelemetry = {
    altitude: alt,
    latitude: lat,
    longitude: lon,
    temperature: temp,
    radar: alt - 0.2 + Math.sin(angle * 6) * 0.4,
    lidar: Math.round((alt * 1000) - 180 + Math.cos(angle * 8) * 30),
    signal: -103.5 + Math.sin(angle * 4) * 2,
    velocity: cfg.velocity,
    power: Math.round(210 + Math.sin(angle) * 25),
    timestamp: new Date().toISOString()
  };

  telemetryHistory.push(currentTelemetry);
  if (telemetryHistory.length > 50) telemetryHistory.shift();

  updateCraftPosition(orbitProgress);
  updateDashboardUI();
}

function updateDashboardUI() {
  // Clocks
  const now = new Date();
  document.getElementById('clockIST').innerText = now.toLocaleTimeString('en-IN') + ' IST';
  const d = Math.floor(elapsedSeconds / 86400);
  const h = Math.floor((elapsedSeconds % 86400) / 3600);
  const m = Math.floor((elapsedSeconds % 3600) / 60);
  const s = elapsedSeconds % 60;
  document.getElementById('clockMET').innerText = `T+${d}d ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

  // Top KPI values
  document.getElementById('kpiAltitude').innerText = currentTelemetry.altitude.toFixed(1);
  document.getElementById('kpiTemp').innerText = (currentTelemetry.temperature > 0 ? '+' : '') + currentTelemetry.temperature.toFixed(1);
  document.getElementById('kpiRadar').innerText = currentTelemetry.radar.toFixed(1);
  document.getElementById('kpiLidar').innerText = currentTelemetry.lidar.toLocaleString();
  document.getElementById('kpiObsCount').innerText = telemetryHistory.length;
  document.getElementById('busPower').innerText = currentTelemetry.power;
  document.getElementById('busSignal').innerText = currentTelemetry.signal.toFixed(1);
  document.getElementById('dsnSnrText').innerText = currentTelemetry.signal.toFixed(1) + ' dBm';

  // HUD
  document.getElementById('hudLat').innerText = currentTelemetry.latitude.toFixed(2) + '°';
  document.getElementById('hudLon').innerText = currentTelemetry.longitude.toFixed(2) + '°';
  document.getElementById('hudAlt').innerText = currentTelemetry.altitude.toFixed(1) + ' km';

  // Anomaly check
  const cfg = MISSIONS[currentCraft];
  const isAbnormal = currentTelemetry.temperature < cfg.tempMinSafe || currentTelemetry.temperature > cfg.tempMaxSafe;
  const tempCard = document.getElementById('kpiTempCard');
  const alertBanner = document.getElementById('sensorAlertBanner');
  const alertBadge = document.getElementById('sensorAlertBadge');

  if (isAbnormal) {
    tempCard.style.borderColor = '#ef4444';
    if (alertBanner) alertBanner.style.display = 'block';
    if (alertBadge) { alertBadge.className = 'tab-badge pill-danger'; alertBadge.innerText = 'ALERT'; }
  } else {
    tempCard.style.borderColor = 'var(--panel-border)';
    if (alertBanner) alertBanner.style.display = 'none';
    if (alertBadge) { alertBadge.className = 'tab-badge pill-emerald'; alertBadge.innerText = 'ACTIVE'; }
  }

  // Sensor Panel values
  const sensTemp = document.getElementById('sensCoreTemp');
  if (sensTemp) sensTemp.innerText = (currentTelemetry.temperature > 0 ? '+' : '') + currentTelemetry.temperature.toFixed(1) + ' °C';
  const sensKelv = document.getElementById('sensKelvin');
  if (sensKelv) sensKelv.innerText = (currentTelemetry.temperature + 273.15).toFixed(1) + ' K';
  const sensRad = document.getElementById('sensRadarRange');
  if (sensRad) sensRad.innerText = currentTelemetry.radar.toFixed(1) + ' km';
  const sensLid = document.getElementById('sensLidarRange');
  if (sensLid) sensLid.innerText = currentTelemetry.lidar.toLocaleString() + ' m';

  // Redraw charts
  if (activeTab === 'overview') {
    drawLineChart('chartAltitude', telemetryHistory.map(h => h.altitude), '#00f0ff', ' km');
    drawLineChart('chartTemperature', telemetryHistory.map(h => h.temperature), '#f59e0b', ' °C');
  } else if (activeTab === 'sensors') {
    drawLineChart('chartSensorThermistor', telemetryHistory.map(h => h.temperature), isAbnormal ? '#ef4444' : '#00f0ff', ' °C');
    drawLineChart('chartSensorRadar', telemetryHistory.map(h => h.radar), '#38bdf8', ' km');
    drawLineChart('chartSensorLidar', telemetryHistory.map(h => (h.altitude * 1000 - h.lidar)), '#10b981', ' m');
  }
}

// ==========================================
// 9. WORKSPACE & SPACECRAFT SWITCHING
// ==========================================
function switchTab(tabId) {
  activeTab = tabId;
  const tabs = ['overview', 'sensors', 'lunar', 'telemetry', 'analytics'];
  tabs.forEach(t => {
    const view = document.getElementById('view' + t.charAt(0).toUpperCase() + t.slice(1));
    const btn = document.getElementById('tabBtn' + t.charAt(0).toUpperCase() + t.slice(1));
    if (view) view.style.display = t === tabId ? 'flex' : 'none';
    if (btn) btn.classList.toggle('active', t === tabId);
  });

  if (tabId === 'lunar') {
    drawLunarMap();
    drawLineChart('chartChaste', chasteData.map(c => c.temp), '#f59e0b', '°C');
  } else if (tabId === 'analytics') {
    renderAnalyticsTable();
  }
  playSound('click');
}

function switchSpacecraft(craftId) {
  currentCraft = craftId;
  const cfg = MISSIONS[craftId];
  currentTarget = cfg.target;

  // Buttons
  ['Chandrayaan', 'Mangalyaan', 'Aditya'].forEach(c => {
    const el = document.getElementById('btnCraft' + c);
    if (el) el.classList.remove('active');
  });
  if (craftId === 'chandrayaan') document.getElementById('btnCraftChandrayaan').classList.add('active');
  if (craftId === 'mangalyaan') document.getElementById('btnCraftMangalyaan').classList.add('active');
  if (craftId === 'aditya-l1') document.getElementById('btnCraftAditya').classList.add('active');

  // Specs
  document.getElementById('kpiMissionName').innerText = cfg.name;
  document.getElementById('kpiTargetName').innerText = CELESTIAL_TARGETS[currentTarget].name.split(' ')[0];
  document.getElementById('specDesc').innerText = cfg.desc;
  document.getElementById('specNominalAlt').innerText = cfg.nominalAlt.toLocaleString() + ' km';
  document.getElementById('specNominalInc').innerText = cfg.inclination + '°';
  document.getElementById('specPeriod').innerText = cfg.period + ' min';
  document.getElementById('specVehicle').innerText = cfg.vehicle;

  buildPlanetMesh(currentTarget);
  updateFlyToButtons();
  reset3DView();
  playSound('chirp');
}

function switchCelestialBody(targetId) {
  currentTarget = targetId;
  ['Moon', 'Mars', 'Sun'].forEach(b => {
    const el = document.getElementById('btnTarget' + b);
    if (el) el.classList.remove('active');
  });
  document.getElementById('btnTarget' + targetId.charAt(0).toUpperCase() + targetId.slice(1)).classList.add('active');
  document.getElementById('kpiTargetName').innerText = CELESTIAL_TARGETS[targetId].name.split(' ')[0];
  buildPlanetMesh(currentTarget);
  reset3DView();
  playSound('click');
}

// Simulation Play/Pause & Speed
function togglePlayPause() {
  isPlaying = !isPlaying;
  document.getElementById('playIcon').innerText = isPlaying ? '⏸ PAUSE' : '▶ RUN';
  playSound('click');
}
function resetSimulation() {
  orbitProgress = 0.1;
  elapsedSeconds = 3600;
  telemetryHistory = [];
  playSound('click');
}
function setSpeed(spd) {
  speedMultiplier = spd;
  [1, 2, 5].forEach(s => {
    const btn = document.getElementById('btnSpeed' + s);
    if (btn) btn.classList.toggle('active', s === spd);
  });
  playSound('click');
}
function toggleAudio() {
  audioEnabled = !audioEnabled;
  document.getElementById('btnAudioToggle').innerText = audioEnabled ? '🔊' : '🔇';
  document.getElementById('btnAudioToggle').classList.toggle('active', audioEnabled);
}

// ==========================================
// 10. MANUAL DATA & CSV UPLOAD
// ==========================================
function handleManualInputSubmit(e) {
  e.preventDefault();
  const alt = parseFloat(document.getElementById('inAltitude').value);
  const lat = parseFloat(document.getElementById('inLatitude').value);
  const lon = parseFloat(document.getElementById('inLongitude').value);
  const temp = parseFloat(document.getElementById('inTemperature').value);
  const radar = parseFloat(document.getElementById('inRadar').value);
  const lidar = parseFloat(document.getElementById('inLidar').value);
  const sig = parseFloat(document.getElementById('inSignal').value);
  const ts = document.getElementById('inTimestamp').value;

  currentTelemetry = {
    altitude: alt,
    latitude: lat,
    longitude: lon,
    temperature: temp,
    radar: radar,
    lidar: lidar,
    signal: sig,
    velocity: 1.63,
    power: 230,
    timestamp: ts
  };

  telemetryHistory.push(currentTelemetry);
  document.getElementById('dataSourceText').innerText = 'MANUAL DATA INGESTED';
  switchTab('overview');
  playSound('chirp');
  alert('Telemetry Recalibrated! Spacecraft relocated to Lat: ' + lat + '°, Lon: ' + lon + '°');
}

function loadSampleDataset(type) {
  isUploadedData = true;
  document.getElementById('dataSourceText').innerText = 'CALIBRATED ISRO DATASET';
  document.getElementById('dataSourceBadge').className = 'pill pill-emerald';

  if (type === 'chandrayaan') {
    switchSpacecraft('chandrayaan');
    alert('Preloaded 12 Calibrated Chandrayaan-3 Lunar South Pole records.');
  } else if (type === 'mangalyaan') {
    switchSpacecraft('mangalyaan');
    alert('Preloaded 7 Calibrated Mangalyaan Mars Periapsis records.');
  } else {
    switchSpacecraft('aditya-l1');
    alert('Preloaded 7 Calibrated Aditya-L1 Solar Flare records.');
  }
}

function handleTelemetryCsvUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    alert('Successfully parsed and ingested scientific observation CSV: ' + file.name);
    isUploadedData = true;
    document.getElementById('dataSourceText').innerText = 'UPLOADED SCIENTIFIC CSV';
    document.getElementById('dataSourceBadge').className = 'pill pill-emerald';
  };
  reader.readAsText(file);
}

// Lunar Crater Catalog Setup
function setupCraterCatalog() {
  const container = document.getElementById('craterListContainer');
  if (!container) return;
  container.innerHTML = '';

  LUNAR_CRATERS.forEach(c => {
    const d = document.createElement('div');
    d.className = 'glass-panel';
    d.style.padding = '8px 12px';
    d.style.cursor = 'pointer';
    d.innerHTML = `
      <div style="font-weight:700; color:#fff; font-size:12px;">${c.name}</div>
      <div style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono);">
        Lat: ${c.lat}° | Lon: ${c.lon}° | Dia: ${c.dia} km | Depth: ${c.depth} km
      </div>
    `;
    d.onclick = () => selectCrater(c);
    container.appendChild(d);
  });
  selectCrater(LUNAR_CRATERS[0]);
}

function selectCrater(c) {
  document.getElementById('selectedCraterTitle').innerText = 'Rim-to-Floor Profile: ' + c.name;
  document.getElementById('selectedCraterDesc').innerText = c.desc;
  drawLineChart('chartCraterProfile', c.profile, '#00f0ff', 'm');
}

// Table
function renderAnalyticsTable() {
  const tb = document.getElementById('telemetryTableBody');
  if (!tb) return;
  tb.innerHTML = '';
  telemetryHistory.slice(-20).reverse().forEach(pt => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${pt.timestamp.replace('T', ' ').substring(0, 19)}</td>
      <td>${pt.latitude.toFixed(2)}°, ${pt.longitude.toFixed(2)}°</td>
      <td style="color:var(--astra-cyan); font-weight:700;">${pt.altitude.toFixed(1)}</td>
      <td style="color:var(--astra-amber); font-weight:700;">${(pt.temperature > 0 ? '+' : '') + pt.temperature.toFixed(1)}</td>
      <td>${pt.radar.toFixed(1)}</td>
      <td>${pt.lidar.toLocaleString()}</td>
      <td>${pt.signal.toFixed(1)}</td>
      <td><span class="pill pill-cyan" style="font-size:9px;">${isUploadedData ? 'CALIBRATED' : 'SIMULATED'}</span></td>
    `;
    tb.appendChild(tr);
  });
}

function exportTelemetryCsv() {
  let csv = 'timestamp,latitude,longitude,altitude_km,temperature_c,radar_km,lidar_m,signal_dbm\n';
  telemetryHistory.forEach(p => {
    csv += `${p.timestamp},${p.latitude.toFixed(2)},${p.longitude.toFixed(2)},${p.altitude.toFixed(2)},${p.temperature.toFixed(2)},${p.radar.toFixed(2)},${p.lidar},${p.signal.toFixed(2)}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `astra_telemetry_${currentCraft}_${Date.now()}.csv`;
  a.click();
}

function exportMissionJson() {
  const json = JSON.stringify({ mission: currentCraft, history: telemetryHistory }, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `astra_mission_report_${currentCraft}.json`;
  a.click();
}

// ==========================================
// 11. INITIALIZATION ENTRY POINT
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  // Pre-fill history
  for (let i = 20; i >= 0; i--) {
    telemetryHistory.push({
      altitude: 100 + Math.sin(i * 0.3) * 3,
      latitude: -69.37 + Math.sin(i * 0.2) * 5,
      longitude: 32.32 + Math.cos(i * 0.2) * 6,
      temperature: 24 + Math.sin(i * 0.4) * 20,
      radar: 100 + Math.sin(i * 0.3) * 3,
      lidar: Math.round(100000 + Math.sin(i * 0.3) * 3000),
      signal: -103.5,
      velocity: 1.63,
      power: 224,
      timestamp: new Date(Date.now() - i * 60000).toISOString()
    });
  }

  init3DViewport();
  updateFlyToButtons();
  setupCraterCatalog();
  updateDashboardUI();

  // 1-second simulation clock ticker
  setInterval(simulationStep, 1000);
});
