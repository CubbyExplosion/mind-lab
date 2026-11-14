// Break Time Games: set 14 (inventing and storytelling makers)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---------- shared helpers ----------
  const PAL = ["#ff4d6d", "#ff8a2a", "#ffd34e", "#6be28f", "#2ec4b6", "#4cc3ff", "#7b6cff", "#b48cff", "#ff6fb5", "#ffffff", "#2b2b3a", "#8b5a2b"];
  const rr = (x, a, b, w, h, r) => { x.beginPath(); x.roundRect(a, b, w, h, r); };
  const cc = (x, a, b, r) => { x.beginPath(); x.arc(a, b, Math.max(0.1, r), 0, 7); };
  const st5 = (x, cx, cy, r, ri) => { x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? (ri || r * .45) : r; x.lineTo(cx + Math.cos(a) * q, cy + Math.sin(a) * q); } x.closePath(); };
  function bar(g, items) {
    const d = g.html("");
    d.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:6px;justify-content:center;align-items:center";
    const bs = items.map(it => {
      const b = document.createElement("button"); b.type = "button"; b.className = "bg-btn"; b.textContent = it[0];
      b.style.cssText = "min-height:40px;min-width:48px;" + (it[2] || "");
      g.on(b, "click", () => it[1](b)); d.appendChild(b); return b;
    });
    return { el: d, bs };
  }
  const FINB = g => ["Finish", () => g.over("Nice work!"), "background:#6be28f;color:#10301a;font-weight:bold"];
  function swatches(g, cols, fn, init) {
    const d = g.html("");
    d.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:4px 8px;justify-content:center";
    const els = cols.map((col, i) => {
      const b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "colour " + (i + 1));
      b.style.cssText = "width:36px;height:36px;border-radius:50%;padding:0;cursor:pointer;border:3px solid rgba(255,255,255,.35);background:" + col;
      g.on(b, "click", () => { mark(i); fn(col, i); }); d.appendChild(b); return b;
    });
    const mark = i => els.forEach((e, k) => { e.style.borderColor = k === i ? "#fff" : "rgba(255,255,255,.35)"; e.style.transform = k === i ? "scale(1.15)" : "none"; });
    if (init !== undefined) mark(init);
    return { el: d, mark };
  }
  function puff(L, px, py, n, cols, sp, life, gr, sh) {
    if (L.length > 350) return;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, v = Math.random() * (sp || 80);
      L.push({ x: px, y: py, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (sp || 80) * .3, life: (life || .8) * (.5 + Math.random() * .5), max: life || .8, col: cols[Math.floor(Math.random() * cols.length)], g: gr === undefined ? 200 : gr, sz: 2 + Math.random() * 3, sh });
    }
  }
  function drawParts(L, x, dt) {
    for (let i = L.length - 1; i >= 0; i--) {
      const p = L[i]; p.life -= dt; if (p.life <= 0) { L.splice(i, 1); continue; }
      p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.min(1, p.life / p.max * 1.5); x.fillStyle = p.col;
      if (p.sh === "s") st5(x, p.x, p.y, p.sz * 1.6); else { x.beginPath(); x.arc(p.x, p.y, p.sz, 0, 7); }
      x.fill();
    }
    x.globalAlpha = 1;
  }
  const txt = (x, s, px, py, size, col, al) => { x.font = "bold " + (size || 20) + "px system-ui, sans-serif"; x.textAlign = al || "center"; x.lineWidth = 4; x.strokeStyle = "rgba(0,0,0,.55)"; x.strokeText(s, px, py); x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  const floatText = (g, c, W, H, s, px, py, col) => g.pop(s, px * c.clientWidth / W, py * c.clientHeight / H, col);
  const ease = u => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);

  // ---- Robot Builder ----
  B.add({
    id: "s14-robot", name: "Robot Builder", ages: [5, 12], cat: "Build", color: "#4cc3ff", icon: "R",
    desc: "Snap together a robot from silly parts, then watch it walk and wave.", controls: "Tap Head, Body, Arms, Legs or Top to swap parts, pick colours, then press Walk or Wave",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 400);
      const N = g.by(3, 4, 5), SL = ["Head", "Body", "Arms", "Legs", "Top"];
      let R = { s: [0, 0, 0, 0, 0], c: ["#4cc3ff", "#ff8a2a", "#ffd34e", "#6be28f", "#ff6fb5"] };
      try { const d = g.load(); if (d && d.s && d.c && d.s.length === 5 && d.c.length === 5) R = { s: d.s.map(v => ((v | 0) % N + N) % N), c: d.c.map(v => String(v)) }; } catch (e) {}
      let sel = 0, walking = false, wave = 0, t = 0, cx = W / 2, wa = 0, pulse = 0; const parts = [];
      const save = () => g.save({ s: R.s, c: R.c });
      const GY = 335;
      const bot = (cxp, gy, tt) => {
        const S = R.s, C = R.c, ph = walking ? tt * 9 : 0, bob = walking ? Math.abs(Math.sin(ph)) * 4 : Math.sin(tt * 2.5) * 1.5;
        const hov = S[3] === 4 ? 16 + Math.sin(tt * 4) * 4 : 0, hip = gy - 62 - hov - bob;
        const F = col => { x.fillStyle = col; x.fill(); x.stroke(); };
        x.save(); x.lineJoin = "round"; x.lineCap = "round"; x.strokeStyle = "#1b2340"; x.lineWidth = 3;
        x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(cxp, gy + 4, 50 - hov * .6, 8, 0, 0, 7); x.fill();
        const L = S[3];
        if (L === 0 || L === 3) {
          for (const sd of [-1, 1]) {
            x.save(); x.translate(cxp + sd * 20, hip); x.rotate(walking ? Math.sin(ph + (sd > 0 ? 3.14 : 0)) * .5 : 0);
            if (L === 0) { rr(x, -7, 0, 14, 54, 5); F(C[3]); rr(x, -11, 50, 26, 12, 6); F(C[3]); }
            else { x.beginPath(); for (let i = 0; i <= 6; i++) x.lineTo(i % 2 ? 9 : -9, i * 9); x.lineWidth = 6; x.strokeStyle = C[3]; x.stroke(); x.lineWidth = 3; x.strokeStyle = "#1b2340"; cc(x, 0, 58, 10); F(C[3]); }
            x.restore();
          }
        } else if (L === 1) {
          rr(x, cxp - 6, hip, 12, gy - hip - 26, 3); F(C[3]);
          x.save(); x.translate(cxp, gy - 26); x.rotate(wa); cc(x, 0, 0, 26); F(C[3]);
          for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(i * 1.57) * 22, Math.sin(i * 1.57) * 22); x.stroke(); }
          cc(x, 0, 0, 6); F("#fff"); x.restore();
        } else if (L === 2) {
          rr(x, cxp - 8, hip, 16, gy - 26 - hip, 3); F(C[3]);
          rr(x, cxp - 50, gy - 26, 100, 26, 13); F(C[3]);
          x.save(); x.setLineDash([8, 8]); x.lineDashOffset = -wa * 20; x.strokeStyle = "rgba(0,0,0,.35)"; x.beginPath(); x.moveTo(cxp - 38, gy - 13); x.lineTo(cxp + 38, gy - 13); x.stroke(); x.restore();
        } else {
          for (const sd of [-1, 1]) {
            rr(x, cxp + sd * 22 - 10, hip - 2, 20, 16, 4); F(C[3]);
            x.fillStyle = "#ffb02e"; x.beginPath(); x.moveTo(cxp + sd * 22 - 8, hip + 14); x.lineTo(cxp + sd * 22 + 8, hip + 14); x.lineTo(cxp + sd * 22, hip + 30 + Math.random() * 12); x.closePath(); x.fill();
          }
        }
        const B1 = S[1], by0 = hip - 70;
        if (B1 === 0 || B1 === 4) { rr(x, cxp - 38, by0, 76, 72, 10); F(C[1]); }
        else if (B1 === 1) { rr(x, cxp - 42, by0, 84, 72, 30); F(C[1]); }
        else if (B1 === 2) { x.beginPath(); x.moveTo(cxp - 30, by0); x.lineTo(cxp + 30, by0); x.lineTo(cxp + 44, hip + 2); x.lineTo(cxp - 44, hip + 2); x.closePath(); F(C[1]); }
        else { cc(x, cxp, by0 + 38, 42); F(C[1]); }
        for (let i = 0; i < 3; i++) { cc(x, cxp - 18 + i * 18, by0 + 30, 5); F(Math.sin(tt * 3 + i * 2) > 0 ? "#ffee66" : "#ff5a5a"); }
        if (B1 === 4) { rr(x, cxp - 24, by0 + 46, 48, 14, 4); F("#fff"); }
        for (const sd of [-1, 1]) {
          const a = (sd > 0 && wave > 0) ? -2.5 + Math.sin(tt * 11) * .5 : -sd * .15 + (walking ? Math.sin(ph + (sd > 0 ? 0 : 3.14)) * .6 : Math.sin(tt * 2 + sd) * .05), A = S[2], ac = C[2];
          x.save(); x.translate(cxp + sd * 44, by0 + 16); x.rotate(a);
          if (A === 0) { rr(x, -6, 0, 12, 46, 6); F(ac); cc(x, 0, 50, 9); F(ac); }
          else if (A === 1) { rr(x, -6, 0, 12, 40, 6); F(ac); x.beginPath(); x.moveTo(-12, 58); x.lineTo(-3, 38); x.lineTo(3, 38); x.lineTo(12, 58); x.lineTo(5, 50); x.lineTo(0, 60); x.lineTo(-5, 50); x.closePath(); F(ac); }
          else if (A === 2) { x.beginPath(); for (let i = 0; i <= 6; i++) x.lineTo(i % 2 ? 8 : -8, i * 8); x.lineWidth = 6; x.strokeStyle = ac; x.stroke(); x.lineWidth = 3; x.strokeStyle = "#1b2340"; cc(x, 0, 54, 9); F(ac); }
          else if (A === 3) { x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 36); x.lineWidth = 5; x.stroke(); x.lineWidth = 3; cc(x, 0, 48, 14); F(ac); }
          else { rr(x, -4, 0, 8, 62, 4); F(ac); rr(x, -9, 58, 18, 12, 4); F(ac); }
          x.restore();
        }
        const Hh = S[0], hc = C[0], hy = by0 - 30 + (walking ? Math.sin(ph * 2) : 0), blink = (tt % 3.3) < .12;
        const eye = (ex, ey, r) => { cc(x, ex, ey, r); F("#fff"); x.fillStyle = "#1b2340"; x.beginPath(); x.ellipse(ex + Math.sin(tt) * 1.5, ey, r * .5, blink ? 1 : r * .5, 0, 0, 7); x.fill(); };
        if (Hh === 0) { rr(x, cxp - 32, hy - 28, 64, 54, 14); F(hc); eye(cxp - 14, hy - 6, 8); eye(cxp + 14, hy - 6, 8); }
        else if (Hh === 1) { cc(x, cxp, hy - 2, 32); F(hc); eye(cxp, hy - 6, 14); }
        else if (Hh === 2) { rr(x, cxp - 26, hy - 38, 52, 66, 12); F(hc); rr(x, cxp - 22, hy - 24, 44, 18, 9); F("#27304f"); x.fillStyle = "#7df"; x.fillRect(cxp - 14 + Math.sin(tt * 2) * 6, hy - 19, 10, 8); }
        else if (Hh === 3) { x.beginPath(); x.moveTo(cxp - 34, hy + 26); x.lineTo(cxp + 34, hy + 26); x.lineTo(cxp + 22, hy - 28); x.lineTo(cxp - 22, hy - 28); x.closePath(); F(hc); eye(cxp - 12, hy - 4, 7); eye(cxp + 12, hy - 4, 7); }
        else { x.beginPath(); x.arc(cxp, hy + 24, 34, Math.PI, 0); x.closePath(); F(hc); eye(cxp - 16, hy + 8, 6); eye(cxp, hy, 6); eye(cxp + 16, hy + 8, 6); }
        x.strokeStyle = "#1b2340"; x.lineWidth = 3; x.beginPath(); if (Hh !== 2) { x.moveTo(cxp - 10, hy + 16); x.quadraticCurveTo(cxp, hy + (wave > 0 ? 26 : 20), cxp + 10, hy + 16); } x.stroke();
        const T = S[4], ty = hy + [-28, -32, -38, -28, -10][Hh], tc = C[4];
        if (T === 1) { x.beginPath(); x.moveTo(cxp, ty); x.lineTo(cxp, ty - 22); x.stroke(); cc(x, cxp, ty - 26, 6); F(Math.sin(tt * 5) > 0 ? "#ff5a5a" : tc); }
        else if (T === 2) { x.beginPath(); x.moveTo(cxp, ty); x.lineTo(cxp, ty - 8); x.stroke(); x.save(); x.translate(cxp, ty - 10); x.scale(Math.cos(tt * 14), 1); rr(x, -26, -4, 52, 8, 4); F(tc); x.restore(); }
        else if (T === 3) { for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(cxp + sd * 14, ty); x.quadraticCurveTo(cxp + sd * 26, ty - 14, cxp + sd * 20, ty - 26); x.stroke(); cc(x, cxp + sd * 20, ty - 28, 5); F(tc); } }
        else if (T === 4) { for (let i = 0; i < 5; i++) { const a = i * 1.2566 + tt; cc(x, cxp + Math.cos(a) * 9, ty - 12 + Math.sin(a) * 9, 7); F(tc); } cc(x, cxp, ty - 12, 6); F("#ffd34e"); }
        x.restore();
      };
      const cycle = i => { R.s[i] = (R.s[i] + 1) % N; sel = i; pulse = 1; g.add(1); g.sfx("click"); puff(parts, cx, 200, 10, [R.c[i], "#fff", "#ffd34e"], 140, .6, 150, "s"); save(); mark(); };
      const mark = () => sb.bs.forEach((b, i) => { b.style.outline = i === sel ? "3px solid #fff" : "none"; });
      const sb = bar(g, SL.map((n, i) => [n, () => cycle(i)]));
      swatches(g, PAL, col => { R.c[sel] = col; pulse = 1; g.add(1); g.sfx("pick"); puff(parts, cx, 200, 8, [col, "#fff"], 120, .6, 150, "s"); save(); });
      bar(g, [
        ["Walk", b => { walking = !walking; b.textContent = walking ? "Stop" : "Walk"; g.sfx("hum"); }],
        ["Wave", () => { wave = 2.5; g.sfx("send"); g.add(1); }],
        ["Surprise me", () => { R.s = R.s.map(() => g.ri(0, N - 1)); R.c = R.c.map(() => g.pick(PAL)); pulse = 1; g.add(3); g.sfx("cheer"); puff(parts, cx, 200, 24, PAL, 200, .8, 150, "s"); save(); }],
        ["Save picture", () => g.saveImage(c, "my-robot")],
        FINB(g)
      ]);
      mark();
      g.loop((dt, tt) => {
        t = tt; pulse = Math.max(0, pulse - dt * 3);
        if (walking) { cx += 70 * dt; wa += dt * 6; if (cx > W + 70) cx = -70; if (Math.random() < dt * 8) puff(parts, cx - 30, GY, 1, ["#ccd"], 30, .5, -20); }
        else cx += (W / 2 - cx) * Math.min(1, dt * 3);
        if (wave > 0) wave -= dt;
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#26335f"); gr.addColorStop(1, "#3d5090"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "#1c2447"; x.fillRect(0, GY, W, H - GY);
        x.strokeStyle = "rgba(255,255,255,.08)"; x.lineWidth = 2; for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(i * 60 - (wa * 20) % 60, GY); x.lineTo(i * 60 - (wa * 20) % 60 - 30, H); x.stroke(); }
        for (let i = 0; i < 6; i++) { x.save(); x.translate(60 + i * 105, 60 + (i % 2) * 40); x.rotate(t * (i % 2 ? .4 : -.4)); x.fillStyle = "rgba(255,255,255,.06)"; for (let k = 0; k < 6; k++) { x.rotate(1.047); x.fillRect(-4, -26, 8, 14); } cc(x, 0, 0, 18); x.fill(); x.restore(); }
        x.save(); x.translate(cx, GY); x.scale(1 + pulse * .07, 1 - pulse * .07); x.translate(-cx, -GY); bot(cx, GY, t); x.restore();
        drawParts(parts, x, dt);
        if (wave > 0) txt(x, "Hello!", cx + 70, 120 + Math.sin(t * 8) * 4, 22, "#fff");
      });
    }
  });

  // ---- Potion Lab ----
  B.add({
    id: "s14-potion", name: "Magic Potion Lab", ages: [5, 14], cat: "Creative", color: "#b48cff", icon: "P",
    desc: "Mix glowing magic liquids and watch the colours and sparkles change.", controls: "Tap a bottle to add a drop. Tap Bottle it to keep your potion on the shelf",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const ING = [{ n: "Sunbeam", c: [255, 205, 60], e: "star" }, { n: "Moon mist", c: [120, 160, 255], e: "bub" }, { n: "Leaf juice", c: [90, 220, 120], e: "fizz" }, { n: "Berry pop", c: [240, 70, 150], e: "pop" }, { n: "Ember dust", c: [255, 120, 40], e: "spark" }, { n: "Sky frost", c: [120, 230, 240], e: "snow" }];
      const ADJ = ["Sunny", "Misty", "Leafy", "Berry", "Fiery", "Frosty"], NI = g.by(4, 6, 6), MAX = g.by(8, 12, 18), BY = 352;
      let mix = [], fl = [], parts = [], shelf = [], t = 0, heat = false, stir = 0, cur = [200, 200, 220], nm = "";
      try { const d = g.load(); if (d && Array.isArray(d.shelf)) shelf = d.shelf.filter(s => s && typeof s.col === "string").slice(-10); } catch (e) {}
      const bx = i => W / (NI + 1) * (i + 1);
      const rgbOf = () => { if (!mix.length) return [200, 200, 220]; let r = 0, gg = 0, b = 0; mix.forEach(i => { r += ING[i].c[0]; gg += ING[i].c[1]; b += ING[i].c[2]; }); const n = mix.length; return [r / n, gg / n, b / n]; };
      const name = () => {
        if (!mix.length) return ""; const cnt = ING.map(() => 0); mix.forEach(i => cnt[i]++); let d = 0; cnt.forEach((n, i) => { if (n > cnt[d]) d = i; });
        const noun = mix.length < 4 ? "Sip" : mix.length < 8 ? "Tonic" : mix.length < 12 ? "Brew" : "Elixir";
        return ADJ[d] + " " + noun + " of " + ["Giggles", "Wonder", "Zoom", "Dreams", "Bounce", "Sparkle"][(mix.reduce((a, b) => a + b + 1, 0) * 3 + mix.length) % 6];
      };
      const flask = () => { x.beginPath(); x.moveTo(298, 95); x.lineTo(342, 95); x.lineTo(342, 170); x.lineTo(405, 285); x.quadraticCurveTo(410, 298, 395, 298); x.lineTo(245, 298); x.quadraticCurveTo(230, 298, 235, 285); x.lineTo(298, 170); x.closePath(); };
      const addDrop = i => { if (mix.length + fl.length >= MAX) { g.sfx("back"); floatText(g, c, W, H, "Full!", 320, 150, "#fff"); return; } fl.push({ i, u: 0 }); g.sfx("pop"); };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        for (let i = 0; i < NI; i++) if (Math.abs(p.x - bx(i)) < 36 && p.y > 285 && p.y < 392) { addDrop(i); return; }
        if (p.x > 225 && p.x < 415 && p.y > 90 && p.y < 305 && mix.length) { stir = 1.2; g.sfx("fizz"); }
      });
      const clear = () => { mix = []; nm = ""; };
      const items = [
        ["Bottle it", () => { if (!mix.length) { g.sfx("back"); return; } const r = cur.map(v => Math.round(v)); shelf.push({ col: "rgb(" + r.join(",") + ")", name: nm }); shelf = shelf.slice(-10); g.save({ shelf }); g.add(3); g.sfx("cheer"); puff(parts, 320, 200, 36, ["#fff6a0", "#ffd34e", "#fff"], 240, 1, 120, "s"); floatText(g, c, W, H, nm, 320, 60, "#ffd34e"); clear(); }, "background:#b48cff;color:#1b1040;font-weight:bold"],
        ["Stir", () => { stir = 1.6; g.sfx("fizz"); }],
        ["Pour out", () => { if (mix.length) { puff(parts, 320, 300, 20, ["#fff"], 150, .7); g.sfx("splash"); } clear(); fl = []; }],
        ["Surprise me", () => { clear(); fl = []; const n = g.ri(3, Math.min(MAX, 8)); for (let k = 0; k < n; k++) mix.push(g.ri(0, NI - 1)); nm = name(); g.add(n); g.sfx("cheer"); puff(parts, 320, 200, 30, ["#fff", "#ffd34e", "#ff6fb5", "#4cc3ff"], 200, 1, 100, "s"); }]
      ];
      if (g.diff >= 1) items.splice(2, 0, ["Heat", b => { heat = !heat; b.textContent = heat ? "Cool" : "Heat"; g.sfx("hum"); }]);
      items.push(["Save picture", () => g.saveImage(c, "my-potion")], FINB(g));
      bar(g, items);
      const bottle = (px, py, col, s) => {
        x.save(); x.translate(px, py); x.scale(s, s); rr(x, -9, -62, 18, 18, 3); x.fillStyle = "#c9a36a"; x.fill();
        rr(x, -22, -50, 44, 50, 14); x.fillStyle = col; x.fill(); x.lineWidth = 3; x.strokeStyle = "rgba(255,255,255,.8)"; x.stroke();
        rr(x, -15, -42, 6, 24, 3); x.fillStyle = "rgba(255,255,255,.5)"; x.fill(); x.restore();
      };
      g.loop((dt, tt) => {
        t = tt; stir = Math.max(0, stir - dt);
        const tg = rgbOf(); for (let k = 0; k < 3; k++) cur[k] += (tg[k] - cur[k]) * Math.min(1, dt * 4);
        const rgb = "rgb(" + cur.map(v => Math.round(v)).join(",") + ")";
        for (let i = fl.length - 1; i >= 0; i--) { const f = fl[i]; f.u += dt * 1.8; if (f.u >= 1) { fl.splice(i, 1); mix.push(f.i); nm = name(); g.add(1); g.sfx("splash"); puff(parts, 320, 296 - mix.length / MAX * 170, 8, [rgb, "#fff"], 120, .6); } }
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#1a1240"); gr.addColorStop(1, "#3b2a78"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        for (let i = 0; i < 26; i++) { x.fillStyle = "rgba(255,255,255," + (.3 + .3 * Math.sin(t * 2 + i)) + ")"; x.fillRect((i * 97) % W, (i * 53) % 220, 2, 2); }
        x.fillStyle = "#5a3b22"; x.fillRect(0, 355, W, 45); x.fillStyle = "#7a5230"; x.fillRect(0, 355, W, 6);
        x.fillStyle = "#5a3b22"; x.fillRect(0, 78, 250, 8);
        shelf.forEach((s, i) => bottle(24 + i * 24, 78, s.col, .42));
        const lv = mix.length / MAX, top = 296 - lv * 170;
        if (mix.length) { const gl = x.createRadialGradient(320, 220, 10, 320, 220, 190); gl.addColorStop(0, rgb.replace("rgb", "rgba").replace(")", ",.45)")); gl.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = gl; x.fillRect(120, 20, 400, 340); }
        rr(x, 240, 300, 160, 16, 5); x.fillStyle = "#444a66"; x.fill();
        if (heat) { for (let k = 0; k < 5; k++) { x.fillStyle = k % 2 ? "#ff8a2a" : "#ffd34e"; const fx = 262 + k * 28, fh = 14 + Math.sin(t * 12 + k) * 5; x.beginPath(); x.moveTo(fx - 9, 316); x.quadraticCurveTo(fx, 316 - fh * 2, fx + 9, 316); x.fill(); } }
        flask(); x.fillStyle = "rgba(255,255,255,.1)"; x.fill();
        if (mix.length) {
          x.save(); flask(); x.clip(); x.beginPath(); x.moveTo(200, 310); x.lineTo(200, top);
          const amp = 3 + stir * 6 + (heat ? 3 : 0); for (let px = 200; px <= 440; px += 8) x.lineTo(px, top + Math.sin(px * .08 + t * 3) * amp);
          x.lineTo(440, 310); x.closePath(); x.fillStyle = rgb; x.fill();
          if (stir > 0) { x.strokeStyle = "rgba(255,255,255," + Math.min(.7, stir) + ")"; x.lineWidth = 4; x.beginPath(); for (let a = 0; a < 12; a += .3) x.lineTo(320 + Math.cos(a * 1.4 - t * 9) * a * 7, top + 40 + Math.sin(a * 1.4 - t * 9) * a * 2.2); x.stroke(); }
          x.fillStyle = "rgba(255,255,255,.18)"; x.fillRect(258, top, 12, 296 - top); x.restore();
        }
        flask(); x.lineWidth = 4; x.strokeStyle = "rgba(255,255,255,.85)"; x.stroke(); rr(x, 292, 88, 56, 10, 4); x.fillStyle = "#c9a36a"; x.fill();
        if (mix.length) {
          const cnt = ING.map(() => 0); mix.forEach(i => cnt[i]++); let kinds = 0;
          ING.forEach((s, i) => {
            if (!cnt[i]) return; kinds++; const n = cnt[i], rate = dt * (n * 2.5 + (heat ? 6 : 0)), sx = g.rf(262, 378), sy = top - 2;
            if (Math.random() < rate) {
              if (s.e === "star") puff(parts, sx, sy, 1, ["#fff6a0", "#ffd34e"], 70, 1.2, -30, "s");
              else if (s.e === "bub") puff(parts, sx, sy, 1, ["#cfe8ff"], 30, 1.5, -60);
              else if (s.e === "fizz") puff(parts, sx, sy, 1, ["#b6ffcb", "#6be28f"], 90, .8, 240);
              else if (s.e === "pop") puff(parts, sx, sy, 2, ["#ff9ac8", "#ff6fb5"], 120, .7, 260, "s");
              else if (s.e === "spark") puff(parts, sx, sy, 2, ["#ffb02e", "#ff5a2a"], 160, .6, 300);
              else puff(parts, sx, 110, 1, ["#fff", "#cfeeff"], 10, 1.6, 40);
            }
          });
          if (kinds >= 3 && Math.random() < dt * 8) puff(parts, g.rf(270, 370), top - 6, 1, ["#ff6fb5", "#ffd34e", "#6be28f", "#4cc3ff", "#b48cff"], 110, 1.2, -40, "s");
        }
        drawParts(parts, x, dt);
        for (const f of fl) { const u = f.u, bx0 = bx(f.i), p1x = (bx0 + 320) / 2, p0y = BY - 70, p1y = 60, p2y = 100; const px = (1 - u) * (1 - u) * bx0 + 2 * (1 - u) * u * p1x + u * u * 320, py = (1 - u) * (1 - u) * p0y + 2 * (1 - u) * u * p1y + u * u * p2y; cc(x, px, py, 9); x.fillStyle = "rgb(" + ING[f.i].c.join(",") + ")"; x.fill(); x.lineWidth = 2; x.strokeStyle = "#fff"; x.stroke(); }
        for (let i = 0; i < NI; i++) { const hop = fl.some(f => f.i === i && f.u < .25) ? -8 : 0; bottle(bx(i), BY + hop, "rgb(" + ING[i].c.join(",") + ")", 1); txt(x, ING[i].n, bx(i), 382, 12, "#fff"); }
        if (nm) txt(x, nm, 320, 40, 22, "#ffd34e");
        else txt(x, "Tap a bottle!", 320, 40, 22, "#fff");
      });
    }
  });

  // ---- Recipe Cook-up ----
  B.add({
    id: "s14-cook", name: "Silly Cook-up", ages: [5, 12], cat: "Creative", color: "#ff8a2a", icon: "C",
    desc: "Build a silly pizza or cake from toppings, then serve it to a hungry monster.", controls: "Pick a topping, tap the dish to place it, then press Serve it!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const IT = { pizza: ["pepperoni", "mushroom", "olive", "cheese", "pepper", "pineapple", "sprinkles", "eyes", "star"], cake: ["cherry", "berry", "candle", "sprinkles", "swirl", "choc", "bean", "star", "eyes"] };
      const NM = { pepperoni: "Pepperoni", mushroom: "Mushroom", olive: "Olive", cheese: "Cheese", pepper: "Pepper", pineapple: "Pineapple", sprinkles: "Sprinkles", eyes: "Googly eyes", star: "Star", cherry: "Cherry", berry: "Strawberry", candle: "Candle", swirl: "Icing", choc: "Choc chip", bean: "Jelly bean" };
      const NT = g.by(4, 7, 9), CAP = g.by(30, 50, 80), LINES = ["Yum! Tastes like a rainbow!", "More please!", "Best ever!", "My tummy is dancing!", "Super silly!", "Delicious!", "Wow, so good!"];
      let kind = "pizza", T = { pizza: [], cake: [] }, base = { pizza: "#d9432b", cake: "#ff8fbf" }, cur = 0, size = 1, t = 0, sv = null, parts = [], mon = { col: "#7b6cff", say: "" };
      try { const d = g.load(); if (d && d.T && Array.isArray(d.T.pizza) && Array.isArray(d.T.cake)) { T = { pizza: d.T.pizza.slice(0, CAP), cake: d.T.cake.slice(0, CAP) }; T.pizza.concat(T.cake).forEach(it => { it.t = 1; }); if (d.base) base = { pizza: String(d.base.pizza), cake: String(d.base.cake) }; if (d.kind === "cake") kind = "cake"; } } catch (e) {}
      const save = () => g.save({ T: { pizza: T.pizza.map(i => ({ k: i.k, x: i.x, y: i.y, r: i.r, s: i.s, c: i.c })), cake: T.cake.map(i => ({ k: i.k, x: i.x, y: i.y, r: i.r, s: i.s, c: i.c })) }, base, kind });
      const DX = 250, DY = 225;
      const inside = (px, py) => kind === "pizza" ? Math.hypot(px - DX, py - DY) < 112 : ((px - DX) / 105) ** 2 + ((py - (DY - 25)) / 40) ** 2 < 1;
      g.on(c, "pointerdown", e => {
        if (sv) return; const p = pos(e);
        if (!inside(p.x, p.y)) { g.sfx("back"); return; }
        if (T[kind].length >= CAP) { g.sfx("back"); floatText(g, c, W, H, "Plate is full!", DX, 120, "#fff"); return; }
        const k = IT[kind][cur % NT]; T[kind].push({ k, x: p.x, y: p.y, r: g.rf(-.6, .6), s: size * g.rf(.9, 1.15), c: g.pick(PAL), t: 0 });
        g.add(1); g.sfx("pop"); puff(parts, p.x, p.y, 6, ["#fff", "#ffd34e"], 90, .5, 150, "s"); save();
      });
      const nb = () => { const k = IT[kind]; return k.slice(0, NT).map((n, i) => [NM[n], () => { cur = i; g.sfx("click"); mk(); }]); };
      let tb = null;
      const mk = () => { if (!tb) return; tb.bs.forEach((b, i) => { b.style.outline = i === cur ? "3px solid #fff" : "none"; }); };
      const mkTb = () => { if (tb) tb.el.remove(); tb = bar(g, nb()); modes.el.after(tb.el); mk(); };
      const modes = bar(g, [["Pizza", () => { kind = "pizza"; cur = 0; mkTb(); sw.mark(PAL.indexOf(base.pizza)); g.sfx("click"); save(); }], ["Cake", () => { kind = "cake"; cur = 0; mkTb(); sw.mark(PAL.indexOf(base.cake)); g.sfx("click"); save(); }]]);
      mkTb();
      const sw = swatches(g, PAL, col => { base[kind] = col; g.sfx("pick"); save(); }, PAL.indexOf(base[kind]));
      const acts = [
        ["Undo", () => { T[kind].pop(); g.sfx("back"); save(); }],
        ["Clear", () => { T[kind] = []; g.sfx("swish"); save(); }],
        ["Surprise me", () => { if (sv) return; const n = g.ri(5, 12); for (let i = 0; i < n && T[kind].length < CAP; i++) { let px, py, k = 0; do { px = g.rf(DX - 110, DX + 110); py = g.rf(DY - 110, DY + 80); k++; } while (!inside(px, py) && k < 40); if (k < 40) T[kind].push({ k: g.pick(IT[kind].slice(0, NT)), x: px, y: py, r: g.rf(-.6, .6), s: g.rf(.9, 1.15), c: g.pick(PAL), t: 0 }); } g.add(n); g.sfx("cheer"); save(); }],
        ["Serve it!", () => { if (sv) return; if (!T[kind].length) { g.sfx("back"); return; } sv = { t: 0, n: T[kind].length }; mon.col = g.pick(["#7b6cff", "#2ec4b6", "#ff6fb5", "#ff8a2a"]); mon.say = g.pick(LINES); g.sfx("send"); }, "background:#ffd34e;color:#3a2600;font-weight:bold"],
        ["Save picture", () => g.saveImage(c, "my-" + kind)], FINB(g)
      ];
      if (g.diff >= 1) acts.splice(3, 0, ["Size: M", b => { size = size === 1 ? 1.4 : size === 1.4 ? .7 : 1; b.textContent = "Size: " + (size === 1 ? "M" : size > 1 ? "L" : "S"); g.sfx("click"); }]);
      bar(g, acts);
      const drawTop = (it, tt) => {
        const s = it.s * 18, k = it.k; x.lineWidth = 2; x.strokeStyle = "rgba(0,0,0,.35)";
        if (k === "pepperoni") { cc(x, 0, 0, s); x.fillStyle = "#c0392b"; x.fill(); x.stroke(); x.fillStyle = "#992d22"; for (let i = 0; i < 4; i++) { cc(x, Math.cos(i * 1.6) * s * .5, Math.sin(i * 1.6) * s * .5, s * .15); x.fill(); } }
        else if (k === "mushroom") { x.fillStyle = "#e8d5b5"; rr(x, -s * .25, 0, s * .5, s * .7, 3); x.fill(); x.beginPath(); x.arc(0, 0, s, Math.PI, 0); x.closePath(); x.fillStyle = "#c9a37a"; x.fill(); x.stroke(); }
        else if (k === "olive") { cc(x, 0, 0, s * .7); x.fillStyle = "#222"; x.fill(); cc(x, 0, 0, s * .28); x.fillStyle = "#c0392b"; x.fill(); }
        else if (k === "cheese") { rr(x, -s, -s * .7, s * 2, s * 1.4, s * .5); x.fillStyle = "#ffe066"; x.fill(); x.stroke(); x.fillStyle = "#e6b800"; cc(x, -s * .4, 0, s * .2); x.fill(); cc(x, s * .4, -s * .2, s * .15); x.fill(); }
        else if (k === "pepper") { x.beginPath(); x.arc(0, 0, s * .8, .3, Math.PI + .6); x.lineWidth = s * .45; x.strokeStyle = "#3cb371"; x.lineCap = "round"; x.stroke(); x.lineCap = "butt"; }
        else if (k === "pineapple") { x.beginPath(); x.moveTo(-s, s * .6); x.lineTo(s, s * .6); x.lineTo(0, -s * .8); x.closePath(); x.fillStyle = "#ffd34e"; x.fill(); x.stroke(); }
        else if (k === "sprinkles") { for (let i = 0; i < 7; i++) { x.save(); x.rotate(i * 1.3); x.translate(s * .7, 0); x.fillStyle = PAL[(i * 3) % 9]; x.fillRect(-4, -1.5, 8, 3); x.restore(); } }
        else if (k === "eyes") { for (const sd of [-1, 1]) { cc(x, sd * s * .55, 0, s * .5); x.fillStyle = "#fff"; x.fill(); x.stroke(); cc(x, sd * s * .55 + Math.sin(tt * 3 + sd) * 3, Math.cos(tt * 2) * 3, s * .22); x.fillStyle = "#111"; x.fill(); } }
        else if (k === "star") { st5(x, 0, 0, s); x.fillStyle = "#ffd34e"; x.fill(); x.stroke(); }
        else if (k === "cherry") { x.beginPath(); x.moveTo(0, -s * .5); x.quadraticCurveTo(s * .6, -s * 1.6, s * .8, -s * 1.4); x.strokeStyle = "#3a7d2c"; x.lineWidth = 3; x.stroke(); cc(x, 0, 0, s * .7); x.fillStyle = "#d62839"; x.fill(); cc(x, -s * .2, -s * .2, s * .18); x.fillStyle = "rgba(255,255,255,.6)"; x.fill(); }
        else if (k === "berry") { x.beginPath(); x.moveTo(-s * .8, -s * .5); x.quadraticCurveTo(0, -s * .9, s * .8, -s * .5); x.quadraticCurveTo(s * .4, s * .8, 0, s); x.quadraticCurveTo(-s * .4, s * .8, -s * .8, -s * .5); x.fillStyle = "#e63946"; x.fill(); x.stroke(); x.fillStyle = "#fff"; for (let i = 0; i < 4; i++) x.fillRect(-s * .4 + (i % 2) * s * .5, -s * .1 + (i >> 1) * s * .4, 2, 3); x.fillStyle = "#2f9e44"; x.fillRect(-s * .4, -s * .7, s * .8, 5); }
        else if (k === "candle") { rr(x, -s * .25, -s * .6, s * .5, s * 1.6, 3); x.fillStyle = it.c; x.fill(); x.stroke(); x.beginPath(); x.ellipse(0, -s * .85 + Math.sin(tt * 9) * 1.5, s * .22, s * .4, 0, 0, 7); x.fillStyle = "#ffb02e"; x.fill(); }
        else if (k === "swirl") { x.beginPath(); for (let a = 0; a < 14; a += .3) x.lineTo(Math.cos(a) * a * s * .08, Math.sin(a) * a * s * .08); x.lineWidth = s * .4; x.strokeStyle = it.c; x.lineCap = "round"; x.stroke(); x.lineCap = "butt"; }
        else if (k === "choc") { x.beginPath(); x.moveTo(-s * .5, s * .4); x.lineTo(s * .5, s * .4); x.lineTo(0, -s * .5); x.closePath(); x.fillStyle = "#5a3418"; x.fill(); }
        else if (k === "bean") { rr(x, -s * .7, -s * .4, s * 1.4, s * .8, s * .4); x.fillStyle = it.c; x.fill(); x.stroke(); x.fillStyle = "rgba(255,255,255,.5)"; x.fillRect(-s * .4, -s * .2, s * .4, 3); }
      };
      const dish = () => {
        x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(DX, DY + 120, 150, 22, 0, 0, 7); x.fill();
        if (kind === "pizza") {
          cc(x, DX, DY, 150); x.fillStyle = "#f1f1f6"; x.fill(); cc(x, DX, DY, 134); x.fillStyle = "#d9a55b"; x.fill(); cc(x, DX, DY, 116); x.fillStyle = base.pizza; x.fill(); cc(x, DX, DY, 106); x.fillStyle = "rgba(255,226,120,.55)"; x.fill();
        } else {
          x.beginPath(); x.ellipse(DX, DY + 50, 150, 40, 0, 0, 7); x.fillStyle = "#f1f1f6"; x.fill();
          rr(x, DX - 120, DY - 25, 240, 90, 14); x.fillStyle = "#e0b070"; x.fill(); rr(x, DX - 120, DY + 10, 240, 18, 4); x.fillStyle = "#fff4e0"; x.fill();
          x.beginPath(); x.ellipse(DX, DY + 65, 120, 28, 0, 0, Math.PI); x.fillStyle = "#e0b070"; x.fill();
          x.beginPath(); x.ellipse(DX, DY - 25, 120, 45, 0, 0, 7); x.fillStyle = base.cake; x.fill(); x.lineWidth = 3; x.strokeStyle = "rgba(0,0,0,.2)"; x.stroke();
          for (let i = 0; i < 6; i++) { const dx = DX - 100 + i * 40; x.beginPath(); x.moveTo(dx - 15, DY - 12); x.lineTo(dx + 15, DY - 12); x.lineTo(dx + 15, DY + 8 + (i % 2) * 12); x.arc(dx, DY + 8 + (i % 2) * 12, 15, 0, Math.PI); x.closePath(); x.fillStyle = base.cake; x.fill(); }
        }
      };
      const drawAll = (ox, tt, dt) => {
        x.save(); x.translate(ox, 0); dish();
        T[kind].forEach(it => { it.t += dt; const u = ease(it.t * 5); x.save(); x.translate(it.x, it.y - (1 - u) * 24); x.rotate(it.r); x.scale(1 + (1 - u) * .5, 1 + (1 - u) * .5); x.globalAlpha = .3 + .7 * u; drawTop(it, tt); x.restore(); });
        x.restore();
      };
      g.loop((dt, tt) => {
        t = tt;
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#ffe9c2"); gr.addColorStop(1, "#ffb97a"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "#b5651d"; x.fillRect(0, 330, W, 70); x.fillStyle = "#cf7d2e"; x.fillRect(0, 330, W, 8);
        let ox = 0;
        if (sv) {
          sv.t += dt; ox = ease(sv.t / .9) * 250;
          if (sv.t > 1 && T[kind].length && Math.random() < dt * 9) { T[kind].shift(); g.sfx("pop"); puff(parts, 540, 250, 3, [mon.col, "#fff"], 80, .5); }
          if (sv.t > 3.4) { T[kind] = []; g.add(sv.n + 3); g.sfx("cheer"); floatText(g, c, W, H, "+" + (sv.n + 3), 500, 150, "#fff"); sv = null; save(); ox = 0; }
        }
        drawAll(ox, t, dt);
        const by = 250 + Math.sin(t * 3) * 3, open = sv && sv.t > 1 && sv.t < 3.2 ? Math.abs(Math.sin(t * 9)) : 0;
        x.save(); x.translate(545, by); x.fillStyle = mon.col; x.beginPath(); x.ellipse(0, 0, 52, 62, 0, 0, 7); x.fill();
        x.fillStyle = "rgba(255,255,255,.2)"; x.beginPath(); x.ellipse(-16, -26, 14, 22, .5, 0, 7); x.fill();
        for (const sd of [-1, 1]) { cc(x, sd * 20, -22, 14); x.fillStyle = "#fff"; x.fill(); cc(x, sd * 20 + (sv ? -4 : 0), -22, 6); x.fillStyle = "#222"; x.fill(); x.beginPath(); x.moveTo(sd * 30, -58); x.lineTo(sd * 40, -80); x.lineTo(sd * 20, -62); x.fillStyle = mon.col; x.fill(); }
        x.beginPath(); x.ellipse(0, 18, 24, 8 + open * 16, 0, 0, 7); x.fillStyle = "#3b1030"; x.fill();
        x.fillStyle = "#fff"; x.fillRect(-10, 11, 6, 6); x.fillRect(4, 11, 6, 6); x.restore();
        if (sv && sv.t > 2.2 && sv.t < 3.4) { rr(x, 360, 120, 250, 44, 14); x.fillStyle = "#fff"; x.fill(); txt(x, mon.say, 485, 148, 16, "#222"); x.fillStyle = "#fff"; x.fillText(mon.say, 485, 148); x.fillStyle = "#222"; x.fillText(mon.say, 485, 148); }
        if (!sv && !T[kind].length) txt(x, "Tap the dish to add toppings", DX, 60, 20, "#fff");
        drawParts(parts, x, dt);
      });
    }
  });

  // ---- Creature Evolver ----
  B.add({
    id: "s14-evolver", name: "Creature Evolver", ages: [7, 20], cat: "Creative", color: "#6be28f", icon: "E",
    desc: "Pick parents, breed new creatures and watch strange new species evolve.", controls: "Tap creatures to pick parents (1 or 2), then press Breed. Keep your favourites!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const GD = [360, 5, 4, 7, 4, 4, 4, 3, 3, 5, 3], NG = g.by(5, 8, 11), MUT = g.by(.15, .25, .4);
      const DEF = [0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 0];
      const rnd = () => ({ g: GD.map((m, i) => i < NG ? g.ri(0, m - 1) : DEF[i]) });
      const okc = o => o && Array.isArray(o.g) && o.g.length === GD.length && o.g.every((v, i) => Number.isInteger(v) && v >= 0 && v < GD[i]);
      let grid = [], hall = [], picks = [], gen = 1, t = 0, parts = [];
      try { const d = g.load(); if (d) { if (Array.isArray(d.grid)) grid = d.grid.filter(okc).slice(0, 6); if (Array.isArray(d.hall)) hall = d.hall.filter(okc).slice(0, 8); gen = d.gen | 0 || 1; } } catch (e) {}
      while (grid.length < 6) grid.push(rnd());
      const save = () => g.save({ grid, hall, gen });
      const cre = (G, cx, cy, s, tt, ph) => {
        const sz = (.7 + G[9] * .15) * s, hue = G[0], col = "hsl(" + hue + ",70%,60%)", dk = "hsl(" + hue + ",60%,35%)", lt = "hsl(" + hue + ",85%,85%)";
        const bt = G[1], rx = [36, 28, 46, 34, 36][bt], ry = [32, 42, 26, 34, 30][bt], bob = Math.sin(tt * 2 + ph) * 3;
        x.save(); x.translate(cx, cy + bob); x.scale(sz, sz); x.lineWidth = 3; x.lineJoin = "round"; x.lineCap = "round"; x.strokeStyle = dk;
        const body = () => { x.beginPath(); if (bt === 4) x.roundRect(-rx, -ry, rx * 2, ry * 2, 12); else if (bt === 3) { x.ellipse(0, 4, rx, ry * .85, 0, 0, 7); } else x.ellipse(0, 0, rx, ry, 0, 0, 7); };
        const n = G[3];
        for (let i = 0; i < n; i++) { const lx = n === 1 ? 0 : -rx * .7 + i * (rx * 1.4 / (n - 1)), wg = Math.sin(tt * 6 + i * 1.7 + ph) * 3; x.beginPath(); x.moveTo(lx, ry - 8); x.lineTo(lx + wg, ry + 14); x.lineWidth = 6; x.stroke(); x.lineWidth = 3; cc(x, lx + wg, ry + 15, 5); x.fillStyle = dk; x.fill(); }
        const tl = G[4];
        if (tl === 1) { x.beginPath(); x.moveTo(rx - 8, 6); x.quadraticCurveTo(rx + 24, 10 + Math.sin(tt * 4 + ph) * 6, rx + 22, -18); x.lineWidth = 6; x.stroke(); x.lineWidth = 3; cc(x, rx + 22, -20, 7); x.fillStyle = col; x.fill(); x.stroke(); }
        else if (tl === 2) { cc(x, rx + 6, 4 + Math.sin(tt * 4 + ph) * 3, 17); x.fillStyle = lt; x.fill(); x.stroke(); }
        else if (tl === 3) { for (let i = 0; i < 3; i++) { const bx = -rx * .5 + i * rx * .5; x.beginPath(); x.moveTo(bx - 8, -ry + 6); x.lineTo(bx, -ry - 14); x.lineTo(bx + 8, -ry + 6); x.fillStyle = dk; x.fill(); } }
        const ea = G[8];
        for (const sd of [-1, 1]) {
          if (ea === 1) { cc(x, sd * rx * .65, -ry * .75, 11); x.fillStyle = col; x.fill(); x.stroke(); }
          else if (ea === 2) { x.beginPath(); x.moveTo(sd * rx * .3, -ry * .8); x.lineTo(sd * rx * .85, -ry - 18); x.lineTo(sd * rx * .85, -ry * .4); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); }
        }
        const hn = G[5];
        if (hn === 1) { for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * rx * .25 - 6, -ry + 3); x.lineTo(sd * rx * .35, -ry - 18); x.lineTo(sd * rx * .25 + 6, -ry + 3); x.closePath(); x.fillStyle = "#ffe9a0"; x.fill(); x.stroke(); } }
        else if (hn === 2) { x.beginPath(); x.moveTo(-7, -ry + 3); x.lineTo(0, -ry - 30); x.lineTo(7, -ry + 3); x.closePath(); x.fillStyle = "#fff3b0"; x.fill(); x.stroke(); }
        else if (hn === 3) { for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 9, -ry + 2); x.lineTo(sd * 17, -ry - 22); x.stroke(); cc(x, sd * 17, -ry - 24, 5); x.fillStyle = "#ffd34e"; x.fill(); x.stroke(); } }
        body(); x.fillStyle = col; x.fill();
        x.save(); body(); x.clip();
        if (G[10] === 1) { x.beginPath(); x.ellipse(0, ry * .4, rx * .65, ry * .6, 0, 0, 7); x.fillStyle = lt; x.fill(); }
        else if (G[10] === 2) { x.fillStyle = "rgba(0,0,0,.18)"; for (let i = -2; i <= 2; i++) x.fillRect(i * 14 - 4, -ry, 8, ry * 2); }
        const sp = G[6];
        if (sp) { x.fillStyle = sp === 3 ? lt : "rgba(0,0,0,.22)"; const pts = sp === 1 ? [[-14, 10], [12, 16], [4, -8]] : [[-20, 8], [-8, 20], [10, 14], [20, 2], [-6, -4], [8, -14], [-22, -10]]; pts.forEach(p => { if (sp === 3) { st5(x, p[0], p[1], 6); x.fill(); } else { cc(x, p[0], p[1], 4); x.fill(); } }); }
        x.restore(); body(); x.stroke();
        const ne = G[2] + 1, bl = (tt + ph) % 4 < .12, spc = ne === 1 ? 0 : Math.min(18, rx * 1.2 / (ne - 1)), er = ne === 1 ? 11 : ne > 2 ? 5.5 : 7.5, ey = -ry * .25;
        for (let i = 0; i < ne; i++) { const ex = (i - (ne - 1) / 2) * spc; cc(x, ex, ey, er); x.fillStyle = "#fff"; x.fill(); x.lineWidth = 2; x.stroke(); x.fillStyle = "#222"; x.beginPath(); x.ellipse(ex + Math.sin(tt + ph) * 1.5, ey, er * .5, bl ? 1 : er * .5, 0, 0, 7); x.fill(); }
        x.lineWidth = 3; x.strokeStyle = dk; const my = ry * .35, mo = G[7];
        if (mo === 1) { x.beginPath(); x.ellipse(0, my, 8, 6, 0, 0, 7); x.fillStyle = "#4a1230"; x.fill(); x.stroke(); }
        else { x.beginPath(); x.arc(0, my - 6, 10, .2, Math.PI - .2); x.stroke(); if (mo === 2) { cc(x, 0, my + 6, 5); x.fillStyle = "#ff6b8a"; x.fill(); } }
        x.restore();
      };
      const CW = 213, CH = 140, cell = i => ({ x: (i % 3) * CW + CW / 2, y: Math.floor(i / 3) * CH + 76 });
      const child = (a, b) => {
        const o = { g: GD.map((m, i) => { let v = (b && Math.random() < .5) ? b.g[i] : a.g[i]; if (i < NG && Math.random() < MUT) v = i === 0 ? (v + g.ri(-50, 50) + 360) % 360 : g.ri(0, m - 1); if (i === 0) v = (v + g.ri(-10, 10) + 360) % 360; return v; }) };
        return o;
      };
      const pickAt = p => {
        if (p.y < 280) { const i = Math.floor(p.x / CW) + 3 * Math.floor(p.y / CH); return grid[i]; }
        if (p.y > 300) { const i = Math.floor(p.x / 80); return hall[i]; }
        return null;
      };
      g.on(c, "pointerdown", e => {
        const p = pos(e), o = pickAt(p); if (!o) return;
        const k = picks.indexOf(o); if (k >= 0) { picks.splice(k, 1); g.sfx("back"); return; }
        if (picks.length >= 2) picks.shift(); picks.push(o); g.sfx("pick");
      });
      const breed = () => {
        if (!picks.length) { g.sfx("back"); floatText(g, c, W, H, "Pick 1 or 2 creatures!", 320, 150, "#fff"); return; }
        const a = picks[0], b = picks[1] || null; const ng = [{ g: a.g.slice() }];
        for (let i = 1; i < 6; i++) ng.push(child(a, b));
        grid = ng; picks = []; gen++; g.add(1); g.sfx("grow"); for (let i = 0; i < 6; i++) { const ce = cell(i); puff(parts, ce.x, ce.y, 8, ["#fff6a0", "#fff", "#b6ffcb"], 120, .7, 40, "s"); } save();
      };
      bar(g, [
        ["Breed", breed, "background:#6be28f;color:#10301a;font-weight:bold"],
        ["Keep", () => { if (!picks.length) { g.sfx("back"); return; } picks.forEach(p => { if (hall.indexOf(p) < 0) { hall.push({ g: p.g.slice() }); g.add(2); } }); hall = hall.slice(-8); picks = []; g.sfx("cheer"); save(); }],
        ["Forget", () => { hall = hall.filter(h => picks.indexOf(h) < 0); picks = []; g.sfx("swish"); save(); }],
        ["New random", () => { grid = []; for (let i = 0; i < 6; i++) grid.push(rnd()); picks = []; gen = 1; g.sfx("swish"); save(); }],
        ["Save picture", () => g.saveImage(c, "my-creatures")], FINB(g)
      ]);
      g.loop((dt, tt) => {
        t = tt;
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#14304a"); gr.addColorStop(1, "#1d5a52"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        for (let i = 0; i < 6; i++) { const ce = cell(i), pk = picks.indexOf(grid[i]); rr(x, ce.x - CW / 2 + 6, ce.y - 66, CW - 12, CH - 8, 16); x.fillStyle = pk >= 0 ? "rgba(255,255,255,.28)" : "rgba(255,255,255,.1)"; x.fill(); if (pk >= 0) { x.lineWidth = 4; x.strokeStyle = "#ffd34e"; x.stroke(); txt(x, "Parent " + (pk + 1), ce.x, ce.y - 46, 14, "#ffd34e"); } cre(grid[i].g, ce.x, ce.y + 10, 1, t, i * 1.3); }
        x.fillStyle = "rgba(0,0,0,.3)"; x.fillRect(0, 292, W, 108); txt(x, "Generation " + gen, 70, 312, 14, "#fff");
        txt(x, hall.length ? "Your kept creatures" : "Press Keep to collect favourites here", 330, 312, 14, "#cfe");
        for (let i = 0; i < 8; i++) { rr(x, i * 80 + 4, 322, 72, 72, 10); const h = hall[i], pk = h ? picks.indexOf(h) : -1; x.fillStyle = "rgba(255,255,255,.08)"; x.fill(); if (pk >= 0) { x.lineWidth = 3; x.strokeStyle = "#ffd34e"; x.stroke(); } if (h) cre(h.g, i * 80 + 40, 362, .5, t, i); }
        drawParts(parts, x, dt);
      });
    }
  });

  // ---- Fashion Studio ----
  B.add({
    id: "s14-fashion", name: "Fashion Studio", ages: [6, 20], cat: "Creative", color: "#ff6fb5", icon: "F",
    desc: "Design outfits with clothes, colours and patterns, then strut down the runway.", controls: "Tap Hair, Hat, Top, Bottom, Shoes or Extra to change it, pick colours and patterns, then Strut!",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 400);
      const SL = ["Hair", "Hat", "Top", "Bottom", "Shoes", "Extra"], NS = g.by(3, 4, 6), NP = g.by(3, 5, 6), SK = ["#fde0c8", "#f2c9a0", "#d9a066", "#a56b3f", "#6b4226"];
      const TOPS = [[[-38, 134, -14, 128, 14, 128, 38, 134, 62, 172, 46, 184, 36, 166, 34, 228, -34, 228, -36, 166, -46, 184, -62, 172]], [[-38, 134, -14, 128, 14, 128, 38, 134, 70, 232, 54, 238, 36, 176, 34, 228, -34, 228, -36, 176, -54, 238, -70, 232]], [[-36, 134, -14, 128, 14, 128, 36, 134, 30, 215, 62, 312, -62, 312, -30, 215]], [[-28, 128, -16, 128, 0, 146, 16, 128, 28, 128, 32, 228, -32, 228]], [[-42, 132, -14, 126, 14, 126, 42, 132, 76, 236, 58, 244, 40, 180, 38, 232, -38, 232, -40, 180, -58, 244, -76, 236]], [[-14, 128, 14, 128, 64, 200, 52, 252, -52, 252, -64, 200]]];
      const BOTS = [[[-34, 224, -1, 224, -3, 356, -30, 356], [1, 224, 34, 224, 30, 356, 3, 356]], [[-34, 224, -1, 224, -3, 290, -32, 290], [1, 224, 34, 224, 32, 290, 3, 290]], [[-34, 224, 34, 224, 54, 302, -54, 302]], [[-34, 224, -1, 224, -3, 328, -30, 328], [1, 224, 34, 224, 30, 328, 3, 328]], [[-34, 224, -1, 224, 2, 358, -40, 362], [1, 224, 34, 224, 40, 362, -2, 358]], [[-38, 224, 38, 224, 46, 356, 4, 356, 0, 300, -4, 356, -46, 356]]];
      const mkSlot = col => ({ s: 0, c: col, p: 0, pc: "#ffffff" });
      let F = { sl: [mkSlot("#8b5a2b"), mkSlot("#ff4d6d"), mkSlot("#4cc3ff"), mkSlot("#2b2b3a"), mkSlot("#ff4d6d"), mkSlot("#ffd34e")], skin: SK[1] };
      try { const d = g.load(); if (d && Array.isArray(d.sl) && d.sl.length === 6) { F.sl = d.sl.map((s, i) => ({ s: ((s.s | 0) % NS + NS) % NS, c: String(s.c), p: ((s.p | 0) % NP + NP) % NP, pc: String(s.pc) })); F.skin = String(d.skin); } } catch (e) {}
      let sel = 2, strut = false, t = 0, fx = W / 2, flash = 0, parts = [];
      const save = () => g.save(F);
      const poly = a => { x.moveTo(a[0], a[1]); for (let i = 2; i < a.length; i += 2) x.lineTo(a[i], a[i + 1]); x.closePath(); };
      const pat = s => {
        x.fillStyle = s.pc; x.strokeStyle = s.pc;
        if (s.p === 1) for (let y = 40; y < 380; y += 16) x.fillRect(-100, y, 200, 7);
        else if (s.p === 2) for (let i = -96; i < 100; i += 16) for (let j = 40; j < 380; j += 16) { cc(x, i, j, 3); x.fill(); }
        else if (s.p === 3) for (let i = -98; i < 100; i += 14) for (let j = 42; j < 380; j += 14) if (((i + 98) / 14 + (j - 42) / 14) % 2 === 0) x.fillRect(i, j, 14, 14);
        else if (s.p === 4) { x.lineWidth = 3; for (let j = 40; j < 380; j += 14) { x.beginPath(); for (let i = -100; i <= 100; i += 10) x.lineTo(i, j + ((i / 10) % 2 ? 5 : 0)); x.stroke(); } }
        else if (s.p === 5) for (let i = -90; i < 100; i += 24) for (let j = 48; j < 380; j += 24) { st5(x, i + ((j / 24) % 2 ? 12 : 0), j, 6); x.fill(); }
      };
      const fp = s => { x.fillStyle = s.c; x.fill(); if (s.p) { x.save(); x.clip(); pat(s); x.restore(); } x.lineWidth = 2; x.strokeStyle = "rgba(0,0,0,.35)"; x.stroke(); };
      const polys = (arr, s) => { x.beginPath(); arr.forEach(poly); fp(s); };
      const hairShape = (st, s) => {
        if (st === 2) { x.beginPath(); for (let i = 0; i < 9; i++) { const a = Math.PI + i * Math.PI / 8, px = Math.cos(a) * 34, py = 90 + Math.sin(a) * 34; x.moveTo(px + 13, py); x.arc(px, py, 13, 0, 7); } fp(s); return; }
        if (st === 4) { x.beginPath(); for (let i = 0; i < 7; i++) { const a0 = Math.PI + i * Math.PI / 7, a1 = a0 + Math.PI / 7, am = (a0 + a1) / 2; x.moveTo(Math.cos(a0) * 34, 90 + Math.sin(a0) * 34); x.lineTo(Math.cos(am) * 52, 90 + Math.sin(am) * 52); x.lineTo(Math.cos(a1) * 34, 90 + Math.sin(a1) * 34); } fp(s); }
        x.beginPath(); x.arc(0, 90, 37, Math.PI * 1.02, Math.PI * 1.98); x.lineTo(30, 78); x.quadraticCurveTo(0, 64, -30, 78); x.closePath();
        if (st === 3) { x.moveTo(60, 70); x.arc(48, 70, 12, 0, 7); x.moveTo(60, 98); x.ellipse(50, 98, 11, 26, .3, 0, 7); }
        if (st === 5) { x.moveTo(14, 46); x.arc(0, 46, 14, 0, 7); }
        fp(s);
      };
      const figure = (tt) => {
        const S = F.sl, sk = F.skin, sway = Math.sin(tt * 1.3) * .02 + (strut ? Math.sin(tt * 6) * .04 : 0);
        x.save(); x.translate(fx, 372 - (strut ? Math.abs(Math.sin(tt * 6)) * 6 : 0)); x.rotate(sway); x.translate(0, -372);
        x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(0, 374, 60, 9, 0, 0, 7); x.fill();
        if (S[0].s === 1) { rr(x, -42, 66, 84, 110, 28); fp(S[0]); }
        x.lineCap = "round"; x.strokeStyle = sk; x.lineWidth = 14;
        for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 38, 142); x.lineTo(sd * 58, 236); x.stroke(); cc(x, sd * 58, 240, 8); x.fillStyle = sk; x.fill(); x.beginPath(); x.moveTo(sd * 17, 246); x.lineTo(sd * 18, 360); x.lineWidth = 17; x.stroke(); x.lineWidth = 14; }
        x.fillStyle = sk; x.fillRect(-9, 116, 18, 24);
        x.beginPath(); poly([-34, 134, 34, 134, 32, 228, -32, 228]); poly([-32, 224, 32, 224, 34, 262, -34, 262]); x.fillStyle = "#eef0fa"; x.fill();
        polys(BOTS[S[3].s], S[3]);
        for (const sd of [-1, 1]) {
          const sx = sd * 18, s5 = S[4], st = s5.s;
          x.beginPath();
          if (st === 0) x.roundRect(sx - 17, 350, 34, 20, 9); else if (st === 1) x.roundRect(sx - 13, 322, 26, 50, 7); else if (st === 2) x.ellipse(sx, 366, 18, 6, 0, 0, 7); else if (st === 3) x.roundRect(sx - 14, 334, 28, 36, 8); else if (st === 4) x.ellipse(sx + sd * 2, 364, 24, 12, 0, 0, 7); else x.roundRect(sx - 13, 322, 26, 50, 7);
          fp(s5);
          if (st === 5) { x.fillStyle = "#ffb02e"; x.beginPath(); x.moveTo(sx - 8, 372); x.lineTo(sx + 8, 372); x.lineTo(sx, 388 + Math.random() * 8); x.fill(); }
        }
        polys(TOPS[S[2].s], S[2]);
        if (S[2].s === 4) { x.beginPath(); x.ellipse(0, 128, 22, 9, 0, 0, 7); x.lineWidth = 3; x.strokeStyle = "rgba(0,0,0,.4)"; x.stroke(); }
        cc(x, 0, 92, 34); x.fillStyle = sk; x.fill();
        const bl = (tt % 3.5) < .12; x.fillStyle = "#2b2b3a"; for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(sd * 12, 94, 4, bl ? 1 : 5, 0, 0, 7); x.fill(); cc(x, sd * 20, 104, 5); x.fillStyle = "rgba(255,90,120,.3)"; x.fill(); x.fillStyle = "#2b2b3a"; }
        x.lineWidth = 3; x.strokeStyle = "#7a3b2e"; x.beginPath(); x.arc(0, 100, 10, .25, Math.PI - .25); x.stroke();
        hairShape(S[0].s, S[0]);
        const hs = S[1], hh = hs.s;
        if (hh === 1) { x.beginPath(); x.arc(0, 80, 36, Math.PI, 0); x.closePath(); fp(hs); x.beginPath(); x.ellipse(24, 80, 26, 6, 0, 0, 7); fp(hs); }
        else if (hh === 2) { rr(x, -24, 22, 48, 50, 3); fp(hs); rr(x, -38, 68, 76, 10, 5); fp(hs); }
        else if (hh === 3) { x.beginPath(); poly([-28, 70, -30, 42, -15, 58, 0, 38, 15, 58, 30, 42, 28, 70]); fp(hs); }
        else if (hh === 4) { x.beginPath(); x.arc(0, 78, 36, Math.PI, 0); x.closePath(); fp(hs); rr(x, -37, 72, 74, 12, 5); fp(hs); cc(x, 0, 40, 9); fp(hs); }
        else if (hh === 5) { x.beginPath(); poly([-26, 66, 26, 66, 0, 14]); fp(hs); cc(x, 0, 14, 7); fp(hs); }
        const es = S[5], ee = es.s;
        if (ee === 1) { rr(x, -36, 122, 72, 16, 8); fp(es); rr(x, 8, 130, 16, 52, 5); fp(es); }
        else if (ee === 2) { x.lineWidth = 3; x.strokeStyle = es.c; for (const sd of [-1, 1]) { cc(x, sd * 12, 93, 10); x.stroke(); } x.beginPath(); x.moveTo(-2, 92); x.lineTo(2, 92); x.stroke(); }
        else if (ee === 3) { x.beginPath(); poly([-2, 136, -22, 126, -22, 146]); poly([2, 136, 22, 126, 22, 146]); fp(es); cc(x, 0, 136, 5); fp(es); }
        else if (ee === 4) { x.lineWidth = 4; x.strokeStyle = es.c; x.beginPath(); x.moveTo(-34, 134); x.lineTo(44, 228); x.stroke(); rr(x, 28, 218, 44, 36, 9); fp(es); }
        else if (ee === 5) { for (let i = 0; i < 8; i++) { const a = i * Math.PI / 7; cc(x, Math.cos(a) * 20, 128 + Math.sin(a) * 18, 4.5); x.fillStyle = i % 2 ? es.pc : es.c; x.fill(); } }
        x.restore();
      };
      const cycle = i => { sel = i; S().s = (S().s + 1) % Math.min(NS, 6); g.add(1); g.sfx("click"); puff(parts, fx, 200, 10, [S().c, "#fff", "#ffd34e"], 140, .6, 150, "s"); save(); mark(); };
      const S = () => F.sl[sel];
      const mark = () => sb.bs.forEach((b, i) => { b.style.outline = i === sel ? "3px solid #fff" : "none"; });
      const sb = bar(g, SL.map((n, i) => [n, () => cycle(i)]));
      swatches(g, PAL, col => { S().c = col; g.add(1); g.sfx("pick"); save(); });
      const lab = s => { const d = g.html(s); d.style.cssText = "font:bold 12px system-ui,sans-serif;color:#dfe8ff;text-align:center;padding:2px"; };
      if (g.diff >= 1) { lab("Pattern colour"); swatches(g, PAL, col => { S().pc = col; g.sfx("pick"); save(); }); }
      lab("Skin");
      swatches(g, SK, col => { F.skin = col; g.sfx("pick"); save(); }, SK.indexOf(F.skin));
      bar(g, [
        ["Pattern", () => { S().p = (S().p + 1) % NP; g.add(1); g.sfx("pop"); save(); }],
        ["Strut!", b => { strut = !strut; b.textContent = strut ? "Stop" : "Strut!"; g.sfx(strut ? "cheer" : "click"); }, "background:#ffd34e;color:#3a2600;font-weight:bold"],
        ["Surprise me", () => { F.sl.forEach((s, i) => { s.s = g.ri(0, Math.min(NS, 6) - 1); s.c = g.pick(PAL); s.p = g.ri(0, NP - 1); s.pc = g.pick(PAL); }); g.add(3); g.sfx("cheer"); puff(parts, fx, 200, 24, PAL, 220, .9, 100, "s"); save(); }],
        ["Save picture", () => g.saveImage(c, "my-outfit")], FINB(g)
      ]);
      mark();
      g.loop((dt, tt) => {
        t = tt; flash = Math.max(0, flash - dt * 3);
        if (strut) { fx = W / 2 + Math.sin(t * .9) * 190; if (Math.random() < dt * 1.5) { flash = 1; g.sfx("tick"); } } else fx += (W / 2 - fx) * Math.min(1, dt * 4);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#2a1048"); gr.addColorStop(1, "#5a2a78"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        for (let i = 0; i < 3; i++) { const bx = 160 + i * 160 + Math.sin(t * 1.5 + i) * 30; x.fillStyle = "rgba(255,240,200,.12)"; x.beginPath(); x.moveTo(bx - 10, 0); x.lineTo(bx + 10, 0); x.lineTo(fx + 80 * (i - 1), 380); x.lineTo(fx + 80 * (i - 1) - 60, 380); x.closePath(); x.fill(); }
        x.fillStyle = "#1a0b2e"; x.fillRect(0, 372, W, 28); x.fillStyle = "#ff6fb5"; x.fillRect(0, 372, W, 4);
        figure(t); drawParts(parts, x, dt);
        if (flash > 0) { x.fillStyle = "rgba(255,255,255," + flash * .4 + ")"; x.fillRect(0, 0, W, H); }
        if (!strut) txt(x, "Design an outfit!", 110, 30, 16, "#fff");
      });
    }
  });

  // ---- Snow and Sand Builder ----
  B.add({
    id: "s14-snowsand", name: "Snowman and Sandcastle", ages: [5, 14], cat: "Build", color: "#8fd3ff", icon: "S",
    desc: "Build a snowman in the snow or a castle on the beach, piece by piece.", controls: "Pick a piece, then tap the scene to place it. Stack big pieces on top of each other!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const GROUND = 335, CAP = g.by(30, 60, 100);
      const D = {
        bs: { n: "Small ball", w: 44, h: 44, st: 1 }, bm: { n: "Medium ball", w: 68, h: 68, st: 1 }, bl: { n: "Big ball", w: 96, h: 96, st: 1 },
        nose: { n: "Carrot nose" }, eye: { n: "Coal eyes" }, btn: { n: "Buttons" }, arm: { n: "Stick arm" }, tophat: { n: "Top hat" }, bean: { n: "Beanie", col: 1 }, scarf: { n: "Scarf", col: 1 }, mouth: { n: "Smile" }, pine: { n: "Pine tree" }, heap: { n: "Snow heap" },
        wall: { n: "Wall", w: 64, h: 40, st: 1 }, tower: { n: "Tower", w: 48, h: 92, st: 1 }, cone: { n: "Roof", w: 60, h: 46, st: 1, col: 1 }, gate: { n: "Gate", w: 56, h: 58, st: 1 }, flag: { n: "Flag", col: 1 }, win: { n: "Window" }, shell: { n: "Shell" }, star: { n: "Starfish" }, bucket: { n: "Bucket", col: 1 }, moat: { n: "Moat" }, palm: { n: "Palm tree" }
      };
      const LS = { snow: ["bl", "bm", "bs", "nose", "eye", "btn", "arm", "tophat", "scarf", "bean", "mouth", "pine", "heap"], sand: ["wall", "tower", "cone", "flag", "gate", "win", "shell", "star", "bucket", "palm", "moat"] };
      const NA = g.by(7, 10, 13);
      let scene = "snow", items = { snow: [], sand: [] }, cur = 0, col = "#ff4d6d", t = 0, parts = [], snowF = [];
      try { const d = g.load(); if (d && d.items) { ["snow", "sand"].forEach(s => { if (Array.isArray(d.items[s])) items[s] = d.items[s].filter(o => o && D[o.k] && isFinite(o.x) && isFinite(o.y)).slice(0, CAP).map(o => ({ k: o.k, x: +o.x, y: +o.y, c: String(o.c), t: 9 })); }); if (d.scene === "sand") scene = "sand"; } } catch (e) {}
      for (let i = 0; i < 60; i++) snowF.push({ x: g.rf(0, W), y: g.rf(0, H), v: g.rf(20, 50), r: g.rf(1.5, 3.5) });
      const save = () => g.save({ scene, items: { snow: items.snow.map(o => ({ k: o.k, x: o.x, y: o.y, c: o.c })), sand: items.sand.map(o => ({ k: o.k, x: o.x, y: o.y, c: o.c })) } });
      const avail = () => LS[scene].slice(0, scene === "snow" ? Math.min(NA, 13) : Math.min(NA, 11));
      const place = (k, px, py, cl) => {
        const L = items[scene], d = D[k]; if (L.length >= CAP) { g.sfx("back"); floatText(g, c, W, H, "Scene is full!", 320, 100, "#fff"); return null; }
        let X = px, Y = py;
        if (d.st) {
          let tp = null; L.forEach(o => { const od = D[o.k]; if (od.st && Math.abs(px - o.x) < (d.w + od.w) / 2 - 6 && (!tp || o.y - od.h < tp.y - D[tp.k].h)) tp = o; });
          if (tp && Math.abs(px - tp.x) < 26) X = tp.x;
          let base = GROUND; L.forEach(o => { const od = D[o.k]; if (od.st && Math.abs(X - o.x) < (d.w + od.w) / 2 - 6) base = Math.min(base, o.y - od.h); });
          Y = base; if (Y - d.h < 20) { g.sfx("back"); floatText(g, c, W, H, "Too tall!", X, 100, "#fff"); return null; }
        } else if (k === "pine" || k === "palm" || k === "heap" || k === "moat" || k === "shell" || k === "star" || k === "bucket") Y = Math.max(py, 270);
        const o = { k, x: X, y: Y, c: cl || col, t: 0 }; L.push(o); g.add(1); g.sfx(d.st ? "thump" : "pop"); puff(parts, X, Y - (d.h || 10) / 2, 8, scene === "snow" ? ["#fff", "#cfeeff"] : ["#f3dca0", "#e8c98a"], 90, .5, 200); save(); return o;
      };
      g.on(c, "pointerdown", e => { const p = pos(e); place(avail()[cur] || avail()[0], p.x, p.y); });
      let tb = null;
      const mk = () => { if (tb) tb.bs.forEach((b, i) => { b.style.outline = i === cur ? "3px solid #fff" : "none"; }); };
      const sceneBar = bar(g, [["Snow", () => { scene = "snow"; cur = 0; mkTb(); g.sfx("click"); save(); }], ["Sand", () => { scene = "sand"; cur = 0; mkTb(); g.sfx("click"); save(); }]]);
      const mkTb = () => { if (tb) tb.el.remove(); tb = bar(g, avail().map((k, i) => [D[k].n, () => { cur = i; g.sfx("click"); mk(); }])); sceneBar.el.after(tb.el); mk(); };
      mkTb();
      swatches(g, PAL, cl => { col = cl; g.sfx("pick"); });
      const surprise = () => {
        const bx = g.rf(170, 470);
        if (scene === "snow") {
          const a = place("bl", bx, 0, col), b = place("bm", bx, 0, col), s = place("bs", bx, 0, col); if (!s) return; const hy = s.y - 22;
          place("eye", bx, hy - 6); place("nose", bx, hy + 2); place("mouth", bx, hy + 12); place("btn", bx, b.y - 34); place("btn", bx, b.y - 20); place("scarf", bx, s.y + 2, g.pick(PAL)); place("tophat", bx, s.y - 38, "#2b2b3a"); place("arm", bx + 34, b.y - 40); place("pine", bx + 150, 320); place("pine", bx - 150, 320);
        } else {
          place("tower", bx - 70, 0); place("tower", bx + 70, 0); place("wall", bx - 125, 0); place("wall", bx + 125, 0); place("gate", bx, 0); const cn = place("cone", bx - 70, 0, g.pick(PAL)); place("cone", bx + 70, 0, g.pick(PAL)); if (cn) place("flag", bx - 70, cn.y - 46, g.pick(PAL)); place("win", bx - 70, 280); place("win", bx + 70, 280); place("shell", bx + 150, 320); place("star", bx - 150, 330);
        }
        g.sfx("cheer");
      };
      bar(g, [["Undo", () => { items[scene].pop(); g.sfx("back"); save(); }], ["Clear", () => { items[scene] = []; g.sfx("swish"); save(); }], ["Surprise me", surprise], ["Save picture", () => g.saveImage(c, "my-" + scene)], FINB(g)]);
      const drawIt = (o, tt) => {
        const k = o.k, cl = o.c; x.lineWidth = 2; x.lineJoin = "round";
        const rim = "rgba(40,50,90,.35)";
        if (k === "bs" || k === "bm" || k === "bl") { const r = D[k].w / 2; const gr = x.createRadialGradient(-r * .3, -r * 1.3, r * .1, 0, -r, r); gr.addColorStop(0, "#fff"); gr.addColorStop(1, "#cfe0f5"); cc(x, 0, -r, r); x.fillStyle = gr; x.fill(); x.strokeStyle = rim; x.stroke(); }
        else if (k === "nose") { x.beginPath(); x.moveTo(-3, -4); x.lineTo(24, 2); x.lineTo(-3, 6); x.closePath(); x.fillStyle = "#ff8a2a"; x.fill(); }
        else if (k === "eye") { for (const sd of [-1, 1]) { cc(x, sd * 8, 0, 4.5); x.fillStyle = "#222"; x.fill(); } }
        else if (k === "btn") { cc(x, 0, 0, 5); x.fillStyle = "#222"; x.fill(); }
        else if (k === "arm") { x.strokeStyle = "#6b4226"; x.lineWidth = 4; x.lineCap = "round"; x.beginPath(); x.moveTo(0, 0); x.lineTo(46, -14); x.moveTo(34, -10); x.lineTo(42, -26); x.moveTo(26, -8); x.lineTo(28, 6); x.stroke(); x.lineCap = "butt"; }
        else if (k === "tophat") { rr(x, -16, -36, 32, 36, 3); x.fillStyle = "#222"; x.fill(); rr(x, -16, -12, 32, 8, 0); x.fillStyle = cl; x.fill(); rr(x, -28, -4, 56, 8, 4); x.fillStyle = "#222"; x.fill(); }
        else if (k === "bean") { x.beginPath(); x.arc(0, 0, 24, Math.PI, 0); x.closePath(); x.fillStyle = cl; x.fill(); x.strokeStyle = rim; x.stroke(); rr(x, -26, -2, 52, 9, 4); x.fillStyle = "#fff"; x.fill(); cc(x, 0, -26, 6); x.fillStyle = "#fff"; x.fill(); }
        else if (k === "scarf") { rr(x, -34, -8, 68, 16, 8); x.fillStyle = cl; x.fill(); x.strokeStyle = rim; x.stroke(); rr(x, 12, 2, 14, 36, 4); x.fillStyle = cl; x.fill(); x.stroke(); x.fillStyle = "rgba(255,255,255,.5)"; x.fillRect(-20, -8, 6, 16); x.fillRect(0, -8, 6, 16); }
        else if (k === "mouth") { x.fillStyle = "#222"; for (let i = 0; i < 5; i++) { const a = .25 + i * (Math.PI - .5) / 4; cc(x, Math.cos(a) * 14, Math.sin(a) * 8, 2.4); x.fill(); } }
        else if (k === "pine") { x.fillStyle = "#6b4226"; x.fillRect(-5, -14, 10, 14); for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(-30 + i * 6, -12 - i * 28); x.lineTo(30 - i * 6, -12 - i * 28); x.lineTo(0, -56 - i * 28); x.closePath(); x.fillStyle = "#2f8f5b"; x.fill(); x.strokeStyle = rim; x.stroke(); x.beginPath(); x.moveTo(-24 + i * 6, -12 - i * 28); x.quadraticCurveTo(0, -22 - i * 28, 24 - i * 6, -12 - i * 28); x.lineTo(30 - i * 6, -12 - i * 28); x.fillStyle = "#fff"; x.globalAlpha = .7; x.fill(); x.globalAlpha = 1; } }
        else if (k === "heap") { x.beginPath(); x.ellipse(0, 0, 42, 16, 0, Math.PI, 0); x.closePath(); x.fillStyle = "#f3f8ff"; x.fill(); x.strokeStyle = rim; x.stroke(); }
        else if (k === "wall") { rr(x, -32, -40, 64, 40, 3); x.fillStyle = "#e8c98a"; x.fill(); x.strokeStyle = "rgba(120,80,20,.4)"; x.stroke(); x.beginPath(); x.moveTo(-32, -20); x.lineTo(32, -20); x.moveTo(-10, -40); x.lineTo(-10, -20); x.moveTo(12, -20); x.lineTo(12, 0); x.stroke(); }
        else if (k === "tower") { rr(x, -24, -92, 48, 92, 3); x.fillStyle = "#e0bd7a"; x.fill(); x.strokeStyle = "rgba(120,80,20,.4)"; x.stroke(); for (let i = 0; i < 3; i++) { x.fillStyle = "#e0bd7a"; x.fillRect(-24 + i * 18, -102, 12, 12); x.strokeRect(-24 + i * 18, -102, 12, 12); } rr(x, -5, -70, 10, 18, 5); x.fillStyle = "rgba(60,40,10,.6)"; x.fill(); }
        else if (k === "cone") { x.beginPath(); x.moveTo(-30, 0); x.lineTo(30, 0); x.lineTo(0, -46); x.closePath(); x.fillStyle = cl; x.fill(); x.strokeStyle = rim; x.stroke(); }
        else if (k === "gate") { rr(x, -28, -58, 56, 58, 3); x.fillStyle = "#e8c98a"; x.fill(); x.strokeStyle = "rgba(120,80,20,.4)"; x.stroke(); x.beginPath(); x.moveTo(-12, 0); x.lineTo(-12, -26); x.arc(0, -26, 12, Math.PI, 0); x.lineTo(12, 0); x.closePath(); x.fillStyle = "#5a3b22"; x.fill(); }
        else if (k === "flag") { x.strokeStyle = "#6b4226"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -52); x.stroke(); x.beginPath(); x.moveTo(0, -52); x.lineTo(26 + Math.sin(tt * 6) * 3, -44 + Math.sin(tt * 6 + 1) * 3); x.lineTo(0, -34); x.closePath(); x.fillStyle = cl; x.fill(); }
        else if (k === "win") { rr(x, -7, -10, 14, 20, 7); x.fillStyle = "rgba(60,40,10,.65)"; x.fill(); }
        else if (k === "shell") { x.beginPath(); x.moveTo(0, 6); x.arc(0, 6, 16, Math.PI, 0); x.closePath(); x.fillStyle = "#ffc9d6"; x.fill(); x.strokeStyle = "rgba(160,60,90,.6)"; x.stroke(); x.beginPath(); for (let i = -2; i <= 2; i++) { x.moveTo(0, 6); x.lineTo(i * 6.5, -10); } x.stroke(); }
        else if (k === "star") { st5(x, 0, 0, 16); x.fillStyle = "#ff8a2a"; x.fill(); x.strokeStyle = "rgba(120,50,0,.5)"; x.stroke(); }
        else if (k === "bucket") { x.beginPath(); x.moveTo(-16, -26); x.lineTo(16, -26); x.lineTo(12, 0); x.lineTo(-12, 0); x.closePath(); x.fillStyle = cl; x.fill(); x.strokeStyle = rim; x.stroke(); x.beginPath(); x.arc(0, -26, 14, Math.PI, 0); x.stroke(); }
        else if (k === "moat") { x.beginPath(); x.ellipse(0, 0, 60, 14, 0, 0, 7); x.fillStyle = "#4cc3ff"; x.fill(); x.strokeStyle = "rgba(255,255,255,.6)"; x.beginPath(); x.ellipse(Math.sin(tt * 2) * 6, 0, 30, 6, 0, 0, 7); x.stroke(); }
        else if (k === "palm") { x.strokeStyle = "#8b5a2b"; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(10, -40, 4, -80); x.stroke(); x.fillStyle = "#2f9e44"; for (let i = 0; i < 5; i++) { x.save(); x.translate(4, -80); x.rotate(-1.4 + i * .7 + Math.sin(tt * 2 + i) * .05); x.beginPath(); x.ellipse(24, 0, 28, 7, 0, 0, 7); x.fill(); x.restore(); } }
      };
      g.loop((dt, tt) => {
        t = tt;
        const snow = scene === "snow", gr = x.createLinearGradient(0, 0, 0, H);
        if (snow) { gr.addColorStop(0, "#5b7fd6"); gr.addColorStop(.7, "#cfe2ff"); } else { gr.addColorStop(0, "#6ed0ff"); gr.addColorStop(.6, "#bff0ff"); }
        x.fillStyle = gr; x.fillRect(0, 0, W, H);
        if (snow) { x.fillStyle = "#f4f9ff"; x.beginPath(); x.moveTo(0, 290); x.quadraticCurveTo(160, 250, 320, 285); x.quadraticCurveTo(480, 320, 640, 270); x.lineTo(640, H); x.lineTo(0, H); x.fill(); x.fillStyle = "#e6f0fb"; x.fillRect(0, GROUND, W, H - GROUND); }
        else { cc(x, 540, 70, 30); x.fillStyle = "#fff3a0"; x.fill(); x.fillStyle = "#3ea6e8"; x.fillRect(0, 190, W, 80); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 3; for (let i = 0; i < 3; i++) { x.beginPath(); for (let px = 0; px <= W; px += 10) x.lineTo(px, 214 + i * 22 + Math.sin(px * .04 + t * 2 + i) * 4); x.stroke(); } x.fillStyle = "#f0d9a0"; x.beginPath(); x.moveTo(0, 262); x.quadraticCurveTo(320, 244, 640, 262); x.lineTo(640, H); x.lineTo(0, H); x.fill(); x.fillStyle = "#ecd193"; x.fillRect(0, GROUND, W, H - GROUND); }
        items[scene].forEach(o => {
          o.t += dt; const sq = o.t < .45 ? Math.sin(o.t * 16) * .12 * (1 - o.t / .45) : 0;
          x.save(); x.translate(o.x, o.y); x.scale(1 - sq, 1 + sq); drawIt(o, t); x.restore();
        });
        if (snow) { x.fillStyle = "rgba(255,255,255,.85)"; snowF.forEach(f => { f.y += f.v * dt; f.x += Math.sin(t + f.r * 3) * .3; if (f.y > H) { f.y = -4; f.x = g.rf(0, W); } cc(x, f.x, f.y, f.r); x.fill(); }); }
        drawParts(parts, x, dt);
        if (!items[scene].length) txt(x, "Tap the scene to build!", 320, 60, 22, "#fff");
      });
    }
  });

  // ---- Pet Room Decorator ----
  B.add({
    id: "s14-petroom", name: "Pet Room Designer", ages: [5, 12], cat: "Creative", color: "#ffb86b", icon: "H",
    desc: "Decorate a cosy room with furniture and watch your pet play in it.", controls: "Tap a furniture button to add it, drag it where you like. Tap the floor to call your pet",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const WALL = 250, DEFS = {
        bed: { n: "Bed", w: 110, h: 56, col: "#6ec6ff" }, sofa: { n: "Sofa", w: 132, h: 64, col: "#ff8fa3" }, rug: { n: "Rug", w: 150, h: 54, ctr: 1, flat: 1, col: "#ffd34e" }, plant: { n: "Plant", w: 48, h: 80, col: "#c97b4a" }, window: { n: "Window", w: 72, h: 84, ctr: 1, wall: 1, col: "#ffffff" }, toybox: { n: "Toy box", w: 72, h: 50, col: "#ff6fb5" },
        bookcase: { n: "Bookcase", w: 72, h: 112, col: "#b07a4a" }, table: { n: "Table", w: 92, h: 48, col: "#d9a066" }, lamp: { n: "Lamp", w: 40, h: 110, col: "#ffd34e" }, frame: { n: "Picture", w: 56, h: 66, ctr: 1, wall: 1, col: "#b07a4a" },
        tank: { n: "Fish tank", w: 90, h: 70, col: "#4cc3ff" }, bowl: { n: "Pet bowl", w: 44, h: 18, col: "#ff4d6d" }, cattree: { n: "Cat tree", w: 80, h: 120, col: "#a8e6a1" }, clock: { n: "Clock", w: 50, h: 50, ctr: 1, wall: 1, col: "#ffffff" }
      };
      const LST = ["bed", "sofa", "rug", "plant", "window", "toybox", "bookcase", "table", "lamp", "frame", "tank", "bowl", "cattree", "clock"], NF = g.by(6, 10, 14), NPT = g.by(2, 3, 4);
      let items = [], wallC = "#ffe3a8", wallP = 0, floorT = 0, sel = null, drag = null, t = 0, parts = [], petT = 0;
      try { const d = g.load(); if (d) { if (Array.isArray(d.items)) items = d.items.filter(o => o && DEFS[o.k] && isFinite(o.x) && isFinite(o.y)).slice(0, 40).map(o => ({ k: o.k, x: +o.x, y: +o.y, c: String(o.c), s: Math.max(.6, Math.min(1.8, +o.s || 1)) })); if (d.wallC) wallC = String(d.wallC); wallP = (d.wallP | 0) % g.by(3, 4, 5); floorT = (d.floorT | 0) % g.by(2, 3, 4); petT = (d.petT | 0) % NPT; } } catch (e) {}
      const P = { x: 320, y: 330, tx: 320, ty: 330, f: 1, run: false, goal: null, wait: 1, sleep: 0, jump: 0, walk: false };
      const save = () => g.save({ items: items.map(o => ({ k: o.k, x: o.x, y: o.y, c: o.c, s: o.s })), wallC, wallP, floorT, petT });
      const box = o => { const d = DEFS[o.k], w = d.w * o.s, h = d.h * o.s; return d.ctr ? { x0: o.x - w / 2, x1: o.x + w / 2, y0: o.y - h / 2, y1: o.y + h / 2 } : { x0: o.x - w / 2, x1: o.x + w / 2, y0: o.y - h, y1: o.y }; };
      const clampIt = o => { const d = DEFS[o.k]; o.x = g.clamp(o.x, 30, W - 30); if (d.wall) o.y = g.clamp(o.y, 50, WALL - 40); else if (d.ctr) o.y = g.clamp(o.y, WALL + 20, H - 20); else o.y = g.clamp(o.y, WALL + 20, H - 6); };
      const addItem = k => { if (items.length >= 40) { g.sfx("back"); return; } const d = DEFS[k], o = { k, x: g.rf(200, 440), y: d.wall ? g.rf(100, 160) : g.rf(300, 370), c: d.col, s: 1 }; items.push(o); sel = o; g.add(1); g.sfx("pop"); puff(parts, o.x, o.y - 20, 10, ["#fff", "#ffd34e"], 120, .6, 100, "s"); save(); };
      g.on(c, "pointerdown", e => {
        const p = pos(e); let hit = null;
        const ord = items.slice().sort((a, b) => (DEFS[a.k].flat ? -1 : a.y) - (DEFS[b.k].flat ? -1 : b.y));
        for (let i = ord.length - 1; i >= 0; i--) { const b = box(ord[i]); if (p.x >= b.x0 && p.x <= b.x1 && p.y >= b.y0 && p.y <= b.y1) { hit = ord[i]; break; } }
        if (hit) { sel = hit; drag = { dx: hit.x - p.x, dy: hit.y - p.y }; g.sfx("click"); c.setPointerCapture && (()=>{try{c.setPointerCapture(e.pointerId)}catch(_){}})(); return; }
        sel = null;
        if (Math.hypot(p.x - P.x, p.y - (P.y - 20)) < 40) { P.jump = 1; g.sfx("pop"); puff(parts, P.x, P.y - 40, 8, ["#ffd34e", "#fff"], 100, .6, 100, "s"); g.add(1); return; }
        if (p.y > WALL) { P.tx = g.clamp(p.x, 30, W - 30); P.ty = g.clamp(p.y, WALL + 30, H - 12); P.run = true; P.goal = null; P.sleep = 0; g.sfx("tick"); }
      });
      g.on(c, "pointermove", e => { if (!drag || !sel) return; const p = pos(e); sel.x = p.x + drag.dx; sel.y = p.y + drag.dy; clampIt(sel); });
      g.on(c, "pointerup", () => { if (drag) { drag = null; save(); g.sfx("thump"); } });
      const fb = bar(g, LST.slice(0, NF).map(k => [DEFS[k].n, () => addItem(k)]));
      swatches(g, PAL, col => { if (sel) { sel.c = col; } else wallC = col; g.sfx("pick"); save(); });
      const acts = [
        ["Wall pattern", () => { wallP = (wallP + 1) % g.by(3, 4, 5); g.sfx("click"); save(); }],
        ["Floor", () => { floorT = (floorT + 1) % g.by(2, 3, 4); g.sfx("click"); save(); }],
        ["Pet", () => { petT = (petT + 1) % NPT; g.sfx("pop"); P.jump = 1; save(); }],
        ["Remove", () => { if (sel) { items = items.filter(o => o !== sel); sel = null; g.sfx("back"); save(); } else g.sfx("back"); }],
        ["Save picture", () => g.saveImage(c, "my-pet-room")], FINB(g)
      ];
      if (g.diff >= 1) acts.splice(4, 0, ["Bigger", () => { if (sel) { sel.s = Math.min(1.8, sel.s * 1.2); clampIt(sel); g.sfx("grow"); save(); } }], ["Smaller", () => { if (sel) { sel.s = Math.max(.6, sel.s / 1.2); clampIt(sel); g.sfx("click"); save(); } }]);
      bar(g, acts);
      const drawItem = (o, tt) => {
        const k = o.k, cl = o.c; x.save(); x.translate(o.x, o.y); x.scale(o.s, o.s); x.lineWidth = 2; x.strokeStyle = "rgba(40,30,60,.4)"; x.lineJoin = "round";
        if (k === "bed") { rr(x, -52, -34, 104, 34, 6); x.fillStyle = "#a5703d"; x.fill(); x.stroke(); rr(x, -48, -50, 96, 24, 9); x.fillStyle = cl; x.fill(); x.stroke(); rr(x, -44, -58, 32, 16, 8); x.fillStyle = "#fff"; x.fill(); x.stroke(); }
        else if (k === "sofa") { rr(x, -58, -64, 116, 44, 14); x.fillStyle = cl; x.fill(); x.stroke(); rr(x, -62, -36, 124, 32, 10); x.fillStyle = cl; x.fill(); x.stroke(); rr(x, -68, -50, 18, 46, 9); x.fill(); x.stroke(); rr(x, 50, -50, 18, 46, 9); x.fill(); x.stroke(); }
        else if (k === "rug") { x.beginPath(); x.ellipse(0, 0, 75, 27, 0, 0, 7); x.fillStyle = cl; x.fill(); x.stroke(); x.beginPath(); x.ellipse(0, 0, 55, 18, 0, 0, 7); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 3; x.stroke(); }
        else if (k === "plant") { for (let i = 0; i < 5; i++) { x.save(); x.translate(0, -34); x.rotate(-1 + i * .5 + Math.sin(tt * 1.5 + i) * .04); x.beginPath(); x.ellipse(0, -22, 8, 24, 0, 0, 7); x.fillStyle = "#3cb371"; x.fill(); x.stroke(); x.restore(); } x.beginPath(); x.moveTo(-20, -36); x.lineTo(20, -36); x.lineTo(14, 0); x.lineTo(-14, 0); x.closePath(); x.fillStyle = cl; x.fill(); x.stroke(); }
        else if (k === "window") { rr(x, -34, -42, 68, 84, 5); x.fillStyle = "#9ad8ff"; x.fill(); cc(x, -10 + Math.sin(tt * .3) * 8, -14, 12); x.fillStyle = "rgba(255,255,255,.9)"; x.fill(); rr(x, -34, -42, 68, 84, 5); x.lineWidth = 5; x.strokeStyle = cl; x.stroke(); x.beginPath(); x.moveTo(0, -42); x.lineTo(0, 42); x.moveTo(-34, 0); x.lineTo(34, 0); x.stroke(); }
        else if (k === "toybox") { rr(x, -36, -36, 72, 36, 5); x.fillStyle = cl; x.fill(); x.stroke(); rr(x, -22, -50, 16, 16, 3); x.fillStyle = "#ffd34e"; x.fill(); cc(x, 8, -42, 9); x.fillStyle = "#4cc3ff"; x.fill(); x.fillStyle = "rgba(255,255,255,.6)"; x.fillRect(-36, -22, 72, 6); }
        else if (k === "bookcase") { rr(x, -36, -112, 72, 112, 4); x.fillStyle = cl; x.fill(); x.stroke(); for (let r = 0; r < 3; r++) { const y0 = -104 + r * 36; x.fillStyle = "rgba(0,0,0,.25)"; x.fillRect(-30, y0, 60, 30); for (let b = 0; b < 6; b++) { x.fillStyle = PAL[(b * 2 + r * 3) % 9]; x.fillRect(-28 + b * 9.5, y0 + 4 + (b % 2) * 3, 8, 26 - (b % 2) * 3); } } }
        else if (k === "table") { rr(x, -46, -48, 92, 10, 4); x.fillStyle = cl; x.fill(); x.stroke(); x.fillRect(-40, -38, 8, 38); x.fillRect(32, -38, 8, 38); cc(x, -10, -56, 8); x.fillStyle = "#fff"; x.fill(); x.stroke(); }
        else if (k === "lamp") { rr(x, -3, -86, 6, 86, 2); x.fillStyle = "#555"; x.fill(); rr(x, -16, -4, 32, 6, 3); x.fill(); x.beginPath(); x.moveTo(-18, -80); x.lineTo(18, -80); x.lineTo(11, -108); x.lineTo(-11, -108); x.closePath(); x.fillStyle = cl; x.fill(); x.stroke(); const gl = x.createRadialGradient(0, -80, 4, 0, -80, 60); gl.addColorStop(0, "rgba(255,240,150,.4)"); gl.addColorStop(1, "rgba(255,240,150,0)"); x.fillStyle = gl; x.fillRect(-60, -140, 120, 120); }
        else if (k === "frame") { rr(x, -28, -34, 56, 68, 4); x.fillStyle = cl; x.fill(); x.stroke(); rr(x, -22, -28, 44, 56, 2); x.fillStyle = "#bfe9ff"; x.fill(); x.beginPath(); x.moveTo(-22, 28); x.lineTo(-6, 4); x.lineTo(6, 18); x.lineTo(12, 8); x.lineTo(22, 28); x.closePath(); x.fillStyle = "#6be28f"; x.fill(); cc(x, 10, -14, 6); x.fillStyle = "#ffd34e"; x.fill(); }
        else if (k === "tank") { rr(x, -42, -64, 84, 54, 6); x.fillStyle = "rgba(120,200,255,.55)"; x.fill(); x.stroke(); rr(x, -46, -12, 92, 12, 3); x.fillStyle = "#555"; x.fill(); const fx = Math.sin(tt * 1.2) * 24; x.save(); x.translate(fx, -38 + Math.sin(tt * 2) * 4); x.scale(Math.cos(tt * 1.2) > 0 ? 1 : -1, 1); x.beginPath(); x.ellipse(0, 0, 10, 6, 0, 0, 7); x.moveTo(-8, 0); x.lineTo(-18, -6); x.lineTo(-18, 6); x.closePath(); x.fillStyle = "#ff8a2a"; x.fill(); x.restore(); for (let i = 0; i < 3; i++) { cc(x, -20 + i * 18, -20 - ((tt * 20 + i * 14) % 36), 2.5); x.strokeStyle = "rgba(255,255,255,.8)"; x.stroke(); } }
        else if (k === "bowl") { x.beginPath(); x.ellipse(0, -8, 20, 8, 0, 0, 7); x.fillStyle = "#b9803f"; x.fill(); x.beginPath(); x.moveTo(-22, -10); x.lineTo(22, -10); x.lineTo(16, 0); x.lineTo(-16, 0); x.closePath(); x.fillStyle = cl; x.fill(); x.stroke(); }
        else if (k === "cattree") { rr(x, -8, -118, 16, 118, 3); x.fillStyle = "#c9a36a"; x.fill(); x.stroke(); rr(x, -40, -58, 80, 10, 4); x.fillStyle = cl; x.fill(); x.stroke(); rr(x, -30, -108, 60, 10, 4); x.fill(); x.stroke(); rr(x, -40, -8, 80, 8, 4); x.fillStyle = "#c9a36a"; x.fill(); }
        else if (k === "clock") { cc(x, 0, 0, 24); x.fillStyle = cl; x.fill(); x.lineWidth = 4; x.strokeStyle = "#444"; x.stroke(); x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(tt * .5) * 12, Math.sin(tt * .5) * 12); x.moveTo(0, 0); x.lineTo(Math.cos(tt * 6) * 18, Math.sin(tt * 6) * 18); x.stroke(); }
        if (o === sel) { const b = box({ k, x: 0, y: 0, s: 1 }); x.setLineDash([6, 5]); x.lineWidth = 3; x.strokeStyle = "#fff"; x.strokeRect(b.x0 - 4, b.y0 - 4, b.x1 - b.x0 + 8, b.y1 - b.y0 + 8); x.setLineDash([]); }
        x.restore();
      };
      const drawPet = tt => {
        const hop = Math.sin(P.jump * Math.PI) * 30, sl = P.sleep > 0, bob = sl ? Math.sin(tt * 2) * 1.5 : (P.walk ? Math.abs(Math.sin(tt * (P.run ? 16 : 9))) * 4 : Math.sin(tt * 3) * 1);
        x.save(); x.translate(P.x, P.y - hop - bob); x.scale(P.f, 1); x.lineWidth = 2; x.lineJoin = "round"; x.lineCap = "round"; x.strokeStyle = "rgba(40,30,60,.5)";
        const COL = ["#c58a4a", "#ff9a4a", "#f4f4f8", "#e8c58a"][petT], DK = ["#7a4a22", "#c86a1a", "#c8c8d8", "#b8864a"][petT];
        x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(0, bob + hop, 28, 6, 0, 0, 7); x.fill();
        const lw = P.walk ? Math.sin(tt * (P.run ? 16 : 9)) * 6 : 0;
        x.strokeStyle = DK; x.lineWidth = 6; for (const lx of [-14, -6, 8, 16]) { x.beginPath(); x.moveTo(lx, -12); x.lineTo(lx + (lx > 0 ? lw : -lw), sl ? -4 : 0); x.stroke(); }
        const tw = Math.sin(tt * (P.run ? 14 : 5)) * 8;
        x.lineWidth = petT === 2 ? 1 : 6; if (petT === 2) { cc(x, -26, -22, 8); x.fillStyle = "#fff"; x.fill(); } else if (petT === 1) { x.beginPath(); x.moveTo(-20, -22); x.quadraticCurveTo(-40, -34 + tw, -34, -56); x.stroke(); } else if (petT === 0) { x.beginPath(); x.moveTo(-20, -24); x.lineTo(-34, -36 + tw); x.stroke(); }
        x.lineWidth = 2; x.strokeStyle = "rgba(40,30,60,.5)";
        x.beginPath(); x.ellipse(0, -22, petT === 3 ? 24 : 24, petT === 3 ? 18 : 14, 0, 0, 7); x.fillStyle = COL; x.fill(); x.stroke();
        const hx = sl ? 18 : 20, hy = sl ? -14 : -36;
        if (petT === 2) { for (const sx of [-6, 4]) { x.beginPath(); x.ellipse(hx + sx, hy - 24 + (sl ? 10 : 0), 5, 16, -.2, 0, 7); x.fillStyle = COL; x.fill(); x.stroke(); } }
        if (petT === 1) { for (const sx of [-8, 8]) { x.beginPath(); x.moveTo(hx + sx - 6, hy - 8); x.lineTo(hx + sx, hy - 24); x.lineTo(hx + sx + 6, hy - 8); x.closePath(); x.fillStyle = COL; x.fill(); x.stroke(); } }
        cc(x, hx, hy, petT === 3 ? 15 : 13); x.fillStyle = COL; x.fill(); x.stroke();
        if (petT === 0) { x.beginPath(); x.ellipse(hx - 9, hy - 2, 5, 11, .2, 0, 7); x.fillStyle = DK; x.fill(); x.stroke(); x.beginPath(); x.ellipse(hx + 12, hy + 5, 8, 6, 0, 0, 7); x.fillStyle = "#e8c8a0"; x.fill(); }
        if (petT === 3) { x.fillStyle = "rgba(255,150,150,.4)"; cc(x, hx + 6, hy + 5, 5); x.fill(); for (const sx of [-8, 8]) { cc(x, hx + sx, hy - 13, 5); x.fillStyle = DK; x.fill(); } }
        x.fillStyle = "#222"; if (sl) { x.fillRect(hx + 2, hy - 1, 8, 2); } else { cc(x, hx + 6, hy - 3, 2.6); x.fill(); }
        cc(x, hx + 12, hy + 2, 2.4); x.fillStyle = "#222"; x.fill();
        if (petT === 1) { x.lineWidth = 1; x.beginPath(); x.moveTo(hx + 10, hy + 3); x.lineTo(hx + 24, hy); x.moveTo(hx + 10, hy + 5); x.lineTo(hx + 24, hy + 8); x.stroke(); }
        x.restore();
        if (sl) { for (let i = 0; i < 3; i++) { const u = (tt * .6 + i * .33) % 1; x.globalAlpha = 1 - u; txt(x, "z", P.x + 30 + u * 20, P.y - 60 - u * 30, 12 + i * 4, "#fff"); } x.globalAlpha = 1; }
      };
      const stepPet = dt => {
        P.jump = Math.max(0, P.jump - dt * 2.2);
        if (P.sleep > 0) { P.sleep -= dt; P.walk = false; if (P.sleep <= 0) P.wait = .5; return; }
        const dx = P.tx - P.x, dy = P.ty - P.y, d = Math.hypot(dx, dy);
        if (d > 4) { const sp = (P.run ? 190 : 60) * dt; P.x += dx / d * Math.min(sp, d); P.y += dy / d * Math.min(sp, d); if (Math.abs(dx) > 3) P.f = dx > 0 ? 1 : -1; P.walk = true; return; }
        P.walk = false;
        if (P.goal === "sleep") { P.goal = null; P.sleep = g.rf(4, 7); return; }
        P.run = false; P.wait -= dt;
        if (P.wait <= 0) {
          P.wait = g.rf(1, 3); const r = Math.random(), spots = items.filter(o => ["bed", "rug", "sofa", "cattree"].indexOf(o.k) >= 0), others = items.filter(o => !DEFS[o.k].wall && !DEFS[o.k].flat);
          if (r < .3 && spots.length) { const o = g.pick(spots); P.tx = o.x; P.ty = g.clamp(o.y + (DEFS[o.k].ctr ? 0 : 6), WALL + 30, H - 12); P.goal = "sleep"; }
          else if (r < .55 && others.length) { const o = g.pick(others); P.tx = g.clamp(o.x + g.rf(-60, 60), 30, W - 30); P.ty = g.clamp(o.y + 8, WALL + 30, H - 12); }
          else { P.tx = g.rf(40, W - 40); P.ty = g.rf(WALL + 40, H - 14); }
        }
      };
      g.loop((dt, tt) => {
        t = tt; stepPet(dt);
        x.fillStyle = wallC; x.fillRect(0, 0, W, WALL);
        x.fillStyle = "rgba(255,255,255,.35)";
        if (wallP === 1) for (let i = 0; i < W; i += 40) x.fillRect(i, 0, 20, WALL);
        else if (wallP === 2) for (let i = 10; i < W; i += 36) for (let j = 10; j < WALL; j += 36) { cc(x, i + ((j / 36) % 2 ? 18 : 0), j, 5); x.fill(); }
        else if (wallP === 3) for (let i = 20; i < W; i += 56) for (let j = 20; j < WALL; j += 56) { st5(x, i + ((j / 56) % 2 ? 28 : 0), j, 9); x.fill(); }
        else if (wallP === 4) { x.strokeStyle = "rgba(255,255,255,.4)"; x.lineWidth = 3; for (let j = 14; j < WALL; j += 22) { x.beginPath(); for (let i = 0; i <= W; i += 10) x.lineTo(i, j + Math.sin(i * .1) * 4); x.stroke(); } }
        x.fillStyle = "rgba(0,0,0,.18)"; x.fillRect(0, WALL - 8, W, 8);
        const FL = [["#c98f5a", "#b97f4a"], ["#8fb8ff", "#7fa8f0"], ["#f4f0e8", "#cfd8e8"], ["#8ed081", "#7cc070"]][floorT];
        x.fillStyle = FL[0]; x.fillRect(0, WALL, W, H - WALL); x.strokeStyle = FL[1]; x.lineWidth = 3;
        if (floorT === 0) for (let j = WALL + 24; j < H; j += 24) { x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); }
        else if (floorT === 2) for (let i = 0; i < W; i += 50) for (let j = WALL; j < H; j += 50) if (((i + j) / 50) % 2 === 0) { x.fillStyle = FL[1]; x.fillRect(i, j, 50, 50); }
        else if (floorT === 3) for (let i = 0; i < 60; i++) { x.beginPath(); x.moveTo((i * 71) % W, WALL + (i * 37) % (H - WALL)); x.lineTo((i * 71) % W + 3, WALL + (i * 37) % (H - WALL) - 8); x.stroke(); }
        const flat = items.filter(o => DEFS[o.k].flat), wall = items.filter(o => DEFS[o.k].wall), rest = items.filter(o => !DEFS[o.k].flat && !DEFS[o.k].wall);
        flat.forEach(o => drawItem(o, t)); wall.forEach(o => drawItem(o, t));
        const objs = rest.map(o => ({ y: o.y, f: () => drawItem(o, t) })); objs.push({ y: P.y, f: () => drawPet(t) }); objs.sort((a, b) => a.y - b.y).forEach(q => q.f());
        drawParts(parts, x, dt);
        if (!items.length) txt(x, "Add furniture with the buttons below!", 320, 40, 20, "#6b4a20");
      });
    }
  });

  // ---- Story Scene Maker ----
  B.add({
    id: "s14-story", name: "Story Scene Maker", ages: [6, 20], cat: "Creative", color: "#ff9a5c", icon: "T",
    desc: "Pick a backdrop, add characters and props, give them speech lines and play your story.", controls: "Tap a button to add something, drag it into place, pick a line for characters, then press Play",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const BGN = ["Meadow", "Night", "Beach", "Castle", "Space", "Forest", "Snow"], NBG = g.by(4, 6, 7);
      const CH = ["knight", "wizard", "dragon", "robot", "fairy", "pirate", "alien", "cat"], NC = g.by(4, 6, 8);
      const PR = ["tree", "house", "boat", "star", "chest", "rocket", "campfire", "flag", "cloud", "moon", "mushroom"], NPR = g.by(5, 8, 11);
      const LINES = ["Hello, friend!", "Look over there!", "I found treasure!", "Oh no, a dragon!", "Let's go!", "That was funny!", "I am hungry!", "Follow me!", "Wow, so pretty!", "Watch this!", "Hooray!", "Where are we?", "I have a plan!", "Shhh, be quiet!", "Can you help me?", "The end!"], NL = g.by(6, 10, 16);
      const SZ = { knight: [50, 100], wizard: [50, 112], dragon: [70, 90], robot: [50, 96], fairy: [50, 100, 0], alien: [50, 96], pirate: [50, 100], cat: [50, 86], tree: [80, 110], house: [96, 96], boat: [110, 80], star: [44, 44, 1], chest: [60, 46], rocket: [50, 110], campfire: [54, 56], flag: [34, 80], cloud: [100, 56, 1], moon: [56, 56, 1], mushroom: [46, 46] };
      let bg = 0, items = [], sel = null, drag = null, walkMode = false, play = null, t = 0, parts = [];
      try { const d = g.load(); if (d) { bg = (d.bg | 0) % NBG; if (Array.isArray(d.items)) items = d.items.filter(o => o && SZ[o.k] && isFinite(o.x) && isFinite(o.y)).slice(0, 40).map(o => ({ k: o.k, x: +o.x, y: +o.y, ex: o.ex === undefined || o.ex === null ? null : +o.ex, ey: o.ey === undefined || o.ey === null ? null : +o.ey, line: Math.min((o.line | 0), NL - 1), c: String(o.c) })); } } catch (e) {}
      const isCh = o => CH.indexOf(o.k) >= 0, save = () => g.save({ bg, items: items.map(o => ({ k: o.k, x: o.x, y: o.y, ex: o.ex, ey: o.ey, line: o.line, c: o.c })) });
      const bbox = o => { const s = SZ[o.k], w = s[0], h = s[1]; return s[2] ? { x0: o.x - w / 2, x1: o.x + w / 2, y0: o.y - h / 2, y1: o.y + h / 2 } : { x0: o.x - w / 2, x1: o.x + w / 2, y0: o.y - h, y1: o.y }; };
      const add = k => {
        if (items.length >= 40) { g.sfx("back"); return; }
        const fl = SZ[k][2] === 1, o = { k, x: g.rf(130, 510), y: fl ? g.rf(60, 130) : g.rf(280, 350), ex: null, ey: null, line: -1, c: g.pick(PAL.slice(0, 9)) };
        if (k === "fairy") o.y = 250;
        items.push(o); sel = o; g.add(1); g.sfx("pop"); puff(parts, o.x, o.y - 30, 10, ["#fff", "#ffd34e"], 120, .6, 100, "s"); save(); upd();
      };
      g.on(c, "pointerdown", e => {
        if (play) return; const p = pos(e);
        if (walkMode && sel && isCh(sel)) { sel.ex = g.clamp(p.x, 20, W - 20); sel.ey = g.clamp(p.y, 200, 390); walkMode = false; g.sfx("tick"); save(); upd(); return; }
        const ord = items.slice().sort((a, b) => a.y - b.y); let hit = null;
        for (let i = ord.length - 1; i >= 0; i--) { const b = bbox(ord[i]); if (p.x >= b.x0 && p.x <= b.x1 && p.y >= b.y0 && p.y <= b.y1) { hit = ord[i]; break; } }
        sel = hit; upd(); if (hit) { drag = { dx: hit.x - p.x, dy: hit.y - p.y }; g.sfx("click"); c.setPointerCapture && (()=>{try{c.setPointerCapture(e.pointerId)}catch(_){}})(); }
      });
      g.on(c, "pointermove", e => { if (!drag || !sel) return; const p = pos(e), fl = SZ[sel.k][2] === 1; sel.x = g.clamp(p.x + drag.dx, 20, W - 20); sel.y = g.clamp(p.y + drag.dy, fl ? 30 : 180, 392); if (sel.ex !== null) { sel.ex = null; sel.ey = null; } });
      g.on(c, "pointerup", () => { if (drag) { drag = null; save(); g.sfx("thump"); } });
      bar(g, [["Backdrop", () => { bg = (bg + 1) % NBG; g.add(1); g.sfx("swish"); save(); }, "background:#b48cff;color:#1b1040"]].concat(CH.slice(0, NC).map(k => [k[0].toUpperCase() + k.slice(1), () => add(k)])));
      bar(g, PR.slice(0, NPR).map(k => [k[0].toUpperCase() + k.slice(1), () => add(k), "background:#6be28f;color:#10301a"]));
      const lineB = [], walkB = [];
      const ctl = [["Line: none", () => { if (!sel || !isCh(sel)) { g.sfx("back"); floatText(g, c, W, H, "Tap a character first", 320, 120, "#fff"); return; } sel.line = sel.line + 1 >= NL ? -1 : sel.line + 1; if (sel.line >= 0) g.add(1); g.sfx("click"); save(); upd(); }]];
      if (g.diff >= 1) ctl.push(["Walk to...", () => { if (sel && isCh(sel)) { walkMode = !walkMode; g.sfx("click"); upd(); } else g.sfx("back"); }]);
      ctl.push(["Play story", () => startPlay(), "background:#ffd34e;color:#3a2600;font-weight:bold"], ["Remove", () => { if (sel) { items = items.filter(o => o !== sel); sel = null; g.sfx("back"); save(); upd(); } }], ["Surprise me", () => {
        bg = g.ri(0, NBG - 1); items = []; const n = g.ri(3, 5); for (let i = 0; i < n; i++) { const k = g.pick(CH.slice(0, NC)); items.push({ k, x: 100 + i * 110 + g.rf(-20, 20), y: g.rf(290, 350), ex: g.ri(0, 1) && g.diff ? g.rf(100, 540) : null, ey: 320, line: g.ri(0, NL - 1), c: g.pick(PAL.slice(0, 9)) }); items.forEach(o => { if (o.ex === null) o.ey = null; }); }
        items.push({ k: g.pick(PR.slice(0, NPR).filter(k => SZ[k][2] !== 1)), x: g.rf(60, 580), y: 330, ex: null, ey: null, line: -1, c: "#ff4d6d" }); g.add(n); g.sfx("cheer"); save(); upd();
      }], ["Save picture", () => { const s = sel; sel = null; g.timeout(() => { g.saveImage(c, "my-story"); }, 30); g.timeout(() => { sel = s; }, 80); }], FINB(g));
      const cb = bar(g, ctl);
      const upd = () => { cb.bs[0].textContent = "Line: " + (sel && isCh(sel) && sel.line >= 0 ? sel.line + 1 : "none"); if (g.diff >= 1) cb.bs[1].style.outline = walkMode ? "3px solid #fff" : "none"; };
      const startPlay = () => {
        if (play) { play = null; cb.bs[g.diff >= 1 ? 2 : 1].textContent = "Play story"; return; }
        const sp = items.filter(o => isCh(o) && o.line >= 0); sel = null; walkMode = false; upd();
        play = { t: 0, sp, total: Math.max(4, sp.length * 2.4 + 1), last: -1 }; g.sfx("cheer"); cb.bs[g.diff >= 1 ? 2 : 1].textContent = "Stop";
      };
      const bgDraw = tt => {
        const gr = x.createLinearGradient(0, 0, 0, H);
        if (bg === 0) { gr.addColorStop(0, "#5ab8ff"); gr.addColorStop(.6, "#c8efff"); } else if (bg === 1) { gr.addColorStop(0, "#0b0f3a"); gr.addColorStop(1, "#33307a"); } else if (bg === 2) { gr.addColorStop(0, "#6ed0ff"); gr.addColorStop(1, "#bff0ff"); } else if (bg === 3) { gr.addColorStop(0, "#4a3b5e"); gr.addColorStop(1, "#7a6a8a"); } else if (bg === 4) { gr.addColorStop(0, "#04061a"); gr.addColorStop(1, "#1b1250"); } else if (bg === 5) { gr.addColorStop(0, "#7fd6a0"); gr.addColorStop(1, "#2f7f55"); } else { gr.addColorStop(0, "#9ab8e8"); gr.addColorStop(1, "#e8f2ff"); }
        x.fillStyle = gr; x.fillRect(0, 0, W, H);
        if (bg === 0) { cc(x, 540, 60, 30); x.fillStyle = "#fff3a0"; x.fill(); x.fillStyle = "#6bd36b"; x.beginPath(); x.moveTo(0, 250); x.quadraticCurveTo(160, 190, 340, 250); x.quadraticCurveTo(500, 290, 640, 220); x.lineTo(640, H); x.lineTo(0, H); x.fill(); x.fillStyle = "#4fbf5a"; x.fillRect(0, 290, W, H - 290); }
        else if (bg === 1 || bg === 4) { for (let i = 0; i < 40; i++) { x.fillStyle = "rgba(255,255,255," + (.4 + .4 * Math.sin(tt * 2 + i)) + ")"; x.fillRect((i * 79) % W, (i * 47) % 250, 2.5, 2.5); } if (bg === 1) { cc(x, 520, 70, 26); x.fillStyle = "#fff8c8"; x.fill(); x.fillStyle = "#1e3b5a"; x.beginPath(); x.moveTo(0, 260); x.quadraticCurveTo(200, 210, 400, 260); x.lineTo(640, 240); x.lineTo(640, H); x.lineTo(0, H); x.fill(); x.fillStyle = "#183048"; x.fillRect(0, 290, W, H - 290); } else { cc(x, 130, 110, 46); x.fillStyle = "#ff8a5a"; x.fill(); x.fillStyle = "rgba(0,0,0,.2)"; cc(x, 146, 100, 30); x.fill(); x.fillStyle = "#3a3a6a"; x.beginPath(); x.moveTo(0, 330); x.quadraticCurveTo(320, 280, 640, 330); x.lineTo(640, H); x.lineTo(0, H); x.fill(); } }
        else if (bg === 2) { cc(x, 90, 60, 28); x.fillStyle = "#fff3a0"; x.fill(); x.fillStyle = "#3ea6e8"; x.fillRect(0, 180, W, 90); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 3; for (let i = 0; i < 3; i++) { x.beginPath(); for (let px = 0; px <= W; px += 10) x.lineTo(px, 205 + i * 22 + Math.sin(px * .04 + tt * 2 + i) * 4); x.stroke(); } x.fillStyle = "#f0d9a0"; x.beginPath(); x.moveTo(0, 262); x.quadraticCurveTo(320, 240, 640, 262); x.lineTo(640, H); x.lineTo(0, H); x.fill(); }
        else if (bg === 3) { x.fillStyle = "#5a4a6e"; for (let i = 0; i < 8; i++) x.fillRect(i * 90 - 10, 0, 70, 280); x.fillStyle = "#222a55"; for (let i = 0; i < 3; i++) { rr(x, 90 + i * 200, 50, 60, 110, 30); x.fill(); } x.fillStyle = "#9a2a3a"; x.fillRect(0, 300, W, 100); x.fillStyle = "#c04a5a"; x.fillRect(200, 300, 240, 100); }
        else if (bg === 5) { for (let i = 0; i < 9; i++) { x.fillStyle = "#3d2a1a"; x.fillRect(i * 80 + 10, 40, 22, 300); x.fillStyle = "rgba(20,90,50,.6)"; cc(x, i * 80 + 21, 70 + (i % 3) * 30, 50); x.fill(); } x.fillStyle = "#2f7f45"; x.fillRect(0, 290, W, H - 290); }
        else { x.fillStyle = "#fff"; x.beginPath(); x.moveTo(0, 270); x.quadraticCurveTo(200, 220, 420, 270); x.quadraticCurveTo(540, 290, 640, 250); x.lineTo(640, H); x.lineTo(0, H); x.fill(); x.fillStyle = "#e4efff"; x.fillRect(0, 300, W, H - 300); x.fillStyle = "rgba(255,255,255,.9)"; for (let i = 0; i < 30; i++) { cc(x, (i * 53 + tt * 20) % W, (i * 31 + tt * 30) % H, 2.2); x.fill(); } }
      };
      const char = (k, col, tt, talk, hov) => {
        const bob = Math.sin(tt * 3 + col.length) * 1.5, tk = talk ? Math.abs(Math.sin(tt * 14)) : 0;
        x.lineWidth = 2; x.strokeStyle = "rgba(30,20,50,.5)"; x.lineJoin = "round";
        x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(0, 2, 24, 6, 0, 0, 7); x.fill();
        x.save(); x.translate(0, bob - (hov || 0));
        const eyes = (ey, sp, r) => { for (const sd of [-1, 1]) { cc(x, sd * sp, ey, r); x.fillStyle = "#fff"; x.fill(); x.stroke(); cc(x, sd * sp + 1, ey, r * .5); x.fillStyle = "#222"; x.fill(); } };
        const mouth = my => { x.beginPath(); x.ellipse(0, my, 4, 1.5 + tk * 4, 0, 0, 7); x.fillStyle = "#4a1230"; x.fill(); };
        const head = (hy, r, cl) => { cc(x, 0, hy, r); x.fillStyle = cl; x.fill(); x.stroke(); };
        if (k === "knight") { rr(x, -12, -16, 9, 16, 3); x.fillStyle = "#778"; x.fill(); rr(x, 3, -16, 9, 16, 3); x.fill(); rr(x, -17, -54, 34, 42, 8); x.fillStyle = col; x.fill(); x.stroke(); rr(x, 22, -64, 5, 46, 2); x.fillStyle = "#dfe6ef"; x.fill(); x.stroke(); head(-66, 15, "#b9c2d0"); rr(x, -11, -70, 22, 7, 3); x.fillStyle = "#222"; x.fill(); x.beginPath(); x.ellipse(0, -84, 5, 9, 0, 0, 7); x.fillStyle = "#ff4d6d"; x.fill(); if (talk) mouth(-58); }
        else if (k === "wizard") { x.beginPath(); x.moveTo(-20, 0); x.lineTo(20, 0); x.lineTo(11, -56); x.lineTo(-11, -56); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); head(-64, 12, "#f3c9a0"); x.beginPath(); x.moveTo(-9, -60); x.lineTo(9, -60); x.lineTo(0, -36); x.closePath(); x.fillStyle = "#fff"; x.fill(); x.beginPath(); x.moveTo(-18, -72); x.lineTo(18, -72); x.lineTo(6, -100); x.quadraticCurveTo(14, -108, 22, -104); x.lineTo(2, -104); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); st5(x, -2, -84, 5); x.fillStyle = "#ffd34e"; x.fill(); eyes(-66, 5, 2.5); x.strokeStyle = "#8b5a2b"; x.lineWidth = 3; x.beginPath(); x.moveTo(20, -20); x.lineTo(30, -56); x.stroke(); st5(x, 31, -60 + Math.sin(tt * 8) * 2, 6); x.fillStyle = "#ffd34e"; x.fill(); }
        else if (k === "dragon") { x.beginPath(); x.moveTo(-18, -14); x.quadraticCurveTo(-46, -10, -44, -36 + Math.sin(tt * 4) * 4); x.lineWidth = 8; x.strokeStyle = col; x.stroke(); x.lineWidth = 2; x.strokeStyle = "rgba(30,20,50,.5)"; const wf = Math.sin(tt * 5) * 8; x.beginPath(); x.moveTo(-6, -40); x.lineTo(-26, -72 - wf); x.lineTo(2, -58); x.closePath(); x.fillStyle = "#ffd34e"; x.fill(); x.stroke(); x.beginPath(); x.ellipse(0, -26, 26, 22, 0, 0, 7); x.fillStyle = col; x.fill(); x.stroke(); x.beginPath(); x.ellipse(4, -18, 14, 14, 0, 0, 7); x.fillStyle = "#ffe9a0"; x.fill(); head(-52, 15, col); x.beginPath(); x.ellipse(14, -48, 11, 8, 0, 0, 7); x.fillStyle = col; x.fill(); x.stroke(); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 8 - 4, -64); x.lineTo(sd * 8, -76); x.lineTo(sd * 8 + 4, -64); x.fillStyle = "#fff"; x.fill(); } cc(x, 4, -56, 4); x.fillStyle = "#fff"; x.fill(); cc(x, 5, -56, 2); x.fillStyle = "#222"; x.fill(); if (talk) { x.beginPath(); x.moveTo(24, -48); x.lineTo(40, -52 - tk * 4); x.lineTo(40, -42 + tk * 4); x.closePath(); x.fillStyle = "#ff9a2a"; x.fill(); } }
        else if (k === "robot") { rr(x, -12, -16, 9, 16, 3); x.fillStyle = "#99a"; x.fill(); rr(x, 3, -16, 9, 16, 3); x.fill(); rr(x, -18, -54, 36, 40, 6); x.fillStyle = col; x.fill(); x.stroke(); cc(x, 0, -34, 5); x.fillStyle = Math.sin(tt * 4) > 0 ? "#ffee66" : "#ff5a5a"; x.fill(); rr(x, -15, -82, 30, 26, 6); x.fillStyle = "#c9d2e0"; x.fill(); x.stroke(); x.fillStyle = "#27304f"; x.fillRect(-9, -74, 7, 7); x.fillRect(2, -74, 7, 7); x.beginPath(); x.moveTo(0, -82); x.lineTo(0, -94); x.stroke(); cc(x, 0, -96, 3); x.fillStyle = "#ff4d6d"; x.fill(); x.fillStyle = "#27304f"; x.fillRect(-6, -62, 12, 2 + tk * 4); }
        else if (k === "fairy") { const wf = Math.sin(tt * 18) * .35; x.save(); x.translate(0, -20 + Math.sin(tt * 3) * 3); for (const sd of [-1, 1]) { x.save(); x.translate(sd * 8, -38); x.rotate(sd * (.5 + wf)); x.beginPath(); x.ellipse(sd * 14, -4, 16, 8, 0, 0, 7); x.fillStyle = "rgba(200,240,255,.7)"; x.fill(); x.stroke(); x.restore(); } x.beginPath(); x.moveTo(-14, -2); x.lineTo(14, -2); x.lineTo(5, -40); x.lineTo(-5, -40); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); cc(x, 0, -54, 12); x.fillStyle = "#ffd34e"; x.fill(); head(-50, 10, "#f3c9a0"); eyes(-50, 4, 2); mouth(-44); x.strokeStyle = "#8b5a2b"; x.lineWidth = 2; x.beginPath(); x.moveTo(12, -24); x.lineTo(26, -44); x.stroke(); st5(x, 28, -48, 6); x.fillStyle = "#fff6a0"; x.fill(); x.restore(); }
        else if (k === "pirate") { rr(x, -12, -16, 9, 16, 3); x.fillStyle = "#4a3a2a"; x.fill(); rr(x, 3, -16, 9, 16, 3); x.fill(); rr(x, -16, -52, 32, 40, 6); x.fillStyle = "#fff"; x.fill(); x.stroke(); x.fillStyle = col; for (let i = 0; i < 4; i++) x.fillRect(-16, -48 + i * 10, 32, 4); head(-64, 14, "#f3c9a0"); eyes(-65, 6, 3); x.fillStyle = "#222"; cc(x, 6, -65, 4.5); x.fill(); x.lineWidth = 2; x.beginPath(); x.moveTo(-14, -72); x.lineTo(14, -60); x.stroke(); mouth(-57); x.beginPath(); x.moveTo(-20, -74); x.lineTo(20, -74); x.lineTo(0, -96); x.closePath(); x.fillStyle = "#222"; x.fill(); rr(x, -22, -77, 44, 6, 3); x.fill(); }
        else if (k === "alien") { x.beginPath(); x.ellipse(0, -26, 15, 24, 0, 0, 7); x.fillStyle = col; x.fill(); x.stroke(); x.beginPath(); x.ellipse(0, -62, 20, 18, 0, 0, 7); x.fillStyle = col; x.fill(); x.stroke(); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 8, -76); x.lineTo(sd * 14, -92 + Math.sin(tt * 4 + sd) * 2); x.stroke(); cc(x, sd * 14, -94 + Math.sin(tt * 4 + sd) * 2, 4); x.fillStyle = "#ffd34e"; x.fill(); } eyes(-64, 8, 5); cc(x, 0, -60, 4); x.fillStyle = "#fff"; x.fill(); mouth(-52); }
        else if (k === "cat") { x.beginPath(); x.moveTo(-14, -12); x.quadraticCurveTo(-40, -10 + Math.sin(tt * 4) * 8, -34, -46); x.lineWidth = 7; x.strokeStyle = col; x.stroke(); x.lineWidth = 2; x.strokeStyle = "rgba(30,20,50,.5)"; x.beginPath(); x.ellipse(0, -22, 17, 20, 0, 0, 7); x.fillStyle = col; x.fill(); x.stroke(); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 14, -62); x.lineTo(sd * 12, -80); x.lineTo(sd * 2, -66); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); } head(-54, 15, col); eyes(-56, 6, 3.5); x.beginPath(); x.moveTo(-3, -50); x.lineTo(3, -50); x.lineTo(0, -46); x.fillStyle = "#ff8fa3"; x.fill(); x.lineWidth = 1; x.beginPath(); x.moveTo(8, -48); x.lineTo(22, -52); x.moveTo(8, -46); x.lineTo(22, -44); x.moveTo(-8, -48); x.lineTo(-22, -52); x.moveTo(-8, -46); x.lineTo(-22, -44); x.stroke(); if (talk) mouth(-42); }
        x.restore();
      };
      const prop = (k, col, tt) => {
        x.lineWidth = 2; x.strokeStyle = "rgba(30,20,50,.45)"; x.lineJoin = "round";
        if (k === "tree") { x.fillStyle = "#7a4a22"; x.fillRect(-8, -50, 16, 50); for (const p of [[0, -80, 34], [-22, -58, 24], [22, -58, 24]]) { cc(x, p[0] + Math.sin(tt) * 1, p[1], p[2]); x.fillStyle = "#3cb371"; x.fill(); x.stroke(); } }
        else if (k === "house") { rr(x, -40, -56, 80, 56, 3); x.fillStyle = "#f3e2c0"; x.fill(); x.stroke(); x.beginPath(); x.moveTo(-50, -54); x.lineTo(50, -54); x.lineTo(0, -96); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); rr(x, -8, -32, 18, 32, 3); x.fillStyle = "#7a4a22"; x.fill(); rr(x, -34, -42, 18, 16, 2); x.fillStyle = "#9ad8ff"; x.fill(); x.stroke(); rr(x, 18, -42, 18, 16, 2); x.fill(); x.stroke(); }
        else if (k === "boat") { x.save(); x.rotate(Math.sin(tt * 1.5) * .05); x.beginPath(); x.moveTo(-50, -26); x.lineTo(50, -26); x.lineTo(34, 0); x.lineTo(-34, 0); x.closePath(); x.fillStyle = "#a5703d"; x.fill(); x.stroke(); x.fillStyle = "#6b4226"; x.fillRect(-2, -80, 4, 56); x.beginPath(); x.moveTo(4, -78); x.lineTo(44, -34); x.lineTo(4, -34); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); x.restore(); }
        else if (k === "star") { st5(x, 0, 0, 20 + Math.sin(tt * 3) * 2); x.fillStyle = "#ffd34e"; x.fill(); x.stroke(); }
        else if (k === "chest") { rr(x, -28, -28, 56, 28, 4); x.fillStyle = "#a5703d"; x.fill(); x.stroke(); x.beginPath(); x.moveTo(-28, -28); x.quadraticCurveTo(0, -52, 28, -28); x.closePath(); x.fillStyle = "#8a5a2d"; x.fill(); x.stroke(); rr(x, -5, -32, 10, 12, 2); x.fillStyle = "#ffd34e"; x.fill(); for (let i = 0; i < 3; i++) { st5(x, -12 + i * 12, -46 - ((tt * 20 + i * 9) % 14), 3); x.fillStyle = "rgba(255,230,100," + (.5 + .5 * Math.sin(tt * 6 + i)) + ")"; x.fill(); } }
        else if (k === "rocket") { x.beginPath(); x.moveTo(0, -110); x.quadraticCurveTo(26, -70, 18, -20); x.lineTo(-18, -20); x.quadraticCurveTo(-26, -70, 0, -110); x.fillStyle = "#e8eef8"; x.fill(); x.stroke(); cc(x, 0, -70, 9); x.fillStyle = "#4cc3ff"; x.fill(); x.stroke(); x.beginPath(); x.moveTo(-18, -34); x.lineTo(-32, -10); x.lineTo(-18, -20); x.fillStyle = col; x.fill(); x.stroke(); x.beginPath(); x.moveTo(18, -34); x.lineTo(32, -10); x.lineTo(18, -20); x.fill(); x.stroke(); x.beginPath(); x.moveTo(-10, -20); x.lineTo(10, -20); x.lineTo(0, -4 + Math.random() * 10); x.fillStyle = "#ffb02e"; x.fill(); }
        else if (k === "campfire") { x.strokeStyle = "#6b4226"; x.lineWidth = 7; x.lineCap = "round"; x.beginPath(); x.moveTo(-20, -2); x.lineTo(18, -14); x.moveTo(20, -2); x.lineTo(-18, -14); x.stroke(); x.lineCap = "butt"; for (let i = 0; i < 3; i++) { const fh = 26 + Math.sin(tt * 10 + i * 2) * 6 - i * 6; x.beginPath(); x.moveTo(-10 + i * 4, -10); x.quadraticCurveTo(i * 8 - 8, -10 - fh, 0 + i * 3, -10 - fh - 10); x.quadraticCurveTo(10, -10 - fh / 2, 10 - i * 4, -10); x.fillStyle = ["#ff5a2a", "#ff9a2a", "#ffe066"][i]; x.fill(); } }
        else if (k === "flag") { x.strokeStyle = "#6b4226"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -80); x.stroke(); x.beginPath(); x.moveTo(0, -80); x.lineTo(30 + Math.sin(tt * 5) * 3, -70 + Math.sin(tt * 5 + 1) * 3); x.lineTo(0, -56); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); }
        else if (k === "cloud") { x.fillStyle = "#fff"; x.beginPath(); for (const p of [[-26, 4, 16], [-8, -8, 20], [14, -4, 18], [30, 6, 13]]) { x.moveTo(p[0] + p[2], p[1]); x.arc(p[0], p[1], p[2], 0, 7); } x.fill(); }
        else if (k === "moon") { cc(x, 0, 0, 24); x.fillStyle = "#fff8c8"; x.fill(); x.fillStyle = "rgba(0,0,0,.08)"; cc(x, -6, -4, 6); x.fill(); cc(x, 8, 8, 4); x.fill(); }
        else if (k === "mushroom") { x.fillStyle = "#f3e2c0"; rr(x, -7, -22, 14, 22, 4); x.fill(); x.stroke(); x.beginPath(); x.arc(0, -20, 22, Math.PI, 0); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); x.fillStyle = "#fff"; cc(x, -8, -28, 4); x.fill(); cc(x, 8, -26, 3); x.fill(); }
      };
      const bubble = (px, py, s) => {
        x.font = "bold 15px system-ui, sans-serif"; const w = x.measureText(s).width + 22, bx = g.clamp(px - w / 2, 4, W - w - 4);
        rr(x, bx, py - 20, w, 32, 12); x.fillStyle = "#fff"; x.fill(); x.lineWidth = 2; x.strokeStyle = "#333"; x.stroke();
        x.beginPath(); x.moveTo(px - 6, py + 11); x.lineTo(px, py + 22); x.lineTo(px + 8, py + 11); x.fillStyle = "#fff"; x.fill(); x.fillStyle = "#222"; x.textAlign = "center"; x.fillText(s, bx + w / 2, py + 1);
      };
      const posOf = o => { if (play && isCh(o) && o.ex !== null) { const u = ease(play.t / play.total); return { x: g.lerp(o.x, o.ex, u), y: g.lerp(o.y, o.ey, u), mv: play.t < play.total }; } return { x: o.x, y: o.y, mv: false }; };
      g.loop((dt, tt) => {
        t = tt; bgDraw(t);
        if (play) {
          play.t += dt; const slot = Math.floor((play.t - .3) / 2.4);
          if (slot !== play.last && slot >= 0 && slot < play.sp.length) { play.last = slot; g.sfx("note", 330 + slot * 60); }
          if (play.t > play.total + 1) { play = null; g.add(5); g.sfx("finish"); cb.bs[g.diff >= 1 ? 2 : 1].textContent = "Play story"; floatText(g, c, W, H, "The End", 320, 150, "#ffd34e"); }
        }
        const ord = items.slice().sort((a, b) => posOf(a).y - posOf(b).y);
        ord.forEach(o => {
          const p = posOf(o); x.save(); x.translate(p.x, p.y);
          if (o.ex !== null && !play && isCh(o)) { x.restore(); x.save(); x.setLineDash([6, 6]); x.strokeStyle = "rgba(255,255,255,.8)"; x.lineWidth = 3; x.beginPath(); x.moveTo(o.x, o.y); x.lineTo(o.ex, o.ey); x.stroke(); x.setLineDash([]); cc(x, o.ex, o.ey, 7); x.fillStyle = "#ffd34e"; x.fill(); x.restore(); x.save(); x.translate(p.x, p.y); }
          if (isCh(o)) { const ix = play ? play.sp.indexOf(o) : -1, talk = ix >= 0 && play.t > ix * 2.4 + .3 && play.t < ix * 2.4 + 2.7; if (p.mv) x.translate(0, -Math.abs(Math.sin(t * 10)) * 4); char(o.k, o.c, t, talk); } else prop(o.k, o.c, t);
          if (o === sel) { const b = bbox({ k: o.k, x: 0, y: 0 }); x.setLineDash([6, 5]); x.lineWidth = 3; x.strokeStyle = "#fff"; x.strokeRect(b.x0 - 4, b.y0 - 4, b.x1 - b.x0 + 8, b.y1 - b.y0 + 8); x.setLineDash([]); }
          x.restore();
        });
        ord.forEach(o => {
          if (!isCh(o) || o.line < 0) return; const p = posOf(o), h = SZ[o.k][1];
          if (play) { const ix = play.sp.indexOf(o); if (ix >= 0 && play.t > ix * 2.4 + .3 && play.t < ix * 2.4 + 2.7) bubble(p.x, p.y - h - 22, LINES[o.line]); }
          else if (o === sel) bubble(p.x, p.y - h - 22, LINES[o.line]);
        });
        drawParts(parts, x, dt);
        if (play) txt(x, "Playing...", 60, 24, 14, "#fff");
        else if (!items.length) txt(x, "Add characters and props, then press Play story!", 320, 60, 18, "#fff");
        else if (walkMode) txt(x, "Tap where the character should walk to", 320, 30, 16, "#ffd34e");
      });
    }
  });

  // ---- Physics Sandbox ----
  B.add({
    id: "s14-physics", name: "Tiny Physics Sandbox", ages: [9, 20], cat: "Build", color: "#ffb02e", icon: "Px",
    desc: "Place balls, blocks, wheels, rods and springs, then press Run to see what happens.", controls: "Pick a tool and tap to place. Ramps: drag a line. Rod/Spring: tap two parts. Press Run!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const GY = H - 30, TL = [["ball", "Ball"], ["big", "Big ball"], ["block", "Block"], ["plank", "Ramp"], ["erase", "Erase"], ["wheel", "Wheel"], ["rod", "Rod"], ["spring", "Spring"], ["balloon", "Balloon"], ["motor", "Motor wheel"], ["pad", "Bouncy pad"]], NT = g.by(5, 8, 11), CAPB = g.by(10, 16, 24);
      const GRS = [["Earth", 900], ["Moon", 330], ["Heavy", 1600]];
      let bodies = [], links = [], planks = [], uid = 1, run = false, tool = "ball", pend = null, ds = null, gi = 0, t = 0, parts = [], mdir = 1;
      const part = (px, py, r, inv, b) => ({ x: px, y: py, px, py, r, inv, b, sx: px, sy: py, ang: 0 });
      const make = (ty, X, Y, id) => {
        const b = { id: id || uid++, t: ty, ps: [], cons: [], ox: X, oy: Y, motor: ty === "motor" };
        if (ty === "ball" || ty === "big") b.ps.push(part(X, Y, ty === "ball" ? 14 : 24, ty === "ball" ? 1 : 3, b));
        else if (ty === "balloon") { const p = part(X, Y, 16, 1, b); p.lift = true; b.ps.push(p); }
        else if (ty === "block") {
          for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) b.ps.push(part(X + (i - 1) * 16, Y + (j - 1) * 16, 8, 1, b));
          for (let i = 0; i < 9; i++) for (let j = i + 1; j < 9; j++) { const d = Math.hypot(b.ps[i].x - b.ps[j].x, b.ps[i].y - b.ps[j].y); if (d < 24) b.cons.push({ a: b.ps[i], b: b.ps[j], len: d, k: 1 }); }
        } else if (ty === "wheel" || ty === "motor") {
          const R = 24, hub = part(X, Y, 5, 1, b); b.ps.push(hub);
          for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; b.ps.push(part(X + Math.cos(a) * R, Y + Math.sin(a) * R, 4, 1, b)); }
          for (let i = 1; i <= 10; i++) { const n = i % 10 + 1, n2 = (i + 1) % 10 + 1; b.cons.push({ a: hub, b: b.ps[i], len: R, k: 1 }, { a: b.ps[i], b: b.ps[n], len: 2 * R * Math.sin(Math.PI / 10), k: 1 }, { a: b.ps[i], b: b.ps[n2], len: 2 * R * Math.sin(Math.PI / 5), k: 1 }); }
        }
        bodies.push(b); return b;
      };
      const save = () => g.save({ uid, bodies: bodies.map(b => ({ id: b.id, t: b.t, x: b.ox, y: b.oy })), links: links.map(l => ({ a: l.a.b.id, pa: l.a.b.ps.indexOf(l.a), b: l.b.b.id, pb: l.b.b.ps.indexOf(l.b), k: l.k })), planks });
      try {
        const d = g.load();
        if (d && Array.isArray(d.bodies)) {
          d.bodies.slice(0, CAPB).forEach(o => { if (o && ["ball", "big", "block", "wheel", "motor", "balloon"].indexOf(o.t) >= 0 && isFinite(o.x) && isFinite(o.y)) make(o.t, +o.x, +o.y, o.id | 0); });
          uid = Math.max(d.uid | 0, bodies.reduce((m, b) => Math.max(m, b.id), 0) + 1);
          (d.links || []).forEach(l => { const A = bodies.find(b => b.id === l.a), Bb = bodies.find(b => b.id === l.b); if (A && Bb && A.ps[l.pa] && Bb.ps[l.pb]) { const p = A.ps[l.pa], q = Bb.ps[l.pb]; links.push({ a: p, b: q, len: Math.hypot(p.x - q.x, p.y - q.y), k: l.k === 1 ? 1 : .08 }); } });
          (d.planks || []).slice(0, 30).forEach(p => { if (Array.isArray(p) && p.length >= 4 && p.slice(0, 4).every(isFinite)) planks.push([+p[0], +p[1], +p[2], +p[3], p[4] ? 1 : 0]); });
        }
      } catch (e) {}
      const allP = () => { const a = []; bodies.forEach(b => b.ps.forEach(p => a.push(p))); return a; };
      const nearest = p => { let best = null, bd = 36; allP().forEach(q => { const d = Math.hypot(q.x - p.x, q.y - p.y) - (q.b.ps[0] === q && q.b.ps.length > 1 ? 10 : 0); if (d < bd) { bd = d; best = q; } }); return best; };
      const removeBody = b => { bodies = bodies.filter(o => o !== b); links = links.filter(l => l.a.b !== b && l.b.b !== b); };
      const segDist = (px, py, s) => { const dx = s[2] - s[0], dy = s[3] - s[1], L2 = dx * dx + dy * dy || 1, u = g.clamp(((px - s[0]) * dx + (py - s[1]) * dy) / L2, 0, 1), cx = s[0] + dx * u, cy = s[1] + dy * u; return { d: Math.hypot(px - cx, py - cy), cx, cy }; };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        if (tool === "plank" || tool === "pad") { ds = { x: p.x, y: p.y, cx: p.x, cy: p.y }; return; }
        if (tool === "erase") { let did = false; const q = nearest(p); if (q) { removeBody(q.b); did = true; } else { const k = planks.findIndex(s => segDist(p.x, p.y, s).d < 14); if (k >= 0) { planks.splice(k, 1); did = true; } } if (did) { g.sfx("back"); save(); } return; }
        if (tool === "rod" || tool === "spring") {
          const q = nearest(p); if (!q) { pend = null; g.sfx("back"); return; }
          if (!pend) { pend = q; g.sfx("pick"); return; }
          if (pend.b === q.b) { pend = null; g.sfx("back"); return; }
          links.push({ a: pend, b: q, len: Math.hypot(pend.x - q.x, pend.y - q.y), k: tool === "rod" ? 1 : .08 }); pend = null; g.add(1); g.sfx("clink"); save(); return;
        }
        if (bodies.length >= CAPB) { g.sfx("back"); floatText(g, c, W, H, "Too many things!", p.x, p.y - 20, "#fff"); return; }
        const b = make(tool, g.clamp(p.x, 30, W - 30), g.clamp(p.y, 30, GY - 30)); b.ps.forEach(q => { q.sx = q.x; q.sy = q.y; }); g.add(1); g.sfx("pop"); puff(parts, b.ps[0].x, b.ps[0].y, 8, ["#fff", "#ffd34e"], 100, .5, 100); save();
      });
      g.on(c, "pointermove", e => { if (ds) { const p = pos(e); ds.cx = p.x; ds.cy = p.y; } });
      g.on(c, "pointerup", () => { if (ds) { if (Math.hypot(ds.cx - ds.x, ds.cy - ds.y) > 30 && planks.length < 30) { planks.push([ds.x, ds.y, ds.cx, ds.cy, tool === "pad" ? 1 : 0]); g.add(1); g.sfx("thump"); save(); } else g.sfx("back"); ds = null; } });
      const tb = bar(g, TL.slice(0, NT).map(q => [q[1], () => { tool = q[0]; pend = null; g.sfx("click"); mk(); }]));
      const mk = () => tb.bs.forEach((b, i) => { b.style.outline = TL[i][0] === tool ? "3px solid #fff" : "none"; });
      mk();
      const stop = () => { run = false; allP().forEach(p => { p.x = p.px = p.sx; p.y = p.py = p.sy; p.ang = 0; }); rb.textContent = "Run!"; };
      const rb = bar(g, [["Run!", b => { if (run) { stop(); g.sfx("back"); return; } allP().forEach(p => { p.sx = p.x; p.sy = p.y; p.px = p.x; p.py = p.y; }); run = true; b.textContent = "Reset"; g.sfx("launch"); }, "background:#6be28f;color:#10301a;font-weight:bold"]]).bs[0];
      const acts = [["Clear all", () => { bodies = []; links = []; planks = []; pend = null; run = false; rb.textContent = "Run!"; g.sfx("swish"); save(); }], ["Save picture", () => g.saveImage(c, "my-contraption")], FINB(g)];
      if (g.diff >= 1) acts.unshift(["Gravity: Earth", b => { gi = (gi + 1) % 3; b.textContent = "Gravity: " + GRS[gi][0]; g.sfx("click"); }]);
      if (g.diff >= 2) acts.unshift(["Motor: forward", b => { mdir = -mdir; b.textContent = "Motor: " + (mdir > 0 ? "forward" : "back"); g.sfx("click"); }]);
      bar(g, acts);
      const SUB = 3, h2 = 1 / (60 * SUB) / (60 * SUB) * 3600;
      const hit = (p, nx, ny, pen, rest, fr) => {
        p.x += nx * pen; p.y += ny * pen; let vx = p.x - p.px - nx * pen, vy = p.y - p.py - ny * pen; const vn = vx * nx + vy * ny;
        if (vn < 0) { vx -= (1 + rest) * vn * nx; vy -= (1 + rest) * vn * ny; const tx = -ny, ty = nx, vt = vx * tx + vy * ty; vx -= vt * (1 - fr) * tx; vy -= vt * (1 - fr) * ty; }
        p.px = p.x - vx; p.py = p.y - vy;
      };
      const stepSim = () => {
        const G = GRS[gi][1], ps = allP(), acc = G / (60 * SUB * 60 * SUB);
        for (const p of ps) { let vx = (p.x - p.px) * .9995, vy = (p.y - p.py) * .9995; const sp = Math.hypot(vx, vy); if (sp > 11) { vx *= 11 / sp; vy *= 11 / sp; } p.ang += vx / p.r; p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + (p.lift ? -acc * .35 : acc); }
        for (const b of bodies) if (b.motor) { const hb = b.ps[0], m = 2600 / (60 * SUB * 60 * SUB) * mdir; for (let i = 1; i < b.ps.length; i++) { const q = b.ps[i], rx = q.x - hb.x, ry = q.y - hb.y, L = Math.hypot(rx, ry) || 1; q.x += -ry / L * m; q.y += rx / L * m; } }
        for (let it = 0; it < 3; it++) {
          const cons = links.concat(...bodies.map(b => b.cons));
          for (const k of cons) { const dx = k.b.x - k.a.x, dy = k.b.y - k.a.y, d = Math.hypot(dx, dy) || .001, df = (d - k.len) / d * k.k, w = k.a.inv + k.b.inv; if (!w) continue; k.a.x += dx * df * k.a.inv / w; k.a.y += dy * df * k.a.inv / w; k.b.x -= dx * df * k.b.inv / w; k.b.y -= dy * df * k.b.inv / w; }
        }
        for (const p of ps) {
          if (p.y + p.r > GY) hit(p, 0, -1, p.y + p.r - GY, .25, .35);
          if (p.x - p.r < 0) hit(p, 1, 0, p.r - p.x, .3, .05); if (p.x + p.r > W) hit(p, -1, 0, p.x + p.r - W, .3, .05);
          for (const s of planks) { const q = segDist(p.x, p.y, s), need = p.r + 4; if (q.d < need && q.d > .0001) hit(p, (p.x - q.cx) / q.d, (p.y - q.cy) / q.d, need - q.d, s[4] ? 1.15 : .3, s[4] ? .9 : .3); }
        }
        for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i], b = ps[j]; if (a.b === b.b) continue; const dx = b.x - a.x, dy = b.y - a.y, rr2 = a.r + b.r; if (Math.abs(dx) > rr2 || Math.abs(dy) > rr2) continue; const d = Math.hypot(dx, dy); if (d >= rr2 || d < .0001) continue;
          const pen = (rr2 - d), w = a.inv + b.inv, nx = dx / d, ny = dy / d; a.x -= nx * pen * a.inv / w; a.y -= ny * pen * a.inv / w; b.x += nx * pen * b.inv / w; b.y += ny * pen * b.inv / w;
        }
      };
      const COLS = { ball: "#ff4d6d", big: "#7b6cff", balloon: "#ff6fb5" };
      g.loop((dt, tt) => {
        t = tt; if (run) for (let s = 0; s < SUB; s++) stepSim();
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#7fd0ff"); gr.addColorStop(1, "#d9f3ff"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "#5ccf6b"; x.fillRect(0, GY, W, H - GY); x.fillStyle = "#3fae52"; x.fillRect(0, GY, W, 6);
        for (const s of planks) { x.lineCap = "round"; x.lineWidth = 12; x.strokeStyle = s[4] ? "#ff6fb5" : "#8a5a2d"; x.beginPath(); x.moveTo(s[0], s[1]); x.lineTo(s[2], s[3]); x.stroke(); x.lineWidth = 4; x.strokeStyle = s[4] ? "#ffd1e6" : "#b98a55"; x.stroke(); }
        for (const l of links) {
          x.lineCap = "round";
          if (l.k === 1) { x.lineWidth = 5; x.strokeStyle = "#555e70"; x.beginPath(); x.moveTo(l.a.x, l.a.y); x.lineTo(l.b.x, l.b.y); x.stroke(); }
          else { const dx = l.b.x - l.a.x, dy = l.b.y - l.a.y, d = Math.hypot(dx, dy) || 1, nx = -dy / d, ny = dx / d; x.lineWidth = 3; x.strokeStyle = "#e0407a"; x.beginPath(); x.moveTo(l.a.x, l.a.y); for (let i = 1; i < 12; i++) { const u = i / 12, off = (i % 2 ? 1 : -1) * 7; x.lineTo(l.a.x + dx * u + nx * off, l.a.y + dy * u + ny * off); } x.lineTo(l.b.x, l.b.y); x.stroke(); }
        }
        x.lineCap = "butt";
        for (const b of bodies) {
          x.lineWidth = 2; x.strokeStyle = "rgba(30,30,60,.55)";
          if (b.t === "ball" || b.t === "big") { const p = b.ps[0]; cc(x, p.x, p.y, p.r); x.fillStyle = COLS[b.t]; x.fill(); x.stroke(); x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(p.x + Math.cos(p.ang) * p.r * .8, p.y + Math.sin(p.ang) * p.r * .8); x.stroke(); cc(x, p.x - p.r * .35, p.y - p.r * .35, p.r * .2); x.fillStyle = "rgba(255,255,255,.55)"; x.fill(); }
          else if (b.t === "balloon") { const p = b.ps[0]; x.strokeStyle = "#666"; x.beginPath(); x.moveTo(p.x, p.y + p.r); x.lineTo(p.x + Math.sin(t * 3) * 3, p.y + p.r + 22); x.stroke(); x.beginPath(); x.ellipse(p.x, p.y, p.r * .85, p.r, 0, 0, 7); x.fillStyle = COLS.balloon; x.fill(); x.strokeStyle = "rgba(30,30,60,.55)"; x.stroke(); cc(x, p.x - 5, p.y - 6, 3); x.fillStyle = "rgba(255,255,255,.6)"; x.fill(); }
          else if (b.t === "block") { const a = b.ps[0], d = b.ps[2], m = b.ps[4], ang = Math.atan2(d.y - a.y, d.x - a.x); x.save(); x.translate(m.x, m.y); x.rotate(ang); rr(x, -24, -24, 48, 48, 6); x.fillStyle = "#ffb02e"; x.fill(); x.stroke(); x.strokeStyle = "rgba(120,60,0,.4)"; x.beginPath(); x.moveTo(-24, -24); x.lineTo(24, 24); x.moveTo(24, -24); x.lineTo(-24, 24); x.stroke(); x.restore(); }
          else { const hb = b.ps[0]; x.lineWidth = 4; cc(x, hb.x, hb.y, 27); x.fillStyle = b.motor ? "#ffd34e" : "#9aa5b8"; x.fill(); x.stroke(); cc(x, hb.x, hb.y, 18); x.fillStyle = b.motor ? "#ffea99" : "#c9d2e0"; x.fill(); x.lineWidth = 3; x.beginPath(); for (let i = 1; i < b.ps.length; i += 2) { x.moveTo(hb.x, hb.y); x.lineTo(b.ps[i].x, b.ps[i].y); } x.stroke(); cc(x, hb.x, hb.y, 5); x.fillStyle = "#333"; x.fill(); if (b.motor) txt(x, "M", hb.x, hb.y - 28, 12, "#fff"); }
        }
        if (pend) { cc(x, pend.x, pend.y, 12 + Math.sin(t * 8) * 2); x.lineWidth = 3; x.strokeStyle = "#fff"; x.stroke(); }
        if (ds) { x.lineWidth = 6; x.strokeStyle = "rgba(255,255,255,.8)"; x.setLineDash([8, 6]); x.beginPath(); x.moveTo(ds.x, ds.y); x.lineTo(ds.cx, ds.cy); x.stroke(); x.setLineDash([]); }
        drawParts(parts, x, dt);
        if (!bodies.length && !planks.length) txt(x, "Tap to place things, then press Run!", 320, 60, 20, "#245");
        else if (!run) txt(x, "Build mode: press Run!", 100, 24, 14, "#245", "center");
      });
    }
  });

  // ---- Gear Builder ----
  B.add({
    id: "s14-gears", name: "Gear Machine Maker", ages: [8, 20], cat: "Build", color: "#a0b4c8", icon: "G",
    desc: "Connect gears of different sizes to a motor and watch your machine spin.", controls: "Place a Motor gear first, then add gears touching it. Add a lamp, duck or windmill",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const TS = g.by([10, 16], [8, 12, 16, 24], [8, 12, 16, 20, 24, 32]), CAPG = g.by(10, 16, 24), SPD = g.by(1.6, 2.2, 3);
      const AT = g.by([["lamp", "Lamp"], ["duck", "Duck"]], [["lamp", "Lamp"], ["duck", "Duck"], ["mill", "Windmill"]], [["lamp", "Lamp"], ["duck", "Duck"], ["mill", "Windmill"], ["flag", "Flag"]]);
      let gears = [], tool = "g" + TS[0], rev = 1, t = 0, parts = [], jam = false, info = "";
      try { const d = g.load(); if (d && Array.isArray(d.gears)) gears = d.gears.filter(o => o && TS.indexOf(o.n) >= 0 && isFinite(o.x) && isFinite(o.y)).slice(0, CAPG).map(o => ({ x: +o.x, y: +o.y, n: o.n | 0, motor: !!o.motor, att: AT.some(a => a[0] === o.att) ? o.att : null, th: 0 })); } catch (e) {}
      const save = () => g.save({ gears: gears.map(o => ({ x: o.x, y: o.y, n: o.n, motor: o.motor, att: o.att })) });
      const rad = n => n * 2.5;
      let quiet = false;
      const reject = (msg, p) => { if (quiet) return; g.sfx("wrong"); floatText(g, c, W, H, msg, p.x, p.y - 20, "#fff"); };
      const placeGear = (n, p, motor) => {
        if (gears.length >= CAPG) { reject("Room is full!", p); return; }
        const r = rad(n); let X = Math.round(p.x / 5) * 5, Y = Math.round(p.y / 5) * 5, best = null, bd = 1e9;
        gears.forEach(o => { const d = Math.hypot(X - o.x, Y - o.y), gap = Math.abs(d - (r + rad(o.n))); if (gap < 40 && gap < bd) { bd = gap; best = o; } });
        if (best) { const a = Math.atan2(Y - best.y, X - best.x), want = r + rad(best.n); X = best.x + Math.cos(a) * want; Y = best.y + Math.sin(a) * want; }
        if (X < r + 4 || X > W - r - 4 || Y < r + 4 || Y > H - r - 4) { reject("Out of room!", p); return; }
        for (const o of gears) if (Math.hypot(X - o.x, Y - o.y) < r + rad(o.n) - 8) { reject("Too close!", p); return; }
        if (motor) gears.forEach(o => { o.motor = false; });
        gears.push({ x: X, y: Y, n, motor: !!motor, att: null, th: 0 }); g.add(1); g.sfx(best ? "clink" : "pop"); puff(parts, X, Y, 8, ["#fff", "#ffd34e"], 90, .5, 80); save();
      };
      const under = p => { for (let i = gears.length - 1; i >= 0; i--) if (Math.hypot(p.x - gears[i].x, p.y - gears[i].y) < rad(gears[i].n)) return gears[i]; return null; };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        if (tool === "erase") { const o = under(p); if (o) { gears = gears.filter(q => q !== o); g.sfx("back"); save(); } return; }
        if (tool === "motor") { placeGear(TS[Math.min(1, TS.length - 1)], p, true); return; }
        if (tool[0] === "g") { placeGear(+tool.slice(1), p, false); return; }
        const o = under(p); if (!o) { reject("Tap a gear!", p); return; }
        o.att = o.att === tool ? null : tool; g.add(1); g.sfx("pick"); save();
      });
      const tools = TS.map(n => ["g" + n, n + " teeth"]).concat([["motor", "Motor gear"]], AT.map(a => [a[0], a[1]]), [["erase", "Erase"]]);
      const tb = bar(g, tools.map(q => [q[1], () => { tool = q[0]; g.sfx("click"); mk(); }, q[0] === "motor" ? "background:#ffd34e;color:#3a2600" : ""]));
      const mk = () => tb.bs.forEach((b, i) => { b.style.outline = tools[i][0] === tool ? "3px solid #fff" : "none"; });
      mk();
      const acts = [["Undo", () => { gears.pop(); g.sfx("back"); save(); }], ["Clear", () => { gears = []; g.sfx("swish"); save(); }], ["Surprise me", () => {
        gears = []; quiet = true; let cur = { x: g.rf(90, 160), y: g.rf(120, 280), n: TS[Math.min(1, TS.length - 1)] }; placeGear(cur.n, cur, true); let tries = 0;
        while (gears.length < Math.min(CAPG, 7) && tries++ < 40) { const o = g.pick(gears), n = g.pick(TS), a = g.rf(-1.2, 1.2), d = rad(o.n) + rad(n); placeGear(n, { x: o.x + Math.cos(a) * d, y: o.y + Math.sin(a) * d }, false); }
        quiet = false; if (gears.length) { gears[gears.length - 1].att = g.pick(AT)[0]; } g.sfx("cheer");
      }], ["Save picture", () => g.saveImage(c, "my-machine")], FINB(g)];
      if (g.diff >= 2) acts.splice(2, 0, ["Reverse", () => { rev = -rev; g.sfx("click"); }]);
      bar(g, acts);
      const toothPath = (n, r) => { const p = 2 * Math.PI / n, ri = r - 5, ro = r + 4; x.beginPath(); for (let k = 0; k < n; k++) { const a = k * p; x.lineTo(Math.cos(a - .27 * p) * ri, Math.sin(a - .27 * p) * ri); x.lineTo(Math.cos(a - .17 * p) * ro, Math.sin(a - .17 * p) * ro); x.lineTo(Math.cos(a + .17 * p) * ro, Math.sin(a + .17 * p) * ro); x.lineTo(Math.cos(a + .27 * p) * ri, Math.sin(a + .27 * p) * ri); } x.closePath(); };
      const solve = dt => {
        gears.forEach(o => { o.w = undefined; o.par = null; o.conn = false; });
        const nb = gears.map(() => []); jam = false;
        for (let i = 0; i < gears.length; i++) for (let j = i + 1; j < gears.length; j++) { const a = gears[i], b = gears[j]; if (Math.abs(Math.hypot(a.x - b.x, a.y - b.y) - rad(a.n) - rad(b.n)) <= 8) { nb[i].push(j); nb[j].push(i); } }
        const comps = [];
        gears.forEach((m, mi) => {
          if (!m.motor || m.w !== undefined) return; m.w = SPD * rev; m.conn = true; const q = [mi], comp = [mi]; let bad = false;
          while (q.length) { const i = q.shift(), a = gears[i]; for (const j of nb[i]) { const b = gears[j], ex = -a.w * a.n / b.n; if (b.w === undefined) { b.w = ex; b.conn = true; b.par = i; q.push(j); comp.push(j); } else if (Math.abs(b.w - ex) > 1e-6) bad = true; } }
          comps.push({ comp, bad });
        });
        comps.forEach(cp => { if (cp.bad) { jam = true; cp.comp.forEach(i => { gears[i].jam = true; }); } });
        gears.forEach(o => { if (!comps.some(cp => cp.bad && cp.comp.indexOf(gears.indexOf(o)) >= 0)) o.jam = false; });
        gears.forEach(o => { if (o.motor && o.conn && !o.jam) o.th += o.w * dt; });
        const order = gears.map((o, i) => i).filter(i => gears[i].conn).sort((a, b) => 0);
        const done = {}; const q = gears.map((o, i) => i).filter(i => gears[i].motor && gears[i].conn); q.forEach(i => { done[i] = 1; });
        while (q.length) { const i = q.shift(), a = gears[i]; for (const j of nb[i]) { if (done[j]) continue; done[j] = 1; const b = gears[j], phi = Math.atan2(b.y - a.y, b.x - a.x); b.th = phi + Math.PI - Math.PI / b.n - (a.th - phi) * a.n / b.n; q.push(j); } }
      };
      g.loop((dt, tt) => {
        t = tt; solve(dt);
        const hasMotor = gears.some(o => o.motor);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#2b2f4a"); gr.addColorStop(1, "#3d3a5e"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "rgba(255,255,255,.12)"; for (let i = 15; i < W; i += 30) for (let j = 15; j < H; j += 30) { x.fillRect(i - 1, j - 1, 3, 3); }
        for (const o of gears) {
          const r = rad(o.n), spin = o.conn && !o.jam && Math.abs(o.w) > 0;
          x.save(); x.translate(o.x + (o.jam ? Math.sin(t * 60) * 1.5 : 0), o.y);
          x.save(); x.rotate(o.th); toothPath(o.n, r);
          x.fillStyle = o.jam ? "hsl(0,70%,55%)" : o.conn ? "hsl(" + (o.n * 37 % 360) + ",65%,58%)" : "hsl(" + (o.n * 37 % 360) + ",18%,52%)"; x.fill(); x.lineWidth = 2; x.strokeStyle = "rgba(0,0,0,.45)"; x.stroke();
          x.fillStyle = "rgba(0,0,0,.28)"; for (let k = 0; k < 3; k++) { const a = k * 2.094; cc(x, Math.cos(a) * r * .5, Math.sin(a) * r * .5, r * .17); x.fill(); }
          cc(x, 0, 0, 6); x.fillStyle = "#e8eaf2"; x.fill(); x.stroke();
          if (o.motor) { x.lineWidth = 5; x.strokeStyle = "#ffd34e"; x.beginPath(); x.moveTo(0, 0); x.lineTo(r * .7, 0); x.stroke(); cc(x, r * .7, 0, 6); x.fillStyle = "#ff8a2a"; x.fill(); }
          x.restore();
          if (o.att === "lamp") { const on = spin; if (on) { const gl = x.createRadialGradient(0, 0, 2, 0, 0, 44); gl.addColorStop(0, "rgba(255,240,140,.8)"); gl.addColorStop(1, "rgba(255,240,140,0)"); x.fillStyle = gl; x.fillRect(-44, -44, 88, 88); } cc(x, 0, 0, 10); x.fillStyle = on ? "#fff6a0" : "#8a8a7a"; x.fill(); x.lineWidth = 2; x.strokeStyle = "#333"; x.stroke(); }
          else if (o.att === "duck") { const by = Math.sin(o.th * 2) * 4; x.fillStyle = "#ffd34e"; x.beginPath(); x.ellipse(0, by + 2, 13, 9, 0, 0, 7); x.fill(); cc(x, 8, by - 8, 7); x.fill(); x.fillStyle = "#ff8a2a"; x.beginPath(); x.moveTo(13, by - 8); x.lineTo(21, by - 6); x.lineTo(13, by - 4); x.fill(); x.fillStyle = "#222"; cc(x, 10, by - 10, 1.5); x.fill(); }
          else if (o.att === "mill") { x.save(); x.rotate(o.th * 1.5); x.fillStyle = "#fff"; x.strokeStyle = "#333"; x.lineWidth = 2; const bl = Math.min(r * .85, 40); for (let k = 0; k < 4; k++) { x.rotate(1.5708); x.beginPath(); x.moveTo(0, 0); x.lineTo(bl, -6); x.lineTo(bl, 6); x.closePath(); x.fill(); x.stroke(); } x.restore(); }
          else if (o.att === "flag") { x.strokeStyle = "#ddd"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -28); x.stroke(); x.fillStyle = "#ff4d6d"; x.beginPath(); x.moveTo(0, -28); x.lineTo(18 + Math.sin(o.th * 3) * (spin ? 4 : 0), -22); x.lineTo(0, -15); x.fill(); }
          x.restore();
          if (o.jam && Math.random() < dt * 20) puff(parts, o.x + g.rf(-r, r), o.y + g.rf(-r, r), 1, ["#ffb02e", "#ff4d4d"], 120, .4, 300);
        }
        drawParts(parts, x, dt);
        if (!gears.length) txt(x, "Place a Motor gear, then add gears next to it", 320, 60, 18, "#fff");
        else if (!hasMotor) txt(x, "Add a Motor gear to make it go!", 320, 30, 18, "#ffd34e");
        else if (jam) txt(x, "Jammed! Gears in a loop of odd size fight each other", 320, 30, 16, "#ff8a8a");
      });
    }
  });

  // ---- Alien Planet Designer ----
  B.add({
    id: "s14-planet", name: "Alien Planet Designer", ages: [7, 20], cat: "Creative", color: "#2ec4b6", icon: "A",
    desc: "Paint an alien planet, plant strange life on it and watch it grow and live.", controls: "Pick Water, Land and more and drag to paint. Pick plants and creatures and tap to add them",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const CELL = 10, NC = 38, OX = 130, OY = 10, CX = 320, CY = 200, R = 188;
      const TH = [["#2a7fe0", "#4caf50", "#e6c36e", "#f4f9ff", "#8a7f9a"], ["#7ad3ff", "#ff8fc4", "#ffe27a", "#ffffff", "#b48cff"], ["#7a4cc9", "#d9643a", "#f0b86a", "#f7e8d0", "#6b4a4a"]];
      const PC = [["#2f9e44", "#c77dff", "#ff5fa2"], ["#ff5fa2", "#7b6cff", "#ffd34e"], ["#9a4cff", "#ff8a2a", "#ffe27a"]];
      const TN = ["Water", "Land", "Sand", "Ice", "Rock"], PL = [["Puff tree", [1]], ["Glow shroom", [2, 4]], ["Star flower", [3, 1]]], CR = [["Bloop", 0], ["Zoomer", 0], ["Floaty", 1], ["Builder", 0]];
      const CC = ["#4cc3ff", "#ffd34e", "#ff8fc4", "#ff8a2a"], SPD = [18, 40, 15, 22];
      const NTER = g.by(3, 5, 5), NPL = g.by(2, 3, 3), NCR = g.by(2, 3, 4), PM = g.by(100, 160, 220), CM = g.by(18, 30, 40), HM = 8, BR = g.by(3, 2, 2), strict = g.diff >= 2, soft = g.diff === 1;
      const T = new Uint8Array(NC * NC), tc = document.createElement("canvas"); tc.width = tc.height = NC * CELL; const tx = tc.getContext("2d");
      let theme = 0, plants = [], crs = [], huts = [], tool = { t: "ter", v: 1 }, t = 0, rain = 0, fast = false, dirty = false, parts = [], down = false, last = null, sfxT = 0, statT = 0, tdirty = true;
      const gen = () => { const a = g.rf(0, 6), b = g.rf(0, 6), c2 = g.rf(0, 6), d = g.rf(0, 6); for (let j = 0; j < NC; j++) for (let i = 0; i < NC; i++) { const v = Math.sin(i * .28 + a) + Math.sin(j * .23 + b) + Math.sin((i + j) * .17 + c2) * .8 + Math.sin((i - j) * .2 + d) * .7; let k = v < -.9 ? 0 : v < -.4 ? 2 : v < 1.1 ? 1 : v < 2 ? 4 : 3; if (Math.abs(j - NC / 2) / (NC / 2) > .8) k = 3; if (k >= NTER && NTER < 5) k = 1; T[j * NC + i] = k; } };
      gen();
      try {
        const d = g.load();
        if (d) {
          if (Array.isArray(d.terr) && d.terr.length === NC * NC) for (let i = 0; i < T.length; i++) T[i] = Math.max(0, Math.min(4, d.terr[i] | 0));
          theme = (d.theme | 0) % 3; const ok = o => o && isFinite(o.x) && isFinite(o.y);
          if (Array.isArray(d.plants)) plants = d.plants.filter(ok).slice(0, PM).map(o => ({ x: +o.x, y: +o.y, k: Math.min(NPL - 1, o.k | 0), a: Math.max(.1, Math.min(1, +o.a || .5)), sp: g.rf(4, 12) }));
          if (Array.isArray(d.crs)) crs = d.crs.filter(ok).slice(0, CM).map(o => mkCr(Math.min(NCR - 1, o.k | 0), +o.x, +o.y));
          if (Array.isArray(d.huts)) huts = d.huts.filter(ok).slice(0, HM).map(o => ({ x: +o.x, y: +o.y }));
        }
      } catch (e) {}
      function mkCr(k, px, py) { return { x: px, y: py, k, tx: px, ty: py, food: 0, wait: Math.random() * 2, f: 1, tgt: null, ph: Math.random() * 6 }; }
      const tAt = (px, py) => { const i = Math.floor((px - OX) / CELL), j = Math.floor((py - OY) / CELL); return i < 0 || j < 0 || i >= NC || j >= NC ? 0 : T[j * NC + i]; };
      const inDisc = (px, py) => Math.hypot(px - CX, py - CY) < R - 6;
      const prefOf = (k, tr) => PL[k][1].indexOf(tr) >= 0;
      const save = () => { g.save({ terr: Array.from(T), theme, plants: plants.map(p => ({ x: p.x, y: p.y, k: p.k, a: p.a })), crs: crs.map(q => ({ x: q.x, y: q.y, k: q.k })), huts }); dirty = false; };
      const note = n => { if (sfxT <= 0) { g.sfx(n); sfxT = .25; } };
      const repaint = () => { for (let j = 0; j < NC; j++) for (let i = 0; i < NC; i++) { tx.fillStyle = TH[theme][T[j * NC + i]]; tx.fillRect(i * CELL, j * CELL, CELL, CELL); } tdirty = false; };
      const use = (p, first) => {
        if (!inDisc(p.x, p.y)) return;
        if (last && !first && Math.hypot(p.x - last.x, p.y - last.y) < (tool.t === "ter" ? 5 : 16)) return;
        last = { x: p.x, y: p.y };
        if (tool.t === "ter") {
          const ci = Math.floor((p.x - OX) / CELL), cj = Math.floor((p.y - OY) / CELL);
          for (let j = cj - BR; j <= cj + BR; j++) for (let i = ci - BR; i <= ci + BR; i++) if (i >= 0 && j >= 0 && i < NC && j < NC && Math.hypot(i - ci, j - cj) <= BR + .3 && Math.hypot(OX + i * CELL + 5 - CX, OY + j * CELL + 5 - CY) < R - 2) T[j * NC + i] = tool.v;
          tdirty = true; dirty = true; if (first) g.sfx("click"); return;
        }
        if (tool.t === "erase") { let did = false; plants = plants.filter(q => { if (Math.hypot(q.x - p.x, q.y - p.y) < 16) { did = true; return false; } return true; }); crs = crs.filter(q => { if (Math.hypot(q.x - p.x, q.y - p.y) < 16) { did = true; return false; } return true; }); huts = huts.filter(q => { if (Math.hypot(q.x - p.x, q.y - p.y) < 16) { did = true; return false; } return true; }); if (did) { g.sfx("back"); dirty = true; } return; }
        const tr = tAt(p.x, p.y);
        if (tool.t === "pl") {
          if (tr === 0) { if (first) g.sfx("back"); return; } if (plants.length >= PM) { if (first) floatText(g, c, W, H, "Planet is full!", p.x, p.y - 20, "#fff"); return; }
          plants.push({ x: p.x, y: p.y, k: tool.v, a: .25, sp: g.rf(4, 12) }); g.add(1); g.sfx("grow"); puff(parts, p.x, p.y, 5, ["#b6ffcb", "#fff"], 60, .5, 20, "s"); dirty = true;
        } else if (first) {
          if (crs.length >= CM) { floatText(g, c, W, H, "Planet is full!", p.x, p.y - 20, "#fff"); return; }
          if (tr === 0 && !CR[tool.v][1]) { g.sfx("back"); floatText(g, c, W, H, "That is water!", p.x, p.y - 20, "#fff"); return; }
          crs.push(mkCr(tool.v, p.x, p.y)); g.add(1); g.sfx("pop"); puff(parts, p.x, p.y, 8, ["#fff", "#ffd34e"], 80, .5, 60, "s"); dirty = true;
        }
      };
      g.on(c, "pointerdown", e => { down = true; last = null; use(pos(e), true); });
      g.on(c, "pointermove", e => { if (down) use(pos(e), false); });
      g.on(window, "pointerup", () => { down = false; });
      const tools = [], tbarItems = TN.slice(0, NTER).map((n, i) => { tools.push({ t: "ter", v: i }); return [n, () => { tool = { t: "ter", v: i }; g.sfx("click"); mk(); }, "border-bottom:6px solid " + TH[0][i]]; });
      const tbar = bar(g, tbarItems);
      const lifeItems = [];
      PL.slice(0, NPL).forEach((p, i) => { tools.push({ t: "pl", v: i }); lifeItems.push([p[0], () => { tool = { t: "pl", v: i }; g.sfx("click"); mk(); }, "background:#9be7b0;color:#10301a"]); });
      CR.slice(0, NCR).forEach((p, i) => { tools.push({ t: "cr", v: i }); lifeItems.push([p[0], () => { tool = { t: "cr", v: i }; g.sfx("click"); mk(); }, "background:#ffd9a0;color:#3a2600"]); });
      tools.push({ t: "erase", v: 0 }); lifeItems.push(["Erase", () => { tool = { t: "erase", v: 0 }; g.sfx("click"); mk(); }]);
      const lbar = bar(g, lifeItems), allB = tbar.bs.concat(lbar.bs);
      const mk = () => allB.forEach((b, i) => { b.style.outline = tools[i].t === tool.t && tools[i].v === tool.v ? "3px solid #fff" : "none"; });
      const colorTb = () => tbar.bs.forEach((b, i) => { b.style.borderBottom = "6px solid " + TH[theme][i]; });
      mk(); colorTb();
      bar(g, [
        ["New planet", () => { gen(); plants = []; crs = []; huts = []; tdirty = true; g.sfx("swish"); g.add(2); save(); }],
        ["Palette", () => { theme = (theme + 1) % 3; tdirty = true; colorTb(); g.sfx("pick"); dirty = true; }],
        ["Rain", () => { rain = 8; g.sfx("fizz"); }],
        ["Fast: off", b => { fast = !fast; b.textContent = "Fast: " + (fast ? "on" : "off"); g.sfx("click"); }],
        ["Save picture", () => g.saveImage(c, "my-planet")], FINB(g)
      ]);
      g.interval(() => { if (dirty) save(); }, 4000);
      const drawPlant = (p, tt) => {
        const s = .35 + .65 * p.a, night = nightF();
        x.save(); x.translate(p.x, p.y); x.scale(s, s); x.lineWidth = 1.5; x.strokeStyle = "rgba(0,0,0,.35)"; const col = PC[theme][p.k], sw = Math.sin(tt * 1.5 + p.x) * .05; x.rotate(sw);
        if (p.k === 0) { x.fillStyle = "#6b4226"; x.fillRect(-2, -10, 4, 10); cc(x, 0, -17, 9); x.fillStyle = col; x.fill(); x.stroke(); cc(x, -3, -20, 2.5); x.fillStyle = "rgba(255,255,255,.4)"; x.fill(); }
        else if (p.k === 1) { x.fillStyle = "#f3e2c0"; x.fillRect(-2, -8, 4, 8); x.beginPath(); x.arc(0, -8, 8, Math.PI, 0); x.closePath(); x.fillStyle = col; x.fill(); x.stroke(); x.fillStyle = "rgba(255,255,255,.7)"; cc(x, -3, -11, 1.6); x.fill(); cc(x, 3, -10, 1.3); x.fill(); if (night > .2) { const gl = x.createRadialGradient(0, -8, 1, 0, -8, 18); gl.addColorStop(0, "rgba(255,255,160," + night * .7 + ")"); gl.addColorStop(1, "rgba(255,255,160,0)"); x.fillStyle = gl; x.fillRect(-20, -28, 40, 40); } }
        else { x.strokeStyle = "#2f9e44"; x.lineWidth = 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -12); x.stroke(); x.fillStyle = col; for (let i = 0; i < 5; i++) { cc(x, Math.cos(i * 1.2566) * 5, -14 + Math.sin(i * 1.2566) * 5, 3.5); x.fill(); } cc(x, 0, -14, 2.8); x.fillStyle = "#fff6a0"; x.fill(); }
        x.restore();
      };
      const drawCr = (q, tt) => {
        const fl = CR[q.k][1], bob = Math.abs(Math.sin(tt * (q.mv ? 9 : 3) + q.ph)) * (q.mv ? 3 : 1.5);
        x.save(); x.translate(q.x, q.y); x.fillStyle = "rgba(0,0,0,.22)"; x.beginPath(); x.ellipse(0, 0, 8, 3, 0, 0, 7); x.fill(); x.translate(0, -(fl ? 10 + Math.sin(tt * 3 + q.ph) * 3 : bob)); x.scale(q.f, 1); x.lineWidth = 1.5; x.strokeStyle = "rgba(0,0,0,.4)";
        const rx = q.k === 1 ? 11 : 8, ry = q.k === 1 ? 7 : 8;
        if (q.k === 2) { x.globalAlpha = .75; x.beginPath(); x.ellipse(0, -8, 9, 8, 0, Math.PI, 0); x.lineTo(7, -2); for (let i = 0; i < 4; i++) x.lineTo(7 - (i + 1) * 3.5, -2 + (i % 2 ? 0 : 4)); x.closePath(); x.fillStyle = CC[2]; x.fill(); x.stroke(); x.globalAlpha = 1; }
        else { x.beginPath(); x.ellipse(0, -ry, rx, ry, 0, 0, 7); x.fillStyle = CC[q.k]; x.fill(); x.stroke(); if (q.k === 3) { x.beginPath(); x.arc(0, -ry * 1.5, 6, Math.PI, 0); x.closePath(); x.fillStyle = "#ffe14d"; x.fill(); x.stroke(); } if (q.k === 1 && q.mv) { x.strokeStyle = "rgba(255,255,255,.6)"; x.beginPath(); x.moveTo(-14, -8); x.lineTo(-22, -8); x.moveTo(-13, -4); x.lineTo(-20, -4); x.stroke(); } }
        const ey = q.k === 2 ? -9 : -ry - 1; for (const sx of [-3, 3]) { cc(x, sx + 2, ey, 2.4); x.fillStyle = "#fff"; x.fill(); cc(x, sx + 2.6, ey, 1.1); x.fillStyle = "#222"; x.fill(); }
        x.restore();
      };
      const nightF = () => Math.max(0, Math.min(1, .5 + .9 * Math.sin(t * Math.PI * 2 / 80)));
      g.loop((rdt, tt) => {
        const dt = rdt * (fast ? 3 : 1); t += dt; sfxT -= rdt; if (rain > 0) rain -= dt; statT += rdt;
        if (tdirty) repaint();
        for (let i = plants.length - 1; i >= 0; i--) {
          const p = plants[i], tr = tAt(p.x, p.y), pref = prefOf(p.k, tr);
          if (tr === 0) { p.a -= dt * .5; if (p.a <= 0) { plants.splice(i, 1); continue; } }
          else if (strict && !pref) { p.a -= dt * .08; if (p.a <= .05) { plants.splice(i, 1); continue; } }
          else p.a = Math.min(1, p.a + dt * .07 * (rain > 0 ? 3 : 1) * (soft && !pref ? .4 : 1));
          p.sp -= dt;
          if (p.a > .85 && p.sp <= 0) { p.sp = g.rf(8, 16) / (rain > 0 ? 2 : 1); if (plants.length < PM) { const nx = p.x + g.rf(-28, 28), ny = p.y + g.rf(-28, 28), nt = tAt(nx, ny); if (inDisc(nx, ny) && nt !== 0 && (!strict || prefOf(p.k, nt))) plants.push({ x: nx, y: ny, k: p.k, a: .1, sp: g.rf(8, 16) }); } }
        }
        for (const q of crs) {
          q.wait -= dt; q.mv = false; const fl = CR[q.k][1];
          if (!fl && tAt(q.x, q.y) === 0) { for (let k = 0; k < 40; k++) { const nx = g.rf(OX, OX + NC * CELL), ny = g.rf(OY, OY + NC * CELL); if (inDisc(nx, ny) && tAt(nx, ny) !== 0) { q.x = nx; q.y = ny; q.tx = nx; q.ty = ny; break; } } }
          if (q.wait <= 0) {
            let best = null, bd = 130; for (const p of plants) if (p.a > .6) { const d = Math.hypot(p.x - q.x, p.y - q.y); if (d < bd) { bd = d; best = p; } }
            if (best && Math.random() < .85) { q.tx = best.x; q.ty = best.y; q.tgt = best; } else { const a = g.rf(0, 6.28), r = g.rf(15, 60); q.tx = q.x + Math.cos(a) * r; q.ty = q.y + Math.sin(a) * r; q.tgt = null; }
            q.wait = g.rf(1.5, 4);
          }
          const dx = q.tx - q.x, dy = q.ty - q.y, d = Math.hypot(dx, dy);
          if (d > 3) { const sp = SPD[q.k] * dt, nx = q.x + dx / d * sp, ny = q.y + dy / d * sp; if (inDisc(nx, ny) && (fl || tAt(nx, ny) !== 0)) { q.x = nx; q.y = ny; q.mv = true; if (Math.abs(dx) > 1) q.f = dx > 0 ? 1 : -1; } else { q.tx = q.x; q.ty = q.y; q.wait = Math.min(q.wait, .3); } }
          if (q.tgt && Math.hypot(q.tgt.x - q.x, q.tgt.y - q.y) < 9) {
            if (q.tgt.a > .6 && plants.indexOf(q.tgt) >= 0) {
              q.tgt.a = .15; q.food++; note("pop"); q.wait = .5;
              if (q.food >= 3) {
                q.food = 0;
                if (crs.length < CM + 10) { crs.push(mkCr(q.k, q.x + g.rf(-10, 10), q.y + g.rf(-10, 10))); g.add(1); note("grow"); puff(parts, q.x, q.y - 8, 6, ["#fff6a0", "#fff"], 60, .8, -20, "s"); dirty = true; }
                if (q.k === 3 && huts.length < HM && tAt(q.x, q.y) !== 0) { huts.push({ x: q.x + g.rf(-12, 12), y: q.y + 4 }); g.add(2); puff(parts, q.x, q.y - 12, 10, ["#ffd34e", "#fff"], 100, .8, 60, "s"); }
              }
            }
            q.tgt = null;
          }
        }
        if (crs.length > CM) crs.length = CM;
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#04061a"); gr.addColorStop(1, "#14104a"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        for (let i = 0; i < 50; i++) { x.fillStyle = "rgba(255,255,255," + (.3 + .5 * Math.abs(Math.sin(t * .5 + i))) + ")"; x.fillRect((i * 131) % W, (i * 71) % H, 2, 2); }
        const halo = x.createRadialGradient(CX, CY, R - 10, CX, CY, R + 24); halo.addColorStop(0, "rgba(120,200,255,.45)"); halo.addColorStop(1, "rgba(120,200,255,0)"); x.fillStyle = halo; x.fillRect(CX - R - 30, CY - R - 30, 2 * R + 60, 2 * R + 60);
        x.save(); cc(x, CX, CY, R); x.clip(); x.drawImage(tc, OX, OY);
        const objs = []; plants.forEach(p => objs.push({ y: p.y, f: () => drawPlant(p, t) })); crs.forEach(q => objs.push({ y: q.y, f: () => drawCr(q, t) }));
        huts.forEach(h => objs.push({ y: h.y, f: () => { x.save(); x.translate(h.x, h.y); x.lineWidth = 1.5; x.strokeStyle = "rgba(0,0,0,.4)"; rr(x, -9, -12, 18, 12, 2); x.fillStyle = "#f3e2c0"; x.fill(); x.stroke(); x.beginPath(); x.moveTo(-12, -11); x.lineTo(12, -11); x.lineTo(0, -22); x.closePath(); x.fillStyle = "#ff6a4a"; x.fill(); x.stroke(); rr(x, -2.5, -7, 5, 7, 1); x.fillStyle = "#7a4a22"; x.fill(); x.restore(); } }));
        objs.sort((a, b) => a.y - b.y).forEach(o => o.f());
        const nf = nightF(); x.fillStyle = "rgba(10,10,60," + (nf * .45) + ")"; x.fillRect(OX, OY, NC * CELL, NC * CELL);
        if (rain > 0) { x.strokeStyle = "rgba(190,225,255,.7)"; x.lineWidth = 1.5; for (let i = 0; i < 60; i++) { const rx = OX + (i * 53 + 7) % (NC * CELL), ry = OY + ((i * 97 + t * 400) % (NC * CELL)); x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 2, ry + 9); x.stroke(); } }
        const sh = x.createRadialGradient(CX - 70, CY - 70, 40, CX, CY, R); sh.addColorStop(0, "rgba(255,255,255,.14)"); sh.addColorStop(.7, "rgba(0,0,30,0)"); sh.addColorStop(1, "rgba(0,0,40,.5)"); x.fillStyle = sh; x.fillRect(OX, OY, NC * CELL, NC * CELL);
        x.restore(); cc(x, CX, CY, R); x.lineWidth = 3; x.strokeStyle = "rgba(255,255,255,.25)"; x.stroke();
        drawParts(parts, x, rdt);
        txt(x, "Plants " + plants.length + "   Creatures " + crs.length, 90, 24, 14, "#cfe", "center");
        if (huts.length) txt(x, "Huts " + huts.length, 60, 46, 14, "#ffd34e");
        if (!plants.length && !crs.length) txt(x, "Paint land, then add life!", 320, 390, 18, "#fff");
        if (statT > 1) { statT = 0; g.status("Life: " + (plants.length + crs.length)); }
      });
    }
  });

  // ---- Make Your Own Arcade Game ----
  B.add({
    id: "s14-arcade", name: "Make Your Own Arcade Game", ages: [7, 20], cat: "Build", color: "#ff4d6d", icon: "M",
    desc: "Pick a hero, an enemy, a background and a speed, then play the game you invented.", controls: "Choose your game with the buttons, press Play it! Move with mouse, touch or arrow keys",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const HN = ["Rocket", "Blob", "Robot", "Cat"], EN = ["Bug", "Ghost", "Asteroid", "Slime"], BN = ["Space", "Night city", "Jungle", "Ocean", "Candy land"], SN = ["Slow", "Normal", "Fast"], PN = ["Straight", "Zigzag", "Chase"];
      const NH = g.by(3, 4, 4), NE = g.by(3, 4, 4), NB = g.by(3, 4, 5), NS = g.by(2, 3, 3), SM = [.8, 1.2, 1.7];
      let S = { hero: 0, enemy: 0, bg: 0, spd: 0, weap: 1, pat: 0, title: "" }, t = 0, P = null, scroll = 0, parts = [];
      try { const d = g.load(); if (d) S = { hero: (d.hero | 0) % NH, enemy: (d.enemy | 0) % NE, bg: (d.bg | 0) % NB, spd: (d.spd | 0) % NS, weap: g.diff === 0 ? 1 : (d.weap ? 1 : 0), pat: g.diff >= 2 ? (d.pat | 0) % 3 : 0, title: String(d.title || "").slice(0, 40) }; } catch (e) {}
      const mkTitle = () => { S.title = g.pick(["Super", "Mega", "Turbo", "Captain", "Crazy", "Tiny", "Happy", "Wild"]) + " " + ["Bug", "Ghost", "Rock", "Slime"][S.enemy] + " " + g.pick(["Dash", "Blast", "Quest", "Rush", "Party", "Panic"]); };
      if (!S.title) mkTitle();
      const save = () => g.save(S);
      const hero = (tt, flame) => {
        x.lineWidth = 2; x.strokeStyle = "rgba(20,20,50,.55)"; x.lineJoin = "round";
        if (S.hero === 0) { if (flame) { x.beginPath(); x.moveTo(-7, 20); x.lineTo(7, 20); x.lineTo(0, 36 + Math.random() * 10); x.fillStyle = "#ffb02e"; x.fill(); } for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 10, 4); x.lineTo(sd * 22, 24); x.lineTo(sd * 10, 18); x.closePath(); x.fillStyle = "#ff4d6d"; x.fill(); x.stroke(); } x.beginPath(); x.ellipse(0, 0, 13, 25, 0, 0, 7); x.fillStyle = "#eef2fb"; x.fill(); x.stroke(); x.beginPath(); x.moveTo(-11, -12); x.quadraticCurveTo(0, -42, 11, -12); x.closePath(); x.fillStyle = "#ff4d6d"; x.fill(); x.stroke(); cc(x, 0, -2, 6); x.fillStyle = "#4cc3ff"; x.fill(); x.stroke(); }
        else if (S.hero === 1) { const sq = Math.sin(tt * 6) * .08; x.save(); x.scale(1 + sq, 1 - sq); x.beginPath(); x.ellipse(0, 4, 22, 20, 0, 0, 7); x.fillStyle = "#6be28f"; x.fill(); x.stroke(); x.restore(); for (const sd of [-1, 1]) { cc(x, sd * 8, -2, 6); x.fillStyle = "#fff"; x.fill(); cc(x, sd * 8, -1, 2.6); x.fillStyle = "#222"; x.fill(); } x.beginPath(); x.arc(0, 6, 7, .2, Math.PI - .2); x.stroke(); }
        else if (S.hero === 2) { x.beginPath(); x.moveTo(0, -14); x.lineTo(0, -26); x.stroke(); cc(x, 0, -28, 3.5); x.fillStyle = "#ff4d6d"; x.fill(); rr(x, -18, -14, 36, 22, 6); x.fillStyle = "#c9d2e0"; x.fill(); x.stroke(); rr(x, -14, 8, 28, 16, 4); x.fillStyle = "#4cc3ff"; x.fill(); x.stroke(); x.fillStyle = "#27304f"; x.fillRect(-10, -8, 7, 8); x.fillRect(3, -8, 7, 8); if (flame) { x.fillStyle = "#ffb02e"; x.beginPath(); x.moveTo(-8, 24); x.lineTo(8, 24); x.lineTo(0, 34 + Math.random() * 8); x.fill(); } }
        else { for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 18, -12); x.lineTo(sd * 14, -30); x.lineTo(sd * 4, -16); x.closePath(); x.fillStyle = "#ff9a4a"; x.fill(); x.stroke(); } cc(x, 0, 0, 20); x.fillStyle = "#ff9a4a"; x.fill(); x.stroke(); for (const sd of [-1, 1]) { cc(x, sd * 8, -3, 4.5); x.fillStyle = "#fff"; x.fill(); cc(x, sd * 8, -3, 2); x.fillStyle = "#222"; x.fill(); } x.beginPath(); x.moveTo(-3, 3); x.lineTo(3, 3); x.lineTo(0, 7); x.fillStyle = "#ff8fa3"; x.fill(); x.lineWidth = 1; x.beginPath(); x.moveTo(8, 4); x.lineTo(24, 1); x.moveTo(8, 7); x.lineTo(24, 10); x.moveTo(-8, 4); x.lineTo(-24, 1); x.moveTo(-8, 7); x.lineTo(-24, 10); x.stroke(); if (flame) { x.fillStyle = "#ffb02e"; x.beginPath(); x.moveTo(-8, 18); x.lineTo(8, 18); x.lineTo(0, 30 + Math.random() * 8); x.fill(); } }
      };
      const enemy = tt => {
        x.lineWidth = 2; x.strokeStyle = "rgba(20,20,50,.55)"; x.lineJoin = "round";
        if (S.enemy === 0) { for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(sd * 8, -4 + i * 8); x.lineTo(sd * 20, -8 + i * 8 + Math.sin(tt * 10 + i) * 3); x.stroke(); } x.beginPath(); x.ellipse(0, 2, 14, 17, 0, 0, 7); x.fillStyle = "#e8463a"; x.fill(); x.stroke(); x.fillStyle = "#222"; cc(x, -6, 8, 3); x.fill(); cc(x, 6, 10, 3); x.fill(); for (const sd of [-1, 1]) { cc(x, sd * 6, -8, 4); x.fillStyle = "#fff"; x.fill(); cc(x, sd * 6, -7, 1.8); x.fillStyle = "#222"; x.fill(); } }
        else if (S.enemy === 1) { x.beginPath(); x.arc(0, -2, 17, Math.PI, 0); x.lineTo(17, 18); for (let i = 0; i < 4; i++) x.lineTo(17 - (i + 1) * 8.5, 18 + (i % 2 ? 0 : -6) + Math.sin(tt * 6 + i) * 2); x.closePath(); x.fillStyle = "rgba(240,245,255,.92)"; x.fill(); x.stroke(); for (const sd of [-1, 1]) { cc(x, sd * 6, -4, 4.5); x.fillStyle = "#222"; x.fill(); } x.beginPath(); x.ellipse(0, 6, 4, 5, 0, 0, 7); x.fill(); }
        else if (S.enemy === 2) { x.save(); x.rotate(tt * 1.5); x.beginPath(); for (let i = 0; i < 9; i++) { const a = i * .698, r = 17 + (i * 7 % 5); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fillStyle = "#8a8fa0"; x.fill(); x.stroke(); x.fillStyle = "rgba(0,0,0,.25)"; cc(x, -5, -4, 4); x.fill(); cc(x, 7, 5, 3); x.fill(); cc(x, 2, -10, 2.4); x.fill(); x.restore(); }
        else { x.beginPath(); x.moveTo(0, -22); x.quadraticCurveTo(22, 2, 16, 14); x.quadraticCurveTo(0, 22, -16, 14); x.quadraticCurveTo(-22, 2, 0, -22); x.fillStyle = "#6be25a"; x.fill(); x.stroke(); for (const sd of [-1, 1]) { cc(x, sd * 6, 2, 4); x.fillStyle = "#fff"; x.fill(); cc(x, sd * 6, 3, 1.8); x.fillStyle = "#222"; x.fill(); x.beginPath(); x.moveTo(sd * 11, -3); x.lineTo(sd * 2, 0); x.stroke(); } }
      };
      const bgDraw = (tt, sc) => {
        const gr = x.createLinearGradient(0, 0, 0, H), b = S.bg;
        const C = [["#040624", "#1b1250"], ["#1b1040", "#5a2a78"], ["#7fd6a0", "#2f7f55"], ["#4cc3ff", "#0a4a8a"], ["#ffd1e6", "#ffeaa0"]][b]; gr.addColorStop(0, C[0]); gr.addColorStop(1, C[1]); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        if (b === 0 || b === 1) { for (let i = 0; i < 60; i++) { const sp = .3 + (i % 3) * .4; x.fillStyle = "rgba(255,255,255," + (.4 + (i % 3) * .2) + ")"; x.fillRect((i * 97) % W, (i * 53 + sc * sp) % H, 1 + i % 3, 1 + i % 3); } }
        if (b === 1) { for (let i = 0; i < 12; i++) { const bh = 80 + (i * 37) % 90; x.fillStyle = "#150a2e"; x.fillRect(i * 56, H - bh, 50, bh); for (let k = 0; k < 6; k++) { x.fillStyle = Math.sin(tt * .7 + i * 3 + k * 5) > -.2 ? "#ffd34e" : "#3a2a5a"; x.fillRect(i * 56 + 8 + (k % 2) * 20, H - bh + 10 + Math.floor(k / 2) * 22, 10, 12); } } }
        else if (b === 2) { for (let i = 0; i < 14; i++) { x.fillStyle = "rgba(20,100,50,.45)"; x.beginPath(); x.ellipse((i * 83) % W, (i * 61 + sc * .8) % (H + 40) - 20, 26, 9, i, 0, 7); x.fill(); } x.fillStyle = "#1f6a3a"; for (let i = 0; i < 5; i++) x.fillRect(i * 150 + 20, 0, 12, H); }
        else if (b === 3) { x.fillStyle = "rgba(255,255,255,.07)"; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(i * 180, 0); x.lineTo(i * 180 + 60, 0); x.lineTo(i * 180 + 160, H); x.lineTo(i * 180 + 60, H); x.fill(); } for (let i = 0; i < 24; i++) { x.strokeStyle = "rgba(255,255,255,.55)"; cc(x, (i * 89) % W + Math.sin(tt + i) * 6, H - ((i * 47 + sc * (.6 + (i % 3) * .3)) % H), 3 + i % 4); x.lineWidth = 1.5; x.stroke(); } }
        else if (b === 4) { for (let i = 0; i < 14; i++) { const px = (i * 101) % W, py = (i * 67 + sc * .7) % (H + 60) - 30; x.strokeStyle = "#fff"; x.lineWidth = 3; x.beginPath(); x.moveTo(px, py); x.lineTo(px, py + 30); x.stroke(); cc(x, px, py, 12); x.fillStyle = PAL[(i * 2) % 9]; x.fill(); x.lineWidth = 2; x.strokeStyle = "#fff"; x.stroke(); } }
      };
      const sty = () => ({ pat: g.diff >= 2 });
      const startPlay = () => { P = { hx: W / 2, hy: 340, tx: W / 2, ty: 340, en: [], st: [], bl: [], t: 0, sp: .6, fire: 0, hits: 0, stars: 0, kills: 0, inv: 0, shake: 0 }; g.sfx("launch"); g.status("Hits: 0  Stars: 0  Defeated: 0"); pb.textContent = "Edit"; };
      const stopPlay = () => { P = null; pb.textContent = "Play it!"; g.status(""); };
      g.on(c, "pointermove", e => { if (!P) return; const p = pos(e); P.tx = g.clamp(p.x, 24, W - 24); if (g.diff >= 2) P.ty = g.clamp(p.y, 200, 372); });
      g.on(c, "pointerdown", e => { if (!P) return; const p = pos(e); P.tx = g.clamp(p.x, 24, W - 24); if (g.diff >= 2) P.ty = g.clamp(p.y, 200, 372); });
      const lbl = (n, v) => n + ": " + v;
      const hb = ["Hero: " + HN[S.hero], b => { S.hero = (S.hero + 1) % NH; b.textContent = lbl("Hero", HN[S.hero]); g.add(1); g.sfx("pick"); save(); }];
      const eb = ["Enemy: " + EN[S.enemy], b => { S.enemy = (S.enemy + 1) % NE; b.textContent = lbl("Enemy", EN[S.enemy]); g.add(1); g.sfx("pick"); save(); }];
      const bb = ["Background: " + BN[S.bg], b => { S.bg = (S.bg + 1) % NB; b.textContent = lbl("Background", BN[S.bg]); g.add(1); g.sfx("pick"); save(); }];
      const sb = ["Speed: " + SN[S.spd], b => { S.spd = (S.spd + 1) % NS; b.textContent = lbl("Speed", SN[S.spd]); g.add(1); g.sfx("pick"); save(); }];
      const items = [hb, eb, bb, sb];
      if (g.diff >= 1) items.push(["Weapon: " + (S.weap ? "On" : "Off"), b => { S.weap = S.weap ? 0 : 1; b.textContent = "Weapon: " + (S.weap ? "On" : "Off"); g.sfx("click"); save(); }]);
      if (g.diff >= 2) items.push(["Enemies: " + PN[S.pat], b => { S.pat = (S.pat + 1) % 3; b.textContent = "Enemies: " + PN[S.pat]; g.sfx("pick"); save(); }]);
      items.push(["New name", () => { mkTitle(); g.sfx("pop"); save(); }]);
      bar(g, items);
      const pb = bar(g, [["Play it!", b => { if (P) stopPlay(); else startPlay(); }, "background:#ffd34e;color:#3a2600;font-weight:bold"], ["Save picture", () => g.saveImage(c, "my-arcade-game")], FINB(g)]).bs[0];
      g.loop((dt, tt) => {
        t = tt; const sm = SM[S.spd];
        scroll += dt * (P ? 80 : 35) * sm;
        let ox = 0, oy = 0;
        if (P) {
          P.t += dt; P.inv = Math.max(0, P.inv - dt); P.shake = Math.max(0, P.shake - dt);
          let kx = (g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0), ky = g.diff >= 2 ? (g.keys.ArrowDown ? 1 : 0) - (g.keys.ArrowUp ? 1 : 0) : 0;
          if (kx || ky) { P.hx = g.clamp(P.hx + kx * 340 * dt, 24, W - 24); P.hy = g.clamp(P.hy + ky * 300 * dt, 200, 372); P.tx = P.hx; P.ty = P.hy; }
          P.hx += (P.tx - P.hx) * Math.min(1, dt * 12); P.hy += (P.ty - P.hy) * Math.min(1, dt * 12);
          P.sp -= dt;
          if (P.sp <= 0) { P.sp = Math.max(.32, 1.05 / sm / (1 + P.t * .012)) * g.by(1.15, 1, .85); if (Math.random() < .25) P.st.push({ x: g.rf(30, W - 30), y: -20, ph: g.rf(0, 6) }); else { const ex = g.rf(30, W - 30); P.en.push({ x: ex, x0: ex, y: -26, t: 0, v: 90 * sm * (1 + P.t * .008) * g.rf(.85, 1.2) }); } }
          if (S.weap) { P.fire -= dt; if (P.fire <= 0) { P.fire = .32; P.bl.push({ x: P.hx, y: P.hy - 30 }); g.sfx("tick"); } }
          for (let i = P.bl.length - 1; i >= 0; i--) { const b = P.bl[i]; b.y -= 520 * dt; if (b.y < -10) P.bl.splice(i, 1); }
          for (let i = P.en.length - 1; i >= 0; i--) {
            const e = P.en[i]; e.t += dt; e.y += e.v * dt;
            if (S.pat === 1) e.x = g.clamp(e.x0 + Math.sin(e.t * 3) * 55, 20, W - 20); else if (S.pat === 2) e.x += Math.sign(P.hx - e.x) * 45 * sm * dt;
            if (e.y > H + 30) { P.en.splice(i, 1); continue; }
            let dead = false;
            for (let k = P.bl.length - 1; k >= 0; k--) if (Math.abs(P.bl[k].x - e.x) < 22 && Math.abs(P.bl[k].y - e.y) < 24) { P.bl.splice(k, 1); dead = true; break; }
            if (dead) { P.en.splice(i, 1); P.kills++; g.add(1); g.sfx("pop"); puff(parts, e.x, e.y, 12, ["#fff", "#ffd34e", "#ff8a2a"], 160, .6, 100, "s"); g.status("Hits: " + P.hits + "  Stars: " + P.stars + "  Defeated: " + P.kills); continue; }
            if (!P.inv && Math.hypot(e.x - P.hx, e.y - P.hy) < 28) { P.en.splice(i, 1); P.hits++; P.inv = 1; P.shake = .3; g.sfx("wrong"); puff(parts, P.hx, P.hy, 14, ["#ff4d6d", "#fff"], 180, .6, 100); g.status("Hits: " + P.hits + "  Stars: " + P.stars + "  Defeated: " + P.kills); }
          }
          for (let i = P.st.length - 1; i >= 0; i--) {
            const s = P.st[i]; s.y += 110 * sm * dt; if (s.y > H + 20) { P.st.splice(i, 1); continue; }
            if (Math.hypot(s.x - P.hx, s.y - P.hy) < 30) { P.st.splice(i, 1); P.stars++; g.add(1); g.sfx("star"); puff(parts, s.x, s.y, 10, ["#fff6a0", "#ffd34e"], 140, .6, 0, "s"); g.status("Hits: " + P.hits + "  Stars: " + P.stars + "  Defeated: " + P.kills); }
          }
          if (P.shake > 0) { ox = g.rf(-4, 4); oy = g.rf(-4, 4); }
        }
        x.save(); x.translate(ox, oy); bgDraw(t, scroll);
        if (P) {
          for (const s of P.st) { x.save(); x.translate(s.x, s.y); x.rotate(t * 2 + s.ph); st5(x, 0, 0, 14); x.fillStyle = "#ffd34e"; x.fill(); x.lineWidth = 2; x.strokeStyle = "#a66"; x.stroke(); x.restore(); }
          for (const e of P.en) { x.save(); x.translate(e.x, e.y); enemy(t + e.t); x.restore(); }
          for (const b of P.bl) { rr(x, b.x - 3, b.y - 10, 6, 18, 3); x.fillStyle = "#fff6a0"; x.fill(); x.lineWidth = 1.5; x.strokeStyle = "#ffb02e"; x.stroke(); }
          if (!(P.inv > 0 && Math.floor(t * 12) % 2)) { x.save(); x.translate(P.hx, P.hy + Math.sin(t * 8) * 1.5); hero(t, true); x.restore(); }
          if (P.inv > .6) txt(x, "Oops!", P.hx, P.hy - 40, 16, "#ffd34e");
        } else {
          txt(x, S.title, 320, 48, 30, "#fff"); txt(x, "Your game! Press Play it!", 320, 76, 16, "#ffd34e");
          x.save(); x.translate(320, 120 + Math.sin(t * 3) * 6); x.scale(1.6, 1.6); enemy(t); x.restore();
          x.save(); x.translate(320, 300 + Math.sin(t * 3 + 1) * 5); x.scale(1.6, 1.6); hero(t, true); x.restore();
          txt(x, "Enemy: " + EN[S.enemy], 460, 125, 16, "#fff"); txt(x, "Hero: " + HN[S.hero], 180, 305, 16, "#fff");
          if (S.weap) { rr(x, 314, 200, 12, 28, 5); x.fillStyle = "#fff6a0"; x.fill(); }
        }
        x.restore(); drawParts(parts, x, dt);
      });
    }
  });
})();
