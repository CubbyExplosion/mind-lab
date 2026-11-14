// Break Time Games: set 13 (music, sound and animation makers)
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---------- tiny shared sound engine (one lazy AudioContext for the whole page) ----------
  const AC = { ctx: null, master: null, an: null };
  const actx = () => {
    if (!AC.ctx) {
      try {
        const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
        AC.ctx = new C(); AC.master = AC.ctx.createGain(); AC.master.gain.value = .7;
        AC.an = AC.ctx.createAnalyser(); AC.an.fftSize = 512;
        AC.master.connect(AC.an); AC.an.connect(AC.ctx.destination);
        window.addEventListener("pagehide", () => { try { AC.ctx && AC.ctx.close(); } catch (e) {} AC.ctx = null; });
      } catch (e) { AC.ctx = null; return null; }
    }
    try { if (AC.ctx.state === "suspended") AC.ctx.resume(); } catch (e) {}
    return AC.ctx;
  };
  const tone = (f, type, dur, vol, f2) => {
    const c = actx(); if (!c) return;
    try {
      const t = c.currentTime, o = c.createOscillator(), v = c.createGain();
      o.type = type || "sine"; o.frequency.setValueAtTime(f, t);
      if (f2) o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), t + dur);
      v.gain.setValueAtTime(.0001, t); v.gain.exponentialRampToValueAtTime(vol || .3, t + .01); v.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(v); v.connect(AC.master); o.start(t); o.stop(t + dur + .05);
    } catch (e) {}
  };
  const noise = (dur, vol, freq, kind) => {
    const c = actx(); if (!c) return;
    try {
      const n = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      const s = c.createBufferSource(), f = c.createBiquadFilter(), v = c.createGain(), t = c.currentTime;
      s.buffer = b; f.type = kind || "highpass"; f.frequency.value = freq || 5000;
      v.gain.setValueAtTime(vol || .3, t); v.gain.exponentialRampToValueAtTime(.0001, t + dur);
      s.connect(f); f.connect(v); v.connect(AC.master); s.start(t);
    } catch (e) {}
  };
  const drum = k => {
    if (k === "kick") tone(150, "sine", .25, .9, 40);
    else if (k === "snare") { noise(.18, .45, 1500); tone(200, "triangle", .1, .3, 120); }
    else if (k === "hat") noise(.05, .22, 7000);
    else if (k === "clap") noise(.12, .5, 1200, "bandpass");
    else if (k === "tom") tone(200, "sine", .25, .6, 90);
    else if (k === "cow") { tone(560, "square", .12, .1); tone(840, "square", .12, .08); }
    else tone(800, "square", .04, .12);
  };
  const mf = m => 440 * Math.pow(2, (m - 69) / 12);
  const NN = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const nname = m => NN[m % 12] + (Math.floor(m / 12) - 1);
  const snd = s => { if (s[0] === "noise") noise(s[3], s[4], s[1], "highpass"); else tone(s[1], s[0], s[3], s[4], s[2] === s[1] ? 0 : s[2]); };

  // ---------- tiny shared UI helpers ----------
  const TBCSS = "display:flex;flex-wrap:wrap;gap:6px;padding:6px 8px;justify-content:center;align-items:center";
  const act = (b, on) => { b.style.outline = on ? "3px solid #fff" : "none"; b.style.filter = on ? "brightness(1.3)" : ""; };
  const bar = (g, items) => {
    const d = g.html(""), btns = {}; d.style.cssText = TBCSS;
    items.forEach(it => {
      const b = document.createElement("button"); b.type = "button"; b.className = "bg-btn"; b.textContent = it[0]; b.style.minHeight = "40px"; d.appendChild(b);
      g.on(b, "click", () => it[1](b)); if (it[2]) btns[it[2]] = b;
    });
    return { el: d, b: btns };
  };
  const opts = (g, labels, init, fn) => {
    const d = g.html(""); d.style.cssText = TBCSS;
    const bs = labels.map((l, i) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "bg-btn"; b.textContent = l; b.style.minHeight = "40px"; d.appendChild(b);
      g.on(b, "click", () => { set(i); fn(i); }); return b;
    });
    const set = i => bs.forEach((b, j) => act(b, i === j));
    set(init); return { el: d, set, bs };
  };
  const swatches = (g, cols, init, fn) => {
    const d = g.html(""); d.style.cssText = TBCSS;
    const bs = cols.map((c, i) => {
      const b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "colour " + (i + 1));
      b.style.cssText = "width:38px;height:38px;border-radius:50%;border:3px solid rgba(255,255,255,.25);cursor:pointer;background:" + c;
      d.appendChild(b); g.on(b, "click", () => { sel(i); fn(c, i); }); return b;
    });
    const sel = i => bs.forEach((b, j) => { b.style.borderColor = j === i ? "#fff" : "rgba(255,255,255,.25)"; b.style.transform = j === i ? "scale(1.15)" : ""; });
    sel(init); return { el: d, sel };
  };
  const mkLabel = (g, text) => { const d = g.html(""); d.style.cssText = "text-align:center;font:bold 13px system-ui,sans-serif;opacity:.8;padding:2px 8px"; d.textContent = text; return d; };

  // ---------- step grid used by the Beat Maker and the Melody Roll ----------
  function stepGrid(g, o) {
    const rows = o.rows, cols = o.cols, cv = g.canvas(640, 400), c = cv.c, x = cv.x, W = cv.W, H = cv.H, pos = cv.pos;
    const L = o.left || 84, T = 10, cw = (W - L - 10) / cols, ch = (H - T - 10) / rows;
    let grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    const sv = g.load();
    if (sv && sv.r === rows && sv.c === cols && Array.isArray(sv.grid) && sv.grid.length === rows && sv.grid.every(a => Array.isArray(a) && a.length === cols)) grid = sv.grid.map(a => a.map(v => v ? 1 : 0));
    let playing = false, step = -1, acc = 0, bpm = (sv && typeof sv.bpm === "number" && sv.bpm >= 50 && sv.bpm <= 200) ? sv.bpm : o.bpm, painting = -1;
    const hit = new Array(rows * cols).fill(0);
    const sd = () => 60 / bpm / (cols / 4);
    const persist = () => g.save({ r: rows, c: cols, grid, bpm });
    const cellAt = e => { const p = pos(e), cc = Math.floor((p.x - L) / cw), rr = Math.floor((p.y - T) / ch); return (cc < 0 || rr < 0 || cc >= cols || rr >= rows) ? null : { r: rr, c: cc }; };
    const set = (r, cc, v) => { if (grid[r][cc] === v) return; grid[r][cc] = v; if (v) { g.add(1); o.preview(r); hit[r * cols + cc] = 1; } persist(); };
    g.on(c, "pointerdown", e => { const k = cellAt(e); if (!k) return; painting = grid[k.r][k.c] ? 0 : 1; set(k.r, k.c, painting); });
    g.on(c, "pointermove", e => { if (painting < 0) return; const k = cellAt(e); if (k) set(k.r, k.c, painting); });
    g.on(window, "pointerup", () => { painting = -1; });
    g.on(window, "pointercancel", () => { painting = -1; });
    if (o.pre) o.pre(g);
    g.status("Tempo " + bpm);
    const tb = bar(g, [
      ["Play", () => toggle(), "play"],
      ["Slower", () => { bpm = g.clamp(bpm - 10, 50, 200); g.status("Tempo " + bpm); persist(); }],
      ["Faster", () => { bpm = g.clamp(bpm + 10, 50, 200); g.status("Tempo " + bpm); persist(); }],
      ["Clear", () => { grid.forEach(a => a.fill(0)); persist(); g.sfx("back"); }],
      ["Surprise me", () => { grid.forEach(a => a.fill(0)); o.surprise(grid, rows, cols); persist(); g.add(1); g.sfx("cheer"); }]
    ].concat(o.extra || []).concat([["Finish", () => g.over("Nice work!")]]));
    const toggle = () => {
      playing = !playing; tb.b.play.textContent = playing ? "Stop" : "Play"; act(tb.b.play, playing);
      step = -1; acc = playing ? sd() : 0; if (playing) actx();
    };
    g.on(window, "keydown", e => { if (e.key === " " && !e.repeat) toggle(); });
    g.loop((dt, t) => {
      if (playing) {
        acc += dt; let n = 0;
        while (acc >= sd() && n++ < 4) {
          acc -= sd(); step = (step + 1) % cols; const on = [];
          for (let r = 0; r < rows; r++) if (grid[r][step]) { on.push(r); hit[r * cols + step] = 1; }
          o.onStep(on, step, sd());
        }
      }
      for (let i = 0; i < hit.length; i++) if (hit[i] > 0) hit[i] = Math.max(0, hit[i] - dt * 4);
      x.clearRect(0, 0, W, H); o.bg(x, W, H);
      for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) o.cell(x, r, cc, L + cc * cw, T + r * ch, cw, ch, grid[r][cc], hit[r * cols + cc], t);
      for (let r = 0; r < rows; r++) o.label(x, r, L, T + r * ch, ch);
      if (playing && step >= 0) { x.fillStyle = "rgba(255,255,255,.14)"; x.fillRect(L + step * cw, T, cw, rows * ch); }
    });
  }

  // ================= 1. Beat Maker =================
  const DR = [["Kick", "kick", "#ff5d73"], ["Snare", "snare", "#ffb347"], ["Hat", "hat", "#ffe66d"], ["Clap", "clap", "#6be28f"], ["Tom", "tom", "#4cc3ff"], ["Cowbell", "cow", "#b48cff"], ["Rim", "rim", "#ff8fd8"]];
  B.add({
    id: "s13-beatmaker", name: "Beat Maker", ages: [5, 20], cat: "Music", color: "#ff5d73", icon: "B",
    desc: "Tap the squares to build a drum beat, then press Play.", controls: "Tap or drag on the squares to turn drums on. Press Play (or Space).",
    start(g) {
      const rows = g.by(3, 5, 7), cols = g.by(8, 16, 16);
      stepGrid(g, {
        rows, cols, bpm: g.by(90, 105, 120),
        preview: r => drum(DR[r][1]),
        onStep: on => on.forEach(r => drum(DR[r][1])),
        bg(x, W, H) { const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#1b1440"); gr.addColorStop(1, "#2d1b5e"); x.fillStyle = gr; x.fillRect(0, 0, W, H); },
        label(x, r, lx, y, h) { x.fillStyle = DR[r][2]; x.font = "bold 15px system-ui, sans-serif"; x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(DR[r][0], 8, y + h / 2); },
        cell(x, r, cc, px, py, w, h, on, hot, t) {
          const k = on ? hot * 4 + Math.sin(t * 4 + cc) * .8 : 0;
          x.fillStyle = on ? DR[r][2] : (cc % 4 === 0 ? "#363c78" : "#272d62");
          x.beginPath(); x.roundRect(px + 3 - k, py + 3 - k, w - 6 + 2 * k, h - 6 + 2 * k, 9); x.fill();
          if (on) { x.fillStyle = "rgba(255,255,255,.3)"; x.beginPath(); x.roundRect(px + 6, py + 6, w - 12, (h - 12) * .35, 6); x.fill(); }
        },
        surprise(grid, rr, cc) {
          for (let r = 0; r < rr; r++) for (let c = 0; c < cc; c++) {
            const p = r === 0 ? (c % (cc / 4) === 0 ? .95 : .08) : r === 1 ? (c % (cc / 2) === cc / 4 ? .95 : .06) : r === 2 ? (c % 2 === 0 ? .8 : .2) : .12;
            grid[r][c] = Math.random() < p ? 1 : 0;
          }
        }
      });
    }
  });

  // ================= 2. Melody Roll =================
  B.add({
    id: "s13-melodyroll", name: "Melody Roll", ages: [6, 20], cat: "Music", color: "#4cc3ff", icon: "M",
    desc: "Compose a melody on a piano roll and hear it loop.", controls: "Tap or drag on the grid to place notes. Press Play (or Space).",
    start(g) {
      const SC = g.by([72, 69, 67, 64, 60], [72, 71, 69, 67, 65, 64, 62, 60], [72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60]);
      const WV = g.by(["sine", "square", "triangle"], ["sine", "square", "sawtooth", "triangle"], ["sine", "square", "sawtooth", "triangle"]);
      const WL = g.by(["Soft", "Buzzy", "Smooth"], ["Sine", "Square", "Saw", "Triangle"], ["Sine", "Square", "Saw", "Triangle"]);
      let wave = "sine", echo = false;
      const note = (m, v) => { const w = wave; tone(mf(m), w, .35, (w === "sine" || w === "triangle" ? .26 : .1) * (v || 1)); };
      stepGrid(g, {
        rows: SC.length, cols: g.by(8, 16, 16), bpm: g.by(90, 110, 125),
        pre: gg => { opts(gg, WL, 0, i => { wave = WV[i]; note(SC[SC.length >> 1]); }); },
        extra: g.diff === 2 ? [["Echo: off", b => { echo = !echo; b.textContent = echo ? "Echo: on" : "Echo: off"; act(b, echo); }]] : [],
        preview: r => note(SC[r]),
        onStep(on, s, d) { on.forEach(r => { note(SC[r]); if (echo) g.timeout(() => note(SC[r], .4), d * 1000 * 2); }); },
        bg(x, W, H) { x.fillStyle = "#10132e"; x.fillRect(0, 0, W, H); },
        label(x, r, lx, y, h) {
          const m = SC[r], blk = [1, 3, 6, 8, 10].includes(m % 12);
          x.fillStyle = blk ? "#222" : "#f2f2f2"; x.beginPath(); x.roundRect(0, y + 1, lx - 6, h - 2, 5); x.fill();
          x.fillStyle = blk ? "#eee" : "#333"; x.font = "bold 13px system-ui, sans-serif"; x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(nname(m), 8, y + h / 2);
        },
        cell(x, r, cc, px, py, w, h, on, hot) {
          const m = SC[r], blk = [1, 3, 6, 8, 10].includes(m % 12);
          x.fillStyle = blk ? "#161a3a" : "#20264f"; x.fillRect(px, py, w, h);
          x.fillStyle = cc % 4 === 0 ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.05)"; x.fillRect(px, py, 2, h);
          x.fillStyle = "rgba(255,255,255,.06)"; x.fillRect(px, py + h - 1, w, 1);
          if (on) { x.fillStyle = "hsl(" + Math.round(r * 300 / SC.length) + ",85%," + Math.round(58 + hot * 20) + "%)"; x.beginPath(); x.roundRect(px + 2, py + 3, w - 4, h - 6, 6); x.fill(); }
        },
        surprise(grid, rr, cc) {
          let r = rr >> 1;
          for (let c = 0; c < cc; c++) if (Math.random() < .7) { r = g.clamp(r + g.ri(-2, 2), 0, rr - 1); grid[r][c] = 1; }
        }
      });
    }
  });

  // ================= 3. Wave Keys (synth keyboard) =================
  B.add({
    id: "s13-synthkeys", name: "Wave Keys", ages: [5, 20], cat: "Music", color: "#b48cff", icon: "K",
    desc: "A playable synth. Change the wave shape and watch it wiggle.", controls: "Tap or slide across the keys, or use A S D F G H J K on the keyboard",
    start(g) {
      const nW = g.by(8, 10, 15), { c, x, W, H, pos } = g.canvas(640, 400), KY = 190, WO = [0, 2, 4, 5, 7, 9, 11];
      const WK = "asdfghjkl;", BK = ["w", "e", null, "t", "y", "u", null, "o", "p", null];
      const WV = g.by(["sine", "square", "triangle"], ["sine", "square", "sawtooth", "triangle"], ["sine", "square", "sawtooth", "triangle"]);
      const WL = g.by(["Sine", "Square", "Triangle"], ["Sine", "Square", "Saw", "Triangle"], ["Sine", "Square", "Saw", "Triangle"]);
      let wave = "sine", oct = 0, vib = false, fat = false, keys = [];
      const buf = new Uint8Array(512), act2 = new Map();
      const build = () => {
        keys = []; const kw = W / nW;
        for (let i = 0; i < nW; i++) {
          keys.push({ m: 60 + oct * 12 + Math.floor(i / 7) * 12 + WO[i % 7], x: i * kw, y: KY, w: kw, h: H - KY - 4, black: false, ch: i < WK.length ? WK[i] : "" });
        }
        if (g.diff > 0) for (let i = 0; i < nW - 1; i++) if ([0, 1, 3, 4, 5].includes(i % 7)) keys.push({ m: 61 + oct * 12 + Math.floor(i / 7) * 12 + WO[i % 7], x: (i + 1) * kw - kw * .3, y: KY, w: kw * .6, h: (H - KY) * .6, black: true, ch: i < BK.length && BK[i] ? BK[i] : "" });
      };
      build();
      const keyAt = p => { for (let i = keys.length - 1; i >= 0; i--) { const k = keys[i]; if (k.black && p.x >= k.x && p.x <= k.x + k.w && p.y >= k.y && p.y <= k.y + k.h) return k; } for (const k of keys) if (!k.black && p.x >= k.x && p.x < k.x + k.w && p.y >= k.y) return k; return null; };
      const voice = m => {
        const cx = actx(); if (!cx) return null;
        try {
          const t = cx.currentTime, f = mf(m), v = cx.createGain(), os = [], vol = (wave === "sine" || wave === "triangle" ? .32 : .13) / (fat ? 2 : 1);
          const mk = det => { const o = cx.createOscillator(); o.type = wave; o.frequency.value = f; o.detune.value = det; o.connect(v); o.start(t); os.push(o); };
          mk(0); if (fat) { mk(9); mk(-9); }
          if (vib) { const l = cx.createOscillator(), lg = cx.createGain(); l.frequency.value = 6; lg.gain.value = 22; l.connect(lg); os.slice().forEach(o => lg.connect(o.detune)); l.start(t); os.push(l); }
          v.gain.setValueAtTime(0, t); v.gain.linearRampToValueAtTime(vol, t + .02); v.connect(AC.master);
          os.forEach(o => { try { o.stop(t + 12); } catch (e) {} });
          return () => { try { const t2 = cx.currentTime; v.gain.cancelScheduledValues(t2); v.gain.setValueAtTime(v.gain.value, t2); v.gain.linearRampToValueAtTime(0, t2 + .25); os.forEach(o => { try { o.stop(t2 + .3); } catch (e) {} }); } catch (e) {} };
        } catch (e) { return null; }
      };
      const release = id => { const a = act2.get(id); if (a) { if (a.stop) a.stop(); act2.delete(id); } };
      const press = (id, k) => { release(id); act2.set(id, { k, stop: voice(k.m) }); g.add(1); };
      const releaseAll = () => Array.from(act2.keys()).forEach(release);
      g.on(c, "pointerdown", e => { const k = keyAt(pos(e)); if (k) { press("p" + e.pointerId, k); try { (()=>{try{c.setPointerCapture(e.pointerId)}catch(_){}})(); } catch (x2) {} } });
      g.on(c, "pointermove", e => { const a = act2.get("p" + e.pointerId); if (!a) return; const k = keyAt(pos(e)); if (k && k !== a.k) press("p" + e.pointerId, k); });
      const up = e => release("p" + e.pointerId);
      g.on(window, "pointerup", up); g.on(window, "pointercancel", up); g.on(window, "blur", releaseAll);
      g.on(window, "keydown", e => { if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return; const ch = e.key.toLowerCase(), k = keys.find(q => q.ch && q.ch === ch); if (k) press("k" + ch, k); });
      g.on(window, "keyup", e => release("k" + e.key.toLowerCase()));
      opts(g, WL, 0, i => { wave = WV[i]; });
      const items = [];
      if (g.diff >= 1) items.push(["Vibrato: off", b => { vib = !vib; b.textContent = vib ? "Vibrato: on" : "Vibrato: off"; act(b, vib); }]);
      if (g.diff === 2) {
        items.push(["Fat sound: off", b => { fat = !fat; b.textContent = fat ? "Fat sound: on" : "Fat sound: off"; act(b, fat); }]);
        items.push(["Octave down", () => { if (oct > -1) { oct--; build(); } }]);
        items.push(["Octave up", () => { if (oct < 1) { oct++; build(); } }]);
      }
      items.push(["Finish", () => { releaseAll(); g.over("Nice work!"); }]);
      bar(g, items);
      g.loop((dt, t) => {
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#1a1040"); gr.addColorStop(1, "#3a1f6e"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        // scope
        x.fillStyle = "rgba(0,0,0,.35)"; x.beginPath(); x.roundRect(10, 10, W - 20, KY - 24, 12); x.fill();
        if (AC.an) { try { AC.an.getByteTimeDomainData(buf); } catch (e) { buf.fill(128); } } else buf.fill(128);
        x.strokeStyle = "hsl(" + (Math.floor(t * 40) % 360) + ",90%,65%)"; x.lineWidth = 3; x.lineJoin = "round"; x.beginPath();
        for (let i = 0; i < buf.length; i += 2) { const px = 14 + i / buf.length * (W - 28), py = 10 + (KY - 24) / 2 + (buf[i] - 128) / 128 * (KY - 40) / 2 * 1.6; if (i) x.lineTo(px, py); else x.moveTo(px, py); }
        x.stroke();
        x.fillStyle = "rgba(255,255,255,.7)"; x.font = "bold 14px system-ui, sans-serif"; x.textAlign = "left"; x.textBaseline = "top"; x.fillText("Wave: " + WL[WV.indexOf(wave)], 22, 18);
        const held = new Set(); act2.forEach(a => held.add(a.k.m));
        for (let pass = 0; pass < 2; pass++) for (const k of keys) {
          if (k.black !== (pass === 1)) continue;
          const on = held.has(k.m);
          x.fillStyle = on ? "hsl(" + (k.m * 31 % 360) + ",85%,65%)" : (k.black ? "#1d1d28" : "#fafafa");
          x.beginPath(); x.roundRect(k.x + 1, k.y + (on ? 3 : 0), k.w - 2, k.h - (on ? 3 : 0), [0, 0, 10, 10]); x.fill();
          x.strokeStyle = "#555"; x.lineWidth = 1.5; x.stroke();
          if (k.ch || !k.black) {
            x.fillStyle = k.black ? "#ccc" : "#444"; x.textAlign = "center"; x.textBaseline = "alphabetic";
            if (!k.black) { x.font = "bold 14px system-ui, sans-serif"; x.fillText(nname(k.m), k.x + k.w / 2, k.y + k.h - 30); }
            if (k.ch) { x.font = "12px system-ui, sans-serif"; x.fillStyle = k.black ? "#999" : "#888"; x.fillText(k.ch.toUpperCase(), k.x + k.w / 2, k.y + k.h - (k.black ? 10 : 10)); }
          }
        }
      });
    }
  });

  // ================= 4. Loop Station =================
  B.add({
    id: "s13-loopstation", name: "Loop Station", ages: [7, 20], cat: "Music", color: "#ffd34e", icon: "L",
    desc: "Record sounds on top of each other and build a looping song.", controls: "Pick a track, press Record, then tap the pads (keys 1 to 4)",
    start(g) {
      const nT = g.by(2, 3, 4), beats = g.by(4, 4, 8), bpm = g.by(80, 100, 110), L = beats * 60 / bpm, q = g.by(2, 4, 0);
      const { c, x, W, H } = g.canvas(640, 340);
      const PADS = [
        [["Kick", () => drum("kick")], ["Snare", () => drum("snare")], ["Hat", () => drum("hat")], ["Clap", () => drum("clap")]],
        [["Low C", () => tone(130.8, "triangle", .4, .5)], ["Low E", () => tone(164.8, "triangle", .4, .5)], ["Low G", () => tone(196, "triangle", .4, .5)], ["Low A", () => tone(220, "triangle", .4, .5)]],
        [["C", () => tone(261.6, "triangle", .5, .25)], ["E", () => tone(329.6, "triangle", .5, .25)], ["G", () => tone(392, "triangle", .5, .25)], ["High C", () => tone(523.3, "triangle", .5, .25)]],
        [["Zap", () => tone(900, "square", .2, .1, 200)], ["Rise", () => tone(300, "square", .25, .1, 1200)], ["Beep", () => tone(1200, "sawtooth", .15, .08, 600)], ["Shh", () => noise(.25, .3, 2000, "bandpass")]]
      ];
      const TC = ["#ff5d73", "#4cc3ff", "#ffd34e", "#b48cff"], TN = ["Drums", "Bass", "Keys", "Zap"];
      const tr = Array.from({ length: nT }, () => ({ ev: [], mute: false }));
      const sv = g.load();
      if (sv && sv.d === g.diff && Array.isArray(sv.tr) && sv.tr.length === nT) sv.tr.forEach((s, i) => { if (s && Array.isArray(s.ev)) { tr[i].ev = s.ev.filter(e => e && typeof e.t === "number" && e.t >= 0 && e.t < L && e.p >= 0 && e.p < 4).slice(0, 80).map(e => ({ t: e.t, p: e.p | 0 })); tr[i].mute = !!s.mute; } });
      const persist = () => g.save({ d: g.diff, tr });
      let sel = 0, rec = false, pos = -.001, lastBeat = -1;
      const flash = Array(nT).fill(0), bd = 60 / bpm;
      mkLabel(g, "Loop: " + beats + " beats. Each track is a circle ring.");
      const trk = opts(g, TN.slice(0, nT), 0, i => { sel = i; refresh(); });
      const padRow = g.html(""); padRow.style.cssText = TBCSS;
      const pads = [0, 1, 2, 3].map(i => {
        const b = document.createElement("button"); b.type = "button";
        b.style.cssText = "flex:1 1 70px;max-width:150px;height:76px;font:bold 17px system-ui,sans-serif;border-radius:16px;color:#111;border:0;cursor:pointer;touch-action:manipulation";
        padRow.appendChild(b); g.on(b, "pointerdown", e => { e.preventDefault(); press(i); }); return b;
      });
      const refresh = () => { pads.forEach((b, i) => { b.textContent = PADS[sel][i][0]; b.style.background = TC[sel]; }); if (ctl && ctl.b.mute) act(ctl.b.mute, tr[sel].mute); };
      const press = i => {
        PADS[sel][i][1](); flash[sel] = 1;
        if (rec) {
          let t = Math.max(0, pos);
          if (q) { const gr = L / (beats * q); t = Math.round(t / gr) * gr; if (t >= L) t = 0; }
          tr[sel].ev.push({ t, p: i }); if (tr[sel].ev.length > 80) tr[sel].ev.shift(); g.add(1); persist();
        }
      };
      const ctl = bar(g, [
        ["Record", b => { rec = !rec; b.textContent = rec ? "Recording..." : "Record"; b.style.background = rec ? "#e63946" : ""; act(b, rec); actx(); }, "rec"],
        ["Undo", () => { tr[sel].ev.pop(); persist(); g.sfx("back"); }],
        ["Mute", () => { tr[sel].mute = !tr[sel].mute; act(ctl.b.mute, tr[sel].mute); persist(); }, "mute"],
        ["Clear track", () => { tr[sel].ev.length = 0; persist(); g.sfx("back"); }],
        ["Clear all", () => { tr.forEach(t => { t.ev.length = 0; }); persist(); g.sfx("back"); }],
        ["Finish", () => g.over("Nice work!")]
      ]);
      refresh();
      g.on(window, "keydown", e => { if (e.repeat) return; if (e.key >= "1" && e.key <= "4") press(+e.key - 1); else if (e.key === "r" || e.key === "R") ctl.b.rec.click(); });
      g.loop((dt, t) => {
        const prev = pos; pos += dt; let wrapped = false; if (pos >= L) { pos -= L; wrapped = true; }
        for (let i = 0; i < nT; i++) { if (tr[i].mute) continue; for (const ev of tr[i].ev) { const h = wrapped ? (ev.t > prev || ev.t <= pos) : (ev.t > prev && ev.t <= pos); if (h) { PADS[i][ev.p][1](); flash[i] = 1; } } flash[i] = Math.max(0, flash[i] - dt * 3); }
        const bi = Math.floor(Math.max(0, pos) / bd); if (bi !== lastBeat) { lastBeat = bi; if (rec) tone(bi === 0 ? 1400 : 1000, "sine", .03, .07); }
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#241a4d"); gr.addColorStop(1, "#14102e"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        const cx = W / 2, cy = H / 2, R0 = 52, gap = Math.min(38, (H / 2 - 30 - R0) / nT);
        for (let b = 0; b < beats; b++) { const a = b / beats * 6.283 - 1.5708; x.fillStyle = "rgba(255,255,255,.35)"; x.beginPath(); x.arc(cx + Math.cos(a) * (R0 + nT * gap + 6), cy + Math.sin(a) * (R0 + nT * gap + 6), 3, 0, 7); x.fill(); }
        for (let i = 0; i < nT; i++) {
          const r = R0 + i * gap; x.globalAlpha = tr[i].mute ? .25 : 1;
          x.strokeStyle = TC[i]; x.lineWidth = i === sel ? 7 : 3; x.globalAlpha *= i === sel ? .5 : .3; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke(); x.globalAlpha = tr[i].mute ? .3 : 1;
          x.fillStyle = TC[i];
          for (const ev of tr[i].ev) { const a = ev.t / L * 6.283 - 1.5708; x.beginPath(); x.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 6 + flash[i] * 3, 0, 7); x.fill(); }
          x.globalAlpha = 1;
        }
        const pa = pos / L * 6.283 - 1.5708; x.strokeStyle = "rgba(255,255,255,.85)"; x.lineWidth = 3; x.lineCap = "round"; x.beginPath(); x.moveTo(cx + Math.cos(pa) * (R0 - 10), cy + Math.sin(pa) * (R0 - 10)); x.lineTo(cx + Math.cos(pa) * (R0 + nT * gap), cy + Math.sin(pa) * (R0 + nT * gap)); x.stroke();
        x.textAlign = "center"; x.textBaseline = "middle"; x.font = "bold 18px system-ui, sans-serif";
        if (rec) { x.fillStyle = "rgba(255,70,80," + (.6 + .4 * Math.sin(t * 8)) + ")"; x.fillText("REC", cx, cy); } else { x.fillStyle = "rgba(255,255,255,.7)"; x.fillText("LOOP", cx, cy); }
        x.fillStyle = TC[sel]; x.font = "bold 16px system-ui, sans-serif"; x.textAlign = "left"; x.fillText("Track: " + TN[sel] + (tr[sel].mute ? " (muted)" : ""), 14, 20);
      });
    }
  });

  // ================= 5. Flipbook Studio =================
  B.add({
    id: "s13-flipbook", name: "Flipbook Studio", ages: [5, 20], cat: "Creative", color: "#6be28f", icon: "F",
    desc: "Draw frame by frame, then press Play to see it move!", controls: "Draw with your finger or mouse. Next frame, draw again, then Play.",
    start(g) {
      const N = g.by(8, 10, 12), { c, x, W, H, pos } = g.canvas(480, 360), PAPER = "#fffdf5";
      const COLS = ["#222222", "#e63946", "#ffd23f", "#2dc653", "#2a9df4", "#ff9f1c", "#7b2cbf", "#ff6fb5", "#8b5a2b"].slice(0, g.by(5, 8, 9));
      if (g.diff === 2) COLS.push(PAPER);
      const SZ = g.by([12], [5, 12], [3, 8, 16]);
      let frames = Array.from({ length: N }, () => []), cur = 0, col = COLS[0], size = SZ[SZ.length > 1 ? 1 : 0], playing = false, pt = 0, fps = g.by(5, 8, 10), onion = true, stroke = null, shownKey = "";
      const sv = g.load();
      if (sv && sv.n === N && Array.isArray(sv.f) && sv.f.length === N) frames = sv.f.map(fr => (Array.isArray(fr) ? fr : []).filter(s => s && Array.isArray(s.p) && s.p.length >= 2 && typeof s.c === "string" && s.w > 0).slice(0, 300));
      const persist = () => g.save({ n: N, f: frames });
      const lastUsed = () => { for (let i = N - 1; i >= 0; i--) if (frames[i].length) return i; return -1; };
      const draw = (list, a) => {
        x.globalAlpha = a; x.lineCap = "round"; x.lineJoin = "round";
        list.forEach(s => {
          x.strokeStyle = s.c; x.fillStyle = s.c; x.lineWidth = s.w;
          if (s.p.length < 4) { x.beginPath(); x.arc(s.p[0], s.p[1], s.w / 2, 0, 7); x.fill(); }
          else { x.beginPath(); x.moveTo(s.p[0], s.p[1]); for (let i = 2; i < s.p.length; i += 2) x.lineTo(s.p[i], s.p[i + 1]); x.stroke(); }
        });
        x.globalAlpha = 1;
      };
      const render = (ghostOff, idx) => {
        x.fillStyle = PAPER; x.fillRect(0, 0, W, H);
        x.strokeStyle = "rgba(60,120,200,.08)"; x.lineWidth = 1; x.beginPath(); for (let i = 30; i < H; i += 30) { x.moveTo(0, i); x.lineTo(W, i); } x.stroke();
        if (!ghostOff && onion && !playing && cur > 0) draw(frames[cur - 1], .22);
        draw(frames[idx], 1);
      };
      g.on(c, "pointerdown", e => {
        if (playing) return; const p = pos(e); stroke = { c: col, w: size, p: [Math.round(p.x), Math.round(p.y)] }; frames[cur].push(stroke);
        tone(220 + (1 - p.y / H) * 600, "triangle", .08, .1); try { (()=>{try{c.setPointerCapture(e.pointerId)}catch(_){}})(); } catch (x2) {}
      });
      g.on(c, "pointermove", e => { if (!stroke) return; const p = pos(e), n = stroke.p.length, dx = p.x - stroke.p[n - 2], dy = p.y - stroke.p[n - 1]; if (dx * dx + dy * dy > 4 && n < 1200) stroke.p.push(Math.round(p.x), Math.round(p.y)); });
      const end = () => { if (stroke) { stroke = null; g.add(1); persist(); shownKey = ""; } };
      g.on(window, "pointerup", end); g.on(window, "pointercancel", end);
      const swc = swatches(g, COLS, 0, cc => { col = cc; });
      const szo = SZ.length > 1 ? opts(g, SZ.length === 2 ? ["Thin", "Thick"] : ["Thin", "Medium", "Thick"], SZ.length === 2 ? 1 : 1, i => { size = SZ[i]; }) : null;
      const strip = g.html(""); strip.style.cssText = TBCSS;
      const fb = frames.map((f, i) => { const b = document.createElement("button"); b.type = "button"; b.className = "bg-btn"; b.textContent = i + 1; b.style.cssText = "min-width:40px;min-height:40px;padding:4px 8px"; strip.appendChild(b); g.on(b, "click", () => { if (!playing) { cur = i; g.sfx("tick"); } }); return b; });
      const go = d => { if (!playing) { cur = (cur + d + N) % N; g.sfx("tick"); } };
      const tb = bar(g, [
        ["Play", b => { if (playing) { playing = false; b.textContent = "Play"; act(b, false); return; } if (lastUsed() < 0) { g.sfx("wrong"); g.status("Draw something first!"); return; } playing = true; pt = 0; b.textContent = "Stop"; act(b, true); }, "play"],
        ["Undo", () => { if (!playing && frames[cur].length) { frames[cur].pop(); persist(); shownKey = ""; g.sfx("back"); } }],
        ["Clear frame", () => { if (!playing) { frames[cur] = []; persist(); shownKey = ""; g.sfx("back"); } }],
        ["Copy to next", () => { if (playing) return; const nx = (cur + 1) % N; frames[nx] = frames[cur].map(s => ({ c: s.c, w: s.w, p: s.p.slice() })); cur = nx; persist(); g.add(1); g.sfx("pop"); }],
        ["< Prev", () => go(-1)], ["Next >", () => go(1)],
        ["Slower", () => { fps = g.clamp(fps - 1, 2, 16); g.status("Speed " + fps + " frames/sec"); }],
        ["Faster", () => { fps = g.clamp(fps + 1, 2, 16); g.status("Speed " + fps + " frames/sec"); }],
        ["Ghost: on", b => { onion = !onion; b.textContent = onion ? "Ghost: on" : "Ghost: off"; }],
        ["Surprise ball", () => {
          if (playing) return; const hue = ["#e63946", "#2a9df4", "#2dc653", "#ff9f1c", "#7b2cbf"], cc = g.pick(hue);
          for (let i = 0; i < N; i++) { const u = i / (N - 1); frames[i].push({ c: "#8b5a2b", w: 6, p: [40, 320, 440, 320] }, { c: cc, w: 54, p: [Math.round(60 + u * 360), Math.round(290 - Math.abs(Math.sin(u * 6.283)) * 200)] }); }
          persist(); g.add(3); g.sfx("cheer");
        }],
        ["Save picture", () => { render(true, playing ? cur : cur); g.saveImage(c, "my-flipbook-frame"); }],
        ["Finish", () => g.over("Nice work!")]
      ]);
      g.on(window, "keydown", e => { if (e.key === "ArrowLeft") go(-1); else if (e.key === "ArrowRight") go(1); });
      g.status("Frame 1 of " + N);
      g.loop(dt => {
        let idx = cur;
        if (playing) { const lu = lastUsed() + 1; pt += dt; idx = Math.floor(pt * fps) % Math.max(1, lu); }
        render(false, idx);
        const key = idx + ":" + playing + ":" + frames.map(f => f.length ? 1 : 0).join("");
        if (key !== shownKey) { shownKey = key; fb.forEach((b, i) => { b.style.opacity = frames[i].length || i === idx ? 1 : .55; act(b, i === idx); }); g.status("Frame " + (idx + 1) + " of " + N); }
      });
    }
  });

  // ================= 6. Dance Studio =================
  const MOVES = [
    ["Arms up", [-2.7, -3.0, 2.7, 3.0, -.18, -.1, .18, .1, 0]],
    ["T pose", [-1.57, -1.57, 1.57, 1.57, -.15, -.05, .15, .05, 0]],
    ["Wave", [-.35, -.2, 2.3, 2.8, -.15, -.05, .15, .05, 0]],
    ["Squat", [-1.3, -1.1, 1.3, 1.1, -.95, .25, .95, -.25, 27]],
    ["Disco point", [-.6, .7, 2.4, 2.4, -.35, -.1, .45, .1, 0]],
    ["Kick", [-1.4, -1.5, 1.4, 1.5, -1.6, -1.6, .1, 0, 0]],
    ["Star jump", [-2.4, -2.7, 2.4, 2.7, -.6, -.6, .6, .6, -28]],
    ["Robot", [-1.57, -3.14, 1.57, 0, -.1, 0, .1, 0, 0]]
  ];
  B.add({
    id: "s13-dancestudio", name: "Dance Studio", ages: [5, 20], cat: "Creative", color: "#ff8fd8", icon: "D",
    desc: "Pick dance moves, line them up and watch the stick dancer perform.", controls: "Tap moves to add them, then press Dance. Hard: drag the dancer's joints to make your own moves.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), CX = 320, HY = 230, FLOOR = 346;
      const PR = MOVES.slice(0, g.by(5, 8, 8)), MAXS = 16, edit = g.diff === 2;
      let seq = [], target = PR[0][1].slice(), shown = target.slice(), playing = false, ph = 0, bpm = 100, lastBeat = -1, lastHalf = -1, drag = -1, shownIdx = -2;
      const sv = g.load();
      if (sv && Array.isArray(sv.seq)) seq = sv.seq.filter(s => s && Array.isArray(s.p) && s.p.length === 9 && s.p.every(v => typeof v === "number" && isFinite(v))).slice(0, MAXS).map(s => ({ n: String(s.n).slice(0, 14), p: s.p.slice() }));
      const rig = (p, hy) => {
        const hipy = hy + p[8], sh = hipy - 70, lim = (sx, sy, a, b, l1, l2) => { const e = { x: sx + Math.sin(a) * l1, y: sy + Math.cos(a) * l1 }; return [e, { x: e.x + Math.sin(b) * l2, y: e.y + Math.cos(b) * l2 }]; };
        const o = { hip: { x: CX, y: hipy }, sh, la: lim(CX - 14, sh + 4, p[0], p[1], 46, 44), ra: lim(CX + 14, sh + 4, p[2], p[3], 46, 44), ll: lim(CX - 10, hipy, p[4], p[5], 58, 58), rl: lim(CX + 10, hipy, p[6], p[7], 58, 58) };
        o.pts = [o.la[0], o.la[1], o.ra[0], o.ra[1], o.ll[0], o.ll[1], o.rl[0], o.rl[1]];
        o.org = [{ x: CX - 14, y: sh + 4 }, o.la[0], { x: CX + 14, y: sh + 4 }, o.ra[0], { x: CX - 10, y: hipy }, o.ll[0], { x: CX + 10, y: hipy }, o.rl[0]];
        return o;
      };
      g.on(c, "pointerdown", e => {
        if (!edit || playing) return; const p = pos(e), J = rig(shown, HY); let best = -1, bd = 30;
        J.pts.forEach((q, i) => { const d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; best = i; } });
        drag = best; if (best >= 0) try { (()=>{try{c.setPointerCapture(e.pointerId)}catch(_){}})(); } catch (x2) {}
      });
      g.on(c, "pointermove", e => { if (drag < 0) return; const p = pos(e), J = rig(shown, HY), o = J.org[drag]; target[drag] = shown[drag] = Math.atan2(p.x - o.x, p.y - o.y); });
      g.on(window, "pointerup", () => { drag = -1; });
      mkLabel(g, "Moves");
      const chips = g.html(""); chips.style.cssText = "display:flex;flex-wrap:wrap;gap:4px;justify-content:center;padding:4px 8px;min-height:30px";
      const renderSeq = idx => {
        chips.innerHTML = "";
        if (!seq.length) { const s = document.createElement("span"); s.textContent = "Your dance is empty. Tap a move!"; s.style.opacity = ".7"; chips.appendChild(s); return; }
        seq.forEach((m, i) => { const s = document.createElement("span"); s.textContent = (i + 1) + ". " + m.n; s.style.cssText = "padding:3px 8px;border-radius:12px;font:bold 12px system-ui,sans-serif;color:#111;background:" + (i === idx ? "#fff" : "#ff8fd8"); chips.appendChild(s); });
      };
      const persist = () => g.save({ seq });
      const addSeq = (n, p) => { if (seq.length >= MAXS) { g.sfx("wrong"); return; } seq.push({ n, p: p.slice() }); g.add(1); persist(); renderSeq(-1); };
      bar(g, PR.map(m => [m[0], () => { target = m[1].slice(); tone(300 + g.ri(0, 5) * 80, "triangle", .15, .2); if (!edit) addSeq(m[0], m[1]); }]));
      const items = [
        ["Dance!", b => { if (playing) { playing = false; b.textContent = "Dance!"; act(b, false); renderSeq(-1); return; } if (!seq.length) { g.sfx("wrong"); g.status("Add some moves first!"); return; } playing = true; ph = 0; lastBeat = -1; lastHalf = -1; b.textContent = "Stop"; act(b, true); actx(); }, "go"],
        ["Undo", () => { seq.pop(); persist(); renderSeq(-1); g.sfx("back"); }],
        ["Clear dance", () => { seq = []; persist(); renderSeq(-1); g.sfx("back"); }],
        ["Random dance", () => { seq = []; for (let i = 0; i < 6; i++) { const m = g.pick(PR); seq.push({ n: m[0], p: m[1].slice() }); } g.add(1); persist(); renderSeq(-1); g.sfx("cheer"); }],
        ["Slower", () => { bpm = g.clamp(bpm - 15, 60, 180); g.status("Tempo " + bpm); }],
        ["Faster", () => { bpm = g.clamp(bpm + 15, 60, 180); g.status("Tempo " + bpm); }]
      ];
      if (edit) items.splice(1, 0, ["Add this pose", () => addSeq("My pose", target)]);
      items.push(["Finish", () => g.over("Nice work!")]);
      const ctl = bar(g, items);
      renderSeq(-1); g.status("Tempo " + bpm);
      g.loop((dt, t) => {
        let frac = 0, bob = Math.sin(t * 3) * 2, idx = -1, hue = 320;
        if (playing && seq.length) {
          ph += dt * bpm / 60; const n = seq.length; idx = Math.floor(ph) % n; frac = ph % 1;
          const pv = seq[(idx - 1 + n) % n].p, nx = seq[idx].p, u = Math.min(1, frac * 2.5), e = u * u * (3 - 2 * u);
          for (let k = 0; k < 9; k++) shown[k] = pv[k] + (nx[k] - pv[k]) * e;
          bob = -Math.abs(Math.sin(frac * Math.PI)) * 8; hue = (Math.floor(ph) * 40 + 320) % 360;
          const b = Math.floor(ph);
          if (b !== lastBeat) { lastBeat = b; drum("kick"); tone(mf(36 + [0, 3, 5, 7][b % 4]), "sawtooth", .22, .1); }
          const hf = Math.floor(ph * 2); if (hf !== lastHalf) { lastHalf = hf; if (hf % 2) drum("hat"); }
          if (idx !== shownIdx) { shownIdx = idx; renderSeq(idx); }
        } else { for (let k = 0; k < 9; k++) shown[k] += (target[k] - shown[k]) * Math.min(1, 12 * dt); shownIdx = -2; }
        // stage
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#150a33"); gr.addColorStop(1, "#2a1456"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.globalCompositeOperation = "lighter";
        for (let s = 0; s < 2; s++) { const sx = s ? W - 60 : 60, ex = CX + Math.sin(t * 1.2 + s * 2) * 110, bg = x.createLinearGradient(sx, 0, ex, FLOOR); bg.addColorStop(0, "hsla(" + (hue + s * 80) + ",90%,60%,.35)"); bg.addColorStop(1, "hsla(" + (hue + s * 80) + ",90%,60%,.04)"); x.fillStyle = bg; x.beginPath(); x.moveTo(sx - 8, 0); x.lineTo(sx + 8, 0); x.lineTo(ex + 70, FLOOR); x.lineTo(ex - 70, FLOOR); x.fill(); }
        x.globalCompositeOperation = "source-over";
        const dg = x.createRadialGradient(CX - 6, 36, 2, CX, 40, 22); dg.addColorStop(0, "#fff"); dg.addColorStop(1, "#8a8fb0"); x.fillStyle = dg; x.beginPath(); x.arc(CX, 40, 22, 0, 7); x.fill();
        x.strokeStyle = "rgba(0,0,0,.25)"; x.lineWidth = 1; x.beginPath(); x.arc(CX, 40, 14, 0, 7); x.moveTo(CX - 22, 40); x.lineTo(CX + 22, 40); x.stroke();
        for (let i = 0; i < 10; i++) { const pulse = playing ? Math.max(0, 1 - frac) : .2 + .1 * Math.sin(t * 2 + i); x.fillStyle = "hsl(" + ((i * 36 + (playing ? Math.floor(ph) * 50 : 0)) % 360) + ",70%," + Math.round(18 + pulse * 40) + "%)"; x.fillRect(i * 64 + 1, FLOOR, 62, H - FLOOR); }
        x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(CX, FLOOR + 6, 60 - Math.min(20, Math.abs(shown[8]) * .4), 9, 0, 0, 7); x.fill();
        // dancer
        const J = rig(shown, HY + bob); x.lineCap = "round"; x.lineJoin = "round"; x.strokeStyle = "hsl(" + hue + ",90%,72%)"; x.fillStyle = x.strokeStyle;
        const seg = (a, b2, w) => { x.lineWidth = w; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b2.x, b2.y); x.stroke(); };
        seg({ x: CX - 10, y: J.hip.y }, J.ll[0], 11); seg(J.ll[0], J.ll[1], 11); seg({ x: CX + 10, y: J.hip.y }, J.rl[0], 11); seg(J.rl[0], J.rl[1], 11);
        seg(J.hip, { x: CX, y: J.sh }, 15);
        seg({ x: CX - 14, y: J.sh + 4 }, J.la[0], 10); seg(J.la[0], J.la[1], 10); seg({ x: CX + 14, y: J.sh + 4 }, J.ra[0], 10); seg(J.ra[0], J.ra[1], 10);
        const hy = J.sh - 28; x.beginPath(); x.arc(CX, hy, 22, 0, 7); x.fill();
        x.fillStyle = "#1a1030"; x.beginPath(); x.arc(CX - 8, hy - 4, 3, 0, 7); x.arc(CX + 8, hy - 4, 3, 0, 7); x.fill();
        x.strokeStyle = "#1a1030"; x.lineWidth = 2.5; x.beginPath(); x.arc(CX, hy + 2, 9, .2, 2.9); x.stroke();
        if (edit && !playing) { x.lineWidth = 3; J.pts.forEach((q, i) => { x.strokeStyle = i === drag ? "#fff" : "rgba(255,255,255,.75)"; x.fillStyle = "rgba(255,255,255," + (.15 + .1 * Math.sin(t * 5 + i)) + ")"; x.beginPath(); x.arc(q.x, q.y, 12, 0, 7); x.fill(); x.stroke(); }); }
      });
    }
  });

  // ================= 7. Light Show Maker =================
  const PAT = [
    { n: "Off", h: 0, f: () => .05 },
    { n: "Flash", h: 330, f: (i, N, p) => Math.pow(1 - p, 1.5) },
    { n: "Sweep", h: 190, f: (i, N, p) => Math.max(0, 1 - Math.abs(i / (N - 1) - p) * 4) },
    { n: "Swap", h: 50, f: (i, N, p) => (i % 2 === (p < .5 ? 0 : 1)) ? 1 : .12 },
    { n: "Burst", h: 130, f: (i, N, p) => { const d = Math.abs(i - (N - 1) / 2) / ((N - 1) / 2); return Math.max(0, 1 - Math.abs(d - p) * 3); } },
    { n: "Rainbow", h: -1, f: () => .9 },
    { n: "Strobe", h: 210, f: (i, N, p) => ((p * 6) % 1 < .5) ? 1 : .05 },
    { n: "Chase", h: 280, f: (i, N, p) => ((i + Math.floor(p * N)) % 3 === 0) ? 1 : .1 },
    { n: "Wave", h: 10, f: (i, N, p) => .5 + .5 * Math.sin((i / N + p) * 6.283) }
  ];
  B.add({
    id: "s13-lightshow", name: "Light Show Maker", ages: [6, 20], cat: "Music", color: "#4cffd9", icon: "LS",
    desc: "Paint light patterns on the beat and run your own concert.", controls: "Pick a pattern, then tap the beat boxes to paint it. Press Play.",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 340), nP = g.by(5, 7, 9), N = g.by(5, 7, 9), P = PAT.slice(0, nP), FLOORY = 270;
      let steps = [1, 2, 3, 4, 1, 2, 3, 4], sel = 1, playing = false, ph = 0, bpm = g.by(100, 120, 128), lastStep = -1, lastHalf = -1;
      const sv = g.load();
      if (sv && Array.isArray(sv.steps) && sv.steps.length === 8 && sv.steps.every(v => Number.isInteger(v) && v >= 0 && v < nP)) steps = sv.steps.slice();
      const persist = () => g.save({ steps });
      const bgOf = i => P[i].h < 0 ? "linear-gradient(90deg,#f44,#fd4,#4e8,#4cf,#b8f)" : (i === 0 ? "#333" : "hsl(" + P[i].h + ",75%,45%)");
      mkLabel(g, "1. Pick a pattern");
      const po = opts(g, P.map(p => p.n), sel, i => { sel = i; });
      po.bs.forEach((b, i) => { b.style.background = bgOf(i); b.style.color = "#fff"; });
      mkLabel(g, "2. Tap a beat box to paint it");
      const row = g.html(""); row.style.cssText = TBCSS;
      const cells = steps.map((s, i) => {
        const b = document.createElement("button"); b.type = "button"; b.style.cssText = "flex:1 1 58px;max-width:90px;min-height:56px;border:0;border-radius:12px;color:#fff;font:bold 13px system-ui,sans-serif;cursor:pointer;text-shadow:0 1px 2px #000";
        row.appendChild(b); g.on(b, "click", () => { steps[i] = sel; g.add(1); g.sfx("pop"); persist(); paint(); }); return b;
      });
      const paint = () => cells.forEach((b, i) => { b.style.background = bgOf(steps[i]); b.innerHTML = (i + 1) + "<br>" + P[steps[i]].n; });
      paint(); g.status("Tempo " + bpm);
      const ctl = bar(g, [
        ["Play", b => { playing = !playing; b.textContent = playing ? "Stop" : "Play"; act(b, playing); ph = 0; lastStep = -1; lastHalf = -1; if (playing) actx(); else cells.forEach(cb => act(cb, false)); }, "play"],
        ["Slower", () => { bpm = g.clamp(bpm - 10, 60, 180); g.status("Tempo " + bpm); }],
        ["Faster", () => { bpm = g.clamp(bpm + 10, 60, 180); g.status("Tempo " + bpm); }],
        ["Random show", () => { steps = steps.map(() => g.ri(1, nP - 1)); persist(); paint(); g.add(1); g.sfx("cheer"); }],
        ["Clear", () => { steps = steps.map(() => 0); persist(); paint(); g.sfx("back"); }],
        ["Finish", () => g.over("Nice work!")]
      ]);
      g.loop((dt, t) => {
        let step = -1, p = t % 1, pi = sel;
        if (playing) {
          ph += dt * bpm / 60; step = Math.floor(ph) % 8; p = ph % 1; pi = steps[step];
          if (step !== lastStep || Math.floor(ph) !== Math.floor(ph - dt * bpm / 60)) { if (step !== lastStep) { lastStep = step; drum("kick"); if (pi) tone(mf(40 + (pi * 3) % 12), "triangle", .3, .22); cells.forEach((b, i) => act(b, i === step)); } }
          const hf = Math.floor(ph * 2); if (hf !== lastHalf) { lastHalf = hf; if (hf % 2) drum("hat"); }
        } else if (lastStep !== -1) { lastStep = -1; cells.forEach(b => act(b, false)); }
        const pat = P[pi];
        x.fillStyle = "#07071a"; x.fillRect(0, 0, W, H);
        const bs = []; let sum = 0; for (let i = 0; i < N; i++) { const b = pat.f(i, N, p); bs.push(b); sum += b; }
        const hz = x.createRadialGradient(W / 2, FLOORY, 10, W / 2, FLOORY, 360); hz.addColorStop(0, "hsla(" + (pat.h < 0 ? (t * 60) % 360 : pat.h) + ",80%,50%," + (sum / N * .35) + ")"); hz.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = hz; x.fillRect(0, 0, W, H);
        x.fillStyle = "#222338"; x.fillRect(0, 22, W, 8);
        x.globalCompositeOperation = "lighter";
        for (let i = 0; i < N; i++) {
          const lx = 50 + i * (W - 100) / (N - 1), b = bs[i], hue = pat.h < 0 ? (i / N * 360 + t * 60) % 360 : pat.h, sw = Math.sin(t * 1.3 + i) * 40;
          const bg = x.createLinearGradient(lx, 30, lx + sw, FLOORY); bg.addColorStop(0, "hsla(" + hue + ",95%,65%," + (b * .5) + ")"); bg.addColorStop(1, "hsla(" + hue + ",95%,60%," + (b * .08) + ")");
          x.fillStyle = bg; x.beginPath(); x.moveTo(lx - 6, 32); x.lineTo(lx + 6, 32); x.lineTo(lx + sw + 80, FLOORY); x.lineTo(lx + sw - 80, FLOORY); x.fill();
          const fg = x.createRadialGradient(lx + sw, FLOORY, 2, lx + sw, FLOORY, 90); fg.addColorStop(0, "hsla(" + hue + ",95%,65%," + (b * .5) + ")"); fg.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = fg; x.fillRect(lx + sw - 90, FLOORY - 40, 180, 80);
          const lg = x.createRadialGradient(lx, 36, 1, lx, 36, 22); lg.addColorStop(0, "hsla(" + hue + ",100%," + (50 + b * 40) + "%," + (.3 + b * .7) + ")"); lg.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = lg; x.beginPath(); x.arc(lx, 36, 22, 0, 7); x.fill();
        }
        x.globalCompositeOperation = "source-over";
        const bump = playing ? Math.max(0, 1 - p) * 6 : 0;
        for (let i = 0; i < 14; i++) { const hx = 20 + i * 46, hy = H - 26 - Math.abs(Math.sin(t * 3 + i * 1.7)) * 4 - bump * (i % 2 ? 1 : .6); x.fillStyle = "#0b0b1a"; x.beginPath(); x.arc(hx, hy, 16, 0, 7); x.fill(); x.fillRect(hx - 18, hy + 8, 36, 40); if (i % 3 === 0) { x.strokeStyle = "#0b0b1a"; x.lineWidth = 6; x.lineCap = "round"; x.beginPath(); x.moveTo(hx + 10, hy + 14); x.lineTo(hx + 18, hy - 22 - bump); x.stroke(); } }
        x.fillStyle = "rgba(255,255,255,.7)"; x.font = "bold 14px system-ui, sans-serif"; x.textAlign = "left"; x.textBaseline = "top"; x.fillText(playing ? "Beat " + (step + 1) + ": " + pat.n : "Preview: " + pat.n, 12, 44);
      });
    }
  });

  // ================= 8. Note Painter (visualiser toy) =================
  B.add({
    id: "s13-notepainter", name: "Note Painter", ages: [5, 20], cat: "Music", color: "#ff7ad9", icon: "N",
    desc: "Every note you play paints colourful lights across the screen.", controls: "Tap or slide on the screen, or press A S D F G H J K",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), SCALE = [60, 62, 64, 67, 69, 72, 74, 76], KL = "asdfghjk";
      const STY = ["Rings", "Fireworks", "Bars", "Spiral", "Mirror"].slice(0, g.by(3, 4, 5));
      let sty = 0, flash = 0, fx = [], bars = Array(8).fill(0), auto = false, at = 0, ai = 3, down = false, lastCol = -1, hue0 = 220;
      const spawn = (col, px, py) => {
        const h = col * 45 + 10;
        if (sty === 0) { fx.push({ k: 0, x: px, y: py, r: 8, life: 1, h }, { k: 0, x: px, y: py, r: -14, life: 1, h: h + 30 }); }
        else if (sty === 1 || sty === 2) { const n = sty === 1 ? 28 : 12; for (let i = 0; i < n; i++) { const a = g.rf(0, 6.283), s = g.rf(60, 260); fx.push({ k: 1, x: px, y: sty === 2 ? H - bars[col] * H * .55 : py, vx: Math.cos(a) * s, vy: Math.sin(a) * s - (sty === 2 ? 120 : 0), life: 1, h: h + g.ri(-15, 15) }); } }
        else if (sty === 3) { for (let i = 0; i < 30; i++) fx.push({ k: 3, a: i / 30 * 6.283, r: 0, life: 1, h: h + i * 3, sp: g.rf(.8, 1.4), x: W / 2, y: H / 2 }); }
        else { for (let m = 0; m < 6; m++) { const ang = m * Math.PI / 3, ca = Math.cos(ang), sa = Math.sin(ang), dx = px - W / 2, dy = py - H / 2; for (let i = 0; i < 6; i++) { const a = g.rf(0, 6.283), s = g.rf(60, 190), vx = Math.cos(a) * s, vy = Math.sin(a) * s; fx.push({ k: 1, x: W / 2 + dx * ca - dy * sa, y: H / 2 + dx * sa + dy * ca, vx: vx * ca - vy * sa, vy: vx * sa + vy * ca, life: 1, h: h + i * 8 }); } } }
        if (fx.length > 700) fx.splice(0, fx.length - 700);
      };
      const play = (col, px, py) => {
        col = g.clamp(col, 0, 7); const f = mf(SCALE[col]); tone(f, "triangle", .5, .22); tone(f * 2, "sine", .3, .07);
        g.add(1); bars[col] = 1; flash = 1; hue0 = col * 45; spawn(col, px, py);
      };
      const cp = e => { const p = pos(e); return { col: Math.floor(p.x / W * 8), x: p.x, y: p.y }; };
      g.on(c, "pointerdown", e => { const k = cp(e); down = true; lastCol = k.col; play(k.col, k.x, k.y); try { (()=>{try{c.setPointerCapture(e.pointerId)}catch(_){}})(); } catch (x2) {} });
      g.on(c, "pointermove", e => { if (!down) return; const k = cp(e); if (k.col !== lastCol) { lastCol = k.col; play(k.col, k.x, k.y); } });
      g.on(window, "pointerup", () => { down = false; });
      g.on(window, "keydown", e => { if (e.repeat) return; const i = KL.indexOf(e.key.toLowerCase()); if (i >= 0) play(i, (i + .5) * W / 8, g.rf(H * .3, H * .7)); });
      opts(g, STY, 0, i => { sty = i; fx = []; });
      bar(g, [
        ["Auto-play: off", b => { auto = !auto; b.textContent = auto ? "Auto-play: on" : "Auto-play: off"; act(b, auto); if (auto) actx(); }],
        ["Clear", () => { fx = []; g.sfx("back"); }],
        ["Finish", () => g.over("Nice work!")]
      ]);
      g.loop((dt, t) => {
        if (auto) { at -= dt; if (at <= 0) { at = g.rf(.2, .4); ai = g.clamp(ai + g.ri(-2, 2), 0, 7); play(ai, (ai + .5) * W / 8, g.rf(H * .25, H * .7)); } }
        flash = Math.max(0, flash - dt * 2);
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "hsl(" + ((hue0 + t * 10) % 360) + ",50%," + (8 + flash * 10) + "%)"); bg.addColorStop(1, "hsl(" + ((hue0 + 60 + t * 10) % 360) + ",50%," + (14 + flash * 8) + "%)"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        const bw = W / 8;
        for (let i = 0; i < 8; i++) {
          bars[i] = Math.max(0, bars[i] - dt * 1.1); const hh = bars[i] * (sty === 2 ? H * .55 : 70);
          x.fillStyle = "hsla(" + (i * 45 + 10) + ",90%,60%," + (sty === 2 ? .85 : .3) + ")"; x.beginPath(); x.roundRect(i * bw + 6, H - hh, bw - 12, hh, 8); x.fill();
          x.fillStyle = "rgba(255,255,255,.35)"; x.font = "bold 14px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "bottom"; x.fillText(KL[i].toUpperCase(), i * bw + bw / 2, H - 6);
        }
        x.globalCompositeOperation = "lighter";
        for (let i = fx.length - 1; i >= 0; i--) {
          const p = fx[i];
          if (p.k === 0) { p.r += dt * 260; p.life -= dt * .9; } else if (p.k === 1) { p.vy += 240 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt * 1.1; } else { p.a += dt * 3 * p.sp; p.r += dt * 110; p.life -= dt * .7; p.x = W / 2 + Math.cos(p.a) * p.r; p.y = H / 2 + Math.sin(p.a) * p.r; }
          if (p.life <= 0) { fx.splice(i, 1); continue; }
          if (p.k === 0) { if (p.r > 0) { x.strokeStyle = "hsla(" + p.h + ",100%,60%," + p.life + ")"; x.lineWidth = 5; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.stroke(); } }
          else { x.fillStyle = "hsla(" + p.h + ",100%,65%," + p.life + ")"; x.beginPath(); x.arc(p.x, p.y, 3 + p.life * 3, 0, 7); x.fill(); }
        }
        x.globalCompositeOperation = "source-over";
        if (!g.score()) { x.fillStyle = "rgba(255,255,255,.75)"; x.font = "bold 22px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Tap here to make music and lights!", W / 2, H / 2 - 10 + Math.sin(t * 3) * 4); }
      });
    }
  });

  // ================= 9. Noisy Creature =================
  const CS = [
    { n: "Body", v: ["Round", "Square", "Tall", "Bean", "Pointy"], s: [["sine", 260, 140, .3, .4], ["square", 150, 100, .25, .14], ["triangle", 330, 190, .3, .3], ["sine", 180, 300, .3, .4], ["sawtooth", 120, 60, .35, .14]] },
    { n: "Eyes", v: ["Two", "One big", "Three", "Sleepy", "Dizzy"], s: [["sine", 1200, 1800, .12, .25], ["sine", 700, 500, .2, .3], ["triangle", 1500, 900, .15, .25], ["sine", 400, 420, .25, .2], ["square", 900, 1200, .1, .1]] },
    { n: "Mouth", v: ["Smile", "Roar", "Teeth", "Tiny", "Tongue"], s: [["triangle", 300, 330, .4, .3], ["sawtooth", 140, 80, .5, .18], ["square", 200, 90, .15, .15], ["sine", 900, 1100, .15, .3], ["sawtooth", 400, 200, .4, .12]] },
    { n: "Top", v: ["None", "Ears", "Horns", "Antenna", "Crest"], s: [null, ["triangle", 500, 700, .2, .25], ["square", 220, 220, .3, .12], ["sine", 300, 900, .35, .3], ["sawtooth", 1000, 300, .3, .1]] },
    { n: "Arms", v: ["None", "Sticks", "Claws", "Wings", "Wavy"], s: [null, ["noise", 3000, 0, .1, .3], ["square", 330, 330, .1, .12], ["noise", 800, 0, .3, .25], ["sine", 200, 500, .3, .3]] },
    { n: "Feet", v: ["None", "Two feet", "Big foot", "Springs", "Hooves"], s: [null, ["sine", 120, 50, .2, .8], ["sine", 90, 40, .3, .9], ["triangle", 200, 700, .25, .3], ["square", 300, 200, .06, .2]] },
    { n: "Tail", v: ["None", "Curl", "Fluffy", "Fin", "Bolt"], s: [null, ["noise", 2000, 0, .25, .25], ["noise", 500, 0, .3, .3], ["sine", 800, 1400, .2, .3], ["sawtooth", 1500, 200, .25, .1]] }
  ];
  B.add({
    id: "s13-creature", name: "Noisy Creature", ages: [5, 12], cat: "Creative", color: "#ffb347", icon: "NC",
    desc: "Build a funny creature. Every part makes its own sound when you tap it!", controls: "Choose a part, pick a style, then tap the creature's parts to hear them",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), NS = g.by(4, 6, 7), NV = g.by(3, 4, 5);
      const COLS = ["#4cc3ff", "#6be28f", "#ff8fd8", "#ffd34e", "#ff7a5c", "#b48cff", "#8affea", "#c9c9d6"].slice(0, g.by(5, 7, 8));
      let parts = [0, 0, 0, 0, 0, 0, 0], col = COLS[0], slot = 0, hits = [], sq = Array(7).fill(0);
      parts[3] = 1;
      const sv = g.load();
      if (sv && sv.d === g.diff && Array.isArray(sv.p) && sv.p.length === 7 && sv.p.every(v => Number.isInteger(v) && v >= 0 && v < NV) && typeof sv.col === "string" && COLS.includes(sv.col)) { parts = sv.p.slice(); col = sv.col; }
      const persist = () => g.save({ d: g.diff, p: parts, col });
      const say = s => { const sp = CS[s].s[parts[s]]; if (sp) snd(sp); sq[s] = 1; };
      g.on(c, "pointerdown", e => { const p = pos(e); for (let i = hits.length - 1; i >= 0; i--) { const h = hits[i]; if (Math.hypot(h.x - p.x, h.y - p.y) < h.r) { if (h.slot < NS) { say(h.slot); g.add(1); } return; } } });
      mkLabel(g, "Choose a part, then a style. Tap the creature to hear it!");
      swatches(g, COLS, 0, cc => { col = cc; sq[0] = 1; tone(400, "sine", .15, .2, 600); persist(); });
      const so = opts(g, CS.slice(0, NS).map(s => s.n), 0, i => { slot = i; renderV(); });
      const vr = g.html(""); vr.style.cssText = TBCSS;
      function renderV() {
        vr.innerHTML = "";
        for (let i = 0; i < NV; i++) {
          const b = document.createElement("button"); b.type = "button"; b.className = "bg-btn"; b.textContent = CS[slot].v[i]; b.style.minHeight = "42px"; act(b, parts[slot] === i); vr.appendChild(b);
          g.on(b, "click", () => { parts[slot] = i; g.add(1); persist(); say(slot); renderV(); });
        }
      }
      renderV();
      bar(g, [
        ["Surprise me", () => { for (let i = 0; i < NS; i++) parts[i] = g.ri(i === 0 || i === 1 || i === 2 ? 0 : 0, NV - 1); col = g.pick(COLS); persist(); g.add(1); renderV(); g.sfx("cheer"); }],
        ["Play the band", () => { for (let i = 0; i < NS; i++) g.timeout(() => say(i), i * 260); }],
        ["Finish", () => g.over("Nice work!")]
      ]);
      const hex = (cc, k) => cc;   // body colour helper (kept simple)
      g.loop((dt, t) => {
        hits = []; for (let i = 0; i < 7; i++) sq[i] = Math.max(0, sq[i] - dt * 1.6);
        const w = i => sq[i] * Math.sin(t * 28 + i);
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#fff1c9"); gr.addColorStop(1, "#ffcf8a"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.fillStyle = "#e3a85a"; x.fillRect(0, 352, W, H - 352);
        const bob = Math.sin(t * 2) * 4, BX = 320, BY = 235 + bob, bv = parts[0];
        const BW = [92, 88, 72, 98, 85][bv], BH = [88, 80, 105, 75, 85][bv], TOPY = [90, 82, 105, 75, 95][bv];
        x.fillStyle = "rgba(0,0,0,.18)"; x.beginPath(); x.ellipse(BX, 358, 110, 14, 0, 0, 7); x.fill();
        x.lineCap = "round"; x.lineJoin = "round";
        const dark = "rgba(0,0,0,.3)";
        x.save(); x.translate(BX, BY);
        // tail
        if (NS > 6 && parts[6]) { const v = parts[6], s = 1 + w(6) * .25; x.save(); x.translate(BW - 8, 60); x.rotate(w(6) * .3); x.scale(s, s); x.fillStyle = col; x.strokeStyle = col; x.lineWidth = 10;
          if (v === 1) { x.beginPath(); x.arc(24, -4, 24, 2.4, 6); x.stroke(); } else if (v === 2) { [[20, 0, 18], [38, -10, 14], [38, 12, 14]].forEach(a => { x.beginPath(); x.arc(a[0], a[1], a[2], 0, 7); x.fill(); }); } else if (v === 3) { x.beginPath(); x.moveTo(0, -10); x.lineTo(48, -28); x.lineTo(40, 6); x.closePath(); x.fill(); } else { x.strokeStyle = "#ffd34e"; x.beginPath(); x.moveTo(0, 0); x.lineTo(24, -20); x.lineTo(16, -2); x.lineTo(44, -26); x.stroke(); }
          x.restore(); hits.push({ slot: 6, x: BX + BW + 30, y: BY + 56, r: 40 }); }
        // feet
        if (NS > 5 && parts[5]) { const v = parts[5], s = 1 + w(5) * .2; x.save(); x.translate(0, BH + 4); x.scale(1, s); x.fillStyle = "#6a4a8a";
          if (v === 1) { [-36, 36].forEach(fx2 => { x.beginPath(); x.ellipse(fx2, 8, 26, 14, 0, 0, 7); x.fill(); }); } else if (v === 2) { x.beginPath(); x.ellipse(0, 8, 54, 16, 0, 0, 7); x.fill(); } else if (v === 3) { x.strokeStyle = "#888"; x.lineWidth = 5; [-36, 36].forEach(fx2 => { x.beginPath(); x.moveTo(fx2 - 12, 0); x.lineTo(fx2 + 12, 6); x.lineTo(fx2 - 12, 12); x.lineTo(fx2 + 12, 18); x.stroke(); }); } else { [-36, 36].forEach(fx2 => { x.beginPath(); x.roundRect(fx2 - 14, 0, 28, 20, 6); x.fill(); }); }
          x.restore(); hits.push({ slot: 5, x: BX, y: BY + BH + 12, r: 55 }); }
        // top
        if (NS > 3 && parts[3]) { const v = parts[3]; x.save(); x.translate(0, -TOPY + 8); x.rotate(w(3) * .12); x.fillStyle = col; x.strokeStyle = dark; x.lineWidth = 3;
          if (v === 1) { [-1, 1].forEach(sg => { x.beginPath(); x.moveTo(sg * 20, 10); x.lineTo(sg * 56, -34); x.lineTo(sg * 56, 14); x.closePath(); x.fill(); x.stroke(); }); } else if (v === 2) { x.fillStyle = "#fff3d0"; [-1, 1].forEach(sg => { x.beginPath(); x.moveTo(sg * 34, 14); x.quadraticCurveTo(sg * 70, -6, sg * 52, -42); x.quadraticCurveTo(sg * 44, -6, sg * 20, 12); x.closePath(); x.fill(); x.stroke(); }); } else if (v === 3) { x.strokeStyle = "#555"; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 14); x.lineTo(0, -34); x.stroke(); x.fillStyle = "#ff6fb5"; x.beginPath(); x.arc(0, -42, 11 + sq[3] * 4, 0, 7); x.fill(); } else { x.fillStyle = "#ffd34e"; [-30, 0, 30].forEach((px, i) => { x.beginPath(); x.moveTo(px - 14, 14); x.lineTo(px, i === 1 ? -36 : -24); x.lineTo(px + 14, 14); x.closePath(); x.fill(); }); }
          x.restore(); hits.push({ slot: 3, x: BX, y: BY - TOPY - 8, r: 44 }); }
        // arms
        if (NS > 4 && parts[4]) { const v = parts[4]; [-1, 1].forEach(sg => { x.save(); x.translate(sg * (BW - 6), 8); x.rotate(sg * (.3 + w(4) * .5)); x.scale(sg, 1); x.fillStyle = col; x.strokeStyle = col; x.lineWidth = 10;
          if (v === 1) { x.beginPath(); x.moveTo(0, 0); x.lineTo(40, 24); x.stroke(); x.beginPath(); x.arc(44, 26, 9, 0, 7); x.fill(); } else if (v === 2) { x.fillStyle = "#ff7a5c"; x.beginPath(); x.arc(30, 20, 24, .5, 5.8); x.lineTo(30, 20); x.closePath(); x.fill(); } else if (v === 3) { x.fillStyle = "rgba(255,255,255,.85)"; x.strokeStyle = dark; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(50, -40, 70, 10); x.quadraticCurveTo(40, 0, 36, 30); x.quadraticCurveTo(20, 6, 0, 20); x.closePath(); x.fill(); x.stroke(); } else { x.beginPath(); x.moveTo(0, 0); for (let i = 1; i <= 8; i++) x.lineTo(i * 8, 14 + Math.sin(t * 4 + i) * 8); x.stroke(); }
          x.restore(); hits.push({ slot: 4, x: BX + sg * (BW + 28), y: BY + 30, r: 36 }); }); }
        // body
        const sx = 1 + w(0) * .08, sy = 1 - w(0) * .08; x.save(); x.scale(sx, sy);
        const fg = x.createRadialGradient(-30, -40, 10, 0, 0, 130); fg.addColorStop(0, "#ffffffaa"); fg.addColorStop(.35, col); fg.addColorStop(1, col);
        x.fillStyle = col; x.strokeStyle = dark; x.lineWidth = 4; x.beginPath();
        if (bv === 0) x.arc(0, 0, 90, 0, 7); else if (bv === 1) x.roundRect(-88, -80, 176, 160, 40); else if (bv === 2) x.ellipse(0, 0, 72, 105, 0, 0, 7); else if (bv === 3) x.ellipse(0, 0, 98, 76, .25, 0, 7);
        else { x.moveTo(0, -95); x.quadraticCurveTo(10, -90, 40, -30); x.quadraticCurveTo(95, 50, 70, 80); x.quadraticCurveTo(0, 95, -70, 80); x.quadraticCurveTo(-95, 50, -40, -30); x.quadraticCurveTo(-10, -90, 0, -95); x.closePath(); }
        x.fill(); x.stroke(); x.fillStyle = "rgba(255,255,255,.28)"; x.beginPath(); x.ellipse(-30, -45, 28, 14, -.6, 0, 7); x.fill();
        hits.push({ slot: 0, x: BX, y: BY + 50, r: 50 });
        // eyes
        const ev = parts[1], blink = (t % 3.3) < .12 ? .1 : 1, es = 1 + w(1) * .2; x.save(); x.scale(es, es);
        const eye = (ex, ey, r) => { x.fillStyle = "#fff"; x.strokeStyle = dark; x.lineWidth = 2; x.beginPath(); x.ellipse(ex, ey, r, r * blink, 0, 0, 7); x.fill(); x.stroke(); x.fillStyle = "#222"; x.beginPath(); x.ellipse(ex + Math.sin(t) * 2, ey, r * .45, r * .45 * blink, 0, 0, 7); x.fill(); };
        if (ev === 0) { eye(-32, -22, 16); eye(32, -22, 16); } else if (ev === 1) eye(0, -22, 28); else if (ev === 2) { eye(-42, -18, 12); eye(0, -34, 12); eye(42, -18, 12); }
        else if (ev === 3) { x.strokeStyle = "#222"; x.lineWidth = 4; [-32, 32].forEach(ex => { x.beginPath(); x.arc(ex, -22, 13, .2, 2.9); x.stroke(); }); }
        else { [-32, 32].forEach(ex => { x.fillStyle = "#fff"; x.beginPath(); x.arc(ex, -22, 17, 0, 7); x.fill(); x.strokeStyle = "#222"; x.lineWidth = 2; x.beginPath(); for (let a = 0; a < 12; a += .3) x.lineTo(ex + Math.cos(a + t * 4) * a * 1.3, -22 + Math.sin(a + t * 4) * a * 1.3); x.stroke(); }); }
        x.restore(); hits.push({ slot: 1, x: BX, y: BY - 24, r: 48 });
        // mouth
        const mt = parts[2], mo = 1 + w(2) * .5; x.save(); x.translate(0, 38); x.scale(1, Math.max(.3, mo)); x.strokeStyle = "#3a1a2a"; x.fillStyle = "#3a1a2a"; x.lineWidth = 5;
        if (mt === 0) { x.beginPath(); x.arc(0, -8, 26, .3, 2.84); x.stroke(); } else if (mt === 1) { x.beginPath(); x.ellipse(0, 0, 30, 22, 0, 0, 7); x.fill(); x.fillStyle = "#ff6f7f"; x.beginPath(); x.ellipse(0, 10, 18, 9, 0, 0, 7); x.fill(); }
        else if (mt === 2) { x.beginPath(); x.roundRect(-34, -10, 68, 26, 8); x.fill(); x.fillStyle = "#fff"; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(-32 + i * 13.6, -10); x.lineTo(-25 + i * 13.6, 4); x.lineTo(-18 + i * 13.6, -10); x.fill(); } }
        else if (mt === 3) { x.beginPath(); x.arc(0, 0, 9, 0, 7); x.fill(); } else { x.beginPath(); x.arc(0, -8, 26, .3, 2.84); x.stroke(); x.fillStyle = "#ff6f9f"; x.beginPath(); x.roundRect(-8, 6, 18, 24, 9); x.fill(); }
        x.restore(); hits.push({ slot: 2, x: BX, y: BY + 38, r: 40 });
        x.restore();
        x.restore();
        if (!g.score()) { x.fillStyle = "rgba(60,30,0,.7)"; x.font = "bold 18px system-ui, sans-serif"; x.textAlign = "center"; x.fillText("Tap me!", 80, 60 + Math.sin(t * 3) * 4); }
      });
    }
  });

  // ================= 10. Bouncy Tunes =================
  B.add({
    id: "s13-bouncytunes", name: "Bouncy Tunes", ages: [5, 20], cat: "Music", color: "#7affb0", icon: "BT",
    desc: "Place coloured pegs. Balls bounce off them and play notes!", controls: "Tap to place a peg (tap a peg to remove it). Hard: drag to draw a bar.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 400), NOTES = [60, 62, 64, 67, 69, 72, 74, 76].slice(0, g.by(5, 7, 8)), PR = g.by(18, 14, 12), MAXB = g.by(4, 6, 8), MAXP = 40;
      const hue = k => k * 360 / 8 + 10;
      let pegs = [], balls = [], sel = 0, auto = true, dropT = 0, sx = W / 2, drag = null, tt = 0;
      const sv = g.load();
      if (sv && sv.d === g.diff && Array.isArray(sv.pegs)) pegs = sv.pegs.filter(p => p && [p.x1, p.y1, p.x2, p.y2].every(v => typeof v === "number" && isFinite(v)) && p.k >= 0 && p.k < NOTES.length).slice(0, MAXP).map(p => ({ x1: p.x1, y1: p.y1, x2: p.x2, y2: p.y2, k: p.k | 0, glow: 0, cd: 0 }));
      else for (let i = 0; i < 6; i++) { const px = 140 + i * 70, py = 130 + (i % 3) * 70; pegs.push({ x1: px, y1: py, x2: px, y2: py, k: i % NOTES.length, glow: 0, cd: 0 }); }
      const persist = () => g.save({ d: g.diff, pegs: pegs.map(p => ({ x1: Math.round(p.x1), y1: Math.round(p.y1), x2: Math.round(p.x2), y2: Math.round(p.y2), k: p.k })) });
      const segDist = (px, py, p) => { const dx = p.x2 - p.x1, dy = p.y2 - p.y1, l2 = dx * dx + dy * dy; let u = l2 ? ((px - p.x1) * dx + (py - p.y1) * dy) / l2 : 0; u = Math.max(0, Math.min(1, u)); return Math.hypot(px - (p.x1 + dx * u), py - (p.y1 + dy * u)); };
      const drop = () => { balls.push({ x: sx, y: 30, vx: g.rf(-30, 30), vy: 0, r: 8, age: 0 }); if (balls.length > MAXB) balls.shift(); };
      g.on(c, "pointerdown", e => {
        const p = pos(e);
        for (let i = pegs.length - 1; i >= 0; i--) if (segDist(p.x, p.y, pegs[i]) < PR + 4) { pegs.splice(i, 1); g.sfx("pop"); persist(); return; }
        drag = { x: p.x, y: p.y, x2: p.x, y2: p.y }; try { (()=>{try{c.setPointerCapture(e.pointerId)}catch(_){}})(); } catch (x2) {}
      });
      g.on(c, "pointermove", e => { if (drag) { const p = pos(e); drag.x2 = p.x; drag.y2 = p.y; } });
      g.on(window, "pointerup", () => {
        if (!drag) return; const d = drag; drag = null;
        const bar2 = g.diff === 2 && Math.hypot(d.x2 - d.x, d.y2 - d.y) > 26;
        pegs.push({ x1: d.x, y1: d.y, x2: bar2 ? d.x2 : d.x, y2: bar2 ? d.y2 : d.y, k: sel, glow: 1, cd: 0 }); if (pegs.length > MAXP) pegs.shift();
        tone(mf(NOTES[sel]), "sine", .4, .25); g.add(1); persist();
      });
      swatches(g, NOTES.map((n, i) => "hsl(" + hue(i) + ",80%,58%)"), 0, (cc, i) => { sel = i; tone(mf(NOTES[i]), "sine", .3, .2); });
      bar(g, [
        ["Drop a ball", () => { actx(); drop(); }],
        ["Auto-drop: on", b => { auto = !auto; b.textContent = auto ? "Auto-drop: on" : "Auto-drop: off"; act(b, auto); actx(); }],
        ["Surprise me", () => { pegs = []; for (let i = 0; i < g.by(7, 10, 13); i++) { const px = g.rf(60, W - 60), py = g.rf(90, H - 60), l = g.diff === 2 && Math.random() < .4 ? g.rf(30, 80) : 0, a = g.rf(0, 3.14); pegs.push({ x1: px, y1: py, x2: px + Math.cos(a) * l, y2: py + Math.sin(a) * l, k: g.ri(0, NOTES.length - 1), glow: 0, cd: 0 }); } persist(); g.add(1); g.sfx("cheer"); }],
        ["Clear pegs", () => { pegs = []; persist(); g.sfx("back"); }],
        ["Finish", () => g.over("Nice work!")]
      ]);
      g.loop((dt, t) => {
        tt = t; sx = W / 2 + Math.sin(t * .7) * (W / 2 - 70);
        if (auto) { dropT -= dt; if (dropT <= 0) { dropT = g.by(1.4, 1.0, .8); drop(); } }
        for (const b of balls) {
          b.age += dt;
          for (let s = 0; s < 2; s++) {
            const h = dt / 2; b.vy += 520 * h; b.x += b.vx * h; b.y += b.vy * h;
            if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * .8; } else if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * .8; }
            for (const p of pegs) {
              const dx = p.x2 - p.x1, dy = p.y2 - p.y1, l2 = dx * dx + dy * dy; let u = l2 ? ((b.x - p.x1) * dx + (b.y - p.y1) * dy) / l2 : 0; u = Math.max(0, Math.min(1, u));
              const qx = p.x1 + dx * u, qy = p.y1 + dy * u; let nx = b.x - qx, ny = b.y - qy; const d = Math.hypot(nx, ny), R = PR + b.r;
              if (d < R) {
                if (d < .001) { nx = 0; ny = -1; } else { nx /= d; ny /= d; }
                b.x = qx + nx * R; b.y = qy + ny * R; const vn = b.vx * nx + b.vy * ny;
                if (vn < 0) { b.vx -= 1.8 * vn * nx; b.vy -= 1.8 * vn * ny; b.vx += g.rf(-8, 8); if (-vn > 40 && p.cd <= 0) { p.cd = .1; p.glow = 1; tone(mf(NOTES[p.k]), "sine", .45, g.clamp(-vn / 450, .06, .3)); g.add(1); } }
              }
            }
          }
        }
        balls = balls.filter(b => b.y < H + 30 && b.age < 25);
        for (const p of pegs) { p.cd -= dt; p.glow = Math.max(0, p.glow - dt * 2.5); }
        const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#0f1b3d"); bg.addColorStop(1, "#1c0f3d"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        x.fillStyle = "#cfd6ff"; x.beginPath(); x.moveTo(sx - 22, 0); x.lineTo(sx + 22, 0); x.lineTo(sx + 8, 22); x.lineTo(sx - 8, 22); x.fill();
        x.lineCap = "round";
        for (const p of pegs) {
          const hh = hue(p.k); x.strokeStyle = "hsl(" + hh + ",80%," + Math.round(55 + p.glow * 25) + "%)"; x.lineWidth = (PR + p.glow * 5) * 2; x.beginPath(); x.moveTo(p.x1, p.y1); x.lineTo(p.x2, p.y2); x.stroke();
          x.strokeStyle = "rgba(255,255,255,.35)"; x.lineWidth = PR * .5; x.beginPath(); x.moveTo(p.x1 - PR * .25, p.y1 - PR * .3); x.lineTo(p.x2 - PR * .25, p.y2 - PR * .3); x.stroke();
          if (p.glow > 0) { x.strokeStyle = "hsla(" + hh + ",90%,70%," + p.glow + ")"; x.lineWidth = 3; x.beginPath(); x.arc((p.x1 + p.x2) / 2, (p.y1 + p.y2) / 2, PR + 8 + (1 - p.glow) * 26, 0, 7); x.stroke(); }
        }
        if (drag) { x.strokeStyle = "hsla(" + hue(sel) + ",80%,60%,.6)"; x.lineWidth = PR * 2; x.beginPath(); x.moveTo(drag.x, drag.y); x.lineTo(g.diff === 2 ? drag.x2 : drag.x, g.diff === 2 ? drag.y2 : drag.y); x.stroke(); }
        for (const b of balls) { const bg2 = x.createRadialGradient(b.x - 3, b.y - 3, 1, b.x, b.y, b.r); bg2.addColorStop(0, "#fff"); bg2.addColorStop(1, "#9ad"); x.fillStyle = bg2; x.beginPath(); x.arc(b.x, b.y, b.r, 0, 7); x.fill(); }
        if (!pegs.length) { x.fillStyle = "rgba(255,255,255,.75)"; x.font = "bold 20px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Tap anywhere to place a peg", W / 2, H / 2 + Math.sin(tt * 3) * 4); }
      });
    }
  });

  // ================= 11. Ringtone Maker =================
  B.add({
    id: "s13-ringtone", name: "Ringtone Maker", ages: [6, 20], cat: "Music", color: "#ffa64c", icon: "R",
    desc: "Make a short tune and get a note code you can share with friends.", controls: "Tap the note buttons to build your tune, then Play. Copy the code to share it.",
    start(g) {
      const { c, x, W, H } = g.canvas(640, 220), MAXN = g.by(16, 24, 32);
      const LET = ["C", "D", "E", "F", "G", "A", "B", "C"], BASE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }, NCOL = ["#ff5d73", "#ff9f1c", "#ffd23f", "#2dc653", "#2a9df4", "#7b2cbf", "#ff6fb5", "#ff5d73"];
      let tune = [], oct = 4, sharp = false, long = false, bpm = g.by(100, 120, 140), pl = null, loop = false, lastIdx = -1;
      const midi = n => { const m = /^([A-G])(#?)([2-6])$/.exec(n); return m ? BASE[m[1]] + (m[2] ? 1 : 0) + 12 * (+m[3] + 1) : 60; };
      const str = () => tune.map(t => t.n + (t.d === 2 ? ":2" : "")).join(" ");
      const parse = s => {
        const out = [];
        String(s).trim().split(/\s+/).slice(0, MAXN).forEach(tok => {
          tok = tok.toUpperCase(); let m = /^([A-G])(#?)([2-6])(?::([12]))?$/.exec(tok);
          if (m) out.push({ n: m[1] + m[2] + m[3], d: m[4] === "2" ? 2 : 1 }); else { m = /^R(?::([12]))?$/.exec(tok); if (m) out.push({ n: "R", d: m[1] === "2" ? 2 : 1 }); }
        });
        return out;
      };
      const sv = g.load(); if (sv && typeof sv.s === "string") tune = parse(sv.s);
      const box = g.html(""); box.style.cssText = "margin:4px 8px;padding:8px 12px;border-radius:10px;background:rgba(0,0,0,.35);font:bold 15px ui-monospace,Consolas,monospace;word-break:break-word;max-width:640px;text-align:center;min-height:24px";
      const show = () => { box.textContent = tune.length ? "Tune code: " + str() : "Your tune code will show up here. Tap a note!"; };
      const persist = () => { g.save({ s: str() }); show(); };
      const playNote = t => { if (t.n !== "R") tone(mf(midi(t.n)), g.diff === 0 ? "triangle" : "square", t.d * 60 / bpm * .9, g.diff === 0 ? .3 : .12); };
      const add = (n, d) => { if (tune.length >= MAXN) { g.sfx("wrong"); g.status("Tune is full!"); return; } const t = { n, d }; tune.push(t); g.add(1); playNote(t); persist(); };
      const keypad = g.html(""); keypad.style.cssText = TBCSS;
      LET.forEach((l, i) => {
        const b = document.createElement("button"); b.type = "button"; b.textContent = l + (i === 7 ? "'" : ""); b.style.cssText = "width:56px;height:60px;border:0;border-radius:12px;font:bold 20px system-ui,sans-serif;color:#111;cursor:pointer;background:" + NCOL[i];
        keypad.appendChild(b); g.on(b, "click", () => { const sh = sharp && "CDFGA".includes(l); add(l + (sh ? "#" : "") + (oct + (i === 7 ? 1 : 0)), long ? 2 : 1); });
      });
      const rest = document.createElement("button"); rest.type = "button"; rest.textContent = "Rest"; rest.style.cssText = "width:70px;height:60px;border:0;border-radius:12px;font:bold 16px system-ui,sans-serif;background:#ddd;color:#111;cursor:pointer"; keypad.appendChild(rest); g.on(rest, "click", () => add("R", long ? 2 : 1));
      const items = [];
      if (g.diff >= 1) { items.push(["Octave: 4", b => { oct = oct === 5 ? 3 : oct + 1; b.textContent = "Octave: " + oct; }]); items.push(["Long notes: off", b => { long = !long; b.textContent = long ? "Long notes: on" : "Long notes: off"; act(b, long); }]); }
      if (g.diff === 2) items.push(["Sharps: off", b => { sharp = !sharp; b.textContent = sharp ? "Sharps: on" : "Sharps: off"; act(b, sharp); }]);
      if (items.length) bar(g, items);
      const ctl = bar(g, [
        ["Play", b => { if (pl) { pl = null; b.textContent = "Play"; act(b, false); return; } if (!tune.length) { g.sfx("wrong"); return; } actx(); pl = { i: 0, t: 0, on: false }; b.textContent = "Stop"; act(b, true); }, "play"],
        ["Loop: off", b => { loop = !loop; b.textContent = loop ? "Loop: on" : "Loop: off"; act(b, loop); }],
        ["Undo", () => { tune.pop(); persist(); g.sfx("back"); }],
        ["Clear", () => { tune = []; persist(); g.sfx("back"); }],
        ["Surprise me", () => { const P = [0, 2, 4, 7, 9]; tune = []; let k = 2; const n = g.by(8, 10, 14); for (let i = 0; i < n; i++) { k = g.clamp(k + g.ri(-2, 2), 0, 4); const nm = NN[P[k]] + oct; tune.push({ n: nm, d: g.diff && Math.random() < .3 ? 2 : 1 }); } tune.push({ n: "C" + oct, d: g.diff ? 2 : 1 }); persist(); g.add(1); g.sfx("cheer"); }],
        ["Copy code", () => { try { if (navigator.clipboard && tune.length) navigator.clipboard.writeText(str()).then(() => g.status("Copied!"), () => g.status("Select the code to copy it")); } catch (e) {} }],
        ["Finish", () => g.over("Nice work!")]
      ]);
      if (g.diff >= 1) {
        const bpmBar = bar(g, [["Slower", () => { bpm = g.clamp(bpm - 10, 60, 200); g.status("Tempo " + bpm); }], ["Faster", () => { bpm = g.clamp(bpm + 10, 60, 200); g.status("Tempo " + bpm); }]]);
        const inp = g.html('<input type="text" maxlength="220" placeholder="Paste a tune code here, like C4 E4 G4:2 R" style="width:min(420px,70vw);padding:8px;border-radius:8px;border:2px solid #ffa64c;font:15px ui-monospace,Consolas,monospace">'); inp.style.cssText = "padding:4px 8px;text-align:center";
        const lb = document.createElement("button"); lb.type = "button"; lb.className = "bg-btn"; lb.textContent = "Load tune"; lb.style.marginLeft = "6px"; inp.appendChild(lb);
        g.on(lb, "click", () => { const t = parse(inp.querySelector("input").value); if (t.length) { tune = t; persist(); g.add(1); g.sfx("cheer"); } else g.sfx("wrong"); });
        bpmBar.el.style.paddingTop = "0";
      }
      show();
      g.loop((dt, t) => {
        let cur = -1;
        if (pl) {
          if (pl.i >= tune.length) pl = null;
          else {
            if (!pl.on) { pl.on = true; playNote(tune[pl.i]); }
            cur = pl.i; pl.t += dt;
            if (pl.t >= tune[pl.i].d * 60 / bpm) { pl.t = 0; pl.i++; pl.on = false; if (pl.i >= tune.length) { if (loop) pl.i = 0; else { pl = null; ctl.b.play.textContent = "Play"; act(ctl.b.play, false); } } }
          }
        }
        const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#2a1a10"); gr.addColorStop(1, "#4a2a12"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
        x.strokeStyle = "rgba(255,255,255,.1)"; x.lineWidth = 1; x.beginPath(); for (let i = 0; i < 5; i++) { const yy = 40 + i * 32; x.moveTo(0, yy); x.lineTo(W, yy); } x.stroke();
        let total = 0; tune.forEach(n => { total += n.d; }); const unit = (W - 40) / Math.max(12, total); let px = 20;
        tune.forEach((n, i) => {
          const w = n.d * unit; if (n.n !== "R") {
            const m = midi(n.n), py = H - 24 - (m - 48) / 36 * (H - 50), on = i === cur, k = on ? 6 : 0;
            x.fillStyle = on ? "#fff" : NCOL[LET.indexOf(n.n[0]) % 8]; x.beginPath(); x.roundRect(px + 2 - k / 2, py - 9 - k / 2, w - 4 + k, 18 + k, 9); x.fill();
            if (on) { x.fillStyle = "rgba(255,255,255,.7)"; x.font = "bold 14px system-ui, sans-serif"; x.textAlign = "center"; x.fillText(n.n, px + w / 2, py - 18); }
          } else { x.fillStyle = "rgba(255,255,255,.25)"; x.fillRect(px + 4, H / 2 - 2, w - 8, 4); }
          px += w;
        });
        if (!tune.length) { x.fillStyle = "rgba(255,255,255,.7)"; x.font = "bold 20px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Tap notes below to write your tune", W / 2, H / 2 + Math.sin(t * 3) * 3); x.textBaseline = "alphabetic"; }
      });
    }
  });

  // ================= 12. Stop-Motion Studio =================
  B.add({
    id: "s13-stopmotion", name: "Stop-Motion Studio", ages: [5, 20], cat: "Creative", color: "#5cd1ff", icon: "SM",
    desc: "Move little shape puppets, take a photo, move again, then watch the movie!", controls: "Drag the shapes, press Take photo, repeat. Press Play to watch your movie.",
    start(g) {
      const { c, x, W, H, pos } = g.canvas(640, 360), NK = g.by(3, 4, 5), MAXF = g.by(10, 16, 24), MAXS = g.by(6, 10, 14);
      const COLS = ["#e63946", "#2a9df4", "#ffd23f", "#2dc653", "#ff9f1c", "#b48cff", "#ff6fb5", "#ffffff"].slice(0, g.by(5, 7, 8));
      const KN = ["Circle", "Square", "Triangle", "Star", "Oval"];
      let shapes = [{ k: 0, x: 180, y: 250, s: 44, r: 0, col: COLS[0] }, { k: 2, x: 420, y: 250, s: 44, r: 0, col: COLS[1] }], frames = [], sel = 0, col = COLS[0], drag = null, playing = false, pt = 0, fps = g.by(4, 6, 8), flash = 0, look = { x: 320, y: 100 };
      const okS = s => s && s.k >= 0 && s.k < 5 && [s.x, s.y, s.s, s.r].every(v => typeof v === "number" && isFinite(v)) && typeof s.col === "string";
      const sv = g.load();
      if (sv && sv.d === g.diff && Array.isArray(sv.shapes) && sv.shapes.length && sv.shapes.every(okS)) { shapes = sv.shapes.map(s => ({ k: s.k, x: s.x, y: s.y, s: s.s, r: s.r, col: s.col })); if (Array.isArray(sv.frames)) frames = sv.frames.filter(f => Array.isArray(f) && f.every(okS)).slice(0, MAXF).map(f => f.map(s => ({ k: s.k, x: s.x, y: s.y, s: s.s, r: s.r, col: s.col }))); }
      const persist = () => g.save({ d: g.diff, shapes: shapes.map(s => ({ k: s.k, x: Math.round(s.x), y: Math.round(s.y), s: s.s, r: s.r, col: s.col })), frames: frames.map(f => f.map(s => ({ k: s.k, x: Math.round(s.x), y: Math.round(s.y), s: s.s, r: s.r, col: s.col }))) });
      const path = s => {
        const r = s.s; x.beginPath();
        if (s.k === 0) x.arc(0, 0, r, 0, 7); else if (s.k === 1) x.roundRect(-r * .9, -r * .9, r * 1.8, r * 1.8, r * .2);
        else if (s.k === 2) { x.moveTo(0, -r); x.lineTo(r, r * .8); x.lineTo(-r, r * .8); x.closePath(); }
        else if (s.k === 3) { for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 - Math.PI / 2, rr = i % 2 ? r * .45 : r; if (i) x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); else x.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); } x.closePath(); }
        else x.ellipse(0, 0, r * 1.2, r * .75, 0, 0, 7);
      };
      const drawShape = (s, ghost, selected) => {
        x.save(); x.translate(s.x, s.y); x.rotate(s.r); path(s);
        if (ghost) { x.strokeStyle = "rgba(0,0,0,.28)"; x.lineWidth = 3; x.setLineDash([6, 5]); x.stroke(); x.setLineDash([]); }
        else {
          x.fillStyle = s.col; x.fill(); x.strokeStyle = selected ? "#fff" : "rgba(0,0,0,.4)"; x.lineWidth = selected ? 5 : 3; x.stroke();
          if (selected) { x.strokeStyle = "rgba(0,0,0,.5)"; x.lineWidth = 1.5; x.stroke(); }
          const dx = look.x - s.x, dy = look.y - s.y, d = Math.hypot(dx, dy) || 1, e = s.s * .17;
          [-1, 1].forEach(sg => { const ex = sg * s.s * .3, ey = -s.s * .12; x.fillStyle = "#fff"; x.beginPath(); x.arc(ex, ey, e + 2, 0, 7); x.fill(); x.fillStyle = "#222"; x.beginPath(); x.arc(ex + dx / d * e * .5, ey + dy / d * e * .5, e * .55, 0, 7); x.fill(); });
          x.strokeStyle = "#222"; x.lineWidth = 2.5; x.beginPath(); x.arc(0, s.s * .12, s.s * .22, .3, 2.84); x.stroke();
        }
        x.restore();
      };
      const hitS = p => { for (let i = shapes.length - 1; i >= 0; i--) if (Math.hypot(shapes[i].x - p.x, shapes[i].y - p.y) < shapes[i].s * 1.05) return i; return -1; };
      g.on(c, "pointerdown", e => { if (playing) return; const p = pos(e); look = p; const i = hitS(p); if (i >= 0) { sel = i; drag = { dx: shapes[i].x - p.x, dy: shapes[i].y - p.y }; tone(300, "triangle", .06, .12); try { (()=>{try{c.setPointerCapture(e.pointerId)}catch(_){}})(); } catch (x2) {} } });
      g.on(c, "pointermove", e => { const p = pos(e); look = p; if (drag && shapes[sel]) { shapes[sel].x = g.clamp(p.x + drag.dx, 20, W - 20); shapes[sel].y = g.clamp(p.y + drag.dy, 20, H - 20); } });
      g.on(window, "pointerup", () => { if (drag) { drag = null; persist(); } });
      const cur = () => shapes[sel];
      const photo = () => { if (playing) return; if (frames.length >= MAXF) { g.sfx("wrong"); g.status("Movie is full! Undo or clear photos."); return; } frames.push(shapes.map(s => ({ k: s.k, x: s.x, y: s.y, s: s.s, r: s.r, col: s.col }))); flash = 1; g.add(1); g.sfx("click"); tone(1500, "square", .04, .08); persist(); };
      g.on(window, "keydown", e => {
        if (e.key === " " && !e.repeat) { photo(); return; }
        const s = cur(); if (!s || playing) return; const st = 4;
        if (e.key === "ArrowLeft") s.x = Math.max(20, s.x - st); else if (e.key === "ArrowRight") s.x = Math.min(W - 20, s.x + st); else if (e.key === "ArrowUp") s.y = Math.max(20, s.y - st); else if (e.key === "ArrowDown") s.y = Math.min(H - 20, s.y + st);
      });
      const swc = swatches(g, COLS, 0, cc => { col = cc; if (cur() && !playing) { cur().col = cc; persist(); } });
      const addItems = KN.slice(0, NK).map((n, k) => ["+ " + n, () => { if (playing) return; if (shapes.length >= MAXS) { g.sfx("wrong"); return; } shapes.push({ k, x: g.rf(100, W - 100), y: g.rf(100, H - 100), s: 40, r: 0, col }); sel = shapes.length - 1; g.sfx("pop"); persist(); }]);
      bar(g, addItems);
      const ed = [["Bigger", () => { if (cur() && !playing) { cur().s = Math.min(90, cur().s + 8); persist(); g.sfx("tick"); } }], ["Smaller", () => { if (cur() && !playing) { cur().s = Math.max(20, cur().s - 8); persist(); g.sfx("tick"); } }]];
      if (g.diff >= 1) ed.push(["Turn left", () => { if (cur() && !playing) { cur().r -= .26; persist(); g.sfx("tick"); } }], ["Turn right", () => { if (cur() && !playing) { cur().r += .26; persist(); g.sfx("tick"); } }]);
      ed.push(["Remove shape", () => { if (shapes.length > 1 && !playing) { shapes.splice(sel, 1); sel = 0; persist(); g.sfx("back"); } }]);
      bar(g, ed);
      const ctl = bar(g, [
        ["Take photo", () => photo(), "photo"],
        ["Play movie", b => { if (playing) { playing = false; b.textContent = "Play movie"; act(b, false); return; } if (!frames.length) { g.sfx("wrong"); g.status("Take a photo first!"); return; } playing = true; pt = 0; b.textContent = "Stop"; act(b, true); }, "play"],
        ["Slower", () => { fps = g.clamp(fps - 1, 1, 12); g.status("Speed " + fps + " photos/sec"); }],
        ["Faster", () => { fps = g.clamp(fps + 1, 1, 12); g.status("Speed " + fps + " photos/sec"); }],
        ["Undo photo", () => { frames.pop(); persist(); g.sfx("back"); }],
        ["Clear photos", () => { frames = []; persist(); g.sfx("back"); }],
        ["Save picture", () => { draw(false, true); g.saveImage(c, "my-stop-motion"); }],
        ["Finish", () => g.over("Nice work!")]
      ]);
      ctl.b.photo.style.fontWeight = "bold"; ctl.b.photo.style.background = "#ffd23f"; ctl.b.photo.style.color = "#111";
      const draw = (movie, clean) => {
        const bg = x.createLinearGradient(0, 0, 0, 280); bg.addColorStop(0, "#9bdcff"); bg.addColorStop(1, "#e6f6ff"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
        x.fillStyle = "#c98f5a"; x.fillRect(0, 285, W, H - 285); x.fillStyle = "rgba(0,0,0,.08)"; for (let i = 0; i < 8; i++) x.fillRect(0, 285 + i * 10 + 4, W, 2);
        if (movie) { frames[movie.i].forEach(s => drawShape(s, false, false)); return; }
        if (!clean && frames.length && !playing) frames[frames.length - 1].forEach(s => drawShape(s, true, false));
        shapes.forEach((s, i) => drawShape(s, false, !clean && i === sel));
      };
      g.status("Photos: " + frames.length + "/" + MAXF); let lastN = -1;
      g.loop((dt, t) => {
        if (playing && !frames.length) { playing = false; ctl.b.play.textContent = "Play movie"; act(ctl.b.play, false); }
        if (playing) { pt += dt; const i = Math.floor(pt * fps) % frames.length; draw({ i }); x.fillStyle = "rgba(0,0,0,.55)"; x.font = "bold 14px system-ui, sans-serif"; x.textAlign = "left"; x.textBaseline = "top"; x.fillText("Photo " + (i + 1) + " of " + frames.length, 10, 10); }
        else {
          if (!drag) for (const s of shapes) s.y += Math.sin(t * 2 + s.x) * .05;   // little idle wobble
          draw(null, false);
        }
        if (flash > 0) { x.fillStyle = "rgba(255,255,255," + flash + ")"; x.fillRect(0, 0, W, H); flash = Math.max(0, flash - dt * 4); }
        if (frames.length !== lastN) { lastN = frames.length; g.status("Photos: " + frames.length + "/" + MAXF); }
      });
    }
  });
})();
