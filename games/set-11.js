// Break Time Games: set 11 (Art & design makers)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---------- shared helpers for the makers ----------
  const PAL = ["#ff5c7a", "#ff9f43", "#ffd93d", "#6be28f", "#3ec1ff", "#7b6cff", "#c86bff", "#ff8fd0", "#8b5a2b", "#ffffff", "#2b3245", "#14c8b0"];
  const OUT = "#2b3245", PI = Math.PI, PI2 = Math.PI * 2;
  // filled shape with a cartoon outline
  const sh = (q, col, f, lw) => { q.beginPath(); f(q); q.lineJoin = "round"; q.lineCap = "round"; q.strokeStyle = OUT; q.lineWidth = lw || 8; q.stroke(); q.fillStyle = col; q.fill(); };
  // thick outlined line
  const ln = (q, col, w, f) => { q.beginPath(); f(q); q.lineCap = "round"; q.lineJoin = "round"; q.strokeStyle = OUT; q.lineWidth = w + 7; q.stroke(); q.strokeStyle = col; q.lineWidth = w; q.stroke(); };
  const dot = (q, col, px, py, r) => { q.fillStyle = col; q.beginPath(); q.arc(px, py, r, 0, 7); q.fill(); };
  const mkBar = g => { const d = g.html(""); d.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:5px 8px;justify-content:center;align-items:center;max-width:100%"; return d; };
  const mkBtn = (g, d, text, fn) => { const b = document.createElement("button"); b.className = "bg-btn"; b.type = "button"; b.textContent = text; b.style.minHeight = "38px"; b.style.minWidth = "40px"; d.appendChild(b); g.on(b, "click", () => { g.sfx("click"); fn(b); }); return b; };
  const mkLabel = (d, text) => { const s = document.createElement("b"); s.textContent = text; s.style.cssText = "font-size:14px"; d.appendChild(s); return s; };
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
  const hl = (b, on) => { b.style.background = on ? "#ffd34e" : ""; b.style.color = on ? "#222" : ""; };
  const mkHist = (g, get, set) => { const H = []; return { push() { H.push(JSON.stringify(get())); if (H.length > 60) H.shift(); g.save(get()); }, undo() { if (H.length > 1) { H.pop(); set(JSON.parse(H[H.length - 1])); g.save(get()); g.sfx("back"); } else g.sfx("wrong"); } }; };
  const mkFx = () => {
    const P = [];
    return {
      burst(px, py, col, n, sp) { for (let i = 0; i < (n || 12); i++) { const a = Math.random() * PI2, s = (sp || 140) * (.3 + Math.random()); P.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, l: .7, c: Array.isArray(col) ? col[i % col.length] : (col || "#fff"), r: 2 + Math.random() * 3 }); } },
      draw(q, dt) { for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.l -= dt; if (p.l <= 0) { P.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 200 * dt; q.globalAlpha = Math.min(1, p.l * 2); dot(q, p.c, p.x, p.y, p.r); } q.globalAlpha = 1; }
    };
  };
  // the standard last buttons: Save picture + Finish
  const mkEnd = (g, d, cv, name) => { mkBtn(g, d, "Save picture", () => g.saveImage(cv, name)); mkBtn(g, d, "Finish", () => g.over("Nice work!")); };
  // drag helper: picks the topmost item within radius
  const hitTop = (items, p, rad) => { for (let i = items.length - 1; i >= 0; i--) { const it = items[i], r = rad(it); if (Math.abs(it.x - p.x) < r.w && Math.abs(it.y - p.y) < r.h) return i; } return -1; };

  // ---- Monster Mixer ----
  B.add({
    id: "s11-monster", name: "Monster Mixer", ages: [5, 12], cat: "Creative", color: "#7b6cff", icon: "M",
    desc: "Mix heads, bodies, eyes and colours to invent your very own monster.", controls: "Pick a part type, tap a drawing, pick colours. Tap the monster to make it jump",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(420, 420), fx = mkFx();
      const n = g.by(3, 4, 5), cats = g.by(["Head", "Body", "Eyes"], ["Head", "Body", "Eyes", "Arms", "Mouth"], ["Head", "Body", "Eyes", "Arms", "Mouth", "Extra"]);
      const KEY = { Head: "h", Body: "b", Eyes: "e", Arms: "a", Mouth: "m", Extra: "x" }, cols = PAL.slice(0, g.by(6, 9, 12));
      let st = Object.assign({ h: 0, b: 0, e: 1, a: 0, m: 0, x: 0, c: cols[3], c2: cols[1] }, g.load() || {});
      ["h", "b", "e", "a", "m", "x"].forEach(k => { st[k] = (((st[k] | 0) % n) + n) % n; });
      let T = 0, blink = false, blinkT = 2, bl = 0, look = { x: 0, y: 0 }, jy = 0, jv = 0, cur = cats[0], curBs = [];
      const eye = (q, ex, ey, r) => {
        if (blink) { q.beginPath(); q.moveTo(ex - r, ey); q.lineTo(ex + r, ey); q.strokeStyle = OUT; q.lineWidth = 5; q.lineCap = "round"; q.stroke(); return; }
        sh(q, "#fff", q => q.arc(ex, ey, r, 0, 7), 5); const px = ex + look.x * r * .4, py = ey + look.y * r * .4;
        dot(q, OUT, px, py, r * .5); dot(q, "#fff", px - r * .15, py - r * .18, r * .15);
      };
      const HEAD = [
        (q, k) => sh(q, k, q => q.arc(0, 0, 60, 0, 7)),
        (q, k) => sh(q, k, q => q.roundRect(-58, -50, 116, 100, 26)),
        (q, k) => sh(q, k, q => q.ellipse(0, 0, 46, 68, 0, 0, 7)),
        (q, k) => sh(q, k, q => { q.moveTo(0, -64); q.lineTo(64, 48); q.quadraticCurveTo(0, 68, -64, 48); q.closePath(); }),
        (q, k) => sh(q, k, q => { [[-38, 10], [0, -18], [38, 10], [-20, 28], [22, 28]].forEach(p => { q.moveTo(p[0] + 34, p[1]); q.arc(p[0], p[1], 34, 0, 7); }); })
      ];
      const BODY = [
        (q, k) => sh(q, k, q => q.ellipse(0, 0, 56, 64, 0, 0, 7)),
        (q, k) => sh(q, k, q => { q.ellipse(0, -22, 36, 40, 0, 0, 7); q.moveTo(60, 18); q.ellipse(0, 18, 60, 46, 0, 0, 7); }),
        (q, k) => sh(q, k, q => q.roundRect(-52, -56, 104, 116, 18)),
        (q, k) => sh(q, k, q => q.ellipse(0, 0, 42, 72, 0, 0, 7)),
        (q, k) => sh(q, k, q => { q.moveTo(0, -62); q.lineTo(62, 56); q.lineTo(-62, 56); q.closePath(); })
      ];
      const body = (q, i, k, k2) => { [-28, 28].forEach(s => sh(q, k2, q => q.ellipse(s, 62, 20, 11, 0, 0, 7))); BODY[i](q, k); q.fillStyle = "rgba(255,255,255,.3)"; q.beginPath(); q.ellipse(0, 14, 26, 30, 0, 0, 7); q.fill(); };
      const ARM = [
        (q, k, s) => sh(q, k, q => q.ellipse(s * 10, 12, 16, 22, 0, 0, 7)),
        (q, k, s) => ln(q, k, 12, q => { q.moveTo(0, 0); q.quadraticCurveTo(s * 45, -10, s * 50, 40); }),
        (q, k, s) => { ln(q, k, 12, q => { q.moveTo(0, 5); q.lineTo(s * 16, 22); }); sh(q, k, q => q.arc(s * 22, 24, 22, 0, 7)); },
        (q, k, s) => { ln(q, k, 12, q => { q.moveTo(0, 0); q.lineTo(s * 38, -40); }); sh(q, k, q => q.arc(s * 40, -42, 13, 0, 7)); },
        (q, k, s) => sh(q, k, q => { q.moveTo(0, -10); q.quadraticCurveTo(s * 82, -70, s * 67, 30); q.quadraticCurveTo(s * 42, 0, 0, 25); q.closePath(); })
      ];
      const arms = (q, i, k, flap) => [-1, 1].forEach(s => { q.save(); q.translate(s * 50, 0); if (flap) q.rotate(s * Math.sin(T * 4) * .12); ARM[i](q, k, s); q.restore(); });
      const EYES = [
        (q, k) => eye(q, 0, -6, 26),
        (q, k) => { eye(q, -22, -8, 15); eye(q, 22, -8, 15); },
        (q, k) => { eye(q, -32, -2, 12); eye(q, 0, -20, 12); eye(q, 32, -2, 12); },
        (q, k) => [-22, 22].forEach(ex => { if (blink) { q.beginPath(); q.moveTo(ex - 8, -6); q.lineTo(ex + 8, -6); q.strokeStyle = OUT; q.lineWidth = 5; q.stroke(); } else { dot(q, OUT, ex + look.x * 3, -6 + look.y * 3, 9); dot(q, "#fff", ex + look.x * 3 - 3, -9 + look.y * 3, 3); } }),
        (q, k) => [-1, 1].forEach(s => { ln(q, k, 7, q => { q.moveTo(s * 20, -40); q.lineTo(s * 30, -80); }); eye(q, s * 30, -84, 14); })
      ];
      const MOUTH = [
        q => { q.beginPath(); q.arc(0, 10, 26, .15 * PI, .85 * PI); q.strokeStyle = OUT; q.lineWidth = 6; q.lineCap = "round"; q.stroke(); },
        q => { sh(q, "#7a1f3d", q => q.roundRect(-26, 8, 52, 32, 10), 5); q.fillStyle = "#fff"; q.fillRect(-20, 10, 12, 9); q.fillRect(8, 10, 12, 9); },
        q => { sh(q, "#ff6f91", q => q.ellipse(8, 30, 10, 15, 0, 0, 7), 5); q.beginPath(); q.arc(0, 10, 26, .15 * PI, .85 * PI); q.strokeStyle = OUT; q.lineWidth = 6; q.stroke(); },
        q => { sh(q, "#7a1f3d", q => q.roundRect(-28, 10, 56, 24, 8), 5); q.fillStyle = "#fff"; [[-20, -8, -14], [8, 20, 14]].forEach(t => { q.beginPath(); q.moveTo(t[0], 11); q.lineTo(t[1], 11); q.lineTo(t[2], 28); q.fill(); }); },
        q => sh(q, "#7a1f3d", q => q.ellipse(0, 26, 12, 15, 0, 0, 7), 5)
      ];
      const EXTRA = [
        null,
        (q, k) => [-1, 1].forEach(s => sh(q, k, q => { q.moveTo(s * 20, -50); q.lineTo(s * 46, -100); q.lineTo(s * 48, -38); q.closePath(); })),
        (q, k) => { ln(q, k, 6, q => { q.moveTo(0, -58); q.lineTo(0, -100); }); sh(q, k, q => q.arc(0, -106 + Math.sin(T * 5) * 3, 11, 0, 7), 5); },
        (q, k) => [-1, 1].forEach(s => sh(q, k, q => q.arc(s * 64, -8, 22, 0, 7))),
        (q, k) => sh(q, k, q => { q.moveTo(-30, -52); q.lineTo(-20, -95); q.lineTo(-8, -56); q.lineTo(0, -105); q.lineTo(8, -56); q.lineTo(20, -95); q.lineTo(30, -52); q.closePath(); })
      ];
      const mon = (q, o) => {
        q.save(); q.translate(0, 60); arms(q, o.a, o.c2, true); body(q, o.b, o.c, o.c2); q.restore();
        q.save(); q.translate(0, -45); if (o.x && EXTRA[o.x]) EXTRA[o.x](q, o.c2); HEAD[o.h](q, o.c); EYES[o.e](q, o.c); MOUTH[o.m](q); q.restore();
      };
      const part = (cat, i) => (q, w, h) => {
        const k = { Head: .4, Body: .36, Eyes: .5, Arms: .24, Mouth: .5, Extra: .38 }[cat], A = "#b9a7ff", Bc = "#ffb86b";
        q.translate(w / 2, h / 2 + (cat === "Extra" ? 14 : 0)); q.scale(k, k);
        if (cat === "Head") HEAD[i](q, A); else if (cat === "Body") body(q, i, A, Bc);
        else if (cat === "Arms") { arms(q, i, Bc, false); BODY[0](q, A); }
        else if (cat === "Eyes") { HEAD[0](q, A); EYES[i](q, A); } else if (cat === "Mouth") { HEAD[0](q, A); MOUTH[i](q); }
        else { if (EXTRA[i]) EXTRA[i](q, Bc); HEAD[0](q, A); }
      };
      const hist = mkHist(g, () => st, o => { st = o; buildRow(); sc1(st.c); if (sc2) sc2(st.c2); });
      const chg = () => { hist.push(); g.add(1); g.sfx("pop"); if (jy < 20) jv = 300; fx.burst(210, 200, [st.c, st.c2, "#fff"], 16); };
      const tabs = mkBar(g), row = mkBar(g), cr = mkBar(g), act = mkBar(g), tabBtns = {};
      const buildRow = () => {
        row.innerHTML = ""; const k = KEY[cur], bs = [];
        for (let i = 0; i < n; i++) bs.push(mkThumb(g, row, 64, 64, part(cur, i), () => { if (st[k] === i) return; st[k] = i; mark(bs, i); chg(); }));
        mark(bs, st[k]); curBs = bs; cats.forEach(k2 => hl(tabBtns[k2], k2 === cur));
      };
      cats.forEach(k => { tabBtns[k] = mkBtn(g, tabs, k, () => { cur = k; buildRow(); }); });
      mkLabel(cr, "Colour"); const sc1 = mkSwatches(g, cr, cols, st.c, v => { st.c = v; chg(); }); let sc2 = null;
      if (g.diff > 0) { mkLabel(cr, "Extras"); sc2 = mkSwatches(g, cr, cols, st.c2, v => { st.c2 = v; chg(); }); }
      buildRow();
      mkBtn(g, act, "Undo", () => hist.undo());
      mkBtn(g, act, "Surprise me", () => { cats.forEach(k => { st[KEY[k]] = g.ri(0, n - 1); }); st.c = g.pick(cols); st.c2 = g.pick(cols); buildRow(); sc1(st.c); if (sc2) sc2(st.c2); chg(); });
      mkBtn(g, act, "New", () => { st = { h: 0, b: 0, e: 1, a: 0, m: 0, x: 0, c: cols[3], c2: cols[1] }; buildRow(); sc1(st.c); if (sc2) sc2(st.c2); hist.push(); g.sfx("swish"); });
      mkEnd(g, act, c, "my-monster"); hist.push();
      g.on(c, "pointerdown", e => { const p = pos(e); look.x = g.clamp((p.x - 210) / 150, -1, 1); look.y = g.clamp((p.y - 200) / 150, -1, 1); if (jy < 20) jv = 330; g.sfx("pop"); fx.burst(p.x, p.y, ["#ffd93d", "#fff"], 8); });
      g.on(c, "pointermove", e => { const p = pos(e); look.x = g.clamp((p.x - 210) / 150, -1, 1); look.y = g.clamp((p.y - 200) / 150, -1, 1); });
      const stars = Array.from({ length: 20 }, () => [g.rf(0, 420), g.rf(0, 300), g.rf(0, 6)]);
      g.loop((dt, t) => {
        T = t; blinkT -= dt; if (blinkT <= 0) { blink = true; bl = .13; blinkT = g.rf(2, 4); } if (bl > 0) { bl -= dt; if (bl <= 0) blink = false; }
        if (jy > 0 || jv > 0) { jv -= 900 * dt; jy += jv * dt; if (jy <= 0) { jy = 0; jv = 0; g.sfx("thump"); } }
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#5b4bb8"); gr.addColorStop(1, "#ff9ad5"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        stars.forEach(s => { x.globalAlpha = .4 + .6 * Math.abs(Math.sin(t * 2 + s[2])); dot(x, "#fff", s[0], s[1], 2); }); x.globalAlpha = 1;
        x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(210, 386, Math.max(2, 90 * (1 - jy / 500)), 13, 0, 0, 7); x.fill();
        x.save(); x.translate(210, 205 - jy + Math.sin(t * 3) * 3); const sq = jy > 0 ? .07 : Math.sin(t * 3) * .025; x.scale(1.3 * (1 - sq), 1.3 * (1 + sq)); mon(x, st); x.restore();
        fx.draw(x, dt);
      });
    }
  });

  // ---- Face Factory ----
  B.add({
    id: "s11-face", name: "Face Factory", ages: [5, 14], cat: "Creative", color: "#ff8fd0", icon: "F",
    desc: "Build a funny face with hair, eyes, mouths and more. Tap the face to change a part!", controls: "Use the arrows, or tap the part of the face you want to change",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(400, 400), fx = mkFx();
      const skins = ["#ffe0c2", "#f5c79c", "#e0a878", "#b9805a", "#8a5a3b", "#5e3a24", "#b7e07a", "#9ad8ff"], hairs = ["#2b1a10", "#6b3e1e", "#c98a3d", "#f5d36b", "#d8483d", "#7b6cff", "#ff8fd0", "#3ec1ff", "#e8e8e8"];
      const lim = g.by(4, 6, 6), R = (k, l, m) => ({ k, label: l, n: Math.min(m, lim) });
      const rows = g.by([R("hair", "Hair", 6), R("eyes", "Eyes", 5), R("mouth", "Mouth", 5)],
        [R("face", "Face", 4), R("hair", "Hair", 6), R("brows", "Brows", 3), R("eyes", "Eyes", 5), R("mouth", "Mouth", 5)],
        [R("face", "Face", 4), R("hair", "Hair", 6), R("brows", "Brows", 3), R("eyes", "Eyes", 5), R("nose", "Nose", 3), R("mouth", "Mouth", 5), R("extra", "Extra", 4)]);
      let st = Object.assign({ face: 0, hair: 1, brows: 0, eyes: 0, nose: 0, mouth: 0, extra: 0, skin: skins[1], hc: hairs[1] }, g.load() || {});
      rows.forEach(r => { st[r.k] = (((st[r.k] | 0) % r.n) + r.n) % r.n; });
      let T = 0, blink = false, blinkT = 2, bl = 0, wink = 0, look = { x: 0, y: 0 }, pop = 0;
      const FACE = [q => q.ellipse(0, 0, 105, 115, 0, 0, 7), q => q.ellipse(0, 10, 90, 135, 0, 0, 7), q => q.roundRect(-100, -110, 200, 220, 55),
        q => { q.moveTo(-105, -30); q.bezierCurveTo(-110, -130, 110, -130, 105, -30); q.bezierCurveTo(100, 50, 40, 120, 0, 125); q.bezierCurveTo(-40, 120, -100, 50, -105, -30); }];
      const cap = q => { q.ellipse(0, -62, 112, 66, 0, PI, PI2); q.closePath(); };
      const HB = [null, null, (q, k) => sh(q, k, q => q.roundRect(-122, -105, 244, 280, 70)), (q, k) => [-1, 1].forEach(s => { sh(q, k, q => q.arc(s * 125, 10, 38, 0, 7)); sh(q, "#ff5c7a", q => q.arc(s * 116, -40, 10, 0, 7), 4); }), null, null];
      const HF = [null, (q, k) => sh(q, k, cap), (q, k) => sh(q, k, cap), (q, k) => sh(q, k, cap),
        (q, k) => sh(q, k, q => { q.moveTo(-112, -60); q.lineTo(-92, -150); q.lineTo(-55, -98); q.lineTo(-30, -170); q.lineTo(0, -100); q.lineTo(30, -170); q.lineTo(55, -98); q.lineTo(92, -150); q.lineTo(112, -60); q.closePath(); }),
        (q, k) => { sh(q, k, cap); for (let i = 0; i < 7; i++) { const a = PI + i * PI / 6; sh(q, k, q => q.arc(Math.cos(a) * 104, -62 + Math.sin(a) * 62, 24, 0, 7), 5); } }];
      const eyes = (q, i, sk) => [-1, 1].forEach(s => {
        const ex = s * 44, cl = blink || (wink > 0 && s > 0), lx = look.x * 5, ly = look.y * 4;
        if (i === 2) { q.beginPath(); q.arc(ex, -2, 16, PI * 1.1, PI * 1.9); q.strokeStyle = OUT; q.lineWidth = 6; q.lineCap = "round"; q.stroke(); return; }
        if (cl) { q.beginPath(); q.moveTo(ex - 16, -8); q.lineTo(ex + 16, -8); q.strokeStyle = OUT; q.lineWidth = 6; q.lineCap = "round"; q.stroke(); return; }
        if (i === 0) { sh(q, "#fff", q => q.arc(ex, -8, 17, 0, 7), 5); dot(q, OUT, ex + lx, -8 + ly, 8); dot(q, "#fff", ex + lx - 3, -11 + ly, 3); }
        else if (i === 1) { sh(q, "#fff", q => q.ellipse(ex, -8, 17, 24, 0, 0, 7), 5); q.fillStyle = "#3a6fd8"; q.beginPath(); q.ellipse(ex + lx, -8 + ly, 12, 18, 0, 0, 7); q.fill(); dot(q, OUT, ex + lx, -8 + ly, 7); dot(q, "#fff", ex + lx - 4, -15 + ly, 4); dot(q, "#fff", ex + lx + 4, -2 + ly, 2); }
        else if (i === 3) { dot(q, OUT, ex + lx * .5, -8 + ly * .5, 9); dot(q, "#fff", ex + lx * .5 - 3, -11, 3); }
        else { sh(q, "#fff", q => q.arc(ex, -8, 17, 0, 7), 5); dot(q, OUT, ex + lx, -4 + ly, 7); q.fillStyle = sk; q.beginPath(); q.arc(ex, -8, 18, PI, PI2); q.fill(); q.beginPath(); q.moveTo(ex - 18, -8); q.lineTo(ex + 18, -8); q.strokeStyle = OUT; q.lineWidth = 4; q.stroke(); }
      });
      const brows = (q, i) => [-1, 1].forEach(s => { const by = Math.sin(T * 2) * 1.5; ln(q, OUT, 5, q => { if (i === 0) { q.moveTo(s * 26, -42 + by); q.lineTo(s * 64, -42 + by); } else if (i === 1) { q.moveTo(s * 24, -34); q.lineTo(s * 66, -52); } else { q.moveTo(s * 26, -40 + by); q.quadraticCurveTo(s * 46, -64 + by, s * 66, -40 + by); } }); });
      const nose = (q, i, sk) => { if (i === 0) { q.fillStyle = "rgba(0,0,0,.28)"; q.beginPath(); q.ellipse(0, 20, 7, 5, 0, 0, 7); q.fill(); } else if (i === 1) { q.beginPath(); q.moveTo(0, -5); q.lineTo(-9, 24); q.lineTo(7, 24); q.strokeStyle = OUT; q.lineWidth = 4; q.lineCap = "round"; q.lineJoin = "round"; q.stroke(); } else { sh(q, sk, q => q.arc(0, 20, 13, 0, 7), 5); dot(q, "rgba(255,120,120,.5)", 0, 20, 8); } };
      const mouth = (q, i) => {
        const smile = () => { q.beginPath(); q.arc(0, 40, 38, .15 * PI, .85 * PI); q.strokeStyle = OUT; q.lineWidth = 6; q.lineCap = "round"; q.stroke(); };
        if (i === 0) smile(); else if (i === 1) { sh(q, "#7a1f3d", q => { q.moveTo(-40, 46); q.arc(0, 46, 40, 0, PI); q.closePath(); }, 5); q.save(); q.clip(); q.fillStyle = "#fff"; q.fillRect(-34, 46, 68, 12); q.restore(); }
        else if (i === 2) sh(q, "#7a1f3d", q => q.ellipse(0, 62, 14, 18, 0, 0, 7), 5);
        else if (i === 3) { sh(q, "#ff6f91", q => q.ellipse(10, 68, 11, 15, 0, 0, 7), 5); smile(); }
        else { q.beginPath(); q.moveTo(-28, 52); q.quadraticCurveTo(-14, 72, 0, 52); q.quadraticCurveTo(14, 72, 28, 52); q.strokeStyle = OUT; q.lineWidth = 5; q.lineCap = "round"; q.stroke(); }
      };
      const extra = (q, i) => {
        if (i === 1) { [-1, 1].forEach(s => { q.fillStyle = "rgba(190,225,255,.35)"; q.beginPath(); q.arc(s * 44, -8, 28, 0, 7); q.fill(); q.beginPath(); q.arc(s * 44, -8, 28, 0, 7); q.strokeStyle = OUT; q.lineWidth = 6; q.stroke(); }); q.beginPath(); q.moveTo(-16, -8); q.lineTo(16, -8); q.stroke(); }
        else if (i === 2) { [-1, 1].forEach(s => { dot(q, "rgba(255,100,120,.35)", s * 64, 28, 16); [[-8, 0], [4, -6], [8, 6]].forEach(d => dot(q, "#a8603a", s * 64 + d[0], 28 + d[1], 2.5)); }); }
        else if (i === 3) { sh(q, "#ffd34e", q => { q.moveTo(-45, -108); q.lineTo(0, -215); q.lineTo(45, -108); q.closePath(); }); [-1, 1].forEach(s => ln(q, "#ff5c7a", 6, q => { q.moveTo(s * 14, -150); q.lineTo(s * 24, -128); })); sh(q, "#ff5c7a", q => q.arc(0, -218 + Math.sin(T * 5) * 2, 10, 0, 7), 4); }
      };
      const draw = (q, o) => {
        [-1, 1].forEach(s => sh(q, o.skin, q => q.arc(s * 98, 5, 22, 0, 7), 6));
        if (HB[o.hair]) HB[o.hair](q, o.hc);
        sh(q, "#4aa3ff", q => q.ellipse(0, 190, 150, 90, 0, 0, 7)); sh(q, o.skin, q => q.roundRect(-34, 80, 68, 80, 14), 6);
        sh(q, o.skin, FACE[o.face]);
        if (HF[o.hair]) HF[o.hair](q, o.hc);
        brows(q, rows.some(r => r.k === "brows") ? o.brows : 0); eyes(q, o.eyes, o.skin); nose(q, o.nose, o.skin); mouth(q, o.mouth); extra(q, o.extra);
      };
      const hist = mkHist(g, () => st, o => { st = o; lab(); sw1(st.skin); sw2(st.hc); });
      const ctrl = mkBar(g), cr = mkBar(g), act = mkBar(g), spans = {};
      const lab = () => rows.forEach(r => { spans[r.k].textContent = r.label + " " + (st[r.k] + 1) + "/" + r.n; });
      const chg = () => { lab(); hist.push(); g.add(1); g.sfx("pop"); pop = .3; fx.burst(200, 215, ["#ffd93d", "#ff8fd0", "#fff"], 14); };
      const step = (k, d) => { const r = rows.find(z => z.k === k); if (!r) return false; st[k] = (st[k] + d + r.n) % r.n; chg(); return true; };
      rows.forEach(r => { const w = document.createElement("div"); w.style.cssText = "display:flex;align-items:center;gap:4px"; ctrl.appendChild(w); mkBtn(g, w, "<", () => step(r.k, -1)); const s = document.createElement("span"); s.style.cssText = "min-width:78px;text-align:center;font-weight:700;font-size:14px"; w.appendChild(s); spans[r.k] = s; mkBtn(g, w, ">", () => step(r.k, 1)); });
      mkLabel(cr, "Skin"); const sw1 = mkSwatches(g, cr, skins.slice(0, g.by(6, 8, 8)), st.skin, v => { st.skin = v; chg(); });
      mkLabel(cr, "Hair colour"); const sw2 = mkSwatches(g, cr, hairs, st.hc, v => { st.hc = v; chg(); });
      lab();
      mkBtn(g, act, "Undo", () => hist.undo());
      mkBtn(g, act, "Surprise me", () => { rows.forEach(r => { st[r.k] = g.ri(0, r.n - 1); }); st.skin = g.pick(skins); st.hc = g.pick(hairs); sw1(st.skin); sw2(st.hc); chg(); });
      mkEnd(g, act, c, "my-face"); hist.push();
      g.on(c, "pointerdown", e => {
        const p = pos(e), ry = p.y - 215; wink = .4;
        if (ry < -75) step("hair", 1) || chg(); else if (ry < 15) step("eyes", 1) || chg(); else if (ry < 42) step("nose", 1) || step("mouth", 1) || chg(); else step("mouth", 1) || chg();
      });
      g.on(c, "pointermove", e => { const p = pos(e); look.x = g.clamp((p.x - 200) / 150, -1, 1); look.y = g.clamp((p.y - 215) / 150, -1, 1); });
      g.loop((dt, t) => {
        T = t; blinkT -= dt; if (blinkT <= 0) { blink = true; bl = .13; blinkT = g.rf(2, 4.5); } if (bl > 0) { bl -= dt; if (bl <= 0) blink = false; } if (wink > 0) wink -= dt; if (pop > 0) pop -= dt;
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#fff1a8"); gr.addColorStop(1, "#ffb3d9"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        for (let i = 0; i < 8; i++) { x.globalAlpha = .35; dot(x, "#fff", (i * 97 + t * 14) % 440 - 20, 40 + (i * 53) % 320, 18 + (i % 3) * 8); } x.globalAlpha = 1;
        x.save(); x.translate(200, 215); x.rotate(Math.sin(t * 1.5) * .03); const s = 1 + Math.max(0, pop) * .15; x.scale(.95 * s, .95 * s); draw(x, st); x.restore();
        fx.draw(x, dt);
      });
    }
  });

  // ---- Kaleidoscope Drawer ----
  B.add({
    id: "s11-mandala", name: "Kaleidoscope Drawer", ages: [6, 20], cat: "Creative", color: "#c86bff", icon: "K",
    desc: "Draw with your finger and watch it copy itself into a glowing mandala.", controls: "Draw anywhere on the circle. Try Spin, colours and the symmetry buttons",
    start(g) {
      const S = 600, { c, x, W, H, pos } = g.canvas(S, S), fx = mkFx();
      const layer = document.createElement("canvas"); layer.width = S; layer.height = S; const q = layer.getContext("2d");
      let N = g.by(6, 8, 8), mir = true, spin = false, ang = 0, wi = 0, col = "rb", glow = g.diff > 0, strokes = Array.isArray(g.load()) ? g.load() : [], cur = null, hover = null, cleared = null;
      const ws = g.by([12], [5, 10, 18], [2, 5, 10, 18, 30]);
      const seg = (s, x1, y1, x2, y2, hue) => {
        q.strokeStyle = s.c === "rb" ? "hsl(" + (hue % 360) + ",90%,62%)" : s.c; q.lineWidth = s.w; q.lineCap = "round";
        if (s.g) { q.shadowColor = q.strokeStyle; q.shadowBlur = 12; } else q.shadowBlur = 0;
        for (let i = 0; i < s.n; i++) { q.save(); q.translate(S / 2, S / 2); q.rotate(i * PI2 / s.n); q.beginPath(); q.moveTo(x1, y1); q.lineTo(x2, y2); q.stroke(); if (s.m) { q.scale(1, -1); q.beginPath(); q.moveTo(x1, y1); q.lineTo(x2, y2); q.stroke(); } q.restore(); }
      };
      const replay = () => { q.clearRect(0, 0, S, S); strokes.forEach(s => { if (s.p.length === 2) seg(s, s.p[0], s.p[1], s.p[0] + .1, s.p[1], s.h); for (let j = 2; j < s.p.length; j += 2) seg(s, s.p[j - 2], s.p[j - 1], s.p[j], s.p[j + 1], s.h + j * 2); }); };
      const keep = () => g.save(strokes.slice(-120));
      const rel = e => { const p = pos(e), dx = p.x - S / 2, dy = p.y - S / 2, ca = Math.cos(ang), sa = Math.sin(ang); return { x: Math.round(dx * ca + dy * sa), y: Math.round(-dx * sa + dy * ca), px: p.x, py: p.y }; };
      g.on(c, "pointerdown", e => { const r = rel(e); cur = { n: N, m: mir, c: col, w: ws[wi % ws.length], g: glow, h: g.ri(0, 359), p: [r.x, r.y] }; strokes.push(cur); seg(cur, r.x, r.y, r.x + .1, r.y, cur.h); g.sfx("note", 330 + g.ri(0, 6) * 55); hover = r; });
      g.on(c, "pointermove", e => {
        const r = rel(e); hover = r; if (!cur) return; const L = cur.p.length, px = cur.p[L - 2], py = cur.p[L - 1];
        if (Math.hypot(r.x - px, r.y - py) > 3) { cur.p.push(r.x, r.y); seg(cur, px, py, r.x, r.y, cur.h + L * 2); }
      });
      const up = () => { if (cur) { cur = null; g.add(1); keep(); if (g.rand() < .3) fx.burst(S / 2, S / 2, ["#fff", "#ffd93d"], 10, 200); } };
      g.on(c, "pointerup", up); g.on(c, "pointercancel", up); g.on(c, "pointerleave", () => { hover = null; up(); });
      const cols = PAL.slice(0, 10), bar1 = mkBar(g), bar2 = mkBar(g);
      if (g.diff > 0) { mkBtn(g, bar1, "Rainbow", () => { col = "rb"; }); mkSwatches(g, bar1, cols, "x", v => { col = v; }); }
      else mkLabel(bar1, "Draw on the picture!");
      let nb = null;
      if (g.diff > 0) mkBtn(g, bar2, "Brush size", () => { wi++; });
      if (g.diff > 1) { mkBtn(g, bar2, "- Sides", () => { N = Math.max(3, N - 1); nb.textContent = "Sides: " + N; }); nb = mkLabel(bar2, "Sides: " + N); mkBtn(g, bar2, "+ Sides", () => { N = Math.min(16, N + 1); nb.textContent = "Sides: " + N; }); mkBtn(g, bar2, "Mirror", () => { mir = !mir; }); mkBtn(g, bar2, "Glow", () => { glow = !glow; }); }
      mkBtn(g, bar2, "Spin", b => { spin = !spin; hl(b, spin); });
      mkBtn(g, bar2, "Undo", () => { if (strokes.length) { strokes.pop(); replay(); keep(); } else if (cleared) { strokes = cleared; cleared = null; replay(); keep(); } });
      mkBtn(g, bar2, "Clear", () => { if (strokes.length) { cleared = strokes; strokes = []; replay(); keep(); g.sfx("swish"); } });
      mkEnd(g, bar2, c, "my-mandala"); replay();
      g.loop((dt, t) => {
        if (spin) ang += dt * .35;
        const gr = x.createRadialGradient(S / 2, S / 2, 20, S / 2, S / 2, S * .7); gr.addColorStop(0, "#26195e"); gr.addColorStop(1, "#06061c"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.strokeStyle = "rgba(255,255,255,.08)"; x.lineWidth = 2; for (let r = 60; r < 300; r += 60) { x.beginPath(); x.arc(S / 2, S / 2, r, 0, 7); x.stroke(); }
        x.save(); x.translate(S / 2, S / 2); x.rotate(ang); x.translate(-S / 2, -S / 2); x.drawImage(layer, 0, 0, S, S); x.restore();
        if (hover && !cur) { const hx = hover.x, hy = hover.y; for (let i = 0; i < N; i++) { const a = i * PI2 / N + ang; dot(x, "rgba(255,255,255,.45)", S / 2 + hx * Math.cos(a) - hy * Math.sin(a), S / 2 + hx * Math.sin(a) + hy * Math.cos(a), 5); } }
        dot(x, "rgba(255,255,255," + (.3 + .2 * Math.sin(t * 3)) + ")", S / 2, S / 2, 6 + Math.sin(t * 3) * 2);
        fx.draw(x, dt);
      });
    }
  });

  // ---- Sticker Scene ----
  B.add({
    id: "s11-stickers", name: "Sticker Scene", ages: [5, 14], cat: "Creative", color: "#4cc3ff", icon: "S",
    desc: "Pick a background and stick drawings all over it to make your own scene.", controls: "Pick a sticker, tap the scene to place it, drag to move. Use the buttons to resize",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(600, 420), fx = mkFx();
      let T = 0;
      const rays = (q, k, n, r1, r2) => { for (let i = 0; i < n; i++) { q.save(); q.rotate(i * PI2 / n); sh(q, k, q => { q.moveTo(-7, -r1); q.lineTo(0, -r2); q.lineTo(7, -r1); q.closePath(); }, 5); q.restore(); } };
      const ST = [
        ["Sun", q => { q.save(); q.rotate(T * .5); rays(q, "#ffb21c", 8, 40, 62); q.restore(); sh(q, "#ffe14d", q => q.arc(0, 0, 38, 0, 7)); dot(q, OUT, -12, -6, 4); dot(q, OUT, 12, -6, 4); q.beginPath(); q.arc(0, 6, 14, .2 * PI, .8 * PI); q.strokeStyle = OUT; q.lineWidth = 4; q.stroke(); }],
        ["Cloud", q => sh(q, "#fff", q => { [[-28, 6, 20], [0, -8, 28], [30, 6, 22], [0, 12, 24]].forEach(p => { q.moveTo(p[0] + p[2], p[1]); q.arc(p[0], p[1], p[2], 0, 7); }); })],
        ["Tree", q => { sh(q, "#8b5a2b", q => q.roundRect(-9, 10, 18, 50, 4), 5); sh(q, "#3fb55b", q => { [[0, -26, 32], [-22, 2, 26], [22, 2, 26]].forEach(p => { q.moveTo(p[0] + p[2], p[1]); q.arc(p[0], p[1], p[2], 0, 7); }); }); }],
        ["House", q => { sh(q, "#ffd9a0", q => q.rect(-40, -10, 80, 60), 5); sh(q, "#e0543c", q => { q.moveTo(-50, -8); q.lineTo(0, -52); q.lineTo(50, -8); q.closePath(); }, 5); sh(q, "#8b5a2b", q => q.rect(-9, 20, 18, 30), 4); sh(q, "#9fe3ff", q => q.rect(14, 0, 18, 16), 4); }],
        ["Flower", q => { ln(q, "#3fb55b", 6, q => { q.moveTo(0, 0); q.lineTo(0, 56); }); for (let i = 0; i < 6; i++) { q.save(); q.rotate(i * PI2 / 6); sh(q, "#ff8fd0", q => q.arc(0, -22, 15, 0, 7), 5); q.restore(); } sh(q, "#ffd93d", q => q.arc(0, 0, 13, 0, 7), 5); }],
        ["Star", q => sh(q, "#ffd93d", q => { for (let i = 0; i < 10; i++) { const r = i % 2 ? 20 : 46, a = -PI / 2 + i * PI / 5; q.lineTo(Math.cos(a) * r, Math.sin(a) * r); } q.closePath(); })],
        ["Rocket", q => { sh(q, "#ff5c7a", q => { q.moveTo(-26, 20); q.lineTo(-48, 50); q.lineTo(-18, 38); q.closePath(); q.moveTo(26, 20); q.lineTo(48, 50); q.lineTo(18, 38); q.closePath(); }, 5); sh(q, "#eef3ff", q => { q.moveTo(0, -60); q.quadraticCurveTo(34, -20, 24, 40); q.lineTo(-24, 40); q.quadraticCurveTo(-34, -20, 0, -60); }); sh(q, "#3ec1ff", q => q.arc(0, -8, 11, 0, 7), 5); sh(q, "#ffb21c", q => { q.moveTo(-12, 42); q.lineTo(0, 42 + 18 + Math.sin(T * 20) * 6); q.lineTo(12, 42); q.closePath(); }, 4); }],
        ["Fish", q => { sh(q, "#ff9f43", q => { q.moveTo(30, 0); q.lineTo(54, -22); q.lineTo(54, 22); q.closePath(); }, 5); sh(q, "#ff9f43", q => q.ellipse(0, 0, 38, 26, 0, 0, 7)); dot(q, "#fff", -18, -6, 7); dot(q, OUT, -19, -6, 3.5); }],
        ["Cat", q => { sh(q, "#c9c2b5", q => { q.moveTo(-34, -18); q.lineTo(-30, -52); q.lineTo(-8, -32); q.closePath(); q.moveTo(34, -18); q.lineTo(30, -52); q.lineTo(8, -32); q.closePath(); }, 5); sh(q, "#c9c2b5", q => q.arc(0, 0, 38, 0, 7)); dot(q, OUT, -14, -4, 5); dot(q, OUT, 14, -4, 5); dot(q, "#ff8fa8", 0, 8, 4); q.strokeStyle = OUT; q.lineWidth = 2.5; [[-14, 10, -42, 4], [-14, 14, -42, 18], [14, 10, 42, 4], [14, 14, 42, 18]].forEach(l => { q.beginPath(); q.moveTo(l[0], l[1]); q.lineTo(l[2], l[3]); q.stroke(); }); }],
        ["Balloon", q => { ln(q, "#fff", 2, q => { q.moveTo(0, 36); q.quadraticCurveTo(10, 56, 0, 70); }); sh(q, "#ff5c7a", q => q.ellipse(0, 0, 30, 38, 0, 0, 7)); dot(q, "rgba(255,255,255,.6)", -10, -14, 7); }],
        ["Castle", q => { sh(q, "#c6c9d6", q => q.rect(-44, -10, 88, 60), 5); [-1, 1].forEach(s => { sh(q, "#c6c9d6", q => q.rect(s * 38 - 12, -40, 24, 90), 5); sh(q, "#e0543c", q => { q.moveTo(s * 38 - 16, -40); q.lineTo(s * 38, -66); q.lineTo(s * 38 + 16, -40); q.closePath(); }, 4); }); sh(q, "#6a4a2a", q => { q.moveTo(-12, 50); q.lineTo(-12, 22); q.arc(0, 22, 12, PI, PI2); q.lineTo(12, 50); q.closePath(); }, 4); }],
        ["UFO", q => { sh(q, "#9fe3ff", q => q.arc(0, -6, 24, PI, PI2), 5); sh(q, "#b4b8c8", q => q.ellipse(0, 4, 52, 16, 0, 0, 7)); for (let i = -1; i <= 1; i++) dot(q, i === 0 ? "#ffd93d" : "#ff5c7a", i * 28, 5, 4 + (Math.sin(T * 6 + i) > 0 ? 1.5 : 0)); }],
        ["Moon", q => sh(q, "#ffe9a8", q => { q.arc(0, 0, 40, -PI * .6, PI * .6, true); q.arc(30, 0, 56.9, PI * .7674, PI * 1.2326); q.closePath(); })],
        ["Mushroom", q => { sh(q, "#fff1d6", q => q.roundRect(-14, 0, 28, 44, 8), 5); sh(q, "#e0543c", q => q.arc(0, 4, 42, PI, PI2), 5); dot(q, "#fff", -18, -14, 7); dot(q, "#fff", 10, -24, 6); dot(q, "#fff", 24, -8, 5); }],
        ["Rainbow", q => { ["#ff5c7a", "#ffd93d", "#6be28f", "#3ec1ff"].forEach((k, i) => { q.beginPath(); q.arc(0, 24, 52 - i * 10, PI, PI2); q.strokeStyle = k; q.lineWidth = 11; q.stroke(); }); }],
        ["Robot", q => { ln(q, "#aab", 4, q => { q.moveTo(0, -48); q.lineTo(0, -64); }); dot(q, "#ff5c7a", 0, -66, 6); sh(q, "#9aa6c4", q => q.roundRect(-30, -46, 60, 46, 10)); sh(q, "#7d8aae", q => q.roundRect(-34, 4, 68, 50, 8)); dot(q, "#ffd93d", -12, -24, 7); dot(q, "#ffd93d", 12, -24, 7); q.fillStyle = OUT; q.fillRect(-12, -8, 24, 4); }]
      ];
      const nSt = g.by(6, 10, 16), BGN = ["Meadow", "Space", "Sea", "City", "Snow"], nBg = g.by(3, 4, 5);
      const BG = [
        (q, t) => { const gr = q.createLinearGradient(0, 0, 0, 420); gr.addColorStop(0, "#7fd0ff"); gr.addColorStop(1, "#e2f6ff"); q.fillStyle = gr; q.fillRect(0, 0, 600, 420); dot(q, "#5fcf6b", 120, 470, 230); dot(q, "#4cbb5b", 470, 480, 250); q.fillStyle = "#4cbb5b"; q.fillRect(0, 340, 600, 80); },
        (q, t) => { const gr = q.createLinearGradient(0, 0, 0, 420); gr.addColorStop(0, "#0a0a2e"); gr.addColorStop(1, "#3a2a78"); q.fillStyle = gr; q.fillRect(0, 0, 600, 420); for (let i = 0; i < 50; i++) { q.globalAlpha = .4 + .6 * Math.abs(Math.sin(t * 2 + i)); dot(q, "#fff", (i * 131) % 600, (i * 71) % 420, 1.5 + (i % 3) * .5); } q.globalAlpha = 1; dot(q, "#c86bff", 500, 330, 60); dot(q, "#8a3fd8", 480, 320, 44); },
        (q, t) => { const gr = q.createLinearGradient(0, 0, 0, 420); gr.addColorStop(0, "#3ec1ff"); gr.addColorStop(1, "#0b4a8c"); q.fillStyle = gr; q.fillRect(0, 0, 600, 420); q.fillStyle = "#f0d28a"; q.fillRect(0, 380, 600, 40); for (let i = 0; i < 12; i++) { q.globalAlpha = .5; dot(q, "#fff", (i * 53) % 600 + Math.sin(t + i) * 8, 400 - ((t * 30 + i * 70) % 400), 3 + i % 4); } q.globalAlpha = 1; },
        (q, t) => { const gr = q.createLinearGradient(0, 0, 0, 420); gr.addColorStop(0, "#ff9a6b"); gr.addColorStop(1, "#5b4bb8"); q.fillStyle = gr; q.fillRect(0, 0, 600, 420); for (let i = 0; i < 9; i++) { const bx = i * 70 - 10, bh = 120 + (i * 53) % 130; q.fillStyle = "#2b2d52"; q.fillRect(bx, 420 - bh, 62, bh); for (let j = 0; j < bh / 30 - 1; j++) { q.fillStyle = (i + j) % 3 ? "#ffd93d" : "#4a4d7a"; q.fillRect(bx + 10, 420 - bh + 10 + j * 30, 12, 14); q.fillRect(bx + 36, 420 - bh + 10 + j * 30, 12, 14); } } },
        (q, t) => { const gr = q.createLinearGradient(0, 0, 0, 420); gr.addColorStop(0, "#b9d8f5"); gr.addColorStop(1, "#f4faff"); q.fillStyle = gr; q.fillRect(0, 0, 600, 420); dot(q, "#fff", 150, 470, 200); dot(q, "#e6f1fb", 450, 480, 220); for (let i = 0; i < 40; i++) dot(q, "#fff", (i * 97 + Math.sin(t + i) * 10) % 600, (i * 41 + t * 40) % 420, 2.5); }
      ];
      let sc = { bg: 0, items: g.load() && g.load().items ? g.load().items : [] }; if (g.load() && g.load().bg < nBg) sc.bg = g.load().bg;
      let sel = -1, tool = 0, drag = null, moved = false;
      const hist = mkHist(g, () => sc, o => { sc = o; sel = -1; });
      const bgB = mkBar(g), stB = mkBar(g), act = mkBar(g), bgBtns = [];
      for (let i = 0; i < nBg; i++) bgBtns.push(mkBtn(g, bgB, BGN[i], () => { sc.bg = i; bgBtns.forEach((b, k) => hl(b, k === i)); hist.push(); g.add(1); }));
      bgBtns.forEach((b, k) => hl(b, k === sc.bg));
      const tb = [];
      for (let i = 0; i < nSt; i++) tb.push(mkThumb(g, stB, 56, 56, (q, w, h) => { T = 0; q.translate(w / 2, h / 2); q.scale(.42, .42); ST[i][1](q); }, () => { tool = i; mark(tb, i); }));
      mark(tb, tool);
      const upd = fn => { if (sel >= 0 && sc.items[sel]) { fn(sc.items[sel]); hist.push(); g.sfx("pop"); } };
      mkBtn(g, act, "Bigger", () => upd(it => { it.s = Math.min(3, it.s * 1.2); }));
      mkBtn(g, act, "Smaller", () => upd(it => { it.s = Math.max(.35, it.s / 1.2); }));
      mkBtn(g, act, "Flip", () => upd(it => { it.f = -it.f; }));
      if (g.diff > 0) mkBtn(g, act, "Turn", () => upd(it => { it.r = ((it.r || 0) + .4) % PI2; }));
      if (g.diff > 1) mkBtn(g, act, "To back", () => { if (sel >= 0) { const it = sc.items.splice(sel, 1)[0]; sc.items.unshift(it); sel = 0; hist.push(); } });
      mkBtn(g, act, "Delete", () => { if (sel >= 0) { sc.items.splice(sel, 1); sel = -1; hist.push(); g.sfx("back"); } });
      mkBtn(g, act, "Undo", () => hist.undo());
      mkBtn(g, act, "Clear", () => { sc.items = []; sel = -1; hist.push(); g.sfx("swish"); });
      mkEnd(g, act, c, "my-scene"); hist.push();
      g.on(c, "pointerdown", e => {
        const p = pos(e), i = hitTop(sc.items, p, it => ({ w: 46 * it.s, h: 46 * it.s }));
        moved = false;
        if (i >= 0) { sel = i; drag = { dx: sc.items[i].x - p.x, dy: sc.items[i].y - p.y }; g.sfx("pick"); }
        else { sc.items.push({ k: tool, x: p.x, y: p.y, s: 1, f: 1, r: 0 }); sel = sc.items.length - 1; drag = { dx: 0, dy: 0 }; g.add(1); g.sfx("pop"); fx.burst(p.x, p.y, ["#fff", "#ffd93d"], 12); moved = true; }
      });
      g.on(c, "pointermove", e => { if (!drag || !sc.items[sel]) return; const p = pos(e), it = sc.items[sel]; it.x = g.clamp(p.x + drag.dx, 0, 600); it.y = g.clamp(p.y + drag.dy, 0, 420); moved = true; });
      const up = () => { if (drag && moved) hist.push(); drag = null; };
      g.on(c, "pointerup", up); g.on(c, "pointercancel", up);
      g.loop((dt, t) => {
        T = t; BG[sc.bg](x, t);
        sc.items.forEach((it, i) => {
          x.save(); x.translate(it.x, it.y + Math.sin(t * 2 + i) * 2.5); x.rotate((it.r || 0) + Math.sin(t * 2.2 + i * 1.7) * .04); x.scale(it.s * it.f, it.s);
          ST[it.k % nSt][1](x); x.restore();
          if (i === sel) { x.save(); x.setLineDash([6, 5]); x.lineDashOffset = -t * 20; x.strokeStyle = "#fff"; x.lineWidth = 3; x.strokeRect(it.x - 50 * it.s, it.y - 50 * it.s, 100 * it.s, 100 * it.s); x.restore(); }
        });
        if (!sc.items.length) { x.fillStyle = "rgba(0,0,0,.45)"; x.font = "bold 22px system-ui, sans-serif"; x.textAlign = "center"; x.fillText("Pick a sticker, then tap here!", 300, 210); }
        fx.draw(x, dt);
      });
    }
  });

  // ---- Flag & Badge Studio ----
  B.add({
    id: "s11-flag", name: "Flag & Badge Studio", ages: [6, 16], cat: "Creative", color: "#ff5c7a", icon: "F",
    desc: "Design a waving flag or a shiny badge for your team, club or country.", controls: "Pick a layout, an emblem and colours. Switch between Flag and Badge",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(520, 400), fx = mkFx();
      const nL = g.by(4, 6, 8), nE = g.by(4, 6, 8), cols = PAL.slice(0, g.by(8, 10, 12));
      const WORDS = ["", "TEAM", "STARS", "COOL", "WOLF", "ZOOM", "KINGS", "FIRE", "HERO", "PANDA"], nW = g.diff ? WORDS.length : 1;
      let st = Object.assign({ lay: 0, c1: "#ff5c7a", c2: "#ffffff", c3: "#3ec1ff", em: 1, ec: "#ffd93d", badge: false, word: 0, es: 1, ey: 0 }, g.load() || {});
      st.lay %= nL; st.em %= nE; st.word %= nW;
      const art = document.createElement("canvas"); art.width = 360; art.height = 260; const aq = art.getContext("2d"); let dirty = true;
      const poly = (q, pts, cx, cy, r, col) => { q.beginPath(); pts.forEach((p, i) => q[i ? "lineTo" : "moveTo"](cx + p[0] * r, cy + p[1] * r)); q.closePath(); q.fillStyle = col; q.fill(); q.lineWidth = 2; q.strokeStyle = "rgba(0,0,0,.3)"; q.stroke(); };
      const LAY = [
        (q, w, h, a, b, d) => { q.fillStyle = a; q.fillRect(0, 0, w, h / 3 + 1); q.fillStyle = b; q.fillRect(0, h / 3, w, h / 3 + 1); q.fillStyle = d; q.fillRect(0, h * 2 / 3, w, h / 3 + 1); },
        (q, w, h, a, b, d) => { q.fillStyle = a; q.fillRect(0, 0, w / 3 + 1, h); q.fillStyle = b; q.fillRect(w / 3, 0, w / 3 + 1, h); q.fillStyle = d; q.fillRect(w * 2 / 3, 0, w / 3 + 1, h); },
        (q, w, h, a, b, d) => { q.fillStyle = a; q.fillRect(0, 0, w, h); q.fillStyle = d; q.fillRect(w * .26, 0, w * .2, h); q.fillRect(0, h * .38, w, h * .24); q.fillStyle = b; q.fillRect(w * .29, 0, w * .14, h); q.fillRect(0, h * .42, w, h * .16); },
        (q, w, h, a, b, d) => { q.fillStyle = a; q.fillRect(0, 0, w, h); q.fillStyle = b; q.beginPath(); q.moveTo(w, 0); q.lineTo(w, h); q.lineTo(0, h); q.closePath(); q.fill(); q.strokeStyle = d; q.lineWidth = h * .06; q.beginPath(); q.moveTo(0, h); q.lineTo(w, 0); q.stroke(); },
        (q, w, h, a, b, d) => { q.fillStyle = a; q.fillRect(0, 0, w, h); q.fillStyle = b; q.fillRect(0, 0, w / 2, h / 2); q.fillRect(w / 2, h / 2, w / 2, h / 2); q.fillStyle = d; q.fillRect(w / 2 - 3, 0, 6, h); q.fillRect(0, h / 2 - 3, w, 6); },
        (q, w, h, a, b, d) => { q.fillStyle = a; q.fillRect(0, 0, w, h); q.fillStyle = b; q.beginPath(); q.moveTo(0, 0); q.lineTo(w * .5, h / 2); q.lineTo(0, h); q.closePath(); q.fill(); q.fillStyle = d; q.beginPath(); q.moveTo(0, h * .2); q.lineTo(w * .28, h / 2); q.lineTo(0, h * .8); q.closePath(); q.fill(); },
        (q, w, h, a, b, d) => { q.fillStyle = a; q.fillRect(0, 0, w, h); dot(q, b, w / 2, h / 2, h * .42); dot(q, d, w / 2, h / 2, h * .3); },
        (q, w, h, a, b, d) => { q.fillStyle = a; q.fillRect(0, 0, w, h); q.fillStyle = b; for (let i = 0; i < 12; i += 2) { q.beginPath(); q.moveTo(w / 2, h / 2); q.arc(w / 2, h / 2, w, i * PI / 6, (i + 1) * PI / 6); q.closePath(); q.fill(); } dot(q, d, w / 2, h / 2, h * .16); }
      ];
      const EM = [
        () => { },
        (q, cx, cy, r, k) => { const pts = []; for (let i = 0; i < 10; i++) { const rr = i % 2 ? .42 : 1, a = -PI / 2 + i * PI / 5; pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); } poly(q, pts, cx, cy, r, k); },
        (q, cx, cy, r, k) => { q.beginPath(); q.arc(cx, cy, r * .85, 0, 7); q.strokeStyle = k; q.lineWidth = r * .28; q.stroke(); },
        (q, cx, cy, r, k) => { q.save(); q.translate(cx, cy); q.scale(r / 40, r / 40); q.beginPath(); q.arc(0, 0, 40, -PI * .6, PI * .6, true); q.arc(30, 0, 56.9, PI * .7674, PI * 1.2326); q.closePath(); q.fillStyle = k; q.fill(); q.restore(); },
        (q, cx, cy, r, k) => poly(q, [[.1, -1], [-.6, .1], [-.05, .1], [-.2, 1], [.6, -.15], [.05, -.15], [.35, -1]], cx, cy, r, k),
        (q, cx, cy, r, k) => poly(q, [[-1, .6], [-1, -.5], [-.5, 0], [0, -.75], [.5, 0], [1, -.5], [1, .6]], cx, cy, r, k),
        (q, cx, cy, r, k) => poly(q, [[0, -1], [.8, 0], [0, 1], [-.8, 0]], cx, cy, r, k),
        (q, cx, cy, r, k) => { for (let i = 0; i < 6; i++) dot(q, k, cx + Math.cos(i * PI / 3) * r * .5, cy + Math.sin(i * PI / 3) * r * .5, r * .38); dot(q, "rgba(0,0,0,.3)", cx, cy, r * .24); }
      ];
      const render = () => {
        const bw = st.badge ? 260 : 360, bh = st.badge ? 260 : 240, word = WORDS[st.word];
        aq.clearRect(0, 0, 360, 260); aq.save(); if (st.badge) { aq.beginPath(); aq.arc(130, 130, 126, 0, 7); aq.clip(); }
        LAY[st.lay](aq, bw, bh, st.c1, st.c2, st.c3);
        EM[st.em](aq, bw / 2, bh / 2 - (word ? 14 : 0) + st.ey * 14, bh * .2 * st.es, st.ec);
        if (word) { aq.font = "bold 34px system-ui, sans-serif"; aq.textAlign = "center"; aq.lineWidth = 6; aq.strokeStyle = "rgba(0,0,0,.6)"; aq.strokeText(word, bw / 2, bh - 24); aq.fillStyle = "#fff"; aq.fillText(word, bw / 2, bh - 24); }
        aq.restore(); dirty = false;
      };
      const hist = mkHist(g, () => st, o => { st = o; remark(); sw.forEach((f, i) => f(st[["c1", "c2", "c3", "ec"][i]])); dirty = true; });
      const chg = () => { dirty = true; hist.push(); g.add(1); g.sfx("pop"); fx.burst(260, 200, [st.c1, st.c2, st.ec], 14); };
      const lB = mkBar(g), eB = mkBar(g), cB = mkBar(g), act = mkBar(g), lt = [], et = [];
      mkLabel(lB, "Layout");
      for (let i = 0; i < nL; i++) lt.push(mkThumb(g, lB, 64, 44, (q, w, h) => LAY[i](q, w, h, "#ff5c7a", "#ffffff", "#3ec1ff"), () => { st.lay = i; chg(); remark(); }));
      mkLabel(eB, "Emblem");
      for (let i = 0; i < nE; i++) et.push(mkThumb(g, eB, 44, 44, (q, w, h) => EM[i](q, w / 2, h / 2, 17, "#444"), () => { st.em = i; chg(); remark(); }));
      const remark = () => { mark(lt, st.lay); mark(et, st.em); };
      remark();
      const sw = [], keys = ["c1", "c2", "c3", "ec"], names = ["Colour A", "Colour B", "Colour C", "Emblem"];
      keys.forEach((k, i) => { if (k === "c3" && g.diff === 0) { sw.push(() => { }); return; } mkLabel(cB, names[i]); sw.push(mkSwatches(g, cB, cols, st[k], v => { st[k] = v; chg(); })); });
      mkBtn(g, act, "Flag / Badge", () => { st.badge = !st.badge; chg(); });
      if (g.diff > 0) mkBtn(g, act, "Word", () => { st.word = (st.word + 1) % nW; chg(); });
      if (g.diff > 1) { mkBtn(g, act, "Emblem +", () => { st.es = Math.min(1.8, st.es + .2); chg(); }); mkBtn(g, act, "Emblem -", () => { st.es = Math.max(.6, st.es - .2); chg(); }); mkBtn(g, act, "Up", () => { st.ey = Math.max(-4, st.ey - 1); chg(); }); mkBtn(g, act, "Down", () => { st.ey = Math.min(4, st.ey + 1); chg(); }); }
      mkBtn(g, act, "Undo", () => hist.undo());
      mkBtn(g, act, "Surprise me", () => { st.lay = g.ri(0, nL - 1); st.em = g.ri(0, nE - 1); st.c1 = g.pick(cols); st.c2 = g.pick(cols); st.c3 = g.pick(cols); st.ec = g.pick(cols); if (g.diff) st.word = g.ri(0, nW - 1); remark(); sw.forEach((f, i) => f(st[keys[i]])); chg(); });
      mkEnd(g, act, c, "my-flag"); hist.push();
      const clouds = Array.from({ length: 5 }, (_, i) => [i * 120, g.rf(20, 160), g.rf(.6, 1.2)]);
      g.loop((dt, t) => {
        if (dirty) render();
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#8fd8ff"); gr.addColorStop(1, "#eaf8ff"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        clouds.forEach(cl => { cl[0] = (cl[0] + dt * 14 * cl[2]) % 640; x.globalAlpha = .8; dot(x, "#fff", cl[0] - 60, cl[1], 24 * cl[2]); dot(x, "#fff", cl[0] - 36, cl[1] - 8, 20 * cl[2]); dot(x, "#fff", cl[0] - 84, cl[1] + 2, 18 * cl[2]); }); x.globalAlpha = 1;
        if (!st.badge) {
          x.fillStyle = "#7a5230"; x.fillRect(86, 50, 10, 345); dot(x, "#ffd93d", 91, 46, 9); x.fillStyle = "rgba(0,0,0,.15)"; x.fillRect(80, 392, 22, 6);
          const N = 36, sw2 = 360 / N;
          for (let i = 0; i < N; i++) { const wv = Math.sin(t * 3 - i * .35) * (i / N) * 12; x.drawImage(art, i * sw2, 0, sw2 + 1, 240, 98 + i * sw2, 72 + wv, sw2 + 1, 240); x.fillStyle = "rgba(0,0,0," + (i ? .13 + .12 * Math.sin(t * 3 - i * .35) : 0) + ")"; x.fillRect(98 + i * sw2, 72 + wv, sw2 + 1, 240); }
        } else {
          x.save(); x.translate(260, 200); x.rotate(Math.sin(t * 1.4) * .06); x.fillStyle = "rgba(0,0,0,.15)"; x.beginPath(); x.ellipse(6, 8, 138, 138, 0, 0, 7); x.fill();
          x.drawImage(art, 0, 0, 260, 260, -130, -130, 260, 260);
          x.beginPath(); x.arc(0, 0, 130, 0, 7); x.lineWidth = 12; x.strokeStyle = "#ffd93d"; x.stroke(); x.lineWidth = 3; x.strokeStyle = "rgba(0,0,0,.35)"; x.stroke();
          const sg = x.createLinearGradient(-130 + ((t * 120) % 520) - 100, -130, -130 + ((t * 120) % 520), 130); sg.addColorStop(0, "rgba(255,255,255,0)"); sg.addColorStop(.5, "rgba(255,255,255,.3)"); sg.addColorStop(1, "rgba(255,255,255,0)"); x.save(); x.beginPath(); x.arc(0, 0, 125, 0, 7); x.clip(); x.fillStyle = sg; x.fillRect(-130, -130, 260, 260); x.restore(); x.restore();
        }
        fx.draw(x, dt);
      });
    }
  });

  // ---- T-Shirt Studio ----
  B.add({
    id: "s11-tshirt", name: "T-Shirt Studio", ages: [6, 16], cat: "Creative", color: "#3ec1ff", icon: "T",
    desc: "Pick a pattern and colours, add stickers and design your own T-shirt.", controls: "Choose a pattern and colours, then tap the shirt to add decorations",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(500, 460), fx = mkFx();
      const cloth = document.createElement("canvas"); cloth.width = 500; cloth.height = 460; const q = cloth.getContext("2d");
      const nP = g.by(5, 7, 9), nD = g.by(3, 5, 8), cols = PAL.slice(0, g.by(8, 10, 12)), sizes = g.by([30], [20, 32, 48], [20, 32, 48]);
      let st = Object.assign({ pat: 1, c1: "#ff5c7a", c2: "#ffffff", sz: 0, col: "#2b3245", dc: "#ffd93d", ds: 1, dec: [], free: [] }, g.load() || {});
      st.pat %= nP; if (!Array.isArray(st.dec)) st.dec = []; if (!Array.isArray(st.free)) st.free = [];
      let dec = 0, paint = false, dirty = true, cur = null, sway = 0, T = 0;
      const path = new Path2D(); path.moveTo(170, 40); path.lineTo(215, 40); path.quadraticCurveTo(250, 95, 285, 40); path.lineTo(330, 40); path.lineTo(450, 110); path.lineTo(405, 185); path.lineTo(345, 150); path.lineTo(345, 420); path.lineTo(155, 420); path.lineTo(155, 150); path.lineTo(95, 185); path.lineTo(50, 110); path.closePath();
      const tc = document.createElement("canvas").getContext("2d"), inShirt = (px, py) => tc.isPointInPath(path, px, py);
      const star = (ctx, r) => { ctx.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * .42 : r, a = -PI / 2 + i * PI / 5; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); };
      const PATS = [
        (p, w, h, a, b, s) => { },
        (p, w, h, a, b, s) => { p.fillStyle = b; for (let y = 0; y < h; y += s * 2) p.fillRect(0, y, w, s); },
        (p, w, h, a, b, s) => { p.fillStyle = b; for (let xx = 0; xx < w; xx += s * 2) p.fillRect(xx, 0, s, h); },
        (p, w, h, a, b, s) => { p.fillStyle = b; for (let j = 0; j * s * 2 < h + s; j++) for (let i = 0; i * s * 2 < w + s; i++) { p.beginPath(); p.arc(i * s * 2 + (j % 2) * s, j * s * 2, s * .45, 0, 7); p.fill(); } },
        (p, w, h, a, b, s) => { p.fillStyle = b; for (let j = 0; j * s < h; j++) for (let i = 0; i * s < w; i++) if ((i + j) % 2) p.fillRect(i * s, j * s, s, s); },
        (p, w, h, a, b, s) => { p.strokeStyle = b; p.lineWidth = s * .3; p.lineJoin = "round"; for (let y = s; y < h + s; y += s * 1.8) { p.beginPath(); p.moveTo(0, y); for (let xx = 0, k = 0; xx <= w + s; xx += s, k++) p.lineTo(xx, y + (k % 2 ? s * .5 : -s * .5)); p.stroke(); } },
        (p, w, h, a, b, s) => { p.fillStyle = b; for (let j = 0; j * s * 2.2 < h + s; j++) for (let i = 0; i * s * 2.2 < w + s; i++) { p.save(); p.translate(i * s * 2.2 + (j % 2) * s, j * s * 2.2); star(p, s * .6); p.restore(); } },
        (p, w, h, a, b, s) => { p.strokeStyle = b; p.lineWidth = s * .28; for (let y = s; y < h + s; y += s * 1.4) { p.beginPath(); for (let xx = 0; xx <= w; xx += 6) p.lineTo(xx, y + Math.sin(xx / s * 1.2) * s * .35); p.stroke(); } },
        (p, w, h, a, b, s) => { p.fillStyle = b; for (let k = -h; k < w + h; k += s * 2) { p.beginPath(); p.moveTo(k, 0); p.lineTo(k + s, 0); p.lineTo(k + s + h, h); p.lineTo(k + h, h); p.closePath(); p.fill(); } }
      ];
      const DEC = [
        (p, r, k) => { p.fillStyle = k; star(p, r); },
        (p, r, k) => { dot(p, k, 0, 0, r * .85); dot(p, OUT, -r * .3, -r * .15, r * .1); dot(p, OUT, r * .3, -r * .15, r * .1); p.beginPath(); p.arc(0, r * .1, r * .4, .1 * PI, .9 * PI); p.strokeStyle = OUT; p.lineWidth = r * .1; p.stroke(); },
        (p, r, k) => { for (let i = 0; i < 6; i++) dot(p, k, Math.cos(i * PI / 3) * r * .55, Math.sin(i * PI / 3) * r * .55, r * .38); dot(p, "#fff", 0, 0, r * .28); },
        (p, r, k) => { p.fillStyle = k; p.beginPath(); [[.1, -1], [-.6, .1], [-.05, .1], [-.2, 1], [.6, -.15], [.05, -.15], [.35, -1]].forEach((a, i) => p[i ? "lineTo" : "moveTo"](a[0] * r, a[1] * r)); p.closePath(); p.fill(); },
        (p, r, k) => { p.beginPath(); p.arc(0, 0, r * .8, 0, 7); p.strokeStyle = k; p.lineWidth = r * .3; p.stroke(); },
        (p, r, k) => { p.fillStyle = k; p.beginPath(); p.moveTo(0, -r); p.lineTo(r, r * .8); p.lineTo(-r, r * .8); p.closePath(); p.fill(); },
        (p, r, k) => { p.fillStyle = k; for (let i = 0; i < 8; i++) { p.save(); p.rotate(i * PI / 4); p.beginPath(); p.moveTo(-r * .12, -r * .55); p.lineTo(0, -r); p.lineTo(r * .12, -r * .55); p.fill(); p.restore(); } dot(p, k, 0, 0, r * .5); },
        (p, r, k) => { p.fillStyle = k; p.beginPath(); p.arc(0, 0, r * .9, -PI * .6, PI * .6, true); p.arc(r * .75, 0, r * 1.42, PI * .7674, PI * 1.2326); p.closePath(); p.fill(); }
      ];
      const render = () => {
        const s = sizes[st.sz % sizes.length]; q.clearRect(0, 0, 500, 460); q.fillStyle = st.c1; q.fillRect(0, 0, 500, 460); PATS[st.pat](q, 500, 460, st.c1, st.c2, s);
        st.dec.forEach(d => { q.save(); q.translate(d.x, d.y); q.rotate(d.a || 0); DEC[d.k % DEC.length](q, d.r, d.c); q.restore(); });
        st.free.forEach(f => { q.strokeStyle = f.c; q.lineWidth = 9; q.lineCap = "round"; q.lineJoin = "round"; q.beginPath(); for (let i = 0; i < f.p.length; i += 2) q[i ? "lineTo" : "moveTo"](f.p[i], f.p[i + 1]); if (f.p.length === 2) q.lineTo(f.p[0] + .1, f.p[1]); q.stroke(); });
        dirty = false;
      };
      const hist = mkHist(g, () => st, o => { st = o; mark(pt, st.pat); s1(st.c1); s2(st.c2); s3(st.col); dirty = true; });
      const chg = () => { dirty = true; hist.push(); g.add(1); g.sfx("pop"); };
      const pB = mkBar(g), cB = mkBar(g), dB = mkBar(g), act = mkBar(g), pt = [], dt2 = [];
      mkLabel(pB, "Pattern");
      for (let i = 0; i < nP; i++) pt.push(mkThumb(g, pB, 50, 50, (p, w, h) => { p.fillStyle = "#ff5c7a"; p.fillRect(0, 0, w, h); PATS[i](p, w, h, "#ff5c7a", "#fff", 9); }, () => { st.pat = i; mark(pt, i); chg(); }));
      mark(pt, st.pat);
      mkLabel(cB, "Colour 1"); const s1 = mkSwatches(g, cB, cols, st.c1, v => { st.c1 = v; chg(); });
      mkLabel(cB, "Colour 2"); const s2 = mkSwatches(g, cB, cols, st.c2, v => { st.c2 = v; chg(); });
      mkLabel(cB, "Collar"); const s3 = mkSwatches(g, cB, cols, st.col, v => { st.col = v; g.add(1); hist.push(); });
      mkLabel(dB, "Stickers");
      for (let i = 0; i < nD; i++) dt2.push(mkThumb(g, dB, 44, 44, (p, w, h) => { p.translate(w / 2, h / 2); DEC[i](p, 16, i === 1 ? "#ffd93d" : "#e0543c"); }, () => { dec = i; mark(dt2, i); paint = false; }));
      mark(dt2, dec); mkSwatches(g, dB, cols, st.dc, v => { st.dc = v; });
      if (g.diff > 0) { mkBtn(g, act, "Pattern size", () => { st.sz = (st.sz + 1) % sizes.length; chg(); }); mkBtn(g, act, "Sticker size", () => { st.ds = st.ds >= 1.6 ? .6 : st.ds + .5; fx.burst(250, 230, "#fff", 6); }); }
      if (g.diff > 1) mkBtn(g, act, "Pen / Stamp", b => { paint = !paint; hl(b, paint); });
      mkBtn(g, act, "Undo", () => hist.undo());
      mkBtn(g, act, "Surprise me", () => { st.pat = g.ri(0, nP - 1); st.c1 = g.pick(cols); st.c2 = g.pick(cols); st.col = g.pick(cols); st.sz = g.ri(0, sizes.length - 1); mark(pt, st.pat); s1(st.c1); s2(st.c2); s3(st.col); chg(); });
      mkBtn(g, act, "Clear stickers", () => { st.dec = []; st.free = []; chg(); });
      mkEnd(g, act, c, "my-tshirt"); hist.push();
      const rel = e => { const p = pos(e), dx = p.x - 250, dy = p.y - 10, ca = Math.cos(sway), sa = Math.sin(sway); return { x: dx * ca + dy * sa + 250, y: -dx * sa + dy * ca + 10 }; };
      g.on(c, "pointerdown", e => {
        const p = rel(e); if (!inShirt(p.x, p.y)) return;
        if (paint) { cur = { c: st.dc, p: [Math.round(p.x), Math.round(p.y)] }; st.free.push(cur); dirty = true; g.sfx("tick"); }
        else { st.dec.push({ k: dec, x: Math.round(p.x), y: Math.round(p.y), r: 26 * st.ds, c: st.dc, a: g.rf(-.3, .3) }); if (st.dec.length > 80) st.dec.shift(); chg(); const pp = pos(e); fx.burst(pp.x, pp.y, [st.dc, "#fff"], 10); }
      });
      g.on(c, "pointermove", e => { if (!cur) return; const p = rel(e), L = cur.p.length; if (Math.hypot(p.x - cur.p[L - 2], p.y - cur.p[L - 1]) > 3) { cur.p.push(Math.round(p.x), Math.round(p.y)); dirty = true; } });
      const up = () => { if (cur) { cur = null; chg(); } };
      g.on(c, "pointerup", up); g.on(c, "pointercancel", up); g.on(c, "pointerleave", up);
      g.loop((dt, t) => {
        T = t; sway = Math.sin(t * 1.5) * .03; if (dirty) render();
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#d9ecff"); gr.addColorStop(1, "#fff6e0"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "rgba(0,0,0,.08)"; x.fillRect(0, 440, W, 20);
        x.save(); x.translate(250, 10); x.rotate(sway); x.translate(-250, -10);
        x.strokeStyle = "#8b95a8"; x.lineWidth = 5; x.lineCap = "round"; x.beginPath(); x.arc(250, 4, 9, PI * .2, PI * 2.1); x.moveTo(250, 14); x.lineTo(185, 48); x.moveTo(250, 14); x.lineTo(315, 48); x.stroke();
        x.save(); x.clip(path); x.drawImage(cloth, 0, 0, 500, 460);
        const lg = x.createLinearGradient(50, 0, 450, 0); lg.addColorStop(0, "rgba(0,0,0,.14)"); lg.addColorStop(.3, "rgba(255,255,255,.12)"); lg.addColorStop(.7, "rgba(0,0,0,0)"); lg.addColorStop(1, "rgba(0,0,0,.18)"); x.fillStyle = lg; x.fillRect(0, 0, 500, 460);
        x.strokeStyle = "rgba(0,0,0,.08)"; x.lineWidth = 4; for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(200 + i * 50, 120); x.quadraticCurveTo(210 + i * 50 + Math.sin(t + i) * 4, 280, 195 + i * 55, 410); x.stroke(); }
        x.restore();
        x.lineJoin = "round"; x.strokeStyle = OUT; x.lineWidth = 5; x.stroke(path);
        x.beginPath(); x.moveTo(215, 40); x.quadraticCurveTo(250, 95, 285, 40); x.strokeStyle = OUT; x.lineWidth = 18; x.stroke(); x.strokeStyle = st.col; x.lineWidth = 11; x.stroke();
        x.restore(); fx.draw(x, dt);
      });
    }
  });

  // ---- Comic Panel Maker ----
  B.add({
    id: "s11-comic", name: "Comic Panel Maker", ages: [6, 16], cat: "Creative", color: "#ffd34e", icon: "C",
    desc: "Make a comic! Drop characters into panels and add speech bubbles.", controls: "Pick a character or a speech bubble, tap a panel to place it, drag to move",
    start(g) {
      const PW = g.by(340, 340, 520), { c, x, W, H, pos } = g.canvas(600, PW), fx = mkFx();
      const panels = g.by([[10, 10, 580, 320]], [[10, 10, 285, 320], [305, 10, 285, 320]], [[10, 10, 285, 245], [305, 10, 285, 245], [10, 265, 285, 245], [305, 265, 285, 245]]);
      const nC = g.by(4, 6, 8), nW = g.by(4, 8, 12), nB = g.by(3, 4, 5), BN = ["Meadow", "Night", "Space", "Beach", "Room"];
      const WORDS = ["WOW!", "HELLO!", "OH NO!", "YAY!", "HA HA!", "BOOM!", "HMM...", "LOOK!", "HELP!", "GO GO!", "COOL!", "OOPS!"], BURST = ["WOW!", "OH NO!", "BOOM!", "HELP!"];
      let T = 0;
      const CH = [
        q => { sh(q, "#e0343c", q => { q.moveTo(-26, -72); q.lineTo(-42, -6); q.lineTo(42, -6); q.lineTo(26, -72); q.closePath(); }, 5); sh(q, "#3a7bd8", q => q.roundRect(-22, -74, 44, 56, 10), 5); sh(q, "#2b3a6a", q => { q.rect(-18, -20, 14, 20); q.rect(4, -20, 14, 20); }, 5); sh(q, "#ffd0a0", q => q.arc(0, -94, 22, 0, 7), 5); sh(q, "#2b3245", q => q.roundRect(-22, -102, 44, 12, 5), 3); dot(q, "#fff", -8, -96, 3); dot(q, "#fff", 8, -96, 3); q.beginPath(); q.arc(0, -90, 8, .2 * PI, .8 * PI); q.strokeStyle = OUT; q.lineWidth = 3; q.stroke(); },
        q => { ln(q, "#8a94b0", 5, q => { q.moveTo(0, -112); q.lineTo(0, -124); }); dot(q, "#ff5c7a", 0, -126, 5); sh(q, "#8a94b0", q => { q.rect(-18, -22, 12, 22); q.rect(6, -22, 12, 22); }, 5); sh(q, "#aab4d0", q => q.roundRect(-26, -74, 52, 54, 8), 5); ln(q, "#8a94b0", 8, q => { q.moveTo(-30, -66); q.lineTo(-42, -40); q.moveTo(30, -66); q.lineTo(42, -40); }); sh(q, "#aab4d0", q => q.roundRect(-24, -114, 48, 38, 8), 5); sh(q, "#3ec1ff", q => q.roundRect(-18, -104, 36, 14, 6), 3); sh(q, "#ffd93d", q => q.rect(-10, -64, 20, 14), 3); },
        q => { sh(q, "#ff9f43", q => q.ellipse(0, -28, 32, 30, 0, 0, 7), 5); sh(q, "#ff9f43", q => { q.moveTo(-24, -92); q.lineTo(-20, -112); q.lineTo(-6, -98); q.closePath(); q.moveTo(24, -92); q.lineTo(20, -112); q.lineTo(6, -98); q.closePath(); }, 5); sh(q, "#ff9f43", q => q.arc(0, -78, 26, 0, 7), 5); dot(q, OUT, -9, -80, 4); dot(q, OUT, 9, -80, 4); dot(q, "#ff8fa8", 0, -72, 3.5); ln(q, "#ff9f43", 7, q => { q.moveTo(28, -10); q.quadraticCurveTo(50 + Math.sin(T * 4) * 8, -20, 42, -50); }); },
        q => { sh(q, "#7be07a", q => q.ellipse(0, -30, 16, 28, 0, 0, 7), 5); sh(q, "#7be07a", q => q.ellipse(0, -86, 30, 34, 0, 0, 7), 5); sh(q, "#1b1b2b", q => { q.ellipse(-13, -86, 9, 14, -.4, 0, 7); q.moveTo(22, -86); q.ellipse(13, -86, 9, 14, .4, 0, 7); }, 2); dot(q, "#fff", -15, -92, 3); dot(q, "#fff", 11, -92, 3); },
        q => { sh(q, "#f4f4ff", q => { q.moveTo(-30, 0); q.lineTo(-30, -60); q.arc(0, -60, 30, PI, PI2); q.lineTo(30, 0); q.lineTo(20, -9); q.lineTo(10, 0); q.lineTo(0, -9); q.lineTo(-10, 0); q.lineTo(-20, -9); q.closePath(); }, 5); dot(q, OUT, -10, -62, 5); dot(q, OUT, 10, -62, 5); sh(q, "#5b4bb8", q => q.ellipse(0, -42, 7, 9, 0, 0, 7), 3); },
        q => { sh(q, "#4cbb5b", q => { q.moveTo(-30, -30); q.lineTo(-62, -8); q.lineTo(-26, -14); q.closePath(); }, 5); sh(q, "#4cbb5b", q => q.ellipse(0, -40, 38, 30, 0, 0, 7), 5); sh(q, "#4cbb5b", q => { q.rect(-22, -20, 14, 20); q.rect(8, -20, 14, 20); }, 5); [-18, 0, 18].forEach(s => sh(q, "#ffd93d", q => { q.moveTo(s - 7, -66); q.lineTo(s, -82); q.lineTo(s + 7, -66); q.closePath(); }, 3)); sh(q, "#4cbb5b", q => q.arc(34, -72, 20, 0, 7), 5); dot(q, OUT, 40, -76, 4); },
        q => { sh(q, "#7b6cff", q => { q.moveTo(0, -92); q.lineTo(34, 0); q.lineTo(-34, 0); q.closePath(); }, 5); sh(q, "#ffd0a0", q => q.arc(0, -86, 18, 0, 7), 5); sh(q, "#f4f4ff", q => { q.moveTo(-16, -80); q.quadraticCurveTo(0, -40, 16, -80); q.closePath(); }, 3); sh(q, "#3a3a9a", q => { q.moveTo(-26, -94); q.lineTo(2, -140); q.lineTo(26, -94); q.closePath(); }, 5); dot(q, "#ffd93d", 2, -112, 5); dot(q, OUT, -7, -90, 3); dot(q, OUT, 7, -90, 3); },
        q => { sh(q, "#ff8fd0", q => { for (let i = 0; i < 12; i++) { const a = i * PI / 6, r = i % 2 ? 40 : 48; q.lineTo(Math.cos(a) * r, -50 + Math.sin(a) * r * 1.1); } q.closePath(); }, 5); sh(q, "#fff", q => q.arc(0, -56, 16, 0, 7), 4); dot(q, OUT, 2, -56, 8); sh(q, "#fff", q => { q.moveTo(-18, -26); q.lineTo(-10, -18); q.lineTo(-2, -26); q.lineTo(6, -18); q.lineTo(14, -26); }, 3); }
      ];
      const BGS = [
        (q, a, b, w, h, t) => { const gr = q.createLinearGradient(0, b, 0, b + h); gr.addColorStop(0, "#7fd0ff"); gr.addColorStop(1, "#e2f6ff"); q.fillStyle = gr; q.fillRect(a, b, w, h); dot(q, "#fff", a + ((t * 12) % (w + 100)) - 30, b + h * .2, 22); dot(q, "#5fcf6b", a + w * .3, b + h * 1.1, h * .5); q.fillStyle = "#4cbb5b"; q.fillRect(a, b + h * .78, w, h * .22); },
        (q, a, b, w, h, t) => { q.fillStyle = "#14153a"; q.fillRect(a, b, w, h); for (let i = 0; i < 8; i++) { q.fillStyle = "#262a58"; q.fillRect(a + i * w / 7 - 10, b + h * (.4 + (i * .37) % .3), w / 8, h); for (let j = 0; j < 4; j++) { q.fillStyle = (i + j) % 2 ? "#ffd93d" : "#3a3f78"; q.fillRect(a + i * w / 7, b + h * .6 + j * 22, 8, 10); } } dot(q, "#ffe9a8", a + w * .8, b + h * .2, 16); },
        (q, a, b, w, h, t) => { q.fillStyle = "#0a0a2e"; q.fillRect(a, b, w, h); for (let i = 0; i < 24; i++) { q.globalAlpha = .4 + .6 * Math.abs(Math.sin(t * 2 + i)); dot(q, "#fff", a + (i * 53) % w, b + (i * 31) % h, 1.6); } q.globalAlpha = 1; dot(q, "#c86bff", a + w * .8, b + h * .75, h * .22); dot(q, "#9a8a70", a + w * .15, b + h * .9, h * .3); },
        (q, a, b, w, h, t) => { const gr = q.createLinearGradient(0, b, 0, b + h * .5); gr.addColorStop(0, "#8fd8ff"); gr.addColorStop(1, "#d6f3ff"); q.fillStyle = gr; q.fillRect(a, b, w, h * .55); q.fillStyle = "#3ec1ff"; q.fillRect(a, b + h * .45, w, h * .25); q.strokeStyle = "rgba(255,255,255,.7)"; q.lineWidth = 2; for (let i = 0; i < 6; i++) { q.beginPath(); q.moveTo(a + i * w / 5 + Math.sin(t * 2 + i) * 6, b + h * .6); q.lineTo(a + i * w / 5 + 24 + Math.sin(t * 2 + i) * 6, b + h * .6); q.stroke(); } q.fillStyle = "#f0d28a"; q.fillRect(a, b + h * .7, w, h * .3); },
        (q, a, b, w, h, t) => { q.fillStyle = "#ffe3b8"; q.fillRect(a, b, w, h); q.fillStyle = "#b9824f"; q.fillRect(a, b + h * .72, w, h * .28); q.fillStyle = "#9fe3ff"; q.fillRect(a + w * .1, b + h * .12, w * .22, h * .3); q.strokeStyle = "#fff"; q.lineWidth = 4; q.strokeRect(a + w * .1, b + h * .12, w * .22, h * .3); q.fillStyle = "#ff8fd0"; q.fillRect(a + w * .62, b + h * .15, w * .18, h * .22); }
      ];
      let sc = { bg: panels.map((p, i) => i % nB), items: [] }; const ld = g.load();
      if (ld && Array.isArray(ld.bg) && ld.bg.length === panels.length && Array.isArray(ld.items)) sc = ld; sc.bg = sc.bg.map(v => v % nB);
      let ap = 0, sel = -1, tool = { t: 0, k: 0 }, drag = null, moved = false;
      const hist = mkHist(g, () => sc, o => { sc = o; sel = -1; });
      const cB = mkBar(g), wB = mkBar(g), act = mkBar(g), ct = [], wbs = [];
      mkLabel(cB, "Characters");
      for (let i = 0; i < nC; i++) ct.push(mkThumb(g, cB, 52, 60, (q, w, h) => { T = 0; q.translate(w / 2, h - 4); q.scale(.42, .42); CH[i](q); }, () => { tool = { t: 0, k: i }; mark(ct, i); wbs.forEach(b => hl(b, false)); }));
      mark(ct, 0);
      mkLabel(wB, "Bubbles");
      for (let i = 0; i < nW; i++) wbs.push(mkBtn(g, wB, WORDS[i], b => { tool = { t: 1, k: i }; mark(ct, -1); wbs.forEach((z, k) => hl(z, k === i)); }));
      const upd = fn => { if (sel >= 0 && sc.items[sel]) { fn(sc.items[sel]); hist.push(); g.sfx("pop"); } };
      mkBtn(g, act, "Next scene", () => { sc.bg[ap] = (sc.bg[ap] + 1) % nB; hist.push(); g.add(1); });
      mkBtn(g, act, "Bigger", () => upd(it => { it.s = Math.min(2.5, it.s * 1.2); }));
      mkBtn(g, act, "Smaller", () => upd(it => { it.s = Math.max(.5, it.s / 1.2); }));
      mkBtn(g, act, "Flip", () => upd(it => { it.f = -it.f; }));
      mkBtn(g, act, "Delete", () => { if (sel >= 0) { sc.items.splice(sel, 1); sel = -1; hist.push(); g.sfx("back"); } });
      mkBtn(g, act, "Undo", () => hist.undo());
      mkBtn(g, act, "Clear", () => { sc.items = []; sel = -1; hist.push(); g.sfx("swish"); });
      mkEnd(g, act, c, "my-comic"); hist.push();
      const panelAt = p => panels.findIndex(r => p.x >= r[0] && p.x <= r[0] + r[2] && p.y >= r[1] && p.y <= r[1] + r[3]);
      const bw = it => Math.max(70, WORDS[it.k % WORDS.length].length * 15 + 34) * it.s;
      const hit = p => { for (let i = sc.items.length - 1; i >= 0; i--) { const it = sc.items[i]; if (it.t === 0 ? (Math.abs(it.x - p.x) < 38 * it.s && p.y < it.y + 6 && p.y > it.y - 120 * it.s) : (Math.abs(it.x - p.x) < bw(it) / 2 && Math.abs(it.y - p.y) < 30 * it.s)) return i; } return -1; };
      g.on(c, "pointerdown", e => {
        const p = pos(e), pi = panelAt(p); if (pi < 0) return; ap = pi; moved = false;
        const i = hit(p);
        if (i >= 0) { sel = i; ap = sc.items[i].p; drag = { dx: sc.items[i].x - p.x, dy: sc.items[i].y - p.y }; g.sfx("pick"); return; }
        const r = panels[pi], it = { t: tool.t, k: tool.k, x: p.x, y: tool.t === 0 ? Math.min(p.y + 50, r[1] + r[3] - 6) : p.y, s: tool.t === 0 ? (panels.length > 1 ? .8 : 1.1) : 1, f: 1, p: pi };
        sc.items.push(it); sel = sc.items.length - 1; drag = { dx: 0, dy: 0 }; moved = true; g.add(1); g.sfx(tool.t ? "pop" : "thump"); fx.burst(p.x, p.y, ["#ffd93d", "#fff"], 10);
      });
      g.on(c, "pointermove", e => { if (!drag || !sc.items[sel]) return; const p = pos(e), it = sc.items[sel], r = panels[it.p]; it.x = g.clamp(p.x + drag.dx, r[0] + 10, r[0] + r[2] - 10); it.y = g.clamp(p.y + drag.dy, r[1] + 20, r[1] + r[3] - 4); moved = true; });
      const up = () => { if (drag && moved) hist.push(); drag = null; };
      g.on(c, "pointerup", up); g.on(c, "pointercancel", up);
      const spike = (q, w, h, k) => { q.beginPath(); for (let i = 0; i < 20; i++) { const a = i * PI / 10, r = i % 2 ? .78 : 1; q.lineTo(Math.cos(a) * w * r, Math.sin(a) * h * r); } q.closePath(); q.fillStyle = k; q.fill(); q.lineWidth = 4; q.strokeStyle = OUT; q.stroke(); };
      g.loop((dt, t) => {
        T = t; x.fillStyle = "#fff8e1"; x.fillRect(0, 0, W, H);
        panels.forEach((r, pi) => {
          x.save(); x.beginPath(); x.rect(r[0], r[1], r[2], r[3]); x.clip(); BGS[sc.bg[pi] % nB](x, r[0], r[1], r[2], r[3], t);
          sc.items.forEach((it, i) => {
            if (it.p !== pi) return; x.save();
            if (it.t === 0) { x.translate(it.x, it.y + Math.sin(t * 3 + i) * 2); x.scale(it.s * it.f, it.s); CH[it.k % nC](x); }
            else {
              const word = WORDS[it.k % WORDS.length], w = bw(it), h = 44 * it.s, pl = 1 + Math.sin(t * 4 + i) * .02; x.translate(it.x, it.y); x.scale(pl, pl);
              if (BURST.includes(word)) spike(x, w * .62, h * .95, "#ffe14d");
              else { x.beginPath(); x.ellipse(0, 0, w / 2, h / 2, 0, 0, 7); x.fillStyle = "#fff"; x.fill(); x.lineWidth = 4; x.strokeStyle = OUT; x.stroke(); x.beginPath(); x.moveTo(-it.f * w * .18, h * .38); x.lineTo(-it.f * w * .3, h * .95); x.lineTo(-it.f * w * .02, h * .46); x.closePath(); x.fillStyle = "#fff"; x.fill(); x.stroke(); x.beginPath(); x.ellipse(0, 0, w / 2 - 2, h / 2 - 2, 0, 0, 7); x.fillStyle = "#fff"; x.fill(); }
              x.fillStyle = OUT; x.font = "bold " + Math.round(20 * it.s) + "px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(word, 0, 1);
            }
            x.restore();
            if (i === sel) { x.save(); x.setLineDash([6, 5]); x.lineDashOffset = -t * 20; x.strokeStyle = "#ff5c7a"; x.lineWidth = 3; if (it.t === 0) x.strokeRect(it.x - 40 * it.s, it.y - 120 * it.s, 80 * it.s, 126 * it.s); else x.strokeRect(it.x - bw(it) / 2 - 4, it.y - 28 * it.s, bw(it) + 8, 56 * it.s); x.restore(); }
          });
          x.restore(); x.lineWidth = pi === ap && panels.length > 1 ? 7 : 5; x.strokeStyle = pi === ap && panels.length > 1 ? "#ff9f43" : "#111"; x.strokeRect(r[0], r[1], r[2], r[3]);
        });
        if (!sc.items.length) { x.fillStyle = "rgba(0,0,0,.5)"; x.font = "bold 20px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "alphabetic"; x.fillText("Pick a character, then tap a panel!", 300, 180); }
        fx.draw(x, dt);
      });
    }
  });

  // ---- Pottery Wheel ----
  B.add({
    id: "s11-pottery", name: "Pottery Wheel", ages: [6, 20], cat: "Creative", color: "#ff9f43", icon: "P",
    desc: "Spin the wheel, squeeze the clay into a vase, then paint it.", controls: "Shape: drag sideways on the clay. Paint: pick a colour and drag over the vase",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(500, 500), fx = mkFx();
      const NR = 40, y0 = 110, y1 = 395, cx = 250, rmax = g.by(120, 140, 165), clay = "#c8794a";
      let st = Object.assign({ R: Array(NR).fill(70), C: Array(NR).fill(clay), pat: 0, pc: "#ffffff", han: false }, g.load() || {});
      if (!Array.isArray(st.R) || st.R.length !== NR || !Array.isArray(st.C) || st.C.length !== NR) { st.R = Array(NR).fill(70); st.C = Array(NR).fill(clay); }
      st.R = st.R.map(v => g.clamp(v, 16, rmax)); if (!g.diff) st.pat = 0;
      let mode = "shape", col = "#3ec1ff", rot = 0, spd = 1, down = false, lastRow = -1, hint = 7, fing = null;
      const brush = g.by(5, 3, 2), PN = ["Plain", "Stripes", "Dots", "Waves"], nPat = g.by(1, 3, 4), cols = PAL.slice(0, g.by(8, 10, 12)).concat([clay]);
      const pr = r => y0 + (y1 - y0) * r / (NR - 1), rowOf = y => g.clamp(Math.round((y - y0) / (y1 - y0) * (NR - 1)), 0, NR - 1);
      const setR = (r, rad) => { for (let d = -2; d <= 2; d++) { const k = r + d; if (k < 0 || k >= NR) continue; st.R[k] += (rad - st.R[k]) * [.2, .5, .85, .5, .2][d + 2]; } };
      const hist = mkHist(g, () => st, o => { st = o; });
      const modeB = mkBar(g), cB = mkBar(g), act = mkBar(g), shapeBtn = mkBtn(g, modeB, "Shape", () => { mode = "shape"; hl(shapeBtn, true); hl(paintBtn, false); }), paintBtn = mkBtn(g, modeB, "Paint", () => { mode = "paint"; hl(shapeBtn, false); hl(paintBtn, true); });
      hl(shapeBtn, true);
      mkBtn(g, modeB, "Fill all", () => { st.C.fill(col); mode = "paint"; hl(shapeBtn, false); hl(paintBtn, true); hist.push(); g.add(1); g.sfx("splash"); });
      mkBtn(g, modeB, "Spin", b => { spd = [1, 2, .4, 0][(([1, 2, .4, 0].indexOf(spd)) + 1) % 4]; b.textContent = "Spin: " + ({ 1: "normal", 2: "fast", .4: "slow", 0: "stop" })[spd]; });
      mkLabel(cB, "Paint"); mkSwatches(g, cB, cols, col, v => { col = v; mode = "paint"; hl(shapeBtn, false); hl(paintBtn, true); });
      if (g.diff > 0) mkBtn(g, act, "Pattern", b => { st.pat = (st.pat + 1) % nPat; b.textContent = "Pattern: " + PN[st.pat]; hist.push(); g.add(1); });
      if (g.diff > 1) { mkLabel(cB, "Pattern colour"); mkSwatches(g, cB, cols, st.pc, v => { st.pc = v; hist.push(); }); mkBtn(g, act, "Handles", () => { st.han = !st.han; hist.push(); g.add(1); }); }
      mkBtn(g, act, "Undo", () => hist.undo());
      mkBtn(g, act, "New clay", () => { st.R.fill(70); st.C.fill(clay); st.pat = 0; st.han = false; hist.push(); g.sfx("thump"); });
      mkBtn(g, act, "Surprise me", () => { const a = g.rf(.15, .5), b = g.rf(0, 6), d = g.rf(.3, .9), c1 = g.pick(cols), c2 = g.pick(cols), bs = g.ri(2, 6); for (let r = 0; r < NR; r++) { st.R[r] = g.clamp(70 + 38 * Math.sin(r * a + b) + 18 * Math.sin(r * d), 24, rmax); st.C[r] = Math.floor(r / bs) % 2 ? c1 : c2; } st.pat = g.ri(0, nPat - 1); hist.push(); g.add(1); g.sfx("cheer"); });
      mkEnd(g, act, c, "my-vase"); hist.push();
      const act2 = e => {
        const p = pos(e); fing = p; if (!down) return; const row = rowOf(p.y);
        if (p.y < y0 - 25 || p.y > y1 + 25) { lastRow = -1; return; }
        const from = lastRow < 0 ? row : lastRow, dir = row >= from ? 1 : -1;
        for (let r = from; r !== row + dir; r += dir) {
          if (mode === "shape") setR(r, g.clamp(Math.abs(p.x - cx), 16, rmax)); else for (let k = r - brush; k <= r + brush; k++) if (k >= 0 && k < NR) st.C[k] = col;
        }
        lastRow = row; hint = 0;
      };
      g.on(c, "pointerdown", e => { down = true; lastRow = -1; act2(e); g.sfx(mode === "shape" ? "thump" : "splash"); });
      g.on(c, "pointermove", act2);
      const up = () => { if (down) { down = false; lastRow = -1; hist.push(); g.add(1); fx.burst(cx, 250, [clay, "#fff"], 8, 100); } fing = null; };
      g.on(c, "pointerup", up); g.on(c, "pointercancel", up); g.on(c, "pointerleave", up);
      g.loop((dt, t) => {
        rot += dt * spd * 2.2; if (hint > 0 && !down) hint -= dt * .3;
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#ffeccf"); gr.addColorStop(1, "#f4b98a"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        // wheel base
        x.fillStyle = "#4a3f55"; x.beginPath(); x.ellipse(cx, y1 + 38, 190, 34, 0, 0, 7); x.fill(); x.fillStyle = "#6c6280"; x.fillRect(cx - 40, y1 + 30, 80, 70);
        const bg2 = x.createLinearGradient(cx - 200, 0, cx + 200, 0); bg2.addColorStop(0, "#9a90ad"); bg2.addColorStop(.4, "#d8d2e3"); bg2.addColorStop(1, "#7a708c"); x.fillStyle = bg2; x.beginPath(); x.ellipse(cx, y1 + 14, 200, 36, 0, 0, 7); x.fill();
        for (let j = 0; j < 14; j++) { const th = rot + j * PI2 / 14, sn = Math.sin(th); if (sn > 0) dot(x, "rgba(60,50,80,.5)", cx + Math.cos(th) * 175, y1 + 14 + sn * 30, 3); }
        if (st.han) [-1, 1].forEach(s => ln(x, st.C[14], 14, q2 => { q2.moveTo(cx + s * st.R[8], pr(8)); q2.bezierCurveTo(cx + s * (st.R[8] + 70), pr(5), cx + s * (st.R[22] + 80), pr(26), cx + s * st.R[22], pr(22)); }));
        for (let r = 0; r < NR - 1; r++) {
          const a = st.R[r], b = st.R[r + 1], ya = pr(r), yb = pr(r + 1);
          x.beginPath(); x.moveTo(cx - a, ya); x.ellipse(cx, ya, a, a * .2, 0, PI, 0, true); x.lineTo(cx + b, yb); x.ellipse(cx, yb, b, b * .2, 0, 0, PI); x.closePath();
          x.fillStyle = st.C[r]; x.fill(); x.lineWidth = 1; x.strokeStyle = st.C[r]; x.stroke();
          const lg = x.createLinearGradient(cx - a, 0, cx + a, 0); lg.addColorStop(0, "rgba(0,0,0,.3)"); lg.addColorStop(.28, "rgba(255,255,255,.4)"); lg.addColorStop(.5, "rgba(255,255,255,0)"); lg.addColorStop(1, "rgba(0,0,0,.45)"); x.fillStyle = lg; x.fill();
        }
        const rb = st.R[NR - 1]; x.beginPath(); x.ellipse(cx, y1, rb, rb * .2, 0, 0, PI); x.fillStyle = st.C[NR - 1]; x.fill(); x.fillStyle = "rgba(0,0,0,.3)"; x.fill();
        if (st.pat > 0) for (let r = 0; r < NR; r += (st.pat === 2 ? 2 : 1)) {
          const R0 = st.R[r], yy = pr(r), k = st.pat === 2 ? 10 : 12;
          for (let j = 0; j < k; j++) {
            const th = rot + j * PI2 / k + (st.pat === 3 ? Math.sin(r * .45) * .35 : (st.pat === 2 && (r / 2) % 2 ? PI / k : 0)), cs = Math.cos(th); if (cs < .08) continue;
            const px = cx + R0 * Math.sin(th), py = yy + R0 * .2 * cs; x.fillStyle = st.pc;
            if (st.pat === 2) { x.beginPath(); x.ellipse(px, py, 4 * cs + .5, 4, 0, 0, 7); x.fill(); } else x.fillRect(px - (3 * cs + .5), py - 3, 6 * cs + 1, 7.5);
          }
        }
        const R0 = st.R[0]; x.beginPath(); x.ellipse(cx, y0, R0, R0 * .2, 0, 0, 7); x.fillStyle = "#3a2012"; x.fill(); x.lineWidth = 4; x.strokeStyle = st.C[0]; x.stroke(); x.beginPath(); x.ellipse(cx, y0 + 3, R0 * .9, R0 * .16, 0, 0, PI); x.fillStyle = "rgba(0,0,0,.35)"; x.fill();
        if (hint > 0) { x.globalAlpha = Math.min(1, hint); x.fillStyle = "#5a3820"; x.font = "bold 20px system-ui, sans-serif"; x.textAlign = "center"; x.fillText(mode === "shape" ? "Drag sideways on the clay!" : "Drag over the vase to paint!", cx, 60); x.globalAlpha = 1; }
        if (fing && down) { dot(x, "rgba(255,255,255,.35)", fing.x, fing.y, 16); x.strokeStyle = "#fff"; x.lineWidth = 3; x.beginPath(); x.arc(fing.x, fing.y, 16, 0, 7); x.stroke(); }
        fx.draw(x, dt);
      });
    }
  });

  // ---- Snowflake Cutter ----
  B.add({
    id: "s11-snowflake", name: "Snowflake Cutter", ages: [5, 20], cat: "Creative", color: "#9fe3ff", icon: "*",
    desc: "Snip shapes out of folded paper and watch a lacy snowflake appear.", controls: "Tap or drag inside the folded paper (left) to cut. The snowflake (right) updates live",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), CC = 150;
      const paper = document.createElement("canvas"); paper.width = 600; paper.height = 600; const q = paper.getContext("2d"); q.scale(2, 2);
      const Ks = g.by([6], [6, 8], [4, 5, 6, 8, 10, 12]), SZ = g.by([15], [8, 14, 22], [5, 9, 14, 22, 30]), nSh = g.by(3, 4, 5);
      const ld = g.load() || {}; let K = Ks.includes(ld.K) ? ld.K : Ks[0], cuts = Array.isArray(ld.cuts) ? ld.cuts.slice(0, 600) : [];
      let shape = 0, szI = g.by(0, 1, 2), spin = 0, ang = 0, down = false, last = null, hov = null;
      const flakes = Array.from({ length: 36 }, () => ({ x: g.rf(0, 640), y: g.rf(0, 400), v: g.rf(14, 40), r: g.rf(1, 3) }));
      const SHP = [
        (p, s) => { p.beginPath(); p.arc(0, 0, s, 0, 7); },
        (p, s) => { p.beginPath(); p.moveTo(s * 1.2, 0); p.lineTo(-s * .8, -s * .9); p.lineTo(-s * .8, s * .9); p.closePath(); },
        (p, s) => { p.beginPath(); p.moveTo(s * 1.4, 0); p.lineTo(0, -s * .8); p.lineTo(-s * 1.4, 0); p.lineTo(0, s * .8); p.closePath(); },
        (p, s) => { p.beginPath(); p.rect(-s * 1.6, -s * .22, s * 3.2, s * .44); },
        (p, s) => { p.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? s * .45 : s * 1.1, a = i * PI / 5; p.lineTo(Math.cos(a) * r, Math.sin(a) * r); } p.closePath(); }
      ];
      const cutAt = (k, a, b, s) => {
        q.globalCompositeOperation = "destination-out"; q.fillStyle = "#000";
        for (let i = 0; i < K; i++) for (let m = 0; m < 2; m++) { q.save(); q.translate(CC, CC); q.rotate(i * PI2 / K); if (m) q.scale(1, -1); q.translate(a, b); SHP[k % SHP.length](q, s); q.fill(); q.restore(); }
        q.globalCompositeOperation = "source-over";
      };
      const reset = () => { q.globalCompositeOperation = "source-over"; q.clearRect(0, 0, 300, 300); q.fillStyle = "#fff"; q.beginPath(); q.arc(CC, CC, 148, 0, 7); q.fill(); };
      const replay = () => { reset(); cuts.forEach(u => cutAt(u.k, u.a, u.b, u.s)); };
      const keep = () => g.save({ K, cuts });
      const Sc = () => Math.min(2.26, 1 / Math.sin(PI / K));
      const map = e => { const p = pos(e), S = Sc(), a = (372 - p.y) / S, b = (p.x - 160) / S; return { a, b, px: p.x, py: p.y, ok: a > 0 && Math.hypot(a, b) < 146 && Math.abs(Math.atan2(b, a)) <= PI / K + .01 }; };
      const doCut = m => { if (cuts.length >= 600) return; const u = { k: shape, a: Math.round(m.a * 10) / 10, b: Math.round(m.b * 10) / 10, s: SZ[szI] }; cuts.push(u); cutAt(u.k, u.a, u.b, u.s); };
      g.on(c, "pointerdown", e => { const m = map(e); hov = m; if (!m.ok) { g.sfx("wrong"); return; } down = true; last = m; doCut(m); g.add(1); g.sfx("swish"); });
      g.on(c, "pointermove", e => { const m = map(e); hov = m; if (!down || !m.ok) return; if (Math.hypot(m.a - last.a, m.b - last.b) > SZ[szI] * 1.4) { doCut(m); last = m; g.sfx("tick"); } });
      const up = () => { if (down) { down = false; keep(); } };
      g.on(c, "pointerup", up); g.on(c, "pointercancel", up); g.on(c, "pointerleave", () => { hov = null; up(); });
      const sB = mkBar(g), act = mkBar(g), st = [];
      mkLabel(sB, "Cutter");
      for (let i = 0; i < nSh; i++) st.push(mkThumb(g, sB, 44, 44, (p, w, h) => { p.translate(w / 2, h / 2); SHP[i](p, 13); p.fillStyle = "#3a62b8"; p.fill(); }, () => { shape = i; mark(st, i); }));
      mark(st, 0);
      const szB = mkBtn(g, sB, "Size " + (szI + 1) + "/" + SZ.length, () => { szI = (szI + 1) % SZ.length; szB.textContent = "Size " + (szI + 1) + "/" + SZ.length; });
      if (Ks.length > 1) { const kB = mkBtn(g, sB, "Folds: " + K, () => { K = Ks[(Ks.indexOf(K) + 1) % Ks.length]; kB.textContent = "Folds: " + K; replay(); keep(); g.sfx("flip"); }); }
      mkBtn(g, act, "Unfold!", () => { spin = 6; g.sfx("cheer"); });
      mkBtn(g, act, "Undo", () => { if (cuts.length) { cuts.pop(); replay(); keep(); g.sfx("back"); } });
      mkBtn(g, act, "New paper", () => { cuts = []; replay(); keep(); g.sfx("swish"); });
      mkBtn(g, act, "Save picture", () => { const o = document.createElement("canvas"); o.width = 400; o.height = 400; const z = o.getContext("2d"), gr = z.createLinearGradient(0, 0, 0, 400); gr.addColorStop(0, "#14224f"); gr.addColorStop(1, "#3a62b8"); z.fillStyle = gr; z.fillRect(0, 0, 400, 400); z.drawImage(paper, 20, 20, 360, 360); g.saveImage(o, "my-snowflake"); });
      mkBtn(g, act, "Finish", () => g.over("Nice work!"));
      replay();
      g.loop((dt, t) => {
        spin *= Math.max(0, 1 - 1.5 * dt); ang += dt * (.2 + spin); const S = Sc();
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#0e1a44"); gr.addColorStop(1, "#27468f"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        flakes.forEach(f => { f.y += f.v * dt; f.x += Math.sin(t + f.r * 3) * 8 * dt; if (f.y > 405) { f.y = -5; f.x = g.rf(0, 640); } x.globalAlpha = .6; dot(x, "#fff", f.x, f.y, f.r); }); x.globalAlpha = 1;
        x.fillStyle = "rgba(0,0,0,.2)"; x.fillRect(318, 0, 4, H);
        x.save(); x.translate(160, 372); x.rotate(-PI / 2); x.scale(S, S); x.translate(-CC, -CC); x.beginPath(); x.moveTo(CC, CC); x.arc(CC, CC, 150, -PI / K, PI / K); x.closePath(); x.fillStyle = "#3a62b8"; x.fill(); x.clip(); x.drawImage(paper, 0, 0, 300, 300); x.restore();
        x.save(); x.translate(160, 372); x.rotate(-PI / 2); x.scale(S, S); x.translate(-CC, -CC); x.beginPath(); x.moveTo(CC, CC); x.arc(CC, CC, 150, -PI / K, PI / K); x.closePath(); x.setLineDash([8 / S, 6 / S]); x.lineDashOffset = -t * 6; x.lineWidth = 2.5 / S; x.strokeStyle = "#fff"; x.stroke(); x.restore();
        if (hov && hov.ok) { x.save(); x.translate(hov.px, hov.py); x.rotate(-PI / 2); x.scale(S, S); SHP[shape](x, SZ[szI]); x.lineWidth = 2 / S; x.strokeStyle = "#ffd93d"; x.stroke(); x.restore(); }
        if (!cuts.length) { x.fillStyle = "rgba(255,255,255,.85)"; x.font = "bold 16px system-ui, sans-serif"; x.textAlign = "center"; x.fillText("Cut here", 160, 40); x.fillText("Your snowflake", 480, 28); }
        const rg = x.createRadialGradient(480, 200, 10, 480, 200, 170); rg.addColorStop(0, "rgba(170,225,255,.35)"); rg.addColorStop(1, "rgba(170,225,255,0)"); x.fillStyle = rg; x.fillRect(320, 20, 320, 360);
        x.save(); x.translate(480, 200); x.rotate(ang); x.drawImage(paper, -150, -150, 300, 300); x.restore();
        dot(x, "rgba(255,255,255," + (.4 + .3 * Math.sin(t * 4)) + ")", 480 + Math.cos(ang * 2) * 60, 200 + Math.sin(ang * 2) * 60, 3);
      });
    }
  });

  // ---- Room Designer ----
  B.add({
    id: "s11-room", name: "Room Designer", ages: [6, 20], cat: "Creative", color: "#6be28f", icon: "R",
    desc: "Paint the walls, pick the floor and fill your dream room with furniture.", controls: "Pick furniture, tap the room to place it, drag to move. Pick colours for walls and items",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), fx = mkFx(), FY = 250;
      let T = 0, night = false;
      const FUR = [
        { n: "Bed", w: 150, h: 82, c: "#ff8fd0", d: (q, k) => { sh(q, "#8b5a2b", q => q.rect(-78, -82, 12, 82), 5); sh(q, "#a8703a", q => q.roundRect(-72, -30, 148, 22, 5), 5); sh(q, "#fff", q => q.roundRect(-68, -48, 140, 24, 8), 5); sh(q, k, q => q.roundRect(-18, -54, 92, 34, 8), 5); sh(q, "#fffdf0", q => q.ellipse(-48, -56, 22, 10, 0, 0, 7), 4); } },
        { n: "Rug", w: 140, h: 30, flat: 1, c: "#7b6cff", d: (q, k) => { sh(q, k, q => q.ellipse(0, -14, 70, 14, 0, 0, 7), 5); q.strokeStyle = "rgba(255,255,255,.6)"; q.lineWidth = 3; q.beginPath(); q.ellipse(0, -14, 50, 9, 0, 0, 7); q.stroke(); } },
        { n: "Plant", w: 50, h: 90, c: "#c8794a", d: (q, k, t) => { for (let i = 0; i < 5; i++) { q.save(); q.translate(0, -38); q.rotate((i - 2) * .45 + Math.sin(t * 2 + i) * .06); sh(q, "#3fb55b", q => q.ellipse(0, -22, 9, 24, 0, 0, 7), 4); q.restore(); } sh(q, k, q => { q.moveTo(-18, -40); q.lineTo(18, -40); q.lineTo(13, 0); q.lineTo(-13, 0); q.closePath(); }, 5); } },
        { n: "Lamp", w: 44, h: 130, c: "#ffd93d", glow: 1, d: (q, k) => { sh(q, "#555", q => q.ellipse(0, -3, 16, 5, 0, 0, 7), 4); ln(q, "#777", 5, q => { q.moveTo(0, -4); q.lineTo(0, -100); }); sh(q, k, q => { q.moveTo(-14, -100); q.lineTo(14, -100); q.lineTo(22, -128); q.lineTo(-22, -128); q.closePath(); }, 4); } },
        { n: "Window", w: 96, h: 96, wall: 1, c: "#ff5c7a", d: (q, k, t, ni) => { sh(q, ni ? "#101538" : "#9fe3ff", q => q.rect(-40, -40, 80, 80), 5); if (ni) { dot(q, "#ffe9a8", 14, -16, 9); [[-20, -20], [-8, 8], [22, 14], [-26, 18]].forEach((p, i) => dot(q, "#fff", p[0], p[1], 1.5 + (Math.sin(t * 3 + i) > 0 ? .8 : 0))); } else { dot(q, "#fff", -10 + Math.sin(t * .5) * 12, -14, 9); dot(q, "#fff", 2 + Math.sin(t * .5) * 12, -18, 7); } q.strokeStyle = OUT; q.lineWidth = 4; q.beginPath(); q.moveTo(0, -40); q.lineTo(0, 40); q.moveTo(-40, 0); q.lineTo(40, 0); q.stroke(); sh(q, k, q => { q.moveTo(-46, -46); q.lineTo(-24, -46); q.quadraticCurveTo(-34, 0, -24, 46); q.lineTo(-46, 46); q.closePath(); q.moveTo(46, -46); q.lineTo(24, -46); q.quadraticCurveTo(34, 0, 24, 46); q.lineTo(46, 46); q.closePath(); }, 4); } },
        { n: "Picture", w: 66, h: 56, wall: 1, c: "#8b5a2b", d: (q, k) => { sh(q, k, q => q.rect(-30, -25, 60, 50), 5); q.fillStyle = "#9fe3ff"; q.fillRect(-24, -19, 48, 38); dot(q, "#ffd93d", 10, -8, 6); q.fillStyle = "#4cbb5b"; q.beginPath(); q.moveTo(-24, 19); q.quadraticCurveTo(-8, -6, 8, 19); q.fill(); q.beginPath(); q.moveTo(-4, 19); q.quadraticCurveTo(12, 2, 24, 19); q.fillStyle = "#3fa04e"; q.fill(); } },
        { n: "Desk", w: 124, h: 78, c: "#e0a878", d: (q, k) => { sh(q, "#a8703a", q => q.rect(-58, -66, 8, 66), 4); sh(q, "#a8703a", q => q.rect(50, -66, 8, 66), 4); sh(q, k, q => q.rect(-26, -64, 56, 30), 4); dot(q, "#555", 2, -50, 3); sh(q, k, q => q.roundRect(-62, -76, 124, 12, 4), 5); sh(q, "#3ec1ff", q => q.rect(-46, -92, 26, 16), 3); sh(q, "#ff5c7a", q => q.rect(24, -88, 18, 12), 3); } },
        { n: "Chair", w: 52, h: 84, c: "#3ec1ff", d: (q, k) => { sh(q, "#8b5a2b", q => { q.rect(-20, -34, 6, 34); q.rect(14, -34, 6, 34); }, 4); sh(q, k, q => q.roundRect(-22, -84, 10, 52, 4), 4); sh(q, k, q => q.roundRect(-22, -42, 46, 12, 4), 4); } },
        { n: "Books", w: 96, h: 124, c: "#8b5a2b", d: (q, k) => { sh(q, k, q => q.rect(-45, -124, 90, 124), 5); const bc = ["#ff5c7a", "#ffd93d", "#3ec1ff", "#6be28f", "#c86bff", "#ff9f43"]; for (let r = 0; r < 3; r++) { q.fillStyle = "rgba(0,0,0,.25)"; q.fillRect(-40, -88 + r * 40, 80, 4); for (let i = 0; i < 7; i++) { q.fillStyle = bc[(i + r * 2) % 6]; q.fillRect(-38 + i * 11, -88 + r * 40 - 26 + (i % 3) * 3, 8, 26 - (i % 3) * 3); } } } },
        { n: "Wardrobe", w: 92, h: 132, c: "#c8794a", d: (q, k) => { sh(q, k, q => q.rect(-46, -132, 92, 132), 5); q.strokeStyle = OUT; q.lineWidth = 3; q.beginPath(); q.moveTo(0, -128); q.lineTo(0, -4); q.stroke(); sh(q, "rgba(255,255,255,.2)", q => { q.rect(-38, -122, 32, 50); q.rect(6, -122, 32, 50); }, 2); dot(q, "#ffd93d", -8, -60, 4); dot(q, "#ffd93d", 8, -60, 4); } },
        { n: "Cat", w: 54, h: 54, c: "#ff9f43", d: (q, k, t) => { ln(q, k, 7, q => { q.moveTo(20, -8); q.quadraticCurveTo(44 + Math.sin(t * 4) * 8, -12, 38, -40); }); sh(q, k, q => q.ellipse(0, -20, 22, 20, 0, 0, 7), 4); sh(q, k, q => { q.moveTo(-16, -50); q.lineTo(-14, -66); q.lineTo(-4, -54); q.closePath(); q.moveTo(16, -50); q.lineTo(14, -66); q.lineTo(4, -54); q.closePath(); }, 3); sh(q, k, q => q.arc(0, -46, 17, 0, 7), 4); dot(q, OUT, -6, -48, 3); dot(q, OUT, 6, -48, 3); dot(q, "#ff8fa8", 0, -42, 2.5); } },
        { n: "Couch", w: 156, h: 72, c: "#3ec1ff", d: (q, k) => { sh(q, "#555", q => { q.rect(-66, -8, 8, 8); q.rect(58, -8, 8, 8); }, 3); sh(q, k, q => q.roundRect(-72, -72, 144, 44, 14), 5); sh(q, k, q => q.roundRect(-66, -44, 132, 36, 8), 5); sh(q, k, q => q.roundRect(-82, -54, 26, 46, 10), 5); sh(q, k, q => q.roundRect(56, -54, 26, 46, 10), 5); q.strokeStyle = "rgba(0,0,0,.25)"; q.lineWidth = 3; q.beginPath(); q.moveTo(0, -42); q.lineTo(0, -12); q.stroke(); } },
        { n: "Table", w: 90, h: 62, c: "#e0a878", d: (q, k) => { sh(q, "#a8703a", q => q.rect(-6, -56, 12, 56), 4); sh(q, "#a8703a", q => q.ellipse(0, -3, 26, 6, 0, 0, 7), 4); sh(q, k, q => q.ellipse(0, -58, 44, 10, 0, 0, 7), 5); sh(q, "#9fe3ff", q => q.roundRect(-8, -80, 16, 20, 4), 3); dot(q, "#ff5c7a", 0, -86, 7); } },
        { n: "TV", w: 104, h: 72, c: "#3ec1ff", d: (q, k, t) => { sh(q, "#555", q => q.rect(-22, -16, 44, 14), 4); sh(q, "#2b3245", q => q.roundRect(-50, -72, 100, 58, 7), 5); const sg = q.createLinearGradient(-44, -66, 44, -20); sg.addColorStop(0, k); sg.addColorStop(.5 + .3 * Math.sin(t * 2), "#fff"); sg.addColorStop(1, k); q.fillStyle = sg; q.fillRect(-44, -66, 88, 46); } },
        { n: "Beanbag", w: 84, h: 62, c: "#ff5c7a", d: (q, k) => { sh(q, k, q => { q.moveTo(-40, -2); q.quadraticCurveTo(-48, -50, -8, -58); q.quadraticCurveTo(36, -62, 42, -2); q.closePath(); }, 5); dot(q, "rgba(255,255,255,.35)", -14, -38, 9); } },
        { n: "Clock", w: 54, h: 54, wall: 1, c: "#ffd93d", d: (q, k) => { sh(q, "#fff", q => q.arc(0, 0, 24, 0, 7), 5); q.strokeStyle = k; q.lineWidth = 4; q.beginPath(); q.arc(0, 0, 27, 0, 7); q.stroke(); const dn = new Date(), a1 = dn.getMinutes() / 60 * PI2 - PI / 2, a2 = (dn.getHours() % 12 + dn.getMinutes() / 60) / 12 * PI2 - PI / 2, a3 = dn.getSeconds() / 60 * PI2 - PI / 2; q.lineCap = "round"; q.strokeStyle = OUT; q.lineWidth = 3; q.beginPath(); q.moveTo(0, 0); q.lineTo(Math.cos(a1) * 18, Math.sin(a1) * 18); q.moveTo(0, 0); q.lineTo(Math.cos(a2) * 12, Math.sin(a2) * 12); q.stroke(); q.strokeStyle = "#e0343c"; q.lineWidth = 1.5; q.beginPath(); q.moveTo(0, 0); q.lineTo(Math.cos(a3) * 20, Math.sin(a3) * 20); q.stroke(); } },
        { n: "Fish tank", w: 90, h: 64, c: "#3ec1ff", d: (q, k, t) => { sh(q, "#a8703a", q => q.rect(-40, -10, 80, 10), 4); sh(q, "rgba(120,200,255,.45)", q => q.rect(-40, -60, 80, 52), 4); q.fillStyle = k; q.globalAlpha = .45; q.fillRect(-38, -46, 76, 36); q.globalAlpha = 1; for (let i = 0; i < 2; i++) { const fx2 = Math.sin(t * (1 + i * .5) + i * 2) * 24; q.save(); q.translate(fx2, -28 - i * 10); q.scale(Math.cos(t * (1 + i * .5) + i * 2) > 0 ? 1 : -1, 1); sh(q, i ? "#ff9f43" : "#ffd93d", q => { q.ellipse(0, 0, 8, 5, 0, 0, 7); q.moveTo(8, 0); q.lineTo(14, -5); q.lineTo(14, 5); q.closePath(); }, 2); q.restore(); } } }
      ];
      const nF = g.by(6, 11, 17), WALLS = ["#ffd9e8", "#ffe9a8", "#bfe9ff", "#c9f2c7", "#e0d4ff", "#ffcfa0", "#f5f5f5", "#7fd0d0"], FLN = ["Wood", "Carpet", "Tiles"], nFl = g.by(1, 2, 3), nWp = g.by(1, 3, 3);
      let sc = { wall: WALLS[2], wp: 0, fl: 0, items: [] }; const ld = g.load();
      if (ld && Array.isArray(ld.items)) { sc = Object.assign(sc, ld); sc.fl %= nFl; sc.wp %= nWp; }
      let sel = -1, tool = 0, drag = null, moved = false;
      const hist = mkHist(g, () => sc, o => { sc = o; sel = -1; });
      const fB = mkBar(g), cB = mkBar(g), act = mkBar(g), ft = [];
      for (let i = 0; i < nF; i++) ft.push(mkThumb(g, fB, 54, 46, (q, w, h) => { T = 0; q.translate(w / 2, FUR[i].wall ? h / 2 : h - 4); const k = Math.min(.5, 44 / FUR[i].h, 50 / FUR[i].w); q.scale(k, k); FUR[i].d(q, FUR[i].c, 0, false); }, () => { tool = i; mark(ft, i); }));
      mark(ft, 0);
      mkLabel(cB, "Wall"); mkSwatches(g, cB, WALLS, sc.wall, v => { sc.wall = v; hist.push(); g.add(1); });
      mkLabel(cB, "Item colour"); mkSwatches(g, cB, PAL, "x", v => { if (sel >= 0 && sc.items[sel]) { sc.items[sel].c = v; hist.push(); g.sfx("pop"); } else g.sfx("wrong"); });
      const upd = fn => { if (sel >= 0 && sc.items[sel]) { fn(sc.items[sel]); hist.push(); g.sfx("pop"); } };
      if (nFl > 1) mkBtn(g, act, "Floor", () => { sc.fl = (sc.fl + 1) % nFl; hist.push(); g.add(1); });
      if (nWp > 1) mkBtn(g, act, "Wallpaper", () => { sc.wp = (sc.wp + 1) % nWp; hist.push(); g.add(1); });
      if (g.diff > 0) mkBtn(g, act, "Lights", b => { night = !night; hl(b, night); g.sfx("click"); });
      mkBtn(g, act, "Bigger", () => upd(it => { it.s = Math.min(2.2, it.s * 1.15); }));
      mkBtn(g, act, "Smaller", () => upd(it => { it.s = Math.max(.5, it.s / 1.15); }));
      mkBtn(g, act, "Flip", () => upd(it => { it.f = -it.f; }));
      mkBtn(g, act, "Delete", () => { if (sel >= 0) { sc.items.splice(sel, 1); sel = -1; hist.push(); g.sfx("back"); } });
      mkBtn(g, act, "Undo", () => hist.undo());
      mkBtn(g, act, "Furnish for me", () => { sc.items = []; for (let i = 0; i < g.by(5, 8, 11); i++) { const k = g.ri(0, nF - 1), F = FUR[k]; sc.items.push({ k, x: g.rf(70, 570), y: F.wall ? g.rf(70, 190) : g.rf(FY + 40, 392), s: 1, f: g.pick([1, -1]), c: g.pick(PAL.slice(0, 10)) }); } sc.wall = g.pick(WALLS); hist.push(); g.add(3); g.sfx("cheer"); });
      mkBtn(g, act, "Clear", () => { sc.items = []; sel = -1; hist.push(); g.sfx("swish"); });
      mkEnd(g, act, c, "my-room"); hist.push();
      const hit = p => { for (let i = sc.items.length - 1; i >= 0; i--) { const it = sc.items[i], F = FUR[it.k % nF]; if (Math.abs(it.x - p.x) < F.w / 2 * it.s && (F.wall ? Math.abs(it.y - p.y) < F.h / 2 * it.s : (p.y < it.y + 4 && p.y > it.y - F.h * it.s))) return i; } return -1; };
      g.on(c, "pointerdown", e => {
        const p = pos(e), i = hit(p); moved = false;
        if (i >= 0) { sel = i; drag = { dx: sc.items[i].x - p.x, dy: sc.items[i].y - p.y }; g.sfx("pick"); return; }
        const F = FUR[tool]; sc.items.push({ k: tool, x: p.x, y: F.wall ? g.clamp(p.y, 60, FY - 35) : g.clamp(p.y + F.h * .4, FY + 14, 396), s: 1, f: 1, c: F.c });
        sel = sc.items.length - 1; drag = { dx: 0, dy: 0 }; moved = true; g.add(1); g.sfx("thump"); fx.burst(p.x, p.y, ["#fff", "#ffd93d"], 10);
      });
      g.on(c, "pointermove", e => { if (!drag || !sc.items[sel]) return; const p = pos(e), it = sc.items[sel], F = FUR[it.k % nF]; it.x = g.clamp(p.x + drag.dx, 20, 620); it.y = F.wall ? g.clamp(p.y + drag.dy, 50, FY - 30) : g.clamp(p.y + drag.dy, FY + 10, 396); moved = true; });
      const up = () => { if (drag && moved) hist.push(); drag = null; };
      g.on(c, "pointerup", up); g.on(c, "pointercancel", up);
      g.loop((dt, t) => {
        T = t;
        x.fillStyle = sc.wall; x.fillRect(0, 0, W, FY);
        if (sc.wp === 1) { x.fillStyle = "rgba(255,255,255,.28)"; for (let i = 0; i < 16; i++) x.fillRect(i * 40, 0, 20, FY); }
        else if (sc.wp === 2) { x.fillStyle = "rgba(255,255,255,.4)"; for (let j = 0; j < 6; j++) for (let i = 0; i < 17; i++) { x.beginPath(); x.arc(i * 40 + (j % 2) * 20, 20 + j * 42, 5, 0, 7); x.fill(); } }
        x.fillStyle = "rgba(0,0,0,.14)"; x.fillRect(0, FY - 12, W, 12);
        if (sc.fl === 0) { x.fillStyle = "#d9a066"; x.fillRect(0, FY, W, H - FY); x.strokeStyle = "rgba(90,50,20,.35)"; x.lineWidth = 2; for (let r = 0; r < 4; r++) { const yy = FY + r * 38; x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(i * 60 + (r % 2) * 30, yy); x.lineTo(i * 60 + (r % 2) * 30, yy + 38); x.stroke(); } } }
        else if (sc.fl === 1) { x.fillStyle = "#c9b8ff"; x.fillRect(0, FY, W, H - FY); x.fillStyle = "rgba(255,255,255,.35)"; for (let i = 0; i < 90; i++) x.fillRect((i * 97) % 640, FY + (i * 53) % 150, 3, 2); }
        else { for (let j = 0; j < 4; j++) for (let i = 0; i < 16; i++) { x.fillStyle = (i + j) % 2 ? "#e8eef5" : "#c3d3e6"; x.fillRect(i * 40, FY + j * 38, 40, 38); } }
        const order = sc.items.map((it, i) => i).sort((a, b) => { const A = sc.items[a], Bb = sc.items[b], fa = FUR[A.k % nF], fb = FUR[Bb.k % nF], ra = fa.wall ? 0 : fa.flat ? 1 : 2, rb = fb.wall ? 0 : fb.flat ? 1 : 2; return ra !== rb ? ra - rb : (A.y - Bb.y); });
        order.forEach(i => { const it = sc.items[i], F = FUR[it.k % nF]; x.save(); x.translate(it.x, it.y); x.scale(it.s * it.f, it.s); F.d(x, it.c, t, night); x.restore(); });
        if (night) {
          x.fillStyle = "rgba(8,8,40,.62)"; x.fillRect(0, 0, W, H); x.globalCompositeOperation = "lighter";
          sc.items.forEach(it => { const F = FUR[it.k % nF]; let gx = 0, gy = 0, rad = 0, col = ""; if (F.glow) { gx = it.x; gy = it.y - 112 * it.s; rad = 150 * it.s; col = "255,220,120"; } else if (F.n === "TV") { gx = it.x; gy = it.y - 40 * it.s; rad = 120 * it.s; col = "90,170,255"; } else if (F.n === "Window") { gx = it.x; gy = it.y; rad = 90 * it.s; col = "120,140,255"; } if (rad) { const rg = x.createRadialGradient(gx, gy, 4, gx, gy, rad); rg.addColorStop(0, "rgba(" + col + ",.45)"); rg.addColorStop(1, "rgba(" + col + ",0)"); x.fillStyle = rg; x.fillRect(gx - rad, gy - rad, rad * 2, rad * 2); } });
          x.globalCompositeOperation = "source-over";
        }
        if (sel >= 0 && sc.items[sel]) { const it = sc.items[sel], F = FUR[it.k % nF]; x.save(); x.setLineDash([6, 5]); x.lineDashOffset = -t * 20; x.strokeStyle = "#ff5c7a"; x.lineWidth = 3; if (F.wall) x.strokeRect(it.x - F.w / 2 * it.s - 4, it.y - F.h / 2 * it.s - 4, F.w * it.s + 8, F.h * it.s + 8); else x.strokeRect(it.x - F.w / 2 * it.s - 4, it.y - F.h * it.s - 4, F.w * it.s + 8, F.h * it.s + 8); x.restore(); }
        if (!sc.items.length) { x.fillStyle = "rgba(0,0,0,.5)"; x.font = "bold 22px system-ui, sans-serif"; x.textAlign = "center"; x.fillText("Pick a thing, then tap the room!", 320, 200); }
        fx.draw(x, dt);
      });
    }
  });

  // ---- Vehicle Workshop ----
  B.add({
    id: "s11-vehicle", name: "Vehicle Workshop", ages: [5, 16], cat: "Creative", color: "#ff9f43", icon: "V",
    desc: "Build a car, truck or rocket racer from parts, then watch it zoom down the road.", controls: "Pick a part type and a part. Tap the vehicle to honk, press Boost to zoom",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(560, 380), fx = mkFx();
      const cats = g.by(["Body", "Wheels"], ["Body", "Wheels", "Top", "Decal"], ["Body", "Wheels", "Top", "Decal", "Engine"]);
      const KEY = { Body: "b", Wheels: "w", Top: "t", Decal: "d", Engine: "e" }, NN = { Body: g.by(3, 5, 6), Wheels: 3, Top: g.by(1, 4, 5), Decal: g.by(1, 4, 5), Engine: 3 };
      const cols = PAL.slice(0, g.by(6, 9, 12)), WS = [.85, 1, 1.25], WR = [20, 28, 19], SPD = [200, 320, 520];
      let st = Object.assign({ b: 0, w: 0, t: 0, d: 0, e: 0, ws: 1, c: "#ff5c7a", c2: "#ffffff" }, g.load() || {});
      Object.keys(NN).forEach(k => { const kk = KEY[k]; st[kk] = (((st[kk] | 0) % NN[k]) + NN[k]) % NN[k]; });
      st.ws = g.clamp(st.ws | 0, 0, 2); if (!g.diff) st.ws = 1;
      let T = 0, ang = 0, scroll = 0, jy = 0, jv = 0, boost = 0, night = false, cur = cats[0], puff = 0;
      const LT = "#bfe9ff", star = (q, r) => { q.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * .42 : r, a = -PI / 2 + i * PI / 5; q.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } q.closePath(); q.fill(); };
      const BD = [
        { wx: 62, roof: -92, rear: -100, d: (q, k) => { sh(q, k, q => q.roundRect(-100, -52, 200, 32, 12)); sh(q, k, q => { q.moveTo(-58, -50); q.lineTo(-38, -92); q.lineTo(46, -92); q.lineTo(74, -50); q.closePath(); }); sh(q, LT, q => { q.moveTo(-46, -54); q.lineTo(-32, -86); q.lineTo(-2, -86); q.lineTo(-2, -54); q.closePath(); }, 4); sh(q, LT, q => { q.moveTo(6, -54); q.lineTo(6, -86); q.lineTo(40, -86); q.lineTo(62, -54); q.closePath(); }, 4); dot(q, "#ffe14d", 96, -38, 6); dot(q, "#ff5c5c", -96, -38, 5); } },
        { wx: 68, roof: -92, rear: -110, d: (q, k, k2) => { sh(q, k2, q => q.rect(-110, -72, 80, 26)); sh(q, k, q => q.roundRect(-110, -48, 220, 26, 8)); sh(q, k, q => { q.moveTo(-26, -48); q.lineTo(-26, -92); q.lineTo(28, -92); q.lineTo(54, -62); q.lineTo(72, -62); q.lineTo(72, -48); q.closePath(); }); sh(q, LT, q => { q.moveTo(-16, -86); q.lineTo(24, -86); q.lineTo(42, -64); q.lineTo(-16, -64); q.closePath(); }, 4); dot(q, "#ffe14d", 70, -54, 5); } },
        { wx: 78, roof: -94, rear: -120, d: (q, k, k2) => { sh(q, k, q => q.roundRect(-120, -94, 240, 70, 14)); for (let i = 0; i < 6; i++) sh(q, LT, q => q.roundRect(-108 + i * 37, -84, 29, 26, 5), 4); q.fillStyle = k2; q.fillRect(-116, -46, 232, 7); dot(q, "#ffe14d", 114, -34, 6); dot(q, "#ff5c5c", -114, -34, 5); } },
        { wx: 66, roof: -84, rear: -110, d: (q, k) => { sh(q, k, q => { q.moveTo(-112, -26); q.lineTo(-102, -52); q.lineTo(-30, -58); q.lineTo(0, -84); q.lineTo(46, -84); q.lineTo(100, -52); q.lineTo(114, -26); q.closePath(); }); sh(q, LT, q => { q.moveTo(-6, -58); q.lineTo(10, -78); q.lineTo(40, -78); q.lineTo(58, -56); q.closePath(); }, 4); dot(q, "#ffe14d", 106, -40, 5); } },
        { wx: 68, roof: -92, rear: -112, d: (q, k) => { sh(q, k, q => { q.moveTo(-112, -24); q.lineTo(-112, -92); q.lineTo(44, -92); q.lineTo(110, -48); q.lineTo(110, -24); q.closePath(); }); sh(q, LT, q => q.rect(-92, -82, 34, 24), 4); sh(q, LT, q => q.rect(-46, -82, 34, 24), 4); sh(q, LT, q => { q.moveTo(0, -84); q.lineTo(40, -84); q.lineTo(80, -56); q.lineTo(0, -56); q.closePath(); }, 4); dot(q, "#ffe14d", 106, -40, 5); } },
        { wx: 70, roof: -84, rear: -112, d: (q, k, k2) => { sh(q, k2, q => { q.moveTo(-96, -62); q.lineTo(-124, -100); q.lineTo(-60, -72); q.closePath(); }); sh(q, k, q => q.ellipse(0, -50, 116, 30, 0, 0, 7)); sh(q, k2, q => { q.moveTo(100, -70); q.lineTo(158, -50); q.lineTo(100, -30); q.closePath(); }); sh(q, LT, q => q.arc(10, -56, 13, 0, 7), 4); } }
      ];
      const wheel = (q, i, r, k2, a) => {
        q.save(); q.rotate(a); sh(q, i === 2 ? "#2b3245" : "#3a3f55", q => q.arc(0, 0, r, 0, 7), 5);
        if (i === 1) { q.fillStyle = "#222"; for (let j = 0; j < 10; j++) { q.save(); q.rotate(j * PI / 5); q.fillRect(r - 6, -4, 9, 8); q.restore(); } }
        dot(q, i === 2 ? k2 : "#c7ccd8", 0, 0, r * .55); q.strokeStyle = "#2b3245"; q.lineWidth = 3;
        for (let j = 0; j < (i === 2 ? 5 : 4); j++) { q.beginPath(); q.moveTo(0, 0); q.lineTo(Math.cos(j * PI2 / (i === 2 ? 5 : 4)) * r * .5, Math.sin(j * PI2 / (i === 2 ? 5 : 4)) * r * .5); q.stroke(); }
        dot(q, "#2b3245", 0, 0, r * .13); q.restore();
      };
      const TOP = [null,
        (q, b, k2) => { const x0 = b.rear + 8; sh(q, k2, q => q.rect(x0 - 3, -72, 6, 24), 3); sh(q, k2, q => q.roundRect(x0 - 18, -80, 36, 9, 3), 4); },
        (q, b, k2) => { sh(q, "#555", q => q.rect(-12, b.roof - 6, 24, 8), 3); const f = Math.sin(T * 10) > 0; dot(q, f ? "#ff3b3b" : "#3b6bff", -6, b.roof - 10, 6); dot(q, f ? "#3b6bff" : "#ff3b3b", 6, b.roof - 10, 6); },
        (q, b, k2) => { sh(q, k2, q => q.roundRect(-34, b.roof - 26, 68, 24, 6), 4); },
        (q, b, k2) => { ln(q, "#ccc", 3, q => { q.moveTo(0, b.roof); q.lineTo(0, b.roof - 50); }); sh(q, k2, q => { q.moveTo(0, b.roof - 50); q.lineTo(34 + Math.sin(T * 8) * 4, b.roof - 42); q.lineTo(0, b.roof - 30); q.closePath(); }, 3); }
      ];
      const DECAL = [null,
        q => { q.fillStyle = "rgba(255,255,255,.9)"; q.fillRect(-90, -42, 180, 7); },
        q => { dot(q, "#fff", 0, -44, 15); q.fillStyle = OUT; q.font = "bold 20px system-ui, sans-serif"; q.textAlign = "center"; q.textBaseline = "middle"; q.fillText("7", 0, -43); },
        q => { for (let i = 0; i < 3; i++) { q.fillStyle = "#ff9f43"; q.beginPath(); q.moveTo(-90 + i * 14, -32); q.lineTo(-76 + i * 14, -48); q.lineTo(-62 + i * 14, -32); q.closePath(); q.fill(); q.fillStyle = "#ffe14d"; q.beginPath(); q.moveTo(-84 + i * 14, -32); q.lineTo(-76 + i * 14, -42); q.lineTo(-68 + i * 14, -32); q.closePath(); q.fill(); } },
        q => { q.fillStyle = "#ffd93d"; [-60, -20, 20].forEach(px => { q.save(); q.translate(px, -38); star(q, 9); q.restore(); }); }
      ];
      const veh = (q, o) => {
        const b = BD[o.b % BD.length], r = WR[o.w] * WS[o.ws], lift = r - 20;
        q.save(); q.translate(0, -lift);
        if (o.e > 0) { const L = (o.e === 1 ? 26 : 48) + Math.sin(T * 40) * 8; sh(q, "#ffb21c", q => { q.moveTo(b.rear + 6, -36); q.lineTo(b.rear - L, -28); q.lineTo(b.rear + 6, -20); q.closePath(); }, 3); }
        b.d(q, o.c, o.c2); if (DECAL[o.d]) DECAL[o.d](q); if (TOP[o.t]) TOP[o.t](q, b, o.c2); q.restore();
        [-b.wx, b.wx].forEach(wx => { q.save(); q.translate(wx, -r); wheel(q, o.w, r, o.c2, ang); q.restore(); });
      };
      const part = (cat, i) => (q, w, h) => {
        if (cat === "Wheels") { q.translate(w / 2, h / 2); q.scale(1.2, 1.2); wheel(q, i, 18, "#ffb86b", 0); return; }
        q.translate(w / 2 + 4, h * .86); q.scale(.2, .2); const o = Object.assign({}, st, { c: "#ff5c7a", c2: "#ffffff", ws: 1, e: 0 }); o[KEY[cat]] = i; if (cat !== "Body") o.b = 0; if (cat !== "Wheels") o.w = 0; if (cat === "Body") { o.t = 0; o.d = 0; } veh(q, o);
      };
      const hist = mkHist(g, () => st, o => { st = o; buildRow(); sc1(st.c); if (sc2) sc2(st.c2); });
      const chg = () => { hist.push(); g.add(1); g.sfx("pop"); if (jy < 20) jv = 160; fx.burst(280, 250, [st.c, st.c2, "#fff"], 14); };
      const tabs = mkBar(g), row = mkBar(g), cr = mkBar(g), act = mkBar(g), tabBtns = {};
      const buildRow = () => {
        row.innerHTML = ""; const k = KEY[cur], bs = [];
        if (cur === "Engine") ["Normal", "Turbo", "Rocket"].forEach((nm, i) => { const b = mkBtn(g, row, nm, () => { st.e = i; buildRow(); chg(); }); hl(b, st.e === i); });
        else { for (let i = 0; i < NN[cur]; i++) bs.push(mkThumb(g, row, 64, 52, part(cur, i), () => { if (st[k] === i) return; st[k] = i; mark(bs, i); chg(); })); mark(bs, st[k]); }
        cats.forEach(k2 => hl(tabBtns[k2], k2 === cur));
      };
      cats.forEach(k => { tabBtns[k] = mkBtn(g, tabs, k, () => { cur = k; buildRow(); }); });
      mkLabel(cr, "Colour"); const sc1 = mkSwatches(g, cr, cols, st.c, v => { st.c = v; chg(); }); let sc2 = null;
      if (g.diff > 0) { mkLabel(cr, "Trim"); sc2 = mkSwatches(g, cr, cols, st.c2, v => { st.c2 = v; chg(); }); }
      buildRow();
      mkBtn(g, act, "Boost!", () => { boost = 2.5; g.sfx("rumble"); });
      mkBtn(g, act, "Honk", () => { g.sfx("beep"); if (jy < 20) jv = 200; });
      if (g.diff > 1) { mkBtn(g, act, "Wheel size", () => { st.ws = (st.ws + 1) % 3; chg(); }); mkBtn(g, act, "Day / Night", b => { night = !night; hl(b, night); }); }
      mkBtn(g, act, "Undo", () => hist.undo());
      mkBtn(g, act, "Surprise me", () => { cats.forEach(k => { st[KEY[k]] = g.ri(0, NN[k] - 1); }); st.c = g.pick(cols); st.c2 = g.pick(cols); buildRow(); sc1(st.c); if (sc2) sc2(st.c2); chg(); });
      mkEnd(g, act, c, "my-vehicle"); hist.push();
      g.on(c, "pointerdown", () => { g.sfx("beep"); if (jy < 20) jv = 220; fx.burst(280, 230, ["#ffd93d", "#fff"], 8); });
      g.loop((dt, t) => {
        T = t; if (boost > 0) boost -= dt; const spd = SPD[st.e] * (boost > 0 ? 2 : 1); scroll += spd * dt; ang += spd * dt / (22 * WS[st.ws]);
        if (jy > 0 || jv > 0) { jv -= 700 * dt; jy += jv * dt; if (jy <= 0) { jy = 0; jv = 0; } }
        const sky = x.createLinearGradient(0, 0, 0, 300); if (night) { sky.addColorStop(0, "#0a0a2e"); sky.addColorStop(1, "#3a2a78"); } else { sky.addColorStop(0, "#6fc8ff"); sky.addColorStop(1, "#e2f6ff"); } x.fillStyle = sky; x.fillRect(0, 0, W, H);
        if (night) { for (let i = 0; i < 30; i++) { x.globalAlpha = .4 + .6 * Math.abs(Math.sin(t * 2 + i)); dot(x, "#fff", (i * 97) % 560, (i * 41) % 200, 1.5); } x.globalAlpha = 1; dot(x, "#ffe9a8", 470, 60, 22); } else dot(x, "#ffe14d", 470, 62, 28);
        [[.15, 40, "#8fd0a0", 90, 240], [.35, 30, "#5fbf78", 70, 275]].forEach(h => { x.fillStyle = night ? "#1c2a50" : h[2]; x.beginPath(); x.moveTo(0, 300); for (let px = 0; px <= 560; px += 10) x.lineTo(px, h[4] + Math.sin((px + scroll * h[0]) / h[3] * 1.6) * h[1] * .6); x.lineTo(560, 300); x.closePath(); x.fill(); });
        for (let i = -1; i < 6; i++) { const tx = ((i * 130 - scroll * .6) % 780 + 780) % 780 - 100; x.fillStyle = "#6a4a2a"; x.fillRect(tx - 4, 262, 8, 38); dot(x, night ? "#23603a" : "#3fb55b", tx, 250, 22); }
        x.fillStyle = night ? "#2b2f45" : "#6b7088"; x.fillRect(0, 296, W, 84); x.fillStyle = night ? "#3a3f5a" : "#8a90a8"; x.fillRect(0, 296, W, 6);
        x.fillStyle = "#ffe14d"; for (let i = -1; i < 9; i++) x.fillRect(((i * 90 - scroll) % 810 + 810) % 810 - 90, 352, 46, 7);
        x.save(); x.translate(270, 334 - jy + Math.sin(t * 20) * (spd / 400)); x.scale(1.4, 1.4);
        if (night) { const bg2 = x.createLinearGradient(110, 0, 300, 0); bg2.addColorStop(0, "rgba(255,240,150,.55)"); bg2.addColorStop(1, "rgba(255,240,150,0)"); x.fillStyle = bg2; x.beginPath(); x.moveTo(100, -40); x.lineTo(300, -80); x.lineTo(300, 10); x.closePath(); x.fill(); }
        veh(x, st); x.restore();
        puff -= dt; if (puff <= 0 && st.e === 0) { puff = .12; fx.burst(270 - 140, 305 - jy, "#c8ccd8", 1, 30); }
        x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(270, 340, Math.max(2, 150 - jy * .3), 8, 0, 0, 7); x.fill();
        fx.draw(x, dt);
        if (boost > 0) { x.strokeStyle = "rgba(255,255,255,.6)"; x.lineWidth = 3; for (let i = 0; i < 8; i++) { const yy = 60 + i * 28, xx = ((i * 137 - scroll * 2) % 600 + 600) % 600; x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx + 40, yy); x.stroke(); } }
      });
    }
  });

  // ---- Spirograph Studio ----
  B.add({
    id: "s11-spiro", name: "Spirograph Studio", ages: [8, 20], cat: "Creative", color: "#c86bff", icon: "@",
    desc: "Roll a little gear around a big ring and draw swirly, rainbow patterns.", controls: "Pick a pattern (or move the sliders) and press Draw. Layer lots of curves on top of each other",
    start(g) {
      const S = 560, { c, x, W, H, pos } = g.canvas(S, S), fx = mkFx();
      const layer = document.createElement("canvas"); layer.width = S; layer.height = S; const q = layer.getContext("2d");
      const PRE = [[100, 40, 55], [100, 25, 70], [100, 60, 45], [100, 35, 60], [100, 20, 80], [100, 45, 65]], cols = PAL.slice(0, 10);
      const gcd = (a, b) => b ? gcd(b, a % b) : a;
      let P = { R: 100, r: 40, d: 60 }, col = "rb", lw = g.by(3, 2.2, 1.6), curves = [], run = null, snaps = [], T = 0;
      const ld = g.load(); if (Array.isArray(ld)) curves = ld.slice(-12);
      const pt = (R, r, d, t, sc) => { const k = (R - r) / r; return [S / 2 + ((R - r) * Math.cos(t) + d * Math.cos(k * t)) * sc, S / 2 + ((R - r) * Math.sin(t) - d * Math.sin(k * t)) * sc]; };
      const info = (R, r, d) => ({ sc: 250 / ((R - r) + d), end: PI2 * r / gcd(R, r) });
      const colAt = (cv, t) => cv.col === "rb" ? "hsl(" + Math.floor(cv.h + t * 25) % 360 + ",90%,62%)" : cv.col;
      const seg = (cv, t0, t1) => { const i = info(cv.R, cv.r, cv.d), a = pt(cv.R, cv.r, cv.d, t0, i.sc), b = pt(cv.R, cv.r, cv.d, t1, i.sc); q.strokeStyle = colAt(cv, t1); q.lineWidth = cv.lw; q.lineCap = "round"; q.beginPath(); q.moveTo(a[0], a[1]); q.lineTo(b[0], b[1]); q.stroke(); };
      const instant = cv => { const i = info(cv.R, cv.r, cv.d); for (let t = 0; t < i.end; t += .03) seg(cv, t, Math.min(i.end, t + .03)); };
      const keep = () => g.save(curves.slice(-12));
      curves.forEach(instant);
      const sliders = {}, mkSlider = (d, label, min, max, step, val, cb) => {
        const w = document.createElement("label"); w.style.cssText = "display:flex;align-items:center;gap:6px;font-size:14px;font-weight:700"; const s = document.createElement("span"); s.textContent = label; w.appendChild(s);
        const inp = document.createElement("input"); inp.type = "range"; inp.min = min; inp.max = max; inp.step = step; inp.value = val; inp.style.cssText = "width:110px;height:28px"; w.appendChild(inp); d.appendChild(w); g.on(inp, "input", () => cb(+inp.value)); return inp;
      };
      const stepRun = n => {
        if (!run) return; const i = info(run.R, run.r, run.d);
        for (let k = 0; k < n && run; k++) { const t1 = Math.min(i.end, run.t + .02); seg(run, run.t, t1); run.t = t1; if (t1 >= i.end) { curves.push({ R: run.R, r: run.r, d: run.d, col: run.col, lw: run.lw, h: run.h }); g.add(1); g.sfx("cheer"); const e = pt(run.R, run.r, run.d, 0, i.sc); fx.burst(e[0], e[1], ["#fff", "#ffd93d", "#ff8fd0"], 24, 220); run = null; keep(); } }
      };
      const start = () => {
        if (run) stepRun(1e9);
        const cs = document.createElement("canvas"); cs.width = S; cs.height = S; cs.getContext("2d").drawImage(layer, 0, 0); snaps.push({ img: cs, n: curves.length }); if (snaps.length > 8) snaps.shift();
        run = { R: P.R, r: P.r, d: P.d, col, lw, h: g.ri(0, 359), t: 0 }; g.sfx("hum");
      };
      const pB = mkBar(g), sB = mkBar(g), act = mkBar(g), pts = [];
      mkLabel(pB, "Patterns");
      PRE.forEach((p, i) => pts.push(mkThumb(g, pB, 56, 56, (z, w, h) => { const inf = info(p[0], p[1], p[2]); z.translate(-S / 2 + w / 2, -S / 2 + h / 2); const sc = 24 / ((p[0] - p[1]) + p[2]); z.strokeStyle = "#7b3fd8"; z.lineWidth = 1.2; z.beginPath(); for (let t = 0; t <= inf.end; t += .05) { const a = pt(p[0], p[1], p[2], t, sc); z[t ? "lineTo" : "moveTo"](a[0], a[1]); } z.stroke(); }, () => { P = { R: p[0], r: p[1], d: p[2] }; mark(pts, i); syncSl(); })));
      const syncSl = () => { if (sliders.r) { sliders.r.value = P.r; sliders.d.value = P.d; } if (sliders.R) sliders.R.value = P.R; };
      if (g.diff > 0) {
        sliders.r = mkSlider(sB, "Gear", 8, 92, 1, P.r, v => { P.r = v; mark(pts, -1); });
        sliders.d = mkSlider(sB, "Pen", 10, 120, 1, P.d, v => { P.d = v; mark(pts, -1); });
        if (g.diff > 1) { sliders.R = mkSlider(sB, "Ring", 60, 140, 1, P.R, v => { P.R = v; if (P.r > v - 8) { P.r = v - 8; syncSl(); } mark(pts, -1); }); mkSlider(sB, "Line", 1, 6, .5, lw, v => { lw = v; }); }
        mkBtn(g, sB, "Rainbow", () => { col = "rb"; }); mkSwatches(g, sB, cols, "x", v => { col = v; });
      }
      mkBtn(g, act, "Draw!", () => start());
      mkBtn(g, act, "Undo", () => { const s = snaps.pop(); if (!s) { g.sfx("wrong"); return; } run = null; q.clearRect(0, 0, S, S); q.drawImage(s.img, 0, 0); curves = curves.slice(0, s.n); keep(); g.sfx("back"); });
      mkBtn(g, act, "Clear", () => { const cs = document.createElement("canvas"); cs.width = S; cs.height = S; cs.getContext("2d").drawImage(layer, 0, 0); snaps.push({ img: cs, n: curves.length }); if (snaps.length > 8) snaps.shift(); run = null; q.clearRect(0, 0, S, S); curves = []; keep(); g.sfx("swish"); });
      mkEnd(g, act, c, "my-spirograph");
      g.on(c, "pointerdown", () => { if (!run) start(); });
      g.loop((dt, t) => {
        T = t;
        if (run) { const i = info(run.R, run.r, run.d), tgt = g.by(5, 3.5, 2.5); stepRun(Math.max(2, Math.ceil(i.end / .02 / (60 * tgt)))); }
        const gr = x.createRadialGradient(S / 2, S / 2, 20, S / 2, S / 2, S * .75); gr.addColorStop(0, "#241a5a"); gr.addColorStop(1, "#07071c"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.drawImage(layer, 0, 0, S, S);
        const cv = run || P, i = info(cv.R, cv.r, cv.d);
        if (!run) {
          x.strokeStyle = "rgba(255,255,255,.22)"; x.lineWidth = 1.5; x.beginPath(); for (let tt = 0, n = 0; tt <= i.end && n < 3000; tt += .04, n++) { const a = pt(cv.R, cv.r, cv.d, tt, i.sc); x[n ? "lineTo" : "moveTo"](a[0], a[1]); } x.stroke();
          x.fillStyle = "rgba(255,255,255,.85)"; x.font = "bold 18px system-ui, sans-serif"; x.textAlign = "center"; x.fillText(curves.length ? "Press Draw! to add another" : "Press Draw! to start", S / 2, 30);
        }
        const tt = run ? run.t : t * .6, cx2 = S / 2 + (cv.R - cv.r) * Math.cos(tt) * i.sc, cy2 = S / 2 + (cv.R - cv.r) * Math.sin(tt) * i.sc, k = (cv.R - cv.r) / cv.r;
        x.strokeStyle = "rgba(255,90,120," + (run ? .5 : .25) + ")"; x.lineWidth = 3; x.beginPath(); x.arc(S / 2, S / 2, cv.R * i.sc, 0, 7); x.stroke();
        x.strokeStyle = "rgba(255,255,255," + (run ? .6 : .3) + ")"; x.lineWidth = 2; x.beginPath(); x.arc(cx2, cy2, cv.r * i.sc, 0, 7); x.stroke();
        const pp = [cx2 + cv.d * Math.cos(k * tt) * i.sc, cy2 - cv.d * Math.sin(k * tt) * i.sc]; x.beginPath(); x.moveTo(cx2, cy2); x.lineTo(pp[0], pp[1]); x.stroke(); dot(x, "#ffd93d", pp[0], pp[1], 5);
        fx.draw(x, dt);
      });
    }
  });
})();
