// Break Time Games: set 7 (skill, timing and sports)
(function () {
  const B = window.BreakGames; if (!B) return;
  const TAU = Math.PI * 2;
  const vgrad = (x, y0, y1, a, b) => { const gr = x.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); return gr; };
  const burst = (parts, px, py, col, n, sp) => { for (let i = 0; i < n; i++) { const a = Math.random() * TAU, s = (sp || 160) * (.3 + Math.random() * .7); parts.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, life: .5 + Math.random() * .4, col, g: 300 }); } };
  const drawParts = (x, parts, dt) => { for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.vy += (p.g || 0) * dt; p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.min(1, p.life * 2); x.fillStyle = p.col; x.fillRect(p.x - 2, p.y - 2, 4, 4); } x.globalAlpha = 1; };
  const T = (x, s, px, py, size, col, al) => { x.font = "bold " + size + "px system-ui, sans-serif"; x.textAlign = al || "center"; x.textBaseline = "middle"; x.lineWidth = 4; x.lineJoin = "round"; x.strokeStyle = "rgba(0,0,0,.5)"; x.strokeText(s, px, py); x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  const popAt = (g, cv, W, H, s, px, py, col) => g.pop(s, px * cv.clientWidth / W, py * cv.clientHeight / H, col);
  const circ = (x, px, py, r, col) => { x.fillStyle = col; x.beginPath(); x.arc(px, py, Math.max(0, r), 0, TAU); x.fill(); };

  // ---- Hoop Shot: free throws with drag to aim ----
  B.add({
    id: "s7-hoops", name: "Hoop Shot", ages: [7, 20], cat: "Sports", color: "#ff8a2a", icon: "B",
    desc: "Pull back, follow the dots and sink the free throws.", controls: "Drag back from the ball, then let go to shoot",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), parts = [], R = 14, GR = 900, FLOOR = 372, RL = 498, RR = 548;
      const total = g.by(10, 10, 12), dots = g.by(16, 9, 4), amp = g.by(0, 22, 55);
      const ball = { x: 110, y: 320, vx: 0, vy: 0, rot: 0 };
      let state = "aim", drag = null, shots = 0, made = 0, streak = 0, tm = 0, shake = 0, bounces = 0, flyT = 0, scored = false, rim = false, waitT = 0, msg = "", msgT = 0, netK = 0;
      const hoopY = () => 200 + Math.sin(tm * 1.3) * amp;
      const say = s => { msg = s; msgT = 1.1; };
      const info = () => g.status("Shots left: " + (total - shots) + "   Streak: " + streak);
      const reset = () => { Object.assign(ball, { x: g.by(110, g.ri(90, 190), g.ri(80, 240)), y: 320, vx: 0, vy: 0, rot: 0 }); state = "aim"; scored = false; rim = false; bounces = 0; flyT = 0; drag = null; };
      const power = p => { let dx = ball.x - p.x, dy = ball.y - p.y; const l = Math.hypot(dx, dy); if (l > 150) { dx *= 150 / l; dy *= 150 / l; } return { vx: dx * 5.2, vy: dy * 5.2, l: Math.min(l, 150) }; };
      const collide = (px, py, rr, e) => { const dx = ball.x - px, dy = ball.y - py, d = Math.hypot(dx, dy); if (d < R + rr && d > 0) { const nx = dx / d, ny = dy / d; ball.x = px + nx * (R + rr); ball.y = py + ny * (R + rr); const vn = ball.vx * nx + ball.vy * ny; if (vn < 0) { ball.vx -= (1 + e) * vn * nx; ball.vy -= (1 + e) * vn * ny; return true; } } return false; };
      info(); reset();
      g.on(c, "pointerdown", e => { if (state !== "aim") return; drag = pos(e); });
      g.on(c, "pointermove", e => { if (drag) drag = pos(e); });
      g.on(window, "pointerup", e => {
        if (!drag || state !== "aim") { drag = null; return; }
        const pw = power(pos(e)); drag = null; if (pw.l < 14) return;
        ball.vx = pw.vx; ball.vy = pw.vy; state = "fly"; g.sfx("swish");
      });
      g.loop(dt => {
        tm += dt; if (msgT > 0) msgT -= dt; netK = Math.max(0, netK - dt * 2); shake = Math.max(0, shake - dt * 30);
        const hy = hoopY();
        if (state === "fly") {
          flyT += dt; const n = 3, s = dt / n;
          for (let i = 0; i < n; i++) {
            const py = ball.y; ball.vy += GR * s; ball.x += ball.vx * s; ball.y += ball.vy * s; ball.rot += ball.vx * s * .03;
            if (ball.y > FLOOR - R) { ball.y = FLOOR - R; if (ball.vy > 0) { if (ball.vy > 90) g.sfx("thump"); ball.vy = -ball.vy * .64; ball.vx *= .85; bounces++; if (Math.abs(ball.vy) < 70) ball.vy = 0; } }
            if (ball.x + R > 560 && ball.x < 575 && ball.y > hy - 100 && ball.y < hy + 20 && ball.vx > 0) { ball.x = 560 - R; ball.vx = -ball.vx * .55; rim = true; g.sfx("clink"); shake = 5; }
            if (collide(RL, hy, 4, .55) || collide(RR, hy, 4, .55)) { rim = true; g.sfx("clink"); shake = 3; }
            if (!scored && py < hy && ball.y >= hy && ball.vy > 0 && ball.x > RL + 3 && ball.x < RR - 3) {
              scored = true; streak++; made++; const pts = (rim ? 2 : 3) + Math.min(streak - 1, 3); g.add(pts); say(rim ? "Basket! +" + pts : "Swish! +" + pts);
              g.sfx(rim ? "cheer" : "star"); popAt(g, c, W, H, "+" + pts, 520, hy - 20, "#ffd34e"); burst(parts, 523, hy, "#ffb347", 18, 200); netK = 1; ball.vx *= .3; ball.vy *= .5; info();
            }
          }
          if (ball.y >= FLOOR - R - 1) ball.vx *= Math.max(0, 1 - 1.5 * dt);
          if (ball.x > W + 40 || ball.x < -40 || flyT > 5 || bounces >= 3 || (scored && ball.y > hy + 90) || (bounces > 0 && ball.y >= FLOOR - R - 1 && Math.abs(ball.vx) < 20)) {
            shots++; if (!scored) { streak = 0; say("Miss!"); g.sfx("wrong"); } info(); state = "wait"; waitT = .9;
          }
        } else if (state === "wait") {
          waitT -= dt;
          if (waitT <= 0) { if (shots >= total) { if (made >= total * .6) g.win(made + " baskets from " + total + " shots!"); else g.over(made + " baskets from " + total + " shots"); return false; } reset(); }
        }
        // draw
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .3, g.rf(-shake, shake) * .3);
        x.fillStyle = vgrad(x, 0, FLOOR, "#2b1f6b", "#6a4ad8"); x.fillRect(0, 0, W, FLOOR);
        for (let i = 0; i < 40; i++) circ(x, (i * 97) % W, 60 + ((i * 53) % 120), 10 + ((i * 7) % 8), "rgba(255,255,255,.07)");
        x.fillStyle = vgrad(x, FLOOR, H, "#c98a3d", "#8a5a22"); x.fillRect(0, FLOOR, W, H - FLOOR);
        x.strokeStyle = "rgba(255,255,255,.55)"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, FLOOR); x.lineTo(W, FLOOR); x.stroke();
        x.fillStyle = "#555"; x.fillRect(574, hy + 20, 9, FLOOR - hy - 20);
        x.fillStyle = "#f4f7ff"; x.beginPath(); x.roundRect(560, hy - 100, 12, 120, 3); x.fill();
        x.fillStyle = "#ff5a5a"; x.fillRect(557, hy - 28, 4, 36);
        x.strokeStyle = "rgba(255,255,255,.85)"; x.lineWidth = 1.5;
        for (let i = 0; i <= 6; i++) { const tx = RL + (RR - RL) * i / 6, bxx = RL + 10 + (RR - RL - 20) * i / 6 + Math.sin(tm * 12 + i) * netK * 6; x.beginPath(); x.moveTo(tx, hy); x.lineTo(bxx, hy + 42); x.stroke(); }
        x.beginPath(); x.moveTo(RL + 4, hy + 20); x.lineTo(RR - 4, hy + 20); x.stroke();
        x.strokeStyle = "#ff6a1a"; x.lineWidth = 6; x.lineCap = "round"; x.beginPath(); x.moveTo(RL, hy); x.lineTo(RR, hy); x.stroke(); x.lineCap = "butt";
        // ball shadow and ball
        const sh = Math.max(.3, 1 - (FLOOR - ball.y) / 380); x.fillStyle = "rgba(0,0,0,.28)"; x.beginPath(); x.ellipse(ball.x, FLOOR + 8, R * sh * 1.3, 4 * sh, 0, 0, TAU); x.fill();
        if (state === "aim" && drag) {
          const pw = power(drag);
          for (let i = 1; i <= dots; i++) { const t = i * .075, px = ball.x + pw.vx * t, py = ball.y + pw.vy * t + .5 * GR * t * t; circ(x, px, py, 4 - i * .1, "rgba(255,255,255," + (1 - i / (dots + 2)) + ")"); }
          x.strokeStyle = "rgba(255,255,255,.5)"; x.lineWidth = 3; x.beginPath(); x.moveTo(ball.x, ball.y); x.lineTo(ball.x - pw.vx / 5.2, ball.y - pw.vy / 5.2); x.stroke();
          x.fillStyle = vgrad(x, 0, 1, "#6be28f", "#ff5a5a"); x.fillStyle = pw.l > 120 ? "#ff8a2a" : "#6be28f"; x.fillRect(20, 380, pw.l * 1.2, 8);
        }
        x.save(); x.translate(ball.x, ball.y); x.rotate(ball.rot);
        const bg = x.createRadialGradient(-4, -5, 2, 0, 0, R); bg.addColorStop(0, "#ffb066"); bg.addColorStop(1, "#d9631a"); x.fillStyle = bg; x.beginPath(); x.arc(0, 0, R, 0, TAU); x.fill();
        x.strokeStyle = "#3a1a08"; x.lineWidth = 1.6; x.beginPath(); x.moveTo(-R, 0); x.lineTo(R, 0); x.moveTo(0, -R); x.lineTo(0, R); x.stroke(); x.beginPath(); x.arc(-R * 1.1, 0, R * .85, -1, 1); x.arc(R * 1.1, 0, R * .85, Math.PI - 1, Math.PI + 1); x.stroke(); x.restore();
        drawParts(x, parts, dt);
        if (msgT > 0) { x.globalAlpha = Math.min(1, msgT * 2); T(x, msg, 320, 90 - (1.1 - msgT) * 20, 32, "#ffd34e"); x.globalAlpha = 1; }
        if (shots === 0 && state === "aim" && !drag) T(x, "Drag back from the ball, then let go", 320, 40, 20, "#fff");
        x.restore();
      });
    }
  });

  // ---- Mini Golf: 5 holes ----
  B.add({
    id: "s7-minigolf", name: "Mini Golf", ages: [6, 20], cat: "Sports", color: "#4cd37b", icon: "G",
    desc: "Five holes with walls, sand and a spinning windmill bar.", controls: "Drag back from the ball and let go to putt",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), BR = 7, cupR = g.by(14, 12, 10), MAXS = 8;
      const rect = (a, b, d, e) => [[a, b], [d, b], [d, e], [a, e]];
      const poly = p => p.map((q, i) => { const n = p[(i + 1) % p.length]; return [q[0], q[1], n[0], n[1]]; });
      const segs = (a, b, d, e) => poly(rect(a, b, d, e));
      const HOLES = [
        { par: 2, tee: [90, 200], cup: [540, 200], pts: rect(40, 130, 600, 270), extra: [], sand: [] },
        { par: 3, tee: [90, 100], cup: [540, 100], pts: rect(40, 50, 600, 350), extra: [[320, 50, 320, 250]], sand: [] },
        { par: 3, tee: [550, 110], cup: [90, 310], pts: [[40, 50], [600, 50], [600, 210], [300, 210], [300, 350], [40, 350]], extra: [], sand: [] },
        { par: 3, tee: [80, 200], cup: [550, 200], pts: rect(40, 100, 600, 300), extra: segs(190, 100, 215, 190).concat(segs(420, 210, 445, 300)), sand: [[270, 100, 100, 200]] },
        { par: 3, tee: [80, 200], cup: [550, 200], pts: rect(40, 100, 600, 300), extra: [], sand: [], mill: { x: 320, y: 200, len: 72 } }
      ];
      const b = { x: 0, y: 0, vx: 0, vy: 0 }, parts = [];
      let hi = 0, h, walls, strokes = 0, drag = null, mode = "aim", timer = 0, ang = 0, from = null, tm = 0, msg = "", total = 0;
      const info = () => g.status("Hole " + (hi + 1) + "/5  Par " + h.par + "  Strokes " + strokes);
      const load = i => { hi = i; h = HOLES[i]; walls = poly(h.pts).concat(h.extra); b.x = h.tee[0]; b.y = h.tee[1]; b.vx = b.vy = 0; strokes = 0; mode = "aim"; drag = null; msg = ""; info(); };
      const sandAt = (px, py) => h.sand.some(s => px > s[0] && px < s[0] + s[2] && py > s[1] && py < s[1] + s[3]);
      const hit = (ax, ay, cx2, cy2, e) => {
        const ex = cx2 - ax, ey = cy2 - ay, l2 = ex * ex + ey * ey; let t = ((b.x - ax) * ex + (b.y - ay) * ey) / l2; t = t < 0 ? 0 : t > 1 ? 1 : t;
        const px = ax + ex * t, py = ay + ey * t; let dx = b.x - px, dy = b.y - py, d = Math.hypot(dx, dy);
        if (d < BR) { if (d < .001) { dx = -ey; dy = ex; d = Math.hypot(dx, dy) || 1; } const nx = dx / d, ny = dy / d; b.x = px + nx * BR; b.y = py + ny * BR; const vn = b.vx * nx + b.vy * ny; if (vn < 0) { b.vx -= (1 + e) * vn * nx; b.vy -= (1 + e) * vn * ny; return -vn; } }
        return 0;
      };
      const millSeg = () => { const m = h.mill, dx = Math.cos(ang) * m.len, dy = Math.sin(ang) * m.len; return [m.x - dx, m.y - dy, m.x + dx, m.y + dy]; };
      const finish = pts => {
        total += pts; g.add(pts); const diff = strokes - h.par; msg = pts === 0 ? "Pick up!" : strokes === 1 ? "Hole in one!" : diff < 0 ? "Birdie!" : diff === 0 ? "Par" : "+" + diff;
        g.sfx(pts ? "cheer" : "wrong"); popAt(g, c, W, H, "+" + pts, h.cup[0], h.cup[1] - 10, "#ffd34e"); burst(parts, h.cup[0], h.cup[1], "#fff", 20, 160); mode = "next"; timer = 1.1;
      };
      load(0);
      g.on(c, "pointerdown", e => { if (mode === "aim") drag = pos(e); });
      g.on(c, "pointermove", e => { if (drag) drag = pos(e); });
      g.on(window, "pointerup", e => {
        if (!drag || mode !== "aim") { drag = null; return; }
        const p = pos(e); drag = null; let dx = b.x - p.x, dy = b.y - p.y; const l = Math.hypot(dx, dy); if (l < 8) return;
        const k = Math.min(l, 130) / 130 * 640; b.vx = dx / l * k; b.vy = dy / l * k; mode = "roll"; strokes++; g.sfx("thump"); info();
      });
      g.loop(dt => {
        tm += dt;
        if (h.mill) ang += dt * g.by(1.1, 1.6, 2.2);
        if (mode === "roll" || (mode === "aim" && h.mill)) {
          const sp = Math.hypot(b.vx, b.vy), n = Math.max(1, Math.ceil(sp * dt / 3)), s = dt / n; let imp = 0;
          for (let i = 0; i < n; i++) {
            b.x += b.vx * s; b.y += b.vy * s;
            for (const w of walls) imp = Math.max(imp, hit(w[0], w[1], w[2], w[3], .82));
            if (h.mill) { const m = millSeg(); imp = Math.max(imp, hit(m[0], m[1], m[2], m[3], .9)); }
          }
          if (imp > 120) g.sfx("clink");
        }
        if (mode === "roll") {
          const f = Math.exp(-(sandAt(b.x, b.y) ? 5 : 1.1) * dt); b.vx *= f; b.vy *= f;
          const sp = Math.hypot(b.vx, b.vy), dx = h.cup[0] - b.x, dy = h.cup[1] - b.y, d = Math.hypot(dx, dy);
          if (d < cupR && sp < 420) { mode = "sink"; timer = 0; from = { x: b.x, y: b.y }; g.sfx("drop"); }
          else if (d < cupR * 2.2 && sp < 160) { b.vx += dx / d * 260 * dt; b.vy += dy / d * 260 * dt; }
          if (mode === "roll" && sp < 14) { b.vx = b.vy = 0; mode = "aim"; if (strokes >= MAXS) finish(0); }
        } else if (mode === "sink") {
          timer += dt; const k = Math.min(1, timer / .4); b.x = from.x + (h.cup[0] - from.x) * k; b.y = from.y + (h.cup[1] - from.y) * k;
          if (timer >= .45) finish(Math.max(1, h.par + 3 - strokes));
        } else if (mode === "next") {
          timer -= dt; if (timer <= 0) { if (hi >= 4) { g.win("Round finished: " + total + " points!"); return false; } load(hi + 1); }
        }
        // draw
        x.fillStyle = vgrad(x, 0, H, "#2b8a4e", "#1f6b3b"); x.fillRect(0, 0, W, H);
        x.beginPath(); h.pts.forEach((q, i) => i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1])); x.closePath(); x.fillStyle = "#5ccf72"; x.fill();
        x.save(); x.clip(); for (let i = 0; i < 14; i++) { x.fillStyle = "rgba(255,255,255,.05)"; x.fillRect(i * 48, 0, 24, H); } x.restore();
        h.sand.forEach(s => { x.fillStyle = "#e8d28a"; x.fillRect(s[0], s[1], s[2], s[3]); x.fillStyle = "rgba(160,120,50,.25)"; for (let i = 0; i < 30; i++) x.fillRect(s[0] + (i * 37) % s[2], s[1] + (i * 59) % s[3], 3, 3); });
        x.lineCap = "round"; x.strokeStyle = "#7a4a1e"; x.lineWidth = 9; walls.forEach(w => { x.beginPath(); x.moveTo(w[0], w[1]); x.lineTo(w[2], w[3]); x.stroke(); });
        x.strokeStyle = "#b9803f"; x.lineWidth = 4; walls.forEach(w => { x.beginPath(); x.moveTo(w[0], w[1]); x.lineTo(w[2], w[3]); x.stroke(); });
        circ(x, h.cup[0], h.cup[1], cupR + 2, "rgba(0,0,0,.25)"); circ(x, h.cup[0], h.cup[1], cupR, "#111");
        x.strokeStyle = "#eee"; x.lineWidth = 2; x.beginPath(); x.moveTo(h.cup[0], h.cup[1]); x.lineTo(h.cup[0], h.cup[1] - 46); x.stroke(); x.fillStyle = "#ff4d6d"; x.beginPath(); x.moveTo(h.cup[0], h.cup[1] - 46); x.lineTo(h.cup[0] + 20, h.cup[1] - 39); x.lineTo(h.cup[0], h.cup[1] - 32); x.fill();
        if (h.mill) { const m = millSeg(); x.strokeStyle = "#c33"; x.lineWidth = 12; x.beginPath(); x.moveTo(m[0], m[1]); x.lineTo(m[2], m[3]); x.stroke(); x.strokeStyle = "#fff"; x.lineWidth = 4; x.beginPath(); x.moveTo(m[0], m[1]); x.lineTo(m[2], m[3]); x.stroke(); circ(x, h.mill.x, h.mill.y, 9, "#555"); }
        x.lineCap = "butt";
        const sc = mode === "sink" ? Math.max(.2, 1 - timer / .5) : 1;
        circ(x, b.x + 2, b.y + 3, BR * sc, "rgba(0,0,0,.3)"); circ(x, b.x, b.y, BR * sc, "#fff"); circ(x, b.x - 2, b.y - 2, 2 * sc, "#ccd");
        if (drag && mode === "aim") {
          let dx = b.x - drag.x, dy = b.y - drag.y; const l = Math.hypot(dx, dy) || 1, k = Math.min(l, 130); dx /= l; dy /= l;
          x.strokeStyle = "rgba(0,0,0,.35)"; x.lineWidth = 3; x.setLineDash([2, 8]); x.beginPath(); x.moveTo(b.x, b.y); x.lineTo(b.x + dx * k * 2.2, b.y + dy * k * 2.2); x.stroke(); x.setLineDash([]);
          x.strokeStyle = k > 100 ? "#ff8a2a" : "#fff"; x.lineWidth = 4; x.beginPath(); x.moveTo(b.x, b.y); x.lineTo(b.x - dx * k, b.y - dy * k); x.stroke();
        }
        drawParts(x, parts, dt);
        if (mode === "next") T(x, msg, 320, 28, 30, "#ffd34e");
        else if (strokes === 0 && mode === "aim" && !drag) T(x, "Drag back from the ball, let go to putt", 320, 24, 18, "#fff");
      });
    }
  });

  // ---- Archery: moving targets ----
  B.add({
    id: "s7-archery", name: "Moving Targets", ages: [8, 20], cat: "Sports", color: "#c9812b", icon: "A",
    desc: "Hold to draw the bow, let go to shoot targets sliding up and down.", controls: "Aim with the mouse or finger, hold to draw, let go to fire (or Up/Down keys and Space)",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), parts = [], GROUND = 350, bow = { x: 70, y: 290 }, GR = 520;
      const total = g.by(14, 12, 10), windMax = g.by(0, 40, 90), amp = g.by(75, 95, 108), spd = g.by(.55, .85, 1.2);
      const targets = [
        { x: 380, r: g.by(46, 40, 34), mul: 1, s: spd, ph: 0 }, { x: 470, r: g.by(38, 32, 28), mul: 2, s: spd * 1.35, ph: 2 }, { x: 560, r: g.by(32, 26, 22), mul: 3, s: spd * 1.7, ph: 4 }
      ];
      let aim = { x: 400, y: 200 }, charge = 0, charging = false, arrows = total, flying = null, stuck = [], cd = 0, tm = 0, shake = 0, wind = 0, endT = 0, msg = "", msgT = 0;
      const ty = t => 200 + Math.sin(tm * t.s + t.ph) * amp * (1 - (t.r - 22) / 140);
      const angle = () => g.clamp(Math.atan2(aim.y - bow.y, aim.x - bow.x), -1.2, .15);
      const info = () => g.status("Arrows: " + arrows);
      const start1 = () => { if (cd <= 0 && arrows > 0 && !flying && !charging) { charging = true; charge = 0; } };
      const fire = () => {
        if (!charging) return; charging = false; const a = angle(), sp = 300 + (.2 + .8 * Math.min(1, charge)) * 560;
        flying = { x: bow.x + Math.cos(a) * 22, y: bow.y + Math.sin(a) * 22, px: 0, py: 0, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp }; flying.px = flying.x; flying.py = flying.y;
        arrows--; cd = .25; g.sfx("swish"); info();
      };
      g.on(c, "pointerdown", e => { aim = pos(e); start1(); });
      g.on(c, "pointermove", e => { aim = pos(e); });
      g.on(window, "pointerup", fire);
      g.on(window, "keydown", e => { if (e.code === "Space" && !e.repeat) start1(); });
      g.on(window, "keyup", e => { if (e.code === "Space") fire(); });
      info();
      g.loop(dt => {
        tm += dt; cd -= dt; msgT -= dt; shake = Math.max(0, shake - dt * 30);
        if (g.keys.ArrowUp) aim.y -= 160 * dt; if (g.keys.ArrowDown) aim.y += 160 * dt; aim.y = g.clamp(aim.y, 20, 340);
        if (charging) charge = Math.min(1.15, charge + dt * 1.1);
        if (flying) {
          const f = flying, n = 4, s = dt / n;
          for (let i = 0; i < n && flying; i++) {
            f.px = f.x; f.py = f.y; f.vx += wind * s; f.vy += GR * s; f.x += f.vx * s; f.y += f.vy * s;
            for (const t of targets) {
              if (f.px < t.x && f.x >= t.x) {
                const k = (t.x - f.px) / (f.x - f.px), yy = f.py + (f.y - f.py) * k, tyy = ty(t);
                if (Math.abs(yy - tyy) < t.r) {
                  const dy = Math.abs(yy - tyy) / t.r, base = dy < .18 ? 10 : dy < .5 ? 5 : 2, pts = base * t.mul;
                  g.add(pts); stuck.push({ t, off: yy - tyy, a: Math.atan2(f.vy, f.vx), life: 2.4 }); msg = base === 10 ? "Bullseye! +" + pts : "+" + pts; msgT = 1;
                  g.sfx(base === 10 ? "cheer" : "pop"); popAt(g, c, W, H, "+" + pts, t.x, tyy, base === 10 ? "#ffd34e" : "#fff"); burst(parts, t.x, yy, base === 10 ? "#ffd34e" : "#ff6f6f", base === 10 ? 22 : 10, 180); shake = base === 10 ? 6 : 3; flying = null; break;
                }
              }
            }
            if (flying && f.y >= GROUND) { stuck.push({ gx: f.x, gy: GROUND, a: Math.atan2(f.vy, f.vx), life: 2 }); msg = "Miss"; msgT = .7; g.sfx("thump"); flying = null; }
            else if (flying && f.x > W + 60) { msg = "Miss"; msgT = .7; g.sfx("wrong"); flying = null; }
          }
          if (!flying) wind = g.rf(-1, 1) * windMax;
        }
        for (let i = stuck.length - 1; i >= 0; i--) { stuck[i].life -= dt; if (stuck[i].life <= 0) stuck.splice(i, 1); }
        if (arrows === 0 && !flying) { endT += dt; if (endT > 1) { g.over("Out of arrows!"); return false; } }
        // draw
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .3, g.rf(-shake, shake) * .3);
        x.fillStyle = vgrad(x, 0, GROUND, "#6ac4ff", "#e9f7ff"); x.fillRect(0, 0, W, GROUND);
        circ(x, 560, 60, 30, "#fff3a0");
        x.fillStyle = "#7cc36b"; x.beginPath(); x.moveTo(0, GROUND); x.quadraticCurveTo(160, 250, 330, GROUND); x.fill(); x.beginPath(); x.moveTo(250, GROUND); x.quadraticCurveTo(480, 230, 700, GROUND); x.fill();
        x.fillStyle = vgrad(x, GROUND, H, "#4aa04a", "#2c6b2c"); x.fillRect(0, GROUND, W, H - GROUND);
        if (windMax > 0) { T(x, "Wind", 60, 28, 16, "#244"); x.strokeStyle = "#244"; x.lineWidth = 4; x.beginPath(); x.moveTo(60 - wind / windMax * 25, 48); x.lineTo(60 + wind / windMax * 25, 48); x.stroke(); }
        targets.forEach(t => {
          const yy = ty(t); x.strokeStyle = "rgba(60,40,20,.45)"; x.lineWidth = 3; x.setLineDash([4, 6]); x.beginPath(); x.moveTo(t.x, 50); x.lineTo(t.x, GROUND); x.stroke(); x.setLineDash([]);
          [["#3b7be0", 1], ["#ffffff", .75], ["#e23b3b", .5], ["#ffd34e", .18]].forEach(q => { x.fillStyle = q[0]; x.beginPath(); x.ellipse(t.x, yy, 8 * q[1] + 2, t.r * q[1], 0, 0, TAU); x.fill(); });
          x.strokeStyle = "#333"; x.lineWidth = 2; x.beginPath(); x.ellipse(t.x, yy, 10, t.r, 0, 0, TAU); x.stroke(); T(x, "x" + t.mul, t.x + 22, yy - t.r - 8, 14, "#fff");
        });
        const drawArrow = (tx, tyy, a, col) => { const L = 36, bx = tx - Math.cos(a) * L, by = tyy - Math.sin(a) * L; x.strokeStyle = col; x.lineWidth = 3; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, tyy); x.stroke(); x.strokeStyle = "#fff"; x.lineWidth = 4; x.beginPath(); x.moveTo(bx, by); x.lineTo(bx + Math.cos(a) * 8, by + Math.sin(a) * 8); x.stroke(); };
        stuck.forEach(s => { x.globalAlpha = Math.min(1, s.life); if (s.t) drawArrow(s.t.x, ty(s.t) + s.off, s.a, "#5a3a1a"); else drawArrow(s.gx, s.gy, s.a, "#5a3a1a"); x.globalAlpha = 1; });
        if (flying) drawArrow(flying.x, flying.y, Math.atan2(flying.vy, flying.vx), "#5a3a1a");
        // bow
        const a = angle(); x.save(); x.translate(bow.x, bow.y); x.rotate(a);
        x.strokeStyle = "#6b3f14"; x.lineWidth = 6; x.beginPath(); x.arc(-4, 0, 34, -1.25, 1.25); x.stroke();
        const pull = charging ? Math.min(1, charge) * 22 : 0; x.strokeStyle = "#eee"; x.lineWidth = 1.5; x.beginPath(); x.moveTo(-4 + Math.cos(1.25) * 34, Math.sin(-1.25) * 34); x.lineTo(-4 - pull, 0); x.lineTo(-4 + Math.cos(1.25) * 34, Math.sin(1.25) * 34); x.stroke();
        if (!flying && arrows > 0) drawArrow(30 - pull, 0, 0, "#5a3a1a");
        x.restore();
        circ(x, bow.x - 10, bow.y + 28, 9, "#e0a070"); x.fillStyle = "#3a5aa0"; x.beginPath(); x.roundRect(bow.x - 20, bow.y + 36, 20, 44, 6); x.fill();
        const dotsN = g.by(10, 5, 0);
        if (dotsN && !flying && arrows > 0) { const sp = 300 + (.2 + .8 * Math.min(1, charging ? charge : .6)) * 560; for (let i = 1; i <= dotsN; i++) { const t = i * .06; circ(x, bow.x + Math.cos(a) * sp * t, bow.y + Math.sin(a) * sp * t + .5 * GR * t * t, 3, "rgba(255,255,255,.8)"); } }
        circ(x, aim.x, aim.y, 3, "rgba(255,255,255,.9)"); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 1.5; x.beginPath(); x.arc(aim.x, aim.y, 10, 0, TAU); x.stroke();
        if (charging || charge > 0) { x.fillStyle = "rgba(0,0,0,.35)"; x.fillRect(20, 380, 120, 10); x.fillStyle = charge > 1 ? "#ff8a2a" : "#6be28f"; x.fillRect(20, 380, 120 * Math.min(1, charge), 10); }
        if (msgT > 0) T(x, msg, 320, 70, 26, "#fff");
        if (arrows === total && !charging) T(x, "Hold to draw, let go to fire", 320, 30, 18, "#234");
        drawParts(x, parts, dt); x.restore();
      });
    }
  });

  // ---- Bowling Flick ----
  B.add({
    id: "s7-bowling", name: "Bowling Flick", ages: [6, 20], cat: "Sports", color: "#3a7bd5", icon: "o",
    desc: "Flick the ball up the lane and knock down the pins.", controls: "Drag the ball sideways, then flick it up the lane (Left/Right and Space on keyboard)",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(400, 600), parts = [], L = 100, RR = 300, pr = 9, br = g.by(17, 16, 13), frames = g.by(5, 7, 10), bumpers = g.diff === 0;
      const sp0 = g.by(26, 28, 31);
      let pins = [], ball = null, state = "aim", frame = 1, roll = 1, hist = [], dragging = false, bx = 200, waitT = 0, tm = 0, msg = "", msgT = 0, rollT = 0, spin = 0, shake = 0, total = 0, tip = true;
      const mkPins = () => { pins = []; for (let r = 0; r < 4; r++) for (let i = 0; i <= r; i++) { const hx = 200 + (i - r / 2) * sp0, hy = 170 - r * sp0 * .87; pins.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0, down: false, fade: 1 }); } };
      const info = () => g.status("Frame " + Math.min(frame, frames) + "/" + frames + "  Roll " + roll);
      const newBall = () => { ball = { x: bx, y: 545, vx: 0, vy: 0, gone: false, gutter: false }; state = "aim"; };
      const say = s => { msg = s; msgT = 1.2; };
      mkPins(); newBall(); info();
      const launch = (vx, vy) => { ball.vx = vx; ball.vy = vy; spin = g.diff === 2 ? (vx > 0 ? 1 : vx < 0 ? -1 : 0) * 45 : 0; state = "roll"; rollT = 0; tip = false; g.sfx("rumble"); };
      g.on(c, "pointerdown", e => { if (state !== "aim") return; const p = pos(e); if (Math.hypot(p.x - ball.x, p.y - ball.y) < 70 || p.y > 430) { dragging = true; hist = [{ x: p.x, y: p.y, t: e.timeStamp }]; } });
      g.on(c, "pointermove", e => {
        if (!dragging || state !== "aim") return; const p = pos(e); ball.x = g.clamp(p.x, L + br, RR - br); ball.y = g.clamp(p.y, 440, 575); hist.push({ x: p.x, y: p.y, t: e.timeStamp }); if (hist.length > 12) hist.shift();
      });
      g.on(window, "pointerup", e => {
        if (!dragging) return; dragging = false; if (state !== "aim") return;
        const last = hist[hist.length - 1], now = e.timeStamp; let first = hist[0]; for (const h of hist) if (now - h.t < 130) { first = h; break; }
        if (!last || !first || last === first) { ball.y = 545; return; }
        const dt = Math.max(.016, (last.t - first.t) / 1000); let vx = (last.x - first.x) / dt, vy = (last.y - first.y) / dt; const sp = Math.hypot(vx, vy);
        if (vy > -250) { ball.y = 545; say("Flick it faster!"); return; }
        if (sp > 950) { vx *= 950 / sp; vy *= 950 / sp; } vx *= .5; vy = Math.max(vy, -950);
        launch(vx, vy);
      });
      g.on(window, "keydown", e => {
        if (state !== "aim") return;
        if (e.code === "Space" || e.key === "ArrowUp") { launch(0, -620); return; }
      });
      const settle = () => {
        let down = 0; pins.forEach(p => { if (!p.down && (Math.hypot(p.x - p.hx, p.y - p.hy) > 14 || p.x < L - 5 || p.x > RR + 5 || p.y < 40)) { p.down = true; down++; } });
        const left = pins.filter(p => !p.down).length; let pts = down;
        if (roll === 1 && left === 0) { pts += 10; say("STRIKE! +" + pts); g.sfx("cheer"); shake = 8; }
        else if (roll === 2 && left === 0) { pts += 5; say("Spare! +" + pts); g.sfx("star"); }
        else say(down ? down + " down" : "Gutter ball"); if (!down) g.sfx("wrong");
        g.add(pts); total += pts; waitT = 1.3; state = "wait"; ball.gone = true;
        const strike = roll === 1 && left === 0; pins._next = strike || roll === 2 ? "frame" : "roll2";
      };
      g.loop(dt => {
        tm += dt; msgT -= dt; shake = Math.max(0, shake - dt * 25);
        if (state === "aim") { if (g.keys.ArrowLeft) { bx = g.clamp(bx - 160 * dt, L + br, RR - br); ball.x = bx; } if (g.keys.ArrowRight) { bx = g.clamp(bx + 160 * dt, L + br, RR - br); ball.x = bx; } if (!dragging) { ball.y += (545 - ball.y) * Math.min(1, dt * 12); } else bx = ball.x; }
        if (state === "roll") {
          rollT += dt; const n = 4, s = dt / n;
          for (let i = 0; i < n; i++) {
            if (!ball.gone) {
              ball.vx += spin * s; ball.x += ball.vx * s; ball.y += ball.vy * s;
              if (bumpers) { if (ball.x < L + br) { ball.x = L + br; ball.vx = Math.abs(ball.vx) * .7; } if (ball.x > RR - br) { ball.x = RR - br; ball.vx = -Math.abs(ball.vx) * .7; } }
              else if (!ball.gutter && (ball.x < L - 4 || ball.x > RR + 4)) { ball.gutter = true; g.sfx("thump"); }
              if (ball.gutter) { ball.vx = 0; ball.x = ball.x < 200 ? 85 : 315; spin = 0; }
              if (ball.y < 50) { ball.gone = true; }
              if (!ball.gutter && !ball.gone) for (const p of pins) {
                if (p.down) continue; const dx = p.x - ball.x, dy = p.y - ball.y, d = Math.hypot(dx, dy);
                if (d < br + pr && d > 0) { const nx = dx / d, ny = dy / d, rv = (p.vx - ball.vx) * nx + (p.vy - ball.vy) * ny; p.x = ball.x + nx * (br + pr); p.y = ball.y + ny * (br + pr); if (rv < 0) { const j = -(1.8) * rv / (1 / 5 + 1); p.vx += j * nx; p.vy += j * ny; ball.vx -= j / 5 * nx; ball.vy -= j / 5 * ny; g.sfx("clink"); shake = Math.max(shake, 4); burst(parts, p.x, p.y, "#fff", 4, 100); } }
              }
            }
            for (let a = 0; a < pins.length; a++) {
              const p = pins[a]; p.x += p.vx * s; p.y += p.vy * s; if (p.y < 48) { p.y = 48; p.vy = Math.abs(p.vy) * .3; }
              if (p.down) continue;
              for (let q = a + 1; q < pins.length; q++) {
                const o = pins[q]; if (o.down) continue; const dx = o.x - p.x, dy = o.y - p.y, d = Math.hypot(dx, dy);
                if (d < pr * 2 && d > 0) { const nx = dx / d, ny = dy / d, ov = pr * 2 - d; p.x -= nx * ov / 2; p.y -= ny * ov / 2; o.x += nx * ov / 2; o.y += ny * ov / 2; const rv = (o.vx - p.vx) * nx + (o.vy - p.vy) * ny; if (rv < 0) { const j = -(1.8) * rv / 2; p.vx -= j * nx; p.vy -= j * ny; o.vx += j * nx; o.vy += j * ny; g.sfx("pop"); } }
              }
            }
          }
          const f = Math.exp(-2.2 * dt); let moving = false; pins.forEach(p => { p.vx *= f; p.vy *= f; if (Math.hypot(p.vx, p.vy) > 12) moving = true; else if (Math.hypot(p.vx, p.vy) < 12) { p.vx *= .5; p.vy *= .5; } });
          if (!ball.gone && (Math.hypot(ball.vx, ball.vy) < 25 || rollT > 7)) ball.gone = true;
          if (ball.gone && !moving && rollT > .4) settle();
          if (state === "roll" && ball.gone && rollT > 6) settle();
        }
        if (state === "wait") {
          waitT -= dt;
          if (waitT <= 0) {
            if (pins._next === "roll2") { roll = 2; pins = pins.filter(p => !p.down); pins.forEach(p => { p.x = p.hx; p.y = p.hy; p.vx = p.vy = 0; }); pins._next = ""; }
            else { frame++; roll = 1; if (frame > frames) { g.win("Game over: " + total + " points!"); return false; } mkPins(); }
            info(); newBall();
          }
        }
        // draw
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .4, g.rf(-shake, shake) * .4);
        x.fillStyle = "#16122e"; x.fillRect(0, 0, W, H);
        x.fillStyle = "#07050f"; x.fillRect(L - 30, 0, RR - L + 60, 44);
        x.fillStyle = "#222"; x.fillRect(L - 32, 44, 32, H); x.fillRect(RR, 44, 32, H);
        x.fillStyle = "#101010"; x.fillRect(L - 20, 44, 20, H); x.fillRect(RR, 44, 20, H);
        const lg = x.createLinearGradient(L, 0, RR, 0); lg.addColorStop(0, "#d9a05a"); lg.addColorStop(.5, "#f0c07a"); lg.addColorStop(1, "#d9a05a"); x.fillStyle = lg; x.fillRect(L, 44, RR - L, H);
        x.strokeStyle = "rgba(120,70,20,.25)"; x.lineWidth = 1; for (let i = 1; i < 10; i++) { x.beginPath(); x.moveTo(L + i * 20, 44); x.lineTo(L + i * 20, H); x.stroke(); }
        x.fillStyle = "rgba(120,70,20,.5)"; for (let i = 0; i < 7; i++) { x.beginPath(); x.moveTo(L + 22 + i * 26, 395 + Math.abs(i - 3) * 6); x.lineTo(L + 17 + i * 26, 410 + Math.abs(i - 3) * 6); x.lineTo(L + 27 + i * 26, 410 + Math.abs(i - 3) * 6); x.fill(); }
        if (bumpers) { x.fillStyle = "#3a7bd5"; x.fillRect(L - 6, 44, 6, H); x.fillRect(RR, 44, 6, H); }
        pins.forEach(p => {
          if (p.down) { p.fade = Math.max(0, p.fade - dt * 2); if (p.fade <= 0) return; x.globalAlpha = p.fade; }
          circ(x, p.x + 2, p.y + 3, pr, "rgba(0,0,0,.25)"); circ(x, p.x, p.y, pr, "#fafafa"); x.strokeStyle = "#e33"; x.lineWidth = 2.5; x.beginPath(); x.arc(p.x, p.y, pr - 3, 0, TAU); x.stroke(); circ(x, p.x - 2, p.y - 2, 2.5, "#fff"); x.globalAlpha = 1;
        });
        if (ball && !(ball.gone && state !== "aim" && ball.y < 60)) {
          circ(x, ball.x + 3, ball.y + 4, br, "rgba(0,0,0,.3)"); const bg = x.createRadialGradient(ball.x - 5, ball.y - 5, 2, ball.x, ball.y, br); bg.addColorStop(0, "#7ab0ff"); bg.addColorStop(1, "#16328a"); x.fillStyle = bg; x.beginPath(); x.arc(ball.x, ball.y, br, 0, TAU); x.fill();
          circ(x, ball.x - 3, ball.y - 4, 2.2, "#000"); circ(x, ball.x + 2, ball.y - 5, 2.2, "#000"); circ(x, ball.x, ball.y + 1, 2.2, "#000");
        }
        drawParts(x, parts, dt);
        if (tip && state === "aim") T(x, "Drag the ball, then flick up!", 200, 300, 20, "#fff");
        if (msgT > 0) { x.globalAlpha = Math.min(1, msgT * 2); T(x, msg, 200, 240, 32, "#ffd34e"); x.globalAlpha = 1; }
        x.restore();
      });
    }
  });

  // ---- Dart target practice ----
  B.add({
    id: "s7-darts", name: "Target Throw", ages: [7, 20], cat: "Skill", color: "#e0504a", icon: "T",
    desc: "Hold your breath to steady the wobble, then throw at the target.", controls: "Move to aim, press and hold to steady, let go to throw (Space works too)",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), parts = [], total = 15, wob = g.by(16, 28, 42), BR = g.by(120, 105, 90), RINGS = [[.1, 50], [.3, 25], [.5, 15], [.72, 10], [1, 5]];
      let p = { x: 320, y: 200 }, holding = false, breath = 1, darts = total, flights = [], stuck = [], tm = 0, endT = 0, msg = "", msgT = 0, shake = 0, hint = true;
      const boardAt = () => ({ x: 320 + Math.sin(tm * g.by(0, .6, 1.1)) * g.by(0, 110, 170), y: 195 + Math.sin(tm * g.by(0, .5, .9) + 1) * g.by(0, 0, 40) });
      const aimPos = () => { const A = wob * (holding && breath > 0 ? .2 : 1); return { x: p.x + Math.sin(tm * 1.9) * A + Math.sin(tm * 3.3 + 1) * A * .5, y: p.y + Math.cos(tm * 1.5) * A + Math.sin(tm * 2.7) * A * .5 }; };
      const info = () => g.status("Darts: " + darts);
      const down = () => { if (darts > 0 && !flights.length) holding = true; };
      const release = () => {
        if (!holding) return; holding = false; if (darts <= 0 || flights.length) return; const a = aimPos(); darts--; hint = false; flights.push({ x: a.x, y: a.y, t: 0 }); g.sfx("swish"); info();
      };
      g.on(c, "pointerdown", e => { p = pos(e); down(); });
      g.on(c, "pointermove", e => { p = pos(e); });
      g.on(window, "pointerup", release);
      g.on(window, "keydown", e => { if (e.code === "Space" && !e.repeat) down(); });
      g.on(window, "keyup", e => { if (e.code === "Space") release(); });
      info();
      g.loop(dt => {
        tm += dt; msgT -= dt; shake = Math.max(0, shake - dt * 30);
        if (g.keys.ArrowLeft) p.x -= 200 * dt; if (g.keys.ArrowRight) p.x += 200 * dt; if (g.keys.ArrowUp) p.y -= 200 * dt; if (g.keys.ArrowDown) p.y += 200 * dt; p.x = g.clamp(p.x, 20, W - 20); p.y = g.clamp(p.y, 20, H - 20);
        if (holding && breath > 0) breath = Math.max(0, breath - dt * .8); else if (!holding) breath = Math.min(1, breath + dt * .5);
        const bd = boardAt();
        for (let i = flights.length - 1; i >= 0; i--) {
          const f = flights[i]; f.t += dt;
          if (f.t >= .18) {
            flights.splice(i, 1); const rx = f.x - bd.x, ry = f.y - bd.y, d = Math.hypot(rx, ry) / BR; let pts = 0; for (const r of RINGS) if (d <= r[0]) { pts = r[1]; break; }
            if (pts) { stuck.push({ rx, ry, abs: false }); g.add(pts); msg = pts === 50 ? "BULLSEYE! +50" : "+" + pts; msgT = 1; g.sfx(pts >= 25 ? "cheer" : "pop"); popAt(g, c, W, H, "+" + pts, f.x, f.y, pts >= 25 ? "#ffd34e" : "#fff"); burst(parts, f.x, f.y, pts >= 25 ? "#ffd34e" : "#fff", pts === 50 ? 26 : 8, 150); shake = pts === 50 ? 7 : 3; }
            else { stuck.push({ rx: f.x, ry: f.y, abs: true }); msg = "Missed the board"; msgT = .9; g.sfx("wrong"); }
          }
        }
        if (darts === 0 && !flights.length) { endT += dt; if (endT > 1) { g.over("All darts thrown!"); return false; } }
        // draw
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .3, g.rf(-shake, shake) * .3);
        x.fillStyle = vgrad(x, 0, H, "#3a2a22", "#5a3d2e"); x.fillRect(0, 0, W, H);
        x.fillStyle = "rgba(255,255,255,.04)"; for (let i = 0; i < 16; i++) x.fillRect(i * 44, 0, 20, H);
        circ(x, bd.x, bd.y, BR + 14, "#2a2a2e"); circ(x, bd.x + 4, bd.y + 6, BR + 14, "rgba(0,0,0,.2)"); circ(x, bd.x, bd.y, BR + 14, "#2a2a2e");
        const cols = ["#e8423a", "#f4f0e0", "#e8423a", "#2a2a2e", "#f4f0e0"].slice(0), ringC = ["#f4f0e0", "#2a2a2e", "#f4f0e0", "#2a2a2e", "#f4f0e0"];
        for (let i = RINGS.length - 1; i >= 0; i--) circ(x, bd.x, bd.y, BR * RINGS[i][0], i === 0 ? "#e8423a" : i === 1 ? "#3a9a4a" : (i % 2 ? "#2a2a2e" : "#f4f0e0")); cols.length = 0; ringC.length = 0;
        circ(x, bd.x, bd.y, BR * .3, "#3a9a4a"); circ(x, bd.x, bd.y, BR * .1, "#e8423a");
        x.strokeStyle = "rgba(255,255,255,.25)"; x.lineWidth = 1; RINGS.forEach(r => { x.beginPath(); x.arc(bd.x, bd.y, BR * r[0], 0, TAU); x.stroke(); });
        stuck.forEach(s => { const px = s.abs ? s.rx : bd.x + s.rx, py = s.abs ? s.ry : bd.y + s.ry; x.strokeStyle = "#444"; x.lineWidth = 3; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 18, py - 24); x.stroke(); x.fillStyle = "#4cc3ff"; x.beginPath(); x.moveTo(px - 18, py - 24); x.lineTo(px - 30, py - 26); x.lineTo(px - 22, py - 36); x.lineTo(px - 14, py - 38); x.closePath(); x.fill(); circ(x, px, py, 2, "#aaa"); });
        flights.forEach(f => { const k = f.t / .18, s = 2.2 - 1.2 * k; x.save(); x.translate(f.x, f.y); x.scale(s, s); x.strokeStyle = "#444"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-18, -24); x.stroke(); x.fillStyle = "#4cc3ff"; x.beginPath(); x.moveTo(-18, -24); x.lineTo(-30, -26); x.lineTo(-22, -36); x.lineTo(-14, -38); x.closePath(); x.fill(); x.restore(); });
        if (darts > 0 || flights.length) { const a = aimPos(); x.strokeStyle = holding ? "#6be28f" : "#fff"; x.lineWidth = 2; x.beginPath(); x.arc(a.x, a.y, 12, 0, TAU); x.moveTo(a.x - 20, a.y); x.lineTo(a.x + 20, a.y); x.moveTo(a.x, a.y - 20); x.lineTo(a.x, a.y + 20); x.stroke(); }
        x.fillStyle = "rgba(0,0,0,.4)"; x.fillRect(20, 378, 130, 10); x.fillStyle = breath > .25 ? "#6be28f" : "#ff8a2a"; x.fillRect(20, 378, 130 * breath, 10); T(x, "Breath", 60, 364, 13, "#fff");
        drawParts(x, parts, dt);
        if (msgT > 0) T(x, msg, 320, 40, 28, "#ffd34e");
        if (hint) T(x, "Move to aim. Hold to steady, let go to throw", 320, 385, 17, "#fff");
        x.restore();
      });
    }
  });

  // ---- Fishing ----
  B.add({
    id: "s7-fishing", name: "Lake Fishing", ages: [6, 20], cat: "Skill", color: "#2fa8c9", icon: "F",
    desc: "Cast, hook the fish when it bites, then keep it in the green zone.", controls: "Tap or Space to cast and hook. Hold to lift the green zone, let go to drop it",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 400), parts = [];
      const FISH = [{ n: "Minnow", pts: 1, spd: 120, col: "#9fd8ff" }, { n: "Trout", pts: 3, spd: 180, col: "#e8a08a" }, { n: "Bass", pts: 5, spd: 250, col: "#8ad06a" }, { n: "Golden Carp", pts: 10, spd: 330, col: "#ffd34e" }];
      const zh = g.by(100, 78, 62), BAR = 300, WY = 150;
      let state = "idle", timer = 0, tm = 0, remain = 80, caught = 0, hold = false, fish = null, fy = 0, ft = 0, fcd = 0, zy = 0, zv = 0, prog = .3, msg = "", msgT = 0, bite = 0, biteWin = 0, shake = 0, swim = [];
      for (let i = 0; i < 7; i++) swim.push({ x: g.rf(0, 640), y: g.rf(210, 380), s: g.rf(20, 50) * (g.rand() < .5 ? -1 : 1), z: g.rf(.6, 1.2) });
      const info = () => g.status("Time: " + Math.ceil(remain) + "  Fish: " + caught);
      const say = (s, col) => { msg = s; msgT = 1.3; };
      const press = () => {
        if (state === "idle") { state = "wait"; timer = g.rf(1.4, 3.6); g.sfx("swish"); }
        else if (state === "wait") { state = "idle"; say("Too early!"); g.sfx("wrong"); }
        else if (state === "bite") {
          const lim = Math.min(3, Math.floor(caught / 2)); fish = FISH[g.ri(0, lim)]; state = "reel"; zy = BAR - zh; zv = 0; fy = g.rf(0, BAR - 20); ft = fy; fcd = 0; prog = .3; g.sfx("click"); g.sfx("splash");
        }
      };
      g.on(c, "pointerdown", () => { hold = true; press(); });
      g.on(window, "pointerup", () => { hold = false; });
      g.on(window, "keydown", e => { if (e.code === "Space" && !e.repeat) { hold = true; press(); } });
      g.on(window, "keyup", e => { if (e.code === "Space") hold = false; });
      info();
      g.loop(dt => {
        tm += dt; msgT -= dt; shake = Math.max(0, shake - dt * 30); remain -= dt; info();
        if (remain <= 0) { g.over("Time's up! You caught " + caught + " fish."); return false; }
        if (state === "wait") { timer -= dt; if (timer <= 0) { state = "bite"; biteWin = g.by(1.3, .95, .7) * Math.max(.55, 1 - caught * .02); bite = biteWin; g.sfx("tick"); } }
        else if (state === "bite") { bite -= dt; if (bite <= 0) { state = "idle"; say("It got away!"); g.sfx("wrong"); } }
        else if (state === "reel") {
          zv += (hold ? -1000 : 750) * dt; zy += zv * dt; if (zy < 0) { zy = 0; zv = Math.abs(zv) * .25; } if (zy > BAR - zh) { zy = BAR - zh; zv = -Math.abs(zv) * .25; }
          fcd -= dt; if (fcd <= 0) { ft = g.rf(0, BAR - 24); fcd = g.rf(.5, 1.1); }
          const mv = fish.spd * dt; fy += g.clamp(ft - fy, -mv, mv);
          const inside = fy + 12 > zy && fy + 12 < zy + zh; prog += (inside ? .3 / g.by(1.3, 1, .85) : -.2 * g.by(.8, 1, 1.25)) * dt;
          if (prog >= 1) { caught++; const pts = fish.pts; g.add(pts); say(fish.n + "! +" + pts); g.sfx(pts >= 5 ? "cheer" : "star"); burst(parts, 330, WY + 20, fish.col, 20, 220); popAt(g, c, W, H, "+" + pts, 330, 130, "#ffd34e"); state = "idle"; shake = 4; }
          else if (prog <= 0) { state = "idle"; say("It got away!"); g.sfx("wrong"); }
        }
        // draw
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .3, g.rf(-shake, shake) * .3);
        x.fillStyle = vgrad(x, 0, WY, "#ffb88a", "#fff1c8"); x.fillRect(0, 0, W, WY);
        circ(x, 520, 90, 38, "#ffe27a"); x.fillStyle = "#5a8f5a"; x.beginPath(); x.moveTo(200, WY); x.quadraticCurveTo(330, 70, 470, WY); x.fill(); x.fillStyle = "#4a7a4a"; x.beginPath(); x.moveTo(380, WY); x.quadraticCurveTo(520, 60, 700, WY); x.fill();
        x.fillStyle = vgrad(x, WY, H, "#3fb6d9", "#0b3d6b"); x.fillRect(0, WY, W, H - WY);
        x.strokeStyle = "rgba(255,255,255,.3)"; x.lineWidth = 2; for (let i = 0; i < 8; i++) { x.beginPath(); x.moveTo(i * 90 - 20, WY + 6 + (i % 3) * 3); x.quadraticCurveTo(i * 90 + 10, WY + 1 + Math.sin(tm * 2 + i) * 3, i * 90 + 40, WY + 6); x.stroke(); }
        swim.forEach(s => { s.x += s.s * dt; if (s.x > 700) s.x = -60; if (s.x < -60) s.x = 700; x.fillStyle = "rgba(10,40,70,.35)"; x.beginPath(); x.ellipse(s.x, s.y, 16 * s.z, 7 * s.z, 0, 0, TAU); x.fill(); const d = s.s > 0 ? -1 : 1; x.beginPath(); x.moveTo(s.x + d * 14 * s.z, s.y); x.lineTo(s.x + d * 26 * s.z, s.y - 7 * s.z); x.lineTo(s.x + d * 26 * s.z, s.y + 7 * s.z); x.fill(); });
        x.fillStyle = "#8a5a2a"; x.fillRect(0, WY - 22, 150, 16); x.fillStyle = "#6a421c"; x.fillRect(10, WY - 6, 10, 70); x.fillRect(120, WY - 6, 10, 70);
        const bobX = 330, bobY = WY + (state === "bite" ? 6 + Math.sin(tm * 30) * 6 : state === "wait" ? Math.sin(tm * 3) * 2 : -20), hookY = state === "idle" ? WY - 30 : 280;
        x.strokeStyle = "#7a4a1a"; x.lineWidth = 5; x.lineCap = "round"; x.beginPath(); x.moveTo(100, WY - 26); x.lineTo(200, WY - 100); x.stroke(); x.lineCap = "butt";
        if (state !== "idle") { x.strokeStyle = "rgba(255,255,255,.8)"; x.lineWidth = 1.5; x.beginPath(); x.moveTo(200, WY - 100); x.quadraticCurveTo(270, WY - 70, bobX, bobY); x.lineTo(bobX, state === "reel" ? WY + 30 + fy * .2 : hookY); x.stroke(); circ(x, bobX, bobY, 7, "#ff4d4d"); circ(x, bobX, bobY - 3, 4, "#fff"); }
        if (state === "bite") { T(x, "!", bobX, WY - 40, 54, "#ffd34e"); x.fillStyle = "rgba(0,0,0,.3)"; x.fillRect(260, 250, 140, 8); x.fillStyle = "#ffd34e"; x.fillRect(260, 250, 140 * Math.max(0, bite / biteWin), 8); }
        if (state === "reel") {
          x.fillStyle = "rgba(0,0,0,.45)"; x.beginPath(); x.roundRect(530, 50, 70, BAR + 20, 10); x.fill(); const by0 = 60;
          x.fillStyle = "#1b2a3a"; x.fillRect(540, by0, 30, BAR); x.fillStyle = "rgba(107,226,143,.85)"; x.fillRect(540, by0 + zy, 30, zh); x.strokeStyle = "#fff"; x.lineWidth = 2; x.strokeRect(540, by0 + zy, 30, zh);
          x.fillStyle = fish.col; x.beginPath(); x.ellipse(555, by0 + fy + 12, 13, 8, 0, 0, TAU); x.fill(); x.beginPath(); x.moveTo(568, by0 + fy + 12); x.lineTo(578, by0 + fy + 5); x.lineTo(578, by0 + fy + 19); x.fill();
          x.fillStyle = "#1b2a3a"; x.fillRect(582, by0, 12, BAR); x.fillStyle = prog > .5 ? "#6be28f" : "#ff8a2a"; x.fillRect(582, by0 + BAR * (1 - prog), 12, BAR * prog);
          T(x, fish.n, 560, 40, 14, "#fff");
        }
        drawParts(x, parts, dt);
        if (state === "idle" && msgT <= 0) T(x, caught === 0 ? "Tap to cast your line" : "Tap to cast again", 320, 360, 24, "#fff");
        if (state === "wait") T(x, "Wait for a bite...", 320, 360, 22, "#fff");
        if (msgT > 0) T(x, msg, 320, 230, 30, "#ffd34e");
        x.restore();
      });
    }
  });

  // ---- Stop the bar ----
  B.add({
    id: "s7-stopbar", name: "Perfect Stop", ages: [6, 20], cat: "Skill", color: "#a855f7", icon: "|",
    desc: "Stop the glowing marker inside the zone. It gets faster and tinier!", controls: "Tap, click or press Space to stop the marker",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 400), parts = [], X0 = 60, X1 = 580;
      let lives = 3, level = 1, m = 0, dir = 1, spd = g.by(.7, .9, 1.15), zw = g.by(.22, .16, .11), zc = .5, zd = 0, zdir = 1, mode = "run", timer = 0, tm = 0, combo = 0, msg = "", shake = 0, flash = 0, hitM = 0, trail = [];
      const info = () => g.status("Lives: " + lives + "  Level " + level + "  Combo " + combo);
      const newZone = () => { zc = g.rf(zw / 2 + .08, 1 - zw / 2 - .08); zd = level >= 4 ? g.by(0, .06, .12) * Math.min(2, 1 + (level - 4) * .1) : 0; zdir = g.rand() < .5 ? -1 : 1; };
      const stop = () => {
        if (mode !== "run") return; hitM = m; const err = Math.abs(m - zc);
        if (err <= zw / 2) {
          combo++; const acc = 1 - err / (zw / 2), perfect = err < zw * .08, pts = Math.round((10 + 90 * acc) * Math.min(combo, 5)); g.add(pts);
          msg = perfect ? "PERFECT! +" + pts : "Nice! +" + pts; g.sfx(perfect ? "cheer" : "star"); g.sfx("note", 440 + Math.min(combo, 8) * 60); burst(parts, X0 + (X1 - X0) * m, 200, perfect ? "#ffd34e" : "#6be28f", perfect ? 30 : 14, 220); popAt(g, c, W, H, "+" + pts, X0 + (X1 - X0) * m, 170, "#ffd34e"); flash = 1;
          level++; spd *= 1.07; zw = Math.max(.035, zw * .93); mode = "hit"; timer = .7;
        } else { combo = 0; lives--; msg = err < zw ? "So close!" : "Missed!"; g.sfx("wrong"); shake = 8; mode = "miss"; timer = .8; }
        info();
      };
      g.on(c, "pointerdown", stop);
      g.on(window, "keydown", e => { if (e.code === "Space" && !e.repeat) stop(); });
      info(); newZone();
      g.loop(dt => {
        tm += dt; shake = Math.max(0, shake - dt * 30); flash = Math.max(0, flash - dt * 2);
        if (mode === "run") {
          const mult = g.diff === 2 && level > 3 ? 1 + .45 * Math.sin(tm * 2.7) : 1; m += dir * spd * mult * dt; if (m > 1) { m = 1; dir = -1; } if (m < 0) { m = 0; dir = 1; }
          if (zd) { zc += zdir * zd * dt; if (zc > 1 - zw / 2 - .05) zdir = -1; if (zc < zw / 2 + .05) zdir = 1; }
          trail.push(m); if (trail.length > 10) trail.shift();
        } else {
          timer -= dt;
          if (timer <= 0) { if (lives <= 0) { g.over("Out of lives at level " + level + "!"); return false; } info(); mode = "run"; msg = ""; newZone(); trail = []; }
        }
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .4, g.rf(-shake, shake) * .4);
        x.fillStyle = vgrad(x, 0, H, "#1a0b3d", "#3a1a7a"); x.fillRect(0, 0, W, H);
        x.strokeStyle = "rgba(255,255,255,.06)"; x.lineWidth = 1; for (let i = 0; i < 16; i++) { x.beginPath(); x.moveTo(i * 44, 0); x.lineTo(i * 44, H); x.stroke(); }
        if (flash > 0) { x.fillStyle = "rgba(255,255,255," + flash * .18 + ")"; x.fillRect(0, 0, W, H); }
        x.fillStyle = "#0e0724"; x.beginPath(); x.roundRect(X0 - 12, 160, X1 - X0 + 24, 80, 16); x.fill(); x.strokeStyle = "#7a52d4"; x.lineWidth = 3; x.stroke();
        for (let i = 0; i <= 20; i++) { const tx = X0 + (X1 - X0) * i / 20; x.strokeStyle = "rgba(255,255,255,.18)"; x.lineWidth = 1; x.beginPath(); x.moveTo(tx, 240); x.lineTo(tx, 240 - (i % 5 ? 8 : 14)); x.stroke(); }
        const zx0 = X0 + (X1 - X0) * (zc - zw / 2), zwp = (X1 - X0) * zw; x.shadowColor = "#6be28f"; x.shadowBlur = 18; x.fillStyle = "#2fbf5a"; x.fillRect(zx0, 168, zwp, 64); x.shadowBlur = 0;
        x.fillStyle = "#ffd34e"; x.fillRect(X0 + (X1 - X0) * zc - 2, 168, 4, 64);
        const mm = mode === "run" ? m : hitM; trail.forEach((tm2, i) => { x.fillStyle = "rgba(255,255,255," + i / 25 + ")"; x.fillRect(X0 + (X1 - X0) * tm2 - 3, 170, 6, 60); });
        const mx = X0 + (X1 - X0) * mm; x.shadowColor = "#fff"; x.shadowBlur = 16; x.fillStyle = "#fff"; x.beginPath(); x.roundRect(mx - 5, 150, 10, 100, 5); x.fill(); x.shadowBlur = 0;
        x.fillStyle = "#fff"; x.beginPath(); x.moveTo(mx, 148); x.lineTo(mx - 9, 132); x.lineTo(mx + 9, 132); x.fill();
        drawParts(x, parts, dt);
        T(x, mode === "run" ? "STOP IT IN THE GREEN!" : msg, 320, 90, mode === "run" ? 22 : 32, mode === "miss" ? "#ff6f6f" : "#ffd34e");
        T(x, "Level " + level, 320, 300, 22, "#cdb8ff"); if (combo > 1) T(x, "Combo x" + Math.min(combo, 5), 320, 335, 20, "#ffd34e");
        if (level === 1 && mode === "run") T(x, "Tap, click or Space", 320, 370, 18, "#fff");
        x.restore();
      });
    }
  });

  // ---- Rhythm tap ----
  B.add({
    id: "s7-rhythm", name: "Beat Drop", ages: [8, 20], cat: "Skill", color: "#ff4d9a", icon: "M",
    desc: "Tap the falling notes as they hit the line and make the tune.", controls: "Tap the lanes, or press D F J K (or the arrow keys)",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(400, 600), parts = [], bpm = g.by(96, 112, 126), spb = 60 / bpm, HIT = 505, SPEED = g.by(280, 330, 380), LW = W / 4;
      const PATS = [[0, -1, 2, -1, 1, -1, 3, -1], [0, -1, 0, 2, -1, 1, -1, 3], [1, -1, 2, -1, 3, -1, 2, 0], [3, 2, 1, 0, -1, -1, 1, -1], [0, 3, -1, 0, 3, -1, 1, 2], [2, -1, 2, 1, -1, 1, 0, -1]];
      const ORDER = [0, 0, 1, 2, 0, 1, 2, 3, 4, 4, 5, 3, 0, 4, 5, 2, 1, 4, 3, 0, 5, 5, 2, 3];
      const COLS = ["#ff4d6d", "#ffd34e", "#4cc3ff", "#6be28f"], PITCH = [262, 330, 392, 523], bars = g.by(16, 18, 20), notes = [], glow = [0, 0, 0, 0], fl = [];
      for (let b = 0; b < bars; b++) {
        const p = PATS[ORDER[b % ORDER.length]];
        for (let s = 0; s < 8; s++) {
          let l = p[s];
          if (g.diff === 0 && s % 2 === 1) continue;
          if (l < 0) { if (g.diff === 2 && b % 2 === 1 && s % 2 === 1 && p[(s + 7) % 8] >= 0) l = (p[(s + 7) % 8] + 2) % 4; else continue; }
          notes.push({ t: b * 4 * spb + s * .5 * spb, lane: l, done: false });
        }
      }
      const endT = notes[notes.length - 1].t + 1.2;
      let songT = -2.2, health = 100, combo = 0, bestCombo = 0, lastBeat = -1, shake = 0;
      const info = () => g.status("Health " + Math.max(0, Math.round(health)) + "  Combo " + combo);
      const say = (s, lane, col) => fl.push({ s, x: lane * LW + LW / 2, y: HIT - 50, life: .6, col });
      const press = l => {
        glow[l] = 1; let best = null, bd = .16;
        for (const n of notes) { if (n.done || n.lane !== l) continue; const d = Math.abs(n.t - songT); if (d < bd) { bd = d; best = n; } }
        if (!best) return; best.done = true; const perfect = bd < .065; combo++; bestCombo = Math.max(bestCombo, combo);
        const pts = Math.round((perfect ? 100 : 50) * (1 + Math.min(Math.floor(combo / 8), 3) * .5)); g.add(pts); health = Math.min(100, health + (perfect ? 2 : 1));
        say(perfect ? "Perfect" : "Good", l, perfect ? "#ffd34e" : "#fff"); g.sfx("note", PITCH[l]); burst(parts, l * LW + LW / 2, HIT, COLS[l], perfect ? 14 : 7, 150); shake = perfect ? 2 : 0; info();
      };
      const KEYS = { d: 0, f: 1, j: 2, k: 3, arrowleft: 0, arrowdown: 1, arrowup: 2, arrowright: 3 };
      g.on(window, "keydown", e => { if (e.repeat) return; const l = KEYS[String(e.key).toLowerCase()]; if (l !== undefined) press(l); });
      g.on(c, "pointerdown", e => { const p = pos(e); press(g.clamp(Math.floor(p.x / LW), 0, 3)); });
      info();
      g.loop(dt => {
        songT += dt; shake = Math.max(0, shake - dt * 10);
        if (songT >= 0) { const bi = Math.floor(songT / spb); if (bi > lastBeat) { lastBeat = bi; if (bi % 4 === 0) g.sfx("thump"); else if (bi % 2 === 0) g.sfx("tick"); } }
        for (const n of notes) if (!n.done && songT - n.t > .16) { n.done = true; combo = 0; health -= g.by(6, 8, 10); say("Miss", n.lane, "#ff6f6f"); g.sfx("wrong"); info(); }
        if (health <= 0) { g.over("Ran out of energy!"); return false; }
        if (songT > endT) { g.win("Song complete! Best combo " + bestCombo); return false; }
        x.save(); if (shake > 0) x.translate(0, g.rf(-shake, shake));
        x.fillStyle = vgrad(x, 0, H, "#150a2e", "#3a0f5a"); x.fillRect(0, 0, W, H);
        for (let l = 0; l < 4; l++) { glow[l] = Math.max(0, glow[l] - dt * 4); x.fillStyle = "rgba(255,255,255," + (l % 2 ? .03 : .06) + ")"; x.fillRect(l * LW, 0, LW, H); if (glow[l] > 0) { x.fillStyle = COLS[l] + Math.floor(glow[l] * 90).toString(16).padStart(2, "0"); x.fillRect(l * LW, 0, LW, H); } }
        const pulse = (songT >= 0 ? 1 - ((songT / spb) % 1) : 0); x.strokeStyle = "rgba(255,255,255," + (.15 + pulse * .25) + ")"; x.lineWidth = 3 + pulse * 3; x.beginPath(); x.moveTo(0, HIT); x.lineTo(W, HIT); x.stroke();
        for (let l = 0; l < 4; l++) { x.strokeStyle = COLS[l]; x.lineWidth = 3; x.beginPath(); x.arc(l * LW + LW / 2, HIT, 26, 0, TAU); x.stroke(); T(x, ["D", "F", "J", "K"][l], l * LW + LW / 2, HIT + 55, 18, COLS[l]); }
        for (const n of notes) {
          if (n.done) continue; const y = HIT - (n.t - songT) * SPEED; if (y < -30 || y > H + 30) continue; const cx = n.lane * LW + LW / 2;
          x.fillStyle = COLS[n.lane]; x.shadowColor = COLS[n.lane]; x.shadowBlur = 12; x.beginPath(); x.roundRect(cx - 34, y - 12, 68, 24, 10); x.fill(); x.shadowBlur = 0; x.fillStyle = "rgba(255,255,255,.55)"; x.fillRect(cx - 28, y - 8, 56, 5);
        }
        for (let i = fl.length - 1; i >= 0; i--) { const f = fl[i]; f.life -= dt; if (f.life <= 0) { fl.splice(i, 1); continue; } x.globalAlpha = Math.min(1, f.life * 3); T(x, f.s, f.x, f.y - (.6 - f.life) * 30, 18, f.col); x.globalAlpha = 1; }
        drawParts(x, parts, dt);
        x.fillStyle = "rgba(0,0,0,.4)"; x.fillRect(10, 10, 120, 10); x.fillStyle = health > 35 ? "#6be28f" : "#ff6f6f"; x.fillRect(10, 10, 120 * Math.max(0, health) / 100, 10);
        if (combo >= 4) T(x, combo + " combo", 200, 90, 30, "#ffd34e");
        if (songT < -.3) T(x, "Get ready!", 200, 250, 30, "#fff");
        x.restore();
      });
    }
  });

  // ---- Aim trainer ----
  B.add({
    id: "s7-aim", name: "Aim Trainer", ages: [8, 20], cat: "Skill", color: "#2bd9c6", icon: "+",
    desc: "Pop the targets fast before their ring runs out. Skip the red ones!", controls: "Click or tap the targets",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), parts = [], ts = [];
      let lives = 5, hits = 0, shots = 0, spawnT = .5, combo = 0, tm = 0, cur = { x: 320, y: 200 }, shake = 0;
      const decoyP = g.by(0, .12, .2), drift = g.by(0, 30, 70);
      const acc = () => shots ? Math.round(hits / shots * 100) : 100;
      const info = () => g.status("Lives: " + lives + "  Accuracy: " + acc() + "%");
      c.style.cursor = "crosshair";
      const spawn = () => {
        const r = Math.max(15, g.by(36, 30, 26) - hits * .25), decoy = g.rand() < decoyP, life = Math.max(.7, g.by(2.4, 1.8, 1.3) - hits * .012);
        ts.push({ x: g.rf(r + 10, W - r - 10), y: g.rf(r + 10, H - r - 10), r, life, max: life, decoy, vx: drift ? g.rf(-drift, drift) : 0, vy: drift ? g.rf(-drift, drift) : 0, born: 0 });
      };
      g.on(c, "pointermove", e => { cur = pos(e); });
      g.on(c, "pointerdown", e => {
        const p = pos(e); cur = p; let found = -1, bestD = 1e9;
        for (let i = 0; i < ts.length; i++) { const t = ts[i], d = Math.hypot(t.x - p.x, t.y - p.y); if (d < t.r + 4 && d < bestD) { found = i; bestD = d; } }
        if (found < 0) { shots++; combo = 0; g.sfx("tick"); info(); return; }
        const t = ts[found]; ts.splice(found, 1); shots++;
        if (t.decoy) { lives--; combo = 0; g.sfx("wrong"); shake = 8; popAt(g, c, W, H, "Oops!", t.x, t.y, "#ff6f6f"); burst(parts, t.x, t.y, "#ff4d4d", 14, 160); info(); if (lives <= 0) { g.over("Hit too many red ones!"); } return; }
        hits++; combo++; const pts = Math.round((5 + 10 * t.life / t.max) * (1 + Math.min(combo, 10) * .1)); g.add(pts); g.sfx("pop"); g.sfx("note", 400 + Math.min(combo, 10) * 40);
        popAt(g, c, W, H, "+" + pts, t.x, t.y, "#ffd34e"); burst(parts, t.x, t.y, "#2bd9c6", 14, 190); info();
      });
      info();
      g.loop(dt => {
        tm += dt; shake = Math.max(0, shake - dt * 30); spawnT -= dt;
        if (spawnT <= 0) { spawn(); spawnT = Math.max(.32, g.by(.95, .7, .5) - hits * .01) * g.rf(.7, 1.2); }
        for (let i = ts.length - 1; i >= 0; i--) {
          const t = ts[i]; t.life -= dt; t.born += dt; t.x += t.vx * dt; t.y += t.vy * dt; if (t.x < t.r || t.x > W - t.r) t.vx *= -1; if (t.y < t.r || t.y > H - t.r) t.vy *= -1;
          if (t.life <= 0) { ts.splice(i, 1); if (!t.decoy) { lives--; combo = 0; g.sfx("wrong"); shake = 5; info(); if (lives <= 0) { g.over("Too many got away!"); return false; } } }
        }
        if (!g.alive()) return false;
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .3, g.rf(-shake, shake) * .3);
        x.fillStyle = vgrad(x, 0, H, "#0b1730", "#14305a"); x.fillRect(0, 0, W, H);
        x.strokeStyle = "rgba(255,255,255,.05)"; x.lineWidth = 1; for (let i = 0; i < 17; i++) { x.beginPath(); x.moveTo(i * 40, 0); x.lineTo(i * 40, H); x.stroke(); } for (let i = 0; i < 11; i++) { x.beginPath(); x.moveTo(0, i * 40); x.lineTo(W, i * 40); x.stroke(); }
        ts.forEach(t => {
          const grow = Math.min(1, t.born / .15), r = t.r * grow, col = t.decoy ? "#ff4d4d" : "#2bd9c6";
          circ(x, t.x, t.y, r + 4, "rgba(0,0,0,.25)"); circ(x, t.x, t.y, r, t.decoy ? "#7a1a1a" : "#e8fffc"); circ(x, t.x, t.y, r * .66, col); circ(x, t.x, t.y, r * .33, t.decoy ? "#fff" : "#ff4d6d");
          x.strokeStyle = t.decoy ? "#ffb3b3" : "#ffd34e"; x.lineWidth = 4; x.beginPath(); x.arc(t.x, t.y, r + 8, -Math.PI / 2, -Math.PI / 2 + TAU * Math.max(0, t.life / t.max)); x.stroke();
        });
        drawParts(x, parts, dt);
        x.strokeStyle = "#fff"; x.lineWidth = 2; x.beginPath(); x.arc(cur.x, cur.y, 10, 0, TAU); x.moveTo(cur.x - 16, cur.y); x.lineTo(cur.x + 16, cur.y); x.moveTo(cur.x, cur.y - 16); x.lineTo(cur.x, cur.y + 16); x.stroke();
        if (combo >= 3) T(x, "Combo x" + combo, 320, 24, 20, "#ffd34e");
        if (hits === 0 && shots === 0) T(x, "Click the targets. Avoid the red ones!", 320, 380, 18, "#fff");
        x.restore();
      });
    }
  });

  // ---- Penalty kick ----
  B.add({
    id: "s7-penalty", name: "Penalty Kick", ages: [7, 20], cat: "Sports", color: "#38b256", icon: "P",
    desc: "Aim at the goal, time your power and beat the keeper.", controls: "Press where you want to shoot, hold to charge, let go to kick",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), parts = [], GL = 150, GRT = 490, BAR = 100, GND = 255, home = { x: 320, y: 215 }, total = 8, reach = g.by(36, 44, 52);
      let kick = 0, state = "aim", aim = { x: 320, y: 170 }, chargeT = 0, pw = 0, f = 0, ft = 1, tgt = null, kdive = null, react = .1, kt = 0, res = "", resT = 0, goals = 0, tm = 0, shake = 0, saved = false, hint = true;
      const info = () => g.status("Kick " + Math.min(kick + 1, total) + "/" + total + "  Goals " + goals);
      const clampAim = p => ({ x: g.clamp(p.x, 100, 540), y: g.clamp(p.y, 60, 275) });
      const keeperPos = () => { if (!kdive) return home; const k = g.clamp((kt - react) / g.by(.5, .42, .36), 0, 1), e = 1 - (1 - k) * (1 - k); return { x: home.x + (kdive.x - home.x) * e, y: home.y + (kdive.y - home.y) * e }; };
      g.on(c, "pointerdown", e => { if (state !== "aim") return; aim = clampAim(pos(e)); state = "charge"; chargeT = 0; hint = false; });
      g.on(c, "pointermove", e => { if (state === "charge" || state === "aim") aim = clampAim(pos(e)); });
      const shoot = () => {
        if (state !== "charge") return; state = "fly"; f = 0; kt = 0; ft = 0.8 - .42 * pw; tgt = { x: aim.x, y: aim.y }; if (pw > .93) tgt.y -= 130;
        const readP = g.by(.2, .35, .5) + kick * .03;
        kdive = g.rand() < readP ? { x: aim.x + g.rf(-35, 35), y: aim.y + g.rf(-20, 20) } : { x: g.pick([200, 320, 440]) + g.rf(-30, 30), y: g.pick([160, 215, 240]) }; kdive.x = g.clamp(kdive.x, GL + 10, GRT - 10); kdive.y = g.clamp(kdive.y, BAR + 30, GND - 5);
        react = g.rf(.05, .15); g.sfx("thump"); saved = false;
      };
      g.on(window, "pointerup", shoot);
      g.on(window, "keydown", e => { if (e.code === "Space" && !e.repeat) { if (state === "aim") { state = "charge"; chargeT = 0; hint = false; } } if (e.code === "Space" && false) shoot(); });
      g.on(window, "keyup", e => { if (e.code === "Space") shoot(); });
      info();
      g.loop(dt => {
        tm += dt; resT -= dt; shake = Math.max(0, shake - dt * 30);
        if (state === "charge") { chargeT += dt; pw = (1 - Math.cos(chargeT * 4)) / 2; if (g.keys.ArrowLeft) aim.x -= 140 * dt; if (g.keys.ArrowRight) aim.x += 140 * dt; if (g.keys.ArrowUp) aim.y -= 140 * dt; if (g.keys.ArrowDown) aim.y += 140 * dt; aim = clampAim(aim); }
        if (state === "fly") {
          kt += dt; f = Math.min(1, kt / ft);
          if (f >= 1) {
            const kp = keeperPos(), d = Math.hypot(kp.x - tgt.x, kp.y - tgt.y), inGoal = tgt.x > GL + 6 && tgt.x < GRT - 6 && tgt.y > BAR + 6 && tgt.y < GND;
            if (tgt.y < BAR - 6 && tgt.x > GL - 20 && tgt.x < GRT + 20) { res = "Over the bar!"; g.sfx("wrong"); }
            else if (!inGoal && (Math.abs(tgt.x - GL) < 14 || Math.abs(tgt.x - GRT) < 14 || Math.abs(tgt.y - BAR) < 14)) { res = "Off the post!"; g.sfx("clink"); shake = 8; }
            else if (!inGoal) { res = "Wide!"; g.sfx("wrong"); }
            else if (d < reach) { res = "Saved!"; saved = true; g.sfx("thump"); shake = 5; }
            else { const bonus = (tgt.x < GL + 45 || tgt.x > GRT - 45) && tgt.y < 190 ? 5 : 0, pts = 10 + bonus + (pw > .6 ? 3 : 0); res = "GOAL! +" + pts; goals++; g.add(pts); g.sfx("cheer"); burst(parts, tgt.x, tgt.y, "#fff", 26, 240); popAt(g, c, W, H, "+" + pts, tgt.x, tgt.y, "#ffd34e"); shake = 6; }
            resT = 1.3; state = "result"; kick++; info();
          }
        } else if (state === "result") {
          kt += dt; if (resT <= 0) { if (kick >= total) { g.over(goals + " goals from " + total + " kicks"); return false; } state = "aim"; kdive = null; kt = 0; f = 0; info(); }
        }
        // draw
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .3, g.rf(-shake, shake) * .3);
        x.fillStyle = vgrad(x, 0, 120, "#6ac4ff", "#c8ecff"); x.fillRect(0, 0, W, 130);
        x.fillStyle = "rgba(255,255,255,.35)"; for (let i = 0; i < 30; i++) circ(x, 10 + i * 22, 125 + (i % 3) * 3, 9, "rgba(40,60,100,.35)");
        x.fillStyle = vgrad(x, 130, H, "#3aa84a", "#1f7a33"); x.fillRect(0, 130, W, H - 130);
        for (let i = 0; i < 8; i++) { x.fillStyle = "rgba(255,255,255,.05)"; x.fillRect(0, 130 + i * 40, W, 20); }
        x.fillStyle = "rgba(20,40,60,.35)"; x.fillRect(GL, BAR, GRT - GL, GND - BAR);
        x.strokeStyle = "rgba(255,255,255,.22)"; x.lineWidth = 1; for (let i = GL; i <= GRT; i += 14) { x.beginPath(); x.moveTo(i, BAR); x.lineTo(i, GND); x.stroke(); } for (let j = BAR; j <= GND; j += 14) { x.beginPath(); x.moveTo(GL, j); x.lineTo(GRT, j); x.stroke(); }
        x.strokeStyle = "rgba(255,255,255,.5)"; x.lineWidth = 3; x.beginPath(); x.moveTo(60, GND + 2); x.lineTo(580, GND + 2); x.stroke(); circ(x, 320, 345, 4, "rgba(255,255,255,.6)");
        // keeper
        const kp = keeperPos(), lean = kdive && kt > react ? g.clamp((kdive.x - home.x) / 200, -1, 1) : 0;
        x.save(); x.translate(kp.x, kp.y + 10); x.rotate(lean * .9 * Math.min(1, Math.max(0, (kt - react) / .3)));
        x.fillStyle = "#ffcf3a"; x.beginPath(); x.roundRect(-14, -32, 28, 50, 8); x.fill(); circ(x, 0, -42, 11, "#f1c27d"); x.fillStyle = "#222"; x.fillRect(-12, -52, 24, 6);
        const raise = kdive ? 1 : (Math.sin(tm * 3) * .2 + .2); x.strokeStyle = "#ffcf3a"; x.lineWidth = 8; x.lineCap = "round"; x.beginPath(); x.moveTo(-14, -24); x.lineTo(-30, -24 - 20 * raise); x.moveTo(14, -24); x.lineTo(30, -24 - 20 * raise); x.stroke(); x.lineCap = "butt"; circ(x, -30, -26 - 20 * raise, 6, "#fff"); circ(x, 30, -26 - 20 * raise, 6, "#fff");
        x.fillStyle = "#223"; x.fillRect(-12, 18, 10, 20); x.fillRect(2, 18, 10, 20); x.restore();
        // goal frame
        x.strokeStyle = "#fff"; x.lineWidth = 7; x.lineJoin = "miter"; x.beginPath(); x.moveTo(GL, GND); x.lineTo(GL, BAR); x.lineTo(GRT, BAR); x.lineTo(GRT, GND); x.stroke();
        // ball
        let bxp = 320, byp = 345, bs = 1;
        if (state === "fly" || state === "result") { const ff = state === "fly" ? f : 1; bxp = 320 + (tgt.x - 320) * ff; byp = 345 + (tgt.y - 345) * ff - Math.sin(Math.PI * ff) * 25; bs = 1 - .55 * ff; if (saved && state === "result") { const k = Math.min(1, kt / 1) ; bxp += (tgt.x < kp.x ? -1 : 1) * 40 * Math.min(1, (kt - ft) * 3); byp += 20 * Math.min(1, (kt - ft) * 3); } }
        const br = 16 * bs; circ(x, bxp + 3, (state === "fly" ? 345 + (tgt.y - 345) * f : byp) + 4 + br, "rgba(0,0,0,0)"); circ(x, bxp, byp, br, "#fff"); x.strokeStyle = "#222"; x.lineWidth = 1.5 * bs; x.beginPath(); x.arc(bxp, byp, br, 0, TAU); x.stroke(); circ(x, bxp, byp, br * .38, "#222"); circ(x, bxp - br * .7, byp - br * .2, br * .2, "#222"); circ(x, bxp + br * .7, byp - br * .2, br * .2, "#222"); circ(x, bxp, byp + br * .75, br * .2, "#222");
        drawParts(x, parts, dt);
        if (state === "charge" || (state === "aim")) { x.strokeStyle = "rgba(255,255,255,.9)"; x.lineWidth = 2; x.beginPath(); x.arc(aim.x, aim.y, 13, 0, TAU); x.moveTo(aim.x - 20, aim.y); x.lineTo(aim.x + 20, aim.y); x.moveTo(aim.x, aim.y - 20); x.lineTo(aim.x, aim.y + 20); x.stroke(); }
        if (state === "charge") { x.fillStyle = "rgba(0,0,0,.45)"; x.fillRect(590, 120, 20, 200); x.fillStyle = "#ff4d4d"; x.fillRect(590, 120, 20, 200 * .07); x.fillStyle = "#6be28f"; x.fillRect(590, 120 + 200 * .07, 20, 200 * .27); x.fillStyle = "#ffd34e"; x.fillRect(590, 120 + 200 * .34, 20, 200 * .66); x.fillStyle = "#fff"; x.fillRect(584, 320 - 200 * pw - 3, 32, 6); T(x, "Power", 600, 108, 13, "#fff"); }
        if (resT > 0 || state === "result") T(x, res, 320, 60, 34, res[0] === "G" ? "#ffd34e" : "#fff");
        if (hint && state === "aim") T(x, "Press where to shoot, hold to charge, let go to kick", 320, 385, 17, "#fff");
        x.restore();
      });
    }
  });

  // ---- Skee roll ----
  B.add({
    id: "s7-skee", name: "Ramp Roll", ages: [6, 20], cat: "Sports", color: "#ff7a3d", icon: "R",
    desc: "Roll the ball up the lane, fly off the ramp and drop it into the holes.", controls: "Press, slide sideways to place the ball, pull down for power, let go",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(400, 600), parts = [], L = 100, RR = 300, LIP = 170, k = g.by(1.3, 1, .85), BALLS = 9;
      const HOLES = [{ x: 200, y: 48, r: 11, v: 50 }, { x: 150, y: 74, r: 13, v: 30 }, { x: 250, y: 74, r: 13, v: 30 }, { x: 122, y: 106, r: 15, v: 20 }, { x: 278, y: 106, r: 15, v: 20 }, { x: 200, y: 114, r: 18, v: 10 }];
      const ball = { x: 200, y: 540, z: 0, vx: 0, vy: 0, vz: 0 };
      let state = "aim", left = BALLS, pull = 0, y0 = 0, dragging = false, flew = false, tm = 0, waitT = 0, msg = "", msgT = 0, sink = null, shake = 0, tip = true;
      const info = () => g.status("Balls: " + left);
      const rst = () => { ball.x = 200; ball.y = 540; ball.z = 0; ball.vx = ball.vy = ball.vz = 0; flew = false; state = "aim"; sink = null; pull = 0; };
      const say = s => { msg = s; msgT = 1.2; };
      const endRoll = s => { say(s); waitT = 1; state = "wait"; if (s === "No score") g.sfx("wrong"); left--; info(); };
      const launch = () => { if (pull < .06) { pull = 0; return; } ball.vy = -(280 + pull * 190); ball.vx = 0; state = "roll"; tip = false; g.sfx("rumble"); };
      g.on(c, "pointerdown", e => { if (state !== "aim") return; const p = pos(e); dragging = true; y0 = p.y; ball.x = g.clamp(p.x, L + 14, RR - 14); });
      g.on(c, "pointermove", e => { if (!dragging || state !== "aim") return; const p = pos(e); ball.x = g.clamp(p.x, L + 14, RR - 14); pull = g.clamp((p.y - y0) / 140, 0, 1); });
      g.on(window, "pointerup", () => { if (!dragging) return; dragging = false; if (state === "aim") launch(); });
      g.on(window, "keydown", e => { if (state !== "aim") return; if (e.code === "Space" || e.key === "ArrowUp") { if (e.repeat) return; pull = Math.max(pull, .5); launch(); } });
      info();
      g.loop(dt => {
        tm += dt; msgT -= dt; shake = Math.max(0, shake - dt * 25);
        if (state === "aim") { if (g.keys.ArrowLeft) ball.x = Math.max(L + 14, ball.x - 150 * dt); if (g.keys.ArrowRight) ball.x = Math.min(RR - 14, ball.x + 150 * dt); if (!dragging) pull = Math.max(0, pull - dt * 3); }
        if (state === "roll") {
          const n = 3, s = dt / n;
          for (let i = 0; i < n && state === "roll"; i++) {
            if (!flew && ball.z === 0 && ball.y > LIP) { ball.y += ball.vy * s; const sp = -ball.vy; ball.vy = -Math.max(0, sp - 130 * s); if (ball.y <= LIP) { if (-ball.vy < 150) { endRoll("No score"); g.sfx("thump"); } else { flew = true; ball.vz = -ball.vy * .55; ball.z = .1; g.sfx("launch"); shake = 3; } } else if (ball.vy > -10) { endRoll("Too weak!"); } }
            else {
              ball.x += ball.vx * s; ball.y += ball.vy * s; if (ball.z > 0 || ball.vz > 0) { ball.vz -= 900 * s; ball.z += ball.vz * s; if (ball.z <= 0) { ball.z = 0; if (-ball.vz > 60) { ball.vz = -ball.vz * .5; ball.vx *= .75; ball.vy *= .6; g.sfx("thump"); } else ball.vz = 0; } }
              if (ball.x < L + 10) { ball.x = L + 10; ball.vx = Math.abs(ball.vx) * .6; } if (ball.x > RR - 10) { ball.x = RR - 10; ball.vx = -Math.abs(ball.vx) * .6; }
              if (ball.y < 28) { ball.y = 28; ball.vy = Math.abs(ball.vy) * .4; g.sfx("clink"); }
              if (flew && ball.z === 0) {
                const f = Math.exp(-2 * s); ball.vx *= f; ball.vy *= f; const sp = Math.hypot(ball.vx, ball.vy);
                for (const h of HOLES) { const d = Math.hypot(ball.x - h.x, ball.y - h.y), r = h.r * k; if (d < r && sp < 260) { sink = { h, t: 0 }; g.add(h.v); g.sfx(h.v >= 30 ? "cheer" : "drop"); popAt(g, c, W, H, "+" + h.v, h.x, h.y, "#ffd34e"); burst(parts, h.x, h.y, "#ffd34e", 18, 180); say(h.v + " points!"); shake = h.v >= 30 ? 6 : 2; waitT = .9; state = "wait"; left--; info(); break; } else if (d < r * 1.7 && sp < 90) { ball.vx += (h.x - ball.x) * 3 * s; ball.vy += (h.y - ball.y) * 3 * s; } }
                if (state === "roll" && sp < 12) { endRoll("No score"); }
                if (state === "roll" && ball.y > LIP) { endRoll("Rolled back"); }
              }
              if (state === "roll" && flew && ball.y > H) endRoll("No score");
            }
          }
        }
        if (state === "wait") { waitT -= dt; if (sink) sink.t += dt; if (waitT <= 0) { if (left <= 0) { g.win("All balls rolled!"); return false; } rst(); } }
        // draw
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .3, g.rf(-shake, shake) * .3);
        x.fillStyle = vgrad(x, 0, H, "#1a0d33", "#2d1458"); x.fillRect(0, 0, W, H);
        x.fillStyle = "#111"; x.fillRect(L - 26, 20, 26, H); x.fillRect(RR, 20, 26, H);
        const lg = x.createLinearGradient(L, 0, RR, 0); lg.addColorStop(0, "#c98a3d"); lg.addColorStop(.5, "#e8aa5a"); lg.addColorStop(1, "#c98a3d"); x.fillStyle = lg; x.fillRect(L, LIP, RR - L, H - LIP);
        x.strokeStyle = "rgba(100,60,20,.3)"; for (let i = 1; i < 10; i++) { x.beginPath(); x.moveTo(L + i * 20, LIP); x.lineTo(L + i * 20, H); x.stroke(); }
        const bg = x.createLinearGradient(0, 20, 0, LIP); bg.addColorStop(0, "#2b1b6b"); bg.addColorStop(1, "#4a2fa8"); x.fillStyle = bg; x.fillRect(L, 20, RR - L, LIP - 20);
        const rg = x.createLinearGradient(0, LIP - 6, 0, LIP + 22); rg.addColorStop(0, "#fff2c8"); rg.addColorStop(1, "#c98a3d"); x.fillStyle = rg; x.fillRect(L, LIP - 4, RR - L, 26); T(x, "RAMP", 200, LIP + 9, 13, "#7a4a1a");
        HOLES.forEach(h => { const r = h.r * k; circ(x, h.x, h.y, r + 5, "#ffd34e"); circ(x, h.x, h.y, r + 1, "#222"); circ(x, h.x, h.y, r - 1, "#000"); T(x, String(h.v), h.x, h.y + r + 12, 12, "#fff"); });
        if (state === "aim") { x.setLineDash([3, 9]); x.strokeStyle = "rgba(255,255,255,.35)"; x.lineWidth = 2; x.beginPath(); x.moveTo(ball.x, ball.y); x.lineTo(ball.x, LIP); x.stroke(); x.setLineDash([]); x.fillStyle = "rgba(0,0,0,.4)"; x.fillRect(335, 340, 20, 200); x.fillStyle = pull > .85 ? "#ff8a2a" : "#6be28f"; x.fillRect(335, 540 - 200 * pull, 20, 200 * pull); T(x, "Power", 345, 325, 13, "#fff"); }
        const by = ball.y + (state === "aim" ? pull * 40 : 0), r = 13 + ball.z * .05, vis = !(sink && sink.t > .2);
        if (vis) { circ(x, ball.x + 3, by + 4, 12, "rgba(0,0,0," + Math.max(.1, .3 - ball.z * .002) + ")"); const bb = x.createRadialGradient(ball.x - 4, by - ball.z * .5 - 5, 2, ball.x, by - ball.z * .5, r); bb.addColorStop(0, "#ffcf8a"); bb.addColorStop(1, "#c2561c"); x.fillStyle = bb; x.beginPath(); x.arc(ball.x, by - ball.z * .5, sink ? r * Math.max(0, 1 - sink.t * 5) : r, 0, TAU); x.fill(); }
        drawParts(x, parts, dt);
        if (tip && state === "aim") T(x, "Slide to place, pull down, let go", 200, 440, 18, "#fff");
        if (msgT > 0) { x.globalAlpha = Math.min(1, msgT * 2); T(x, msg, 200, 250, 30, "#ffd34e"); x.globalAlpha = 1; }
        x.restore();
      });
    }
  });

  // ---- Trampoline timing ----
  B.add({
    id: "s7-trampoline", name: "Trampoline Time", ages: [7, 20], cat: "Skill", color: "#ff5fa2", icon: "J",
    desc: "Tap just before you land to bounce higher. Grab stars and stay on the mat!", controls: "Move left/right to stay over the mat. Tap or Space just before landing",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(400, 600), parts = [], GY = 520, GR = 1100, half = g.by(115, 90, 68), win = g.by(.3, .22, .15), decay = g.by(.9, .86, .82);
      const j = { x: 0, y: 200, vy: 0 };
      let tx = 0, lives = 3, tapT = 0, tapUsed = false, tm = 0, sc = 1, maxApex = 0, perfects = 0, starsN = 0, combo = 0, shake = 0, dip = 0, rot = 0, spinning = false, stars = [], msg = "", msgT = 0, down = false, hint = true, squash = 0;
      const info = () => g.status("Lives: " + lives + "  Combo " + combo);
      const upd = () => g.score(Math.floor(maxApex / 10) + starsN * 10 + perfects * 5);
      const peak = () => j.y + (j.vy > 0 ? j.vy * j.vy / (2 * GR) : 0);
      const mkStars = () => { stars = []; const pk = Math.max(80, peak()); for (let i = 0; i < 3; i++) stars.push({ x: g.rf(-half * 1.3, half * 1.3), y: pk * g.rf(.45, .95), on: true }); };
      const say = s => { msg = s; msgT = 1; };
      const tap = () => { hint = false; if (tapT <= 0) { tapT = win; tapUsed = false; } };
      g.on(c, "pointerdown", e => { down = true; const p = pos(e); tx = g.clamp((p.x - W / 2) / sc, -half - 70, half + 70); tap(); });
      g.on(c, "pointermove", e => { if (down || e.pointerType === "mouse") { const p = pos(e); tx = g.clamp((p.x - W / 2) / sc, -half - 70, half + 70); } });
      g.on(window, "pointerup", () => { down = false; });
      g.on(window, "keydown", e => { if (e.code === "Space" && !e.repeat) tap(); });
      info(); mkStars();
      g.loop(dt => {
        tm += dt; msgT -= dt; shake = Math.max(0, shake - dt * 30); dip = Math.max(0, dip - dt * 4); squash = Math.max(0, squash - dt * 5);
        if (g.keys.ArrowLeft) tx -= 380 * dt; if (g.keys.ArrowRight) tx += 380 * dt; tx = g.clamp(tx, -half - 70, half + 70);
        j.x += g.clamp(tx - j.x, -420 * dt, 420 * dt);
        j.vy -= GR * dt; j.y += j.vy * dt; if (spinning) rot += dt * 9;
        if (tapT > 0) { tapT -= dt; if (tapT <= 0 && !tapUsed) { combo = 0; say("Too early!"); g.sfx("tick"); info(); } }
        maxApex = Math.max(maxApex, j.y);
        stars.forEach(s => { if (s.on && Math.hypot(s.x - j.x, s.y - j.y) < 32) { s.on = false; starsN++; g.sfx("star"); popAt(g, c, W, H, "+10", W / 2 + s.x * sc, GY - s.y * sc, "#ffd34e"); burst(parts, W / 2 + s.x * sc, GY - s.y * sc, "#ffd34e", 14, 160); } });
        if (j.y <= 0 && j.vy < 0) {
          const v = -j.vy;
          if (Math.abs(j.x) <= half) {
            j.y = 0; dip = 1; squash = 1; rot = 0; spinning = false; let nv;
            if (tapT > 0) { const perfect = tapT / win > .55; tapUsed = true; tapT = 0; combo++; nv = Math.min(1250, v * (perfect ? 1.1 : 1.02) + (perfect ? 90 : 30)); if (perfect) { perfects++; say("PERFECT!"); g.sfx("cheer"); spinning = nv > 700; burst(parts, W / 2 + j.x * sc, GY, "#ff5fa2", 16, 200); shake = 4; } else { say("Good"); g.sfx("pop"); } }
            else { combo = 0; nv = v * decay; g.sfx("thump"); }
            j.vy = nv; if (nv < 300) { upd(); g.over("The bounces fizzled out!"); return false; }
            mkStars(); upd(); info();
          } else {
            j.y = 0; lives--; combo = 0; shake = 10; g.sfx("wrong"); say("Missed the mat!"); burst(parts, W / 2 + j.x * sc, GY, "#fff", 12, 200); info();
            if (lives <= 0) { upd(); g.over("Off the trampoline!"); return false; }
            j.x = 0; tx = 0; j.y = 220; j.vy = 0; mkStars(); tapT = 0;
          }
        }
        const tsc = g.clamp(400 / (Math.max(peak(), 150) + 100), .33, 1); sc += (tsc - sc) * Math.min(1, dt * 3);
        const SX = wx => W / 2 + wx * sc, SY = wy => GY - wy * sc;
        x.save(); if (shake > 0) x.translate(g.rf(-shake, shake) * .4, g.rf(-shake, shake) * .4);
        x.fillStyle = vgrad(x, 0, GY, "#2b1a6b", "#ff8fb8"); x.fillRect(0, 0, W, GY);
        for (let i = 0; i < 30; i++) circ(x, (i * 131) % W, (i * 71) % 400, 1.5, "rgba(255,255,255,.6)");
        const hpx = SY(maxApex); if (maxApex > 150) { x.setLineDash([6, 6]); x.strokeStyle = "rgba(255,255,255,.4)"; x.lineWidth = 2; x.beginPath(); x.moveTo(0, hpx); x.lineTo(W, hpx); x.stroke(); x.setLineDash([]); T(x, "Best " + Math.floor(maxApex / 10) + " m", 50, hpx - 10, 12, "#fff"); }
        x.fillStyle = vgrad(x, GY, H, "#4a3a8a", "#241a52"); x.fillRect(0, GY, W, H - GY);
        const bw = half * sc, bd = dip * 16 * sc;
        x.strokeStyle = "#999"; x.lineWidth = 6 * sc + 2; x.beginPath(); x.moveTo(SX(-half + 8), GY + 4); x.lineTo(SX(-half + 8), GY + 50 * sc + 8); x.moveTo(SX(half - 8), GY + 4); x.lineTo(SX(half - 8), GY + 50 * sc + 8); x.stroke();
        x.strokeStyle = "#222"; x.lineWidth = 8 * sc + 2; x.lineCap = "round"; x.beginPath(); x.moveTo(SX(-half), GY); x.quadraticCurveTo(SX(0), GY + bd * 2, SX(half), GY); x.stroke();
        x.strokeStyle = "#ff5fa2"; x.lineWidth = 4 * sc + 1; x.beginPath(); x.moveTo(SX(-half), GY - 1); x.quadraticCurveTo(SX(0), GY + bd * 2 - 1, SX(half), GY - 1); x.stroke(); x.lineCap = "butt";
        stars.forEach(s => { if (!s.on) return; const px = SX(s.x), py = SY(s.y), r = 14 * Math.max(.6, sc) + Math.sin(tm * 6) * 1.5; x.fillStyle = "#ffd34e"; x.shadowColor = "#ffd34e"; x.shadowBlur = 12; x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; x.lineTo(px + Math.cos(a) * rr, py + Math.sin(a) * rr); } x.closePath(); x.fill(); x.shadowBlur = 0; });
        const jx = SX(j.x), jy = SY(Math.max(0, j.y)) + (j.y <= 0 ? bd : 0), s = Math.max(.55, sc), sq = 1 + squash * .25 * Math.max(0, Math.sin(squash * 3)) - (j.y > 0 ? Math.min(.2, Math.abs(j.vy) / 6000) : 0);
        const shw = g.clamp(1 - j.y / 700, .3, 1); x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(jx, GY + 8, 24 * s * shw, 5 * s, 0, 0, TAU); x.fill();
        x.save(); x.translate(jx, jy - 26 * s); x.rotate(rot); x.scale(s / sq, s * sq);
        x.fillStyle = "#4cc3ff"; x.beginPath(); x.roundRect(-9, -14, 18, 26, 8); x.fill(); circ(x, 0, -24, 10, "#f1c27d"); x.fillStyle = "#6a3b1a"; x.beginPath(); x.arc(0, -27, 10.5, Math.PI, TAU); x.fill();
        x.strokeStyle = "#4cc3ff"; x.lineWidth = 5; x.lineCap = "round"; const up = j.vy > 0 ? 1 : .3; x.beginPath(); x.moveTo(-9, -8); x.lineTo(-20, -8 - 18 * up); x.moveTo(9, -8); x.lineTo(20, -8 - 18 * up); x.stroke();
        x.strokeStyle = "#223"; x.beginPath(); x.moveTo(-4, 10); x.lineTo(-7, 26 - (j.vy > 0 ? 6 : 0)); x.moveTo(4, 10); x.lineTo(7, 26 - (j.vy > 0 ? 6 : 0)); x.stroke(); x.lineCap = "butt"; x.restore();
        drawParts(x, parts, dt);
        T(x, Math.max(0, Math.floor(j.y / 10)) + " m", 40, 30, 20, "#fff"); if (combo > 1) T(x, "Combo x" + combo, 200, 60, 20, "#ffd34e");
        if (msgT > 0) T(x, msg, 200, 110, 30, msg[0] === "M" || msg[0] === "T" ? "#ff8a8a" : "#ffd34e");
        if (hint) T(x, "Tap just before you land!", 200, 570, 18, "#fff");
        x.restore();
      });
    }
  });
})();
