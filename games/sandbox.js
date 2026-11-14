// Break Time Games: the SAND BOX. Over 1,000 materials you unlock by playing, real reactions, quests and toys.
// Loaded before set-9.js so this version of "s9-sand" is the one that shows up.
(function () {
  const B = window.BreakGames; if (!B) return;

  // ---------------- materials ----------------
  // kind: P powder, L liquid, G gas, S solid, F fire, V life (plants/vines, grow on water)
  const M = [null], BY = {};
  const hex = c => { const n = parseInt(c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const mix = (a, b, t) => { const x = hex(a), y = hex(b); return "#" + [0, 1, 2].map(i => Math.round(x[i] + (y[i] - x[i]) * t).toString(16).padStart(2, "0")).join(""); };
  function def(name, col, kind, d, o) { const m = Object.assign({ name, col, kind, d, rgb: hex(col), fx: "", flam: 0 }, o || {}); m.id = M.length; M.push(m); BY[name] = m.id; return m.id; }
  // --- core materials (the first ones you meet) ---
  def("Sand", "#e6c47a", "P", 5); def("Water", "#3a8fe0", "L", 3); def("Stone", "#7d7d86", "S", 9); def("Wood", "#8b5a2b", "S", 9, { flam: .5 });
  def("Fire", "#ff8a2a", "F", 0, { heat: 1 }); def("Plant", "#3fae57", "V", 9, { flam: .4 }); def("Dirt", "#7a5230", "P", 5); def("Oil", "#3b2a1a", "L", 2, { flam: .8 });
  def("Steam", "#dfe9f5", "G", 1, { life: 1 }); def("Smoke", "#585b66", "G", 1, { life: 1 }); def("Lava", "#ff5a1f", "L", 6, { heat: 1, glow: 1 }); def("Ice", "#cfeaff", "S", 9, { cold: 1 });
  def("Snow", "#ffffff", "P", 2); def("Glass", "#bfe9ff", "S", 9); def("Metal", "#aab4c4", "S", 9); def("Salt", "#f4f4f4", "P", 5);
  def("Gunpowder", "#4a4a52", "P", 5, { boom: 1, flam: 1 }); def("Coal", "#25252b", "P", 5, { flam: .08 }); def("Ash", "#8d8d93", "P", 2); def("Acid", "#7dff3a", "L", 4, { acid: 1, glow: 1 });
  def("Slime", "#6be28f", "L", 4, { sticky: 1 }); def("Mud", "#5a3d24", "L", 5, { sticky: 1 }); def("Honey", "#f5b21b", "L", 4, { sticky: 1 }); def("Seed", "#b7d36b", "P", 4, { seed: 1 });
  def("Gold", "#ffd34e", "P", 9); def("Glitter", "#ff7ad9", "P", 3, { fx: "sparkle" }); def("Clay", "#c97b5a", "P", 5); def("Mercury", "#b9bdd0", "L", 8);
  def("Milk", "#fff7ea", "L", 3); def("Ink", "#1b1240", "L", 3); def("Juice", "#ff8a2a", "L", 3); def("Brick", "#b5483a", "S", 9); def("Swamp Gas", "#b6ffb0", "G", 1, { flam: 1, boom: 1 }); def("Bubbles", "#bdf3ff", "G", 1, { life: 1 });
  def("Wall", "#3a3a48", "S", 99, { wall: 1 }); def("Moss", "#6aa04a", "V", 9, { flam: .3 }); def("Flower", "#ff6fb5", "V", 9, { flam: .4 }); def("Rainbow Fluid", "#ffffff", "L", 3, { fx: "rainbow" });
  def("Lightning Dust", "#8fd0ff", "P", 3, { fx: "zap", glow: 1 }); def("Moon Rock", "#b9b4c9", "S", 9); def("Star Dust", "#fff0a0", "P", 2, { fx: "sparkle" }); def("Rubber Balls", "#ff5a7a", "P", 4, { fx: "bounce" });
  const CORE = M.length - 1;
  // --- 1,040 generated materials: 52 styles x 20 kinds of stuff ---
  const STYLES = [["Frosty", "freeze", "#9fe3ff"], ["Icy", "freeze", "#bff0ff"], ["Chilly", "freeze", "#a8d8ff"], ["Fiery", "heat", "#ff6a2a"], ["Blazing", "heat", "#ff8a2a"], ["Molten", "heat", "#ff5a1f"], ["Glowing", "glow", "#ffe27a"], ["Neon", "glow", "#7dff3a"], ["Shiny", "glow", "#fff4b0"], ["Rainbow", "rainbow", "#ffffff"], ["Disco", "confetti", "#ffffff"], ["Party", "confetti", "#ffffff"], ["Sticky", "sticky", "#c2f542"], ["Gooey", "sticky", "#6be28f"], ["Bouncy", "bounce", "#ff6fb5"], ["Springy", "bounce", "#ffb36f"], ["Explosive", "boom", "#ff4d4d"], ["Boom", "boom", "#ff7a4d"], ["Sparkly", "sparkle", "#ffd34e"], ["Twinkly", "sparkle", "#fff0a0"], ["Electric", "zap", "#5ec8ff"], ["Shocking", "zap", "#b48cff"], ["Growing", "grow", "#55d36f"], ["Leafy", "grow", "#3fae57"], ["Spreading", "spread", "#d36fff"], ["Viral", "spread", "#7dff7d"], ["Fizzy", "fizz", "#8ef0ff"], ["Bubbly", "fizz", "#b9f6ff"], ["Misty", "evap", "#dfe9f5"], ["Dreamy", "evap", "#d6c4ff"], ["Heavy", "dense", "#666677"], ["Golden", "", "#ffd34e"], ["Silver", "", "#cfd6e4"], ["Ruby", "", "#e0314f"], ["Emerald", "", "#1fbf6b"], ["Sapphire", "", "#2a5bd7"], ["Amethyst", "", "#9b59d6"], ["Pink", "", "#ff9ad0"], ["Blue", "", "#4aa3ff"], ["Green", "", "#5bd26b"], ["Purple", "", "#a56bff"], ["Orange", "", "#ff9a3c"], ["Teal", "", "#2ec4b6"], ["Lime", "", "#b6f23a"], ["Mint", "", "#9ef0c6"], ["Cherry", "", "#d1163f"], ["Lemon", "", "#fff04a"], ["Berry", "", "#8a2be2"], ["Chocolate", "", "#6b3e26"], ["Candy", "", "#ff7ab8"], ["Cosmic", "glow", "#5a4bff"], ["Peachy", "", "#ffb28a"]];
  const BASES = [["Sand", "P", 5, "#e6c47a"], ["Dust", "P", 2, "#bbbbbb"], ["Gravel", "P", 6, "#8a8a8a"], ["Beads", "P", 5, "#ffd0e0"], ["Sprinkles", "P", 3, "#ff8ad0"], ["Crystals", "P", 6, "#cfe9ff"], ["Powder", "P", 3, "#eeeeee"], ["Pebbles", "P", 7, "#9a8f80"], ["Juice", "L", 3, "#ff8a2a"], ["Goo", "L", 4, "#6be28f"], ["Syrup", "L", 4, "#c88a2a"], ["Nectar", "L", 3, "#ffcf5a"], ["Soup", "L", 4, "#d9a066"], ["Vapor", "G", 1, "#dfe9f5"], ["Cloud", "G", 1, "#f2f6ff"], ["Breeze", "G", 1, "#bfe9ff"], ["Block", "S", 9, "#999999"], ["Crystal", "S", 9, "#99ddee"], ["Metal", "S", 9, "#aab4c4"], ["Vine", "V", 9, "#3fae57"]];
  const GEN = [];
  STYLES.forEach((s, si) => BASES.forEach((b, bi) => GEN.push([si, bi])));
  // a fixed shuffle so unlocks are a surprise but always the same order
  let seed = 20240607; const rnd0 = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
  for (let i = GEN.length - 1; i > 0; i--) { const j = Math.floor(rnd0() * (i + 1)); [GEN[i], GEN[j]] = [GEN[j], GEN[i]]; }
  GEN.forEach(([si, bi]) => {
    const s = STYLES[si], b = BASES[bi], fx = s[1];
    def(s[0] + " " + b[0], mix(b[3], s[2], .68), b[1], b[2] + (fx === "dense" ? 3 : 0), { fx, heat: fx === "heat" ? 1 : 0, cold: fx === "freeze" ? 1 : 0, boom: fx === "boom" ? 1 : 0, sticky: fx === "sticky" ? 1 : 0, glow: fx === "glow" ? 1 : 0, flam: b[1] === "V" ? .3 : 0, life: b[1] === "G" ? 1 : 0, gen: 1 });
  });
  const TOTAL = M.length - 1, START = 9;
  // --- 100 BOMBS (their own tab). Row: name | colour | P falls / S stays put | trigger | blast shape | size | what it leaves | fuse
  // triggers: F fire, T lands/hits something, W water, I timer, A touched by anything, C cold, P plants, S sand, O oil, X acid, M metal/stone
  // shapes: c circle, d diamond, q square, p plus, x cross, h row, v column, o ring, D shaft down, U geyser up, s scatter, t star
  const BOMB_ROWS = `TNT|#d9382b|P|F|c|6|fire
Mini TNT|#e85d4a|P|F|c|3|fire
Mega TNT|#a01818|P|F|c|12|fire
Super TNT|#7a0f0f|P|F|c|18|fire
Dynamite|#c0392b|P|I|c|7|fire|90
Short Fuse Dynamite|#e0553a|P|I|c|5|fire|40
Long Fuse Dynamite|#8e2b20|P|I|c|9|fire|240
Firecracker|#ff4d4d|P|F|c|2|fire
Cherry Bomb|#d1163f|P|T|c|4|fire
Black Bomb|#2a2a30|P|T|c|6|fire
Round Bomb|#3a3a44|P|I|c|6|fire|120
Impact Bomb|#55555f|P|T|c|8|fire
Mega Impact Bomb|#44444e|P|T|c|14|fire
Ticker Bomb|#c9a227|P|I|c|5|fire|60
Land Mine|#6b6b3a|S|A|c|7|fire
Pressure Mine|#7d7d4a|S|A|d|8|fire
Sticky Mine|#6be28f|S|A|c|6|slime
Ice Mine|#9fe3ff|S|A|d|7|ice
Gold Mine|#ffd34e|S|A|c|5|gold
Rainbow Mine|#ff9ad0|S|A|c|7|rain
Mud Mine|#6b4a2e|S|A|c|6|mud
Acid Mine|#7dff3a|S|A|c|6|acid
Flower Mine|#ff6fb5|S|A|c|7|flower
Sea Mine|#3a6fd0|S|W|c|9|water
Deep Mine|#444466|S|A|D|16|clr
Water Balloon|#3a8fe0|P|T|c|5|water
Big Water Balloon|#2a6fc0|P|T|c|9|water
Splash Bomb|#5fb0ff|P|W|c|7|water
Flood Bomb|#1f5fb0|P|W|h|1|water
Ice Bomb|#bfe9ff|P|T|c|6|ice
Snow Bomb|#ffffff|P|T|c|7|snow
Blizzard Bomb|#dff3ff|P|T|s|10|snow
Freeze Bomb|#8fd6ff|P|C|c|8|ice
Cold Snap Bomb|#a8d8ff|P|C|c|7|fire
Lava Bomb|#ff5a1f|P|F|c|5|lava
Magma Bomb|#e03a10|P|F|c|9|lava
Volcano Bomb|#b02a0a|P|T|U|22|lava
Glass Bomb|#bfe9ff|P|F|c|6|glass
Crystal Bomb|#99ddee|P|F|s|8|glass
Confetti Bomb|#ff6fb5|P|T|c|7|conf
Party Popper|#ffb36f|P|T|U|16|conf
Glitter Bomb|#ff7ad9|P|T|c|6|glit
Rainbow Bomb|#ffffff|P|T|c|8|rain
Star Bomb|#fff0a0|P|T|t|10|star
Disco Bomb|#b48cff|P|I|s|9|conf|100
Smoke Bomb|#585b66|P|T|c|8|smoke
Stink Bomb|#9fd36b|P|T|c|7|gas
Steam Bomb|#dfe9f5|P|T|c|7|steam
Fog Bomb|#cfd8e6|P|T|c|12|steam
Bubble Bomb|#bdf3ff|P|T|c|8|bub
Seed Bomb|#b7d36b|P|T|c|6|seed
Flower Bomb|#ff8ac8|P|T|c|7|flower
Moss Bomb|#6aa04a|P|T|c|6|moss
Forest Bomb|#3fae57|P|T|c|9|plant
Vine Bomb|#2f8f4a|P|T|D|15|plant
Sand Bomb|#e6c47a|P|T|c|7|sand
Mud Bomb|#5a3d24|P|T|c|6|mud
Slime Bomb|#6be28f|P|T|c|7|slime
Honey Bomb|#f5b21b|P|T|c|6|honey
Oil Bomb|#3b2a1a|P|T|c|7|oil
Milk Bomb|#fff7ea|P|T|c|6|milk
Ink Bomb|#1b1240|P|T|c|7|ink
Salt Bomb|#f4f4f4|P|T|c|6|salt
Gold Bomb|#ffd34e|P|T|c|5|gold
Metal Bomb|#aab4c4|P|T|c|6|metal
Brick Bomb|#b5483a|P|T|q|6|brick
Stone Bomb|#7d7d86|P|T|q|5|stone
Coal Bomb|#25252b|P|T|c|6|coal
Ash Bomb|#8d8d93|P|F|c|7|ash
Clay Bomb|#c97b5a|P|T|c|6|clay
Dirt Bomb|#7a5230|P|T|c|7|dirt
Moon Rock Bomb|#b9b4c9|P|T|c|6|moon
Rubber Bomb|#ff5a7a|P|T|c|6|rubber
Mercury Bomb|#b9bdd0|P|T|c|6|mercury
Acid Bomb|#7dff3a|P|T|c|6|acid
Laser Bomb|#ff3d3d|P|I|h|1|fire|60
Pillar Bomb|#ff7a3d|P|I|v|1|fire|60
Cross Bomb|#e04a2a|P|F|p|12|fire
X Bomb|#c03a2a|P|F|x|12|fire
Ring Bomb|#ff9a3c|P|F|o|10|fire
Diamond Bomb|#6fd0ff|P|F|d|9|fire
Square Bomb|#d0a030|P|F|q|6|fire
Star Burst Bomb|#ffd34e|P|F|t|12|fire
Scatter Bomb|#d05a2a|P|F|s|10|fire
Cluster Bomb|#a04a2a|P|T|s|8|fire
Drill Bomb|#8a8a9a|P|T|D|40|clr
Tunnel Bomb|#6a6a7a|P|I|D|30|clr|50
Rocket Bomb|#e8e8f0|P|F|U|30|clr
Geyser Bomb|#5fb0ff|P|T|U|24|water
Black Hole Bomb|#101018|P|T|c|10|clr
Vacuum Bomb|#303040|S|A|c|12|clr
Eraser Bomb|#ffd0e0|P|T|q|8|clr
Wet Bomb|#4aa0e0|P|W|c|6|fire
Sour Bomb|#b6e03a|P|X|c|6|fire
Garden Bomb|#4fbf6a|P|P|c|7|fire
Sand Trap Bomb|#d8b46a|P|S|c|7|fire
Oil Slick Bomb|#4a3a2a|P|O|c|9|fire
Magnet Bomb|#8a8aa0|P|M|c|6|fire
Mega Blast|#ff2a2a|P|T|c|20|fire
Giga Boom|#ff0a0a|P|I|c|26|fire|200`;
  const BOMBS = [];
  BOMB_ROWS.trim().split("\n").forEach(r => { const f = r.split("|"); BOMBS.push(def(f[0], f[1], f[2], 5, { bomb: { t: f[3], sh: f[4], r: +f[5], fill: f[6], f: +(f[7] || 0) } })); });
  const FILLS = { glass: "Glass", water: "Water", lava: "Lava", ice: "Ice", snow: "Snow", plant: "Plant", slime: "Slime", sand: "Sand", rain: "Rainbow Fluid", acid: "Acid", oil: "Oil", honey: "Honey", mud: "Mud", stone: "Stone", gold: "Gold", bub: "Bubbles", steam: "Steam", star: "Star Dust", glit: "Glitter", ash: "Ash", smoke: "Smoke", dirt: "Dirt", metal: "Metal", coal: "Coal", milk: "Milk", ink: "Ink", salt: "Salt", clay: "Clay", moss: "Moss", flower: "Flower", seed: "Seed", brick: "Brick", rubber: "Rubber Balls", mercury: "Mercury", gas: "Swamp Gas", moon: "Moon Rock" };
  const TRIG = { F: "fire", T: "landing", W: "water", I: "timer", A: "touch", C: "cold", P: "plants", S: "sand", O: "oil", X: "acid", M: "metal" };   // you begin with the first 9 core materials unlocked
  const ID = n => BY[n];
  const KIND_NAME = { P: "Powders", L: "Liquids", G: "Gases", S: "Solids", F: "Fire", V: "Living" };

  B.add({
    id: "s9-sand", name: "Sand Box", ages: [5, 20], cat: "Creative", color: "#e6c47a", icon: "S",
    desc: TOTAL + " materials to unlock plus 100 bombs, with fire, ice, acid, explosions and growing plants.", controls: "Paint with the mouse or finger. Fill the star bar to unlock new materials. Finish when you are done.",
    start(g) {
      const CS = g.by(5, 4, 4), W = Math.floor(640 / CS), H = Math.floor(400 / CS);
      const cells = new Uint16Array(W * H), aux = new Uint8Array(W * H), stamp = new Uint8Array(W * H), fuse = new Uint16Array(W * H);
      const { c, x, pos } = g.canvas(W * CS, H * CS), small = document.createElement("canvas"); small.width = W; small.height = H;
      const sx = small.getContext("2d"), img = sx.createImageData(W, H), px = img.data;
      const NEED0 = g.by(220, 320, 480), need = () => NEED0 * Math.min(1, .25 + unlocked / 250);   // paint this much to unlock the next material
      let unlocked = START, xp = 0, placed = 0, sel = ID("Sand"), size = g.by(4, 3, 2), shape = "round", tool = "paint", paused = false, rain = false, wind = 0, gy = 1, frame = 0, down = false, mp = { x: 0, y: 0 }, cat = "All", page = 0, query = "";
      const used = new Set(), quests = [["steam", "Make steam"], ["grow", "Grow a plant"], ["ice", "Freeze water"], ["boom", "Make an explosion"], ["glass", "Melt sand into glass"], ["rain", "Make it rain"], ["paint", "Paint 2000 pieces"], ["mix", "Use 8 different materials"], ["bombs", "Set off 10 different bombs"]], done = {};
      const saved = g.load(); if (saved) { unlocked = Math.max(START, Math.min(TOTAL, saved.u || START)); xp = saved.xp || 0; placed = saved.p || 0; Object.assign(done, saved.q || {}); if (saved.s && saved.s <= unlocked) sel = saved.s; }
      const R = n => Math.floor(Math.random() * n), inb = (a, b) => a >= 0 && b >= 0 && a < W && b < H;
      const setc = (i, id) => { cells[i] = id; aux[i] = id && M[id].kind === "F" ? 20 + R(30) : R(256); fuse[i] = id && M[id].bomb ? M[id].bomb.f : 0; };
      const quest = k => { if (done[k]) return; done[k] = 1; unlock(3); g.sfx("cheer"); g.pop("Quest done! +3 new materials", 320, 40, "#6be28f"); drawQuests(); };
      function unlock(n) { const before = unlocked; unlocked = Math.min(TOTAL, unlocked + n); if (unlocked > before) { g.sfx("star"); g.pop("New: " + M[unlocked].name + (n > 1 ? " and more!" : "!"), 320, 70, "#ffd34e"); drawPal(); } }
      const earn = n => { xp += n; while (xp >= need() && unlocked < TOTAL) { xp -= need(); unlock(1); } if (unlocked >= TOTAL) xp = 0; bar(); };

      // ---------- screen ----------
      const top = g.html('<div class="sb-bar"></div>', "sb-wrap"); const bar0 = top.firstChild;
      const mk = (t, fn, cls) => { const b = document.createElement("button"); b.type = "button"; b.className = "bg-btn sb-b " + (cls || ""); b.textContent = t; b.onclick = fn; bar0.appendChild(b); return b; };
      const bShape = mk("Round", () => { shape = shape === "round" ? "square" : shape === "square" ? "spray" : "round"; bShape.textContent = shape[0].toUpperCase() + shape.slice(1); });
      mk("Smaller", () => { size = Math.max(1, size - 1); sz.textContent = "Brush " + size; }); const sz = mk("Brush " + size, () => {}, "sb-dim"); mk("Bigger", () => { size = Math.min(12, size + 1); sz.textContent = "Brush " + size; });
      const bErase = mk("Eraser", () => { tool = tool === "erase" ? "paint" : "erase"; mode(); }); const bBolt = mk("Lightning", () => { tool = tool === "bolt" ? "paint" : "bolt"; mode(); });
      const bPause = mk("Pause", () => { paused = !paused; bPause.textContent = paused ? "Play" : "Pause"; });
      const bRain = mk("Rain", () => { rain = !rain; bRain.classList.toggle("sb-on", rain); if (rain) quest("rain"); });
      const bWind = mk("Wind: off", () => { wind = wind === 0 ? 1 : wind === 1 ? -1 : 0; bWind.textContent = "Wind: " + (wind === 0 ? "off" : wind > 0 ? "right" : "left"); });
      const bGrav = mk("Gravity: down", () => { gy = -gy; bGrav.textContent = "Gravity: " + (gy > 0 ? "down" : "up"); g.sfx("swish"); });
      mk("Shake", () => { for (let k = 0; k < 600; k++) { const a = R(W), b = R(H), i = a + b * W, na = a + R(3) - 1, nb = b + R(3) - 1; if (cells[i] && M[cells[i]].kind !== "S" && inb(na, nb) && !cells[na + nb * W]) { cells[na + nb * W] = cells[i]; aux[na + nb * W] = aux[i]; cells[i] = 0; } } g.sfx("rumble"); });
      mk("Meteors", () => { for (let k = 0; k < 7; k++) g.timeout(() => { const a = 3 + R(W - 6); for (let u = 0; u < 3; u++) for (let v = 0; v < 3; v++) if (!cells[a + u + v * W]) setc(a + u + v * W, ID("Lava")); g.sfx("launch"); }, k * 220); });
      mk("Clear", () => { cells.fill(0); g.sfx("swish"); });
      mk("Finish", () => { persist(); g.over("You made a sandy masterpiece!", true); });
      const sel0 = g.html('<div class="sb-sel"></div>', "sb-wrap").firstChild;
      const xpwrap = g.html('<div class="sb-xp"><div class="sb-xpbar"><i></i></div><span></span></div>', "sb-wrap"), xpi = xpwrap.querySelector("i"), xpt = xpwrap.querySelector("span");
      function bar() { xpi.style.width = Math.min(100, xp / need() * 100) + "%"; xpt.textContent = unlocked + " / " + TOTAL + " materials unlocked" + (unlocked < TOTAL ? " · next: ???" : " · you have them all!"); g.score(unlocked); }
      function mode() { bErase.classList.toggle("sb-on", tool === "erase"); bBolt.classList.toggle("sb-on", tool === "bolt"); showSel(); }
      function showSel() { const m = M[sel]; sel0.innerHTML = '<span class="sb-sw" style="background:' + m.col + '"></span> ' + (tool === "erase" ? "Eraser" : tool === "bolt" ? "Lightning: tap the sky!" : m.name) + (tool === "paint" ? ' <em>' + (m.bomb ? "Bomb · goes off by " + (TRIG[m.bomb.t] || "fire") + (m.bomb.t === "I" ? " (timer)" : "") : (KIND_NAME[m.kind] || "") + (m.fx ? " · " + m.fx : "")) + "</em>" : ""); g.status(tool === "paint" ? m.name : tool); }
      const palwrap = g.html('<div class="sb-pal"><div class="sb-tabs"></div><input class="sb-search" type="search" placeholder="Search your materials" autocomplete="off"><div class="sb-grid"></div><div class="sb-pg"></div></div>', "sb-wrap"), tabs = palwrap.querySelector(".sb-tabs"), grid = palwrap.querySelector(".sb-grid"), pg = palwrap.querySelector(".sb-pg");
      palwrap.querySelector(".sb-search").oninput = e => { query = e.target.value.trim().toLowerCase(); page = 0; drawPal(); };
      const CATS = ["All", "Bombs", "New", "Powders", "Liquids", "Gases", "Solids", "Fire", "Living", "Special"];
      CATS.forEach(n => { const b = document.createElement("button"); b.type = "button"; b.className = "sb-tab"; b.textContent = n; b.onclick = () => { cat = n; page = 0; drawPal(); }; tabs.appendChild(b); });
      function drawPal() {
        let list = []; for (let i = 1; i <= unlocked; i++) list.push(i);
        if (cat === "Bombs") list = BOMBS.slice();
        if (cat === "Bombs") { } else if (cat === "New") list = list.slice(-24).reverse(); else if (cat === "Special") list = list.filter(i => M[i].fx); else if (cat !== "All") list = list.filter(i => KIND_NAME[M[i].kind] === cat);
        if (query) list = (query && cat === "All" ? list.concat(BOMBS) : list).filter(i => M[i].name.toLowerCase().includes(query));
        const per = 40, pages = Math.max(1, Math.ceil(list.length / per)); page = Math.min(page, pages - 1);
        tabs.childNodes.forEach(b => b.classList.toggle("sb-on", b.textContent === cat));
        grid.innerHTML = ""; list.slice(page * per, page * per + per).forEach(i => { const b = document.createElement("button"); b.type = "button"; b.className = "sb-m" + (i === sel && tool === "paint" ? " sb-on" : ""); b.title = M[i].name; b.innerHTML = '<span style="background:' + M[i].col + '"></span><b>' + M[i].name + "</b>"; b.onclick = () => { sel = i; tool = "paint"; mode(); drawPal(); g.sfx("pick"); }; grid.appendChild(b); });
        if (!list.length) grid.innerHTML = '<p class="sb-none">Nothing here yet. Keep painting to unlock more!</p>';
        pg.innerHTML = ""; if (pages > 1) { const p = document.createElement("button"), n = document.createElement("button"); p.className = n.className = "bg-btn sb-b"; p.type = n.type = "button"; p.textContent = "Back"; n.textContent = "More"; p.onclick = () => { page = (page + pages - 1) % pages; drawPal(); }; n.onclick = () => { page = (page + 1) % pages; drawPal(); }; const t = document.createElement("span"); t.textContent = " page " + (page + 1) + " of " + pages + " "; pg.append(p, t, n); }
      }
      const qwrap = g.html('<div class="sb-q"></div>', "sb-wrap"), qbox = qwrap.firstChild;
      function drawQuests() { qbox.innerHTML = "<b>Quests</b> " + quests.map(q => '<span class="' + (done[q[0]] ? "sb-qd" : "") + '">' + (done[q[0]] ? "✓ " : "") + q[1] + "</span>").join(" "); }
      // the canvas goes between the tools and the palette
      top.after(c); mode(); drawPal(); drawQuests(); bar();

      // ---------- painting ----------
      function put(a, b) {
        const m = M[sel], erase = tool === "erase"; let n = 0;
        for (let dy = -size; dy <= size; dy++) for (let dx = -size; dx <= size; dx++) {
          if (shape === "round" && dx * dx + dy * dy > size * size + 1) continue;
          if (shape === "spray" && Math.random() > .3) continue;
          const X = a + dx, Y = b + dy; if (!inb(X, Y)) continue; const i = X + Y * W;
          if (erase) { if (cells[i] && !M[cells[i]].wall) cells[i] = 0; continue; }
          const k0 = cells[i]; if (!k0 || ((m.kind === "S" || m.kind === "F") && !M[k0].wall)) { setc(i, sel); n++; }
        }
        if (n) { placed += n; earn(Math.ceil(n / 10)); used.add(sel); if (used.size >= 8) quest("mix"); if (placed >= 2000) quest("paint"); if (frame % 5 === 0) g.sfx(m.kind === "L" ? "splash" : m.kind === "G" ? "hum" : "tick"); }
      }
      function bolt(a, b) {
        for (let y = 0; y <= b; y++) { const i = a + y * W; if (inb(a, y) && !(cells[i] && M[cells[i]].wall)) { setc(i, ID("Fire")); aux[i] = 6; } }
        boom(a, b, 4); g.sfx("boom");
      }
      const pt = e => { const p = pos(e); return { x: Math.floor(p.x / CS), y: Math.floor(p.y / CS) }; };
      g.on(c, "pointerdown", e => { down = true; mp = pt(e); if (tool === "bolt") bolt(mp.x, mp.y); });
      g.on(c, "pointermove", e => { mp = pt(e); });
      g.on(window, "pointerup", () => { down = false; });
      g.on(window, "keydown", e => { if (e.key === " " && /CANVAS|BODY/.test((document.activeElement || {}).tagName || "BODY")) { paused = !paused; bPause.textContent = paused ? "Play" : "Pause"; } });
      g.interval(persist, 5000);
      function persist() { g.save({ u: unlocked, xp, p: placed, q: done, s: sel }); }

      // ---------- the world ----------
      // ---------- bombs ----------
      let shake = 0; const blasted = new Set();
      function fillCell(i, fill) {
        if (fill === "clr") { cells[i] = 0; return; }
        if (fill === "fire") { const q = Math.random(); if (q < .55) { setc(i, ID("Fire")); } else if (q < .8) setc(i, ID("Smoke")); else cells[i] = 0; return; }
        if (fill === "conf") { setc(i, ID(["Rainbow Fluid", "Glitter", "Star Dust", "Gold"][R(4)])); return; }
        if (Math.random() < .88) setc(i, ID(FILLS[fill] || "Smoke")); else cells[i] = 0;
      }
      function detonate(a, b, sp, name) {
        const r = sp.r; if (name && !blasted.has(name)) { blasted.add(name); if (blasted.size >= 10) quest("bombs"); }
        quest("boom"); shake = Math.min(12, 2 + r * .5);
        const hit = (X, Y) => {
          if (!inb(X, Y)) return; const i = X + Y * W, k = cells[i]; if (k && M[k].wall) return;
          if (k && M[k].bomb) { const sp2 = M[k].bomb, nm = M[k].name; cells[i] = 0; g.timeout(() => detonate(X, Y, sp2, nm), 50 + R(120)); return; }
          fillCell(i, sp.fill);
        };
        const sh = sp.sh;
        if (sh === "c") { for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (dx * dx + dy * dy <= r * r) hit(a + dx, b + dy); }
        else if (sh === "d") { for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (Math.abs(dx) + Math.abs(dy) <= r) hit(a + dx, b + dy); }
        else if (sh === "q") { for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) hit(a + dx, b + dy); }
        else if (sh === "p") { for (let k = -r * 2; k <= r * 2; k++) for (let w = -1; w <= 1; w++) { hit(a + k, b + w); hit(a + w, b + k); } }
        else if (sh === "x") { for (let k = -r * 2; k <= r * 2; k++) for (let w = 0; w <= 1; w++) { hit(a + k + w, b + k); hit(a + k + w, b - k); } }
        else if (sh === "h") { for (let X = 0; X < W; X++) for (let w = -1; w <= 1; w++) hit(X, b + w); }
        else if (sh === "v") { for (let Y = 0; Y < H; Y++) for (let w = -1; w <= 1; w++) hit(a + w, Y); }
        else if (sh === "o") { for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const d2 = dx * dx + dy * dy; if (d2 <= r * r && d2 >= (r - 2) * (r - 2)) hit(a + dx, b + dy); } }
        else if (sh === "D") { for (let k = 0; k <= r; k++) for (let w = -1; w <= 1; w++) hit(a + w, b + k * gy); }
        else if (sh === "U") { for (let k = 0; k <= r; k++) for (let w = -1; w <= 1; w++) hit(a + w, b - k * gy); }
        else if (sh === "s") { for (let k = 0; k < r * r * 2; k++) { const an = Math.random() * 6.283, d = Math.random() * r; hit(a + Math.round(Math.cos(an) * d), b + Math.round(Math.sin(an) * d)); } }
        else if (sh === "t") { for (let q = 0; q < 8; q++) { const an = q * .7854; for (let k = 0; k <= r * 1.6; k++) hit(a + Math.round(Math.cos(an) * k), b + Math.round(Math.sin(an) * k)); } hit(a, b); }
        g.sfx(r < 5 ? "pop" : "boom");
      }
      // does this bomb go off this frame? (true = it exploded)
      function bombCheck(a, y, i, m) {
        const sp = m.bomb, t = sp.t;
        if (t === "I") { if (fuse[i] > 0) fuse[i]--; if (fuse[i] === 0 && (aux[i] & 1 || true)) { cells[i] = 0; detonate(a, y, sp, m.name); return true; } return false; }
        if (t === "T") { fuse[i] = Math.min(60000, fuse[i] + 1); const below = inb(a, y + gy) ? cells[a + (y + gy) * W] : 1; if (fuse[i] > 25 && below && below !== cells[i]) { cells[i] = 0; detonate(a, y, sp, m.name); return true; } return false; }
        const d = [[1, 0], [-1, 0], [0, 1], [0, -1]][R(4)], X = a + d[0], Y = y + d[1]; if (!inb(X, Y)) return false; const k = cells[X + Y * W]; if (!k || k === cells[i]) return false; const T = M[k]; let go = false;
        if (t === "F") go = T.heat || T.kind === "F"; else if (t === "W") go = T.name === "Water"; else if (t === "A") go = fuse[i] < 1 && !T.wall; else if (t === "C") go = T.cold || T.name === "Snow" || T.name === "Ice";
        else if (t === "P") go = T.kind === "V"; else if (t === "S") go = T.name === "Sand"; else if (t === "O") go = T.name === "Oil"; else if (t === "X") go = T.acid; else if (t === "M") go = T.name === "Metal" || T.name === "Stone";
        if (go) { cells[i] = 0; detonate(a, y, sp, m.name); return true; } return false;
      }
      function boom(a, b, r) {
        quest("boom");
        for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const X = a + dx, Y = b + dy; if (!inb(X, Y) || dx * dx + dy * dy > r * r) continue; const i = X + Y * W, k = cells[i]; if (k && M[k].wall) continue; if (k && M[k].bomb && !(dx === 0 && dy === 0)) { const sp2 = M[k].bomb, nm = M[k].name; cells[i] = 0; g.timeout(() => detonate(X, Y, sp2, nm), 60); continue; } if (k && M[k].boom && !(dx === 0 && dy === 0)) { cells[i] = 0; g.timeout(() => boom(X, Y, 3), 60); continue; } if (Math.random() < .55) setc(i, ID("Fire")); else if (Math.random() < .5) setc(i, ID("Smoke")); else cells[i] = 0; }
        g.sfx("boom");
      }
      const canGo = (a, b) => { const k = cells[b]; if (!k) return true; const A = M[a], T = M[k]; return (T.kind === "L" || T.kind === "G") && A.d > T.d && A.kind !== "G"; };
      function swap(i, j) { const t = cells[j], ta = aux[j], tf = fuse[j]; cells[j] = cells[i]; aux[j] = aux[i]; fuse[j] = fuse[i]; cells[i] = t; aux[i] = ta; fuse[i] = tf; stamp[j] = stamp[i] = frame & 1 ? 1 : 2; }
      function react(a, b, i, m) {
        const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]][R(4)], X = a + dir[0], Y = b + dir[1]; if (!inb(X, Y)) return; const j = X + Y * W, k = cells[j], T = k ? M[k] : null;
        if (m.heat || m.fx === "heat") {
          if (T && T.name === "Water" || T && T.fx === "evap") { setc(j, ID("Steam")); quest("steam"); if (m.kind === "F") { cells[i] = 0; return; } if (m.name === "Lava") { setc(i, ID("Stone")); return; } }
          else if (T && T.flam && Math.random() < T.flam * .3) setc(j, ID("Fire"));
          else if (T && (T.name === "Snow" || T.name === "Ice" || T.cold)) setc(j, ID("Water"));
          else if (T && T.boom) boom(X, Y, 4);
          else if (T && T.name === "Sand" && m.name === "Lava" && Math.random() < .05) { setc(j, ID("Glass")); quest("glass"); }
        }
        if (m.acid && T && !T.wall && T.kind !== "G" && T.name !== "Acid" && Math.random() < .35) { cells[j] = 0; if (Math.random() < .4) cells[i] = 0; return; }
        if ((m.cold || m.fx === "freeze") && T && T.name === "Water" && Math.random() < .25) { setc(j, ID("Ice")); quest("ice"); }
        if (m.fx === "freeze" && T && T.heat && Math.random() < .3) cells[j] = 0;
        if (m.seed || m.name === "Seed") { if (T && (T.name === "Water" || T.name === "Dirt") && Math.random() < .08) { setc(i, ID("Plant")); quest("grow"); } return; }
        if (m.kind === "V" && T && (T.name === "Water" || T.fx === "evap") && Math.random() < .2) { setc(j, cells[i]); quest("grow"); return; }
        if (m.fx === "grow" && !k && dir[1] === -1 && Math.random() < .1) { setc(j, cells[i]); quest("grow"); }
        if (m.fx === "spread" && T && !T.wall && T.kind === m.kind && k !== cells[i] && Math.random() < .04) setc(j, cells[i]);
        if (m.fx === "fizz" && !k && dir[1] === -1 && Math.random() < .2) setc(j, ID("Bubbles"));
        if (m.fx === "zap" && !k && Math.random() < .05) { setc(j, ID("Fire")); aux[j] = 5; }
        if (m.fx === "boom" && T && (T.heat || T.name === "Fire") && Math.random() < .5) boom(a, b, 5);
        if (m.fx === "evap" && m.kind === "L" && Math.random() < .004) setc(i, ID("Steam"));
        if (m.fx === "bounce" && m.kind === "P" && Math.random() < .03 && !cells[a + (b - gy) * W] && inb(a, b - gy)) swap(i, a + (b - gy) * W);
      }
      function step() {
        frame++; const par = frame & 1 ? 1 : 2; stamp.fill(0); const y0 = gy > 0 ? H - 1 : 0, y1 = gy > 0 ? -1 : H, ys = gy > 0 ? -1 : 1, lr = frame & 2;
        for (let y = y0; y !== y1; y += ys) for (let xi = 0; xi < W; xi++) {
          const a = lr ? xi : W - 1 - xi, i = a + y * W, k = cells[i]; if (!k || stamp[i] === par) continue; const m = M[k];
          if (m.wall) continue;
          if (m.bomb && bombCheck(a, y, i, m)) continue;
          const dn = y + gy, up = y - gy, kind = m.kind;
          if (kind === "P") {
            if (m.sticky && Math.random() < .7) { } else if (inb(a, dn) && canGo(k, a + dn * W)) swap(i, a + dn * W);
            else { const s = Math.random() < .5 ? 1 : -1; if (inb(a + s, dn) && !cells[a + s + y * W] && canGo(k, a + s + dn * W)) swap(i, a + s + dn * W); else if (inb(a - s, dn) && !cells[a - s + y * W] && canGo(k, a - s + dn * W)) swap(i, a - s + dn * W); }
          } else if (kind === "L") {
            if (m.sticky && Math.random() < .75) { } else if (inb(a, dn) && canGo(k, a + dn * W)) swap(i, a + dn * W);
            else { const s = Math.random() < .5 ? 1 : -1; let go = false; if (inb(a + s, dn) && canGo(k, a + s + dn * W) && !cells[a + s + y * W]) { swap(i, a + s + dn * W); go = true; } else if (inb(a - s, dn) && canGo(k, a - s + dn * W) && !cells[a - s + y * W]) { swap(i, a - s + dn * W); go = true; }
              if (!go) { let t = a, d = Math.random() < .5 ? 1 : -1; for (let q = 1; q <= 4; q++) { if (inb(t + d, y) && !cells[t + d + y * W]) t += d; else break; } if (t !== a) swap(i, t + y * W); } }
          } else if (kind === "G") {
            if (m.life && Math.random() < (m.name === "Steam" && y < 8 ? .03 : .004)) { if (m.name === "Steam" && Math.random() < .6) setc(i, ID("Water")); else cells[i] = 0; continue; }
            const s = Math.random() < .5 ? 1 : -1; let dx = (wind && Math.random() < .5) ? wind : s;
            if (inb(a, up) && !cells[a + up * W]) swap(i, a + up * W); else if (inb(a + dx, up) && !cells[a + dx + up * W]) swap(i, a + dx + up * W); else if (inb(a + dx, y) && !cells[a + dx + y * W]) swap(i, a + dx + y * W);
          } else if (kind === "F") {
            const life = aux[i] - 1; if (life <= 0) { if (Math.random() < .3) setc(i, ID("Smoke")); else cells[i] = 0; continue; } aux[i] = life;
            if (Math.random() < .5 && inb(a, up) && !cells[a + up * W]) swap(i, a + up * W); else if (Math.random() < .25) { const dx = Math.random() < .5 ? 1 : -1; if (inb(a + dx, y) && !cells[a + dx + y * W]) swap(i, a + dx + y * W); }
          }
          if (wind && (kind === "P" || kind === "L") && Math.random() < .03 && inb(a + wind, y) && !cells[a + wind + y * W]) swap(i, a + wind + y * W);
          if ((m.heat || m.cold || m.acid || m.fx || m.seed || kind === "V") && Math.random() < (m.heat ? .6 : .2)) react(a, y, i, m);
        }
        if (rain) for (let q = 0; q < 3; q++) { const a = R(W), i = a + (gy > 0 ? 0 : (H - 1) * W); if (!cells[i]) setc(i, ID("Water")); }
        if (down && tool === "paint") put(mp.x, mp.y); else if (down && tool === "erase") put(mp.x, mp.y);
      }
      // ---------- drawing ----------
      const hsl = (h, s, l) => { h = (h % 360 + 360) % 360 / 360; const f = n => { const k = (n + h * 12) % 12, a = s * Math.min(l, 1 - l); return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); }; return [f(0), f(8), f(4)]; };
      g.loop((dt, t) => {
        if (!paused) { step(); if (g.diff === 0) step(); }
        for (let i = 0; i < W * H; i++) {
          const k = cells[i], o = i * 4; if (!k) { px[o] = 14; px[o + 1] = 19; px[o + 2] = 54; px[o + 3] = 255; continue; }
          const m = M[k]; let r = m.rgb[0], gg = m.rgb[1], b = m.rgb[2]; const v = .88 + aux[i] / 255 * .24;
          r *= v; gg *= v; b *= v;
          if (m.kind === "F") { const f = aux[i] / 50; r = 255; gg = 90 + 150 * f; b = 20 + 40 * f; }
          else if (m.fx === "rainbow" || m.name === "Rainbow Fluid") { const c2 = hsl(t * 90 + (i % W) * 5 + aux[i], .9, .6); r = c2[0]; gg = c2[1]; b = c2[2]; }
          else if (m.fx === "confetti") { const c2 = hsl(aux[i] * 1.4, .9, .6); r = c2[0]; gg = c2[1]; b = c2[2]; }
          else if (m.bomb) { if (((t * 3 + aux[i] / 40) | 0) % 2 === 0) { r = Math.min(255, r + 70); gg = Math.min(255, gg + 70); b = Math.min(255, b + 70); } }
          else if (m.glow) { const p = .85 + .3 * Math.sin(t * 4 + aux[i] * .1); r = Math.min(255, r * p + 30); gg = Math.min(255, gg * p + 30); b = Math.min(255, b * p + 30); }
          else if (m.fx === "sparkle" && Math.random() < .05) { r = gg = b = 255; }
          else if (m.fx === "zap" && Math.random() < .03) { r = 200; gg = 230; b = 255; }
          px[o] = r > 255 ? 255 : r; px[o + 1] = gg > 255 ? 255 : gg; px[o + 2] = b > 255 ? 255 : b; px[o + 3] = 255;
        }
        sx.putImageData(img, 0, 0); x.imageSmoothingEnabled = false; x.save(); if (shake > .4) { x.translate((Math.random() - .5) * shake, (Math.random() - .5) * shake); shake *= .9; } else shake = 0; x.fillStyle = "#0e1336"; x.fillRect(-20, -20, W * CS + 40, H * CS + 40); x.drawImage(small, 0, 0, W * CS, H * CS); x.restore();
      });
    }
  });
})();
