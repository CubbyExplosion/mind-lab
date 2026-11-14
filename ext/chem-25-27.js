// ext/chem-25-27.js  Mind Lab Chemistry levels 25-27 (grade 12 both halves, college year 1 first half): general chemistry I-II
// quantum model, periodic trends, bonding theories, MO theory, solids and solutions, thermodynamics, kinetics, equilibrium, electrochemistry, organic intro
(() => {
  const SUBM = "₀₁₂₃₄₅₆₇₈₉", SUPM = "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻";
  const U = s => typeof s !== "string" ? s : s.replace(/[₀-₉]+/g, m => `<sub>${[...m].map(ch => SUBM.indexOf(ch)).join("")}</sub>`).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, m => `<sup>${[...m].map(ch => "0123456789+-"[SUPM.indexOf(ch)]).join("")}</sup>`);
  // item = [question, right, wrong1, wrong2?, wrong3?] ("emoji§question" shows a big picture) OR a function returning an item or a full question object
  // the checker/app compare answers with signs and Greek letters stripped, so choices use ASCII hyphen-minus
  const ASC = s => typeof s !== "string" ? s : s.replace(/−/g, "-");
  const les = (title, slides, hints, items) => {
    const make = () => {
      let it = pick(items);
      if (typeof it === "function") it = it();
      if (!Array.isArray(it)) return Object.assign({ hints }, it);
      it = it.map(U);
      const parts = it[0].split("§");
      return { text: parts[parts.length - 1], visual: parts.length > 1 ? parts[0] : undefined, choices: shuf(it.slice(1).map(ASC)), answer: ASC(it[1]), hints };
    };
    make.teach = () => slides.map(s => ({ h: s[0], v: s[1], t: U(s[2]) }));
    make.slide = slides[0];
    return { title, make };
  };
  const mix = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => {
      const out = [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some ideas, then the quiz." }];
      ls.filter((_, i) => i % Math.ceil(ls.length / 4) === 0).slice(0, 4).forEach(l => out.push({ h: l.make.slide[0], v: l.make.slide[1], t: U(l.make.slide[2]) }));
      return out;
    };
    make.slide = x => x;
    return { title, make };
  };
  const at = (arr, idx) => idx.map(i => arr[i]);
  const num = (text, answer, hints, visual) => ({ text: U(text), answer, hints: hints.map(U), visual });
  const mcq = (text, right, wrongs, hints, visual) => ({ text: U(text), choices: shuf([right, ...wrongs].map(x => ASC(U(x)))), answer: ASC(U(right)), hints: hints.map(U), visual });
  const uniq = arr => arr.filter((x, i) => arr.indexOf(x) === i);
  const r2 = x => Math.round(x * 100) / 100;
  const until = (gen, ok) => { let v; for (let i = 0; i < 500; i++) { v = gen(); if (ok(v)) return v; } return v; };
  const mn = x => (x < 0 ? "−" : "") + Math.abs(x);
  const sg = x => x < 0 ? "−" + Math.abs(x) : x > 0 ? "+" + x : "0";
  // pick n distinct wrong strings (never equal to right), topping up from a spare list
  const wr = (right, cands, n = 3) => uniq(cands.filter(c => c !== right)).slice(0, n);

  // ================= LEVEL 25 =================
  const a = [];

  // 1 waves
  const WV = [[300, 10], [500, 6], [600, 5], [750, 4], [1000, 3], [1500, 2]];
  const waveQ = () => {
    const [lam, nu] = pick(WV);
    if (ri(0, 1) === 0) return num(`Light has a frequency of ${nu}×10¹⁴ Hz. With c = 3.00×10⁸ m/s, what is its wavelength in nm?`, lam,
      ["Use c = λν, so λ = c ÷ ν. Watch the powers of ten, and remember 1 m = 10⁹ nm.", "With ν written in units of 10¹⁴ Hz, the wavelength in nm is 3000 ÷ ν.", "Example: ν = 15×10¹⁴ Hz gives λ = 3000 ÷ 15 = 200 nm. Now do yours."], "🌈");
    return num(`Light has a wavelength of ${lam} nm. With c = 3.00×10⁸ m/s, what is its frequency in units of 10¹⁴ Hz?`, nu,
      ["Use ν = c ÷ λ. Watch the powers of ten, and remember 1 nm = 10⁻⁹ m.", "With λ in nm, the frequency in units of 10¹⁴ Hz is 3000 ÷ λ.", "Example: λ = 200 nm gives ν = 3000 ÷ 200 = 15 (×10¹⁴ Hz). Now do yours."], "🌈");
  };
  a.push(les("Light as a wave: c = λν", [
    ["Wavelength and frequency", "🌈", "Light is an electromagnetic wave. The wavelength λ (distance between crests) and frequency ν (waves per second) are linked by <b>c = λν</b>, where c = 3.00×10⁸ m/s."],
    ["Short wave, high frequency", "📡", "c never changes, so shorter λ means larger ν. From long to short wavelength: radio, microwave, infrared, visible (red to violet), ultraviolet, X-ray, gamma."],
    ["Worked example", "📝", "λ = 600 nm = 6.00×10⁻⁷ m. ν = c/λ = (3.00×10⁸)/(6.00×10⁻⁷) = <b>5.0×10¹⁴ Hz</b>."]
  ], ["Light always travels at c in a vacuum, so wavelength and frequency trade off against each other.", "Remember c = λν. If one gets bigger the other must get smaller.", "Example: green light with a wavelength twice as long as another colour has half the frequency. Reason it the same way for yours."],
    [waveQ, waveQ, waveQ, waveQ,
      ["Which type of radiation has the shortest wavelength?", "Gamma rays", "Microwaves", "Visible light", "Radio waves"],
      ["Which type of radiation has the lowest frequency?", "Radio waves", "X-rays", "Ultraviolet", "Gamma rays"],
      ["If the frequency of a light wave doubles, its wavelength...", "is halved", "doubles", "stays the same", "is four times longer"],
      ["Which visible colour has the longest wavelength?", "Red", "Violet", "Green", "Blue"]]));

  // 2 photon energy
  const PH = [[1240, 1], [620, 2], [310, 4], [248, 5], [155, 8], [124, 10]];
  const photonQ = () => {
    const [lam, E] = pick(PH), t = ri(0, 3);
    if (t === 0) return num(`A photon has a wavelength of ${lam} nm. Using hc = 1240 eV·nm, what is its energy in eV?`, E,
      ["A photon's energy is E = hc/λ. Shorter wavelength means more energy per photon.", "With hc = 1240 eV·nm, E in eV = 1240 ÷ λ in nm.", "Example: λ = 2480 nm gives E = 1240 ÷ 2480 = 0.5 eV. Now do yours."], "💡");
    if (t === 1) return num(`A photon has an energy of ${E} eV. Using hc = 1240 eV·nm, what is its wavelength in nm?`, lam,
      ["Rearrange E = hc/λ to find the wavelength.", "With hc = 1240 eV·nm, λ in nm = 1240 ÷ E in eV.", "Example: E = 2.5 eV gives λ = 1240 ÷ 2.5 = 496 nm. Now do yours."], "💡");
    if (t === 2) {
      const e2 = pick([2, 4, 5, 8, 10]), L = 1240 / e2, phi = ri(1, e2 - 1);
      return num(`Light of wavelength ${L} nm strikes a metal with a work function of ${phi} eV. What is the maximum kinetic energy of an ejected electron, in eV? (hc = 1240 eV·nm)`, e2 - phi,
        ["Photoelectric effect: the photon energy pays the work function, and the leftover becomes kinetic energy.", "First find the photon energy E = 1240 ÷ λ, then use KE = E − φ.", "Example: a 7 eV photon on a metal with φ = 3 eV leaves KE = 7 − 3 = 4 eV. Now do yours."], "⚡");
    }
    const phi = pick([2, 4, 5, 8]);
    return num(`A metal has a work function of ${phi} eV. What is the longest wavelength (in nm) of light that can eject electrons from it? (hc = 1240 eV·nm)`, 1240 / phi,
      ["At the threshold, the photon energy just equals the work function.", "Set E = φ and use λ = 1240 ÷ E, with E in eV.", "Example: φ = 3.1 eV gives λ = 1240 ÷ 3.1 = 400 nm. Now do yours."], "⚡");
  };
  a.push(les("Photon energy: E = hν", [
    ["Light comes in packets", "💡", "Light energy comes in packets called <b>photons</b>. Each photon has energy <b>E = hν = hc/λ</b>, with h = 6.63×10⁻³⁴ J·s. High frequency means high energy per photon."],
    ["A handy shortcut", "🧮", "hc = 1240 eV·nm, so <b>E (eV) = 1240 ÷ λ (nm)</b>. A 620 nm photon has 2 eV. 1 eV = 1.60×10⁻¹⁹ J."],
    ["Photoelectric effect", "⚡", "Photons only eject electrons if E is at least the metal's <b>work function φ</b>. Then <b>KE(max) = E − φ</b>. Brighter light gives more photons, not more energetic ones."]
  ], ["The energy of one photon depends on its frequency, not on how many photons arrive.", "Think E = hν: more frequency, more energy per photon. Intensity only changes how many photons there are.", "Example: a UV photon has more energy than a red photon, so it can eject electrons that red cannot. Apply that idea to yours."],
    [photonQ, photonQ, photonQ, photonQ,
      ["If the frequency of a photon doubles, its energy...", "doubles", "is halved", "stays the same", "increases four times"],
      ["Light below the threshold frequency shines on a metal. Even if very bright, what happens?", "No electrons are ejected", "Many electrons are ejected", "Electrons are ejected but slowly", "The metal glows"],
      ["Above the threshold frequency, making the light brighter increases...", "the number of ejected electrons", "the maximum kinetic energy of each electron", "the work function of the metal", "the frequency of the light"],
      ["Which photon has more energy?", "Blue light", "Red light", "Infrared", "Radio waves"]]));

  // 3 Bohr
  const evs = x => x.toFixed(2) + " eV";
  const bohrQ = () => {
    if (ri(0, 1) === 0) {
      const n = ri(2, 6), right = "−" + evs(13.6 / (n * n));
      return mcq(`In the Bohr model of hydrogen, E = −13.6 eV ÷ n². What is the energy of the electron in the level n = ${n}?`, right,
        wr(right, ["−" + evs(13.6 / n), "+" + evs(13.6 / (n * n)), "−" + evs(13.6 / ((n - 1) * (n - 1))), "−" + evs(13.6 * n)]),
        ["The energy is negative (the electron is bound) and gets closer to zero as n grows.", "Square n first, then divide 13.6 by it.", "Example: n = 7 gives E = −13.6 ÷ 49 = −0.28 eV. Now do yours."], "⚛️");
    }
    const [ni, nf] = pick([[2, 1], [3, 1], [3, 2], [4, 1], [4, 2], [5, 2], [4, 3], [6, 2], [5, 1]]);
    const right = evs(13.6 * (1 / (nf * nf) - 1 / (ni * ni)));
    return mcq(`A hydrogen electron falls from n = ${ni} to n = ${nf}. What is the energy of the photon emitted?`, right,
      wr(right, [evs(13.6 * (1 / nf - 1 / ni)), evs(13.6 * (1 / (nf * nf) + 1 / (ni * ni))), evs(13.6 / ((ni - nf) * (ni - nf))), evs(13.6 * (ni - nf))]),
      ["The photon carries away the energy difference between the two levels.", "ΔE = 13.6 × (1/nf² − 1/ni²) eV. Square each n before taking the reciprocal.", "Example: 5 → 3 gives 13.6 × (1/9 − 1/25) = 0.97 eV. Now do yours."], "⚛️");
  };
  a.push(les("The Bohr model: energy levels of hydrogen", [
    ["Quantised levels", "⚛️", "In hydrogen the electron can only have energies <b>E<sub>n</sub> = −13.6 eV / n²</b> (n = 1, 2, 3, ...). n = 1 is the ground state. n → ∞ means E = 0 (a free electron)."],
    ["Jumps make light", "🎆", "A jump between levels absorbs or emits a photon with <b>ΔE = 13.6 (1/n<sub>f</sub>² − 1/n<sub>i</sub>²) eV</b>. Falling down emits; climbing up absorbs."],
    ["Series of lines", "🌈", "Jumps ending at n = 1 are the <b>Lyman</b> series (ultraviolet). Ending at n = 2: <b>Balmer</b> (visible). Ending at n = 3: <b>Paschen</b> (infrared). Ionizing ground-state H takes 13.6 eV."]
  ], ["Energy levels get closer together and closer to zero as n increases.", "Bound levels have negative energy and a jump uses the difference of two levels. Square n whenever you use the formula.", "Example: for 6 → 3 you would compute the constant times (1/9 − 1/36), then say whether a photon is emitted or absorbed. Now do yours."],
    [bohrQ, bohrQ, bohrQ, bohrQ,
      ["A hydrogen electron falls from n = 3 to n = 2. What happens to the photon?", "One is emitted", "One is absorbed", "Nothing happens", "The atom is ionized"],
      ["What is the energy of a hydrogen electron that is completely free (n → ∞)?", "0 eV", "−13.6 eV", "+13.6 eV", "−3.4 eV"],
      ["Which series ends at n = 2 and lies in the visible region?", "Balmer", "Lyman", "Paschen", "Brackett"],
      ["How much energy ionizes a ground-state hydrogen atom?", "13.6 eV", "3.4 eV", "10.2 eV", "1.51 eV"]]));

  // 4 quantum numbers
  const LET = ["s", "p", "d", "f"];
  const qnQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const l = ri(0, 3);
      return num(`How many orbitals are in a subshell with l = ${l}?`, 2 * l + 1,
        ["For a given l, the magnetic quantum number mℓ runs from −l to +l in whole steps.", "Count the values from −l to +l including zero: that is 2l + 1.", "Example: l = 4 has mℓ = −4 ... +4, so 9 orbitals. Now do yours."], "🔢"); }
    if (t === 1) { const n = ri(1, 5);
      return num(`What is the maximum number of electrons in the shell with n = ${n}?`, 2 * n * n,
        ["Each orbital holds 2 electrons, and a shell has several orbitals.", "A shell with quantum number n has n² orbitals, so 2n² electrons.", "Example: n = 6 gives 2 × 36 = 72 electrons. Now do yours."], "🔢"); }
    if (t === 2) { const n = ri(2, 5);
      return num(`How many orbitals are there in the whole shell with n = ${n}?`, n * n,
        ["The shell contains subshells l = 0 up to n − 1. Add up the orbitals of each.", "The total always equals n², since 1 + 3 + 5 + ... adds up that way.", "Example: n = 3 has 1 + 3 + 5 = 9 orbitals. Now do yours."], "🔢"); }
    const n = ri(2, 5), l = ri(0, Math.min(3, n - 1));
    return num(`How many orbitals are in a ${n}${LET[l]} subshell?`, 2 * l + 1,
      ["The letter tells you l: s = 0, p = 1, d = 2, f = 3. The n does not change the count.", "Use 2l + 1 with the value of l from the letter.", "Example: a 6d subshell has l = 2, so 2(2) + 1 = 5 orbitals. Now do yours."], "🔢");
  };
  a.push(les("Quantum numbers and orbitals", [
    ["Four quantum numbers", "🔢", "<b>n</b> = shell (1, 2, 3...). <b>l</b> = subshell shape (0 to n − 1, labelled s, p, d, f). <b>mℓ</b> = orbital orientation (−l to +l). <b>m<sub>s</sub></b> = spin (+½ or −½)."],
    ["Counting orbitals", "🧮", "A subshell has <b>2l + 1</b> orbitals: s = 1, p = 3, d = 5, f = 7. A shell has <b>n²</b> orbitals and holds <b>2n²</b> electrons."],
    ["Allowed or not?", "✅", "The rules: l must be less than n; |mℓ| cannot exceed l; spin is only ±½. So 2d does not exist (l = 2 needs n ≥ 3), and n = 3, l = 1, mℓ = 2 is impossible."]
  ], ["Recall the rules: l runs from 0 to n − 1, and mℓ from −l to +l.", "Check each set one rule at a time: l against n first, then mℓ against l, then the spin.", "Example: n = 2, l = 2 is not allowed because l must be less than n. Check yours the same way."],
    [qnQ, qnQ, qnQ, qnQ,
      ["Which set of quantum numbers (n, l, mℓ) is NOT allowed?", "2, 2, 0", "3, 2, −1", "2, 1, 0", "1, 0, 0"],
      ["Which set of quantum numbers (n, l, mℓ) is NOT allowed?", "3, 1, 2", "4, 3, −3", "3, 0, 0", "2, 1, −1"],
      ["Which subshell cannot exist?", "2d", "3d", "4f", "2p"],
      ["Which subshell cannot exist?", "1p", "2s", "3p", "5g"],
      ["Which value is NOT a possible spin quantum number (m_s)?", "+1", "+1/2", "-1/2"]]));

  // 5 nodes
  const ORBS = ["1s", "2s", "2p", "3s", "3p", "3d", "4s", "4p", "4d", "4f", "5s", "5p", "5d"];
  const nodeQ = () => {
    const o = pick(ORBS), n = +o[0], l = LET.indexOf(o[1]), t = ri(0, 2);
    if (t === 0) return num(`How many radial nodes does a ${o} orbital have?`, n - l - 1,
      ["Radial nodes are spherical shells where the electron density is zero. They depend on both n and l.", "Radial nodes = n − l − 1. Get l from the letter (s = 0, p = 1, d = 2, f = 3).", "Example: 5p has n = 5, l = 1, so 5 − 1 − 1 = 3 radial nodes. Now do yours."], "🧅");
    if (t === 1) return num(`How many angular nodes (nodal planes or cones) does a ${o} orbital have?`, l,
      ["Angular nodes come from the shape of the orbital, not from the shell number.", "The number of angular nodes equals l: s = 0, p = 1, d = 2, f = 3.", "Example: a 6d orbital has l = 2, so it has 2 angular nodes. Now do yours."], "🧅");
    return num(`What is the total number of nodes in a ${o} orbital?`, n - 1,
      ["Total nodes = radial nodes + angular nodes.", "Radial (n − l − 1) plus angular (l) always simplifies to a very simple rule.", "Example: 4d has 4 − 2 − 1 = 1 radial and 2 angular nodes, 3 in total. Now do yours."], "🧅");
  };
  a.push(les("Orbital shapes and nodes", [
    ["Shapes", "🧅", "An <b>s</b> orbital is a sphere. A <b>p</b> orbital is two lobes (a dumbbell) with a nodal plane at the nucleus. <b>d</b> orbitals have four lobes (one type has a ring). <b>f</b> orbitals are even more complex."],
    ["Nodes", "⭕", "A <b>node</b> is a place where the electron density is zero. <b>Angular nodes = l</b>. <b>Radial nodes = n − l − 1</b>. <b>Total nodes = n − 1</b>."],
    ["Worked example", "📝", "A 3p orbital: l = 1 gives 1 angular node; radial nodes = 3 − 1 − 1 = 1; total = <b>2</b> (= n − 1)."]
  ], ["A node is a spot where you will never find the electron. Think of its two kinds: shells and planes.", "Angular nodes depend on l; radial nodes on n and l; the total depends on n only.", "Example: a 4s orbital has l = 0, so 0 angular nodes, 3 radial nodes, 3 in total. Now do yours."],
    [nodeQ, nodeQ, nodeQ, nodeQ,
      ["Which orbital is spherical?", "2s", "2p", "3d", "4f"],
      ["A p orbital has how many lobes?", "Two", "One", "Four", "Six"],
      ["The 2p orbitals have a nodal plane passing through...", "the nucleus", "the outer edge only", "no point at all", "a distance 2a₀ from the nucleus"],
      ["What is the total number of nodes in any orbital with principal quantum number n?", "n − 1", "n", "n + 1", "2n"]]));

  // 6 electron configurations
  a.push(les("Electron configurations of atoms and ions", [
    ["Filling order", "🪜", "Fill 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p... Write the short form with the noble gas core, like <b>Fe = [Ar]3d⁶4s²</b>."],
    ["Two exceptions", "⭐", "Half-filled and full d subshells are extra stable: <b>Cr = [Ar]3d⁵4s¹</b> and <b>Cu = [Ar]3d¹⁰4s¹</b> (also Ag and Au in their groups)."],
    ["Ions: 4s leaves first", "➖", "To make a transition-metal cation, remove the <b>4s electrons first</b>, then 3d. So <b>Fe²⁺ = [Ar]3d⁶</b> and <b>Fe³⁺ = [Ar]3d⁵</b>. Anions add electrons to the empty orbitals."]
  ], ["For atoms, 4s fills before 3d. For cations, the outermost shell (4s) empties before the 3d.", "Start with the atom's configuration, then add or remove the electrons from the highest n shell first.", "Example: Co has [Ar]3d⁷4s², so Co²⁺ loses its two 4s electrons to give [Ar]3d⁷. Now do yours."],
    [["Which is the ground-state configuration of chromium (Z = 24)?", "[Ar]3d⁵4s¹", "[Ar]3d⁴4s²", "[Ar]3d⁶", "[Ar]4s²4p⁴"],
      ["Which is the ground-state configuration of copper (Z = 29)?", "[Ar]3d¹⁰4s¹", "[Ar]3d⁹4s²", "[Ar]3d¹¹", "[Ar]4s²4p⁹"],
      ["What is the configuration of Fe²⁺ (Fe has Z = 26)?", "[Ar]3d⁶", "[Ar]3d⁴4s²", "[Ar]3d⁵4s¹", "[Ar]3d⁸"],
      ["What is the configuration of Zn²⁺ (Z = 30)?", "[Ar]3d¹⁰", "[Ar]3d⁸4s²", "[Ar]3d⁹4s¹", "[Ar]4s²"],
      ["What is the configuration of Mn²⁺ (Z = 25)?", "[Ar]3d⁵", "[Ar]3d³4s²", "[Ar]3d⁴4s¹", "[Ar]3d⁷"],
      ["What is the configuration of Cu²⁺ (Z = 29)?", "[Ar]3d⁹", "[Ar]3d⁸4s¹", "[Ar]3d¹⁰", "[Ar]3d⁷4s²"],
      ["What is the configuration of Ti³⁺ (Z = 22)?", "[Ar]3d¹", "[Ar]3d²4s¹", "[Ar]4s¹", "[Ar]3d⁴"],
      ["What is the configuration of Ni²⁺ (Z = 28)?", "[Ar]3d⁸", "[Ar]3d⁶4s²", "[Ar]3d⁷4s¹", "[Ar]3d¹⁰"],
      ["Which ion has the same configuration as krypton?", "Br⁻", "Cl⁻", "I⁻", "Se⁺"],
      ["Which is the ground-state configuration of silver (Z = 47)?", "[Kr]4d¹⁰5s¹", "[Kr]4d⁹5s²", "[Kr]4d¹⁰5s²", "[Kr]5s²5p⁹"]]));

  // 7 unpaired electrons
  const UNP = [["Ti³⁺", "3d¹", 1], ["V³⁺", "3d²", 2], ["Cr³⁺", "3d³", 3], ["Mn³⁺", "3d⁴", 4], ["Fe³⁺", "3d⁵", 5], ["Fe²⁺", "3d⁶", 4], ["Co²⁺", "3d⁷", 3], ["Ni²⁺", "3d⁸", 2], ["Cu²⁺", "3d⁹", 1], ["Zn²⁺", "3d¹⁰", 0],
    ["N atom", "1s²2s²2p³", 3], ["O atom", "1s²2s²2p⁴", 2], ["Cl atom", "[Ne]3s²3p⁵", 1], ["Ne atom", "1s²2s²2p⁶", 0], ["Cr atom", "[Ar]3d⁵4s¹", 6], ["Cu atom", "[Ar]3d¹⁰4s¹", 1], ["Mn atom", "[Ar]3d⁵4s²", 5], ["C atom", "1s²2s²2p²", 2]];
  const unpQ = () => {
    const [sp, conf, k] = pick(UNP);
    return num(`How many unpaired electrons does ${sp} have in its ground state (configuration ${conf})? Spread electrons over the degenerate orbitals before pairing.`, k,
      ["Draw the orbitals of the last subshell as boxes. Hund's rule: put one electron in each box first.", "A p subshell has 3 boxes, a d subshell 5 boxes. Add electrons singly, then pair up. Count the singles at the end. Do not forget s electrons if they are half filled.", "Example: 3d⁷ has 5 boxes: 5 singles, then 2 extra pair up, leaving 3 unpaired. Now do yours."], "🧲");
  };
  a.push(les("Hund's rule and unpaired electrons", [
    ["Rules for filling", "🧲", "<b>Aufbau</b>: lowest energy first. <b>Pauli</b>: at most 2 electrons per orbital, with opposite spins. <b>Hund</b>: fill degenerate orbitals singly with parallel spins before pairing."],
    ["Counting unpaired", "🧮", "For d<sup>n</sup>: unpaired = n up to d⁵, then 10 − n for d⁶ to d¹⁰. So d⁵ has 5, d⁶ has 4, d⁹ has 1, d¹⁰ has 0 (in the usual high-spin picture)."],
    ["Magnetism", "🧲", "Atoms with unpaired electrons are <b>paramagnetic</b> (pulled into a magnet). Atoms with all electrons paired are <b>diamagnetic</b> (weakly pushed away)."]
  ], ["Draw boxes for the orbitals and add arrows one at a time.", "Spread single arrows over all the boxes first. Only then pair up. Count the lone arrows.", "Example: 2p⁴ has three boxes: 3 singles, then 1 extra pairs up, leaving 2 unpaired. Now do yours."],
    [unpQ, unpQ, unpQ, unpQ, unpQ, unpQ,
      ["Which statement is correct?", "Paramagnetic atoms have unpaired electrons", "Diamagnetic atoms have unpaired electrons", "Paramagnetic atoms have only paired electrons", "Both kinds have the same number of unpaired electrons"],
      ["Zn²⁺ is diamagnetic. Why?", "Its 3d subshell is completely full, so all electrons are paired", "It has five unpaired d electrons", "It has no d electrons", "It has a half-filled 4s"]]));

  // 8 Zeff
  const ZE = [["Li", 3, 2], ["Be", 4, 2], ["B", 5, 2], ["C", 6, 2], ["N", 7, 2], ["O", 8, 2], ["F", 9, 2], ["Na", 11, 10], ["Mg", 12, 10], ["Al", 13, 10], ["Si", 14, 10], ["P", 15, 10], ["S", 16, 10], ["Cl", 17, 10], ["K", 19, 18], ["Ca", 20, 18]];
  const zeffQ = () => {
    const [s, z, core] = pick(ZE);
    return num(`Estimate the effective nuclear charge Zeff felt by a valence electron of ${s} (Z = ${z}), assuming the core electrons shield completely and valence electrons shield nothing.`, z - core,
      ["Zeff is the nuclear charge reduced by shielding from the inner electrons.", "Zeff ≈ Z − (number of core electrons). Core electrons are the ones in the previous noble gas.", "Example: Sr (Z = 38) has a krypton core of 36 electrons, so Zeff ≈ 38 − 36 = 2. Now do yours."], "🎯");
  };
  a.push(les("Effective nuclear charge and shielding", [
    ["Shielding", "🛡️", "Inner electrons <b>shield</b> outer ones from the full pull of the nucleus. The charge an outer electron actually feels is the <b>effective nuclear charge Zeff = Z − S</b>."],
    ["A quick estimate", "🧮", "Treat core electrons as shielding fully and same-shell electrons as not shielding. Then <b>Zeff ≈ number of valence electrons</b>: Na ≈ 1, Mg ≈ 2, Cl ≈ 7."],
    ["Why it matters", "📈", "Across a period Zeff rises (protons added, shielding about the same), so atoms shrink and hold electrons tighter. Down a group Zeff stays about the same but the shells get farther out."]
  ], ["Which electrons block the nucleus from the outermost electron: the inner ones or the same-shell ones?", "Subtract the core electrons from the atomic number. Core electrons fill the shells of the previous noble gas.", "Example: P has Z = 15 and a neon core of 10, so Zeff ≈ 5. Use the same idea for yours (but pick the right core)."],
    [zeffQ, zeffQ, zeffQ, zeffQ, zeffQ,
      ["Why does Zeff increase from Na to Cl?", "Protons are added but the shielding by core electrons stays about the same", "More core shells are added", "Electrons are removed from the atom", "The neutrons increase the pull"],
      ["Which electrons shield a valence electron most effectively?", "Core (inner-shell) electrons", "Other valence electrons in the same shell", "Neutrons", "Electrons in the next shell out"],
      ["Which atom has the larger Zeff for its valence electrons?", "Chlorine", "Sodium", "Potassium", "They are equal"]]));

  // 9 radii
  a.push(les("Atomic and ionic radius trends", [
    ["Trends for atoms", "📏", "Radius <b>decreases across a period</b> (Zeff rises) and <b>increases down a group</b> (more shells). So Cs is huge and F is small."],
    ["Ions vs atoms", "⚖️", "A <b>cation is smaller</b> than its atom (fewer electrons, less repulsion, often a lost shell). An <b>anion is larger</b> than its atom (more electron repulsion)."],
    ["Isoelectronic series", "🧬", "For ions with the same electron count (O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺) the one with the <b>most protons is smallest</b>. Order: O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺."]
  ], ["Ask: how many shells, and how strongly does the nucleus pull?", "More shells means bigger. With the same shells, more protons pull the electrons in harder.", "Example: Li⁺ is smaller than Li, because the 2s shell is lost. Use the same reasoning for yours."],
    [["Which has the largest atomic radius?", "Cs", "Na", "K", "Li"],
      ["Which has the smallest atomic radius?", "F", "O", "C", "Li"],
      ["Which is larger?", "Cl⁻", "Cl", "Both the same size"],
      ["Which is larger?", "Na", "Na⁺", "Both the same size"],
      ["Which is the largest of these isoelectronic ions?", "O²⁻", "F⁻", "Na⁺", "Mg²⁺"],
      ["Which is the smallest of these isoelectronic ions?", "Al³⁺", "Mg²⁺", "Na⁺", "F⁻"],
      ["Which is the largest of these isoelectronic ions?", "S²⁻", "Cl⁻", "K⁺", "Ca²⁺"],
      ["Which is larger?", "Fe²⁺", "Fe³⁺", "Both the same size"],
      ["Which has the larger radius?", "Mg", "Al", "Si", "Cl"],
      ["Which has the larger radius?", "Br", "Cl", "F", "O"]]));

  // 10 ionization energy
  a.push(les("Ionization energy: trends and exceptions", [
    ["The main trend", "⚡", "<b>First ionization energy (IE₁)</b> is the energy needed to remove the outermost electron from a gas atom. It <b>rises across a period</b> and <b>falls down a group</b>."],
    ["Two dips", "📉", "<b>Be > B</b> (the 2p electron is higher in energy than 2s) and <b>N > O</b> (in O a paired p electron is repelled, so it comes off more easily). Same dips at Mg > Al and P > S."],
    ["Reading successive IEs", "🔍", "A huge jump in successive ionization energies shows that you have started removing a <b>core</b> electron. If the jump comes after the 2nd electron, the atom has 2 valence electrons (group 2)."]
  ], ["Think about shielding and the nuclear pull, and about how stable half-filled and full subshells are.", "Compare the electron's subshell and how many electrons share it. A big jump in a list of IEs marks the end of the valence electrons.", "Example: IEs of 419 then 3052 jump after the first electron, so that atom has 1 valence electron. Use the same reading for yours."],
    [["Which has the higher first ionization energy?", "Be", "B", "Both equal", "Be only at high temperature"],
      ["Which has the higher first ionization energy?", "N", "O", "Both equal"],
      ["Which has the higher first ionization energy?", "Mg", "Al", "Na", "K"],
      ["Which has the higher first ionization energy?", "P", "S", "Si", "Na"],
      ["Which has the lowest first ionization energy?", "Cs", "Na", "Li", "K"],
      ["Which has the highest first ionization energy?", "He", "Ne", "H", "Li"],
      ["Successive ionization energies (kJ/mol): 738, 1451, 7733, 10543. Which group is the element in?", "Group 2", "Group 1", "Group 13", "Group 14"],
      ["Successive ionization energies (kJ/mol): 578, 1817, 2745, 11577. Which group is the element in?", "Group 13", "Group 2", "Group 14", "Group 15"],
      ["Successive ionization energies (kJ/mol): 496, 4562, 6910. Which group is the element in?", "Group 1", "Group 2", "Group 13", "Group 17"]]));

  // 11 electronegativity & bond type
  const EN = { H: 2.20, C: 2.55, N: 3.04, O: 3.44, F: 3.98, Cl: 3.16, Br: 2.96, S: 2.58, P: 2.19, Si: 1.90, Al: 1.61, Mg: 1.31, Na: 0.93, K: 0.82, Li: 0.98 };
  const bondType = d => d < 0.4 ? "Nonpolar covalent" : d <= 1.7 ? "Polar covalent" : "Ionic";
  const enKeys = Object.keys(EN);
  const enQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const [x, y] = until(() => { const p = shuf(enKeys).slice(0, 2); return p; }, p => { const d = Math.abs(EN[p[0]] - EN[p[1]]); return Math.abs(d - 0.4) > 0.12 && Math.abs(d - 1.7) > 0.12; });
      const right = bondType(Math.abs(EN[x] - EN[y]));
      return mcq(`Pauling electronegativities: ${x} = ${EN[x].toFixed(2)}, ${y} = ${EN[y].toFixed(2)}. What type of bond forms between ${x} and ${y}?`, right, ["Nonpolar covalent", "Polar covalent", "Ionic"].filter(c => c !== right),
        ["Find the difference in electronegativity (ΔEN).", "Rough guide: ΔEN below 0.4 is nonpolar covalent, 0.4 to 1.7 is polar covalent, above 1.7 is ionic.", "Example: ΔEN = 1.0 falls in the middle range, so that bond is polar covalent. Now find ΔEN for yours."], "🔗");
    }
    if (t === 1) {
      const [x, y] = until(() => shuf(enKeys).slice(0, 2), p => Math.abs(EN[p[0]] - EN[p[1]]) > 0.45);
      const right = EN[x] > EN[y] ? x : y;
      return mcq(`In a ${x}–${y} bond (electronegativities ${x} = ${EN[x].toFixed(2)}, ${y} = ${EN[y].toFixed(2)}), which atom carries the partial negative charge (δ−)?`, right, [right === x ? y : x],
        ["The shared electrons spend more time near the more electronegative atom.", "Compare the two numbers: the larger value pulls harder and becomes δ−.", "Example: in H–F, F (3.98) is more electronegative than H (2.20), so F is δ−. Now do yours."], "🔗");
    }
    const trio = until(() => shuf(["H–F", "H–O", "H–N", "H–C", "H–Cl", "C–O", "C–F", "N–O", "C–N", "Si–O", "O–F"]).slice(0, 3), tr => {
      const ds = tr.map(b => { const [p, q] = b.split("–"); return Math.abs(EN[p] - EN[q]); }); const s = [...ds].sort((u, v) => v - u); return s[0] - s[1] > 0.2; });
    const ds = trio.map(b => { const [p, q] = b.split("–"); return Math.abs(EN[p] - EN[q]); });
    const right = trio[ds.indexOf(Math.max(...ds))];
    return mcq("Which of these bonds is the most polar?", right, trio.filter(b => b !== right),
      ["Polarity grows with the difference in electronegativity.", "Work out ΔEN for each bond using the electronegativity table you know (F 3.98, O 3.44, Cl 3.16, N 3.04, C 2.55, H 2.20, Si 1.90).", "Example: of C–H (0.35), C–O (0.89) and C–Cl (0.61), the biggest difference is C–O, so it is the most polar. Now compare yours."], "🔗");
  };
  a.push(les("Electronegativity and bond type", [
    ["Pulling electrons", "🧲", "<b>Electronegativity</b> measures how strongly an atom pulls shared electrons. It rises across a period and falls down a group. F (3.98) is the top; Cs and Fr are the lowest."],
    ["Difference decides", "➗", "Compute <b>ΔEN</b>. About &lt;0.4: nonpolar covalent; 0.4 to 1.7: polar covalent; &gt;1.7: ionic. In a polar bond the more electronegative atom is <b>δ−</b>."],
    ["Electron affinity", "⚡", "<b>Electron affinity</b> is the energy released when a gas atom gains an electron. Cl has a more negative EA than F (F is so small that adding an electron crowds it)."]
  ], ["Look up or compare the electronegativities of the two atoms.", "Subtract the smaller from the larger to get ΔEN, then use the ranges you were taught.", "Example: N–H has ΔEN = 0.84 (3.04 − 2.20), so it is polar covalent with N as δ−. Now do yours."],
    [enQ, enQ, enQ, enQ, enQ, enQ,
      ["Which element has the highest electronegativity?", "Fluorine", "Oxygen", "Chlorine", "Francium"],
      ["Which halogen has the most negative electron affinity (releases the most energy)?", "Chlorine", "Fluorine", "Bromine", "Iodine"]]));

  // 12 valence electron count
  const VAL = { H: 1, C: 4, N: 5, O: 6, F: 7, Cl: 7, Br: 7, I: 7, S: 6, P: 5, B: 3, Xe: 8, Si: 4 };
  const SPE = [
    ["CO₂", { C: 1, O: 2 }, 0], ["SO₂", { S: 1, O: 2 }, 0], ["O₃", { O: 3 }, 0], ["BF₃", { B: 1, F: 3 }, 0], ["NH₃", { N: 1, H: 3 }, 0], ["PCl₅", { P: 1, Cl: 5 }, 0], ["SF₆", { S: 1, F: 6 }, 0], ["XeF₄", { Xe: 1, F: 4 }, 0],
    ["NH₄⁺", { N: 1, H: 4 }, 1], ["H₃O⁺", { O: 1, H: 3 }, 1], ["NO₃⁻", { N: 1, O: 3 }, -1], ["CO₃²⁻", { C: 1, O: 3 }, -2], ["SO₄²⁻", { S: 1, O: 4 }, -2], ["PO₄³⁻", { P: 1, O: 4 }, -3], ["ClO₃⁻", { Cl: 1, O: 3 }, -1], ["NO₂⁻", { N: 1, O: 2 }, -1], ["CN⁻", { C: 1, N: 1 }, -1], ["OH⁻", { O: 1, H: 1 }, -1], ["ClO₄⁻", { Cl: 1, O: 4 }, -1], ["ICl₂⁻", { I: 1, Cl: 2 }, -1]];
  const veQ = () => {
    const [f, atoms, ch] = pick(SPE);
    const tot = Object.entries(atoms).reduce((s, [e, n]) => s + VAL[e] * n, 0) - ch;
    return num(`How many valence electrons must be shown in the Lewis structure of ${f}?`, tot,
      ["Add up the valence electrons of every atom, using the group number.", "Then adjust for the charge: add one electron per negative charge and subtract one per positive charge.", "Example: SO₃²⁻ has 6 + 3×6 = 24, plus 2 for the charge = 26. Now do yours."], "✏️");
  };
  a.push(les("Lewis structures: counting valence electrons", [
    ["Step 1: count", "✏️", "Add the valence electrons of all atoms (from the group number). For an <b>anion add</b> one electron per negative charge; for a <b>cation subtract</b> one per positive charge."],
    ["Step 2: build", "🧱", "Join the atoms with single bonds (2 electrons each), complete octets on the outside atoms, put what is left on the central atom. If it is short of octets, make double or triple bonds."],
    ["Exceptions", "⚠️", "<b>Expanded octets</b> (P, S, Cl, Xe... can have more than 8 electrons: PCl₅, SF₆). <b>Electron-deficient</b> (BF₃ has only 6 around B). <b>Odd-electron</b> molecules (NO) cannot make all octets."]
  ], ["Each atom donates its group-number worth of valence electrons. Then think about the charge.", "Sum the valence electrons, then add electrons for a negative charge or remove them for a positive charge.", "Example: NH₄⁺ has 5 + 4×1 = 9, minus 1 for the + charge = 8. Now do yours."],
    [veQ, veQ, veQ, veQ, veQ, veQ, veQ, veQ]));

  // 13 formal charge
  const fcQ = () => {
    const t = ri(0, 1);
    if (t === 0) {
      const [el, V, lp, bd] = pick([["N", 5, 4, 2], ["O", 6, 6, 1], ["O", 6, 4, 2], ["O", 6, 2, 3], ["C", 4, 0, 4], ["C", 4, 2, 3], ["Cl", 7, 4, 3], ["S", 6, 0, 6], ["S", 6, 4, 2], ["N", 5, 0, 4], ["P", 5, 0, 5], ["O", 6, 4, 1]]);
      const fc = V - lp - bd;
      return mcq(`An atom of ${el} (${V} valence electrons) has ${lp} nonbonding electrons and forms ${bd} bonds (counting a double bond as 2). What is its formal charge?`, sg(fc),
        wr(sg(fc), [sg(fc + 1), sg(fc - 1), sg(fc + 2), sg(fc - 2), "0"]),
        ["Formal charge compares the electrons the atom 'owns' with its valence electrons.", "FC = valence electrons − nonbonding electrons − number of bonds.", "Example: N with 5 valence, 2 nonbonding and 3 bonds: 5 − 2 − 3 = 0. Now do yours."], "➕");
    }
    const items = [
      ["the O atom in OH⁻ (one O–H bond, three lone pairs)", "−1"], ["the N atom in NH₄⁺ (four N–H bonds)", "+1"], ["the O atom in H₃O⁺ (three O–H bonds, one lone pair)", "+1"], ["the carbon atom in CO (triple bond, one lone pair)", "−1"],
      ["the sulfur in SO₄²⁻ drawn with four single bonds and no lone pairs", "+2"], ["the N atom in NO₃⁻ drawn with one double bond and two single bonds", "+1"], ["the oxygen of C=O in formaldehyde (double bond, two lone pairs)", "0"], ["each H in H₂O", "0"]];
    const [d, r] = pick(items);
    return mcq(`What is the formal charge on ${d}?`, r, ["−1", "0", "+1", "+2"].filter(c => c !== r).slice(0, 3),
      ["Count the atom's lone-pair electrons and its bonds from the description.", "FC = valence electrons − nonbonding electrons − bonds. Use the group number for valence electrons.", "Example: F in HF has 7 − 6 − 1 = 0. Now do yours."], "➕");
  };
  a.push(les("Formal charge", [
    ["What it measures", "➕", "<b>Formal charge = valence electrons − nonbonding electrons − number of bonds</b>. It assumes bonding electrons are shared equally."],
    ["Check your structure", "✅", "The formal charges must add up to the overall charge. The best structure has formal charges as close to <b>zero</b> as possible, with any negative charge on the more electronegative atom."],
    ["Worked example", "📝", "N in NH₄⁺: 5 − 0 − 4 = <b>+1</b>. O in OH⁻: 6 − 6 − 1 = <b>−1</b>. Carbon in CO₂: 4 − 0 − 4 = 0."]
  ], ["Count three things for the atom: valence electrons, lone-pair electrons, and bonds.", "FC = V − L − B, where L counts every lone-pair electron and B counts bonds (double = 2).", "Example: O in H₂O has 6 − 4 − 2 = 0. Now do yours."],
    [fcQ, fcQ, fcQ, fcQ, fcQ, fcQ,
      ["The formal charges in a structure of SO₄²⁻ must add up to...", "−2", "0", "+2", "−6"]]));

  // 14 resonance
  a.push(les("Resonance and bond order", [
    ["More than one structure", "↔️", "When a molecule can be drawn with several equally good Lewis structures that differ only in electron placement (e.g. O₃, NO₃⁻), the real molecule is a <b>resonance hybrid</b>: an average of them."],
    ["Bond order", "🔢", "<b>Bond order</b> = number of bonding electron pairs between two atoms. Resonance gives fractional orders: O₃ (1.5 each O–O), NO₃⁻ (1.33), CO₃²⁻ (1.33), benzene C–C (1.5)."],
    ["Length and strength", "📏", "Higher bond order means a <b>shorter, stronger</b> bond. C–C (1) is longer than benzene C–C (1.5) which is longer than C=C (2)."]
  ], ["Count how many equivalent bonds share the extra bonding pair.", "Bond order = total bonds spread over the equivalent positions. Higher order means a shorter bond.", "Example: in SO₂ one S=O and one S–O swap places, so each has an order of (2 + 1)/2 = 1.5. Use the same averaging for yours."],
    [["What is the average N–O bond order in NO₃⁻?", "1.33", "1", "1.5", "2"],
      ["What is the average C–O bond order in CO₃²⁻?", "1.33", "1.5", "2", "1"],
      ["What is the average O–O bond order in ozone, O₃?", "1.5", "1", "2", "1.33"],
      ["What is the average S–O bond order in SO₂ drawn with resonance?", "1.5", "1", "2", "1.33"],
      ["What is the average C–C bond order in benzene?", "1.5", "1", "2", "3"],
      ["Which has the shortest N–O bond?", "NO₂⁺ (order 2)", "NO₃⁻ (order 1.33)", "NO₂⁻ (order 1.5)", "NO₃⁻ and NO₂⁻ tie for shortest"],
      ["Which C–O bond is the longest?", "In CH₃OH (single bond)", "In CO₃²⁻ (order 1.33)", "In CO₂ (order 2)", "In CO (order 3)"],
      ["What does a resonance hybrid mean?", "The real structure is an average of the contributing structures", "The molecule flips quickly between the structures", "The molecule has several isomers", "Only one structure is real"]]));

  // 15 electron domains
  const GEO = { 2: "Linear", 3: "Trigonal planar", 4: "Tetrahedral", 5: "Trigonal bipyramidal", 6: "Octahedral" };
  const SHAPE = {
    "4,0": "Tetrahedral", "4,1": "Trigonal pyramidal", "4,2": "Bent", "3,0": "Trigonal planar", "3,1": "Bent", "2,0": "Linear",
    "5,0": "Trigonal bipyramidal", "5,1": "Seesaw", "5,2": "T-shaped", "5,3": "Linear", "6,0": "Octahedral", "6,1": "Square pyramidal", "6,2": "Square planar"
  };
  // [formula, domains, lone pairs on the central atom]
  const SP = [["CO₂", 2, 0], ["BF₃", 3, 0], ["SO₂", 3, 1], ["CH₄", 4, 0], ["NH₃", 4, 1], ["H₂O", 4, 2], ["PCl₅", 5, 0], ["SF₄", 5, 1], ["ClF₃", 5, 2], ["XeF₂", 5, 3], ["SF₆", 6, 0], ["BrF₅", 6, 1], ["XeF₄", 6, 2],
    ["NO₃⁻", 3, 0], ["SO₄²⁻", 4, 0], ["ClO₃⁻", 4, 1], ["ICl₂⁻", 5, 3], ["NH₄⁺", 4, 0], ["O₃", 3, 1], ["CO₃²⁻", 3, 0], ["I₃⁻", 5, 3], ["ClF₄⁻", 6, 2], ["H₃O⁺", 4, 1], ["XeO₃", 4, 1]];
  const domQ = () => {
    const [f, d, lp] = pick(SP), t = ri(0, 2);
    const hint1 = "Count regions of electron density around the central atom: each bond (single, double or triple) counts as ONE domain, and so does each lone pair.";
    if (t === 0) return num(`How many electron domains surround the central atom in ${f}?`, d,
      [hint1, "Domains = atoms bonded to the central atom + lone pairs on it. Build the Lewis structure first (central atom lone pairs = leftover electrons ÷ 2).", "Example: in BrF₃, 3 bonded atoms + 2 lone pairs = 5 domains. Now do yours."], "🔵");
    if (t === 1) return num(`How many lone pairs are on the central atom of ${f}?`, lp,
      ["Draw the Lewis structure. After the bonds and outer-atom octets, what is left goes on the central atom.", "Lone pairs on the central atom = (valence electrons of the central atom, adjusted for the charge, minus electrons used in bonds) ÷ 2. Use domains minus bonded atoms as a check.", "Example: in NF₃ the nitrogen has 5 valence electrons, uses 3 in bonds, leaving 2, which is 1 lone pair. Now do yours."], "🔵");
    const right = GEO[d];
    return mcq(`What is the electron-domain geometry of ${f}?`, right, Object.values(GEO).filter(g => g !== right).slice(0, 3),
      [hint1, "Then match the number of domains to the arrangement that keeps them furthest apart (2 = 180° line, 3 = flat triangle, 4 = tetrahedron, 5 = two caps on a triangle, 6 = octahedron).", "Example: with 5 domains the arrangement is trigonal bipyramidal. Count the domains for yours and match."], "🔵");
  };
  a.push(les("VSEPR: electron domains", [
    ["Domains repel", "🎈", "Regions of electron density around the central atom (<b>electron domains</b>) repel and spread out as far as possible. A single, double or triple bond is <b>one domain</b>; a lone pair is also one."],
    ["Electron geometry", "📐", "2 domains: <b>linear</b> (180°). 3: <b>trigonal planar</b> (120°). 4: <b>tetrahedral</b> (109.5°). 5: <b>trigonal bipyramidal</b> (90°, 120°). 6: <b>octahedral</b> (90°)."],
    ["Worked example", "📝", "SF₄: S has 6 valence electrons, 4 are used in bonds, 2 left = 1 lone pair. Domains = 4 + 1 = <b>5</b>, so electron geometry is trigonal bipyramidal."]
  ], ["Each bond counts once, no matter whether it is single, double or triple.", "Add bonded atoms and lone pairs on the central atom. Match the total to a geometry.", "Example: XeF₄ has 4 bonded atoms + 2 lone pairs = 6 domains, octahedral. Now do yours."],
    [domQ, domQ, domQ, domQ, domQ, domQ]));

  // 16 molecular shapes
  const shapeQ = () => {
    const [f, d, lp] = pick(SP);
    const right = SHAPE[d + "," + lp], all = uniq(Object.values(SHAPE));
    const wrongs = [];
    // close-looking wrong answers first: shapes from the same domain count
    for (const k in SHAPE) if (k.startsWith(d + ",") && SHAPE[k] !== right) wrongs.push(SHAPE[k]);
    shuf(all).forEach(s => { if (s !== right && !wrongs.includes(s)) wrongs.push(s); });
    return mcq(`What is the molecular shape (only atoms counted) of ${f}?`, right, wrongs.slice(0, 3),
      ["First count domains, then count lone pairs on the central atom.", "The shape is named from the atom positions only: lone pairs take up a place but are not 'seen'. Use domains and lone pairs together.", "Example: 4 domains with 1 lone pair gives a trigonal pyramid (like PH₃). Use the same pairing of domains and lone pairs for yours."], "🔷");
  };
  a.push(les("Molecular geometry from VSEPR", [
    ["Lone pairs change the shape", "🔷", "Shape is named by where the <b>atoms</b> are. With 4 domains: 0 lone pairs = tetrahedral, 1 = <b>trigonal pyramidal</b> (NH₃), 2 = <b>bent</b> (H₂O)."],
    ["Five and six domains", "⭐", "5 domains: 0 = trigonal bipyramidal, 1 = <b>seesaw</b> (SF₄), 2 = <b>T-shaped</b> (ClF₃), 3 = <b>linear</b> (XeF₂). 6 domains: 0 = octahedral, 1 = <b>square pyramidal</b> (BrF₅), 2 = <b>square planar</b> (XeF₄)."],
    ["Bond angles", "📏", "Lone pairs take more room, so angles shrink: CH₄ 109.5°, NH₃ about 107°, H₂O about 104.5°. In trigonal bipyramids lone pairs go in the equatorial positions."]
  ], ["Find the domains and the lone pairs on the central atom.", "Match the (domains, lone pairs) pair to a shape name from the lesson.", "Example: 5 domains with 2 lone pairs gives a T-shape (ClF₃). Now do yours."],
    [shapeQ, shapeQ, shapeQ, shapeQ, shapeQ, shapeQ, shapeQ,
      ["What is the approximate H–O–H bond angle in water?", "104.5°", "109.5°", "120°", "180°"],
      ["What is the F–Xe–F bond angle in XeF₂?", "180°", "90°", "109.5°", "120°"],
      ["Why is the H–N–H angle in NH₃ (about 107°) smaller than 109.5°?", "The lone pair repels the bonding pairs more strongly", "Nitrogen is smaller than carbon", "The N–H bond is ionic", "NH₃ has a double bond"]]));

  // 17 molecular polarity
  const POL = [["CO₂", 0], ["H₂O", 1], ["CCl₄", 0], ["CHCl₃", 1], ["BF₃", 0], ["NH₃", 1], ["SF₆", 0], ["SF₄", 1], ["XeF₄", 0], ["PCl₅", 0], ["CH₂Cl₂", 1], ["XeF₂", 0], ["ClF₃", 1], ["SO₂", 1], ["SO₃", 0], ["CH₄", 0], ["HCl", 1], ["O₃", 1]];
  a.push(les("Molecular polarity and dipole moments", [
    ["Bond dipoles add up", "🧭", "Each polar bond is a vector (an arrow towards the more electronegative atom). The molecule is <b>polar</b> only if these vectors do <b>not cancel</b>."],
    ["Symmetry cancels", "⚖️", "Symmetric shapes with identical outer atoms cancel: CO₂, BF₃, CCl₄, SF₆, XeF₄ are <b>nonpolar</b>. A lone pair or different outer atoms break the symmetry: H₂O, NH₃, SF₄, CHCl₃ are <b>polar</b>."],
    ["Why it matters", "💧", "Polar molecules dissolve in polar solvents ('like dissolves like'), have higher boiling points than similar nonpolar ones, and turn in an electric field."]
  ], ["Draw the shape. Do the bond arrows balance out?", "Perfect symmetry with identical outer atoms means the dipoles cancel. A lone pair on the central atom or mixed outer atoms means they do not.", "Example: CF₄ is tetrahedral with four identical C–F bonds, so it is nonpolar, but CH₃F swaps three F for H and is polar. Now do yours."],
    POL.map(([f, p]) => [`Is ${f} polar or nonpolar?`, p ? "Polar" : "Nonpolar", p ? "Nonpolar" : "Polar"])));

  // 18 hybridization
  const HYB = { 2: "sp", 3: "sp²", 4: "sp³", 5: "sp³d", 6: "sp³d²" };
  const hybQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const [f, d] = pick(SP), right = HYB[d];
      return mcq(`What is the hybridization of the central atom in ${f}?`, right, Object.values(HYB).filter(h => h !== right).slice(0, 3),
        ["Hybridization follows the number of electron domains: the number of hybrid orbitals equals the number of domains.", "2 domains = sp, 3 = sp², 4 = sp³, 5 = sp³d, 6 = sp³d². Count domains for your molecule.", "Example: BrF₃ has 5 domains so Br is sp³d. Now do yours."], "🔀");
    }
    if (t === 1) {
      const [a1, r] = pick([["the carbon atoms in ethene (C₂H₄)", "sp²"], ["the carbon atoms in ethyne (C₂H₂)", "sp"], ["the carbon atom in methane (CH₄)", "sp³"], ["the carbon atom in HCN", "sp"], ["the carbon atom in formaldehyde (CH₂O)", "sp²"], ["the carbon atoms in ethane (C₂H₆)", "sp³"], ["the nitrogen atom in ammonia (NH₃)", "sp³"], ["the oxygen atom in water", "sp³"], ["the carbon atoms in benzene", "sp²"]]);
      return mcq(`What is the hybridization of ${a1}?`, r, Object.values(HYB).filter(h => h !== r).slice(0, 3),
        ["Count the electron domains around that atom: bonds (of any order) plus lone pairs.", "2 domains = sp, 3 = sp², 4 = sp³.", "Example: the carbon in CO₂ has 2 domains so it is sp. Now do yours."], "🔀");
    }
    const k = pick([["sp", 2], ["sp²", 1], ["sp³", 0]]);
    return num(`How many unhybridized p orbitals are left on an atom that is ${k[0]} hybridized (with n = 2 only p orbitals available)? These make its π bonds.`, k[1],
      ["The p subshell has 3 orbitals. Hybrid orbitals use some of them.", "sp uses 1 p orbital, sp² uses 2, sp³ uses all 3. The rest stay unhybridized.", "Example: in sp² carbons, 3 − 2 = 1 p orbital remains to form a π bond. Now do yours."], "🔀");
  };
  a.push(les("Valence bond theory and hybridization", [
    ["Mixing orbitals", "🔀", "To explain real shapes, atomic orbitals mix into equal <b>hybrid orbitals</b>. The number of hybrids equals the number of domains: sp (2), sp² (3), sp³ (4), sp³d (5), sp³d² (6)."],
    ["Sigma and pi", "🔗", "Head-on overlap makes a <b>σ bond</b>; sideways overlap of unhybridized p orbitals makes a <b>π bond</b>. A double bond is 1σ + 1π; a triple bond is 1σ + 2π."],
    ["Examples", "📝", "CH₄: carbon is <b>sp³</b>. C₂H₄: each carbon is <b>sp²</b> (3σ + one π from a leftover p). C₂H₂: each carbon is <b>sp</b> (two π bonds from two leftover p orbitals)."]
  ], ["Count the domains around the atom; that is the number of hybrid orbitals needed.", "Match the count: 2 = sp, 3 = sp², 4 = sp³, 5 = sp³d, 6 = sp³d². Leftover p orbitals make the π bonds.", "Example: the carbon in CO₂ has two domains so it is sp with two leftover p orbitals. Now do yours."],
    [hybQ, hybQ, hybQ, hybQ, hybQ, hybQ]));

  a.push(mix("Mixed practice", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  a.push(mix("Level 25 Challenge", at(a, [1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17])));

  // ================= LEVEL 26 =================
  const b = [];

  // 1 sigma and pi counts
  const SPI = [["ethene (C₂H₄)", 5, 1], ["ethyne (C₂H₂)", 3, 2], ["hydrogen cyanide (HCN)", 2, 2], ["carbon dioxide (CO₂)", 2, 2], ["formaldehyde (CH₂O)", 3, 1], ["ethane (C₂H₆)", 7, 0], ["propene (CH₃CH=CH₂)", 8, 1],
    ["benzene (C₆H₆, one Kekulé structure)", 12, 3], ["acetic acid (CH₃COOH)", 7, 1], ["nitrogen (N₂)", 1, 2], ["ethanol (CH₃CH₂OH)", 8, 0], ["acetonitrile (CH₃CN)", 5, 2], ["propyne (CH₃C≡CH)", 6, 2],
    ["ethanal (CH₃CHO)", 6, 1], ["propanone (CH₃COCH₃)", 9, 1], ["1,3-butadiene (CH₂=CH–CH=CH₂)", 9, 2], ["methanoic acid (HCOOH)", 4, 1]];
  const spiQ = () => {
    const [n, s, p] = pick(SPI), isS = ri(0, 1) === 0;
    return num(`How many ${isS ? "sigma (σ)" : "pi (π)"} bonds are there in one molecule of ${n}?`, isS ? s : p,
      ["Draw the full structure with every bond. A single bond is one σ; a double is σ + π; a triple is σ + two π.", isS ? "Count every bond line once as a σ bond (a double or triple bond contains exactly one σ). Include the C–H bonds." : "Only double and triple bonds contain π bonds: a double has one, a triple has two.", "Example: vinyl chloride CH₂=CHCl has 5 σ bonds (3 C–H, 1 C–Cl, 1 C–C) and 1 π bond. Now do yours."], "🔗");
  };
  b.push(les("Sigma and pi bonds: counting", [
    ["Two kinds of overlap", "🔗", "A <b>σ bond</b> is head-on overlap along the bond axis; every single bond is a σ. A <b>π bond</b> is sideways overlap of p orbitals above and below the axis and exists <b>only in double and triple bonds</b>."],
    ["Counting rule", "🧮", "Double bond = 1σ + 1π. Triple bond = 1σ + 2π. So the number of σ bonds equals the number of bonds drawn as lines when multiple bonds are counted once each."],
    ["Worked example", "📝", "Ethyne H–C≡C–H: 2 C–H σ + 1 C–C σ + 2 π = <b>3 σ and 2 π</b>. Ethene: 4 C–H σ + 1 C–C σ + 1 π = 5 σ and 1 π."]
  ], ["Sketch the structure and write out every bond.", "Count each line as one σ bond; then add extra π bonds for each second and third line in a multiple bond.", "Example: cyanogen N≡C–C≡N has 3 σ and 4 π. Now count yours."],
    [spiQ, spiQ, spiQ, spiQ, spiQ, spiQ, spiQ, spiQ]));

  // 2 MO bond order, 3 magnetism
  // [species, valence electrons, bond order, number of unpaired electrons]
  const MOS = [["B₂", 6, 1, 2], ["C₂", 8, 2, 0], ["N₂", 10, 3, 0], ["N₂⁺", 9, 2.5, 1], ["O₂", 12, 2, 2], ["O₂⁺", 11, 2.5, 1], ["O₂⁻", 13, 1.5, 1], ["O₂²⁻", 14, 1, 0], ["F₂", 14, 1, 0], ["NO", 11, 2.5, 1],
    ["NO⁺", 10, 3, 0], ["CO", 10, 3, 0], ["CN⁻", 10, 3, 0], ["He₂⁺", 3, 0.5, 1], ["H₂⁺", 1, 0.5, 1], ["Li₂", 2, 1, 0]];
  const moQ = () => {
    if (ri(0, 1) === 0) {
      const nb = ri(4, 10), na = ri(0, nb - 1), bo = (nb - na) / 2;
      return num(`A diatomic molecule has ${nb} electrons in bonding molecular orbitals and ${na} in antibonding molecular orbitals. What is its bond order?`, bo,
        ["Bond order compares bonding and antibonding electrons.", "Bond order = (bonding electrons − antibonding electrons) ÷ 2.", "Example: 12 bonding and 5 antibonding electrons give (12 − 5)/2 = 3.5. Now do yours."], "🧩");
    }
    const [sp, e, bo] = pick(MOS);
    return num(`Using the valence molecular orbital diagram, what is the bond order of ${sp}? (It has ${e} valence electrons.)`, bo,
      ["Fill the molecular orbitals from lowest energy up: σ2s, σ*2s, then the 2p-derived orbitals. Count bonding and antibonding electrons.", "For O₂ and F₂ the order is σ2s, σ*2s, σ2p, π2p, π*2p, σ*2p. For B₂, C₂, N₂ and lighter, π2p is below σ2p. Bond order = (bonding − antibonding)/2.", "Example: Be₂ has 4 valence electrons, 2 bonding and 2 antibonding, so (2 − 2)/2 = 0. Now do yours."], "🧩");
  };
  b.push(les("Molecular orbital theory: bond order", [
    ["Orbitals combine", "🧩", "When atomic orbitals overlap they form molecular orbitals: a lower-energy <b>bonding</b> MO and a higher-energy <b>antibonding</b> MO (marked *). Electrons fill them from the bottom up."],
    ["Bond order", "🔢", "<b>Bond order = (bonding electrons − antibonding electrons) / 2</b>. N₂ = 3, O₂ = 2, F₂ = 1, He₂ = 0 (it does not form). A higher order means a shorter, stronger bond."],
    ["Filling order", "📋", "For O₂, F₂: σ2s, σ*2s, σ2p, π2p (two), π*2p (two), σ*2p. For B₂, C₂, N₂: π2p lies <b>below</b> σ2p. Valence electrons only: O₂ has 12, so 8 bonding and 4 antibonding."]
  ], ["Count how many of the electrons end up in bonding orbitals and how many in antibonding ones.", "Bond order = (bonding − antibonding)/2. Antibonding electrons cancel bonding ones.", "Example: with 10 bonding and 2 antibonding electrons the order would be (10 − 2)/2 = 4, so build yours from its own counts. Now do yours."],
    [moQ, moQ, moQ, moQ, moQ, moQ,
      ["Which has the highest bond order?", "N₂", "O₂", "F₂", "Li₂"],
      ["What is the bond order of He₂ (4 electrons in σ1s and σ*1s)?", "0", "1", "2", "0.5"]]));

  const moMag = () => {
    const [sp, e, , un] = pick(MOS), t = ri(0, 1);
    if (t === 0) return mcq(`Is ${sp} (${e} valence electrons) paramagnetic or diamagnetic?`, un ? "Paramagnetic" : "Diamagnetic", [un ? "Diamagnetic" : "Paramagnetic"],
      ["Paramagnetic species have unpaired electrons; diamagnetic species have none.", "Fill the MOs, using Hund's rule for the degenerate π and π* orbitals, then look for single electrons.", "Example: Be₂ would have σ2s² σ*2s², all paired, so it would be diamagnetic. Now check yours."], "🧲");
    return num(`How many unpaired electrons does ${sp} (${e} valence electrons) have in its ground state?`, un,
      ["Fill the molecular orbitals in order and apply Hund's rule to the degenerate π2p and π*2p pairs.", "Remember the π and π* sets each have two orbitals, so they take single electrons before pairing.", "Example: C₂⁻ has 9 valence electrons: after σ2s, σ*2s and both π2p are full, the last one sits alone in σ2p, giving 1 unpaired. Now do yours."], "🧲");
  };
  b.push(les("MO theory: paramagnetism and stability", [
    ["Why O₂ is magnetic", "🧲", "Lewis structures predict all electrons paired in O₂, but liquid O₂ sticks to a magnet. MO theory puts the last two electrons <b>singly</b> in two π* orbitals: two unpaired electrons, so O₂ is <b>paramagnetic</b>."],
    ["Predicting", "🔮", "Fill the MOs, then count unpaired electrons: N₂ and C₂ are diamagnetic, B₂ and O₂ are paramagnetic. Ions: O₂⁺ and O₂⁻ both have 1 unpaired electron."],
    ["Stability", "📏", "Adding electrons to an antibonding MO lowers the bond order (O₂⁻ is weaker and longer than O₂); removing one raises it (O₂⁺ is stronger and shorter)."]
  ], ["Count unpaired electrons after filling all the molecular orbitals.", "Degenerate orbitals (the two π or two π*) fill singly first. Single electrons mean paramagnetic.", "Example: C₂ puts its last four electrons in the two π2p orbitals (two each), so all are paired and it is diamagnetic. Do yours with its own electron count."],
    [moMag, moMag, moMag, moMag, moMag, moMag,
      ["Which of these is paramagnetic?", "O₂", "N₂", "F₂", "CO"],
      ["Which has the shorter bond?", "O₂⁺", "O₂", "O₂⁻", "O₂²⁻"],
      ["Which has the longest bond?", "O₂²⁻", "O₂", "O₂⁺", "N₂"]]));

  // 4 lattice energy
  const CPR = [["MgO (Mg²⁺, O²⁻)", 4], ["CaO (Ca²⁺, O²⁻)", 4], ["Al₂O₃ (Al³⁺, O²⁻)", 6], ["AlN (Al³⁺, N³⁻)", 9], ["MgCl₂ (Mg²⁺, Cl⁻)", 2], ["BaS (Ba²⁺, S²⁻)", 4], ["Na₂O (Na⁺, O²⁻)", 2], ["AlF₃ (Al³⁺, F⁻)", 3], ["ScN (Sc³⁺, N³⁻)", 9], ["Li₂S (Li⁺, S²⁻)", 2]];
  const cprQ = () => { const [n, k] = pick(CPR);
    return num(`Lattice energy is proportional to (q₁ × q₂)/r. Compared with a 1+ / 1− ionic solid of the same ion separation, by what factor does the charge product increase for ${n}?`, k,
      ["Multiply the sizes of the two ion charges together (ignore the signs).", "The 1+ / 1− reference has charge product 1 × 1 = 1. Divide your product by this.", "Example: CaF₂ (Ca²⁺, F⁻) has 2 × 1 = 2, so a factor of 2. Now do yours."], "🧱"); };
  b.push(les("Lattice energy and Coulomb's law", [
    ["Pull between ions", "🧱", "<b>Lattice energy</b> is the energy released when gaseous ions form one mole of an ionic solid. By Coulomb's law it is proportional to <b>(q₁ × q₂)/r</b>, where r is the distance between ion centers."],
    ["Two effects", "⚖️", "<b>Bigger charges</b> mean much larger lattice energy (MgO ≫ NaF). <b>Smaller ions</b> (smaller r) also increase it (LiF > LiI, NaCl > KCl)."],
    ["Properties", "🔥", "A larger lattice energy means a higher melting point and a harder crystal. MgO (2+/2−) melts at about 2850 °C; NaCl (1+/1−) at about 800 °C."]
  ], ["Two things matter: how large the charges are and how close the ions sit.", "Compare charge products first. If they are equal, the smaller ions give the larger lattice energy.", "Example: BaO beats NaBr because 2 × 2 is much bigger than 1 × 1. Compare yours the same way."],
    [cprQ, cprQ, cprQ, cprQ, cprQ,
      ["Which has the larger lattice energy magnitude?", "LiF", "LiI", "They are equal", "CsI"],
      ["Which has the larger lattice energy magnitude?", "MgO", "NaF", "They are equal", "KCl"],
      ["Which has the larger lattice energy magnitude?", "NaCl", "KCl", "They are equal", "CsCl"],
      ["Which should have the highest melting point?", "MgO", "NaCl", "KBr", "CsI"],
      ["Which has the larger lattice energy magnitude?", "CaO", "KCl", "They are equal", "RbBr"]]));

  // 5 Born-Haber
  const bhQ = () => {
    const sub = ri(8, 16) * 10, at2 = ri(6, 12) * 10, ie = ri(40, 56) * 10, ea = ri(30, 35) * 10, L = until(() => ri(70, 100) * 10, v => v > sub + at2 + ie - ea + 100);
    const sum = sub + at2 + ie - ea, hf = sum - L; // hf negative, L magnitude
    const body = `ΔH(sublimation of M) = +${sub}, ½ΔH(dissociation of X₂) = +${at2}, IE₁ of M = +${ie}, electron affinity of X = −${ea} (all in kJ/mol)`;
    if (ri(0, 1) === 0) return num(`Born-Haber cycle for MX(s): ${body}. The standard enthalpy of formation of MX is ${mn(hf)} kJ/mol. What is the magnitude of the lattice energy (energy released forming MX(s) from gaseous ions), in kJ/mol?`, L,
      ["Hess's law: the enthalpy of formation equals the sum of all the steps of the cycle.", "ΔHf = sublimation + ½ dissociation + IE + EA + (lattice formation). Add the first four (EA is negative), then see what must be added to reach ΔHf.", `Example: with steps adding to +385 and ΔHf = −512 the lattice step is −897, so its magnitude is 897. Now do yours.`], "🔁");
    return num(`Born-Haber cycle for MX(s): ${body}, and the lattice energy released is ${L} kJ/mol. What is the magnitude of ΔHf of MX(s) in kJ/mol (it is negative)?`, -hf,
      ["Hess's law: add every step of the cycle, including the lattice step (which is negative, since energy is released).", `ΔHf = sublimation + ½ dissociation + IE + EA − lattice energy. Work out the sum and give its size.`, `Example: steps adding to +385 with a lattice energy of 897 give ΔHf = 385 − 897 = −512, so the size is 512. Now do yours.`], "🔁");
  };
  b.push(les("Born-Haber cycles", [
    ["Building a solid in steps", "🔁", "A <b>Born-Haber cycle</b> splits the formation of an ionic solid into steps: sublimation of the metal, dissociation of the nonmetal, ionization (IE), electron gain (EA), then the <b>lattice energy</b>."],
    ["Hess's law", "➕", "<b>ΔHf = ΔH(sub) + ½ΔH(diss) + IE + EA + U(lattice formation)</b>. The lattice step is strongly negative. Lattice energies can't be measured directly, so they are found by rearranging this."],
    ["Signs", "⚠️", "Sublimation, dissociation and IE are endothermic (+). EA is usually exothermic (−) for the first electron. Lattice formation is exothermic (−)."]
  ], ["Write down every step of the cycle and its sign.", "Add all steps; the total must equal the enthalpy of formation. Rearrange to find the unknown.", "Example: if the other steps add to +285 and ΔHf = −612, then the unknown lattice step is −897. Do yours."],
    [bhQ, bhQ, bhQ, bhQ, bhQ, bhQ,
      ["In a Born-Haber cycle, which step is always exothermic?", "Formation of the lattice from gaseous ions", "Ionization of the metal", "Sublimation of the metal", "Dissociation of the halogen"],
      ["Why can't lattice energy be measured directly?", "Gaseous ions can't be made in bulk to form the solid", "It is always zero", "The solid is too soft", "It has no units"]]));

  // 6 intermolecular forces
  b.push(les("Intermolecular forces and boiling points", [
    ["Four kinds", "🧲", "<b>London dispersion</b> (all molecules; grows with size and surface contact). <b>Dipole-dipole</b> (polar molecules). <b>Hydrogen bonding</b> (H on N, O or F attracted to a lone pair on N, O or F). <b>Ion-dipole</b> (ions in a polar solvent)."],
    ["Boiling points", "🌡️", "Stronger forces mean higher boiling points. Hydrogen bonding makes H₂O, HF and NH₃ boil far above their heavier family members. For similar molecules, the bigger one (more electrons) has stronger dispersion forces."],
    ["Shape matters", "📏", "A long chain (n-pentane) touches its neighbors more than a compact one (neopentane), so n-pentane boils higher (36 °C vs 10 °C)."]
  ], ["Ask: does the molecule have hydrogen bonding, a dipole, or only dispersion forces? How big is it?", "Hydrogen bonding is strongest among molecular forces; then dipole-dipole; dispersion rises with the number of electrons.", "Example: CH₃F boils higher than CH₄ because it is polar as well. Compare yours the same way."],
    [["What is the strongest intermolecular force in liquid HF?", "Hydrogen bonding", "Dispersion only", "Ion-dipole", "Dipole-dipole only"],
      ["What is the strongest intermolecular force in liquid CH₃Cl?", "Dipole-dipole", "Hydrogen bonding", "Ion-dipole", "Metallic bonding"],
      ["What is the only intermolecular force in liquid argon?", "London dispersion", "Dipole-dipole", "Hydrogen bonding", "Ion-dipole"],
      ["What force holds Na⁺ ions in water?", "Ion-dipole", "Hydrogen bonding", "Dispersion only", "Covalent bonds"],
      ["Which has the highest boiling point?", "H₂O", "H₂S", "H₂Se", "CH₄"],
      ["Which has the highest boiling point?", "SnH₄", "CH₄", "SiH₄", "GeH₄"],
      ["Which has the higher boiling point?", "Ethanol (CH₃CH₂OH)", "Dimethyl ether (CH₃OCH₃)", "They are equal", "Propane"],
      ["Which has the higher boiling point?", "Br₂", "Cl₂", "F₂", "They are equal"],
      ["Which can hydrogen bond with other molecules of itself?", "NH₃", "CH₄", "PH₃", "CH₃F"],
      ["Which has the higher boiling point?", "n-pentane", "neopentane (2,2-dimethylpropane)", "They are equal"]]));

  // 7 Dalton
  const daltonQ = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const [n1, n2, n3, P] = until(() => [ri(1, 6), ri(1, 6), ri(0, 4), pick([2, 3, 4, 5, 6, 8, 10, 12])], v => { const s = v[0] + v[1] + v[2]; return v[3] * v[0] % s === 0 && s >= 4; });
      const parts = [`${n1} mol of A`, `${n2} mol of B`]; if (n3) parts.push(`${n3} mol of C`);
      return num(`A mixture of ${parts.join(", ")} has a total pressure of ${P} atm. What is the partial pressure of gas A in atm?`, P * n1 / (n1 + n2 + n3),
        ["Partial pressure = mole fraction × total pressure.", "Mole fraction of A = moles of A ÷ total moles. Multiply by the total pressure.", "Example: 1 mol A of 5 mol total at 10 atm gives (1/5) × 10 = 2 atm. Now do yours."], "🎈");
    }
    if (t === 1) {
      const [x, y, z] = [ri(1, 9) * 10, ri(1, 9) * 10, ri(1, 9) * 10];
      return num(`A flask contains three gases with partial pressures ${x} torr, ${y} torr and ${z} torr. What is the total pressure in torr?`, x + y + z,
        ["Dalton's law is about adding.", "P(total) = P₁ + P₂ + P₃.", "Example: 100, 200 and 50 torr add to 350 torr. Now do yours."], "🎈");
    }
    if (t === 2) {
      const X = pick([10, 20, 25, 40, 50, 80]), P = pick([400, 760, 800, 1000]);
      return num(`A gas makes up ${X}% (by moles) of a mixture at a total pressure of ${P} torr. What is its partial pressure in torr?`, X * P / 100,
        ["Percent by moles is the same as mole fraction × 100.", "Partial pressure = (percent ÷ 100) × total pressure.", "Example: 30% of 500 torr is 0.30 × 500 = 150 torr. Now do yours."], "🎈");
    }
    const Pa = pick([740, 745, 750, 755, 760, 765]), pw = pick([[18, 20], [24, 25], [32, 30]]);
    return num(`Hydrogen is collected over water at ${pw[1]} °C, where the vapor pressure of water is ${pw[0]} torr. The total pressure is ${Pa} torr. What is the pressure of the dry hydrogen in torr?`, Pa - pw[0],
      ["The gas collected is a mixture of hydrogen and water vapor.", "P(total) = P(H₂) + P(H₂O), so subtract the water vapor pressure.", "Example: total 750 torr with water vapor 20 torr leaves 730 torr of dry gas. Now do yours."], "🎈");
  };
  b.push(les("Dalton's law and mole fractions", [
    ["Pressures add", "🎈", "In a gas mixture each gas acts as if it were alone. <b>P(total) = P₁ + P₂ + P₃ + ...</b>. Each P is the <b>partial pressure</b> of that gas."],
    ["Mole fraction", "➗", "<b>Mole fraction X = moles of the gas ÷ total moles</b>, and <b>P(gas) = X × P(total)</b>. In air, N₂ is about 78% so its partial pressure at 1 atm is about 0.78 atm."],
    ["Gas over water", "💧", "A gas collected over water is mixed with water vapor, so <b>P(gas) = P(total) − P(water vapor)</b>. Water's vapor pressure depends only on temperature."]
  ], ["Does the problem want you to add pressures, or to use a fraction of the total?", "Use P(gas) = X × P(total) with X = moles of gas ÷ total moles. For gas over water subtract the vapor pressure.", "Example: 2 mol of 8 total at 4 atm gives (2/8) × 4 = 1 atm. Do yours."],
    [daltonQ, daltonQ, daltonQ, daltonQ, daltonQ, daltonQ]));

  // 8 Graham
  const grQ = () => {
    const t = ri(0, 1);
    if (t === 0) {
      const [g1, m1, g2, m2, r] = pick([["H₂", 2, "O₂", 32, 4], ["He", 4, "SO₂", 64, 4], ["CH₄", 16, "SO₂", 64, 2], ["H₂", 2, "H₂O", 18, 3], ["He", 4, "CH₄", 16, 2], ["gas X (M = 4)", 4, "gas Y (M = 36)", 36, 3], ["gas X (M = 8)", 8, "gas Y (M = 72)", 72, 3], ["gas X (M = 9)", 9, "gas Y (M = 144)", 144, 4]]);
      return num(`By what factor does ${g1} (M = ${m1} g/mol) effuse faster than ${g2} (M = ${m2} g/mol) at the same temperature and pressure?`, r,
        ["Graham's law relates effusion rates to molar masses. The lighter gas is faster.", "Rate₁/Rate₂ = √(M₂/M₁). Divide the heavier mass by the lighter, then take the square root.", "Example: for M = 2 and M = 8, √(8/2) = 2, so the lighter gas is twice as fast. Now do yours."], "💨");
    }
    const [My, r] = pick([[16, 2], [32, 2], [64, 2], [128, 2], [36, 2], [72, 2], [144, 2], [36, 3], [72, 3], [144, 3]]);
    return num(`Gas X effuses ${r} times faster than gas Y, which has a molar mass of ${My} g/mol. What is the molar mass of X in g/mol?`, My / (r * r),
      ["A faster gas must be lighter. Use the square of the rate ratio.", "(Rate X / Rate Y)² = M(Y) / M(X). So M(X) = M(Y) ÷ (ratio)².", "Example: if X is 2 times faster than Y with M(Y) = 80, then M(X) = 80 ÷ 4 = 20. Now do yours."], "💨");
  };
  b.push(les("Graham's law of effusion", [
    ["Light gases escape faster", "💨", "<b>Effusion</b> is gas escaping through a tiny hole. At the same temperature lighter molecules move faster, so they effuse faster."],
    ["The law", "📐", "<b>Rate₁ / Rate₂ = √(M₂ / M₁)</b>. The rate depends on the square root of the inverse of molar mass. H₂ effuses 4 times faster than O₂ because √(32/2) = 4."],
    ["Uses", "🔬", "Graham's law separates isotopes (like ²³⁵UF₆ and ²³⁸UF₆) and finds unknown molar masses by comparing effusion times: the slower gas is the heavier one."]
  ], ["Lighter molecules at the same temperature move faster on average.", "Take the ratio of molar masses and then its square root. Work out which gas is lighter first.", "Example: M = 1 and M = 25 give √(25/1) = 5, so the lighter gas is 5 times faster. Do yours."],
    [grQ, grQ, grQ, grQ, grQ, grQ,
      ["Which gas effuses fastest at the same temperature?", "H₂", "N₂", "CO₂", "SO₂"],
      ["Gas A takes longer to effuse than gas B. Which is heavier?", "A", "B", "They are the same", "It cannot be told"]]));

  // 9 kinetic theory
  const ktQ = () => {
    const n = ri(2, 5), t = ri(0, 2), T1 = pick([100, 200, 300, 400]);
    if (t === 0) return num(`A gas is heated from ${T1} K to ${T1 * n * n} K. By what factor does the root-mean-square speed increase?`, n,
      ["u(rms) = √(3RT/M), so speed depends on the square root of temperature.", "Divide the final temperature by the initial one, then take the square root.", "Example: from 50 K to 450 K the ratio is 9 and the square root is 3. Now do yours."], "🌡️");
    if (t === 1) return num(`Two gases are at the same temperature. Gas Y is ${n * n} times heavier (molar mass) than gas X. How many times faster is the average speed of X compared with Y?`, n,
      ["At the same temperature all gases have the same average kinetic energy. So the lighter one must move faster.", "Speed ratio = √(M(Y)/M(X)). Take the square root of the mass ratio.", "Example: if Y is 36 times heavier, X is √36 = 6 times faster. Now do yours."], "🌡️");
    return num(`A gas sample is heated from ${T1} K to ${T1 * n} K. By what factor does the average kinetic energy of its molecules increase?`, n,
      ["Average kinetic energy is directly proportional to the absolute temperature: KE = (3/2)RT per mole.", "Divide the final temperature (in K) by the initial temperature.", "Example: from 150 K to 450 K the energy triples. Now do yours."], "🌡️");
  };
  b.push(les("Kinetic molecular theory: speeds and energies", [
    ["Temperature is motion", "🌡️", "Absolute temperature measures average kinetic energy: <b>KE(avg) = (3/2)RT</b> per mole (or (3/2)k<sub>B</sub>T per molecule). Doubling T in kelvin doubles the average KE."],
    ["Molecular speeds", "💨", "<b>u(rms) = √(3RT/M)</b>. At the same T, lighter gases are faster. At the same gas, 4 times the T gives 2 times the speed."],
    ["A spread of speeds", "📊", "Molecules have a distribution of speeds (Maxwell-Boltzmann). Raising T flattens and shifts the curve to the right; the peak speed rises but not every molecule is fast."]
  ], ["Which quantity is proportional to temperature, and which to its square root?", "KE is proportional to T. Speed is proportional to √T and to 1/√M.", "Example: raising T by a factor 9 raises u(rms) by 3 and KE by 9. Apply the same rule to yours."],
    [ktQ, ktQ, ktQ, ktQ, ktQ, ktQ,
      ["At the same temperature, how do the average kinetic energies of H₂ and O₂ molecules compare?", "They are equal", "H₂ is greater", "O₂ is greater", "H₂ is 16 times greater"],
      ["Raising the temperature of a gas makes the Maxwell-Boltzmann curve...", "shift to higher speeds and flatten", "narrow and shift to lower speeds", "stay the same", "disappear"]]));

  // 10 real gases
  b.push(les("Real gases and the van der Waals equation", [
    ["Where ideal fails", "🎈", "Ideal gas assumptions fail when molecules are crowded (<b>high pressure</b>) or slow (<b>low temperature</b>). Real molecules take up space and attract each other."],
    ["van der Waals", "📐", "<b>(P + a n²/V²)(V − nb) = nRT</b>. The constant <b>a</b> corrects for attractions (it lowers the pressure). The constant <b>b</b> corrects for the volume the molecules themselves occupy."],
    ["The compressibility factor", "📈", "<b>Z = PV/nRT</b> is 1 for an ideal gas. At moderate pressures attractions dominate and Z &lt; 1; at very high pressures molecular volume dominates and Z &gt; 1. Gases with strong forces (large a) like NH₃ deviate most."]
  ], ["Real gases are most like ideal ones when the molecules are far apart and fast.", "Attractions lower the pressure; molecular size raises it. Decide which effect each constant describes.", "Example: the constant for molecular volume is b because it subtracts from V. Use this idea for yours."],
    [["Under which conditions does a real gas behave most ideally?", "High temperature and low pressure", "Low temperature and high pressure", "Low temperature and low pressure", "High temperature and high pressure"],
      ["In the van der Waals equation, the constant a corrects for...", "attractions between molecules", "the volume of the molecules", "the temperature", "the number of moles"],
      ["In the van der Waals equation, the constant b corrects for...", "the volume of the molecules", "attractions between molecules", "the pressure of the container", "the speed of the molecules"],
      ["Which gas behaves most ideally under the same conditions?", "He", "NH₃", "CO₂", "SO₂"],
      ["At very high pressure, Z = PV/nRT is usually...", "greater than 1", "less than 1", "equal to 1", "zero"],
      ["At moderate pressure and low temperature, Z is usually...", "less than 1", "greater than 1", "exactly 1", "negative"],
      ["Compared with an ideal gas, a real gas dominated by attractions has a pressure that is...", "lower", "higher", "the same", "infinite"],
      ["Which gas should have the largest value of a (strongest attractions)?", "NH₃", "He", "H₂", "Ne"]]));

  // 11 phase diagrams
  b.push(les("Phase diagrams", [
    ["Reading the map", "🗺️", "A phase diagram plots pressure against temperature. The areas are solid, liquid and gas; the lines are equilibria between phases. At the <b>triple point</b> all three coexist."],
    ["The critical point", "🔥", "The liquid-gas line ends at the <b>critical point</b>. Above that temperature and pressure the substance is a <b>supercritical fluid</b> with no distinct liquid or gas."],
    ["Water vs CO₂", "🧊", "Water's solid-liquid line leans backward: pressure melts ice because ice is less dense than water. CO₂'s triple point is at 5.1 atm, so at 1 atm solid CO₂ <b>sublimes</b> (dry ice)."]
  ], ["Locate the point or line on the diagram: what is it separating?", "A line is where two phases are in equilibrium; a point where lines meet is special.", "Example: a point where three lines meet is the triple point. Use the map idea for yours."],
    [["On a phase diagram, the point where solid, liquid and gas coexist is the...", "triple point", "critical point", "boiling point", "sublimation point"],
      ["Above the critical temperature and pressure the substance is...", "a supercritical fluid", "a solid", "a liquid", "a gas that can be liquefied by pressure"],
      ["Why does the solid-liquid line of water slope backward (up and to the left)?", "Ice is less dense than liquid water", "Ice is more dense than liquid water", "Water is a gas at high pressure", "Water has a high critical point"],
      ["At 1 atm, why does dry ice sublime instead of melting?", "1 atm is below CO₂'s triple point pressure", "1 atm is above CO₂'s critical pressure", "CO₂ has no liquid phase at all", "Dry ice is not CO₂"],
      ["The normal boiling point is the temperature at which the vapor pressure equals...", "1 atm", "0 atm", "the triple point pressure", "the critical pressure"],
      ["Moving along the liquid-gas line toward higher T and P, you eventually reach the...", "critical point", "triple point", "melting point", "freezing line"],
      ["Squeezing ice at a temperature just below 0 °C can make it...", "melt", "sublime", "become a gas", "become hotter"],
      ["At the triple point, how many phases are at equilibrium?", "Three", "One", "Two", "Four"]]));

  // 12 Raoult
  const raQ = () => {
    const t = ri(0, 2);
    if (t < 2) {
      const [ns, nx, P] = until(() => [ri(1, 9), ri(1, 4), pick([40, 50, 60, 100, 120, 200])], v => (v[2] * v[0] / (v[0] + v[1])) % 1 === 0 && (v[2] * v[1] / (v[0] + v[1])) % 1 === 0 && v[0] + v[1] >= 3);
      if (t === 0) return num(`A solution contains ${ns} mol of solvent (pure vapor pressure ${P} torr) and ${nx} mol of a nonvolatile solute. What is the vapor pressure of the solution in torr?`, P * ns / (ns + nx),
        ["Raoult's law: the solute lowers the solvent's share of the surface.", "P(solution) = X(solvent) × P°(solvent), with X(solvent) = moles of solvent ÷ total moles.", "Example: 6 mol solvent and 2 mol solute with P° = 88 torr gives (6/8) × 88 = 66 torr. Now do yours."], "💧");
      return num(`A solution contains ${ns} mol of solvent (pure vapor pressure ${P} torr) and ${nx} mol of a nonvolatile solute. By how many torr is the vapor pressure lowered?`, P * nx / (ns + nx),
        ["The lowering is the difference between the pure solvent and the solution.", "ΔP = X(solute) × P°, with X(solute) = moles of solute ÷ total moles.", "Example: 2 mol solute in 8 mol total with P° = 84 torr gives ΔP = 0.25 × 84 = 21 torr. Now do yours."], "💧");
    }
    const [xa, pa, pb] = until(() => [pick([0.25, 0.5, 0.75]), ri(1, 10) * 20, ri(1, 10) * 20], v => v[1] !== v[2] && Number.isInteger(v[0] * v[1] + (1 - v[0]) * v[2]));
    return num(`An ideal solution has mole fraction ${xa} of liquid A (P° = ${pa} torr) and the rest liquid B (P° = ${pb} torr). What is the total vapor pressure in torr?`, xa * pa + (1 - xa) * pb,
      ["Both liquids are volatile, so both contribute.", "P(total) = X(A) P°(A) + X(B) P°(B), with X(B) = 1 − X(A).", "Example: X(A) = 0.5, P°(A) = 90, P°(B) = 30 gives 45 + 15 = 60 torr. Now do yours."], "💧");
  };
  b.push(les("Raoult's law and vapor pressure", [
    ["Solute lowers vapor pressure", "💧", "A nonvolatile solute takes up part of the surface, so fewer solvent molecules escape. <b>P(solution) = X(solvent) × P°(solvent)</b>."],
    ["Lowering", "📉", "<b>ΔP = X(solute) × P°</b>. The effect depends only on the <b>number</b> of solute particles (a colligative property)."],
    ["Mixing two liquids", "⚗️", "For an ideal mixture of two volatile liquids: <b>P(total) = X<sub>A</sub>P°<sub>A</sub> + X<sub>B</sub>P°<sub>B</sub></b>. Real mixtures deviate if A-B attractions differ from A-A and B-B."]
  ], ["Which mole fraction do you need: the solvent's, the solute's, or both liquids'?", "Find mole fractions from moles, then multiply by the pure vapor pressure(s).", "Example: X(solvent) = 0.9 and P° = 50 gives 45 torr. Do yours."],
    [raQ, raQ, raQ, raQ, raQ, raQ,
      ["Adding a nonvolatile solute to a solvent makes the vapor pressure...", "lower", "higher", "unchanged", "zero"],
      ["Raoult's law depends on...", "the mole fraction of solvent", "the color of the solute", "the mass of the container", "the density of the solute only"]]));

  // 13 molality
  const mlQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = until(() => pick([1, 2, 3, 4, 5, 6, 8]), () => true), kg = pick([0.5, 1, 2, 0.25]);
      return num(`${n} mol of solute is dissolved in ${kg} kg of solvent. What is the molality (mol/kg)?`, n / kg,
        ["Molality uses the mass of the solvent in kilograms, not the volume of the solution.", "Molality m = moles of solute ÷ kilograms of solvent.", "Example: 3 mol in 1.5 kg gives 3 ÷ 1.5 = 2 m. Now do yours."], "🥣"); }
    if (t === 1) { const [nm, Mr] = pick([["urea", 60], ["glucose", 180], ["sucrose", 342], ["ethylene glycol", 62]]), n = pick([0.5, 1, 2, 3]), kg = pick([0.5, 1, 2]);
      return num(`${r2(n * Mr)} g of ${nm} (molar mass ${Mr} g/mol) is dissolved in ${kg * 1000} g of water. What is the molality (mol/kg)? Give your answer as a number.`, n / kg,
        ["First turn grams of solute into moles using the molar mass.", "Moles = mass ÷ molar mass. Then divide by the kilograms of solvent (the grams of water ÷ 1000).", "Example: 90 g of a solute (30 g/mol) in 750 g of water is 3 mol in 0.75 kg = 4 m. Now do yours."], "🥣"); }
    const m = pick([0.5, 1, 2, 3]), kg = pick([2, 4, 0.5, 1.5]);
    return num(`A ${m} m solution is made with ${kg} kg of solvent. How many moles of solute are dissolved?`, m * kg,
      ["Rearrange the definition of molality to find moles.", "Moles of solute = molality × kilograms of solvent.", "Example: 2 m in 3 kg of solvent means 2 × 3 = 6 mol. Now do yours."], "🥣");
  };
  b.push(les("Molality and concentration units", [
    ["Why molality?", "🥣", "<b>Molality m = moles of solute / kg of solvent</b>. Unlike molarity (mol per liter of solution), it does not change with temperature, so it is used for colligative properties."],
    ["Other units", "🧮", "<b>Molarity</b> M = mol/L of solution. <b>Mole fraction</b> X = moles of one component / total moles. <b>Mass percent</b> = mass of solute / mass of solution × 100."],
    ["Converting", "🔄", "Grams → moles with the molar mass. Grams of solvent → kg by dividing by 1000. Example: 180 g glucose (180 g/mol) in 2 kg of water is 1 mol / 2 kg = <b>0.5 m</b>."]
  ], ["Check the units: the denominator of molality is the mass of SOLVENT in kilograms.", "Convert to moles and to kilograms of solvent before dividing.", "Example: 4 mol in 2 kg is 2 m. Do yours with its own numbers."],
    [mlQ, mlQ, mlQ, mlQ, mlQ, mlQ,
      ["Which concentration unit does not change when the temperature of the solution changes?", "Molality", "Molarity", "Volume percent", "Density"],
      ["The denominator of molality is...", "kilograms of solvent", "liters of solution", "moles of solvent", "grams of solution"]]));

  // 14 colligative
  const IFAC = [["glucose", 1], ["NaCl", 2], ["CaCl₂", 3], ["Al(NO₃)₃", 4], ["K₃PO₄", 4], ["MgSO₄", 2], ["(NH₄)₂SO₄", 3], ["Na₂CO₃", 3], ["KNO₃", 2], ["urea", 1]];
  const cgQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const m = pick([0.5, 1, 2]), [nm, i] = pick(IFAC);
      return num(`Estimate the freezing point depression ΔTf in °C of a ${m} m aqueous solution of ${nm}, assuming ideal behavior (Kf of water = 1.86 °C/m). Give the size of the drop.`, r2(1.86 * i * m),
        ["ΔTf = i × Kf × m. First decide how many particles one formula unit gives (the van't Hoff factor i).", "i is the number of ions per formula unit (1 for a molecule that does not ionize). Then multiply i × 1.86 × m.", "Example: 0.25 m Na₃PO₄ has i = 4, so ΔTf = 4 × 1.86 × 0.25 = 1.86 °C. Now do yours."], "🧊"); }
    if (t === 1) { const i = pick([1, 2, 3]), m = pick([0.5, 1, 2]);
      return num(`A ${m} m solution freezes ${r2(1.86 * i * m)} °C below the freezing point of pure water (Kf = 1.86 °C/m). What is the van't Hoff factor i?`, i,
        ["ΔTf = i × Kf × m. Solve for i.", "i = ΔTf ÷ (Kf × m).", "Example: ΔTf = 5.58 with m = 1.5 gives i = 5.58 ÷ (1.86 × 1.5) = 2. Now do yours."], "🧊"); }
    if (t === 2) { const m = pick([1, 2, 3]), i = pick([1, 2, 3]);
      return num(`Estimate the boiling point elevation ΔTb in °C for a solution with m = ${m} mol/kg and i = ${i} in water (Kb = 0.51 °C/m).`, r2(0.51 * m * i),
        ["Boiling point elevation: ΔTb = i × Kb × m.", "Multiply the three numbers: i, Kb and m.", "Example: i = 2, m = 4 gives 2 × 0.51 × 4 = 4.08 °C. Now do yours."], "🍲"); }
    const [nm, i] = pick(IFAC);
    return num(`Assuming complete dissociation, what is the van't Hoff factor i for ${nm} in water?`, i,
      ["Count the particles (ions) produced when one formula unit dissolves.", "Molecular substances like glucose and urea stay whole, so i = 1. Salts split into their ions.", "Example: Na₂SO₄ gives 2 Na⁺ and 1 SO₄²⁻, so i = 3. Now do yours."], "🧊");
  };
  b.push(les("Freezing point depression and boiling point elevation", [
    ["Particles count", "🧊", "A solute lowers the freezing point and raises the boiling point in proportion to the number of dissolved <b>particles</b>: <b>ΔT = i × K × m</b>."],
    ["The constants", "📏", "For water: <b>Kf = 1.86 °C/m</b>, <b>Kb = 0.51 °C/m</b>. The <b>van't Hoff factor i</b> is about the number of ions per formula unit: glucose 1, NaCl 2, CaCl₂ 3."],
    ["Which freezes lowest?", "🧂", "For equal molality, the solution with the biggest i has the lowest freezing point: 0.1 m CaCl₂ (i = 3) &lt; 0.1 m NaCl (i = 2) &lt; 0.1 m glucose (i = 1)."]
  ], ["Count the particles in solution, not the formula units.", "Multiply i × K × m. For ions, i is the number of ions each formula unit makes.", "Example: i = 2 and m = 1 with Kf = 1.86 gives 3.72 °C. Do yours."],
    [cgQ, cgQ, cgQ, cgQ, cgQ, cgQ,
      ["Which 0.1 m solution has the lowest freezing point?", "CaCl₂", "NaCl", "Glucose", "Sucrose"],
      ["Which 0.2 m solution has the highest boiling point?", "Al(NO₃)₃", "NaCl", "Glucose", "MgSO₄"]]));

  // 15 osmotic pressure
  const osQ = () => {
    const t = ri(0, 1), M = pick([0.2, 0.4, 0.6, 0.8]), i = pick([1, 2, 3]);
    if (t === 0) return num(`Find the osmotic pressure Π (in atm) at 298 K of a ${M} M solution with van't Hoff factor i = ${i}. Use RT = 24.5 L·atm/mol at 298 K and give your answer to 1 decimal place.`, Number((24.5 * i * M).toFixed(1)),
      ["Osmotic pressure is a colligative property: it depends on the number of particles.", "Π = i M R T, so Π = i × M × 24.5 (with RT = 24.5).", "Example: i = 1, M = 0.1 gives 24.5 × 0.1 = 2.45, but you need a different set of numbers. Now do yours."], "💧");
    return num(`A solution has i = ${i} and an osmotic pressure of ${Number((24.5 * i * M).toFixed(1))} atm at 298 K (RT = 24.5 L·atm/mol). What is its molarity in mol/L? Give your answer to 1 decimal place.`, M,
      ["Rearrange Π = i M R T to get M.", "M = Π ÷ (i × 24.5).", "Example: Π = 12.25 atm with i = 1 gives M = 12.25 ÷ 24.5 = 0.5. Now do yours with its own numbers."], "💧");
  };
  b.push(les("Osmotic pressure", [
    ["Water through a membrane", "💧", "In <b>osmosis</b> solvent passes through a semipermeable membrane from the dilute side to the concentrated side. The pressure needed to stop this is the <b>osmotic pressure Π</b>."],
    ["The equation", "📐", "<b>Π = i M R T</b> (R = 0.0821 L·atm/(mol·K)). At 298 K, RT = 24.5 L·atm/mol. A 0.1 M sugar solution has Π = 2.45 atm, which is large."],
    ["In life", "🩸", "Cells need <b>isotonic</b> surroundings (equal particle concentration). In hypotonic water, cells swell; in hypertonic salt water, they shrink. This is why IV fluids contain 0.9% NaCl."]
  ], ["Osmotic pressure grows with the number of dissolved particles.", "Use Π = i M R T, with RT given. Solve for the quantity you need.", "Example: Π = 4.9 atm with i = 1 gives M = 4.9 ÷ 24.5 = 0.2. Do yours."],
    [osQ, osQ, osQ, osQ, osQ, osQ,
      ["In osmosis, water moves...", "from the dilute to the more concentrated solution", "from the concentrated to the dilute solution", "in both directions equally at all times", "only into pure solvent"],
      ["A red blood cell in pure water will...", "swell", "shrink", "stay the same", "freeze"],
      ["Two solutions with the same particle concentration are...", "isotonic", "hypotonic", "hypertonic", "saturated"]]));

  // 16 unit cells
  const cellQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const [d, k] = pick([["the 8 corners only (simple cubic)", 1], ["the 8 corners and the body center (body-centered cubic)", 2], ["the 8 corners and the 6 face centers (face-centered cubic)", 4], ["the 8 corners and the 12 edge centers", 4], ["the 8 corners, the 6 face centers and the body center", 5], ["the 6 face centers only", 3]]);
      return num(`A cubic unit cell has atoms at ${d}. How many atoms belong to one unit cell? (A corner is shared by 8 cells, a face by 2, an edge by 4, the body by 1.)`, k,
        ["Count each type of position and weight it by how many cells share it.", "Corner = 1/8, face = 1/2, edge = 1/4, body = 1. Add the contributions.", "Example: only the 12 edge centers give 12 × 1/4 = 3 atoms. Now do yours."], "📦"); }
    if (t === 1) { const [n, k] = pick([["NaCl (rock salt)", 4], ["CsCl", 1], ["ZnS (zinc blende)", 4], ["CaF₂ (fluorite)", 4]]);
      return num(`How many formula units of ${n} are in one unit cell?`, k,
        ["Count the ions of one kind with sharing: corners 1/8, faces 1/2, edges 1/4, inside 1.", "For NaCl the Cl⁻ ions sit on an fcc lattice (8 corners + 6 faces). Count one ion type and use the formula ratio.", "Example: ions on the 8 corners plus the body center give 8 × 1/8 + 1 = 2 of that ion; for a 1 : 1 solid that would mean 2 formula units. Now work out yours."], "📦"); }
    const [s, k] = pick([["simple cubic", 6], ["body-centered cubic", 8], ["face-centered cubic", 12], ["hexagonal close-packed", 12]]);
    return num(`What is the coordination number (nearest neighbors of each atom) in a ${s} metal?`, k,
      ["Count the atoms touching one central atom.", "Simple cubic has the fewest neighbors; close-packed structures have the most.", "Example: in a flat square grid each circle touches 4 others, in a flat hexagonal grid 6. In 3D, closer packing always means more neighbors. Now do yours."], "📦");
  };
  b.push(les("Unit cells and crystal structures", [
    ["The repeating box", "📦", "A crystal is built from a repeating <b>unit cell</b>. Atoms on a corner count 1/8, on a face 1/2, on an edge 1/4 and inside 1. <b>Simple cubic = 1</b> atom, <b>BCC = 2</b>, <b>FCC = 4</b> per cell."],
    ["Packing", "🧱", "Coordination number and packing efficiency: simple cubic 6 and 52%; BCC 8 and 68%; FCC and HCP 12 and 74% (the most efficient)."],
    ["Ionic solids", "🧂", "NaCl: Cl⁻ in an fcc array, Na⁺ in all octahedral holes: 4 NaCl per cell, CN = 6:6. CsCl: 1 formula unit per cell, CN 8:8. ZnS: 4 formula units, CN 4:4."]
  ], ["Weight each position by how many neighboring cells share it.", "Add up the pieces: corners 1/8 each, faces 1/2, edges 1/4, body 1.", "Example: 8 × 1/8 + 6 × 1/2 = 4 for fcc. Use the same sum for yours."],
    [cellQ, cellQ, cellQ, cellQ, cellQ, cellQ,
      ["Which cubic arrangement packs atoms most efficiently?", "Face-centered cubic", "Simple cubic", "Body-centered cubic", "They are all the same"],
      ["What fraction of space is filled in a face-centered cubic metal?", "About 74%", "About 52%", "About 68%", "About 100%"]]));

  // 17 crystal geometry and density
  const cryQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const [nm, f, ratio] = pick([["face-centered cubic", "atoms touch along a face diagonal, so a = 2√2 × r", 2 * Math.SQRT2], ["body-centered cubic", "atoms touch along the body diagonal, so a = 4r/√3", 4 / Math.sqrt(3)], ["simple cubic", "atoms touch along an edge, so a = 2r", 2]]);
      const r = until(() => ri(8, 20) * 10, v => Math.abs((v * ratio) % 1 - 0.5) > 0.12);
      return num(`A metal with atomic radius ${r} pm crystallizes in a ${nm} lattice. What is the unit-cell edge length a, to the nearest pm?`, Math.round(r * ratio),
        ["Find which atoms touch along which line of the cube.", `For ${nm}, ${f}. Compute the number and round.`, "Example: for simple cubic with r = 125 pm, a = 2 × 125 = 250 pm. Now do yours."], "📐"); }
    if (t === 1) { const a1 = until(() => ri(30, 50) * 10, v => Math.abs((v * Math.SQRT2 / 4) % 1 - 0.5) > 0.12);
      return num(`A face-centered cubic metal has a unit-cell edge of ${a1} pm. What is its atomic radius, to the nearest pm?`, Math.round(a1 * Math.SQRT2 / 4),
        ["In fcc the atoms touch along the face diagonal.", "The face diagonal is a√2 = 4r, so r = a√2/4.", "Example: a = 365 pm gives r = 365 × 1.414/4 = 129 pm. Now do yours."], "📐"); }
    const M = pick([["Cu", 361, 63.55, 4], ["Al", 404, 26.98, 4], ["Au", 408, 197.0, 4], ["Pb", 495, 207.2, 4], ["Ni", 352, 58.69, 4], ["Fe", 287, 55.85, 2], ["W", 316, 183.84, 2]]);
    const rho = M[3] * M[2] / (6.022e23 * Math.pow(M[1] * 1e-10, 3));
    return num(`${M[0]} has a cubic unit cell of edge ${M[1]} pm with ${M[3]} atoms per cell and a molar mass of ${M[2]} g/mol. Calculate the density in g/cm³ to the nearest whole number. (1 pm = 10⁻¹⁰ cm; N<sub>A</sub> = 6.022×10²³)`, Math.round(rho),
      ["Density = mass of atoms in one cell ÷ volume of the cell.", "ρ = (Z × M) / (N_A × a³). Convert the edge length to cm before cubing: 1 pm = 10⁻¹⁰ cm.", "Example: a = 300 pm = 3.00×10⁻⁸ cm, a³ = 2.7×10⁻²³ cm³; with Z = 2 and M = 20 g/mol, mass = 40 / 6.022×10²³ = 6.64×10⁻²³ g, so ρ ≈ 2.5 g/cm³. Now do yours."], "📐");
  };
  b.push(les("Edge length, radius and density of crystals", [
    ["Where atoms touch", "📐", "<b>Simple cubic</b>: a = 2r. <b>Body-centered</b>: atoms touch along the body diagonal, 4r = a√3. <b>Face-centered</b>: along the face diagonal, 4r = a√2."],
    ["Density", "⚖️", "<b>ρ = Z M / (N<sub>A</sub> a³)</b> where Z = atoms per cell, M = molar mass and a is the edge length in cm (1 pm = 10⁻¹⁰ cm)."],
    ["Worked example", "📝", "Copper: fcc, a = 361 pm, M = 63.55. Mass per cell = 4 × 63.55 / 6.022×10²³ = 4.22×10⁻²² g. Volume = (3.61×10⁻⁸)³ = 4.70×10⁻²³ cm³. ρ ≈ <b>9.0 g/cm³</b>."]
  ], ["Decide which lattice you have and where the atoms touch.", "Use the right geometry relation first, then the density formula with consistent units.", "Example: bcc with r = 125 pm gives a = 4 × 125 / 1.732 = 289 pm. Do yours."],
    [cryQ, cryQ, cryQ, cryQ, cryQ, cryQ]));

  // 18 Beer-Lambert
  const beerQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const [e, bb, c] = until(() => [pick([2000, 4000, 5000, 8000, 10000, 20000]), pick([1, 2]), pick([10, 20, 25, 40, 50, 60, 80, 100])], v => { const A = v[0] * v[1] * v[2] * 1e-6; return A > 0 && A <= 1.8 && Math.abs(A * 10 - Math.round(A * 10)) < 1e-9 && Math.round(A * 10) % 10 !== 0; });
      return num(`A solution has ε = ${e} L/(mol·cm) and a path length of ${bb} cm. Its concentration is ${c} μM (1 μM = 10⁻⁶ mol/L). What is the absorbance? Give your answer to 1 decimal place.`, Math.round(e * bb * c * 1e-6 * 10) / 10,
        ["Beer-Lambert law: absorbance is proportional to path length and concentration.", "A = ε b c. Convert μM into mol/L first.", "Example: ε = 10000, b = 1, c = 30 μM gives A = 10000 × 1 × 3.0×10⁻⁵ = 0.3. Now do yours."], "🔦"); }
    if (t === 1) { const [e, bb, c] = until(() => [pick([2000, 4000, 5000, 8000, 10000, 20000]), pick([1, 2]), pick([10, 20, 25, 40, 50, 60, 80, 100])], v => { const A = v[0] * v[1] * v[2] * 1e-6; return A > 0 && A <= 1.8 && Math.abs(A * 10 - Math.round(A * 10)) < 1e-9 && Math.round(A * 10) % 10 !== 0; });
      const A = Math.round(e * bb * c * 1e-6 * 10) / 10;
      return num(`A sample in a ${bb} cm cell has absorbance ${A} and ε = ${e} L/(mol·cm). What is its concentration in μM?`, c,
        ["Solve A = ε b c for the concentration.", "c = A ÷ (ε b) in mol/L, then multiply by 10⁶ to get μM.", "Example: A = 0.9, ε = 15000, b = 1 gives c = 6.0×10⁻⁵ M = 60 μM. Now do yours."], "🔦"); }
    if (t === 2) { const [T, A] = pick([[100, 0], [10, 1], [1, 2]]);
      return num(`A solution transmits ${T}% of the light. What is its absorbance? (A = −log T, with T as a fraction.)`, A,
        ["A = log₁₀(1/T) with T written as a fraction, not a percent.", "Turn the percent into a fraction first, then ask: 10 to what power gives 1/T?", "Example: T = 50% is 0.5 and A ≈ 0.3; T = 0.1 (10%) is a different case. Use the powers of ten for yours."], "🔦"); }
    const [A, T] = pick([[0, 100], [1, 10], [2, 1]]);
    return num(`A solution has absorbance ${A}. What percent of the light is transmitted?`, T,
      ["T = 10 to the power −A, as a fraction.", "Then multiply by 100 for a percent.", "Example: A = 3 would transmit 10⁻³ = 0.001, which is 0.1%. Check the exponent for yours."], "🔦");
  };
  b.push(les("Beer-Lambert law and spectrophotometry", [
    ["Light absorbed", "🔦", "A spectrophotometer measures how much light a sample absorbs. <b>A = −log(I/I₀) = −log T</b>. T is the transmittance (fraction transmitted)."],
    ["Beer-Lambert law", "📏", "<b>A = ε b c</b> with ε the molar absorptivity (L/(mol·cm)), b the path length (cm) and c the concentration (mol/L). Doubling c doubles A."],
    ["Useful numbers", "🧮", "A = 0 → 100% transmitted. A = 1 → 10% transmitted. A = 2 → 1% transmitted. A calibration curve of A vs c gives unknown concentrations."]
  ], ["Absorbance goes up with concentration and with path length.", "Use A = ε b c. For A and T use powers of ten.", "Example: A = 0.5 with b = 2 gives the same as A = 0.25 with b = 1 for the same sample. Do yours."],
    [beerQ, beerQ, beerQ, beerQ, beerQ, beerQ,
      ["If the concentration of an absorbing solution doubles, the absorbance...", "doubles", "halves", "stays the same", "squares"],
      ["A plot of absorbance against concentration for a Beer-Lambert solution is...", "a straight line through the origin", "a curve that levels off immediately", "a horizontal line", "a circle"]]));

  b.push(mix("Mixed practice", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  b.push(mix("Level 26 Challenge", at(b, [0, 1, 3, 4, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17])));

  // ================= LEVEL 27 =================
  const c = [];
  const kJ = v => sg(v) + " kJ";

  // 1 first law
  const luQ = () => {
    const [q, w] = until(() => [ri(1, 9) * 10 * pick([1, -1]), ri(1, 9) * 10 * pick([1, -1])], v => v[0] + v[1] !== 0);
    const text = `A system ${q > 0 ? `absorbs ${q} J of heat` : `releases ${-q} J of heat`} and ${w > 0 ? `has ${w} J of work done on it` : `does ${-w} J of work on its surroundings`}. What is ΔU?`;
    const J = v => sg(v) + " J";
    return mcq(text, J(q + w), wr(J(q + w), [J(q - w), J(-(q + w)), J(w - q), J(Math.abs(q) + Math.abs(w))]),
      ["Convention: heat absorbed by the system is q > 0; work done ON the system is w > 0.", "ΔU = q + w. Give each number its sign first (releasing or doing work is negative), then add.", "Example: absorbs 15 J of heat and does 4 J of work on the surroundings: ΔU = +15 + (−4) = +11 J. Now do yours."], "🔋");
  };
  c.push(les("The first law: ΔU = q + w", [
    ["Energy is conserved", "🔋", "The internal energy of a system changes only by heat and work: <b>ΔU = q + w</b>. For an isolated system ΔU = 0."],
    ["Sign convention", "➕", "<b>q &gt; 0</b>: heat flows INTO the system. <b>w &gt; 0</b>: work is done ON the system (compression). Heat released or work done BY the system is negative."],
    ["Special cases", "🔎", "Constant volume: w = 0, so ΔU = q<sub>v</sub>. Adiabatic: q = 0, so ΔU = w. Isothermal ideal gas: ΔU = 0, so q = −w. Free expansion: w = 0."]
  ], ["Decide the sign of each term from the point of view of the system.", "Heat absorbed is positive; work done by the system is negative. Then add q and w.", "Example: heat released 6 J and work done on the system 10 J gives ΔU = −6 + 10 = +4 J. Do yours."],
    [luQ, luQ, luQ, luQ, luQ, luQ,
      ["For an ideal gas expanding isothermally, which is true?", "ΔU = 0 and q = −w", "ΔU = q", "q = 0", "w = 0"],
      ["For an adiabatic process, ΔU equals...", "w", "q", "0 always", "q + 2w"],
      ["For a process at constant volume, ΔU equals...", "q", "w", "q − w", "0 always"]]));

  // 2 PV work
  const pvQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const [P, dV] = until(() => [pick([1, 2, 3, 5]), pick([2, 4, 5, 10, 3])], v => Math.abs((v[0] * v[1] * 101.3) % 1 - 0.5) > 0.1);
      return num(`A gas expands by ${dV} L against a constant external pressure of ${P} atm. How much work does the gas do on the surroundings, in joules to the nearest whole number? (1 L·atm = 101.3 J)`, Math.round(P * dV * 101.3),
        ["Work against a constant external pressure is pressure times volume change.", "|w| = P·ΔV in L·atm, then multiply by 101.3 J per L·atm.", "Example: 2 atm × 6 L = 12 L·atm = 12 × 101.3 = 1216 J. Now do yours."], "📏"); }
    if (t === 1) { const [P, v1, v2] = until(() => [pick([1, 2, 3, 4]), ri(1, 5), ri(8, 15)], v => true);
      return num(`A gas expands from ${v1} L to ${v2} L against a constant external pressure of ${P} atm. How much work is done by the gas, in L·atm?`, P * (v2 - v1),
        ["Find the volume change first.", "|w| = P·(V₂ − V₁), where P is the constant external pressure.", "Example: 2 atm with 3 L → 9 L gives 2 × 6 = 12 L·atm. Now do yours."], "📏"); }
    const [txt, r] = pick([["A gas is compressed by a piston.", "Positive"], ["A gas expands against the atmosphere.", "Negative"], ["A gas expands into a vacuum (free expansion).", "Zero"], ["A reaction at constant volume in a rigid steel bomb.", "Zero"], ["A balloon is squeezed to a smaller volume.", "Positive"]]);
    return mcq(`${txt} What is the sign of the work w done on the system?`, r, ["Positive", "Negative", "Zero"].filter(x => x !== r),
      ["Work done ON the system is positive; work done BY the system is negative.", "w = −P(ext)·ΔV. If ΔV is zero or P(ext) is zero, there is no work.", "Example: a gas pushed into half its volume has ΔV < 0, so w > 0. Now decide yours."], "📏");
  };
  c.push(les("Pressure-volume work", [
    ["Expansion work", "📏", "At constant external pressure <b>w = −P<sub>ext</sub>ΔV</b>. An expanding gas does work on its surroundings so w is negative. A compressed gas has work done on it, so w is positive."],
    ["Units", "🔄", "1 L·atm = 101.3 J. Example: expanding by 5 L against 2 atm does 10 L·atm = 1013 J of work (so w = −1013 J)."],
    ["No work cases", "🚫", "No change in volume (rigid container) or no external pressure (free expansion into a vacuum) means <b>w = 0</b>."]
  ], ["Which direction does the volume change, and against what pressure?", "Use w = −P·ΔV with ΔV = V(final) − V(initial). Convert L·atm to J if needed.", "Example: 3 atm × 4 L = 12 L·atm; an expansion makes w negative. Do yours."],
    [pvQ, pvQ, pvQ, pvQ, pvQ, pvQ,
      ["Expansion into a vacuum (free expansion) does how much work?", "Zero", "Positive work", "Negative work", "P·ΔV with P = 1 atm"]]));

  // 3 delta n gas, ΔH vs ΔU
  const DN = [["N₂(g) + 3H₂(g) → 2NH₃(g)", -2], ["2H₂(g) + O₂(g) → 2H₂O(l)", -3], ["2H₂(g) + O₂(g) → 2H₂O(g)", -1], ["CaCO₃(s) → CaO(s) + CO₂(g)", 1], ["2SO₂(g) + O₂(g) → 2SO₃(g)", -1], ["H₂(g) + I₂(g) → 2HI(g)", 0],
    ["C(s) + O₂(g) → CO₂(g)", 0], ["CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)", -2], ["2NO₂(g) → N₂O₄(g)", -1], ["PCl₅(g) → PCl₃(g) + Cl₂(g)", 1], ["2KClO₃(s) → 2KCl(s) + 3O₂(g)", 3], ["N₂O₄(g) → 2NO₂(g)", 1], ["C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l)", -3]];
  const dnS = d => d === 0 ? "0" : (d > 0 ? "+" : "−") + Math.abs(d);
  const dnQ = () => {
    const [eq, d] = pick(DN);
    if (ri(0, 1) === 0) return mcq(`What is Δn(gas) for: ${eq}?`, dnS(d), wr(dnS(d), [d + 1, d - 1, -d, d + 2, d - 2].map(dnS)),
      ["Only gases count: solids and liquids are ignored.", "Δn = (moles of gaseous products) − (moles of gaseous reactants), using the coefficients.", "Example: 2CO(g) + O₂(g) → 2CO₂(g) has 2 − 3 = −1. Now do yours."], "💨");
    const right = d > 0 ? "ΔH is greater than ΔU" : d < 0 ? "ΔH is less than ΔU" : "ΔH equals ΔU";
    return mcq(`For ${eq} at constant temperature, how do ΔH and ΔU compare? (ΔH = ΔU + ΔnRT)`, right, ["ΔH is greater than ΔU", "ΔH is less than ΔU", "ΔH equals ΔU"].filter(x => x !== right),
      ["First find the change in moles of gas.", "ΔH − ΔU = Δn(gas)·RT, so the sign depends on the sign of Δn.", "Example: if gas moles go down, Δn < 0 and ΔH is less than ΔU. Now work out yours."], "💨");
  };
  c.push(les("ΔH and ΔU: the gas term", [
    ["Two energies", "💨", "<b>ΔU</b> is the heat at constant volume; <b>ΔH</b> is the heat at constant pressure. They differ only because of expansion work done by gases: <b>ΔH = ΔU + Δn(gas)·RT</b>."],
    ["Counting Δn", "🔢", "Δn(gas) = moles of gaseous products − moles of gaseous reactants. Ignore solids and liquids. Example: N₂ + 3H₂ → 2NH₃ has 2 − 4 = −2."],
    ["Size", "📏", "RT is about 2.48 kJ/mol at 298 K, so the difference is small, a few kJ. If Δn = 0, ΔH = ΔU exactly (H₂ + I₂ → 2HI)."]
  ], ["Count only the gases in the equation.", "Use the coefficients: products minus reactants. Zero means ΔH = ΔU.", "Example: 2CO + O₂ → 2CO₂ loses 1 mol of gas (Δn = −1), so ΔH is less than ΔU. Do yours."],
    [dnQ, dnQ, dnQ, dnQ, dnQ, dnQ, dnQ, dnQ]));

  // 4 Hess
  const hessQ = () => {
    const [x, y] = until(() => [ri(2, 20) * 10 * pick([1, -1]), ri(2, 20) * 10 * pick([1, -1])], v => v[0] + v[1] !== 0 && v[0] - v[1] !== 0);
    const t = ri(0, 3);
    if (t === 0) return mcq(`Given (1) A → B, ΔH = ${kJ(x)} and (2) B → C, ΔH = ${kJ(y)}. What is ΔH for A → C?`, kJ(x + y), wr(kJ(x + y), [kJ(x - y), kJ(y - x), kJ(-(x + y))]),
      ["Add the two steps; the intermediate B cancels.", "ΔH(overall) = ΔH₁ + ΔH₂ with their signs.", "Example: ΔH₁ = +35 and ΔH₂ = −12 give +23 kJ. Now do yours."], "🪜");
    if (t === 1) return mcq(`Given (1) 2A → B, ΔH = ${kJ(x)} and (2) B → C, ΔH = ${kJ(y)}. What is ΔH for 4A → 2C?`, kJ(2 * (x + y)), wr(kJ(2 * (x + y)), [kJ(x + y), kJ(2 * x + y), kJ(x + 2 * y), kJ(4 * (x + y))]),
      ["First find ΔH for 2A → C, then scale to the target equation.", "Doubling an equation doubles ΔH. Add the steps first, then multiply.", "Example: for steps +35 and −12 the sum is +23 for the base equation, so doubling gives +46. Now do yours."], "🪜");
    if (t === 2) return mcq(`Given (1) A → B, ΔH = ${kJ(x)} and (2) C → B, ΔH = ${kJ(y)}. What is ΔH for A → C?`, kJ(x - y), wr(kJ(x - y), [kJ(x + y), kJ(y - x), kJ(-(x + y))]),
      ["Step (2) goes the wrong way to cancel B, so it must be reversed.", "Reversing an equation changes the sign of ΔH: add ΔH₁ and −ΔH₂.", "Example: with +35 and −12, ΔH = 35 − (−12) = +47. Now do yours."], "🪜");
    return mcq(`Given (1) A → B, ΔH = ${kJ(x)} and (2) B → C, ΔH = ${kJ(y)}. What is ΔH for the reverse overall change C → A?`, kJ(-(x + y)), wr(kJ(-(x + y)), [kJ(x + y), kJ(y - x), kJ(x - y)]),
      ["First find ΔH for A → C, then think about reversing.", "Reversing a reaction flips the sign of ΔH.", "Example: if A → C were +23 kJ, then C → A would be −23 kJ. Now do yours."], "🪜");
  };
  c.push(les("Hess's law with several steps", [
    ["State function", "🪜", "ΔH depends only on the start and end, not the path. So you can <b>add reactions</b> and add their ΔH values."],
    ["Three rules", "📋", "<b>Reverse</b> an equation → change the sign of ΔH. <b>Multiply</b> an equation → multiply ΔH. <b>Add</b> equations → add ΔH. Cancel species that appear on both sides."],
    ["Worked example", "📝", "C(s)+O₂ → CO₂ (−394) and CO + ½O₂ → CO₂ (−283). To get C + ½O₂ → CO, add the first and the reverse of the second: −394 + 283 = <b>−111 kJ</b>."]
  ], ["Which steps need reversing or scaling so the unwanted species cancel?", "Reverse changes the sign, multiplying scales ΔH, then add everything.", "Example: with steps of +40 and −15 going the same direction, the overall ΔH is +25. Do yours."],
    [hessQ, hessQ, hessQ, hessQ, hessQ, hessQ]));

  // 5 calorimetry (bomb)
  const bombQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const C = pick([5, 10, 12, 15]), dT = pick([2, 3, 4, 5]);
      return num(`A bomb calorimeter has a heat capacity of ${C} kJ/°C. A reaction raises its temperature by ${dT} °C. How much heat (kJ) was absorbed by the calorimeter?`, C * dT,
        ["The calorimeter absorbs the heat released by the reaction.", "q = C(cal) × ΔT with C in kJ/°C.", "Example: C = 8 kJ/°C and ΔT = 3 °C gives q = 24 kJ. Now do yours."], "🔥"); }
    if (t === 1) { const [C, dT, n] = until(() => [pick([5, 10, 12, 15, 20]), pick([2, 3, 4, 5]), pick([0.5, 0.25, 0.2, 0.1])], v => Number.isInteger(Math.round(v[0] * v[1] / v[2] * 1e6) / 1e6));
      return num(`Burning ${n} mol of a fuel in a bomb calorimeter (C = ${C} kJ/°C) raises the temperature by ${dT} °C. What is the magnitude of ΔU for the combustion, in kJ per mole?`, Math.round(C * dT / n),
        ["Find the heat absorbed by the calorimeter, then scale it to one mole.", "q = C·ΔT. Then divide by the number of moles burned.", "Example: C = 8 kJ/°C, ΔT = 3 °C, 0.5 mol gives q = 24 kJ and 48 kJ/mol. Now do yours."], "🔥"); }
    const [dU, n, dT] = until(() => [pick([200, 300, 400, 500, 800, 1000]), pick([0.1, 0.2, 0.5]), pick([2, 2.5, 4, 5])], v => Number.isInteger(Math.round(v[0] * v[1] / v[2] * 1e6) / 1e6));
    return num(`A calorimeter's heat capacity is found by burning ${n} mol of a standard fuel that releases ${dU} kJ/mol. The temperature rises by ${dT} °C. What is the heat capacity of the calorimeter in kJ/°C?`, Math.round(dU * n / dT),
      ["Total heat released = moles × energy per mole.", "C = q ÷ ΔT, with q found from the moles and kJ per mole.", "Example: 0.2 mol releasing 300 kJ/mol gives 60 kJ; with ΔT = 3 °C that is C = 20 kJ/°C. Now do yours."], "🔥");
  };
  c.push(les("Bomb calorimetry", [
    ["Constant volume", "🔥", "A <b>bomb calorimeter</b> is a sealed steel vessel in water. The reaction occurs at constant volume so the heat measured is <b>q<sub>v</sub> = ΔU</b> (not ΔH)."],
    ["The calculation", "🧮", "<b>q = C(cal) × ΔT</b>, where C(cal) is the calorimeter's total heat capacity (kJ/°C), found by burning a standard. Then <b>ΔU per mole = −q / n</b>."],
    ["Compare", "⚖️", "A coffee-cup calorimeter works at constant pressure and measures ΔH. For a bomb result, convert with ΔH = ΔU + Δn·RT."]
  ], ["Which quantity is the calorimeter's heat capacity, and which is the temperature rise?", "q = C·ΔT, then divide by moles for kJ per mole.", "Example: 40 kJ of heat from 0.5 mol is 80 kJ/mol. Do yours."],
    [bombQ, bombQ, bombQ, bombQ, bombQ, bombQ,
      ["A bomb calorimeter measures the heat of reaction at constant...", "volume (so it gives ΔU)", "pressure (so it gives ΔH)", "temperature only", "entropy"],
      ["Which calorimeter measures ΔH directly at constant pressure?", "A coffee-cup calorimeter", "A bomb calorimeter", "A mass spectrometer", "A colorimeter"]]));

  // 6 ΔS°
  const SV = { "H₂": 131, "N₂": 192, "NH₃": 193, "O₂": 205, "H₂O(l)": 70, "CO₂": 214, "CO": 198, "C(s)": 6, "CH₄": 186, "HCl": 187, "Cl₂": 223, "NO": 211, "NO₂": 240, "N₂O₄": 304, "SO₂": 248, "SO₃": 257, "CaCO₃": 93, "CaO": 38 };
  const RX = [[[[1, "N₂"], [3, "H₂"]], [[2, "NH₃"]]], [[[2, "CO"], [1, "O₂"]], [[2, "CO₂"]]], [[[1, "CH₄"], [2, "O₂"]], [[1, "CO₂"], [2, "H₂O(l)"]]], [[[2, "H₂"], [1, "O₂"]], [[2, "H₂O(l)"]]], [[[1, "H₂"], [1, "Cl₂"]], [[2, "HCl"]]],
    [[[2, "NO₂"]], [[1, "N₂O₄"]]], [[[2, "SO₂"], [1, "O₂"]], [[2, "SO₃"]]], [[[1, "CaCO₃"]], [[1, "CaO"], [1, "CO₂"]]], [[[1, "C(s)"], [1, "O₂"]], [[1, "CO₂"]]], [[[2, "NO"], [1, "O₂"]], [[2, "NO₂"]]]];
  const side = s => s.map(([k, n]) => (k > 1 ? k : "") + n).join(" + ");
  const dsQ = () => {
    const [R, P] = pick(RX), tot = L => L.reduce((s, [k, n]) => s + k * SV[n], 0), tot1 = L => L.reduce((s, [, n]) => s + SV[n], 0);
    const ds = tot(P) - tot(R), J = v => sg(v) + " J/K";
    const names = uniq([...R, ...P].map(x => x[1])), tab = names.map(n => `${n} ${SV[n]}`).join(", ");
    return mcq(`Use S° (J/K·mol): ${tab}. Calculate ΔS° for ${side(R)} → ${side(P)}.`, J(ds), wr(J(ds), [J(-ds), J(tot1(P) - tot1(R)), J(tot(P) + tot(R)), J(tot1(R) - tot1(P))]),
      ["ΔS° = (sum for products) − (sum for reactants).", "Multiply each S° by its coefficient before adding. Gas moles dropping usually gives a negative ΔS°.", "Example: H₂O(l) → H₂O(g) would be 189 − 70 = +119 J/K, and 2A → B would be S°(B) − 2S°(A). Now do yours."], "🌀");
  };
  c.push(les("Calculating ΔS° of a reaction", [
    ["Standard molar entropy", "🌀", "Every substance has an absolute entropy S° (J/K·mol), tabulated at 298 K. Gases have much larger S° than liquids, which are larger than solids."],
    ["The calculation", "🧮", "<b>ΔS°(rxn) = Σ n·S°(products) − Σ n·S°(reactants)</b>. Multiply by the coefficients. Unlike ΔH°f, elements have nonzero S°."],
    ["Quick sign check", "🔎", "Fewer moles of gas on the right usually means ΔS° &lt; 0 (N₂ + 3H₂ → 2NH₃: −199 J/K). More moles of gas means ΔS° &gt; 0 (CaCO₃ → CaO + CO₂)."]
  ], ["Add up the entropy of the products and subtract the reactants.", "Remember the coefficients and the sign. Check your answer against the change in moles of gas.", "Example: products 400 J/K and reactants 520 J/K give ΔS° = −120 J/K. Do yours."],
    [dsQ, dsQ, dsQ, dsQ, dsQ, dsQ, dsQ, dsQ,
      ["Which has the larger standard molar entropy at 298 K?", "H₂O(g)", "H₂O(l)", "H₂O(s)", "They are equal"]]));

  // 7 ΔG°, K, Q
  const gkQ = () => {
    const t = ri(0, 1);
    if (t === 0) { const n = pick([2, 3, 4, 6, 8, 10]), X = Math.round(5.71 * n * 10) / 10;
      return num(`At 298 K a reaction has ΔG° = −${X} kJ/mol. Using ΔG° = −5.71·log₁₀K (kJ/mol), K = 10^x. What is x, to the nearest whole number?`, n,
        ["ΔG° = −RT ln K. At 298 K this equals −5.71 log₁₀ K in kJ/mol.", "log₁₀ K = −ΔG° ÷ 5.71 (with ΔG° in kJ/mol).", "Example: ΔG° = −34.3 kJ/mol gives log K = 34.3 ÷ 5.71 = 6. Now do yours."], "⚖️"); }
    const n = pick([1, 2, 3, 4, 6, 7, 8, 10]);
    return num(`At 298 K a reaction has K = 10^${n}. Using ΔG° = −5.71·log₁₀K (kJ/mol), what is the magnitude of ΔG° in kJ/mol, to the nearest whole number?`, Math.round(5.71 * n),
      ["For K greater than 1, ΔG° is negative. Multiply the exponent by the constant.", "|ΔG°| = 5.71 × log₁₀ K. Round to a whole number.", "Example: K = 10⁵ gives 28.55 kJ/mol, about 29. Now do yours."], "⚖️");
  };
  c.push(les("ΔG°, K and Q", [
    ["Free energy and K", "⚖️", "<b>ΔG° = −RT ln K</b> = −2.303RT log₁₀K. At 298 K: <b>ΔG° = −5.71 log₁₀K</b> kJ/mol. ΔG° &lt; 0 means K &gt; 1; ΔG° &gt; 0 means K &lt; 1; ΔG° = 0 means K = 1."],
    ["Away from equilibrium", "🧭", "<b>ΔG = ΔG° + RT ln Q</b> = RT ln(Q/K). If Q &lt; K, ΔG &lt; 0 and the reaction goes forward. If Q &gt; K, ΔG &gt; 0 and it goes backward. At equilibrium ΔG = 0."],
    ["Temperature", "🌡️", "van't Hoff: for an endothermic reaction (ΔH° &gt; 0) K increases with T; for an exothermic one K decreases with T. ΔG° = ΔH° − TΔS° gives the same prediction."]
  ], ["Large K means strongly product-favored, so ΔG° has which sign?", "Use ΔG° = −5.71 log K (kJ/mol, 298 K). Compare Q with K to find the direction.", "Example: Q smaller than K means the mixture still has too many reactants, so the forward reaction runs. Do yours."],
    [gkQ, gkQ, gkQ, gkQ,
      ["A reaction has Q &lt; K. What happens?", "It proceeds in the forward direction", "It proceeds in the reverse direction", "It is at equilibrium", "No reaction occurs"],
      ["A reaction has ΔG° = 0 at 298 K. What is K?", "1", "0", "Infinity", "298"],
      ["If ΔG° &gt; 0, then...", "K &lt; 1", "K &gt; 1", "K = 1", "K is negative"],
      ["For an endothermic reaction, K...", "increases as T increases", "decreases as T increases", "is independent of T", "is zero"],
      ["At equilibrium, ΔG is...", "0", "ΔG°", "negative", "positive"],
      ["If Q &gt; K for a reaction, ΔG is...", "positive", "negative", "zero", "equal to ΔG°"]]));

  // 8 integrated rate laws second order
  const soQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const A0 = pick([0.5, 0.25, 0.2, 0.1]), k = pick([0.1, 0.2, 0.5, 2]), tt = pick([10, 20, 50]);
      return num(`A second-order reaction has k = ${k} M⁻¹s⁻¹ and [A]₀ = ${A0} M. What is 1/[A] (in M⁻¹) after ${tt} s?`, Math.round(1 / A0 + k * tt),
        ["Second-order integrated law: a plot of 1/[A] against t is a straight line.", "1/[A] = 1/[A]₀ + kt. Compute 1/[A]₀ first, then add kt.", "Example: [A]₀ = 0.4 M, k = 0.5, t = 6 s gives 1/[A] = 2.5 + 3 = 5.5. Now do yours."], "⏳"); }
    if (t === 1) { const [k, A0] = until(() => [pick([0.1, 0.2, 0.5, 1, 2]), pick([0.5, 0.25, 0.2, 0.1, 0.05])], v => { const h = 1 / (v[0] * v[1]); return Math.abs(h - Math.round(h)) < 1e-9 && h <= 200 && h >= 1; });
      return num(`A second-order reaction has k = ${k} M⁻¹s⁻¹ and [A]₀ = ${A0} M. What is its half-life in seconds?`, Math.round(1 / (k * A0)),
        ["For second order, the half-life depends on the starting concentration.", "t½ = 1 / (k·[A]₀).", "Example: k = 0.5 and [A]₀ = 0.8 gives t½ = 1/(0.4) = 2.5 s. Now do yours."], "⏳"); }
    const [y1, k, tt] = [pick([2, 5, 10]), pick([1, 2, 3, 5]), pick([10, 20, 30])];
    return num(`For a second-order reaction, 1/[A] is ${y1} M⁻¹ at the start and ${y1 + k * tt} M⁻¹ after ${tt} s. What is the rate constant k in M⁻¹s⁻¹?`, k,
      ["The graph of 1/[A] vs t is a straight line; k is its slope.", "k = change in 1/[A] ÷ change in time.", "Example: 1/[A] rises from 4 to 28 in 6 s, so k = 24/6 = 4. Now do yours."], "⏳");
  };
  c.push(les("Second-order kinetics", [
    ["Straight-line tests", "📈", "<b>Zero order</b>: [A] vs t is a line. <b>First order</b>: ln[A] vs t is a line (slope −k). <b>Second order</b>: <b>1/[A] vs t</b> is a line (slope +k)."],
    ["Second-order equations", "🧮", "<b>1/[A] = 1/[A]₀ + kt</b>. Half-life <b>t½ = 1/(k[A]₀)</b>: it gets longer as the reaction proceeds, because [A]₀ for each new half-life is smaller."],
    ["Compare half-lives", "⏱️", "First order: t½ = 0.693/k is constant. Zero order: t½ = [A]₀/(2k), shorter as it proceeds. Second order: t½ doubles each time."]
  ], ["Which plot is linear tells you the order.", "For second order use 1/[A] = 1/[A]₀ + kt, or t½ = 1/(k[A]₀).", "Example: 1/[A]₀ = 5 and kt = 7 give 1/[A] = 12. Do yours."],
    [soQ, soQ, soQ, soQ, soQ, soQ,
      ["A plot of ln[A] against time is a straight line. What is the order?", "First order", "Zero order", "Second order", "Third order"],
      ["A plot of 1/[A] against time is a straight line. What is the order?", "Second order", "First order", "Zero order", "Half order"],
      ["For a second-order reaction the half-life...", "increases as the reaction proceeds", "stays the same", "decreases as the reaction proceeds", "equals 0.693/k"]]));

  // 9 Arrhenius
  const arQ = () => {
    if (ri(0, 1) === 0) { const s = pick([3000, 5000, 6000, 8000, 10000, 12000, 15000]);
      return num(`A plot of ln k against 1/T has a slope of −${s} K. What is the activation energy in kJ/mol, to the nearest whole number? (R = 8.314 J/(mol·K))`, Math.round(s * 8.314 / 1000),
        ["The Arrhenius equation in log form is a straight line: ln k = ln A − Ea/(RT).", "slope = −Ea/R, so Ea = −slope × R. Convert J to kJ.", "Example: a slope of −4000 K gives Ea = 4000 × 8.314 = 33256 J/mol ≈ 33 kJ/mol. Now do yours."], "📉"); }
    const Ea = pick([25, 50, 75, 100]);
    return num(`A reaction has an activation energy of ${Ea} kJ/mol. What is the magnitude of the slope of its ln k versus 1/T plot, in K, to the nearest whole number? (R = 8.314 J/(mol·K))`, Math.round(Ea * 1000 / 8.314),
      ["The slope of ln k against 1/T is related to the activation energy and R.", "|slope| = Ea/R, with Ea in J/mol (multiply kJ by 1000).", "Example: Ea = 40 kJ/mol gives 40000/8.314 = 4811 K. Now do yours."], "📉");
  };
  c.push(les("The Arrhenius equation", [
    ["Rate constant and temperature", "🌡️", "<b>k = A·e<sup>−Ea/RT</sup></b>. A is the frequency factor; the exponential is the fraction of collisions with at least the activation energy Ea."],
    ["Linear form", "📉", "<b>ln k = ln A − (Ea/R)(1/T)</b>. A plot of ln k against 1/T is a straight line with <b>slope −Ea/R</b> and intercept ln A. R = 8.314 J/(mol·K)."],
    ["Consequences", "🔥", "Higher T means larger k. A larger Ea means a steeper line: the reaction is more sensitive to temperature. A catalyst lowers Ea, so k rises at the same T."]
  ], ["Which part of the straight line contains Ea?", "slope = −Ea/R. Work in joules, then convert to kilojoules.", "Example: slope −2000 K gives Ea = 2000 × 8.314 = 16628 J/mol, about 17 kJ/mol. Do yours."],
    [arQ, arQ, arQ, arQ, arQ,
      ["In an Arrhenius plot of ln k against 1/T, the slope is...", "negative", "positive", "zero", "equal to ln A"],
      ["A catalyst increases a reaction rate by...", "lowering the activation energy", "raising the temperature", "increasing ΔH", "changing the equilibrium constant"],
      ["Which reaction is most sensitive to a rise in temperature?", "The one with the highest Ea", "The one with the lowest Ea", "The one with Ea = 0", "All are equally sensitive"],
      ["The intercept of the ln k vs 1/T plot is...", "ln A", "Ea/R", "−Ea", "k"]]));

  // 10 mechanisms
  const MECH = [
    ["Step 1 (slow): NO₂ + NO₂ → NO₃ + NO. Step 2 (fast): NO₃ + CO → NO₂ + CO₂.", "k[NO₂]²", ["k[NO₂][CO]", "k[NO₂]²[CO]", "k[NO₃][CO]"]],
    ["Step 1 (fast, equilibrium): NO + Br₂ ⇌ NOBr₂. Step 2 (slow): NOBr₂ + NO → 2NOBr.", "k[NO]²[Br₂]", ["k[NO][Br₂]", "k[NOBr₂][NO]", "k[NO]²[Br₂]²"]],
    ["Step 1 (fast, equilibrium): 2NO ⇌ N₂O₂. Step 2 (slow): N₂O₂ + O₂ → 2NO₂.", "k[NO]²[O₂]", ["k[N₂O₂][O₂]", "k[NO][O₂]", "k[NO]²[O₂]²"]],
    ["Step 1 (slow): H₂O₂ + I⁻ → H₂O + IO⁻. Step 2 (fast): H₂O₂ + IO⁻ → H₂O + O₂ + I⁻.", "k[H₂O₂][I⁻]", ["k[H₂O₂]²[I⁻]", "k[H₂O₂][IO⁻]", "k[H₂O₂][I⁻][IO⁻]"]],
    ["Step 1 (fast, equilibrium): Cl₂ ⇌ 2Cl. Step 2 (slow): Cl + CHCl₃ → HCl + CCl₃.", "k[Cl₂]^(1/2)[CHCl₃]", ["k[Cl₂][CHCl₃]", "k[Cl][CHCl₃]", "k[Cl₂]²[CHCl₃]"]],
    ["Step 1 (fast, equilibrium): O₃ ⇌ O₂ + O. Step 2 (slow): O + O₃ → 2O₂.", "k[O₃]²/[O₂]", ["k[O₃]", "k[O][O₃]", "k[O₃]²"]],
    ["Step 1 (slow): NO₂ + F₂ → NO₂F + F. Step 2 (fast): NO₂ + F → NO₂F.", "k[NO₂][F₂]", ["k[NO₂]²[F₂]", "k[NO₂][F]", "k[F₂]"]],
    ["Step 1 (slow): A → B. Step 2 (fast): B + C → D.", "k[A]", ["k[A][B]", "k[B][C]", "k[A][C]"]]
  ];
  c.push(les("Mechanisms and rate laws", [
    ["Elementary steps", "🧩", "A mechanism is a series of <b>elementary steps</b>. For an elementary step the rate law comes straight from its molecularity (A + B → ... has rate k[A][B]). The overall rate law comes from the <b>slow step</b>."],
    ["Intermediates", "👻", "An <b>intermediate</b> is made in one step and used in a later one. It can't appear in the final rate law. If the slow step contains one, replace it using the fast equilibrium before it."],
    ["Worked example", "📝", "Fast: 2NO ⇌ N₂O₂ (K). Slow: N₂O₂ + O₂ → 2NO₂. Rate = k₂[N₂O₂][O₂], with [N₂O₂] = K[NO]², so <b>rate = k[NO]²[O₂]</b>. A <b>catalyst</b> appears first as a reactant and then reappears."]
  ], ["The slowest step controls the rate. Find it first.", "If the slow step contains an intermediate, use the fast equilibrium before it to express the intermediate with reactants.", "Example: fast A ⇌ I, slow I + C → P gives rate = k[I][C] and [I] = K[A], so rate = k[A][C]. Do yours."],
    MECH.map(([d, r, w]) => [`${d} What is the rate law?`, r, ...w]).concat([
      ["Step 1: H₂O₂ + I⁻ → H₂O + IO⁻. Step 2: H₂O₂ + IO⁻ → H₂O + O₂ + I⁻. Which species is the catalyst?", "I⁻", "IO⁻", "H₂O₂", "O₂"],
      ["Step 1: H₂O₂ + I⁻ → H₂O + IO⁻. Step 2: H₂O₂ + IO⁻ → H₂O + O₂ + I⁻. Which species is the intermediate?", "IO⁻", "I⁻", "H₂O", "O₂"]])));

  // 11 Kp and Kc
  const kpQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const [eq, d] = pick(DN);
      const right = dnS(d);
      return mcq(`For Kp = Kc(RT)^Δn, what is Δn for: ${eq}?`, right, wr(right, [d + 1, d - 1, -d, d + 2, d - 2].map(dnS)),
        ["Count gases only.", "Δn = moles of gaseous products − moles of gaseous reactants.", "Example: 2CO + O₂ → 2CO₂ has Δn = 2 − 3 = −1. Now do yours."], "📐"); }
    if (t === 1) { const [a1, b1] = until(() => [pick([1, 2, 3, 4]), ri(1, 6)], v => (v[1] * v[1]) % v[0] === 0);
      return num(`For N₂O₄(g) ⇌ 2NO₂(g), the equilibrium partial pressures are P(N₂O₄) = ${a1} atm and P(NO₂) = ${b1} atm. What is Kp?`, b1 * b1 / a1,
        ["Write Kp from the equation: products over reactants, powers = coefficients.", "Kp = P(NO₂)² / P(N₂O₄).", "Example: with P(N₂O₄) = 5 atm and P(NO₂) = 10 atm, Kp = 100/5 = 20. Now do yours."], "📐"); }
    if (t === 2) { const Kc = pick([2, 4, 6, 10]);
      return num(`For N₂O₄(g) ⇌ 2NO₂(g) at 298 K, Kc = ${Kc}. What is Kp? Use RT = 24.5 L·atm/mol and Kp = Kc(RT)^Δn.`, Kc * 24.5,
        ["Find Δn for the reaction first.", "Here Δn = +1, so Kp = Kc × RT = Kc × 24.5.", "Example: for PCl₅ ⇌ PCl₃ + Cl₂ with Kc = 0.2 the same rule gives 0.2 × 24.5 = 4.9. Now do yours."], "📐"); }
    const P = pick([2, 3, 4, 5, 6, 8]);
    return num(`For CaCO₃(s) ⇌ CaO(s) + CO₂(g), the equilibrium pressure of CO₂ is ${P} atm. What is Kp?`, P,
      ["Pure solids do not appear in the equilibrium expression.", "Only the gas is left, so Kp = P(CO₂).", "Example: for NH₄Cl(s) ⇌ NH₃(g) + HCl(g) with each gas at 2 atm, Kp = 2 × 2 = 4. Now do yours."], "📐");
  };
  c.push(les("Kp and Kc", [
    ["Two constants", "📐", "<b>Kc</b> uses molar concentrations; <b>Kp</b> uses partial pressures. Pure solids and liquids are left out of both."],
    ["Converting", "🔄", "<b>Kp = Kc(RT)<sup>Δn</sup></b>, with Δn = moles of gaseous products − moles of gaseous reactants, R = 0.0821 L·atm/(mol·K) and T in kelvin. If Δn = 0, Kp = Kc."],
    ["Worked example", "📝", "N₂O₄ ⇌ 2NO₂: Δn = +1. Kp = P(NO₂)² / P(N₂O₄). If Kc = 0.0057 at 298 K, Kp = 0.0057 × 24.5 ≈ 0.14."]
  ], ["Write the expression, then count gas moles for Δn.", "Kp = P(products)^coef / P(reactants)^coef, or Kp = Kc(RT)^Δn.", "Example: with P(A) = 4 and P(B) = 6 for A ⇌ B, Kp = 6/4 = 1.5. Do yours."],
    [kpQ, kpQ, kpQ, kpQ, kpQ, kpQ]));

  // 12 polyprotic
  const ppQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const [p1, p2] = pick([[2, 6], [3, 7], [2, 8], [4, 10], [1, 5], [6, 10], [3, 9], [2, 10]]);
      return num(`A diprotic acid H₂X has pKa₁ = ${p1} and pKa₂ = ${p2}. What is the approximate pH of a solution of the amphiprotic salt NaHX?`, (p1 + p2) / 2,
        ["The HX⁻ ion can act as an acid and as a base, so its pH sits halfway between two pKa values.", "pH ≈ (pKa₁ + pKa₂) / 2.", "Example: pKa values 3 and 5 give pH ≈ 4. Now do yours."], "🧪"); }
    if (t === 1) { const [n, a2] = pick([["H₂SO₄", 2], ["H₃PO₄", 3], ["H₂CO₃", 2], ["citric acid (H₃C₆H₅O₇)", 3], ["oxalic acid (H₂C₂O₄)", 2], ["H₃AsO₄", 3]]), m = pick([1, 2, 3]);
      return num(`How many moles of NaOH are needed to completely neutralize ${m} mol of ${n}?`, m * a2,
        ["NaOH supplies one OH⁻ per formula unit.", "Count the acidic hydrogens per molecule, then multiply by the moles of acid.", "Example: 2 mol of H₂SeO₄ (two acidic H) needs 2 × 2 = 4 mol of NaOH. Now do yours."], "🧪"); }
    const v = pick([10, 12.5, 15, 20, 25, 30]);
    return num(`Titrating a diprotic acid H₂A with NaOH, the first equivalence point is reached at ${v} mL. At what total volume of NaOH (mL) is the second equivalence point reached?`, 2 * v,
      ["Each proton needs the same amount of NaOH.", "The second equivalence point comes at twice the volume of the first.", "Example: a first equivalence point at 8 mL means the second is at 16 mL. Now do yours."], "🧪");
  };
  c.push(les("Polyprotic acids and titration", [
    ["Step by step", "🪜", "A polyprotic acid loses its protons one at a time, with <b>Ka₁ &gt; Ka₂ &gt; Ka₃</b>. H₃PO₄ → H₂PO₄⁻ → HPO₄²⁻ → PO₄³⁻. Usually the first ionization sets the pH."],
    ["Species vs pH", "📊", "At <b>pH = pKa</b>, the acid and conjugate base are equal. Below pKa₁ H₂A dominates; between pKa₁ and pKa₂ HA⁻ dominates; above pKa₂ A²⁻ dominates."],
    ["Amphiprotic ions", "🧪", "An ion like HCO₃⁻ or HPO₄²⁻ is both acid and base. The pH of its solution is about <b>(pKa₁ + pKa₂)/2</b>. A titration curve shows one equivalence point per proton."]
  ], ["Think of each proton being removed in turn.", "The midpoint between two pKa values gives the pH of the amphiprotic form. Count acidic hydrogens for neutralization.", "Example: pKa₁ = 4 and pKa₂ = 8 gives pH ≈ 6. Do yours."],
    [ppQ, ppQ, ppQ, ppQ, ppQ, ppQ,
      ["At pH = pKa₁ of a diprotic acid H₂A, which is true?", "[H₂A] = [HA⁻]", "[HA⁻] = [A²⁻]", "[H₂A] = [A²⁻]", "All forms are 0"],
      ["Which ionization of a polyprotic acid has the largest Ka?", "The first", "The second", "The last", "They are equal"]]));

  // 13 Nernst
  const nernstQ = () => {
    const [E0, n, nm] = pick([[1.10, 2, "Zn/Cu"], [0.78, 2, "Fe/Cu"], [0.46, 2, "Cu/Ag"], [1.05, 2, "Ni/Ag"], [0.32, 2, "Zn/Fe"], [2.71, 2, "Mg/Cu"]]);
    const [Q] = until(() => [pick([0.001, 0.01, 0.1, 10, 100, 1000])], v => { const E = E0 - 0.0592 / n * Math.log10(v[0]), e100 = E * 100; return Math.abs(e100 - Math.round(e100)) > 0.1 && Math.round(e100) % 10 !== 0; });
    const E = E0 - 0.0592 / n * Math.log10(Q);
    return num(`A ${nm} cell has E° = ${E0.toFixed(2)} V and n = ${n}. At 298 K the reaction quotient is Q = ${Q}. Use E = E° − (0.0592/n)·log₁₀Q. What is E, in volts to 2 decimal places?`, r2(E),
      ["When Q is not 1, the cell voltage differs from E°. Small Q means products are scarce, so the cell is stronger.", "Take log₁₀Q (it may be negative), multiply by 0.0592/n and subtract from E°.", "Example: E° = 1.00 V, n = 2, Q = 1000: E = 1.00 − 0.0296 × 3 = 0.91 V. Now do yours."], "🔌");
  };
  c.push(les("The Nernst equation", [
    ["Nonstandard conditions", "🔌", "E° applies when all concentrations are 1 M. In general <b>E = E° − (0.0592/n)·log₁₀Q</b> at 298 K (or E = E° − (RT/nF) ln Q)."],
    ["What Q tells you", "🧭", "Q &lt; 1 (more reactants): E &gt; E°. Q = 1: E = E°. Q &gt; 1: E &lt; E°. As a battery is used, Q rises toward K and <b>E falls to 0 at equilibrium</b> (a dead battery)."],
    ["Worked example", "📝", "Zn|Cu cell, E° = 1.10 V, n = 2, [Zn²⁺] = 0.010 M, [Cu²⁺] = 1.0 M: Q = 0.010, log Q = −2, E = 1.10 + 0.0296 × 2 = <b>1.16 V</b>."]
  ], ["Compute log Q first and note its sign.", "Subtract (0.0592/n)·log Q from E°. A negative log Q increases E.", "Example: E° = 0.50, n = 1, Q = 10 gives E = 0.50 − 0.0592 = 0.44 V. Do yours."],
    [nernstQ, nernstQ, nernstQ, nernstQ, nernstQ, nernstQ,
      ["At equilibrium, a galvanic cell has E equal to...", "0 V", "E°", "1 V", "The same as at the start"],
      ["If Q &lt; 1 for a galvanic cell, E compared with E° is...", "greater than E°", "less than E°", "equal to E°", "negative"],
      ["If Q = 1, then E equals...", "E°", "0", "−E°", "1"]]));

  // 14 E°, K, ΔG
  const egQ = () => {
    if (ri(0, 1) === 0) { const [n, E, x] = pick([[1, 0.296, 5], [1, 0.592, 10], [2, 0.148, 5], [2, 0.296, 10], [2, 0.592, 20], [4, 0.074, 5], [4, 0.148, 10]]);
      return num(`A cell reaction has n = ${n} and E° = ${E} V. Using log₁₀K = nE°/0.0592, K = 10^x. What is x?`, x,
        ["At equilibrium E = 0, which links E° to K.", "log₁₀K = n·E° ÷ 0.0592.", "Example: n = 2 and E° = 0.0888 V gives log K = 0.1776/0.0592 = 3. Now do yours."], "🔌"); }
    const [E0, n] = until(() => [pick([0.34, 0.46, 0.5, 0.76, 0.78, 0.8, 1.1]), pick([1, 2, 3])], v => Math.abs((v[1] * 96.485 * v[0]) % 1 - 0.5) > 0.1);
    return num(`A galvanic cell has E° = ${E0} V and n = ${n}. Calculate the magnitude of ΔG° in kJ/mol using ΔG° = −nFE° (F = 96485 C/mol), to the nearest whole number.`, Math.round(n * 96.485 * E0),
      ["Work in joules or in kilojoules consistently.", "|ΔG°| = n × 96485 × E° joules; divide by 1000 for kilojoules.", "Example: n = 2 and E° = 0.30 V gives 2 × 96485 × 0.30 = 57891 J ≈ 58 kJ/mol. Now do yours."], "🔌");
  };
  c.push(les("E°cell, ΔG° and K", [
    ["Three views", "🔌", "<b>ΔG° = −nFE°</b> (F = 96485 C/mol). A galvanic (spontaneous) cell has E° &gt; 0 and ΔG° &lt; 0."],
    ["Link to K", "🔗", "<b>ΔG° = −RT ln K</b> gives <b>E° = (0.0592/n) log₁₀K</b> at 298 K, so <b>log₁₀K = nE°/0.0592</b>. A positive E° means K &gt; 1."],
    ["Worked example", "📝", "Zn + Cu²⁺: E° = 1.10 V, n = 2. ΔG° = −2 × 96485 × 1.10 = −212 kJ/mol. log K = 2 × 1.10/0.0592 ≈ 37, so K ≈ 10³⁷."]
  ], ["Which equation links voltage to energy, and which links voltage to K?", "Use ΔG° = −nFE° for energy and log K = nE°/0.0592 for K.", "Example: n = 1, E° = 0.0592 V gives log K = 1, so K = 10. Do yours."],
    [egQ, egQ, egQ, egQ, egQ,
      ["A cell with positive E° has...", "negative ΔG° and K &gt; 1", "positive ΔG° and K &gt; 1", "negative ΔG° and K &lt; 1", "ΔG° = 0"],
      ["If E° = 0 for a cell reaction, then K equals...", "1", "0", "10", "Infinity"],
      ["Which sign pair is correct for a spontaneous galvanic cell reaction?", "E° &gt; 0, ΔG° &lt; 0", "E° &lt; 0, ΔG° &lt; 0", "E° &gt; 0, ΔG° &gt; 0", "E° = ΔG°"]]));

  // 15 galvanic cell notation
  c.push(les("Galvanic cells and cell notation", [
    ["Parts of the cell", "🔋", "<b>Anode</b>: oxidation (loses electrons); <b>cathode</b>: reduction (gains electrons). Electrons flow from anode to cathode through the wire. A <b>salt bridge</b> keeps charge balanced as ions move."],
    ["Line notation", "✏️", "<b>Anode | anode solution || cathode solution | cathode</b>. For Zn and Cu: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s). Each | is a phase boundary, || is the salt bridge. An inert Pt electrode is used if no solid metal takes part."],
    ["Which is which?", "🧭", "The half-cell with the <b>higher E°(reduction)</b> is the cathode. E°(cell) = E°(cathode) − E°(anode). Anions move toward the anode, cations toward the cathode. The standard hydrogen electrode (SHE) is defined as 0.00 V."]
  ], ["Remember: oxidation happens at the anode, reduction at the cathode.", "The cathode is the half-cell with the more positive reduction potential. Electrons run anode to cathode.", "Example: in Fe|Fe²⁺||Ag⁺|Ag, silver is reduced, so Ag is the cathode. Use the same reasoning for yours."],
    [["In the cell Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s), which electrode is the anode?", "Zn", "Cu", "The salt bridge", "Both"],
      ["In a galvanic cell, electrons flow...", "from anode to cathode through the wire", "from cathode to anode through the wire", "through the salt bridge", "from the solution to the salt bridge"],
      ["The salt bridge is used to...", "keep the solutions electrically neutral by letting ions move", "carry the electrons", "increase the voltage", "dissolve the electrodes"],
      ["Which half-reaction occurs at the cathode?", "Reduction", "Oxidation", "Neutralization", "Precipitation only"],
      ["The standard hydrogen electrode has E° equal to...", "0.00 V", "1.00 V", "−1.00 V", "0.76 V"],
      ["E°(Zn²⁺/Zn) = −0.76 V and E°(Cu²⁺/Cu) = +0.34 V. Which is the cathode in a standard Zn–Cu cell?", "Cu", "Zn", "Neither", "Both"],
      ["Which electrode gains mass in a Zn–Cu cell as it runs?", "Cu", "Zn", "Both gain mass", "Neither"],
      ["Which inert electrode is used for the Fe³⁺/Fe²⁺ half-cell?", "Platinum", "Iron", "Sodium", "Glass"],
      ["In a galvanic cell, anions in the salt bridge move toward the...", "anode", "cathode", "wire", "outside of the cell"],
      ["In cell line notation, what does the double vertical line mean?", "A salt bridge", "A phase boundary", "An electron flow arrow", "An inert electrode"]]));

  // 16 organic naming
  const ALK = [["C₄H₁₀", 2], ["C₅H₁₂", 3], ["C₆H₁₄", 5], ["C₇H₁₆", 9]];
  const orgQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const [f, k] = pick(ALK);
      return num(`How many constitutional isomers does ${f} have (acyclic alkanes)?`, k,
        ["Isomers have the same formula but different connections of carbon atoms.", "Try drawing a straight chain, then move one carbon into a branch at different positions. Don't count rotations of the same structure.", "Example: C₃H₈ has only 1 arrangement, and C₄H₁₀ has the straight chain plus one branched one. Now do yours."], "🧱"); }
    if (t === 1) { const n = ri(7, 14);
      return num(`How many hydrogen atoms are in an acyclic alkane with ${n} carbon atoms?`, 2 * n + 2,
        ["Alkanes are saturated: every carbon has four single bonds.", "The general formula is CₙH₂ₙ₊₂.", "Example: with 5 carbons there are 2 × 5 + 2 = 12 hydrogens. Now do yours."], "🧱"); }
    const n = ri(3, 8);
    return num(`How many hydrogen atoms are in a monocyclic cycloalkane with ${n} carbon atoms?`, 2 * n,
      ["The ring removes two hydrogens compared with the open-chain alkane.", "Cycloalkanes follow CₙH₂ₙ.", "Example: cyclobutane has 4 carbons and 8 hydrogens. Now do yours."], "🧱");
  };
  c.push(les("Naming alkanes and cycloalkanes", [
    ["IUPAC steps", "🧱", "1) Find the <b>longest continuous chain</b> (parent). 2) Number from the end that gives the <b>lowest numbers</b> to substituents. 3) Name the branches (methyl, ethyl) with their position, alphabetical, with di-, tri- for repeats."],
    ["Examples", "📝", "CH₃CH(CH₃)CH₂CH₃ is <b>2-methylbutane</b>. C(CH₃)₄ is <b>2,2-dimethylpropane</b>. A six-membered ring with one CH₃ is <b>methylcyclohexane</b>."],
    ["Counting", "🔢", "Alkanes CₙH₂ₙ₊₂; cycloalkanes CₙH₂ₙ. Isomer counts: C₄H₁₀ has 2, C₅H₁₂ has 3, C₆H₁₄ has 5, C₇H₁₆ has 9."]
  ], ["Find the longest chain first and remember it can bend on the page.", "Number from the end nearest the first branch. List branches alphabetically.", "Example: CH₃CH₂CH(CH₃)CH₃ has a 4-carbon chain with a methyl on carbon 2: 2-methylbutane. Do yours."],
    [orgQ, orgQ, orgQ, orgQ,
      ["What is the IUPAC name of CH₃CH(CH₃)CH₂CH₂CH₃?", "2-methylpentane", "3-methylpentane", "2-ethylbutane", "isohexane"],
      ["What is the IUPAC name of CH₃CH₂CH(CH₃)CH₂CH₂CH₃?", "3-methylhexane", "4-methylhexane", "2-ethylpentane", "3-ethylpentane"],
      ["What is the IUPAC name of CH₃CH(CH₃)CH(CH₃)CH₃?", "2,3-dimethylbutane", "2,2-dimethylbutane", "3-methylpentane", "1,2-dimethylbutane"],
      ["What is the IUPAC name of CH₃CH₂CH(CH₂CH₃)CH₂CH₃?", "3-ethylpentane", "2-ethylpentane", "3-methylhexane", "heptane"],
      ["What is the IUPAC name of CH₃CH(CH₃)CH₂CH(CH₃)CH₃?", "2,4-dimethylpentane", "2,3-dimethylpentane", "2,2-dimethylpentane", "3,3-dimethylbutane"],
      ["What is the IUPAC name of (CH₃)₃C–CH₃?", "2,2-dimethylpropane", "2-methylbutane", "pentane", "tetramethylmethane is the IUPAC name"]]));

  // 17 stereochemistry
  const CHI = [["lactic acid, CH₃CH(OH)COOH", 1], ["2-butanol", 1], ["alanine, CH₃CH(NH₂)COOH", 1], ["glycine, H₂NCH₂COOH", 0], ["ethanol", 0], ["2-propanol", 0], ["CHFClBr", 1], ["2-chlorobutane", 1], ["2,3-dichlorobutane", 2], ["3-methylhexane", 1], ["open-chain glucose", 4], ["2-methylbutane", 0], ["2-bromopentane", 1], ["tartaric acid, HOOC–CH(OH)–CH(OH)–COOH", 2]];
  const stQ = () => {
    if (ri(0, 1) === 0) { const [m, k] = pick(CHI);
      return num(`How many chiral centers (stereocenters) does ${m} have?`, k,
        ["A chiral carbon has four different groups attached.", "Check each sp³ carbon in turn: if any two of its four groups are the same, it is not chiral.", "Example: in 2-pentanol, carbon 2 has H, OH, CH₃ and C₃H₇, so it is chiral (1 center). Now do yours."], "🪞"); }
    const n = ri(1, 4);
    return num(`A molecule has ${n} chiral center${n > 1 ? "s" : ""} and no internal symmetry (no meso forms). What is the maximum number of stereoisomers?`, Math.pow(2, n),
      ["Each chiral center can be R or S.", "Maximum stereoisomers = 2ⁿ for n independent chiral centers.", "Example: with 5 chiral centers there can be 2⁵ = 32. Now do yours."], "🪞");
  };
  c.push(les("Chirality and stereoisomers", [
    ["Mirror images", "🪞", "A <b>chiral</b> carbon has four different groups. A molecule with one is not superimposable on its mirror image: these two forms are <b>enantiomers</b> (R and S). They have the same boiling point but rotate plane-polarized light in opposite directions."],
    ["More centers", "🔢", "n independent stereocenters give up to <b>2ⁿ stereoisomers</b>. Stereoisomers that are not mirror images are <b>diastereomers</b>. A <b>meso</b> compound has centers but an internal mirror plane, so it is achiral."],
    ["Alkene isomers", "↔️", "A C=C double bond with two different groups on each carbon gives <b>E/Z (cis/trans)</b> isomers: but-2-ene has them, but-1-ene does not. A 50:50 mix of enantiomers is a <b>racemic mixture</b>."]
  ], ["Look for a carbon with four DIFFERENT groups.", "If two of the four groups are identical, the carbon is not a stereocenter. For counting isomers use 2ⁿ.", "Example: the central carbon in propane has two H atoms, so it is not chiral. Do yours."],
    [stQ, stQ, stQ, stQ, stQ, stQ,
      ["Which alkene can show E/Z isomerism?", "But-2-ene", "But-1-ene", "2-methylpropene", "Ethene"],
      ["How do enantiomers differ?", "They rotate plane-polarized light in opposite directions", "They have different boiling points", "They have different formulas", "They have different connectivity"],
      ["A racemic mixture is...", "a 50:50 mixture of two enantiomers", "a single enantiomer", "a meso compound", "a mixture of E and Z isomers"]]));

  // 18 SN1 SN2 E
  c.push(les("Substitution and elimination reactions", [
    ["SN2", "➡️", "<b>SN2</b>: one step, nucleophile attacks from the back as the leaving group leaves. Rate = k[RX][Nu⁻]. Best with methyl and primary halides and strong nucleophiles; gives <b>inversion</b> of configuration."],
    ["SN1", "🪜", "<b>SN1</b>: two steps. The leaving group leaves first, forming a carbocation (slow step), then the nucleophile attacks. Rate = k[RX]. Best with tertiary halides in polar protic solvents; gives a <b>racemic</b> mixture."],
    ["Elimination", "✂️", "<b>E2</b>: strong base removes H as the halide leaves, forming an alkene (rate = k[RX][base]). It favors strong, bulky bases and heat. The more substituted alkene is the main product (<b>Zaitsev's rule</b>). Leaving ability: I⁻ &gt; Br⁻ &gt; Cl⁻ &gt;&gt; F⁻."]
  ], ["Look at the carbon bearing the halogen: methyl, primary, secondary or tertiary?", "Tertiary favors SN1 or E; methyl and primary favor SN2. Strong bulky bases favor elimination.", "Example: a primary halide with a strong small nucleophile in a polar aprotic solvent goes by SN2. Decide yours the same way."],
    [["What is the rate law for an SN2 reaction of RX with Nu⁻?", "rate = k[RX][Nu⁻]", "rate = k[RX]", "rate = k[Nu⁻]", "rate = k[RX]²"],
      ["What is the rate law for an SN1 reaction?", "rate = k[RX]", "rate = k[RX][Nu⁻]", "rate = k[Nu⁻]", "rate = k"],
      ["Which alkyl halide reacts fastest by SN2?", "CH₃Br", "(CH₃)₃CBr", "(CH₃)₂CHBr", "They are equal"],
      ["Which alkyl halide reacts fastest by SN1?", "(CH₃)₃CBr", "CH₃Br", "CH₃CH₂Br", "They are equal"],
      ["SN2 on a chiral center gives...", "inversion of configuration", "retention of configuration", "a racemic mixture", "no product"],
      ["SN1 on a chiral tertiary center usually gives...", "a racemic mixture", "complete inversion", "complete retention", "no change"],
      ["Which is the best leaving group?", "I⁻", "F⁻", "Cl⁻", "OH⁻"],
      ["Which intermediate forms in SN1 reactions?", "A carbocation", "A carbanion", "A free radical", "A carbene"],
      ["Which conditions favor E2 over SN2 on a secondary halide?", "A strong bulky base and heat", "A weak nucleophile in water", "Cold conditions with a weak base", "No base at all"],
      ["Zaitsev's rule says the major elimination product is...", "the more substituted alkene", "the less substituted alkene", "always an alcohol", "always an alkyne"]]));

  c.push(mix("Mixed practice", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  c.push(mix("Level 27 Challenge", at(c, [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17])));

  Object.assign(CHEM_LEVELS, { 25: a, 26: b, 27: c });
})();
