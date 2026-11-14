// Break Time Games: set 12 (Builders & world makers: 12 creative build games)
(function () {
  const B = window.BreakGames; if (!B) return;
  const SW = ["#ff5a5f", "#ff9f1c", "#ffd23f", "#6be28f", "#2ec4b6", "#4cc3ff", "#7b6cff", "#ff6fb5", "#a0522d", "#f2f2f2"];
  // toolbar of real buttons; items: { t, id, col, sw, fn }
  const bar = (g, items) => {
    const d = g.html("", ""), els = {};
    d.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:6px;justify-content:center;align-items:center";
    items.forEach(it => {
      const b = document.createElement("button"); b.type = "button"; b.className = "bg-btn"; b.innerHTML = it.t || "";
      if (it.col) b.style.background = it.col;
      if (it.sw) { b.style.width = "38px"; b.style.height = "38px"; b.style.minWidth = "38px"; b.style.padding = "0"; b.style.borderRadius = "50%"; }
      b.onclick = () => { g.sfx("click"); if (it.fn) it.fn(b); };
      d.appendChild(b); if (it.id !== undefined) els[it.id] = b;
    });
    return els;
  };
  const hl = (els, cur) => { for (const k in els) { const on = String(k) === String(cur); els[k].style.boxShadow = on ? "0 0 0 3px #fff, 0 0 0 6px #222" : ""; els[k].style.transform = on ? "scale(1.08)" : ""; } };
  const FIN = g => ({ t: "Finish", col: "#6be28f", fn: () => g.over("Nice work!") });
  const hist = () => { const s = []; return { push: v => { s.push(JSON.stringify(v)); if (s.length > 40) s.shift(); }, pop: () => (s.length ? JSON.parse(s.pop()) : null) }; };
  const parts = () => {
    const a = [];
    return {
      add(px, py, col, n, sp) { for (let i = 0; i < (n || 8); i++) { const an = Math.random() * 6.283, s = (.3 + Math.random()) * (sp || 110); a.push({ x: px, y: py, vx: Math.cos(an) * s, vy: Math.sin(an) * s - 40, l: .5 + Math.random() * .5, col }); } },
      draw(x, dt) { for (let i = a.length - 1; i >= 0; i--) { const p = a[i]; p.l -= dt; if (p.l <= 0) { a.splice(i, 1); continue; } p.vy += 260 * dt; p.x += p.vx * dt; p.y += p.vy * dt; x.globalAlpha = Math.min(1, p.l * 2); x.fillStyle = p.col; x.fillRect(p.x - 2, p.y - 2, 4, 4); } x.globalAlpha = 1; }
    };
  };
  const fpop = (g, cv, W, H, txt, px, py, col) => g.pop(txt, cv.offsetLeft + px * cv.clientWidth / W, cv.offsetTop + py * cv.clientHeight / H, col);
  const cloud = (x, cx, cy, s) => { x.fillStyle = "rgba(255,255,255,.85)"; [[0, 0, 14], [16, -6, 18], [34, 0, 13]].forEach(a => { x.beginPath(); x.arc(cx + a[0] * s, cy + a[1] * s, a[2] * s, 0, 7); x.fill(); }); };
  const sky = (x, W, H, a, b) => { const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, a); gr.addColorStop(1, b); x.fillStyle = gr; x.fillRect(0, 0, W, H); };
  const txt = (x, s, px, py, sz, col, al) => { x.font = "bold " + (sz || 18) + "px system-ui, sans-serif"; x.textAlign = al || "center"; x.textBaseline = "middle"; x.lineWidth = 4; x.strokeStyle = "rgba(0,0,0,.45)"; x.strokeText(s, px, py); x.fillStyle = col || "#fff"; x.fillText(s, px, py); };
  const dseg = (px, py, s) => { const ex = s.x2 - s.x1, ey = s.y2 - s.y1, l2 = ex * ex + ey * ey || 1; let u = ((px - s.x1) * ex + (py - s.y1) * ey) / l2; u = u < 0 ? 0 : u > 1 ? 1 : u; return Math.hypot(px - (s.x1 + ex * u), py - (s.y1 + ey * u)); };

  // ---- 1. Block City: isometric block builder ----
  B.add({
    id: "s12-blocks", name: "Block City", ages: [5, 20], cat: "Build", color: "#ff9f1c", icon: "B",
    desc: "Stack coloured blocks in 3D and spin your tiny world around.", controls: "Tap a spot to add a block. Pick Remove to take blocks away. Turn spins the view.",
    start(g) {
      const N = g.by(5, 7, 9), MAXH = g.by(4, 6, 8), { c, x, W, H, pos } = g.canvas(640, 400);
      const tw = g.by(40, 32, 26), th = tw / 2, bh = tw * .62, ox = W / 2, oy = g.by(150, 135, 120);
      const cols = SW.slice(0, g.by(5, 8, 10)), pt = parts(), hs = hist();
      let map, rot = 0, col = 0, mode = "add", hover = null, anim = {}, last = "", down = false, t = 0;
      const blank = () => Array.from({ length: N }, () => Array.from({ length: N }, () => []));
      const total = () => map.reduce((s, r) => s + r.reduce((a, q) => a + q.length, 0), 0);
      const upd = () => { g.score(total()); g.save({ N, map }); };
      const sv = g.load();
      if (sv && sv.N === N && Array.isArray(sv.map) && sv.map.length === N) map = sv.map;
      else { map = blank(); const m = (N / 2) | 0; for (let k = 0; k < 3; k++) map[m][m].push(k % cols.length); map[m + 1][m].push(1); }
      g.score(total());
      const order = []; for (let rj = 0; rj < N; rj++) for (let ri = 0; ri < N; ri++) order.push([ri, rj]);
      const orig = (ri, rj) => rot === 0 ? [ri, rj] : rot === 1 ? [rj, N - 1 - ri] : rot === 2 ? [N - 1 - ri, N - 1 - rj] : [N - 1 - rj, ri];
      const scr = (ri, rj) => [ox + (ri - rj) * tw, oy + (ri + rj) * th];
      const inHex = (px, py, cx, cy, hb) => {
        const P = [[cx, cy - th - hb], [cx + tw, cy - hb], [cx + tw, cy], [cx, cy + th], [cx - tw, cy], [cx - tw, cy - hb]]; let s = 0;
        for (let k = 0; k < 6; k++) { const a = P[k], b = P[(k + 1) % 6], cr = (b[0] - a[0]) * (py - a[1]) - (b[1] - a[1]) * (px - a[0]); if (cr !== 0) { const sg = cr > 0 ? 1 : -1; if (!s) s = sg; else if (sg !== s) return false; } }
        return true;
      };
      const find = p => { for (let k = order.length - 1; k >= 0; k--) { const [ri, rj] = order[k], [i, j] = orig(ri, rj), s = scr(ri, rj); if (inHex(p.x, p.y, s[0], s[1], map[i][j].length * bh)) return { i, j, s }; } return null; };
      const act = p => {
        const f = find(p); if (!f) return; const key = f.i + "," + f.j; if (key === last) return; last = key;
        const st = map[f.i][f.j];
        if (mode === "add") {
          if (st.length >= MAXH) { g.sfx("wrong"); fpop(g, c, W, H, "Top!", p.x, p.y, "#fff"); return; }
          hs.push(map); st.push(col); anim[key] = 1; g.sfx("note", 330 + st.length * 70); pt.add(f.s[0], f.s[1] - st.length * bh, cols[col], 10);
        } else if (st.length) { hs.push(map); const k = st.pop(); g.sfx("drop"); pt.add(f.s[0], f.s[1] - st.length * bh, cols[k] || "#ccc", 12); }
        upd();
      };
      g.on(c, "pointerdown", e => { down = true; last = ""; act(pos(e)); });
      g.on(c, "pointermove", e => { const p = pos(e); hover = find(p); if (down) act(p); });
      g.on(window, "pointerup", () => { down = false; last = ""; });
      g.on(c, "pointerleave", () => { hover = null; });
      const surprise = () => {
        hs.push(map); map = blank();
        for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if (g.rand() < .55) { const h = g.ri(1, MAXH), cc = g.ri(0, cols.length - 1); for (let k = 0; k < h; k++) map[i][j].push(g.rand() < .8 ? cc : g.ri(0, cols.length - 1)); }
        upd(); g.sfx("cheer");
      };
      const tools = bar(g, [
        { t: "Add", id: "add", fn: () => { mode = "add"; hl(tools, "add"); } },
        { t: "Remove", id: "remove", fn: () => { mode = "remove"; hl(tools, "remove"); } },
        { t: "Turn left", fn: () => { rot = (rot + 3) % 4; g.sfx("swish"); } },
        { t: "Turn right", fn: () => { rot = (rot + 1) % 4; g.sfx("swish"); } },
        { t: "Undo", fn: () => { const m = hs.pop(); if (m) { map = m; upd(); g.sfx("back"); } } },
        { t: "Clear", fn: () => { hs.push(map); map = blank(); upd(); g.sfx("boom"); } },
        { t: "Surprise me", fn: surprise },
        { t: "Save picture", fn: () => g.saveImage(c, "my-block-city") }, FIN(g)]);
      const sw = bar(g, cols.map((cc, i) => ({ sw: 1, col: cc, id: i, fn: () => { col = i; mode = "add"; hl(sw, i); hl(tools, "add"); } })));
      hl(tools, "add"); hl(sw, 0);
      const face = (pts, fill, sh) => { x.beginPath(); pts.forEach((p, k) => k ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.closePath(); x.fillStyle = fill; x.fill(); if (sh) { x.fillStyle = "rgba(0,0,0," + sh + ")"; x.fill(); } x.strokeStyle = "rgba(0,0,0,.25)"; x.lineWidth = 1; x.stroke(); };
      const cube = (cx, cy, k, colr) => { const L = cy - k * bh, T = L - bh; face([[cx, T - th], [cx + tw, T], [cx, T + th], [cx - tw, T]], colr, 0); face([[cx - tw, T], [cx, T + th], [cx, L + th], [cx - tw, L]], colr, .22); face([[cx + tw, T], [cx, T + th], [cx, L + th], [cx + tw, L]], colr, .38); };
      g.loop((dt, tt) => {
        t = tt; sky(x, W, H, "#7fd4ff", "#e8f7ff");
        x.fillStyle = "#ffe36b"; x.beginPath(); x.arc(570, 60, 30 + Math.sin(t * 2) * 2, 0, 7); x.fill();
        cloud(x, ((t * 14) % 760) - 100, 70, 1); cloud(x, ((t * 9 + 300) % 760) - 100, 135, .8);
        for (const [ri, rj] of order) { const s = scr(ri, rj); x.beginPath(); x.moveTo(s[0], s[1] - th); x.lineTo(s[0] + tw, s[1]); x.lineTo(s[0], s[1] + th); x.lineTo(s[0] - tw, s[1]); x.closePath(); x.fillStyle = (ri + rj) % 2 ? "#79d36b" : "#8be07c"; x.fill(); }
        if (hover) { const h = map[hover.i][hover.j].length, s = hover.s, T = s[1] - h * bh; x.beginPath(); x.moveTo(s[0], T - th); x.lineTo(s[0] + tw, T); x.lineTo(s[0], T + th); x.lineTo(s[0] - tw, T); x.closePath(); x.lineWidth = 3; x.strokeStyle = mode === "add" ? "#fff" : "#ff4d4d"; x.stroke(); }
        for (const [ri, rj] of order) {
          const [i, j] = orig(ri, rj), st = map[i][j], s = scr(ri, rj), key = i + "," + j, a = anim[key] || 0;
          for (let k = 0; k < st.length; k++) cube(s[0], s[1], k + (k === st.length - 1 ? a * 1.5 : 0), cols[st[k]] || "#ccc");
          if (a > 0) anim[key] = Math.max(0, a - dt * 3);
        }
        pt.draw(x, dt);
        if (!total()) txt(x, "Tap the grass to place a block!", W / 2, 360, 20);
      });
    }
  });

  // ---- 2. Tiny City Planner ----
  B.add({
    id: "s12-city", name: "Tiny City Planner", ages: [5, 20], cat: "Build", color: "#4cc3ff", icon: "C",
    desc: "Lay out roads, houses and parks. Little cars and people bring it to life.", controls: "Pick a piece, then tap or drag on the grid. Erase removes pieces.",
    start(g) {
      const cs = g.by(64, 40, 32), COLS = 640 / cs, ROWS = g.by(6, 10, 12), H = ROWS * cs, { c, x, W, pos } = g.canvas(640, H);
      const TYPE = { road: 1, house: 2, park: 3, shop: 4, tree: 5, pond: 6, erase: 0 }, D = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      const pt = parts(), hs = hist(), HC = ["#ff8a65", "#ffd54f", "#81c784", "#4fc3f7", "#ba68c8", "#f48fb1"];
      let T = new Array(COLS * ROWS).fill(0), V = new Array(COLS * ROWS).fill(0), tool = "road", down = false, night = 0, nightOn = false, cars = [], folks = [], acc = 0, tt = 0;
      const typ = (q, r) => (q < 0 || r < 0 || q >= COLS || r >= ROWS ? 0 : T[r * COLS + q]);
      const upd = () => { g.score(T.filter(v => v).length); g.save({ cs, T, V }); };
      const sv = g.load();
      if (sv && sv.cs === cs && sv.T && sv.T.length === T.length) { T = sv.T; V = sv.V || V; }
      else {
        const rr = (ROWS / 2) | 0; for (let q = 1; q < COLS - 1; q++) T[rr * COLS + q] = 1;
        for (let q = 2; q < COLS - 1; q += 2) { T[(rr - 1) * COLS + q] = 2; V[(rr - 1) * COLS + q] = q % 6; }
        for (let q = 2; q < 6 && q < COLS - 1; q++) T[(rr + 1) * COLS + q] = 3; T[(rr + 1) * COLS + COLS - 3] = 5;
      }
      g.score(T.filter(v => v).length);
      const cellAt = p => { const q = Math.floor(p.x / cs), r = Math.floor(p.y / cs); return q >= 0 && r >= 0 && q < COLS && r < ROWS ? r * COLS + q : -1; };
      const paint = p => {
        const i = cellAt(p); if (i < 0) return; const ty = TYPE[tool]; if (T[i] === ty) return;
        T[i] = ty; V[i] = g.ri(0, 5); g.sfx(ty ? "pop" : "drop"); pt.add((i % COLS + .5) * cs, (Math.floor(i / COLS) + .5) * cs, ty ? "#fff" : "#8a6", 8); upd();
      };
      g.on(c, "pointerdown", e => { down = true; hs.push({ T, V }); paint(pos(e)); });
      g.on(c, "pointermove", e => { if (down) paint(pos(e)); });
      g.on(window, "pointerup", () => { down = false; });
      const okFor = (k, q, r) => { const ty = typ(q, r); return k === "car" ? ty === 1 : ty === 1 || ty === 3; };
      const mk = k => {
        const L = []; for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) if (okFor(k, q, r) && (k === "car" || typ(q, r) === 3 || g.rand() < .3)) L.push([q, r]);
        if (!L.length) return null; const [q, r] = g.pick(L);
        return { k, cx: q, cy: r, tx: q, ty: r, p: 1, d: g.ri(0, 3), sp: k === "car" ? g.rf(1.4, 2.2) * g.by(.8, 1, 1.2) : g.rf(.5, .9), col: g.pick(["#ff5a5f", "#ffd23f", "#4cc3ff", "#b48cff", "#fff", "#ff9f1c"]), ph: g.rf(0, 6) };
      };
      const move = (a, dt) => {
        a.p += a.sp * dt; if (a.p < 1) return true; a.cx = a.tx; a.cy = a.ty; a.p = 0; if (!okFor(a.k, a.cx, a.cy)) return false;
        const o = []; for (let d = 0; d < 4; d++) if (d !== (a.d + 2) % 4 && okFor(a.k, a.cx + D[d][0], a.cy + D[d][1])) o.push(d);
        let nd; if (o.length) nd = o.includes(a.d) && g.rand() < .7 ? a.d : g.pick(o); else { nd = (a.d + 2) % 4; if (!okFor(a.k, a.cx + D[nd][0], a.cy + D[nd][1])) { a.tx = a.cx; a.ty = a.cy; return true; } }
        a.d = nd; a.tx = a.cx + D[nd][0]; a.ty = a.cy + D[nd][1]; return true;
      };
      const surprise = () => {
        hs.push({ T, V }); T = new Array(COLS * ROWS).fill(0);
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) if (r % 3 === 1 || q % 4 === 1) T[r * COLS + q] = 1;
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) if (!T[r * COLS + q]) {
          const nr = D.some(d => typ(q + d[0], r + d[1]) === 1), w = g.rand();
          T[r * COLS + q] = nr ? (w < .5 ? 2 : w < .7 ? 3 : w < .82 && g.diff ? 4 : w < .92 ? 5 : 0) : (w < .3 ? 5 : w < .4 && g.diff ? 6 : 0); V[r * COLS + q] = g.ri(0, 5);
        }
        upd(); g.sfx("cheer");
      };
      const items = [["road", "Road"], ["house", "House"], ["park", "Park"], ["tree", "Tree"]]; if (g.diff >= 1) items.push(["shop", "Shop"], ["pond", "Pond"]); items.push(["erase", "Erase"]);
      const tools = bar(g, items.map(a => ({ t: a[1], id: a[0], fn: () => { tool = a[0]; hl(tools, tool); } })).concat([
        { t: "Undo", fn: () => { const s = hs.pop(); if (s) { T = s.T; V = s.V; upd(); g.sfx("back"); } } },
        { t: "Clear", fn: () => { hs.push({ T, V }); T = new Array(COLS * ROWS).fill(0); upd(); g.sfx("boom"); } },
        { t: "Surprise me", fn: surprise }, { t: "Day / Night", fn: () => { nightOn = !nightOn; } },
        { t: "Save picture", fn: () => g.saveImage(c, "my-city") }, FIN(g)]));
      hl(tools, tool);
      const tree = (cx, cy, s, sw) => { x.fillStyle = "#6d4c41"; x.fillRect(cx - s * .04, cy - s * .05, s * .08, s * .2); x.fillStyle = "#2e9d55"; x.beginPath(); x.moveTo(cx + sw, cy - s * .42); x.lineTo(cx + s * .2, cy - s * .02); x.lineTo(cx - s * .2, cy - s * .02); x.fill(); x.fillStyle = "#3dbb68"; x.beginPath(); x.moveTo(cx + sw, cy - s * .55); x.lineTo(cx + s * .16, cy - s * .2); x.lineTo(cx - s * .16, cy - s * .2); x.fill(); };
      g.loop((dt, t) => {
        tt = t; night += ((nightOn ? .5 : 0) - night) * Math.min(1, dt * 3);
        acc += dt;
        if (acc > .5) {
          acc = 0; let roads = 0, parks = 0; for (const v of T) { if (v === 1) roads++; else if (v === 3) parks++; }
          const wc = Math.min(g.by(4, 8, 14), (roads / 3) | 0), wp = Math.min(g.by(4, 8, 14), parks * 2 + ((roads / 4) | 0));
          if (cars.length < wc) { const a = mk("car"); if (a) cars.push(a); } else if (cars.length > wc) cars.pop();
          if (folks.length < wp) { const a = mk("folk"); if (a) folks.push(a); } else if (folks.length > wp) folks.pop();
        }
        cars = cars.filter(a => move(a, dt)); folks = folks.filter(a => move(a, dt));
        const s = cs;
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) {
          const i = r * COLS + q, ty = T[i], px = q * s, py = r * s, sw = Math.sin(t * 2 + i) * s * .02;
          x.fillStyle = (q + r) % 2 ? "#7bd66b" : "#86df76"; x.fillRect(px, py, s + 1, s + 1);
          if (ty === 1) {
            x.fillStyle = "#5b6270"; const w = s * .6; x.fillRect(px + (s - w) / 2, py + (s - w) / 2, w, w);
            for (let d = 0; d < 4; d++) if (typ(q + D[d][0], r + D[d][1]) === 1) {
              x.beginPath(); x.moveTo(px + s / 2, py + s / 2); x.lineTo(px + s / 2 + D[d][0] * s / 2, py + s / 2 + D[d][1] * s / 2); x.lineWidth = w; x.strokeStyle = "#5b6270"; x.lineCap = "butt"; x.stroke();
              x.lineWidth = 2; x.strokeStyle = "#ffe9a8"; x.setLineDash([5, 5]); x.stroke(); x.setLineDash([]);
            }
          } else if (ty === 2) {
            x.fillStyle = "rgba(0,0,0,.15)"; x.beginPath(); x.ellipse(px + s * .5, py + s * .86, s * .36, s * .08, 0, 0, 7); x.fill();
            x.fillStyle = HC[V[i] % 6]; x.fillRect(px + s * .18, py + s * .4, s * .64, s * .46);
            x.fillStyle = "#c0392b"; x.beginPath(); x.moveTo(px + s * .1, py + s * .42); x.lineTo(px + s * .5, py + s * .12); x.lineTo(px + s * .9, py + s * .42); x.fill();
            x.fillStyle = "#6d4c41"; x.fillRect(px + s * .44, py + s * .62, s * .12, s * .24);
            x.fillStyle = night > .2 ? "#ffe082" : "#cfe9ff"; x.fillRect(px + s * .24, py + s * .5, s * .13, s * .13); x.fillRect(px + s * .63, py + s * .5, s * .13, s * .13);
          } else if (ty === 3) {
            x.fillStyle = "#a6ec8f"; x.beginPath(); x.arc(px + s / 2, py + s / 2, s * .46, 0, 7); x.fill();
            ["#ff6fb5", "#ffd23f", "#fff"].forEach((cc, k) => { x.fillStyle = cc; x.beginPath(); x.arc(px + s * (.25 + k * .25), py + s * (.7 - (k % 2) * .1), s * .05, 0, 7); x.fill(); });
            tree(px + s * .5, py + s * .62, s * .9, sw);
          } else if (ty === 4) {
            x.fillStyle = "#fff3e0"; x.fillRect(px + s * .12, py + s * .35, s * .76, s * .5);
            for (let k = 0; k < 6; k++) { x.fillStyle = k % 2 ? "#fff" : "#e53935"; x.fillRect(px + s * (.1 + k * .13), py + s * .3, s * .13, s * .18); }
            x.fillStyle = "#5d4037"; x.fillRect(px + s * .42, py + s * .6, s * .16, s * .25); x.fillStyle = night > .2 ? "#ffe082" : "#90caf9"; x.fillRect(px + s * .2, py + s * .58, s * .16, s * .14); x.fillRect(px + s * .64, py + s * .58, s * .16, s * .14);
          } else if (ty === 5) tree(px + s / 2, py + s * .75, s, sw);
          else if (ty === 6) { x.fillStyle = "#4cc3ff"; x.beginPath(); x.ellipse(px + s / 2, py + s / 2, s * .44, s * .34, 0, 0, 7); x.fill(); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 2; x.beginPath(); x.ellipse(px + s / 2, py + s / 2, s * (.1 + (t * .15 + i * .1) % .3), s * (.07 + (t * .1 + i * .1) % .2), 0, 0, 7); x.stroke(); }
        }
        for (const a of cars) {
          const fx = a.cx + (a.tx - a.cx) * a.p + .5, fy = a.cy + (a.ty - a.cy) * a.p + .5, dx = D[a.d][0], dy = D[a.d][1];
          x.save(); x.translate(fx * s - dy * s * .12, fy * s + dx * s * .12); x.rotate(Math.atan2(dy, dx));
          x.fillStyle = a.col; x.beginPath(); x.roundRect(-s * .17, -s * .09, s * .34, s * .18, s * .05); x.fill(); x.fillStyle = "rgba(255,255,255,.7)"; x.fillRect(-s * .03, -s * .07, s * .1, s * .14);
          if (night > .2) { x.fillStyle = "rgba(255,240,150,.8)"; x.beginPath(); x.arc(s * .22, 0, s * .08, 0, 7); x.fill(); } x.restore();
        }
        for (const a of folks) {
          const fx = (a.cx + (a.tx - a.cx) * a.p + .5) * s, fy = (a.cy + (a.ty - a.cy) * a.p + .5) * s + Math.abs(Math.sin(t * 9 + a.ph)) * -2 + s * .1;
          x.fillStyle = a.col; x.beginPath(); x.arc(fx, fy, s * .06, 0, 7); x.fill(); x.fillStyle = "#ffd9b3"; x.beginPath(); x.arc(fx, fy - s * .09, s * .045, 0, 7); x.fill();
        }
        if (night > .01) { x.fillStyle = "rgba(10,20,70," + night + ")"; x.fillRect(0, 0, W, H); }
        pt.draw(x, dt);
        if (!T.some(v => v)) txt(x, "Pick Road and draw on the grass!", W / 2, H / 2, 22);
      });
    }
  });

  // ---- 3. Marble Run Maker ----
  B.add({
    id: "s12-marbles", name: "Marble Run Maker", ages: [5, 20], cat: "Build", color: "#b48cff", icon: "M",
    desc: "Draw ramps, then let the marbles loose and watch them roll into the bucket.", controls: "Drag on the board to draw a ramp. Press Release to drop marbles.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), pt = parts(), hs = hist();
      const R = g.by(9, 7, 6), PER = g.by(6, 12, 20), G = 650, SPX = 80;
      const BUCKET = [{ x1: 300, y1: 340, x2: 300, y2: 398 }, { x1: 460, y1: 340, x2: 460, y2: 398 }, { x1: 300, y1: 398, x2: 460, y2: 398 }];
      let segs = [], pegs = [], boosts = [], marbles = [], tool = "ramp", drag = null, left = 0, sp = 0, caught = 0, tickT = 0, mid = 0, t = 0;
      const sv = g.load();
      if (sv && Array.isArray(sv.segs)) { segs = sv.segs; pegs = sv.pegs || []; boosts = sv.boosts || []; }
      else segs = [{ x1: 30, y1: 90, x2: 330, y2: 150 }, { x1: 560, y1: 200, x2: 150, y2: 262 }, { x1: 60, y1: 300, x2: 320, y2: 342 }];
      const sc = () => g.score(segs.length + pegs.length + boosts.length + caught);
      const upd = () => { sc(); g.save({ segs, pegs, boosts }); };
      sc();
      const snap = () => ({ segs, pegs, boosts });
      const rebound = (m, nx, ny, e) => {
        const vn = m.vx * nx + m.vy * ny;
        if (vn < 0) { m.vx -= (1 + e) * vn * nx; m.vy -= (1 + e) * vn * ny; if (-vn > 120 && tickT <= 0) { tickT = .06; g.sfx("note", 280 + (m.id % 9) * 70); } }
      };
      const hit = (m, s) => {
        const ex = s.x2 - s.x1, ey = s.y2 - s.y1, l2 = ex * ex + ey * ey || 1; let u = ((m.x - s.x1) * ex + (m.y - s.y1) * ey) / l2; u = u < 0 ? 0 : u > 1 ? 1 : u;
        const dx = m.x - (s.x1 + ex * u), dy = m.y - (s.y1 + ey * u), d = Math.hypot(dx, dy), lim = R + 2.5;
        if (d < lim) { const nx = d > .001 ? dx / d : 0, ny = d > .001 ? dy / d : -1; m.x += nx * (lim - d); m.y += ny * (lim - d); rebound(m, nx, ny, s.bounce ? 1.1 : .3); }
      };
      const step = h => {
        for (const m of marbles) {
          m.vy += G * h;
          for (const b of boosts) if (Math.hypot(m.x - b.x, m.y - b.y) < 30) { m.vx += b.dx * 900 * h; m.vy += b.dy * 900 * h; }
          m.x += m.vx * h; m.y += m.vy * h; const s2 = Math.hypot(m.vx, m.vy); if (s2 > 800) { m.vx *= 800 / s2; m.vy *= 800 / s2; }
          if (m.x < R) { m.x = R; m.vx = Math.abs(m.vx) * .5; } if (m.x > W - R) { m.x = W - R; m.vx = -Math.abs(m.vx) * .5; }
          for (const s of segs) hit(m, s); for (const s of BUCKET) hit(m, s);
          for (const q of pegs) { const dx = m.x - q.x, dy = m.y - q.y, d = Math.hypot(dx, dy), lim = R + 6; if (d < lim && d > .01) { m.x += dx / d * (lim - d); m.y += dy / d * (lim - d); rebound(m, dx / d, dy / d, .7); } }
        }
      };
      const erase = p => {
        let best = null, bd = 16;
        segs.forEach((s, i) => { const d = dseg(p.x, p.y, s); if (d < bd) { bd = d; best = [segs, i]; } });
        pegs.forEach((q, i) => { const d = Math.hypot(p.x - q.x, p.y - q.y) - 4; if (d < bd) { bd = d; best = [pegs, i]; } });
        boosts.forEach((q, i) => { const d = Math.hypot(p.x - q.x, p.y - q.y) - 8; if (d < bd) { bd = d; best = [boosts, i]; } });
        if (best) { hs.push(snap()); best[0].splice(best[1], 1); g.sfx("drop"); pt.add(p.x, p.y, "#fff", 8); upd(); }
      };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        if (tool === "erase") { drag = { erase: 1 }; erase(p); return; }
        if (tool === "peg") { hs.push(snap()); pegs.push({ x: p.x, y: p.y }); g.sfx("pop"); pt.add(p.x, p.y, "#fff", 8); upd(); return; }
        drag = { x1: p.x, y1: p.y, x2: p.x, y2: p.y };
      });
      g.on(c, "pointermove", e => { if (!drag) return; const p = pos(e); if (drag.erase) { erase(p); return; } drag.x2 = p.x; drag.y2 = p.y; });
      g.on(window, "pointerup", () => {
        if (drag && !drag.erase) {
          const l = Math.hypot(drag.x2 - drag.x1, drag.y2 - drag.y1);
          if (tool === "booster") { hs.push(snap()); boosts.push({ x: drag.x1, y: drag.y1, dx: l > 10 ? (drag.x2 - drag.x1) / l : 1, dy: l > 10 ? (drag.y2 - drag.y1) / l : 0 }); g.sfx("pop"); upd(); }
          else if (l >= 18) { hs.push(snap()); segs.push({ x1: drag.x1, y1: drag.y1, x2: drag.x2, y2: drag.y2, bounce: tool === "bouncy" }); g.sfx("pop"); upd(); }
        }
        drag = null;
      });
      const surprise = () => {
        hs.push(snap()); segs = []; pegs = []; boosts = [];
        for (let k = 0; k < 5; k++) { const y = 70 + k * 58, a = 30 + g.rf(0, 40), b = W - 90 - g.rf(0, 90); segs.push(k % 2 ? { x1: b, y1: y, x2: a, y2: y + g.rf(25, 45) } : { x1: a, y1: y, x2: b, y2: y + g.rf(25, 45) }); }
        upd(); g.sfx("cheer");
      };
      const items = [{ t: "Ramp", id: "ramp" }]; if (g.diff >= 1) items.push({ t: "Bouncy", id: "bouncy" }, { t: "Peg", id: "peg" }); if (g.diff >= 2) items.push({ t: "Booster", id: "booster" }); items.push({ t: "Erase", id: "erase" });
      const tools = bar(g, [{ t: "Release marbles!", col: "#ffd23f", fn: () => { left += PER; g.sfx("launch"); } }, { t: "Stop", fn: () => { marbles = []; left = 0; } }]
        .concat(items.map(it => ({ t: it.t, id: it.id, fn: () => { tool = it.id; hl(tools, tool); } })))
        .concat([{ t: "Undo", fn: () => { const s = hs.pop(); if (s) { segs = s.segs; pegs = s.pegs; boosts = s.boosts; upd(); g.sfx("back"); } } },
          { t: "Clear", fn: () => { hs.push(snap()); segs = []; pegs = []; boosts = []; upd(); g.sfx("boom"); } }, { t: "Surprise me", fn: surprise },
          { t: "Save picture", fn: () => g.saveImage(c, "my-marble-run") }, FIN(g)]));
      hl(tools, tool);
      g.loop((dt, tt) => {
        t = tt; tickT -= dt;
        if (left > 0) { sp -= dt; if (sp <= 0) { sp = .22; left--; marbles.push({ x: SPX + g.rf(-3, 3), y: 30, vx: g.rf(-10, 10), vy: 0, id: mid++, hue: g.ri(0, 359), trail: [], caught: 0 }); g.sfx("tick"); } }
        for (let k = 0; k < 4; k++) step(dt / 4);
        for (let a = 0; a < marbles.length; a++) for (let b = a + 1; b < marbles.length; b++) {
          const p = marbles[a], q = marbles[b], dx = q.x - p.x, dy = q.y - p.y, d2 = dx * dx + dy * dy;
          if (d2 < 4 * R * R && d2 > .01) { const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ov = (2 * R - d) / 2; p.x -= nx * ov; p.y -= ny * ov; q.x += nx * ov; q.y += ny * ov; const rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny; if (rv < 0) { p.vx += rv * nx * .9; p.vy += rv * ny * .9; q.vx -= rv * nx * .9; q.vy -= rv * ny * .9; } }
        }
        marbles = marbles.filter(m => {
          m.trail.push([m.x, m.y]); if (m.trail.length > 8) m.trail.shift();
          if (!m.caught && m.x > 306 && m.x < 454 && m.y > 365) { m.caught = 1.2; caught++; sc(); g.sfx("clink"); pt.add(m.x, m.y, "#ffd23f", 10); }
          if (m.caught) { m.caught -= dt; if (m.caught <= 0) return false; }
          return m.y < H + 30;
        });
        g.status("Caught: " + caught + (marbles.length || left ? "  Rolling: " + (marbles.length + left) : ""));
        sky(x, W, H, "#2b1b5e", "#5a3fa0");
        for (let i = 0; i < 30; i++) { x.fillStyle = "rgba(255,255,255," + (.3 + .3 * Math.sin(t * 2 + i)) + ")"; x.fillRect((i * 97) % W, (i * 53) % 300, 2, 2); }
        x.fillStyle = "#fff"; x.beginPath(); x.moveTo(SPX - 22, 8); x.lineTo(SPX + 22, 8); x.lineTo(SPX + 6, 30); x.lineTo(SPX - 6, 30); x.closePath(); x.fillStyle = "#ffd23f"; x.fill();
        x.lineCap = "round";
        segs.forEach((s, i) => { x.beginPath(); x.moveTo(s.x1, s.y1); x.lineTo(s.x2, s.y2); x.lineWidth = 9; x.strokeStyle = s.bounce ? "#ff6fb5" : "hsl(" + ((i * 47) % 360) + ",70%,60%)"; x.stroke(); x.lineWidth = 3; x.strokeStyle = "rgba(255,255,255,.55)"; if (s.bounce) x.setLineDash([6, 6]); x.stroke(); x.setLineDash([]); });
        for (const q of pegs) { x.fillStyle = "#fff"; x.beginPath(); x.arc(q.x, q.y, 6, 0, 7); x.fill(); x.fillStyle = "#4cc3ff"; x.beginPath(); x.arc(q.x, q.y, 3.5, 0, 7); x.fill(); }
        for (const b of boosts) { x.fillStyle = "rgba(255,159,28,.35)"; x.beginPath(); x.arc(b.x, b.y, 28 + Math.sin(t * 6) * 3, 0, 7); x.fill(); x.save(); x.translate(b.x, b.y); x.rotate(Math.atan2(b.dy, b.dx)); x.strokeStyle = "#ff9f1c"; x.lineWidth = 4; x.beginPath(); x.moveTo(-12, -8); x.lineTo(0 + (t * 20 % 10), 0); x.lineTo(-12, 8); x.stroke(); x.restore(); }
        x.fillStyle = "rgba(255,255,255,.15)"; x.fillRect(300, 340, 160, 60); BUCKET.forEach(s => { x.beginPath(); x.moveTo(s.x1, s.y1); x.lineTo(s.x2, s.y2); x.lineWidth = 8; x.strokeStyle = "#ffd23f"; x.stroke(); });
        for (const m of marbles) {
          m.trail.forEach((p, i) => { x.fillStyle = "hsla(" + m.hue + ",80%,70%," + (i / 20) + ")"; x.beginPath(); x.arc(p[0], p[1], R * i / 9, 0, 7); x.fill(); });
          const rg = x.createRadialGradient(m.x - R * .3, m.y - R * .3, 1, m.x, m.y, R); rg.addColorStop(0, "#fff"); rg.addColorStop(.4, "hsl(" + m.hue + ",85%,65%)"); rg.addColorStop(1, "hsl(" + m.hue + ",80%,38%)");
          x.fillStyle = rg; x.beginPath(); x.arc(m.x, m.y, R, 0, 7); x.fill();
        }
        if (drag && !drag.erase) { x.beginPath(); x.moveTo(drag.x1, drag.y1); x.lineTo(drag.x2, drag.y2); x.lineWidth = 6; x.strokeStyle = "rgba(255,255,255,.6)"; x.setLineDash([8, 8]); x.stroke(); x.setLineDash([]); }
        pt.draw(x, dt);
      });
    }
  });

  // ---- 4. Coaster Designer ----
  B.add({
    id: "s12-coaster", name: "Coaster Designer", ages: [6, 20], cat: "Build", color: "#ff5a5f", icon: "R",
    desc: "Draw a roller coaster track, then hop in the cart and ride it.", controls: "Drag on the sky to draw the track from left to right, then press Ride!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), pt = parts(), hs = hist();
      const MAXP = g.by(16, 45, 90), GY = 360, GR = 900, SPC = g.by(60, 34, 26);
      let pts = [], dense = [], cum = [0], tool = "draw", ride = null, drawing = false, lastP = null, dragI = -1, turbo = false, rides = 0, windT = 0, t = 0;
      const sv = g.load();
      if (sv && Array.isArray(sv.pts)) pts = sv.pts; else pts = [[40, 110], [120, 130], [200, 230], [280, 300], [360, 270], [430, 190], [500, 200], [570, 290], [610, 310]];
      const upd = () => { g.score(pts.length + rides * 5); g.save({ pts }); };
      const build = () => {
        dense = []; cum = [0]; const n = pts.length; if (n < 2) return;
        for (let i = 0; i < n - 1; i++) {
          const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
          for (let k = 0; k < 10; k++) {
            const u = k / 10, u2 = u * u, u3 = u2 * u, f = j => .5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3);
            dense.push([f(0), f(1)]);
          }
        }
        dense.push(pts[n - 1].slice());
        for (let i = 1; i < dense.length; i++) cum.push(cum[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
      };
      build(); upd();
      const add = p => {
        const q = [g.clamp(p.x, 10, W - 10), g.clamp(p.y, 20, GY - 12)];
        if (lastP && Math.hypot(q[0] - lastP[0], q[1] - lastP[1]) < SPC) return;
        if (pts.length >= MAXP) { if (!lastP || drawing) { g.sfx("wrong"); fpop(g, c, W, H, "Track is full!", q[0], q[1], "#fff"); } lastP = q; return; }
        pts.push(q); lastP = q; build(); g.sfx("note", 260 + (400 - q[1])); pt.add(q[0], q[1], "#fff", 5, 60); upd();
      };
      g.on(c, "pointerdown", e => {
        if (ride) return; const p = pos(e);
        if (tool === "move") { let bi = -1, bd = 26; pts.forEach((q, i) => { const d = Math.hypot(q[0] - p.x, q[1] - p.y); if (d < bd) { bd = d; bi = i; } }); if (bi >= 0) { hs.push(pts); dragI = bi; } return; }
        hs.push(pts); drawing = true; lastP = null; add(p);
      });
      g.on(c, "pointermove", e => {
        const p = pos(e);
        if (dragI >= 0) { pts[dragI] = [g.clamp(p.x, 10, W - 10), g.clamp(p.y, 20, GY - 12)]; build(); } else if (drawing) add(p);
      });
      g.on(window, "pointerup", () => { if (dragI >= 0) { upd(); g.sfx("pop"); } drawing = false; dragI = -1; });
      const startRide = () => {
        if (ride) return; if (dense.length < 3) { g.sfx("wrong"); fpop(g, c, W, H, "Draw a track first!", W / 2, 200, "#fff"); return; }
        ride = { s: 0, i: 0, v: 90, y0: dense[0][1], x: dense[0][0], y: dense[0][1], ang: 0 }; g.sfx("launch");
      };
      const loop = () => {
        const L = pts[pts.length - 1], r = 38; if (!L) return;
        if (L[0] + r + 70 > W || L[1] - 2 * r < 12) { g.sfx("wrong"); fpop(g, c, W, H, "Needs more room!", L[0], L[1], "#fff"); return; }
        hs.push(pts); for (let k = 1; k <= 8; k++) { const a = Math.PI / 2 - k * Math.PI / 4; pts.push([L[0] + r * Math.cos(a) + 40 * k / 8, L[1] - r + r * Math.sin(a)]); }
        pts.push([L[0] + 40 + 35, L[1]]); build(); upd(); g.sfx("cheer");
      };
      const surprise = () => {
        hs.push(pts); pts = []; const n = g.by(6, 10, 14), ph = g.rf(0, 6);
        for (let i = 0; i < n; i++) pts.push([40 + i * (560 / (n - 1)), i === 0 ? 100 : g.clamp(190 + 90 * Math.sin(i * 1.1 + ph) + g.rf(-20, 20), 130, 320)]);
        build(); upd(); g.sfx("cheer");
      };
      const items = [{ t: "Ride!", col: "#ffd23f", fn: startRide }, { t: "Draw", id: "draw", fn: () => { tool = "draw"; hl(tools, tool); } }];
      if (g.diff >= 1) items.push({ t: "Move points", id: "move", fn: () => { tool = "move"; hl(tools, tool); } });
      items.push({ t: "Undo", fn: () => { const s = hs.pop(); if (s && !ride) { pts = s; build(); upd(); g.sfx("back"); } } }, { t: "Clear", fn: () => { if (ride) return; hs.push(pts); pts = []; build(); upd(); g.sfx("boom"); } }, { t: "Surprise me", fn: surprise });
      if (g.diff >= 2) items.push({ t: "Loop-de-loop", fn: loop }, { t: "Turbo: off", fn: b => { turbo = !turbo; b.textContent = "Turbo: " + (turbo ? "on" : "off"); } });
      items.push({ t: "Save picture", fn: () => g.saveImage(c, "my-coaster") }, FIN(g));
      const tools = bar(g, items); hl(tools, tool);
      g.loop((dt, tt) => {
        t = tt; windT -= dt;
        if (ride) {
          const e = Math.max(0, ride.y0 - ride.y), sc = (turbo ? 1.5 : 1) * g.by(.8, 1, 1);
          ride.v = Math.min(700, 85 + Math.sqrt(2 * GR * e) * .85) * sc; ride.s += ride.v * dt;
          if (ride.s >= cum[cum.length - 1]) { pt.add(ride.x, ride.y, "#ffd23f", 24); ride = null; rides++; upd(); g.sfx("cheer"); fpop(g, c, W, H, "Great ride!", W / 2, 150, "#ffd23f"); }
          else {
            while (ride.i < dense.length - 2 && cum[ride.i + 1] < ride.s) ride.i++;
            const i = ride.i, a = dense[i], b = dense[i + 1], u = g.clamp((ride.s - cum[i]) / ((cum[i + 1] - cum[i]) || 1), 0, 1);
            ride.x = a[0] + (b[0] - a[0]) * u; ride.y = a[1] + (b[1] - a[1]) * u;
            const p0 = dense[Math.max(0, i - 2)], p1 = dense[Math.min(dense.length - 1, i + 3)]; ride.ang = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
            if (ride.v > 320 && windT <= 0) { g.sfx("swish"); windT = .6; } if (ride.v > 300) pt.add(ride.x, ride.y, "#fff", 1, 40);
          }
        }
        sky(x, W, H, "#8fd3ff", "#fff3c4");
        x.fillStyle = "#ffe36b"; x.beginPath(); x.arc(70, 55, 28, 0, 7); x.fill();
        cloud(x, ((t * 10) % 760) - 100, 60, 1); cloud(x, ((t * 6 + 350) % 760) - 100, 110, .7);
        x.save(); x.globalAlpha = .35; x.translate(560, 190); x.strokeStyle = "#7b6cff"; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 55, 0, 7); x.stroke();
        for (let k = 0; k < 8; k++) { const a = t * .4 + k * Math.PI / 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 55, Math.sin(a) * 55); x.stroke(); x.fillStyle = SW[k]; x.beginPath(); x.arc(Math.cos(a) * 55, Math.sin(a) * 55, 7, 0, 7); x.fill(); } x.restore();
        x.fillStyle = "#79d36b"; x.fillRect(0, GY, W, H - GY); x.fillStyle = "#5bb85b"; x.fillRect(0, GY, W, 6);
        if (dense.length > 1) {
          x.lineWidth = 3; x.strokeStyle = "#8d6e63"; x.lineCap = "butt";
          for (let i = 0; i < dense.length; i += 6) { const d = dense[i]; if (d[1] < GY - 4) { x.beginPath(); x.moveTo(d[0], d[1]); x.lineTo(d[0], GY); x.stroke(); } }
          x.strokeStyle = "#5d4037";
          for (let i = 0; i < dense.length - 1; i += 3) { const a = dense[i], b = dense[i + 1], an = Math.atan2(b[1] - a[1], b[0] - a[0]), nx = -Math.sin(an) * 7, ny = Math.cos(an) * 7; x.beginPath(); x.moveTo(a[0] - nx, a[1] - ny); x.lineTo(a[0] + nx, a[1] + ny); x.stroke(); }
          x.beginPath(); dense.forEach((d, i) => i ? x.lineTo(d[0], d[1]) : x.moveTo(d[0], d[1])); x.lineWidth = 5; x.strokeStyle = "#c0392b"; x.lineJoin = "round"; x.stroke();
        }
        if (!ride) pts.forEach((q, i) => { x.fillStyle = i === 0 ? "#6be28f" : "#fff"; x.strokeStyle = "#333"; x.lineWidth = 2; x.beginPath(); x.arc(q[0], q[1], g.by(8, 6, 5), 0, 7); x.fill(); x.stroke(); });
        if (pts.length && !ride) txt(x, "START", pts[0][0] + 6, pts[0][1] - 18, 14);
        if (ride) {
          x.save(); x.translate(ride.x, ride.y); x.rotate(ride.ang);
          x.fillStyle = "#ffd23f"; x.beginPath(); x.roundRect(-19, -24, 38, 17, 5); x.fill(); x.strokeStyle = "#b8860b"; x.lineWidth = 2; x.stroke();
          x.fillStyle = "#333"; [-11, 11].forEach(wx => { x.beginPath(); x.arc(wx, -4, 5, 0, 7); x.fill(); });
          [["#ff6fb5", -8], ["#4cc3ff", 8]].forEach((h, k) => { const sw = Math.sin(t * 12 + k * 2) * 4; x.fillStyle = h[0]; x.beginPath(); x.arc(h[1], -32, 6, 0, 7); x.fill(); x.strokeStyle = h[0]; x.lineWidth = 3; x.beginPath(); x.moveTo(h[1], -25); x.lineTo(h[1] + sw, -40); x.stroke(); });
          x.restore();
        }
        pt.draw(x, dt);
        if (!pts.length) txt(x, "Drag here to draw your track!", W / 2, 180, 22);
      });
    }
  });

  // ---- 5. Contraption Maker (Rube Goldberg) ----
  B.add({
    id: "s12-rube", name: "Contraption Maker", ages: [7, 20], cat: "Build", color: "#ff9f1c", icon: "G",
    desc: "Build a silly chain reaction with ramps, balls, fans and dominoes, then press Go.", controls: "Pick a part, then tap or drag on the board. Press Go to start the chain reaction.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), pt = parts(), hs = hist();
      const R = g.by(11, 8, 7), FL = 372, G = 700, DH = 40;
      let segs = [], balls = [], fans = [], dom = [], bells = [], cans = [], tool = "ramp", drag = null, go = false, slow = false, t = 0, mid = 0, rung = 0, tickT = 0;
      const mkBall = (bx, by) => ({ x0: bx, y0: by, x: bx, y: by, vx: 0, vy: 0, id: mid++, hue: g.ri(0, 359) });
      const mkDom = (dx, dy) => ({ x: dx, y: dy, dir: 1, a: 0, st: 0, ch: false });
      const ser = () => ({ segs, balls: balls.filter(b => !b.tmp).map(b => ({ x0: b.x0, y0: b.y0 })), fans, dom: dom.map(d => ({ x: d.x, y: d.y })), bells: bells.map(b => ({ x: b.x, y: b.y })), cans });
      const restore = s => { segs = s.segs || []; balls = (s.balls || []).map(b => mkBall(b.x0, b.y0)); fans = s.fans || []; dom = (s.dom || []).map(d => mkDom(d.x, d.y)); bells = (s.bells || []).map(b => ({ x: b.x, y: b.y, ring: 0 })); cans = s.cans || []; };
      const upd = () => { g.score(segs.length + balls.filter(b => !b.tmp).length + fans.length + dom.length + bells.length + cans.length + rung * 5); g.save(ser()); };
      const sv = g.load();
      if (sv && Array.isArray(sv.segs)) restore(sv);
      else { segs = [{ x1: 30, y1: 230, x2: 230, y2: 280 }]; balls = [mkBall(60, 195)]; for (let k = 0; k < 5; k++) dom.push(mkDom(330 + k * 30, FL)); bells = [{ x: 505, y: FL - 26, ring: 0 }]; }
      g.score(segs.length + balls.length + fans.length + dom.length + bells.length + cans.length);
      const ring = b => { if (b.ring > .3) return; b.ring = 1.5; g.sfx("note", 880 + (rung % 4) * 110); g.sfx("clink"); rung++; pt.add(b.x, b.y, "#ffd23f", 18); upd(); };
      const topple = (d, dir) => { if (d.st) return; d.st = 1; d.dir = dir; d.a = 0; d.ch = false; g.sfx("thump"); };
      const begin = () => {
        if (go) return; go = true; rung = 0; balls.forEach(b => { b.x = b.x0; b.y = b.y0; b.vx = b.vy = 0; });
        cans.forEach(cn => { const b = mkBall(cn.x + cn.dx * 24, cn.y + cn.dy * 24); b.vx = cn.dx * 520; b.vy = cn.dy * 520; b.tmp = true; balls.push(b); }); g.sfx("launch");
      };
      const stop = () => { go = false; balls = balls.filter(b => !b.tmp); balls.forEach(b => { b.x = b.x0; b.y = b.y0; b.vx = b.vy = 0; }); dom.forEach(d => { d.st = 0; d.a = 0; d.ch = false; }); bells.forEach(b => { b.ring = 0; }); };
      const rebound = (b, nx, ny, e) => { const vn = b.vx * nx + b.vy * ny; if (vn < 0) { b.vx -= (1 + e) * vn * nx; b.vy -= (1 + e) * vn * ny; if (-vn > 140 && tickT <= 0) { tickT = .07; g.sfx("tick"); } } };
      const hit = (b, s) => {
        const ex = s.x2 - s.x1, ey = s.y2 - s.y1, l2 = ex * ex + ey * ey || 1; let u = ((b.x - s.x1) * ex + (b.y - s.y1) * ey) / l2; u = u < 0 ? 0 : u > 1 ? 1 : u;
        const dx = b.x - (s.x1 + ex * u), dy = b.y - (s.y1 + ey * u), d = Math.hypot(dx, dy), lim = R + 2.5;
        if (d < lim) { const nx = d > .001 ? dx / d : 0, ny = d > .001 ? dy / d : -1; b.x += nx * (lim - d); b.y += ny * (lim - d); rebound(b, nx, ny, s.bounce ? 1.1 : .35); }
      };
      const surfY = (px, py) => {
        let best = FL; for (const s of segs) { const lo = Math.min(s.x1, s.x2), hi = Math.max(s.x1, s.x2), dx = s.x2 - s.x1; if (px < lo || px > hi || Math.abs(dx) < 1) continue; const ys = s.y1 + (s.y2 - s.y1) * (px - s.x1) / dx; if (Math.abs((s.y2 - s.y1) / dx) < .2 && ys >= py - 14 && ys < best) best = ys; }
        return best;
      };
      const erase = p => {
        let best = null, bd = 18; const chk = (arr, i, d) => { if (d < bd) { bd = d; best = [arr, i]; } };
        segs.forEach((s, i) => chk(segs, i, dseg(p.x, p.y, s))); balls.forEach((b, i) => chk(balls, i, Math.hypot(p.x - b.x0, p.y - b.y0) - R)); fans.forEach((f, i) => chk(fans, i, Math.hypot(p.x - f.x, p.y - f.y) - 12));
        dom.forEach((d, i) => chk(dom, i, Math.hypot(p.x - d.x, p.y - d.y + 20) - 14)); bells.forEach((b, i) => chk(bells, i, Math.hypot(p.x - b.x, p.y - b.y) - 14)); cans.forEach((f, i) => chk(cans, i, Math.hypot(p.x - f.x, p.y - f.y) - 14));
        if (best) { hs.push(ser()); best[0].splice(best[1], 1); g.sfx("drop"); pt.add(p.x, p.y, "#fff", 8); upd(); }
      };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        if (go) { fpop(g, c, W, H, "Press Stop to change things", W / 2, 60, "#c0392b"); return; }
        if (tool === "erase") { drag = { erase: 1 }; erase(p); return; }
        if (tool === "ball" || tool === "domino" || tool === "bell") {
          hs.push(ser());
          if (tool === "ball") balls.push(mkBall(p.x, Math.min(p.y, FL - R)));
          else if (tool === "bell") bells.push({ x: p.x, y: Math.min(p.y, FL - 16), ring: 0 });
          else { const sy = surfY(p.x, p.y); if (dom.some(d => Math.abs(d.x - p.x) < 14 && Math.abs(d.y - sy) < 6)) { hs.pop(); return; } dom.push(mkDom(p.x, sy)); }
          g.sfx("pop"); pt.add(p.x, p.y, "#fff", 8); upd(); return;
        }
        drag = { x1: p.x, y1: p.y, x2: p.x, y2: p.y };
      });
      g.on(c, "pointermove", e => { if (!drag) return; const p = pos(e); if (drag.erase) { erase(p); return; } drag.x2 = p.x; drag.y2 = p.y; });
      g.on(window, "pointerup", () => {
        if (drag && !drag.erase) {
          const l = Math.hypot(drag.x2 - drag.x1, drag.y2 - drag.y1);
          if (tool === "fan" || tool === "cannon") { hs.push(ser()); (tool === "fan" ? fans : cans).push({ x: drag.x1, y: drag.y1, dx: l > 10 ? (drag.x2 - drag.x1) / l : (tool === "fan" ? 0 : .7), dy: l > 10 ? (drag.y2 - drag.y1) / l : (tool === "fan" ? -1 : -.7) }); g.sfx("pop"); upd(); }
          else if (l >= 18) { hs.push(ser()); segs.push({ x1: drag.x1, y1: drag.y1, x2: drag.x2, y2: drag.y2, bounce: tool === "bouncy" }); g.sfx("pop"); upd(); }
        }
        drag = null;
      });
      const items = [{ t: "Ramp", id: "ramp" }, { t: "Ball", id: "ball" }, { t: "Domino", id: "domino" }, { t: "Bell", id: "bell" }];
      if (g.diff >= 1) items.push({ t: "Bouncy", id: "bouncy" }, { t: "Fan", id: "fan" }); if (g.diff >= 2) items.push({ t: "Cannon", id: "cannon" }); items.push({ t: "Erase", id: "erase" });
      const top = [{ t: "Go!", col: "#6be28f", fn: begin }, { t: "Stop and reset", fn: stop }];
      if (g.diff >= 1) top.push({ t: "Slow-mo: off", fn: b => { slow = !slow; b.textContent = "Slow-mo: " + (slow ? "on" : "off"); } });
      const tools = bar(g, top.concat(items.map(it => ({ t: it.t, id: it.id, fn: () => { tool = it.id; hl(tools, tool); } })))
        .concat([{ t: "Undo", fn: () => { const s = hs.pop(); if (s && !go) { restore(s); upd(); g.sfx("back"); } } }, { t: "Clear", fn: () => { if (go) stop(); hs.push(ser()); restore({}); upd(); g.sfx("boom"); } },
          { t: "Save picture", fn: () => g.saveImage(c, "my-contraption") }, FIN(g)]));
      hl(tools, tool);
      g.loop((dt, tt) => {
        t = tt; tickT -= dt;
        if (go) {
          const sc = slow ? .35 : 1;
          for (let k = 0; k < 3; k++) {
            const h = dt * sc / 3;
            for (const b of balls) {
              b.vy += G * h;
              for (const f of fans) { const rx = b.x - f.x, ry = b.y - f.y, s = rx * f.dx + ry * f.dy, l = Math.abs(rx * f.dy - ry * f.dx); if (s > 0 && s < 190 && l < 30) { const F = 1300 * (1 - s / 190); b.vx += f.dx * F * h; b.vy += f.dy * F * h; } }
              b.x += b.vx * h; b.y += b.vy * h; const s2 = Math.hypot(b.vx, b.vy); if (s2 > 900) { b.vx *= 900 / s2; b.vy *= 900 / s2; }
              if (b.x < R) { b.x = R; b.vx = Math.abs(b.vx) * .5; } if (b.x > W - R) { b.x = W - R; b.vx = -Math.abs(b.vx) * .5; }
              if (b.y > FL - R) { b.y = FL - R; if (b.vy > 0) { b.vy = -b.vy * .45; if (Math.abs(b.vy) < 30) b.vy = 0; } b.vx *= 1 - 1.2 * h; }
              for (const s of segs) hit(b, s);
            }
          }
          for (let a = 0; a < balls.length; a++) for (let b = a + 1; b < balls.length; b++) {
            const p = balls[a], q = balls[b], dx = q.x - p.x, dy = q.y - p.y, d2 = dx * dx + dy * dy;
            if (d2 < 4 * R * R && d2 > .01) { const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ov = (2 * R - d) / 2; p.x -= nx * ov; p.y -= ny * ov; q.x += nx * ov; q.y += ny * ov; const rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny; if (rv < 0) { p.vx += rv * nx; p.vy += rv * ny; q.vx -= rv * nx; q.vy -= rv * ny; } }
          }
          for (const b of balls) {
            for (const d of dom) if (!d.st && Math.abs(b.x - d.x) < R + 5 && b.y > d.y - DH - R && b.y < d.y + R && Math.abs(b.vx) > 25) topple(d, b.vx > 0 ? 1 : -1);
            for (const bl of bells) if (Math.hypot(b.x - bl.x, b.y - bl.y) < R + 16) ring(bl);
          }
          for (const d of dom) if (d.st === 1) {
            d.a += dt * sc * 2.2;
            if (d.a > .3 && !d.ch) { d.ch = true; for (const o of dom) if (!o.st && Math.abs(o.y - d.y) < 12 && (o.x - d.x) * d.dir > 0 && (o.x - d.x) * d.dir < DH + 4) topple(o, d.dir); }
            if (d.a > .35) for (const bl of bells) if ((bl.x - d.x) * d.dir > 0 && (bl.x - d.x) * d.dir < DH + 18 && Math.abs(bl.y - d.y) < DH + 30) ring(bl);
            if (d.a >= 1) { d.a = 1; d.st = 2; }
          }
          g.status("Bell rings: " + rung);
        } else g.status("");
        for (const bl of bells) if (bl.ring > 0) bl.ring -= dt;
        x.fillStyle = "#fdf1d6"; x.fillRect(0, 0, W, H); x.strokeStyle = "#f0dcae"; x.lineWidth = 1;
        for (let i = 0; i < W; i += 40) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); } for (let j = 0; j < H; j += 40) { x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); }
        x.fillStyle = "#b07a4a"; x.fillRect(0, FL, W, H - FL); x.fillStyle = "#8c5a2e"; x.fillRect(0, FL, W, 4);
        x.lineCap = "round";
        for (const s of segs) { x.beginPath(); x.moveTo(s.x1, s.y1); x.lineTo(s.x2, s.y2); x.lineWidth = 9; x.strokeStyle = s.bounce ? "#ff6fb5" : "#4a90d9"; x.stroke(); x.lineWidth = 3; x.strokeStyle = "rgba(255,255,255,.6)"; if (s.bounce) x.setLineDash([6, 6]); x.stroke(); x.setLineDash([]); }
        for (const f of fans) {
          x.save(); x.translate(f.x, f.y); x.rotate(Math.atan2(f.dy, f.dx));
          x.fillStyle = "#555"; x.fillRect(-14, -14, 14, 28);
          const sp = t * (go ? 16 : 3); x.fillStyle = "#4cc3ff"; for (let k = 0; k < 3; k++) { const a = sp + k * 2.094; x.beginPath(); x.ellipse(2 + Math.cos(a) * 2, Math.sin(a) * 11, 5, 3 + Math.abs(Math.cos(a)) * 6, 0, 0, 7); x.fill(); }
          x.strokeStyle = "rgba(76,195,255,.4)"; x.lineWidth = 2; for (let k = 0; k < 3; k++) { const o = (t * 120 + k * 60) % 180; x.beginPath(); x.moveTo(14 + o, -14 + k * 14); x.lineTo(30 + o, -14 + k * 14); x.stroke(); } x.restore();
        }
        for (const cn of cans) { x.save(); x.translate(cn.x, cn.y); x.rotate(Math.atan2(cn.dy, cn.dx)); x.fillStyle = "#444"; x.beginPath(); x.roundRect(-4, -11, 34, 22, 6); x.fill(); x.fillStyle = "#222"; x.beginPath(); x.arc(0, 8, 9, 0, 7); x.fill(); x.restore(); }
        for (const d of dom) {
          x.save(); x.translate(d.x + d.dir * 4, d.y); x.rotate(d.dir * (1 - Math.pow(1 - d.a, 2)) * 1.45); x.fillStyle = "#fff"; x.strokeStyle = "#333"; x.lineWidth = 2; x.fillRect(d.dir === 1 ? -8 : 0, -DH, 8, DH); x.strokeRect(d.dir === 1 ? -8 : 0, -DH, 8, DH);
          x.fillStyle = "#e53935"; for (let k = 1; k < 4; k++) { x.beginPath(); x.arc(d.dir === 1 ? -4 : 4, -DH + k * 10 - 2, 1.8, 0, 7); x.fill(); } x.restore();
        }
        for (const bl of bells) {
          x.save(); x.translate(bl.x, bl.y - 14); x.rotate(Math.sin(t * 28) * Math.max(0, bl.ring) * .35); x.fillStyle = bl.ring > .3 ? "#ffe36b" : "#f5b700"; x.beginPath(); x.moveTo(-14, 16); x.quadraticCurveTo(-14, -12, 0, -14); x.quadraticCurveTo(14, -12, 14, 16); x.closePath(); x.fill(); x.strokeStyle = "#a07800"; x.lineWidth = 2; x.stroke();
          x.fillStyle = "#a07800"; x.beginPath(); x.arc(0, 18, 4, 0, 7); x.fill(); x.restore();
        }
        for (const b of balls) {
          const rg = x.createRadialGradient(b.x - R * .3, b.y - R * .3, 1, b.x, b.y, R); rg.addColorStop(0, "#fff"); rg.addColorStop(.4, "hsl(" + b.hue + ",85%,62%)"); rg.addColorStop(1, "hsl(" + b.hue + ",75%,38%)"); x.fillStyle = rg; x.beginPath(); x.arc(b.x, b.y, R, 0, 7); x.fill();
          const bl = Math.sin(t * 2 + b.id * 3) > .96; x.fillStyle = "#fff"; [-.35, .35].forEach(o => { x.beginPath(); x.arc(b.x + o * R, b.y - R * .15, R * .22, 0, bl ? 0 : 7); x.fill(); }); x.fillStyle = "#222"; [-.35, .35].forEach(o => { x.beginPath(); x.arc(b.x + o * R + (b.vx > 0 ? 1 : -1), b.y - R * .1, R * .1, 0, 7); x.fill(); });
        }
        if (drag && !drag.erase) { x.beginPath(); x.moveTo(drag.x1, drag.y1); x.lineTo(drag.x2, drag.y2); x.lineWidth = 6; x.strokeStyle = "rgba(0,0,0,.35)"; x.setLineDash([8, 8]); x.stroke(); x.setLineDash([]); }
        pt.draw(x, dt);
        if (!go && !balls.length) txt(x, "Add a Ball, then press Go!", W / 2, 140, 20);
      });
    }
  });

  // ---- 6. Bridge Builder ----
  B.add({
    id: "s12-bridge", name: "Bridge Builder", ages: [7, 20], cat: "Build", color: "#6be28f", icon: "H",
    desc: "Join beams across the gap, then drive a car over your bridge to test it.", controls: "Drag from dot to dot to place a beam. Press Test to drive across. Auto bridge builds one for you.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), pt = parts(), hs = hist();
      const CL = g.by(160, 120, 80), CR = g.by(480, 520, 560), CY = 250, MAXL = g.by(130, 110, 100), GR = 900, CARV = g.by(60, 75, 95), WR = 8;
      const BRK = { wood: g.by(9, .22, .14), steel: g.by(9, .4, .26) };
      const CLIFF = [[0, CY, CL, CY], [CL, CY, CL, H + 60], [CR, CY, CR, H + 60], [CR, CY, W, CY]].map(a => ({ x1: a[0], y1: a[1], x2: a[2], y2: a[3] }));
      let nodes = [], beams = [], mat = "wood", drag = null, testing = false, car = null, snapT = null, wins = 0, t = 0, erasing = false;
      const isFix = (px, py) => (px <= CL && py >= CY) || (px >= CR && py >= CY);
      const getNode = (px, py) => { let n = nodes.find(q => Math.abs(q.x - px) < 6 && Math.abs(q.y - py) < 6); if (!n) { n = { x: px, y: py, px, py, fix: isFix(px, py) }; nodes.push(n); } return n; };
      const ser = () => ({ n: nodes.map(n => [n.x, n.y]), b: beams.map(b => [nodes.indexOf(b.a), nodes.indexOf(b.b), b.m]) });
      const load = s => { nodes = (s.n || []).map(a => ({ x: a[0], y: a[1], px: a[0], py: a[1], fix: isFix(a[0], a[1]) })); beams = []; (s.b || []).forEach(a => { const A = nodes[a[0]], Bn = nodes[a[1]]; if (A && Bn) beams.push({ a: A, b: Bn, len: Math.hypot(A.x - Bn.x, A.y - Bn.y), m: a[2] }); }); };
      const upd = () => { g.score(beams.length + wins * 10); g.save(ser()); };
      const sv = g.load(); if (sv && sv.n && sv.cl === CL) load(sv); g.score(beams.length);
      const save2 = () => { const s = ser(); s.cl = CL; g.save(s); g.score(beams.length + wins * 10); };
      const sn = p => [g.clamp(Math.round(p.x / 20) * 20, 0, W), g.clamp(Math.round(p.y / 20) * 20, 40, 380)];
      const clean = () => { nodes = nodes.filter(n => beams.some(b => b.a === n || b.b === n)); };
      const eraseAt = p => {
        let bi = -1, bd = 12; beams.forEach((b, i) => { const d = dseg(p.x, p.y, { x1: b.a.x, y1: b.a.y, x2: b.b.x, y2: b.b.y }); if (d < bd) { bd = d; bi = i; } });
        if (bi >= 0) { hs.push(ser()); const b = beams.splice(bi, 1)[0]; clean(); g.sfx("drop"); pt.add((b.a.x + b.b.x) / 2, (b.a.y + b.b.y) / 2, "#c98b4a", 8); save2(); }
      };
      g.on(c, "pointerdown", e => {
        if (testing) return; const p = pos(e);
        if (mat === "erase") { erasing = true; eraseAt(p); return; }
        const s = sn(p); drag = { a: s, b: s };
      });
      g.on(c, "pointermove", e => { const p = pos(e); if (erasing) { eraseAt(p); return; } if (drag) drag.b = sn(p); });
      g.on(window, "pointerup", () => {
        erasing = false;
        if (drag && !testing) {
          const a = drag.a, b = drag.b, l = Math.hypot(a[0] - b[0], a[1] - b[1]);
          if (l > 0) {
            if (l > MAXL) { g.sfx("wrong"); fpop(g, c, W, H, "Too long!", b[0], b[1], "#fff"); }
            else if (!beams.some(q => (Math.abs(q.a.x - a[0]) < 3 && Math.abs(q.a.y - a[1]) < 3 && Math.abs(q.b.x - b[0]) < 3 && Math.abs(q.b.y - b[1]) < 3) || (Math.abs(q.b.x - a[0]) < 3 && Math.abs(q.b.y - a[1]) < 3 && Math.abs(q.a.x - b[0]) < 3 && Math.abs(q.a.y - b[1]) < 3))) {
              hs.push(ser()); beams.push({ a: getNode(a[0], a[1]), b: getNode(b[0], b[1]), len: l, m: mat }); g.sfx("thump"); pt.add((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, "#fff", 6); save2();
            }
          }
        }
        drag = null;
      });
      const begin = () => {
        if (testing) return; if (!beams.length) { g.sfx("wrong"); fpop(g, c, W, H, "Build a bridge first!", W / 2, 150, "#fff"); return; }
        snapT = ser(); testing = true; nodes.forEach(n => { n.px = n.x; n.py = n.y; });
        car = { w: [{ x: CL - 40, y: CY - 10, px: CL - 40, py: CY - 10 }, { x: CL - 62, y: CY - 10, px: CL - 62, py: CY - 10 }], done: false, end: 0, msg: "" }; g.sfx("rumble");
      };
      const reset = () => { if (!testing) return; testing = false; car = null; if (snapT) load(snapT); snapT = null; save2(); };
      const auto = () => {
        if (testing) return; hs.push(ser()); nodes = []; beams = []; const lo = [], hi = [];
        for (let xx = CL; xx <= CR; xx += 40) lo.push(getNode(xx, CY)); for (let xx = CL + 20; xx < CR; xx += 40) hi.push(getNode(xx, CY - 40));
        const add = (a, b) => beams.push({ a, b, len: Math.hypot(a.x - b.x, a.y - b.y), m: "steel" });
        for (let i = 0; i < lo.length - 1; i++) add(lo[i], lo[i + 1]); for (let i = 0; i < hi.length - 1; i++) add(hi[i], hi[i + 1]); for (let i = 0; i < hi.length; i++) { add(hi[i], lo[i]); add(hi[i], lo[i + 1]); }
        save2(); g.sfx("cheer");
      };
      const wheelHit = (w, s, na, nb) => {
        const ex = s.x2 - s.x1, ey = s.y2 - s.y1, l2 = ex * ex + ey * ey || 1; let u = ((w.x - s.x1) * ex + (w.y - s.y1) * ey) / l2; u = u < 0 ? 0 : u > 1 ? 1 : u;
        const dx = w.x - (s.x1 + ex * u), dy = w.y - (s.y1 + ey * u), d = Math.hypot(dx, dy), lim = WR + 3;
        if (d < lim) { const nx = d > .001 ? dx / d : 0, ny = d > .001 ? dy / d : -1, ov = lim - d; w.x += nx * ov; w.y += ny * ov; if (na && !na.fix) { na.x -= nx * ov * .25 * (1 - u); na.y -= ny * ov * .25 * (1 - u); } if (nb && !nb.fix) { nb.x -= nx * ov * .25 * u; nb.y -= ny * ov * .25 * u; } }
      };
      const step = h => {
        for (const n of nodes) if (!n.fix) { const vx = (n.x - n.px) * .995, vy = (n.y - n.py) * .995; n.px = n.x; n.py = n.y; n.x += vx; n.y += vy + GR * h * h; }
        if (car) for (const w of car.w) { const vy = (w.y - w.py) * .995; w.px = w.x - CARV * h; w.py = w.y; w.x += CARV * h; w.y += vy + GR * h * h; }
        for (let it = 0; it < 16; it++) {
          for (const b of beams) {
            const dx = b.b.x - b.a.x, dy = b.b.y - b.a.y, d = Math.hypot(dx, dy) || .001, df = (d - b.len) / d, fa = b.a.fix ? 0 : 1, fb = b.b.fix ? 0 : 1, s = fa + fb; if (!s) continue;
            b.a.x += dx * df * fa / s; b.a.y += dy * df * fa / s; b.b.x -= dx * df * fb / s; b.b.y -= dy * df * fb / s;
          }
          if (car) {
            const A = car.w[0], Bw = car.w[1], dx = Bw.x - A.x, dy = Bw.y - A.y, d = Math.hypot(dx, dy) || .001, df = (d - 22) / d * .5; A.x += dx * df; A.y += dy * df; Bw.x -= dx * df; Bw.y -= dy * df;
            for (const w of car.w) { for (const b of beams) wheelHit(w, { x1: b.a.x, y1: b.a.y, x2: b.b.x, y2: b.b.y }, b.a, b.b); for (const s of CLIFF) wheelHit(w, s); }
          }
        }
        for (let i = beams.length - 1; i >= 0; i--) {
          const b = beams[i], st = Math.abs(Math.hypot(b.b.x - b.a.x, b.b.y - b.a.y) - b.len) / b.len; b.st = st;
          if (st > BRK[b.m]) { beams.splice(i, 1); g.sfx("thump"); pt.add((b.a.x + b.b.x) / 2, (b.a.y + b.b.y) / 2, "#c98b4a", 14); }
        }
      };
      const mats = [{ t: "Wood", id: "wood", fn: () => { mat = "wood"; hl(tools, mat); } }]; if (g.diff >= 1) mats.push({ t: "Steel", id: "steel", fn: () => { mat = "steel"; hl(tools, mat); } });
      mats.push({ t: "Erase", id: "erase", fn: () => { mat = "erase"; hl(tools, mat); } });
      const tools = bar(g, [{ t: "Test: drive across!", col: "#ffd23f", fn: begin }, { t: "Stop", fn: reset }, { t: "Auto bridge", fn: auto }].concat(mats).concat([
        { t: "Undo", fn: () => { const s = hs.pop(); if (s && !testing) { load(s); save2(); g.sfx("back"); } } }, { t: "Clear", fn: () => { if (testing) return; hs.push(ser()); nodes = []; beams = []; save2(); g.sfx("boom"); } },
        { t: "Save picture", fn: () => g.saveImage(c, "my-bridge") }, FIN(g)]));
      hl(tools, mat);
      g.loop((dt, tt) => {
        t = tt;
        if (testing) {
          for (let k = 0; k < 2; k++) step(1 / 120);
          if (car && !car.done) {
            if (car.w[0].x > CR + 30) { car.done = true; car.end = 1.6; car.msg = "You made it!"; wins++; g.score(beams.length + wins * 10); g.sfx("cheer"); pt.add(car.w[0].x, car.w[0].y, "#ffd23f", 24); }
            else if (car.w[0].y > H - 25 || car.w[1].y > H - 25) { car.done = true; car.end = 1.4; car.msg = "Splash! Try another way."; g.sfx("splash"); pt.add(car.w[0].x, H - 30, "#4cc3ff", 20); }
          }
          if (car && car.done) { car.end -= dt; if (car.end <= 0) reset(); }
        }
        sky(x, W, H, "#8fd3ff", "#e6f6ff"); cloud(x, ((t * 10) % 760) - 100, 60, 1); cloud(x, ((t * 6 + 350) % 760) - 100, 110, .7);
        x.fillStyle = "#2a8fd6"; x.fillRect(0, H - 35, W, 35); x.strokeStyle = "rgba(255,255,255,.6)"; x.lineWidth = 2; x.beginPath(); for (let i = 0; i <= W; i += 8) { const yy = H - 35 + Math.sin(i * .05 + t * 2) * 3; i ? x.lineTo(i, yy) : x.moveTo(i, yy); } x.stroke();
        x.fillStyle = "#8d6e63"; x.fillRect(0, CY, CL, H - CY); x.fillRect(CR, CY, W - CR, H - CY); x.fillStyle = "#5bb85b"; x.fillRect(0, CY - 4, CL, 10); x.fillRect(CR, CY - 4, W - CR, 10);
        if (!testing) { x.fillStyle = "rgba(0,0,0,.12)"; for (let gx = CL; gx <= CR; gx += 20) for (let gy = 60; gy <= 380; gy += 20) x.fillRect(gx - 1, gy - 1, 2, 2); }
        x.lineCap = "round";
        for (const b of beams) {
          x.beginPath(); x.moveTo(b.a.x, b.a.y); x.lineTo(b.b.x, b.b.y); x.lineWidth = b.m === "steel" ? 5 : 7; x.strokeStyle = b.m === "steel" ? "#7d93ad" : "#c98b4a"; x.stroke();
          if (testing && b.st) { const r = Math.min(1, b.st / (BRK[b.m] > 1 ? .15 : BRK[b.m])); x.globalAlpha = r; x.strokeStyle = "#ff3b3b"; x.stroke(); x.globalAlpha = 1; }
        }
        for (const n of nodes) { x.fillStyle = n.fix ? "#444" : "#fff"; x.strokeStyle = "#333"; x.lineWidth = 2; x.beginPath(); x.arc(n.x, n.y, 4, 0, 7); x.fill(); x.stroke(); }
        if (drag) { const l = Math.hypot(drag.a[0] - drag.b[0], drag.a[1] - drag.b[1]); x.beginPath(); x.moveTo(drag.a[0], drag.a[1]); x.lineTo(drag.b[0], drag.b[1]); x.lineWidth = 5; x.strokeStyle = l > MAXL ? "rgba(255,60,60,.7)" : "rgba(0,0,0,.35)"; x.setLineDash([8, 8]); x.stroke(); x.setLineDash([]); }
        if (car) {
          const A = car.w[0], Bw = car.w[1], mx = (A.x + Bw.x) / 2, my = (A.y + Bw.y) / 2, an = Math.atan2(A.y - Bw.y, A.x - Bw.x);
          x.save(); x.translate(mx, my); x.rotate(an); x.fillStyle = "#ff5a5f"; x.beginPath(); x.roundRect(-17, -17, 34, 11, 4); x.fill(); x.fillStyle = "#ff8a8d"; x.beginPath(); x.roundRect(-8, -24, 17, 9, 3); x.fill(); x.restore();
          x.fillStyle = "#222"; car.w.forEach(w => { x.beginPath(); x.arc(w.x, w.y, WR, 0, 7); x.fill(); x.fillStyle = "#aaa"; x.beginPath(); x.arc(w.x, w.y, 3, 0, 7); x.fill(); x.fillStyle = "#222"; });
          if (car.msg) txt(x, car.msg, W / 2, 120, 26);
        }
        txt(x, "START", CL / 2, CY - 22, 14); txt(x, "GOAL", CR + (W - CR) / 2, CY - 22, 14);
        pt.draw(x, dt);
        if (!beams.length && !testing) txt(x, "Press Auto bridge, or drag from dot to dot", W / 2, 150, 18);
      });
    }
  });

  // ---- 7. Castle Builder ----
  B.add({
    id: "s12-castle", name: "Castle Builder", ages: [5, 20], cat: "Build", color: "#b48cff", icon: "K",
    desc: "Build a castle with walls, towers, gates and waving flags.", controls: "Pick a piece and a colour, then tap squares to build. Erase takes pieces away.",
    start(g) {
      const cs = g.by(64, 40, 32), COLS = 640 / cs, ROWS = g.by(5, 8, 10), GH = 60, H = ROWS * cs + GH, { c, x, W, pos } = g.canvas(640, H);
      const STONE = ["#b8bcc8", "#e8d2a0", "#f4a6c0", "#a8d8f0", "#c8e6a0", "#d8b0f0"], ACC = ["#e74c3c", "#3498db", "#f1c40f", "#9b59b6", "#2ecc71", "#ff9f1c"];
      const SFX = { wall: "thump", top: "thump", win: "pop", gate: "lock", roof: "pop", flag: "flag", tree: "grow", banner: "swish", torch: "fizz", "": "drop" };
      const pt = parts(), hs = hist(), GY = ROWS * cs;
      let TY = new Array(COLS * ROWS).fill(""), CO = new Array(COLS * ROWS).fill(0), tool = "wall", col = 0, down = false, night = 0, nightOn = false, t = 0;
      const set = (q, r, ty, v) => { if (q >= 0 && r >= 0 && q < COLS && r < ROWS) { TY[r * COLS + q] = ty; CO[r * COLS + q] = v; } };
      const upd = () => { g.score(TY.filter(v => v).length); g.save({ cs, TY, CO }); };
      const sv = g.load();
      if (sv && sv.cs === cs && sv.TY && sv.TY.length === TY.length) { TY = sv.TY; CO = sv.CO || CO; }
      else {
        const c0 = (COLS >> 1) - 2, R1 = ROWS - 1; for (let k = 0; k < 5; k++) set(c0 + k, R1, "wall", 0); set(c0 + 2, R1, "gate", 0);
        for (const cc of [c0, c0 + 4]) { set(cc, R1 - 1, "win", 0); set(cc, R1 - 2, "wall", 0); set(cc, R1 - 3, "roof", 1); set(cc, R1 - 4, "flag", 1); }
        for (const cc of [c0 + 1, c0 + 2, c0 + 3]) set(cc, R1 - 1, "top", 0);
      }
      g.score(TY.filter(v => v).length);
      const paint = p => {
        const q = Math.floor(p.x / cs), r = Math.floor(p.y / cs); if (q < 0 || r < 0 || q >= COLS || r >= ROWS) return;
        const i = r * COLS + q, ty = tool === "erase" ? "" : tool; if (TY[i] === ty && (CO[i] === col || !ty)) return;
        TY[i] = ty; CO[i] = col; g.sfx(SFX[ty] || "pop"); pt.add((q + .5) * cs, (r + .5) * cs, ty ? ACC[col] : "#ccc", 8); upd();
      };
      g.on(c, "pointerdown", e => { down = true; hs.push({ TY, CO }); paint(pos(e)); });
      g.on(c, "pointermove", e => { if (down) paint(pos(e)); });
      g.on(window, "pointerup", () => { down = false; });
      const surprise = () => {
        hs.push({ TY, CO }); TY = new Array(COLS * ROWS).fill(""); CO = new Array(COLS * ROWS).fill(0);
        const R1 = ROWS - 1, step = g.by(4, 4, 4);
        for (let q = 1; q < COLS - 1; q += step) {
          const h = g.ri(2, Math.max(2, Math.min(ROWS - 1, 5))), v = g.ri(0, 5);
          for (let k = 0; k < h; k++) set(q, R1 - k, k === 1 && g.rand() < .6 ? "win" : "wall", v);
          set(q, R1 - h, "roof", v); set(q, R1 - h - 1, "flag", g.ri(0, 5));
          for (let k = 1; k < step && q + k < COLS - 1; k++) { set(q + k, R1, k === 2 ? "gate" : "wall", v); set(q + k, R1 - 1, "top", v); }
        }
        upd(); g.sfx("cheer");
      };
      const items = [["wall", "Wall"], ["gate", "Gate"], ["roof", "Roof"], ["flag", "Flag"], ["tree", "Tree"]];
      if (g.diff >= 1) items.push(["top", "Battlement"], ["win", "Window"]); if (g.diff >= 2) items.push(["banner", "Banner"], ["torch", "Torch"]); items.push(["erase", "Erase"]);
      const tools = bar(g, items.map(a => ({ t: a[1], id: a[0], fn: () => { tool = a[0]; hl(tools, tool); } })).concat([
        { t: "Undo", fn: () => { const s = hs.pop(); if (s) { TY = s.TY; CO = s.CO; upd(); g.sfx("back"); } } },
        { t: "Clear", fn: () => { hs.push({ TY, CO }); TY = new Array(COLS * ROWS).fill(""); upd(); g.sfx("boom"); } },
        { t: "Surprise me", fn: surprise }, { t: "Day / Night", fn: () => { nightOn = !nightOn; } }, { t: "Save picture", fn: () => g.saveImage(c, "my-castle") }, FIN(g)]));
      const sw = bar(g, ACC.map((cc, i) => ({ sw: 1, col: cc, id: i, fn: () => { col = i; hl(sw, i); } })));
      hl(tools, tool); hl(sw, 0);
      const mixc = (a, b, k) => "rgb(" + a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(",") + ")";
      const brick = (px, py, w, h, color) => {
        x.fillStyle = color; x.fillRect(px, py, w + .5, h + .5); x.strokeStyle = "rgba(0,0,0,.2)"; x.lineWidth = 1;
        for (let k = 0; k < 4; k++) { const yy = py + h * k / 4; if (k) { x.beginPath(); x.moveTo(px, yy); x.lineTo(px + w, yy); x.stroke(); } for (let j = 0; j < 2; j++) { const vx = px + (k % 2) * w * .25 + j * w * .5 + w * .25; if (vx < px + w) { x.beginPath(); x.moveTo(vx, yy); x.lineTo(vx, yy + h / 4); x.stroke(); } } }
      };
      const piece = (ty, v, px, py, s, i) => {
        const sw2 = Math.sin(t * 2 + i) * s * .03;
        if (ty === "wall") brick(px, py, s, s, STONE[v]);
        else if (ty === "top") { brick(px, py + s * .32, s, s * .68, STONE[v]); for (let k = 0; k < 3; k++) brick(px + s * (.04 + k * .36), py + s * .1, s * .28, s * .24, STONE[v]); }
        else if (ty === "win") { brick(px, py, s, s, STONE[v]); x.fillStyle = night > .4 ? "#ffd966" : "#2c3e50"; x.beginPath(); x.moveTo(px + s * .35, py + s * .75); x.lineTo(px + s * .35, py + s * .4); x.arc(px + s * .5, py + s * .4, s * .15, Math.PI, 0); x.lineTo(px + s * .65, py + s * .75); x.fill(); x.strokeStyle = "#5d4037"; x.lineWidth = 2; x.beginPath(); x.moveTo(px + s * .5, py + s * .25); x.lineTo(px + s * .5, py + s * .75); x.stroke(); }
        else if (ty === "gate") { brick(px, py, s, s, STONE[v]); x.fillStyle = "#6d4c41"; x.beginPath(); x.moveTo(px + s * .2, py + s); x.lineTo(px + s * .2, py + s * .42); x.arc(px + s * .5, py + s * .42, s * .3, Math.PI, 0); x.lineTo(px + s * .8, py + s); x.fill(); x.strokeStyle = "#3e2723"; x.lineWidth = 2; for (let k = 1; k < 4; k++) { x.beginPath(); x.moveTo(px + s * (.2 + k * .15), py + s * .4); x.lineTo(px + s * (.2 + k * .15), py + s); x.stroke(); } x.fillStyle = "#ffd23f"; x.beginPath(); x.arc(px + s * .62, py + s * .7, s * .035, 0, 7); x.fill(); }
        else if (ty === "roof") { x.fillStyle = ACC[v]; x.beginPath(); x.moveTo(px - s * .06, py + s); x.lineTo(px + s * .5, py + s * .04); x.lineTo(px + s * 1.06, py + s); x.closePath(); x.fill(); x.strokeStyle = "rgba(0,0,0,.3)"; x.lineWidth = 2; x.stroke(); x.fillStyle = "rgba(255,255,255,.25)"; x.beginPath(); x.moveTo(px + s * .5, py + s * .04); x.lineTo(px + s * .3, py + s * .6); x.lineTo(px + s * .45, py + s * .6); x.fill(); }
        else if (ty === "flag") { x.strokeStyle = "#5d4037"; x.lineWidth = 3; x.beginPath(); x.moveTo(px + s * .35, py + s); x.lineTo(px + s * .35, py + s * .1); x.stroke(); x.fillStyle = ACC[v]; x.beginPath(); x.moveTo(px + s * .35, py + s * .1); for (let k = 0; k <= 6; k++) x.lineTo(px + s * (.35 + k * .1), py + s * .14 + Math.sin(t * 6 + k * .9 + i) * s * .04 * (k / 6)); for (let k = 6; k >= 0; k--) x.lineTo(px + s * (.35 + k * .1), py + s * .42 + Math.sin(t * 6 + k * .9 + i) * s * .04 * (k / 6)); x.closePath(); x.fill(); }
        else if (ty === "tree") { x.fillStyle = "#6d4c41"; x.fillRect(px + s * .44, py + s * .6, s * .12, s * .4); x.fillStyle = "#2e9d55"; x.beginPath(); x.arc(px + s * .5 + sw2, py + s * .42, s * .3, 0, 7); x.fill(); x.fillStyle = "#3dbb68"; x.beginPath(); x.arc(px + s * .42 + sw2, py + s * .34, s * .18, 0, 7); x.fill(); }
        else if (ty === "banner") { x.save(); x.translate(px + s * .5, py + s * .05); x.rotate(Math.sin(t * 2 + i) * .08); x.fillStyle = ACC[v]; x.beginPath(); x.moveTo(-s * .22, 0); x.lineTo(s * .22, 0); x.lineTo(s * .22, s * .7); x.lineTo(0, s * .55); x.lineTo(-s * .22, s * .7); x.closePath(); x.fill(); x.fillStyle = "#ffd23f"; x.beginPath(); x.arc(0, s * .25, s * .09, 0, 7); x.fill(); x.restore(); x.fillStyle = "#5d4037"; x.fillRect(px + s * .2, py + s * .02, s * .6, s * .05); }
        else if (ty === "torch") { x.fillStyle = "#5d4037"; x.fillRect(px + s * .46, py + s * .45, s * .08, s * .45); const f = 1 + Math.sin(t * 15 + i * 3) * .15; x.fillStyle = "rgba(255,170,40,.3)"; x.beginPath(); x.arc(px + s * .5, py + s * .35, s * .3 * f, 0, 7); x.fill(); x.fillStyle = "#ff9f1c"; x.beginPath(); x.ellipse(px + s * .5, py + s * .33, s * .1, s * .17 * f, 0, 0, 7); x.fill(); x.fillStyle = "#ffe36b"; x.beginPath(); x.ellipse(px + s * .5, py + s * .37, s * .05, s * .09 * f, 0, 0, 7); x.fill(); }
      };
      g.loop((dt, tt) => {
        t = tt; night += ((nightOn ? 1 : 0) - night) * Math.min(1, dt * 3);
        const gr = x.createLinearGradient(0, 0, 0, GY); gr.addColorStop(0, mixc([127, 212, 255], [11, 29, 74], night)); gr.addColorStop(1, mixc([232, 247, 255], [42, 63, 122], night)); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        if (night > .1) { x.fillStyle = "rgba(255,255,255," + night + ")"; for (let i = 0; i < 25; i++) { x.fillRect((i * 83) % W, (i * 37) % (GY * .6), 2, 2); } }
        x.fillStyle = night > .5 ? "#f4f1de" : "#ffe36b"; x.beginPath(); x.arc(560, 55 + night * 10, 26, 0, 7); x.fill();
        cloud(x, ((t * 12) % 760) - 100, 60, 1); cloud(x, ((t * 8 + 300) % 760) - 100, 110, .7);
        const bx = (t * 40) % 760 - 60, by = 90 + Math.sin(t * 1.5) * 12, wf = Math.sin(t * 14) * 7; x.strokeStyle = night > .5 ? "#ddd" : "#444"; x.lineWidth = 2; x.beginPath(); x.moveTo(bx - 9, by - wf); x.lineTo(bx, by); x.lineTo(bx + 9, by - wf); x.stroke();
        x.fillStyle = "#79d36b"; x.fillRect(0, GY, W, GH); x.fillStyle = "#5bb85b"; x.fillRect(0, GY, W, 6);
        x.strokeStyle = "rgba(255,255,255,.18)"; x.lineWidth = 1; for (let q = 1; q < COLS; q++) { x.beginPath(); x.moveTo(q * cs, 0); x.lineTo(q * cs, GY); x.stroke(); } for (let r = 1; r < ROWS; r++) { x.beginPath(); x.moveTo(0, r * cs); x.lineTo(W, r * cs); x.stroke(); }
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) { const i = r * COLS + q; if (TY[i]) piece(TY[i], CO[i] % 6, q * cs, r * cs, cs, i); }
        pt.draw(x, dt);
        if (!TY.some(v => v)) txt(x, "Tap squares to build your castle!", W / 2, GY / 2, 22);
      });
    }
  });

  // ---- 8. Maze Maker ----
  B.add({
    id: "s12-maze", name: "Maze Maker", ages: [5, 20], cat: "Build", color: "#7b6cff", icon: "Z",
    desc: "Draw your own maze, then watch a little bug explore it or run it yourself.", controls: "Drag to paint walls. Press Solve to watch the bug explore, or Play to steer it with arrows, swipes or the buttons.",
    start(g) {
      const N = g.by(11, 17, 25), { c, x, W, H, pos } = g.canvas(600, 600), cell = W / N, pt = parts(), hs = hist(), D = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      let grid = new Array(N * N).fill(0), st = { x: 1, y: 1 }, goal = { x: N - 2, y: N - 2 }, tool = "wall", mode = "edit", down = false, paintV = 1, ch = null, sol = null, hold = null, msg = "", msgT = 0, t = 0, sndT = 0, fog = false, found = false;
      const gen = () => {
        grid = new Array(N * N).fill(1); const stack = [[1, 1]]; grid[N + 1] = 0;
        while (stack.length) {
          const [cx, cy] = stack[stack.length - 1], nb = D.map(d => [d[0] * 2, d[1] * 2]).filter(d => { const nx = cx + d[0], ny = cy + d[1]; return nx > 0 && ny > 0 && nx < N - 1 && ny < N - 1 && grid[ny * N + nx] === 1; });
          if (!nb.length) { stack.pop(); continue; } const d = g.pick(nb); grid[(cy + d[1] / 2) * N + cx + d[0] / 2] = 0; grid[(cy + d[1]) * N + cx + d[0]] = 0; stack.push([cx + d[0], cy + d[1]]);
        }
        const ex = g.by(.12, .06, 0); for (let y = 1; y < N - 1; y++) for (let q = 1; q < N - 1; q++) if (grid[y * N + q] && (q + y) % 2 === 1 && g.rand() < ex) grid[y * N + q] = 0;
        st = { x: 1, y: 1 }; goal = { x: N - 2, y: N - 2 };
      };
      const snap = () => ({ grid, st, goal });
      const upd = () => g.save({ N, grid, st, goal });
      const sv = g.load(); if (sv && sv.N === N && sv.grid && sv.grid.length === N * N) { grid = sv.grid; st = sv.st; goal = sv.goal; } else gen();
      const place = () => { ch = { x: st.x, y: st.y, tx: st.x, ty: st.y, p: 1 }; found = false; };
      place();
      const free = (q, r) => q >= 0 && r >= 0 && q < N && r < N && !grid[r * N + q];
      const bfs = () => {
        const dist = new Array(N * N).fill(-1), par = new Array(N * N).fill(-1), order = [], q = [st.y * N + st.x]; dist[q[0]] = 0;
        for (let h = 0; h < q.length; h++) { const cur = q[h]; order.push(cur); const cx = cur % N, cy = (cur / N) | 0; for (const d of D) { const nx = cx + d[0], ny = cy + d[1]; if (!free(nx, ny)) continue; const ni = ny * N + nx; if (dist[ni] >= 0) continue; dist[ni] = dist[cur] + 1; par[ni] = cur; q.push(ni); } }
        const gi = goal.y * N + goal.x, path = []; if (dist[gi] >= 0) { for (let k = gi; k !== -1; k = par[k]) path.push(k); path.reverse(); }
        return { order, dist, path };
      };
      const say = (m, d) => { msg = m; msgT = d || 2; };
      const win = () => { if (found) return; found = true; g.add(1); g.sfx("cheer"); pt.add((goal.x + .5) * cell, (goal.y + .5) * cell, "#ffd23f", 30, 160); say("You found the way out!", 2.5); };
      const solve = () => { place(); mode = "solve"; sol = Object.assign(bfs(), { k: 0, pi: 0, phase: 0, wait: 0 }); sol.rate = Math.max(25, sol.order.length / 2.5); g.sfx("launch"); };
      const play = () => { if (mode === "play") { mode = "edit"; sol = null; return; } place(); mode = "play"; sol = null; };
      const paint = p => {
        const q = Math.floor(p.x / cell), r = Math.floor(p.y / cell); if (q < 0 || r < 0 || q >= N || r >= N) return;
        if ((q === st.x && r === st.y) || (q === goal.x && r === goal.y)) return;
        const i = r * N + q; if (grid[i] === paintV) return; grid[i] = paintV; if (sndT <= 0) { g.sfx(paintV ? "tick" : "pop"); sndT = .05; } upd();
      };
      const holdFrom = p => { if (!ch) return; const dx = p.x - (ch.x + .5) * cell, dy = p.y - (ch.y + .5) * cell; if (Math.hypot(dx, dy) < cell * .4) { hold = null; return; } hold = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? D[1] : D[3]) : (dy > 0 ? D[2] : D[0]); };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        if (mode === "play") { holdFrom(p); down = true; return; }
        if (mode !== "edit") return;
        const q = Math.floor(p.x / cell), r = Math.floor(p.y / cell); if (q < 0 || r < 0 || q >= N || r >= N) return;
        hs.push(snap());
        if (tool === "start" || tool === "goal") { if (tool === "start") st = { x: q, y: r }; else goal = { x: q, y: r }; grid[r * N + q] = 0; place(); g.sfx("pop"); pt.add((q + .5) * cell, (r + .5) * cell, "#fff", 8); upd(); return; }
        paintV = tool === "wall" ? 1 : 0; down = true; paint(p);
      });
      g.on(c, "pointermove", e => { if (!down) return; const p = pos(e); if (mode === "play") holdFrom(p); else if (mode === "edit") paint(p); });
      g.on(window, "pointerup", () => { down = false; if (mode === "play") hold = null; });
      const items = [{ t: "Wall", id: "wall" }, { t: "Path", id: "path" }]; if (g.diff >= 1) items.push({ t: "Start", id: "start" }, { t: "Goal", id: "goal" });
      const tools = bar(g, items.map(it => ({ t: it.t, id: it.id, fn: () => { tool = it.id; if (mode !== "edit") { mode = "edit"; sol = null; } hl(tools, tool); } })).concat([
        { t: "Random maze", fn: () => { hs.push(snap()); gen(); place(); mode = "edit"; sol = null; g.add(1); upd(); g.sfx("cheer"); } },
        { t: "Solve (watch)", col: "#ffd23f", fn: solve }, { t: "Play / Edit", col: "#6be28f", fn: play },
        { t: "Undo", fn: () => { const s = hs.pop(); if (s) { grid = s.grid; st = s.st; goal = s.goal; place(); mode = "edit"; upd(); g.sfx("back"); } } },
        { t: "Clear", fn: () => { hs.push(snap()); grid = new Array(N * N).fill(0); mode = "edit"; upd(); g.sfx("boom"); } }]
        .concat(g.diff >= 2 ? [{ t: "Fog: off", fn: b => { fog = !fog; b.textContent = "Fog: " + (fog ? "on" : "off"); } }] : []))
        .concat([{ t: "Save picture", fn: () => g.saveImage(c, "my-maze") }, FIN(g)]));
      hl(tools, tool);
      const dp = g.html('<div style="display:flex;gap:6px;justify-content:center;padding:4px"></div>');
      [["Left", 3], ["Up", 0], ["Down", 2], ["Right", 1]].forEach(a => { const b = document.createElement("button"); b.type = "button"; b.className = "bg-btn"; b.textContent = a[0]; b.style.minWidth = "64px"; b.style.minHeight = "44px"; b.onpointerdown = e => { e.preventDefault(); hold = D[a[1]]; if (mode !== "play") play(); }; b.onpointerup = b.onpointerleave = b.onpointercancel = () => { if (hold === D[a[1]]) hold = null; }; dp.firstChild.appendChild(b); });
      g.loop((dt, tt) => {
        t = tt; sndT -= dt; if (msgT > 0) msgT -= dt;
        if (mode === "play" && ch) {
          if (ch.p < 1) { ch.p += 9 * dt; if (ch.p >= 1) { ch.p = 1; ch.x = ch.tx; ch.y = ch.ty; if (ch.x === goal.x && ch.y === goal.y) win(); } }
          if (ch.p >= 1) {
            const d = g.keys.ArrowLeft ? D[3] : g.keys.ArrowRight ? D[1] : g.keys.ArrowUp ? D[0] : g.keys.ArrowDown ? D[2] : hold;
            if (d && free(ch.x + d[0], ch.y + d[1])) { ch.tx = ch.x + d[0]; ch.ty = ch.y + d[1]; ch.p = 0; g.sfx("tick"); }
          }
        }
        if (mode === "solve" && sol && ch) {
          if (sol.phase === 0) { sol.k += sol.rate * dt; if (sol.k >= sol.order.length) { sol.k = sol.order.length; sol.phase = sol.path.length ? 1 : 2; if (sol.phase === 2) { say("No way through! Try opening a path.", 2.5); g.sfx("wrong"); } } }
          else if (sol.phase === 1) { sol.pi += 11 * dt; const i = Math.min(sol.path.length - 1, Math.floor(sol.pi)), a = sol.path[i], b = sol.path[Math.min(sol.path.length - 1, i + 1)], u = sol.pi - i; ch.x = (a % N) + (((b % N) - (a % N)) * Math.min(1, u)); ch.y = ((a / N) | 0) + ((((b / N) | 0) - ((a / N) | 0)) * Math.min(1, u)); ch.p = 1; if (sol.pi >= sol.path.length - 1) { win(); sol.phase = 3; } }
          else if (sol.phase === 2) { sol.wait += dt; ch.x = st.x + Math.sin(sol.wait * 30) * .06; if (sol.wait > 2) { ch.x = st.x; mode = "edit"; sol = null; } }
        }
        x.fillStyle = "#f6efdc"; x.fillRect(0, 0, W, H);
        for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) if ((q + r) % 2 === 0) { x.fillStyle = "rgba(0,0,0,.035)"; x.fillRect(q * cell, r * cell, cell, cell); }
        if (sol) for (let k = 0; k < Math.floor(sol.k); k++) { const i = sol.order[k]; x.fillStyle = "hsla(" + ((sol.dist[i] * 7) % 360) + ",80%,60%,.55)"; x.fillRect((i % N) * cell, ((i / N) | 0) * cell, cell, cell); }
        if (sol && sol.phase >= 1 && sol.path.length) { x.strokeStyle = "#ff5a5f"; x.lineWidth = Math.max(3, cell * .2); x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); sol.path.forEach((i, k) => { const px = (i % N + .5) * cell, py = (((i / N) | 0) + .5) * cell; k ? x.lineTo(px, py) : x.moveTo(px, py); }); x.stroke(); }
        for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) if (grid[r * N + q]) {
          const px = q * cell, py = r * cell; x.fillStyle = "#3d2f70"; x.beginPath(); x.roundRect(px + 1, py + 2, cell - 2, cell - 2, cell * .2); x.fill(); x.fillStyle = "#6b58b5"; x.beginPath(); x.roundRect(px + 1, py, cell - 2, cell * .78, cell * .2); x.fill();
          x.fillStyle = "rgba(255,255,255,.22)"; x.fillRect(px + cell * .2, py + cell * .12, cell * .35, cell * .1);
        }
        const sx = (st.x + .5) * cell, sy = (st.y + .5) * cell; x.fillStyle = "rgba(107,226,143,.7)"; x.beginPath(); x.arc(sx, sy, cell * .42, 0, 7); x.fill();
        const gx = (goal.x + .5) * cell, gy = (goal.y + .5) * cell, pu = 1 + Math.sin(t * 5) * .08; x.fillStyle = "rgba(255,210,63,.4)"; x.beginPath(); x.arc(gx, gy, cell * .48 * pu, 0, 7); x.fill();
        x.strokeStyle = "#5d4037"; x.lineWidth = 3; x.beginPath(); x.moveTo(gx - cell * .12, gy + cell * .32); x.lineTo(gx - cell * .12, gy - cell * .34); x.stroke(); x.fillStyle = "#ff5a5f"; x.beginPath(); x.moveTo(gx - cell * .12, gy - cell * .34); for (let k = 0; k <= 4; k++) x.lineTo(gx - cell * .12 + k * cell * .1, gy - cell * .3 + Math.sin(t * 7 + k) * cell * .03); x.lineTo(gx + cell * .28, gy - cell * .1); for (let k = 4; k >= 0; k--) x.lineTo(gx - cell * .12 + k * cell * .1, gy - cell * .1 + Math.sin(t * 7 + k) * cell * .03); x.fill();
        if (ch) {
          const px = (ch.x + (ch.tx - ch.x) * (ch.p < 1 ? ch.p : 0) + .5) * cell, py = (ch.y + (ch.ty - ch.y) * (ch.p < 1 ? ch.p : 0) + .5) * cell + Math.sin(t * 8) * cell * .03, r = cell * .34;
          x.fillStyle = "rgba(0,0,0,.2)"; x.beginPath(); x.ellipse(px, py + r * .9, r * .9, r * .3, 0, 0, 7); x.fill();
          x.strokeStyle = "#7a4a00"; x.lineWidth = 2; for (let k = -1; k <= 1; k++) { const w = Math.sin(t * 16 + k) * r * .25; x.beginPath(); x.moveTo(px - r, py + k * r * .5); x.lineTo(px - r * 1.3, py + k * r * .5 + w); x.moveTo(px + r, py + k * r * .5); x.lineTo(px + r * 1.3, py + k * r * .5 - w); x.stroke(); }
          x.fillStyle = "#ffb703"; x.beginPath(); x.arc(px, py, r, 0, 7); x.fill(); x.fillStyle = "#fff"; [-.4, .4].forEach(o => { x.beginPath(); x.arc(px + o * r, py - r * .25, r * .3, 0, 7); x.fill(); }); x.fillStyle = "#222"; [-.4, .4].forEach(o => { x.beginPath(); x.arc(px + o * r, py - r * .2, r * .13, 0, 7); x.fill(); });
          if (fog && mode === "play") { const fg = x.createRadialGradient(px, py, cell * 1.4, px, py, cell * 4); fg.addColorStop(0, "rgba(10,10,40,0)"); fg.addColorStop(1, "rgba(10,10,40,.96)"); x.fillStyle = fg; x.fillRect(0, 0, W, H); }
        }
        pt.draw(x, dt);
        if (msgT > 0) txt(x, msg, W / 2, 40, 26);
        if (mode === "edit" && !grid.some(v => v)) txt(x, "Drag to paint walls!", W / 2, H / 2, 26);
      });
    }
  });

  // ---- 9. Platformer Maker ----
  B.add({
    id: "s12-platform", name: "Platformer Maker", ages: [6, 20], cat: "Build", color: "#4cc3ff", icon: "P",
    desc: "Design your own side-scrolling level, then jump in and play it!", controls: "Pick a block and paint the level. Press Play: arrows or A/D run, Up or Space jump. On phones use the buttons.",
    start(g) {
      const cs = g.by(40, 32, 32), COLS = 640 / cs, ROWS = g.by(9, 12, 12), H = ROWS * cs, { c, x, W, pos } = g.canvas(640, H);
      const pt = parts(), hs = hist(), PW = .7, PH = .9, ID = { ground: 1, brick: 2, spike: 3, coin: 4, slime: 5, spring: 6, flag: 7, cloud: 8, erase: 0 };
      let lv = new Array(COLS * ROWS).fill(0), sx = 1, sy = ROWS - 3, tool = "ground", mode = "edit", down = false, pl = null, ents = [], P = null, jb = 0, coyote = 0, tL = false, tR = false, bonus = 0, msg = "", msgT = 0, winT = 0, t = 0;
      const solid = v => v === 1 || v === 2;
      const tile = (q, r) => (q < 0 || q >= COLS ? 1 : r < 0 || r >= ROWS ? 0 : pl[r * COLS + q]);
      const cnt = () => { let n = 0, gr = 0; for (const v of lv) { if (v === 1) gr++; else if (v) n++; } return n + Math.floor(gr / 5); };
      const upd = () => { g.score(cnt() + bonus); g.save({ cs, lv, sx, sy }); };
      const dflt = () => {
        lv = new Array(COLS * ROWS).fill(0); const gr = ROWS - 2, mid = COLS >> 1;
        for (let r = gr; r < ROWS; r++) for (let q = 0; q < COLS; q++) if (!(g.diff && (q === mid || q === mid + 1))) lv[r * COLS + q] = 1;
        for (let q = 3; q < 6; q++) lv[(gr - 3) * COLS + q] = g.diff ? 2 : 1; for (let q = 3; q < 6; q++) lv[(gr - 4) * COLS + q] = 4;
        for (let q = 7; q < 10; q++) lv[(gr - 1) * COLS + q] = 4; lv[(gr - 1) * COLS + COLS - 2] = 7; if (g.diff) lv[(gr - 1) * COLS + mid + 4] = 5;
        sx = 1; sy = gr - 1;
      };
      const sv = g.load(); if (sv && sv.cs === cs && sv.lv && sv.lv.length === lv.length) { lv = sv.lv; sx = sv.sx; sy = sv.sy; } else dflt();
      g.score(cnt());
      const respawn = () => { P = { x: sx + .15, y: sy, vx: 0, vy: 0, on: false, face: 1, sq: 0, dead: 0 }; };
      const enter = () => {
        pl = lv.slice(); pl[sy * COLS + sx] = 0; ents = []; for (let i = 0; i < pl.length; i++) if (pl[i] === 5) { ents.push({ x: (i % COLS) + .1, y: Math.floor(i / COLS) + .3, dir: -1, alive: true, sq: 0 }); pl[i] = 0; }
        respawn(); mode = "play"; tools.mode.textContent = "Edit"; pad.style.display = "flex"; g.sfx("launch");
      };
      const leave = () => { mode = "edit"; pl = null; tools.mode.textContent = "Play"; pad.style.display = "none"; };
      const die = () => { if (P.dead > 0) return; P.dead = .7; g.sfx("wrong"); pt.add((P.x + .35) * cs, (P.y + .45) * cs, "#ff5a5f", 14); };
      const paint = p => {
        const q = Math.floor(p.x / cs), r = Math.floor(p.y / cs); if (q < 0 || r < 0 || q >= COLS || r >= ROWS) return; const i = r * COLS + q;
        if (tool === "start") { if (sx === q && sy === r) return; sx = q; sy = r; lv[i] = 0; g.sfx("pop"); upd(); return; }
        const v = ID[tool]; if (lv[i] === v) return; lv[i] = v; g.sfx(v ? "pop" : "drop"); pt.add((q + .5) * cs, (r + .5) * cs, "#fff", 6); upd();
      };
      g.on(c, "pointerdown", e => { if (mode !== "edit") return; down = true; hs.push({ lv, sx, sy }); paint(pos(e)); });
      g.on(c, "pointermove", e => { if (down && mode === "edit") paint(pos(e)); });
      g.on(window, "pointerup", () => { down = false; });
      g.on(window, "keydown", e => { if (mode === "play" && ["ArrowUp", " ", "w", "W"].includes(e.key)) jb = .12; });
      const surprise = () => {
        hs.push({ lv, sx, sy }); lv = new Array(COLS * ROWS).fill(0); const gr = ROWS - 2;
        for (let q = 0; q < COLS; q++) { const gap = g.diff && q > 3 && q < COLS - 3 && g.rand() < .15; if (!gap) for (let r = gr; r < ROWS; r++) lv[r * COLS + q] = 1; }
        for (let k = 0; k < g.by(3, 5, 7); k++) { const q = g.ri(2, COLS - 6), r = gr - g.ri(2, 4), w = g.ri(2, 4); for (let j = 0; j < w; j++) { lv[r * COLS + q + j] = g.diff >= 2 && j % 2 ? 8 : g.diff ? 2 : 1; lv[(r - 1) * COLS + q + j] = 4; } }
        for (let q = 3; q < COLS - 3; q++) if (lv[gr * COLS + q] === 1 && lv[(gr - 1) * COLS + q] === 0 && g.rand() < .12) lv[(gr - 1) * COLS + q] = g.diff ? g.pick([5, 3, 4, g.diff > 1 ? 6 : 4]) : 4;
        lv[gr * COLS + COLS - 2] = 1; lv[(gr - 1) * COLS + COLS - 2] = 7; sx = 1; sy = gr - 1; lv[sy * COLS + sx] = 0; upd(); g.sfx("cheer");
      };
      const items = [["ground", "Ground"], ["coin", "Coin"], ["flag", "Goal flag"], ["start", "Start"]];
      if (g.diff >= 1) items.push(["brick", "Brick"], ["spike", "Spikes"], ["slime", "Slime"]); if (g.diff >= 2) items.push(["spring", "Spring"], ["cloud", "Cloud"]); items.push(["erase", "Erase"]);
      const tools = bar(g, [{ t: "Play", id: "mode", col: "#6be28f", fn: () => { if (mode === "edit") enter(); else leave(); } }].concat(items.map(a => ({ t: a[1], id: a[0], fn: () => { tool = a[0]; hl(tools, tool); if (mode === "play") leave(); } })))
        .concat([{ t: "Undo", fn: () => { const s = hs.pop(); if (s && mode === "edit") { lv = s.lv; sx = s.sx; sy = s.sy; upd(); g.sfx("back"); } } }, { t: "Clear", fn: () => { if (mode !== "edit") return; hs.push({ lv, sx, sy }); lv = new Array(COLS * ROWS).fill(0); upd(); g.sfx("boom"); } },
          { t: "Surprise me", fn: () => { if (mode === "edit") surprise(); } }, { t: "Save picture", fn: () => g.saveImage(c, "my-level") }, FIN(g)]));
      hl(tools, tool);
      const pad = g.html('<div style="display:none;gap:10px;justify-content:center;padding:6px"></div>').firstChild;
      [["Left", v => { tL = v; }], ["Jump", v => { if (v) jb = .12; }], ["Right", v => { tR = v; }]].forEach(a => { const b = document.createElement("button"); b.type = "button"; b.className = "bg-btn"; b.textContent = a[0]; b.style.minWidth = "90px"; b.style.minHeight = "52px"; b.style.fontSize = "18px"; b.onpointerdown = e => { e.preventDefault(); a[1](true); }; b.onpointerup = b.onpointerleave = b.onpointercancel = () => a[1](false); pad.appendChild(b); });
      const gtile = (v, px, py, q, r) => {
        const s = cs;
        if (v === 1) { x.fillStyle = "#8b5a2b"; x.fillRect(px, py, s + .5, s + .5); x.fillStyle = "#74481f"; x.fillRect(px + s * .2, py + s * .5, s * .15, s * .12); x.fillRect(px + s * .6, py + s * .7, s * .15, s * .12); const above = r > 0 ? (pl || lv)[(r - 1) * COLS + q] : 0; if (!solid(above)) { x.fillStyle = "#5bd45b"; x.fillRect(px, py, s + .5, s * .24); x.fillStyle = "#3fb13f"; x.fillRect(px, py + s * .2, s + .5, s * .06); } }
        else if (v === 2) { x.fillStyle = "#e08a3c"; x.fillRect(px, py, s + .5, s + .5); x.strokeStyle = "rgba(0,0,0,.25)"; x.lineWidth = 1.5; for (let k = 1; k < 3; k++) { x.beginPath(); x.moveTo(px, py + s * k / 3); x.lineTo(px + s, py + s * k / 3); x.stroke(); } for (let k = 0; k < 3; k++) { const vx = px + s * (k % 2 ? .25 : .65); x.beginPath(); x.moveTo(vx, py + s * k / 3); x.lineTo(vx, py + s * (k + 1) / 3); x.stroke(); } }
        else if (v === 3) { x.fillStyle = "#aab4c0"; for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(px + s * k / 3, py + s); x.lineTo(px + s * (k + .5) / 3, py + s * .45); x.lineTo(px + s * (k + 1) / 3, py + s); x.fill(); } }
        else if (v === 4) { const w = Math.abs(Math.cos(t * 3 + q)) * s * .22 + s * .05; x.fillStyle = "#ffc400"; x.beginPath(); x.ellipse(px + s / 2, py + s / 2 + Math.sin(t * 4 + q) * s * .03, w, s * .25, 0, 0, 7); x.fill(); x.fillStyle = "#fff3a0"; x.beginPath(); x.ellipse(px + s / 2 - w * .3, py + s * .42, w * .3, s * .12, 0, 0, 7); x.fill(); }
        else if (v === 5) slime(px + s * .1, py + s * .3, 1, 0);
        else if (v === 6) { x.fillStyle = "#777"; x.fillRect(px + s * .15, py + s * .85, s * .7, s * .15); x.strokeStyle = "#e53935"; x.lineWidth = 3; x.beginPath(); x.moveTo(px + s * .3, py + s * .85); for (let k = 0; k < 4; k++) x.lineTo(px + s * (k % 2 ? .3 : .7), py + s * (.85 - k * .12)); x.stroke(); x.fillStyle = "#e53935"; x.fillRect(px + s * .2, py + s * .42, s * .6, s * .1); }
        else if (v === 7) { x.strokeStyle = "#5d4037"; x.lineWidth = 3; x.beginPath(); x.moveTo(px + s * .3, py + s); x.lineTo(px + s * .3, py + s * .05); x.stroke(); x.fillStyle = "#ff5a5f"; x.beginPath(); x.moveTo(px + s * .3, py + s * .08); for (let k = 0; k <= 5; k++) x.lineTo(px + s * (.3 + k * .1), py + s * (.12 + Math.sin(t * 6 + k) * .03)); for (let k = 5; k >= 0; k--) x.lineTo(px + s * (.3 + k * .1), py + s * (.4 + Math.sin(t * 6 + k) * .03)); x.fill(); }
        else if (v === 8) { x.fillStyle = "rgba(255,255,255,.95)"; x.beginPath(); x.roundRect(px, py, s, s * .35, s * .17); x.fill(); x.strokeStyle = "#bfe3ff"; x.lineWidth = 2; x.stroke(); }
      };
      const slime = (px, py, sq, dir) => { const s = cs, w = s * .8, h = s * .7 * (1 + sq * .2); x.fillStyle = "#5fd35f"; x.beginPath(); x.moveTo(px, py + s * .7); x.quadraticCurveTo(px, py + s * .7 - h, px + w / 2, py + s * .7 - h); x.quadraticCurveTo(px + w, py + s * .7 - h, px + w, py + s * .7); x.closePath(); x.fill(); x.fillStyle = "#fff"; [.3, .7].forEach(o => { x.beginPath(); x.arc(px + w * o, py + s * .7 - h * .55, s * .09, 0, 7); x.fill(); }); x.fillStyle = "#222"; [.3, .7].forEach(o => { x.beginPath(); x.arc(px + w * o + dir * 1.5, py + s * .7 - h * .52, s * .045, 0, 7); x.fill(); }); };
      const stepPlay = dt => {
        if (P.dead > 0) { P.dead -= dt; if (P.dead <= 0) respawn(); return; }
        const ax = (g.keys.ArrowRight || tR ? 1 : 0) - (g.keys.ArrowLeft || tL ? 1 : 0); P.vx += (ax * 7 - P.vx) * Math.min(1, dt * (P.on ? 16 : 8)); if (ax) P.face = ax;
        coyote = P.on ? .1 : coyote - dt; if (jb > 0) jb -= dt;
        if (jb > 0 && coyote > 0) { P.vy = -15.5; P.on = false; coyote = 0; jb = 0; g.sfx("swish"); P.sq = -.3; }
        P.vy = Math.min(22, P.vy + 45 * dt); P.x += P.vx * dt;
        for (let r = Math.floor(P.y + .05); r <= Math.floor(P.y + PH - .05); r++) for (let q = Math.floor(P.x); q <= Math.floor(P.x + PW - .0001); q++) if (solid(tile(q, r))) { if (P.vx > 0) P.x = q - PW - .001; else if (P.vx < 0) P.x = q + 1.001; P.vx = 0; }
        const ob = P.y + PH, was = P.on; P.y += P.vy * dt; P.on = false;
        for (let q = Math.floor(P.x + .0001); q <= Math.floor(P.x + PW - .0001); q++) for (let r = Math.floor(P.y); r <= Math.floor(P.y + PH - .0001); r++) {
          const v = tile(q, r);
          if (solid(v)) { if (P.vy > 0) { P.y = r - PH - .001; P.on = true; } else P.y = r + 1.001; P.vy = 0; }
          else if (v === 8 && P.vy > 0 && ob <= r + .02 && P.y + PH > r) { P.y = r - PH - .001; P.on = true; P.vy = 0; }
        }
        if (P.on && !was) P.sq = .3; if (P.sq) P.sq += (0 - P.sq) * Math.min(1, dt * 10);
        for (let q = Math.floor(P.x); q <= Math.floor(P.x + PW); q++) for (let r = Math.floor(P.y); r <= Math.floor(P.y + PH); r++) {
          const v = tile(q, r), i = r * COLS + q; if (r < 0 || r >= ROWS || q < 0 || q >= COLS) continue;
          if (v === 4) { pl[i] = 0; bonus++; g.sfx("note", 700 + (bonus % 5) * 100); pt.add((q + .5) * cs, (r + .5) * cs, "#ffc400", 8); upd(); }
          else if (v === 3 && P.x + PW > q + .2 && P.x < q + .8 && P.y + PH > r + .5) die();
          else if (v === 6 && P.vy >= 0 && P.y + PH > r + .5 && ob <= r + .6) { P.vy = -24; g.sfx("launch"); pt.add((q + .5) * cs, (r + .5) * cs, "#e53935", 10); }
          else if (v === 7 && !winT) { winT = 1.6; bonus += 10; upd(); g.sfx("cheer"); pt.add((q + .5) * cs, (r + .5) * cs, "#ffd23f", 30, 170); msg = "Level complete!"; msgT = 1.6; }
        }
        if (P.y > ROWS + 1) die();
        for (const e of ents) if (e.alive) {
          const nx = e.x + e.dir * 2 * dt, fq = Math.floor(nx + (e.dir > 0 ? .8 : 0)), ahead = solid(tile(fq, Math.floor(e.y + .35))), floor = tile(fq, Math.round(e.y + .7));
          if (ahead || !(solid(floor) || floor === 8)) e.dir = -e.dir; else e.x = nx;
          if (P.x < e.x + .8 && P.x + PW > e.x && P.y < e.y + .7 && P.y + PH > e.y) { if (P.vy > 1 && P.y + PH < e.y + .45) { e.alive = false; P.vy = -11; bonus += 5; upd(); g.sfx("pop"); pt.add((e.x + .4) * cs, (e.y + .5) * cs, "#5fd35f", 14); } else die(); }
        }
      };
      g.loop((dt, tt) => {
        t = tt;
        if (mode === "play") { stepPlay(dt); if (winT > 0) { winT -= dt; if (winT <= 0) { winT = 0; leave(); } } }
        if (msgT > 0) msgT -= dt;
        sky(x, W, H, "#7fd4ff", "#e6f7ff"); cloud(x, ((t * 10) % 760) - 100, 50, 1); cloud(x, ((t * 6 + 330) % 760) - 100, 100, .8);
        x.fillStyle = "#b5e8a8"; x.beginPath(); x.moveTo(0, H); for (let i = 0; i <= 640; i += 40) x.lineTo(i, H * .72 + Math.sin(i * .02) * 25); x.lineTo(640, H); x.fill();
        const L = pl || lv;
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) { const v = L[r * COLS + q]; if (v) gtile(v, q * cs, r * cs, q, r); }
        if (mode === "edit") { x.strokeStyle = "rgba(0,0,0,.07)"; x.lineWidth = 1; for (let q = 1; q < COLS; q++) { x.beginPath(); x.moveTo(q * cs, 0); x.lineTo(q * cs, H); x.stroke(); } for (let r = 1; r < ROWS; r++) { x.beginPath(); x.moveTo(0, r * cs); x.lineTo(W, r * cs); x.stroke(); } x.strokeStyle = "#2f6fdd"; x.lineWidth = 2; x.setLineDash([4, 4]); x.strokeRect(sx * cs + cs * .15, sy * cs + cs * .1, cs * PW, cs * PH); x.setLineDash([]); txt(x, "START", sx * cs + cs / 2, sy * cs - 6, 12); }
        for (const e of ents) if (e.alive) slime(e.x * cs, e.y * cs - cs * .3, Math.sin(t * 8), e.dir);
        if (P && !(P.dead > 0 && Math.floor(P.dead * 20) % 2)) {
          const px = P.x * cs, py = P.y * cs, w = PW * cs, h = PH * cs, sqv = P.sq * .5; x.save(); x.translate(px + w / 2, py + h); x.scale(1 + sqv, 1 - sqv); x.fillStyle = "#4cc3ff"; x.beginPath(); x.roundRect(-w / 2, -h, w, h * .9, w * .35); x.fill(); x.fillStyle = "#2f8fd6"; x.fillRect(-w * .4, -h * .1, w * .3, h * .1); x.fillRect(w * .1, -h * .1, w * .3, h * .1);
          x.fillStyle = "#fff"; [.1, .5].forEach(o => { x.beginPath(); x.arc(-w / 2 + w * (o + (P.face > 0 ? .2 : 0)), -h * .65, w * .13, 0, 7); x.fill(); }); x.fillStyle = "#222"; [.1, .5].forEach(o => { x.beginPath(); x.arc(-w / 2 + w * (o + (P.face > 0 ? .25 : .05)), -h * .65, w * .06, 0, 7); x.fill(); }); x.restore();
        }
        pt.draw(x, dt);
        if (msgT > 0) txt(x, msg, W / 2, H / 2, 30);
        g.status(mode === "play" ? "Coins and bonus: " + bonus : "");
      });
    }
  });

  // ---- 10. Island Creator ----
  B.add({
    id: "s12-island", name: "Island Creator", ages: [5, 20], cat: "Build", color: "#2ec4b6", icon: "I",
    desc: "Paint sea, sand and grass, then fill your island with trees and animals.", controls: "Pick sea, sand or grass and drag to paint. Pick a tree or animal and tap the right place to add it.",
    start(g) {
      const cs = g.by(40, 20, 16), COLS = 640 / cs, ROWS = 400 / cs, { c, x, W, H, pos } = g.canvas(640, 400), pt = parts(), hs = hist(), u = cs / 20;
      const KIND = { palm: { ok: [1, 2], st: 1, h: "Palms grow on sand or grass" }, pine: { ok: [2, 3], st: 1, h: "Pines grow on grass or hills" }, flower: { ok: [2], st: 1, h: "Flowers need grass" }, house: { ok: [1, 2], st: 1, h: "Houses go on land" },
        fish: { ok: [0], sp: 28, h: "Fish need the sea" }, boat: { ok: [0], sp: 14, h: "Boats need the sea" }, crab: { ok: [1], sp: 14, h: "Crabs live on sand" }, sheep: { ok: [2], sp: 10, h: "Sheep like grass" }, bird: { ok: null, sp: 55 } };
      const FC = ["#ff6fb5", "#ffd23f", "#b48cff", "#ff5a5f", "#fff"];
      let ter = new Array(COLS * ROWS).fill(0), objs = [], tool = "sand", brush = g.by(0, 1, 1), down = false, dirty = true, chk = 0, t = 0;
      const tc = document.createElement("canvas"); tc.width = W; tc.height = H; const tx = tc.getContext("2d");
      const mk = (k, px, py, fl) => ({ k, x: px, y: py, tx: px, ty: py, vx: 1, vy: 0, wait: g.rf(0, 1), sp: (KIND[k].sp || 0) * g.rf(.8, 1.2), fl: fl === undefined ? g.ri(0, 4) : fl, ph: g.rf(0, 6) });
      const terAt = (px, py) => { const q = Math.floor(px / cs), r = Math.floor(py / cs); return q < 0 || r < 0 || q >= COLS || r >= ROWS ? -1 : ter[r * COLS + q]; };
      const valid = (k, px, py) => { const v = terAt(px, py); if (v < 0) return false; const ok = KIND[k].ok; return !ok || ok.includes(v); };
      const land = () => ter.filter(v => v).length;
      const upd = () => { g.score(objs.length + Math.floor(land() / 4)); g.save({ cs, ter, objs: objs.map(o => ({ k: o.k, x: o.x, y: o.y, fl: o.fl })) }); };
      const sv = g.load();
      if (sv && sv.cs === cs && sv.ter && sv.ter.length === ter.length) { ter = sv.ter; objs = (sv.objs || []).filter(o => KIND[o.k]).map(o => mk(o.k, o.x, o.y, o.fl)); }
      else {
        const cx = COLS / 2, cy = ROWS / 2;
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) { const d = Math.pow((q + .5 - cx) / (COLS * .28), 2) + Math.pow((r + .5 - cy) / (ROWS * .3), 2); ter[r * COLS + q] = d < .12 ? 3 : d < 1 ? 2 : d < 1.4 ? 1 : 0; }
        objs = [mk("palm", cx * cs - COLS * .3 * cs, cy * cs), mk("sheep", cx * cs - cs, cy * cs + cs), mk("flower", cx * cs + cs, cy * cs + cs), mk("fish", 40, 40), mk("bird", 300, 100)].filter(o => valid(o.k, o.x, o.y) || o.k === "bird");
      }
      g.score(objs.length + Math.floor(land() / 4));
      const brushPaint = p => {
        const q0 = Math.floor(p.x / cs), r0 = Math.floor(p.y / cs), v = { water: 0, sand: 1, grass: 2, hill: 3 }[tool]; let ch = false;
        for (let r = r0 - brush; r <= r0 + brush; r++) for (let q = q0 - brush; q <= q0 + brush; q++) if (q >= 0 && r >= 0 && q < COLS && r < ROWS && ter[r * COLS + q] !== v) { ter[r * COLS + q] = v; ch = true; }
        if (ch) { dirty = true; g.sfx(v ? "pop" : "splash"); pt.add(p.x, p.y, v ? ["", "#f3dc9c", "#7fd36b", "#9a9aa8"][v] : "#fff", 6, 70); upd(); }
      };
      const place = p => {
        if (tool === "erase") { let bi = -1, bd = 24 * u; objs.forEach((o, i) => { const d = Math.hypot(o.x - p.x, o.y - (o.k === "bird" ? 30 * u : 0) - p.y); if (d < bd) { bd = d; bi = i; } }); if (bi >= 0) { hs.push({ ter, objs: ser() }); const o = objs.splice(bi, 1)[0]; pt.add(o.x, o.y, "#fff", 10); g.sfx("drop"); upd(); } return; }
        if (objs.length >= 120) { g.sfx("wrong"); fpop(g, c, W, H, "That is a lot already!", p.x, p.y, "#fff"); return; }
        if (!valid(tool, p.x, p.y)) { g.sfx("wrong"); fpop(g, c, W, H, KIND[tool].h || "Not here", p.x, p.y, "#fff"); return; }
        hs.push({ ter, objs: ser() }); objs.push(mk(tool, p.x, p.y)); g.sfx(KIND[tool].st ? "grow" : "pop"); pt.add(p.x, p.y, "#fff", 10); upd();
      };
      const ser = () => objs.map(o => ({ k: o.k, x: o.x, y: o.y, fl: o.fl }));
      g.on(c, "pointerdown", e => { const p = pos(e); if (["water", "sand", "grass", "hill"].includes(tool)) { hs.push({ ter, objs: ser() }); down = true; brushPaint(p); } else place(p); });
      g.on(c, "pointermove", e => { if (down) brushPaint(pos(e)); });
      g.on(window, "pointerup", () => { down = false; });
      const surprise = () => {
        hs.push({ ter, objs: ser() }); ter = new Array(COLS * ROWS).fill(0); objs = [];
        for (let b = 0; b < g.ri(3, 5); b++) {
          const cx = g.rf(4, COLS - 4), cy = g.rf(3, ROWS - 3), rad = g.rf(2.5, Math.min(COLS, ROWS) * .22);
          for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) { const d = Math.hypot(q - cx, (r - cy) * 1.2) / rad, v = d < .3 && g.diff ? 3 : d < .85 ? 2 : d < 1.2 ? 1 : 0; if (v > ter[r * COLS + q]) ter[r * COLS + q] = v; }
        }
        const kinds = ["palm", "flower", "fish", "sheep", "bird"].concat(g.diff ? ["pine", "crab"] : [], g.diff > 1 ? ["house", "boat"] : []);
        for (let n = 0; n < 40; n++) { const k = g.pick(kinds), px = g.rf(10, W - 10), py = g.rf(10, H - 10); if (valid(k, px, py) && objs.length < 36) objs.push(mk(k, px, py)); }
        dirty = true; upd(); g.sfx("cheer");
      };
      const items = [["water", "Sea"], ["sand", "Sand"], ["grass", "Grass"]]; if (g.diff >= 1) items.push(["hill", "Hill"]);
      items.push(["palm", "Palm"], ["flower", "Flower"]); if (g.diff >= 1) items.push(["pine", "Pine"]); if (g.diff >= 2) items.push(["house", "House"]);
      items.push(["fish", "Fish"], ["sheep", "Sheep"], ["bird", "Bird"]); if (g.diff >= 1) items.push(["crab", "Crab"]); if (g.diff >= 2) items.push(["boat", "Boat"]); items.push(["erase", "Erase"]);
      const extra = g.diff >= 1 ? [{ t: "Small brush", id: "b0", fn: () => { brush = 0; hl(tools, "b" + brush); } }].concat(g.diff >= 2 ? [{ t: "Medium", id: "b1", fn: () => { brush = 1; hl(tools, "b" + brush); } }, { t: "Big", id: "b2", fn: () => { brush = 2; hl(tools, "b" + brush); } }] : [{ t: "Big brush", id: "b1", fn: () => { brush = 1; hl(tools, "b" + brush); } }]) : [];
      const tools = bar(g, items.map(a => ({ t: a[1], id: a[0], fn: () => { tool = a[0]; hl(tools, tool); } })).concat(extra).concat([
        { t: "Undo", fn: () => { const s = hs.pop(); if (s) { ter = s.ter; objs = s.objs.map(o => mk(o.k, o.x, o.y, o.fl)); dirty = true; upd(); g.sfx("back"); } } },
        { t: "Clear", fn: () => { hs.push({ ter, objs: ser() }); ter = new Array(COLS * ROWS).fill(0); objs = []; dirty = true; upd(); g.sfx("boom"); } },
        { t: "Surprise me", fn: surprise }, { t: "Save picture", fn: () => g.saveImage(c, "my-island") }, FIN(g)]));
      hl(tools, tool);
      const renderTer = () => {
        tx.clearRect(0, 0, W, H);
        const pass = (minV, ex, colr, rad) => { tx.fillStyle = colr; for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) if (ter[r * COLS + q] >= minV) { tx.beginPath(); tx.roundRect(q * cs - ex, r * cs - ex, cs + ex * 2, cs + ex * 2, rad); tx.fill(); } };
        pass(1, cs * .32, "rgba(170,240,245,.8)", cs * .6); pass(1, cs * .16, "#f3dc9c", cs * .5); pass(2, cs * .08, "#7fd36b", cs * .45); pass(3, cs * .02, "#9a9aa8", cs * .4);
        tx.fillStyle = "rgba(0,0,0,.07)"; for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) if (ter[r * COLS + q] === 2 && (q * 7 + r * 13) % 5 === 0) { tx.beginPath(); tx.arc((q + .5) * cs, (r + .6) * cs, cs * .15, 0, 7); tx.fill(); }
        tx.fillStyle = "rgba(255,255,255,.5)"; for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) if (ter[r * COLS + q] === 3) { tx.beginPath(); tx.moveTo((q + .2) * cs, (r + .6) * cs); tx.lineTo((q + .5) * cs, (r + .2) * cs); tx.lineTo((q + .8) * cs, (r + .6) * cs); tx.fill(); }
        dirty = false;
      };
      const draw = (o, tt) => {
        x.save(); x.translate(o.x, o.y); x.scale(u, u); const f = o.vx < 0 ? -1 : 1, sw = Math.sin(tt * 2 + o.ph);
        if (o.k === "palm") { x.strokeStyle = "#8b5a2b"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(4 + sw, -12, 2 + sw * 1.5, -22); x.stroke(); x.fillStyle = "#2e9d55"; for (let k = 0; k < 5; k++) { x.save(); x.translate(2 + sw * 1.5, -22); x.rotate(-Math.PI + k * Math.PI / 4 + sw * .05); x.beginPath(); x.ellipse(8, 0, 9, 3, 0, 0, 7); x.fill(); x.restore(); } x.fillStyle = "#6d4c41"; x.beginPath(); x.arc(2 + sw * 1.5, -21, 2, 0, 7); x.fill(); }
        else if (o.k === "pine") { x.fillStyle = "#6d4c41"; x.fillRect(-2, -4, 4, 6); [["#2e9d55", -8, 10], ["#3dbb68", -16, 8], ["#4fd27c", -23, 6]].forEach(a => { x.fillStyle = a[0]; x.beginPath(); x.moveTo(sw * .6, a[1] - 9); x.lineTo(a[2], a[1] + 4); x.lineTo(-a[2], a[1] + 4); x.fill(); }); }
        else if (o.k === "flower") { x.strokeStyle = "#2e9d55"; x.lineWidth = 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(sw, -9); x.stroke(); x.fillStyle = FC[o.fl]; for (let k = 0; k < 5; k++) { x.beginPath(); x.arc(sw + Math.cos(k * 1.257) * 3.5, -10 + Math.sin(k * 1.257) * 3.5, 2.6, 0, 7); x.fill(); } x.fillStyle = "#ff9f1c"; x.beginPath(); x.arc(sw, -10, 2.2, 0, 7); x.fill(); }
        else if (o.k === "house") { x.fillStyle = "rgba(0,0,0,.15)"; x.beginPath(); x.ellipse(0, 1, 13, 3, 0, 0, 7); x.fill(); x.fillStyle = "#ffcc80"; x.fillRect(-9, -13, 18, 13); x.fillStyle = "#c0392b"; x.beginPath(); x.moveTo(-12, -12); x.lineTo(0, -23); x.lineTo(12, -12); x.fill(); x.fillStyle = "#6d4c41"; x.fillRect(-2, -8, 4, 8); x.fillStyle = "#cfe9ff"; x.fillRect(4, -10, 3, 3); }
        else if (o.k === "fish") { x.scale(f, 1); const w = Math.sin(tt * 9 + o.ph) * 3; x.fillStyle = "#ff9f1c"; x.beginPath(); x.ellipse(0, 0, 8, 4.5, 0, 0, 7); x.fill(); x.beginPath(); x.moveTo(-7, 0); x.lineTo(-13, -4 + w); x.lineTo(-13, 4 + w); x.fill(); x.fillStyle = "#fff"; x.beginPath(); x.arc(4, -1, 1.6, 0, 7); x.fill(); x.fillStyle = "#222"; x.beginPath(); x.arc(4.4, -1, .8, 0, 7); x.fill(); }
        else if (o.k === "boat") { x.translate(0, Math.sin(tt * 2 + o.ph) * 1.5); x.scale(f, 1); x.fillStyle = "#8b5a2b"; x.beginPath(); x.moveTo(-12, -2); x.lineTo(12, -2); x.lineTo(8, 5); x.lineTo(-8, 5); x.fill(); x.strokeStyle = "#5d4037"; x.lineWidth = 2; x.beginPath(); x.moveTo(0, -2); x.lineTo(0, -20); x.stroke(); x.fillStyle = "#fff"; x.beginPath(); x.moveTo(1, -19); x.lineTo(10, -5); x.lineTo(1, -5); x.fill(); }
        else if (o.k === "crab") { const w = Math.sin(tt * 12 + o.ph) * 2; x.strokeStyle = "#c0392b"; x.lineWidth = 1.5; for (let k = -1; k <= 1; k += 2) for (let j = 0; j < 3; j++) { x.beginPath(); x.moveTo(k * 4, 0); x.lineTo(k * (8 + j), 2 + (j % 2 ? w : -w)); x.stroke(); } x.fillStyle = "#e74c3c"; x.beginPath(); x.ellipse(0, -1, 7, 5, 0, 0, 7); x.fill(); x.beginPath(); x.arc(-9, -5 + w, 3, 0, 7); x.arc(9, -5 - w, 3, 0, 7); x.fill(); x.fillStyle = "#fff"; x.beginPath(); x.arc(-2, -6, 1.5, 0, 7); x.arc(2, -6, 1.5, 0, 7); x.fill(); }
        else if (o.k === "sheep") { x.scale(f, 1); x.fillStyle = "#333"; x.fillRect(-5, 0, 2, 4); x.fillRect(3, 0, 2, 4); x.fillStyle = "#fff"; [[-5, -4, 5], [0, -6, 6], [5, -4, 5], [0, -2, 6]].forEach(a => { x.beginPath(); x.arc(a[0], a[1], a[2], 0, 7); x.fill(); }); x.fillStyle = "#333"; x.beginPath(); x.ellipse(9, -5 + Math.sin(tt * 3 + o.ph), 3.5, 3, 0, 0, 7); x.fill(); }
        else if (o.k === "bird") { x.translate(0, -30); x.fillStyle = "rgba(0,0,0,.15)"; x.beginPath(); x.ellipse(0, 30, 6, 2, 0, 0, 7); x.fill(); const w = Math.sin(tt * 14 + o.ph) * 7; x.strokeStyle = "#fff"; x.lineWidth = 3; x.lineCap = "round"; x.beginPath(); x.moveTo(-10, -w); x.quadraticCurveTo(-4, -w * .6 - 3, 0, 0); x.quadraticCurveTo(4, -w * .6 - 3, 10, -w); x.stroke(); x.fillStyle = "#ffd23f"; x.beginPath(); x.moveTo(0, 0); x.lineTo(f * 4, 1); x.lineTo(0, 2); x.fill(); }
        x.restore();
      };
      g.loop((dt, tt) => {
        t = tt; if (dirty) renderTer();
        for (const o of objs) {
          if (!KIND[o.k].st) {
            if (o.wait > 0) { o.wait -= dt; continue; }
            const dx = o.tx - o.x, dy = o.ty - o.y, d = Math.hypot(dx, dy);
            if (d < 2) { o.wait = g.rf(.2, 1.8); for (let k = 0; k < 6; k++) { const a = g.rf(0, 6.28), L = o.k === "bird" ? g.rf(80, 220) : g.rf(30, 100), nx = o.x + Math.cos(a) * L, ny = o.y + Math.sin(a) * L; if (valid(o.k, nx, ny)) { o.tx = nx; o.ty = ny; break; } } continue; }
            o.vx = dx / d * o.sp; o.vy = dy / d * o.sp; const nx = o.x + o.vx * dt, ny = o.y + o.vy * dt; if (valid(o.k, nx, ny)) { o.x = nx; o.y = ny; } else { o.tx = o.x; o.ty = o.y; }
          }
        }
        chk -= dt; if (chk <= 0) { chk = .7; const n = objs.length; objs = objs.filter(o => { if (valid(o.k, o.x, o.y)) return true; pt.add(o.x, o.y, "#fff", 8); return false; }); if (objs.length !== n) { g.sfx("splash"); upd(); } }
        sky(x, W, H, "#3ab8e8", "#1d8fd1");
        x.strokeStyle = "rgba(255,255,255,.14)"; x.lineWidth = 2; for (let k = 0; k < 14; k++) { x.beginPath(); for (let i = 0; i <= W; i += 10) { const yy = k * 30 + 10 + Math.sin(i * .03 + t * 1.5 + k) * 4; i ? x.lineTo(i, yy) : x.moveTo(i, yy); } x.stroke(); }
        x.drawImage(tc, 0, 0, W, H);
        const sorted = objs.slice().sort((a, b) => a.y - b.y); for (const o of sorted) if (o.k !== "bird") draw(o, t); for (const o of sorted) if (o.k === "bird") draw(o, t);
        x.fillStyle = "rgba(0,40,80,.08)"; x.beginPath(); x.ellipse(((t * 12) % 800) - 80, 120, 80, 30, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(((t * 8 + 400) % 800) - 80, 300, 100, 34, 0, 0, 7); x.fill();
        pt.draw(x, dt);
        if (!land() && !objs.length) txt(x, "Pick Sand and paint some land!", W / 2, H / 2, 22);
      });
    }
  });

  // ---- 11. Train Track Designer ----
  B.add({
    id: "s12-trains", name: "Train Track Designer", ages: [5, 20], cat: "Build", color: "#ff9f1c", icon: "T",
    desc: "Lay down train track and watch your little train chug around it.", controls: "Tap or drag to lay track. The train follows it, so try loops and junctions. Erase removes pieces.",
    start(g) {
      const cs = g.by(64, 40, 32), COLS = 640 / cs, ROWS = g.by(6, 10, 12), H = ROWS * cs, { c, x, W, pos } = g.canvas(640, H);
      const D = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      const pt = parts(), hs = hist(), WAG = g.by(2, 3, 4), LEN = .15 + WAG * .5 + .3;
      let TR = new Array(COLS * ROWS).fill(0), DC = new Array(COLS * ROWS).fill(""), tool = "track", down = false, trains = [], mul = 1, smoke = [], t = 0, retry = 0;
      const tr = (q, r) => q >= 0 && r >= 0 && q < COLS && r < ROWS && TR[r * COLS + q] === 1;
      const dirsAt = (q, r) => { const a = []; for (let d = 0; d < 4; d++) if (tr(q + D[d][0], r + D[d][1])) a.push(d); return a; };
      const upd = () => { g.score(TR.filter(v => v).length + DC.filter(v => v).length); g.save({ cs, TR, DC }); };
      const sv = g.load();
      if (sv && sv.cs === cs && sv.TR && sv.TR.length === TR.length) { TR = sv.TR; DC = sv.DC || DC; }
      else {
        const q0 = 1, q1 = COLS - 2, r0 = 1, r1 = ROWS - 2;
        for (let q = q0; q <= q1; q++) { TR[r0 * COLS + q] = 1; TR[r1 * COLS + q] = 1; } for (let r = r0; r <= r1; r++) { TR[r * COLS + q0] = 1; TR[r * COLS + q1] = 1; }
        DC[(r0 + 1) * COLS + q0 + 1] = "tree"; DC[(r0 + 1) * COLS + q0 + 2] = "tree"; DC[(r1 - 1) * COLS + q1 - 1] = "station"; if (ROWS > 6) DC[(r1 - 1) * COLS + q0 + 2] = "lake";
      }
      g.score(TR.filter(v => v).length + DC.filter(v => v).length);
      const mid = (q, r, d) => [(q + .5 + D[d][0] * .5) * cs, (r + .5 + D[d][1] * .5) * cs];
      const pp = (q, r, f, tt, uu) => {
        const E = mid(q, r, f), X = mid(q, r, tt);
        if ((f + 2) % 4 === tt || f === tt) { const dx = X[0] - E[0], dy = X[1] - E[1]; return { x: E[0] + dx * uu, y: E[1] + dy * uu, a: Math.atan2(dy, dx) }; }
        const Cc = [(q + .5) * cs, (r + .5) * cs], K = [E[0] + X[0] - Cc[0], E[1] + X[1] - Cc[1]], a0 = Math.atan2(E[1] - K[1], E[0] - K[0]), a1 = Math.atan2(X[1] - K[1], X[0] - K[0]);
        let df = a1 - a0; while (df > Math.PI) df -= 6.2832; while (df < -Math.PI) df += 6.2832; const a = a0 + df * uu;
        return { x: K[0] + Math.cos(a) * cs / 2, y: K[1] + Math.sin(a) * cs / 2, a: a + (df > 0 ? Math.PI / 2 : -Math.PI / 2) };
      };
      const locate = (T, off) => {
        let i = T.path.length - 1, uu = T.p - off; while (uu < 0 && i > 0) { i--; uu += 1; } const s = T.path[i];
        if (uu < 0) { const q0 = pp(s.q, s.r, s.f, s.t, 0); return { x: q0.x - Math.cos(q0.a) * -uu * cs, y: q0.y - Math.sin(q0.a) * -uu * cs, a: q0.a, i, u: 0 }; }
        return Object.assign(pp(s.q, s.r, s.f, s.t, Math.min(1, uu)), { i, u: uu });
      };
      const spawn = T => {
        const L = []; for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) if (tr(q, r)) { const n = dirsAt(q, r).length; if (n >= 2) L.push([q, r]); }
        if (!L.length) { T.path = null; return; } const [q, r] = g.pick(L), ds = dirsAt(q, r), d = g.pick(ds), others = ds.filter(k => k !== d);
        T.path = [{ q, r, f: others.includes((d + 2) % 4) ? (d + 2) % 4 : others[0], t: d }]; T.p = 0; T.wait = 0;
      };
      const mkTrain = () => { const T = { path: null, p: 0, sp: g.by(1.1, 1.5, 1.9), wait: 0, cars: [g.pick(["#e53935", "#1e88e5"])], puff: 0 }; for (let k = 0; k < WAG; k++) T.cars.push(g.pick(["#ffd23f", "#6be28f", "#4cc3ff", "#b48cff", "#ff9f1c"])); spawn(T); return T; };
      for (let k = 0; k < g.by(1, 1, 2); k++) trains.push(mkTrain());
      const reverse = T => {
        const tail = locate(T, LEN), last = T.path.length - 1;
        T.path = T.path.slice(tail.i, last + 1).reverse().map(s => ({ q: s.q, r: s.r, f: s.t, t: s.f })); T.p = 1 - tail.u; T.cars.reverse(); T.wait = 0; g.sfx("tick");
      };
      const advance = (T, dt) => {
        const head = T.path[T.path.length - 1];
        if (!tr(head.q, head.r)) { spawn(T); return; }
        if (T.wait > 0) { T.wait -= dt; if (T.wait <= 0) reverse(T); return; }
        T.p += T.sp * mul * dt;
        if (head.dead && T.p >= .5) { T.p = .5; T.wait = .8; g.sfx("beep"); return; }
        while (T.p >= 1) {
          T.p -= 1; const s = T.path[T.path.length - 1], nq = s.q + D[s.t][0], nr = s.r + D[s.t][1];
          if (!tr(nq, nr)) { spawn(T); return; }
          const f = (s.t + 2) % 4, opts = dirsAt(nq, nr).filter(d => d !== f);
          if (!opts.length) { T.path.push({ q: nq, r: nr, f, t: (f + 2) % 4, dead: true }); continue; }
          const d = opts.includes((f + 2) % 4) && g.rand() < .75 ? (f + 2) % 4 : g.pick(opts); T.path.push({ q: nq, r: nr, f, t: d }); if (T.path.length > 40) T.path.shift();
        }
      };
      const paint = p => {
        const q = Math.floor(p.x / cs), r = Math.floor(p.y / cs); if (q < 0 || r < 0 || q >= COLS || r >= ROWS) return; const i = r * COLS + q;
        if (tool === "track") { if (TR[i]) return; TR[i] = 1; DC[i] = ""; g.sfx("thump"); }
        else if (tool === "erase") { if (!TR[i] && !DC[i]) return; TR[i] = 0; DC[i] = ""; g.sfx("drop"); }
        else { if (DC[i] === tool && !TR[i]) return; TR[i] = 0; DC[i] = tool; g.sfx("pop"); }
        pt.add((q + .5) * cs, (r + .5) * cs, "#fff", 6); upd();
      };
      g.on(c, "pointerdown", e => { down = true; hs.push({ TR, DC }); paint(pos(e)); });
      g.on(c, "pointermove", e => { if (down) paint(pos(e)); });
      g.on(window, "pointerup", () => { down = false; });
      const items = [["track", "Track"], ["tree", "Tree"], ["station", "Station"]]; if (g.diff >= 1) items.push(["lake", "Lake"]); items.push(["erase", "Erase"]);
      const tools = bar(g, items.map(a => ({ t: a[1], id: a[0], fn: () => { tool = a[0]; hl(tools, tool); } })).concat([
        { t: "Toot toot!", col: "#ffd23f", fn: () => { g.sfx("note", 523); g.timeout(() => g.sfx("note", 659), 170); trains.forEach(T => { if (T.path) { const l = locate(T, .15); pt.add(l.x, l.y - 10, "#fff", 10, 60); } }); } },
        { t: "Slow", fn: () => { mul = .5; } }, { t: "Normal", fn: () => { mul = 1; } }, { t: "Fast", fn: () => { mul = 1.8; } },
        { t: "Undo", fn: () => { const s = hs.pop(); if (s) { TR = s.TR; DC = s.DC; upd(); g.sfx("back"); } } }, { t: "Clear", fn: () => { hs.push({ TR, DC }); TR = new Array(COLS * ROWS).fill(0); DC = new Array(COLS * ROWS).fill(""); upd(); g.sfx("boom"); } },
        { t: "Save picture", fn: () => g.saveImage(c, "my-railway") }, FIN(g)]));
      hl(tools, tool);
      const rail = (q, r, f, tt) => {
        x.strokeStyle = "#7a5230"; x.lineWidth = 3; for (let k = 0; k < 8; k++) { const a = pp(q, r, f, tt, (k + .5) / 8), nx = -Math.sin(a.a) * cs * .17, ny = Math.cos(a.a) * cs * .17; x.beginPath(); x.moveTo(a.x - nx, a.y - ny); x.lineTo(a.x + nx, a.y + ny); x.stroke(); }
        x.strokeStyle = "#9aa4ae"; x.lineWidth = 2; for (const sd of [-1, 1]) { x.beginPath(); for (let k = 0; k <= 8; k++) { const a = pp(q, r, f, tt, k / 8), nx = -Math.sin(a.a) * cs * .09 * sd, ny = Math.cos(a.a) * cs * .09 * sd; k ? x.lineTo(a.x + nx, a.y + ny) : x.moveTo(a.x + nx, a.y + ny); } x.stroke(); }
      };
      g.loop((dt, tt) => {
        t = tt; retry -= dt;
        for (const T of trains) {
          if (!T.path) { if (retry <= 0) { spawn(T); retry = .5; } continue; }
          advance(T, dt); if (!T.path) continue;
          T.puff -= dt; if (T.puff <= 0 && T.wait <= 0) { T.puff = .15; const l = locate(T, .15); smoke.push({ x: l.x, y: l.y - cs * .3, l: 1 }); }
        }
        for (let i = smoke.length - 1; i >= 0; i--) { const s = smoke[i]; s.l -= dt * .8; s.y -= 18 * dt; s.x += 6 * dt; if (s.l <= 0) smoke.splice(i, 1); }
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) { x.fillStyle = (q + r) % 2 ? "#7bd66b" : "#86df76"; x.fillRect(q * cs, r * cs, cs + 1, cs + 1); }
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) {
          const i = r * COLS + q, s = cs, px = q * s, py = r * s, dc = DC[i];
          if (dc === "tree") { const sw = Math.sin(t * 2 + i) * s * .02; x.fillStyle = "#6d4c41"; x.fillRect(px + s * .46, py + s * .6, s * .08, s * .25); x.fillStyle = "#2e9d55"; x.beginPath(); x.moveTo(px + s * .5 + sw, py + s * .1); x.lineTo(px + s * .75, py + s * .65); x.lineTo(px + s * .25, py + s * .65); x.fill(); x.fillStyle = "#3dbb68"; x.beginPath(); x.moveTo(px + s * .5 + sw, py + s * .02); x.lineTo(px + s * .68, py + s * .4); x.lineTo(px + s * .32, py + s * .4); x.fill(); }
          else if (dc === "station") { x.fillStyle = "#ffcc80"; x.fillRect(px + s * .12, py + s * .4, s * .76, s * .46); x.fillStyle = "#c0392b"; x.beginPath(); x.moveTo(px + s * .05, py + s * .42); x.lineTo(px + s * .5, py + s * .12); x.lineTo(px + s * .95, py + s * .42); x.fill(); x.fillStyle = "#6d4c41"; x.fillRect(px + s * .44, py + s * .6, s * .12, s * .26); x.fillStyle = "#fff"; x.beginPath(); x.arc(px + s * .5, py + s * .3, s * .07, 0, 7); x.fill(); }
          else if (dc === "lake") { x.fillStyle = "#4cc3ff"; x.beginPath(); x.ellipse(px + s / 2, py + s / 2, s * .46, s * .36, 0, 0, 7); x.fill(); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 2; x.beginPath(); x.ellipse(px + s / 2, py + s / 2, s * (.1 + (t * .15 + i * .1) % .3), s * (.07 + (t * .1 + i * .1) % .2), 0, 0, 7); x.stroke(); }
          if (TR[i]) {
            const ds = dirsAt(q, r);
            if (ds.length === 0) rail(q, r, 1, 3); else if (ds.length === 1) rail(q, r, ds[0], (ds[0] + 2) % 4); else for (let a = 0; a < ds.length; a++) for (let b = a + 1; b < ds.length; b++) rail(q, r, ds[a], ds[b]);
          }
        }
        for (const T of trains) if (T.path) {
          for (let k = T.cars.length - 1; k >= 0; k--) {
            const l = locate(T, .15 + k * .5); x.save(); x.translate(l.x, l.y); x.rotate(l.a); const w = cs * (k ? .4 : .46), h = cs * .22;
            x.fillStyle = "rgba(0,0,0,.18)"; x.fillRect(-w / 2 + 2, -h / 2 + 3, w, h); x.fillStyle = T.cars[k]; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 3); x.fill(); x.strokeStyle = "rgba(0,0,0,.35)"; x.lineWidth = 1.5; x.stroke();
            x.fillStyle = "rgba(255,255,255,.55)"; if (k === 0 || k === T.cars.length - 1 && k > 0 && false) { x.fillRect(w * .1, -h * .3, w * .18, h * .6); x.fillStyle = "#333"; x.fillRect(-w * .1, -h * .62, w * .16, h * .22); } else x.fillRect(-w * .3, -h * .25, w * .6, h * .5);
            x.restore();
          }
        }
        for (const s of smoke) { x.fillStyle = "rgba(255,255,255," + s.l * .6 + ")"; x.beginPath(); x.arc(s.x, s.y, cs * (.06 + (1 - s.l) * .14), 0, 7); x.fill(); }
        pt.draw(x, dt);
        if (!TR.some(v => v)) txt(x, "Tap the grass to lay track!", W / 2, H / 2, 22);
        else if (trains.every(T => !T.path)) txt(x, "Join some track pieces so the train can start", W / 2, H - 20, 16);
      });
    }
  });

  // ---- 12. Farm and Garden ----
  B.add({
    id: "s12-farm", name: "Farm and Garden", ages: [5, 20], cat: "Build", color: "#6be28f", icon: "F",
    desc: "Plant seeds, water them, watch them grow and pick the harvest.", controls: "Pick a seed and tap a square to plant it. Water it, wait, then use Harvest on ripe plants.",
    start(g) {
      const cs = g.by(80, 50, 40), COLS = Math.floor(640 / cs), ROWS = Math.floor(400 / cs), OX = (640 - COLS * cs) / 2, OY = (400 - ROWS * cs) / 2, W = 640, H = 400;
      const { c, x, pos } = g.canvas(W, H), pt = parts(), hs = hist(), N = COLS * ROWS;
      const CROP = { carrot: [14, 2], flower: [12, 1], tomato: [20, 3], sunflower: [22, 3], pumpkin: [28, 5], tree: [45, 8] }, FC = ["#ff6fb5", "#ffd23f", "#b48cff", "#ff5a5f", "#4cc3ff"];
      const SPD = g.by(2, 1, 1);
      let P = new Array(N).fill(""), GR = new Array(N).fill(0), WT = new Array(N).fill(0), DC = new Array(N).fill(""), hens = [], tool = "carrot", down = false, rain = 0, coins = 0, planted = 0, sacc = 0, t = 0, last = -1;
      const sc = () => g.score(planted + coins);
      const sv = g.load();
      if (sv && sv.cs === cs && sv.P && sv.P.length === N) { P = sv.P; GR = sv.GR; DC = sv.DC; coins = sv.coins || 0; planted = sv.planted || 0; hens = (sv.hens || []).map(h => ({ x: h.x, y: h.y, tx: h.x, ty: h.y, w: 0, f: 1 })); }
      else { P[1 * COLS + 1] = "carrot"; GR[1 * COLS + 1] = .5; P[1 * COLS + 2] = "flower"; GR[1 * COLS + 2] = 1; P[2 * COLS + 1] = "sunflower"; GR[2 * COLS + 1] = .3; }
      sc();
      const save = () => g.save({ cs, P, GR, DC, coins, planted, hens: hens.map(h => ({ x: h.x, y: h.y })) });
      const snap = () => ({ P, GR, DC, coins, planted });
      const restore = s => { P = s.P; GR = s.GR; DC = s.DC; coins = s.coins; planted = s.planted; sc(); save(); };
      const cellOf = p => { const q = Math.floor((p.x - OX) / cs), r = Math.floor((p.y - OY) / cs); return q >= 0 && r >= 0 && q < COLS && r < ROWS ? r * COLS + q : -1; };
      const cx = i => OX + (i % COLS + .5) * cs, cy = i => OY + (Math.floor(i / COLS) + .5) * cs;
      const act = p => {
        if (tool === "chicken") { if (last === -2) return; last = -2; if (hens.length >= 6) { g.sfx("wrong"); return; } hens.push({ x: p.x, y: p.y, tx: p.x, ty: p.y, w: 0, f: 1 }); g.sfx("pop"); pt.add(p.x, p.y, "#fff", 8); save(); return; }
        const i = cellOf(p); if (i < 0 || i === last) return; last = i;
        if (tool === "water") { const R2 = g.by(1, 0, 0); for (let dq = -R2; dq <= R2; dq++) for (let dr = -R2; dr <= R2; dr++) { const q = i % COLS + dq, r = Math.floor(i / COLS) + dr; if (q >= 0 && r >= 0 && q < COLS && r < ROWS) { WT[r * COLS + q] = 1; for (let k = 0; k < 3; k++) pt.add(cx(r * COLS + q), cy(r * COLS + q) - 10, "#4cc3ff", 1, 60); } } g.sfx("splash"); return; }
        if (tool === "harvest") {
          if (!P[i]) return; if (GR[i] < 1) { g.sfx("wrong"); fpop(g, c, W, H, "Not ready yet", cx(i), cy(i) - 10, "#fff"); return; }
          const v = CROP[P[i]][1]; hs.push(snap()); coins += v; g.sfx("cheer"); pt.add(cx(i), cy(i), "#ffd23f", 14); fpop(g, c, W, H, "+" + v, cx(i), cy(i) - 10, "#ffd23f");
          if (P[i] === "tree") GR[i] = .55; else { P[i] = ""; GR[i] = 0; } sc(); save(); return;
        }
        if (tool === "shovel") { if (!P[i] && !DC[i]) return; hs.push(snap()); P[i] = ""; GR[i] = 0; DC[i] = ""; g.sfx("drop"); pt.add(cx(i), cy(i), "#8b5a2b", 10); save(); return; }
        if (CROP[tool]) { if (P[i] || DC[i]) { g.sfx("wrong"); return; } hs.push(snap()); P[i] = tool; GR[i] = 0; planted++; sc(); g.sfx("grow"); pt.add(cx(i), cy(i), "#6b4a2a", 8); save(); return; }
        if (P[i] || DC[i] === tool) return; hs.push(snap()); DC[i] = tool; g.sfx(tool === "pond" ? "splash" : "thump"); pt.add(cx(i), cy(i), "#fff", 6); save();
      };
      g.on(c, "pointerdown", e => { down = true; last = -1; act(pos(e)); });
      g.on(c, "pointermove", e => { if (down && !["chicken", "harvest"].includes(tool)) act(pos(e)); });
      g.on(window, "pointerup", () => { down = false; last = -1; });
      const surprise = () => {
        hs.push(snap()); const kinds = Object.keys(CROP).filter(k => g.diff >= 2 || k !== "tree" && (g.diff >= 1 || ["carrot", "flower", "sunflower"].includes(k))); P = new Array(N).fill(""); GR = new Array(N).fill(0); DC = new Array(N).fill("");
        for (let i = 0; i < N; i++) { const w = g.rand(); if (w < .5) { P[i] = g.pick(kinds); GR[i] = g.rand(); planted++; } else if (w < .56 && g.diff) DC[i] = "scarecrow"; else if (w < .64 && g.diff) DC[i] = "fence"; else if (w < .68 && g.diff > 1) DC[i] = "pond"; }
        sc(); save(); g.sfx("cheer");
      };
      const items = [["carrot", "Carrot"], ["flower", "Flower"], ["sunflower", "Sunflower"]]; if (g.diff >= 1) items.push(["tomato", "Tomato"], ["pumpkin", "Pumpkin"]); if (g.diff >= 2) items.push(["tree", "Apple tree"]);
      items.push(["water", "Watering can"], ["harvest", "Harvest"], ["shovel", "Shovel"]); if (g.diff >= 1) items.push(["fence", "Fence"], ["scarecrow", "Scarecrow"], ["chicken", "Chicken"]); if (g.diff >= 2) items.push(["pond", "Pond"]);
      const tools = bar(g, items.map(a => ({ t: a[1], id: a[0], fn: () => { tool = a[0]; hl(tools, tool); } })).concat([
        { t: "Make it rain", col: "#bfe3ff", fn: () => { rain = 5; g.sfx("fizz"); } },
        { t: "Undo", fn: () => { const s = hs.pop(); if (s) { restore(s); g.sfx("back"); } } }, { t: "Clear", fn: () => { hs.push(snap()); P = new Array(N).fill(""); GR = new Array(N).fill(0); DC = new Array(N).fill(""); hens = []; save(); g.sfx("boom"); } },
        { t: "Surprise me", fn: surprise }, { t: "Save picture", fn: () => g.saveImage(c, "my-farm") }, FIN(g)]));
      hl(tools, tool);
      const star = (sx, sy, r, a) => { x.fillStyle = "rgba(255,240,120," + a + ")"; x.beginPath(); for (let k = 0; k < 8; k++) { const rr = k % 2 ? r * .35 : r, an = k * Math.PI / 4; x.lineTo(sx + Math.cos(an) * rr, sy + Math.sin(an) * rr); } x.closePath(); x.fill(); };
      const crop = (k, i, gr, px, py) => {
        const s = cs, sw = Math.sin(t * 2 + i) * s * .03, ripe = gr >= 1; x.save(); x.translate(px, py + s * .35);
        if (k === "carrot") { const h = s * (.12 + gr * .3); x.fillStyle = "#3dbb68"; for (let a = -1; a <= 1; a++) { x.beginPath(); x.moveTo(a * s * .04, 0); x.lineTo(a * s * .16 + sw, -h); x.lineTo(a * s * .04 + s * .05, 0); x.fill(); } if (gr > .5) { x.fillStyle = "#ff8a2a"; x.beginPath(); x.moveTo(-s * .09 * gr, 0); x.lineTo(s * .09 * gr, 0); x.lineTo(0, s * .12 * gr); x.fill(); } }
        else if (k === "flower") { const h = s * (.1 + gr * .3); x.strokeStyle = "#2e9d55"; x.lineWidth = 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(sw, -h); x.stroke(); const fc = FC[i % 5], r = s * (.04 + gr * .08); x.fillStyle = gr > .5 ? fc : "#6bd36b"; for (let a = 0; a < 5; a++) { x.beginPath(); x.arc(sw + Math.cos(a * 1.257) * r, -h + Math.sin(a * 1.257) * r, r * .8, 0, 7); x.fill(); } x.fillStyle = "#ff9f1c"; x.beginPath(); x.arc(sw, -h, r * .6, 0, 7); x.fill(); }
        else if (k === "tomato") { const r = s * (.1 + gr * .16); x.fillStyle = "#2e9d55"; x.beginPath(); x.arc(sw, -r * .5, r, 0, 7); x.fill(); if (gr > .6) { x.fillStyle = gr >= 1 ? "#e53935" : "#9ccc65"; [[-.5, -.4], [.4, -.7], [.1, .1]].forEach(a => { x.beginPath(); x.arc(a[0] * r, a[1] * r, r * .28, 0, 7); x.fill(); }); } }
        else if (k === "sunflower") { const h = s * (.15 + gr * .5); x.strokeStyle = "#2e9d55"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(sw, -h); x.stroke(); x.fillStyle = "#3dbb68"; x.beginPath(); x.ellipse(-s * .08, -h * .4, s * .07, s * .03, -.5, 0, 7); x.fill(); const r = s * (.05 + gr * .13); x.fillStyle = gr > .45 ? "#ffd23f" : "#6bd36b"; for (let a = 0; a < 10; a++) { x.beginPath(); x.arc(sw + Math.cos(a * .628) * r, -h + Math.sin(a * .628) * r, r * .5, 0, 7); x.fill(); } x.fillStyle = "#6d4c41"; x.beginPath(); x.arc(sw, -h, r * .6, 0, 7); x.fill(); }
        else if (k === "pumpkin") { x.strokeStyle = "#2e9d55"; x.lineWidth = 2; x.beginPath(); x.moveTo(-s * .25 * gr, 0); x.quadraticCurveTo(-s * .1, -s * .1, 0, -s * .04); x.stroke(); const r = s * (.06 + gr * .17); x.fillStyle = gr > .5 ? "#ff8a2a" : "#6bd36b"; x.beginPath(); x.ellipse(0, -r * .6, r * 1.15, r * .85, 0, 0, 7); x.fill(); x.strokeStyle = "rgba(0,0,0,.2)"; x.lineWidth = 1.5; x.beginPath(); x.ellipse(0, -r * .6, r * .5, r * .85, 0, 0, 7); x.stroke(); x.fillStyle = "#2e9d55"; x.fillRect(-1.5, -r * 1.5, 3, r * .5); }
        else if (k === "tree") { const h = s * (.15 + gr * .42), r = s * (.1 + gr * .22); x.fillStyle = "#6d4c41"; x.fillRect(-s * .04, -h, s * .08, h); x.fillStyle = "#2e9d55"; x.beginPath(); x.arc(sw, -h - r * .5, r, 0, 7); x.fill(); x.fillStyle = "#3dbb68"; x.beginPath(); x.arc(sw - r * .4, -h - r * .8, r * .6, 0, 7); x.fill(); if (gr >= 1) { x.fillStyle = "#e53935"; [[-.5, -.3], [.4, -.1], [0, -.9]].forEach(a => { x.beginPath(); x.arc(sw + a[0] * r, -h - r * .5 + a[1] * r, s * .035, 0, 7); x.fill(); }); } }
        x.restore(); if (ripe) star(px + Math.sin(t * 3 + i) * 2, py - s * .3 + Math.sin(t * 4 + i) * 3, s * .08, .6 + .4 * Math.sin(t * 6 + i));
      };
      g.loop((dt, tt) => {
        t = tt; sacc += dt; if (rain > 0) rain -= dt;
        for (let i = 0; i < N; i++) {
          if (rain > 0 && (P[i] || true)) WT[i] = 1;
          if (WT[i] > 0) WT[i] = Math.max(0, WT[i] - dt / g.by(40, 25, 18));
          if (P[i] && GR[i] < 1) { const rate = g.diff === 0 ? 1.6 : g.diff === 1 ? (WT[i] > 0 ? 2 : 1) : (WT[i] > 0 ? 1 : .12); GR[i] = Math.min(1, GR[i] + dt * rate * SPD / CROP[P[i]][0] * (g.diff === 0 ? 1 : 1)); if (GR[i] >= 1) { g.sfx("note", 880); pt.add(cx(i), cy(i), "#ffd23f", 8); } }
        }
        if (sacc > 3) { sacc = 0; save(); }
        for (const h of hens) {
          if (h.w > 0) { h.w -= dt; continue; } const dx = h.tx - h.x, dy = h.ty - h.y, d = Math.hypot(dx, dy);
          if (d < 2) { h.w = g.rf(.3, 2); h.tx = g.clamp(h.x + g.rf(-80, 80), 10, W - 10); h.ty = g.clamp(h.y + g.rf(-60, 60), 10, H - 10); if (g.rand() < .1) g.sfx("pop"); continue; } h.f = dx > 0 ? 1 : -1; h.x += dx / d * 30 * dt; h.y += dy / d * 30 * dt;
        }
        const day = Math.sin(t / 30), dark = Math.max(0, -day) * .3;
        sky(x, W, H, "#9be37a", "#6ccf63");
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) {
          const i = r * COLS + q, px = OX + q * cs, py = OY + r * cs, wet = WT[i] > 0;
          x.fillStyle = wet ? "#5b3a1e" : "#8b5a2b"; x.beginPath(); x.roundRect(px + 2, py + 2, cs - 4, cs - 4, cs * .12); x.fill();
          x.strokeStyle = wet ? "#46301a" : "#74481f"; x.lineWidth = 2; for (let k = 1; k < 4; k++) { x.beginPath(); x.moveTo(px + 6, py + cs * k / 4); x.lineTo(px + cs - 6, py + cs * k / 4); x.stroke(); }
          if (wet) { x.fillStyle = "rgba(120,200,255," + (.15 + .1 * Math.sin(t * 3 + i)) + ")"; x.fillRect(px + 4, py + 4, cs - 8, cs - 8); }
        }
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) {
          const i = r * COLS + q, px = OX + (q + .5) * cs, py = OY + (r + .5) * cs, d = DC[i];
          if (d === "fence") { const l = q > 0 && DC[i - 1] === "fence", rr = q < COLS - 1 && DC[i + 1] === "fence"; x.fillStyle = "#d9a066"; x.fillRect(px - cs * (l ? .5 : .06), py - cs * .12, cs * ((l ? .5 : .06) + (rr ? .5 : .06)), cs * .06); x.fillRect(px - cs * (l ? .5 : .06), py + cs * .02, cs * ((l ? .5 : .06) + (rr ? .5 : .06)), cs * .06); x.fillStyle = "#b9824a"; x.fillRect(px - cs * .06, py - cs * .25, cs * .12, cs * .5); }
          else if (d === "scarecrow") { const sw = Math.sin(t * 2 + i) * .06; x.save(); x.translate(px, py + cs * .35); x.rotate(sw); x.strokeStyle = "#8b5a2b"; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -cs * .6); x.moveTo(-cs * .3, -cs * .38); x.lineTo(cs * .3, -cs * .38); x.stroke(); x.fillStyle = "#ffcc80"; x.beginPath(); x.arc(0, -cs * .62, cs * .1, 0, 7); x.fill(); x.fillStyle = "#6d4c41"; x.fillRect(-cs * .14, -cs * .74, cs * .28, cs * .05); x.fillRect(-cs * .08, -cs * .86, cs * .16, cs * .13); x.fillStyle = "#e53935"; x.fillRect(-cs * .1, -cs * .5, cs * .2, cs * .2); x.restore(); }
          else if (d === "pond") { x.fillStyle = "#4cc3ff"; x.beginPath(); x.ellipse(px, py, cs * .42, cs * .32, 0, 0, 7); x.fill(); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 2; x.beginPath(); x.ellipse(px, py, cs * (.1 + (t * .15 + i * .1) % .3), cs * (.07 + (t * .1 + i * .1) % .2), 0, 0, 7); x.stroke(); }
          if (P[i]) crop(P[i], i, GR[i], px, py);
        }
        for (const h of hens) { x.save(); x.translate(h.x, h.y); x.scale(h.f, 1); const bob = Math.abs(Math.sin(t * 8 + h.x)) * (h.w > 0 ? 0 : 2); x.fillStyle = "#fff"; x.beginPath(); x.ellipse(0, -7 - bob, 8, 6, 0, 0, 7); x.fill(); x.beginPath(); x.arc(7, -13 - bob, 4, 0, 7); x.fill(); x.fillStyle = "#ff9f1c"; x.beginPath(); x.moveTo(10, -13 - bob); x.lineTo(14, -12 - bob); x.lineTo(10, -11 - bob); x.fill(); x.fillStyle = "#e53935"; x.fillRect(6, -18 - bob, 3, 3); x.fillStyle = "#222"; x.fillRect(8, -14 - bob, 1.5, 1.5); x.strokeStyle = "#ff9f1c"; x.lineWidth = 1.5; x.beginPath(); x.moveTo(-1, -2); x.lineTo(-1, 2); x.moveTo(2, -2); x.lineTo(2, 2); x.stroke(); x.restore(); }
        if (rain > 0) { x.strokeStyle = "rgba(170,210,255,.7)"; x.lineWidth = 2; for (let k = 0; k < 60; k++) { const rx = (k * 53 + t * 40) % W, ry = (k * 97 + t * 420) % H; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 3, ry + 12); x.stroke(); } x.fillStyle = "rgba(60,80,120,.15)"; x.fillRect(0, 0, W, H); }
        if (dark > .01) { x.fillStyle = "rgba(10,20,70," + dark + ")"; x.fillRect(0, 0, W, H); }
        x.fillStyle = day > 0 ? "#ffe36b" : "#f4f1de"; x.beginPath(); x.arc(W - 40, 30 + Math.abs(Math.cos(t / 30)) * 6, 15, 0, 7); x.fill();
        pt.draw(x, dt); g.status("Coins: " + coins);
      });
    }
  });
})();
