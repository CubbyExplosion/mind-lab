// Break Time Games: set 15 (Rockets, space & vehicle makers)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---------- shared helpers ----------
  const PAL = ["#ff5c7a", "#ff9f43", "#ffd93d", "#6be28f", "#3ec1ff", "#7b6cff", "#c86bff", "#ff8fd0", "#8b5a2b", "#ffffff", "#2b3245", "#14c8b0"];
  const OUT = "#2b3245", PI = Math.PI, PI2 = Math.PI * 2;
  const sh = (q, col, f, lw) => { q.beginPath(); f(q); q.lineJoin = "round"; q.lineCap = "round"; q.strokeStyle = OUT; q.lineWidth = lw || 6; q.stroke(); q.fillStyle = col; q.fill(); };
  const ln = (q, col, w, f) => { q.beginPath(); f(q); q.lineCap = "round"; q.lineJoin = "round"; q.strokeStyle = OUT; q.lineWidth = w + 5; q.stroke(); q.strokeStyle = col; q.lineWidth = w; q.stroke(); };
  const dot = (q, col, px, py, r) => { q.fillStyle = col; q.beginPath(); q.arc(px, py, Math.max(0, r), 0, 7); q.fill(); };
  const tx = (q, s, px, py, col, size, al) => { q.font = "bold " + (size || 18) + "px system-ui, sans-serif"; q.textAlign = al || "center"; q.textBaseline = "alphabetic"; q.lineJoin = "round"; q.strokeStyle = "rgba(0,0,0,.6)"; q.lineWidth = 4; q.strokeText(s, px, py); q.fillStyle = col || "#fff"; q.fillText(s, px, py); };
  const mixc = (a, b, t) => { const p = s => [1, 3, 5].map(i => parseInt(s.substr(i, 2), 16)); const A = p(a), C = p(b); return "rgb(" + A.map((v, i) => Math.round(v + (C[i] - v) * t)).join(",") + ")"; };
  const mkBar = g => { const d = g.html(""); d.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:4px 8px;justify-content:center;align-items:center;max-width:100%"; return d; };
  const mkBtn = (g, d, text, fn) => { const b = document.createElement("button"); b.className = "bg-btn"; b.type = "button"; b.textContent = text; b.style.minHeight = "40px"; b.style.minWidth = "44px"; d.appendChild(b); g.on(b, "click", () => { g.sfx("click"); fn(b); }); return b; };
  const mkLabel = (d, text) => { const s = document.createElement("b"); s.textContent = text; s.style.cssText = "font-size:14px"; d.appendChild(s); return s; };
  const hl = (b, on) => { b.style.background = on ? "#ffd34e" : ""; b.style.color = on ? "#222" : ""; };
  const mkSwatches = (g, d, cols, init, cb) => {
    const bs = [];
    const set = col => bs.forEach(b => { const on = b.dataset.c === col; b.style.border = on ? "3px solid #fff" : "2px solid rgba(0,0,0,.35)"; b.style.boxShadow = on ? "0 0 0 2px #222" : "none"; b.style.transform = on ? "scale(1.15)" : "none"; });
    cols.forEach(col => { const b = document.createElement("button"); b.type = "button"; b.dataset.c = col; b.setAttribute("aria-label", "colour"); b.style.cssText = "width:34px;height:34px;border-radius:50%;cursor:pointer;padding:0;background:" + col; d.appendChild(b); bs.push(b); g.on(b, "click", () => { set(col); g.sfx("pick"); cb(col); }); });
    set(init); return set;
  };
  const mkThumb = (g, d, w, h, draw, cb) => {
    const b = document.createElement("button"); b.type = "button"; b.style.cssText = "width:" + (w + 10) + "px;height:" + (h + 10) + "px;padding:3px;border-radius:10px;border:3px solid rgba(255,255,255,.3);background:#fffdf5;cursor:pointer";
    const c = document.createElement("canvas"); c.width = w * 2; c.height = h * 2; c.style.cssText = "width:" + w + "px;height:" + h + "px;display:block"; const q = c.getContext("2d"); q.scale(2, 2);
    try { q.save(); draw(q, w, h); q.restore(); } catch (e) {}
    b.appendChild(c); d.appendChild(b); g.on(b, "click", () => { g.sfx("pick"); cb(b); }); return b;
  };
  const mark = (bs, i) => bs.forEach((b, k) => { b.style.borderColor = k === i ? "#ff9f43" : "rgba(255,255,255,.3)"; b.style.background = k === i ? "#ffe9b0" : "#fffdf5"; });
  // a label plus a row of picture buttons; returns refresh()
  const partRow = (g, d, label, n, draw, get, set) => {
    mkLabel(d, label); const bs = [];
    for (let i = 0; i < n; i++) bs.push(mkThumb(g, d, 48, 48, (q, w, h) => draw(q, w, h, i), () => { set(i); mark(bs, get()); }));
    mark(bs, get()); return () => mark(bs, get());
  };
  const mkOpts = (g, d, label, names, get, set) => {
    if (label) mkLabel(d, label);
    const ref = () => bs.forEach((b, i) => hl(b, get() === i));
    const bs = names.map((nm, i) => mkBtn(g, d, nm, () => { set(i); ref(); }));
    ref(); return ref;
  };
  const mkSlider = (g, d, label, min, max, val, cb) => {
    const w = document.createElement("label"); w.style.cssText = "display:flex;align-items:center;gap:4px;font-size:13px;font-weight:bold"; w.appendChild(document.createTextNode(label));
    const i = document.createElement("input"); i.type = "range"; i.min = min; i.max = max; i.value = val; i.style.width = "90px"; w.appendChild(i); d.appendChild(w);
    g.on(i, "input", () => cb(+i.value)); return i;
  };
  const mkFx = () => {
    const P = [];
    return {
      burst(px, py, col, n, sp) { for (let i = 0; i < (n || 12); i++) { const a = Math.random() * PI2, s = (sp || 140) * (.3 + Math.random()); P.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, l: .8, c: Array.isArray(col) ? col[i % col.length] : (col || "#fff"), r: 2 + Math.random() * 3 }); } },
      draw(q, dt) { for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.l -= dt; if (p.l <= 0) { P.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 200 * dt; q.globalAlpha = Math.min(1, p.l * 2); dot(q, p.c, p.x, p.y, p.r); } q.globalAlpha = 1; }
    };
  };
  const mkEnd = (g, d, cv, name) => { mkBtn(g, d, "Save picture", () => g.saveImage(cv, name)); mkBtn(g, d, "Finish", () => g.over("Nice work!")); };
  const mkStars = n => Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), r: .5 + Math.random() * 1.6, p: Math.random() * 6 }));
  const drawStars = (q, S, W, H, t, a) => { if (a <= 0) return; S.forEach(s => { q.globalAlpha = a * (.45 + .55 * Math.sin(t * 2 + s.p)); q.fillStyle = "#fff"; q.fillRect(s.x * W, s.y * H, s.r, s.r); }); q.globalAlpha = 1; };
  const ld = g => { let o = null; try { o = g.load(); } catch (e) {} return (o && typeof o === "object") ? o : {}; };
  const ci = (v, n) => { v = v | 0; return ((v % n) + n) % n; };

  // ---------------------------------------------------------------- Rocket Builder
  B.add({
    id: "s15-rocket", name: "Rocket Builder", ages: [5, 16], cat: "Build", color: "#ff5c7a", icon: "R",
    desc: "Pick a nose, body, fins and engine, count down and blast off. How high can yours go?",
    controls: "Tap parts to design, press Launch, then redesign and beat your height",
    start(g) {
      const { c, x: q, W, H } = g.canvas(560, 420), fx = mkFx();
      const n = g.by(3, 4, 5), maxSt = g.by(1, 2, 3), hard = g.diff === 2;
      const NH = [34, 46, 40, 54, 38], BW = [34, 44, 38], BH = [78, 56, 66], EH = [16, 20, 26], EWD = [14, 20, 26];
      const EP = [1, 1.3, 1.7], EM = [.3, .5, .9], FS = [.7, .85, 1, .8, .05];
      const sv0 = ld(g), S0 = sv0.st || {};
      let st = Object.assign({ nose: 0, body: 0, fin: 0, eng: 0, col: "#ff5c7a", col2: "#ffffff", stages: 1, fuel: 70, pw: 100 }, S0);
      st.nose = ci(st.nose, n); st.body = ci(st.body, Math.min(3, n)); st.fin = ci(st.fin, n); st.eng = ci(st.eng, 3); st.stages = g.clamp(st.stages | 0, 1, maxSt);
      st.fuel = g.clamp(+st.fuel || 70, 30, 100); st.pw = g.clamp(+st.pw || 100, 50, 100);
      if (!hard) { st.fuel = 70; st.pw = 100; }
      let best = +sv0.best || 0, mode = "design", T = 0, F = null;
      const stars = mkStars(80);
      const clouds = Array.from({ length: 14 }, (_, i) => ({ a: 250 + i * 380, x: Math.random() * W, s: .7 + Math.random() }));
      const sv = () => g.save({ st, best });
      const noseD = (q, i, k, w) => {
        const h = NH[i];
        sh(q, k, q => {
          q.moveTo(-w, 0);
          if (i === 0) { q.quadraticCurveTo(-w, -h * .6, 0, -h); q.quadraticCurveTo(w, -h * .6, w, 0); }
          else if (i === 1) q.bezierCurveTo(-w, -h * 1.35, w, -h * 1.35, w, 0);
          else if (i === 2) { q.lineTo(-w * .5, -h); q.lineTo(w * .5, -h); q.lineTo(w, 0); }
          else if (i === 3) { q.lineTo(-w * .8, -h * .35); q.lineTo(0, -h); q.lineTo(w * .8, -h * .35); q.lineTo(w, 0); }
          else { q.quadraticCurveTo(-w, -h * 1.2, 0, -h * 1.05); q.quadraticCurveTo(w, -h * 1.2, w, 0); }
          q.closePath();
        });
        if (i === 4) sh(q, "#9fe6ff", q => q.arc(0, -h * .5, w * .38, 0, 7), 4);
      };
      const stageD = (q, fl, t, o) => {
        const b = o.body, w = BW[b] / 2, h = BH[b], e = o.eng, eh = EH[e], ew = EWD[e], ty = -eh - h;
        if (o.fin !== 4) { const FD = [[26, 14, 4], [46, 22, 12], [34, 30, 8], [30, 18, 6]][o.fin]; [-1, 1].forEach(s => sh(q, o.col2, q => { q.moveTo(s * w, -eh - FD[0]); q.lineTo(s * (w + FD[1]), -eh + FD[2]); q.lineTo(s * w, -eh); q.closePath(); }, 5)); }
        if (fl > 0) {
          const L = fl * (34 + 16 * e) * (.85 + .15 * Math.sin(t * 45));
          q.fillStyle = "#ff8a1f"; q.beginPath(); q.moveTo(-ew * .45, -2); q.quadraticCurveTo(-ew * .3, L * .6, 0, L); q.quadraticCurveTo(ew * .3, L * .6, ew * .45, -2); q.fill();
          q.fillStyle = "#ffe35c"; q.beginPath(); q.moveTo(-ew * .25, -2); q.quadraticCurveTo(-ew * .15, L * .4, 0, L * .62); q.quadraticCurveTo(ew * .15, L * .4, ew * .25, -2); q.fill();
        }
        sh(q, "#8a93a8", q => { q.moveTo(-ew * .3, -eh); q.lineTo(ew * .3, -eh); q.lineTo(ew * .5, 0); q.lineTo(-ew * .5, 0); q.closePath(); }, 5);
        sh(q, o.col, q => q.roundRect(-w, ty, w * 2, h, 6));
        if (b === 0) sh(q, "#9fe6ff", q => q.arc(0, ty + h * .4, w * .42, 0, 7), 4);
        else if (b === 1) { q.fillStyle = o.col2; q.fillRect(-w + 2, ty + h * .3, w * 2 - 4, 9); q.fillRect(-w + 2, ty + h * .58, w * 2 - 4, 6); }
        else { sh(q, "#9fe6ff", q => q.arc(0, ty + h * .26, w * .3, 0, 7), 4); q.fillStyle = o.col2; q.fillRect(-w + 2, ty + h * .6, w * 2 - 4, 9); }
        q.fillStyle = "rgba(255,255,255,.3)"; q.fillRect(-w + 4, ty + 6, 5, h - 12);
      };
      const stH = o => EH[o.eng] + BH[o.body];
      const rocketD = (q, o, N, fl, t, from) => {
        let y = 0; from = from || 0;
        for (let i = from; i < N; i++) { q.save(); q.translate(0, y); stageD(q, i === from ? fl : 0, t, o); q.restore(); y -= stH(o); }
        q.save(); q.translate(0, y); noseD(q, o.nose, o.col2, BW[o.body] / 2); q.restore();
      };
      const stat = () => {
        const b = st.body, e = st.eng, pw = st.pw / 100, tb = 3 + st.fuel * .07 * (BH[b] / 66);
        return { N: st.stages, tbE: tb / pw, fm: .5 * tb, dry: .6 + BH[b] / 100 + EM[e], F: 330 * EP[e] * pw, drag: 1 + (1 - FS[st.fin]) * 1.2 + (st.nose === 0 || st.nose === 3 ? 0 : .25) };
      };
      const twr = () => { const S = stat(); return S.F / ((1 + S.N * (S.dry + S.fm)) * 9.8); };
      const mass = S => { let s = 1; for (let i = F.cur; i < S.N; i++) s += S.dry + (i === F.cur ? S.fm * (1 - F.burn / S.tbE) : S.fm); return s; };
      const fpx = a => 260 * Math.log(1 + Math.max(0, a) / 800);
      // ----- design UI
      const bar1 = mkBar(g), bar2 = mkBar(g), bar3 = mkBar(g), fbar = mkBar(g), pcol = { col: "#ff6b6b", col2: "#ffffff" };
      const th = kind => (q, w, h, i) => {
        const o = Object.assign({}, st, pcol); o[kind] = i; o.body = kind === "body" ? i : (kind === "nose" ? 0 : 2);
        if (kind === "nose") { q.translate(w / 2, h * .8); q.scale(.62, .62); noseD(q, i, "#ffffff", 20); }
        else if (kind === "eng") { q.translate(w / 2, h * .42); q.scale(.5, .5); stageD(q, 1, 0, o); }
        else { q.translate(w / 2, h * .95); q.scale(.4, .4); stageD(q, 0, 0, o); }
      };
      const refs = [];
      const chg = () => { sv(); g.sfx("pop"); fx.burst(W / 2, H * .55, [st.col, st.col2, "#ffd34e"], 14, 120); };
      refs.push(partRow(g, bar1, "Nose", n, th("nose"), () => st.nose, i => { st.nose = i; chg(); }));
      refs.push(partRow(g, bar1, "Body", Math.min(3, n), th("body"), () => st.body, i => { st.body = i; chg(); }));
      refs.push(partRow(g, bar1, "Fins", n, th("fin"), () => st.fin, i => { st.fin = i; chg(); }));
      refs.push(partRow(g, bar1, "Engine", 3, th("eng"), () => st.eng, i => { st.eng = i; chg(); }));
      mkLabel(bar2, "Colour"); mkSwatches(g, bar2, PAL, st.col, col => { st.col = col; chg(); });
      mkLabel(bar2, "Trim"); mkSwatches(g, bar2, PAL, st.col2, col => { st.col2 = col; chg(); });
      let stRef = null;
      if (maxSt > 1) stRef = mkOpts(g, bar3, "Stages", ["1", "2", "3"].slice(0, maxSt), () => st.stages - 1, i => { st.stages = i + 1; chg(); });
      if (hard) { mkSlider(g, bar3, "Fuel", 30, 100, st.fuel, v => { st.fuel = v; sv(); }); mkSlider(g, bar3, "Power", 50, 100, st.pw, v => { st.pw = v; sv(); }); }
      mkBtn(g, bar3, "Surprise me", () => { st.nose = g.ri(0, n - 1); st.body = g.ri(0, Math.min(3, n) - 1); st.fin = g.ri(0, n - 1); st.eng = g.ri(0, 2); st.col = g.pick(PAL); st.col2 = g.pick(PAL); chg(); refs.forEach(f => f()); });
      const bLaunch = mkBtn(g, bar3, "LAUNCH!", () => startFlight()); bLaunch.style.background = "#ff5c7a"; bLaunch.style.color = "#fff"; bLaunch.style.fontSize = "18px";
      mkBtn(g, fbar, "Back to design", () => setMode("design"));
      mkBtn(g, fbar, "Launch again", () => startFlight());
      mkEnd(g, fbar, c, "my-rocket");
      const setMode = m => { mode = m; [bar1, bar2, bar3].forEach(b => { b.style.display = m === "design" ? "flex" : "none"; }); fbar.style.display = m === "fly" ? "flex" : "none"; };
      setMode("design");
      const startFlight = () => {
        F = { ph: "count", cd: 3.2, alt: 0, v: 0, cur: 0, burn: 0, pause: 0, smoke: [], deb: [], shake: 0, t: 0, ft: 0, out: false, th: 0, sm: 0, msg: "", top: 0 };
        setMode("fly"); g.sfx("hum");
      };
      // ----- flight
      const stepFlight = dt => {
        const S = stat();
        if (F.ph === "count") { const p = Math.ceil(F.cd); F.cd -= dt; if (Math.ceil(F.cd) !== p && F.cd > 0) g.sfx("tick"); if (F.cd <= 0) { F.ph = "fly"; g.sfx("launch"); F.shake = 1; } return; }
        if (F.ph !== "fly") return;
        dt *= F.out ? 2 : 1; F.ft += dt; F.th = 0;
        if (F.pause > 0) F.pause -= dt;
        else if (!F.out) {
          F.th = S.F; F.burn += dt;
          if (F.burn >= S.tbE) {
            if (F.cur < S.N - 1) { F.deb.push({ alt: F.alt, v: F.v * .9, x: 0, dx: g.rf(-30, 30), rot: 0, vr: g.rf(-2, 2) }); F.cur++; F.burn = 0; F.pause = .7; F.th = 0; g.sfx("pop"); F.shake = .5; }
            else { F.out = true; F.th = 0; }
          }
        }
        const m = mass(S), rho = Math.exp(-F.alt / 7000), a = F.th / m - 9.8 - .0012 * rho * F.v * Math.abs(F.v) * S.drag / m;
        F.v += a * dt; F.alt += F.v * dt;
        if (F.alt <= 0) { F.alt = 0; if (F.v < 0) F.v = 0; }
        F.sm -= dt; if (F.th > 0 && F.sm <= 0) { F.sm = .03; F.smoke.push({ x: g.rf(-6, 6), a: F.alt, l: 1.8, r: 5, dx: g.rf(-12, 12) }); }
        if (F.alt > F.top) { F.top = F.alt; }
        if (F.top > best) { best = F.top; g.score(Math.round(best)); }
        if (F.ft > 2.5 && F.alt < 3 && F.th > 0) endFlight("Too heavy to lift off! Try more power or fewer stages.", true);
        else if (F.v < 0 && F.alt > 20) endFlight("Highest point reached!", false);
      };
      const endFlight = (msg, bad) => { F.ph = "done"; F.msg = msg; F.th = 0; sv(); if (bad) { g.sfx("sad"); return; } g.sfx("cheer"); const ry = H * .85 - Math.min(fpx(F.alt), H * .45) - 60; for (let i = 0; i < 4; i++) fx.burst(W / 2 + g.rf(-120, 120), ry - g.rf(0, 60), [st.col, st.col2, "#ffd34e", "#6be28f"], 22, 190); };
      const drawFlight = (dt, t) => {
        const S = stat(), alt = F.alt, f = fpx(alt), off = Math.max(0, f - H * .45), gy = H * .85 + off, toY = a => gy - fpx(a), k = g.clamp(alt / 7000, 0, 1);
        const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, mixc("#5bb8f5", "#04061a", k)); gr.addColorStop(1, mixc("#cdeeff", "#101a44", k));
        q.fillStyle = gr; q.fillRect(0, 0, W, H); drawStars(q, stars, W, H, t, g.clamp((alt - 1500) / 3500, 0, 1));
        q.save(); if (F.shake > 0) { q.translate(g.rf(-1, 1) * F.shake * 6, g.rf(-1, 1) * F.shake * 6); F.shake = Math.max(0, F.shake - dt * 1.5); }
        clouds.forEach(cl => { const y = toY(cl.a); if (y < -40 || y > H + 40) return; q.globalAlpha = g.clamp(1 - alt / 9000, .15, .9); q.fillStyle = "#fff"; [[0, 0, 30], [26, 6, 22], [-26, 8, 22], [8, -10, 20]].forEach(b => { q.beginPath(); q.ellipse(cl.x + b[0] * cl.s, y + b[1] * cl.s, b[2] * cl.s, b[2] * .6 * cl.s, 0, 0, 7); q.fill(); }); q.globalAlpha = 1; });
        if (gy < H + 20) { q.fillStyle = "#58b947"; q.fillRect(0, gy, W, H - gy + 30); q.fillStyle = "#8a93a8"; q.fillRect(W / 2 - 52, gy, 104, 10); q.fillStyle = "#6a7388"; q.fillRect(W / 2 + 58, gy - 130, 10, 130); for (let i = 0; i < 6; i++) q.fillRect(W / 2 + 58, gy - 126 + i * 22, 40, 5); }
        for (let i = F.smoke.length - 1; i >= 0; i--) { const s = F.smoke[i]; s.l -= dt; if (s.l <= 0) { F.smoke.splice(i, 1); continue; } s.r += dt * 16; s.x += s.dx * dt; q.globalAlpha = Math.min(.7, s.l * .5); dot(q, "#f2f4f8", W / 2 + s.x, toY(s.a), s.r); } q.globalAlpha = 1;
        for (let i = F.deb.length - 1; i >= 0; i--) { const d = F.deb[i]; d.v -= 9.8 * dt; d.alt += d.v * dt; d.x += d.dx * dt; d.rot += d.vr * dt; if (d.alt < -60) { F.deb.splice(i, 1); continue; } q.save(); q.translate(W / 2 + d.x, toY(d.alt)); q.rotate(d.rot); stageD(q, 0, t, st); q.restore(); }
        q.save(); q.translate(W / 2, toY(alt)); const sp = g.clamp(F.v / 150, 0, 1); q.rotate(Math.sin(t * 9) * (1 - FS[st.fin]) * .07 * sp); if (F.ph === "count") q.translate(g.rf(-.7, .7) * (3.2 - F.cd), 0);
        rocketD(q, st, S.N, F.th > 0 ? 1 : (F.ph === "count" && F.cd < 1 ? .4 : 0), t, F.cur); q.restore();
        q.restore();
        fx.draw(q, dt);
        tx(q, "Height " + Math.round(alt) + " m", 12, 26, "#fff", 18, "left"); tx(q, "Speed " + Math.round(Math.max(0, F.v)) + " m/s", 12, 48, "#cfe9ff", 14, "left"); tx(q, "Best " + Math.round(best) + " m", W - 12, 26, "#ffd34e", 18, "right");
        if (S.N > 1) tx(q, "Stage " + (F.cur + 1) + " of " + S.N, W - 12, 48, "#fff", 14, "right");
        if (F.ph === "count") tx(q, String(Math.max(1, Math.ceil(F.cd))), W / 2, H * .3, "#ffd34e", 80 + (F.cd % 1) * 30);
        if (F.ph === "fly" && F.th === 0 && F.out) tx(q, "Coasting up...", W / 2, 80, "#fff", 18);
        if (F.ph === "done") { tx(q, F.msg, W / 2, H * .2, "#fff", 22); tx(q, Math.round(F.top) + " metres high!", W / 2, H * .2 + 34, "#ffd34e", 28); tx(q, "Press Back to design and make it better", W / 2, H * .2 + 62, "#cfe9ff", 15); }
      };
      const drawDesign = (dt, t) => {
        const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#5bb8f5"); gr.addColorStop(1, "#d8f1ff"); q.fillStyle = gr; q.fillRect(0, 0, W, H);
        q.fillStyle = "#58b947"; q.fillRect(0, H * .85, W, H * .15); q.fillStyle = "#8a93a8"; q.fillRect(W / 2 - 60, H * .85, 120, 10);
        q.fillStyle = "#6a7388"; q.fillRect(W / 2 + 70, H * .85 - 220, 12, 220); for (let i = 0; i < 9; i++) q.fillRect(W / 2 + 70, H * .85 - 212 + i * 24, 42, 5);
        const N = st.stages, tot = N * stH(st) + NH[st.nose], sc = Math.min(1.6, (H * .68) / tot);
        q.save(); q.translate(W / 2, H * .85); q.scale(sc, sc); q.rotate(Math.sin(t * 1.6) * .012); rocketD(q, st, N, 0, t, 0); q.restore();
        tx(q, "Design your rocket, then press LAUNCH!", W / 2, 28, "#fff", 18);
        if (hard) { const r = twr(); tx(q, "Thrust / weight: " + r.toFixed(1) + (r < 1.15 ? "  (too heavy!)" : ""), 12, H - 12, r < 1.15 ? "#ff9c9c" : "#fff", 14, "left"); }
        if (best > 0) tx(q, "Best " + Math.round(best) + " m", W - 12, 26, "#ffd34e", 16, "right");
        fx.draw(q, dt);
      };
      g.loop((dt, t) => { dt = Math.min(dt, .05); T += dt; if (mode === "fly" && F) { stepFlight(dt); drawFlight(dt, T); } else drawDesign(dt, T); });
    }
  });

  const mkHist = (g, get, set) => { const H = []; return { push() { H.push(JSON.stringify(get())); if (H.length > 60) H.shift(); g.save(get()); }, undo() { if (H.length > 1) { H.pop(); set(JSON.parse(H[H.length - 1])); g.save(get()); g.sfx("back"); } else g.sfx("wrong"); } }; };

  // ---------------------------------------------------------------- Space Station Builder
  B.add({
    id: "s15-station", name: "Space Station Builder", ages: [5, 15], cat: "Build", color: "#3ec1ff", icon: "S",
    desc: "Snap modules together in orbit and watch tiny astronauts float around your station.",
    controls: "Pick a module, tap a glowing spot next to your station. Erase removes a piece",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(600, 420), fx = mkFx();
      const CS = g.by(80, 64, 52), cols = Math.floor((W - 20) / CS), rows = Math.floor((H - 20) / CS), ox = (W - cols * CS) / 2, oy = (H - rows * CS) / 2;
      const nT = g.by(5, 7, 8), hard = g.diff === 2, NAMES = ["Hub", "Tube", "Lab", "Dome", "Panel", "Dock", "Antenna", "Garden"];
      const mk = () => Array.from({ length: rows }, () => Array(cols).fill(-1));
      let cells = mk(), sel = 0, erase = false, T = 0, hov = null, lastGlow = 0;
      const sv = ld(g);
      if (Array.isArray(sv.cells) && sv.cells.length === rows && sv.cells[0] && sv.cells[0].length === cols) cells = sv.cells.map(r => r.map(v => (v >= 0 && v < nT) ? v : -1));
      const born = {}, stars = mkStars(90), astros = [];
      const cnt = () => cells.reduce((a, r) => a + r.filter(v => v >= 0).length, 0);
      const occ = (r, cc) => r >= 0 && cc >= 0 && r < rows && cc < cols && cells[r][cc] >= 0;
      const adj = (r, cc) => occ(r - 1, cc) || occ(r + 1, cc) || occ(r, cc - 1) || occ(r, cc + 1);
      if (!cnt()) cells[rows >> 1][cols >> 1] = 0;
      const modD = (q, ty, s, t, lit, hz) => {
        const wn = (px, py, r) => dot(q, mixc("#3a4668", "#ffe98a", g.clamp(lit * (.85 + .15 * Math.sin(t * 3 + px)), 0, 1)), px, py, r);
        if (ty === 0) { sh(q, "#d7deee", q => q.arc(0, 0, s * .95, 0, 7)); q.strokeStyle = "#9aa6c4"; q.lineWidth = 3; q.beginPath(); q.arc(0, 0, s * .6, 0, 7); q.stroke(); for (let k = 0; k < 4; k++) wn(Math.cos(k * PI / 2 + PI / 4) * s * .78, Math.sin(k * PI / 2 + PI / 4) * s * .78, s * .13); dot(q, Math.sin(t * 4) > 0 ? "#ff6b6b" : "#9a3b3b", 0, 0, s * .14); }
        else if (ty === 1) { sh(q, "#b9c3da", q => hz ? q.roundRect(-s * 1.05, -s * .38, s * 2.1, s * .76, s * .2) : q.roundRect(-s * .38, -s * 1.05, s * .76, s * 2.1, s * .2), 4); q.strokeStyle = "#8a93a8"; q.lineWidth = 2; for (let k = -1; k <= 1; k++) { q.beginPath(); if (hz) { q.moveTo(k * s * .5, -s * .3); q.lineTo(k * s * .5, s * .3); } else { q.moveTo(-s * .3, k * s * .5); q.lineTo(s * .3, k * s * .5); } q.stroke(); } }
        else if (ty === 2) { sh(q, "#8fb4ff", q => q.roundRect(-s * .9, -s * .7, s * 1.8, s * 1.4, s * .2)); q.fillStyle = "#5d86d6"; q.fillRect(-s * .8, s * .3, s * 1.6, s * .25); wn(-s * .5, -s * .1, s * .17); wn(0, -s * .1, s * .17); wn(s * .5, -s * .1, s * .17); }
        else if (ty === 3) { sh(q, "#cfd6e6", q => q.roundRect(-s * .9, s * .15, s * 1.8, s * .45, s * .1), 4); q.beginPath(); q.arc(0, s * .2, s * .8, PI, 0); q.closePath(); q.fillStyle = "rgba(127,232,255,.8)"; q.fill(); q.strokeStyle = OUT; q.lineWidth = 4; q.stroke(); dot(q, "#6be28f", -s * .3, 0, s * .12); dot(q, "#ff8fd0", s * .2, -s * .15, s * .1); dot(q, "#6be28f", s * .35, 0, s * .12); }
        else if (ty === 4) { q.save(); q.rotate(Math.sin(t * .6) * .08); [-1, 1].forEach(d => { sh(q, "#3d6bff", q => q.roundRect(d > 0 ? s * .2 : -s * 1.15, -s * .55, s * .95, s * 1.1, 3), 4); q.strokeStyle = "#9fc0ff"; q.lineWidth = 1.5; for (let k = 1; k < 3; k++) { const px = d > 0 ? s * .2 + k * s * .32 : -s * 1.15 + k * s * .32; q.beginPath(); q.moveTo(px, -s * .55); q.lineTo(px, s * .55); q.stroke(); } }); sh(q, "#cfd6e6", q => q.roundRect(-s * .22, -s * .3, s * .44, s * .6, 4), 4); q.restore(); }
        else if (ty === 5) { sh(q, "#e7c35c", q => q.roundRect(-s * .8, -s * .6, s * 1.6, s * 1.2, s * .15)); dot(q, "#444", 0, 0, s * .4); dot(q, "#1a1d2a", 0, 0, s * .28); dot(q, Math.sin(t * 5) > 0 ? "#6be28f" : "#2d6b45", s * .55, -s * .42, s * .1); }
        else if (ty === 6) { ln(q, "#b9c3da", 4, q => { q.moveTo(0, s * .7); q.lineTo(0, -s * .2); }); q.save(); q.translate(0, -s * .25); q.rotate(Math.sin(t * .8) * .6 - .4); sh(q, "#fff", q => { q.moveTo(-s * .7, -s * .1); q.quadraticCurveTo(0, s * .8, s * .7, -s * .1); q.closePath(); }, 4); q.restore(); dot(q, Math.sin(t * 4) > 0 ? "#ff4b4b" : "#7a2a2a", 0, -s * .95, s * .1); }
        else { sh(q, "#6fcf6f", q => q.roundRect(-s * .9, -s * .55, s * 1.8, s * 1.1, s * .35)); [-1, 0, 1].forEach(k => { ln(q, "#2f9a3f", 3, q => { q.moveTo(k * s * .5, s * .4); q.lineTo(k * s * .5, -s * .15); }); dot(q, k === 0 ? "#ff8fd0" : "#ffd93d", k * s * .5, -s * .2, s * .12); }); }
      };
      const hist = mkHist(g, () => ({ cells }), o => { cells = o.cells; });
      const row1 = mkBar(g), row2 = mkBar(g);
      partRow(g, row1, "Module", nT, (q, w, h, i) => { q.translate(w / 2, h / 2); modD(q, i, 15, 0, 1, true); }, () => sel, i => { sel = i; erase = false; hl(bE, false); });
      const bE = mkBtn(g, row2, "Erase", () => { erase = !erase; hl(bE, erase); });
      mkBtn(g, row2, "Undo", () => hist.undo());
      mkBtn(g, row2, "Surprise me", () => {
        cells = mk(); cells[rows >> 1][cols >> 1] = 0; const want = g.ri(7, Math.min(16, cols * rows - 3));
        for (let k = 0; k < 200 && cnt() < want; k++) { const r = g.ri(0, rows - 1), cc = g.ri(0, cols - 1); if (cells[r][cc] < 0 && adj(r, cc)) { cells[r][cc] = g.ri(0, nT - 1); born[r * cols + cc] = T + k * .01; } }
        g.sfx("cheer"); hist.push();
      });
      mkBtn(g, row2, "Clear", () => { cells = mk(); cells[rows >> 1][cols >> 1] = 0; g.sfx("swish"); hist.push(); });
      mkEnd(g, row2, c, "my-space-station");
      hist.push();
      const cellAt = p => { const cc = Math.floor((p.x - ox) / CS), r = Math.floor((p.y - oy) / CS); return (r >= 0 && cc >= 0 && r < rows && cc < cols) ? { r, c: cc } : null; };
      g.on(c, "pointermove", e => { hov = cellAt(pos(e)); });
      g.on(c, "pointerleave", () => { hov = null; });
      g.on(c, "pointerdown", e => {
        const k = cellAt(pos(e)); hov = k; if (!k) return;
        const cx = ox + (k.c + .5) * CS, cy = oy + (k.r + .5) * CS;
        if (erase) { if (cells[k.r][k.c] >= 0 && cnt() > 1) { cells[k.r][k.c] = -1; fx.burst(cx, cy, ["#b9c3da", "#fff"], 14, 110); g.sfx("boom"); hist.push(); } else g.sfx("wrong"); return; }
        if (cells[k.r][k.c] === sel) { g.sfx("wrong"); return; }
        if (cells[k.r][k.c] < 0 && !adj(k.r, k.c)) { g.sfx("wrong"); return; }
        cells[k.r][k.c] = sel; born[k.r * cols + k.c] = T; fx.burst(cx, cy, ["#7fe8ff", "#ffe98a", "#fff"], 14, 120); g.sfx("lock"); hist.push();
      });
      const power = () => { let p = 0, u = 0; cells.forEach(r => r.forEach(v => { if (v === 4) p += 4; else if (v === 0) u += 2; else if (v >= 0) u += 1; })); return { p, u }; };
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt;
        const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#04061a"); gr.addColorStop(1, "#0d1750"); q.fillStyle = gr; q.fillRect(0, 0, W, H); drawStars(q, stars, W, H, T, 1);
        // earth
        const eg = q.createRadialGradient(W * .12, H + 60, 150, W * .12, H + 60, 215); eg.addColorStop(0, "#2a7bd8"); eg.addColorStop(.93, "#3ea0ff"); eg.addColorStop(1, "rgba(120,200,255,0)");
        q.fillStyle = eg; q.beginPath(); q.arc(W * .12, H + 60, 215, 0, 7); q.fill();
        q.save(); q.beginPath(); q.arc(W * .12, H + 60, 200, 0, 7); q.clip(); q.fillStyle = "#4bb86a"; for (let k = 0; k < 5; k++) { const ex = W * .12 - 200 + ((k * 130 + T * 9) % 520) - 60; q.beginPath(); q.ellipse(ex, H - 10 - (k % 3) * 25, 60, 24 + k * 3, .3, 0, 7); q.fill(); } q.restore();
        const pw = power(), lit = hard ? g.clamp(pw.u ? pw.p / pw.u : 1, .2, 1) : 1;
        if (hard) g.status("Power " + pw.p + " / " + pw.u);
        q.save(); q.translate(Math.sin(T * .4) * 3, Math.cos(T * .33) * 3);
        // glowing spots
        const free = !!cnt();
        for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) if (cells[r][cc] < 0 && adj(r, cc)) {
          const px = ox + cc * CS, py = oy + r * CS, hv = hov && hov.r === r && hov.c === cc && !erase;
          q.globalAlpha = hv ? .55 : .2 + .15 * Math.sin(T * 3 + r + cc); q.fillStyle = "#7fe8ff"; q.beginPath(); q.roundRect(px + 6, py + 6, CS - 12, CS - 12, 12); q.fill(); q.globalAlpha = 1;
          q.strokeStyle = "rgba(160,235,255,.8)"; q.setLineDash([6, 5]); q.lineWidth = 2; q.stroke(); q.setLineDash([]);
          if (hv) { q.save(); q.translate(px + CS / 2, py + CS / 2); q.globalAlpha = .6; modD(q, sel, CS * .36, T, 1, true); q.restore(); q.globalAlpha = 1; }
          else tx(q, "+", px + CS / 2, py + CS / 2 + 7, "rgba(255,255,255,.8)", 22);
        }
        // connectors
        q.fillStyle = "#8a93a8";
        for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) if (cells[r][cc] >= 0) { const px = ox + (cc + .5) * CS, py = oy + (r + .5) * CS; if (occ(r, cc + 1)) q.fillRect(px, py - 5, CS, 10); if (occ(r + 1, cc)) q.fillRect(px - 5, py, 10, CS); }
        for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) {
          const ty = cells[r][cc]; if (ty < 0) continue;
          const age = T - (born[r * cols + cc] || -9), sc = age < .5 && age >= 0 ? 1 + .35 * (1 - age * 2) * Math.cos(age * 14) : 1;
          q.save(); q.translate(ox + (cc + .5) * CS, oy + (r + .5) * CS); q.scale(sc, sc);
          modD(q, ty, CS * .36, T + cc, lit, occ(r, cc - 1) || occ(r, cc + 1) || !(occ(r - 1, cc) || occ(r + 1, cc))); q.restore();
        }
        // astronauts
        const want = Math.min(6, 1 + (cnt() >> 1)); while (astros.length < want) astros.push({ r: -1, c: 0, x: 0, y: 0, tx: 0, ty: 0, w: 0, bob: Math.random() * 6 }); while (astros.length > want) astros.pop();
        const list = []; for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) if (cells[r][cc] >= 0) list.push({ r, c: cc });
        astros.forEach(a => {
          if (a.r < 0 || !occ(a.r, a.c)) { const s = g.pick(list); a.r = s.r; a.c = s.c; a.x = a.tx = ox + (s.c + .5) * CS; a.y = a.ty = oy + (s.r + .5) * CS; a.w = 1; }
          const dx = a.tx - a.x, dy = a.ty - a.y, d = Math.hypot(dx, dy);
          if (d > 1.5) { const sp = Math.min(d, 32 * dt); a.x += dx / d * sp; a.y += dy / d * sp; }
          else { a.w -= dt; if (a.w <= 0) { const nb = [[0, 1], [0, -1], [1, 0], [-1, 0]].filter(v => occ(a.r + v[0], a.c + v[1])); if (nb.length) { const v = g.pick(nb); a.r += v[0]; a.c += v[1]; a.tx = ox + (a.c + .5) * CS; a.ty = oy + (a.r + .5) * CS; } a.w = g.rf(.5, 1.6); } }
          const by = Math.sin(T * 2 + a.bob) * 2; q.save(); q.translate(a.x, a.y + by + CS * .12); const s = CS / 70;
          sh(q, "#fff", q => q.roundRect(-5 * s, -2 * s, 10 * s, 12 * s, 4), 2.5); sh(q, "#fff", q => q.arc(0, -7 * s, 6 * s, 0, 7), 2.5); dot(q, "#3ec1ff", 0, -7 * s, 3.4 * s); q.restore();
        });
        q.restore();
        fx.draw(q, dt);
        g.score(cnt());
        tx(q, "Pieces: " + cnt() + (erase ? "   (Erase on)" : ""), 10, 22, "#fff", 16, "left");
        if (hov && cells[hov.r][hov.c] < 0 && !adj(hov.r, hov.c) && !erase) tx(q, "Snap it next to your station", W / 2, H - 10, "#ffd34e", 14);
      });
    }
  });

  // ---------------------------------------------------------------- Moon Base Maker
  B.add({
    id: "s15-moonbase", name: "Moon Base Maker", ages: [5, 14], cat: "Creative", color: "#c9c2b5", icon: "M",
    desc: "Plant domes, towers, rovers and flags on the Moon, then flip to night and watch the lights come on.",
    controls: "Pick a building, tap the ground to place it. Drag buildings to move them",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(600, 400), fx = mkFx();
      const nT = g.by(6, 9, 11), hard = g.diff === 2, WD = [42, 16, 46, 40, 40, 46, 10, 20, 34, 24, 30], HT = [38, 96, 26, 38, 42, 8, 54, 72, 58, 52, 42];
      const gnd = x => H * .8 + Math.sin(x * .011) * 7 + Math.sin(x * .029 + 1) * 4;
      const sv = ld(g);
      let items = Array.isArray(sv.items) ? sv.items.filter(o => o && o.t >= 0 && o.t < nT).slice(0, 40) : [];
      let sel = 0, col = "#ff5c7a", erase = false, night = 0, nTarget = 0, size = 100, cables = hard, T = 0, drag = null, moved = false, hov = -1;
      const stars = mkStars(110), craters = Array.from({ length: 9 }, () => ({ x: Math.random() * W, d: 10 + Math.random() * 40, w: 14 + Math.random() * 26 }));
      const hops = Array.from({ length: g.by(2, 3, 4) }, (_, i) => ({ x: 100 + i * 120, tx: 100 + i * 120, h: 0, w: Math.random() * 2, c: PAL[i * 3 % 12] }));
      const rover = { x: 200, dir: 1 };
      const bD = (q, ty, s, t, nt, k) => {
        const wn = (px, py, r) => dot(q, mixc("#3a4668", "#ffe98a", nt), px, py, r);
        if (ty === 0) { sh(q, "#cfd6e6", q => q.roundRect(-36 * s, -6 * s, 72 * s, 7 * s, 3), 4); q.beginPath(); q.arc(0, -4 * s, 33 * s, PI, 0); q.closePath(); q.fillStyle = mixc("#9fe6ff", "#e8d890", nt * .8); q.fill(); q.strokeStyle = OUT; q.lineWidth = 4; q.stroke(); dot(q, "#6be28f", -10 * s, -10 * s, 5 * s); dot(q, "#ff8fd0", 8 * s, -14 * s, 4 * s); dot(q, k, 16 * s, -8 * s, 4 * s); }
        else if (ty === 1) { sh(q, "#b9c3da", q => q.roundRect(-5 * s, -90 * s, 10 * s, 90 * s, 3), 4); q.save(); q.translate(0, -84 * s); q.rotate(Math.sin(t * .8) * .4); sh(q, "#fff", q => { q.moveTo(-18 * s, -6 * s); q.quadraticCurveTo(0, 14 * s, 18 * s, -6 * s); q.closePath(); }, 4); q.restore(); dot(q, Math.sin(t * 4) > 0 ? "#ff4b4b" : "#7a2a2a", 0, -96 * s, 4 * s); }
        else if (ty === 2) { [-1, 0, 1].forEach(d => { q.save(); q.translate(d * 28 * s, 0); ln(q, "#8a93a8", 3, q => { q.moveTo(0, 0); q.lineTo(0, -8 * s); }); q.rotate(-.35); sh(q, k, q => q.rect(-12 * s, -22 * s, 24 * s, 16 * s), 3); q.strokeStyle = "rgba(255,255,255,.6)"; q.lineWidth = 1; q.beginPath(); q.moveTo(0, -22 * s); q.lineTo(0, -6 * s); q.moveTo(-12 * s, -14 * s); q.lineTo(12 * s, -14 * s); q.stroke(); q.restore(); }); }
        else if (ty === 3) { sh(q, "#cfd6e6", q => q.roundRect(-36 * s, -34 * s, 72 * s, 34 * s, 6)); sh(q, mixc("#6a7388", "#ffe98a", nt), q => q.roundRect(-18 * s, -24 * s, 36 * s, 24 * s, 4), 4); sh(q, k, q => q.rect(-36 * s, -38 * s, 72 * s, 6 * s), 3); }
        else if (ty === 4) { sh(q, mixc("#7be58f", "#d6ff9a", nt * .6), q => { q.moveTo(-36 * s, 0); q.lineTo(-30 * s, -28 * s); q.lineTo(0, -40 * s); q.lineTo(30 * s, -28 * s); q.lineTo(36 * s, 0); q.closePath(); }); [-18, 0, 18].forEach(px => ln(q, "#2f9a3f", 3, q => { q.moveTo(px * s, -2 * s); q.lineTo(px * s, -16 * s); })); dot(q, k, 0, -18 * s, 4 * s); }
        else if (ty === 5) { sh(q, "#8a93a8", q => q.ellipse(0, -3 * s, 44 * s, 6 * s, 0, 0, 7), 4); for (let i = -1; i <= 1; i += 2) dot(q, Math.sin(t * 5 + i) > 0 ? "#ffd93d" : "#7a6a1a", i * 34 * s, -5 * s, 3.5 * s); q.fillStyle = "#fff"; q.fillRect(-4 * s, -7 * s, 8 * s, 2 * s); }
        else if (ty === 6) { ln(q, "#fff", 3, q => { q.moveTo(0, 0); q.lineTo(0, -50 * s); }); sh(q, k, q => { q.moveTo(0, -50 * s); for (let i = 0; i <= 8; i++) q.lineTo(i * 3.5 * s, -50 * s + Math.sin(t * 5 + i * .8) * 2.5 * s); for (let i = 8; i >= 0; i--) q.lineTo(i * 3.5 * s, -34 * s + Math.sin(t * 5 + i * .8) * 2.5 * s); q.closePath(); }, 3); }
        else if (ty === 7) { [-1, 1].forEach(d => ln(q, "#8a93a8", 3, q => { q.moveTo(d * 6 * s, -16 * s); q.lineTo(d * 16 * s, 0); })); sh(q, k, q => { q.moveTo(0, -72 * s); q.quadraticCurveTo(12 * s, -54 * s, 10 * s, -16 * s); q.lineTo(-10 * s, -16 * s); q.quadraticCurveTo(-12 * s, -54 * s, 0, -72 * s); }); dot(q, "#9fe6ff", 0, -46 * s, 4.5 * s); }
        else if (ty === 8) { sh(q, "#cfd6e6", q => q.roundRect(-26 * s, -26 * s, 52 * s, 26 * s, 5)); sh(q, "#8fb4ff", q => q.roundRect(-20 * s, -56 * s, 40 * s, 30 * s, 5)); wn(-10 * s, -14 * s, 5 * s); wn(10 * s, -14 * s, 5 * s); wn(-10 * s, -42 * s, 5 * s); wn(10 * s, -42 * s, 5 * s); dot(q, k, 0, -58 * s, 3 * s); }
        else if (ty === 9) { sh(q, "#8a93a8", q => q.roundRect(-14 * s, -10 * s, 28 * s, 10 * s, 3), 4); ln(q, "#6a7388", 4, q => { q.moveTo(-8 * s, -10 * s); q.lineTo(0, -48 * s); q.lineTo(8 * s, -10 * s); }); q.save(); q.translate(0, -46 * s); q.rotate(Math.sin(t * 2) * .35); ln(q, k, 5, q => { q.moveTo(-18 * s, 0); q.lineTo(18 * s, 0); }); q.restore(); }
        else { ln(q, "#b9c3da", 4, q => { q.moveTo(0, 0); q.lineTo(0, -16 * s); }); q.save(); q.translate(0, -18 * s); q.rotate(Math.sin(t * .7) * .8); sh(q, "#fff", q => { q.moveTo(-26 * s, 0); q.quadraticCurveTo(0, 30 * s, 26 * s, 0); q.closePath(); }, 4); dot(q, k, 0, 4 * s, 4 * s); q.restore(); }
      };
      const hist = mkHist(g, () => ({ items }), o => { items = o.items; });
      const row1 = mkBar(g), row2 = mkBar(g);
      partRow(g, row1, "Build", nT, (q, w, h, i) => { q.translate(w / 2, h * .88); const s = Math.min(.5, 38 / Math.max(WD[i] * 1.5, HT[i])); q.scale(s * 1.1, s * 1.1); bD(q, i, 1, 0, 0, "#ff5c7a"); }, () => sel, i => { sel = i; erase = false; hl(bE, false); });
      mkLabel(row1, "Colour"); mkSwatches(g, row1, PAL, col, k => { col = k; });
      if (hard) mkSlider(g, row1, "Size", 60, 150, size, v => { size = v; });
      const bE = mkBtn(g, row2, "Erase", () => { erase = !erase; hl(bE, erase); });
      const bN = mkBtn(g, row2, "Night", () => { nTarget = nTarget ? 0 : 1; bN.textContent = nTarget ? "Day" : "Night"; });
      if (hard) { const bC = mkBtn(g, row2, "Cables", () => { cables = !cables; hl(bC, cables); }); hl(bC, cables); }
      mkBtn(g, row2, "Undo", () => hist.undo());
      mkBtn(g, row2, "Clear", () => { items = []; hist.push(); });
      mkEnd(g, row2, c, "my-moon-base");
      hist.push();
      const hit = p => { for (let i = items.length - 1; i >= 0; i--) { const o = items[i], s = o.s / 100, y = gnd(o.x); if (Math.abs(p.x - o.x) < WD[o.t] * s + 6 && p.y < y + 8 && p.y > y - HT[o.t] * s - 8) return i; } return -1; };
      g.on(c, "pointerdown", e => {
        const p = pos(e); try { (()=>{try{c.setPointerCapture(e.pointerId)}catch(_){}})(); } catch (x) {}
        const i = hit(p);
        if (i >= 0) { if (erase) { const o = items.splice(i, 1)[0]; fx.burst(o.x, gnd(o.x) - 20, ["#b9c3da", "#fff"], 12, 90); g.sfx("boom"); hist.push(); } else { drag = i; moved = false; g.sfx("pick"); } return; }
        if (erase || items.length >= 40) { g.sfx("wrong"); return; }
        items.push({ t: sel, x: g.clamp(p.x, 24, W - 24), s: hard ? size : 100, k: col }); fx.burst(p.x, gnd(p.x), ["#d8d3c8", "#fff"], 12, 90); g.sfx("thump"); hist.push();
      });
      g.on(c, "pointermove", e => { const p = pos(e); hov = hit(p); if (drag !== null && items[drag]) { items[drag].x = g.clamp(p.x, 20, W - 20); moved = true; } });
      const up = () => { if (drag !== null && items[drag] && moved) { fx.burst(items[drag].x, gnd(items[drag].x), ["#d8d3c8", "#fff"], 10, 80); g.sfx("drop"); hist.push(); } drag = null; };
      g.on(c, "pointerup", up); g.on(c, "pointercancel", up);
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt; night += (nTarget - night) * Math.min(1, dt * 2.5);
        q.fillStyle = "#03040e"; q.fillRect(0, 0, W, H); drawStars(q, stars, W, H, T, 1);
        // earth
        q.save(); q.translate(W * .78, H * .2); q.beginPath(); q.arc(0, 0, 44, 0, 7); q.clip(); const eg = q.createRadialGradient(-12, -12, 4, 0, 0, 46); eg.addColorStop(0, "#6bc4ff"); eg.addColorStop(1, "#1a58b8"); q.fillStyle = eg; q.fillRect(-50, -50, 100, 100);
        q.fillStyle = "#58c46a"; for (let k = 0; k < 4; k++) { q.beginPath(); q.ellipse(((k * 55 + T * 6) % 120) - 60, -20 + k * 14, 18, 11, .4, 0, 7); q.fill(); } q.fillStyle = "rgba(0,0,20," + (.35 * (1 - night)) + ")"; q.fillRect(-50, -50, 100, 100); q.restore();
        if (night < .9) { q.globalAlpha = 1 - night; const sg = q.createRadialGradient(80, 50, 5, 80, 50, 70); sg.addColorStop(0, "#fff8c0"); sg.addColorStop(1, "rgba(255,240,150,0)"); q.fillStyle = sg; q.fillRect(0, 0, 200, 160); q.globalAlpha = 1; }
        // ground
        q.beginPath(); q.moveTo(0, H); for (let x = 0; x <= W; x += 10) q.lineTo(x, gnd(x)); q.lineTo(W, H); q.closePath();
        const gg = q.createLinearGradient(0, H * .7, 0, H); gg.addColorStop(0, mixc("#d3cec2", "#55566a", night * .8)); gg.addColorStop(1, mixc("#8a867c", "#2a2b3c", night * .8)); q.fillStyle = gg; q.fill();
        craters.forEach(k => { q.fillStyle = "rgba(0,0,0,.16)"; q.beginPath(); q.ellipse(k.x, gnd(k.x) + k.d, k.w, k.w * .28, 0, 0, 7); q.fill(); });
        const sorted = items.slice().sort((a, b) => a.x - b.x);
        if (cables && sorted.length > 1) for (let i = 1; i < sorted.length; i++) { const a = sorted[i - 1], b = sorted[i]; ln(q, "#8a93a8", 3, q => { q.moveTo(a.x, gnd(a.x) + 3); for (let x = a.x; x < b.x; x += 12) q.lineTo(x, gnd(x) + 3); q.lineTo(b.x, gnd(b.x) + 3); }); }
        // rover
        rover.x += rover.dir * 22 * dt; if (rover.x > W - 40) rover.dir = -1; if (rover.x < 40) rover.dir = 1;
        q.save(); q.translate(rover.x, gnd(rover.x) - 5 + Math.sin(T * 8) * .7); q.scale(rover.dir, 1); sh(q, "#e7c35c", q => q.roundRect(-14, -14, 28, 10, 3), 3); sh(q, "#9fe6ff", q => q.rect(-3, -22, 10, 8), 2.5); [-9, 9].forEach(wx => { dot(q, OUT, wx, -2, 6); dot(q, "#8a93a8", wx, -2, 3); }); dot(q, "rgba(255,240,150," + night + ")", 14, -10, 4); q.restore();
        // buildings
        items.forEach((o, i) => { const s = o.s / 100; q.save(); q.translate(o.x, gnd(o.x)); q.scale(s, s); if (i === drag) q.translate(0, -6); if (i === hov && drag === null) q.scale(1.03, 1.03); bD(q, o.t, 1, T + o.x, night, o.k || "#ff5c7a"); q.restore(); });
        if (!items.length) tx(q, "Tap the ground to place a building", W / 2, H * .55, "#fff", 18);
        // hopping astronauts
        hops.forEach(a => {
          a.w -= dt; if (a.w <= 0) { a.w = g.rf(1, 2.6); const t2 = items.length ? g.pick(items).x + g.rf(-40, 40) : g.rf(40, W - 40); a.tx = g.clamp(t2, 20, W - 20); a.v = 120; }
          const dx = a.tx - a.x; if (Math.abs(dx) > 2) a.x += Math.sign(dx) * 24 * dt; a.hh = (a.hh || 0) + dt * 4; const hy = Math.abs(Math.sin(a.hh)) * 14;
          if (Math.abs(Math.sin(a.hh)) < .08 && Math.abs(dx) > 2 && Math.random() < .3) fx.burst(a.x, gnd(a.x), ["#d8d3c8"], 2, 30);
          q.save(); q.translate(a.x, gnd(a.x) - 8 - hy); sh(q, "#fff", q => q.roundRect(-5, -2, 10, 12, 4), 2.5); sh(q, "#fff", q => q.arc(0, -7, 6, 0, 7), 2.5); dot(q, a.c, 0, -7, 3.4); q.restore();
        });
        q.fillStyle = "rgba(0,0,30," + (.3 * night) + ")"; q.fillRect(0, 0, W, H);
        fx.draw(q, dt); g.score(items.length);
        tx(q, "Buildings: " + items.length + (erase ? "   (Erase on)" : ""), 10, 22, "#fff", 16, "left");
      });
    }
  });

  // ---------------------------------------------------------------- Planet Lander Lab
  B.add({
    id: "s15-lander", name: "Lander Lab", ages: [6, 18], cat: "Build", color: "#ff9f43", icon: "L",
    desc: "Design a moon lander with legs and springs, drop it on another world and see how it bounces.",
    controls: "Pick body, legs and springs, press Drop! Redesign for a gentler landing",
    start(g) {
      const { c, x: q, W, H } = g.canvas(600, 420), fx = mkFx();
      const hard = g.diff === 2, med = g.diff >= 1, nW = g.by(2, 3, 3), nL = g.by(3, 4, 4);
      const BWd = [80, 92, 72], BHd = [60, 52, 66], BM = [1, 1.15, .85], LL = [30, 34, 60], LX = [8, 36, 48];
      const SP = [{ k: 15, c: 7 }, { k: 40, c: 5 }, { k: 120, c: 1.5 }], FM = [1.2, .15, 2.6];
      const WORLD = [{ n: "Moon", g: 1.6, a: "#000", b: "#000", gr: "#b8b4aa" }, { n: "Mars", g: 3.7, a: "#7a3a2a", b: "#f0b080", gr: "#c0603a" }, { n: "Europa", g: 1.3, a: "#000", b: "#0a1230", gr: "#cfe6f5" }];
      const sv = ld(g), S0 = sv.st || {};
      let st = Object.assign({ body: 0, legs: 0, foot: 0, spring: 1, world: 0, load: 0, drop: 150, col: "#ff9f43" }, S0);
      st.body = ci(st.body, 3); st.legs = ci(st.legs, nL); st.foot = ci(st.foot, 3); st.spring = ci(st.spring, 3); st.world = ci(st.world, nW); st.load = g.clamp(+st.load || 0, 0, 10); st.drop = g.clamp(+st.drop || 150, 60, 300);
      if (!med) st.foot = 0; if (!hard) { st.load = 0; st.drop = g.by(150, 150, 150); }
      let best = +sv.best || 0, mode = "design", T = 0, L = null;
      const stars = mkStars(70), ground = () => WORLD[st.world].gr;
      const gnd = x => { const b = H * .82; return g.diff === 0 ? b : b + Math.sin(x * .012) * (hard ? 12 : 7) + (hard ? Math.sin(x * .05) * 6 : 0); };
      const save = () => g.save({ st, best });
      const pts = () => {
        const bw = BWd[st.body], bh = BHd[st.body], P = [];
        const sp = SP[st.spring], mu = FM[st.foot];
        if (st.legs === 3) { const R = bw * .78; for (let i = 0; i < 8; i++) { const a = i * PI2 / 8; P.push({ x: Math.cos(a) * R, y: Math.sin(a) * R, k: 12, c: 1.1, mu: .5, air: true }); } }
        else [-1, 1].forEach(s => { P.push({ x: s * (bw / 2 + LX[st.legs]), y: bh / 2 + LL[st.legs], k: sp.k, c: sp.c, mu, foot: true, s }); P.push({ x: s * bw * .5, y: bh / 2, k: 260, c: 6, mu: .6, hull: true }); });
        return P;
      };
      const landerD = (q, o, t, free) => {
        const bw = BWd[st.body], bh = BHd[st.body], k = st.col;
        const cs = Math.cos(o.a), sn = Math.sin(o.a), W2 = (x, y) => ({ x: o.x + x * cs - y * sn, y: o.y + x * sn + y * cs });
        if (st.legs !== 3) [-1, 1].forEach(s => {
          const hip = W2(s * bw * .42, bh / 2 - 6), ft = W2(s * (bw / 2 + LX[st.legs]), bh / 2 + LL[st.legs]);
          let fx2 = ft.x, fy2 = ft.y; if (!free) { const gy = gnd(fx2); if (fy2 > gy) fy2 = gy; }
          ln(q, "#8a93a8", 5, q => { q.moveTo(hip.x, hip.y); const mx = (hip.x + fx2) / 2, my = (hip.y + fy2) / 2, dx = fx2 - hip.x, dy = fy2 - hip.y, d = Math.hypot(dx, dy) || 1; for (let i = 1; i < 6; i++) q.lineTo(hip.x + dx * i / 6 + (i % 2 ? 1 : -1) * dy / d * 3, hip.y + dy * i / 6 - (i % 2 ? 1 : -1) * dx / d * 3); q.lineTo(fx2, fy2); });
          q.save(); q.translate(fx2, fy2); if (st.foot === 0) sh(q, "#6a7388", q => q.roundRect(-11, -4, 22, 6, 3), 3); else if (st.foot === 1) { dot(q, OUT, 0, -5, 8); dot(q, "#6a7388", 0, -5, 5); } else sh(q, "#6a7388", q => { q.moveTo(-6, -8); q.lineTo(6, -8); q.lineTo(0, 4); q.closePath(); }, 3); q.restore();
        });
        q.save(); q.translate(o.x, o.y); q.rotate(o.a);
        if (st.legs === 3) { const R = bw * .78; q.beginPath(); for (let i = 0; i < 8; i++) { const a = i * PI2 / 8; q.moveTo(Math.cos(a) * R + 10, Math.sin(a) * R); q.arc(Math.cos(a) * R, Math.sin(a) * R, 10, 0, 7); } q.fillStyle = "rgba(255,255,255,.55)"; q.fill(); q.strokeStyle = "rgba(255,255,255,.95)"; q.lineWidth = 3; q.stroke(); }
        if (st.body === 0) { sh(q, "#d7deee", q => q.roundRect(-bw / 2, -bh / 2, bw, bh, 18)); sh(q, "#9fe6ff", q => q.arc(0, -4, 11, 0, 7), 4); q.fillStyle = k; q.fillRect(-bw / 2 + 4, bh / 2 - 18, bw - 8, 8); }
        else if (st.body === 1) { sh(q, "#d7deee", q => { q.moveTo(-bw / 2, bh / 2); q.lineTo(-bw / 2, 0); q.arc(0, 0, bw / 2, PI, 0); q.lineTo(bw / 2, bh / 2); q.closePath(); }); sh(q, "#9fe6ff", q => q.arc(0, -6, 13, 0, 7), 4); q.fillStyle = k; q.fillRect(-bw / 2 + 3, bh / 2 - 12, bw - 6, 8); ln(q, "#b9c3da", 3, q => { q.moveTo(0, -bw / 2); q.lineTo(0, -bw / 2 - 16); }); dot(q, Math.sin(t * 4) > 0 ? "#ff4b4b" : "#7a2a2a", 0, -bw / 2 - 18, 3.5); }
        else { sh(q, "#cfd6e6", q => { const r = 14; q.moveTo(-bw / 2 + r, -bh / 2); q.lineTo(bw / 2 - r, -bh / 2); q.lineTo(bw / 2, -bh / 2 + r); q.lineTo(bw / 2, bh / 2 - r); q.lineTo(bw / 2 - r, bh / 2); q.lineTo(-bw / 2 + r, bh / 2); q.lineTo(-bw / 2, bh / 2 - r); q.lineTo(-bw / 2, -bh / 2 + r); q.closePath(); }); [-1, 1].forEach(s => sh(q, "#3d6bff", q => q.rect(s > 0 ? bw / 2 + 2 : -bw / 2 - 20, -8, 18, 26), 3)); sh(q, k, q => q.arc(0, -8, 11, 0, 7), 4); }
        q.restore();
      };
      const row1 = mkBar(g), row2 = mkBar(g), fbar = mkBar(g);
      const mk2 = (d, label, cnt, kind) => partRow(g, d, label, cnt, (q, w, h, i) => { const s0 = st[kind]; st[kind] = i; q.save(); q.scale(.4, .4); landerD(q, { x: w / .4 / 2, y: h / .4 * .3, a: 0 }, 0, true); q.restore(); st[kind] = s0; }, () => st[kind], i => { st[kind] = i; save(); g.sfx("pop"); });
      const refs = [];
      refs.push(mk2(row1, "Body", 3, "body")); refs.push(mk2(row1, "Legs", nL, "legs"));
      if (med) refs.push(mk2(row1, "Feet", 3, "foot"));
      mkOpts(g, row2, "Springs", ["Soft", "Medium", "Stiff"], () => st.spring, i => { st.spring = i; save(); });
      mkOpts(g, row2, "World", WORLD.slice(0, nW).map(w => w.n), () => st.world, i => { st.world = i; save(); });
      mkLabel(row2, "Colour"); mkSwatches(g, row2, PAL.slice(0, 8), st.col, k => { st.col = k; save(); });
      if (hard) { mkSlider(g, row2, "Cargo", 0, 10, st.load, v => { st.load = v; save(); }); mkSlider(g, row2, "Drop", 60, 300, st.drop, v => { st.drop = v; save(); }); }
      const bD = mkBtn(g, row2, "DROP!", () => drop()); bD.style.background = "#ff9f43"; bD.style.fontSize = "18px";
      mkBtn(g, fbar, "Back to design", () => setMode("design")); mkBtn(g, fbar, "Drop again", () => drop()); mkEnd(g, fbar, c, "my-lander");
      const setMode = m => { mode = m; row1.style.display = row2.style.display = m === "design" ? "flex" : "none"; fbar.style.display = m === "fly" ? "flex" : "none"; };
      setMode("design");
      const drop = () => {
        const M = BM[st.body] + st.load * .35 + .2;
        L = { x: W / 2, y: gnd(W / 2) - st.drop - 90, a: hard ? g.rf(-.15, .15) : 0, vx: hard ? g.rf(-25, 25) : 0, vy: 0, w: 0, M, I: M * 900, P: pts(), air: 0, bounces: 0, crash: 0, rest: 0, time: 0, done: false, was: false, impact: 0, res: "" };
        setMode("fly"); g.sfx("swish");
      };
      const step = h => {
        const gv = WORLD[st.world].g * 34, cs = Math.cos(L.a), sn = Math.sin(L.a); let Fx = 0, Fy = 0, Tq = 0, touch = false, hull = false;
        L.P.forEach(p => {
          const rx = p.x * cs - p.y * sn, ry = p.x * sn + p.y * cs, wx = L.x + rx, wy = L.y + ry, pen = wy - gnd(wx); p.pen = Math.max(0, pen);
          if (pen > 0) {
            const vx = L.vx - L.w * ry, vy = L.vy + L.w * rx, F = g.clamp(p.k * pen + p.c * vy, 0, 6000), Ft = g.clamp(-vx * 25, -p.mu * F, p.mu * F);
            Fx += Ft; Fy -= F; Tq += rx * -F - ry * Ft; touch = true; if (p.hull) hull = true;
            if (!L.was && vy > 40 && L.impact === 0) L.impact = vy;
            if (vy > 70 && Math.random() < .25) fx.burst(wx, gnd(wx), [ground(), "#fff"], 3, 50);
          }
        });
        L.vx += Fx / L.M * h; L.vy += (gv + Fy / L.M) * h; L.w += Tq / L.I * h; if (touch) L.w *= 1 - .6 * h; L.x += L.vx * h; L.y += L.vy * h; L.a += L.w * h;
        if (touch && !L.was && L.air > .25) { L.bounces++; g.sfx("thump"); }
        if (hull && !L.hullPrev) { L.crash++; g.sfx("boom"); } L.hullPrev = hull;
        if (touch) L.air = 0; else L.air += h; L.was = touch;
        L.x = g.clamp(L.x, 10, W - 10);
      };
      const finish = () => {
        L.done = true; const tilt = Math.abs(((L.a % PI2) + PI2 + PI) % PI2 - PI), sc = g.clamp(Math.round(150 - Math.max(0, L.bounces - 1) * 12 - L.crash * 20 - (st.legs === 3 ? 0 : tilt * 30)), 0, 150);
        L.sc = sc; L.res = sc > 120 ? "Super soft landing!" : sc > 80 ? "Nice landing!" : sc > 40 ? "Bumpy but safe!" : "Ouch! Try softer springs.";
        if (sc > best) best = sc; g.score(best); save(); g.sfx(sc > 80 ? "cheer" : "finish"); if (sc > 80) fx.burst(L.x, L.y - 40, ["#ffd34e", "#fff", "#6be28f"], 24, 170);
      };
      const bg = (t) => {
        const w = WORLD[st.world], gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, w.a); gr.addColorStop(1, w.b); q.fillStyle = gr; q.fillRect(0, 0, W, H);
        if (st.world !== 1) drawStars(q, stars, W, H, t, 1);
        if (st.world === 0) { dot(q, "#3a8ae0", W * .8, H * .18, 24); dot(q, "#58c46a", W * .8 - 6, H * .18 - 5, 9); }
        else if (st.world === 1) { dot(q, "#ffe8b0", W * .15, H * .2, 22); }
        else { dot(q, "#d9a066", W * .78, H * .24, 52); q.strokeStyle = "rgba(160,90,40,.7)"; q.lineWidth = 6; q.beginPath(); q.ellipse(W * .78, H * .24, 38, 12, 0, 0, PI2); q.stroke(); }
        q.beginPath(); q.moveTo(0, H); for (let x = 0; x <= W; x += 8) q.lineTo(x, gnd(x)); q.lineTo(W, H); q.closePath(); q.fillStyle = w.gr; q.fill(); q.strokeStyle = "rgba(0,0,0,.25)"; q.lineWidth = 3; q.stroke();
      };
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt; bg(T);
        if (mode === "design" || !L) {
          const o = { x: W / 2, y: H * .5 + Math.sin(T * 2) * 4, a: Math.sin(T) * .03 }; q.save(); q.translate(W / 2, H * .55); q.scale(1.8, 1.8); q.translate(-W / 2, -H * .55); landerD(q, { x: W / 2, y: H * .55 - 40 + Math.sin(T * 2) * 3, a: o.a }, T, true); q.restore();
          tx(q, "Design your lander, choose a world, press DROP!", W / 2, 28, "#fff", 18); tx(q, WORLD[st.world].n + " gravity: " + WORLD[st.world].g + " m/s2", W / 2, 52, "#ffd34e", 14);
          if (best) tx(q, "Best landing " + best, W - 12, H - 12, "#ffd34e", 15, "right");
        } else {
          if (!L.done) { L.time += dt; for (let i = 0; i < 4; i++) step(dt / 4); const sp = Math.abs(L.vx) + Math.abs(L.vy) + Math.abs(L.w) * 20; if (L.was && sp < 8) L.rest += dt; else L.rest = 0; if (L.rest > 1.2 || L.time > 22) finish(); }
          landerD(q, L, T); fx.draw(q, dt);
          tx(q, "Bounces " + L.bounces + "   Hull bumps " + L.crash, 12, 26, "#fff", 16, "left");
          if (L.done) { tx(q, L.res, W / 2, H * .22, "#fff", 26); tx(q, "Landing score " + L.sc + " / 150", W / 2, H * .22 + 34, "#ffd34e", 22); tx(q, "Change the springs or legs and try again", W / 2, H * .22 + 60, "#cfe9ff", 14); }
          return;
        }
        fx.draw(q, dt);
      });
    }
  });

  // ---------------------------------------------------------------- Satellite Maker
  B.add({
    id: "s15-satellite", name: "Satellite Maker", ages: [6, 18], cat: "Build", color: "#6be28f", icon: "Sa",
    desc: "Build a satellite, launch it on a rocket and fly it round the Earth beaming signals to the ground.",
    controls: "Pick parts and Launch. In orbit hold Boost (or Space) to climb higher, Slow down to dip lower",
    start(g) {
      const { c, x: q, W, H } = g.canvas(600, 420), fx = mkFx();
      const hard = g.diff === 2, med = g.diff >= 1, EX = W / 2, EY = H / 2 + 5, RE = 62, R0 = 128, V0 = 58, MU = V0 * V0 * R0;
      const sv = ld(g), S0 = sv.st || {};
      let st = Object.assign({ body: 0, pan: 0, ant: 0, col: "#ffd93d", col2: "#ff5c7a", fuel: 60 }, S0);
      st.body = ci(st.body, 3); st.pan = ci(st.pan, 3); st.ant = ci(st.ant, 3); st.fuel = g.clamp(+st.fuel || 60, 20, 100);
      let mode = "design", T = 0, A = null, O = null, best = +sv.best || 0, boost = 0, brake = 0, flash = 0, msg = "", msgT = 0;
      const stars = mkStars(120), save = () => g.save({ st, best });
      const satD = (q, o, t) => {
        const pw = [24, 44][o.pan];
        if (o.pan < 2) [-1, 1].forEach(s => { ln(q, "#8a93a8", 3, q => { q.moveTo(s * 12, 0); q.lineTo(s * 20, 0); }); sh(q, "#3d6bff", q => q.rect(s > 0 ? 20 : -20 - pw, -11, pw, 22), 3); q.strokeStyle = "#9fc0ff"; q.lineWidth = 1.2; q.beginPath(); for (let x = 1; x < pw / 11; x++) { q.moveTo(s > 0 ? 20 + x * 11 : -20 - x * 11, -11); q.lineTo(s > 0 ? 20 + x * 11 : -20 - x * 11, 11); } q.moveTo(s > 0 ? 20 : -20 - pw, 0); q.lineTo(s > 0 ? 20 + pw : -20, 0); q.stroke(); });
        else [-1, 1].forEach(s => { ln(q, "#8a93a8", 3, q => { q.moveTo(s * 12, 0); q.lineTo(s * 22, 0); }); sh(q, "#3d6bff", q => q.arc(s * 40, 0, 18, 0, 7), 3); q.strokeStyle = "#9fc0ff"; q.lineWidth = 1.2; q.beginPath(); for (let k = 0; k < 4; k++) { q.moveTo(s * 40, 0); q.lineTo(s * 40 + Math.cos(k * PI / 2 + .4) * 17, Math.sin(k * PI / 2 + .4) * 17); } q.stroke(); });
        if (o.ant === 0) { ln(q, "#b9c3da", 3, q => { q.moveTo(0, 12); q.lineTo(0, 22); }); sh(q, "#fff", q => { q.moveTo(-15, 32); q.quadraticCurveTo(0, 18, 15, 32); q.closePath(); }, 3); }
        else if (o.ant === 1) { ln(q, "#b9c3da", 3, q => { q.moveTo(0, 12); q.lineTo(0, 38); }); dot(q, Math.sin(t * 5) > 0 ? "#ff6b6b" : "#9a3b3b", 0, 40, 3.5); }
        else [-1, 1].forEach(s => { ln(q, "#b9c3da", 3, q => { q.moveTo(s * 7, 12); q.lineTo(s * 11, 34); }); dot(q, Math.sin(t * 5 + s) > 0 ? "#6be28f" : "#2d6b45", s * 11, 36, 3); });
        if (o.body === 0) sh(q, o.col, q => q.roundRect(-14, -14, 28, 28, 5));
        else if (o.body === 1) sh(q, o.col, q => q.roundRect(-12, -17, 24, 34, 11));
        else sh(q, o.col, q => { for (let i = 0; i < 6; i++) { const a = i * PI / 3 + PI / 6; if (i) q.lineTo(Math.cos(a) * 17, Math.sin(a) * 17); else q.moveTo(Math.cos(a) * 17, Math.sin(a) * 17); } q.closePath(); });
        q.fillStyle = o.col2; q.fillRect(-12, -3, 24, 5); dot(q, "#9fe6ff", 0, -8, 3.5);
      };
      const row1 = mkBar(g), row2 = mkBar(g), fbar = mkBar(g), th = kind => (q, w, h, i) => { const o = Object.assign({}, st, { col: "#ffd93d", col2: "#ff5c7a", body: kind === "body" ? i : 0, pan: kind === "pan" ? i : 0, ant: kind === "ant" ? i : 0 }); q.translate(w / 2, h / 2 - 2); q.scale(.55, .55); satD(q, o, 0); };
      partRow(g, row1, "Body", 3, th("body"), () => st.body, i => { st.body = i; save(); });
      partRow(g, row1, "Solar panels", 3, th("pan"), () => st.pan, i => { st.pan = i; save(); });
      partRow(g, row1, "Antenna", 3, th("ant"), () => st.ant, i => { st.ant = i; save(); });
      mkLabel(row2, "Colour"); mkSwatches(g, row2, PAL, st.col, k => { st.col = k; save(); });
      mkLabel(row2, "Stripe"); mkSwatches(g, row2, PAL, st.col2, k => { st.col2 = k; save(); });
      if (hard) mkSlider(g, row2, "Fuel", 20, 100, st.fuel, v => { st.fuel = v; save(); });
      const bL = mkBtn(g, row2, "LAUNCH!", () => launch()); bL.style.background = "#6be28f"; bL.style.fontSize = "18px";
      const hold = (b, k) => { const on = () => { if (k === "b") boost = 1; else brake = 1; }, off = () => { if (k === "b") boost = 0; else brake = 0; }; g.on(b, "pointerdown", on); g.on(b, "pointerup", off); g.on(b, "pointerleave", off); g.on(b, "pointercancel", off); };
      const bB = mkBtn(g, fbar, "Boost (hold)", () => {}), bS = mkBtn(g, fbar, "Slow down (hold)", () => {}); hold(bB, "b"); hold(bS, "s");
      mkBtn(g, fbar, "Back to design", () => setMode("design")); mkEnd(g, fbar, c, "my-satellite");
      const setMode = m => { mode = m; row1.style.display = row2.style.display = m === "design" ? "flex" : "none"; fbar.style.display = m === "design" ? "none" : "flex"; bB.style.display = bS.style.display = m === "orbit" ? "" : "none"; boost = brake = 0; };
      setMode("design");
      g.on(window, "keydown", e => { if (e.key === " " || e.key === "ArrowUp" || e.key === "w") boost = 1; if (e.key === "ArrowDown" || e.key === "s") brake = 1; if (e.key === " ") e.preventDefault(); });
      g.on(window, "keyup", e => { if (e.key === " " || e.key === "ArrowUp" || e.key === "w") boost = 0; if (e.key === "ArrowDown" || e.key === "s") brake = 0; });
      g.on(c, "pointerdown", () => { if (mode === "orbit") boost = 1; }); g.on(c, "pointerup", () => { boost = 0; }); g.on(c, "pointerleave", () => { boost = 0; });
      const launch = () => { A = { t: 0 }; setMode("ascent"); g.sfx("launch"); };
      const spawn = () => { O.x = EX + R0; O.y = EY; const f = hard ? .9 : med ? .93 : 1; O.vx = 0; O.vy = V0 * f; O.trail = []; O.th = 0; O.acc = 0; };
      const toOrbit = () => { O = { orbits: O ? O.orbits : 0, sig: O ? O.sig : 0, batt: 100, fuel: st.fuel, link: false, sg: 0 }; spawn(); setMode("orbit"); flash = 1; g.sfx("cheer"); msg = "In orbit! Hold Boost to fly higher."; msgT = 4; };
      const earth = t => {
        const eg = q.createRadialGradient(EX, EY, RE - 4, EX, EY, RE + 14); eg.addColorStop(0, "rgba(120,200,255,.9)"); eg.addColorStop(1, "rgba(120,200,255,0)"); q.fillStyle = eg; q.beginPath(); q.arc(EX, EY, RE + 14, 0, 7); q.fill();
        q.save(); q.beginPath(); q.arc(EX, EY, RE, 0, 7); q.clip(); q.fillStyle = "#2a7bd8"; q.fillRect(EX - RE, EY - RE, RE * 2, RE * 2); q.fillStyle = "#4bb86a"; for (let k = 0; k < 4; k++) { q.beginPath(); q.ellipse(EX - RE + ((k * 70 + t * 8) % 190) - 30, EY - 30 + k * 18, 26, 14, .4, 0, 7); q.fill(); } const sg = q.createLinearGradient(EX - RE, 0, EX + RE, 0); sg.addColorStop(0, "rgba(0,0,0,0)"); sg.addColorStop(1, "rgba(0,0,30,.6)"); q.fillStyle = sg; q.fillRect(EX - RE, EY - RE, RE * 2, RE * 2); q.restore();
      };
      const rocketAsc = (p, t) => {
        const ry = H * .72 - p * H * .38, op = Math.max(0, p - .72) * 7;
        q.save(); q.translate(W / 2, ry); const L = 24 + Math.sin(t * 40) * 6; q.fillStyle = "#ff8a1f"; q.beginPath(); q.moveTo(-9, 40); q.quadraticCurveTo(0, 40 + L * 2, 9, 40); q.fill(); q.fillStyle = "#ffe35c"; q.beginPath(); q.moveTo(-5, 40); q.quadraticCurveTo(0, 40 + L, 5, 40); q.fill();
        sh(q, "#f4f6fb", q => q.roundRect(-16, -30, 32, 70, 6)); sh(q, "#ff5c7a", q => { q.moveTo(-16, 20); q.lineTo(-30, 44); q.lineTo(-16, 38); q.closePath(); }, 5); sh(q, "#ff5c7a", q => { q.moveTo(16, 20); q.lineTo(30, 44); q.lineTo(16, 38); q.closePath(); }, 5);
        [-1, 1].forEach(s => { q.save(); q.translate(s * 14, -30); q.rotate(s * Math.min(1, op) * .9); sh(q, "#e8ecf5", q => { q.moveTo(0, 0); q.quadraticCurveTo(s * -14, -22, s * -14 + s * 0, -52); q.lineTo(0, -52); q.closePath(); }, 5); q.restore(); });
        if (op > .1) { q.save(); q.translate(0, -50 - op * 14); q.scale(.8, .8); satD(q, st, t); q.restore(); }
        q.restore();
      };
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt;
        if (mode === "design") {
          const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#04061a"); gr.addColorStop(1, "#16246a"); q.fillStyle = gr; q.fillRect(0, 0, W, H); drawStars(q, stars, W, H, T, 1);
          q.save(); q.translate(W / 2, H * .45 + Math.sin(T * 1.4) * 6); q.rotate(Math.sin(T * .7) * .08); q.scale(3.2, 3.2); satD(q, st, T); q.restore();
          tx(q, "Build your satellite, then press LAUNCH!", W / 2, 30, "#fff", 18); if (best) tx(q, "Best signals " + best, W - 12, H - 12, "#ffd34e", 15, "right"); fx.draw(q, dt); return;
        }
        if (mode === "ascent") {
          A.t += dt; const p = Math.min(1, A.t / 5);
          const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, mixc("#5bb8f5", "#04061a", p)); gr.addColorStop(1, mixc("#cdeeff", "#101a44", p)); q.fillStyle = gr; q.fillRect(0, 0, W, H); drawStars(q, stars, W, H, T, p);
          const gy = H * .85 + p * H; if (gy < H) { q.fillStyle = "#58b947"; q.fillRect(0, gy, W, H - gy); }
          rocketAsc(p, T); tx(q, "Launching your satellite...", W / 2, 30, "#fff", 18); tx(q, Math.round(p * 400) + " km", 12, H - 12, "#cfe9ff", 14, "left");
          if (A.t > 5.2) toOrbit(); return;
        }
        // ---- orbit
        const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#02030c"); gr.addColorStop(1, "#0b1240"); q.fillStyle = gr; q.fillRect(0, 0, W, H); drawStars(q, stars, W, H, T, 1);
        const sun = g.clamp(1 - Math.max(0, O.x - EX) / 10, 0, 1) && !(O.x > EX && Math.abs(O.y - EY) < RE);
        const acc = 55 / (1 + (st.pan + 1) * .12 + (hard ? st.fuel * .01 : 0)), canB = !hard || O.fuel > 0;
        for (let k = 0; k < 3; k++) {
          const h = dt / 3, dx = O.x - EX, dy = O.y - EY, r = Math.hypot(dx, dy), a = MU / (r * r);
          O.vx -= dx / r * a * h; O.vy -= dy / r * a * h;
          const sp = Math.hypot(O.vx, O.vy) || 1, dir = (boost && canB ? 1 : 0) - (brake && canB ? 1 : 0);
          if (dir) { O.vx += O.vx / sp * acc * dir * h; O.vy += O.vy / sp * acc * dir * h; if (hard) O.fuel = Math.max(0, O.fuel - 9 * h); }
          if (med && r < RE + 30) { const d = (1 - (r - RE) / 30) * (hard ? .5 : .25) * h; O.vx *= 1 - d; O.vy *= 1 - d; }
          O.x += O.vx * h; O.y += O.vy * h;
        }
        const dx = O.x - EX, dy = O.y - EY, r = Math.hypot(dx, dy), ang = Math.atan2(dy, dx);
        let da = ang - (O.prev === undefined ? ang : O.prev); if (da > PI) da -= PI2; if (da < -PI) da += PI2; O.prev = ang; O.acc += da; if (Math.abs(O.acc) >= PI2) { O.acc -= Math.sign(O.acc) * PI2; O.orbits++; g.sfx("star"); fx.burst(O.x, O.y, ["#ffd34e", "#fff"], 14, 90); }
        if (r < RE + 3) { fx.burst(O.x, O.y, ["#ff8a1f", "#ffe35c", "#fff"], 30, 160); g.sfx("boom"); msg = "Too low! It burned up. Here is a new one."; msgT = 4; spawn(); O.prev = undefined; O.fuel = st.fuel; }
        else if (r > 330) { msg = "Drifted away! Here is a new one."; msgT = 4; g.sfx("sad"); spawn(); O.prev = undefined; }
        O.trail.push({ x: O.x, y: O.y }); if (O.trail.length > 140) O.trail.shift();
        const insun = !(O.x > EX && Math.abs(O.y - EY) < RE);
        O.batt = g.clamp(O.batt + (insun ? (st.pan + 1) * 6 : -5) * dt, 0, 100);
        // ground stations and link
        let linked = false;
        for (let i = 0; i < 3; i++) {
          const sa = i * 2.1 + T * .05, sx = EX + Math.cos(sa) * RE, sy = EY + Math.sin(sa) * RE; let d = Math.abs(((sa - ang) % PI2 + PI2 + PI) % PI2 - PI);
          q.save(); q.translate(sx, sy); q.rotate(sa + PI / 2); ln(q, "#fff", 2, q => { q.moveTo(0, 0); q.lineTo(0, -9); }); dot(q, "#ff6b6b", 0, -10, 2.5); q.restore();
          const rng = [.62, .42, .5][st.ant] * (r < 170 ? 1.15 : .8);
          if (d < rng && (!hard || O.batt > 8) && insun !== null) { linked = true; q.strokeStyle = "rgba(120,240,255," + (.4 + .4 * Math.sin(T * 12)) + ")"; q.lineWidth = 2; q.setLineDash([5, 5]); q.beginPath(); q.moveTo(sx, sy); q.lineTo(O.x, O.y); q.stroke(); q.setLineDash([]); }
        }
        O.sg += linked ? dt * 2 : 0; if (O.sg >= 1) { O.sg -= 1; O.sig++; g.sfx("note", 520 + (O.sig % 5) * 80); } O.link = linked;
        const score = O.orbits * 10 + O.sig; g.score(score); if (score > best) { best = score; save(); }
        earth(T);
        q.beginPath(); O.trail.forEach((p, i) => { if (i) q.lineTo(p.x, p.y); else q.moveTo(p.x, p.y); }); q.strokeStyle = "rgba(255,255,255,.35)"; q.lineWidth = 2; q.stroke();
        q.save(); q.translate(O.x, O.y); q.rotate(Math.atan2(-dx, dy)); q.scale(.8, .8); satD(q, st, T);
        if ((boost && canB) || (brake && canB)) { q.fillStyle = "#ffb03a"; q.beginPath(); q.moveTo(-9, -16); q.lineTo(0, -16 - 18 - Math.random() * 8); q.lineTo(9, -16); q.fill(); }
        q.restore(); fx.draw(q, dt);
        tx(q, "Orbits " + O.orbits + "   Signals " + O.sig, 12, 24, "#fff", 17, "left"); tx(q, "Height " + Math.round((r - RE) * 6) + " km", 12, 46, "#cfe9ff", 14, "left");
        q.fillStyle = "rgba(0,0,0,.5)"; q.fillRect(W - 112, 12, 100, 12); q.fillStyle = O.batt > 25 ? "#6be28f" : "#ff6b6b"; q.fillRect(W - 112, 12, O.batt, 12); tx(q, "Battery", W - 62, 40, "#fff", 12);
        if (hard) tx(q, "Fuel " + Math.round(O.fuel) + "%", W - 12, 58, "#ffd34e", 13, "right");
        if (msgT > 0) { msgT -= dt; tx(q, msg, W / 2, H - 16, "#ffd34e", 16); }
        if (flash > 0) { q.fillStyle = "rgba(255,255,255," + flash + ")"; q.fillRect(0, 0, W, H); flash -= dt * 1.5; }
      });
    }
  });

  // ---------------------------------------------------------------- Solar System Builder
  B.add({
    id: "s15-solar", name: "Solar System Builder", ages: [5, 18], cat: "Creative", color: "#7b6cff", icon: "So",
    desc: "Make your own star system: place planets, rings, moons, comets and asteroid belts and watch them orbit.",
    controls: "Pick a world and tap the sky to place it. Moons: tap close to a planet. Remove deletes",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(600, 420), fx = mkFx();
      const CX = W / 2, CY = H / 2, hard = g.diff === 2, med = g.diff >= 1, nTool = g.by(4, 6, 6);
      const NAMES = ["Rocky", "Gas giant", "Ringed", "Moon", "Comet", "Belt"], STARS = ["#ffd34e", "#ff9f43", "#bfe6ff", "#ff6b5c"];
      const sv = ld(g);
      let bs = Array.isArray(sv.bs) ? sv.bs.filter(b => b && typeof b.k === "string") : null;
      if (!bs || !bs.length) bs = [{ id: 1, k: "p", type: 0, col: "#3ec1ff", a: 150, e: 0, rot: 0, M: 0, r: 10 }, { id: 2, k: "m", par: 1, d: 24, col: "#ffffff", r: 4, M: 1 }];
      let nid = bs.reduce((m, b) => Math.max(m, b.id || 0), 0) + 1, tool = 0, size = 1, col = "#ff9f43", star = sv.star || STARS[0], speed = 1, ecc = 0, rem = false, rings = true, T = 0, msg = "", msgT = 0;
      const stars = mkStars(120);
      const hist = mkHist(g, () => ({ bs, star }), o => { bs = o.bs; star = o.star || star; });
      const pD = (q, type, r, k, t) => {
        const gr = q.createRadialGradient(-r * .35, -r * .35, r * .1, 0, 0, r); gr.addColorStop(0, mixc(k, "#ffffff", .55)); gr.addColorStop(.6, k); gr.addColorStop(1, mixc(k, "#000000", .55));
        if (type === 2) { q.strokeStyle = "rgba(240,220,170,.9)"; q.lineWidth = r * .35; q.beginPath(); q.ellipse(0, 0, r * 1.9, r * .55, -.35, PI, PI2); q.stroke(); }
        q.fillStyle = gr; q.beginPath(); q.arc(0, 0, r, 0, 7); q.fill();
        if (type === 1) { q.save(); q.beginPath(); q.arc(0, 0, r, 0, 7); q.clip(); q.fillStyle = "rgba(255,255,255,.22)"; [-.5, -.1, .35].forEach((y, i) => q.fillRect(-r, y * r, r * 2, r * (.16 + i * .04))); q.restore(); }
        else if (type === 0) { q.fillStyle = "rgba(0,0,0,.18)"; dot(q, "rgba(0,0,0,.18)", r * .3, r * .1, r * .22); dot(q, "rgba(0,0,0,.14)", -r * .25, -r * .35, r * .16); }
        if (type === 2) { q.strokeStyle = "rgba(240,220,170,.95)"; q.lineWidth = r * .35; q.beginPath(); q.ellipse(0, 0, r * 1.9, r * .55, -.35, 0, PI); q.stroke(); }
      };
      const row1 = mkBar(g), row2 = mkBar(g);
      partRow(g, row1, "World", nTool, (q, w, h, i) => { q.translate(w / 2, h / 2); if (i < 3) pD(q, i, i === 2 ? 9 : 14, i === 1 ? "#ff9f43" : "#3ec1ff", 0); else if (i === 3) { pD(q, 0, 14, "#6be28f", 0); dot(q, "#fff", 13, -12, 5); } else if (i === 4) { ln(q, "#bfe6ff", 3, q => { q.moveTo(-20, 12); q.lineTo(8, -6); }); dot(q, "#fff", 10, -7, 7); } else { for (let k = 0; k < 14; k++) dot(q, "#8a7a6a", Math.cos(k * .9) * 18, Math.sin(k * .9) * 18 * .6, 2.5); } }, () => tool, i => { tool = i; rem = false; hl(bR, false); });
      mkLabel(row1, "Size"); const refS = mkOpts(g, row1, "", ["S", "M", "L"], () => size, i => { size = i; });
      mkLabel(row2, "Colour"); mkSwatches(g, row2, PAL, col, k => { col = k; });
      mkLabel(row2, "Star"); mkSwatches(g, row2, STARS, star, k => { star = k; hist.push(); });
      if (med) mkSlider(g, row2, "Speed", 0, 30, 10, v => { speed = v / 10; });
      if (hard) mkSlider(g, row2, "Squash orbit", 0, 70, 0, v => { ecc = v / 100; });
      const bR = mkBtn(g, row2, "Remove", () => { rem = !rem; hl(bR, rem); });
      const bG = mkBtn(g, row2, "Orbit lines", () => { rings = !rings; hl(bG, rings); }); hl(bG, rings);
      mkBtn(g, row2, "Undo", () => hist.undo()); mkBtn(g, row2, "Clear", () => { bs = []; hist.push(); });
      mkEnd(g, row2, c, "my-solar-system"); hist.push();
      const kep = b => { let E = b.M; for (let i = 0; i < 6; i++) E = b.M + b.e * Math.sin(E); const bb = b.a * Math.sqrt(1 - b.e * b.e), x0 = b.a * (Math.cos(E) - b.e), y0 = bb * Math.sin(E), cs = Math.cos(b.rot), sn = Math.sin(b.rot); return { x: CX + x0 * cs - y0 * sn, y: CY + x0 * sn + y0 * cs }; };
      const posOf = b => b.k === "m" ? (() => { const p = bs.find(o => o.id === b.par); if (!p) return null; const pp = posOf(p); return pp ? { x: pp.x + Math.cos(b.M) * b.d, y: pp.y + Math.sin(b.M) * b.d } : null; })() : kep(b);
      g.on(c, "pointerdown", e => {
        const p = pos(e), rr = [6, 10, 15][size];
        if (rem) { let bi = -1, bd = 26; bs.forEach((b, i) => { if (b.k === "b" || b.k === "m" || b.k === "p" || b.k === "c") { const bp = b.k === "b" ? null : posOf(b); const d = b.k === "b" ? Math.abs(Math.hypot(p.x - CX, p.y - CY) - b.a) : (bp ? Math.hypot(p.x - bp.x, p.y - bp.y) : 999); if (d < bd) { bd = d; bi = i; } } }); if (bi >= 0) { const b = bs[bi]; bs = bs.filter(o => o !== b && !(o.k === "m" && o.par === b.id)); fx.burst(p.x, p.y, ["#fff", "#ffd34e"], 16, 110); g.sfx("boom"); hist.push(); } else g.sfx("wrong"); return; }
        if (bs.length >= 40) { msg = "That is a busy sky! Try Remove."; msgT = 2.5; g.sfx("wrong"); return; }
        const d = Math.hypot(p.x - CX, p.y - CY), ang = Math.atan2(p.y - CY, p.x - CX);
        if (tool === 3) {
          let bp = null, bd = 80; bs.forEach(b => { if (b.k === "p") { const pp = posOf(b), dd = pp ? Math.hypot(p.x - pp.x, p.y - pp.y) : 999; if (dd < bd) { bd = dd; bp = b; } } });
          if (!bp) { msg = "Tap close to a planet to give it a moon"; msgT = 2.5; g.sfx("wrong"); return; }
          bs.push({ id: nid++, k: "m", par: bp.id, d: g.clamp(bd, bp.r + 8, 56), col, r: [3, 4.5, 6][size], M: ang });
        } else if (tool === 4) { if (d < 30) { g.sfx("wrong"); return; } bs.push({ id: nid++, k: "c", a: g.clamp(d * 1.5, 90, 300), e: .82, rot: ang + PI, M: 0, col: "#bfe6ff", r: 5 }); }
        else if (tool === 5) { if (d < 45) { g.sfx("wrong"); return; } bs.push({ id: nid++, k: "b", a: d, col, r: 2, M: Math.random() * 6 }); }
        else { if (d < 36) { msg = "Too close to the star! Tap further out"; msgT = 2.5; g.sfx("wrong"); return; } bs.push({ id: nid++, k: "p", type: tool, col, a: Math.min(d, 290), e: hard ? ecc : 0, rot: ang, M: 0, r: rr * (tool === 1 ? 1.4 : 1) }); }
        fx.burst(p.x, p.y, [col, "#fff", "#ffd34e"], 16, 120); g.sfx("pop"); hist.push();
      });
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt;
        const gr = q.createRadialGradient(CX, CY, 20, CX, CY, 330); gr.addColorStop(0, "#14123a"); gr.addColorStop(1, "#04030f"); q.fillStyle = gr; q.fillRect(0, 0, W, H); drawStars(q, stars, W, H, T, 1);
        bs.forEach(b => {
          if (b.k === "m") b.M += dt * speed * 2.2 * Math.pow(24 / Math.max(14, b.d), 1.5);
          else if (b.k === "b") b.M += dt * speed * .15; else b.M += dt * speed * (b.k === "c" ? 1.1 : .9) * Math.pow(90 / b.a, 1.5);
        });
        if (rings) { q.lineWidth = 1; bs.forEach(b => { if (b.k === "p" || b.k === "c") { q.strokeStyle = b.k === "c" ? "rgba(191,230,255,.18)" : "rgba(255,255,255,.14)"; q.beginPath(); q.save(); q.translate(CX, CY); q.rotate(b.rot); q.ellipse(-b.a * b.e, 0, b.a, b.a * Math.sqrt(1 - b.e * b.e), 0, 0, 7); q.restore(); q.stroke(); } }); }
        bs.forEach(b => { if (b.k === "b") { for (let i = 0; i < 70; i++) { const a = b.M + i * 6.2832 / 70 * 1, rr = b.a + Math.sin(i * 12.9) * 7; q.fillStyle = i % 3 ? "#8a7a6a" : "#bdb09c"; q.fillRect(CX + Math.cos(a) * rr, CY + Math.sin(a) * rr * 1, 2.2, 2.2); } } });
        const pulse = 1 + Math.sin(T * 2) * .04, SR = 24 * pulse, sg = q.createRadialGradient(CX, CY, 4, CX, CY, SR * 3); sg.addColorStop(0, star); sg.addColorStop(.3, mixc(star, "#ffffff", .1)); sg.addColorStop(.31, "rgba(255,200,120,.25)"); sg.addColorStop(1, "rgba(255,200,120,0)");
        q.fillStyle = sg; q.beginPath(); q.arc(CX, CY, SR * 3, 0, 7); q.fill(); dot(q, mixc(star, "#ffffff", .35), CX, CY, SR * .8);
        bs.forEach(b => {
          if (b.k === "p") { const p = kep(b); q.save(); q.translate(p.x, p.y); pD(q, b.type, b.r, b.col, T); q.restore(); }
          else if (b.k === "m") { const p = posOf(b); if (p) { q.save(); q.translate(p.x, p.y); pD(q, 0, b.r, b.col, T); q.restore(); } }
          else if (b.k === "c") { const p = kep(b), dx = p.x - CX, dy = p.y - CY, d = Math.hypot(dx, dy) || 1, L = g.clamp(9000 / d, 20, 130); const tg = q.createLinearGradient(p.x, p.y, p.x + dx / d * L, p.y + dy / d * L); tg.addColorStop(0, "rgba(200,235,255,.9)"); tg.addColorStop(1, "rgba(200,235,255,0)"); q.strokeStyle = tg; q.lineWidth = 8; q.lineCap = "round"; q.beginPath(); q.moveTo(p.x, p.y); q.lineTo(p.x + dx / d * L, p.y + dy / d * L); q.stroke(); dot(q, "#fff", p.x, p.y, 5); }
        });
        fx.draw(q, dt); g.score(bs.filter(b => b.k !== "b").length + bs.filter(b => b.k === "b").length);
        tx(q, "Bodies: " + bs.length + (rem ? "   (Remove on)" : "   Tool: " + NAMES[tool]), 10, 22, "#fff", 16, "left");
        if (msgT > 0) { msgT -= dt; tx(q, msg, W / 2, H - 14, "#ffd34e", 15); }
      });
    }
  });

  // ---------------------------------------------------------------- Fleet Parade Designer
  B.add({
    id: "s15-fleet", name: "Spaceship Fleet Parade", ages: [5, 16], cat: "Creative", color: "#c86bff", icon: "F",
    desc: "Design a spaceship, add it to your fleet, then send the whole fleet on a sparkling parade.",
    controls: "Pick hull, wings and cockpit, then Add to fleet. PARADE! sends your fleet flying past",
    start(g) {
      const { c, x: q, W, H } = g.canvas(600, 380), fx = mkFx();
      const hard = g.diff === 2, med = g.diff >= 1, nH = g.by(3, 5, 6), GL = ["#ff9f43", "#3ec1ff", "#6be28f", "#c86bff", "#ffd93d", "#ff5c7a"];
      const sv = ld(g), S0 = sv.st || {};
      let st = Object.assign({ hull: 0, wing: 0, cock: 0, eng: 2, dec: 0, col: "#ff5c7a", col2: "#ffffff", glow: "#ff9f43", sz: 100 }, S0);
      st.hull = ci(st.hull, nH); st.wing = ci(st.wing, nH); st.cock = ci(st.cock, nH); st.dec = ci(st.dec, med ? 5 : 1); st.eng = g.clamp(st.eng | 0, 1, 3); st.sz = g.clamp(+st.sz || 100, 70, 140); if (!hard) st.sz = 100; if (!med) { st.glow = "#ff9f43"; st.eng = 2; }
      let fleet = Array.isArray(sv.fleet) ? sv.fleet.slice(0, 8) : [], mode = "design", T = 0, PT = 0;
      const stars = mkStars(70), save = () => g.save({ st, fleet });
      const hullP = (q, i) => { if (i === 0) { q.moveTo(62, 0); q.lineTo(-40, -16); q.lineTo(-52, -8); q.lineTo(-52, 8); q.lineTo(-40, 16); } else if (i === 1) q.ellipse(0, 0, 56, 24, 0, 0, 7); else if (i === 2) q.roundRect(-54, -17, 116, 34, 17); else if (i === 3) { q.moveTo(64, 0); q.quadraticCurveTo(10, -30, -50, -24); q.lineTo(-40, 0); q.lineTo(-50, 24); q.quadraticCurveTo(10, 30, 64, 0); } else if (i === 4) { q.moveTo(60, 0); q.quadraticCurveTo(20, -26, -30, -14); q.lineTo(-56, -26); q.lineTo(-48, 0); q.lineTo(-56, 26); q.lineTo(-30, 14); q.quadraticCurveTo(20, 26, 60, 0); } else { q.moveTo(50, -12); q.lineTo(62, 0); q.lineTo(50, 12); q.lineTo(-46, 22); q.lineTo(-56, 10); q.lineTo(-56, -10); q.lineTo(-46, -22); } q.closePath(); };
      const shipD = (q, o, t) => {
        q.save(); q.scale(o.sz / 100, o.sz / 100);
        const ys = o.eng === 1 ? [0] : o.eng === 2 ? [-9, 9] : [-12, 0, 12];
        ys.forEach(y => { const L = 22 + Math.sin(t * 40 + y) * 7; q.fillStyle = o.glow; q.beginPath(); q.moveTo(-56, y - 6); q.quadraticCurveTo(-56 - L * .7, y, -56 - L * 1.4, y); q.quadraticCurveTo(-56 - L * .7, y, -56, y + 6); q.fill(); q.fillStyle = "#fff"; q.beginPath(); q.moveTo(-56, y - 3); q.lineTo(-56 - L * .7, y); q.lineTo(-56, y + 3); q.fill(); sh(q, "#8a93a8", q => q.rect(-62, y - 5, 10, 10), 3); });
        [-1, 1].forEach(s => {
          if (o.wing === 0) sh(q, o.col2, q => { q.moveTo(10, s * 14); q.lineTo(-30, s * 50); q.lineTo(-44, s * 50); q.lineTo(-30, s * 14); q.closePath(); });
          else if (o.wing === 1) sh(q, o.col2, q => { q.moveTo(30, s * 12); q.lineTo(-48, s * 56); q.lineTo(-48, s * 12); q.closePath(); });
          else if (o.wing === 2) { sh(q, o.col2, q => q.roundRect(-24, s > 0 ? 10 : -40, 36, 30, 6)); dot(q, "#ffd93d", -6, s * 36, 4); }
          else if (o.wing === 3) sh(q, o.col2, q => { q.moveTo(20, s * 10); q.quadraticCurveTo(-20, s * 70, -50, s * 40); q.quadraticCurveTo(-24, s * 34, -20, s * 10); q.closePath(); });
          else if (o.wing === 4) { sh(q, o.col2, q => { q.moveTo(24, s * 12); q.lineTo(-6, s * 38); q.lineTo(-12, s * 12); q.closePath(); }); sh(q, o.col2, q => { q.moveTo(-14, s * 12); q.lineTo(-40, s * 34); q.lineTo(-48, s * 12); q.closePath(); }); }
        });
        if (o.wing === 5) { q.strokeStyle = OUT; q.lineWidth = 11; q.beginPath(); q.ellipse(-8, 0, 12, 42, 0, 0, 7); q.stroke(); q.strokeStyle = o.col2; q.lineWidth = 5; q.stroke(); }
        sh(q, o.col, q => hullP(q, o.hull), 6);
        q.save(); q.beginPath(); hullP(q, o.hull); q.clip(); q.fillStyle = o.col2;
        if (o.dec === 1) q.fillRect(-60, -3, 124, 6);
        else if (o.dec === 2) { q.beginPath(); for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5, r = i % 2 ? 4 : 10; q.lineTo(-14 + Math.cos(a) * r, Math.sin(a) * r); } q.closePath(); q.fill(); }
        else if (o.dec === 3) [-34, -20, -6].forEach(x => { q.beginPath(); q.arc(x, 0, 4, 0, 7); q.fill(); });
        else if (o.dec === 4) { q.beginPath(); q.moveTo(-10, -14); q.lineTo(-22, 2); q.lineTo(-14, 2); q.lineTo(-20, 14); q.lineTo(-4, -4); q.lineTo(-12, -4); q.closePath(); q.fill(); }
        q.restore();
        const gl = "#9fe6ff";
        if (o.cock === 0) { sh(q, gl, q => q.ellipse(18, 0, 14, 9, 0, 0, 7), 4); }
        else if (o.cock === 1) sh(q, gl, q => q.roundRect(4, -5, 26, 10, 5), 4);
        else if (o.cock === 2) { ln(q, "#b9c3da", 2.5, q => { q.moveTo(12, -8); q.lineTo(4, -26); }); sh(q, gl, q => q.arc(14, 0, 10, 0, 7), 4); }
        else if (o.cock === 3) [-10, 8, 26].forEach(x => sh(q, gl, q => q.arc(x, 0, 5, 0, 7), 3.5));
        else if (o.cock === 4) sh(q, gl, q => q.ellipse(24, 0, 16, 11, 0, 0, 7), 4);
        q.restore();
      };
      const row1 = mkBar(g), row2 = mkBar(g), pbar = mkBar(g);
      const th = kind => (q, w, h, i) => { const o = Object.assign({}, st, { col: "#ff6b8a", col2: "#ffffff", sz: 100, dec: 0, eng: 1, wing: kind === "wing" ? i : 1, hull: kind === "hull" ? i : 0, cock: kind === "cock" ? i : 0 }); q.translate(w / 2 + 3, h / 2); q.scale(.36, .36); shipD(q, o, 0); };
      partRow(g, row1, "Hull", nH, th("hull"), () => st.hull, i => { st.hull = i; save(); });
      partRow(g, row1, "Wings", nH, th("wing"), () => st.wing, i => { st.wing = i; save(); });
      partRow(g, row1, "Cockpit", nH, th("cock"), () => st.cock, i => { st.cock = i; save(); });
      mkLabel(row2, "Colour"); mkSwatches(g, row2, PAL, st.col, k => { st.col = k; save(); });
      mkLabel(row2, "Trim"); mkSwatches(g, row2, PAL, st.col2, k => { st.col2 = k; save(); });
      if (med) { mkOpts(g, row2, "Engines", ["1", "2", "3"], () => st.eng - 1, i => { st.eng = i + 1; save(); }); mkOpts(g, row2, "Mark", ["None", "Stripe", "Star", "Dots", "Bolt"], () => st.dec, i => { st.dec = i; save(); }); mkLabel(row2, "Flame"); mkSwatches(g, row2, GL, st.glow, k => { st.glow = k; save(); }); }
      if (hard) mkSlider(g, row2, "Size", 70, 140, st.sz, v => { st.sz = v; save(); });
      mkBtn(g, row2, "Add to fleet", () => { if (fleet.length >= 8) fleet.shift(); fleet.push(Object.assign({}, st)); save(); g.sfx("cheer"); fx.burst(W / 2, H * .45, [st.col, st.col2, "#ffd34e"], 24, 160); });
      mkBtn(g, row2, "Remove last", () => { fleet.pop(); save(); });
      mkBtn(g, row2, "Surprise me", () => { st.hull = g.ri(0, nH - 1); st.wing = g.ri(0, nH - 1); st.cock = g.ri(0, nH - 1); st.col = g.pick(PAL); st.col2 = g.pick(PAL); if (med) { st.dec = g.ri(0, 4); st.glow = g.pick(GL); st.eng = g.ri(1, 3); } g.sfx("pop"); save(); });
      const bP = mkBtn(g, row2, "PARADE!", () => { if (!fleet.length) { fleet.push(Object.assign({}, st)); save(); } mode = "parade"; PT = 0; row1.style.display = row2.style.display = "none"; pbar.style.display = "flex"; g.sfx("cheer"); [523, 659, 784, 1047].forEach((f, i) => g.timeout(() => g.sfx("note", f), i * 180)); }); bP.style.background = "#c86bff"; bP.style.color = "#fff";
      mkBtn(g, pbar, "Back to design", () => { mode = "design"; row1.style.display = row2.style.display = "flex"; pbar.style.display = "none"; });
      mkEnd(g, pbar, c, "my-fleet"); pbar.style.display = "none";
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt; g.score(fleet.length);
        const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#05061c"); gr.addColorStop(1, "#1b1250"); q.fillStyle = gr; q.fillRect(0, 0, W, H);
        if (mode === "design") {
          drawStars(q, stars, W, H, T, 1); q.save(); q.translate(W / 2, H * .45 + Math.sin(T * 1.5) * 6); q.rotate(Math.sin(T) * .04); q.scale(1.9, 1.9); shipD(q, st, T); q.restore();
          tx(q, "Design a ship, add it to your fleet!", W / 2, 28, "#fff", 18); tx(q, "Fleet: " + fleet.length + " ship" + (fleet.length === 1 ? "" : "s"), 12, H - 12, "#ffd34e", 15, "left");
          fleet.forEach((o, i) => { q.save(); q.translate(40 + i * 72, H - 56); q.scale(.3, .3); shipD(q, o, T + i); q.restore(); });
          fx.draw(q, dt); return;
        }
        PT += dt; stars.forEach(s => { s.x -= dt * (.15 + s.r * .15); if (s.x < 0) s.x += 1; }); drawStars(q, stars, W, H, T, 1);
        const N = fleet.length, span = W + 520, lead = ((PT * 90) % (span + N * 80)) - 260;
        for (let i = N - 1; i >= 0; i--) {
          const row = Math.ceil(i / 2) * (i % 2 ? 1 : -1), px = lead - Math.ceil(i / 2) * 95, py = H * .48 + row * 70 + Math.sin(T * 2 + i) * 7;
          q.save(); q.translate(px, py); q.rotate(Math.sin(T * 1.5 + i) * .05); q.scale(1, 1); shipD(q, fleet[i], T + i); q.restore();
          if (px > -60 && px < W + 60 && Math.random() < dt * 30) fx.burst(px - 60, py, [fleet[i].glow, "#fff"], 1, 40);
          if (px > 0 && px < W && Math.random() < dt * 3) fx.burst(px, py - 40 + Math.random() * 80, [fleet[i].col, fleet[i].col2, "#ffd34e"], 8, 90);
        }
        fx.draw(q, dt); tx(q, "The Grand Parade of " + N + " ship" + (N === 1 ? "" : "s") + "!", W / 2, 32, "#ffd34e", 22);
      });
    }
  });

  // ---------------------------------------------------------------- Paper Plane Lab
  B.add({
    id: "s15-plane", name: "Paper Plane Lab", ages: [5, 18], cat: "Build", color: "#4cc3ff", icon: "P",
    desc: "Fold a paper plane, decorate it and throw it. Tune the wings, tail and nose weight to fly further.",
    controls: "Pick a plane (or tune the sliders), colour it, then Throw! Tweak and throw again",
    start(g) {
      const { c, x: q, W, H } = g.canvas(600, 380), fx = mkFx();
      const hard = g.diff === 2, med = g.diff >= 1;
      const TPL = [{ n: "Dart", nose: 5, span: 25, sweep: 80, tail: 20 }, { n: "Glider", nose: 40, span: 80, sweep: 20, tail: 50 }, { n: "Stunt", nose: 15, span: 50, sweep: 50, tail: 30 }];
      const sv = ld(g), S0 = sv.st || {};
      let st = Object.assign({ nose: 40, span: 80, sweep: 20, tail: 50, power: 70, ang: 15, wind: 0, col: "#ffffff", col2: "#ff5c7a", deco: 0, tpl: 1 }, S0);
      ["nose", "span", "sweep", "tail"].forEach(k => { st[k] = g.clamp(+st[k] || 0, 0, 100); }); st.power = g.clamp(+st.power || 70, 40, 100); st.ang = g.clamp(+st.ang || 15, -10, 40); st.wind = g.clamp(+st.wind || 0, -30, 30); st.deco = ci(st.deco, 4);
      if (!hard) { st.ang = 15; st.wind = 0; } if (!med) st.power = 70;
      let best = +sv.best || 0, mode = "design", T = 0, P = null, windNow = 0;
      const stars = mkStars(1), save = () => g.save({ st, best });
      const bal = () => { const n = st.nose / 100, s = st.span / 100, w = st.sweep / 100, t = st.tail / 100; return n + .3 * w - .4 * s - .3 * t + .25; };
      const ptop = (q, o, big, t) => {
        const hs = 18 + o.span * .6, back = 10 + o.sweep * .55, L = 150;
        // wings
        [-1, 1].forEach(s => sh(q, o.col, q => { q.moveTo(s * 2, -L * .42); q.lineTo(s * hs, -L * .42 + back + 10); q.lineTo(s * hs * .96, -L * .42 + back + 30); q.lineTo(s * 2, L * .3); q.closePath(); }, 4));
        sh(q, o.col, q => { q.moveTo(0, -L * .55); q.lineTo(-9, L * .45); q.lineTo(9, L * .45); q.closePath(); }, 4);
        q.strokeStyle = "rgba(0,0,0,.22)"; q.lineWidth = 2; q.beginPath(); q.moveTo(0, -L * .55); q.lineTo(0, L * .45); q.stroke();
        const tl = 6 + o.tail * .22; [-1, 1].forEach(s => sh(q, o.col2, q => { q.moveTo(s * 6, L * .45); q.lineTo(s * (6 + tl), L * .45 + 6); q.lineTo(s * (6 + tl), L * .45 + 18); q.lineTo(s * 6, L * .45 + 14); q.closePath(); }, 3));
        const clips = Math.round(o.nose / 34); for (let i = 0; i < clips; i++) sh(q, "#9aa6c4", q => q.roundRect(-8, -L * .55 + 12 + i * 9, 16, 6, 2), 2.5);
        q.save(); q.beginPath(); q.moveTo(0, -L * .55); q.lineTo(-hs, -L * .42 + back + 10); q.lineTo(-hs, -L * .42 + back + 30); q.lineTo(0, L * .3); q.lineTo(hs, -L * .42 + back + 30); q.lineTo(hs, -L * .42 + back + 10); q.closePath(); q.clip(); q.fillStyle = o.col2;
        if (o.deco === 1) { q.fillRect(-hs, -10, hs * 2, 12); q.fillRect(-hs, 16, hs * 2, 7); }
        else if (o.deco === 2) [[-hs * .6, 0], [hs * .6, 0], [0, 40]].forEach(p => { q.beginPath(); for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5, r = i % 2 ? 4 : 10; q.lineTo(p[0] + Math.cos(a) * r, p[1] + Math.sin(a) * r); } q.closePath(); q.fill(); });
        else if (o.deco === 3) for (let i = -3; i <= 3; i++) for (let j = 0; j < 3; j++) { q.beginPath(); q.arc(i * 11, -20 + j * 22, 3.2, 0, 7); q.fill(); }
        q.restore();
      };
      const row1 = mkBar(g), row2 = mkBar(g), row3 = mkBar(g), fbar = mkBar(g);
      const refs = [];
      const apply = i => { const t = TPL[i]; st.tpl = i; st.nose = t.nose; st.span = t.span; st.sweep = t.sweep; st.tail = t.tail; save(); };
      let sl = {};
      mkOpts(g, row1, "Plane", TPL.map(t => t.n), () => st.tpl, i => { apply(i); Object.keys(sl).forEach(k => { sl[k].value = st[k]; }); });
      mkLabel(row1, "Paper"); mkSwatches(g, row1, PAL, st.col, k => { st.col = k; save(); });
      mkLabel(row1, "Marks"); mkSwatches(g, row1, PAL, st.col2, k => { st.col2 = k; save(); });
      partRow(g, row2, "Pattern", 4, (q, w, h, i) => { q.translate(w / 2, h / 2 + 4); q.scale(.28, .28); ptop(q, { span: 55, sweep: 35, tail: 30, nose: 0, col: "#ffffff", col2: "#ff5c7a", deco: i }, 1, 0); }, () => st.deco, i => { st.deco = i; save(); });
      if (med) { sl.span = mkSlider(g, row3, "Wings", 0, 100, st.span, v => { st.span = v; st.tpl = -1; save(); }); sl.nose = mkSlider(g, row3, "Nose weight", 0, 100, st.nose, v => { st.nose = v; st.tpl = -1; save(); }); mkSlider(g, row3, "Throw", 40, 100, st.power, v => { st.power = v; save(); }); }
      if (hard) { sl.sweep = mkSlider(g, row3, "Sweep", 0, 100, st.sweep, v => { st.sweep = v; st.tpl = -1; save(); }); sl.tail = mkSlider(g, row3, "Tail", 0, 100, st.tail, v => { st.tail = v; st.tpl = -1; save(); }); mkSlider(g, row3, "Angle", -10, 40, st.ang, v => { st.ang = v; save(); }); mkSlider(g, row3, "Wind", -30, 30, st.wind, v => { st.wind = v; save(); }); }
      const bT = mkBtn(g, row3, "THROW!", () => throwIt()); bT.style.background = "#4cc3ff"; bT.style.fontSize = "18px";
      mkBtn(g, fbar, "Back to design", () => setMode("design")); mkBtn(g, fbar, "Throw again", () => throwIt()); mkEnd(g, fbar, c, "my-plane");
      const setMode = m => { mode = m; [row1, row2, row3].forEach(r => { r.style.display = m === "design" ? "flex" : "none"; }); fbar.style.display = m === "fly" ? "flex" : "none"; };
      setMode("design");
      const throwIt = () => {
        const v0 = 3 + st.power / 100 * 7, a0 = st.ang * PI / 180; windNow = hard ? st.wind / 10 : (med ? 0 : 0);
        P = { x: 0, y: 1.6, vx: v0 * Math.cos(a0), vy: v0 * Math.sin(a0), th: a0 * .8, w: 0, t: 0, done: false, skid: 0, trail: [], b: bal(), msg: "" };
        setMode("fly"); g.sfx("swish");
      };
      const step = h => {
        const sp = st.span / 100, sw = st.sweep / 100, tl = st.tail / 100, b = P.b, aTrim = .08 + (.3 - b) * 1.2, S = .5 + sp * .9, AR = 1 + sp * 5;
        const ax = P.vx - windNow, ay = P.vy, v = Math.max(.5, Math.hypot(ax, ay)), gam = Math.atan2(ay, ax), al = P.th - gam;
        let CL = g.clamp(5.5 * al, -1.3, 1.3); const ab = Math.abs(al); if (ab > .35) CL *= Math.max(.25, 1 - (ab - .35) * 2);
        const Cd = .03 + .03 * sw + CL * CL / (PI * .8 * AR) + (ab > .5 ? .25 : 0), kL = .545 * S, L = kL * CL * v * v, D = kL * Cd * v * v * 1.3;
        const ux = ax / v, uy = ay / v;
        P.vx += (-D * ux - L * uy) * h; P.vy += (-D * uy + L * ux - 9.8) * h;
        P.w += (-(6 + 14 * tl + 6 * sw) * (al - aTrim) - (2 + 3 * tl) * P.w) * h; P.th += P.w * h; P.x += P.vx * h; P.y += P.vy * h;
      };
      const wrapPX = 24;
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt;
        const camX = mode === "fly" && P ? Math.max(0, P.x * wrapPX - W * .35) : 0, gy = H * .82;
        const sk = q.createLinearGradient(0, 0, 0, gy); sk.addColorStop(0, "#5bb8f5"); sk.addColorStop(1, "#dff4ff"); q.fillStyle = sk; q.fillRect(0, 0, W, H);
        dot(q, "#fff6b0", 90, 70, 30);
        for (let i = 0; i < 4; i++) { const cx = ((i * 230 - camX * .1 + T * (6 + windNow * 3)) % 900 + 900) % 900 - 150; q.fillStyle = "rgba(255,255,255,.85)"; [[0, 0, 36], [30, 8, 26], [-30, 8, 26]].forEach(b => { q.beginPath(); q.ellipse(cx + b[0], 70 + i * 28 + b[1], b[2], b[2] * .55, 0, 0, 7); q.fill(); }); }
        q.fillStyle = "#8fd18a"; q.beginPath(); q.moveTo(0, gy); for (let x = 0; x <= W; x += 20) q.lineTo(x, gy - 40 - 24 * Math.sin((x + camX * .3) * .012) - 14 * Math.sin((x + camX * .3) * .03)); q.lineTo(W, gy); q.fill();
        q.fillStyle = "#58b947"; q.fillRect(0, gy, W, H - gy); q.fillStyle = "#4aa63d"; for (let m = Math.floor(camX / (5 * wrapPX)); m * 5 * wrapPX - camX < W + 10; m++) { const x = m * 5 * wrapPX - camX; q.fillRect(x, gy, 3, 14); if (m % 2 === 0 && m > 0) tx(q, (m * 5) + " m", x, gy + 32, "#fff", 13); }
        if (mode === "design" || !P) {
          q.save(); q.translate(W / 2, H * .46 + Math.sin(T * 2) * 4); q.rotate(Math.sin(T * 1.2) * .05); q.scale(1.5, 1.5); ptop(q, st, 1, T); q.restore();
          tx(q, "Fold, decorate and tune your plane, then THROW!", W / 2, 26, "#ffffff", 17);
          const b = bal(); if (med) tx(q, b > .5 ? "Too nose-heavy: it will dive!" : b < .1 ? "Too light at the front: it will stall!" : "Nicely balanced", W / 2, H - 16, b > .5 || b < .1 ? "#c0392b" : "#1b7a35", 15);
          if (best) tx(q, "Best " + best.toFixed(1) + " m", W - 12, 24, "#ffffff", 15, "right"); return;
        }
        if (!P.done) {
          P.t += dt; for (let i = 0; i < 4; i++) step(dt * .8 / 4);
          if (P.y <= 0) { P.y = 0; P.skid += dt; P.vx *= Math.max(0, 1 - 5 * dt); P.vy = 0; P.w = 0; if (P.skid > .05 && P.skid < .1) { fx.burst(P.x * wrapPX - camX, gy, ["#4aa63d", "#fff"], 8, 60); g.sfx("thump"); } if (Math.abs(P.vx) < .3 || P.skid > 1.2) { P.done = true; P.msg = P.x > best ? "New best!" : "Nice flight!"; if (P.x > best) { best = P.x; g.score(Math.round(best * 10) / 10); fx.burst(W / 2, H * .3, ["#ffd34e", "#fff", "#ff5c7a"], 30, 190); g.sfx("cheer"); } else g.sfx("finish"); save(); } }
          if (P.t > 40 || P.x > 400) { P.done = true; P.msg = "Wow, it is still flying!"; }
          if (P.t % .06 < dt) { P.trail.push({ x: P.x, y: P.y }); if (P.trail.length > 60) P.trail.shift(); }
        }
        const sx = P.x * wrapPX - camX, sy = gy - P.y * wrapPX;
        q.strokeStyle = "rgba(255,255,255,.7)"; q.setLineDash([4, 6]); q.lineWidth = 2; q.beginPath(); P.trail.forEach((p, i) => { const tx2 = p.x * wrapPX - camX, ty = gy - p.y * wrapPX; if (i) q.lineTo(tx2, ty); else q.moveTo(tx2, ty); }); q.stroke(); q.setLineDash([]);
        // thrower
        const kx = -camX + 6; q.save(); q.translate(kx, gy); sh(q, "#ff9f43", q => q.roundRect(-9, -34, 18, 24, 5), 3); dot(q, "#ffd1a8", 0, -42, 8); sh(q, "#3d6bff", q => q.roundRect(-8, -12, 16, 12, 3), 3); q.restore();
        q.save(); q.translate(sx, sy - 6); q.rotate(-P.th); const pl = 26;
        sh(q, st.col, q => { q.moveTo(pl, 0); q.lineTo(-pl, -3); q.lineTo(-pl, 5); q.closePath(); }, 3);
        const wsp = 4 + st.span * .12, bk = 4 + st.sweep * .12; sh(q, mixc(st.col, "#8fb4ff", .35), q => { q.moveTo(pl * .5, 0); q.lineTo(-pl * .2 - bk, -wsp - 2); q.lineTo(-pl * .5 - bk * .5, -wsp - 2); q.lineTo(-pl * .6, 2); q.closePath(); }, 2.5);
        sh(q, st.col2, q => { q.moveTo(-pl, 0); q.lineTo(-pl - 4, -4 - st.tail * .1); q.lineTo(-pl + 8, -2); q.closePath(); }, 2.5);
        for (let i = 0, n = Math.round(st.nose / 34); i < n; i++) sh(q, "#9aa6c4", q => q.rect(pl - 12 - i * 5, -1, 3, 6), 2);
        q.restore(); fx.draw(q, dt);
        tx(q, "Distance " + P.x.toFixed(1) + " m", 12, 24, "#ffffff", 18, "left"); tx(q, "Height " + Math.max(0, P.y).toFixed(1) + " m", 12, 46, "#ffffff", 14, "left"); tx(q, "Best " + best.toFixed(1) + " m", W - 12, 24, "#ffffff", 16, "right");
        if (windNow) tx(q, "Wind " + (windNow > 0 ? "-> " : "<- ") + Math.abs(windNow).toFixed(1), W - 12, 46, "#ffffff", 14, "right");
        if (P.done) { tx(q, P.msg, W / 2, H * .25, "#fff", 26); tx(q, "It flew " + P.x.toFixed(1) + " metres!", W / 2, H * .25 + 34, "#ffd34e", 24); tx(q, "Press Back to design and tune it", W / 2, H * .25 + 60, "#ffffff", 14); }
      });
    }
  });

  // ---------------------------------------------------------------- Boat Builder
  B.add({
    id: "s15-boat", name: "Boat Builder", ages: [5, 15], cat: "Build", color: "#3ec1ff", icon: "Bo",
    desc: "Design a boat or ship, then sail it over the waves. Calm sea or a big storm?",
    controls: "Pick hull, sails and extras, press Sail! Tap or press Space for a gust of wind",
    start(g) {
      const { c, x: q, W, H } = g.canvas(600, 380), fx = mkFx();
      const hard = g.diff === 2, med = g.diff >= 1, nH = g.by(3, 4, 5), nR = g.by(3, 4, 5), nE = g.by(3, 4, 5), PX = 14;
      const HW = [1, 1.1, 2, 1, 1.4], HD = [1, .8, 1.5, .6, 1.1], RA = [1, 1.5, 1.3, 0, 2], SEA = ["Calm", "Waves", "Storm"];
      const sv = ld(g), S0 = sv.st || {};
      let st = Object.assign({ hull: 1, rig: 0, ext: 1, col: "#ff5c7a", col2: "#ffffff", sail: "#ffffff", ballast: 30, size: 100, sea: 0 }, S0);
      st.hull = ci(st.hull, nH); st.rig = ci(st.rig, nR); st.ext = ci(st.ext, nE); st.sea = ci(st.sea, 3); st.ballast = g.clamp(+st.ballast || 0, 0, 100); st.size = g.clamp(+st.size || 100, 60, 140); if (!hard) { st.ballast = 30; st.size = 100; }
      let best = +sv.best || 0, mode = "design", T = 0, D = 0, v = 0, gust = 0, flash = 0, rainX = 0;
      const save = () => g.save({ st, best });
      const hullP = (q, i) => {
        if (i === 0) { q.moveTo(-44, -12); q.lineTo(44, -12); q.quadraticCurveTo(34, 16, 0, 16); q.quadraticCurveTo(-34, 16, -44, -12); }
        else if (i === 1) { q.moveTo(-50, -10); q.lineTo(54, -14); q.quadraticCurveTo(30, 18, -30, 16); q.quadraticCurveTo(-46, 12, -50, -10); }
        else if (i === 2) { q.moveTo(-56, -14); q.lineTo(56, -14); q.lineTo(46, 16); q.lineTo(-46, 16); }
        else if (i === 3) { q.moveTo(-50, -10); q.lineTo(40, -10); q.lineTo(64, -20); q.lineTo(30, 14); q.lineTo(-44, 14); }
        else { q.moveTo(-58, -28); q.quadraticCurveTo(-48, -6, -36, -8); q.lineTo(36, -8); q.quadraticCurveTo(48, -6, 58, -28); q.quadraticCurveTo(54, 10, 20, 16); q.lineTo(-20, 16); q.quadraticCurveTo(-54, 10, -58, -28); }
        q.closePath();
      };
      const boatD = (q, o, t) => {
        const fl = Math.sin(t * 3) * 3, sz = o.size / 100, dk = o.hull === 4 ? -8 : -12;
        q.save(); q.translate(0, dk); q.scale(sz, sz);
        if (o.rig !== 3) ln(q, "#8b5a2b", 4, q => { q.moveTo(0, 0); q.lineTo(0, -78); });
        if (o.rig === 0 || o.rig === 1) { sh(q, o.sail, q => { q.moveTo(-2, -74); q.quadraticCurveTo(-30 + fl, -40, -42, -4); q.lineTo(-2, -4); q.closePath(); }, 4); }
        if (o.rig === 1) sh(q, o.col2, q => { q.moveTo(3, -70); q.quadraticCurveTo(34 + fl, -36, 48, -4); q.lineTo(3, -4); q.closePath(); }, 4);
        if (o.rig === 2) { sh(q, o.sail, q => { q.moveTo(-28, -68); q.lineTo(28, -68); q.quadraticCurveTo(36 + fl, -36, 28, -8); q.quadraticCurveTo(0, -2 + fl, -28, -8); q.quadraticCurveTo(-36 + fl, -36, -28, -68); }, 4); q.fillStyle = o.col2; q.fillRect(-30, -46, 60, 9); ln(q, "#8b5a2b", 3, q => { q.moveTo(-32, -68); q.lineTo(32, -68); }); }
        if (o.rig === 3) { sh(q, "#e8d8b0", q => q.roundRect(-30, -20, 50, 20, 4), 4); sh(q, "#c0392b", q => q.roundRect(-6, -52, 16, 36, 3), 4); q.fillStyle = o.col2; q.fillRect(-6, -42, 16, 7); for (let k = 0; k < 4; k++) { q.globalAlpha = .6 - k * .12; dot(q, "#f2f4f8", 2 - ((t * 14 + k * 12) % 48), -58 - ((t * 22 + k * 15) % 55), 5 + k * 2); } q.globalAlpha = 1; }
        if (o.rig === 4) { sh(q, o.sail, q => { q.moveTo(-2, -78); q.bezierCurveTo(64 + fl, -74, 70 + fl, -30, 52, -4); q.lineTo(-2, -4); q.closePath(); }, 4); [-56, -36, -16].forEach((y, i) => { q.save(); q.beginPath(); q.moveTo(-2, -78); q.bezierCurveTo(64 + fl, -74, 70 + fl, -30, 52, -4); q.lineTo(-2, -4); q.closePath(); q.clip(); q.fillStyle = o.col2; q.fillRect(0, y, 80, 10); q.restore(); }); }
        q.restore();
        sh(q, o.col, q => hullP(q, o.hull), 6); q.save(); q.beginPath(); hullP(q, o.hull); q.clip(); q.fillStyle = o.col2; q.fillRect(-70, 2, 140, 5); q.restore();
        for (let k = -1; k <= 1; k++) dot(q, "#9fe6ff", k * 16, -1, 3);
        if (o.ext === 1) { sh(q, "#e8d8b0", q => q.roundRect(-40, -26, 30, 18, 4), 4); dot(q, "#9fe6ff", -25, -17, 4.5); }
        else if (o.ext === 2) { ln(q, "#8b5a2b", 3, q => { q.moveTo(-46, -10); q.lineTo(-46, -42); }); sh(q, o.col2, q => { q.moveTo(-46, -42); q.lineTo(-46 + 22, -37 + fl * .4); q.lineTo(-46, -30); q.closePath(); }, 3); }
        else if (o.ext === 3) { const gg = q.createRadialGradient(44, -14, 1, 44, -14, 22); gg.addColorStop(0, "rgba(255,240,150,.9)"); gg.addColorStop(1, "rgba(255,240,150,0)"); q.fillStyle = gg; q.fillRect(20, -38, 50, 50); sh(q, "#ffd93d", q => q.roundRect(40, -20, 8, 10, 2), 3); }
        else if (o.ext === 4) { [[-46, -20], [-30, -20], [-38, -34]].forEach(p => sh(q, "#b07a3a", q => q.roundRect(p[0], p[1], 16, 14, 2), 3)); }
        sh(q, "#2f7bd0", q => q.roundRect(14, -26, 10, 14, 3), 3); dot(q, "#ffd1a8", 19, -31, 5); sh(q, "#fff", q => q.roundRect(14, -38, 10, 5, 2), 2.5);
      };
      const hist = null;
      const row1 = mkBar(g), row2 = mkBar(g), fbar = mkBar(g);
      const th = kind => (q, w, h, i) => { const o = Object.assign({}, st, { col: "#ff6b8a", col2: "#ffffff", sail: "#ffffff", size: 100, hull: kind === "hull" ? i : 1, rig: kind === "rig" ? i : 0, ext: kind === "ext" ? i : 0 }); q.translate(w / 2, h * .74); q.scale(.34, .34); boatD(q, o, 0); };
      partRow(g, row1, "Hull", nH, th("hull"), () => st.hull, i => { st.hull = i; save(); });
      partRow(g, row1, "Sails", nR, th("rig"), () => st.rig, i => { st.rig = i; save(); });
      partRow(g, row1, "Extras", nE, th("ext"), () => st.ext, i => { st.ext = i; save(); });
      mkLabel(row2, "Hull"); mkSwatches(g, row2, PAL, st.col, k => { st.col = k; save(); });
      mkLabel(row2, "Sail"); mkSwatches(g, row2, PAL, st.sail, k => { st.sail = k; save(); });
      mkLabel(row2, "Trim"); mkSwatches(g, row2, PAL, st.col2, k => { st.col2 = k; save(); });
      mkOpts(g, row2, "Sea", SEA, () => st.sea, i => { st.sea = i; save(); });
      if (hard) { mkSlider(g, row2, "Sail size", 60, 140, st.size, v2 => { st.size = v2; save(); }); mkSlider(g, row2, "Ballast", 0, 100, st.ballast, v2 => { st.ballast = v2; save(); }); }
      const bS = mkBtn(g, row2, "SAIL!", () => { setMode("sail"); D = 0; v = 0; g.sfx("launch"); }); bS.style.background = "#3ec1ff"; bS.style.fontSize = "18px";
      mkBtn(g, fbar, "Back to design", () => setMode("design")); mkBtn(g, fbar, "Gust of wind", () => puff());
      const bSea = mkBtn(g, fbar, "Sea: " + SEA[st.sea], () => { st.sea = (st.sea + 1) % 3; bSea.textContent = "Sea: " + SEA[st.sea]; save(); }); mkEnd(g, fbar, c, "my-boat");
      const setMode = m => { mode = m; row1.style.display = row2.style.display = m === "design" ? "flex" : "none"; fbar.style.display = m === "sail" ? "flex" : "none"; if (m === "sail") bSea.textContent = "Sea: " + SEA[st.sea]; };
      setMode("design");
      const puff = () => { gust = 1.3; g.sfx("swish"); fx.burst(W * .2, H * .4, ["#fff", "#cfe9ff"], 10, 80); };
      g.on(window, "keydown", e => { if (e.key === " " && mode === "sail") { e.preventDefault(); puff(); } });
      g.on(c, "pointerdown", () => { if (mode === "sail") puff(); });
      const wv = (wx, t) => { const A = [5, 14, 28][st.sea]; return Math.sin(wx * .022 - t * 1.6) * A + Math.sin(wx * .05 - t * 2.3 + 1) * A * .35; };
      const clouds = Array.from({ length: 5 }, (_, i) => ({ x: i * 180, y: 40 + (i * 37) % 90, s: .7 + (i % 3) * .3 }));
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt; gust = Math.max(0, gust - dt);
        const sea = st.sea, base = H * .66, bx = mode === "sail" ? W * .36 : W * .5;
        // performance
        const A = RA[st.rig] * (hard ? st.size / 100 : 1), w = HW[st.hull] + (st.ext === 4 ? .8 : 0) + (hard ? st.ballast / 100 : 0), wind = 1 + .25 * Math.sin(T * .3) + (hard ? .3 * Math.sin(T * 1.1) : 0) + (gust > 0 ? .6 : 0);
        const vt = (A * wind + (st.rig === 3 ? 1.2 : 0)) * 7 / (HD[st.hull] * (1 + w * .35)) * ([1, .93, .78][sea] + w * .03);
        if (mode === "sail") { v += (vt - v) * Math.min(1, dt * 1.2); D += v * dt; if (D > best) { best = D; g.score(Math.round(best)); } }
        const off = D * PX, k = sea / 2;
        // sky
        const sk = q.createLinearGradient(0, 0, 0, base); sk.addColorStop(0, mixc("#5bb8f5", "#3d4658", k)); sk.addColorStop(1, mixc("#dff4ff", "#8d97a8", k)); q.fillStyle = sk; q.fillRect(0, 0, W, H);
        if (sea < 2) dot(q, "#fff6b0", W * .82, 64, 30);
        clouds.forEach(cl => { const cx = ((cl.x - off * .05 + T * 3) % (W + 200) + W + 200) % (W + 200) - 100; q.fillStyle = sea === 2 ? "rgba(70,78,96,.9)" : "rgba(255,255,255,.85)"; [[0, 0, 34], [30, 8, 24], [-30, 8, 24]].forEach(b2 => { q.beginPath(); q.ellipse(cx + b2[0] * cl.s, cl.y + b2[1] * cl.s, b2[2] * cl.s, b2[2] * .55 * cl.s, 0, 0, 7); q.fill(); }); });
        for (let i = Math.floor(off * .25 / 520) - 1; i < Math.floor(off * .25 / 520) + 3; i++) { const ix = i * 520 + 200 - off * .25; q.fillStyle = "#e8d08a"; q.beginPath(); q.ellipse(ix, base - 6, 70, 12, 0, 0, 7); q.fill(); [-1, 1].forEach((s, j) => { ln(q, "#8b5a2b", 4, q => { q.moveTo(ix + s * 18, base - 10); q.quadraticCurveTo(ix + s * 22, base - 38, ix + s * 12, base - 56 - j * 6); }); [-1, 0, 1].forEach(l => ln(q, "#3fa34d", 5, q => { q.moveTo(ix + s * 12, base - 56 - j * 6); q.lineTo(ix + s * 12 + l * 20, base - 48 - j * 6 + Math.abs(l) * 4); })); }); }
        for (let b3 = 0; b3 < 3; b3++) { const bx2 = ((b3 * 190 + T * 18 + 40) % 700) - 50, by = 70 + b3 * 22 + Math.sin(T * 2 + b3) * 6, fw = Math.sin(T * 8 + b3) * 5; q.strokeStyle = "#fff"; q.lineWidth = 2.5; q.beginPath(); q.moveTo(bx2 - 9, by - fw); q.quadraticCurveTo(bx2 - 4, by - 6, bx2, by); q.quadraticCurveTo(bx2 + 4, by - 6, bx2 + 9, by - fw); q.stroke(); }
        // water back
        const wo = off + T * 24;
        q.beginPath(); q.moveTo(0, H); for (let x = 0; x <= W; x += 8) q.lineTo(x, base - 8 + wv(x + wo + 90, T * 1.1) * .7); q.lineTo(W, H); q.closePath(); q.fillStyle = mixc("#7fd4ff", "#3a5a78", k); q.fill();
        // buoys
        const m0 = Math.floor(off / (50 * PX));
        for (let m = m0; m < m0 + 3; m++) { const x = m * 50 * PX - off + bx; if (x < -30 || x > W + 30) continue; q.save(); q.translate(x, base - 2 + wv(x + wo, T) * .9); sh(q, "#ff5c5c", q => q.roundRect(-8, -18, 16, 20, 6), 3); q.fillStyle = "#fff"; q.fillRect(-8, -10, 16, 5); if (m > 0) tx(q, (m * 50) + "m", 0, -24, "#fff", 12); q.restore(); }
        // boat
        const by2 = base + wv(bx + wo, T), ang = Math.atan2(wv(bx + 8 + wo, T) - wv(bx - 8 + wo, T), 16) * .8, draft = 2 + w * 4, heel = mode === "sail" ? g.clamp(A * wind * .5 / (.4 + (hard ? st.ballast / 100 : .6)), 0, 1.2) * .1 : 0;
        q.save(); q.translate(bx, by2 + draft); q.rotate(ang + heel + Math.sin(T * 1.7) * .02); if (mode !== "sail") q.scale(1.25, 1.25); boatD(q, st, T); q.restore();
        // water front
        q.beginPath(); q.moveTo(0, H); for (let x = 0; x <= W; x += 8) q.lineTo(x, base + 6 + wv(x + wo, T)); q.lineTo(W, H); q.closePath(); const wg = q.createLinearGradient(0, base - 30, 0, H); wg.addColorStop(0, mixc("#3ec1ff", "#2a4a66", k)); wg.addColorStop(1, mixc("#0d5fb8", "#0b2238", k)); q.fillStyle = wg; q.globalAlpha = .9; q.fill(); q.globalAlpha = 1;
        q.strokeStyle = "rgba(255,255,255,.75)"; q.lineWidth = 3; q.beginPath(); for (let x = 0; x <= W; x += 8) { const y = base + 6 + wv(x + wo, T); if (x) q.lineTo(x, y); else q.moveTo(x, y); } q.stroke();
        if (mode === "sail" && Math.random() < dt * (6 + v * 2)) fx.burst(bx + 50, by2 + 8, ["#fff", "#bfe6ff"], 3, 60);
        fx.draw(q, dt);
        if (sea === 2) { q.strokeStyle = "rgba(200,220,255,.5)"; q.lineWidth = 1.5; q.beginPath(); for (let i = 0; i < 50; i++) { const rx = (i * 61 + T * 140) % (W + 40), ry = (i * 97 + T * 520) % H; q.moveTo(rx, ry); q.lineTo(rx - 6, ry + 14); } q.stroke(); if (Math.random() < dt * .25) { flash = 1; g.sfx("rumble"); } }
        if (flash > 0) { q.fillStyle = "rgba(255,255,255," + flash * .6 + ")"; q.fillRect(0, 0, W, H); flash -= dt * 3; }
        if (mode === "sail") { tx(q, "Distance " + Math.round(D) + " m", 12, 26, "#fff", 18, "left"); tx(q, "Speed " + (v * 1.9).toFixed(1) + " knots", 12, 48, "#fff", 14, "left"); tx(q, "Best " + Math.round(best) + " m", W - 12, 26, "#ffd34e", 16, "right"); if (D < 8) tx(q, "Tap for a gust of wind!", W / 2, H - 14, "#fff", 15); }
        else { tx(q, "Design your boat, then press SAIL!", W / 2, 28, "#ffffff", 18); if (hard) tx(q, "Weight " + w.toFixed(1) + "   Sail power " + A.toFixed(1), 12, H - 12, "#fff", 14, "left"); if (best) tx(q, "Best " + Math.round(best) + " m", W - 12, H - 12, "#ffd34e", 15, "right"); }
      });
    }
  });

  // ---------------------------------------------------------------- Submarine Builder
  B.add({
    id: "s15-sub", name: "Submarine Builder", ages: [5, 16], cat: "Build", color: "#2fb5c9", icon: "Su",
    desc: "Build a submarine, dive down through the sea and take photos of the creatures you meet.",
    controls: "Move the mouse (or hold your finger) to steer. Camera button or Space takes a photo",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(600, 420), fx = mkFx();
      const hard = g.diff === 2, med = g.diff >= 1, MAXD = g.by(250, 600, 1100), PXM = 4, SURF = 60, WH = SURF + MAXD * PXM + 80;
      const NAMES = ["Clownfish", "Turtle", "Dolphin", "Jellyfish", "Manta ray", "Seahorse", "Whale", "Squid", "Octopus", "Shipwreck", "Anglerfish", "Glow fish"];
      const RANGE = [[5, 60], [10, 90], [5, 70], [60, 220], [80, 250], [40, 150], [150, 400], [250, 550], [300, 700], [420, 520], [600, 950], [650, 1050]];
      const nSp = g.by(6, 10, 12), sv = ld(g), S0 = sv.st || {};
      let st = Object.assign({ hull: 0, tower: 1, prop: 0, win: 2, ext: 0, col: "#ffd93d", col2: "#ff5c7a", rating: 600 }, S0);
      st.hull = ci(st.hull, 4); st.tower = ci(st.tower, 3); st.prop = ci(st.prop, 3); st.win = ci(st.win, 3); st.ext = ci(st.ext, med ? 4 : 1); st.rating = g.clamp(+st.rating || 600, 150, 1200);
      let album = Array.isArray(sv.album) ? sv.album.filter(i => i < nSp) : [], mode = "design", T = 0, best = +sv.best || 0, maxDepth = 0, flash = 0, msg = "", msgT = 0, cam = 0, steer = { x: 0, y: 0, on: false }, keyS = { x: 0, y: 0 };
      const sub = { x: W / 2, y: SURF - 10, vx: 0, vy: 0, dir: 1 }, save = () => g.save({ st, album, best });
      const cre = []; const mkCre = () => {
        cre.length = 0;
        for (let id = 0; id < nSp; id++) for (let k = 0; k < (id === 9 ? 1 : (g.diff ? 2 : 1)); k++) { const r = RANGE[id], d = Math.min(MAXD - 20, g.rf(r[0], r[1])); cre.push({ id, x: g.rf(40, W - 40), y: SURF + d * PXM, vx: id === 9 ? 0 : g.rf(14, 34) * (Math.random() < .5 ? -1 : 1), ph: Math.random() * 6, s: [1, 1.1, 1.4, 1, 1.4, 1, 2.2, 1.4, 1.2, 1.6, 1.3, .8][id] }); }
      };
      const snow = Array.from({ length: 50 }, () => ({ x: Math.random() * W, y: Math.random() * WH, s: .5 + Math.random() }));
      const crD = (q, id, t, gl) => {
        const w = Math.sin(t * 4);
        if (id === 0) { q.save(); q.beginPath(); q.ellipse(0, 0, 16, 10, 0, 0, 7); q.clip(); q.fillStyle = "#ff8a2b"; q.fillRect(-20, -12, 40, 24); q.fillStyle = "#fff"; q.fillRect(-6, -12, 5, 24); q.fillRect(6, -12, 4, 24); q.restore(); sh(q, "rgba(0,0,0,0)", q => q.ellipse(0, 0, 16, 10, 0, 0, 7), 3); sh(q, "#ff8a2b", q => { q.moveTo(-14, 0); q.lineTo(-26, -8 + w * 3); q.lineTo(-26, 8 + w * 3); q.closePath(); }, 3); dot(q, "#fff", 9, -3, 3); dot(q, OUT, 10, -3, 1.5); }
        else if (id === 1) { [-1, 1].forEach(s => sh(q, "#6bb86b", q => q.ellipse(s * 8, s * 13 + w * s * 2, 8, 4, s * .5, 0, 7), 3)); sh(q, "#7acb7a", q => q.ellipse(24, -2, 7, 6, 0, 0, 7), 3); dot(q, OUT, 27, -4, 1.5); sh(q, "#4f9d55", q => q.ellipse(0, 0, 20, 13, 0, PI, 0), 4); q.strokeStyle = "rgba(0,0,0,.25)"; q.lineWidth = 2; q.beginPath(); q.moveTo(-10, -2); q.lineTo(-4, -12); q.moveTo(4, -2); q.lineTo(2, -12); q.stroke(); }
        else if (id === 2) { sh(q, "#7a9cc0", q => { q.moveTo(-30, 0); q.quadraticCurveTo(-10, -16, 14, -9); q.lineTo(34, -5); q.lineTo(14, 2); q.quadraticCurveTo(-8, 14, -30, 0); }, 4); sh(q, "#7a9cc0", q => { q.moveTo(-30, 0); q.lineTo(-42, -10 + w * 4); q.lineTo(-38, 2); q.lineTo(-42, 12 + w * 4); q.closePath(); }, 3); sh(q, "#6a8cb0", q => { q.moveTo(-6, -12); q.lineTo(-14, -22); q.lineTo(0, -12); q.closePath(); }, 3); dot(q, OUT, 14, -5, 1.8); }
        else if (id === 3) { const hp = 1 + w * .06; sh(q, "rgba(255,150,200,.85)", q => q.ellipse(0, 0, 16 * hp, 13, 0, PI, 0), 3); for (let k = -2; k <= 2; k++) ln(q, "rgba(255,170,210,.9)", 2.5, q => { q.moveTo(k * 6, 0); for (let j = 1; j <= 5; j++) q.lineTo(k * 6 + Math.sin(t * 3 + j + k) * 4, j * 6); }); if (gl) gl.push([0, 0, 20, "255,160,220"]); }
        else if (id === 4) { sh(q, "#5a6a96", q => { q.moveTo(24, 0); q.quadraticCurveTo(6, -20 - w * 6, -20, -26 - w * 8); q.quadraticCurveTo(-8, 0, -20, 26 + w * 8); q.quadraticCurveTo(6, 20 + w * 6, 24, 0); }, 4); ln(q, "#5a6a96", 3, q => { q.moveTo(-8, 0); q.lineTo(-44, 4 + w * 3); }); dot(q, "#fff", 14, -4, 2.5); dot(q, "#fff", 14, 4, 2.5); }
        else if (id === 5) { ln(q, "#ffc83d", 8, q => { q.moveTo(0, -16); q.quadraticCurveTo(10, -2, 2, 8); q.quadraticCurveTo(-8, 16, -2, 22 + w); }); sh(q, "#ffc83d", q => q.ellipse(2, -20, 8, 6, .3, 0, 7), 3); ln(q, "#ffc83d", 4, q => { q.moveTo(8, -20); q.lineTo(18, -18); }); dot(q, OUT, 3, -22, 1.6); }
        else if (id === 6) { sh(q, "#4a78b0", q => { q.moveTo(-44, 0); q.quadraticCurveTo(-10, -30, 36, -14); q.quadraticCurveTo(54, -2, 40, 12); q.quadraticCurveTo(-8, 24, -44, 0); }, 5); sh(q, "#cfe0f0", q => { q.moveTo(-10, 12); q.quadraticCurveTo(24, 20, 40, 10); q.quadraticCurveTo(10, 6, -10, 12); }, 2); sh(q, "#4a78b0", q => { q.moveTo(-42, 0); q.lineTo(-60, -16 + w * 5); q.lineTo(-54, 0); q.lineTo(-60, 16 + w * 5); q.closePath(); }, 4); dot(q, "#fff", 28, -4, 3.5); dot(q, OUT, 29, -4, 1.8); }
        else if (id === 7) { sh(q, "#d65a6e", q => { q.moveTo(26, 0); q.quadraticCurveTo(0, -14, -16, -8); q.lineTo(-16, 8); q.quadraticCurveTo(0, 14, 26, 0); }, 4); for (let k = -2; k <= 2; k++) ln(q, "#d65a6e", 3, q => { q.moveTo(-16, k * 3); for (let j = 1; j <= 4; j++) q.lineTo(-16 - j * 7, k * 5 + Math.sin(t * 4 + j + k) * 3); }); dot(q, "#fff", 8, -4, 3); dot(q, OUT, 9, -4, 1.5); }
        else if (id === 8) { sh(q, "#9a5ec8", q => q.arc(0, -4, 16, 0, 7), 4); for (let k = 0; k < 6; k++) ln(q, "#9a5ec8", 4, q => { q.moveTo(-12 + k * 5, 8); for (let j = 1; j <= 4; j++) q.lineTo(-14 + k * 5.6 + Math.sin(t * 3 + j + k) * 4, 8 + j * 6); }); dot(q, "#fff", -5, -6, 4); dot(q, "#fff", 6, -6, 4); dot(q, OUT, -5, -6, 2); dot(q, OUT, 6, -6, 2); }
        else if (id === 9) { q.save(); q.rotate(.18); sh(q, "#7a5632", q => { q.moveTo(-54, -10); q.lineTo(54, -22); q.lineTo(40, 14); q.lineTo(-40, 18); q.closePath(); }, 5); ln(q, "#5a3d1e", 5, q => { q.moveTo(0, -16); q.lineTo(-8, -64); }); ln(q, "#5a3d1e", 4, q => { q.moveTo(-8, -50); q.lineTo(20, -54); }); [-30, -10, 12, 32].forEach(x => dot(q, "#2b3245", x, -2, 4)); q.restore(); }
        else if (id === 10) { sh(q, "#2b2442", q => q.ellipse(0, 0, 22, 16, 0, 0, 7), 4); sh(q, "#2b2442", q => { q.moveTo(-18, 0); q.lineTo(-34, -10 + w * 3); q.lineTo(-34, 10 + w * 3); q.closePath(); }, 3); ln(q, "#2b2442", 2.5, q => { q.moveTo(10, -14); q.quadraticCurveTo(20, -32, 34, -26); }); sh(q, "#fff", q => { q.moveTo(8, 6); q.lineTo(14, 12); q.lineTo(18, 5); q.lineTo(24, 11); q.lineTo(26, 3); }, 2); dot(q, "#ffe35c", 10, -2, 4); dot(q, OUT, 11, -2, 1.8); if (gl) gl.push([34, -26, 26, "255,230,90"]); }
        else { sh(q, "#38d6e8", q => { q.moveTo(-10, 0); q.lineTo(-18, -7 + w * 2); q.lineTo(-18, 7 + w * 2); q.closePath(); }, 2.5); sh(q, "#38d6e8", q => q.ellipse(0, 0, 11, 7, 0, 0, 7), 2.5); dot(q, "#fff", 5, -2, 2); dot(q, "#b6fff6", -2, 3, 1.4); if (gl) gl.push([0, 0, 24, "90,255,240"]); }
      };
      const subD = (q, o, t, mv) => {
        const hx = [[34, 17], [20, 20], [38, 13], [26, 14]][o.hull];
        if (o.tower === 1) { ln(q, "#aab4cc", 4, q => { q.moveTo(0, -hx[1] + 4); q.lineTo(0, -hx[1] - 14); q.lineTo(8, -hx[1] - 14); }); }
        else if (o.tower === 2) sh(q, o.col, q => q.roundRect(-9, -hx[1] - 12, 18, 18, 5), 4);
        if (o.ext === 3) { ln(q, "#aab4cc", 3, q => { q.moveTo(0, hx[1] - 4); q.lineTo(0, hx[1] + 4); }); sh(q, "#fff", q => q.roundRect(-6, hx[1] + 2, 12, 9, 3), 3); dot(q, "#3ec1ff", 0, hx[1] + 6, 2.5); }
        q.save(); q.translate(-hx[0], 0); q.rotate(t * (mv ? 18 : 6)); [0, 1, 2].forEach(k => { if (o.prop === 0 || (o.prop === 1 && k < 2) || o.prop === 2) { q.save(); q.rotate(k * (o.prop === 1 ? PI : PI2 / 3)); sh(q, "#8a93a8", q => q.ellipse(0, -9, 3.5, 9, 0, 0, 7), 2.5); q.restore(); } }); q.restore();
        sh(q, o.col, q => { if (o.hull === 0) q.ellipse(0, 0, hx[0], hx[1], 0, 0, 7); else if (o.hull === 1) q.arc(0, 0, hx[0], 0, 7); else if (o.hull === 2) q.roundRect(-hx[0], -hx[1], hx[0] * 2, hx[1] * 2, hx[1]); else q.ellipse(0, 0, hx[0], hx[1], 0, 0, 7); }, 5);
        q.save(); q.beginPath(); if (o.hull === 1) q.arc(0, 0, hx[0], 0, 7); else q.ellipse(0, 0, hx[0], hx[1], 0, 0, 7); q.clip(); q.fillStyle = o.col2; q.fillRect(-hx[0], hx[1] * .35, hx[0] * 2, hx[1] * .3); q.restore();
        const wn = o.hull === 1 ? 1 : o.win + 1; for (let k = 0; k < wn; k++) { const wx = wn === 1 ? 4 : -10 + k * (22 / Math.max(1, wn - 1)) * 1.2 + 4; sh(q, "#9fe6ff", q => q.arc(wx, -2, 6, 0, 7), 3); dot(q, "rgba(255,255,255,.7)", wx - 2, -4, 1.8); }
        if (o.ext === 1) { sh(q, "#ffe35c", q => q.roundRect(hx[0] - 6, -3, 9, 7, 2), 3); }
        else if (o.ext === 2) { ln(q, "#aab4cc", 4, q => { q.moveTo(hx[0] - 6, 8); q.lineTo(hx[0] + 8, 14); }); sh(q, "#ff9f43", q => { q.moveTo(hx[0] + 8, 14); q.lineTo(hx[0] + 16, 8 + Math.sin(t * 3) * 3); q.lineTo(hx[0] + 14, 18); q.closePath(); }, 2.5); }
      };
      const row1 = mkBar(g), row2 = mkBar(g), fbar = mkBar(g);
      const th = kind => (q, w, h, i) => { const o = Object.assign({}, st, { col: "#ffd93d", col2: "#ff5c7a", hull: kind === "hull" ? i : 0, tower: kind === "tower" ? i : 1, prop: kind === "prop" ? i : 0, ext: kind === "ext" ? i : 0, win: 2 }); q.translate(w / 2 + 1, h / 2 + 2); q.scale(.55, .55); subD(q, o, 0, false); };
      partRow(g, row1, "Hull", 4, th("hull"), () => st.hull, i => { st.hull = i; save(); });
      partRow(g, row1, "Tower", 3, th("tower"), () => st.tower, i => { st.tower = i; save(); });
      partRow(g, row1, "Propeller", 3, th("prop"), () => st.prop, i => { st.prop = i; save(); });
      if (med) partRow(g, row1, "Extra", 4, th("ext"), () => st.ext, i => { st.ext = i; save(); });
      mkOpts(g, row2, "Windows", ["1", "2", "3"], () => st.win, i => { st.win = i; save(); });
      mkLabel(row2, "Colour"); mkSwatches(g, row2, PAL, st.col, k => { st.col = k; save(); });
      mkLabel(row2, "Stripe"); mkSwatches(g, row2, PAL, st.col2, k => { st.col2 = k; save(); });
      if (hard) mkSlider(g, row2, "Hull strength", 150, 1200, st.rating, v => { st.rating = v; save(); });
      const bD = mkBtn(g, row2, "DIVE!", () => { mkCre(); mode = "dive"; sub.x = W / 2; sub.y = SURF - 10; sub.vx = sub.vy = 0; maxDepth = 0; setUI(); g.sfx("splash"); }); bD.style.background = "#2fb5c9"; bD.style.fontSize = "18px";
      const bP = mkBtn(g, fbar, "Photo!", () => photo()); mkBtn(g, fbar, "Back to design", () => { mode = "design"; setUI(); }); mkEnd(g, fbar, c, "my-submarine");
      const setUI = () => { row1.style.display = row2.style.display = mode === "design" ? "flex" : "none"; fbar.style.display = mode === "dive" ? "flex" : "none"; };
      setUI(); mkCre();
      const photo = () => {
        flash = 1; g.sfx("click"); let got = null, seen = false;
        cre.forEach(o => { const sx = o.x - sub.x, sy = o.y - sub.y; if (Math.abs(sx) < 190 && Math.abs(sy) < 140) { seen = true; if (!album.includes(o.id) && !got) got = o.id; } });
        if (got !== null) { album.push(got); save(); g.sfx("star"); msg = "Photo! You found the " + NAMES[got] + "!"; msgT = 3; fx.burst(W / 2, H / 2, ["#ffd34e", "#fff"], 20, 160); }
        else { msg = seen ? "Already in your album" : "Nothing to photograph here"; msgT = 2; }
      };
      const setSt = e => { const p = pos(e); steer.x = p.x; steer.y = p.y; };
      g.on(c, "pointermove", e => { if (e.pointerType === "mouse" || steer.on) { steer.on = true; setSt(e); } });
      g.on(c, "pointerdown", e => { steer.on = true; setSt(e); });
      g.on(c, "pointerup", e => { if (e.pointerType !== "mouse") steer.on = false; }); g.on(c, "pointerleave", () => { steer.on = false; });
      g.on(window, "keydown", e => { if (e.key === " " && mode === "dive") { e.preventDefault(); photo(); } });
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt;
        const spd = hard ? 130 - st.rating * .04 : 130;
        if (mode === "dive") {
          const kx = (g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0), ky = (g.keys.ArrowDown ? 1 : 0) - (g.keys.ArrowUp ? 1 : 0);
          let tvx = 0, tvy = 0;
          if (kx || ky) { tvx = kx * spd; tvy = ky * spd; steer.on = false; } else if (steer.on) { const dx = steer.x - sub.x, dy = steer.y + cam - sub.y; tvx = g.clamp(dx * 2.5, -spd, spd); tvy = g.clamp(dy * 2.5, -spd, spd); if (Math.hypot(dx, dy) < 6) { tvx = 0; tvy = 0; } }
          sub.vx += (tvx - sub.vx) * Math.min(1, dt * 4); sub.vy += (tvy - sub.vy) * Math.min(1, dt * 4); sub.x = g.clamp(sub.x + sub.vx * dt, 40, W - 40); sub.y += sub.vy * dt;
          if (Math.abs(sub.vx) > 8) sub.dir = Math.sign(sub.vx);
          const lim = hard ? Math.min(MAXD, st.rating) : MAXD; if (sub.y > SURF + lim * PXM) { sub.y = SURF + lim * PXM; sub.vy = -30; if (T % 1.5 < dt) { msg = hard && lim < MAXD ? "Hull creaking! This is as deep as your sub can go." : "You touched the sea floor!"; msgT = 2.5; g.sfx("rumble"); } }
          if (sub.y < SURF - 14) { sub.y = SURF - 14; if (sub.vy < 0) sub.vy = 0; }
          const dep = Math.max(0, (sub.y - SURF) / PXM); if (dep > maxDepth) maxDepth = dep;
          if (Math.random() < dt * 6) fx.burst(sub.x - sub.dir * 40, sub.y - cam, ["rgba(255,255,255,.7)"], 1, 20);
          cre.forEach(o => { if (o.vx) { o.x += o.vx * dt; if (o.x < -60) o.x = W + 60; if (o.x > W + 60) o.x = -60; } o.ph += dt; });
          const sc = Math.floor(album.length * 25 + maxDepth / 10); g.score(sc); if (sc > best) { best = sc; save(); }
        }
        const subY = mode === "dive" ? sub.y : SURF - 10; const tc = g.clamp(subY - H * .42, 0, WH - H); cam += (tc - cam) * Math.min(1, dt * 5); if (mode !== "dive") cam = 0;
        const d0 = Math.max(0, (cam - SURF) / PXM), d1 = Math.max(0, (cam + H - SURF) / PXM), cf = d => g.clamp(d / 700, 0, 1);
        const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, mixc("#4cc3ff", "#02081a", cf(d0))); gr.addColorStop(1, mixc("#4cc3ff", "#02081a", cf(d1))); q.fillStyle = gr; q.fillRect(0, 0, W, H);
        if (cam < SURF) { const sy = SURF - cam; const sk = q.createLinearGradient(0, 0, 0, sy); sk.addColorStop(0, "#8fd8ff"); sk.addColorStop(1, "#e6f7ff"); q.fillStyle = sk; q.fillRect(0, 0, W, sy); dot(q, "#fff6b0", W * .15, sy - 40, 22); sh(q, "#e8ecf5", q => { q.moveTo(W * .75, sy - 4); q.lineTo(W * .75 + 70, sy - 4); q.lineTo(W * .75 + 58, sy + 4); q.lineTo(W * .75 + 8, sy + 4); q.closePath(); }, 3); sh(q, "#ff5c7a", q => q.rect(W * .75 + 22, sy - 20, 22, 16), 3); q.strokeStyle = "rgba(255,255,255,.8)"; q.lineWidth = 3; q.beginPath(); for (let x = 0; x <= W; x += 8) { const y = sy + Math.sin(x * .05 + T * 2) * 3; if (x) q.lineTo(x, y); else q.moveTo(x, y); } q.stroke(); }
        // sea floor
        const fy = SURF + MAXD * PXM - cam; if (fy < H + 60) { q.fillStyle = "#c9b27a"; q.fillRect(0, fy, W, H - fy + 80); q.fillStyle = "#a8925c"; for (let x = 20; x < W; x += 70) { q.beginPath(); q.ellipse(x, fy + 14, 26, 8, 0, 0, 7); q.fill(); } [["#ff6b8a", 80], ["#ff9f43", 230], ["#c86bff", 380], ["#ff6b8a", 520]].forEach(cc => { ln(q, cc[0], 6, q => { q.moveTo(cc[1], fy + 4); q.lineTo(cc[1], fy - 26); q.moveTo(cc[1], fy - 12); q.lineTo(cc[1] - 12, fy - 28); q.moveTo(cc[1], fy - 14); q.lineTo(cc[1] + 12, fy - 30); }); }); }
        snow.forEach(s => { const y = ((s.y - cam * s.s * .4) % H + H) % H; q.fillStyle = "rgba(255,255,255,.35)"; q.fillRect(s.x + Math.sin(T + s.y) * 6, y, s.s * 1.8, s.s * 1.8); });
        const gl = [];
        cre.forEach(o => { const sy = o.y - cam; if (sy < -90 || sy > H + 90) return; q.save(); q.translate(o.x, sy + Math.sin(o.ph * 1.3) * 5); const fl = o.vx < 0 ? -1 : 1; q.scale(o.s * fl, o.s); const gg = []; crD(q, o.id, o.ph, gg); q.restore(); gg.forEach(a => gl.push([o.x + a[0] * o.s * fl, sy + a[1] * o.s, a[2] * o.s, a[3]])); });
        if (mode === "dive") { q.save(); q.translate(sub.x, sub.y - cam); q.scale(sub.dir, 1); q.rotate(g.clamp(sub.vy * .003, -.2, .2)); subD(q, st, T, Math.abs(sub.vx) + Math.abs(sub.vy) > 20); q.restore(); } else { q.save(); q.translate(W / 2, H * .5 + Math.sin(T * 1.6) * 6); q.rotate(Math.sin(T) * .04); q.scale(3, 3); subD(q, st, T, true); q.restore(); }
        // darkness
        const dep = Math.max(0, (subY - SURF) / PXM), alpha = g.clamp((dep - 60) / 380, 0, .93), lampR = 170 + (st.ext === 1 ? 90 : 0);
        if (alpha > .01 && mode === "dive") { const sx = sub.x, sy2 = sub.y - cam, dg = q.createRadialGradient(sx, sy2, lampR * .25, sx, sy2, lampR); dg.addColorStop(0, "rgba(0,4,20,0)"); dg.addColorStop(1, "rgba(0,4,20," + alpha + ")"); q.fillStyle = dg; q.fillRect(0, 0, W, H); }
        gl.forEach(a => { const rg = q.createRadialGradient(a[0], a[1], 1, a[0], a[1], a[2]); rg.addColorStop(0, "rgba(" + a[3] + ",.9)"); rg.addColorStop(1, "rgba(" + a[3] + ",0)"); q.fillStyle = rg; q.fillRect(a[0] - a[2], a[1] - a[2], a[2] * 2, a[2] * 2); });
        fx.draw(q, dt);
        if (mode === "dive") {
          tx(q, "Depth " + Math.round(dep) + " m", 12, 26, "#fff", 18, "left"); tx(q, "Album " + album.length + " / " + nSp, 12, 48, "#ffd34e", 15, "left"); tx(q, "Deepest " + Math.round(maxDepth) + " m", W - 12, 26, "#cfe9ff", 14, "right"); if (hard) tx(q, "Hull limit " + Math.min(MAXD, st.rating) + " m", W - 12, 46, "#ffd34e", 13, "right");
          if (dep < 10 && T < 12) tx(q, "Steer down with the mouse or arrow keys", W / 2, H - 14, "#fff", 15);
          if (msgT > 0) { msgT -= dt; tx(q, msg, W / 2, H - 40, "#ffd34e", 17); }
        } else { tx(q, "Build your submarine, then press DIVE!", W / 2, 28, "#fff", 18); tx(q, "Album " + album.length + " / " + nSp + " creatures photographed", 12, H - 12, "#ffd34e", 14, "left"); }
        if (flash > 0) { q.fillStyle = "rgba(255,255,255," + flash + ")"; q.fillRect(0, 0, W, H); flash -= dt * 2.5; }
      });
    }
  });

  // ---------------------------------------------------------------- Balloon & Hovercraft Builder
  B.add({
    id: "s15-balloon", name: "Balloon & Hovercraft", ages: [5, 16], cat: "Build", color: "#ffb347", icon: "Ba",
    desc: "Build a hot-air balloon or a hovercraft, then fly or glide as far as you can over hills and water.",
    controls: "Pick the vehicle and parts, press Go! Hold the mouse, finger or Space to burn (balloon) or speed up (hovercraft)",
    start(g) {
      const { c, x: q, W, H } = g.canvas(600, 400), fx = mkFx();
      const hard = g.diff === 2, med = g.diff >= 1, nS = g.by(3, 4, 4), nB = g.by(2, 3, 3);
      const sv = ld(g), S0 = sv.st || {};
      let st = Object.assign({ kind: 0, shape: 0, pat: 0, base: 0, extra: 0, col: "#ff5c7a", col2: "#ffd93d", load: 0, power: 70 }, S0);
      st.kind = ci(st.kind, 2); st.shape = ci(st.shape, nS); st.pat = ci(st.pat, 4); st.base = ci(st.base, nB); st.extra = ci(st.extra, 4); st.load = g.clamp(+st.load || 0, 0, 100); st.power = g.clamp(+st.power || 70, 30, 100); if (!hard) { st.load = 0; st.power = 70; }
      let best = +sv.best || 0, mode = "design", T = 0, hold = 0, F = null;
      const save = () => g.save({ st, best }), stars = mkStars(30);
      const envP = (q, i) => {
        if (i === 0) { q.moveTo(0, -52); q.bezierCurveTo(56, -52, 56, 24, 14, 46); q.lineTo(-14, 46); q.bezierCurveTo(-56, 24, -56, -52, 0, -52); }
        else if (i === 1) { q.moveTo(0, -56); q.bezierCurveTo(72, -56, 40, 20, 12, 46); q.lineTo(-12, 46); q.bezierCurveTo(-40, 20, -72, -56, 0, -56); }
        else if (i === 2) { q.moveTo(0, -72); q.bezierCurveTo(46, -68, 46, 10, 12, 48); q.lineTo(-12, 48); q.bezierCurveTo(-46, 10, -46, -68, 0, -72); }
        else { q.moveTo(0, -44); q.bezierCurveTo(72, -44, 64, 24, 16, 44); q.lineTo(-16, 44); q.bezierCurveTo(-64, 24, -72, -44, 0, -44); }
        q.closePath();
      };
      const balD = (q, o, t, burn) => {
        const bt = o.shape === 2 ? 48 : 46, sw = Math.sin(t * 1.5) * 2;
        [-1, 1].forEach(s => ln(q, "#6a4a2a", 2, q => { q.moveTo(s * 12, bt - 2); q.lineTo(s * 13, bt + 36); }));
        if (burn > 0) { const L = 14 + burn * 10 + Math.sin(t * 30) * 3; q.fillStyle = "#ff8a1f"; q.beginPath(); q.moveTo(-7, bt + 2); q.quadraticCurveTo(0, bt - L * 1.3, 7, bt + 2); q.fill(); q.fillStyle = "#ffe35c"; q.beginPath(); q.moveTo(-4, bt + 2); q.quadraticCurveTo(0, bt - L * .8, 4, bt + 2); q.fill(); }
        // basket
        q.save(); q.translate(sw, bt + 34);
        if (o.base === 0) { sh(q, "#c89a5a", q => q.roundRect(-18, 0, 36, 24, 4), 4); q.strokeStyle = "rgba(90,60,30,.5)"; q.lineWidth = 1.5; for (let k = -12; k <= 12; k += 8) { q.beginPath(); q.moveTo(k, 2); q.lineTo(k, 22); q.stroke(); } }
        else if (o.base === 1) sh(q, "#c89a5a", q => { q.moveTo(-20, 0); q.lineTo(20, 0); q.quadraticCurveTo(20, 28, 0, 28); q.quadraticCurveTo(-20, 28, -20, 0); }, 4);
        else { sh(q, o.col2, q => q.roundRect(-22, -2, 44, 26, 10), 4); [-9, 9].forEach(x => dot(q, "#9fe6ff", x, 10, 5)); }
        if (o.base < 2) { dot(q, "#ffd1a8", -5, -4 + Math.sin(t * 3) * 1.5, 5.5); if (o.extra === 3) { dot(q, "#e8b48a", 6, -4 + Math.sin(t * 3 + 1) * 1.5, 5.5); ln(q, "#ffd1a8", 3, q => { q.moveTo(12, 2); q.lineTo(18, -8 + Math.sin(t * 6) * 3); }); } }
        q.restore();
        if (o.extra === 1) { ln(q, "#8b5a2b", 3, q => { q.moveTo(0, -50); q.lineTo(0, -84); }); sh(q, o.col2, q => { q.moveTo(0, -84); q.lineTo(24, -78 + sw * 2); q.lineTo(0, -70); q.closePath(); }, 3); }
        sh(q, o.col, q => envP(q, o.shape), 5);
        q.save(); q.beginPath(); envP(q, o.shape); q.clip(); q.fillStyle = o.col2;
        if (o.pat === 0) for (let x = -60; x < 60; x += 28) q.fillRect(x, -80, 14, 140);
        else if (o.pat === 1) { q.beginPath(); q.moveTo(-70, -6); for (let x = -70; x < 70; x += 14) { q.lineTo(x + 7, -18); q.lineTo(x + 14, -6); } q.lineTo(70, 12); for (let x = 70; x > -70; x -= 14) { q.lineTo(x - 7, 0); q.lineTo(x - 14, 12); } q.closePath(); q.fill(); }
        else if (o.pat === 2) [[-20, -30], [18, -40], [0, -6], [-26, 14], [24, 10]].forEach(p => { q.beginPath(); for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5, r = i % 2 ? 4 : 10; q.lineTo(p[0] + Math.cos(a) * r, p[1] + Math.sin(a) * r); } q.closePath(); q.fill(); });
        else dot(q, o.col2, 0, -12, 20);
        q.fillStyle = "rgba(255,255,255,.22)"; q.beginPath(); q.ellipse(-20, -20, 8, 22, .3, 0, 7); q.fill(); q.restore();
        q.strokeStyle = "rgba(0,0,0,.15)"; q.lineWidth = 1.5; q.save(); q.beginPath(); envP(q, o.shape); q.clip(); [-24, 0, 24].forEach(x => { q.beginPath(); q.moveTo(0, -80); q.quadraticCurveTo(x * 2, -8, x * .3, 48); q.stroke(); }); q.restore();
        if (o.extra === 2) for (let k = -1; k <= 1; k++) { ln(q, o.col2, 3, q => { q.moveTo(k * 24, -4 + Math.abs(k) * 4); q.lineTo(k * 28 + Math.sin(t * 3 + k) * 3, 12 + Math.abs(k) * 4); }); }
      };
      const hovD = (q, o, t, fl) => {
        const nF = o.extra === 0 ? 1 : o.extra;
        [-1, 1].forEach(s => sh(q, "#2b3245", q => q.ellipse(s * 40, 22, 14, 10, 0, 0, 7), 3));
        sh(q, o.base === 1 ? "#f0f0f0" : "#2b3245", q => q.roundRect(-58, 14, 116, 16, 8), 4);
        if (o.base === 2) { q.fillStyle = o.col2; for (let x = -50; x < 50; x += 20) q.fillRect(x, 17, 10, 10); }
        sh(q, o.col, q => { if (o.shape === 0) q.ellipse(0, 4, 54, 18, 0, 0, 7); else if (o.shape === 1) q.roundRect(-52, -12, 104, 30, 8); else { q.moveTo(-54, 10); q.lineTo(-40, -8); q.lineTo(34, -8); q.lineTo(58, 8); q.lineTo(44, 18); q.lineTo(-48, 18); q.closePath(); } }, 5);
        q.save(); q.beginPath(); q.rect(-70, 8, 140, 6); q.clip(); q.fillStyle = o.col2; q.fillRect(-70, 8, 140, 6); q.restore();
        if (o.pat === 1) { q.fillStyle = o.col2; q.fillRect(-30, -4, 50, 4); } else if (o.pat === 2) [-30, -10, 10, 30].forEach(x => dot(q, o.col2, x, 2, 3)); else if (o.pat === 3) { q.fillStyle = o.col2; q.beginPath(); q.moveTo(-40, -2); q.lineTo(-30, -2); q.lineTo(-20, 8); q.lineTo(-30, 8); q.closePath(); q.fill(); }
        q.beginPath(); q.arc(6, -6, 18, PI, 0); q.closePath(); q.fillStyle = "rgba(159,230,255,.85)"; q.fill(); q.strokeStyle = OUT; q.lineWidth = 4; q.stroke(); dot(q, "#ffd1a8", 6, -10, 6); sh(q, "#fff", q => q.roundRect(1, -19, 10, 5, 2), 2);
        for (let k = 0; k < nF; k++) { const fy = -22 - k * 14; ln(q, "#8a93a8", 3, q => { q.moveTo(-40, fy + 14); q.lineTo(-40, -8 - k * 0); }); q.save(); q.translate(-40, fy); q.rotate(0); const sp = Math.cos(t * (fl ? 40 : 12) + k); q.fillStyle = "rgba(60,70,90,.9)"; q.beginPath(); q.ellipse(0, 0, 3, 14 * Math.abs(sp) + 2, 0, 0, 7); q.fill(); q.strokeStyle = OUT; q.lineWidth = 3; q.beginPath(); q.ellipse(0, 0, 5, 16, 0, 0, 7); q.stroke(); q.restore(); }
      };
      const kbar = mkBar(g), row1 = mkBar(g), row2 = mkBar(g), fbar = mkBar(g);
      const names = () => st.kind === 0 ? ["Balloon shape", "Pattern", "Basket", "Extras"] : ["Body", "Stripes", "Skirt", "Fans"];
      const drawV = (o, q, t, fl) => { if (o.kind === 0) { q.translate(0, -10); balD(q, o, t, fl ? 1 : 0); } else hovD(q, o, t, fl); };
      const buildRows = () => {
        row1.innerHTML = ""; const nm = names(), s0 = st.kind === 0 ? .27 : .34;
        const th = key => (q, w, h, i) => { const o = Object.assign({}, st, { col: "#ff6b8a", col2: "#ffd93d" }); o[key] = i; q.translate(w / 2, h / 2 + (st.kind === 0 ? 6 : 6)); q.scale(s0, s0); drawV(o, q, 0, false); };
        partRow(g, row1, nm[0], nS, th("shape"), () => st.shape, i => { st.shape = i; save(); });
        partRow(g, row1, nm[1], 4, th("pat"), () => st.pat, i => { st.pat = i; save(); });
        partRow(g, row1, nm[2], nB, th("base"), () => st.base, i => { st.base = i; save(); });
        if (med) partRow(g, row1, nm[3], 4, th("extra"), () => st.extra, i => { st.extra = i; save(); });
      };
      mkOpts(g, kbar, "Build a", ["Hot-air balloon", "Hovercraft"], () => st.kind, i => { st.kind = i; buildRows(); save(); });
      buildRows();
      mkLabel(row2, "Colour"); mkSwatches(g, row2, PAL, st.col, k => { st.col = k; save(); });
      mkLabel(row2, "Trim"); mkSwatches(g, row2, PAL, st.col2, k => { st.col2 = k; save(); });
      if (hard) { mkSlider(g, row2, "Cargo", 0, 100, st.load, v => { st.load = v; save(); }); mkSlider(g, row2, "Power", 30, 100, st.power, v => { st.power = v; save(); }); }
      const bG = mkBtn(g, row2, "GO!", () => go()); bG.style.background = "#ffb347"; bG.style.fontSize = "18px";
      const bH = mkBtn(g, fbar, "Burn / Go (hold)", () => {}); const hh = (on) => () => { hold = on; }; g.on(bH, "pointerdown", hh(1)); g.on(bH, "pointerup", hh(0)); g.on(bH, "pointerleave", hh(0)); g.on(bH, "pointercancel", hh(0));
      const bJ = mkBtn(g, fbar, "Hop", () => hop()); mkBtn(g, fbar, "Back to design", () => setMode("design")); mkEnd(g, fbar, c, "my-vehicle");
      const setMode = m => { mode = m; [kbar, row1, row2].forEach(r => { r.style.display = m === "design" ? "flex" : "none"; }); fbar.style.display = m === "fly" ? "flex" : "none"; if (m === "fly") { bH.textContent = st.kind === 0 ? "Burn (hold)" : "Go (hold)"; bJ.style.display = st.kind === 1 ? "" : "none"; } hold = 0; };
      setMode("design");
      g.on(window, "keydown", e => { if (mode !== "fly") return; if (e.key === " " || e.key === "ArrowUp" || e.key === "w") { e.preventDefault(); hold = 1; if (st.kind === 1 && e.key === " ") hop(); } });
      g.on(window, "keyup", e => { if (e.key === " " || e.key === "ArrowUp" || e.key === "w") hold = 0; });
      g.on(c, "pointerdown", () => { if (mode === "fly") hold = 1; }); g.on(c, "pointerup", () => { hold = 0; }); g.on(c, "pointerleave", () => { hold = 0; });
      const go = () => {
        F = { x: 0, alt: 0, vy: 0, vx: 0, heat: .15, fuel: 100, top: 0, pos: 0, air: 0, v: 0, y: 0, vyy: 0, msg: "" };
        setMode("fly"); g.sfx("launch");
      };
      const hop = () => { if (F && st.kind === 1 && F.air < .05) { F.vyy = -170; F.air = .3; g.sfx("pop"); } };
      const wgt = () => .55 + st.base * .04 + (st.extra === 3 ? .06 : 0) + (hard ? st.load / 100 * .6 : 0);
      // hovercraft terrain (world px)
      const hz = X => { const z = Math.floor(X / 900) % 3, f = X % 900; const bl = z === 2 ? g.clamp(Math.min(f, 900 - f) / 90, 0, 1) : 0, amp = 1 - bl; let y = 22 * Math.sin(X * .008) + 12 * Math.sin(X * .021 + 1); for (let j = Math.floor(X / 700) - 1; j <= Math.floor(X / 700) + 1; j++) y += 30 * Math.exp(-Math.pow((X - (j * 700 + 320)) / 46, 2)); return { y: H * .74 - y * amp, w: bl > .5, sand: z === 1 }; };
      const house = (x, y, s, k) => { sh(q, k, q => q.rect(x - 10 * s, y - 16 * s, 20 * s, 16 * s), 2.5); sh(q, "#b04a3a", q => { q.moveTo(x - 13 * s, y - 16 * s); q.lineTo(x, y - 28 * s); q.lineTo(x + 13 * s, y - 16 * s); q.closePath(); }, 2.5); };
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt;
        if (mode === "design" || !F) {
          const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#5bb8f5"); gr.addColorStop(1, "#dff4ff"); q.fillStyle = gr; q.fillRect(0, 0, W, H); q.fillStyle = "#8fd18a"; q.beginPath(); q.moveTo(0, H); for (let x = 0; x <= W; x += 20) q.lineTo(x, H * .8 - 24 * Math.sin(x * .01 + 1)); q.lineTo(W, H); q.fill();
          q.save(); q.translate(W / 2, H * .5 + Math.sin(T * 1.6) * 6); q.scale(st.kind === 0 ? 1.7 : 2.2, st.kind === 0 ? 1.7 : 2.2); drawV(st, q, T, false); q.restore();
          tx(q, st.kind === 0 ? "Design your balloon, then press GO!" : "Design your hovercraft, then press GO!", W / 2, 26, "#ffffff", 18); if (best) tx(q, "Best " + Math.round(best) + " m", W - 12, H - 12, "#ffffff", 15, "right"); return;
        }
        let dist = 0;
        if (st.kind === 0) {
          const size = [1, .92, 1.12, 1.3][st.shape], W0 = wgt(), pw = st.power / 70, canBurn = !hard || F.fuel > 0, burn = hold && canBurn;
          if (burn) { F.heat = Math.min(1, F.heat + .55 * pw * dt); if (hard) F.fuel = Math.max(0, F.fuel - 7 * dt); } else F.heat = Math.max(0, F.heat - .12 * dt);
          const ay = 26 * (F.heat * size - W0) - 1.3 * F.vy; F.vy += ay * dt; F.alt += F.vy * dt;
          if (F.alt <= 0) { F.alt = 0; if (F.vy < -20) { g.sfx("thump"); fx.burst(W * .4, H * .88, ["#8fd18a", "#fff"], 8, 60); } F.vy = Math.max(0, -F.vy * .25); if (hard) F.fuel = Math.min(100, F.fuel + 25 * dt); }
          if (F.alt > 700) { F.alt = 700; F.vy = Math.min(0, F.vy); }
          const wind = 2 + 10 * Math.pow(F.alt / 700, .8) + (hard ? Math.sin(T * .9) * 1.5 : 0); F.vx += ((F.alt < 1 ? 0 : wind) - F.vx) * Math.min(1, dt * .7); F.x += F.vx * dt; dist = F.x;
          if (burn && Math.random() < dt * 20) fx.burst(W * .4 + g.rf(-6, 6), H * .5, ["#ff8a1f", "#ffe35c"], 1, 40);
          const camA = F.alt * .5, off = Math.max(0, camA - H * .4), gy = H * .88 + off, k = g.clamp(F.alt / 900, 0, 1);
          const sk = q.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, mixc("#5bb8f5", "#2a5fc0", k)); sk.addColorStop(1, mixc("#dff4ff", "#bfe0ff", k)); q.fillStyle = sk; q.fillRect(0, 0, W, H);
          dot(q, "#fff6b0", W * .85, 60 + off * .3, 26);
          q.fillStyle = "#9fb4d8"; q.beginPath(); q.moveTo(0, gy); for (let x = 0; x <= W; x += 15) q.lineTo(x, gy - 90 - 50 * Math.abs(Math.sin((x + F.x * 1.2) * .006)) - 20 * Math.sin((x + F.x * 1.2) * .02)); q.lineTo(W, gy); q.fill();
          q.fillStyle = "#79c47a"; q.beginPath(); q.moveTo(0, gy); for (let x = 0; x <= W; x += 15) q.lineTo(x, gy - 30 - 22 * Math.sin((x + F.x * 4) * .01) - 10 * Math.sin((x + F.x * 4) * .03)); q.lineTo(W, gy); q.fill();
          for (let i = 0; i < 6; i++) { const cy = 120 + i * 90 - off * .2 + camA * .6 - 120; q.fillStyle = "rgba(255,255,255,.8)"; const cx = (((i * 237 - F.x * (3 + i % 3) * .8 + T * 4) % (W + 200)) + W + 200) % (W + 200) - 100; [[0, 0, 32], [28, 8, 22], [-28, 8, 22]].forEach(b => { q.beginPath(); q.ellipse(cx + b[0], cy + b[1], b[2], b[2] * .55, 0, 0, 7); q.fill(); }); }
          q.fillStyle = "#58b947"; q.fillRect(0, gy, W, H - gy + 10);
          const hs = Math.floor(F.x * 8 / 150); for (let hI = hs - 1; hI < hs + 6; hI++) { const hx = hI * 150 - F.x * 8 + 60 + ((hI * 37) % 40); if (hx < -30 || hx > W + 30) continue; if (hI % 3) house(hx, gy + 8, 1 + (hI % 2) * .3, ["#ffd1a8", "#f5e0a0", "#e8b0b0"][hI % 3]); else { ln(q, "#6a4a2a", 5, q => { q.moveTo(hx, gy + 8); q.lineTo(hx, gy - 14); }); dot(q, "#3fa34d", hx, gy - 26, 15); } }
          const by = gy - F.alt * .5 - 66; q.save(); q.translate(W * .4, by); q.scale(.9, .9 + F.heat * .06); balD(q, st, T, burn ? 1 : 0); q.restore();
          fx.draw(q, dt);
          tx(q, "Distance " + Math.round(dist) + " m", 12, 26, "#fff", 18, "left"); tx(q, "Height " + Math.round(F.alt) + " m", 12, 48, "#fff", 14, "left"); tx(q, "Wind " + Math.round(F.vx) + " m/s", 12, 66, "#fff", 14, "left");
          q.fillStyle = "rgba(0,0,0,.45)"; q.fillRect(W - 112, 12, 100, 12); q.fillStyle = F.heat > .85 ? "#ff6b4b" : "#ffb347"; q.fillRect(W - 112, 12, F.heat * 100, 12); tx(q, "Air heat", W - 62, 40, "#fff", 12);
          if (hard) { q.fillStyle = "rgba(0,0,0,.45)"; q.fillRect(W - 112, 48, 100, 10); q.fillStyle = "#6be28f"; q.fillRect(W - 112, 48, F.fuel, 10); tx(q, "Fuel", W - 62, 74, "#fff", 12); }
          if (F.x < 6) tx(q, "Hold to burn and rise. Higher air is windier!", W / 2, H - 16, "#ffffff", 15);
        } else {
          const pw = st.power / 70, nF = st.extra === 0 ? 1 : st.extra, sk = [1, .85, .92][st.base], W0 = 1 + (hard ? st.load / 100 * .8 : 0);
          const X = F.x * 10, here = hz(X), ahead = hz(X + 24), slope = Math.atan2(ahead.y - here.y, 24);
          const thrust = (hold ? 5 * nF * pw : 0) / W0, drag = (.5 * sk) * (here.sand ? 1.25 : 1) * (here.w ? .85 : 1);
          F.v += (thrust - drag * F.v - 9.8 * Math.sin(slope) * .25) * dt; F.v = Math.max(0, F.v); F.x += F.v * dt; dist = F.x;
          const target = here.y - 22; F.y = F.y || target; F.air = Math.max(0, F.air - dt);
          F.vyy += (-(F.y - target) * 60 - F.vyy * 7) * dt + 0; if (F.air > 0) F.vyy += 0; F.vyy += 0; F.y += F.vyy * dt; if (F.y > target + 4) { F.y = target + 4; F.vyy = Math.min(F.vyy, 0); }
          if (F.y < target - 140) F.y = target - 140;
          const camX = X - W * .3;
          const sk2 = q.createLinearGradient(0, 0, 0, H * .75); sk2.addColorStop(0, "#5bb8f5"); sk2.addColorStop(1, "#dff4ff"); q.fillStyle = sk2; q.fillRect(0, 0, W, H);
          dot(q, "#fff6b0", W * .85, 60, 26);
          q.fillStyle = "#9fb4d8"; q.beginPath(); q.moveTo(0, H * .7); for (let x = 0; x <= W; x += 15) q.lineTo(x, H * .7 - 40 - 40 * Math.abs(Math.sin((x + camX * .2) * .006))); q.lineTo(W, H * .7); q.fill();
          for (let i = 0; i < 4; i++) { const cx = (((i * 260 - camX * .08 + T * 5) % (W + 200)) + W + 200) % (W + 200) - 100; q.fillStyle = "rgba(255,255,255,.85)"; [[0, 0, 32], [28, 8, 22], [-28, 8, 22]].forEach(b => { q.beginPath(); q.ellipse(cx + b[0], 60 + i * 30 + b[1], b[2], b[2] * .55, 0, 0, 7); q.fill(); }); }
          // ground strips by column
          for (let x = 0; x < W; x += 6) { const h2 = hz(camX + x); q.fillStyle = h2.w ? "#2f9ae0" : h2.sand ? "#e8d08a" : "#58b947"; q.fillRect(x, h2.y, 6, H - h2.y); if (!h2.w) { q.fillStyle = h2.sand ? "#d5ba70" : "#4aa63d"; q.fillRect(x, h2.y, 6, 4); } else { q.fillStyle = "rgba(255,255,255,.35)"; q.fillRect(x, h2.y + Math.sin((x + camX) * .05 + T * 3) * 2, 6, 2); } }
          const m0 = Math.floor(F.x / 50); for (let m = m0 - 1; m < m0 + 12; m++) { const px = m * 500 - camX; if (px < -20 || px > W + 20) continue; const hh2 = hz(m * 500); ln(q, "#fff", 3, q => { q.moveTo(px, hh2.y); q.lineTo(px, hh2.y - 24); }); if (m > 0) tx(q, (m * 50) + "m", px, hh2.y - 30, "#fff", 12); }
          q.save(); q.translate(W * .3, F.y - 4 + Math.sin(T * 6) * 1.2); q.rotate(g.clamp(slope * .8, -.4, .4) + (F.y < target - 6 ? -.08 : 0)); q.scale(.7, .7); hovD(q, st, T, hold); q.restore();
          if (F.v > 1 && Math.random() < dt * (10 + F.v * 2)) fx.burst(W * .3 - 40, here.y - 2, here.w ? ["#fff", "#bfe6ff"] : here.sand ? ["#e8d08a", "#d5ba70"] : ["#79c47a", "#c9e8a8"], 2, 70);
          fx.draw(q, dt);
          tx(q, "Distance " + Math.round(dist) + " m", 12, 26, "#fff", 18, "left"); tx(q, "Speed " + F.v.toFixed(1) + " m/s", 12, 48, "#fff", 14, "left");
          if (F.x < 5) tx(q, "Hold to speed up. Hop over bumps!", W / 2, H - 16, "#ffffff", 15);
        }
        if (dist > F.top) F.top = dist; if (F.top > best) { best = F.top; g.score(Math.round(best)); save(); }
        tx(q, "Best " + Math.round(best) + " m", W - 12, st.kind === 0 ? H - 10 : 26, "#ffd34e", 16, "right");
      });
    }
  });

  // ---------------------------------------------------------------- Spacesuit & Jetpack Dress-up
  B.add({
    id: "s15-spacewalk", name: "Jetpack Spacewalk", ages: [5, 16], cat: "Creative", color: "#4cc3ff", icon: "J",
    desc: "Dress an astronaut with a helmet, suit and jetpack, then go for a spacewalk collecting stars and fixing satellites.",
    controls: "Pick the outfit, press Spacewalk! Hold the mouse or your finger (or use WASD) to fire the jetpack",
    start(g) {
      const { c, x: q, W, H, pos } = g.canvas(600, 420), fx = mkFx();
      const hard = g.diff === 2, med = g.diff >= 1, nH = g.by(3, 4, 4), nP = g.by(3, 4, 4), nB = g.by(2, 3, 3), VIS = ["#f5c542", "#3ec1ff", "#6be28f", "#ff8fd0", "#c0c8d8"];
      const sv = ld(g), S0 = sv.st || {};
      let st = Object.assign({ helm: 0, pack: 1, boot: 0, badge: 1, extra: 0, col: "#f2f4fa", col2: "#ff5c7a", vis: "#f5c542", glove: "#ff9f43", thrust: 70, fuel: 70 }, S0);
      st.helm = ci(st.helm, nH); st.pack = ci(st.pack, nP); st.boot = ci(st.boot, nB); st.badge = ci(st.badge, 4); st.extra = ci(st.extra, med ? 3 : 1); st.thrust = g.clamp(+st.thrust || 70, 40, 100); st.fuel = g.clamp(+st.fuel || 70, 30, 100);
      let mode = "design", T = 0, best = +sv.best || 0, total = 0, items = [], keyV = { x: 0, y: 0 }, steer = { on: false, x: 0, y: 0 }, msg = "", msgT = 0;
      const A = { x: W * .4, y: H * .4, vx: 0, vy: 0, fuel: 100, ax: 0, ay: 0 }, stars = mkStars(90), save = () => g.save({ st, best });
      const astD = (q, o, t, th) => {
        const sw = Math.sin(t * 2);
        if (o.extra === 2) sh(q, "#ff5c7a", q => { q.moveTo(-18, -22); q.lineTo(18, -22); q.lineTo(26 + sw * 4, 34); q.lineTo(-26 + sw * 4, 34); q.closePath(); }, 4);
        if (o.pack === 0) [-1, 1].forEach(s => sh(q, "#b9c3da", q => q.roundRect(s * 20 - 7, -20, 14, 40, 7), 4));
        else if (o.pack === 1) { sh(q, "#8a93a8", q => q.roundRect(-24, -20, 48, 38, 6), 4); [-1, 1].forEach(s => sh(q, "#5a6278", q => { q.moveTo(s * 12 - 6, 18); q.lineTo(s * 12 + 6, 18); q.lineTo(s * 12 + 9, 28); q.lineTo(s * 12 - 9, 28); q.closePath(); }, 3)); }
        else if (o.pack === 2) { [-1, 1].forEach(s => sh(q, o.col2, q => { q.moveTo(s * 14, -14); q.lineTo(s * 58, 8 + sw * 2); q.lineTo(s * 54, 24); q.lineTo(s * 14, 14); q.closePath(); }, 4)); sh(q, "#8a93a8", q => q.roundRect(-16, -18, 32, 34, 5), 4); }
        else sh(q, "#c9d3ea", q => q.arc(0, 0, 32, 0, 7), 4);
        [-1, 1].forEach(s => { sh(q, o.col, q => q.roundRect(s * 11 - 8, 18, 16, 26, 7), 4); if (o.boot === 0) sh(q, o.col2, q => q.ellipse(s * 11, 46, 11, 7, 0, 0, 7), 4); else if (o.boot === 1) sh(q, o.col2, q => q.roundRect(s * 11 - 12, 38, 24, 14, 6), 4); else { sh(q, o.col2, q => q.ellipse(s * 11, 46, 10, 7, 0, 0, 7), 4); q.fillStyle = "#fff"; q.fillRect(s * 11 - 8, 43, 16, 3); } });
        [-1, 1].forEach(s => { q.save(); q.translate(s * 22, -10); q.rotate(s * (.5 + sw * .1)); sh(q, o.col, q => q.roundRect(-7, 0, 14, 28, 7), 4); sh(q, o.glove, q => q.arc(0, 30, 8, 0, 7), 3.5); q.restore(); });
        sh(q, o.col, q => q.roundRect(-22, -26, 44, 50, 14), 5); q.fillStyle = o.col2; q.fillRect(-21, 14, 42, 5);
        if (o.badge === 1) { q.fillStyle = "#ffd93d"; q.beginPath(); for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5, r = i % 2 ? 3.5 : 8; q.lineTo(-8 + Math.cos(a) * r, -10 + Math.sin(a) * r); } q.closePath(); q.fill(); }
        else if (o.badge === 2) { sh(q, "#fff", q => q.rect(-12, -14, 16, 10), 2); q.fillStyle = "#ff5c5c"; q.fillRect(-12, -12, 16, 3); q.fillStyle = "#3d6bff"; q.fillRect(-12, -7, 6, 3); }
        else if (o.badge === 3) { dot(q, "#3ec1ff", -6, -9, 7); q.strokeStyle = OUT; q.lineWidth = 2; q.beginPath(); q.arc(-6, -9, 7, 0, 7); q.stroke(); q.beginPath(); q.ellipse(-6, -9, 11, 3, -.3, 0, 7); q.stroke(); }
        [8, 14].forEach((x, i) => dot(q, i ? "#6be28f" : "#ff6b6b", x, -8 + i * 6, 2.5));
        // helmet
        q.save(); q.translate(0, -40);
        if (o.extra === 1) { ln(q, "#b9c3da", 3, q => { q.moveTo(10, -18); q.lineTo(18, -38); }); dot(q, Math.sin(t * 5) > 0 ? "#ff6b6b" : "#9a3b3b", 18, -40, 4); }
        sh(q, "#f2f4fa", q => { if (o.helm === 0) q.arc(0, 0, 25, 0, 7); else if (o.helm === 1) q.roundRect(-25, -24, 50, 48, 14); else if (o.helm === 2) q.ellipse(0, 0, 22, 28, 0, 0, 7); else q.arc(0, 0, 25, 0, 7); }, 5);
        if (o.helm === 3) { sh(q, "#ffe35c", q => q.roundRect(-9, -33, 18, 9, 3), 3); }
        sh(q, o.vis, q => { if (o.helm === 2) q.ellipse(0, 2, 15, 18, 0, 0, 7); else q.ellipse(0, 2, 17, 14, 0, 0, 7); }, 4); q.fillStyle = "rgba(255,255,255,.55)"; q.beginPath(); q.ellipse(-6, -4, 5, 3, -.5, 0, 7); q.fill(); q.restore();
        if (th) { q.save(); q.translate(0, 22); const L = 18 + th.l * 26 + Math.sin(t * 40) * 3; q.rotate(th.a); q.fillStyle = "#ff8a1f"; q.beginPath(); q.moveTo(-7, 0); q.quadraticCurveTo(0, L * 1.2, 7, 0); q.fill(); q.fillStyle = "#ffe35c"; q.beginPath(); q.moveTo(-4, 0); q.quadraticCurveTo(0, L * .7, 4, 0); q.fill(); q.restore(); }
      };
      const row1 = mkBar(g), row2 = mkBar(g), fbar = mkBar(g);
      const th = key => (q, w, h, i) => { const o = Object.assign({}, st, { col: "#f2f4fa", col2: "#ff6b8a", glove: "#ff9f43" }); o[key] = i; q.translate(w / 2, h / 2 + 4); q.scale(.34, .34); if (key === "helm" || key === "extra") q.translate(0, 26); astD(q, o, 0, null); };
      partRow(g, row1, "Helmet", nH, th("helm"), () => st.helm, i => { st.helm = i; save(); });
      partRow(g, row1, "Jetpack", nP, th("pack"), () => st.pack, i => { st.pack = i; save(); });
      partRow(g, row1, "Boots", nB, th("boot"), () => st.boot, i => { st.boot = i; save(); });
      partRow(g, row1, "Badge", 4, th("badge"), () => st.badge, i => { st.badge = i; save(); });
      if (med) partRow(g, row1, "Extra", 3, th("extra"), () => st.extra, i => { st.extra = i; save(); });
      mkLabel(row2, "Suit"); mkSwatches(g, row2, PAL, st.col, k => { st.col = k; save(); });
      mkLabel(row2, "Trim"); mkSwatches(g, row2, PAL, st.col2, k => { st.col2 = k; save(); });
      mkLabel(row2, "Visor"); mkSwatches(g, row2, VIS, st.vis, k => { st.vis = k; save(); });
      mkLabel(row2, "Gloves"); mkSwatches(g, row2, PAL.slice(0, 8), st.glove, k => { st.glove = k; save(); });
      if (hard) { mkSlider(g, row2, "Thrust", 40, 100, st.thrust, v => { st.thrust = v; save(); }); mkSlider(g, row2, "Fuel tank", 30, 100, st.fuel, v => { st.fuel = v; save(); }); }
      mkBtn(g, row2, "Surprise me", () => { st.helm = g.ri(0, nH - 1); st.pack = g.ri(0, nP - 1); st.boot = g.ri(0, nB - 1); st.badge = g.ri(0, 3); st.col = g.pick(PAL); st.col2 = g.pick(PAL); st.vis = g.pick(VIS); st.glove = g.pick(PAL.slice(0, 8)); if (med) st.extra = g.ri(0, 2); g.sfx("pop"); save(); });
      const bW = mkBtn(g, row2, "SPACEWALK!", () => go()); bW.style.background = "#4cc3ff"; bW.style.fontSize = "18px";
      mkBtn(g, fbar, "Back to dressing room", () => { mode = "design"; ui(); }); mkEnd(g, fbar, c, "my-astronaut");
      const ui = () => { row1.style.display = row2.style.display = mode === "design" ? "flex" : "none"; fbar.style.display = mode === "fly" ? "flex" : "none"; };
      ui();
      const stn = { x: W - 100, y: H - 120 };
      const spawn = () => { for (let k = 0; k < 40 && items.length < g.by(6, 8, 9); k++) { const x = g.rf(40, W - 40), y = g.rf(50, H - 90); if (Math.hypot(x - A.x, y - A.y) < 100 || Math.hypot(x - stn.x, y - stn.y) < 90) continue; const r = Math.random(); items.push({ t: r < .6 ? 0 : r < .85 ? 1 : 2, x, y, ph: Math.random() * 6, rot: 0, fix: 0 }); } };
      const go = () => { mode = "fly"; ui(); A.x = stn.x - 60; A.y = stn.y - 50; A.vx = A.vy = 0; A.fuel = hard ? st.fuel : 100; items = []; total = 0; spawn(); g.sfx("launch"); msg = "Hold the mouse or finger to fly there!"; msgT = 4; };
      g.on(c, "pointerdown", e => { const p = pos(e); steer.on = true; steer.x = p.x; steer.y = p.y; }); g.on(c, "pointermove", e => { if (steer.on) { const p = pos(e); steer.x = p.x; steer.y = p.y; } });
      g.on(c, "pointerup", () => { steer.on = false; }); g.on(c, "pointerleave", () => { steer.on = false; }); g.on(c, "pointercancel", () => { steer.on = false; });
      const itemD = (q, it, t) => {
        if (it.t === 0) { q.fillStyle = "#ffd93d"; q.strokeStyle = OUT; q.lineWidth = 3; q.beginPath(); for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5, r = i % 2 ? 7 : 16; q.lineTo(Math.cos(a) * r, Math.sin(a) * r); } q.closePath(); q.stroke(); q.fill(); }
        else if (it.t === 1) { ln(q, "#b9c3da", 6, q => { q.moveTo(-10, 10); q.lineTo(8, -8); }); sh(q, "#b9c3da", q => q.arc(10, -10, 8, 0, 7), 3.5); dot(q, "#04061a", 13, -13, 3.5); }
        else { sh(q, "#cfd6e6", q => q.roundRect(-9, -9, 18, 18, 3), 3); [-1, 1].forEach(s => sh(q, it.fix ? "#3d6bff" : "#7a8398", q => q.rect(s > 0 ? 12 : -30, -6, 18, 12), 2.5)); dot(q, it.fix ? "#6be28f" : (Math.sin(t * 6) > 0 ? "#ff4b4b" : "#7a2a2a"), 0, 0, 3.5); }
      };
      g.loop((dt, t) => {
        dt = Math.min(dt, .05); T += dt;
        const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#02030c"); gr.addColorStop(1, "#101c58"); q.fillStyle = gr; q.fillRect(0, 0, W, H); drawStars(q, stars, W, H, T, 1);
        if (mode === "design") {
          q.save(); q.translate(W / 2, H * .5 + Math.sin(T * 1.5) * 8); q.rotate(Math.sin(T * .8) * .05); q.scale(2.5, 2.5); astD(q, st, T, null); q.restore();
          tx(q, "Dress your astronaut, then press SPACEWALK!", W / 2, 28, "#fff", 18); if (best) tx(q, "Best haul " + best, W - 12, H - 12, "#ffd34e", 15, "right"); return;
        }
        // earth + station
        const eg = q.createRadialGradient(W * .3, H + 240, 200, W * .3, H + 240, 300); eg.addColorStop(0, "#2a7bd8"); eg.addColorStop(.9, "#3ea0ff"); eg.addColorStop(1, "rgba(120,200,255,0)"); q.fillStyle = eg; q.beginPath(); q.arc(W * .3, H + 240, 300, 0, 7); q.fill();
        q.save(); q.beginPath(); q.arc(W * .3, H + 240, 280, 0, 7); q.clip(); q.fillStyle = "#4bb86a"; for (let k = 0; k < 4; k++) { q.beginPath(); q.ellipse(((k * 200 + T * 10) % 800) - 100, H - 20 + k * 6, 70, 22, 0, 0, 7); q.fill(); } q.restore();
        q.save(); q.translate(stn.x, stn.y); sh(q, "#d7deee", q => q.roundRect(-34, -18, 68, 36, 8), 4); sh(q, "#cfd6e6", q => q.arc(0, 0, 14, 0, 7), 4); dot(q, "#04061a", 0, 0, 8); [-1, 1].forEach(s => { ln(q, "#8a93a8", 3, q => { q.moveTo(s * 34, 0); q.lineTo(s * 44, 0); }); sh(q, "#3d6bff", q => q.rect(s > 0 ? 44 : -88, -22, 44, 44), 3); }); [-18, 18].forEach(x => dot(q, "#ffe98a", x, -4, 4)); q.restore();
        // physics
        let ix = keyV.x, iy = keyV.y;
        const kx = (g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0), ky = (g.keys.ArrowDown ? 1 : 0) - (g.keys.ArrowUp ? 1 : 0); ix = kx; iy = ky;
        if (!ix && !iy && steer.on) { const dx = steer.x - A.x, dy = steer.y - A.y, d = Math.hypot(dx, dy); if (d > 12) { ix = dx / d; iy = dy / d; } }
        const mag = Math.hypot(ix, iy), pk = [1, 1.35, 1.1, .8][st.pack], pw = (hard ? st.thrust / 70 : 1) * pk, canT = !hard || A.fuel > 0;
        if (mag > 0 && canT) { A.vx += ix / mag * 150 * pw * dt; A.vy += iy / mag * 150 * pw * dt; if (hard) A.fuel = Math.max(0, A.fuel - 8 * dt); if (Math.random() < dt * 30) fx.burst(A.x - ix / mag * 18, A.y + 22 - iy / mag * 18, ["#ff8a1f", "#ffe35c", "#fff"], 1, 40); }
        const damp = hard ? 0 : (med ? .6 : 1.4); A.vx -= A.vx * damp * dt; A.vy -= A.vy * damp * dt; const sp = Math.hypot(A.vx, A.vy), mx = hard ? 260 : 200; if (sp > mx) { A.vx *= mx / sp; A.vy *= mx / sp; }
        A.x += A.vx * dt; A.y += A.vy * dt;
        if (A.x < 30) { A.x = 30; A.vx = Math.abs(A.vx) * .5; } if (A.x > W - 30) { A.x = W - 30; A.vx = -Math.abs(A.vx) * .5; } if (A.y < 50) { A.y = 50; A.vy = Math.abs(A.vy) * .5; } if (A.y > H - 40) { A.y = H - 40; A.vy = -Math.abs(A.vy) * .5; }
        const ds = Math.hypot(A.x - stn.x, A.y - stn.y); if (ds < 60 && hard && A.fuel < 100) { A.fuel = Math.min(100, A.fuel + 40 * dt); if (T % 1 < dt) msg = "Refuelling at the station"; msgT = .6; }
        if (ds > 330) { A.vx += (stn.x - A.x) / ds * 70 * dt; A.vy += (stn.y - A.y) / ds * 70 * dt; }
        // tether
        q.strokeStyle = "rgba(255,255,255,.7)"; q.lineWidth = 2; q.beginPath(); q.moveTo(stn.x, stn.y); const mxp = (stn.x + A.x) / 2, myp = (stn.y + A.y) / 2 + Math.max(10, 80 - ds * .2); q.quadraticCurveTo(mxp, myp, A.x, A.y - 4); q.stroke();
        // items
        for (let i = items.length - 1; i >= 0; i--) {
          const it = items[i]; it.ph += dt; const ox = Math.sin(it.ph * .8) * 14, oy = Math.cos(it.ph * 1.1) * 10;
          if (it.fix) { it.fix += dt; it.x += 60 * dt; if (it.fix > 2.2) { items.splice(i, 1); spawn(); continue; } }
          q.save(); q.translate(it.x + ox, it.y + oy); q.rotate(it.t === 0 ? it.ph * 1.2 : Math.sin(it.ph) * .4); if (it.fix) q.globalAlpha = Math.max(0, 1.4 - it.fix * .6); itemD(q, it, T); q.restore(); q.globalAlpha = 1;
          if (!it.fix && Math.hypot(A.x - (it.x + ox), A.y - (it.y + oy)) < 34) {
            const pts = [1, 2, 5][it.t]; total += pts; g.add(pts); fx.burst(it.x + ox, it.y + oy, it.t === 2 ? ["#6be28f", "#fff"] : ["#ffd93d", "#fff"], 16, 120); g.sfx(it.t === 2 ? "cheer" : "star"); g.pop("+" + pts, it.x + ox, it.y + oy - 10, "#ffd34e");
            if (it.t === 2) { it.fix = .01; msg = "Satellite fixed!"; msgT = 2; } else { items.splice(i, 1); spawn(); }
          }
        }
        if (total > best) { best = total; save(); }
        // astronaut
        const th = mag > 0 && canT ? { l: Math.min(1, mag), a: Math.atan2(-ix / mag, iy / mag) * -1 } : null;
        q.save(); q.translate(A.x, A.y); q.rotate(g.clamp(A.vx * .004, -.35, .35) + Math.sin(T * 1.4) * .04); q.scale(.62, .62); astD(q, st, T, th ? { l: th.l, a: Math.atan2(ix, -iy) } : null); q.restore();
        fx.draw(q, dt);
        tx(q, "Collected: " + total, 12, 26, "#fff", 18, "left"); tx(q, "Stars 1   Tools 2   Fix satellites 5", 12, 46, "#cfe9ff", 12, "left");
        if (hard) { q.fillStyle = "rgba(0,0,0,.5)"; q.fillRect(W - 112, 12, 100, 12); q.fillStyle = A.fuel > 20 ? "#6be28f" : "#ff6b6b"; q.fillRect(W - 112, 12, A.fuel, 12); tx(q, "Jetpack fuel", W - 62, 40, "#fff", 12); }
        if (msgT > 0) { msgT -= dt; tx(q, msg, W / 2, H - 14, "#ffd34e", 16); }
      });
    }
  });

})();
