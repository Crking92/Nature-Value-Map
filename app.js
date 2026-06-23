
const CLASSES = [{"id": "native_prairie", "label": "Prairie / wildflower meadow", "short_label": "Prairie", "icon": "🌼", "plain": "A mostly native open area with grasses and wildflowers.", "value_per_acre_year": 1941, "usd_year": 2021, "confidence": "Strong", "source_id": "tx_am_aec_2025_grassland", "simple_note": "Best choice for restored Blackland Prairie, no-mow native meadows, and seeded conservation areas."}, {"id": "wetland", "label": "Wetland / pond edge", "short_label": "Wetland", "icon": "💧", "plain": "A soggy or seasonally wet place that slows water and supports wetland plants.", "value_per_acre_year": 18948, "usd_year": 2021, "confidence": "Strong", "source_id": "tx_am_aec_2025_wetland", "simple_note": "Use only where the site really has wetland or wet-soil function."}, {"id": "forest", "label": "Woodland / forest", "short_label": "Woodland", "icon": "🌳", "plain": "An upland area mostly covered by trees.", "value_per_acre_year": 12589, "usd_year": 2021, "confidence": "Moderate", "source_id": "fema_2022_forest", "simple_note": "Useful for wooded areas, but this is a national fallback value."}, {"id": "riparian_forest", "label": "Creekside woods", "short_label": "Creekside woods", "icon": "🏞️", "plain": "Trees along a creek, drainage, river, or floodplain.", "value_per_acre_year": 37199, "usd_year": 2021, "confidence": "Moderate", "source_id": "fema_2022_riparian_forest", "simple_note": "Use only for wooded creek corridors or floodplain forest."}, {"id": "non_native_grass", "label": "Mostly non-native grass", "short_label": "Exotic grass", "icon": "🌾", "plain": "A grassy area dominated by introduced or exotic grasses.", "value_per_acre_year": 930, "usd_year": 2024, "confidence": "Moderate", "source_id": "ecometrics_2024_native_non_native", "simple_note": "Best available Texas value for non-native grass cover."}, {"id": "turf_estimate", "label": "Mowed turf field", "short_label": "Turf", "icon": "🏟️", "plain": "A regularly mowed lawn, field, or turf area.", "value_per_acre_year": 930, "usd_year": 2024, "confidence": "Draft estimate", "source_id": "turf_estimate_from_non_native_grass", "simple_note": "No clean Central Texas turf ecosystem-service value was found. This starting estimate uses the non-native grass value and can be changed if the user has better local data."}, {"id": "rural_green_open_space", "label": "Other open green land", "short_label": "Other open land", "icon": "🟩", "plain": "A vegetated open area that is not clearly prairie, wetland, forest, or turf.", "value_per_acre_year": 10632, "usd_year": 2021, "confidence": "Moderate", "source_id": "fema_2022_rural_green", "simple_note": "Fallback class only. Pick a more specific category when possible."}, {"id": "urban_green_open_space", "label": "Urban green open space", "short_label": "Urban open space", "icon": "🏙️", "plain": "A broad urban green-space category.", "value_per_acre_year": 19992, "usd_year": 2021, "confidence": "Use carefully", "source_id": "tx_am_aec_2025_urban_green", "simple_note": "Broad category with overlap risk. Not recommended as the default for prairie restoration."}];
const SOURCES = Object.fromEntries([{"id": "tx_am_aec_2025_grassland", "title": "Texas A&M AgriLife / AECOM 2025 — Grasslands and Prairies", "short": "Texas-specific prairie value", "url": "https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf"}, {"id": "tx_am_aec_2025_wetland", "title": "Texas A&M AgriLife / AECOM 2025 — Wetlands", "short": "Texas-specific wetland value", "url": "https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf"}, {"id": "tx_am_aec_2025_urban_green", "title": "Texas A&M AgriLife / AECOM 2025 — Urban Green Open Space", "short": "Texas-specific urban green-space value", "url": "https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf"}, {"id": "fema_2022_forest", "title": "FEMA 2022 — Forest value, reproduced in Texas A&M/AECOM appendix", "short": "National forest fallback", "url": "https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf"}, {"id": "fema_2022_riparian_forest", "title": "FEMA 2022 — Riparian forest value, reproduced in Texas A&M/AECOM appendix", "short": "National creekside forest fallback", "url": "https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf"}, {"id": "fema_2022_rural_green", "title": "FEMA 2022 — Rural green open space value, reproduced in Texas A&M/AECOM appendix", "short": "National open-space fallback", "url": "https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf"}, {"id": "ecometrics_2024_native_non_native", "title": "EcoMetrics / Texan by Nature / EOG 2024 — Native vs non-native grass restoration", "short": "Texas native vs non-native grass comparison", "url": "https://nri.tamu.edu/media/3986/ecometrics-analysis.pdf"}, {"id": "turf_estimate_from_non_native_grass", "title": "Draft turf-field estimate based on Texas non-native grass valuation", "short": "Editable turf-field starting estimate", "url": "https://nri.tamu.edu/media/3986/ecometrics-analysis.pdf"}].map(s => [s.id, s]));
const ACRE_PER_SQ_METER = 0.00024710538146717;

let selectedClass = 'native_prairie';
let selectedQuality = 0.85;
let drawnFeature = null;
let drawnLayer = null;
let mixedMode = false;

const fmtMoney = n => {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return n.toLocaleString(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0});
};
const fmtAc = n => (isNaN(n) ? '—' : n.toLocaleString(undefined,{maximumFractionDigits:2}) + ' acres');
const getClass = id => CLASSES.find(c => c.id === id);
const getCurrentValuePerAcre = () => +document.getElementById('valuePerAcre').value || 0;

const map = L.map('map', { scrollWheelZoom: true }).setView([29.9891, -97.8772], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
const drawControl = new L.Control.Draw({
  draw: {
    polygon: { allowIntersection: false, showArea: true, shapeOptions:{ color:'#315c3a', weight:3 } },
    rectangle: { shapeOptions:{ color:'#315c3a', weight:3 } },
    polyline:false, circle:false, marker:false, circlemarker:false
  },
  edit: { featureGroup: drawnItems }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, e => {
  if (drawnLayer) drawnItems.removeLayer(drawnLayer);
  drawnLayer = e.layer;
  drawnItems.addLayer(drawnLayer);
  drawnFeature = drawnLayer.toGeoJSON();
  update();
});
map.on(L.Draw.Event.EDITED, e => {
  e.layers.eachLayer(layer => { drawnLayer = layer; drawnFeature = layer.toGeoJSON(); });
  update();
});
map.on(L.Draw.Event.DELETED, () => {
  drawnLayer = null; drawnFeature = null; update();
});

function areaAcres(){
  if (drawnFeature) return turf.area(drawnFeature) * ACRE_PER_SQ_METER;
  return parseFloat(document.getElementById('manualAcres').value) || 0;
}

function costs(acres){
  let total = 0;
  if (document.getElementById('useMowing').checked) total += acres * (+document.getElementById('mowCost').value || 0) * (+document.getElementById('mowsYear').value || 0);
  if (document.getElementById('useIrrigation').checked) total += acres * (+document.getElementById('irrigationCost').value || 0);
  if (document.getElementById('useFertilizer').checked) total += acres * (+document.getElementById('fertCost').value || 0) * (+document.getElementById('fertMonths').value || 0);
  if (document.getElementById('useInvasive').checked) total += acres * (+document.getElementById('invasiveCost').value || 0) * (+document.getElementById('invasiveCycles').value || 0);
  return total;
}

function grossValue(acres){
  if (!mixedMode) return acres * getCurrentValuePerAcre() * selectedQuality;
  let gross = 0;
  document.querySelectorAll('.mix-row').forEach(row => {
    const pct = +row.querySelector('.mix-pct').value || 0;
    const id = row.querySelector('.mix-class').value;
    const q = (+row.querySelector('.mix-quality').value || 100) / 100;
    const c = getClass(id);
    if (c && c.value_per_acre_year) gross += acres * (pct/100) * c.value_per_acre_year * q;
  });
  return gross;
}

function selectedSourceNote(){
  const c = getClass(selectedClass);
  const s = SOURCES[c.source_id] || {};
  const link = s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${s.short}</a>` : s.short;
  document.getElementById('valueNote').innerHTML = `${c.simple_note}<br><strong>Starting source:</strong> ${link}.`;
}

function update(){
  const acres = areaAcres();
  const gross = grossValue(acres);
  const cost = costs(acres);
  const net = gross - cost;
  const c = getClass(selectedClass);
  const valuePerAcre = getCurrentValuePerAcre();

  document.getElementById('heroValue').textContent = fmtMoney(net);
  document.getElementById('areaOut').textContent = fmtAc(acres);
  document.getElementById('grossOut').textContent = fmtMoney(gross);
  document.getElementById('costOut').textContent = fmtMoney(cost);
  document.getElementById('netOut').textContent = fmtMoney(net);

  if (!mixedMode) {
    let costText = cost > 0 ? ` After optional costs, the net estimate is <strong>${fmtMoney(net)} per year</strong>.` : "";
    document.getElementById('plainAnswer').innerHTML =
      `<strong>${fmtAc(acres)}</strong> of <strong>${c.label.toLowerCase()}</strong> is estimated at <strong>${fmtMoney(gross)} per year</strong> before optional costs. This uses <strong>${fmtMoney(valuePerAcre)}/acre/year</strong> and a <strong>${Math.round(selectedQuality*100)}%</strong> health score.${costText}`;
  } else {
    document.getElementById('plainAnswer').innerHTML =
      `<strong>${fmtAc(acres)}</strong> of mixed vegetation is estimated at <strong>${fmtMoney(gross)} per year</strong> before optional costs.`;
  }
}

function buildLandCards(){
  const box = document.getElementById('landCards');
  box.innerHTML = CLASSES.map(c => `
    <button type="button" class="land-card ${c.id===selectedClass?'selected':''}" data-id="${c.id}">
      <span class="icon">${c.icon}</span>
      <strong>${c.label}</strong>
      <small>${c.plain}</small>
    </button>
  `).join('');
  box.querySelectorAll('.land-card').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedClass = btn.dataset.id;
      const c = getClass(selectedClass);
      document.getElementById('valuePerAcre').value = c.value_per_acre_year;
      document.querySelectorAll('.land-card').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSourceNote();
      update();
    });
  });
}

function buildMixRows(){
  const wrap = document.getElementById('mixRows');
  const options = CLASSES.map(c => `<option value="${c.id}">${c.label}</option>`).join('');
  wrap.innerHTML = [70,20,10].map((pct, i) => `
    <div class="mix-row">
      <input class="mix-pct" type="number" value="${pct}" aria-label="percent cover">
      <select class="mix-class">${options}</select>
      <input class="mix-quality" type="number" value="${i===0?85:70}" aria-label="quality percent">
    </div>
  `).join('');
  const selects = wrap.querySelectorAll('.mix-class');
  if (selects[0]) selects[0].value = 'native_prairie';
  if (selects[1]) selects[1].value = 'turf_estimate';
  if (selects[2]) selects[2].value = 'riparian_forest';
}

function buildSources(){
  const list = document.getElementById('sourceList');
  list.innerHTML = Object.values(SOURCES).map(s => `
    <li><strong>${s.short}</strong><br>${s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${s.title}</a>` : s.title}</li>
  `).join('');
}

document.getElementById('qualitySlider').addEventListener('input', e => {
  selectedQuality = (+e.target.value || 0) / 100;
  document.getElementById('qualityText').textContent = e.target.value + '%';
  document.querySelectorAll('.quality').forEach(b => b.classList.remove('selected'));
  update();
});
document.querySelectorAll('.quality').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedQuality = +btn.dataset.quality;
    document.getElementById('qualitySlider').value = Math.round(selectedQuality*100);
    document.getElementById('qualityText').textContent = Math.round(selectedQuality*100) + '%';
    document.querySelectorAll('.quality').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    update();
  });
});
document.querySelector('.advanced').addEventListener('toggle', e => {
  mixedMode = e.target.open;
  update();
});
document.getElementById('clearBtn').addEventListener('click', () => {
  drawnItems.clearLayers();
  drawnLayer = null;
  drawnFeature = null;
  update();
});
document.addEventListener('input', update);
document.addEventListener('change', update);

buildLandCards();
buildMixRows();
buildSources();
selectedSourceNote();
update();
