// Break Time Games: set 9 (cozy, idle and creative toys)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---- shared helpers ----
  // a row of buttons under the canvas; a Finish button is always added at the end
  const bar = (g, items, fn, msg) => {
    const d = g.html(items.concat([{ id: "__fin", label: "Finish" }]).map(i => `<button type="button" class="bg-btn" data-id="${i.id}">${i.label}</button>`).join(""));
    d.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:8px 0";
    d.sel = id => d.querySelectorAll("button").forEach(b => { b.style.boxShadow = b.dataset.id === id ? "0 0 0 3px #fff" : ""; });
    g.on(d, "click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.id === "__fin") { g.over(msg || "Nice work!"); return; }
      fn(b.dataset.id, b);
    });
    return d;
  };
  // logical canvas point to CSS pixels (for g.pop)
  const cp = (c, W, H, p) => [p.x * c.clientWidth / W, p.y * c.clientHeight / H];
  const circ = (x, px, py, r) => { x.beginPath(); x.arc(px, py, r, 0, 7); };

  // ---- 1. Cupcake Bakery: idle clicker with play-money style upgrades ----
  B.add({
    id: "s9-bakery", name: "Cupcake Bakery", ages: [5, 20], cat: "Cozy", color: "#ff9ec7", icon: "C",
    desc: "Tap the cupcake, then buy helpers that bake for you.", controls: "Tap the cupcake (or press Space), then buy upgrades below. Play points only.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 360);
      const goal = g.by(400, 1500, 5000), mult = g.by(.7, 1, 1.4);
      let have = 0, total = 0, tap = 1, sq = 0, rf = 0; const parts = [];
      const ups = [
        { id: "tap", label: "Strong fingers", base: 12, tap: 1 },
        { id: "spoon", label: "Auto spoon", base: 25, auto: .4 },
        { id: "mixer", label: "Mixer", base: 100, auto: 2 },
        { id: "oven", label: "Big oven", base: 450, auto: 9 },
        { id: "shop", label: "Bake shop", base: 2000, auto: 40 }];
      const own = {}; ups.forEach(u => own[u.id] = 0);
      const cost = u => Math.ceil(u.base * mult * Math.pow(1.3, own[u.id]));
      const rate = () => ups.reduce((s, u) => s + (u.auto || 0) * own[u.id], 0);
      const sprinkles = []; for (let i = 0; i < 16; i++) { const a = g.rf(0, 6.28), r = g.rf(0, 1); sprinkles.push({ x: 320 + Math.cos(a) * r * 85, y: 200 + Math.sin(a) * r * 30, a: g.rf(0, 3), col: g.pick(["#fff", "#ffd34e", "#4cc3ff", "#6be28f", "#b48cff"]) }); }
      let b;
      const refresh = () => ups.forEach(u => { const bt = b.querySelector('[data-id="' + u.id + '"]'); if (bt) { const cc = cost(u); bt.textContent = u.label + " x" + own[u.id] + " (" + cc + ")"; bt.style.opacity = have >= cc ? 1 : .55; } });
      b = bar(g, ups.map(u => ({ id: u.id, label: "" })), id => {
        const u = ups.find(q => q.id === id); if (!u) return;
        if (have < cost(u)) { g.sfx("wrong"); return; }
        have -= cost(u); own[id]++; if (u.tap) tap += u.tap; g.sfx("star"); refresh();
      }, "Your bakery is cosy and busy!");
      refresh();
      const hit = (p) => {
        have += tap; total += tap; sq = 1; g.sfx("pop");
        for (let k = 0; k < 6; k++) parts.push({ x: 320 + g.rf(-50, 50), y: 150, vx: g.rf(-90, 90), vy: g.rf(-200, -80), life: .7, col: g.pick(["#ff8fc1", "#fff", "#ffd34e"]) });
        if (p) g.pop("+" + tap, ...cp(c, W, H, p));
      };
      g.on(c, "pointerdown", e => { const p = pos(e); if (Math.hypot(p.x - 320, p.y - 210) < 130) hit(p); });
      g.on(window, "keydown", e => { if (e.key === " " && e.target.tagName !== "BUTTON") hit(null); });
      g.loop((dt, t) => {
        const a = rate() * dt; have += a; total += a;
        rf -= dt; if (rf <= 0) { rf = .25; refresh(); }
        g.score(Math.floor(total)); g.status("Goal: " + goal);
        if (total >= goal) { g.win("Your bakery is famous!"); return false; }
        sq = Math.max(0, sq - dt * 5);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#ffe3f0"); gr.addColorStop(1, "#ffc4dd"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        for (let i = 0; i < 12; i++) { x.fillStyle = ["#ff6fb5", "#ffd34e", "#4cc3ff", "#6be28f"][i % 4]; x.beginPath(); x.moveTo(i * 56, 0); x.lineTo(i * 56 + 56, 0); x.lineTo(i * 56 + 28, 30 + Math.sin(t + i) * 3); x.fill(); }
        x.fillStyle = "#c98b5a"; x.fillRect(0, 316, W, 44);
        x.save(); x.translate(320, 320); x.scale(1 + sq * .12, 1 - sq * .12); x.translate(-320, -320);
        x.fillStyle = "rgba(0,0,0,.15)"; x.beginPath(); x.ellipse(320, 322, 115, 14, 0, 0, 7); x.fill();
        x.fillStyle = "#f4a259"; x.beginPath(); x.moveTo(245, 235); x.lineTo(395, 235); x.lineTo(372, 320); x.lineTo(268, 320); x.closePath(); x.fill();
        x.strokeStyle = "#d9823a"; x.lineWidth = 4; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(268 + k * 26, 240); x.lineTo(278 + k * 22, 316); x.stroke(); }
        x.fillStyle = "#ff8fc1"; circ(x, 262, 222, 40); x.fill(); circ(x, 378, 222, 40); x.fill(); circ(x, 320, 200, 56); x.fill(); circ(x, 320, 150, 40); x.fill(); circ(x, 320, 118, 24); x.fill();
        x.fillStyle = "rgba(255,255,255,.35)"; circ(x, 300, 140, 12); x.fill();
        sprinkles.forEach(s => { x.save(); x.translate(s.x, s.y); x.rotate(s.a); x.fillStyle = s.col; x.fillRect(-6, -2, 12, 4); x.restore(); });
        x.fillStyle = "#e23a4e"; circ(x, 320, 96, 14); x.fill(); x.fillStyle = "rgba(255,255,255,.7)"; circ(x, 315, 91, 4); x.fill();
        x.restore();
        for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.vy += 400 * dt; p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.min(1, p.life * 2); x.fillStyle = p.col; x.fillRect(p.x, p.y, 6, 6); x.globalAlpha = 1; }
        x.fillStyle = "#7a2f55"; x.font = "bold 26px system-ui, sans-serif"; x.textAlign = "left"; x.fillText("Treats: " + Math.floor(have), 16, 62);
        x.font = "bold 16px system-ui, sans-serif"; x.fillText("Baking " + rate().toFixed(1) + " per second", 16, 86);
        x.fillStyle = "rgba(122,47,85,.2)"; x.fillRect(16, 96, 180, 10); x.fillStyle = "#ff6fb5"; x.fillRect(16, 96, 180 * Math.min(1, total / goal), 10);
      });
    }
  });

  // ---- 2. Blobby Pet: a shape pet to feed, play with and put to bed ----
  B.add({
    id: "s9-pet", name: "Blobby Pet", ages: [5, 12], cat: "Cozy", color: "#ffb86b", icon: "P",
    desc: "Feed, play with and tuck in your own little blob pet.", controls: "Use the buttons: Feed, Play, Sleep. Tap the pet to pat it.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const dec = g.by(1.4, 2.2, 3.2);
      const need = { food: 75, fun: 75, rest: 75 }; let sleeping = false, care = 0, time = 0, hue = g.ri(0, 360), hop = 0, chew = 0, bad = 0, ball = null, food = null, blink = 3, sq = 0; const parts = [];
      const help = (k, v) => { if (need[k] < 90) { care++; } need[k] = Math.min(100, need[k] + v); };
      const bt = bar(g, [{ id: "feed", label: "Feed" }, { id: "play", label: "Play" }, { id: "sleep", label: "Sleep" }, { id: "col", label: "Colour" }], (id, btn) => {
        if (id === "col") { hue = (hue + 50) % 360; g.sfx("pick"); return; }
        if (id === "sleep") { sleeping = !sleeping; btn.textContent = sleeping ? "Wake up" : "Sleep"; g.sfx(sleeping ? "back" : "pick"); return; }
        if (sleeping) { g.sfx("wrong"); return; }
        if (id === "feed" && !food) { food = { x: 320, y: -20 }; g.sfx("swish"); }
        if (id === "play" && !ball) { ball = { x: g.rf(160, 480), y: 60, vy: 0, t: 4 }; g.sfx("pick"); }
      }, "Blobby had a lovely day!");
      g.on(c, "pointerdown", e => { const p = pos(e); if (Math.hypot(p.x - 320, p.y - 260) < 110 && !sleeping) { need.fun = Math.min(100, need.fun + 5); hop = .4; sq = 1; g.sfx("note", 500 + g.ri(0, 4) * 80); for (let k = 0; k < 5; k++) parts.push({ x: p.x, y: p.y, vx: g.rf(-60, 60), vy: g.rf(-120, -40), life: .8 }); } });
      g.loop((dt, t) => {
        time += dt; hop = Math.max(0, hop - dt); sq = Math.max(0, sq - dt * 4); chew = Math.max(0, chew - dt);
        if (sleeping) { need.rest += 9 * dt; need.food -= dec * .4 * dt; need.fun -= dec * .3 * dt; if (need.rest >= 100) { sleeping = false; bt.querySelector('[data-id="sleep"]').textContent = "Sleep"; g.sfx("cheer"); } }
        else { need.rest -= dec * .7 * dt; need.food -= dec * dt; need.fun -= dec * .9 * dt; }
        for (const k in need) need[k] = g.clamp(need[k], 0, 100);
        if (food) { food.y += 240 * dt; if (food.y >= 245) { food = null; chew = 1.2; help("food", 32); g.sfx("pop"); } }
        if (ball) { ball.t -= dt; ball.vy += 700 * dt; ball.y += ball.vy * dt; if (ball.y > 330) { ball.y = 330; ball.vy = -430; g.sfx("tick"); hop = .35; } need.fun = Math.min(100, need.fun + 9 * dt); if (ball.t <= 0) { ball = null; help("fun", 10); g.sfx("star"); } }
        const low = Math.min(need.food, need.fun, need.rest);
        bad = low <= 0 ? bad + dt : Math.max(0, bad - dt);
        if (bad > 7) { g.over("Blobby needed more care. Try again!"); return false; }
        g.score(care * 3 + Math.floor(time / 5)); g.status("Day " + (1 + Math.floor(time / 40)));
        blink -= dt; if (blink < -.15) blink = g.rf(2, 5);
        // room
        const gr = x.createLinearGradient(0, 0, 0, 300); gr.addColorStop(0, "#ffe6c7"); gr.addColorStop(1, "#ffc9a1"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "#b9824f"; x.fillRect(0, 300, W, 100);
        x.fillStyle = "#9fd8ff"; x.fillRect(40, 40, 120, 100); x.strokeStyle = "#fff"; x.lineWidth = 6; x.strokeRect(40, 40, 120, 100); x.beginPath(); x.moveTo(100, 40); x.lineTo(100, 140); x.moveTo(40, 90); x.lineTo(160, 90); x.stroke();
        // pet
        const grow = 1 + Math.min(.4, care * .02), py = 270 - Math.abs(Math.sin(t * 14)) * (hop > 0 ? 60 * hop : 0) + Math.sin(t * 2) * 2;
        x.fillStyle = "rgba(0,0,0,.18)"; x.beginPath(); x.ellipse(320, 332, 90 * grow, 14, 0, 0, 7); x.fill();
        x.save(); x.translate(320, 330); x.scale(grow * (1 + sq * .1), grow * (1 - sq * .1 + (sleeping ? Math.sin(t * 2) * .02 : 0))); x.translate(-320, -330);
        const by = py - 5;
        const bg = x.createRadialGradient(290, by - 40, 10, 320, by, 100); bg.addColorStop(0, `hsl(${hue},85%,75%)`); bg.addColorStop(1, `hsl(${hue},70%,55%)`);
        x.fillStyle = `hsl(${hue},70%,50%)`; circ(x, 262, by - 70, 20); x.fill(); circ(x, 378, by - 70, 20); x.fill();
        x.fillStyle = bg; x.beginPath(); x.ellipse(320, by, 90, 78, 0, 0, 7); x.fill();
        x.fillStyle = `hsl(${hue},80%,88%)`; x.beginPath(); x.ellipse(320, by + 28, 52, 38, 0, 0, 7); x.fill();
        x.fillStyle = "rgba(255,120,150,.5)"; circ(x, 262, by + 5, 11); x.fill(); circ(x, 378, by + 5, 11); x.fill();
        x.fillStyle = "#2a2140"; x.strokeStyle = "#2a2140"; x.lineWidth = 4; x.lineCap = "round";
        if (sleeping || blink < 0) { [285, 355].forEach(ex => { x.beginPath(); x.arc(ex, by - 20, 9, .2, Math.PI - .2); x.stroke(); }); }
        else { [285, 355].forEach(ex => { circ(x, ex, by - 20, 10); x.fill(); x.fillStyle = "#fff"; circ(x, ex + 3, by - 24, 3.5); x.fill(); x.fillStyle = "#2a2140"; }); }
        const avg = (need.food + need.fun + need.rest) / 3;
        if (chew > 0) { x.beginPath(); x.ellipse(320, by + 12, 12, 6 + Math.abs(Math.sin(t * 14)) * 6, 0, 0, 7); x.fill(); }
        else { x.beginPath(); if (avg > 50) x.arc(320, by + 4, 16, .2, Math.PI - .2); else if (avg > 25) { x.moveTo(305, by + 14); x.lineTo(335, by + 14); } else x.arc(320, by + 22, 14, Math.PI + .3, -.3); x.stroke(); }
        x.restore();
        if (sleeping) { x.fillStyle = "rgba(20,20,70,.45)"; x.fillRect(0, 0, W, H); x.fillStyle = "#fff"; x.font = "bold 28px system-ui, sans-serif"; x.fillText("z", 400, 170 - (t * 20) % 30); x.fillText("Z", 430, 140 - (t * 20) % 30); }
        if (food) { x.fillStyle = "#ff4d4d"; circ(x, food.x, food.y, 14); x.fill(); x.fillStyle = "#3fae5a"; x.fillRect(food.x - 2, food.y - 20, 4, 8); }
        if (ball) { x.fillStyle = "#4cc3ff"; circ(x, ball.x, ball.y, 16); x.fill(); x.fillStyle = "#fff"; circ(x, ball.x - 5, ball.y - 5, 5); x.fill(); }
        for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; x.fillStyle = "#ffd34e"; x.font = "bold 22px system-ui, sans-serif"; x.fillText("*", p.x, p.y); }
        // need bars
        [["Food", "food", "#ff8a5c"], ["Fun", "fun", "#ffd34e"], ["Rest", "rest", "#6aa8ff"]].forEach((n, i) => {
          x.fillStyle = "rgba(0,0,0,.25)"; x.fillRect(440, 20 + i * 28, 170, 16); x.fillStyle = need[n[1]] < 25 ? "#ff4d6d" : n[2]; x.fillRect(440, 20 + i * 28, 170 * need[n[1]] / 100, 16);
          x.fillStyle = "#4a2f1a"; x.font = "bold 14px system-ui, sans-serif"; x.textAlign = "right"; x.fillText(n[0], 432, 33 + i * 28); x.textAlign = "left";
        });
      });
    }
  });

  // ---- 3. Aquarium Builder ----
  B.add({
    id: "s9-aquarium", name: "Aquarium Builder", ages: [5, 14], cat: "Creative", color: "#4cc3ff", icon: "A",
    desc: "Fill your tank with fish, jellies and plants. Feed them too!", controls: "Pick a thing below, then tap the tank to add it. Use Food to feed the fish.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const cap = g.by(40, 28, 18), spd = g.by(.7, 1, 1.3), FL = H - 50;
      let tool = "fish"; const things = [], food = [], bub = []; let eatT = 0;
      const tb = bar(g, [{ id: "fish", label: "Fish" }, { id: "big", label: "Big fish" }, { id: "jelly", label: "Jelly" }, { id: "weed", label: "Seaweed" }, { id: "rock", label: "Rock" }, { id: "food", label: "Food" }], id => { tool = id; tb.sel(id); g.sfx("click"); }, "What a lovely aquarium!");
      tb.sel(tool);
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        if (tool === "food") { for (let i = 0; i < 4; i++) food.push({ x: p.x + g.rf(-18, 18), y: Math.max(20, p.y) + g.rf(-10, 10) }); g.sfx("splash"); return; }
        if (things.length >= cap) { g.sfx("wrong"); g.pop("Tank is full!", ...cp(c, W, H, p)); return; }
        const th = { k: tool, x: p.x, y: p.y, vx: 0, vy: 0, h: g.ri(0, 360), s: tool === "big" ? 1.8 : 1, tx: p.x, ty: p.y, wt: 0, face: 1, ph: g.rf(0, 6) };
        if (tool === "weed" || tool === "rock") th.y = FL + g.rf(-4, 6);
        things.push(th); g.add(1); g.sfx(tool === "rock" ? "thump" : "splash");
        for (let i = 0; i < 6; i++) bub.push({ x: p.x + g.rf(-10, 10), y: p.y, r: g.rf(2, 5), v: g.rf(30, 60) });
      });
      g.loop((dt, t) => {
        eatT -= dt;
        for (const f of food) f.y += 32 * dt; for (let i = food.length - 1; i >= 0; i--) if (food[i].y > FL) food.splice(i, 1);
        for (const th of things) {
          if (th.k === "weed" || th.k === "rock") continue;
          const jel = th.k === "jelly", ms = (jel ? 28 : th.k === "big" ? 55 : 75) * spd;
          let near = null, nd = 260; if (!jel) for (const f of food) { const d = Math.hypot(f.x - th.x, f.y - th.y); if (d < nd) { nd = d; near = f; } }
          th.wt -= dt;
          if (near) { th.tx = near.x; th.ty = near.y; } else if (th.wt <= 0 || Math.hypot(th.tx - th.x, th.ty - th.y) < 12) { th.tx = g.rf(30, W - 30); th.ty = g.rf(50, FL - 60); th.wt = g.rf(2, 6); }
          const dx = th.tx - th.x, dy = th.ty - th.y, d = Math.hypot(dx, dy) || 1;
          th.vx += (dx / d * ms - th.vx) * dt * 1.5; th.vy += (dy / d * ms - th.vy) * dt * 1.5;
          th.x += th.vx * dt; th.y += th.vy * dt + (jel ? Math.sin(t * 2 + th.ph) * 12 * dt : 0);
          if (Math.abs(th.vx) > 5) th.face += ((th.vx > 0 ? 1 : -1) - th.face) * Math.min(1, dt * 8);
          if (near && Math.hypot(near.x - th.x, near.y - th.y) < 12 * th.s) { food.splice(food.indexOf(near), 1); g.add(1); if (eatT <= 0) { g.sfx("pop"); eatT = .12; } }
        }
        if (g.rand() < dt * 3) bub.push({ x: g.rf(0, W), y: H, r: g.rf(2, 5), v: g.rf(25, 50) });
        for (let i = bub.length - 1; i >= 0; i--) { bub[i].y -= bub[i].v * dt; if (bub[i].y < -10) bub.splice(i, 1); }
        g.status("Tank: " + things.length + "/" + cap);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#7fe0ff"); gr.addColorStop(1, "#0a5a9c"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "rgba(255,255,255,.08)"; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(80 + i * 160, 0); x.lineTo(140 + i * 160, 0); x.lineTo(100 + i * 160 + Math.sin(t + i) * 20, H); x.lineTo(20 + i * 160, H); x.fill(); }
        x.fillStyle = "#e6cf93"; x.beginPath(); x.ellipse(W / 2, H + 10, W * .7, 70, 0, 0, 7); x.fill();
        x.strokeStyle = "rgba(255,255,255,.6)"; x.lineWidth = 1.5; bub.forEach(b => { circ(x, b.x + Math.sin(t * 3 + b.y * .05) * 3, b.y, b.r); x.stroke(); });
        const sorted = things.slice().sort((a, b) => (a.k === "weed" || a.k === "rock" ? -1 : 0) - (b.k === "weed" || b.k === "rock" ? -1 : 0));
        for (const th of sorted) {
          x.save(); x.translate(th.x, th.y);
          if (th.k === "rock") { x.fillStyle = "#7a8794"; x.beginPath(); x.ellipse(0, -8, 30, 20, 0, 0, 7); x.fill(); x.fillStyle = "rgba(255,255,255,.25)"; x.beginPath(); x.ellipse(-8, -14, 12, 7, 0, 0, 7); x.fill(); }
          else if (th.k === "weed") { x.strokeStyle = `hsl(${110 + th.h % 40},60%,40%)`; x.lineWidth = 7; x.lineCap = "round"; for (let k = -1; k <= 1; k++) { x.beginPath(); x.moveTo(k * 9, 0); x.bezierCurveTo(k * 9 + Math.sin(t * 1.5 + th.ph + k) * 14, -35, k * 9 - Math.sin(t * 1.5 + th.ph) * 14, -70, k * 9 + Math.sin(t * 1.5 + th.ph + 2) * 12, -(90 + k * 10)); x.stroke(); } }
          else if (th.k === "jelly") { const pu = Math.sin(t * 3 + th.ph); x.fillStyle = `hsla(${th.h},80%,75%,.75)`; x.beginPath(); x.ellipse(0, 0, 22 + pu * 2, 18 - pu * 2, 0, Math.PI, 0); x.fill(); x.strokeStyle = `hsla(${th.h},80%,80%,.7)`; x.lineWidth = 3; x.lineCap = "round"; for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(k * 8, 0); x.quadraticCurveTo(k * 8 + Math.sin(t * 3 + k) * 6, 14, k * 8 - Math.sin(t * 3 + k) * 6, 28); x.stroke(); } }
          else { x.scale(th.face * th.s, th.s); const w = Math.sin(t * 9 + th.ph) * 5; x.fillStyle = `hsl(${th.h},75%,55%)`; x.beginPath(); x.moveTo(-14, 0); x.lineTo(-30, -11 + w); x.lineTo(-30, 11 + w); x.closePath(); x.fill(); x.beginPath(); x.ellipse(0, 0, 20, 12, 0, 0, 7); x.fill(); x.fillStyle = `hsl(${th.h},80%,75%)`; x.beginPath(); x.ellipse(2, 4, 13, 5, 0, 0, 7); x.fill(); x.fillStyle = "#fff"; circ(x, 11, -3, 4); x.fill(); x.fillStyle = "#111"; circ(x, 12, -3, 2); x.fill(); }
          x.restore();
        }
        x.fillStyle = "#ffcf6b"; food.forEach(f => { circ(x, f.x, f.y, 3); x.fill(); });
      });
    }
  });

  // ---- 4. Fireworks Launcher ----
  B.add({
    id: "s9-fireworks", name: "Fireworks Show", ages: [5, 20], cat: "Creative", color: "#7a5cff", icon: "F",
    desc: "Launch glittering fireworks into the night sky.", controls: "Tap the sky to launch. Pick a style below, or press 1 to 4.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const cool = g.by(.2, .4, .7); let kind = "burst", cd = 0, last = -9, flash = 0, now = 0; const rockets = [], sparks = [], queue = []; let finaleCd = 0;
      const stars = []; for (let i = 0; i < 70; i++) stars.push({ x: g.rf(0, W), y: g.rf(0, H - 80), p: g.rf(0, 6) });
      const city = []; for (let i = 0; i < 16; i++) city.push({ x: i * 42 - 6, w: g.rf(28, 44), h: g.rf(30, 80) });
      const kinds = ["burst", "ring", "willow", "sparkle"];
      const tb = bar(g, [{ id: "burst", label: "Burst" }, { id: "ring", label: "Ring" }, { id: "willow", label: "Willow" }, { id: "sparkle", label: "Sparkle" }, { id: "finale", label: "Finale" }], id => {
        if (id === "finale") { if (finaleCd > 0) { g.sfx("wrong"); return; } finaleCd = 12; for (let i = 0; i < 8; i++) queue.push({ t: i * .28, x: g.rf(80, W - 80), y: g.rf(60, 190), k: g.pick(kinds) }); g.sfx("cheer"); return; }
        kind = id; tb.sel(id); g.sfx("click");
      }, "What a show!");
      tb.sel(kind);
      const launch = (px, py, k, free) => {
        if (!free && cd > 0) { return false; }
        rockets.push({ x: px, y: H - 40, tx: px, ty: g.clamp(py, 40, H - 110), t: 0, k, h: g.ri(0, 360) });
        g.sfx("launch"); if (!free) cd = cool;
        g.add(1); if (now - last < 1) { g.add(1); g.pop("Combo!", ...cp(c, W, H, { x: px, y: py })); } last = now; return true;
      };
      g.on(c, "pointerdown", e => { const p = pos(e); if (!launch(p.x, p.y, kind, false)) g.sfx("wrong"); });
      g.on(window, "keydown", e => { const i = "1234".indexOf(e.key); if (i >= 0 && e.target.tagName !== "BUTTON") { kind = kinds[i]; tb.sel(kind); } });
      const boom = r => {
        g.sfx("boom"); flash = .2; const n = { burst: 70, ring: 50, willow: 60, sparkle: 45 }[r.k] || 60;
        for (let i = 0; i < n; i++) {
          const a = r.k === "ring" ? i / n * 6.283 : g.rf(0, 6.283), sp = r.k === "ring" ? 150 : r.k === "willow" ? g.rf(40, 130) : g.rf(40, 200), life = r.k === "willow" ? 2.2 : g.rf(1, 1.6);
          sparks.push({ x: r.x, y: r.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life, max: life, col: r.k === "willow" ? "hsl(45,100%,62%)" : `hsl(${r.h + g.rf(-25, 25)},100%,66%)`, tw: r.k === "sparkle", gr: r.k === "willow" ? 110 : 55 });
        }
        if (sparks.length > 900) sparks.splice(0, sparks.length - 900);
      };
      g.loop((dt, t) => {
        now = t; cd -= dt; finaleCd -= dt; flash = Math.max(0, flash - dt);
        for (let i = queue.length - 1; i >= 0; i--) { queue[i].t -= dt; if (queue[i].t <= 0) { launch(queue[i].x, queue[i].y, queue[i].k, true); queue.splice(i, 1); } }
        for (let i = rockets.length - 1; i >= 0; i--) {
          const r = rockets[i]; r.t += dt / .9; const e = Math.min(1, r.t), py = H - 40 + (r.ty - (H - 40)) * (1 - (1 - e) * (1 - e));
          r.py = r.y; r.y = py; sparks.push({ x: r.x + g.rf(-2, 2), y: r.y, vx: g.rf(-15, 15), vy: g.rf(20, 50), life: .35, max: .35, col: "#ffcf8a", gr: 0 });
          if (r.t >= 1) { boom(r); rockets.splice(i, 1); }
        }
        for (let i = sparks.length - 1; i >= 0; i--) { const s = sparks[i]; s.life -= dt; if (s.life <= 0) { sparks.splice(i, 1); continue; } s.vy += s.gr * dt; s.vx *= 1 - dt * .9; s.vy *= 1 - dt * .5; s.x += s.vx * dt; s.y += s.vy * dt; }
        g.status(cd > 0 ? "Reloading..." : "Ready");
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#050722"); gr.addColorStop(1, "#2a1a5e"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        if (flash > 0) { x.fillStyle = `rgba(255,255,255,${flash * .35})`; x.fillRect(0, 0, W, H); }
        x.fillStyle = "#fff"; stars.forEach(s => { x.globalAlpha = .4 + .4 * Math.sin(t * 2 + s.p); x.fillRect(s.x, s.y, 2, 2); }); x.globalAlpha = 1;
        x.globalCompositeOperation = "lighter"; x.lineWidth = 2.5; x.lineCap = "round";
        let k = 0;
        for (const s of sparks) {
          k++; let a = Math.min(1, s.life / s.max * 1.6); if (s.tw) a *= .5 + .5 * Math.sin(t * 40 + k); x.globalAlpha = Math.max(0, a); x.strokeStyle = s.col; x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(s.x - s.vx * .03, s.y - s.vy * .03); x.stroke();
        }
        x.globalAlpha = 1; x.fillStyle = "#fff"; rockets.forEach(r => { circ(x, r.x, r.y, 3); x.fill(); });
        x.globalCompositeOperation = "source-over";
        x.fillStyle = "#0b0a1c"; city.forEach(b => { x.fillRect(b.x, H - b.h, b.w, b.h); });
        x.fillStyle = "#ffd34e"; city.forEach((b, i) => { if (i % 2) x.fillRect(b.x + 6, H - b.h + 10, 5, 5); });
      });
    }
  });

  // ---- 5. Sand Box: falling sand sandbox ----
  B.add({
    id: "s9-sand", name: "Sand Box", ages: [7, 20], cat: "Creative", color: "#f2c96b", icon: "S",
    desc: "Pour sand and water, light fires and grow plants.", controls: "Pick a material below, then hold and drag on the box.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const GW = 160, GH = 100, S = 4, grid = new Uint8Array(GW * GH), aux = new Uint8Array(GW * GH), mv = new Uint8Array(GW * GH);
      const off = document.createElement("canvas"); off.width = GW; off.height = GH; const ox = off.getContext("2d"), img = ox.createImageData(GW, GH);
      const COL = { 1: [236, 200, 110], 2: [60, 140, 255], 3: [128, 130, 142], 5: [140, 90, 50], 6: [70, 190, 90] };
      let mat = 1, down = false, px = 0, py = 0, frame = 0, energy = 400, placed = 0, snd = 0;
      const regen = g.by(320, 200, 120), MAXE = 400;
      const tb = bar(g, [{ id: "1", label: "Sand" }, { id: "2", label: "Water" }, { id: "3", label: "Stone" }, { id: "5", label: "Wood" }, { id: "4", label: "Fire" }, { id: "6", label: "Plant" }, { id: "0", label: "Erase" }, { id: "clr", label: "Clear" }], id => {
        if (id === "clr") { grid.fill(0); aux.fill(0); g.sfx("swish"); return; }
        mat = +id; tb.sel(id); g.sfx("click");
      }, "What a creation!");
      tb.sel("1");
      const set = e => { const p = pos(e); px = Math.floor(p.x / S); py = Math.floor(p.y / S); };
      g.on(c, "pointerdown", e => { down = true; set(e); g.sfx(mat === 4 ? "fizz" : mat === 2 ? "splash" : "click"); });
      g.on(window, "pointermove", e => { if (down) set(e); });
      g.on(window, "pointerup", () => { down = false; });
      const swap = (i, j) => { const m = grid[i], a = aux[i]; grid[i] = grid[j]; aux[i] = aux[j]; grid[j] = m; aux[j] = a; mv[i] = 1; mv[j] = 1; };
      const step = () => {
        mv.fill(0); frame++;
        for (let y = GH - 1; y >= 0; y--) {
          const dir = (frame & 1) ? 1 : -1;
          for (let k = 0; k < GW; k++) {
            const xx = dir > 0 ? k : GW - 1 - k, i = y * GW + xx, m = grid[i];
            if (!m || mv[i] || m === 3 || m === 5) continue;
            const d = Math.random() < .5 ? -1 : 1;
            if (m === 1) {
              if (y < GH - 1) {
                const b = i + GW;
                if (grid[b] === 0 || grid[b] === 2) swap(i, b);
                else { const nx = xx + d; if (nx >= 0 && nx < GW && (grid[b + d] === 0 || grid[b + d] === 2)) swap(i, b + d); }
              }
            } else if (m === 2) {
              if (y < GH - 1 && grid[i + GW] === 0) swap(i, i + GW);
              else if (y < GH - 1 && xx + d >= 0 && xx + d < GW && grid[i + GW + d] === 0) swap(i, i + GW + d);
              else if (xx + d >= 0 && xx + d < GW && grid[i + d] === 0) swap(i, i + d);
            } else if (m === 4) {
              if (aux[i] <= 1) { grid[i] = 0; continue; }
              if (Math.random() < .6) aux[i]--;
              const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]], q = dirs[(Math.random() * 4) | 0], nx = xx + q[0], ny = y + q[1];
              if (nx >= 0 && nx < GW && ny >= 0 && ny < GH) {
                const n = ny * GW + nx;
                if ((grid[n] === 5 || grid[n] === 6) && Math.random() < .3) { grid[n] = 4; aux[n] = 50 + ((Math.random() * 50) | 0); mv[n] = 1; }
                else if (grid[n] === 2) { grid[i] = 0; continue; }
              }
              if (y > 0 && grid[i - GW] === 0 && Math.random() < .5) swap(i, i - GW);
              else if (xx + d >= 0 && xx + d < GW && grid[i + d] === 0 && Math.random() < .3) swap(i, i + d);
            } else if (m === 6 && Math.random() < .015) {
              const dirs = [[0, -1], [-1, 0], [1, 0], [0, 1]];
              for (const q of dirs) { const nx = xx + q[0], ny = y + q[1]; if (nx >= 0 && nx < GW && ny >= 0 && ny < GH && grid[ny * GW + nx] === 2) { grid[ny * GW + nx] = 6; break; } }
            }
          }
        }
      };
      g.loop((dt, t) => {
        energy = Math.min(MAXE, energy + regen * dt); snd -= dt;
        if (down) {
          for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
            if (dx * dx + dy * dy > 6) continue; const nx = px + dx, ny = py + dy; if (nx < 0 || ny < 0 || nx >= GW || ny >= GH) continue;
            const i = ny * GW + nx;
            if (mat === 0) { grid[i] = 0; continue; }
            if (grid[i] !== 0 || energy < 1 || ((mat === 1 || mat === 2) && Math.random() < .35)) continue;
            grid[i] = mat; aux[i] = mat === 4 ? 25 + ((Math.random() * 30) | 0) : 0; energy--; placed++;
          }
          if (snd <= 0 && mat !== 0) { snd = .18; g.sfx(mat === 4 ? "fizz" : mat === 2 ? "splash" : "tick"); }
        }
        step(); step();
        g.score(Math.floor(placed / 25)); g.status("Energy: " + Math.floor(energy));
        const d = img.data;
        for (let i = 0; i < GW * GH; i++) {
          const m = grid[i], o = i * 4, nz = ((i * 2654435761) >>> 0) % 24 - 12;
          if (!m) { const yy = (i / GW) | 0; d[o] = 20 + yy * .15; d[o + 1] = 24 + yy * .15; d[o + 2] = 46 + yy * .25; }
          else if (m === 4) { d[o] = 255; d[o + 1] = Math.min(220, 60 + aux[i] * 3); d[o + 2] = 20; }
          else { const cc = COL[m]; d[o] = cc[0] + nz; d[o + 1] = cc[1] + nz; d[o + 2] = cc[2] + nz; }
          d[o + 3] = 255;
        }
        ox.putImageData(img, 0, 0); x.imageSmoothingEnabled = false; x.drawImage(off, 0, 0, W, H);
        x.fillStyle = "rgba(255,255,255,.2)"; x.fillRect(10, 10, 120, 8); x.fillStyle = energy < 60 ? "#ff6b6b" : "#ffd34e"; x.fillRect(10, 10, 120 * energy / MAXE, 8);
        if (down) { x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 1.5; circ(x, px * S + 2, py * S + 2, 12); x.stroke(); }
      });
    }
  });

  // ---- 6. Pixel Painter ----
  B.add({
    id: "s9-pixel", name: "Pixel Painter", ages: [5, 20], cat: "Creative", color: "#ff6fb5", icon: "X",
    desc: "Make your own pixel art with a colour palette.", controls: "Pick a colour on the right, then tap or drag on the grid. Use the buttons for fill, erase and mirror.",
    start(g) {
      const N = g.by(8, 12, 16), { c, x, W, H, pos } = g.canvas(640, 400), G = 360, cs = G / N, X0 = 20, Y0 = 20;
      const PAL = ["#1b1b2f", "#ffffff", "#ff4d6d", "#ff9f43", "#ffd34e", "#6be28f", "#2ecc71", "#4cc3ff", "#2a6df4", "#b48cff", "#ff6fb5", "#8d5a3b", "#f5cba7", "#9aa5b1", "#0b7a75", "#ffb3c7"];
      const grid = new Array(N * N).fill(-1), IDEAS = ["a house", "a heart", "a rainbow", "a tree", "a smiley face", "a fish", "a flower", "a cat", "a rocket", "an ice cream"];
      let col = 2, tool = "paint", mirror = false, down = false, lc = null, dirty = true, idea = g.pick(IDEAS);
      g.status("Idea: " + idea);
      const count = () => { let n = 0; for (const v of grid) if (v >= 0) n++; g.score(n); };
      const tb = bar(g, [{ id: "paint", label: "Paint" }, { id: "fill", label: "Fill" }, { id: "erase", label: "Erase" }, { id: "mirror", label: "Mirror: off" }, { id: "idea", label: "New idea" }, { id: "clear", label: "Clear" }], (id, btn) => {
        if (id === "mirror") { mirror = !mirror; btn.textContent = "Mirror: " + (mirror ? "on" : "off"); g.sfx("click"); return; }
        if (id === "idea") { idea = g.pick(IDEAS); g.status("Idea: " + idea); g.sfx("pick"); return; }
        if (id === "clear") { grid.fill(-1); count(); dirty = true; g.sfx("swish"); return; }
        tool = id; tb.sel(id); g.sfx("click");
      }, "Beautiful pixel art!");
      tb.sel("paint");
      const cell = p => { const cx = Math.floor((p.x - X0) / cs), cy = Math.floor((p.y - Y0) / cs); return cx >= 0 && cy >= 0 && cx < N && cy < N ? { x: cx, y: cy } : null; };
      const put = (cx, cy, v) => { grid[cy * N + cx] = v; if (mirror) grid[cy * N + (N - 1 - cx)] = v; };
      const flood = (cx, cy) => {
        const target = grid[cy * N + cx], nv = col; if (target === nv) return; const st = [[cx, cy]];
        while (st.length) { const [a, b] = st.pop(); if (a < 0 || b < 0 || a >= N || b >= N || grid[b * N + a] !== target) continue; grid[b * N + a] = nv; st.push([a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]); }
      };
      const apply = (cl) => {
        if (!cl) return;
        if (tool === "fill") { flood(cl.x, cl.y); g.sfx("pop"); }
        else { const nv = tool === "erase" ? -1 : col; if (grid[cl.y * N + cl.x] !== nv) g.sfx("tick"); put(cl.x, cl.y, nv); }
        count(); dirty = true;
      };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        if (p.x > 410) { const sx = Math.floor((p.x - 410) / 52), sy = Math.floor((p.y - 40) / 52); if (sx >= 0 && sx < 4 && sy >= 0 && sy < 4) { col = sy * 4 + sx; if (tool === "erase") { tool = "paint"; tb.sel("paint"); } g.sfx("note", 330 + col * 30); dirty = true; } return; }
        const cl = cell(p); down = tool !== "fill"; lc = cl; apply(cl);
      });
      g.on(window, "pointermove", e => {
        if (!down) return; const cl = cell(pos(e)); if (!cl || !lc) { lc = cl; return; }
        const n = Math.max(Math.abs(cl.x - lc.x), Math.abs(cl.y - lc.y));
        for (let i = 1; i <= n; i++) apply({ x: Math.round(lc.x + (cl.x - lc.x) * i / n), y: Math.round(lc.y + (cl.y - lc.y) * i / n) });
        lc = cl;
      });
      g.on(window, "pointerup", () => { down = false; });
      g.loop(() => {
        if (!dirty) return; dirty = false;
        x.fillStyle = "#2b2540"; x.fillRect(0, 0, W, H);
        x.fillStyle = "#fff"; x.fillRect(X0 - 4, Y0 - 4, G + 8, G + 8);
        for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
          const v = grid[j * N + i]; x.fillStyle = v >= 0 ? PAL[v] : ((i + j) % 2 ? "#e4e0ee" : "#f4f1fa"); x.fillRect(X0 + i * cs, Y0 + j * cs, cs + .5, cs + .5);
        }
        if (mirror) { x.strokeStyle = "#ff6fb5"; x.setLineDash([6, 6]); x.lineWidth = 2; x.beginPath(); x.moveTo(X0 + G / 2, Y0); x.lineTo(X0 + G / 2, Y0 + G); x.stroke(); x.setLineDash([]); }
        PAL.forEach((p, k) => { const sx = 410 + (k % 4) * 52, sy = 40 + Math.floor(k / 4) * 52; x.fillStyle = p; x.beginPath(); x.roundRect(sx, sy, 44, 44, 8); x.fill(); if (k === col) { x.strokeStyle = "#fff"; x.lineWidth = 4; x.stroke(); } });
        x.fillStyle = "#fff"; x.font = "bold 16px system-ui, sans-serif"; x.fillText("Colours", 410, 30); x.fillText("Preview", 410, 270);
        const pv = 100 / N; x.fillStyle = "#fff"; x.fillRect(408, 278, 104, 104);
        for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const v = grid[j * N + i]; if (v >= 0) { x.fillStyle = PAL[v]; x.fillRect(410 + i * pv, 280 + j * pv, pv + .3, pv + .3); } }
      });
    }
  });

  // ---- 7. Music Box ----
  B.add({
    id: "s9-musicbox", name: "Music Box", ages: [5, 20], cat: "Creative", color: "#d6a35c", icon: "M",
    desc: "Tap the dots to write a little tune. The music box plays it on a loop.", controls: "Tap or drag on the grid to place notes. Play, Slower and Faster are below.",
    start(g) {
      const ST = g.by(8, 12, 16), RW = g.by(5, 6, 8), { c, x, W, H, pos } = g.canvas(640, 400);
      const FR = [[523, 440, 392, 330, 262], [523, 440, 392, 330, 294, 262], [784, 659, 587, 523, 440, 392, 330, 262]][g.diff];
      const GX = 60, GY = 20, GWd = 560, GHt = 340, cw = GWd / ST, ch = GHt / RW;
      const on = []; for (let r = 0; r < RW; r++) on.push(new Array(ST).fill(false));
      const glow = []; for (let r = 0; r < RW; r++) glow.push(new Array(ST).fill(0));
      let play = true, stepDur = g.by(.4, .3, .22), acc = 0, step = -1, paintVal = null, loops = 0;
      const notes = () => { let n = 0; on.forEach(r => r.forEach(v => { if (v) n++; })); return n; };
      const tb = bar(g, [{ id: "play", label: "Pause" }, { id: "slow", label: "Slower" }, { id: "fast", label: "Faster" }, { id: "rand", label: "Surprise me" }, { id: "clear", label: "Clear" }], (id, btn) => {
        if (id === "play") { play = !play; btn.textContent = play ? "Pause" : "Play"; g.sfx("click"); }
        else if (id === "slow") { stepDur = Math.min(.9, stepDur * 1.15); g.sfx("click"); }
        else if (id === "fast") { stepDur = Math.max(.1, stepDur / 1.15); g.sfx("click"); }
        else if (id === "rand") { for (let r = 0; r < RW; r++) for (let s = 0; s < ST; s++) on[r][s] = Math.random() < .2; g.sfx("pick"); }
        else if (id === "clear") { on.forEach(r => r.fill(false)); g.sfx("swish"); }
      }, "Lovely music!");
      const cellAt = p => { const s = Math.floor((p.x - GX) / cw), r = Math.floor((p.y - GY) / ch); return s >= 0 && r >= 0 && s < ST && r < RW ? { s, r } : null; };
      const setCell = (cl, v) => { if (!cl || on[cl.r][cl.s] === v) return; on[cl.r][cl.s] = v; if (v) { g.add(1); g.sfx("note", FR[cl.r]); glow[cl.r][cl.s] = 1; } else g.sfx("tick"); };
      g.on(c, "pointerdown", e => { const cl = cellAt(pos(e)); if (!cl) return; paintVal = !on[cl.r][cl.s]; setCell(cl, paintVal); });
      g.on(window, "pointermove", e => { if (paintVal !== null) setCell(cellAt(pos(e)), paintVal); });
      g.on(window, "pointerup", () => { paintVal = null; });
      g.loop(dt => {
        if (play) {
          acc += dt;
          if (acc >= stepDur) {
            acc = 0; step = (step + 1) % ST;
            if (step === 0) { loops++; if (notes() >= 4) g.add(2); }
            for (let r = 0; r < RW; r++) if (on[r][step]) { g.sfx("note", FR[r]); glow[r][step] = 1; }
          }
        }
        g.status("Notes: " + notes());
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#6b4630"); gr.addColorStop(1, "#4a2f20"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "#d4a950"; x.fillRect(GX - 8, GY - 8, GWd + 16, GHt + 16); x.fillStyle = "#3b2418"; x.fillRect(GX - 4, GY - 4, GWd + 8, GHt + 8);
        if (play && step >= 0) { x.fillStyle = "rgba(255,230,150,.2)"; x.fillRect(GX + step * cw, GY, cw, GHt); }
        for (let r = 0; r < RW; r++) {
          x.fillStyle = `hsl(${r * 360 / RW},80%,62%)`; circ(x, 30, GY + r * ch + ch / 2, 12); x.fill();
          for (let s = 0; s < ST; s++) {
            const px = GX + s * cw + cw / 2, py = GY + r * ch + ch / 2; glow[r][s] = Math.max(0, glow[r][s] - .03);
            const rad = Math.min(cw, ch) * .32;
            if (on[r][s]) { x.fillStyle = `hsl(${r * 360 / RW},85%,${60 + glow[r][s] * 20}%)`; circ(x, px, py, rad * (1 + glow[r][s] * .35)); x.fill(); x.strokeStyle = "#fff"; x.lineWidth = 2; x.stroke(); }
            else { x.fillStyle = "rgba(255,255,255,.14)"; circ(x, px, py, rad * .5); x.fill(); }
          }
        }
        if (ST > 8) { x.strokeStyle = "rgba(255,255,255,.12)"; x.lineWidth = 1; x.beginPath(); x.moveTo(GX + GWd / 2, GY); x.lineTo(GX + GWd / 2, GY + GHt); x.stroke(); }
      });
    }
  });

  // ---- 8. Zen Garden ----
  B.add({
    id: "s9-zen", name: "Zen Garden", ages: [5, 20], cat: "Cozy", color: "#c9b88a", icon: "Z",
    desc: "Rake calm lines in the sand and go around the rocks.", controls: "Drag with the mouse or finger to rake. Rake the whole garden to finish.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const nR = g.by(3, 5, 8), T = g.by(6, 5, 4), SP = 11, goal = g.by(75, 82, 88), CW = 32, CH = 20;
      const sand = document.createElement("canvas"); sand.width = W; sand.height = H; const sx = sand.getContext("2d");
      let rocks = [], vis = new Uint8Array(CW * CH), reach = 0, last = null, down = false, hov = null, snd = 0, pct = 0;
      const mkRocks = () => {
        rocks = []; let tries = 0;
        while (rocks.length < nR && tries++ < 200) { const r = g.rf(22, 38), p = { x: g.rf(60, W - 60), y: g.rf(60, H - 60), r }; if (rocks.every(o => Math.hypot(o.x - p.x, o.y - p.y) > o.r + p.r + 50)) rocks.push(p); }
      };
      const smooth = () => {
        sx.fillStyle = "#e8dcc0"; sx.fillRect(0, 0, W, H);
        for (let i = 0; i < 500; i++) { sx.fillStyle = g.rand() < .5 ? "rgba(180,160,120,.25)" : "rgba(255,255,255,.35)"; sx.fillRect(g.rf(0, W), g.rf(0, H), 2, 2); }
        sx.strokeStyle = "#cdbf9c"; sx.lineWidth = 3;
        rocks.forEach(r => { for (let k = 1; k <= 3; k++) { circ(sx, r.x, r.y, r.r + k * 10); sx.stroke(); } });
        vis.fill(0); reach = 0;
        for (let j = 0; j < CH; j++) for (let i = 0; i < CW; i++) { const cx = (i + .5) * W / CW, cy = (j + .5) * H / CH; if (rocks.every(r => Math.hypot(r.x - cx, r.y - cy) > r.r + 12)) reach++; }
      };
      mkRocks(); smooth();
      const tb = bar(g, [{ id: "smooth", label: "Smooth sand" }, { id: "rocks", label: "Move rocks" }], id => { if (id === "rocks") mkRocks(); smooth(); g.sfx("swish"); }, "So peaceful.");
      const blocked = (px, py, m) => rocks.some(r => Math.hypot(r.x - px, r.y - py) < r.r + m);
      const mark = (px, py) => {
        const i = Math.floor(px / (W / CW)), j = Math.floor(py / (H / CH)); if (i < 0 || j < 0 || i >= CW || j >= CH) return;
        if (!vis[j * CW + i] && !blocked((i + .5) * W / CW, (j + .5) * H / CH, 12)) { vis[j * CW + i] = 1; }
      };
      const rake = (a, b) => {
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy); if (d < 2) return false;
        const nx = -dy / d, ny = dx / d; sx.lineCap = "round";
        for (let i = 0; i < T; i++) {
          const o = (i - (T - 1) / 2) * SP, x1 = a.x + nx * o, y1 = a.y + ny * o, x2 = b.x + nx * o, y2 = b.y + ny * o;
          if (blocked(x2, y2, 4)) continue;
          sx.strokeStyle = "#b9a885"; sx.lineWidth = 3.5; sx.beginPath(); sx.moveTo(x1, y1); sx.lineTo(x2, y2); sx.stroke();
          sx.strokeStyle = "#f8f0dc"; sx.lineWidth = 1.5; sx.beginPath(); sx.moveTo(x1 + 2, y1 + 2); sx.lineTo(x2 + 2, y2 + 2); sx.stroke();
        }
        for (let o = -(T - 1) / 2 * SP; o <= (T - 1) / 2 * SP; o += 8) mark(b.x + nx * o, b.y + ny * o);
        return true;
      };
      g.on(c, "pointerdown", e => { down = true; last = pos(e); hov = last; });
      g.on(window, "pointermove", e => { const p = pos(e); hov = p; if (down && last) { if (Math.hypot(p.x - last.x, p.y - last.y) > 3) { if (!blocked(p.x, p.y, 12) && rake(last, p) && snd <= 0) { g.sfx("swish"); snd = .25; } last = p; } } });
      g.on(window, "pointerup", () => { down = false; last = null; });
      g.loop(dt => {
        snd -= dt; let n = 0; for (let i = 0; i < vis.length; i++) n += vis[i]; pct = Math.min(100, Math.round(n / Math.max(1, reach) * 100));
        g.score(pct); g.status("Raked: " + pct + "% (goal " + goal + "%)");
        if (pct >= goal) { g.win("A perfect zen garden!"); return false; }
        x.drawImage(sand, 0, 0, W, H);
        rocks.forEach(r => {
          x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(r.x + 6, r.y + r.r * .7, r.r * 1.1, r.r * .5, 0, 0, 7); x.fill();
          const rg = x.createRadialGradient(r.x - r.r * .3, r.y - r.r * .4, 4, r.x, r.y, r.r); rg.addColorStop(0, "#b4b8be"); rg.addColorStop(1, "#5f6670");
          x.fillStyle = rg; x.beginPath(); x.ellipse(r.x, r.y, r.r, r.r * .85, 0, 0, 7); x.fill();
          x.fillStyle = "rgba(90,160,90,.55)"; x.beginPath(); x.ellipse(r.x + r.r * .2, r.y - r.r * .5, r.r * .4, r.r * .18, 0, 0, 7); x.fill();
        });
        if (hov) { x.fillStyle = "rgba(90,70,40,.5)"; for (let i = 0; i < T; i++) { const o = (i - (T - 1) / 2) * SP; circ(x, hov.x + o, hov.y, 3); x.fill(); } }
        x.strokeStyle = "#8a5a2b"; x.lineWidth = 10; x.strokeRect(0, 0, W, H);
      });
    }
  });

  // ---- 9. Pop It Board ----
  B.add({
    id: "s9-popit", name: "Pop-It Board", ages: [5, 12], cat: "Cozy", color: "#6be28f", icon: "O",
    desc: "Push the colourful bubbles in with a satisfying pop. Pop them all to flip the board!", controls: "Tap or drag across the bubbles. Tap a popped one to push it back out.",
    start(g) {
      const N = g.by(4, 6, 8), { c, x, W, H, pos } = g.canvas(600, 600), M = 30, cell = (W - M * 2) / N, unpopRate = g.by(0, .5, 1);
      const pads = []; for (let i = 0; i < N * N; i++) pads.push({ p: 0, a: 0 });
      let hueOff = g.ri(0, 360), flipT = -1, flipped = false, paintVal = null, un = 0;
      const padAt = p => { const i = Math.floor((p.x - M) / cell), j = Math.floor((p.y - M) / cell); return i >= 0 && j >= 0 && i < N && j < N ? pads[j * N + i] : null; };
      const setPad = (pd, v) => {
        if (!pd || pd.p === v || flipT >= 0) return; pd.p = v;
        if (v) { g.add(1); g.sfx("pop"); if (pads.every(q => q.p)) { g.add(N); g.sfx("cheer"); flipT = 0; flipped = false; } } else g.sfx("flip");
      };
      bar(g, [], () => { }, "So satisfying!");
      g.on(c, "pointerdown", e => { const pd = padAt(pos(e)); if (!pd) return; paintVal = pd.p ? 0 : 1; setPad(pd, paintVal); });
      g.on(window, "pointermove", e => { if (paintVal !== null) setPad(padAt(pos(e)), paintVal); });
      g.on(window, "pointerup", () => { paintVal = null; });
      g.loop(dt => {
        if (unpopRate > 0 && flipT < 0) { un += dt * unpopRate; if (un >= 1) { un = 0; const pp = pads.filter(q => q.p); if (pp.length && pp.length < pads.length) setPad(g.pick(pp), 0); } }
        let sxs = 1;
        if (flipT >= 0) { flipT += dt / .9; sxs = Math.max(.02, Math.abs(Math.cos(flipT * Math.PI))); if (flipT >= .5 && !flipped) { flipped = true; pads.forEach(q => { q.p = 0; q.a = 0; }); hueOff = (hueOff + 70) % 360; } if (flipT >= 1) flipT = -1; }
        g.status("Board: " + N + " x " + N);
        x.fillStyle = "#2a2a44"; x.fillRect(0, 0, W, H);
        x.save(); x.translate(W / 2, H / 2); x.scale(sxs, 1); x.translate(-W / 2, -H / 2);
        x.fillStyle = `hsl(${hueOff},60%,82%)`; x.beginPath(); x.roundRect(8, 8, W - 16, H - 16, 40); x.fill();
        x.strokeStyle = "rgba(0,0,0,.12)"; x.lineWidth = 6; x.stroke();
        for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
          const pd = pads[j * N + i]; pd.a += (pd.p - pd.a) * Math.min(1, dt * 18);
          const cx = M + i * cell + cell / 2, cy = M + j * cell + cell / 2, r = cell * .42 * (1 - .08 * Math.sin(pd.a * Math.PI)), h = (hueOff + 180 + (i + j) * 360 / (N * 2)) % 360;
          const up = pd.a < .5;
          const rg = up ? x.createRadialGradient(cx - r * .35, cy - r * .35, r * .1, cx, cy, r) : x.createRadialGradient(cx + r * .3, cy + r * .3, r * .1, cx, cy, r);
          rg.addColorStop(0, up ? `hsl(${h},90%,78%)` : `hsl(${h},60%,35%)`); rg.addColorStop(1, up ? `hsl(${h},80%,50%)` : `hsl(${h},70%,58%)`);
          x.fillStyle = "rgba(0,0,0,.18)"; circ(x, cx + (up ? 3 : 0), cy + (up ? 4 : 0), r + 3); x.fill();
          x.fillStyle = rg; circ(x, cx, cy, up ? r : r * .94); x.fill();
          if (up) { x.fillStyle = "rgba(255,255,255,.55)"; circ(x, cx - r * .38, cy - r * .4, r * .16); x.fill(); }
        }
        x.restore();
      });
    }
  });

  // ---- 10. Planet Builder: gravity toy ----
  B.add({
    id: "s9-planets", name: "Planet Builder", ages: [8, 20], cat: "Creative", color: "#8a6bff", icon: "G",
    desc: "Throw planets so they swing round the sun. Every full orbit scores.", controls: "Drag on the sky and let go to throw a planet. Choose the planet size below.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const SX = 320, SY = 200, SR = 24, GM = g.by(650000, 850000, 1050000), pre = g.by(70, 35, 0), MS = { s: 1, m: 3, l: 8 };
      let size = "m", drag = null, flare = 0, orbits = 0; const pl = [];
      const stars = []; for (let i = 0; i < 80; i++) stars.push({ x: g.rf(0, W), y: g.rf(0, H), p: g.rf(0, 6) });
      const rad = m => 4 + Math.sqrt(m) * 3.5;
      const tb = bar(g, [{ id: "s", label: "Small" }, { id: "m", label: "Medium" }, { id: "l", label: "Big" }, { id: "clear", label: "Clear sky" }], id => { if (id === "clear") { pl.length = 0; g.sfx("swish"); return; } size = id; tb.sel(id); g.sfx("click"); }, "A beautiful solar system!");
      tb.sel(size);
      g.on(c, "pointerdown", e => { const p = pos(e); drag = { sx: p.x, sy: p.y, cx: p.x, cy: p.y }; });
      g.on(window, "pointermove", e => { if (drag) { const p = pos(e); drag.cx = p.x; drag.cy = p.y; } });
      g.on(window, "pointerup", () => {
        if (!drag) return; const d = drag; drag = null;
        const vx = g.clamp((d.cx - d.sx) * 1.8, -240, 240), vy = g.clamp((d.cy - d.sy) * 1.8, -240, 240);
        if (Math.hypot(d.cx - d.sx, d.cy - d.sy) < 6 || Math.hypot(d.sx - SX, d.sy - SY) < SR + 8) { g.sfx("wrong"); return; }
        if (pl.length >= 10) pl.shift();
        pl.push({ x: d.sx, y: d.sy, vx, vy, m: MS[size], h: g.ri(0, 360), acc: 0, prev: Math.atan2(d.sy - SY, d.sx - SX), tr: [], tt: 0, r: rad(MS[size]) });
        g.sfx("launch");
      });
      const accel = (px, py) => { const dx = SX - px, dy = SY - py, r2 = dx * dx + dy * dy + 100, a = GM / (r2 * Math.sqrt(r2)); return [a * dx, a * dy]; };
      g.loop((dt, t) => {
        flare = Math.max(0, flare - dt);
        for (let s = 0; s < 4; s++) {
          const h = dt / 4;
          for (const p of pl) { const a = accel(p.x, p.y); p.vx += a[0] * h; p.vy += a[1] * h; p.x += p.vx * h; p.y += p.vy * h; }
        }
        for (let i = pl.length - 1; i >= 0; i--) {
          const p = pl[i], d = Math.hypot(p.x - SX, p.y - SY);
          if (d < SR + p.r * .4) { pl.splice(i, 1); flare = .6; g.sfx("fizz"); continue; }
          if (d > 560) { pl.splice(i, 1); g.sfx("swish"); continue; }
          const ang = Math.atan2(p.y - SY, p.x - SX); let da = ang - p.prev; if (da > Math.PI) da -= 6.283; if (da < -Math.PI) da += 6.283; p.prev = ang; p.acc += da;
          if (Math.abs(p.acc) >= 6.283) { p.acc -= Math.sign(p.acc) * 6.283; orbits++; g.add(1); g.sfx("note", 330 + Math.min(8, orbits % 9) * 55); g.pop("+1", ...cp(c, W, H, p)); }
          p.tt -= dt; if (p.tt <= 0) { p.tt = .05; p.tr.push({ x: p.x, y: p.y }); if (p.tr.length > 45) p.tr.shift(); }
        }
        for (let i = 0; i < pl.length; i++) for (let j = i + 1; j < pl.length; j++) {
          const a = pl[i], b = pl[j];
          if (Math.hypot(a.x - b.x, a.y - b.y) < a.r + b.r) { const m = a.m + b.m; a.vx = (a.vx * a.m + b.vx * b.m) / m; a.vy = (a.vy * a.m + b.vy * b.m) / m; a.x = (a.x * a.m + b.x * b.m) / m; a.y = (a.y * a.m + b.y * b.m) / m; if (b.m > a.m) a.h = b.h; a.m = m; a.r = rad(m); pl.splice(j, 1); j--; g.add(2); g.sfx("thump"); }
        }
        g.status("Planets: " + pl.length + "  Orbits: " + orbits);
        const gr = x.createRadialGradient(SX, SY, 10, SX, SY, 420); gr.addColorStop(0, "#1b1650"); gr.addColorStop(1, "#05061a"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        stars.forEach(s => { x.globalAlpha = .4 + .4 * Math.sin(t + s.p); x.fillStyle = "#fff"; x.fillRect(s.x, s.y, 2, 2); }); x.globalAlpha = 1;
        const sg = x.createRadialGradient(SX, SY, 4, SX, SY, SR * (3 + flare * 2)); sg.addColorStop(0, "rgba(255,220,120,.9)"); sg.addColorStop(1, "rgba(255,160,40,0)"); x.fillStyle = sg; circ(x, SX, SY, SR * (3 + flare * 2)); x.fill();
        x.fillStyle = "#ffd34e"; circ(x, SX, SY, SR + Math.sin(t * 3) * 1.5); x.fill(); x.fillStyle = "#fff2b0"; circ(x, SX - 6, SY - 6, SR * .5); x.fill();
        for (const p of pl) {
          x.strokeStyle = `hsla(${p.h},80%,70%,.5)`; x.lineWidth = 2; x.beginPath(); p.tr.forEach((q, k) => k ? x.lineTo(q.x, q.y) : x.moveTo(q.x, q.y)); x.stroke();
          const pg = x.createRadialGradient(p.x - p.r * .3, p.y - p.r * .3, 1, p.x, p.y, p.r); pg.addColorStop(0, `hsl(${p.h},85%,78%)`); pg.addColorStop(1, `hsl(${p.h},70%,40%)`); x.fillStyle = pg; circ(x, p.x, p.y, p.r); x.fill();
          if (p.m >= 8) { x.strokeStyle = `hsla(${p.h},60%,80%,.7)`; x.lineWidth = 2; x.beginPath(); x.ellipse(p.x, p.y, p.r * 1.7, p.r * .45, -.4, 0, 7); x.stroke(); }
        }
        if (drag) {
          const vx = g.clamp((drag.cx - drag.sx) * 1.8, -240, 240), vy = g.clamp((drag.cy - drag.sy) * 1.8, -240, 240);
          x.strokeStyle = "#fff"; x.lineWidth = 2; x.beginPath(); x.moveTo(drag.sx, drag.sy); x.lineTo(drag.cx, drag.cy); x.stroke();
          x.fillStyle = "#fff"; circ(x, drag.sx, drag.sy, rad(MS[size])); x.fill();
          if (pre > 0) {
            let px = drag.sx, py = drag.sy, qx = vx, qy = vy; x.fillStyle = "rgba(255,255,255,.55)";
            for (let s = 0; s < pre; s++) { for (let k = 0; k < 4; k++) { const a = accel(px, py), h = 1 / 120; qx += a[0] * h; qy += a[1] * h; px += qx * h; py += qy * h; } if (s % 3 === 0) { circ(x, px, py, 1.8); x.fill(); } }
          }
        }
        if (!pl.length && !drag) { x.fillStyle = "rgba(255,255,255,.85)"; x.font = "bold 20px system-ui, sans-serif"; x.textAlign = "center"; x.fillText("Drag and let go to throw a planet", W / 2, 60); x.textAlign = "left"; }
      });
    }
  });

  // ---- 11. Cosy Cafe Rush ----
  B.add({
    id: "s9-cafe", name: "Cosy Cafe Rush", ages: [6, 16], cat: "Cozy", color: "#ffb347", icon: "K",
    desc: "Mix coloured drinks to match each customer's order before they leave.", controls: "Tap the jugs to fill the cup in the order shown, then tap the customer (or the cup). Keys 1-4 add, Enter serves.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const DR = ["#ff4d8d", "#4cc3ff", "#ffd34e", "#4be39a"], JX = [70, 160, 250, 340], CX = [80, 240, 400, 560];
      let cust = [null, null, null, null], cup = [], lives = 5, served = 0, spawn = 1, shake = 0, tt = 0; const parts = [];
      g.status("Lives: " + lives);
      const mark = (i, px, py, s) => {
        x.fillStyle = "rgba(255,255,255,.9)"; x.beginPath();
        if (i === 0) x.arc(px, py, s * .6, 0, 7);
        else if (i === 1) x.rect(px - s * .55, py - s * .55, s * 1.1, s * 1.1);
        else if (i === 2) { x.moveTo(px, py - s * .7); x.lineTo(px + s * .7, py + s * .55); x.lineTo(px - s * .7, py + s * .55); x.closePath(); }
        else { x.moveTo(px, py - s * .75); x.lineTo(px + s * .6, py); x.lineTo(px, py + s * .75); x.lineTo(px - s * .6, py); x.closePath(); }
        x.fill();
      };
      const drawCup = (cx, cy, w, h, lay) => {
        x.fillStyle = "rgba(255,255,255,.7)"; x.beginPath(); x.moveTo(cx - w / 2, cy - h / 2); x.lineTo(cx + w / 2, cy - h / 2); x.lineTo(cx + w * .38, cy + h / 2); x.lineTo(cx - w * .38, cy + h / 2); x.closePath(); x.fill();
        const lh = h / 3; lay.forEach((l, k) => { x.fillStyle = DR[l]; x.fillRect(cx - w * .38 + 2, cy + h / 2 - lh * (k + 1) + 1, w * .76 - 4, lh - 2); mark(l, cx, cy + h / 2 - lh * (k + .5), lh * .28); });
        x.strokeStyle = "#7a5a3a"; x.lineWidth = 3; x.beginPath(); x.moveTo(cx - w / 2, cy - h / 2); x.lineTo(cx - w * .38, cy + h / 2); x.lineTo(cx + w * .38, cy + h / 2); x.lineTo(cx + w / 2, cy - h / 2); x.stroke();
      };
      const burst = (px, py, col) => { for (let k = 0; k < 12; k++) parts.push({ x: px, y: py, vx: g.rf(-120, 120), vy: g.rf(-160, -20), life: .7, col }); };
      const add = i => { if (cup.length >= 3) { g.sfx("wrong"); return; } cup.push(i); g.sfx("note", 330 + i * 110); };
      const serve = i => {
        const cu = cust[i]; if (!cu || !cup.length) { g.sfx("wrong"); return; }
        if (cu.order.join() === cup.join()) {
          const tip = Math.ceil(10 * cu.pat / cu.max); g.add(10 + tip); g.sfx("cheer"); g.pop("+" + (10 + tip), CX[i] * c.clientWidth / W, 120 * c.clientHeight / H, "#2e7d32");
          burst(CX[i], 150, "#ffd34e"); cust[i] = null; served++; cup = [];
        } else { g.sfx("wrong"); cu.pat -= 4; shake = .3; cup = []; }
      };
      const serveAny = () => {
        let b = -1; cust.forEach((cu, i) => { if (cu && cup.length && cu.order.join() === cup.join() && (b < 0 || cu.pat < cust[b].pat)) b = i; });
        if (b >= 0) serve(b); else { g.sfx("wrong"); cup = []; }
      };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        for (let i = 0; i < 4; i++) if (cust[i] && Math.abs(p.x - CX[i]) < 70 && p.y > 20 && p.y < 210) { serve(i); return; }
        for (let i = 0; i < 4; i++) if (Math.hypot(p.x - JX[i], p.y - 310) < 42) { add(i); return; }
        if (Math.hypot(p.x - 490, p.y - 310) < 55) { serveAny(); return; }
        if (p.x > 560 && p.y > 270) { cup = []; g.sfx("click"); }
      });
      g.on(window, "keydown", e => {
        const i = "1234".indexOf(e.key); if (i >= 0) add(i); else if (e.key === "Enter") serveAny(); else if (e.key === "Backspace") cup = [];
      });
      g.loop((dt, t) => {
        tt = t; shake = Math.max(0, shake - dt); spawn -= dt;
        if (spawn <= 0) {
          spawn = Math.max(1.6, g.by(5, 4, 3) - served * .08) * g.rf(.8, 1.2);
          const free = [0, 1, 2, 3].filter(i => !cust[i]);
          if (free.length) {
            const L = Math.min(3, (served < 3 ? 1 : served < 10 ? 2 : 3) + (g.diff === 2 ? 1 : 0)), n = g.ri(Math.max(1, L - 1), L), order = []; for (let k = 0; k < n; k++) order.push(g.ri(0, 3));
            const max = Math.max(9, g.by(30, 24, 18) - served * .3) * (1 + .3 * (n - 1));
            cust[g.pick(free)] = { order, pat: max, max, enter: 0, h: g.ri(0, 360), shape: g.ri(0, 2) };
          }
        }
        for (let i = 0; i < 4; i++) {
          const cu = cust[i]; if (!cu) continue; cu.enter = Math.min(1, cu.enter + dt * 2.5); cu.pat -= dt;
          if (cu.pat <= 0) { cust[i] = null; lives--; g.status("Lives: " + lives); g.sfx("sad"); shake = .4; if (lives <= 0) { g.over("The cafe closed for the day. You served " + served + "!"); return false; } }
        }
        x.save(); if (shake > 0) x.translate(g.rf(-4, 4) * shake * 3, g.rf(-4, 4) * shake * 3);
        x.fillStyle = "#ffe9d2"; x.fillRect(-10, -10, W + 20, H + 20); x.fillStyle = "#ffd9b5"; for (let i = 0; i < 12; i++) x.fillRect(i * 60, 0, 30, 220);
        x.fillStyle = "#b9824f"; x.fillRect(-10, 210, W + 20, 26); x.fillStyle = "#8c5a2e"; x.fillRect(-10, 236, W + 20, H);
        for (let i = 0; i < 4; i++) {
          const cu = cust[i]; if (!cu) continue; const oy = (1 - cu.enter) * -120, cx = CX[i], r = cu.pat / cu.max;
          x.save(); x.translate(cx, oy);
          x.fillStyle = `hsl(${cu.h},65%,62%)`; x.beginPath(); if (cu.shape === 0) x.ellipse(cx - cx, 175, 45, 40, 0, 0, 7); else if (cu.shape === 1) x.roundRect(-42, 140, 84, 70, 14); else { x.moveTo(0, 130); x.lineTo(46, 208); x.lineTo(-46, 208); x.closePath(); } x.fill();
          x.fillStyle = "#ffe0c2"; circ(x, 0, 118, 28); x.fill();
          x.fillStyle = "#222"; circ(x, -10, 114, 3.5); x.fill(); circ(x, 10, 114, 3.5); x.fill(); x.strokeStyle = "#222"; x.lineWidth = 3; x.lineCap = "round"; x.beginPath();
          if (r > .5) x.arc(0, 122, 9, .2, Math.PI - .2); else if (r > .25) { x.moveTo(-8, 130); x.lineTo(8, 130); } else x.arc(0, 135, 9, Math.PI + .3, -.3); x.stroke();
          x.restore();
          x.fillStyle = "rgba(255,255,255,.95)"; x.beginPath(); x.roundRect(cx - 38, 8 + oy, 76, 76, 14); x.fill(); drawCup(cx, 46 + oy, 36, 48, cu.order);
          x.fillStyle = "rgba(0,0,0,.2)"; x.fillRect(cx - 40, 214, 80, 8); x.fillStyle = r > .5 ? "#4be39a" : r > .25 ? "#ffd34e" : "#ff4d6d"; x.fillRect(cx - 40, 214, 80 * r, 8);
        }
        DR.forEach((col, i) => { x.fillStyle = "rgba(0,0,0,.18)"; x.beginPath(); x.ellipse(JX[i], 348, 36, 8, 0, 0, 7); x.fill(); const jg = x.createRadialGradient(JX[i] - 10, 296, 4, JX[i], 310, 40); jg.addColorStop(0, "#fff"); jg.addColorStop(.25, col); jg.addColorStop(1, col); x.fillStyle = jg; circ(x, JX[i], 310, 38); x.fill(); mark(i, JX[i], 310, 16); x.fillStyle = "#fff"; x.font = "bold 14px system-ui, sans-serif"; x.textAlign = "center"; x.fillText(String(i + 1), JX[i], 366); x.textAlign = "left"; });
        x.fillStyle = "rgba(255,255,255,.25)"; circ(x, 490, 310, 56); x.fill(); drawCup(490, 310, 56, 76, cup);
        x.fillStyle = "#fff"; x.font = "bold 14px system-ui, sans-serif"; x.textAlign = "center"; x.fillText("Serve", 490, 366); x.textAlign = "left";
        x.fillStyle = "#6b7280"; x.beginPath(); x.roundRect(582, 296, 40, 50, 6); x.fill(); x.fillStyle = "#fff"; x.fillRect(588, 306, 28, 4); x.fillStyle = "#fff"; x.font = "bold 12px system-ui, sans-serif"; x.fillText("Bin", 592, 366);
        for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.vy += 400 * dt; p.x += p.vx * dt; p.y += p.vy * dt; x.fillStyle = p.col; x.fillRect(p.x, p.y, 6, 6); }
        x.restore();
      });
    }
  });

  // ---- 12. Slime Squish: stretchy slime with bubbles to pop ----
  B.add({
    id: "s9-slime", name: "Slime Squish", ages: [5, 12], cat: "Cozy", color: "#9be86b", icon: "L",
    desc: "Stretch and squish a wobbly slime and pop the bubbles inside.", controls: "Drag the slime to stretch it. Tap the bubbles to pop them.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400);
      const N = 32, CX = 320, CY = 215, R = 115, kR = g.by(40, 60, 90), bR = g.by(24, 17, 12), bInt = g.by(.8, .6, .45), bCap = g.by(6, 8, 10);
      const pts = []; for (let i = 0; i < N; i++) { const a = i / N * 6.283; pts.push({ x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * R, vx: 0, vy: 0, rx: CX + Math.cos(a) * R, ry: CY + Math.sin(a) * R }); }
      const bub = []; const COLS = [[110, 70], [330, 80], [195, 80], [275, 70]]; let ci = 0, grab = null, bt = 0; const parts = [];
      bar(g, [{ id: "col", label: "Colour" }], () => { ci = (ci + 1) % COLS.length; g.sfx("pick"); }, "So squishy!");
      const cen = () => { let sx = 0, sy = 0; pts.forEach(p => { sx += p.x; sy += p.y; }); return { x: sx / N, y: sy / N }; };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        for (let i = bub.length - 1; i >= 0; i--) { const b = bub[i]; if (Math.hypot(b.x - p.x, b.y - p.y) < b.r + 8) { bub.splice(i, 1); g.add(1); g.sfx("pop"); g.pop("+1", ...cp(c, W, H, p)); for (let k = 0; k < 8; k++) parts.push({ x: b.x, y: b.y, vx: g.rf(-90, 90), vy: g.rf(-90, 90), life: .4 }); return; } }
        const m = cen(); if (Math.hypot(p.x - m.x, p.y - m.y) < R * 1.2) {
          let bi = 0, bd = 1e9; pts.forEach((q, i) => { const d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; bi = i; } });
          grab = { i: bi, sx: p.x, sy: p.y, ox: 0, oy: 0, dist: 0 }; g.sfx("click");
        }
      });
      g.on(window, "pointermove", e => { if (grab) { const p = pos(e); grab.ox = p.x - grab.sx; grab.oy = p.y - grab.sy; grab.dist = Math.max(grab.dist, Math.hypot(grab.ox, grab.oy)); } });
      g.on(window, "pointerup", () => { if (grab) { if (grab.dist > 70) { g.add(1); g.sfx("swish"); } grab = null; } });
      g.loop((dt, t) => {
        bt -= dt;
        if (bt <= 0 && bub.length < bCap) { bt = bInt * g.rf(.8, 1.4); const a = g.rf(0, 6.283), d = g.rf(0, R * .5), m = cen(); bub.push({ x: m.x + Math.cos(a) * d, y: m.y + Math.sin(a) * d, r: bR * g.rf(.7, 1.2), ph: g.rf(0, 6) }); }
        const m = cen();
        for (let i = bub.length - 1; i >= 0; i--) { const b = bub[i]; b.y -= 12 * dt; b.x += Math.sin(t * 1.5 + b.ph) * 10 * dt; if (Math.hypot(b.x - m.x, b.y - m.y) > R * .85) bub.splice(i, 1); }
        for (let s = 0; s < 2; s++) {
          const h = dt / 2;
          for (let i = 0; i < N; i++) {
            const p = pts[i], a = pts[(i + N - 1) % N], b = pts[(i + 1) % N];
            let fx = (a.x + b.x - 2 * p.x) * 160 + (p.rx - p.x) * kR, fy = (a.y + b.y - 2 * p.y) * 160 + (p.ry - p.y) * kR;
            if (grab) { let d = Math.abs(i - grab.i); d = Math.min(d, N - d); if (d < 7) { const w = (1 - d / 7); fx += (p.rx + grab.ox * w - p.x) * 140 * w; fy += (p.ry + grab.oy * w - p.y) * 140 * w; } }
            p.vx = (p.vx + fx * h) * (1 - h * 4); p.vy = (p.vy + fy * h) * (1 - h * 4);
          }
          pts.forEach(p => { p.x += p.vx * h; p.y += p.vy * h; });
        }
        g.status("Bubbles: " + bub.length);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#d9f0ff"); gr.addColorStop(1, "#b9d7f5"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "rgba(0,0,0,.12)"; x.beginPath(); x.ellipse(m.x, CY + R + 14, R * 1.05, 16, 0, 0, 7); x.fill();
        const hu = COLS[ci][0], sa = COLS[ci][1];
        const path = () => { x.beginPath(); const l = pts[N - 1], f = pts[0]; x.moveTo((l.x + f.x) / 2, (l.y + f.y) / 2); for (let i = 0; i < N; i++) { const p = pts[i], q = pts[(i + 1) % N]; x.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2); } x.closePath(); };
        path(); const sg = x.createRadialGradient(m.x - 35, m.y - 45, 10, m.x, m.y, R * 1.2); sg.addColorStop(0, `hsl(${hu},${sa}%,75%)`); sg.addColorStop(1, `hsl(${hu},${sa}%,48%)`); x.fillStyle = sg; x.fill(); x.strokeStyle = `hsl(${hu},${sa}%,38%)`; x.lineWidth = 4; x.stroke();
        x.fillStyle = "rgba(255,255,255,.4)"; x.beginPath(); x.ellipse(m.x - 45, m.y - 55, 30, 14, -.6, 0, 7); x.fill();
        x.strokeStyle = "rgba(255,255,255,.8)"; x.lineWidth = 2;
        bub.forEach(b => { x.fillStyle = "rgba(255,255,255,.3)"; circ(x, b.x, b.y, b.r); x.fill(); x.stroke(); x.fillStyle = "rgba(255,255,255,.8)"; circ(x, b.x - b.r * .3, b.y - b.r * .3, b.r * .2); x.fill(); });
        x.fillStyle = "#2a2140"; circ(x, m.x - 28, m.y + 8, 7); x.fill(); circ(x, m.x + 28, m.y + 8, 7); x.fill(); x.strokeStyle = "#2a2140"; x.lineWidth = 4; x.lineCap = "round"; x.beginPath(); x.arc(m.x, m.y + 18, 14, .2, Math.PI - .2); x.stroke();
        for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; x.strokeStyle = "rgba(255,255,255,.9)"; x.lineWidth = 2; circ(x, p.x, p.y, 3); x.stroke(); }
        if (grab) { x.fillStyle = "rgba(255,255,255,.7)"; x.font = "bold 16px system-ui, sans-serif"; x.fillText("Stretch!", 16, 30); }
      });
    }
  });
})();
