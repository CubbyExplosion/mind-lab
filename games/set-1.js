// Break Time Games: set 1 (Tap & Catch games for the youngest players, ages 5 to 8)
(function () {
  const B = window.BreakGames; if (!B) return;
  const TAU = Math.PI * 2;

  // ---------- shared little helpers ----------
  const circ = (x, cx, cy, r, col) => { x.beginPath(); x.arc(cx, cy, Math.max(0, r), 0, TAU); if (col) { x.fillStyle = col; x.fill(); } };
  const ell = (x, cx, cy, rx, ry, col) => { x.beginPath(); x.ellipse(cx, cy, Math.max(0, rx), Math.max(0, ry), 0, 0, TAU); if (col) { x.fillStyle = col; x.fill(); } };
  const starPath = (x, cx, cy, r, rot) => { x.beginPath(); for (let i = 0; i < 10; i++) { const a = rot + i * Math.PI / 5 - Math.PI / 2, rr = i % 2 ? r * .45 : r; x[i ? "lineTo" : "moveTo"](cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.closePath(); };
  const heartPath = (x, cx, cy, s) => { x.beginPath(); x.moveTo(cx, cy + s * .9); x.bezierCurveTo(cx - s * 1.6, cy - s * .1, cx - s * .9, cy - s * 1.2, cx, cy - s * .45); x.bezierCurveTo(cx + s * .9, cy - s * 1.2, cx + s * 1.6, cy - s * .1, cx, cy + s * .9); x.closePath(); };
  const sky = (x, W, H, a, b) => { const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, a); gr.addColorStop(1, b); x.fillStyle = gr; x.fillRect(0, 0, W, H); };
  const lab = (x, s, px, py, size, col, align) => { x.font = "bold " + size + "px system-ui, sans-serif"; x.textAlign = align || "center"; x.textBaseline = "middle"; x.lineWidth = 4; x.lineJoin = "round"; x.strokeStyle = "rgba(0,0,0,.35)"; x.strokeText(s, px, py); x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  const leafPath = (x, r) => { x.beginPath(); x.moveTo(0, -r); x.quadraticCurveTo(r * .95, -r * .2, 0, r); x.quadraticCurveTo(-r * .95, -r * .2, 0, -r); x.closePath(); };
  // particles, floating text and screen shake for one game
  function fxs(g, cv) {
    const list = [];
    return {
      shake: 0,
      burst(px, py, col, n, sp) { n = n || 10; sp = sp || 150; for (let i = 0; i < n && list.length < 260; i++) { const a = g.rf(0, TAU), s = g.rf(.3, 1) * sp; list.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, life: g.rf(.4, .8), col, r: g.rf(2, 5) }); } },
      txt(s, lx, ly, col) { g.pop(s, lx * cv.c.clientWidth / cv.W, ly * cv.c.clientHeight / cv.H, col); },
      begin(x, dt) { x.save(); if (this.shake > 0) { x.translate(g.rf(-1, 1) * this.shake * 12, g.rf(-1, 1) * this.shake * 12); this.shake = Math.max(0, this.shake - dt * 2.5); } },
      end(x, dt) {
        for (let i = list.length - 1; i >= 0; i--) { const p = list[i]; p.life -= dt; if (p.life <= 0) { list.splice(i, 1); continue; } p.vy += 260 * dt; p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.min(1, p.life * 2); circ(x, p.x, p.y, p.r, p.col); }
        x.globalAlpha = 1; x.restore();
      }
    };
  }

  // ---- 1. Critter Pop: whack-a-mole with cute critters ----
  B.add({
    id: "s1-critters", name: "Critter Pop", ages: [5, 8], cat: "Tap", color: "#7ddc6a", icon: "C",
    desc: "Cute critters pop out of their holes. Boink them!", controls: "Tap or click each critter when it pops up. Golden ones are worth 5!",
    start(g) {
      const cv = g.canvas(600, 500), { c, x, W, H, pos } = cv, fx = fxs(g, cv), TOTAL = 45;
      const KIND = [{ col: "#a9744f", nose: "#f58ab0" }, { col: "#fdfdfd", nose: "#ff8fb8" }, { col: "#6fd16f", nose: "#2f9a45" }, { col: "#ffd34e", nose: "#ff9a2a" }];
      const holes = []; for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++) holes.push({ x: 120 + q * 180, y: 215 + r * 115, state: 0, up: 0, stay: 0, kind: 0 });
      const flowers = []; for (let i = 0; i < 16; i++) flowers.push({ x: (i * 97) % W, y: 160 + (i * 53) % 330, col: ["#ff8fb8", "#fff", "#ffe14a"][i % 3] });
      let spawn = .8, mallet = null; g.status("Time: " + TOTAL);
      g.on(c, "pointerdown", e => {
        const p = pos(e); mallet = { x: p.x, y: p.y, t: 0 }; let hit = false;
        for (let i = holes.length - 1; i >= 0 && !hit; i--) {
          const h = holes[i];
          if (h.state !== 1 || h.up < .35) continue;
          if (Math.abs(p.x - h.x) < 64 && p.y < h.y + 30 && p.y > h.y - 118) {
            h.state = 2; hit = true; const pts = h.kind === 3 ? 5 : 1; g.add(pts); g.sfx(h.kind === 3 ? "star" : "pop");
            fx.burst(h.x, h.y - 55, KIND[h.kind].col, 14); fx.burst(h.x, h.y - 55, "#fff", 6, 90); fx.txt("+" + pts, h.x, h.y - 100, "#fff44f"); fx.shake = .3;
          }
        }
        if (!hit) g.sfx("click");
      });
      const critter = (h, t) => {
        const cx = h.x, cy = h.y + 50 - 100 * h.up, K = KIND[h.kind];
        x.save(); x.beginPath(); x.rect(h.x - 95, h.y - 170, 190, 170); x.clip();
        if (h.kind === 1) { ell(x, cx - 20, cy - 62, 12, 34, "#fff"); ell(x, cx + 20, cy - 62, 12, 34, "#fff"); ell(x, cx - 20, cy - 62, 6, 24, "#ffb3cf"); ell(x, cx + 20, cy - 62, 6, 24, "#ffb3cf"); }
        else if (h.kind === 2) { circ(x, cx - 28, cy - 42, 17, K.col); circ(x, cx + 28, cy - 42, 17, K.col); }
        else { circ(x, cx - 34, cy - 36, 12, K.col); circ(x, cx + 34, cy - 36, 12, K.col); circ(x, cx - 34, cy - 36, 6, "#f3b3c6"); circ(x, cx + 34, cy - 36, 6, "#f3b3c6"); }
        ell(x, cx, cy, 44, 48, K.col); ell(x, cx, cy + 16, 28, 26, "rgba(255,255,255,.28)");
        if (h.kind === 2) { circ(x, cx - 28, cy - 44, 11, "#fff"); circ(x, cx + 28, cy - 44, 11, "#fff"); circ(x, cx - 28, cy - 43, 5, "#222"); circ(x, cx + 28, cy - 43, 5, "#222"); }
        else if (h.state === 2) { x.strokeStyle = "#222"; x.lineWidth = 3; [-16, 16].forEach(o => { x.beginPath(); x.moveTo(cx + o - 6, cy - 16); x.lineTo(cx + o + 6, cy - 4); x.moveTo(cx + o + 6, cy - 16); x.lineTo(cx + o - 6, cy - 4); x.stroke(); }); }
        else { circ(x, cx - 16, cy - 10, 9, "#fff"); circ(x, cx + 16, cy - 10, 9, "#fff"); circ(x, cx - 15, cy - 9, 5, "#222"); circ(x, cx + 17, cy - 9, 5, "#222"); }
        circ(x, cx, cy + 6, 7, K.nose);
        x.strokeStyle = "#5a3320"; x.lineWidth = 3; x.beginPath(); if (h.state === 2) x.arc(cx, cy + 26, 9, Math.PI, TAU); else x.arc(cx, cy + 16, 10, .2, Math.PI - .2); x.stroke();
        if (h.kind === 1 && h.state !== 2) { x.fillStyle = "#fff"; x.fillRect(cx - 7, cy + 20, 6, 9); x.fillRect(cx + 1, cy + 20, 6, 9); }
        if (h.kind === 3) { x.fillStyle = "#ff5a5a"; x.beginPath(); x.moveTo(cx - 24, cy - 40); x.lineTo(cx - 24, cy - 66); x.lineTo(cx - 10, cy - 52); x.lineTo(cx, cy - 72); x.lineTo(cx + 10, cy - 52); x.lineTo(cx + 24, cy - 66); x.lineTo(cx + 24, cy - 40); x.closePath(); x.fill(); }
        x.restore();
        if (h.state === 2) for (let k = 0; k < 3; k++) { const a = t * 8 + k * 2.1; starPath(x, cx + Math.cos(a) * 30, h.y - 95 * h.up + Math.sin(a) * 8 - 20, 7, a); x.fillStyle = "#ffe14a"; x.fill(); }
      };
      g.loop((dt, t) => {
        const left = TOTAL - t;
        if (left <= 0) { g.over("Time's up! Great job!"); return false; }
        g.status("Time: " + Math.ceil(left));
        spawn -= dt;
        if (spawn <= 0) {
          const free = holes.filter(h => h.state === 0);
          if (free.length) { const h = g.pick(free), ramp = 1 - Math.min(.4, t / 110); h.state = 1; h.up = 0; h.kind = Math.random() < .12 ? 3 : g.pick([0, 0, 1, 2]); h.stay = g.by(1.9, 1.4, 1.0) * ramp * (h.kind === 3 ? .75 : 1); }
          spawn = g.by(1.0, .72, .5) * (1 - Math.min(.45, t / 100)) * g.rf(.7, 1.2);
        }
        for (const h of holes) {
          if (h.state === 1) { h.up = Math.min(1, h.up + dt * 7); if (h.up >= 1) { h.stay -= dt; if (h.stay <= 0) h.state = 3; } }
          else if (h.state === 3 || h.state === 2) { h.up -= dt * (h.state === 3 ? 6 : 5); if (h.up <= 0) { h.up = 0; h.state = 0; } }
        }
        fx.begin(x, dt);
        sky(x, W, 160, "#7fd8ff", "#d3f4ff"); circ(x, 520, 60, 34, "#ffe66d"); circ(x, 520, 60, 46, "rgba(255,230,109,.3)");
        [0, 1].forEach(k => { const cxx = ((t * 12 + k * 330) % (W + 160)) - 80; ell(x, cxx, 60 + k * 30, 50, 17, "rgba(255,255,255,.9)"); ell(x, cxx + 22, 50 + k * 30, 30, 15, "rgba(255,255,255,.9)"); });
        const gr = x.createLinearGradient(0, 130, 0, H); gr.addColorStop(0, "#7be07a"); gr.addColorStop(1, "#3fae55"); x.fillStyle = gr; x.beginPath(); x.moveTo(0, 150); x.quadraticCurveTo(W / 2, 110, W, 150); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
        flowers.forEach(f => { circ(x, f.x, f.y, 5, f.col); circ(x, f.x, f.y, 2, "#e8a020"); });
        x.fillStyle = "rgba(0,0,0,.25)"; x.fillRect(20, 14, W - 40, 12);
        x.fillStyle = left < 10 ? "#ff6a6a" : "#ffe14a"; x.fillRect(20, 14, (W - 40) * left / TOTAL, 12);
        for (const h of holes) {
          ell(x, h.x, h.y, 64, 21, "#4a2c18");
          if (h.up > 0) critter(h, t);
          x.beginPath(); x.ellipse(h.x, h.y, 64, 21, 0, 0, Math.PI); x.fillStyle = "#6b4226"; x.fill(); x.lineWidth = 5; x.strokeStyle = "#8a5a35"; x.stroke();
          ell(x, h.x, h.y + 4, 66, 22, null); x.strokeStyle = "rgba(0,0,0,.15)"; x.lineWidth = 3; x.stroke();
        }
        if (mallet) {
          mallet.t += dt;
          if (mallet.t > .3) mallet = null;
          else { x.save(); x.globalAlpha = 1 - mallet.t / .3; x.translate(mallet.x, mallet.y); x.rotate(-1.1 + Math.min(1, mallet.t / .1) * 1.5); x.fillStyle = "#b07a3c"; x.fillRect(-5, -80, 10, 80); x.beginPath(); x.roundRect(-32, -108, 64, 34, 8); x.fillStyle = "#ff5a6e"; x.fill(); x.fillStyle = "#ffe14a"; x.fillRect(-32, -96, 64, 8); x.restore(); }
        }
        fx.end(x, dt);
      });
    }
  });

  // ---- 2. Star Catcher: catch falling stars in a basket ----
  B.add({
    id: "s1-starcatch", name: "Star Catcher", ages: [5, 8], cat: "Tap", color: "#ffd93b",
    icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2l3 7 7 .6-5.3 4.7L18.5 22 12 18l-6.5 4 1.8-7.7L2 9.6 9 9z"/></svg>',
    desc: "Slide the basket to catch the twinkling stars.", controls: "Drag your finger or mouse to move the basket (or arrow keys)",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H, pos } = cv, fx = fxs(g, cv);
      const bw = g.by(124, 104, 86), by = H - 78; let bx = W / 2, tx = bx, lives = 5, spawn = .6, streak = 0, squash = 0;
      const stars = [], bg = []; for (let i = 0; i < 40; i++) bg.push({ x: g.rf(0, W), y: g.rf(0, H - 150), r: g.rf(.8, 2), ph: g.rf(0, 6) });
      const mv = e => { tx = g.clamp(pos(e).x, bw / 2, W - bw / 2); };
      g.on(c, "pointermove", mv); g.on(c, "pointerdown", mv);
      g.status("Lives: " + lives);
      g.loop((dt, t) => {
        if (g.keys.ArrowLeft) tx -= 460 * dt; if (g.keys.ArrowRight) tx += 460 * dt; tx = g.clamp(tx, bw / 2, W - bw / 2);
        bx += (tx - bx) * Math.min(1, dt * 14); squash = Math.max(0, squash - dt * 6);
        spawn -= dt;
        if (spawn <= 0) {
          const ramp = 1 + Math.min(1.2, t / 70), r = Math.random(), kind = r < .07 && lives < 5 ? 2 : r < .27 ? 1 : 0;
          stars.push({ x: g.rf(30, W - 30), y: -30, vy: g.rf(110, 150) * g.by(.8, 1, 1.25) * ramp * (kind === 1 ? 1.35 : 1), kind, rot: g.rf(0, 6), vr: g.rf(-2, 2), r: kind === 1 ? 20 : 26 });
          spawn = g.by(1.0, .78, .6) / ramp * g.rf(.7, 1.2);
        }
        fx.begin(x, dt);
        sky(x, W, H, "#0d1450", "#6a3fa8");
        bg.forEach(s => { x.globalAlpha = .5 + .5 * Math.sin(t * 2 + s.ph); circ(x, s.x, s.y, s.r, "#fff"); }); x.globalAlpha = 1;
        circ(x, 320, 80, 34, "#fff6c9"); circ(x, 332, 72, 30, "#12195c");
        ell(x, 90, H + 10, 260, 110, "#3b2a7a"); ell(x, 330, H + 30, 250, 100, "#2f2166");
        for (let i = stars.length - 1; i >= 0; i--) {
          const s = stars[i]; s.y += s.vy * dt; s.rot += s.vr * dt;
          if (Math.random() < .25) fx.burst(s.x, s.y, s.kind === 1 ? "#ff9ae6" : "#ffe27a", 1, 25);
          if (s.y + s.r * .5 >= by - 14 && s.y < by + 16 && Math.abs(s.x - bx) < bw / 2 + 4) {
            stars.splice(i, 1); squash = 1; streak++;
            if (s.kind === 2) { lives = Math.min(5, lives + 1); g.status("Lives: " + lives); g.sfx("cheer"); fx.txt("Heart!", s.x, by - 40, "#ff7a9a"); fx.burst(s.x, s.y, "#ff7a9a", 14); continue; }
            let pts = s.kind === 1 ? 2 : 1; g.sfx("note", 520 + Math.min(streak, 12) * 40);
            if (streak % 10 === 0) { pts += 3; fx.txt("Streak! +3", s.x, by - 60, "#fff44f"); g.sfx("cheer"); fx.burst(s.x, by, "#ffe27a", 22, 220); }
            g.add(pts); fx.txt("+" + pts, s.x, by - 30, "#fff"); fx.burst(s.x, by - 6, s.kind === 1 ? "#ff9ae6" : "#ffe27a", 10, 130); continue;
          }
          if (s.y > H - 26) {
            stars.splice(i, 1); fx.burst(s.x, H - 30, "#aab", 6, 70); streak = 0;
            if (s.kind !== 2) { lives--; g.status("Lives: " + lives); g.sfx("drop"); fx.shake = .25; if (lives <= 0) { g.over("Great catching, star friend!"); return false; } }
            continue;
          }
          if (s.kind === 2) { x.save(); x.translate(s.x, s.y); x.scale(1 + Math.sin(t * 8) * .08, 1 + Math.sin(t * 8) * .08); heartPath(x, 0, 0, 20); x.fillStyle = "#ff5a7e"; x.fill(); x.lineWidth = 3; x.strokeStyle = "#fff"; x.stroke(); x.restore(); }
          else { const col = s.kind === 1 ? "#ff8ae8" : "#ffd93b"; circ(x, s.x, s.y, s.r * 1.7, s.kind === 1 ? "rgba(255,138,232,.22)" : "rgba(255,217,59,.22)"); starPath(x, s.x, s.y, s.r, s.rot); x.fillStyle = col; x.fill(); x.lineWidth = 3; x.strokeStyle = "#fff"; x.stroke(); circ(x, s.x, s.y, 4, "#fff"); }
        }
        x.save(); x.translate(bx, by); x.scale(1 + squash * .12, 1 - squash * .16);
        x.beginPath(); x.moveTo(-bw / 2, 0); x.lineTo(bw / 2, 0); x.lineTo(bw / 2 - 16, 50); x.lineTo(-bw / 2 + 16, 50); x.closePath(); x.fillStyle = "#c98a4b"; x.fill();
        x.strokeStyle = "rgba(90,50,20,.45)"; x.lineWidth = 3; for (let k = 1; k < 5; k++) { x.beginPath(); x.moveTo(-bw / 2 + k * bw / 5, 0); x.lineTo(-bw / 2 + 16 + k * (bw - 32) / 5, 50); x.stroke(); } for (let k = 1; k < 3; k++) { x.beginPath(); x.moveTo(-bw / 2 + k * 6, k * 16); x.lineTo(bw / 2 - k * 6, k * 16); x.stroke(); }
        x.beginPath(); x.roundRect(-bw / 2 - 6, -9, bw + 12, 16, 8); x.fillStyle = "#e8ac66"; x.fill(); x.restore();
        fx.end(x, dt);
      });
    }
  });

  // ---- 3. Feed the Monster: tap the food the monster wants ----
  B.add({
    id: "s1-monster", name: "Feed the Monster", ages: [5, 8], cat: "Tap", color: "#b48cff", icon: "M",
    desc: "A hungry monster wants a snack. Tap the right food!", controls: "Look at the thought bubble, then tap that food on the belts",
    start(g) {
      const cv = g.canvas(640, 440), { c, x, W, H, pos } = cv, fx = fxs(g, cv);
      const KINDS = g.by(3, 4, 4), GOAL = g.by(20, 25, 30), mx = 320, my = 330, MOUTH = { x: mx, y: my + 20 };
      let lives = g.by(5, 4, 3), fed = 0, want = 0, streakWant = 0, sA = .3, sB = 1.1, chomp = 0, bleh = 0, blink = 3, done = false, mouse = { x: mx, y: 200 };
      const foods = [], flying = [];
      g.status("Fed: 0/" + GOAL + "  Lives: " + lives);
      const food = (kind, cx, cy, r, rot) => {
        x.save(); x.translate(cx, cy); x.rotate(rot || 0);
        if (kind === 0) { circ(x, -r * .25, 2, r * .62, "#ff4d5e"); circ(x, r * .25, 2, r * .62, "#ff4d5e"); circ(x, 0, 4, r * .7, "#ff4d5e"); circ(x, -r * .3, -r * .1, r * .17, "rgba(255,255,255,.5)"); x.strokeStyle = "#6b4226"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, -r * .5); x.lineTo(r * .1, -r * .95); x.stroke(); x.save(); x.translate(r * .35, -r * .75); x.rotate(.6); ell(x, 0, 0, r * .3, r * .14, "#4cc84a"); x.restore(); }
        else if (kind === 1) { circ(x, 0, 0, r * .92, "#e0a95e"); x.lineWidth = 3; x.strokeStyle = "#c68a3e"; x.stroke(); [[-.3, -.3], [.35, -.2], [0, .25], [-.4, .3], [.4, .4], [.05, -.55]].forEach(o => circ(x, o[0] * r, o[1] * r, r * .14, "#5a3320")); }
        else if (kind === 2) { x.beginPath(); x.moveTo(-r * 1.1, 0); x.quadraticCurveTo(0, -r * 1.05, r * 1.1, 0); x.quadraticCurveTo(0, r * 1.05, -r * 1.1, 0); x.fillStyle = "#ffe14a"; x.fill(); x.lineWidth = 3; x.strokeStyle = "#e8b800"; x.stroke(); circ(x, -r * .3, -r * .25, r * .14, "rgba(255,255,255,.6)"); }
        else { [[-.4, -.35], [.4, -.35], [0, -.35], [-.2, .05], [.2, .05], [0, .45]].forEach(o => { circ(x, o[0] * r * 1.1, o[1] * r * 1.1, r * .32, "#8e4fd6"); circ(x, o[0] * r * 1.1 - 3, o[1] * r * 1.1 - 4, r * .08, "rgba(255,255,255,.6)"); }); x.strokeStyle = "#4a8a3a"; x.lineWidth = 4; x.beginPath(); x.moveTo(0, -r * .6); x.lineTo(r * .1, -r * 1.05); x.stroke(); }
        x.restore();
      };
      g.on(c, "pointermove", e => { mouse = pos(e); });
      g.on(c, "pointerdown", e => {
        if (done) return; const p = pos(e); mouse = p;
        for (let i = foods.length - 1; i >= 0; i--) {
          const f = foods[i];
          if (Math.hypot(f.x - p.x, f.y - p.y) < f.r + 12) {
            foods.splice(i, 1);
            if (f.kind === want) { flying.push({ kind: f.kind, sx: f.x, sy: f.y, t: 0, rot: f.rot }); g.sfx("swish"); }
            else { lives--; bleh = .9; streakWant = 0; g.sfx("wrong"); fx.burst(f.x, f.y, "#9a9", 10); fx.txt("Yuck!", f.x, f.y - 20, "#8fe08f"); g.status("Fed: " + fed + "/" + GOAL + "  Lives: " + lives); if (lives <= 0) { done = true; g.over("The monster is sleepy now. Good try!"); } }
            return;
          }
        }
      });
      const belt = (by, dir, t) => { x.fillStyle = "#4a3b63"; x.fillRect(0, by - 36, W, 72); x.fillStyle = "#5e4d7e"; for (let k = -1; k < W / 36 + 2; k++) x.fillRect(((k * 36 + dir * t * 40) % (W + 72)) - 0, by - 36, 8, 72); x.fillStyle = "rgba(255,255,255,.18)"; x.fillRect(0, by - 36, W, 5); };
      g.loop((dt, t) => {
        const ramp = 1 + Math.min(.8, t / 80), spd = g.by(60, 85, 110) * ramp;
        [0, 1].forEach(k => {
          if (k === 0) sA -= dt; else sB -= dt;
          if ((k ? sB : sA) <= 0) {
            const kind = Math.random() < .42 ? want : g.ri(0, KINDS - 1);
            foods.push({ kind, x: k ? W + 40 : -40, y: k ? 170 : 85, vx: (k ? -1 : 1) * spd * g.rf(.85, 1.15), r: 33, rot: g.rf(-.5, .5), ph: g.rf(0, 6) });
            const nx = g.by(1.3, 1.0, .8) / ramp * g.rf(.8, 1.2); if (k) sB = nx; else sA = nx;
          }
        });
        for (let i = foods.length - 1; i >= 0; i--) { const f = foods[i]; f.x += f.vx * dt; if (f.x < -60 || f.x > W + 60) foods.splice(i, 1); }
        for (let i = flying.length - 1; i >= 0; i--) {
          const f = flying[i]; f.t += dt / .4;
          if (f.t >= 1) {
            flying.splice(i, 1); fed++; streakWant++; chomp = .4; g.add(1 + (streakWant >= 3 ? 2 : 0)); g.sfx("pop"); fx.burst(mx, MOUTH.y, "#ffd34e", 12); fx.txt("Yum!", mx, my - 110, "#fff44f");
            g.status("Fed: " + fed + "/" + GOAL + "  Lives: " + lives);
            if (fed >= GOAL) { done = true; g.win("Burp! The monster is full!"); return false; }
            if (streakWant >= 3) { streakWant = 0; let nw = want; while (nw === want) nw = g.ri(0, KINDS - 1); want = nw; g.sfx("gotit"); }
          }
        }
        chomp = Math.max(0, chomp - dt); bleh = Math.max(0, bleh - dt); blink -= dt; if (blink < -.15) blink = g.rf(2, 4);
        fx.begin(x, dt);
        sky(x, W, H, "#ffeab8", "#ffc58a");
        for (let k = 0; k < 14; k++) circ(x, (k * 71) % W, 215 + (k * 37) % 190, 6, "rgba(255,255,255,.35)");
        x.fillStyle = "#8a5fb8"; x.fillRect(0, 405, W, 40);
        belt(85, 1, t); belt(170, -1, t);
        foods.forEach(f => food(f.kind, f.x, f.y + Math.sin(t * 4 + f.ph) * 3, f.r, f.rot + Math.sin(t * 3 + f.ph) * .12));
        // monster
        const sc = 1 + chomp * .3, look = flying.length ? { x: flying[0].sx, y: flying[0].sy } : mouse; let lx = look.x - mx, ly = look.y - (my - 42); const ld = Math.hypot(lx, ly) || 1; lx = lx / ld * 8; ly = ly / ld * 8;
        x.save(); x.translate(mx, my + 100); x.scale(sc, 2 - sc); x.translate(0, -100);
        for (let k = 0; k < 18; k++) { const a = k / 18 * TAU; circ(x, Math.cos(a) * 98, Math.sin(a) * 98, 15, "#8b5fd6"); }
        const bg = x.createRadialGradient(-30, -40, 10, 0, 0, 112); bg.addColorStop(0, "#b99aff"); bg.addColorStop(1, "#7a4fd0"); circ(x, 0, 0, 102, null); x.fillStyle = bg; x.fill();
        x.fillStyle = "#fff3c4"; [[-75, -80, -55, -132, -35, -92], [35, -92, 55, -132, 75, -80]].forEach(p => { x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(p[2], p[3]); x.lineTo(p[4], p[5]); x.closePath(); x.fill(); });
        ell(x, 0, 48, 58, 42, "rgba(255,255,255,.2)");
        [-32, 32].forEach(o => {
          circ(x, o, -42, 25, "#fff");
          if (blink < 0 || bleh > 0) { x.strokeStyle = "#2a1450"; x.lineWidth = 4; x.beginPath(); x.arc(o, -40, 14, .15, Math.PI - .15); x.stroke(); }
          else { circ(x, o + lx, -42 + ly, 11, "#2a1450"); circ(x, o + lx - 3, -42 + ly - 4, 3.5, "#fff"); }
        });
        const mo = flying.length ? .95 : (bleh > 0 ? 0 : .22 + chomp), mry = 6 + mo * 34;
        if (bleh > 0) { x.strokeStyle = "#2a1450"; x.lineWidth = 5; x.beginPath(); for (let k = -40; k <= 40; k += 4) x.lineTo(k, 32 + Math.sin(k * .3 + bleh * 20) * 4); x.stroke(); ell(x, 6, 48, 13, 17, "#7be08a"); x.strokeStyle = "#2a1450"; x.lineWidth = 4; x.beginPath(); x.moveTo(-46, -78); x.lineTo(-18, -66); x.moveTo(46, -78); x.lineTo(18, -66); x.stroke(); }
        else { ell(x, 0, 20 + mry * .3, 48, mry, "#3b0d4f"); if (mo > .3) ell(x, 0, 20 + mry * .9, 24, mry * .4, "#ff7a9a"); x.fillStyle = "#fff"; x.beginPath(); x.roundRect(-30, 20 + mry * .3 - mry, 15, 11, 3); x.roundRect(15, 20 + mry * .3 - mry, 15, 11, 3); x.fill(); }
        ell(x, -108, 30, 22, 14, "#7a4fd0"); ell(x, 108, 30, 22, 14, "#7a4fd0"); ell(x, -40, 108, 24, 12, "#6a40c0"); ell(x, 40, 108, 24, 12, "#6a40c0");
        x.restore();
        flying.forEach(f => { const e = Math.min(1, f.t), s = 1 - e * .5; food(f.kind, f.sx + (MOUTH.x - f.sx) * e, f.sy + (MOUTH.y - f.sy) * e - Math.sin(Math.PI * e) * 60, 33 * s, f.rot + e * 6); });
        // wish bubble
        const bp = { x: 535, y: 320 }; ell(x, bp.x, bp.y, 66, 58, "#fff"); circ(x, bp.x - 75, bp.y + 38, 10, "#fff"); circ(x, bp.x - 98, bp.y + 55, 6, "#fff");
        x.lineWidth = 4; x.strokeStyle = "#d9c2ff"; ell(x, bp.x, bp.y, 66, 58, null); x.stroke(); food(want, bp.x, bp.y + Math.sin(t * 3) * 3, 38, 0);
        fx.end(x, dt);
      });
    }
  });

  // ---- 4. Firefly Jar: catch glowing fireflies ----
  B.add({
    id: "s1-firefly", name: "Firefly Jar", ages: [5, 8], cat: "Tap", color: "#c8ff5e", icon: "F",
    desc: "Catch the glowing fireflies and fill your jar with light.", controls: "Tap or click the fireflies. Bright ones give more!",
    start(g) {
      const cv = g.canvas(640, 420), { c, x, W, H, pos } = cv, fx = fxs(g, cv), TOTAL = 60, N = g.by(7, 9, 12);
      const jar = { x: 545, y: 290, w: 92, h: 112, n: 0, flash: 0 }, flies = [], flying = [], freed = [], grass = [], pend = [];
      for (let i = 0; i < 70; i++) grass.push({ x: i * 9.4 + g.rf(-3, 3), h: g.rf(22, 54), s: g.rf(-6, 6) });
      const mk = gold => ({ x: g.rf(40, 460), y: g.rf(50, 270), a: g.rf(0, TAU), sp: g.rf(25, 45) * g.by(.8, 1, 1.3), ph: g.rf(0, 6), gold });
      for (let i = 0; i < N; i++) flies.push(mk(false));
      g.status("Time: " + TOTAL);
      g.on(c, "pointerdown", e => {
        const p = pos(e); let hit = false;
        for (let i = flies.length - 1; i >= 0; i--) {
          const f = flies[i];
          if (Math.hypot(f.x - p.x, f.y - p.y) < 42) {
            flies.splice(i, 1); hit = true; const bright = f.glow > .6, pts = f.gold ? 5 : bright ? 2 : 1;
            g.add(pts); g.sfx(f.gold ? "star" : "pop"); fx.burst(f.x, f.y, f.gold ? "#ffd34e" : "#d6ff7a", 12); fx.txt((bright && !f.gold ? "Bright! +" : "+") + pts, f.x, f.y - 24, f.gold ? "#ffd34e" : "#e8ff9a");
            flying.push({ sx: f.x, sy: f.y, t: 0, gold: f.gold }); pend.push(.9); break;
          }
        }
        if (!hit) { fx.burst(p.x, p.y, "rgba(255,255,255,.7)", 4, 50); g.sfx("click"); }
      });
      const glowDot = (px, py, r, a) => { const gr = x.createRadialGradient(px, py, 0, px, py, r); gr.addColorStop(0, "rgba(230,255,140," + a + ")"); gr.addColorStop(1, "rgba(230,255,140,0)"); x.fillStyle = gr; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill(); };
      g.loop((dt, t) => {
        const left = TOTAL - t; if (left <= 0) { g.over("What a bright jar of light!"); return false; }
        g.status("Time: " + Math.ceil(left));
        const ramp = 1 + Math.min(.6, t / 100);
        for (let i = pend.length - 1; i >= 0; i--) { pend[i] -= dt; if (pend[i] <= 0) { pend.splice(i, 1); flies.push(mk(Math.random() < .1 && !flies.some(f => f.gold))); } }
        flies.forEach(f => {
          f.a += g.rf(-1, 1) * dt * 4; f.x += Math.cos(f.a) * f.sp * ramp * dt; f.y += Math.sin(f.a) * f.sp * ramp * dt * .8;
          if (f.x < 30 || f.x > W - 30) { f.a = Math.PI - f.a; f.x = g.clamp(f.x, 30, W - 30); } if (f.y < 40 || f.y > H - 110) { f.a = -f.a; f.y = g.clamp(f.y, 40, H - 110); }
          if (f.x > 470 && f.y > 200) f.a = -2.4; f.glow = .5 + .5 * Math.sin(t * 2.2 + f.ph);
        });
        for (let i = flying.length - 1; i >= 0; i--) { const f = flying[i]; f.t += dt / .7; if (f.t >= 1) { flying.splice(i, 1); jar.n += f.gold ? 3 : 1; jar.flash = .3; g.sfx("clink"); if (jar.n >= 8) { jar.n = 0; g.add(10); g.sfx("cheer"); fx.txt("Jar full! +10", jar.x, jar.y - 90, "#e8ff9a"); fx.burst(jar.x, jar.y, "#d6ff7a", 30, 240); for (let k = 0; k < 8; k++) freed.push({ x: jar.x + g.rf(-30, 30), y: jar.y, vx: g.rf(-50, 50), vy: g.rf(-120, -60), life: 2.2 }); } } }
        jar.flash = Math.max(0, jar.flash - dt);
        fx.begin(x, dt);
        sky(x, W, H, "#070b3a", "#1d4a63");
        for (let k = 0; k < 40; k++) { x.globalAlpha = .4 + .4 * Math.sin(t + k); circ(x, (k * 163) % W, (k * 71) % 170, 1.4, "#fff"); } x.globalAlpha = 1;
        circ(x, 90, 70, 30, "#fff6d0"); circ(x, 102, 62, 27, "#0b1245");
        ell(x, 140, H + 10, 300, 120, "#0e2a3a"); ell(x, 480, H + 20, 320, 100, "#0a2230");
        flies.forEach(f => {
          const fl = Math.sin(t * 40 + f.ph) * .5, col = f.gold ? "rgba(255,210,70," : "rgba(230,255,140,";
          glowDot(f.x, f.y + 4, 30 + f.glow * 16, .25 + f.glow * .7); if (f.gold) glowDot(f.x, f.y, 44, .5);
          ell(x, f.x - 4, f.y - 5, 8, 4 + fl * 3, "rgba(255,255,255,.6)"); ell(x, f.x + 4, f.y - 5, 8, 4 - fl * 3, "rgba(255,255,255,.6)");
          ell(x, f.x, f.y, 6, 4, "#2a2a2a"); circ(x, f.x - Math.cos(f.a) * 5, f.y + 2, 4.5, col + (.5 + f.glow * .5) + ")");
          if (f.gold) { x.strokeStyle = "#ffd34e"; x.lineWidth = 2; ell(x, f.x, f.y, 20, 20, null); x.stroke(); }
        });
        flying.forEach(f => { const e = f.t; glowDot(f.sx + (jar.x - f.sx) * e, f.sy + (jar.y - f.sy) * e - Math.sin(Math.PI * e) * 50, 26, .9); });
        for (let i = freed.length - 1; i >= 0; i--) { const f = freed[i]; f.life -= dt; if (f.life <= 0) { freed.splice(i, 1); continue; } f.x += f.vx * dt; f.y += f.vy * dt; glowDot(f.x, f.y, 22, Math.min(1, f.life)); }
        // jar
        const fill = Math.min(1, jar.n / 8) + jar.flash;
        glowDot(jar.x, jar.y, 120, .15 + fill * .45);
        x.beginPath(); x.roundRect(jar.x - jar.w / 2, jar.y - jar.h / 2, jar.w, jar.h, 18); x.fillStyle = "rgba(200,240,255,.14)"; x.fill(); x.lineWidth = 4; x.strokeStyle = "rgba(220,245,255,.7)"; x.stroke();
        for (let k = 0; k < jar.n; k++) glowDot(jar.x + Math.sin(t * 1.3 + k * 2) * 26, jar.y + 28 - k * 9 + Math.sin(t * 2 + k) * 6, 20, .9);
        x.fillStyle = "#b0763c"; x.beginPath(); x.roundRect(jar.x - jar.w / 2 - 4, jar.y - jar.h / 2 - 14, jar.w + 8, 18, 5); x.fill();
        x.fillStyle = "rgba(255,255,255,.5)"; x.fillRect(jar.x - jar.w / 2 + 8, jar.y - jar.h / 2 + 12, 7, 60);
        grass.forEach(b => { x.fillStyle = "#06181f"; x.beginPath(); x.moveTo(b.x - 5, H); x.quadraticCurveTo(b.x, H - b.h * .6, b.x + b.s, H - b.h); x.quadraticCurveTo(b.x + 3, H - b.h * .5, b.x + 5, H); x.fill(); });
        fx.end(x, dt);
      });
    }
  });

  // ---- 5. Balloon Party: pop different balloons ----
  B.add({
    id: "s1-balloons", name: "Balloon Party", ages: [5, 9], cat: "Tap", color: "#ff6fb5", icon: "B",
    desc: "Pop party balloons: striped, golden, clock and confetti ones!", controls: "Tap or click balloons. Striped ones need 2 taps, clocks add time.",
    start(g) {
      const cv = g.canvas(640, 440), { c, x, W, H, pos } = cv, fx = fxs(g, cv), TOTAL = g.by(50, 45, 40), COL = ["#ff6fb5", "#ff5a5a", "#ffb02e", "#6be28f", "#b48cff", "#3fa7ff"];
      let left = TOTAL, spawn = .3; const bl = [];
      g.status("Time: " + TOTAL);
      const popB = (b, depth) => {
        const i = bl.indexOf(b); if (i < 0) return; bl.splice(i, 1);
        g.add(b.pts); g.sfx("pop"); fx.burst(b.x, b.y, b.col, 14, 200); fx.txt("+" + b.pts, b.x, b.y - 10, "#fff44f");
        if (b.type === "clock") { left = Math.min(TOTAL + 10, left + 3); fx.txt("+3 sec", b.x, b.y - 40, "#8dffb0"); g.sfx("gotit"); }
        if (b.type === "gold") { g.sfx("star"); fx.burst(b.x, b.y, "#fff", 14, 240); }
        if (b.type === "confetti") { fx.shake = .4; g.sfx("boom"); for (let k = 0; k < 24; k++) fx.burst(b.x, b.y, COL[k % COL.length], 1, 260); bl.slice().forEach(o => { if (Math.hypot(o.x - b.x, o.y - b.y) < 125) popB(o, 1); }); }
      };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        for (let i = bl.length - 1; i >= 0; i--) {
          const b = bl[i];
          if (Math.hypot(b.x - p.x, (b.y - p.y) * .85) < b.r + 10) { b.hp--; if (b.hp > 0) { b.sq = 1; g.sfx("click"); fx.burst(p.x, p.y, "#fff", 5, 90); } else popB(b); return; }
        }
      });
      g.loop((dt, t) => {
        left -= dt; if (left <= 0) { g.over("Party time is over! Hooray!"); return false; }
        g.status("Time: " + Math.ceil(left));
        spawn -= dt; const ramp = 1 + Math.min(.9, t / 60);
        if (spawn <= 0) {
          const r = Math.random(); let type = "red", rad = g.rf(30, 38), pts = 1, hp = 1, col = g.pick(COL), vm = 1;
          if (r > .9) { type = "confetti"; rad = 36; col = "#fff"; } else if (r > .82) { type = "clock"; rad = 32; col = "#6be28f"; pts = 2; } else if (r > .72) { type = "gold"; rad = 24; col = "#ffcf33"; pts = 5; vm = 1.7; } else if (r > .55) { type = "stripe"; rad = 38; col = "#3fa7ff"; pts = 3; hp = 2; }
          bl.push({ x: g.rf(rad, W - rad), y: H + rad + 20, r: rad, vy: g.rf(55, 85) * g.by(.8, 1.05, 1.4) * ramp * vm, col, type, hp, pts, ph: g.rf(0, 6), sq: 0 });
          spawn = g.by(.75, .55, .4) / ramp * g.rf(.7, 1.2);
        }
        for (let i = bl.length - 1; i >= 0; i--) { const b = bl[i]; b.y -= b.vy * dt; b.x += Math.sin(t * 1.5 + b.ph) * 16 * dt; b.sq = Math.max(0, b.sq - dt * 4); if (b.y < -b.r * 2) bl.splice(i, 1); }
        fx.begin(x, dt);
        sky(x, W, H, "#6fcaff", "#e4f7ff");
        [0, 1, 2].forEach(k => { const cxx = ((t * 10 + k * 260) % (W + 200)) - 100; ell(x, cxx, 120 + k * 90, 70, 20, "rgba(255,255,255,.85)"); ell(x, cxx + 28, 106 + k * 90, 42, 20, "rgba(255,255,255,.85)"); });
        ell(x, 140, H + 30, 300, 80, "#6fd46a"); ell(x, 520, H + 40, 320, 90, "#52bf5c");
        x.strokeStyle = "#7a5a3a"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 8); x.quadraticCurveTo(W / 2, 62, W, 8); x.stroke();
        for (let k = 0; k < 14; k++) { const u = (k + .5) / 14, fx0 = u * W, fy0 = 8 + 4 * u * (1 - u) * 54 * 1.0; x.fillStyle = COL[k % COL.length]; x.beginPath(); x.moveTo(fx0 - 14, fy0); x.lineTo(fx0 + 14, fy0); x.lineTo(fx0, fy0 + 30); x.closePath(); x.fill(); }
        bl.forEach(b => {
          x.strokeStyle = "rgba(60,60,60,.55)"; x.lineWidth = 2; x.beginPath(); x.moveTo(b.x, b.y + b.r * 1.15); for (let k = 1; k <= 6; k++) x.lineTo(b.x + Math.sin(k * 1.2 + b.ph + t * 3) * 5, b.y + b.r * 1.15 + k * 8); x.stroke();
          x.save(); x.translate(b.x, b.y); const sq = Math.sin(b.sq * Math.PI * 3) * .12 * b.sq; x.scale(1 + sq, 1 - sq);
          x.beginPath(); x.ellipse(0, 0, b.r, b.r * 1.18, 0, 0, TAU);
          if (b.type === "confetti") { const rg = x.createLinearGradient(-b.r, 0, b.r, 0); ["#f66", "#fd4", "#6e8", "#4cf", "#b8f"].forEach((cc, k) => rg.addColorStop(k / 4, cc)); x.fillStyle = rg; }
          else { const rg = x.createRadialGradient(-b.r * .3, -b.r * .4, 2, 0, 0, b.r * 1.3); rg.addColorStop(0, "#fff"); rg.addColorStop(.25, b.col); rg.addColorStop(1, b.col); x.fillStyle = rg; }
          x.fill();
          if (b.type === "stripe") { x.save(); x.clip(); x.fillStyle = "rgba(255,255,255,.6)"; for (let k = -2; k < 3; k++) x.fillRect(k * b.r * .45 - 6, -b.r * 1.3, 12, b.r * 2.6); x.restore(); }
          if (b.type === "clock") { lab(x, "+3", 0, 2, 20, "#fff"); }
          if (b.type === "gold") { starPath(x, 0, 2, b.r * .45, t); x.fillStyle = "#fff"; x.fill(); }
          if (b.type === "confetti") { [[-8, -8, "#f66"], [10, 4, "#4cf"], [-4, 14, "#fd4"], [8, -14, "#6e8"]].forEach(o => circ(x, o[0], o[1], 4, o[2])); }
          ell(x, -b.r * .38, -b.r * .5, b.r * .16, b.r * .26, "rgba(255,255,255,.55)");
          x.beginPath(); x.moveTo(-6, b.r * 1.15); x.lineTo(6, b.r * 1.15); x.lineTo(0, b.r * 1.3); x.closePath(); x.fillStyle = b.type === "confetti" ? "#b8f" : b.col; x.fill(); x.restore();
        });
        fx.end(x, dt);
      });
    }
  });

  // ---- 6. Duck Pond: toss bread, feed hungry ducks ----
  B.add({
    id: "s1-ducks", name: "Duck Pond", ages: [5, 8], cat: "Tap", color: "#4cc3ff", icon: "D",
    desc: "Toss bread into the pond and make every duck happy.", controls: "Tap the water to drop bread. Hungry ducks swim to eat it!",
    start(g) {
      const cv = g.canvas(640, 420), { c, x, W, H, pos } = cv, fx = fxs(g, cv), MAXD = g.by(3, 4, 5), PAT = g.by(40, 32, 26);
      let lives = 5, spawn = .4, served = 0; const ducks = [], crumbs = [], rings = [];
      const pads = [{ x: 110, y: 90, r: 26 }, { x: 560, y: 330, r: 30 }, { x: 300, y: 385, r: 22 }, { x: 530, y: 70, r: 20 }, { x: 70, y: 300, r: 24 }];
      const COLS = ["#ffd34e", "#fff6c8", "#ffe08a", "#ffc2d9"];
      g.status("Lives: " + lives);
      g.on(c, "pointerdown", e => {
        const p = pos(e); if (crumbs.length >= 5) crumbs.shift();
        crumbs.push({ x: p.x, y: p.y, life: 10, t: 0 }); rings.push({ x: p.x, y: p.y, r: 4, life: .7 }); g.sfx("splash");
      });
      const edge = d => d.x < W / 2 ? -50 : W + 50;
      g.loop((dt, t) => {
        spawn -= dt;
        const active = ducks.filter(d => d.state !== "leave").length;
        if (spawn <= 0 && active < MAXD) {
          const need = g.pick(g.by([1, 1, 2], [1, 2, 2, 3], [1, 2, 3, 3])), left = Math.random() < .5;
          ducks.push({ x: left ? -40 : W + 40, y: g.rf(90, H - 90), vx: 0, vy: 0, need, eaten: 0, pat: PAT * (1 - Math.min(.4, served / 60)) * (1 + need * .1), pat0: 1, col: g.pick(COLS), size: 15 + need * 5, state: "hungry", tx: g.rf(120, W - 120), ty: g.rf(90, H - 90), wt: g.rf(1, 3), face: left ? 1 : -1, ph: g.rf(0, 6), gulp: 0 });
          ducks[ducks.length - 1].pat0 = ducks[ducks.length - 1].pat; spawn = g.by(3, 2.4, 1.8) * g.rf(.8, 1.2);
        }
        for (let i = crumbs.length - 1; i >= 0; i--) { const k = crumbs[i]; k.life -= dt; k.t += dt; if (k.life <= 0) crumbs.splice(i, 1); }
        for (let i = ducks.length - 1; i >= 0; i--) {
          const d = ducks[i]; let sp = 38, tx = d.tx, ty = d.ty;
          if (d.state === "leave") { tx = d.out; ty = d.y; sp = 80; }
          else {
            let best = null, bd = 1e9; crumbs.forEach(k => { if (k.t > .25) { const dd = Math.hypot(k.x - d.x, k.y - d.y); if (dd < bd) { bd = dd; best = k; } } });
            if (best) { tx = best.x; ty = best.y; sp = 105; } else { d.wt -= dt; if (d.wt <= 0) { d.tx = g.rf(70, W - 70); d.ty = g.rf(80, H - 80); d.wt = g.rf(2, 4); } }
            if (d.x > 50 && d.x < W - 50) d.pat -= dt;
            if (best && bd < d.size + 8) { crumbs.splice(crumbs.indexOf(best), 1); d.eaten++; d.gulp = .3; g.sfx("pop"); fx.burst(d.x, d.y, "#e8c48a", 6, 70);
              if (d.eaten >= d.need) { d.state = "leave"; d.out = edge(d); const pts = d.need * (d.pat > d.pat0 * .5 ? 2 : 1); g.add(pts); served++; g.sfx("cheer"); fx.txt("+" + pts, d.x, d.y - 40, "#fff44f"); for (let k = 0; k < 6; k++) fx.burst(d.x + g.rf(-15, 15), d.y - 20, "#ff7aa8", 2, 80); } }
            if (d.pat <= 0 && d.state === "hungry") { d.state = "leave"; d.out = edge(d); d.sad = true; lives--; g.status("Lives: " + lives); g.sfx("wrong"); fx.txt("Oh no!", d.x, d.y - 40, "#ff9a9a"); if (lives <= 0) { g.over("The ducks will be back tomorrow!"); return false; } }
          }
          const dx = tx - d.x, dy = ty - d.y, dist = Math.hypot(dx, dy) || 1, wantv = dist > 6 ? sp : 0;
          d.vx += (dx / dist * wantv - d.vx) * Math.min(1, dt * 4); d.vy += (dy / dist * wantv - d.vy) * Math.min(1, dt * 4);
          d.x += d.vx * dt; d.y += d.vy * dt; d.gulp = Math.max(0, d.gulp - dt); if (Math.abs(d.vx) > 6) d.face = d.vx > 0 ? 1 : -1;
          if (Math.random() < dt * 2 && wantv) rings.push({ x: d.x - d.face * d.size, y: d.y + d.size * .5, r: 3, life: .8 });
          if (d.state === "leave" && (d.x < -45 || d.x > W + 45)) ducks.splice(i, 1);
        }
        for (let i = rings.length - 1; i >= 0; i--) { const r = rings[i]; r.life -= dt; r.r += dt * 40; if (r.life <= 0) rings.splice(i, 1); }
        fx.begin(x, dt);
        x.fillStyle = "#79cf68"; x.fillRect(0, 0, W, H);
        const wg = x.createLinearGradient(0, 0, 0, H); wg.addColorStop(0, "#8be6ff"); wg.addColorStop(1, "#2ea8e6"); x.beginPath(); x.roundRect(14, 14, W - 28, H - 28, 90); x.fillStyle = wg; x.fill(); x.lineWidth = 8; x.strokeStyle = "#b9a37a"; x.stroke();
        x.strokeStyle = "rgba(255,255,255,.2)"; x.lineWidth = 3; for (let k = 0; k < 6; k++) { x.beginPath(); for (let q = 40; q < W - 40; q += 10) x.lineTo(q, 60 + k * 60 + Math.sin(q * .03 + t * 1.5 + k) * 5); x.stroke(); }
        rings.forEach(r => { x.globalAlpha = Math.max(0, r.life); x.strokeStyle = "#fff"; x.lineWidth = 2; x.beginPath(); x.arc(r.x, r.y, r.r, 0, TAU); x.stroke(); }); x.globalAlpha = 1;
        pads.forEach((p, k) => { ell(x, p.x, p.y, p.r * 1.2, p.r * .8, "#3fae55"); x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(p.x + p.r * 1.2, p.y - 4); x.lineTo(p.x + p.r * 1.2, p.y + 4); x.closePath(); x.fillStyle = "#2c8a8c"; x.fill(); if (k % 2) circ(x, p.x - 5, p.y - 4, 5, "#ff9ac8"); });
        crumbs.forEach(k => { const a = Math.min(1, k.life); x.globalAlpha = a; circ(x, k.x, k.y + Math.sin(t * 3 + k.x) * 1.5, 7, "#e8c48a"); circ(x, k.x - 2, k.y - 2, 3, "#fbe3b4"); }); x.globalAlpha = 1;
        ducks.slice().sort((a, b) => a.y - b.y).forEach(d => {
          const s = d.size, bob = Math.sin(t * 3 + d.ph) * 1.5 + (d.gulp > 0 ? Math.sin(d.gulp * 30) * 3 : 0);
          x.save(); x.translate(d.x, d.y + bob); x.scale(d.face, 1);
          ell(x, 0, s * .55, s * 1.3, s * .4, "rgba(255,255,255,.35)");
          x.fillStyle = d.col; x.beginPath(); x.moveTo(-s * 1.0, -s * .2); x.lineTo(-s * 1.5, -s * .55); x.lineTo(-s * .9, s * .2); x.closePath(); x.fill();
          ell(x, 0, 0, s * 1.1, s * .8, d.col); ell(x, -s * .1, s * .05, s * .6, s * .35, "rgba(0,0,0,.12)");
          circ(x, s * .85, -s * .75, s * .55, d.col); ell(x, s * 1.45, -s * .65, s * .38, s * .18, "#ff9a2a"); circ(x, s * 1.02, -s * .85, s * .1, "#222");
          if (d.sad) { x.strokeStyle = "#4a8bd0"; x.lineWidth = 2; x.beginPath(); x.moveTo(s * 1.02, -s * .7); x.lineTo(s * 1.0, -s * .3); x.stroke(); }
          x.restore();
          if (d.state === "hungry") {
            const f = g.clamp(d.pat / d.pat0, 0, 1), bw = 34; x.fillStyle = "rgba(0,0,0,.3)"; x.fillRect(d.x - bw / 2, d.y - s * 1.7 - 14, bw, 6); x.fillStyle = f > .5 ? "#6be28f" : f > .25 ? "#ffd34e" : "#ff6a6a"; x.fillRect(d.x - bw / 2, d.y - s * 1.7 - 14, bw * f, 6);
            for (let k = 0; k < d.need; k++) { const dxx = d.x + (k - (d.need - 1) / 2) * 15; circ(x, dxx, d.y - s * 1.7 - 2, 6, k < d.eaten ? "#e8c48a" : "rgba(255,255,255,.35)"); x.lineWidth = 2; x.strokeStyle = "#fff"; x.stroke(); }
          }
        });
        fx.end(x, dt);
      });
    }
  });

  // ---- 7. Scoop Tower: stack ice-cream scoops ----
  B.add({
    id: "s1-scoops", name: "Scoop Tower", ages: [5, 9], cat: "Tap", color: "#ff8fb8", icon: "I",
    desc: "Drop yummy scoops and build the tallest ice-cream tower.", controls: "Tap, click or press Space to drop the swinging scoop on the pile",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H } = cv, fx = fxs(g, cv);
      const sr = g.by(48, 42, 36), tol = sr * g.by(1.25, 1.1, .95), step = sr * .95, coneY = H - 130, COLS = ["#ff8fb8", "#7ee8c0", "#a0674a", "#ffe9a8", "#8fb0ff", "#ffb04a"];
      let lives = g.by(5, 4, 3), tower = [], fall = null, cam = 0, wait = .4, nextCol = g.pick(COLS), swing = 0, curX = W / 2, dead = false, endT = 1, perfects = 0;
      const landY = n => coneY - sr * .75 - n * step;
      g.status("Lives: " + lives);
      const drop = () => { if (fall || wait > 0 || dead) return; fall = { x: curX, y: 108 - cam, vy: 0, col: nextCol, off: false, vx: 0 }; g.sfx("swish"); };
      g.on(c, "pointerdown", drop); g.on(window, "keydown", e => { if (e.key === " " || e.key === "ArrowDown") drop(); });
      const scoop = (cx, cy, col, sq) => {
        x.save(); x.translate(cx, cy); x.scale(1 + (sq || 0) * .15, 1 - (sq || 0) * .15);
        for (let k = 0; k < 6; k++) circ(x, (k - 2.5) * sr * .36, sr * .6, sr * .2, col);
        ell(x, 0, 0, sr, sr * .88, col); ell(x, 0, sr * .5, sr * .98, sr * .22, "rgba(0,0,0,.1)"); circ(x, -sr * .38, -sr * .38, sr * .2, "rgba(255,255,255,.45)"); x.restore();
      };
      g.loop((dt, t) => {
        swing += dt * g.by(1.7, 2.2, 2.8) * (1 + Math.min(.8, tower.length * .03)); curX = W / 2 + Math.sin(swing) * (W / 2 - sr - 16);
        wait = Math.max(0, wait - dt);
        const n = tower.length; cam += (Math.max(0, 330 - landY(n)) - cam) * Math.min(1, dt * 3);
        if (fall) {
          fall.vy += 1500 * dt; fall.y += fall.vy * dt; fall.x += fall.vx * dt;
          if (!fall.off) {
            const ly = landY(n);
            if (fall.y >= ly) {
              const tx = n ? tower[n - 1].x : W / 2, dx = fall.x - tx;
              if (Math.abs(dx) <= tol) {
                const perfect = Math.abs(dx) < 8; tower.push({ x: perfect ? tx : fall.x, col: fall.col, sq: 1 }); g.add(perfect ? 2 : 1); g.sfx(perfect ? "star" : "thump"); fx.shake = .12;
                if (perfect) { perfects++; fx.txt("Perfect!", tx, ly + cam - 50, "#fff44f"); fx.burst(tx, ly + cam, "#fff", 14, 200); } else { perfects = 0; fx.burst(fall.x, ly + cam, fall.col, 8, 100); }
                fall = null; wait = .25; nextCol = g.pick(COLS);
              } else { fall.off = true; fall.vx = dx > 0 ? 140 : -140; fall.vy = -150; lives--; g.status("Lives: " + lives); g.sfx("drop"); fx.shake = .3; fx.txt("Oops!", fall.x, fall.y + cam - 40, "#ff8a8a"); if (lives <= 0) dead = true; }
            }
          } else if (fall.y + cam > H + 90) { fall = null; wait = .3; nextCol = g.pick(COLS); }
        }
        if (dead) { endT -= dt; if (endT <= 0) { g.over("Wow, what a tower! Yum!"); return false; } }
        fx.begin(x, dt);
        sky(x, W, H, "#ffe1ef", "#c8f1ff");
        for (let k = 0; k < 16; k++) circ(x, (k * 97) % W, ((k * 61 + t * 14) % (H + 40)) - 20, 4 + k % 3, "rgba(255,255,255,.7)");
        x.fillStyle = "#ffa8c8"; x.fillRect(0, coneY + 112 + cam, W, 600);
        ell(x, W / 2, coneY + 114 + cam, 92, 14, "#fff");
        x.beginPath(); x.moveTo(W / 2 - sr * .95, coneY + cam); x.lineTo(W / 2 + sr * .95, coneY + cam); x.lineTo(W / 2, coneY + 112 + cam); x.closePath(); x.fillStyle = "#e0a44a"; x.fill();
        x.strokeStyle = "rgba(120,70,20,.45)"; x.lineWidth = 3; for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(W / 2 + k * sr * .4, coneY + cam); x.lineTo(W / 2 + k * sr * .08, coneY + 112 + cam); x.stroke(); } for (let k = 1; k < 4; k++) { x.beginPath(); x.moveTo(W / 2 - sr * (1 - k * .22), coneY + k * 26 + cam); x.lineTo(W / 2 + sr * (1 - k * .22), coneY + k * 26 + cam); x.stroke(); }
        tower.forEach((s, i) => { s.sq = Math.max(0, s.sq - dt * 5); scoop(s.x + Math.sin(t * 2.2 + i * .35) * Math.min(7, i * .5), landY(i) + cam, s.col, s.sq); });
        if (fall) scoop(fall.x, fall.y + cam, fall.col, 0);
        x.strokeStyle = "#8a6aa8"; x.lineWidth = 5; x.beginPath(); x.moveTo(0, 30); x.lineTo(W, 30); x.stroke();
        x.fillStyle = "#8a6aa8"; x.beginPath(); x.roundRect(curX - 22, 20, 44, 22, 8); x.fill();
        if (!fall && wait <= 0 && !dead) { x.strokeStyle = "#8a6aa8"; x.lineWidth = 3; x.beginPath(); x.moveTo(curX, 42); x.lineTo(curX, 108 - sr * .55); x.stroke(); scoop(curX, 108, nextCol, 0); }
        fx.end(x, dt);
      });
    }
  });

  // ---- 8. Cloud Hopper: hop up the sky, run from the storm ----
  B.add({
    id: "s1-clouds", name: "Cloud Hopper", ages: [5, 9], cat: "Tap", color: "#8fd0ff", icon: "H",
    desc: "Hop from cloud to cloud, grab stars, and stay ahead of the storm!", controls: "Tap a nearby cloud to hop there (or press Up / Space)",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H, pos } = cv, fx = fxs(g, cv), REACH = g.by(260, 235, 215), STORM = g.by(14, 22, 32);
      const clouds = [{ x: W / 2, y: 540, w: 150, vx: 0, star: false, sq: 0, ph: 0 }]; let lastX = W / 2, lastY = 540, count = 0, stars = 0, bestH = 0, stormY = 820, flash = 0, nextFlash = 3;
      const hero = { cloud: clouds[0], x: W / 2, y: 518, hop: null, sq: 0 };
      const gen = () => {
        lastY -= g.rf(85, 115) * Math.min(1.15, 1 + count / 200); lastX = g.clamp(lastX + g.rf(-150, 150), 70, W - 70); count++;
        const mv = count > 6 && Math.random() < Math.min(.75, .2 + count * .01);
        clouds.push({ x: lastX, y: lastY, w: g.rf(90, 120), vx: mv ? g.rf(25, 55) * (Math.random() < .5 ? -1 : 1) * g.by(.7, 1, 1.3) : 0, star: count > 2 && Math.random() < .2, sq: 0, ph: g.rf(0, 6) });
      };
      for (let i = 0; i < 10; i++) gen();
      let cam = hero.y - 400; const sd = []; for (let i = 0; i < 40; i++) sd.push({ x: g.rf(0, W), y: g.rf(0, H), r: g.rf(.8, 2) });
      const dist = c2 => Math.hypot(c2.x - hero.cloud.x, c2.y - hero.cloud.y);
      const hopTo = c2 => { if (hero.hop || c2 === hero.cloud) return; if (dist(c2) > REACH) { c2.sq = 1; g.sfx("click"); return; } hero.hop = { fx: hero.x, fy: hero.y, cloud: c2, t: 0 }; g.sfx("swish"); };
      g.on(c, "pointerdown", e => {
        const p = pos(e), wy = p.y + cam; let best = null, bd = 1e9;
        clouds.forEach(k => { const dx = Math.abs(p.x - k.x), dy = Math.abs(wy - k.y); if (dx < k.w / 2 + 20 && dy < 38) { const d = dx + dy; if (d < bd) { bd = d; best = k; } } });
        if (best) hopTo(best);
      });
      g.on(window, "keydown", e => {
        if (e.key !== "ArrowUp" && e.key !== " ") return; if (hero.hop) return;
        let best = null; clouds.forEach(k => { if (k !== hero.cloud && k.y < hero.cloud.y - 10 && dist(k) <= REACH && (!best || k.y < best.y)) best = k; }); if (best) hopTo(best);
      });
      g.loop((dt, t) => {
        clouds.forEach(k => { k.x += k.vx * dt; if (k.x < k.w / 2 || k.x > W - k.w / 2) { k.vx = -k.vx; k.x = g.clamp(k.x, k.w / 2, W - k.w / 2); } k.sq = Math.max(0, k.sq - dt * 4); });
        if (hero.hop) {
          const h = hero.hop; h.t += dt / .5; const k = Math.min(1, h.t), ex = h.cloud.x, ey = h.cloud.y - 22;
          hero.x = h.fx + (ex - h.fx) * k; hero.y = h.fy + (ey - h.fy) * k - Math.sin(Math.PI * k) * 70;
          if (h.t >= 1) {
            hero.cloud = h.cloud; hero.hop = null; hero.sq = 1; g.sfx("pop"); h.cloud.sq = .6;
            if (h.cloud.star) { h.cloud.star = false; stars++; g.sfx("star"); fx.burst(hero.x, hero.y - 20, "#ffe14a", 14, 180); fx.txt("+5", hero.x, hero.y - 50, "#fff44f"); }
            bestH = Math.max(bestH, 540 - h.cloud.y); g.score(Math.floor(bestH / 20) + stars * 5);
          }
        } else { hero.x = hero.cloud.x; hero.y = hero.cloud.y - 22; }
        hero.sq = Math.max(0, hero.sq - dt * 5);
        const tc = hero.y - 400; if (tc < cam) cam += (tc - cam) * Math.min(1, dt * 4);
        while (lastY > cam - 250) gen();
        for (let i = clouds.length - 1; i >= 0; i--) if (clouds[i] !== hero.cloud && clouds[i].y - cam > H + 150) clouds.splice(i, 1);
        let rate = STORM * (1 + Math.min(1.2, bestH / 2500)); if (stormY - hero.y > 520) rate *= 2; stormY -= rate * dt;
        if (stormY - 20 < hero.y) { g.over("The storm caught you! Great hopping!"); return false; }
        nextFlash -= dt; if (nextFlash <= 0) { flash = .25; nextFlash = g.rf(2, 5); g.sfx("rumble"); } flash = Math.max(0, flash - dt);
        fx.begin(x, dt);
        const k = g.clamp(bestH / 6000, 0, 1); sky(x, W, H, `hsl(${225 + k * 15},70%,${58 - k * 40}%)`, `hsl(${200 + k * 20},80%,${82 - k * 38}%)`);
        if (k > .25) { x.globalAlpha = Math.min(1, (k - .25) * 2); sd.forEach(s => circ(x, s.x, s.y, s.r, "#fff")); x.globalAlpha = 1; }
        const cl = (cx, cy, w, col) => { circ(x, cx - w * .28, cy, w * .2, col); circ(x, cx, cy - w * .1, w * .26, col); circ(x, cx + w * .28, cy, w * .2, col); ell(x, cx, cy + w * .05, w * .5, w * .15, col); };
        clouds.forEach(k2 => {
          const sy = k2.y - cam; if (sy < -60 || sy > H + 60) return; const sqz = Math.sin(k2.sq * Math.PI * 2) * 4 * k2.sq;
          cl(k2.x, sy + 5 + sqz, k2.w, "#b9d8f5"); cl(k2.x, sy + sqz, k2.w, "#fff");
          if (k2 !== hero.cloud && !hero.hop && dist(k2) <= REACH) { x.globalAlpha = .45 + .35 * Math.sin(t * 5); x.strokeStyle = "#fff"; x.lineWidth = 3; ell(x, k2.x, sy + 4, k2.w * .56, 17, null); x.stroke(); x.globalAlpha = 1; }
          if (k2.star) { const by2 = sy - 36 + Math.sin(t * 3 + k2.ph) * 4; circ(x, k2.x, by2, 24, "rgba(255,225,74,.25)"); starPath(x, k2.x, by2, 15, t); x.fillStyle = "#ffd93b"; x.fill(); x.lineWidth = 2; x.strokeStyle = "#fff"; x.stroke(); }
        });
        // hero
        const hx = hero.x, hy = hero.y - cam, st = hero.hop ? 1.15 : 1 - Math.sin(hero.sq * Math.PI) * .2;
        x.save(); x.translate(hx, hy + 18); x.scale(2 - st, st); x.translate(0, -18);
        ell(x, -8, -20, 6, 15, "#6a8cff"); ell(x, 8, -20, 6, 15, "#6a8cff"); ell(x, -8, -20, 3, 10, "#ffb3cf"); ell(x, 8, -20, 3, 10, "#ffb3cf");
        circ(x, 0, 0, 18, "#6a8cff"); ell(x, 0, 5, 11, 10, "#fff"); circ(x, -7, -3, 4, "#fff"); circ(x, 7, -3, 4, "#fff"); circ(x, -6.5, -3, 2.2, "#222"); circ(x, 7.5, -3, 2.2, "#222"); circ(x, -12, 3, 3, "#ff9ac8"); circ(x, 12, 3, 3, "#ff9ac8"); circ(x, 0, 18, 6, "#fff");
        x.restore();
        // storm
        const sy = stormY - cam;
        if (sy < H + 80) {
          const sg = x.createLinearGradient(0, sy - 30, 0, sy + 200); sg.addColorStop(0, "#40456f"); sg.addColorStop(1, "#1f2347"); x.fillStyle = sg; x.fillRect(0, sy, W, H + 300);
          for (let i = -1; i < 10; i++) circ(x, i * 46 + (Math.sin(t * .8 + i) * 8), sy + Math.sin(t + i * 1.7) * 6, 40, i % 2 ? "#4b5080" : "#3d4270");
          x.strokeStyle = "rgba(190,215,255,.5)"; x.lineWidth = 2; for (let i = 0; i < 30; i++) { const rx = (i * 41 + t * 30) % W, ry = sy + ((i * 83 + t * 400) % 240); x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 6, ry + 18); x.stroke(); }
        }
        if (flash > 0) { x.fillStyle = "rgba(255,255,255," + flash * 1.2 + ")"; x.fillRect(0, 0, W, H); }
        fx.end(x, dt);
      });
    }
  });

  // ---- 9. Colour Splash: tap the drops that match the bucket ----
  B.add({
    id: "s1-splash", name: "Colour Splash", ages: [5, 8], cat: "Tap", color: "#ffb02e", icon: "P",
    desc: "Paint drops are falling! Splat the colour of your bucket.", controls: "Tap the drops that are the same colour as the bucket",
    start(g) {
      const cv = g.canvas(640, 440), { c, x, W, H, pos } = cv, fx = fxs(g, cv);
      const ALL = ["#ff4d5e", "#ffb02e", "#ffe14a", "#4cd964", "#3fa7ff", "#b36bff"], COLS = g.by([0, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5]).map(i => ALL[i]);
      let lives = g.by(5, 4, 3), target = 0, streak = 0, good = 0, spawn = .4, pulse = 0; const drops = [], splats = [];
      g.status("Lives: " + lives);
      const lobes = () => { const a = []; for (let k = 0; k < 7; k++) { const an = g.rf(0, TAU), d = g.rf(.6, 1.2); a.push({ x: Math.cos(an) * d, y: Math.sin(an) * d, r: g.rf(.2, .45) }); } return a; };
      const addSplat = (px, py, col, r) => { splats.push({ x: px, y: py, col, r, l: lobes() }); if (splats.length > 70) splats.shift(); };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        for (let i = drops.length - 1; i >= 0; i--) {
          const d = drops[i];
          if (Math.hypot(d.x - p.x, d.y - p.y) < d.r + 14) {
            drops.splice(i, 1);
            if (d.col === target) {
              streak++; good++; let pts = 1; if (streak % 5 === 0) { pts += 3; fx.txt("Rainbow streak! +3", d.x, d.y - 30, "#ff7ad9"); }
              g.add(pts); g.sfx("pop"); addSplat(d.x, d.y, COLS[d.col], g.rf(26, 40)); fx.burst(d.x, d.y, COLS[d.col], 14, 190); fx.txt("+" + pts, d.x, d.y - 10, "#333");
              if (good % 6 === 0) { let nt = target; while (nt === target && COLS.length > 1) nt = g.ri(0, COLS.length - 1); target = nt; pulse = 1; g.sfx("gotit"); }
            } else { lives--; streak = 0; g.sfx("wrong"); addSplat(d.x, d.y, "#b7b7b7", 24); fx.burst(d.x, d.y, "#999", 10, 120); fx.txt("Oops!", d.x, d.y - 10, "#e04a4a"); fx.shake = .25; g.status("Lives: " + lives); if (lives <= 0) g.over("What a colourful painting!"); }
            return;
          }
        }
      });
      g.loop((dt, t) => {
        const ramp = 1 + Math.min(1.1, t / 60); spawn -= dt; pulse = Math.max(0, pulse - dt * 2);
        if (spawn <= 0) { drops.push({ x: g.rf(40, W - 40), y: -40, vy: g.rf(90, 130) * g.by(.75, 1, 1.3) * ramp, r: 28, col: Math.random() < .4 ? target : g.ri(0, COLS.length - 1), ph: g.rf(0, 6) }); spawn = g.by(.9, .7, .5) / ramp * g.rf(.7, 1.2); }
        for (let i = drops.length - 1; i >= 0; i--) { const d = drops[i]; d.y += d.vy * dt; if (d.y > H - 20) { drops.splice(i, 1); if (d.col === target) streak = 0; fx.burst(d.x, H - 20, COLS[d.col], 6, 100); addSplat(d.x, H - 14, COLS[d.col], 18); } }
        fx.begin(x, dt);
        x.fillStyle = "#fffaf0"; x.fillRect(0, 0, W, H); for (let k = 0; k < 40; k++) circ(x, (k * 89) % W, (k * 53) % H, 2, "rgba(0,0,0,.05)");
        x.globalAlpha = .6; splats.forEach(s => { circ(x, s.x, s.y, s.r, s.col); s.l.forEach(l => circ(x, s.x + l.x * s.r, s.y + l.y * s.r, l.r * s.r, s.col)); }); x.globalAlpha = 1;
        drops.forEach(d => {
          const r = d.r; x.save(); x.translate(d.x, d.y); x.scale(1 + Math.sin(t * 8 + d.ph) * .05, 1 - Math.sin(t * 8 + d.ph) * .05);
          x.beginPath(); x.moveTo(0, -r * 1.7); x.bezierCurveTo(r * .3, -r * .9, r, -r * .5, r, 0); x.arc(0, 0, r, 0, Math.PI, false); x.bezierCurveTo(-r, -r * .5, -r * .3, -r * .9, 0, -r * 1.7); x.closePath();
          x.fillStyle = COLS[d.col]; x.fill(); x.lineWidth = 3; x.strokeStyle = "rgba(0,0,0,.25)"; x.stroke(); ell(x, -r * .35, -r * .1, r * .2, r * .35, "rgba(255,255,255,.55)"); x.restore();
        });
        const bs = 1 + pulse * .15; x.save(); x.translate(W / 2, H - 44); x.scale(bs, bs);
        ell(x, 0, 40, 70, 10, "rgba(0,0,0,.15)"); x.strokeStyle = "#7a8794"; x.lineWidth = 6; x.beginPath(); x.arc(0, -10, 52, Math.PI, TAU); x.stroke();
        x.beginPath(); x.moveTo(-60, -22); x.lineTo(60, -22); x.lineTo(46, 38); x.lineTo(-46, 38); x.closePath(); x.fillStyle = "#b0bcc8"; x.fill(); x.fillStyle = "rgba(255,255,255,.3)"; x.fillRect(-46, -10, 12, 44);
        ell(x, 0, -22, 60, 14, "#8a97a4"); ell(x, 0, -22, 52, 10, COLS[target]); ell(x, -14, -25, 14, 3, "rgba(255,255,255,.5)"); x.restore();
        fx.end(x, dt);
      });
    }
  });

  // ---- 10. Hedgehog Leaves: tap to run, catch leaves, chain colours ----
  B.add({
    id: "s1-hedgehog", name: "Hedgehog Leaves", ages: [5, 9], cat: "Tap", color: "#ff9a2a", icon: "L",
    desc: "Help the hedgehog collect autumn leaves. Same colours make a chain!", controls: "Tap or drag where you want the hedgehog to run (or arrow keys)",
    start(g) {
      const cv = g.canvas(640, 420), { c, x, W, H, pos } = cv, fx = fxs(g, cv), TOTAL = 60, GY = 335, LC = ["#e8453c", "#ff9a2a", "#ffd23f"], SP = g.by(420, 360, 320);
      let hx = W / 2, tx = hx, face = 1, spawn = .3, chain = 0, last = -1, wind = 0, windT = 6, bump = 0, walk = 0; const leaves = [], ground = [], back = [];
      g.status("Time: " + TOTAL);
      const leaf = (cx, cy, r, rot, col) => { x.save(); x.translate(cx, cy); x.rotate(rot); leafPath(x, r); x.fillStyle = col; x.fill(); x.strokeStyle = "rgba(0,0,0,.25)"; x.lineWidth = 1.5; x.beginPath(); x.moveTo(0, -r); x.lineTo(0, r + 3); x.stroke(); x.restore(); };
      const acorn = (cx, cy, r) => { ell(x, cx, cy + 3, r * .6, r * .75, "#c98a4b"); ell(x, cx, cy - r * .35, r * .72, r * .4, "#6b4226"); x.fillStyle = "#6b4226"; x.fillRect(cx - 1.5, cy - r * .9, 3, 5); };
      const mv = e => { tx = g.clamp(pos(e).x, 50, W - 50); };
      g.on(c, "pointerdown", mv); g.on(c, "pointermove", e => { if (e.buttons) mv(e); });
      g.loop((dt, t) => {
        const left = TOTAL - t; if (left <= 0) { g.over("What a big pile of leaves!"); return false; }
        g.status("Time: " + Math.ceil(left) + (chain >= 1 ? "  Chain x" + (chain + 1) : ""));
        if (g.keys.ArrowLeft) tx = hx - 100; if (g.keys.ArrowRight) tx = hx + 100; tx = g.clamp(tx, 50, W - 50);
        const mvd = g.clamp(tx - hx, -SP * dt, SP * dt); hx += mvd; if (Math.abs(tx - hx) > 3) face = tx > hx ? 1 : -1; walk += Math.abs(mvd) * .08; bump = Math.max(0, bump - dt * 4);
        windT -= dt; if (windT <= 0) { wind = g.rf(80, 140) * (Math.random() < .5 ? -1 : 1); windT = g.rf(7, 12); } wind *= (1 - dt * .5);
        const ramp = 1 + Math.min(.8, t / 70); spawn -= dt;
        if (spawn <= 0) { leaves.push({ x: g.rf(20, W - 20), y: -20, vy: g.rf(55, 85) * g.by(.75, 1, 1.25) * ramp, ph: g.rf(0, 6), col: g.ri(0, 2), acorn: Math.random() < .08 }); spawn = g.by(.8, .55, .4) / ramp * g.rf(.7, 1.2); }
        for (let i = leaves.length - 1; i >= 0; i--) {
          const l = leaves[i]; l.y += l.vy * dt; l.x += (Math.sin(t * 1.6 + l.ph) * 40 + wind) * dt; l.x = g.clamp(l.x, 5, W - 5);
          if (Math.abs(l.x - hx) < 54 && l.y > GY - 50 && l.y < GY + 10) {
            leaves.splice(i, 1); bump = 1;
            if (l.acorn) { g.add(3); g.sfx("star"); fx.txt("Acorn! +3", l.x, GY - 70, "#fff44f"); fx.burst(l.x, GY - 40, "#c98a4b", 10); back.push(-1); }
            else { if (l.col === last) chain++; else chain = 0; last = l.col; const pts = 1 + Math.min(4, chain); g.add(pts); g.sfx("note", 330 + chain * 60); fx.burst(l.x, GY - 40, LC[l.col], 8); fx.txt(chain >= 1 ? "Chain x" + (chain + 1) + "! +" + pts : "+1", l.x, GY - 70, "#fff"); back.push(l.col); }
            if (back.length > 14) back.shift(); continue;
          }
          if (l.y > GY + 16) { leaves.splice(i, 1); ground.push({ x: l.x, y: GY + g.rf(18, 55), rot: g.rf(0, 6), col: l.col, acorn: l.acorn }); if (ground.length > 50) ground.shift(); }
        }
        fx.begin(x, dt);
        sky(x, W, H, "#ffe3a8", "#ffb870");
        [[40, 150], [600, 130]].forEach((tr, k) => { x.fillStyle = "#6b4226"; x.fillRect(tr[0] - 14, tr[1], 28, GY - tr[1] + 20); [[0, 0, 70], [-45, 30, 50], [45, 30, 50], [0, -45, 45]].forEach(o => circ(x, tr[0] + o[0], tr[1] + o[1], o[2], ["#e8453c", "#ff9a2a", "#ffd23f"][(k + (o[2] % 3)) % 3])); });
        const gg = x.createLinearGradient(0, GY, 0, H); gg.addColorStop(0, "#8aa84a"); gg.addColorStop(.25, "#9c7a4b"); gg.addColorStop(1, "#6b4f2f"); x.fillStyle = gg; x.fillRect(0, GY + 10, W, H); x.fillStyle = "#7f9c40"; x.fillRect(0, GY + 6, W, 10);
        ground.forEach(l => { if (l.acorn) acorn(l.x, l.y, 9); else leaf(l.x, l.y, 10, l.rot, LC[l.col]); });
        if (Math.abs(wind) > 40) { x.strokeStyle = "rgba(255,255,255,.5)"; x.lineWidth = 3; for (let k = 0; k < 4; k++) { const yy = 70 + k * 60, off = ((t * wind * 1.5 + k * 200) % (W + 200) + W + 200) % (W + 200) - 100; x.beginPath(); x.moveTo(off, yy); x.quadraticCurveTo(off + 25, yy - 10, off + 50, yy); x.stroke(); } }
        leaves.forEach(l => { const rot = Math.sin(t * 1.6 + l.ph) * .9; if (l.acorn) acorn(l.x, l.y, 13); else leaf(l.x, l.y, 15, rot, LC[l.col]); });
        // hedgehog
        x.save(); x.translate(hx, GY); x.scale(1 + bump * .1, 1 - bump * .1);
        ell(x, 0, 6, 50, 8, "rgba(0,0,0,.2)");
        [-1, 1].forEach(s => ell(x, s * 20 + Math.sin(walk + s) * 5, 0, 10, 6, "#d9a96c"));
        ell(x, 0, -24, 48, 34, "#6f4e30");
        x.strokeStyle = "#4a3320"; x.lineWidth = 3; for (let k = 0; k < 15; k++) { const a = Math.PI + k / 14 * Math.PI; x.beginPath(); x.moveTo(Math.cos(a) * 44, -22 + Math.sin(a) * 30); x.lineTo(Math.cos(a) * 56, -22 + Math.sin(a) * 40); x.stroke(); }
        back.forEach((b, k) => { const a = Math.PI + (k + .5) / back.length * Math.PI, px2 = Math.cos(a) * 36, py2 = -22 + Math.sin(a) * 26; if (b < 0) { x.save(); x.translate(px2, py2); acorn(0, 0, 8); x.restore(); } else { x.save(); x.translate(px2, py2); x.rotate(a + Math.PI / 2); leafPath(x, 9); x.fillStyle = LC[b]; x.fill(); x.restore(); } });
        ell(x, face * 40, -12, 20, 14, "#f0cf9c"); circ(x, face * 56, -12, 4.5, "#222"); circ(x, face * 36, -24, 4, "#222"); circ(x, face * 37, -25, 1.3, "#fff"); circ(x, face * 28, -12, 4, "rgba(255,130,150,.6)");
        x.restore();
        fx.end(x, dt);
      });
    }
  });

  // ---- 11. Ladybug Rescue: save ladybugs from the raindrops ----
  B.add({
    id: "s1-ladybugs", name: "Ladybug Rescue", ages: [5, 8], cat: "Tap", color: "#ff5a5a", icon: "R",
    desc: "Raindrops are coming! Send the ladybugs to their mushroom house.", controls: "Tap a ladybug to fly her home. Watch for the blue circles!",
    start(g) {
      const cv = g.canvas(640, 440), { c, x, W, H, pos } = cv, fx = fxs(g, cv), HOUSE = { x: 565, y: 345, sq: 0 }, NB = g.by(3, 4, 5);
      let lives = g.by(5, 4, 3), dropT = 2.2, arrive = 0, rescued = 0; const bugs = [], warns = [], puddles = [], flowers = [];
      for (let i = 0; i < 14; i++) flowers.push({ x: (i * 79 + 20) % W, y: 60 + (i * 47) % 350, col: ["#ff8fb8", "#fff", "#ffe14a", "#b48cff"][i % 4] });
      g.status("Lives: " + lives);
      const mk = () => { const side = g.ri(0, 3); return { x: side === 0 ? -20 : side === 1 ? W + 20 : g.rf(60, 480), y: side === 2 ? -20 : side === 3 ? H + 20 : g.rf(60, 380), a: g.rf(0, TAU), sp: g.rf(28, 45), state: 0, t: 0, ph: g.rf(0, 6), sx: 0, sy: 0 }; };
      for (let i = 0; i < NB; i++) { const b = mk(); b.x = g.rf(80, 460); b.y = g.rf(80, 360); bugs.push(b); }
      g.on(c, "pointerdown", e => {
        const p = pos(e); let best = null, bd = 40;
        bugs.forEach(b => { if (b.state === 0 || b.state === 2) { const d = Math.hypot(b.x - p.x, b.y - p.y); if (d < bd) { bd = d; best = b; } } });
        if (!best) { g.sfx("click"); return; }
        const close = warns.some(w => Math.hypot(w.x - best.x, w.y - best.y) < w.r + 20), pts = close ? 3 : 1;
        best.state = 1; best.t = 0; best.sx = best.x; best.sy = best.y; g.add(pts); g.sfx("swish"); fx.txt(close ? "Close call! +3" : "+1", best.x, best.y - 24, close ? "#fff44f" : "#fff");
      });
      g.loop((dt, t) => {
        const ramp = Math.max(.45, 1 - t / 120); arrive -= dt;
        if (bugs.filter(b => b.state !== 1).length < NB + Math.floor(t / 40) && arrive <= 0) { bugs.push(mk()); arrive = 1.2; }
        dropT -= dt;
        if (dropT <= 0) {
          const live = bugs.filter(b => b.state === 0), tgt = live.length && Math.random() < .7 ? g.pick(live) : null;
          warns.push({ x: g.clamp(tgt ? tgt.x + g.rf(-25, 25) : g.rf(50, 490), 40, W - 40), y: g.clamp(tgt ? tgt.y + g.rf(-25, 25) : g.rf(60, 390), 50, H - 40), t: 0, dur: g.by(1.6, 1.25, 1.0) * Math.max(.7, ramp), r: g.by(44, 50, 56), fall: 0 });
          dropT = g.by(2.4, 1.8, 1.4) * ramp * g.rf(.8, 1.2);
        }
        for (let i = warns.length - 1; i >= 0; i--) {
          const w = warns[i]; w.t += dt;
          if (w.t >= w.dur) {
            w.fall += dt;
            if (w.fall >= .2) {
              warns.splice(i, 1); puddles.push({ x: w.x, y: w.y, life: 1, r: w.r }); g.sfx("splash"); fx.burst(w.x, w.y, "#6fc4ff", 14, 150); fx.shake = .2;
              bugs.forEach(b => { if (b.state === 0 && Math.hypot(b.x - w.x, b.y - w.y) < w.r) { b.state = 2; b.t = 1.3; lives--; g.status("Lives: " + lives); g.sfx("wrong"); fx.txt("Splash!", b.x, b.y - 24, "#8fd0ff"); } });
              if (lives <= 0) { g.over("The ladybugs are all safe now. Good job!"); return false; }
            }
          }
        }
        for (let i = puddles.length - 1; i >= 0; i--) { puddles[i].life -= dt; if (puddles[i].life <= 0) puddles.splice(i, 1); }
        for (let i = bugs.length - 1; i >= 0; i--) {
          const b = bugs[i];
          if (b.state === 1) { b.t += dt / .8; const e = Math.min(1, b.t); b.x = b.sx + (HOUSE.x - b.sx) * e; b.y = b.sy + (HOUSE.y - 25 - b.sy) * e - Math.sin(Math.PI * e) * 90; b.a = Math.atan2(HOUSE.y - b.sy, HOUSE.x - b.sx); if (b.t >= 1) { bugs.splice(i, 1); rescued++; HOUSE.sq = 1; g.sfx("gotit"); fx.burst(HOUSE.x, HOUSE.y - 20, "#ffd34e", 10); } continue; }
          if (b.state === 2) { b.t -= dt; if (b.t <= 0) b.state = 0; continue; }
          b.a += g.rf(-1, 1) * dt * 3; b.x += Math.cos(b.a) * b.sp * dt; b.y += Math.sin(b.a) * b.sp * dt;
          if (b.x < 30 || b.x > W - 30) { b.a = Math.PI - b.a; b.x = g.clamp(b.x, 30, W - 30); } if (b.y < 30 || b.y > H - 30) { b.a = -b.a; b.y = g.clamp(b.y, 30, H - 30); }
          if (b.x > 500 && b.y > 290) b.a = -2.4;
        }
        HOUSE.sq = Math.max(0, HOUSE.sq - dt * 3);
        fx.begin(x, dt);
        sky(x, W, H, "#8be07a", "#4bb55a");
        flowers.forEach(f => { for (let k = 0; k < 5; k++) circ(x, f.x + Math.cos(k * 1.26) * 6, f.y + Math.sin(k * 1.26) * 6, 4, f.col); circ(x, f.x, f.y, 3, "#e8a020"); });
        puddles.forEach(p => { x.globalAlpha = p.life * .7; ell(x, p.x, p.y, p.r * (1.1 - p.life * .2), p.r * .5, "#6fc4ff"); }); x.globalAlpha = 1;
        warns.forEach(w => {
          const k = g.clamp(w.t / w.dur, 0, 1); ell(x, w.x, w.y, w.r, w.r * .55, "rgba(40,110,200," + (.12 + k * .25) + ")"); x.strokeStyle = k > .7 ? "#ff6a6a" : "#fff"; x.lineWidth = 3; x.setLineDash([8, 6]); ell(x, w.x, w.y, w.r, w.r * .55, null); x.stroke(); x.setLineDash([]);
          ell(x, w.x, w.y, w.r * k, w.r * .55 * k, "rgba(40,110,200,.25)");
          if (w.fall > 0) { const dy = w.y - 260 * (1 - w.fall / .2); x.save(); x.translate(w.x, dy); x.beginPath(); x.moveTo(0, -22); x.quadraticCurveTo(12, -2, 0, 10); x.quadraticCurveTo(-12, -2, 0, -22); x.fillStyle = "#4cb8ff"; x.fill(); x.restore(); }
        });
        // house
        x.save(); x.translate(HOUSE.x, HOUSE.y); x.scale(1 + HOUSE.sq * .08, 1 - HOUSE.sq * .08);
        ell(x, 0, 30, 60, 10, "rgba(0,0,0,.2)"); x.fillStyle = "#fff3d4"; x.beginPath(); x.roundRect(-22, -8, 44, 40, 8); x.fill(); ell(x, 0, 20, 10, 14, "#8a5a35");
        ell(x, 0, -14, 58, 40, "#ff5a5a"); [[-26, -26, 8], [10, -36, 9], [28, -14, 7], [-6, -8, 6]].forEach(o => circ(x, o[0], o[1], o[2], "#fff")); x.restore();
        bugs.slice().sort((a, b) => a.y - b.y).forEach(b => {
          const fly = b.state === 1, wob = b.state === 2 ? Math.sin(t * 20) * 3 : 0;
          ell(x, b.x, b.y + (fly ? 30 : 10), 15, 7, "rgba(0,0,0,.18)");
          x.save(); x.translate(b.x + wob, b.y); x.rotate(b.a);
          if (fly) { const fl = Math.sin(t * 40) * .5; ell(x, -2, -14, 11, 6 + fl * 3, "rgba(255,255,255,.7)"); ell(x, -2, 14, 11, 6 - fl * 3, "rgba(255,255,255,.7)"); }
          else { x.strokeStyle = "#222"; x.lineWidth = 2; for (let k = -1; k <= 1; k++) { const o = Math.sin(t * 12 + k + b.ph) * 2; x.beginPath(); x.moveTo(k * 6, -10); x.lineTo(k * 6 + o, -17); x.moveTo(k * 6, 10); x.lineTo(k * 6 - o, 17); x.stroke(); } }
          ell(x, 0, 0, 16, 13, "#ff3b3b"); x.strokeStyle = "#222"; x.lineWidth = 2; x.beginPath(); x.moveTo(-14, 0); x.lineTo(14, 0); x.stroke(); [[-6, -6], [-6, 6], [4, -7], [4, 7]].forEach(o => circ(x, o[0], o[1], 2.8, "#222"));
          circ(x, 14, 0, 7, "#222"); x.beginPath(); x.moveTo(18, -3); x.lineTo(25, -8); x.moveTo(18, 3); x.lineTo(25, 8); x.stroke(); circ(x, 16, -3, 1.6, "#fff"); circ(x, 16, 3, 1.6, "#fff");
          x.restore();
          if (b.state === 2) for (let k = 0; k < 3; k++) { const a = t * 8 + k * 2.1; starPath(x, b.x + Math.cos(a) * 18, b.y - 22 + Math.sin(a) * 5, 5, a); x.fillStyle = "#ffe14a"; x.fill(); }
        });
        fx.end(x, dt);
      });
    }
  });

  // ---- 12. Rainbow Tapper: tap the colour pads to build a rainbow ----
  B.add({
    id: "s1-rainbow", name: "Rainbow Tapper", ages: [5, 9], cat: "Tap", color: "#ff7ad9", icon: "W",
    desc: "Tap the colour pads as the notes arrive and build a rainbow.", controls: "Tap the pad (or press 1 2 3 4 / arrow keys) when a note reaches it",
    start(g) {
      const cv = g.canvas(480, 600), { c, x, W, H, pos } = cv, fx = fxs(g, cv);
      const LC = ["#ff5a5a", "#ffd34e", "#5fd37a", "#4cb8ff"], FQ = [262, 330, 392, 523], RB = ["#ff4d4d", "#ff9a2a", "#ffe14a", "#4cd964", "#3fa7ff", "#5a5aff", "#b36bff"];
      const HITY = 505, SP = g.by(190, 245, 300), NEED = g.by(5, 6, 7), LW = W / 4;
      let notes = [], hits = 0, lives = g.by(9, 7, 6), spawn = 1, bands = 0, lastLane = -1, flash = [0, 0, 0, 0], finished = false;
      g.status("Misses left: " + lives);
      const press = lane => {
        if (finished) return; let best = null, bd = 56;
        notes.forEach(n => { if (n.lane === lane && !n.hit) { const d = Math.abs(n.y - HITY); if (d < bd) { bd = d; best = n; } } });
        flash[lane] = .25;
        if (!best) { g.sfx("click"); return; }
        best.hit = true; const perfect = bd < 22; hits++; g.add(perfect ? 2 : 1); g.sfx("note", FQ[lane]); fx.burst(lane * LW + LW / 2, HITY, LC[lane], 12, 180); if (perfect) fx.txt("Perfect!", lane * LW + LW / 2, HITY - 60, "#fff44f");
        const nb = Math.floor(hits / NEED);
        if (nb > bands) { bands = nb; g.sfx("cheer"); fx.burst(W / 2, 110, RB[Math.min(6, bands - 1)], 24, 260); fx.shake = .2; if (bands >= 7) { finished = true; g.win("Rainbow complete! Beautiful!"); } }
      };
      g.on(c, "pointerdown", e => { press(g.clamp(Math.floor(pos(e).x / LW), 0, 3)); });
      const KM = { ArrowLeft: 0, ArrowDown: 1, ArrowUp: 2, ArrowRight: 3, "1": 0, "2": 1, "3": 2, "4": 3, d: 0, f: 1, j: 2, k: 3 };
      g.on(window, "keydown", e => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; if (KM[k] !== undefined && !e.repeat) press(KM[k]); });
      g.loop((dt, t) => {
        if (finished) return false;
        spawn -= dt;
        if (spawn <= 0) {
          let lane = g.ri(0, 3); if (lane === lastLane && Math.random() < .6) lane = (lane + g.ri(1, 3)) % 4; lastLane = lane;
          notes.push({ lane, y: 215, hit: false, a: 1 });
          if (g.diff === 2 && Math.random() < .15) notes.push({ lane: (lane + g.ri(1, 3)) % 4, y: 215, hit: false, a: 1 });
          spawn = g.by(.85, .66, .5) * Math.max(.7, 1 - t / 150) * g.rf(.9, 1.15);
        }
        for (let i = notes.length - 1; i >= 0; i--) {
          const n = notes[i];
          if (n.hit) { n.a -= dt * 6; if (n.a <= 0) notes.splice(i, 1); continue; }
          n.y += SP * dt;
          if (n.y > HITY + 62) { notes.splice(i, 1); lives--; g.status("Misses left: " + lives); g.sfx("drop"); fx.burst(n.lane * LW + LW / 2, HITY + 40, "#888", 6, 80); if (lives <= 0) { g.over("Nice tune! Try for the whole rainbow!"); return false; } }
        }
        flash = flash.map(f => Math.max(0, f - dt));
        fx.begin(x, dt);
        sky(x, W, H, "#bfe9ff", "#ffe6f7");
        for (let l = 0; l < 4; l++) { x.fillStyle = l % 2 ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.15)"; x.fillRect(l * LW, 200, LW, H - 200); }
        // rainbow
        const cx = W / 2, cy = 200;
        for (let i = 0; i < 7; i++) {
          const r = 190 - i * 15; x.lineWidth = 14; x.lineCap = "round"; x.strokeStyle = "rgba(255,255,255,.55)"; x.beginPath(); x.arc(cx, cy, r, Math.PI, TAU); x.stroke();
          const frac = i < bands ? 1 : i === bands ? (hits % NEED) / NEED : 0;
          if (frac > 0) { x.strokeStyle = RB[i]; x.beginPath(); x.arc(cx, cy, r, Math.PI, Math.PI + frac * Math.PI); x.stroke(); }
        }
        x.lineCap = "butt";
        [[cx - 150, cy + 4], [cx + 150, cy + 4]].forEach(p => { circ(x, p[0] - 22, p[1], 22, "#fff"); circ(x, p[0] + 8, p[1] - 8, 28, "#fff"); circ(x, p[0] + 34, p[1], 20, "#fff"); });
        x.strokeStyle = "rgba(255,255,255,.9)"; x.lineWidth = 3; x.setLineDash([10, 8]); x.beginPath(); x.moveTo(0, HITY); x.lineTo(W, HITY); x.stroke(); x.setLineDash([]);
        notes.forEach(n => {
          const nx = n.lane * LW + LW / 2, k = n.hit ? 1 + (1 - n.a) * .6 : 1; x.globalAlpha = Math.max(0, n.a);
          circ(x, nx, n.y, 40 * k, "rgba(255,255,255,.4)"); circ(x, nx, n.y, 30 * k, LC[n.lane]); x.lineWidth = 4; x.strokeStyle = "#fff"; x.stroke(); starPath(x, nx, n.y, 15 * k, t * 2); x.fillStyle = "#fff"; x.fill(); x.globalAlpha = 1;
        });
        for (let l = 0; l < 4; l++) {
          const f = flash[l] * 4, py = 540 + f * 6;
          x.beginPath(); x.roundRect(l * LW + 6, py, LW - 12, 52, 16); x.fillStyle = LC[l]; x.fill(); x.lineWidth = 4; x.strokeStyle = "#fff"; x.stroke();
          x.beginPath(); x.roundRect(l * LW + 14, py + 6, LW - 28, 12, 6); x.fillStyle = "rgba(255,255,255," + (.3 + f * .4) + ")"; x.fill();
          if (f > 0) { x.globalAlpha = f * .5; ell(x, l * LW + LW / 2, HITY, 50, 30, "#fff"); x.globalAlpha = 1; }
        }
        fx.end(x, dt);
      });
    }
  });
})();
