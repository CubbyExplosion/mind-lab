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
    wasp: { name: "Wasp", thr: 25, isp: 275, mass: .2, cost: 30000, rel: .92, tip: "A tiny engine for tiny rockets." },
    spark: { name: "Spark", thr: 90, isp: 265, mass: .45, cost: 60000, rel: .93, tip: "A small starter engine." },
    pulse: { name: "Pulse", thr: 280, isp: 285, mass: 1.4, cost: 150000, rel: .95, tip: "A medium engine for a first stage." },
    thunder: { name: "Thunder", thr: 900, isp: 300, mass: 4.2, cost: 420000, rel: .96, res: "thunder", tip: "A big, strong engine." },
    titan: { name: "Titan", thr: 3000, isp: 312, mass: 14, cost: 1400000, rel: .97, res: "titan", tip: "A giant engine for heavy lifting." },
    comet: { name: "Comet", thr: 450, isp: 292, mass: 2.4, cost: 260000, rel: .955, res: "comet", tip: "Between Pulse and Thunder." },
    gale: { name: "Gale (space engine)", thr: 200, isp: 355, mass: 1.1, cost: 480000, rel: .96, vac: 1, res: "gale", tip: "A strong, efficient engine for space." },
    nuke: { name: "Nuclear thermal (space)", thr: 250, isp: 850, mass: 8, cost: 3000000, rel: .9, vac: 1, res: "nuke", tip: "Heats hydrogen with a reactor. Huge Isp, great for deep space." },
    whisper: { name: "Whisper (space engine)", thr: 70, isp: 345, mass: .6, cost: 220000, rel: .96, vac: 1, res: "whisper", tip: "Very efficient in space, but weak at the ground (only 35% thrust)." },
    srb: { name: "Solid Booster", thr: 1100, isp: 242, mass: 1.6, cost: 140000, rel: .94, solid: 14, res: "srb", tip: "Carries its own 14 tonnes of solid fuel. Cheap and strong, but a lower Isp." }
  };
  const TANKS = { T: { name: "Tiny", fuel: 1, dry: .15, cost: 8000 }, S: { name: "Small", fuel: 3, dry: .35, cost: 15000 }, M: { name: "Medium", fuel: 12, dry: 1.1, cost: 45000 }, L: { name: "Large", fuel: 45, dry: 3.6, cost: 130000 }, XL: { name: "Huge", fuel: 150, dry: 11, cost: 380000, res: "xl" }, G: { name: "Giant", fuel: 400, dry: 28, cost: 1000000, res: "giant" } };
  const FUELS = { kero: { name: "Kerosene + oxygen", isp: 1, dry: 1, cost: 1 }, meth: { name: "Methane + oxygen", isp: 1.04, dry: 1.05, cost: 1.2, res: "meth" }, hydro: { name: "Hydrogen + oxygen", isp: 1.25, dry: 2.2, cost: 1.7, res: "hydro" } };
  const TOPS = { fairing: { name: "Basic fairing", mass: .5, cost: 40000 }, light: { name: "Light fairing", mass: .25, cost: 140000, res: "light" }, capsule: { name: "Crew capsule", mass: 4, cost: 300000, crew: 1 } };
  // 100 real places to go. Row: id | name | delta-v needed (m/s) | distance from Earth (km) | kind (S hop, E Earth orbit, F flyby, O orbit, L landing, P special point)
  const PLACES = `sub|Suborbital hop (100 km)|2500|105|S
leo|Low Earth orbit|9400|400|E
cube|Cubesat orbit|9450|500|E
iss|Space Station orbit|9500|408|E
polar|Polar orbit|9900|800|E
sso|Sun-synchronous orbit|10100|700|E
gps|GPS orbit|10900|20200|E
molniya|Molniya orbit|11200|40000|E
heo|High Earth orbit|11500|100000|E
geo|Geostationary orbit (TV)|11800|35786|E
grave|Graveyard orbit|12000|36000|E
moonfly|Moon flyby|11900|384400|F
moonorb|Moon orbit|12500|384400|O
moonland|Moon landing|13200|384400|L
tranq|Moon: Sea of Tranquility|13250|384400|L
tycho|Moon: Tycho Crater|13300|384400|L
farside|Moon: far side|13350|384400|L
shack|Moon: Shackleton Crater (south pole)|13400|384400|L
merfly|Mercury flyby|15600|77000000|F
merorb|Mercury orbit|16800|77000000|O
venfly|Venus flyby|12600|41000000|F
venorb|Venus orbit|13200|41000000|O
venland|Venus landing|14000|41000000|L
marsfly|Mars flyby|12900|140000000|F
marsorb|Mars orbit|13500|140000000|O
marsland|Mars landing|14300|140000000|L
jezero|Mars: Jezero Crater|14350|140000000|L
olympus|Mars: Olympus Mons|14400|140000000|L
valles|Mars: Valles Marineris|14450|140000000|L
phoborb|Phobos orbit|14200|140000000|O
phobland|Phobos landing|14400|140000000|L
deimland|Deimos landing|14500|140000000|L
cerfly|Ceres flyby|14000|413000000|F
cerorb|Ceres orbit|15000|413000000|O
cerland|Ceres landing|15200|413000000|L
vesfly|Vesta flyby|13800|250000000|F
vesorb|Vesta orbit|14600|250000000|O
vesland|Vesta landing|14800|250000000|L
jupfly|Jupiter flyby|14000|630000000|F
juporb|Jupiter orbit|15500|630000000|O
ioorb|Io orbit|15900|630000000|O
ioland|Io landing|16100|630000000|L
euorb|Europa orbit|15900|630000000|O
euland|Europa landing|16200|630000000|L
ganorb|Ganymede orbit|15800|630000000|O
ganland|Ganymede landing|16000|630000000|L
calorb|Callisto orbit|15800|630000000|O
calland|Callisto landing|16000|630000000|L
satfly|Saturn flyby|14800|1200000000|F
satorb|Saturn orbit|16000|1200000000|O
titorb|Titan orbit|16300|1200000000|O
titland|Titan landing|16500|1200000000|L
encorb|Enceladus orbit|16400|1200000000|O
encland|Enceladus landing|16600|1200000000|L
rhland|Rhea landing|16600|1200000000|L
iapland|Iapetus landing|16700|1200000000|L
mimland|Mimas landing|16500|1200000000|L
uranfly|Uranus flyby|15600|2700000000|F
uranorb|Uranus orbit|16600|2700000000|O
nepfly|Neptune flyby|16000|4300000000|F
neporb|Neptune orbit|16900|4300000000|O
tritland|Triton landing|17100|4300000000|L
plufly|Pluto flyby|16400|5900000000|F
pluorb|Pluto orbit|17200|5900000000|O
pluland|Pluto landing|17400|5900000000|L
charland|Charon landing|17400|5900000000|L
eros|Asteroid Eros landing|13200|250000000|L
bennu|Asteroid Bennu landing|12600|150000000|L
ryugu|Asteroid Ryugu landing|12800|300000000|L
itokawa|Asteroid Itokawa landing|12500|300000000|L
psyche|Asteroid Psyche landing|14500|400000000|L
apophis|Asteroid Apophis landing|12400|150000000|L
halley|Halley's Comet flyby|14200|2000000000|F
churyumov|Comet 67P landing|13900|500000000|L
halebopp|Comet Hale-Bopp flyby|14800|3000000000|F
hyaku|Comet Hyakutake flyby|13600|1000000000|F
l1|Sun-Earth L1 point|10600|1500000|P
l2|Sun-Earth L2 point (telescopes)|10700|1500000|P
gateway|Moon gateway orbit|12300|384400|P
sunpass|Close pass of the Sun|14600|150000000|P
arrokoth|Kuiper Belt: Arrokoth flyby|16800|6500000000|F
eris|Eris flyby|17000|10000000000|F
helio|Edge of the solar system|17200|18000000000|P
inter|Interstellar space|17500|20000000000|P
dione|Dione landing|16500|1200000000|L
tethys|Tethys landing|16500|1200000000|L
hyperion|Hyperion flyby|16200|1200000000|F
phoebe|Phoebe flyby|15900|1200000000|F
miranda|Miranda landing|16900|2700000000|L
titania|Titania landing|16900|2700000000|L
oberon|Oberon landing|16900|2700000000|L
ariel|Ariel landing|16900|2700000000|L
amalthea|Amalthea flyby|15400|630000000|F
himalia|Himalia flyby|15300|630000000|F
makemake|Makemake flyby|17000|7000000000|F
haumea|Haumea flyby|17000|7500000000|F
sedna|Sedna flyby|17400|14000000000|F
ida|Asteroid Ida flyby|13500|300000000|F
lutetia|Asteroid Lutetia flyby|13800|400000000|F
kleopatra|Asteroid Kleopatra landing|14100|300000000|L`;
  const DESTS = {}, DLIST = [];
  PLACES.split("\n").forEach(r => { const f = r.split("|"), dv = +f[2], tier = dv <= 2500 ? 0 : dv <= 9800 ? 1 : dv <= 11500 ? 2 : dv <= 12800 ? 3 : dv <= 13700 ? 4 : dv <= 15000 ? 5 : 6; const d = { id: f[0], name: f[1], dv, alt: +f[3], kind: f[4], tier, spd: Math.min(14, dv / 1000 * .8), mult: f[0] === "sub" ? .17 : Math.max(.5, Math.pow(dv / 9400, 3)) }; DESTS[d.id] = d; DLIST.push(d); });
  if (DLIST.length !== 100) console.warn("places:", DLIST.length);
  const RESEARCH = {
    comet: ["Comet engine", 120000, "A mid-size engine."], gale: ["Gale space engine", 350000, "Very efficient upper-stage engine."], nuke: ["Nuclear thermal engine", 2500000, "Isp 850! For the far planets."], giant: ["Giant fuel tank", 700000, "400 tonnes of fuel in one tank."],
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
  // pieces you can buy for the satellite: they weigh something, cost money and earn a bonus when it works
  const SATP = { solar: ["Big solar panels", 40, 25000, 6], ant: ["Better antenna", 20, 30000, 5], cam: ["HD camera", 35, 60000, 9], bat: ["Battery pack", 50, 20000, 4], thr: ["Thrusters for fixes", 30, 45000, 6], sci: ["Science sensors", 25, 50000, 7], shield: ["Radiation shield", 45, 35000, 5], fuel: ["Extra fuel (longer life)", 60, 20000, 5], mirror: ["Star mirror", 70, 90000, 12], laser: ["Laser link", 40, 120000, 14], cpu: ["Backup computer", 15, 40000, 6], gold: ["Gold-plated coat", 5, 15000, 2] };
  const SATNAMES = ["Starling", "Comet Jr", "Skyeye", "Orbiter One", "Moonbeam", "Sparkle", "Pathfinder", "Aurora", "Nimbus", "Voyager Kid", "Lumi", "Zippy"];
  const LOOK0 = { body: "#f4f4f8", stripe: "#e0314f", nose: "#e0314f", fins: "#3a4a7a", flame: "#ff9a2a", noseShape: "cone", finShape: "small", stripes: 1, windows: 1, name: "Rocket 1", logo: "S" };

  let S = null, app = null, tab = "contracts", sel = null, lessonOpen = 0;
  function fresh() {
    return { cash: 1000000, ok: 0, tries: 0, earned: 0, res: {}, contracts: [], log: [], designs: [], design: { stages: [{ eng: "spark", count: 1, tank: "S", tanks: 1, fuel: "kero" }], top: "fairing", look: { ...LOOK0 } }, cid: 1, best: 0, company: "My Rocket Co", visited: {}, sat: { name: "Starling", pieces: {}, insure: false } };
  }
  const has = k => !k || S.res[k];
  const tier = () => { let t = 0; TIERS.forEach((n, i) => { if (S.ok >= n) t = i; }); return t; };

  // ---------------- contracts ----------------
  function makeContract() {
    const t = tier(), cap = [400, 800, 2500, 6000, 15000, 40000, 100000][t];
    const open = DLIST.filter(d => d.tier <= t), near = open.filter(d => d.tier >= t - 1), pool = Math.random() < .55 && near.length ? near : open, d = pick(pool);
    const maxKg = d.id === "sub" ? 800 : d.dv <= 9400 ? 100000 : 100000 * Math.exp(-(d.dv - 9400) / 1900), hi = Math.max(60, Math.min(cap, maxKg)), lo = Math.max(30, hi * .08);
    let kg = Math.round(rr(lo, hi) / 10) * 10; const heavy = Math.random() < .12 + t * .02; if (heavy) kg = Math.round(kg * 1.5 / 10) * 10;
    const base = kg <= 300 ? 15000 : kg <= 3000 ? 6000 : 3000;
    const crew = t >= 3 && ["E", "O", "L"].includes(d.kind) && d.dv <= 14400 && Math.random() < .1;
    const things = { S: THINGS.sub, E: THINGS.leo, F: ["flyby probe", "camera probe", "science flyby craft"], O: ["orbiter satellite", "mapping satellite", "science orbiter"], L: ["lander", "rover", "sample-return lander"], P: ["space telescope", "deep space probe", "sun observer"] }[d.kind];
    const pay = Math.round(kg * base * d.mult * rr(.95, 1.3) / 1000) * 1000 + (crew ? Math.round(800000 * Math.pow(d.dv / 9400, 2) / 1000) * 1000 : 0);
    return { id: S.cid++, who: pick(CUSTOMERS), thing: crew ? "crew capsule with astronauts" : pick(things), dest: d.id, kg: crew ? Math.max(kg, 3000) : kg, pay, crew, heavy };
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
    const wOf = s => { const e = ENGINES[s.eng]; return (e.solid ? 16 : 14) * Math.min(1.4, .7 + (TANKS[s.tank] ? ["T", "S", "M", "L", "XL", "G"].indexOf(s.tank) * .2 : .3) + (s.count > 1 ? .12 * Math.min(4, s.count) : 0)) * sc; };
    const flameCol = L.flame; let topW = 20 * sc;
    stages.forEach((s, i) => {
      const e = ENGINES[s.eng], w = wOf(s) * (i === 0 ? 1.15 : 1) * Math.pow(.88, i), tanks = e.solid ? 1 : Math.max(1, s.tanks), th = e.solid ? 46 * sc : (["T", "S", "M", "L", "XL", "G"].indexOf(s.tank) * 9 + 14) * sc;
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
    S = load() || fresh(); if (!S.design) S.design = fresh().design; const f0 = fresh(); ["company", "visited", "sat"].forEach(k => { if (!S[k]) S[k] = f0[k]; }); S.contracts = (S.contracts || []).filter(c => DESTS[c.dest]); refill(); save();
    app = document.getElementById("app"); tab = "contracts"; sel = null; render();
  }
  function head() {
    const t = tier();
    return `<button class="back" id="rcHome">← All subjects</button><div class="rc-head"><h1>${esc(S.company)}</h1><div class="rc-stats"><span>Cash <b>${money(S.cash)}</b></span><span>${esc(TIERNAMES[t])}</span><span>Launches <b>${S.ok}</b> good / ${S.tries}</span></div></div>
      <p class="sub">You run a launch company: customers order a ride into space for their satellites. Play money only! Build rockets, take orders, and launch heavier and heavier satellites. <label class="rc-co">Company name <input id="rcCo" maxlength="20" value="${esc(S.company)}"></label></p>
      <div class="rc-tabs">${[["contracts", "Orders"], ["build", "Build"], ["places", "100 Places"], ["research", "Shop & research"], ["learn", "Rocket science"], ["log", "Records"]].map(a => `<button type="button" class="rc-tab ${tab === a[0] ? "on" : ""}" data-t="${a[0]}">${a[1]}</button>`).join("")}</div>`;
  }
  function render() {
    if (!app) return; const t = { contracts, build, places, research, learn, log }[tab] || contracts;
    app.innerHTML = head() + '<div class="rc-body" id="rcBody"></div>';
    document.getElementById("rcCo").onchange = e => { S.company = e.target.value.replace(/[^\p{L}\p{N} _&'-]/gu, "").trim().slice(0, 20) || "My Rocket Co"; save(); render(); };
    document.getElementById("rcHome").onclick = () => { if (typeof home === "function") home(); };
    app.querySelectorAll(".rc-tab").forEach(b => b.onclick = () => { tab = b.dataset.t; render(); });
    t(document.getElementById("rcBody")); window.scrollTo(0, 0);
  }
  const cur = () => S.contracts.find(c => c.id === sel) || null;

  function contracts(el) {
    el.innerHTML = `<p class="note">Customers send you orders. Pick an order, then build a rocket to carry their satellite. Heavier and farther orders pay much more.</p><div class="rc-cards">${S.contracts.map(c => {
      const d = DESTS[c.dest]; return `<div class="rc-card ${c.heavy ? "heavy" : ""} ${sel === c.id ? "sel" : ""}"><b>${esc(c.who)}</b>${c.heavy ? '<em class="rc-hv">HEAVY!</em>' : ""}<div>${esc(c.thing)}</div><div>Weight: <b>${c.kg.toLocaleString()} kg</b></div><div>Goes to: <b>${esc(d.name)}</b></div>${c.crew ? "<div>Needs a <b>crew capsule</b></div>" : ""}<div class="rc-pay">Pays ${money(c.pay)}</div><button class="close" data-id="${c.id}">Take this order</button></div>`;
    }).join("")}</div><button class="hintbtn" id="rcNew" type="button">Look for other orders</button>`;
    el.querySelectorAll("[data-id]").forEach(b => b.onclick = () => { sel = +b.dataset.id; tab = "build"; snd("pick"); render(); });
    el.querySelector("#rcNew").onclick = () => { S.contracts = []; refill(); save(); snd("swish"); render(); };
  }

  // ---------------- build ----------------
  function build(el) {
    const des = S.design, c0 = cur(), L = des.look, sat = S.sat;
    const pk = Object.keys(SATP).reduce((n, k) => n + (sat.pieces[k] || 0) * SATP[k][1], 0), pc = Object.keys(SATP).reduce((n, k) => n + (sat.pieces[k] || 0) * SATP[k][2], 0), pb = Math.min(100, Object.keys(SATP).reduce((n, k) => n + (sat.pieces[k] || 0) * SATP[k][3], 0));
    const c = c0 ? { ...c0, kg: c0.kg + pk } : null, a = analyze(des, c);
    const liab = c0 ? Math.round(c0.pay * (1 + pb / 100) * .6 / 1000) * 1000 : 0, prem = sat.insure ? Math.round(liab * .12 / 100) * 100 : 0, total = a.cost + pc + prem;
    const opt = (map, curv, only) => Object.keys(map).map(k => { const m = map[k], locked = m.res && !has(m.res); return `<option value="${k}" ${k === curv ? "selected" : ""} ${locked ? "disabled" : ""}>${esc(m.name)}${locked ? " (research it)" : ""}</option>`; }).join("");
    const maxStages = has("stage3") ? 3 : 2;
    const bar = (lab, v, mx, cls) => `<div class="rc-bar"><span>${lab}</span><div><i class="${cls}" style="width:${Math.min(100, v / mx * 100)}%"></i></div><b>${Math.round(v).toLocaleString()}</b></div>`;
    el.innerHTML = `<div class="rc-build"><div class="rc-prev"><canvas id="rcPrev" width="300" height="430"></canvas><div class="rc-name"></div></div>
      <div class="rc-ed">
        ${c ? `<div class="rc-job"><b>Order:</b> ${c0.kg.toLocaleString()} kg ${esc(c.thing)} to ${esc(DESTS[c.dest].name)}, pays <b>${money(c.pay)}</b> <button class="hintbtn" id="rcJobs" type="button">Change order</button></div>` : '<div class="rc-job">Take an order first on the <b>Orders</b> tab. Until then this just tests a 200 kg satellite.</div>'}
        ${des.stages.map((s, i) => `<div class="rc-stage"><h3>Stage ${i + 1}${i === 0 ? " (bottom, lights first)" : ""}</h3>
          <label>Engine <select data-i="${i}" data-k="eng">${opt(ENGINES, s.eng)}</select></label>
          <label>How many <input type="number" min="1" max="9" value="${s.count}" data-i="${i}" data-k="count"></label>
          ${ENGINES[s.eng].solid ? '<p class="note">This booster carries its own fuel.</p>' : `<label>Fuel tank <select data-i="${i}" data-k="tank">${opt(TANKS, s.tank)}</select></label>
          <label>Tanks <input type="number" min="1" max="8" value="${s.tanks}" data-i="${i}" data-k="tanks"></label>
          <label>Fuel <select data-i="${i}" data-k="fuel">${opt(FUELS, s.fuel)}</select></label>`}
          <div class="rc-sm">Δv ${Math.round(a.st[i].dv).toLocaleString()} m/s · push ${Math.round(a.st[i].thrust).toLocaleString()} kN · weight ${a.st[i].wet.toFixed(1)} t${des.stages.length > 1 ? ` <button class="hintbtn rc-x" data-del="${i}" type="button">Remove stage</button>` : ""}</div></div>`).join("")}
        ${des.stages.length < maxStages ? '<button class="hintbtn" id="rcAddStage" type="button">Add a stage on top</button>' : ""}
        <label>Top part <select id="rcTop">${opt(TOPS, des.top)}</select></label>
        <div class="rc-sat"><h3>Your satellite</h3>
          <label>Name it <input id="satName" maxlength="14" value="${esc(sat.name)}"></label>
          <div class="rc-pieces">${Object.keys(SATP).map(k => `<label>${esc(SATP[k][0])} <small>${SATP[k][1]} kg · ${money(SATP[k][2])} · +${SATP[k][3]}% pay</small> <input type="number" min="0" max="3" value="${sat.pieces[k] || 0}" data-sp="${k}"></label>`).join("")}</div>
          <p class="rc-sm">Pieces weigh ${pk} kg and cost ${money(pc)}. They raise the pay by <b>${pb}%</b>, but if the satellite is lost you owe the customer <b>${money(liab)}</b>.</p>
          <label class="rc-ins"><input type="checkbox" id="satIns" ${sat.insure ? "checked" : ""}> Insurance (${money(Math.round(liab * .12 / 100) * 100)}): if the satellite is lost, the insurer pays</label></div>
        <div class="rc-gauges">
          ${bar("Δv you have", a.dv, Math.max(a.need, a.dv, 1), a.enough ? "ok" : "bad")}${bar("Δv needed (m/s)", a.need, Math.max(a.need, a.dv, 1), "need")}
          <p class="rc-sm">Push at liftoff compared with weight (TWR): <b class="${a.twr0 >= 1.15 ? "okc" : a.lift ? "warn" : "badc"}">${a.twr0.toFixed(2)}</b> ${a.twr0 >= 1.15 ? "(good)" : a.lift ? "(slow, wastes fuel)" : "(too heavy to lift!)"}</p>
          <p class="rc-sm">Rocket weight ${a.total.toFixed(1)} tonnes · Rocket price <b>${money(a.cost)}</b> (+ satellite pieces ${money(pc)}) · Engines work ${Math.round(a.rel * 100)}% of the time${a.low ? " · weak upper stage: extra Δv needed" : ""}</p>
          ${c && !a.crewOk ? '<p class="rc-sm badc">This order needs the Crew capsule as the top part.</p>' : ""}</div>
        <button class="close rc-go" id="rcGo" type="button" ${c && a.lift && a.crewOk && S.cash >= total ? "" : "disabled"}>${!c ? "Take an order first" : S.cash < total ? "Not enough cash" : !a.lift ? "Too heavy to lift" : !a.crewOk ? "Needs a crew capsule" : "LAUNCH! (" + money(total) + ")"}</button>
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
    const sn = el.querySelector("#satName"); if (sn) sn.onchange = () => { sat.name = sn.value.replace(/[^\p{L}\p{N} _-]/gu, "").trim().slice(0, 14) || "Starling"; save(); redo(); };
    el.querySelectorAll("[data-sp]").forEach(i => i.onchange = () => { sat.pieces[i.dataset.sp] = Math.max(0, Math.min(3, +i.value || 0)); save(); redo(); });
    const si = el.querySelector("#satIns"); if (si) si.onchange = () => { sat.insure = si.checked; save(); redo(); };
    el.querySelector("#rcGo").onclick = () => launch(c, a, { name: sat.name, pieceCost: pc, pieceKg: pk, bonus: pb / 100, liab, prem, c0 });
  }

  function places(el) {
    const t = tier(), seen = Object.keys(S.visited).length;
    el.innerHTML = `<p class="note">100 real places to go! You have visited <b>${seen} / 100</b>. Orders for a place appear when you reach the right level, and the first trip there pays a bonus.</p><div class="rc-places">${DLIST.map(d => { const v = S.visited[d.id]; return `<div class="rc-place ${v ? "seen" : d.tier > t ? "locked" : ""}"><b>${esc(d.name)}</b><small>Needs ${d.dv.toLocaleString()} m/s · ${d.alt >= 1e9 ? (d.alt / 1e9).toFixed(1) + " billion km" : d.alt >= 1e6 ? Math.round(d.alt / 1e6) + " million km" : d.alt.toLocaleString() + " km"} away</small><em>${v ? "Visited " + v + "x" : d.tier > t ? "Level " + (d.tier + 1) + " needed" : "Open"}</em></div>`; }).join("")}</div>`;
  }
  // ---------------- research ----------------
  function research(el) {
    el.innerHTML = `<p class="note">Spend money on new parts. Research stays with you forever. Every part you use costs its price each launch.</p><div class="rc-cards">${Object.keys(RESEARCH).map(k => { const r = RESEARCH[k], got = S.res[k]; return `<div class="rc-card ${got ? "done" : ""}"><b>${esc(r[0])}</b><div>${esc(r[2])}</div>${got ? '<div class="rc-pay">Done</div>' : `<div class="rc-pay">${money(r[1])}</div><button class="close" data-r="${k}" ${S.cash >= r[1] ? "" : "disabled"}>Research</button>`}</div>`; }).join("")}</div>`;
    el.insertAdjacentHTML("beforeend", `<h3>Part catalog</h3><div class="rc-cat">${Object.keys(ENGINES).map(k => { const e = ENGINES[k]; return `<div><b>${esc(e.name)}</b> push ${e.thr} kN · Isp ${e.isp} s · ${e.mass} t · ${money(e.cost)}${e.res && !S.res[e.res] ? " (locked)" : ""}</div>`; }).join("")}${Object.keys(TANKS).map(k => { const e = TANKS[k]; return `<div><b>${esc(e.name)} tank</b> ${e.fuel} t fuel · ${e.dry} t empty · ${money(e.cost)}${e.res && !S.res[e.res] ? " (locked)" : ""}</div>`; }).join("")}</div>`);
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
    if (S.cash < 150000) { el.insertAdjacentHTML("afterbegin", '<div class="rc-job">You are short of money! <button class="close" id="rcBank" type="button">Bank rescue: restart with $250,000 (research kept)</button></div>'); el.querySelector("#rcBank").onclick = () => { S.cash = 250000; save(); snd("star"); render(); }; }
    el.querySelector("#rcReset").onclick = () => { if (el.querySelector("#rcSure")) { S = fresh(); refill(); save(); sel = null; tab = "contracts"; render(); } else { el.querySelector("#rcReset").insertAdjacentHTML("afterend", '<p id="rcSure" class="note">This erases everything. Press the button again to be sure.</p>'); } };
  }

  // ---------------- launch ----------------
  function launch(c, a, o) {
    const des = JSON.parse(JSON.stringify(S.design)), D = DESTS[c.dest], sname = o.name;
    S.cash -= a.cost + o.pieceCost + o.prem; S.tries++; save();
    let outcome = "ok", failAt = 1, why = "";
    if (!a.enough) { outcome = "short"; failAt = .92; }
    else if (Math.random() > a.rel) { outcome = "boom"; failAt = rr(.12, .85); why = "An engine failed."; }
    const L = des.stages.length;
    app.innerHTML = `<div class="rc-launch"><canvas id="rcL" width="640" height="420"></canvas><div class="rc-tele" id="rcT"></div><div class="rc-deploy" id="rcD" hidden><p>Your rocket is at <b>${esc(D.name)}</b>! Press <b>Deploy</b> when the marker is in the <b class="okc">green zone</b>.</p><div class="rc-dbar"><i class="zone" id="rcZ"></i><i class="mk" id="rcM"></i></div><button class="close" id="rcDep" type="button">Deploy ${esc(sname)}!</button></div></div>`;
    const cv = document.getElementById("rcL"), x = cv.getContext("2d"), tele = document.getElementById("rcT"), dep = document.getElementById("rcD"), zone = document.getElementById("rcZ"), mk = document.getElementById("rcM");
    let t0 = 0, raf = 0, done = false, parts = [], boomed = false, phase = "climb", tOrbit = 0, tDep = 0, deployOK = false, z0 = .2 + Math.random() * .4, marker = 0;
    const CLIMB = 9; snd("launch");
    zone.style.left = z0 * 100 + "%"; zone.style.width = "34%";
    document.getElementById("rcDep").onclick = () => { if (phase !== "orbit") return; deployOK = marker >= z0 && marker <= z0 + .34; phase = "deploying"; tDep = performance.now(); dep.hidden = true; snd(deployOK ? "pop" : "wrong"); };
    const finish = res => {
      if (done) return; done = true; cancelAnimationFrame(raf);
      let pay = 0, first = 0, text = "", okk = res === "ok", refund = 0, owed = 0, paidBy = 0;
      if (S.res.reuse && a.st[0] && res !== "boom" && Math.random() < .75) { refund = Math.round(a.st[0].cost * .6); S.cash += refund; }
      S.contracts = S.contracts.filter(k => k.id !== c.id); sel = null;
      if (okk) {
        pay = Math.round(c.pay * (1 + o.bonus)); if (!S.visited[c.dest]) first = 50000 * (D.tier + 1); S.visited[c.dest] = (S.visited[c.dest] || 0) + 1;
        S.cash += pay + first; S.ok++; S.earned += pay + first; S.best = Math.max(S.best, c.kg);
        text = "delivered the satellite \"" + sname + "\" (" + (c.kg + o.pieceKg).toLocaleString() + " kg) to " + D.name + " and earned " + money(pay) + (first ? " plus a first-visit bonus of " + money(first) : "") + "!";
      } else {
        if (S.sat.insure) paidBy = o.liab; else { owed = o.liab; S.cash -= owed; }
        text = res === "short" ? "ran out of speed before reaching " + D.name + "." : res === "boom" ? why : res === "forgot" ? "never let go of the satellite \"" + sname + "\"." : "dropped the satellite \"" + sname + "\" when deploying.";
      }
      refill(); S.sat.name = pick(SATNAMES) + " " + (1 + R(99)); S.sat.pieces = {};
      S.log.push({ name: des.look.name, ok: okk, text }); S.log = S.log.slice(-40); save(); snd(okk ? "finish" : "sad");
      const lessons = [];
      lessons.push(`Δv: you had <b>${Math.round(a.dv).toLocaleString()} m/s</b> and needed <b>${Math.round(a.need).toLocaleString()} m/s</b>. ${a.enough ? "That was enough!" : "That was not enough: add fuel, a better engine, or another stage."}`);
      lessons.push(`Liftoff TWR was <b>${a.twr0.toFixed(2)}</b> (needs to be above 1).`);
      if (res === "boom") lessons.push(`Your engines work about <b>${Math.round(a.rel * 100)}%</b> of the time. More testing (Research) makes them safer.`);
      if (res === "misdeploy" || res === "forgot") lessons.push("Real satellites must be released at exactly the right moment and place. Timing matters!");
      if (refund) lessons.push(`Your first stage landed and saved you <b>${money(refund)}</b>!`);
      if (owed) lessons.push(`The satellite was lost, so you pay the customer <b class="badc">${money(owed)}</b>. Insurance can protect you from this.`);
      if (paidBy) lessons.push(`Your insurance paid the customer <b class="okc">${money(paidBy)}</b>. Good thinking!`);
      if (S.cash < 0) lessons.push(`You are in debt (${money(S.cash)}). Win some orders, or use the bank rescue in Records.`);
      app.innerHTML = `<div class="rc-result ${okk ? "ok" : "bad"}"><h1>${okk ? "Successful launch!" : res === "boom" ? "Launch failure!" : res === "short" ? "Not fast enough!" : "Satellite lost!"}</h1><p>${esc(des.look.name)} ${esc(text)}</p>${lessons.map(l => `<p class="rc-sm">${l}</p>`).join("")}<p class="rc-fact">Did you know? ${esc(pick(FACTS))}</p>${okk && tier() > 0 && S.ok === TIERS[tier()] ? `<p class="rc-up"><b>New level: ${esc(TIERNAMES[tier()])}!</b> Heavier orders and new places are coming.</p>` : ""}<button class="close" id="rcBack" type="button">Back to the company</button></div>`;
      document.getElementById("rcBack").onclick = () => { tab = okk ? "contracts" : "build"; render(); };
    };
    const sky = (p, spaceF) => { const g = x.createLinearGradient(0, 0, 0, 420); g.addColorStop(0, `rgb(${Math.round(28 * (1 - spaceF))},${Math.round(70 * (1 - spaceF))},${Math.round(160 * (1 - spaceF) + 10)})`); g.addColorStop(1, `rgb(${Math.round(120 * (1 - spaceF) + 10)},${Math.round(190 * (1 - spaceF) + 10)},${Math.round(255 * (1 - spaceF) + 30)})`); x.fillStyle = g; x.fillRect(0, 0, 640, 420); if (spaceF > .25) { x.fillStyle = "rgba(255,255,255," + Math.min(1, spaceF) + ")"; for (let i = 0; i < 60; i++) x.fillRect((i * 97) % 640, (i * 53 + p * 200) % 420, 1.5, 1.5); } };
    const drawSat = (sx, sy, rot, sc, ok) => { x.save(); x.translate(sx, sy); x.rotate(rot); x.fillStyle = "#ffd34e"; x.fillRect(-9 * sc, -7 * sc, 18 * sc, 14 * sc); x.fillStyle = "#3a6fd0"; x.fillRect(-34 * sc, -5 * sc, 22 * sc, 10 * sc); x.fillRect(12 * sc, -5 * sc, 22 * sc, 10 * sc); x.strokeStyle = "#1a1240"; x.lineWidth = 1.5; x.strokeRect(-9 * sc, -7 * sc, 18 * sc, 14 * sc); x.strokeRect(-34 * sc, -5 * sc, 22 * sc, 10 * sc); x.strokeRect(12 * sc, -5 * sc, 22 * sc, 10 * sc); if (!ok) { x.fillStyle = "#ff4d4d"; x.fillRect(-3 * sc, -3 * sc, 6 * sc, 6 * sc); } x.restore(); };
    const label = (t, y) => { x.fillStyle = "rgba(255,255,255,.95)"; x.font = "bold 17px system-ui, sans-serif"; x.textAlign = "center"; x.fillText(t, 320, y); };
    const step = ts => {
      if (!t0) t0 = ts;
      x.clearRect(0, 0, 640, 420);
      if (phase !== "climb") { // in orbit: the rocket coasts above the Earth
        sky(1, 1); const eg = x.createRadialGradient(320, 760, 330, 320, 760, 440); eg.addColorStop(0, "#1f6fd0"); eg.addColorStop(.92, "#4cc3ff"); eg.addColorStop(1, "rgba(140,220,255,0)"); x.fillStyle = eg; x.beginPath(); x.arc(320, 760, 440, 0, 7); x.fill(); x.fillStyle = "#3aa05a"; x.beginPath(); x.ellipse(250, 395, 50, 14, .2, 0, 7); x.ellipse(430, 405, 70, 16, -.1, 0, 7); x.fill();
        const rx = 320 + Math.sin(ts / 2500) * 10, ry = 230;
        x.save(); x.translate(rx, ry); x.rotate(Math.PI / 2); drawRocket(x, { ...des, top: des.top }, 0, 26, .55, { flame: 0 }); x.restore();
        if (phase === "orbit") { marker = 1 - Math.abs(((ts - tOrbit) / 1000 * .6) % 2 - 1); mk.style.left = marker * 100 + "%"; drawSat(rx + 48, ry, 0, .7, true); label("Ready to deploy " + sname, 70); if (ts - tOrbit > 15000) { phase = "deploying"; deployOK = false; tDep = performance.now(); dep.hidden = true; finishLater("forgot", ts); } }
        else if (phase === "deploying") { const q = Math.min(1, (performance.now() - tDep) / 2200); if (deployOK) { drawSat(rx + 48 + q * 150, ry - q * 80, q * .6, .7 + q * .3, true); label(sname + " deployed!", 70); for (let i = 0; i < 2; i++) parts.push({ x: rx + 48 + q * 150, y: ry - q * 80, vx: (Math.random() - .5) * 20, vy: (Math.random() - .5) * 20, l: .8, c: "#ffd34e" }); } else { drawSat(rx + 48 + q * 100, ry + q * 140, q * 8, .7, false); if (q > .7 && !boomed) { boomed = true; snd("boom"); for (let i = 0; i < 40; i++) parts.push({ x: rx + 150, y: ry + 100, vx: (Math.random() - .5) * 200, vy: (Math.random() - .5) * 200, l: 1.2, c: ["#ff6a2a", "#ffd34e", "#fff"][R(3)] }); } label(q > .7 ? "The satellite is lost!" : "Oh no...", 70); } if (q >= 1 && !fin) finishLater(deployOK ? "ok" : "misdeploy", ts); }
        parts = parts.filter(q => (q.l -= .016) > 0); parts.forEach(q => { q.x += q.vx * .016; q.y += q.vy * .016; x.globalAlpha = Math.max(0, q.l); x.fillStyle = q.c; x.fillRect(q.x, q.y, 4, 4); }); x.globalAlpha = 1;
        tele.innerHTML = `<span>Place <b>${esc(D.name)}</b></span><span>Height <b>${Math.round(D.alt).toLocaleString()} km</b></span><span>Speed <b>${D.spd.toFixed(1)} km/s</b></span><span>${phase === "orbit" ? "Waiting to deploy" : "Deploying"}</span>`;
        if (!done) raf = requestAnimationFrame(step); return;
      }
      const p = Math.min(1, (ts - t0) / 1000 / CLIMB), alt = Math.pow(p, 1.7), spaceF = Math.min(1, alt * 1.3);
      sky(p, spaceF);
      const groundY = 380 + alt * 900; if (groundY < 440) { x.fillStyle = "#3a8a4a"; x.fillRect(0, groundY, 640, 80); x.fillStyle = "#777"; x.fillRect(250, groundY - 10, 140, 10); }
      const sepAt = L > 1 ? [.36, .66] : []; let stage = 0; sepAt.forEach((s2, i) => { if (p > s2 && i < L - 1) stage = i + 1; });
      const failP = outcome === "ok" ? 2 : failAt; const rx = 320, ry = Math.max(120, 330 - alt * 260), sc = 1.0 - Math.min(.45, alt * .5);
      if (p < failP || outcome === "ok") {
        if (stage > 0 && p - sepAt[stage - 1] < .06) { const sp = (p - sepAt[stage - 1]) / .06; x.save(); x.globalAlpha = 1 - sp; drawRocket(x, { ...des, top: "none", stages: [des.stages[stage - 1]] }, rx - 40 * sp, ry + 90 + sp * 180, sc * .9, { noTop: true, noWin: true }); x.restore(); }
        const cut = des.stages.slice(stage), vis = { ...des, stages: cut.length ? cut : des.stages }, shake = p < .12 ? (Math.random() - .5) * 3 : 0;
        let tilt = 0; if (outcome === "ok" && p > .88) tilt = (p - .88) / .12 * 1.3;
        x.save(); x.translate(rx + shake, ry + 60); x.rotate(tilt); x.translate(-rx, -(ry + 60)); drawRocket(x, vis, rx, ry + 60, sc * 1.2, { flame: 1 }); x.restore();
        if (Math.random() < .8) parts.push({ x: rx + (Math.random() - .5) * 12, y: ry + 62, vx: (Math.random() - .5) * 20, vy: 40 + Math.random() * 40, l: 1, c: Math.random() < .5 ? "#fff" : "#ffc060" });
      } else if (outcome === "boom") {
        if (!boomed) { boomed = true; snd("boom"); for (let i = 0; i < 60; i++) parts.push({ x: rx, y: ry + 20, vx: (Math.random() - .5) * 260, vy: (Math.random() - .5) * 260, l: 1.4, c: ["#ff6a2a", "#ffd34e", "#fff", "#b02a0a"][R(4)] }); }
      } else { const fp = (p - failP) / (1 - failP); x.save(); x.translate(rx + fp * 90, ry + fp * fp * 330); x.rotate(fp * 3); drawRocket(x, { ...des, stages: des.stages.slice(0, 1) }, 0, 0, sc, { flame: 0 }); x.restore(); }
      parts = parts.filter(q => (q.l -= .016) > 0); parts.forEach(q => { q.x += q.vx * .016; q.y += q.vy * .016; x.globalAlpha = Math.max(0, q.l); x.fillStyle = q.c; x.fillRect(q.x, q.y, 4, 4); }); x.globalAlpha = 1;
      const fr = outcome === "ok" ? p : Math.min(p, failP), k = outcome === "ok" ? 1 : Math.min(1, a.dv / a.need), v = Math.pow(fr, .8) * D.spd * 1000 * k, ak = Math.pow(fr, 1.7) * D.alt * k;
      tele.innerHTML = `<span>Stage <b>${Math.min(L, stage + 1)}</b></span><span>Height <b>${Math.round(ak).toLocaleString()} km</b></span><span>Speed <b>${(v / 1000).toFixed(1)} km/s</b></span><span>${p < .08 ? "Liftoff!" : outcome === "boom" && p >= failP ? "FAILURE" : outcome === "short" && p >= failP ? "Out of speed" : stage > 0 && p < .7 ? "Stage separation!" : "Climbing"}</span>`;
      if (outcome === "ok" && p >= 1) { phase = "orbit"; tOrbit = ts; dep.hidden = false; snd("hum"); }
      else if ((outcome === "boom" && p > failP + .12) || (outcome === "short" && p >= failP)) { finish(outcome); return; }
      raf = requestAnimationFrame(step);
    };
    let fin = false; const finishLater = (res, ts) => { fin = true; setTimeout(() => finish(res), 250); };
    raf = requestAnimationFrame(step);
  }

  window.RocketCo = { open, analyze, ENGINES, TANKS, state: () => S };
})();
