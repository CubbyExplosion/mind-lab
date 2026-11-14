// Break Time Games: set 16 (Rockets to real places)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---------- shared helpers ----------
  const PI = Math.PI, PI2 = Math.PI * 2, DEG = Math.PI / 180, OUT = "#2b3245", RE = 6371;
  const PAL = ["#ff5c7a", "#ff9f43", "#ffd93d", "#6be28f", "#3ec1ff", "#7b6cff", "#c86bff", "#ff8fd0", "#ffffff", "#2b3245", "#14c8b0", "#c9ced8"];
  const fmt = n => Math.round(n).toLocaleString("en-US");
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = t => t * t * (3 - 2 * t);
  const rnd = (a, b) => a + Math.random() * (b - a);
  const big = km => km >= 1e9 ? (km / 1e9).toFixed(1) + " billion km" : km >= 1e6 ? fmt(km / 1e6) + " million km" : fmt(km) + " km";
  const dot = (q, col, x, y, r) => { q.fillStyle = col; q.beginPath(); q.arc(x, y, r, 0, 7); q.fill(); };
  const sh = (q, col, f, lw) => { q.beginPath(); f(q); q.lineJoin = "round"; q.lineCap = "round"; q.strokeStyle = OUT; q.lineWidth = lw || 4; q.stroke(); q.fillStyle = col; q.fill(); };
  const txt = (q, s, x, y, size, col, al) => { q.font = "bold " + size + "px system-ui, sans-serif"; q.textAlign = al || "center"; q.textBaseline = "middle"; q.lineJoin = "round"; q.lineWidth = Math.max(3, size / 5); q.strokeStyle = "rgba(8,10,40,.85)"; q.strokeText(s, x, y); q.fillStyle = col || "#fff"; q.fillText(s, x, y); };
  const ball = (q, x, y, r, c1, c2) => { const gr = q.createRadialGradient(x - r * .35, y - r * .35, r * .1, x, y, r); gr.addColorStop(0, c1); gr.addColorStop(1, c2); q.fillStyle = gr; q.beginPath(); q.arc(x, y, r, 0, 7); q.fill(); };
  const space = (q, W, H, c1, c2) => { const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, c1 || "#060a26"); gr.addColorStop(1, c2 || "#141c52"); q.fillStyle = gr; q.fillRect(0, 0, W, H); };
  const mkStars = (n, W, H) => { const a = []; for (let i = 0; i < n; i++) a.push({ x: Math.random() * W, y: Math.random() * H, s: .7 + Math.random() * 1.7, p: Math.random() * 6 }); return a; };
  const drawStars = (q, a, W, H, t, off) => { q.fillStyle = "#fff"; for (const s of a) { let x = (s.x - (off || 0) * (.15 + s.s * .25)) % W; if (x < 0) x += W; q.globalAlpha = .4 + .6 * Math.abs(Math.sin(t * 1.5 + s.p)); q.fillRect(x, s.y, s.s, s.s); } q.globalAlpha = 1; };

  // toolbar helpers
  const mkBar = g => { const d = g.html(""); d.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:5px 8px;justify-content:center;align-items:center;max-width:100%"; return d; };
  const mkBtn = (g, d, text, fn, big_) => { const b = document.createElement("button"); b.className = "bg-btn"; b.type = "button"; b.textContent = text; b.style.minHeight = big_ ? "48px" : "40px"; b.style.minWidth = "44px"; if (big_) { b.style.fontSize = "16px"; b.style.padding = "6px 14px"; } d.appendChild(b); g.on(b, "click", () => { g.sfx("click"); fn(b); }); return b; };
  const mkLabel = (d, text) => { const s = document.createElement("b"); s.textContent = text; s.style.cssText = "font-size:14px"; d.appendChild(s); return s; };
  const mkSwatches = (g, d, cols, init, cb) => {
    const bs = [];
    const set = col => bs.forEach(b => { const on = b.dataset.c === col; b.style.border = on ? "3px solid #fff" : "2px solid rgba(0,0,0,.35)"; b.style.boxShadow = on ? "0 0 0 2px #222" : "none"; b.style.transform = on ? "scale(1.15)" : "none"; });
    cols.forEach(col => { const b = document.createElement("button"); b.type = "button"; b.dataset.c = col; b.setAttribute("aria-label", "colour"); b.style.cssText = "width:34px;height:34px;border-radius:50%;cursor:pointer;padding:0;background:" + (col === "rainbow" ? "conic-gradient(#ff5c7a,#ffd93d,#6be28f,#3ec1ff,#c86bff,#ff5c7a)" : col); d.appendChild(b); bs.push(b); g.on(b, "click", () => { set(col); g.sfx("pick"); cb(col); }); });
    set(init); return set;
  };
  const mkThumb = (g, d, w, h, draw, cb) => {
    const b = document.createElement("button"); b.type = "button"; b.style.cssText = "width:" + (w + 10) + "px;height:" + (h + 10) + "px;padding:3px;border-radius:10px;border:3px solid rgba(255,255,255,.3);background:#2a3270;cursor:pointer";
    const c = document.createElement("canvas"); c.width = w * 2; c.height = h * 2; c.style.cssText = "width:" + w + "px;height:" + h + "px;display:block"; const q = c.getContext("2d"); q.scale(2, 2);
    try { q.save(); draw(q, w, h); q.restore(); } catch (e) {}
    b.appendChild(c); d.appendChild(b); g.on(b, "click", () => { g.sfx("pick"); cb(b); }); return b;
  };
  const mark = (bs, i) => bs.forEach((b, k) => { b.style.borderColor = k === i ? "#ff9f43" : "rgba(255,255,255,.3)"; b.style.background = k === i ? "#4a3f90" : "#2a3270"; });

  // particles
  const mkFx = () => {
    const P = [];
    const o = {
      add(x, y, vx, vy, l, c, r, gr) { if (P.length < 500) P.push({ x, y, vx, vy, l, m: l, c, r, gr: gr || 0 }); },
      burst(x, y, col, n, sp) { for (let i = 0; i < (n || 14); i++) { const a = Math.random() * PI2, s = (sp || 130) * (.3 + Math.random()); o.add(x, y, Math.cos(a) * s, Math.sin(a) * s, .5 + Math.random() * .5, Array.isArray(col) ? col[i % col.length] : (col || "#fff"), 2 + Math.random() * 3, -2); } },
      fire(x, y, vx, vy) { o.add(x, y, vx + rnd(-20, 20), vy + rnd(-10, 10), .3 + Math.random() * .25, ["#ffd93d", "#ff9f43", "#ff5c7a"][Math.floor(Math.random() * 3)], 3 + Math.random() * 3, -6); },
      smoke(x, y, vx, vy) { o.add(x, y, vx + rnd(-25, 25), vy + rnd(-10, 10), .9 + Math.random() * .6, "#cfd6e6", 4 + Math.random() * 3, 16); },
      draw(q, dt) { for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.l -= dt; if (p.l <= 0) { P.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.r = Math.max(.5, p.r + p.gr * dt); q.globalAlpha = cl(p.l / p.m, 0, 1) * .85; dot(q, p.c, p.x, p.y, p.r); } q.globalAlpha = 1; }
    };
    return o;
  };

  // trip log: score = places visited, status = km flown this visit
  const mkLog = g => {
    const L = Object.assign({ km: 0, p: [] }, g.load() || {}); if (!Array.isArray(L.p)) L.p = [];
    let ses = 0, n = 0; const upd = () => g.status("Flew " + big(ses));
    return {
      L, ses: () => ses, save() { g.save(L); },
      add(km) { ses += km; L.km = (L.km || 0) + km; upd(); },
      go(name, km) { ses += km; n++; L.km = (L.km || 0) + km; if (L.p.indexOf(name) < 0) L.p.push(name); g.add(1); g.save(L); upd(); },
      fin() { g.over(n ? "Great trip! You visited " + n + (n === 1 ? " place" : " places") + " and flew " + big(ses) + "." : "Ready when you are. Launch a rocket next time!"); }
    };
  };

  // pointer state
  const mkPtr = (g, c, pos) => {
    const P = { d: false, x: 320, y: 200 }, mv = e => { const p = pos(e); P.x = p.x; P.y = p.y; };
    g.on(c, "pointerdown", e => { P.d = true; mv(e); }); g.on(c, "pointermove", mv);
    g.on(c, "pointerup", () => { P.d = false; }); g.on(c, "pointercancel", () => { P.d = false; }); g.on(c, "pointerleave", () => { P.d = false; });
    return P;
  };
  const cdown = (S, g, dt) => { S.ct -= dt; const n = Math.max(0, Math.ceil(S.ct)); if (n !== S.cn) { S.cn = n; if (n > 0) g.sfx("tick"); } if (S.ct <= 0) { g.sfx("launch"); return true; } return false; };
  const cnum = (q, S, W, H) => { const f = S.ct % 1; q.globalAlpha = .55 + .45 * f; txt(q, String(Math.max(1, Math.ceil(S.ct))), W / 2, H / 2 - 20, 40 + 70 * f, "#ffe27a"); q.globalAlpha = 1; };

  // ---------- real places ----------
  const gcd = (a, b) => { const p1 = a.lat * DEG, p2 = b.lat * DEG, dl = (b.lon - a.lon) * DEG; const h = Math.pow(Math.sin((p2 - p1) / 2), 2) + Math.cos(p1) * Math.cos(p2) * Math.pow(Math.sin(dl / 2), 2); return 2 * RE * Math.asin(Math.min(1, Math.sqrt(h))); };
  const vec = a => { const p = a.lat * DEG, l = a.lon * DEG; return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)]; };
  const slerp = (a, b, t) => {
    const A = vec(a), Bv = vec(b); const d = cl(A[0] * Bv[0] + A[1] * Bv[1] + A[2] * Bv[2], -1, 1), om = Math.acos(d);
    if (om < 1e-4) return { lat: a.lat, lon: a.lon };
    const s = Math.sin(om), k1 = Math.sin((1 - t) * om) / s, k2 = Math.sin(t * om) / s, v = [k1 * A[0] + k2 * Bv[0], k1 * A[1] + k2 * Bv[1], k1 * A[2] + k2 * Bv[2]];
    return { lat: Math.asin(cl(v[2], -1, 1)) / DEG, lon: Math.atan2(v[1], v[0]) / DEG };
  };
  const CAPE = { n: "Cape Canaveral", lm: "Kennedy Space Center", lat: 28.5, lon: -80.6 };
  const CITY = [
    { n: "Paris", lm: "Eiffel Tower", lat: 48.86, lon: 2.35 },
    { n: "New York", lm: "Statue of Liberty", lat: 40.69, lon: -74.04 },
    { n: "Tokyo", lm: "Tokyo Tower", lat: 35.66, lon: 139.75 },
    { n: "Sydney", lm: "Opera House", lat: -33.86, lon: 151.21 },
    { n: "Cairo", lm: "Pyramids of Giza", lat: 29.98, lon: 31.13 },
    { n: "Rio", lm: "Christ the Redeemer", lat: -22.95, lon: -43.21 },
    { n: "London", lm: "Big Ben", lat: 51.5, lon: -0.12 },
    { n: "Rome", lm: "Colosseum", lat: 41.89, lon: 12.49 },
    { n: "Beijing", lm: "Great Wall", lat: 40.43, lon: 116.57 },
    { n: "Cape Town", lm: "Table Mountain", lat: -33.96, lon: 18.4 },
    { n: "Mumbai", lm: "Gateway of India", lat: 18.92, lon: 72.83 },
    { n: "Los Angeles", lm: "Hollywood Sign", lat: 34.13, lon: -118.32 },
    { n: "Mexico City", lm: "Teotihuacan pyramids", lat: 19.69, lon: -98.84 },
    { n: "Moscow", lm: "Red Square", lat: 55.75, lon: 37.62 },
    { n: "Nairobi", lm: "Nairobi National Park", lat: -1.36, lon: 36.85 },
    { n: "Honolulu", lm: "Diamond Head", lat: 21.26, lon: -157.81 }
  ];
  // simple continent outlines as [lon, lat]
  const CON = [
    [[-168, 66], [-160, 70], [-140, 70], [-120, 72], [-95, 72], [-80, 68], [-62, 60], [-55, 50], [-66, 44], [-76, 36], [-81, 25], [-97, 26], [-97, 18], [-87, 21], [-83, 10], [-78, 8], [-90, 14], [-105, 20], [-117, 32], [-124, 40], [-125, 49], [-135, 58], [-150, 60], [-165, 60]],
    [[-78, 8], [-62, 10], [-50, 0], [-35, -6], [-40, -22], [-48, -28], [-58, -38], [-65, -42], [-68, -52], [-72, -50], [-74, -40], [-71, -20], [-81, -6], [-80, 2]],
    [[-10, 36], [-9, 43], [-4, 48], [5, 52], [10, 57], [22, 60], [30, 70], [60, 70], [100, 77], [140, 72], [170, 68], [180, 65], [160, 58], [142, 50], [135, 43], [127, 37], [122, 31], [121, 22], [108, 18], [105, 9], [100, 3], [98, 15], [92, 22], [80, 15], [77, 8], [72, 20], [67, 25], [57, 25], [56, 18], [43, 13], [35, 28], [35, 36], [28, 36], [22, 37], [12, 38], [5, 43], [0, 38]],
    [[-17, 21], [-10, 32], [10, 37], [32, 31], [35, 28], [43, 12], [51, 12], [40, -3], [40, -16], [33, -26], [20, -35], [12, -18], [9, -1], [7, 4], [-8, 4], [-17, 14]],
    [[113, -22], [122, -18], [131, -12], [142, -11], [146, -19], [153, -27], [150, -37], [140, -38], [131, -31], [115, -34]],
    [[-55, 60], [-45, 60], [-20, 70], [-20, 82], [-60, 82], [-70, 76]],
    [[-180, -90], [-180, -72], [-120, -75], [-60, -73], [0, -70], [60, -68], [120, -67], [180, -72], [180, -90]]
  ];
  const PL = [
    { n: "Mercury", c1: "#c9c5be", c2: "#6e6a66", s: .38, au: .39, d: 57.9, dia: 4879 },
    { n: "Venus", c1: "#f5dfae", c2: "#b8905a", s: .95, au: .72, d: 108.2, dia: 12104 },
    { n: "Earth", c1: "#7fd0ff", c2: "#1d5fb8", s: 1, au: 1, d: 149.6, dia: 12742 },
    { n: "Mars", c1: "#f08a5a", c2: "#9c3b22", s: .53, au: 1.52, d: 227.9, dia: 6779 },
    { n: "Jupiter", c1: "#f0d3a8", c2: "#b07a4a", s: 11.2, au: 5.2, d: 778.5, dia: 139820 },
    { n: "Saturn", c1: "#f6e3a8", c2: "#c09a52", s: 9.45, au: 9.58, d: 1432, dia: 116460 },
    { n: "Uranus", c1: "#c4f4f8", c2: "#5ab4c4", s: 4, au: 19.2, d: 2867, dia: 50724 },
    { n: "Neptune", c1: "#6f9bff", c2: "#2540b0", s: 3.88, au: 30.1, d: 4515, dia: 49244 }
  ];
  const PLUTO = { n: "Pluto", c1: "#e8d4bc", c2: "#8a6e58", rr: 15, au: 39.5, d: 5906, dia: 2377 };
  const prad = p => p.rr || 12 * Math.pow(p.s, .8);
  const drawPlanet = (q, p, x, y, r) => {
    if (p.n === "Saturn") { q.strokeStyle = "rgba(226,206,150,.9)"; q.lineWidth = r * .38; q.beginPath(); q.ellipse(x, y, r * 1.9, r * .5, -.3, 0, PI2); q.stroke(); }
    if (p.n === "Uranus") { q.strokeStyle = "rgba(200,240,245,.55)"; q.lineWidth = r * .1; q.beginPath(); q.ellipse(x, y, r * .5, r * 1.7, .1, 0, PI2); q.stroke(); }
    ball(q, x, y, r, p.c1, p.c2);
    q.save(); q.beginPath(); q.arc(x, y, r, 0, 7); q.clip();
    if (p.n === "Jupiter" || p.n === "Saturn") { const cols = ["rgba(150,90,50,.35)", "rgba(255,240,210,.3)", "rgba(170,110,60,.3)"]; for (let i = -4; i <= 4; i++) { q.fillStyle = cols[(i + 4) % 3]; q.fillRect(x - r, y + i * r * .22, r * 2, r * .12); } if (p.n === "Jupiter") { q.fillStyle = "rgba(200,70,40,.75)"; q.beginPath(); q.ellipse(x + r * .3, y + r * .3, r * .2, r * .11, 0, 0, 7); q.fill(); } }
    else if (p.n === "Earth") { q.fillStyle = "rgba(90,200,100,.85)"; [[-.3, -.2, .35, .25], [.35, .25, .3, .35], [-.1, .5, .2, .15]].forEach(b => { q.beginPath(); q.ellipse(x + b[0] * r, y + b[1] * r, b[2] * r, b[3] * r, .4, 0, 7); q.fill(); }); q.fillStyle = "rgba(255,255,255,.5)"; q.beginPath(); q.ellipse(x - r * .1, y - r * .6, r * .5, r * .12, 0, 0, 7); q.fill(); }
    else if (p.n === "Mars") { q.fillStyle = "rgba(255,255,255,.8)"; q.beginPath(); q.ellipse(x, y - r * .92, r * .4, r * .18, 0, 0, 7); q.fill(); q.fillStyle = "rgba(100,30,20,.35)"; q.beginPath(); q.ellipse(x + r * .1, y + r * .1, r * .4, r * .2, .3, 0, 7); q.fill(); }
    else if (p.n === "Mercury") { q.fillStyle = "rgba(60,55,50,.35)"; [[-.3, -.2, .2], [.3, .3, .25], [.2, -.4, .12]].forEach(b => { q.beginPath(); q.arc(x + b[0] * r, y + b[1] * r, b[2] * r, 0, 7); q.fill(); }); }
    else if (p.n === "Neptune") { q.fillStyle = "rgba(20,30,120,.5)"; q.beginPath(); q.ellipse(x - r * .2, y + r * .1, r * .3, r * .16, 0, 0, 7); q.fill(); }
    else if (p.n === "Pluto") { q.fillStyle = "rgba(255,240,225,.85)"; q.beginPath(); q.arc(x - r * .22, y + r * .05, r * .26, 0, 7); q.arc(x + r * .12, y + r * .05, r * .26, 0, 7); q.moveTo(x - r * .45, y + r * .15); q.lineTo(x - r * .05, y + r * .6); q.lineTo(x + r * .33, y + r * .15); q.fill(); }
    q.restore();
    if (p.n === "Saturn") { q.strokeStyle = "rgba(226,206,150,.95)"; q.lineWidth = r * .38; q.beginPath(); q.ellipse(x, y, r * 1.9, r * .5, -.3, 0, PI); q.stroke(); }
  };

  // ---------- the rocket ----------
  const FL = [["#ff9f43", "#ffe27a"], ["#3ec1ff", "#e0f7ff"], ["#6be28f", "#f0ffd8"], ["#c86bff", "#ffd9f6"]];
  const BODIES = [{ hw: 13, t: -34, b: 26 }, { hw: 19, t: -28, b: 24 }, { hw: 11, t: -46, b: 30 }];
  const rocket = (q, x, y, a, s, o) => {
    o = o || {}; const S = BODIES[o.shape || 0], hw = S.hw, tp = S.t, bt = S.b, fl = o.fl || 0, tt = o.t || 0;
    q.save(); q.translate(x, y); q.rotate(a || 0); q.scale(s, s);
    if (fl > 0) {
      const pal = o.fc === 4 ? ["hsl(" + Math.floor((tt * 200) % 360) + ",90%,60%)", "#fff"] : FL[o.fc || 0], L = (22 + Math.random() * 14) * fl;
      q.fillStyle = pal[0]; q.beginPath(); q.moveTo(-hw * .7, bt); q.quadraticCurveTo(0, bt + L * 2.2, hw * .7, bt); q.fill();
      q.fillStyle = pal[1]; q.beginPath(); q.moveTo(-hw * .4, bt); q.quadraticCurveTo(0, bt + L * 1.3, hw * .4, bt); q.fill();
    }
    const fc = o.fin || "#ff5c7a", ft = o.finT || 0;
    [-1, 1].forEach(sd => sh(q, fc, p => {
      if (ft === 0) { p.moveTo(sd * hw, bt - 26); p.lineTo(sd * (hw + 16), bt + 8); p.lineTo(sd * hw, bt - 2); }
      else if (ft === 1) { p.moveTo(sd * hw, bt - 34); p.lineTo(sd * (hw + 22), bt - 6); p.lineTo(sd * (hw + 22), bt + 8); p.lineTo(sd * hw, bt); }
      else if (ft === 2) { p.ellipse(sd * (hw + 6), bt - 8, 9, 16, sd * .3, 0, 7); }
      else { p.moveTo(sd * hw, bt - 20); p.lineTo(sd * (hw + 12), bt - 20); p.lineTo(sd * (hw + 12), bt + 10); p.lineTo(sd * hw, bt - 2); }
    }, 3));
    sh(q, "#6a7088", p => p.rect(-hw * .5, bt - 2, hw, 7), 2.5);
    const ny = tp + (bt - tp) * .3;
    sh(q, o.body || "#f4f6fb", p => { p.moveTo(0, tp); p.quadraticCurveTo(hw * 1.15, tp + (bt - tp) * .3, hw, bt); p.lineTo(-hw, bt); p.quadraticCurveTo(-hw * 1.15, tp + (bt - tp) * .3, 0, tp); p.closePath(); }, 3);
    sh(q, o.nose || "#ff5c7a", p => { p.moveTo(0, tp); p.quadraticCurveTo(hw * .75, tp + (ny - tp) * .4, hw * .84, ny); p.lineTo(-hw * .84, ny); p.quadraticCurveTo(-hw * .75, tp + (ny - tp) * .4, 0, tp); p.closePath(); }, 3);
    const wy = tp + (bt - tp) * .5;
    sh(q, o.win || "#8fe3ff", p => p.arc(0, wy, hw * .42, 0, 7), 3); dot(q, "rgba(255,255,255,.85)", -hw * .12, wy - hw * .14, hw * .13);
    if (o.deco === 1) { q.fillStyle = fc; q.fillRect(-hw * .98, bt - 13, hw * 1.96, 5); }
    else if (o.deco === 2) { [-.55, 0, .55].forEach(k => dot(q, fc, hw * k, bt - 10, 2.6)); }
    else if (o.deco === 3) { q.fillStyle = fc; q.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 2.8 : 6, an = -PI / 2 + i * PI / 5; q.lineTo(Math.cos(an) * r, bt - 11 + Math.sin(an) * r); } q.closePath(); q.fill(); }
    q.restore();
  };

  // astronaut and flag
  const astro = (q, x, y, s, walk, wave) => {
    q.save(); q.translate(x, y); q.scale(s, s); const sw = walk ? Math.sin(walk * 10) * 5 : 0;
    q.strokeStyle = "#e8eaf2"; q.lineWidth = 7; q.lineCap = "round"; q.beginPath(); q.moveTo(-4, -14); q.lineTo(-4 + sw, 0); q.moveTo(4, -14); q.lineTo(4 - sw, 0); q.stroke();
    sh(q, "#cfd3e0", p => p.roundRect(-14, -33, 7, 17, 3), 2);
    sh(q, "#f4f6fb", p => p.roundRect(-9, -34, 18, 22, 6), 2.5);
    q.strokeStyle = "#f4f6fb"; q.lineWidth = 5; q.beginPath(); q.moveTo(8, -30); q.lineTo(15, wave ? -40 + Math.sin(wave * 8) * 5 : -22); q.stroke();
    sh(q, "#f4f6fb", p => p.arc(0, -43, 10, 0, 7), 2.5); sh(q, "#ffb84d", p => p.ellipse(3, -43, 6, 5, 0, 0, 7), 1.5);
    q.restore();
  };
  const flag = (q, x, y, h, col, t) => {
    if (h < 2) return; q.strokeStyle = "#eee"; q.lineWidth = 3; q.beginPath(); q.moveTo(x, y); q.lineTo(x, y - h); q.stroke();
    q.fillStyle = col; q.beginPath(); q.moveTo(x, y - h); for (let i = 1; i <= 8; i++) q.lineTo(x + i * 4, y - h + Math.sin(t * 5 + i * .7) * 2); for (let i = 8; i >= 0; i--) q.lineTo(x + i * 4, y - h + h * .3 + Math.sin(t * 5 + i * .7) * 2); q.closePath(); q.fill();
  };

  // landing engine shared by Moon Mission and Moon Lander
  const mkLander = (g, W, H, cfg) => {
    const gp = 30 * cfg.grav / 1.62, thr = Math.max(48, gp * 2.6), a1 = Math.random() * 6, a2 = Math.random() * 6;
    const S = { x: 0, y: 0, vx: 0, vy: 0, fuel: cfg.fuel, out: 0, state: "fly", fl: 0, ter: [], padX: g.rf(170, W - 170), padY: H - 92, hit: 0 };
    for (let i = 0; i <= W / 8 + 1; i++) {
      const x = i * 8, d = Math.abs(x - S.padX), k = cl((d - cfg.padW / 2) / 70, 0, 1), kk = k * k * (3 - 2 * k);
      S.ter.push(S.padY + kk * (Math.sin(x * .013 + a1) * cfg.rough + Math.sin(x * .033 + a2) * cfg.rough * .45 - 4));
    }
    S.gy = x => { const i = cl(x / 8, 0, S.ter.length - 1.001), k = Math.floor(i), f = i - k; return S.ter[k] * (1 - f) + S.ter[k + 1] * f; };
    S.reset = () => { S.x = g.rf(100, W - 100); S.y = 30; S.vx = g.rf(-12, 12); S.vy = 8; S.fuel = cfg.fuel; S.out = 0; S.state = "fly"; S.fl = 0; S.hit = 0; };
    S.reset();
    S.update = (dt, P) => {
      if (S.state !== "fly") { S.fl = 0; return; }
      let on = false;
      if (cfg.auto) {
        const ty = S.padY - 16, near = ty - S.y, want = near > 90 ? Math.min(85, 14 + near * .35) : Math.max(8, near * .3 + 4);
        S.vx += (cl((S.padX - S.x) * 1.1, -70, 70) - S.vx) * Math.min(1, 2.5 * dt);
        if (near < 130) S.x += (S.padX - S.x) * Math.min(1, 3 * dt);
        on = S.vy > want + 2; S.vy += (want - S.vy) * Math.min(1, 2 * dt);
      } else {
        S.vy += gp * dt; const can = cfg.fuel === 0 || S.fuel > 0, k = g.keys;
        if ((k.ArrowUp || k[" "] || P.d) && can) { on = true; S.vy -= thr * dt; if (cfg.fuel) S.fuel = Math.max(0, S.fuel - 17 * dt); }
        const ax = ((k.ArrowRight || (P.d && P.x > S.x + 30)) ? 1 : 0) - ((k.ArrowLeft || (P.d && P.x < S.x - 30)) ? 1 : 0);
        if (ax && can) { S.vx += ax * 55 * dt; if (cfg.fuel) S.fuel = Math.max(0, S.fuel - 5 * dt); }
        if (cfg.fuel && S.fuel <= 0) { S.out += dt; if (S.out > 2.5) { S.fuel = 35; S.out = 0; g.pop("Backup fuel!", 320, 120, "#6be28f"); g.sfx("pick"); } }
      }
      S.fl = on ? 1 : 0;
      S.x += S.vx * dt; S.y += S.vy * dt;
      if (S.x < 14) { S.x = 14; S.vx = Math.abs(S.vx) * .3; } if (S.x > W - 14) { S.x = W - 14; S.vx = -Math.abs(S.vx) * .3; }
      if (S.y < 10) { S.y = 10; if (S.vy < 0) S.vy = 0; }
      const gnd = S.gy(S.x), bot = S.y + 16;
      if (on) { cfg.fx.fire(S.x, S.y + 14, S.vx * .3, 90); if (gnd - bot < 70) cfg.fx.add(S.x, gnd - 2, rnd(-70, 70), rnd(-25, -5), .6, cfg.dust || "#cfcfd8", 3, 8); }
      if (bot >= gnd) {
        if (cfg.auto || (Math.abs(S.vy) <= cfg.vlim && Math.abs(S.vx) <= cfg.vlim * .7 && Math.abs(S.x - S.padX) <= cfg.padW / 2)) { S.state = "landed"; S.y = gnd - 16; S.vx = 0; S.vy = 0; cfg.fx.burst(S.x, gnd, cfg.dust || "#ddd", 14, 90); g.sfx("thump"); if (cfg.onLand) cfg.onLand(); }
        else { cfg.fx.burst(S.x, gnd, cfg.dust || "#ddd", 10, 80); g.sfx("boom"); S.hit = 1.4; S.y = gnd - 86; S.vy = -50; S.vx = 0; }
      }
      S.hit = Math.max(0, S.hit - dt);
    };
    S.draw = (q, t) => {
      q.beginPath(); q.moveTo(0, H); S.ter.forEach((h, i) => q.lineTo(i * 8, h)); q.lineTo(W + 8, H); q.closePath();
      const gr = q.createLinearGradient(0, H - 150, 0, H); gr.addColorStop(0, cfg.col1); gr.addColorStop(1, cfg.col2); q.fillStyle = gr; q.fill();
      q.strokeStyle = cfg.edge || "rgba(255,255,255,.35)"; q.lineWidth = 2; q.beginPath(); S.ter.forEach((h, i) => i ? q.lineTo(i * 8, h) : q.moveTo(0, h)); q.stroke();
      if (cfg.decor) cfg.decor(q, t, S);
      q.fillStyle = "#dfe3ee"; q.fillRect(S.padX - cfg.padW / 2, S.padY - 3, cfg.padW, 6); dot(q, Math.sin(t * 6) > 0 ? "#ff5c5c" : "#7a2a2a", S.padX - cfg.padW / 2 + 4, S.padY - 5, 3); dot(q, Math.sin(t * 6) > 0 ? "#7a2a2a" : "#6be28f", S.padX + cfg.padW / 2 - 4, S.padY - 5, 3);
      q.strokeStyle = "#d8dce8"; q.lineWidth = 3; q.lineCap = "round"; q.beginPath(); q.moveTo(S.x - 6, S.y + 8); q.lineTo(S.x - 13, S.y + 16); q.moveTo(S.x + 6, S.y + 8); q.lineTo(S.x + 13, S.y + 16); q.stroke();
      rocket(q, S.x, S.y, cl(S.vx * .004, -.3, .3), .5, Object.assign({}, cfg.rk, { fl: S.fl, t }));
      if (S.hit > 0) { q.globalAlpha = S.hit / 1.4; txt(q, "Bump! Slower and over the pad", S.x, S.y - 36, 16, "#ffd0d0"); q.globalAlpha = 1; }
    };
    S.hud = (q, t) => {
      if (S.state !== "fly") return;
      if (!cfg.auto) {
        const ok = Math.abs(S.vy) <= cfg.vlim; q.fillStyle = "rgba(0,0,0,.45)"; q.fillRect(12, 12, 130, 14); q.fillStyle = ok ? "#6be28f" : "#ff5c7a"; q.fillRect(12, 12, cl(Math.abs(S.vy) / (cfg.vlim * 2), 0, 1) * 130, 14);
        q.fillStyle = "#fff"; q.fillRect(12 + 65 - 1, 10, 2, 18); txt(q, ok ? "Speed OK" : "Too fast", 77, 40, 13, ok ? "#b7ffd0" : "#ffb0b0");
        if (cfg.fuel) { q.fillStyle = "rgba(0,0,0,.45)"; q.fillRect(12, 54, 130, 12); q.fillStyle = "#ffd93d"; q.fillRect(12, 54, S.fuel / cfg.fuel * 130, 12); txt(q, "Fuel", 160, 60, 12, "#ffe27a", "left"); }
      }
      const by = S.padY - 44 + Math.sin(t * 5) * 4; q.fillStyle = "#ffd93d"; q.beginPath(); q.moveTo(S.padX - 9, by - 12); q.lineTo(S.padX + 9, by - 12); q.lineTo(S.padX, by); q.closePath(); q.fill();
    };
    return S;
  };
  const earthRoll = (q, W, H, topY, t, alpha) => {
    const R = 700, cx = W / 2, cy = topY + R; q.save(); q.globalAlpha = alpha;
    q.beginPath(); q.arc(cx, cy, R, 0, PI2); q.clip();
    const gr = q.createLinearGradient(0, topY, 0, topY + 120); gr.addColorStop(0, "#5aaeff"); gr.addColorStop(1, "#1d4fa8"); q.fillStyle = gr; q.fillRect(0, topY, W, H - topY + 20);
    for (let i = 0; i < 7; i++) { const x = ((i * 190 - t * 22) % 1330 + 1330) % 1330 - 300; q.fillStyle = "rgba(90,200,100,.9)"; q.beginPath(); q.ellipse(x, topY + 38 + (i % 3) * 22, 70 + (i % 2) * 40, 18 + (i % 3) * 5, 0, 0, 7); q.fill(); }
    for (let i = 0; i < 9; i++) { const x = ((i * 150 - t * 34) % 1330 + 1330) % 1330 - 300; q.fillStyle = "rgba(255,255,255,.7)"; q.beginPath(); q.ellipse(x, topY + 20 + (i % 4) * 22, 50, 8, 0, 0, 7); q.fill(); }
    q.restore(); q.save(); q.globalAlpha = alpha * .5; q.strokeStyle = "#9fdcff"; q.lineWidth = 6; q.beginPath(); q.arc(cx, cy, R, PI * 1.2, PI * 1.8); q.stroke(); q.restore();
  };

  // ======================= 1. Launch Anywhere =======================
  B.add({
    id: "s16-launch-anywhere", name: "Launch Anywhere", ages: [5, 14], cat: "Creative", color: "#3ec1ff", icon: "G",
    desc: "Spin the globe and fire a rocket in a big arc to any real city or landmark.", controls: "Tap a place button. On Hard, tap the screen or press Space to stop the power meter",
    start(g) {
      const { c, x: q, W, H } = g.canvas(640, 400), fx = mkFx(), st = mkStars(70, W, H), log = mkLog(g), cx = 320, cy = 215, Rg = 148;
      const list = CITY.slice(0, g.by(4, 9, 16)), bar = mkBar(g), act = mkBar(g);
      let from = CAPE, to = CAPE, ph = "idle", f = 0, lon0 = -70, lat0 = 20, ct = 3, cn = 4, arc = 1, pw = 0, pv = 1, err = 0, mt = 0, km = 0, T = 0, m1 = "", m2 = "", la = 0, sx = 0;
      const proj = (la_, lo, r) => { const p = la_ * DEG, l = (lo - lon0) * DEG, p0 = lat0 * DEG; const cc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l); return { x: cx + Rg * r * Math.cos(p) * Math.sin(l), y: cy - Rg * r * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), v: cc > .02 }; };
      const pathPt = ff => { const p = slerp(from, to, ff); return proj(p.lat, p.lon, 1.02 + arc * .22 * Math.sin(PI * ff)); };
      const lock = () => { if (ph !== "aim") return; arc = .5 + pw; const acc = 1 - Math.abs(pw - .6) / .6; err = acc > .85 ? 0 : Math.round((.85 - acc) * 1000); ph = "count"; ct = 3; cn = 4; g.sfx("pick"); };
      g.on(c, "pointerdown", lock); g.on(window, "keydown", e => { if (e.key === " ") lock(); });
      list.forEach(d => mkBtn(g, bar, d.n, () => {
        if (ph === "count" || ph === "fly" || ph === "aim") return;
        if (d.n === from.n) { g.pop("You are already here!", 320, 120); g.sfx("wrong"); return; }
        to = d; km = gcd(from, to); arc = 1; err = 0; pw = 0; pv = 1; ct = 3; cn = 4; mt = 0; ph = g.diff === 2 ? "aim" : "count";
      }, true));
      mkBtn(g, act, "Finish", () => log.fin());
      g.loop((dt, t) => {
        T += dt; mt = Math.max(0, mt - dt);
        const tg = ph === "fly" ? slerp(from, to, .5) : ph === "done" ? to : from;
        if (ph === "idle") { lon0 += 12 * dt; lat0 += (20 - lat0) * Math.min(1, 2 * dt); }
        else { lon0 += (((tg.lon - lon0 + 540) % 360) - 180) * Math.min(1, 2.5 * dt); lat0 += (tg.lat * .6 - lat0) * Math.min(1, 2.5 * dt); }
        if (ph === "done" && mt <= 0) ph = "idle";
        if (ph === "aim") { pw += pv * dt * 1.1; if (pw > 1) { pw = 1; pv = -1; } if (pw < 0) { pw = 0; pv = 1; } }
        if (ph === "count" && cdown({ get ct() { return ct; }, set ct(v) { ct = v; }, get cn() { return cn; }, set cn(v) { cn = v; } }, g, dt)) { ph = "fly"; f = 0; sx = .5; }
        sx = Math.max(0, sx - dt);
        let rp = null;
        if (ph === "fly") {
          f = Math.min(1, f + dt / g.by(5, 5.5, 6)); const e = ease(f), p0 = pathPt(e), p1 = pathPt(Math.min(1, ease(Math.min(1, f + .02))));
          if (Math.hypot(p1.x - p0.x, p1.y - p0.y) > .05) la = Math.atan2(p1.x - p0.x, -(p1.y - p0.y)); rp = p0;
          fx.fire(p0.x - Math.sin(la) * 12, p0.y + Math.cos(la) * 12, -Math.sin(la) * 70, Math.cos(la) * 70); if (Math.random() < .6) fx.smoke(p0.x - Math.sin(la) * 14, p0.y + Math.cos(la) * 14, 0, 0);
          if (f >= 1) {
            ph = "done"; mt = 4.5; from = to; log.go(to.n, km); g.sfx("star"); g.sfx("cheer"); const pp = proj(to.lat, to.lon, 1); fx.burst(pp.x, pp.y, ["#ffd93d", "#ff5c7a", "#6be28f", "#3ec1ff"], 30, 170);
            m1 = "Landed in " + to.n + "!"; m2 = "Near the " + to.lm + ". You flew " + fmt(km) + " km." + (err ? " (" + fmt(err) + " km off target)" : g.diff === 2 ? " Bullseye!" : "");
          }
        }
        // draw
        q.save(); if (sx > 0) q.translate(rnd(-3, 3) * sx * 4, rnd(-3, 3) * sx * 4);
        space(q, W, H, "#050827", "#122055"); drawStars(q, st, W, H, T);
        const ag = q.createRadialGradient(cx, cy, Rg, cx, cy, Rg + 26); ag.addColorStop(0, "rgba(120,200,255,.55)"); ag.addColorStop(1, "rgba(120,200,255,0)"); q.fillStyle = ag; q.beginPath(); q.arc(cx, cy, Rg + 26, 0, 7); q.fill();
        ball(q, cx, cy, Rg, "#52b6ff", "#17409a");
        q.fillStyle = "#5cc462"; CON.forEach(poly => { q.beginPath(); poly.forEach((pt, i) => { const p = proj(pt[1], pt[0], 1); let x = p.x, y = p.y; if (!p.v) { const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) || 1; x = cx + dx / d * Rg; y = cy + dy / d * Rg; } if (i) q.lineTo(x, y); else q.moveTo(x, y); }); q.closePath(); q.fill(); });
        const sg = q.createRadialGradient(cx - 50, cy - 60, 20, cx, cy, Rg); sg.addColorStop(0, "rgba(255,255,255,.18)"); sg.addColorStop(.6, "rgba(0,0,0,0)"); sg.addColorStop(1, "rgba(0,10,50,.55)"); q.fillStyle = sg; q.beginPath(); q.arc(cx, cy, Rg, 0, 7); q.fill();
        [CAPE].concat(list).forEach(d => { const p = proj(d.lat, d.lon, 1); if (!p.v) return; const isT = d === to && ph !== "idle", pul = isT ? 1 + .4 * Math.sin(T * 8) : 1; dot(q, d === CAPE ? "#ff9f43" : isT ? "#ffd93d" : "#fff", p.x, p.y, 3.5 * pul); if (list.length <= 9 || isT) txt(q, d.n, p.x, p.y - 10, 11, "#fff"); });
        if (ph === "fly" || ph === "done") { q.fillStyle = "rgba(255,255,255,.8)"; for (let i = 0; i < (ph === "done" ? 1 : f) * 40; i++) { const p = pathPt(ease(i / 40)); if (p.v) q.fillRect(p.x - 1, p.y - 1, 2, 2); } }
        if (ph === "idle" || ph === "aim" || ph === "count") { const p = proj(from.lat, from.lon, 1); if (p.v) rocket(q, p.x, p.y - 12, 0, .45, { fl: ph === "count" && ct < 1 ? 1 : 0, t }); if (ph === "count" && ct < 1.2) fx.smoke(p.x, p.y, 0, 20); }
        if (rp) rocket(q, rp.x, rp.y, la, .5, { fl: 1, t });
        fx.draw(q, dt); q.restore();
        if (ph === "idle") txt(q, "Pick a place to fly to!", W / 2, 28, 22, "#fff");
        if (ph === "count") { cnum(q, { ct }, W, H); txt(q, "Going to " + to.n, W / 2, 28, 20, "#fff"); }
        if (ph === "fly") { txt(q, "Flying to " + to.n, W / 2, 26, 20, "#fff"); txt(q, fmt(km * ease(f)) + " km", W / 2, 54, 24, "#ffe27a"); }
        if (ph === "done") { txt(q, m1, W / 2, 26, 26, "#ffe27a"); txt(q, m2, W / 2, 56, 15, "#fff"); }
        if (ph === "aim") {
          txt(q, "Tap to stop the power meter in the green!", W / 2, 24, 18, "#fff"); q.fillStyle = "rgba(0,0,0,.5)"; q.fillRect(170, 40, 300, 18); q.fillStyle = "#3b9c4c"; q.fillRect(170 + 300 * .5, 40, 300 * .2, 18); q.fillStyle = "#ffd93d"; q.fillRect(170 + 300 * pw - 3, 36, 6, 26);
        }
      });
    }
  });

  // ======================= 2. Moon Mission =======================
  B.add({
    id: "s16-moon-mission", name: "Moon Mission", ages: [5, 16], cat: "Creative", color: "#c9ced8", icon: "M",
    desc: "Blast off, cross 384,400 km of space, land on the Moon and plant your flag.", controls: "Pick a landing site. Medium and Hard: hold the screen or Space to fire the engine, slide to steer",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(640, 400), fx = mkFx(), st = mkStars(90, W, H), log = mkLog(g), P = mkPtr(g, c, pos);
      const sites = [{ n: "Sea of Tranquility", r: 6, a: "#a8a8b4", b: "#5d5d6a" }, { n: "Tycho Crater", r: 16, a: "#bab4a8", b: "#6a645a" }, { n: "Mare Imbrium", r: 9, a: "#8f929e", b: "#4f525e" }, { n: "Ocean of Storms", r: 11, a: "#a09a94", b: "#5a5550" }, { n: "Shackleton Crater", r: 22, a: "#c6ccdc", b: "#6c7488" }].slice(0, g.by(2, 3, 5));
      const bar = mkBar(g), fl = mkBar(g), act = mkBar(g); let site = sites[0], ph = "idle", T = 0, tp = 0, tc = 0, tl = 0, flagC = "#ff5c7a", L = null, mt = 0, S0 = { ct: 3, cn: 4 }, msg = "", counted = false;
      mkLabel(fl, "Flag colour"); mkSwatches(g, fl, ["#ff5c7a", "#ffd93d", "#6be28f", "#3ec1ff", "#c86bff", "#ffffff"], flagC, v => { flagC = v; });
      sites.forEach(s => mkBtn(g, bar, s.n, () => {
        if (ph !== "idle" && ph !== "done") return;
        site = s; ph = "count"; S0.ct = 3; S0.cn = 4; tp = 0; tc = 0; tl = 0; counted = false; mt = 0;
        L = mkLander(g, W, H, { grav: 1.62, padW: g.by(110, 90, 62), vlim: g.by(999, 62, 38), rough: s.r, fuel: g.by(0, 0, 100), auto: g.diff === 0, col1: s.a, col2: s.b, fx, rk: { body: "#f4f6fb", nose: "#ff5c7a", fin: "#ff5c7a" }, onLand() { ph = "plant"; tl = 0; } });
      }, true));
      mkBtn(g, act, "Finish", () => log.fin());
      const clock = p => { const d = p * 3, dd = Math.floor(d), hh = Math.floor((d - dd) * 24); return "Day " + (dd + 1) + ", hour " + hh; };
      g.loop((dt, t) => {
        T += dt; mt = Math.max(0, mt - dt); if (ph === "done" && mt <= 0) ph = "idle";
        if (ph === "count" && cdown(S0, g, dt)) { ph = "ascent"; tp = 0; }
        if (ph === "ascent") { tp += dt / 4.5; if (Math.random() < .8) fx.smoke(W / 2 + rnd(-6, 6), H * .72 + 45, 0, 60); if (tp >= 1) { ph = "cruise"; tc = 0; g.sfx("hum"); } }
        if (ph === "cruise") { const boost = g.diff > 0 && (P.d || g.keys[" "]) ? 2.1 : 1; tc += dt / g.by(9, 12, 12) * boost; if (tc >= 1) { tc = 1; ph = "land"; L.reset(); g.sfx("beep"); } }
        if (ph === "land") { L.update(dt, P); }
        if (ph === "plant") { tl += dt; if (tl > 4.4 && !counted) { counted = true; log.go("The Moon (" + site.n + ")", 384400); g.sfx("star"); g.sfx("cheer"); fx.burst(L.x, L.y - 40, ["#ffd93d", flagC, "#fff"], 30, 160); msg = "You planted a flag on the Moon! " + site.n + ", 384,400 km from Earth."; ph = "done"; mt = 6; } }
        // ----- draw -----
        if (ph === "idle" || ph === "count" || ph === "ascent") {
          const k = ph === "ascent" ? tp : 0; const sky = q.createLinearGradient(0, 0, 0, H); const a = cl(k * 1.4, 0, 1);
          sky.addColorStop(0, "rgb(" + Math.round(110 - 105 * a) + "," + Math.round(190 - 180 * a) + "," + Math.round(255 - 215 * a) + ")"); sky.addColorStop(1, "rgb(" + Math.round(200 - 180 * a) + "," + Math.round(230 - 215 * a) + "," + Math.round(255 - 215 * a) + ")"); q.fillStyle = sky; q.fillRect(0, 0, W, H);
          if (a > .2) { q.globalAlpha = a; drawStars(q, st, W, H, T); q.globalAlpha = 1; }
          const gy = H - 60 + ease(k) * 520; q.fillStyle = "#5fb25f"; q.fillRect(0, gy, W, H); q.fillStyle = "#8d94a8"; q.fillRect(W / 2 - 50, gy - 6, 100, 8);
          const ry = ph === "ascent" ? lerpY(H - 105, 130, ease(tp)) : H - 105;
          if (ph === "ascent" || (ph === "count" && S0.ct < 1)) { fx.fire(W / 2, ry + 36, 0, 140); fx.fire(W / 2 + 4, ry + 36, 0, 150); }
          rocket(q, W / 2, ry, 0, 1, { fl: ph === "ascent" || (ph === "count" && S0.ct < 1) ? 1 : 0, t });
          fx.draw(q, dt);
          if (ph === "ascent") { txt(q, "Altitude " + fmt(tp * 100) + " km", W / 2, 26, 22, "#ffe27a"); }
          if (ph === "idle") { txt(q, "Pick where to land on the Moon!", W / 2, 34, 22, "#fff"); ball(q, 540, 90, 40, "#e8e8f0", "#8a8a98"); [[-12, -8, 8], [10, 10, 11], [4, -16, 5]].forEach(b => dot(q, "rgba(80,80,100,.35)", 540 + b[0], 90 + b[1], b[2])); }
          if (ph === "count") cnum(q, S0, W, H);
        } else if (ph === "cruise") {
          space(q, W, H, "#03051a", "#0b1240"); drawStars(q, st, W, H, T, T * 90);
          ball(q, 70 - tc * 40, 200, 130 * (1 - tc) + 14, "#7fd0ff", "#1d5fb8");
          const mr = 8 + 150 * ease(tc); ball(q, 560 - tc * 40, 200, mr, "#f2f2f8", "#8a8a98"); q.save(); q.beginPath(); q.arc(560 - tc * 40, 200, mr, 0, 7); q.clip(); [[-.3, -.2, .25], [.35, .3, .3], [.1, -.5, .15], [-.4, .4, .18]].forEach(b => dot(q, "rgba(80,80,100,.3)", 560 - tc * 40 + b[0] * mr, 200 + b[1] * mr, b[2] * mr)); q.restore();
          const rx = 250 + Math.sin(T * 2) * 4; fx.fire(rx - 30, 200, -120, 0); if (Math.random() < .5) fx.smoke(rx - 34, 200, -60, 0); fx.draw(q, dt); rocket(q, rx, 200, PI / 2, .9, { fl: 1, t });
          txt(q, fmt(384400 * tc) + " km from Earth", W / 2, 28, 24, "#ffe27a"); txt(q, clock(tc), W / 2, 58, 16, "#fff");
          if (g.diff > 0) txt(q, "Hold to boost!", W / 2, H - 22, 15, "#b5e6ff");
        } else if (ph === "land" || ph === "plant" || (ph === "done" && L)) {
          space(q, W, H, "#02030f", "#0a1030"); drawStars(q, st, W, H, T); ball(q, 540, 80, 34, "#8fd6ff", "#1d5fb8"); dot(q, "rgba(255,255,255,.45)", 530, 74, 10);
          L.draw(q, T); fx.draw(q, dt);
          if (ph === "land") { L.hud(q, T); txt(q, g.diff === 0 ? "Autopilot landing..." : "Hold to fire the engine, slide to steer", W / 2, H - 14, 15, "#fff"); txt(q, site.n, W / 2, 26, 20, "#ffe27a"); }
          if (ph === "plant" || ph === "done") { const wk = cl(tl / 1.2, 0, 1); if (tl < 1.2 && ph === "plant") astro(q, L.x + 22 + wk * 40, L.y + 16, .8, tl, 0); else astro(q, L.x + 62, L.y + 16, .8, 0, tl > 2.4 ? T : 0); flag(q, L.x + 90, L.y + 16, 60 * cl((tl - 1.3) / 1, 0, 1), flagC, T); if (ph === "done") { txt(q, msg, W / 2, 28, 15, "#ffe27a"); txt(q, "The trip takes about 3 days.", W / 2, 52, 14, "#fff"); } }
        }
        if (ph === "plant") txt(q, "One small step...", W / 2, 28, 22, "#ffe27a");
      });
    }
  });
  const lerpY = (a, b, k) => a + (b - a) * k;

  // ======================= 3. Mars Express =======================
  B.add({
    id: "s16-mars-express", name: "Mars Express", ages: [7, 20], cat: "Creative", color: "#e8603c", icon: "Ma",
    desc: "A months-long trip from Earth to Mars, sped up, with a mission clock and the real distances.", controls: "Press Launch. Medium and Hard: press it when the launch window bar is green",
    start(g) {
      const { c, x: q, W, H } = g.canvas(640, 400), fx = mkFx(), st = mkStars(80, W, H), log = mkLog(g), cx = 320, cy = 190, ZR = 100, AU = 149.6e6;
      const bar = mkBar(g), act = mkBar(g), tol = g.by(30, 22, 7);
      const thE = d => (100 + d * .9856) * DEG, thM = d => (190 + d * .524) * DEG, norm = a => ((a % 360) + 360) % 360;
      let day = 0, ph = "idle", S0 = { ct: 3, cn: 4 }, d0 = 0, TT = 260, phi0 = 90, dist = 0, last = null, mt = 0, T = 0, hd = 0, msg = "", wait = false, trail = [];
      const phiNow = () => { let p = norm(thM(day) / DEG - thE(day) / DEG); if (p < 10) p += 360; return p; };
      const startFly = () => { ph = "fly"; d0 = day; phi0 = phiNow(); TT = (80 + phi0) / .476; dist = 0; last = null; trail = []; g.sfx("launch"); };
      mkBtn(g, bar, "Launch to Mars", () => {
        if (ph !== "idle") return;
        if (g.diff === 0) { wait = true; g.pop("Waiting for the best launch window...", 320, 130); g.sfx("pick"); }
        else { ph = "count"; S0.ct = 3; S0.cn = 4; }
      }, true);
      mkBtn(g, act, "Finish", () => log.fin());
      const pt = (th, r) => ({ x: cx + ZR * r * Math.cos(th), y: cy - ZR * r * Math.sin(th) });
      g.loop((dt, t) => {
        T += dt; mt = Math.max(0, mt - dt);
        if (ph === "idle") day += (wait ? 70 : 9) * dt;
        if (wait && Math.abs(phiNow() - 44) < 3) { wait = false; ph = "count"; S0.ct = 3; S0.cn = 4; }
        if (ph === "count" && cdown(S0, g, dt)) startFly();
        let rp = null, ang = 0;
        if (ph === "fly") {
          day += Math.max(25, TT / 9) * dt; const s = cl((day - d0) / TT, 0, 1), Dl = phi0 + .524 * TT, th = thE(d0) + Dl * s * DEG, r = 1 + .524 * s;
          rp = pt(th, r); if (last) { dist += Math.hypot(rp.x - last.x, rp.y - last.y) / ZR; ang = Math.atan2(rp.x - last.x, -(rp.y - last.y)); hd = ang; } last = rp; if (trail.length === 0 || Math.hypot(trail[trail.length - 1].x - rp.x, trail[trail.length - 1].y - rp.y) > 5) trail.push(rp);
          fx.smoke(rp.x, rp.y, 0, 0);
          if (s >= 1) {
            ph = "done"; mt = 6; const mk = dist * AU; log.go("Mars", mk); g.sfx("star"); g.sfx("cheer"); fx.burst(rp.x, rp.y, ["#ffd93d", "#ff9f43", "#fff"], 30, 150);
            const gap = Math.hypot(rp.x - pt(thE(day), 1).x, rp.y - pt(thE(day), 1).y) / ZR * AU;
            msg = "Arrived at Mars after " + fmt(TT) + " days (" + (TT / 30.4).toFixed(1) + " months)! You flew " + big(mk) + ". Earth is now " + big(gap) + " away.";
          }
        }
        if (ph === "done" && mt <= 0) { ph = "idle"; trail = []; }
        // draw
        space(q, W, H, "#04061e", "#0c1440"); drawStars(q, st, W, H, T);
        const sg = q.createRadialGradient(cx, cy, 2, cx, cy, 46); sg.addColorStop(0, "#fff7c0"); sg.addColorStop(.35, "#ffd93d"); sg.addColorStop(1, "rgba(255,160,40,0)"); q.fillStyle = sg; q.beginPath(); q.arc(cx, cy, 46, 0, 7); q.fill();
        q.strokeStyle = "rgba(255,255,255,.18)"; q.lineWidth = 1; [.39, .72, 1, 1.524].forEach(r => { q.beginPath(); q.arc(cx, cy, ZR * r, 0, PI2); q.stroke(); });
        if (trail.length > 1) { q.strokeStyle = "rgba(255,226,122,.8)"; q.lineWidth = 2; q.beginPath(); trail.forEach((p, i) => i ? q.lineTo(p.x, p.y) : q.moveTo(p.x, p.y)); q.stroke(); }
        const E = pt(thE(day), 1), M = pt(thM(day), 1.524);
        drawPlanet(q, PL[2], E.x, E.y, 8); txt(q, "Earth", E.x, E.y - 16, 12, "#aee2ff"); drawPlanet(q, PL[3], M.x, M.y, 6.5); txt(q, "Mars", M.x, M.y - 15, 12, "#ffb59a");
        if (ph === "idle" || ph === "count") { rocket(q, E.x, E.y - 18, 0, .35, { fl: ph === "count" && S0.ct < 1 ? 1 : 0, t }); }
        if (rp) rocket(q, rp.x, rp.y, ang || hd, .4, { fl: 1, t });
        fx.draw(q, dt);
        const mdays = Math.floor(ph === "fly" || ph === "done" ? day - d0 : 0);
        txt(q, ph === "fly" || ph === "done" ? "Mission clock: Day " + fmt(mdays) + "  (" + ((day - d0) / 30.4).toFixed(1) + " months)" : "Waiting on Earth. Date: day " + fmt(day), 16, 22, 15, "#fff", "left");
        if (ph === "fly") { txt(q, "Flown so far: " + big(dist * AU), 16, 46, 15, "#ffe27a", "left"); const dm = rp ? Math.hypot(rp.x - M.x, rp.y - M.y) / ZR * AU : 0; txt(q, "Mars is " + big(dm) + " ahead", 16, 68, 15, "#ffb59a", "left"); }
        if (ph === "count") cnum(q, S0, W, H);
        if (ph === "done") { txt(q, "Welcome to Mars!", W / 2, H - 70, 24, "#ffe27a"); const words = msg.split(". "); txt(q, words[0] + ".", W / 2, H - 46, 14, "#fff"); txt(q, (words[1] || "") + (words[2] ? ". " + words[2] : ""), W / 2, H - 26, 14, "#fff"); }
        if (ph === "idle" || ph === "count") {
          if (g.diff > 0) { const ph_ = phiNow(), bx = 120, bw = 400, by_ = H - 30; q.fillStyle = "rgba(0,0,0,.5)"; q.fillRect(bx, by_, bw, 14); q.fillStyle = "#3b9c4c"; q.fillRect(bx + (44 - tol) / 360 * bw, by_, tol * 2 / 360 * bw, 14); q.fillStyle = "#ffd93d"; q.fillRect(bx + (ph_ % 360) / 360 * bw - 2, by_ - 4, 4, 22); txt(q, Math.abs(ph_ - 44) <= tol ? "Launch window OPEN - go!" : "Wait for the green window...", W / 2, by_ - 14, 14, Math.abs(ph_ - 44) <= tol ? "#b7ffd0" : "#fff"); }
          else txt(q, wait ? "Waiting for the best launch window..." : "Press Launch to fly to Mars!", W / 2, H - 22, 18, "#fff");
        }
      });
    }
  });

  // ======================= 4. Solar System Tour =======================
  B.add({
    id: "s16-solar-tour", name: "Solar System Tour", ages: [5, 16], cat: "Creative", color: "#ffb347", icon: "So",
    desc: "Fly past every real planet in order, from fiery Mercury to icy Neptune.", controls: "Press Start. Medium and Hard: move your finger or mouse (or Up and Down keys) to steer, hold to boost",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(640, 400), fx = mkFx(), st = mkStars(100, W, H), log = mkLog(g), P = mkPtr(g, c, pos);
      const PX = [600, 1250, 1900, 2550, 3450, 4450, 5300, 6100], PY = [215, 170, 230, 190, 200, 205, 185, 215], rocks = [];
      for (let i = 0; i < 70; i++) rocks.push({ x: rnd(2750, 3350), y: rnd(30, 370), r: rnd(4, 10), a: rnd(0, 6) });
      const dx = [-120].concat(PX), dd = [0].concat(PL.map(p => p.d)), tol = g.by(999, 110, 48);
      const distAt = X => { if (X <= dx[0]) return 0; for (let i = 1; i < dx.length; i++) if (X <= dx[i]) return dd[i - 1] + (dd[i] - dd[i - 1]) * (X - dx[i - 1]) / (dx[i] - dx[i - 1]); return dd[dd.length - 1]; };
      const bar = mkBar(g), act = mkBar(g);
      let X = -80, sy = 200, ph = "idle", S0 = { ct: 3, cn: 4 }, idx = 0, lastD = 0, slow = 0, fuel = 100, T = 0, shake = 0, bn = null, bt = 0, vis = 0;
      const starts = [{ n: "Start at the Sun", i: 0 }, { n: "Start at Earth", i: 2 }, { n: "Start at Mars", i: 3 }].slice(0, g.by(1, 2, 3));
      starts.forEach(s => mkBtn(g, bar, s.n, () => {
        if (ph === "count" || ph === "fly") return;
        X = s.i === 0 ? -80 : PX[s.i] - 420; idx = s.i; lastD = distAt(X); ph = "count"; S0.ct = 3; S0.cn = 4; fuel = 100; slow = 0; bn = null; vis = 0; sy = 200; P.y = 200;
      }, true));
      mkBtn(g, act, "Finish", () => log.fin());
      g.loop((dt, t) => {
        T += dt; bt = Math.max(0, bt - dt); shake = Math.max(0, shake - dt);
        if (ph === "count" && cdown(S0, g, dt)) { ph = "fly"; shake = .4; }
        if (ph === "fly") {
          let sp = g.by(230, 200, 170); const k = g.keys;
          if (g.diff > 0) {
            const bo = (P.d || k[" "] || k.ArrowRight) && (g.diff === 1 || fuel > 2); if (bo) { sp = g.by(0, 380, 340); if (g.diff === 2) fuel = Math.max(0, fuel - 30 * dt); } else if (g.diff === 2) fuel = Math.min(100, fuel + 14 * dt);
            if (k.ArrowUp) P.y -= 220 * dt; if (k.ArrowDown) P.y += 220 * dt; P.y = cl(P.y, 30, H - 30); sy += (P.y - sy) * Math.min(1, 7 * dt);
          } else { const tgt = idx < 8 && PX[idx] - X < 520 ? PY[idx] - prad(PL[idx]) - 36 : 200; sy += (tgt - sy) * Math.min(1, 2.5 * dt); }
          if (slow > 0) { sp *= .4; slow -= dt; }
          X += sp * dt;
          if (g.diff === 2) rocks.forEach(r => { if (slow <= 0 && Math.hypot(r.x - X, r.y - sy) < r.r + 10) { slow = 1.2; shake = .35; g.sfx("thump"); fx.burst(150, sy, "#aaa", 8, 90); } });
          fx.fire(138, sy, -150, 0);
          if (idx < 8 && X >= PX[idx]) {
            const p = PL[idx], r = prad(p), d = distAt(PX[idx]), ok = Math.abs(sy - PY[idx]) < r + tol;
            if (ok) { vis++; log.go(p.n, (d - lastD) * 1e6); g.sfx("star"); g.sfx("note", 440 + idx * 60); fx.burst(150, sy, ["#ffd93d", "#fff", p.c1], 22, 150); } else { log.add((d - lastD) * 1e6); g.sfx("click"); }
            bn = { a: ok ? p.n + "!" : "Flew past " + p.n, b: fmt(d) + " million km from the Sun. " + fmt(p.dia) + " km wide." }; bt = 3.2; lastD = d; idx++;
          }
          if (X > PX[7] + 520) { ph = "done"; g.sfx("cheer"); bn = { a: "Tour complete!", b: "You flew 4,515 million km out to Neptune and saw " + vis + " planets up close." }; bt = 99; }
        }
        const cam = X - 150; q.save(); if (shake > 0) q.translate(rnd(-3, 3), rnd(-3, 3));
        space(q, W, H, "#03051a", "#0b1240"); drawStars(q, st, W, H, T, cam);
        const sunX = -380 - cam; if (sunX > -420) { const gr = q.createRadialGradient(sunX, 200, 40, sunX, 200, 360); gr.addColorStop(0, "#fff6b0"); gr.addColorStop(.45, "#ffcf3d"); gr.addColorStop(1, "rgba(255,150,40,0)"); q.fillStyle = gr; q.beginPath(); q.arc(sunX, 200, 360, 0, 7); q.fill(); txt(q, "The Sun", Math.max(60, sunX + 330), 40, 15, "#ffe27a"); }
        PL.forEach((p, i) => { const x = PX[i] - cam, r = prad(p); if (x < -r * 2.2 - 20 || x > W + r * 2.2 + 20) return; drawPlanet(q, p, x, PY[i], r); txt(q, p.n, x, PY[i] - r - 14, 14, "#fff"); txt(q, fmt(p.d) + " million km", x, PY[i] + r + 16, 11, "#b9c6ff"); });
        rocks.forEach(r => { const x = r.x - cam; if (x < -20 || x > W + 20) return; q.fillStyle = "#8d8b94"; q.beginPath(); for (let i = 0; i < 7; i++) { const an = i / 7 * PI2 + r.a, rr = r.r * (.75 + .25 * Math.sin(i * 2.3 + r.a)); q.lineTo(x + Math.cos(an) * rr, r.y + Math.sin(an) * rr); } q.closePath(); q.fill(); });
        if (ph !== "idle") { rocket(q, 150, sy, PI / 2, .7, { fl: ph === "fly" ? 1 : (ph === "count" && S0.ct < 1 ? 1 : 0), t }); }
        fx.draw(q, dt); q.restore();
        if (ph === "idle") { txt(q, "Fly past all the planets!", W / 2, 40, 26, "#fff"); txt(q, "Pick where to start", W / 2, 72, 16, "#ffe27a"); }
        else { txt(q, "Distance from the Sun: " + fmt(distAt(X)) + " million km", 16, 22, 15, "#ffe27a", "left"); if (g.diff === 2 && ph === "fly") { q.fillStyle = "rgba(0,0,0,.5)"; q.fillRect(16, 38, 110, 11); q.fillStyle = "#ffd93d"; q.fillRect(16, 38, fuel * 1.1, 11); txt(q, "Boost", 134, 44, 12, "#ffe27a", "left"); } }
        if (ph === "count") cnum(q, S0, W, H);
        if (ph === "fly" && g.diff > 0 && X < PX[idx > 7 ? 7 : idx] - 300 && T < 12) txt(q, "Steer close to each planet!", W / 2, H - 22, 16, "#b5e6ff");
        if (bn && bt > 0) { txt(q, bn.a, W / 2, 58, 28, "#ffe27a"); txt(q, bn.b, W / 2, 90, 15, "#fff"); }
      });
    }
  });

  // ======================= 5. Space Station Dock =======================
  B.add({
    id: "s16-iss-dock", name: "Space Station Dock", ages: [5, 18], cat: "Creative", color: "#7fd0ff", icon: "I",
    desc: "Launch a spacecraft 408 km up and dock with the real International Space Station.", controls: "Pick a spacecraft. Medium and Hard: arrow keys, or hold and drag, to push the ship onto the glowing ring slowly",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(640, 400), fx = mkFx(), st = mkStars(80, W, H), log = mkLog(g), P = mkPtr(g, c, pos);
      const VEH = ["Crew Dragon", "Soyuz", "Cargo ship"], bar = mkBar(g), act = mkBar(g), tol = g.by(999, 24, 11), vlim = g.by(999, 55, 28), ISX = 500, ISY = 190, PXd = 438;
      let ph = "idle", v = 0, S0 = { ct: 3, cn: 4 }, f = 0, T = 0, ship = null, bst = null, kk = 0, mt = 0, hint = 0, PYc = ISY, staged = false;
      const capsule = (x, y, vi, fl, t) => {
        q.save(); q.translate(x, y);
        if (fl) { fx.add(x - 34, y + rnd(-3, 3), rnd(-80, -50), rnd(-6, 6), .3, "#cfe8ff", 2.5, -4); }
        if (vi === 0) { sh(q, "#555d70", p => p.rect(-36, -14, 12, 28), 3); sh(q, "#f4f6fb", p => { p.moveTo(-24, -15); p.lineTo(8, -10); p.lineTo(8, 10); p.lineTo(-24, 15); p.closePath(); }, 3); sh(q, "#2b3245", p => { p.moveTo(8, -10); p.quadraticCurveTo(28, -4, 32, 0); p.quadraticCurveTo(28, 4, 8, 10); p.closePath(); }, 3); dot(q, "#8fe3ff", -8, 0, 4); }
        else if (vi === 1) { sh(q, "#3a6cd8", p => p.rect(-30, -38, 18, 24), 2.5); sh(q, "#3a6cd8", p => p.rect(-30, 14, 18, 24), 2.5); sh(q, "#6c8a4a", p => p.rect(-34, -12, 24, 24), 3); sh(q, "#c9b26a", p => { p.moveTo(-10, -13); p.lineTo(10, -9); p.lineTo(10, 9); p.lineTo(-10, 13); p.closePath(); }, 3); sh(q, "#d9c37a", p => p.arc(20, 0, 11, 0, 7), 3); dot(q, "#8fe3ff", 20, 0, 3.5); }
        else { sh(q, "#3a6cd8", p => p.rect(-22, -36, 30, 17), 2.5); sh(q, "#3a6cd8", p => p.rect(-22, 19, 30, 17), 2.5); sh(q, "#c9ced8", p => p.rect(-34, -13, 52, 26), 3); sh(q, "#ff9f43", p => p.rect(-8, -13, 10, 26), 2.5); sh(q, "#aab0c0", p => { p.moveTo(18, -9); p.lineTo(28, -5); p.lineTo(28, 5); p.lineTo(18, 9); p.closePath(); }, 3); }
        q.restore();
      };
      const iss = (x, y, t) => {
        q.save(); q.translate(x, y);
        sh(q, "#9aa3b8", p => p.rect(-48, -3, 170, 6), 2);
        [20, 60, 100].forEach(px => { [[-82, 76], [6, 76]].forEach(r => { sh(q, "#e0a83c", p => p.rect(px - 11, r[0], 22, r[1]), 2.5); q.strokeStyle = "rgba(60,80,160,.6)"; q.lineWidth = 1; for (let i = 1; i < 5; i++) { q.beginPath(); q.moveTo(px - 11, r[0] + i * 15); q.lineTo(px + 11, r[0] + i * 15); q.stroke(); } }); });
        [-38, -20].forEach(rx => sh(q, "#dfe3ee", p => p.rect(rx, -36, 10, 30), 2)); [-38, -20].forEach(rx => sh(q, "#dfe3ee", p => p.rect(rx, 6, 10, 30), 2));
        sh(q, "#f4f6fb", p => p.roundRect(-62, -12, 82, 24, 8), 3); sh(q, "#dfe3ee", p => p.roundRect(-12, -30, 24, 60, 8), 3); sh(q, "#e8ecf4", p => p.roundRect(-62, -9, 14, 18, 4), 3);
        dot(q, "#8fe3ff", 8, 0, 3); dot(q, "#8fe3ff", -30, 0, 3);
        q.restore();
      };
      VEH.forEach((n, i) => mkBtn(g, bar, n, () => { if (ph !== "idle") return; v = i; ph = "count"; S0.ct = 3; S0.cn = 4; f = 0; staged = false; bst = null; }, true));
      mkBtn(g, act, "Finish", () => log.fin());
      const mm = s => { s = Math.floor(s); return "T+ " + String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
      g.loop((dt, t) => {
        T += dt; mt = Math.max(0, mt - dt); hint = Math.max(0, hint - dt);
        if (ph === "docked" && mt <= 0) { ph = "idle"; ship = null; }
        if (ph === "count" && cdown(S0, g, dt)) ph = "asc";
        let ry = H - 105;
        if (ph === "asc") {
          f = Math.min(1, f + dt / 7); ry = lerpY(H - 105, 120, ease(f)); fx.fire(W / 2, ry + 36, 0, 150); fx.smoke(W / 2, ry + 40, 0, 60);
          if (f > .5 && !staged) { staged = true; bst = { x: W / 2, y: ry + 30, vx: rnd(-30, 30), vy: 30, a: 0 }; g.sfx("pop"); fx.burst(W / 2, ry + 30, ["#fff", "#ffd93d"], 14, 100); }
          if (f >= 1) { ph = "rdv"; ship = { x: 70, y: 300, vx: 24, vy: -10 }; kk = 0; hint = 0; g.sfx("beep"); }
        }
        if (bst) { bst.vy += 140 * dt; bst.x += bst.vx * dt; bst.y += bst.vy * dt; bst.a += dt * 1.3; if (bst.y > H + 40) bst = null; }
        PYc = ISY + (g.diff === 2 ? 16 * Math.sin(T * .7) : g.diff === 1 ? 6 * Math.sin(T * .7) : 0);
        if (ph === "rdv") {
          if (g.diff === 0) { kk = Math.min(1, kk + dt / 6); ship.x = lerpY(70, PXd - 33, ease(kk)); ship.y = lerpY(300, PYc, ease(kk)); if (kk >= 1) ship.x = PXd - 30; }
          else {
            const k = g.keys; let ax = (k.ArrowRight ? 1 : 0) - (k.ArrowLeft ? 1 : 0), ay = (k.ArrowDown ? 1 : 0) - (k.ArrowUp ? 1 : 0);
            if (P.d) { const dxp = P.x - ship.x, dyp = P.y - ship.y, dl = Math.hypot(dxp, dyp); if (dl > 14) { ax = dxp / dl; ay = dyp / dl; } }
            ship.vx += ax * 60 * dt; ship.vy += ay * 60 * dt; ship.vx *= 1 - .25 * dt; ship.vy *= 1 - .25 * dt; ship.x += ship.vx * dt; ship.y += ship.vy * dt;
            if (ax || ay) fx.add(ship.x - 30, ship.y, -ax * 40, -ay * 40, .3, "#cfe8ff", 2.5, -3);
            ship.x = Math.max(24, ship.x); ship.y = cl(ship.y, 24, H - 120);
            if (ship.x + 30 >= PXd) {
              const sp = Math.hypot(ship.vx, ship.vy);
              if (Math.abs(ship.y - PYc) <= tol && sp <= vlim) { kk = 1; ship.vx = ship.vy = 0; } else { ship.x = PXd - 33; ship.vx = -35; ship.vy *= .3; hint = 1.8; g.sfx("thump"); fx.burst(PXd, ship.y, "#fff", 8, 70); }
            }
          }
          if (kk >= 1 && ship.x + 30 >= PXd - 3) { ph = "docked"; mt = 6; log.go("International Space Station", 408); g.sfx("lock"); g.sfx("star"); g.sfx("cheer"); fx.burst(PXd, PYc, ["#ffd93d", "#fff", "#7fd0ff"], 30, 150); }
        }
        // draw
        const inOrbit = ph === "rdv" || ph === "docked" || ph === "idle";
        if (ph === "asc" || ph === "count") {
          const a = cl(f * 1.5, 0, 1), sky = q.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "rgb(" + Math.round(110 - 105 * a) + "," + Math.round(190 - 180 * a) + "," + Math.round(255 - 215 * a) + ")"); sky.addColorStop(1, "rgb(" + Math.round(200 - 180 * a) + "," + Math.round(230 - 215 * a) + "," + Math.round(255 - 215 * a) + ")"); q.fillStyle = sky; q.fillRect(0, 0, W, H);
          q.globalAlpha = a; drawStars(q, st, W, H, T); q.globalAlpha = 1; if (f > .15) earthRoll(q, W, H, H - 80 + (1 - cl((f - .15) * 3, 0, 1)) * 140, T, cl((f - .15) * 3, 0, 1));
          const gy = H - 60 + ease(f) * 500; q.fillStyle = "#5fb25f"; q.fillRect(0, gy, W, H); q.fillStyle = "#8d94a8"; q.fillRect(W / 2 - 50, gy - 6, 100, 8); q.fillStyle = "#6a7088"; q.fillRect(W / 2 + 22, gy - 90, 8, 86);
          const fl = ph === "asc" || S0.ct < 1; if (ph === "count" && fl) { fx.fire(W / 2, ry + 36, 0, 130); fx.smoke(W / 2, ry + 40, rnd(-60, 60), 20); }
          rocket(q, W / 2, ry, 0, 1, { fl: fl ? 1 : 0, t, body: v === 1 ? "#d9c37a" : v === 2 ? "#c9ced8" : "#f4f6fb", nose: v === 0 ? "#2b3245" : v === 1 ? "#6c8a4a" : "#ff9f43", fin: v === 1 ? "#3a6cd8" : "#2b3245" });
          if (bst) { q.save(); q.translate(bst.x, bst.y); q.rotate(bst.a); sh(q, "#dfe3ee", p => p.rect(-9, -22, 18, 44), 3); q.restore(); }
          fx.draw(q, dt);
          if (ph === "asc") { txt(q, "Altitude " + fmt(408 * ease(f)) + " km", 16, 24, 17, "#ffe27a", "left"); txt(q, "Speed " + fmt(27600 * ease(f)) + " km/h", 16, 48, 15, "#fff", "left"); txt(q, mm(510 * f), W - 16, 24, 17, "#fff", "right"); }
          else cnum(q, S0, W, H);
        }
        if (inOrbit) {
          space(q, W, H, "#02030f", "#08103a"); drawStars(q, st, W, H, T, T * 14); earthRoll(q, W, H, H - 82, T, 1);
          iss(ISX, PYc, T);
          if (ph === "rdv") { const glow = .5 + .5 * Math.sin(T * 6); q.strokeStyle = "rgba(255,217,61," + (.5 + .5 * glow) + ")"; q.lineWidth = 3; q.beginPath(); q.arc(PXd - 3, PYc, Math.min(30, 12 + (tol > 100 ? 16 : tol)), 0, 7); q.stroke(); }
          if (ship) capsule(ship.x, ship.y, v, ph === "rdv", T);
          if (ph === "docked") { const hy = PYc; dot(q, "#1a2040", PXd - 8, hy, 12); astro(q, PXd - 22, hy + 24, .7, 0, T); txt(q, "Welcome aboard!", W / 2, 34, 28, "#ffe27a"); txt(q, "The Space Station is 408 km up and circles Earth every 92 minutes.", W / 2, 66, 14, "#fff"); }
          if (ph === "idle") { txt(q, "Pick a spacecraft to fly to the Space Station!", W / 2, 34, 22, "#fff"); txt(q, "It travels at 27,600 km/h", W / 2, 62, 14, "#b5e6ff"); }
          if (ph === "rdv") {
            txt(q, g.diff === 0 ? "Autopilot docking..." : "Slowly steer onto the glowing ring", W / 2, 26, 18, "#fff");
            if (g.diff > 0) { const sp = Math.hypot(ship.vx, ship.vy), ok = sp <= vlim; q.fillStyle = "rgba(0,0,0,.45)"; q.fillRect(14, 44, 120, 12); q.fillStyle = ok ? "#6be28f" : "#ff5c7a"; q.fillRect(14, 44, cl(sp / (vlim * 2), 0, 1) * 120, 12); txt(q, ok ? "Speed OK" : "Too fast", 74, 68, 13, ok ? "#b7ffd0" : "#ffb0b0"); }
            if (hint > 0) txt(q, "Too fast or not lined up! Try again slowly.", W / 2, H - 16, 16, "#ffd0d0");
          }
          fx.draw(q, dt);
        }
      });
    }
  });

  // ======================= 6. Deep Space Probe =======================
  B.add({
    id: "s16-deep-probe", name: "Deep Space Probe", ages: [6, 20], cat: "Creative", color: "#9a8cff", icon: "P",
    desc: "Send a probe out past Mars, Jupiter, Neptune and Pluto with a growing distance counter.", controls: "Press Launch. Medium and Hard: slide to steer, hold to boost. Hard: catch glowing cells to keep your power up",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(640, 400), fx = mkFx(), st = mkStars(110, W, H), log = mkLog(g), P = mkPtr(g, c, pos);
      const LN = Math.log(120), uOf = au => Math.log(au) / LN, K = 3000, AU = 149.6e6;
      const MS = [[PL[3], 140], [PL[4], 230], [PL[5], 150], [PL[6], 240], [PL[7], 165], [PLUTO, 215]].map(a => ({ p: a[0], y: a[1], u: uOf(a[0].au), au: a[0].au }));
      const uMax = g.diff === 0 ? uOf(39.5) + .028 : 1.0, bar = mkBar(g), act = mkBar(g);
      let u = 0, ph = "idle", S0 = { ct: 3, cn: 4 }, T = 0, py = 200, idx = 0, prevAU = 1, bat = 100, slow = 0, tb = 0, shake = 0, bn = null, bt = 0, cells = [], rocks = [], spawn = 0, rspawn = 0;
      const lt = au => { const m = au * 8.317; return m < 90 ? Math.round(m) + " minutes" : (m / 60).toFixed(1) + " hours"; };
      mkBtn(g, bar, "Launch the probe", () => { if (ph === "count" || ph === "fly") return; u = 0; ph = "count"; S0.ct = 3; S0.cn = 4; idx = 0; prevAU = 1; bat = 100; slow = 0; tb = 0; bn = null; cells = []; rocks = []; py = 200; P.y = 200; }, true);
      mkBtn(g, act, "Finish", () => log.fin());
      const probe = (x, y, t, fl) => {
        q.save(); q.translate(x, y); q.strokeStyle = "#8a90a4"; q.lineWidth = 3; q.beginPath(); q.moveTo(10, 0); q.lineTo(44, -6); q.moveTo(10, 4); q.lineTo(34, 24); q.stroke(); sh(q, "#8a90a4", p => p.rect(42, -10, 8, 8), 2); sh(q, "#8a90a4", p => p.rect(32, 22, 8, 8), 2);
        sh(q, "#d9a441", p => p.rect(-4, -9, 18, 18), 3); sh(q, "#f4f6fb", p => p.ellipse(-12, 0, 7, 19, 0, 0, 7), 3); dot(q, "#ffd93d", -12, 0, 2.5); if (fl) dot(q, "rgba(255,200,120," + (.5 + .5 * Math.sin(t * 20)) + ")", 18, 0, 3);
        q.restore();
      };
      g.loop((dt, t) => {
        T += dt; bt = Math.max(0, bt - dt); shake = Math.max(0, shake - dt);
        if (ph === "count" && cdown(S0, g, dt)) { ph = "fly"; shake = .4; }
        let du = 0;
        if (ph === "fly") {
          const k = g.keys; let sp = g.by(.036, .02, .02);
          const bo = g.diff > 0 && (P.d || k[" "] || k.ArrowRight) && (g.diff === 1 || bat > 1);
          if (bo) { sp *= g.diff === 1 ? 2.2 : 1.8; if (g.diff === 2) bat = Math.max(0, bat - 10 * dt); }
          if (g.diff === 2) { bat = Math.max(0, bat - 3.5 * dt); if (bat <= 0) sp *= .35; }
          if (tb > 0) { tb -= dt; sp *= 1.6; } if (slow > 0) { slow -= dt; sp *= .5; }
          du = sp * dt; u += du;
          if (g.diff > 0) { if (k.ArrowUp) P.y -= 230 * dt; if (k.ArrowDown) P.y += 230 * dt; P.y = cl(P.y, 30, H - 30); py += (P.y - py) * Math.min(1, 7 * dt); } else py = 200 + Math.sin(T * .8) * 40;
          const scroll = du / dt * K;
          if (g.diff > 0) {
            spawn -= dt; if (spawn <= 0) { spawn = g.diff === 2 ? 2.2 : 3.2; cells.push({ x: W + 20, y: rnd(40, H - 40) }); }
            cells.forEach(cc => { cc.x -= scroll * dt; if (Math.hypot(cc.x - 150, cc.y - py) < 26) { cc.hit = true; g.sfx("star"); fx.burst(cc.x, cc.y, ["#7fe8ff", "#fff"], 14, 110); if (g.diff === 2) bat = Math.min(100, bat + 24); else tb = 2.2; } });
            cells = cells.filter(cc => !cc.hit && cc.x > -30);
            if (g.diff === 2 && u > uOf(2.0) && u < uOf(5)) { rspawn -= dt; if (rspawn <= 0) { rspawn = .45; rocks.push({ x: W + 20, y: rnd(20, H - 20), r: rnd(5, 11), a: rnd(0, 6) }); } }
            rocks.forEach(r => { r.x -= (scroll + 30) * dt; if (slow <= 0 && Math.hypot(r.x - 150, r.y - py) < r.r + 11) { slow = 1.1; shake = .35; g.sfx("thump"); fx.burst(150, py, "#aaa", 8, 90); } });
            rocks = rocks.filter(r => r.x > -30);
          }
          fx.add(166, py, rnd(10, 30), rnd(-6, 6), .3, "#ffd9a0", 2, -3);
          while (idx < MS.length && u >= MS[idx].u) {
            const m = MS[idx]; log.go(m.p.n, (m.au - prevAU) * AU); prevAU = m.au; g.sfx("star"); g.sfx("note", 400 + idx * 70); fx.burst(150, py, ["#ffd93d", "#fff", m.p.c1], 22, 150);
            bn = { a: m.p.n + "!", b: m.au + " AU: " + big(m.au * AU) + " from the Sun. Radio signal: " + lt(m.au) }; bt = 3.6; idx++;
          }
          if (u >= uMax) {
            u = uMax; ph = "done"; const au = Math.exp(u * LN); log.add((au - prevAU) * AU); g.sfx("cheer"); g.sfx("finish");
            bn = g.diff === 0 ? { a: "You flew past Pluto!", b: "About 5.9 billion km from the Sun. A radio message takes " + lt(39.5) + " to get home." } : { a: "You left the Sun's bubble!", b: "About 18 billion km from the Sun, 120 times farther than Earth. Signal: " + lt(120) }; bt = 99;
          }
        }
        // draw
        q.save(); if (shake > 0) q.translate(rnd(-3, 3), rnd(-3, 3));
        space(q, W, H, "#03051a", "#0a0f38"); drawStars(q, st, W, H, T, u * K * .3);
        const ex = 150 - u * K; if (ex > -120) { drawPlanet(q, PL[2], ex, 200, 14); txt(q, "Earth", ex, 176, 13, "#aee2ff"); }
        MS.forEach(m => { const x = 150 + (m.u - u) * K, r = prad(m.p); if (x < -r * 2.2 - 20 || x > W + r * 2.2 + 20) return; drawPlanet(q, m.p, x, m.y, r); txt(q, m.p.n, x, m.y - r - 14, 14, "#fff"); });
        if (uMax >= 1) { const x = 150 + (1 - u) * K; if (x < W + 40 && x > -40) { q.strokeStyle = "rgba(120,200,255,.7)"; q.lineWidth = 3; q.setLineDash([10, 8]); q.beginPath(); for (let y = 0; y <= H; y += 10) q.lineTo(x + Math.sin(y * .05 + T) * 8, y); q.stroke(); q.setLineDash([]); txt(q, "Edge of the Sun's bubble", x - 10, 24, 14, "#9fdcff", "right"); } }
        cells.forEach(cc => { dot(q, "rgba(127,232,255,.35)", cc.x, cc.y, 14 + Math.sin(T * 6) * 2); dot(q, "#7fe8ff", cc.x, cc.y, 6); });
        rocks.forEach(r => { q.fillStyle = "#8d8b94"; q.beginPath(); for (let i = 0; i < 7; i++) { const an = i / 7 * PI2 + r.a, rr = r.r * (.75 + .25 * Math.sin(i * 2.3 + r.a)); q.lineTo(r.x + Math.cos(an) * rr, r.y + Math.sin(an) * rr); } q.closePath(); q.fill(); });
        if (ph !== "idle") probe(150, ph === "fly" || ph === "done" ? py : 200, T, ph === "fly");
        fx.draw(q, dt); q.restore();
        const au = Math.exp(u * LN);
        if (ph === "idle") { txt(q, "Send a probe to the edge of the Solar System!", W / 2, 40, 22, "#fff"); txt(q, "Like the real Voyager probes", W / 2, 68, 15, "#b5e6ff"); }
        else { txt(q, big(au * AU), W / 2, 28, 28, "#ffe27a"); txt(q, "from the Sun  (" + (au < 10 ? au.toFixed(1) : fmt(au)) + " AU)", W / 2, 56, 14, "#fff"); txt(q, "Radio signal home: " + lt(au), W / 2, 78, 13, "#b5e6ff"); }
        if (ph === "count") cnum(q, S0, W, H);
        if (ph === "fly" && g.diff === 2) { q.fillStyle = "rgba(0,0,0,.5)"; q.fillRect(14, H - 26, 120, 12); q.fillStyle = bat > 25 ? "#7fe8ff" : "#ff5c7a"; q.fillRect(14, H - 26, bat * 1.2, 12); txt(q, "Power", 140, H - 20, 12, "#b5e6ff", "left"); }
        if (ph === "fly" && g.diff > 0 && T < 14) txt(q, g.diff === 2 ? "Grab the glowing cells for power. Dodge rocks." : "Hold to boost. Grab glowing cells for a turbo!", W / 2, H - 14, 15, "#b5e6ff");
        if (bn && bt > 0) { txt(q, bn.a, W / 2, H - 78, 26, "#ffe27a"); txt(q, bn.b, W / 2, H - 50, 14, "#fff"); }
      });
    }
  });

  // ======================= 7. Rocket Mail =======================
  B.add({
    id: "s16-rocket-mail", name: "Rocket Mail", ages: [5, 14], cat: "Creative", color: "#ff7a8a", icon: "Rm",
    desc: "Deliver parcels by rocket to famous places around a drawn map of the world.", controls: "Tap a place (on the map or the buttons). Hard: your fuel is limited, so land on the blue H depots to refuel",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(640, 400), fx = mkFx(), log = mkLog(g), MY0 = 44, MH = 320;
      const mp = (lat, lon) => ({ x: (lon + 180) / 360 * W, y: MY0 + (90 - lat) / 180 * MH });
      const pins = CITY.slice(0, g.by(5, 10, 16)).map(d => Object.assign({}, d, { pk: true, rs: 0, dep: g.diff === 2 && ["New York", "Cairo", "Tokyo"].indexOf(d.n) >= 0 }));
      const HQ = { n: "Rocket HQ", lm: "Cape Canaveral", lat: 28.5, lon: -80.6 }, FM = 9000, bar = mkBar(g), act = mkBar(g);
      let cur = HQ, to = null, ph = "idle", f = 0, km = 0, part = 1, fuel = FM, T = 0, msg = "Tap a place to deliver a parcel!", mt = 0, la = 0, dur = 3, chute = 0, lastPin = null, trail = [];
      const pathPt = ff => { const p = slerp(cur, to, ff * part), m = mp(p.lat, p.lon); return { x: m.x, y: m.y - Math.sin(PI * ff) * (26 + km / 20000 * 50) }; };
      const go = d => {
        if (ph !== "idle") return; if (d.n === cur.n) { msg = "You are already here!"; mt = 2; g.sfx("wrong"); return; }
        to = d; km = gcd(cur, d); part = 1; if (g.diff === 2 && km > fuel) part = fuel / km; dur = 1.6 + km / 20000 * 2.8; f = 0; ph = "fly"; trail = []; g.sfx("launch"); lastPin = d.n === "Rocket HQ" ? null : d; if (g.diff === 2) fuel -= km * part;
      };
      pins.forEach(d => mkBtn(g, bar, d.n, () => go(d), true));
      if (g.diff > 0) mkBtn(g, bar, "Back to HQ", () => go(HQ), true);
      mkBtn(g, act, "Finish", () => log.fin());
      g.on(c, "pointerdown", e => { const p = pos(e); let best = null, bd = 26; pins.forEach(d => { const m = mp(d.lat, d.lon), dd = Math.hypot(m.x - p.x, m.y - p.y); if (dd < bd) { bd = dd; best = d; } }); if (best) go(best); });
      g.loop((dt, t) => {
        T += dt; mt = Math.max(0, mt - dt);
        pins.forEach(d => { if (!d.pk) { d.rs -= dt; if (d.rs <= 0) d.pk = true; } });
        let rp = null;
        if (ph === "fly") {
          f = Math.min(1, f + dt / dur); const e = ease(f), p0 = pathPt(e), p1 = pathPt(Math.min(1, ease(Math.min(1, f + .03))));
          if (Math.abs(p1.x - p0.x) < 200 && Math.hypot(p1.x - p0.x, p1.y - p0.y) > .05) la = Math.atan2(p1.x - p0.x, -(p1.y - p0.y)); rp = p0;
          fx.fire(p0.x - Math.sin(la) * 10, p0.y + Math.cos(la) * 10, -Math.sin(la) * 60, Math.cos(la) * 60); if (Math.random() < .5) fx.smoke(p0.x, p0.y + 6, 0, 0);
          if (trail.length === 0 || Math.hypot(trail[trail.length - 1].x - p0.x, trail[trail.length - 1].y - p0.y) > 6) trail.push(p0);
          if (f >= 1) {
            const lp = slerp(cur, to, part); ph = "drop"; chute = 0;
            if (part < 1) { cur = { n: "the ocean", lm: "", lat: lp.lat, lon: lp.lon }; log.add(km * part); msg = "Out of fuel! You landed in the ocean. A boat brings new fuel."; fuel = FM; g.sfx("splash"); }
            else {
              cur = to; if (to.dep) { fuel = FM; }
              if (to.pk && to !== HQ) { to.pk = false; to.rs = 8; log.go(to.n, km); msg = "Parcel delivered to " + to.n + "! " + to.lm + ". " + fmt(km) + " km." + (to.dep ? " Refuelled!" : ""); g.sfx("star"); g.sfx("cheer"); const m = mp(to.lat, to.lon); fx.burst(m.x, m.y, ["#ffd93d", "#ff5c7a", "#6be28f", "#3ec1ff"], 28, 150); }
              else { log.add(km); msg = to === HQ ? "Back at Rocket HQ. Refuelled!" : "Flew to " + to.n + " for fun: " + fmt(km) + " km."; if (to === HQ) fuel = FM; g.sfx("click"); }
            }
            mt = 4;
          }
        }
        if (ph === "drop") { chute += dt; if (chute > 1.1) ph = "idle"; }
        // draw
        space(q, W, H, "#0d2a5c", "#154a86"); q.fillStyle = "#12356b"; q.fillRect(0, MY0, W, MH);
        q.strokeStyle = "rgba(255,255,255,.1)"; q.lineWidth = 1; for (let lo = -150; lo <= 180; lo += 30) { const x = mp(0, lo).x; q.beginPath(); q.moveTo(x, MY0); q.lineTo(x, MY0 + MH); q.stroke(); } for (let la_ = -60; la_ <= 60; la_ += 30) { const y = mp(la_, 0).y; q.beginPath(); q.moveTo(0, y); q.lineTo(W, y); q.stroke(); }
        q.fillStyle = "#5cc462"; q.strokeStyle = "#2f7a3a"; q.lineWidth = 2; CON.forEach(poly => { q.beginPath(); poly.forEach((pt, i) => { const m = mp(pt[1], pt[0]); if (i) q.lineTo(m.x, m.y); else q.moveTo(m.x, m.y); }); q.closePath(); q.fill(); q.stroke(); });
        if (trail.length > 1) { q.strokeStyle = "rgba(255,255,255,.7)"; q.lineWidth = 2; q.setLineDash([4, 5]); q.beginPath(); trail.forEach((p, i) => { if (i && Math.abs(p.x - trail[i - 1].x) < 200) q.lineTo(p.x, p.y); else q.moveTo(p.x, p.y); }); q.stroke(); q.setLineDash([]); }
        const hq = mp(HQ.lat, HQ.lon); sh(q, "#ff9f43", p => p.rect(hq.x - 8, hq.y - 8, 16, 16), 3); txt(q, "HQ", hq.x, hq.y, 11, "#2b3245");
        pins.forEach(d => {
          const m = mp(d.lat, d.lon), bob = d.pk ? Math.sin(T * 4 + m.x) * 2 : 0; dot(q, "#fff", m.x, m.y, 7); dot(q, d.dep ? "#3ec1ff" : "#ff5c7a", m.x, m.y, 5);
          if (d.pk) { sh(q, "#d9a15a", p => p.rect(m.x - 8, m.y - 24 + bob, 16, 12), 2.5); q.fillStyle = "#ff5c7a"; q.fillRect(m.x - 1.5, m.y - 24 + bob, 3, 12); } else { q.strokeStyle = "#6be28f"; q.lineWidth = 4; q.lineCap = "round"; q.beginPath(); q.moveTo(m.x - 6, m.y - 18); q.lineTo(m.x - 1, m.y - 12); q.lineTo(m.x + 7, m.y - 24); q.stroke(); }
          if (d.dep) txt(q, "H", m.x, m.y, 9, "#fff"); txt(q, d.n, m.x, m.y + 15, 11, "#fff");
        });
        if (ph === "idle" || ph === "drop") { const m = mp(cur.lat, cur.lon); rocket(q, m.x, m.y - 20, 0, .38, { t }); }
        if (ph === "drop" && to) { const m = mp(to.lat, to.lon); if (part >= 1 && to.pk === false) { const k = chute / 1.1; sh(q, "#d9a15a", p => p.rect(m.x - 6, m.y - 60 + k * 44, 12, 10), 2); q.strokeStyle = "#fff"; q.lineWidth = 1.5; q.beginPath(); q.moveTo(m.x - 6, m.y - 50 + k * 44); q.lineTo(m.x - 14, m.y - 66 + k * 44); q.moveTo(m.x + 6, m.y - 50 + k * 44); q.lineTo(m.x + 14, m.y - 66 + k * 44); q.stroke(); sh(q, "#ff5c7a", p => p.arc(m.x, m.y - 66 + k * 44, 14, PI, 0), 2.5); } }
        if (rp) rocket(q, rp.x, rp.y, la, .42, { fl: 1, t });
        fx.draw(q, dt);
        txt(q, msg, W / 2, 22, mt > 0 ? 15 : 17, mt > 0 ? "#ffe27a" : "#fff");
        if (g.diff === 2) { q.fillStyle = "rgba(0,0,0,.5)"; q.fillRect(W - 140, 380, 124, 12); q.fillStyle = fuel > 2500 ? "#ffd93d" : "#ff5c7a"; q.fillRect(W - 140, 380, fuel / FM * 124, 12); txt(q, "Fuel", W - 148, 386, 12, "#ffe27a", "right"); }
        if (ph === "fly" && to) txt(q, "Flying to " + to.n + "...  " + fmt(km * part * ease(f)) + " km", W / 2, H - 28, 15, "#fff");
      });
    }
  });

  // ======================= 8. Comet Chaser =======================
  B.add({
    id: "s16-comet-chaser", name: "Comet Chaser", ages: [6, 18], cat: "Creative", color: "#7fe8ff", icon: "C",
    desc: "Chase a famous comet with its glowing tail across the sky and collect a sample.", controls: "Pick a comet. Medium and Hard: move your finger or mouse (or arrow keys) to fly, and stay inside the ring until it fills",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(640, 400), fx = mkFx(), st = mkStars(120, W, H), log = mkLog(g), P = mkPtr(g, c, pos);
      const COM = [{ n: "Halley's Comet", per: "It comes back every 76 years.", d0: 150 }, { n: "Comet NEOWISE", per: "It will not return for about 6,800 years.", d0: 110 }, { n: "Hale-Bopp", per: "It returns in about 2,500 years.", d0: 210 }, { n: "Hyakutake", per: "It returns in about 70,000 years.", d0: 90 }, { n: "Comet 67P", per: "It circles the Sun every 6.4 years. A real probe landed on it!", d0: 300 }].slice(0, g.by(3, 4, 5));
      const bar = mkBar(g), act = mkBar(g), SUN = { x: 70, y: 56 }, RR = g.by(120, 85, 55), spd = g.by(.7, 1, 1.2);
      let cm = null, ph = "idle", S0 = { ct: 3, cn: 4 }, ct = 0, m = 0, R = null, T = 0, mt = 0, msg = "", off = 0;
      const cpos = tt => ({ x: 330 + 210 * Math.sin(tt * .55 + off), y: 205 + 120 * Math.sin(tt * .83 + 1.3 + off) });
      COM.forEach(cc => mkBtn(g, bar, cc.n, () => { if (ph === "count" || ph === "chase") return; cm = cc; ph = "count"; S0.ct = 3; S0.cn = 4; ct = 0; m = 0; off = rnd(0, 6); R = { x: 70, y: 350, vx: 0, vy: 0 }; P.x = 70; P.y = 350; }, true));
      mkBtn(g, act, "Finish", () => log.fin());
      g.loop((dt, t) => {
        T += dt; mt = Math.max(0, mt - dt); if (ph === "done" && mt <= 0) { ph = "idle"; cm = null; }
        const C = cm ? cpos(ct) : { x: 400, y: 160 };
        if (ph === "count" && cdown(S0, g, dt)) ph = "chase";
        if (ph === "chase") {
          const ds = Math.hypot(C.x - SUN.x, C.y - SUN.y); ct += dt * spd * (1 + (g.diff === 2 ? 1.3 * Math.exp(-ds / 170) : 0));
          let tx = P.x, ty = P.y; const k = g.keys;
          if (g.diff === 0) { const n = cpos(ct + .5); tx = n.x; ty = n.y; } else { if (k.ArrowLeft) P.x -= 240 * dt; if (k.ArrowRight) P.x += 240 * dt; if (k.ArrowUp) P.y -= 240 * dt; if (k.ArrowDown) P.y += 240 * dt; P.x = cl(P.x, 10, W - 10); P.y = cl(P.y, 10, H - 10); tx = P.x; ty = P.y; }
          const kk = g.by(7, 6, 3.6), dm = g.by(4, 3.2, 1.3); R.vx += ((tx - R.x) * kk - R.vx * dm) * dt; R.vy += ((ty - R.y) * kk - R.vy * dm) * dt; const sp = Math.hypot(R.vx, R.vy); if (sp > 330) { R.vx *= 330 / sp; R.vy *= 330 / sp; }
          R.x += R.vx * dt; R.y += R.vy * dt;
          if (sp > 25) { fx.fire(R.x - R.vx * .06, R.y - R.vy * .06, -R.vx * .3, -R.vy * .3); if (Math.random() < .4) fx.smoke(R.x, R.y, 0, 0); }
          if (Math.hypot(R.x - C.x, R.y - C.y) < RR) { m = Math.min(1, m + dt / g.by(3, 4.5, 6)); if (Math.random() < .3) fx.add(C.x + rnd(-RR, RR) * .6, C.y + rnd(-RR, RR) * .6, 0, 0, .5, "#7fe8ff", 2.5, -3); } else m = Math.max(0, m - dt * .35);
          if (m >= 1) { ph = "done"; mt = 6; log.go(cm.n, cm.d0 * 1e6); g.sfx("star"); g.sfx("cheer"); fx.burst(C.x, C.y, ["#7fe8ff", "#fff", "#ffd93d"], 36, 170); msg = "Sample collected from " + cm.n + "!"; }
        }
        // draw
        space(q, W, H, "#04051c", "#14104a"); const ng = q.createRadialGradient(480, 300, 20, 480, 300, 260); ng.addColorStop(0, "rgba(120,60,200,.25)"); ng.addColorStop(1, "rgba(120,60,200,0)"); q.fillStyle = ng; q.fillRect(0, 0, W, H); drawStars(q, st, W, H, T);
        const sg = q.createRadialGradient(SUN.x, SUN.y, 2, SUN.x, SUN.y, 60); sg.addColorStop(0, "#fff7c0"); sg.addColorStop(.4, "#ffd93d"); sg.addColorStop(1, "rgba(255,160,40,0)"); q.fillStyle = sg; q.beginPath(); q.arc(SUN.x, SUN.y, 60, 0, 7); q.fill();
        if (cm) {
          const dx = C.x - SUN.x, dy = C.y - SUN.y, ds = Math.hypot(dx, dy) || 1, an = Math.atan2(dy, dx), L = 90 + 7000 / ds * 1.4 + (cm.n === "Hale-Bopp" ? 60 : 0);
          q.save(); q.translate(C.x, C.y); q.rotate(an);
          let gr = q.createLinearGradient(0, 0, L, 0); gr.addColorStop(0, "rgba(120,200,255,.9)"); gr.addColorStop(1, "rgba(120,200,255,0)"); q.fillStyle = gr; q.beginPath(); q.moveTo(0, -7); q.lineTo(L, -2); q.lineTo(L, 2); q.lineTo(0, 7); q.closePath(); q.fill();
          gr = q.createLinearGradient(0, 0, L * .8, 0); gr.addColorStop(0, "rgba(255,230,160,.85)"); gr.addColorStop(1, "rgba(255,230,160,0)"); q.fillStyle = gr; q.beginPath(); q.moveTo(0, -9); q.quadraticCurveTo(L * .5, -4, L * .85, 28); q.quadraticCurveTo(L * .45, 14, 0, 9); q.closePath(); q.fill();
          q.restore();
          if (Math.random() < .5) fx.add(C.x + Math.cos(an) * rnd(10, L * .8), C.y + Math.sin(an) * rnd(10, L * .8) + rnd(-6, 6), 0, 0, .6, "#d6f4ff", 1.8, -2);
          const cg = q.createRadialGradient(C.x, C.y, 2, C.x, C.y, 24); cg.addColorStop(0, "#fff"); cg.addColorStop(.4, "rgba(180,235,255,.8)"); cg.addColorStop(1, "rgba(120,200,255,0)"); q.fillStyle = cg; q.beginPath(); q.arc(C.x, C.y, 24, 0, 7); q.fill(); dot(q, "#8a8a96", C.x, C.y, 5); dot(q, "#c8c8d4", C.x - 1.5, C.y - 1.5, 2.5);
          if (ph === "chase" || ph === "count") {
            q.strokeStyle = "rgba(255,255,255,.35)"; q.lineWidth = 2; q.setLineDash([6, 6]); q.beginPath(); q.arc(C.x, C.y, RR, 0, PI2); q.stroke(); q.setLineDash([]);
            q.strokeStyle = "#6be28f"; q.lineWidth = 6; q.beginPath(); q.arc(C.x, C.y, RR, -PI / 2, -PI / 2 + PI2 * m); q.stroke(); txt(q, cm.n, C.x, C.y - RR - 12, 14, "#fff");
          }
        }
        if (R && ph !== "idle") rocket(q, R.x, R.y, Math.atan2(R.vx, -R.vy + .001) * (Math.hypot(R.vx, R.vy) > 20 ? 1 : 0), .42, { fl: Math.hypot(R.vx, R.vy) > 25 ? 1 : 0, t });
        fx.draw(q, dt);
        if (ph === "idle") txt(q, "Pick a comet to chase!", W / 2, 34, 24, "#fff");
        if (ph === "count") { cnum(q, S0, W, H); txt(q, "Chase " + cm.n, W / 2, 28, 20, "#fff"); }
        if (ph === "chase") { txt(q, "Distance to comet: " + fmt(cm.d0 * (1 - m)) + " million km", W / 2, 26, 17, "#ffe27a"); txt(q, g.diff === 0 ? "Autopilot chasing..." : "Stay inside the ring!", W / 2, H - 16, 15, "#b5e6ff"); }
        if (ph === "done") { txt(q, msg, W / 2, 28, 22, "#ffe27a"); txt(q, cm.per, W / 2, 58, 14, "#fff"); txt(q, "You chased it " + fmt(cm.d0) + " million km", W / 2, 80, 14, "#b5e6ff"); }
      });
    }
  });

  // ======================= 9. Alien Moon Lander =======================
  B.add({
    id: "s16-moon-lander", name: "Alien Moon Lander", ages: [6, 20], cat: "Creative", color: "#d9a15a", icon: "Ti",
    desc: "Pick a real moon of Jupiter or Saturn (Europa, Titan, Enceladus, Io or Ganymede) and land on it.", controls: "Pick a moon. Medium and Hard: hold the screen or Space to fire the engine, slide left or right to steer",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(640, 400), fx = mkFx(), st = mkStars(90, W, H), log = mkLog(g), P = mkPtr(g, c, pos);
      const MOONS = [
        { n: "Europa", host: 4, g: 1.31, dist: "about 630 to 960 million km", km: 780e6, c1: "#eef5f8", c2: "#9db4c0", sky: ["#03040c", "#0a0f26"], dust: "#e8f4ff", dec: "cracks" },
        { n: "Titan", host: 5, g: 1.35, dist: "about 1.2 to 1.7 billion km", km: 1.4e9, c1: "#c9904a", c2: "#7a4a22", sky: ["#7a4a1c", "#d49a4c"], dust: "#e0b070", dec: "lake" },
        { n: "Enceladus", host: 5, g: .113, dist: "about 1.2 to 1.7 billion km", km: 1.4e9, c1: "#fafdff", c2: "#aac6d8", sky: ["#02030a", "#0a1030"], dust: "#ffffff", dec: "geyser" },
        { n: "Io", host: 4, g: 1.8, dist: "about 630 to 960 million km", km: 780e6, c1: "#e8c84a", c2: "#a8561e", sky: ["#04030a", "#1a0e22"], dust: "#f0d070", dec: "volcano" },
        { n: "Ganymede", host: 4, g: 1.43, dist: "about 630 to 960 million km", km: 780e6, c1: "#a89c90", c2: "#4d443c", sky: ["#03040c", "#0a0f26"], dust: "#c8c0b8", dec: "craters" }
      ].slice(0, g.by(3, 5, 5));
      const bar = mkBar(g), fl = mkBar(g), act = mkBar(g); let mo = null, ph = "idle", S0 = { ct: 3, cn: 4 }, T = 0, tc = 0, tl = 0, L = null, mt = 0, msg = "", counted = false, flagC = "#ff5c7a";
      mkLabel(fl, "Flag colour"); mkSwatches(g, fl, ["#ff5c7a", "#ffd93d", "#6be28f", "#3ec1ff", "#c86bff", "#ffffff"], flagC, v => { flagC = v; });
      MOONS.forEach(m => mkBtn(g, bar, m.n, () => {
        if (ph !== "idle" && ph !== "done") return; mo = m; ph = "count"; S0.ct = 3; S0.cn = 4; tc = 0; tl = 0; counted = false; mt = 0;
        const gx = [g.rf(80, 220), g.rf(380, 560)];
        L = mkLander(g, W, H, {
          grav: m.g, padW: g.by(110, 90, 62), vlim: g.by(999, 62, 38), rough: 12, fuel: g.by(0, 0, 100), auto: g.diff === 0, col1: m.c1, col2: m.c2, dust: m.dust, fx, rk: { body: "#f4f6fb", nose: "#3ec1ff", fin: "#3ec1ff" }, onLand() { ph = "plant"; tl = 0; },
          decor(q_, t_, S) {
            if (m.dec === "cracks") { q_.strokeStyle = "#b98f6a"; q_.lineWidth = 2; for (let i = 0; i < 5; i++) { const x0 = 60 + i * 130; q_.beginPath(); q_.moveTo(x0, S.gy(x0) + 6); q_.lineTo(x0 + 50, S.gy(x0 + 50) + 30); q_.lineTo(x0 + 20, H); q_.stroke(); } }
            else if (m.dec === "lake") { const x0 = S.padX < 320 ? 470 : 150; q_.fillStyle = "#2c2a3a"; q_.beginPath(); q_.ellipse(x0, S.gy(x0) + 22, 80, 10, 0, 0, 7); q_.fill(); }
            else if (m.dec === "geyser") { gx.forEach(x0 => { if (Math.random() < .7) fx.add(x0 + rnd(-4, 4), S.gy(x0), rnd(-6, 6), -rnd(80, 170), 1.6, "#ffffff", 3, 4); }); }
            else if (m.dec === "volcano") { const x0 = S.padX < 320 ? 500 : 140; q_.fillStyle = "#5a2a1a"; q_.beginPath(); q_.moveTo(x0 - 70, S.gy(x0 - 70) + 4); q_.lineTo(x0 - 12, S.gy(x0) - 46); q_.lineTo(x0 + 12, S.gy(x0) - 46); q_.lineTo(x0 + 70, S.gy(x0 + 70) + 4); q_.closePath(); q_.fill(); dot(q_, "#ff7a2a", x0, S.gy(x0) - 46, 11); if (Math.random() < .8) fx.add(x0 + rnd(-6, 6), S.gy(x0) - 48, rnd(-50, 50), -rnd(90, 190), 1.1, Math.random() < .5 ? "#ff7a2a" : "#ffd93d", 3, -1); }
            else { q_.fillStyle = "rgba(255,255,255,.18)"; [[120, 18], [500, 24], [300, 12]].forEach(b => { q_.beginPath(); q_.ellipse(b[0], S.gy(b[0]) + 14, b[1] * 2, b[1] * .4, 0, 0, 7); q_.fill(); }); }
          }
        });
      }, true));
      mkBtn(g, act, "Finish", () => log.fin());
      g.loop((dt, t) => {
        T += dt; mt = Math.max(0, mt - dt); if (ph === "done" && mt <= 0) ph = "idle";
        if (ph === "count" && cdown(S0, g, dt)) ph = "cruise";
        if (ph === "cruise") { tc += dt / 5; if (Math.random() < .5) fx.smoke(215, 200, -60, 0); if (tc >= 1) { tc = 1; ph = "land"; L.reset(); g.sfx("beep"); } }
        if (ph === "land") L.update(dt, P);
        if (ph === "plant") { tl += dt; if (tl > 4.4 && !counted) { counted = true; log.go(mo.n, mo.km); g.sfx("star"); g.sfx("cheer"); fx.burst(L.x, L.y - 40, ["#ffd93d", flagC, "#fff"], 30, 160); msg = "Landed on " + mo.n + "!"; ph = "done"; mt = 7; } }
        const skyOf = m => { const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, m.sky[0]); gr.addColorStop(1, m.sky[1]); q.fillStyle = gr; q.fillRect(0, 0, W, H); };
        if (ph === "idle" || !mo) { space(q, W, H, "#04051c", "#14104a"); drawStars(q, st, W, H, T); drawPlanet(q, PL[4], 150, 170, 80); drawPlanet(q, PL[5], 500, 190, 52); txt(q, "Pick a moon to land on!", W / 2, 34, 24, "#fff"); }
        else if (ph === "count") { space(q, W, H, "#04051c", "#0b1240"); drawStars(q, st, W, H, T); if (S0.ct < 1) { fx.fire(W / 2, 270, 0, 130); fx.smoke(W / 2, 276, rnd(-50, 50), 20); } rocket(q, W / 2, 240, 0, 1.1, { fl: S0.ct < 1 ? 1 : 0, t }); fx.draw(q, dt); cnum(q, S0, W, H); txt(q, "Off to " + mo.n, W / 2, 28, 20, "#fff"); }
        else if (ph === "cruise") {
          space(q, W, H, "#03051a", "#0b1240"); drawStars(q, st, W, H, T, T * 110); const mr = 6 + 120 * ease(tc); ball(q, 570 - tc * 60, 200, mr, mo.c1, mo.c2);
          fx.fire(190, 200, -130, 0); fx.draw(q, dt); rocket(q, 220 + Math.sin(T * 2) * 4, 200, PI / 2, .9, { fl: 1, t });
          txt(q, big(mo.km * ease(tc)), W / 2, 28, 24, "#ffe27a"); txt(q, "Flying to " + mo.n + ", a moon of " + PL[mo.host].n, W / 2, 56, 15, "#fff");
        } else {
          skyOf(mo); drawStars(q, st, W, H, T); if (mo.n === "Titan") { q.fillStyle = "rgba(220,150,70,.35)"; q.fillRect(0, 0, W, H); } drawPlanet(q, PL[mo.host], mo.host === 4 ? 140 : 480, 100, mo.host === 4 ? 70 : 48);
          L.draw(q, T); fx.draw(q, dt);
          if (ph === "land") { L.hud(q, T); txt(q, g.diff === 0 ? "Autopilot landing..." : "Hold to fire the engine, slide to steer", W / 2, H - 14, 15, "#fff"); txt(q, mo.n + "  (gravity " + Math.round(mo.g / 9.81 * 100) + "% of Earth)", W / 2, 26, 18, "#ffe27a"); }
          else { const wk = cl(tl / 1.2, 0, 1); if (tl < 1.2 && ph === "plant") astro(q, L.x + 22 + wk * 40, L.y + 16, .8, tl, 0); else astro(q, L.x + 62, L.y + 16, .8, 0, tl > 2.4 ? T : 0); flag(q, L.x + 90, L.y + 16, 60 * cl((tl - 1.3) / 1, 0, 1), flagC, T); }
          if (ph === "plant") txt(q, "Touchdown!", W / 2, 28, 24, "#ffe27a");
          if (ph === "done") { txt(q, msg, W / 2, 26, 26, "#ffe27a"); txt(q, mo.n + " is " + mo.dist + " from Earth.", W / 2, 56, 14, "#fff"); txt(q, "Its gravity is only " + Math.round(mo.g / 9.81 * 100) + "% of Earth's.", W / 2, 78, 14, "#b5e6ff"); }
        }
      });
    }
  });

  // ======================= 10. Rocket Garage =======================
  B.add({
    id: "s16-rocket-garage", name: "Rocket Garage", ages: [5, 20], cat: "Creative", color: "#ff9f43", icon: "Rg",
    desc: "Design and name your own rocket, then launch it to the Moon, Mars, the Sun or a real city.", controls: "Pick colours and parts, name your rocket, then press a place to fly there. Hold the screen to boost; on Hard, steer around meteors",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(640, 400), fx = mkFx(), st = mkStars(90, W, H), log = mkLog(g), P = mkPtr(g, c, pos);
      const D = Object.assign({ name: "Starflyer", body: "#f4f6fb", nose: "#ff5c7a", fin: "#ff5c7a", win: "#8fe3ff", shape: 0, finT: 0, deco: 1, fc: 0 }, log.L.d || {});
      const cityKm = n => gcd(CAPE, CITY.filter(x => x.n === n)[0]);
      const ALL = [{ n: "The Moon", km: 384400, t: "moon", fact: "About 3 days away by real rocket." }, { n: "Space Station", km: 408, t: "iss", fact: "It circles Earth every 92 minutes." }, { n: "The Sun", km: 149.6e6, t: "sun", fact: "Too hot to land, so you fly by!" }, { n: "Paris", km: cityKm("Paris"), t: "city", fact: "Eiffel Tower" }, { n: "Mars", km: 225e6, t: "mars", fact: "Mars is 55 to 400 million km away." }, { n: "Jupiter", km: 780e6, t: "jup", fact: "It is 630 to 960 million km away." }, { n: "Tokyo", km: cityKm("Tokyo"), t: "city", fact: "Tokyo Tower" }, { n: "New York", km: cityKm("New York"), t: "city", fact: "Statue of Liberty" }, { n: "Sydney", km: cityKm("Sydney"), t: "city", fact: "Opera House" }, { n: "Cairo", km: cityKm("Cairo"), t: "city", fact: "Pyramids of Giza" }, { n: "Rio", km: cityKm("Rio"), t: "city", fact: "Christ the Redeemer" }];
      const DL = g.by([0, 1, 2, 3], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(i => ALL[i]);
      const stp = g.diff, rows = mkBar(g), r2 = mkBar(g), dests = mkBar(g), act = mkBar(g);
      let ph = "idle", T = 0, S0 = { ct: 3, cn: 4 }, f = 0, dest = null, mt = 0, tc = 0, p = 0, slow = 0, shake = 0, ry = 200, mets = [], spawn = 0, arr = 0, msg1 = "", msg2 = "";
      const chg = () => { log.L.d = D; log.save(); g.sfx("pop"); fx.burst(320, 200, [D.body, D.nose, D.fin, "#fff"], 16, 120); };
      const rk = (extra) => Object.assign({}, D, extra || {});
      mkLabel(rows, "Body"); mkSwatches(g, rows, PAL, D.body, v => { D.body = v; chg(); });
      mkLabel(rows, "Nose"); mkSwatches(g, rows, PAL, D.nose, v => { D.nose = v; chg(); });
      if (stp > 0) { mkLabel(r2, "Fins"); mkSwatches(g, r2, PAL, D.fin, v => { D.fin = v; chg(); }); }
      if (stp > 1) { mkLabel(r2, "Window"); mkSwatches(g, r2, ["#8fe3ff", "#ffd93d", "#ff8fd0", "#6be28f", "#ffffff"], D.win, v => { D.win = v; chg(); }); }
      mkLabel(r2, "Flame"); const fcols = ["#ff9f43", "#3ec1ff", "#6be28f", "#c86bff"].concat(stp > 1 ? ["rainbow"] : []); mkSwatches(g, r2, fcols, fcols[Math.min(D.fc, fcols.length - 1)], v => { D.fc = fcols.indexOf(v); chg(); });
      const parts = mkBar(g);
      const thumbs = (label, n, key, extra) => { mkLabel(parts, label); const bs = []; for (let i = 0; i < n; i++) bs.push(mkThumb(g, parts, 44, 52, (q_, w, h) => { q_.translate(w / 2, h / 2 + 2); rocket(q_, 0, 0, 0, .62, Object.assign({}, D, { [key]: i, fl: 0 })); }, () => { D[key] = i; mark(bs, i); chg(); })); mark(bs, D[key]); };
      if (stp > 0) { thumbs("Shape", 3, "shape"); thumbs("Fins", 4, "finT"); }
      if (stp > 1) thumbs("Style", 4, "deco");
      const nm = document.createElement("input"); nm.type = "text"; nm.maxLength = 12; nm.value = D.name; nm.setAttribute("aria-label", "rocket name"); nm.style.cssText = "width:130px;padding:8px;border-radius:10px;border:2px solid #ff9f43;font:bold 16px system-ui,sans-serif;text-align:center"; mkLabel(act, "Name"); act.appendChild(nm);
      g.on(nm, "input", () => { D.name = nm.value.slice(0, 12) || "Rocket"; log.L.d = D; log.save(); });
      g.on(nm, "keydown", e => e.stopPropagation());
      mkBtn(g, act, "Surprise me", () => { D.body = g.pick(PAL); D.nose = g.pick(PAL); D.fin = g.pick(PAL); D.win = g.pick(["#8fe3ff", "#ffd93d", "#ff8fd0", "#6be28f"]); D.shape = stp > 0 ? g.ri(0, 2) : 0; D.finT = stp > 0 ? g.ri(0, 3) : 0; D.deco = stp > 1 ? g.ri(0, 3) : 1; D.fc = g.ri(0, stp > 1 ? 4 : 3); chg(); g.sfx("star"); });
      mkBtn(g, act, "Save picture", () => { if (ph === "idle") g.saveImage(c, "my-rocket"); else g.pop("Save when you are in the garage", 320, 120); });
      mkBtn(g, act, "Finish", () => log.fin());
      DL.forEach(d => mkBtn(g, dests, d.n, () => { if (ph !== "idle") return; dest = d; ph = "count"; S0.ct = 3; S0.cn = 4; f = 0; tc = 0; p = 0; slow = 0; mets = []; ry = 200; P.y = 200; arr = 0; }, true));
      const drawDest = (d, x, y, r, t) => {
        if (d.t === "moon") { ball(q, x, y, r, "#f2f2f8", "#8a8a98"); q.save(); q.beginPath(); q.arc(x, y, r, 0, 7); q.clip(); [[-.3, -.2, .25], [.35, .3, .3], [.1, -.5, .15], [-.4, .4, .18]].forEach(b => dot(q, "rgba(80,80,100,.3)", x + b[0] * r, y + b[1] * r, b[2] * r)); q.restore(); }
        else if (d.t === "mars") drawPlanet(q, PL[3], x, y, r); else if (d.t === "jup") drawPlanet(q, PL[4], x, y, r);
        else if (d.t === "sun") { const gr = q.createRadialGradient(x, y, r * .2, x, y, r * 1.8); gr.addColorStop(0, "#fff7c0"); gr.addColorStop(.5, "#ffd93d"); gr.addColorStop(1, "rgba(255,150,40,0)"); q.fillStyle = gr; q.beginPath(); q.arc(x, y, r * 1.8, 0, 7); q.fill(); }
        else if (d.t === "iss") { q.save(); q.translate(x, y); q.scale(r / 70, r / 70); sh(q, "#9aa3b8", p_ => p_.rect(-90, -3, 180, 6), 3); [-60, -30, 30, 60].forEach(px => { sh(q, "#e0a83c", p_ => p_.rect(px - 10, -62, 20, 56), 3); sh(q, "#e0a83c", p_ => p_.rect(px - 10, 6, 20, 56), 3); }); sh(q, "#f4f6fb", p_ => p_.roundRect(-30, -12, 60, 24, 8), 3); q.restore(); }
        else { drawPlanet(q, PL[2], x, y, r); const cc = CITY.filter(k => k.n === d.n)[0], pul = 1 + .3 * Math.sin(t * 8); dot(q, "#ff5c7a", x - r * .1, y - r * .15, 6 * pul); dot(q, "#fff", x - r * .1, y - r * .15, 2.5); }
      };
      g.loop((dt, t) => {
        T += dt; mt = Math.max(0, mt - dt); shake = Math.max(0, shake - dt); const k = g.keys;
        if (ph === "arrive" && mt <= 0) ph = "idle";
        if (ph === "count" && cdown(S0, g, dt)) { ph = "asc"; f = 0; }
        if (ph === "asc") { f = Math.min(1, f + dt / 3.2); fx.fire(320, 80 + (1 - ease(f)) * 270 + 36, 0, 140); fx.smoke(320, 80 + (1 - ease(f)) * 270 + 40, 0, 60); if (f >= 1) { ph = "cruise"; tc = 0; p = 0; g.sfx("hum"); } }
        if (ph === "cruise") {
          const dur = dest.t === "city" ? 6 : dest.t === "iss" ? 5 : 10; let sp = 1 / dur; const bo = stp > 0 && (P.d || k[" "]); if (bo) sp *= 1.9; if (slow > 0) { slow -= dt; sp *= .4; }
          p = Math.min(1, p + sp * dt);
          if (stp === 2) { if (k.ArrowUp) P.y -= 230 * dt; if (k.ArrowDown) P.y += 230 * dt; P.y = cl(P.y, 30, H - 30); ry += (P.y - ry) * Math.min(1, 7 * dt); spawn -= dt; if (spawn <= 0) { spawn = .6; mets.push({ x: W + 20, y: rnd(20, H - 20), r: rnd(6, 14), a: rnd(0, 6) }); } mets.forEach(m => { m.x -= 260 * dt; if (slow <= 0 && Math.hypot(m.x - 180, m.y - ry) < m.r + 12) { slow = 1.2; shake = .35; g.sfx("thump"); fx.burst(180, ry, "#aaa", 8, 90); } }); mets = mets.filter(m => m.x > -30); } else ry += (200 - ry) * Math.min(1, 3 * dt);
          fx.fire(150, ry, -140, 0); if (Math.random() < .4) fx.smoke(148, ry, -50, 0);
          if (p >= 1) { ph = "arrive"; mt = 5; arr = 0; log.go(dest.n, dest.km); g.sfx("star"); g.sfx("cheer"); fx.burst(520, 200, ["#ffd93d", "#ff5c7a", "#6be28f", "#3ec1ff"], 34, 170); const cc = dest.t === "city" ? CITY.filter(k2 => k2.n === dest.n)[0] : null; msg1 = dest.t === "sun" ? "You flew past the Sun!" : "Arrived at " + dest.n + "!"; msg2 = (cc ? cc.lm + ". " : dest.fact + " ") + "You flew " + big(dest.km) + "."; }
        }
        if (ph === "arrive") arr += dt;
        q.save(); if (shake > 0) q.translate(rnd(-3, 3), rnd(-3, 3));
        if (ph === "idle" || ph === "count" || ph === "asc") {
          const a = ph === "asc" ? cl(f * 1.3, 0, 1) : 0, sky = q.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "rgb(" + Math.round(40 - 36 * a) + "," + Math.round(60 - 55 * a) + "," + Math.round(160 - 120 * a) + ")"); sky.addColorStop(1, "rgb(" + Math.round(110 - 90 * a) + "," + Math.round(160 - 140 * a) + "," + Math.round(230 - 190 * a) + ")"); q.fillStyle = sky; q.fillRect(0, 0, W, H); q.globalAlpha = .5 + a * .5; drawStars(q, st, W, H, T); q.globalAlpha = 1;
          const gy = H - 50 + (ph === "asc" ? ease(f) * 400 : 0); q.fillStyle = "#4c9c58"; q.fillRect(0, gy, W, H); q.fillStyle = "#8d94a8"; q.fillRect(W / 2 - 70, gy - 8, 140, 10);
          if (ph === "idle") {
            const by_ = Math.sin(T * 2) * 4; if (P.d) { fx.fire(320, 200 + by_ + 66, 0, 140); fx.smoke(320, 200 + by_ + 70, rnd(-30, 30), 40); } else if (Math.random() < .05) fx.burst(320 + rnd(-40, 40), 200 + rnd(-60, 60), ["#fff", "#ffd93d"], 3, 30);
            rocket(q, 320, 200 + by_, 0, 2.1, rk({ fl: P.d ? 1 : .25, t })); fx.draw(q, dt);
            txt(q, D.name, 320, 345, 24, "#ffe27a"); txt(q, "Hold the screen to test the engine", 320, 24, 15, "#fff");
          } else {
            const yy = ph === "asc" ? 80 + (1 - ease(f)) * 270 : 350; fx.draw(q, dt);
            if (ph === "count" && S0.ct < 1) { fx.fire(320, yy + 36, 0, 130); fx.smoke(320, yy + 40, rnd(-60, 60), 20); }
            rocket(q, 320, yy, 0, 1, rk({ fl: ph === "asc" || S0.ct < 1 ? 1 : 0, t })); if (ph === "count") { cnum(q, S0, W, H); txt(q, "Going to " + dest.n, W / 2, 26, 20, "#fff"); }
            if (ph === "asc") txt(q, "Altitude " + fmt(100 * ease(f)) + " km", 16, 24, 17, "#ffe27a", "left");
          }
        } else if (ph === "cruise" || ph === "arrive") {
          space(q, W, H, "#03051a", "#0b1240"); drawStars(q, st, W, H, T, T * (ph === "cruise" ? 110 : 20));
          const e = ease(ph === "cruise" ? p : 1), r = dest.t === "iss" ? 40 + 90 * e : dest.t === "city" ? 20 + 170 * e : 8 + 135 * e, dx_ = 600 - (ph === "arrive" ? 80 : 40 * p);
          drawDest(dest, dx_, 200, r, T); mets.forEach(m => { q.fillStyle = "#8d8b94"; q.beginPath(); for (let i = 0; i < 7; i++) { const an = i / 7 * PI2 + m.a, rr = m.r * (.75 + .25 * Math.sin(i * 2.3 + m.a)); q.lineTo(m.x + Math.cos(an) * rr, m.y + Math.sin(an) * rr); } q.closePath(); q.fill(); });
          if (ph === "cruise") { rocket(q, 180 + Math.sin(T * 3) * 3, ry, PI / 2, .85, rk({ fl: 1, t })); txt(q, fmt(dest.km * ease(p)) + " km", W / 2, 28, 26, "#ffe27a"); txt(q, "Flying to " + dest.n, W / 2, 58, 16, "#fff"); if (stp > 0) txt(q, stp === 2 ? "Hold to boost. Steer around the meteors!" : "Hold to boost!", W / 2, H - 16, 15, "#b5e6ff"); }
          else { const ax = lerpY(180, dx_ - r * .6, ease(cl(arr / 1.8, 0, 1))), sc = .85 * (1 - .5 * cl(arr / 1.8, 0, 1)); if (dest.t !== "sun" || arr < 1.4) rocket(q, ax, 200 + Math.sin(arr * 3) * 6, PI / 2, sc, rk({ fl: arr < 1.8 ? 1 : 0, t })); txt(q, msg1, W / 2, 30, 28, "#ffe27a"); txt(q, msg2, W / 2, 62, 14, "#fff"); txt(q, "Rocket: " + D.name, W / 2, H - 20, 16, "#b5e6ff"); }
          fx.draw(q, dt);
        }
        q.restore();
      });
    }
  });
})();
