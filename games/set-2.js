// Break Time Games: set 2 (Memory & matching games, drawn shapes only, no reading, no maths)
(function () {
  const B = window.BreakGames; if (!B) return;
  const TAU = Math.PI * 2;
  const PAL = ["#ff5d73", "#4cc3ff", "#ffd34e", "#6be28f", "#b48cff", "#ff8a2a", "#2ec4b6", "#ff7ac8"];

  // ---------- shared little helpers ----------
  const poly = (x, n, r, rot) => { for (let i = 0; i < n; i++) { const a = rot + i * TAU / n; x[i ? "lineTo" : "moveTo"](Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); };
  // draw one of 8 shapes (0 circle, 1 square, 2 triangle, 3 star, 4 diamond, 5 hexagon, 6 plus, 7 pentagon)
  function shape(x, k, cx, cy, r, col, a, line) {
    k = ((k % 8) + 8) % 8; x.save(); x.translate(cx, cy); if (a !== undefined) x.globalAlpha *= a;
    x.beginPath();
    if (k === 0) x.arc(0, 0, r, 0, TAU);
    else if (k === 1) x.roundRect(-r * .85, -r * .85, r * 1.7, r * 1.7, r * .22);
    else if (k === 2) { x.moveTo(0, -r); x.lineTo(r, r * .8); x.lineTo(-r, r * .8); x.closePath(); }
    else if (k === 3) { for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; x[i ? "lineTo" : "moveTo"](Math.cos(an) * rr, Math.sin(an) * rr); } x.closePath(); }
    else if (k === 4) { x.moveTo(0, -r * 1.05); x.lineTo(r * .8, 0); x.lineTo(0, r * 1.05); x.lineTo(-r * .8, 0); x.closePath(); }
    else if (k === 5) poly(x, 6, r, 0);
    else if (k === 6) { const t = r * .36, q = [[-t, -r], [t, -r], [t, -t], [r, -t], [r, t], [t, t], [t, r], [-t, r], [-t, t], [-r, t], [-r, -t], [-t, -t]]; q.forEach((p, i) => x[i ? "lineTo" : "moveTo"](p[0], p[1])); x.closePath(); }
    else poly(x, 5, r, -Math.PI / 2);
    x.fillStyle = col; x.fill();
    if (line !== false) { x.lineJoin = "round"; x.lineWidth = Math.max(2, r * .1); x.strokeStyle = line || "rgba(255,255,255,.85)"; x.stroke(); }
    x.fillStyle = "rgba(255,255,255,.22)"; x.beginPath(); x.arc(-r * .28, -r * .3, r * .2, 0, TAU); x.fill();
    x.restore();
  }
  const sky = (x, W, H, a, b) => { const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, a); gr.addColorStop(1, b); x.fillStyle = gr; x.fillRect(0, 0, W, H); };
  const txt = (x, s, px, py, size, col, al) => { x.font = "bold " + size + "px system-ui, sans-serif"; x.textAlign = al || "center"; x.textBaseline = "middle"; x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  // little picture badge: an eye (watch!) or a green play button (your turn!)
  function badge(x, px, py, watch, t) {
    x.save(); x.translate(px, py);
    if (watch) { x.beginPath(); x.ellipse(0, 0, 26, 15, 0, 0, TAU); x.fillStyle = "#fff"; x.fill(); x.beginPath(); x.arc(Math.sin(t * 3) * 6, 0, 9, 0, TAU); x.fillStyle = "#2b2b5a"; x.fill(); }
    else { const s = 1 + Math.sin(t * 6) * .08; x.scale(s, s); x.beginPath(); x.arc(0, 0, 22, 0, TAU); x.fillStyle = "#3ddc84"; x.fill(); x.beginPath(); x.moveTo(-6, -11); x.lineTo(13, 0); x.lineTo(-6, 11); x.closePath(); x.fillStyle = "#fff"; x.fill(); }
    x.restore();
  }
  function mkfx() {
    const ps = [];
    return {
      burst(px, py, col, n, sp) { for (let i = 0; i < (n || 14); i++) { const a = Math.random() * TAU, s = (sp || 150) * (.4 + Math.random() * .8); ps.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, life: .6 + Math.random() * .4, col, r: 2 + Math.random() * 3 }); } },
      draw(x, dt) { for (let i = ps.length - 1; i >= 0; i--) { const p = ps[i]; p.life -= dt; if (p.life <= 0) { ps.splice(i, 1); continue; } p.vy += 300 * dt; p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.min(1, p.life * 2); x.fillStyle = p.col; x.beginPath(); x.arc(p.x, p.y, p.r, 0, TAU); x.fill(); } x.globalAlpha = 1; }
    };
  }
  const popAt = (g, cv, px, py, text, col) => g.pop(text, px * cv.c.clientWidth / cv.W, py * cv.c.clientHeight / cv.H, col);
  const heartsText = n => "Lives: " + n;

  // ================= 1. Shape Flip Match =================
  B.add({
    id: "s2-flip-match", name: "Shape Flip Match", ages: [5, 8], cat: "Memory", color: "#ff7ac8",
    icon: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="9" height="13" rx="2" fill="#fff"/><rect x="13" y="7" width="9" height="13" rx="2" fill="#ffd34e"/></svg>',
    desc: "Flip the cards and find the matching pictures.", controls: "Tap two cards to flip them. Find all the pairs!",
    start(g) {
      const cv = g.canvas(600, 500), { c, x, W, H, pos } = cv, fx = mkfx();
      const cols = g.by(4, 4, 5), rows = g.by(3, 4, 4), pairs = cols * rows / 2;
      const cw = (W - 40) / cols, ch = (H - 90) / rows, cards = [];
      g.shuffle(Array.from({ length: pairs * 2 }, (_, i) => i % pairs)).forEach((k, i) => cards.push({ k, a: 0, up: false, done: false, pulse: 0, cx: 20 + (i % cols + .5) * cw, cy: 75 + (Math.floor(i / cols) + .5) * ch }));
      let sel = [], lock = 0, pend = null, moves = 0, left = pairs, streak = 0, finished = false;
      g.status("Pairs left: " + left);
      g.on(c, "pointerdown", e => {
        if (lock > 0 || finished) return; const p = pos(e);
        const cd = cards.find(q => !q.up && !q.done && Math.abs(p.x - q.cx) < cw / 2 - 4 && Math.abs(p.y - q.cy) < ch / 2 - 4);
        if (!cd) return; cd.up = true; g.sfx("flip"); sel.push(cd);
        if (sel.length === 2) {
          const a = sel[0], b = sel[1]; sel = []; moves++;
          if (a.k === b.k) {
            lock = .45;
            pend = () => {
              a.done = b.done = true; a.pulse = b.pulse = .5; left--; g.status("Pairs left: " + left);
              g.add(10 + streak * 5); streak++; g.sfx("right");
              fx.burst(a.cx, a.cy, PAL[a.k % 8], 14); fx.burst(b.cx, b.cy, PAL[b.k % 8], 14);
              if (left === 0) { finished = true; g.add(Math.max(0, 40 - moves * 2)); g.win("All pairs found in " + moves + " tries!"); }
            };
          } else {
            lock = g.by(1.1, .85, .6);
            pend = () => { a.up = b.up = false; streak = 0; g.sfx("back"); };
          }
        }
      });
      g.loop(dt => {
        if (lock > 0) { lock -= dt; if (lock <= 0 && pend) { const f = pend; pend = null; f(); if (finished) return false; } }
        sky(x, W, H, "#3a1c71", "#d76d77");
        txt(x, "Tries: " + moves, W / 2, 38, 24, "#fff");
        const cwid = cw - 12, chei = ch - 12;
        cards.forEach(q => {
          const goal = q.up ? 1 : 0; q.a += (goal - q.a) * Math.min(1, dt * 11); if (Math.abs(q.a - goal) < .01) q.a = goal; q.pulse = Math.max(0, q.pulse - dt);
          const w = Math.max(.04, Math.abs(Math.cos(q.a * Math.PI))), up = q.a > .5, sc = 1 + q.pulse * .4;
          x.save(); x.translate(q.cx, q.cy); x.scale(w * sc, sc);
          x.shadowColor = "rgba(0,0,0,.35)"; x.shadowBlur = 10; x.shadowOffsetY = 4;
          x.beginPath(); x.roundRect(-cwid / 2, -chei / 2, cwid, chei, 14);
          if (up) x.fillStyle = "#fff8e8"; else { const gr = x.createLinearGradient(0, -chei / 2, 0, chei / 2); gr.addColorStop(0, "#5ad1ff"); gr.addColorStop(1, "#3a63ff"); x.fillStyle = gr; }
          x.fill(); x.shadowColor = "transparent"; x.shadowBlur = 0; x.shadowOffsetY = 0;
          const m = Math.min(cwid, chei);
          if (up) shape(x, q.k % 8, 0, 0, m * .32, PAL[(q.k * 3 + (q.k >> 3)) % 8]);
          else { x.lineWidth = 3; x.strokeStyle = "rgba(255,255,255,.7)"; x.stroke(); x.fillStyle = "rgba(255,255,255,.35)"; x.beginPath(); x.arc(0, 0, m * .14, 0, TAU); x.fill(); }
          if (q.done) { x.lineWidth = 5; x.strokeStyle = "#6be28f"; x.beginPath(); x.roundRect(-cwid / 2, -chei / 2, cwid, chei, 14); x.stroke(); }
          x.restore();
        });
        fx.draw(x, dt);
      });
    }
  });

  // ================= 2. Sound Pads (Simon) =================
  B.add({
    id: "s2-sound-pads", name: "Sound Pads", ages: [6, 12], cat: "Memory", color: "#4cc3ff",
    icon: '<svg viewBox="0 0 24 24"><path d="M12 12L12 2A10 10 0 0 1 22 12Z" fill="#ff4d6d"/><path d="M12 12L22 12A10 10 0 0 1 12 22Z" fill="#ffd34e"/><path d="M12 12L12 22A10 10 0 0 1 2 12Z" fill="#3ddc84"/><path d="M12 12L2 12A10 10 0 0 1 12 2Z" fill="#4cc3ff"/></svg>',
    desc: "Watch the lights, listen to the notes, then play the tune back.", controls: "Tap the pads in the same order (or press 1 to 4)",
    start(g) {
      const cv = g.canvas(560, 560), { c, x, W, H, pos } = cv, fx = mkfx();
      const N = g.by(4, 4, 6), step = g.by(.85, .62, .45), seg = TAU / N;
      const cols = ["#ff4d6d", "#4cc3ff", "#ffd34e", "#3ddc84", "#b48cff", "#ff8a2a"], notes = [262, 330, 392, 440, 523, 587];
      const mx = W / 2, my = H / 2, R = 262, r0 = 80;
      const seq = []; let ph = "gap", idx = 0, acc = 0, inp = 0, lit = -1, litT = 0, wait = .6, shake = 0;
      g.status("Round 1");
      const light = (p, d) => { lit = p; litT = d; g.sfx("note", notes[p]); const a = -Math.PI / 2 + (p + .5) * seg; fx.burst(mx + Math.cos(a) * 190, my + Math.sin(a) * 190, cols[p], 12, 130); };
      const press = p => {
        if (ph !== "input") return; light(p, .25);
        if (p === seq[inp]) { inp++; if (inp >= seq.length) { g.add(1); ph = "gap"; wait = .9; g.status("Round " + (seq.length + 1)); } }
        else { g.sfx("wrong"); shake = .4; ph = "fail"; wait = .9; }
      };
      g.on(c, "pointerdown", e => {
        const p = pos(e), dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy); if (d < r0 || d > R) return;
        const ang = (Math.atan2(dy, dx) + Math.PI / 2 + TAU) % TAU; press(Math.min(N - 1, Math.floor(ang / seg)));
      });
      g.on(window, "keydown", e => { const k = parseInt(e.key, 10); if (k >= 1 && k <= N) press(k - 1); });
      const padPath = i => { const a0 = -Math.PI / 2 + i * seg + .035, a1 = -Math.PI / 2 + (i + 1) * seg - .035; x.beginPath(); x.arc(mx, my, R, a0, a1); x.arc(mx, my, r0, a1, a0, true); x.closePath(); };
      g.loop((dt, t) => {
        if (litT > 0) { litT -= dt; if (litT <= 0) lit = -1; }
        if (shake > 0) shake -= dt;
        if (ph === "gap") { wait -= dt; if (wait <= 0) { seq.push(g.ri(0, N - 1)); ph = "show"; idx = -1; acc = step; wait = .5; } }
        else if (ph === "show") { if (wait > 0) wait -= dt; else { acc += dt; if (acc >= step) { acc = 0; idx++; if (idx >= seq.length) { ph = "input"; inp = 0; } else light(seq[idx], step * .6); } } }
        else if (ph === "fail") { wait -= dt; if (wait <= 0) { g.over("You remembered " + (seq.length - 1) + " in a row!"); return false; } }
        x.save(); if (shake > 0) x.translate(Math.sin(t * 90) * 7, 0);
        sky(x, W, H, "#14142b", "#2a1a4a");
        for (let i = 0; i < N; i++) {
          padPath(i);
          if (lit === i) { x.shadowColor = cols[i]; x.shadowBlur = 40; x.fillStyle = cols[i]; } else x.fillStyle = cols[i] + "77";
          x.fill(); x.shadowBlur = 0; x.shadowColor = "transparent";
        }
        x.beginPath(); x.arc(mx, my, r0 - 8, 0, TAU); x.fillStyle = "#101024"; x.fill();
        if (ph !== "fail") badge(x, mx, my, ph === "show" || ph === "gap", t);
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 3. Odd One Out (spot the change) =================
  B.add({
    id: "s2-odd-one-out", name: "Odd One Out", ages: [6, 11], cat: "Memory", color: "#ffd34e",
    icon: '<svg viewBox="0 0 24 24"><circle cx="6" cy="7" r="4" fill="#4cc3ff"/><circle cx="18" cy="7" r="4" fill="#4cc3ff"/><circle cx="6" cy="18" r="4" fill="#4cc3ff"/><path d="M18 13.5l1.7 3.4 3.7.5-2.7 2.6.7 3.7-3.4-1.8-3.4 1.8.7-3.7-2.7-2.6 3.7-.5z" fill="#ff5d73"/></svg>',
    desc: "Study the shapes. After a blink, one of them has changed. Which one?", controls: "Look carefully, then tap the shape that is different",
    start(g) {
      const cv = g.canvas(640, 420), { c, x, W, H, pos } = cv, fx = mkfx();
      const slotXY = i => ({ x: (i % 4 + .5) * W / 4, y: 70 + (Math.floor(i / 4) + .5) * (H - 90) / 3 });
      let round = 0, lives = 3, ph = "study", t = 0, items = [], after = [], ci = 0, studyT = 3, shake = 0, picked = -1, good = false;
      const same = (a, b) => a.k === b.k && a.c === b.c;
      const setup = () => {
        const n = Math.min(10, g.by(3, 4, 5) + Math.floor(round / 2));
        const slots = g.shuffle(Array.from({ length: 12 }, (_, i) => i)).slice(0, n);
        items = []; slots.forEach(s => { let it; do { it = { s, k: g.ri(0, 7), c: g.ri(0, 7) }; } while (items.some(o => same(o, it))); items.push(it); });
        ci = g.ri(0, n - 1); let ch, guard = 0;
        do { ch = Object.assign({}, items[ci]); if (g.rand() < .5) ch.k = g.ri(0, 7); else ch.c = g.ri(0, 7); guard++; } while ((same(ch, items[ci]) || items.some((o, j) => j !== ci && same(o, ch))) && guard < 200);
        after = items.map((o, j) => j === ci ? ch : o);
        studyT = Math.max(1.3, g.by(3.6, 2.7, 2) - round * .08) + n * .25; ph = "study"; t = 0; picked = -1;
        g.status(heartsText(lives));
      };
      setup();
      g.on(c, "pointerdown", e => {
        if (ph !== "pick") return; const p = pos(e); let j = -1;
        after.forEach((o, i) => { const q = slotXY(o.s); if (Math.abs(p.x - q.x) < 48 && Math.abs(p.y - q.y) < 48) j = i; });
        if (j < 0) return; ph = "result"; t = 0; picked = j; good = j === ci;
        const q = slotXY(after[ci].s);
        if (good) { g.add(1 + Math.floor(round / 2)); g.sfx("right"); fx.burst(q.x, q.y, "#ffd34e", 20); popAt(g, cv, q.x, q.y - 30, "Yes!", "#ffd34e"); }
        else { lives--; shake = .4; g.sfx("wrong"); g.status(heartsText(lives)); }
      });
      const drawItems = (list, ring) => {
        list.forEach((o, j) => {
          const q = slotXY(o.s); x.fillStyle = "rgba(255,255,255,.12)"; x.beginPath(); x.roundRect(q.x - 46, q.y - 46, 92, 92, 16); x.fill();
          shape(x, o.k, q.x, q.y, 30, PAL[o.c]);
          if (ring && j === ci) { x.strokeStyle = good ? "#6be28f" : "#ff5d73"; x.lineWidth = 5; x.beginPath(); x.roundRect(q.x - 48, q.y - 48, 96, 96, 18); x.stroke(); }
        });
      };
      g.loop((dt, tt) => {
        t += dt; if (shake > 0) shake -= dt;
        if (ph === "study" && t >= studyT) { ph = "hide"; t = 0; g.sfx("swish"); }
        else if (ph === "hide" && t > .9) { ph = "pick"; t = 0; }
        else if (ph === "result" && t > 1.2) { if (lives <= 0) { g.over("Great looking! You got " + g.score()); return false; } if (good) round++; setup(); }
        x.save(); if (shake > 0) x.translate(Math.sin(tt * 90) * 6, 0);
        sky(x, W, H, "#1b6ca8", "#6be2d6");
        if (ph === "study") {
          badge(x, W / 2, 32, true, tt); x.fillStyle = "rgba(255,255,255,.3)"; x.fillRect(W / 2 - 100, 58, 200 * (1 - t / studyT), 5);
          drawItems(items);
        } else if (ph === "hide") {
          badge(x, W / 2, 32, true, tt); drawItems(t < .45 ? items : after);
          const cov = t < .4 ? t / .4 : t < .6 ? 1 : 1 - (t - .6) / .3, pw = W / 2 * cov;
          [0, 1].forEach(s => { const px = s ? W - pw : 0; const gr = x.createLinearGradient(px, 0, px + pw, 0); gr.addColorStop(0, "#b3203d"); gr.addColorStop(1, "#e0405f"); x.fillStyle = gr; x.fillRect(px, 66, pw, H - 66); x.fillStyle = "rgba(255,255,255,.12)"; for (let i = 0; i < pw; i += 24) x.fillRect(px + i, 66, 8, H - 66); });
        } else {
          x.beginPath(); x.arc(W / 2, 32, 22, 0, TAU); x.fillStyle = "#ffd34e"; x.fill(); txt(x, "?", W / 2, 33, 28, "#3a2a00");
          drawItems(after, ph === "result");
        }
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 4. Follow the Shell =================
  B.add({
    id: "s2-follow-shell", name: "Follow the Shell", ages: [5, 10], cat: "Memory", color: "#ff8a2a",
    icon: '<svg viewBox="0 0 24 24"><path d="M6 21L8 6h8l2 15z" fill="#ff5d73"/><ellipse cx="12" cy="6" rx="4" ry="1.5" fill="#ffb3c0"/><circle cx="12" cy="22" r="2" fill="#ffd34e"/></svg>',
    desc: "Keep your eyes on the cup with the ball while they all shuffle.", controls: "Watch the ball, then tap the cup it is under (or press 1 to 4)",
    start(g) {
      const cv = g.canvas(640, 400), { c, x, W, H, pos } = cv, fx = mkfx();
      const n = g.by(3, 3, 4), cups = [];
      for (let i = 0; i < n; i++) cups.push({ x: W * (i + 1) / (n + 1), y: 0, lift: 0, lt: 0 });
      let lives = 3, round = 0, ph = "show", t = 0, ball = 0, swaps = [], si = 0, st = 0, dur = .5, A = null, Bc = null, ax = 0, bx = 0, sel = -1, good = false, shake = 0;
      g.status(heartsText(lives));
      const beginSwap = () => { A = cups[swaps[si][0]]; Bc = cups[swaps[si][1]]; ax = A.x; bx = Bc.x; st = 0; };
      const startRound = () => {
        ball = g.ri(0, n - 1); ph = "show"; t = 0; sel = -1; swaps = []; si = 0;
        const cnt = Math.min(22, g.by(4, 6, 8) + round * 2);
        for (let i = 0; i < cnt; i++) { const a = g.ri(0, n - 1); let b; do { b = g.ri(0, n - 1); } while (b === a); swaps.push([a, b]); }
        dur = Math.max(.17, g.by(.55, .4, .3) - round * .03); cups.forEach(q => { q.lt = 0; });
      };
      startRound();
      const choose = q => {
        if (ph !== "pick") return; ph = "result"; t = 0; sel = cups.indexOf(q); q.lt = 1; cups[ball].lt = 1; good = sel === ball;
        if (good) { g.add(round + 1); g.sfx("right"); fx.burst(q.x, 290, "#ffd34e", 22); popAt(g, cv, q.x, 200, "+" + (round + 1), "#ffd34e"); }
        else { lives--; shake = .4; g.sfx("wrong"); g.status(heartsText(lives)); }
      };
      g.on(c, "pointerdown", e => { const p = pos(e); const q = cups.find(o => Math.abs(p.x - o.x) < 56 && p.y > 170 && p.y < 350); if (q) choose(q); });
      g.on(window, "keydown", e => { const k = parseInt(e.key, 10); if (k >= 1 && k <= n) choose(cups.slice().sort((a, b) => a.x - b.x)[k - 1]); });
      const drawCup = q => {
        const by = 300 - q.lift * 80 + q.y; x.save(); x.translate(q.x, by);
        x.beginPath(); x.moveTo(-36, -110); x.lineTo(36, -110); x.lineTo(52, 0); x.lineTo(-52, 0); x.closePath();
        const gr = x.createLinearGradient(-52, 0, 52, 0); gr.addColorStop(0, "#c92f4b"); gr.addColorStop(.4, "#ff6a86"); gr.addColorStop(1, "#b8263f"); x.fillStyle = gr; x.fill();
        x.save(); x.clip(); x.fillStyle = "rgba(255,255,255,.85)"; x.fillRect(-60, -72, 120, 22); x.restore();
        x.lineWidth = 3; x.strokeStyle = "#7a1428"; x.stroke();
        x.beginPath(); x.ellipse(0, -110, 36, 8, 0, 0, TAU); x.fillStyle = "#ffb3c0"; x.fill(); x.stroke(); x.restore();
      };
      g.loop((dt, tt) => {
        t += dt; if (shake > 0) shake -= dt;
        cups.forEach(q => { q.lift += (q.lt - q.lift) * Math.min(1, dt * 10); });
        if (ph === "show") { cups[ball].lt = t > .35 && t < 1.7 ? 1 : 0; if (t > 2.2) { ph = "shuffle"; si = 0; beginSwap(); } }
        else if (ph === "shuffle") {
          st += dt; const p = Math.min(1, st / dur), e = p * p * (3 - 2 * p);
          A.x = g.lerp(ax, bx, e); Bc.x = g.lerp(bx, ax, e); A.y = -Math.sin(p * Math.PI) * 34; Bc.y = Math.sin(p * Math.PI) * 22;
          if (p >= 1) { A.x = bx; Bc.x = ax; A.y = Bc.y = 0; si++; if (si >= swaps.length) { ph = "pick"; t = 0; } else beginSwap(); }
        }
        else if (ph === "result" && t > 1.4) { if (lives <= 0) { g.over("Sharp eyes! You found " + g.score() + " points"); return false; } if (good) round++; startRound(); }
        x.save(); if (shake > 0) x.translate(Math.sin(tt * 90) * 6, 0);
        sky(x, W, H, "#2a1a5e", "#8a4fd6");
        x.fillStyle = "rgba(255,230,150,.15)"; x.beginPath(); x.ellipse(W / 2, 80, 260, 60, 0, 0, TAU); x.fill();
        const tg = x.createLinearGradient(0, 290, 0, H); tg.addColorStop(0, "#b4793f"); tg.addColorStop(1, "#6b3f1c"); x.fillStyle = tg; x.fillRect(0, 290, W, H - 290);
        x.fillStyle = "rgba(0,0,0,.12)"; for (let i = 0; i < 6; i++) x.fillRect(0, 310 + i * 18, W, 2);
        cups.forEach(q => { x.fillStyle = "rgba(0,0,0,.28)"; x.beginPath(); x.ellipse(q.x, 304, 54, 10, 0, 0, TAU); x.fill(); });
        const bq = cups[ball]; if (bq.lift > .05) { x.beginPath(); x.arc(bq.x, 284, 18, 0, TAU); const bg = x.createRadialGradient(bq.x - 5, 278, 3, bq.x, 284, 18); bg.addColorStop(0, "#fff7b0"); bg.addColorStop(1, "#ffb300"); x.fillStyle = bg; x.fill(); }
        cups.slice().sort((a, b) => a.y - b.y).forEach(drawCup);
        badge(x, W / 2, 45, ph !== "pick", tt);
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 5. Remember the Path =================
  B.add({
    id: "s2-path-tiles", name: "Remember the Path", ages: [6, 11], cat: "Memory", color: "#6be28f",
    icon: '<svg viewBox="0 0 24 24"><rect x="2" y="14" width="7" height="7" rx="2" fill="#6be28f"/><rect x="9" y="14" width="7" height="7" rx="2" fill="#ffd34e"/><rect x="9" y="7" width="7" height="7" rx="2" fill="#ffd34e"/><rect x="16" y="2" width="6" height="6" rx="2" fill="#ff5d73"/></svg>',
    desc: "Tiles light up in a path. Walk the same path from memory.", controls: "Watch the tiles light up, then tap them in the same order",
    start(g) {
      const cv = g.canvas(560, 560), { c, x, W, H, pos } = cv, fx = mkfx();
      const N = g.by(3, 4, 5), cell = (W - 40) / N, sstep = g.by(.7, .5, .38);
      let path = [], round = 0, lives = 3, ph = "gap", idx = 0, acc = 0, ip = 0, wait = .6, again = false, lit = null, litT = 0, bad = null, badT = 0, shake = 0;
      g.status(heartsText(lives));
      const gen = len => {
        let best = [];
        for (let tr = 0; tr < 30; tr++) {
          const p = [{ x: g.ri(0, N - 1), y: g.ri(0, N - 1) }];
          while (p.length < len) {
            const h = p[p.length - 1];
            const o = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(d => ({ x: h.x + d[0], y: h.y + d[1] })).filter(q => q.x >= 0 && q.y >= 0 && q.x < N && q.y < N && !p.some(s => s.x === q.x && s.y === q.y));
            if (!o.length) break; p.push(g.pick(o));
          }
          if (p.length > best.length) best = p; if (best.length >= len) break;
        }
        return best;
      };
      const beginShow = fresh => { if (fresh) path = gen(Math.min(N * N - 2, g.by(3, 4, 5) + round)); ph = "show"; idx = -1; acc = sstep; wait = .6; ip = 0; };
      beginShow(true);
      g.on(c, "pointerdown", e => {
        if (ph !== "input") return; const p = pos(e), cx = Math.floor((p.x - 20) / cell), cy = Math.floor((p.y - 20) / cell);
        if (cx < 0 || cy < 0 || cx >= N || cy >= N) return;
        const need = path[ip], px = 20 + (cx + .5) * cell, py = 20 + (cy + .5) * cell;
        if (cx === need.x && cy === need.y) {
          ip++; g.sfx("note", 300 + ip * 35); fx.burst(px, py, "#6be28f", 10, 110);
          if (ip >= path.length) { g.add(path.length); round++; ph = "gap"; again = false; wait = .9; g.sfx("star"); popAt(g, cv, px, py, "+" + path.length, "#6be28f"); }
        } else {
          lives--; g.status(heartsText(lives)); bad = { x: cx, y: cy }; badT = .5; shake = .3; g.sfx("wrong");
          if (lives <= 0) { ph = "fail"; wait = .9; } else { ph = "gap"; again = true; wait = 1; }
        }
      });
      g.loop((dt, t) => {
        if (litT > 0) { litT -= dt; if (litT <= 0) lit = null; } if (badT > 0) badT -= dt; if (shake > 0) shake -= dt;
        if (ph === "gap") { wait -= dt; if (wait <= 0) beginShow(!again); }
        else if (ph === "show") { if (wait > 0) wait -= dt; else { acc += dt; if (acc >= sstep) { acc = 0; idx++; if (idx >= path.length) { ph = "input"; ip = 0; } else { lit = path[idx]; litT = sstep * .8; g.sfx("note", 260 + idx * 35); } } } }
        else if (ph === "fail") { wait -= dt; if (wait <= 0) { g.over("Nice path memory! You got " + g.score()); return false; } }
        x.save(); if (shake > 0) x.translate(Math.sin(t * 90) * 6, 0);
        sky(x, W, H, "#16314a", "#1e5a63");
        for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
          const px = 20 + i * cell + 5, py = 20 + j * cell + 5, s = cell - 10; let col = "#2b5675";
          if (lit && lit.x === i && lit.y === j) col = "#ffd34e";
          else if (bad && badT > 0 && bad.x === i && bad.y === j) col = "#ff5d73";
          else if ((ph === "input" || ph === "gap") && path.slice(0, ip).some(q => q.x === i && q.y === j)) col = "#3ddc84";
          x.shadowColor = col === "#2b5675" ? "transparent" : col; x.shadowBlur = col === "#2b5675" ? 0 : 22;
          x.fillStyle = col; x.beginPath(); x.roundRect(px, py, s, s, 14); x.fill(); x.shadowBlur = 0;
          x.fillStyle = "rgba(255,255,255,.1)"; x.beginPath(); x.roundRect(px + 4, py + 4, s - 8, s * .35, 10); x.fill();
        }
        if (ph === "show" || ph === "gap") badge(x, W - 36, 36, true, t); else if (ph === "input") badge(x, W - 36, 36, false, t);
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 6. Animal Echo =================
  function animal(x, k, cx, cy, s, open) {
    x.save(); x.translate(cx, cy); x.scale(s / 50, s / 50);
    const eye = (ex, ey, r) => { x.fillStyle = "#fff"; x.beginPath(); x.arc(ex, ey, r, 0, TAU); x.fill(); x.fillStyle = "#222"; x.beginPath(); x.arc(ex, ey + r * .1, r * .55, 0, TAU); x.fill(); };
    const disc = (ex, ey, rx, ry, col) => { x.fillStyle = col; x.beginPath(); x.ellipse(ex, ey, rx, ry, 0, 0, TAU); x.fill(); };
    const tri = (ax, ay, bx, by, qx, qy, col) => { x.fillStyle = col; x.beginPath(); x.moveTo(ax, ay); x.lineTo(bx, by); x.lineTo(qx, qy); x.closePath(); x.fill(); };
    if (k === 0) { // cat
      tri(-46, -18, -38, -72, -8, -42, "#e8892f"); tri(46, -18, 38, -72, 8, -42, "#e8892f"); tri(-38, -26, -35, -58, -17, -40, "#ff9bb3"); tri(38, -26, 35, -58, 17, -40, "#ff9bb3");
      disc(0, 0, 50, 46, "#ffb35c"); eye(-18, -8, 9); eye(18, -8, 9); tri(-5, 6, 5, 6, 0, 13, "#ff7a9a");
      disc(0, 24, 9, 3 + open * 9, "#7a2438");
      x.strokeStyle = "#5a3a1a"; x.lineWidth = 2; x.beginPath(); [[-22, 10, -52, 4], [-22, 16, -52, 18], [22, 10, 52, 4], [22, 16, 52, 18]].forEach(l => { x.moveTo(l[0], l[1]); x.lineTo(l[2], l[3]); }); x.stroke();
    } else if (k === 1) { // frog
      disc(-30, -30, 19, 19, "#4fcf6a"); disc(30, -30, 19, 19, "#4fcf6a"); disc(0, 6, 54, 42, "#4fcf6a"); eye(-30, -31, 14); eye(30, -31, 14);
      disc(0, 24, 24, 3 + open * 14, "#7a2438"); x.strokeStyle = "#1f6b34"; x.lineWidth = 4; x.beginPath(); x.arc(0, 8, 34, .15 * Math.PI, .85 * Math.PI); x.stroke();
      disc(-34, 16, 7, 5, "rgba(255,120,150,.5)"); disc(34, 16, 7, 5, "rgba(255,120,150,.5)");
    } else if (k === 2) { // bunny
      disc(-20, -64, 14, 38, "#f4f0ff"); disc(20, -64, 14, 38, "#f4f0ff"); disc(-20, -62, 7, 27, "#ffb3c8"); disc(20, -62, 7, 27, "#ffb3c8");
      disc(0, 2, 48, 44, "#f4f0ff"); eye(-17, -6, 8); eye(17, -6, 8); disc(0, 8, 6, 4, "#ff7a9a");
      disc(0, 22, 8, 2 + open * 9, "#7a2438"); x.fillStyle = "#fff"; x.fillRect(-5, 20, 10, 6); x.strokeStyle = "#b8b0d8"; x.lineWidth = 1.5; x.strokeRect(-5, 20, 10, 6);
    } else if (k === 3) { // duck
      disc(0, -48, 8, 12, "#ffd84a"); disc(0, 0, 48, 46, "#ffd84a"); eye(-19, -10, 8); eye(19, -10, 8);
      disc(0, 22 + open * 8, 17, 7, "#e56a10"); disc(0, 14, 24, 10, "#ff9a2a");
      disc(-34, 14, 6, 4, "rgba(255,120,150,.5)"); disc(34, 14, 6, 4, "rgba(255,120,150,.5)");
    } else { // owl
      tri(-44, -20, -40, -64, -12, -40, "#7a4e2d"); tri(44, -20, 40, -64, 12, -40, "#7a4e2d");
      disc(0, 0, 50, 50, "#9b6a45"); disc(0, 26, 32, 22, "#d9b48a"); disc(-20, -8, 19, 19, "#fff3c0"); disc(20, -8, 19, 19, "#fff3c0"); eye(-20, -8, 12); eye(20, -8, 12);
      tri(-8, 6, 8, 6, 0, 22 + open * 6, "#ff9f1c");
    }
    x.restore();
  }
  B.add({
    id: "s2-animal-echo", name: "Animal Echo", ages: [5, 9], cat: "Memory", color: "#b48cff",
    icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="#ffb35c"/><path d="M5 9L6 2l5 4zM19 9l-1-7-5 4z" fill="#e8892f"/><circle cx="9" cy="12" r="1.6" fill="#222"/><circle cx="15" cy="12" r="1.6" fill="#222"/></svg>',
    desc: "The animals call out in a pattern. Echo it back!", controls: "Watch who calls, then tap the animals in the same order (or press 1 to 5)",
    start(g) {
      const cv = g.canvas(640, 400), { c, x, W, H, pos } = cv, fx = mkfx();
      const n = g.by(3, 4, 5), notes = [330, 392, 440, 523, 587], plate = ["#ffd9a6", "#bff0c8", "#e6dcff", "#fff2a8", "#e8d2bf"];
      const s = n === 5 ? 44 : n === 4 ? 52 : 58, ax = i => W * (i + 1) / (n + 1), ay = 240, an = Array.from({ length: n }, () => ({ b: 0 }));
      const step = g.by(.9, .7, .55);
      let seq = [], round = 0, lives = 3, ph = "gap", idx = 0, acc = 0, inp = 0, wait = .6, again = false, shake = 0;
      g.status(heartsText(lives));
      const newSeq = () => { const L = Math.min(8, g.by(2, 3, 3) + Math.floor(round / 2)); seq = Array.from({ length: L }, () => g.ri(0, n - 1)); };
      const call = i => { an[i].b = 1; g.sfx("note", notes[i]); fx.burst(ax(i), ay - 20, plate[i], 10, 120); };
      const tap = i => {
        if (ph !== "input") return; call(i);
        if (i === seq[inp]) { inp++; if (inp >= seq.length) { g.add(seq.length); round++; ph = "gap"; again = false; wait = 1; an.forEach(a => { a.b = 1; }); g.sfx("star"); } }
        else { lives--; g.status(heartsText(lives)); shake = .35; g.sfx("wrong"); if (lives <= 0) { ph = "fail"; wait = .9; } else { ph = "gap"; again = true; wait = 1; } }
      };
      g.on(c, "pointerdown", e => { const p = pos(e); for (let i = 0; i < n; i++) if (Math.hypot(p.x - ax(i), p.y - ay) < s * 1.25) { tap(i); return; } });
      g.on(window, "keydown", e => { const k = parseInt(e.key, 10); if (k >= 1 && k <= n) tap(k - 1); });
      g.loop((dt, t) => {
        an.forEach(a => { a.b = Math.max(0, a.b - dt * 3); }); if (shake > 0) shake -= dt;
        if (ph === "gap") { wait -= dt; if (wait <= 0) { if (!again) newSeq(); ph = "show"; idx = -1; acc = step; wait = .5; } }
        else if (ph === "show") { if (wait > 0) wait -= dt; else { acc += dt; if (acc >= step) { acc = 0; idx++; if (idx >= seq.length) { ph = "input"; inp = 0; } else call(seq[idx]); } } }
        else if (ph === "fail") { wait -= dt; if (wait <= 0) { g.over("What a great echo! Score " + g.score()); return false; } }
        x.save(); if (shake > 0) x.translate(Math.sin(t * 90) * 6, 0);
        sky(x, W, H, "#5b3fa8", "#c9a8ff");
        x.fillStyle = "#6bbf6b"; x.fillRect(0, 300, W, H - 300); x.fillStyle = "#58a85a"; x.fillRect(0, 300, W, 8);
        for (let j = 0; j < seq.length; j++) {
          const dx = W / 2 + (j - (seq.length - 1) / 2) * 30; x.beginPath(); x.arc(dx, 50, 10, 0, TAU);
          const on = ph === "show" ? j <= idx : ph === "input" ? j < inp : false;
          x.fillStyle = on ? plate[seq[j]] : "rgba(255,255,255,.25)"; x.fill(); x.lineWidth = 2; x.strokeStyle = "#fff"; x.stroke();
        }
        for (let i = 0; i < n; i++) {
          const b = an[i].b, jump = -Math.sin((1 - b) * Math.PI) * 28 * (b > 0 ? 1 : 0), sc = 1 + .15 * b;
          x.fillStyle = plate[i]; x.beginPath(); x.ellipse(ax(i), ay + s * .95, s * 1.2, s * .3, 0, 0, TAU); x.fill();
          if (b > 0) { x.strokeStyle = "rgba(255,255,255," + b + ")"; x.lineWidth = 4; x.beginPath(); x.arc(ax(i), ay + jump, s * (1.1 + (1 - b) * .6), 0, TAU); x.stroke(); }
          animal(x, i, ax(i), ay + jump, s * sc, Math.min(1, b * 2));
        }
        if (ph === "show" || ph === "gap") badge(x, W - 40, 40, true, t); else if (ph === "input") badge(x, W - 40, 40, false, t);
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 7. Colour Wires =================
  B.add({
    id: "s2-colour-wires", name: "Colour Wires", ages: [6, 11], cat: "Memory", color: "#2ec4b6",
    icon: '<svg viewBox="0 0 24 24"><circle cx="4" cy="6" r="3" fill="#ff5d73"/><circle cx="20" cy="18" r="3" fill="#ff5d73"/><circle cx="4" cy="18" r="3" fill="#4cc3ff"/><circle cx="20" cy="6" r="3" fill="#4cc3ff"/><path d="M4 6C12 6 12 18 20 18M4 18C12 18 12 6 20 6" stroke="#fff" stroke-width="1.6" fill="none"/></svg>',
    desc: "Remember the plug colours, then wire each colour to its match.", controls: "Drag from a left plug to the matching right plug (or tap one, then the other)",
    start(g) {
      const cv = g.canvas(640, 440), { c, x, W, H, pos } = cv, fx = mkfx();
      let lives = g.by(5, 4, 3), round = 0, L = [], R = [], wires = [], ph = "study", t = 0, studyT = 4, sel = null, cur = { x: 0, y: 0 }, drag = false, wait = 0, shake = 0;
      const setup = () => {
        const n = Math.min(7, g.by(3, 4, 5) + Math.floor(round / 2)), cols = g.shuffle(PAL).slice(0, n), lc = g.shuffle(cols), rc = g.shuffle(cols);
        const yy = i => 80 + (i + .5) * (H - 100) / n;
        L = lc.map((col, i) => ({ col, x: 100, y: yy(i), done: false })); R = rc.map((col, i) => ({ col, x: W - 100, y: yy(i), done: false, wr: 0 }));
        wires = []; ph = "study"; t = 0; studyT = Math.max(1.6, g.by(5, 3.6, 2.6) - round * .2) + n * .25; sel = null; drag = false; g.status(heartsText(lives));
      };
      setup();
      const hit = (arr, p) => arr.find(o => Math.hypot(o.x - p.x, o.y - p.y) < 34);
      const connect = (l, r) => {
        if (l.done || r.done) return;
        if (l.col === r.col) {
          l.done = r.done = true; wires.push({ l, r }); g.sfx("clink"); fx.burst((l.x + r.x) / 2, (l.y + r.y) / 2, l.col, 16); fx.burst(r.x, r.y, l.col, 10);
          if (L.every(o => o.done)) { g.add(L.length); round++; ph = "gap"; wait = 1.1; g.sfx("star"); }
        } else {
          lives--; r.wr = .9; shake = .3; g.sfx("wrong"); g.status(heartsText(lives));
          if (lives <= 0) { ph = "fail"; wait = 1; }
        }
      };
      g.on(c, "pointerdown", e => {
        const p = pos(e); cur = p; if (ph !== "play") return;
        const l = hit(L, p); if (l && !l.done) { sel = l; drag = true; g.sfx("click"); return; }
        const r = hit(R, p); if (r && sel) { connect(sel, r); sel = null; }
      });
      g.on(c, "pointermove", e => { cur = pos(e); });
      g.on(c, "pointerup", e => { cur = pos(e); if (drag) { drag = false; const r = hit(R, cur); if (r && sel && ph === "play") { connect(sel, r); sel = null; } } });
      const wire = (x1, y1, x2, y2, col) => {
        x.lineCap = "round"; x.beginPath(); x.moveTo(x1, y1); x.bezierCurveTo(x1 + 120, y1, x2 - 120, y2, x2, y2); x.strokeStyle = "rgba(0,0,0,.45)"; x.lineWidth = 15; x.stroke();
        x.beginPath(); x.moveTo(x1, y1); x.bezierCurveTo(x1 + 120, y1, x2 - 120, y2, x2, y2); x.strokeStyle = col; x.lineWidth = 9; x.stroke();
      };
      const plug = (o, shown, glow) => {
        x.beginPath(); x.arc(o.x, o.y, 28, 0, TAU); x.fillStyle = "#cfd6e8"; x.fill();
        if (glow) { x.shadowColor = glow; x.shadowBlur = 20; }
        x.beginPath(); x.arc(o.x, o.y, 21, 0, TAU); x.fillStyle = shown ? o.col : "#5d6584"; x.fill(); x.shadowBlur = 0; x.shadowColor = "transparent";
        x.beginPath(); x.arc(o.x, o.y, 7, 0, TAU); x.fillStyle = "rgba(0,0,0,.35)"; x.fill();
      };
      g.loop((dt, tt) => {
        t += dt; if (shake > 0) shake -= dt; R.forEach(r => { if (r.wr > 0) r.wr -= dt; });
        if (ph === "study" && t >= studyT) { ph = "play"; g.sfx("swish"); }
        else if (ph === "gap" && t >= 0 && (wait -= dt) <= 0) setup();
        else if (ph === "fail" && (wait -= dt) <= 0) { g.over("The wires are tangled! Score " + g.score()); return false; }
        x.save(); if (shake > 0) x.translate(Math.sin(tt * 90) * 6, 0);
        sky(x, W, H, "#1a2038", "#2d3a5c");
        x.fillStyle = "#3a4468"; x.beginPath(); x.roundRect(50, 70, W - 100, H - 90, 22); x.fill();
        x.fillStyle = "rgba(255,255,255,.06)"; x.beginPath(); x.roundRect(60, 78, W - 120, 40, 14); x.fill();
        wires.forEach(w => wire(w.l.x, w.l.y, w.r.x, w.r.y, w.l.col));
        if (sel && !sel.done) wire(sel.x, sel.y, cur.x, cur.y, sel.col);
        L.forEach(o => plug(o, true, sel === o ? "#fff" : null)); R.forEach(o => plug(o, ph === "study" || o.done || o.wr > 0, o.wr > 0 ? "#ff5d73" : null));
        if (ph === "study") { badge(x, W / 2, 28, true, tt); x.fillStyle = "rgba(255,255,255,.3)"; x.fillRect(W / 2 - 100, 54, 200 * (1 - t / studyT), 5); }
        else if (ph === "play") badge(x, W / 2, 34, false, tt);
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 8. Hidden Pictures =================
  B.add({
    id: "s2-hidden-pictures", name: "Hidden Pictures", ages: [6, 12], cat: "Memory", color: "#6be28f",
    icon: '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="7" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M15 15l7 7" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M10 6l1.2 2.5 2.7.3-2 1.8.6 2.7-2.5-1.4-2.5 1.4.6-2.7-2-1.8 2.7-.3z" fill="#ffd34e"/></svg>',
    desc: "Spot where the shapes are, then watch them hide in the picture. Find them all!", controls: "Look closely at where the shapes are, then tap them when they hide",
    start(g) {
      const cv = g.canvas(640, 440), { c, x, W, H, pos } = cv, fx = mkfx();
      const sc = document.createElement("canvas"); sc.width = W * 2; sc.height = H * 2; const s = sc.getContext("2d");
      const R = g.by(20, 16, 13), dif = g.by(46, 32, 20);
      const drawScene = () => {
        s.setTransform(2, 0, 0, 2, 0, 0); sky(s, W, 270, "#7fd3ff", "#e6f8ff");
        s.fillStyle = "#fff3a0"; s.beginPath(); s.arc(g.ri(480, 580), 80, 34, 0, TAU); s.fill();
        s.fillStyle = "rgba(255,255,255,.9)"; for (let i = 0; i < 3; i++) { const cx = g.ri(40, 560), cy = g.ri(50, 140); [[0, 0, 32], [28, 6, 24], [-28, 8, 22]].forEach(o => { s.beginPath(); s.arc(cx + o[0], cy + o[1], o[2], 0, TAU); s.fill(); }); }
        s.fillStyle = "#8fd18a"; s.beginPath(); s.ellipse(150, 275, 260, 70, 0, 0, TAU); s.fill(); s.fillStyle = "#79c577"; s.beginPath(); s.ellipse(520, 280, 240, 60, 0, 0, TAU); s.fill();
        const gg = s.createLinearGradient(0, 250, 0, H); gg.addColorStop(0, "#62c25a"); gg.addColorStop(1, "#3d9a4a"); s.fillStyle = gg; s.fillRect(0, 250, W, H - 250);
        s.fillStyle = "#f4b88a"; s.fillRect(60, 170, 120, 90); s.fillStyle = "#c9504d"; s.beginPath(); s.moveTo(48, 174); s.lineTo(120, 112); s.lineTo(192, 174); s.closePath(); s.fill();
        s.fillStyle = "#8a5a3a"; s.fillRect(105, 215, 30, 45); s.fillStyle = "#bfe8ff"; s.fillRect(72, 192, 22, 22); s.fillRect(146, 192, 22, 22);
        for (let i = 0; i < 4; i++) { const tx = g.ri(230, 600), ty = g.ri(240, 290); s.fillStyle = "#7a4e2d"; s.fillRect(tx - 6, ty - 30, 12, 42); [["#2f8f46", 0, -48, 28], ["#3aa356", -20, -34, 22], ["#3aa356", 20, -34, 22]].forEach(o => { s.fillStyle = o[0]; s.beginPath(); s.arc(tx + o[1], ty + o[2], o[3], 0, TAU); s.fill(); }); }
        s.fillStyle = "#58b6e8"; s.beginPath(); s.ellipse(g.ri(300, 440), 380, 70, 26, 0, 0, TAU); s.fill();
        s.fillStyle = "#2d8744"; for (let i = 0; i < 8; i++) { s.beginPath(); s.arc(g.ri(10, W - 10), g.ri(300, 420), g.ri(12, 22), 0, TAU); s.fill(); }
        for (let i = 0; i < 50; i++) { s.fillStyle = g.pick(PAL); s.beginPath(); s.arc(g.ri(5, W - 5), g.ri(265, H - 5), g.ri(2, 4), 0, TAU); s.fill(); }
      };
      let round = 0, objs = [], ph = "study", t = 0, studyT = 4, tl = 40, T = 40, wait = 0, miss = null, shake = 0, found = 0;
      const setup = () => {
        drawScene(); const n = Math.min(8, g.by(3, 3, 4) + round), kinds = g.shuffle([0, 1, 2, 3, 4, 5, 6, 7]).slice(0, n); objs = [];
        kinds.forEach(k => {
          let px = 0, py = 0, tries = 0;
          do { px = g.rf(30, W - 30); py = g.rf(80, H - 30); tries++; } while (tries < 200 && objs.some(o => Math.hypot(o.x - px, o.y - py) < 70));
          const d = s.getImageData(Math.floor(px * 2), Math.floor(py * 2), 1, 1).data;
          objs.push({ x: px, y: py, k, col: PAL[(k + 2) % 8], camo: "rgb(" + [0, 1, 2].map(i => Math.max(0, d[i] - dif)).join(",") + ")", found: false });
        });
        studyT = g.by(4, 3, 2.2) + n * .5; T = tl = g.by(45, 35, 26) + n * 4; ph = "study"; t = 0; found = 0; miss = null; g.status("Found 0 of " + n);
      };
      setup();
      g.on(c, "pointerdown", e => {
        if (ph !== "find") return; const p = pos(e); const o = objs.find(q => !q.found && Math.hypot(q.x - p.x, q.y - p.y) < R + 16);
        if (o) {
          o.found = true; found++; g.sfx("right"); fx.burst(o.x, o.y, o.col, 16); g.status("Found " + found + " of " + objs.length);
          if (found === objs.length) { g.add(objs.length * 5 + Math.floor(tl)); round++; ph = "gap"; wait = 1.2; g.sfx("star"); }
        } else { tl -= 2; shake = .25; miss = { x: p.x, y: p.y, t: .6 }; g.sfx("wrong"); }
      });
      g.loop((dt, tt) => {
        t += dt; if (shake > 0) shake -= dt; if (miss) { miss.t -= dt; if (miss.t <= 0) miss = null; }
        if (ph === "study" && t >= studyT) { ph = "fade"; t = 0; g.sfx("swish"); }
        else if (ph === "fade" && t > .9) { ph = "find"; t = 0; }
        else if (ph === "find") { tl -= dt; if (tl <= 0) { g.over("Time's up! You found " + found + " this round"); return false; } }
        else if (ph === "gap" && (wait -= dt) <= 0) setup();
        x.save(); if (shake > 0) x.translate(Math.sin(tt * 90) * 5, 0);
        x.drawImage(sc, 0, 0, W, H);
        const f = ph === "study" ? 0 : ph === "fade" ? t / .9 : 1;
        objs.forEach(o => {
          if (o.found || ph === "gap") { shape(x, o.k, o.x, o.y, R, o.col); x.strokeStyle = "#fff"; x.lineWidth = 3; x.beginPath(); x.arc(o.x, o.y, R + 8, 0, TAU); x.stroke(); return; }
          if (f < 1) { shape(x, o.k, o.x, o.y, R, o.col, 1 - f); if (ph === "study") { x.strokeStyle = "rgba(255,255,255,.8)"; x.lineWidth = 3; x.beginPath(); x.arc(o.x, o.y, R + 8 + Math.sin(tt * 6) * 3, 0, TAU); x.stroke(); } }
          if (f > 0) shape(x, o.k, o.x, o.y, R, o.camo, f, "rgba(0,0,0,.12)");
        });
        x.fillStyle = "rgba(20,20,50,.75)"; x.fillRect(0, 0, W, 48);
        objs.forEach((o, i) => { shape(x, o.k, 28 + i * 46, 24, 14, o.col); if (o.found) { x.strokeStyle = "#6be28f"; x.lineWidth = 4; x.beginPath(); x.moveTo(20 + i * 46, 25); x.lineTo(27 + i * 46, 32); x.lineTo(40 + i * 46, 14); x.stroke(); } });
        if (ph === "study") { badge(x, W - 40, 24, true, tt); x.fillStyle = "rgba(255,255,255,.4)"; x.fillRect(W - 190, 20, 100 * (1 - t / studyT), 8); }
        else if (ph === "find" || ph === "fade") { x.fillStyle = "rgba(255,255,255,.25)"; x.fillRect(W - 210, 18, 190, 12); x.fillStyle = tl / T < .25 ? "#ff5d73" : "#6be28f"; x.fillRect(W - 210, 18, 190 * Math.max(0, tl / T), 12); }
        if (miss) { txt(x, "X", miss.x, miss.y, 30, "rgba(255,80,100," + (miss.t / .6) + ")"); }
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 9. Sliding Doors =================
  B.add({
    id: "s2-sliding-doors", name: "Sliding Doors", ages: [6, 10], cat: "Memory", color: "#b48cff",
    icon: '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2" fill="#fff6dc"/><rect x="2" y="3" width="8" height="18" fill="#8a5a9e"/><rect x="14" y="3" width="8" height="18" fill="#8a5a9e"/><path d="M12 7l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z" fill="#ff5d73"/></svg>',
    desc: "The doors slide open for a moment. Remember what hides behind each one!", controls: "Look at the pictures, then tap the door that hides the picture shown at the top",
    start(g) {
      const cv = g.canvas(600, 500), { c, x, W, H, pos } = cv, fx = mkfx();
      const cols = g.by(3, 3, 4), rows = g.by(2, 3, 3), nD = cols * rows, cw = (W - 30) / cols, chh = (H - 120) / rows;
      const doors = Array.from({ length: nD }, (_, i) => ({ cx: 15 + (i % cols + .5) * cw, cy: 110 + (Math.floor(i / cols) + .5) * chh, k: 0, col: 0, o: 0, ot: 0 }));
      let lives = 3, set = 0, ph = "study", t = 0, studyT = 3, qi = 0, asks = [], tgt = null, shake = 0, good = false;
      const dw = cw - 14, dh = chh - 14;
      const setup = () => {
        const ids = g.shuffle(Array.from({ length: nD }, (_, i) => i));
        doors.forEach((d, i) => { const id = ids[i]; d.k = id % 8; d.col = (id * 3 + (id >> 3)) % 8; d.ot = 1; });
        studyT = Math.max(1.2, g.by(3.8, 2.8, 2) - set * .15) + nD * .15; ph = "study"; t = 0; asks = g.shuffle(doors).slice(0, Math.min(3, nD)); qi = 0; tgt = null; g.status(heartsText(lives));
      };
      setup();
      g.on(c, "pointerdown", e => {
        if (ph !== "ask" || t < .6) return; const p = pos(e);
        const d = doors.find(q => Math.abs(p.x - q.cx) < dw / 2 && Math.abs(p.y - q.cy) < dh / 2); if (!d) return;
        ph = "reveal"; t = 0; d.ot = 1; tgt.ot = 1; good = d === tgt;
        if (good) { g.add(1 + set); g.sfx("right"); fx.burst(d.cx, d.cy, PAL[d.col], 20); popAt(g, cv, d.cx, d.cy - 30, "+" + (1 + set), "#ffd34e"); }
        else { lives--; shake = .35; g.sfx("wrong"); g.status(heartsText(lives)); }
      });
      g.loop((dt, tt) => {
        t += dt; if (shake > 0) shake -= dt; doors.forEach(d => { d.o += (d.ot - d.o) * Math.min(1, dt * 6); });
        if (ph === "study" && t >= studyT) { doors.forEach(d => { d.ot = 0; }); ph = "ask"; t = 0; tgt = asks[qi]; g.sfx("swish"); }
        else if (ph === "reveal" && t > 1.2) {
          doors.forEach(d => { d.ot = 0; });
          if (lives <= 0) { g.over("Great remembering! Score " + g.score()); return false; }
          qi++; if (qi < asks.length) { ph = "ask"; t = 0; tgt = asks[qi]; } else { set++; ph = "pause"; t = 0; }
        } else if (ph === "pause" && t > .8) setup();
        x.save(); if (shake > 0) x.translate(Math.sin(tt * 90) * 6, 0);
        sky(x, W, H, "#3a2a6e", "#7a5bd0");
        doors.forEach(d => {
          x.save(); x.shadowColor = "rgba(0,0,0,.35)"; x.shadowBlur = 8; x.shadowOffsetY = 3;
          x.beginPath(); x.roundRect(d.cx - dw / 2, d.cy - dh / 2, dw, dh, 12); x.fillStyle = "#fff6dc"; x.fill(); x.shadowColor = "transparent"; x.shadowBlur = 0; x.shadowOffsetY = 0; x.clip();
          shape(x, d.k, d.cx, d.cy, Math.min(dw, dh) * .3, PAL[d.col]);
          const half = dw / 2, off = d.o * half;
          [[-1, d.cx - dw / 2 - off], [1, d.cx + off]].forEach(pr => {
            const px = pr[1]; const gr = x.createLinearGradient(px, 0, px + half, 0); gr.addColorStop(0, "#8a5a9e"); gr.addColorStop(1, "#a874bf"); x.fillStyle = gr; x.fillRect(px, d.cy - dh / 2, half, dh);
            x.fillStyle = "rgba(255,255,255,.14)"; for (let i = 0; i < dh; i += 22) x.fillRect(px, d.cy - dh / 2 + i, half, 6);
            x.fillStyle = "#ffd34e"; x.beginPath(); x.arc(pr[0] < 0 ? px + half - 10 : px + 10, d.cy, 5, 0, TAU); x.fill();
          });
          x.restore();
          x.lineWidth = 3; x.strokeStyle = tgt && ph === "reveal" && d === tgt ? "#6be28f" : "rgba(255,255,255,.55)"; x.beginPath(); x.roundRect(d.cx - dw / 2, d.cy - dh / 2, dw, dh, 12); x.stroke();
        });
        if (ph === "study") { badge(x, W / 2, 40, true, tt); x.fillStyle = "rgba(255,255,255,.3)"; x.fillRect(W / 2 - 100, 70, 200 * (1 - t / studyT), 6); }
        else if (tgt && ph !== "pause") {
          x.beginPath(); x.arc(W / 2, 50, 38, 0, TAU); x.fillStyle = "#fff6dc"; x.fill(); x.lineWidth = 4; x.strokeStyle = "#ffd34e"; x.stroke();
          shape(x, tgt.k, W / 2, 50, 26, PAL[tgt.col]);
          x.fillStyle = "#ffd34e"; const by = 98 + Math.sin(tt * 6) * 3; x.beginPath(); x.moveTo(W / 2 - 9, by - 8); x.lineTo(W / 2 + 9, by - 8); x.lineTo(W / 2, by + 4); x.closePath(); x.fill();
        }
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 10. Piano Lights =================
  B.add({
    id: "s2-piano-lights", name: "Piano Lights", ages: [7, 12], cat: "Memory", color: "#ff7ac8",
    icon: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="15" rx="2" fill="#fff"/><path d="M8 5v15M14 5v15" stroke="#555" stroke-width="1.2"/><rect x="2" y="5" width="6" height="4" fill="#ff5d73"/><rect x="8" y="5" width="6" height="4" fill="#ffd34e"/><rect x="14" y="5" width="8" height="4" fill="#4cc3ff"/></svg>',
    desc: "A glowing piano plays a little tune. Play it back, key by key!", controls: "Tap the keys (or press A S D F G H J K) in the same order",
    start(g) {
      const cv = g.canvas(640, 400), { c, x, W, H, pos } = cv, fx = mkfx();
      const N = g.by(5, 6, 8), freqs = [262, 294, 330, 349, 392, 440, 494, 523], KEYS = "asdfghjk", step = g.by(.7, .55, .42);
      const kc = ["#ff5d73", "#ff8a2a", "#ffd34e", "#6be28f", "#2ec4b6", "#4cc3ff", "#b48cff", "#ff7ac8"];
      const kw = (W - 40) / N, ky = 150, kh = 230, glow = new Array(N).fill(0), stars = Array.from({ length: 30 }, () => ({ x: g.rf(0, W), y: g.rf(0, 120), p: g.rf(0, 6) }));
      let mel = [], round = 0, lives = 3, ph = "gap", idx = 0, acc = 0, inp = 0, wait = .6, again = false, sw = 0, lastSw = -1, shake = 0;
      g.status(heartsText(lives));
      const newMel = () => {
        const L = Math.min(12, g.by(3, 4, 5) + Math.floor(round / 2)); mel = [];
        for (let i = 0; i < L; i++) { let k, tries = 0; do { k = g.ri(0, N - 1); tries++; } while (tries < 20 && i >= 2 && mel[i - 1] === k && mel[i - 2] === k); mel.push(k); }
      };
      const hitKey = k => { glow[k] = 1; g.sfx("note", freqs[k]); fx.burst(20 + (k + .5) * kw, ky, kc[k], 8, 100); };
      const press = k => {
        if (ph !== "input") return; hitKey(k);
        if (k === mel[inp]) { inp++; if (inp >= mel.length) { g.add(mel.length); round++; ph = "cheer"; sw = 0; lastSw = -1; again = false; } }
        else { lives--; g.status(heartsText(lives)); shake = .35; g.sfx("wrong"); if (lives <= 0) { ph = "fail"; wait = .9; } else { ph = "gap"; again = true; wait = 1; } }
      };
      g.on(c, "pointerdown", e => { const p = pos(e); if (p.y < ky - 20 || p.y > ky + kh + 10) return; const k = Math.floor((p.x - 20) / kw); if (k >= 0 && k < N) press(k); });
      g.on(window, "keydown", e => { const k = KEYS.indexOf(String(e.key).toLowerCase()); if (e.key && e.key.length === 1 && k >= 0 && k < N) press(k); });
      g.loop((dt, t) => {
        for (let i = 0; i < N; i++) glow[i] = Math.max(0, glow[i] - dt * 2.5); if (shake > 0) shake -= dt;
        if (ph === "gap") { wait -= dt; if (wait <= 0) { if (!again) newMel(); ph = "show"; idx = -1; acc = step; wait = .5; } }
        else if (ph === "show") { if (wait > 0) wait -= dt; else { acc += dt; if (acc >= step) { acc = 0; idx++; if (idx >= mel.length) { ph = "input"; inp = 0; } else hitKey(mel[idx]); } } }
        else if (ph === "cheer") { sw += dt; const i = Math.floor(sw / .09); if (i < N && i !== lastSw) { lastSw = i; glow[i] = 1; g.sfx("note", freqs[i] * 2); fx.burst(20 + (i + .5) * kw, ky, kc[i], 6, 90); } if (sw > .09 * N + .4) { ph = "gap"; wait = .3; } }
        else if (ph === "fail") { wait -= dt; if (wait <= 0) { g.over("What a musician! Score " + g.score()); return false; } }
        x.save(); if (shake > 0) x.translate(Math.sin(t * 90) * 6, 0);
        sky(x, W, H, "#1b1038", "#4a2a7a");
        stars.forEach(s => { x.globalAlpha = .4 + .4 * Math.sin(t * 2 + s.p); x.fillStyle = "#fff"; x.fillRect(s.x, s.y, 2, 2); }); x.globalAlpha = 1;
        for (let j = 0; j < mel.length; j++) {
          const dx = W / 2 + (j - (mel.length - 1) / 2) * 26; x.beginPath(); x.arc(dx, 36, 8, 0, TAU);
          const on = ph === "show" ? j <= idx : ph === "input" ? j < inp : ph === "cheer"; x.fillStyle = on ? kc[mel[j]] : "rgba(255,255,255,.22)"; x.fill();
        }
        x.fillStyle = "#15102a"; x.beginPath(); x.roundRect(12, ky - 12, W - 24, kh + 24, 14); x.fill();
        for (let i = 0; i < N; i++) {
          const kx = 20 + i * kw + 2, w = kw - 4;
          if (glow[i] > 0) { const gr = x.createLinearGradient(0, ky, 0, ky - 120 * glow[i]); gr.addColorStop(0, kc[i]); gr.addColorStop(1, "rgba(255,255,255,0)"); x.globalAlpha = glow[i]; x.fillStyle = gr; x.fillRect(kx + 6, ky - 120 * glow[i], w - 12, 120 * glow[i]); x.globalAlpha = 1; }
          const wg = x.createLinearGradient(0, ky, 0, ky + kh); wg.addColorStop(0, "#ffffff"); wg.addColorStop(1, "#dcdcf0"); x.fillStyle = wg; x.beginPath(); x.roundRect(kx, ky, w, kh, [0, 0, 12, 12]); x.fill();
          if (glow[i] > 0) { x.globalAlpha = glow[i] * .85; x.fillStyle = kc[i]; x.beginPath(); x.roundRect(kx, ky, w, kh, [0, 0, 12, 12]); x.fill(); x.globalAlpha = 1; }
          x.beginPath(); x.arc(kx + w / 2, ky + 26, 9, 0, TAU); x.fillStyle = kc[i]; x.globalAlpha = .35 + .65 * glow[i]; x.fill(); x.globalAlpha = 1;
        }
        if (ph === "show" || ph === "gap") badge(x, W - 40, 36, true, t); else if (ph === "input") badge(x, W - 40, 36, false, t);
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 11. Find the Twin =================
  B.add({
    id: "s2-find-twin", name: "Find the Twin", ages: [6, 12], cat: "Memory", color: "#ff8a2a",
    icon: '<svg viewBox="0 0 24 24"><path d="M6 3l2 4 4.4.6-3.2 3 .8 4.4L6 13l-4 2 .8-4.4-3.2-3L4 7z" transform="translate(2 2) scale(.9)" fill="#ffd34e"/><path d="M6 3l2 4 4.4.6-3.2 3 .8 4.4L6 13l-4 2 .8-4.4-3.2-3L4 7z" transform="translate(12 8) scale(.9)" fill="#ffd34e"/></svg>',
    desc: "Everyone is different except two twins. Spot the pair before time runs out!", controls: "Tap the two shapes that look exactly the same",
    start(g) {
      const cv = g.canvas(640, 440), { c, x, W, H, pos } = cv, fx = mkfx();
      const vk = g.by(8, 6, 4), vc = g.by(8, 6, 4), vm = g.by(1, 2, 3), base = g.by(55, 42, 32), bonus = g.by(6, 5, 4);
      let round = 0, tl = base, items = [], sel = -1, ph = "play", wait = 0, shake = 0, rows = 2, cols = 4, cw = 0, ch = 0, pair = [];
      const same = (a, b) => a.k === b.k && a.c === b.c && a.m === b.m;
      const build = () => {
        const n = Math.min(20, g.by(8, 12, 16) + Math.min(round, 4) * 2);
        rows = n <= 8 ? 2 : n <= 12 ? 3 : 4; cols = Math.ceil(n / rows); cw = W / cols; ch = (H - 60) / rows;
        const combos = []; for (let s = 0; s < vk; s++) for (let q = 0; q < vc; q++) for (let m = 0; m < vm; m++) combos.push({ k: s, c: q, m });
        const chosen = g.shuffle(combos).slice(0, n - 1), tw = g.pick(chosen);
        items = g.shuffle(chosen.concat([Object.assign({}, tw)])); sel = -1; pair = []; ph = "play";
        g.status("Round " + (round + 1));
      };
      build();
      g.on(c, "pointerdown", e => {
        if (ph !== "play") return; const p = pos(e), cx = Math.floor(p.x / cw), cy = Math.floor((p.y - 60) / ch); if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return;
        const i = cy * cols + cx; if (i >= items.length) return;
        if (sel < 0) { sel = i; g.sfx("click"); return; } if (sel === i) { sel = -1; g.sfx("back"); return; }
        if (same(items[sel], items[i])) {
          pair = [sel, i]; sel = -1; ph = "win"; wait = .8; g.add(5 + round); tl = Math.min(base + 10, tl + bonus); g.sfx("right"); round++;
          pair.forEach(q => fx.burst((q % cols + .5) * cw, 60 + (Math.floor(q / cols) + .5) * ch, "#6be28f", 16));
          popAt(g, cv, p.x, p.y - 20, "+" + bonus + "s", "#6be28f");
        } else { tl -= 3; shake = .3; sel = -1; g.sfx("wrong"); popAt(g, cv, p.x, p.y - 20, "-3s", "#ff5d73"); }
      });
      g.loop((dt, t) => {
        if (shake > 0) shake -= dt;
        if (ph === "play") { tl -= dt; if (tl <= 0) { g.over("Time's up! You found " + round + " twins"); return false; } }
        else if (ph === "win" && (wait -= dt) <= 0) build();
        x.save(); if (shake > 0) x.translate(Math.sin(t * 90) * 6, 0);
        sky(x, W, H, "#2b3a8f", "#7a4fd0");
        x.fillStyle = "rgba(255,255,255,.25)"; x.fillRect(20, 20, W - 40, 14); x.fillStyle = tl / (base + 10) < .25 ? "#ff5d73" : "#6be28f"; x.fillRect(20, 20, (W - 40) * Math.max(0, tl) / (base + 10), 14);
        const r = Math.min(cw, ch) * .3;
        items.forEach((o, i) => {
          const cx = (i % cols + .5) * cw, cy = 60 + (Math.floor(i / cols) + .5) * ch, win = pair.includes(i);
          x.fillStyle = win ? "rgba(107,226,143,.45)" : sel === i ? "rgba(255,211,78,.4)" : "rgba(255,255,255,.12)"; x.beginPath(); x.roundRect(cx - cw / 2 + 5, cy - ch / 2 + 5, cw - 10, ch - 10, 14); x.fill();
          if (sel === i) { x.strokeStyle = "#ffd34e"; x.lineWidth = 4; x.stroke(); }
          shape(x, o.k, cx, cy, r, PAL[o.c]);
          if (o.m === 1) { x.fillStyle = "rgba(20,20,50,.75)"; x.beginPath(); x.arc(cx, cy + 2, r * .22, 0, TAU); x.fill(); }
          else if (o.m === 2) { x.fillStyle = "rgba(20,20,50,.7)"; x.fillRect(cx - r * .5, cy - r * .1, r, r * .22); }
        });
        fx.draw(x, dt); x.restore();
      });
    }
  });

  // ================= 12. Backwards Order =================
  B.add({
    id: "s2-reverse-order", name: "Backwards Order", ages: [8, 13], cat: "Memory", color: "#4cc3ff",
    icon: '<svg viewBox="0 0 24 24"><path d="M20 12H5M10 6l-6 6 6 6" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="19" cy="5" r="3" fill="#ffd34e"/></svg>',
    desc: "Watch the shapes appear, then show them back to front. Last one first!", controls: "After the shapes, tap them in REVERSE order (last shape first). Or press 1 to 6",
    start(g) {
      const cv = g.canvas(640, 440), { c, x, W, H, pos } = cv, fx = mkfx();
      const IT = [{ k: 0, c: "#ff5d73" }, { k: 2, c: "#4cc3ff" }, { k: 3, c: "#ffd34e" }, { k: 1, c: "#6be28f" }, { k: 4, c: "#b48cff" }, { k: 5, c: "#ff8a2a" }];
      const n = g.by(3, 4, 6), freq = [262, 330, 392, 440, 523, 587], stepT = g.by(1.1, .85, .65), PY = 385, px = i => W * (i + 1) / (n + 1);
      let seq = [], round = 0, lives = 3, ph = "gap", idx = 0, acc = 0, cnt = 0, wait = .7, again = false, shake = 0, filled = [], showK = -1, showT = 0;
      g.status(heartsText(lives));
      const newSeq = () => { const L = Math.min(9, g.by(2, 3, 3) + round); seq = Array.from({ length: L }, () => g.ri(0, n - 1)); };
      const tap = j => {
        if (ph !== "input") return; const L = seq.length, slot = L - 1 - cnt;
        if (j === seq[slot]) {
          filled[slot] = j; cnt++; g.sfx("note", freq[j]); fx.burst(px(j), PY, IT[j].c, 8, 100);
          if (cnt >= L) { g.add(L); round++; ph = "gap"; again = false; wait = 1; g.sfx("star"); }
        } else { lives--; g.status(heartsText(lives)); shake = .35; g.sfx("wrong"); if (lives <= 0) { ph = "fail"; wait = .9; } else { ph = "gap"; again = true; wait = 1.1; } }
      };
      g.on(c, "pointerdown", e => { const p = pos(e); for (let i = 0; i < n; i++) if (Math.hypot(p.x - px(i), p.y - PY) < 42) { tap(i); return; } });
      g.on(window, "keydown", e => { const k = parseInt(e.key, 10); if (k >= 1 && k <= n) tap(k - 1); });
      const arrow = (x1, x2, y, col) => { const d = x2 > x1 ? 1 : -1; x.strokeStyle = col; x.lineWidth = 4; x.lineCap = "round"; x.beginPath(); x.moveTo(x1, y); x.lineTo(x2, y); x.moveTo(x2 - d * 12, y - 9); x.lineTo(x2, y); x.lineTo(x2 - d * 12, y + 9); x.stroke(); };
      g.loop((dt, t) => {
        if (shake > 0) shake -= dt; if (showT > 0) { showT -= dt; if (showT <= 0) showK = -1; }
        if (ph === "gap") { wait -= dt; if (wait <= 0) { if (!again) newSeq(); ph = "show"; idx = -1; acc = stepT; wait = .5; filled = []; cnt = 0; } }
        else if (ph === "show") { if (wait > 0) wait -= dt; else { acc += dt; if (acc >= stepT) { acc = 0; idx++; if (idx >= seq.length) { ph = "input"; cnt = 0; filled = []; } else { showK = seq[idx]; showT = stepT * .72; g.sfx("note", freq[showK]); } } } }
        else if (ph === "fail") { wait -= dt; if (wait <= 0) { g.over("Backwards brain! Score " + g.score()); return false; } }
        x.save(); if (shake > 0) x.translate(Math.sin(t * 90) * 6, 0);
        sky(x, W, H, "#16336e", "#3a7bd5");
        x.fillStyle = "rgba(255,255,255,.12)"; x.beginPath(); x.roundRect(W / 2 - 110, 30, 220, 190, 24); x.fill();
        if (showK >= 0) { const p = 1 - showT / (stepT * .72), sc = p < .2 ? p / .2 : 1; shape(x, IT[showK].k, W / 2, 125, 62 * (.6 + .4 * sc), IT[showK].c); }
        if (ph === "show" || ph === "gap") badge(x, W - 44, 44, true, t); else if (ph === "input") badge(x, W - 44, 44, false, t);
        const L = seq.length, sx0 = (W - (L * 60 - 10)) / 2;
        for (let i = 0; i < L; i++) {
          const sx = sx0 + i * 60, nextSlot = ph === "input" ? L - 1 - cnt : -1;
          x.fillStyle = "rgba(255,255,255,.18)"; x.beginPath(); x.roundRect(sx, 262, 50, 50, 10); x.fill();
          x.lineWidth = 3; x.strokeStyle = i === nextSlot ? "#ffd34e" : "rgba(255,255,255,.35)"; x.stroke();
          if (ph === "show" && i <= idx) { x.fillStyle = "rgba(255,255,255,.35)"; x.beginPath(); x.arc(sx + 25, 287, 8, 0, TAU); x.fill(); }
          if (filled[i] !== undefined) shape(x, IT[filled[i]].k, sx + 25, 287, 17, IT[filled[i]].c);
          if (i === nextSlot) { x.fillStyle = "#ffd34e"; const by = 248 + Math.sin(t * 7) * 3; x.beginPath(); x.moveTo(sx + 15, by - 9); x.lineTo(sx + 35, by - 9); x.lineTo(sx + 25, by + 3); x.closePath(); x.fill(); }
        }
        if (ph === "input") arrow(sx0 + L * 60 - 10, sx0, 330, "rgba(255,255,255,.6)"); else if (ph === "show") arrow(sx0, sx0 + L * 60 - 10, 330, "rgba(255,255,255,.35)");
        for (let i = 0; i < n; i++) {
          x.fillStyle = "rgba(255,255,255,.2)"; x.beginPath(); x.arc(px(i), PY, 40, 0, TAU); x.fill();
          shape(x, IT[i].k, px(i), PY, 24, IT[i].c);
        }
        fx.draw(x, dt); x.restore();
      });
    }
  });
})();
