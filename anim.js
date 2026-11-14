// Mind Lab animated teaching scenes: numbers rolling, pages flipping, bottles exploding and more.
// app.js calls MindAnim.mount(card, {sid, title, h}) on every teaching slide.
(function () {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";
  const COLORS = ["#ff6fb5", "#4cc3ff", "#ffd34e", "#6be28f", "#ff8a2a", "#b48cff"];
  // every lesson has its own seed, so its animation always looks like THAT lesson (own numbers, colours and order)
  let seedv = null;
  const hashOf = str => { let x = 2166136261; for (let k = 0; k < str.length; k++) { x ^= str.charCodeAt(k); x = Math.imul(x, 16777619); } return x >>> 0; };
  const rand = () => { if (seedv === null) return Math.random(); seedv = (Math.imul(seedv, 1664525) + 1013904223) >>> 0; return seedv / 4294967296; };
  const rnd = (a, b) => a + rand() * (b - a);
  const ri = (a, b) => Math.floor(rnd(a, b + 1));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const alive = box => box.isConnected;
  const snd = (n, a) => { try { window.MindSfx && window.MindSfx.play(n, a); } catch (e) {} };
  // repeat a sound while the scene is on screen
  function loop(box, name, every, times, arg) { let i = 0; const id = setInterval(() => { if (!box.isConnected || i++ >= times) { clearInterval(id); return; } snd(name, arg); }, every); snd(name, arg); }

  function h(html) { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function dot(color, size) { const d = document.createElement("i"); d.className = "an-dot"; d.style.background = color; if (size) { d.style.width = d.style.height = size + "px"; } return d; }
  // number that rolls from a to b, popping on every change
  async function roll(node, a, b, ms) {
    const steps = Math.abs(b - a); if (!steps) { node.textContent = b; return; }
    const dt = Math.max(60, Math.min(450, (ms || 1200) / steps)), dir = b > a ? 1 : -1;
    for (let v = a; ; v += dir) {
      if (!node.isConnected) return;
      snd("tick"); node.textContent = v; node.classList.remove("tick"); void node.offsetWidth; node.classList.add("tick");
      if (v === b) return; await wait(dt);
    }
  }
  const bigNum = (txt) => h(`<div class="an-num">${txt === undefined ? "" : txt}</div>`);
  const caption = (box, t) => { let c = box.querySelector(".an-cap"); if (!c) { c = h(`<div class="an-cap"></div>`); box.appendChild(c); } c.textContent = t; c.classList.remove("show"); void c.offsetWidth; c.classList.add("show"); };
  const stage = box => { const s = h(`<div class="an-stage"></div>`); box.appendChild(s); return s; };

  // ---------------- scenes ----------------
  const S = {};

  S.count = async box => {
    const st = stage(box), n = ri(5, 9), row = h(`<div class="an-row"></div>`), num = bigNum(0);
    st.append(row, num); caption(box, "Counting: one number for every thing.");
    for (let i = 1; i <= n; i++) { if (!alive(box)) return; const d = dot(COLORS[i % 6], 34); d.classList.add("pop"); row.appendChild(d); snd("pop"); num.textContent = i; num.classList.remove("tick"); void num.offsetWidth; num.classList.add("tick"); await wait(380); }
    caption(box, "There are " + n + " in all!");
  };
  S.add = async box => {
    const a = ri(2, 5), b = ri(2, 5), st = stage(box), eq = h(`<div class="an-eq"><span>${a}</span><span>+</span><span>${b}</span><span>=</span><b class="an-num sm">?</b></div>`);
    const ga = h(`<div class="an-group from-left"></div>`), gb = h(`<div class="an-group from-right"></div>`), pit = h(`<div class="an-row big"></div>`);
    for (let i = 0; i < a; i++) ga.appendChild(dot("#4cc3ff", 34)); for (let i = 0; i < b; i++) gb.appendChild(dot("#ff8a2a", 34));
    pit.append(ga, gb); st.append(pit, eq); caption(box, "Adding means putting groups together.");
    await wait(900); if (!alive(box)) return; pit.classList.add("join"); snd("swish"); await wait(900);
    caption(box, "Count them all together."); await roll(eq.querySelector("b"), 0, a + b, 1100);
    eq.querySelector("b").classList.add("done"); snd("right"); caption(box, a + " + " + b + " = " + (a + b));
  };
  S.sub = async box => {
    const a = ri(6, 9), b = ri(2, 4), st = stage(box), row = h(`<div class="an-row"></div>`), eq = h(`<div class="an-eq"><span>${a}</span><span>-</span><span>${b}</span><span>=</span><b class="an-num sm">?</b></div>`);
    const ds = []; for (let i = 0; i < a; i++) { const d = dot("#6be28f", 32); ds.push(d); row.appendChild(d); }
    st.append(row, eq); caption(box, "Taking away means some go away."); await wait(900);
    for (let i = 0; i < b; i++) { if (!alive(box)) return; ds[a - 1 - i].classList.add("fly"); snd("swish"); await wait(450); }
    caption(box, "Count what is left."); await roll(eq.querySelector("b"), a, a - b, 1000); eq.querySelector("b").classList.add("done");
    caption(box, a + " - " + b + " = " + (a - b));
  };
  S.mul = async box => {
    const g = ri(2, 4), per = ri(2, 5), st = stage(box), row = h(`<div class="an-row plates"></div>`), eq = h(`<div class="an-eq"><span>${g}</span><span>x</span><span>${per}</span><span>=</span><b class="an-num sm">0</b></div>`);
    st.append(row, eq); caption(box, g + " groups of " + per + ".");
    let tot = 0;
    for (let i = 0; i < g; i++) {
      const p = h(`<div class="an-plate"></div>`); row.appendChild(p);
      for (let j = 0; j < per; j++) { if (!alive(box)) return; const d = dot(COLORS[i % 6], 26); d.classList.add("pop"); p.appendChild(d); snd("pop"); tot++; eq.querySelector("b").textContent = tot; eq.querySelector("b").classList.remove("tick"); void eq.offsetWidth; eq.querySelector("b").classList.add("tick"); await wait(220); }
      await wait(250);
    }
    eq.querySelector("b").classList.add("done"); caption(box, g + " x " + per + " = " + g * per);
  };
  S.div = async box => {
    const parts = ri(2, 4), each = ri(2, 4), tot = parts * each, st = stage(box), pile = h(`<div class="an-row"></div>`), boxes = h(`<div class="an-row plates"></div>`), eq = h(`<div class="an-eq"><span>${tot}</span><span>/</span><span>${parts}</span><span>=</span><b class="an-num sm">?</b></div>`);
    const ds = []; for (let i = 0; i < tot; i++) { const d = dot("#ffd34e", 24); ds.push(d); pile.appendChild(d); }
    const ps = []; for (let i = 0; i < parts; i++) { const p = h(`<div class="an-plate"></div>`); ps.push(p); boxes.appendChild(p); }
    st.append(pile, boxes, eq); caption(box, "Sharing " + tot + " fairly into " + parts + " groups.");
    await wait(900);
    for (let i = 0; i < tot; i++) { if (!alive(box)) return; const d = ds[i]; d.style.background = COLORS[i % parts]; ps[i % parts].appendChild(d); d.classList.add("pop"); snd("drop"); await wait(260); }
    eq.querySelector("b").textContent = each; eq.querySelector("b").classList.add("done", "tick"); caption(box, tot + " / " + parts + " = " + each + " in each group");
  };
  S.frac = async box => {
    const parts = pickOf([2, 3, 4, 6, 8]), take = ri(1, parts - 1), st = stage(box);
    const svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", "-60 -60 120 120"); svg.setAttribute("class", "an-pie");
    const wedges = [];
    for (let i = 0; i < parts; i++) {
      const a0 = (i / parts) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 1) / parts) * Math.PI * 2 - Math.PI / 2, p = document.createElementNS(NS, "path");
      p.setAttribute("d", `M0 0 L${50 * Math.cos(a0)} ${50 * Math.sin(a0)} A50 50 0 0 1 ${50 * Math.cos(a1)} ${50 * Math.sin(a1)} Z`);
      p.setAttribute("class", "wedge"); svg.appendChild(p); wedges.push(p);
    }
    const f = h(`<div class="an-frac"><b>0</b><i></i><b>${parts}</b></div>`); st.append(svg, f);
    caption(box, "The whole is cut into " + parts + " equal parts.");
    await wait(900);
    for (let i = 0; i < take; i++) { if (!alive(box)) return; wedges[i].classList.add("on"); snd("note", 330 + i * 55); f.firstChild.textContent = i + 1; f.firstChild.classList.remove("tick"); void f.offsetWidth; f.firstChild.classList.add("tick"); await wait(600); }
    caption(box, take + " out of " + parts + " parts = " + take + "/" + parts);
  };
  S.clock = async box => {
    const st = stage(box);
    st.innerHTML = `<div class="an-clock"><i class="hm"></i><i class="hh"></i><b></b>${[...Array(12)].map((_, i) => `<u style="--r:${i * 30}deg">${i + 1 < 10 ? i + 1 : i + 1}</u>`).join("")}</div>`;
    caption(box, "The long hand goes round once every hour. The short hand moves slowly."); loop(box, "tickclock", 1000, 8);
  };
  S.book = async box => {
    const st = stage(box); const pages = 7;
    st.innerHTML = `<div class="an-book"><div class="cov"></div>${[...Array(pages)].map((_, i) => `<div class="leaf" style="--d:${i * 0.55}s;z-index:${pages - i}"><div class="fr"><s></s><s></s><s></s><s></s></div><div class="bk"></div></div>`).join("")}</div>`;
    caption(box, "Turn the pages and read on."); for (let i = 0; i < 6; i++) setTimeout(() => alive(box) && snd("flip"), 600 + i * 550);
  };
  S.bottle = async box => {
    const st = stage(box); st.classList.add("sky");
    st.innerHTML = `<div class="an-bottle"><div class="cap"></div><div class="neck"></div><div class="body"><div class="liq"></div></div><div class="foam"></div></div><div class="an-bubbles"></div><div class="an-boom">POP!</div>`;
    const bub = st.querySelector(".an-bubbles");
    caption(box, "Shake it: gas bubbles build up pressure inside."); snd("fizz");
    (async () => {
      for (let i = 0; i < 26 && alive(box); i++) { const b = document.createElement("i"); b.style.left = rnd(35, 65) + "%"; b.style.animationDelay = rnd(0, 1.4) + "s"; b.style.width = b.style.height = rnd(6, 14) + "px"; bub.appendChild(b); }
      await wait(2200); if (!alive(box)) return; st.classList.add("blow"); snd("boom"); caption(box, "The pressure pushes the cap off and the fizz sprays out!");
      for (let i = 0; i < 40; i++) { const d = document.createElement("i"); d.className = "spray"; d.style.setProperty("--dx", rnd(-140, 140) + "px"); d.style.setProperty("--dy", rnd(-190, -60) + "px"); d.style.animationDelay = rnd(0, .25) + "s"; d.style.width = d.style.height = rnd(6, 16) + "px"; st.appendChild(d); }
    })();
  };
  S.volcano = async box => {
    const st = stage(box); st.classList.add("sky");
    st.innerHTML = `<div class="an-volcano"><div class="lava"></div><div class="mtn"></div></div><div class="an-mix"><span>vinegar</span> + <span>baking soda</span></div>`;
    caption(box, "Mix an acid and a base and they make a gas."); snd("fizz");
    (async () => { await wait(1500); if (!alive(box)) return; st.classList.add("erupt"); snd("rumble"); setTimeout(() => alive(box) && snd("boom"), 300); caption(box, "Carbon dioxide gas makes the foam pour out!");
      for (let i = 0; i < 36; i++) { const d = document.createElement("i"); d.className = "spray lava"; d.style.setProperty("--dx", rnd(-110, 110) + "px"); d.style.setProperty("--dy", rnd(-200, -80) + "px"); d.style.animationDelay = rnd(0, 1.2) + "s"; d.style.width = d.style.height = rnd(8, 18) + "px"; st.appendChild(d); } })();
  };
  S.plant = async box => {
    const st = stage(box); st.classList.add("sky");
    st.innerHTML = `<div class="an-sun"></div><div class="an-plant"><div class="soil"></div><div class="stem"></div><div class="leaf l1"></div><div class="leaf l2"></div><div class="flower">${[...Array(8)].map((_, i) => `<i style="--r:${i * 45}deg"></i>`).join("")}<b></b></div></div><div class="an-drops">${[...Array(10)].map(() => `<i style="left:${rnd(30, 70)}%;animation-delay:${rnd(0, 2)}s"></i>`).join("")}</div>`;
    caption(box, "Sun, water and soil help a seed grow into a plant."); snd("grow"); loop(box, "splash", 450, 8);
  };
  S.orbit = async box => {
    const st = stage(box); st.classList.add("space");
    st.innerHTML = `<div class="an-sys"><div class="sunb"></div>${[["#9a9a9a", 40, 4, 6], ["#e8b86a", 62, 6, 11], ["#3a8fe0", 86, 7, 16], ["#d6523a", 112, 6, 22]].map(p => `<div class="ring" style="width:${p[1] * 2}px;height:${p[1] * 2}px"><i style="background:${p[0]};width:${p[2] * 2}px;height:${p[2] * 2}px"></i></div>`).join("")}</div>`;
    caption(box, "Planets travel around the Sun along their orbits."); snd("hum");
  };
  S.water = async box => {
    const st = stage(box); st.classList.add("sky");
    st.innerHTML = `<div class="an-sun"></div><div class="an-cloud"></div><div class="an-sea"></div><div class="an-vap">${[...Array(6)].map((_, i) => `<i style="left:${58 + i * 5}%;animation-delay:${i * .5}s"></i>`).join("")}</div><div class="an-rain">${[...Array(12)].map((_, i) => `<i style="left:${10 + i * 5}%;animation-delay:${rnd(0, 1.5)}s"></i>`).join("")}</div>`;
    caption(box, "Water rises as vapour, makes clouds, then falls as rain."); loop(box, "splash", 300, 14);
  };
  S.magnet = async box => {
    const st = stage(box);
    st.innerHTML = `<div class="an-magnet"><b>N</b><b>S</b></div>${[...Array(5)].map((_, i) => `<div class="an-nail" style="--x:${(i - 2) * 38}px;--d:${i * .35}s"></div>`).join("")}`;
    caption(box, "A magnet pulls iron things toward it without touching them."); snd("hum"); setTimeout(() => alive(box) && snd("clink"), 1500);
  };
  S.rocket = async box => {
    const st = stage(box); st.classList.add("space");
    st.innerHTML = `<div class="an-stars"></div><div class="an-rocket"><div class="nose"></div><div class="rb"><i></i></div><div class="fin l"></div><div class="fin r"></div><div class="flame"></div></div>`;
    caption(box, "The engine pushes hot gas down, and that pushes the rocket up."); snd("launch");
  };
  S.heart = async box => {
    const st = stage(box);
    st.innerHTML = `<div class="an-heart"></div><svg class="an-ecg" viewBox="0 0 200 40"><polyline points="0,20 40,20 50,20 56,4 62,36 68,20 110,20 120,20 126,4 132,36 138,20 200,20"/></svg>`;
    caption(box, "Your heart squeezes about once every second to push blood round your body."); loop(box, "thump", 1000, 8);
  };
  S.robot = async box => {
    const st = stage(box), cells = 5;
    st.innerHTML = `<div class="an-grid">${[...Array(cells * 3)].map(() => "<i></i>").join("")}<div class="an-bot"><span></span><span></span></div><div class="an-goal"></div></div><div class="an-cmds"><b>forward</b><b>forward</b><b>turn</b><b>forward</b><b>forward</b></div>`;
    caption(box, "A program is steps in order. The robot follows each one.");
    const cmds = [...st.querySelectorAll(".an-cmds b")], bot = st.querySelector(".an-bot");
    const path = [[1, 0], [2, 0], [2, 1], [3, 1], [4, 1]];
    for (let i = 0; i < cmds.length; i++) { await wait(700); if (!alive(box)) return; cmds.forEach(c => c.classList.remove("on")); cmds[i].classList.add("on"); snd("beep"); bot.style.setProperty("--x", path[i][0]); bot.style.setProperty("--y", path[i][1]); }
    caption(box, "The robot reached the star!");
  };
  S.music = async box => {
    const st = stage(box);
    st.innerHTML = `<div class="an-staff">${[...Array(5)].map(() => "<i></i>").join("")}${[...Array(6)].map((_, i) => `<b class="nt" style="left:${12 + i * 14}%;--y:${[6, 24, 14, 32, 10, 20][i]}px;animation-delay:${i * .35}s"></b>`).join("")}</div>`;
    caption(box, "Each note sits on a line or a space. Higher means a higher sound."); [523, 392, 440, 330, 494, 415].forEach((f, i) => setTimeout(() => alive(box) && snd("note", f), 150 + i * 350));
  };
  S.coins = async box => {
    const st = stage(box), n = ri(3, 7), stack = h(`<div class="an-stack"></div>`), num = bigNum("$0");
    st.append(stack, num); caption(box, "Coins add up.");
    for (let i = 1; i <= n; i++) { if (!alive(box)) return; const c = h(`<i class="coin"></i>`); stack.appendChild(c); snd("clink"); num.textContent = "$" + i; num.classList.remove("tick"); void num.offsetWidth; num.classList.add("tick"); await wait(420); }
    caption(box, n + " coins of $1 make $" + n + ".");
  };
  S.type = async box => {
    const st = stage(box), line = h(`<div class="an-type"><span></span><i></i></div>`); st.appendChild(line);
    const txt = pickOf(["Practice makes progress.", "The quick brown fox jumps.", "I can type fast!"]), sp = line.firstChild;
    caption(box, "Watch the letters appear one at a time.");
    for (let i = 1; i <= txt.length; i++) { if (!alive(box)) return; sp.textContent = txt.slice(0, i); snd("type"); await wait(110); }
  };
  S.globe = async box => {
    const st = stage(box); st.classList.add("space");
    st.innerHTML = `<div class="an-globe"><div class="land"></div><div class="shade"></div></div>`;
    caption(box, "Earth spins once every day, so the Sun seems to rise and set."); snd("hum");
  };
  S.timeline = async box => {
    const st = stage(box), yr = bigNum("1000"), line = h(`<div class="an-line">${[...Array(6)].map((_, i) => `<b style="left:${i * 20}%"></b>`).join("")}<i></i></div>`);
    st.append(yr, line); caption(box, "Time moves forward along the timeline.");
    await roll(yr, 1000, 2000, 2600); caption(box, "Dates get bigger as time goes on.");
  };
  S.paint = async box => {
    const st = stage(box);
    st.innerHTML = `<div class="an-canvas">${[...Array(7)].map((_, i) => `<i style="background:${COLORS[i % 6]};left:${8 + i * 12}%;animation-delay:${i * .4}s"></i>`).join("")}</div>`;
    caption(box, "Mix colours and watch them spread."); for (let i = 0; i < 7; i++) setTimeout(() => alive(box) && snd("pop"), i * 400);
  };
  S.jump = async box => {
    const st = stage(box);
    st.innerHTML = `<div class="an-ball"></div><div class="an-shadow"></div>`;
    caption(box, "Moving your body gives it energy and makes your heart stronger."); loop(box, "thump", 800, 8);
  };

  function pickOf(a) { return a[Math.floor(rand() * a.length)]; }

  // ---------------- choosing a scene ----------------
  const KW = [
    [/\b(count|counting|tally)\b/, "count"],
    [/\b(graph|axis|coordinate|slope|plot|line chart)\b/, "graph"],
    [/\b(shape|triangle|square|polygon|angle|geometry|perimeter|area)\b/, "shapes"],
    [/\b(subtract|minus|take away|taking away|difference|less)\b/, "sub"],
    [/\b(multipl|times|groups of|product|skip count)\b/, "mul"],
    [/\b(divid|share|quotient|equal groups|remainder)\b/, "div"],
    [/\b(fraction|half|halves|quarter|third|numerator|denominator|pizza)\b/, "frac"],
    [/\b(add|plus|sum|total|together|doubles)\b/, "add"],
    [/\b(clock|time|hour|minute|o'clock)\b/, "clock"],
    [/\b(volcano|erupt)\b/, "volcano"],
    [/\b(gas|pressure|fizz|react|acid|bubble|explod|burn)\b/, "bottle"],
    [/\b(plant|seed|flower|grow|photosynth|leaf|leaves)\b/, "plant"],
    [/\b(planet|solar|orbit|sun|moon|space|star)\b/, "orbit"],
    [/\b(water cycle|rain|cloud|evaporat|weather)\b/, "water"],
    [/\b(magnet|iron|attract)\b/, "magnet"],
    [/\b(rocket|launch|thrust|force|engine)\b/, "rocket"],
    [/\b(heart|pulse|blood)\b/, "heart"],
    [/\b(loop|program|robot|sequence|algorithm|code|step)\b/, "robot"],
    [/\b(note|staff|melody|rhythm|beat|sing|song)\b/, "music"],
    [/\b(coin|money|price|dollar|cost|save|buy)\b/, "coins"],
    [/\b(page|chapter|story|read|book|poem)\b/, "book"],
    [/\b(type|keyboard|letter|spell|word)\b/, "type"],
    [/\b(map|continent|globe|earth|country)\b/, "globe"],
    [/\b(year|century|era|ancient|timeline|date)\b/, "timeline"]
  ];
  // Every scene must be ABOUT the lesson. A scene is only allowed for the subjects it belongs to,
  // and the number scenes (counting, adding...) stop showing once the lessons are past that grade.
  const NUMS = ["count", "add", "sub", "mul", "div", "frac", "clock", "coins"];
  const MAXLV = { count: 4, add: 6, sub: 6, mul: 10, div: 10, frac: 12, clock: 10, coins: 12 };
  const FOR = {
    count: ["math", "logic"], add: ["math", "logic", "money"], sub: ["math", "logic", "money"], mul: ["math", "money"], div: ["math", "money"], frac: ["math", "homeec"],
    clock: ["math", "homeec", "physics", "history"], coins: ["math", "money", "homeec", "civics"], graph: ["math", "physics", "money", "logic"], shapes: ["math", "art", "engineer", "logic"],
    volcano: ["chem", "earth", "homeec", "geo"], bottle: ["chem", "homeec", "physics"], plant: ["life", "animals", "earth", "health", "homeec", "geo"], orbit: ["physics", "earth", "geo", "engineer", "history"],
    water: ["earth", "life", "geo", "chem", "animals", "health"], magnet: ["physics", "engineer", "chem"], rocket: ["physics", "engineer"], heart: ["life", "health", "pe", "animals", "music"],
    robot: ["coding", "logic", "engineer", "typing"], music: ["music", "drama", "speaking"], book: ["reading", "writing", "vocab", "library", "history", "spanish", "french", "speaking", "drama", "civics", "sign"],
    type: ["reading", "writing", "vocab", "typing", "coding", "spanish", "french", "library", "speaking", "sign"], globe: ["geo", "earth", "history", "spanish", "french", "civics", "animals"],
    timeline: ["history", "civics", "geo"], paint: ["art", "hand", "drama", "sign"], jump: ["pe", "health", "animals", "drama", "hand", "sign"]
  };
  // scenes that suit any lesson: they show the lesson's own title and steps
  const NEUTRAL = ["title", "steps", "bulb"];
  const POOLS = {
    math: ["count", "add", "sub", "mul", "div", "frac", "clock", "coins", "graph", "shapes"], reading: ["book", "type"], writing: ["type", "book"], vocab: ["type", "book"], library: ["book", "type"],
    life: ["plant", "water", "heart"], chem: ["bottle", "volcano", "magnet", "water"], physics: ["magnet", "rocket", "orbit", "bottle", "graph"], earth: ["water", "orbit", "globe", "volcano", "plant"],
    history: ["timeline", "globe", "book"], geo: ["globe", "orbit", "water", "timeline"], coding: ["robot", "type"], logic: ["robot", "shapes", "graph"], money: ["coins", "add", "sub", "mul", "graph"],
    music: ["music", "heart"], art: ["paint", "shapes"], animals: ["plant", "water", "heart", "jump", "globe"], engineer: ["rocket", "robot", "magnet", "orbit", "shapes"],
    health: ["heart", "jump", "plant", "water"], typing: ["type", "robot"], pe: ["jump", "heart"], homeec: ["bottle", "coins", "clock", "plant"], hand: ["paint", "jump"],
    spanish: ["type", "book", "globe"], french: ["type", "book", "globe"], sign: ["jump", "paint"], speaking: ["type", "music"], drama: ["music", "jump"], civics: ["timeline", "globe", "book"]
  };
  const usedBy = {};

  function relevant(key, sid, level) {
    if (NEUTRAL.includes(key)) return true;
    if (FOR[key] && !FOR[key].includes(sid)) return false;
    if (MAXLV[key] && level && level > MAXLV[key]) return false;
    return true;
  }

  function choose(ctx) {
    const i = ctx.i || 0, sid = ctx.sid || "", level = ctx.level || 0, key = sid + "|" + (ctx.lessonKey || ctx.title || "");
    if (!i || ctx.book) usedBy[key] = new Set();
    const used = usedBy[key] || (usedBy[key] = new Set());
    const clean = t => String(t || "").replace(/<[^>]+>/g, " ").toLowerCase();
    // 1) the words on THIS slide, 2) the lesson title: pick the first scene that matches AND belongs here
    const find = text => { for (const [re, k] of KW) if (re.test(text) && relevant(k, sid, level) && !used.has(k)) return k; return null; };
    let pickKey = find(clean(ctx.h)) || find(clean(ctx.title));
    if (!pickKey) {
      if (i === 0 && !ctx.book && !used.has("title")) pickKey = "title";
      else {
        const pool = (POOLS[sid] || []).filter(k => relevant(k, sid, level) && !used.has(k)).concat(NEUTRAL.filter(k => !used.has(k)));
        // the lesson's own subject scenes first, but never the same one twice, then the neutral ones
        const off = hashOf(key) % 7; pickKey = pool.length ? pool[(i + off) % pool.length] : NEUTRAL[(i + off) % NEUTRAL.length];
      }
    }
    if (pickKey === "bottle" && !used.has("volcano") && relevant("volcano", sid, level) && Math.random() < .4) pickKey = "volcano";
    used.add(pickKey);
    return pickKey;
  }

  // ---- scenes that fit any lesson, and the maths ones for the older grades ----
  S.title = async box => {
    const c = box._ctx || {}, st = stage(box), words = String(c.title || "Let's learn").split(/\s+/).slice(0, 7);
    const hero = window.MindHover && window.MindHover.html ? window.MindHover.html(c.sid) : "";
    st.innerHTML = (hero ? `<div class="an-hero">${hero}</div>` : "") + `<div class="an-words">${words.map((w, i) => `<b style="--c:${COLORS[i % 6]};animation-delay:${i * .28}s"></b>`).join("")}</div><div class="an-under"></div>`;
    st.querySelectorAll(".an-words b").forEach((b, i) => { b.textContent = words[i]; setTimeout(() => alive(box) && snd("pop"), 150 + i * 280); });
    caption(box, "Today's lesson: " + (c.title || "something new") + "!");
  };
  S.steps = async box => {
    const st = stage(box);
    st.innerHTML = `<div class="an-steps">${[["1", "Look"], ["2", "Think"], ["3", "Try it"]].map((s, i) => `<div class="an-step" style="animation-delay:${i * .9}s"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div>`;
    caption(box, "Read it, think about it, then try it yourself.");
    for (let i = 0; i < 3; i++) setTimeout(() => alive(box) && snd("note", 392 + i * 70), 300 + i * 900);
  };
  S.bulb = async box => {
    const st = stage(box); st.classList.add("space");
    st.innerHTML = `<div class="an-bulb"><svg viewBox="0 0 100 130"><path class="gl" d="M50 8 C20 8 8 32 18 56 C24 68 34 74 34 90 L66 90 C66 74 76 68 82 56 C92 32 80 8 50 8 Z"/><rect x="34" y="94" width="32" height="8" rx="3"/><rect x="38" y="106" width="24" height="8" rx="3"/><path class="fil" d="M40 90 L44 66 L50 80 L56 66 L60 90"/></svg>${[...Array(8)].map((_, i) => `<i style="--r:${i * 45}deg"></i>`).join("")}</div>`;
    caption(box, "Ideas switch on when you think about the lesson."); setTimeout(() => alive(box) && snd("right"), 700);
  };
  S.graph = async box => {
    const st = stage(box);
    st.innerHTML = `<svg class="an-graph" viewBox="0 0 220 150"><g class="grid">${[...Array(5)].map((_, i) => `<line x1="20" x2="210" y1="${20 + i * 25}" y2="${20 + i * 25}"/>`).join("")}${[...Array(6)].map((_, i) => `<line y1="15" y2="125" x1="${20 + i * 38}" x2="${20 + i * 38}"/>`).join("")}</g><line class="ax" x1="20" y1="125" x2="212" y2="125"/><line class="ax" x1="20" y1="10" x2="20" y2="125"/><path class="cv" d="M20 118 C60 112 80 90 110 70 C140 50 170 34 208 22"/><circle class="pt" r="7" cx="20" cy="118"/></svg>`;
    caption(box, "A graph shows how one number changes with another."); setTimeout(() => alive(box) && snd("swish"), 400);
  };
  S.shapes = async box => {
    const st = stage(box), list = [["triangle", 3, "50,6 94,88 6,88"], ["square", 4, "10,10 90,10 90,90 10,90"], ["pentagon", 5, "50,5 95,38 78,92 22,92 5,38"], ["hexagon", 6, "28,8 72,8 96,50 72,92 28,92 4,50"]];
    st.innerHTML = `<svg class="an-shape" viewBox="0 0 100 100"><polygon points="${list[0][2]}"/></svg><div class="an-eq"><b class="an-num sm">3</b><span>sides</span></div>`;
    const poly = st.querySelector("polygon"), num = st.querySelector("b");
    caption(box, "Shapes are named by how many sides they have.");
    for (let k = 0; k < list.length; k++) { if (!alive(box)) return; poly.setAttribute("points", list[k][2]); num.textContent = list[k][1]; num.classList.remove("tick"); void num.offsetWidth; num.classList.add("tick"); snd("note", 330 + k * 70); caption(box, "A " + list[k][0] + " has " + list[k][1] + " sides."); await wait(1100); }
  };

  const LABELS = { title: "Today's lesson", steps: "How to learn it", bulb: "Get the idea", graph: "Watch the graph draw", shapes: "Watch the shapes", count: "Watch the numbers", add: "Watch it add up", sub: "Watch it take away", mul: "Watch the groups", div: "Watch it share", frac: "Watch the parts", clock: "Watch the clock", book: "Watch the pages turn", bottle: "Watch the bottle pop", volcano: "Watch the volcano erupt", plant: "Watch it grow", orbit: "Watch the planets move", water: "Watch the water cycle", magnet: "Watch the magnet pull", rocket: "Watch the rocket launch", heart: "Watch the heart beat", robot: "Watch the robot go", music: "Watch the notes", coins: "Watch the coins add up", type: "Watch it type", globe: "Watch the Earth spin", timeline: "Watch time go by", paint: "Watch the colours spread", jump: "Watch it move" };

  function play(box, name) {
    box.querySelectorAll(".an-stage,.an-cap").forEach(n => n.remove());
    const fn = S[name]; if (!fn) return;
    const c = box._ctx || {}; seedv = hashOf((c.sid || "") + "|" + (c.lessonKey || "") + "|" + (c.title || "") + "|" + (c.i || 0) + "|" + name);
    try { const r = fn(box); if (r && r.catch) r.catch(() => {}); } catch (e) {}
  }

  function mount(card, ctx) {
    if (!card) return;
    const name = ctx.scene || choose(ctx);
    if (!S[name]) return;
    const box = h(`<div class="anim-box"><div class="an-top"><b>${LABELS[name] || "Watch"}</b><span class="an-btns"><button type="button" class="an-replay">Play again</button><button type="button" class="an-big">Make it big</button></span></div></div>`);
    card.classList.add("ent-" + ((ctx.i || 0) % 8));
    const after = ctx.after || card.querySelector(".teach-h");
    if (after) after.after(box); else card.prepend(box);
    box._ctx = ctx; box.style.setProperty("--lh", ((hashOf((ctx.sid || "") + (ctx.lessonKey || ctx.title || "")) % 70) - 35) + "deg");
    box.querySelector(".an-replay").onclick = () => play(box, name);
    const big = box.querySelector(".an-big"), closeBig = () => { box.classList.remove("bigmode"); big.textContent = "Make it big"; document.removeEventListener("keydown", escBig); };
    const escBig = e => { if (e.key === "Escape") closeBig(); };
    big.onclick = () => { if (box.classList.toggle("bigmode")) { big.textContent = "Close"; document.addEventListener("keydown", escBig); } else closeBig(); };
    if (reduce) { box.classList.add("still"); }
    play(box, name);
  }

  // book pages: lesson pages get a scene under the title; front, chapter and last pages get their own motion (CSS) and the end page throws confetti
  function mountBook(page, ctx) {
    if (!page) return;
    if (page.classList.contains("divider")) { if (/The End/i.test(page.textContent) && window.playConfetti) setTimeout(() => { window.playConfetti(innerWidth * .3, innerHeight * .7, 60, 2.4); window.playConfetti(innerWidth * .7, innerHeight * .7, 60, 2.4); }, 500); return; }
    const h2 = page.querySelector("h2"), h3 = page.querySelector("h3");
    page.querySelectorAll(".toc li").forEach((li, i) => li.style.setProperty("--i", i));
    if (!h2 || !h3 || page.querySelector(".toc")) return;
    const text = (h2.textContent + " " + h3.textContent + " " + page.textContent.slice(0, 200));
    mount(page, { sid: ctx.sid, title: h2.textContent, h: text, after: h2, i: ctx.i || 0, book: true });
  }

  window.MindAnim = { mount, mountBook, scenes: S, names: Object.keys(S), choose };
})();
