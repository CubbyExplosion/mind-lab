// Break Time Games: set 6 (Strategy and board games against the computer)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---------- shared helpers ----------
  const text = (x, s, px, py, col, size, al) => { x.font = "bold " + (size || 20) + "px system-ui, sans-serif"; x.fillStyle = col || "#fff"; x.textAlign = al || "center"; x.textBaseline = "middle"; x.fillText(s, px, py); };
  const bg = (x, W, H, a, b) => { const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, a); gr.addColorStop(1, b); x.fillStyle = gr; x.fillRect(0, 0, W, H); };
  const disc = (x, px, py, r, c1, c2) => { const gr = x.createRadialGradient(px - r * .35, py - r * .35, r * .1, px, py, r); gr.addColorStop(0, c1); gr.addColorStop(1, c2); x.fillStyle = gr; x.beginPath(); x.arc(px, py, r, 0, 7); x.fill(); };
  const fxMake = () => {
    const ps = [];
    return {
      burst(px, py, col, n, sp) { n = n || 14; sp = sp || 140; for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, s = sp * (.3 + Math.random()); ps.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: .5 + Math.random() * .4, col }); } },
      draw(x, dt) { for (let i = ps.length - 1; i >= 0; i--) { const p = ps[i]; p.life -= dt; if (p.life <= 0) { ps.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 220 * dt; x.globalAlpha = Math.min(1, p.life * 2); x.fillStyle = p.col; x.fillRect(p.x - 2.5, p.y - 2.5, 5, 5); } x.globalAlpha = 1; }
    };
  };
  const D4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const pickOf = a => a[Math.floor(Math.random() * a.length)];

  // =====================================================================
  // 1. Tic-Tac-Toe
  // =====================================================================
  const LINES3 = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const win3 = b => { for (const l of LINES3) if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return l; return null; };
  function mm3(b, p, me, d) {
    const w = win3(b); if (w) return b[w[0]] === me ? 10 - d : d - 10;
    if (b.every(v => v)) return 0;
    let best = p === me ? -99 : 99;
    for (let i = 0; i < 9; i++) if (!b[i]) { b[i] = p; const s = mm3(b, 3 - p, me, d + 1); b[i] = 0; best = p === me ? Math.max(best, s) : Math.min(best, s); }
    return best;
  }
  B.add({
    id: "s6-tictactoe", name: "Tic-Tac-Toe", ages: [5, 20], cat: "Strategy", color: "#ff6fb5", icon: "X",
    desc: "Three in a row beats the computer. Hard never loses!", controls: "Tap a square. Play 5 rounds. The button below switches to 2 players on one screen.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(480, 540), fx = fxMake();
      const btn = g.html('<button type="button" class="bg-btn">Two players: off</button>').firstChild;
      const S = 160, TOP = 60;
      let b, turn, round = 0, wins = 0, two = false, over = false, wl = null, hover = -1, gen = 0, T = 0, born = [], banner = "";
      const later = (fn, ms) => { const k = gen; g.timeout(() => { if (k === gen) fn(); }, ms); };
      const status = () => g.status(two ? "Two players" : "Round " + Math.min(round + 1, 5) + " of 5 - Wins " + wins);
      const ctr = i => [(i % 3 + .5) * S, TOP + (Math.floor(i / 3) + .5) * S];
      function aiPick() {
        const emp = []; for (let i = 0; i < 9; i++) if (!b[i]) emp.push(i);
        if (emp.length === 9) return pickOf([0, 2, 4, 6, 8]);
        if (Math.random() < g.by(0, .6, 1)) {
          let bs = -99, bm = [];
          for (const i of emp) { b[i] = 2; const s = mm3(b, 1, 2, 1); b[i] = 0; if (s > bs) { bs = s; bm = [i]; } else if (s === bs) bm.push(i); }
          return pickOf(bm);
        }
        if (g.diff === 0 && Math.random() < .3) for (const i of emp) { b[i] = 2; const w = win3(b); b[i] = 0; if (w) return i; }
        return pickOf(emp);
      }
      function newRound() {
        gen++; b = Array(9).fill(0); wl = null; over = false; born = Array(9).fill(-9); banner = "";
        turn = two ? 1 : (round % 2 === 0 ? 1 : 2); status();
        if (turn === 2) later(() => { if (!over) place(aiPick()); }, 650);
      }
      function place(i) {
        b[i] = turn; born[i] = T; g.sfx(turn === 1 ? "click" : "pick");
        const w = win3(b);
        if (w) { wl = w; finish(turn); }
        else if (b.every(v => v)) finish(0);
        else { turn = 3 - turn; if (!two && turn === 2) later(() => { if (!over) place(aiPick()); }, 600); }
      }
      function finish(winner) {
        over = true;
        if (wl) wl.forEach(i => fx.burst(ctr(i)[0], ctr(i)[1], "#ffd34e", 14));
        if (two) {
          banner = winner ? (winner === 1 ? "X wins!" : "O wins!") : "A draw!"; g.sfx(winner ? "cheer" : "hint");
          later(() => { winner ? g.win(banner) : g.over(banner); }, 1300); return;
        }
        if (winner === 1) { wins++; g.add(g.by(3, 5, 8)); g.sfx("cheer"); banner = "You win this round!"; }
        else if (winner === 0) { g.add(g.by(1, 2, 3)); g.sfx("hint"); banner = "A draw!"; }
        else { g.sfx("wrong"); banner = "Computer wins this round"; }
        round++; status();
        later(() => {
          if (round >= 5) { const m = wins + (wins === 1 ? " win" : " wins") + " in 5 rounds"; wins >= 3 ? g.win("Champion! " + m) : g.over(m); }
          else newRound();
        }, 1500);
      }
      const cellAt = p => { if (p.y < TOP) return -1; const cx = Math.floor(p.x / S), cy = Math.floor((p.y - TOP) / S); return cx >= 0 && cx < 3 && cy >= 0 && cy < 3 ? cy * 3 + cx : -1; };
      g.on(c, "pointermove", e => { hover = cellAt(pos(e)); });
      g.on(c, "pointerleave", () => { hover = -1; });
      g.on(c, "pointerdown", e => { const i = cellAt(pos(e)); hover = i; if (over || i < 0 || b[i] || (!two && turn !== 1)) return; place(i); });
      g.on(btn, "click", () => { two = !two; btn.textContent = "Two players: " + (two ? "on" : "off"); round = 0; wins = 0; g.score(0); newRound(); });
      const mark = (p, i) => {
        const [cx, cy] = ctr(i), k = Math.min(1, (T - born[i]) * 5);
        x.save(); x.translate(cx, cy); x.scale(k, k); x.lineCap = "round"; x.lineWidth = 16;
        if (p === 1) { x.strokeStyle = "#ff6fb5"; x.beginPath(); x.moveTo(-42, -42); x.lineTo(42, 42); x.moveTo(42, -42); x.lineTo(-42, 42); x.stroke(); }
        else { x.strokeStyle = "#4cc3ff"; x.beginPath(); x.arc(0, 0, 46, 0, 7); x.stroke(); }
        x.restore();
      };
      newRound();
      g.loop((dt, t) => {
        T = t; bg(x, W, H, "#2a1f6b", "#5b3fb0");
        text(x, banner || (two ? (turn === 1 ? "X's turn" : "O's turn") : turn === 1 ? "Your turn (X)" : "Computer is thinking..."), W / 2, 30, "#fff", 24);
        x.strokeStyle = "rgba(255,255,255,.45)"; x.lineWidth = 8; x.lineCap = "round"; x.beginPath();
        for (let k = 1; k < 3; k++) { x.moveTo(k * S, TOP + 12); x.lineTo(k * S, TOP + 3 * S - 12); x.moveTo(12, TOP + k * S); x.lineTo(3 * S - 12, TOP + k * S); }
        x.stroke();
        if (hover >= 0 && !b[hover] && !over && (two || turn === 1)) { const [cx, cy] = ctr(hover); x.fillStyle = "rgba(255,255,255,.14)"; x.beginPath(); x.roundRect(cx - 66, cy - 66, 132, 132, 18); x.fill(); }
        for (let i = 0; i < 9; i++) if (b[i]) mark(b[i], i);
        if (wl) { const a = ctr(wl[0]), z = ctr(wl[2]); x.globalAlpha = .6 + .4 * Math.sin(t * 8); x.strokeStyle = "#ffd34e"; x.lineWidth = 12; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(z[0], z[1]); x.stroke(); x.globalAlpha = 1; }
        fx.draw(x, dt);
      });
    }
  });

  // =====================================================================
  // 2. Connect Four
  // =====================================================================
  const R4 = 6, C4 = 7, ORD4 = [3, 2, 4, 1, 5, 0, 6], DIR4 = [[0, 1], [1, 0], [1, 1], [1, -1]];
  const low4 = (b, c) => { for (let r = R4 - 1; r >= 0; r--) if (!b[r * C4 + c]) return r; return -1; };
  const line4 = (b, r, c, p) => {
    for (const [dr, dc] of DIR4) {
      const cells = [r * C4 + c];
      for (let s = -1; s <= 1; s += 2) { let rr = r + dr * s, cc = c + dc * s; while (rr >= 0 && rr < R4 && cc >= 0 && cc < C4 && b[rr * C4 + cc] === p) { cells.push(rr * C4 + cc); rr += dr * s; cc += dc * s; } }
      if (cells.length >= 4) return cells;
    }
    return null;
  };
  const has4 = (b, r, c, p) => {
    for (const [dr, dc] of DIR4) {
      let n = 1;
      for (let s = -1; s <= 1; s += 2) { let rr = r + dr * s, cc = c + dc * s; while (rr >= 0 && rr < R4 && cc >= 0 && cc < C4 && b[rr * C4 + cc] === p) { n++; rr += dr * s; cc += dc * s; } }
      if (n >= 4) return true;
    }
    return false;
  };
  const WINS4 = [];
  for (let r = 0; r < R4; r++) for (let c = 0; c < C4; c++) for (const [dr, dc] of DIR4) {
    const er = r + 3 * dr, ec = c + 3 * dc; if (er < 0 || er >= R4 || ec < 0 || ec >= C4) continue;
    WINS4.push([0, 1, 2, 3].map(k => (r + k * dr) * C4 + c + k * dc));
  }
  const eval4 = (b, me) => {
    let s = 0;
    for (let r = 0; r < R4; r++) { const v = b[r * C4 + 3]; if (v === me) s += 3; else if (v) s -= 3; }
    for (const w of WINS4) {
      let m = 0, o = 0;
      for (let k = 0; k < 4; k++) { const v = b[w[k]]; if (v === me) m++; else if (v) o++; }
      if (m && !o) s += m === 3 ? 6 : m === 2 ? 2 : 0; else if (o && !m) s -= o === 3 ? 7 : o === 2 ? 2 : 0;
    }
    return s;
  };
  function search4(b, d, a, be, p, me) {
    let any = false, best = p === me ? -1e9 : 1e9;
    for (const c of ORD4) {
      const r = low4(b, c); if (r < 0) continue; any = true; b[r * C4 + c] = p;
      let s; if (has4(b, r, c, p)) s = (p === me ? 1 : -1) * (100000 + d); else if (d <= 0) s = eval4(b, me); else s = search4(b, d - 1, a, be, 3 - p, me);
      b[r * C4 + c] = 0;
      if (p === me) { if (s > best) best = s; if (best > a) a = best; } else { if (s < best) best = s; if (best < be) be = best; }
      if (a >= be) break;
    }
    return any ? best : 0;
  }
  function ai4(b, me, diff) {
    const legal = ORD4.filter(c => low4(b, c) >= 0), depth = [1, 3, 6][diff];
    if (Math.random() < [.4, .1, 0][diff]) return pickOf(legal);
    let best = -1e9, bm = [];
    for (const c of legal) {
      const r = low4(b, c); b[r * C4 + c] = me;
      const s = has4(b, r, c, me) ? 1e6 : search4(b, depth - 1, -1e9, 1e9, 3 - me, me);
      b[r * C4 + c] = 0;
      if (s > best) { best = s; bm = [c]; } else if (s === best) bm.push(c);
    }
    return pickOf(bm);
  }
  B.add({
    id: "s6-connect4", name: "Four in a Row", ages: [7, 20], cat: "Strategy", color: "#4cc3ff", icon: "4",
    desc: "Drop discs and line up four before the computer does.", controls: "Tap a column to drop a disc. The button below switches to 2 players on one screen.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(560, 560), fx = fxMake();
      const btn = g.html('<button type="button" class="bg-btn">Two players: off</button>').firstChild;
      const CS = 80, TOP = 80, RED = ["#ff7b87", "#c0182c"], YEL = ["#fff09a", "#e0a800"];
      let b, turn, drop = null, over = false, wl = null, hover = 3, two = false, gen = 0, T = 0, banner = "", moves = 0;
      const later = (fn, ms) => { const k = gen; g.timeout(() => { if (k === gen) fn(); }, ms); };
      function reset() {
        gen++; b = new Int8Array(42); turn = 1; drop = null; over = false; wl = null; banner = ""; moves = 0;
        g.status(two ? "Two players" : "You are red");
      }
      function startDrop(col, p) {
        const r = low4(b, col); if (r < 0) return false;
        drop = { c: col, r, y: TOP - 40, vy: 0, p }; g.sfx("drop"); return true;
      }
      function land() {
        const { c: col, r, p } = drop; drop = null; b[r * C4 + col] = p; moves++; g.sfx("click");
        const w = line4(b, r, col, p);
        if (w) { wl = w; over = true; w.forEach(i => fx.burst(((i % C4) + .5) * CS, TOP + (Math.floor(i / C4) + .5) * CS, "#fff", 8)); end(p); return; }
        if (moves >= 42) { over = true; end(0); return; }
        turn = 3 - p;
        if (!two && turn === 2) later(() => { if (!over) startDrop(ai4(b, 2, g.diff), 2); }, 450);
      }
      function end(p) {
        if (two) { banner = p ? (p === 1 ? "Red wins!" : "Yellow wins!") : "A draw!"; g.sfx(p ? "cheer" : "hint"); later(() => { p ? g.win(banner) : g.over(banner); }, 1500); return; }
        if (p === 1) { banner = "You win!"; g.sfx("cheer"); g.add(g.by(20, 40, 80) + (42 - moves)); later(() => g.win("You connected four!"), 1500); }
        else if (p === 2) { banner = "Computer wins"; g.sfx("wrong"); later(() => g.over("The computer got four in a row"), 1500); }
        else { banner = "A draw!"; g.add(10); later(() => g.over("The board is full: a draw!"), 1500); }
      }
      g.on(c, "pointermove", e => { hover = g.clamp(Math.floor(pos(e).x / CS), 0, C4 - 1); });
      g.on(c, "pointerdown", e => { const col = g.clamp(Math.floor(pos(e).x / CS), 0, C4 - 1); hover = col; if (over || drop || (!two && turn !== 1)) return; if (!startDrop(col, turn)) g.sfx("wrong"); });
      g.on(btn, "click", () => { two = !two; btn.textContent = "Two players: " + (two ? "on" : "off"); g.score(0); reset(); });
      reset();
      const colr = p => p === 1 ? RED : YEL;
      g.loop((dt, t) => {
        T = t; bg(x, W, H, "#141c3c", "#26357a");
        if (drop) { drop.vy += 2600 * dt; drop.y += drop.vy * dt; const ty = TOP + (drop.r + .5) * CS; if (drop.y >= ty) { drop.y = ty; land(); } }
        text(x, banner || (two ? (turn === 1 ? "Red's turn" : "Yellow's turn") : turn === 1 ? "Your turn" : "Computer is thinking..."), W - 130, 40, "#fff", 22);
        if (!over && !drop && (two || turn === 1)) { const cc = colr(turn); disc(x, (hover + .5) * CS, 40, 30, cc[0], cc[1]); }
        x.fillStyle = "#2d5bd6"; x.beginPath(); x.roundRect(0, TOP, W, H - TOP, 18); x.fill();
        for (let r = 0; r < R4; r++) for (let col = 0; col < C4; col++) {
          const v = b[r * C4 + col], px = (col + .5) * CS, py = TOP + (r + .5) * CS;
          if (v) { const cc = colr(v); disc(x, px, py, 33, cc[0], cc[1]); } else { x.fillStyle = "#0d1b4d"; x.beginPath(); x.arc(px, py, 33, 0, 7); x.fill(); }
        }
        if (drop) { const cc = colr(drop.p); disc(x, (drop.c + .5) * CS, drop.y, 33, cc[0], cc[1]); }
        if (wl) wl.forEach(i => { x.strokeStyle = "rgba(255,255,255," + (.6 + .4 * Math.sin(t * 8)) + ")"; x.lineWidth = 5; x.beginPath(); x.arc(((i % C4) + .5) * CS, TOP + (Math.floor(i / C4) + .5) * CS, 36, 0, 7); x.stroke(); });
        fx.draw(x, dt);
      });
    }
  });

  // =====================================================================
  // 3. Reversi
  // =====================================================================
  const D8 = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  const flips8 = (b, i, p) => {
    if (b[i]) return [];
    const r0 = i >> 3, c0 = i & 7, out = [];
    for (const [dr, dc] of D8) {
      let r = r0 + dr, c = c0 + dc; const tmp = [];
      while (r >= 0 && r < 8 && c >= 0 && c < 8 && b[r * 8 + c] === 3 - p) { tmp.push(r * 8 + c); r += dr; c += dc; }
      if (tmp.length && r >= 0 && r < 8 && c >= 0 && c < 8 && b[r * 8 + c] === p) for (const t of tmp) out.push(t);
    }
    return out;
  };
  const moves8 = (b, p) => { const out = []; for (let i = 0; i < 64; i++) if (!b[i]) { const f = flips8(b, i, p); if (f.length) out.push({ i, f }); } return out; };
  const WT8 = (() => { const q = [[100, -20, 10, 5], [-20, -50, -2, -2], [10, -2, -1, -1], [5, -2, -1, -1]], w = []; for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) w.push(q[Math.min(r, 7 - r)][Math.min(c, 7 - c)]); return w; })();
  const eval8 = (b, p, mob) => {
    let s = 0; for (let i = 0; i < 64; i++) if (b[i] === p) s += WT8[i]; else if (b[i]) s -= WT8[i];
    if (mob) s += 6 * (moves8(b, p).length - moves8(b, 3 - p).length);
    return s;
  };
  function ab8(b, d, a, be, p, mob) {
    if (d <= 0) return eval8(b, p, mob);
    const ms = moves8(b, p);
    if (!ms.length) {
      if (!moves8(b, 3 - p).length) { let n = 0; for (let i = 0; i < 64; i++) n += b[i] === p ? 1 : b[i] ? -1 : 0; return n * 1000; }
      return -ab8(b, d - 1, -be, -a, 3 - p, mob);
    }
    ms.sort((m, n) => WT8[n.i] - WT8[m.i]);
    let best = -1e9;
    for (const m of ms) {
      const nb = b.slice(); nb[m.i] = p; for (const k of m.f) nb[k] = p;
      const s = -ab8(nb, d - 1, -be, -a, 3 - p, mob);
      if (s > best) best = s; if (best > a) a = best; if (a >= be) break;
    }
    return best;
  }
  function ai8(b, p, diff) {
    const ms = moves8(b, p);
    if (diff === 0) return Math.random() < .35 ? ms.reduce((a, m) => m.f.length > a.f.length ? m : a, ms[0]) : pickOf(ms);
    const d = diff === 1 ? 2 : 4; let best = -1e9, bm = ms[0];
    ms.sort((m, n) => WT8[n.i] - WT8[m.i]);
    for (const m of ms) {
      const nb = b.slice(); nb[m.i] = p; for (const k of m.f) nb[k] = p;
      const s = -ab8(nb, d - 1, -1e9, 1e9, 3 - p, diff === 2) + (diff === 1 ? Math.random() * 6 : 0);
      if (s > best) { best = s; bm = m; }
    }
    return bm;
  }
  B.add({
    id: "s6-reversi", name: "Reversi", ages: [10, 20], cat: "Strategy", color: "#35c06b", icon: "R",
    desc: "Trap the computer's discs between yours and flip them all.", controls: "Tap a glowing square to place a black disc. Corners are powerful!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(560, 620), fx = fxMake();
      const M = 20, TOP = 70, CS = 65;
      const b = new Int8Array(64); b[27] = 2; b[36] = 2; b[28] = 1; b[35] = 1;
      let turn = 1, T = 0, busy = false, over = false, flipAt = new Array(64).fill(-9), flipFrom = new Array(64).fill(0), last = -1, note = "Your turn";
      const count = p => { let n = 0; for (let i = 0; i < 64; i++) if (b[i] === p) n++; return n; };
      const ctr = i => [M + (i & 7) * CS + CS / 2, TOP + (i >> 3) * CS + CS / 2];
      let legal = moves8(b, 1);
      function apply(m, p) {
        b[m.i] = p; last = m.i; flipAt[m.i] = T - 1; m.f.forEach((k, n) => { flipFrom[k] = b[k]; b[k] = p; flipAt[k] = T + n * .06; });
        g.sfx("flip"); fx.burst(ctr(m.i)[0], ctr(m.i)[1], p === 1 ? "#333" : "#fff", 8);
      }
      function after() {
        const pm = moves8(b, 1), am = moves8(b, 2);
        if (!pm.length && !am.length) return end();
        let next = 3 - turn;
        if (next === 1 ? !pm.length : !am.length) { note = next === 1 ? "You have no moves: computer goes again" : "Computer has no moves: your turn again"; next = turn; } else note = next === 1 ? "Your turn" : "Computer is thinking...";
        turn = next; legal = turn === 1 ? pm : [];
        busy = false;
        if (turn === 2) { busy = true; g.timeout(aiTurn, 700); }
      }
      function aiTurn() { const m = ai8(b, 2, g.diff); apply(m, 2); g.timeout(after, 500); }
      function end() {
        over = true; const me = count(1), ai = count(2); g.sfx(me > ai ? "cheer" : "sad");
        if (me > ai) { g.score((me + (me - ai)) * g.by(1, 2, 3)); note = "You win " + me + " to " + ai + "!"; g.timeout(() => g.win("You win " + me + " to " + ai + "!"), 1200); }
        else if (me === ai) { g.score(me); note = "A tie!"; g.timeout(() => g.over("A tie, " + me + " each"), 1200); }
        else { g.score(0); note = "Computer wins " + ai + " to " + me; g.timeout(() => g.over("The computer wins " + ai + " to " + me), 1200); }
      }
      g.on(c, "pointerdown", e => {
        if (busy || over || turn !== 1) return;
        const p = pos(e), col = Math.floor((p.x - M) / CS), row = Math.floor((p.y - TOP) / CS);
        if (col < 0 || col > 7 || row < 0 || row > 7) return;
        const m = legal.find(v => v.i === row * 8 + col); if (!m) { g.sfx("wrong"); return; }
        busy = true; apply(m, 1); g.timeout(after, 600);
      });
      g.loop((dt, t) => {
        T = t; bg(x, W, H, "#0d3b24", "#16603a");
        text(x, "You (black) " + count(1), 130, 28, "#fff", 22); text(x, "Computer (white) " + count(2), 400, 28, "#fff", 22);
        text(x, note, W / 2, 52, "#ffe58a", 16);
        x.fillStyle = "#1f8a4c"; x.beginPath(); x.roundRect(M - 6, TOP - 6, CS * 8 + 12, CS * 8 + 12, 12); x.fill();
        x.strokeStyle = "#0f5d30"; x.lineWidth = 2; x.beginPath();
        for (let k = 0; k <= 8; k++) { x.moveTo(M + k * CS, TOP); x.lineTo(M + k * CS, TOP + 8 * CS); x.moveTo(M, TOP + k * CS); x.lineTo(M + 8 * CS, TOP + k * CS); }
        x.stroke();
        if (last >= 0) { x.strokeStyle = "#ffe58a"; x.lineWidth = 3; x.strokeRect(M + (last & 7) * CS + 3, TOP + (last >> 3) * CS + 3, CS - 6, CS - 6); }
        for (let i = 0; i < 64; i++) {
          if (!b[i]) continue;
          const [px, py] = ctr(i), q = (t - flipAt[i]) / .4; let col = b[i], sx = 1;
          if (q < 0) col = flipFrom[i] || b[i]; else if (q < 1) { sx = Math.max(.05, Math.abs(Math.cos(q * Math.PI))); col = q < .5 ? (flipFrom[i] || b[i]) : b[i]; }
          x.save(); x.translate(px, py); x.scale(sx, 1);
          if (col === 1) disc(x, 0, 0, CS * .4, "#666", "#111"); else disc(x, 0, 0, CS * .4, "#fff", "#c5d0dc");
          x.restore();
        }
        if (turn === 1 && !busy && !over) for (const m of legal) { const [px, py] = ctr(m.i); x.fillStyle = "rgba(255,255,255," + (.3 + .2 * Math.sin(t * 5)) + ")"; x.beginPath(); x.arc(px, py, 9, 0, 7); x.fill(); }
        fx.draw(x, dt);
      });
    }
  });

  // =====================================================================
  // 4. Checkers
  // =====================================================================
  const dirs5 = (side, king) => king ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] : [[-side, -1], [-side, 1]];
  function jumps5(b, i, side, king, path, caps, out) {
    let found = false; const r = i >> 3, c = i & 7;
    for (const [dr, dc] of dirs5(side, king)) {
      const r2 = r + 2 * dr, c2 = c + 2 * dc; if (r2 < 0 || r2 > 7 || c2 < 0 || c2 > 7) continue;
      const m = (r + dr) * 8 + c + dc, t = r2 * 8 + c2;
      if (b[m] * side < 0 && !b[t]) {
        found = true; const nb = b.slice(); nb[m] = 0; nb[t] = nb[i]; nb[i] = 0;
        const np = path.concat(t), nc = caps.concat(m);
        if (!king && r2 === (side === 1 ? 0 : 7)) out.push({ path: np, caps: nc }); else jumps5(nb, t, side, king, np, nc, out);
      }
    }
    if (!found && path.length > 1) out.push({ path, caps });
  }
  function moves5(b, side) {
    const caps = [], steps = [];
    for (let i = 0; i < 64; i++) if (b[i] * side > 0) {
      const king = Math.abs(b[i]) === 2; jumps5(b, i, side, king, [i], [], caps);
      for (const [dr, dc] of dirs5(side, king)) { const r2 = (i >> 3) + dr, c2 = (i & 7) + dc; if (r2 < 0 || r2 > 7 || c2 < 0 || c2 > 7) continue; const t = r2 * 8 + c2; if (!b[t]) steps.push({ path: [i, t], caps: [] }); }
    }
    return caps.length ? caps : steps;
  }
  function apply5(b, mv, side) {
    const nb = b.slice(), from = mv.path[0], to = mv.path[mv.path.length - 1]; let pc = nb[from]; nb[from] = 0;
    for (const k of mv.caps) nb[k] = 0;
    if (Math.abs(pc) === 1 && (to >> 3) === (side === 1 ? 0 : 7)) pc = 2 * side;
    nb[to] = pc; return nb;
  }
  function eval5(b, me) {
    let s = 0;
    for (let i = 0; i < 64; i++) {
      const v = b[i]; if (!v) continue;
      const sg = v > 0 ? 1 : -1, k = Math.abs(v) === 2; let val = k ? 175 : 100;
      if (!k) val += (sg === 1 ? 7 - (i >> 3) : (i >> 3)) * 4;
      const col = i & 7; if (col > 1 && col < 6) val += 3;
      s += (sg === me ? 1 : -1) * val;
    }
    return s;
  }
  function ab5(b, d, a, be, side, me) {
    const ms = moves5(b, side);
    if (!ms.length) return side === me ? -1e5 - d : 1e5 + d;
    if (d <= 0) return eval5(b, me);
    let best = side === me ? -1e9 : 1e9;
    for (const m of ms) {
      const s = ab5(apply5(b, m, side), d - 1, a, be, -side, me);
      if (side === me) { if (s > best) best = s; if (best > a) a = best; } else { if (s < best) best = s; if (best < be) be = best; }
      if (a >= be) break;
    }
    return best;
  }
  B.add({
    id: "s6-checkers", name: "Checkers", ages: [8, 20], cat: "Strategy", color: "#ff8a2a", icon: "C",
    desc: "Jump the dark pieces and crown your kings.", controls: "Tap a red piece, then tap where it goes. Jumps are a must! Keep tapping to chain jumps.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(560, 560), fx = fxMake(), CS = 70;
      let b = new Int8Array(64);
      for (let i = 0; i < 64; i++) { const r = i >> 3, cc = i & 7; if ((r + cc) % 2 === 1) { if (r < 3) b[i] = -1; else if (r > 4) b[i] = 1; } }
      let turn = 1, sel = null, legal = moves5(b, 1), T = 0, anim = null, last = [], quiet = 0, plies = 0, busy = false, over = false, note = "Your turn";
      const pre = (m, p) => p.every((v, k) => m.path[k] === v);
      const targets = () => sel ? legal.filter(m => pre(m, sel) && m.path.length > sel.length).map(m => m.path[sel.length]) : [];
      const ctr = i => [(i & 7) * CS + CS / 2, (i >> 3) * CS + CS / 2];
      function doMove(m, side) {
        const from = m.path[0], to = m.path[m.path.length - 1], man = Math.abs(b[from]) === 1;
        m.caps.forEach(k => { const [px, py] = ctr(k); fx.burst(px, py, b[k] > 0 ? "#ff5a6a" : "#8890b8", 12); });
        b = apply5(b, m, side); anim = { to, path: m.path, t0: T, dur: .22 * (m.path.length - 1) }; last = [from, to];
        g.sfx(m.caps.length ? "boom" : "click");
        if (side === 1 && m.caps.length) g.add(2 * m.caps.length);
        quiet = (m.caps.length || man) ? 0 : quiet + 1; plies++; sel = null;
        const crowned = Math.abs(b[to]) === 2 && man; if (crowned) { g.sfx("star"); fx.burst(ctr(to)[0], ctr(to)[1], "#ffd34e", 16); }
        busy = true; g.timeout(() => next(-side), anim.dur * 1000 + 250);
      }
      function next(side) {
        const ms = moves5(b, side);
        if (!ms.length) return finish(side === 1 ? 2 : 1);
        if (quiet >= 40 || plies >= 180) return finish(0);
        turn = side; busy = false; note = side === 1 ? "Your turn" : "Computer is thinking...";
        if (side === 1) legal = ms; else { busy = true; g.timeout(() => { doMove(aiPick(ms), -1); }, 500); }
      }
      function aiPick(ms) {
        if (g.diff === 0) return pickOf(ms);
        const d = g.diff === 1 ? 3 : 5; let best = -1e9, bm = [];
        for (const m of ms) { const s = ab5(apply5(b, m, -1), d - 1, -1e9, 1e9, 1, -1); if (s > best) { best = s; bm = [m]; } else if (s === best) bm.push(m); }
        return pickOf(bm);
      }
      function finish(w) {
        over = true;
        if (w === 1) { g.add(g.by(30, 50, 90)); note = "You win!"; g.timeout(() => g.win("You cleared the board of moves!"), 1000); }
        else if (w === 2) { note = "Computer wins"; g.timeout(() => g.over("The computer wins this one"), 1000); }
        else { note = "A draw"; g.timeout(() => g.over("A draw: nobody can make progress"), 1000); }
      }
      g.on(c, "pointerdown", e => {
        if (busy || over || turn !== 1) return;
        const p = pos(e), i = Math.floor(p.y / CS) * 8 + Math.floor(p.x / CS); if (i < 0 || i > 63) return;
        if (sel && targets().includes(i)) {
          const np = sel.concat(i), full = legal.find(m => m.path.length === np.length && pre(m, np));
          if (full) doMove(full, 1); else { sel = np; g.sfx("pick"); }
        } else if (b[i] > 0 && legal.some(m => m.path[0] === i)) { sel = [i]; g.sfx("pick"); }
        else { if (sel) g.sfx("back"); else if (b[i] > 0) { g.sfx("wrong"); note = legal[0].caps.length ? "You must jump when you can!" : "That piece cannot move"; } sel = null; }
      });
      g.loop((dt, t) => {
        T = t; bg(x, W, H, "#3a2412", "#3a2412");
        let r1 = 0, r2 = 0; for (let i = 0; i < 64; i++) { if (b[i] > 0) r1++; else if (b[i] < 0) r2++; }
        g.status("You " + r1 + "  Computer " + r2);
        for (let i = 0; i < 64; i++) { const r = i >> 3, cc = i & 7; x.fillStyle = (r + cc) % 2 ? "#9a5a32" : "#f3d9a8"; x.fillRect(cc * CS, r * CS, CS, CS); }
        last.forEach(i => { x.fillStyle = "rgba(255,229,138,.35)"; x.fillRect((i & 7) * CS, (i >> 3) * CS, CS, CS); });
        if (sel) { const [px, py] = ctr(sel[sel.length - 1]); x.fillStyle = "rgba(255,255,255,.35)"; x.fillRect(px - CS / 2, py - CS / 2, CS, CS); }
        for (let i = 0; i < 64; i++) {
          const v = b[i]; if (!v) continue; let [px, py] = ctr(i);
          if (anim && i === anim.to && T < anim.t0 + anim.dur) {
            const u = (T - anim.t0) / .22, k = Math.min(anim.path.length - 2, Math.floor(u)), f = u - k, a = ctr(anim.path[k]), z = ctr(anim.path[k + 1]);
            px = a[0] + (z[0] - a[0]) * f; py = a[1] + (z[1] - a[1]) * f;
          }
          x.fillStyle = "rgba(0,0,0,.35)"; x.beginPath(); x.arc(px + 2, py + 4, CS * .38, 0, 7); x.fill();
          if (v > 0) disc(x, px, py, CS * .38, "#ff9aa5", "#d11f36"); else disc(x, px, py, CS * .38, "#7a82a8", "#1f2340");
          x.strokeStyle = "rgba(255,255,255,.35)"; x.lineWidth = 2; x.beginPath(); x.arc(px, py, CS * .27, 0, 7); x.stroke();
          if (Math.abs(v) === 2) text(x, "K", px, py + 1, "#ffd34e", 24);
        }
        if (turn === 1 && !busy && !over) {
          if (sel) targets().forEach(i => { const [px, py] = ctr(i); x.fillStyle = "rgba(70,255,140,.6)"; x.beginPath(); x.arc(px, py, 12 + 2 * Math.sin(t * 6), 0, 7); x.fill(); });
          else legal.forEach(m => { const [px, py] = ctr(m.path[0]); x.strokeStyle = "rgba(255,255,255," + (.35 + .25 * Math.sin(t * 5)) + ")"; x.lineWidth = 3; x.beginPath(); x.arc(px, py, CS * .43, 0, 7); x.stroke(); });
        }
        fx.draw(x, dt);
        x.fillStyle = "rgba(0,0,0,.55)"; x.fillRect(0, H - 28, W, 28); text(x, note, W / 2, H - 14, "#fff", 16);
      });
    }
  });

  // =====================================================================
  // 5. Dots and Boxes
  // =====================================================================
  B.add({
    id: "s6-dotsboxes", name: "Dots and Boxes", ages: [6, 20], cat: "Strategy", color: "#b48cff", icon: "#",
    desc: "Draw lines between dots and close more boxes than the computer.", controls: "Tap between two dots to draw a line. Close a box to go again!",
    start(g) {
      const n = g.by(3, 4, 5), { c, x, W, H, pos } = g.canvas(560, 600), fx = fxMake();
      const M = 70, SP = (W - 2 * M) / n, TOP = 40, NH = (n + 1) * n, E = 2 * n * (n + 1);
      const hId = (r, cc) => r * n + cc, vId = (r, cc) => NH + r * (n + 1) + cc;
      const BOXE = [], EB = Array.from({ length: E }, () => []);
      for (let r = 0; r < n; r++) for (let cc = 0; cc < n; cc++) { const k = [hId(r, cc), hId(r + 1, cc), vId(r, cc), vId(r, cc + 1)]; BOXE.push(k); k.forEach(e => EB[e].push(r * n + cc)); }
      const mid = e => { if (e < NH) { const r = Math.floor(e / n), cc = e % n; return [M + (cc + .5) * SP, TOP + M / 2 + r * SP]; } const k = e - NH, r = Math.floor(k / (n + 1)), cc = k % (n + 1); return [M + cc * SP, TOP + M / 2 + (r + .5) * SP]; };
      const ed = new Uint8Array(E), bx = new Uint8Array(n * n);
      let turn = 1, hover = -1, T = 0, p1 = 0, p2 = 0, busy = false, over = false, note = "Your turn";
      const sides = (e2, bi) => BOXE[bi].filter(k => e2[k]).length;
      const take = (e2, b2, e, who) => { e2[e] = who; let got = 0; for (const bi of EB[e]) if (!b2[bi] && BOXE[bi].every(k => e2[k])) { b2[bi] = who; got++; } return got; };
      const edgeAt = p => { let best = -1, bd = SP * .42; for (let e = 0; e < E; e++) { if (ed[e]) continue; const m = mid(e), d = Math.hypot(m[0] - p.x, m[1] - p.y); if (d < bd) { bd = d; best = e; } } return best; };
      function playEdge(e, who) {
        const got = take(ed, bx, e, who); g.sfx(got ? "gotit" : "click");
        if (got) { if (who === 1) { p1 += got; g.add(got * g.by(1, 2, 3)); } else p2 += got; EB[e].forEach(bi => { if (bx[bi] === who) fx.burst(M + ((bi % n) + .5) * SP, TOP + M / 2 + (Math.floor(bi / n) + .5) * SP, who === 1 ? "#4cc3ff" : "#ff6f8a", 14); }); }
        if (p1 + p2 === n * n) return end();
        if (!got) turn = 3 - who;
        note = turn === 1 ? (got ? "Closed one! Go again" : "Your turn") : "Computer is thinking...";
        if (turn === 2) { busy = true; g.timeout(aiStep, 600); } else busy = false;
      }
      function aiStep() { playEdge(aiEdge(), 2); }
      const completable = (e2, b2) => { const out = []; for (let e = 0; e < E; e++) if (!e2[e] && EB[e].some(bi => !b2[bi] && sides(e2, bi) === 3)) out.push(e); return out; };
      function aiEdge() {
        const free = []; for (let e = 0; e < E; e++) if (!ed[e]) free.push(e);
        const comp = completable(ed, bx), d = g.diff;
        if (comp.length && (d > 0 || Math.random() < .5)) return pickOf(comp);
        if (d === 0) return pickOf(free);
        const safe = free.filter(e => EB[e].every(bi => bx[bi] || sides(ed, bi) < 2));
        if (safe.length) return pickOf(safe);
        if (d === 1) return pickOf(free);
        let best = 1e9, bm = [];
        for (const e of free) {
          const e2 = ed.slice(), b2 = bx.slice(); take(e2, b2, e, 2); let cnt = 0, again = true;
          while (again) { again = false; const cm = completable(e2, b2); if (cm.length) { cnt += take(e2, b2, cm[0], 1); again = true; } }
          if (cnt < best) { best = cnt; bm = [e]; } else if (cnt === best) bm.push(e);
        }
        return pickOf(bm);
      }
      function end() {
        over = true;
        if (p1 > p2) { g.add(g.by(10, 20, 40)); note = "You win " + p1 + " to " + p2 + "!"; g.timeout(() => g.win("You win " + p1 + " boxes to " + p2 + "!"), 1100); }
        else if (p1 === p2) { note = "A tie!"; g.timeout(() => g.over("A tie: " + p1 + " boxes each"), 1100); }
        else { note = "Computer wins"; g.timeout(() => g.over("The computer wins " + p2 + " to " + p1), 1100); }
      }
      g.on(c, "pointermove", e => { hover = edgeAt(pos(e)); });
      g.on(c, "pointerdown", e => { const i = edgeAt(pos(e)); hover = i; if (busy || over || turn !== 1 || i < 0) return; playEdge(i, 1); });
      g.loop((dt, t) => {
        T = t; bg(x, W, H, "#241a5c", "#3e2c8f");
        g.status("You " + p1 + "  Computer " + p2);
        text(x, note, W / 2, 28, "#fff", 22);
        for (let bi = 0; bi < n * n; bi++) if (bx[bi]) { const px = M + (bi % n) * SP, py = TOP + M / 2 + Math.floor(bi / n) * SP; x.fillStyle = bx[bi] === 1 ? "rgba(76,195,255,.45)" : "rgba(255,111,138,.45)"; x.fillRect(px + 5, py + 5, SP - 10, SP - 10); text(x, bx[bi] === 1 ? "You" : "PC", px + SP / 2, py + SP / 2, "#fff", Math.min(24, SP * .3)); }
        x.lineCap = "round";
        for (let e = 0; e < E; e++) {
          const m = mid(e), hz = e < NH, dx = hz ? SP / 2 : 0, dy = hz ? 0 : SP / 2;
          if (ed[e]) { x.strokeStyle = ed[e] === 1 ? "#4cc3ff" : "#ff6f8a"; x.lineWidth = 9; }
          else if (e === hover && turn === 1 && !busy && !over) { x.strokeStyle = "rgba(255,255,255,.65)"; x.lineWidth = 9; }
          else { x.strokeStyle = "rgba(255,255,255,.12)"; x.lineWidth = 3; }
          x.beginPath(); x.moveTo(m[0] - dx, m[1] - dy); x.lineTo(m[0] + dx, m[1] + dy); x.stroke();
        }
        for (let r = 0; r <= n; r++) for (let cc = 0; cc <= n; cc++) { x.fillStyle = "#fff"; x.beginPath(); x.arc(M + cc * SP, TOP + M / 2 + r * SP, 7, 0, 7); x.fill(); }
        fx.draw(x, dt);
      });
    }
  });

  // =====================================================================
  // 6. Nim (stone picking)
  // =====================================================================
  B.add({
    id: "s6-nim", name: "Stone Picker", ages: [6, 20], cat: "Strategy", color: "#9ad14b", icon: "N",
    desc: "Take stones from a row. Whoever takes the very last stone wins!", controls: "Tap a stone to take it and every stone to its right in that row. Win 6 rounds in a row!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 420), fx = fxMake();
      const hintBtn = g.diff === 0 ? g.html('<button type="button" class="bg-btn">Show a hint</button>').firstChild : null;
      let heaps, round = 0, busy = false, over = false, hint = null, hov = null, T = 0, note = "";
      const xor = h => h.reduce((a, v) => a ^ v, 0);
      const mk = () => {
        const nH = Math.min(5, g.by(3, 3, 4) + (round >> 1)), mx = Math.min(11, g.by(5, 7, 9) + round); let h;
        do { h = Array.from({ length: nH }, () => g.ri(1, mx)); } while (xor(h) === 0);
        return h;
      };
      const best = h => {
        const xs = xor(h);
        if (xs === 0) { let bi = 0; h.forEach((v, i) => { if (v > h[bi]) bi = i; }); return { row: bi, take: 1 }; }
        for (let i = 0; i < h.length; i++) if ((h[i] ^ xs) < h[i]) return { row: i, take: h[i] - (h[i] ^ xs) };
        return { row: 0, take: 1 };
      };
      const sx = k => 80 + k * 44, sy = r => 70 + r * 62;
      function remove(row, take, who) {
        for (let k = heaps[row] - take; k < heaps[row]; k++) fx.burst(sx(k), sy(row), who === 1 ? "#ffd34e" : "#ff6f8a", 6, 100);
        heaps[row] -= take; g.sfx(who === 1 ? "pop" : "thump"); hint = null;
      }
      function newRound() { heaps = mk(); busy = false; note = "Round " + (round + 1) + " of 6: you go first"; g.status("Round " + (round + 1) + " of 6"); }
      function aiMove() {
        let mv;
        if (Math.random() < g.by(.15, .6, 1)) mv = best(heaps);
        else { const rows = heaps.map((v, i) => i).filter(i => heaps[i] > 0), row = pickOf(rows); mv = { row, take: g.ri(1, heaps[row]) }; }
        remove(mv.row, mv.take, 2); note = "Computer took " + mv.take;
        if (heaps.every(v => v === 0)) { over = true; g.timeout(() => g.over("The computer took the last stone!"), 700); return; }
        busy = false;
      }
      g.on(c, "pointermove", e => { const p = pos(e); hov = stoneAt(p); });
      function stoneAt(p) { for (let r = 0; r < heaps.length; r++) if (Math.abs(p.y - sy(r)) < 28) { const k = Math.round((p.x - 80) / 44); if (k >= 0 && k < heaps[r] && Math.abs(p.x - sx(k)) < 24) return { r, k }; } return null; }
      g.on(c, "pointerdown", e => {
        if (busy || over) return; const s = stoneAt(pos(e)); hov = s; if (!s) return;
        busy = true; remove(s.r, heaps[s.r] - s.k, 1);
        if (heaps.every(v => v === 0)) {
          g.sfx("cheer"); g.add(g.by(5, 8, 12) + round * 2); round++; note = "You took the last stone!";
          if (round >= 6) { over = true; g.timeout(() => g.win("Nim master! 6 rounds won!"), 900); } else g.timeout(newRound, 1300);
          return;
        }
        note = "Computer is thinking..."; g.timeout(aiMove, 800);
      });
      if (hintBtn) g.on(hintBtn, "click", () => { if (!busy && !over) { hint = best(heaps); note = "Try taking " + hint.take + " from the glowing row"; g.sfx("hint"); } });
      newRound();
      const cols = ["#ff6fb5", "#4cc3ff", "#ffd34e", "#6be28f", "#b48cff"];
      g.loop((dt, t) => {
        T = t; bg(x, W, H, "#183b2a", "#2d6a3f");
        text(x, note, W / 2, 28, "#fff", 22);
        for (let r = 0; r < heaps.length; r++) {
          for (let k = 0; k < heaps[r]; k++) {
            const px = sx(k), py = sy(r), selected = hov && hov.r === r && k >= hov.k && !busy, hinted = hint && hint.row === r && k >= heaps[r] - hint.take;
            const lift = selected ? -5 : 0, wob = hinted ? Math.sin(t * 8 + k) * 3 : 0;
            x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(px + 3, py + 17, 18, 7, 0, 0, 7); x.fill();
            disc(x, px, py + lift + wob, 19, selected ? "#fff" : cols[r % 5], selected ? "#ccc" : "#333a");
            x.strokeStyle = hinted ? "#fff" : "rgba(255,255,255,.4)"; x.lineWidth = hinted ? 4 : 2; x.beginPath(); x.arc(px, py + lift + wob, 19, 0, 7); x.stroke();
          }
        }
        fx.draw(x, dt);
      });
    }
  });

  // =====================================================================
  // 7. Gomoku
  // =====================================================================
  B.add({
    id: "s6-gomoku", name: "Five in a Row", ages: [9, 20], cat: "Strategy", color: "#e0a458", icon: "5",
    desc: "Place stones and make an unbroken line of five. Block the computer!", controls: "Tap an intersection to place a black stone. Five in a row (any direction) wins.",
    start(g) {
      const N = 13, { c, x, W, H, pos } = g.canvas(560, 560), fx = fxMake();
      const M = 28, SP = (W - 2 * M) / (N - 1), DR = [[0, 1], [1, 0], [1, 1], [1, -1]];
      const b = new Int8Array(N * N), born = new Array(N * N).fill(-9);
      let turn = 1, over = false, busy = false, hover = -1, T = 0, last = -1, wl = null, mv = 0, note = "Your turn (black)";
      const inb = (r, cc) => r >= 0 && r < N && cc >= 0 && cc < N;
      const five = (r, cc, p) => {
        for (const [dr, dc] of DR) {
          const cells = [r * N + cc];
          for (let s = -1; s <= 1; s += 2) { let rr = r + dr * s, c2 = cc + dc * s; while (inb(rr, c2) && b[rr * N + c2] === p) { cells.push(rr * N + c2); rr += dr * s; c2 += dc * s; } }
          if (cells.length >= 5) return cells;
        }
        return null;
      };
      const cellScore = (r, cc, p) => {
        let s = 0;
        for (const [dr, dc] of DR) {
          let n = 1, open = 0;
          for (let sg = -1; sg <= 1; sg += 2) { let rr = r + dr * sg, c2 = cc + dc * sg; while (inb(rr, c2) && b[rr * N + c2] === p) { n++; rr += dr * sg; c2 += dc * sg; } if (inb(rr, c2) && !b[rr * N + c2]) open++; }
          s += n >= 5 ? 1e5 : n === 4 ? (open === 2 ? 1e4 : open === 1 ? 1e3 : 0) : n === 3 ? (open === 2 ? 1e3 : open === 1 ? 100 : 0) : n === 2 ? (open === 2 ? 100 : open === 1 ? 10 : 0) : (open === 2 ? 2 : 0);
        }
        return s;
      };
      const cands = () => {
        const out = [];
        for (let r = 0; r < N; r++) for (let cc = 0; cc < N; cc++) {
          if (b[r * N + cc]) continue; let near = false;
          for (let dr = -2; dr <= 2 && !near; dr++) for (let dc = -2; dc <= 2; dc++) if (inb(r + dr, cc + dc) && b[(r + dr) * N + cc + dc]) { near = true; break; }
          if (near) out.push([r, cc]);
        }
        return out;
      };
      function aiPick() {
        const cs = cands(); if (!cs.length) return -1;
        if (mv === 0) return -1;
        const d = g.diff;
        if (d === 0) {
          if (Math.random() < .3) for (const [r, cc] of cs) { if (cellScore(r, cc, 2) >= 1e5) return r * N + cc; }
          const q = pickOf(cs); return q[0] * N + q[1];
        }
        const wd = d === 1 ? .8 : 1.0, scored = cs.map(([r, cc]) => ({ r, cc, s: cellScore(r, cc, 2) * 1.1 + cellScore(r, cc, 1) * wd + (d === 1 ? Math.random() * 40 : Math.random() * 3) }));
        scored.sort((a, z) => z.s - a.s);
        if (d === 1) return scored[0].r * N + scored[0].cc;
        let bestI = scored[0], bs = -1e12;
        for (const q of scored.slice(0, 6)) {
          b[q.r * N + q.cc] = 2; let opp = 0;
          for (const [r, cc] of cands()) { const v = cellScore(r, cc, 1); if (v > opp) opp = v; }
          b[q.r * N + q.cc] = 0;
          const tot = q.s - .6 * opp; if (tot > bs) { bs = tot; bestI = q; }
        }
        return bestI.r * N + bestI.cc;
      }
      function place(i, p) {
        const r = Math.floor(i / N), cc = i % N; b[i] = p; born[i] = T; last = i; mv++; g.sfx(p === 1 ? "click" : "pick");
        const w = five(r, cc, p);
        if (w) { wl = w; over = true; w.forEach(k => fx.burst(M + (k % N) * SP, M + Math.floor(k / N) * SP, "#ffd34e", 8)); end(p); return; }
        if (mv >= N * N) { over = true; end(0); return; }
        turn = 3 - p; note = turn === 1 ? "Your turn (black)" : "Computer is thinking...";
        if (turn === 2) { busy = true; g.timeout(() => { let q = aiPick(); if (q < 0) { q = Math.floor(N / 2) * N + Math.floor(N / 2); if (b[q]) { const cs = cands(); const z = cs.length ? pickOf(cs) : [0, 0]; q = z[0] * N + z[1]; } } place(q, 2); busy = false; }, 450); }
      }
      function end(p) {
        if (p === 1) { g.sfx("cheer"); g.add(g.by(30, 60, 100) + Math.max(0, 40 - Math.floor(mv / 2))); note = "You made five!"; g.timeout(() => g.win("Five in a row, you win!"), 1200); }
        else if (p === 2) { note = "Computer made five"; g.timeout(() => g.over("The computer got five in a row"), 1200); }
        else g.timeout(() => g.over("The board is full: a draw!"), 800);
      }
      const cellAt = p => { const cc = Math.round((p.x - M) / SP), r = Math.round((p.y - M) / SP); return inb(r, cc) ? r * N + cc : -1; };
      g.on(c, "pointermove", e => { hover = cellAt(pos(e)); });
      g.on(c, "pointerdown", e => { const i = cellAt(pos(e)); hover = i; if (over || busy || turn !== 1 || i < 0 || b[i]) return; place(i, 1); });
      g.loop((dt, t) => {
        T = t; g.status(note);
        x.fillStyle = "#c58b45"; x.fillRect(0, 0, W, H); const gr = x.createLinearGradient(0, 0, W, H); gr.addColorStop(0, "rgba(255,230,170,.35)"); gr.addColorStop(1, "rgba(120,70,20,.25)"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.strokeStyle = "#5a3a14"; x.lineWidth = 1.5; x.beginPath();
        for (let k = 0; k < N; k++) { x.moveTo(M + k * SP, M); x.lineTo(M + k * SP, M + (N - 1) * SP); x.moveTo(M, M + k * SP); x.lineTo(M + (N - 1) * SP, M + k * SP); }
        x.stroke();
        for (const [r, cc] of [[3, 3], [3, 9], [9, 3], [9, 9], [6, 6]]) { x.fillStyle = "#5a3a14"; x.beginPath(); x.arc(M + cc * SP, M + r * SP, 4, 0, 7); x.fill(); }
        if (hover >= 0 && !b[hover] && turn === 1 && !over && !busy) { x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.arc(M + (hover % N) * SP, M + Math.floor(hover / N) * SP, SP * .4, 0, 7); x.fill(); }
        for (let i = 0; i < N * N; i++) if (b[i]) {
          const px = M + (i % N) * SP, py = M + Math.floor(i / N) * SP, k = Math.min(1, (T - born[i]) * 6), rad = SP * .45 * k;
          x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.arc(px + 2, py + 3, rad, 0, 7); x.fill();
          if (b[i] === 1) disc(x, px, py, rad, "#777", "#050505"); else disc(x, px, py, rad, "#fff", "#c9c9c9");
          if (i === last) { x.strokeStyle = "#ff4d6d"; x.lineWidth = 3; x.beginPath(); x.arc(px, py, SP * .18, 0, 7); x.stroke(); }
        }
        if (wl) wl.forEach(k => { x.strokeStyle = "rgba(255,214,60," + (.6 + .4 * Math.sin(t * 8)) + ")"; x.lineWidth = 4; x.beginPath(); x.arc(M + (k % N) * SP, M + Math.floor(k / N) * SP, SP * .5, 0, 7); x.stroke(); });
        fx.draw(x, dt);
      });
    }
  });

  // =====================================================================
  // 8. Mancala
  // =====================================================================
  function sow6(b0, i, side) {
    const b = b0.slice(); let n = b[i]; b[i] = 0; let j = i; const skip = side === 0 ? 13 : 6, store = side === 0 ? 6 : 13; let cap = 0;
    while (n > 0) { j = (j + 1) % 14; if (j === skip) continue; b[j]++; n--; }
    const extra = j === store;
    if (!extra && ((side === 0 && j < 6) || (side === 1 && j > 6 && j < 13)) && b[j] === 1 && b[12 - j] > 0) { cap = b[12 - j]; b[store] += cap + 1; b[j] = 0; b[12 - j] = 0; }
    let over = false;
    if (b.slice(0, 6).every(v => !v) || b.slice(7, 13).every(v => !v)) { for (let k = 0; k < 6; k++) { b[6] += b[k]; b[k] = 0; } for (let k = 7; k < 13; k++) { b[13] += b[k]; b[k] = 0; } over = true; }
    return { b, extra, over, cap };
  }
  function ab6(b, side, d, a, be) {
    const ms = []; for (let i = side === 0 ? 5 : 12; i >= (side === 0 ? 0 : 7); i--) if (b[i]) ms.push(i);
    if (!ms.length || d <= 0) return b[13] - b[6];
    let best = side === 1 ? -1e9 : 1e9;
    for (const i of ms) {
      const r = sow6(b, i, side), s = r.over ? r.b[13] - r.b[6] : ab6(r.b, r.extra ? side : 1 - side, d - 1, a, be);
      if (side === 1) { if (s > best) best = s; if (best > a) a = best; } else { if (s < best) best = s; if (best < be) be = best; }
      if (a >= be) break;
    }
    return best;
  }
  B.add({
    id: "s6-mancala", name: "Seed Sowing", ages: [7, 20], cat: "Strategy", color: "#d98c3f", icon: "M",
    desc: "Scoop seeds, sow them round the board and fill your store.", controls: "Tap one of your pits (bottom row) to sow its seeds to the right. End in your store to go again!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 360), fx = fxMake();
      const SEED = g.by(3, 4, 4);
      let b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; for (let i = 0; i < 14; i++) if (i !== 6 && i !== 13) b[i] = SEED;
      let vb = b.slice(), turn = 0, busy = false, over = false, hl = -1, hover = -1, note = "Your turn: pick a pit", T = 0;
      const pit = i => i === 6 ? [580, 180] : i === 13 ? [60, 180] : i < 6 ? [150 + i * 72, 250] : [150 + (12 - i) * 72, 110];
      const SC = ["#ff6fb5", "#4cc3ff", "#ffd34e", "#6be28f", "#b48cff"];
      function move(i, side) {
        busy = true; const r = sow6(b, i, side); let j = i, hand = b[i]; vb = b.slice(); vb[i] = 0; hl = i; const skip = side === 0 ? 13 : 6;
        const step = () => {
          if (hand > 0) { do { j = (j + 1) % 14; } while (j === skip); vb[j]++; hand--; hl = j; g.sfx("pop"); g.timeout(step, 170); }
          else {
            b = r.b; vb = b.slice(); hl = -1;
            if (r.cap) { g.sfx("boom"); note = (side === 0 ? "You" : "Computer") + " captured " + r.cap + " seeds!"; const p = pit(side === 0 ? 6 : 13); fx.burst(p[0], p[1], "#ffd34e", 18); }
            g.status("You " + b[6] + "  Computer " + b[13]);
            if (r.over) return finish();
            if (r.extra) { note = side === 0 ? "Ended in your store: go again!" : "Computer goes again"; g.sfx("star"); } else { turn = 1 - side; note = turn === 0 ? "Your turn: pick a pit" : "Computer is thinking..."; }
            if (turn === 1) g.timeout(aiTurn, 700); else busy = false;
          }
        };
        g.timeout(step, 120);
      }
      function aiTurn() {
        const ms = []; for (let i = 7; i <= 12; i++) if (b[i]) ms.push(i);
        if (!ms.length) return finish();
        let pickI;
        if (g.diff === 0) { const ex = ms.filter(i => (13 - i) === b[i]); pickI = ex.length && Math.random() < .3 ? ex[0] : pickOf(ms); }
        else {
          const d = g.diff === 1 ? 3 : 7; let best = -1e9, bm = [];
          for (const i of ms.slice().reverse()) { const r = sow6(b, i, 1), s = r.over ? r.b[13] - r.b[6] : ab6(r.b, r.extra ? 1 : 0, d - 1, -1e9, 1e9); if (s > best) { best = s; bm = [i]; } else if (s === best) bm.push(i); }
          pickI = pickOf(bm);
        }
        move(pickI, 1);
      }
      function finish() {
        over = true; const me = b[6], ai = b[13]; g.score(me * g.by(1, 2, 3)); g.status("You " + me + "  Computer " + ai);
        if (me > ai) { note = "You win!"; g.timeout(() => g.win("You win " + me + " to " + ai + "!"), 1000); }
        else if (me === ai) { note = "A tie!"; g.timeout(() => g.over("A tie: " + me + " each"), 1000); }
        else { note = "Computer wins"; g.timeout(() => g.over("The computer wins " + ai + " to " + me), 1000); }
      }
      const pitAt = p => { for (let i = 0; i < 6; i++) { const q = pit(i); if (Math.hypot(p.x - q[0], p.y - q[1]) < 36) return i; } return -1; };
      g.on(c, "pointermove", e => { hover = pitAt(pos(e)); });
      g.on(c, "pointerdown", e => { const i = pitAt(pos(e)); if (busy || over || turn !== 0) return; if (i < 0 || !b[i]) { if (i >= 0) g.sfx("wrong"); return; } hover = -1; move(i, 0); });
      g.status("You 0  Computer 0");
      g.loop((dt, t) => {
        T = t; bg(x, W, H, "#4a2a12", "#2e1808");
        x.fillStyle = "#b87333"; x.beginPath(); x.roundRect(14, 30, W - 28, 300, 40); x.fill();
        x.fillStyle = "rgba(255,230,170,.18)"; x.beginPath(); x.roundRect(20, 36, W - 40, 130, 36); x.fill();
        text(x, note, W / 2, 16, "#ffe9b0", 18);
        for (let i = 0; i < 14; i++) {
          const [px, py] = pit(i), store = i === 6 || i === 13, rx = store ? 38 : 33, ry = store ? 90 : 33;
          x.fillStyle = hl === i ? "#7a4a1c" : (i === hover && !busy && turn === 0 && vb[i] ? "#8a5a2a" : "#6b3d17"); x.beginPath(); x.ellipse(px, py, rx, ry, 0, 0, 7); x.fill();
          x.strokeStyle = "rgba(0,0,0,.4)"; x.lineWidth = 3; x.stroke();
          const n = vb[i], shown = Math.min(n, store ? 30 : 16);
          for (let k = 0; k < shown; k++) { const ang = k * 2.4, rad = store ? 6 + (k % 6) * 4.5 : 3 + Math.sqrt(k) * 6.5, sxp = store ? px + ((k % 5) - 2) * 12 : px + Math.cos(ang) * rad, syp = store ? py - 70 + Math.floor(k / 5) * 17 + (k % 2) * 3 : py + Math.sin(ang) * rad; disc(x, sxp, syp, 6.5, "#fff", SC[(i * 3 + k) % 5]); }
          text(x, String(n), px, store ? py + 108 : (i < 6 ? py + 48 : py - 48), "#ffe9b0", 18);
        }
        text(x, "YOU", 580, 66, "#ffe9b0", 14); text(x, "PC", 60, 66, "#ffe9b0", 14);
        fx.draw(x, dt);
      });
    }
  });

  // =====================================================================
  // 9. Blob Defence (tower defence)
  // =====================================================================
  B.add({
    id: "s6-towers", name: "Blob Defence", ages: [8, 20], cat: "Strategy", color: "#6be28f", icon: "T",
    desc: "Build towers along the path and stop the wobbly blobs getting home.", controls: "Pick a tower (buttons or keys 1-3), tap grass to build. Tap a tower to upgrade it. GO (or space) calls the next wave early.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 440), fx = fxMake(), CS = 40, COLS = 16, ROWS = 10, BAR = 400;
      const PP = [[0, 2], [12, 2], [12, 5], [3, 5], [3, 8], [15, 8]];
      const pts = [{ x: -20, y: PP[0][1] * CS + 20 }].concat(PP.map(p => ({ x: p[0] * CS + 20, y: p[1] * CS + 20 }))); pts.push({ x: 660, y: PP[5][1] * CS + 20 });
      const segs = []; let total = 0;
      for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], z = pts[i + 1], len = Math.hypot(z.x - a.x, z.y - a.y); segs.push({ ax: a.x, ay: a.y, bx: z.x, by: z.y, len, start: total, end: total + len }); total += len; }
      const at = d => { let k = 0; while (k < segs.length - 1 && d > segs[k].end) k++; const s = segs[k], u = g.clamp((d - s.start) / s.len, 0, 1); return { x: s.ax + (s.bx - s.ax) * u, y: s.ay + (s.by - s.ay) * u }; };
      const blocked = Array(COLS * ROWS).fill(false);
      for (let i = 0; i < PP.length - 1; i++) { const a = PP[i], z = PP[i + 1], dx = Math.sign(z[0] - a[0]), dy = Math.sign(z[1] - a[1]); let cx = a[0], cy = a[1]; blocked[cy * COLS + cx] = true; while (cx !== z[0] || cy !== z[1]) { cx += dx; cy += dy; blocked[cy * COLS + cx] = true; } }
      const TT = [{ n: "Dart", cost: 40, rng: 105, rate: .45, dmg: 8, col: "#ffd34e" }, { n: "Frost", cost: 60, rng: 95, rate: .8, dmg: 4, col: "#7be0ff", slow: 1 }, { n: "Cannon", cost: 90, rng: 120, rate: 1.5, dmg: 26, col: "#ff8a2a", splash: 42 }];
      const KINDS = [{ sp: 46, hpm: 1, r: 13, col: "#7be26b", rew: 4 }, { sp: 78, hpm: .55, r: 10, col: "#ffd34e", rew: 4 }, { sp: 32, hpm: 2.8, r: 18, col: "#b48cff", rew: 9 }];
      const TOTAL = g.by(8, 10, 12);
      let gold = g.by(130, 110, 90), lives = g.by(15, 10, 6), wave = 0, phase = "wait", cd = 14, spawnN = 0, spawnT = 0, sel = 0, hover = -1, shake = 0, T = 0, over = false;
      const towers = [], enemies = [], shots = [];
      const stat = t => { const T0 = TT[t.k], m = 1 + .6 * (t.lv - 1); return { dmg: T0.dmg * m, rng: T0.rng * (1 + .08 * (t.lv - 1)), rate: T0.rate * (1 - .1 * (t.lv - 1)) }; };
      const upCost = t => Math.round(TT[t.k].cost * .7 * t.lv);
      const hud = () => g.status("Gold " + gold + "  Lives " + lives + "  Wave " + Math.max(wave, 1) + "/" + TOTAL);
      const mkE = w => {
        const roll = Math.random(), k = w >= 3 && roll < .2 ? 2 : (w >= 2 && roll < .45 ? 1 : 0), K = KINDS[k], hp = (12 + w * 9) * g.by(.8, 1, 1.3) * K.hpm;
        return { d: 0, hp, max: hp, sp: K.sp * g.by(.9, 1, 1.1), r: K.r, col: K.col, rew: K.rew + Math.floor(w / 4), slow: 0, ph: g.rf(0, 6), x: -20, y: 100, dead: false };
      };
      const startWave = () => { wave++; spawnN = 5 + wave * 2; spawnT = 0; phase = "wave"; g.sfx("launch"); hud(); };
      const hurt = (e, dmg) => { if (e.dead) return; e.hp -= dmg; if (e.hp <= 0) { e.dead = true; gold += e.rew; g.add(1); g.sfx("pop"); fx.burst(e.x, e.y, e.col, 14, 150); g.pop("+" + e.rew, e.x * c.clientWidth / W, e.y * c.clientHeight / H - 10, "#ffd34e"); hud(); } };
      g.on(c, "pointermove", e => { const p = pos(e); hover = p.y < BAR ? Math.floor(p.y / CS) * COLS + Math.floor(p.x / CS) : -1; });
      g.on(c, "pointerdown", e => {
        if (over) return; const p = pos(e);
        if (p.y >= BAR) {
          if (p.x >= 520) { if (phase === "wait") startWave(); return; }
          sel = g.clamp(Math.floor((p.x - 8) / 168), 0, 2); g.sfx("pick"); return;
        }
        const cx = Math.floor(p.x / CS), cy = Math.floor(p.y / CS), i = cy * COLS + cx; hover = i;
        const t = towers.find(q => q.i === i);
        if (t) { const uc = upCost(t); if (t.lv >= 3) g.sfx("wrong"); else if (gold >= uc) { gold -= uc; t.lv++; g.sfx("grow"); fx.burst(t.x, t.y, "#fff", 12); hud(); } else g.sfx("wrong"); return; }
        if (blocked[i] || gold < TT[sel].cost) { g.sfx("wrong"); return; }
        gold -= TT[sel].cost; towers.push({ i, x: cx * CS + 20, y: cy * CS + 20, k: sel, lv: 1, cd: 0, ang: 0 }); g.sfx("lock"); fx.burst(cx * CS + 20, cy * CS + 20, TT[sel].col, 10); hud();
      });
      g.on(window, "keydown", e => { if (e.key >= "1" && e.key <= "3") sel = +e.key - 1; if (e.key === " " && phase === "wait") startWave(); });
      hud();
      g.loop((dt, t) => {
        T = t;
        if (!over) {
          if (phase === "wait") { cd -= dt; if (cd <= 0) startWave(); }
          else {
            if (spawnN > 0) { spawnT -= dt; if (spawnT <= 0) { spawnT = Math.max(.4, 1 - wave * .04); spawnN--; enemies.push(mkE(wave)); } }
            else if (!enemies.length) {
              gold += 20 + wave * 4; g.add(10); g.sfx("cheer"); hud();
              if (wave >= TOTAL) { over = true; g.add(lives * 5); g.timeout(() => g.win("All waves stopped! Amazing!"), 700); } else { phase = "wait"; cd = 8; }
            }
          }
          for (const e of enemies) {
            e.d += e.sp * (e.slow > 0 ? .5 : 1) * dt; e.slow -= dt; const p = at(e.d); e.x = p.x; e.y = p.y;
            if (e.d >= total && !e.dead) { e.dead = true; lives--; shake = .35; g.sfx("wrong"); hud(); if (lives <= 0) { over = true; g.timeout(() => g.over("The blobs got through! Wave " + wave), 500); } }
          }
          for (const tw of towers) {
            const st = stat(tw); tw.cd -= dt; let tg = null;
            for (const e of enemies) if (!e.dead && Math.hypot(e.x - tw.x, e.y - tw.y) <= st.rng && (!tg || e.d > tg.d)) tg = e;
            if (tg) { tw.ang = Math.atan2(tg.y - tw.y, tg.x - tw.x); if (tw.cd <= 0) { tw.cd = st.rate; shots.push({ x: tw.x, y: tw.y, tg, k: tw.k, dmg: st.dmg }); if (tw.k === 2) g.sfx("thump"); } }
          }
          for (let i = shots.length - 1; i >= 0; i--) {
            const s = shots[i]; if (s.tg.dead) { shots.splice(i, 1); continue; }
            const dx = s.tg.x - s.x, dy = s.tg.y - s.y, d = Math.hypot(dx, dy), mvd = 360 * dt;
            if (d <= mvd + s.tg.r) {
              const T0 = TT[s.k];
              if (T0.splash) { for (const e of enemies) if (!e.dead && Math.hypot(e.x - s.tg.x, e.y - s.tg.y) <= T0.splash) hurt(e, s.dmg); fx.burst(s.tg.x, s.tg.y, "#ff8a2a", 12, 120); }
              else { if (T0.slow) s.tg.slow = 1.6; hurt(s.tg, s.dmg); fx.burst(s.x, s.y, T0.col, 3, 60); }
              shots.splice(i, 1);
            } else { s.x += dx / d * mvd; s.y += dy / d * mvd; }
          }
          for (let i = enemies.length - 1; i >= 0; i--) if (enemies[i].dead) enemies.splice(i, 1);
        }
        if (shake > 0) shake -= dt;
        x.save(); if (shake > 0) x.translate(g.rf(-4, 4), g.rf(-4, 4));
        bg(x, W, BAR, "#4fa35a", "#3a8247");
        for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) if ((r + q) % 2 === 0 && !blocked[r * COLS + q]) { x.fillStyle = "rgba(255,255,255,.05)"; x.fillRect(q * CS, r * CS, CS, CS); }
        x.lineCap = "round"; x.lineJoin = "round";
        x.strokeStyle = "#a9793a"; x.lineWidth = 38; x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y)); x.stroke();
        x.strokeStyle = "#e2bd78"; x.lineWidth = 30; x.stroke();
        if (hover >= 0 && hover < COLS * ROWS) {
          const hx = (hover % COLS) * CS + 20, hy = Math.floor(hover / COLS) * CS + 20, ok = !blocked[hover] && !towers.some(q => q.i === hover) && gold >= TT[sel].cost;
          x.fillStyle = ok ? "rgba(255,255,255,.25)" : "rgba(255,60,60,.25)"; x.fillRect(hx - 20, hy - 20, CS, CS);
          if (!blocked[hover]) { x.strokeStyle = "rgba(255,255,255,.4)"; x.lineWidth = 2; x.beginPath(); x.arc(hx, hy, TT[sel].rng, 0, 7); x.stroke(); }
        }
        for (const tw of towers) {
          const T0 = TT[tw.k]; x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(tw.x + 2, tw.y + 6, 16, 8, 0, 0, 7); x.fill();
          disc(x, tw.x, tw.y, 15, "#fff", T0.col);
          x.save(); x.translate(tw.x, tw.y); x.rotate(tw.ang); x.fillStyle = tw.k === 2 ? "#5a3210" : "#444"; x.fillRect(0, tw.k === 2 ? -5 : -3, 20, tw.k === 2 ? 10 : 6); x.restore();
          for (let l = 0; l < tw.lv; l++) { x.fillStyle = "#fff"; x.beginPath(); x.arc(tw.x - 8 + l * 8, tw.y + 15, 2.5, 0, 7); x.fill(); }
        }
        const sorted = enemies.slice().sort((a, z) => a.y - z.y);
        for (const e of sorted) {
          const sq = 1 + .12 * Math.sin(t * 8 + e.ph), bob = Math.abs(Math.sin(t * 5 + e.ph)) * 3;
          x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(e.x, e.y + e.r * .8, e.r * .9, e.r * .35, 0, 0, 7); x.fill();
          x.fillStyle = e.slow > 0 ? "#bdeeff" : e.col; x.beginPath(); x.ellipse(e.x, e.y - bob, e.r * sq, e.r / sq, 0, 0, 7); x.fill();
          x.strokeStyle = "rgba(0,0,0,.35)"; x.lineWidth = 2; x.stroke();
          x.fillStyle = "#fff"; x.beginPath(); x.arc(e.x - e.r * .35, e.y - bob - e.r * .2, e.r * .27, 0, 7); x.arc(e.x + e.r * .35, e.y - bob - e.r * .2, e.r * .27, 0, 7); x.fill();
          x.fillStyle = "#222"; x.beginPath(); x.arc(e.x - e.r * .3, e.y - bob - e.r * .18, e.r * .12, 0, 7); x.arc(e.x + e.r * .4, e.y - bob - e.r * .18, e.r * .12, 0, 7); x.fill();
          if (e.hp < e.max) { x.fillStyle = "#300"; x.fillRect(e.x - 14, e.y - e.r - 12, 28, 4); x.fillStyle = "#6f6"; x.fillRect(e.x - 14, e.y - e.r - 12, 28 * Math.max(0, e.hp / e.max), 4); }
        }
        for (const s of shots) { x.fillStyle = TT[s.k].col; x.beginPath(); x.arc(s.x, s.y, s.k === 2 ? 6 : 4, 0, 7); x.fill(); }
        fx.draw(x, dt);
        if (phase === "wait" && !over) text(x, (wave === 0 ? "Build your towers! " : "Wave cleared! ") + "Wave " + (wave + 1) + " in " + Math.ceil(cd) + "s", 320, 22, "#fff", 20);
        x.restore();
        x.fillStyle = "#1f2a24"; x.fillRect(0, BAR, W, H - BAR);
        TT.forEach((T0, i) => {
          x.fillStyle = i === sel ? "#3d5a48" : "#2a3a30"; x.beginPath(); x.roundRect(8 + i * 168, BAR + 4, 160, 32, 8); x.fill();
          if (i === sel) { x.strokeStyle = T0.col; x.lineWidth = 3; x.stroke(); }
          disc(x, 28 + i * 168, BAR + 20, 11, "#fff", T0.col);
          text(x, (i + 1) + " " + T0.n + " $" + T0.cost, 108 + i * 168, BAR + 21, gold >= T0.cost ? "#fff" : "#f88", 16);
        });
        x.fillStyle = phase === "wait" ? "#3ba55d" : "#4a4a4a"; x.beginPath(); x.roundRect(524, BAR + 4, 108, 32, 8); x.fill(); text(x, "GO!", 578, BAR + 21, "#fff", 18);
      });
    }
  });

  // =====================================================================
  // 10. Boat Hunt (peaceful battleship-style guessing)
  // =====================================================================
  B.add({
    id: "s6-boathunt", name: "Boat Hide and Seek", ages: [6, 20], cat: "Strategy", color: "#2fa8e6", icon: "B",
    desc: "Find the computer's hidden boats before it finds yours.", controls: "Tap a square in the big sea to look for a boat. Your own boats are in the small map.",
    start(g) {
      const N = g.by(6, 8, 10), LENS = g.by([3, 2, 2], [4, 3, 3, 2], [5, 4, 3, 3, 2]), { c, x, W, H, pos } = g.canvas(560, 700), fx = fxMake();
      const GX = 56, GY = 70, GS = 448, CS = GS / N, MX = 40, MY = 530, MC = 160 / N;
      const mkFleet = () => {
        const at = new Int8Array(N * N).fill(-1), ships = [];
        LENS.forEach((len, si) => {
          for (let tries = 0; tries < 500; tries++) {
            const hz = Math.random() < .5, r = g.ri(0, hz ? N - 1 : N - len), cc = g.ri(0, hz ? N - len : N - 1), cells = [];
            for (let k = 0; k < len; k++) cells.push((r + (hz ? 0 : k)) * N + cc + (hz ? k : 0));
            if (cells.some(i => at[i] >= 0)) continue;
            cells.forEach(i => { at[i] = si; }); ships.push({ cells, len, hits: 0, sunk: false, hz }); return;
          }
        });
        return { at, ships, shots: new Uint8Array(N * N), resolved: new Uint8Array(N * N) };
      };
      const mine = mkFleet(), foe = mkFleet();
      let turn = 1, busy = false, over = false, T = 0, note = "Your turn: tap a square", pshots = 0, ripples = [];
      const fire = (f, i) => {
        const hit = f.at[i] >= 0; f.shots[i] = hit ? 2 : 1; let sunk = null;
        if (hit) { const s = f.ships[f.at[i]]; s.hits++; if (s.hits === s.len) { s.sunk = true; sunk = s; s.cells.forEach(k => { f.resolved[k] = 1; }); } }
        return { hit, sunk };
      };
      const allFound = f => f.ships.every(s => s.sunk);
      function aiShot() {
        const free = []; for (let i = 0; i < N * N; i++) if (!mine.shots[i]) free.push(i);
        const d = g.diff, live = []; for (let i = 0; i < N * N; i++) if (mine.shots[i] === 2 && !mine.resolved[i]) live.push(i);
        if (d === 0) return pickOf(free);
        if (d === 1) {
          if (live.length) { const nb = []; live.forEach(i => { const r = Math.floor(i / N), cc = i % N; D4.forEach(([dx, dy]) => { const rr = r + dy, c2 = cc + dx; if (rr >= 0 && rr < N && c2 >= 0 && c2 < N && !mine.shots[rr * N + c2]) nb.push(rr * N + c2); }); }); if (nb.length) return pickOf(nb); }
          const par = free.filter(i => (Math.floor(i / N) + i % N) % 2 === 0); return pickOf(par.length ? par : free);
        }
        const heat = new Float32Array(N * N), rem = mine.ships.filter(s => !s.sunk).map(s => s.len);
        for (const len of rem) for (const hz of [true, false]) for (let r = 0; r < (hz ? N : N - len + 1); r++) for (let cc = 0; cc < (hz ? N - len + 1 : N); cc++) {
          let ok = true, cover = 0; const cells = [];
          for (let k = 0; k < len; k++) { const i = (r + (hz ? 0 : k)) * N + cc + (hz ? k : 0); if (mine.shots[i] === 1 || mine.resolved[i]) { ok = false; break; } if (mine.shots[i] === 2) cover++; else cells.push(i); }
          if (!ok) continue; const w = cover ? 1 + cover * 12 : 1; cells.forEach(i => { heat[i] += w; });
        }
        let bs = -1, bm = []; free.forEach(i => { if (heat[i] > bs) { bs = heat[i]; bm = [i]; } else if (heat[i] === bs) bm.push(i); });
        return pickOf(bm);
      }
      function endGame(playerWon) {
        over = true;
        if (playerWon) { const bonus = g.by(40, 60, 90) + Math.max(0, N * N - pshots); g.add(bonus); note = "You found every boat!"; g.timeout(() => g.win("You found all the boats first!"), 1000); }
        else { note = "The computer found all your boats"; g.timeout(() => g.over("The computer found your boats first"), 1000); }
      }
      g.on(c, "pointerdown", e => {
        if (busy || over || turn !== 1) return;
        const p = pos(e), cc = Math.floor((p.x - GX) / CS), r = Math.floor((p.y - GY) / CS);
        if (cc < 0 || cc >= N || r < 0 || r >= N) return; const i = r * N + cc; if (foe.shots[i]) { g.sfx("wrong"); return; }
        pshots++; const res = fire(foe, i), px = GX + (cc + .5) * CS, py = GY + (r + .5) * CS;
        if (res.hit) { g.sfx(res.sunk ? "gotit" : "clink"); g.add(2); fx.burst(px, py, "#ff6f6f", 12); note = res.sunk ? "You found a " + res.sunk.len + "-square boat!" : "A boat is here!"; if (res.sunk) { g.add(5); fx.burst(px, py, "#ffd34e", 24, 200); } }
        else { g.sfx("splash"); ripples.push({ x: px, y: py, t: 0 }); note = "Splash! Only water"; }
        if (allFound(foe)) return endGame(true);
        busy = true; turn = 2; g.timeout(() => {
          const j = aiShot(), res2 = fire(mine, j), mx2 = MX + (j % N + .5) * MC, my2 = MY + (Math.floor(j / N) + .5) * MC;
          if (res2.hit) { g.sfx("boom"); fx.burst(mx2, my2, "#ff6f6f", 10); note = res2.sunk ? "The computer found your " + res2.sunk.len + "-square boat" : "The computer found part of a boat!"; } else { g.sfx("splash"); note = "The computer missed"; }
          if (allFound(mine)) return endGame(false);
          g.timeout(() => { turn = 1; busy = false; note = "Your turn: tap a square"; }, 700);
        }, 700);
      });
      g.loop((dt, t) => {
        T = t; bg(x, W, H, "#06365e", "#0d6aa0");
        g.status("Boats found " + foe.ships.filter(s => s.sunk).length + "/" + foe.ships.length);
        text(x, note, W / 2, 36, "#fff", 22);
        x.fillStyle = "#0a4f80"; x.beginPath(); x.roundRect(GX - 6, GY - 6, GS + 12, GS + 12, 12); x.fill();
        for (let r = 0; r < N; r++) for (let cc = 0; cc < N; cc++) { x.fillStyle = (r + cc) % 2 ? "#2d8fd0" : "#3aa0e2"; x.fillRect(GX + cc * CS + 1, GY + r * CS + 1, CS - 2, CS - 2); }
        for (const s of foe.ships) if (s.sunk) { const a = s.cells[0], r = Math.floor(a / N), cc = a % N; x.fillStyle = "#e8eef5"; x.beginPath(); x.roundRect(GX + cc * CS + 5, GY + r * CS + 5, (s.hz ? s.len : 1) * CS - 10, (s.hz ? 1 : s.len) * CS - 10, CS * .3); x.fill(); }
        for (let i = 0; i < N * N; i++) {
          const v = foe.shots[i]; if (!v) continue; const px = GX + (i % N + .5) * CS, py = GY + (Math.floor(i / N) + .5) * CS;
          if (v === 2) { disc(x, px, py, CS * .26, "#ff9a9a", "#d41f1f"); } else { x.strokeStyle = "rgba(255,255,255,.75)"; x.lineWidth = 3; x.beginPath(); x.arc(px, py, CS * .17, 0, 7); x.stroke(); }
        }
        for (let i = ripples.length - 1; i >= 0; i--) { const rp = ripples[i]; rp.t += dt; if (rp.t > .7) { ripples.splice(i, 1); continue; } x.strokeStyle = "rgba(255,255,255," + (1 - rp.t / .7) + ")"; x.lineWidth = 3; x.beginPath(); x.arc(rp.x, rp.y, rp.t * 50, 0, 7); x.stroke(); }
        // my fleet map
        text(x, "Your boats", MX + 80, MY - 16, "#cfe8ff", 16);
        x.fillStyle = "#0a4f80"; x.fillRect(MX - 3, MY - 3, 166, 166);
        for (let r = 0; r < N; r++) for (let cc = 0; cc < N; cc++) { const i = r * N + cc; x.fillStyle = mine.at[i] >= 0 ? "#cfd8e3" : ((r + cc) % 2 ? "#2d8fd0" : "#3aa0e2"); x.fillRect(MX + cc * MC, MY + r * MC, MC - 1, MC - 1); if (mine.shots[i] === 2) { x.fillStyle = "#e02020"; x.fillRect(MX + cc * MC + 2, MY + r * MC + 2, MC - 5, MC - 5); } else if (mine.shots[i] === 1) { x.fillStyle = "#fff"; x.beginPath(); x.arc(MX + (cc + .5) * MC, MY + (r + .5) * MC, MC * .18, 0, 7); x.fill(); } }
        text(x, "Boats to find", 390, MY + 10, "#cfe8ff", 16);
        foe.ships.forEach((s, k) => { x.fillStyle = s.sunk ? "#ffd34e" : "rgba(255,255,255,.25)"; x.beginPath(); x.roundRect(310, MY + 36 + k * 26, s.len * 22, 16, 8); x.fill(); });
        text(x, "Your boats found: " + mine.ships.filter(s => s.sunk).length + "/" + mine.ships.length, 390, MY + 36 + foe.ships.length * 26 + 14, "#cfe8ff", 15);
        fx.draw(x, dt);
      });
    }
  });

  // =====================================================================
  // 11. Capture the Flag (grid tactics)
  // =====================================================================
  B.add({
    id: "s6-ctf", name: "Blob Capture the Flag", ages: [9, 20], cat: "Strategy", color: "#ff5a6a", icon: "F",
    desc: "Sneak a blob to the red flag and bring it home. Bonk blobs to send them back!", controls: "Tap a blue blob, then a green square (up to 3 steps). Walk into a red blob to bonk it home. Carry the flag to your base!",
    start(g) {
      const N = 9, CS = 64, TOP = 70, { c, x, W, H, pos } = g.canvas(576, 660), fx = fxMake(), CAP = 30;
      const wall = Array(81).fill(false), PH = { x: 4, y: 8 }, AH = { x: 4, y: 0 }, units = [];
      [[2, 8], [4, 7], [6, 8]].forEach((p, i) => units.push({ side: 1, id: i, x: p[0], y: p[1], sx: p[0], sy: p[1], flag: false }));
      [[6, 0], [4, 1], [2, 0]].forEach((p, i) => units.push({ side: 2, id: i, x: p[0], y: p[1], sx: p[0], sy: p[1], flag: false }));
      units.forEach(u => { u.px = (u.x + .5) * CS; u.py = TOP + (u.y + .5) * CS; });
      const bfsOK = () => {
        const seen = Array(81).fill(false), q = [PH.y * 9 + PH.x]; seen[q[0]] = true;
        while (q.length) { const cur = q.shift(), cx = cur % 9, cy = Math.floor(cur / 9); for (const [dx, dy] of D4) { const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx > 8 || ny > 8) continue; const ni = ny * 9 + nx; if (wall[ni] || seen[ni]) continue; seen[ni] = true; q.push(ni); } }
        return seen[AH.y * 9 + AH.x] && units.every(u => seen[u.y * 9 + u.x]);
      };
      const free0 = (cx, cy) => !units.some(u => u.x === cx && u.y === cy) && !(cx === PH.x && cy === PH.y) && !(cx === AH.x && cy === AH.y);
      for (let k = 0, n = g.by(5, 7, 9); k < n; k++) for (let tries = 0; tries < 30; tries++) {
        const cx = g.ri(0, 8), cy = g.ri(2, 6), mx = 8 - cx, my = 8 - cy;
        if (wall[cy * 9 + cx] || !free0(cx, cy) || !free0(mx, my)) continue;
        wall[cy * 9 + cx] = true; wall[my * 9 + mx] = true; if (bfsOK()) break; wall[cy * 9 + cx] = false; wall[my * 9 + mx] = false;
      }
      const distGrid = t => { const d = Array(81).fill(99), q = [t.y * 9 + t.x]; d[q[0]] = 0; while (q.length) { const cur = q.shift(), cx = cur % 9, cy = Math.floor(cur / 9); for (const [dx, dy] of D4) { const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx > 8 || ny > 8) continue; const ni = ny * 9 + nx; if (wall[ni] || d[ni] < 99) continue; d[ni] = d[cur] + 1; q.push(ni); } } return d; };
      const dToA = distGrid(AH), dToP = distGrid(PH);
      const unitAt = (cx, cy) => units.find(u => u.x === cx && u.y === cy);
      const reach = (u, range) => {
        const st = u.y * 9 + u.x, dist = new Map([[st, 0]]), q = [st];
        while (q.length) {
          const cur = q.shift(), d = dist.get(cur); if (d >= range) continue; const cx = cur % 9, cy = Math.floor(cur / 9);
          for (const [dx, dy] of D4) {
            const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx > 8 || ny > 8) continue; const ni = ny * 9 + nx; if (wall[ni] || dist.has(ni)) continue;
            const o = unitAt(nx, ny); if (o) { if (o.side !== u.side) dist.set(ni, d + 1); continue; }
            dist.set(ni, d + 1); q.push(ni);
          }
        }
        dist.delete(st); return dist;
      };
      const respawn = u => {
        const q = [[u.sx, u.sy]], seen = new Set([u.sy * 9 + u.sx]);
        while (q.length) {
          const [cx, cy] = q.shift(); if (!wall[cy * 9 + cx] && !units.some(o => o !== u && o.x === cx && o.y === cy)) { u.x = cx; u.y = cy; return; }
          for (const [dx, dy] of D4) { const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx > 8 || ny > 8 || seen.has(ny * 9 + nx)) continue; seen.add(ny * 9 + nx); q.push([nx, ny]); }
        }
      };
      let turn = 1, sel = null, busy = false, over = false, T = 0, note = "Your turn: pick a blue blob", mvs = [0, 0, 0], tags = [0, 0, 0], reachSel = null;
      const hud = () => g.status("Move " + Math.min(mvs[1] + 1, CAP) + "/" + CAP + "  Bonks " + tags[1] + "-" + tags[2]);
      const homeFlagVisible = side => !units.some(v => v.flag && v.side !== side);
      function doMove(u, ni) {
        const tx = ni % 9, ty = Math.floor(ni / 9), o = units.find(v => v.x === tx && v.y === ty && v.side !== u.side);
        u.x = tx; u.y = ty; mvs[u.side]++; g.sfx("swish");
        if (o) { o.flag = false; respawn(o); tags[u.side]++; g.sfx("boom"); fx.burst((tx + .5) * CS, TOP + (ty + .5) * CS, u.side === 1 ? "#4cc3ff" : "#ff6f8a", 18, 170); if (u.side === 1) g.add(5); note = u.side === 1 ? "BONK! Sent home!" : "Bonked! Back to base"; }
        const eh = u.side === 1 ? AH : PH, oh = u.side === 1 ? PH : AH;
        if (!u.flag && tx === eh.x && ty === eh.y && !units.some(v => v.flag && v.side === u.side)) { u.flag = true; g.sfx("flag"); note = u.side === 1 ? "You grabbed the flag! Run home!" : "The computer grabbed your flag!"; }
        hud();
        if (u.flag && tx === oh.x && ty === oh.y) return finish(u.side);
        if (mvs[1] >= CAP && mvs[2] >= CAP) return finish(0);
        busy = true; g.timeout(() => { turn = 3 - u.side; sel = null; reachSel = null; if (turn === 2) { note = "Computer is thinking..."; aiTurn(); } else { busy = false; if (!o && !u.flag) note = "Your turn: pick a blue blob"; } }, 450);
      }
      function aiTurn() {
        const d = g.diff, mine = units.filter(u => u.side === 2), foes = units.filter(u => u.side === 1), threat = Array(81).fill(0);
        foes.forEach(u => reach(u, 3).forEach((v, k) => { threat[k]++; }));
        const carrierOfOurs = foes.find(u => u.flag), mateCarrier = mine.find(u => u.flag), opts = [];
        for (const u of mine) {
          const rc = reach(u, 3);
          rc.forEach((dd, ni) => {
            const tx = ni % 9, ty = Math.floor(ni / 9), o = unitAt(tx, ty); let sc = 0;
            if (o) sc += 50 + (o.flag ? 400 : 0);
            if (u.flag) { if (tx === AH.x && ty === AH.y) sc += 2000; sc -= 12 * dToA[ni]; sc -= threat[ni] * g.by(0, 40, 80); }
            else {
              if (tx === PH.x && ty === PH.y && !mateCarrier) sc += 300;
              if (d > 0 && u.id === 0 && !carrierOfOurs) sc -= 8 * Math.max(0, dToA[ni] - 2);
              else if (carrierOfOurs) sc -= 7 * (Math.abs(tx - carrierOfOurs.x) + Math.abs(ty - carrierOfOurs.y));
              else if (mateCarrier) sc -= 4 * (Math.abs(tx - mateCarrier.x) + Math.abs(ty - mateCarrier.y));
              else sc -= 6 * dToP[ni];
              sc -= threat[ni] * g.by(0, 18, 40);
            }
            sc += Math.random() * g.by(60, 10, 4);
            opts.push({ u, ni, sc });
          });
        }
        if (!opts.length) { mvs[2]++; hud(); if (mvs[1] >= CAP && mvs[2] >= CAP) return finish(0); turn = 1; busy = false; note = "Computer is stuck: your turn"; return; }
        let pickO; if (d === 0 && Math.random() < .35) pickO = pickOf(opts); else pickO = opts.reduce((a, z) => z.sc > a.sc ? z : a, opts[0]);
        g.timeout(() => { if (!over) doMove(pickO.u, pickO.ni); }, 500);
      }
      function finish(w) {
        over = true;
        if (w === 1) { g.sfx("cheer"); g.add(g.by(40, 70, 120) + (CAP - mvs[1]) * 2 + tags[1] * 5); note = "You captured the flag!"; g.timeout(() => g.win("You captured the flag!"), 1100); }
        else if (w === 2) { note = "The computer captured your flag"; g.timeout(() => g.over("The computer got your flag home"), 1100); }
        else if (tags[1] > tags[2]) { g.add(g.by(15, 25, 45) + tags[1] * 5); note = "Time up! You bonked more"; g.timeout(() => g.win("Time is up: you bonked the most blobs!"), 1100); }
        else if (tags[1] < tags[2]) { note = "Time up! Computer bonked more"; g.timeout(() => g.over("Time is up: the computer bonked more"), 1100); }
        else { note = "Time up! A draw"; g.timeout(() => g.over("Time is up: a draw"), 1100); }
      }
      g.on(c, "pointerdown", e => {
        if (busy || over || turn !== 1) return; const p = pos(e), cx = Math.floor(p.x / CS), cy = Math.floor((p.y - TOP) / CS);
        if (cx < 0 || cx > 8 || cy < 0 || cy > 8) return; const ni = cy * 9 + cx, u = unitAt(cx, cy);
        if (sel && reachSel && reachSel.has(ni)) { doMove(sel, ni); return; }
        if (u && u.side === 1) { sel = u; reachSel = reach(u, 3); g.sfx("pick"); note = reachSel.size ? "Tap a green square" : "That blob is stuck"; }
        else { sel = null; reachSel = null; if (u) g.sfx("wrong"); }
      });
      hud();
      g.loop((dt, t) => {
        T = t; bg(x, W, H, "#173a24", "#173a24");
        text(x, note, W / 2, 30, "#fff", 22);
        text(x, "Red flag is at the top. Yours is at the bottom.", W / 2, 54, "#a9d8b8", 14);
        for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) { x.fillStyle = (r + q) % 2 ? "#4aa35c" : "#58b56a"; x.fillRect(q * CS, TOP + r * CS, CS, CS); }
        for (let i = 0; i < 81; i++) if (wall[i]) { const px = (i % 9) * CS, py = TOP + Math.floor(i / 9) * CS; x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(px + CS / 2 + 3, py + CS * .78, CS * .38, CS * .14, 0, 0, 7); x.fill(); disc(x, px + CS / 2, py + CS / 2, CS * .38, "#b9bfc9", "#6a7280"); x.fillStyle = "rgba(0,0,0,.15)"; x.beginPath(); x.arc(px + CS * .6, py + CS * .55, CS * .1, 0, 7); x.fill(); }
        for (const [h, col, side] of [[PH, "#4cc3ff", 1], [AH, "#ff6f8a", 2]]) {
          x.fillStyle = "rgba(255,255,255,.18)"; x.beginPath(); x.arc((h.x + .5) * CS, TOP + (h.y + .5) * CS, CS * .42, 0, 7); x.fill();
          if (homeFlagVisible(side)) { const px = (h.x + .5) * CS, py = TOP + (h.y + .5) * CS; x.fillStyle = "#fff"; x.fillRect(px - 2, py - 22, 3, 40); x.fillStyle = col; x.beginPath(); x.moveTo(px + 1, py - 22); x.lineTo(px + 24, py - 14 + Math.sin(t * 6) * 2); x.lineTo(px + 1, py - 6); x.fill(); }
        }
        if (turn === 1 && !busy && !over) {
          if (reachSel) reachSel.forEach((dd, ni) => { const px = (ni % 9 + .5) * CS, py = TOP + (Math.floor(ni / 9) + .5) * CS, foe = unitAt(ni % 9, Math.floor(ni / 9)); if (foe) { x.strokeStyle = "#ff8a2a"; x.lineWidth = 4; x.beginPath(); x.arc(px, py, CS * .42, 0, 7); x.stroke(); } else { x.fillStyle = "rgba(255,255,255,.4)"; x.beginPath(); x.arc(px, py, 10 + Math.sin(t * 6) * 2, 0, 7); x.fill(); } });
          else units.forEach(u => { if (u.side === 1) { x.strokeStyle = "rgba(255,255,255," + (.25 + .2 * Math.sin(t * 5)) + ")"; x.lineWidth = 3; x.beginPath(); x.arc(u.px, u.py, CS * .42, 0, 7); x.stroke(); } });
        }
        for (const u of units.slice().sort((a, z) => a.py - z.py)) {
          const tx = (u.x + .5) * CS, ty = TOP + (u.y + .5) * CS; u.px += (tx - u.px) * Math.min(1, dt * 10); u.py += (ty - u.py) * Math.min(1, dt * 10);
          const sq = 1 + .07 * Math.sin(t * 6 + u.id * 2 + u.side), r = CS * .33;
          x.fillStyle = "rgba(0,0,0,.25)"; x.beginPath(); x.ellipse(u.px, u.py + r * .9, r, r * .35, 0, 0, 7); x.fill();
          if (sel === u) { x.strokeStyle = "#fff"; x.lineWidth = 4; x.beginPath(); x.arc(u.px, u.py, r + 8, 0, 7); x.stroke(); }
          x.save(); x.translate(u.px, u.py); x.scale(sq, 1 / sq);
          disc(x, 0, 0, r, u.side === 1 ? "#a8e4ff" : "#ffb0c0", u.side === 1 ? "#1a86d6" : "#d1264a");
          x.restore();
          x.fillStyle = "#fff"; x.beginPath(); x.arc(u.px - 8, u.py - 4, 6, 0, 7); x.arc(u.px + 8, u.py - 4, 6, 0, 7); x.fill();
          x.fillStyle = "#222"; x.beginPath(); x.arc(u.px - 7, u.py - 3, 3, 0, 7); x.arc(u.px + 9, u.py - 3, 3, 0, 7); x.fill();
          if (u.flag) { x.fillStyle = "#fff"; x.fillRect(u.px - 1, u.py - r - 22, 3, 22); x.fillStyle = u.side === 1 ? "#ff6f8a" : "#4cc3ff"; x.beginPath(); x.moveTo(u.px + 2, u.py - r - 22); x.lineTo(u.px + 22, u.py - r - 15); x.lineTo(u.px + 2, u.py - r - 8); x.fill(); }
        }
        fx.draw(x, dt);
      });
    }
  });

  // =====================================================================
  // 12. Rock Paper Scissors tournament
  // =====================================================================
  B.add({
    id: "s6-rpsarena", name: "Rock Paper Scissors Arena", ages: [5, 20], cat: "Strategy", color: "#ffb347", icon: "RPS",
    desc: "A 3-match tournament against a bot that learns your habits.", controls: "Tap rock, paper or scissors (or press 1, 2, 3). First to 3 wins a match. Beat all 3 bots!",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 420), fx = fxMake();
      const NAMES = ["Bouncy Bot", "Clever Bot", "Master Bot"], PROB = [[.2, .4, .6], [.35, .55, .75], [.5, .7, .9]][g.diff], TARGET = 3;
      const MV = ["Rock", "Paper", "Scissors"];
      let phase = "choose", t0 = 0, mine = -1, bot = -1, pw = 0, bw = 0, match = 0, hist = [], res = [], T = 0, note = "Pick rock, paper or scissors!", guessed = 0, rounds = 0, outcome = 0, hov = -1;
      const tabs = [{}, {}, {}], freq = [0, 0, 0];
      const keys = () => { const n = hist.length; return [n >= 2 ? hist[n - 2] + "," + hist[n - 1] : null, n >= 1 ? "" + hist[n - 1] : null, n >= 1 ? hist[n - 1] + "r" + res[n - 1] : null]; };
      const predict = () => {
        const sc = [0, 0, 0], ks = keys(), wt = [3, 2, 2];
        ks.forEach((k, i) => { if (k !== null && tabs[i][k]) for (let m = 0; m < 3; m++) sc[m] += tabs[i][k][m] * wt[i]; });
        for (let m = 0; m < 3; m++) sc[m] += freq[m] * .5;
        const mx = Math.max(...sc); if (mx <= 0) return -1; return pickOf([0, 1, 2].filter(m => sc[m] === mx));
      };
      const learn = m => { keys().forEach((k, i) => { if (k === null) return; if (!tabs[i][k]) tabs[i][k] = [0, 0, 0]; tabs[i][k][m]++; }); freq[m]++; };
      const botPick = () => { if (Math.random() < PROB[match]) { const p = predict(); if (p >= 0) return (p + 1) % 3; } return g.ri(0, 2); };
      function choose(m) {
        if (phase !== "choose") return; mine = m; bot = botPick();
        const pred = predict(); if (pred === m) guessed++; rounds++;
        learn(m); phase = "shake"; t0 = 0; g.sfx("tick"); note = "";
      }
      function reveal() {
        phase = "reveal"; t0 = 0; outcome = mine === bot ? 0 : ((mine - bot + 3) % 3 === 1 ? 1 : 2); hist.push(mine); res.push(outcome);
        if (outcome === 1) { pw++; g.add(1); g.sfx("right"); note = MV[mine] + " beats " + MV[bot] + "! You score"; fx.burst(170, 190, "#ffd34e", 18); }
        else if (outcome === 2) { bw++; g.sfx("wrong"); note = MV[bot] + " beats " + MV[mine] + ". Bot scores"; fx.burst(470, 190, "#8fd0ff", 18); }
        else { g.sfx("hint"); note = "Both chose " + MV[mine] + ": a tie"; }
      }
      function afterReveal() {
        if (pw >= TARGET) {
          g.add(5); match++; g.sfx("cheer");
          if (match >= 3) { g.timeout(() => g.win("You beat all three bots!"), 300); phase = "done"; return; }
          pw = 0; bw = 0; note = "You beat " + NAMES[match - 1] + "! Next: " + NAMES[match];
        } else if (bw >= TARGET) { phase = "done"; g.over("Beaten by " + NAMES[match] + " in match " + (match + 1)); return; }
        else note = "Pick again!";
        phase = "choose";
      }
      g.on(c, "pointermove", e => { hov = btnAt(pos(e)); });
      const btnAt = p => { for (let i = 0; i < 3; i++) if (Math.hypot(p.x - (160 + i * 160), p.y - 350) < 60) return i; return -1; };
      g.on(c, "pointerdown", e => { const i = btnAt(pos(e)); if (i >= 0) choose(i); });
      g.on(window, "keydown", e => { const k = { "1": 0, "2": 1, "3": 2, r: 0, p: 1, s: 2 }[e.key]; if (k !== undefined) choose(k); });
      const hand = (kind, cx, cy, s, col) => {
        x.fillStyle = col; x.strokeStyle = "rgba(0,0,0,.45)"; x.lineWidth = 3;
        const rr = (a, b, w, h, r) => { x.beginPath(); x.roundRect(a, b, w, h, r); x.fill(); x.stroke(); };
        if (kind === 0) { rr(cx - s * .42, cy - s * .3, s * .84, s * .66, s * .2); for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(cx - s * .3 + k * s * .2, cy - s * .3, s * .11, 0, 7); x.fill(); x.stroke(); } rr(cx - s * .58, cy - s * .05, s * .22, s * .34, s * .1); }
        else if (kind === 1) { rr(cx - s * .36, cy - s * .05, s * .72, s * .5, s * .12); for (let k = 0; k < 4; k++) rr(cx - s * .36 + k * s * .19, cy - s * .5 - (k === 1 || k === 2 ? s * .08 : 0), s * .15, s * .5, s * .07); rr(cx - s * .6, cy + s * .05, s * .26, s * .15, s * .07); }
        else { for (const sg of [-1, 1]) { x.save(); x.translate(cx, cy + s * .2); x.rotate(sg * .35); x.beginPath(); x.roundRect(-s * .07, -s * .72, s * .14, s * .75, s * .07); x.fill(); x.stroke(); x.restore(); } rr(cx - s * .3, cy + s * .1, s * .6, s * .34, s * .1); }
      };
      g.loop((dt, t) => {
        T = t; t0 += dt;
        if (phase === "shake" && t0 >= 1.2) reveal();
        else if (phase === "reveal" && t0 >= 1.3) afterReveal();
        g.status("Match " + Math.min(match + 1, 3) + "/3");
        bg(x, W, H, "#4a1f6b", "#8a3fa0");
        text(x, "Match " + Math.min(match + 1, 3) + ": You vs " + NAMES[Math.min(match, 2)], W / 2, 28, "#fff", 22);
        text(x, pw + "  -  " + bw, W / 2, 62, "#ffe58a", 30);
        for (let i = 0; i < TARGET; i++) { x.fillStyle = i < pw ? "#ffd34e" : "rgba(255,255,255,.2)"; x.beginPath(); x.arc(70 + i * 28, 62, 10, 0, 7); x.fill(); x.fillStyle = i < bw ? "#8fd0ff" : "rgba(255,255,255,.2)"; x.beginPath(); x.arc(W - 70 - i * 28, 62, 10, 0, 7); x.fill(); }
        let ym = 0, kp = mine, kb = bot;
        if (phase === "choose") { kp = 0; kb = 0; }
        else if (phase === "shake") { ym = -Math.abs(Math.sin(t0 / 1.2 * Math.PI * 3)) * 34; kp = 0; kb = 0; }
        else if (phase === "done") { }
        if (kp < 0) kp = 0; if (kb < 0) kb = 0;
        const pulse = phase === "reveal" ? 1 + .08 * Math.sin(t0 * 12) : 1;
        hand(kp, 170, 195 + ym, 130 * (phase === "reveal" && outcome === 1 ? pulse : 1), "#ffd34e");
        hand(kb, 470, 195 + ym, 130 * (phase === "reveal" && outcome === 2 ? pulse : 1), "#8fd0ff");
        text(x, "YOU", 170, 118, "#fff", 16); text(x, "BOT", 470, 118, "#fff", 16);
        if (phase === "shake") text(x, t0 < .4 ? "Rock..." : t0 < .8 ? "Paper..." : "Scissors...", W / 2, 195, "#fff", 28);
        else text(x, note, W / 2, 262, "#fff", 20);
        for (let i = 0; i < 3; i++) {
          const bx = 160 + i * 160, on = phase === "choose" && hov === i;
          x.fillStyle = on ? "#fff" : "rgba(255,255,255,.85)"; x.beginPath(); x.arc(bx, 350, on ? 62 : 58, 0, 7); x.fill();
          hand(i, bx, 352, 66, "#ffd34e"); text(x, (i + 1) + " " + MV[i], bx, 412, "#fff", 13);
        }
        text(x, "The bot guessed your move " + guessed + " of " + rounds + " times", W / 2, 292, "#e6c8ff", 14);
        fx.draw(x, dt);
      });
    }
  });
})();
