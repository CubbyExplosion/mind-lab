// Break Time Games: set 10 (Racing, vehicles and physics toys)
(function () {
  const B = window.BreakGames; if (!B) return;
  const TAU = Math.PI * 2;
  const rr = (x, a, b, w, h, r) => { x.beginPath(); x.roundRect(a, b, w, h, r); };
  const say = (x, s, px, py, col, size, al) => { x.font = "bold " + (size || 20) + "px system-ui, sans-serif"; x.textAlign = al || "center"; x.textBaseline = "middle"; x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  const wrapA = a => { while (a > Math.PI) a -= TAU; while (a < -Math.PI) a += TAU; return a; };
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const burst = (ps, px, py, n, col, sp, life) => { for (let i = 0; i < n; i++) { const a = Math.random() * TAU, s = Math.random() * (sp || 150); ps.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: life || .6, max: life || .6, col, r: 2 + Math.random() * 3 }); } };
  const stepParts = (x, ps, dt, grav) => { for (let i = ps.length - 1; i >= 0; i--) { const p = ps[i]; p.life -= dt; if (p.life <= 0) { ps.splice(i, 1); continue; } p.vy += (grav || 0) * dt; p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.max(0, p.life / p.max); x.fillStyle = p.col; x.fillRect(p.x - p.r / 2, p.y - p.r / 2, p.r, p.r); } x.globalAlpha = 1; };
  const popAt = (g, cv, W, H, s, px, py, col) => g.pop(s, px * cv.clientWidth / W, py * cv.clientHeight / H, col);
  // on-screen hold buttons: specs = [[label, keyName], ...] set g.keys[keyName] while held
  const pad = (g, specs) => {
    const row = g.html('<div style="display:flex;gap:8px;justify-content:center;margin-top:8px;flex-wrap:wrap">' + specs.map((s, i) => '<button type="button" class="bg-btn" data-i="' + i + '" style="min-width:68px;min-height:48px;touch-action:none;user-select:none;-webkit-user-select:none">' + s[0] + '</button>').join("") + "</div>");
    specs.forEach((s, i) => {
      const b = row.querySelector('[data-i="' + i + '"]'), set = v => e => { e.preventDefault(); g.keys[s[1]] = v; };
      g.on(b, "pointerdown", set(true)); g.on(b, "pointerup", set(false)); g.on(b, "pointerleave", set(false)); g.on(b, "pointercancel", set(false)); g.on(b, "contextmenu", e => e.preventDefault());
    });
    return row;
  };
  const carShape = (x, col, L, Wd) => {
    x.fillStyle = "rgba(0,0,0,.28)"; rr(x, -L / 2 + 2, -Wd / 2 + 3, L, Wd, Wd * .3); x.fill();
    x.fillStyle = col; rr(x, -L / 2, -Wd / 2, L, Wd, Wd * .3); x.fill();
    x.fillStyle = "rgba(20,30,50,.75)"; rr(x, -L * .12, -Wd * .36, L * .32, Wd * .72, 3); x.fill();
    x.fillStyle = "rgba(255,255,255,.28)"; rr(x, -L / 2 + 3, -Wd / 2 + 2, L - 8, Wd * .16, 2); x.fill();
    x.fillStyle = "#fff6b0"; x.fillRect(L / 2 - 3, -Wd / 2 + 1, 3, Wd * .22); x.fillRect(L / 2 - 3, Wd / 2 - 1 - Wd * .22, 3, Wd * .22);
    x.fillStyle = "#c22"; x.fillRect(-L / 2, -Wd / 2 + 1, 2, Wd * .22); x.fillRect(-L / 2, Wd / 2 - 1 - Wd * .22, 2, Wd * .22);
  };
  // closed track: centre line CL (array of points), half width HW, drawn once to an offscreen canvas
  const trackCanvas = (W, H, CL, HW, grass, asphalt) => {
    const tr = document.createElement("canvas"); tr.width = W; tr.height = H; const t = tr.getContext("2d");
    t.fillStyle = grass; t.fillRect(0, 0, W, H);
    for (let i = 0; i < H; i += 40) { t.fillStyle = "rgba(0,0,0,.05)"; t.fillRect(0, i, W, 20); }
    const path = () => { t.beginPath(); CL.forEach((p, i) => i ? t.lineTo(p.x, p.y) : t.moveTo(p.x, p.y)); t.closePath(); };
    t.lineJoin = "round"; path(); t.lineWidth = HW * 2 + 14; t.strokeStyle = "#fff"; t.stroke();
    path(); t.lineWidth = HW * 2 + 14; t.strokeStyle = "#e33"; t.setLineDash([16, 16]); t.stroke(); t.setLineDash([]);
    path(); t.lineWidth = HW * 2; t.strokeStyle = asphalt; t.stroke();
    path(); t.lineWidth = 2; t.strokeStyle = "rgba(255,255,255,.3)"; t.setLineDash([14, 16]); t.stroke(); t.setLineDash([]);
    const n = CL.length, a = Math.atan2(CL[1].y - CL[n - 1].y, CL[1].x - CL[n - 1].x);
    t.save(); t.translate(CL[0].x, CL[0].y); t.rotate(a);
    for (let r = 0; r < 2; r++) for (let k = 0; k < 8; k++) { t.fillStyle = (k + r) % 2 ? "#111" : "#fff"; t.fillRect(-5 + r * 5, -HW + k * HW / 4, 5, HW / 4); }
    t.restore(); return tr;
  };
  const nearIdx = (CL, px, py, hint, win) => {
    const n = CL.length; let best = hint, bd = Infinity;
    for (let k = -win; k <= win; k++) { const i = (hint + k + n) % n, dx = CL[i].x - px, dy = CL[i].y - py, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = i; } }
    return { i: best, d: Math.sqrt(bd) };
  };
  // shared wheel-and-spring vehicle physics (used by the truck and the motorbike)
  const rigStep = (r, dt, inp, hf, C) => {
    const n = 2, h = dt / n;
    for (let s = 0; s < n; s++) {
      let ax = 0, ay = C.grav, aw = 0, touch = 0; const ca = Math.cos(r.a), sa = Math.sin(r.a);
      for (let i = 0; i < 2; i++) {
        const lx = i ? C.L : -C.L, rx = ca * lx - sa * C.oy, ry = sa * lx + ca * C.oy, wx = r.x + rx, wy = r.y + ry, pen = wy + C.R - hf(wx);
        if (pen <= 0) { r.wc[i] = 0; continue; }
        touch++; r.wc[i] = 1;
        const sl = (hf(wx + 3) - hf(wx - 3)) / 6, nn = Math.hypot(sl, 1), nx = sl / nn, ny = -1 / nn, tx = 1 / nn, ty = sl / nn;
        const vx = r.vx - r.w * ry, vy = r.vy + r.w * rx, vn = vx * nx + vy * ny, vt = vx * tx + vy * ty;
        const F = Math.max(0, Math.min(3200, C.k * Math.min(pen, 26) - C.c * vn));
        let T = -vt * C.roll; const dr = (i === 0 || C.awd) ? (C.awd ? .6 : 1) : 0;
        if (inp.gas) T += C.drive * dr * Math.max(0, Math.min(1.5, 1 - vt / C.vmax)) * (r.a - Math.atan(sl) < -.45 ? Math.max(0, 1 + (r.a - Math.atan(sl) + .45) * 1.6) : 1);
        if (inp.brake) { if (vt > 20) T -= vt * 5; else T -= C.drive * dr * .5 * Math.max(0, Math.min(1, 1 + vt / 110)); }
        r.ws[i] = vt / C.R;
        const fx = F * nx + T * tx, fy = F * ny + T * ty;
        ax += fx; ay += fy; aw += (rx * fy - ry * fx) / C.I;
        if (pen > 26) r.y -= (pen - 26) * .5;
      }
      aw += inp.tilt * C.air * (touch ? (C.gt || .3) : 1);
      r.vx += ax * h; r.vy += ay * h; r.w += aw * h; r.w *= Math.exp(-(touch ? C.ad * 1.5 : C.ad) * h);
      if (!touch) r.vx *= Math.exp(-.03 * h);
      r.x += r.vx * h; r.y += r.vy * h; r.a += r.w * h; r.air = !touch;
    }
  };

  // ---- Grand Prix: 3 laps against 3 computer cars ----
  B.add({
    id: "s10-grand-prix", name: "Grand Prix", ages: [8, 20], cat: "Racing", color: "#ff4d4d", icon: "GP",
    desc: "Race three laps against the computer cars and cross the line first.",
    controls: "Arrows or WASD to drive (up = go, down = brake). On touch, hold the screen: the car drives toward your finger",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), N = 160, HW = 34, CL = [];
      for (let i = 0; i < N; i++) { const t = i / N * TAU, k = 1 + .1 * Math.cos(3 * t) + .06 * Math.sin(2 * t); CL.push({ x: 320 + 255 * k * Math.cos(t), y: 200 + 135 * k * Math.sin(t) }); }
      const tr = trackCanvas(W, H, CL, HW, "#2f8f46", "#4a4f5a"), COLS = ["#ff4d4d", "#4cc3ff", "#ffd34e", "#b48cff"], ps = [];
      const cars = COLS.map((col, k) => {
        const i = N - 4 - 5 * (k >> 1), p = CL[i], q = CL[(i + 1) % N], a = Math.atan2(q.y - p.y, q.x - p.x), off = (k % 2 ? 1 : -1) * 13;
        return { x: p.x - Math.sin(a) * off, y: p.y + Math.cos(a) * off, a, v: 0, idx: i, lap: -1, col, me: k === 0, off: false, fin: 0, max: k === 0 ? 250 : g.by(168, 198, 228) * (.95 + .03 * k) };
      });
      const prog = k => k.lap * N + k.idx;
      let ptr = null, fcount = 0, shake = 0, cd = 0, lastStat = "", endT = 0;
      g.on(c, "pointerdown", e => { ptr = pos(e); });
      g.on(c, "pointermove", e => { if (ptr) ptr = pos(e); });
      g.on(window, "pointerup", () => { ptr = null; });
      g.loop((dt, t) => {
        const go = t > 3, kb = g.keys; cd -= dt; shake = Math.max(0, shake - dt * 20);
        const me = cars[0];
        if (endT > 0) { endT -= dt; if (endT <= 0) { const pl = me.fin; g.score([100, 60, 30, 10][pl - 1]); if (pl === 1) g.win("You won the Grand Prix!"); else g.over("You finished " + pl + (pl === 2 ? "nd" : pl === 3 ? "rd" : "th") + "!"); return false; } }
        cars.forEach(k => {
          let steer = 0, thr = 0;
          if (go) {
            if (k.me) {
              if (endT > 0) { thr = k.v > 20 ? -.4 : 0; }
              else {
                steer = (kb.ArrowRight ? 1 : 0) - (kb.ArrowLeft ? 1 : 0); thr = kb.ArrowUp || kb[" "] ? 1 : kb.ArrowDown ? -1 : 0;
                if (ptr) { const d = wrapA(Math.atan2(ptr.y - k.y, ptr.x - k.x) - k.a); steer = cl(d * 2.5, -1, 1); thr = Math.hypot(ptr.x - k.x, ptr.y - k.y) > 28 ? 1 : 0; }
              }
            } else {
              const tg = CL[(k.idx + 8) % N], d = wrapA(Math.atan2(tg.y - k.y, tg.x - k.x) - k.a), gap = prog(me) - prog(k), mx = k.max * (gap > 25 ? 1.06 : gap < -35 ? .93 : 1);
              steer = cl(d * 3, -1, 1); thr = k.v > mx * (Math.abs(d) > .45 ? .62 : 1) ? -.2 : 1;
            }
          }
          k.a += steer * dt * 3.1 * cl(Math.abs(k.v) / 90, 0, 1) * (k.v < 0 ? -1 : 1);
          k.v += thr * (thr > 0 ? 300 : 420) * dt - k.v * .35 * dt;
          const lim = k.off ? 85 : (k.me ? 250 : 400); if (k.v > lim) k.v -= (k.v - lim) * Math.min(1, dt * 5);
          if (k.v < -70) k.v = -70;
          k.x = cl(k.x + Math.cos(k.a) * k.v * dt, 5, W - 5); k.y = cl(k.y + Math.sin(k.a) * k.v * dt, 5, H - 5);
          const nr = nearIdx(CL, k.x, k.y, k.idx, 7), dI = nr.i - k.idx;
          k.off = nr.d > HW - 2; k.idx = nr.i;
          if (dI < -N / 2) k.lap++; else if (dI > N / 2) k.lap--;
          if (k.lap >= 3 && !k.fin) { k.fin = ++fcount; if (k.me) { endT = 1.6; g.sfx(k.fin === 1 ? "cheer" : "finish"); } }
          if (k.off && Math.abs(k.v) > 40 && Math.random() < dt * 30) burst(ps, k.x, k.y, 1, "#a98b5a", 50, .5);
          if (k.me && thr < 0 && k.v > 80 && Math.random() < dt * 20) burst(ps, k.x - Math.cos(k.a) * 12, k.y - Math.sin(k.a) * 12, 1, "#ddd", 30, .4);
        });
        for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
          const a = cars[i], b = cars[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
          if (d < 22) { const p = (22 - d) / 2, nx = dx / d, ny = dy / d; a.x -= nx * p; a.y -= ny * p; b.x += nx * p; b.y += ny * p; a.v *= .93; b.v *= .93; burst(ps, (a.x + b.x) / 2, (a.y + b.y) / 2, 4, "#ffd34e", 90, .3); if ((i === 0) && cd <= 0) { g.sfx("thump"); shake = 4; cd = .3; } }
        }
        const rank = cars.slice().sort((a, b) => (b.fin ? 1e6 - b.fin : prog(b)) - (a.fin ? 1e6 - a.fin : prog(a))), place = me.fin || rank.indexOf(me) + 1;
        const st = "Lap " + cl(me.lap + 1, 1, 3) + "/3   Place " + place + "/4"; if (st !== lastStat) { lastStat = st; g.status(st); }
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake));
        x.drawImage(tr, 0, 0);
        stepParts(x, ps, dt, 0);
        cars.slice().reverse().forEach(k => { x.save(); x.translate(k.x, k.y); x.rotate(k.a); carShape(x, k.col, 28, 15); if (k.me) { x.strokeStyle = "#fff"; x.lineWidth = 1.5; x.setLineDash([3, 3]); x.beginPath(); x.arc(0, 0, 14, 0, TAU); x.stroke(); x.setLineDash([]); } x.restore(); });
        x.restore();
        say(x, "P" + place, 34, 24, "#fff", 22); say(x, "Lap " + cl(me.lap + 1, 1, 3) + "/3", 600, 24, "#fff", 18, "right");
        if (t < 4) { const n = Math.ceil(3 - t); say(x, t < 3 ? String(n) : "GO!", W / 2, H / 2, t < 3 ? "#ffd34e" : "#6be28f", 72); }
        if (endT > 0) say(x, me.fin === 1 ? "WINNER!" : "Finished " + me.fin + "/4", W / 2, 60, "#fff", 34);
      });
    }
  });

  // ---- Drift King: slide around a loop and bank big drift combos ----
  B.add({
    id: "s10-drift-king", name: "Drift King", ages: [9, 20], cat: "Racing", color: "#b48cff", icon: "DK",
    desc: "Slide around the loop. Long, sideways drifts build a combo. Hit the wall and you lose it.",
    controls: "Left/Right steer (gas is automatic). Hold Space or Shift, or the Drift button, to slide",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 400), N = 180, HW = g.by(54, 46, 40), CL = [];
      for (let i = 0; i < N; i++) { const t = i / N * TAU, k = 1 + .2 * Math.cos(2 * t + .6); CL.push({ x: 320 + 220 * k * Math.cos(t), y: 200 + 118 * k * Math.sin(t) }); }
      const tr = trackCanvas(W, H, CL, HW, "#3b3f6b", "#2d2f3a"), sk = document.createElement("canvas"); sk.width = W; sk.height = H;
      const sx = sk.getContext("2d"); sx.lineCap = "round"; sx.lineWidth = 3;
      const p0 = CL[0], q0 = CL[1], car = { x: p0.x, y: p0.y, a: Math.atan2(q0.y - p0.y, q0.x - p0.x), vx: 0, vy: 0 }, ps = [];
      let st = 0, pend = 0, dT = 0, gap = 0, tl = g.by(70, 60, 50), idx = 0, lap = 0, bestLap = 0, shake = 0, lw = null, fade = 0, msg = "", msgT = 0, wallCd = 0, started = false;
      pad(g, [["Left", "ArrowLeft"], ["Right", "ArrowRight"], ["Drift", "Shift"]]);
      const bank = () => { if (pend > 5) { const m = 1 + Math.min(7, Math.floor(dT / 1.2)), pts = Math.round(pend * m); g.add(pts); popAt(g, c, W, H, "+" + pts, car.x, car.y - 20, "#ffd34e"); g.sfx("clink"); } pend = 0; dT = 0; };
      g.loop((dt, t) => {
        const kb = g.keys, hb = kb[" "] || kb.Shift || kb.ArrowDown; if (kb.ArrowLeft || kb.ArrowRight || hb) started = true;
        shake = Math.max(0, shake - dt * 25); wallCd -= dt; msgT -= dt; fade += dt;
        if (started) tl -= dt;
        if (tl <= 0) { bank(); g.over("Time is up!"); return false; }
        st += (((kb.ArrowRight ? 1 : 0) - (kb.ArrowLeft ? 1 : 0)) - st) * Math.min(1, dt * 8);
        const spd0 = Math.hypot(car.vx, car.vy), ca0 = Math.cos(car.a), sa0 = Math.sin(car.a), vf0 = car.vx * ca0 + car.vy * sa0;
        car.a += st * (hb ? 3.1 : 2.6) * cl(vf0 / 110, -1, 1) * dt;
        const ca = Math.cos(car.a), sa = Math.sin(car.a);
        let vf = car.vx * ca + car.vy * sa, vr = -car.vx * sa + car.vy * ca;
        if (started) vf += 260 * dt;
        vf -= (.3 * vf + .0033 * vf * Math.abs(vf)) * dt; if (hb) vf *= Math.exp(-.5 * dt);
        vr *= Math.exp(-(hb ? 1.5 : 6.5) * dt);
        car.vx = ca * vf - sa * vr; car.vy = sa * vf + ca * vr;
        car.x += car.vx * dt; car.y += car.vy * dt;
        const nr = nearIdx(CL, car.x, car.y, idx, 10), dI = nr.i - idx; idx = nr.i;
        if (dI < -N / 2) { lap++; if (lap > bestLap) { bestLap = lap; tl += 4; msg = "Lap! +4 seconds"; msgT = 1.4; g.sfx("star"); } } else if (dI > N / 2) lap--;
        if (nr.d > HW - 9) {
          const nx = (car.x - CL[idx].x) / (nr.d || 1), ny = (car.y - CL[idx].y) / (nr.d || 1), over = nr.d - (HW - 9);
          car.x -= nx * over; car.y -= ny * over; const vo = car.vx * nx + car.vy * ny;
          if (vo > 0) { car.vx -= 1.35 * vo * nx; car.vy -= 1.35 * vo * ny; car.vx *= .7; car.vy *= .7; }
          if (wallCd <= 0 && vo > 40) { wallCd = .4; shake = 7; g.sfx("thump"); burst(ps, car.x, car.y, 10, "#ffb36b", 160, .4); if (pend > 5) { msg = "Crashed! Combo lost"; msgT = 1.2; g.sfx("wrong"); } pend = 0; dT = 0; }
        }
        const spd = Math.hypot(car.vx, car.vy), slip = Math.abs(Math.atan2(vr, vf)), drifting = spd > 100 && slip > .42 && vf > 0;
        if (drifting) { dT += dt; gap = 0; pend += spd * slip * dt * .35; if (Math.random() < dt * 40) burst(ps, car.x - ca * 12, car.y - sa * 12, 1, "#e8e8ff", 40, .6); }
        else { gap += dt; if (gap > .35 && pend > 0) bank(); }
        if (spd > 60 && slip > .3) {
          const rx = car.x - ca * 11, ry = car.y - sa * 11, w1 = { x: rx - sa * 7, y: ry + ca * 7 }, w2 = { x: rx + sa * 7, y: ry - ca * 7 };
          if (lw) { sx.strokeStyle = "rgba(0,0,0,.4)"; sx.beginPath(); sx.moveTo(lw[0].x, lw[0].y); sx.lineTo(w1.x, w1.y); sx.moveTo(lw[1].x, lw[1].y); sx.lineTo(w2.x, w2.y); sx.stroke(); }
          lw = [w1, w2];
        } else lw = null;
        if (fade > 1.5) { fade = 0; sx.globalCompositeOperation = "destination-out"; sx.fillStyle = "rgba(0,0,0,.25)"; sx.fillRect(0, 0, W, H); sx.globalCompositeOperation = "source-over"; }
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake));
        x.drawImage(tr, 0, 0); x.drawImage(sk, 0, 0); stepParts(x, ps, dt, 0);
        x.save(); x.translate(car.x, car.y); x.rotate(car.a); carShape(x, "#ff5fa2", 30, 16); x.fillStyle = "#fff"; x.fillRect(-14, -9, 3, 18); x.restore();
        x.restore();
        say(x, "Time " + Math.max(0, Math.ceil(tl)), 70, 24, tl < 10 ? "#ff6b6b" : "#fff", 22);
        say(x, "Lap " + (lap + 1), 600, 24, "#fff", 18, "right");
        if (pend > 5) { const m = 1 + Math.min(7, Math.floor(dT / 1.2)); say(x, "DRIFT " + Math.round(pend * m) + "   x" + m, W / 2, 34, "#ffd34e", 26); }
        if (!started) say(x, "Steer or hold Drift to go", W / 2, H / 2 + 80, "#fff", 22);
        if (msgT > 0) say(x, msg, W / 2, H / 2 + 50, "#fff", 22);
        g.status("Time: " + Math.max(0, Math.ceil(tl)));
      });
    }
  });

  // ---- Rocket Lander ----
  B.add({
    id: "s10-rocket-lander", name: "Rocket Lander", ages: [9, 20], cat: "Skill", color: "#ff9a3c", icon: "RL",
    desc: "Fire the thruster against gravity and settle gently onto the glowing pad.",
    controls: "Up or Space = thrust, Left/Right = rotate. On touch use the buttons under the screen",
    start(g) {
      const { c, x, W, H } = g.canvas(400, 600), stars = [], ps = [];
      for (let i = 0; i < 70; i++) stars.push({ x: g.rf(0, W), y: g.rf(0, H * .85), r: g.rf(.5, 1.6), p: g.rf(0, 6) });
      let level = 1, R, T, pad_, fuel, state = "fly", mt = 0, msg = "", shake = 0, wind = 0;
      const th = px => { px = cl(px, 0, W - .01); const i = Math.floor(px / 20); return g.lerp(T[i], T[i + 1], (px - i * 20) / 20); };
      const setup = () => {
        const n = 21; T = []; let h = g.rf(470, 540);
        for (let i = 0; i < n; i++) { h = cl(h + g.rf(-45, 45), 420, 570); T.push(h); }
        const k = Math.max(3, g.by(5, 4, 3) - Math.floor((level - 1) / 3)), a = g.ri(1, n - 1 - k);
        for (let j = a; j <= a + k; j++) T[j] = T[a];
        pad_ = { x0: a * 20, x1: (a + k) * 20, y: T[a] };
        R = { x: g.rf(80, 320), y: 70, vx: g.rf(-25, 25), vy: 0, a: 0, w: 0 }; fuel = g.by(100, 90, 80); state = "fly";
      };
      setup(); pad(g, [["Left", "ArrowLeft"], ["Thrust", "ArrowUp"], ["Right", "ArrowRight"]]);
      const LV = g.by(60, 48, 42), LH = g.by(42, 34, 30), LA = g.by(.45, .33, .26);
      g.loop((dt, t) => {
        const kb = g.keys; shake = Math.max(0, shake - dt * 20);
        if (state === "fly") {
          const G = g.by(52, 64, 72) + Math.min(30, (level - 1) * 4), thr = (kb.ArrowUp || kb[" "]) && fuel > 0, rot = (kb.ArrowRight ? 1 : 0) - (kb.ArrowLeft ? 1 : 0);
          wind = level >= g.by(99, 3, 2) ? Math.sin(t * .5) * Math.min(25, (level - 1) * 6) : 0;
          R.w += rot * 4.2 * dt; R.w *= Math.exp(-.9 * dt); R.a += R.w * dt;
          if (thr) { const Th = g.by(150, 165, 180); R.vx += Math.sin(R.a) * Th * dt; R.vy -= Math.cos(R.a) * Th * dt; fuel = Math.max(0, fuel - 12 * dt); if (Math.random() < .8) ps.push({ x: R.x - Math.sin(R.a) * 20, y: R.y + Math.cos(R.a) * 20, vx: -Math.sin(R.a) * 80 + g.rf(-20, 20), vy: Math.cos(R.a) * 80 + g.rf(-10, 10), life: .5, max: .5, col: g.pick(["#ffd34e", "#ff9a3c", "#fff"]), r: g.rf(3, 6) }); if (Math.random() < dt * 8) g.sfx("rumble"); }
          R.vy += G * dt; R.vx += wind * dt; R.x += R.vx * dt; R.y += R.vy * dt; if (R.x < 0) R.x += W; if (R.x > W) R.x -= W; if (R.y < 10) { R.y = 10; if (R.vy < 0) R.vy = 0; }
          const ca = Math.cos(R.a), sa = Math.sin(R.a), pts = [[-10, 20], [10, 20], [0, -24]]; let hit = -1, lx = [];
          pts.forEach((p, i) => { const wx = R.x + ca * p[0] - sa * p[1], wy = R.y + sa * p[0] + ca * p[1]; lx.push(wx); if (hit < 0 && wy >= th(wx)) hit = i; });
          if (hit >= 0) {
            const onPad = lx[0] >= pad_.x0 - 3 && lx[1] <= pad_.x1 + 3 && lx[0] <= pad_.x1 + 3 && lx[1] >= pad_.x0 - 3, ang = Math.abs(wrapA(R.a));
            if (onPad && hit < 2 && Math.abs(R.vy) < LV && Math.abs(R.vx) < LH && ang < LA) {
              state = "landed"; mt = 1.9; const b = 100 + Math.round(fuel); g.add(b); msg = "Landed! +" + b; g.sfx("cheer"); R.y = pad_.y - 20 * Math.cos(R.a); R.vx = R.vy = R.w = 0; R.a = 0;
              for (let i = 0; i < 30; i++) ps.push({ x: R.x, y: R.y, vx: g.rf(-120, 120), vy: g.rf(-200, -40), life: 1.2, max: 1.2, col: g.pick(["#ff6fb5", "#4cc3ff", "#ffd34e", "#6be28f"]), r: 4 });
            } else {
              state = "crash"; mt = 1.2; shake = 12; g.sfx("boom"); msg = !onPad || hit === 2 ? "Missed the pad!" : ang >= LA ? "Too tilted!" : "Too fast!";
              for (let i = 0; i < 50; i++) ps.push({ x: R.x, y: R.y, vx: g.rf(-200, 200), vy: g.rf(-220, 80), life: g.rf(.5, 1.3), max: 1.3, col: g.pick(["#ff9a3c", "#ffd34e", "#fff", "#aaa"]), r: g.rf(3, 7) });
            }
          }
        } else { mt -= dt; if (mt <= 0) { if (state === "crash") { g.over("Crashed on level " + level + "!"); return false; } level++; setup(); } }
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#080a26"); gr.addColorStop(1, "#33215e"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        stars.forEach(s => { x.globalAlpha = .5 + .5 * Math.sin(t * 2 + s.p); x.fillStyle = "#fff"; x.fillRect(s.x, s.y, s.r, s.r); }); x.globalAlpha = 1;
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake));
        x.beginPath(); x.moveTo(0, H); T.forEach((h, i) => x.lineTo(i * 20, h)); x.lineTo(W, H); x.closePath();
        const tg = x.createLinearGradient(0, 400, 0, H); tg.addColorStop(0, "#9a9fb8"); tg.addColorStop(1, "#4b4f66"); x.fillStyle = tg; x.fill(); x.strokeStyle = "#d4d8ee"; x.lineWidth = 2; x.stroke();
        x.fillStyle = "#6be28f"; x.fillRect(pad_.x0, pad_.y - 3, pad_.x1 - pad_.x0, 5);
        for (let px = pad_.x0; px <= pad_.x1; px += 12) { x.fillStyle = Math.sin(t * 6 + px) > 0 ? "#fff" : "#ffd34e"; x.fillRect(px - 1, pad_.y - 8, 3, 5); }
        stepParts(x, ps, dt, 60);
        if (state !== "crash") {
          x.save(); x.translate(R.x, R.y); x.rotate(R.a);
          x.fillStyle = "#c8ccd8"; x.fillRect(-11, 12, 3, 9); x.fillRect(8, 12, 3, 9); x.fillRect(-13, 20, 7, 2); x.fillRect(6, 20, 7, 2);
          x.fillStyle = "#e8ecf6"; rr(x, -9, -14, 18, 30, 7); x.fill(); x.fillStyle = "#ff4d4d"; x.beginPath(); x.moveTo(-9, -10); x.quadraticCurveTo(0, -34, 9, -10); x.closePath(); x.fill();
          x.fillStyle = "#4cc3ff"; x.beginPath(); x.arc(0, -3, 4.5, 0, TAU); x.fill(); x.fillStyle = "#ff4d4d"; x.beginPath(); x.moveTo(-9, 8); x.lineTo(-17, 18); x.lineTo(-9, 16); x.fill(); x.beginPath(); x.moveTo(9, 8); x.lineTo(17, 18); x.lineTo(9, 16); x.fill();
          if ((kb.ArrowUp || kb[" "]) && fuel > 0 && state === "fly") { x.fillStyle = "#ffd34e"; x.beginPath(); x.moveTo(-5, 16); x.lineTo(0, 30 + g.rf(0, 14)); x.lineTo(5, 16); x.fill(); x.fillStyle = "#ff7a1a"; x.beginPath(); x.moveTo(-3, 16); x.lineTo(0, 24 + g.rf(0, 8)); x.lineTo(3, 16); x.fill(); }
          x.restore();
        }
        x.restore();
        const fl = Math.abs(R.vy) < LV && Math.abs(R.vx) < LH && Math.abs(wrapA(R.a)) < LA;
        x.fillStyle = "rgba(255,255,255,.15)"; rr(x, 10, 10, 120, 12, 6); x.fill(); x.fillStyle = fuel < 25 ? "#ff6b6b" : "#6be28f"; rr(x, 10, 10, Math.max(2, 1.2 * fuel), 12, 6); x.fill();
        say(x, "Fuel", 142, 16, "#fff", 13, "left"); say(x, "Level " + level, W - 10, 16, "#fff", 16, "right");
        say(x, "Fall " + Math.round(R.vy) + "  Side " + Math.round(R.vx), 10, 40, fl ? "#6be28f" : "#ffd34e", 14, "left");
        if (wind) say(x, "Wind " + (wind > 0 ? ">>" : "<<"), W - 10, 38, "#9fd8ff", 14, "right");
        if (state !== "fly") say(x, msg, W / 2, 200, state === "crash" ? "#ff8a8a" : "#b6ffcb", 28);
        g.status("Fuel: " + Math.round(fuel));
      });
    }
  });

  // ---- Hill Climb: a bouncy truck ----
  B.add({
    id: "s10-hill-climb", name: "Hill Climb Truck", ages: [7, 20], cat: "Racing", color: "#6be28f", icon: "HC",
    desc: "Drive a bouncy truck over bigger and bigger hills. Grab coins and fuel, and do not roll over!",
    controls: "Right/Space = gas, Left = brake, Up/Down = tilt in the air. Touch: buttons under the screen",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 400), ps = [];
      const p1 = g.rf(0, 6), p2 = g.rf(0, 6), p3 = g.rf(0, 6), amp = g.by(.75, 1, 1.2);
      const hf = px => { const A = (34 + Math.min(100, Math.max(0, px) / 45)) * amp, e = cl((px - 250) / 300, 0, 1); return 300 + e * A * (.55 * Math.sin(px / 170 + p1) + .25 * Math.sin(px / 95 + p2) + .1 * Math.sin(px / 55 + p3)); };
      const C = { L: 30, oy: 14, R: 13, k: 90, c: 4.2, I: 1900, grav: 720, drive: 560, vmax: 330, roll: .35, air: 5.5, ad: .8, awd: true };
      const r = { x: 120, y: hf(120) - 20, a: 0, vx: 0, vy: 0, w: 0, wc: [0, 0], ws: [0, 0], wa: [0, 0] };
      const coins = [], cans = []; let nextC = 420, nextF = g.by(950, 1100, 1250), camX = 0, camY = 0, fuel = 100, coinsN = 0, maxX = 0, crash = 0, still = 0, shake = 0, wasAir = false;
      pad(g, [["Brake", "ArrowLeft"], ["Gas", "ArrowRight"], ["Tilt back", "ArrowUp"], ["Tilt fwd", "ArrowDown"]]);
      g.loop((dt, t) => {
        const kb = g.keys; shake = Math.max(0, shake - dt * 18);
        if (!crash) {
          const gas = (kb.ArrowRight || kb[" "]) && fuel > 0, tilt = (kb.ArrowDown ? 1 : 0) - (kb.ArrowUp ? 1 : 0);
          rigStep(r, dt, { gas, brake: kb.ArrowLeft, tilt }, hf, C);
          fuel -= dt * (gas ? g.by(5, 6.5, 8) : 1.2);
          if (wasAir && !r.air && r.vy > -50) { shake = 4; g.sfx("thump"); } wasAir = r.air;
          [[-4, -24], [18, -22]].forEach(p => { const ca = Math.cos(r.a), sa = Math.sin(r.a), wx = r.x + ca * p[0] - sa * p[1], wy = r.y + sa * p[0] + ca * p[1]; if (!crash && wy > hf(wx) - 3) { crash = 1; shake = 12; g.sfx("boom"); burst(ps, r.x, r.y, 30, "#e5484d", 220, .9); } });
          if (gas && r.wc[0] && Math.random() < dt * 30) burst(ps, r.x - 40, r.y + 12, 1, "#caa56a", 50, .5);
          if (fuel <= 0) { fuel = 0; if (Math.abs(r.vx) < 12) still += dt; else still = 0; if (still > 1.2) { crash = 2; g.sfx("sad"); } }
          maxX = Math.max(maxX, r.x);
          while (nextC < r.x + 800) { coins.push({ x: nextC, y: hf(nextC) - g.rf(40, 100) }); nextC += g.rf(110, 190); }
          if (nextF < r.x + 800) { cans.push({ x: nextF, y: hf(nextF) - 50 }); nextF += g.by(950, 1100, 1250); }
          for (let i = coins.length - 1; i >= 0; i--) { const q = coins[i]; if (q.x < r.x - 400) { coins.splice(i, 1); continue; } if (Math.hypot(q.x - r.x, q.y - r.y) < 32) { coins.splice(i, 1); coinsN++; g.sfx("clink"); burst(ps, q.x, q.y, 6, "#ffd34e", 80, .4); } }
          for (let i = cans.length - 1; i >= 0; i--) { const q = cans[i]; if (q.x < r.x - 400) { cans.splice(i, 1); continue; } if (Math.hypot(q.x - r.x, q.y - r.y) < 34) { cans.splice(i, 1); fuel = Math.min(100, fuel + 45); g.sfx("pick"); popAt(g, c, W, H, "+Fuel", 200, 120, "#ff8a8a"); } }
          g.score(Math.floor((maxX - 120) / 25) + coinsN * 5);
        } else { crash += dt; if (crash > 1.6 && crash < 100) { g.over(crash < 100 && fuel <= 0 ? "Out of fuel!" : "Rolled over!"); return false; } }
        camX += (r.x - 200 - camX) * Math.min(1, dt * 6); camY += (r.y - 230 - camY) * Math.min(1, dt * 3);
        const sky = x.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "#58b8ff"); sky.addColorStop(1, "#d5f1ff"); x.fillStyle = sky; x.fillRect(0, 0, W, H);
        x.fillStyle = "#9fd4a8"; x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W; px += 20) x.lineTo(px, 250 + 40 * Math.sin((px + camX * .3) / 110) + 18 * Math.sin((px + camX * .3) / 47) - camY * .15); x.lineTo(W, H); x.fill();
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake)); x.translate(-camX, -camY);
        x.beginPath(); x.moveTo(camX - 10, camY + H + 60); for (let px = camX - 10; px <= camX + W + 14; px += 10) x.lineTo(px, hf(px)); x.lineTo(camX + W + 14, camY + H + 60); x.closePath();
        const dg = x.createLinearGradient(0, camY + 100, 0, camY + H + 60); dg.addColorStop(0, "#8a5a2e"); dg.addColorStop(1, "#4a2f18"); x.fillStyle = dg; x.fill();
        x.beginPath(); for (let px = camX - 10; px <= camX + W + 14; px += 10) px === camX - 10 ? x.moveTo(px, hf(px)) : x.lineTo(px, hf(px)); x.lineWidth = 7; x.strokeStyle = "#4cc96a"; x.lineJoin = "round"; x.stroke();
        coins.forEach(q => { x.fillStyle = "#ffd34e"; x.beginPath(); x.ellipse(q.x, q.y, 9 * Math.abs(Math.cos(t * 3 + q.x)), 9, 0, 0, TAU); x.fill(); x.strokeStyle = "#c79a14"; x.lineWidth = 2; x.stroke(); });
        cans.forEach(q => { x.fillStyle = "#e5484d"; rr(x, q.x - 11, q.y - 13, 22, 26, 4); x.fill(); x.fillStyle = "#fff"; x.fillRect(q.x - 5, q.y - 3, 10, 4); x.fillRect(q.x - 2, q.y - 8, 4, 14); });
        stepParts(x, ps, dt, 200);
        const ca = Math.cos(r.a), sa = Math.sin(r.a);
        [-1, 1].forEach((s, i) => {
          const wx = r.x + ca * s * C.L - sa * C.oy, wy = r.y + sa * s * C.L + ca * C.oy; r.wa[i] += r.ws[i] * dt;
          x.save(); x.translate(wx, wy); x.rotate(r.wa[i]); x.fillStyle = "#222"; x.beginPath(); x.arc(0, 0, C.R, 0, TAU); x.fill(); x.fillStyle = "#bbb"; x.beginPath(); x.arc(0, 0, 6, 0, TAU); x.fill(); x.fillStyle = "#555"; x.fillRect(-1.5, -6, 3, 12); x.restore();
        });
        x.save(); x.translate(r.x, r.y); x.rotate(r.a);
        x.fillStyle = "#b8353a"; rr(x, -42, -12, 44, 18, 3); x.fill(); x.fillStyle = "#e5484d"; rr(x, 2, -26, 34, 32, 5); x.fill(); rr(x, 30, -6, 16, 12, 3); x.fill();
        x.fillStyle = "#bfe8ff"; rr(x, 8, -22, 20, 13, 3); x.fill(); x.fillStyle = "#ffe066"; x.fillRect(43, -4, 4, 5); x.fillStyle = "#444"; x.fillRect(-44, 2, 6, 5); x.fillRect(40, 3, 7, 4);
        x.restore(); x.restore();
        x.fillStyle = "rgba(255,255,255,.2)"; rr(x, 10, 10, 120, 12, 6); x.fill(); x.fillStyle = fuel < 25 ? "#ff6b6b" : "#ffd34e"; rr(x, 10, 10, Math.max(2, 1.2 * fuel), 12, 6); x.fill();
        say(x, "Fuel", 142, 16, "#123", 13, "left"); say(x, Math.floor((maxX - 120) / 25) + " m", W - 10, 18, "#123", 18, "right");
        g.status("Coins: " + coinsN);
      });
    }
  });

  // ---- River Dodge: speedboat down a winding river ----
  B.add({
    id: "s10-river-dodge", name: "River Dodge", ages: [6, 14], cat: "Racing", color: "#2fb6ff", icon: "RD",
    desc: "Steer your speedboat down the winding river. Dodge rocks and logs and grab the gems!",
    controls: "Left/Right or A/D to steer, or hold and drag on the screen",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(400, 600), BY = 470, items = [], ps = [];
      let D = 0, bx = 200, vx = 0, lives = g.by(5, 4, 3), inv = 0, shake = 0, nextD = 450, gems = 0, ptr = null, sp = 0;
      const cxr = d => 200 + 60 * Math.sin(d * .0035) + 28 * Math.sin(d * .011 + 1), hw = d => Math.max(g.by(95, 85, 78), g.by(135, 125, 115) - d / 260), hash = k => ((k * 9301 + 49297) % 233280) / 233280;
      g.status("Lives: " + lives);
      g.on(c, "pointerdown", e => { ptr = pos(e); }); g.on(c, "pointermove", e => { if (ptr) ptr = pos(e); }); g.on(window, "pointerup", () => { ptr = null; });
      const spawn = () => {
        while (nextD < D + 720) {
          const d = nextD, cc = cxr(d), half = hw(d) - 22, r = Math.random(), gap = g.by(250, 215, 185) * (1 - Math.min(.35, D / 9000));
          if (r < .5) { const x1 = cc + g.rf(-half, half); items.push({ t: "rock", d, x: x1, r: g.rf(16, 24) }); if (Math.random() < g.by(.3, .5, .7)) { let x2 = cc + g.rf(-half, half); if (Math.abs(x2 - x1) > 120) items.push({ t: "rock", d, x: x2, r: g.rf(16, 22) }); } }
          else if (r < .8) items.push({ t: "log", d, x: cc + g.rf(-half * .6, half * .6), w: g.rf(80, 110), vx: g.rf(-18, 18) });
          else for (let k = -1; k <= 1; k++) items.push({ t: "gem", d: d + k * 40, x: cc + g.rf(-half * .5, half * .5) * 0 + k * 0 + g.rf(-20, 20), r: 11 });
          if (Math.random() < .55) items.push({ t: "gem", d: d + gap * .5, x: cxr(d + gap * .5) + g.rf(-half * .6, half * .6), r: 11 });
          nextD += gap * g.rf(.85, 1.15);
        }
      };
      const hurt = (dir, why) => {
        if (inv > 0) return; lives--; inv = 1.6; shake = 9; vx = dir * 200; g.sfx("thump"); g.status("Lives: " + lives); burst(ps, bx, BY, 14, "#fff", 160, .6);
        if (lives <= 0) { g.sfx("splash"); g.over("Splash! " + why); return true; }
      };
      g.loop((dt, t) => {
        const kb = g.keys; inv -= dt; shake = Math.max(0, shake - dt * 20);
        sp = g.by(150, 185, 220) + Math.min(130, t * 3.5); D += sp * dt; spawn();
        let ax = ((kb.ArrowRight ? 1 : 0) - (kb.ArrowLeft ? 1 : 0)) * 1100; if (ptr) ax = cl((ptr.x - bx) * 10, -1100, 1100);
        vx += ax * dt; vx *= Math.exp(-2.4 * dt); vx = cl(vx, -320, 320); bx += vx * dt;
        const L = cxr(D) - hw(D), Rr = cxr(D) + hw(D);
        if (bx < L + 14) { bx = L + 14; if (vx < 0) { vx = 0; if (hurt(1, "You hit the bank.")) return false; } }
        if (bx > Rr - 14) { bx = Rr - 14; if (vx > 0) { vx = 0; if (hurt(-1, "You hit the bank.")) return false; } }
        for (let i = items.length - 1; i >= 0; i--) {
          const it = items[i], y = BY - (it.d - D); if (y > H + 60) { items.splice(i, 1); continue; }
          if (it.t === "log") it.x += it.vx * dt;
          if (it.t === "gem") { if (Math.hypot(it.x - bx, y - BY) < 24) { items.splice(i, 1); gems++; g.sfx("clink"); burst(ps, it.x, y, 8, "#7ff", 120, .5); popAt(g, c, W, H, "+5", it.x, y, "#7ff"); } continue; }
          if (it.t === "rock") { if (Math.hypot(it.x - bx, y - BY) < it.r + 9 || Math.hypot(it.x - bx, y - (BY + 14)) < it.r + 9) { if (hurt(bx < it.x ? -1 : 1, "You hit a rock.")) return false; } }
          else if (Math.abs(y - BY) < 20 && Math.abs(bx - it.x) < it.w / 2 + 8) { if (hurt(bx < it.x ? -1 : 1, "You hit a log.")) return false; }
        }
        g.score(Math.floor(D / 20) + gems * 5);
        if (Math.random() < dt * 60) ps.push({ x: bx + g.rf(-5, 5), y: BY + 26, vx: g.rf(-30, 30) - vx * .2, vy: sp * .9, life: .6, max: .6, col: "#fff", r: g.rf(3, 6) });
        x.fillStyle = "#3f9d4a"; x.fillRect(0, 0, W, H);
        x.beginPath(); for (let y = 0; y <= H; y += 10) { const d = D + BY - y; x.lineTo(cxr(d) - hw(d), y); } for (let y = H; y >= 0; y -= 10) { const d = D + BY - y; x.lineTo(cxr(d) + hw(d), y); } x.closePath();
        const wg = x.createLinearGradient(0, 0, 0, H); wg.addColorStop(0, "#2c8fe0"); wg.addColorStop(1, "#58c4ff"); x.fillStyle = wg; x.fill(); x.lineWidth = 5; x.strokeStyle = "#e8d9a0"; x.stroke();
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake));
        for (let k = Math.floor((D - 100) / 60); k < Math.floor((D + BY + 60) / 60); k++) {
          const d = k * 60, y = BY - (d - D), side = k % 2 ? 1 : -1, ex = cxr(d) + side * (hw(d) + 18 + hash(k) * 70);
          x.fillStyle = "#1f6f35"; x.beginPath(); x.moveTo(ex, y - 28); x.lineTo(ex + 15, y + 6); x.lineTo(ex - 15, y + 6); x.fill(); x.fillStyle = "#6b4a2a"; x.fillRect(ex - 2, y + 6, 4, 6);
        }
        x.strokeStyle = "rgba(255,255,255,.35)"; x.lineWidth = 2;
        for (let k = 0; k < 14; k++) { const y = ((k * 47 + D * .9) % (H + 40)) - 20, d = D + BY - y, px = cxr(d) + Math.sin(k * 7.3) * hw(d) * .8; x.beginPath(); x.moveTo(px - 8, y); x.quadraticCurveTo(px, y - 4, px + 8, y); x.stroke(); }
        items.forEach(it => {
          const y = BY - (it.d - D);
          if (it.t === "rock") { x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(it.x + 4, y + 5, it.r, it.r * .8, 0, 0, TAU); x.fill(); x.fillStyle = "#7d8290"; x.beginPath(); x.arc(it.x, y, it.r, 0, TAU); x.fill(); x.fillStyle = "#a6abb8"; x.beginPath(); x.arc(it.x - it.r * .3, y - it.r * .3, it.r * .5, 0, TAU); x.fill(); }
          else if (it.t === "log") { x.fillStyle = "rgba(0,0,0,.2)"; rr(x, it.x - it.w / 2 + 3, y - 6, it.w, 20, 9); x.fill(); x.fillStyle = "#8a5a2e"; rr(x, it.x - it.w / 2, y - 9, it.w, 20, 9); x.fill(); x.fillStyle = "#b07a42"; x.beginPath(); x.ellipse(it.x - it.w / 2 + 6, y + 1, 5, 8, 0, 0, TAU); x.fill(); x.strokeStyle = "#5e3a1a"; x.lineWidth = 2; x.beginPath(); x.moveTo(it.x - 10, y - 3); x.lineTo(it.x + 20, y - 3); x.stroke(); }
          else { const s = 1 + .15 * Math.sin(t * 6 + it.d); x.fillStyle = "#7ff"; x.beginPath(); x.moveTo(it.x, y - 12 * s); x.lineTo(it.x + 9 * s, y); x.lineTo(it.x, y + 12 * s); x.lineTo(it.x - 9 * s, y); x.closePath(); x.fill(); x.strokeStyle = "#fff"; x.lineWidth = 2; x.stroke(); }
        });
        stepParts(x, ps, dt, 0);
        if (inv <= 0 || Math.floor(inv * 12) % 2) {
          x.save(); x.translate(bx, BY); x.rotate(vx / 600); x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(3, 4, 14, 28, 0, 0, TAU); x.fill();
          x.fillStyle = "#fff"; x.beginPath(); x.moveTo(0, -30); x.quadraticCurveTo(15, -8, 13, 24); x.lineTo(-13, 24); x.quadraticCurveTo(-15, -8, 0, -30); x.fill();
          x.fillStyle = "#ff4d4d"; x.beginPath(); x.moveTo(0, -30); x.quadraticCurveTo(8, -18, 0, -6); x.quadraticCurveTo(-8, -18, 0, -30); x.fill(); x.fillRect(-13, 14, 26, 6);
          x.fillStyle = "#4cc3ff"; rr(x, -7, -2, 14, 12, 4); x.fill(); x.restore();
        }
        x.restore();
        say(x, Math.floor(D / 20) + " m", 10, 18, "#fff", 18, "left");
      });
    }
  });

  // ---- Paper Glider: ride the wind ----
  B.add({
    id: "s10-paper-glider", name: "Paper Glider", ages: [7, 20], cat: "Skill", color: "#ffd34e", icon: "PG",
    desc: "Fly a paper plane as far as you can. Dive for speed, climb with warm air, and catch the rings.",
    controls: "Up/Down (or W/S) to pitch. Mouse or finger: the nose points toward your pointer",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), zones = [], rings = [], ps = [], trail = [], clouds = [];
      for (let i = 0; i < 8; i++) clouds.push({ x: g.rf(0, 900), y: g.rf(30, 200), s: g.rf(.6, 1.4) });
      const P = { x: 0, y: 110, s: 190, f: .1 }, gh = px => 352 + 22 * Math.sin(px * .006) + 11 * Math.sin(px * .017 + 1);
      let nextZ = 420, zc = 0, nextR = 520, ptr = null, ringsN = 0, dead = 0, shake = 0, camX = 0, tt = 0, stall = false, bank = 0;
      const S = { up: g.by(150, 130, 115), down: g.by(60, 80, 100), head: g.by(60, 80, 100), tail: 80 };
      g.on(c, "pointerdown", e => { ptr = pos(e); }); g.on(c, "pointermove", e => { if (e.pointerType === "mouse" || ptr) ptr = pos(e); });
      g.on(c, "pointerup", e => { if (e.pointerType !== "mouse") ptr = null; }); g.on(c, "pointerleave", () => { ptr = null; });
      g.loop((dt, t) => {
        const kb = g.keys; shake = Math.max(0, shake - dt * 20);
        while (nextZ < P.x + 900) { const type = zc % 2 === 0 ? "up" : g.pick(["down", "head", "tail"]); zones.push({ x: nextZ, hw: type === "up" ? g.rf(90, 120) : g.rf(70, 100), type, ph: g.rf(0, 6) }); zc++; nextZ += g.rf(380, 520) * g.by(.85, 1, 1.15); }
        while (nextR < P.x + 900) { rings.push({ x: nextR, y: g.rf(80, 290) }); nextR += g.rf(220, 420); }
        if (!dead) {
          tt += dt; let tp = (kb.ArrowDown ? .75 : 0) - (kb.ArrowUp ? .75 : 0) || .12; if (ptr) tp = cl((ptr.y - P.y) / 90, -1, 1) * .85;
          let wx = 0, wy = 0; zones.forEach(z => { const dx = Math.abs(P.x - z.x); if (dx < z.hw) { const f = 1 - (dx / z.hw) * (dx / z.hw); if (z.type === "up") wy -= S.up * f; else if (z.type === "down") wy += S.down * f; else if (z.type === "head") wx -= S.head * f; else wx += S.tail * f; } });
          P.f += (tp - P.f) * Math.min(1, dt * 4);
          stall = P.s < 85; if (stall) P.f = Math.max(P.f, .55);
          P.s = cl(P.s + (380 * Math.sin(P.f) + (170 - P.s) * 1.5) * dt, 40, 360);
          const vx = P.s * Math.cos(P.f) + wx, vy = P.s * Math.sin(P.f) + g.by(14, 20, 26) + wy;
          bank += (cl(wy / 120, -1, 1) * .3 - bank) * dt * 3;
          P.x += vx * dt; P.y += vy * dt; if (P.y < 14) { P.y = 14; if (P.f < 0) P.f *= .5; }
          if (Math.random() < dt * 14) trail.push({ x: P.x, y: P.y, l: 1 });
          for (let i = rings.length - 1; i >= 0; i--) { const q = rings[i]; if (q.x < P.x - 300) { rings.splice(i, 1); continue; } if (Math.hypot(q.x - P.x, q.y - P.y) < 28) { rings.splice(i, 1); ringsN++; g.sfx("star"); burst(ps, q.x, q.y, 14, "#ffd34e", 160, .6); popAt(g, c, W, H, "+10", q.x - camX, q.y, "#ffd34e"); } }
          for (let i = zones.length - 1; i >= 0; i--) if (zones[i].x < P.x - 400) zones.splice(i, 1);
          if (P.y + 5 > gh(P.x)) { dead = 1; shake = 8; g.sfx("thump"); burst(ps, P.x, P.y, 20, "#fff", 140, .7); }
          g.score(Math.floor(P.x / 15) + ringsN * 10);
        } else { dead += dt; P.y = Math.min(P.y + 60 * dt, gh(P.x) - 2); if (dead > 1.4) { g.over("Landed after " + Math.floor(P.x / 15) + " m"); return false; } }
        camX = P.x - 170;
        const sky = x.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "#4aa8ff"); sky.addColorStop(1, "#d8f0ff"); x.fillStyle = sky; x.fillRect(0, 0, W, H);
        x.fillStyle = "#fff8c0"; x.beginPath(); x.arc(540, 60, 32, 0, TAU); x.fill();
        clouds.forEach(cd => { const px = ((cd.x - camX * .3) % 1000 + 1000) % 1000 - 180; x.fillStyle = "rgba(255,255,255,.85)"; x.beginPath(); x.arc(px, cd.y, 22 * cd.s, 0, TAU); x.arc(px + 22 * cd.s, cd.y + 4, 18 * cd.s, 0, TAU); x.arc(px - 22 * cd.s, cd.y + 5, 16 * cd.s, 0, TAU); x.fill(); });
        x.fillStyle = "#9cc9a3"; x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W; px += 20) x.lineTo(px, 315 + 25 * Math.sin((px + camX * .5) / 130)); x.lineTo(W, H); x.fill();
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake)); x.translate(-camX, 0);
        zones.forEach(z => {
          if (z.x + z.hw < camX || z.x - z.hw > camX + W) return;
          const up = z.type === "up", dn = z.type === "down", ver = up || dn, col = up ? "255,170,40" : dn ? "90,120,255" : "255,255,255";
          if (ver) { const gg = x.createLinearGradient(z.x - z.hw, 0, z.x + z.hw, 0); gg.addColorStop(0, "rgba(" + col + ",0)"); gg.addColorStop(.5, "rgba(" + col + ",.28)"); gg.addColorStop(1, "rgba(" + col + ",0)"); x.fillStyle = gg; x.fillRect(z.x - z.hw, 0, z.hw * 2, 360); }
          x.strokeStyle = "rgba(" + col + ",.8)"; x.lineWidth = 3;
          for (let k = 0; k < 6; k++) {
            if (ver) { const yy = ((k * 70 + t * (up ? -90 : 90) + z.ph * 40) % 420 + 420) % 420 - 30, xx = z.x + Math.sin(k * 2 + z.ph) * z.hw * .45; x.beginPath(); x.moveTo(xx - 10, yy + (up ? 10 : -10)); x.lineTo(xx, yy); x.lineTo(xx + 10, yy + (up ? 10 : -10)); x.stroke(); }
            else { const dir = z.type === "tail" ? 1 : -1, xx = z.x - z.hw + ((k * 60 + t * 120 * dir + z.ph * 50) % (z.hw * 2) + z.hw * 2) % (z.hw * 2), yy = 60 + k * 46; x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx + dir * 26, yy); x.stroke(); }
          }
        });
        x.beginPath(); x.moveTo(camX - 5, H); for (let px = camX - 5; px <= camX + W + 10; px += 10) x.lineTo(px, gh(px)); x.lineTo(camX + W + 10, H); x.closePath(); x.fillStyle = "#5cc46a"; x.fill();
        x.fillStyle = "#3f9d4a"; x.fillRect(camX - 5, 385, W + 20, 15);
        rings.forEach(q => { x.strokeStyle = "#ffd34e"; x.lineWidth = 5; x.beginPath(); x.ellipse(q.x, q.y, 9, 26, 0, 0, TAU); x.stroke(); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 2; x.stroke(); });
        for (let i = trail.length - 1; i >= 0; i--) { const q = trail[i]; q.l -= dt * 1.2; if (q.l <= 0) { trail.splice(i, 1); continue; } x.globalAlpha = q.l * .6; x.fillStyle = "#fff"; x.beginPath(); x.arc(q.x, q.y, 2.5, 0, TAU); x.fill(); } x.globalAlpha = 1;
        stepParts(x, ps, dt, 0);
        x.save(); x.translate(P.x, P.y); x.rotate(dead ? Math.sin(dead * 6) * .5 : P.f * .8);
        x.fillStyle = "#e0e6f5"; x.beginPath(); x.moveTo(20, 0); x.lineTo(-14, 6 + bank * 6); x.lineTo(-8, 1); x.closePath(); x.fill();
        x.fillStyle = "#fff"; x.beginPath(); x.moveTo(20, 0); x.lineTo(-14, -9 + bank * 6); x.lineTo(-6, 0); x.closePath(); x.fill(); x.strokeStyle = "#9aa3bd"; x.lineWidth = 1; x.stroke();
        x.restore(); x.restore();
        const alt = Math.max(0, Math.round((gh(P.x) - P.y) / 3));
        say(x, Math.floor(P.x / 15) + " m", 10, 18, "#123", 18, "left"); say(x, "Height " + alt, W - 10, 18, "#123", 16, "right");
        x.fillStyle = "rgba(0,0,0,.2)"; rr(x, 10, 34, 90, 8, 4); x.fill(); x.fillStyle = stall ? "#ff5555" : "#6be28f"; rr(x, 10, 34, Math.max(3, 90 * (P.s - 40) / 320), 8, 4); x.fill();
        if (stall) say(x, "Stall! Nose down!", W / 2, 60, "#ff5555", 24);
        else if (tt < 4) say(x, "Look for orange warm-air columns!", W / 2, 60, "#123", 18);
        g.status("Rings: " + ringsN);
      });
    }
  });

  // ---- Parking Pro ----
  B.add({
    id: "s10-parking-pro", name: "Parking Pro", ages: [8, 20], cat: "Skill", color: "#4cc3ff", icon: "P",
    desc: "Drive into the glowing space without bumping the parked cars. Every level is a tighter squeeze.",
    controls: "Up/Down = go and reverse, Left/Right = steer. Stop inside the green space. Touch: buttons below",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 400), CARL = 44, CARW = 22, LIVES = g.by(5, 4, 3), ps = [];
      let level = 0, car, obs = [], bays = [], target = 0, tl = 0, bumps = 0, hold = 0, cool = 0, st = 0, shake = 0, freeze = 0, flash = 0, lvlBumps = 0, bayW = 70;
      const COLS = ["#ffd34e", "#6be28f", "#b48cff", "#ff8a2a", "#9fd8ff", "#ff6fb5"];
      const build = () => {
        bayW = g.by(48, 40, 36) - Math.min(level, 2); const n = Math.floor((W - 40) / bayW), x0 = (W - n * bayW) / 2; bays = []; obs = []; target = g.ri(0, n - 1);
        for (let i = 0; i < n; i++) { const bx = x0 + i * bayW; bays.push({ x: bx, y: 6, w: bayW, h: 94 }); if (i !== target) obs.push({ x: bx + (bayW - CARW) / 2 + g.rf(-2, 2), y: 20, w: CARW, h: CARL, col: g.pick(COLS), car: true }); }
        car = { x: g.rf(140, 500), y: 345, a: g.pick([0, Math.PI, .2, Math.PI - .2]), v: 0 };
        const cones = Math.min(5, level + (g.diff > 1 ? 1 : 0));
        for (let k = 0; k < cones; k++) { let px, py, tries = 0; do { px = g.rf(40, W - 50); py = g.rf(170, 330); tries++; } while (tries < 30 && (Math.hypot(px - car.x, py - car.y) < 90)); obs.push({ x: px, y: py, w: 13, h: 13, cone: true }); }
        tl = Math.max(30, g.by(70, 55, 45) - level * 2); hold = 0; lvlBumps = 0; st = 0;
      };
      build(); pad(g, [["Left", "ArrowLeft"], ["Right", "ArrowRight"], ["Back", "ArrowDown"], ["Go", "ArrowUp"]]);
      g.status("Bumps left: " + (LIVES - bumps));
      const corners = () => { const ca = Math.cos(car.a), sa = Math.sin(car.a), hl = CARL / 2, hw = CARW / 2; return [[hl, hw], [hl, -hw], [-hl, hw], [-hl, -hw], [hl, 0], [-hl, 0], [0, hw], [0, -hw]].map(q => ({ x: car.x + ca * q[0] - sa * q[1], y: car.y + sa * q[0] + ca * q[1] })); };
      const hits = () => {
        const pts = corners(), ca = Math.cos(car.a), sa = Math.sin(car.a);
        if (pts.some(p => p.x < 3 || p.x > W - 3 || p.y > H - 3 || p.y < 3 || obs.some(o => p.x > o.x && p.x < o.x + o.w && p.y > o.y && p.y < o.y + o.h))) return true;
        return obs.some(o => [[o.x, o.y], [o.x + o.w, o.y], [o.x, o.y + o.h], [o.x + o.w, o.y + o.h]].some(q => { const dx = q[0] - car.x, dy = q[1] - car.y, u = dx * ca + dy * sa, v = -dx * sa + dy * ca; return Math.abs(u) < CARL / 2 && Math.abs(v) < CARW / 2; }));
      };
      g.loop((dt, t) => {
        const kb = g.keys; cool -= dt; shake = Math.max(0, shake - dt * 20); flash = Math.max(0, flash - dt * 3);
        if (freeze > 0) { freeze -= dt; if (freeze <= 0) build(); }
        else {
          tl -= dt; if (tl <= 0) { g.over("Out of time!"); return false; }
          const thr = (kb.ArrowUp ? 1 : 0) - (kb.ArrowDown ? 1 : 0); st += ((((kb.ArrowRight ? 1 : 0) - (kb.ArrowLeft ? 1 : 0)) * .62) - st) * Math.min(1, dt * 7);
          if (thr) car.v += thr * (thr * car.v < 0 ? 380 : 170) * dt; else car.v -= Math.sign(car.v) * Math.min(Math.abs(car.v), 100 * dt);
          car.v = cl(car.v, -90, 130);
          const ox = car.x, oy = car.y, oa = car.a;
          car.a += car.v / 28 * Math.tan(st) * dt; car.x += Math.cos(car.a) * car.v * dt; car.y += Math.sin(car.a) * car.v * dt;
          if (hits()) {
            car.x = ox; car.y = oy; car.a = oa; const sv = Math.abs(car.v); car.v = -car.v * .3;
            if (cool <= 0 && sv > 8) { cool = .7; bumps++; lvlBumps++; shake = 7; flash = 1; g.sfx("thump"); burst(ps, car.x, car.y, 12, "#fff", 140, .4); g.status("Bumps left: " + (LIVES - bumps)); if (bumps >= LIVES) { g.over("Too many bumps!"); return false; } }
          }
          const b = bays[target], ca = Math.cos(car.a), inside = corners().slice(0, 4).every(p => p.x > b.x + 2 && p.x < b.x + b.w - 2 && p.y > b.y && p.y < b.y + b.h - 2);
          if (inside && Math.abs(ca) < .22 && Math.abs(car.v) < 10) hold += dt; else hold = 0;
          if (hold > .6) { const pts = 100 + Math.round(tl * 2) + (lvlBumps === 0 ? 50 : 0); g.add(pts); popAt(g, c, W, H, "Parked! +" + pts, car.x, car.y - 30, "#6be28f"); g.sfx("cheer"); burst(ps, car.x, car.y, 30, "#6be28f", 200, .9); level++; freeze = 1.2; hold = 0; }
        }
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#3a3d4a"); bg.addColorStop(1, "#2a2c37"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake));
        x.fillStyle = "#4a4e5e"; x.fillRect(0, 0, W, 104); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 2;
        bays.forEach((b, i) => { x.beginPath(); x.moveTo(b.x, b.y); x.lineTo(b.x, b.y + b.h); x.moveTo(b.x + b.w, b.y); x.lineTo(b.x + b.w, b.y + b.h); x.stroke(); });
        const tb = bays[target], pulse = .3 + .15 * Math.sin(t * 5); x.fillStyle = "rgba(107,226,143," + pulse + ")"; x.fillRect(tb.x + 1, tb.y, tb.w - 2, tb.h); x.strokeStyle = "#6be28f"; x.lineWidth = 3; x.strokeRect(tb.x + 1, tb.y + 1, tb.w - 2, tb.h - 2);
        say(x, "P", tb.x + tb.w / 2, tb.y + tb.h - 18, "rgba(255,255,255,.7)", 26);
        if (hold > 0) { x.fillStyle = "#6be28f"; x.fillRect(tb.x + 4, tb.y + tb.h - 6, (tb.w - 8) * Math.min(1, hold / .6), 4); }
        obs.forEach(o => {
          if (o.cone) { x.fillStyle = "rgba(0,0,0,.25)"; x.fillRect(o.x + 2, o.y + 3, o.w, o.h); x.fillStyle = "#ff7a1a"; x.beginPath(); x.moveTo(o.x + o.w / 2, o.y - 3); x.lineTo(o.x + o.w, o.y + o.h); x.lineTo(o.x, o.y + o.h); x.fill(); x.fillStyle = "#fff"; x.fillRect(o.x + 3, o.y + o.h * .55, o.w - 6, 3); }
          else { x.save(); x.translate(o.x + o.w / 2, o.y + o.h / 2); x.rotate(-Math.PI / 2); carShape(x, o.col, o.h, o.w); x.restore(); }
        });
        stepParts(x, ps, dt, 0);
        x.save(); x.translate(car.x, car.y); x.rotate(car.a); carShape(x, "#2f8bff", CARL, CARW); x.restore();
        x.restore();
        if (flash > 0) { x.fillStyle = "rgba(255,60,60," + flash * .25 + ")"; x.fillRect(0, 0, W, H); }
        say(x, "Time " + Math.max(0, Math.ceil(tl)), 70, H - 18, tl < 10 ? "#ff6b6b" : "#fff", 20); say(x, "Level " + (level + 1), W - 20, H - 18, "#fff", 18, "right");
        if (freeze > 0) say(x, "Nice parking!", W / 2, 220, "#b6ffcb", 32);
      });
    }
  });

  // ---- Motocross Stunts ----
  B.add({
    id: "s10-moto-stunts", name: "Motocross Stunts", ages: [9, 20], cat: "Racing", color: "#ff7a1a", icon: "MX",
    desc: "Jump the gaps, land the flips and ride all the way to the finish flag.",
    controls: "Right/Space = gas, Left = brake, Up/Down = lean in the air. Touch: buttons below",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 400), ps = [], pts = [{ x: -300, y: 300 }, { x: 0, y: 300 }], pits = [], cps = [0];
      let cx = 0, cy = 300;
      const flat = len => { cx += len; pts.push({ x: cx, y: cy }); };
      const ramp = (len, dy) => { const n = Math.max(2, Math.round(len / 20)), y0 = cy; for (let i = 1; i <= n; i++) { const s = i / n; pts.push({ x: cx + len * s, y: y0 + dy * s * s * (3 - 2 * s) }); } cx += len; cy = y0 + dy; };
      const kick = (len, dy) => { const n = Math.max(2, Math.round(len / 20)), y0 = cy; for (let i = 1; i <= n; i++) { const s = i / n; pts.push({ x: cx + len * s, y: y0 + dy * s * s }); } cx += len; cy = y0 + dy; };
      const pit = (w, land) => { pits.push({ x0: cx, x1: cx + w, y: cy }); pts.push({ x: cx + 3, y: cy + 240 }, { x: cx + w - 3, y: cy + 240 }, { x: cx + w, y: cy + land }); cx += w; cy += land; };
      const nSec = g.by(7, 9, 11), gapW = g.by(70, 85, 100);
      for (let s = 0; s < nSec; s++) {
        flat(g.rf(240, 320)); cps.push(cx); const k = s === 0 ? 0 : g.ri(0, 3);
        if (k === 0) { for (let i = 0; i < 4; i++) { ramp(55, -16); ramp(55, 16); } }
        else if (k === 1) { ramp(180, -60); ramp(160, 60); }
        else if (k === 2) { const lnd = g.ri(10, 36); kick(110, -36); pit(gapW + g.rf(0, 14), lnd); flat(120); ramp(160, -lnd); }
        else { for (let i = 0; i < 3; i++) { ramp(100, -40); ramp(100, 40); } }
        if (s === 2 || s === 5 || s === 8) { flat(260); const lnd = g.ri(10, 30); kick(110, -36); pit(gapW + g.rf(0, 14), lnd); flat(140); ramp(160, -lnd); }
      }
      flat(300); const finishX = cx; flat(380);
      const hf = px => { let lo = 0, hi = pts.length - 1; if (px <= pts[0].x) return pts[0].y; if (px >= pts[hi].x) return pts[hi].y; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (pts[m].x <= px) lo = m; else hi = m; } const a = pts[lo], b = pts[hi]; return b.x === a.x ? a.y : a.y + (b.y - a.y) * (px - a.x) / (b.x - a.x); };
      const C = { L: 24, oy: 12, R: 11, k: 80, c: 3.2, I: 1300, grav: 760, drive: 620, vmax: 460, roll: .15, air: 10, gt: .45, ad: .55, awd: false };
      const r = { x: 60, y: 270, a: 0, vx: 0, vy: 0, w: 0, wc: [0, 0], ws: [0, 0], wa: [0, 0] };
      let lives = g.by(5, 4, 3), camX = 0, camY = 0, crash = 0, inv = 1, acc = 0, prevA = 0, flips = 0, bonus = 0, wheelT = 0, shake = 0, done = 0, wasAir = false, airT = 0, maxX = 0;
      pad(g, [["Brake", "ArrowLeft"], ["Gas", "ArrowRight"], ["Lean back", "ArrowUp"], ["Lean fwd", "ArrowDown"]]);
      g.status("Lives: " + lives);
      const respawn = () => { let cp = 0; cps.forEach(p => { if (p <= r.x - 60) cp = p; }); r.x = cp + 60; r.y = hf(r.x) - 26; r.a = 0; r.vx = r.vy = r.w = 0; inv = 1.8; acc = 0; crash = 0; };
      const wreck = why => { if (crash || inv > 0) return; crash = .01; shake = 12; g.sfx(why === "splash" ? "splash" : "boom"); burst(ps, r.x, r.y, 30, why === "splash" ? "#7cf" : "#ff9a3c", 220, .9); };
      g.loop((dt, t) => {
        const kb = g.keys; shake = Math.max(0, shake - dt * 18); inv -= dt;
        if (done) { done += dt; if (done > 1.6) { g.win("You finished the course!"); return false; } }
        else if (!crash) {
          rigStep(r, dt, { gas: (kb.ArrowRight || kb[" "]), brake: kb.ArrowLeft, tilt: (kb.ArrowDown ? 1 : 0) - (kb.ArrowUp ? 1 : 0) }, hf, C);
          if (wasAir && !r.air) { shake = 3; g.sfx("thump"); } wasAir = r.air;
          if (r.air) { airT += dt; acc += r.a - prevA; if (airT > .25 && Math.abs(acc) >= TAU) { flips++; bonus += 50; acc -= Math.sign(acc) * TAU; g.sfx("star"); popAt(g, c, W, H, "FLIP! +50", 200, 120, "#ffd34e"); } } else { airT = 0; acc = 0; }
          prevA = r.a;
          if (r.wc[0] && !r.wc[1] && r.a < -.15 && r.a > -1) { wheelT += dt; if (wheelT > 1) { wheelT = 0; bonus += 10; popAt(g, c, W, H, "Wheelie +10", 200, 150, "#fff"); } } else wheelT = 0;
          const ca = Math.cos(r.a), sa = Math.sin(r.a), hx = r.x + ca * 6 + sa * 34, hy = r.y + sa * 6 - ca * 34;
          if (hy > hf(hx) - 4) wreck("crash");
          pits.forEach(p => { if (r.x > p.x0 + 6 && r.x < p.x1 - 6 && r.y > p.y + 70) wreck("splash"); });
          if (r.y > 700) wreck("splash");
          maxX = Math.max(maxX, r.x);
          if (r.x > finishX) { done = .01; g.sfx("cheer"); bonus += 200; burst(ps, r.x, r.y - 40, 40, "#ffd34e", 250, 1.2); }
          if (r.x > 50) g.score(Math.floor(maxX / 12) + bonus);
        } else if (crash) {
          crash += dt;
          if (crash > 1.3) { lives--; g.status("Lives: " + lives); if (lives <= 0) { g.over(r.y > 500 ? "Splash!" : "Wiped out!"); return false; } respawn(); }
        }
        camX += (r.x - 200 - camX) * Math.min(1, dt * 6); camY += (r.y - 230 - camY) * Math.min(1, dt * 3);
        const sky = x.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "#ff9a5c"); sky.addColorStop(.6, "#ffd9a0"); sky.addColorStop(1, "#fff0d0"); x.fillStyle = sky; x.fillRect(0, 0, W, H);
        x.fillStyle = "#c98a6a"; x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W; px += 20) x.lineTo(px, 230 + 50 * Math.sin((px + camX * .25) / 140) + 20 * Math.sin((px + camX * .25) / 53) - camY * .1); x.lineTo(W, H); x.fill();
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake)); x.translate(-camX, -camY);
        x.beginPath(); x.moveTo(camX - 40, camY + H + 80); pts.forEach(p => { if (p.x > camX - 60 && p.x < camX + W + 60) x.lineTo(p.x, p.y); }); x.lineTo(camX + W + 60, camY + H + 80); x.closePath();
        const dg = x.createLinearGradient(0, camY, 0, camY + H + 80); dg.addColorStop(0, "#b5733a"); dg.addColorStop(1, "#5e3a1c"); x.fillStyle = dg; x.fill();
        x.lineJoin = "round"; x.lineWidth = 6; x.strokeStyle = "#e0a060"; x.beginPath(); let first = true; pts.forEach(p => { if (p.x > camX - 60 && p.x < camX + W + 60) { first ? x.moveTo(p.x, p.y) : x.lineTo(p.x, p.y); first = false; } }); x.stroke();
        pits.forEach(p => { if (p.x1 < camX - 20 || p.x0 > camX + W + 20) return; x.fillStyle = "#2f8fe0"; x.fillRect(p.x0 + 3, p.y + 120 + 3 * Math.sin(t * 3), p.x1 - p.x0 - 6, 125); x.fillStyle = "rgba(255,255,255,.5)"; x.fillRect(p.x0 + 3, p.y + 120 + 3 * Math.sin(t * 3), p.x1 - p.x0 - 6, 3); });
        x.fillStyle = "#fff"; x.fillRect(finishX, hf(finishX) - 90, 5, 90); for (let k = 0; k < 6; k++) { x.fillStyle = k % 2 ? "#111" : "#fff"; x.fillRect(finishX + 5, hf(finishX) - 90 + k * 6, 30, 6); x.fillStyle = k % 2 ? "#fff" : "#111"; x.fillRect(finishX + 20, hf(finishX) - 90 + k * 6, 15, 6); }
        stepParts(x, ps, dt, 300);
        if (!crash || crash < .02) {
          if (inv <= 0 || Math.floor(inv * 12) % 2) {
            const ca = Math.cos(r.a), sa = Math.sin(r.a);
            [-1, 1].forEach((s, i) => { const wx = r.x + ca * s * C.L - sa * C.oy, wy = r.y + sa * s * C.L + ca * C.oy; r.wa[i] += r.ws[i] * dt; x.save(); x.translate(wx, wy); x.rotate(r.wa[i]); x.strokeStyle = "#222"; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, C.R - 2, 0, TAU); x.stroke(); x.lineWidth = 1.5; x.beginPath(); x.moveTo(-C.R + 3, 0); x.lineTo(C.R - 3, 0); x.moveTo(0, -C.R + 3); x.lineTo(0, C.R - 3); x.stroke(); x.restore(); });
            x.save(); x.translate(r.x, r.y); x.rotate(r.a);
            x.strokeStyle = "#444"; x.lineWidth = 4; x.beginPath(); x.moveTo(-C.L, C.oy); x.lineTo(-6, -2); x.lineTo(14, -2); x.lineTo(C.L, C.oy); x.stroke(); x.beginPath(); x.moveTo(14, -2); x.lineTo(20, -16); x.stroke();
            x.fillStyle = "#ff7a1a"; rr(x, -12, -14, 26, 12, 5); x.fill(); x.fillStyle = "#222"; rr(x, -20, -9, 12, 5, 2); x.fill(); x.fillStyle = "#666"; rr(x, -4, -4, 14, 10, 3); x.fill();
            x.strokeStyle = "#2f6fff"; x.lineWidth = 5; x.lineCap = "round"; x.beginPath(); x.moveTo(-8, -10); x.lineTo(2, -26); x.stroke(); x.lineWidth = 3; x.beginPath(); x.moveTo(2, -24); x.lineTo(18, -16); x.stroke(); x.beginPath(); x.moveTo(-8, -10); x.lineTo(-2, -2); x.stroke();
            x.fillStyle = "#ff4d4d"; x.beginPath(); x.arc(6, -33, 7, 0, TAU); x.fill(); x.fillStyle = "#bfe8ff"; x.fillRect(7, -35, 6, 4);
            x.restore();
          }
        }
        x.restore();
        say(x, Math.floor(maxX / 12) + " m", 10, 18, "#432", 18, "left"); say(x, "Flips " + flips, W - 10, 18, "#432", 16, "right");
        if (crash) say(x, "Ouch!", W / 2, 120, "#fff", 36);
        if (done) say(x, "FINISH!", W / 2, 120, "#fff", 40);
      });
    }
  });

  // ---- Peg Drop: a bouncy ball toy ----
  B.add({
    id: "s10-peg-drop", name: "Peg Drop", ages: [6, 20], cat: "Skill", color: "#ff6fb5", icon: "PD",
    desc: "Drop heavy balls through the pegs and light up every glowing orange peg. Just for fun!",
    controls: "Move the mouse (or tap) to aim and drop. Keys: Left/Right to aim, Space to drop",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(400, 600), pegs = [], balls = [], ps = [];
      let left = g.by(14, 11, 9), aim = 200, shake = 0, cd = 0, lit = 0, endT = 0, bt = 0;
      for (let row = 0; row < 8; row++) for (let i = 0; ; i++) { const px = 25 + (row % 2 ? 25 : 0) + i * 50; if (px > W - 20) break; if (row > 0 && Math.random() < .08) continue; pegs.push({ x: px, y: 150 + row * 44, r: 6, t: false, lit: 0, hit: 0, cool: 0 }); }
      const tc = g.by(8, 11, 13); g.shuffle(pegs).slice(0, tc).forEach(p => { p.t = true; p.r = 7.5; });
      g.status("Balls: " + left);
      const drop = () => { if (left <= 0 || cd > 0 || endT > 0) return; left--; cd = .3; g.status("Balls: " + left); g.sfx("drop"); balls.push({ x: aim, y: 40, vx: g.rf(-14, 14), vy: 0, r: 8, hits: 0, slow: 0, age: 0, tr: [] }); };
      g.on(c, "pointermove", e => { aim = cl(pos(e).x, 14, W - 14); });
      g.on(c, "pointerdown", e => { aim = cl(pos(e).x, 14, W - 14); drop(); });
      g.on(window, "keydown", e => { if (e.key === " " || e.key === "Enter") drop(); });
      const touch = (b, p, e) => {
        const dx = b.x - p.x, dy = b.y - p.y, rs = b.r + p.r, d2 = dx * dx + dy * dy;
        if (d2 >= rs * rs) return; const d = Math.sqrt(d2) || .01, nx = dx / d, ny = dy / d; b.x = p.x + nx * rs; b.y = p.y + ny * rs;
        const vn = b.vx * nx + b.vy * ny; if (vn < 0) { b.vx -= 1.58 * vn * nx; b.vy -= 1.58 * vn * ny; }
        if (p.cool <= 0) {
          p.cool = .12; p.hit = 1; shake = Math.min(3, shake + .6);
          if (p.t && !p.lit) { p.lit = 1; lit++; b.hits++; const pts = 10 * b.hits; g.add(pts); g.sfx("note", 330 + Math.min(b.hits, 8) * 55); popAt(g, c, W, H, "+" + pts, p.x, p.y - 10, "#ffe066"); burst(ps, p.x, p.y, 12, "#ffe066", 140, .6); }
          else { g.add(1); g.sfx("tick"); burst(ps, p.x, p.y, 3, "#9fb4ff", 70, .3); }
        }
      };
      g.loop((dt, t) => {
        const kb = g.keys; cd -= dt; shake = Math.max(0, shake - dt * 12);
        aim = cl(aim + ((kb.ArrowRight ? 1 : 0) - (kb.ArrowLeft ? 1 : 0)) * 240 * dt, 14, W - 14);
        const bkx = 200 + 130 * Math.sin(t * .8);
        pegs.forEach(p => { p.cool -= dt; p.hit = Math.max(0, p.hit - dt * 4); });
        for (let i = balls.length - 1; i >= 0; i--) {
          const b = balls[i]; b.age += dt; let gone = false;
          for (let s = 0; s < 3; s++) {
            const h = dt / 3; b.vy += 820 * h; b.x += b.vx * h; b.y += b.vy * h; const sp = Math.hypot(b.vx, b.vy); if (sp > 900) { b.vx *= 900 / sp; b.vy *= 900 / sp; }
            if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * .6; } if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * .6; }
            for (let k = 0; k < pegs.length; k++) { const p = pegs[k]; if (Math.abs(p.y - b.y) < 20) touch(b, p); }
          }
          const sp2 = Math.hypot(b.vx, b.vy); if (sp2 < 30) b.slow += dt; else b.slow = 0;
          if (b.slow > 1.1) { b.vx += g.pick([-1, 1]) * 150; b.vy -= 170; b.slow = 0; }
          b.tr.push({ x: b.x, y: b.y }); if (b.tr.length > 8) b.tr.shift();
          if (b.y > 566 && b.vy > 0 && Math.abs(b.x - bkx) < 38) { left++; g.status("Balls: " + left); g.sfx("cheer"); popAt(g, c, W, H, "Free ball!", b.x, 540, "#6be28f"); burst(ps, b.x, 570, 16, "#6be28f", 160, .7); gone = true; }
          else if (b.y > H + 20 || b.age > 25) gone = true;
          if (gone) balls.splice(i, 1);
        }
        if (!endT && lit >= tc) { endT = 1.4; g.sfx("cheer"); }
        if (!endT && left <= 0 && balls.length === 0) { endT = -.01; }
        if (endT > 0) { endT -= dt; if (endT <= 0) { g.add(left * 50); g.win("You lit every peg!"); return false; } }
        else if (endT < 0) { endT -= dt; if (endT < -1.1) { g.over("Out of balls. " + (tc - lit) + " orange pegs left."); return false; } }
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#1a1042"); bg.addColorStop(1, "#3b1b6e"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake));
        x.fillStyle = "rgba(255,255,255,.06)"; x.fillRect(0, 0, 6, H); x.fillRect(W - 6, 0, 6, H);
        if (left > 0 && endT === 0) { x.setLineDash([5, 6]); x.strokeStyle = "rgba(255,255,255,.35)"; x.lineWidth = 2; x.beginPath(); x.moveTo(aim, 50); x.lineTo(aim, 140); x.stroke(); x.setLineDash([]); x.fillStyle = "rgba(255,255,255,.5)"; x.beginPath(); x.arc(aim, 40, 8, 0, TAU); x.fill(); }
        x.fillStyle = "#59398f"; rr(x, aim - 16, 18, 32, 10, 5); x.fill();
        pegs.forEach(p => {
          const glow = p.t ? (p.lit ? "#fff27a" : "#ff9a3c") : "#9fb4ff", rad = p.r + p.hit * 3;
          if (p.t) { x.fillStyle = p.lit ? "rgba(255,242,122,.3)" : "rgba(255,154,60,.22)"; x.beginPath(); x.arc(p.x, p.y, rad + 6 + (p.lit ? 3 * Math.sin(t * 6) : 0), 0, TAU); x.fill(); }
          x.fillStyle = glow; x.beginPath(); x.arc(p.x, p.y, rad, 0, TAU); x.fill(); x.fillStyle = "rgba(255,255,255,.55)"; x.beginPath(); x.arc(p.x - rad * .3, p.y - rad * .3, rad * .35, 0, TAU); x.fill();
        });
        x.fillStyle = "#6be28f"; x.beginPath(); x.moveTo(bkx - 40, 568); x.lineTo(bkx + 40, 568); x.lineTo(bkx + 32, 596); x.lineTo(bkx - 32, 596); x.closePath(); x.fill(); say(x, "+1", bkx, 584, "#0b3a1c", 14);
        balls.forEach(b => { b.tr.forEach((q, k) => { x.globalAlpha = k / 20; x.fillStyle = "#ff9fd0"; x.beginPath(); x.arc(q.x, q.y, b.r * .7, 0, TAU); x.fill(); }); x.globalAlpha = 1; const rg = x.createRadialGradient(b.x - 3, b.y - 3, 1, b.x, b.y, b.r); rg.addColorStop(0, "#fff"); rg.addColorStop(1, "#ff6fb5"); x.fillStyle = rg; x.beginPath(); x.arc(b.x, b.y, b.r, 0, TAU); x.fill(); });
        stepParts(x, ps, dt, 200);
        x.restore();
        say(x, "Orange left: " + (tc - lit), 10, 14, "#ffb36b", 16, "left"); say(x, "Balls: " + left, W - 10, 14, "#fff", 16, "right");
        if (endT < 0) say(x, "No balls left...", W / 2, 300, "#fff", 26);
        if (endT > 0) say(x, "All lit!", W / 2, 300, "#ffe066", 34);
      });
    }
  });

  // ---- Crane Stacker ----
  B.add({
    id: "s10-crane-stack", name: "Crane Stacker", ages: [7, 20], cat: "Skill", color: "#ffb020", icon: "CS",
    desc: "Time the crane claw and drop crates to build a tall tower. Keep the balance or it topples!",
    controls: "Click, tap or press Space to drop the crate. Line it up with the one below",
    start(g) {
      const { c, x, W, H } = g.canvas(400, 600), CH = 28, BASE = 560, PAL = ["#d9923a", "#c4572f", "#4a8fd9", "#4aa86a", "#a45bd0", "#e0b43a"], ps = [], fp = [];
      const stack = [{ x: 200, w: 220, col: "#6d5a44" }], TOL = g.by(10, 4, 0);
      let held = null, fall = null, lives = g.by(4, 3, 3), ph = 0, camY = 0, spawnT = .3, perf = 0, shake = 0, wob = 0, ratio = 1, endT = 0, msg = "", msgT = 0;
      const mk = () => { const lo = g.by(80, 66, 54), hi = g.by(120, 106, 92), w = g.rf(lo, hi); held = { w, col: g.pick(PAL) }; };
      const topY = () => BASE - stack.length * CH;
      g.status("Lives: " + lives);
      const check = () => {
        let worst = 1;
        for (let i = 1; i < stack.length; i++) {
          let M = 0, S = 0; for (let j = i; j < stack.length; j++) { M += stack[j].w; S += stack[j].w * stack[j].x; }
          const com = S / M, a = stack[i], b = stack[i - 1], lo = Math.max(a.x - a.w / 2, b.x - b.w / 2), hi = Math.min(a.x + a.w / 2, b.x + b.w / 2), half = (hi - lo) / 2, mid = (hi + lo) / 2;
          const margin = half + TOL - Math.abs(com - mid); worst = Math.min(worst, margin / (half + TOL || 1));
          if (margin < 0 || half <= 0) return { bad: i, worst: 0 };
        }
        return { bad: -1, worst: cl(worst, 0, 1) };
      };
      const act = () => {
        if (!held || fall || endT) return;
        const tx = 200 + 140 * Math.sin(ph); fall = { x: tx, y: 110 - camY, vy: 0, w: held.w, col: held.col, miss: 0 }; held = null; g.sfx("swish");
      };
      g.on(c, "pointerdown", () => act()); g.on(window, "keydown", e => { if (e.key === " " || e.key === "ArrowDown" || e.key === "Enter") act(); });
      g.loop((dt, t) => {
        shake = Math.max(0, shake - dt * 20); msgT -= dt; wob = Math.max(0, wob - dt * 1.2);
        ph += dt * (g.by(1.3, 1.7, 2.1) + Math.min(1.5, stack.length * .04));
        if (!held && !fall && !endT) { spawnT -= dt; if (spawnT <= 0) mk(); }
        const ty = topY();
        if (fall) {
          fall.vy += 1500 * dt; fall.y += fall.vy * dt; if (fall.miss) fall.x += fall.miss * 90 * dt;
          if (!fall.miss && fall.y + CH >= ty) {
            const top = stack[stack.length - 1], ov = Math.min(fall.x + fall.w / 2, top.x + top.w / 2) - Math.max(fall.x - fall.w / 2, top.x - top.w / 2);
            if (ov <= 4) { fall.miss = fall.x < top.x ? -1 : 1; g.sfx("wrong"); }
            else {
              let nx = fall.x, pf = false; if (Math.abs(nx - top.x) < 6 && stack.length > 1) { nx = top.x; pf = true; } else if (Math.abs(nx - top.x) < 6) { pf = true; }
              stack.push({ x: nx, w: fall.w, col: fall.col }); fall = null; spawnT = .5; shake = 4; g.sfx("thump");
              const r = check(); ratio = r.worst; wob = (1 - r.worst) * 5 + .5;
              if (r.bad >= 0) {
                const dir = Math.sign(stack[stack.length - 1].x - stack[r.bad - 1].x) || 1;
                for (let j = r.bad; j < stack.length; j++) { const s = stack[j]; fp.push({ x: s.x, y: BASE - (j + 1) * CH, w: s.w, col: s.col, vx: dir * (50 + (j - r.bad) * 25), vy: -60, r: 0, vr: dir * g.rf(1.5, 3.5) }); }
                stack.length = r.bad; lives--; g.status("Lives: " + lives); g.sfx("boom"); shake = 12; perf = 0; msg = "The tower toppled!"; msgT = 1.6; ratio = 1; wob = 0;
                if (lives <= 0) endT = 1.5;
              } else {
                perf = pf ? perf + 1 : 0; const pts = 10 + (pf ? 5 * Math.min(perf, 8) : 0); g.add(pts);
                if (pf) { g.sfx("note", 420 + perf * 60); msg = perf > 1 ? "Perfect x" + perf + "!" : "Perfect!"; msgT = 1; burst(ps, nx, BASE - stack.length * CH, 14, "#ffe066", 160, .6); }
                else if (r.worst < .25) { msg = "Wobbly!"; msgT = 1; }
              }
            }
          }
          if (fall && fall.miss && fall.y > BASE + 80) { fall = null; lives--; g.status("Lives: " + lives); msg = "Missed!"; msgT = 1; g.sfx("splash"); spawnT = .6; if (lives <= 0) endT = 1.2; }
        }
        for (let i = fp.length - 1; i >= 0; i--) { const q = fp[i]; q.vy += 900 * dt; q.x += q.vx * dt; q.y += q.vy * dt; q.r += q.vr * dt; if (q.y > BASE + 300) fp.splice(i, 1); }
        if (endT > 0) { endT -= dt; if (endT <= 0) { g.over("The tower fell! " + Math.max(0, stack.length - 1) + " crates stood."); return false; } }
        camY += (Math.max(0, 420 - (BASE - stack.length * CH)) - camY) * Math.min(1, dt * 3);
        const sky = x.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "#ff9a6a"); sky.addColorStop(.5, "#ffd9a0"); sky.addColorStop(1, "#9fd8ff"); x.fillStyle = sky; x.fillRect(0, 0, W, H);
        x.fillStyle = "rgba(60,40,90,.25)"; for (let k = 0; k < 5; k++) { const bx = k * 90 + 10, bh = 80 + (k * 37 % 60); x.fillRect(bx, H - bh + camY * .2, 50, bh); }
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake)); x.translate(0, camY);
        x.fillStyle = "#3d7bb8"; x.fillRect(-20, BASE + 40, W + 40, 400); x.fillStyle = "#5e5a66"; x.fillRect(-20, BASE, W + 40, 40);
        const drawCrate = (cx, y, w, col, rot) => { x.save(); x.translate(cx, y + CH / 2); if (rot) x.rotate(rot); x.fillStyle = col; rr(x, -w / 2, -CH / 2, w, CH, 3); x.fill(); x.strokeStyle = "rgba(0,0,0,.35)"; x.lineWidth = 2; x.stroke(); x.beginPath(); x.moveTo(-w / 2 + 4, -CH / 2 + 4); x.lineTo(w / 2 - 4, CH / 2 - 4); x.moveTo(-w / 2 + 4, CH / 2 - 4); x.lineTo(w / 2 - 4, -CH / 2 + 4); x.stroke(); x.fillStyle = "rgba(255,255,255,.18)"; x.fillRect(-w / 2 + 3, -CH / 2 + 2, w - 6, 4); x.restore(); };
        const sw = Math.sin(t * 9) * wob;
        stack.forEach((s, i) => { if (i === 0) { x.fillStyle = s.col; rr(x, s.x - s.w / 2, BASE - CH, s.w, CH, 4); x.fill(); x.fillStyle = "rgba(255,255,255,.15)"; x.fillRect(s.x - s.w / 2 + 4, BASE - CH + 2, s.w - 8, 4); } else drawCrate(s.x + sw * (i / stack.length), BASE - (i + 1) * CH, s.w, s.col, 0); });
        fp.forEach(q => drawCrate(q.x, q.y, q.w, q.col, q.r)); if (fall) drawCrate(fall.x, fall.y, fall.w, fall.col, 0);
        stepParts(x, ps, dt, 300); x.restore();
        const tx = 200 + 140 * Math.sin(ph), cy0 = 110;
        x.fillStyle = "#e0a020"; x.fillRect(0, 26, W, 14); x.fillStyle = "#b87c10"; x.fillRect(14, 26, 12, 300); x.fillRect(W - 26, 26, 12, 300);
        x.fillStyle = "#444"; rr(x, tx - 20, 40, 40, 16, 4); x.fill(); x.strokeStyle = "#222"; x.lineWidth = 3; x.beginPath(); x.moveTo(tx, 56); x.lineTo(tx, cy0 - 14); x.stroke();
        const op = held ? 0 : 14;
        x.strokeStyle = "#555"; x.lineWidth = 5; x.lineCap = "round"; x.beginPath(); x.moveTo(tx - 12 - op * .3, cy0 + 6); x.lineTo(tx - 6, cy0 - 14); x.lineTo(tx + 6, cy0 - 14); x.lineTo(tx + 12 + op * .3, cy0 + 6); x.stroke();
        if (held) { x.save(); x.translate(0, 0); const cc = held; x.fillStyle = cc.col; rr(x, tx - cc.w / 2, cy0, cc.w, CH, 3); x.fill(); x.strokeStyle = "rgba(0,0,0,.35)"; x.lineWidth = 2; x.stroke(); x.beginPath(); x.moveTo(tx - cc.w / 2 + 4, cy0 + 4); x.lineTo(tx + cc.w / 2 - 4, cy0 + CH - 4); x.moveTo(tx - cc.w / 2 + 4, cy0 + CH - 4); x.lineTo(tx + cc.w / 2 - 4, cy0 + 4); x.stroke(); x.restore(); }
        x.fillStyle = "rgba(0,0,0,.25)"; rr(x, 10, 62, 100, 10, 5); x.fill(); x.fillStyle = ratio > .5 ? "#6be28f" : ratio > .25 ? "#ffd34e" : "#ff6b6b"; rr(x, 10, 62, Math.max(4, 100 * ratio), 10, 5); x.fill();
        say(x, "Balance", 118, 67, "#fff", 13, "left"); say(x, "Height " + Math.max(0, stack.length - 1), W - 10, 70, "#fff", 18, "right");
        if (msgT > 0) say(x, msg, W / 2, 200, "#fff", 28);
      });
    }
  });

  // ---- Rope Swing ----
  B.add({
    id: "s10-rope-swing", name: "Rope Swing", ages: [8, 20], cat: "Skill", color: "#6be28f", icon: "RS",
    desc: "Swing from rope to rope across the canyon. Let go at just the right moment to fly farther.",
    controls: "Click, tap or Space: let go, then press again to grab the nearest rope. Left/Right pump the swing",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 400), WATER = 372, anchors = [{ x: 260, y: 70 }], stars = [], ps = [], trail = [];
      const P = { x: 170, y: 170, vx: 0, vy: 0 }; let att = anchors[0], L = Math.hypot(P.x - att.x, P.y - att.y), lastX = 260, camX = 0, maxX = 0, starsN = 0, dead = 0, shake = 0, squash = 0, hint = 4;
      const cand = () => { let best = null, bs = Infinity; anchors.forEach(a => { const dx = a.x - P.x, dy = a.y - P.y, d = Math.hypot(dx, dy); if (d < 60 || d > 235 || dy > -30) return; const s = d - dx * .4; if (s < bs) { bs = s; best = a; } }); return best; };
      const act = () => {
        if (dead) return;
        if (att) { att = null; g.sfx("swish"); squash = 1; }
        else { const a = cand(); if (a) { att = a; L = Math.hypot(P.x - a.x, P.y - a.y); g.sfx("click"); squash = .6; } else g.sfx("back"); }
      };
      g.on(c, "pointerdown", () => act()); g.on(window, "keydown", e => { if (e.key === " " || e.key === "Enter") act(); });
      g.loop((dt, t) => {
        const kb = g.keys; shake = Math.max(0, shake - dt * 20); squash = Math.max(0, squash - dt * 4); hint -= dt;
        while (lastX < P.x + 900) {
          const gap = Math.min(225, g.rf(g.by(110, 130, 150), g.by(160, 185, 210)) + Math.min(25, lastX / 120)); lastX += gap;
          anchors.push({ x: lastX, y: g.rf(55, g.by(95, 110, 125)) }); if (Math.random() < .6) stars.push({ x: lastX - gap * .5 + g.rf(-20, 20), y: g.rf(150, 290) });
        }
        if (!dead) {
          for (let s = 0; s < 2; s++) {
            const h = dt / 2; P.vy += 860 * h;
            if (att) { P.vx += ((kb.ArrowRight ? 1 : 0) - (kb.ArrowLeft ? 1 : 0)) * 240 * h; const gr = Math.hypot(P.vx, P.vy) < 480 ? Math.exp(.3 * h) : 1; P.vx *= gr; P.vy *= gr; }
            P.x += P.vx * h; P.y += P.vy * h;
            if (att) { const dx = P.x - att.x, dy = P.y - att.y, d = Math.hypot(dx, dy) || 1; if (d > L) { const nx = dx / d, ny = dy / d; P.x = att.x + nx * L; P.y = att.y + ny * L; const vn = P.vx * nx + P.vy * ny; if (vn > 0) { P.vx -= vn * nx; P.vy -= vn * ny; } } }
          }
          maxX = Math.max(maxX, P.x);
          for (let i = stars.length - 1; i >= 0; i--) { const q = stars[i]; if (q.x < camX - 100) { stars.splice(i, 1); continue; } if (Math.hypot(q.x - P.x, q.y - P.y) < 24) { stars.splice(i, 1); starsN++; g.sfx("star"); burst(ps, q.x, q.y, 10, "#ffd34e", 140, .5); popAt(g, c, W, H, "+5", q.x - camX, q.y, "#ffd34e"); } }
          for (let i = anchors.length - 1; i >= 0; i--) if (anchors[i].x < camX - 200 && anchors[i] !== att) anchors.splice(i, 1);
          if (P.y > WATER - 10) { dead = 1; g.sfx("splash"); shake = 6; burst(ps, P.x, WATER, 26, "#bfe8ff", 220, .9); att = null; }
          else if (P.x < camX - 30) { dead = 1; g.sfx("sad"); }
          if (Math.random() < dt * 30) trail.push({ x: P.x, y: P.y, l: 1 });
          g.score(Math.floor((maxX - 170) / 25) + starsN * 5);
        } else { dead += dt; if (dead > 1.2) { g.over("Splash! You swung " + Math.floor((maxX - 170) / 25) + " m"); return false; } }
        camX = Math.max(camX, camX + (P.x - 220 - camX) * Math.min(1, dt * 5));
        const sky = x.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "#ff8a5c"); sky.addColorStop(.55, "#ffd28a"); sky.addColorStop(1, "#fff0c4"); x.fillStyle = sky; x.fillRect(0, 0, W, H);
        x.fillStyle = "#b56a7a"; x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W; px += 16) x.lineTo(px, 230 + 60 * Math.sin((px + camX * .2) / 120) + 20 * Math.sin((px + camX * .2) / 41)); x.lineTo(W, H); x.fill();
        x.fillStyle = "#7a3f66"; x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W; px += 16) x.lineTo(px, 290 + 35 * Math.sin((px + camX * .45) / 90 + 2) + 12 * Math.sin((px + camX * .45) / 33)); x.lineTo(W, H); x.fill();
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake)); x.translate(-camX, 0);
        const cd = !att && !dead ? cand() : null;
        anchors.forEach(a => {
          if (a.x < camX - 20 || a.x > camX + W + 20) return;
          x.strokeStyle = "#2f7a3a"; x.lineWidth = 3; x.beginPath(); x.moveTo(a.x, -5); x.lineTo(a.x, a.y - 8); x.stroke();
          x.fillStyle = a === cd ? "#fff27a" : "#5a3a1e"; x.beginPath(); x.arc(a.x, a.y, a === cd ? 10 : 8, 0, TAU); x.fill(); x.strokeStyle = "#2a1a0a"; x.lineWidth = 2; x.stroke();
          if (a === cd) { x.strokeStyle = "rgba(255,255,255,.8)"; x.beginPath(); x.arc(a.x, a.y, 14 + 3 * Math.sin(t * 8), 0, TAU); x.stroke(); }
        });
        if (cd) { x.setLineDash([5, 6]); x.strokeStyle = "rgba(255,255,255,.6)"; x.lineWidth = 2; x.beginPath(); x.moveTo(P.x, P.y); x.lineTo(cd.x, cd.y); x.stroke(); x.setLineDash([]); }
        stars.forEach(q => { x.fillStyle = "#ffd34e"; x.beginPath(); for (let k = 0; k < 10; k++) { const rad = k % 2 ? 5 : 12, an = -Math.PI / 2 + k * Math.PI / 5 + t; x.lineTo(q.x + Math.cos(an) * rad, q.y + Math.sin(an) * rad); } x.closePath(); x.fill(); x.strokeStyle = "#c79a14"; x.lineWidth = 1.5; x.stroke(); });
        x.fillStyle = "#2f8fe0"; x.beginPath(); x.moveTo(camX - 10, H); for (let px = camX - 10; px <= camX + W + 20; px += 12) x.lineTo(px, WATER + 3 * Math.sin(px / 20 + t * 3)); x.lineTo(camX + W + 20, H); x.fill();
        x.fillStyle = "rgba(255,255,255,.25)"; for (let px = Math.floor(camX / 40) * 40; px < camX + W + 40; px += 40) x.fillRect(px + (t * 20) % 40, WATER + 12, 18, 3);
        for (let i = trail.length - 1; i >= 0; i--) { const q = trail[i]; q.l -= dt * 2; if (q.l <= 0) { trail.splice(i, 1); continue; } x.globalAlpha = q.l * .5; x.fillStyle = "#ffe0a0"; x.beginPath(); x.arc(q.x, q.y, 4 * q.l, 0, TAU); x.fill(); } x.globalAlpha = 1;
        if (att && !dead) { x.strokeStyle = "#7a4a1e"; x.lineWidth = 4; x.beginPath(); x.moveTo(att.x, att.y); x.lineTo(P.x, P.y); x.stroke(); x.strokeStyle = "#c48a4a"; x.lineWidth = 1.5; x.stroke(); }
        stepParts(x, ps, dt, 300);
        if (dead < 1 || dead === 0) {
          const sp = Math.hypot(P.vx, P.vy), st = 1 + Math.min(.25, sp / 1600) + squash * .15, ang = Math.atan2(P.vy, P.vx);
          x.save(); x.translate(P.x, P.y); x.rotate(ang); x.scale(st, 1 / st); x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.arc(2, 3, 13, 0, TAU); x.fill();
          const rg = x.createRadialGradient(-4, -4, 2, 0, 0, 14); rg.addColorStop(0, "#ffc27a"); rg.addColorStop(1, "#ff7a1a"); x.fillStyle = rg; x.beginPath(); x.arc(0, 0, 13, 0, TAU); x.fill();
          x.fillStyle = "#fff"; x.beginPath(); x.arc(5, -4, 4, 0, TAU); x.arc(5, 5, 4, 0, TAU); x.fill(); x.fillStyle = "#222"; x.beginPath(); x.arc(6.5, -4, 2, 0, TAU); x.arc(6.5, 5, 2, 0, TAU); x.fill(); x.restore();
        }
        x.restore();
        say(x, Math.floor((maxX - 170) / 25) + " m", 10, 18, "#432", 18, "left");
        if (hint > 0 && att) say(x, "Press to let go, press again to grab", W / 2, 360, "#fff", 18);
        g.status("Stars: " + starsN);
      });
    }
  });

  // ---- Bumper Arena ----
  B.add({
    id: "s10-bumper-arena", name: "Bumper Arena", ages: [7, 20], cat: "Racing", color: "#ff5fa2", icon: "BA",
    desc: "Bump the other cars off the floating arena. The floor shrinks, so stay near the middle!",
    controls: "Arrows or WASD to drive, Space to dash. Touch: hold on the arena to drive toward your finger, tap Dash",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), CX = 320, CY = 200, R0 = 170, ps = [], COLS = ["#ffd34e", "#4cc3ff", "#6be28f", "#b48cff", "#ff8a2a"], TOTAL = g.by(4, 6, 8);
      let round = 1, rt = 0, lives = g.by(3, 2, 2), shake = 0, ptr = null, rmsg = 1.8, inter = 0, now = 0;
      const mkc = (col, me) => ({ x: CX, y: CY, vx: 0, vy: 0, r: 18, m: me ? 1.15 : 1, col, me, fall: 0, dash: 0, cd: 0, fa: 0, last: null, lastT: 9, inv: 0, aiT: 0, tgt: null, dx: 1, dy: 0 });
      const me = mkc("#ff4d6d", true), foes = [], aiAcc = () => Math.min(1, g.by(.55, .7, .85) + round * .03);
      const spawn = () => { foes.length = 0; const n = Math.min(5, 1 + round); for (let i = 0; i < n; i++) { const a = i / n * TAU + .5, f = mkc(COLS[i % 5], false); f.x = CX + Math.cos(a) * 115; f.y = CY + Math.sin(a) * 115; foes.push(f); } me.x = CX; me.y = CY; me.vx = me.vy = 0; me.fall = 0; me.inv = 1.5; rt = 0; rmsg = 1.8; };
      spawn(); g.status("Lives: " + lives + "  Round " + round + "/" + TOTAL);
      const dash = k => { if (k.cd > 0 || k.fall) return; const sp = Math.hypot(k.vx, k.vy), d = sp > 30 ? { x: k.vx / sp, y: k.vy / sp } : { x: k.dx, y: k.dy }; k.vx += d.x * 430; k.vy += d.y * 430; k.dash = .35; k.cd = g.by(1.1, 1.4, 1.6); if (k.me) g.sfx("launch"); burst(ps, k.x, k.y, 8, "#fff", 120, .3); };
      const btn = g.html('<div style="text-align:center;margin-top:8px"><button type="button" class="bg-btn" style="min-width:120px;min-height:48px;touch-action:none">Dash</button></div>');
      g.on(btn.querySelector("button"), "pointerdown", e => { e.preventDefault(); dash(me); });
      g.on(window, "keydown", e => { if (e.key === " ") dash(me); });
      g.on(c, "pointerdown", e => { ptr = pos(e); }); g.on(c, "pointermove", e => { if (ptr) ptr = pos(e); }); g.on(window, "pointerup", () => { ptr = null; });
      g.loop((dt, t) => {
        const kb = g.keys; shake = Math.max(0, shake - dt * 18); rt += dt; now += dt; rmsg -= dt;
        const shrink = g.by(1.2, 1.8, 2.6) * (1 + (round - 1) * .08), Rn = Math.max(105, R0 - Math.max(0, rt - 4) * shrink), all = [me].concat(foes);
        all.forEach(k => {
          k.cd -= dt; k.dash -= dt; k.inv -= dt; k.lastT += dt;
          if (k.fall) { k.fall += dt; k.x += k.vx * dt; k.y += k.vy * dt; return; }
          let dx = 0, dy = 0;
          if (k.me) { dx = (kb.ArrowRight ? 1 : 0) - (kb.ArrowLeft ? 1 : 0); dy = (kb.ArrowDown ? 1 : 0) - (kb.ArrowUp ? 1 : 0); if (ptr) { const px = ptr.x - k.x, py = ptr.y - k.y, d = Math.hypot(px, py); if (d > 14) { dx = px; dy = py; } } }
          else {
            k.aiT -= dt; if (k.aiT <= 0) { k.aiT = .5; let best = null, bd = 1e9; all.forEach(o => { if (o === k || o.fall) return; const d = Math.hypot(o.x - k.x, o.y - k.y) * (o.me ? .7 : 1); if (d < bd) { bd = d; best = o; } }); k.tgt = best; }
            if (k.tgt && !k.tgt.fall) { dx = k.tgt.x - k.x; dy = k.tgt.y - k.y; const dd = Math.hypot(dx, dy) || 1; if (dd < 130 && Math.random() < dt * g.by(.4, .7, 1.1)) dash(k); }
            const cd = Math.hypot(k.x - CX, k.y - CY); if (cd > Rn - 55) { const w = cl((cd - (Rn - 55)) / 40, 0, 1), m = Math.hypot(dx, dy) || 1; dx = dx / m * (1 - w) + (CX - k.x) / (cd || 1) * w; dy = dy / m * (1 - w) + (CY - k.y) / (cd || 1) * w; }
          }
          const mg = Math.hypot(dx, dy); if (mg > 0) { dx /= mg; dy /= mg; k.dx = dx; k.dy = dy; }
          const acc = k.me ? 560 : 560 * aiAcc(); k.vx += dx * acc * dt; k.vy += dy * acc * dt; const dr = Math.exp(-1.7 * dt); k.vx *= dr; k.vy *= dr;
          const sp = Math.hypot(k.vx, k.vy); if (sp > 700) { k.vx *= 700 / sp; k.vy *= 700 / sp; }
          k.x += k.vx * dt; k.y += k.vy * dt; if (sp > 25) k.fa += wrapA(Math.atan2(k.vy, k.vx) - k.fa) * Math.min(1, dt * 10);
          if (k.dash > 0 && Math.random() < dt * 40) burst(ps, k.x - k.vx * .03, k.y - k.vy * .03, 1, "#fff", 30, .3);
          if (k.inv <= 0 && Math.hypot(k.x - CX, k.y - CY) > Rn + 4) { k.fall = .001; g.sfx(k.me ? "wrong" : "fizz"); }
        });
        for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
          const a = all[i], b = all[j]; if (a.fall || b.fall) continue;
          const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || .01, rs = a.r + b.r; if (d >= rs) continue;
          const nx = dx / d, ny = dy / d, ma = a.m * (a.dash > 0 ? 2.2 : 1), mb = b.m * (b.dash > 0 ? 2.2 : 1), ov = rs - d;
          a.x -= nx * ov * mb / (ma + mb); a.y -= ny * ov * mb / (ma + mb); b.x += nx * ov * ma / (ma + mb); b.y += ny * ov * ma / (ma + mb);
          const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (rv < 0) {
            const jj = -(1 + .95) * rv / (1 / ma + 1 / mb); a.vx -= jj / ma * nx; a.vy -= jj / ma * ny; b.vx += jj / mb * nx; b.vy += jj / mb * ny; a.last = b; a.lastT = 0; b.last = a; b.lastT = 0;
            const f = -rv; shake = Math.max(shake, Math.min(10, f / 40)); if (f > 90) { g.sfx(f > 320 ? "boom" : "thump"); burst(ps, (a.x + b.x) / 2, (a.y + b.y) / 2, Math.min(14, 4 + f / 40), "#ffd34e", 180, .4); }
          }
        }
        for (let i = foes.length - 1; i >= 0; i--) { const f = foes[i]; if (f.fall > .9) { if (f.last === me && f.lastT < 3) { const p = 40 + round * 10; g.add(p); popAt(g, c, W, H, "Knock out! +" + p, f.x, f.y - 20, "#ffd34e"); g.sfx("star"); } foes.splice(i, 1); } }
        if (me.fall > .9) {
          lives--; g.status("Lives: " + lives + "  Round " + round + "/" + TOTAL);
          if (lives <= 0) { g.over("You fell off in round " + round + "!"); return false; }
          me.x = CX; me.y = CY; me.vx = me.vy = 0; me.fall = 0; me.inv = 2; me.last = null;
        }
        if (!foes.length && !inter) { inter = 1.6; g.add(50 * round); g.sfx("cheer"); popAt(g, c, W, H, "Round clear! +" + 50 * round, CX, 120, "#6be28f"); }
        if (inter > 0) { inter -= dt; if (inter <= 0) { inter = 0; if (round >= TOTAL) { g.win("Bumper champion!"); return false; } round++; spawn(); g.status("Lives: " + lives + "  Round " + round + "/" + TOTAL); } }
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#150a3a"); bg.addColorStop(1, "#3a1a70"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        for (let k = 0; k < 40; k++) { x.fillStyle = "rgba(255,255,255," + (.2 + .3 * Math.abs(Math.sin(t + k))) + ")"; x.fillRect((k * 97) % W, (k * 53) % H, 2, 2); }
        x.save(); if (shake) x.translate(g.rf(-shake, shake), g.rf(-shake, shake));
        x.fillStyle = "#1c2a5a"; x.beginPath(); x.arc(CX, CY + 16, Rn, 0, TAU); x.fill();
        const fg = x.createRadialGradient(CX, CY - 20, 20, CX, CY, Rn); fg.addColorStop(0, "#9fe6ff"); fg.addColorStop(1, "#3a86d0"); x.fillStyle = fg; x.beginPath(); x.arc(CX, CY, Rn, 0, TAU); x.fill();
        x.strokeStyle = "rgba(255,255,255,.25)"; x.lineWidth = 2; [.35, .65].forEach(f => { x.beginPath(); x.arc(CX, CY, Rn * f, 0, TAU); x.stroke(); });
        x.lineWidth = 8; x.strokeStyle = "#ffd34e"; x.beginPath(); x.arc(CX, CY, Rn, 0, TAU); x.stroke(); x.strokeStyle = "#222"; x.setLineDash([18, 18]); x.beginPath(); x.arc(CX, CY, Rn, 0, TAU); x.stroke(); x.setLineDash([]);
        stepParts(x, ps, dt, 0);
        all.slice().sort((a, b) => a.y - b.y).forEach(k => {
          const s = k.fall ? Math.max(.05, 1 - k.fall / .9) : 1; x.save(); x.globalAlpha = k.inv > 0 && Math.floor(k.inv * 10) % 2 ? .4 : 1; x.translate(k.x, k.y + (k.fall ? k.fall * 40 : 0)); x.scale(s, s); x.rotate(k.fa);
          if (k.dash > 0) { x.fillStyle = "rgba(255,255,255,.5)"; x.beginPath(); x.arc(-8, 0, 24, 0, TAU); x.fill(); }
          carShape(x, k.col, 34, 24); x.strokeStyle = "#333"; x.lineWidth = 4; rr(x, -19, -14, 38, 28, 12); x.stroke(); x.restore();
          if (k.me && !k.fall) { x.strokeStyle = "#fff"; x.lineWidth = 2; x.beginPath(); x.arc(k.x, k.y, 24, 0, TAU); x.setLineDash([4, 4]); x.stroke(); x.setLineDash([]); }
        });
        x.restore();
        say(x, "Round " + round + "/" + TOTAL, 10, 18, "#fff", 18, "left"); say(x, "Lives " + lives, W - 10, 18, "#fff", 18, "right");
        x.fillStyle = "rgba(255,255,255,.2)"; rr(x, 10, H - 20, 80, 8, 4); x.fill(); x.fillStyle = me.cd > 0 ? "#ffb36b" : "#6be28f"; rr(x, 10, H - 20, Math.max(3, 80 * (1 - Math.max(0, me.cd) / g.by(1.1, 1.4, 1.6))), 8, 4); x.fill(); say(x, "Dash", 98, H - 16, "#fff", 12, "left");
        if (rmsg > 0) say(x, "Round " + round + "!", W / 2, 70, "#ffe066", 34);
        if (rt > 4 && rt < 6) say(x, "The floor is shrinking!", W / 2, H - 40, "#ff8a8a", 20);
      });
    }
  });
})();
