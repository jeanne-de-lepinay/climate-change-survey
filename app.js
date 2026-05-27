// ═══════════════════════════════════════════════════════════════════════════
// app.js — Survey results page rendering
// Edit this file to change chart logic, filters, or add new features.
// Depends on: data.js (window.SD), Chart.js
// ═══════════════════════════════════════════════════════════════════════════

// ── Manual editorial config ────────────────────────────────────────────────
// Edit CLUSTER_PROFILES when the cluster analysis is rerun and profiles shift.
// CLUSTER_PROFILES — edit only the narrative fields (tagline, drive, resonates).
// The desc field is generated automatically from SD.clustering.cluster_stats at render time.
// Run generate_data.py to update n, q8_mean, pct_serious after new data.
var CLUSTER_PROFILES = window.CLUSTER_PROFILES = [
  { id: 0, name: 'Committed Believer', color: '#1e7a52',
    tagline: 'Alarmed, hopeful, and ready to act',
    drive: 'Their conviction and hope coexist — they have accepted the science and found a way to remain motivated rather than paralysed. They worry intensely, stay informed, and feel a genuine sense of personal agency.',
    resonates: 'Takes their concern seriously without preaching. Concrete actions, measurable commitments, and honest acknowledgement of the travel tension.' },
  { id: 1, name: 'Strained Believer', color: '#c1440e',
    tagline: 'Fully convinced — but emotionally exhausted',
    drive: 'Their conviction is as strong as any other profile, but it has become a weight. The perceived gap between their own alarm and the world around them is self-reinforcing and draining.',
    resonates: 'Solidarity before strategy. Show them others share their concern. Bounded, achievable actions matter most — not grand-scale calls.' },
  { id: 2, name: 'Uncertain Moderate', color: '#2d6a8f',
    tagline: 'Engaged and willing — but not fully convinced',
    drive: 'Epistemically careful, not disengaged. Their uncertainty about causation is genuine and coexists with real personal concern.',
    resonates: 'Epistemic openness paired with a clear action rationale. Avoid claiming more certainty than they have reached.' },
  { id: 3, name: 'Disengaged Skeptic', color: '#6b3fa0',
    tagline: 'Unconvinced, unmoved, and not seeking engagement',
    drive: 'A settled alternative worldview — climate is natural and cyclical. They are aware they are in the minority onboard but remain unswayed.',
    resonates: 'Direct persuasion is unlikely to land. Nature and biodiversity are entry points that work on their own terms.' },
];

// Build desc dynamically from cluster_stats so it never goes stale
(function() {
  const stats = SD.clustering && SD.clustering.cluster_stats;
  if (!stats) return;
  CLUSTER_PROFILES.forEach(p => {
    const s = stats[String(p.id)];
    if (!s) return;
    const serious = s.pct_serious;
    const seriousLabel = serious >= 90 ? `${serious}% serious believers`
                       : serious >= 50 ? `${serious}% partial believers`
                       : serious > 0   ? `${serious}% consider climate change serious`
                       :                 'No respondents selected "serious human-caused problem"';
    p.desc = `${seriousLabel} · Worry ${s.q8_mean}/10 · Willingness ${s.q7_mean}/5 · n=${s.n}`;
  });
})();

// Q11 open comments — category counts/labels updated manually after reading comments.
// totalSubstantive and totalBlank are computed automatically from SD (data.js).
const Q11 = {
  get totalSubstantive() { return SD.survey.all.q11 ? SD.survey.all.q11.substantive : 0; },
  get totalBlank()        { return SD.survey.all.q11 ? SD.survey.all.q11.blank        : 0; },
  counts: [28, 21, 18, 17, 16, 12, 8, 7],
  labels: [
    'Political inaction & government/corporate failure',
    'Need for education, science literacy & awareness',
    'Individual responsibility & lifestyle choices',
    'Call for awareness & collective action',
    'Skepticism or uncertainty — natural cycle framing',
    'Concern for future generations',
    'Personal conflict — travel, hypocrisy & individual limits',
    'Doubts about green tech & unintended consequences',
  ],
};

// Set GLANCE_OVERRIDE = true and fill GLANCE_CUSTOM to override the computed
// at-a-glance stats with custom wording.
const GLANCE_OVERRIDE = false;
const GLANCE_CUSTOM = [];

// ── State ──────────────────────────────────────────────────────────────────
let activeFilter = 'all';   // 'all' | 'cruise1' | 'cruise2' | 'cruise3'
let chartInstances = {};    // Chart.js instances keyed by canvas id
var SD = window.SD;

function getD() { return SD.survey[activeFilter]; }

// ── Colour palette ─────────────────────────────────────────────────────────
const C = {
  teal: '#2a6049', teal2: '#4a9070', teal3: '#7bbfa0',
  amber: '#c8773a', amber2: '#e09a5a',
  red: '#8b3a3a', red2: '#c05a5a', red3: '#e08a8a',
  blue: '#3a5e8b', blue2: '#5a80b5', blue3: '#8aaad5',
  plum: '#6b4c8b', grey: '#9a9490', grey2: '#c8c4be',
};

Chart.defaults.font.family = "'Inter',sans-serif";
Chart.defaults.color = '#3d3d5c';

function pctOf(val, n) { return (val / n * 100).toFixed(1); }
function normalPDF(x, mean, sd) { return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / sd, 2)); }
function destroyChart(id) { if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; } }
function mkChart(id, cfg) { destroyChart(id); chartInstances[id] = new Chart(document.getElementById(id), cfg); return chartInstances[id]; }

// ── Page navigation ────────────────────────────────────────────────────────
function showPage(name) {
  if (name === 'cluster') {
    document.getElementById('page-cluster').style.display = '';
    document.body.style.overflow = 'hidden';
    document.getElementById('nav-cluster').classList.add('active');
    document.getElementById('nav-survey').classList.remove('active');
    setTimeout(function () { window.initCluster && window.initCluster(); }, 30);
  } else {
    closeCluster();
  }
}
function closeCluster() {
  document.getElementById('page-cluster').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('nav-survey').classList.add('active');
  document.getElementById('nav-cluster').classList.remove('active');
  window.scrollTo(0, 0);
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCluster(); });

// ── Demographics dropdown ──────────────────────────────────────────────────
let _demoOpen = false;

function toggleDemo() {
  const btn = document.getElementById('demoToggle');
  let dd = document.getElementById('demoDropdown');
  if (_demoOpen) {
    _demoOpen = false;
    btn.classList.remove('open');
    if (dd) dd.style.display = 'none';
    document.removeEventListener('click', demoOutsideClick);
    return;
  }
  _demoOpen = true;
  btn.classList.add('open');
  if (!dd) dd = buildDemoDropdown();
  dd.style.display = 'flex';
  positionDropdown();
  renderDemoCharts();
  setTimeout(function () { document.addEventListener('click', demoOutsideClick); }, 50);
}

// ── Manifest helper ────────────────────────────────────────────────────────
function getVesselPop() {
  if (!SD.vessel_population) return null;
  if (activeFilter === 'all') return null;
  return SD.vessel_population[activeFilter] || null;
}

function buildDemoDropdown() {
  const dm = getDemographics();
  // For individual cruises, use that cruise's manifest.
  // For 'all', never show manifest overlay (only show when ALL cruises have manifests).
  let vp = getVesselPop();
  const n  = activeFilter === 'all' ? SD.meta.total_n : (SD.meta.cruises.find(c => c.id === activeFilter) || {n: '?'}).n;
  const hasManifest = !!vp;

  // Option A: paired survey + all-guests gender bars when manifest available
  function genderBar(pct, col, opacity) {
    return `<div class="gender-bar-track"><div class="gender-bar-fill" style="width:${pct}%;background:${col};opacity:${opacity};"></div></div>`;
  }
  function genderRow(label, survPct, fillCol, vpPct) {
    const survRow = `<div style="display:flex;align-items:center;gap:8px;">${genderBar(survPct, fillCol, 1)}<div class="gender-label">${label}</div><div class="gender-pct">${survPct}%</div></div>`;
    const maniRow = hasManifest
      ? `<div style="display:flex;align-items:center;gap:8px;margin-top:2px;">${genderBar(vpPct, fillCol, 0.28)}<div style="width:70px;flex-shrink:0;"></div><div class="gender-pct" style="opacity:0.45;font-size:10px;">${vpPct}%</div></div>` : '';
    return `<div class="gender-item" style="flex-direction:column;align-items:stretch;gap:0px;">${survRow}${maniRow}</div>`;
  }
  const genderLegend = hasManifest
    ? `<div style="display:flex;gap:14px;margin-top:10px;font-size:10px;color:var(--ink-light);">
        <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:10px;height:3px;border-radius:2px;background:#4a9070;"></span>Survey respondents</span>
        <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:10px;height:3px;border-radius:2px;background:#4a9070;opacity:0.3;"></span>All guests aboard</span>
      </div>` : '';

  const dd = document.createElement('div');
  dd.className = 'demo-dropdown';
  dd.id = 'demoDropdown';
  dd.style.display = 'none';
  dd.innerHTML = `
    <div class="demo-dropdown-title">Respondent demographics · n = ${n}${hasManifest ? ` <em style="font-weight:400;font-size:12px;color:var(--ink-light);">vs. all guests (n=${vp.n})</em>` : ''}</div>
    <div class="demo-panel" style="min-width:180px;max-width:220px;">
      <div class="demo-panel-title">Gender</div>
      <div class="gender-row" style="margin-top:8px;gap:10px;">
        ${genderRow('Female',     dm.female_pct, '#4a9070', hasManifest ? vp.female_pct : null)}
        ${genderRow('Male',       dm.male_pct,   '#5a80b5', hasManifest ? vp.male_pct   : null)}
        ${!hasManifest ? genderRow('Not stated', dm.ns_pct, '#c8c4be', null) : ''}
      </div>
      ${genderLegend}
    </div>
    <div class="demo-panel" style="min-width:190px;">
      <div class="demo-panel-title">Age group (2026)</div>
      <div class="demo-chart-wrap"><canvas id="demoAge"></canvas></div>
    </div>
    <div class="demo-panel" style="min-width:300px;flex:2;">
      <div class="demo-panel-title">Region of origin</div>
      <div class="demo-chart-wrap tall"><canvas id="demoRegion"></canvas></div>
    </div>`;
  document.body.appendChild(dd);
  return dd;
}

function getDemographics() {
  if (activeFilter !== 'all' && SD.cruise_demographics && SD.cruise_demographics[activeFilter])
    return SD.cruise_demographics[activeFilter];
  return SD.demographics;
}

function renderDemoCharts() {
  const dm = getDemographics();
  const ageEl = document.getElementById('demoAge');
  const regEl = document.getElementById('demoRegion');
  if (!ageEl || !regEl) return;

  // Destroy existing instances before redrawing
  const existingAge = Chart.getChart(ageEl);
  if (existingAge) existingAge.destroy();
  const existingReg = Chart.getChart(regEl);
  if (existingReg) existingReg.destroy();

  // Age chart — survey bars + optional manifest overlay
  const ageLabels = ['<30','30–34','35–39','40–44','45–49','50–54','55–59','60–64','65–69','70–74','75–79','80+'];

  // Helper: normalise to percentages
  function toPct(arr) { const t = arr.reduce((a,b) => a+b, 0); return arr.map(v => t ? Math.round(v/t*100) : 0); }

  // Aggregate manifest age groups across all available cruises
  function getManifestAge() {
    if (!SD.vessel_population) return null;
    if (activeFilter === 'all') return null;
    const vp = SD.vessel_population[activeFilter];
    if (!vp) return null;
    return vp.age_groups_5yr;
  }

  const manifestAge = getManifestAge();
  const ageDatasets = [
    { label: 'Survey', data: toPct(dm.age_groups_5yr),
      backgroundColor: '#4a9070cc', borderRadius: 2, borderSkipped: false, borderWidth: 0 }
  ];
  if (manifestAge) {
    ageDatasets.push({
      label: 'Guests', data: toPct(manifestAge),
      backgroundColor: '#bbbbcc99', borderRadius: 2, borderSkipped: false, borderWidth: 0
    });
  }

  new Chart(ageEl, { type: 'bar',
    data: { labels: ageLabels, datasets: ageDatasets },
    options: { maintainAspectRatio: false, barPercentage: 0.85, categoryPercentage: 0.75,
      plugins: {
        legend: { display: !!manifestAge, position: 'bottom', labels: { color: '#3d3d5c', boxWidth: 10, boxHeight: 10, padding: 8, font: { size: 9, family: "'Inter',sans-serif" } } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}%` } }
      },
      scales: { y: { display: false, beginAtZero: true }, x: { grid: { display: false }, ticks: { color: '#8888aa', font: { size: 9 } }, border: { display: false } } } } });

  const regLabels = dm.regions.map(r => r[0]);
  const regData   = dm.regions.map(r => r[1]);
  const regColors = ['#7bbfa0','#4a9070','#c05a5a','#5a80b5','#e09a5a','#9b7cc0','#aaaacc','#c8c4be'];

  // Build manifest inner dataset if available.
  // For 'all', aggregate counts across all cruises that have a manifest.
  // For a specific cruise, use that cruise's manifest (or null if none).
  function getManifestRegions() {
    if (!SD.vessel_population) return null;
    if (activeFilter === 'all') return null;
    const vp = SD.vessel_population[activeFilter];
    return vp ? vp.regions : null;
  }

  const manifestRegions = getManifestRegions();
  const datasets = [];

  if (manifestRegions) {
    // Outer ring: survey respondents (slightly thinner cutout to leave room for inner)
    const survRegTotal = regData.reduce((a, b) => a + b, 0);
    datasets.push({
      data: regData,
      backgroundColor: regColors.slice(0, regLabels.length),
      borderWidth: 2, borderColor: '#ffffff', hoverOffset: 4,
      label: 'Survey'
    });
    // Inner pie: manifest guests, aligned to same region order as outer
    const maniTotal = manifestRegions.reduce((a, r) => a + r[1], 0);
    const maniMap = {};
    manifestRegions.forEach(([name, count]) => { maniMap[name] = count; });
    const maniData = regLabels.map(lbl => maniMap[lbl] || 0);
    const maniColors = regColors.slice(0, regLabels.length).map(c => c + 'aa'); // semi-transparent
    datasets.push({
      data: maniData,
      backgroundColor: maniColors,
      borderWidth: 2, borderColor: '#ffffff', hoverOffset: 0,
      label: 'Guests'
    });
  } else {
    datasets.push({
      data: regData,
      backgroundColor: regColors.slice(0, regLabels.length),
      borderWidth: 2, borderColor: '#ffffff', hoverOffset: 6,
      label: 'Survey'
    });
  }

  new Chart(regEl, { type: 'doughnut',
    data: { labels: regLabels, datasets },
    options: { maintainAspectRatio: false, cutout: manifestRegions ? '28%' : '42%', layout: { padding: { right: 0 } },
      plugins: { legend: { position: 'right', labels: { color: '#3d3d5c', boxWidth: 10, boxHeight: 10, padding: 7, font: { size: 10, family: "'Inter',sans-serif" },
        generateLabels(chart) {
          // Always label from the first (outer) dataset
          const ds = chart.data.datasets[0];
          const total = ds.data.reduce((a, b) => a + b, 0);
          return chart.data.labels.map((lbl, i) => {
            const pct = Math.round(ds.data[i] / total * 100);
            return { text: lbl + ' ' + pct + '%', fillStyle: ds.backgroundColor[i], strokeStyle: '#fff', lineWidth: 1, index: i, datasetIndex: 0 };
          });
        } } },
        tooltip: { callbacks: { label: ctx => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const pct = Math.round(ctx.parsed / total * 100);
          const type = ctx.dataset.label || '';
          return ` ${type}: ${pct}%`;
        } } } } } });
}

function updateDemoDropdown() {
  const dd = document.getElementById('demoDropdown');
  if (!dd) return;
  const wasOpen = dd.style.display !== 'none';

  // Destroy stale dropdown and rebuild from scratch with current filter's data.
  // This is the simplest way to ensure gender bars (hard-coded into innerHTML)
  // always reflect the active cruise rather than the cruise at build time.
  dd.remove();
  const fresh = buildDemoDropdown();
  if (wasOpen) {
    fresh.style.display = 'flex';
    positionDropdown();
    renderDemoCharts();
  }
}

function positionDropdown() {
  const btn = document.getElementById('demoToggle');
  const dd  = document.getElementById('demoDropdown');
  if (!dd || dd.style.display === 'none') return;
  const r   = btn.getBoundingClientRect();
  const ddW = Math.min(820, window.innerWidth - 24);
  let top  = r.bottom + 8;
  let left = r.left;
  if (left + ddW > window.innerWidth - 8) left = Math.max(8, window.innerWidth - ddW - 8);
  dd.style.top   = top  + 'px';
  dd.style.left  = left + 'px';
  dd.style.width = ddW  + 'px';
}

function demoOutsideClick(e) {
  const btn = document.getElementById('demoToggle');
  const dd  = document.getElementById('demoDropdown');
  if (btn && dd && !btn.contains(e.target) && !dd.contains(e.target)) {
    _demoOpen = false;
    btn.classList.remove('open');
    dd.style.display = 'none';
    document.removeEventListener('click', demoOutsideClick);
  }
}
window.addEventListener('scroll',  positionDropdown, { passive: true });
window.addEventListener('resize',  positionDropdown, { passive: true });

// ── Cruise filter popup ────────────────────────────────────────────────────
var _cruiseOpen = false;
function toggleCruises() { _cruiseOpen ? closeCruisePopup() : openCruisePopup(); }

function openCruisePopup() {
  _cruiseOpen = true;
  document.getElementById('cruiseChevron').style.transform = 'rotate(180deg)';
  const btn = document.getElementById('cruiseToggle');
  const r   = btn.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.id = 'cruisePopup';
  pop.style.cssText = `position:fixed;top:${r.bottom + 8}px;left:${r.left}px;z-index:99999;min-width:460px;padding:14px 18px;background:#1c2033;border-radius:10px;border:1px solid rgba(255,255,255,0.2);box-shadow:0 16px 48px rgba(0,0,0,0.85);`;

  function radioRow(filter, label, n) {
    const checked = filter === activeFilter;
    const dot = filter === 'all' ? '#5a80b5' : (n < 50 ? '#e09a5a' : '#4a9070');
    const bc = checked ? dot : 'rgba(255,255,255,0.3)';
    const bg = checked ? dot : 'transparent';
    const inner = checked ? '<div style="width:6px;height:6px;border-radius:50%;background:#fff;"></div>' : '';
    const nLbl = n !== null ? `\u00a0<em style="color:rgba(255,255,255,0.4);font-size:12px;">&middot; n\u00a0=\u00a0${n}</em>` : '';
    return `<div onclick="setCruiseFilter('${filter}',this)" data-filter="${filter}" style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:7px 4px;border-radius:6px;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background=''"><div style="width:16px;height:16px;border-radius:50%;flex-shrink:0;border:2px solid ${bc};background:${bg};display:flex;align-items:center;justify-content:center;">${inner}</div><span style="font-size:13px;color:rgba(255,255,255,0.75);line-height:1.55;">${label}</span>${nLbl}</div>`;
  }

  let rows = radioRow('all', 'Show all results', SD.meta.total_n);
  SD.meta.cruises.forEach(c => {
    const ongoing = c.n < 50 ? ' <em style="color:rgba(255,255,255,0.35);font-size:11px;">(ongoing)</em>' : '';
    rows += radioRow(c.id, c.label + ' · ' + c.dates + ongoing, c.n);
  });
  pop.innerHTML = `<div style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;">Cruises in this dataset</div>${rows}`;
  document.body.appendChild(pop);
  window.addEventListener('scroll', repositionCruisePopup, true);
  setTimeout(() => document.addEventListener('click', cruiseOutsideClick), 50);
}

function repositionCruisePopup() {
  const pop = document.getElementById('cruisePopup');
  const btn = document.getElementById('cruiseToggle');
  if (!pop || !btn) return;
  const r = btn.getBoundingClientRect();
  pop.style.top  = (r.bottom + 8) + 'px';
  pop.style.left = r.left + 'px';
}
function closeCruisePopup() {
  _cruiseOpen = false;
  document.getElementById('cruiseChevron').style.transform = '';
  document.removeEventListener('click', cruiseOutsideClick);
  window.removeEventListener('scroll', repositionCruisePopup, true);
  const p = document.getElementById('cruisePopup'); if (p) p.remove();
}
function cruiseOutsideClick(e) {
  const btn = document.getElementById('cruiseToggle');
  const pop = document.getElementById('cruisePopup');
  if (btn && !btn.contains(e.target) && pop && !pop.contains(e.target)) closeCruisePopup();
}

function setCruiseFilter(filter) {
  if (filter === activeFilter) return;
  activeFilter = filter;
  closeCruisePopup();
  openCruisePopup();

  // Small-sample warning
  const warn = document.getElementById('small-sample-warning');
  if (warn) {
    const wn = filter === 'all' ? SD.meta.total_n : ((SD.meta.cruises.find(c => c.id === filter) || { n: 0 }).n);
    warn.style.display = (filter !== 'all' && wn < 50) ? 'block' : 'none';
    const wspan = document.getElementById('small-sample-n');
    if (wspan) wspan.textContent = wn;
  }

  // Sync cluster highlight
  if (window.setHighlight) {
    filter !== 'all' ? window.setHighlight('cruise-' + filter, null) : window.setHighlight('all', null);
  }

  renderAll();
  updateDemoDropdown();
  updateTeaserCounts();
}

// ── Cluster info popup ─────────────────────────────────────────────────────
var _infoOpen = false;
function toggleClusterInfo(e) {
  e.stopPropagation();
  _infoOpen = !_infoOpen;
  const p = document.getElementById('ctcInfoPopup');
  if (p) p.classList.toggle('open', _infoOpen);
}
document.addEventListener('click', function () {
  if (_infoOpen) {
    _infoOpen = false;
    const p = document.getElementById('ctcInfoPopup');
    if (p) p.classList.remove('open');
  }
});

// ── Cluster teaser card counts ─────────────────────────────────────────────
function updateTeaserCounts() {
  const cards = document.querySelectorAll('.cluster-teaser-card');
  CLUSTER_PROFILES.forEach((p, i) => {
    const card = cards[i]; if (!card) return;
    const countEl = card.querySelector('.ctc-count'); if (!countEl) return;
    if (activeFilter === 'all') {
      const s = SD.clustering.cluster_stats[String(p.id)] || {};
      countEl.textContent = s.n || '?';
    } else {
      let n = 0;
      SD.clustering.points.forEach(pt => { if (pt.cruise === activeFilter && pt.cluster === p.id) n++; });
      countEl.textContent = n;
    }
  });
}

// ── Main render ────────────────────────────────────────────────────────────
function renderAll() {
  const d = getD();
  renderHeader(d);
  renderGlance(d);
  renderRepresentativeness();
  renderConclusions();
  renderFooter();
  renderQ1(d);
  renderQ2Q3(d);
  renderQ4Q5(d);
  renderQ6Q7(d);
  renderQ8Q9Q10(d);
  renderOverlap(d);
  renderQ11();
}

function renderHeader(d) {
  const setT = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  setT('meta-n', d.n);
  const dm = getDemographics();
  setT('meta-nationalities', (dm.n_nationalities || SD.meta.n_nationalities) + '+ countries');
  setT('meta-meanage', (dm.mean_age || SD.meta.mean_age) + ' years');

  // Languages: per-cruise when a cruise is selected, union of all when 'all'
  const langEl = document.getElementById('meta-languages');
  if (langEl) {
    if (activeFilter === 'all') {
      // Collect all unique language names across all cruises, preserving order
      const seen = new Set();
      const all  = [];
      (SD.meta.cruises || []).forEach(c => {
        if (!c.languages) return;
        c.languages.split(' · ').forEach(l => { if (!seen.has(l)) { seen.add(l); all.push(l); } });
      });
      langEl.textContent = all.join(' · ') || (SD.meta.languages || 'English');
    } else {
      const cruise = (SD.meta.cruises || []).find(c => c.id === activeFilter);
      langEl.textContent = (cruise && cruise.languages) || SD.meta.languages || 'English';
    }
  }
  const minN = Math.min(d.q4.stats.n, d.q8.stats.n, d.q9.stats.n, d.q10.stats.n);
  const maxN = Math.max(d.q4.stats.n, d.q8.stats.n);
  const mnEl = document.getElementById('method-n');
  if (mnEl) mnEl.textContent = minN === maxN ? 'n=' + minN : 'n=' + minN + '–' + maxN;
}

function renderGlance(d) {
  const row = document.querySelector('.stat-row');
  if (!row) return;
  let items;
  if (GLANCE_OVERRIDE && GLANCE_CUSTOM.length) {
    items = GLANCE_CUSTOM;
  } else {
    const pctSerious = (d.q1.data[0] / d.q1.n * 100).toFixed(1);
    const pctHopeful = (d.q2.data[0] / d.q2.n * 100).toFixed(0);
    const pctAction  = ((d.q3.data[0] + d.q3.data[1]) / d.q3.n * 100).toFixed(0);
    const q8m = d.q8.stats.mean.toFixed(2);
    const q9m = d.q9.stats.mean.toFixed(2);
    const pctWilling = ((d.q7.data[3] + d.q7.data[4]) / d.q7.stats.n * 100).toFixed(0);
    items = [
      { num: pctSerious + '%', color: 'c-teal',  desc: 'believe climate change is a serious human-caused problem' },
      { num: pctHopeful + '%', color: 'c-amber', desc: 'feel "concerned but hopeful" when hearing about climate change' },
      { num: pctAction  + '%', color: 'c-teal',  desc: 'see some damage as unavoidable but still believe meaningful action matters (Q3)' },
      { num: q8m,              color: 'c-red',   desc: `average personal worry score out of 10 — vs ${q9m} perceived for the general public` },
      { num: pctWilling + '%', color: 'c-blue',  desc: 'are willing or very willing to make major lifestyle changes (Q7 scores 4–5)' },
    ];
  }
  row.innerHTML = items.map(s => `<div class="stat-box"><div class="stat-num ${s.color}">${s.num}</div><div class="stat-desc">${s.desc}</div></div>`).join('');
}

function renderQ1(d) {
  const q1 = d.q1;
  const top = q1.data[0], n = q1.n;
  const topPct = (top / n * 100).toFixed(1);
  const denyN = q1.data[3] + q1.data[4], denyPct = (denyN / n * 100).toFixed(1);
  const uncertN = q1.data[1] + q1.data[2], uncertPct = (uncertN / n * 100).toFixed(0);
  const el = document.getElementById('q1-interp');
  if (el) el.innerHTML = `Only ${denyN} respondents (${denyPct}%) outright deny or minimise climate change ("overstated" or "not happening"). A further ${uncertPct}% — ${uncertN} respondents — acknowledge climate change as real but express uncertainty about its human causes or scale. The remaining ${(top / n * 100).toFixed(0)}% are unambiguous: a serious, human-caused problem.`;
  const bigNum = document.getElementById('q1-bignum'); if (bigNum) bigNum.textContent = topPct + '%';
  const noteEl = document.getElementById('q1-note');   if (noteEl) noteEl.textContent = `Single choice · ${n} respondents`;
  const labels = ['Serious human-caused problem', 'Real but causes/impacts uncertain', 'Happening regardless of humans', 'Overstated', 'Not happening'];
  destroyChart('q1Chart');
  makeDonut('q1Chart', labels, q1.data.slice(0, 5), [C.teal, C.blue2, C.amber2, C.amber, C.red], n);
}

function renderQ2Q3(d) {
  const q2 = d.q2, q3 = d.q3;
  const e2 = document.getElementById('q2-note'); if (e2) e2.textContent = `Single choice · ${q2.n} respondents`;
  const e3 = document.getElementById('q3-note'); if (e3) e3.textContent = `Single choice · ${q3.n} respondents`;
  const q2labels = ['Concerned but hopeful', 'Concerned but overwhelmed', 'Hopeless / nothing\ncan be done', 'Skeptical / annoyed', 'Positive / not too\nconcerned', 'Neutral / Detached'];
  const q3labels = ['Tech solutions', 'Action reduces harm', 'Some damage\nunavoidable', 'Already\ntoo late', 'Humans cannot\naffect it', 'Unsure'];
  destroyChart('q2Chart'); makeDonut('q2Chart', q2labels, q2.data, [C.teal, C.amber, C.red, C.teal3, C.amber2, C.grey], q2.n);
  destroyChart('q3Chart'); makeDonut('q3Chart', q3labels, q3.data.slice(0, 6), [C.blue2, C.teal, C.teal2, C.red, C.red2, C.grey], q3.n);
}

function renderQ4Q5(d) {
  const q4 = d.q4, q5 = d.q5;
  const e4 = document.getElementById('q4-note'); if (e4) e4.textContent = `Scale: 1 = Never → 5 = Always · ${q4.stats.n} respondents`;
  const e5 = document.getElementById('q5-note'); if (e5) e5.textContent = `Single choice · ${q5.n} respondents`;
  const q4cols   = [C.teal, C.teal3, C.amber2, C.amber, C.red];
  const q4labels = ['1 – Never', '2', '3', '4', '5 – Always'];
  makeLikert('q4bar', 'q4legend', q4labels.map((l, i) => ({ label: l, val: q4.data[i], color: q4cols[i] })));
  destroyChart('q4Chart'); makeColumn('q4Chart', q4labels, q4.data, q4cols, q4.stats.n);
  const q5cols   = [C.teal, C.teal2, C.grey, C.grey2, C.blue3, C.amber2, C.amber];
  const q5labels = ['Concerned\n& reflective', 'Separate from\nchoices', 'Neutral /\nDetached', 'No particular\nfeeling', 'Not thought\nabout it', 'Uncomfortable', 'Skeptical /\nirritaed'];
  const q5full   = ['Concerned & reflective', 'Concerned but separate', 'Uncomfortable / avoid', 'Neutral / detached', 'Skeptical / irritated', 'No particular feeling', 'Never thought about it'];
  makeLikert('q5bar', 'q5legend', q5full.map((l, i) => ({ label: l, val: q5.data[i], color: q5cols[i] })));
  destroyChart('q5Chart'); makeColumn('q5Chart', q5labels, q5.data, q5cols, q5.n);
}

function renderQ6Q7(d) {
  const q6 = d.q6, q7 = d.q7;
  const e6 = document.getElementById('q6-note'); if (e6) e6.textContent = `Scale: 1 = Very unlikely → 5 = Very likely · ${q6.stats.n} respondents`;
  const e7 = document.getElementById('q7-note'); if (e7) e7.textContent = `Scale: 1 = Very unwilling → 5 = Very willing · ${q7.stats.n} respondents`;
  const q6cols = [C.red, C.amber, C.amber2, C.teal3, C.teal];
  makeLikert('q6bar', 'q6legend', ['1 – Very unlikely', '2', '3', '4', '5 – Very likely'].map((l, i) => ({ label: l, val: q6.data[i], color: q6cols[i] })));
  destroyChart('q6Chart'); makeColumn('q6Chart', ['1', '2', '3', '4', '5'], q6.data, q6cols, q6.stats.n);
  const q7cols = [C.red, C.red3, C.amber2, C.teal3, C.teal];
  makeLikert('q7bar', 'q7legend', ['1 – Very unwilling', '2', '3', '4', '5 – Very willing'].map((l, i) => ({ label: l, val: q7.data[i], color: q7cols[i] })));
  destroyChart('q7Chart'); makeColumn('q7Chart', ['1', '2', '3', '4', '5'], q7.data, q7cols, q7.stats.n);
}

function renderQ8Q9Q10(d) {
  const q8 = d.q8.stats, q9 = d.q9.stats, q10 = d.q10.stats;
  function setStrip(qKey, cls, st) {
    const strip = document.getElementById(qKey + '-strip'); if (!strip) return;
    const shapes = { q8: 'High-end', q9: 'Balanced', q10: 'High-leaning' };
    strip.innerHTML = `
      <div class="stat-strip-item"><div class="stat-strip-label">Mean</div><div class="stat-strip-val ${cls}">${st.mean != null ? st.mean.toFixed(2) : '—'}</div></div>
      <div class="stat-strip-item"><div class="stat-strip-label">Median</div><div class="stat-strip-val ${cls}">${st.median != null ? st.median.toFixed(1) : '—'}</div></div>
      <div class="stat-strip-item"><div class="stat-strip-label">Std Dev</div><div class="stat-strip-val" style="color:var(--ink-mid)">${st.sd.toFixed(2)}</div></div>
      <div class="stat-strip-item"><div class="stat-strip-label">Mode</div><div class="stat-strip-val" style="color:var(--ink-mid)">${st.mode}</div></div>
      <div class="stat-strip-item"><div class="stat-strip-label">Shape</div><div class="stat-strip-val" style="color:var(--ink-mid)">${shapes[qKey] || '—'}</div></div>`;
  }
  setStrip('q8', 'c-teal', q8); setStrip('q9', 'c-blue', q9); setStrip('q10', 'c-amber', q10);
  const e8 = document.getElementById('q8-cardnote'); if (e8) e8.textContent = `Scale: 1 = Not at all worried → 10 = Extremely worried · ${q8.n} respondents`;
  const e9 = document.getElementById('q9-cardnote'); if (e9) e9.textContent = `Scale: 1 = Not at all worried → 10 = Extremely worried · ${q9.n} respondents`;
  const e10 = document.getElementById('q10-cardnote'); if (e10) e10.textContent = `Scale: 1 = Not at all worried → 10 = Extremely worried · ${q10.n} respondents`;
  const high9or10 = d.q8.data[8] + d.q8.data[9];
  const high9or10pct = (high9or10 / q8.n * 100).toFixed(1);
  const gap_self_pub = (q8.mean - q9.mean).toFixed(2);
  const gap_guest_pub = (q10.mean - q9.mean).toFixed(2);
  const gap_self_guest = (q8.mean - q10.mean).toFixed(2);
  const n8 = document.getElementById('q8-note'); if (n8) n8.innerHTML = `<strong>Responses cluster strongly at the high end.</strong> ${high9or10pct}% scored 9 or 10, and the tail extends far to the left — very few respondents reported low concern. The fitted curve shows how far this distribution departs from a symmetric bell shape, reflecting the intense personal concern of those who chose to travel to polar regions.`;
  const n9 = document.getElementById('q9-note'); if (n9) n9.innerHTML = `<strong>The most balanced distribution of the three.</strong> Responses spread relatively evenly around the middle — mean and median both around ${q9.mean.toFixed(1)} — with no strong pull toward either end. Respondents perceive the general public as considerably less concerned than themselves: a gap of ${gap_self_pub} points on average.`;
  const n10 = document.getElementById('q10-note'); if (n10) n10.innerHTML = `<strong>Responses lean toward the higher end,</strong> peaking at ${q10.mode} with a longer tail toward lower scores. Fellow guests are rated as more climate-aware than the general public (+${gap_guest_pub} points on average), yet still ${gap_self_guest} points below respondents' own worry level.`;
  destroyChart('q8Chart'); makeHistogram('q8Chart', { counts: d.q8.data, ...q8 }, C.teal);
  destroyChart('q9Chart'); makeHistogram('q9Chart', { counts: d.q9.data, ...q9 }, C.blue);
  destroyChart('q10Chart'); makeHistogram('q10Chart', { counts: d.q10.data, ...q10 }, C.amber);
}

function renderOverlap(d) {
  const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const pct = (arr, n) => arr.map(v => parseFloat((v / n * 100).toFixed(1)));
  const q8 = d.q8, q9 = d.q9, q10 = d.q10;
  destroyChart('overlapChart');
  mkChart('overlapChart', { type: 'line',
    data: { labels, datasets: [
      { label: `Q8 – Personal worry (μ = ${q8.stats.mean.toFixed(2)})`, data: pct(q8.data, q8.stats.n), borderColor: C.teal,  backgroundColor: C.teal + '22',  borderWidth: 3, fill: true, tension: 0.45, pointRadius: 5, pointBackgroundColor: '#fff', pointBorderColor: C.teal,  pointBorderWidth: 2, pointHoverRadius: 7 },
      { label: `Q10 – Fellow guests (μ = ${q10.stats.mean.toFixed(2)})`, data: pct(q10.data, q10.stats.n), borderColor: C.amber, backgroundColor: C.amber + '1a', borderWidth: 3, borderDash: [6,3], fill: true, tension: 0.45, pointRadius: 5, pointBackgroundColor: '#fff', pointBorderColor: C.amber, pointBorderWidth: 2, pointHoverRadius: 7 },
      { label: `Q9 – General public (μ = ${q9.stats.mean.toFixed(2)})`,  data: pct(q9.data, q9.stats.n),  borderColor: C.blue,  backgroundColor: C.blue + '16',  borderWidth: 3, borderDash: [3,3], fill: true, tension: 0.45, pointRadius: 5, pointBackgroundColor: '#fff', pointBorderColor: C.blue,  pointBorderWidth: 2, pointHoverRadius: 7 },
    ] },
    options: { maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 24, boxHeight: 3, padding: 16, font: { size: 12 } } },
        tooltip: { callbacks: { label: ctx => { const name = ctx.dataset.label.split('–')[0].trim(); return ` ${name}: ${ctx.parsed.y}% of respondents`; } } } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, title: { display: true, text: '% of respondents', font: { size: 11 } }, ticks: { callback: v => v + '%' } },
        x: { grid: { display: false }, title: { display: true, text: '← Not at all worried                                                          Extremely worried →', font: { size: 11 } } }
      }
    }
  });
  const nov = document.getElementById('overlap-note');
  if (nov) {
    const gap_sp = (q8.stats.mean - q9.stats.mean).toFixed(2);
    const gap_gp = (q10.stats.mean - q9.stats.mean).toFixed(2);
    const gap_sg = (q8.stats.mean - q10.stats.mean).toFixed(2);
    nov.innerHTML = `A clear <strong>worry gap</strong> emerges across the three groups. Personal concern (teal) clusters heavily at the high end (μ = ${q8.stats.mean.toFixed(2)}). Perceived public concern (blue) sits ${gap_sp} points lower (μ = ${q9.stats.mean.toFixed(2)}) and is the most symmetrical distribution. Perceived guest concern (amber) falls in between (μ = ${q10.stats.mean.toFixed(2)}) — respondents see their fellow travellers as more climate-aware than the average person (+${gap_gp} points), but not as intensely concerned as themselves (−${gap_sg} points). This three-tier structure remains consistent across all ${getD().n} respondents${activeFilter !== 'all' ? ' in this cruise' : ''}.`;
  }
}

function renderQ11() {
  const e = document.getElementById('q11-note');
  if (e) e.textContent = `${Q11.totalSubstantive} substantive comments · ${Q11.totalBlank} respondents left blank · some comments span multiple categories · full dataset only`;
  destroyChart('q11Chart');
  mkChart('q11Chart', { type: 'bar',
    data: { labels: Q11.labels, datasets: [{ data: Q11.counts, backgroundColor: [C.teal, C.teal2, C.red, C.red2, C.amber, C.plum, C.blue, C.teal3], borderRadius: 6, borderSkipped: false }] },
    options: { maintainAspectRatio: false, indexAxis: 'y',
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.x} comment${ctx.parsed.x !== 1 ? 's' : ''} mention this theme` } } },
      scales: { x: { grid: { color: 'rgba(0,0,0,0.05)' }, title: { display: true, text: `Number of comments (${Q11.totalSubstantive} total · some span multiple categories · full dataset only)`, font: { size: 11 } }, ticks: { stepSize: 1 } },
        y: { grid: { display: false }, ticks: { font: { size: 12 }, autoSkip: false } } }
    }
  });
}

// ── Chart helpers ──────────────────────────────────────────────────────────
function makeDonut(id, labels, data, colors, n) {
  const pctPlugin = { afterDraw(chart) {
    const ctx = chart.ctx;
    const ds  = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);
    meta.data.forEach(function (arc, i) {
      const pct = (ds.data[i] / n * 100);
      if (pct < 4) return;
      const pos = arc.tooltipPosition();
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.font = "600 11px 'Inter',sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pct.toFixed(0) + '%', pos.x, pos.y);
      ctx.restore();
    });
  } };
  mkChart(id, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2.5, borderColor: '#fff', hoverOffset: 10 }] },
    options: { cutout: '54%',
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 11, boxHeight: 11, padding: 10, font: { size: 11 },
        generateLabels: function (chart) {
          const ds = chart.data.datasets[0];
          return chart.data.labels.map(function (lbl, i) {
            const pct = (ds.data[i] / n * 100).toFixed(1);
            return { text: lbl + ' — ' + pct + '%', fillStyle: ds.backgroundColor[i], strokeStyle: '#fff', lineWidth: 1, index: i };
          });
        }
      } },
        tooltip: { callbacks: { label: function (ctx) { return ' ' + ctx.parsed + ' respondents (' + (ctx.parsed / n * 100).toFixed(1) + '%)'; } } }
      }
    },
    plugins: [pctPlugin]
  });
}

function makeLikert(barId, legendId, segs) {
  const bar = document.getElementById(barId), leg = document.getElementById(legendId);
  if (!bar || !leg) return;
  bar.innerHTML = ''; leg.innerHTML = '';
  const total = segs.reduce((s, d) => s + d.val, 0);
  segs.forEach(d => {
    const pct = d.val / total * 100;
    const seg = document.createElement('div'); seg.className = 'likert-seg';
    seg.style.flex = pct.toFixed(2); seg.style.background = d.color;
    if (pct > 9) seg.textContent = pct.toFixed(0) + '%';
    bar.appendChild(seg);
    leg.innerHTML += `<div class="likert-legend-item"><div class="likert-dot" style="background:${d.color}"></div>${d.label}: ${d.val}</div>`;
  });
}

function makeColumn(id, labels, data, colors, n) {
  mkChart(id, { type: 'bar',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderRadius: 5, borderSkipped: false }] },
    options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y} (${(ctx.parsed.y / n * 100).toFixed(1)}%)` } } },
      scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { stepSize: 5 } }, x: { grid: { display: false }, ticks: { font: { size: 11 } } } } }
  });
}

function makeHistogram(id, d, color) {
  const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const bellData = labels.map((_, i) => parseFloat((normalPDF(i + 1, d.mean, d.sd) * d.n).toFixed(3)));
  const meanPlugin = { afterDatasetsDraw(chart) {
    const { ctx, scales: { x, y } } = chart;
    const sdL = x.getPixelForValue(Math.max(0, d.mean - d.sd - 1));
    const sdR = x.getPixelForValue(Math.min(9, d.mean + d.sd - 1));
    ctx.save(); ctx.fillStyle = color + '22'; ctx.fillRect(sdL, y.top, sdR - sdL, y.bottom - y.top);
    const mx = x.getPixelForValue(d.mean - 1);
    ctx.setLineDash([5, 4]); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.globalAlpha = 0.9;
    ctx.beginPath(); ctx.moveTo(mx, y.top + 20); ctx.lineTo(mx, y.bottom); ctx.stroke();
    ctx.setLineDash([]); ctx.globalAlpha = 1; ctx.fillStyle = color;
    ctx.font = "600 11px 'Inter',sans-serif"; ctx.textAlign = 'center';
    ctx.fillText('μ = ' + d.mean.toFixed(2), mx, y.top + 14); ctx.restore();
  } };
  mkChart(id, { type: 'bar',
    data: { labels, datasets: [
      { type: 'bar',  label: 'Observed responses', data: d.counts, backgroundColor: color + 'bb', borderColor: color, borderWidth: 1.5, borderRadius: 5, borderSkipped: false, order: 2 },
      { type: 'line', label: 'Fitted normal curve', data: bellData, borderColor: color, borderWidth: 2.5, borderDash: [7, 4], pointRadius: 4, pointBackgroundColor: '#fff', pointBorderColor: color, pointBorderWidth: 2, pointHoverRadius: 6, fill: false, tension: 0.42, order: 1 }
    ] },
    options: { maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 20, boxHeight: 3, padding: 14, font: { size: 11 } } },
        tooltip: { mode: 'index', intersect: false, callbacks: { label: ctx => { if (ctx.datasetIndex === 0) return ` Observed: ${ctx.parsed.y} (${(ctx.parsed.y / d.n * 100).toFixed(1)}%)`; return ` Normal curve: ${ctx.parsed.y.toFixed(2)}`; } } } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, title: { display: true, text: 'Number of respondents', font: { size: 11 } } },
        x: { grid: { display: false }, title: { display: true, text: '← Not at all worried                                                          Extremely worried →', font: { size: 11 } } }
      }
    },
    plugins: [meanPlugin]
  });
}


// ── Representativeness accordion ─────────────────────────────────────────────
// Renders as a collapsed <details> accordion (same style as methodology section).
// Always shown; when 'all' is selected, aggregates available manifests and
// adds a note that not all cruise manifests are available yet.
function renderRepresentativeness() {
  const slot = document.getElementById('repr-card-slot');
  if (!slot) return;

  const dm = getDemographics();

  // Build the vp object: for a specific cruise use its manifest,
  // for 'all' aggregate all available manifests.
  // Only show for individual cruises that have a manifest.
  if (activeFilter === 'all') { slot.innerHTML = ''; return; }
  const vp = SD.vessel_population && SD.vessel_population[activeFilter];
  if (!vp) { slot.innerHTML = ''; return; }
  const vpNote = '';

  const survN = activeFilter === 'all' ? SD.meta.total_n : (SD.meta.cruises.find(c => c.id === activeFilter) || {n: 0}).n;
  const partRate = Math.round(survN / vp.n * 100);

  const ageDiff = dm.mean_age - vp.mean_age;
  const ageTxt = ageDiff === 0 ? 'identical to all guests'
    : `${Math.abs(ageDiff)} year${Math.abs(ageDiff) !== 1 ? 's' : ''} ${ageDiff > 0 ? 'older' : 'younger'} than all guests aboard`;

  const fDiff = dm.female_pct - vp.female_pct;
  const gTxt = Math.abs(fDiff) <= 2 ? 'closely matches the full manifest'
    : `women are ${Math.abs(fDiff)}pp ${fDiff > 0 ? 'over' : 'under'}-represented vs. all guests`;

  const survRegMap = {};
  (dm.regions || []).forEach(r => { survRegMap[r[0]] = r[1]; });
  const vpRegTotal  = vp.regions.reduce((s, r) => s + r[1], 0);
  const survRegTotal = (dm.regions || []).reduce((s, r) => s + r[1], 0);

  const regionRows = vp.regions.map(r => {
    const rName  = r[0];
    const vpPct  = Math.round(r[1] / vpRegTotal * 100);
    const survCount = survRegMap[rName] || 0;
    const survPct   = survRegTotal ? Math.round(survCount / survRegTotal * 100) : 0;
    const diff = survPct - vpPct;
    const diffTxt = diff === 0 ? '' : `<span style="font-size:10px;color:${diff > 0 ? 'var(--teal)' : 'var(--red2)'};">${diff > 0 ? '+' : ''}${diff}pp</span>`;
    return `<div style="display:grid;grid-template-columns:1fr 44px 44px 36px;gap:6px;align-items:center;font-size:12px;padding:5px 0;border-bottom:1px solid var(--rule);">
      <div style="color:var(--ink-mid);">${rName}</div>
      <div style="text-align:right;font-weight:600;color:var(--ink);">${survPct}%</div>
      <div style="text-align:right;color:var(--ink-light);">${vpPct}%</div>
      <div style="text-align:right;">${diffTxt}</div>
    </div>`;
  }).join('');

  slot.innerHTML = `
    <details class="intro-details" style="margin-bottom:4px;">
      <summary>Representativeness</summary>
      <div class="intro-details-body">
        ${vpNote ? `<p style="color:var(--ink-mid);font-style:italic;">${vpNote}</p>` : ''}
        <p>
          ${survN} of ${vp.n} guests completed the survey — a <strong>${partRate}% participation rate</strong>.
          Survey respondents are on average <strong>${ageTxt}</strong> (μ = ${dm.mean_age} vs. ${vp.mean_age} in the manifest).
          On gender, ${gTxt} (${dm.female_pct}% female in survey vs. ${vp.female_pct}% aboard).
        </p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start;margin-top:4px;">
          <div>
            <div class="intro-subhead">Gender</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${['Female','Male'].map((lbl, i) => {
                const survPct = i === 0 ? dm.female_pct : dm.male_pct;
                const vpPct   = i === 0 ? vp.female_pct  : vp.male_pct;
                const col     = i === 0 ? '#4a9070' : '#5a80b5';
                return `<div>
                  <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--ink-mid);margin-bottom:2px;">
                    <span>${lbl}</span>
                    <span>Survey <strong>${survPct}%</strong> · Guests <strong>${vpPct}%</strong></span>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:2px;">
                    <div style="height:6px;background:var(--rule);border-radius:3px;overflow:hidden;"><div style="height:100%;width:${survPct}%;background:${col};border-radius:3px;"></div></div>
                    <div style="height:6px;background:var(--rule);border-radius:3px;overflow:hidden;"><div style="height:100%;width:${vpPct}%;background:${col};opacity:0.3;border-radius:3px;"></div></div>
                  </div>
                </div>`;
              }).join('')}
            </div>
            <div style="display:flex;gap:14px;margin-top:8px;font-size:10px;color:var(--ink-light);">
              <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:12px;height:3px;border-radius:2px;background:#4a9070;"></span>Survey respondents</span>
              <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:12px;height:3px;border-radius:2px;background:#4a9070;opacity:0.3;"></span>All guests aboard</span>
            </div>
          </div>

          <div>
            <div class="intro-subhead">Region</div>
            <div style="display:grid;grid-template-columns:1fr 44px 44px 36px;gap:6px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-light);padding-bottom:4px;border-bottom:2px solid var(--rule);">
              <div></div><div style="text-align:right;">Survey</div><div style="text-align:right;">Guests</div><div style="text-align:right;">Δ</div>
            </div>
            ${regionRows}
            <div style="font-size:10px;color:var(--ink-light);margin-top:8px;font-style:italic;">Δ = survey % minus manifest %. Positive = over-represented in survey.</div>
          </div>
        </div>
      </div>
    </details>`;
}

// ── Cluster teaser cards (built once on load) ──────────────────────────────
(function () {
  const wrap = document.getElementById('cluster-teaser-profiles'); if (!wrap) return;
  const stats = SD.clustering.cluster_stats;
  const metricDefs  = [['8.5', 'Personal worry'], ['8.39', 'Personal worry'], ['6.65', 'Personal worry'], ['2.12', 'Personal worry']];
  const willingDefs = ['4.35', '4.04', '3.92', '2.0'];
  wrap.innerHTML = CLUSTER_PROFILES.map((p, i) => {
    const s = stats[String(p.id)] || {};
    const pct = s.n ? Math.round(s.n / SD.clustering.points.length * 100) + '%' : '';
    return `<div class="cluster-teaser-card" style="--c:${p.color}">
      <div class="ctc-header"><div class="ctc-count">${s.n || '?'}</div><div class="ctc-badge">${pct}</div></div>
      <div class="ctc-name">${p.name}</div>
      <div class="ctc-tagline">${p.tagline || ''}</div>
      <div class="ctc-metrics">
        <div class="ctc-metric"><div class="ctc-metric-val">${metricDefs[i][0]}<span style="font-size:10px;font-weight:400;opacity:.6">/10</span></div><div class="ctc-metric-lbl">${metricDefs[i][1]}</div></div>
        <div class="ctc-metric"><div class="ctc-metric-val">${willingDefs[i]}<span style="font-size:10px;font-weight:400;opacity:.6">/5</span></div><div class="ctc-metric-lbl">Willingness to act</div></div>
      </div>
      <div class="ctc-drive">${p.drive || ''}</div>
    </div>`;
  }).join('');
})();


// ── Conclusions ────────────────────────────────────────────────────────────────
function renderConclusions() {
  const d    = SD.survey.all;
  const g    = SD.glance;
  const cs   = SD.clustering && SD.clustering.cluster_stats;
  const q11  = d.q11 || {};
  const n    = SD.meta.total_n;
  const nCruises = SD.meta.cruises.length;

  // Cluster shorthands
  const c0 = cs && cs["0"], c1 = cs && cs["1"], c2 = cs && cs["2"], c3 = cs && cs["3"];
  const c0pct = c0 ? Math.round(c0.n / n * 100) : 0;

  // Worry gap values
  const q8m  = d.q8.stats.mean ? d.q8.stats.mean.toFixed(2) : "—";
  const q9m  = d.q9.stats.mean ? d.q9.stats.mean.toFixed(2) : "—";
  const q10m = d.q10.stats.mean ? d.q10.stats.mean.toFixed(2) : "—";
  const gapSP  = (d.q8.stats.mean && d.q9.stats.mean)  ? (d.q8.stats.mean  - d.q9.stats.mean).toFixed(2)  : "—";
  const gapGP  = (d.q10.stats.mean && d.q9.stats.mean) ? (d.q10.stats.mean - d.q9.stats.mean).toFixed(2)  : "—";
  const gapSG  = (d.q8.stats.mean && d.q10.stats.mean) ? (d.q8.stats.mean  - d.q10.stats.mean).toFixed(2) : "—";

  // Top Q11 comment category (from hardcoded Q11 labels/counts)
  const topCatCount = Q11.counts ? Math.max(...Q11.counts) : null;
  const topCatLabel = (Q11.counts && Q11.labels)
    ? Q11.labels[Q11.counts.indexOf(topCatCount)]
    : null;

  const cruiseWord = nCruises === 1 ? "cruise" : "cruises";

  // ── Paragraph 1: Strong consensus
  const p1el = document.getElementById("conclusion-1-text");
  if (p1el && c0 && c1) {
    p1el.innerHTML =
      `With <strong>${n}</strong> respondents across <strong>${nCruises} ${cruiseWord}</strong>, ` +
      `<strong>${g.pct_serious}%</strong> see climate change as a serious human-caused problem ` +
      `and personal worry averages <strong>${q8m}/10</strong>. ` +
      `The cluster analysis reveals the largest group (n=${c0.n}, ${c0pct}%) are ` +
      `<em>${CLUSTER_PROFILES[0] ? CLUSTER_PROFILES[0].name : "Committed Believers"}</em> — ` +
      `highly alarmed, hopeful and willing to act. ` +
      `A smaller but intense group (n=${c1.n} <em>${CLUSTER_PROFILES[1] ? CLUSTER_PROFILES[1].name + "s" : "Strained Believers"}</em>) ` +
      `shares equally high worry but skews overwhelmed or hopeless. ` +
      `The line between them is not about belief — it is about whether they still see change as possible.`;
  }

  // ── Paragraph 2: Hope vs exhaustion
  const p2el = document.getElementById("conclusion-2-text");
  if (p2el && c0 && c1 && c2) {
    p2el.innerHTML =
      `Both the <em>${CLUSTER_PROFILES[0] ? CLUSTER_PROFILES[0].name : "Committed Believer"}</em> (n=${c0.n}) ` +
      `and <em>${CLUSTER_PROFILES[1] ? CLUSTER_PROFILES[1].name : "Strained Believer"}</em> (n=${c1.n}) profiles ` +
      `score above 8/10 on personal worry and include over 85% serious believers. ` +
      `What separates them is outlook: ${CLUSTER_PROFILES[0] ? CLUSTER_PROFILES[0].name + "s" : "Committed Believers"} remain hopeful ` +
      `and willing to act (Q7 mean: ${c0.q7_mean}/5), while ` +
      `${CLUSTER_PROFILES[1] ? CLUSTER_PROFILES[1].name + "s" : "Strained Believers"} skew overwhelmed, hopeless or skeptical ` +
      `(Q7 mean: ${c1.q7_mean}/5). ` +
      `The <em>${CLUSTER_PROFILES[2] ? CLUSTER_PROFILES[2].name : "Uncertain Moderate"}</em> group (n=${c2.n}) ` +
      `spans those uncertain about human causes alongside partial believers — ` +
      `still registering substantial personal worry (${c2.q8_mean}/10) and openness to action, ` +
      `a nuanced position that resists simple "denier" framing.`;
  }

  // ── Paragraph 3: Worry gap
  const p3el = document.getElementById("conclusion-3-text");
  if (p3el) {
    const topCatStr = (topCatLabel && topCatCount)
      ? ` ${topCatLabel.split("&")[0].trim()} is the top theme in open comments (${topCatCount} mentions), with` +
        ` respondents highlighting the gap between personal alarm and collective response.`
      : "";
    p3el.innerHTML =
      `Respondents place their own personal concern at <strong>${q8m}/10</strong> — ` +
      `<strong>${gapSP}</strong> points above where they rate the general public (${q9m}/10). ` +
      `Fellow guests are seen as more aware than the public (+${gapGP} points, ${q10m}/10), ` +
      `but still ${gapSG} points below respondents' own alarm. ` +
      `This three-tier structure is consistent across all ${nCruises} ${cruiseWord} and all ${n} respondents.` +
      topCatStr;
  }
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const n        = SD.meta.total_n;
  const nCruises = SD.meta.cruises.length;
  const langs    = SD.meta.languages || "English";
  const cruiseWord = nCruises === 1 ? "cruise" : "cruises";
  el.textContent =
    `Survey: "How do you feel about climate change?" · ${n} respondents across ${nCruises} ${cruiseWord} · ` +
    `Paper & online surveys in ${langs} · HX Expeditions · Study conducted by Jeanne de Lépinay`;
}

// ── Initial render ─────────────────────────────────────────────────────────
renderAll();
