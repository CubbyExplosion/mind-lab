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
    hornet: { name: "Hornet", thr: 600, isp: 295, mass: 3, cost: 340000, rel: .955, res: "hornet", tip: "A strong mid-size engine." },
    silk: { name: "Silk (big space engine)", thr: 500, isp: 362, mass: 3.2, cost: 1100000, rel: .96, vac: 1, res: "silk", tip: "A big, very efficient engine for upper stages." },
    colossus: { name: "Colossus", thr: 10000, isp: 318, mass: 45, cost: 5000000, rel: .96, res: "colossus", tip: "An enormous engine for super heavy rockets." },
    mammoth: { name: "Mammoth", thr: 22000, isp: 322, mass: 95, cost: 10000000, rel: .955, res: "mammoth", tip: "The biggest engine of all." },
    bigsrb: { name: "Big Solid Booster", thr: 4200, isp: 252, mass: 7, cost: 800000, rel: .94, solid: 70, res: "bigsrb", tip: "A giant solid booster with 70 tonnes of fuel." },
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
  const TANKS = { T: { name: "Tiny", fuel: 1, dry: .15, cost: 8000 }, S: { name: "Small", fuel: 3, dry: .35, cost: 15000 }, M: { name: "Medium", fuel: 12, dry: 1.1, cost: 45000 }, L: { name: "Large", fuel: 45, dry: 3.6, cost: 130000 }, XL: { name: "Huge", fuel: 150, dry: 11, cost: 380000, res: "xl" }, G: { name: "Giant", fuel: 400, dry: 28, cost: 1000000, res: "giant" }, MG: { name: "Mega", fuel: 1000, dry: 70, cost: 2500000, res: "mega" }, TT: { name: "Titanic", fuel: 3000, dry: 200, cost: 7000000, res: "tt" } };
  const TORD = ["T", "S", "M", "L", "XL", "G", "MG", "TT"], BOOSTS = ["srb", "bigsrb"];
  const FUELS = { kero: { name: "Kerosene + oxygen", isp: 1, dry: 1, cost: 1 }, meth: { name: "Methane + oxygen", isp: 1.04, dry: 1.05, cost: 1.2, res: "meth" }, hydro: { name: "Hydrogen + oxygen", isp: 1.25, dry: 2.2, cost: 1.7, res: "hydro" } };
  const TOPS = { fairing: { name: "Basic fairing (up to 5,000 kg)", mass: .5, cost: 40000, cap: 5000 }, light: { name: "Light fairing (up to 3,000 kg)", mass: .25, cost: 140000, res: "light", cap: 3000 }, wide: { name: "Wide fairing (up to 25,000 kg)", mass: 2.2, cost: 260000, res: "wide", cap: 25000 }, megaf: { name: "Mega fairing (up to 150,000 kg)", mass: 9, cost: 900000, res: "megaf", cap: 150000 }, capsule: { name: "Crew capsule (up to 12,000 kg)", mass: 4, cost: 300000, crew: 1, cap: 12000 } };
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
    hornet: ["Hornet engine", 150000, "A strong mid-size engine."], silk: ["Silk big space engine", 900000, "Very efficient and strong, for upper stages."], colossus: ["Colossus engine", 3000000, "10,000 kN of push!"], mammoth: ["Mammoth engine", 8000000, "22,000 kN of push. The biggest."], bigsrb: ["Big Solid Booster", 600000, "A giant strap-on booster."], mega: ["Mega fuel tank", 2000000, "1,000 tonnes of fuel in one tank."], tt: ["Titanic fuel tank", 6000000, "3,000 tonnes of fuel in one tank."], stage4: ["Fourth stage", 800000, "Build rockets with 4 stages."], stage5: ["Fifth stage", 2000000, "Build rockets with 5 stages."], wide: ["Wide fairing", 200000, "Carries satellites up to 25,000 kg."], megaf: ["Mega fairing", 900000, "Carries satellites up to 150,000 kg."],
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
    return { cash: 1000000, ok: 0, tries: 0, earned: 0, res: {}, contracts: [], log: [], designs: [], design: { stages: [{ eng: "spark", count: 1, tank: "S", tanks: 1, fuel: "kero" }], top: "fairing", boost: { eng: "srb", count: 0 }, extras: {}, look: { ...LOOK0 } }, cid: 1, best: 0, debt: 0, company: "My Rocket Co", visited: {}, sat: { name: "Starling", pieces: {}, insure: false } };
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
    const kg = c ? c.kg : 200, top = TOPS[des.top] || TOPS.fairing, dest = c ? DESTS[c.dest] : DESTS.sub, ex = des.extras || {}, bo = des.boost && des.boost.count > 0 && ENGINES[des.boost.eng] ? des.boost : null;
    let above = kg / 1000 + top.mass + (ex.avionics ? .2 : 0) + (ex.fins ? .3 : 0), cost = top.cost + (ex.avionics ? 120000 : 0) + (ex.fins ? 60000 : 0), dvTot = 0, rel = 1;
    const bonus = (S.res.test1 ? .015 : 0) + (S.res.test2 ? .015 : 0) + (S.res.test3 ? .015 : 0) + (ex.avionics ? .025 : 0), st = [];
    for (let i = des.stages.length - 1; i >= 0; i--) {
      const s = des.stages[i], e = ENGINES[s.eng], f = FUELS[s.fuel] || FUELS.kero, t = TANKS[s.tank] || TANKS.S, n = s.count;
      const tanks = e.solid ? 0 : s.tanks;
      const dry = e.mass * n + tanks * t.dry * f.dry, fuel = e.solid ? e.solid * n : tanks * t.fuel, wet = dry + fuel;
      const ve = e.isp * (e.solid ? 1 : f.isp) * G0;
      let dv = fuel > 0 ? ve * Math.log((above + wet) / (above + dry)) : 0, thrust = e.thr * n * (e.vac && i === 0 ? .35 : 1), wetT = wet, c1 = e.cost * n + tanks * t.cost * f.cost;
      if (i === 0 && bo) {   // strap-on boosters burn together with the first stage, then fall away
        const be = ENGINES[bo.eng], nb = bo.count, Fb = be.thr * nb * 1, fuelB = be.solid * nb, dryB = be.mass * nb, veB = be.isp * G0, mdB = Fb / veB, tb = fuelB / mdB, md1 = thrust / ve, m1 = Math.min(fuel, md1 * tb);
        const m0 = above + wet + fuelB + dryB, veEff = (Fb + thrust) / (mdB + md1), dvA = veEff * Math.log(m0 / (m0 - fuelB - m1)), mA = m0 - fuelB - m1 - dryB, rest = fuel - m1;
        dv = dvA + (rest > 0 ? ve * Math.log(mA / (mA - rest)) : 0); thrust += Fb; wetT = wet + fuelB + dryB; c1 += be.cost * nb; rel *= Math.pow(be.rel + bonus, 1 + .15 * (nb - 1));
      }
      const twr = thrust / (G0 * (above + wetT));
      cost += c1; rel *= Math.pow(e.rel + bonus, 1 + .15 * (n - 1));
      st[i] = { dv, twr, wet: wetT, dry, fuel, cost: c1, thrust, ve, above }; dvTot += dv; above += wetT;
    }
    const total = above, twr0 = st[0] ? st[0].twr : 0; cost += 15000 + 500 * total;
    let need = dest.dv, low = 0;
    st.forEach((s, i) => { if (i > 0 && s.twr < .25) { need += 400; low++; } });
    if (twr0 < 1.15 && twr0 >= 1) need *= 1 + (1.15 - twr0) * .8;
    const crewOk = !c || !c.crew || top.crew, fairOk = kg <= top.cap;
    return { st, dv: dvTot, need, twr0, cost, total, rel: Math.min(.995, rel), crewOk, fairOk, cap: top.cap, low, lift: twr0 >= 1, enough: dvTot >= need };
  }

  // ---------------- drawing a rocket (also used by the launch) ----------------
  function drawRocket(x, des, cx, base, sc, o) {
    o = o || {}; const L = des.look || LOOK0, stages = o.only ? des.stages.slice(0, o.only) : des.stages; let y = base;
    const wOf = s => { const e = ENGINES[s.eng]; return (e.solid ? 16 : 14) * Math.min(1.4, .7 + (TANKS[s.tank] ? TORD.indexOf(s.tank) * .2 : .3) + (s.count > 1 ? .12 * Math.min(4, s.count) : 0)) * sc; };
    const flameCol = L.flame; let topW = 20 * sc;
    stages.forEach((s, i) => {
      const e = ENGINES[s.eng], w = wOf(s) * (i === 0 ? 1.15 : 1) * Math.pow(.88, i), tanks = e.solid ? 1 : Math.max(1, s.tanks), th = e.solid ? 46 * sc : (TORD.indexOf(s.tank) * 9 + 14) * sc;
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
      if (i === 0 && des.boost && des.boost.count > 0 && ENGINES[des.boost.eng]) { const nb = Math.min(4, des.boost.count), bw = w * .3, bh = h * .85; [-1, 1].forEach((d, k) => { for (let q = 0; q < Math.ceil(nb / 2) && q < 2; q++) { const bx = cx + d * (w / 2 + bw / 2 + q * bw * .95); x.fillStyle = "#e8e8ee"; x.fillRect(bx - bw / 2, y + h - bh, bw, bh); x.fillStyle = L.nose; x.beginPath(); x.moveTo(bx - bw / 2, y + h - bh); x.lineTo(bx, y + h - bh - bw * 1.1); x.lineTo(bx + bw / 2, y + h - bh); x.fill(); x.strokeStyle = "#1a1240"; x.strokeRect(bx - bw / 2, y + h - bh, bw, bh); } }); }
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

  // ---------------- pictures of the 100 places (drawn by us, based on what the places really look like) ----------------
  const PB = { earth: "sub leo cube iss polar sso gps molniya heo geo grave", moon: "moonfly moonorb moonland tranq tycho farside shack gateway", mercury: "merfly merorb", venus: "venfly venorb venland", mars: "marsfly marsorb marsland jezero olympus valles", phobos: "phoborb phobland", deimos: "deimland", ceres: "cerfly cerorb cerland", vesta: "vesfly vesorb vesland", jupiter: "jupfly juporb", io: "ioorb ioland", europa: "euorb euland", ganymede: "ganorb ganland", callisto: "calorb calland", saturn: "satfly satorb", titan: "titorb titland", enceladus: "encorb encland", rhea: "rhland", iapetus: "iapland", mimas: "mimland", uranus: "uranfly uranorb", neptune: "nepfly neporb", triton: "tritland", pluto: "plufly pluorb pluland", charon: "charland", eros: "eros", bennu: "bennu", ryugu: "ryugu", itokawa: "itokawa", psyche: "psyche", apophis: "apophis", halley: "halley", churyumov: "churyumov", halebopp: "halebopp", hyaku: "hyaku", l1: "l1", l2: "l2", sunpass: "sunpass", arrokoth: "arrokoth", eris: "eris", helio: "helio", inter: "inter", dione: "dione", tethys: "tethys", hyperion: "hyperion", phoebe: "phoebe", miranda: "miranda", titania: "titania", oberon: "oberon", ariel: "ariel", amalthea: "amalthea", himalia: "himalia", makemake: "makemake", haumea: "haumea", sedna: "sedna", ida: "ida", lutetia: "lutetia", kleopatra: "kleopatra" };
  const PBODY = {}; Object.keys(PB).forEach(k => PB[k].split(" ").forEach(id => { PBODY[id] = k; }));
  const ROCK = { moon: ["#b0aeb8", "#4c4c58", "#eceaf2", 90], mercury: ["#a39a8e", "#403b36", "#ddd4c6", 110], ceres: ["#8c8982", "#3a3834", "#cac6be", 60], ganymede: ["#8c8272", "#3c352c", "#cabda8", 50], callisto: ["#4e463a", "#1a1612", "#8c8070", 140], rhea: ["#b8b8bc", "#505058", "#f0f0f4", 70], iapetus: ["#c8c8cc", "#46464c", "#f4f4f8", 50], mimas: ["#aaaab0", "#484850", "#e4e4ea", 60], dione: ["#bcbcc2", "#505058", "#f0f0f6", 60], tethys: ["#c4c4ca", "#54545c", "#f4f4fa", 50], miranda: ["#a8a8b0", "#484850", "#e0e0e8", 50], titania: ["#a0a0a8", "#44444c", "#dcdce4", 60], oberon: ["#8c8890", "#3c3a40", "#c8c4cc", 70], ariel: ["#b4b4bc", "#4c4c54", "#e8e8f0", 50], charon: ["#a8a4a8", "#444044", "#e0dce0", 50], eris: ["#e8e8f0", "#7a7a8a", "#ffffff", 20], makemake: ["#b46a46", "#58301c", "#e8a47c", 30], sedna: ["#b0402a", "#4a1a10", "#e87a5a", 10] };
  const HAZE = { venus: ["#ecca7a", "#8a6a30", "#fff2c4"], titan: ["#dc9c3c", "#6c4412", "#ffd890"], uranus: ["#8fe3e6", "#3a8a98", "#d4ffff"], neptune: ["#2f5fd8", "#14307a", "#7aa0ff"] };
  const POTATO = { phobos: ["#8a7a6e", 1.4], deimos: ["#9a8a7e", 1.2], vesta: ["#9a9288", 1.05], eros: ["#a89478", 2.2], bennu: ["#4a4642", 1.05], ryugu: ["#585450", 1.05], itokawa: ["#a88e70", 2.4], psyche: ["#8c8c94", 1.5], apophis: ["#8a8478", 1.6], ida: ["#a09484", 1.8], lutetia: ["#8c8680", 1.3], kleopatra: ["#9c9488", 3], hyperion: ["#b09c84", 1.5], phoebe: ["#5c5852", 1.1], amalthea: ["#a85a40", 1.8], himalia: ["#7a7670", 1.2], haumea: ["#f0f0f8", 1.9], arrokoth: ["#a85a3a", 2.6], churyumov: ["#4a4642", 2.2] };
  const PARENT = { moon: "earth", phobos: "mars", deimos: "mars", io: "jupiter", europa: "jupiter", ganymede: "jupiter", callisto: "jupiter", amalthea: "jupiter", himalia: "jupiter", titan: "saturn", enceladus: "saturn", rhea: "saturn", iapetus: "saturn", mimas: "saturn", dione: "saturn", tethys: "saturn", hyperion: "saturn", phoebe: "saturn", triton: "neptune", miranda: "uranus", titania: "uranus", oberon: "uranus", ariel: "uranus", charon: "pluto" };
  const hsh = str => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const mkr = seed => { let q = seed >>> 0 || 1; return () => (q = (Math.imul(q, 1664525) + 1013904223) >>> 0) / 4294967296; };
  const lit = (x, cx, cy, r, c0, c1, c2) => { const g = x.createRadialGradient(cx - r * .38, cy - r * .38, r * .08, cx, cy, r); g.addColorStop(0, c2); g.addColorStop(.5, c0); g.addColorStop(1, c1); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); };
  const night = (x, cx, cy, r) => { const g = x.createRadialGradient(cx - r * .45, cy - r * .45, r * .55, cx + r * .3, cy + r * .3, r * 1.3); g.addColorStop(0, "rgba(0,0,12,0)"); g.addColorStop(1, "rgba(0,0,12,.5)"); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); };
  const clip = (x, cx, cy, r, fn) => { x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip(); fn(); x.restore(); };
  const starsBg = (x, W, H, rn, n) => { x.fillStyle = "#04061a"; x.fillRect(0, 0, W, H); for (let i = 0; i < (n || 110); i++) { x.globalAlpha = .25 + rn() * .75; x.fillStyle = "#fff"; x.fillRect(rn() * W, rn() * H, 1.4, 1.4); } x.globalAlpha = 1; };
  const crat = (x, cx, cy, r, rn, n) => { for (let i = 0; i < n; i++) { const a = rn() * 6.283, d = Math.sqrt(rn()) * r * .95, px = cx + Math.cos(a) * d, py = cy + Math.sin(a) * d, cr = r * (.025 + rn() * rn() * .13); x.fillStyle = "rgba(0,0,0,.24)"; x.beginPath(); x.arc(px, py, cr, 0, 7); x.fill(); x.fillStyle = "rgba(255,255,255,.14)"; x.beginPath(); x.arc(px - cr * .25, py - cr * .25, cr * .8, 0, 7); x.fill(); } };
  const bandsDraw = (x, cx, cy, r, rn, cols, n, al) => { for (let i = 0; i < n; i++) { const y = cy - r + (i / n) * 2 * r, h = 2 * r / n * (.7 + rn() * .8); x.globalAlpha = al || .55; x.fillStyle = cols[Math.floor(rn() * cols.length)]; x.fillRect(cx - r, y, 2 * r, h); } x.globalAlpha = 1; };
  function potato(x, cx, cy, r, col, el, rn) { const pts = []; for (let i = 0; i < 18; i++) { const a = i / 18 * 6.283, rad = r * (.82 + rn() * .3); pts.push([cx + Math.cos(a) * rad * Math.sqrt(el), cy + Math.sin(a) * rad / Math.sqrt(el)]); } x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.closePath(); const g = x.createRadialGradient(cx - r * .4, cy - r * .4, r * .1, cx, cy, r * 1.2); g.addColorStop(0, col); g.addColorStop(1, "#1a1816"); x.fillStyle = g; x.fill(); x.save(); x.clip(); crat(x, cx, cy, r, rn, 14); x.restore(); }
  function drawBody(x, key, cx, cy, r, rn, t) {
    t = t || 0;
    if (key === "earth") { lit(x, cx, cy, r, "#1f6fd0", "#0a2a68", "#6fb0ff"); clip(x, cx, cy, r, () => { x.fillStyle = "#3a9a52"; [[-.35, -.15, .32, .22], [.25, .15, .3, .26], [-.1, .45, .18, .12], [.5, -.35, .22, .12]].forEach(l => { x.beginPath(); x.ellipse(cx + l[0] * r, cy + l[1] * r, l[2] * r, l[3] * r, .4, 0, 7); x.fill(); }); x.fillStyle = "rgba(255,255,255,.7)"; for (let i = 0; i < 9; i++) { x.beginPath(); x.ellipse(cx + (rn() - .5) * 1.7 * r, cy + (rn() - .5) * 1.7 * r, r * (.1 + rn() * .2), r * .05, rn(), 0, 7); x.fill(); } x.fillStyle = "#fff"; x.fillRect(cx - r, cy - r, 2 * r, r * .12); }); night(x, cx, cy, r); }
    else if (key === "mars") { lit(x, cx, cy, r, "#c8643a", "#5a2410", "#f0a070"); clip(x, cx, cy, r, () => { x.fillStyle = "rgba(70,30,20,.45)"; x.beginPath(); x.ellipse(cx - r * .1, cy + r * .05, r * .5, r * .22, .3, 0, 7); x.fill(); x.ellipse(cx + r * .35, cy - r * .1, r * .25, r * .15, 0, 0, 7); x.fill(); x.fillStyle = "#fff"; x.beginPath(); x.ellipse(cx, cy - r, r * .45, r * .16, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(cx, cy + r, r * .3, r * .1, 0, 0, 7); x.fill(); }); night(x, cx, cy, r); }
    else if (key === "jupiter") { lit(x, cx, cy, r, "#d8b890", "#6a4a30", "#fff0d0"); clip(x, cx, cy, r, () => { bandsDraw(x, cx, cy, r, rn, ["#b06a40", "#e8d0a8", "#9a5a38", "#f4e4c8", "#c88a58"], 16, .6); x.fillStyle = "#c0502a"; x.beginPath(); x.ellipse(cx + r * .3, cy + r * .3, r * .22, r * .12, 0, 0, 7); x.fill(); x.strokeStyle = "rgba(255,220,180,.5)"; x.lineWidth = 2; x.stroke(); }); night(x, cx, cy, r); }
    else if (key === "saturn") { const ring = (front) => { x.save(); x.translate(cx, cy); x.rotate(-.25); x.scale(1, .28); ["#b8a070", "#d8c490", "#9a8660", "#c8b484"].forEach((c, i) => { x.beginPath(); x.strokeStyle = c; x.lineWidth = r * (.12 + i * .02); x.globalAlpha = .85; if (front) x.arc(0, 0, r * (1.35 + i * .17), 0, Math.PI); else x.arc(0, 0, r * (1.35 + i * .17), Math.PI, 7); x.stroke(); }); x.restore(); x.globalAlpha = 1; }; ring(false); lit(x, cx, cy, r, "#e0c890", "#7a6030", "#fff0c8"); clip(x, cx, cy, r, () => bandsDraw(x, cx, cy, r, rn, ["#c8a468", "#f0dca8", "#b89258"], 12, .45)); night(x, cx, cy, r); ring(true); }
    else if (key === "io") { lit(x, cx, cy, r, "#e8d048", "#7a6418", "#fff4a0"); clip(x, cx, cy, r, () => { for (let i = 0; i < 16; i++) { x.fillStyle = i % 3 ? "rgba(60,30,10,.7)" : "rgba(210,90,30,.8)"; x.beginPath(); x.arc(cx + (rn() - .5) * 1.8 * r, cy + (rn() - .5) * 1.8 * r, r * (.03 + rn() * .06), 0, 7); x.fill(); } }); night(x, cx, cy, r); }
    else if (key === "europa") { lit(x, cx, cy, r, "#e8dcc8", "#8a7a64", "#fffaf0"); clip(x, cx, cy, r, () => { x.strokeStyle = "rgba(150,80,40,.7)"; x.lineWidth = 1.6; for (let i = 0; i < 22; i++) { x.beginPath(); x.moveTo(cx + (rn() - .5) * 2 * r, cy + (rn() - .5) * 2 * r); x.quadraticCurveTo(cx + (rn() - .5) * 2 * r, cy + (rn() - .5) * 2 * r, cx + (rn() - .5) * 2 * r, cy + (rn() - .5) * 2 * r); x.stroke(); } }); night(x, cx, cy, r); }
    else if (key === "pluto") { lit(x, cx, cy, r, "#c8a888", "#5a4030", "#f0dcc4"); clip(x, cx, cy, r, () => { x.fillStyle = "rgba(255,248,236,.92)"; x.beginPath(); x.moveTo(cx - r * .15, cy + r * .45); x.bezierCurveTo(cx - r * .7, cy - r * .1, cx - r * .15, cy - r * .5, cx + r * .05, cy - r * .1); x.bezierCurveTo(cx + r * .25, cy - r * .5, cx + r * .8, cy - r * .1, cx - r * .15, cy + r * .45); x.fill(); x.fillStyle = "rgba(90,50,40,.5)"; x.beginPath(); x.ellipse(cx - r * .6, cy + r * .1, r * .25, r * .4, 0, 0, 7); x.fill(); }); night(x, cx, cy, r); }
    else if (key === "sun") { const g = x.createRadialGradient(cx, cy, r * .5, cx, cy, r * 2.2); g.addColorStop(0, "rgba(255,200,60,.55)"); g.addColorStop(1, "rgba(255,120,0,0)"); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r * 2.2, 0, 7); x.fill(); lit(x, cx, cy, r, "#ffc830", "#e86a10", "#fff4b0"); x.strokeStyle = "rgba(255,120,20,.7)"; x.lineWidth = 3; for (let i = 0; i < 6; i++) { const a = i * 1.05 + t; x.beginPath(); x.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r * .22, a + 3.4, a + 6.1); x.stroke(); } }
    else if (key === "halley" || key === "halebopp" || key === "hyaku") { const ang = -.5, len = r * 4.5, col = key === "halebopp" ? ["#bfe0ff", "#ffffff"] : key === "hyaku" ? ["#8affc0", "#eaffff"] : ["#d8f0ff", "#ffffff"]; [[col[0], 1], [col[1], .55]].forEach((c, i) => { const g = x.createLinearGradient(cx, cy, cx + Math.cos(ang) * len, cy + Math.sin(ang) * len); g.addColorStop(0, c[0]); g.addColorStop(1, "rgba(150,200,255,0)"); x.fillStyle = g; x.beginPath(); x.moveTo(cx - Math.sin(ang) * r * (1 - i * .3), cy + Math.cos(ang) * r * (1 - i * .3)); x.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len + (i ? -r : r) * 1.2); x.lineTo(cx + Math.sin(ang) * r * (1 - i * .3), cy - Math.cos(ang) * r * (1 - i * .3)); x.fill(); }); const g2 = x.createRadialGradient(cx, cy, 2, cx, cy, r); g2.addColorStop(0, "#fff"); g2.addColorStop(1, "rgba(200,230,255,0)"); x.fillStyle = g2; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); }
    else if (key === "arrokoth" || key === "churyumov") { potato(x, cx - r * .5, cy, r * .75, POTATO[key][0], 1.1, rn); potato(x, cx + r * .55, cy + r * .05, r * .6, POTATO[key][0], 1.1, rn); }
    else if (key === "kleopatra") { potato(x, cx - r * .75, cy, r * .5, POTATO[key][0], 1, rn); potato(x, cx + r * .75, cy, r * .5, POTATO[key][0], 1, rn); x.fillStyle = "#8a8276"; x.fillRect(cx - r * .7, cy - r * .22, r * 1.4, r * .44); }
    else if (POTATO[key]) potato(x, cx, cy, r, POTATO[key][0], POTATO[key][1], rn);
    else if (ROCK[key]) { const c = ROCK[key]; lit(x, cx, cy, r, c[0], c[1], c[2]); clip(x, cx, cy, r, () => { crat(x, cx, cy, r, rn, c[3]); if (key === "iapetus") { x.fillStyle = "rgba(20,16,12,.7)"; x.fillRect(cx - r, cy - r, r, 2 * r); } if (key === "mimas") { x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.arc(cx - r * .35, cy - r * .1, r * .32, 0, 7); x.fill(); } if (key === "ceres") { x.fillStyle = "#fff"; x.beginPath(); x.arc(cx + r * .2, cy - r * .1, r * .07, 0, 7); x.fill(); } if (key === "charon") { x.fillStyle = "rgba(150,60,40,.6)"; x.beginPath(); x.ellipse(cx, cy - r, r * .5, r * .22, 0, 0, 7); x.fill(); } }); night(x, cx, cy, r); }
    else if (HAZE[key]) { const c = HAZE[key]; lit(x, cx, cy, r, c[0], c[1], c[2]); clip(x, cx, cy, r, () => { bandsDraw(x, cx, cy, r, rn, [c[0], c[2], c[1]], 9, .22); if (key === "neptune") { x.fillStyle = "rgba(255,255,255,.7)"; [[.2, -.1], [-.3, .3]].forEach(q => { x.beginPath(); x.ellipse(cx + q[0] * r, cy + q[1] * r, r * .18, r * .04, 0, 0, 7); x.fill(); }); } }); if (key === "uranus") { x.strokeStyle = "rgba(200,240,255,.5)"; x.lineWidth = 2; x.beginPath(); x.ellipse(cx, cy, r * 1.5, r * .3, 1.45, 0, 7); x.stroke(); } night(x, cx, cy, r); }
    else if (key === "enceladus" || key === "triton") { const c = key === "triton" ? ["#e8c8c0", "#7a5a58", "#fff0ea"] : ["#f6faff", "#8aa2c4", "#ffffff"]; lit(x, cx, cy, r, c[0], c[1], c[2]); clip(x, cx, cy, r, () => { x.strokeStyle = key === "triton" ? "rgba(60,40,40,.5)" : "rgba(80,150,220,.7)"; x.lineWidth = 2; for (let i = 0; i < 8; i++) { x.beginPath(); x.moveTo(cx - r, cy + (rn() - .3) * r * 1.4); x.lineTo(cx + r, cy + (rn() - .3) * r * 1.4); x.stroke(); } }); night(x, cx, cy, r); if (key === "enceladus") { x.fillStyle = "rgba(220,240,255,.8)"; for (let i = 0; i < 24; i++) { x.beginPath(); x.arc(cx - r * .2 + (rn() - .5) * r * .3, cy + r + 6 + i * 3, 1.6, 0, 7); x.fill(); } } }
    else lit(x, cx, cy, r, "#9a9aa4", "#3a3a44", "#d8d8e0");
  }
  function surface(x, key, W, H, rn, place) {
    const air = { mars: ["#d9a07a", "#b8683e", "#a8532e", "#5a2a16"], venus: ["#d8903a", "#8a4a1a", "#7a4a2a", "#3a2412"], titan: ["#d89a3a", "#8a5a1a", "#7a5226", "#3a2410"] }[key];
    const g = x.createLinearGradient(0, 0, 0, H * .6); if (air) { g.addColorStop(0, air[0]); g.addColorStop(1, air[1]); x.fillStyle = g; x.fillRect(0, 0, W, H); } else starsBg(x, W, H, rn, 160);
    const par = PARENT[key]; if (par) drawBody(x, par, W * .72, H * .24, key === "moon" ? 38 : par === "jupiter" || par === "saturn" ? 90 : 55, rn); else if (!air || key === "mars") { x.fillStyle = "#fff8d0"; x.beginPath(); x.arc(W * .8, H * .2, key === "mercury" ? 34 : 8, 0, 7); x.fill(); }
    const base = air ? air[2] : ROCK[key] ? ROCK[key][0] : POTATO[key] ? POTATO[key][0] : key === "europa" ? "#e8dcc8" : key === "enceladus" ? "#eef4ff" : key === "io" ? "#d8c040" : key === "pluto" ? "#c8a888" : key === "triton" ? "#e8c8c0" : "#9a9aa4", dark = air ? air[3] : "#2a2a32";
    const hz = H * (POTATO[key] ? .78 : .62); const gg = x.createLinearGradient(0, hz, 0, H); gg.addColorStop(0, base); gg.addColorStop(1, dark); x.fillStyle = gg; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 20; i++) x.lineTo(W * i / 20, hz - (key === "olympus" ? 0 : 6) + (rn() - .5) * (POTATO[key] ? 4 : 14)); x.lineTo(W, H); x.lineTo(0, H); x.fill();
    if (place === "olympus") { x.fillStyle = "#b8623a"; x.beginPath(); x.moveTo(W * .05, hz); x.lineTo(W * .35, hz - H * .3); x.lineTo(W * .65, hz - H * .3); x.lineTo(W * .98, hz); x.fill(); x.fillStyle = "#6a2c16"; x.beginPath(); x.ellipse(W * .5, hz - H * .3, W * .1, H * .02, 0, 0, 7); x.fill(); }
    if (place === "valles") { x.fillStyle = "#5a2a16"; x.beginPath(); x.moveTo(0, hz + 12); x.lineTo(W * .5, hz + 62); x.lineTo(W, hz + 8); x.lineTo(W, hz + 20); x.lineTo(W * .5, hz + 90); x.lineTo(0, hz + 30); x.fill(); }
    if (place === "shack") { x.fillStyle = "rgba(0,0,0,.65)"; x.beginPath(); x.ellipse(W * .45, hz + 40, W * .35, 26, 0, 0, 7); x.fill(); x.fillStyle = "#cfe9ff"; x.fillRect(W * .5, hz + 36, 10, 3); x.fillRect(W * .3, hz + 42, 8, 3); }
    if (key === "io") { x.fillStyle = "#ff6a20"; x.beginPath(); x.ellipse(W * .3, hz + 20, 40, 7, 0, 0, 7); x.fill(); x.fillStyle = "rgba(255,230,120,.5)"; for (let i = 0; i < 12; i++) { x.beginPath(); x.arc(W * .3 + (rn() - .5) * 50, hz - i * 14, 8 + i, 0, 7); x.fill(); } }
    if (key === "enceladus" || key === "triton") { x.fillStyle = "rgba(235,248,255,.85)"; for (let i = 0; i < 26; i++) { x.beginPath(); x.arc(W * .35 + Math.sin(i) * 8 * (i / 8), hz - i * 7, 3 + i * .2, 0, 7); x.fill(); } }
    for (let i = 0; i < 16; i++) { const rx = rn() * W, ry = hz + 12 + rn() * (H - hz - 20), rs = 3 + rn() * 10; x.fillStyle = "rgba(0,0,0,.3)"; x.beginPath(); x.ellipse(rx, ry, rs * 1.3, rs * .6, 0, 0, 7); x.fill(); x.fillStyle = dark; x.beginPath(); x.ellipse(rx, ry - 2, rs, rs * .6, 0, 0, 7); x.fill(); }
    // our lander (and a flag on the Moon, a rover on Mars)
    const lx = W * .3, ly = hz + 30; x.fillStyle = "#e8e8ee"; x.strokeStyle = "#1a1240"; x.lineWidth = 2; x.beginPath(); x.moveTo(lx - 22, ly - 36); x.lineTo(lx + 22, ly - 36); x.lineTo(lx + 28, ly - 10); x.lineTo(lx - 28, ly - 10); x.closePath(); x.fill(); x.stroke(); x.fillStyle = "#ffd34e"; x.fillRect(lx - 18, ly - 46, 36, 10); x.beginPath(); [[-28, -10, -42, 6], [28, -10, 42, 6]].forEach(l => { x.moveTo(lx + l[0], ly + l[1]); x.lineTo(lx + l[2], ly + l[3]); }); x.stroke();
    if (key === "moon") { x.strokeStyle = "#ddd"; x.lineWidth = 2; x.beginPath(); x.moveTo(W * .55, hz + 38); x.lineTo(W * .55, hz - 14); x.stroke(); x.fillStyle = "#e0314f"; x.fillRect(W * .55, hz - 14, 20, 12); }
    if (key === "mars") { x.fillStyle = "#cfd0d6"; x.fillRect(W * .55, hz + 28, 34, 8); x.fillStyle = "#222"; [0, 12, 24].forEach(d => { x.beginPath(); x.arc(W * .55 + 5 + d, hz + 40, 5, 0, 7); x.fill(); }); }
  }
  // a picture of a place: view "orb" (the body from space) or "surf" (standing on it)
  function drawPlace(x, id, W, H, view, t) {
    const d = DESTS[id], key = PBODY[id] || "moon", rn = mkr(hsh(id)); t = t || 0;
    if (view === "surf" && d && d.kind === "L") { surface(x, key, W, H, rn, id); return; }
    starsBg(x, W, H, rn, 120);
    if (d && d.kind === "S") { const g = x.createLinearGradient(0, H * .7, 0, H); g.addColorStop(0, "rgba(120,200,255,0)"); g.addColorStop(1, "#2a78d8"); x.fillStyle = g; x.fillRect(0, H * .55, W, H); x.fillStyle = "#1f6fd0"; x.beginPath(); x.ellipse(W / 2, H * 1.9, W * 1.1, H * 1.2, 0, 0, 7); x.fill(); x.fillStyle = "rgba(140,220,255,.6)"; x.fillRect(0, H * .78, W, 2); return; }
    if (key === "earth") { const r = Math.min(W, H) * (id === "gps" || id === "molniya" || id === "heo" || id === "geo" || id === "grave" ? .22 : .85); const cy = id === "gps" || id === "molniya" || id === "heo" || id === "geo" || id === "grave" ? H * .55 : H * 1.0; drawBody(x, "earth", W / 2, cy, r, rn); x.strokeStyle = "rgba(255,255,255,.5)"; x.setLineDash([4, 5]); x.lineWidth = 1.5; x.beginPath(); x.ellipse(W / 2, cy, r * (r < H * .5 ? 1.9 : 1.06), r * (r < H * .5 ? .5 : 1.06), 0, 0, 7); x.stroke(); x.setLineDash([]); x.fillStyle = "#ffd34e"; x.fillRect(W / 2 + r * (r < H * .5 ? 1.9 : 1.06) * Math.cos(t * .5 + 1) - 4, cy + r * (r < H * .5 ? .5 : 1.06) * Math.sin(t * .5 + 1) - 3, 8, 6); if (id === "iss") { x.fillStyle = "#e8e8ee"; x.fillRect(W * .66, H * .2, 40, 6); x.fillStyle = "#3a6fd0"; x.fillRect(W * .66 - 14, H * .2 - 8, 14, 22); x.fillRect(W * .66 + 40, H * .2 - 8, 14, 22); } return; }
    if (d && d.kind === "P") {
      if (id === "l1" || id === "l2" || id === "gateway") { if (id === "gateway") { drawBody(x, "moon", W * .62, H * .5, H * .36, rn); drawBody(x, "earth", W * .12, H * .3, H * .13, rn); x.fillStyle = "#e8e8ee"; x.fillRect(W * .3, H * .4, 24, 8); return; } drawBody(x, "sun", id === "l1" ? W * .12 : W * .88, H * .5, H * .16, rn, t); drawBody(x, "earth", W * .5, H * .5, H * .12, rn); x.fillStyle = "#6be28f"; x.beginPath(); x.arc(id === "l1" ? W * .3 : W * .68, H * .5, 6, 0, 7); x.fill(); x.fillStyle = "#fff"; x.font = "bold 14px system-ui"; x.textAlign = "center"; x.fillText(id === "l1" ? "L1" : "L2", id === "l1" ? W * .3 : W * .68, H * .5 - 12); return; }
      if (id === "sunpass") { drawBody(x, "sun", W * .5, H * 1.05, H * .6, rn, t); return; }
      if (id === "helio") { drawBody(x, "sun", W * .2, H * .5, 8, rn); x.strokeStyle = "rgba(120,180,255,.6)"; x.lineWidth = 2; x.beginPath(); x.ellipse(W * .2, H * .5, W * .55, H * .42, 0, -1.2, 1.2); x.stroke(); x.fillStyle = "#fff"; x.font = "12px system-ui"; x.fillText("the Sun's wind bubble", W * .55, H * .15); return; }
      if (id === "inter") { x.fillStyle = "#ffe8b0"; x.beginPath(); x.arc(W * .8, H * .35, 6, 0, 7); x.fill(); x.fillStyle = "rgba(255,232,176,.3)"; x.beginPath(); x.arc(W * .8, H * .35, 16, 0, 7); x.fill(); return; }
    }
    const small = key === "phobos" || key === "deimos" || POTATO[key] || key === "halley" || key === "halebopp" || key === "hyaku"; const r = (small ? .22 : .38) * H * (d && d.kind === "F" ? .75 : 1.05); const cx = d && d.kind === "F" ? W * .62 : W * .5;
    if (PARENT[key] && d && d.kind !== "F") drawBody(x, PARENT[key], W * .15, H * .3, H * .17, rn);
    drawBody(x, key, cx, H * .5, r, rn, t);
    if (d && d.kind === "F") { x.strokeStyle = "rgba(255,255,255,.35)"; x.setLineDash([5, 6]); x.beginPath(); x.moveTo(0, H * .85); x.quadraticCurveTo(W * .35, H * .55, W * .45, H * .25); x.stroke(); x.setLineDash([]); }
  }
  const FACTS_PLACE = { earth: "Earth is the only place we know with life. 71% of it is covered by water.", moon: "The Moon is about 384,000 km away. Astronauts walked on it between 1969 and 1972.", mercury: "Mercury is the closest planet to the Sun. A year there lasts only 88 Earth days.", venus: "Venus is the hottest planet: about 465°C, hot enough to melt lead.", mars: "Mars looks red because of rusty iron in its dust. It has the tallest volcano we know, Olympus Mons.", phobos: "Phobos circles Mars in just 7.6 hours and is slowly getting closer.", deimos: "Deimos is only about 12 km across: a tiny, dark moon.", ceres: "Ceres is a dwarf planet in the asteroid belt with mysterious bright salt spots.", vesta: "Vesta has a giant crater at its south pole almost as wide as the whole asteroid.", jupiter: "Jupiter is so big that all the other planets would fit inside it. Its Great Red Spot is a storm bigger than Earth.", io: "Io has over 400 active volcanoes, more than anywhere else in the solar system.", europa: "Europa hides an ocean of liquid water under its icy crust.", ganymede: "Ganymede is the biggest moon in the solar system, even bigger than Mercury.", callisto: "Callisto is one of the most heavily cratered places known.", saturn: "Saturn's rings are made of ice and rock, and are very thin: often only about 10 metres thick.", titan: "Titan has thick orange air and lakes of liquid methane.", enceladus: "Enceladus shoots geysers of water ice into space from cracks near its south pole.", rhea: "Rhea is Saturn's second-biggest moon and is covered in craters.", iapetus: "Iapetus has one very dark side and one very bright side.", mimas: "Mimas has one huge crater, nearly a third of its whole width.", uranus: "Uranus spins on its side, so its seasons last about 21 years each.", neptune: "Neptune has the fastest winds of any planet: over 2,000 km/h.", triton: "Triton circles Neptune backwards and has icy geysers.", pluto: "Pluto has a big heart-shaped area of nitrogen ice.", charon: "Charon is so big that Pluto and Charon circle each other.", eros: "Eros was the first asteroid orbited by a spacecraft.", bennu: "A spacecraft collected a sample from Bennu and brought it back to Earth.", ryugu: "Ryugu is shaped like a spinning top and was visited by Japan's Hayabusa2.", itokawa: "Itokawa is a peanut-shaped asteroid, only about 500 metres long.", psyche: "Psyche may be the metal core of a planet that never finished forming.", apophis: "In 2029 the asteroid Apophis will pass closer to Earth than TV satellites.", halley: "Halley's Comet comes back about every 76 years.", churyumov: "Comet 67P looks like a rubber duck. The Rosetta mission put a lander on it.", halebopp: "Comet Hale-Bopp was bright enough to see for 18 months in 1996 and 1997.", hyaku: "Comet Hyakutake passed very close to Earth in 1996 and grew a long tail.", l1: "L1 is a spot between Earth and the Sun where satellites can stay in line with both.", l2: "L2 is where the James Webb Space Telescope sits, behind Earth as seen from the Sun.", sunpass: "The Sun holds 99.8% of all the mass in the solar system.", arrokoth: "Arrokoth looks like a snowman: two lobes stuck together.", eris: "Eris is a dwarf planet about as big as Pluto but even farther away.", helio: "The heliosphere is the huge bubble of wind blown out by the Sun.", inter: "Voyager 1 entered interstellar space in 2012, the first spacecraft to do it.", dione: "Dione is an icy moon of Saturn with bright wispy cliffs.", tethys: "Tethys has a canyon, Ithaca Chasma, that runs most of the way round it.", hyperion: "Hyperion looks like a sponge and tumbles chaotically as it orbits.", phoebe: "Phoebe circles Saturn backwards and is probably a captured comet-like object.", miranda: "Miranda has a cliff about 20 km high, the tallest known in the solar system.", titania: "Titania is the biggest moon of Uranus.", oberon: "Oberon is the second-biggest moon of Uranus and is covered in craters.", ariel: "Ariel has deep canyons and is one of the brightest moons of Uranus.", amalthea: "Amalthea is a reddish, potato-shaped moon of Jupiter.", himalia: "Himalia is the biggest of Jupiter's small outer moons.", makemake: "Makemake is a reddish dwarf planet far beyond Neptune.", haumea: "Haumea spins so fast that it is stretched into an egg shape.", sedna: "Sedna takes about 11,000 years to go once round the Sun.", ida: "Asteroid Ida has its own tiny moon, called Dactyl.", lutetia: "Lutetia is a big asteroid that the Rosetta spacecraft flew past in 2010.", kleopatra: "Kleopatra is shaped like a dog bone.", sub: "A suborbital flight goes above 100 km, the edge of space, but does not stay up.", leo: "Low Earth orbit is only a few hundred kilometres up, and satellites there circle Earth every 90 minutes or so.", cube: "A cubesat is a tiny satellite built from 10 cm cubes.", iss: "The Space Station orbits Earth about every 90 minutes.", polar: "Polar orbits pass over both poles, so a satellite sees the whole Earth as it turns.", sso: "A sun-synchronous orbit passes over each place at the same local time every day.", gps: "GPS satellites orbit about 20,200 km up.", molniya: "Molniya orbits swing very close to Earth and then very far out.", heo: "A high Earth orbit takes more than a day to go round.", geo: "A satellite in geostationary orbit goes round in 24 hours, so it stays above the same spot.", grave: "Old satellites are moved to a graveyard orbit so they don't hit working ones.", gateway: "A gateway station could circle the Moon in a long, stretched orbit." };
  const factOf = id => FACTS_PLACE[id] || FACTS_PLACE[PBODY[id]] || "";

  // ---------------- UI ----------------
  function open() {
    S = load() || fresh(); if (!S.design) S.design = fresh().design; const f0 = fresh(); ["company", "visited", "sat", "debt", "fj"].forEach(k => { if (!S[k]) S[k] = f0[k]; }); S.contracts = (S.contracts || []).filter(c => DESTS[c.dest]); S.design.boost = S.design.boost || { eng: "srb", count: 0 }; S.design.extras = S.design.extras || {}; (S.designs || []).forEach(d => { d.boost = d.boost || { eng: "srb", count: 0 }; d.extras = d.extras || {}; }); refill(); save();
    app = document.getElementById("app"); tab = "contracts"; sel = null; render();
  }
  function head() {
    const t = tier();
    return `<button class="back" id="rcHome">← All subjects</button><div class="rc-head"><h1>${esc(S.company)}</h1><div class="rc-stats"><span>Cash <b>${money(S.cash)}</b></span>${S.debt > 0 ? `<span>Debt <b class="badc">${money(S.debt)}</b></span>` : ""}<span>${esc(TIERNAMES[t])}</span><span>Launches <b>${S.ok}</b> good / ${S.tries}</span></div></div>
      <p class="sub">You run a launch company: customers order a ride into space for their satellites. Play money only! Build rockets, take orders, and launch heavier and heavier satellites. <label class="rc-co">Company name <input id="rcCo" maxlength="20" value="${esc(S.company)}"></label></p>
      <div class="rc-tabs">${[["contracts", "Orders"], ["build", "Build"], ["places", "100 Places"], ["research", "Shop & research"], ["eng", "Engineer job"], ["fun", "Fun jobs"], ["bank", "Loans"], ["stocks", "Stocks"], ["learn", "Rocket science"], ["log", "Records"]].map(a => `<button type="button" class="rc-tab ${tab === a[0] ? "on" : ""}" data-t="${a[0]}">${a[1]}</button>`).join("")}</div>`;
  }
  function render() {
    if (!app) return; const t = { contracts, build, places, research, eng, fun, bank, stocks, learn, log }[tab] || contracts;
    app.innerHTML = head() + '<div class="rc-body" id="rcBody"></div>';
    document.getElementById("rcCo").onchange = e => { S.company = e.target.value.replace(/[^\p{L}\p{N} _&'-]/gu, "").trim().slice(0, 20) || "My Rocket Co"; save(); render(); };
    document.getElementById("rcHome").onclick = () => { if (typeof home === "function") home(); };
    app.querySelectorAll(".rc-tab").forEach(b => b.onclick = () => { tab = b.dataset.t; fjOn = null; fjClear(); render(); });
    t(document.getElementById("rcBody")); window.scrollTo(0, 0);
  }
  const cur = () => S.contracts.find(c => c.id === sel) || null;

  function contracts(el) {
    el.innerHTML = `<p class="note">Customers send you orders. Pick an order, then build a rocket to carry their satellite. Heavier and farther orders pay much more.</p><div class="rc-cards">${S.contracts.map(c => {
      const d = DESTS[c.dest]; return `<div class="rc-card ${c.heavy ? "heavy" : ""} ${sel === c.id ? "sel" : ""}"><canvas class="rc-pic" width="220" height="110" data-pid="${c.dest}"></canvas><b>${esc(c.who)}</b>${c.heavy ? '<em class="rc-hv">HEAVY!</em>' : ""}<div>${esc(c.thing)}</div><div>Weight: <b>${c.kg.toLocaleString()} kg</b></div><div>Goes to: <b>${esc(d.name)}</b></div>${c.crew ? "<div>Needs a <b>crew capsule</b></div>" : ""}<div class="rc-pay">Pays ${money(c.pay)}</div><button class="close" data-id="${c.id}">Take this order</button></div>`;
    }).join("")}</div><button class="hintbtn" id="rcNew" type="button">Look for other orders</button>`;
    pics(el);
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
    const maxStages = has("stage5") ? 5 : has("stage4") ? 4 : has("stage3") ? 3 : 2;
    const bar = (lab, v, mx, cls) => `<div class="rc-bar"><span>${lab}</span><div><i class="${cls}" style="width:${Math.min(100, v / mx * 100)}%"></i></div><b>${Math.round(v).toLocaleString()}</b></div>`;
    el.innerHTML = `<div class="rc-build"><div class="rc-prev"><canvas id="rcPrev" width="300" height="430"></canvas><div class="rc-name"></div></div>
      <div class="rc-ed">
        ${c ? `<div class="rc-job"><b>Order:</b> ${c0.kg.toLocaleString()} kg ${esc(c.thing)} to ${esc(DESTS[c.dest].name)}, pays <b>${money(c.pay)}</b> <button class="hintbtn" id="rcJobs" type="button">Change order</button></div>` : '<div class="rc-job">Take an order first on the <b>Orders</b> tab. Until then this just tests a 200 kg satellite.</div>'}
        ${des.stages.map((s, i) => `<div class="rc-stage"><h3>Stage ${i + 1}${i === 0 ? " (bottom, lights first)" : ""}</h3>
          <label>Engine <select data-i="${i}" data-k="eng">${opt(ENGINES, s.eng)}</select></label>
          <label>How many <input type="number" min="1" max="30" value="${s.count}" data-i="${i}" data-k="count"></label>
          ${ENGINES[s.eng].solid ? '<p class="note">This booster carries its own fuel.</p>' : `<label>Fuel tank <select data-i="${i}" data-k="tank">${opt(TANKS, s.tank)}</select></label>
          <label>Tanks <input type="number" min="1" max="20" value="${s.tanks}" data-i="${i}" data-k="tanks"></label>
          <label>Fuel <select data-i="${i}" data-k="fuel">${opt(FUELS, s.fuel)}</select></label>`}
          <div class="rc-sm">Δv ${Math.round(a.st[i].dv).toLocaleString()} m/s · push ${Math.round(a.st[i].thrust).toLocaleString()} kN · weight ${a.st[i].wet.toFixed(1)} t${des.stages.length > 1 ? ` <button class="hintbtn rc-x" data-del="${i}" type="button">Remove stage</button>` : ""}</div></div>`).join("")}
        ${des.stages.length < maxStages ? '<button class="hintbtn" id="rcAddStage" type="button">Add a stage on top</button>' : ""}
        <label>Top part <select id="rcTop">${opt(TOPS, des.top)}</select></label>
        <div class="rc-stage"><h3>Strap-on boosters (they fire with stage 1)</h3>
          <label>Type <select id="boType"><option value="srb" ${des.boost.eng === "srb" ? "selected" : ""} ${has("srb") ? "" : "disabled"}>Solid Booster${has("srb") ? "" : " (research it)"}</option><option value="bigsrb" ${des.boost.eng === "bigsrb" ? "selected" : ""} ${has("bigsrb") ? "" : "disabled"}>Big Solid Booster${has("bigsrb") ? "" : " (research it)"}</option></select></label>
          <label>How many <input type="number" min="0" max="12" id="boCount" value="${des.boost.count}"></label>
          <p class="rc-sm">Boosters add lots of push for liftoff and fall away when empty.</p></div>
        <div class="rc-stage"><h3>Extras</h3>
          <label class="rc-ins"><input type="checkbox" id="exAv" ${des.extras.avionics ? "checked" : ""}> Redundant computers ($120,000): engines are 2.5% more reliable</label>
          <label class="rc-ins"><input type="checkbox" id="exFin" ${des.extras.fins ? "checked" : ""}> Grid fins and parachutes ($60,000): your first stage can come back and save you money</label></div>
        <div class="rc-sat"><h3>Your satellite</h3>
          <label>Name it <input id="satName" maxlength="14" value="${esc(sat.name)}"></label>
          <div class="rc-pieces">${Object.keys(SATP).map(k => `<label>${esc(SATP[k][0])} <small>${SATP[k][1]} kg · ${money(SATP[k][2])} · +${SATP[k][3]}% pay</small> <input type="number" min="0" max="3" value="${sat.pieces[k] || 0}" data-sp="${k}"></label>`).join("")}</div>
          <p class="rc-sm">Pieces weigh ${pk} kg and cost ${money(pc)}. They raise the pay by <b>${pb}%</b>, but if the satellite is lost you owe the customer <b>${money(liab)}</b>.</p>
          <label class="rc-ins"><input type="checkbox" id="satIns" ${sat.insure ? "checked" : ""}> Insurance (${money(Math.round(liab * .12 / 100) * 100)}): if the satellite is lost, the insurer pays</label></div>
        <div class="rc-gauges">
          ${bar("Δv you have", a.dv, Math.max(a.need, a.dv, 1), a.enough ? "ok" : "bad")}${bar("Δv needed (m/s)", a.need, Math.max(a.need, a.dv, 1), "need")}
          <p class="rc-sm">Push at liftoff compared with weight (TWR): <b class="${a.twr0 >= 1.15 ? "okc" : a.lift ? "warn" : "badc"}">${a.twr0.toFixed(2)}</b> ${a.twr0 >= 1.15 ? "(good)" : a.lift ? "(slow, wastes fuel)" : "(too heavy to lift!)"}</p>
          <p class="rc-sm">Rocket weight ${a.total.toFixed(1)} tonnes · Rocket price <b>${money(a.cost)}</b> (+ satellite pieces ${money(pc)}) · Engines work ${Math.round(a.rel * 100)}% of the time${a.low ? " · weak upper stage: extra Δv needed" : ""}</p>
          ${c && !a.crewOk ? '<p class="rc-sm badc">This order needs the Crew capsule as the top part.</p>' : ""}${c && !a.fairOk ? `<p class="rc-sm badc">This satellite (${c.kg.toLocaleString()} kg) is too big for this top part. It can carry up to ${a.cap.toLocaleString()} kg. Pick a wider fairing (research it in the shop).</p>` : ""}</div>
        <button class="close rc-go" id="rcGo" type="button" ${c && a.lift && a.crewOk && a.fairOk && S.cash >= total ? "" : "disabled"}>${!c ? "Take an order first" : S.cash < total ? "Not enough cash" : !a.lift ? "Too heavy to lift" : !a.crewOk ? "Needs a crew capsule" : !a.fairOk ? "Needs a wider fairing" : "LAUNCH! (" + money(total) + ")"}</button>
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
    const mc = document.createElement("canvas").getContext("2d"); mc.canvas.width = 300; mc.canvas.height = 6000; const hh = 5900 - drawRocket(mc, des, 150, 5900, 1, { flame: 0 }), sc = Math.max(.12, Math.min(1.5, 330 / hh)); drawRocket(x, des, 150, 392, sc, { flame: 0 });
    x.fillStyle = "rgba(255,255,255,.9)"; x.font = "bold 14px system-ui"; x.textAlign = "center"; x.fillText(L.name, 150, 420);
    const redo = () => { save(); const y = window.scrollY; render(); window.scrollTo(0, y); };
    el.querySelectorAll("[data-i]").forEach(inp => inp.onchange = () => { const s = des.stages[+inp.dataset.i], k = inp.dataset.k; s[k] = (k === "count" || k === "tanks") ? Math.max(1, Math.min(k === "count" ? 30 : 20, +inp.value || 1)) : inp.value; snd("pick"); redo(); });
    el.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { des.stages.splice(+b.dataset.del, 1); redo(); });
    const add = el.querySelector("#rcAddStage"); if (add) add.onclick = () => { des.stages.push({ eng: has("whisper") ? "whisper" : "spark", count: 1, tank: "S", tanks: 1, fuel: "kero" }); snd("pick"); redo(); };
    const bt = el.querySelector("#boType"); if (bt) bt.onchange = () => { des.boost.eng = bt.value; redo(); };
    const bc = el.querySelector("#boCount"); if (bc) bc.onchange = () => { des.boost.count = Math.max(0, Math.min(12, +bc.value || 0)); snd("pick"); redo(); };
    const ea = el.querySelector("#exAv"); if (ea) ea.onchange = () => { des.extras.avionics = ea.checked; redo(); };
    const ef = el.querySelector("#exFin"); if (ef) ef.onchange = () => { des.extras.fins = ef.checked; redo(); };
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
    el.innerHTML = `<p class="note">100 real places to go! You have visited <b>${seen} / 100</b>. Orders for a place appear when you reach the right level, and the first trip there pays a bonus.</p><div class="rc-places">${DLIST.map(d => { const v = S.visited[d.id]; return `<div class="rc-place ${v ? "seen" : d.tier > t ? "locked" : ""}"><canvas class="rc-pic" width="200" height="100" data-pid="${d.id}"></canvas><b>${esc(d.name)}</b><small>Needs ${d.dv.toLocaleString()} m/s · ${d.alt >= 1e9 ? (d.alt / 1e9).toFixed(1) + " billion km" : d.alt >= 1e6 ? Math.round(d.alt / 1e6) + " million km" : d.alt.toLocaleString() + " km"} away</small><em>${v ? "Visited " + v + "x" : d.tier > t ? "Level " + (d.tier + 1) + " needed" : "Open"}</em></div>`; }).join("")}</div>`; pics(el);
  }
  function pics(el) { el.querySelectorAll("canvas[data-pid]").forEach(cv => { try { drawPlace(cv.getContext("2d"), cv.dataset.pid, cv.width, cv.height, "orb"); } catch (e) {} }); }
  // ---------------- stock market (pretend companies, pretend money) ----------------
  const STOCKS = [["ROKT", "Skyward Rockets", 2400, .035], ["FUEL", "Cryo Fuel Co", 900, .03], ["SATS", "Orbit Satellites", 3800, .04], ["TOUR", "Moon Tours Ltd", 650, .07], ["MINE", "Asteroid Mining Inc", 420, .09], ["COMM", "Nova Telecom", 3100, .025], ["FOOD", "Space Snacks", 300, .05], ["ROBO", "Rover Robotics", 1700, .045], ["SOLR", "Sun Energy", 1200, .04], ["MARS", "Mars Colony Corp", 250, .12]];
  const NEWS = [["ROKT", "Skyward Rockets wins a big launch deal", .06], ["ROKT", "Skyward Rockets has a rocket failure", -.07], ["FUEL", "Cryo Fuel Co finds a cheaper fuel recipe", .06], ["FUEL", "A fuel factory has a fire", -.06], ["SATS", "Orbit Satellites launches 100 new satellites", .06], ["SATS", "Orbit Satellites loses a satellite", -.06], ["TOUR", "Moon Tours sells out its first trip", .1], ["TOUR", "Moon Tours has a safety scare", -.1], ["MINE", "Asteroid Mining finds gold in a rock", .15], ["MINE", "Asteroid Mining's probe breaks", -.12], ["COMM", "Nova Telecom signs a giant phone deal", .05], ["FOOD", "Space Snacks adds a new flavour", .04], ["ROBO", "Rover Robotics wins a Mars order", .08], ["SOLR", "Sun Energy builds a bigger solar farm", .05], ["MARS", "Mars Colony Corp plans a new base", .18], ["MARS", "Mars Colony Corp runs out of money", -.2], ["*", "The whole space industry is booming!", .03], ["*", "Worried news makes everyone sell", -.03]];
  const gauss = () => { let u = 0; while (!u) u = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.283 * Math.random()); };
  function mktStep(launchOk, quiet) {
    if (!quiet) S.shifts = 5;
    const m = S.mkt; m.day++; const ev = Math.random() < (quiet ? .06 : .35) ? pick(NEWS) : null;
    STOCKS.forEach(st => { const h = m.hist[st[0]], p = h[h.length - 1]; let r = Math.log(st[2] / p) * .004 + .007 + st[3] * .6 * gauss();
      if (ev && (ev[0] === st[0] || ev[0] === "*")) r += ev[2]; if (launchOk === true || launchOk === false) { if (st[0] === "ROKT" || st[0] === "SATS") r += launchOk ? .012 : -.012; }
      h.push(Math.max(1, Math.round(p * Math.exp(r) * 100) / 100)); if (h.length > 120) h.shift(); });
    if (ev && !quiet) { m.news.unshift("Day " + m.day + ": " + ev[1]); m.news = m.news.slice(0, 8); }
  }
  function mktInit() { if (S.mkt && S.mkt.hold) { Object.values(S.mkt.hold).forEach(h => { if (h) S.cash += h.cost; }); } const m = { day: 0, hist: {}, hold: {}, news: [] }; STOCKS.forEach(st => { m.hist[st[0]] = [st[2]]; }); S.mkt = m; for (let i = 0; i < 60; i++) mktStep(null, true); m.day = 0; }
  const px = sym => { const h = S.mkt.hist[sym]; return h[h.length - 1]; };
  function stocks(el) {
    if (!S.mkt || S.mkt.v !== 2) { mktInit(); S.mkt.v = 2; save(); } const m = S.mkt; let val = 0, cost = 0; STOCKS.forEach(st => { const h = m.hold[st[0]]; if (h) { val += h.n * px(st[0]); cost += h.cost; } });
    el.innerHTML = `<p class="note">The Space Stock Market! These are <b>pretend companies</b> and <b>pretend money</b>. Prices change every time you launch, or when you press "Wait a day". Real stocks can go down as well as up, and real investing is a job for grown-ups.</p>
      <div class="rc-bankbox"><div>Cash <b>${money(S.cash)}</b></div><div>Market day <b>${m.day}</b></div><div>Shares you own are worth <b>${money(val)}</b> (you paid ${money(cost)}) · profit <b class="${val - cost >= 0 ? "okc" : "badc"}">${money(val - cost)}</b></div><div class="rc-sm">Every trade costs a 0.5% fee. Spreading your money over several companies is safer than putting it all in one.</div></div>
      <button class="close" id="mkWait" type="button">Wait a day</button>
      ${m.news.length ? `<h3>News</h3><div class="rc-news">${m.news.map(n => `<div>${esc(n)}</div>`).join("")}</div>` : ""}
      <div class="rc-stks">${STOCKS.map(st => { const sym = st[0], h = m.hist[sym], p = h[h.length - 1], prev = h[h.length - 2] || p, chg = (p / prev - 1) * 100, own = m.hold[sym] ? m.hold[sym].n : 0;
        return `<div class="rc-stk"><div class="rc-stkh"><b>${sym}</b> ${esc(st[1])}</div><canvas data-sp="${sym}" width="200" height="50"></canvas><div class="rc-stkp"><b>$${p.toFixed(2)}</b> <span class="${chg >= 0 ? "okc" : "badc"}">${chg >= 0 ? "+" : ""}${chg.toFixed(1)}%</span></div><div class="rc-sm">You own <b>${own.toLocaleString()}</b> (${money(own * p)})</div><div class="rc-stkb">${[1, 10, 100].map(n => `<button class="close" data-buy="${sym}:${n}" ${S.cash < n * p * 1.005 ? "disabled" : ""}>Buy ${n}</button>`).join("")}${[1, 10].map(n => `<button class="hintbtn" data-sell="${sym}:${n}" ${own < n ? "disabled" : ""}>Sell ${n}</button>`).join("")}<button class="hintbtn" data-sell="${sym}:all" ${own < 1 ? "disabled" : ""}>Sell all</button></div></div>`; }).join("")}</div>`;
    STOCKS.forEach(st => { const cv = el.querySelector(`canvas[data-sp="${st[0]}"]`), x = cv.getContext("2d"), h = m.hist[st[0]], mn = Math.min(...h), mx = Math.max(...h); x.strokeStyle = h[h.length - 1] >= h[0] ? "#6be28f" : "#ff8a8a"; x.lineWidth = 2; x.beginPath(); h.forEach((v, i) => { const X = i / (h.length - 1) * 196 + 2, Y = 46 - (v - mn) / Math.max(.01, mx - mn) * 42; i ? x.lineTo(X, Y) : x.moveTo(X, Y); }); x.stroke(); });
    el.querySelector("#mkWait").onclick = () => { mktStep(null, false); save(); snd("tick"); render(); };
    el.querySelectorAll("[data-buy]").forEach(b => b.onclick = () => { const [sym, n] = b.dataset.buy.split(":"), q = +n, c = q * px(sym) * 1.005; if (S.cash < c) return; S.cash -= c; const h = m.hold[sym] || (m.hold[sym] = { n: 0, cost: 0 }); h.n += q; h.cost += c; save(); snd("clink"); const y = window.scrollY; render(); window.scrollTo(0, y); });
    el.querySelectorAll("[data-sell]").forEach(b => b.onclick = () => { const [sym, n] = b.dataset.sell.split(":"), h = m.hold[sym]; if (!h) return; const q = n === "all" ? h.n : +n; if (q > h.n || q < 1) return; const get = q * px(sym) * .995; S.cash += get; h.cost *= (h.n - q) / h.n; h.n -= q; if (!h.n) delete m.hold[sym]; save(); snd("pop"); const y = window.scrollY; render(); window.scrollTo(0, y); });
  }

  // ---------------- engineer job ----------------
  let engQ = null, engMsg = "";
  const engPay = () => 10000 + 1000 * tier();
  const ENGQ = [
    ["What does a rocket need to get off the ground?", "Lots of push from its engines", ["A big wing", "A long runway", "A parachute"], "Engines push the rocket up, harder than gravity pulls it down."],
    ["What do rockets burn to make their push?", "Fuel", ["Water only", "Sand", "Cheese"], "Fuel burns and shoots out the back, pushing the rocket up."],
    ["Which one is a rocket part?", "Engine", ["Bicycle", "Sofa", "Umbrella"], "Engines make the push that lifts a rocket."],
    ["Where do we put a satellite on a rocket?", "In the nose, on top", ["Under the engine", "Outside on the fins", "In the fuel tank"], "The satellite rides at the top, inside the nose cone."],
    ["What is a satellite?", "Something that goes around a planet in space", ["A kind of fish", "A car", "A cloud"], "Satellites circle the Earth and send us pictures, TV and maps."],
    ["What does an empty fuel tank do to a rocket?", "It is just extra weight", ["It makes the rocket faster", "It makes more fuel", "Nothing at all"], "That is why rockets drop empty parts. It's called staging!"],
    ["Why do rockets drop their empty parts?", "To get lighter", ["To get heavier", "To look cool", "To make noise"], "A lighter rocket speeds up more easily."],
    ["Which is heavier, a full fuel tank or an empty one?", "The full one", ["The empty one", "They always weigh the same", "Neither"], "Fuel has weight!"],
    ["Is it easier to push a light rocket or a heavy rocket?", "A light rocket", ["A heavy rocket", "They are the same", "Neither"], "Less weight needs less push."],
    ["What is the planet we live on called?", "Earth", ["Mars", "The Moon", "The Sun"], "Our rockets start on Earth."],
    ["Which place is closest to Earth?", "The Moon", ["Mars", "Jupiter", "Neptune"], "The Moon is about 384,000 km away, much closer than any planet."],
    ["Which planet is called the Red Planet?", "Mars", ["Earth", "Venus", "Neptune"], "Mars looks red because of rusty dust."],
    ["Which is farther away, the Moon or Mars?", "Mars", ["The Moon", "They are the same", "Neither"], "Mars is much, much farther than the Moon."],
    ["Will a far trip need more fuel or less fuel?", "More fuel", ["Less fuel", "No fuel", "Only water"], "Going farther needs more push, so more fuel."],
    ["Why do some rockets have fins?", "To help them fly straight", ["To hold snacks", "To be heavier", "To make coffee"], "Fins keep a rocket pointing the right way."],
    ["What shape is the top of a rocket?", "Pointy, like a cone", ["Flat like a table", "Like a square box", "Like a ball"], "A pointy nose cuts through the air."],
    ["What happens if a rocket is heavier than its push?", "It cannot lift off", ["It flies super fast", "It goes sideways", "It turns blue"], "The push has to be bigger than the weight."],
    ["How many engines make a stronger push, 1 or 5?", "5 engines", ["1 engine", "They are the same", "0 engines"], "More engines means more push, but also more weight."],
    ["What do we call a rocket's parts that fall off when empty?", "Stages", ["Hats", "Wheels", "Doors"], "A rocket with 2 stages drops the first stage first."],
    ["Which one can fly to space?", "A rocket", ["A bicycle", "A boat", "A bus"], "Only rockets are fast enough to reach space."],
    ["What is orbit?", "Going around a planet again and again", ["Going straight forever", "Standing still", "Going underground"], "In orbit you are falling around the Earth but moving sideways so fast you never land."],
    ["Do you need to tell the satellite to open at the right time?", "Yes, deploy it at the right time", ["No, never", "Only when you sleep", "Only on Mondays"], "In the game, press Deploy when the marker is in the green zone."],
    ["If you borrow money from the bank, what must you do later?", "Pay it back, plus a little extra", ["Keep it forever", "Nothing", "Give it to a friend"], "Extra money you pay is called interest."],
    ["What is a company that makes rockets trying to do?", "Help customers and earn money", ["Break things", "Hide from people", "Run away"], "You give a service and customers pay you."],
    ["Which is the biggest, the Sun or the Earth?", "The Sun", ["The Earth", "The Moon", "A rocket"], "You could fit about a million Earths inside the Sun!"],
    ["Which is hotter, the Sun or the Moon?", "The Sun", ["The Moon", "They are the same", "Neither"], "The Sun is a giant ball of hot gas."],
    ["Is space full of air like on Earth?", "No, space is almost empty", ["Yes, lots of air", "It is full of water", "It is full of snow"], "That is why astronauts need space suits."],
    ["Why do astronauts wear space suits?", "There is no air in space", ["For fashion", "To be warm in bed", "To swim"], "The suit gives them air and keeps them safe."],
    ["What shape is the Earth?", "Round, like a ball", ["Flat like a plate", "Like a cube", "Like a banana"], "Earth is a big ball floating in space."]
  ];
  function engMake() {
    const shuf = a => a.sort(() => Math.random() - .5);
    if (Math.random() < .25) { const w = pick([10, 20, 50, 100]), lift = Math.random() < .5, th = lift ? w * pick([2, 3]) : Math.round(w / 2);
      return { q: `A rocket weighs ${w}. Its engines push with a strength of ${th}. Can it lift off? (It must push harder than its weight.)`, a: shuf([{ t: "Yes, it lifts off", ok: lift }, { t: "No, it stays on the ground", ok: !lift }]), why: `${th} ${lift ? "is bigger than" : "is smaller than"} ${w}, so it ${lift ? "lifts off" : "stays down"}.` }; }
    if (Math.random() < .2) { const a = R2(2, 9), b = R2(2, 9); const r = a + b;
      return { q: `You have ${a} fuel tanks and buy ${b} more. How many do you have?`, a: shuf([r, r + 1, r - 1, r + 2].map(v => ({ t: String(v), ok: v === r }))), why: `${a} + ${b} = ${r}.` }; }
    const q = pick(ENGQ); return { q: q[0], a: shuf([{ t: q[1], ok: true }, ...q[2].map(t => ({ t, ok: false }))]), why: q[3] };
  }
  const R2 = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  function eng(el) {
    if (S.shifts == null) S.shifts = 5; const left = S.shifts, pay = engPay();
    if (!engQ && left > 0) engQ = engMake();
    el.innerHTML = `<p class="note">Short of money? Work as a <b>rocket engineer</b> for other companies! Answer an easy space question and earn <b>${money(pay)}</b> each (more as your company grows). You can do <b>${left}</b> more tasks. Your shift is refilled after your next launch, or when you press <b>Wait a day</b> in Stocks.</p>
      ${engMsg ? `<div class="rc-job">${engMsg}</div>` : ""}
      ${left > 0 && engQ ? `<div class="rc-bankbox"><b>Task: ${esc(engQ.q)}</b>${engQ.a.map((o, i) => `<button class="close" type="button" data-a="${i}">${esc(o.t)}</button>`).join("")}</div>` : `<div class="rc-bankbox">You are all done for this shift. Go launch a rocket, or press Wait a day in the Stocks tab, then come back!</div>`}`;
    el.querySelectorAll("[data-a]").forEach(b => b.onclick = () => {
      const o = engQ.a[+b.dataset.a], q = engQ; engQ = null; S.shifts = Math.max(0, left - 1);
      if (o.ok) { S.cash += pay; S.earned += pay; engMsg = `<b class="okc">Correct! You earned ${money(pay)}.</b> ${esc(q.why)}`; snd("star"); } else { const r = q.a.find(x => x.ok); engMsg = `<b class="badc">Not quite, no pay this time.</b> The answer was <b>${esc(r.t)}</b>. ${esc(q.why)}`; snd("tick"); }
      save(); render();
    });
  }

  // ---------------- fun jobs (100 mini jobs) ----------------
  const FJA = ["Tiny", "Speedy", "Giant", "Sparkly", "Sleepy", "Super", "Wobbly", "Golden", "Frosty", "Cosmic", "Bouncy", "Mighty", "Silly", "Neon", "Fluffy"];
  const FJB = [["Pop the bubbles", "🫧", "tap"], ["Copy the lights", "💡", "memory"], ["Stop the rocket", "🚀", "timing"], ["Count the stars", "⭐", "count"], ["Line up the moons", "🌙", "sort"], ["Pour the sand", "⏳", "sand"], ["Find the odd one", "🔍", "odd"]];
  const FJ = []; for (let i = 0; i < 100; i++) { const b = FJB[i % 7], L = Math.floor(i / 7); FJ.push({ id: i, name: b[0] + " (" + FJA[L] + ")", icon: b[1], kind: b[2], L, pay: Math.round((20000 + i * 4800) / 1000) * 1000 }); }
  let fjOn = null, fjTimers = [];
  const fjClear = () => { fjTimers.forEach(t => { clearInterval(t); clearTimeout(t); }); fjTimers = []; };
  const fjT = (f, ms, once) => { const t = once ? setTimeout(f, ms) : setInterval(f, ms); fjTimers.push(t); return t; };
  function fun(el) {
    fjClear(); S.fj = S.fj || {}; const done = Object.keys(S.fj).length;
    if (fjOn != null) return fjPlay(el, FJ[fjOn]);
    el.innerHTML = `<p class="note">100 fun little jobs! Each one is quick and easy. Finish a job to get paid, up to <b>${money(FJ[99].pay)}</b>. You get paid once per job, so try them all! Done: <b>${done}/100</b>. If you miss, just try again.</p>
      <div class="rc-fj">${FJ.map(j => `<button type="button" class="rc-fjc ${S.fj[j.id] ? "done" : ""}" data-j="${j.id}"><span>${j.icon}</span><b>${esc(j.name)}</b><em>${S.fj[j.id] ? "Done!" : money(j.pay)}</em></button>`).join("")}</div>`;
    el.querySelectorAll("[data-j]").forEach(b => b.onclick = () => { fjOn = +b.dataset.j; fun(el); });
  }
  function fjPlay(el, j) {
    const L = j.L, again = !!S.fj[j.id], pay = again ? Math.round(j.pay * .1 / 1000) * 1000 : j.pay;
    el.innerHTML = `<div class="rc-fjp"><h3>${j.icon} ${esc(j.name)}</h3><p class="rc-sm">Prize: <b>${money(pay)}</b>${again ? " (you already did this one, so it pays a little)" : ""}</p><div id="fjBox" class="rc-fjbox"></div><p id="fjMsg" class="rc-fjmsg"></p><div><button class="hintbtn" type="button" id="fjBack">Back to jobs</button> <button class="close" type="button" id="fjRetry">Try again</button></div></div>`;
    const box = el.querySelector("#fjBox"), msg = el.querySelector("#fjMsg"); let over = false;
    const say = t => { msg.innerHTML = t; };
    const end = ok => { if (over) return; over = true; fjClear(); if (ok) { S.cash += pay; S.earned += pay; S.fj[j.id] = 1; save(); snd("star"); say(`<b class="okc">You did it! You earned ${money(pay)}!</b>`); const h = app && app.querySelector(".rc-stats b"); if (h) h.textContent = money(S.cash); } else { snd("tick"); say('<b class="badc">Oops! Try again, you can do it.</b>'); } };
    el.querySelector("#fjBack").onclick = () => { fjClear(); fjOn = null; render(); };
    el.querySelector("#fjRetry").onclick = () => { fjClear(); fun(el); };
    const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1)), shuf = a => a.sort(() => Math.random() - .5);
    if (j.kind === "tap") {
      const need = 4 + Math.min(Math.floor(L / 2), 5), secs = 15; let n = 0, left = secs; box.innerHTML = '<div class="rc-fjf"><button type="button" class="rc-fjt">' + j.icon + '</button></div>';
      const f = box.firstChild, t = f.firstChild, mv = () => { t.style.left = R(2, 82) + "%"; t.style.top = R(2, 76) + "%"; }; mv(); say(`Tap it ${need} times! <b>0/${need}</b> · ${Math.ceil(left)}s`);
      t.onclick = () => { if (over) return; n++; snd("clink"); mv(); say(`Tap it ${need} times! <b>${n}/${need}</b> · ${Math.ceil(left)}s`); if (n >= need) end(true); };
      fjT(() => { if (over) return; left -= .2; say(`Tap it ${need} times! <b>${n}/${need}</b> · ${Math.max(0, Math.ceil(left))}s`); if (left <= 0) end(false); }, 200);
    } else if (j.kind === "memory") {
      const len = 2 + Math.min(3, Math.floor(L / 4)), cols = ["#ff5a5a", "#5aff8a", "#5aa8ff", "#ffd34e"], seq = Array.from({ length: len }, () => R(0, 3)); let at = 0, show = true;
      box.innerHTML = '<div class="rc-fjpads">' + cols.map((c, i) => `<button type="button" data-p="${i}" style="background:${c}"></button>`).join("") + "</div>"; const pads = [...box.querySelectorAll("[data-p]")];
      const flash = i => { pads[i].classList.add("lit"); setTimeout(() => pads[i].classList.remove("lit"), 380); };
      say("Watch the lights..."); seq.forEach((v, k) => fjT(() => { flash(v); snd("tick"); }, 900 + k * 900, true)); fjT(() => { show = false; say(`Now press them in the same order! (${len} lights)`); }, 900 + len * 900, true);
      pads.forEach(b => b.onclick = () => { if (show || over) return; const v = +b.dataset.p; flash(v); if (v !== seq[at]) return end(false); at++; if (at >= len) end(true); });
    } else if (j.kind === "timing") {
      const zw = Math.max(28, 50 - L * 1.5), zs = R(8, 92 - zw), sp = .4 + L * .03; let x = 0, d = 1;
      box.innerHTML = `<div class="rc-dbar"><div class="zone" style="left:${zs}%;width:${zw}%"></div><div class="mk" id="fjMk"></div></div><button class="close rc-big" type="button" id="fjStop">STOP!</button>`; const mk = box.querySelector("#fjMk");
      say("Press STOP when the white line is in the green!"); fjT(() => { x += d * sp; if (x >= 100) { x = 100; d = -1; } if (x <= 0) { x = 0; d = 1; } mk.style.left = x + "%"; }, 16);
      box.querySelector("#fjStop").onclick = () => { if (over) return; const ok = x >= zs && x <= zs + zw; end(ok); };
    } else if (j.kind === "count") {
      const n = 3 + Math.min(Math.floor(L / 2), 6); box.innerHTML = '<div class="rc-fjf"></div><div class="rc-fjopts"></div>'; const f = box.firstChild, o = box.lastChild;
      for (let i = 0; i < n; i++) { const e = document.createElement("span"); e.className = "rc-fjs"; e.textContent = j.icon; e.style.left = (4 + (i % 6) * 15 + R(0, 4)) + "%"; e.style.top = (6 + Math.floor(i / 6) * 28 + R(0, 6)) + "%"; f.appendChild(e); }
      say("Count them! You have 5 seconds..."); fjT(() => { f.innerHTML = '<div class="rc-fjq">?</div>'; say("How many were there?"); const opts = [...new Set([n, n + 1, n - 1, n + 2].filter(v => v > 0))]; shuf(opts).forEach(v => { const b = document.createElement("button"); b.className = "close"; b.type = "button"; b.textContent = v; b.onclick = () => end(v === n); o.appendChild(b); }); }, 5000, true);
    } else if (j.kind === "sort") {
      const n = 3 + Math.min(3, Math.floor(L / 4)), nums = shuf([...Array(50).keys()].map(v => v + 1)).slice(0, n), order = nums.slice().sort((a, b) => a - b); let at = 0;
      box.innerHTML = '<div class="rc-fjopts">' + nums.map(v => `<button type="button" class="close rc-fjn" data-n="${v}">${v}</button>`).join("") + "</div>"; say("Tap the numbers from the smallest to the biggest!");
      box.querySelectorAll("[data-n]").forEach(b => b.onclick = () => { if (over || b.disabled) return; if (+b.dataset.n !== order[at]) return end(false); b.disabled = true; at++; snd("clink"); if (at >= n) end(true); });
    } else if (j.kind === "sand") {
      const tg = R(35, 90), tol = Math.max(9, 16 - L * .4); let lv = 0, hold = null, used = false;
      box.innerHTML = `<div class="rc-jar"><div class="line" style="bottom:${tg}%"></div><div class="sand" id="fjSand"></div></div><button class="close rc-big" type="button" id="fjPour">Hold to pour sand</button>`; const sd = box.querySelector("#fjSand"), pb = box.querySelector("#fjPour");
      say("Hold the button to pour sand up to the yellow line, then let go!");
      const stop = () => { if (hold == null) return; clearInterval(hold); hold = null; used = true; end(Math.abs(lv - tg) <= tol); };
      pb.onpointerdown = e => { if (used || over) return; hold = setInterval(() => { lv = Math.min(100, lv + 1); sd.style.height = lv + "%"; }, 25); fjTimers.push(hold); }; pb.onpointerup = stop; pb.onpointerleave = stop; pb.onpointercancel = stop;
    } else {
      const g = 3 + Math.min(1, Math.floor(L / 7)), pairs = [["🌕", "🌖"], ["🚀", "🛸"], ["⭐", "🌟"], ["🪐", "🌍"], ["🔴", "🟠"], ["🛰️", "📡"]], pr = pairs[R(0, pairs.length - 1)], odd = R(0, g * g - 1);
      box.innerHTML = `<div class="rc-fjgrid" style="grid-template-columns:repeat(${g},1fr)">` + Array.from({ length: g * g }, (_, i) => `<button type="button" data-o="${i}">${i === odd ? pr[1] : pr[0]}</button>`).join("") + "</div>"; say("One is different. Tap it!");
      box.querySelectorAll("[data-o]").forEach(b => b.onclick = () => { if (!over) end(+b.dataset.o === odd); });
    }
  }
  // ---------------- loans ----------------
  const LIMITS = [300000, 600000, 1200000, 2500000, 5000000, 10000000, 25000000], RATE = .04;
  function bank(el) {
    const lim = LIMITS[tier()], avail = Math.max(0, lim - S.debt);
    const amts = [100000, 250000, 500000, 1000000, 5000000].filter(a => a <= lim);
    el.innerHTML = `<p class="note">The bank lends you money for rockets, but you pay <b>${RATE * 100}% interest after every launch</b>. Borrowing too much is risky!</p>
      <div class="rc-bankbox"><div>Cash <b>${money(S.cash)}</b></div><div>You owe <b class="${S.debt ? "badc" : ""}">${money(S.debt)}</b></div><div>The bank will lend you up to <b>${money(lim)}</b> in total (you can still borrow <b>${money(avail)}</b>). Win more orders and the limit goes up.</div><div>Interest you will pay after the next launch: <b>${money(Math.round(S.debt * RATE))}</b></div></div>
      <h3>Borrow</h3><div class="rc-loanbtns">${amts.map(a => `<button class="close" data-b="${a}" ${a > avail ? "disabled" : ""}>${money(a)}</button>`).join("")}<button class="close" data-b="max" ${avail <= 0 ? "disabled" : ""}>Borrow the most (${money(avail)})</button></div>
      <h3>Pay back</h3><div class="rc-loanbtns">${[100000, 500000, 1000000].map(a => `<button class="hintbtn" data-p="${a}" ${S.debt <= 0 || S.cash <= 0 ? "disabled" : ""}>${money(a)}</button>`).join("")}<button class="hintbtn" data-p="all" ${S.debt <= 0 || S.cash <= 0 ? "disabled" : ""}>Pay back everything I can</button></div>
      <p class="rc-sm">Example: if you owe ${money(1000000)}, you pay ${money(1000000 * RATE)} extra after every launch. Pay it back as soon as you can!</p>`;
    el.querySelectorAll("[data-b]").forEach(b => b.onclick = () => { const a = b.dataset.b === "max" ? avail : +b.dataset.b; if (a <= 0 || a > avail) return; S.cash += a; S.debt += a; save(); snd("clink"); render(); });
    el.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { const want = b.dataset.p === "all" ? S.debt : +b.dataset.p, a = Math.min(want, S.debt, Math.max(0, S.cash)); if (a <= 0) return; S.cash -= a; S.debt -= a; save(); snd("star"); render(); });
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
    const L = des.stages.length, mc = document.createElement("canvas").getContext("2d"); mc.canvas.width = 300; mc.canvas.height = 6000; const rScale = Math.max(.12, Math.min(1, 230 / (5900 - drawRocket(mc, des, 150, 5900, 1.2, { flame: 0 }))));
    app.innerHTML = `<div class="rc-launch"><canvas id="rcL" width="640" height="420"></canvas><div class="rc-tele" id="rcT"></div><div class="rc-deploy" id="rcD" hidden><p>Your rocket is at <b>${esc(D.name)}</b>! Press <b>Deploy</b> when the marker is in the <b class="okc">green zone</b>.</p><div class="rc-dbar"><i class="zone" id="rcZ"></i><i class="mk" id="rcM"></i></div><button class="close" id="rcDep" type="button">Deploy ${esc(sname)}!</button></div></div>`;
    const cv = document.getElementById("rcL"), x = cv.getContext("2d"), tele = document.getElementById("rcT"), dep = document.getElementById("rcD"), zone = document.getElementById("rcZ"), mk = document.getElementById("rcM");
    let t0 = 0, raf = 0, done = false, parts = [], boomed = false, phase = "climb", tOrbit = 0, tDep = 0, deployOK = false, z0 = .2 + Math.random() * .4, marker = 0;
    const CLIMB = 9; snd("launch");
    zone.style.left = z0 * 100 + "%"; zone.style.width = "34%";
    document.getElementById("rcDep").onclick = () => { if (phase !== "orbit") return; deployOK = marker >= z0 && marker <= z0 + .34; phase = "deploying"; tDep = performance.now(); dep.hidden = true; snd(deployOK ? "pop" : "wrong"); };
    const finish = res => {
      if (done) return; done = true; cancelAnimationFrame(raf);
      let pay = 0, first = 0, text = "", okk = res === "ok", refund = 0, owed = 0, paidBy = 0;
      if ((S.res.reuse || (des.extras && des.extras.fins)) && a.st[0] && res !== "boom" && Math.random() < .72) { refund = Math.round(a.st[0].cost * .6); S.cash += refund; }
      S.contracts = S.contracts.filter(k => k.id !== c.id); sel = null;
      if (okk) {
        pay = Math.round(c.pay * (1 + o.bonus)); if (!S.visited[c.dest]) first = 50000 * (D.tier + 1); S.visited[c.dest] = (S.visited[c.dest] || 0) + 1;
        S.cash += pay + first; S.ok++; S.earned += pay + first; S.best = Math.max(S.best, c.kg);
        text = "delivered the satellite \"" + sname + "\" (" + (c.kg + o.pieceKg).toLocaleString() + " kg) to " + D.name + " and earned " + money(pay) + (first ? " plus a first-visit bonus of " + money(first) : "") + "!";
      } else {
        if (S.sat.insure) paidBy = o.liab; else { owed = o.liab; S.cash -= owed; }
        text = res === "short" ? "ran out of speed before reaching " + D.name + "." : res === "boom" ? why : res === "forgot" ? "never let go of the satellite \"" + sname + "\"." : "dropped the satellite \"" + sname + "\" when deploying.";
      }
      if (!S.mkt || S.mkt.v !== 2) { mktInit(); S.mkt.v = 2; } mktStep(okk);
      let interest = 0; if (S.debt > 0) { interest = Math.round(S.debt * RATE); S.debt += interest; }
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
      if (interest) lessons.push(`The bank added <b class="badc">${money(interest)}</b> interest to your loan. You now owe ${money(S.debt)}.${S.debt > LIMITS[tier()] * 1.2 ? " That is more than the bank likes! Pay some back." : ""}`);
      if (S.cash < 0) lessons.push(`You are in debt (${money(S.cash)}). Win some orders, borrow from the Loans tab, or use the bank rescue in Records.`);
      app.innerHTML = `<div class="rc-result ${okk ? "ok" : "bad"}"><h1>${okk ? "Successful launch!" : res === "boom" ? "Launch failure!" : res === "short" ? "Not fast enough!" : "Satellite lost!"}</h1><p>${esc(des.look.name)} ${esc(text)}</p>${okk ? `<canvas id="rcArr" class="rc-pic big" width="620" height="260"></canvas><p class="rc-sm"><b>${esc(D.name)}</b></p><p class="rc-fact">${esc(factOf(c.dest))}</p>` : ""}${lessons.map(l => `<p class="rc-sm">${l}</p>`).join("")}<p class="rc-fact">Did you know? ${esc(pick(FACTS))}</p>${okk && tier() > 0 && S.ok === TIERS[tier()] ? `<p class="rc-up"><b>New level: ${esc(TIERNAMES[tier()])}!</b> Heavier orders and new places are coming.</p>` : ""}<button class="close" id="rcBack" type="button">Back to the company</button></div>`;
      if (okk) { try { drawPlace(document.getElementById("rcArr").getContext("2d"), c.dest, 620, 260, "surf"); } catch (e) {} }
      document.getElementById("rcBack").onclick = () => { tab = okk ? "contracts" : "build"; render(); };
    };
    const sky = (p, spaceF) => { const g = x.createLinearGradient(0, 0, 0, 420); g.addColorStop(0, `rgb(${Math.round(28 * (1 - spaceF))},${Math.round(70 * (1 - spaceF))},${Math.round(160 * (1 - spaceF) + 10)})`); g.addColorStop(1, `rgb(${Math.round(120 * (1 - spaceF) + 10)},${Math.round(190 * (1 - spaceF) + 10)},${Math.round(255 * (1 - spaceF) + 30)})`); x.fillStyle = g; x.fillRect(0, 0, 640, 420); if (spaceF > .25) { x.fillStyle = "rgba(255,255,255," + Math.min(1, spaceF) + ")"; for (let i = 0; i < 60; i++) x.fillRect((i * 97) % 640, (i * 53 + p * 200) % 420, 1.5, 1.5); } };
    const drawSat = (sx, sy, rot, sc, ok) => { x.save(); x.translate(sx, sy); x.rotate(rot); x.fillStyle = "#ffd34e"; x.fillRect(-9 * sc, -7 * sc, 18 * sc, 14 * sc); x.fillStyle = "#3a6fd0"; x.fillRect(-34 * sc, -5 * sc, 22 * sc, 10 * sc); x.fillRect(12 * sc, -5 * sc, 22 * sc, 10 * sc); x.strokeStyle = "#1a1240"; x.lineWidth = 1.5; x.strokeRect(-9 * sc, -7 * sc, 18 * sc, 14 * sc); x.strokeRect(-34 * sc, -5 * sc, 22 * sc, 10 * sc); x.strokeRect(12 * sc, -5 * sc, 22 * sc, 10 * sc); if (!ok) { x.fillStyle = "#ff4d4d"; x.fillRect(-3 * sc, -3 * sc, 6 * sc, 6 * sc); } x.restore(); };
    const label = (t, y) => { x.fillStyle = "rgba(255,255,255,.95)"; x.font = "bold 17px system-ui, sans-serif"; x.textAlign = "center"; x.fillText(t, 320, y); };
    const step = ts => {
      if (!t0) t0 = ts;
      x.clearRect(0, 0, 640, 420);
      if (phase !== "climb") { // in orbit: the rocket coasts above the Earth
        drawPlace(x, c.dest, 640, 420, "orb", ts / 1000);
        const rx = 320 + Math.sin(ts / 2500) * 10, ry = 62;
        x.save(); x.translate(rx, ry); x.rotate(Math.PI / 2); drawRocket(x, { ...des, top: des.top }, 0, 26, Math.min(.55, .45 * rScale * 1.2 + .05), { flame: 0 }); x.restore();
        if (phase === "orbit") { marker = 1 - Math.abs(((ts - tOrbit) / 1000 * .6) % 2 - 1); mk.style.left = marker * 100 + "%"; drawSat(rx + 48, ry, 0, .7, true); label("Ready to deploy " + sname, 26); if (ts - tOrbit > 15000) { phase = "deploying"; deployOK = false; tDep = performance.now(); dep.hidden = true; finishLater("forgot", ts); } }
        else if (phase === "deploying") { const q = Math.min(1, (performance.now() - tDep) / 2200); if (deployOK) { drawSat(rx + 48 + q * 150, ry + q * 70, q * .6, .7 + q * .3, true); label(sname + " deployed!", 26); for (let i = 0; i < 2; i++) parts.push({ x: rx + 48 + q * 150, y: ry + q * 70, vx: (Math.random() - .5) * 20, vy: (Math.random() - .5) * 20, l: .8, c: "#ffd34e" }); } else { drawSat(rx + 48 + q * 100, ry + q * 140, q * 8, .7, false); if (q > .7 && !boomed) { boomed = true; snd("boom"); for (let i = 0; i < 40; i++) parts.push({ x: rx + 150, y: ry + 100, vx: (Math.random() - .5) * 200, vy: (Math.random() - .5) * 200, l: 1.2, c: ["#ff6a2a", "#ffd34e", "#fff"][R(3)] }); } label(q > .7 ? "The satellite is lost!" : "Oh no...", 26); } if (q >= 1 && !fin) finishLater(deployOK ? "ok" : "misdeploy", ts); }
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
        if (stage > 0 && p - sepAt[stage - 1] < .06) { const sp = (p - sepAt[stage - 1]) / .06; x.save(); x.globalAlpha = 1 - sp; drawRocket(x, { ...des, top: "none", stages: [des.stages[stage - 1]] }, rx - 40 * sp, ry + 90 + sp * 180, sc * .9 * rScale, { noTop: true, noWin: true }); x.restore(); }
        const cut = des.stages.slice(stage), vis = { ...des, stages: cut.length ? cut : des.stages }, shake = p < .12 ? (Math.random() - .5) * 3 : 0;
        let tilt = 0; if (outcome === "ok" && p > .88) tilt = (p - .88) / .12 * 1.3;
        x.save(); x.translate(rx + shake, ry + 60); x.rotate(tilt); x.translate(-rx, -(ry + 60)); drawRocket(x, vis, rx, ry + 60, sc * 1.2 * rScale, { flame: 1 }); x.restore();
        if (Math.random() < .8) parts.push({ x: rx + (Math.random() - .5) * 12, y: ry + 62, vx: (Math.random() - .5) * 20, vy: 40 + Math.random() * 40, l: 1, c: Math.random() < .5 ? "#fff" : "#ffc060" });
      } else if (outcome === "boom") {
        if (!boomed) { boomed = true; snd("boom"); for (let i = 0; i < 60; i++) parts.push({ x: rx, y: ry + 20, vx: (Math.random() - .5) * 260, vy: (Math.random() - .5) * 260, l: 1.4, c: ["#ff6a2a", "#ffd34e", "#fff", "#b02a0a"][R(4)] }); }
      } else { const fp = (p - failP) / (1 - failP); x.save(); x.translate(rx + fp * 90, ry + fp * fp * 330); x.rotate(fp * 3); drawRocket(x, { ...des, stages: des.stages.slice(0, 1) }, 0, 0, sc * rScale, { flame: 0 }); x.restore(); }
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

  window.RocketCo = { open, analyze, ENGINES, TANKS, drawPlace, DESTS, state: () => S };
})();
