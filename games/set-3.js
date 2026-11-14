// Break Time Games: set 3 (Arcade classics reimagined, original art)
(function () {
  const B = window.BreakGames; if (!B) return;
  const T = Math.PI * 2;

  // ---- shared little helpers ----
  const burst = (a, px, py, col, n, sp) => { for (let i = 0; i < (n || 10); i++) { const an = Math.random() * T, s = 30 + Math.random() * (sp || 150); a.push({ x: px, y: py, vx: Math.cos(an) * s, vy: Math.sin(an) * s, life: .3 + Math.random() * .4, col }); } };
  const stepParts = (x, a, dt) => { for (let i = a.length - 1; i >= 0; i--) { const p = a[i]; p.life -= dt; if (p.life <= 0) { a.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.min(1, p.life * 2); x.fillStyle = p.col; x.fillRect(p.x - 2, p.y - 2, 4, 4); } x.globalAlpha = 1; };
  const txt = (x, s, px, py, size, col, al) => { x.font = "bold " + (size || 20) + "px system-ui, sans-serif"; x.textAlign = al || "center"; x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  const rr = (x, px, py, w, h, r, col) => { x.beginPath(); x.roundRect(px, py, w, h, r); x.fillStyle = col; x.fill(); };
  const popAt = (g, c, W, H, s, px, py, col) => g.pop(s, px * c.clientWidth / W, py * c.clientHeight / H, col);
  const shk = (x, s) => { if (s > .3) x.translate((Math.random() - .5) * s, (Math.random() - .5) * s); };
  const circ = (x, px, py, r, col) => { x.beginPath(); x.arc(px, py, r, 0, T); x.fillStyle = col; x.fill(); };

  // ---- 1. Brick Bash: breakout with power-ups ----
  B.add({
    id: "s3-brickbash", name: "Brick Bash", ages: [8, 20], cat: "Arcade", color: "#ff7a59", icon: "B",
    desc: "Bounce the ball, smash every brick and catch the power-ups.", controls: "Move mouse or finger, or use the arrow keys. Tap, click or press Space to launch.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(480, 560), bricks = [], balls = [], pups = [], parts = [];
      const COLS = 8, BW = W / COLS, BH = 22, PY = H - 34, PH = 14, PC = ["#ff5d73", "#ffa94d", "#ffd43b", "#69db7c", "#4dabf7", "#b197fc", "#f783ac", "#63e6be"];
      let px = W / 2, lives = 3, level = 1, wide = 0, slow = 0, shake = 0, stuck = true, tt = 0;
      const pw = () => g.by(120, 96, 78) * (wide > 0 ? 1.5 : 1);
      const hud = () => g.status("Lives: " + lives + "  Level " + level + "/5");
      const build = () => {
        bricks.length = 0; const rows = Math.min(8, 3 + level + g.diff);
        for (let r = 0; r < rows; r++) for (let k = 0; k < COLS; k++) { if (level > 1 && Math.random() < .1) continue; bricks.push({ x: k * BW, y: 50 + r * (BH + 4), hp: r < Math.floor(level / 2) ? 2 : 1, col: PC[r % PC.length] }); }
      };
      const serve = () => { balls.length = 0; balls.push({ x: px, y: PY - 12, vx: 0, vy: 0, r: 8, sp: g.by(300, 350, 400) + level * 18 }); stuck = true; };
      const launch = () => { if (!stuck) return; stuck = false; const b = balls[0], a = -Math.PI / 2 + g.rf(-.35, .35); b.vx = Math.cos(a) * b.sp; b.vy = Math.sin(a) * b.sp; g.sfx("swish"); };
      build(); serve(); hud();
      g.on(c, "pointermove", e => { px = pos(e).x; });
      g.on(c, "pointerdown", e => { px = pos(e).x; launch(); });
      g.on(window, "keydown", e => { if (e.key === " " || e.key === "ArrowUp") launch(); });
      g.loop(dt => {
        tt += dt; wide = Math.max(0, wide - dt); slow = Math.max(0, slow - dt); shake = Math.max(0, shake - dt * 20);
        if (g.keys.ArrowLeft) px -= 480 * dt; if (g.keys.ArrowRight) px += 480 * dt;
        const P = pw(); px = g.clamp(px, P / 2, W - P / 2);
        const h = dt * (slow > 0 ? .7 : 1) / 2;
        for (let s = 0; s < 2; s++) {
          for (let i = balls.length - 1; i >= 0; i--) {
            const b = balls[i];
            if (stuck && i === 0) { b.x = px; b.y = PY - 12; continue; }
            b.x += b.vx * h; b.y += b.vy * h;
            if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx); g.sfx("tick"); }
            if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx); g.sfx("tick"); }
            if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy); g.sfx("tick"); }
            if (b.vy > 0 && b.y + b.r >= PY && b.y - b.r < PY + PH && Math.abs(b.x - px) < P / 2 + b.r) {
              const off = g.clamp((b.x - px) / (P / 2), -1, 1); b.sp = Math.min(b.sp * 1.015, g.by(520, 620, 700)); const a = -Math.PI / 2 + off * 1.05;
              b.vx = Math.cos(a) * b.sp; b.vy = Math.sin(a) * b.sp; b.y = PY - b.r; g.sfx("click"); shake = 3;
            }
            if (b.y > H + 20) { balls.splice(i, 1); continue; }
            for (let k = 0; k < bricks.length; k++) {
              const br = bricks[k], cx = g.clamp(b.x, br.x, br.x + BW - 2), cy = g.clamp(b.y, br.y, br.y + BH), dx = b.x - cx, dy = b.y - cy;
              if (dx * dx + dy * dy < b.r * b.r) {
                if (Math.abs(dx) > Math.abs(dy)) b.vx = (dx > 0 ? 1 : -1) * Math.abs(b.vx); else b.vy = (dy > 0 ? 1 : -1) * Math.abs(b.vy);
                br.hp--;
                if (br.hp <= 0) {
                  bricks.splice(k, 1); g.add(10); g.sfx("pop"); burst(parts, br.x + BW / 2, br.y + BH / 2, br.col, 10);
                  if (Math.random() < .16) pups.push({ x: br.x + BW / 2, y: br.y, t: g.pick(["W", "M", "S"]) });
                } else g.sfx("clink");
                break;
              }
            }
          }
        }
        if (!balls.length) {
          lives--; hud(); g.sfx("wrong"); shake = 10;
          if (lives <= 0) { g.over("Out of balls!"); return false; }
          serve();
        }
        if (!bricks.length) {
          level++; g.add(50); g.sfx("cheer");
          if (level > 5) { g.add(100 * lives); g.win("Every brick smashed!"); return false; }
          build(); serve(); pups.length = 0; hud();
        }
        for (let i = pups.length - 1; i >= 0; i--) {
          const u = pups[i]; u.y += 130 * dt;
          if (u.y > PY - 6 && u.y < PY + PH + 10 && Math.abs(u.x - px) < P / 2 + 12) {
            pups.splice(i, 1); g.sfx("star"); g.add(5);
            if (u.t === "W") wide = 12; else if (u.t === "S") slow = 8;
            else if (stuck || !balls.length) wide = 12;
            else { const b = balls[0]; for (const da of [-.4, .4]) { const a = Math.atan2(b.vy, b.vx) + da; balls.push({ x: b.x, y: b.y, vx: Math.cos(a) * b.sp, vy: Math.sin(a) * b.sp, r: 8, sp: b.sp }); } }
            continue;
          }
          if (u.y > H + 20) pups.splice(i, 1);
        }
        x.save(); shk(x, shake);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#1b1446"); gr.addColorStop(1, "#3b2a7a"); x.fillStyle = gr; x.fillRect(-10, -10, W + 20, H + 20);
        for (const br of bricks) { rr(x, br.x + 1, br.y, BW - 4, BH, 6, br.col); rr(x, br.x + 4, br.y + 3, BW - 10, 5, 3, "rgba(255,255,255,.35)"); if (br.hp > 1) { x.strokeStyle = "#fff"; x.lineWidth = 2; x.beginPath(); x.roundRect(br.x + 1, br.y, BW - 4, BH, 6); x.stroke(); } }
        for (const u of pups) { const col = { W: "#4dabf7", M: "#ff6b6b", S: "#69db7c" }[u.t]; rr(x, u.x - 14, u.y - 10, 28, 20, 10, col); txt(x, u.t, u.x, u.y + 6, 15, "#fff"); }
        const pg = x.createLinearGradient(0, PY, 0, PY + PH); pg.addColorStop(0, "#fff"); pg.addColorStop(1, wide > 0 ? "#4dabf7" : "#ffd43b"); rr(x, px - P / 2, PY, P, PH, 7, pg);
        for (const b of balls) { x.shadowColor = "#fff"; x.shadowBlur = 12; circ(x, b.x, b.y, b.r, slow > 0 ? "#b2f2bb" : "#fff"); x.shadowBlur = 0; }
        stepParts(x, parts, dt);
        if (stuck) txt(x, "Tap or press Space to launch", W / 2, H / 2 + 60, 20, "#fff");
        if (wide > 0 || slow > 0) txt(x, (wide > 0 ? "WIDE " + Math.ceil(wide) + "  " : "") + (slow > 0 ? "SLOW " + Math.ceil(slow) : ""), W / 2, H - 6, 14, "#ffe066");
        x.restore();
      });
    }
  });

  // ---- 2. Neon Pong: beat the computer paddle ----
  B.add({
    id: "s3-neonpong", name: "Neon Pong", ages: [6, 20], cat: "Arcade", color: "#22d3ee", icon: "P",
    desc: "A glowing paddle duel against the computer. First to 7 wins.", controls: "Move your mouse or finger up and down, or use the Up and Down keys.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), parts = [], trail = [];
      const PH = g.by(96, 76, 60), PW = 12, SP0 = g.by(270, 330, 390), AIS = g.by(190, 260, 340), ERR = g.by(80, 42, 12), GOAL = 7;
      let py = H / 2, ay = H / 2, ps = 0, as = 0, tgt = H / 2, wait = 1.2, shake = 0, rally = 0, flash = 0;
      const ball = { x: W / 2, y: H / 2, vx: 0, vy: 0, sp: SP0 };
      const hud = () => g.status("You " + ps + " : " + as + " Computer  (first to " + GOAL + ")");
      const serve = dir => { ball.x = W / 2; ball.y = H / 2; ball.sp = SP0; const a = g.rf(-.5, .5); ball.vx = Math.cos(a) * SP0 * dir; ball.vy = Math.sin(a) * SP0; wait = 1.1; rally = 0; trail.length = 0; tgt = H / 2; };
      const predict = () => { const t = (W - 28 - ball.x) / ball.vx, m = H - 16; let y = ball.y - 8 + ball.vy * t; y = ((y % (2 * m)) + 2 * m) % (2 * m); if (y > m) y = 2 * m - y; return y + 8; };
      const hit = (p, dir) => {
        const off = g.clamp((ball.y - p) / (PH / 2 + 8), -1, 1); ball.sp = Math.min(ball.sp * 1.05, SP0 * 2); const a = off * .95;
        ball.vx = Math.cos(a) * ball.sp * dir; ball.vy = Math.sin(a) * ball.sp; ball.x = dir > 0 ? 28 + PW / 2 + 8 : W - 28 - PW / 2 - 8;
        g.sfx("click"); burst(parts, ball.x, ball.y, "#22d3ee", 8); shake = 3; rally++;
        if (dir > 0) { g.add(1); tgt = g.clamp(predict() + g.rf(-ERR, ERR), PH / 2, H - PH / 2); }
      };
      serve(1); hud();
      g.on(c, "pointermove", e => { py = pos(e).y; }); g.on(c, "pointerdown", e => { py = pos(e).y; });
      g.loop(dt => {
        shake = Math.max(0, shake - dt * 20); flash = Math.max(0, flash - dt);
        if (g.keys.ArrowUp) py -= 380 * dt; if (g.keys.ArrowDown) py += 380 * dt; py = g.clamp(py, PH / 2, H - PH / 2);
        const aim = ball.vx > 0 ? tgt : H / 2; ay += g.clamp(aim - ay, -AIS * dt, AIS * dt); ay = g.clamp(ay, PH / 2, H - PH / 2);
        if (wait > 0) wait -= dt; else {
          ball.x += ball.vx * dt; ball.y += ball.vy * dt; trail.push({ x: ball.x, y: ball.y }); if (trail.length > 10) trail.shift();
          if (ball.y < 8) { ball.y = 8; ball.vy = Math.abs(ball.vy); g.sfx("tick"); }
          if (ball.y > H - 8) { ball.y = H - 8; ball.vy = -Math.abs(ball.vy); g.sfx("tick"); }
          if (ball.vx < 0 && ball.x - 8 < 28 + PW / 2 && ball.x > 10 && Math.abs(ball.y - py) < PH / 2 + 8) hit(py, 1);
          if (ball.vx > 0 && ball.x + 8 > W - 28 - PW / 2 && ball.x < W - 10 && Math.abs(ball.y - ay) < PH / 2 + 8) hit(ay, -1);
          if (ball.x < -12) { as++; g.sfx("wrong"); shake = 10; flash = .3; hud(); if (as >= GOAL) { g.over("The computer wins this round!"); return false; } serve(1); }
          else if (ball.x > W + 12) {
            ps++; g.add(10); g.sfx("cheer"); hud(); burst(parts, W - 20, ball.y, "#ffe066", 16);
            if (ps >= GOAL) { g.add(30 * (g.diff + 1)); g.win("You beat the computer!"); return false; } serve(-1);
          }
        }
        x.save(); shk(x, shake);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#0b1030"); gr.addColorStop(1, "#1a0b3b"); x.fillStyle = gr; x.fillRect(-10, -10, W + 20, H + 20);
        if (flash > 0) { x.fillStyle = "rgba(255,80,120," + flash + ")"; x.fillRect(0, 0, W, H); }
        x.strokeStyle = "rgba(255,255,255,.25)"; x.lineWidth = 3; x.setLineDash([12, 12]); x.beginPath(); x.moveTo(W / 2, 0); x.lineTo(W / 2, H); x.stroke(); x.setLineDash([]);
        txt(x, ps, W / 2 - 60, 50, 36, "rgba(34,211,238,.6)"); txt(x, as, W / 2 + 60, 50, 36, "rgba(255,110,160,.6)");
        x.shadowBlur = 16; x.shadowColor = "#22d3ee"; rr(x, 28 - PW / 2, py - PH / 2, PW, PH, 6, "#22d3ee");
        x.shadowColor = "#ff6ea0"; rr(x, W - 28 - PW / 2, ay - PH / 2, PW, PH, 6, "#ff6ea0"); x.shadowBlur = 0;
        trail.forEach((t, i) => { x.globalAlpha = i / 25; circ(x, t.x, t.y, 7, "#fff"); }); x.globalAlpha = 1;
        x.shadowBlur = 14; x.shadowColor = "#fff"; circ(x, ball.x, ball.y, 8, "#fff"); x.shadowBlur = 0;
        if (wait > 0) txt(x, "Get ready!", W / 2, H - 30, 20, "#ffe066");
        stepParts(x, parts, dt); x.restore();
      });
    }
  });

  // ---- 3. Rock Blaster: shoot and dodge the falling space rocks ----
  B.add({
    id: "s3-rockblaster", name: "Rock Blaster", ages: [7, 20], cat: "Arcade", color: "#7c8cff", icon: "R",
    desc: "Your little ship fires on its own. Steer, dodge and crack the space rocks.", controls: "Drag your finger or mouse, or use the arrow keys. The ship shoots by itself.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(480, 600), rocks = [], bul = [], parts = [], stars = [];
      for (let i = 0; i < 60; i++) stars.push({ x: g.rf(0, W), y: g.rf(0, H), s: g.rf(.5, 2), v: g.rf(15, 60) });
      let sx = W / 2, tx = W / 2, lives = 3, inv = 0, fire = 0, spawn = 1, shake = 0, tm = 0;
      const rate = g.by(.26, .2, .15), SY = H - 55;
      const mkRock = (px, py, s, vx, vy) => { const r = s * 13, pts = []; for (let i = 0; i < 9; i++) pts.push(r * g.rf(.8, 1.1)); return { x: px, y: py, s, r, vx, vy, a: 0, rs: g.rf(-2, 2), pts }; };
      g.status("Lives: " + lives);
      g.on(c, "pointermove", e => { tx = pos(e).x; }); g.on(c, "pointerdown", e => { tx = pos(e).x; });
      g.loop(dt => {
        tm += dt; shake = Math.max(0, shake - dt * 25); inv = Math.max(0, inv - dt);
        if (g.keys.ArrowLeft) tx -= 460 * dt; if (g.keys.ArrowRight) tx += 460 * dt; tx = g.clamp(tx, 20, W - 20);
        sx += g.clamp(tx - sx, -540 * dt, 540 * dt);
        fire -= dt; if (fire <= 0) { fire = rate; bul.push({ x: sx, y: SY - 18 }); }
        spawn -= dt;
        if (spawn <= 0) {
          spawn = Math.max(.3, g.by(1.3, 1, .8) - tm * .006) * g.rf(.6, 1.3);
          const s = tm > 20 && Math.random() < .35 ? 3 : (Math.random() < .5 ? 2 : 1), r = s * 13;
          rocks.push(mkRock(g.rf(r, W - r), -r, s, g.rf(-40, 40), g.rf(60, 100) * g.by(.85, 1, 1.25) + tm * .8));
        }
        for (let i = bul.length - 1; i >= 0; i--) { bul[i].y -= 640 * dt; if (bul[i].y < -10) bul.splice(i, 1); }
        for (let i = rocks.length - 1; i >= 0; i--) {
          const r = rocks[i]; r.x += r.vx * dt; r.y += r.vy * dt; r.a += r.rs * dt;
          if (r.x < r.r || r.x > W - r.r) r.vx = -r.vx;
          if (r.y > H + r.r) { rocks.splice(i, 1); continue; }
          let dead = false;
          for (let k = bul.length - 1; k >= 0; k--) {
            if (Math.hypot(bul[k].x - r.x, bul[k].y - r.y) < r.r + 4) { bul.splice(k, 1); dead = true; break; }
          }
          if (!dead && inv <= 0 && Math.hypot(r.x - sx, r.y - SY) < r.r + 13) {
            dead = true; lives--; inv = 2; shake = 14; g.sfx("boom"); g.status("Lives: " + lives); burst(parts, sx, SY, "#ffd43b", 24, 220);
            if (lives <= 0) { g.over("Your ship was rocked!"); return false; }
          } else if (dead) { g.add(r.s * 5); g.sfx(r.s > 1 ? "boom" : "pop"); popAt(g, c, W, H, "+" + r.s * 5, r.x, r.y, "#ffe066"); }
          if (dead) {
            burst(parts, r.x, r.y, "#b8a89a", 12);
            if (r.s > 1) { rocks.push(mkRock(r.x - 6, r.y, r.s - 1, r.vx - 60, r.vy + 10)); rocks.push(mkRock(r.x + 6, r.y, r.s - 1, r.vx + 60, r.vy + 10)); }
            rocks.splice(i, 1);
          }
        }
        x.save(); shk(x, shake);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#050a24"); gr.addColorStop(1, "#2a1a5e"); x.fillStyle = gr; x.fillRect(-10, -10, W + 20, H + 20);
        for (const s of stars) { s.y += s.v * dt; if (s.y > H) { s.y = 0; s.x = g.rf(0, W); } x.fillStyle = "rgba(255,255,255," + (.3 + s.s / 3) + ")"; x.fillRect(s.x, s.y, s.s, s.s); }
        for (const r of rocks) {
          x.save(); x.translate(r.x, r.y); x.rotate(r.a); x.beginPath();
          r.pts.forEach((d, i) => { const an = i / r.pts.length * T; x[i ? "lineTo" : "moveTo"](Math.cos(an) * d, Math.sin(an) * d); }); x.closePath();
          const rg = x.createRadialGradient(-r.r * .3, -r.r * .3, 2, 0, 0, r.r); rg.addColorStop(0, "#c9b8a8"); rg.addColorStop(1, "#6b5a6e"); x.fillStyle = rg; x.fill(); x.strokeStyle = "#3b2f45"; x.lineWidth = 2; x.stroke();
          circ(x, r.r * .3, r.r * .2, r.r * .18, "rgba(0,0,0,.25)"); circ(x, -r.r * .35, -r.r * .1, r.r * .12, "rgba(0,0,0,.25)"); x.restore();
        }
        for (const b of bul) { rr(x, b.x - 2, b.y - 8, 4, 14, 2, "#7dffb0"); }
        if (inv <= 0 || Math.floor(tm * 12) % 2) {
          x.save(); x.translate(sx, SY);
          x.fillStyle = "#ffb703"; x.beginPath(); x.moveTo(-6, 14); x.lineTo(0, 14 + 10 + Math.random() * 10); x.lineTo(6, 14); x.fill();
          x.fillStyle = "#e8eefc"; x.beginPath(); x.moveTo(0, -20); x.lineTo(14, 14); x.lineTo(0, 8); x.lineTo(-14, 14); x.closePath(); x.fill();
          circ(x, 0, -2, 5, "#4cc3ff"); x.fillStyle = "#ff5d73"; x.beginPath(); x.moveTo(-14, 14); x.lineTo(-20, 18); x.lineTo(-10, 8); x.fill(); x.beginPath(); x.moveTo(14, 14); x.lineTo(20, 18); x.lineTo(10, 8); x.fill();
          x.restore();
        }
        stepParts(x, parts, dt); x.restore();
      });
    }
  });

  // ---- 4. Maze Muncher: gobble dots, dodge the wisps ----
  B.add({
    id: "s3-gobbo", name: "Gobbo's Maze", ages: [8, 20], cat: "Arcade", color: "#b197fc", icon: "G",
    desc: "A new maze every level. Gobble all the dots and outsmart the wisps.", controls: "Arrow keys or WASD, or swipe. Big glowing dots make the wisps scared.",
    start(g) {
      const NX = 19, NY = 21, cs = 28, { c, x, W, H } = g.canvas(NX * cs, NY * cs), parts = [];
      const nG = g.by(2, 3, 4), GC = ["#ff5d8f", "#37d6c8", "#ffa94d", "#9775fa"], CORN = [[1, 1], [17, 1], [1, 19], [17, 19]];
      let grid, dg, left, level = 1, lives = 3, fright = 0, pause = 1.5, wx = 0, wy = 0, shake = 0, me, gh, wc, sx0 = 0, sy0 = 0, tt = 0;
      const open = (tx, ty) => tx >= 0 && ty >= 0 && tx < NX && ty < NY && grid[ty][tx] === 0;
      const hud = () => g.status("Lives: " + lives + "  Maze " + level);
      const resetPos = () => {
        me = { tx: 9, ty: 11, dx: 0, dy: 0, p: 0, face: 0, arrive: eat }; wx = 0; wy = 0; gh = [];
        for (let i = 0; i < nG; i++) gh.push({ tx: CORN[i][0], ty: CORN[i][1], sx: CORN[i][0], sy: CORN[i][1], dx: 0, dy: 0, p: 0, col: GC[i], wait: 1 + i * 1.8, ch: i === 0 ? 1 : .6 });
      };
      const eat = e => {
        const v = dg[e.ty][e.tx]; if (!v) return; dg[e.ty][e.tx] = 0; left--; g.add(v === 2 ? 50 : 10);
        if (v === 2) { fright = g.by(8, 6, 4.5); g.sfx("pop"); } else g.sfx("tick");
      };
      const newMaze = () => {
        grid = []; for (let j = 0; j < NY; j++) grid.push(new Array(NX).fill(1));
        const st = [[1, 1]]; grid[1][1] = 0;
        while (st.length) {
          const [cx, cy] = st[st.length - 1];
          const nb = [[2, 0], [-2, 0], [0, 2], [0, -2]].filter(d => { const nx = cx + d[0], ny = cy + d[1]; return nx > 0 && ny > 0 && nx < NX - 1 && ny < NY - 1 && grid[ny][nx] === 1; });
          if (!nb.length) { st.pop(); continue; }
          const d = g.pick(nb); grid[cy + d[1] / 2][cx + d[0] / 2] = 0; grid[cy + d[1]][cx + d[0]] = 0; st.push([cx + d[0], cy + d[1]]);
        }
        for (let k = 0; k < 45; k++) { const tx = g.ri(1, NX - 2), ty = g.ri(1, NY - 2); if (grid[ty][tx] === 1 && ((tx % 2 === 0) !== (ty % 2 === 0))) grid[ty][tx] = 0; }
        dg = grid.map(r => r.map(v => v === 0 ? 1 : 0)); CORN.forEach(p => { dg[p[1]][p[0]] = 2; }); dg[11][9] = 0;
        left = 0; dg.forEach(r => r.forEach(v => { if (v) left++; }));
        wc = document.createElement("canvas"); wc.width = W * 2; wc.height = H * 2; const w = wc.getContext("2d"); w.scale(2, 2);
        w.fillStyle = "#10163a"; w.fillRect(0, 0, W, H);
        for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) if (grid[j][i] === 1) {
          w.beginPath(); w.roundRect(i * cs + 1, j * cs + 1, cs - 2, cs - 2, 8); w.fillStyle = "#2f45c9"; w.fill();
          w.beginPath(); w.roundRect(i * cs + 5, j * cs + 5, cs - 10, cs - 10, 5); w.fillStyle = "#5b78ff"; w.fill();
        }
        resetPos();
      };
      const adv = (e, sp, dt, choose) => {
        let m = sp * dt;
        while (m > 0) {
          if (!e.dx && !e.dy) { choose(e); if (!e.dx && !e.dy) return; }
          const need = 1 - e.p; if (m < need) { e.p += m; return; }
          m -= need; e.tx += e.dx; e.ty += e.dy; e.p = 0; if (e.arrive) e.arrive(e); choose(e);
        }
      };
      const pchoose = e => {
        if ((wx || wy) && open(e.tx + wx, e.ty + wy)) { e.dx = wx; e.dy = wy; e.face = Math.atan2(wy, wx); }
        else if (!open(e.tx + e.dx, e.ty + e.dy)) { e.dx = 0; e.dy = 0; }
      };
      const gchoose = e => {
        const opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(d => open(e.tx + d[0], e.ty + d[1])); if (!opts.length) return;
        let f = opts.filter(d => !(d[0] === -e.dx && d[1] === -e.dy)); if (!f.length) f = opts; let d;
        if (Math.random() < g.by(.25, .45, .65) * e.ch + (fright > 0 ? .3 : 0)) {
          const sg = fright > 0 ? -1 : 1; let bv = 1e9; d = f[0];
          for (const o of f) { const v = Math.hypot(e.tx + o[0] - me.tx, e.ty + o[1] - me.ty) * sg; if (v < bv) { bv = v; d = o; } }
        } else d = g.pick(f);
        e.dx = d[0]; e.dy = d[1];
      };
      const setWant = (dx, dy) => {
        wx = dx; wy = dy;
        if ((me.dx || me.dy) && dx === -me.dx && dy === -me.dy) { me.tx += me.dx; me.ty += me.dy; me.dx = dx; me.dy = dy; me.p = 1 - me.p; me.face = Math.atan2(dy, dx); }
      };
      const ep = e => [e.tx + e.dx * e.p, e.ty + e.dy * e.p];
      g.on(window, "keydown", e => { const m = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1], a: [-1, 0], d: [1, 0], w: [0, -1], s: [0, 1] }[e.key]; if (m) setWant(m[0], m[1]); });
      g.on(c, "pointerdown", e => { sx0 = e.clientX; sy0 = e.clientY; });
      g.on(c, "pointerup", e => {
        let dx = e.clientX - sx0, dy = e.clientY - sy0;
        if (Math.hypot(dx, dy) < 20) { const r = c.getBoundingClientRect(), q = ep(me); dx = e.clientX - (r.left + (q[0] + .5) * cs * r.width / W); dy = e.clientY - (r.top + (q[1] + .5) * cs * r.height / H); }
        if (Math.abs(dx) > Math.abs(dy)) setWant(dx > 0 ? 1 : -1, 0); else setWant(0, dy > 0 ? 1 : -1);
      });
      newMaze(); hud();
      const wisp = (cx, cy, r, col, e, fr) => {
        x.fillStyle = col; x.beginPath(); x.arc(cx, cy - 2, r, Math.PI, 0); const ys = [.85, .55, .85, .55, .85];
        for (let k = 0; k < 5; k++) x.lineTo(cx + r - k * r / 2, cy + r * ys[k]); x.closePath(); x.fill();
        circ(x, cx - r * .35, cy - 3, r * .28, "#fff"); circ(x, cx + r * .35, cy - 3, r * .28, "#fff");
        circ(x, cx - r * .35 + e.dx * 2, cy - 3 + e.dy * 2, r * .13, "#222"); circ(x, cx + r * .35 + e.dx * 2, cy - 3 + e.dy * 2, r * .13, "#222");
        if (fr) { x.strokeStyle = "#fff"; x.lineWidth = 1.5; x.beginPath(); x.moveTo(cx - r * .5, cy + r * .35); for (let k = 1; k <= 4; k++) x.lineTo(cx - r * .5 + k * r / 4, cy + r * (k % 2 ? .2 : .4)); x.stroke(); }
      };
      g.loop((dt, t) => {
        tt = t; shake = Math.max(0, shake - dt * 25);
        if (pause > 0) pause -= dt; else {
          fright = Math.max(0, fright - dt);
          adv(me, g.by(5.2, 5.8, 6.2) + level * .1, dt, pchoose);
          const gs = (g.by(3.4, 4.2, 5) + Math.min(level, 6) * .25) * (fright > 0 ? .6 : 1);
          for (const e of gh) { if (e.wait > 0) { e.wait -= dt; continue; } adv(e, gs, dt, gchoose); }
          if (left <= 0) { level++; g.add(100); g.sfx("cheer"); newMaze(); pause = 1.5; hud(); }
          else for (const e of gh) {
            if (e.wait > 0) continue; const a = ep(e), b = ep(me);
            if (Math.hypot(a[0] - b[0], a[1] - b[1]) < .6) {
              if (fright > 0) { g.add(200); g.sfx("star"); burst(parts, (a[0] + .5) * cs, (a[1] + .5) * cs, e.col, 16); popAt(g, c, W, H, "+200", (a[0] + .5) * cs, (a[1] + .5) * cs, "#ffe066"); e.tx = e.sx; e.ty = e.sy; e.dx = 0; e.dy = 0; e.p = 0; e.wait = 3; }
              else { lives--; hud(); shake = 14; g.sfx("boom"); if (lives <= 0) { g.over("The wisps caught Gobbo!"); return false; } resetPos(); pause = 1.3; break; }
            }
          }
        }
        x.save(); shk(x, shake); x.drawImage(wc, 0, 0, W, H);
        for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
          const v = dg[j][i]; if (v === 1) circ(x, (i + .5) * cs, (j + .5) * cs, 3, "#ffe9a8"); else if (v === 2) circ(x, (i + .5) * cs, (j + .5) * cs, 6 + Math.sin(tt * 8) * 1.5, "#fff");
        }
        const q = ep(me), mx = (q[0] + .5) * cs, my = (q[1] + .5) * cs, mo = .15 + Math.abs(Math.sin(tt * 12)) * .5;
        circ(x, mx, my, cs * .42, "#9c6bff"); circ(x, mx - 5, my - 7, 2.5, "#c9b0ff");
        x.fillStyle = "#6a1b3a"; x.beginPath(); x.moveTo(mx, my); x.arc(mx, my, cs * .38, me.face - mo, me.face + mo); x.fill();
        const ex = Math.cos(me.face + 1.6) * 5, ey = Math.sin(me.face + 1.6) * 5;
        circ(x, mx + ex - 1, my + ey - 3, 3.2, "#fff"); circ(x, mx - ex - 1, my - ey - 3, 3.2, "#fff"); circ(x, mx + ex, my + ey - 3, 1.5, "#222"); circ(x, mx - ex, my - ey - 3, 1.5, "#222");
        for (const e of gh) {
          const a = ep(e), fr = fright > 0, col = fr ? (fright < 2 && Math.floor(tt * 6) % 2 ? "#fff" : "#3b5bdb") : e.col;
          x.globalAlpha = e.wait > 0 ? .45 : 1; wisp((a[0] + .5) * cs, (a[1] + .5) * cs + 1, cs * .42, col, e, fr); x.globalAlpha = 1;
        }
        if (pause > 0) txt(x, "Ready!", W / 2, H / 2 + 8, 30, "#ffe066");
        stepParts(x, parts, dt); x.restore();
      });
    }
  });

  // ---- 5. Chick Crossing: hop over roads and rivers ----
  B.add({
    id: "s3-chickcross", name: "Chick Crossing", ages: [6, 16], cat: "Arcade", color: "#ffd43b", icon: "C",
    desc: "Help Chirpy the chick hop across busy roads and rivers. Keep moving!", controls: "Arrow keys or WASD to hop, or swipe. Tap to hop forward.",
    start(g) {
      const COLS = 9, CS = 40, SPAN = COLS + 6, { c, x, W, H } = g.canvas(360, 600), lanes = [], parts = [];
      let pl = { x: 4, lane: 0, fx: 4, fl: 0, hop: 0, face: 0 }, camL = -2, best = 0, dead = 0, deadMsg = "", tt = 0, sx0 = 0, sy0 = 0, shake = 0;
      const CC = ["#ff5d73", "#4dabf7", "#ffa94d", "#b197fc", "#f783ac", "#69db7c"];
      const mk = i => {
        let ty = "g";
        if (i >= 3) { const r = Math.random(), a = lanes[i - 1].t, b = lanes[i - 2].t; ty = r < .42 ? "r" : r < .72 ? "w" : "g"; if (ty === "w" && a === "w" && b === "w") ty = "g"; if (ty === "r" && a === "r" && b === "r") ty = "g"; }
        const L = { t: ty, dir: Math.random() < .5 ? -1 : 1, items: [], tr: [], v: 0, span: SPAN }, ramp = Math.min(1.5, 1 + i * .012);
        if (ty === "g") { if (i >= 3) { const n = g.ri(0, 3); for (let k = 0; k < n; k++) { const cc = g.ri(0, COLS - 1); if (!L.tr.includes(cc)) L.tr.push(cc); } } }
        else {
          L.v = L.dir * (ty === "r" ? g.rf(1.6, 3.2) * g.by(.8, 1, 1.25) * ramp : g.rf(.8, 1.8) * g.by(.9, 1, 1.15));
          let pos = g.rf(0, 3); const gk = g.by(1.3, 1, .85);
          while (pos < SPAN - 2) {
            const w = ty === "r" ? g.rf(1.2, 2.2) : g.rf(2, 3.5), gap = ty === "r" ? g.rf(2.6, 5) * gk : g.rf(1.1, 2.1) * (g.diff === 2 ? 1.2 : 1);
            L.items.push({ x: pos - 3, w, col: g.pick(CC) }); pos += w + gap;
          }
          L.span = Math.max(SPAN, pos);
        }
        lanes[i] = L;
      };
      while (lanes.length < 24) mk(lanes.length);
      const die = msg => { if (dead) return; dead = .001; deadMsg = msg; shake = 10; g.sfx(msg.indexOf("Splash") === 0 ? "splash" : "boom"); burst(parts, pl.x * CS + 20, H - CS - (pl.lane - camL) * CS + 20, "#fff6a8", 16); };
      const hop = (dc, dl) => {
        if (dead || pl.hop > 0) return; const nx = Math.round(pl.x) + dc, nl = pl.lane + dl;
        if (nx < 0 || nx > COLS - 1 || nl < 0) return;
        if (lanes[nl].t === "g" && lanes[nl].tr.includes(nx)) { g.sfx("thump"); return; }
        pl.fx = pl.x; pl.fl = pl.lane; pl.x = nx; pl.lane = nl; pl.hop = .11; g.sfx("tick");
        if (nl > best) { best = nl; g.score(best); } while (lanes.length < nl + 24) mk(lanes.length);
      };
      g.on(window, "keydown", e => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key, m = { ArrowUp: [0, 1], w: [0, 1], " ": [0, 1], ArrowDown: [0, -1], s: [0, -1], ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0] }[k]; if (m) hop(m[0], m[1]); });
      g.on(c, "pointerdown", e => { sx0 = e.clientX; sy0 = e.clientY; });
      g.on(c, "pointerup", e => {
        const dx = e.clientX - sx0, dy = e.clientY - sy0; if (Math.hypot(dx, dy) < 18) { hop(0, 1); return; }
        if (Math.abs(dx) > Math.abs(dy)) hop(dx > 0 ? 1 : -1, 0); else hop(0, dy < 0 ? 1 : -1);
      });
      g.loop(dt => {
        tt += dt; shake = Math.max(0, shake - dt * 25);
        if (dead) { dead += dt; if (dead > .9) { g.over(deadMsg); return false; } }
        else {
          pl.hop = Math.max(0, pl.hop - dt);
          const target = pl.lane - 4; if (target > camL) camL += (target - camL) * Math.min(1, 5 * dt);
          camL += (g.by(.14, .22, .32) + Math.min(.25, best * .002)) * dt;
          for (let i = Math.max(0, Math.floor(camL) - 1); i <= Math.min(lanes.length - 1, Math.floor(camL) + 17); i++) {
            const L = lanes[i]; if (!L.v) continue;
            for (const it of L.items) { it.x += L.v * dt; if (it.x > COLS + 3) it.x -= L.span; else if (it.x + it.w < -3) it.x += L.span; }
          }
          const L = lanes[pl.lane];
          if (L.t === "w" && pl.hop <= .03) {
            const lg = L.items.find(it => pl.x + .5 > it.x + .05 && pl.x + .5 < it.x + it.w - .05);
            if (!lg) die("Splash! Chirpy fell in."); else { pl.x += L.v * dt; if (pl.x < -.4 || pl.x > COLS - .6) die("Carried away by a log!"); }
          } else if (L.t === "r" && pl.hop <= .06) {
            for (const it of L.items) if (pl.x + .8 > it.x + .1 && pl.x + .2 < it.x + it.w - .1) { die("Splat! A car got Chirpy."); break; }
          }
          if (pl.lane < camL - .6) die("Too slow! Keep hopping.");
        }
        x.save(); shk(x, shake); x.fillStyle = "#6bd36b"; x.fillRect(-10, -10, W + 20, H + 20);
        for (let i = Math.max(0, Math.floor(camL) - 1); i <= Math.floor(camL) + 17 && i < lanes.length; i++) {
          const L = lanes[i], y = H - CS - (i - camL) * CS;
          if (L.t === "g") { x.fillStyle = i % 2 ? "#6bd36b" : "#5ec65e"; x.fillRect(0, y, W, CS); for (const tc of L.tr) { rr(x, tc * CS + 17, y + 22, 6, 14, 2, "#7a4a22"); circ(x, tc * CS + 20, y + 16, 14, "#2f9e44"); circ(x, tc * CS + 15, y + 12, 6, "#51cf66"); } }
          else if (L.t === "r") {
            x.fillStyle = "#4a4e5a"; x.fillRect(0, y, W, CS); x.fillStyle = "rgba(255,255,255,.35)"; for (let k = 0; k < COLS; k += 2) x.fillRect(k * CS + 8, y + CS - 3, 22, 2);
            for (const it of L.items) {
              const px = it.x * CS, w = it.w * CS; rr(x, px, y + 7, w, CS - 14, 8, it.col); rr(x, px + w * .25, y + 11, w * .5, CS - 22, 4, "#d0ebff");
              circ(x, L.dir > 0 ? px + w - 4 : px + 4, y + 12, 2.5, "#fff3bf"); circ(x, L.dir > 0 ? px + w - 4 : px + 4, y + CS - 12, 2.5, "#fff3bf");
            }
          } else {
            x.fillStyle = "#3aa7e8"; x.fillRect(0, y, W, CS); x.strokeStyle = "rgba(255,255,255,.3)"; x.lineWidth = 2;
            for (let k = 0; k < 6; k++) { const wx = ((k * 70 + tt * 20 * L.dir) % (W + 40) + W + 40) % (W + 40) - 20; x.beginPath(); x.arc(wx, y + 12 + (k % 3) * 9, 6, 0, Math.PI); x.stroke(); }
            for (const it of L.items) { const px = it.x * CS, w = it.w * CS; rr(x, px, y + 6, w, CS - 12, 10, "#a0642d"); rr(x, px + 4, y + 9, w - 8, 6, 3, "#c98a4b"); circ(x, px + 8, y + CS / 2, 5, "#7a4a22"); circ(x, px + w - 8, y + CS / 2, 5, "#7a4a22"); }
          }
        }
        const u = pl.hop > 0 ? 1 - pl.hop / .11 : 1, vx = pl.fx + (pl.x - pl.fx) * u, vl = pl.fl + (pl.lane - pl.fl) * u;
        const cx = vx * CS + 20, cy = H - CS - (vl - camL) * CS + 22 - Math.sin(u * Math.PI) * 10, sq = dead ? Math.min(1, dead * 3) : 0;
        x.save(); x.translate(cx, cy + sq * 10); x.scale(1 + sq * .5, 1 - sq * .7);
        circ(x, 0, 14, 12, "rgba(0,0,0,.2)"); circ(x, 0, 0, 14, "#fff3a3"); circ(x, -14, 2, 6, "#ffe066"); circ(x, 14, 2, 6, "#ffe066");
        circ(x, -5, -4, 3.5, "#fff"); circ(x, 5, -4, 3.5, "#fff"); circ(x, -5, -4.5, 1.6, "#222"); circ(x, 5, -4.5, 1.6, "#222");
        x.fillStyle = "#ff922b"; x.beginPath(); x.moveTo(-4, 2); x.lineTo(4, 2); x.lineTo(0, 8); x.fill(); x.fillStyle = "#ff5d73"; x.fillRect(-2, -16, 4, 5);
        x.restore();
        stepParts(x, parts, dt); txt(x, "Hops: " + best, W / 2, 24, 18, "#fff"); x.restore();
      });
    }
  });

  // ---- 6. Puff Glider: flap through the gates ----
  B.add({
    id: "s3-puffglider", name: "Puff Glider", ages: [6, 20], cat: "Arcade", color: "#ff8fab", icon: "P",
    desc: "Flap Puff the round bird through the candy gates without a bump.", controls: "Tap, click or press Space to flap.",
    start(g) {
      const { c, x, W, H } = g.canvas(400, 600), parts = [], gates = [];
      const GROUND = 60, BX = 110, BR = 15, GAP0 = g.by(200, 165, 140), GAPMIN = g.by(160, 130, 110), SP0 = g.by(125, 155, 185), PW = 56, GRAV = 1500, FLAP = -440;
      let y = H / 2, vy = 0, started = false, tm = 0, sc = 0, dead = 0, shake = 0, off = 0, wing = 0, lastCy = H / 2 - 30;
      const gapNow = () => Math.max(GAPMIN, GAP0 - sc * 1.2);
      const addGate = px => { const gp = gapNow(), lo = gp / 2 + 50, hi = H - GROUND - gp / 2 - 50; lastCy = g.clamp(lastCy + g.rf(-130, 130), lo, hi); gates.push({ x: px, cy: lastCy, gp, passed: false }); };
      addGate(W + 80); addGate(W + 80 + 230);
      const flap = () => { if (dead) return; started = true; vy = FLAP; wing = .2; g.sfx("swish"); burst(parts, BX - 10, y + 6, "#fff", 4, 50); };
      g.on(c, "pointerdown", flap); g.on(window, "keydown", e => { if ((e.key === " " || e.key === "ArrowUp" || e.key === "w") && !e.repeat) flap(); });
      g.loop(dt => {
        tm += dt; shake = Math.max(0, shake - dt * 25); wing = Math.max(0, wing - dt);
        const sp = SP0 + Math.min(70, sc * 3);
        if (!started) y = H / 2 + Math.sin(tm * 4) * 8;
        else if (!dead) {
          vy += GRAV * dt; y += vy * dt; off += sp * dt;
          if (y < BR) { y = BR; vy = 0; }
          for (const gt of gates) gt.x -= sp * dt;
          if (gates[0].x < -PW - 10) gates.shift();
          if (gates[gates.length - 1].x < W - 230 + 10 - Math.min(0, 0)) addGate(gates[gates.length - 1].x + 235 + Math.min(40, sc));
          for (const gt of gates) {
            if (!gt.passed && gt.x + PW < BX - BR) { gt.passed = true; sc++; g.add(1); g.sfx("note", 480 + (sc % 8) * 60); popAt(g, c, W, H, "+1", BX + 30, y - 20, "#fff"); }
            if (BX + BR - 3 > gt.x && BX - BR + 3 < gt.x + PW && (y - BR + 3 < gt.cy - gt.gp / 2 || y + BR - 3 > gt.cy + gt.gp / 2)) { dead = .001; }
          }
          if (y + BR > H - GROUND) { y = H - GROUND - BR; dead = .001; }
          if (dead) { g.sfx("boom"); shake = 12; burst(parts, BX, y, "#ffb3c6", 20, 200); }
        } else {
          dead += dt; vy += GRAV * dt; y = Math.min(H - GROUND - BR, y + vy * dt);
          if (dead > .9) { g.over("Puff bumped into a gate!"); return false; }
        }
        x.save(); shk(x, shake);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#74c0fc"); gr.addColorStop(1, "#ffe3ec"); x.fillStyle = gr; x.fillRect(-10, -10, W + 20, H + 20);
        for (let i = 0; i < 4; i++) { const cx = ((i * 190 - off * .25) % (W + 160) + W + 160) % (W + 160) - 80, cy = 90 + i * 70; circ(x, cx, cy, 24, "rgba(255,255,255,.8)"); circ(x, cx + 22, cy + 6, 18, "rgba(255,255,255,.8)"); circ(x, cx - 22, cy + 8, 16, "rgba(255,255,255,.8)"); }
        for (const gt of gates) {
          const top = gt.cy - gt.gp / 2, bot = gt.cy + gt.gp / 2;
          const draw = (py, h, capY) => {
            rr(x, gt.x, py, PW, h, 6, "#ff6b9d"); x.save(); x.beginPath(); x.roundRect(gt.x, py, PW, h, 6); x.clip(); x.fillStyle = "#fff"; for (let k = -2; k < h / 18 + 2; k++) { x.beginPath(); x.moveTo(gt.x, py + k * 18); x.lineTo(gt.x + PW, py + k * 18 - 14); x.lineTo(gt.x + PW, py + k * 18 - 6); x.lineTo(gt.x, py + k * 18 + 8); x.fill(); } x.restore();
            rr(x, gt.x - 5, capY, PW + 10, 20, 8, "#e64980");
          };
          draw(-10, top + 10, top - 20); draw(bot, H - GROUND - bot, bot);
        }
        x.fillStyle = "#8ce99a"; x.fillRect(0, H - GROUND, W, GROUND); x.fillStyle = "#51cf66"; x.fillRect(0, H - GROUND, W, 8);
        x.fillStyle = "rgba(0,0,0,.12)"; for (let k = -1; k < W / 30 + 2; k++) x.fillRect(k * 30 - (off % 30), H - GROUND + 14, 14, 6);
        x.save(); x.translate(BX, y); x.rotate(g.clamp(vy / 700, -.5, 1));
        circ(x, 0, 0, BR + 2, "#ff9eb5"); circ(x, 0, 4, BR - 3, "#ffd6e0"); circ(x, 6, -5, 5.5, "#fff"); circ(x, 8, -5, 2.6, "#222");
        x.fillStyle = "#ffa94d"; x.beginPath(); x.moveTo(14, 0); x.lineTo(24, 4); x.lineTo(14, 8); x.fill();
        x.fillStyle = "#ff6b9d"; x.beginPath(); x.ellipse(-4, 2, 9, wing > 0 ? 11 : 5, -.4, 0, T); x.fill();
        x.fillStyle = "#ff6b9d"; x.fillRect(-2, -BR - 6, 3, 6); circ(x, -.5, -BR - 7, 3, "#ff3d7f");
        x.restore();
        stepParts(x, parts, dt);
        if (!started) txt(x, "Tap to flap!", W / 2, H / 2 + 70, 26, "#fff"); else txt(x, sc, W / 2, 60, 40, "#fff");
        x.restore();
      });
    }
  });

  // ---- 7. Boing Climb: bounce up forever ----
  B.add({
    id: "s3-boingclimb", name: "Boing Climb", ages: [7, 20], cat: "Arcade", color: "#69db7c", icon: "J",
    desc: "Boing the green blob bounces up and up. Land on platforms and grab springs!", controls: "Move mouse or finger left and right, or use the arrow keys. Brown platforms crumble!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(400, 600), plats = [], parts = [];
      const G = 1500, JV = -660, SV = -1000, maxGap = g.by(88, 104, 120);
      let p = { x: W / 2, y: H - 120, vx: 0, vy: JV }, cam = 0, h = 0, tx = null, face = 1, sq = 0, shake = 0, tm = 0, topY = H - 80, prevBreak = false;
      const mkPlat = py => {
        const hh = (H - 120 - py) / 10, r = Math.random(), mv = Math.min(.3, hh / 5000 + (g.diff * .04)), br = prevBreak ? 0 : Math.min(.28, .08 + hh / 6000 + g.diff * .03);
        const t = r < br ? 2 : (r < br + mv ? 1 : 0); prevBreak = t === 2;
        plats.push({ x: g.rf(0, W - 64), y: py, w: g.by(76, 64, 54), t, v: g.rf(50, 100) * (Math.random() < .5 ? -1 : 1), sp: t === 0 && Math.random() < .1, broke: 0, fall: 0 });
      };
      plats.push({ x: W / 2 - 40, y: H - 80, w: 80, t: 0, v: 0, sp: false, broke: 0, fall: 0 });
      const fillUp = () => { while (topY > cam - 120) { const gp = g.lerp(55, maxGap, Math.min(1, h / 3000)); topY -= g.rf(gp * .6, gp); mkPlat(topY); } };
      fillUp();
      g.on(c, "pointermove", e => { tx = pos(e).x; }); g.on(c, "pointerdown", e => { tx = pos(e).x; });
      g.loop(dt => {
        tm += dt; shake = Math.max(0, shake - dt * 25); sq = Math.max(0, sq - dt * 4);
        let tv = 0; if (g.keys.ArrowLeft) tv = -340; else if (g.keys.ArrowRight) tv = 340; else if (tx !== null) tv = g.clamp((tx - p.x) * 9, -460, 460);
        p.vx = tv; if (tv) face = tv > 0 ? 1 : -1; p.x += p.vx * dt; if (p.x < -12) p.x = W + 12; if (p.x > W + 12) p.x = -12;
        const y0 = p.y; p.vy += G * dt; p.y += p.vy * dt;
        for (const pl of plats) {
          if (pl.t === 1) { pl.x += pl.v * dt; if (pl.x < 0) { pl.x = 0; pl.v = Math.abs(pl.v); } if (pl.x > W - pl.w) { pl.x = W - pl.w; pl.v = -Math.abs(pl.v); } }
          if (pl.broke) { pl.fall += dt * 500; continue; }
          if (p.vy > 0 && y0 + 16 <= pl.y + 3 && p.y + 16 >= pl.y && p.x + 10 > pl.x && p.x - 10 < pl.x + pl.w) {
            if (pl.t === 2) { pl.broke = 1; g.sfx("thump"); burst(parts, pl.x + pl.w / 2, pl.y - cam, "#c98a4b", 10); continue; }
            p.y = pl.y - 16; sq = 1;
            if (pl.sp) { p.vy = SV; g.sfx("launch"); shake = 4; burst(parts, p.x, pl.y - cam, "#ff6b6b", 10); } else { p.vy = JV; g.sfx("click"); }
          }
        }
        if (p.y < cam + H * .4) cam = p.y - H * .4;
        h = Math.max(h, (H - 120 - p.y) / 10); g.score(Math.floor(h)); fillUp();
        for (let i = plats.length - 1; i >= 0; i--) if (plats[i].y > cam + H + 80 || (plats[i].broke && plats[i].y + plats[i].fall > cam + H + 80)) plats.splice(i, 1);
        if (p.y > cam + H + 40) { g.sfx("sad"); g.over("Boing fell down!"); return false; }
        x.save(); shk(x, shake);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#5f3dc4"); gr.addColorStop(1, "#a5d8ff"); x.fillStyle = gr; x.fillRect(-10, -10, W + 20, H + 20);
        for (let i = 0; i < 18; i++) { const sx = (i * 97) % W, sy = (((i * 61) - cam * .2) % H + H) % H; x.fillStyle = "rgba(255,255,255,.35)"; x.fillRect(sx, sy, 2, 2); }
        for (const pl of plats) {
          const sy = pl.y - cam + (pl.broke ? pl.fall : 0), col = pl.t === 0 ? "#51cf66" : pl.t === 1 ? "#4dabf7" : "#b9773e"; x.globalAlpha = pl.broke ? .6 : 1;
          rr(x, pl.x, sy, pl.w, 14, 7, col); rr(x, pl.x + 4, sy + 2, pl.w - 8, 4, 2, "rgba(255,255,255,.4)");
          if (pl.t === 2) { x.strokeStyle = "#5c3a1a"; x.lineWidth = 2; x.beginPath(); x.moveTo(pl.x + pl.w * .3, sy + 1); x.lineTo(pl.x + pl.w * .4, sy + 8); x.lineTo(pl.x + pl.w * .35, sy + 13); x.stroke(); }
          if (pl.sp) { x.strokeStyle = "#868e96"; x.lineWidth = 3; x.beginPath(); for (let k = 0; k < 4; k++) { x.moveTo(pl.x + pl.w / 2 - 8, sy - k * 4); x.lineTo(pl.x + pl.w / 2 + 8, sy - k * 4 - 2); } x.stroke(); rr(x, pl.x + pl.w / 2 - 11, sy - 20, 22, 6, 3, "#ff6b6b"); }
          x.globalAlpha = 1;
        }
        const py = p.y - cam; x.save(); x.translate(p.x, py); x.scale(1 + sq * .25, 1 - sq * .25 + (p.vy < 0 ? .08 : 0));
        circ(x, 0, 0, 16, "#2f9e44"); circ(x, 0, 2, 13, "#69db7c"); circ(x, -5 + face * 2, -4, 5, "#fff"); circ(x, 5 + face * 2, -4, 5, "#fff"); circ(x, -5 + face * 3.5, -4, 2.2, "#222"); circ(x, 5 + face * 3.5, -4, 2.2, "#222");
        x.strokeStyle = "#1b6b2f"; x.lineWidth = 2; x.beginPath(); x.arc(face * 2, 4, 5, .2, Math.PI - .2); x.stroke(); rr(x, -9, 14, 6, 6, 3, "#2f9e44"); rr(x, 3, 14, 6, 6, 3, "#2f9e44"); x.restore();
        stepParts(x, parts, dt);
        if (tm < 3) txt(x, "Move left and right!", W / 2, 120, 20, "#fff");
        x.restore();
      });
    }
  });

  // ---- 8. Mini Pinball ----
  B.add({
    id: "s3-minipinball", name: "Mini Pinball", ages: [8, 20], cat: "Arcade", color: "#f06595", icon: "O",
    desc: "A tiny pinball table with bumpers, star targets and two flippers.", controls: "Left and Right arrow keys (or Z and M), or touch the left and right side. Tap to drop a ball.",
    start(g) {
      const { c, x, W, H } = g.canvas(400, 640), parts = [], R = 9, GR = g.by(520, 650, 780), FL = g.by(86, 76, 66);
      const segs = [[20, 40, 20, H], [W - 20, 40, W - 20, H], [60, 20, W - 60, 20], [20, 40, 60, 20], [W - 20, 40, W - 60, 20], [20, 470, 110, 590], [W - 20, 470, 290, 590]];
      const bumpers = [{ x: 130, y: 210, r: 26, f: 0 }, { x: 270, y: 210, r: 26, f: 0 }, { x: 200, y: 300, r: 26, f: 0 }, { x: 90, y: 360, r: 16, f: 0 }, { x: 310, y: 360, r: 16, f: 0 }];
      const targets = [80, 140, 200, 260, 320].map(px => ({ x: px, y: 110, r: 10, lit: false }));
      const fl = [{ px: 110, py: 590, side: 1, a: .55, w: 0 }, { px: 290, py: 590, side: -1, a: .55, w: 0 }];
      let ball = null, balls = g.by(5, 3, 3), mult = 1, shake = 0, wait = true, still = 0; const ptr = {};
      const hud = () => g.status("Balls: " + balls + "  x" + mult);
      const drop = () => { if (!wait) return; wait = false; ball = { x: g.rf(100, 300), y: 55, vx: g.rf(-90, 90), vy: 60 }; g.sfx("launch"); still = 0; };
      g.on(c, "pointerdown", e => { const r = c.getBoundingClientRect(); ptr[e.pointerId] = (e.clientX - r.left) < r.width / 2 ? "L" : "R"; drop(); });
      const rel = e => { delete ptr[e.pointerId]; }; g.on(c, "pointerup", rel); g.on(c, "pointercancel", rel); g.on(c, "pointerleave", rel);
      g.on(window, "keydown", e => { if (e.key === " " || e.key === "Enter") drop(); });
      const col = (b, ax, ay, bx, by, th, e, sx, sy, wv) => {
        const dx = bx - ax, dy = by - ay, t = g.clamp(((b.x - ax) * dx + (b.y - ay) * dy) / (dx * dx + dy * dy), 0, 1), qx = ax + t * dx, qy = ay + t * dy;
        let nx = b.x - qx, ny = b.y - qy; const d = Math.hypot(nx, ny); if (d >= R + th || d < 1e-6) return false;
        nx /= d; ny /= d; b.x = qx + nx * (R + th); b.y = qy + ny * (R + th);
        const vsx = sx ? sx(t) : 0, vsy = sy ? sy(t) : 0, rv = (b.vx - vsx) * nx + (b.vy - vsy) * ny;
        if (rv < 0) { b.vx -= (1 + e) * rv * nx; b.vy -= (1 + e) * rv * ny; return Math.abs(rv) > 80; } return false;
      };
      hud();
      g.loop(dt => {
        shake = Math.max(0, shake - dt * 25);
        const L = g.keys.ArrowLeft || g.keys.z || g.keys.Z || Object.values(ptr).includes("L"), Rr = g.keys.ArrowRight || g.keys.m || g.keys.M || g.keys["/"] || Object.values(ptr).includes("R");
        fl.forEach((f, i) => { const tg = (i ? Rr : L) ? -.5 : .55, old = f.a, d = 14 * dt; f.a += g.clamp(tg - f.a, -d, d); f.w = (f.a - old) / dt; });
        if (ball) {
          const h = dt / 4;
          for (let s = 0; s < 4; s++) {
            ball.vy += GR * h; const sp = Math.hypot(ball.vx, ball.vy); if (sp > 950) { ball.vx *= 950 / sp; ball.vy *= 950 / sp; }
            ball.x += ball.vx * h; ball.y += ball.vy * h;
            for (const sg of segs) col(ball, sg[0], sg[1], sg[2], sg[3], 2, .55);
            fl.forEach(f => {
              const ex = f.px + f.side * Math.cos(f.a) * FL, ey = f.py + Math.sin(f.a) * FL;
              if (col(ball, f.px, f.py, ex, ey, 7, .45, t => -f.side * t * FL * f.w * Math.sin(f.a), t => t * FL * f.w * Math.cos(f.a))) g.sfx("tick");
            });
            for (const bm of bumpers) {
              const dx = ball.x - bm.x, dy = ball.y - bm.y, d = Math.hypot(dx, dy);
              if (d < R + bm.r && d > 1e-6) { const nx = dx / d, ny = dy / d, sp2 = Math.max(430, Math.hypot(ball.vx, ball.vy)); ball.x = bm.x + nx * (R + bm.r); ball.y = bm.y + ny * (R + bm.r); ball.vx = nx * sp2; ball.vy = ny * sp2; bm.f = .15; g.add(100 * mult); g.sfx("pop"); shake = 3; burst(parts, ball.x, ball.y, "#ffe066", 8); }
            }
            for (const tg of targets) {
              const dx = ball.x - tg.x, dy = ball.y - tg.y, d = Math.hypot(dx, dy);
              if (d < R + tg.r && d > 1e-6) {
                const nx = dx / d, ny = dy / d, rv = ball.vx * nx + ball.vy * ny; ball.x = tg.x + nx * (R + tg.r); ball.y = tg.y + ny * (R + tg.r); if (rv < 0) { ball.vx -= 1.8 * rv * nx; ball.vy -= 1.8 * rv * ny; }
                if (!tg.lit) { tg.lit = true; g.add(50 * mult); g.sfx("clink"); if (targets.every(q => q.lit)) { g.add(500 * mult); mult = Math.min(5, mult + 1); targets.forEach(q => { q.lit = false; }); g.sfx("cheer"); hud(); popAt(g, c, W, H, "BONUS!", 200, 160, "#ffe066"); } }
              }
            }
          }
          still = Math.hypot(ball.vx, ball.vy) < 25 ? still + dt : 0; if (still > 3) { ball.vx = g.rf(-150, 150); ball.vy = -250; still = 0; }
          if (ball.y > H + 20) { ball = null; balls--; wait = true; mult = 1; g.sfx("wrong"); hud(); if (balls <= 0) { g.over("All balls drained!"); return false; } }
        }
        x.save(); shk(x, shake);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#26104f"); gr.addColorStop(1, "#4a1a6b"); x.fillStyle = gr; x.fillRect(-10, -10, W + 20, H + 20);
        x.strokeStyle = "#ff8fd0"; x.lineWidth = 4; x.lineCap = "round"; x.shadowColor = "#ff8fd0"; x.shadowBlur = 10; x.beginPath();
        segs.forEach(s => { x.moveTo(s[0], s[1]); x.lineTo(s[2], s[3]); }); x.stroke(); x.shadowBlur = 0;
        for (const tg of targets) { circ(x, tg.x, tg.y, tg.r, tg.lit ? "#ffe066" : "#7048a8"); x.strokeStyle = "#fff"; x.lineWidth = 2; x.beginPath(); x.arc(tg.x, tg.y, tg.r, 0, T); x.stroke(); }
        for (const bm of bumpers) { bm.f = Math.max(0, bm.f - dt); const rg = x.createRadialGradient(bm.x - 6, bm.y - 6, 2, bm.x, bm.y, bm.r); rg.addColorStop(0, bm.f > 0 ? "#fff" : "#ff8fb1"); rg.addColorStop(1, bm.f > 0 ? "#ffe066" : "#e03177"); circ(x, bm.x, bm.y, bm.r + bm.f * 20, rg); x.strokeStyle = "#fff"; x.lineWidth = 3; x.beginPath(); x.arc(bm.x, bm.y, bm.r * .6, 0, T); x.stroke(); }
        x.lineWidth = 15; x.strokeStyle = "#ffd43b"; fl.forEach(f => { x.beginPath(); x.moveTo(f.px, f.py); x.lineTo(f.px + f.side * Math.cos(f.a) * FL, f.py + Math.sin(f.a) * FL); x.stroke(); circ(x, f.px, f.py, 7, "#f59f00"); });
        if (ball) { const bg = x.createRadialGradient(ball.x - 3, ball.y - 3, 1, ball.x, ball.y, R); bg.addColorStop(0, "#fff"); bg.addColorStop(1, "#9aa5b8"); x.shadowColor = "#fff"; x.shadowBlur = 10; circ(x, ball.x, ball.y, R, bg); x.shadowBlur = 0; }
        if (wait) txt(x, "Tap or press Space to drop a ball", W / 2, 440, 18, "#fff");
        stepParts(x, parts, dt); x.restore();
      });
    }
  });

  // ---- 9. Sky Guard: shoot the grumpy comets before they reach the village ----
  B.add({
    id: "s3-skyguard", name: "Sky Guard", ages: [8, 20], cat: "Arcade", color: "#fcc419", icon: "S",
    desc: "Grumpy comets fall on your cozy village. Pop them with star bursts!", controls: "Tap or click where you want a star burst to explode. Your ammo recharges.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), houses = [], mets = [], rockets = [], booms = [], parts = [], GY = H - 40;
      [60, 140, 220, 420, 500, 580].forEach(px => houses.push({ x: px, alive: true, col: g.pick(["#ff8787", "#74c0fc", "#ffd43b", "#b197fc", "#8ce99a"]) }));
      const MAX = g.by(12, 9, 7), RECH = g.by(.7, 1, 1.4), BR = g.by(56, 46, 40);
      let ammo = MAX, rech = 0, wave = 1, toSpawn = 0, spawnT = 1, shake = 0, tm = 0, cur = null, msg = 0;
      const startWave = () => { toSpawn = Math.round((5 + wave * 3) * g.by(.8, 1, 1.2)); spawnT = 1.2; ammo = MAX; msg = 2; hud(); };
      const hud = () => g.status("Wave " + wave + "  Houses " + houses.filter(h => h.alive).length + "  Ammo " + ammo);
      const alive = () => houses.filter(h => h.alive);
      const mkMet = (px, py, tgt, split) => { const sp = g.by(30, 42, 56) + wave * 4, dx = tgt.x - px, dy = GY - py, d = Math.hypot(dx, dy); return { x: px, y: py, vx: dx / d * sp, vy: dy / d * sp, tgt, split, r: 11 }; };
      g.on(c, "pointermove", e => { cur = pos(e); });
      g.on(c, "pointerdown", e => {
        cur = pos(e); if (ammo <= 0) { g.sfx("wrong"); return; } const tp = { x: cur.x, y: Math.min(cur.y, GY - 25) };
        ammo--; hud(); g.sfx("swish"); rockets.push({ x: W / 2, y: GY - 14, tx: tp.x, ty: tp.y, a: Math.atan2(tp.y - (GY - 14), tp.x - W / 2) });
      });
      startWave();
      g.loop(dt => {
        tm += dt; shake = Math.max(0, shake - dt * 25); msg = Math.max(0, msg - dt);
        if (ammo < MAX) { rech += dt; if (rech >= RECH) { rech = 0; ammo++; hud(); } }
        if (toSpawn > 0) {
          spawnT -= dt;
          if (spawnT <= 0) { spawnT = Math.max(.5, g.by(2, 1.5, 1.1) - wave * .1) * g.rf(.7, 1.2); toSpawn--; const al = alive(); mets.push(mkMet(g.rf(30, W - 30), -12, g.pick(al), wave >= 3 && Math.random() < .2)); }
        }
        for (let i = rockets.length - 1; i >= 0; i--) {
          const r = rockets[i], d = Math.hypot(r.tx - r.x, r.ty - r.y), st = 480 * dt;
          if (d <= st) { booms.push({ x: r.tx, y: r.ty, t: 0, mr: BR }); g.sfx("boom"); rockets.splice(i, 1); } else { r.x += Math.cos(r.a) * st; r.y += Math.sin(r.a) * st; }
        }
        for (let i = booms.length - 1; i >= 0; i--) { const b = booms[i]; b.t += dt; if (b.t > .8) booms.splice(i, 1); }
        for (let i = mets.length - 1; i >= 0; i--) {
          const m = mets[i]; m.x += m.vx * dt; m.y += m.vy * dt;
          if (m.split && m.y > H * .3) { m.split = false; const al = alive(); if (al.length) { mets.push(mkMet(m.x, m.y, g.pick(al), false)); mets.push(mkMet(m.x, m.y, g.pick(al), false)); } mets.splice(i, 1); g.sfx("pop"); continue; }
          let hit = false;
          for (const b of booms) { const rad = b.mr * Math.sin(Math.min(1, b.t / .35) * Math.PI / 2) * (b.t < .35 ? 1 : Math.max(0, 1 - (b.t - .35) / .45)); if (Math.hypot(b.x - m.x, b.y - m.y) < rad + m.r) { hit = true; break; } }
          if (hit) { g.add(10); g.sfx("pop"); burst(parts, m.x, m.y, "#ffa94d", 14); popAt(g, c, W, H, "+10", m.x, m.y, "#ffe066"); booms.push({ x: m.x, y: m.y, t: 0, mr: 26 }); mets.splice(i, 1); continue; }
          if (m.y >= GY - 6) {
            mets.splice(i, 1); g.sfx("boom"); shake = 12; booms.push({ x: m.x, y: GY, t: .3, mr: 30 }); burst(parts, m.x, GY, "#ff6b6b", 18, 200);
            const h = m.tgt; if (h.alive && Math.abs(h.x - m.x) < 40) { h.alive = false; hud(); } else { const nh = alive().find(q => Math.abs(q.x - m.x) < 30); if (nh) { nh.alive = false; hud(); } }
            if (!alive().length) { g.over("The village was lost!"); return false; }
          }
        }
        if (toSpawn <= 0 && !mets.length) { const n = alive().length; g.add(25 * n); g.sfx("cheer"); popAt(g, c, W, H, "Wave clear! +" + 25 * n, W / 2, 140, "#ffe066"); wave++; startWave(); }
        x.save(); shk(x, shake);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#0b1b4d"); gr.addColorStop(1, "#6a3d9a"); x.fillStyle = gr; x.fillRect(-10, -10, W + 20, H + 20);
        for (let i = 0; i < 30; i++) { x.fillStyle = "rgba(255,255,255," + (.3 + .3 * Math.sin(tm * 2 + i)) + ")"; x.fillRect((i * 97) % W, (i * 53) % (GY - 60), 2, 2); }
        circ(x, 540, 60, 26, "#fff3bf"); circ(x, 550, 54, 22, "#0f1f55");
        x.fillStyle = "#2b8a5a"; x.fillRect(0, GY, W, H - GY); x.fillStyle = "#37b24d"; x.fillRect(0, GY, W, 6);
        for (const h of houses) {
          if (h.alive) { rr(x, h.x - 18, GY - 24, 36, 24, 3, h.col); x.fillStyle = "#c92a2a"; x.beginPath(); x.moveTo(h.x - 23, GY - 24); x.lineTo(h.x, GY - 44); x.lineTo(h.x + 23, GY - 24); x.fill(); rr(x, h.x - 5, GY - 16, 10, 12, 2, "#ffe066"); }
          else { x.fillStyle = "#495057"; x.beginPath(); x.moveTo(h.x - 18, GY); x.lineTo(h.x - 8, GY - 8); x.lineTo(h.x + 4, GY - 4); x.lineTo(h.x + 18, GY); x.fill(); }
        }
        circ(x, W / 2, GY, 20, "#adb5bd"); circ(x, W / 2, GY - 4, 13, "#dee2e6");
        if (cur) { const ang = Math.atan2(Math.min(cur.y, GY - 25) - (GY - 14), cur.x - W / 2); x.strokeStyle = "#adb5bd"; x.lineWidth = 7; x.lineCap = "round"; x.beginPath(); x.moveTo(W / 2, GY - 10); x.lineTo(W / 2 + Math.cos(ang) * 24, GY - 10 + Math.sin(ang) * 24); x.stroke(); x.strokeStyle = "rgba(255,255,255,.6)"; x.lineWidth = 1.5; x.beginPath(); x.arc(cur.x, cur.y, 10, 0, T); x.moveTo(cur.x - 14, cur.y); x.lineTo(cur.x + 14, cur.y); x.moveTo(cur.x, cur.y - 14); x.lineTo(cur.x, cur.y + 14); x.stroke(); }
        for (const r of rockets) { x.strokeStyle = "rgba(255,255,255,.5)"; x.lineWidth = 2; x.beginPath(); x.moveTo(r.x, r.y); x.lineTo(r.x - Math.cos(r.a) * 22, r.y - Math.sin(r.a) * 22); x.stroke(); circ(x, r.x, r.y, 4, "#ffe066"); }
        for (const m of mets) {
          const an = Math.atan2(m.vy, m.vx); x.strokeStyle = "rgba(255,150,60,.6)"; x.lineWidth = 8; x.lineCap = "round"; x.beginPath(); x.moveTo(m.x, m.y); x.lineTo(m.x - Math.cos(an) * 28, m.y - Math.sin(an) * 28); x.stroke();
          circ(x, m.x, m.y, m.r, m.split ? "#9775fa" : "#8d6e63"); circ(x, m.x - 4, m.y - 2, 3, "#fff"); circ(x, m.x + 4, m.y - 2, 3, "#fff"); circ(x, m.x - 4, m.y - 1, 1.4, "#222"); circ(x, m.x + 4, m.y - 1, 1.4, "#222");
          x.strokeStyle = "#3e2723"; x.lineWidth = 2; x.beginPath(); x.moveTo(m.x - 7, m.y - 7); x.lineTo(m.x - 2, m.y - 4); x.moveTo(m.x + 7, m.y - 7); x.lineTo(m.x + 2, m.y - 4); x.stroke();
        }
        for (const b of booms) { const f = b.t < .35 ? Math.sin(b.t / .35 * Math.PI / 2) : Math.max(0, 1 - (b.t - .35) / .45), rad = b.mr * f; if (rad > 1) { const rg = x.createRadialGradient(b.x, b.y, 1, b.x, b.y, rad); rg.addColorStop(0, "rgba(255,255,255,.9)"); rg.addColorStop(.5, "rgba(255,214,70,.8)"); rg.addColorStop(1, "rgba(255,110,60,.2)"); circ(x, b.x, b.y, rad, rg); } }
        stepParts(x, parts, dt);
        if (msg > 0) txt(x, "Wave " + wave, W / 2, 80, 30, "rgba(255,255,255," + Math.min(1, msg) + ")");
        x.restore();
      });
    }
  });

  // ---- 10. Rocky Snake: snake with rocks and golden stars ----
  B.add({
    id: "s3-rockysnake", name: "Rocky Snake", ages: [8, 20], cat: "Arcade", color: "#94d82d", icon: "S",
    desc: "A snake game with growing rock piles. Grab golden stars to shrink your tail!", controls: "Arrow keys or WASD, or swipe or tap on the board. Press a key to start.",
    start(g) {
      const N = 20, { c, x, W, H } = g.canvas(600, 600), cell = W / N, parts = [];
      let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }], dir = { x: 1, y: 0 }, q = [], rocks = [], apple = null, star = null, starT = 0, acc = 0, started = false, eaten = 0, shake = 0, tm = 0, sx0 = 0, sy0 = 0;
      let speed = g.by(.17, .13, .1); const minSp = g.by(.1, .075, .055);
      const free = (px, py) => !snake.some(s => s.x === px && s.y === py) && !rocks.some(r => r.x === px && r.y === py) && !(apple && apple.x === px && apple.y === py) && !(star && star.x === px && star.y === py);
      const spot = far => { for (let k = 0; k < 300; k++) { const p = { x: g.ri(0, N - 1), y: g.ri(0, N - 1) }; if (free(p.x, p.y) && (!far || (Math.abs(p.x - snake[0].x) + Math.abs(p.y - snake[0].y) > 5 && p.y !== snake[0].y))) return p; } return null; };
      const hud = () => g.status("Length " + snake.length + "  Rocks " + rocks.length);
      for (let i = 0; i < g.by(0, 4, 8); i++) { const p = spot(true); if (p) rocks.push(p); }
      apple = spot(false); hud();
      const turn = (dx, dy) => { const last = q.length ? q[q.length - 1] : dir; if ((dx === -last.x && dy === -last.y) || (dx === last.x && dy === last.y)) { started = true; return; } if (q.length < 2) q.push({ x: dx, y: dy }); started = true; };
      g.on(window, "keydown", e => { const m = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1], a: [-1, 0], d: [1, 0], w: [0, -1], s: [0, 1] }[e.key]; if (m) turn(m[0], m[1]); });
      g.on(c, "pointerdown", e => { sx0 = e.clientX; sy0 = e.clientY; });
      g.on(c, "pointerup", e => {
        let dx = e.clientX - sx0, dy = e.clientY - sy0;
        if (Math.hypot(dx, dy) < 20) { const r = c.getBoundingClientRect(); dx = e.clientX - (r.left + (snake[0].x + .5) * cell * r.width / W); dy = e.clientY - (r.top + (snake[0].y + .5) * cell * r.height / H); }
        if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 1 : -1, 0); else turn(0, dy > 0 ? 1 : -1);
      });
      const crash = msg => { shake = 14; g.sfx("boom"); burst(parts, (snake[0].x + .5) * cell, (snake[0].y + .5) * cell, "#b2f2bb", 20, 200); g.over(msg); };
      g.loop(dt => {
        tm += dt; shake = Math.max(0, shake - dt * 25);
        if (star) { starT -= dt; if (starT <= 0) star = null; }
        if (started) acc += dt;
        if (acc >= speed) {
          acc = 0; if (q.length) dir = q.shift(); let hx = snake[0].x + dir.x, hy = snake[0].y + dir.y;
          if (g.diff === 2 && (hx < 0 || hy < 0 || hx >= N || hy >= N)) { crash("Bonk! You hit the wall."); return false; }
          hx = (hx + N) % N; hy = (hy + N) % N;
          const eatA = apple && hx === apple.x && hy === apple.y, body = eatA ? snake : snake.slice(0, -1);
          if (body.some(s => s.x === hx && s.y === hy)) { crash("Oops, you bit yourself!"); return false; }
          if (rocks.some(r => r.x === hx && r.y === hy)) { crash("Crunch! You hit a rock."); return false; }
          snake.unshift({ x: hx, y: hy });
          if (eatA) {
            eaten++; g.add(10); g.sfx("pop"); burst(parts, (hx + .5) * cell, (hy + .5) * cell, "#ff6b6b", 10); apple = null; apple = spot(false);
            if (!apple) { g.win("The board is full. Amazing!"); return false; }
            if (eaten % 3 === 0 && rocks.length < 25) { const p = spot(true); if (p) rocks.push(p); }
            if (eaten % 5 === 0) speed = Math.max(minSp, speed * .92);
            if (eaten % 4 === 0 && !star) { star = spot(false); starT = 6; }
          } else snake.pop();
          if (star && hx === star.x && hy === star.y) { g.add(30); g.sfx("star"); burst(parts, (hx + .5) * cell, (hy + .5) * cell, "#ffe066", 16); star = null; for (let k = 0; k < 2 && snake.length > 3; k++) snake.pop(); }
          hud();
        }
        x.save(); shk(x, shake);
        x.fillStyle = "#2f7d3a"; x.fillRect(-10, -10, W + 20, H + 20);
        for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if ((i + j) % 2) { x.fillStyle = "rgba(255,255,255,.07)"; x.fillRect(i * cell, j * cell, cell, cell); }
        if (g.diff === 2) { x.strokeStyle = "#e03131"; x.lineWidth = 6; x.strokeRect(3, 3, W - 6, H - 6); }
        for (const r of rocks) { const cx = (r.x + .5) * cell, cy = (r.y + .5) * cell; circ(x, cx, cy + 2, cell * .42, "#495057"); circ(x, cx, cy, cell * .4, "#adb5bd"); circ(x, cx - 5, cy - 5, cell * .14, "#dee2e6"); }
        if (apple) { const cx = (apple.x + .5) * cell, cy = (apple.y + .5) * cell; circ(x, cx, cy + 1, cell * .36, "#ff4d6d"); circ(x, cx - 4, cy - 4, 3.5, "rgba(255,255,255,.6)"); x.fillStyle = "#51cf66"; x.beginPath(); x.ellipse(cx + 5, cy - cell * .34, 6, 3, -.5, 0, T); x.fill(); }
        if (star) {
          const cx = (star.x + .5) * cell, cy = (star.y + .5) * cell, pu = 1 + Math.sin(tm * 8) * .12; x.fillStyle = starT < 2 && Math.floor(tm * 8) % 2 ? "#fff3bf" : "#ffd43b"; x.beginPath();
          for (let k = 0; k < 10; k++) { const rad = (k % 2 ? cell * .18 : cell * .44) * pu, an = -Math.PI / 2 + k * Math.PI / 5; x[k ? "lineTo" : "moveTo"](cx + Math.cos(an) * rad, cy + Math.sin(an) * rad); } x.closePath(); x.fill();
        }
        snake.forEach((s, i) => { x.fillStyle = i === 0 ? "#d8f5a2" : `hsl(${90 + Math.min(i, 30) * 2},60%,${50 - Math.min(i, 20) * .6}%)`; x.beginPath(); x.roundRect(s.x * cell + 2, s.y * cell + 2, cell - 4, cell - 4, i === 0 ? 11 : 8); x.fill(); });
        const hd = snake[0], hx2 = (hd.x + .5) * cell, hy2 = (hd.y + .5) * cell, px2 = -dir.y * 6, py2 = dir.x * 6;
        circ(x, hx2 + dir.x * 4 + px2, hy2 + dir.y * 4 + py2, 5, "#fff"); circ(x, hx2 + dir.x * 4 - px2, hy2 + dir.y * 4 - py2, 5, "#fff");
        circ(x, hx2 + dir.x * 6 + px2, hy2 + dir.y * 6 + py2, 2.4, "#222"); circ(x, hx2 + dir.x * 6 - px2, hy2 + dir.y * 6 - py2, 2.4, "#222");
        stepParts(x, parts, dt);
        if (!started) { rr(x, W / 2 - 190, H / 2 + 40, 380, 44, 12, "rgba(0,0,0,.55)"); txt(x, "Press an arrow key, tap or swipe to start", W / 2, H / 2 + 69, 20, "#fff"); }
        x.restore();
      });
    }
  });

  // ---- 11. Pip's Rain Dodge: dodge the falling things ----
  B.add({
    id: "s3-pipdodge", name: "Pip's Dodge Dash", ages: [5, 14], cat: "Arcade", color: "#38d9a9", icon: "D",
    desc: "Slide Pip the robot left and right. Dodge the rocks, grab coins and hearts!", controls: "Drag your finger or mouse, or use the arrow keys.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(480, 600), things = [], parts = [], PY = H - 54, GY = H - 24;
      let px = W / 2, tx = W / 2, lives = 3, inv = 0, spawn = 1, tm = 0, slow = 0, shake = 0, sq = 0, coins = 0, dodged = 0, lean = 0;
      const hud = () => g.status("Lives: " + lives + (slow > 0 ? "  Slow time!" : ""));
      hud();
      g.on(c, "pointermove", e => { tx = pos(e).x; }); g.on(c, "pointerdown", e => { tx = pos(e).x; });
      g.loop(dt => {
        tm += dt; shake = Math.max(0, shake - dt * 25); inv = Math.max(0, inv - dt); sq = Math.max(0, sq - dt * 5);
        if (slow > 0) { slow -= dt; if (slow <= 0) hud(); }
        if (g.keys.ArrowLeft) tx -= 520 * dt; if (g.keys.ArrowRight) tx += 520 * dt; tx = g.clamp(tx, 24, W - 24);
        const ox = px; px += g.clamp(tx - px, -560 * dt, 560 * dt); lean = g.lerp(lean, g.clamp((px - ox) / (dt * 560), -1, 1), .2);
        spawn -= dt;
        if (spawn <= 0) {
          spawn = Math.max(.17, g.by(.8, .6, .45) - tm * .004) * g.rf(.7, 1.2);
          const r = Math.random(), vb = (g.by(180, 230, 280) + Math.min(200, tm * 3)) * g.rf(.85, 1.25);
          let k = "rock"; if (r < .18) k = "coin"; else if (r < .21 && lives < 3) k = "heart"; else if (r < .24) k = "clock"; else if (r < .5) k = "spike"; else if (r < .65) k = "ice";
          const rad = k === "rock" ? g.rf(17, 28) : k === "spike" ? 17 : k === "ice" ? 14 : 13;
          things.push({ k, x: g.rf(rad, W - rad), y: -rad, vy: vb * (k === "spike" ? 1.25 : 1), r: rad, a: 0, ph: g.rf(0, 6), bx: 0 });
          things[things.length - 1].bx = things[things.length - 1].x;
        }
        const sf = slow > 0 ? .5 : 1;
        for (let i = things.length - 1; i >= 0; i--) {
          const t = things[i]; t.y += t.vy * sf * dt; t.a += dt * 3;
          if (t.k === "ice") t.x = t.bx + Math.sin(tm * 3 + t.ph) * 28;
          const good = t.k === "coin" || t.k === "heart" || t.k === "clock";
          if (Math.hypot(t.x - px, t.y - PY) < t.r + 17 - (good ? -6 : 3)) {
            if (good) {
              if (t.k === "coin") { coins++; g.add(10); g.sfx("clink"); popAt(g, c, W, H, "+10", t.x, t.y, "#ffe066"); }
              else if (t.k === "heart") { lives = Math.min(3, lives + 1); g.sfx("cheer"); hud(); popAt(g, c, W, H, "+1 life", t.x, t.y, "#ff8fab"); }
              else { slow = 5; g.sfx("star"); hud(); popAt(g, c, W, H, "Slow time!", t.x, t.y, "#74c0fc"); }
              burst(parts, t.x, t.y, "#ffe066", 8); things.splice(i, 1); continue;
            }
            if (inv <= 0) {
              lives--; inv = 1.5; shake = 12; sq = 1; g.sfx("boom"); hud(); burst(parts, px, PY, "#ff8787", 16);
              if (lives <= 0) { g.over("Pip got bonked! Coins: " + coins); return false; }
            }
            things.splice(i, 1); continue;
          }
          if (t.y > GY) { if (!good) { g.add(1); dodged++; burst(parts, t.x, GY, "#adb5bd", 6, 90); g.sfx("tick"); } things.splice(i, 1); }
        }
        x.save(); shk(x, shake);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#ffa94d"); gr.addColorStop(.6, "#ffd8a8"); gr.addColorStop(1, "#fff3bf"); x.fillStyle = gr; x.fillRect(-10, -10, W + 20, H + 20);
        circ(x, 380, 110, 44, "rgba(255,255,255,.5)"); circ(x, 380, 110, 30, "#fff3bf");
        x.fillStyle = "#74c69d"; x.fillRect(0, GY, W, H - GY); x.fillStyle = "#40916c"; x.fillRect(0, GY, W, 5);
        for (const t of things) { if (t.k === "coin" || t.k === "heart" || t.k === "clock") continue; x.fillStyle = "rgba(0,0,0," + g.clamp(t.y / H * .35, 0, .35) + ")"; x.beginPath(); x.ellipse(t.x, GY + 5, t.r * g.clamp(t.y / H, .2, 1), 4, 0, 0, T); x.fill(); }
        for (const t of things) {
          x.save(); x.translate(t.x, t.y);
          if (t.k === "rock") { x.rotate(t.a * .3); circ(x, 0, 0, t.r, "#868e96"); circ(x, -t.r * .3, -t.r * .3, t.r * .5, "#adb5bd"); circ(x, t.r * .3, t.r * .2, t.r * .15, "#5c636a"); }
          else if (t.k === "spike") { x.rotate(t.a); x.fillStyle = "#c92a2a"; x.beginPath(); for (let k = 0; k < 16; k++) { const rad = k % 2 ? t.r * .7 : t.r * 1.15, an = k * Math.PI / 8; x[k ? "lineTo" : "moveTo"](Math.cos(an) * rad, Math.sin(an) * rad); } x.closePath(); x.fill(); circ(x, 0, 0, t.r * .55, "#343a40"); }
          else if (t.k === "ice") { x.rotate(t.a * .5); x.fillStyle = "#a5d8ff"; x.beginPath(); x.moveTo(0, -t.r * 1.2); x.lineTo(t.r * .8, 0); x.lineTo(0, t.r * 1.2); x.lineTo(-t.r * .8, 0); x.closePath(); x.fill(); x.strokeStyle = "#fff"; x.lineWidth = 2; x.stroke(); }
          else if (t.k === "coin") { x.scale(Math.abs(Math.cos(t.a)) * .8 + .2, 1); circ(x, 0, 0, t.r, "#fcc419"); circ(x, 0, 0, t.r * .65, "#ffe066"); }
          else if (t.k === "heart") { x.fillStyle = "#ff4d6d"; x.beginPath(); x.moveTo(0, t.r * .9); x.bezierCurveTo(-t.r * 1.6, -t.r * .2, -t.r * .6, -t.r * 1.2, 0, -t.r * .4); x.bezierCurveTo(t.r * .6, -t.r * 1.2, t.r * 1.6, -t.r * .2, 0, t.r * .9); x.fill(); }
          else { circ(x, 0, 0, t.r, "#74c0fc"); circ(x, 0, 0, t.r * .8, "#fff"); x.strokeStyle = "#1c7ed6"; x.lineWidth = 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -t.r * .6); x.moveTo(0, 0); x.lineTo(t.r * .4, t.r * .2); x.stroke(); }
          x.restore();
        }
        if (inv <= 0 || Math.floor(tm * 14) % 2) {
          x.save(); x.translate(px, PY + 8); x.rotate(lean * .15); x.scale(1 + sq * .3, 1 - sq * .3);
          circ(x, 0, 18, 14, "rgba(0,0,0,.0)"); rr(x, -17, -16, 34, 32, 10, "#4dabf7"); rr(x, -13, -12, 26, 14, 6, "#d0ebff");
          circ(x, -6, -5, 4, "#fff"); circ(x, 6, -5, 4, "#fff"); circ(x, -6 + lean * 2, -5, 2, "#222"); circ(x, 6 + lean * 2, -5, 2, "#222");
          x.strokeStyle = "#1864ab"; x.lineWidth = 2; x.beginPath(); x.moveTo(0, -16); x.lineTo(0, -24); x.stroke(); circ(x, 0, -26, 3.5, "#ff6b6b");
          rr(x, -12, 14, 8, 8, 3, "#1c7ed6"); rr(x, 4, 14, 8, 8, 3, "#1c7ed6"); x.restore();
        }
        stepParts(x, parts, dt); x.restore();
      });
    }
  });

  // ---- 12. Goo Survivors: bullet-heaven survival ----
  B.add({
    id: "s3-goosurvivors", name: "Goo Survivors", ages: [11, 20], cat: "Arcade", color: "#845ef7", icon: "Z",
    desc: "Zippy zaps endless silly goo blobs. Collect gems, level up and survive the clock!", controls: "Move with arrow keys or WASD, or hold and drag. Zippy shoots by itself. Pick upgrades with a tap or keys 1 2 3.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 420), en = [], bul = [], gems = [], parts = [];
      const TOTAL = g.by(120, 150, 180), P = { x: W / 2, y: H / 2, hp: 5, max: 5, spd: 150, inv: 0 };
      let fireCd = .7, rate = .7, shots = 1, orbs = 0, dmg = 1, magnet = 60, xp = 0, need = 5, lvl = 1, surv = 0, spawn = 1, kills = 0, shake = 0, state = "play", cards = [], ptr = null, tm = 0, lastS = "";
      const UP = [
        { n: "Rapid Sparkle", d: "Shoot 20% faster", f: () => { rate *= .8; } },
        { n: "Double Shot", d: "One more sparkle per shot", f: () => { shots++; } },
        { n: "Orbit Orb", d: "A bouncy orb circles you", f: () => { orbs++; } },
        { n: "Power Up", d: "Sparkles hit harder", f: () => { dmg++; } },
        { n: "Swift Shoes", d: "Move 12% faster", f: () => { P.spd *= 1.12; } },
        { n: "Gem Magnet", d: "Gems fly to you from farther", f: () => { magnet += 50; } },
        { n: "Big Heart", d: "Heal 2 hearts", f: () => { P.hp = Math.min(P.max, P.hp + 2); } }
      ];
      const hud = () => { const s = "HP " + P.hp + "/" + P.max + "  Lv " + lvl + "  Time " + Math.max(0, Math.ceil(TOTAL - surv)) + "s"; if (s !== lastS) { lastS = s; g.status(s); } };
      const choose = i => { if (state !== "up" || !cards[i]) return; cards[i].f(); g.sfx("star"); state = "play"; cards = []; hud(); };
      g.on(window, "keydown", e => { if (e.key === "1" || e.key === "2" || e.key === "3") choose(+e.key - 1); });
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        if (state === "up") { cards.forEach((cd, i) => { const cx = 40 + i * 190; if (p.x > cx && p.x < cx + 170 && p.y > 110 && p.y < 300) choose(i); }); return; }
        ptr = p;
      });
      g.on(c, "pointermove", e => { if (ptr) ptr = pos(e); });
      const end = () => { ptr = null; }; g.on(c, "pointerup", end); g.on(c, "pointercancel", end); g.on(c, "pointerleave", end);
      const kill = (e, i) => {
        en.splice(i, 1); kills++; g.add(1); g.sfx("pop"); burst(parts, e.x, e.y, e.col, 8, 120); gems.push({ x: e.x, y: e.y, v: e.big ? 3 : 1 });
      };
      hud();
      g.loop(dt => {
        tm += dt; shake = Math.max(0, shake - dt * 25);
        if (state === "up") {
          x.fillStyle = "rgba(10,5,40,.8)"; x.fillRect(0, 0, W, H); txt(x, "Level up! Pick a power", W / 2, 80, 26, "#ffe066");
          cards.forEach((cd, i) => { const cx = 40 + i * 190; rr(x, cx, 110, 170, 190, 14, "#5f3dc4"); rr(x, cx + 6, 116, 158, 178, 10, "#7950f2"); txt(x, String(i + 1), cx + 85, 150, 26, "#ffe066"); txt(x, cd.n, cx + 85, 195, 18, "#fff"); txt(x, cd.d, cx + 85, 240, 13, "#e5dbff"); });
          return;
        }
        surv += dt; P.inv = Math.max(0, P.inv - dt);
        if (surv >= TOTAL) { g.add(100 + P.hp * 20); g.win("Zippy survived the goo! Zapped: " + kills); return false; }
        let mx = 0, my = 0; if (g.keys.ArrowLeft) mx--; if (g.keys.ArrowRight) mx++; if (g.keys.ArrowUp) my--; if (g.keys.ArrowDown) my++;
        if (!mx && !my && ptr) { const dx = ptr.x - P.x, dy = ptr.y - P.y, d = Math.hypot(dx, dy); if (d > 8) { mx = dx / d; my = dy / d; } }
        const ml = Math.hypot(mx, my) || 1; P.x = g.clamp(P.x + mx / ml * P.spd * dt, 14, W - 14); P.y = g.clamp(P.y + my / ml * P.spd * dt, 14, H - 14);
        spawn -= dt;
        if (spawn <= 0 && en.length < 160) {
          spawn = Math.max(.1, g.by(.75, .55, .4) * (1 - surv / TOTAL * .7));
          for (let n = 0; n < (surv > TOTAL * .4 ? 2 : 1); n++) {
            const sd = g.ri(0, 3), ex = sd === 0 ? -20 : sd === 1 ? W + 20 : g.rf(0, W), ey = sd === 2 ? -20 : sd === 3 ? H + 20 : g.rf(0, H), r = Math.random(), hs = 1 + surv / 100;
            if (surv > 40 && r < .12) en.push({ x: ex, y: ey, r: 15, hp: Math.ceil(6 * hs), sp: 38, col: "#ff7aa8", big: true, hc: 0, fl: 0 });
            else if (surv > 20 && r < .3) en.push({ x: ex, y: ey, r: 7, hp: Math.ceil(hs), sp: 95 + surv * .2, col: "#ffd54a", big: false, hc: 0, fl: 0 });
            else en.push({ x: ex, y: ey, r: 9, hp: Math.ceil(hs), sp: 55 + surv * .25, col: "#7ee081", big: false, hc: 0, fl: 0 });
          }
        }
        fireCd -= dt;
        if (fireCd <= 0 && en.length) {
          let best = null, bd = 1e9; for (const e of en) { const d = (e.x - P.x) ** 2 + (e.y - P.y) ** 2; if (d < bd) { bd = d; best = e; } }
          const a0 = Math.atan2(best.y - P.y, best.x - P.x);
          for (let i = 0; i < shots; i++) { const a = a0 + (i - (shots - 1) / 2) * .16; bul.push({ x: P.x, y: P.y, vx: Math.cos(a) * 400, vy: Math.sin(a) * 400, life: 1.2 }); }
          fireCd = rate; g.sfx("tick");
        }
        for (let i = bul.length - 1; i >= 0; i--) {
          const b = bul[i]; b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt; let used = false;
          if (b.life <= 0) { bul.splice(i, 1); continue; }
          for (let k = en.length - 1; k >= 0; k--) { const e = en[k]; if (Math.hypot(e.x - b.x, e.y - b.y) < e.r + 4) { e.hp -= dmg; e.fl = .1; used = true; if (e.hp <= 0) kill(e, k); break; } }
          if (used) bul.splice(i, 1);
        }
        for (let k = en.length - 1; k >= 0; k--) {
          const e = en[k]; e.hc = Math.max(0, e.hc - dt); e.fl = Math.max(0, e.fl - dt);
          const dx = P.x - e.x, dy = P.y - e.y, d = Math.hypot(dx, dy) || 1; e.x += dx / d * e.sp * dt; e.y += dy / d * e.sp * dt;
          let dead = false;
          for (let o = 0; o < orbs; o++) { const a = tm * 2.6 + o * T / orbs, ox = P.x + Math.cos(a) * 48, oy = P.y + Math.sin(a) * 48; if (e.hc <= 0 && Math.hypot(e.x - ox, e.y - oy) < e.r + 9) { e.hp -= dmg; e.hc = .45; e.fl = .1; if (e.hp <= 0) { kill(e, k); dead = true; break; } } }
          if (dead) continue;
          if (d < e.r + 10 && P.inv <= 0) {
            P.hp--; P.inv = 1; shake = 10; g.sfx("wrong"); e.x -= dx / d * 30; e.y -= dy / d * 30; burst(parts, P.x, P.y, "#ff8787", 10); hud();
            if (P.hp <= 0) { g.over("The goo got Zippy! Zapped: " + kills); return false; }
          }
        }
        for (let i = gems.length - 1; i >= 0; i--) {
          const m = gems[i], dx = P.x - m.x, dy = P.y - m.y, d = Math.hypot(dx, dy);
          if (d < magnet) { m.x += dx / d * 260 * dt; m.y += dy / d * 260 * dt; }
          if (d < 14) {
            gems.splice(i, 1); xp += m.v; g.sfx("note", 600 + Math.min(300, xp * 30));
            if (xp >= need) { xp -= need; need += 3; lvl++; g.sfx("cheer"); const pool = UP.filter(u => u.n !== "Big Heart" || P.hp < P.max); cards = g.shuffle(pool).slice(0, 3); state = "up"; ptr = null; hud(); }
          }
        }
        hud();
        x.save(); shk(x, shake);
        const gr = x.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, 400); gr.addColorStop(0, "#2b2063"); gr.addColorStop(1, "#120b33"); x.fillStyle = gr; x.fillRect(-10, -10, W + 20, H + 20);
        x.strokeStyle = "rgba(255,255,255,.05)"; x.lineWidth = 1; for (let k = 0; k < W; k += 40) { x.beginPath(); x.moveTo(k, 0); x.lineTo(k, H); x.stroke(); } for (let k = 0; k < H; k += 40) { x.beginPath(); x.moveTo(0, k); x.lineTo(W, k); x.stroke(); }
        for (const m of gems) { x.fillStyle = m.v > 1 ? "#ffd43b" : "#4dd4ff"; x.beginPath(); x.moveTo(m.x, m.y - 6); x.lineTo(m.x + 5, m.y); x.lineTo(m.x, m.y + 6); x.lineTo(m.x - 5, m.y); x.closePath(); x.fill(); }
        for (const e of en) {
          const wob = 1 + Math.sin(tm * 8 + e.x) * .08; x.save(); x.translate(e.x, e.y); x.scale(1 / wob, wob);
          circ(x, 0, 0, e.r, e.fl > 0 ? "#fff" : e.col); circ(x, -e.r * .3, -e.r * .25, e.r * .3, "#fff"); circ(x, e.r * .3, -e.r * .25, e.r * .3, "#fff"); circ(x, -e.r * .3, -e.r * .2, e.r * .13, "#222"); circ(x, e.r * .3, -e.r * .2, e.r * .13, "#222"); x.restore();
        }
        for (const b of bul) { x.shadowColor = "#ffe066"; x.shadowBlur = 8; circ(x, b.x, b.y, 4, "#fff3bf"); } x.shadowBlur = 0;
        for (let o = 0; o < orbs; o++) { const a = tm * 2.6 + o * T / orbs; x.shadowColor = "#ff8fd0"; x.shadowBlur = 10; circ(x, P.x + Math.cos(a) * 48, P.y + Math.sin(a) * 48, 9, "#ffc9ea"); x.shadowBlur = 0; }
        if (P.inv <= 0 || Math.floor(tm * 14) % 2) {
          circ(x, P.x, P.y + 12, 10, "rgba(0,0,0,.25)"); circ(x, P.x, P.y, 12, "#fff"); circ(x, P.x - 4, P.y - 2, 3.2, "#222"); circ(x, P.x + 4, P.y - 2, 3.2, "#222");
          x.fillStyle = "#ff5d73"; x.beginPath(); x.moveTo(P.x - 10, P.y - 8); x.lineTo(P.x, P.y - 24); x.lineTo(P.x + 10, P.y - 8); x.closePath(); x.fill(); circ(x, P.x, P.y - 24, 3, "#ffe066");
        }
        rr(x, 0, 0, W, 8, 0, "rgba(255,255,255,.15)"); rr(x, 0, 0, W * g.clamp(xp / need, 0, 1), 8, 0, "#4dd4ff");
        rr(x, 0, H - 6, W, 6, 0, "rgba(255,255,255,.15)"); rr(x, 0, H - 6, W * g.clamp(surv / TOTAL, 0, 1), 6, 0, "#ffe066");
        stepParts(x, parts, dt); x.restore();
      });
    }
  });
})();
