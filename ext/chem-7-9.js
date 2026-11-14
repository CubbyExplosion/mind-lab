// ext/chem-7-9.js  Mind Lab Chemistry levels 7-9 (grade 3 both halves, grade 4 first half)
(() => {
  // item = [question, rightAnswer, wrong1, wrong2?]  ("emoji§question" shows a big picture)  OR a function returning an item or a full question object
  const les = (title, slides, hints, items) => {
    const make = () => {
      let it = pick(items);
      if (typeof it === "function") it = it();
      if (!Array.isArray(it)) return Object.assign({ hints }, it);
      const parts = it[0].split("§");
      return { text: parts[parts.length - 1], visual: parts.length > 1 ? parts[0] : undefined, choices: shuf(it.slice(1)), answer: it[1], hints };
    };
    make.teach = () => slides.map(s => ({ h: s[0], v: s[1], t: s[2] }));
    make.slide = slides[0];
    return { title, make };
  };
  const mix = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => {
      const out = [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some ideas, then the quiz." }];
      ls.filter((_, i) => i % Math.ceil(ls.length / 4) === 0).slice(0, 4).forEach(l => out.push({ h: l.make.slide[0], v: l.make.slide[1], t: l.make.slide[2] }));
      return out;
    };
    make.slide = x => x;
    return { title, make };
  };
  const at = (arr, idx) => idx.map(i => arr[i]);
  const fmt = f => f.replace(/\d+/g, m => `<sub>${m}</sub>`);
  const MASS = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, S: 32, Ca: 40 };
  const parse = f => { const o = {}; (f.match(/[A-Z][a-z]?\d*/g) || []).forEach(p => { const e = p.match(/[A-Z][a-z]?/)[0], n = +(p.slice(e.length) || 1); o[e] = (o[e] || 0) + n; }); return o; };
  const total = f => Object.values(parse(f)).reduce((x, y) => x + y, 0);
  const shells = z => { const out = []; let r = z; [2, 8, 8, 18].forEach(c => { if (r > 0) { out.push(Math.min(c, r)); r -= Math.min(c, r); } }); return out; };
  // [name, symbol, atomic number, common mass number]
  const EL = [["hydrogen", "H", 1, 1], ["helium", "He", 2, 4], ["lithium", "Li", 3, 7], ["beryllium", "Be", 4, 9], ["boron", "B", 5, 11], ["carbon", "C", 6, 12], ["nitrogen", "N", 7, 14], ["oxygen", "O", 8, 16],
    ["fluorine", "F", 9, 19], ["neon", "Ne", 10, 20], ["sodium", "Na", 11, 23], ["magnesium", "Mg", 12, 24], ["aluminum", "Al", 13, 27], ["silicon", "Si", 14, 28], ["phosphorus", "P", 15, 31],
    ["sulfur", "S", 16, 32], ["chlorine", "Cl", 17, 35], ["argon", "Ar", 18, 40], ["potassium", "K", 19, 39], ["calcium", "Ca", 20, 40]];
  const cap = s => s[0].toUpperCase() + s.slice(1);

  // ---------- makers ----------
  const displace = () => {
    const a = pick([40, 50, 60, 80]), r = pick([5, 10, 15, 20, 25]);
    return { text: `A measuring cylinder holds <b>${a} mL</b> of water. You drop in a small rock and the water rises to <b>${a + r} mL</b>. What is the volume of the rock in mL?`, visual: "🪨", answer: r,
      hints: ["The rock pushes water out of its way. How much did the level go up?", "The rise in water level equals the volume of the rock. Subtract the starting level from the new level.", "Example: water goes from 30 mL to 38 mL, so the object is 38 - 30 = 8 mL. Now do yours."] };
  };
  const convert = () => {
    const k = ri(2, 9), t = ri(0, 3);
    const [txt, ans, vis] = [[`A bottle holds ${k} liters. How many milliliters is that? (1 L = 1000 mL)`, k * 1000, "🍼"], [`A jug holds ${k * 1000} mL. How many liters is that? (1 L = 1000 mL)`, k, "🫗"],
      [`A bag of flour is ${k} kg. How many grams is that? (1 kg = 1000 g)`, k * 1000, "🌾"], [`A rock has a mass of ${k * 1000} g. How many kilograms is that? (1 kg = 1000 g)`, k, "🪨"]][t];
    return { text: txt, visual: vis, answer: ans,
      hints: ["Is the new unit bigger or smaller? Smaller units give bigger numbers.", t % 2 === 0 ? "Going to the smaller unit: multiply by 1000." : "Going to the bigger unit: divide by 1000.", "Example: 3 L is 3 x 1000 = 3000 mL, and 4000 g is 4000 / 1000 = 4 kg. Now do yours."] };
  };
  const partsInAtom = () => {
    const e = pick(EL.slice(2, 18)), n = e[3] - e[2], t = ri(0, 2);
    const q = [[`A neutral atom has <b>${e[2]}</b> protons and <b>${n}</b> neutrons. How many electrons does it have?`, e[2]], [`An atom has <b>${e[2]}</b> protons and <b>${n}</b> neutrons. What is its mass number?`, e[3]],
      [`An atom has <b>${e[2]}</b> protons and <b>${n}</b> neutrons. What is its atomic number?`, e[2]]][t];
    const h = [["In a neutral atom, positive and negative charges must balance.", "Electrons = protons in a neutral atom.", "Example: a neutral atom with 9 protons and 10 neutrons has 9 electrons. Now do yours."],
      ["Mass number counts the particles in the nucleus.", "Mass number = protons + neutrons.", "Example: 6 protons and 6 neutrons give mass number 12. Now do yours."],
      ["One kind of particle decides which element it is.", "Atomic number = number of protons.", "Example: an atom with 4 protons and 5 neutrons has atomic number 4. Now do yours."]][t];
    return { text: q[0], answer: q[1], hints: h };
  };
  const neutrons = () => {
    const e = pick(EL.slice(2, 20));
    return { text: `An atom of <b>${e[0]}</b> has atomic number <b>${e[2]}</b> and mass number <b>${e[3]}</b>. How many neutrons does it have?`, answer: e[3] - e[2],
      hints: ["The mass number counts protons and neutrons together.", "Neutrons = mass number minus atomic number.", "Example: an atom with mass number 14 and atomic number 7 has 14 - 7 = 7 neutrons. Now do yours."] };
  };
  const shellPattern = () => {
    const e = pick(EL.slice(2, 20)), s = shells(e[2]), right = s.join(", ");
    const w = new Set();
    const w1 = s.slice(); w1[w1.length - 1] += 1; w.add(w1.join(", "));
    const w2 = s.length > 1 ? [s[0] - 1, ...s.slice(1)] : [s[0] + 1]; if (w2[0] > 0) w.add(w2.join(", "));
    const w3 = s.slice(); if (s.length > 1) { w3[w3.length - 1] -= 1; w3[1] = Math.min(w3[1] + 1, 8); w.add(w3.join(", ")); }
    w.add(`${e[2]}`); w.delete(right);
    return { text: `A neutral atom of <b>${e[0]}</b> has ${e[2]} electrons. How are they arranged in shells (inner to outer)?`, choices: shuf([right, ...[...w].slice(0, 2)]), answer: right,
      hints: ["Electrons fill the shell closest to the nucleus first.", "The shells hold 2, then 8, then 8 electrons. Fill each one before starting the next.", "Example: 10 electrons fill the first shell (2) and then put 8 in the second: 2, 8. Now do yours."] };
  };
  const valence = () => {
    const e = pick(EL.filter(x => ![2, 10, 18].includes(x[2]) && x[2] > 2)), s = shells(e[2]);
    return { text: `How many <b>outer-shell</b> electrons does a neutral atom of <b>${e[0]}</b> (atomic number ${e[2]}) have?`, answer: s[s.length - 1],
      hints: ["Fill the shells from the inside: 2, then 8, then 8.", "The electrons left over in the last shell are the outer electrons.", "Example: neon has 10 electrons. They fill 2 and 8, so its outer shell is full with 8. Now do yours."] };
  };
  const FORM7 = ["H2O", "CO2", "NH3", "CH4", "O2", "H2SO4", "C6H12O6", "NaCl", "N2", "C2H6", "CaCO3", "HCl", "NaHCO3", "C3H8"];
  const atomsMaker = () => {
    const f = pick(FORM7), p = parse(f), el = pick(Object.keys(p)), t = ri(0, 1);
    return t === 0 ? { text: `How many atoms of <b>${el}</b> are in one molecule (or unit) of <b>${fmt(f)}</b>?`, answer: p[el],
        hints: ["Find the letter in the formula and look at the small number after it.", "A letter with no small number means exactly one atom.", "Example: in Al2O3, Al has a small 2 so there are 2 Al atoms. Now do yours."] }
      : { text: `How many atoms are there in all in one molecule (or unit) of <b>${fmt(f)}</b>?`, answer: total(f),
        hints: ["Every letter stands for atoms. Look at each small number.", "Add up all the small numbers. A letter alone counts as 1.", "Example: N2O has 2 + 1 = 3 atoms in all. Now do yours."] };
  };
  const density = () => {
    const d = pick([2, 3, 4, 5, 8]), v = pick([5, 10, 20, 25]), m = d * v, t = ri(0, 2);
    const q = [[`An object has a mass of <b>${m} g</b> and a volume of <b>${v} cm³</b>. What is its density in g/cm³?`, d, ["Density tells how much mass is packed into each unit of volume.", "Density = mass ÷ volume.", "Example: 30 g in 10 cm³ has density 30 ÷ 10 = 3 g/cm³. Now do yours."]],
      [`A metal has a density of <b>${d} g/cm³</b>. What is the mass in grams of <b>${v} cm³</b> of it?`, m, ["Each cubic centimeter has the same mass. How many cubic centimeters are there?", "Mass = density × volume.", "Example: density 2 g/cm³ and volume 15 cm³ make 2 × 15 = 30 g. Now do yours."]],
      [`A block has a mass of <b>${m} g</b> and a density of <b>${d} g/cm³</b>. What is its volume in cm³?`, v, ["Think about how many cubic centimeters you need to make that much mass.", "Volume = mass ÷ density.", "Example: 40 g at density 4 g/cm³ takes up 40 ÷ 4 = 10 cm³. Now do yours."]]][t];
    return { text: q[0], visual: "🧱", answer: q[1], hints: q[2] };
  };
  const solubility = () => {
    const L = pick([20, 30, 36, 40]), ex = pick([5, 10, 15, 20]), nm = pick(["salt", "sugar", "powder X", "crystal Y"]);
    return { text: `At room temperature, only <b>${L} g</b> of ${nm} can dissolve in 100 mL of water. You stir in <b>${L + ex} g</b>. How many grams stay undissolved?`, visual: "🥣", answer: ex,
      hints: ["The water can only hold so much. Anything over that limit stays as solid.", "Undissolved amount = amount you added minus the most that can dissolve.", "Example: the limit is 25 g and you add 32 g, so 32 - 25 = 7 g stays at the bottom. Now do yours."] };
  };
  const ION = [["sodium", "Na", 11, 1], ["lithium", "Li", 3, 1], ["potassium", "K", 19, 1], ["magnesium", "Mg", 12, 2], ["calcium", "Ca", 20, 2], ["aluminum", "Al", 13, 3], ["chlorine", "Cl", 17, -1], ["fluorine", "F", 9, -1], ["oxygen", "O", 8, -2], ["sulfur", "S", 16, -2]];
  const sgn = c => (c > 0 ? "positive " : "negative ") + Math.abs(c);
  const ionMaker = () => {
    const e = pick(ION), el = e[2] - e[3];
    const w = [sgn(-e[3]), sgn(e[3] > 0 ? e[3] + 1 : e[3] - 1)].filter(x => x !== sgn(e[3]));
    return { text: `An ion of <b>${e[0]}</b> has <b>${e[2]}</b> protons and <b>${el}</b> electrons. What is its charge?`, choices: shuf([sgn(e[3]), ...w]), answer: sgn(e[3]),
      hints: ["Compare the positive protons with the negative electrons. Which are there more of?", "Charge = protons minus electrons. More protons means positive. More electrons means negative.", "Example: 9 protons and 10 electrons gives 9 - 10 = -1. Now do yours."] };
  };
  const EQ = [[[[2, "H2"], [1, "O2"]], [[2, "H2O"]]], [[[1, "N2"], [3, "H2"]], [[2, "NH3"]]], [[[1, "CH4"], [2, "O2"]], [[1, "CO2"], [2, "H2O"]]], [[[2, "Mg"], [1, "O2"]], [[2, "MgO"]]],
    [[[2, "Na"], [1, "Cl2"]], [[2, "NaCl"]]], [[[1, "H2"], [1, "Cl2"]], [[2, "HCl"]]], [[[2, "H2O"]], [[2, "H2"], [1, "O2"]]], [[[4, "Fe"], [3, "O2"]], [[2, "Fe2O3"]]],
    [[[2, "Ca"], [1, "O2"]], [[2, "CaO"]]], [[[1, "C3H8"], [5, "O2"]], [[3, "CO2"], [4, "H2O"]]]];
  const balance = () => {
    const e = pick(EQ), all = [...e[0].map(x => [0, x]), ...e[1].map(x => [1, x])].filter(x => x[1][0] > 1), blank = pick(all);
    const side = (arr, s) => arr.map(x => (x === blank[1] ? "<b>__</b> " : (x[0] > 1 ? x[0] + " " : "")) + fmt(x[1])).join(" + ");
    return { text: `Balance the equation. What number goes in the blank?<br>${side(e[0])} → ${side(e[1])}`, answer: blank[1][0],
      hints: ["Count the atoms of each element on the left and on the right. They must match.", "Change only the big numbers in front of the formulas, never the small ones. Work on one element at a time.", "Example: 2 CO + O₂ → 2 CO₂ has C: 2 and 2, O: 2 + 2 = 4 and 4, so it balances. Now do yours."] };
  };
  const molMass = () => {
    const f = pick(["H2O", "CO2", "CH4", "NH3", "O2", "N2", "CaCO3", "NaOH", "H2SO4", "MgO", "SO2", "CO", "C2H6", "CaO"]), p = parse(f);
    const m = Object.keys(p).reduce((s, k) => s + MASS[k] * p[k], 0);
    return { text: `Atomic masses: H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, S = 32, Ca = 40.<br>What is the formula mass of <b>${fmt(f)}</b>?`, answer: m,
      hints: ["Find the mass of each atom, then count how many of each there are.", "Multiply each atomic mass by the small number after its letter, then add everything up.", "Example: H₂O₂ is 2 × 1 + 2 × 16 = 2 + 32 = 34. Now do yours."] };
  };
  const hydro = () => {
    const n = ri(1, 6), nm = ["methane", "ethane", "propane", "butane", "pentane", "hexane"][n - 1], t = ri(0, 1);
    return t === 0 ? { text: `Alkanes follow the rule: hydrogen atoms = 2 × carbon atoms + 2. How many hydrogen atoms does an alkane with <b>${n}</b> carbon atom${n > 1 ? "s" : ""} have?`, visual: "⛽", answer: 2 * n + 2,
        hints: ["Double the number of carbons first.", "Then add 2 to that number.", "Example: 4 carbons gives 2 × 4 + 2 = 10 hydrogens. Now do yours."] }
      : { text: `<b>${cap(nm)}</b> is an alkane. It has ${n} carbon atom${n > 1 ? "s" : ""}. How many hydrogen atoms does it have in all?`, visual: "⛽", answer: 2 * n + 2,
        hints: ["Use the rule for alkanes: hydrogen atoms = 2 × carbons + 2.", "Double the carbons, then add 2.", "Example: with 3 carbons: 2 × 3 + 2 = 8 hydrogens. Now do yours."] };
  };
  const conc = () => {
    const c = pick([5, 10, 15, 20, 25]), V = pick([200, 300, 500]), g = c * V / 100, t = ri(0, 1);
    return t === 0 ? { text: `You dissolve <b>${g} g</b> of salt in <b>${V} mL</b> of water. How many grams are dissolved in each 100 mL?`, visual: "🧂", answer: c,
        hints: ["Concentration here means grams in every 100 mL. How many 100 mL parts are there?", "Divide the grams by the number of 100 mL parts.", "Example: 60 g in 300 mL is 3 parts, so 60 ÷ 3 = 20 g per 100 mL. Now do yours."] }
      : { text: `A solution has <b>${c} g</b> of sugar in every 100 mL. How many grams of sugar are in <b>${V} mL</b>?`, visual: "🍬", answer: g,
        hints: ["How many lots of 100 mL fit in the bottle?", "Multiply the grams per 100 mL by the number of 100 mL lots.", "Example: 8 g per 100 mL in 200 mL gives 2 × 8 = 16 g. Now do yours."] };
  };
  const phStep = () => {
    const a = ri(1, 5), k = ri(1, 3), t = ri(0, 1);
    const ans = Math.pow(10, k);
    return { text: `Each pH step is 10 times stronger. A drink has pH <b>${a}</b>. A second drink has pH <b>${a + k}</b>. How many times more acidic is the first drink?`, visual: "🧪", answer: ans,
      hints: ["Count how many pH steps apart the two drinks are.", "Each step multiplies the strength by 10. Multiply 10 once for every step.", "Example: pH 2 and pH 4 are 2 steps apart, so 10 × 10 = 100 times. Now do yours."] };
  };
  const SALTS = [["HCl", "NaOH", "sodium chloride"], ["HCl", "KOH", "potassium chloride"], ["H2SO4", "NaOH", "sodium sulfate"], ["H2SO4", "KOH", "potassium sulfate"], ["HNO3", "NaOH", "sodium nitrate"], ["HNO3", "KOH", "potassium nitrate"]];
  const saltName = () => {
    const s = pick(SALTS), w = shuf(SALTS.filter(x => x[2] !== s[2])).slice(0, 2).map(x => x[2]);
    return { text: `Neutralization: <b>${fmt(s[0])}</b> reacts with <b>${fmt(s[1])}</b>. What salt is made (water is made too)?`, visual: "⚗️", choices: shuf([s[2], ...w]), answer: s[2],
      hints: ["The metal part comes from the base. The second name part comes from the acid.", "HCl gives “chloride”, H₂SO₄ gives “sulfate” and HNO₃ gives “nitrate”. The metal is Na (sodium) or K (potassium).", "Example: hydrochloric acid with lithium hydroxide makes lithium chloride. Now do yours."] };
  };
  const SUBS = [["water", 0, 100], ["ethanol", -114, 78], ["mercury", -39, 357], ["oxygen", -218, -183], ["nitrogen", -210, -196], ["lead", 327, 1749], ["gold", 1064, 2856]];
  const stateAt = () => {
    const s = pick(SUBS), t = ri(0, 2), T = t === 0 ? s[1] - pick([20, 30, 40]) : t === 1 ? Math.round((s[1] + s[2]) / 2) : s[2] + pick([20, 40, 60]);
    return { text: `${cap(s[0])} melts at <b>${s[1]} °C</b> and boils at <b>${s[2]} °C</b>. What state is it in at <b>${T} °C</b>?`, visual: "🌡️", choices: ["Solid", "Liquid", "Gas"], answer: ["Solid", "Liquid", "Gas"][t],
      hints: ["Compare the temperature with the melting point and the boiling point.", "Below the melting point it is solid. Between the two points it is liquid. Above the boiling point it is gas.", "Example: iron melts at 1538 °C, so at 1000 °C iron is below that point and is solid. Now do yours."] };
  };
  const tempChange = () => {
    const a = pick([18, 20, 22, 25]), d = pick([5, 8, 10, 12, 15]), up = Math.random() < 0.5, b = up ? a + d : a - d, t = ri(0, 1);
    return t === 0 ? { text: `A reaction starts at <b>${a} °C</b> and ends at <b>${b} °C</b>. By how many degrees did the temperature change?`, visual: "🌡️", answer: d,
        hints: ["Find the gap between the two temperatures.", "Subtract the smaller number from the bigger number.", "Example: 20 °C to 31 °C is a change of 31 - 20 = 11 degrees. Now do yours."] }
      : { text: `A reaction starts at <b>${a} °C</b> and ends at <b>${b} °C</b>. What kind of reaction is it?`, visual: "🌡️", choices: ["Exothermic", "Endothermic"], answer: up ? "Exothermic" : "Endothermic",
        hints: ["Did the surroundings get warmer or colder?", "Exothermic reactions give out heat so the temperature goes up. Endothermic reactions take in heat so it goes down.", "Example: 20 °C falling to 12 °C means heat was taken in. Now do yours."] };
  };
  const average = () => {
    const m = ri(8, 40), d1 = ri(1, 6), d2 = ri(1, 6), v = shuf([m - d1, m + d1, m]);
    return { text: `A class timed a reaction three times: <b>${v.join(" s, ")} s</b>. What is the average (mean) time in seconds?`, visual: "⏱️", answer: m,
      hints: ["The mean is a fair middle value of all the results.", "Add the three times together, then divide by 3.", "Example: 4, 6 and 8 add to 18, and 18 ÷ 3 = 6. Now do yours."] };
  };

  // ================= LEVEL 7 =================
  const a = [
    les("Particles in motion", [
      ["Always moving", "🔵", "All matter is made of tiny <b>particles</b>. They never stop moving. The hotter something is, the faster its particles move."],
      ["Three states", "🧊", "In a <b>solid</b> the particles vibrate in fixed places. In a <b>liquid</b> they slide past each other. In a <b>gas</b> they zoom around far apart."],
      ["Heat it up", "🔥", "Adding heat gives particles more energy. They move more, spread out, and the matter can change state."]
    ], ["Think about how freely the particles can move.", "Solids hold their shape because the particles are locked in place. Gases have plenty of space between particles.", "Example: a smell spreads across a room because the particles of a gas move freely. Now try yours."], [
      ["In which state are the particles packed closest in a fixed pattern?", "Solid", "Liquid", "Gas"], ["In which state do particles move fastest and spread furthest?", "Gas", "Solid", "Liquid"],
      ["What happens to particles when you heat something?", "They move faster", "They stop moving", "They disappear"], ["Why can a liquid be poured?", "Its particles slide past each other", "Its particles are locked in place", "It has no particles"],
      ["Why does a solid keep its shape?", "Its particles are held in fixed places", "Its particles fly apart", "It has no particles"], ["Cold juice and hot juice: which has faster-moving particles?", "Hot juice", "Cold juice"],
      ["Why does a gas fill a whole balloon?", "Its particles spread out in all directions", "Its particles stay in one corner", "Gas has no mass"], ["Are the particles in a solid completely still?", "No, they vibrate in place", "Yes, they never move"]
    ]),
    les("Changes of state", [
      ["Names to know", "🔁", "Solid to liquid is <b>melting</b>. Liquid to solid is <b>freezing</b>. Liquid to gas is <b>evaporating</b> or boiling. Gas to liquid is <b>condensing</b>."],
      ["Skipping a step", "❄️", "<b>Sublimation</b> is when a solid turns straight into a gas. Dry ice (frozen carbon dioxide) does this. The opposite, gas straight to solid, is <b>deposition</b>, and it makes frost."],
      ["Heat in or out", "🌡️", "Melting and boiling need heat to go <b>in</b>. Freezing and condensing let heat go <b>out</b>."]
    ], ["Say which state it starts as and which state it becomes.", "Start state first, then end state. Check whether heat goes in or out.", "Example: a puddle turning to vapor is liquid to gas. Now try yours."], [
      ["Liquid water becomes ice. What is this called?", "Freezing", "Melting", "Boiling"], ["Solid to liquid is called...", "Melting", "Condensing", "Freezing"], ["Steam on a cold window turns to drops. This is...", "Condensing", "Melting", "Sublimation"],
      ["A solid turning straight into a gas is called...", "Sublimation", "Melting", "Freezing"], ["Frost forms when water vapor turns straight into ice. This is...", "Deposition", "Evaporation", "Boiling"], ["Which change needs heat to go IN?", "Melting", "Freezing", "Condensing"],
      ["Which change lets heat go OUT?", "Condensing", "Boiling", "Melting"], ["Gas to liquid is...", "Condensation", "Evaporation", "Melting"]
    ]),
    les("Measuring volume", [
      ["Units", "📏", "Liquid volume uses <b>milliliters</b> (mL) and <b>liters</b> (L). <b>1 L = 1000 mL</b>. Mass uses grams and kilograms: <b>1 kg = 1000 g</b>."],
      ["Reading a cylinder", "🧪", "Read a measuring cylinder at eye level. The top of the liquid curves, so read the flat bottom of the curve."],
      ["Odd shapes", "🪨", "To find the volume of a rock, put it in water. The level rises by the rock's volume. This is <b>displacement</b>."]
    ], ["Do you need a bigger or smaller unit?", "Use 1000 to change between a unit and its thousandth. For a rock, subtract the water levels.", "Example: water goes from 50 to 56 mL, so the object is 6 mL. Now try yours."], [
      displace, displace, displace, convert, convert, convert,
      ["Which tool measures liquid volume most exactly?", "A measuring cylinder", "A ruler", "A clock"], ["How do you find the volume of a small rock?", "See how much it raises the water level", "Weigh it only", "Look at its color"]
    ]),
    les("Properties of matter", [
      ["Describing stuff", "📝", "A <b>property</b> describes a material: its color, hardness, shine, melting point, whether it dissolves, and whether it is magnetic."],
      ["Test, don't guess", "🔬", "We can test properties. A magnet tests for magnetism. A circuit tests whether electricity passes. Water tests solubility."],
      ["Choose well", "🚲", "People pick materials by their properties. Bike frames use strong, light metal. Windows use clear glass."]
    ], ["Ask which property the job needs.", "Match what the object must do with the property that helps it do it.", "Example: a pan handle should not conduct heat, so wood or plastic fits. Now try yours."], [
      ["Which property does a magnet test?", "Magnetism", "Solubility", "Hardness"], ["Which material is best for a window?", "Clear glass", "Wood", "Steel"], ["Which property tells how easily a material scratches?", "Hardness", "Color", "Smell"],
      ["Why are saucepans made from metal?", "Metal conducts heat well", "Metal is a gas", "Metal dissolves"], ["Salt disappears in water. Which property is this?", "It dissolves (is soluble)", "It is magnetic", "It floats"], ["Which is a physical property?", "Melting point", "Burning", "Rotting"],
      ["Why are cables covered in plastic?", "Plastic does not carry electricity", "Plastic is magnetic", "Plastic is heavy"], ["Which property helps a diamond cut glass?", "Great hardness", "Softness", "Low density"]
    ]),
    les("Names of elements", [
      ["Chemical symbols", "🔤", "Each element has a symbol of one capital letter, or a capital and a small letter: <b>C</b>, <b>Ca</b>, <b>Cl</b>."],
      ["First twenty", "📋", "H hydrogen, He helium, Li lithium, Be beryllium, B boron, C carbon, N nitrogen, O oxygen, F fluorine, Ne neon, Na sodium, Mg magnesium, Al aluminum, Si silicon, P phosphorus, S sulfur, Cl chlorine, Ar argon, K potassium, Ca calcium."],
      ["Tricky ones", "💡", "Na and K come from old Latin names (natrium, kalium). Always write the second letter small: <b>Co</b> is cobalt, but <b>CO</b> is a molecule."]
    ], ["Say the name of the element out loud and think about its first letters.", "Many symbols are the first one or two letters of the name. A few come from Latin names.", "Example: the symbol for magnesium is Mg. Now try yours."], [
      () => { const e = pick(EL); const w = shuf(EL.filter(x => x !== e)).slice(0, 2); return { text: `What is the symbol for <b>${e[0]}</b>?`, choices: shuf([e[1], w[0][1], w[1][1]]), answer: e[1], hints: ["Think of the first letter or two of the name.", "A few, like sodium and potassium, come from Latin names.", "Example: the symbol for silicon is Si. Now do yours."] }; },
      () => { const e = pick(EL); const w = shuf(EL.filter(x => x !== e)).slice(0, 2); return { text: `Which element has the symbol <b>${e[1]}</b>?`, choices: shuf([e[0], w[0][0], w[1][0]]), answer: e[0], hints: ["Look at the letters in the symbol.", "Try matching the symbol to the start of an element name.", "Example: Ne is neon. Now do yours."] }; },
      () => { const e = pick(EL); const w = shuf(EL.filter(x => x !== e)).slice(0, 2); return { text: `What is the symbol for <b>${e[0]}</b>?`, choices: shuf([e[1], w[0][1], w[1][1]]), answer: e[1], hints: ["Think of the first letter or two of the name.", "A few, like sodium and potassium, come from Latin names.", "Example: the symbol for silicon is Si. Now do yours."] }; },
      ["Which is the correct symbol for chlorine?", "Cl", "Ch", "Co"], ["Which symbol stands for sodium?", "Na", "So", "S"], ["Which symbol stands for potassium?", "K", "P", "Po"],
      ["Which symbol stands for helium?", "He", "H", "Hl"], ["Which symbol stands for calcium?", "Ca", "C", "Cl"]
    ]),
    les("Families of elements", [
      ["Groups", "🧮", "Columns of the periodic table are called <b>groups</b>. Elements in a group have similar properties."],
      ["Three families", "👨‍👩‍👧", "Group 1: the soft, very reactive <b>alkali metals</b> (lithium, sodium, potassium). Group 17: the <b>halogens</b> (fluorine, chlorine). Group 18: the <b>noble gases</b> (helium, neon, argon), which hardly react."],
      ["Where are metals?", "🔩", "Metals are on the left and in the middle. Non-metals are on the right, and hydrogen is a non-metal gas."]
    ], ["Think about which family the element belongs to.", "Group 1 is soft and reactive, group 17 are the halogens, group 18 are unreactive gases.", "Example: krypton is in group 18, so it is a noble gas. Now try yours."], [
      ["Which family does sodium belong to?", "Alkali metals", "Halogens", "Noble gases"], ["Which family does chlorine belong to?", "Halogens", "Alkali metals", "Noble gases"], ["Which family does helium belong to?", "Noble gases", "Halogens", "Alkali metals"],
      ["Which gases hardly react with anything?", "Noble gases", "Alkali metals", "Halogens"], ["What is a column of the periodic table called?", "A group", "A period", "A shell"], ["Elements in the same group...", "Have similar properties", "Are all gases", "Have the same mass"],
      ["Which is an alkali metal?", "Potassium", "Neon", "Fluorine"], ["Which is a noble gas?", "Argon", "Lithium", "Chlorine"]
    ]),
    les("Protons, neutrons, electrons", [
      ["Charges", "⚛️", "Protons are <b>positive</b> (+). Electrons are <b>negative</b> (−). Neutrons have <b>no charge</b>. A neutral atom has equal protons and electrons."],
      ["Two special numbers", "🔢", "The <b>atomic number</b> is the number of protons. The <b>mass number</b> is protons + neutrons."],
      ["Example", "🧮", "Carbon has atomic number 6 and mass number 12. So it has 6 protons, 6 electrons and 6 neutrons."]
    ], ["Decide which number you need: protons, electrons or mass number.", "Neutral atom: electrons = protons. Mass number = protons + neutrons.", "Example: with 5 protons and 6 neutrons, the mass number is 11. Now try yours."], [
      partsInAtom, partsInAtom, partsInAtom, partsInAtom,
      ["Which particle decides what element an atom is?", "Proton", "Electron", "Neutron"], ["Where are neutrons found?", "In the nucleus", "Whizzing around outside", "Nowhere"], ["The atomic number counts the...", "Protons", "Neutrons", "Electrons only"],
      ["Which particle carries a negative charge?", "Electron", "Neutron", "Proton"]
    ]),
    les("Electron shells", [
      ["Shells", "🌀", "Electrons live in <b>shells</b> around the nucleus, like rings. The shell nearest the nucleus fills first."],
      ["How many fit", "🔢", "The first shell holds <b>2</b>. The second holds <b>8</b>. The third holds <b>8</b> (for the first 20 elements)."],
      ["Example", "🧂", "Sodium has 11 electrons: 2 in the first shell, 8 in the second, and 1 in the third. We write 2, 8, 1."]
    ], ["Fill shells from the inside out.", "Fill 2, then 8, then 8. The leftover electrons go in the next shell.", "Example: nitrogen has 7 electrons: 2, 5. Now try yours."], [
      shellPattern, shellPattern, shellPattern, shellPattern, valence, valence,
      ["How many electrons fit in the first shell?", "2", "8", "18"], ["Which shell fills first?", "The one nearest the nucleus", "The outermost shell", "Any shell"]
    ]),
    les("Formulas and molecules", [
      ["Reading a formula", "🧪", "A <b>formula</b> uses symbols and small numbers. In CO<sub>2</sub> there is 1 carbon atom and 2 oxygen atoms."],
      ["Molecules", "💧", "A <b>molecule</b> is a group of atoms joined together. H<sub>2</sub>O is a molecule of water: 2 hydrogen atoms and 1 oxygen atom."],
      ["Brackets and big numbers", "🔢", "No small number means 1. In 2H<sub>2</sub>O, the big 2 means two whole molecules."]
    ], ["Look at the small number after each letter.", "Add the small numbers, treating a missing number as 1.", "Example: in C2H6 there are 2 carbon and 6 hydrogen atoms, 8 in all. Now try yours."], [
      atomsMaker, atomsMaker, atomsMaker, atomsMaker, atomsMaker, atomsMaker,
      ["What does a molecule mean?", "Two or more atoms joined together", "A single tiny star", "A kind of metal"], ["A formula uses...", "Symbols and small numbers", "Colors only", "Pictures only"]
    ]),
    les("Pure or mixed?", [
      ["Pure substances", "💎", "A <b>pure substance</b> is only one kind of element or compound: gold, oxygen, distilled water."],
      ["Mixtures", "🥗", "A <b>mixture</b> has two or more substances that are not joined together. Air, sea water and soil are mixtures."],
      ["How to tell", "🔍", "Pure substances melt and boil at one exact temperature. Mixtures melt and boil over a range, and you can separate their parts."]
    ], ["Ask: is it only one substance or several mixed together?", "Air, sea water and soil have many parts. Gold, oxygen and pure water have one.", "Example: milk contains water, fat and sugar mixed together, so it is a mixture. Now try yours."], [
      ["Which is a pure substance?", "Gold", "Sea water", "Soil"], ["Which is a mixture?", "Air", "Oxygen", "Gold"], ["Which is a mixture?", "Salt water", "Distilled water", "Diamond"],
      ["Which is a pure substance?", "Oxygen gas", "Orange juice", "Fruit salad"], ["Brass (copper and zinc) is...", "A mixture", "A pure element"], ["A pure substance melts...", "At one exact temperature", "Over a wide range"],
      ["Which is a mixture?", "Soil", "Pure iron", "Pure water"], ["In a mixture the parts are...", "Not chemically joined", "Always one atom"]
    ]),
    les("Solutions", [
      ["Solute and solvent", "🧂", "In salt water the salt is the <b>solute</b> (it dissolves) and the water is the <b>solvent</b> (it does the dissolving). Together they make a <b>solution</b>."],
      ["Strong or weak", "🥤", "A <b>concentrated</b> solution has lots of solute. A <b>dilute</b> one has a little. Adding water dilutes it."],
      ["Temperature", "🌡️", "Most solids dissolve better in hot water. Gases, like the fizz in soda, escape more when warm."]
    ], ["Decide which part dissolves and which part does the dissolving.", "Solute dissolves in the solvent. Many solids dissolve more in hot water.", "Example: in sugary tea, sugar is the solute and tea is the solvent. Now try yours."], [
      ["In sugar water, the solute is...", "Sugar", "Water"], ["In sugar water, the solvent is...", "Water", "Sugar"], ["A solution with lots of solute is...", "Concentrated", "Dilute"], ["Adding more water to a solution makes it...", "More dilute", "More concentrated"],
      ["Which usually dissolves more sugar?", "Hot water", "Cold water"], ["Why does warm soda lose its fizz faster?", "Gas escapes more when warm", "The sugar melts"], ["A solution is...", "A solute dissolved in a solvent", "A rock in water"],
      ["Which is the solvent in a cup of hot chocolate made with milk powder?", "Milk (liquid)", "Powder"]
    ]),
    les("Choosing how to separate", [
      ["Match the method", "🧰", "Different mixtures need different tools. A <b>sieve</b> splits big from small bits. A <b>magnet</b> picks out iron. A <b>filter</b> catches solids from a liquid."],
      ["Dissolved things", "💧", "To get dissolved salt back, <b>evaporate</b> the water. To get pure water from salt water, use <b>distillation</b>. To split ink colors, use <b>chromatography</b>."],
      ["Settle first", "🫗", "<b>Decanting</b> means pouring off a liquid after the solid has settled at the bottom."]
    ], ["Look at how the parts of the mixture are different.", "Size, magnetism, dissolving and boiling point are the differences that decide the method.", "Example: pebbles from sand can be separated with a sieve because their sizes are different. Now try yours."], [
      ["How can you pick iron nails out of sand?", "Use a magnet", "Use a sieve only", "Use chromatography"], ["How can you get salt back from salt water?", "Evaporate the water", "Use a magnet", "Use a sieve"], ["How can you get clean water from salt water?", "Distillation", "Magnet", "Sieve"],
      ["How can you split the colors in a black pen?", "Chromatography", "Filtering", "Using a magnet"], ["How can you remove sand from water?", "Filter it", "Evaporate it", "Use chromatography"], ["How can you separate pebbles from fine sand?", "Use a sieve", "Distil it", "Use litmus paper"],
      ["Pouring off water after mud settles is called...", "Decanting", "Sublimation", "Condensing"], ["Which separation uses a magnet?", "Iron from a mix of iron and sulfur", "Salt from water"]
    ]),
    les("Physical or chemical?", [
      ["Physical change", "✂️", "A <b>physical change</b> changes the look, shape or state, but no new substance is made. Cutting, melting, dissolving and crushing are physical."],
      ["Chemical change", "🔥", "A <b>chemical change</b> (reaction) makes a new substance. Burning, rusting, cooking an egg and rotting are chemical."],
      ["Test", "❓", "Ask: can I easily get the original back? Is there a new color, gas, heat, or light? If yes, it was probably chemical."]
    ], ["Ask if a new substance was made.", "New gas, new color, light or heat with no easy way back usually means chemical.", "Example: a candle burning makes new gases, so it is chemical. Now try yours."], [
      ["Which is a chemical change?", "Frying an egg", "Melting butter", "Cutting paper"], ["Which is a physical change?", "Crushing chalk", "Burning toast", "Iron rusting"], ["Which is a physical change?", "Ice melting", "Milk turning sour", "Wood burning"],
      ["Which is a chemical change?", "Bread going moldy", "Sugar dissolving", "Water boiling"], ["Which is a chemical change?", "A firework exploding", "Tearing foil", "Stretching a rubber band"], ["Which is a physical change?", "Dissolving salt in water", "Baking a cake"],
      ["Which is a chemical change?", "Silver turning black (tarnish)", "Melting a chocolate bar"], ["Water boiling into steam is...", "A physical change", "A chemical change"]
    ]),
    les("Word equations", [
      ["Writing a reaction", "✍️", "We write a reaction as a <b>word equation</b>: reactants → products. For example: <b>iron + oxygen → iron oxide</b>."],
      ["Reactants and products", "➡️", "<b>Reactants</b> are the starting substances (on the left). <b>Products</b> are what is made (on the right). The arrow means “makes”."],
      ["Naming", "🏷️", "Joining a metal with oxygen makes an <b>oxide</b> (magnesium + oxygen → magnesium oxide). Joining with chlorine makes a <b>chloride</b>."]
    ], ["Left of the arrow is where we start.", "Reactants go before the arrow, products after. Metal + oxygen makes a metal oxide.", "Example: zinc + oxygen → zinc oxide, so zinc is a reactant. Now try yours."], [
      ["In: hydrogen + oxygen → water, which is the product?", "Water", "Hydrogen", "Oxygen"], ["In: iron + sulfur → iron sulfide, which are reactants?", "Iron and sulfur", "Iron sulfide"], ["Magnesium + oxygen → ?", "Magnesium oxide", "Magnesium water", "Oxygen magnesium"],
      ["Sodium + chlorine → ?", "Sodium chloride", "Sodium oxide", "Chlorine sodium"], ["What does the arrow in an equation mean?", "Makes (turns into)", "Plus", "Minus"], ["Reactants are on which side?", "The left", "The right"],
      ["Copper + oxygen → ?", "Copper oxide", "Copper chloride", "Oxygen copper"], ["Methane + oxygen → carbon dioxide + water. Which are the products?", "Carbon dioxide and water", "Methane and oxygen"]
    ]),
    les("Acids, bases and pH", [
      ["The pH scale", "📊", "The <b>pH scale</b> goes from 0 to 14. Below 7 is <b>acid</b>. Exactly 7 is <b>neutral</b>. Above 7 is <b>alkaline</b> (a base that dissolves in water)."],
      ["Everyday pH", "🍋", "Lemon juice is about pH 2. Pure water is 7. Baking soda solution is about 9. Strong cleaners are higher still."],
      ["Staying safe", "🥽", "Very low and very high pH liquids can burn skin. Never taste or mix chemicals."]
    ], ["Compare the pH number with 7.", "Less than 7 is acid, 7 is neutral, more than 7 is alkaline.", "Example: pH 4 is below 7, so it is an acid. Now try yours."], [
      () => { const p = ri(0, 14); const ans = p < 7 ? "Acid" : p === 7 ? "Neutral" : "Alkaline"; return { text: `A liquid has a pH of <b>${p}</b>. What is it?`, choices: ["Acid", "Neutral", "Alkaline"], answer: ans, hints: ["Compare the number with 7.", "Below 7 acid, 7 neutral, above 7 alkaline.", "Example: pH 11 is above 7, so alkaline. Now do yours."] }; },
      () => { const p = ri(0, 14); const ans = p < 7 ? "Acid" : p === 7 ? "Neutral" : "Alkaline"; return { text: `A liquid has a pH of <b>${p}</b>. What is it?`, choices: ["Acid", "Neutral", "Alkaline"], answer: ans, hints: ["Compare the number with 7.", "Below 7 acid, 7 neutral, above 7 alkaline.", "Example: pH 11 is above 7, so alkaline. Now do yours."] }; },
      ["Pure water has a pH of about...", "7", "2", "12"], ["Lemon juice is...", "An acid", "Neutral", "A strong alkali"], ["The pH scale runs from...", "0 to 14", "1 to 100", "-7 to 7"],
      ["Which is likely to have a pH over 7?", "Soap solution", "Lemon juice", "Vinegar"], ["A neutral liquid is neither...", "Acid nor alkaline", "Hot nor cold"], ["Which is more acidic?", "pH 2", "pH 6"]
    ]),
    les("Electricity and materials", [
      ["Conductors", "💡", "A <b>conductor</b> lets electricity flow. Metals such as copper, iron and aluminum are good conductors."],
      ["Insulators", "🧤", "An <b>insulator</b> does not let electricity flow. Plastic, rubber, glass and dry wood are insulators."],
      ["Surprises", "✏️", "Graphite (pencil lead) is a non-metal that conducts. Salt water conducts too, which is why water and electricity are dangerous together."]
    ], ["Does electricity flow through it easily?", "Metals conduct. Plastic, rubber and glass do not. Salt water and graphite do.", "Example: a copper wire conducts, so it carries a current in a circuit. Now try yours."], [
      ["Which is a good conductor of electricity?", "Copper", "Rubber", "Plastic"], ["Which is an insulator?", "Rubber", "Iron", "Aluminum"], ["Why are plugs covered in plastic?", "Plastic is an insulator, so it keeps us safe", "Plastic is magnetic", "Plastic is shiny"],
      ["Which non-metal conducts electricity?", "Graphite", "Sulfur", "Glass"], ["Why must we keep electric devices away from water?", "Water with salts in it can carry electricity", "Water makes them heavy"], ["Which is an insulator?", "Dry wood", "Gold", "Steel"],
      ["Overhead power cables are made of...", "Metal", "Glass", "Rubber"], ["Which will make a bulb light in a circuit?", "A metal key", "A plastic spoon", "A rubber band"]
    ]),
    les("Water, the amazing liquid", [
      ["Special facts", "💧", "Water freezes at 0 °C and boils at 100 °C. About 71% of Earth's surface is covered by water."],
      ["Ice floats", "🧊", "Most solids sink in their liquid, but ice is <b>less dense</b> than water, so it floats. This lets fish live under frozen ponds."],
      ["Great solvent", "🧂", "Water dissolves more substances than any other common liquid. Rivers carry salts and minerals to the sea."]
    ], ["Think about what makes water special.", "Water dissolves many things, boils at 100 °C and its solid form floats on it.", "Example: sugar dissolves in water, which shows that water is a good solvent. Now try yours."], [
      ["At what temperature does pure water freeze?", "0 °C", "100 °C", "50 °C"], ["Why does ice float on water?", "It is less dense than water", "It is heavier than water", "It has air inside only"], ["Why can fish survive under a frozen pond?", "Ice floats on top, so water stays liquid below", "Fish do not need water"],
      ["Water is a good...", "Solvent", "Metal", "Insulator of sound only"], ["About how much of Earth's surface is covered by water?", "About 71%", "About 10%", "About 99%"], ["Pure water boils at...", "100 °C", "0 °C", "37 °C"],
      ["Which can water dissolve?", "Salt", "Sand", "Gold bars"], ["Rivers carry minerals to the sea because water can...", "Dissolve them", "Burn them"]
    ]),
    les("Lab tools and safety", [
      ["Equipment", "🧪", "A <b>beaker</b> holds and mixes liquids. A <b>test tube</b> holds small samples. A <b>measuring cylinder</b> measures volume. A <b>balance</b> measures mass. <b>Tongs</b> hold hot things."],
      ["Heating", "🔥", "Use a Bunsen burner only with a teacher. Tie back long hair, keep your goggles on and point test tubes away from faces."],
      ["Rules", "📏", "Never taste or sniff chemicals directly. Wash your hands afterwards. Tell the teacher straight away about spills or breakages."]
    ], ["Think about what the tool or rule is for.", "Match each tool with its job. Safety rules protect eyes, skin and lungs.", "Example: a balance measures mass, so use it to weigh sugar. Now try yours."], [
      ["Which tool measures mass?", "A balance", "A beaker", "A pipette"], ["Which do you wear to protect your eyes?", "Goggles", "A hat", "Gloves only"], ["Which tool holds a hot test tube?", "Tongs", "Bare fingers", "A ruler"],
      ["Which tool measures the volume of a liquid most exactly?", "A measuring cylinder", "A balance", "Tongs"], ["What should you do with long hair near a flame?", "Tie it back", "Leave it loose"], ["What do you do if you spill a chemical?", "Tell the teacher at once", "Hide it"],
      ["Should you taste chemicals in a lab?", "Never", "Sometimes", "Always"], ["Where should a test tube being heated point?", "Away from everyone", "At your friend"]
    ])
  ];
  a.push(
    mix("Mixed practice", at(a, [0, 3, 6, 8, 10, 12, 15, 17])),
    mix("Level 7 Challenge", at(a, [1, 2, 4, 5, 7, 9, 11, 13, 14, 16]))
  );

  // ================= LEVEL 8 =================
  const b = [
    les("Density", [
      ["Packed in", "🧱", "<b>Density</b> tells how much mass is packed into a space. <b>Density = mass ÷ volume</b>."],
      ["Units", "📏", "For solids we use grams per cubic centimeter (g/cm³). Water's density is <b>1 g/cm³</b>."],
      ["Sink or float", "🌊", "An object with density <b>more</b> than water sinks. With density <b>less</b> than water it floats."]
    ], ["Decide which two quantities you know and which one you need.", "Density = mass ÷ volume. Rearrange it for mass or volume. Compare with 1 g/cm³ for water.", "Example: 24 g in 6 cm³ is 24 ÷ 6 = 4 g/cm³. Now try yours."], [
      density, density, density, density, density,
      ["A material has density 0.5 g/cm³. In water it will...", "Float", "Sink"], ["A material has density 7 g/cm³. In water it will...", "Sink", "Float"], ["Density = ?", "Mass divided by volume", "Volume divided by mass", "Mass plus volume"]
    ]),
    les("Solubility", [
      ["How much?", "🥣", "<b>Solubility</b> is how much of a substance can dissolve in a set amount of water. When no more dissolves, the solution is <b>saturated</b>."],
      ["Left over", "⬇️", "Anything above the limit stays as solid at the bottom."],
      ["Temperature", "🌡️", "For most solids, solubility goes <b>up</b> when the water is warmer. Cool a saturated hot solution and crystals can form."]
    ], ["Find the limit and compare it with what was added.", "Undissolved = added minus the limit. Warm water usually holds more.", "Example: limit 12 g, added 20 g, so 8 g is left over. Now try yours."], [
      solubility, solubility, solubility,
      ["A saturated solution can hold...", "No more solute", "Unlimited solute"], ["When a hot saturated solution cools, crystals often...", "Form", "Disappear"], ["For most solids, warmer water dissolves...", "More", "Less"],
      ["Solubility means...", "How much dissolves in a set amount of solvent", "How hard something is"], ["Extra solid that will not dissolve ends up...", "At the bottom", "In the air"]
    ]),
    les("Neutrons and mass number", [
      ["Counting", "🧮", "<b>Atomic number</b> = protons. <b>Mass number</b> = protons + neutrons. So <b>neutrons = mass number − atomic number</b>."],
      ["Example", "🧂", "Sodium: mass number 23, atomic number 11. Neutrons = 23 − 11 = 12."],
      ["Why it matters", "⚖️", "Almost all the mass of an atom is in the nucleus, because electrons are tiny and light."]
    ], ["Subtract to find the neutrons.", "Take the bigger number (mass number) and subtract the atomic number.", "Example: fluorine has mass number 19 and atomic number 9, so 10 neutrons. Now try yours."], [
      neutrons, neutrons, neutrons, neutrons, neutrons, neutrons,
      ["Where is nearly all of an atom's mass?", "In the nucleus", "In the electrons", "Equally everywhere"], ["Which number do you subtract to find neutrons?", "Atomic number", "The number of shells"]
    ]),
    les("Ions", [
      ["Charged atoms", "🔋", "An atom becomes an <b>ion</b> when it gains or loses electrons. Losing electrons makes a <b>positive</b> ion. Gaining electrons makes a <b>negative</b> ion."],
      ["Why", "🎯", "Atoms want a full outer shell. Sodium loses 1 outer electron (Na⁺). Chlorine gains 1 (Cl⁻)."],
      ["Counting charge", "➕", "Charge = protons − electrons. Metals tend to lose electrons. Non-metals tend to gain them."]
    ], ["Compare the number of protons with electrons.", "More protons than electrons is positive. More electrons is negative.", "Example: 8 protons and 10 electrons gives -2. Now try yours."], [
      ionMaker, ionMaker, ionMaker, ionMaker,
      ["An atom that loses an electron becomes...", "A positive ion", "A negative ion", "A neutron"], ["An atom that gains an electron becomes...", "A negative ion", "A positive ion", "A proton"], ["Metals usually form...", "Positive ions", "Negative ions"],
      ["Non-metals usually form...", "Negative ions", "Positive ions"]
    ]),
    les("Ionic and covalent bonds", [
      ["Ionic bonds", "🧂", "In an <b>ionic bond</b>, a metal gives electrons to a non-metal. The ions attract each other. Salt (NaCl) is ionic."],
      ["Covalent bonds", "🤝", "In a <b>covalent bond</b>, non-metal atoms <b>share</b> electrons. Water (H₂O) and carbon dioxide (CO₂) are covalent."],
      ["Quick rule", "📌", "Metal + non-metal usually means ionic. Non-metal + non-metal usually means covalent."]
    ], ["Look at which kinds of elements are joined: metals or non-metals.", "A metal with a non-metal is ionic. Two non-metals are covalent.", "Example: HCl is hydrogen and chlorine, both non-metals, so covalent. Now try yours."], [
      ["NaCl joins sodium (a metal) and chlorine. The bond is...", "Ionic", "Covalent"], ["H₂O joins hydrogen and oxygen. The bond is...", "Covalent", "Ionic"], ["MgO joins a metal and a non-metal. It is...", "Ionic", "Covalent"],
      ["CO₂ has two non-metals. The bonds are...", "Covalent", "Ionic"], ["In a covalent bond, electrons are...", "Shared", "Given away completely"], ["In an ionic bond, electrons are...", "Transferred", "Shared equally"],
      ["Which compound is ionic?", "Calcium chloride (CaCl₂)", "Methane (CH₄)", "Water (H₂O)"], ["Which compound is covalent?", "Ammonia (NH₃)", "Potassium chloride (KCl)", "Lithium fluoride (LiF)"]
    ]),
    les("Outer electrons", [
      ["Valence electrons", "🌀", "The electrons in the outer shell are the <b>valence electrons</b>. They decide how an atom reacts."],
      ["Groups", "🧮", "For the main groups, the group number shows the outer electrons. Group 1 has 1, group 2 has 2, group 17 has 7, and group 18 has a full outer shell."],
      ["Full shell", "🔒", "A full outer shell is very stable. That is why noble gases do not react."]
    ], ["Work out how the electrons fill the shells.", "Shells fill 2, 8, 8. Count what is left in the last shell.", "Example: boron has 5 electrons: 2, 3, so 3 outer electrons. Now try yours."], [
      valence, valence, valence, valence,
      ["Why are noble gases unreactive?", "Their outer shells are full", "They are heavy", "They have no electrons"], ["Elements in group 1 have how many outer electrons?", "1", "2", "8"], ["Valence electrons are in the...", "Outer shell", "Nucleus"],
      ["Elements in group 17 have how many outer electrons?", "7", "17", "1"]
    ]),
    les("Naming compounds", [
      ["Two-part names", "🏷️", "Compounds of two elements have two-part names that end in <b>-ide</b>. NaCl is sodium <b>chloride</b>. MgO is magnesium <b>oxide</b>."],
      ["Counting with prefixes", "🔢", "For covalent compounds: <b>mono</b> = 1, <b>di</b> = 2, <b>tri</b> = 3. CO₂ is carbon <b>di</b>oxide. CO is carbon <b>mon</b>oxide. SO₃ is sulfur <b>tri</b>oxide."],
      ["More names", "📚", "CaCl₂ is calcium chloride. KBr is potassium bromide. Li₂O is lithium oxide."]
    ], ["Split the formula into the two elements.", "Say the metal (or first element) first, then the other element with -ide at the end. Use prefixes for covalent ones.", "Example: MgCl₂ is magnesium chloride. Now try yours."], [
      ["What is the name of NaCl?", "Sodium chloride", "Sodium oxide", "Chlorine sodium"], ["What is the name of MgO?", "Magnesium oxide", "Magnesium chloride", "Manganese oxide"], ["What is the name of CO₂?", "Carbon dioxide", "Carbon monoxide", "Carbon trioxide"],
      ["What is the name of CO?", "Carbon monoxide", "Carbon dioxide", "Carbon oxide"], ["What is the name of KBr?", "Potassium bromide", "Potassium oxide", "Kalium chloride"], ["What is the name of CaCl₂?", "Calcium chloride", "Calcium oxide", "Carbon chloride"],
      ["What does the prefix “di” mean?", "2", "1", "3"], ["Names of two-element compounds usually end in...", "-ide", "-ing", "-ful"]
    ]),
    les("Reactivity of metals", [
      ["The reactivity series", "📶", "Metals can be lined up by how strongly they react: <b>potassium, sodium, calcium, magnesium, aluminum, zinc, iron, copper, silver, gold</b>."],
      ["Fast and slow", "⚡", "Potassium and sodium fizz in water. Magnesium reacts slowly with acid. Copper hardly reacts with acid. Gold does not react."],
      ["Uses", "🏺", "Gold is found as pure metal because it is so unreactive. Reactive metals are found joined with other elements in rocks."]
    ], ["Use the order of the series. Higher up is more reactive.", "The series starts with potassium at the top and ends with gold at the bottom.", "Example: zinc is higher than copper, so zinc is more reactive. Now try yours."], [
      ["Which is more reactive?", "Sodium", "Copper"], ["Which is more reactive?", "Magnesium", "Silver"], ["Which is the least reactive of these?", "Gold", "Iron", "Zinc"],
      ["Why is gold found as a pure metal?", "It is very unreactive", "It is very reactive", "It is a gas"], ["Which metal fizzes strongly in water?", "Sodium", "Gold", "Copper"], ["Which is more reactive?", "Zinc", "Copper"],
      ["Which is most reactive?", "Potassium", "Aluminum", "Iron"], ["Which is least reactive?", "Silver", "Calcium", "Magnesium"]
    ]),
    les("Oxidation", [
      ["Adding oxygen", "🫧", "<b>Oxidation</b> happens when a substance reacts with oxygen. Burning, rusting and tarnishing are all oxidation."],
      ["Fast and slow", "🐢", "Burning is fast and gives off heat and light. Rusting is slow. Both make an <b>oxide</b>."],
      ["Everyday", "🍎", "A cut apple turns brown because of oxygen in the air. Lemon juice slows this down."]
    ], ["Think about oxygen in the air joining with something.", "Oxidation makes oxides. It can be fast (fire) or slow (rust).", "Example: a copper roof turning green is slow oxidation. Now try yours."], [
      ["Rusting is the reaction of iron with...", "Oxygen and water", "Only sugar", "Only light"], ["Which is oxidation?", "Wood burning", "Ice melting", "Sugar dissolving"], ["Iron + oxygen makes...", "Iron oxide", "Iron chloride", "Iron sugar"],
      ["Why does a cut apple turn brown?", "It reacts with oxygen", "It gets cold", "It dissolves"], ["Which oxidation is fastest?", "Burning", "Rusting", "Tarnishing"], ["Silver turning dull and black over time is...", "Tarnishing (oxidation)", "Melting"],
      ["The new substance made when a metal reacts with oxygen is...", "An oxide", "A solvent", "A mixture"], ["Is slow rusting a chemical change?", "Yes", "No"]
    ]),
    les("Combustion", [
      ["Burning fuel", "🔥", "<b>Combustion</b> is burning. A fuel plus oxygen gives carbon dioxide and water: <b>methane + oxygen → carbon dioxide + water</b>."],
      ["Not enough oxygen", "💨", "With too little oxygen, burning is <b>incomplete</b>. It makes poisonous carbon monoxide and black soot."],
      ["Put it out", "🧯", "Take away fuel, heat or oxygen and a fire goes out. That is why gas heaters need fresh air and a carbon monoxide alarm."]
    ], ["Think about what a fuel needs and what burning makes.", "Complete burning of a hydrocarbon makes CO₂ and water. Not enough oxygen makes CO and soot.", "Example: propane + oxygen → carbon dioxide + water. Now try yours."], [
      ["Burning a hydrocarbon with plenty of oxygen makes carbon dioxide and...", "Water", "Gold", "Iron"], ["Burning with too little oxygen can make the poisonous gas...", "Carbon monoxide", "Water vapor", "Helium"], ["Black soot comes from...", "Incomplete burning", "Complete burning"],
      ["Which does a fire NOT need?", "Water", "Fuel", "Oxygen"], ["Why do gas heaters need fresh air?", "To burn completely and avoid carbon monoxide", "To keep them cold"], ["Putting a lid on a candle stops it by removing...", "Oxygen", "Wax"],
      ["Combustion gives out...", "Heat and light", "Cold only"], ["A carbon monoxide alarm warns about...", "A poisonous gas", "A cold room"]
    ]),
    les("Neutralization", [
      ["Acid + base", "⚖️", "When an acid meets a base they cancel each other. The products are a <b>salt</b> and <b>water</b>: acid + base → salt + water."],
      ["Example", "🧂", "Hydrochloric acid + sodium hydroxide → sodium chloride + water."],
      ["Uses", "💊", "Antacid tablets neutralize extra stomach acid. Farmers add lime to soil that is too acidic."]
    ], ["Think about what two things make a neutral result.", "Acid + base → salt + water. The pH moves towards 7.", "Example: nitric acid + potassium hydroxide → potassium nitrate + water. Now try yours."], [
      saltName, saltName, saltName,
      ["Acid + base makes a salt and...", "Water", "Gold", "Metal"], ["What do antacid tablets do?", "Neutralize stomach acid", "Make more acid"], ["Why might farmers add lime to soil?", "To neutralize acid soil", "To make it sour"],
      ["After neutralizing perfectly, the pH is close to...", "7", "0", "14"], ["Which pair neutralizes?", "Acid and base", "Water and sand"]
    ]),
    les("Universal indicator", [
      ["Rainbow tester", "🌈", "<b>Universal indicator</b> changes through many colors to show the pH."],
      ["Colors", "🎨", "<b>Red</b> is strong acid. <b>Orange or yellow</b> is weak acid. <b>Green</b> is neutral. <b>Blue</b> is weak alkali. <b>Purple</b> is strong alkali."],
      ["Use", "🧪", "Add a few drops to a sample and match the color to a chart. Never taste the sample."]
    ], ["Remember the order of the rainbow along the pH scale.", "Red is low pH, green is 7, and purple is the highest pH.", "Example: an orange result means a weak acid. Now try yours."], [
      ["Universal indicator turns green in...", "A neutral liquid", "A strong acid", "A strong alkali"], ["Universal indicator turns red in...", "A strong acid", "A strong alkali", "Pure water"], ["Universal indicator turns purple in...", "A strong alkali", "A strong acid", "Pure water"],
      ["Orange or yellow shows...", "A weak acid", "A weak alkali", "Neutral"], ["Blue shows...", "A weak alkali", "A strong acid", "Neutral"], ["Pure water turns universal indicator...", "Green", "Red", "Purple"],
      ["Universal indicator is used to find out...", "The pH", "The mass"], ["A liquid of pH 3 will be which color?", "Orange/yellow-red (acidic)", "Blue/purple (alkaline)"]
    ]),
    les("Speeding up reactions", [
      ["Rate", "⏱️", "The <b>rate</b> of a reaction is how fast it happens."],
      ["Four ways", "⬆️", "Reactions go faster with <b>higher temperature</b>, <b>stronger concentration</b>, <b>smaller pieces</b> (more surface area), and a <b>catalyst</b>."],
      ["Why", "💥", "More collisions between particles, and harder collisions, mean more reactions."]
    ], ["Think about particles bumping into each other more often.", "Heat, concentration, small pieces and catalysts all speed things up.", "Example: powdered chalk reacts faster than a big chalk lump with acid. Now try yours."], [
      ["Which reacts fastest with acid?", "Powdered marble", "A marble chip", "A big marble block"], ["What does heating do to a reaction?", "Speeds it up", "Slows it down", "Stops it"], ["A more concentrated acid usually reacts...", "Faster", "Slower"],
      ["Why do smaller pieces react faster?", "More surface touches the other chemical", "They are colder"], ["Food spoils slower in a fridge because the cold...", "Slows the reactions", "Speeds the reactions"], ["Which would make a reaction slower?", "Cooling it", "Heating it", "Crushing it"],
      average, average
    ]),
    les("Catalysts and enzymes", [
      ["Helpers", "🛠️", "A <b>catalyst</b> speeds up a reaction without being used up. You get it back at the end."],
      ["Enzymes", "🧬", "<b>Enzymes</b> are catalysts made by living things. Enzymes in your saliva start breaking down starch in bread."],
      ["In industry", "🚗", "A car's catalytic converter uses a metal catalyst to turn harmful exhaust gases into safer ones."]
    ], ["A catalyst changes the speed but is not a reactant.", "Catalysts are not used up. Enzymes are natural catalysts.", "Example: yeast contains enzymes that help dough rise. Now try yours."], [
      ["A catalyst...", "Speeds up a reaction and is not used up", "Is used up completely", "Slows every reaction"], ["Enzymes are...", "Natural catalysts", "Metals only", "A kind of acid"], ["What do the enzymes in saliva begin to digest?", "Starch", "Metals", "Plastic"],
      ["A catalytic converter helps cars by...", "Making exhaust safer", "Making noise"], ["After a reaction, the catalyst is...", "Still there", "Gone"], ["Which is a catalyst for breaking down hydrogen peroxide in liver or potato?", "An enzyme (catalase)", "Sugar"],
      ["Very high heat can ruin an enzyme because it...", "Changes its shape", "Makes it hungry"], ["Which would speed a reaction without being used up?", "A catalyst", "A reactant"]
    ]),
    les("Fossil fuels", [
      ["Old energy", "🛢️", "<b>Coal, oil and natural gas</b> formed over millions of years from the remains of ancient plants and tiny sea creatures."],
      ["Used up", "⛽", "They are <b>non-renewable</b>: once we use them, they do not come back in our lifetime. Burning them makes carbon dioxide."],
      ["Cleaner options", "☀️", "<b>Renewable</b> energy such as sun, wind and flowing water does not run out and makes much less carbon dioxide."]
    ], ["Think about whether the energy source can be replaced.", "Fossil fuels take millions of years to form. Sun, wind and water keep coming back.", "Example: solar panels use sunlight, which is renewable. Now try yours."], [
      ["Which is a fossil fuel?", "Coal", "Wind", "Sunlight"], ["Which is renewable?", "Wind", "Oil", "Natural gas"], ["Fossil fuels formed from...", "Remains of ancient living things", "Melted glass"],
      ["Burning fossil fuels adds which gas to the air?", "Carbon dioxide", "Helium"], ["Non-renewable means...", "It will run out", "It never ends"], ["Which is a renewable source?", "Flowing water", "Coal"],
      ["How long do fossil fuels take to form?", "Millions of years", "A few days"], ["Which makes less carbon dioxide?", "Solar power", "Burning coal"]
    ]),
    les("Hydrocarbons", [
      ["Carbon and hydrogen", "⛽", "<b>Hydrocarbons</b> contain only carbon and hydrogen. They are in natural gas and petrol."],
      ["Alkanes", "🔗", "The simplest are alkanes: <b>methane</b> CH₄ (1 C), <b>ethane</b> C₂H₆ (2 C), <b>propane</b> C₃H₈ (3 C), <b>butane</b> C₄H₁₀ (4 C), pentane (5 C), hexane (6 C)."],
      ["Rule", "📌", "Hydrogen atoms = 2 × carbon atoms + 2."]
    ], ["Count the carbons first.", "Double the carbons, then add 2 to get the hydrogens.", "Example: butane has 4 carbons, so 2 × 4 + 2 = 10 hydrogens. Now try yours."], [
      hydro, hydro, hydro, hydro,
      ["Which two elements make up a hydrocarbon?", "Carbon and hydrogen", "Carbon and oxygen", "Hydrogen and nitrogen"], ["Which is the simplest alkane?", "Methane", "Butane", "Hexane"], ["Propane has how many carbon atoms?", "3", "2", "4"],
      ["Which fuel is a hydrocarbon?", "Natural gas (methane)", "Water", "Sand"]
    ]),
    les("What's in the air?", [
      ["Air is a mixture", "🌬️", "Air is about <b>78% nitrogen</b>, <b>21% oxygen</b>, a little argon, and just 0.04% carbon dioxide, plus water vapor."],
      ["Testing gases", "🧪", "Oxygen relights a glowing splint. Carbon dioxide turns limewater cloudy. Hydrogen burns with a squeaky pop."],
      ["Plants help", "🌿", "Plants take in carbon dioxide and give out oxygen. This keeps the air we breathe fresh."]
    ], ["Think about the amounts of each gas.", "Nitrogen is the biggest part of air, then oxygen. Carbon dioxide is tiny.", "Example: limewater cloudy means carbon dioxide. Now try yours."], [
      ["Which gas is the biggest part of air?", "Nitrogen", "Oxygen", "Carbon dioxide"], ["About what percent of air is oxygen?", "21%", "78%", "50%"], ["Which gas turns limewater cloudy?", "Carbon dioxide", "Oxygen", "Nitrogen"],
      ["Which gas relights a glowing splint?", "Oxygen", "Nitrogen", "Carbon dioxide"], ["Which gas do plants give out?", "Oxygen", "Hydrogen", "Argon"], ["Air is...", "A mixture of gases", "A single element", "A liquid"],
      ["Which gas pops with a lit splint?", "Hydrogen", "Argon", "Oxygen"], ["Which is a noble gas in air?", "Argon", "Oxygen", "Water vapor"]
    ]),
    les("Gases and pressure", [
      ["Pressure", "🎈", "Gas particles hit the walls of their container. These hits are the gas <b>pressure</b>."],
      ["Squeeze or heat", "🔥", "Squeezing a gas into a smaller space raises pressure. Heating a gas makes particles move faster, so pressure goes up or the gas expands."],
      ["Cold", "❄️", "Cooling a gas makes the particles slow down, so a balloon shrinks in a freezer."]
    ], ["Think about particles hitting the walls.", "Smaller space or more heat means more hits, so higher pressure.", "Example: a bicycle pump squeezes air into a smaller space, raising pressure. Now try yours."], [
      ["If you squeeze gas into a smaller space, pressure...", "Goes up", "Goes down"], ["A balloon put in a freezer will...", "Shrink", "Grow"], ["Heating a gas in a sealed can makes the pressure...", "Increase", "Decrease"],
      ["Gas pressure comes from particles...", "Hitting the walls", "Sinking to the bottom"], ["Why is a hot balloon bigger than a cold one?", "Particles move faster and push out more", "It has more rubber"], ["Pushing a syringe plunger in makes the pressure...", "Higher", "Lower"],
      ["Why do tires need checking when it is very cold?", "Cold air lowers the pressure", "Cold makes air heavier"], ["Air pressure is lower high up a mountain because...", "There is less air above", "There is more air above"]
    ])
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 2, 4, 6, 8, 11, 14, 16])),
    mix("Level 8 Challenge", at(b, [1, 3, 5, 7, 9, 10, 12, 13, 15, 17]))
  );

  // ================= LEVEL 9 =================
  const c = [
    les("Formula mass", [
      ["Adding up", "⚖️", "The <b>formula mass</b> of a compound is the sum of the atomic masses of all its atoms."],
      ["Useful masses", "🔢", "H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, S = 32, Ca = 40."],
      ["Example", "💧", "H₂O has 2 H and 1 O: 2 × 1 + 16 = 18. CO₂ has 1 C and 2 O: 12 + 2 × 16 = 44."]
    ], ["List the atoms in the formula and how many of each.", "Multiply each atomic mass by its small number, then add.", "Example: NO₂ is 14 + 2 × 16 = 46. Now try yours."], [
      molMass, molMass, molMass, molMass, molMass, molMass,
      ["Formula mass is found by...", "Adding the atomic masses of all atoms", "Counting the shells", "Measuring the color"], ["Which has the larger formula mass: O₂ or H₂?", "O₂", "H₂"]
    ]),
    les("Balancing equations", [
      ["Same atoms", "⚖️", "Atoms are never lost in a reaction. The same number of each atom must be on both sides. We <b>balance</b> an equation with big numbers in front."],
      ["Example", "💧", "2H₂ + O₂ → 2H₂O. Left: 4 H and 2 O. Right: 4 H and 2 O. It balances."],
      ["Careful", "⚠️", "Change only the big numbers in front. Never change the small numbers in a formula, because that would change the substance."]
    ], ["Count the atoms of one element on each side.", "Fix one element at a time using the big numbers.", "Example: 2CO + O₂ → 2CO₂ balances with C = 2 and O = 4 on each side. Now try yours."], [
      balance, balance, balance, balance, balance, balance,
      ["Why must equations be balanced?", "Atoms are never lost or made", "It looks pretty", "Mass changes in reactions"], ["Which numbers may you change when balancing?", "The big numbers in front", "The small numbers inside formulas"]
    ]),
    les("Four types of reaction", [
      ["Synthesis", "🧩", "<b>Synthesis</b>: two or more things join into one. A + B → AB. Example: 2Mg + O₂ → 2MgO."],
      ["Decomposition", "✂️", "<b>Decomposition</b>: one compound splits up. AB → A + B. Example: 2H₂O → 2H₂ + O₂."],
      ["Replacement and combustion", "🔥", "<b>Single replacement</b>: A more reactive element swaps places, e.g. zinc + copper sulfate → zinc sulfate + copper. <b>Combustion</b>: a fuel burns in oxygen."]
    ], ["Look at how many substances are on each side.", "One product from many reactants is synthesis. One reactant into many is decomposition. Burning in oxygen is combustion.", "Example: 2NaCl → 2Na + Cl₂ is one thing splitting up. Now try yours."], [
      ["2Na + Cl₂ → 2NaCl is...", "Synthesis", "Decomposition", "Combustion"], ["2H₂O → 2H₂ + O₂ is...", "Decomposition", "Synthesis", "Combustion"], ["CH₄ + 2O₂ → CO₂ + 2H₂O is...", "Combustion", "Decomposition", "Synthesis"],
      ["Zinc pushes copper out of copper sulfate. This is...", "Single replacement", "Decomposition", "Synthesis"], ["Calcium carbonate splitting into calcium oxide and carbon dioxide is...", "Decomposition", "Synthesis"], ["H₂ + Cl₂ → 2HCl is...", "Synthesis", "Decomposition"],
      ["Which type makes one product from two elements?", "Synthesis", "Decomposition"], ["A candle burning is...", "Combustion", "Synthesis"]
    ]),
    les("Electrolysis", [
      ["Electricity splits", "⚡", "<b>Electrolysis</b> uses electricity to split a compound. Passing electricity through water gives hydrogen and oxygen gas."],
      ["Ratio", "🧪", "Water is H₂O, so electrolysis makes <b>twice as much hydrogen</b> as oxygen by volume."],
      ["Uses", "🏭", "Factories use it to make aluminum from its ore and to coat objects with a thin layer of metal (electroplating)."]
    ], ["Electrolysis needs an electric current.", "Water splits into two gases. Compare the number of H and O atoms in water.", "Example: electrolysis of copper chloride makes copper and chlorine. Now try yours."], [
      ["Electrolysis uses...", "Electricity", "A magnet", "Sunlight only"], ["Electrolysis of water makes hydrogen and...", "Oxygen", "Carbon dioxide", "Nitrogen"], ["In electrolysis of water, which gas has the larger volume?", "Hydrogen", "Oxygen"],
      ["Aluminum is made from its ore by...", "Electrolysis", "Sieving", "Freezing"], ["Electroplating coats an object with...", "A thin layer of metal", "Paint"], ["Electrolysis is an example of...", "Decomposition", "Synthesis"],
      ["Splitting water needs energy in the form of...", "Electricity", "Cold"], ["The ratio of H₂ to O₂ made from water is...", "2 to 1", "1 to 2", "1 to 1"]
    ]),
    les("Patterns in the periodic table", [
      ["Across", "➡️", "Moving along a period (left to right), the atomic number goes up. Elements change from metals to non-metals."],
      ["Down", "⬇️", "Elements in a group have the same number of outer electrons. Going down a group, more shells are added."],
      ["In between", "🔶", "<b>Transition metals</b> fill the middle block (iron, copper, zinc). <b>Metalloids</b> like silicon sit between metals and non-metals and behave a bit like both."]
    ], ["Think about which part of the table the element lives in.", "Metals on the left and middle, non-metals on the right, metalloids on the zig-zag between them.", "Example: boron is a metalloid on the boundary. Now try yours."], [
      ["Same group means the same number of...", "Outer electrons", "Neutrons", "Protons"], ["Going left to right across a period, elements change from...", "Metals to non-metals", "Non-metals to metals"], ["Which is a transition metal?", "Iron", "Neon", "Oxygen"],
      ["Silicon is a...", "Metalloid", "Noble gas", "Alkali metal"], ["Going down a group, the number of shells...", "Increases", "Decreases"], ["Atomic number across a period...", "Increases", "Stays the same"],
      ["Which is a non-metal?", "Sulfur", "Copper", "Zinc"], ["Which is a transition metal?", "Copper", "Chlorine", "Helium"]
    ]),
    les("Alkali metals and halogens", [
      ["Alkali metals", "🧈", "Lithium, sodium and potassium are soft enough to cut with a knife. They react with water to make hydrogen and an alkaline solution. They are stored under oil."],
      ["Going down", "⬇️", "Reactivity of alkali metals <b>increases</b> going down the group: potassium is more reactive than sodium, and sodium more than lithium."],
      ["Halogens", "🏊", "Fluorine and chlorine are gases, bromine is a liquid, and iodine is a solid. Each has 7 outer electrons. Chlorine kills germs in swimming pools."]
    ], ["Think about the group each element belongs to.", "Alkali metals are soft and reactive. Halogens have 7 outer electrons and form negative ions.", "Example: rubidium is below potassium, so it is even more reactive. Now try yours."], [
      ["Why are alkali metals stored under oil?", "They react with air and water", "They are very cold", "They are gases"], ["Which is more reactive?", "Potassium", "Lithium"], ["Alkali metals react with water to make hydrogen and...", "An alkaline solution", "An acid"],
      ["Which halogen is used to kill germs in pools?", "Chlorine", "Neon", "Sodium"], ["How many outer electrons does a halogen have?", "7", "1", "8"], ["Which halogen is a solid at room temperature?", "Iodine", "Chlorine", "Fluorine"],
      ["Which is a halogen?", "Fluorine", "Sodium", "Argon"], ["Alkali metals are...", "Soft", "Hard and brittle"]
    ]),
    les("Electron arrangements", [
      ["Writing them", "✍️", "We write electron arrangements as numbers: sodium is 2, 8, 1. The last number is the outer electrons, which gives the group."],
      ["Reading the arrangement", "🔍", "The number of numbers is the number of shells, which gives the period. 2, 8, 1 has three shells, so period 3. The last number 1 means group 1."],
      ["Full shells", "🔒", "Ending in 8 (or just 2 for helium) means a full outer shell, so a noble gas."]
    ], ["Count the shells and read the last number.", "Number of shells = period. Last number = outer electrons = group (for the first two groups and groups 13 to 17 count as 10 + outer).", "Example: 2, 7 has two shells, so period 2, and 7 outer electrons, so a halogen (fluorine). Now try yours."], [
      () => { const e = pick(EL.slice(2, 20)); const s = shells(e[2]); return { text: `An atom has the electron arrangement <b>${s.join(", ")}</b>. How many electrons does it have in total?`, answer: e[2], hints: ["Each number is the electrons in one shell.", "Add all the numbers together.", "Example: 2, 8, 3 gives 2 + 8 + 3 = 13 electrons. Now do yours."] }; },
      () => { const e = pick(EL.slice(2, 20)); const s = shells(e[2]); return { text: `An atom has the electron arrangement <b>${s.join(", ")}</b>. Which period is it in?`, answer: s.length, hints: ["Count how many numbers there are.", "The number of shells is the period number.", "Example: 2, 8, 2 has three shells, so period 3. Now do yours."] }; },
      () => { const e = pick(EL.slice(2, 20)); const s = shells(e[2]); return { text: `An atom has the electron arrangement <b>${s.join(", ")}</b>. How many electrons are in its outer shell?`, answer: s[s.length - 1], hints: ["The outer shell is the last one in the list.", "Look at the last number.", "Example: 2, 8, 6 has 6 outer electrons. Now do yours."] }; },
      ["Which element has the arrangement 2, 8, 1?", "Sodium", "Magnesium", "Neon"], ["Which element has the arrangement 2, 8, 8?", "Argon", "Neon", "Chlorine"], ["Which element has the arrangement 2, 4?", "Carbon", "Oxygen", "Boron"],
      ["Which element has the arrangement 2, 8, 2?", "Magnesium", "Sodium", "Calcium"], ["2, 8, 7 is which element?", "Chlorine", "Fluorine", "Sulfur"]
    ]),
    les("Isotopes", [
      ["Same but different", "👯", "<b>Isotopes</b> are atoms of the same element with the <b>same protons</b> but a <b>different number of neutrons</b>."],
      ["Carbon", "⚫", "Carbon-12 has 6 neutrons. Carbon-14 has 8 neutrons. Both have 6 protons, so both are carbon."],
      ["Using them", "🕰️", "Scientists use carbon-14 to find the age of very old wood and bones. Other isotopes are used in medical scanners."]
    ], ["Isotopes of one element share the same atomic number.", "Neutrons = mass number − protons. The element stays the same.", "Example: chlorine-37 has 37 − 17 = 20 neutrons. Now try yours."], [
      () => { const r = pick([[6, 14, "carbon-14"], [6, 13, "carbon-13"], [8, 18, "oxygen-18"], [17, 37, "chlorine-37"], [1, 2, "hydrogen-2"], [1, 3, "hydrogen-3"], [10, 22, "neon-22"], [12, 26, "magnesium-26"]]); return { text: `How many neutrons does <b>${r[2]}</b> have? (Its atomic number is ${r[0]}.)`, answer: r[1] - r[0], hints: ["The number after the name is the mass number.", "Neutrons = mass number minus atomic number.", "Example: carbon-13 has 13 - 6 = 7 neutrons. Now do yours."] }; },
      () => { const r = pick([[6, 14, "carbon-14"], [6, 13, "carbon-13"], [8, 18, "oxygen-18"], [17, 37, "chlorine-37"], [1, 2, "hydrogen-2"], [1, 3, "hydrogen-3"], [10, 22, "neon-22"], [12, 26, "magnesium-26"]]); return { text: `How many neutrons does <b>${r[2]}</b> have? (Its atomic number is ${r[0]}.)`, answer: r[1] - r[0], hints: ["The number after the name is the mass number.", "Neutrons = mass number minus atomic number.", "Example: carbon-13 has 13 - 6 = 7 neutrons. Now do yours."] }; },
      ["Isotopes of an element have the same number of...", "Protons", "Neutrons", "Mass"], ["Isotopes of an element differ in the number of...", "Neutrons", "Protons", "Electron shells only"], ["Carbon-12 and carbon-14 are...", "Isotopes of carbon", "Different elements"],
      ["What is carbon-14 used for?", "Dating old wood and bones", "Making soda fizzy"], ["Do isotopes of one element have the same atomic number?", "Yes", "No"], ["Hydrogen-1 and hydrogen-2 are different in their...", "Neutrons", "Protons"]
    ]),
    les("Concentration", [
      ["How strong?", "🧂", "<b>Concentration</b> tells how much solute is in a set amount of solution. We can use grams per 100 mL (g/100 mL)."],
      ["Working it out", "🔢", "Divide the grams by the number of 100 mL lots to get g/100 mL. Multiply to go the other way."],
      ["Dilute", "💧", "Adding water makes a solution weaker, but the amount of solute does not change."]
    ], ["Think about how many lots of 100 mL there are.", "Grams per 100 mL = grams ÷ (volume ÷ 100). To find total grams, multiply instead.", "Example: 9 g per 100 mL in 300 mL gives 27 g. Now try yours."], [
      conc, conc, conc, conc, conc,
      ["Adding water to a solution makes it...", "More dilute", "More concentrated"], ["When you dilute a solution, the amount of solute...", "Stays the same", "Doubles"], ["Concentration tells you...", "How much solute is in a set amount of solution", "The color"]
    ]),
    les("Strong and weak acids", [
      ["Strong and weak", "💪", "<b>Strong acids</b> (hydrochloric, sulfuric) break up completely in water and have a very low pH. <b>Weak acids</b> (citric acid in lemons, ethanoic acid in vinegar) only partly break up."],
      ["Ten times", "🔟", "Each pH step is a factor of 10. pH 2 is 10 times more acidic than pH 3 and 100 times more acidic than pH 4."],
      ["Do not mix up", "⚠️", "Strong is not the same as concentrated. Strong tells how much it breaks up. Concentrated tells how much acid is dissolved."]
    ], ["Count how many pH steps apart the two numbers are.", "Each step is 10 times. Two steps is 10 × 10.", "Example: pH 1 is 10 × 10 × 10 = 1000 times more acidic than pH 4. Now try yours."], [
      phStep, phStep, phStep,
      ["Which is a weak acid?", "Citric acid", "Hydrochloric acid", "Sulfuric acid"], ["Which is a strong acid?", "Hydrochloric acid", "Vinegar (ethanoic acid)", "Citric acid"], ["Which has the lower pH?", "A strong acid", "A weak acid of the same concentration"],
      ["pH 3 is how many times more acidic than pH 4?", "10", "100", "2"], ["Strong acid means it...", "Breaks up completely in water", "Is always very concentrated"]
    ]),
    les("Making salts", [
      ["Naming salts", "🏷️", "The first part of a salt's name comes from the metal. The second comes from the acid: hydrochloric acid gives <b>chlorides</b>, sulfuric acid gives <b>sulfates</b>, nitric acid gives <b>nitrates</b>."],
      ["Acid and base", "⚖️", "Acid + base → salt + water. Example: sulfuric acid + sodium hydroxide → sodium sulfate + water."],
      ["Acid and metal", "🫧", "Acid + metal → salt + hydrogen. Example: hydrochloric acid + magnesium → magnesium chloride + hydrogen."]
    ], ["Split the answer into the metal part and the acid part.", "Chloride from hydrochloric, sulfate from sulfuric, nitrate from nitric.", "Example: hydrochloric acid + lithium hydroxide → lithium chloride + water. Now try yours."], [
      saltName, saltName, saltName,
      ["Hydrochloric acid + magnesium makes magnesium chloride and...", "Hydrogen gas", "Oxygen gas", "Gold"], ["Sulfuric acid makes salts called...", "Sulfates", "Chlorides", "Nitrates"], ["Nitric acid makes salts called...", "Nitrates", "Sulfates", "Chlorides"],
      ["Which gas is made when a reactive metal meets acid?", "Hydrogen", "Helium", "Neon"], ["Hydrochloric acid makes salts called...", "Chlorides", "Sulfates"]
    ]),
    les("Crude oil", [
      ["Black gold", "🛢️", "<b>Crude oil</b> is a mixture of hydrocarbons. It is sorted by <b>fractional distillation</b>."],
      ["How it works", "🏭", "Oil is heated and the vapors rise up a tall tower. The tower is cooler at the top. Each fraction condenses at its own boiling point."],
      ["Small to large", "📏", "Small molecules (gases like propane, then petrol) rise to the top. Large molecules (diesel, fuel oil, bitumen for roads) stay lower."]
    ], ["Think about the boiling point of small and large molecules.", "Small molecules have low boiling points, so they rise highest. Large molecules condense lower down.", "Example: petrol has smaller molecules than diesel, so it comes off higher in the tower. Now try yours."], [
      ["Fractional distillation separates crude oil by...", "Boiling point", "Color", "Magnet"], ["Which comes off at the top of the tower?", "Small molecules (gases)", "Bitumen"], ["Bitumen, used for roads, is made of...", "Very large molecules", "Tiny molecules"],
      ["Crude oil is...", "A mixture of hydrocarbons", "A pure element"], ["The tower is hottest at the...", "Bottom", "Top"], ["Which has the lower boiling point?", "Petrol", "Bitumen"],
      ["Cracking is used to...", "Break big molecules into smaller ones", "Join small molecules into gold"], ["Fractions are used to make...", "Fuels and plastics", "Only food"]
    ]),
    les("Materials science", [
      ["Ceramics and glass", "🏺", "<b>Ceramics</b> (pottery, bricks) are hard, brittle and heat-proof. <b>Glass</b> is made by melting sand and cooling it."],
      ["Composites", "🧱", "A <b>composite</b> joins two materials to get the best of both. Concrete with steel rods is strong when pushed and when pulled. Fiberglass is plastic reinforced with glass fibers."],
      ["Alloys", "🔩", "An <b>alloy</b> is a mixture of metals. Steel is iron plus carbon. Brass is copper plus zinc. Alloys are often stronger than pure metals."]
    ], ["Think about which property the job needs.", "Alloys make metals stronger. Composites combine two materials. Ceramics resist heat.", "Example: a kiln is lined with ceramic because it survives high heat. Now try yours."], [
      ["Steel is an alloy of iron and...", "Carbon", "Gold", "Neon"], ["Brass is copper mixed with...", "Zinc", "Sulfur", "Sand"], ["A composite is made by...", "Combining two or more materials", "Melting one metal"],
      ["Which material is brittle and heat-proof?", "Ceramic", "Rubber", "Cotton"], ["Glass is made by melting...", "Sand", "Salt"], ["Why is concrete reinforced with steel?", "To make it stronger", "To make it softer"],
      ["Which is a composite?", "Fiberglass", "Pure gold", "Water"], ["Alloys are usually...", "Stronger than the pure metals", "Weaker than any pure metal"]
    ]),
    les("Clean water", [
      ["Treating water", "🚰", "Drinking water is cleaned in steps: <b>screens</b> remove large objects, <b>settling</b> lets mud sink, <b>filters</b> catch small bits, and <b>chlorine</b> kills germs."],
      ["Hard water", "🫧", "Water with a lot of dissolved calcium and magnesium is <b>hard</b>. It leaves scale in kettles and makes less soap lather."],
      ["Salt water", "🌊", "Desalination plants remove salt from sea water by distillation or by pushing water through very fine filters."]
    ], ["Think about what each step removes.", "Big things first, then small things, then germs.", "Example: a sand filter catches fine particles. Now try yours."], [
      ["Which step kills germs in tap water?", "Adding chlorine", "Screening", "Settling"], ["Which step removes large objects like sticks?", "Screens", "Chlorine"], ["Hard water has lots of dissolved...", "Calcium and magnesium", "Sugar"],
      ["Hard water leaves what in kettles?", "Scale", "Gold"], ["Desalination removes...", "Salt", "Sand only"], ["Why should we only drink treated water?", "It is safe from germs", "It tastes sweet"],
      ["Hard water makes soap...", "Lather less", "Lather more"], ["Which separates the mud in water treatment by letting it sink?", "Settling", "Boiling"]
    ]),
    les("Energy in reactions", [
      ["Bonds", "🔗", "Atoms are held together by bonds. Breaking bonds <b>takes in</b> energy. Making new bonds <b>gives out</b> energy."],
      ["Which wins?", "⚖️", "If more energy is given out making bonds than taken in breaking them, the reaction is <b>exothermic</b> and the surroundings warm up. If less, it is <b>endothermic</b> and they cool."],
      ["Measure it", "🌡️", "We measure the temperature change with a thermometer. A temperature rise means exothermic. A fall means endothermic."]
    ], ["Look at whether the temperature went up or down.", "Up means energy given out (exothermic). Down means energy taken in (endothermic).", "Example: a rise of 6 degrees from 20 °C is exothermic. Now try yours."], [
      tempChange, tempChange, tempChange, tempChange,
      ["Breaking bonds needs energy that is...", "Taken in", "Given out"], ["Making bonds...", "Gives out energy", "Takes in energy"], ["An exothermic reaction makes the surroundings...", "Warmer", "Colder"],
      ["A thermometer reading that falls during a reaction shows it is...", "Endothermic", "Exothermic"]
    ]),
    les("Giant structures", [
      ["Carbon in two forms", "💎", "<b>Diamond</b>: each carbon bonds to 4 others, so it is the hardest natural material. <b>Graphite</b>: carbon in slippery layers, and it conducts electricity."],
      ["Salt and metals", "🧂", "Salt is a regular pattern of ions called a lattice. It has a high melting point. Metals have a sea of free electrons, so they conduct and bend."],
      ["Small molecules", "💧", "Substances made of small molecules, like water or methane, have low melting and boiling points because the molecules separate easily."]
    ], ["Think about how the atoms or ions are arranged and joined.", "Strong bonds all through a structure mean a high melting point. Layers can slide. Free electrons carry current.", "Example: silicon dioxide (sand) has strong bonds all through, so it melts at a very high temperature. Now try yours."], [
      ["Which form of carbon is the hardest?", "Diamond", "Graphite"], ["Why is graphite slippery?", "Its layers slide over each other", "It is a liquid"], ["Which form of carbon conducts electricity?", "Graphite", "Diamond"],
      ["Which has a very high melting point?", "Salt (sodium chloride)", "Methane gas"], ["Why do metals conduct electricity?", "They have free electrons", "They are shiny"], ["Why does water boil at a low temperature compared with salt melting?", "Small molecules separate easily", "Water has big crystals"],
      ["How many bonds does each carbon make in diamond?", "4", "2", "8"], ["Pencil lead is mostly...", "Graphite", "Diamond", "Lead metal"]
    ]),
    les("Heating curves", [
      ["Reading a graph", "📈", "A heating curve plots temperature against time as something is heated steadily."],
      ["Flat parts", "➖", "A flat part means a change of state: the heat is breaking particles apart rather than raising the temperature. Flat at the melting point = melting. Flat at the boiling point = boiling."],
      ["Sloping parts", "📐", "A sloping line going up means the solid, liquid or gas is getting hotter."]
    ], ["Compare the temperature with the melting and boiling points.", "Below melting: solid. Between: liquid. Above boiling: gas.", "Example: iron melts at 1538 °C, so at 1000 °C it is solid. Now try yours."], [
      stateAt, stateAt, stateAt, stateAt, stateAt,
      ["A flat part on a heating curve at 0 °C for water shows...", "Melting", "Boiling", "Dissolving"], ["A flat part at 100 °C for water shows...", "Boiling", "Melting"], ["A rising slope in a heating curve means the substance is...", "Getting hotter", "Changing state"]
    ]),
    les("Fair tests and data", [
      ["Variables", "🎛️", "In a fair test, change only the <b>independent variable</b>, measure the <b>dependent variable</b>, and keep other <b>control variables</b> the same."],
      ["Repeat", "🔁", "Repeat the test and find the <b>mean</b> (add the results, divide by how many). This reduces the effect of mistakes."],
      ["Graphs", "📊", "Put the independent variable on the x-axis and the dependent variable on the y-axis. Look for a pattern."]
    ], ["Ask what you change, what you measure and what you keep the same.", "Mean = total ÷ number of results. Independent is changed, dependent is measured.", "Example: testing temperature and time: temperature is changed, time is measured. Now try yours."], [
      average, average, average,
      ["You test how temperature affects dissolving time. The independent variable is...", "Temperature", "Dissolving time", "The cup"], ["In that test, the dependent variable is...", "Dissolving time", "Temperature", "The room"], ["Which should stay the same (control)?", "The amount of water", "The temperature you are testing"],
      ["Why repeat an experiment?", "To get more reliable results", "To waste time"], ["The mean of a set of results is found by...", "Adding them and dividing by how many", "Picking the biggest"]
    ])
  ];
  c.push(
    mix("Mixed practice", at(c, [0, 1, 4, 6, 8, 10, 13, 16])),
    mix("Level 9 Challenge", at(c, [2, 3, 5, 7, 9, 11, 12, 14, 15, 17]))
  );

  Object.assign(CHEM_LEVELS, { 7: a, 8: b, 9: c });
})();
