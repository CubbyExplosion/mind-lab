// Mind Lab: ROCKET COMPANY. Build rockets, launch them, earn (play) money. Real rocket science: thrust-to-weight, delta-v, staging, fuel.
// Everything here is pretend money. Opened from the home page; saves in the signed-in profile.
(function () {
  const KEY = "mindlab-rocketco", G0 = 9.81;
  const keyOf = k => (window.mindKey ? window.mindKey(k) : k);
  const load = () => { try { const v = localStorage.getItem(keyOf(KEY)); return v ? JSON.parse(v) : null; } catch (e) { return null; } };
  const save = () => { try { localStorage.setItem(keyOf(KEY), JSON.stringify(S)); } catch (e) {} };
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const money = n => (n < 0 ? "-$" : "$") + Math.abs(Math.round(n)).toLocaleString();
  const R = n => Math.floor(Math.random() * n), pick = a => a[R(a.length)], rr = (a, b) => a + Math.random() * (b - a);
  const snd = (n, a) => { try { window.MindSfx && window.MindSfx.play(n, a); } catch (e) {} };

  // ---------------- the parts ----------------
  const ENGINES = {
    spark: { name: "Spark", thr: 90, isp: 265, mass: .45, cost: 60000, rel: .93, tip: "A small starter engine." },
    pulse: { name: "Pulse", thr: 280, isp: 285, mass: 1.4, cost: 150000, rel: .95, tip: "A medium engine for a first stage." },
    thunder: { name: "Thunder", thr: 900, isp: 300, mass: 4.2, cost: 420000, rel: .96, res: "thunder", tip: "A big, strong engine." },
    titan: { name: "Titan", thr: 3000, isp: 312, mass: 14, cost: 1400000, rel: .97, res: "titan", tip: "A giant engine for heavy lifting." },
    whisper: { name: "Whisper (space engine)", thr: 70, isp: 345, mass: .6, cost: 220000, rel: .96, vac: 1, res: "whisper", tip: "Very efficient in space, but weak at the ground (only 35% thrust)." },
    srb: { name: "Solid Booster", thr: 1100, isp: 242, mass: 1.6, cost: 140000, rel: .94, solid: 14, res: "srb", tip: "Carries its own 14 tonnes of solid fuel. Cheap and strong, but a lower Isp." }
  };
  const TANKS = { S: { name: "Small", fuel: 3, dry: .35, cost: 15000 }, M: { name: "Medium", fuel: 12, dry: 1.1, cost: 45000 }, L: { name: "Large", fuel: 45, dry: 3.6, cost: 130000 }, XL: { name: "Huge", fuel: 150, dry: 11, cost: 380000, res: "xl" } };
  const FUELS = { kero: { name: "Kerosene + oxygen", isp: 1, dry: 1, cost: 1 }, meth: { name: "Methane + oxygen", isp: 1.04, dry: 1.05, cost: 1.2, res: "meth" }, hydro: { name: "Hydrogen + oxygen", isp: 1.25, dry: 2.2, cost: 1.7, res: "hydro" } };
  const TOPS = { fairing: { name: "Basic fairing", mass: .5, cost: 40000 }, light: { name: "Light fairing", mass: .25, cost: 140000, res: "light" }, capsule: { name: "Crew capsule", mass: 4, cost: 300000, crew: 1 } };
  const DESTS = { sub: { name: "Suborbital (100 km up)", dv: 2500, mult: .17, alt: 105, spd: 2.4 }, leo: { name: "Low Earth orbit", dv: 9400, mult: 1, alt: 400, spd: 7.8 }, gto: { name: "High orbit (TV satellites)", dv: 11800, mult: 1.8, alt: 35786, spd: 10.2 }, moon: { name: "The Moon", dv: 12500, mult: 3, alt: 384400, spd: 11 }, mars: { name: "Mars", dv: 13500, mult: 4, alt: 225000000, spd: 12.5 } };
  const RESEARCH = {
    thunder: ["Thunder engine", 200000, "A big engine. You will need it for orbit."], titan: ["Titan engine", 900000, "The biggest engine."], whisper: ["Whisper space engine", 250000, "Great for upper stages."], srb: ["Solid Booster", 120000, "Cheap, powerful fuel-filled booster."],
    xl: ["Huge fuel tank", 300000, "150 tonnes of fuel in one tank."], meth: ["Methane fuel", 200000, "Slightly better than kerosene."], hydro: ["Hydrogen fuel", 500000, "Best Isp, but the tanks are big and heavy."],
    stage3: ["Third stage", 250000, "Build rockets with 3 stages."], light: ["Light fairing", 150000, "Saves 250 kg."], reuse: ["Landing legs", 600000, "Your first stage can land, and you get 60% of its price back (75% of the time)."],
    test1: ["Test campaign 1", 150000, "Engines are 1.5% more reliable."], test2: ["Test campaign 2", 300000, "Engines are another 1.5% more reliable."], test3: ["Test campaign 3", 600000, "Engines are another 1.5% more reliable."]
  };
  const FACTS = ["Rocket engines work by throwing gas out the back very fast. That pushes the rocket the other way (Newton's third law).", "To stay in orbit around Earth you need to go about 7.8 kilometres every second!", "Rockets drop stages because empty tanks are just dead weight.", "The rocket equation says: the more you want to speed up, the more fuel you need, and fuel itself needs more fuel to lift it.", "Isp (specific impulse) is how long one kilogram of fuel can make one kilogram of push. Higher means more efficient.", "Hydrogen is the lightest fuel, so it gives the best Isp, but it is bulky so the tanks are large.", "Thrust-to-weight ratio must be more than 1 at liftoff, or the rocket just sits on the pad.", "Gravity pulls on a rocket the whole time it climbs, so some of your fuel is wasted just fighting gravity.", "The Moon has 1/6 of Earth's gravity, so landing there needs far less fuel than leaving Earth.", "Escape velocity from Earth is about 11.2 kilometres per second.", "Solid rocket boosters cannot be shut off once they are lit.", "Reusable rockets land back on Earth so the expensive parts can fly again.", "Air gets thinner as you go up, so engines made for space can be more efficient up there.", "A rocket at liftoff is mostly fuel: often 90% of its mass!", "Satellites in high orbit (like TV satellites) stay above the same spot on Earth.", "Mars is so far away that signals take between 4 and 24 minutes to get there.", "Delta-v (change in speed) is how rocket scientists measure how far a rocket can go.", "More engines means more thrust, but also more weight and more things that can go wrong.", "Rocket scientists test engines many times on the ground to make them more reliable.", "The first artificial satellite, Sputnik, was launched in 1957."];
  const CUSTOMERS = ["TeleStar Corp", "Blue Marble Weather", "Moon Mining Inc", "School Satellite Club", "Mars Dream Agency", "Deep Sea Data Ltd", "Orbit TV", "Galaxy Maps", "Star Farm Co", "Comet Research Lab", "Aurora Space Station", "Nova Telecom", "Little Planet Radio", "Polar Ice Watch", "Sunrise Energy"];
  const THINGS = { sub: ["science experiment", "weather probe", "school experiment box", "cloud sensor"], leo: ["weather satellite", "school cubesat", "space telescope", "station module", "photo satellite"], gto: ["TV satellite", "radio satellite", "weather satellite", "phone satellite"], moon: ["moon rover", "moon lander", "moon base cargo", "moon orbiter"], mars: ["Mars lander", "Mars rover", "Mars orbiter", "Mars base cargo"] };
  const TIERS = [0, 3, 8, 15, 25, 40, 60];
  const TIERNAMES = ["Garage startup", "Small launcher", "Rising company", "Moon contractor", "Mars pioneer", "Heavy-lift giant", "Space empire"];
  const LOOK0 = { body: "#f4f4f8", stripe: "#e0314f", nose: "#e0314f", fins: "#3a4a7a", flame: "#ff9a2a", noseShape: "cone", finShape: "small", stripes: 1, windows: 1, name: "Rocket 1", logo: "S" };

  let S = null, app = null, tab = "contracts", sel = null, lessonOpen = 0;
  function fresh() {
    return { cash: 1000000, ok: 0, tries: 0, earned: 0, res: {}, contracts: [], log: [], designs: [], design: { stages: [{ eng: "spark", count: 1, tank: "S", tanks: 1, fuel: "kero" }], top: "fairing", look: { ...LOOK0 } }, cid: 1, best: 0 };
  }
  const has = k => !k || S.res[k];
  const tier = () => { let t = 0; TIERS.forEach((n, i) => { if (S.ok >= n) t = i; }); return t; };

  // ---------------- contracts ----------------
  function makeContract() {
    const t = tier(), opts = [];
    const add = (d, lo, hi) => opts.push([d, lo, hi]);
    if (t === 0) add("sub", 50, 400);
    if (t >= 1) { add("sub", 100, 800); add("leo", 100, 500); }
    if (t >= 2) { add("leo", 200, 2500); add("gto", 100, 800); }
    if (t >= 3) { add("leo", 500, 6000); add("gto", 300, 2500); add("moon", 100, 800); }
    if (t >= 4) { add("leo", 1000, 15000); add("gto", 1000, 6000); add("moon", 300, 3000); add("mars", 100, 1000); }
    if (t >= 5) { add("leo", 5000, 40000); add("moon", 1000, 10000); add("mars", 500, 4000); }
    if (t >= 6) { add("leo", 20000, 100000); add("mars", 2000, 15000); add("moon", 5000, 25000); }
    const [d, lo, hi] = pick(opts); let kg = Math.round(rr(lo, hi) / 10) * 10; const heavy = Math.random() < .12 + t * .02; if (heavy) kg = Math.round(kg * 1.5 / 10) * 10;
    const base = kg <= 300 ? 15000 : kg <= 3000 ? 6000 : 3000;
    const crew = t >= 3 && d !== "sub" && Math.random() < .12;
    const pay = Math.round(kg * base * DESTS[d].mult * rr(.95, 1.3) / 1000) * 1000 + (crew ? 800000 : 0);
    return { id: S.cid++, who: pick(CUSTOMERS), thing: crew ? "crew capsule with astronauts" : pick(THINGS[d]), dest: d, kg: crew ? Math.max(kg, 3000) : kg, pay, crew, heavy };
  }
  function refill() { while (S.contracts.length < 4) S.contracts.push(makeContract()); }

  // ---------------- the maths of rockets ----------------
  function analyze(des, c) {
    const kg = c ? c.kg : 200, top = TOPS[des.top] || TOPS.fairing, dest = c ? DESTS[c.dest] : DESTS.sub;
    let above = kg / 1000 + top.mass, cost = top.cost, dvTot = 0, rel = 1, notes = [];
    const st = [];
    for (let i = des.stages.length - 1; i >= 0; i--) {
      const s = des.stages[i], e = ENGINES[s.eng], f = FUELS[s.fuel] || FUELS.kero, t = TANKS[s.tank] || TANKS.S, n = s.count;
      const tanks = e.solid ? 0 : s.tanks;
      const dry = e.mass * n + tanks * t.dry * f.dry, fuel = e.solid ? e.solid * n : tanks * t.fuel, wet = dry + fuel;
      const ve = e.isp * (e.solid ? 1 : f.isp) * G0, dv = fuel > 0 ? ve * Math.log((above + wet) / (above + dry)) : 0;
      const thrust = e.thr * n * (e.vac && i === 0 ? .35 : 1), twr = thrust / (G0 * (above + wet)) ;
      const c1 = e.cost * n + tanks * t.cost * f.cost;
      cost += c1; rel *= Math.pow(e.rel + (S.res.test1 ? .015 : 0) + (S.res.test2 ? .015 : 0) + (S.res.test3 ? .015 : 0), 1 + .15 * (n - 1));
      st[i] = { dv, twr, wet, dry, fuel, cost: c1, thrust, ve, above }; dvTot += dv; above += wet;
    }
    const total = above, twr0 = st[0] ? st[0].twr : 0; cost += 15000 + 500 * total;
    let need = dest.dv, low = 0;
    st.forEach((s, i) => { if (i > 0 && s.twr < .25) { need += 400; low++; } });
    if (twr0 < 1.15 && twr0 >= 1) need *= 1 + (1.15 - twr0) * .8;
    const crewOk = !c || !c.crew || top.crew;
    return { st, dv: dvTot, need, twr0, cost, total, rel: Math.min(.995, rel), crewOk, low, lift: twr0 >= 1, enough: dvTot >= need };
  }

  // ---------------- drawing a rocket (also used by the launch) ----------------
  function drawRocket(x, des, cx, base, sc, o) {
    o = o || {}; const L = des.look || LOOK0, stages = o.only ? des.stages.slice(0, o.only) : des.stages; let y = base;
    const wOf = s => { const e = ENGINES[s.eng]; return (e.solid ? 16 : 14) * Math.min(1.4, .7 + (TANKS[s.tank] ? ["S", "M", "L", "XL"].indexOf(s.tank) * .22 : .3) + (s.count > 1 ? .12 * Math.min(4, s.count) : 0)) * sc; };
    const flameCol = L.flame; let topW = 20 * sc;
    stages.forEach((s, i) => {
      const e = ENGINES[s.eng], w = wOf(s) * (i === 0 ? 1.15 : 1) * Math.pow(.88, i), tanks = e.solid ? 1 : Math.max(1, s.tanks), th = e.solid ? 46 * sc : (["S", "M", "L", "XL"].indexOf(s.tank) * 10 + 20) * sc;
      const nz = Math.min(5, s.count);
      // flame + nozzles
      if (o.flame && i === (o.flameStage || 0)) { for (let k = 0; k < nz; k++) { const fx = cx - w / 2 + (k + .5) * w / nz, fl = (22 + Math.random() * 16) * sc * (o.flame || 1); const g = x.createLinearGradient(fx, y, fx, y + fl); g.addColorStop(0, "#fff"); g.addColorStop(.3, flameCol); g.addColorStop(1, "rgba(255,80,0,0)"); x.fillStyle = g; x.beginPath(); x.moveTo(fx - 4 * sc, y); x.lineTo(fx, y + fl); x.lineTo(fx + 4 * sc, y); x.fill(); } }
      for (let k = 0; k < nz; k++) { const fx = cx - w / 2 + (k + .5) * w / nz; x.fillStyle = "#555a6a"; x.beginPath(); x.moveTo(fx - 3 * sc, y - 6 * sc); x.lineTo(fx + 3 * sc, y - 6 * sc); x.lineTo(fx + 5 * sc, y); x.lineTo(fx - 5 * sc, y); x.fill(); }
      y -= 6 * sc;
      // tank body
      const h = th * (e.solid ? 1 : Math.min(2.6, .8 + tanks * .45)); y -= h;
      x.fillStyle = L.body; x.fillRect(cx - w / 2, y, w, h); x.fillStyle = "rgba(0,0,0,.12)"; x.fillRect(cx + w * .15, y, w * .35, h); x.fillStyle = "rgba(255,255,255,.35)"; x.fillRect(cx - w * .4, y, w * .12, h);
      x.strokeStyle = "#1a1240"; x.lineWidth = Math.max(1, sc * .8); x.strokeRect(cx - w / 2, y, w, h);
      if (L.stripes) { x.fillStyle = L.stripe; x.fillRect(cx - w / 2, y + h * .12, w, Math.max(2, h * .1)); if (L.stripes > 1) x.fillRect(cx - w / 2, y + h * .78, w, Math.max(2, h * .1)); }
      if (i === stages.length - 1 && L.windows && !o.noWin) { for (let k = 0; k < Math.min(3, L.windows); k++) { x.fillStyle = "#9fe3ff"; x.beginPath(); x.arc(cx, y + h * .35 + k * 12 * sc, 3.4 * sc, 0, 7); x.fill(); x.strokeStyle = "#1a1240"; x.stroke(); } }
      if (i === 0 && L.logo) { x.fillStyle = "#1a1240"; x.font = "bold " + Math.round(11 * sc) + "px system-ui, sans-serif"; x.textAlign = "center"; x.fillText(String(L.logo).slice(0, 2), cx, y + h * .6); }
      // fins on the first stage
      if (i === 0 && L.finShape !== "none") { const fh = (L.finShape === "big" ? 22 : L.finShape === "swept" ? 26 : 13) * sc, fw = (L.finShape === "big" ? 13 : 9) * sc; x.fillStyle = L.fins; [[-1], [1]].forEach(([d]) => { x.beginPath(); x.moveTo(cx + d * w / 2, y + h - fh * (L.finShape === "swept" ? 1.1 : 1)); x.lineTo(cx + d * (w / 2 + fw), y + h + 2 * sc); x.lineTo(cx + d * w / 2, y + h); x.closePath(); x.fill(); x.stroke(); }); }
      y -= 3 * sc; x.fillStyle = "#3a3f55"; x.fillRect(cx - w * .42, y, w * .84, 3 * sc); topW = w;
    });
    if (o.noTop) return y;
    // top: nose / capsule
    const tp = TOPS[des.top] || TOPS.fairing, w = topW * .92, nh = (tp.crew ? 30 : 34) * sc;
    x.fillStyle = L.nose; x.beginPath();
    if (tp.crew) { x.moveTo(cx - w / 2, y); x.lineTo(cx - w * .3, y - nh); x.lineTo(cx + w * .3, y - nh); x.lineTo(cx + w / 2, y); }
    else if (L.noseShape === "round") { x.moveTo(cx - w / 2, y); x.quadraticCurveTo(cx - w / 2, y - nh * 1.15, cx, y - nh * 1.15); x.quadraticCurveTo(cx + w / 2, y - nh * 1.15, cx + w / 2, y); }
    else if (L.noseShape === "flat") { x.moveTo(cx - w / 2, y); x.lineTo(cx - w * .22, y - nh * .8); x.lineTo(cx + w * .22, y - nh * .8); x.lineTo(cx + w / 2, y); }
    else { x.moveTo(cx - w / 2, y); x.lineTo(cx, y - nh * 1.3); x.lineTo(cx + w / 2, y); }
    x.closePath(); x.fill(); x.strokeStyle = "#1a1240"; x.lineWidth = Math.max(1, sc * .8); x.stroke();
    if (tp.crew) { x.fillStyle = "#9fe3ff"; x.beginPath(); x.arc(cx, y - nh * .45, 4 * sc, 0, 7); x.fill(); x.stroke(); }
    return y - nh;
  }

  // ---------------- UI ----------------
  function open() {
    S = load() || fresh(); if (!S.design) S.design = fresh().design; refill(); save();
    app = document.getElementById("app"); tab = "contracts"; sel = null; render();
  }
  function head() {
    const t = tier();
    return `<button class="back" id="rcHome">← All subjects</button><div class="rc-head"><h1>Rocket Company</h1><div class="rc-stats"><span>Cash <b>${money(S.cash)}</b></span><span>${esc(TIERNAMES[t])}</span><span>Launches <b>${S.ok}</b> good / ${S.tries}</span></div></div>
      <p class="sub">Play money only! Build rockets, win contracts, and launch heavier and heavier things.</p>
      <div class="rc-tabs">${[["contracts", "Contracts"], ["build", "Build"], ["research", "Research"], ["learn", "Rocket science"], ["log", "Records"]].map(a => `<button type="button" class="rc-tab ${tab === a[0] ? "on" : ""}" data-t="${a[0]}">${a[1]}</button>`).join("")}</div>`;
  }
  function render() {
    if (!app) return; const t = { contracts, build, research, learn, log }[tab] || contracts;
    app.innerHTML = head() + '<div class="rc-body" id="rcBody"></div>';
    document.getElementById("rcHome").onclick = () => { if (typeof home === "function") home(); };
    app.querySelectorAll(".rc-tab").forEach(b => b.onclick = () => { tab = b.dataset.t; render(); });
    t(document.getElementById("rcBody")); window.scrollTo(0, 0);
  }
  const cur = () => S.contracts.find(c => c.id === sel) || null;

  function contracts(el) {
    el.innerHTML = `<p class="note">Pick a contract, then build a rocket that can carry it. Heavier and farther jobs pay much more.</p><div class="rc-cards">${S.contracts.map(c => {
      const d = DESTS[c.dest]; return `<div class="rc-card ${c.heavy ? "heavy" : ""} ${sel === c.id ? "sel" : ""}"><b>${esc(c.who)}</b>${c.heavy ? '<em class="rc-hv">HEAVY!</em>' : ""}<div>${esc(c.thing)}</div><div>Weight: <b>${c.kg.toLocaleString()} kg</b></div><div>Goes to: <b>${esc(d.name)}</b></div>${c.crew ? "<div>Needs a <b>crew capsule</b></div>" : ""}<div class="rc-pay">Pays ${money(c.pay)}</div><button class="close" data-id="${c.id}">Choose this job</button></div>`;
    }).join("")}</div><button class="hintbtn" id="rcNew" type="button">Look for other jobs</button>`;
    el.querySelectorAll("[data-id]").forEach(b => b.onclick = () => { sel = +b.dataset.id; tab = "build"; snd("pick"); render(); });
    el.querySelector("#rcNew").onclick = () => { S.contracts = []; refill(); save(); snd("swish"); render(); };
  }

  // ---------------- build ----------------
  function build(el) {
    const des = S.design, c = cur(), a = analyze(des, c), L = des.look;
    const opt = (map, curv, only) => Object.keys(map).map(k => { const m = map[k], locked = m.res && !has(m.res); return `<option value="${k}" ${k === curv ? "selected" : ""} ${locked ? "disabled" : ""}>${esc(m.name)}${locked ? " (research it)" : ""}</option>`; }).join("");
    const maxStages = has("stage3") ? 3 : 2;
    const bar = (lab, v, mx, cls) => `<div class="rc-bar"><span>${lab}</span><div><i class="${cls}" style="width:${Math.min(100, v / mx * 100)}%"></i></div><b>${Math.round(v).toLocaleString()}</b></div>`;
    el.innerHTML = `<div class="rc-build"><div class="rc-prev"><canvas id="rcPrev" width="300" height="430"></canvas><div class="rc-name"></div></div>
      <div class="rc-ed">
        ${c ? `<div class="rc-job"><b>Job:</b> ${c.kg.toLocaleString()} kg ${esc(c.thing)} to ${esc(DESTS[c.dest].name)}, pays <b>${money(c.pay)}</b> <button class="hintbtn" id="rcJobs" type="button">Change job</button></div>` : '<div class="rc-job">Choose a job first on the <b>Contracts</b> tab. Until then this just tests a 200 kg payload.</div>'}
        ${des.stages.map((s, i) => `<div class="rc-stage"><h3>Stage ${i + 1}${i === 0 ? " (bottom, lights first)" : ""}</h3>
          <label>Engine <select data-i="${i}" data-k="eng">${opt(ENGINES, s.eng)}</select></label>
          <label>How many <input type="number" min="1" max="9" value="${s.count}" data-i="${i}" data-k="count"></label>
          ${ENGINES[s.eng].solid ? '<p class="note">This booster carries its own fuel.</p>' : `<label>Fuel tank <select data-i="${i}" data-k="tank">${opt(TANKS, s.tank)}</select></label>
          <label>Tanks <input type="number" min="1" max="8" value="${s.tanks}" data-i="${i}" data-k="tanks"></label>
          <label>Fuel <select data-i="${i}" data-k="fuel">${opt(FUELS, s.fuel)}</select></label>`}
          <div class="rc-sm">Δv ${Math.round(a.st[i].dv).toLocaleString()} m/s · push ${Math.round(a.st[i].thrust).toLocaleString()} kN · weight ${a.st[i].wet.toFixed(1)} t${des.stages.length > 1 ? ` <button class="hintbtn rc-x" data-del="${i}" type="button">Remove stage</button>` : ""}</div></div>`).join("")}
        ${des.stages.length < maxStages ? '<button class="hintbtn" id="rcAddStage" type="button">Add a stage on top</button>' : ""}
        <label>Top part <select id="rcTop">${opt(TOPS, des.top)}</select></label>
        <div class="rc-gauges">
          ${bar("Δv you have", a.dv, Math.max(a.need, a.dv, 1), a.enough ? "ok" : "bad")}${bar("Δv needed (m/s)", a.need, Math.max(a.need, a.dv, 1), "need")}
          <p class="rc-sm">Push at liftoff compared with weight (TWR): <b class="${a.twr0 >= 1.15 ? "okc" : a.lift ? "warn" : "badc"}">${a.twr0.toFixed(2)}</b> ${a.twr0 >= 1.15 ? "(good)" : a.lift ? "(slow, wastes fuel)" : "(too heavy to lift!)"}</p>
          <p class="rc-sm">Rocket weight ${a.total.toFixed(1)} tonnes · Rocket price <b>${money(a.cost)}</b> · Engines work ${Math.round(a.rel * 100)}% of the time${a.low ? " · weak upper stage: extra Δv needed" : ""}</p>
          ${c && !a.crewOk ? '<p class="rc-sm badc">This job needs the Crew capsule as the top part.</p>' : ""}</div>
        <button class="close rc-go" id="rcGo" type="button" ${c && a.lift && a.crewOk && S.cash >= a.cost ? "" : "disabled"}>${!c ? "Choose a job first" : S.cash < a.cost ? "Not enough cash" : !a.lift ? "Too heavy to lift" : !a.crewOk ? "Needs a crew capsule" : "LAUNCH! (" + money(a.cost) + ")"}</button>
      </div>
      <div class="rc-look"><h3>Look</h3>
        <label>Name <input id="lkName" maxlength="14" value="${esc(L.name)}"></label>
        <label>Logo letter <input id="lkLogo" maxlength="2" value="${esc(L.logo)}"></label>
        ${[["body", "Body"], ["stripe", "Stripes"], ["nose", "Nose"], ["fins", "Fins"], ["flame", "Flame"]].map(k => `<label>${k[1]} <input type="color" data-lk="${k[0]}" value="${L[k[0]]}"></label>`).join("")}
        <label>Nose <select data-lks="noseShape">${[["cone", "Pointy"], ["round", "Round"], ["flat", "Flat"]].map(o => `<option value="${o[0]}" ${L.noseShape === o[0] ? "selected" : ""}>${o[1]}</option>`).join("")}</select></label>
        <label>Fins <select data-lks="finShape">${[["none", "None"], ["small", "Small"], ["big", "Big"], ["swept", "Swept"]].map(o => `<option value="${o[0]}" ${L.finShape === o[0] ? "selected" : ""}>${o[1]}</option>`).join("")}</select></label>
        <label>Stripes <select data-lkn="stripes">${[0, 1, 2].map(n => `<option value="${n}" ${L.stripes === n ? "selected" : ""}>${n}</option>`).join("")}</select></label>
        <label>Windows <select data-lkn="windows">${[0, 1, 2, 3].map(n => `<option value="${n}" ${L.windows === n ? "selected" : ""}>${n}</option>`).join("")}</select></label>
        <p class="note">Use a nickname, not your real name.</p>
        <button class="hintbtn" id="rcSaveD" type="button">Save this design</button>
        ${S.designs.length ? '<div class="rc-saved">' + S.designs.map((d, i) => `<button class="hintbtn" data-ld="${i}" type="button">${esc(d.look.name)}</button>`).join("") + "</div>" : ""}
      </div></div>`;
    const cv = el.querySelector("#rcPrev"), x = cv.getContext("2d");
    const g = x.createLinearGradient(0, 0, 0, 430); g.addColorStop(0, "#1c2a7a"); g.addColorStop(1, "#4cc3ff"); x.fillStyle = g; x.fillRect(0, 0, 300, 430); x.fillStyle = "#3a8a4a"; x.fillRect(0, 400, 300, 30);
    const sc = des.stages.length >= 3 ? 1.15 : 1.5; drawRocket(x, des, 150, 392, sc, { flame: 0 });
    x.fillStyle = "rgba(255,255,255,.9)"; x.font = "bold 14px system-ui"; x.textAlign = "center"; x.fillText(L.name, 150, 420);
    const redo = () => { save(); const y = window.scrollY; render(); window.scrollTo(0, y); };
    el.querySelectorAll("[data-i]").forEach(inp => inp.onchange = () => { const s = des.stages[+inp.dataset.i], k = inp.dataset.k; s[k] = (k === "count" || k === "tanks") ? Math.max(1, Math.min(k === "count" ? 9 : 8, +inp.value || 1)) : inp.value; snd("pick"); redo(); });
    el.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { des.stages.splice(+b.dataset.del, 1); redo(); });
    const add = el.querySelector("#rcAddStage"); if (add) add.onclick = () => { des.stages.push({ eng: has("whisper") ? "whisper" : "spark", count: 1, tank: "S", tanks: 1, fuel: "kero" }); snd("pick"); redo(); };
    el.querySelector("#rcTop").onchange = e => { des.top = e.target.value; redo(); };
    const jb = el.querySelector("#rcJobs"); if (jb) jb.onclick = () => { tab = "contracts"; render(); };
    el.querySelector("#lkName").oninput = e => { const v = e.target.value.replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 14); L.name = v || "Rocket"; save(); };
    el.querySelector("#lkName").onchange = redo; el.querySelector("#lkLogo").oninput = e => { L.logo = e.target.value.replace(/[^\p{L}\p{N}]/gu, "").slice(0, 2); save(); }; el.querySelector("#lkLogo").onchange = redo;
    el.querySelectorAll("[data-lk]").forEach(i => i.oninput = () => { L[i.dataset.lk] = i.value; save(); build(el); });
    el.querySelectorAll("[data-lks]").forEach(i => i.onchange = () => { L[i.dataset.lks] = i.value; redo(); });
    el.querySelectorAll("[data-lkn]").forEach(i => i.onchange = () => { L[i.dataset.lkn] = +i.value; redo(); });
    el.querySelector("#rcSaveD").onclick = () => { S.designs.push(JSON.parse(JSON.stringify(des))); S.designs = S.designs.slice(-8); save(); snd("star"); redo(); };
    el.querySelectorAll("[data-ld]").forEach(b => b.onclick = () => { S.design = JSON.parse(JSON.stringify(S.designs[+b.dataset.ld])); redo(); });
    el.querySelector("#rcGo").onclick = () => launch(c, a);
  }

  // ---------------- research ----------------
  function research(el) {
    el.innerHTML = `<p class="note">Spend money on new parts. Research stays with you forever.</p><div class="rc-cards">${Object.keys(RESEARCH).map(k => { const r = RESEARCH[k], got = S.res[k]; return `<div class="rc-card ${got ? "done" : ""}"><b>${esc(r[0])}</b><div>${esc(r[2])}</div>${got ? '<div class="rc-pay">Done</div>' : `<div class="rc-pay">${money(r[1])}</div><button class="close" data-r="${k}" ${S.cash >= r[1] ? "" : "disabled"}>Research</button>`}</div>`; }).join("")}</div>`;
    el.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { const r = RESEARCH[b.dataset.r]; if (S.cash < r[1]) return; S.cash -= r[1]; S.res[b.dataset.r] = 1; save(); snd("star"); render(); });
  }
  // ---------------- learn ----------------
  const LESSONS = [["Why do rockets need so much fuel?", "A rocket must carry its fuel, and the fuel itself has weight that needs more fuel to lift. This is the rocket equation: Δv = Isp × 9.81 × ln(full weight ÷ empty weight). Doubling the speed change needs far more than double the fuel."], ["What is Δv (delta-v)?", "Delta-v is the change in speed your rocket can make. To reach low Earth orbit you need about 9,400 m/s (7,800 m/s orbit speed plus what gravity and air take away). The Moon needs about 12,500, Mars about 13,500."], ["What is TWR?", "Thrust-to-weight ratio is engine push divided by the rocket's weight. Below 1.0 the rocket can't leave the ground. Around 1.2 to 1.5 at liftoff is good."], ["Why stages?", "When a tank is empty it is dead weight. Dropping it makes the rest of the rocket lighter, so the same engine can speed up the rest much more."], ["What is Isp?", "Specific impulse tells how efficient an engine is. Kerosene about 300 s, methane a bit more, hydrogen about 380 s, solid boosters about 240 s. Higher means you need less fuel."], ["Why is hydrogen special?", "Hydrogen gives the best efficiency but is very light and bulky, so the tanks must be much bigger and heavier. It is best on upper stages."], ["How do reusable rockets save money?", "Engines and tanks are the most expensive part. If the first stage lands and flies again, you only pay to refuel it."], ["Why more engines?", "More engines means more push, so you can lift heavier rockets. But they weigh more and more things can go wrong."]];
  function learn(el) {
    el.innerHTML = '<p class="note">Rocket science you can use in the game!</p>' + LESSONS.map((l, i) => `<div class="rc-lesson ${lessonOpen === i ? "open" : ""}"><button type="button" data-l="${i}">${esc(l[0])}</button><p>${esc(l[1])}</p></div>`).join("");
    el.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { lessonOpen = lessonOpen === +b.dataset.l ? -1 : +b.dataset.l; learn(el); });
  }
  function log(el) {
    el.innerHTML = `<p class="note">Cash ${money(S.cash)} · money earned ${money(S.earned)} · biggest payload ${S.best.toLocaleString()} kg</p>` + (S.log.length ? S.log.slice().reverse().map(l => `<div class="rc-log ${l.ok ? "ok" : "bad"}"><b>${esc(l.name)}</b> ${esc(l.text)}</div>`).join("") : "<p>No launches yet.</p>") + '<button class="hintbtn" id="rcReset" type="button">Start a new company</button>';
    el.querySelector("#rcReset").onclick = () => { if (el.querySelector("#rcSure")) { S = fresh(); refill(); save(); sel = null; tab = "contracts"; render(); } else { el.querySelector("#rcReset").insertAdjacentHTML("afterend", '<p id="rcSure" class="note">This erases everything. Press the button again to be sure.</p>'); } };
  }

  // ---------------- launch ----------------
  function launch(c, a) {
    const des = JSON.parse(JSON.stringify(S.design)); S.cash -= a.cost; S.tries++;
    let outcome = "ok", failAt = 1, why = "";
    if (!a.enough) { outcome = "short"; failAt = .92; }
    else if (Math.random() > a.rel) { outcome = "boom"; failAt = rr(.12, .85); why = "An engine failed."; }
    const L = des.stages.length;
    app.innerHTML = `<div class="rc-launch"><canvas id="rcL" width="640" height="420"></canvas><div class="rc-tele" id="rcT"></div></div>`;
    const cv = document.getElementById("rcL"), x = cv.getContext("2d"), tele = document.getElementById("rcT");
    let t0 = 0, raf = 0, done = false, parts = [], boomed = false; const DUR = 11;
    snd("launch");
    const finish = () => {
      if (done) return; done = true; cancelAnimationFrame(raf);
      let pay = 0, text = "", okk = outcome === "ok", refund = 0;
      if (S.res.reuse && a.st[0] && outcome !== "boom" && Math.random() < .75) { refund = Math.round(a.st[0].cost * .6); S.cash += refund; }
      if (okk) { pay = c.pay; S.cash += pay; S.ok++; S.earned += pay; S.best = Math.max(S.best, c.kg); S.contracts = S.contracts.filter(k => k.id !== c.id); sel = null; refill(); }
      else if (outcome === "short") text = "ran out of speed before reaching " + DESTS[c.dest].name + ".";
      else text = why;
      if (okk) text = "delivered " + c.kg.toLocaleString() + " kg to " + DESTS[c.dest].name + " and earned " + money(pay) + "!";
      S.log.push({ name: des.look.name, ok: okk, text }); S.log = S.log.slice(-40); save(); snd(okk ? "finish" : "sad");
      const lessons = [];
      lessons.push(`Δv: you had <b>${Math.round(a.dv).toLocaleString()} m/s</b> and needed <b>${Math.round(a.need).toLocaleString()} m/s</b>. ${a.enough ? "That was enough!" : "That was not enough: add fuel, a better engine, or another stage."}`);
      lessons.push(`Liftoff TWR was <b>${a.twr0.toFixed(2)}</b> (needs to be above 1).`);
      if (outcome === "boom") lessons.push(`Your engines work about <b>${Math.round(a.rel * 100)}%</b> of the time. More testing (Research) makes them safer.`);
      if (refund) lessons.push(`Your first stage landed and saved you <b>${money(refund)}</b>!`);
      app.innerHTML = `<div class="rc-result ${okk ? "ok" : "bad"}"><h1>${okk ? "Successful launch!" : outcome === "boom" ? "Launch failure!" : "Not fast enough!"}</h1><p>${esc(des.look.name)} ${esc(text)}</p>${lessons.map(l => `<p class="rc-sm">${l}</p>`).join("")}<p class="rc-fact">Did you know? ${esc(pick(FACTS))}</p>${okk && tier() > 0 && S.ok === TIERS[tier()] ? `<p class="rc-up"><b>New level: ${esc(TIERNAMES[tier()])}!</b> Heavier jobs are coming.</p>` : ""}<button class="close" id="rcBack" type="button">Back to the company</button></div>`;
      document.getElementById("rcBack").onclick = () => { tab = okk ? "contracts" : "build"; render(); };
    };
    const step = ts => {
      if (!t0) t0 = ts; const p = Math.min(1, (ts - t0) / 1000 / DUR); let prog = p;
      x.clearRect(0, 0, 640, 420);
      const alt = Math.pow(p, 1.7), spaceF = Math.min(1, alt * 1.3);
      const g = x.createLinearGradient(0, 0, 0, 420); g.addColorStop(0, `rgb(${Math.round(28 * (1 - spaceF))},${Math.round(70 * (1 - spaceF))},${Math.round(160 * (1 - spaceF) + 10)})`); g.addColorStop(1, `rgb(${Math.round(120 * (1 - spaceF) + 10)},${Math.round(190 * (1 - spaceF) + 10)},${Math.round(255 * (1 - spaceF) + 30)})`); x.fillStyle = g; x.fillRect(0, 0, 640, 420);
      if (spaceF > .25) { x.fillStyle = "rgba(255,255,255," + Math.min(1, spaceF) + ")"; for (let i = 0; i < 60; i++) x.fillRect((i * 97) % 640, (i * 53 + p * 200) % 420, 1.5, 1.5); }
      const groundY = 380 + alt * 900; if (groundY < 440) { x.fillStyle = "#3a8a4a"; x.fillRect(0, groundY, 640, 80); x.fillStyle = "#777"; x.fillRect(250, groundY - 10, 140, 10); }
      // which stage is burning
      const sepAt = L > 1 ? [.36, .66] : []; let stage = 0; sepAt.forEach((s, i) => { if (p > s && i < L - 1) stage = i + 1; });
      const failP = outcome === "ok" ? 2 : failAt; let rx = 320, ry = Math.max(120, 330 - alt * 260), sc = 1.0 - Math.min(.45, alt * .5);
      if (p < failP || outcome === "ok") {
        if (stage > 0 && p - sepAt[stage - 1] < .06) { const sp = (p - sepAt[stage - 1]) / .06; const d2 = { ...des, stages: des.stages.slice(0, stage) }; x.save(); x.globalAlpha = 1 - sp; drawRocket(x, { ...d2, top: "none", stages: [des.stages[stage - 1]] }, rx - 40 * sp, ry + 90 + sp * 180, sc * .9, { noTop: true, noWin: true }); x.restore(); }
        const cut = des.stages.slice(stage); const vis = { ...des, stages: cut.length ? cut : des.stages };
        const shake = p < .12 ? (Math.random() - .5) * 3 : 0;
        // orbit tilt at the end
        let tilt = 0; if (outcome === "ok" && p > .8) tilt = (p - .8) / .2 * 1.2;
        x.save(); x.translate(rx + shake, ry + 60); x.rotate(tilt); x.translate(-rx, -(ry + 60)); drawRocket(x, vis, rx, ry + 60, sc * 1.2, { flame: 1, noWin: false }); x.restore();
        if (Math.random() < .8) parts.push({ x: rx + (Math.random() - .5) * 12, y: ry + 62, vx: (Math.random() - .5) * 20, vy: 40 + Math.random() * 40, l: 1, c: Math.random() < .5 ? "#fff" : "#ffc060" });
      } else if (outcome === "boom") {
        if (!boomed) { boomed = true; snd("boom"); for (let i = 0; i < 60; i++) parts.push({ x: rx, y: ry + 20, vx: (Math.random() - .5) * 260, vy: (Math.random() - .5) * 260, l: 1.4, c: ["#ff6a2a", "#ffd34e", "#fff", "#b02a0a"][R(4)] }); }
      } else { // ran out of speed: rocket tumbles back
        const fp = (p - failP) / (1 - failP); x.save(); x.translate(rx + fp * 90, ry + fp * fp * 330); x.rotate(fp * 3); drawRocket(x, { ...des, stages: des.stages.slice(0, 1) }, 0, 0, sc, { flame: 0 }); x.restore();
      }
      parts = parts.filter(q => (q.l -= .016) > 0); parts.forEach(q => { q.x += q.vx * .016; q.y += q.vy * .016; x.globalAlpha = Math.max(0, q.l); x.fillStyle = q.c; x.fillRect(q.x, q.y, 4, 4); }); x.globalAlpha = 1;
      const DD = DESTS[c.dest], fr = outcome === "ok" ? p : Math.min(p, failP), v = Math.pow(fr, .8) * DD.spd * 1000 * (outcome === "ok" ? 1 : Math.min(1, a.dv / a.need)), ak = Math.pow(fr, 1.7) * DD.alt * (outcome === "ok" ? 1 : Math.min(1, a.dv / a.need));
      tele.innerHTML = `<span>Stage <b>${Math.min(L, stage + 1)}</b></span><span>Height <b>${Math.round(ak).toLocaleString()} km</b></span><span>Speed <b>${(v / 1000).toFixed(1)} km/s</b></span><span>${p < .08 ? "Liftoff!" : outcome === "boom" && p >= failP ? "FAILURE" : outcome === "short" && p >= failP ? "Out of speed" : p > .9 ? (outcome === "ok" ? "Arrived!" : "") : stage > 0 ? "Stage separation!" : "Climbing"}</span>`;
      if (p >= 1 || (outcome === "boom" && p > failP + .12)) { if (outcome === "boom" || outcome === "short") { if (p >= failP + (outcome === "boom" ? .12 : 0)) { finish(); return; } } else { finish(); return; } }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  window.RocketCo = { open, analyze, ENGINES, TANKS, state: () => S };
})();
