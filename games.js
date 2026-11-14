// Mind Lab BREAK TIME GAMES: just-for-fun mini games (nothing to learn here). Ages 5 to college.
// Each game file calls BreakGames.add({ id, name, ages:[min,max], cat, color, desc, controls, start(g) { ... } }).
// g is the toolbox a game gets (see the helpers below); games must use g.loop / g.on / g.timeout so everything is cleaned up when you leave.
(function () {
  const GAMES = [], byId = {};
  const AGE_BANDS = [["all", "Everyone", 0, 99], ["5-7", "Ages 5-7", 5, 7], ["8-10", "Ages 8-10", 8, 10], ["11-13", "Ages 11-13", 11, 13], ["14-17", "Ages 14-17", 14, 17], ["18+", "College", 18, 20]];
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const keyOf = k => (window.mindKey ? window.mindKey(k) : k);
  const lsGet = (k, d) => { try { const v = localStorage.getItem(keyOf(k)); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  const lsSet = (k, v) => { try { localStorage.setItem(keyOf(k), JSON.stringify(v)); } catch (e) {} };
  const DIFFS = ["Easy", "Medium", "Hard"];
  const MAKE = ["Creative", "Build", "Music", "Cozy"];   // games where you make things come first

  function add(def) {
    if (!def || !def.id || byId[def.id] || typeof def.start !== "function") return;
    def.ages = def.ages || [5, 20]; def.cat = def.cat || "Arcade"; def.color = def.color || "#4cc3ff";
    byId[def.id] = def; GAMES.push(def);
  }

  // ---------------- the toolbox handed to each game ----------------
  function makeToolbox(def, root, diff, hud) {
    const cleanups = [], g = { diff, age: lsGet("mindlab-break-age", 10), el: root, def };
    let rafId = 0, alive = true, score = 0, ended = false, last = 0, t0 = 0;
    const best = () => (lsGet("mindlab-break-best", {})[def.id + ":" + diff] || 0);
    g.best = best;
    g.alive = () => alive;
    g.rand = Math.random; g.ri = (a, b) => Math.floor(a + Math.random() * (b - a + 1)); g.rf = (a, b) => a + Math.random() * (b - a);
    g.pick = a => a[Math.floor(Math.random() * a.length)]; g.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    g.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    g.lerp = (a, b, t) => a + (b - a) * t;
    // pick by difficulty: g.by(easy, medium, hard)
    g.by = (e, m, h) => [e, m, h][diff];
    g.sfx = (n, a) => { try { window.MindSfx && window.MindSfx.play(n, a); } catch (e) {} };
    g.el.classList.add("bg-root");
    g.html = (html, cls) => { const d = document.createElement("div"); if (cls) d.className = cls; d.innerHTML = html; root.appendChild(d); return d; };
    g.on = (target, type, fn, opts) => { target.addEventListener(type, fn, opts); cleanups.push(() => target.removeEventListener(type, fn, opts)); };
    g.timeout = (fn, ms) => { const id = setTimeout(() => { if (alive) fn(); }, ms); cleanups.push(() => clearTimeout(id)); return id; };
    g.interval = (fn, ms) => { const id = setInterval(() => { if (alive) fn(); }, ms); cleanups.push(() => clearInterval(id)); return id; };
    // animation loop: fn(dt seconds, total seconds). Return false from fn to stop it.
    g.loop = fn => {
      cancelAnimationFrame(rafId); last = 0; t0 = 0;
      const step = ts => { if (!alive) return; if (!last) { last = ts; t0 = ts; } const dt = Math.min(.05, (ts - last) / 1000); last = ts; if (fn(dt, (ts - t0) / 1000) === false) return; rafId = requestAnimationFrame(step); };
      rafId = requestAnimationFrame(step);
    };
    g.stopLoop = () => cancelAnimationFrame(rafId);
    // a canvas that fits the play area: returns { c, x, W, H, pos(e) }
    g.canvas = (W, H) => {
      W = W || 640; H = H || 400; const c = document.createElement("canvas"), dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = W * dpr; c.height = H * dpr; c.className = "bg-canvas"; c.style.aspectRatio = W + " / " + H; c.style.touchAction = "none"; c.tabIndex = 0;
      root.appendChild(c); const x = c.getContext("2d"); x.scale(dpr, dpr);
      const pos = e => { const r = c.getBoundingClientRect(), t = e.touches && e.touches[0] ? e.touches[0] : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e); return { x: (t.clientX - r.left) * W / r.width, y: (t.clientY - r.top) * H / r.height }; };
      return { c, x, W, H, pos };
    };
    // keys currently held down: g.keys.ArrowLeft etc (also WASD as arrows)
    g.keys = {};
    const MAP = { a: "ArrowLeft", d: "ArrowRight", w: "ArrowUp", s: "ArrowDown", A: "ArrowLeft", D: "ArrowRight", W: "ArrowUp", S: "ArrowDown" };
    g.on(window, "keydown", e => { g.keys[e.key] = true; if (MAP[e.key]) g.keys[MAP[e.key]] = true; });
    g.on(window, "keyup", e => { g.keys[e.key] = false; if (MAP[e.key]) g.keys[MAP[e.key]] = false; });
    g.on(window, "blur", () => { g.keys = {}; });
    // keep what you make: g.save(anyJsonData) / g.load() (per game, on this device)
    g.save = data => lsSet("mindlab-break-save-" + def.id, data); g.load = () => lsGet("mindlab-break-save-" + def.id, null);
    // "Save picture" keeps a small copy of the creation IN THE ACCOUNT (the signed-in profile). Nothing is downloaded as a file.
    g.saveImage = (cv, name) => {
      try {
        const t = document.createElement("canvas"), w = 240, h = Math.max(40, Math.round(240 * cv.height / cv.width)); t.width = w; t.height = h;
        const x = t.getContext("2d"); x.fillStyle = "#0f1340"; x.fillRect(0, 0, w, h); x.drawImage(cv, 0, 0, w, h);
        const list = lsGet("mindlab-break-pics", []).filter(p => p.id !== def.id); list.push({ id: def.id, name: def.name, img: t.toDataURL("image/jpeg", .7), at: Date.now() });
        lsSet("mindlab-break-pics", list.slice(-24));
        const d = document.createElement("div"); d.className = "bg-pop"; d.textContent = window.mindName && window.mindName() !== "Guest" ? "Saved to your account!" : "Saved! (Sign in to keep it in your account)"; d.style.left = "50%"; d.style.top = "20%"; root.appendChild(d); setTimeout(() => d.remove(), 1600);
        g.sfx("star");
      } catch (e) {}
    };
    // score
    g.score = n => { if (n === undefined) return score; score = n; hud.score(score); return score; };
    g.add = n => g.score(score + (n === undefined ? 1 : n));
    g.status = t => hud.status(t);
    // floating text like +10
    g.pop = (text, px, py, color) => { const d = document.createElement("div"); d.className = "bg-pop"; d.textContent = text; d.style.left = px + "px"; d.style.top = py + "px"; if (color) d.style.color = color; root.appendChild(d); setTimeout(() => d.remove(), 900); };
    g.over = (msg, win) => {
      if (ended) return; ended = true; g.stopLoop();
      const all = lsGet("mindlab-break-best", {}), k = def.id + ":" + diff, isBest = score > (all[k] || 0);
      if (isBest) { all[k] = score; lsSet("mindlab-break-best", all); }
      hud.best(Math.max(score, all[k] || 0)); g.sfx(win ? "finish" : "sad");
      const o = document.createElement("div"); o.className = "bg-over";
      o.innerHTML = `<div class="bg-over-card"><h2>${esc(msg || (win ? "You did it!" : "Game over"))}</h2><div class="bg-over-score">Score <b>${score}</b></div>${isBest && score > 0 ? '<div class="bg-newbest">New best!</div>' : ""}<button class="close bg-again" type="button">Play again</button></div>`;
      root.appendChild(o); o.querySelector(".bg-again").onclick = () => hud.restart(); o.querySelector(".bg-again").focus();
    };
    g.win = msg => g.over(msg || "You win!", true);
    g._destroy = () => { alive = false; cancelAnimationFrame(rafId); cleanups.forEach(f => { try { f(); } catch (e) {} }); cleanups.length = 0; };
    return g;
  }

  // ---------------- the games page ----------------
  let cur = null;      // the game being played: { g, def }
  const filt = { band: "all", cat: "All", q: "" };
  const leave = () => { if (cur) { cur.g._destroy(); cur = null; } document.removeEventListener("keydown", stopScroll, true); };
  const stopScroll = e => { if (cur && [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && !/INPUT|SELECT|TEXTAREA/.test((e.target || {}).tagName || "")) e.preventDefault(); };
  const ageOk = (d, b) => b[2] === 0 || (d.ages[0] <= b[3] && d.ages[1] >= b[2]);

  function page() {
    leave();
    const cats = ["All"].concat([...new Set(GAMES.map(d => d.cat))].sort());
    const best = lsGet("mindlab-break-best", {});
    const band = AGE_BANDS.find(b => b[0] === filt.band) || AGE_BANDS[0];
    const list = GAMES.filter(d => ageOk(d, band) && (filt.cat === "All" || d.cat === filt.cat) && (!filt.q || (d.name + " " + d.desc + " " + d.cat).toLowerCase().includes(filt.q)));
    app.innerHTML = `<button class="back" id="bgHome">← All subjects</button>
      <div class="bg-hero"><h1>Break Time Games</h1><p class="sub">${GAMES.length} mini games. Just for fun: nothing to learn here. Ages 5 to college.</p></div>
      <div class="bg-bar"><input id="bgSearch" type="search" placeholder="Search games" value="${esc(filt.q)}" autocomplete="off">
        <div class="bg-chips" id="bgAges">${AGE_BANDS.map(b => `<button type="button" class="bg-chip ${b[0] === filt.band ? "on" : ""}" data-b="${b[0]}">${b[1]}</button>`).join("")}</div>
        <div class="bg-chips" id="bgCats">${cats.map(c => `<button type="button" class="bg-chip ${c === filt.cat ? "on" : ""}" data-c="${esc(c)}">${esc(c)}</button>`).join("")}</div></div>
      ${(() => { const mine = GAMES.filter(d => MAKE.includes(d.cat) && lsGet("mindlab-break-save-" + d.id, null) != null), guest = !window.mindName || window.mindName() === "Guest";
        const pics = lsGet("mindlab-break-pics", []);
        return (pics.length ? `<h2 class="bg-h">Your pictures</h2><div class="bg-pics">${pics.slice().reverse().map(p => `<button type="button" class="bg-pic" data-play="${esc(p.id)}" title="${esc(p.name)}"><img src="${p.img}" alt="${esc(p.name)}"><span>${esc(p.name)}</span></button>`).join("")}</div>` : "") + (mine.length ? `<h2 class="bg-h">Your creations</h2><div class="bg-chips">${mine.map(d => `<button type="button" class="bg-chip bg-mine" data-play="${d.id}" style="border-color:${d.color}">${esc(d.name)}</button>`).join("")}</div>` : "") +
          (guest ? '<p class="note bg-guest">You are playing as a Guest. <b>Sign in</b> (top of the page) and everything you make is saved in your account.</p>' : `<p class="bg-count">Saved in ${esc(window.mindName())}'s account.</p>`); })()}
      <div class="bg-count">${list.length} game${list.length === 1 ? "" : "s"}</div>
      ${list.some(d => MAKE.includes(d.cat)) && list.some(d => !MAKE.includes(d.cat)) ? '<h2 class="bg-h">Make something</h2>' : ""}
      <div class="bg-grid">${list.slice().sort((a, b) => MAKE.includes(b.cat) - MAKE.includes(a.cat)).map((d, i, arr) => (i && !MAKE.includes(d.cat) && MAKE.includes(arr[i - 1].cat) ? '</div><h2 class="bg-h">Play</h2><div class="bg-grid">' : "") + (d => {
        const bs = [0, 1, 2].map(i => best[d.id + ":" + i] || 0), top = Math.max(...bs);
        return `<button type="button" class="bg-card" data-id="${d.id}" style="--c:${d.color}"><span class="bg-ic">${d.icon || esc(d.name.slice(0, 1))}</span><b>${esc(d.name)}</b><small>${esc(d.desc)}</small><em>${esc(d.cat)} · ages ${d.ages[0]}-${d.ages[1] >= 20 ? "college" : d.ages[1]}${top ? " · best " + top : ""}</em></button>`;
      })(d)).join("") || '<p class="note">No games match. Try another age or clear the search.</p>'}</div>`;
    document.getElementById("bgHome").onclick = () => { leave(); home(); };
    document.getElementById("bgSearch").oninput = e => { filt.q = e.target.value.trim().toLowerCase(); const p = e.target.selectionStart; page(); const s = document.getElementById("bgSearch"); s.focus(); try { s.setSelectionRange(p, p); } catch (x) {} };
    document.getElementById("bgAges").onclick = e => { const b = e.target.closest("[data-b]"); if (b) { filt.band = b.dataset.b; page(); } };
    document.getElementById("bgCats").onclick = e => { const b = e.target.closest("[data-c]"); if (b) { filt.cat = b.dataset.c; page(); } };
    app.querySelectorAll(".bg-card").forEach(el => el.onclick = () => play(el.dataset.id));
    app.querySelectorAll("[data-play]").forEach(el => el.onclick = () => play(el.dataset.play));
    window.scrollTo(0, 0);
  }

  function play(id, diff) {
    const def = byId[id]; if (!def) return;
    leave(); diff = diff === undefined ? lsGet("mindlab-break-diff", 1) : diff;
    app.innerHTML = `<button class="back" id="bgBack">← Break Time Games</button>
      <div class="bg-top"><h1>${esc(def.name)}</h1>
        <div class="bg-hud"><span>Score <b id="bgScore">0</b></span><span>Best <b id="bgBest">0</b></span><span id="bgStatus"></span></div></div>
      <div class="bg-ctl"><label>Level <select id="bgDiff">${DIFFS.map((n, i) => `<option value="${i}" ${i === diff ? "selected" : ""}>${n}</option>`).join("")}</select></label>
        <button type="button" class="hintbtn" id="bgRestart">Restart</button><button type="button" class="hintbtn" id="bgFull">Full screen</button></div>
      <div class="bg-stage" id="bgStage" style="--c:${def.color}"></div>
      <p class="bg-how">${esc(def.controls || "Tap or click to play")}</p>`;
    const stage = document.getElementById("bgStage");
    const hud = {
      score: n => { const e = document.getElementById("bgScore"); if (e) { e.textContent = n; e.classList.remove("bump"); void e.offsetWidth; e.classList.add("bump"); } },
      best: n => { const e = document.getElementById("bgBest"); if (e) e.textContent = n; },
      status: t => { const e = document.getElementById("bgStatus"); if (e) e.textContent = t || ""; },
      restart: () => start()
    };
    const start = () => {
      if (cur) cur.g._destroy(); stage.innerHTML = "";
      const g = makeToolbox(def, stage, diff, hud); cur = { g, def }; hud.score(0); hud.status(""); hud.best(g.best());
      try { def.start(g); } catch (e) { console.error("game error", def.id, e); stage.innerHTML = '<p class="note">Oops, this game had a problem. Try another one!</p>'; }
    };
    document.getElementById("bgBack").onclick = page;
    document.getElementById("bgRestart").onclick = start;
    document.getElementById("bgDiff").onchange = e => { diff = +e.target.value; lsSet("mindlab-break-diff", diff); start(); };
    document.getElementById("bgFull").onclick = () => { const f = stage.requestFullscreen || stage.webkitRequestFullscreen; if (f) f.call(stage); };
    document.addEventListener("keydown", stopScroll, true);
    start(); window.scrollTo(0, 0);
  }

  window.BreakGames = { add, all: GAMES, byId, open: page, play, leave, ids: () => GAMES.map(g => g.id) };
})();
