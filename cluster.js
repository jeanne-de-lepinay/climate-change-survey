// ═══════════════════════════════════════════════════════════════════════════
// cluster.js — PCA scatter plot visualisation
// Depends on: data.js (window.SD), window.CLUSTER_PROFILES (from app.js)
// Called via: window.initCluster() after the overlay is shown.
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────────────
  var inited = false;
  var PROF = [];   // profile objects [{id,name,color,desc,tagline,drive}, ...]
  var PTS  = [];   // data points
  var CTRS = [];   // cluster centres
  var W = 0, H = 0;
  var scale, offX, offY;
  var highlightMode = 'all';
  var activeCluster = null;

  var NAT_ANZ    = ['Australia','New Zealand','Australian'];
  var NAT_EU     = ['Germany','Switzerland','Netherlands','The Netherlands','France',
                    'Belgium','Sweden','Norway','Denmark','Finland','Austria','Luxembourg',
                    'Spain','Italy','Portugal','Poland','Turkey'];
  var NAT_NA     = ['United States','Canada','USA','US','Mexico'];
  var NAT_UK     = ['United Kingdom','Ireland','UK'];
  var NAT_ASIA   = ['India','Japan','South Korea','Singapore','Thailand','Indonesia',
                    'Jordan','Israel','UAE','Saudi Arabia','Egypt'];

  // ── Coordinate helpers ────────────────────────────────────────────────────
  function computeTransform() {
    if (!PTS.length) return;
    var xs = PTS.map(function (p) { return p.x; });
    var ys = PTS.map(function (p) { return p.y; });
    var minX = Math.min.apply(null, xs) - 1.5, maxX = Math.max.apply(null, xs) + 1.5;
    var minY = Math.min.apply(null, ys) - 1.5, maxY = Math.max.apply(null, ys) + 1.5;
    var dW = maxX - minX, dH = maxY - minY;
    scale = Math.min((W - 80) / dW, (H - 80) / dH);
    offX  = (W - dW * scale) / 2 - minX * scale;
    offY  = (H + dH * scale) / 2 + minY * scale;
  }

  function sx(x) { return x * scale + offX; }
  function sy(y) { return -y * scale + offY; }

  // ── Colour helper ─────────────────────────────────────────────────────────
  function hexToRgba(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  // ── Highlight filter ──────────────────────────────────────────────────────
  function isLit(p) {
    switch (highlightMode) {
      case 'all':           return true;
      case 'female':        return p.gender === 'Female';
      case 'male':          return p.gender === 'Male';
      case 'young':         return p.age !== null && p.age < 50;
      case 'old':           return p.age !== null && p.age >= 60;
      case 'region-anz':    return NAT_ANZ.indexOf(p.nationality) >= 0;
      case 'region-europe': return NAT_EU.indexOf(p.nationality)  >= 0;
      case 'region-us':     return NAT_NA.indexOf(p.nationality)  >= 0;
      case 'region-uk':     return NAT_UK.indexOf(p.nationality)  >= 0;
      case 'region-china':  return p.nationality === 'China';
      case 'region-other':  return NAT_ASIA.indexOf(p.nationality) >= 0;
      default:
        if (highlightMode.indexOf('cruise-') === 0)
          return p.cruise === highlightMode.slice(7);
        return true;
    }
  }

  // ── Draw ──────────────────────────────────────────────────────────────────
  function draw() {
    var canvas = document.getElementById('clusterCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!W || !H) return;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (var v = -10; v <= 10; v += 2) {
      ctx.beginPath(); ctx.moveTo(sx(v), sy(-10)); ctx.lineTo(sx(v), sy(10)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sx(-10), sy(v)); ctx.lineTo(sx(10), sy(v)); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(sx(-11), sy(0)); ctx.lineTo(sx(11), sy(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx(0), sy(-9)); ctx.lineTo(sx(0), sy(9)); ctx.stroke();

    // Axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.font = '11px system-ui,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('→ Worry + Belief', sx(9), sy(0) - 10);
    ctx.textAlign = 'left';
    ctx.fillText('↑ Concern for others', sx(0) + 6, sy(7));

    // Cluster zone ellipses
    for (var ci = 0; ci < PROF.length; ci++) {
      if (activeCluster !== null && activeCluster !== ci) continue;
      var pts = PTS.filter(function (p) { return p.cluster === ci; });
      if (!pts.length) continue;
      var cxs = pts.map(function (p) { return sx(p.x); });
      var cys = pts.map(function (p) { return sy(p.y); });
      var cx = cxs.reduce(function (a, b) { return a + b; }, 0) / cxs.length;
      var cy = cys.reduce(function (a, b) { return a + b; }, 0) / cys.length;
      var rx = Math.max.apply(null, cxs.map(function (x) { return Math.abs(x - cx); })) + 22;
      var ry = Math.max.apply(null, cys.map(function (y) { return Math.abs(y - cy); })) + 22;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(PROF[ci].color, 0.07);
      ctx.fill();
    }

    // Points — dim pass then bright pass
    for (var pass = 0; pass < 2; pass++) {
      for (var pi = 0; pi < PTS.length; pi++) {
        var p = PTS[pi];
        var lit = isLit(p) && (activeCluster === null || activeCluster === p.cluster);
        if (pass === 0 && lit)  continue;
        if (pass === 1 && !lit) continue;
        var alpha = lit ? 0.95 : 0.1;
        var rad   = lit ? 7 : 5;
        ctx.beginPath();
        ctx.arc(sx(p.x), sy(p.y), rad, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(PROF[p.cluster].color, alpha);
        ctx.fill();
        if (lit) {
          ctx.strokeStyle = 'rgba(255,255,255,0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,0.65)';
          ctx.font = '9px system-ui,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(p.id, sx(p.x), sy(p.y) - 10);
        }
      }
    }

    // Cluster centres (× markers)
    for (var ki = 0; ki < CTRS.length; ki++) {
      if (activeCluster !== null && activeCluster !== ki) continue;
      if (!PROF[ki]) continue;
      var cx2 = sx(CTRS[ki].x), cy2 = sy(CTRS[ki].y), s2 = 9;
      ctx.strokeStyle = PROF[ki].color;
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx2 - s2, cy2 - s2); ctx.lineTo(cx2 + s2, cy2 + s2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx2 + s2, cy2 - s2); ctx.lineTo(cx2 - s2, cy2 + s2); ctx.stroke();
      ctx.fillStyle = PROF[ki].color;
      ctx.font = 'bold 11px system-ui,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('P' + (ki + 1), cx2 + 12, cy2 + 4);
    }
  }

  // ── Resize ────────────────────────────────────────────────────────────────
  function resize() {
    var canvas = document.getElementById('clusterCanvas');
    if (!canvas || !inited) return;
    var wrap = document.getElementById('clusterCanvasWrap');
    void wrap.offsetHeight;
    var rect = wrap.getBoundingClientRect();
    W = Math.round(rect.width);
    H = Math.round(rect.height);
    if (W < 100 || H < 100) {
      var sidebar = wrap.nextElementSibling;
      W = window.innerWidth - (sidebar ? (sidebar.offsetWidth || 280) : 280);
      H = window.innerHeight;
    }
    if (W < 100 || H < 100) return;
    canvas.width  = W;
    canvas.height = H;
    computeTransform();
    draw();
  }
  window.addEventListener('resize', resize);

  // ── Tooltip ───────────────────────────────────────────────────────────────
  function setupTooltip() {
    var canvas = document.getElementById('clusterCanvas');
    var tip    = document.getElementById('clusterTip');
    if (!canvas || !tip) return;

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top)  * (H / rect.height);
      var closest = null, minD = 20;
      for (var i = 0; i < PTS.length; i++) {
        var d = Math.hypot(sx(PTS[i].x) - mx, sy(PTS[i].y) - my);
        if (d < minD) { minD = d; closest = PTS[i]; }
      }
      if (closest) {
        var pf = PROF[closest.cluster] || {};
        tip.style.display = 'block';
        tip.innerHTML =
          '<div style="margin-bottom:5px"><span class="tid">' + closest.id + '</span>'
          + ' <span class="tcluster" style="background:' + hexToRgba(pf.color, 0.2) + ';color:' + pf.color
          + ';border:1px solid ' + hexToRgba(pf.color, 0.4) + '">P' + (closest.cluster + 1) + '</span></div>'
          + '<div class="trow">Nationality: <span>' + (closest.nationality || '—') + '</span></div>'
          + '<div class="trow">Age: <span>' + (closest.age || '?') + '</span> · Gender: <span>' + (closest.gender || '?') + '</span></div>'
          + '<div class="trow">Q8 Personal worry: <span>' + (closest.q8 != null ? closest.q8 + '/10' : '?') + '</span>'
          + ' · Q7 Willingness: <span>' + (closest.q7 != null ? closest.q7 + '/5' : '?') + '</span></div>'
          + '<div class="trow" style="margin-top:4px;color:#888;font-size:0.9em">' + (closest.q1 || '').substring(0, 55) + '…</div>'
          + '<div class="trow" style="color:#888;font-size:0.9em">' + (closest.q2 || '').substring(0, 50) + '</div>';
        var tipW = 230, tipH = 140;
        var tx = mx + 14, ty = my - 20;
        if (tx + tipW > W) tx = mx - tipW - 14;
        if (ty + tipH > H) ty = H - tipH - 10;
        if (ty < 0) ty = 10;
        tip.style.left = tx + 'px';
        tip.style.top  = ty + 'px';
      } else {
        tip.style.display = 'none';
      }
    });

    canvas.addEventListener('mouseleave', function () {
      var tip = document.getElementById('clusterTip');
      if (tip) tip.style.display = 'none';
    });
  }

  // ── Build legend ──────────────────────────────────────────────────────────
  function buildLegend() {
    var el = document.getElementById('clusterLegend');
    if (!el) return;
    el.innerHTML = '';
    PROF.forEach(function (p, i) {
      var n = PTS.filter(function (pt) { return pt.cluster === i; }).length;
      var div = document.createElement('div');
      div.className = 'legend-item active';
      div.id = 'leg-' + i;
      div.innerHTML =
        '<div class="legend-dot" style="background:' + p.color + '"></div>'
        + '<div class="legend-text"><strong>P' + (i + 1) + ': ' + p.name + '</strong>'
        + '<br>' + p.desc + '<br><span class="count">' + n + ' respondents</span></div>';
      div.addEventListener('click', function () {
        var wasActive = (activeCluster === i);
        activeCluster = wasActive ? null : i;
        document.querySelectorAll('.legend-item').forEach(function (el2, j) {
          el2.classList.toggle('active', activeCluster === null || activeCluster === j);
        });
        var panel = document.getElementById('profilePanel');
        if (panel) {
          if (wasActive || activeCluster === null) {
            panel.classList.remove('visible');
            panel.innerHTML = '';
          } else {
            var cp = (window.CLUSTER_PROFILES || []).filter(function (x) { return x.name === p.name; })[0] || p;
            panel.innerHTML =
              '<div class="profile-panel-name" style="color:' + p.color + '">' + (i + 1) + '. ' + p.name + '</div>'
              + (cp.tagline ? '<div class="profile-panel-tag">' + cp.tagline + '</div>' : '')
              + (cp.drive ? '<div class="profile-panel-label">What drives them</div><div class="profile-panel-text">' + cp.drive + '</div>' : '');
            panel.classList.add('visible');
          }
        }
        draw();
      });
      el.appendChild(div);
    });
  }

  // ── Build cruise filter buttons ───────────────────────────────────────────
  function buildCruiseButtons() {
    var wrap  = document.getElementById('clusterCruiseButtons');
    var label = document.getElementById('clusterCruiseFilterLabel');
    if (!wrap || !PTS.length) return;
    var cruiseIds = [];
    PTS.forEach(function (p) { if (p.cruise && cruiseIds.indexOf(p.cruise) < 0) cruiseIds.push(p.cruise); });
    if (cruiseIds.length < 2 || !window.SD) return;
    if (label) label.style.display = '';
    cruiseIds.forEach(function (cid) {
      var meta = (window.SD.meta.cruises || []).filter(function (c) { return c.id === cid; })[0] || { label: cid, dates: '' };
      var btn = document.createElement('button');
      btn.className = 'c-btn';
      var shortLabel = meta.label.split('—')[0].trim();
      var shortDate  = (meta.dates || '').split('–')[0].trim();
      btn.textContent = shortLabel + (shortDate ? ' (' + shortDate + '…)' : '');
      btn.addEventListener('click', function () { setHighlight('cruise-' + cid, btn); });
      wrap.appendChild(btn);
    });
  }

  // ── Public: setHighlight ──────────────────────────────────────────────────
  function setHighlight(mode, btn) {
    highlightMode = mode;
    document.querySelectorAll('.c-controls .c-btn').forEach(function (b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    draw();
  }
  window.setHighlight = setHighlight;

  // ── Public: initCluster ───────────────────────────────────────────────────
  function initCluster() {
    if (inited) { resize(); return; }
    inited = true;

    // Pull profiles from app.js editorial config
    var _cp = window.CLUSTER_PROFILES || [
      { id: 0, name: 'Committed Believer',  color: '#1e7a52', desc: '95% serious believers · Very high worry (8.5/10) · Hopeful · Willing to act · Largest group (n=150)' },
      { id: 1, name: 'Strained Believer',   color: '#c1440e', desc: '92% serious believers · High worry (8.39/10) · Overwhelmed or hopeless · n=76' },
      { id: 2, name: 'Uncertain Moderate',  color: '#2d6a8f', desc: '28% serious believers · Moderate worry (6.65/10) · Cautious but open to action · n=93' },
      { id: 3, name: 'Disengaged Skeptic',  color: '#6b3fa0', desc: '4% serious believers · Very low worry (2.12/10) · Low personal willingness · Dismissive · n=26' },
    ];
    PROF = _cp.map(function (p) { return Object.assign({}, p); });

    var cl = window.SD.clustering;
    PTS  = cl.points;
    CTRS = cl.centers;

    buildLegend();
    buildCruiseButtons();
    setupTooltip();
    resize();
  }
  window.initCluster = initCluster;

})();
