// ext/chem-19-21.js  Mind Lab Chemistry levels 19-21 (grade 9 both halves, grade 10 first half): high-school chemistry with worked methods
// atoms and electron configuration, bonding, balancing, stoichiometry, solutions, gases, energy, rates, equilibrium, acids, electrochemistry
(() => {
  // turn unicode sub/superscripts into html so that different formulas never look identical to the answer checker
  const SUBM = "₀₁₂₃₄₅₆₇₈₉", SUPM = "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻";
  const U = s => typeof s !== "string" ? s : s.replace(/[₀-₉]+/g, m => `<sub>${[...m].map(ch => SUBM.indexOf(ch)).join("")}</sub>`).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, m => `<sup>${[...m].map(ch => "0123456789+-"[SUPM.indexOf(ch)]).join("")}</sup>`);
  // item = [question, right, wrong1, wrong2?, wrong3?] ("emoji§question" shows a big picture) OR a function returning an item or a full question object
  const les = (title, slides, hints, items) => {
    const make = () => {
      let it = pick(items);
      if (typeof it === "function") it = it();
      if (!Array.isArray(it)) return Object.assign({ hints }, it);
      it = it.map(U);
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
  const num = (text, answer, hints, visual) => ({ text, answer, hints, visual });
  const mcq = (text, right, wrongs, hints, visual) => ({ text: U(text), choices: shuf([right, ...wrongs].map(U)), answer: U(right), hints, visual });
  const r1 = x => Math.round(x * 10) / 10;
  const r2 = x => Math.round(x * 100) / 100;
  const fmt = f => f.replace(/([A-Za-z)])(\d+)/g, "$1<sub>$2</sub>");
  const sup = s => `<sup>${s}</sup>`;
  const ionS = (sym, c) => fmt(sym) + sup(c);
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const lcm = (a, b) => a * b / gcd(a, b);
  const others = (arr, not, n) => shuf(arr.filter(x => x !== not)).slice(0, n);
  const ARV = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, P: 31, S: 32, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65 };
  const parse = f => { const o = {}; (f.match(/[A-Z][a-z]?\d*/g) || []).forEach(p => { const e = p.match(/[A-Z][a-z]?/)[0], n = +(p.slice(e.length) || 1); o[e] = (o[e] || 0) + n; }); return o; };
  const expand = f => { let s = f, m; while ((m = s.match(/\(([^()]*)\)(\d*)/))) { const k = +(m[2] || 1), o = parse(m[1]); s = s.replace(m[0], Object.entries(o).map(([e, n]) => e + (n * k)).join("")); } return s; };
  const atoms = f => parse(expand(f));
  const mr = f => Object.entries(atoms(f)).reduce((t, [e, n]) => t + ARV[e] * n, 0);
  const arNote = (...fs) => { const els = [...new Set(fs.flatMap(f => Object.keys(atoms(f))))]; return `(Ar: ${els.map(e => e + " = " + ARV[e]).join(", ")}.)`; };
  const SUPD = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  // shell / sublevel configurations
  const SUBS = [["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6], ["4s", 2], ["3d", 10], ["4p", 6]];
  const cfgParts = z => { let left = z; const o = []; for (const [n, c] of SUBS) { if (left <= 0) break; const k = Math.min(c, left); o.push([n, k]); left -= k; } return o; };
  const cfgStr = z => cfgParts(z).map(([n, k]) => n + sup(k)).join(" ");
  const NAMES = ["", "hydrogen", "helium", "lithium", "beryllium", "boron", "carbon", "nitrogen", "oxygen", "fluorine", "neon", "sodium", "magnesium", "aluminium", "silicon", "phosphorus", "sulfur", "chlorine", "argon", "potassium", "calcium", "scandium", "titanium", "vanadium", "chromium", "manganese", "iron", "cobalt", "nickel", "copper", "zinc", "gallium", "germanium", "arsenic", "selenium", "bromine", "krypton"];
  const SYM = ["", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"];
  const cap = s => s[0].toUpperCase() + s.slice(1);

  // ================= LEVEL 19 =================
  const a = [];
  const ELS = [["carbon", "C", 6, 12], ["nitrogen", "N", 7, 14], ["oxygen", "O", 8, 16], ["sodium", "Na", 11, 23], ["magnesium", "Mg", 12, 24], ["aluminium", "Al", 13, 27], ["phosphorus", "P", 15, 31], ["sulfur", "S", 16, 32], ["chlorine", "Cl", 17, 35], ["potassium", "K", 19, 39], ["calcium", "Ca", 20, 40], ["iron", "Fe", 26, 56], ["zinc", "Zn", 30, 64], ["bromine", "Br", 35, 79]];

  const subQ = () => {
    const e = pick(ELS), [nm, sy, z, A] = e, t = ri(0, 3);
    if (t === 0) return num(`An atom of <b>${nm}</b> has atomic number <b>${z}</b> and mass number <b>${A}</b>. How many neutrons does it have?`, A - z,
      ["Mass number counts the particles in the nucleus.", "Neutrons = mass number − atomic number (the number of protons).", "Example: an atom with atomic number 9 and mass number 19 has 19 − 9 = 10 neutrons. Now do yours."], "⚛️");
    if (t === 1) { const n = A - z; return num(`An atom has <b>${z}</b> protons and <b>${n}</b> neutrons. What is its mass number?`, A,
      ["The mass number is the total number of particles in the nucleus.", "Add the protons and the neutrons together.", "Example: 3 protons and 4 neutrons make a mass number of 7. Now do yours."], "⚛️"); }
    if (t === 2) { const n = A - z; return num(`An atom has mass number <b>${A}</b> and <b>${n}</b> neutrons. What is its atomic number (number of protons)?`, z,
      ["Protons and neutrons together make the mass number.", "Subtract the neutrons from the mass number to find the protons.", "Example: mass number 9 with 5 neutrons has 9 − 5 = 4 protons. Now do yours."], "⚛️"); }
    return num(`A neutral atom of <b>${nm}</b> (atomic number <b>${z}</b>) has how many electrons?`, z,
      ["A neutral atom has no overall charge.", "Positive protons and negative electrons must cancel out, so their numbers match.", "Example: neutral fluorine has atomic number 9, so it has 9 electrons. Now do yours."], "⚛️");

  };
  a.push(les("Protons, neutrons, electrons", [
    ["Counting the particles", "⚛️", "Every atom has <b>protons</b> (+) and <b>neutrons</b> (no charge) in the nucleus and <b>electrons</b> (−) around it. The <b>atomic number</b> Z is the number of protons. It decides which element it is."],
    ["Mass number", "🔢", "The <b>mass number</b> A = protons + neutrons. So <b>neutrons = A − Z</b>. Example: chlorine-35 has Z = 17, so 35 − 17 = <b>18 neutrons</b>."],
    ["Neutral atoms", "⚖️", "In a neutral atom, electrons = protons. The electrons are almost weightless, so the mass number ignores them."]
  ], ["Match each particle to the number you are given.", "The atomic number is the proton count; the mass number is protons plus neutrons.", "Example: sodium has Z = 11 and A = 23, so it has 23 − 11 = 12 neutrons. Now try yours."], [
    subQ, subQ, subQ, subQ, subQ,
    ["Which particle in the nucleus has no charge?", "Neutron", "Proton", "Electron"],
    ["What decides which element an atom is?", "Its number of protons", "Its number of neutrons", "Its number of electrons only"],
    ["The mass number is the number of...", "Protons plus neutrons", "Protons plus electrons", "Neutrons only"]
  ]));

  const IONS = [["Na", 11, 1], ["Mg", 12, 2], ["Al", 13, 3], ["K", 19, 1], ["Ca", 20, 2], ["Li", 3, 1], ["O", 8, -2], ["F", 9, -1], ["Cl", 17, -1], ["S", 16, -2], ["N", 7, -3], ["Zn", 30, 2], ["Br", 35, -1], ["Fe", 26, 3]];
  const cs = c => (Math.abs(c) === 1 ? "" : Math.abs(c)) + (c > 0 ? "+" : "-");
  const ionQ = () => {
    const [s, z, c] = pick(IONS), t = ri(0, 2), nm = ionS(s, cs(c));
    if (t === 0) return num(`How many electrons are in one ${nm} ion? (Atomic number of ${s} = ${z}.)`, z - c,
      c > 0 ? ["A positive ion has lost electrons.", "Start from the neutral atom's electrons, then take away one for each + charge.", "Example: Be has 4 electrons; Be²⁺ has lost 2, so it has 2. Now do yours."] : ["A negative ion has gained electrons.", "Start from the neutral atom's electrons, then add one for each − charge.", "Example: P has 15 electrons; P³⁻ has gained 3, so it has 18. Now do yours."], "⚡");
    if (t === 1) return num(`How many protons are in one ${nm} ion? (Atomic number of ${s} = ${z}.)`, z,
      ["Do ions change their nucleus when they gain or lose electrons?", "Only the electrons change. The protons stay exactly the same.", "Example: Be²⁺ and Be both have 4 protons. Now do yours."], "⚡");
    return num(`A neutral ${fmt(s)} atom has ${z} electrons. How many electrons does ${nm} have after it ${c > 0 ? "loses" : "gains"} ${Math.abs(c)}?`, z - c,
      ["Count electrons before, then add or subtract.", c > 0 ? "Losing electrons takes them away." : "Gaining electrons adds them on.", "Example: an atom with 20 electrons that gains 1 now has 21; one with 14 electrons that loses 3 has 11. Now do yours."], "⚡");
  };
  a.push(les("Ions: losing and gaining electrons", [
    ["Charged atoms", "⚡", "An atom becomes an <b>ion</b> when it gains or loses <b>electrons</b>. Protons never change. Losing electrons makes a <b>positive</b> ion (cation); gaining makes a <b>negative</b> ion (anion)."],
    ["Do the sum", "🧮", "<b>electrons = atomic number − charge</b>. Mg²⁺ (Z = 12): 12 − (+2) = <b>10</b> electrons. O²⁻ (Z = 8): 8 − (−2) = <b>10</b> electrons."],
    ["Same as a noble gas", "🎯", "Ions often end up with the same number of electrons as a noble gas. Mg²⁺, Na⁺, F⁻ and O²⁻ all have 10, like neon."]
  ], ["Protons do not change in an ion. Only the electrons do.", "Positive charge means electrons were lost; negative charge means electrons were gained.", "Example: S has 16 electrons; S²⁻ gained 2 so it has 18. Now try yours."], [
    ionQ, ionQ, ionQ, ionQ,
    () => mcq(`Which ion has the <b>same number of electrons as a neon atom</b> (10 electrons)?`, ionS("Mg", "2+"), [ionS("Cl", "-"), ionS("K", "+"), ionS("Li", "+")], ["Work out the electrons for each ion by using atomic number − charge.", "Neon has 10 electrons, so look for the ion where the sum gives 10.", "Example: Be²⁺ has 4 − 2 = 2 electrons, so it matches helium. Now do yours."], "⚡"),
    () => mcq(`Which ion has the <b>same number of electrons as an argon atom</b> (18 electrons)?`, ionS("Cl", "-"), [ionS("Na", "+"), ionS("F", "-"), ionS("Li", "+")], ["Work out the electrons for each ion by using atomic number − charge.", "Argon has 18 electrons, so look for the ion where the sum gives 18.", "Example: Be²⁺ has 4 − 2 = 2 electrons, so it matches helium. Now do yours."], "⚡")
  ]));

  const isoQ = () => {
    const els = shuf([[6, 12], [6, 13], [6, 14], [8, 16], [8, 18], [17, 35], [17, 37], [11, 23], [1, 1], [1, 2]]);
    // build three atoms: two isotopes (same Z, different A) and one different element
    const base = pick([[6, [12, 13, 14]], [8, [16, 17, 18]], [17, [35, 37]], [1, [1, 2, 3]], [26, [54, 56, 57]], [10, [20, 21, 22]]]);
    const z = base[0], aa = shuf(base[1]).slice(0, 2);
    let z2 = pick([5, 7, 9, 12, 14, 16, 18, 20]); if (z2 === z) z2 = z + 3;
    const third = [z2, z2 * 2 + ri(0, 2)];
    const atomsL = shuf([[z, aa[0]], [z, aa[1]], third]);
    const idx = atomsL.map((x, i) => i).filter(i => atomsL[i][0] === z);
    const nameOf = p => `${p[0]} protons, ${p[1] - p[0]} neutrons`;
    const lab = (i, j) => `Atoms ${i + 1} and ${j + 1}`;
    const right = lab(idx[0], idx[1]);
    const all = [lab(0, 1), lab(0, 2), lab(1, 2)];
    return { text: `Atom 1: ${nameOf(atomsL[0])}. Atom 2: ${nameOf(atomsL[1])}. Atom 3: ${nameOf(atomsL[2])}. Which two atoms are <b>isotopes</b> of the same element?`,
      choices: shuf(all), answer: right, visual: "🧬",
      hints: ["Isotopes of one element have the same number of protons.", "Look for the two atoms with the same protons but a different number of neutrons.", "Example: an atom with 6 protons and 6 neutrons and one with 6 protons and 8 neutrons are isotopes (carbon-12 and carbon-14). Now do yours."] };
  };
  const ISON = [["carbon-14", 6, 14], ["hydrogen-3", 1, 3], ["chlorine-37", 17, 37], ["potassium-40", 19, 40], ["uranium-235", 92, 235], ["cobalt-60", 27, 60], ["iodine-131", 53, 131], ["sodium-24", 11, 24], ["oxygen-18", 8, 18], ["phosphorus-32", 15, 32]];
  const isoN = () => { const [n, z, A] = pick(ISON); return num(`The isotope <b>${n}</b> has atomic number <b>${z}</b>. How many neutrons does it have?`, A - z,
    ["The number after the name is the mass number.", "Neutrons = mass number − atomic number.", "Example: carbon-13 has atomic number 6, so it has 13 − 6 = 7 neutrons. Now do yours."], "☢️"); };
  a.push(les("Isotopes: same element, different mass", [
    ["Same protons", "🧬", "<b>Isotopes</b> are atoms of the same element with different numbers of <b>neutrons</b>. Carbon-12 and carbon-14 both have 6 protons but 6 and 8 neutrons."],
    ["The name tells the mass", "🏷️", "The number in the name is the <b>mass number</b>. Uranium-235 has 92 protons, so 235 − 92 = <b>143 neutrons</b>."],
    ["Same chemistry", "🧪", "Isotopes have the same number of electrons, so they react in the same way. They differ in mass, and some are radioactive."]
  ], ["Isotopes are the same element, so something stays equal between them.", "Protons stay the same; neutrons change, so the mass number changes.", "Example: chlorine-35 and chlorine-37 are isotopes: both have 17 protons, with 18 and 20 neutrons. Now try yours."], [
    isoQ, isoQ, isoN, isoN,
    ["Isotopes of an element have different numbers of...", "Neutrons", "Protons", "Positive charges"],
    ["Why do isotopes of one element react in the same way?", "They have the same number of electrons", "They have the same mass", "They have the same neutrons"],
    ["Carbon-12 and carbon-14 differ in...", "Their number of neutrons", "Their number of protons", "The element they are"]
  ]));

  const shellStr = z => { const cap = [2, 8, 8, 2]; let left = z; const o = []; for (const c of cap) { if (left <= 0) break; const k = Math.min(c, left); o.push(k); left -= k; } if (z === 19) return "2,8,8,1"; return o.join(","); };
  const shellQ = () => {
    const z = ri(3, 20), nm = NAMES[z], right = shellStr(z), t = ri(0, 2), ex = z <= 18 ? z + 2 : z - 2;
    if (t < 2) {
      const wr = others([...new Set([3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 19, 20].filter(x => x !== z).map(shellStr))].filter(s => s !== right), null, 3);
      return mcq(`What is the electron arrangement (electrons in each shell, inner first) of <b>${nm}</b>, atomic number ${z}?`, right, wr,
        ["Fill the shells from the inside out: the first holds 2 electrons, the next 8.", "After 2 and 8, the third shell takes up to 8 more before the fourth is used. Add up your numbers to check they equal the atomic number.", `Example: ${NAMES[ex]} (Z = ${ex}) is written ${shellStr(ex)}. Now do yours.`], "🥚");
    }
    return num(`How many electrons are in the <b>outer shell</b> of a ${nm} atom (atomic number ${z})?`, +shellStr(z).split(",").pop(),
      ["Fill the shells in order: 2, then 8, then 8, then 2.", "Put electrons in the inner shells first. What is left over goes in the outer shell.", `Example: ${NAMES[ex]} (Z = ${ex}) is ${shellStr(ex)}, so its outer shell holds ${shellStr(ex).split(",").pop()}. Now do yours.`], "🥚");
  };
  a.push(les("Electron shells: 2, 8, 8", [
    ["Shells hold electrons", "🥚", "Electrons live in <b>shells</b> around the nucleus. The first shell holds up to <b>2</b>, the second up to <b>8</b>, the third up to <b>8</b> (for the first 20 elements)."],
    ["Fill from inside out", "🪜", "Always fill the lowest shell first. Sodium (Z = 11): 2 + 8 = 10, one left over, so the arrangement is <b>2,8,1</b>."],
    ["What the outer shell tells us", "🔑", "The electrons in the <b>outer shell</b> decide how an atom reacts. Atoms with a full outer shell, like neon (2,8) and argon (2,8,8), are very unreactive."]
  ], ["The atomic number tells you how many electrons to place.", "Fill 2 in the first shell, then up to 8 in the second, then up to 8 in the third.", "Example: Mg (Z = 12) is 2,8,2. Now work out yours."], [
    shellQ, shellQ, shellQ, shellQ,
    ["How many electrons can the first shell hold?", "2", "8", "18"],
    ["Which atom has a full outer shell?", "Neon (2,8)", "Sodium (2,8,1)", "Oxygen (2,6)"],
    ["How many shells does a potassium atom (2,8,8,1) have?", "4", "3", "1"]
  ]));

  const VAL = [["lithium", 1, 1], ["sodium", 1, 1], ["potassium", 1, 1], ["beryllium", 2, 2], ["magnesium", 2, 2], ["calcium", 2, 2], ["boron", 13, 3], ["aluminium", 13, 3], ["carbon", 14, 4], ["silicon", 14, 4], ["nitrogen", 15, 5], ["phosphorus", 15, 5], ["oxygen", 16, 6], ["sulfur", 16, 6], ["fluorine", 17, 7], ["chlorine", 17, 7], ["neon", 18, 8], ["argon", 18, 8]];
  const valQ = () => {
    const [nm, g, v] = pick(VAL), t = ri(0, 2);
    if (t === 0) return num(`<b>${cap(nm)}</b> is in group <b>${g}</b> of the periodic table. How many valence (outer-shell) electrons does it have?`, v,
      g < 3 ? ["For groups 1 and 2 the group number is the answer.", "Group 1 has 1 valence electron, group 2 has 2. Use the same idea for your group.", "Example: an element in group 1 or 2 has valence electrons equal to its group number, such as rubidium in group 1 with 1. Now do yours."] : ["For groups 13 to 18, take away 10 from the group number.", "Group 13 starts at 3, and each group to the right adds one more.", `Example: group ${g === 16 ? 15 : 16} gives ${g === 16 ? 5 : 6} valence electrons. Now do yours.`], "🔑");
    if (t === 1) return num(`A main-group element (not helium) has <b>${v}</b> valence electrons. Which <b>group number</b> is it in?`, v < 3 ? v : v + 10,
      ["Groups 1 and 2 use the same number as the valence electrons.", "For 3 to 8 valence electrons, the group number is the valence electron number plus 10.", "Example: ${v === 6 ? 7 : 6} valence electrons means group ${v === 6 ? 17 : 16}. Now do yours."], "🔑");
    const per = { lithium: 2, sodium: 3, potassium: 4, beryllium: 2, magnesium: 3, calcium: 4, boron: 2, aluminium: 3, carbon: 2, silicon: 3, nitrogen: 2, phosphorus: 3, oxygen: 2, sulfur: 3, fluorine: 2, chlorine: 3, neon: 2, argon: 3 };
    return num(`<b>${cap(nm)}</b> is in period <b>${per[nm]}</b>. How many electron shells does a ${nm} atom have?`, per[nm],
      ["Periods are the rows of the periodic table.", "The period number equals the number of shells that hold electrons.", "Example: an element in period 2 has two shells. Now do yours."], "🔑");
  };
  a.push(les("Valence electrons and the periodic table", [
    ["Outer electrons", "🔑", "<b>Valence electrons</b> are the electrons in the outer shell. They do the bonding."],
    ["Groups tell you", "🧭", "Elements in the same <b>group</b> (column) have the same number of valence electrons. Groups 1 and 2: 1 and 2. Groups 13 to 18: <b>group number − 10</b>, so group 16 has 6."],
    ["Periods tell you shells", "📏", "The <b>period</b> (row) tells you the number of shells. Sodium is period 3, group 1: <b>3 shells, 1 valence electron</b>."]
  ], ["Think about which part of the table tells you the outer electrons.", "Group tells valence electrons. Period tells how many shells.", "Example: chlorine, group 17 period 3 has 7 valence electrons and 3 shells. Now try yours."], [
    valQ, valQ, valQ, valQ,
    ["Elements in the same group have the same number of...", "Valence electrons", "Shells", "Neutrons"],
    ["Which element has the same number of valence electrons as lithium?", "Sodium", "Beryllium", "Fluorine"],
    ["Which element has the same number of valence electrons as oxygen?", "Sulfur", "Nitrogen", "Chlorine"]
  ]));

  const cfgQ = () => {
    const z = ri(3, 18), t = ri(0, 2), ex = z <= 15 ? z + 3 : z - 3;
    if (t === 0) {
      const wr = others([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].filter(x => Math.abs(x - z) <= 3), z, 3);
      return { text: `Which element has the ground-state configuration <b>${cfgStr(z)}</b>?`, choices: shuf([z, ...wr].map(x => cap(NAMES[x]))), answer: cap(NAMES[z]), visual: "📚",
        hints: ["Add up the little raised numbers. That is the number of electrons.", "A neutral atom has electrons equal to its atomic number, so the total points to the element.", "Example: 1s² adds to 2, which is helium. Now do yours."] };
    }
    if (t === 1) {
      const wr = others([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].filter(x => Math.abs(x - z) <= 3), z, 3);
      return { text: `What is the ground-state electron configuration of <b>${NAMES[z]}</b> (atomic number ${z})?`, choices: shuf([z, ...wr].map(cfgStr)), answer: cfgStr(z), visual: "📚",
        hints: ["Fill in this order: 1s, 2s, 2p, 3s, 3p.", "s holds 2 electrons, p holds 6. Stop when the total equals the atomic number.", `Example: ${NAMES[ex]} (Z = ${ex}) is ${cfgStr(ex)}. Now do yours.`] };
    }
    const z2 = ri(5, 18), p2 = Math.min(Math.max(z2 - 4, 0), 6), ez = z2 === 7 ? 8 : 7, ep = ez - 4;
    return num(`In the ground-state configuration of <b>${NAMES[z2]}</b> (atomic number ${z2}), how many electrons are in the <b>2p</b> sublevel?`, p2,
      ["Fill 1s first, then 2s, then 2p.", "1s and 2s take 4 electrons altogether. The next 6 go in 2p. Work out how many of your electrons reach 2p.", `Example: Z = ${ez}: 1s² 2s² takes 4, leaving ${ep} in 2p. Now do yours.`], "📚");
  };
  a.push(les("Electron configurations to argon", [
    ["Sublevels", "📚", "Each shell is split into <b>sublevels</b>: s (holds 2 electrons) and p (holds 6). The 1st shell has only 1s; the 2nd has 2s and 2p; the 3rd has 3s and 3p."],
    ["The filling order", "🪜", "Fill in order <b>1s, 2s, 2p, 3s, 3p</b>. Chlorine (Z = 17): 1s² 2s² 2p⁶ 3s² 3p⁵. The raised numbers add up to 17."],
    ["Check it", "✅", "Always add the raised numbers. They must equal the atomic number for a neutral atom. The last sublevel written shows the valence electrons: 3s² 3p⁵ means 7."]
  ], ["Add up the raised numbers or fill the sublevels in order.", "Capacities: s = 2, p = 6. The order is 1s, 2s, 2p, 3s, 3p.", "Example: Al (Z = 13): 2 + 2 + 6 = 10 in the first three, 3 left: 3s² 3p¹. Now try yours."], [
    cfgQ, cfgQ, cfgQ, cfgQ,
    ["How many electrons can a p sublevel hold?", "6", "2", "10"],
    ["How many electrons can an s sublevel hold?", "2", "6", "8"]
  ]));

  const dotQ = () => {
    const [nm, g, v] = pick(VAL.filter(x => x[0] !== "neon" && x[0] !== "argon" || Math.random() < 0.3)), un = v <= 4 ? v : 8 - v, t = ri(0, 1), ev = v === 6 ? 7 : 6;
    if (t === 0) return num(`How many dots go around the symbol in the Lewis dot diagram of <b>${nm}</b> (group ${g})?`, v,
      ["Each dot stands for one valence electron.", "Find the valence electrons from the group number first.", `Example: an element in group ${ev + 10} has ${ev} valence electrons, so ${ev} dots. Now do yours.`], "•");
    return num(`In the Lewis dot symbol of <b>${nm}</b> (${v} valence electrons), how many dots are <b>unpaired</b>? (Put one dot on each side before pairing up.)`, un,
      ["Place dots one at a time on the four sides. Only after four dots do you start pairing.", v <= 4 ? "With 4 or fewer dots, none have to be paired." : "With more than 4 dots, the extra ones join existing dots to make pairs.", `Example: an atom with ${ev} dots: 4 sides get 1 each, then ${ev - 4} pair up, leaving ${8 - ev} unpaired. Now do yours.`], "•");
  };
  a.push(les("Lewis dot symbols", [
    ["Dots for valence electrons", "•", "A <b>Lewis dot symbol</b> shows only the valence electrons as dots around the element symbol. Nitrogen has 5 valence electrons, so 5 dots."],
    ["Place one at a time", "4️⃣", "Put one dot on each of the four sides (top, right, bottom, left). After 4, start pairing. Nitrogen: 3 single dots and 1 pair."],
    ["Unpaired dots make bonds", "🔗", "The <b>unpaired</b> dots are the ones that can be shared. Nitrogen has 3 unpaired, so it forms 3 bonds. Oxygen has 2, fluorine has 1."]
  ], ["Dots stand for valence electrons only.", "Spread the dots out one per side first. Pair up only after four.", "Example: chlorine has 7 dots: 4 singles and then 3 pairs up, leaving 1 unpaired. Now try yours."], [
    dotQ, dotQ, dotQ, dotQ,
    ["The dots in a Lewis dot symbol show the...", "Valence electrons", "Neutrons", "Protons"],
    ["How many bonds does an atom with 3 unpaired dots usually form?", "3", "6", "1"],
    ["Which atom has the most unpaired dots?", "Carbon (4)", "Oxygen (2)", "Fluorine (1)"]
  ]));

  const chgQ = () => {
    const E = [["Li", 1], ["Na", 1], ["K", 1], ["Mg", 2], ["Ca", 2], ["Al", 3], ["O", -2], ["S", -2], ["F", -1], ["Cl", -1], ["Br", -1], ["N", -3]];
    const [s, c] = pick(E), wr = others(["+", "2+", "3+", "-", "2-", "3-"], cs(c), 3);
    if (Math.random() < 0.7) return { text: `Which is the ion most likely formed by <b>${s}</b>?`, choices: shuf([cs(c), ...wr].map(x => ionS(s, x))), answer: ionS(s, cs(c)), visual: "🔋",
      hints: [c > 0 ? "Metals lose electrons." : "Non-metals gain electrons.", "Check the valence electrons: atoms lose or gain to get a full outer shell of 8 (or 2).", "Example: phosphorus has 5 valence electrons, gains 3 to reach 8, and becomes P³⁻. Now do yours."] };
    const ng = { Li: "helium", Na: "neon", K: "argon", Mg: "neon", Ca: "argon", Al: "neon", O: "neon", S: "argon", F: "neon", Cl: "argon", Br: "krypton", N: "neon" }[s];
    return { text: `The ${ionS(s, cs(c))} ion has the same electron arrangement as which noble gas?`, choices: shuf(["helium", "neon", "argon", "krypton"]), answer: ng, visual: "🔋",
      hints: ["Work out the number of electrons in the ion first (atomic number − charge).", "Match that number to a noble gas: He has 2, Ne has 10, Ar has 18, Kr has 36.", "Example: P³⁻ has 15 + 3 = 18 electrons, which you can match to the list above. Now do yours."] };
  };
  a.push(les("The octet rule and ion charges", [
    ["Eight is great", "8️⃣", "Atoms are most stable with a <b>full outer shell</b>, usually 8 electrons (the <b>octet rule</b>). They gain, lose or share electrons to get there."],
    ["Predict the charge", "🔮", "Group 1 loses 1 → <b>+1</b>. Group 2 loses 2 → <b>+2</b>. Group 13 loses 3 → <b>+3</b>. Group 15 gains 3 → <b>−3</b>. Group 16 gains 2 → <b>−2</b>. Group 17 gains 1 → <b>−1</b>."],
    ["Isoelectronic", "👯", "An ion with the same electrons as a noble gas is stable. S²⁻, Cl⁻, K⁺ and Ca²⁺ all have 18 electrons, like argon."]
  ], ["Find the group number first, then think: lose or gain?", "Metals lose electrons (positive ions). Non-metals gain electrons (negative ions) until they have 8.", "Example: Al (group 13) loses 3 electrons to become Al³⁺. Now try yours."], [
    chgQ, chgQ, chgQ, chgQ, chgQ,
    ["Atoms react to achieve a...", "Full outer shell", "Larger nucleus", "Lower mass"],
    ["Which group forms 2+ ions?", "Group 2", "Group 17", "Group 1"]
  ]));

  const FORMS = [["NaCl", "Na", 1, "Cl", 1], ["MgO", "Mg", 2, "O", 2], ["MgCl2", "Mg", 2, "Cl", 1], ["Na2O", "Na", 1, "O", 2], ["Al2O3", "Al", 3, "O", 2], ["AlCl3", "Al", 3, "Cl", 1], ["CaCl2", "Ca", 2, "Cl", 1], ["Mg3N2", "Mg", 2, "N", 3], ["K2S", "K", 1, "S", 2], ["AlN", "Al", 3, "N", 3], ["Ca3N2", "Ca", 2, "N", 3], ["Li2O", "Li", 1, "O", 2], ["CaO", "Ca", 2, "O", 2]];
  const trQ = () => {
    const [f, m, mc, n, nc] = pick(FORMS), tot = lcm(mc, nc), t = ri(0, 1);
    if (t === 0) return num(`Metal atoms give electrons to non-metal atoms to form <b>${fmt(f)}</b>. Each ${m} atom loses ${mc} and each ${n} atom gains ${nc}. How many electrons are transferred altogether in one formula unit?`, tot,
      ["The electrons lost by the metal must equal the electrons gained by the non-metal.", "Find the smallest number that both the lost and the gained amounts divide into (their lowest common multiple).", "Example: Na₂S: Na loses 1 each, S gains 2, so 2 Na give 2 electrons to 1 S. Total 2. Now do yours."], "🔄");
    return num(`In <b>${fmt(f)}</b> the metal ion has a charge of ${mc}+ and the non-metal ion has ${nc}−. How many <b>${m}</b> ions are needed in one formula unit?`, tot / mc,
      ["Total positive charge must cancel total negative charge.", "Find the lowest common multiple of the two charges, then divide it by the metal's charge.", "Example: for Ba²⁺ and Br⁻, the common multiple is 2, so 2 ÷ 2 = 1 Ba ion. Now do yours."], "🔄");
  };
  a.push(les("Ionic bonding: transferring electrons", [
    ["Give and take", "🔄", "In <b>ionic bonding</b> a metal atom <b>gives</b> electrons to a non-metal atom. This makes a positive ion and a negative ion that attract each other."],
    ["Balance the charge", "⚖️", "The electrons lost must equal the electrons gained. Magnesium loses 2; each chlorine gains 1; so we need <b>2 Cl</b>: MgCl<sub>2</sub>."],
    ["Total transfer", "🔢", "For Al<sub>2</sub>O<sub>3</sub>: 2 Al lose 3 each = 6 electrons, and 3 O gain 2 each = 6. The total transfer is <b>6</b>, the lowest common multiple of 3 and 2."],
    ["A lattice", "🧊", "Ionic compounds form a giant lattice of alternating ions. They have high melting points and conduct electricity when melted or dissolved."]
  ], ["Lost electrons = gained electrons.", "Use the lowest common multiple of the two charges.", "Example: for Ca²⁺ and F⁻ the common multiple of 2 and 1 is 2, so 2 electrons move and we need 2 F. Now try yours."], [
    trQ, trQ, trQ, trQ,
    ["In ionic bonding electrons are...", "Transferred from a metal to a non-metal", "Shared equally", "Created"],
    ["Ionic compounds conduct electricity when...", "Melted or dissolved", "Solid", "Cold"],
    ["Ionic compounds have high melting points because...", "Strong attractions hold the ions in a lattice", "Atoms share electrons", "They are gases"]
  ]));

  const bondItems = [
    ["How many shared pairs of electrons are in one molecule of <b>H₂</b>?", 1], ["How many shared pairs of electrons are in one molecule of <b>O₂</b> (a double bond)?", 2],
    ["How many shared pairs of electrons are in one molecule of <b>N₂</b> (a triple bond)?", 3], ["How many shared pairs are in one molecule of <b>methane, CH₄</b>?", 4],
    ["How many shared pairs are in one molecule of <b>ammonia, NH₃</b>?", 3], ["How many shared pairs are in one molecule of <b>water, H₂O</b>?", 2],
    ["How many shared pairs are in one molecule of <b>CO₂</b> (two C=O double bonds)?", 4], ["How many shared pairs are in <b>HCl</b>?", 1],
    ["How many lone pairs are on the oxygen in <b>H₂O</b>?", 2], ["How many lone pairs are on the nitrogen in <b>NH₃</b>?", 1], ["How many lone pairs are on the chlorine in <b>HCl</b>?", 3],
    ["How many lone pairs are on <b>each</b> oxygen in <b>CO₂</b> (O=C=O)?", 2]
  ];
  a.push(les("Covalent bonds: shared pairs", [
    ["Sharing", "🤝", "In a <b>covalent bond</b>, two non-metal atoms <b>share</b> electrons. Each shared pair is one bond, drawn as a line."],
    ["Single, double, triple", "➖", "One shared pair = single bond, two = double bond (O=O), three = triple bond (N≡N). Counting lines counts shared pairs."],
    ["Lone pairs", "👥", "Valence electrons that are <b>not</b> shared form <b>lone pairs</b>. Water: oxygen has 6 valence electrons, uses 2 to bond, leaving 4 = <b>2 lone pairs</b>."]
  ], ["Count the lines drawn between atoms, or count unshared valence electrons.", "Every line is one shared pair. Lone pairs = (valence electrons − bonds) ÷ 2.", "Example: in HF, one shared pair; fluorine has 7 valence electrons, 1 used, 6 left = 3 lone pairs. Now try yours."], [
    ...bondItems.map(([t, n]) => () => num(t, n,
      ["Draw the Lewis structure: atoms joined by lines (shared pairs) with dots for the lone pairs.", "Each line is a shared pair. For lone pairs, take the atom's valence electrons, subtract those used in bonds, and divide by 2.", "Example: in H₂S, S forms 2 single bonds; S has 6 valence electrons, 2 used, 4 left = 2 lone pairs. Now do yours."], "🤝")),
    ["Which type of bond shares electrons between two non-metals?", "Covalent", "Ionic", "Metallic"]
  ]));

  const VALEN = { H: 1, C: 4, N: 5, O: 6, F: 7, Cl: 7, S: 6, P: 5, Br: 7, Si: 4 };
  const MOLS = [["H₂O", { H: 2, O: 1 }, 0], ["CO₂", { C: 1, O: 2 }, 0], ["NH₃", { N: 1, H: 3 }, 0], ["CH₄", { C: 1, H: 4 }, 0], ["N₂", { N: 2 }, 0], ["O₂", { O: 2 }, 0], ["Cl₂", { Cl: 2 }, 0], ["HCl", { H: 1, Cl: 1 }, 0], ["CCl₄", { C: 1, Cl: 4 }, 0], ["H₂S", { H: 2, S: 1 }, 0], ["PH₃", { P: 1, H: 3 }, 0], ["SO₂", { S: 1, O: 2 }, 0], ["NH₄⁺", { N: 1, H: 4 }, 1], ["OH⁻", { O: 1, H: 1 }, -1], ["NO₃⁻", { N: 1, O: 3 }, -1], ["SO₄²⁻", { S: 1, O: 4 }, -2], ["CO₃²⁻", { C: 1, O: 3 }, -2], ["H₃O⁺", { H: 3, O: 1 }, 1], ["CH₃OH", { C: 1, H: 4, O: 1 }, 0]];
  const totVal = () => {
    const [f, comp, ch] = pick(MOLS), tot = Object.entries(comp).reduce((t, [e, n]) => t + VALEN[e] * n, 0) - ch;
    const parts = Object.entries(comp).map(([e, n]) => `${n} × ${e} (${VALEN[e]})`).join(" + ");
    return num(`Count the <b>total valence electrons</b> available for the Lewis structure of <b>${f}</b>. (Valence electrons: ${Object.keys(comp).map(e => e + " = " + VALEN[e]).join(", ")}.)`, tot,
      ["Add up the valence electrons of every atom in the formula.", ch > 0 ? "For a positive ion, take away one electron for each + in the charge." : ch < 0 ? "For a negative ion, add one electron for each − in the charge." : "This is a neutral molecule, so no charge adjustment is needed.", "Example: for CH₃Cl, C(4) + 3 × H(1) + Cl(7) = 14 electrons. Now do yours."], "🧮");
  };
  a.push(les("Total valence electrons for Lewis structures", [
    ["First step", "🧮", "To draw a Lewis structure, first count the <b>total valence electrons</b>. Add up the valence electrons of each atom."],
    ["Water", "💧", "H₂O: 2 × H (1) + O (6) = <b>8 electrons</b>. These 8 will make 4 pairs: 2 bonding pairs and 2 lone pairs."],
    ["Charged ions", "⚡", "For a <b>negative</b> ion <b>add</b> electrons: SO₄²⁻ is 6 + 4×6 + 2 = <b>32</b>. For a <b>positive</b> ion <b>subtract</b>: NH₄⁺ is 5 + 4 − 1 = <b>8</b>."]
  ], ["Add up the valence electrons of each atom, one by one.", "Then adjust for any charge on the ion: negative adds, positive subtracts.", "Example: BrO₃⁻ is 7 + 3 × 6 + 1 = 26. Now count yours."], [
    totVal, totVal, totVal, totVal, totVal, totVal,
    ["For a 2− ion, to the total valence electrons you...", "Add 2", "Subtract 2", "Do nothing"]
  ]));

  const BT = [["NaCl", "Ionic"], ["MgO", "Ionic"], ["KBr", "Ionic"], ["CaF₂", "Ionic"], ["Li₂O", "Ionic"], ["Na₂S", "Ionic"], ["CO₂", "Covalent"], ["H₂O", "Covalent"], ["CH₄", "Covalent"], ["NH₃", "Covalent"], ["HCl", "Covalent"], ["SO₂", "Covalent"], ["Cl₂", "Covalent"], ["Fe", "Metallic"], ["Cu", "Metallic"], ["brass (copper and zinc)", "Metallic"], ["Al", "Metallic"]];
  a.push(les("Ionic, covalent or metallic?", [
    ["Three kinds of bonding", "🔗", "<b>Ionic</b>: metal + non-metal, electrons transferred. <b>Covalent</b>: non-metal + non-metal, electrons shared. <b>Metallic</b>: metal atoms in a sea of free electrons."],
    ["Properties", "🔬", "Ionic: high melting point, conducts when molten. Simple covalent: low melting point, no conduction. Metallic: conducts as a solid and is malleable."],
    ["Quick test", "✅", "Look at the elements. Metal + non-metal = ionic. Two non-metals = covalent. Only metals = metallic."]
  ], ["Are the elements metals, non-metals, or both?", "Metal + non-metal means transfer; two non-metals means sharing; metals only means a sea of electrons.", "Example: CaO is a metal with a non-metal, so it is ionic. Now try yours."], [
    ...BT.map(([f, t]) => () => mcq(`What type of bonding holds <b>${f}</b> together?`, t, ["Ionic", "Covalent", "Metallic"].filter(x => x !== t),
      ["Look at the elements. Are they metals, non-metals or both?", "Metal + non-metal gives one type; two non-metals gives another; only metals gives the third.", "Example: ZnO is a metal with a non-metal, so it is ionic. Now do yours."], "🔗")),
    ["A solid melts at 800 °C and conducts only when molten. It is most likely...", "Ionic", "A simple covalent molecule", "A metal"],
    ["A gas at room temperature that does not conduct electricity is most likely...", "Simple covalent", "Ionic", "Metallic"],
    ["A shiny solid that conducts electricity and can be hammered flat is...", "Metallic", "Ionic", "Simple covalent"]
  ]));

  const EN = { H: 2.1, C: 2.5, N: 3.0, O: 3.5, F: 4.0, Cl: 3.0, Br: 2.8, S: 2.5, Na: 0.9, K: 0.8, Mg: 1.2, Ca: 1.0, Li: 1.0, Al: 1.5 };
  const ENP = [["H", "Cl"], ["O", "H"], ["N", "H"], ["C", "O"], ["C", "Cl"], ["N", "O"], ["Na", "Cl"], ["Mg", "O"], ["K", "Br"], ["Ca", "Cl"], ["Li", "F"], ["Cl", "F"], ["S", "O"], ["Cl", "Cl"], ["O", "O"], ["H", "H"], ["N", "N"], ["Br", "Br"]];
  const enDiff = (x, y) => r1(Math.abs(EN[x] - EN[y]));
  const enQ = () => {
    const [x, y] = pick(ENP), d = enDiff(x, y), t = ri(0, 2);
    const cls = d < 0.4 ? "Nonpolar covalent" : d <= 1.7 ? "Polar covalent" : "Ionic";
    if (t === 0) return num(`Electronegativity values: ${x} = ${EN[x]}, ${y} = ${EN[y]}. What is the electronegativity <b>difference</b> between ${x} and ${y}?`, d,
      ["Find the bigger value and the smaller value.", "Subtract the smaller from the bigger. The difference is never negative.", "Example: Mg = 1.2 and S = 2.5 gives 2.5 − 1.2 = 1.3. Now do yours."], "🧲");
    if (t === 1) return mcq(`Electronegativity: ${x} = ${EN[x]}, ${y} = ${EN[y]}. A ${x}–${y} bond is... <br><small>(difference under 0.4 = nonpolar covalent, 0.4 to 1.7 = polar covalent, over 1.7 = ionic)</small>`, cls, ["Nonpolar covalent", "Polar covalent", "Ionic"].filter(c => c !== cls),
      ["Work out the difference first.", "Compare the difference with the boundaries 0.4 and 1.7 in the question.", "Example: a difference of 1.3 is polar covalent, 0.2 is nonpolar covalent and 2.3 is ionic. Now do yours."], "🧲");
    if (x === y) return mcq(`In a ${x}–${y} bond, which atom pulls the shared electrons more strongly?`, "Neither, they pull equally", [x + " pulls more", "It changes from moment to moment"],
      ["Both atoms are the same element.", "Same atoms have the same pull on the electrons.", "Example: in H–H the electrons are shared equally. Now do yours."], "🧲");
    const hi = EN[x] > EN[y] ? x : y, lo = hi === x ? y : x;
    return mcq(`Electronegativity: ${x} = ${EN[x]}, ${y} = ${EN[y]}. In a ${x}–${y} bond, which atom becomes <b>partly negative (δ−)</b>?`, hi, [lo, "Neither"],
      ["Electrons spend more time near the atom that attracts them more.", "More electronegative means a stronger pull on the shared electrons, so that end is negative.", "Example: in Li–Br, Br (2.8) beats Li (1.0), so Br is the δ− end. Now do yours."], "🧲");
  };
  a.push(les("Electronegativity and polar bonds", [
    ["Tug of war", "🧲", "<b>Electronegativity</b> measures how strongly an atom attracts shared electrons. Fluorine is highest (4.0). It rises across a period and falls down a group."],
    ["Use the difference", "➖", "Difference < 0.4: <b>nonpolar covalent</b>. 0.4 to 1.7: <b>polar covalent</b>. Over 1.7: <b>ionic</b>. Example: H (2.1) and Cl (3.0): 0.9, polar."],
    ["Partial charges", "δ", "In a polar bond the more electronegative atom is <b>δ−</b> and the other is <b>δ+</b>. In H–Cl, Cl is δ− and H is δ+."]
  ], ["Find the electronegativity difference between the two atoms.", "Bigger difference means more uneven sharing. The atom with the higher value gets the electrons for longer.", "Example: C (2.5) and O (3.5) differ by 1.0, so the bond is polar with O as δ−. Now try yours."], [
    enQ, enQ, enQ, enQ, enQ,
    ["Which element has the highest electronegativity?", "Fluorine", "Sodium", "Carbon"],
    ["Electronegativity generally ... across a period from left to right.", "Increases", "Decreases", "Stays the same"]
  ]));

  const SIZEP = [["Na", "Na⁺", "Na"], ["Cl", "Cl⁻", "Cl⁻"], ["Mg", "Mg²⁺", "Mg"], ["S", "S²⁻", "S²⁻"], ["K", "K⁺", "K"], ["O", "O²⁻", "O²⁻"], ["Al", "Al³⁺", "Al"], ["Br", "Br⁻", "Br⁻"]];
  const sizeQ = () => {
    const [at, ion, big] = pick(SIZEP);
    return mcq(`Which is <b>larger</b>, a ${at} atom or its ion ${ion}?`, big === at ? `The ${at} atom` : `The ${ion} ion`, [big === at ? `The ${ion} ion` : `The ${at} atom`, "They are the same size"],
      ["Think about whether electrons were lost or gained.", "Losing electrons removes a whole shell (smaller); gaining adds repulsion between electrons (bigger).", "Example: Li loses an electron to become Li⁺, which is smaller than the Li atom. Now do yours."], "📏");
  };
  const trendPairs = [["Na", "K", "K"], ["Mg", "Ca", "Ca"], ["Li", "F", "Li"], ["Na", "Cl", "Na"], ["C", "O", "C"], ["Mg", "S", "Mg"], ["Al", "P", "Al"], ["Cl", "Br", "Br"]];
  const trendQ = () => { const [x, y, big] = pick(trendPairs); return mcq(`Which atom has the <b>larger atomic radius</b>, ${x} or ${y}?`, big, [big === x ? y : x, "They are equal"],
    ["Check whether the two atoms are in the same period or the same group.", "Down a group, atoms get bigger (more shells). Across a period, atoms get smaller (more protons pull the shell in).", "Example: Li and Cs are in the same group; Cs is lower so it is bigger. Now do yours."], "📏"); };
  a.push(les("Sizes of atoms and ions", [
    ["Down a group", "⬇️", "Atoms get <b>bigger</b> down a group because each period adds another electron shell. K is bigger than Na."],
    ["Across a period", "➡️", "Atoms get <b>smaller</b> across a period. More protons in the nucleus pull the same shell in closer. Na is bigger than Cl."],
    ["Ions", "🔵", "A <b>positive ion is smaller</b> than its atom (it loses its outer shell). A <b>negative ion is larger</b> than its atom (more electrons repel)."],
    ["Same electrons, different size", "👯", "For ions with the same number of electrons, <b>more protons means smaller</b>. O²⁻, F⁻, Na⁺, Mg²⁺ all have 10 electrons, so O²⁻ is largest and Mg²⁺ smallest."]
  ], ["Decide: same group, same period, or atom versus ion?", "More shells means bigger. More protons pulling on the same shell means smaller.", "Example: F⁻ is larger than F, because it has gained an electron. Now try yours."], [
    sizeQ, sizeQ, trendQ, trendQ, trendQ,
    ["Among O²⁻, F⁻, Na⁺ and Mg²⁺ (all 10 electrons), which is the smallest?", "Mg²⁺", "O²⁻", "F⁻"],
    ["Among O²⁻, F⁻, Na⁺ and Mg²⁺ (all 10 electrons), which is the largest?", "O²⁻", "Mg²⁺", "Na⁺"],
    ["Why is a positive ion smaller than its atom?", "It loses its outer shell of electrons", "It gains protons", "It gains neutrons"]
  ]));

  const CNT = ["Ca(OH)2", "Al2(SO4)3", "Mg(NO3)2", "(NH4)2SO4", "Fe2(SO4)3", "Ca3(PO4)2", "Al(OH)3", "Cu(NO3)2", "(NH4)3PO4", "Mg3(PO4)2"];
  const cntQ = () => {
    const f = pick(CNT), c = ri(2, 4), at = atoms(f), el = pick(Object.keys(at));
    return num(`How many <b>${el}</b> atoms are there in <b>${c}${fmt(f)}</b>?`, c * at[el],
      ["The big number in front multiplies everything in the formula.", "First count the atoms in one unit (a number right after brackets multiplies everything inside them), then multiply by the big number.", "Example: in 2Mg(OH)₂ there are 2 O in one unit, so 2 × 2 = 4 O atoms. Now do yours."], "🔢");
  };
  a.push(les("Counting atoms with brackets and coefficients", [
    ["Two kinds of numbers", "🔢", "A <b>subscript</b> (small, below) is part of the formula. A <b>coefficient</b> (big, in front) multiplies the <b>whole</b> formula."],
    ["Brackets", "( )", "A number after a bracket multiplies <b>everything inside it</b>. In Ca(OH)₂: O = 2 and H = 2, Ca = 1."],
    ["Put them together", "🧮", "In <b>3Ca(OH)₂</b>: O = 3 × 2 = <b>6</b>, H = 3 × 2 = 6, Ca = 3. In Al₂(SO₄)₃: Al = 2, S = 3, O = 3 × 4 = <b>12</b>."]
  ], ["Count the atoms inside one formula first.", "Brackets multiply what is inside; the big number in front multiplies the whole thing.", "Example: 2Ba(OH)₂ has 2 × 2 = 4 H and 2 × 2 = 4 O. Now count yours."], [
    cntQ, cntQ, cntQ, cntQ, cntQ, cntQ,
    ["In 4H₂O, how many hydrogen atoms are there?", "8", "4", "2"]
  ]));

  const BAL = [
    [[[1, "N2"], [3, "H2"]], [[2, "NH3"]]], [[[2, "H2"], [1, "O2"]], [[2, "H2O"]]], [[[1, "CH4"], [2, "O2"]], [[1, "CO2"], [2, "H2O"]]],
    [[[1, "C3H8"], [5, "O2"]], [[3, "CO2"], [4, "H2O"]]], [[[4, "Fe"], [3, "O2"]], [[2, "Fe2O3"]]], [[[2, "Al"], [3, "Cl2"]], [[2, "AlCl3"]]],
    [[[2, "Na"], [2, "H2O"]], [[2, "NaOH"], [1, "H2"]]], [[[2, "KClO3"]], [[2, "KCl"], [3, "O2"]]], [[[2, "C2H6"], [7, "O2"]], [[4, "CO2"], [6, "H2O"]]],
    [[[1, "Fe2O3"], [3, "CO"]], [[2, "Fe"], [3, "CO2"]]], [[[2, "H2O2"]], [[2, "H2O"], [1, "O2"]]], [[[4, "NH3"], [5, "O2"]], [[4, "NO"], [6, "H2O"]]],
    [[[1, "C2H4"], [3, "O2"]], [[2, "CO2"], [2, "H2O"]]], [[[1, "Al2(SO4)3"], [6, "NaOH"]], [[2, "Al(OH)3"], [3, "Na2SO4"]]], [[[2, "Mg"], [1, "O2"]], [[2, "MgO"]]]
  ];
  const balQ = () => {
    const eq = pick(BAL), all = [...eq[0], ...eq[1]], cand = all.filter(x => x[0] > 1), tgt = pick(cand);
    const show = (side) => side.map(x => (x === tgt ? "<b>?</b>" : (x[0] === 1 ? "" : x[0])) + fmt(x[1])).join(" + ");
    return num(`The balanced equation is shown with one missing coefficient: <br><span style="font-size:1.1em">${show(eq[0])} → ${show(eq[1])}</span><br>What number goes in place of <b>?</b>? (Coefficients of 1 are not written.)`, tgt[0],
      ["Count each type of atom on the side where nothing is missing.", "The same number of each atom must be on both sides. Pick one element that only appears in one substance on each side and match it first.", "Example: H₂ + Cl₂ → ?HCl: 2 H on the left, so we need 2 HCl to have 2 H on the right. Now do yours."], "⚖️");
  };
  a.push(les("Balancing equations: finding coefficients", [
    ["Atoms are never lost", "⚖️", "A chemical equation must show the same number of each atom on both sides. We change <b>coefficients</b> (big numbers in front), never the subscripts."],
    ["A method", "🪜", "1) Count atoms of each element on each side. 2) Start with the element in the fewest substances. 3) Leave O and H (or any lone element) until last. 4) Re-count to check."],
    ["Worked example", "✏️", "C₃H₈ + ?O₂ → 3CO₂ + 4H₂O. Count O on the right: 3 × 2 + 4 × 1 = <b>10</b>. O₂ gives 2 each, so 10 ÷ 2 = <b>5 O₂</b>."]
  ], ["Count how many of each atom you need on the side that is complete.", "Make the side with the missing number match those counts.", "Example: 2Na + ?Cl₂ → 2NaCl: 2 Cl on the right so 1 Cl₂ is needed (written without a number). Now find yours."], [
    balQ, balQ, balQ, balQ, balQ, balQ,
    ["When balancing, you change the...", "Coefficients", "Subscripts", "Element symbols"],
    ["Why must an equation be balanced?", "Atoms are not created or destroyed", "To make it look neat", "To make it smaller"]
  ]));

  const RT = [["2H₂ + O₂ → 2H₂O", "Synthesis"], ["N₂ + 3H₂ → 2NH₃", "Synthesis"], ["2Na + Cl₂ → 2NaCl", "Synthesis"], ["CaCO₃ → CaO + CO₂", "Decomposition"], ["2H₂O → 2H₂ + O₂", "Decomposition"], ["2KClO₃ → 2KCl + 3O₂", "Decomposition"],
    ["Zn + CuSO₄ → ZnSO₄ + Cu", "Single replacement"], ["Mg + 2HCl → MgCl₂ + H₂", "Single replacement"], ["Fe + CuSO₄ → FeSO₄ + Cu", "Single replacement"],
    ["AgNO₃ + NaCl → AgCl + Na​NO₃", "Double replacement"], ["BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl", "Double replacement"], ["HCl + NaOH → NaCl + H₂O", "Double replacement"],
    ["CH₄ + 2O₂ → CO₂ + 2H₂O", "Combustion"], ["C₃H₈ + 5O₂ → 3CO₂ + 4H₂O", "Combustion"], ["2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O", "Combustion"]];
  a.push(les("Five types of reaction", [
    ["Synthesis and decomposition", "🧩", "<b>Synthesis</b>: A + B → AB (two things join). <b>Decomposition</b>: AB → A + B (one thing splits)."],
    ["Replacement", "🔁", "<b>Single replacement</b>: A + BC → AC + B (one element swaps in). <b>Double replacement</b>: AB + CD → AD + CB (two compounds swap partners)."],
    ["Combustion", "🔥", "<b>Combustion</b>: a fuel reacts with oxygen and gives out heat. A hydrocarbon burning completely makes CO₂ and H₂O."],
    ["Spot the pattern", "🔎", "Count the reactants and products. One product from two reactants? Synthesis. Oxygen as a reactant with a carbon fuel? Combustion."]
  ], ["Count how many substances are on each side.", "Look for an element on its own, or oxygen reacting with a fuel.", "Example: Cl₂ + 2KBr → 2KCl + Br₂ has a lone element swapping into a compound: single replacement. Now do yours."], [
    ...RT.map(([e, t]) => () => mcq(`What type of reaction is this? <br><span style="font-size:1.1em">${e}</span>`, t, others(["Synthesis", "Decomposition", "Single replacement", "Double replacement", "Combustion"], t, 3),
      ["Count how many substances are reactants and how many are products.", "Look for an element on its own, oxygen with a fuel, or two compounds swapping partners.", "Example: 2Mg + O₂ → 2MgO has two reactants forming one product, a synthesis (but a different pattern to yours). Now do yours."], "🔥"))
  ]));

  a.push(les("Predicting the products", [
    ["Acid + metal", "🧪", "<b>Acid + metal → salt + hydrogen</b>. Magnesium + hydrochloric acid → magnesium chloride + hydrogen gas."],
    ["Acid + base and carbonate", "💧", "<b>Acid + base → salt + water</b>. <b>Acid + carbonate → salt + water + carbon dioxide</b> (the fizz)."],
    ["Burning", "🔥", "Hydrocarbon + oxygen → <b>carbon dioxide + water</b> in plenty of oxygen. With too little oxygen, you also get carbon monoxide or soot (incomplete combustion)."],
    ["Name the salt", "🏷️", "Salt name = metal from the base or metal + the acid's ending. Hydrochloric → chloride, sulfuric → sulfate, nitric → nitrate."]
  ], ["Identify what kind of reactants you have: acid, base, metal, carbonate or fuel.", "Each type has a fixed pattern of products.", "Example: zinc oxide + sulfuric acid gives a salt called zinc sulfate and water. Now try yours."], [
    ["Methane burns completely in air. The products are...", "Carbon dioxide and water", "Carbon monoxide and hydrogen", "Methane and oxygen"],
    ["Magnesium reacts with hydrochloric acid. The gas given off is...", "Hydrogen", "Oxygen", "Carbon dioxide"],
    ["Calcium carbonate reacts with hydrochloric acid. The gas that fizzes off is...", "Carbon dioxide", "Hydrogen", "Oxygen"],
    ["What salt forms when zinc reacts with sulfuric acid?", "Zinc sulfate", "Zinc chloride", "Zinc nitrate"],
    ["What salt forms from sodium hydroxide and hydrochloric acid?", "Sodium chloride", "Sodium sulfate", "Sodium nitrate"],
    ["What salt forms from potassium hydroxide and nitric acid?", "Potassium nitrate", "Potassium chloride", "Potassium sulfate"],
    ["Acid + base always makes a salt and...", "Water", "Hydrogen", "Carbon dioxide"],
    ["Burning a fuel with too little oxygen can make poisonous...", "Carbon monoxide", "Hydrogen", "Helium"],
    ["What salt forms when copper(II) oxide reacts with sulfuric acid?", "Copper(II) sulfate", "Copper(II) chloride", "Copper(II) nitrate"]
  ]));

  a.push(mix("Mixed practice", at(a, [0, 1, 3, 5, 6, 8, 9, 10, 12, 14, 15, 16, 17])));
  a.push(mix("Level 19 Challenge", at(a, [1, 4, 5, 7, 8, 11, 12, 13, 14, 15, 16, 17])));

  // ================= LEVEL 20 =================
  const b = [];
  // species: [formula, coefficient, molar mass]; reactants first (nr of them)
  const RX = [
    { nr: 2, sp: [["H2", 2, 2], ["O2", 1, 32], ["H2O", 2, 18]] },
    { nr: 2, sp: [["CH4", 1, 16], ["O2", 2, 32], ["CO2", 1, 44], ["H2O", 2, 18]] },
    { nr: 2, sp: [["Mg", 2, 24], ["O2", 1, 32], ["MgO", 2, 40]] },
    { nr: 1, sp: [["CaCO3", 1, 100], ["CaO", 1, 56], ["CO2", 1, 44]] },
    { nr: 2, sp: [["N2", 1, 28], ["H2", 3, 2], ["NH3", 2, 17]] },
    { nr: 1, sp: [["H2O", 2, 18], ["H2", 2, 2], ["O2", 1, 32]] },
    { nr: 2, sp: [["Al", 4, 27], ["O2", 3, 32], ["Al2O3", 2, 102]] },
    { nr: 2, sp: [["C", 1, 12], ["O2", 1, 32], ["CO2", 1, 44]] },
    { nr: 2, sp: [["Na", 2, 23], ["H2O", 2, 18], ["NaOH", 2, 40], ["H2", 1, 2]] },
    { nr: 2, sp: [["Fe2O3", 1, 160], ["CO", 3, 28], ["Fe", 2, 56], ["CO2", 3, 44]] },
    { nr: 2, sp: [["CuO", 1, 80], ["H2", 1, 2], ["Cu", 1, 64], ["H2O", 1, 18]] }
  ];
  const eqStr = rx => { const L = rx.sp.slice(0, rx.nr), R = rx.sp.slice(rx.nr); const f = s => s.map(x => (x[1] === 1 ? "" : x[1]) + fmt(x[0])).join(" + "); return f(L) + " → " + f(R); };
  const mmNote = (...sp) => `(Molar masses: ${sp.map(s => fmt(s[0]) + " = " + s[2]).join(", ")} g/mol.)`;

  const atomMolQ = () => {
    const D = [["H2O", "H", "water"], ["CO2", "O", "carbon dioxide"], ["NH3", "H", "ammonia"], ["CH4", "H", "methane"], ["Al2O3", "O", "aluminium oxide"], ["CaCO3", "O", "calcium carbonate"], ["Ca(OH)2", "O", "calcium hydroxide"], ["MgSO4", "O", "magnesium sulfate"], ["Na2CO3", "Na", "sodium carbonate"], ["Fe2O3", "Fe", "iron(III) oxide"]];
    const [f, el, nm] = pick(D), M = mr(f), k = pick([1, 2, 3, 4, 5]), n = atoms(f)[el];
    if (Math.random() < 0.5) return num(`How many moles of <b>${el}</b> atoms are in <b>${k} mol</b> of ${nm}, ${fmt(f)}?`, k * n,
      ["Use the formula: the small number after the symbol is how many of those atoms there are in one unit.", "Moles of atoms = moles of compound × number of that atom in the formula.", "Example: 3 mol of PH₃ contains 3 × 3 = 9 mol of H atoms. Now do yours."], "⚛️");
    return num(`How many moles of <b>${el}</b> atoms are in <b>${k * M} g</b> of ${nm}, ${fmt(f)}? ${arNote(f)}`, k * n,
      ["Step 1: change grams of compound into moles of compound.", "Step 2: multiply by the number of that atom in the formula. Moles = mass ÷ molar mass.", "Example: 34 g of H₂S (34 g/mol) is 1 mol, which contains 2 mol H. Now do yours."], "⚛️");
  };
  b.push(les("Moles of atoms inside compounds", [
    ["Compounds are bundles", "📦", "One mole of a compound contains <b>one mole of each formula unit</b>, so the atom counts come from the subscripts. 1 mol H₂O holds 2 mol H and 1 mol O."],
    ["Two-step path", "🪜", "Grams → moles of compound (divide by molar mass) → moles of atoms (multiply by the subscript). For 36 g H₂O: 36 ÷ 18 = 2 mol, so H = 2 × 2 = <b>4 mol</b>."],
    ["Brackets", "( )", "In Ca(OH)₂ the bracket multiplies: 1 mol contains 2 mol O and 2 mol H. 3 mol Ca(OH)₂ contains 6 mol O."]
  ], ["Decide what you start with: moles or grams?", "Grams must become moles first, then the subscript scales to atoms.", "Example: 2 mol of CO₂ has 2 × 2 = 4 mol O. Now try yours."], [
    atomMolQ, atomMolQ, atomMolQ, atomMolQ, atomMolQ, atomMolQ,
    ["How many moles of H atoms are in 1 mol of H₂O?", "2", "1", "18"]
  ]));

  const massMassQ = () => {
    const rx = pick(RX), idx = shuf(rx.sp.map((_, i) => i)), A = rx.sp[idx[0]], B = rx.sp[idx[1]], k = pick([1, 2, 3]);
    const given = k * A[1] * A[2], ans = k * B[1] * B[2];
    const exs = [["CaCO₃ → CaO + CO₂", "200 g of CaCO₃ is 200 ÷ 100 = 2 mol; the ratio is 1:1, so 2 mol CO₂ = 2 × 44 = 88 g"], ["2Mg + O₂ → 2MgO", "12 g of Mg is 12 ÷ 24 = 0.5 mol; the ratio is 2:2, so 0.5 mol MgO = 0.5 × 40 = 20 g"]];
    const exOk = exs.filter(e => !e[1].includes("= " + ans + " g") && !(rx.sp[0][0] === "CaCO3" && e === exs[0]) && !(rx.sp[0][0] === "Mg" && e === exs[1])), ex = exOk.length ? exOk[0] : exs[0];
    return num(`<span style="font-size:1.1em">${eqStr(rx)}</span><br>What mass of <b>${fmt(B[0])}</b> is involved when <b>${given} g</b> of <b>${fmt(A[0])}</b> is involved? ${mmNote(A, B)} (Answer in grams.)`, ans,
      ["Plan: grams → moles → use the equation ratio → grams.", "Step 1: moles of the given = mass ÷ molar mass. Step 2: multiply by (coefficient wanted ÷ coefficient given). Step 3: moles × molar mass of the wanted.", `Example: ${ex[0]}: ${ex[1]}. Now do yours.`], "⚗️");
  };
  b.push(les("Mass-to-mass stoichiometry", [
    ["The three steps", "🪜", "To find a mass from a mass: <b>1)</b> mass → moles (÷ molar mass), <b>2)</b> mole ratio from the equation, <b>3)</b> moles → mass (× molar mass)."],
    ["Worked example", "✏️", "2H₂ + O₂ → 2H₂O. How much water from 8 g H₂? 8 ÷ 2 = 4 mol H₂. Ratio 2:2, so 4 mol H₂O. 4 × 18 = <b>72 g</b>."],
    ["The ratio is moles, not grams", "⚠️", "Coefficients compare <b>moles</b>. Never compare grams directly. 2H₂ + O₂: 4 g of H₂ reacts with 32 g of O₂, not with 1 × the mass."],
    ["Check", "✅", "Mass is conserved: the masses on the left add up to the masses on the right. 8 g H₂ + 64 g O₂ = 72 g H₂O."]
  ], ["Use moles as a bridge between two masses.", "Divide by molar mass, apply the ratio from the coefficients, then multiply by the other molar mass.", "Example: 2Mg + O₂ → 2MgO: 48 g Mg = 2 mol Mg → 2 mol MgO → 80 g. Now try yours."], [
    massMassQ, massMassQ, massMassQ, massMassQ, massMassQ, massMassQ, massMassQ,
    ["In stoichiometry, the coefficients in an equation compare...", "Moles", "Grams", "Litres only"]
  ]));

  const limQ = () => {
    const rx = pick(RX.filter(r => r.nr === 2)), L = ri(0, 1), E = 1 - L, k = ri(1, 4), e = ri(1, 3);
    const nL = k * rx.sp[L][1], nE = k * rx.sp[E][1] + e;
    const n = [0, 0]; n[L] = nL; n[E] = nE;
    const given = `<b>${n[0]} mol</b> of ${fmt(rx.sp[0][0])} and <b>${n[1]} mol</b> of ${fmt(rx.sp[1][0])}`;
    const prod = pick(rx.sp.slice(2)), t = ri(0, 2);
    const head = `<span style="font-size:1.1em">${eqStr(rx)}</span><br>`;
    if (t === 0) return mcq(`${head}You mix ${given}. Which reactant is the <b>limiting reactant</b>?`, fmt(rx.sp[L][0]), [fmt(rx.sp[E][0]), "Neither, they run out together"],
      ["Divide the moles of each reactant by its coefficient.", "The smaller answer belongs to the reactant that runs out first.", "Example: A + 2B → AB₂ with 3 mol A and 4 mol B: 3 ÷ 1 = 3 and 4 ÷ 2 = 2. B is smaller, so B limits. Now do yours."], "🧱");
    if (t === 1) return num(`${head}You mix ${given}. How many moles of <b>${fmt(prod[0])}</b> can form?`, k * prod[1],
      ["Find which reactant runs out first.", "Divide each reactant's moles by its coefficient. The smaller number is the number of times the equation can run; multiply it by the product's coefficient.", "Example: A + 2B → AB₂ with 3 mol A and 4 mol B: B limits, so the equation runs 2 times, giving 2 mol AB₂. Now do yours."], "🧱");
    return num(`${head}You mix ${given}. How many moles of the <b>excess reactant (${fmt(rx.sp[E][0])})</b> are left over after the reaction finishes?`, e,
      ["First find the limiting reactant.", "Work out how much of the other reactant the limiting one uses (using the ratio) and subtract that from what you had.", "Example: A + 2B → AB₂ with 3 mol A and 4 mol B: B limits and uses 2 mol A, leaving 3 − 2 = 1 mol A. Now do yours."], "🧱");
  };
  b.push(les("Limiting and excess reactants", [
    ["Someone runs out first", "🧱", "A recipe for 2 sandwiches needs 4 slices and 2 cheeses. If you have 10 slices and 3 cheeses, the cheese <b>limits</b> you. In chemistry the <b>limiting reactant</b> is the one used up first."],
    ["Find it", "🔍", "Divide each reactant's moles by its coefficient. The <b>smaller</b> result is the limiting reactant. The product depends only on the limiting reactant."],
    ["Excess", "🧂", "The other reactant is in <b>excess</b>. Some of it is left over. Left over = amount you had − amount that reacted."]
  ], ["Compare the reactants after dividing by their coefficients.", "Smaller quotient = limiting. The product amount follows the limiting reactant.", "Example: N₂ + 3H₂ → 2NH₃ with 2 mol N₂ and 3 mol H₂: 2 ÷ 1 = 2 and 3 ÷ 3 = 1, so H₂ limits. Now try yours."], [
    limQ, limQ, limQ, limQ, limQ, limQ
  ]));

  const yieldQ = () => {
    const rx = pick(RX), A = rx.sp[0], B = rx.sp[rx.sp.length - 1], k = pick([1, 2, 3, 4]);
    const given = k * A[1] * A[2], T = k * B[1] * B[2];
    let pc, act, tries = 0;
    do { pc = pick([25, 50, 60, 75, 80, 90]); act = T * pc / 100; tries++; } while (!Number.isInteger(act) && tries < 40);
    if (!Number.isInteger(act)) { pc = 50; act = T / 2; if (!Number.isInteger(act)) { pc = 100; act = T; } }
    const head = `<span style="font-size:1.1em">${eqStr(rx)}</span><br>`;
    if (Math.random() < 0.5) return num(`${head}A student starts with <b>${given} g</b> of ${fmt(A[0])}. The <b>theoretical yield</b> of ${fmt(B[0])} is what the equation predicts. ${mmNote(A, B)} If the student actually collects <b>${act} g</b>, what is the <b>percent yield</b>?`, pc,
      ["First find the theoretical yield using mass → moles → ratio → mass.", "Then percent yield = actual ÷ theoretical × 100.", "Example: if theory says 50 g and you get 35 g, the percent yield is 35 ÷ 50 × 100 = 70%. Now do yours."], "📉");
    return num(`${head}A student starts with <b>${given} g</b> of ${fmt(A[0])} and the process has a <b>${pc}%</b> yield. ${mmNote(A, B)} How many grams of ${fmt(B[0])} are actually collected?`, act,
      ["Find the theoretical yield first: mass → moles → ratio → mass.", "Then actual = theoretical × percent yield ÷ 100.", "Example: if the theory gives 80 g and the yield is 50%, you collect 40 g. Now do yours."], "📉");
  };
  b.push(les("Yield from a mass: theory to reality", [
    ["Two jobs", "🧩", "Percent yield questions often need two jobs: first the <b>theoretical yield</b> from stoichiometry, then the comparison with what you really got."],
    ["Worked example", "✏️", "CaCO₃ → CaO + CO₂. From 50 g CaCO₃ the theory is 0.5 mol → 0.5 × 56 = <b>28 g CaO</b>. If you collect 21 g, yield = 21 ÷ 28 × 100 = <b>75%</b>."],
    ["Going backwards", "↩️", "With a known percent yield, <b>actual = theoretical × percent ÷ 100</b>. A 50% yield of 28 g is 14 g."]
  ], ["Do the equation calculation first. It is the maximum you could get.", "Compare actual and theoretical; never divide the other way around.", "Example: theoretical 60 g and actual 45 g is 45 ÷ 60 × 100 = 75%. Now try yours."], [
    yieldQ, yieldQ, yieldQ, yieldQ,
    ["Percent yield is calculated as...", "Actual ÷ theoretical × 100", "Theoretical ÷ actual × 100", "Actual − theoretical"],
    ["Which is a likely reason that a percent yield is below 100%?", "Some product was lost during transfer or filtering", "Atoms were created in the reaction", "The reaction made extra mass"]
  ]));

  const EMP = [["CH2", 14, [3, 4, 5, 6], "C", 1], ["CH2O", 30, [2, 3, 6], "C", 1], ["NO2", 46, [1, 2], "N", 1], ["HO", 17, [2], "H", 1], ["C2H5", 29, [2], "C", 2], ["CH", 13, [2, 6], "C", 1], ["C3H4", 40, [2, 3], "C", 3], ["CH3", 15, [2], "H", 3], ["P2O5", 142, [1, 2], "P", 2], ["C2H4O", 44, [2], "C", 2]];
  const molFQ = () => {
    const [f, m, ns, el, per] = pick(EMP), n = pick(ns);
    if (Math.random() < 0.5) return num(`The empirical formula of a compound is <b>${fmt(f)}</b> and its molar mass is <b>${m * n} g/mol</b>. ${arNote(f)} By what number must the empirical formula be multiplied to get the molecular formula?`, n,
      ["First find the mass of one empirical formula unit.", "Divide the molar mass by the empirical formula mass.", "Example: empirical C₂H₃ has mass 27. A molar mass of 81 divided by 27 gives 3. Now do yours."], "🧪");
    return num(`The empirical formula of a compound is <b>${fmt(f)}</b> and its molar mass is <b>${m * n} g/mol</b>. ${arNote(f)} How many <b>${el}</b> atoms are in one molecule of the compound?`, n * per,
      ["First find the mass of the empirical formula.", "Divide the molar mass by that to find the multiplier, then multiply the number of atoms in the empirical formula by it.", "Example: empirical C₂H₃ (27) with molar mass 54 gives a multiplier of 2, so 2 × 3 = 6 H atoms. Now do yours."], "🧪");
  };
  b.push(les("Molecular formula from empirical formula", [
    ["Simplest and real", "🧪", "The <b>empirical formula</b> is the simplest whole-number ratio. The <b>molecular formula</b> is the real number of atoms in a molecule. CH₂O is empirical; glucose C₆H₁₂O₆ is molecular."],
    ["The multiplier", "✖️", "<b>n = molar mass ÷ empirical formula mass</b>. Glucose: 180 ÷ 30 = <b>6</b>. Multiply every subscript by 6."],
    ["Check", "✅", "Add up the masses of the final formula. C₆H₁₂O₆ = 72 + 12 + 96 = 180. ✓"]
  ], ["Work out the mass of the empirical formula first.", "Multiplier = molar mass ÷ empirical formula mass. It must be a whole number.", "Example: empirical CH₂ (14) with molar mass 42 gives n = 3, so C₃H₆. Now try yours."], [
    molFQ, molFQ, molFQ, molFQ, molFQ,
    ["The molecular formula is always...", "A whole-number multiple of the empirical formula", "Smaller than the empirical formula", "The same as the molar mass"]
  ]));

  const HYD = [["CuSO4", 160, 5], ["MgSO4", 120, 7], ["Na2CO3", 106, 10], ["CaSO4", 136, 2], ["Na2SO4", 142, 10]];
  const hydQ = () => {
    const [f, M, x] = pick(HYD), k = pick([1, 2]), a2 = M * k, w = 18 * x * k;
    if (Math.random() < 0.7) return num(`A hydrated salt is heated until all the water leaves. It leaves <b>${a2} g</b> of anhydrous ${fmt(f)} (molar mass ${M} g/mol) and <b>${w} g</b> of water was lost (water = 18 g/mol). Find <b>x</b> in ${fmt(f)}·xH<sub>2</sub>O.`, x,
      ["Convert both masses to moles.", "x = moles of water ÷ moles of the anhydrous salt.", "Example: 80 g of anhydrous salt (M = 80) and 36 g water give 1 mol and 2 mol, so x = 2. Now do yours."], "💧");
    return num(`What is the molar mass of the hydrated salt ${fmt(f)}·${x}H<sub>2</sub>O (g/mol)? (Anhydrous ${fmt(f)} = ${M} g/mol, water = 18 g/mol.)`, M + 18 * x,
      ["The hydrated salt = the salt plus the water.", "Add the molar mass of the salt to x times 18.", "Example: salt of 100 g/mol with 3 H₂O is 100 + 3 × 18 = 154. Now do yours."], "💧");
  };
  b.push(les("Hydrated salts", [
    ["Water in crystals", "💧", "Some crystals hold water inside them. Blue copper sulfate is CuSO₄·5H₂O: for every CuSO₄ there are <b>5 H₂O</b>. Heating drives the water off and the crystals turn white (anhydrous)."],
    ["Find x", "🔍", "Convert the mass of anhydrous salt and the mass of water into moles. <b>x = moles of water ÷ moles of salt</b>."],
    ["Worked example", "✏️", "MgSO₄ = 120 g/mol. A hydrate loses 63 g of water and leaves 60 g of salt. Moles: water 63 ÷ 18 = 3.5, salt 60 ÷ 120 = 0.5. x = 3.5 ÷ 0.5 = <b>7</b>."]
  ], ["Moles of each part are needed.", "Divide both masses by their molar masses, then divide water by salt.", "Example: 0.5 mol of salt with 2.5 mol of water gives x = 5. Now try yours."], [
    hydQ, hydQ, hydQ, hydQ, hydQ, hydQ,
    ["Anhydrous means...", "Without water", "With extra water", "Very hot"]
  ]));

  const SOLS = [["NaOH", 40], ["KOH", 56], ["Na2CO3", 106], ["CuSO4", 160], ["MgSO4", 120], ["LiNO3", 69], ["KNO3", 101], ["H2SO4", 98]];
  const solQ = () => {
    let f, M, c, v, g, tries = 0;
    do { [f, M] = pick(SOLS); c = pick([0.1, 0.2, 0.25, 0.5, 1, 2]); v = pick([0.1, 0.25, 0.5, 1, 2]); g = c * v * M; tries++; } while ((Math.abs(g * 10 - Math.round(g * 10)) > 1e-9) && tries < 80);
    if (Math.abs(g * 10 - Math.round(g * 10)) > 1e-9) { f = "NaOH"; M = 40; c = 0.5; v = 1; g = 20; }
    g = r1(g);
    if (Math.random() < 0.65) return num(`How many grams of ${fmt(f)} (molar mass ${M} g/mol) are needed to make <b>${v} dm³</b> of a <b>${c} mol/dm³</b> solution?`, g,
      ["Find the moles first: moles = concentration × volume (in dm³).", "Then grams = moles × molar mass.", "Example: 0.5 dm³ of 0.2 mol/dm³ is 0.1 mol; for a salt of 100 g/mol that is 10 g. Now do yours."], "🧂");
    const c2 = pick([0.1, 0.2, 0.5, 1, 2]), mm = pick([100, 250, 500, 1000, 2000]);
    return num(`How many moles of ${fmt(f)} are in <b>${mm} cm³</b> of a <b>${c2} mol/dm³</b> solution? (1 dm³ = 1000 cm³.)`, Math.round(c2 * mm) / 1000,
      ["Change cm³ into dm³ by dividing by 1000.", "Moles = concentration × volume in dm³.", "Example: 250 cm³ = 0.25 dm³; at 0.4 mol/dm³ that is 0.1 mol. Now do yours."], "🧪");
  };
  b.push(les("Making a solution: how much solid?", [
    ["Concentration", "🧪", "<b>Concentration</b> (mol/dm³) tells you moles of solute in each dm³ (1 litre) of solution. <b>Moles = concentration × volume (dm³)</b>."],
    ["Mass needed", "⚖️", "<b>Mass = moles × molar mass</b>. For 0.5 dm³ of 0.2 mol/dm³ NaOH: 0.1 mol × 40 = <b>4 g</b>."],
    ["Units", "📏", "Always change cm³ to dm³ by dividing by 1000. 250 cm³ = 0.25 dm³."]
  ], ["Moles come first in every solution calculation.", "Moles = concentration × volume in dm³, then use the molar mass for grams.", "Example: 2 dm³ of 0.5 mol/dm³ solution has 1 mol; a salt of 60 g/mol then needs 60 g. Now try yours."], [
    solQ, solQ, solQ, solQ, solQ, solQ,
    ["The units dm³ and litre are...", "The same volume", "Different by a factor of 10", "Different by a factor of 1000"]
  ]));

  const IONSOL = [["CaCl2", "Ca²⁺", 1, "Cl⁻", 2], ["Na2SO4", "Na⁺", 2, "SO₄²⁻", 1], ["AlCl3", "Al³⁺", 1, "Cl⁻", 3], ["Al2(SO4)3", "Al³⁺", 2, "SO₄²⁻", 3], ["MgCl2", "Mg²⁺", 1, "Cl⁻", 2], ["K3PO4", "K⁺", 3, "PO₄³⁻", 1], ["Fe(NO3)3", "Fe³⁺", 1, "NO₃⁻", 3], ["(NH4)2SO4", "NH₄⁺", 2, "SO₄²⁻", 1], ["NaCl", "Na⁺", 1, "Cl⁻", 1], ["Ca(NO3)2", "NO₃⁻", 2, "Ca²⁺", 1]];
  const ionConcQ = () => {
    const [f, i1, n1, i2, n2] = pick(IONSOL), c = pick([0.1, 0.2, 0.25, 0.3, 0.5, 1, 2]), which = ri(0, 1), ion = which ? i2 : i1, n = which ? n2 : n1;
    return num(`A solution contains <b>${c} mol/dm³</b> of ${fmt(f)}, which fully dissolves into ions. What is the concentration of <b>${ion}</b> ions (mol/dm³)?`, r2(c * n),
      ["Write how the compound splits into ions and count how many of this ion come from each formula unit.", "Concentration of the ion = concentration of the compound × number of those ions in the formula.", "Example: 0.2 mol/dm³ of Li₂CO₃ gives 0.4 mol/dm³ Li⁺ and 0.2 mol/dm³ CO₃²⁻. Now do yours."], "🔋");
  };
  b.push(les("Concentration of ions", [
    ["Splitting up", "✂️", "Ionic compounds <b>dissociate</b> into ions in water. NaCl → Na⁺ + Cl⁻. CaCl₂ → Ca²⁺ + <b>2</b> Cl⁻."],
    ["Scale the concentration", "📈", "Ion concentration = compound concentration × the number of that ion in the formula. In 0.3 mol/dm³ Na₂SO₄: [Na⁺] = 0.6, [SO₄²⁻] = 0.3."],
    ["Charge check", "⚡", "Positive and negative charges in the solution must balance: 0.3 mol/dm³ Al₂(SO₄)₃ has [Al³⁺] = 0.6 and [SO₄²⁻] = 0.9; 0.6 × 3 = 0.9 × 2."]
  ], ["Write the dissociation of the compound.", "Multiply the compound's concentration by the number of times the ion appears in the formula.", "Example: 0.2 mol/dm³ Na₂CO₃ gives 0.4 mol/dm³ Na⁺ and 0.2 mol/dm³ CO₃²⁻. Now do yours."], [
    ionConcQ, ionConcQ, ionConcQ, ionConcQ, ionConcQ, ionConcQ,
    ["When CaCl₂ dissolves, each formula unit gives...", "1 Ca²⁺ and 2 Cl⁻", "2 Ca²⁺ and 1 Cl⁻", "1 Ca²⁺ and 1 Cl⁻"]
  ]));

  const ACIDS = [["HCl", 1], ["HNO3", 1], ["H2SO4", 2]], BASES = [["NaOH", 1], ["KOH", 1], ["Ca(OH)2", 2]];
  const neutQ = () => {
    let ac, ba, Ma, Va, Mb, Vb, tries = 0;
    do { ac = pick(ACIDS); ba = pick(BASES); Ma = pick([0.1, 0.2, 0.25, 0.5]); Va = pick([10, 20, 25, 30, 40, 50]); Mb = pick([0.1, 0.2, 0.25, 0.5, 1]); Vb = ac[1] * Ma * Va / (ba[1] * Mb); tries++; }
    while ((Math.abs(Vb - Math.round(Vb)) > 1e-9 || Vb > 120 || Vb < 5) && tries < 400);
    if (tries >= 400) { ac = ACIDS[2]; ba = BASES[0]; Ma = 0.1; Va = 25; Mb = 0.1; Vb = 50; }
    return num(`<b>${Va} cm³</b> of <b>${Ma} mol/dm³</b> ${fmt(ac[0])} is exactly neutralised by ${fmt(ba[0])} of concentration <b>${Mb} mol/dm³</b>. Each ${fmt(ac[0])} gives <b>${ac[1]}</b> H⁺ and each ${fmt(ba[0])} gives <b>${ba[1]}</b> OH⁻. What volume of ${fmt(ba[0])} is needed (cm³)?`, Math.round(Vb),
      ["Neutralisation happens when moles of H⁺ equal moles of OH⁻.", "Moles of H⁺ = H⁺ per acid × concentration × volume. Then volume of base = moles of OH⁻ needed ÷ (OH⁻ per base × its concentration).", "Example: 10 cm³ of 0.1 mol/dm³ H₂SO₄ gives 2 × 0.1 × 10 = 2 units of H⁺; 0.1 mol/dm³ NaOH needs 2 ÷ 0.1 = 20 cm³. Now do yours."], "⚗️");
  };
  b.push(les("Neutralisation with different ratios", [
    ["Count the ions", "🔢", "H₂SO₄ gives <b>2</b> H⁺ per molecule; Ca(OH)₂ gives <b>2</b> OH⁻. Neutral means <b>moles of H⁺ = moles of OH⁻</b>."],
    ["The method", "🪜", "1) moles of acid = concentration × volume. 2) moles of H⁺ = × H⁺ per acid. 3) moles of OH⁻ the same. 4) volume = moles ÷ concentration."],
    ["Worked example", "✏️", "25 cm³ of 0.1 mol/dm³ H₂SO₄ needs NaOH at 0.2 mol/dm³. H⁺ = 2 × 0.1 × 25 = 5 (units). Volume of NaOH = 5 ÷ 0.2 = <b>25 cm³</b>."]
  ], ["Make a note of how many H⁺ and OH⁻ come from one unit of each.", "Equate the total H⁺ and OH⁻ moles, then solve for the unknown volume.", "Example: 20 cm³ of 0.1 mol/dm³ HCl needs 20 cm³ of 0.1 mol/dm³ NaOH. Now try yours."], [
    neutQ, neutQ, neutQ, neutQ, neutQ, neutQ,
    ["At the neutralisation point, moles of H⁺ equal moles of...", "OH⁻", "Cl⁻", "Na⁺"]
  ]));

  const cgQ = () => {
    const pairs = [[27, 127], [27, 327], [127, 27], [27, 77], [-73, 27], [127, 327], [-23, 227], [77, 227]];
    let t1, t2, p1, v1, p2, v2, tries = 0;
    do { [t1, t2] = pick(pairs); p1 = pick([1, 2, 3, 4]); v1 = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30]); p2 = pick([1, 2, 3, 4, 6]); v2 = p1 * v1 * (t2 + 273) / (p2 * (t1 + 273)); tries++; } while ((!Number.isInteger(Math.round(v2 * 1e6) / 1e6) || v2 <= 0) && tries < 400);
    if (tries >= 400) { t1 = 27; t2 = 127; p1 = 1; p2 = 1; v1 = 12; v2 = 16; }
    return num(`A gas has a volume of <b>${v1} dm³</b> at <b>${p1} atm</b> and <b>${t1} °C</b>. It is changed to <b>${p2} atm</b> and <b>${t2} °C</b>. What is the new volume (dm³)? (Use K = °C + 273.)`, Math.round(v2),
      ["Change both temperatures into kelvin first.", "Use P₁V₁ ÷ T₁ = P₂V₂ ÷ T₂ and solve for V₂.", "Example: 6 dm³ at 1 atm and 300 K becomes 2 atm at 600 K: V₂ = (1 × 6 × 600) ÷ (2 × 300) = 6 dm³. Now do yours."], "🎈");
  };
  b.push(les("The combined gas law", [
    ["Three things at once", "🎈", "When pressure, volume and temperature all change, use the <b>combined gas law</b>: <b>P₁V₁ ÷ T₁ = P₂V₂ ÷ T₂</b>."],
    ["Always kelvin", "🌡️", "Temperatures must be in <b>kelvin</b>: K = °C + 273. Using °C gives wrong answers, because 0 °C is not zero energy."],
    ["Worked example", "✏️", "5 dm³ at 2 atm and 27 °C goes to 1 atm and 127 °C. T₁ = 300 K, T₂ = 400 K. V₂ = (2 × 5 × 400) ÷ (1 × 300) = <b>13.3 dm³</b> (rounded)."],
    ["Special cases", "🔧", "Keep T constant and you get Boyle's law (PV = constant). Keep P constant and V ÷ T = constant."]
  ], ["Check that every temperature is in kelvin.", "Rearrange: V₂ = P₁V₁T₂ ÷ (P₂T₁).", "Example: 4 dm³ at 2 atm, 350 K to 4 atm at 350 K: V₂ = (2 × 4) ÷ 4 = 2 dm³. Now try yours."], [
    cgQ, cgQ, cgQ, cgQ, cgQ,
    ["In gas law calculations temperature must be in...", "Kelvin", "Celsius", "Fahrenheit"],
    ["27 °C is how many kelvin (K = °C + 273)?", "300 K", "246 K", "27 K"]
  ]));

  const ideal = () => {
    let n, T, P, V, tries = 0;
    do { n = ri(1, 8); T = pick([100, 125, 150, 200, 250, 300, 350, 400, 500, 600]); P = pick([1, 2, 4, 5]); V = n * 0.082 * T / P; tries++; } while ((Math.abs(V - Math.round(V)) > 1e-9 || V < 1) && tries < 500);
    if (tries >= 500) { n = 2; T = 250; P = 1; V = 41; }
    return num(`Use <b>PV = nRT</b> with <b>R = 0.082</b> dm³·atm/(mol·K). What is the volume (dm³) of <b>${n} mol</b> of an ideal gas at <b>${P} atm</b> and <b>${T} K</b>?`, Math.round(V),
      ["List what you know: n, P, T and R. The unknown is V.", "Rearrange to V = nRT ÷ P and multiply everything out.", "Example: 1 mol at 2 atm and 500 K: V = 1 × 0.082 × 500 ÷ 2 = 20.5 dm³. Now do yours."], "🎈");
  };
  const idealN = () => {
    let n, T, P, V, tries = 0;
    do { n = ri(1, 6); T = pick([100, 200, 250, 300, 400, 500]); P = pick([1, 2, 4]); V = n * 0.082 * T / P; tries++; } while ((Math.abs(V - Math.round(V)) > 1e-9 || V < 1) && tries < 500);
    if (tries >= 500) { n = 2; T = 250; P = 1; V = 41; }
    return num(`A gas at <b>${P} atm</b> and <b>${T} K</b> fills <b>${Math.round(V)} dm³</b>. How many moles are there? (Use R = 0.082 dm³·atm/(mol·K).)`, n,
      ["Rearrange PV = nRT to get n by itself.", "n = PV ÷ (RT). Work out RT first.", "Example: 1 atm × 20.5 dm³ at 250 K: RT = 0.082 × 250 = 20.5, so n = 1. Now do yours."], "🎈");
  };
  b.push(les("The ideal gas law", [
    ["PV = nRT", "🎈", "<b>PV = nRT</b> links pressure, volume, moles and temperature. <b>R</b> is a constant. With atm and dm³, R = 0.082 dm³·atm/(mol·K)."],
    ["Rearranging", "🔧", "V = nRT ÷ P. n = PV ÷ RT. T = PV ÷ nR. Temperature is always in kelvin."],
    ["Worked example", "✏️", "2 mol at 1 atm and 300 K: V = 2 × 0.082 × 300 ÷ 1 = <b>49.2 dm³</b>."]
  ], ["Write out PV = nRT and circle the unknown.", "Isolate the unknown on one side before putting the numbers in.", "Example: n = 3, T = 100, P = 1 gives V = 3 × 0.082 × 100 = 24.6 dm³. Now try yours."], [
    ideal, ideal, ideal, idealN, idealN, idealN,
    ["In PV = nRT the letter n stands for...", "The number of moles", "Nitrogen", "The refractive index"]
  ]));

  const FUELS = [["methane, CH₄", 890, 16], ["hydrogen, H₂", 286, 2], ["carbon (graphite)", 394, 12], ["ethanol, C₂H₅OH", 1367, 46], ["propane, C₃H₈", 2220, 44]];
  const dhQ = () => {
    const [nm, E, M] = pick(FUELS), k = pick([0.5, 1, 2, 3]);
    if (Math.random() < 0.5) {
      const v = E * k; return num(`The molar enthalpy of combustion of ${nm} is <b>−${E} kJ/mol</b> (the negative sign means heat is released). How much heat (kJ) is released when <b>${k} mol</b> burns? (Give the number only.)`, Number.isInteger(v) ? v : r1(v),
        ["Energy released scales with the number of moles burned.", "Heat = moles × the size of the enthalpy change (ignore the minus sign when asked how much is released).", "Example: a fuel with −500 kJ/mol burning 3 mol releases 3 × 500 = 1500 kJ. Now do yours."], "🔥");
    }
    const kk = pick([1, 2, 3]);
    return num(`The molar enthalpy of combustion of ${nm} is <b>−${E} kJ/mol</b> (molar mass ${M} g/mol). How much heat (kJ) is released when <b>${kk * M} g</b> burns?`, E * kk,
      ["Convert the mass to moles first.", "Moles = mass ÷ molar mass; then heat released = moles × the size of the enthalpy change.", "Example: 10 g of a fuel with M = 10 g/mol is 1 mol, which releases its full molar enthalpy. Now do yours."], "🔥");
  };
  b.push(les("Enthalpy change, ΔH", [
    ["Heat in a reaction", "🔥", "<b>Enthalpy change (ΔH)</b> is the heat exchanged at constant pressure. <b>Exothermic</b>: ΔH is <b>negative</b> (heat released). <b>Endothermic</b>: ΔH is <b>positive</b> (heat absorbed)."],
    ["Per mole", "⚖️", "ΔH is quoted <b>per mole</b> of reaction. CH₄ + 2O₂ → CO₂ + 2H₂O, ΔH = −890 kJ/mol. Burning 2 mol releases 2 × 890 = <b>1780 kJ</b>."],
    ["From grams", "🪜", "Grams → moles → heat. 8 g of CH₄ (M = 16) is 0.5 mol, so it releases 0.5 × 890 = <b>445 kJ</b>."]
  ], ["The sign tells you the direction of heat flow.", "Multiply the molar enthalpy by the number of moles. Convert grams to moles first if needed.", "Example: burning 0.5 mol of a fuel with ΔH = −200 kJ/mol releases 100 kJ. Now try yours."], [
    dhQ, dhQ, dhQ, dhQ,
    ["A negative ΔH means the reaction is...", "Exothermic", "Endothermic", "Impossible"],
    ["A positive ΔH means the reaction...", "Absorbs heat from the surroundings", "Releases heat", "Has no energy change"],
    ["Which reaction makes its surroundings warmer?", "An exothermic one", "An endothermic one", "A reaction with ΔH = 0 only"]
  ]));

  const edQ = () => {
    let R, ea, peak, dh, Pq;
    do { R = ri(2, 6) * 10; ea = pick([20, 30, 40, 50, 60, 80]); peak = R + ea; dh = pick([-50, -30, -20, 20, 40, 60]); Pq = R + dh; } while (Pq < 5 || peak - Pq < 10);
    const t = ri(0, 3);
    const d = `On an energy diagram the reactants are at <b>${R} kJ</b>, the peak (transition state) is at <b>${peak} kJ</b> and the products are at <b>${Pq} kJ</b>.`;
    if (t === 0) return num(`${d} What is the <b>activation energy</b> of the forward reaction (kJ)?`, ea,
      ["Activation energy is the climb from the reactants up to the peak.", "Ea = peak − reactants.", "Example: reactants at 10, peak at 70: Ea = 70 − 10 = 60. Now do yours."], "⛰️");
    if (t === 1) return num(`${d} What is the activation energy of the <b>reverse</b> reaction (kJ)?`, peak - Pq,
      ["The reverse reaction starts from the products.", "Ea (reverse) = peak − products.", "Example: peak 70, products 40: reverse Ea = 70 − 40 = 30. Now do yours."], "⛰️");
    if (t === 2) return num(`${d} How many kJ of energy in total does the forward reaction ${dh < 0 ? "release" : "absorb"}? (Give the size of ΔH as a positive number.)`, Math.abs(dh),
      ["ΔH compares the products with the reactants.", "Find the difference between the product level and the reactant level, ignoring the sign.", "Example: reactants at 50 and products at 20 means 30 kJ is released. Now do yours."], "⛰️");
    return mcq(`${d} Is the forward reaction exothermic or endothermic?`, dh < 0 ? "Exothermic" : "Endothermic", [dh < 0 ? "Endothermic" : "Exothermic", "Neither"],
      ["Compare the energy of the products with the energy of the reactants.", "Products lower than reactants means energy was given out; products higher means energy was taken in.", "Example: reactants at 40 and products at 90 is endothermic. Now do yours."], "⛰️");
  };
  b.push(les("Energy diagrams: Ea and ΔH", [
    ["Reading the hill", "⛰️", "An energy diagram shows reactants, a peak and products. The peak is the <b>transition state</b>. The climb from reactants to the peak is the <b>activation energy (Ea)</b>."],
    ["ΔH", "↕️", "<b>ΔH = energy of products − energy of reactants</b>. Products lower: exothermic (ΔH negative). Products higher: endothermic (ΔH positive)."],
    ["Reverse reaction", "↩️", "For the reverse reaction, the starting point is the products. <b>Ea (reverse) = peak − products</b>."],
    ["Catalysts", "🔑", "A catalyst lowers the peak (smaller Ea) but does <b>not</b> change ΔH or the energies of the reactants and products."]
  ], ["Mark the three levels on a drawing: reactants, peak, products.", "Ea is measured from the starting level to the peak. ΔH is the gap between products and reactants.", "Example: reactants 20, peak 80, products 50: Ea = 60, ΔH = +30 (endothermic). Now try yours."], [
    edQ, edQ, edQ, edQ, edQ, edQ,
    ["A catalyst changes the activation energy but not the...", "ΔH of the reaction", "Speed", "Peak height"]
  ]));

  const hessQ = () => {
    const x = pick([100, 120, 150, 180, 200, 250, 300, 350, 400]), y = pick([50, 60, 90, 110, 130, 140, 160, 220]), t = ri(0, 2);
    if (t === 0) return num(`Step 1 releases <b>${x} kJ</b>. Step 2 releases <b>${y} kJ</b>. The two steps together make one overall reaction. How much heat (kJ) does the overall reaction release?`, x + y,
      ["Hess's law: the total heat change is the same however many steps there are.", "Add the heat changes of the steps.", "Example: steps releasing 40 and 70 kJ give a total of 110 kJ. Now do yours."], "🪜");
    if (t === 1) return num(`A reaction has ΔH = <b>−${x} kJ</b>. The <b>reverse</b> reaction absorbs how much heat (kJ)?`, x,
      ["Reversing a reaction flips the sign of ΔH.", "The size stays the same; only the direction changes.", "Example: ΔH = −90 kJ forward means the reverse absorbs 90 kJ. Now do yours."], "🪜");
    return num(`One equation has ΔH = <b>−${y} kJ</b>. How much heat (kJ) is released when the equation is <b>doubled</b> (every coefficient × 2)?`, y * 2,
      ["Doubling the equation means twice as much reacts.", "Multiply the size of ΔH by 2.", "Example: ΔH = −40 kJ, doubled gives −80 kJ, which is 80 kJ released. Now do yours."], "🪜");
  };
  b.push(les("Hess's law", [
    ["Same start, same finish", "🏔️", "<b>Hess's law</b>: the total enthalpy change from reactants to products is the same whichever route you take. Like climbing a hill, the height gained does not depend on the path."],
    ["Three rules", "📜", "1) Add the ΔH of the steps. 2) If you <b>reverse</b> a step, flip the sign of ΔH. 3) If you <b>multiply</b> a step, multiply ΔH too."],
    ["Worked example", "✏️", "C + ½O₂ → CO releases 110 kJ. CO + ½O₂ → CO₂ releases 283 kJ. So C + O₂ → CO₂ releases 110 + 283 = <b>393 kJ</b>."]
  ], ["Hess's law lets you add steps.", "Reverse flips the sign; multiplying the equation multiplies ΔH.", "Example: steps of −75 and −25 kJ give −100 kJ. Now try yours."], [
    hessQ, hessQ, hessQ, hessQ, hessQ,
    ["Hess's law says the total enthalpy change depends only on...", "The start and the end", "The route taken", "The catalyst used"],
    ["Reversing a reaction does what to ΔH?", "Changes its sign", "Doubles it", "Nothing"]
  ]));

  const latQ = () => {
    const m = pick([2, 5, 10, 20, 50]), t = ri(0, 3);
    if (t === 0) return num(`How much heat (J) is needed to melt <b>${m} g</b> of ice at 0 °C? (Latent heat of fusion of water = 334 J/g.)`, 334 * m,
      ["Melting at a fixed temperature uses heat only to break attractions.", "Heat = mass × latent heat.", "Example: melting 3 g of a solid with latent heat 100 J/g takes 3 × 100 = 300 J. Now do yours."], "🧊");
    if (t === 1) return num(`How much heat (J) is needed to boil <b>${m} g</b> of water at 100 °C into steam? (Latent heat of vaporisation of water = 2260 J/g.)`, 2260 * m,
      ["Boiling at a fixed temperature uses heat to separate the particles.", "Heat = mass × latent heat.", "Example: boiling 2 g of a liquid with latent heat 500 J/g takes 2 × 500 = 1000 J. Now do yours."], "♨️");
    if (t === 2) { const dT = pick([10, 20, 25, 50]); return num(`How much heat (J) is needed to warm <b>${m * 10} g</b> of liquid water by <b>${dT} °C</b>? (Specific heat capacity of water = 4.2 J/g°C.)`, Math.round(m * 10 * 4.2 * dT),
      ["Warming a liquid with no change of state uses q = mcΔT.", "Multiply mass × specific heat × temperature rise.", "Example: 100 g warmed by 10 °C with c = 4 J/g°C needs 100 × 4 × 10 = 4000 J. Now do yours."], "🌡️"); }
    return mcq(`During melting (ice turning to water at 0 °C) while heat is added, the temperature...`, "Stays at 0 °C", ["Rises steadily", "Falls below 0 °C"],
      ["Think about where the added energy goes during a change of state.", "On a heating curve, a change of state shows as a flat section.", "Example: during boiling the temperature stays at 100 °C until all the liquid is gone. Now do yours."], "📈");
  };
  b.push(les("Heating curves and latent heat", [
    ["Flat parts", "📈", "On a heating curve, temperature rises on the slopes and is <b>flat</b> during a change of state. The energy is breaking attractions, not speeding up particles."],
    ["Latent heat", "🧊", "<b>q = m × L</b>. For water: melting L = 334 J/g, boiling L = 2260 J/g. Boiling needs much more energy because the particles must be separated completely."],
    ["Slopes", "🌡️", "On the slopes use <b>q = mcΔT</b> (c of water = 4.2 J/g°C). A full path adds all the pieces together."]
  ], ["Is the substance changing temperature or changing state?", "Changing temperature: q = mcΔT. Changing state: q = mL.", "Example: melting 10 g with L = 100 J/g needs 1000 J. Now try yours."], [
    latQ, latQ, latQ, latQ, latQ, latQ
  ]));

  const rateQ = () => {
    const ord = pick([0, 1, 2]), f = pick([2, 3, 4]), sp = ord === 0 ? 1 : Math.pow(f, ord);
    const t = ri(0, 1);
    if (t === 0) return num(`A reaction is <b>${ord === 0 ? "zero" : ord === 1 ? "first" : "second"} order</b> in a reactant A (rate ∝ [A]<sup>${ord}</sup>). If [A] is multiplied by <b>${f}</b>, by what factor does the rate change?`, sp,
      ["The order is the power of the concentration in the rate law.", "New rate = old rate × (concentration factor)^order.", "Example: first order with the concentration ×5 means rate ×5; second order with ×3 means rate ×9. Now do yours."], "⏱️");
    const r0 = pick([2, 3, 5, 10]); return num(`The rate is <b>${r0} units</b> at [A] = 1. The reaction is <b>${ord === 0 ? "zero" : ord === 1 ? "first" : "second"} order</b> in A. What is the rate when [A] is raised to <b>${f}</b>?`, r0 * sp,
      ["Find how much the concentration was multiplied by.", "Multiply the old rate by (that factor)^order.", "Example: second order with rate 4 at [A] = 1 becomes 4 × 3² = 36 at [A] = 3. Now do yours."], "⏱️");
  };
  const orderFind = () => {
    const ord = pick([0, 1, 2]), f = 2, rr = ord === 0 ? 1 : Math.pow(f, ord), c1 = pick([0.1, 0.2]), r1v = pick([3, 4, 5]);
    return mcq(`In experiment 1, [A] = ${c1} mol/dm³ and the rate is ${r1v}. In experiment 2, [A] = ${c1 * 2} mol/dm³ and the rate is ${r1v * rr}. What is the order of the reaction in A?`, ord === 0 ? "Zero order" : ord === 1 ? "First order" : "Second order", ["Zero order", "First order", "Second order"].filter((x, i) => i !== ord),
      ["The concentration doubled. What happened to the rate?", "Rate unchanged: zero order. Rate doubles: first order. Rate quadruples: second order.", "Example: concentration ×2 and rate ×8 would need order 3. Now do yours."], "⏱️");
  };
  b.push(les("Rate laws and reaction order", [
    ["Rate law", "⏱️", "A <b>rate law</b> shows how rate depends on concentration: rate = k[A]<sup>n</sup>. The power <b>n</b> is the <b>order</b>, found by experiment, not from the equation."],
    ["What order does", "📊", "<b>Zero order</b>: doubling [A] does nothing to the rate. <b>First order</b>: doubling [A] doubles the rate. <b>Second order</b>: doubling [A] makes the rate <b>4×</b>."],
    ["Find the order", "🔍", "Double the concentration and watch the rate. ×1 → order 0, ×2 → order 1, ×4 → order 2. Tripling a second-order reactant makes the rate 3² = <b>9×</b>."]
  ], ["Compare how much the concentration changed with how much the rate changed.", "The rate changes by (concentration factor) raised to the order.", "Example: doubling [B] makes the rate 8 times faster: 2³ = 8, so the order is 3. Now try yours."], [
    rateQ, rateQ, rateQ, orderFind, orderFind, orderFind,
    ["The order of a reaction can only be found by...", "Experiment", "Looking at the coefficients only", "Guessing"]
  ]));

  const kcQ = () => {
    const t = ri(0, 2);
    if (t === 0) { let A, B, tries = 0; do { A = ri(1, 4); B = ri(1, 3); tries++; } while ((A * A) % B !== 0 && tries < 100); if (tries >= 100) { A = 2; B = 1; }
      return num(`For N₂O₄ ⇌ 2NO₂, the equilibrium concentrations are [NO₂] = <b>${A} mol/dm³</b> and [N₂O₄] = <b>${B} mol/dm³</b>. Calculate K<sub>c</sub> = [NO₂]² ÷ [N₂O₄].`, (A * A) / B,
        ["Put the numbers into the expression exactly as written.", "Square the NO₂ value first (the coefficient 2 becomes the power), then divide by the N₂O₄ value.", "Example: if [NO₂] = 3 and [N₂O₄] = 9 then K = 3² ÷ 9 = 1. Now do yours."], "⚖️"); }
    if (t === 1) { const c = ri(2, 6), a1 = ri(1, 3), b1 = ri(1, 3); return num(`For A + B ⇌ C, equilibrium concentrations are [A] = <b>${a1}</b>, [B] = <b>${b1}</b> and [C] = <b>${c * a1 * b1}</b> mol/dm³. Calculate K<sub>c</sub> = [C] ÷ ([A][B]).`, c,
      ["Multiply [A] and [B] to get the bottom line.", "Divide [C] by that product.", "Example: [A] = 2, [B] = 3, [C] = 12 gives 12 ÷ 6 = 2. Now do yours."], "⚖️"); }
    return mcq(`If K<sub>c</sub> is a very <b>large</b> number (like 10<sup>6</sup>) at equilibrium, the mixture contains mostly...`, "Products", ["Reactants", "Equal amounts of each"],
      ["K compares products over reactants.", "A big top line in the fraction means many products.", "Example: K = 0.000001 would mean mostly reactants. Now do yours."], "⚖️");
  };
  b.push(les("The equilibrium constant, K", [
    ["Products over reactants", "⚖️", "For aA + bB ⇌ cC + dD, <b>K<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup> ÷ [A]<sup>a</sup>[B]<sup>b</sup></b>. Coefficients become powers. Square brackets mean concentration in mol/dm³."],
    ["What K tells you", "📣", "<b>K ≫ 1</b>: mostly products. <b>K ≪ 1</b>: mostly reactants. K ≈ 1: a mixture. K only changes with <b>temperature</b>."],
    ["Worked example", "✏️", "N₂ + 3H₂ ⇌ 2NH₃: K = [NH₃]² ÷ ([N₂][H₂]³). Solids and pure liquids are left out of the expression."]
  ], ["Write the expression first: products on top, reactants on the bottom.", "Raise each concentration to the power of its coefficient.", "Example: 2A ⇌ B with [A] = 2 and [B] = 8 gives K = 8 ÷ 2² = 2. Now try yours."], [
    kcQ, kcQ, kcQ, kcQ,
    ["The equilibrium constant K changes when you change the...", "Temperature", "Pressure only", "Concentration"],
    ["Which goes on the top of the K expression?", "Products", "Reactants", "Catalysts"]
  ]));

  const phQ = () => {
    const k = ri(1, 13), t = ri(0, 4);
    if (t === 0) return num(`The pOH of a solution is <b>${k}</b>. What is its pH? (pH + pOH = 14.)`, 14 - k,
      ["pH and pOH always add to the same number at 25 °C.", "pH = 14 − pOH.", `Example: pOH ${k === 4 ? 5 : 4} gives pH ${k === 4 ? 9 : 10}. Now do yours.`], "🧪");
    if (t === 1) return num(`A strong acid solution has <b>[H⁺] = 1 × 10<sup>-${k}</sup> mol/dm³</b>. What is its pH?`, k,
      ["pH = −log[H⁺]. The pH is the positive power of ten.", "For 10 to the minus k, pH is k.", `Example: [H⁺] = 10⁻${k === 3 ? 4 : 3} gives pH ${k === 3 ? 4 : 3}. Now do yours.`], "🧪");
    if (t === 2) { const j = ri(1, 3); return num(`A solution of the strong base NaOH has <b>[OH⁻] = 1 × 10<sup>-${j}</sup> mol/dm³</b>. What is its pH?`, 14 - j,
      ["First find pOH from the hydroxide concentration (the positive power of ten).", "Then pH = 14 − pOH.", "Example: [OH⁻] = 10⁻⁵ gives pOH 5, so pH 9. Now do yours."], "🧪"); }
    if (t === 3) { const pH = ri(8, 13); return num(`A solution has pH <b>${pH}</b>. Its [OH⁻] is 1 × 10<sup>-x</sup> mol/dm³. What is x?`, 14 - pH,
      ["Find the pOH first: pOH = 14 − pH.", "[OH⁻] = 10 to the minus pOH, so x equals the pOH.", `Example: pH ${pH === 11 ? 12 : 11} gives pOH ${pH === 11 ? 2 : 3}, so x = ${pH === 11 ? 2 : 3}. Now do yours.`], "🧪"); }
    const a1 = ri(1, 6), a2 = ri(1, 3); return num(`How many times greater is [H⁺] in a solution of pH <b>${a1}</b> than in one of pH <b>${a1 + a2}</b>?`, Math.pow(10, a2),
      ["Each pH unit is a factor of 10.", "Count the pH difference and raise 10 to that power.", "Example: pH 2 versus pH 6 is 10⁴ = 10,000 times. Now do yours."], "🧪");
  };
  b.push(les("pH, pOH and hydroxide", [
    ["pH from concentration", "🧪", "<b>pH = −log[H⁺]</b>. If [H⁺] = 1 × 10<sup>-3</sup> mol/dm³, the pH is <b>3</b>. For a strong acid, [H⁺] equals the acid concentration."],
    ["pOH", "🔄", "<b>pOH = −log[OH⁻]</b> and at 25 °C <b>pH + pOH = 14</b>. 0.001 mol/dm³ NaOH: pOH = 3, so pH = 14 − 3 = <b>11</b>."],
    ["Water's balance", "⚖️", "In water, [H⁺] × [OH⁻] = 1 × 10<sup>-14</sup>. A low [H⁺] means a high [OH⁻]. At pH 7 they are equal."]
  ], ["Decide whether you are given H⁺, OH⁻, pH or pOH.", "Convert to pOH or pH, then use pH + pOH = 14.", "Example: [H⁺] = 10⁻² gives pH 2; [OH⁻] = 10⁻² gives pOH 2, pH 12. Now try yours."], [
    phQ, phQ, phQ, phQ, phQ, phQ,
    ["At 25 °C, pH + pOH equals...", "14", "7", "1"]
  ]));

  b.push(mix("Mixed practice", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 16, 17])));
  b.push(mix("Level 20 Challenge", at(b, [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17])));

  // ================= LEVEL 21 =================
  const c = [];

  const orbQ = () => {
    const t = ri(0, 4);
    if (t === 0) { const [s, o] = pick([["s", 1], ["p", 3], ["d", 5], ["f", 7]]); return num(`How many <b>orbitals</b> are there in one <b>${s}</b> sublevel?`, o,
      ["Orbitals are the boxes that hold electrons, two electrons per orbital at most.", "s has the fewest. The pattern runs 1, 3, 5, 7 for s, p, d, f in that order.", "Example: the pattern 1, 3, 5, 7 means a g sublevel (not used in school chemistry) would have 9. Now do yours."], "📦"); }
    if (t === 1) { const [s, o] = pick([["s", 2], ["p", 6], ["d", 10], ["f", 14]]); return num(`What is the maximum number of electrons that a full <b>${s}</b> sublevel can hold?`, o,
      ["Each orbital holds up to 2 electrons.", "Multiply the number of orbitals in the sublevel by 2.", "Example: a sublevel with 4 orbitals (not real) would hold 8. Now do yours."], "📦"); }
    if (t === 2) { const n = ri(1, 4); return num(`What is the maximum number of electrons in the shell with <b>n = ${n}</b>? (Use 2n².)`, 2 * n * n,
      ["The formula is given in the question.", "Square n first, then double it.", "Example: n = 5 would be 2 × 25 = 50. Now do yours."], "📦"); }
    if (t === 3) { const n = ri(1, 4); return num(`How many <b>sublevels</b> does the shell with <b>n = ${n}</b> have?`, n,
      ["Shell 1 has 1 sublevel (1s); shell 2 has 2 (2s and 2p).", "The number of sublevels equals the shell number.", "Example: n = 5 would have 5 sublevels. Now do yours."], "📦"); }
    const n = ri(1, 4); return num(`How many <b>orbitals</b> are there in total in the shell with <b>n = ${n}</b>? (Use n².)`, n * n,
      ["Each shell has n² orbitals.", "Square the shell number.", "Example: n = 5 would have 25 orbitals. Now do yours."], "📦");
  };
  c.push(les("Shells, sublevels and orbitals", [
    ["Nested boxes", "📦", "Each shell (n = 1, 2, 3...) contains <b>sublevels</b>, and each sublevel contains <b>orbitals</b>. An orbital is a region where an electron is likely to be found. It holds at most <b>2 electrons</b>."],
    ["Counting", "🔢", "<b>s</b> has 1 orbital (2 e⁻), <b>p</b> has 3 (6 e⁻), <b>d</b> has 5 (10 e⁻), <b>f</b> has 7 (14 e⁻). Shell n has <b>n sublevels</b>, <b>n² orbitals</b> and holds up to <b>2n² electrons</b>."],
    ["Pauli", "↕️", "The <b>Pauli exclusion principle</b>: two electrons in the same orbital must have opposite spins. So an orbital never holds more than 2 electrons."]
  ], ["Think in layers: shell, then sublevel, then orbital.", "Orbitals × 2 gives electrons. The shell number gives n, n², and 2n².", "Example: n = 3 has 3 sublevels (s, p, d), 9 orbitals and 18 electrons. Now try yours."], [
    orbQ, orbQ, orbQ, orbQ, orbQ,
    ["The Pauli exclusion principle says an orbital holds at most...", "2 electrons with opposite spins", "8 electrons", "1 electron"],
    ["Which sublevel has 5 orbitals?", "d", "p", "s"]
  ]));

  // full configurations to krypton
  const cfg4 = z => {
    if (z === 24) return { s: 1, d: 5, p: 0 };
    if (z === 29) return { s: 1, d: 10, p: 0 };
    const r = z - 18, s = Math.min(2, r), d = Math.min(10, r - s), p = r - s - d;
    return { s, d, p };
  };
  const cfg4s = z => { const { s, d, p } = cfg4(z); return "[Ar] " + (d ? `3d${sup(d)} ` : "") + `4s${sup(s)}` + (p ? ` 4p${sup(p)}` : ""); };
  const Z4 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  const cfgBigQ = () => {
    const z = pick(Z4), t = ri(0, 3), { s, d, p } = cfg4(z);
    const exs = z === 26 ? 28 : 26, ex = cfg4(exs);
    if (t === 0) return num(`How many electrons are in the <b>3d</b> sublevel of a ${NAMES[z]} atom (atomic number ${z})?`, d,
      ["Fill 1s 2s 2p 3s 3p, which uses 18 electrons. Then 4s fills before 3d.", "After argon's 18, put 2 into 4s, then fill 3d with the next electrons until it is full. (Chromium and copper are exceptions.)", `Example: ${NAMES[exs]} (Z = ${exs}) is ${cfg4s(exs)}, so its 3d holds ${ex.d}. Now do yours.`], "📚");
    if (t === 1) return num(`How many electrons are in the <b>4s</b> sublevel of a ${NAMES[z]} atom (atomic number ${z})?`, s,
      ["The 4s sublevel is filled before 3d in the neutral atom.", "It takes 2 electrons, except chromium and copper, which keep only 1 (they move an electron to 3d).", `Example: ${NAMES[exs]} (Z = ${exs}) is ${cfg4s(exs)}, so its 4s holds ${ex.s}. Now do yours.`], "📚");
    if (t === 2) { const wr = others(Z4.filter(x => x !== z && cfg4s(x) !== cfg4s(z)), z, 3); return { text: `Which is the ground-state electron configuration of <b>${NAMES[z]}</b> (atomic number ${z})?`, choices: shuf([z, ...wr].map(cfg4s)), answer: cfg4s(z), visual: "📚",
      hints: ["Start from argon's [Ar] core, which accounts for 18 electrons.", "Add the remaining electrons: 4s first (2), then 3d (up to 10), then 4p. Check your total equals the atomic number.", `Example: ${NAMES[exs]} (Z = ${exs}): ${exs} − 18 = ${exs - 18} left, giving ${cfg4s(exs)}. Now do yours.`] }; }
    const q = pick(Z4.filter(x => cfg4(x).p > 0)), { p: pp } = cfg4(q);
    return num(`How many electrons are in the <b>4p</b> sublevel of a ${NAMES[q]} atom (atomic number ${q})?`, pp,
      ["Gallium onward have electrons in 4p, after 4s and 3d are full.", "Atomic number − 30 gives the 4p electrons for elements from gallium to krypton (4s² 3d¹⁰ already hold 30 − 18 = 12).", `Example: ${NAMES[q === 32 ? 33 : 32]} (Z = ${q === 32 ? 33 : 32}) has ${q === 32 ? 3 : 2} electrons in 4p. Now do yours.`], "📚");
  };
  c.push(les("Electron configurations up to krypton", [
    ["After argon", "📚", "After 3p the next sublevel to fill is <b>4s</b>, not 3d. Order: 1s 2s 2p 3s 3p <b>4s 3d 4p</b>. Potassium is [Ar] 4s¹ and calcium is [Ar] 4s²."],
    ["Shorthand", "✂️", "[Ar] stands for argon's 18 electrons. Iron (Z = 26): [Ar] 3d⁶ 4s². Zinc (Z = 30): [Ar] 3d¹⁰ 4s². Gallium onward add 4p: Ga is [Ar] 3d¹⁰ 4s² 4p¹."],
    ["Two exceptions", "⭐", "Half-filled and full d sublevels are extra stable. <b>Chromium</b> is [Ar] 3d⁵ 4s¹ (not 3d⁴ 4s²) and <b>copper</b> is [Ar] 3d¹⁰ 4s¹ (not 3d⁹ 4s²)."]
  ], ["Always check the total electrons equals the atomic number.", "Take away 18 for [Ar]. Then 4s, then 3d, then 4p.", "Example: manganese (Z = 25): 7 electrons after argon: 4s² 3d⁵. Now try yours."], [
    cfgBigQ, cfgBigQ, cfgBigQ, cfgBigQ, cfgBigQ,
    ["Which of these is an exception that has a 4s¹ configuration?", "Chromium", "Iron", "Zinc"],
    ["Which sublevel fills first?", "4s", "3d", "4p"]
  ]));

  const UNP = [["nitrogen", "2p³", 3, "Ar"], ["oxygen", "2p⁴", 2], ["fluorine", "2p⁵", 1], ["neon", "2p⁶", 0], ["carbon", "2p²", 2], ["boron", "2p¹", 1], ["aluminium", "3p¹", 1], ["phosphorus", "3p³", 3], ["sulfur", "3p⁴", 2], ["chlorine", "3p⁵", 1], ["iron", "3d⁶ (and 4s²)", 4], ["manganese", "3d⁵ (and 4s²)", 5], ["cobalt", "3d⁷ (and 4s²)", 3], ["nickel", "3d⁸ (and 4s²)", 2], ["titanium", "3d² (and 4s²)", 2], ["vanadium", "3d³ (and 4s²)", 3], ["zinc", "3d¹⁰ (and 4s²)", 0], ["chromium", "3d⁵ 4s¹", 6], ["copper", "3d¹⁰ 4s¹", 1], ["magnesium", "3s²", 0]];
  const unpQ = () => {
    const [nm, outer, u] = pick(UNP);
    return num(`The ground-state configuration of <b>${nm}</b> ends with <b>${outer}</b>. Using <b>Hund's rule</b> (fill each orbital in a sublevel with one electron before pairing), how many <b>unpaired</b> electrons does a ${nm} atom have?`, u,
      ["Draw the boxes: p has 3 boxes, d has 5. Put one arrow in each box first.", "Only start pairing arrows after every box in that sublevel has one. For 4s¹ or 3d⁵ together, count the singles in both.", outer.includes("d") ? "Example: 5p⁴ has three boxes: 3 single arrows, then the 4th pairs up, leaving 2 unpaired. Now do yours." : "Example: 4d⁴ has five boxes and only four electrons, so 4 single arrows and 4 unpaired. Now do yours."], "↑");
  };
  c.push(les("Hund's rule and unpaired electrons", [
    ["Boxes and arrows", "↑↓", "Draw each orbital as a box and each electron as an arrow. <b>Hund's rule</b>: put one arrow in every box of a sublevel first, all pointing the same way. Only then pair them up."],
    ["Count the singles", "🔢", "Nitrogen 2p³: three boxes, three single arrows → <b>3 unpaired</b>. Oxygen 2p⁴: one box pairs up → <b>2 unpaired</b>. Neon 2p⁶: all paired → 0."],
    ["Transition metals", "🧲", "d has 5 boxes. Fe 3d⁶: 5 single arrows + 1 pair = <b>4 unpaired</b>. Atoms with unpaired electrons are attracted to magnets (<b>paramagnetic</b>)."]
  ], ["Sketch the boxes for the sublevel (p = 3, d = 5).", "Fill singles first, then pair up the extra electrons.", "Example: 3d⁷ has 5 singles and 2 extra that pair up, leaving 3 unpaired. Now try yours."], [
    unpQ, unpQ, unpQ, unpQ, unpQ,
    ["An atom with unpaired electrons is attracted to a magnet. This is called...", "Paramagnetic", "Diamagnetic", "Radioactive"],
    ["Hund's rule says to put electrons in separate orbitals of a sublevel...", "Before pairing them", "After pairing them", "Only in s orbitals"]
  ]));

  const waveQ = () => {
    const t = ri(0, 1);
    if (t === 0) { const nu = pick([3, 4, 5, 6, 7.5, 10, 12, 15, 20, 30]); return num(`Light has a frequency of <b>${nu} × 10<sup>14</sup> Hz</b>. Use c = λν with c = 3 × 10<sup>8</sup> m/s. What is its wavelength in <b>nm</b>? (1 m = 10<sup>9</sup> nm.)`, 3000 / nu,
      ["Wavelength = speed ÷ frequency.", "Divide 3 × 10⁸ by the frequency, then change metres to nm. A shortcut: 3000 ÷ (frequency in units of 10¹⁴ Hz) gives nm.", "Example: ν = 5 × 10¹⁴ Hz gives λ = 3 × 10⁸ ÷ 5 × 10¹⁴ = 6 × 10⁻⁷ m = 600 nm. Now do yours."], "🌈"); }
    const lam = pick([300, 400, 500, 600, 750, 1000]); return num(`Light has a wavelength of <b>${lam} nm</b>. Use c = λν with c = 3 × 10<sup>8</sup> m/s. What is its frequency in units of <b>10<sup>14</sup> Hz</b>? (1 nm = 10<sup>-9</sup> m.)`, 3000 / lam,
      ["Frequency = speed ÷ wavelength, with the wavelength in metres.", "A shortcut: 3000 ÷ (wavelength in nm) gives the frequency in units of 10¹⁴ Hz.", "Example: λ = 200 nm gives ν = 3000 ÷ 200 = 15 × 10¹⁴ Hz. Now do yours."], "🌈");
  };
  c.push(les("Waves, light and energy", [
    ["Wave facts", "🌊", "All electromagnetic waves travel at <b>c = 3 × 10⁸ m/s</b> in a vacuum. <b>c = λν</b> (wavelength × frequency). Longer wavelength means lower frequency."],
    ["Energy", "⚡", "<b>E = hν</b>. Higher frequency (shorter wavelength) means <b>more energy per photon</b>. Gamma rays and X-rays carry a lot; radio waves carry little."],
    ["The spectrum in order", "🌈", "From low to high energy: radio, microwave, infrared, <b>red → violet</b> (visible), ultraviolet, X-ray, gamma ray."],
    ["Worked example", "✏️", "λ = 400 nm: ν = 3 × 10⁸ ÷ 4 × 10⁻⁷ = 7.5 × 10¹⁴ Hz (violet light)."]
  ], ["Use c = λν and get the units straight (m or nm).", "Divide the speed of light by the one you know.", "Example: λ = 600 nm gives ν = 3000 ÷ 600 = 5 (× 10¹⁴ Hz). Now try yours."], [
    waveQ, waveQ, waveQ, waveQ,
    ["Which has more energy per photon?", "Ultraviolet light", "Infrared light", "Radio waves"],
    ["Which visible colour has the shortest wavelength?", "Violet", "Red", "Green"],
    ["If the wavelength of light doubles, its frequency...", "Halves", "Doubles", "Stays the same"],
    ["Which wave has the longest wavelength?", "Radio wave", "X-ray", "Gamma ray"]
  ]));

  const bohrQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const [a1, b1, e] = pick([[2, 1, 10.2], [3, 1, 12.1], [3, 2, 1.9]]); return num(`Hydrogen energy levels: n = 1 is −13.6 eV, n = 2 is −3.4 eV, n = 3 is −1.5 eV. How much energy (eV) is released as a photon when an electron falls from <b>n = ${a1}</b> to <b>n = ${b1}</b>?`, e,
      ["The photon carries away the difference between the two energy levels.", "Energy = (the higher level) − (the lower level). Both are negative; subtract carefully so your answer is positive.", "Example: n = 4 at −0.85 eV falling to n = 2 at −3.4 eV releases 3.4 − 0.85 = 2.55 eV. Now do yours."], "💡"); }
    if (t === 1) { const k = ri(3, 5); return num(`An electron is in level <b>n = ${k}</b> of an atom and can fall down to any lower level, in one jump or in steps. How many <b>different jumps</b> (spectral lines) are possible?`, k * (k - 1) / 2,
      ["List the lower levels the electron can reach from the top level, then from the next one down.", "From the top level, count the jumps to every lower level; then from the next level, and so on. The total is k(k − 1) ÷ 2.", "Example: from n = 2 there is only 1 jump (2 → 1). With n = 6 there would be 6 × 5 ÷ 2 = 15 jumps. Now do yours."], "💡"); }
    return mcq(`An electron in an excited atom drops from a high energy level to a lower one. What happens?`, "A photon of light is emitted", ["A photon is absorbed", "A proton leaves the nucleus", "The atom turns into a different element"],
      ["Energy must go somewhere when the electron loses energy.", "Dropping down means losing energy, released as light.", "Example: neon signs glow because excited electrons drop and give out light. Now do yours."], "💡");
  };
  c.push(les("Bohr model and emission spectra", [
    ["Energy levels", "🪜", "In the Bohr model electrons have fixed <b>energy levels</b> (n = 1, 2, 3...). They cannot sit in between. Level 1 has the lowest energy."],
    ["Jumping", "💡", "An electron <b>absorbs</b> exactly the right energy to jump up (excited state). When it falls back down, it <b>emits</b> a photon with energy equal to the gap."],
    ["Line spectrum", "🌈", "Because the gaps are fixed, each element emits only certain colours: a <b>line spectrum</b>, like a fingerprint. This is how we identify elements in stars."],
    ["Worked example", "✏️", "Hydrogen: n = 2 is −3.4 eV and n = 1 is −13.6 eV. Falling 2 → 1 releases 13.6 − 3.4 = <b>10.2 eV</b>."]
  ], ["Think about energy gaps between levels.", "A larger gap means a photon with more energy (shorter wavelength).", "Example: a jump from n = 4 to n = 1 is bigger than 4 to 3, so it gives out a higher-energy photon. Now try yours."], [
    bohrQ, bohrQ, bohrQ, bohrQ,
    ["Why does each element have its own line spectrum?", "Its energy levels have fixed gaps", "Its atoms are different colours", "Its atoms are different sizes"],
    ["Which jump gives out the highest-energy photon?", "n = 3 to n = 1", "n = 3 to n = 2", "n = 2 to n = 3"],
    ["An electron moves to a higher level when it...", "Absorbs energy", "Emits energy", "Loses a proton"]
  ]));

  const sieQ = () => {
    const k = ri(1, 4); const arr = []; let v = ri(4, 9) * 100;
    for (let i = 0; i < 6; i++) { arr.push(Math.round(v / 10) * 10); v = i + 1 === k ? v * 6 : v * (i + 1 < k ? 1.9 : 1.4); }
    const t = ri(0, 1);
    if (t === 0) return num(`The first six ionization energies (kJ/mol) of an element are <b>${arr.join(", ")}</b>. How many <b>valence electrons</b> does the element have? (Look for the big jump.)`, k,
      ["Ionization energies rise a little each time an electron is removed from the same shell.", "A huge jump shows you have started removing an electron from an inner shell. The number of values before the jump is your answer.", "Example: 520, 7300, 11800, 15000: the jump after the first value means 1 valence electron. Now do yours."], "📈");
    const grp = k <= 2 ? k : k + 10;
    return num(`The first six ionization energies (kJ/mol) of an element are <b>${arr.join(", ")}</b>. Which <b>group number</b> is the element in?`, grp,
      ["Find the big jump first; it comes after all the valence electrons are removed.", "Count the values before the jump. Groups 1 and 2: group number = valence electrons. Groups 13+: group = valence + 10.", "Example: a jump after 4 values means 4 valence electrons: group 14. Now do yours."], "📈");
  };
  c.push(les("Successive ionization energies", [
    ["One at a time", "🔓", "<b>Ionization energy</b> is the energy needed to remove an electron. You can remove a second, third and so on. Each one costs more, because the ion is more positive and holds on tighter."],
    ["The big jump", "📈", "When you start removing an electron from an <b>inner shell</b>, the energy leaps up (about 5 to 10 times). The jump shows how many <b>valence electrons</b> the atom has."],
    ["Reading data", "🔍", "Magnesium: 738, 1451, then 7733. The jump after the 2nd means <b>2 valence electrons</b>, so group 2."],
    ["Trends", "🧭", "IE rises across a period (more protons, same shell) and falls down a group (outer electron is further away and shielded)."]
  ], ["Compare each value with the one before it.", "The first huge increase marks the end of the valence electrons.", "Example: 578, 1817, 2745, 11577: the jump comes after 3 values, so 3 valence electrons (group 13). Now try yours."], [
    sieQ, sieQ, sieQ, sieQ,
    ["Why does ionization energy fall going down a group?", "The outer electron is further from the nucleus and shielded", "The nucleus has fewer protons", "Atoms get smaller"],
    ["Why does ionization energy generally rise across a period?", "More protons pull on electrons in the same shell", "More shells are added", "Electrons become heavier"]
  ]));

  const SHAPES = [["BeCl2", 2, 0, "Linear", 180], ["CO2", 2, 0, "Linear", 180], ["BF3", 3, 0, "Trigonal planar", 120], ["SO2", 2, 1, "Bent", 119], ["CH4", 4, 0, "Tetrahedral", 109.5], ["CCl4", 4, 0, "Tetrahedral", 109.5], ["NH3", 3, 1, "Trigonal pyramidal", 107], ["PH3", 3, 1, "Trigonal pyramidal", 107], ["H2O", 2, 2, "Bent", 104.5], ["H2S", 2, 2, "Bent", 92], ["PCl5", 5, 0, "Trigonal bipyramidal", 90], ["SF6", 6, 0, "Octahedral", 90]];
  const SHN = ["Linear", "Trigonal planar", "Bent", "Tetrahedral", "Trigonal pyramidal", "Trigonal bipyramidal", "Octahedral"];
  const shapeQ = () => {
    const [f, bp, lp, sh] = pick(SHAPES), t = ri(0, 2);
    if (t === 0) return num(`In <b>${fmt(f)}</b> the central atom has ${bp} bonded atoms and ${lp} lone pair${lp === 1 ? "" : "s"}. How many <b>electron domains</b> (regions of electrons) surround it?`, bp + lp,
      ["Count every region of electrons around the centre: each bonded atom and each lone pair.", "A double or triple bond still counts as just one region. Add bonded atoms and lone pairs.", "Example: a centre with 5 bonded atoms and 1 lone pair has 5 + 1 = 6 domains. Now do yours."], "🔷");
    return mcq(`What is the shape of a <b>${fmt(f)}</b> molecule? (Central atom: ${bp} bonded atoms, ${lp} lone pair${lp === 1 ? "" : "s"}.)`, sh, others(SHN, sh, 3),
      ["Count the electron domains first.", "Domains spread out as far apart as possible. Lone pairs take up space but are not part of the named shape, so they change it.", "Example: 4 domains with 1 lone pair gives a pyramid shape; with 2 lone pairs it is bent. Now do yours."], "🔷");
  };
  c.push(les("VSEPR: predicting shapes", [
    ["Electrons repel", "🔷", "<b>VSEPR</b>: electron domains around a central atom repel and spread as far apart as they can. A domain is a bonded atom (single, double or triple) or a lone pair."],
    ["Shapes", "📐", "2 domains: <b>linear</b> 180°. 3: <b>trigonal planar</b> 120°. 4: <b>tetrahedral</b> 109.5°. 5: trigonal bipyramidal. 6: <b>octahedral</b> 90°."],
    ["Lone pairs", "👥", "Lone pairs push harder than bonds. 4 domains: CH₄ (0 lone pairs) is tetrahedral; NH₃ (1) is <b>trigonal pyramidal</b> (107°); H₂O (2) is <b>bent</b> (104.5°). 3 domains with 1 lone pair (SO₂) is also bent."]
  ], ["First count domains, then count lone pairs.", "No lone pairs: the shape follows the number of domains. With lone pairs the shape loses those positions.", "Example: 3 domains with no lone pair is flat triangle; with a lone pair, bent. Now try yours."], [
    shapeQ, shapeQ, shapeQ, shapeQ, shapeQ,
    ["Which has the bond angle closest to 109.5°?", "CH₄", "CO₂", "BF₃"],
    ["A water molecule is bent because the oxygen has...", "Two lone pairs", "No lone pairs", "Three bonds"]
  ]));

  const POL = [["H2O", "Polar"], ["NH3", "Polar"], ["HCl", "Polar"], ["SO2", "Polar"], ["CHCl3", "Polar"], ["CH3Cl", "Polar"], ["H2S", "Polar"], ["CO2", "Nonpolar"], ["CH4", "Nonpolar"], ["CCl4", "Nonpolar"], ["BF3", "Nonpolar"], ["O2", "Nonpolar"], ["N2", "Nonpolar"], ["SF6", "Nonpolar"], ["BeCl2", "Nonpolar"]];
  c.push(les("Polar and nonpolar molecules", [
    ["Two questions", "🧲", "A molecule is polar if (1) it has <b>polar bonds</b> and (2) its shape is <b>not symmetrical</b>, so the pulls do not cancel."],
    ["Cancelling", "⚖️", "CO₂ has two polar C=O bonds, but they point opposite ways (linear), so they cancel: <b>nonpolar</b>. CCl₄ is tetrahedral with four equal pulls: <b>nonpolar</b>."],
    ["Not cancelling", "💧", "H₂O is bent, so the pulls add up: <b>polar</b>. NH₃ (pyramidal) and CHCl₃ (three Cl, one H) are polar too."],
    ["Like dissolves like", "🧪", "Polar solvents (water) dissolve polar substances. Nonpolar solvents (oil) dissolve nonpolar substances. Oil and water do not mix."]
  ], ["Picture the shape and the direction of each bond's pull.", "If the pulls cancel completely, the molecule is nonpolar. If they leave one side more negative, it is polar.", "Example: BCl₃ is a flat triangle with three equal pulls that cancel, so it is nonpolar. Now try yours."], [
    ...POL.map(([f, p]) => () => mcq(`Is a molecule of <b>${fmt(f)}</b> polar or nonpolar?`, p, [p === "Polar" ? "Nonpolar" : "Polar"],
      ["Think about its shape (use VSEPR).", "Symmetrical shape with identical outer atoms: the pulls cancel. Uneven shape or different outer atoms: they do not.", "Example: PCl₃ is a pyramid, so the pulls do not cancel; it is polar. Now do yours."], "🧲")),
    ["Which dissolves best in water?", "A polar substance", "A nonpolar substance", "All substances equally"],
    ["Oil and water do not mix because...", "Oil is nonpolar and water is polar", "They are both nonpolar", "They are both polar"]
  ]));

  const IMFS = [["HF", "Hydrogen bonding"], ["H2O", "Hydrogen bonding"], ["NH3", "Hydrogen bonding"], ["CH3OH", "Hydrogen bonding"], ["HCl", "Dipole-dipole forces"], ["H2S", "Dipole-dipole forces"], ["CH3Cl", "Dipole-dipole forces"], ["SO2", "Dipole-dipole forces"], ["CH4", "London dispersion forces"], ["CO2", "London dispersion forces"], ["Ar", "London dispersion forces"], ["Cl2", "London dispersion forces"]];
  const BPP = [["H2O", "H2S"], ["NH3", "PH3"], ["HF", "HCl"], ["C2H6", "CH4"], ["Br2", "Cl2"], ["Ar", "Ne"], ["C4H10", "C2H6"], ["CH3OH", "CH3CH3"], ["I2", "Br2"]];
  const bpQ = () => {
    const [hi, lo] = pick(BPP), flip = Math.random() < 0.5;
    const why = ["H2O", "NH3", "HF", "CH3OH"].includes(hi) ? "hydrogen bonding" : "larger, more electrons";
    return mcq(`Which substance has the <b>higher boiling point</b>: ${fmt(flip ? lo : hi)} or ${fmt(flip ? hi : lo)}?`, fmt(hi), [fmt(lo), "They boil at the same temperature"],
      ["Compare the strength of the forces between molecules.", "Hydrogen bonds (H attached to N, O or F) are strongest. Otherwise bigger molecules with more electrons have stronger London forces.", "Example: C₃H₈ boils higher than CH₄ because it is bigger. Now do yours."], "🌡️");
  };
  c.push(les("Intermolecular forces and boiling points", [
    ["Three kinds", "🧲", "<b>London dispersion</b>: in every molecule, stronger when molecules are bigger. <b>Dipole-dipole</b>: between polar molecules. <b>Hydrogen bonding</b>: H bonded to N, O or F, attracted to a lone pair on another N, O or F. It is the strongest of the three."],
    ["Boiling point", "🌡️", "Stronger forces between molecules mean more energy is needed to separate them: a <b>higher boiling point</b>. Water (H-bonds) boils at 100 °C but H₂S (no H-bonds) is a gas at room temperature."],
    ["Size matters", "📏", "Among nonpolar molecules, bigger means more electrons and stronger London forces: CH₄ < C₂H₆ < C₄H₁₀; F₂ < Cl₂ < Br₂ < I₂."],
    ["Not the bonds", "⚠️", "Boiling a covalent substance breaks the forces <b>between</b> molecules, not the covalent bonds inside them."]
  ], ["Identify the strongest force each substance has.", "Hydrogen bond beats dipole-dipole beats London (for similar sizes). Bigger molecules have stronger London forces.", "Example: ethanol (has O–H) boils higher than propane. Now try yours."], [
    ...IMFS.map(([f, t]) => () => mcq(`What is the <b>strongest</b> intermolecular force in <b>${fmt(f)}</b>?`, t, others(["Hydrogen bonding", "Dipole-dipole forces", "London dispersion forces", "Ionic bonding"], t, 3),
      ["Is the molecule polar? Does it have H bonded to N, O or F?", "H on N, O or F: hydrogen bonding. Polar without that: dipole-dipole. Nonpolar: only London forces.", "Example: CH₃F is polar without O–H, N–H or F–H, so it has dipole-dipole forces. Now do yours."], "🧲")),
    bpQ, bpQ, bpQ,
    ["When water boils, which are broken?", "Hydrogen bonds between molecules", "O–H covalent bonds", "Nuclei"]
  ]));

  const SP = [["ethene, C₂H₄", 5, 1], ["ethyne, C₂H₂", 3, 2], ["carbon dioxide, CO₂", 2, 2], ["nitrogen, N₂", 1, 2], ["hydrogen cyanide, HCN", 2, 2], ["ethane, C₂H₆", 7, 0], ["methane, CH₄", 4, 0], ["oxygen, O₂", 1, 1], ["methanal, H₂C=O", 3, 1], ["ethanol, CH₃CH₂OH", 8, 0], ["ethanal, CH₃CHO", 6, 1], ["water, H₂O", 2, 0]];
  const spQ = () => { const [nm, s, p] = pick(SP), askS = Math.random() < 0.5;
    return num(`How many <b>${askS ? "sigma (σ)" : "pi (π)"} bonds</b> are in one molecule of ${nm}?`, askS ? s : p,
      ["Every bond has one sigma bond. Extra bonds in double and triple bonds are pi bonds.", "Single = 1σ. Double = 1σ + 1π. Triple = 1σ + 2π. Count each bond in the structure.", "Example: propene CH₃CH=CH₂ has 8 σ bonds (including the C=C sigma) and 1 π bond. Now do yours."], "🔗"); };
  c.push(les("Sigma and pi bonds", [
    ["Two kinds of overlap", "🔗", "A <b>sigma (σ)</b> bond forms by head-on overlap along the line between the nuclei. A <b>pi (π)</b> bond forms by sideways overlap above and below that line."],
    ["Counting", "🔢", "Single bond = <b>1σ</b>. Double bond = <b>1σ + 1π</b>. Triple bond = <b>1σ + 2π</b>. Ethene H₂C=CH₂: 4 C–H + 1 C–C sigma = <b>5σ</b>, and <b>1π</b>."],
    ["Strength and shape", "💪", "Pi bonds are weaker than sigma bonds and stop rotation around a double bond. That is why alkenes are more reactive than alkanes."]
  ], ["Draw the structure with every bond shown.", "Count all bonds as sigma; then add pi bonds for each extra line in doubles and triples.", "Example: HC≡CH has 3 σ (2 C–H, 1 C–C) and 2 π. Now try yours."], [
    spQ, spQ, spQ, spQ, spQ, spQ,
    ["A triple bond is made of...", "One sigma and two pi bonds", "Three sigma bonds", "Two sigma and one pi bond"]
  ]));

  const MOLAL = [["NaOH", 40], ["KOH", 56], ["glucose, C₆H₁₂O₆", 180], ["glycerol, C₃H₈O₃", 92], ["ethanol, C₂H₅OH", 46], ["urea, CH₄N₂O", 60]];
  const molalQ = () => {
    const [nm, M] = pick(MOLAL), n = pick([0.5, 1, 1.5, 2, 3]), kg = pick([0.5, 1, 2]);
    if (Math.random() < 0.65) return num(`<b>${n * M} g</b> of ${nm} (molar mass ${M} g/mol) is dissolved in <b>${kg * 1000} g</b> of water. What is the <b>molality</b> (mol of solute per kg of solvent)?`, n / kg,
      ["First turn the grams of solute into moles.", "Molality = moles of solute ÷ kilograms of solvent. Remember to change grams of water to kg.", "Example: 2 mol of solute in 500 g of water (0.5 kg) is 2 ÷ 0.5 = 4 mol/kg. Now do yours."], "🧪");
    return num(`A solution has a molality of <b>${n / kg} mol/kg</b>. How many moles of ${nm} are dissolved in <b>${kg} kg</b> of water?`, n,
      ["Molality tells you the moles per kilogram of solvent.", "Moles = molality × kilograms of solvent.", "Example: 0.5 mol/kg in 4 kg of water means 2 mol. Now do yours."], "🧪");
  };
  c.push(les("Molality", [
    ["Another concentration", "⚖️", "<b>Molality (m)</b> = moles of solute ÷ <b>kilograms of solvent</b>. Molarity uses litres of solution, but molality uses the mass of the solvent only."],
    ["Why use it?", "🌡️", "Mass does not change with temperature, but volume does. So molality stays the same when a solution is heated or cooled. That makes it perfect for freezing and boiling point work."],
    ["Worked example", "✏️", "180 g of glucose (M = 180) is 1 mol. Dissolved in 500 g of water (0.5 kg): molality = 1 ÷ 0.5 = <b>2 mol/kg</b>."]
  ], ["Moles of solute on top. Kilograms of solvent on the bottom.", "Change grams to moles first and grams of water to kg.", "Example: 0.5 mol in 250 g (0.25 kg) of solvent is 2 mol/kg. Now try yours."], [
    molalQ, molalQ, molalQ, molalQ, molalQ,
    ["Molality is moles of solute per kilogram of...", "Solvent", "Solution", "Solute"],
    ["Why is molality unaffected by temperature?", "Mass does not change with temperature", "Moles change with temperature", "Water has no mass"]
  ]));

  const COL = [["glucose", 1], ["sucrose", 1], ["NaCl", 2], ["KNO₃", 2], ["CaCl₂", 3], ["Na₂SO₄", 3], ["AlCl₃", 4]];
  const colQ = () => {
    const [nm, i] = pick(COL), m = pick([0.5, 1, 1.5, 2]), t = ri(0, 1);
    if (t === 0) return num(`A ${m} mol/kg solution of ${nm} in water (van't Hoff factor <b>i = ${i}</b>). Use ΔT<sub>f</sub> = i × K<sub>f</sub> × m with K<sub>f</sub> = 2 °C·kg/mol (rounded). By how many °C is the freezing point <b>lowered</b>?`, i * 2 * m,
      ["Multiply the three numbers together.", "ΔT = i × Kf × m. Here Kf = 2.", "Example: i = 2, m = 1.5 gives 2 × 2 × 1.5 = 6 °C. Now do yours."], "❄️");
    return num(`A ${m} mol/kg solution of ${nm} in water (van't Hoff factor <b>i = ${i}</b>). Use ΔT<sub>b</sub> = i × K<sub>b</sub> × m with K<sub>b</sub> = 0.5 °C·kg/mol (rounded). What is the <b>boiling point</b> of the solution in °C? (Pure water boils at 100 °C.)`, 100 + i * 0.5 * m,
      ["First calculate how many degrees the boiling point rises.", "ΔT = i × Kb × m, then add it to 100 °C.", "Example: i = 3, m = 1 gives ΔT = 1.5, so the boiling point is 101.5 °C. Now do yours."], "♨️");
  };
  c.push(les("Freezing and boiling point changes", [
    ["Colligative properties", "🧊", "Some properties depend only on the <b>number of dissolved particles</b>, not what they are. Dissolving a solute <b>lowers the freezing point</b> and <b>raises the boiling point</b>."],
    ["The formulas", "🧮", "<b>ΔT = i × K × m</b>, with K<sub>f</sub> (water) ≈ 1.86 and K<sub>b</sub> ≈ 0.51 °C·kg/mol. The <b>van't Hoff factor i</b> counts particles: glucose 1, NaCl 2, CaCl₂ 3."],
    ["Why salt on roads", "🛣️", "Salt dissolves in the thin water layer on ice and lowers its freezing point, so ice melts at temperatures below 0 °C. Salts such as CaCl₂ give 3 particles per unit, so they work even better."]
  ], ["Count the particles each formula unit gives (i).", "Multiply i × K × molality. Add it to 100 for boiling; subtract from 0 for freezing.", "Example: NaCl at 1 mol/kg: i = 2, so ΔT = 2 × 2 × 1 = 4 °C of freezing point drop (with K = 2). Now try yours."], [
    colQ, colQ, colQ, colQ,
    ["Which 0.1 mol/kg solution freezes at the lowest temperature?", "CaCl₂", "NaCl", "Glucose"],
    ["Adding a solute to water makes the boiling point...", "Higher", "Lower", "The same"],
    ["Colligative properties depend on the...", "Number of dissolved particles", "Colour of the solute", "Mass of one particle only"]
  ]));

  const SOLQ = [["Na​NO₃", "Soluble"], ["KCl", "Soluble"], ["(NH₄)₂CO₃", "Soluble"], ["Na₃PO₄", "Soluble"], ["MgCl₂", "Soluble"], ["CuSO₄", "Soluble"], ["AgCl", "Insoluble"], ["BaSO₄", "Insoluble"], ["PbI₂", "Insoluble"], ["CaCO₃", "Insoluble"], ["Fe(OH)₃", "Insoluble"], ["CuS", "Insoluble"], ["ZnCO₃", "Insoluble"]];
  const PREC = [["AgNO₃", "NaCl", "AgCl", "Na​NO₃"], ["Pb(NO₃)₂", "KI", "PbI₂", "KNO₃"], ["BaCl₂", "Na₂SO₄", "BaSO₄", "NaCl"], ["CuSO₄", "NaOH", "Cu(OH)₂", "Na₂SO₄"], ["Na₂CO₃", "CaCl₂", "CaCO₃", "NaCl"], ["FeCl₃", "NaOH", "Fe(OH)₃", "NaCl"], ["Na₂S", "Cu(NO₃)₂", "CuS", "Na​NO₃"]];
  c.push(les("Solubility rules and precipitates", [
    ["Dissolve or not?", "💧", "Rules of thumb: all <b>nitrates</b>, group 1 salts and <b>ammonium</b> salts are soluble. Most <b>chlorides</b> are soluble (not Ag⁺, Pb²⁺). Most <b>sulfates</b> are soluble (not Ba²⁺, Pb²⁺)."],
    ["The insoluble ones", "🧱", "Most <b>carbonates, hydroxides, phosphates and sulfides</b> are insoluble, except those of group 1 and ammonium."],
    ["Precipitates", "☁️", "Mixing two soluble salt solutions swaps partners. If one new combination is <b>insoluble</b> it appears as a solid: a <b>precipitate</b>. AgNO₃ + NaCl → <b>AgCl(s)</b> + Na​NO₃."]
  ], ["Check the rules for the anion first, then the cation exceptions.", "Swap the partners. The new compound that breaks the solubility rules is the precipitate.", "Example: K₂SO₄ + BaCl₂ swaps to BaSO₄ (insoluble) and KCl (soluble). Now try yours."], [
    ...SOLQ.map(([f, s]) => () => mcq(`Is <b>${f}</b> soluble or insoluble in water?`, s, [s === "Soluble" ? "Insoluble" : "Soluble"],
      ["Look at the negative ion (nitrate, chloride, sulfate, carbonate...) and the metal.", "Nitrates, group 1 and ammonium are always soluble. Carbonates, hydroxides, phosphates and sulfides are mostly not.", "Example: Li₂CO₃ is soluble (group 1), but MgCO₃ is not. Now do yours."], "💧")),
    ...PREC.map(([x, y, p, q]) => () => mcq(`Solutions of <b>${x}</b> and <b>${y}</b> are mixed. What precipitate forms?`, p, [q, "No precipitate forms", x],
      ["Swap the metal ions to make two new compounds.", "One of them breaks the solubility rules. Check each new compound.", "Example: KBr + AgNO₃ swaps to KNO₃ (soluble) and AgBr (insoluble), so AgBr is the solid. Now do yours."], "☁️"))
  ]));

  const NET = [["AgNO₃ + NaCl", "Na⁺ and NO₃⁻", "Ag⁺ + Cl⁻ → AgCl(s)"], ["BaCl₂ + Na₂SO₄", "Na⁺ and Cl⁻", "Ba²⁺ + SO₄²⁻ → BaSO₄(s)"], ["Pb(NO₃)₂ + 2KI", "K⁺ and NO₃⁻", "Pb²⁺ + 2I⁻ → PbI₂(s)"], ["CuSO₄ + 2NaOH", "Na⁺ and SO₄²⁻", "Cu²⁺ + 2OH⁻ → Cu(OH)₂(s)"], ["HCl + NaOH", "Na⁺ and Cl⁻", "H⁺ + OH⁻ → H₂O"], ["CaCl₂ + Na₂CO₃", "Na⁺ and Cl⁻", "Ca²⁺ + CO₃²⁻ → CaCO₃(s)"]];
  c.push(les("Net ionic equations", [
    ["Spectators", "👀", "In water, soluble salts exist as separate ions. Ions that are in the solution before and after and do not change are <b>spectator ions</b>."],
    ["The net equation", "✂️", "Cross out the spectators. What remains is the <b>net ionic equation</b>, showing only the ions that actually react."],
    ["Worked example", "✏️", "AgNO₃ + NaCl → AgCl + Na​NO₃. Full ionic: Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ → AgCl(s) + Na⁺ + NO₃⁻. Spectators: Na⁺, NO₃⁻. Net: <b>Ag⁺ + Cl⁻ → AgCl(s)</b>."]
  ], ["Split all the soluble salts into ions.", "Ions that appear unchanged on both sides are spectators. Write what is left.", "Example: KCl + AgNO₃: spectators K⁺ and NO₃⁻, net Ag⁺ + Cl⁻ → AgCl(s). Now try yours."], [
    ...NET.map(([r, sp, ne]) => () => mcq(`In the reaction <b>${r}</b> (a double replacement), which are the <b>spectator ions</b>?`, sp, others([...new Set([...NET.map(x => x[1]), "Ag⁺ and Cl⁻"])], sp, 3),
      ["Find the product that stays dissolved as ions or water.", "The ions that were in solution before and after are the spectators; the ones that join into a solid or water are not.", "Example: in KCl + AgNO₃, K⁺ and NO₃⁻ stay in solution unchanged. Now do yours."], "👀")),
    ...NET.map(([r, sp, ne]) => () => mcq(`What is the <b>net ionic equation</b> for <b>${r}</b>?`, ne, others(NET.map(x => x[2]).filter(x => x !== ne), ne, 3),
      ["Remove the spectator ions.", "Keep only the ions that combine to form a solid, water or gas, and balance the charges.", "Example: KCl + AgNO₃ has net equation Ag⁺ + Cl⁻ → AgCl(s). Now do yours."], "✂️"))
  ]));

  const OXN = [["Cr in K₂Cr₂O₇", 6], ["Mn in KMnO₄", 7], ["S in H₂SO₄", 6], ["N in HNO₃", 5], ["Cl in HClO₄", 7], ["S in SO₃²⁻", 4], ["C in CO₃²⁻", 4], ["Fe in Fe₂O₃", 3], ["N in NO₂", 4], ["P in H₃PO₄", 5], ["Cl in KClO₃", 5], ["Mn in MnO₂", 4], ["Cr in CrO₄²⁻", 6], ["Cr in Cr₂O₇²⁻", 6], ["Cl in ClO⁻", 1], ["N in NO₃⁻", 5], ["S in SO₄²⁻", 6]];
  const oxQ = () => { const [t, v] = pick(OXN); return num(`What is the oxidation number of <b>${t}</b>? (Give the number without a sign; it is positive.)`, v,
    ["Oxygen is usually −2 and hydrogen is +1; group 1 metals are +1.", "The oxidation numbers add up to the charge of the species (0 for a neutral compound). Set up: unknown × number of atoms + the others = total charge.", "Example: N in KNO₂: +1 + x + 2(−2) = 0, so x = +3. Now do yours."], "🔢"); };
  const REDOX = [["Zn + Cu²⁺ → Zn²⁺ + Cu", "Zinc, Zn", "Copper(II) ion, Cu²⁺", "oxidised"], ["Mg + 2HCl → MgCl₂ + H₂", "Magnesium, Mg", "Hydrogen in HCl", "oxidised"], ["2Na + Cl₂ → 2NaCl", "Sodium, Na", "Chlorine, Cl₂", "oxidised"], ["Fe₂O₃ + 3CO → 2Fe + 3CO₂", "Carbon in CO", "Iron in Fe₂O₃", "oxidised"]];
  const redoxQ = () => { const [e, ox, rd, w] = pick(REDOX), askOx = Math.random() < 0.5;
    return mcq(`In <b>${e}</b>, which species is ${askOx ? "oxidised" : "reduced"}?`, askOx ? ox : rd, [askOx ? rd : ox, "Neither, nothing changes"],
      ["Work out the oxidation number of each element before and after.", "OIL RIG: Oxidation Is Loss of electrons (number goes up); Reduction Is Gain (number goes down).", "Example: in Cl₂ + 2KBr → 2KCl + Br₂, bromide goes −1 to 0 (up), so bromide is oxidised. Now do yours."], "🔁"); };
  c.push(les("Oxidation numbers in tougher compounds", [
    ["Rules", "📏", "Elements alone: 0. Ions: their charge. Oxygen: usually −2. Hydrogen: usually +1. The oxidation numbers in a compound add to <b>0</b>, in an ion to its <b>charge</b>."],
    ["Solve for x", "🧮", "H₂SO₄: 2(+1) + x + 4(−2) = 0 → x = <b>+6</b>. For SO₃²⁻: x + 3(−2) = −2 → x = <b>+4</b>."],
    ["Redox", "🔁", "<b>OIL RIG</b>: Oxidation Is Loss of electrons (oxidation number goes up). Reduction Is Gain (goes down). Zn → Zn²⁺ is oxidation (0 → +2)."]
  ], ["Write an equation that adds all oxidation numbers to the total charge.", "Substitute known values (O = −2, H = +1, group 1 = +1) and solve for x.", "Example: KNO₂: +1 + x + 2(−2) = 0, so N is +3. Now try yours."], [
    oxQ, oxQ, oxQ, oxQ, redoxQ, redoxQ,
    ["An increase in oxidation number means the element has been...", "Oxidised", "Reduced", "Neutralised"]
  ]));

  const SRP = [["Mg", -2.37], ["Al", -1.66], ["Zn", -0.76], ["Fe", -0.44], ["Ni", -0.26], ["Pb", -0.13], ["Cu", 0.34], ["Ag", 0.80]];
  const lab = m => (m === "Al" ? "Al³⁺/Al" : m === "Ag" ? "Ag⁺/Ag" : m + "²⁺/" + m);
  const cellQ = () => {
    const [A, B] = shuf(SRP).slice(0, 2), hi = A[1] > B[1] ? A : B, lo = hi === A ? B : A, t = ri(0, 2);
    const sgn = v => (v < 0 ? "−" + Math.abs(v).toFixed(2) : "+" + v.toFixed(2));
    const fixed = `E° values (V): ${lab(A[0])} = ${sgn(A[1])}, ${lab(B[0])} = ${sgn(B[1])}.`;
    if (t === 0) return num(`A cell is made from two metals. ${fixed} What is the standard cell voltage E°<sub>cell</sub> (V)? (E°cell = E°cathode − E°anode; give the positive value.)`, r2(hi[1] - lo[1]),
      ["The metal with the higher E° is the cathode (reduction). The other is the anode (oxidation).", "Subtract the lower E° from the higher E°; the result is positive for a working cell.", "Example: E° values +0.50 and −1.00 give 0.50 − (−1.00) = 1.50 V. Now do yours."], "🔋");
    if (t === 1) return mcq(`${fixed} Which metal is the <b>anode</b> (where oxidation happens) in a cell made from these two?`, lo[0], [hi[0], "Neither"],
      ["The anode is the electrode where oxidation happens.", "The metal with the more negative E° is more willing to lose electrons.", "Example: metals X (−1.00) and Y (+0.50): X is oxidised, so X is the anode. Now do yours."], "🔋");
    return mcq(`${fixed} In a cell made from these two, which metal is the <b>cathode</b> (where reduction happens)?`, hi[0], [lo[0], "Neither"],
      ["The cathode is where ions gain electrons.", "The metal with the more positive E° is more willing to gain electrons.", "Example: metals X (−1.00) and Y (+0.50): Y ions are reduced, so Y is the cathode. Now do yours."], "🔋");
  };
  c.push(les("Galvanic cells and cell voltage", [
    ["A battery from reactions", "🔋", "A <b>galvanic cell</b> uses a spontaneous redox reaction to make electricity. Two half-cells are joined by a wire and a <b>salt bridge</b> (which lets ions move to keep charges balanced)."],
    ["Anode and cathode", "➡️", "<b>AN OX</b>: oxidation happens at the <b>anode</b> (negative). <b>RED CAT</b>: reduction happens at the <b>cathode</b> (positive). Electrons flow through the wire from anode to cathode."],
    ["Voltage", "⚡", "<b>E°cell = E°cathode − E°anode</b> using standard reduction potentials. Zn (−0.76) and Cu (+0.34): 0.34 − (−0.76) = <b>1.10 V</b>. A positive value means the reaction is spontaneous."]
  ], ["Compare the two E° values.", "Higher E° = cathode (gains electrons). Lower E° = anode (loses electrons). Subtract lower from higher.", "Example: values +0.60 and −0.40 give 0.60 − (−0.40) = 1.00 V. Now try yours."], [
    cellQ, cellQ, cellQ, cellQ, cellQ,
    ["In a galvanic cell, electrons flow from the...", "Anode to the cathode", "Cathode to the anode", "Salt bridge to the wire"],
    ["The salt bridge is there to...", "Let ions move so charges stay balanced", "Make the metals heavier", "Stop all current"]
  ]));

  const LC = [
    ["N₂(g) + 3H₂(g) ⇌ 2NH₃(g), exothermic", "more N₂ is added", "Shifts right (more products)"], ["N₂(g) + 3H₂(g) ⇌ 2NH₃(g), exothermic", "NH₃ is removed", "Shifts right (more products)"],
    ["N₂(g) + 3H₂(g) ⇌ 2NH₃(g), exothermic", "pressure is increased", "Shifts right (more products)"], ["N₂(g) + 3H₂(g) ⇌ 2NH₃(g), exothermic", "temperature is increased", "Shifts left (more reactants)"],
    ["N₂(g) + 3H₂(g) ⇌ 2NH₃(g), exothermic", "some H₂ is removed", "Shifts left (more reactants)"], ["N₂(g) + 3H₂(g) ⇌ 2NH₃(g), exothermic", "a catalyst is added", "No shift"],
    ["N₂O₄(g) ⇌ 2NO₂(g), endothermic", "temperature is increased", "Shifts right (more products)"], ["N₂O₄(g) ⇌ 2NO₂(g), endothermic", "pressure is increased", "Shifts left (more reactants)"],
    ["N₂O₄(g) ⇌ 2NO₂(g), endothermic", "the volume of the container is increased", "Shifts right (more products)"], ["N₂O₄(g) ⇌ 2NO₂(g), endothermic", "the temperature is lowered", "Shifts left (more reactants)"],
    ["H₂(g) + I₂(g) ⇌ 2HI(g)", "pressure is increased", "No shift"], ["H₂(g) + I₂(g) ⇌ 2HI(g)", "more H₂ is added", "Shifts right (more products)"],
    ["2SO₂(g) + O₂(g) ⇌ 2SO₃(g), exothermic", "pressure is increased", "Shifts right (more products)"], ["2SO₂(g) + O₂(g) ⇌ 2SO₃(g), exothermic", "temperature is increased", "Shifts left (more reactants)"],
    ["CaCO₃(s) ⇌ CaO(s) + CO₂(g), endothermic", "temperature is increased", "Shifts right (more products)"], ["CaCO₃(s) ⇌ CaO(s) + CO₂(g), endothermic", "the CO₂ is removed", "Shifts right (more products)"]
  ];
  const LCOUT = ["Shifts right (more products)", "Shifts left (more reactants)", "No shift"];
  c.push(les("Le Chatelier's principle in detail", [
    ["Oppose the change", "🔧", "If a system at equilibrium is disturbed, it <b>shifts to partly cancel</b> the change. Add reactant → shifts right. Remove product → shifts right."],
    ["Pressure and temperature", "🌡️", "<b>Pressure up</b> → shifts to the side with <b>fewer gas moles</b>. <b>Temperature up</b> → shifts in the <b>endothermic</b> direction. If both sides have equal gas moles, pressure does nothing."],
    ["What does not shift it", "🚫", "A <b>catalyst</b> speeds up both directions equally; it gets there faster but does not change the position. Adding a solid does not change concentrations."],
    ["K", "📣", "Only a change in <b>temperature</b> changes the value of K. Concentration and pressure shifts change amounts but not K."]
  ], ["Decide: what exactly was changed?", "Count gas moles on each side, and note whether the forward reaction is exothermic or endothermic.", "Example: for 2NO₂ ⇌ N₂O₄ (exothermic forward), adding heat shifts to the left. Now try yours."], [
    ...LC.map(([s, ch, ans]) => () => mcq(`${s}. The equilibrium mixture is disturbed when <b>${ch}</b>. What happens to the position of equilibrium?`, ans, LCOUT.filter(x => x !== ans),
      ["Which side does the change favour or oppose?", "Count the gas particles on each side for pressure and volume changes; use exothermic/endothermic for temperature; concentration changes shift to use up or replace the change.", "Example: for A(g) ⇌ 2B(g), raising the pressure shifts left (fewer gas moles). Now do yours."], "🔧")),
    ["Which change alters the value of the equilibrium constant?", "Changing the temperature", "Adding a catalyst", "Adding more reactant"]
  ]));

  const CONJ = [["HCl", "Cl⁻"], ["HNO₃", "NO₃⁻"], ["H₂SO₄", "HSO₄⁻"], ["HF", "F⁻"], ["CH₃COOH", "CH₃COO⁻"], ["H₂O", "OH⁻"], ["NH₄⁺", "NH₃"], ["HCO₃⁻", "CO₃²⁻"], ["H₃PO₄", "H₂PO₄⁻"], ["H₂S", "HS⁻"]];
  const CONJB = [["NH₃", "NH₄⁺"], ["OH⁻", "H₂O"], ["F⁻", "HF"], ["CO₃²⁻", "HCO₃⁻"], ["H₂O", "H₃O⁺"], ["SO₄²⁻", "HSO₄⁻"], ["Cl⁻", "HCl"], ["CH₃COO⁻", "CH₃COOH"]];
  c.push(les("Conjugate pairs and acid strength", [
    ["Pairs", "🤝", "When an acid gives away H⁺, what is left is its <b>conjugate base</b>. HCl → H⁺ + <b>Cl⁻</b>. When a base accepts H⁺ it becomes its <b>conjugate acid</b>: NH₃ + H⁺ → <b>NH₄⁺</b>. The pair differs by exactly one H⁺."],
    ["Strong and weak", "💪", "<b>Strong acids</b> (HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄) ionise completely. <b>Weak acids</b> (CH₃COOH, HF, H₂CO₃) ionise only partly, so [H⁺] is much lower than the acid concentration."],
    ["Opposite strength", "⚖️", "The stronger the acid, the <b>weaker</b> its conjugate base. Cl⁻ is a very weak base (HCl is strong); CH₃COO⁻ is a stronger base (CH₃COOH is weak)."],
    ["Compare pH", "🧪", "0.1 mol/dm³ HCl has pH 1. 0.1 mol/dm³ ethanoic acid has a higher pH (about 3) because only a small fraction ionises."]
  ], ["Add or remove one H⁺ and adjust the charge.", "Acid → base: take away H⁺ (charge goes down by 1). Base → acid: add H⁺ (charge goes up by 1).", "Example: the conjugate base of HBr is Br⁻; the conjugate acid of S²⁻ is HS⁻. Now try yours."], [
    ...CONJ.map(([a1, bb]) => () => mcq(`What is the <b>conjugate base</b> of <b>${a1}</b>?`, bb, others(CONJ.map(x => x[1]).concat(["H₂O", "SO₄²⁻"]).filter((x, i, arr) => x !== bb && arr.indexOf(x) === i), bb, 3),
      ["The conjugate base is what remains after the acid donates an H⁺.", "Remove one H and lower the charge by one.", "Example: the conjugate base of HBr is Br⁻. Now do yours."], "🤝")),
    ...CONJB.map(([bb, a1]) => () => mcq(`What is the <b>conjugate acid</b> of <b>${bb}</b>?`, a1, others(CONJB.map(x => x[1]).concat(["H₃O⁺", "H₂CO₃"]).filter((x, i, arr) => x !== a1 && arr.indexOf(x) === i), a1, 3),
      ["The conjugate acid forms when the base accepts an H⁺.", "Add one H and raise the charge by one.", "Example: the conjugate acid of S²⁻ is HS⁻. Now do yours."], "🤝")),
    ["0.1 mol/dm³ of which acid has the lowest pH?", "HCl (strong)", "CH₃COOH (weak)", "HF (weak)"],
    ["A weak acid is one that...", "Ionises only partly in water", "Has no hydrogen", "Is always dilute"]
  ]));

  c.push(mix("Mixed practice", at(c, [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  c.push(mix("Level 21 Challenge", at(c, [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 17])));

  Object.assign(CHEM_LEVELS, { 19: a, 20: b, 21: c });
})();
