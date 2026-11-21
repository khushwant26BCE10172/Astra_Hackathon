# ASTRA – Space Mission Explorer (Stand-alone Web Edition)
### Interactive Spacecraft Simulation & Planetary Data Analysis Platform

This is a complete, self-contained, zero-dependency web application built in **simplified HTML5, CSS3, and JavaScript**. 
The entire package is **less than 100 KB** (no `node_modules`, no npm install required) and is ready to host immediately anywhere on the web.

---

## 📁 Package Contents

* `index.html` — The main application interface containing all 5 workspaces, mission control telemetry, and canvas elements.
* `style.css` — High-performance dark aerospace theme with responsive glassmorphism and neon HUD aesthetics.
* `app.js` — Core application logic including procedural 3D planetary rendering (Moon, Mars, Sun), Keplerian orbital mechanics, 2D charts, Web Audio API sound effects, and CSV data parser.
* `server.js` — Optional zero-dependency 25-line local server using Node's standard library.

---

## 🌐 How to Host & Deploy (Anywhere)

### 1. GitHub Pages (100% Free)
1. Create a GitHub repository and push these files into it.
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your website is live in 60 seconds at `https://<your-username>.github.io/<repo-name>/`.

### 2. Netlify / Vercel (Instant Drag & Drop)
1. Log into [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
2. Drag and drop this folder directly into the Netlify "Deploy" dropzone.
3. Your web app is live on a global CDN instantly!

### 3. Local Computer (Double-Click or Local Server)
* **Direct Browser:** Simply double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.
* **Or with Node:** Run `node server.js` and open `http://localhost:3000/`.
* **Or with Python:** Run `python -m http.server 3000` and open `http://localhost:3000/`.

---

## 🚀 Key Features Included

1. **Spacecraft Switching:**
   * **Chandrayaan-3 / 2:** Lunar polar exploration (TMC-2, ChaSTE, DFSAR, LASA LiDAR). Target: Moon.
   * **Mangalyaan (MOM):** Mars interplanetary elliptical science (MCC, MENCA, TIS). Target: Mars.
   * **Aditya-L1:** Sun-Earth L1 halo orbit solar observatory (VELC, SUIT, ASPEX). Target: Sun.

2. **3D Interactive Celestial Models:**
   * **Moon:** Realistic Maria (Oceanus Procellarum, Mare Imbrium), Tycho crater ray system, Shackleton Crater, and Shiv Shakti Point.
   * **Mars:** Olympus Mons volcano & caldera, Valles Marineris canyon rift system, Syrtis Major, and North/South polar ice caps.
   * **Sun:** Dynamic photosphere granulation, limb darkening, magnetic active sunspots (AR3664), and coronal halo.
   * **Controls:** 360° drag rotation, right-click/pan drag, scroll zoom down to surface level, on-screen zoom buttons, and "Fly To" quick landmark navigation.

3. **Sensor Dashboard:**
   * **Thermistor (RTD PT-1000):** Real-time Celsius readout, thermal variation chart, and safe-corridor alerts.
   * **Radar Altimeter & SAR:** Active microwave pulse sounding, two-way echo delay, and 2D terrain elevation sweep.
   * **Laser LiDAR (LASA):** 50 Hz laser ranging, surface height, and along-track topographic elevation profile.

4. **Dedicated Chandrayaan Lunar Analysis Module:**
   * 2D Mercator observation map with DEM, Thermal, and Water-Ice PSR layers.
   * ChaSTE in-situ subsurface thermal gradient probe graph.
   * Lunar crater catalog (Shiv Shakti Point, Shackleton, Tycho, Clavius) with 2D rim-to-floor topographic cross-sections.
   * Ingest and analyze public Chandrayaan CSV datasets.

5. **Telemetry Ingestion & Simulation Controller:**
   * Manual flight parameter entry form with "Run Simulation With Entered Data" button.
   * Ingest external CSV scientific files.
   * One-click preloaded sample datasets for Chandrayaan-3, Mangalyaan, and Aditya-L1.

6. **Mission Flight Logs & Analytics:**
   * Multi-parameter cross-correlation analysis.
   * Searchable raw telemetry table.
   * Export to CSV and Mission Report JSON.

---
*Developed for ASTRA – Space Mission Explorer | ISRO Homage Edition*
