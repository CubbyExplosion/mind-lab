// Break Time Games: set 4 (Runners & platformers)
(function () {
  const B = window.BreakGames; if (!B) return;
  const TAU = Math.PI * 2;
  const wrap = (v, m) => ((v % m) + m) % m;
  const T = (x, s, px, py, sz, col, al) => { x.font = "bold " + (sz || 20) + "px system-ui, sans-serif"; x.textAlign = al || "center"; x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  const rr = (x, px, py, w, h, r, col) => { x.fillStyle = col; x.beginPath(); x.roundRect(px, py, w, h, r); x.fill(); };
  const burst = (g, P, px, py, col, n, sp) => { for (let i = 0; i < n; i++) { const a = g.rf(0, TAU), s = g.rf(.3, 1) * (sp || 160); P.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: g.rf(.3, .7), col }); } };
  const stepP = (x, P, dt) => {
    for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.life -= dt; if (p.life <= 0) { P.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt; x.globalAlpha = Math.min(1, p.life * 2.5); x.fillStyle = p.col; x.fillRect(p.x - 2, p.y - 2, 4, 4); }
    x.globalAlpha = 1;
  };
  const fl = (g, cv, px, py, s, col) => g.pop(s, px * cv.c.clientWidth / cv.W, py * cv.c.clientHeight / cv.H, col);
  const KEYS_JUMP = [" ", "ArrowUp", "w", "W"];
  // one-button input: pointer down (with position) or a key from the list
  const press = (g, cv, fn, keys) => {
    g.on(cv.c, "pointerdown", e => { e.preventDefault(); fn(cv.pos(e), e); });
    const ks = keys || KEYS_JUMP;
    g.on(window, "keydown", e => { if (e.repeat) return; if (ks.includes(e.key)) fn(null, e); });
  };
  const shk = s => s > 0 ? [(Math.random() - .5) * s * 30, (Math.random() - .5) * s * 30] : [0, 0];

  // ---- 1. Jungle Dash: endless runner, jump and slide ----
  B.add({
    id: "s4-jungle-dash", name: "Jungle Dash", ages: [6, 12], cat: "Runner", color: "#6be28f", icon: "J",
    desc: "Race through the jungle: jump over rocks and slide under vines!",
    controls: "Space or Up to jump, Down to slide. Phone: tap the top to jump, hold the bottom to slide",
    start(g) {
      const cv = g.canvas(640, 400), { c, x, W, H } = cv, GY = 330, PX = 110, P = [];
      let started = false, y = GY, vy = 0, slide = false, held = false, speed = g.by(250, 290, 330), obs = [], nextIn = 1.4, dist = 0, lives = g.by(4, 3, 3), inv = 0, shake = 0, gems = 0, sq = 0;
      const cap = g.by(380, 440, 500);
      g.status("Lives: " + lives);
      const jump = () => { if (!started) { started = true; return; } if (y >= GY - .5) { vy = -780; sq = -.25; g.sfx("swish"); burst(g, P, PX, GY, "#d9c28a", 6, 90); } };
      g.on(c, "pointerdown", e => { e.preventDefault(); const p = cv.pos(e); if (p.y < H * .55) jump(); else { held = true; started = true; } });
      const rel = () => { held = false; };
      g.on(c, "pointerup", rel); g.on(c, "pointercancel", rel); g.on(c, "pointerleave", rel);
      g.on(window, "keydown", e => { if (e.repeat) return; if (KEYS_JUMP.includes(e.key)) jump(); else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") started = true; });
      const hurt = () => {
        lives--; inv = 1.4; shake = .35; g.sfx("wrong"); g.status("Lives: " + lives); burst(g, P, PX, y - 25, "#ff6b4a", 14, 200);
        if (lives <= 0) { g.over("The jungle got you!"); return true; } return false;
      };
      g.loop((dt, t) => {
        if (started) {
          dist += speed * dt; speed = Math.min(cap, speed + dt * g.by(5, 7, 9)); inv = Math.max(0, inv - dt);
          const down = !!(g.keys.ArrowDown || held);
          slide = down && y >= GY - .5;
          vy += 2400 * dt * (down && y < GY ? 2 : 1); y += vy * dt;
          if (y >= GY) { if (vy > 300) { sq = .25; burst(g, P, PX, GY, "#d9c28a", 5, 80); } y = GY; vy = 0; }
          nextIn -= dt;
          if (nextIn <= 0) {
            nextIn = Math.max(.85, g.rf(1, 1.7) * 320 / speed * g.by(1.25, 1, .9));
            const r = g.rand(), ox = W + 40;
            if (r < .45) { obs.push({ k: "rock", x: ox, w: 38 }); if (g.rand() < .6) for (let i = -1; i <= 1; i++) obs.push({ k: "gem", x: ox + 19 + i * 34, y: GY - 150 + Math.abs(i) * 28 }); }
            else if (r < .8) { obs.push({ k: "vine", x: ox, w: 22 }); if (g.rand() < .5) for (let i = 0; i < 3; i++) obs.push({ k: "gem", x: ox + i * 30, y: GY - 14 }); }
            else { obs.push({ k: "rock", x: ox, w: 38 }); obs.push({ k: "rock", x: ox + 90, w: 38 }); }
          }
          const top = y - (slide ? 24 : 50), L = PX - 12, R = PX + 12;
          for (let i = obs.length - 1; i >= 0; i--) {
            const o = obs[i]; o.x -= speed * dt;
            if (o.x < -80) { obs.splice(i, 1); continue; }
            if (o.k === "gem") {
              if (Math.hypot(o.x - PX, o.y - (y - (slide ? 12 : 25))) < 28) { obs.splice(i, 1); gems++; g.sfx("clink"); fl(g, cv, PX + 20, y - 60, "+3", "#ffd34e"); burst(g, P, o.x, o.y, "#ffd34e", 6, 100); }
            } else if (inv <= 0) {
              const hit = o.k === "rock" ? (o.x + 4 < R && o.x + o.w - 4 > L && y > GY - 30) : (o.x + 2 < R && o.x + o.w - 2 > L && top < GY - 30);
              if (hit) { obs.splice(i, 1); if (hurt()) return false; }
            }
          }
          g.score(Math.floor(dist / 25) + gems * 3);
        }
        shake = Math.max(0, shake - dt); sq *= Math.pow(.001, dt);
        const [sx, sy] = shk(shake);
        x.save(); x.translate(sx, sy);
        const sk = x.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, "#74d6ff"); sk.addColorStop(1, "#d8f7b8"); x.fillStyle = sk; x.fillRect(-20, -20, W + 40, H + 40);
        x.fillStyle = "#fff6a8"; x.beginPath(); x.arc(520, 70, 34, 0, TAU); x.fill();
        for (let i = 0; i < 7; i++) { const bx = wrap(i * 130 - dist * .2, W + 130) - 65; x.fillStyle = "#2f9a5a"; x.beginPath(); x.arc(bx, GY - 70, 62, 0, TAU); x.fill(); }
        for (let i = 0; i < 6; i++) { const bx = wrap(i * 150 - dist * .45 + 40, W + 150) - 75; x.fillStyle = "#6b4a2b"; x.fillRect(bx - 7, GY - 120, 14, 120); x.fillStyle = "#1f7a4d"; x.beginPath(); x.arc(bx, GY - 130, 42, 0, TAU); x.arc(bx - 26, GY - 108, 30, 0, TAU); x.arc(bx + 26, GY - 108, 30, 0, TAU); x.fill(); }
        x.fillStyle = "#7a5230"; x.fillRect(-20, GY, W + 40, H - GY + 20); x.fillStyle = "#4fbf5a"; x.fillRect(-20, GY, W + 40, 12);
        for (let i = 0; i < 12; i++) { const gx = wrap(i * 60 - dist, W + 60) - 60; x.fillStyle = "#6a4426"; x.fillRect(gx, GY + 28 + (i % 3) * 14, 26, 5); }
        obs.forEach(o => {
          if (o.k === "rock") { x.fillStyle = "#8a8f9a"; x.beginPath(); x.roundRect(o.x, GY - 34, o.w, 34, [14, 14, 3, 3]); x.fill(); x.fillStyle = "rgba(255,255,255,.35)"; x.fillRect(o.x + 6, GY - 28, 12, 5); }
          else if (o.k === "vine") { x.fillStyle = "#2f8a3c"; x.fillRect(o.x + 8, 0, 6, GY - 30); for (let k = 0; k < 6; k++) { x.beginPath(); x.ellipse(o.x + 11 + (k % 2 ? 9 : -9), 40 + k * 40, 10, 5, 0, 0, TAU); x.fill(); } x.fillStyle = "#1d6d2b"; x.beginPath(); x.roundRect(o.x, GY - 44, o.w, 16, 6); x.fill(); }
          else { x.fillStyle = "#ffd34e"; x.beginPath(); x.moveTo(o.x, o.y - 11); x.lineTo(o.x + 10, o.y); x.lineTo(o.x, o.y + 11); x.lineTo(o.x - 10, o.y); x.closePath(); x.fill(); x.fillStyle = "#fff8c8"; x.fillRect(o.x - 3, o.y - 6, 3, 5); }
        });
        // runner
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .35 : 1;
        x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(PX, GY + 3, 20 - (GY - y) / 12, 5, 0, 0, TAU); x.fill();
        x.save(); x.translate(PX, y); x.scale(1 - sq * .6, 1 + sq);
        if (slide) { rr(x, -24, -24, 48, 24, 12, "#ff8a2a"); x.fillStyle = "#ffcf9a"; x.beginPath(); x.arc(14, -14, 11, 0, TAU); x.fill(); x.fillStyle = "#222"; x.fillRect(18, -17, 3, 3); }
        else {
          const ls = y >= GY - .5 ? Math.sin(dist * .05) * 9 : 6;
          x.strokeStyle = "#5a3a1c"; x.lineWidth = 6; x.lineCap = "round"; x.beginPath(); x.moveTo(-3, -16); x.lineTo(-3 - ls, 0); x.moveTo(3, -16); x.lineTo(3 + ls, 0); x.stroke();
          rr(x, -12, -38, 24, 26, 9, "#ff8a2a"); x.fillStyle = "#ffcf9a"; x.beginPath(); x.arc(0, -46, 11, 0, TAU); x.fill();
          x.fillStyle = "#c0392b"; x.fillRect(-12, -52, 24, 6); x.fillStyle = "#222"; x.fillRect(4, -48, 3, 4);
        }
        x.restore(); x.globalAlpha = 1;
        stepP(x, P, dt);
        x.restore();
        if (!started) { x.fillStyle = "rgba(0,0,0,.35)"; x.fillRect(0, 0, W, H); T(x, "Tap or press Space to run!", W / 2, H / 2 - 6, 30); T(x, "Jump rocks. Slide under vines.", W / 2, H / 2 + 28, 18, "#ffe9a8"); }
      });
    }
  });

  // ---- 2. Flip Runner: gravity flip ----
  B.add({
    id: "s4-flip-runner", name: "Flip Runner", ages: [8, 20], cat: "Runner", color: "#b48cff", icon: "F",
    desc: "Run along the floor or the ceiling. Flip gravity to dodge spikes and pillars!",
    controls: "Tap, click or press Space to flip gravity",
    start(g) {
      const cv = g.canvas(640, 400), { c, x, W, H } = cv, FL = 340, CE = 60, S = 30, PX = 130, P = [], trail = [];
      let dir = 1, py = FL - S, vy = 0, ang = 0, speed = g.by(250, 290, 330), obs = [], nextIn = 1.2, dist = 0, lives = g.by(3, 2, 2), inv = 0, shake = 0, started = false, orbs = 0;
      const cap = g.by(400, 450, 520);
      g.status("Lives: " + lives);
      press(g, cv, () => { if (!started) { started = true; return; } dir = -dir; g.sfx("flip"); burst(g, P, PX + S / 2, py + S / 2, "#ffd34e", 8, 120); }, [" ", "ArrowUp", "ArrowDown", "w", "s", "W", "S"]);
      const addPil = (ox, side, h) => { obs.push({ k: "pil", x: ox, w: 38, h, side }); obs.push({ k: "orb", x: ox + 19, y: side === 0 ? CE + 30 : FL - 30 }); };
      g.loop((dt, t) => {
        if (started) {
          dist += speed * dt; speed = Math.min(cap, speed + dt * 6); inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt);
          vy += dir * 2600 * dt; vy = g.clamp(vy, -900, 900); py += vy * dt;
          if (py + S >= FL) { py = FL - S; vy = 0; } if (py <= CE) { py = CE; vy = 0; }
          ang += ((dir === 1 ? 0 : Math.PI) - ang) * Math.min(1, dt * 14);
          trail.push({ x: PX, y: py, l: .25 }); for (let i = trail.length - 1; i >= 0; i--) { trail[i].l -= dt; trail[i].x -= speed * dt; if (trail[i].l <= 0) trail.splice(i, 1); }
          nextIn -= dt;
          if (nextIn <= 0) {
            nextIn = Math.max(.8, g.rf(.9, 1.5) * 340 / speed * g.by(1.25, 1, .9));
            const side = g.rand() < .5 ? 0 : 1, r = g.rand(), ox = W + 40;
            if (r < .45) addPil(ox, side, g.ri(70, 150));
            else if (r < .82) { const n = g.ri(1, 3); obs.push({ k: "spk", x: ox, w: 30 * n, h: 28, side }); obs.push({ k: "orb", x: ox + 15 * n, y: side === 0 ? CE + 30 : FL - 30 }); }
            else { addPil(ox, side, g.ri(80, 140)); addPil(ox + speed * .85, 1 - side, g.ri(80, 140)); nextIn += .85; }
          }
          const pl = PX + 4, pr = PX + S - 4, pt = py + 4, pb = py + S - 4;
          for (let i = obs.length - 1; i >= 0; i--) {
            const o = obs[i]; o.x -= speed * dt;
            if (o.x < -140) { obs.splice(i, 1); continue; }
            if (o.k === "orb") { if (Math.hypot(o.x - (PX + S / 2), o.y - (py + S / 2)) < 26) { obs.splice(i, 1); orbs++; g.sfx("clink"); fl(g, cv, PX + 40, py, "+5", "#ffd34e"); burst(g, P, o.x, o.y, "#ffd34e", 7, 110); } continue; }
            if (inv > 0) continue;
            const oy = o.side === 0 ? FL - o.h : CE, hh = o.h;
            if (pr > o.x + (o.k === "spk" ? 4 : 0) && pl < o.x + o.w - (o.k === "spk" ? 4 : 0) && pb > oy && pt < oy + hh) {
              obs.splice(i, 1); lives--; inv = 1.4; shake = .35; g.sfx("wrong"); g.status("Lives: " + lives); burst(g, P, PX + S / 2, py + S / 2, "#ff4d6d", 14, 200);
              if (lives <= 0) { g.over("Splat!"); return false; }
            }
          }
          g.score(Math.floor(dist / 30) + orbs * 5);
        }
        const [sx, sy] = shk(shake);
        x.save(); x.translate(sx, sy);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#1b1040"); bg.addColorStop(1, "#3a1b6b"); x.fillStyle = bg; x.fillRect(-20, -20, W + 40, H + 40);
        x.strokeStyle = "rgba(180,140,255,.18)"; x.lineWidth = 2;
        for (let i = 0; i < 14; i++) { const gx = wrap(i * 60 - dist * .6, W + 60) - 30; x.beginPath(); x.moveTo(gx, CE); x.lineTo(gx, FL); x.stroke(); }
        for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(0, CE + i * (FL - CE) / 5); x.lineTo(W, CE + i * (FL - CE) / 5); x.stroke(); }
        const fg = x.createLinearGradient(0, FL, 0, H); fg.addColorStop(0, "#7a4ad8"); fg.addColorStop(1, "#2a1060"); x.fillStyle = fg; x.fillRect(-20, FL, W + 40, H - FL + 20);
        const cg = x.createLinearGradient(0, 0, 0, CE); cg.addColorStop(0, "#2a1060"); cg.addColorStop(1, "#7a4ad8"); x.fillStyle = cg; x.fillRect(-20, -20, W + 40, CE + 20);
        x.fillStyle = "#ffd34e"; x.fillRect(-20, FL, W + 40, 4); x.fillRect(-20, CE - 4, W + 40, 4);
        obs.forEach(o => {
          if (o.k === "orb") { x.fillStyle = "#ffd34e"; x.beginPath(); x.arc(o.x, o.y + Math.sin(t * 5 + o.x) * 3, 9, 0, TAU); x.fill(); x.fillStyle = "#fff8c8"; x.beginPath(); x.arc(o.x - 3, o.y - 3 + Math.sin(t * 5 + o.x) * 3, 3, 0, TAU); x.fill(); }
          else if (o.k === "pil") { const oy = o.side === 0 ? FL - o.h : CE, gr = x.createLinearGradient(o.x, 0, o.x + o.w, 0); gr.addColorStop(0, "#ff4db8"); gr.addColorStop(1, "#a01f78"); x.fillStyle = gr; x.fillRect(o.x, oy, o.w, o.h); x.fillStyle = "rgba(255,255,255,.3)"; x.fillRect(o.x + 4, oy, 5, o.h); }
          else { x.fillStyle = "#ff5a5a"; const n = o.w / 30; for (let i = 0; i < n; i++) { const bx = o.x + i * 30; x.beginPath(); if (o.side === 0) { x.moveTo(bx, FL); x.lineTo(bx + 15, FL - o.h); x.lineTo(bx + 30, FL); } else { x.moveTo(bx, CE); x.lineTo(bx + 15, CE + o.h); x.lineTo(bx + 30, CE); } x.closePath(); x.fill(); } }
        });
        trail.forEach(q => { x.globalAlpha = q.l * 1.4; x.fillStyle = "#6be2ff"; x.fillRect(q.x + 4, q.y + 4, S - 8, S - 8); }); x.globalAlpha = 1;
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .35 : 1;
        x.save(); x.translate(PX + S / 2, py + S / 2); x.rotate(ang); rr(x, -S / 2, -S / 2, S, S, 7, "#4cc3ff"); x.fillStyle = "#fff"; x.fillRect(2, -8, 9, 9); x.fillStyle = "#123"; x.fillRect(7, -5, 4, 5); x.restore(); x.globalAlpha = 1;
        stepP(x, P, dt); x.restore();
        if (!started) { x.fillStyle = "rgba(0,0,0,.4)"; x.fillRect(0, 0, W, H); T(x, "Tap to start, tap to flip!", W / 2, H / 2, 30); }
      });
    }
  });

  // ---- 3. Pixel Hopper: 3 hand-made platformer levels ----
  B.add({
    id: "s4-pixel-hopper", name: "Pixel Hopper", ages: [7, 20], cat: "Runner", color: "#ff8a2a", icon: "H",
    desc: "A side-scrolling platformer with 3 hand-made levels. Grab coins, stomp slimes, reach the flag!",
    controls: "Left/Right to move, Space or Up to jump (stomp slimes from above). Phone: hold the left, middle or right of the screen",
    start(g) {
      const cv = g.canvas(640, 384), { c, x, W, H } = cv, TS = 32, ROWS = 12, P = [];
      const LV = [
        { w: 64, gs: [20, 3, 14, 3, 12, 3, 9], it: [[9, 2, "P"], [9, 7, "ooo"], [9, 14, "E"], [8, 20, "ooo"], [7, 28, "====="], [6, 29, "ooo"], [9, 30, "E"], [8, 37, "ooo"], [8, 42, "==="], [7, 42, "ooo"], [9, 45, "^"], [8, 52, "ooo"], [9, 57, "oo"], [9, 58, "E"], [9, 62, "F"]] },
        { w: 80, gs: [12, 3, 10, 3, 6, 4, 8, 3, 10, 3, 18], it: [[9, 2, "P"], [9, 6, "oo"], [8, 12, "ooo"], [9, 18, "E"], [9, 22, "^"], [8, 25, "ooo"], [9, 31, "###"], [8, 32, "##"], [8, 35, "=="], [7, 35, "oo"], [9, 40, "E"], [7, 41, "===="], [6, 41, "oooo"], [8, 46, "ooo"], [9, 52, "^^"], [9, 56, "E"], [8, 59, "ooo"], [9, 64, "^"], [7, 66, "====="], [6, 67, "ooo"], [9, 68, "^"], [5, 72, "===="], [4, 72, "oooo"], [9, 70, "E"], [9, 77, "F"]] },
        { w: 96, gs: [8, 3, 6, 3, 5, 3, 8, 3, 6, 3, 6, 3, 8, 3, 6, 3, 19], it: [[9, 2, "P"], [9, 5, "E"], [8, 8, "ooo"], [9, 13, "^"], [8, 17, "ooo"], [9, 22, "E"], [8, 25, "ooo"], [9, 31, "^^"], [7, 30, "====="], [6, 31, "ooo"], [9, 41, "E"], [8, 45, "ooo"], [9, 50, "^"], [7, 50, "===="], [6, 50, "oooo"], [5, 55, "===="], [4, 55, "oooo"], [9, 59, "^"], [9, 61, "^"], [8, 59, "ooo"], [9, 64, "E"], [8, 65, "ooo"], [9, 70, "E"], [9, 72, "^"], [8, 74, "ooo"], [8, 75, "="], [7, 75, "o"], [9, 79, "E"], [9, 82, "^^"], [7, 84, "====="], [6, 85, "ooo"], [9, 86, "##"], [8, 87, "#"], [9, 91, "E"], [9, 94, "F"]] }
      ];
      let lv = 0, map = [], mw = 0, en = [], p = null, cp = null, cam = 0, lives = g.by(5, 4, 3), inv = 0, shake = 0, coy = 0, buf = 0, held = false, banner = 2, tt = 0, coins = 0;
      const touches = {};
      const load = n => {
        const L = LV[n]; mw = L.w; map = []; for (let r = 0; r < ROWS; r++) map.push(Array(mw).fill("."));
        let cc = 0, sol = true; L.gs.forEach(len => { for (let i = 0; i < len; i++, cc++) if (sol && cc < mw) { map[10][cc] = "#"; map[11][cc] = "#"; } sol = !sol; });
        en = []; let sx = 40, sy = 200;
        L.it.forEach(([r, c0, s]) => { for (let i = 0; i < s.length; i++) { const ch = s[i], c1 = c0 + i; if (c1 >= mw) continue; if (ch === "P") { sx = c1 * TS + 5; sy = (r + 1) * TS - 30; } else if (ch === "E") en.push({ x: c1 * TS + 3, y: (r + 1) * TS - 22, w: 26, h: 22, d: -1, alive: true }); else map[r][c1] = ch; } });
        p = { x: sx, y: sy, vx: 0, vy: 0, w: 22, h: 30, ground: false, face: 1 }; cp = { x: sx, y: sy }; cam = 0; banner = 1.8; coy = 0; inv = 1;
        g.status("Lives: " + lives + "  Level " + (n + 1) + "/3");
      };
      const tile = (c1, r) => c1 < 0 || c1 >= mw ? "#" : (r < 0 || r >= ROWS ? "." : map[r][c1]);
      const isS = (c1, r) => { const t = tile(c1, r); return t === "#" || t === "="; };
      const hits = (px, py, w, h) => { for (let c1 = Math.floor(px / TS); c1 <= Math.floor((px + w - .01) / TS); c1++) for (let r = Math.floor(py / TS); r <= Math.floor((py + h - .01) / TS); r++) if (isS(c1, r)) return true; return false; };
      load(0);
      const zone = pt => pt.x < W * .17 ? "L" : pt.x < W * .34 ? "R" : "J";
      g.on(c, "pointerdown", e => { e.preventDefault(); touches[e.pointerId] = zone(cv.pos(e)); });
      g.on(c, "pointermove", e => { if (touches[e.pointerId]) touches[e.pointerId] = zone(cv.pos(e)); });
      const tr = e => { delete touches[e.pointerId]; };
      g.on(c, "pointerup", tr); g.on(c, "pointercancel", tr); g.on(c, "pointerleave", tr);
      const has = z => Object.values(touches).includes(z);
      const hurt = () => {
        if (inv > 0) return false;
        lives--; inv = 1.6; shake = .3; g.sfx("wrong"); burst(g, P, p.x + 11, p.y + 15, "#ff6b4a", 12, 200); g.status("Lives: " + lives + "  Level " + (lv + 1) + "/3");
        if (lives <= 0) { g.over("Out of lives!"); return true; }
        p.x = cp.x; p.y = cp.y; p.vx = 0; p.vy = 0; return false;
      };
      g.loop((dt, t) => {
        tt = t; banner = Math.max(0, banner - dt); inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt);
        const left = g.keys.ArrowLeft || has("L"), right = g.keys.ArrowRight || has("R"), jh = !!(g.keys.ArrowUp || g.keys[" "] || has("J"));
        if (jh && !held) buf = .12; if (!jh && held && p.vy < -250) p.vy = -250; held = jh; buf = Math.max(0, buf - dt);
        const ax = (right ? 1 : 0) - (left ? 1 : 0); if (ax) p.face = ax;
        const tv = ax * 190, acc = (p.ground ? 1800 : 1100) * dt; p.vx += g.clamp(tv - p.vx, -acc, acc);
        const dx = p.vx * dt, nx = Math.max(1, Math.ceil(Math.abs(dx) / 4));
        for (let i = 0; i < nx; i++) { const q = p.x + dx / nx; if (!hits(q, p.y, p.w, p.h)) p.x = q; else { p.vx = 0; break; } }
        if (coy > 0) coy -= dt;
        if (buf > 0 && coy > 0) { p.vy = -640; coy = 0; buf = 0; g.sfx("swish"); burst(g, P, p.x + 11, p.y + 30, "#fff", 5, 70); }
        p.vy = Math.min(900, p.vy + 1800 * dt); p.ground = false;
        const dy = p.vy * dt, ny = Math.max(1, Math.ceil(Math.abs(dy) / 4));
        for (let i = 0; i < ny; i++) { const q = p.y + dy / ny; if (!hits(p.x, q, p.w, p.h)) p.y = q; else { if (p.vy > 0) p.ground = true; p.vy = 0; break; } }
        if (p.ground) {
          coy = .09;
          const c0 = Math.floor(p.x / TS), c2 = Math.floor((p.x + p.w) / TS), fr = Math.floor((p.y + p.h + 1) / TS), rb = Math.floor((p.y + p.h - 1) / TS);
          if (isS(c0, fr) && isS(c2, fr) && p.x > cp.x + 64 && ![-1, 0, 1].some(d => tile(c0 + d, rb) === "^") && !en.some(e => e.alive && Math.abs(e.x - p.x) < 120)) { cp = { x: p.x, y: p.y }; }
        }
        if (p.y > ROWS * TS + 40) { if (hurt()) return false; }
        // coins, spikes, flag
        for (let c1 = Math.floor(p.x / TS); c1 <= Math.floor((p.x + p.w) / TS); c1++) for (let r = Math.floor(p.y / TS); r <= Math.floor((p.y + p.h) / TS); r++) {
          const tl = tile(c1, r);
          if (tl === "o") { map[r][c1] = "."; coins++; g.add(10); g.sfx("clink"); fl(g, cv, c1 * TS + 16 - cam, r * TS, "+10", "#ffd34e"); }
          else if (tl === "^") { if (p.x + p.w > c1 * TS + 6 && p.x < c1 * TS + 26 && p.y + p.h > r * TS + 16) { if (hurt()) return false; } }
          else if (tl === "F") {
            g.add(100); g.sfx("cheer"); lv++;
            if (lv >= 3) { g.win("You finished all 3 levels!"); return false; }
            load(lv); return;
          }
        }
        // slimes
        for (const e of en) {
          if (!e.alive) continue;
          const ahead = Math.floor((e.x + (e.d > 0 ? e.w + 2 : -2)) / TS), rb = Math.floor((e.y + e.h - 2) / TS);
          if (isS(ahead, rb) || tile(ahead, rb) === "^" || !isS(ahead, rb + 1)) e.d = -e.d;
          e.x += e.d * g.by(38, 50, 65) * dt;
          if (p.x + p.w > e.x && p.x < e.x + e.w && p.y + p.h > e.y && p.y < e.y + e.h) {
            if (p.vy > 0 && p.y + p.h - e.y < 18) { e.alive = false; p.vy = -440; g.add(25); g.sfx("pop"); burst(g, P, e.x + 13, e.y + 11, "#6be28f", 12, 160); fl(g, cv, e.x + 13 - cam, e.y, "+25", "#6be28f"); }
            else if (hurt()) return false;
          }
        }
        cam = g.clamp(p.x + p.w / 2 - W / 2, 0, mw * TS - W);
        const [sx, sy] = shk(shake);
        x.save(); x.translate(sx, sy);
        const sk = x.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, "#5bc8ff"); sk.addColorStop(1, "#cdf2ff"); x.fillStyle = sk; x.fillRect(-20, -20, W + 40, H + 40);
        for (let i = 0; i < 6; i++) { const bx = wrap(i * 170 - cam * .3, W + 170) - 85; x.fillStyle = "#8ed99a"; x.beginPath(); x.ellipse(bx, H, 130, 90 + (i % 3) * 20, 0, Math.PI, 0); x.fill(); }
        for (let i = 0; i < 4; i++) { const bx = wrap(i * 230 - cam * .15 + 60, W + 230) - 100; x.fillStyle = "rgba(255,255,255,.8)"; x.beginPath(); x.ellipse(bx, 60 + (i % 2) * 40, 46, 16, 0, 0, TAU); x.ellipse(bx + 24, 52 + (i % 2) * 40, 30, 14, 0, 0, TAU); x.fill(); }
        x.save(); x.translate(-Math.floor(cam), 0);
        for (let c1 = Math.max(0, Math.floor(cam / TS)); c1 <= Math.min(mw - 1, Math.floor((cam + W) / TS)); c1++) for (let r = 0; r < ROWS; r++) {
          const tl = map[r][c1], px = c1 * TS, py = r * TS;
          if (tl === "#") { x.fillStyle = "#8a5a33"; x.fillRect(px, py, TS, TS); x.fillStyle = "#7a4c28"; x.fillRect(px + 4, py + 12, 8, 6); x.fillRect(px + 18, py + 22, 8, 6); if (!isS(c1, r - 1)) { x.fillStyle = "#4fbf5a"; x.fillRect(px, py, TS, 9); x.fillStyle = "#74dc7e"; x.fillRect(px, py, TS, 3); } }
          else if (tl === "=") { x.fillStyle = "#c98a4a"; x.fillRect(px, py, TS, TS); x.fillStyle = "#e2a866"; x.fillRect(px, py, TS, 6); x.fillStyle = "#9a6430"; x.fillRect(px, py + TS - 5, TS, 5); }
          else if (tl === "^") { x.fillStyle = "#c9ced8"; for (let k = 0; k < 2; k++) { x.beginPath(); x.moveTo(px + k * 16, py + TS); x.lineTo(px + k * 16 + 8, py + 14); x.lineTo(px + k * 16 + 16, py + TS); x.fill(); } }
          else if (tl === "o") { const w = Math.abs(Math.cos(t * 4 + c1)); x.fillStyle = "#ffd34e"; x.beginPath(); x.ellipse(px + 16, py + 16, 3 + 7 * w, 10, 0, 0, TAU); x.fill(); x.strokeStyle = "#c9961a"; x.lineWidth = 2; x.stroke(); }
          else if (tl === "F") { x.fillStyle = "#ddd"; x.fillRect(px + 14, py - 40, 4, 72); x.fillStyle = "#ff4d6d"; x.beginPath(); x.moveTo(px + 18, py - 40); x.lineTo(px + 50, py - 28 + Math.sin(t * 6) * 3); x.lineTo(px + 18, py - 16); x.fill(); }
        }
        for (const e of en) if (e.alive) { x.fillStyle = "#4cc96a"; x.beginPath(); x.ellipse(e.x + 13, e.y + 14 + Math.sin(t * 8 + e.x) * 1.5, 14, 11, 0, Math.PI, 0); x.rect(e.x - 1, e.y + 13, 28, 9); x.fill(); x.fillStyle = "#fff"; x.fillRect(e.x + 6, e.y + 6, 5, 6); x.fillRect(e.x + 15, e.y + 6, 5, 6); x.fillStyle = "#123"; x.fillRect(e.x + 8, e.y + 8, 2, 3); x.fillRect(e.x + 17, e.y + 8, 2, 3); }
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .35 : 1;
        rr(x, p.x, p.y + 6, p.w, p.h - 6, 6, "#3a7bff"); rr(x, p.x - 1, p.y, p.w + 2, 12, 5, "#ff4d6d");
        x.fillStyle = "#fff"; x.fillRect(p.x + (p.face > 0 ? 11 : 4), p.y + 12, 7, 7); x.fillStyle = "#123"; x.fillRect(p.x + (p.face > 0 ? 14 : 4), p.y + 14, 3, 4);
        const lg = p.ground ? Math.sin(t * 20) * 4 * Math.min(1, Math.abs(p.vx) / 100) : 0; x.fillStyle = "#222"; x.fillRect(p.x + 3 + lg, p.y + p.h - 3, 7, 3); x.fillRect(p.x + 12 - lg, p.y + p.h - 3, 7, 3);
        x.globalAlpha = 1; stepP(x, P, dt);
        x.restore(); x.restore();
        x.globalAlpha = .28; [[10, "<"], [64, ">"], [200, "JUMP"]].forEach(([bx, s]) => { rr(x, bx, H - 56, bx === 200 ? 200 : 46, 46, 12, "#000"); }); x.globalAlpha = .6;
        T(x, "<", 33, H - 24, 26); T(x, ">", 87, H - 24, 26); T(x, "JUMP", 300, H - 24, 20); x.globalAlpha = 1;
        if (banner > 0) T(x, "Level " + (lv + 1), W / 2, 70, 34, "#fff");
      });
    }
  });

  // ---- 4. Slope Slider: ski downhill dodge ----
  B.add({
    id: "s4-slope-slider", name: "Slope Slider", ages: [6, 14], cat: "Runner", color: "#4cc3ff", icon: "S",
    desc: "Ski down the mountain, dodge trees and rocks, and zoom through the gates!",
    controls: "Left/Right arrows (or A/D), or drag your finger or mouse to steer",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H } = cv, SY = 150, P = [];
      let sx = W / 2, svx = 0, speed = g.by(240, 300, 360), obs = [], acc = 0, gapX = W / 2, rows = 0, dist = 0, lives = g.by(5, 3, 2), inv = 0, shake = 0, ptr = null, gates = 0, started = false;
      const cap = g.by(400, 500, 600), rowDist = g.by(150, 130, 115), snow = [];
      for (let i = 0; i < 40; i++) snow.push({ x: g.rf(0, W), y: g.rf(0, H) });
      g.status("Lives: " + lives);
      g.on(c, "pointerdown", e => { e.preventDefault(); ptr = cv.pos(e).x; started = true; });
      g.on(c, "pointermove", e => { if (ptr !== null) ptr = cv.pos(e).x; });
      const rel = () => { ptr = null; }; g.on(c, "pointerup", rel); g.on(c, "pointercancel", rel);
      g.on(window, "keydown", e => { if (["ArrowLeft", "ArrowRight", "a", "d", "A", "D"].includes(e.key)) started = true; });
      g.loop((dt, t) => {
        if (started) {
          inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt); speed = Math.min(cap, speed + dt * g.by(5, 7, 9)); dist += speed * dt;
          const want = ptr !== null ? g.clamp((ptr - sx) * 6, -340, 340) : ((g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0)) * 340;
          svx += (want - svx) * Math.min(1, dt * 10); sx = g.clamp(sx + svx * dt, 22, W - 22);
          acc += speed * dt;
          if (acc >= rowDist) {
            acc = 0; rows++;
            const maxShift = Math.min(100, .65 * 340 * rowDist / speed); gapX = g.clamp(gapX + g.rf(-maxShift, maxShift), 75, W - 75);
            const pr = g.by(.5, .65, .8), clear = 68;
            for (let xx = 30; xx <= W - 30; xx += 44) if (Math.abs(xx - gapX) > clear && g.rand() < pr) obs.push({ k: g.rand() < .65 ? "tree" : "rock", x: xx + g.rf(-5, 5), y: H + 50 });
            if (rows % 6 === 0) obs.push({ k: "gate", x: gapX, y: H + 50, chk: false });
          }
          for (let i = obs.length - 1; i >= 0; i--) {
            const o = obs[i]; o.y -= speed * dt;
            if (o.y < -70) { obs.splice(i, 1); continue; }
            if (o.k === "gate") { if (!o.chk && o.y < SY) { o.chk = true; if (Math.abs(sx - o.x) < 45) { gates++; g.add(5); g.sfx("star"); fl(g, cv, sx, SY - 20, "Gate +5", "#ffd34e"); } } continue; }
            if (inv <= 0 && Math.hypot(o.x - sx, (o.y - 6) - SY) < 17 + 8) {
              obs.splice(i, 1); lives--; inv = 1.4; shake = .35; g.sfx("thump"); g.status("Lives: " + lives); burst(g, P, sx, SY, "#fff", 16, 200);
              if (lives <= 0) { g.over("Wipe out!"); return false; }
            }
          }
          g.score(Math.floor(dist / 40) + gates * 5);
          if (Math.random() < .6) P.push({ x: sx + g.rf(-5, 5), y: SY + 14, vx: g.rf(-20, 20), vy: -speed * .5, life: .35, col: "#fff" });
        }
        const [ox, oy] = shk(shake);
        x.save(); x.translate(ox, oy);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#eaf6ff"); bg.addColorStop(1, "#c4e4ff"); x.fillStyle = bg; x.fillRect(-20, -20, W + 40, H + 40);
        snow.forEach(s => { s.y -= speed * dt * .9; if (s.y < -5) { s.y = H + 5; s.x = g.rf(0, W); } x.fillStyle = "rgba(160,200,235,.5)"; x.beginPath(); x.ellipse(s.x, s.y, 14, 3, 0, 0, TAU); x.fill(); });
        obs.forEach(o => {
          if (o.k === "tree") { x.fillStyle = "rgba(60,90,130,.18)"; x.beginPath(); x.ellipse(o.x + 6, o.y, 18, 6, 0, 0, TAU); x.fill(); x.fillStyle = "#6b4a2b"; x.fillRect(o.x - 4, o.y - 8, 8, 10); [[0, 1], [-14, .8], [-28, .6]].forEach(([dy, s], i) => { x.fillStyle = i % 2 ? "#2a9a62" : "#1f7a4d"; x.beginPath(); x.moveTo(o.x, o.y - 40 + dy - 14); x.lineTo(o.x - 21 * s, o.y - 10 + dy); x.lineTo(o.x + 21 * s, o.y - 10 + dy); x.fill(); }); x.fillStyle = "#fff"; x.beginPath(); x.moveTo(o.x, o.y - 68); x.lineTo(o.x - 8, o.y - 54); x.lineTo(o.x + 8, o.y - 54); x.fill(); }
          else if (o.k === "rock") { x.fillStyle = "#8a93a3"; x.beginPath(); x.ellipse(o.x, o.y - 6, 19, 14, 0, Math.PI, 0); x.rect(o.x - 19, o.y - 6, 38, 6); x.fill(); x.fillStyle = "#b7bfcc"; x.beginPath(); x.ellipse(o.x - 5, o.y - 12, 7, 4, 0, 0, TAU); x.fill(); }
          else { x.fillStyle = "#ff4d6d"; x.fillRect(o.x - 47, o.y - 34, 4, 38); x.fillRect(o.x + 43, o.y - 34, 4, 38); x.fillStyle = "#ff4d6d"; x.beginPath(); x.moveTo(o.x - 43, o.y - 34); x.lineTo(o.x - 25, o.y - 28); x.lineTo(o.x - 43, o.y - 22); x.fill(); x.fillStyle = "#4cc3ff"; x.beginPath(); x.moveTo(o.x + 43, o.y - 34); x.lineTo(o.x + 25, o.y - 28); x.lineTo(o.x + 43, o.y - 22); x.fill(); }
        });
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .35 : 1;
        x.save(); x.translate(sx, SY); x.rotate(svx / 340 * .35);
        x.strokeStyle = "#333"; x.lineWidth = 4; x.lineCap = "round"; x.beginPath(); x.moveTo(-6, -14); x.lineTo(-6, 22); x.moveTo(6, -14); x.lineTo(6, 22); x.stroke();
        rr(x, -9, -10, 18, 20, 7, "#ff8a2a"); x.fillStyle = "#ffcf9a"; x.beginPath(); x.arc(0, -16, 8, 0, TAU); x.fill(); x.fillStyle = "#3a7bff"; x.beginPath(); x.arc(0, -19, 8, Math.PI, 0); x.fill(); x.fillStyle = "#222"; x.fillRect(-5, -16, 10, 3);
        x.restore(); x.globalAlpha = 1;
        stepP(x, P, dt); x.restore();
        if (!started) { x.fillStyle = "rgba(0,0,0,.3)"; x.fillRect(0, 0, W, H); T(x, "Drag or press an arrow", W / 2, H / 2 - 10, 26); T(x, "to start skiing!", W / 2, H / 2 + 22, 26); }
      });
    }
  });

  // ---- 5. Rooftop Run: parkour jumper ----
  B.add({
    id: "s4-rooftop-run", name: "Rooftop Run", ages: [10, 20], cat: "Runner", color: "#ff6fb5", icon: "R",
    desc: "Sprint across the city rooftops. Hold to jump higher, dodge crates, never fall!",
    controls: "Tap, click or Space: jump (hold for a higher jump)",
    start(g) {
      const cv = g.canvas(640, 400), { c, x, W, H } = cv, PX = 140, P = [];
      let sc = 0, y = 250, vy = 0, onG = false, held = false, buf = 0, coy = 0, speed = g.by(230, 265, 300), blds = [], lives = g.by(3, 3, 2), inv = 0, shake = 0, started = false, coins = 0, sq = 0, lastEnd = 0;
      const cap = g.by(340, 400, 460);
      g.status("Lives: " + lives);
      const mk = () => {
        const prev = blds[blds.length - 1], gap = prev ? g.rf(60, Math.max(70, speed * .5 * g.by(.7, .85, 1))) : 0;
        const top = prev ? g.clamp(prev.top + g.rf(-60, 70), 160, 340) : 250, w = g.rf(150, 300), bx = prev ? prev.x + prev.w + gap : -100;
        const b = { x: bx, w, top, crates: [], coins: [], hue: g.ri(0, 360) };
        if (prev && w > 190 && g.rand() < g.by(.2, .35, .5)) b.crates.push({ x: bx + g.rf(70, w - 70), w: 26, h: 26 });
        if (g.rand() < .6) { const n = g.ri(2, 4), cx0 = bx + g.rf(20, Math.max(21, w - 100)); for (let i = 0; i < n; i++) b.coins.push({ x: cx0 + i * 28, y: top - 36 - (g.rand() < .3 ? 40 : 0) }); }
        blds.push(b); lastEnd = bx + w;
      };
      blds.push({ x: -200, w: 600, top: 250, crates: [], coins: [], hue: 260 }); lastEnd = 400;
      const jump = () => { held = true; if (!started) { started = true; return; } buf = .12; };
      g.on(c, "pointerdown", e => { e.preventDefault(); jump(); });
      const rel = () => { held = false; }; g.on(c, "pointerup", rel); g.on(c, "pointercancel", rel);
      g.on(window, "keydown", e => { if (!e.repeat && KEYS_JUMP.includes(e.key)) jump(); }); g.on(window, "keyup", e => { if (KEYS_JUMP.includes(e.key)) held = false; });
      const respawn = () => {
        const b = blds.find(q => q.x > sc + PX + 60); if (!b) return;
        sc = b.x + 25 - PX; y = b.top; vy = 0; onG = true; inv = 1.6; b.crates = b.crates.filter(q => q.x > b.x + 120);
      };
      const hurt = msg => {
        lives--; inv = 1.4; shake = .35; g.sfx("wrong"); g.status("Lives: " + lives); burst(g, P, PX, y - 20, "#ff6b4a", 14, 200);
        if (lives <= 0) { g.over(msg); return true; } return false;
      };
      g.loop((dt, t) => {
        if (started) {
          sc += speed * dt; speed = Math.min(cap, speed + dt * g.by(3, 4, 5)); inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt); buf = Math.max(0, buf - dt);
          while (lastEnd < sc + W + 300) mk();
          const wx = sc + PX, prevY = y;
          vy += (vy < 0 && held ? 1500 : 3000) * dt; y += vy * dt; onG = false;
          for (const b of blds) {
            if (wx + 9 > b.x && wx - 9 < b.x + b.w) {
              if (vy >= 0 && prevY <= b.top + 6 && y >= b.top) { if (vy > 400) sq = .25; y = b.top; vy = 0; onG = true; coy = .08; }
              else if (y > b.top + 12 && prevY > b.top + 12 && wx + 9 > b.x && wx < b.x + 14) { /* crashed into a wall */ if (inv <= 0) { if (hurt("Bonk!")) return false; respawn(); } }
            }
          }
          if (!onG) coy -= dt;
          if (buf > 0 && coy > 0) { vy = -600; buf = 0; coy = 0; sq = -.2; g.sfx("swish"); burst(g, P, PX, y, "#fff", 5, 80); }
          if (y > H + 60) { if (inv <= 0) { if (hurt("You fell!")) return false; } respawn(); }
          for (const b of blds) {
            for (let i = b.crates.length - 1; i >= 0; i--) { const q = b.crates[i]; if (inv <= 0 && wx + 9 > q.x && wx - 9 < q.x + q.w && y > b.top - q.h + 4) { b.crates.splice(i, 1); if (hurt("Crate crash!")) return false; } }
            for (let i = b.coins.length - 1; i >= 0; i--) { const q = b.coins[i]; if (Math.hypot(q.x - wx, q.y - (y - 22)) < 24) { b.coins.splice(i, 1); coins++; g.sfx("clink"); fl(g, cv, PX + 20, y - 50, "+2", "#ffd34e"); } }
          }
          while (blds.length > 3 && blds[1].x + blds[1].w < sc - 50) blds.shift();
          g.score(Math.floor(sc / 40) + coins * 2);
        }
        sq *= Math.pow(.001, dt);
        const [ox, oy] = shk(shake);
        x.save(); x.translate(ox, oy);
        const sk = x.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, "#3b1d6e"); sk.addColorStop(.6, "#ff7aa8"); sk.addColorStop(1, "#ffd28a"); x.fillStyle = sk; x.fillRect(-20, -20, W + 40, H + 40);
        x.fillStyle = "#fff4c4"; x.beginPath(); x.arc(500, 80, 28, 0, TAU); x.fill();
        for (let i = 0; i < 10; i++) { const bx = wrap(i * 90 - sc * .15, W + 90) - 45, hh = 90 + ((i * 53) % 90); x.fillStyle = "#5a2b7a"; x.fillRect(bx, H - hh - 20, 70, hh + 20); }
        for (const b of blds) {
          const sx2 = b.x - sc; if (sx2 > W + 20 || sx2 + b.w < -20) continue;
          x.fillStyle = `hsl(${b.hue},35%,24%)`; x.fillRect(sx2, b.top, b.w, H - b.top + 20); x.fillStyle = `hsl(${b.hue},35%,34%)`; x.fillRect(sx2 - 4, b.top, b.w + 8, 8);
          for (let wxp = 14; wxp < b.w - 20; wxp += 30) for (let wy = b.top + 26; wy < H; wy += 34) { x.fillStyle = (Math.floor(b.x) + wxp * 7 + wy) % 5 < 2 ? "#ffe28a" : "rgba(0,0,0,.25)"; x.fillRect(sx2 + wxp, wy, 14, 18); }
          b.crates.forEach(q => { x.fillStyle = "#b9803f"; x.fillRect(q.x - sc, b.top - q.h, q.w, q.h); x.strokeStyle = "#7a4f1f"; x.lineWidth = 3; x.strokeRect(q.x - sc + 1, b.top - q.h + 1, q.w - 2, q.h - 2); x.beginPath(); x.moveTo(q.x - sc, b.top - q.h); x.lineTo(q.x - sc + q.w, b.top); x.stroke(); });
          b.coins.forEach(q => { const w = Math.abs(Math.cos(t * 4 + q.x)); x.fillStyle = "#ffd34e"; x.beginPath(); x.ellipse(q.x - sc, q.y, 3 + 7 * w, 10, 0, 0, TAU); x.fill(); });
        }
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .35 : 1;
        x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(PX, y + 2, 16, 4, 0, 0, TAU); x.fill();
        x.save(); x.translate(PX, y); x.scale(1 - sq * .6, 1 + sq);
        const run = onG ? Math.sin(sc * .06) * 9 : 7; x.strokeStyle = "#222"; x.lineWidth = 6; x.lineCap = "round"; x.beginPath(); x.moveTo(-3, -16); x.lineTo(-3 - run, 0); x.moveTo(3, -16); x.lineTo(3 + run, 0); x.stroke();
        rr(x, -11, -40, 22, 26, 8, "#2b2f4a"); x.fillStyle = "#ffcf9a"; x.beginPath(); x.arc(0, -48, 10, 0, TAU); x.fill(); x.fillStyle = "#ff4d6d"; x.fillRect(-11, -54, 22, 5); x.beginPath(); x.moveTo(-11, -52); x.lineTo(-26 - (onG ? 0 : 6), -48 + Math.sin(t * 20) * 3); x.lineTo(-11, -47); x.fill(); x.fillStyle = "#222"; x.fillRect(3, -49, 3, 4);
        x.restore(); x.globalAlpha = 1; stepP(x, P, dt); x.restore();
        if (!started) { x.fillStyle = "rgba(0,0,0,.4)"; x.fillRect(0, 0, W, H); T(x, "Tap to start running!", W / 2, H / 2 - 6, 30); T(x, "Hold longer for a bigger jump", W / 2, H / 2 + 28, 18, "#ffe9a8"); }
      });
    }
  });

  // ---- 6. Jet Climber: rocket jetpack climber ----
  B.add({
    id: "s4-jet-climber", name: "Jet Climber", ages: [8, 16], cat: "Runner", color: "#ff8a2a", icon: "J",
    desc: "Blast up into space with your jetpack. Grab fuel cans and dodge the space rocks!",
    controls: "Hold Space/Up (or press and hold the screen) to fly up. Left/Right or drag to steer",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H } = cv, P = [];
      let px = W / 2, py = 0, vx = 0, vy = 0, camY = -440, fuel = 100, lives = g.by(4, 3, 2), inv = 0, shake = 0, started = false, held = false, tx = null, items = [], spY = -220, cans = 0, sinceCan = 0, best = 0, t0 = 0;
      const burn = g.by(16, 22, 28), stars = [];
      for (let i = 0; i < 50; i++) stars.push({ x: g.rf(0, W), y: g.rf(0, H), s: g.rf(1, 2.5) });
      g.status("Lives: " + lives);
      g.on(c, "pointerdown", e => { e.preventDefault(); held = true; started = true; tx = cv.pos(e).x; });
      g.on(c, "pointermove", e => { if (held) tx = cv.pos(e).x; });
      const rel = () => { held = false; tx = null; }; g.on(c, "pointerup", rel); g.on(c, "pointercancel", rel);
      g.on(window, "keydown", e => { if (KEYS_JUMP.includes(e.key)) started = true; });
      const hit = () => {
        lives--; inv = 1.6; shake = .35; g.sfx("thump"); g.status("Lives: " + lives); burst(g, P, px, py, "#ff8a2a", 16, 220); vy = 200;
        if (lives <= 0) { g.over("Rocket down!"); return true; } return false;
      };
      g.loop((dt, t) => {
        if (started) {
          inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt);
          const th = (held || g.keys.ArrowUp || g.keys[" "]) && fuel > 0;
          vy += (500 - (th ? 1150 : 0)) * dt; vy = g.clamp(vy, -380, 480);
          const wantX = tx !== null ? g.clamp((tx - px) * 5, -270, 270) : ((g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0)) * 270;
          vx += (wantX - vx) * Math.min(1, dt * 8); px = g.clamp(px + vx * dt, 18, W - 18); py += vy * dt;
          if (th) { fuel = Math.max(0, fuel - burn * dt); P.push({ x: px + g.rf(-4, 4), y: py + 18, vx: g.rf(-30, 30), vy: g.rf(140, 240), life: .35, col: g.pick(["#ffd34e", "#ff8a2a", "#fff"]) }); if (Math.random() < .08) g.sfx("hum"); }
          if (py >= 0) { py = 0; if (vy > 0) vy = 0; if (fuel <= 0) { g.over("Out of fuel!"); return false; } }
          camY = Math.min(camY, py - 300);
          if (py - camY > H + 20) { fuel = Math.max(fuel, 50); py = camY + H * .45; vy = 0; inv = 2; if (hit()) return false; }
          while (spY > camY - 120) {
            spY -= g.rf(130, 200);
            const alt = -spY, ramp = Math.min(.85, .3 + alt / 5000); sinceCan += 165;
            if (sinceCan >= 280) { sinceCan = 0; items.push({ k: "can", x: g.rf(40, W - 40), y: spY }); }
            else if (g.rand() < ramp) items.push({ k: "rock", x: g.rf(30, W - 30), y: spY, r: g.rf(14, 26), vx: g.rf(-1, 1) * (25 + Math.min(70, alt / 60)) * g.by(.7, 1, 1.3), rot: g.rf(0, 6) });
          }
          for (let i = items.length - 1; i >= 0; i--) {
            const o = items[i]; if (o.y - camY > H + 80) { items.splice(i, 1); continue; }
            if (o.k === "rock") { o.x += o.vx * dt; if (o.x < o.r || o.x > W - o.r) o.vx = -o.vx; o.rot += dt; }
            if (o.k === "can") { if (Math.hypot(o.x - px, o.y - py) < 30) { items.splice(i, 1); fuel = Math.min(100, fuel + 40); cans++; g.sfx("star"); fl(g, cv, px, py - camY - 30, "Fuel!", "#ffd34e"); } }
            else if (inv <= 0 && Math.hypot(o.x - px, o.y - py) < o.r + 12) { items.splice(i, 1); if (hit()) return false; }
          }
          best = Math.max(best, Math.floor(-py / 10)); g.score(best + cans * 5);
        }
        const alt = Math.max(0, -camY), sp = Math.min(1, alt / 6000);
        const [ox, oy] = shk(shake);
        x.save(); x.translate(ox, oy);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, `rgb(${Math.round(70 - 55 * sp)},${Math.round(150 - 130 * sp)},${Math.round(230 - 170 * sp)})`); bg.addColorStop(1, `rgb(${Math.round(190 - 100 * sp)},${Math.round(230 - 150 * sp)},255)`); x.fillStyle = bg; x.fillRect(-20, -20, W + 40, H + 40);
        x.fillStyle = "#fff"; stars.forEach(s => { x.globalAlpha = sp * .9; x.fillRect(s.x, wrap(s.y - camY * .2, H), s.s, s.s); }); x.globalAlpha = 1;
        for (let i = 0; i < 5; i++) { const cy2 = wrap(i * 150 - camY * .4, H + 120) - 60, cx2 = (i * 97) % W; x.fillStyle = `rgba(255,255,255,${.7 * (1 - sp)})`; x.beginPath(); x.ellipse(cx2, cy2, 50, 16, 0, 0, TAU); x.ellipse(cx2 + 28, cy2 - 8, 30, 14, 0, 0, TAU); x.fill(); }
        if (-camY < H + 100) { const gy = -camY; x.fillStyle = "#5cc25f"; x.fillRect(-20, gy, W + 40, H); x.fillStyle = "#8a5a33"; x.fillRect(-20, gy + 20, W + 40, H); }
        items.forEach(o => {
          const sy = o.y - camY;
          if (o.k === "rock") { x.save(); x.translate(o.x, sy); x.rotate(o.rot); x.fillStyle = "#8a7f93"; x.beginPath(); for (let k = 0; k < 8; k++) { const a = k / 8 * TAU, rr2 = o.r * (k % 2 ? .82 : 1.05); x.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); } x.closePath(); x.fill(); x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.arc(o.r * .25, o.r * .2, o.r * .3, 0, TAU); x.fill(); x.restore(); }
          else { x.fillStyle = "rgba(255,211,78,.3)"; x.beginPath(); x.arc(o.x, sy, 24 + Math.sin(t * 5) * 3, 0, TAU); x.fill(); rr(x, o.x - 10, sy - 14, 20, 28, 5, "#ff4d6d"); x.fillStyle = "#fff"; x.fillRect(o.x - 6, sy - 6, 12, 5); x.fillStyle = "#ffd34e"; x.fillRect(o.x - 5, sy - 18, 10, 5); }
        });
        for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.life -= dt; if (p.life <= 0) { P.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.min(1, p.life * 3); x.fillStyle = p.col; x.beginPath(); x.arc(p.x, p.y - camY, 3 + p.life * 6, 0, TAU); x.fill(); } x.globalAlpha = 1;
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .35 : 1;
        const sy2 = py - camY; x.save(); x.translate(px, sy2); x.rotate(vx / 270 * .3);
        rr(x, -11, -16, 22, 30, 9, "#e8eefc"); x.fillStyle = "#4cc3ff"; x.beginPath(); x.arc(0, -6, 6, 0, TAU); x.fill(); x.fillStyle = "#ff4d6d"; x.beginPath(); x.moveTo(-11, -4); x.lineTo(-18, 12); x.lineTo(-11, 10); x.fill(); x.beginPath(); x.moveTo(11, -4); x.lineTo(18, 12); x.lineTo(11, 10); x.fill();
        x.restore(); x.globalAlpha = 1;
        rr(x, 10, 10, 120, 14, 6, "rgba(0,0,0,.4)"); rr(x, 12, 12, 116 * fuel / 100, 10, 5, fuel < 25 ? "#ff4d6d" : "#ffd34e"); T(x, "FUEL", 70, 44, 14, "#fff");
        x.restore();
        if (!started) { x.fillStyle = "rgba(0,0,0,.35)"; x.fillRect(0, 0, W, H); T(x, "Hold to blast off!", W / 2, H / 2, 28); }
      });
    }
  });

  // ---- 7. Helix Drop: tower drop ----
  B.add({
    id: "s4-helix-drop", name: "Helix Drop", ages: [8, 20], cat: "Runner", color: "#ff4d6d", icon: "H",
    desc: "Spin the tower so the bouncing ball drops through the gaps. Avoid the red parts!",
    controls: "Left/Right arrows, or drag left and right on the screen, to spin the tower",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H } = cv, CX = W / 2, K = .27, SEG = 12, SA = TAU / SEG, SP = 120, BR = 12, P = [];
      const N = g.by(25, 35, 50), rings = [];
      for (let i = 0; i < N; i++) {
        const segs = Array(SEG).fill(1), gl = g.by(3, 2, 2) + (i % 3 === 0 && g.diff < 2 ? 1 : 0), s0 = g.ri(0, SEG - 1);
        for (let j = 0; j < gl; j++) segs[(s0 + j) % SEG] = 0;
        if (i >= 2) { const dn = Math.min(5, g.by(1, 2, 3) + Math.floor(i / 12)); for (let k = 0, placed = 0; k < 40 && placed < dn; k++) { const q = g.ri(0, SEG - 1); if (segs[q] === 1 && segs[(q + 1) % SEG] !== 0 && segs[(q + SEG - 1) % SEG] !== 0) { segs[q] = 2; placed++; } } }
        rings.push({ y: 260 + i * SP, segs, broken: false, passed: false, hue: (i * 37) % 360, flash: 0 });
      }
      let rot = 0, by = 80, vy = 0, camY = 0, passedN = 0, fire = false, lives = g.by(3, 2, 1), inv = 0, shake = 0, sqz = 0, drag = false, lastX = 0, done = false;
      g.status("Lives: " + lives + "  Rings: " + N);
      g.on(c, "pointerdown", e => { e.preventDefault(); drag = true; lastX = e.clientX; });
      g.on(c, "pointermove", e => { if (drag) { rot += (e.clientX - lastX) * (W / c.clientWidth) * .012; lastX = e.clientX; } });
      const rel = () => { drag = false; }; g.on(window, "pointerup", rel); g.on(c, "pointercancel", rel);
      const path = (cy, a0, a1, col) => { x.beginPath(); x.ellipse(CX, cy, 140, 140 * K, 0, a0, a1); x.ellipse(CX, cy, 30, 30 * K, 0, a1, a0, true); x.closePath(); x.fillStyle = col; x.fill(); };
      g.loop((dt, t) => {
        inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt); sqz *= Math.pow(.001, dt);
        rot += ((g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0)) * 2.4 * dt;
        if (!done) {
          const pb = by + BR; vy = Math.min(950, vy + 1800 * dt); by += vy * dt; const nb = by + BR;
          for (let i = 0; i < N; i++) {
            const r = rings[i]; if (r.broken || r.passed) continue;
            if (vy > 0 && pb <= r.y + .01 && nb >= r.y) {
              const a = ((Math.PI / 2 - rot) % TAU + TAU) % TAU, ty = r.segs[Math.floor(a / SA) % SEG];
              if (ty === 0) { r.passed = true; passedN++; g.add(1); g.sfx("tick"); if (passedN >= 3 && !fire) { fire = true; g.sfx("rumble"); } }
              else if (fire) { r.broken = true; r.flash = .5; fire = false; passedN = 0; g.add(3); shake = .3; g.sfx("boom"); burst(g, P, CX, r.y, "#ffd34e", 24, 260); }
              else if (ty === 1) { by = r.y - BR; vy = -560; passedN = 0; sqz = .3; g.sfx("drop"); burst(g, P, CX, r.y, `hsl(${r.hue},80%,70%)`, 6, 120); }
              else if (inv <= 0) { by = r.y - BR; vy = -560; passedN = 0; lives--; inv = 1.2; shake = .35; g.sfx("wrong"); g.status("Lives: " + lives + "  Rings: " + N); burst(g, P, CX, r.y, "#ff4d4d", 16, 200); if (lives <= 0) { g.over("Splat!"); return false; } }
              else { by = r.y - BR; vy = -560; }
              break;
            }
          }
          if (rings[N - 1].passed || rings[N - 1].broken) { if (by > rings[N - 1].y + 140) { done = true; g.add(20); g.win("Tower cleared!"); return false; } }
        }
        const target = by - 200; if (target > camY) camY += (target - camY) * Math.min(1, dt * 9);
        const [ox, oy] = shk(shake);
        x.save(); x.translate(ox, oy);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#26185a"); bg.addColorStop(1, "#7a3fb8"); x.fillStyle = bg; x.fillRect(-20, -20, W + 40, H + 40);
        const pg = x.createLinearGradient(CX - 30, 0, CX + 30, 0); pg.addColorStop(0, "#9aa3c7"); pg.addColorStop(.4, "#e6ebff"); pg.addColorStop(1, "#6a7099"); x.fillStyle = pg; x.fillRect(CX - 30, -20, 60, H + 40);
        for (let i = N - 1; i >= 0; i--) {
          const r = rings[i], sy = r.y - camY; if (sy < -80 || sy > H + 100 || r.broken) continue;
          const cy = sy - 85 * K;
          for (let s = 0; s < SEG; s++) { const ty = r.segs[s]; if (!ty) continue; const a0 = rot + s * SA, a1 = a0 + SA - .015; path(cy + 10, a0, a1, ty === 2 ? "#7a0f1f" : `hsl(${r.hue},60%,30%)`); }
          for (let s = 0; s < SEG; s++) { const ty = r.segs[s]; if (!ty) continue; const a0 = rot + s * SA, a1 = a0 + SA - .015; path(cy, a0, a1, ty === 2 ? "#ff3b4e" : `hsl(${r.hue},75%,62%)`); }
        }
        const bsy = by - camY;
        x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(CX, bsy + BR + 2, 10, 3, 0, 0, TAU); x.fill();
        if (fire) { x.fillStyle = "rgba(255,160,40,.5)"; x.beginPath(); x.moveTo(CX - 12, bsy); x.lineTo(CX, bsy - 50 - Math.sin(t * 30) * 8); x.lineTo(CX + 12, bsy); x.fill(); }
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .4 : 1;
        x.save(); x.translate(CX, bsy); x.scale(1 + sqz, 1 - sqz); const bgr = x.createRadialGradient(-4, -4, 2, 0, 0, BR + 2); bgr.addColorStop(0, "#fff"); bgr.addColorStop(1, fire ? "#ff8a2a" : "#ffd34e"); x.fillStyle = bgr; x.beginPath(); x.arc(0, 0, BR, 0, TAU); x.fill(); x.restore(); x.globalAlpha = 1;
        for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.life -= dt; if (p.life <= 0) { P.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt; x.globalAlpha = Math.min(1, p.life * 2.5); x.fillStyle = p.col; x.fillRect(p.x - 2, p.y - camY - 2, 4, 4); } x.globalAlpha = 1;
        x.restore();
        T(x, fire ? "ON FIRE! Smash anything!" : "Ring " + Math.min(N, rings.filter(r => r.passed || r.broken).length) + " / " + N, CX, 28, 16, fire ? "#ffd34e" : "#fff");
      });
    }
  });

  // ---- 8. Block Tower: stack the blocks ----
  B.add({
    id: "s4-block-tower", name: "Block Tower", ages: [6, 20], cat: "Runner", color: "#ffd34e", icon: "B",
    desc: "Drop each sliding block right on top of the last one. How tall can you build?",
    controls: "Tap, click or press Space to drop the block",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H } = cv, BH = 26, P = [], fallers = [];
      const baseW = g.by(190, 160, 130), tol = g.by(8, 6, 4);
      let stack = [{ x: (W - baseW) / 2, w: baseW }], cur = null, phase = 0, combo = 0, cam = 0, dead = false, endT = 0, perfects = 0, flash = 0;
      const wy = L => 540 - (L + 1) * BH, hue = L => (L * 14 + 200) % 360;
      const newCur = () => { const L = stack.length, w = stack[L - 1].w; phase = L % 2 ? Math.PI / 2 : -Math.PI / 2; cur = { w, L, x: 0 }; };
      newCur();
      const spd = () => Math.min(520, g.by(150, 200, 250) + stack.length * g.by(3, 4, 5));
      press(g, cv, () => {
        if (dead) return; const top = stack[stack.length - 1], l = Math.max(cur.x, top.x), r = Math.min(cur.x + cur.w, top.x + top.w), ov = r - l;
        if (ov <= 0) { dead = true; endT = .9; g.sfx("sad"); fallers.push({ x: cur.x, w: cur.w, L: cur.L, vy: 0, h: hue(cur.L) }); cur = null; return; }
        let nx = l, nw = ov;
        if (Math.abs(cur.x - top.x) <= tol) {
          nx = top.x; nw = top.w; combo++; perfects++; g.add(2 + Math.min(combo, 5)); g.sfx("star"); flash = .4; fl(g, cv, W / 2, 300, combo > 1 ? "Perfect x" + combo + "!" : "Perfect!", "#fff");
          if (combo >= 3 && nw < baseW) { nw = Math.min(baseW, nw + 6); nx = Math.max(0, nx - 3); }
        } else {
          combo = 0; g.add(1); g.sfx("thump");
          if (cur.x < top.x) fallers.push({ x: cur.x, w: top.x - cur.x, L: cur.L, vy: 0, h: hue(cur.L) }); else fallers.push({ x: r, w: cur.x + cur.w - r, L: cur.L, vy: 0, h: hue(cur.L) });
        }
        burst(g, P, nx + nw / 2, wy(cur.L) + BH, `hsl(${hue(cur.L)},80%,65%)`, 8, 120);
        stack.push({ x: nx, w: nw }); newCur();
      }, [" ", "ArrowDown", "ArrowUp", "Enter"]);
      g.loop((dt, t) => {
        flash = Math.max(0, flash - dt);
        if (!dead) { const amp = (W - cur.w) / 2 + 30; phase += dt * spd() / amp; cur.x = (W - cur.w) / 2 + Math.sin(phase) * amp; }
        else { endT -= dt; if (endT <= 0) { g.over("The tower fell! Height " + (stack.length - 1)); return false; } }
        const tc = Math.max(0, (stack.length - 8) * BH); cam += (tc - cam) * Math.min(1, dt * 5);
        const hh = Math.min(1, stack.length / 60);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, `hsl(${215 - hh * 90},70%,${35 - hh * 18}%)`); bg.addColorStop(1, `hsl(${200 - hh * 60},80%,${70 - hh * 20}%)`); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        for (let i = 0; i < 12; i++) { x.fillStyle = "rgba(255,255,255,.12)"; x.fillRect((i * 83) % W, wrap(i * 61 + cam * .3, H), 3, 3); }
        x.fillStyle = "#3a3f55"; x.fillRect(0, 540 + cam, W, 200);
        const drawB = (bx, L, w, a) => { const y = wy(L) + cam; x.globalAlpha = a || 1; x.fillStyle = `hsl(${hue(L)},75%,60%)`; x.fillRect(bx, y, w, BH - 1); x.fillStyle = "rgba(255,255,255,.35)"; x.fillRect(bx, y, w, 5); x.fillStyle = "rgba(0,0,0,.2)"; x.fillRect(bx, y + BH - 6, w, 5); x.globalAlpha = 1; };
        stack.forEach((b, L) => { if (wy(L) + cam < H + 30) drawB(b.x, L, b.w); });
        if (cur) drawB(cur.x, cur.L, cur.w);
        for (let i = fallers.length - 1; i >= 0; i--) { const f = fallers[i]; f.vy += 1400 * dt; f.y = (f.y === undefined ? wy(f.L) : f.y) + f.vy * dt; if (f.y > H + 200) { fallers.splice(i, 1); continue; } x.fillStyle = `hsl(${f.h},75%,60%)`; x.globalAlpha = .9; x.fillRect(f.x, f.y + cam, f.w, BH - 1); x.globalAlpha = 1; }
        if (flash > 0 && stack.length > 1) { const tp = stack[stack.length - 1]; x.strokeStyle = `rgba(255,255,255,${flash * 2})`; x.lineWidth = 4; x.strokeRect(tp.x - 3, wy(stack.length - 1) + cam - 3, tp.w + 6, BH + 5); }
        for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.life -= dt; if (p.life <= 0) { P.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt; x.globalAlpha = Math.min(1, p.life * 2.5); x.fillStyle = p.col; x.fillRect(p.x - 2, p.y + cam - 2, 4, 4); } x.globalAlpha = 1;
        T(x, "Height " + (stack.length - 1), W / 2, 40, 24);
        if (stack.length === 1) T(x, "Tap to drop the block!", W / 2, 90, 20, "#ffe9a8");
      });
    }
  });

  // ---- 9. Wall Hopper: wall-jump climber ----
  B.add({
    id: "s4-wall-hopper", name: "Wall Hopper", ages: [9, 20], cat: "Runner", color: "#4cc3ff", icon: "W",
    desc: "Leap from wall to wall to climb out of the rising lava. Watch out for the spikes!",
    controls: "Tap, click or press Space to leap to the other wall",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H } = cv, WW = 28, HP = 13, XL = WW + HP, XR = W - WW - HP, P = [];
      let side = 0, px = XL, py = 0, vy = 0, st = "wall", flyT = 0, fx0 = 0, fx1 = 0, camY = -420, lava = 330, spY = -200, items = [], lives = g.by(4, 3, 2), inv = 0, shake = 0, started = false, buf = 0, gems = 0, best = 0, tAll = 0;
      const slide = g.by(55, 75, 95), lv0 = g.by(32, 52, 75), FT = .45;
      g.status("Lives: " + lives);
      const leap = () => {
        const to = side === 0 ? 1 : 0; st = "fly"; flyT = 0; fx0 = px; fx1 = to === 0 ? XL : XR; vy = -600; side = to; g.sfx("swish"); burst(g, P, px, py, "#fff", 6, 90);
      };
      press(g, cv, () => { if (!started) { started = true; return; } if (st === "wall") leap(); else buf = .15; });
      const hit = () => {
        lives--; inv = 1.2; shake = .3; g.sfx("thump"); g.status("Lives: " + lives); burst(g, P, px, py, "#ff4d6d", 14, 200);
        if (lives <= 0) { g.over("Ouch! Spiked!"); return true; } leap(); return false;
      };
      g.loop((dt, t) => {
        if (started) {
          tAll += dt; inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt); buf = Math.max(0, buf - dt);
          lava -= (lv0 + tAll * .8) * dt;
          if (st === "wall") {
            py += slide * dt; px = side === 0 ? XL : XR;
            if (buf > 0) { buf = 0; leap(); }
            else if (inv <= 0) for (const o of items) if (o.k === "spk" && o.side === side && Math.abs(py - o.y) < 28 + HP - 6) { if (hit()) return false; break; }
          } else {
            flyT += dt; vy += 1300 * dt; py += vy * dt; px = fx0 + (fx1 - fx0) * Math.min(1, flyT / FT);
            if (flyT >= FT) { st = "wall"; px = fx1; vy = 0; sqSet(); }
          }
          camY = Math.min(camY, py - 260);
          while (spY > camY - 150) {
            spY -= g.rf(260, 340) * (g.diff === 2 ? .92 : 1); const sd = g.rand() < .5 ? 0 : 1;
            items.push({ k: "spk", side: sd, y: spY }); items.push({ k: "gem", x: W / 2, y: spY + g.rf(110, 170) });
          }
          for (let i = items.length - 1; i >= 0; i--) {
            const o = items[i]; if (o.y - camY > H + 80) { items.splice(i, 1); continue; }
            if (o.k === "gem" && Math.hypot(o.x - px, o.y - py) < 30) { items.splice(i, 1); gems++; g.sfx("clink"); fl(g, cv, px, py - camY - 20, "+5", "#ffd34e"); }
          }
          if (py + HP > lava) { g.sfx("boom"); g.over("The lava got you!"); return false; }
          best = Math.max(best, Math.floor(-py / 10)); g.score(best + gems * 5);
        }
        const [ox, oy] = shk(shake);
        x.save(); x.translate(ox, oy);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#2b2150"); bg.addColorStop(1, "#5b3a7a"); x.fillStyle = bg; x.fillRect(-20, -20, W + 40, H + 40);
        for (let i = 0; i < 8; i++) { x.fillStyle = "rgba(255,255,255,.05)"; x.fillRect(WW + 20 + (i * 47) % (W - 2 * WW - 60), wrap(i * 97 - camY * .5, H), 30, 6); }
        for (const [wx0, dir] of [[0, 1], [W - WW, -1]]) {
          x.fillStyle = "#6a5a7e"; x.fillRect(wx0, 0, WW, H); x.fillStyle = "#5a4a6e";
          for (let r = -1; r < H / 30 + 1; r++) { const yy = wrap(r * 30 - camY, H + 30) - 30; x.fillRect(wx0, yy, WW, 2); x.fillRect(wx0 + (((Math.floor((yy + camY) / 30)) % 2) ? 8 : 18), yy, 2, 30); }
          x.fillStyle = "rgba(255,255,255,.12)"; x.fillRect(dir > 0 ? WW - 4 : 0, 0, 4, H);
        }
        items.forEach(o => {
          const sy = o.y - camY;
          if (o.k === "spk") { x.fillStyle = "#e6ebff"; x.beginPath(); if (o.side === 0) { x.moveTo(WW, sy - 28); x.lineTo(WW + 26, sy); x.lineTo(WW, sy + 28); } else { x.moveTo(W - WW, sy - 28); x.lineTo(W - WW - 26, sy); x.lineTo(W - WW, sy + 28); } x.fill(); x.fillStyle = "#ff4d6d"; x.beginPath(); if (o.side === 0) { x.moveTo(WW + 14, sy - 10); x.lineTo(WW + 26, sy); x.lineTo(WW + 14, sy + 10); } else { x.moveTo(W - WW - 14, sy - 10); x.lineTo(W - WW - 26, sy); x.lineTo(W - WW - 14, sy + 10); } x.fill(); }
          else { x.fillStyle = "#ffd34e"; x.beginPath(); x.arc(o.x, sy + Math.sin(t * 4 + o.y) * 3, 9, 0, TAU); x.fill(); x.fillStyle = "#fff8c8"; x.fillRect(o.x - 4, sy - 5 + Math.sin(t * 4 + o.y) * 3, 3, 4); }
        });
        // hero
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .35 : 1;
        x.save(); x.translate(px, py - camY); if (st === "fly") x.rotate((side === 1 ? 1 : -1) * flyT / FT * TAU * .5 * 0 + (side === 1 ? .3 : -.3));
        rr(x, -HP, -HP, HP * 2, HP * 2, 7, "#4cc3ff"); x.fillStyle = "#fff"; const ex = side === 1 ? -8 : 1; x.fillRect(ex, -6, 8, 8); x.fillStyle = "#123"; x.fillRect(ex + (side === 1 ? 0 : 4), -3, 4, 4); x.fillStyle = "#ff4d6d"; x.fillRect(-HP, -HP, HP * 2, 5);
        x.restore(); x.globalAlpha = 1;
        for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.life -= dt; if (p.life <= 0) { P.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt; x.globalAlpha = Math.min(1, p.life * 2.5); x.fillStyle = p.col; x.fillRect(p.x - 2, p.y - camY - 2, 4, 4); } x.globalAlpha = 1;
        const ly = lava - camY; if (ly < H + 20) { const lg = x.createLinearGradient(0, ly, 0, ly + 200); lg.addColorStop(0, "#ffb02e"); lg.addColorStop(1, "#d63a1a"); x.fillStyle = lg; x.beginPath(); x.moveTo(-20, H + 20); for (let xx = -20; xx <= W + 20; xx += 10) x.lineTo(xx, ly + Math.sin(xx * .04 + t * 3) * 6); x.lineTo(W + 20, H + 20); x.fill(); }
        x.restore();
        if (!started) { x.fillStyle = "rgba(0,0,0,.35)"; x.fillRect(0, 0, W, H); T(x, "Tap to leap!", W / 2, H / 2 - 20, 30); T(x, "Spikes hurt. Lava rises.", W / 2, H / 2 + 14, 18, "#ffe9a8"); }
      });
      function sqSet() { burst(g, P, px, py, "#fff", 4, 60); }
    }
  });

  // ---- 10. Traffic Weave: lane-switching highway dodger ----
  B.add({
    id: "s4-traffic-weave", name: "Traffic Weave", ages: [6, 14], cat: "Runner", color: "#ff5a5a", icon: "T",
    desc: "Weave between the cars on a busy highway and grab the coins!",
    controls: "Left/Right arrows (or A/D), or tap the left or right half of the road",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H } = cv, LANES = g.by(3, 4, 4), RX = 40, RW = W - 80, LW = RW / LANES, PY = 500, P = [];
      const lx = l => RX + LW * (l + .5);
      let lane = Math.floor(LANES / 2), carX = lx(lane), speed = g.by(260, 300, 340), rows = [], acc = 0, safe = lane, dist = 0, lives = g.by(4, 3, 2), inv = 0, shake = 0, passed = 0, coins = 0, started = false;
      const cap = g.by(420, 500, 560), rowDist = g.by(270, 240, 210), COL = ["#4cc3ff", "#ffd34e", "#6be28f", "#b48cff", "#ff8a2a", "#e8eefc"];
      g.status("Lives: " + lives);
      const move = d => { started = true; const n = g.clamp(lane + d, 0, LANES - 1); if (n !== lane) { lane = n; g.sfx("swish"); } };
      g.on(c, "pointerdown", e => { e.preventDefault(); move(cv.pos(e).x < W / 2 ? -1 : 1); });
      g.on(window, "keydown", e => { if (e.repeat) return; if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") move(-1); else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") move(1); });
      const car = (cx, cy, col, w, h) => { rr(x, cx - w / 2, cy - h / 2, w, h, 9, col); x.fillStyle = "rgba(20,30,50,.75)"; x.fillRect(cx - w / 2 + 5, cy - h * .2, w - 10, h * .24); x.fillRect(cx - w / 2 + 6, cy + h * .22, w - 12, h * .12); x.fillStyle = "#fff8c8"; x.fillRect(cx - w / 2 + 3, cy - h / 2, 8, 4); x.fillRect(cx + w / 2 - 11, cy - h / 2, 8, 4); };
      g.loop((dt, t) => {
        if (started) {
          inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt); speed = Math.min(cap, speed + dt * g.by(5, 7, 9)); dist += speed * dt; acc += speed * dt;
          if (acc >= rowDist) {
            acc = 0; if (g.rand() < .55) safe = g.clamp(safe + (g.rand() < .5 ? -1 : 1), 0, LANES - 1);
            const row = { y: -90, cars: [], coin: -1, long: g.rand() < .25 }, pr = g.by(.5, .6, .7);
            for (let l = 0; l < LANES; l++) if (l !== safe && g.rand() < pr) row.cars.push({ l, col: g.pick(COL) });
            if (g.rand() < .4) row.coin = safe; rows.push(row);
          }
          carX += (lx(lane) - carX) * Math.min(1, dt * 16);
          for (let i = rows.length - 1; i >= 0; i--) {
            const r = rows[i]; r.y += speed * dt;
            if (r.y > H + 100) { rows.splice(i, 1); continue; }
            if (!r.done && r.y > PY + 60) { r.done = true; passed++; g.add(1); }
            if (r.coin >= 0 && Math.abs(r.y - PY) < 40 && Math.abs(carX - lx(r.coin)) < 34) { r.coin = -1; coins++; g.add(5); g.sfx("clink"); fl(g, cv, carX, PY - 50, "+5", "#ffd34e"); }
            if (inv <= 0 && Math.abs(r.y - PY) < 64) for (const q of r.cars) if (Math.abs(carX - lx(q.l)) < 40) {
              r.cars = r.cars.filter(z => z !== q); lives--; inv = 1.5; shake = .4; g.sfx("boom"); g.status("Lives: " + lives); burst(g, P, carX, PY, "#ffb02e", 18, 240);
              if (lives <= 0) { g.over("Crash!"); return false; } break;
            }
          }
        }
        const [ox, oy] = shk(shake);
        x.save(); x.translate(ox, oy);
        x.fillStyle = "#3f9a4f"; x.fillRect(-20, -20, W + 40, H + 40);
        for (let i = 0; i < 8; i++) { const ty = wrap(i * 90 + dist * .9, H + 80) - 40; for (const tx of [18, W - 18]) { x.fillStyle = "#2a7a3a"; x.beginPath(); x.arc(tx, ty, 14, 0, TAU); x.fill(); } }
        x.fillStyle = "#4a4e5c"; x.fillRect(RX, 0, RW, H); x.fillStyle = "#fff"; x.fillRect(RX - 4, 0, 4, H); x.fillRect(RX + RW, 0, 4, H);
        for (let l = 1; l < LANES; l++) for (let k = -1; k < H / 60 + 1; k++) { x.fillStyle = "rgba(255,255,255,.7)"; x.fillRect(RX + l * LW - 2, wrap(k * 60 + dist, H + 60) - 60, 4, 30); }
        rows.forEach(r => { r.cars.forEach(q => car(lx(q.l), r.y, q.col, 44, r.long ? 96 : 72)); if (r.coin >= 0) { x.fillStyle = "#ffd34e"; x.beginPath(); x.ellipse(lx(r.coin), r.y, 4 + 8 * Math.abs(Math.cos(t * 5)), 12, 0, 0, TAU); x.fill(); } });
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .35 : 1; car(carX, PY, "#ff3b4e", 44, 72); x.globalAlpha = 1;
        stepP(x, P, dt); x.restore();
        if (!started) { x.fillStyle = "rgba(0,0,0,.35)"; x.fillRect(0, 0, W, H); T(x, "Tap left or right", W / 2, H / 2 - 10, 26); T(x, "to switch lanes!", W / 2, H / 2 + 22, 26); }
      });
    }
  });

  // ---- 11. Rail Roller: rolling ball on a winding rail ----
  B.add({
    id: "s4-rail-roller", name: "Rail Roller", ages: [7, 16], cat: "Runner", color: "#6be28f", icon: "R",
    desc: "Steer your rolling ball along the winding rail. Collect gems and dodge the bars!",
    controls: "Left/Right arrows (or A/D), or drag your finger or mouse to steer",
    start(g) {
      const cv = g.canvas(400, 600), { c, x, W, H } = cv, BY = 470, P = [];
      let bx = W / 2, vx = 0, dist = 0, speed = g.by(210, 250, 290), lives = g.by(4, 3, 3), inv = 0, shake = 0, ptr = null, gems = [], bars = [], nextG = 300, nextB = 700, gc = 0, fall = 0, started = false, roll = 0;
      const cap = g.by(320, 360, 400), wBase = g.by(150, 120, 100), wMin = g.by(110, 90, 74), stars = [];
      for (let i = 0; i < 40; i++) stars.push({ x: g.rf(0, W), y: g.rf(0, H), s: g.rf(1, 2.5) });
      const cx = s => { const a = Math.min(1, Math.max(0, s) / 600); return W / 2 + a * (88 * Math.sin(s * .006) + 30 * Math.sin(s * .0115 + 1)); };
      const wd = s => Math.max(wMin, wBase - Math.max(0, s) * .01);
      g.status("Lives: " + lives);
      g.on(c, "pointerdown", e => { e.preventDefault(); ptr = cv.pos(e).x; started = true; });
      g.on(c, "pointermove", e => { if (ptr !== null) ptr = cv.pos(e).x; });
      const rel = () => { ptr = null; }; g.on(c, "pointerup", rel); g.on(c, "pointercancel", rel);
      g.on(window, "keydown", e => { if (["ArrowLeft", "ArrowRight", "a", "d", "A", "D"].includes(e.key)) started = true; });
      const lose = () => {
        lives--; g.status("Lives: " + lives); if (lives <= 0) { g.over("The ball fell off!"); return true; } return false;
      };
      g.loop((dt, t) => {
        if (started) {
          inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt);
          if (fall > 0) {
            fall += dt; bx += vx * dt * .3;
            if (fall > .7) { fall = 0; bx = cx(dist); vx = 0; inv = 1.4; }
          } else {
            speed = Math.min(cap, speed + dt * g.by(3, 4, 5)); dist += speed * dt; roll += speed * dt;
            const want = ptr !== null ? g.clamp((ptr - bx) * 8, -450, 450) : ((g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0)) * 400;
            vx += (want - vx) * Math.min(1, dt * 9); bx += vx * dt;
            if (Math.abs(bx - cx(dist)) > wd(dist) / 2 - 3) { fall = .001; g.sfx("drop"); shake = .2; if (lose()) return false; }
          }
          while (nextG < dist + H) { const w = wd(nextG), s = nextG; gems.push({ s, off: g.rf(-.3, .3) * w }); nextG += g.rf(140, 240); }
          while (nextB < dist + H) { if (g.rand() < Math.min(.8, .35 + dist / 12000) * g.by(.5, .8, 1)) bars.push({ s: nextB, side: g.rand() < .5 ? -1 : 1 }); nextB += g.rf(380, 560); }
          for (let i = gems.length - 1; i >= 0; i--) { const o = gems[i]; if (o.s < dist - 80) { gems.splice(i, 1); continue; } if (fall === 0 && Math.abs(o.s - dist) < 22 && Math.abs(bx - (cx(o.s) + o.off)) < 28) { gems.splice(i, 1); gc++; g.sfx("clink"); fl(g, cv, bx, BY - 30, "+3", "#6be2ff"); burst(g, P, bx, BY, "#6be2ff", 8, 120); } }
          for (let i = bars.length - 1; i >= 0; i--) {
            const o = bars[i]; if (o.s < dist - 80) { bars.splice(i, 1); continue; }
            const w = wd(o.s), bc = cx(o.s) + o.side * w * .275;
            if (inv <= 0 && fall === 0 && Math.abs(o.s - dist) < 14 && Math.abs(bx - bc) < w * .225 + 8) { bars.splice(i, 1); inv = 1.4; shake = .35; g.sfx("thump"); burst(g, P, bx, BY, "#ff4d6d", 14, 200); if (lose()) return false; }
          }
          g.score(Math.floor(dist / 25) + gc * 3);
        }
        const [ox, oy] = shk(shake);
        x.save(); x.translate(ox, oy);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#150f3d"); bg.addColorStop(1, "#3b2a8a"); x.fillStyle = bg; x.fillRect(-20, -20, W + 40, H + 40);
        x.fillStyle = "#fff"; stars.forEach(s => { x.globalAlpha = .6; x.fillRect(s.x, wrap(s.y + dist * .1, H), s.s, s.s); }); x.globalAlpha = 1;
        for (let y = -6; y < H + 6; y += 5) {
          const s = dist + (BY - y), cc = cx(s), w = wd(s);
          x.fillStyle = Math.floor(s / 26) % 2 ? "#8a5a33" : "#a06c3e"; x.fillRect(cc - w / 2 - 6, y, w + 12, 6);
        }
        for (let y = -6; y < H + 6; y += 5) { const s = dist + (BY - y), cc = cx(s), w = wd(s); x.fillStyle = "#cfd6e6"; x.fillRect(cc - w / 2, y, 6, 6); x.fillRect(cc + w / 2 - 6, y, 6, 6); x.fillStyle = "rgba(0,0,0,.18)"; x.fillRect(cc - w / 2 + 6, y, w - 12, 6); }
        bars.forEach(o => { const y = BY - (o.s - dist), w = wd(o.s), bc = cx(o.s) + o.side * w * .275; if (y < -30 || y > H + 30) return; rr(x, bc - w * .225, y - 9, w * .45, 18, 5, "#ff4d6d"); x.fillStyle = "#fff"; for (let k = 0; k < 3; k++) x.fillRect(bc - w * .225 + 6 + k * w * .15, y - 9, w * .06, 18); });
        gems.forEach(o => { const y = BY - (o.s - dist); if (y < -30 || y > H + 30) return; const gx = cx(o.s) + o.off; x.fillStyle = "#6be2ff"; x.beginPath(); x.moveTo(gx, y - 11); x.lineTo(gx + 9, y); x.lineTo(gx, y + 11); x.lineTo(gx - 9, y); x.closePath(); x.fill(); x.fillStyle = "#fff"; x.fillRect(gx - 2, y - 6, 3, 5); });
        const sc = fall > 0 ? Math.max(0, 1 - fall / .7) : 1;
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .4 : 1;
        x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(bx + 3, BY + 8, 12 * sc, 5 * sc, 0, 0, TAU); x.fill();
        x.save(); x.translate(bx, BY); x.scale(sc, sc); const bgr = x.createRadialGradient(-4, -5, 2, 0, 0, 14); bgr.addColorStop(0, "#fff"); bgr.addColorStop(1, "#ff8a2a"); x.fillStyle = bgr; x.beginPath(); x.arc(0, 0, 13, 0, TAU); x.fill(); x.rotate(roll * .05); x.strokeStyle = "rgba(120,40,0,.5)"; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 8, 0, Math.PI); x.stroke(); x.restore(); x.globalAlpha = 1;
        stepP(x, P, dt); x.restore();
        if (!started) { x.fillStyle = "rgba(0,0,0,.3)"; x.fillRect(0, 0, W, H); T(x, "Drag or press an arrow", W / 2, H / 2 - 10, 26); T(x, "to start rolling!", W / 2, H / 2 + 22, 26); }
      });
    }
  });

  // ---- 12. Pearl Dive: underwater swimmer ----
  B.add({
    id: "s4-pearl-dive", name: "Pearl Dive", ages: [5, 10], cat: "Runner", color: "#4cc3ff", icon: "P",
    desc: "Swim through the sea collecting shiny pearls. Wobbly jellyfish sting, so swim around them!",
    controls: "Arrow keys (or WASD), or move/drag your finger or mouse where you want to swim",
    start(g) {
      const cv = g.canvas(640, 400), { c, x, W, H } = cv, P = [], bub = [];
      let sx = 120, sy = H / 2, vx = 0, vy = 0, tgt = null, items = [], t1 = 0, t2 = 1.5, lives = g.by(5, 4, 3), inv = 0, shake = 0, pearls = 0, started = false, face = 1, tt = 0;
      for (let i = 0; i < 25; i++) bub.push({ x: g.rf(0, W), y: g.rf(0, H), r: g.rf(2, 6), v: g.rf(20, 50) });
      g.status("Lives: " + lives);
      const pt = e => { tgt = cv.pos(e); started = true; };
      g.on(c, "pointerdown", e => { e.preventDefault(); pt(e); }); g.on(c, "pointermove", e => { if (e.pointerType === "mouse" || e.buttons) pt(e); });
      const rel = e => { if (e.pointerType !== "mouse") tgt = null; }; g.on(c, "pointerup", rel); g.on(c, "pointercancel", rel);
      g.on(window, "keydown", e => { if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "a", "d", "w", "s"].includes(e.key)) { started = true; tgt = null; } });
      g.loop((dt, t) => {
        tt = t;
        if (started) {
          inv = Math.max(0, inv - dt); shake = Math.max(0, shake - dt);
          const sc = Math.min(200, g.by(95, 120, 145) + t * .7), ramp = 1 + Math.min(1.2, t / 80);
          const kx = (g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0), ky = (g.keys.ArrowDown ? 1 : 0) - (g.keys.ArrowUp ? 1 : 0);
          let wx, wy;
          if (kx || ky) { wx = kx * 260; wy = ky * 260; } else if (tgt) { wx = g.clamp((tgt.x - sx) * 5, -280, 280); wy = g.clamp((tgt.y - sy) * 5, -280, 280); } else { wx = 0; wy = 0; }
          vx += (wx - vx) * Math.min(1, dt * 6); vy += (wy - vy) * Math.min(1, dt * 6); sx = g.clamp(sx + vx * dt, 24, W - 24); sy = g.clamp(sy + vy * dt, 24, H - 40);
          if (Math.abs(vx) > 20) face = vx > 0 ? 1 : -1;
          t1 -= dt; t2 -= dt;
          if (t1 <= 0) { t1 = g.by(1.1, .9, .75) * g.rf(.7, 1.3) / ramp; const gold = g.rand() < .1; items.push({ k: "pearl", x: W + 20, y: g.rf(40, H - 60), gold, ph: g.rf(0, 6) }); }
          if (t2 <= 0) { t2 = g.by(2.6, 1.9, 1.4) * g.rf(.7, 1.3) / ramp; items.push({ k: "jelly", x: W + 40, y0: g.rf(70, H - 100), amp: g.rf(25, 70), ph: g.rf(0, 6), r: g.rf(22, 30), vm: g.rf(.8, 1.3), y: 0 }); }
          for (let i = items.length - 1; i >= 0; i--) {
            const o = items[i]; o.x -= sc * (o.k === "jelly" ? o.vm : 1) * dt;
            if (o.k === "jelly") o.y = o.y0 + Math.sin(t * 1.6 + o.ph) * o.amp; else o.y = o.y === undefined ? 0 : o.y;
            if (o.x < -60) { items.splice(i, 1); continue; }
            if (o.k === "pearl") { const py2 = o.y + Math.sin(t * 3 + o.ph) * 4; if (Math.hypot(o.x - sx, py2 - sy) < 28) { items.splice(i, 1); const v = o.gold ? 5 : 1; pearls += v; g.add(v); g.sfx(o.gold ? "star" : "pop"); fl(g, cv, sx, sy - 20, "+" + v, o.gold ? "#ffd34e" : "#fff"); burst(g, P, o.x, py2, "#fff", 8, 110); } }
            else if (inv <= 0 && Math.hypot(o.x - sx, o.y - sy) < o.r + 14) { lives--; inv = 1.5; shake = .3; g.sfx("wrong"); g.status("Lives: " + lives); burst(g, P, sx, sy, "#ff9ad5", 12, 160); vx = -200; if (lives <= 0) { g.over("The jellyfish got you!"); return false; } }
          }
        }
        bub.forEach(b => { b.y -= b.v * dt; if (b.y < -10) { b.y = H + 10; b.x = g.rf(0, W); } });
        const [ox, oy] = shk(shake);
        x.save(); x.translate(ox, oy);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#35b8e8"); bg.addColorStop(1, "#0b3b78"); x.fillStyle = bg; x.fillRect(-20, -20, W + 40, H + 40);
        for (let i = 0; i < 5; i++) { const lx = wrap(i * 170 + 40, W + 100) - 50; x.fillStyle = "rgba(255,255,255,.06)"; x.beginPath(); x.moveTo(lx, 0); x.lineTo(lx + 60, 0); x.lineTo(lx + 20, H); x.lineTo(lx - 50, H); x.fill(); }
        x.fillStyle = "#e8d49a"; x.fillRect(-20, H - 22, W + 40, 30);
        for (let i = 0; i < 9; i++) { const wx2 = wrap(i * 90 - t * 30, W + 90) - 45; x.strokeStyle = "#2fae6a"; x.lineWidth = 6; x.lineCap = "round"; x.beginPath(); x.moveTo(wx2, H - 20); x.quadraticCurveTo(wx2 + Math.sin(t * 2 + i) * 12, H - 50, wx2, H - 80 - (i % 3) * 14); x.stroke(); }
        bub.forEach(b => { x.strokeStyle = "rgba(255,255,255,.5)"; x.lineWidth = 1.5; x.beginPath(); x.arc(b.x, b.y, b.r, 0, TAU); x.stroke(); });
        items.forEach(o => {
          if (o.k === "pearl") { const py2 = o.y + Math.sin(t * 3 + o.ph) * 4; x.fillStyle = "rgba(255,255,255,.25)"; x.beginPath(); x.arc(o.x, py2, 18, 0, TAU); x.fill(); const pg = x.createRadialGradient(o.x - 4, py2 - 4, 1, o.x, py2, 11); pg.addColorStop(0, "#fff"); pg.addColorStop(1, o.gold ? "#ffb02e" : "#c9d8ff"); x.fillStyle = pg; x.beginPath(); x.arc(o.x, py2, 11, 0, TAU); x.fill(); }
          else { x.strokeStyle = "rgba(255,154,213,.7)"; x.lineWidth = 3; x.lineCap = "round"; for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(o.x + k * o.r * .38, o.y + 4); x.quadraticCurveTo(o.x + k * o.r * .38 + Math.sin(t * 5 + k) * 7, o.y + o.r * 1.1, o.x + k * o.r * .38 + Math.sin(t * 5 + k + 1) * 6, o.y + o.r * 1.9); x.stroke(); } const jg = x.createRadialGradient(o.x, o.y - 6, 2, o.x, o.y, o.r); jg.addColorStop(0, "rgba(255,220,240,.95)"); jg.addColorStop(1, "rgba(255,110,190,.85)"); x.fillStyle = jg; x.beginPath(); x.ellipse(o.x, o.y, o.r, o.r * (.85 + Math.sin(t * 5) * .08), 0, Math.PI, 0); x.fill(); x.fillStyle = "#123"; x.fillRect(o.x - 7, o.y - 8, 3, 4); x.fillRect(o.x + 4, o.y - 8, 3, 4); }
        });
        x.globalAlpha = inv > 0 && Math.floor(t * 14) % 2 ? .4 : 1;
        x.save(); x.translate(sx, sy); x.scale(face, 1); x.rotate(vy / 600);
        x.fillStyle = "#ff8a2a"; x.beginPath(); x.moveTo(-14, 0); x.lineTo(-30, -8 + Math.sin(t * 10) * 5); x.lineTo(-30, 8 + Math.sin(t * 10) * 5); x.closePath(); x.fill();
        x.fillStyle = "#3a7bff"; x.beginPath(); x.ellipse(0, 2, 18, 12, 0, 0, TAU); x.fill(); x.fillStyle = "#ffcf9a"; x.beginPath(); x.arc(10, -6, 9, 0, TAU); x.fill();
        x.fillStyle = "#bfeaff"; x.beginPath(); x.roundRect(8, -12, 12, 9, 4); x.fill(); x.fillStyle = "#123"; x.fillRect(15, -9, 3, 3);
        x.restore(); x.globalAlpha = 1;
        stepP(x, P, dt); x.restore();
        T(x, "Pearls " + pearls, 70, 28, 18, "#fff");
        if (!started) { x.fillStyle = "rgba(0,0,0,.3)"; x.fillRect(0, 0, W, H); T(x, "Move to start swimming!", W / 2, H / 2 - 6, 28); T(x, "Pearls are good. Jellyfish are not.", W / 2, H / 2 + 28, 18, "#ffe9a8"); }
      });
    }
  });
})();
