// Break Time Games: set 8 (Action: cartoon, blood-free battles with robots, slimes, aliens and silly bosses)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---------- shared helpers for this set ----------
  const TAU = Math.PI * 2;
  const T = (x, s, px, py, size, col, al) => { x.font = "bold " + size + "px system-ui, sans-serif"; x.textAlign = al || "center"; x.textBaseline = "middle"; x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  const dot = (x, px, py, r, col) => { x.fillStyle = col; x.beginPath(); x.arc(px, py, Math.max(0.1, r), 0, TAU); x.fill(); };
  const near = (arr, px, py, ok) => { let b = null, bd = 1e9; for (const o of arr) { if (ok && !ok(o)) continue; const d = (o.x - px) * (o.x - px) + (o.y - py) * (o.y - py); if (d < bd) { bd = d; b = o; } } return b; };
  const adiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
  const bar = (x, px, py, w, h, f, col) => { x.fillStyle = "rgba(0,0,0,.6)"; x.fillRect(px, py, w, h); x.fillStyle = col; x.fillRect(px, py, w * Math.max(0, Math.min(1, f)), h); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 1; x.strokeRect(px, py, w, h); };
  const POP = (g, c, W, H, s, vx, vy, col) => g.pop(s, vx * c.clientWidth / W, vy * c.clientHeight / H, col);
  const pre = (W, H, fn) => { const cv = document.createElement("canvas"); cv.width = W; cv.height = H; fn(cv.getContext("2d")); return cv; };
  const pushOut = (o, r, walls) => { for (const w of walls) { const cx = Math.max(w.x, Math.min(o.x, w.x + w.w)), cy = Math.max(w.y, Math.min(o.y, w.y + w.h)); let dx = o.x - cx, dy = o.y - cy, d = Math.hypot(dx, dy); if (d < r) { if (d < .001) { dx = 0; dy = -1; d = 1; } const k = (r - d) / d; o.x += dx * k; o.y += dy * k; } } };
  // particles + screen shake: F.begin(dt) ... draw world ... F.end(dt)
  const FX = (g, x) => {
    const ps = []; let sh = 0;
    return {
      burst(px, py, col, n, sp) { sp = sp || 150; for (let i = 0; i < (n || 10) && ps.length < 360; i++) { const a = g.rf(0, TAU), s = g.rf(.3, 1) * sp; ps.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: g.rf(.3, .7), col, r: g.rf(2, 4.5) }); } },
      shake(v) { sh = Math.max(sh, v); },
      begin(dt) { sh = Math.max(0, sh - dt * 40); x.save(); if (sh > 0) x.translate(g.rf(-sh, sh), g.rf(-sh, sh)); },
      end(dt) {
        for (let i = ps.length - 1; i >= 0; i--) { const p = ps[i]; p.life -= dt; if (p.life <= 0) { ps.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .96; p.vy *= .96; x.globalAlpha = Math.min(1, p.life * 2.5); dot(x, p.x, p.y, p.r, p.col); }
        x.globalAlpha = 1; x.restore();
      }
    };
  };
  // pointer + keyboard input: I.dir(px,py) gives a move vector; I.mouse = a real mouse is in use; I.tx/ty = touch target
  const IN = (g, c, pos) => {
    const s = { mx: 320, my: 200, mouse: false, down: false, tx: null, ty: null, touch: false };
    g.on(c, "pointermove", e => { const p = pos(e); if (e.pointerType === "mouse") { s.mouse = true; s.mx = p.x; s.my = p.y; } else if (s.tx !== null) { s.tx = p.x; s.ty = p.y; } });
    g.on(c, "pointerdown", e => { const p = pos(e); s.down = true; if (e.pointerType === "mouse") { s.mouse = true; s.mx = p.x; s.my = p.y; } else { s.touch = true; s.tx = p.x; s.ty = p.y; } });
    const up = () => { s.down = false; s.tx = null; s.ty = null; };
    g.on(c, "pointerup", up); g.on(c, "pointercancel", up); g.on(c, "pointerleave", up);
    s.dir = (px, py) => {
      let dx = (g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0), dy = (g.keys.ArrowDown ? 1 : 0) - (g.keys.ArrowUp ? 1 : 0);
      if (!dx && !dy && s.tx !== null) { const ex = s.tx - px, ey = s.ty - py, d = Math.hypot(ex, ey); if (d > 10) { dx = ex / d; dy = ey / d; } }
      const m = Math.hypot(dx, dy); return m > 1 ? { x: dx / m, y: dy / m } : { x: dx, y: dy };
    };
    return s;
  };
  // "pick a power-up" cards drawn on the canvas between waves. U.show(pool, title, afterFn); call U.draw(dt) last each frame.
  const UPG = (g, c, x, W, H, pos) => {
    let list = null, cool = 0, rects = [], ttl = "", after = null;
    const choose = i => { if (!list || !list[i]) return; const u = list[i]; list = null; cool = .4; g.sfx("star"); u.f(); if (after) after(); };
    g.on(c, "pointerdown", e => { if (!list) return; const p = pos(e); rects.forEach((r, i) => { if (list && p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h) choose(i); }); });
    g.on(window, "keydown", e => { if (list && e.key >= "1" && e.key <= "3") choose(+e.key - 1); });
    return {
      open() { return !!list; }, busy() { return !!list || cool > 0; },
      show(pool, title, fn) { list = g.shuffle(pool).slice(0, 3); rects = []; ttl = title || "Pick a power-up"; after = fn || null; cool = 0; g.sfx("cheer"); },
      draw(dt) {
        cool = Math.max(0, cool - dt); if (!list) return;
        x.fillStyle = "rgba(5,10,30,.8)"; x.fillRect(0, 0, W, H); T(x, ttl, W / 2, H * .15, W < 500 ? 20 : 24, "#ffd34e");
        const n = list.length, cw = Math.min(190, (W - 40) / n - 12), sm = cw < 140, sx = (W - (n * cw + (n - 1) * 12)) / 2, y = H * .25, h = H * .52;
        list.forEach((u, i) => {
          const rx = sx + i * (cw + 12); rects[i] = { x: rx, y, w: cw, h };
          x.fillStyle = "#26356b"; x.beginPath(); x.roundRect(rx, y, cw, h, 14); x.fill(); x.strokeStyle = "#ffd34e"; x.lineWidth = 3; x.stroke();
          T(x, "" + (i + 1), rx + 14, y + 16, 15, "#9fb4ff"); T(x, u.n, rx + cw / 2, y + h * .28, sm ? 15 : 19, "#fff");
          u.d.split("|").forEach((s, k) => T(x, s, rx + cw / 2, y + h * .48 + k * (sm ? 17 : 20), sm ? 12 : 14, "#cfe0ff"));
          T(x, "Tap to pick", rx + cw / 2, y + h - 18, 13, "#8fe3a8");
        });
      }
    };
  };
  const blob = (x, px, py, r, col, t) => {
    const sq = Math.sin(t * 6) * .08;
    x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(px, py + r * .8, r * .9, r * .3, 0, 0, TAU); x.fill();
    x.fillStyle = col; x.beginPath(); x.ellipse(px, py, r * (1 + sq), r * (.9 - sq), 0, 0, TAU); x.fill();
    x.fillStyle = "rgba(255,255,255,.35)"; x.beginPath(); x.ellipse(px - r * .3, py - r * .45, r * .25, r * .14, -.5, 0, TAU); x.fill();
    dot(x, px - r * .3, py - r * .1, r * .22, "#fff"); dot(x, px + r * .3, py - r * .1, r * .22, "#fff");
    dot(x, px - r * .26, py - r * .08, r * .1, "#123"); dot(x, px + r * .34, py - r * .08, r * .1, "#123");
  };
  const robo = (x, px, py, s, col, t, fl) => {
    x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(px, py + s * .95, s * .8, s * .25, 0, 0, TAU); x.fill();
    x.fillStyle = fl ? "#fff" : col; x.beginPath(); x.roundRect(px - s * .8, py - s * .7 + Math.sin(t * 8) * s * .05, s * 1.6, s * 1.5, s * .3); x.fill();
    x.fillStyle = "#223"; x.beginPath(); x.roundRect(px - s * .55, py - s * .45, s * 1.1, s * .5, s * .2); x.fill();
    dot(x, px - s * .22, py - s * .2, s * .13, "#ff4d4d"); dot(x, px + s * .22, py - s * .2, s * .13, "#ff4d4d");
    x.strokeStyle = fl ? "#fff" : col; x.lineWidth = 2; x.beginPath(); x.moveTo(px, py - s * .7); x.lineTo(px, py - s * 1.1); x.stroke(); dot(x, px, py - s * 1.15, s * .12, "#ffd34e");
  };

  // ---- Slime Splatter: top-down shooter against bouncy slimes ----
  B.add({
    id: "s8-slime-splat", name: "Slime Splatter", ages: [9, 16], cat: "Action", color: "#6be28f", icon: "S",
    desc: "Blast wave after wave of bouncy slimes, then pick a power-up.", controls: "WASD/arrows move, mouse aims (it auto-aims too). Touch: drag to move. Pick a power-up between waves.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos), I = IN(g, c, pos);
      const P = { x: W / 2, y: H / 2, hp: 5, max: 5, sp: 150, rate: .4, cd: 0, multi: 1, dmg: 1, pierce: 0, inv: 0, ang: 0, size: 4 };
      let bul = [], sl = [], hearts = [], wave = 0, left = 0, spT = 0, clear = false;
      const st = () => g.status("Wave " + wave + "/12  Hearts " + P.hp + "/" + P.max);
      const pool = [
        { n: "Rapid fire", d: "Shoots 25% faster", f() { P.rate *= .75; } },
        { n: "Extra bullet", d: "One more bullet|per shot", f() { P.multi++; } },
        { n: "Big bullets", d: "More damage|and bigger", f() { P.dmg += .6; P.size += 1; } },
        { n: "Piercing", d: "Bullets go through|one more slime", f() { P.pierce++; } },
        { n: "Sneakers", d: "Move 20% faster", f() { P.sp *= 1.2; } },
        { n: "Tough skin", d: "+2 hearts|and heal 2", f() { P.max += 2; P.hp = Math.min(P.max, P.hp + 2); } }
      ];
      const next = () => { wave++; left = Math.round(g.by(6, 8, 10) + wave * g.by(2, 2.5, 3)); spT = .6; clear = false; st(); };
      const spawn = () => {
        const s = g.ri(0, 3), big = Math.random() < Math.min(.35, wave * .05); let sx, sy;
        if (s === 0) { sx = -20; sy = g.rf(0, H); } else if (s === 1) { sx = W + 20; sy = g.rf(0, H); } else if (s === 2) { sx = g.rf(0, W); sy = -20; } else { sx = g.rf(0, W); sy = H + 20; }
        sl.push({ x: sx, y: sy, r: big ? 22 : 13, hp: (big ? 4 : 1) + Math.floor(wave / 4), sp: g.rf(.8, 1.2) * g.by(42, 54, 66) * (1 + wave * .03), big, ph: g.rf(0, 6), fl: 0 });
      };
      next();
      g.loop((dt, t) => {
        if (!U.open()) {
          const d = I.dir(P.x, P.y); P.x = g.clamp(P.x + d.x * P.sp * dt, 12, W - 12); P.y = g.clamp(P.y + d.y * P.sp * dt, 12, H - 12);
          P.inv -= dt; P.cd -= dt;
          if (left > 0) { spT -= dt; if (spT <= 0) { spawn(); left--; spT = Math.max(.25, g.by(1, .8, .6) - wave * .04); } }
          const tg = near(sl, P.x, P.y);
          if (I.mouse) P.ang = Math.atan2(I.my - P.y, I.mx - P.x); else if (tg) P.ang = Math.atan2(tg.y - P.y, tg.x - P.x);
          if (P.cd <= 0 && (tg || I.down)) {
            P.cd = P.rate; g.sfx("click");
            for (let i = 0; i < P.multi; i++) { const a = P.ang + (i - (P.multi - 1) / 2) * .16; bul.push({ x: P.x, y: P.y, vx: Math.cos(a) * 380, vy: Math.sin(a) * 380, life: 1.1, pl: P.pierce, hit: [] }); }
          }
          for (let i = bul.length - 1; i >= 0; i--) {
            const b = bul[i]; b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
            let dead = b.life <= 0 || b.x < -10 || b.x > W + 10 || b.y < -10 || b.y > H + 10;
            if (!dead) for (const s of sl) {
              if (b.hit.includes(s) || Math.hypot(s.x - b.x, s.y - b.y) > s.r + P.size) continue;
              b.hit.push(s); s.hp -= P.dmg; s.fl = .1; F.burst(b.x, b.y, "#b6ffcb", 4, 90); g.sfx("pop");
              if (b.pl-- <= 0) { dead = true; break; }
            }
            if (dead) bul.splice(i, 1);
          }
          for (let i = sl.length - 1; i >= 0; i--) {
            const s = sl[i];
            if (s.hp <= 0) {
              sl.splice(i, 1); g.add(s.big ? 5 : 2); g.sfx("splash"); F.burst(s.x, s.y, "#6be28f", s.big ? 18 : 10); POP(g, c, W, H, s.big ? "+5" : "+2", s.x, s.y, "#b6ffcb");
              if (s.big) for (let k = 0; k < 2; k++) sl.push({ x: s.x + g.rf(-10, 10), y: s.y + g.rf(-10, 10), r: 11, hp: 1, sp: s.sp * 1.15, big: false, ph: g.rf(0, 6), fl: 0 });
              if (Math.random() < .1) hearts.push({ x: s.x, y: s.y, life: 8 });
              continue;
            }
            const a = Math.atan2(P.y - s.y, P.x - s.x); s.x += Math.cos(a) * s.sp * dt; s.y += Math.sin(a) * s.sp * dt; s.fl -= dt;
            if (P.inv <= 0 && Math.hypot(P.x - s.x, P.y - s.y) < s.r + 9) {
              P.hp--; P.inv = 1.2; F.shake(8); g.sfx("wrong"); F.burst(P.x, P.y, "#ff9f9f", 12); st();
              if (P.hp <= 0) { g.over("Slimed! You reached wave " + wave); return false; }
            }
          }
          for (let i = hearts.length - 1; i >= 0; i--) {
            const h = hearts[i]; h.life -= dt;
            if (h.life <= 0) { hearts.splice(i, 1); continue; }
            if (Math.hypot(h.x - P.x, h.y - P.y) < 20) { hearts.splice(i, 1); if (P.hp < P.max) P.hp++; g.sfx("gotit"); st(); }
          }
          if (left <= 0 && !sl.length && !clear) {
            clear = true; g.add(10 * wave); bul = [];
            if (wave >= 12) { g.win("You squished every slime!"); return false; }
            U.show(pool, "Wave " + wave + " cleared! Pick a power-up", next);
          }
        }
        F.begin(dt);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#1c4a3a"); gr.addColorStop(1, "#0f2a2a"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.strokeStyle = "rgba(255,255,255,.05)"; x.lineWidth = 1; x.beginPath(); for (let i = 0; i < W; i += 40) { x.moveTo(i, 0); x.lineTo(i, H); } for (let j = 0; j < H; j += 40) { x.moveTo(0, j); x.lineTo(W, j); } x.stroke();
        hearts.forEach(h => { dot(x, h.x, h.y, 9, "#ff4d6d"); T(x, "+", h.x, h.y, 14, "#fff"); });
        sl.forEach(s => blob(x, s.x, s.y, s.r, s.fl > 0 ? "#ffffff" : (s.big ? "#2fb86a" : "#6be28f"), t + s.ph));
        bul.forEach(b => dot(x, b.x, b.y, P.size, "#ffe96b"));
        if (P.inv <= 0 || Math.floor(t * 14) % 2) {
          x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(P.x, P.y + 11, 11, 4, 0, 0, TAU); x.fill();
          x.save(); x.translate(P.x, P.y); x.rotate(P.ang); x.fillStyle = "#cfd8ff"; x.fillRect(4, -3, 16, 6); x.restore();
          dot(x, P.x, P.y, 11, "#4cc3ff"); dot(x, P.x - 3, P.y - 3, 4, "rgba(255,255,255,.6)");
        }
        F.end(dt); U.draw(dt);
      });
    }
  });

  // ---- Tank Duel Arena: bouncing shells against computer tanks ----
  B.add({
    id: "s8-tank-duel", name: "Tank Duel Arena", ages: [9, 20], cat: "Action", color: "#ffb347", icon: "T",
    desc: "Outsmart computer tanks in a walled arena. Shells bounce!", controls: "WASD/arrows drive, mouse aims, click to fire. Touch or keys only: tank aims and fires by itself.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos), I = IN(g, c, pos);
      const walls = [{ x: 150, y: 90, w: 30, h: 100 }, { x: 460, y: 210, w: 30, h: 100 }, { x: 290, y: 175, w: 60, h: 50 }, { x: 170, y: 300, w: 90, h: 24 }, { x: 380, y: 76, w: 90, h: 24 }];
      const P = { x: 60, y: H / 2, hp: 4, max: 4, sp: 120, rate: .6, cd: 0, bn: 1, dmg: 1, a: 0, b: 0, inv: 0 };
      let en = [], sh = [], wave = 0, clear = false;
      const bg = pre(W, H, q => { q.fillStyle = "#c9a56a"; q.fillRect(0, 0, W, H); for (let i = 0; i < 16; i++) for (let j = 0; j < 10; j++) if ((i + j) % 2) { q.fillStyle = "rgba(0,0,0,.06)"; q.fillRect(i * 40, j * 40, 40, 40); } q.strokeStyle = "#6b4a2a"; q.lineWidth = 8; q.strokeRect(0, 0, W, H); });
      const hitW = (px, py) => walls.some(w => px > w.x && px < w.x + w.w && py > w.y && py < w.y + w.h);
      const st = () => g.status("Round " + wave + "/8  Armor " + P.hp + "/" + P.max);
      const pool = [
        { n: "Quick loader", d: "Reload 22% faster", f() { P.rate *= .78; } },
        { n: "Heavy shells", d: "Shells hit harder", f() { P.dmg += 1; } },
        { n: "Ricochet", d: "Shells bounce|one more time", f() { P.bn++; } },
        { n: "Armor plating", d: "+1 armor|and full repair", f() { P.max++; P.hp = P.max; } },
        { n: "Turbo tracks", d: "Drive 18% faster", f() { P.sp *= 1.18; } },
        { n: "Repair kit", d: "Fix 2 armor", f() { P.hp = Math.min(P.max, P.hp + 2); } }
      ];
      const next = () => {
        wave++; clear = false; sh = []; P.x = 60; P.y = H / 2; P.inv = 1; en = [];
        const n = Math.min(6, Math.ceil(wave / 2) + g.by(0, 1, 2));
        for (let i = 0; i < n; i++) {
          let px, py, k = 0; do { px = g.rf(400, 590); py = g.rf(40, 360); k++; } while (k < 40 && walls.some(w => px > w.x - 22 && px < w.x + w.w + 22 && py > w.y - 22 && py < w.y + w.h + 22));
          en.push({ x: px, y: py, hp: 2 + (wave > 4 ? 1 : 0), a: Math.PI, b: Math.PI, cd: g.rf(1.2, 2.4), sp: g.by(55, 70, 85), mode: 0, mt: 0, fl: 0 });
        }
        st();
      };
      const fire = (o, ang, sp, own, dmg, bn) => { sh.push({ x: o.x + Math.cos(ang) * 20, y: o.y + Math.sin(ang) * 20, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, own, dmg, bn, life: 5 }); g.sfx(own === "p" ? "launch" : "click"); };
      const tank = (px, py, b, a, col, dark, fl) => {
        x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(px, py + 9, 17, 6, 0, 0, TAU); x.fill();
        x.save(); x.translate(px, py); x.rotate(b); x.fillStyle = "#333"; x.fillRect(-15, -13, 30, 6); x.fillRect(-15, 7, 30, 6); x.fillStyle = fl ? "#fff" : col; x.beginPath(); x.roundRect(-13, -9, 26, 18, 4); x.fill(); x.restore();
        x.save(); x.translate(px, py); x.rotate(a); x.fillStyle = fl ? "#fff" : dark; x.fillRect(0, -3, 22, 6); x.beginPath(); x.arc(0, 0, 8, 0, TAU); x.fill(); x.restore();
      };
      next();
      g.loop((dt, t) => {
        if (!U.open()) {
          P.inv -= dt; P.cd -= dt;
          const d = I.dir(P.x, P.y); P.x += d.x * P.sp * dt; P.y += d.y * P.sp * dt; if (d.x || d.y) P.b = Math.atan2(d.y, d.x);
          P.x = g.clamp(P.x, 16, W - 16); P.y = g.clamp(P.y, 16, H - 16); pushOut(P, 15, walls);
          const tg = near(en, P.x, P.y);
          if (I.mouse) P.a = Math.atan2(I.my - P.y, I.mx - P.x); else if (tg) P.a = Math.atan2(tg.y - P.y, tg.x - P.x);
          if (P.cd <= 0 && (I.down || g.keys[" "] || (!I.mouse && tg))) { P.cd = P.rate; fire(P, P.a, 330, "p", P.dmg, P.bn); }
          for (let i = en.length - 1; i >= 0; i--) {
            const e = en[i];
            if (e.hp <= 0) { en.splice(i, 1); g.add(10); g.sfx("boom"); F.burst(e.x, e.y, "#ff9f43", 22, 190); F.burst(e.x, e.y, "#555", 10, 90); F.shake(6); POP(g, c, W, H, "+10", e.x, e.y, "#ffe9a0"); continue; }
            e.fl -= dt; e.cd -= dt; e.mt -= dt;
            const dx = P.x - e.x, dy = P.y - e.y, dist = Math.hypot(dx, dy) || 1, ta = Math.atan2(dy, dx);
            if (e.mt <= 0) { e.mt = g.rf(.8, 1.8); e.mode = g.pick([-1, 0, 1]); }
            const fw = dist > 230 ? 1 : dist < 130 ? -1 : 0, mx = dx / dist * fw - dy / dist * e.mode * .8, my = dy / dist * fw + dx / dist * e.mode * .8, mm = Math.hypot(mx, my);
            if (mm > .01) { e.x += mx / mm * e.sp * dt; e.y += my / mm * e.sp * dt; e.b = Math.atan2(my, mx); }
            e.x = g.clamp(e.x, 16, W - 16); e.y = g.clamp(e.y, 16, H - 16); pushOut(e, 15, walls);
            const da = adiff(ta, e.a), rs = g.by(1.8, 2.6, 3.6); e.a += g.clamp(da, -rs * dt, rs * dt);
            if (e.cd <= 0 && Math.abs(da) < .15 && dist < 400) { e.cd = g.by(2.6, 2, 1.5) * g.rf(.8, 1.2) * Math.max(.6, 1 - wave * .04); fire(e, e.a, 200 + wave * 6, "e", 1, 1); }
          }
          for (let i = sh.length - 1; i >= 0; i--) {
            const s = sh[i]; s.life -= dt; let nx = s.x + s.vx * dt, ny = s.y + s.vy * dt, bounced = false;
            if (nx < 6 || nx > W - 6 || hitW(nx, s.y)) { s.vx = -s.vx; bounced = true; nx = s.x; }
            if (ny < 6 || ny > H - 6 || hitW(s.x, ny)) { s.vy = -s.vy; bounced = true; ny = s.y; }
            s.x = nx; s.y = ny;
            if (bounced) { if (s.bn-- <= 0 || s.life <= 0) { sh.splice(i, 1); F.burst(s.x, s.y, "#ffd34e", 6, 90); continue; } g.sfx("clink"); }
            if (s.life <= 0) { sh.splice(i, 1); continue; }
            if (s.own === "p") { const e = en.find(q => Math.hypot(q.x - s.x, q.y - s.y) < 15); if (e) { e.hp -= s.dmg; e.fl = .12; sh.splice(i, 1); F.burst(s.x, s.y, "#ffd34e", 10); g.sfx("thump"); } }
            else if (P.inv <= 0 && Math.hypot(P.x - s.x, P.y - s.y) < 14) {
              sh.splice(i, 1); P.hp--; P.inv = 1.2; F.shake(9); F.burst(P.x, P.y, "#ffb347", 14); g.sfx("boom"); st();
              if (P.hp <= 0) { g.over("Your tank was knocked out in round " + wave); return false; }
            }
          }
          if (!en.length && !clear) {
            clear = true; g.add(15 * wave);
            if (wave >= 8) { g.win("Arena champion!"); return false; }
            U.show(pool, "Round " + wave + " won! Upgrade your tank", next);
          }
        }
        F.begin(dt); x.drawImage(bg, 0, 0, W, H);
        walls.forEach(w => { x.fillStyle = "#6b4a2a"; x.fillRect(w.x, w.y, w.w, w.h); x.fillStyle = "#8a6238"; x.fillRect(w.x, w.y, w.w, 5); x.strokeStyle = "#3d2a14"; x.lineWidth = 2; x.strokeRect(w.x, w.y, w.w, w.h); });
        en.forEach(e => { tank(e.x, e.y, e.b, e.a, "#d6455d", "#8f2a3c", e.fl > 0); if (e.hp < 2 + (wave > 4 ? 1 : 0)) bar(x, e.x - 14, e.y - 24, 28, 4, e.hp / (2 + (wave > 4 ? 1 : 0)), "#ff6f6f"); });
        if (P.inv <= 0 || Math.floor(t * 14) % 2) tank(P.x, P.y, P.b, P.a, "#3fa0ff", "#1f5fa8", false);
        sh.forEach(s => { dot(x, s.x, s.y, s.own === "p" ? 4.5 : 4, s.own === "p" ? "#fff6a0" : "#ff7a7a"); dot(x, s.x, s.y, 2, "#444"); });
        F.end(dt); U.draw(dt);
      });
    }
  });

  // ---- Sword Dungeon: one room per wave, a big boss at the end ----
  B.add({
    id: "s8-dungeon-sword", name: "Sword Dungeon", ages: [9, 18], cat: "Action", color: "#b48cff", icon: "/",
    desc: "Swing your sword through eight monster rooms to reach the big boss.", controls: "WASD/arrows move, click or Space swings. Touch or keys: you swing by yourself when a monster is close.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos), I = IN(g, c, pos);
      const P = { x: W / 2, y: H - 80, hp: 6, max: 6, sp: 140, rng: 50, arc: 1.6, cd: 0, base: .5, dmg: 1, sw: 0, ang: -1.57, face: -1.57, inv: 0, kx: 0, ky: 0 };
      let room = 0, en = [], pk = [], clear = false;
      const bg = pre(W, H, q => {
        q.fillStyle = "#2a2146"; q.fillRect(0, 0, W, H);
        for (let i = 0; i < 16; i++) for (let j = 0; j < 10; j++) { q.fillStyle = (i + j) % 2 ? "#322958" : "#2d244e"; q.fillRect(i * 40, j * 40, 40, 40); }
        q.strokeStyle = "#17102e"; q.lineWidth = 24; q.strokeRect(0, 0, W, H); q.strokeStyle = "#4a3b7a"; q.lineWidth = 3; q.strokeRect(12, 12, W - 24, H - 24);
      });
      const st = () => g.status("Room " + room + "/8  Hearts " + P.hp + "/" + P.max);
      const pool = [
        { n: "Long blade", d: "Sword reaches|farther", f() { P.rng += 14; } },
        { n: "Wide swing", d: "Hits a bigger arc", f() { P.arc = Math.min(TAU, P.arc + .9); } },
        { n: "Quick hands", d: "Swing 20% faster", f() { P.base *= .8; } },
        { n: "Sharp edge", d: "+1 damage", f() { P.dmg += 1; } },
        { n: "Boots", d: "Move 15% faster", f() { P.sp *= 1.15; } },
        { n: "Heart jar", d: "+2 hearts|and heal 2", f() { P.max += 2; P.hp = Math.min(P.max, P.hp + 2); } }
      ];
      const DEF = { chomp: { r: 12, hp: 2, sp: 55, col: "#c77dff" }, bat: { r: 9, hp: 1, sp: 100, col: "#5b4a8a" }, brute: { r: 20, hp: 6, sp: 38, col: "#ff8a2a" }, boss: { r: 36, hp: g.by(30, 40, 55), sp: 45, col: "#ff4d8d" } };
      const mk = (type, i) => {
        let px, py, k = 0; do { px = g.rf(60, W - 60); py = g.rf(60, H - 60); k++; } while (Math.hypot(px - P.x, py - P.y) < 150 && k < 30);
        const D = DEF[type], hp = D.hp + (type !== "boss" ? Math.floor(room / 3) : 0);
        en.push({ type, x: px, y: py, r: D.r, hp, max: hp, sp: D.sp * g.by(.85, 1, 1.15), col: D.col, a: .6 + i * .15, kx: 0, ky: 0, fl: 0, ph: g.rf(0, 6), m: 0, t2: 2.5, da: 0 });
      };
      const next = () => {
        room++; clear = false; en = []; pk = []; P.x = W / 2; P.y = H - 80; P.inv = 1;
        if (room >= 8) { mk("boss", 0); for (let i = 0; i < 3 + g.diff; i++) mk("bat", i + 1); }
        else { const n = 2 + room + g.by(0, 1, 2); for (let i = 0; i < n; i++) mk(room > 3 && Math.random() < .25 ? "brute" : (room > 1 && Math.random() < .35 ? "bat" : "chomp"), i); }
        st();
      };
      const hurt = (n, fx, fy) => {
        P.hp -= n; P.inv = 1.1; const a = Math.atan2(P.y - fy, P.x - fx); P.kx = Math.cos(a) * 260; P.ky = Math.sin(a) * 260; F.shake(9); g.sfx("wrong"); F.burst(P.x, P.y, "#ff9f9f", 12); st();
        return P.hp <= 0;
      };
      next();
      g.loop((dt, t) => {
        if (!U.open()) {
          P.inv -= dt; P.cd -= dt; P.sw -= dt;
          const d = I.dir(P.x, P.y); if (d.x || d.y) P.face = Math.atan2(d.y, d.x);
          const kd = Math.pow(.005, dt); P.kx *= kd; P.ky *= kd;
          P.x = g.clamp(P.x + (d.x * P.sp + P.kx) * dt, 26, W - 26); P.y = g.clamp(P.y + (d.y * P.sp + P.ky) * dt, 26, H - 26);
          const act = en.filter(e => e.a <= 0), reach = act.some(e => Math.hypot(e.x - P.x, e.y - P.y) < P.rng + e.r + 6);
          const want = I.mouse ? (I.down || g.keys[" "]) : (reach || g.keys[" "]);
          if (want && P.cd <= 0) {
            P.cd = P.base; P.sw = .18; const tg = near(act, P.x, P.y);
            if (I.mouse && I.down) P.ang = Math.atan2(I.my - P.y, I.mx - P.x); else if (tg && Math.hypot(tg.x - P.x, tg.y - P.y) < P.rng + 80) P.ang = Math.atan2(tg.y - P.y, tg.x - P.x); else P.ang = P.face;
            let hits = 0;
            act.forEach(e => {
              const dd = Math.hypot(e.x - P.x, e.y - P.y), ea = Math.atan2(e.y - P.y, e.x - P.x);
              if (dd < P.rng + e.r && (P.arc >= TAU - .01 || Math.abs(adiff(ea, P.ang)) < P.arc / 2 + Math.atan2(e.r, Math.max(dd, 1)))) {
                e.hp -= P.dmg; e.fl = .12; const kb = e.type === "boss" ? 60 : e.type === "brute" ? 160 : 260; e.kx = Math.cos(ea) * kb; e.ky = Math.sin(ea) * kb; F.burst(e.x, e.y, "#fff3a0", 8); hits++;
              }
            });
            g.sfx(hits ? "thump" : "swish");
          }
          for (let i = en.length - 1; i >= 0; i--) {
            const e = en[i];
            if (e.hp <= 0) {
              en.splice(i, 1); const pts = e.type === "boss" ? 50 : e.type === "brute" ? 6 : 3; g.add(pts); g.sfx("pop"); F.burst(e.x, e.y, e.col, e.type === "boss" ? 40 : 14, 170); POP(g, c, W, H, "+" + pts, e.x, e.y, "#ffe9a0");
              if (e.type === "boss") F.shake(14); if (Math.random() < .14) pk.push({ x: e.x, y: e.y, life: 9 });
              continue;
            }
            if (e.a > 0) { e.a -= dt; continue; }
            e.fl -= dt; const dm = Math.pow(.01, dt); e.x += e.kx * dt; e.y += e.ky * dt; e.kx *= dm; e.ky *= dm;
            let a = Math.atan2(P.y - e.y, P.x - e.x), sp = e.sp;
            if (e.type === "bat") a += Math.sin(t * 5 + e.ph) * 1.1;
            if (e.type === "boss") {
              e.t2 -= dt;
              if (e.m === 1) { sp = 0; if (e.t2 <= 0) { e.m = 2; e.t2 = .55; e.da = a; } } else if (e.m === 2) { a = e.da; sp = 300; if (e.t2 <= 0) { e.m = 0; e.t2 = g.rf(2, 3.2); } } else if (e.t2 <= 0) { e.m = 1; e.t2 = .6; }
            }
            e.x = g.clamp(e.x + Math.cos(a) * sp * dt, 26, W - 26); e.y = g.clamp(e.y + Math.sin(a) * sp * dt, 26, H - 26);
            if (P.inv <= 0 && Math.hypot(P.x - e.x, P.y - e.y) < e.r + 10 && hurt(e.type === "brute" || e.type === "boss" ? 2 : 1, e.x, e.y)) { g.over("The dungeon got you in room " + room); return false; }
          }
          for (let i = pk.length - 1; i >= 0; i--) {
            const h = pk[i]; h.life -= dt;
            if (h.life <= 0) { pk.splice(i, 1); continue; }
            if (Math.hypot(h.x - P.x, h.y - P.y) < 20) { pk.splice(i, 1); if (P.hp < P.max) P.hp++; g.sfx("gotit"); st(); }
          }
          if (!en.length && !clear) {
            clear = true; g.add(10 * room);
            if (room >= 8) { g.win("The dungeon boss is beaten!"); return false; }
            U.show(pool, "Room " + room + " cleared! Pick a power-up", next);
          }
        }
        F.begin(dt); x.drawImage(bg, 0, 0, W, H);
        for (let k = 0; k < 4; k++) { const tx = k % 2 ? W - 20 : 20, ty = k < 2 ? 20 : H - 20, fl = 7 + Math.sin(t * 9 + k) * 2; dot(x, tx, ty, fl + 5, "rgba(255,170,60,.25)"); dot(x, tx, ty, fl, "#ffb03a"); }
        x.fillStyle = clear ? "#ffd34e" : "#3b2c66"; x.fillRect(W / 2 - 24, 0, 48, 14);
        pk.forEach(h => { dot(x, h.x, h.y, 9, "#ff4d6d"); T(x, "+", h.x, h.y, 14, "#fff"); });
        en.forEach(e => {
          if (e.a > 0) { x.strokeStyle = "rgba(255,255,255," + (.7 - e.a * .5) + ")"; x.lineWidth = 3; x.beginPath(); x.arc(e.x, e.y, e.r * (1 + e.a), 0, TAU); x.stroke(); return; }
          const col = e.fl > 0 ? "#fff" : e.col;
          if (e.type === "bat") {
            const fl = Math.sin(t * 20 + e.ph) * 8; x.fillStyle = col; x.beginPath(); x.moveTo(e.x, e.y); x.lineTo(e.x - 18, e.y - 6 + fl); x.lineTo(e.x - 8, e.y + 6); x.lineTo(e.x + 8, e.y + 6); x.lineTo(e.x + 18, e.y - 6 + fl); x.closePath(); x.fill();
            dot(x, e.x, e.y, 7, col); dot(x, e.x - 3, e.y - 1, 2, "#ff4d4d"); dot(x, e.x + 3, e.y - 1, 2, "#ff4d4d");
          } else {
            blob(x, e.x, e.y, e.r, col, t + e.ph);
            if (e.type !== "chomp") { x.strokeStyle = "#321"; x.lineWidth = 3; x.beginPath(); x.moveTo(e.x - e.r * .55, e.y - e.r * .45); x.lineTo(e.x - e.r * .1, e.y - e.r * .25); x.moveTo(e.x + e.r * .55, e.y - e.r * .45); x.lineTo(e.x + e.r * .1, e.y - e.r * .25); x.stroke(); }
            if (e.type === "boss") { x.fillStyle = "#ffd34e"; x.beginPath(); x.moveTo(e.x - 22, e.y - e.r + 6); x.lineTo(e.x - 22, e.y - e.r - 12); x.lineTo(e.x - 10, e.y - e.r - 2); x.lineTo(e.x, e.y - e.r - 16); x.lineTo(e.x + 10, e.y - e.r - 2); x.lineTo(e.x + 22, e.y - e.r - 12); x.lineTo(e.x + 22, e.y - e.r + 6); x.closePath(); x.fill(); if (e.m === 1) T(x, "!", e.x, e.y - e.r - 28, 26, "#ff4d4d"); }
          }
        });
        const en0 = en.find(e => e.type === "boss"); if (en0) bar(x, 120, 22, 400, 12, en0.hp / en0.max, "#ff4d8d");
        if (P.inv <= 0 || Math.floor(t * 14) % 2) {
          x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(P.x, P.y + 12, 12, 4, 0, 0, TAU); x.fill();
          dot(x, P.x, P.y, 12, "#5fd0ff"); dot(x, P.x, P.y - 9, 8, "#f5d0b0"); x.fillStyle = "#c0392b"; x.fillRect(P.x - 8, P.y - 12, 16, 4); dot(x, P.x - 3, P.y - 8, 1.6, "#123"); dot(x, P.x + 3, P.y - 8, 1.6, "#123");
        }
        if (P.sw > 0) {
          const pr = 1 - P.sw / .18, a0 = P.ang - P.arc / 2, a1 = a0 + P.arc * pr;
          x.strokeStyle = "rgba(255,255,255,.35)"; x.lineWidth = 12; x.beginPath(); x.arc(P.x, P.y, P.rng * .85, a0, Math.max(a0 + .01, a1)); x.stroke();
          x.strokeStyle = "#fff"; x.lineWidth = 5; x.beginPath(); x.moveTo(P.x, P.y); x.lineTo(P.x + Math.cos(a1) * P.rng, P.y + Math.sin(a1) * P.rng); x.stroke();
        }
        F.end(dt); U.draw(dt);
      });
    }
  });

  // ---- Star Blaster Bosses: space shooter with giant boss ships ----
  B.add({
    id: "s8-space-boss", name: "Star Blaster Bosses", ages: [9, 20], cat: "Action", color: "#4cc3ff", icon: "^",
    desc: "Blast alien fleets and giant boss ships. Grab power-ups!", controls: "Move with the mouse, your finger or WASD/arrows. Your ship shoots by itself.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(400, 600), F = FX(g, x), U = UPG(g, c, x, W, H, pos), I = IN(g, c, pos);
      const P = { x: W / 2, y: H - 90, lives: 3, lvl: 1, rate: .22, cd: 0, dmg: 1, mis: 0, mcd: 0, sh: 0, inv: 0 };
      let pb = [], en = [], eb = [], pm = [], pk = [], wave = 0, boss = null, q = [], qt = 0, clear = false;
      const stars = []; for (let i = 0; i < 50; i++) stars.push({ x: g.rf(0, W), y: g.rf(0, H), s: g.rf(20, 90), r: g.rf(.6, 1.8) });
      const BD = [
        { name: "Mothership Mo", col: "#ff7bd1", hp: 90, ph: [[["fan", 5, 140]], [["fan", 7, 150], ["aim", 3, 190]], [["ring", 14, 130], ["aim", 5, 200]]] },
        { name: "Crab Lord Kroll", col: "#ff8a2a", hp: 150, ph: [[["aim", 3, 180], ["fan", 5, 140]], [["ring", 12, 120], ["fan", 9, 150]], [["spin", 1, 150], ["aim", 5, 210]]] },
        { name: "Star Eater", col: "#9b6bff", hp: 230, ph: [[["ring", 10, 120], ["aim", 3, 190]], [["spin", 1, 160], ["fan", 9, 160]], [["ring", 18, 140], ["aim", 7, 220], ["spin", 1, 170]]] }
      ];
      const st = () => g.status("Wave " + wave + "/9  Lives " + P.lives + "  Power " + P.lvl);
      const pool = [
        { n: "Rapid fire", d: "Shoot faster", f() { P.rate = Math.max(.08, P.rate * .8); } },
        { n: "Power shot", d: "Bullets hit|harder", f() { P.dmg += .6; } },
        { n: "Missiles", d: "Homing missiles|launch for you", f() { P.mis++; } },
        { n: "Extra life", d: "+1 life", f() { P.lives++; st(); } },
        { n: "Wide guns", d: "More bullets", f() { P.lvl = Math.min(5, P.lvl + 1); st(); } },
        { n: "Shield", d: "Blocks the|next hit", f() { P.sh = 1; } }
      ];
      const shoot = (bx, by, ang, sp, col, r) => { if (eb.length < 320) eb.push({ x: bx, y: by, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: r || 5, col: col || "#ff6f91" }); };
      const atk = (kind, n, sp, t) => {
        const b = boss, by = b.y + 30;
        if (kind === "fan") for (let i = 0; i < n; i++) shoot(b.x, by, Math.PI / 2 + (i - (n - 1) / 2) * .22, sp);
        else if (kind === "aim") { const a = Math.atan2(P.y - by, P.x - b.x); for (let i = 0; i < n; i++) shoot(b.x, by, a + (i - (n - 1) / 2) * .12, sp, "#ffd34e"); }
        else if (kind === "ring") for (let i = 0; i < n; i++) shoot(b.x, b.y, t * 1.3 + i * TAU / n, sp, "#b48cff");
        else for (let i = 0; i < 6; i++) shoot(b.x, b.y, t * 3 + i * TAU / 6, sp, "#6be28f");
      };
      const next = () => {
        wave++; q = []; qt = 0; clear = false; pk = [];
        if (wave % 3 === 0) { const d = BD[wave / 3 - 1]; boss = { x: W / 2, y: -80, ty: 100, hp: d.hp * g.by(.8, 1, 1.25), max: 0, d, cd: 2, k: 0, dir: 1, fl: 0 }; boss.max = boss.hp; g.sfx("rumble"); }
        else {
          const n = Math.min(11, 4 + wave + g.by(0, 1, 2));
          for (let i = 0; i < n; i++) q.push({ t: i * .55, type: wave > 4 && i % 4 === 3 ? "tank" : (wave > 1 && i % 3 === 2 ? "swoop" : "grunt"), x: W * (.15 + .7 * ((i % 5) / 4)) });
        }
        st();
      };
      const spawnE = o => {
        const hp = (o.type === "tank" ? 7 : 2) + Math.floor(wave / 4);
        en.push({ type: o.type, x: o.x, x0: o.x, y: -20, hp, t: g.rf(0, 6), sc: g.rf(1, 2.6), vy: o.type === "tank" ? 40 : 65, tx: P.x, fl: 0 });
      };
      const drop = (px, py) => { if (Math.random() < .13) pk.push({ x: px, y: py, k: g.pick(["P", "S", "B"]) }); };
      const hurt = () => {
        if (P.inv > 0) return false;
        if (P.sh > 0) { P.sh = 0; P.inv = 1; g.sfx("clink"); F.burst(P.x, P.y, "#7fe0ff", 14); return false; }
        P.lives--; P.inv = 2; F.shake(12); g.sfx("boom"); F.burst(P.x, P.y, "#ff9f43", 20); st();
        return P.lives <= 0;
      };
      next();
      g.loop((dt, t) => {
        stars.forEach(s => { s.y += s.s * dt; if (s.y > H) { s.y = 0; s.x = g.rf(0, W); } });
        if (!U.open()) {
          P.inv -= dt; P.cd -= dt; P.mcd -= dt;
          let tx = P.x, ty = P.y, sp = 480;
          if (I.mouse) { tx = I.mx; ty = I.my; } else if (I.tx !== null) { tx = I.tx; ty = I.ty - 50; } else { const d = I.dir(P.x, P.y); tx = P.x + d.x * 300; ty = P.y + d.y * 300; sp = 300; }
          const dx = tx - P.x, dy = ty - P.y, dd = Math.hypot(dx, dy); if (dd > 1) { const s = Math.min(dd, sp * dt); P.x += dx / dd * s; P.y += dy / dd * s; }
          P.x = g.clamp(P.x, 18, W - 18); P.y = g.clamp(P.y, 110, H - 30);
          if (P.cd <= 0) {
            P.cd = P.rate; g.sfx("tick");
            [[0], [-6, 6], [-9, 0, 9], [-13, -4, 4, 13], [-16, -8, 0, 8, 16]][P.lvl - 1].forEach(o => pb.push({ x: P.x + o, y: P.y - 14, vx: o * 9, vy: -540 }));
          }
          if (P.mis && P.mcd <= 0) { P.mcd = 1.6; for (let i = 0; i < P.mis; i++) pm.push({ x: P.x + (i % 2 ? 12 : -12), y: P.y, vx: (i % 2 ? 60 : -60), vy: -150, life: 3 }); g.sfx("launch"); }
          qt += dt; while (q.length && q[0].t <= qt) spawnE(q.shift());
          const hitE = (px, py, rr, dmg) => {
            if (boss && boss.y > 0 && Math.hypot(px - boss.x, py - boss.y) < 48 + rr) { boss.hp -= dmg; boss.fl = .06; F.burst(px, py, "#fff", 3, 80); return true; }
            for (const e of en) if (Math.hypot(px - e.x, py - e.y) < 17 + rr) { e.hp -= dmg; e.fl = .08; F.burst(px, py, "#fff", 3, 80); return true; }
            return false;
          };
          for (let i = pb.length - 1; i >= 0; i--) { const b = pb[i]; b.x += b.vx * dt; b.y += b.vy * dt; if (b.y < -20 || hitE(b.x, b.y, 3, P.dmg)) { if (b.y >= -20) g.sfx("pop"); pb.splice(i, 1); } }
          for (let i = pm.length - 1; i >= 0; i--) {
            const m = pm[i]; m.life -= dt; const tg = boss && boss.y > 0 ? boss : near(en, m.x, m.y);
            if (tg) { const a = Math.atan2(tg.y - m.y, tg.x - m.x); m.vx += (Math.cos(a) * 330 - m.vx) * Math.min(1, dt * 4); m.vy += (Math.sin(a) * 330 - m.vy) * Math.min(1, dt * 4); }
            m.x += m.vx * dt; m.y += m.vy * dt;
            if (m.life <= 0 || m.y < -30 || hitE(m.x, m.y, 6, 3 * P.dmg)) { if (m.life > 0 && m.y > -30) { F.burst(m.x, m.y, "#ffb347", 10); g.sfx("boom"); } pm.splice(i, 1); }
          }
          for (let i = en.length - 1; i >= 0; i--) {
            const e = en[i];
            if (e.hp <= 0) { en.splice(i, 1); g.add(e.type === "tank" ? 5 : 2); g.sfx("boom"); F.burst(e.x, e.y, "#ff9f43", 14, 150); drop(e.x, e.y); continue; }
            e.t += dt; e.fl -= dt;
            if (e.type === "swoop") { if (e.y < 60) e.y += 110 * dt; else { const a = Math.atan2(P.y - e.y, e.tx - e.x); e.x += Math.cos(a) * 170 * dt; e.y += Math.max(40, Math.sin(a) * 170) * dt; } }
            else { e.y += e.vy * dt; e.x = e.x0 + Math.sin(e.t * 1.8) * 60; }
            if (e.y > H + 30 || e.x < -40 || e.x > W + 40) { en.splice(i, 1); continue; }
            e.sc -= dt;
            if (e.sc <= 0 && e.y > 20 && e.y < H * .65) {
              e.sc = g.by(3, 2.4, 1.8) * g.rf(.8, 1.4);
              if (e.type === "tank") for (let k = -1; k <= 1; k++) shoot(e.x, e.y + 14, Math.PI / 2 + k * .25, 140);
              else shoot(e.x, e.y + 12, Math.atan2(P.y - e.y, P.x - e.x), g.by(120, 150, 180));
            }
            if (Math.hypot(P.x - e.x, P.y - e.y) < 22) { e.hp -= 3; if (hurt()) { g.over("Your ship was destroyed on wave " + wave); return false; } }
          }
          if (boss) {
            boss.y += (boss.ty - boss.y) * Math.min(1, dt * 1.5); boss.fl -= dt;
            if (boss.hp <= 0) {
              F.shake(18); for (let k = 0; k < 6; k++) F.burst(boss.x + g.rf(-40, 40), boss.y + g.rf(-20, 20), g.pick(["#ffd34e", "#ff8a2a", "#fff"]), 18, 220);
              g.sfx("boom"); g.add(100 * (wave / 3)); POP(g, c, W, H, "BOSS DOWN!", boss.x, boss.y, "#ffd34e"); pk.push({ x: boss.x, y: boss.y, k: "P" }); boss = null; eb = [];
            } else if (boss.y > boss.ty - 6) {
              boss.x += boss.dir * dt * (50 + (1 - boss.hp / boss.max) * 50); if (boss.x > W - 70) boss.dir = -1; if (boss.x < 70) boss.dir = 1;
              boss.cd -= dt;
              if (boss.cd <= 0) { const ph = boss.hp > boss.max * .66 ? 0 : boss.hp > boss.max * .33 ? 1 : 2, list = boss.d.ph[ph], a = list[boss.k++ % list.length]; atk(a[0], a[1], a[2] * g.by(.85, 1, 1.15), t); boss.cd = [1.3, 1.05, .85][ph] * g.by(1.25, 1, .85); g.sfx("fizz"); }
              if (Math.hypot(P.x - boss.x, P.y - boss.y) < 40 && hurt()) { g.over("The boss crushed you on wave " + wave); return false; }
            }
          }
          for (let i = eb.length - 1; i >= 0; i--) {
            const b = eb[i]; b.x += b.vx * dt; b.y += b.vy * dt;
            if (b.x < -20 || b.x > W + 20 || b.y < -20 || b.y > H + 20) { eb.splice(i, 1); continue; }
            if (Math.hypot(P.x - b.x, P.y - b.y) < b.r + 5) { eb.splice(i, 1); if (hurt()) { g.over("Your ship was destroyed on wave " + wave); return false; } }
          }
          for (let i = pk.length - 1; i >= 0; i--) {
            const p = pk[i]; p.y += 70 * dt; if (p.y > H + 20) { pk.splice(i, 1); continue; }
            if (Math.hypot(P.x - p.x, P.y - p.y) < 24) {
              pk.splice(i, 1); g.sfx("gotit");
              if (p.k === "P") { if (P.lvl < 5) P.lvl++; else g.add(20); st(); } else if (p.k === "S") P.sh = 1;
              else { eb = []; en.forEach(e => e.hp -= 5); if (boss) boss.hp -= 10; F.shake(10); F.burst(P.x, P.y - 40, "#fff", 30, 260); g.sfx("boom"); }
            }
          }
          if (!boss && !en.length && !q.length && !clear) {
            clear = true; g.add(20 * wave); eb = [];
            if (wave >= 9) { g.win("The galaxy is safe!"); return false; }
            U.show(pool, "Wave " + wave + " cleared! Pick an upgrade", next);
          }
        }
        F.begin(dt);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#050a26"); gr.addColorStop(1, "#1b1450"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        stars.forEach(s => dot(x, s.x, s.y, s.r, "rgba(255,255,255," + (.3 + s.s / 130) + ")"));
        pk.forEach(p => { dot(x, p.x, p.y, 13, p.k === "P" ? "#ffd34e" : p.k === "S" ? "#4cc3ff" : "#ff6f91"); T(x, p.k, p.x, p.y, 14, "#123"); });
        en.forEach(e => {
          const col = e.fl > 0 ? "#fff" : e.type === "tank" ? "#ff8a2a" : e.type === "swoop" ? "#ff6f91" : "#6be28f", s = e.type === "tank" ? 22 : 15;
          x.fillStyle = col; x.beginPath(); x.ellipse(e.x, e.y, s, s * .55, 0, 0, TAU); x.fill(); dot(x, e.x, e.y - 5, s * .5, "rgba(255,255,255,.4)"); dot(x, e.x - s * .3, e.y - 3, 3, "#123"); dot(x, e.x + s * .3, e.y - 3, 3, "#123");
        });
        if (boss) {
          x.save(); x.translate(boss.x, boss.y); const col = boss.fl > 0 ? "#fff" : boss.d.col;
          x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, 60, 26, 0, 0, TAU); x.fill(); x.fillStyle = "rgba(255,255,255,.35)"; x.beginPath(); x.ellipse(0, -10, 34, 22, 0, Math.PI, TAU); x.fill();
          dot(x, -16, -4, 8, "#fff"); dot(x, 16, -4, 8, "#fff"); dot(x, -14, -2, 4, "#a00"); dot(x, 18, -2, 4, "#a00");
          for (let i = 0; i < 5; i++) dot(x, -40 + i * 20, 15, 4, "hsl(" + ((t * 200 + i * 60) % 360) + ",90%,65%)");
          x.restore(); T(x, boss.d.name, W / 2, 20, 16, "#ffd34e"); bar(x, 60, 34, W - 120, 10, boss.hp / boss.max, "#ff4d6d");
        }
        pb.forEach(b => { x.fillStyle = "#9ff"; x.fillRect(b.x - 1.5, b.y - 7, 3, 12); });
        pm.forEach(m => { dot(x, m.x, m.y, 4, "#ffb347"); dot(x, m.x - m.vx * .03, m.y - m.vy * .03, 3, "rgba(255,255,255,.6)"); });
        eb.forEach(b => { dot(x, b.x, b.y, b.r + 2, "rgba(255,255,255,.25)"); dot(x, b.x, b.y, b.r, b.col); });
        if (P.inv <= 0 || Math.floor(t * 14) % 2) {
          const fl = 6 + Math.sin(t * 40) * 3; x.fillStyle = "#ffb347"; x.beginPath(); x.moveTo(P.x - 6, P.y + 12); x.lineTo(P.x, P.y + 14 + fl); x.lineTo(P.x + 6, P.y + 12); x.fill();
          x.fillStyle = "#cfe3ff"; x.beginPath(); x.moveTo(P.x, P.y - 18); x.lineTo(P.x + 16, P.y + 14); x.lineTo(P.x, P.y + 8); x.lineTo(P.x - 16, P.y + 14); x.closePath(); x.fill(); dot(x, P.x, P.y - 2, 4, "#4cc3ff");
          if (P.sh) { x.strokeStyle = "rgba(127,224,255,.8)"; x.lineWidth = 3; x.beginPath(); x.arc(P.x, P.y, 24, 0, TAU); x.stroke(); }
        }
        F.end(dt); U.draw(dt);
      });
    }
  });

  // ---- Turret Defence: build turrets around your core and survive the robot waves ----
  B.add({
    id: "s8-turret-defence", name: "Turret Defence", ages: [10, 20], cat: "Action", color: "#ff8a5c", icon: "+",
    desc: "Build and upgrade turrets around your core to stop ten robot waves.", controls: "Tap a pad to build, tap a turret to upgrade. Keys 1-3 pick a turret, Space starts the wave.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos);
      const CX = 320, CY = 175, pads = [];
      for (let i = 0; i < 6; i++) { const a = i * TAU / 6 + .5; pads.push({ x: CX + Math.cos(a) * 62, y: CY + Math.sin(a) * 62, t: null, a: 0, cd: 0 }); }
      for (let i = 0; i < 6; i++) { const a = i * TAU / 6; pads.push({ x: CX + Math.cos(a) * 135, y: CY + Math.sin(a) * 118, t: null, a: 0, cd: 0 }); }
      const TY = [
        { n: "Gun", cost: 40, range: 115, rate: .45, dmg: 1.2, col: "#4cc3ff" },
        { n: "Frost", cost: 60, range: 95, rate: .9, dmg: .6, col: "#a8e8ff" },
        { n: "Cannon", cost: 90, range: 150, rate: 1.5, dmg: 3, col: "#ffb347" }
      ];
      const G = { rate: 1, dmg: 1, range: 1 };
      const btns = [{ x: 8, y: 364, w: 92, h: 30, k: 0 }, { x: 106, y: 364, w: 92, h: 30, k: 1 }, { x: 204, y: 364, w: 92, h: 30, k: 2 }, { x: 312, y: 364, w: 120, h: 30, k: "rep" }, { x: 480, y: 364, w: 152, h: 30, k: "go" }];
      let coins = g.by(130, 100, 80), core = g.by(20, 15, 12), coreMax = core, wave = 0, fight = false, left = 0, spT = 0, sel = 0, en = [], beams = [], rings = [];
      const st = () => g.status("Wave " + wave + "/10  Core " + Math.ceil(core) + "/" + coreMax);
      const pool = [
        { n: "Overclock", d: "All turrets|shoot 15% faster", f() { G.rate *= .85; } },
        { n: "Hot ammo", d: "All turrets|hit 25% harder", f() { G.dmg *= 1.25; } },
        { n: "Long range", d: "All turrets|reach 12% farther", f() { G.range *= 1.12; } },
        { n: "Armored core", d: "+5 core health|and heal 5", f() { coreMax += 5; core = Math.min(coreMax, core + 5); st(); } },
        { n: "Scrap haul", d: "Get 90 coins", f() { coins += 90; } },
        { n: "Core repair", d: "Heal 8 core|health", f() { core = Math.min(coreMax, core + 8); st(); } }
      ];
      const upCost = p => Math.round(TY[p.t.k].cost * .8 * p.t.l);
      const say = (s, px, py, col) => POP(g, c, W, H, s, px, py, col || "#fff");
      const go = () => {
        if (fight || U.busy()) return; fight = true; wave++; left = Math.round(g.by(5, 7, 9) + wave * g.by(2.5, 3, 3.5)); spT = .5; g.sfx("launch"); st();
      };
      const press = p => {
        for (const b of btns) if (p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h) {
          if (b.k === "go") go(); else if (b.k === "rep") { if (coins >= 30 && core < coreMax) { coins -= 30; core = Math.min(coreMax, core + 3); g.sfx("gotit"); st(); } else g.sfx("wrong"); } else { sel = b.k; g.sfx("click"); }
          return;
        }
        for (const pd of pads) if (Math.hypot(pd.x - p.x, pd.y - p.y) < 24) {
          if (!pd.t) { const cost = TY[sel].cost; if (coins >= cost) { coins -= cost; pd.t = { k: sel, l: 1 }; g.sfx("lock"); F.burst(pd.x, pd.y, TY[sel].col, 10); } else { g.sfx("wrong"); say("Need " + cost + " coins", pd.x, pd.y, "#ff9f9f"); } }
          else if (pd.t.l < 3) { const cost = upCost(pd); if (coins >= cost) { coins -= cost; pd.t.l++; g.sfx("grow"); F.burst(pd.x, pd.y, "#ffd34e", 12); } else { g.sfx("wrong"); say("Need " + cost + " coins", pd.x, pd.y, "#ff9f9f"); } }
          return;
        }
      };
      g.on(c, "pointerdown", e => { if (!U.busy()) press(pos(e)); });
      g.on(window, "keydown", e => { if (U.busy()) return; if (e.key >= "1" && e.key <= "3") sel = +e.key - 1; else if (e.key === " " || e.key === "Enter") go(); });
      const kill = e => { coins += e.rw; g.add(e.type === "tank" ? 5 : 2); g.sfx("boom"); F.burst(e.x, e.y, "#ffb347", 12, 140); say("+" + e.rw, e.x, e.y, "#ffe9a0"); };
      st();
      g.loop((dt, t) => {
        if (!U.open()) {
          if (fight && left > 0) {
            spT -= dt;
            if (spT <= 0) {
              spT = Math.max(.35, g.by(1.1, .9, .75) - wave * .04); left--;
              const s = g.ri(0, 3), r = Math.random(); let sx, sy; if (s === 0) { sx = -15; sy = g.rf(0, 350); } else if (s === 1) { sx = W + 15; sy = g.rf(0, 350); } else if (s === 2) { sx = g.rf(0, W); sy = -15; } else { sx = g.rf(0, W); sy = 355; }
              const k = wave >= 5 && r < .15 ? "fast" : wave >= 3 && r < .32 ? "tank" : "grunt", hm = g.by(.85, 1, 1.2);
              en.push(k === "tank" ? { type: k, x: sx, y: sy, hp: (16 + wave * 3) * hm, sp: 17, rw: 15, s: 13, col: "#8f6bff", slow: 0, fl: 0 } : k === "fast" ? { type: k, x: sx, y: sy, hp: (3 + wave * .5) * hm, sp: 55, rw: 8, s: 7, col: "#ffd34e", slow: 0, fl: 0 } : { type: k, x: sx, y: sy, hp: (4 + wave) * hm, sp: 26, rw: 6, s: 9, col: "#8aa0b8", slow: 0, fl: 0 });
            }
          }
          for (const p of pads) {
            if (!p.t) continue; const D = TY[p.t.k], l = p.t.l, rng = D.range * G.range * (1 + .08 * (l - 1)); p.cd -= dt;
            let tg = null, bd = 1e9; for (const e of en) { if (Math.hypot(e.x - p.x, e.y - p.y) > rng) continue; const d = Math.hypot(e.x - CX, e.y - CY); if (d < bd) { bd = d; tg = e; } }
            if (tg) p.a = Math.atan2(tg.y - p.y, tg.x - p.x);
            if (!tg || p.cd > 0) continue;
            p.cd = D.rate * G.rate * Math.pow(.85, l - 1); const dm = D.dmg * G.dmg * (1 + .6 * (l - 1));
            if (p.t.k === 0) { tg.hp -= dm; beams.push({ x1: p.x, y1: p.y, x2: tg.x, y2: tg.y, t: .08, col: "#bfefff" }); g.sfx("tick"); }
            else if (p.t.k === 1) { en.forEach(e => { if (Math.hypot(e.x - p.x, e.y - p.y) <= rng) { e.hp -= dm; e.slow = 1.5; } }); rings.push({ x: p.x, y: p.y, r: 10, mx: rng, t: .4, col: "#a8e8ff" }); g.sfx("fizz"); }
            else { en.forEach(e => { if (Math.hypot(e.x - tg.x, e.y - tg.y) <= 38) e.hp -= dm; }); beams.push({ x1: p.x, y1: p.y, x2: tg.x, y2: tg.y, t: .1, col: "#ffb347" }); rings.push({ x: tg.x, y: tg.y, r: 6, mx: 38, t: .3, col: "#ffb347" }); g.sfx("thump"); F.shake(2); }
          }
          for (let i = en.length - 1; i >= 0; i--) {
            const e = en[i];
            if (e.hp <= 0) { kill(e); en.splice(i, 1); continue; }
            e.fl -= dt; e.slow -= dt; const d = Math.hypot(CX - e.x, CY - e.y), sp = e.sp * (e.slow > 0 ? .5 : 1) * dt;
            e.x += (CX - e.x) / d * sp; e.y += (CY - e.y) / d * sp;
            if (d < 24) { core -= e.type === "tank" ? 3 : 1; en.splice(i, 1); F.shake(8); g.sfx("wrong"); F.burst(CX, CY, "#ff6f6f", 14); st(); if (core <= 0) { g.over("Your core was destroyed on wave " + wave); return false; } }
          }
          if (fight && left <= 0 && !en.length) {
            fight = false; const bonus = 30 + wave * 8; coins += bonus; g.add(10 * wave); say("+" + bonus + " coins", CX, 100, "#ffd34e");
            if (wave >= 10) { g.win("You held the line!"); return false; }
            U.show(pool, "Wave " + wave + " beaten! Pick a bonus");
          }
        }
        F.begin(dt);
        const gr = x.createLinearGradient(0, 0, 0, 360); gr.addColorStop(0, "#3c5a2e"); gr.addColorStop(1, "#5a6b34"); x.fillStyle = gr; x.fillRect(0, 0, W, 360);
        x.strokeStyle = "rgba(0,0,0,.08)"; x.lineWidth = 1; x.beginPath(); for (let i = 0; i < W; i += 32) { x.moveTo(i, 0); x.lineTo(i, 360); } for (let j = 0; j < 360; j += 32) { x.moveTo(0, j); x.lineTo(W, j); } x.stroke();
        dot(x, CX, CY, 26, "rgba(255,230,120,.25)"); dot(x, CX, CY, 20, "#3a3f66"); dot(x, CX, CY, 14, "#ffd34e"); dot(x, CX, CY, 7, "#fff");
        for (const p of pads) {
          if (!p.t) { x.strokeStyle = "rgba(255,255,255," + (fight ? .2 : .55) + ")"; x.lineWidth = 2; x.setLineDash([4, 4]); x.beginPath(); x.arc(p.x, p.y, 17, 0, TAU); x.stroke(); x.setLineDash([]); if (!fight) T(x, "+", p.x, p.y, 16, "rgba(255,255,255,.6)"); continue; }
          const D = TY[p.t.k], l = p.t.l; dot(x, p.x, p.y, 17, "#2a2f4a"); dot(x, p.x, p.y, 13, D.col);
          x.save(); x.translate(p.x, p.y); x.rotate(p.t.k === 1 ? t * 2 : p.a);
          if (p.t.k === 1) { x.strokeStyle = "#fff"; x.lineWidth = 3; for (let k = 0; k < 3; k++) { x.rotate(TAU / 6); x.beginPath(); x.moveTo(-9, 0); x.lineTo(9, 0); x.stroke(); } } else { x.fillStyle = "#223"; x.fillRect(0, p.t.k === 2 ? -4 : -2.5, 17 + l * 2, p.t.k === 2 ? 8 : 5); }
          x.restore();
          for (let k = 0; k < l; k++) dot(x, p.x - (l - 1) * 4 + k * 8, p.y + 21, 2.5, "#ffd34e");
          if (!fight && l < 3) T(x, "" + upCost(p), p.x, p.y - 23, 11, coins >= upCost(p) ? "#8fe3a8" : "#ff9f9f");
        }
        en.forEach(e => { robo(x, e.x, e.y, e.s, e.fl > 0 ? "#fff" : e.col, t + e.x * .01, false); if (e.slow > 0) dot(x, e.x, e.y, e.s * 1.2, "rgba(168,232,255,.3)"); });
        beams.forEach(b => { b.t -= dt; x.strokeStyle = b.col; x.lineWidth = 3; x.beginPath(); x.moveTo(b.x1, b.y1); x.lineTo(b.x2, b.y2); x.stroke(); }); beams = beams.filter(b => b.t > 0);
        rings.forEach(r => { r.t -= dt; r.r += (r.mx - r.r) * Math.min(1, dt * 12); x.globalAlpha = Math.max(0, r.t * 2.5); x.strokeStyle = r.col; x.lineWidth = 3; x.beginPath(); x.arc(r.x, r.y, r.r, 0, TAU); x.stroke(); x.globalAlpha = 1; }); rings = rings.filter(r => r.t > 0);
        F.end(dt);
        bar(x, 220, 8, 200, 10, core / coreMax, core / coreMax > .4 ? "#6be28f" : "#ff6f6f"); T(x, "CORE", 190, 13, 12, "#fff", "center"); T(x, "Coins " + coins, 60, 14, 16, "#ffd34e");
        if (!fight && wave === 0) T(x, "Build turrets on the pads, then press START", W / 2, 345, 14, "#fff");
        x.fillStyle = "#10163a"; x.fillRect(0, 360, W, 40);
        btns.forEach(b => {
          const lab = b.k === "go" ? (fight ? "Wave " + wave + " (" + (left + en.length) + " left)" : "START WAVE " + (wave + 1)) : b.k === "rep" ? "Repair 30" : TY[b.k].n + " " + TY[b.k].cost;
          x.fillStyle = b.k === sel ? "#35508f" : "#1e2a5a"; x.beginPath(); x.roundRect(b.x, b.y, b.w, b.h, 8); x.fill();
          x.strokeStyle = b.k === "go" ? (fight ? "#556" : "#6be28f") : b.k === sel ? "#ffd34e" : "#556"; x.lineWidth = 2; x.stroke(); T(x, lab, b.x + b.w / 2, b.y + b.h / 2, 13, "#fff");
        });
        U.draw(dt);
      });
    }
  });

  // ---- Ninja Star Dodge: dodge robot shuriken, throw your own ----
  B.add({
    id: "s8-ninja-stars", name: "Ninja Star Dodge", ages: [9, 20], cat: "Action", color: "#ff5c8a", icon: "*",
    desc: "Dodge the robots' stars and throw your own back. Smoke-dash out of danger!", controls: "WASD/arrows move, mouse aims, click throws, Space or DASH dashes. Touch: drag to move (throws by itself), tap DASH.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos), I = IN(g, c, pos);
      const P = { x: W / 2, y: 330, hp: 3, max: 3, sp: 190, rate: .45, cd: 0, multi: 1, dmg: 1, pierce: 0, bn: 0, inv: 0, dc: 0, dcd: 2.2, dash: 0, dx: 0, dy: -1 };
      let stars = [], bots = [], bs = [], wave = 0, clear = false;
      const DB = { x: W - 110, y: H - 52, w: 100, h: 42 };
      const bg = pre(W, H, q => {
        const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#0e1238"); gr.addColorStop(.6, "#3a1f5a"); gr.addColorStop(1, "#5a2a5a"); q.fillStyle = gr; q.fillRect(0, 0, W, H);
        for (let i = 0; i < 40; i++) { q.fillStyle = "rgba(255,255,255," + (.2 + Math.random() * .6) + ")"; q.fillRect(Math.random() * W, Math.random() * 190, 2, 2); }
        q.fillStyle = "#fff6c8"; q.beginPath(); q.arc(520, 70, 34, 0, TAU); q.fill(); q.fillStyle = "rgba(14,18,56,.25)"; q.beginPath(); q.arc(510, 62, 10, 0, TAU); q.fill();
        q.fillStyle = "#1b1f4a"; for (let i = 0; i < 12; i++) { q.fillRect(i * 56 + 10, 150, 8, 100); q.fillRect(i * 56 + 30, 170, 6, 80); }
        q.fillStyle = "#3b2548"; q.fillRect(0, 215, W, H - 215); q.strokeStyle = "#2a1a38"; q.lineWidth = 2; for (let j = 0; j < 7; j++) { q.beginPath(); q.moveTo(0, 215 + j * 28); q.lineTo(W, 215 + j * 28); q.stroke(); }
      });
      const st = () => g.status("Wave " + wave + "/8  Lives " + P.hp + "/" + P.max);
      const pool = [
        { n: "Twin stars", d: "Throw one more|star each time", f() { P.multi++; } },
        { n: "Quick hands", d: "Throw 22% faster", f() { P.rate *= .78; } },
        { n: "Razor edge", d: "Stars slice through|one more robot", f() { P.pierce++; } },
        { n: "Ricochet", d: "Stars bounce to|another robot", f() { P.bn++; } },
        { n: "Heavy stars", d: "+1 damage", f() { P.dmg += 1; } },
        { n: "Extra life", d: "+1 life and heal", f() { P.max++; P.hp = P.max; st(); } },
        { n: "Quick smoke", d: "Dash recharges|faster", f() { P.dcd *= .65; } }
      ];
      const next = () => {
        wave++; clear = false; bs = []; stars = []; st();
        const n = Math.max(2, Math.min(7, 2 + Math.ceil(wave * .8) + g.by(-1, 0, 1)));
        for (let i = 0; i < n; i++) {
          const type = wave >= 2 && i % 3 === 0 ? "spreader" : (wave >= 4 && i % 4 === 1 ? "bomber" : "shooter"), hp = 2 + Math.floor(wave / 2);
          bots.push({ type, x0: W * (.12 + .76 * (n === 1 ? .5 : i / (n - 1))), y0: g.rf(55, 150), x: 0, y: 0, t: g.rf(0, 6), hp, max: hp, cd: g.rf(1, 2.5), sp: g.rf(.5, 1.1), amp: g.rf(30, 80), fl: 0 });
        }
      };
      const doDash = () => {
        if (P.dc > 0 || P.dash > 0) return; const d = I.dir(P.x, P.y); if (d.x || d.y) { P.dx = d.x; P.dy = d.y; } else { P.dx = g.keys.ArrowLeft ? -1 : 1; P.dy = 0; }
        P.dash = .2; P.dc = P.dcd; P.inv = Math.max(P.inv, .3); g.sfx("swish");
      };
      g.on(c, "pointerdown", e => { if (U.busy()) return; const p = pos(e); if (p.x >= DB.x && p.x <= DB.x + DB.w && p.y >= DB.y && p.y <= DB.y + DB.h) { doDash(); I.tx = null; I.down = false; } });
      g.on(window, "keydown", e => { if ((e.key === " " || e.key === "Shift") && !U.busy()) doDash(); });
      const bshot = (bx, by, a, sp, big) => { if (bs.length < 200) bs.push({ x: bx, y: by, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: big ? 9 : 5, bomb: big, life: 1.5 }); };
      next();
      g.loop((dt, t) => {
        if (!U.open()) {
          P.inv -= dt; P.cd -= dt; P.dc -= dt; P.dash -= dt;
          if (P.dash > 0) { P.x += P.dx * 500 * dt; P.y += P.dy * 500 * dt; } else { const d = I.dir(P.x, P.y); P.x += d.x * P.sp * dt; P.y += d.y * P.sp * dt; }
          P.x = g.clamp(P.x, 20, W - 20); P.y = g.clamp(P.y, 220, H - 30);
          const tg = near(bots, P.x, P.y);
          if (P.cd <= 0 && (I.mouse ? I.down : bots.length > 0)) {
            P.cd = P.rate; const ang = I.mouse ? Math.atan2(I.my - P.y, I.mx - P.x) : tg ? Math.atan2(tg.y - P.y, tg.x - P.x) : -Math.PI / 2; g.sfx("swish");
            for (let i = 0; i < P.multi; i++) { const a = ang + (i - (P.multi - 1) / 2) * .16; stars.push({ x: P.x, y: P.y, vx: Math.cos(a) * 430, vy: Math.sin(a) * 430, rot: 0, pl: P.pierce, bn: P.bn, hit: [] }); }
          }
          for (let i = stars.length - 1; i >= 0; i--) {
            const s = stars[i]; s.x += s.vx * dt; s.y += s.vy * dt; s.rot += dt * 18;
            let dead = s.x < -20 || s.x > W + 20 || s.y < -20 || s.y > H + 20;
            if (!dead) for (const b of bots) {
              if (s.hit.includes(b) || Math.hypot(b.x - s.x, b.y - s.y) > 20) continue;
              s.hit.push(b); b.hp -= P.dmg; b.fl = .1; F.burst(s.x, s.y, "#ffd34e", 6, 110); g.sfx("clink");
              if (s.bn > 0) { const o = near(bots, s.x, s.y, q => !s.hit.includes(q) && q.hp > 0); if (o) { s.bn--; const a = Math.atan2(o.y - s.y, o.x - s.x); s.vx = Math.cos(a) * 430; s.vy = Math.sin(a) * 430; break; } }
              if (s.pl-- <= 0) { dead = true; break; }
            }
            if (dead) stars.splice(i, 1);
          }
          for (let i = bots.length - 1; i >= 0; i--) {
            const b = bots[i];
            if (b.hp <= 0) { bots.splice(i, 1); g.add(5); g.sfx("boom"); F.burst(b.x, b.y, "#ff9f43", 20, 180); F.burst(b.x, b.y, "#889", 10, 100); F.shake(5); POP(g, c, W, H, "+5", b.x, b.y, "#ffe9a0"); continue; }
            b.t += dt; b.fl -= dt; b.x = b.x0 + Math.sin(b.t * b.sp) * b.amp; b.y = b.y0 + Math.sin(b.t * 1.3) * 12; b.cd -= dt;
            if (b.cd <= 0) {
              const a = Math.atan2(P.y - b.y, P.x - b.x), sp = g.by(130, 160, 190) + wave * 6;
              if (b.type === "shooter") { bshot(b.x, b.y + 12, a, sp); b.cd = g.by(2.2, 1.7, 1.3) * g.rf(.8, 1.25); }
              else if (b.type === "spreader") { const n = wave > 5 ? 5 : 3; for (let k = 0; k < n; k++) bshot(b.x, b.y + 12, a + (k - (n - 1) / 2) * .28, sp * .8); b.cd = g.by(3, 2.5, 2) * g.rf(.8, 1.2); }
              else { bshot(b.x, b.y + 12, Math.PI / 2 + g.rf(-.5, .5), 80, true); b.cd = g.by(3.2, 2.7, 2.2); }
              g.sfx("tick");
            }
          }
          for (let i = bs.length - 1; i >= 0; i--) {
            const b = bs[i]; b.x += b.vx * dt; b.y += b.vy * dt;
            if (b.bomb) { b.life -= dt; if (b.life <= 0) { for (let k = 0; k < 8; k++) bshot(b.x, b.y, k * TAU / 8, 120); F.burst(b.x, b.y, "#ffb347", 10); g.sfx("boom"); bs.splice(i, 1); continue; } }
            if (b.x < -20 || b.x > W + 20 || b.y < -20 || b.y > H + 20) { bs.splice(i, 1); continue; }
            if (P.inv <= 0 && Math.hypot(P.x - b.x, P.y - b.y) < b.r + 7) {
              bs.splice(i, 1); P.hp--; P.inv = 1.3; F.shake(9); g.sfx("wrong"); F.burst(P.x, P.y, "#ff9f9f", 12); st();
              if (P.hp <= 0) { g.over("The robots got you on wave " + wave); return false; }
            }
          }
          if (!bots.length && !clear) {
            clear = true; g.add(10 * wave); bs = [];
            if (wave >= 8) { g.win("Ninja master! All robots beaten."); return false; }
            U.show(pool, "Wave " + wave + " cleared! New ninja skill", next);
          }
        }
        F.begin(dt); x.drawImage(bg, 0, 0, W, H);
        bots.forEach(b => { robo(x, b.x, b.y, 14, b.fl > 0 ? "#fff" : b.type === "shooter" ? "#8aa0b8" : b.type === "spreader" ? "#b88aff" : "#ffb347", t, false); if (b.hp < b.max) bar(x, b.x - 14, b.y - 30, 28, 4, b.hp / b.max, "#ff6f6f"); });
        bs.forEach(b => { dot(x, b.x, b.y, b.r + 3, "rgba(255,90,90,.25)"); dot(x, b.x, b.y, b.r, b.bomb ? "#ffb347" : "#ff5c5c"); if (b.bomb) T(x, "!", b.x, b.y, 11, "#123"); });
        stars.forEach(s => { x.save(); x.translate(s.x, s.y); x.rotate(s.rot); x.fillStyle = "#e8f4ff"; x.beginPath(); for (let k = 0; k < 8; k++) { const r = k % 2 ? 4 : 11, a = k * Math.PI / 4; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fill(); x.restore(); });
        if (P.inv <= 0 || Math.floor(t * 14) % 2) {
          x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(P.x, P.y + 13, 12, 4, 0, 0, TAU); x.fill();
          x.strokeStyle = "#e0245e"; x.lineWidth = 4; x.beginPath(); x.moveTo(P.x - 8, P.y - 6); x.quadraticCurveTo(P.x - 22, P.y - 4 + Math.sin(t * 9) * 5, P.x - 30, P.y - 8 + Math.sin(t * 9 + 1) * 6); x.stroke();
          dot(x, P.x, P.y, 12, "#1c1c2e"); x.fillStyle = "#f5d0b0"; x.fillRect(P.x - 8, P.y - 5, 16, 6); x.fillStyle = "#e0245e"; x.fillRect(P.x - 12, P.y - 9, 24, 4); dot(x, P.x - 3, P.y - 2, 1.6, "#123"); dot(x, P.x + 3, P.y - 2, 1.6, "#123");
        }
        F.end(dt);
        x.fillStyle = P.dc > 0 ? "#3a3a5a" : "#6b3a8a"; x.beginPath(); x.roundRect(DB.x, DB.y, DB.w, DB.h, 10); x.fill(); if (P.dc > 0) { x.fillStyle = "#8a5ab0"; x.fillRect(DB.x, DB.y + DB.h - 6, DB.w * (1 - P.dc / P.dcd), 6); }
        x.strokeStyle = "#fff"; x.lineWidth = 2; x.beginPath(); x.roundRect(DB.x, DB.y, DB.w, DB.h, 10); x.stroke(); T(x, P.dc > 0 ? "DASH..." : "DASH", DB.x + DB.w / 2, DB.y + DB.h / 2 - 2, 16, "#fff");
        U.draw(dt);
      });
    }
  });

  // ---- Castle Gate Defender: archers on the wall stop the goblin armies ----
  B.add({
    id: "s8-castle-gate", name: "Castle Gate Defender", ages: [9, 20], cat: "Action", color: "#e6b34a", icon: "C",
    desc: "Shoot arcing arrows and hire archers to keep goblins and trolls out of the gate.", controls: "Mouse or finger aims, click/tap (hold) fires. Keys: arrows move the target, Space fires.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos), I = IN(g, c, pos);
      const GY = 330, GR = 520, GX = 96;
      const P = { x: 100, y: 96, rate: .55, cd: 0, dmg: 1, pierce: 0, fire: false, ar: 1.5, ad: 1 };
      const gate = { hp: g.by(26, 20, 16), max: 0 }; gate.max = gate.hp;
      let arch = [{ x: 14, cd: .5 }], ar = [], en = [], wave = 0, left = [], spT = 0, clear = false, R = { x: 420, y: 250 };
      const bg = pre(W, H, q => {
        const gr = q.createLinearGradient(0, 0, 0, GY); gr.addColorStop(0, "#6ab7ff"); gr.addColorStop(1, "#d8f0ff"); q.fillStyle = gr; q.fillRect(0, 0, W, H);
        q.fillStyle = "#fff3a0"; q.beginPath(); q.arc(540, 70, 30, 0, TAU); q.fill();
        q.fillStyle = "#8fcf8a"; q.beginPath(); q.ellipse(380, 340, 260, 80, 0, Math.PI, TAU); q.fill(); q.fillStyle = "#79bd78"; q.beginPath(); q.ellipse(560, 345, 200, 60, 0, Math.PI, TAU); q.fill();
        q.fillStyle = "#6aa85a"; q.fillRect(0, GY, W, H - GY); q.fillStyle = "#8a6a3a"; q.fillRect(0, GY + 14, W, 6);
        q.fillStyle = "#9a9aa8"; q.fillRect(0, 130, 92, GY - 130); q.strokeStyle = "#7a7a88"; q.lineWidth = 2;
        for (let j = 0; j < 8; j++) { const yy = 130 + j * 25; q.beginPath(); q.moveTo(0, yy); q.lineTo(92, yy); q.stroke(); for (let i = 0; i < 4; i++) { q.beginPath(); q.moveTo(i * 24 + (j % 2) * 12, yy); q.lineTo(i * 24 + (j % 2) * 12, yy + 25); q.stroke(); } }
        for (let i = 0; i < 4; i++) { q.fillStyle = "#9a9aa8"; q.fillRect(i * 24 + 2, 116, 16, 16); }
        q.fillStyle = "#8a8a98"; q.fillRect(78, 104, 38, 48); for (let i = 0; i < 2; i++) q.fillRect(78 + i * 24, 94, 14, 12);
      });
      const st = () => g.status("Wave " + wave + "/8  Gate " + Math.ceil(gate.hp) + "/" + gate.max + "  Archers " + arch.length);
      const mkPool = () => {
        const p = [
          { n: "Fire arrows", d: "Arrows set goblins|on fire", f() { P.fire = true; } },
          { n: "Bigger bow", d: "+60% arrow damage", f() { P.dmg *= 1.6; } },
          { n: "Piercing", d: "Arrows go through|one more enemy", f() { P.pierce++; } },
          { n: "Rapid shot", d: "You shoot faster", f() { P.rate *= .78; } },
          { n: "Mend gate", d: "Fix 10 gate health|and +4 max", f() { gate.max += 4; gate.hp = Math.min(gate.max, gate.hp + 10); st(); } },
          { n: "Archer training", d: "Wall archers|shoot faster", f() { P.ar *= .75; } }
        ];
        if (arch.length < 5) { const hire = { n: "Hire archer", d: "A new archer joins|the wall", f() { arch.push({ x: 14 + arch.length * 15, cd: g.rf(.2, 1) }); st(); } }; p.push(hire); p.push({ n: hire.n, d: hire.d, f: hire.f }); }
        return p;
      };
      const EDEF = {
        gob: { r: 11, hp: 3, sp: 32, dmg: 1, rate: 1 }, shield: { r: 14, hp: 9, sp: 24, dmg: 1, rate: 1 }, ram: { r: 18, hp: 15, sp: 20, dmg: 3, rate: 1.6 },
        bat: { r: 10, hp: 2, sp: 44, dmg: 1, rate: 1.1 }, troll: { r: 32, hp: g.by(70, 100, 140), sp: 14, dmg: 5, rate: 2 }
      };
      const next = () => {
        wave++; clear = false; left = []; const n = 4 + wave * 2 + g.by(0, 1, 3);
        for (let i = 0; i < n; i++) left.push(wave >= 4 && i % 7 === 6 ? "ram" : wave >= 3 && i % 5 === 4 ? "bat" : wave >= 2 && i % 4 === 3 ? "shield" : "gob");
        if (wave === 8) left.splice(Math.floor(n / 2), 0, "troll");
        spT = 1; st();
      };
      const traj = (sx, sy, tx, ty) => { const TT = Math.max(.15, Math.hypot(tx - sx, ty - sy) / GR); return { T: TT, vx: (tx - sx) / TT, vy: (ty - sy) / TT - .5 * 380 * TT }; };
      const shoot = (sx, sy, tx, ty, dm) => { const q = traj(sx, sy, tx, ty); ar.push({ x: sx, y: sy, vx: q.vx, vy: q.vy, dmg: dm, pl: P.pierce, hit: [], life: 3 }); g.sfx("swish"); };
      next();
      g.loop((dt, t) => {
        if (!U.open()) {
          P.cd -= dt;
          if (I.tx !== null) { R.x = I.tx; R.y = I.ty; } else if (I.mouse) { R.x = I.mx; R.y = I.my; }
          const kx = (g.keys.ArrowRight ? 1 : 0) - (g.keys.ArrowLeft ? 1 : 0), ky = (g.keys.ArrowDown ? 1 : 0) - (g.keys.ArrowUp ? 1 : 0); R.x = g.clamp(R.x + kx * 240 * dt, 100, W - 5); R.y = g.clamp(R.y + ky * 240 * dt, 20, GY + 10);
          if (P.cd <= 0 && (I.down || g.keys[" "])) { P.cd = P.rate; shoot(P.x, P.y, R.x, R.y, P.dmg); }
          arch.forEach(a => {
            a.cd -= dt; if (a.cd > 0) return; const tg = near(en, 0, 0, e => e.x < W - 10); if (!tg) return;
            a.cd = P.ar * g.rf(.9, 1.2); const TT = Math.max(.15, Math.hypot(tg.x - a.x, tg.y - 126) / GR); shoot(a.x, 124, tg.x - tg.sp * TT * .8, tg.y, P.dmg * .8 * P.ad);
          });
          if (left.length) {
            spT -= dt;
            if (spT <= 0) {
              spT = Math.max(.5, g.by(1.8, 1.4, 1.1) - wave * .07); const k = left.shift(), D = EDEF[k], hp = D.hp * (k === "troll" ? 1 : g.by(.9, 1, 1.15));
              en.push({ type: k, x: W + 20, y: k === "bat" ? g.rf(170, 240) : GY - g.rf(4, 24), hp, max: hp, r: D.r, sp: D.sp * g.by(.85, 1, 1.15), dmg: D.dmg, rate: D.rate, ac: D.rate, burn: 0, fl: 0, ph: g.rf(0, 6) });
            }
          }
          for (let i = ar.length - 1; i >= 0; i--) {
            const a = ar[i]; a.vy += 380 * dt; a.x += a.vx * dt; a.y += a.vy * dt; a.life -= dt;
            if (a.life <= 0 || a.y > GY + 14 || a.x > W + 20 || a.x < -20) { ar.splice(i, 1); continue; }
            let dead = false;
            for (const e of en) {
              if (a.hit.includes(e) || Math.hypot(e.x - a.x, e.y - 4 - a.y) > e.r + 4) continue;
              a.hit.push(e); e.hp -= a.dmg; e.fl = .1; if (P.fire) e.burn = 3; F.burst(a.x, a.y, "#fff3a0", 5, 90); g.sfx("thump");
              if (a.pl-- <= 0) { dead = true; break; }
            }
            if (dead) ar.splice(i, 1);
          }
          for (let i = en.length - 1; i >= 0; i--) {
            const e = en[i]; e.fl -= dt;
            if (e.burn > 0) { e.burn -= dt; e.hp -= 1.4 * dt; }
            if (e.hp <= 0) { en.splice(i, 1); const pts = e.type === "troll" ? 60 : e.type === "ram" ? 8 : 3; g.add(pts); g.sfx("pop"); F.burst(e.x, e.y, e.type === "bat" ? "#9b6bff" : "#7bd35a", e.type === "troll" ? 40 : 12, 150); POP(g, c, W, H, "+" + pts, e.x, e.y, "#7a5a00"); continue; }
            const stop = GX + e.r;
            if (e.x > stop) { e.x -= e.sp * dt; if (e.type === "bat") e.y += Math.sin(t * 4 + e.ph) * 30 * dt; }
            else {
              e.ac -= dt;
              if (e.ac <= 0) { e.ac = e.rate; gate.hp -= e.dmg; F.shake(e.dmg > 2 ? 10 : 4); g.sfx("thump"); F.burst(GX, e.y, "#cbb28a", 6, 90); st(); if (gate.hp <= 0) { g.over("The gate fell on wave " + wave); return false; } }
            }
          }
          if (!left.length && !en.length && !clear) {
            clear = true; g.add(10 * wave); ar = [];
            if (wave >= 8) { g.win("The castle is safe!"); return false; }
            U.show(mkPool(), "Wave " + wave + " beaten! Strengthen the castle", next);
          }
        }
        F.begin(dt); x.drawImage(bg, 0, 0, W, H);
        x.fillStyle = "#6b4a2a"; x.beginPath(); x.moveTo(66, GY); x.lineTo(66, GY - 44); x.quadraticCurveTo(78, GY - 62, 92, GY - 44); x.lineTo(92, GY); x.closePath(); x.fill(); x.strokeStyle = "#3d2a14"; x.lineWidth = 2; x.stroke();
        bar(x, 20, GY - 78, 70, 8, gate.hp / gate.max, gate.hp / gate.max > .4 ? "#6be28f" : "#ff6f6f");
        const archerDraw = (ax, ay, col) => { dot(x, ax, ay - 8, 4, "#f5d0b0"); x.fillStyle = col; x.fillRect(ax - 3, ay - 4, 6, 9); x.strokeStyle = "#5a3a1a"; x.lineWidth = 2; x.beginPath(); x.arc(ax + 5, ay, 7, -1.2, 1.2); x.stroke(); };
        arch.forEach(a => archerDraw(a.x, 126, "#3fa0ff")); archerDraw(P.x, P.y, "#e0245e");
        en.forEach(e => {
          const col = e.fl > 0 ? "#fff" : null;
          if (e.type === "bat") { const fl = Math.sin(t * 16 + e.ph) * 8; x.fillStyle = col || "#6a4aa0"; x.beginPath(); x.moveTo(e.x, e.y); x.lineTo(e.x - 18, e.y - 6 + fl); x.lineTo(e.x - 8, e.y + 6); x.lineTo(e.x + 8, e.y + 6); x.lineTo(e.x + 18, e.y - 6 + fl); x.closePath(); x.fill(); dot(x, e.x, e.y, 7, col || "#6a4aa0"); dot(x, e.x - 3, e.y - 1, 2, "#ff4d4d"); dot(x, e.x + 3, e.y - 1, 2, "#ff4d4d"); }
          else if (e.type === "ram") { x.fillStyle = "#7a5230"; x.fillRect(e.x - 26, e.y - 4, 52, 12); dot(x, e.x - 16, e.y + 10, 6, "#333"); dot(x, e.x + 16, e.y + 10, 6, "#333"); blob(x, e.x + 6, e.y - 12, 12, col || "#6bbf59", t + e.ph); x.fillStyle = "#555"; x.fillRect(e.x - 32, e.y - 6, 8, 16); }
          else { blob(x, e.x, e.y - e.r * .6, e.r, col || (e.type === "troll" ? "#5b8c5a" : "#6bbf59"), t + e.ph); if (e.type === "shield") { x.fillStyle = "#8a8a98"; x.fillRect(e.x - e.r - 5, e.y - e.r - 2, 7, e.r * 1.6); } if (e.type === "troll") { x.fillStyle = "#7a5230"; x.fillRect(e.x - e.r - 14, e.y - e.r * 1.8, 8, e.r * 1.6); } }
          if (e.burn > 0) { dot(x, e.x, e.y - e.r - 4, 5 + Math.sin(t * 20) * 2, "#ff8a2a"); dot(x, e.x, e.y - e.r - 6, 3, "#ffe66b"); }
          if (e.hp < e.max) bar(x, e.x - 15, e.y - e.r * 2 - 8, 30, 4, e.hp / e.max, "#ff6f6f");
        });
        x.strokeStyle = "#4a2e12"; x.lineWidth = 2.5; ar.forEach(a => { const m = Math.hypot(a.vx, a.vy) || 1; x.beginPath(); x.moveTo(a.x - a.vx / m * 12, a.y - a.vy / m * 12); x.lineTo(a.x, a.y); x.stroke(); });
        const q = traj(P.x, P.y, R.x, R.y); for (let k = 1; k <= 9; k++) { const tt = q.T * k / 9; dot(x, P.x + q.vx * tt, P.y + q.vy * tt + .5 * 380 * tt * tt, 2, "rgba(255,255,255,.7)"); }
        x.strokeStyle = "#e0245e"; x.lineWidth = 2; x.beginPath(); x.arc(R.x, R.y, 10, 0, TAU); x.moveTo(R.x - 15, R.y); x.lineTo(R.x + 15, R.y); x.moveTo(R.x, R.y - 15); x.lineTo(R.x, R.y + 15); x.stroke();
        const tr = en.find(e => e.type === "troll"); if (tr) { bar(x, 170, 12, 300, 12, tr.hp / tr.max, "#8bd36a"); T(x, "TROLL KING", W / 2, 34, 13, "#123"); }
        F.end(dt); U.draw(dt);
      });
    }
  });

  // ---- Mech Arena: a big robot with a cannon, missiles and a dash ----
  B.add({
    id: "s8-mech-arena", name: "Mech Arena", ages: [10, 20], cat: "Action", color: "#8fa8ff", icon: "M",
    desc: "Pilot a giant mech. Watch your heat, fire homing missiles and dash through ten waves.", controls: "WASD move, mouse aims and fires, Space = missiles, Shift = dash. Touch: drag to move (auto-fires), tap the buttons.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos), I = IN(g, c, pos);
      const walls = [{ x: 150, y: 110, w: 36, h: 36 }, { x: 454, y: 110, w: 36, h: 36 }, { x: 150, y: 254, w: 36, h: 36 }, { x: 454, y: 254, w: 36, h: 36 }, { x: 302, y: 182, w: 36, h: 36 }];
      const P = { x: W / 2, y: 330, hp: 100, max: 100, sp: 120, heat: 0, over: false, hg: 7, dmg: 1, cd: 0, mis: 2, mcd: 0, en: 100, ec: 35, dash: 0, dx: 0, dy: -1, a: -1.57, b: 0, inv: 0 };
      let bul = [], eb = [], en = [], ms = [], pk = [], rings = [], q = [], qt = 0, wave = 0, clear = false;
      const MB = { x: W - 120, y: H - 100, w: 110, h: 42 }, DB = { x: W - 120, y: H - 52, w: 110, h: 42 };
      const bg = pre(W, H, z => {
        z.fillStyle = "#3a4258"; z.fillRect(0, 0, W, H); for (let i = 0; i < 16; i++) for (let j = 0; j < 10; j++) { z.fillStyle = (i + j) % 2 ? "#414a63" : "#3a4258"; z.fillRect(i * 40, j * 40, 40, 40); }
        z.strokeStyle = "#ffd34e"; z.lineWidth = 10; z.setLineDash([16, 16]); z.strokeRect(5, 5, W - 10, H - 10); z.setLineDash([]);
      });
      const st = () => g.status("Wave " + wave + "/10");
      const pool = [
        { n: "Heat sink", d: "Cannon heats|30% slower", f() { P.hg *= .7; } },
        { n: "Armor plating", d: "+30 armor|and heal 30", f() { P.max += 30; P.hp = Math.min(P.max, P.hp + 30); } },
        { n: "Missile pods", d: "+1 missile|per salvo", f() { P.mis++; } },
        { n: "Reactor", d: "Dash costs less", f() { P.ec = Math.max(15, P.ec - 8); } },
        { n: "Big cannon", d: "+70% cannon|damage", f() { P.dmg += .7; } },
        { n: "Servos", d: "Walk 15% faster", f() { P.sp *= 1.15; } }
      ];
      const next = () => {
        wave++; clear = false; q = []; qt = 0; eb = []; pk = []; st();
        const f = g.by(.8, 1, 1.25);
        for (let i = 0; i < Math.round((2 + wave) * f); i++) q.push("drone");
        for (let i = 0; i < Math.floor(wave / 2 * f); i++) q.push("gunner");
        for (let i = 0; i < Math.floor((wave - 2) / 3 * f); i++) q.push("walker");
        if (wave === 10) q.push("boss");
        q = g.shuffle(q);
      };
      const spawn = k => {
        const s = g.ri(0, 3); let sx, sy; if (s === 0) { sx = 20; sy = g.rf(20, H - 20); } else if (s === 1) { sx = W - 20; sy = g.rf(20, H - 20); } else if (s === 2) { sx = g.rf(20, W - 20); sy = 20; } else { sx = g.rf(20, W - 20); sy = H - 20; }
        const D = { drone: [9, 2, 105], gunner: [13, 5, 60], walker: [20, 16, 38], boss: [32, g.by(50, 70, 90), 34] }[k];
        en.push({ type: k, x: sx, y: sy, r: D[0], hp: D[1], max: D[1], sp: D[2], cd: g.rf(1, 2.5), fl: 0, burst: 0, ph: g.rf(0, 6) });
      };
      const fireE = (e, a, sp, r, dmg) => { if (eb.length < 120) eb.push({ x: e.x + Math.cos(a) * e.r, y: e.y + Math.sin(a) * e.r, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r, dmg }); };
      const hurt = (n, fx, fy) => {
        if (P.inv > 0 || P.dash > 0) return false; P.hp -= n; P.inv = .5; F.shake(8); g.sfx("wrong"); F.burst(P.x, P.y, "#ffb347", 12);
        const a = Math.atan2(P.y - fy, P.x - fx); P.x += Math.cos(a) * 8; P.y += Math.sin(a) * 8; return P.hp <= 0;
      };
      const salvo = () => {
        if (P.mcd > 0 || !en.length) { if (P.mcd <= 0) g.sfx("wrong"); return; } P.mcd = 4; g.sfx("launch");
        for (let i = 0; i < P.mis; i++) ms.push({ x: P.x, y: P.y, vx: Math.cos(P.a + (i - (P.mis - 1) / 2) * .9) * 160, vy: Math.sin(P.a + (i - (P.mis - 1) / 2) * .9) * 160, life: 3.2 });
      };
      const doDash = () => {
        if (P.dash > 0 || P.en < P.ec) return; const d = I.dir(P.x, P.y); if (d.x || d.y) { P.dx = d.x; P.dy = d.y; } else { P.dx = Math.cos(P.a); P.dy = Math.sin(P.a); }
        P.en -= P.ec; P.dash = .22; g.sfx("swish"); F.burst(P.x, P.y, "#9fd8ff", 10);
      };
      g.on(c, "pointerdown", e => {
        if (U.busy()) return; const p = pos(e), inb = b => p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h;
        if (inb(MB)) { salvo(); I.tx = null; I.down = false; } else if (inb(DB)) { doDash(); I.tx = null; I.down = false; }
      });
      g.on(window, "keydown", e => { if (U.busy()) return; if (e.key === " " || e.key === "e") salvo(); else if (e.key === "Shift" || e.key === "q") doDash(); });
      const boom = (px, py, r, dmg) => { rings.push({ x: px, y: py, r: 6, mx: r, t: .3 }); F.burst(px, py, "#ffb347", 14, 170); g.sfx("boom"); en.forEach(e => { if (Math.hypot(e.x - px, e.y - py) < r + e.r) { e.hp -= dmg; e.fl = .1; } }); };
      next();
      g.loop((dt, t) => {
        if (!U.open()) {
          P.inv -= dt; P.cd -= dt; P.mcd -= dt; P.dash -= dt; P.en = Math.min(100, P.en + 18 * dt);
          const d = I.dir(P.x, P.y); if (P.dash > 0) { P.x += P.dx * 420 * dt; P.y += P.dy * 420 * dt; } else { P.x += d.x * P.sp * dt; P.y += d.y * P.sp * dt; if (d.x || d.y) P.b = Math.atan2(d.y, d.x); }
          P.x = g.clamp(P.x, 20, W - 20); P.y = g.clamp(P.y, 20, H - 20); pushOut(P, 17, walls);
          const tg = near(en, P.x, P.y);
          if (I.mouse) P.a = Math.atan2(I.my - P.y, I.mx - P.x); else if (tg) P.a = Math.atan2(tg.y - P.y, tg.x - P.x);
          const trig = I.mouse ? I.down : !!tg;
          if (trig && !P.over && P.cd <= 0) { P.cd = .12; P.heat += P.hg; g.sfx("tick"); bul.push({ x: P.x + Math.cos(P.a) * 20, y: P.y + Math.sin(P.a) * 20, vx: Math.cos(P.a) * 470, vy: Math.sin(P.a) * 470, life: 1 }); if (P.heat >= 100) { P.heat = 100; P.over = true; g.sfx("fizz"); } }
          else P.heat = Math.max(0, P.heat - (trig && !P.over ? 20 : 34) * dt);
          if (P.over && P.heat < 30) P.over = false;
          qt -= dt; if (q.length && qt <= 0) { spawn(q.shift()); qt = Math.max(.35, g.by(1.3, 1, .8) - wave * .05); }
          for (let i = bul.length - 1; i >= 0; i--) {
            const b = bul[i]; b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
            let dead = b.life <= 0 || b.x < 0 || b.x > W || b.y < 0 || b.y > H || walls.some(w => b.x > w.x && b.x < w.x + w.w && b.y > w.y && b.y < w.y + w.h);
            if (!dead) { const e = en.find(o => Math.hypot(o.x - b.x, o.y - b.y) < o.r + 3); if (e) { e.hp -= P.dmg; e.fl = .08; F.burst(b.x, b.y, "#fff3a0", 4, 90); g.sfx("clink"); dead = true; } }
            if (dead) bul.splice(i, 1);
          }
          for (let i = ms.length - 1; i >= 0; i--) {
            const m = ms[i]; m.life -= dt; const o = near(en, m.x, m.y);
            if (o) { const a = Math.atan2(o.y - m.y, o.x - m.x); m.vx += (Math.cos(a) * 260 - m.vx) * Math.min(1, dt * 5); m.vy += (Math.sin(a) * 260 - m.vy) * Math.min(1, dt * 5); }
            m.x += m.vx * dt; m.y += m.vy * dt;
            if (m.life <= 0 || m.x < 0 || m.x > W || m.y < 0 || m.y > H || en.some(e => Math.hypot(e.x - m.x, e.y - m.y) < e.r + 4)) { boom(m.x, m.y, 45, 4 + P.dmg); ms.splice(i, 1); }
          }
          for (let i = en.length - 1; i >= 0; i--) {
            const e = en[i];
            if (e.hp <= 0) { en.splice(i, 1); const pts = e.type === "boss" ? 80 : e.type === "walker" ? 8 : e.type === "gunner" ? 4 : 2; g.add(pts); F.burst(e.x, e.y, "#ffb347", e.type === "boss" ? 40 : 14, 170); g.sfx("boom"); POP(g, c, W, H, "+" + pts, e.x, e.y, "#ffe9a0"); if (Math.random() < (e.type === "drone" ? .06 : .16)) pk.push({ x: e.x, y: e.y, life: 9 }); continue; }
            e.fl -= dt; e.cd -= dt; const dx = P.x - e.x, dy = P.y - e.y, dist = Math.hypot(dx, dy) || 1, a = Math.atan2(dy, dx);
            let mv = 1; if (e.type === "gunner") mv = dist > 200 ? 1 : dist < 150 ? -.8 : 0;
            e.x += Math.cos(a) * e.sp * mv * dt; e.y += Math.sin(a) * e.sp * mv * dt; e.x = g.clamp(e.x, 12, W - 12); e.y = g.clamp(e.y, 12, H - 12); if (e.type !== "drone") pushOut(e, e.r, walls);
            if (e.type === "drone" && dist < e.r + 16) { e.hp = 0; boom(e.x, e.y, 30, 0); if (hurt(12, e.x, e.y)) { g.over("Your mech was destroyed on wave " + wave); return false; } continue; }
            if (e.type === "gunner") { if (e.burst > 0 && e.cd <= 0) { e.burst--; e.cd = .16; fireE(e, a + g.rf(-.05, .05), 200, 4, 8); g.sfx("tick"); } else if (e.burst <= 0 && e.cd <= 0) { e.burst = 3; e.cd = g.by(2.8, 2.3, 1.8); } }
            if ((e.type === "walker" || e.type === "boss") && e.cd <= 0) { e.cd = g.by(3.4, 2.8, 2.2) * (e.type === "boss" ? .6 : 1); const n = e.type === "boss" ? 3 : 1; for (let k = 0; k < n; k++) fireE(e, a + (k - (n - 1) / 2) * .3, 130, 8, 15); g.sfx("launch"); }
            if ((e.type === "walker" || e.type === "boss") && dist < e.r + 17 && hurt(e.type === "boss" ? 25 : 15, e.x, e.y)) { g.over("Your mech was destroyed on wave " + wave); return false; }
          }
          for (let i = eb.length - 1; i >= 0; i--) {
            const b = eb[i]; b.x += b.vx * dt; b.y += b.vy * dt;
            if (b.x < 0 || b.x > W || b.y < 0 || b.y > H || walls.some(w => b.x > w.x && b.x < w.x + w.w && b.y > w.y && b.y < w.y + w.h)) { eb.splice(i, 1); continue; }
            if (Math.hypot(P.x - b.x, P.y - b.y) < b.r + 14) { eb.splice(i, 1); if (hurt(b.dmg, b.x - b.vx, b.y - b.vy)) { g.over("Your mech was destroyed on wave " + wave); return false; } }
          }
          for (let i = pk.length - 1; i >= 0; i--) { const p = pk[i]; p.life -= dt; if (p.life <= 0) { pk.splice(i, 1); continue; } if (Math.hypot(p.x - P.x, p.y - P.y) < 22) { pk.splice(i, 1); P.hp = Math.min(P.max, P.hp + 25); g.sfx("gotit"); POP(g, c, W, H, "+25 armor", P.x, P.y - 20, "#8fe3a8"); } }
          if (!q.length && !en.length && !clear) {
            clear = true; g.add(10 * wave);
            if (wave >= 10) { g.win("Arena cleared! Mech champion!"); return false; }
            U.show(pool, "Wave " + wave + " cleared! Upgrade your mech", next);
          }
        }
        F.begin(dt); x.drawImage(bg, 0, 0, W, H);
        walls.forEach(w => { x.fillStyle = "#222a3e"; x.fillRect(w.x, w.y, w.w, w.h); x.fillStyle = "#566088"; x.fillRect(w.x, w.y, w.w, 5); x.strokeStyle = "#ffd34e"; x.lineWidth = 2; x.strokeRect(w.x, w.y, w.w, w.h); });
        pk.forEach(p => { dot(x, p.x, p.y, 10, "#6be28f"); T(x, "+", p.x, p.y, 16, "#123"); });
        en.forEach(e => {
          const col = e.fl > 0 ? "#fff" : null;
          if (e.type === "drone") { dot(x, e.x, e.y, 10, "rgba(255,90,90,.25)"); dot(x, e.x, e.y, 8, col || "#d0d4e8"); dot(x, e.x, e.y, 4, "#ff4d4d"); x.strokeStyle = "#889"; x.lineWidth = 2; x.beginPath(); x.moveTo(e.x - 13, e.y); x.lineTo(e.x + 13, e.y); x.stroke(); }
          else robo(x, e.x, e.y, e.r * .75, col || (e.type === "gunner" ? "#7a8ab8" : e.type === "boss" ? "#ff4d8d" : "#d98a4a"), t, e.fl > 0);
          if (e.type === "boss") { bar(x, 140, 10, 360, 12, e.hp / e.max, "#ff4d8d"); T(x, "MEGA WALKER", W / 2, 32, 13, "#fff"); } else if (e.hp < e.max) bar(x, e.x - 14, e.y - e.r - 12, 28, 4, e.hp / e.max, "#ff6f6f");
        });
        eb.forEach(b => { dot(x, b.x, b.y, b.r + 3, "rgba(255,90,90,.3)"); dot(x, b.x, b.y, b.r, "#ff6f6f"); });
        bul.forEach(b => dot(x, b.x, b.y, 3.5, "#fff6a0"));
        ms.forEach(m => { dot(x, m.x, m.y, 4, "#ffb347"); dot(x, m.x - m.vx * .03, m.y - m.vy * .03, 3, "rgba(255,255,255,.6)"); });
        if (P.inv <= 0 || Math.floor(t * 14) % 2) {
          x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(P.x, P.y + 14, 18, 6, 0, 0, TAU); x.fill();
          x.save(); x.translate(P.x, P.y); x.rotate(P.b); const lg = Math.sin(t * 10) * 4; x.fillStyle = "#4a5a8a"; x.fillRect(-14 + lg, -16, 12, 7); x.fillRect(-14 - lg, 9, 12, 7); x.restore();
          dot(x, P.x, P.y, 15, "#8fa8ff"); dot(x, P.x, P.y, 9, "#cfd8ff");
          x.save(); x.translate(P.x, P.y); x.rotate(P.a); x.fillStyle = "#2a3a6a"; x.fillRect(4, -9, 18, 5); x.fillRect(4, 4, 18, 5); x.fillStyle = P.over ? "#ff4d4d" : "#fff"; x.fillRect(20, -8, 4, 3); x.fillRect(20, 5, 4, 3); x.restore(); dot(x, P.x, P.y, 4, "#4cc3ff");
        }
        rings.forEach(r => { r.t -= dt; r.r += (r.mx - r.r) * Math.min(1, dt * 14); x.globalAlpha = Math.max(0, r.t * 3); x.strokeStyle = "#ffd34e"; x.lineWidth = 4; x.beginPath(); x.arc(r.x, r.y, r.r, 0, TAU); x.stroke(); x.globalAlpha = 1; }); rings = rings.filter(r => r.t > 0);
        F.end(dt);
        T(x, "ARMOR", 30, 12, 11, "#fff"); bar(x, 60, 7, 120, 10, P.hp / P.max, "#6be28f"); T(x, P.over ? "OVERHEAT!" : "HEAT", 30, 28, 11, P.over ? "#ff6f6f" : "#fff"); bar(x, 60, 23, 120, 10, P.heat / 100, P.over || P.heat > 70 ? "#ff6f6f" : "#ffb347"); T(x, "ENERGY", 30, 44, 11, "#fff"); bar(x, 60, 39, 120, 10, P.en / 100, "#4cc3ff");
        [[MB, "MISSILES", P.mcd], [DB, "DASH", P.en < P.ec ? 1 : 0]].forEach(([b, lab, cd]) => { x.fillStyle = cd > 0 ? "#3a3a5a" : "#4a5a9a"; x.beginPath(); x.roundRect(b.x, b.y, b.w, b.h, 10); x.fill(); x.strokeStyle = "#fff"; x.lineWidth = 2; x.stroke(); T(x, lab, b.x + b.w / 2, b.y + b.h / 2, 15, "#fff"); });
        U.draw(dt);
      });
    }
  });

  // ---- Boss Rush: five giant cartoon bosses with attack patterns ----
  B.add({
    id: "s8-boss-rush", name: "Boss Rush", ages: [10, 20], cat: "Action", color: "#ff4d6d", icon: "B",
    desc: "Five giant cartoon bosses in a row. Learn their attack patterns and dodge!", controls: "WASD/arrows or drag to move. You shoot by yourself. Space or the DASH button dodges. Only the white dot can be hit.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos), I = IN(g, c, pos);
      const P = { x: W / 2, y: 330, hp: 5, max: 5, sp: 170, rate: .17, cd: 0, dmg: 1, multi: 1, sh: 0, shield: false, inv: 0, dash: 0, dc: 0, dcd: 1.6, dx: 0, dy: -1, hits: 0 };
      const BD = [
        { name: "Gloop King", kind: "blob", col: "#6be28f", hp: 90, ph: [["ring", "aim"], ["ring", "aim", "rain"], ["ring", "aim", "rain", "sweep"]] },
        { name: "Robo Rex", kind: "robo", col: "#8aa0b8", hp: 140, ph: [["aim", "sweep"], ["aim", "sweep", "laser"], ["laser", "sweep", "ring", "aim"]] },
        { name: "Ghost Gus", kind: "ghost", col: "#e8ecff", hp: 190, ph: [["spiral", "homing"], ["spiral", "homing", "ring"], ["spiral", "homing", "rain", "aim"]] },
        { name: "Crab Bot", kind: "crab", col: "#ff7a4a", hp: 250, ph: [["charge", "rain"], ["charge", "rain", "aim"], ["charge", "laser", "sweep", "rain"]] },
        { name: "Cosmo Octo", kind: "octo", col: "#b48cff", hp: 330, ph: [["spiral", "ring", "laser"], ["spiral", "sweep", "homing", "charge"], ["spiral", "ring", "laser", "sweep", "homing", "charge"]] }
      ];
      let bi = 0, b = null, pb = [], eb = [], lz = [], clear = false, banner = 0, bannerT = "";
      const DB = { x: W - 110, y: H - 52, w: 100, h: 42 };
      const bg = pre(W, H, q => {
        const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#1a0f33"); gr.addColorStop(1, "#2a1a4a"); q.fillStyle = gr; q.fillRect(0, 0, W, H);
        q.strokeStyle = "rgba(180,140,255,.12)"; q.lineWidth = 1; for (let i = 0; i < W; i += 40) { q.beginPath(); q.moveTo(i, 0); q.lineTo(i, H); q.stroke(); } for (let j = 0; j < H; j += 40) { q.beginPath(); q.moveTo(0, j); q.lineTo(W, j); q.stroke(); }
      });
      const st = () => g.status("Boss " + (bi + 1) + "/5  Hearts " + P.hp + "/" + P.max);
      const pool = [
        { n: "Rapid fire", d: "Shoot 22% faster", f() { P.rate *= .78; } },
        { n: "Twin shot", d: "One more bullet|per shot", f() { P.multi++; } },
        { n: "Power", d: "+50% damage", f() { P.dmg *= 1.5; } },
        { n: "Armor", d: "+1 heart|and heal 1", f() { P.max++; P.hp = Math.min(P.max, P.hp + 1); st(); } },
        { n: "Shield", d: "Start each boss|with a free shield", f() { P.shield = true; } },
        { n: "Quick feet", d: "Move 15% faster", f() { P.sp *= 1.15; } },
        { n: "Smoke dash", d: "Dash recharges|faster", f() { P.dcd *= .65; } }
      ];
      const mkBoss = () => {
        const d = BD[bi]; b = { d, x: W / 2, y: -80, hp: d.hp * g.by(.8, 1, 1.25), max: 0, phase: 0, pat: null, last: "", pt: 0, pn: 0, idle: 2.2, fl: 0, cs: 0, r: 46, hx: 0 }; b.max = b.hp;
        P.sh = P.shield ? 1 : 0; eb = []; lz = []; pb = []; clear = false; P.x = W / 2; P.y = 330; P.inv = 1; banner = 2; bannerT = d.name; st(); g.sfx("rumble");
      };
      const sc = () => g.by(.85, 1, 1.2) * (1 + bi * .06);
      const eshot = (px, py, a, sp, hom) => { if (eb.length < 400) eb.push({ x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: hom ? 8 : 5, hom, life: 6 }); };
      const hurt = () => {
        if (P.inv > 0 || P.dash > 0) return false;
        if (P.sh > 0) { P.sh = 0; P.inv = 1; g.sfx("clink"); F.burst(P.x, P.y, "#7fe0ff", 14); return false; }
        P.hp--; P.inv = 1.6; F.shake(10); g.sfx("wrong"); F.burst(P.x, P.y, "#ff9f9f", 14); eb.forEach(q => { if (Math.hypot(q.x - P.x, q.y - P.y) < 70) q.life = 0; }); st();
        return P.hp <= 0;
      };
      const doDash = () => {
        if (P.dc > 0 || P.dash > 0) return; const d = I.dir(P.x, P.y); if (d.x || d.y) { P.dx = d.x; P.dy = d.y; } else { P.dx = g.keys.ArrowLeft ? -1 : 1; P.dy = 0; }
        P.dash = .2; P.dc = P.dcd; g.sfx("swish");
      };
      g.on(c, "pointerdown", e => { if (U.busy()) return; const p = pos(e); if (p.x >= DB.x && p.x <= DB.x + DB.w && p.y >= DB.y && p.y <= DB.y + DB.h) { doDash(); I.tx = null; I.down = false; } });
      g.on(window, "keydown", e => { if ((e.key === " " || e.key === "Shift") && !U.busy()) doDash(); });
      const runPat = dt => {
        b.pt += dt; const s = sc(), by = b.y + 30; let done = false;
        switch (b.pat) {
          case "ring": if (b.pn < 4 && b.pt >= b.pn * .55) { for (let i = 0; i < 16; i++) eshot(b.x, b.y, b.pn * .2 + i * TAU / 16, 115 * s); b.pn++; g.sfx("fizz"); } done = b.pt > 2.4; break;
          case "aim": if (b.pn < 5 && b.pt >= b.pn * .45) { const a = Math.atan2(P.y - by, P.x - b.x); for (let k = -1; k <= 1; k++) eshot(b.x, by, a + k * .18, 170 * s); b.pn++; g.sfx("tick"); } done = b.pt > 2.6; break;
          case "rain": if (b.pt < 3 && b.pt >= b.pn * .12) { eshot(g.rf(10, W - 10), -6, Math.PI / 2, 150 * s); b.pn++; } done = b.pt > 3.2; break;
          case "sweep": if (b.pn < 2 && b.pt >= b.pn * 1.1) { const gx = g.rf(90, W - 90); for (let xx = 14; xx < W; xx += 26) if (Math.abs(xx - gx) > 54) eshot(xx, by, Math.PI / 2, 100 * s); b.pn++; g.sfx("rumble"); } done = b.pt > 3; break;
          case "spiral": if (b.pt < 3.2 && b.pt >= b.pn * .07) { const a = b.pt * 3.6; eshot(b.x, b.y, a, 125 * s); eshot(b.x, b.y, a + Math.PI, 125 * s); b.pn++; } done = b.pt > 3.6; break;
          case "laser": if (b.pn === 0) { b.pn = 1; for (let k = 0; k < 3; k++) lz.push({ x: k === 0 ? g.clamp(P.x, 30, W - 30) : g.rf(30, W - 30), t: -1.1 }); g.sfx("hum"); } done = b.pt > 2.3; break;
          case "homing": if (b.pn === 0) { b.pn = 1; for (let k = -1; k <= 1; k++) eshot(b.x, by, Math.PI / 2 + k * .7, 80 * s, true); g.sfx("launch"); } done = b.pt > 3; break;
          case "charge":
            if (b.cs === 0) { b.x += (P.x - b.x) * Math.min(1, dt * 4); if (b.pt > 1) { b.cs = 1; g.sfx("rumble"); } }
            else if (b.cs === 1) { b.y += 560 * dt; if (b.y > H - 40) { b.cs = 2; F.shake(10); g.sfx("boom"); for (let i = 0; i < 12; i++) eshot(b.x, b.y, -Math.PI * (i / 11), 120 * s); } }
            else { b.y -= 260 * dt; if (b.y <= 80) { b.y = 80; b.cs = 0; done = true; } }
            break;
          default: done = true;
        }
        if (done) { b.last = b.pat; b.pat = null; b.idle = g.by(1.5, 1.1, .8); }
      };
      mkBoss();
      g.loop((dt, t) => {
        if (!U.open()) {
          P.inv -= dt; P.cd -= dt; P.dc -= dt; P.dash -= dt; banner -= dt;
          if (P.dash > 0) { P.x += P.dx * 520 * dt; P.y += P.dy * 520 * dt; } else { const d = I.dir(P.x, P.y); P.x += d.x * P.sp * dt; P.y += d.y * P.sp * dt; }
          P.x = g.clamp(P.x, 14, W - 14); P.y = g.clamp(P.y, 130, H - 16);
          if (b) {
            const intro = b.y < 70 && b.pat !== "charge";
            if (b.pat !== "charge") { b.y += (80 - b.y) * Math.min(1, dt * 2); b.hx += dt * .7 * (1 + bi * .1); b.x += (W / 2 + Math.sin(b.hx) * 180 - b.x) * Math.min(1, dt * 3); }
            b.fl -= dt;
            if (!intro) {
              const ph = b.hp > b.max * .66 ? 0 : b.hp > b.max * .33 ? 1 : 2;
              if (ph !== b.phase) { b.phase = ph; eb = []; lz = []; b.pat = null; b.idle = 1.2; banner = 1.6; bannerT = "PHASE " + (ph + 1) + "!"; g.sfx("rumble"); F.shake(8); }
              if (b.pat) runPat(dt);
              else { b.idle -= dt; if (b.idle <= 0) { const list = b.d.ph[b.phase].filter(k => k !== b.last), pick = g.pick(list.length ? list : b.d.ph[b.phase]); b.pat = pick; b.pt = 0; b.pn = 0; b.cs = 0; } }
              if (b.cs === 1 && b.pat === "charge" && Math.hypot(P.x - b.x, P.y - b.y) < b.r + 4 && hurt()) { g.over("Defeated by " + b.d.name); return false; }
            }
            if (P.cd <= 0 && !intro) {
              P.cd = P.rate; const a = Math.atan2(b.y - P.y, b.x - P.x); g.sfx("tick");
              for (let i = 0; i < P.multi; i++) { const aa = a + (i - (P.multi - 1) / 2) * .12; pb.push({ x: P.x, y: P.y - 6, vx: Math.cos(aa) * 520, vy: Math.sin(aa) * 520 }); }
            }
          }
          for (let i = pb.length - 1; i >= 0; i--) {
            const q = pb[i]; q.x += q.vx * dt; q.y += q.vy * dt;
            if (q.x < -10 || q.x > W + 10 || q.y < -10 || q.y > H + 10) { pb.splice(i, 1); continue; }
            if (b && Math.hypot(q.x - b.x, q.y - b.y) < b.r) {
              pb.splice(i, 1); b.hp -= P.dmg; b.fl = .06; F.burst(q.x, q.y, "#fff3a0", 3, 90); if (++P.hits % 10 === 0) g.add(1);
              if (b.hp <= 0) {
                F.shake(18); for (let k = 0; k < 8; k++) F.burst(b.x + g.rf(-40, 40), b.y + g.rf(-30, 30), g.pick(["#ffd34e", "#ff8a2a", "#fff"]), 18, 230);
                g.sfx("boom"); g.add(100 * (bi + 1)); POP(g, c, W, H, "BOSS DOWN!", b.x, b.y, "#ffd34e"); b = null; eb = []; lz = []; pb = []; bi++;
                if (bi >= 5) { g.win("You beat every boss!"); return false; }
                P.hp = Math.min(P.max, P.hp + 2); st(); U.show(pool, "Boss defeated! Pick a power-up", mkBoss); break;
              }
            }
          }
          for (let i = lz.length - 1; i >= 0; i--) {
            const l = lz[i]; l.t += dt; if (l.t > .6) { lz.splice(i, 1); continue; }
            if (l.t > 0 && Math.abs(P.x - l.x) < 19 && hurt()) { g.over("Zapped by " + (b ? b.d.name : "a laser")); return false; }
          }
          for (let i = eb.length - 1; i >= 0; i--) {
            const e = eb[i]; e.life -= dt;
            if (e.hom) { const a = Math.atan2(P.y - e.y, P.x - e.x), cur = Math.atan2(e.vy, e.vx), na = cur + g.clamp(adiff(a, cur), -1.4 * dt, 1.4 * dt), sp = 85; e.vx = Math.cos(na) * sp; e.vy = Math.sin(na) * sp; }
            e.x += e.vx * dt; e.y += e.vy * dt;
            if (e.life <= 0 || e.x < -20 || e.x > W + 20 || e.y < -20 || e.y > H + 20) { eb.splice(i, 1); continue; }
            if (Math.hypot(P.x - e.x, P.y - e.y) < e.r + 3.5) { eb.splice(i, 1); if (hurt()) { g.over("Defeated by " + (b ? b.d.name : "the boss")); return false; } }
          }
        }
        F.begin(dt); x.drawImage(bg, 0, 0, W, H);
        lz.forEach(l => {
          if (l.t < 0) { x.fillStyle = "rgba(255,80,80," + (.1 + .12 * Math.abs(Math.sin(t * 14))) + ")"; x.fillRect(l.x - 18, 0, 36, H); }
          else { x.fillStyle = "rgba(255,255,255,.95)"; x.fillRect(l.x - 7, 0, 14, H); x.fillStyle = "rgba(255,90,90,.6)"; x.fillRect(l.x - 19, 0, 38, H); }
        });
        if (b) {
          if (b.pat === "charge" && b.cs === 0) { x.fillStyle = "rgba(255,80,80,.18)"; x.fillRect(b.x - 40, 0, 80, H); }
          const col = b.fl > 0 ? "#fff" : b.d.col, k = b.d.kind;
          x.save(); x.translate(b.x, b.y);
          if (k === "blob") { blob(x, 0, 0, 46, col, t); x.fillStyle = "#ffd34e"; x.beginPath(); x.moveTo(-26, -34); x.lineTo(-26, -58); x.lineTo(-13, -44); x.lineTo(0, -62); x.lineTo(13, -44); x.lineTo(26, -58); x.lineTo(26, -34); x.closePath(); x.fill(); }
          else if (k === "robo") robo(x, 0, 0, 36, col, t, b.fl > 0);
          else if (k === "ghost") { x.fillStyle = col; x.beginPath(); x.arc(0, -4, 42, Math.PI, 0); for (let i = 0; i < 5; i++) x.lineTo(42 - i * 17 - 8, 42 + Math.sin(t * 6 + i) * 6 - (i % 2 ? 10 : 0)); x.lineTo(-42, 36); x.closePath(); x.fill(); dot(x, -15, -10, 9, "#223"); dot(x, 15, -10, 9, "#223"); dot(x, 0, 12, 8, "#223"); }
          else if (k === "crab") { x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, 48, 32, 0, 0, TAU); x.fill(); dot(x, -56, -18, 14, col); dot(x, 56, -18, 14, col); dot(x, -14, -30, 7, "#fff"); dot(x, 14, -30, 7, "#fff"); dot(x, -14, -29, 3, "#123"); dot(x, 14, -29, 3, "#123"); x.strokeStyle = "#123"; x.lineWidth = 4; x.beginPath(); x.moveTo(-18, 6); x.lineTo(0, 14); x.lineTo(18, 6); x.stroke(); }
          else { x.fillStyle = col; x.beginPath(); x.arc(0, -6, 40, Math.PI, 0); x.lineTo(40, 10); x.lineTo(-40, 10); x.closePath(); x.fill(); x.strokeStyle = col; x.lineWidth = 8; for (let i = -3; i <= 3; i++) { x.beginPath(); x.moveTo(i * 12, 10); x.quadraticCurveTo(i * 12 + Math.sin(t * 4 + i) * 12, 30, i * 14 + Math.sin(t * 3 + i) * 10, 48); x.stroke(); } dot(x, -14, -10, 9, "#fff"); dot(x, 14, -10, 9, "#fff"); dot(x, -12, -8, 4, "#a00"); dot(x, 16, -8, 4, "#a00"); }
          x.restore();
          bar(x, 90, 10, 460, 14, b.hp / b.max, "#ff4d6d"); T(x, b.d.name, W / 2, 34, 14, "#fff");
        }
        eb.forEach(e => { dot(x, e.x, e.y, e.r + 3, "rgba(255,255,255,.2)"); dot(x, e.x, e.y, e.r, e.hom ? "#ff9f43" : "#ff6f91"); });
        pb.forEach(q => dot(x, q.x, q.y, 3.5, "#9ff"));
        if (P.inv <= 0 || Math.floor(t * 14) % 2) {
          x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(P.x, P.y + 12, 11, 4, 0, 0, TAU); x.fill();
          dot(x, P.x, P.y, 11, "#4cc3ff"); dot(x, P.x, P.y - 8, 7, "#f5d0b0"); x.fillStyle = "#e0245e"; x.fillRect(P.x - 8, P.y - 11, 16, 4); x.fillStyle = "#e0245e"; x.beginPath(); x.moveTo(P.x - 6, P.y + 4); x.lineTo(P.x - 14 - Math.sin(t * 9) * 3, P.y + 14); x.lineTo(P.x + 2, P.y + 8); x.fill();
          if (P.sh) { x.strokeStyle = "rgba(127,224,255,.85)"; x.lineWidth = 3; x.beginPath(); x.arc(P.x, P.y, 20, 0, TAU); x.stroke(); }
          dot(x, P.x, P.y, 5, "rgba(255,255,255,.35)"); dot(x, P.x, P.y, 3, "#fff");
        }
        F.end(dt);
        if (banner > 0) { x.globalAlpha = Math.min(1, banner); T(x, bannerT, W / 2, H / 2 - 20, 34, "#ffd34e"); x.globalAlpha = 1; }
        x.fillStyle = P.dc > 0 ? "#3a3a5a" : "#6b3a8a"; x.beginPath(); x.roundRect(DB.x, DB.y, DB.w, DB.h, 10); x.fill(); if (P.dc > 0) { x.fillStyle = "#8a5ab0"; x.fillRect(DB.x, DB.y + DB.h - 6, DB.w * (1 - P.dc / P.dcd), 6); }
        x.strokeStyle = "#fff"; x.lineWidth = 2; x.beginPath(); x.roundRect(DB.x, DB.y, DB.w, DB.h, 10); x.stroke(); T(x, P.dc > 0 ? "DASH..." : "DASH", DB.x + DB.w / 2, DB.y + DB.h / 2 - 2, 16, "#fff");
        U.draw(dt);
      });
    }
  });

  // ---- Garden Blob Defence: plants vs cartoon green blobs ----
  B.add({
    id: "s8-garden-blobs", name: "Garden Blob Defence", ages: [8, 16], cat: "Action", color: "#7bd35a", icon: "G",
    desc: "Plant peas, sunflowers and cherry bombs to stop green blobs reaching your house.", controls: "Pick a seed packet (tap, or keys 1-6), then tap a lawn square. Tap falling suns to collect them.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos);
      const CW = 56, OX = 96, OY = 62, COLS = 9, ROWS = 5;
      const PL = [
        { n: "Sunflower", cost: 50, cd: 5, hp: 6 }, { n: "Peashooter", cost: 100, cd: 5, hp: 6 }, { n: "Twin pea", cost: 150, cd: 7, hp: 6 },
        { n: "Big nut", cost: 50, cd: 20, hp: 34 }, { n: "Frost pea", cost: 150, cd: 7, hp: 6 }, { n: "Cherry", cost: 125, cd: 30, hp: 1 }
      ];
      const G = { dmg: 2, hpm: 1, sunv: 25, cdm: 1, shower: 9 };
      const grid = []; for (let r = 0; r < ROWS; r++) grid.push(new Array(COLS).fill(null));
      const mowers = []; for (let r = 0; r < ROWS; r++) mowers.push({ x: OX - 34, used: false, on: false });
      let sun = g.by(150, 100, 75), sel = 1, blobs = [], peas = [], suns = [], wave = 0, left = [], spT = 0, clear = false, skyT = 5, cds = [0, 0, 0, 0, 0, 0], total = 1, rings = [];
      const bg = pre(W, H, q => {
        q.fillStyle = "#2f6b2f"; q.fillRect(0, 0, W, H);
        for (let r = 0; r < ROWS; r++) for (let cc = 0; cc < COLS; cc++) { q.fillStyle = (r + cc) % 2 ? "#6cc04a" : "#5bb03c"; q.fillRect(OX + cc * CW, OY + r * CW, CW, CW); }
        q.fillStyle = "#b5654a"; q.fillRect(0, OY - 6, OX - 40, ROWS * CW + 12); q.fillStyle = "#8a4a34"; for (let j = 0; j < 12; j++) q.fillRect(0, OY - 6 + j * 25, OX - 40, 2);
        q.fillStyle = "#9fd8ff"; q.fillRect(8, OY + 40, 26, 30); q.fillRect(8, OY + 170, 26, 30); q.fillStyle = "#4a2a1a"; q.fillRect(14, OY + 112, 24, 44);
        q.fillStyle = "#1d4a1d"; q.fillRect(0, OY + ROWS * CW + 6, W, H);
      });
      const st = () => g.status("Wave " + wave + "/8  Sun " + sun);
      const mkPool = () => [
        { n: "Sunny days", d: "Suns are worth|10 more", f() { G.sunv += 10; } },
        { n: "Pea power", d: "Peas hit harder", f() { G.dmg += 1; } },
        { n: "Fast seeds", d: "Packets recharge|30% faster", f() { G.cdm *= .7; } },
        { n: "Sun shower", d: "Suns fall faster", f() { G.shower = Math.max(4, G.shower - 2.5); } },
        { n: "Thick bark", d: "Plants get|50% more health", f() { G.hpm *= 1.5; grid.forEach(row => row.forEach(p => { if (p) { p.hp *= 1.5; p.max *= 1.5; } })); } },
        { n: "Sun stash", d: "Get 100 sun", f() { sun += 100; st(); } }
      ];
      const next = () => {
        wave++; clear = false; left = []; const n = Math.round((4 + wave * 3 + g.by(-1, 0, 2)) * (wave === 8 ? 1.3 : 1));
        for (let i = 0; i < n; i++) left.push(wave >= 4 && i % 6 === 5 ? "bucket" : wave >= 3 && i % 5 === 4 ? "run" : wave >= 2 && i % 4 === 3 ? "cone" : "norm");
        total = n; spT = wave === 1 ? 12 : 4; st(); if (wave > 1) { sun += 50; POP(g, c, W, H, "+50 sun", 60, 40, "#ffd34e"); }
      };
      const explode = (cx, cy, r) => {
        g.sfx("boom"); F.shake(10); F.burst(cx, cy, "#ff6f6f", 24, 220); F.burst(cx, cy, "#ffd34e", 14, 160); rings.push({ x: cx, y: cy, r: 10, mx: CW * 1.7, t: .35 });
        blobs.forEach(b => { if (Math.abs(b.row - r) <= 1 && Math.abs(b.x - cx) < CW * 1.6) b.hp -= 80; });
      };
      const addSun = (px, py, ty, v) => suns.push({ x: px, y: py, ty, v, age: 0 });
      const PK = i => ({ x: OX + i * 68, y: 6, w: 62, h: 50 });
      g.on(c, "pointerdown", e => {
        if (U.busy()) return; const p = pos(e);
        for (let i = suns.length - 1; i >= 0; i--) { const s = suns[i]; if (Math.hypot(s.x - p.x, s.y - p.y) < 26) { sun += s.v; suns.splice(i, 1); g.sfx("gotit"); POP(g, c, W, H, "+" + s.v, s.x, s.y, "#ffd34e"); st(); return; } }
        for (let i = 0; i < PL.length; i++) { const k = PK(i); if (p.x >= k.x && p.x <= k.x + k.w && p.y >= k.y && p.y <= k.y + k.h) { sel = i; g.sfx("click"); return; } }
        const cc = Math.floor((p.x - OX) / CW), r = Math.floor((p.y - OY) / CW);
        if (cc < 0 || cc >= COLS || r < 0 || r >= ROWS) return;
        const D = PL[sel];
        if (grid[r][cc]) { g.sfx("wrong"); return; }
        if (sun < D.cost || cds[sel] > 0) { g.sfx("wrong"); POP(g, c, W, H, sun < D.cost ? "Need " + D.cost + " sun" : "Not ready", p.x, p.y, "#ffb0b0"); return; }
        sun -= D.cost; cds[sel] = D.cd * G.cdm; grid[r][cc] = { k: sel, hp: D.hp * G.hpm, max: D.hp * G.hpm, pt: 4, cd: .6, fuse: .8 }; g.sfx("lock"); F.burst(OX + cc * CW + CW / 2, OY + r * CW + CW / 2, "#8fe38a", 8); st();
      });
      g.on(window, "keydown", e => { if (!U.busy() && e.key >= "1" && e.key <= "6") sel = +e.key - 1; });
      const drawPlant = (k, cx, cy, tm, hpf, fuse) => {
        const sq = 1 + Math.sin(tm * 3) * .04;
        if (k === 0) { for (let i = 0; i < 8; i++) { const a = i * TAU / 8 + tm * .5; dot(x, cx + Math.cos(a) * 13, cy + Math.sin(a) * 13, 6, "#ffd34e"); } dot(x, cx, cy, 11, "#8a5a2a"); dot(x, cx - 4, cy - 2, 2, "#123"); dot(x, cx + 4, cy - 2, 2, "#123"); }
        else if (k === 1 || k === 2 || k === 4) { dot(x, cx, cy, 15 * sq, k === 4 ? "#8fe0ff" : k === 2 ? "#3fbf6a" : "#6be28f"); dot(x, cx + 14, cy - 4, 7, k === 4 ? "#5ab6e0" : "#3a9a55"); if (k === 2) dot(x, cx + 2, cy - 14, 6, "#3a9a55"); dot(x, cx - 3, cy - 4, 4, "#fff"); dot(x, cx - 2, cy - 4, 2, "#123"); }
        else if (k === 3) { x.fillStyle = hpf < .4 ? "#a07a4a" : "#c08a4a"; x.beginPath(); x.ellipse(cx, cy, 17, 21, 0, 0, TAU); x.fill(); dot(x, cx - 6, cy - 5, 4, "#fff"); dot(x, cx + 6, cy - 5, 4, "#fff"); dot(x, cx - 5, cy - 4, 2, "#123"); dot(x, cx + 7, cy - 4, 2, "#123"); if (hpf < .7) { x.strokeStyle = "#5a3a1a"; x.lineWidth = 2; x.beginPath(); x.moveTo(cx - 8, cy + 6); x.lineTo(cx, cy + 12); x.lineTo(cx + 8, cy + 6); x.stroke(); } }
        else { const f = fuse < .8 && Math.floor(tm * 16) % 2; dot(x, cx - 8, cy + 4, 11, f ? "#fff" : "#ff4d6d"); dot(x, cx + 9, cy + 6, 11, f ? "#fff" : "#e0344f"); x.strokeStyle = "#3a9a3a"; x.lineWidth = 3; x.beginPath(); x.moveTo(cx - 8, cy - 6); x.lineTo(cx, cy - 18); x.lineTo(cx + 9, cy - 4); x.stroke(); }
      };
      next();
      g.loop((dt, t) => {
        if (!U.open()) {
          for (let i = 0; i < 6; i++) cds[i] = Math.max(0, cds[i] - dt);
          skyT -= dt; if (skyT <= 0) { skyT = G.shower * g.rf(.8, 1.2); addSun(g.rf(OX + 20, OX + COLS * CW - 20), -10, g.rf(OY + 30, OY + ROWS * CW - 20), G.sunv); }
          if (left.length) { spT -= dt; if (spT <= 0) { spT = Math.max(1.5, g.by(5, 4, 3.2) - wave * .3) * g.rf(.7, 1.2); const k = left.shift(), hp = { norm: 10, cone: 22, bucket: 40, run: 8 }[k] * g.by(.85, 1, 1.15); blobs.push({ type: k, row: g.ri(0, ROWS - 1), x: OX + COLS * CW + 8, hp, max: hp, sp: g.by(10, 13, 16) * (k === "run" ? 1.9 : 1) * g.rf(.9, 1.1), slow: 0, fl: 0, ph: g.rf(0, 6) }); } }
          for (let r = 0; r < ROWS; r++) for (let cc = 0; cc < COLS; cc++) {
            const p = grid[r][cc]; if (!p) continue; const cx = OX + cc * CW + CW / 2, cy = OY + r * CW + CW / 2;
            if (p.k === 0) { p.pt -= dt; if (p.pt <= 0) { p.pt = 9; addSun(cx + g.rf(-12, 12), cy - 16, cy + 14, G.sunv); } }
            else if (p.k === 1 || p.k === 2 || p.k === 4) {
              p.cd -= dt;
              if (p.cd <= 0 && blobs.some(b => b.row === r && b.x > cx - 10 && b.x < W + 5)) {
                p.cd = p.k === 4 ? 1.6 : 1.4; peas.push({ x: cx + 18, row: r, y: cy - 4, dmg: p.k === 4 ? G.dmg * .8 : G.dmg, ice: p.k === 4 }); if (p.k === 2) peas.push({ x: cx + 2, row: r, y: cy - 4, dmg: G.dmg, ice: false }); g.sfx("tick");
              }
            } else if (p.k === 5) { p.fuse -= dt; if (p.fuse <= 0) { explode(cx, cy, r); grid[r][cc] = null; } }
          }
          for (let i = peas.length - 1; i >= 0; i--) {
            const q = peas[i]; q.x += 230 * dt; if (q.x > W + 10) { peas.splice(i, 1); continue; }
            const b = blobs.find(o => o.row === q.row && Math.abs(o.x - q.x) < 14);
            if (b) { b.hp -= q.dmg; b.fl = .1; if (q.ice) b.slow = 2.5; F.burst(q.x, q.y, q.ice ? "#bfefff" : "#b6ffcb", 4, 80); g.sfx("pop"); peas.splice(i, 1); }
          }
          const eat = g.by(2.5, 3, 4);
          for (let i = blobs.length - 1; i >= 0; i--) {
            const b = blobs[i];
            if (b.hp <= 0) { blobs.splice(i, 1); g.add(3); g.sfx("splash"); F.burst(b.x, OY + b.row * CW + CW / 2, "#7bd35a", 12); continue; }
            b.slow -= dt; b.fl -= dt;
            const front = b.x - 12, cc = Math.floor((front - OX) / CW), pl = cc >= 0 && cc < COLS ? grid[b.row][cc] : null;
            if (pl && front <= OX + (cc + 1) * CW - 6) { pl.hp -= eat * dt; if (pl.hp <= 0) { grid[b.row][cc] = null; F.burst(OX + cc * CW + CW / 2, OY + b.row * CW + CW / 2, "#8fe38a", 10); g.sfx("wrong"); } }
            else b.x -= b.sp * (b.slow > 0 ? .5 : 1) * dt;
            if (b.x < OX - 4) { const m = mowers[b.row]; if (!m.used) { m.used = m.on = true; g.sfx("rumble"); } else if (!m.on && b.x < OX - 24) { g.over("The blobs reached your house on wave " + wave); return false; } }
          }
          mowers.forEach((m, r) => {
            if (!m.on) return; m.x += 320 * dt; blobs.forEach(b => { if (b.row === r && Math.abs(b.x - m.x) < 28) b.hp = -1; }); if (m.x > W + 40) m.on = false;
          });
          for (let i = suns.length - 1; i >= 0; i--) { const s = suns[i]; if (s.y < s.ty) s.y = Math.min(s.ty, s.y + 55 * dt); else { s.age += dt; if (s.age > 7) { suns.splice(i, 1); sun += s.v; st(); } } }
          if (!left.length && !blobs.length && !clear) {
            clear = true; g.add(10 * wave);
            if (wave >= 8) { g.win("Your garden is safe!"); return false; }
            U.show(mkPool(), "Wave " + wave + " done! Pick a garden boost", next);
          }
        }
        F.begin(dt); x.drawImage(bg, 0, 0, W, H);
        mowers.forEach((m, r) => { if (m.used && !m.on) return; const my = OY + r * CW + CW / 2; x.fillStyle = "#e0344f"; x.beginPath(); x.roundRect(m.x - 14, my - 8, 28, 16, 4); x.fill(); dot(x, m.x - 8, my + 9, 5, "#333"); dot(x, m.x + 8, my + 9, 5, "#333"); x.fillStyle = "#ccc"; x.fillRect(m.x + 12, my - 4, 6, 8); });
        for (let r = 0; r < ROWS; r++) for (let cc = 0; cc < COLS; cc++) { const p = grid[r][cc]; if (!p) continue; const cx = OX + cc * CW + CW / 2, cy = OY + r * CW + CW / 2; drawPlant(p.k, cx, cy, t + cc, p.hp / p.max, p.fuse); if (p.hp < p.max && p.k !== 5) bar(x, cx - 14, cy + 22, 28, 4, p.hp / p.max, "#ff6f6f"); }
        blobs.forEach(b => {
          const by = OY + b.row * CW + CW / 2 + 8, col = b.fl > 0 ? "#fff" : b.type === "run" ? "#c7e84a" : "#7bd35a"; blob(x, b.x, by, b.type === "run" ? 12 : 15, col, t + b.ph);
          if (b.type === "cone") { x.fillStyle = "#ff8a2a"; x.beginPath(); x.moveTo(b.x - 9, by - 10); x.lineTo(b.x, by - 34); x.lineTo(b.x + 9, by - 10); x.closePath(); x.fill(); }
          if (b.type === "bucket") { x.fillStyle = "#99a2b0"; x.fillRect(b.x - 10, by - 28, 20, 18); x.fillStyle = "#c8d0dc"; x.fillRect(b.x - 12, by - 12, 24, 4); }
          if (b.slow > 0) dot(x, b.x, by, 16, "rgba(168,232,255,.35)");
        });
        peas.forEach(q => dot(x, q.x, q.y, 5, q.ice ? "#bfefff" : "#9aff8a"));
        rings.forEach(r => { r.t -= dt; r.r += (r.mx - r.r) * Math.min(1, dt * 12); x.globalAlpha = Math.max(0, r.t * 3); x.strokeStyle = "#ffd34e"; x.lineWidth = 4; x.beginPath(); x.arc(r.x, r.y, r.r, 0, TAU); x.stroke(); x.globalAlpha = 1; }); rings = rings.filter(r => r.t > 0);
        suns.forEach(s => { dot(x, s.x, s.y, 20, "rgba(255,230,100,.3)"); dot(x, s.x, s.y, 14, "#ffd34e"); dot(x, s.x, s.y, 8, "#fff3a0"); });
        F.end(dt);
        T(x, "Sun", 48, 14, 14, "#fff"); T(x, "" + sun, 48, 36, 22, "#ffd34e");
        for (let i = 0; i < PL.length; i++) {
          const k = PK(i), D = PL[i], ok = sun >= D.cost && cds[i] <= 0;
          x.fillStyle = ok ? "#e9f5d8" : "#8a9a7a"; x.beginPath(); x.roundRect(k.x, k.y, k.w, k.h, 8); x.fill(); x.strokeStyle = i === sel ? "#ffd34e" : "#3a5a2a"; x.lineWidth = i === sel ? 4 : 2; x.stroke();
          x.save(); x.beginPath(); x.rect(k.x, k.y, k.w, k.h); x.clip(); x.translate(k.x + k.w / 2 - 28, k.y + 1); x.scale(.55, .55); drawPlant(i, 50, 38, t, 1, 1); x.restore();
          T(x, D.n, k.x + k.w / 2, k.y + 12, 9, "#234"); T(x, "" + D.cost, k.x + k.w / 2, k.y + 41, 12, "#7a5a00");
          if (cds[i] > 0) { x.fillStyle = "rgba(0,0,0,.5)"; x.fillRect(k.x, k.y, k.w, k.h * cds[i] / (D.cd * G.cdm)); }
          T(x, "" + (i + 1), k.x + 8, k.y + 42, 9, "#456");
        }
        if (wave === 1 && t < 14) T(x, "Plant sunflowers first, then peashooters. Blobs arrive soon!", W / 2, OY + ROWS * CW + 28, 14, "#fff");
        else T(x, "Wave " + wave + "/8", 60, OY + ROWS * CW + 28, 14, "#fff");
        bar(x, 130, OY + ROWS * CW + 21, 300, 12, total ? 1 - (left.length + blobs.length) / total : 0, "#ffd34e");
        U.draw(dt);
      });
    }
  });

  // ---- Laser Mirror Defence: bend a laser with mirrors to zap marching robots ----
  B.add({
    id: "s8-laser-mirrors", name: "Laser Mirror Defence", ages: [11, 20], cat: "Action", color: "#ff4de0", icon: "/",
    desc: "Turn mirrors to bend your laser through the robots marching on your lab.", controls: "Tap or click a mirror to turn it: off, then / then \\. The beam burns every robot it touches.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos);
      const CS = 40, NC = 16, NR = 10, mir = {}, ems = [5], extra = [9, 12, 14], rowsM = [2, 5, 8];
      const G = { dps: 5, slow: 1, burn: false };
      let lab = g.by(14, 10, 8), labMax = lab, wave = 0, q = [], qt = 0, en = [], clear = false, tapped = false, beam = { segs: [], cells: new Set() };
      const addCol = cc => rowsM.forEach(r => { mir[cc * 100 + r] = { c: cc, r, t: 0 }; });
      addCol(3); addCol(6);
      const bg = pre(W, H, z => {
        z.fillStyle = "#14102a"; z.fillRect(0, 0, W, H); z.strokeStyle = "rgba(160,120,255,.12)"; z.lineWidth = 1;
        for (let i = 0; i <= NC; i++) { z.beginPath(); z.moveTo(i * CS, 0); z.lineTo(i * CS, H); z.stroke(); } for (let j = 0; j <= NR; j++) { z.beginPath(); z.moveTo(0, j * CS); z.lineTo(W, j * CS); z.stroke(); }
        z.fillStyle = "#2a2358"; z.fillRect(0, 0, CS, H); z.fillStyle = "#3a3078"; z.fillRect(CS - 6, 0, 6, H);
      });
      const st = () => g.status("Wave " + wave + "/10  Lab " + lab + "/" + labMax);
      const mkPool = () => {
        const p = [
          { n: "Brighter beam", d: "Laser burns|50% faster", f() { G.dps *= 1.5; } },
          { n: "Afterburn", d: "Robots keep|burning after a hit", f() { G.burn = true; } },
          { n: "Chill field", d: "Robots walk|20% slower", f() { G.slow *= .8; } },
          { n: "Lab repair", d: "+2 lab health|and heal 4", f() { labMax += 2; lab = Math.min(labMax, lab + 4); st(); } }
        ];
        if (extra.length) p.push({ n: "More mirrors", d: "A new column|of mirrors", f() { addCol(extra.shift()); } });
        if (ems.length < 3) p.push({ n: "Twin laser", d: "A second laser|fires from the lab", f() { ems.push(ems.includes(2) ? 8 : 2); } });
        return p;
      };
      const next = () => {
        wave++; clear = false; q = []; qt = 1; const n = 8 + wave * 3 + g.by(-2, 0, 3);
        for (let i = 0; i < n; i++) q.push(wave >= 3 && i % 5 === 4 ? "fast" : wave >= 2 && i % 4 === 3 ? "tank" : "bot");
        st();
      };
      g.on(c, "pointerdown", e => {
        if (U.busy()) return; const p = pos(e), m = mir[Math.floor(p.x / CS) * 100 + Math.floor(p.y / CS)];
        if (m) { m.t = (m.t + 1) % 3; tapped = true; g.sfx(m.t ? "flip" : "click"); }
      });
      const trace = () => {
        const segs = [], cells = new Set();
        for (const er of ems) {
          const pts = [{ x: 20, y: er * CS + 20 }]; let cx = 0, cr = er, dx = 1, dy = 0, out = false;
          for (let s = 0; s < 120; s++) {
            cx += dx; cr += dy;
            if (cx < 0 || cx >= NC || cr < 0 || cr >= NR) { pts.push({ x: (cx - dx) * CS + 20 + dx * 20, y: (cr - dy) * CS + 20 + dy * 20 }); out = true; break; }
            cells.add(cx * 100 + cr);
            const m = mir[cx * 100 + cr];
            if (m && m.t) { pts.push({ x: cx * CS + 20, y: cr * CS + 20 }); if (m.t === 1) { const ndx = -dy, ndy = -dx; dx = ndx; dy = ndy; } else { const ndx = dy, ndy = dx; dx = ndx; dy = ndy; } }
          }
          if (!out) pts.push({ x: cx * CS + 20, y: cr * CS + 20 });
          segs.push(pts);
        }
        return { segs, cells };
      };
      next();
      g.loop((dt, t) => {
        beam = trace();
        if (!U.open()) {
          qt -= dt;
          if (q.length && qt <= 0) {
            const k = q.shift(), hp = k === "tank" ? 20 + wave * 3 : k === "fast" ? 3 + wave * .5 : 5 + wave; qt = Math.max(.5, g.by(2, 1.6, 1.3) - wave * .08) * g.rf(.7, 1.3);
            en.push({ type: k, x: W + 15, r: g.ri(0, NR - 1), hp, max: hp, sp: (k === "tank" ? 11 : k === "fast" ? 40 : 17 + wave) * g.by(.9, 1, 1.15), fl: 0, burn: 0, ph: g.rf(0, 6) });
          }
          for (let i = en.length - 1; i >= 0; i--) {
            const e = en[i];
            if (e.hp <= 0) { en.splice(i, 1); const pts = e.type === "tank" ? 8 : e.type === "fast" ? 4 : 2; g.add(pts); g.sfx("boom"); F.burst(e.x, e.r * CS + 20, "#ff9f43", 14, 150); POP(g, c, W, H, "+" + pts, e.x, e.r * CS + 20, "#ffe9a0"); continue; }
            e.fl -= dt; if (e.burn > 0) { e.burn -= dt; e.hp -= G.dps * .35 * dt; }
            if (beam.cells.has(Math.floor(e.x / CS) * 100 + e.r)) { e.hp -= G.dps * dt; e.fl = .08; if (G.burn) e.burn = 2; if (Math.random() < dt * 20) F.burst(e.x, e.r * CS + 20, "#ffb3f2", 2, 80); }
            e.x -= e.sp * G.slow * dt;
            if (e.x < 46) { lab -= e.type === "tank" ? 3 : 1; en.splice(i, 1); F.shake(8); g.sfx("wrong"); F.burst(46, e.r * CS + 20, "#ff6f6f", 14); st(); if (lab <= 0) { g.over("Your lab was overrun on wave " + wave); return false; } }
          }
          if (!q.length && !en.length && !clear) {
            clear = true; g.add(10 * wave);
            if (wave >= 10) { g.win("The lab is safe! Laser master!"); return false; }
            U.show(mkPool(), "Wave " + wave + " cleared! Upgrade the lab", next);
          }
        }
        F.begin(dt); x.drawImage(bg, 0, 0, W, H);
        for (const k in mir) {
          const m = mir[k], cx = m.c * CS + 20, cy = m.r * CS + 20;
          x.fillStyle = "rgba(120,90,220,.18)"; x.fillRect(m.c * CS + 3, m.r * CS + 3, CS - 6, CS - 6); x.strokeStyle = "rgba(180,150,255,.5)"; x.lineWidth = 1; x.strokeRect(m.c * CS + 3, m.r * CS + 3, CS - 6, CS - 6);
          if (m.t === 0) dot(x, cx, cy, 4, "rgba(255,255,255,.4)");
          else { x.strokeStyle = "#d8f4ff"; x.lineWidth = 6; x.lineCap = "round"; x.beginPath(); if (m.t === 1) { x.moveTo(cx - 13, cy + 13); x.lineTo(cx + 13, cy - 13); } else { x.moveTo(cx - 13, cy - 13); x.lineTo(cx + 13, cy + 13); } x.stroke(); x.strokeStyle = "#7acbff"; x.lineWidth = 2; x.stroke(); x.lineCap = "butt"; }
        }
        beam.segs.forEach(pts => {
          [[14, "rgba(255,77,224,.22)"], [7, "rgba(255,120,235,.6)"], [2.5, "#fff"]].forEach(([w, col]) => { x.strokeStyle = col; x.lineWidth = w; x.lineJoin = "round"; x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y)); x.stroke(); });
        });
        ems.forEach(er => { dot(x, 20, er * CS + 20, 13, "#ff4de0"); dot(x, 20, er * CS + 20, 7, "#fff"); });
        en.forEach(e => { const ey = e.r * CS + 20, hit = e.fl > 0; robo(x, e.x, ey + 2, e.type === "tank" ? 15 : e.type === "fast" ? 9 : 12, hit ? "#fff" : e.type === "tank" ? "#8f6bff" : e.type === "fast" ? "#ffd34e" : "#8aa0b8", t + e.ph, hit); if (e.burn > 0) dot(x, e.x, ey - 14, 4 + Math.sin(t * 20) * 1.5, "#ff8a2a"); if (e.hp < e.max) bar(x, e.x - 14, ey - 24, 28, 4, e.hp / e.max, "#ff6f6f"); });
        F.end(dt);
        if (!tapped && t < 20) { const m = mir[3 * 100 + 5]; x.globalAlpha = .6 + .4 * Math.sin(t * 5); T(x, "Tap a mirror!", m.c * CS + 20, m.r * CS - 14, 14, "#ffd34e"); x.globalAlpha = 1; }
        bar(x, 100, 6, 200, 8, lab / labMax, lab / labMax > .4 ? "#6be28f" : "#ff6f6f"); T(x, "LAB", 80, 10, 11, "#fff");
        U.draw(dt);
      });
    }
  });

  // ---- Hero vs Robot Swarm: survive, grab gems, level up ----
  B.add({
    id: "s8-hero-swarm", name: "Hero vs Robot Swarm", ages: [9, 18], cat: "Action", color: "#ffd34e", icon: "H",
    desc: "Survive the robot swarm! Spin blades, zap bots, grab gems and level up.", controls: "WASD/arrows or drag to move. Your hero attacks by itself. Pick an upgrade each time you level up.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), F = FX(g, x), U = UPG(g, c, x, W, H, pos), I = IN(g, c, pos);
      const P = { x: W / 2, y: H / 2, hp: 6, max: 6, sp: 130, blades: 2, bang: 0, brad: 44, bdmg: 1, rate: .7, cd: 0, shots: 1, sdmg: 1, mag: 50, nova: 0, nt: 5, inv: 0, xp: 0, lvl: 1, need: 5 };
      const TOT = g.by(80, 100, 120);
      let bots = [], bul = [], gems = [], rings = [], el = 0, spT = 1, wv = 0, banner = 0, lastS = -1;
      const bg = pre(W, H, q => {
        q.fillStyle = "#17243f"; q.fillRect(0, 0, W, H); q.strokeStyle = "rgba(120,170,255,.1)"; q.lineWidth = 1;
        for (let i = 0; i < W; i += 40) { q.beginPath(); q.moveTo(i, 0); q.lineTo(i, H); q.stroke(); } for (let j = 0; j < H; j += 40) { q.beginPath(); q.moveTo(0, j); q.lineTo(W, j); q.stroke(); }
      });
      const st = () => { const s = Math.max(0, Math.ceil(TOT - el)); g.status("Time left " + Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2) + "  Lv " + P.lvl + "  Hearts " + P.hp + "/" + P.max); };
      const pool = [
        { n: "Extra blade", d: "One more spinning|blade", f() { P.blades++; } },
        { n: "Long blades", d: "Blades orbit wider|and hit harder", f() { P.brad += 12; P.bdmg += .4; } },
        { n: "Rapid blaster", d: "Blaster fires|25% faster", f() { P.rate *= .75; } },
        { n: "Twin blasters", d: "One more bullet|per shot", f() { P.shots++; } },
        { n: "Magnet", d: "Gems fly to you|from farther", f() { P.mag += 50; } },
        { n: "Big heart", d: "+2 hearts|and heal 2", f() { P.max += 2; P.hp = Math.min(P.max, P.hp + 2); st(); } },
        { n: "Speed boots", d: "Run 15% faster", f() { P.sp *= 1.15; } },
        { n: "Shock nova", d: "Pulses blast bots|around you", f() { P.nova++; } }
      ];
      const spawn = (big, ang) => {
        if (bots.length > 150) return; const a = ang === undefined ? g.rf(0, TAU) : ang, d = 400, px = g.clamp(W / 2 + Math.cos(a) * d, -20, W + 20), py = g.clamp(H / 2 + Math.sin(a) * d, -20, H + 20);
        const hp = big ? 12 + wv * 4 : 1 + (el > 45 ? 1 : 0) + (el > 90 ? 1 : 0);
        bots.push({ x: px, y: py, hp, r: big ? 16 : 8, big, sp: (big ? 38 : g.rf(40, 55)) * (1 + el / 200) * g.by(.9, 1, 1.1), fl: 0, bh: 0 });
      };
      st();
      g.loop((dt, t) => {
        if (!U.open()) {
          el += dt; P.inv -= dt; P.cd -= dt; banner -= dt; P.bang += dt * 3.2;
          const nw = Math.floor(el / 20) + 1;
          if (nw !== wv) { wv = nw; banner = 2; g.sfx("rumble"); const n = 8 + wv * 4; for (let i = 0; i < n; i++) spawn(false, i * TAU / n); spawn(true); if (wv > 1) F.shake(6); }
          spT -= dt; if (spT <= 0) { spawn(false); spT = Math.max(.14, g.by(.65, .5, .38) / (1 + el / 40)); }
          const d = I.dir(P.x, P.y); P.x = g.clamp(P.x + d.x * P.sp * dt, 12, W - 12); P.y = g.clamp(P.y + d.y * P.sp * dt, 12, H - 12);
          const tg = near(bots, P.x, P.y);
          if (tg && P.cd <= 0) { P.cd = P.rate; const a = Math.atan2(tg.y - P.y, tg.x - P.x); g.sfx("tick"); for (let i = 0; i < P.shots; i++) { const aa = a + (i - (P.shots - 1) / 2) * .16; bul.push({ x: P.x, y: P.y, vx: Math.cos(aa) * 400, vy: Math.sin(aa) * 400, life: 1 }); } }
          if (P.nova > 0) { P.nt -= dt; if (P.nt <= 0) { P.nt = Math.max(2.5, 8 - P.nova * 1.2); const rr = 70 + P.nova * 12; rings.push({ x: P.x, y: P.y, r: 10, mx: rr, t: .4 }); g.sfx("boom"); bots.forEach(b => { if (Math.hypot(b.x - P.x, b.y - P.y) < rr + b.r) { b.hp -= 3 + P.nova; b.fl = .1; } }); } }
          for (let i = bul.length - 1; i >= 0; i--) {
            const b = bul[i]; b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
            let dead = b.life <= 0 || b.x < -10 || b.x > W + 10 || b.y < -10 || b.y > H + 10;
            if (!dead) for (const o of bots) if (Math.abs(o.x - b.x) < o.r + 4 && Math.abs(o.y - b.y) < o.r + 4) { o.hp -= P.sdmg; o.fl = .1; dead = true; F.burst(b.x, b.y, "#fff3a0", 3, 80); break; }
            if (dead) bul.splice(i, 1);
          }
          const bl = []; for (let k = 0; k < P.blades; k++) { const a = P.bang + k * TAU / P.blades; bl.push({ x: P.x + Math.cos(a) * P.brad, y: P.y + Math.sin(a) * P.brad, a }); }
          for (let i = bots.length - 1; i >= 0; i--) {
            const b = bots[i];
            if (b.hp <= 0) {
              bots.splice(i, 1); g.add(b.big ? 10 : 1); g.sfx("pop"); F.burst(b.x, b.y, b.big ? "#ffb347" : "#9fb0c8", b.big ? 20 : 5, 120);
              for (let k = 0; k < (b.big ? 5 : 1); k++) gems.push({ x: b.x + g.rf(-8, 8), y: b.y + g.rf(-8, 8) });
              if (b.big) { P.hp = Math.min(P.max, P.hp + 1); st(); }
              continue;
            }
            b.fl -= dt; b.bh -= dt; const a = Math.atan2(P.y - b.y, P.x - b.x); b.x += Math.cos(a) * b.sp * dt; b.y += Math.sin(a) * b.sp * dt;
            if (b.bh <= 0) for (const k of bl) if (Math.hypot(b.x - k.x, b.y - k.y) < b.r + 8) { b.hp -= P.bdmg; b.bh = .25; b.fl = .1; b.x += Math.cos(k.a) * 12; b.y += Math.sin(k.a) * 12; g.sfx("clink"); break; }
            if (P.inv <= 0 && Math.hypot(P.x - b.x, P.y - b.y) < b.r + 10) {
              P.hp -= b.big ? 2 : 1; P.inv = 1; F.shake(8); g.sfx("wrong"); F.burst(P.x, P.y, "#ff9f9f", 12); st();
              if (P.hp <= 0) { g.over("The swarm got you after " + Math.floor(el) + " seconds"); return false; }
            }
          }
          for (let i = gems.length - 1; i >= 0; i--) {
            const m = gems[i], dd = Math.hypot(P.x - m.x, P.y - m.y) || 1;
            if (dd < P.mag) { m.x += (P.x - m.x) / dd * 260 * dt; m.y += (P.y - m.y) / dd * 260 * dt; }
            if (dd < 13) { gems.splice(i, 1); P.xp++; g.sfx("tick"); }
          }
          if (P.xp >= P.need) { P.xp -= P.need; P.lvl++; P.need = 5 + P.lvl * 3; st(); U.show(pool, "Level " + P.lvl + "! Pick an upgrade"); }
          const sec = Math.ceil(TOT - el); if (sec !== lastS) { lastS = sec; st(); }
          if (el >= TOT) { g.add(50); g.win("You survived the swarm!"); return false; }
        }
        F.begin(dt); x.drawImage(bg, 0, 0, W, H);
        gems.forEach(m => { x.fillStyle = "#6bf0ff"; x.beginPath(); x.moveTo(m.x, m.y - 6); x.lineTo(m.x + 5, m.y); x.lineTo(m.x, m.y + 6); x.lineTo(m.x - 5, m.y); x.closePath(); x.fill(); });
        bots.forEach(b => {
          if (b.big) robo(x, b.x, b.y, 16, b.fl > 0 ? "#fff" : "#ff8a2a", t, b.fl > 0);
          else { x.fillStyle = b.fl > 0 ? "#fff" : "#8aa0b8"; x.fillRect(b.x - 7, b.y - 7, 14, 14); x.fillStyle = "#223"; x.fillRect(b.x - 5, b.y - 4, 10, 5); dot(x, b.x - 2, b.y - 2, 1.6, "#ff4d4d"); dot(x, b.x + 2, b.y - 2, 1.6, "#ff4d4d"); }
        });
        bul.forEach(b => dot(x, b.x, b.y, 3.5, "#fff3a0"));
        if (P.inv <= 0 || Math.floor(t * 14) % 2) {
          x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(P.x, P.y + 12, 12, 4, 0, 0, TAU); x.fill();
          x.fillStyle = "#e0245e"; x.beginPath(); x.moveTo(P.x - 8, P.y - 2); x.lineTo(P.x - 14 - Math.sin(t * 9) * 3, P.y + 14); x.lineTo(P.x + 8, P.y + 4); x.fill();
          dot(x, P.x, P.y, 11, "#4cc3ff"); dot(x, P.x, P.y - 9, 7, "#f5d0b0"); x.fillStyle = "#1c1c2e"; x.fillRect(P.x - 7, P.y - 11, 14, 4); dot(x, P.x, P.y + 2, 3, "#ffd34e");
        }
        for (let k = 0; k < P.blades; k++) { const a = P.bang + k * TAU / P.blades; x.save(); x.translate(P.x + Math.cos(a) * P.brad, P.y + Math.sin(a) * P.brad); x.rotate(a + t * 8); x.fillStyle = "rgba(150,255,255,.35)"; x.fillRect(-7, -12, 14, 24); x.fillStyle = "#cffcff"; x.fillRect(-3, -10, 6, 20); x.restore(); }
        rings.forEach(r => { r.t -= dt; r.r += (r.mx - r.r) * Math.min(1, dt * 12); x.globalAlpha = Math.max(0, r.t * 2.5); x.strokeStyle = "#6bf0ff"; x.lineWidth = 5; x.beginPath(); x.arc(r.x, r.y, r.r, 0, TAU); x.stroke(); x.globalAlpha = 1; }); rings = rings.filter(r => r.t > 0);
        F.end(dt);
        bar(x, 0, 0, W, 8, P.xp / P.need, "#6bf0ff"); bar(x, 0, H - 6, W, 6, el / TOT, "#ffd34e");
        if (banner > 0) { x.globalAlpha = Math.min(1, banner); T(x, "WAVE " + wv + (wv > 1 ? " - the swarm grows!" : " - survive!"), W / 2, 50, 26, "#ffd34e"); x.globalAlpha = 1; }
        U.draw(dt);
      });
    }
  });
})();
