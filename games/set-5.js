// Break Time Games: set 5 (Puzzle games)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---- small shared helpers (drawing text, rounded boxes, particles, swipes) ----
  const TXT = (x, s, px, py, size, col, al) => { x.font = "bold " + size + "px system-ui, sans-serif"; x.textAlign = al || "center"; x.textBaseline = "middle"; x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  const RR = (x, a, b, w, h, r) => { x.beginPath(); x.roundRect(a, b, Math.max(0, w), Math.max(0, h), Math.max(0, r)); };
  const POP = (g, k, t, lx, ly, col) => g.pop(t, lx * k.c.clientWidth / k.W, ly * k.c.clientHeight / k.H, col);
  const mkParts = () => {
    const a = [];
    return {
      add(px, py, col, n, sp) { for (let i = 0; i < n; i++) { const an = Math.random() * 6.283, v = (sp || 140) * (.3 + Math.random()); a.push({ x: px, y: py, vx: Math.cos(an) * v, vy: Math.sin(an) * v - 30, life: .5 + Math.random() * .4, col, s: 3 + Math.random() * 4 }); } },
      draw(x, dt) { for (let i = a.length - 1; i >= 0; i--) { const p = a[i]; p.life -= dt; if (p.life <= 0) { a.splice(i, 1); continue; } p.vy += 300 * dt; p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.min(1, p.life * 2); x.fillStyle = p.col; x.fillRect(p.x - p.s / 2, p.y - p.s / 2, p.s, p.s); } x.globalAlpha = 1; }
    };
  };
  // swipe on a canvas: fn(dir) with 0 left, 1 right, 2 up, 3 down
  const swipeOn = (g, c, fn) => {
    let sx = 0, sy = 0, on = false;
    g.on(c, "pointerdown", e => { sx = e.clientX; sy = e.clientY; on = true; });
    g.on(c, "pointerup", e => { if (!on) return; on = false; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.hypot(dx, dy) < 24) return; fn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 0) : (dy > 0 ? 3 : 2)); });
  };
  const bgStars = (x, W, H, t, n) => { for (let i = 0; i < n; i++) { x.globalAlpha = .25 + .25 * Math.sin(t * 2 + i * 7); x.fillStyle = "#fff"; x.fillRect((i * 97 + 31) % W, (i * 53 + 17) % H, 2, 2); } x.globalAlpha = 1; };

  // ---- Glow Tiles: slide and merge to reach the goal tile ----
  B.add({
    id: "s5-glowtiles", name: "Glow Tiles", ages: [8, 20], cat: "Puzzle", color: "#ffb347", icon: "24",
    desc: "Slide the glowing tiles. Matching tiles merge into bigger ones!", controls: "Arrow keys or WASD, or swipe on the board",
    start(g) {
      const k = g.canvas(600, 600), { c, x, W, H } = k, N = g.by(5, 4, 4), GOAL = g.by(512, 1024, 2048), PAD = 14, cs = (W - PAD * 2) / N, parts = mkParts();
      const grid = Array.from({ length: N }, () => Array(N).fill(0)), fx = Array.from({ length: N }, () => Array(N).fill(0));
      let moves = [], anim = 1, done = false, shake = 0, top = 2, tt = 0;
      const spawn = () => {
        const e = []; grid.forEach((r, i) => r.forEach((v, j) => { if (!v) e.push([i, j]); }));
        if (!e.length) return; const p = g.pick(e); grid[p[0]][p[1]] = Math.random() < g.by(.08, .1, .2) ? 4 : 2; fx[p[0]][p[1]] = -1;
      };
      const hasMove = () => { for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { if (!grid[i][j]) return true; if (j + 1 < N && grid[i][j] === grid[i][j + 1]) return true; if (i + 1 < N && grid[i + 1] && grid[i][j] === grid[i + 1][j]) return true; } return false; };
      const sig = () => grid.map(r => r.join()).join("|");
      const mv = d => {
        if (done) return;
        const before = sig(), ms = []; let gain = 0;
        for (let i = 0; i < N; i++) {
          const line = []; for (let j = 0; j < N; j++) line.push(d === 0 ? [i, j] : d === 1 ? [i, N - 1 - j] : d === 2 ? [j, i] : [N - 1 - j, i]);
          const out = [];
          for (const q of line) {
            const v = grid[q[0]][q[1]]; if (!v) continue;
            const t = out[out.length - 1];
            if (t && !t.m && t.v === v) { t.v *= 2; t.m = true; gain += t.v; ms.push({ v, fr: q, to: line[out.length - 1] }); }
            else { out.push({ v, m: false }); ms.push({ v, fr: q, to: line[out.length - 1] }); }
          }
          line.forEach((q, j) => { grid[q[0]][q[1]] = out[j] ? out[j].v : 0; if (out[j] && out[j].m) { fx[q[0]][q[1]] = 1; parts.add(PAD + (q[1] + .5) * cs, PAD + (q[0] + .5) * cs, "#fff3b0", 8, 160); } });
        }
        if (sig() === before) { g.sfx("back"); return; }
        spawn(); moves = ms; anim = 0; if (gain) { g.add(gain); g.sfx("pop"); shake = .15; } else g.sfx("tick");
        top = 0; grid.forEach(r => r.forEach(v => { if (v > top) top = v; })); g.status("Top tile " + top + " of " + GOAL);
        if (top >= GOAL) { done = true; g.sfx("cheer"); g.timeout(() => g.win("You made " + GOAL + "!"), 800); }
        else if (!hasMove()) { done = true; g.timeout(() => g.over("No more moves!"), 700); }
      };
      spawn(); spawn(); g.status("Top tile 2 of " + GOAL);
      const dirs = { ArrowLeft: 0, ArrowRight: 1, ArrowUp: 2, ArrowDown: 3, a: 0, d: 1, w: 2, s: 3 };
      g.on(window, "keydown", e => { if (dirs[e.key] !== undefined) mv(dirs[e.key]); });
      swipeOn(g, c, mv);
      const tile = (v, px, py, sc) => {
        const h = (Math.log2(v) * 37 + 15) % 360, s = (cs - 8) * sc, lv = Math.round(Math.log2(v));
        x.save(); x.translate(px + cs / 2, py + cs / 2);
        x.shadowColor = "rgba(0,0,0,.4)"; x.shadowBlur = 8; x.shadowOffsetY = 3;
        const gr = x.createLinearGradient(0, -s / 2, 0, s / 2); gr.addColorStop(0, `hsl(${h},90%,66%)`); gr.addColorStop(1, `hsl(${h},80%,45%)`);
        x.fillStyle = gr; RR(x, -s / 2, -s / 2, s, s, s * .2); x.fill(); x.shadowColor = "transparent";
        x.fillStyle = "rgba(255,255,255,.22)"; RR(x, -s / 2 + 4, -s / 2 + 4, s - 8, s * .36, s * .14); x.fill();
        const sides = 3 + (lv % 5); x.strokeStyle = "rgba(255,255,255,.55)"; x.lineWidth = 2; x.beginPath();
        for (let i = 0; i <= sides; i++) { const an = i / sides * 6.283 - 1.57; x.lineTo(-s * .3 + Math.cos(an) * s * .09, -s * .3 + Math.sin(an) * s * .09); } x.stroke();
        const len = String(v).length; TXT(x, v, 0, s * .06, s * (len <= 2 ? .42 : len === 3 ? .34 : .27), "rgba(0,0,0,.25)"); TXT(x, v, 0, s * .04, s * (len <= 2 ? .42 : len === 3 ? .34 : .27), "#fff");
        x.restore();
      };
      g.loop((dt, t) => {
        tt = t; if (shake > 0) shake -= dt;
        x.save(); x.clearRect(0, 0, W, H);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#241b4a"); bg.addColorStop(1, "#0f1c3d"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        bgStars(x, W, H, t, 40);
        if (shake > 0) x.translate(g.rf(-3, 3), g.rf(-3, 3));
        x.fillStyle = "rgba(255,255,255,.08)"; RR(x, 4, 4, W - 8, H - 8, 22); x.fill();
        for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { x.fillStyle = "rgba(255,255,255,.07)"; RR(x, PAD + j * cs + 4, PAD + i * cs + 4, cs - 8, cs - 8, 14); x.fill(); }
        if (anim < 1) {
          anim = Math.min(1, anim + dt / .11); const e = 1 - Math.pow(1 - anim, 2);
          moves.forEach(m => tile(m.v, PAD + g.lerp(m.fr[1], m.to[1], e) * cs, PAD + g.lerp(m.fr[0], m.to[0], e) * cs, 1));
        } else {
          for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
            const v = grid[i][j]; if (!v) continue; let f = fx[i][j];
            if (f > 0) f = Math.max(0, f - dt * 5); else if (f < 0) f = Math.min(0, f + dt * 6); fx[i][j] = f;
            tile(v, PAD + j * cs, PAD + i * cs, f >= 0 ? 1 + .2 * f : 1 + .65 * f);
          }
        }
        parts.draw(x, dt); x.restore();
      });
    }
  });

  // ---- Sunset Slide: sliding picture puzzle ----
  B.add({
    id: "s5-sunsetslide", name: "Sunset Slide", ages: [8, 20], cat: "Puzzle", color: "#ff7a9c", icon: "[]",
    desc: "Slide the pieces back together to rebuild the sunset picture.", controls: "Tap a piece next to the gap to slide it. Hold Peek to see the picture. Arrow keys work too.",
    start(g) {
      const k = g.canvas(600, 600), { c, x, W, H, pos } = k, N = g.by(3, 4, 5), cs = W / N, showNum = g.diff < 2;
      const pc = document.createElement("canvas"); pc.width = pc.height = 600; const p = pc.getContext("2d");
      const mount = (col, pts) => { p.fillStyle = col; p.beginPath(); pts.forEach((q, i) => i ? p.lineTo(q[0], q[1]) : p.moveTo(q[0], q[1])); p.closePath(); p.fill(); };
      let gr = p.createLinearGradient(0, 0, 0, 600); [[0, "#2a1b6e"], [.4, "#d6469c"], [.62, "#ff9a4d"], [.78, "#ffe08a"]].forEach(s => gr.addColorStop(s[0], s[1])); p.fillStyle = gr; p.fillRect(0, 0, 600, 600);
      p.fillStyle = "#fff"; for (let i = 0; i < 40; i++) { p.globalAlpha = .4 + (i % 4) * .15; p.beginPath(); p.arc((i * 137) % 600, (i * 53) % 230, 1 + i % 3, 0, 7); p.fill(); } p.globalAlpha = 1;
      gr = p.createRadialGradient(300, 360, 10, 300, 360, 220); gr.addColorStop(0, "rgba(255,240,150,1)"); gr.addColorStop(.4, "rgba(255,200,90,.8)"); gr.addColorStop(1, "rgba(255,150,60,0)"); p.fillStyle = gr; p.fillRect(60, 120, 480, 480);
      p.fillStyle = "#fff3b0"; p.beginPath(); p.arc(300, 360, 72, 0, 7); p.fill();
      mount("#5a3a8c", [[-20, 440], [120, 250], [270, 440]]); mount("#3d2a70", [[170, 440], [380, 190], [570, 440]]); mount("#2b1d57", [[400, 440], [530, 300], [660, 440]]);
      gr = p.createLinearGradient(0, 430, 0, 600); gr.addColorStop(0, "#2aa6c9"); gr.addColorStop(1, "#123f73"); p.fillStyle = gr; p.fillRect(0, 430, 600, 170);
      for (let i = 0; i < 7; i++) { p.fillStyle = "rgba(255,230,140,.65)"; p.fillRect(300 - (70 - i * 8), 440 + i * 21, (70 - i * 8) * 2, 6); }
      p.fillStyle = "#1f7a4a"; p.beginPath(); p.ellipse(110, 640, 270, 140, 0, 0, 7); p.fill(); p.fillStyle = "#17603a"; p.beginPath(); p.ellipse(560, 650, 200, 110, 0, 0, 7); p.fill();
      p.fillStyle = "#f2e0c0"; p.fillRect(80, 478, 76, 54); mount("#c0392b", [[68, 480], [118, 432], [168, 480]]); p.fillStyle = "#7b4a2a"; p.fillRect(108, 500, 18, 32); p.fillStyle = "#ffe066"; p.fillRect(132, 494, 14, 14); p.fillRect(88, 494, 14, 14);
      [[240, 520, 1], [270, 540, .8], [520, 540, 1.2]].forEach(q => { mount("#0f5a33", [[q[0] - 22 * q[2], q[1]], [q[0], q[1] - 70 * q[2]], [q[0] + 22 * q[2], q[1]]]); mount("#14703d", [[q[0] - 17 * q[2], q[1] - 28 * q[2]], [q[0], q[1] - 90 * q[2]], [q[0] + 17 * q[2], q[1] - 28 * q[2]]]); p.fillStyle = "#5b3a1e"; p.fillRect(q[0] - 3, q[1], 6, 14 * q[2]); });
      p.fillStyle = "rgba(255,255,255,.75)"; [[450, 90, 60], [140, 120, 50], [330, 40, 40]].forEach(q => { p.beginPath(); p.ellipse(q[0], q[1], q[2], q[2] * .38, 0, 0, 7); p.ellipse(q[0] + q[2] * .5, q[1] - q[2] * .14, q[2] * .55, q[2] * .3, 0, 0, 7); p.fill(); });
      p.fillStyle = "#e84855"; p.beginPath(); p.arc(500, 170, 34, 0, 7); p.fill(); p.fillStyle = "#ffd34e"; p.beginPath(); p.ellipse(500, 170, 12, 34, 0, 0, 7); p.fill(); p.fillStyle = "#7b4a2a"; p.fillRect(490, 212, 20, 14); p.strokeStyle = "#7b4a2a"; p.lineWidth = 2; p.beginPath(); p.moveTo(482, 198); p.lineTo(490, 212); p.moveTo(518, 198); p.lineTo(510, 212); p.stroke();
      p.strokeStyle = "#2b1d57"; p.lineWidth = 3; [[330, 110], [372, 90]].forEach(q => { p.beginPath(); p.moveTo(q[0] - 12, q[1]); p.quadraticCurveTo(q[0] - 5, q[1] - 10, q[0], q[1]); p.quadraticCurveTo(q[0] + 5, q[1] - 10, q[0] + 12, q[1]); p.stroke(); });
      const G = Array.from({ length: N }, () => Array(N).fill(null)), T = []; let br = N - 1, bc = N - 1, moves = 0, won = 0, peek = false, shake = 0;
      for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) { if (r === N - 1 && q === N - 1) continue; const t = { id: r * N + q, r, c: q, x: q * cs, y: r * cs }; T.push(t); G[r][q] = t; }
      const shift = (r, q) => {
        if ((r !== br && q !== bc) || (r === br && q === bc)) return 0;
        const dr = Math.sign(r - br), dc = Math.sign(q - bc); let n = 0;
        while (br !== r || bc !== q) { const tr = br + dr, tc = bc + dc, t = G[tr][tc]; G[br][bc] = t; t.r = br; t.c = bc; G[tr][tc] = null; br = tr; bc = tc; n++; }
        return n;
      };
      const solved = () => T.every(t => t.id === t.r * N + t.c);
      do { let prev = -1; for (let i = 0; i < g.by(40, 90, 220); i++) { const o = g.shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]]).find(d => { const r = br + d[0], q = bc + d[1]; return r >= 0 && q >= 0 && r < N && q < N && (r * N + q) !== prev; }); if (!o) continue; prev = br * N + bc; shift(br + o[0], bc + o[1]); } } while (solved());
      T.forEach(t => { t.x = t.c * cs; t.y = t.r * cs; });
      g.status("Moves: 0");
      const tryAt = (r, q) => {
        if (won || r < 0 || q < 0 || r >= N || q >= N) return;
        const n = shift(r, q); if (!n) { shake = .15; g.sfx("back"); return; }
        moves++; g.status("Moves: " + moves); g.sfx("click");
        if (solved()) {
          const par = N * N * 4; g.score(Math.max(20, Math.round(1000 * par / Math.max(par, moves)))); won = .001; g.sfx("cheer");
        }
      };
      g.on(c, "pointerdown", e => { const q = pos(e); tryAt(Math.floor(q.y / cs), Math.floor(q.x / cs)); });
      g.on(window, "keydown", e => { const m = { ArrowLeft: [0, 1], ArrowRight: [0, -1], ArrowUp: [1, 0], ArrowDown: [-1, 0], a: [0, 1], d: [0, -1], w: [1, 0], s: [-1, 0] }[e.key]; if (m) tryAt(br + m[0], bc + m[1]); });
      const pk = g.html('<button class="bg-btn" type="button">Peek (hold)</button>'), pb = pk.querySelector("button");
      g.on(pb, "pointerdown", () => { peek = true; }); g.on(pb, "pointerup", () => { peek = false; }); g.on(pb, "pointerleave", () => { peek = false; });
      g.loop((dt, t) => {
        x.clearRect(0, 0, W, H); x.fillStyle = "#1a1030"; x.fillRect(0, 0, W, H);
        if (won) { won += dt; }
        const ox = shake > 0 ? g.rf(-3, 3) : 0; if (shake > 0) shake -= dt;
        T.forEach(tl => {
          tl.x += (tl.c * cs - tl.x) * Math.min(1, dt * 16); tl.y += (tl.r * cs - tl.y) * Math.min(1, dt * 16);
          const s = pc.width / N; x.drawImage(pc, (tl.id % N) * s, Math.floor(tl.id / N) * s, s, s, tl.x + ox, tl.y, cs, cs);
          x.strokeStyle = "rgba(20,10,40,.85)"; x.lineWidth = won ? 1 : 4; x.strokeRect(tl.x + ox + 2, tl.y + 2, cs - 4, cs - 4);
          if (showNum && !won) { x.fillStyle = "rgba(0,0,0,.45)"; RR(x, tl.x + 8, tl.y + 8, 34, 26, 8); x.fill(); TXT(x, tl.id + 1, tl.x + 25, tl.y + 21, 17, "#fff"); }
        });
        if (won) { x.globalAlpha = Math.min(1, won * 1.5); const s = pc.width / N; x.drawImage(pc, (N - 1) * s, (N - 1) * s, s, s, (N - 1) * cs, (N - 1) * cs, cs, cs); x.globalAlpha = 1; x.fillStyle = "rgba(255,255,255," + Math.max(0, .5 - won * .5) + ")"; x.fillRect(0, 0, W, H); }
        if (peek) { x.globalAlpha = .96; x.drawImage(pc, 0, 0, W, H); x.globalAlpha = 1; }
        if (won > 1.3) { g.win("Picture complete!"); return false; }
      });
    }
  });

  // ---- Bomb Field: minesweeper-style sweeper ----
  B.add({
    id: "s5-bombfield", name: "Bomb Field", ages: [9, 20], cat: "Puzzle", color: "#6be28f", icon: "!",
    desc: "Clear the meadow without waking a hidden bomb. Numbers show how many are next to you.", controls: "Tap to dig. Turn on Flag mode (or right-click) to mark bombs. Tap a number to dig around it when flags match.",
    start(g) {
      const k = g.canvas(600, 600), { c, x, W, H, pos } = k, N = g.by(8, 10, 12), M = g.by(8, 16, 28), cs = W / N, parts = mkParts();
      const mine = Array.from({ length: N }, () => Array(N).fill(false)), num = Array.from({ length: N }, () => Array(N).fill(0)), st = Array.from({ length: N }, () => Array(N).fill(0)), rt = Array.from({ length: N }, () => Array(N).fill(0));
      let first = true, flagMode = false, left = N * N - M, flags = 0, tm = 0, dead = 0, hit = null, win = 0, started = false;
      const NC = ["", "#2a7de1", "#2f9e44", "#e03131", "#7048e8", "#c2255c", "#0c8599", "#343a40", "#868e96"];
      const nb = (i, j, fn) => { for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { if ((a || b) && i + a >= 0 && j + b >= 0 && i + a < N && j + b < N) fn(i + a, j + b); } };
      const place = (si, sj) => {
        let n = 0; while (n < M) { const i = g.ri(0, N - 1), j = g.ri(0, N - 1); if (mine[i][j] || (Math.abs(i - si) <= 1 && Math.abs(j - sj) <= 1)) continue; mine[i][j] = true; n++; }
        for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { let m = 0; nb(i, j, (a, b) => { if (mine[a][b]) m++; }); num[i][j] = m; }
      };
      const boom = (i, j) => { dead = .001; hit = [i, j]; g.sfx("boom"); parts.add((j + .5) * cs, (i + .5) * cs, "#ffb347", 30, 260); };
      const reveal = (si, sj) => {
        const q = [[si, sj, 0]];
        while (q.length) { const t = q.shift(), i = t[0], j = t[1]; if (st[i][j] !== 0) continue; st[i][j] = 1; rt[i][j] = -t[2] * .035; left--; g.add(1); if (!num[i][j]) nb(i, j, (a, b) => { if (st[a][b] === 0) q.push([a, b, t[2] + 1]); }); }
      };
      const dig = (i, j) => {
        if (st[i][j] !== 0) return; started = true;
        if (first) { first = false; place(i, j); }
        if (mine[i][j]) { boom(i, j); return; }
        const before = left; reveal(i, j); g.sfx(before - left > 3 ? "swish" : "click");
      };
      const flag = (i, j) => { if (st[i][j] === 1) return; st[i][j] = st[i][j] === 2 ? 0 : 2; flags += st[i][j] === 2 ? 1 : -1; g.sfx("flag"); };
      const chord = (i, j) => {
        if (st[i][j] !== 1 || !num[i][j]) return; let f = 0; nb(i, j, (a, b) => { if (st[a][b] === 2) f++; });
        if (f !== num[i][j]) { g.sfx("back"); return; }
        nb(i, j, (a, b) => { if (st[a][b] === 0 && !dead) dig(a, b); });
      };
      g.on(c, "contextmenu", e => e.preventDefault());
      g.on(c, "pointerdown", e => {
        if (dead || win) return; const q = pos(e), i = Math.floor(q.y / cs), j = Math.floor(q.x / cs); if (i < 0 || j < 0 || i >= N || j >= N) return;
        if (e.button === 2 || flagMode) flag(i, j);
        else if (st[i][j] === 1) chord(i, j); else if (st[i][j] === 0) dig(i, j);
      });
      const fb = g.html('<button class="bg-btn" type="button">Flag mode: off</button>'), fbb = fb.querySelector("button");
      g.on(fbb, "click", () => { flagMode = !flagMode; fbb.textContent = "Flag mode: " + (flagMode ? "ON" : "off"); g.sfx("click"); });
      const bomb = (cx, cy, r) => {
        x.fillStyle = "#222"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.strokeStyle = "#222"; x.lineWidth = 3;
        for (let i = 0; i < 8; i++) { const a = i * .785; x.beginPath(); x.moveTo(cx + Math.cos(a) * r * .8, cy + Math.sin(a) * r * .8); x.lineTo(cx + Math.cos(a) * r * 1.3, cy + Math.sin(a) * r * 1.3); x.stroke(); }
        x.fillStyle = "#ff5d5d"; x.beginPath(); x.arc(cx - r * .3, cy - r * .3, r * .22, 0, 7); x.fill();
      };
      g.loop((dt, t) => {
        if (started && !dead && !win) tm += dt;
        g.status("Bombs left: " + (M - flags) + "   Time: " + Math.floor(tm));
        x.clearRect(0, 0, W, H); x.fillStyle = "#14532d"; x.fillRect(0, 0, W, H);
        for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
          const px = j * cs, py = i * cs, s = st[i][j];
          let a = 1;
          if (s === 1) { rt[i][j] += dt; a = rt[i][j] < 0 ? 1 : Math.max(0, 1 - rt[i][j] / .18); }
          if (s === 1 || (dead && mine[i][j] && s !== 2)) {
            x.fillStyle = hit && hit[0] === i && hit[1] === j ? "#ff6b6b" : ((i + j) % 2 ? "#f3e2b5" : "#ecd9a6"); x.fillRect(px, py, cs, cs);
            if (s === 1 && rt[i][j] >= 0 && num[i][j] && !mine[i][j]) TXT(x, num[i][j], px + cs / 2, py + cs / 2 + 1, cs * .56, NC[num[i][j]]);
            if (mine[i][j] && dead > .15 + ((i * 7 + j * 3) % 10) * .04) bomb(px + cs / 2, py + cs / 2, cs * .26);
          }
          if (s !== 1 && !(dead && mine[i][j] && s !== 2) || (s === 1 && a > 0)) {
            x.globalAlpha = a; const gr = x.createLinearGradient(px, py, px, py + cs); gr.addColorStop(0, (i + j) % 2 ? "#79e07a" : "#6ad26b"); gr.addColorStop(1, (i + j) % 2 ? "#3fae4a" : "#38a244");
            x.fillStyle = gr; RR(x, px + 1.5, py + 1.5, cs - 3, cs - 3, cs * .16); x.fill(); x.fillStyle = "rgba(255,255,255,.25)"; RR(x, px + 4, py + 4, cs - 8, cs * .25, cs * .1); x.fill();
            if (s === 2) { x.fillStyle = "#5b3a1e"; x.fillRect(px + cs * .44, py + cs * .2, cs * .07, cs * .6); x.fillStyle = "#ff4d4d"; x.beginPath(); x.moveTo(px + cs * .5, py + cs * .2); x.lineTo(px + cs * .8, py + cs * .34); x.lineTo(px + cs * .5, py + cs * .48); x.fill(); }
            x.globalAlpha = 1;
          }
        }
        parts.draw(x, dt);
        if (dead) { dead += dt; if (dead > 1.5) { g.over("Boom! A bomb woke up."); return false; } }
        else if (!win && left === 0 && !first) { win = .001; g.add(M * 15 + Math.max(0, g.by(150, 300, 500) - Math.floor(tm) * 2)); g.sfx("cheer"); for (let i = 0; i < 40; i++) parts.add(g.rf(0, W), g.rf(0, H), g.pick(["#ffd34e", "#fff", "#ff6fb5"]), 3, 120); }
        if (win) { win += dt; if (win > 1.4) { g.win("Field cleared!"); return false; } }
      });
    }
  });

  // ---- Light Orbs: lights-out ----
  B.add({
    id: "s5-lightorbs", name: "Light Orbs", ages: [8, 20], cat: "Puzzle", color: "#ffe066", icon: "*",
    desc: "Tapping an orb flips it and its neighbours. Switch every light off!", controls: "Tap an orb. Stuck? The Hint button points to a good move.",
    start(g) {
      const n = g.by(4, 5, 5), k = g.canvas(600, 600), { c, x, W, H, pos } = k, cs = W / n, parts = mkParts(), ROUNDS = 5;
      let lv = 0, on, br, pr, sol, moves, hints, hintCell = null, hintT = 0, wait = 0, tt = 0;
      const flip = (i, j) => { [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(d => { const a = i + d[0], b = j + d[1]; if (a >= 0 && b >= 0 && a < n && b < n) on[a][b] = !on[a][b]; }); };
      const setup = () => {
        on = Array.from({ length: n }, () => Array(n).fill(false)); br = Array.from({ length: n }, () => Array(n).fill(0)); pr = Array.from({ length: n }, () => Array(n).fill(0));
        const cells = g.shuffle(Array.from({ length: n * n }, (_, i) => i)).slice(0, Math.min(n * n, g.by(3, 5, 7) + lv)); sol = new Set(cells);
        cells.forEach(v => flip(Math.floor(v / n), v % n)); moves = 0; hints = 0; hintCell = null; wait = 0;
        g.status("Round " + (lv + 1) + " of " + ROUNDS + "   Moves: 0");
      };
      setup();
      g.on(c, "pointerdown", e => {
        if (wait) return; const q = pos(e), i = Math.floor(q.y / cs), j = Math.floor(q.x / cs); if (i < 0 || j < 0 || i >= n || j >= n) return;
        flip(i, j); moves++; pr[i][j] = 1; const id = i * n + j; if (sol.has(id)) sol.delete(id); else sol.add(id); hintCell = null;
        g.sfx("click"); parts.add((j + .5) * cs, (i + .5) * cs, "#ffe066", 8, 120); g.status("Round " + (lv + 1) + " of " + ROUNDS + "   Moves: " + moves);
        if (on.every(r => r.every(v => !v))) {
          const gain = Math.max(20, 100 + Math.max(0, (g.by(3, 5, 7) + lv) * 2 - moves) * 10 - hints * 30); g.add(gain); POP(g, k, "+" + gain, W / 2, H / 2, "#ffe066"); g.sfx("cheer"); wait = .001;
          for (let a = 0; a < 50; a++) parts.add(g.rf(0, W), g.rf(0, H), g.pick(["#ffe066", "#fff", "#ff9a4d"]), 2, 100);
        }
      });
      const hb = g.html('<button class="bg-btn" type="button">Hint (costs 30)</button>'), hbb = hb.querySelector("button");
      g.on(hbb, "click", () => { if (wait || !sol.size) return; const id = [...sol][0]; hintCell = [Math.floor(id / n), id % n]; hintT = 2; hints++; g.sfx("hint"); });
      g.loop((dt, t) => {
        tt = t; x.clearRect(0, 0, W, H);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#161a3d"); bg.addColorStop(1, "#0b0f26"); x.fillStyle = bg; x.fillRect(0, 0, W, H); bgStars(x, W, H, t, 50);
        if (hintT > 0) { hintT -= dt; if (hintT <= 0) hintCell = null; }
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
          const cx = (j + .5) * cs, cy = (i + .5) * cs, r = cs * .38; br[i][j] += ((on[i][j] ? 1 : 0) - br[i][j]) * Math.min(1, dt * 12);
          pr[i][j] = Math.max(0, pr[i][j] - dt * 5); const b = br[i][j], sq = 1 - .18 * Math.sin(pr[i][j] * 3.14);
          x.fillStyle = "rgba(255,255,255,.05)"; RR(x, j * cs + 5, i * cs + 5, cs - 10, cs - 10, 18); x.fill();
          if (b > .02) { const gl = x.createRadialGradient(cx, cy, r * .5, cx, cy, r * 1.9); gl.addColorStop(0, "rgba(255,210,80," + .55 * b + ")"); gl.addColorStop(1, "rgba(255,160,40,0)"); x.fillStyle = gl; x.fillRect(j * cs - 10, i * cs - 10, cs + 20, cs + 20); }
          const gr = x.createRadialGradient(cx - r * .3, cy - r * .3, r * .1, cx, cy, r);
          gr.addColorStop(0, b > .5 ? "#fffbd0" : "#5a6aa8"); gr.addColorStop(.6, b > .5 ? "#ffc93c" : "#2c3770"); gr.addColorStop(1, b > .5 ? "#ff8a2a" : "#1a2150");
          x.globalAlpha = .35 + .65 * Math.max(b, .5); x.fillStyle = gr; x.beginPath(); x.arc(cx, cy, r * sq, 0, 7); x.fill(); x.globalAlpha = 1;
          x.strokeStyle = b > .5 ? "rgba(255,255,255,.7)" : "rgba(160,180,255,.3)"; x.lineWidth = 3; x.stroke();
          if (hintCell && hintCell[0] === i && hintCell[1] === j) { x.strokeStyle = "rgba(120,255,160," + (.5 + .5 * Math.sin(t * 9)) + ")"; x.lineWidth = 5; x.beginPath(); x.arc(cx, cy, r + 8, 0, 7); x.stroke(); }
        }
        parts.draw(x, dt);
        if (wait) { wait += dt; if (wait > 1.1) { lv++; if (lv >= ROUNDS) { g.win("All lights out!"); return false; } setup(); } }
      });
    }
  });

  // ---- Gem Stack: falling-block stacker with gem blocks ----
  B.add({
    id: "s5-gemstack", name: "Gem Stack", ages: [9, 20], cat: "Puzzle", color: "#b48cff", icon: "LL",
    desc: "Drop and turn the falling gem blocks to fill whole rows and clear them.", controls: "Left/Right move, Up turns, Down speeds up, Space drops. On a phone use the buttons.",
    start(g) {
      const COLS = 10, ROWS = 20, CS = 28, OX = 10, OY = 20, k = g.canvas(400, 600), { c, x, W, H } = k, parts = mkParts();
      const KINDS = [
        { m: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], col: "#4cd9ff", ic: 0 }, { m: [[1, 1], [1, 1]], col: "#ffd34e", ic: 1 },
        { m: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], col: "#c77dff", ic: 2 }, { m: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], col: "#6be28f", ic: 3 },
        { m: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], col: "#ff5d73", ic: 4 }, { m: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], col: "#5b8cff", ic: 5 },
        { m: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], col: "#ff9a4d", ic: 6 }];
      const field = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
      let bag = [], cur = null, nk = 0, acc = 0, lines = 0, level = 1, shake = 0, dead = false, rep = null, soft = false;
      const nextKind = () => { if (!bag.length) bag = g.shuffle([0, 1, 2, 3, 4, 5, 6]); return bag.pop(); };
      const mk = ki => ({ k: ki, m: KINDS[ki].m.map(r => r.slice()), x: Math.floor((COLS - KINDS[ki].m.length) / 2), y: 0 });
      const hit = (m, px, py) => { for (let r = 0; r < m.length; r++) for (let q = 0; q < m.length; q++) if (m[r][q]) { const a = px + q, b = py + r; if (a < 0 || a >= COLS || b >= ROWS) return true; if (b >= 0 && field[b][a]) return true; } return false; };
      const rot = m => m.map((r, i) => r.map((_, j) => m[m.length - 1 - j][i]));
      const speed = () => Math.max(.06, g.by(.85, .65, .5) * Math.pow(.86, level - 1));
      const spawn = () => { cur = mk(nk); nk = nextKind(); if (hit(cur.m, cur.x, cur.y)) dead = true; };
      const info = () => g.status("Level " + level + "   Lines " + lines);
      if (g.diff === 2) for (let r = ROWS - 3; r < ROWS; r++) { for (let q = 0; q < COLS; q++) if (Math.random() < .75) field[r][q] = { col: "#7a8299", ic: 1 }; field[r][g.ri(0, COLS - 1)] = null; }
      nk = nextKind(); spawn(); info();
      const lock = () => {
        cur.m.forEach((r, i) => r.forEach((v, j) => { if (v) { const b = cur.y + i; if (b >= 0) field[b][cur.x + j] = { col: KINDS[cur.k].col, ic: KINDS[cur.k].ic }; } }));
        g.sfx("thump"); const cl = []; for (let r = 0; r < ROWS; r++) if (field[r].every(v => v)) cl.push(r);
        if (cl.length) {
          cl.forEach(r => { for (let q = 0; q < COLS; q++) parts.add(OX + (q + .5) * CS, OY + (r + .5) * CS, field[r][q].col, 2, 220); });
          cl.forEach(r => { field.splice(r, 1); field.unshift(Array(COLS).fill(null)); });
          const gain = [0, 100, 300, 500, 800][cl.length] * level; g.add(gain); POP(g, k, "+" + gain, 150, 200, "#ffe066"); g.sfx(cl.length === 4 ? "cheer" : "pop");
          lines += cl.length; level = 1 + Math.floor(lines / 10); shake = cl.length >= 3 ? .3 : .12; info();
        }
        spawn(); acc = 0;
      };
      const step = held => { if (!hit(cur.m, cur.x, cur.y + 1)) { cur.y++; if (held) g.add(1); } else lock(); };
      const act = a => {
        if (dead || !cur) return;
        if (a === "L" || a === "R") { const d = a === "L" ? -1 : 1; if (!hit(cur.m, cur.x + d, cur.y)) { cur.x += d; g.sfx("tick"); } }
        else if (a === "T") { const m2 = rot(cur.m); for (const kk of [0, -1, 1, -2, 2]) if (!hit(m2, cur.x + kk, cur.y)) { cur.m = m2; cur.x += kk; g.sfx("click"); break; } }
        else if (a === "D") { let d = 0; while (!hit(cur.m, cur.x, cur.y + 1)) { cur.y++; d++; } g.add(d * 2); lock(); }
      };
      g.on(window, "keydown", e => { const m = { ArrowLeft: "L", ArrowRight: "R", ArrowUp: "T", a: "L", d: "R", w: "T", " ": "D" }[e.key]; if (m) act(m); });
      const bt = g.html('<div style="display:flex;gap:8px;justify-content:center;margin-top:8px;flex-wrap:wrap"><button class="bg-btn" type="button" data-a="L">Left</button><button class="bg-btn" type="button" data-a="T">Turn</button><button class="bg-btn" type="button" data-a="R">Right</button><button class="bg-btn" type="button" data-a="S">Down</button><button class="bg-btn" type="button" data-a="D">Drop</button></div>');
      g.on(bt, "pointerdown", e => { const a = e.target.dataset && e.target.dataset.a; if (!a) return; e.preventDefault(); if (a === "S") soft = true; else { act(a); if (a === "L" || a === "R") rep = { a, t: .25 }; } });
      g.on(window, "pointerup", () => { rep = null; soft = false; });
      const blk = (px, py, col, ic, s, al) => {
        x.globalAlpha = al === undefined ? 1 : al; x.fillStyle = col; RR(x, px + 1, py + 1, s - 2, s - 2, s * .18); x.fill();
        x.fillStyle = "rgba(255,255,255,.35)"; RR(x, px + 3, py + 3, s - 6, (s - 6) * .4, s * .12); x.fill(); x.fillStyle = "rgba(0,0,0,.22)"; RR(x, px + 3, py + s * .62, s - 6, s * .28, s * .12); x.fill();
        const cx = px + s / 2, cy = py + s / 2, u = s / 28; x.fillStyle = x.strokeStyle = "rgba(255,255,255,.75)"; x.lineWidth = 2 * u;
        if (ic === 0) x.fillRect(cx - 5 * u, cy - 1.5 * u, 10 * u, 3 * u);
        else if (ic === 1) { x.beginPath(); x.arc(cx, cy, 3.5 * u, 0, 7); x.fill(); }
        else if (ic === 2) { x.beginPath(); x.arc(cx, cy, 4.5 * u, 0, 7); x.stroke(); }
        else if (ic === 3) { x.fillRect(cx - 5 * u, cy - 1.5 * u, 10 * u, 3 * u); x.fillRect(cx - 1.5 * u, cy - 5 * u, 3 * u, 10 * u); }
        else if (ic === 4) { x.beginPath(); x.moveTo(cx, cy - 5 * u); x.lineTo(cx + 4 * u, cy); x.lineTo(cx, cy + 5 * u); x.lineTo(cx - 4 * u, cy); x.fill(); }
        else if (ic === 5) { x.beginPath(); x.moveTo(cx, cy - 5 * u); x.lineTo(cx + 5 * u, cy + 4 * u); x.lineTo(cx - 5 * u, cy + 4 * u); x.fill(); }
        else { x.beginPath(); x.arc(cx - 4 * u, cy, 2.5 * u, 0, 7); x.arc(cx + 4 * u, cy, 2.5 * u, 0, 7); x.fill(); }
        x.globalAlpha = 1;
      };
      g.loop((dt, t) => {
        if (!dead) {
          if (rep) { rep.t -= dt; if (rep.t <= 0) { rep.t = .08; act(rep.a); } }
          acc += dt * ((g.keys.ArrowDown || soft) ? 14 : 1); const sp = speed();
          while (acc >= sp && !dead) { acc -= sp; step(g.keys.ArrowDown || soft); }
        }
        if (shake > 0) shake -= dt;
        x.save(); x.clearRect(0, 0, W, H); const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#241447"); bg.addColorStop(1, "#0d1030"); x.fillStyle = bg; x.fillRect(0, 0, W, H); bgStars(x, W, H, t, 40);
        if (shake > 0) x.translate(g.rf(-3, 3), g.rf(-3, 3));
        x.fillStyle = "rgba(0,0,0,.4)"; RR(x, OX - 4, OY - 4, COLS * CS + 8, ROWS * CS + 8, 10); x.fill(); x.strokeStyle = "rgba(255,255,255,.06)"; x.lineWidth = 1;
        for (let i = 0; i <= COLS; i++) { x.beginPath(); x.moveTo(OX + i * CS, OY); x.lineTo(OX + i * CS, OY + ROWS * CS); x.stroke(); }
        for (let i = 0; i <= ROWS; i++) { x.beginPath(); x.moveTo(OX, OY + i * CS); x.lineTo(OX + COLS * CS, OY + i * CS); x.stroke(); }
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) { const f = field[r][q]; if (f) blk(OX + q * CS, OY + r * CS, f.col, f.ic, CS); }
        if (cur && !dead) {
          if (g.diff < 2) { let gy = cur.y; while (!hit(cur.m, cur.x, gy + 1)) gy++; cur.m.forEach((r, i) => r.forEach((v, j) => { if (v && gy + i >= 0) { x.strokeStyle = KINDS[cur.k].col; x.globalAlpha = .45; x.lineWidth = 2; RR(x, OX + (cur.x + j) * CS + 3, OY + (gy + i) * CS + 3, CS - 6, CS - 6, 6); x.stroke(); x.globalAlpha = 1; } })); }
          cur.m.forEach((r, i) => r.forEach((v, j) => { if (v && cur.y + i >= 0) blk(OX + (cur.x + j) * CS, OY + (cur.y + i) * CS, KINDS[cur.k].col, KINDS[cur.k].ic, CS); }));
        }
        x.fillStyle = "rgba(255,255,255,.08)"; RR(x, 300, 20, 92, 120, 12); x.fill(); TXT(x, "NEXT", 346, 38, 15, "#cfc3ff");
        const nm = KINDS[nk].m; let minr = 9, maxr = -1, minc = 9, maxc = -1; nm.forEach((r, i) => r.forEach((v, j) => { if (v) { minr = Math.min(minr, i); maxr = Math.max(maxr, i); minc = Math.min(minc, j); maxc = Math.max(maxc, j); } }));
        const ns = 20, nw = (maxc - minc + 1) * ns, nh = (maxr - minr + 1) * ns; nm.forEach((r, i) => r.forEach((v, j) => { if (v) blk(346 - nw / 2 + (j - minc) * ns, 92 - nh / 2 + (i - minr) * ns, KINDS[nk].col, KINDS[nk].ic, ns); }));
        TXT(x, "Level " + level, 346, 180, 18, "#fff"); TXT(x, "Lines " + lines, 346, 208, 18, "#ffe066");
        parts.draw(x, dt); x.restore();
        if (dead) { g.over("The stack reached the top!"); return false; }
      });
    }
  });

  // ---- Gem Swap: match-3 ----
  B.add({
    id: "s5-gemswap", name: "Gem Swap", ages: [8, 20], cat: "Puzzle", color: "#ff6fb5", icon: "<>",
    desc: "Swap neighbouring gems to line up three or more. Reach the target score before you run out of moves!", controls: "Tap a gem then a neighbour, or drag a gem toward a neighbour",
    start(g) {
      const n = 8, k = g.canvas(600, 600), { c, x, W, H, pos } = k, cs = W / n, NT = g.by(5, 6, 7), TARGET = g.by(1200, 1800, 2200), parts = mkParts();
      const COL = ["#ff4d6d", "#4cc3ff", "#ffd34e", "#6be28f", "#b48cff", "#ff9a4d", "#2de2d0"];
      let movesLeft = g.by(30, 25, 22), grid, sel = null, drag = null, phase = "idle", pt = 0, chain = 0, idleT = 0, hint = null, shake = 0, sw = null, fin = false;
      const gem = t => ({ t, ox: 0, oy: 0, vy: 0, s: 1, dead: false, lin: false }), rtype = () => g.ri(0, NT - 1);
      const info = () => g.status("Moves: " + movesLeft + "   Goal: " + TARGET);
      const fill = () => {
        grid = Array.from({ length: n }, () => Array(n).fill(null));
        for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) { let t; do { t = rtype(); } while ((q >= 2 && grid[r][q - 1].t === t && grid[r][q - 2].t === t) || (r >= 2 && grid[r - 1][q].t === t && grid[r - 2][q].t === t)); grid[r][q] = gem(t); }
      };
      const swp = (r, q, r2, q2) => { const a = grid[r][q]; grid[r][q] = grid[r2][q2]; grid[r2][q2] = a; };
      const find = () => {
        const mark = Array.from({ length: n }, () => Array(n).fill(false)), runs = [];
        for (let r = 0; r < n; r++) { let q = 0; while (q < n) { let e = q; while (e + 1 < n && grid[r][e + 1].t === grid[r][q].t) e++; if (e - q >= 2) { for (let i = q; i <= e; i++) mark[r][i] = true; runs.push(e - q + 1); } q = e + 1; } }
        for (let q = 0; q < n; q++) { let r = 0; while (r < n) { let e = r; while (e + 1 < n && grid[e + 1][q].t === grid[r][q].t) e++; if (e - r >= 2) { for (let i = r; i <= e; i++) mark[i][q] = true; runs.push(e - r + 1); } r = e + 1; } }
        return { mark, runs };
      };
      const hasMove = () => {
        for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) for (const d of [[0, 1], [1, 0]]) { const r2 = r + d[0], q2 = q + d[1]; if (r2 < n && q2 < n) { swp(r, q, r2, q2); const f = find(); swp(r, q, r2, q2); if (f.runs.length) return [r, q, r2, q2]; } }
        return null;
      };
      do { fill(); } while (!hasMove()); info();
      const setOff = (r, q, r2, q2) => { const a = grid[r][q], b = grid[r2][q2]; a.ox = q2 - q; a.oy = r2 - r; b.ox = q - q2; b.oy = r - r2; a.lin = b.lin = true; };
      const doSwap = (r, q, r2, q2) => { swp(r, q, r2, q2); setOff(r, q, r2, q2); phase = "swap"; pt = .17; sw = [r, q, r2, q2]; sel = null; drag = null; hint = null; idleT = 0; g.sfx("swish"); };
      const startClear = f => {
        chain++; let gain = 0; f.runs.forEach(l => { gain += l === 3 ? 30 : l === 4 ? 60 : l === 5 ? 120 : 200; }); gain *= chain; g.add(gain);
        let fr = null; for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) if (f.mark[r][q]) { grid[r][q].dead = true; parts.add((q + .5) * cs, (r + .5) * cs, COL[grid[r][q].t], 6, 180); if (!fr) fr = [r, q]; }
        POP(g, k, "+" + gain + (chain > 1 ? " x" + chain : ""), (fr[1] + .5) * cs, (fr[0] + .5) * cs, "#ffe066"); g.sfx(chain > 1 ? "note" : "pop", 330 + chain * 90); if (chain > 1) shake = .15; phase = "clear"; pt = .25; info();
      };
      const endClear = () => {
        for (let q = 0; q < n; q++) {
          const keep = []; for (let r = n - 1; r >= 0; r--) if (grid[r][q] && !grid[r][q].dead) keep.push({ gm: grid[r][q], from: r });
          const miss = n - keep.length; keep.forEach((kp, i) => { const nr = n - 1 - i; kp.gm.oy += kp.from - nr; kp.gm.vy = 0; grid[nr][q] = kp.gm; });
          for (let i = 0; i < miss; i++) { const gm = gem(rtype()); gm.oy = -miss; grid[miss - 1 - i][q] = gm; }
        }
        phase = "fall";
      };
      g.on(c, "pointerdown", e => {
        if (phase !== "idle" || fin) return; const p = pos(e), r = Math.floor(p.y / cs), q = Math.floor(p.x / cs); if (r < 0 || q < 0 || r >= n || q >= n) return;
        if (sel && Math.abs(sel[0] - r) + Math.abs(sel[1] - q) === 1) { doSwap(sel[0], sel[1], r, q); return; }
        sel = [r, q]; drag = { r, q, x: p.x, y: p.y }; g.sfx("click");
      });
      g.on(c, "pointermove", e => {
        if (!drag || phase !== "idle") return; const p = pos(e), dx = p.x - drag.x, dy = p.y - drag.y;
        if (Math.hypot(dx, dy) < cs * .5) return; const r = drag.r + (Math.abs(dy) > Math.abs(dx) ? Math.sign(dy) : 0), q = drag.q + (Math.abs(dy) > Math.abs(dx) ? 0 : Math.sign(dx));
        const d0 = drag; drag = null; if (r >= 0 && q >= 0 && r < n && q < n) doSwap(d0.r, d0.q, r, q);
      });
      g.on(window, "pointerup", () => { drag = null; });
      const path = (t, cx, cy, r) => {
        x.beginPath();
        if (t === 0) x.arc(cx, cy, r, 0, 7);
        else if (t === 1) { x.moveTo(cx, cy - r * 1.1); x.lineTo(cx + r * .9, cy); x.lineTo(cx, cy + r * 1.1); x.lineTo(cx - r * .9, cy); x.closePath(); }
        else if (t === 2) { x.moveTo(cx, cy - r); x.lineTo(cx + r * 1.05, cy + r * .8); x.lineTo(cx - r * 1.05, cy + r * .8); x.closePath(); }
        else if (t === 3) x.roundRect(cx - r * .85, cy - r * .85, r * 1.7, r * 1.7, r * .3);
        else if (t === 4) { for (let i = 0; i < 6; i++) x.lineTo(cx + Math.cos(i * 1.047) * r, cy + Math.sin(i * 1.047) * r); x.closePath(); }
        else if (t === 5) { for (let i = 0; i < 10; i++) { const a = -1.57 + i * .628, rr = i % 2 ? r * .5 : r * 1.12; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.closePath(); }
        else { for (let i = 0; i < 5; i++) x.lineTo(cx + Math.cos(-1.57 + i * 1.2566) * r * 1.05, cy + Math.sin(-1.57 + i * 1.2566) * r * 1.05); x.closePath(); }
      };
      g.loop((dt, t) => {
        // update
        if (!fin) {
          grid.forEach(row => row.forEach(gm => {
            if (gm.lin) { const sp = 7 * dt; gm.ox = Math.abs(gm.ox) <= sp ? 0 : gm.ox - Math.sign(gm.ox) * sp; gm.oy = Math.abs(gm.oy) <= sp ? 0 : gm.oy - Math.sign(gm.oy) * sp; if (!gm.ox && !gm.oy) gm.lin = false; }
            else if (gm.oy < 0) { gm.vy += 45 * dt; gm.oy += gm.vy * dt; if (gm.oy >= 0) { gm.oy = 0; gm.vy = 0; } }
            if (gm.dead) gm.s = Math.max(0, pt / .25);
          }));
          if (phase === "swap" || phase === "back") {
            pt -= dt;
            if (pt <= 0) {
              if (phase === "back") phase = "idle";
              else { const f = find(); if (f.runs.length) { movesLeft--; chain = 0; startClear(f); } else { swp(sw[0], sw[1], sw[2], sw[3]); setOff(sw[0], sw[1], sw[2], sw[3]); phase = "back"; pt = .17; g.sfx("wrong"); } }
            }
          } else if (phase === "clear") { pt -= dt; if (pt <= 0) endClear(); }
          else if (phase === "fall") {
            if (!grid.some(row => row.some(gm => gm.oy < 0 || gm.lin))) {
              g.sfx("tick"); const f = find(); if (f.runs.length) startClear(f);
              else {
                phase = "idle"; chain = 0; idleT = 0;
                if (g.score() >= TARGET) { fin = true; g.add(movesLeft * 50); g.sfx("cheer"); g.timeout(() => g.win("Target reached!"), 500); }
                else if (movesLeft <= 0) { fin = true; g.timeout(() => g.over("Out of moves!"), 500); }
                else if (!hasMove()) { do { fill(); } while (!hasMove()); POP(g, k, "Shuffle!", W / 2, H / 2, "#fff"); }
              }
            }
          } else if (phase === "idle") { idleT += dt; if (idleT > 6 && !hint) hint = hasMove(); }
        }
        if (shake > 0) shake -= dt;
        x.save(); x.clearRect(0, 0, W, H); const bg = x.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#2a1450"); bg.addColorStop(1, "#0c1a40"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        if (shake > 0) x.translate(g.rf(-3, 3), g.rf(-3, 3));
        for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) { x.fillStyle = (r + q) % 2 ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.03)"; x.fillRect(q * cs, r * cs, cs, cs); }
        x.save(); x.beginPath(); x.rect(0, 0, W, H); x.clip();
        for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) {
          const gm = grid[r][q]; if (!gm) continue; const cx = (q + gm.ox + .5) * cs, cy = (r + gm.oy + .5) * cs, rad = cs * .36 * gm.s; if (rad < 1) continue;
          const pulse = hint && ((hint[0] === r && hint[1] === q) || (hint[2] === r && hint[3] === q)) ? 1 + .08 * Math.sin(t * 8) : 1;
          x.shadowColor = "rgba(0,0,0,.4)"; x.shadowBlur = 6; x.shadowOffsetY = 3; x.fillStyle = COL[gm.t]; path(gm.t, cx, cy, rad * pulse); x.fill(); x.shadowColor = "transparent";
          const gr = x.createRadialGradient(cx - rad * .35, cy - rad * .4, rad * .05, cx, cy, rad * 1.1); gr.addColorStop(0, "rgba(255,255,255,.85)"); gr.addColorStop(.35, "rgba(255,255,255,0)"); gr.addColorStop(1, "rgba(0,0,0,.35)");
          x.fillStyle = gr; path(gm.t, cx, cy, rad * pulse); x.fill(); x.strokeStyle = "rgba(255,255,255,.55)"; x.lineWidth = 2; x.stroke();
          if (sel && sel[0] === r && sel[1] === q && phase === "idle") { x.strokeStyle = "rgba(255,255,255," + (.6 + .4 * Math.sin(t * 10)) + ")"; x.lineWidth = 4; RR(x, q * cs + 3, r * cs + 3, cs - 6, cs - 6, 14); x.stroke(); }
        }
        x.restore(); parts.draw(x, dt);
        const pw = W - 40; x.fillStyle = "rgba(0,0,0,.45)"; RR(x, 20, 6, pw, 8, 4); x.fill(); x.fillStyle = "#ffe066"; RR(x, 20, 6, pw * Math.min(1, g.score() / TARGET), 8, 4); x.fill();
        x.restore();
      });
    }
  });

  // ---- Bubble Burst: bubble shooter ----
  B.add({
    id: "s5-bubbleburst", name: "Bubble Burst", ages: [8, 20], cat: "Puzzle", color: "#4cc3ff", icon: "oO",
    desc: "Shoot bubbles to join three of the same colour and pop whole clusters.", controls: "Move the mouse or finger to aim, click or tap to shoot (Left/Right and Space work too). Tap the small bubble to swap.",
    start(g) {
      const R = 20, COLS = 12, RH = R * Math.sqrt(3), RT = 16, LIMIT = 14, k = g.canvas(480, 600), { c, x, W, H, pos } = k, NC = g.by(4, 5, 6), dropEvery = g.by(8, 6, 5), parts = mkParts();
      const COL = ["#ff4d6d", "#4cc3ff", "#ffd34e", "#6be28f", "#b48cff", "#ff9a4d"], CX = W / 2, CY = H - 40;
      let par = 0, rows = [], ang = -Math.PI / 2, bullet = null, cur = 0, nxt = 0, miss = 0, falling = [], shake = 0, fin = false, flash = [];
      const colsFor = r => ((r + par) % 2) ? COLS - 1 : COLS, off = r => ((r + par) % 2) ? R : 0, px = (r, q) => R + q * 2 * R + off(r), py = r => R + r * RH;
      for (let r = 0; r < RT; r++) rows.push(Array(colsFor(r)).fill(-1));
      for (let r = 0; r < g.by(5, 6, 7); r++) for (let q = 0; q < colsFor(r); q++) rows[r][q] = (q > 0 && Math.random() < .45) ? rows[r][q - 1] : g.ri(0, NC - 1);
      const inPlay = () => { const s = new Set(); rows.forEach(r => r.forEach(v => { if (v >= 0) s.add(v); })); return [...s]; };
      const pickCol = () => { const a = inPlay(); return a.length ? g.pick(a) : 0; };
      cur = pickCol(); nxt = pickCol();
      const info = () => g.status("Drop in: " + (dropEvery - miss) + " misses");
      info();
      const nbr = (r, q) => {
        const o = ((r + par) % 2) ? 1 : 0, a = [[r, q - 1], [r, q + 1]];
        [r - 1, r + 1].forEach(rr => { if (o) a.push([rr, q], [rr, q + 1]); else a.push([rr, q - 1], [rr, q]); });
        return a.filter(p => p[0] >= 0 && p[0] < RT && p[1] >= 0 && p[1] < colsFor(p[0]));
      };
      const shoot = () => { if (bullet || fin) return; bullet = { x: CX, y: CY, vx: Math.cos(ang) * 640, vy: Math.sin(ang) * 640, col: cur }; cur = nxt; nxt = pickCol(); g.sfx("launch"); };
      const aim = e => { const p = pos(e); ang = g.clamp(Math.atan2(p.y - CY, p.x - CX), -Math.PI + .14, -.14); };
      g.on(c, "pointermove", aim);
      g.on(c, "pointerdown", e => { const p = pos(e); if (Math.hypot(p.x - 60, p.y - CY) < 30) { const t = cur; cur = nxt; nxt = t; g.sfx("flip"); return; } aim(e); shoot(); });
      g.on(window, "keydown", e => { if (e.key === " ") shoot(); });
      const pushRow = () => {
        rows.pop(); par++; const nr = Array.from({ length: colsFor(0) }, () => g.ri(0, NC - 1)); rows.unshift(nr); shake = .25; g.sfx("thump"); g.pop("Rows drop!", W / 2 * c.clientWidth / W, 60);
      };
      const land = () => {
        let best = null, bd = 1e9; const r0 = Math.round((bullet.y - R) / RH);
        for (let r = Math.max(0, r0 - 1); r <= Math.min(RT - 1, r0 + 1); r++) for (let q = 0; q < colsFor(r); q++) if (rows[r][q] < 0) { const d = Math.hypot(px(r, q) - bullet.x, py(r) - bullet.y); if (d < bd) { bd = d; best = [r, q]; } }
        const col = bullet.col; bullet = null; if (!best) return;
        rows[best[0]][best[1]] = col; g.sfx("tick");
        const seen = new Set([best[0] * 100 + best[1]]), st = [best];
        while (st.length) { const p = st.pop(); nbr(p[0], p[1]).forEach(a => { const key = a[0] * 100 + a[1]; if (!seen.has(key) && rows[a[0]][a[1]] === col) { seen.add(key); st.push(a); } }); }
        if (seen.size >= 3) {
          seen.forEach(key => { const r = Math.floor(key / 100), q = key % 100; parts.add(px(r, q), py(r), COL[col], 7, 200); rows[r][q] = -1; });
          let gain = seen.size * 10; g.sfx("pop");
          const ok = new Set(), st2 = []; for (let q = 0; q < colsFor(0); q++) if (rows[0][q] >= 0) { ok.add(q); st2.push([0, q]); }
          while (st2.length) { const p = st2.pop(); nbr(p[0], p[1]).forEach(a => { const key = a[0] * 100 + a[1]; if (rows[a[0]][a[1]] >= 0 && !ok.has(key)) { ok.add(key); st2.push(a); } }); }
          let fl = 0; for (let r = 0; r < RT; r++) for (let q = 0; q < colsFor(r); q++) if (rows[r][q] >= 0 && !ok.has(r * 100 + q)) { falling.push({ x: px(r, q), y: py(r), vx: g.rf(-60, 60), vy: g.rf(-80, 0), col: rows[r][q] }); rows[r][q] = -1; fl++; }
          if (fl) { gain += fl * 20; g.sfx("cheer"); shake = .2; }
          g.add(gain); POP(g, k, "+" + gain, px(best[0], best[1]), py(best[0]), "#ffe066"); miss = 0;
        } else { miss++; if (miss >= dropEvery) { pushRow(); miss = 0; } }
        info();
        for (let r = LIMIT; r < RT; r++) if (rows[r].some(v => v >= 0)) { fin = true; g.timeout(() => g.over("The bubbles reached the bottom!"), 600); return; }
        if (!inPlay().length) { fin = true; g.add(200); g.sfx("cheer"); g.timeout(() => g.win("Board cleared!"), 700); return; }
        if (!inPlay().includes(cur)) cur = pickCol(); if (!inPlay().includes(nxt)) nxt = pickCol();
      };
      const bub = (cx, cy, r, col) => {
        const gr = x.createRadialGradient(cx - r * .35, cy - r * .35, r * .1, cx, cy, r); gr.addColorStop(0, "#fff"); gr.addColorStop(.3, COL[col]); gr.addColorStop(1, COL[col] + "cc");
        x.fillStyle = gr; x.beginPath(); x.arc(cx, cy, r - 1, 0, 7); x.fill(); x.strokeStyle = "rgba(255,255,255,.6)"; x.lineWidth = 2; x.stroke();
      };
      g.loop((dt, t) => {
        if (!fin) {
          if (g.keys.ArrowLeft) ang = Math.max(-Math.PI + .14, ang - 1.8 * dt); if (g.keys.ArrowRight) ang = Math.min(-.14, ang + 1.8 * dt);
          if (bullet) {
            const steps = Math.ceil(Math.hypot(bullet.vx, bullet.vy) * dt / 8);
            for (let s = 0; s < steps && bullet; s++) {
              bullet.x += bullet.vx * dt / steps; bullet.y += bullet.vy * dt / steps;
              if (bullet.x < R) { bullet.x = R; bullet.vx = -bullet.vx; } if (bullet.x > W - R) { bullet.x = W - R; bullet.vx = -bullet.vx; }
              if (bullet.y <= R) { land(); break; }
              const r0 = Math.round((bullet.y - R) / RH); let hitB = false;
              for (let r = Math.max(0, r0 - 2); r <= Math.min(RT - 1, r0 + 2) && !hitB; r++) for (let q = 0; q < colsFor(r); q++) if (rows[r][q] >= 0 && Math.hypot(px(r, q) - bullet.x, py(r) - bullet.y) < R * 1.8) { hitB = true; break; }
              if (hitB) land();
            }
          }
        }
        if (shake > 0) shake -= dt;
        x.save(); x.clearRect(0, 0, W, H); const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#1c2a7a"); bg.addColorStop(1, "#5ec8ff"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        if (shake > 0) x.translate(g.rf(-3, 3), g.rf(-3, 3));
        x.strokeStyle = "rgba(255,255,255,.35)"; x.setLineDash([8, 8]); x.lineWidth = 2; x.beginPath(); x.moveTo(0, LIMIT * RH + R); x.lineTo(W, LIMIT * RH + R); x.stroke(); x.setLineDash([]);
        for (let r = 0; r < RT; r++) for (let q = 0; q < colsFor(r); q++) if (rows[r][q] >= 0) bub(px(r, q), py(r), R, rows[r][q]);
        for (let i = falling.length - 1; i >= 0; i--) { const f = falling[i]; f.vy += 700 * dt; f.x += f.vx * dt; f.y += f.vy * dt; bub(f.x, f.y, R, f.col); if (f.y > H + 30) falling.splice(i, 1); }
        if (!fin && !bullet) {
          let ax = CX, ay = CY, vx = Math.cos(ang), vy = Math.sin(ang);
          for (let i = 0; i < 34; i++) { ax += vx * 12; ay += vy * 12; if (ax < R) { ax = R; vx = -vx; } if (ax > W - R) { ax = W - R; vx = -vx; } if (ay < R) break; x.fillStyle = "rgba(255,255,255," + (.7 - i * .02) + ")"; x.beginPath(); x.arc(ax, ay, 2.5, 0, 7); x.fill(); }
        }
        x.save(); x.translate(CX, CY); x.rotate(ang + Math.PI / 2); x.fillStyle = "#3b4a8a"; RR(x, -9, -46, 18, 46, 6); x.fill(); x.restore();
        x.fillStyle = "#2b3570"; x.beginPath(); x.arc(CX, CY + 6, 26, 0, 7); x.fill(); bub(CX, CY, R, cur);
        if (bullet) bub(bullet.x, bullet.y, R, bullet.col);
        bub(60, CY, 14, nxt); TXT(x, "NEXT", 60, CY - 26, 12, "#fff");
        parts.draw(x, dt); x.restore();
      });
    }
  });

  // ---- Colour Links: flow-style pipe connector ----
  B.add({
    id: "s5-colorlinks", name: "Colour Links", ages: [9, 20], cat: "Puzzle", color: "#34d399", icon: "~",
    desc: "Draw a pipe to join each pair of matching dots. Pipes can't cross!", controls: "Drag from a dot to its partner. Fill every square for a bonus.",
    start(g) {
      const k = g.canvas(600, 600), { c, x, W, H, pos } = k, parts = mkParts(), LEVELS = 3;
      const COL = ["#ff4d6d", "#4cc3ff", "#ffd34e", "#6be28f", "#b48cff", "#ff9a4d", "#2de2d0", "#ff6fb5", "#a3e635"];
      let lv = 0, N = 4, cs = 150, ends = [], paths = [], owner = [], dotAt = [], drawing = -1, wait = 0, strokes = 0, tt = 0;
      const rcOf = i => [Math.floor(i / N), i % N];
      const adj = (a, b) => { const p = rcOf(a), q = rcOf(b); return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) === 1; };
      const gen = () => {
        N = g.by(4, 5, 6) + lv; cs = W / N; const NN = N * N, m = Math.min(COL.length, N);
        let path = []; for (let r = 0; r < N; r++) for (let j = 0; j < N; j++) path.push(r * N + (r % 2 ? N - 1 - j : j));
        for (let it = 0; it < NN * 8; it++) {
          if (Math.random() < .5) path.reverse(); const e = path[path.length - 1], cand = [];
          for (let i = 0; i < path.length - 2; i++) if (adj(e, path[i])) cand.push(i);
          if (!cand.length) continue; const i = g.pick(cand); path = path.slice(0, i + 1).concat(path.slice(i + 1).reverse());
        }
        const lens = Array(m).fill(2); for (let i = 0; i < NN - 2 * m; i++) lens[g.ri(0, m - 1)]++;
        ends = []; dotAt = Array(NN).fill(-1); let pos0 = 0;
        lens.forEach((l, i) => { ends.push([path[pos0], path[pos0 + l - 1]]); dotAt[path[pos0]] = i; dotAt[path[pos0 + l - 1]] = i; pos0 += l; });
        paths = ends.map(() => []); owner = Array(NN).fill(-1); drawing = -1; wait = 0; strokes = 0; info();
      };
      const linked = () => paths.filter((p, i) => p.length > 1 && p[p.length - 1] !== p[0] && dotAt[p[p.length - 1]] === i).length;
      const info = () => g.status("Puzzle " + (lv + 1) + " of " + LEVELS + "   Linked " + linked() + "/" + ends.length);
      const rebuild = () => { owner.fill(-1); paths.forEach((p, i) => p.forEach(cell => { owner[cell] = i; })); };
      const complete = i => { const p = paths[i]; return p.length > 1 && p[p.length - 1] !== p[0] && dotAt[p[p.length - 1]] === i; };
      const cellAt = p => { const r = Math.floor(p.y / cs), q = Math.floor(p.x / cs); return (r < 0 || q < 0 || r >= N || q >= N) ? -1 : r * N + q; };
      const extend = nx => {
        const p = paths[drawing]; if (complete(drawing)) return false;
        if (dotAt[nx] >= 0 && dotAt[nx] !== drawing) return false;
        if (owner[nx] >= 0 && owner[nx] !== drawing) { const o = paths[owner[nx]], idx = o.indexOf(nx); if (idx <= 0) return false; o.length = idx; g.sfx("back"); }
        p.push(nx); rebuild();
        if (dotAt[nx] === drawing) { g.sfx("pop"); const q = rcOf(nx); parts.add((q[1] + .5) * cs, (q[0] + .5) * cs, COL[drawing], 14, 200); } else g.sfx("tick");
        info(); return true;
      };
      gen();
      g.on(c, "pointerdown", e => {
        if (wait) return; const cell = cellAt(pos(e)); if (cell < 0) return;
        if (dotAt[cell] >= 0) { drawing = dotAt[cell]; paths[drawing] = [cell]; strokes++; }
        else if (owner[cell] >= 0) { drawing = owner[cell]; paths[drawing].length = paths[drawing].indexOf(cell) + 1; strokes++; }
        else return; rebuild(); info(); g.sfx("click");
      });
      g.on(c, "pointermove", e => {
        if (drawing < 0 || wait) return; const cell = cellAt(pos(e)); if (cell < 0) return; const p = paths[drawing];
        for (let s = 0; s < 4; s++) {
          const last = p[p.length - 1]; if (last === cell) break;
          const idx = p.indexOf(cell); if (idx >= 0) { p.length = idx + 1; rebuild(); info(); break; }
          const a = rcOf(last), b = rcOf(cell), dr = b[0] - a[0], dq = b[1] - a[1];
          const nx = Math.abs(dr) >= Math.abs(dq) ? (a[0] + Math.sign(dr)) * N + a[1] : a[0] * N + a[1] + Math.sign(dq);
          if (!extend(nx)) break;
        }
      });
      g.on(window, "pointerup", () => {
        if (drawing < 0) return; drawing = -1;
        if (!wait && linked() === ends.length) {
          const full = owner.every(v => v >= 0), gain = 100 + (full ? 50 : 0); g.add(gain); POP(g, k, "+" + gain + (full ? " perfect!" : ""), W / 2, H / 2, "#ffe066"); g.sfx("cheer"); wait = .001;
          for (let i = 0; i < 40; i++) parts.add(g.rf(0, W), g.rf(0, H), g.pick(COL), 2, 120);
        }
      });
      g.loop((dt, t) => {
        tt = t; x.clearRect(0, 0, W, H); const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#10213f"); bg.addColorStop(1, "#0a1226"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) { const o = owner[r * N + q]; x.fillStyle = o >= 0 ? COL[o] + "33" : "rgba(255,255,255,.05)"; RR(x, q * cs + 3, r * cs + 3, cs - 6, cs - 6, 10); x.fill(); }
        x.lineCap = "round"; x.lineJoin = "round";
        paths.forEach((p, i) => {
          if (p.length < 2) return; x.strokeStyle = COL[i]; x.lineWidth = cs * .34; x.globalAlpha = complete(i) ? 1 : .85;
          if (complete(i)) { x.shadowColor = COL[i]; x.shadowBlur = 12; }
          x.beginPath(); p.forEach((cell, j) => { const q = rcOf(cell); if (j) x.lineTo((q[1] + .5) * cs, (q[0] + .5) * cs); else x.moveTo((q[1] + .5) * cs, (q[0] + .5) * cs); }); x.stroke(); x.shadowBlur = 0; x.globalAlpha = 1;
        });
        ends.forEach((e, i) => e.forEach(cell => { const q = rcOf(cell), cx = (q[1] + .5) * cs, cy = (q[0] + .5) * cs; x.fillStyle = COL[i]; x.shadowColor = COL[i]; x.shadowBlur = 14; x.beginPath(); x.arc(cx, cy, cs * (.26 + .02 * Math.sin(t * 4 + i)), 0, 7); x.fill(); x.shadowBlur = 0; x.fillStyle = "rgba(255,255,255,.55)"; x.beginPath(); x.arc(cx - cs * .08, cy - cs * .09, cs * .07, 0, 7); x.fill(); }));
        parts.draw(x, dt);
        if (wait) { wait += dt; if (wait > 1.1) { lv++; if (lv >= LEVELS) { g.win("All pipes joined!"); return false; } gen(); } }
      });
    }
  });

  // ---- Crate Pusher: sokoban with 5 levels ----
  B.add({
    id: "s5-cratepusher", name: "Crate Pusher", ages: [8, 20], cat: "Puzzle", color: "#e0a458", icon: "[]",
    desc: "Push every crate onto a glowing spot. Careful: you can push but never pull!", controls: "Arrow keys or WASD (Z undoes, R restarts level). On a phone tap beside the pusher or use the buttons.",
    start(g) {
      const k = g.canvas(600, 600), { c, x, W, H, pos } = k, parts = mkParts();
      const LV = [
        ["#####", "#@  #", "# $ #", "# . #", "#####"],
        ["#######", "#     #", "# $ $ #", "#  @  #", "# . . #", "#     #", "#######"],
        ["########", "#  #   #", "# $  $ #", "# .@#. #", "#   $  #", "# .    #", "########"],
        ["#######", "#.  #.#", "#  $  #", "# #$# #", "#  @  #", "#######"],
        ["#########", "#   #   #", "# $ # . #", "#  $@ . #", "# $  #  #", "#   . ###", "#########"]];
      let lv = 0, grid, w, h, goals, boxes, pr, pc, hist, moves, undos, wait, cs, ox, oy, dp, face = 1, tt = 0, shake = 0;
      const info = () => g.status("Level " + (lv + 1) + " of " + LV.length + "   Moves " + moves + "   Undos left " + (undos > 900 ? "any" : undos));
      const load = () => {
        const rows = LV[lv]; h = rows.length; w = Math.max(...rows.map(r => r.length)); grid = []; goals = []; boxes = [];
        rows.forEach((row, r) => { grid.push([]); for (let q = 0; q < w; q++) { const ch = row[q] || " "; grid[r][q] = ch === "#"; if (ch === "." || ch === "*" || ch === "+") goals.push([r, q]); if (ch === "$" || ch === "*") boxes.push({ r, c: q, x: q, y: r }); if (ch === "@" || ch === "+") { pr = r; pc = q; } } });
        cs = Math.min(W / w, H / h, 84); ox = (W - w * cs) / 2; oy = (H - h * cs) / 2; hist = []; moves = 0; undos = g.by(999, 15, 5); dp = { x: pc, y: pr }; wait = 0; info();
      };
      load();
      const isGoal = (r, q) => goals.some(a => a[0] === r && a[1] === q), boxAt = (r, q) => boxes.find(b => b.r === r && b.c === q);
      const onGoal = b => isGoal(b.r, b.c);
      const move = (dr, dq) => {
        if (wait) return; const nr = pr + dr, nq = pc + dq; if (dq) face = dq; if (nr < 0 || nq < 0 || nr >= h || nq >= w || grid[nr][nq]) { g.sfx("back"); shake = .1; return; }
        const b = boxAt(nr, nq); let pushed = false;
        if (b) { const br = nr + dr, bq = nq + dq; if (br < 0 || bq < 0 || br >= h || bq >= w || grid[br][bq] || boxAt(br, bq)) { g.sfx("back"); shake = .1; return; } hist.push({ pr, pc, b: boxes.map(z => [z.r, z.c]) }); b.r = br; b.c = bq; pushed = true; }
        else hist.push({ pr, pc, b: boxes.map(z => [z.r, z.c]) });
        pr = nr; pc = nq; moves++; g.sfx(pushed ? "thump" : "tick");
        if (pushed && onGoal(b)) { g.sfx("clink"); parts.add(ox + (b.c + .5) * cs, oy + (b.r + .5) * cs, "#ffe066", 10, 160); }
        info();
        if (boxes.every(onGoal)) { const gain = Math.max(40, 300 - moves * 2); g.add(gain); POP(g, k, "+" + gain, W / 2, H / 2, "#ffe066"); g.sfx("cheer"); wait = .001; }
      };
      const undo = () => {
        if (wait || !hist.length) return; if (undos <= 0) { g.sfx("wrong"); return; } const s = hist.pop(); pr = s.pr; pc = s.pc; boxes.forEach((b, i) => { b.r = s.b[i][0]; b.c = s.b[i][1]; }); moves = hist.length; undos--; g.sfx("back"); info();
      };
      const dirs = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0], a: [0, -1], d: [0, 1], w: [-1, 0], s: [1, 0] };
      g.on(window, "keydown", e => { const d = dirs[e.key]; if (d) move(d[0], d[1]); else if (e.key === "z" || e.key === "Z") undo(); else if (e.key === "r" || e.key === "R") load(); });
      g.on(c, "pointerdown", e => { const p = pos(e), dx = (p.x - ox) / cs - (pc + .5), dy = (p.y - oy) / cs - (pr + .5); if (Math.hypot(dx, dy) < .4) return; if (Math.abs(dx) > Math.abs(dy)) move(0, dx > 0 ? 1 : -1); else move(dy > 0 ? 1 : -1, 0); });
      const bt = g.html('<div style="display:flex;gap:8px;justify-content:center;margin-top:8px;flex-wrap:wrap"><button class="bg-btn" type="button" data-a="U">Up</button><button class="bg-btn" type="button" data-a="L">Left</button><button class="bg-btn" type="button" data-a="D">Down</button><button class="bg-btn" type="button" data-a="R">Right</button><button class="bg-btn" type="button" data-a="Z">Undo</button><button class="bg-btn" type="button" data-a="X">Redo level</button></div>');
      g.on(bt, "click", e => { const a = e.target.dataset && e.target.dataset.a; if (!a) return; if (a === "Z") undo(); else if (a === "X") load(); else { const d = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] }[a]; move(d[0], d[1]); } });
      g.loop((dt, t) => {
        tt = t; if (shake > 0) shake -= dt; const e = Math.min(1, dt * 18);
        dp.x += (pc - dp.x) * e; dp.y += (pr - dp.y) * e; boxes.forEach(b => { b.x += (b.c - b.x) * e; b.y += (b.r - b.y) * e; });
        x.save(); x.clearRect(0, 0, W, H); const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#3a2a1e"); bg.addColorStop(1, "#1d140e"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        if (shake > 0) x.translate(g.rf(-2, 2), 0); x.translate(ox, oy);
        for (let r = 0; r < h; r++) for (let q = 0; q < w; q++) {
          if (grid[r][q]) continue; x.fillStyle = (r + q) % 2 ? "#d9b98a" : "#cfae7e"; x.fillRect(q * cs, r * cs, cs, cs);
        }
        goals.forEach(a => { const cx = (a[1] + .5) * cs, cy = (a[0] + .5) * cs; x.strokeStyle = "rgba(60,200,120," + (.6 + .3 * Math.sin(t * 4)) + ")"; x.lineWidth = 4; x.beginPath(); x.arc(cx, cy, cs * .26, 0, 7); x.stroke(); x.fillStyle = "rgba(60,200,120,.35)"; x.beginPath(); x.arc(cx, cy, cs * .14, 0, 7); x.fill(); });
        for (let r = 0; r < h; r++) for (let q = 0; q < w; q++) if (grid[r][q]) {
          x.fillStyle = "#6d4a3a"; RR(x, q * cs, r * cs, cs, cs, 6); x.fill(); x.fillStyle = "#8a6050"; RR(x, q * cs + 3, r * cs + 3, cs - 6, cs * .45, 5); x.fill(); x.strokeStyle = "rgba(0,0,0,.25)"; x.lineWidth = 2; x.beginPath(); x.moveTo(q * cs, r * cs + cs * .5); x.lineTo(q * cs + cs, r * cs + cs * .5); x.stroke();
        }
        boxes.forEach(b => {
          const px = b.x * cs + cs * .08, py = b.y * cs + cs * .08, s = cs * .84, on = onGoal(b);
          x.shadowColor = "rgba(0,0,0,.4)"; x.shadowBlur = 6; x.shadowOffsetY = 3; x.fillStyle = on ? "#52c77a" : "#c98a3b"; RR(x, px, py, s, s, 8); x.fill(); x.shadowColor = "transparent";
          x.strokeStyle = on ? "#2c8a52" : "#8a5a1c"; x.lineWidth = 4; RR(x, px + 3, py + 3, s - 6, s - 6, 6); x.stroke(); x.beginPath(); x.moveTo(px + 6, py + 6); x.lineTo(px + s - 6, py + s - 6); x.moveTo(px + s - 6, py + 6); x.lineTo(px + 6, py + s - 6); x.stroke();
        });
        const cx = (dp.x + .5) * cs, cy = (dp.y + .5) * cs, r = cs * .34;
        x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(cx, cy + r * .9, r * .9, r * .35, 0, 0, 7); x.fill();
        const gr = x.createRadialGradient(cx - r * .3, cy - r * .4, r * .1, cx, cy, r); gr.addColorStop(0, "#8ad0ff"); gr.addColorStop(1, "#2a72d4"); x.fillStyle = gr; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
        x.fillStyle = "#ff5d73"; RR(x, cx - r * .8, cy - r * 1.05, r * 1.6, r * .45, r * .2); x.fill();
        x.fillStyle = "#fff"; x.beginPath(); x.arc(cx - r * .3 + face * r * .12, cy - r * .05, r * .2, 0, 7); x.arc(cx + r * .3 + face * r * .12, cy - r * .05, r * .2, 0, 7); x.fill(); x.fillStyle = "#123"; x.beginPath(); x.arc(cx - r * .3 + face * r * .2, cy - r * .05, r * .09, 0, 7); x.arc(cx + r * .3 + face * r * .2, cy - r * .05, r * .09, 0, 7); x.fill();
        parts.draw(x, dt); x.restore();
        if (wait) { wait += dt; if (wait > 1.1) { lv++; if (lv >= LV.length) { g.win("All crates delivered!"); return false; } load(); } }
      });
    }
  });

  // ---- Colour Tubes: water-sort ----
  B.add({
    id: "s5-colortubes", name: "Colour Tubes", ages: [8, 20], cat: "Puzzle", color: "#38bdf8", icon: "U",
    desc: "Pour the coloured liquids until every tube holds just one colour.", controls: "Tap a tube, then tap where to pour. You can only pour onto the same colour or an empty tube.",
    start(g) {
      const k = g.canvas(640, 440), { c, x, W, H, pos } = k, parts = mkParts(), NCOL = g.by(5, 7, 9), CAP = g.by(4, 4, 5), LH = g.by(34, 34, 30), TW = 46, TH = CAP * LH + 14;
      const COL = ["#ff4d6d", "#4cc3ff", "#ffd34e", "#6be28f", "#b48cff", "#ff9a4d", "#2de2d0", "#ff6fb5", "#a3e635"];
      let tubes = [], sel = -1, moves = 0, undoS = [], extra = false, lift = [], rect = [], stream = null, fin = 0, tt = 0;
      const lay = () => {
        const n = tubes.length, rc = n <= 6 ? 1 : 2, per = Math.ceil(n / rc); rect = [];
        for (let i = 0; i < n; i++) {
          const row = rc === 1 ? 0 : (i < per ? 0 : 1), cnt = row === 0 ? per : n - per, gap = 22, sx = (W - (cnt * TW + (cnt - 1) * gap)) / 2, col = row === 0 ? i : i - per;
          rect.push({ x: sx + col * (TW + gap), y: rc === 1 ? (H - TH) / 2 : (row === 0 ? 16 : 16 + TH + 44) });
        }
        while (lift.length < n) lift.push(0);
      };
      const solved = () => tubes.every(t => t.length === 0 || (t.length === CAP && t.every(v => v === t[0])));
      do {
        const units = []; for (let i = 0; i < NCOL; i++) for (let j = 0; j < CAP; j++) units.push(i);
        const s = g.shuffle(units); tubes = []; for (let i = 0; i < NCOL; i++) tubes.push(s.slice(i * CAP, (i + 1) * CAP)); tubes.push([], []);
      } while (solved());
      lay();
      const info = () => g.status("Moves: " + moves);
      info();
      const topRun = t => { let n = 0; while (n < t.length && t[t.length - 1 - n] === t[t.length - 1]) n++; return n; };
      const pour = (a, b) => {
        const A = tubes[a], Bt = tubes[b]; if (!A.length || Bt.length >= CAP || (Bt.length && Bt[Bt.length - 1] !== A[A.length - 1])) return false;
        undoS.push(JSON.stringify(tubes)); const col = A[A.length - 1]; let n = Math.min(topRun(A), CAP - Bt.length);
        for (let i = 0; i < n; i++) Bt.push(A.pop());
        moves++; info(); g.sfx("splash"); const ra = rect[a], rb = rect[b];
        stream = { x1: ra.x + TW / 2, y1: ra.y - 8, x2: rb.x + TW / 2, y2: rb.y + TH - 14 - (Bt.length) * LH, col: COL[col], t: .3 };
        parts.add(stream.x2, stream.y2, COL[col], 10, 120);
        if (solved()) { fin = .001; g.sfx("cheer"); g.score(Math.max(50, g.by(300, 500, 800) - moves * 4)); }
        return true;
      };
      g.on(c, "pointerdown", e => {
        if (fin) return; const p = pos(e); let hit = -1; rect.forEach((r, i) => { if (p.x >= r.x - 8 && p.x <= r.x + TW + 8 && p.y >= r.y - 24 && p.y <= r.y + TH + 8) hit = i; });
        if (hit < 0) { sel = -1; return; }
        if (sel < 0) { if (tubes[hit].length) { sel = hit; g.sfx("pick"); } else g.sfx("back"); return; }
        if (sel === hit) { sel = -1; g.sfx("back"); return; }
        if (pour(sel, hit)) sel = -1; else { g.sfx("wrong"); sel = tubes[hit].length ? hit : -1; }
      });
      const bt = g.html('<div style="display:flex;gap:8px;justify-content:center;margin-top:8px"><button class="bg-btn" type="button" data-a="U">Undo</button><button class="bg-btn" type="button" data-a="E">Extra tube (once)</button></div>');
      g.on(bt, "click", e => {
        const a = e.target.dataset && e.target.dataset.a; if (!a || fin) return;
        if (a === "U" && undoS.length) { tubes = JSON.parse(undoS.pop()); moves = Math.max(0, moves - 1); sel = -1; g.sfx("back"); info(); }
        if (a === "E" && !extra && tubes.length < 12) { extra = true; tubes.push([]); lay(); g.sfx("pop"); }
      });
      g.loop((dt, t) => {
        tt = t; x.clearRect(0, 0, W, H); const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#153a63"); bg.addColorStop(1, "#0a1830"); x.fillStyle = bg; x.fillRect(0, 0, W, H); bgStars(x, W, H, t, 30);
        tubes.forEach((tb, i) => {
          const r = rect[i]; lift[i] += ((sel === i ? 1 : 0) - lift[i]) * Math.min(1, dt * 14); const yo = -lift[i] * 18, full = tb.length === CAP && tb.every(v => v === tb[0]);
          x.save(); x.translate(r.x, r.y + yo);
          x.beginPath(); x.roundRect(0, 0, TW, TH, [4, 4, TW / 2, TW / 2]); x.fillStyle = "rgba(255,255,255,.07)"; x.fill();
          x.save(); x.clip();
          tb.forEach((v, j) => { const ly = TH - 5 - (j + 1) * LH; const gr = x.createLinearGradient(0, 0, TW, 0); gr.addColorStop(0, COL[v]); gr.addColorStop(.3, "#ffffffaa"); gr.addColorStop(.45, COL[v]); gr.addColorStop(1, COL[v]); x.fillStyle = COL[v]; x.fillRect(2, ly, TW - 4, LH + .6); x.fillStyle = "rgba(255,255,255,.28)"; x.fillRect(7, ly + 2, 6, LH - 4); x.fillStyle = "rgba(0,0,0,.15)"; x.fillRect(2, ly + LH - 1.5, TW - 4, 1.5); });
          x.restore();
          x.beginPath(); x.roundRect(0, 0, TW, TH, [4, 4, TW / 2, TW / 2]); x.strokeStyle = full ? "#ffe066" : (sel === i ? "#fff" : "rgba(255,255,255,.55)"); x.lineWidth = full || sel === i ? 4 : 3; x.stroke();
          if (full) { x.fillStyle = "#ffe066"; RR(x, -3, -9, TW + 6, 9, 4); x.fill(); }
          x.restore();
        });
        if (stream) { stream.t -= dt; if (stream.t <= 0) stream = null; else { x.strokeStyle = stream.col; x.lineWidth = 7; x.lineCap = "round"; x.beginPath(); x.moveTo(stream.x1, stream.y1); x.quadraticCurveTo((stream.x1 + stream.x2) / 2, Math.min(stream.y1, stream.y2) - 24, stream.x2, stream.y2); x.stroke(); } }
        parts.draw(x, dt);
        if (fin) { fin += dt; if (fin > 1.2) { g.win("All sorted!"); return false; } }
      });
    }
  });

  // ---- Ice Slide: slide until you hit something ----
  B.add({
    id: "s5-iceslide", name: "Ice Slide", ages: [8, 20], cat: "Puzzle", color: "#7dd3fc", icon: "**",
    desc: "The ice is slippery! Slide the penguin until it stops, and find a way to the swirl.", controls: "Swipe, arrow keys or WASD to slide. The penguin keeps going until it hits a rock or edge. R restarts a maze.",
    start(g) {
      const k = g.canvas(600, 600), { c, x, W, H } = k, N = g.by(7, 8, 10), cs = W / N, LEVELS = 5, parts = mkParts();
      let lv = 0, walls, sr, sc, gr0, gc0, par, pr, pc, moves, anim = null, wait = 0, tt = 0, dpx, dpy, sq = 0, face = 1;
      const DIRS = [[0, -1], [0, 1], [-1, 0], [1, 0]];
      const slide = (r, q, d, goal) => {
        let n = 0; for (;;) { const nr = r + d[0], nq = q + d[1]; if (nr < 0 || nq < 0 || nr >= N || nq >= N || walls[nr][nq]) break; r = nr; q = nq; n++; if (goal && goal[0] === r && goal[1] === q) break; } return [r, q, n];
      };
      const bfs = (a, b, goal) => {
        const dist = Array.from({ length: N }, () => Array(N).fill(-1)); dist[a][b] = 0; const qu = [[a, b]];
        while (qu.length) { const p = qu.shift(); if (goal && p[0] === goal[0] && p[1] === goal[1]) continue; for (const d of DIRS) { const s = slide(p[0], p[1], d, goal); if (dist[s[0]][s[1]] < 0) { dist[s[0]][s[1]] = dist[p[0]][p[1]] + 1; qu.push(s); } } }
        return dist;
      };
      const gen = () => {
        const minD = g.by(3, 5, 7) + Math.floor(lv / 2), dens = g.by(.15, .19, .22); let best = null;
        for (let tries = 0; tries < 500; tries++) {
          walls = Array.from({ length: N }, () => Array.from({ length: N }, () => Math.random() < dens));
          sr = g.ri(0, N - 1); sc = g.ri(0, N - 1); walls[sr][sc] = false;
          const d1 = bfs(sr, sc, null), cand = []; for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) if (d1[r][q] >= minD) cand.push([r, q, d1[r][q]]);
          if (!cand.length) continue; cand.sort((a, b) => b[2] - a[2]); const gp = g.pick(cand.slice(0, Math.min(4, cand.length)));
          const d2 = bfs(sr, sc, gp), pd = d2[gp[0]][gp[1]]; if (pd < 0) continue;
          const cur = { w: walls, sr, sc, gr: gp[0], gc: gp[1], par: pd }; if (!best || pd > best.par) best = cur; if (pd >= minD) break;
        }
        if (!best) { walls = Array.from({ length: N }, () => Array(N).fill(false)); walls[0][1] = true; best = { w: walls, sr: 0, sc: 0, gr: 0, gc: N - 1, par: 1 }; walls[0][N - 1] = false; }
        walls = best.w; sr = best.sr; sc = best.sc; gr0 = best.gr; gc0 = best.gc; par = best.par; restart();
      };
      const restart = () => { pr = sr; pc = sc; dpx = pc; dpy = pr; moves = 0; anim = null; wait = 0; info(); };
      const info = () => g.status("Maze " + (lv + 1) + " of " + LEVELS + "   Slides " + moves + "   Best possible " + par);
      gen();
      const go = di => {
        if (anim || wait) return; const s = slide(pr, pc, DIRS[di], [gr0, gc0]); if (!s[2]) { g.sfx("back"); return; }
        if (di < 2) face = di === 1 ? 1 : -1; anim = { from: [pr, pc], to: [s[0], s[1]], t: 0, dur: s[2] / 16 }; pr = s[0]; pc = s[1]; moves++; g.sfx("swish"); info();
      };
      const dm = { ArrowLeft: 0, ArrowRight: 1, ArrowUp: 2, ArrowDown: 3, a: 0, d: 1, w: 2, s: 3 };
      g.on(window, "keydown", e => { if (dm[e.key] !== undefined) go(dm[e.key]); else if ((e.key === "r" || e.key === "R") && !wait) restart(); });
      swipeOn(g, c, go);
      const rb = g.html('<div style="display:flex;gap:8px;justify-content:center;margin-top:8px"><button class="bg-btn" type="button">Restart this maze</button></div>');
      g.on(rb, "click", () => { if (!wait) { restart(); g.sfx("back"); } });
      g.loop((dt, t) => {
        tt = t;
        if (anim) {
          anim.t += dt; const f = Math.min(1, anim.t / anim.dur); dpx = g.lerp(anim.from[1], anim.to[1], f); dpy = g.lerp(anim.from[0], anim.to[0], f);
          if (Math.random() < .6) parts.add((dpx + .5) * cs, (dpy + .85) * cs, "#fff", 1, 40);
          if (f >= 1) { anim = null; sq = .25; g.sfx("thump"); if (pr === gr0 && pc === gc0) { const gain = Math.max(20, 120 - (moves - par) * 15); g.add(gain); POP(g, k, "+" + gain, W / 2, H / 2, "#ffe066"); g.sfx("cheer"); wait = .001; for (let i = 0; i < 30; i++) parts.add((pc + .5) * cs, (pr + .5) * cs, g.pick(["#fff", "#7dd3fc", "#ffe066"]), 1, 260); } }
        }
        if (sq > 0) sq -= dt;
        x.clearRect(0, 0, W, H); const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#d4f1ff"); bg.addColorStop(1, "#9bd7f5"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) {
          if (walls[r][q]) continue; x.fillStyle = (r + q) % 2 ? "#c6ecff" : "#b5e4fb"; x.fillRect(q * cs, r * cs, cs, cs);
          x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 2; x.beginPath(); x.moveTo(q * cs + cs * .2, r * cs + cs * .3); x.lineTo(q * cs + cs * .42, r * cs + cs * .22); x.stroke();
        }
        for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) if (walls[r][q]) {
          const cx = (q + .5) * cs, cy = (r + .5) * cs; x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(cx, cy + cs * .38, cs * .4, cs * .12, 0, 0, 7); x.fill();
          x.fillStyle = "#6b7a8f"; RR(x, q * cs + cs * .08, r * cs + cs * .12, cs * .84, cs * .76, cs * .22); x.fill(); x.fillStyle = "#8896ab"; RR(x, q * cs + cs * .14, r * cs + cs * .16, cs * .5, cs * .3, cs * .12); x.fill();
          x.fillStyle = "#fff"; RR(x, q * cs + cs * .1, r * cs + cs * .08, cs * .8, cs * .22, cs * .11); x.fill();
        }
        const gx = (gc0 + .5) * cs, gy = (gr0 + .5) * cs; for (let i = 0; i < 3; i++) { x.strokeStyle = ["#7c3aed", "#38bdf8", "#34d399"][i]; x.lineWidth = 5; x.beginPath(); x.arc(gx, gy, cs * (.16 + i * .09), t * 3 + i, t * 3 + i + 4.2); x.stroke(); }
        const px = (dpx + .5) * cs, py = (dpy + .5) * cs, s = cs * .36, bs = sq > 0 ? 1 - .15 * Math.sin(sq * 12.5) : 1;
        x.save(); x.translate(px, py + cs * .1); x.scale(1 / bs, bs); x.fillStyle = "rgba(0,0,0,.18)"; x.beginPath(); x.ellipse(0, s * .85, s * .9, s * .25, 0, 0, 7); x.fill();
        x.fillStyle = "#26324a"; x.beginPath(); x.ellipse(0, 0, s * .85, s, 0, 0, 7); x.fill(); x.fillStyle = "#fff"; x.beginPath(); x.ellipse(0, s * .2, s * .55, s * .72, 0, 0, 7); x.fill();
        x.fillStyle = "#fff"; x.beginPath(); x.arc(-s * .28, -s * .4, s * .2, 0, 7); x.arc(s * .28, -s * .4, s * .2, 0, 7); x.fill(); x.fillStyle = "#111"; x.beginPath(); x.arc(-s * .28 + face * s * .06, -s * .4, s * .09, 0, 7); x.arc(s * .28 + face * s * .06, -s * .4, s * .09, 0, 7); x.fill();
        x.fillStyle = "#ff9a2e"; x.beginPath(); x.moveTo(-s * .16, -s * .18); x.lineTo(s * .16, -s * .18); x.lineTo(0, s * .04); x.closePath(); x.fill(); x.fillRect(-s * .6, s * .85, s * .4, s * .12); x.fillRect(s * .2, s * .85, s * .4, s * .12); x.restore();
        parts.draw(x, dt);
        if (wait) { wait += dt; if (wait > 1.1) { lv++; if (lv >= LEVELS) { g.win("Made it through every maze!"); return false; } gen(); } }
      });
    }
  });

  // ---- Pipe Twist: rotate the pipes so the water reaches everywhere ----
  B.add({
    id: "s5-pipetwist", name: "Pipe Twist", ages: [8, 20], cat: "Puzzle", color: "#60a5fa", icon: "+",
    desc: "Twist the pipe pieces so water from the tap flows to every pipe.", controls: "Tap or click a pipe to turn it. Wet pipes glow blue. Wet them all!",
    start(g) {
      const k = g.canvas(600, 600), { c, x, W, H, pos } = k, LEVELS = 3, parts = mkParts();
      let lv = 0, N = 4, cs = 150, T = [], src = 0, taps = 0, wait = 0, tt = 0;
      const BIT = [[-1, 0, 1], [0, 1, 2], [1, 0, 4], [0, -1, 8]], opp = d => ((d << 2) | (d >> 2)) & 15, rotM = m => ((m << 1) | (m >> 3)) & 15;
      const mask = t => { let m = t.base; for (let i = 0; i < (t.rot % 4); i++) m = rotM(m); return m; };
      const flow = () => {
        const wet = Array(N * N).fill(false), st = [src]; wet[src] = true;
        while (st.length) { const i = st.pop(), r = Math.floor(i / N), q = i % N, m = mask(T[i]); BIT.forEach(d => { const nr = r + d[0], nq = q + d[1]; if (!(m & d[2]) || nr < 0 || nq < 0 || nr >= N || nq >= N) return; const j = nr * N + nq; if (!wet[j] && (mask(T[j]) & opp(d[2]))) { wet[j] = true; st.push(j); } }); }
        return wet;
      };
      const info = () => { const w = flow().filter(v => v).length; g.status("Puzzle " + (lv + 1) + " of " + LEVELS + "   Wet pipes " + w + "/" + N * N + "   Turns " + taps); };
      const gen = () => {
        N = g.by(4, 5, 6) + lv; cs = W / N; const NN = N * N; src = g.ri(Math.floor(N / 3), Math.ceil(2 * N / 3)) * N + g.ri(Math.floor(N / 3), Math.ceil(2 * N / 3)); if (src >= NN) src = NN - 1;
        const base = Array(NN).fill(0), seen = Array(NN).fill(false), fr = []; seen[src] = true;
        const addFr = i => { const r = Math.floor(i / N), q = i % N; BIT.forEach(d => { const nr = r + d[0], nq = q + d[1]; if (nr >= 0 && nq >= 0 && nr < N && nq < N && !seen[nr * N + nq]) fr.push([i, nr * N + nq, d[2]]); }); };
        addFr(src);
        while (fr.length) { const ix = g.ri(0, fr.length - 1), e = fr[ix]; fr[ix] = fr[fr.length - 1]; fr.pop(); if (seen[e[1]]) continue; seen[e[1]] = true; base[e[0]] |= e[2]; base[e[1]] |= opp(e[2]); addFr(e[1]); }
        do { T = base.map(b => { const rot = g.ri(0, 3); return { base: b, rot, vang: rot * 1.5708, w: 0 }; }); } while (flow().every(v => v));
        taps = 0; wait = 0; info();
      };
      gen();
      g.on(c, "pointerdown", e => {
        if (wait) return; const p = pos(e), r = Math.floor(p.y / cs), q = Math.floor(p.x / cs); if (r < 0 || q < 0 || r >= N || q >= N) return;
        const t = T[r * N + q]; t.rot++; taps++; g.sfx("click"); info();
        if (flow().every(v => v)) { const gain = Math.max(20, N * N * 12 - taps * 3); g.add(gain); POP(g, k, "+" + gain, W / 2, H / 2, "#ffe066"); g.sfx("cheer"); wait = .001; for (let i = 0; i < 40; i++) parts.add(g.rf(0, W), g.rf(0, H), g.pick(["#60a5fa", "#fff", "#7dd3fc"]), 2, 140); }
      });
      g.loop((dt, t) => {
        tt = t; const wet = flow();
        x.clearRect(0, 0, W, H); const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#1b2a41"); bg.addColorStop(1, "#0e1626"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        for (let i = 0; i < N * N; i++) {
          const tl = T[i], r = Math.floor(i / N), q = i % N, cx = (q + .5) * cs, cy = (r + .5) * cs;
          tl.vang += (tl.rot * 1.5708 - tl.vang) * Math.min(1, dt * 14); tl.w += ((wet[i] ? 1 : 0) - tl.w) * Math.min(1, dt * 5);
          x.fillStyle = "rgba(255,255,255,.05)"; RR(x, q * cs + 3, r * cs + 3, cs - 6, cs - 6, 10); x.fill();
          x.save(); x.translate(cx, cy); x.rotate(tl.vang); x.lineCap = "round";
          for (let pass = 0; pass < 2; pass++) {
            if (pass && tl.w < .02) break; x.globalAlpha = pass ? tl.w : 1; x.strokeStyle = pass ? "#3cb8ff" : "#9a8c7a"; x.fillStyle = x.strokeStyle; x.lineWidth = cs * .24;
            if (pass) { x.shadowColor = "#3cb8ff"; x.shadowBlur = 10; }
            x.beginPath(); BIT.forEach(d => { if (tl.base & d[2]) { x.moveTo(0, 0); x.lineTo(d[1] * cs * .5, d[0] * cs * .5); } }); x.stroke();
            x.beginPath(); x.arc(0, 0, cs * .15, 0, 7); x.fill(); x.shadowBlur = 0;
            x.strokeStyle = pass ? "rgba(255,255,255,.55)" : "rgba(255,255,255,.3)"; x.lineWidth = cs * .06; x.beginPath(); BIT.forEach(d => { if (tl.base & d[2]) { x.moveTo(-d[0] * cs * .05 * 0, 0); x.lineTo(d[1] * cs * .48, d[0] * cs * .48); } }); x.stroke();
          }
          x.globalAlpha = 1; x.restore();
          if (i === src) { x.fillStyle = "#ffd34e"; x.beginPath(); x.arc(cx, cy, cs * .2, 0, 7); x.fill(); x.strokeStyle = "#b8860b"; x.lineWidth = 3; x.stroke(); x.fillStyle = "#3cb8ff"; x.beginPath(); x.moveTo(cx, cy - cs * .12); x.quadraticCurveTo(cx + cs * .12, cy + cs * .02, cx, cy + cs * .1); x.quadraticCurveTo(cx - cs * .12, cy + cs * .02, cx, cy - cs * .12); x.fill(); }
        }
        parts.draw(x, dt);
        if (wait) { wait += dt; if (wait > 1.1) { lv++; if (lv >= LEVELS) { g.win("Water everywhere!"); return false; } gen(); } }
      });
    }
  });
})();
