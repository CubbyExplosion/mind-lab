// ext/chem-28-30.js  Mind Lab Chemistry levels 28-30 (college year 1 second half, college year 2): organic chemistry I-II,
// analytical chemistry, spectroscopy (IR, NMR, MS, UV), inorganic and coordination chemistry, physical chemistry intro, biochemistry basics
(() => {
  const SUBM = "₀₁₂₃₄₅₆₇₈₉", SUPM = "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻";
  const U = s => typeof s !== "string" ? s : s.replace(/[₀-₉]+/g, m => `<sub>${[...m].map(ch => SUBM.indexOf(ch)).join("")}</sub>`).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, m => `<sup>${[...m].map(ch => "0123456789+-"[SUPM.indexOf(ch)]).join("")}</sup>`);
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
  const r3 = x => Math.round(x * 1000) / 1000;
  const until = (gen, ok) => { let v; for (let i = 0; i < 500; i++) { v = gen(); if (ok(v)) return v; } return v; };
  const wr = (right, cands, n = 3) => uniq(cands.filter(c => c !== right)).slice(0, n);
  const sub = n => String(n).split("").map(c => SUBM[+c]).join("");
  const supS = n => String(n).split("").map(c => c === "-" ? "⁻" : SUPM[+c]).join("");
  const sci = x => { const [m, e] = x.toExponential(1).split("e"); return `${m}×10${supS(+e)}`; };

  // ================= LEVEL 28 =================
  const a = [];

  // 1 degrees of unsaturation
  const dbeQ = () => {
    const [C, H, N, X, O, d] = until(() => {
      const C = ri(3, 10), d = ri(0, 5), N = ri(0, 2) === 0 ? ri(1, 2) : 0, X = ri(0, 3) === 0 ? 1 : 0, O = ri(0, 2);
      return [C, 2 * C + 2 + N - X - 2 * d, N, X, O, d];
    }, v => v[1] >= 2 && v[1] >= v[0] - 3);
    const f = "C" + sub(C) + "H" + sub(H) + (X ? "Cl" : "") + (N ? "N" + (N > 1 ? sub(N) : "") : "") + (O ? "O" + (O > 1 ? sub(O) : "") : "");
    const ex = d === 1 ? "C₆H₁₀ gives (12 + 2 − 10) ÷ 2 = 2" : "C₅H₁₂ gives (10 + 2 − 12) ÷ 2 = 0";
    return num(`What is the degree of unsaturation (rings + pi bonds) of ${f}?`, d,
      ["Use DBE = (2C + 2 + N − H − X) ÷ 2. Oxygen is ignored. Count N and halogens (X) carefully.", "Write the numbers into the formula one at a time: 2C + 2 first, then add N, then subtract H and X, then halve.", "Example: " + ex + ". Now do yours."], "🔢");
  };
  a.push(les("Degrees of unsaturation", [
    ["Counting rings and pi bonds", "🔢", "The <b>degree of unsaturation</b> (DBE) counts rings plus pi bonds in a molecule. <b>DBE = (2C + 2 + N − H − X) ÷ 2</b>, where X is the number of halogens. O and S are ignored."],
    ["What each feature adds", "🧩", "Each ring = 1. Each C=C or C=O = 1. Each triple bond = 2. A benzene ring = 4 (three C=C and one ring). DBE 0 means a saturated, acyclic molecule."],
    ["Worked example", "✏️", "C₄H₈: (8 + 2 − 8) ÷ 2 = <b>1</b>. So it has one C=C or one ring (but-1-ene, cyclobutane, ...). C₇H₈: (14 + 2 − 8) ÷ 2 = <b>4</b>, which fits toluene (a benzene ring)."]
  ], ["Use the DBE formula. Nitrogen adds to the numerator; halogens count like hydrogen.", "A saturated alkane CₙH₂ₙ₊₂ has DBE 0. Each missing pair of H adds 1.", "Example: C₅H₈ gives (10 + 2 − 8) ÷ 2 = 2, so two double bonds, or a ring and a double bond. Now apply the formula to yours."],
    [dbeQ, dbeQ, dbeQ, dbeQ, dbeQ,
      ["A molecule has DBE = 4 and contains a benzene ring. How many other pi bonds or rings can it have?", "None", "One more", "Two more", "Four more"],
      ["Which has the highest degree of unsaturation?", "Benzene, C₆H₆", "Cyclohexane, C₆H₁₂", "Hexane, C₆H₁₄", "Cyclohexene, C₆H₁₀"],
      ["A compound C₃H₆O has DBE 1. Which structure is NOT possible?", "A molecule with a C≡C triple bond and a C=O", "Propanal", "Acetone", "Propen-2-ol"]]));

  // 2 alkene naming and E/Z
  a.push(les("E/Z alkenes and CIP priority", [
    ["Priority on each carbon", "🎯", "On each carbon of a C=C, rank the two groups by <b>CIP priority</b>: the atom with the higher atomic number wins (Br > Cl > O > N > C > H). If tied, compare the next atoms outward."],
    ["Z or E?", "↔️", "If the two higher-priority groups are on the <b>same side</b> of the double bond, it is <b>Z</b> (German <i>zusammen</i>). If on <b>opposite</b> sides, it is <b>E</b> (<i>entgegen</i>)."],
    ["Needs two different groups", "✅", "A C=C only shows E/Z isomerism if <b>each</b> carbon has two different groups. In 2-butene each carbon has CH₃ and H, so E and Z both exist. Propene has two H on one carbon, so it has none."]
  ], ["Find the atoms directly attached to the stereo-centre or alkene carbon first and compare atomic numbers.", "If the first atoms tie, list the atoms attached to each (highest first) and compare them one by one.", "Example: –CH₂Cl beats –CH₂CH₃ because at the second step Cl (17) beats C (6). Apply the same logic to yours."],
    [["Which group has the highest CIP priority?", "–Br", "–Cl", "–OH", "–CH₃"],
      ["Which group has higher CIP priority?", "–CH₂OH", "–CH₃", "–CH₂CH₃", "–H"],
      ["Which group has higher CIP priority?", "–COOH", "–CH₂OH", "–CH₂CH₃", "–CH₃"],
      ["Which group has higher CIP priority?", "–CH(CH₃)₂", "–CH₂CH₃", "–CH₃", "–H"],
      ["Which group has the highest CIP priority?", "–OH", "–NH₂", "–CH₃", "–H"],
      ["In (Z)-but-2-ene the two methyl groups are...", "on the same side of the C=C", "on opposite sides", "both attached to the same carbon", "joined in a ring"],
      ["trans-But-2-ene (methyls on opposite sides) is named...", "(E)-but-2-ene", "(Z)-but-2-ene", "(R)-but-2-ene", "(S)-but-2-ene"],
      ["In CH₃CH=CHBr the CH₃ and Br are on the same side. The name is...", "(Z)-1-bromoprop-1-ene", "(E)-1-bromoprop-1-ene", "2-bromopropene", "(S)-1-bromopropene"],
      ["Which alkene has NO E/Z isomers?", "2-methylbut-2-ene", "pent-2-ene", "but-2-ene", "1,2-dichloroethene"],
      ["How many stereoisomers does pent-2-ene have about the double bond?", "2", "1", "3", "4"]]));

  // 3 Markovnikov
  a.push(les("Addition to alkenes: Markovnikov", [
    ["Markovnikov's rule", "➕", "In HX addition to an alkene, H goes to the carbon that already has <b>more H atoms</b>, and X goes to the more substituted carbon. Reason: the more stable (more substituted) carbocation forms."],
    ["Reagents and outcomes", "⚗️", "HBr, HCl: Markovnikov alkyl halide. H₂O/H⁺: Markovnikov alcohol. <b>BH₃ then H₂O₂/OH⁻</b>: anti-Markovnikov alcohol (OH on the less substituted C). HBr with <b>peroxides</b> (radical): anti-Markovnikov. H₂/Pd: alkane."],
    ["Halogen addition", "🧪", "Br₂ or Cl₂ add across C=C through a cyclic bromonium ion, so the two Br add on <b>opposite faces</b> (anti addition). Cyclohexene + Br₂ gives <i>trans</i>-1,2-dibromocyclohexane."]
  ], ["Decide which carbon of the double bond holds more hydrogens, and which carbocation would be more stable.", "The nucleophile ends up on the carbon that gave the more stable carbocation (unless the reagent is hydroboration or radical HBr).", "Example: HCl + 2-methylbut-2-ene puts Cl on the tertiary carbon. Use the same logic for yours."],
    [["HBr adds to propene (no peroxides). The major product is...", "2-bromopropane", "1-bromopropane", "1,2-dibromopropane", "propane"],
      ["HCl adds to 2-methylpropene. The major product is...", "2-chloro-2-methylpropane", "1-chloro-2-methylpropane", "2-chlorobutane", "1,2-dichloro-2-methylpropane"],
      ["Acid-catalysed hydration (H₂O, H₂SO₄) of propene gives mainly...", "propan-2-ol", "propan-1-ol", "propanal", "propane"],
      ["Hydroboration–oxidation of propene (BH₃, then H₂O₂/NaOH) gives mainly...", "propan-1-ol", "propan-2-ol", "propanone", "propanoic acid"],
      ["HBr with peroxides adds to propene to give mainly...", "1-bromopropane", "2-bromopropane", "propane", "2,2-dibromopropane"],
      ["Br₂ adds to cyclohexene. The product is...", "trans-1,2-dibromocyclohexane", "cis-1,2-dibromocyclohexane", "bromocyclohexane", "1,1-dibromocyclohexane"],
      ["H₂ with a Pd catalyst converts but-2-ene into...", "butane", "but-1-ene", "2-butanol", "2-bromobutane"],
      ["The first intermediate when HBr adds to propene is a...", "secondary carbocation", "primary carbocation", "carbanion", "free radical"]]));

  // 4 carbocations
  a.push(les("Carbocation stability and shifts", [
    ["Why stability matters", "⚖️", "Alkyl groups donate electron density (inductive effect and <b>hyperconjugation</b>) to the empty p orbital. So stability order: <b>3° > 2° > 1° > methyl</b>."],
    ["Resonance helps most", "🔁", "Allyl and benzyl cations are stabilised by <b>resonance</b>, so a benzyl or allyl cation is about as stable as a 2° or 3° cation, or better."],
    ["Rearrangements", "🔀", "A less stable cation can shift to a more stable one: a <b>1,2-hydride shift</b> (H moves with its two electrons) or <b>1,2-methyl shift</b>. This is why some reactions give unexpected products."]
  ], ["Count how many carbon groups are attached to the positively charged carbon, and check for resonance.", "More alkyl groups or a neighbouring pi system means more stability.", "Example: the tert-butyl cation (3°) is more stable than the isopropyl cation (2°). Use the same reasoning on yours."],
    [["Which carbocation is the most stable?", "(CH₃)₃C⁺", "CH₃CH₂⁺", "CH₃⁺", "(CH₃)₂CH⁺"],
      ["Which carbocation is the least stable?", "CH₃⁺", "(CH₃)₂CH⁺", "CH₃CH₂⁺", "(CH₃)₃C⁺"],
      ["Which cation is stabilised by resonance?", "The benzyl cation, C₆H₅CH₂⁺", "The ethyl cation", "The methyl cation", "The isopropyl cation"],
      ["A 1,2-hydride shift in a cation usually happens when it forms...", "a more stable carbocation", "a less stable carbocation", "a carbanion", "a free radical"],
      ["The 3-methylbutan-2-yl cation (2°) can rearrange by a 1,2-hydride shift to form a...", "tertiary carbocation", "primary carbocation", "methyl cation", "vinyl cation"],
      ["Hyperconjugation stabilises a carbocation by...", "donating C–H bond electrons into the empty p orbital", "adding extra protons", "removing the positive charge entirely", "making the ion larger than the atom"],
      ["Which is more stable?", "The allyl cation, CH₂=CH–CH₂⁺", "The n-propyl cation, CH₃CH₂CH₂⁺", "The methyl cation", "The ethyl cation"],
      ["Carbocation geometry around the charged carbon is...", "trigonal planar (sp²)", "tetrahedral (sp³)", "linear (sp)", "octahedral"]]));

  // 5 SN1 / SN2
  const snQ = () => {
    const f1 = pick([2, 3, 4]), f2 = pick([2, 3, 5]);
    if (ri(0, 1) === 0) return num(`An SN2 reaction has rate = k[RX][Nu⁻]. If [RX] is multiplied by ${f1} and [Nu⁻] by ${f2}, the rate is multiplied by...`, f1 * f2,
      ["SN2 is second order overall: both concentrations are in the rate law.", "Multiply the two factors together.", "Example: [RX] ×2 and [Nu⁻] ×6 would give ×12. Now do yours."], "⚗️");
    return num(`An SN1 reaction has rate = k[RX]. If [RX] is multiplied by ${f1} and [Nu⁻] by ${f2}, the rate is multiplied by...`, f1,
      ["For SN1 the slow step is only the loss of the leaving group.", "The nucleophile is not in the rate law, so only one factor matters.", "Example: [RX] ×7 and [Nu⁻] ×3 would give ×7. Now do yours."], "⚗️");
  };
  a.push(les("SN1 versus SN2", [
    ["SN2: one step", "🥊", "SN2: the nucleophile attacks from the back as the leaving group departs. <b>Rate = k[RX][Nu]</b>, <b>inversion</b> of configuration. Fastest for methyl > 1° > 2°; never 3° (too crowded). Likes strong nucleophiles and <b>polar aprotic</b> solvents (DMSO, acetone)."],
    ["SN1: two steps", "🪜", "SN1: the leaving group leaves first, giving a carbocation (slow step), then the nucleophile attacks. <b>Rate = k[RX]</b>. Fastest for 3° (and allylic or benzylic). A planar cation gives a mostly <b>racemic</b> product. Likes polar <b>protic</b> solvents (water, alcohols)."],
    ["Leaving groups", "👋", "Good leaving groups are weak bases: I⁻ > Br⁻ > Cl⁻ >> F⁻, and tosylate (OTs). OH⁻ is a poor leaving group; protonating it first (to H₂O) makes it good."]
  ], ["Is the substrate crowded (3°) or open (methyl, 1°)? What does the rate law contain?", "Number of steps and what the slow step involves decides the rate law and the stereochemistry.", "Example: a 3° halide in warm ethanol follows SN1; a 1° halide with a strong nucleophile follows SN2. Decide for yours."],
    [snQ, snQ, snQ,
      ["Which substrate reacts fastest by SN2?", "CH₃Br", "(CH₃)₃CBr", "(CH₃)₂CHBr", "(CH₃)₃CCH₂Br"],
      ["The stereochemical result of an SN2 reaction at a chiral carbon is...", "inversion of configuration", "retention only", "a racemic mixture", "loss of the stereocentre"],
      ["SN1 on an optically active 3° halide gives...", "a mostly racemic product", "complete inversion", "complete retention", "no reaction"],
      ["Which solvent speeds up SN2 with an anionic nucleophile?", "DMSO (polar aprotic)", "Water", "Methanol", "Ethanoic acid"],
      ["Which is the best leaving group?", "I⁻", "F⁻", "OH⁻", "NH₂⁻"],
      ["The rate-determining step of SN1 is...", "formation of the carbocation", "attack by the nucleophile", "loss of a proton", "solvent evaporation"]]));

  // 6 elimination
  a.push(les("Elimination: E2, E1 and Zaitsev", [
    ["E2 in one step", "💥", "A strong base removes a β-H while the leaving group leaves. <b>Rate = k[RX][base]</b>. The H and leaving group must be <b>anti-periplanar</b> (opposite sides, 180°)."],
    ["Zaitsev's rule", "🏆", "With a small base (ethoxide), the major alkene is the <b>more substituted</b>, more stable one. 2-bromobutane gives mostly but-2-ene. A <b>bulky base</b> (potassium tert-butoxide) removes the easier, less hindered H and gives the less substituted (Hofmann) alkene."],
    ["Competition", "⚔️", "Heat favours elimination over substitution (it makes more molecules, so ΔS is positive). 3° halides with a strong base give E2. E1 competes with SN1 and goes through the same carbocation."]
  ], ["Which hydrogens are next to the carbon carrying the leaving group, and what kind of base is used?", "Small base: most substituted alkene. Bulky base: least substituted alkene.", "Example: 2-bromo-2-methylbutane with ethoxide gives mostly 2-methylbut-2-ene (Zaitsev). Use the same rule on yours."],
    [["2-Bromobutane reacts with sodium ethoxide. The major alkene is...", "but-2-ene", "but-1-ene", "butane", "2-butanol"],
      ["2-Bromobutane reacts with potassium tert-butoxide (a bulky base). The major alkene is...", "but-1-ene", "but-2-ene", "butane", "ethene"],
      ["The E2 rate law is...", "rate = k[RX][base]", "rate = k[RX]", "rate = k[base]", "rate = k[RX]²"],
      ["E2 requires the β-H and the leaving group to be...", "anti-periplanar", "syn-periplanar only", "on the same carbon", "gauche"],
      ["tert-Butyl bromide plus a strong base like ethoxide gives mainly...", "2-methylpropene (E2)", "tert-butyl ethyl ether (SN2)", "2-methylpropane", "butane"],
      ["Raising the temperature favours elimination because...", "elimination gives more molecules (higher entropy)", "it lowers the activation energy of SN2", "heat removes the leaving group", "substitution is endothermic"],
      ["Zaitsev's rule says the major alkene is...", "the most substituted one", "the least substituted one", "always the terminal alkene", "the cis isomer only"],
      ["Which competes directly with E1?", "SN1", "SN2", "Radical addition", "Diels–Alder"]]));

  // 7 conformations
  a.push(les("Conformations and cyclohexane", [
    ["Newman projections", "👁️", "Looking along a C–C bond, <b>staggered</b> conformations are lower in energy than <b>eclipsed</b> ones (about 12 kJ/mol for ethane). In butane the most stable is <b>anti</b> (methyls 180° apart); <b>gauche</b> is about 3.8 kJ/mol higher; fully eclipsed is the highest."],
    ["The chair", "🪑", "Cyclohexane's <b>chair</b> has no angle strain (≈109.5°) and no eclipsing. Each carbon has one <b>axial</b> bond (up or down, parallel to the ring axis) and one <b>equatorial</b> bond (roughly around the rim). 6 axial and 6 equatorial positions in total."],
    ["Ring flip and bulky groups", "🔄", "A ring flip swaps axial and equatorial. Large groups prefer <b>equatorial</b> to avoid 1,3-diaxial interactions. An axial methyl has two gauche-type interactions with axial H atoms (about 7.1 kJ/mol)."]
  ], ["Picture the molecule: which arrangement keeps big groups furthest apart?", "Staggered beats eclipsed. Equatorial beats axial for big groups.", "Example: tert-butylcyclohexane sits almost completely with the tert-butyl equatorial. Apply the same idea to yours."],
    [["The most stable conformation of butane about the C2–C3 bond is...", "anti", "gauche", "fully eclipsed", "partly eclipsed"],
      ["The highest-energy conformation of butane about C2–C3 is...", "fully eclipsed (methyls eclipsed)", "anti", "gauche", "staggered"],
      ["The most stable conformation of cyclohexane is the...", "chair", "boat", "twist-boat", "half-chair"],
      ["A large substituent on a cyclohexane chair prefers to be...", "equatorial", "axial", "in a boat", "eclipsed"],
      ["How many axial hydrogens does a chair of cyclohexane have?", "6", "3", "12", "2"],
      ["A ring flip turns axial substituents into...", "equatorial substituents", "axial substituents", "double bonds", "eclipsed substituents"],
      ["Axial methylcyclohexane is less stable because of...", "1,3-diaxial interactions", "angle strain in the ring", "its double bond", "its charge"],
      ["Which has no angle strain?", "Cyclohexane (chair)", "Cyclopropane", "Cyclobutane (planar)", "Cyclopentane (planar)"]]));

  // 8 R/S
  a.push(les("R and S configuration", [
    ["Assign priorities", "🔢", "Rank the four groups on a stereocentre 1 to 4 using CIP rules (higher atomic number first; if tied, go outward). Turn the molecule so group <b>4 (lowest) points away</b> from you."],
    ["Read the circle", "🔄", "Trace 1 → 2 → 3. <b>Clockwise = R</b> (rectus, right). <b>Counterclockwise = S</b> (sinister, left). If the lowest-priority group points <i>toward</i> you, read the circle and then <b>reverse</b> the answer."],
    ["Relationships", "🪞", "Swapping any two groups on a stereocentre flips R to S. An enantiomer has <b>every</b> centre inverted: (R,R) becomes (S,S). (R,R) and (R,S) are <b>diastereomers</b>."]
  ], ["Have you put the lowest-priority group at the back before reading the direction?", "Clockwise from 1 to 3 is one letter, counterclockwise the other. Pointing toward you reverses it.", "Example: viewed with H at the back, Cl → OH → CH₃ going clockwise is R. Now use the rules on yours."],
    [["With the lowest priority group pointing away, the path 1 → 2 → 3 is clockwise. The configuration is...", "R", "S", "E", "Z"],
      ["With the lowest priority group pointing away, the path 1 → 2 → 3 is counterclockwise. The configuration is...", "S", "R", "E", "Z"],
      ["The lowest priority group points TOWARD you and 1 → 2 → 3 looks clockwise. The configuration is...", "S", "R", "E", "Z"],
      ["Swapping two groups on an (R) stereocentre gives...", "(S)", "(R)", "a meso compound", "a racemic mixture"],
      ["The enantiomer of (2R,3R)-tartaric acid is...", "(2S,3S)", "(2R,3S)", "(2R,3R)", "(2S,3R) only"],
      ["(2R,3R) and (2R,3S) forms of a compound are...", "diastereomers", "enantiomers", "identical", "constitutional isomers"],
      ["Which has the lowest CIP priority on a stereocentre in 2-butanol?", "–H", "–OH", "–CH₂CH₃", "–CH₃"],
      ["An (R) and an (S) enantiomer rotate plane-polarised light by...", "equal amounts in opposite directions", "the same amount in the same direction", "different amounts", "no rotation at all"]]));

  // 9 counting stereoisomers
  const stQ = () => {
    const n = ri(1, 5);
    return num(`A molecule has ${n} stereocentre${n > 1 ? "s" : ""} and no internal symmetry (no meso forms). What is the maximum number of stereoisomers?`, 2 ** n,
      ["Each stereocentre can be R or S.", "Two choices per centre, multiplied together: 2 to the power n.", "Example: 6 centres would give 2 × 2 × 2 × 2 × 2 × 2 isomers. Now do yours."], "🔢");
  };
  a.push(les("Counting stereoisomers and meso forms", [
    ["2ⁿ rule", "🔢", "A molecule with n stereocentres has at most <b>2ⁿ</b> stereoisomers (each centre R or S). They come in enantiomer pairs, so 2ⁿ⁻¹ pairs."],
    ["Meso compounds", "🪞", "If a molecule has an internal mirror plane, some isomers are <b>meso</b>: they have stereocentres but are achiral and identical to their mirror image. Then there are fewer than 2ⁿ isomers."],
    ["Examples", "📏", "2,3-Dibromobutane: 2 centres, but only <b>3</b> stereoisomers ((R,R), (S,S) and meso (R,S)). 2,3-Dibromopentane (no symmetry): <b>4</b>. Tartaric acid also has 3 forms."]
  ], ["Count stereocentres first (carbons with four different groups), then check for a mirror plane.", "No symmetry: 2ⁿ. A symmetric molecule with matching ends loses some isomers to meso.", "Example: 2,3-dichlorobutane has 2 centres and symmetric ends, so 3 isomers rather than 4. Apply this to yours."],
    [stQ, stQ, stQ,
      num("2,3-Dibromobutane has two stereocentres and a mirror-symmetric skeleton. How many stereoisomers does it have in total?", 3,
        ["Two stereocentres suggests four, but check for a meso form.", "(R,R) and (S,S) are enantiomers; (R,S) and (S,R) are the same compound.", "Example: tartaric acid has the same pattern and also has three forms. Count yours that way."], "🪞"),
      num("2,3-Dibromopentane has two stereocentres and no mirror symmetry. How many stereoisomers does it have?", 4,
        ["Ask: are the two ends of the molecule identical?", "No, one end is CH₃ and the other CH₂CH₃, so no meso form exists. Use 2ⁿ.", "Example: 2,3-dichloropentane works the same way. Count yours."], "🔢"),
      num("How many stereocentres does 2,3,4-trichlorohexane have?", 3,
        ["A stereocentre is a carbon with four different groups.", "C2, C3 and C4 each carry Cl and H and two different carbon chains.", "Example: in 2-chlorobutane only C2 qualifies. Count yours."], "🔍"),
      mcq("Which statement about a meso compound is true?", "It has stereocentres but is achiral", ["It has no stereocentres", "It is a racemic mixture", "It rotates plane-polarised light strongly", "It is always an alkene"],
        ["Think of an internal mirror plane.", "The two halves cancel each other's optical rotation.", "Example: meso-tartaric acid has two stereocentres but is optically inactive. Use that for yours."], "🪞")]));

  // 10 alcohol oxidation
  a.push(les("Oxidation of alcohols", [
    ["Count the hydrogens", "🧮", "Oxidation removes H from the carbon bearing OH. A <b>1° alcohol</b> has two (→ aldehyde → acid), a <b>2° alcohol</b> has one (→ ketone), a <b>3° alcohol</b> has none (no reaction)."],
    ["Strength of the oxidant", "💪", "<b>PCC</b> or Swern/DMP (mild, anhydrous): 1° alcohol stops at the <b>aldehyde</b>. <b>Chromic acid</b> (CrO₃/H₂SO₄ or K₂Cr₂O₇/H⁺) or KMnO₄: 1° alcohol goes all the way to the <b>carboxylic acid</b>. 2° alcohols give ketones with any of them."],
    ["Colour change", "🎨", "Cr(VI) is orange; it is reduced to green Cr(III). That orange→green change is the classic test: 1° and 2° alcohols turn it green, 3° alcohols do not."]
  ], ["How many hydrogens are on the carbon that holds the OH?", "Mild reagent means stop at the aldehyde; strong aqueous oxidant means go to the acid.", "Example: butan-2-ol (2°) with PCC gives butan-2-one. Now decide for yours."],
    [["A primary alcohol reacts with PCC in CH₂Cl₂. The product is...", "an aldehyde", "a carboxylic acid", "a ketone", "no reaction"],
      ["A primary alcohol is heated with excess acidified K₂Cr₂O₇. The product is...", "a carboxylic acid", "an aldehyde only", "a ketone", "an alkene"],
      ["A secondary alcohol reacts with chromic acid. The product is...", "a ketone", "an aldehyde", "a carboxylic acid", "an ether"],
      ["A tertiary alcohol is treated with K₂Cr₂O₇/H⁺. What happens?", "No oxidation occurs", "A ketone forms", "An aldehyde forms", "A carboxylic acid forms"],
      ["Propan-2-ol is oxidised. The product is...", "propanone", "propanal", "propanoic acid", "propene"],
      ["Ethanol with excess acidified dichromate finally gives...", "ethanoic acid", "ethanal only", "ethene", "ethane"],
      ["In the dichromate test a positive result shows the colour change...", "orange to green", "green to orange", "colourless to pink", "yellow to blue"],
      ["Which alcohol does NOT react with acidified dichromate?", "2-methylpropan-2-ol", "butan-1-ol", "butan-2-ol", "ethanol"]]));

  // 11 Grignard
  a.push(les("Grignard reagents and new C–C bonds", [
    ["Making and using one", "🧱", "An alkyl halide + Mg in <b>dry ether</b> gives R–MgBr. The carbon is strongly nucleophilic and basic: it attacks the C=O carbon, forming a new C–C bond. A final acid workup (H₃O⁺) gives the alcohol."],
    ["Which alcohol?", "🍳", "RMgX + <b>formaldehyde</b> → 1° alcohol. + other <b>aldehyde</b> → 2° alcohol. + <b>ketone</b> → 3° alcohol. + <b>ester</b> (2 equivalents) → 3° alcohol with two identical R groups. + <b>CO₂</b> → carboxylic acid (one more carbon)."],
    ["Keep it dry!", "🚫💧", "A Grignard reagent is also a strong base. Water, alcohols, or acids destroy it, giving the alkane (R–H). So glassware and ether must be completely dry."]
  ], ["What kind of carbonyl compound is reacting? The type decides the type of alcohol.", "Add the R group from the Grignard to the carbonyl carbon; the oxygen becomes OH after workup.", "Example: CH₃MgBr + butanone gives 2-methylbutan-2-ol, a tertiary alcohol. Apply the same steps to yours."],
    [["CH₃MgBr reacts with propanone, then H₃O⁺. The product is...", "2-methylpropan-2-ol", "propan-2-ol", "butan-2-ol", "2-methylpropan-1-ol"],
      ["CH₃CH₂MgBr reacts with ethanal, then H₃O⁺. The product is...", "butan-2-ol", "butan-1-ol", "2-methylpropan-2-ol", "propan-2-ol"],
      ["A Grignard reagent reacts with formaldehyde (HCHO), then H₃O⁺. The product type is...", "a primary alcohol", "a secondary alcohol", "a tertiary alcohol", "a ketone"],
      ["PhMgBr reacts with CO₂, then H₃O⁺. The product is...", "benzoic acid", "benzyl alcohol", "benzaldehyde", "toluene"],
      ["Why must a Grignard reaction use dry ether?", "Water protonates the Grignard reagent and destroys it", "Water makes the ether explode", "Ether is needed to make water", "The Mg dissolves in water"],
      ["CH₃MgBr + water gives...", "methane", "methanol", "ethane", "formaldehyde"],
      ["Excess CH₃MgBr reacts with ethyl ethanoate (an ester), then H₃O⁺. The product is...", "2-methylpropan-2-ol", "ethanol only", "propan-2-ol", "butan-2-one"],
      ["Grignard reagents are made from an alkyl halide and...", "magnesium metal", "sodium hydroxide", "copper", "hydrochloric acid"]]));

  // 12 pKa
  const pkQ = () => {
    const x = ri(2, 5), p1 = ri(2, 6), p2 = p1 + x;
    return num(`Acid A has pKa ${p1} and acid B has pKa ${p2}. How many times larger is Ka of A than Ka of B?`, 10 ** x,
      ["pKa = −log Ka, so each pKa unit is a factor of ten in Ka.", "Find the difference in pKa and use that as a power of ten.", "Example: pKa 2 versus pKa 4 differ by 2 units, so Ka differs by 10 × 10 = 100. Now do yours."], "🧮");
  };
  a.push(les("Acidity and pKa in organic chemistry", [
    ["pKa scale", "📏", "<b>pKa = −log Ka</b>. A lower pKa means a stronger acid. Each unit is a factor of 10 in Ka. Typical values: carboxylic acid ≈ 5, phenol ≈ 10, water ≈ 15.7, alcohol ≈ 16, ketone α-H ≈ 20, alkyne ≈ 25, alkane ≈ 50."],
    ["Stable conjugate base = stronger acid", "🛡️", "Stronger acids have more stable conjugate bases. Stabilising factors: <b>resonance</b> (carboxylate, phenoxide), <b>electronegative atoms or electron-withdrawing groups</b> (CF₃COOH is far stronger than CH₃COOH), and more s-character."],
    ["Which way does it go?", "➡️", "An acid-base equilibrium favours the side with the <b>weaker acid and weaker base</b> (higher pKa on the acid side). Ethoxide (conjugate base of an alcohol, pKa 16) fully deprotonates acetic acid (pKa 4.8)."]
  ], ["Compare pKa values: lower means stronger acid. Think about how well the negative charge is spread out.", "Resonance and electron-withdrawing groups stabilise the conjugate base.", "Example: phenol (pKa 10) beats ethanol (pKa 16) because the phenoxide ion is delocalised. Use that kind of reasoning for yours."],
    [pkQ, pkQ, pkQ,
      ["Which is the strongest acid?", "Trifluoroacetic acid (pKa 0.2)", "Acetic acid (pKa 4.8)", "Chloroacetic acid (pKa 2.9)", "Propanoic acid (pKa 4.9)"],
      ["Why is phenol more acidic than ethanol?", "The phenoxide ion is stabilised by resonance", "Phenol has more carbon atoms", "Ethanol has no O–H bond", "Phenol is smaller"],
      ["The stronger the acid, the _____ its conjugate base.", "weaker", "stronger", "more reactive", "heavier"],
      ["Which hydrogen is the most acidic?", "The O–H of a carboxylic acid", "The O–H of an alcohol", "A C–H in an alkane", "An N–H of an amine"],
      ["Electron-withdrawing groups near an acid site make it...", "more acidic", "less acidic", "unchanged", "basic"],
      ["CH₃COOH (pKa 4.8) reacts with ethoxide, CH₃CH₂O⁻ (conjugate acid pKa 16). The equilibrium lies...", "far to the right", "far to the left", "exactly in the middle", "nowhere, no reaction occurs"]]));

  // 13 aromaticity
  const hkQ = () => {
    const n = ri(0, 4);
    return num(`By Hückel's rule an aromatic ring has 4n + 2 pi electrons. How many pi electrons is that when n = ${n}?`, 4 * n + 2,
      ["Substitute the value of n into 4n + 2.", "Multiply n by 4 first, then add 2.", "Example: n = 5 gives 4 × 5 + 2 = 22. Now do yours."], "💍");
  };
  a.push(les("Aromaticity and Hückel's rule", [
    ["Four conditions", "💍", "A ring is <b>aromatic</b> if it is cyclic, planar, fully conjugated (every ring atom has a p orbital), and has <b>4n + 2</b> pi electrons (2, 6, 10, 14...)."],
    ["Anti-aromatic and non-aromatic", "⛔", "A cyclic, planar, conjugated ring with <b>4n</b> pi electrons (4, 8...) is <b>anti-aromatic</b> and very unstable (cyclobutadiene). A ring that is not planar or not fully conjugated is non-aromatic (cyclooctatetraene is tub-shaped)."],
    ["Counting electrons", "🔢", "Each C=C gives 2. A lone pair in a p orbital in the ring counts 2 (furan's O, pyrrole's N). Pyridine's N lone pair is in the plane, not in the pi system, so pyridine has 6 pi electrons from three C=C-like bonds."]
  ], ["Check cyclic, planar, conjugated first. Then count pi electrons and compare with 4n + 2.", "6 and 10 pass; 4 and 8 fail (anti-aromatic) when the ring is planar.", "Example: cyclopentadienyl anion has 6 pi electrons, so it is aromatic. Count yours the same way."],
    [hkQ, hkQ, hkQ,
      ["Which is aromatic?", "Benzene", "Cyclobutadiene", "Cyclohexane", "Cyclooctatetraene"],
      ["Cyclobutadiene (4 pi electrons, planar) is...", "anti-aromatic", "aromatic", "non-conjugated", "saturated"],
      ["The cyclopentadienyl anion is aromatic because it has...", "6 pi electrons", "4 pi electrons", "5 pi electrons", "8 pi electrons"],
      ["The tropylium cation (C₇H₇⁺) has how many pi electrons?", "6", "4", "7", "8"],
      num("Naphthalene is aromatic. How many pi electrons does it have?", 10,
        ["Count the C=C bonds drawn in the two fused rings.", "Five C=C bonds, each contributing two electrons.", "Example: benzene has 3 C=C bonds, giving 6 electrons. Count yours the same way."], "💍"),
      num("Furan is aromatic. How many pi electrons does it have (counting the oxygen lone pair that joins the ring)?", 6,
        ["Count two C=C bonds first, then the lone pair.", "Two C=C give 4, and one oxygen lone pair adds more.", "Example: pyrrole counts the same way with N. Now do furan."], "💍")]));

  // 14 EAS
  a.push(les("Electrophilic aromatic substitution", [
    ["The mechanism", "⚙️", "An electrophile (E⁺) attacks the benzene ring, forming a resonance-stabilised arenium ion, then a proton is lost to restore aromaticity. Examples: nitration (HNO₃/H₂SO₄ gives NO₂⁺), bromination (Br₂/FeBr₃), Friedel–Crafts (RCl/AlCl₃)."],
    ["Directing effects", "🧭", "<b>Activating, ortho/para</b>: –OH, –NH₂, –OR, –alkyl. <b>Deactivating, meta</b>: –NO₂, –CN, –C=O, –CF₃. <b>Halogens</b> are deactivating but ortho/para directing."],
    ["Limits", "⚠️", "Friedel–Crafts fails on strongly deactivated rings (like nitrobenzene) and on rings with –NH₂. Activated rings (phenol, aniline) react faster than benzene; nitrobenzene reacts far slower."]
  ], ["Is the group already on the ring electron-donating or electron-withdrawing?", "Donors push electrophiles to ortho and para; strong withdrawers push to meta.", "Example: nitration of anisole (–OCH₃) gives mainly ortho and para products. Decide the same way for yours."],
    [["Nitration of toluene gives mainly...", "ortho- and para-nitrotoluene", "meta-nitrotoluene", "nitrobenzene", "no reaction"],
      ["Nitration of nitrobenzene gives mainly...", "m-dinitrobenzene", "o-dinitrobenzene", "p-dinitrobenzene", "benzene"],
      ["Which group is a meta director?", "–NO₂", "–OH", "–CH₃", "–NH₂"],
      ["Which group is activating and ortho/para directing?", "–OCH₃", "–CN", "–COCH₃", "–CF₃"],
      ["The electrophile in nitration is...", "NO₂⁺", "NO₃⁻", "H₂O", "NH₃"],
      ["Bromination of benzene uses Br₂ with the catalyst...", "FeBr₃", "NaOH", "H₂O", "Pd/C"],
      ["Which ring reacts fastest in EAS?", "Phenol", "Benzene", "Nitrobenzene", "Benzaldehyde"],
      ["Friedel–Crafts alkylation uses an alkyl halide and...", "AlCl₃", "NaOH", "KMnO₄", "H₂ and Pd"],
      ["Halogen substituents on benzene are...", "deactivating but ortho/para directing", "activating and meta directing", "activating and ortho/para directing", "deactivating and meta directing"]]));

  // 15 statistics
  const stdQ = () => {
    const t = ri(0, 3);
    if (t === 3) {
      const [s1, s2, ans] = pick([[0.03, 0.04, 0.05], [0.06, 0.08, 0.1], [0.05, 0.12, 0.13], [0.3, 0.4, 0.5], [0.6, 0.8, 1]]);
      return num(`Two readings are added: (12.40 ± ${s1}) g and (8.20 ± ${s2}) g. The uncertainty of the sum is √(s₁² + s₂²). What is it in g?`, ans,
        ["Uncertainties from independent measurements add in quadrature (square, add, square root).", "Compute s₁² + s₂², then take the square root. Look for a neat result.", "Example: ± 0.09 and ± 0.12 combine to √(0.0081 + 0.0144) = 0.15. Now do yours."], "📏");
    }
    if (t === 2) {
      const [m, s, p] = pick([[50, 1, 2], [20, 1, 5], [40, 2, 5], [25, 1, 4], [80, 4, 5], [10, 1, 10], [50, 2, 4], [20, 2, 10]]);
      return num(`Three replicate analyses give ${m - s}, ${m}, ${m + s} mg/L. The mean is ${m} and the standard deviation is ${s}. What is the relative standard deviation (%RSD)?`, p,
        ["%RSD = (standard deviation ÷ mean) × 100.", "Divide s by the mean first, then multiply by 100.", "Example: s = 3 and mean = 60 gives 3 ÷ 60 × 100 = 5. Now do yours."], "📊");
    }
    const m = ri(20, 90), five = ri(0, 1) === 1, d = ri(1, 4);
    const devs = five ? [-d, -d, 0, d, d] : [-d, 0, d];
    const data = shuf(devs.map(x => m + x));
    if (t === 0) return num(`Replicate results: ${data.join(", ")}. What is the mean?`, m,
      ["The mean is the sum divided by the number of results.", "Add all values, then divide by how many there are.", "Example: 10, 12, 14 add to 36, and 36 ÷ 3 = 12. Now do yours."], "📊");
    return num(`Replicate results: ${data.join(", ")} (mean ${m}). What is the sample standard deviation s = √(Σ(x − mean)² ÷ (n − 1))?`, d,
      ["Find each deviation from the mean, square it, add them up, divide by n − 1, then take the square root.", `Here the sum of squared deviations is ${devs.reduce((q, x) => q + x * x, 0)} and n − 1 is ${devs.length - 1}.`, "Example: 4, 6, 8 has deviations −2, 0, 2: sum of squares 8, ÷ 2 = 4, square root 2. Now do yours."], "📊");
  };
  a.push(les("Mean, standard deviation and uncertainty", [
    ["Precision and accuracy", "🎯", "<b>Accuracy</b> = closeness to the true value. <b>Precision</b> = closeness of repeated results to each other. The mean estimates the value; the <b>standard deviation s = √(Σ(x − x̄)² ÷ (n − 1))</b> measures the spread."],
    ["Relative spread", "📊", "<b>%RSD = (s ÷ mean) × 100</b> lets you compare spreads for different sized results. Small %RSD means good precision."],
    ["Combining uncertainties", "➕", "For independent errors, adding or subtracting: <b>s = √(s₁² + s₂²)</b>. Square, add, square root. This is smaller than simply adding the two uncertainties."]
  ], ["Do the steps in order: mean, deviations, squares, sum, divide, root.", "Remember to divide by n − 1 for a sample standard deviation, not n.", "Example: values 9, 10, 11 have mean 10 and s = 1. Use the same steps on yours."],
    [stdQ, stdQ, stdQ, stdQ, stdQ,
      ["A balance gives 5.01 g, 5.02 g, 5.01 g for a mass that is truly 6.00 g. The balance is...", "precise but not accurate", "accurate but not precise", "both accurate and precise", "neither precise nor accurate"],
      ["Which change lowers the standard deviation of replicate results?", "A more consistent technique", "Using a larger flask without care", "Reporting more digits", "Leaving out the blank"]]));

  // 16 calibration
  const calQ = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const m = pick([0.05, 0.1, 0.2]), b = pick([0, 0.01, 0.02, 0.05]), c = ri(2, 12), A = r3(m * c + b);
      const m2 = m === 0.1 ? 0.2 : 0.1, c2 = c === 3 ? 4 : 3;
      return num(`A calibration line is A = ${m}·c + ${b} (c in mg/L). An unknown gives A = ${A}. What is its concentration in mg/L?`, c,
        ["Rearrange the line: c = (A − intercept) ÷ slope.", "Subtract the intercept first, then divide by the slope.", `Example: A = ${m2}·c + 0.02 with A = ${r3(m2 * c2 + 0.02)} gives c = ${c2}. Now do yours.`], "📈");
    }
    if (t === 1) {
      const Cx = ri(2, 10), Cs = pick([2, 4, 5]), k = pick([0.05, 0.1, 0.2]);
      return num(`In standard addition, the sample gives a signal ${r3(k * Cx)}. After adding a spike that raises the concentration by ${Cs} mg/L, the signal is ${r3(k * (Cx + Cs))}. What was the original concentration in mg/L? (Cx = Cs × S₁ ÷ (S₂ − S₁))`, Cx,
        ["The signal increase comes only from the spike.", "Find S₂ − S₁ first. It tells you the signal per added mg/L.", "Example: signals 0.30 then 0.45 after adding 5 mg/L give Cx = 5 × 0.30 ÷ 0.15 = 10. Now do yours."], "💉");
    }
    if (t === 2) {
      const f = pick([2, 4, 5, 10, 20]), r = ri(2, 9);
      return num(`A sample was diluted by a factor of ${f}. The diluted solution measured ${r} mg/L. What was the original concentration in mg/L?`, r * f,
        ["Dilution lowered the concentration, so the original is higher.", "Multiply the measured value by the dilution factor.", "Example: a 4-fold dilution reading 3 mg/L means the original was 12 mg/L. Now do yours."], "🧪");
    }
    const s = pick([0.002, 0.003, 0.005, 0.01]), m = pick([0.05, 0.1, 0.2]);
    return num(`The blank signal has a standard deviation of ${s} and the calibration slope is ${m} per mg/L. Using LOD = 3s ÷ slope, what is the detection limit in mg/L?`, r3(3 * s / m),
      ["The limit of detection is the concentration that gives a signal three standard deviations above the blank.", "Multiply s by 3, then divide by the slope.", "Example: s = 0.004 and slope 0.2 gives 3 × 0.004 ÷ 0.2 = 0.06. Now do yours."], "🔭");
  };
  a.push(les("Calibration curves and standard addition", [
    ["Calibration curve", "📈", "Measure standards of known concentration, plot signal against concentration, and fit a line <b>y = mx + b</b>. For an unknown, <b>c = (y − b) ÷ m</b>. Use it only within the range of the standards."],
    ["Standard addition", "💉", "When the sample matrix changes the signal, add known amounts of analyte to the sample itself. If a spike of concentration Cs raises the signal from S₁ to S₂, then <b>Cx = Cs × S₁ ÷ (S₂ − S₁)</b>."],
    ["Dilution and detection limit", "🔭", "A diluted sample's original concentration = measured × dilution factor. The <b>limit of detection</b> is about <b>3 × s(blank) ÷ slope</b>."]
  ], ["Which formula matches the situation: line, spike, dilution, or detection limit?", "Rearrange for the unknown before substituting.", "Example: slope 0.1 and intercept 0.02 with signal 0.52 gives (0.52 − 0.02) ÷ 0.1 = 5. Use the same method for yours."],
    [calQ, calQ, calQ, calQ, calQ,
      ["A calibration curve should only be used...", "within the range of the standards", "far above the highest standard", "only for blank samples", "with no standards at all"],
      ["A blank is used in analysis to...", "correct for signal that does not come from the analyte", "increase the signal", "dilute the sample", "raise the slope"]]));

  // 17 gravimetric
  const grQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const n = pick([0.005, 0.01, 0.02, 0.04]);
      return num(`Chloride in a sample was precipitated as AgCl, which weighed ${r3(143.5 * n)} g (M = 143.5 g/mol). How many moles of Cl⁻ were in the sample?`, n,
        ["Each mole of AgCl contains one mole of Cl⁻.", "Moles = mass ÷ molar mass.", "Example: 1.435 g AgCl ÷ 143.5 g/mol = 0.0100 mol. Use the same steps on yours."], "⚖️");
    }
    if (t === 1) {
      const n = pick([0.005, 0.01, 0.02, 0.03]);
      return num(`Sulfate was precipitated as BaSO₄ (M = 233 g/mol), giving ${r3(233 * n)} g. What mass of sulfate, SO₄²⁻ (M = 96 g/mol), was in the sample, in g?`, r3(96 * n),
        ["Find moles of BaSO₄, which equals moles of sulfate.", "Then multiply by 96 g/mol.", "Example: 0.0100 mol of BaSO₄ would hold 0.96 g of sulfate. Do the steps for yours."], "⚖️");
    }
    const n = pick([0.01, 0.02, 0.04]), pct = pick([10, 20, 25, 40, 50]);
    const m = r3(35.5 * n * 100 / pct);
    return num(`A ${m} g sample gives AgCl containing ${r3(35.5 * n)} g of chlorine. What is the percentage of Cl in the sample?`, pct,
      ["Percentage = (mass of analyte ÷ mass of sample) × 100.", "Divide the chlorine mass by the sample mass, then multiply by 100.", "Example: 0.50 g of Cl in a 2.00 g sample is 25 %. Now do yours."], "⚖️");
  };
  a.push(les("Gravimetric analysis", [
    ["Weigh the product", "⚖️", "In <b>gravimetric analysis</b> the analyte is turned into a pure, insoluble precipitate of known formula, which is filtered, dried to constant mass and weighed. Then use the formula and stoichiometry to find the analyte."],
    ["The calculation", "🧮", "mass of precipitate → moles (÷ molar mass) → moles of analyte (from the formula) → mass of analyte (× molar mass) → % of sample. Example: 1.435 g AgCl = 0.0100 mol Cl⁻ = 0.355 g Cl."],
    ["Getting good crystals", "💎", "Precipitate slowly from hot, dilute solution and let it <b>digest</b> so crystals grow large and pure. Wash to remove impurities. Dry to <b>constant mass</b> so no water remains."]
  ], ["Convert the weighed mass to moles using the molar mass of the precipitate.", "Use the formula of the precipitate to see how many moles of analyte each mole contains.", "Example: 0.466 g BaSO₄ ÷ 233 g/mol = 0.00200 mol sulfate. Apply it to yours."],
    [grQ, grQ, grQ, grQ,
      ["Why is a precipitate dried to constant mass?", "To be sure all water has been removed", "To make it dissolve", "To make it radioactive", "To change its formula"],
      ["Digesting a precipitate (warming it in its solution) helps because...", "small crystals dissolve and larger, purer crystals grow", "it destroys the analyte", "it turns the precipitate into a gas", "it adds mass"],
      ["A good gravimetric precipitate should be...", "very insoluble, pure, and of known composition", "slightly soluble and sticky", "variable in formula", "volatile at room temperature"]]));

  // 18 Ksp
  const kspQ = () => {
    const t = ri(0, 2), k = ri(3, 6), m = pick([1, 2, 3, 5]);
    if (t === 0) {
      const s = m * 10 ** -k, K = s * s, right = sci(s);
      return mcq(`A salt AB has Ksp = ${sci(K)}. What is its molar solubility (mol/L)?`, right, wr(right, [sci(K), sci(K / 2), sci(Math.cbrt(K)), sci(K * 2)]),
        ["For AB ⇌ A⁺ + B⁻ the two ion concentrations are both s.", "Ksp = s × s = s². Take the square root of Ksp.", `Example: Ksp = 4×10⁻⁸ gives s = 2×10⁻⁴ M. Now do yours.`], "🧂");
    }
    if (t === 1) {
      const s = pick([1, 2]) * 10 ** -k, K = 4 * s ** 3, right = sci(s);
      return mcq(`A salt AB₂ (like CaF₂) has Ksp = ${sci(K)}. What is its molar solubility (mol/L)?`, right, wr(right, [sci(Math.sqrt(K)), sci(Math.cbrt(K)), sci(Math.sqrt(K / 4)), sci(K / 4)]),
        ["AB₂ ⇌ A²⁺ + 2B⁻ gives [A²⁺] = s and [B⁻] = 2s.", "Ksp = s × (2s)² = 4s³. Divide by 4, then take the cube root.", "Example: Ksp = 4×10⁻¹² gives s³ = 1×10⁻¹², so s = 1×10⁻⁴ M. Now do yours."], "🧂");
    }
    const K = pick([1, 2, 4, 5]) * 10 ** -(k + 5), c = pick([0.1, 0.01]), right = sci(K / c);
    return mcq(`A salt AB has Ksp = ${sci(K)}. What is its molar solubility in a solution that already contains ${c} M of B⁻ ions?`, right, wr(right, [sci(Math.sqrt(K)), sci(K * c), sci(K), sci(K / c / 10)]),
      ["The common ion B⁻ is already present, so very little salt dissolves.", "Assume [B⁻] ≈ c, so s = Ksp ÷ c.", "Example: Ksp = 1×10⁻¹⁰ in 0.1 M B⁻ gives s = 1×10⁻⁹ M. Now do yours."], "🧂");
  };
  a.push(les("Solubility product and the common-ion effect", [
    ["Ksp", "🧂", "For a sparingly soluble salt, <b>Ksp</b> is the product of the ion concentrations at saturation. AB: Ksp = s². AB₂: Ksp = 4s³. A₂B₃: 108 s⁵."],
    ["Will it precipitate?", "❓", "Compare the reaction quotient Q with Ksp. <b>Q > Ksp</b>: precipitate forms. <b>Q < Ksp</b>: all dissolves. <b>Q = Ksp</b>: saturated."],
    ["Common ion effect", "🧊", "Adding an ion the salt already contains <b>lowers</b> its solubility (Le Chatelier). In 0.1 M Cl⁻, AgCl dissolves about 10⁴ times less than in pure water."]
  ], ["Write the Ksp expression for the formula first, and decide what s means.", "Count ion ratios: coefficients become powers and multipliers.", "Example: Ksp = 1×10⁻¹⁰ for AB gives s = 1×10⁻⁵ M. Do the matching steps for yours."],
    [kspQ, kspQ, kspQ, kspQ,
      ["[Ag⁺] = 1×10⁻³ M and [Cl⁻] = 1×10⁻³ M are mixed. Ksp(AgCl) = 1.8×10⁻¹⁰. What happens?", "A precipitate forms (Q > Ksp)", "Nothing, Q < Ksp", "The solution is exactly saturated", "AgCl dissolves more"],
      ["Adding NaCl to a saturated AgCl solution makes the solubility of AgCl...", "decrease", "increase", "stay the same", "become infinite"],
      ["If Q < Ksp for a salt in solution, then...", "no precipitate forms", "a precipitate forms", "the solution is supersaturated", "Ksp changes"]]));

  // 19, 20
  a.push(mix("Mixed practice", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  a.push(mix("Level 28 Challenge", at(a, [0, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17])));

  // ================= LEVEL 29 =================
  const b = [];

  // 1 nucleophilic addition to carbonyls
  b.push(les("Nucleophilic addition to carbonyls", [
    ["The carbonyl carbon", "🎯", "In C=O the oxygen is more electronegative, so the carbon is δ⁺ and electrophilic. Nucleophiles attack the carbon; the pi bond breaks and the O becomes O⁻ (then OH after protonation)."],
    ["Reactivity", "🏁", "<b>Aldehydes are more reactive than ketones</b>: less steric crowding and only one electron-donating alkyl group. Formaldehyde > other aldehydes > ketones. Aromatic carbonyls react more slowly (resonance)."],
    ["Common products", "📦", "HCN gives a <b>cyanohydrin</b>. An alcohol (acid catalyst) gives a <b>hemiacetal</b>, and with excess alcohol an <b>acetal</b> (or ketal). A primary amine gives an <b>imine</b> (C=N) after losing water."]
  ], ["Which atom does the nucleophile attack, and what happens to the C=O pi bond?", "Think steric crowding and electron donation when comparing aldehydes with ketones.", "Example: acetone + HCN gives acetone cyanohydrin (2-hydroxy-2-methylpropanenitrile). Use the same idea for yours."],
    [["In nucleophilic addition to C=O, the nucleophile attacks the...", "carbonyl carbon", "carbonyl oxygen", "alkyl hydrogen", "alpha carbon first"],
      ["Which is the most reactive toward nucleophilic addition?", "Methanal (formaldehyde)", "Propanone", "Benzophenone", "Butanone"],
      ["Why are aldehydes more reactive than ketones?", "Less steric hindrance and less electron donation to C=O", "They have more carbon atoms", "They contain an extra double bond", "They are always acidic"],
      ["An aldehyde reacts with HCN to give...", "a cyanohydrin", "an imine", "an acetal", "an amide"],
      ["An aldehyde reacts with a primary amine (R–NH₂) to give...", "an imine", "an amide", "a carboxylic acid", "an ether"],
      ["An aldehyde reacts with excess ethanol and acid to give...", "an acetal", "an ester", "a ketone", "an alkene"],
      ["The first product of alcohol addition to an aldehyde is a...", "hemiacetal", "acyl chloride", "peroxide", "carbocation"],
      ["After a nucleophile adds to C=O, the oxygen becomes...", "an alkoxide, O⁻", "a carbocation", "a free radical", "a double bond to N"]]));

  // 2 reductions
  b.push(les("Reducing carbonyls: NaBH₄ and LiAlH₄", [
    ["Two hydride sources", "💧", "<b>NaBH₄</b> is mild: reduces aldehydes and ketones to alcohols (works in ethanol or water). <b>LiAlH₄</b> is strong: also reduces esters, acids and amides, and must be used in dry ether and kept away from water."],
    ["What you get", "🔬", "Aldehyde → <b>1° alcohol</b>. Ketone → <b>2° alcohol</b>. Ester → <b>two alcohols</b> (from the acyl part and the alkoxy part). Carboxylic acid → <b>1° alcohol</b>. Amide or nitrile → <b>amine</b> (LiAlH₄)."],
    ["Pick the reagent", "🧠", "If the molecule has an ester you want to keep while reducing a ketone, use NaBH₄ (it leaves esters alone). To reduce the ester too, use LiAlH₄."]
  ], ["What functional group is being reduced, and is the reagent mild or strong?", "NaBH₄ cannot reduce esters or acids; LiAlH₄ can.", "Example: LiAlH₄ with methyl ethanoate gives ethanol and methanol. Work out yours the same way."],
    [["Ethanal is reduced by NaBH₄. The product is...", "ethanol", "ethanoic acid", "propan-2-ol", "ethane"],
      ["Propanone is reduced by NaBH₄. The product is...", "propan-2-ol", "propan-1-ol", "propanal", "propane"],
      ["Which reagent reduces an ester to alcohols?", "LiAlH₄", "NaBH₄", "H₂O", "PCC"],
      ["A carboxylic acid is reduced by LiAlH₄ to...", "a primary alcohol", "an aldehyde that stays", "a ketone", "an ester"],
      ["Which reagent leaves an ester untouched while reducing a ketone?", "NaBH₄", "LiAlH₄", "Both react with the ester", "Neither reacts with the ketone"],
      ["An amide reduced by LiAlH₄ gives...", "an amine", "an alcohol", "a carboxylic acid", "an aldehyde"],
      ["A nitrile (R–C≡N) reduced by LiAlH₄ gives...", "a primary amine", "an aldehyde", "an alkene", "an amide"],
      ["Why must LiAlH₄ reactions use dry ether?", "LiAlH₄ reacts violently with water", "Ether is needed as the oxidant", "Water makes the reagent weaker", "Dry ether is cheaper"]]));

  // 3 carboxylic acid derivative reactivity
  b.push(les("Carboxylic acid derivatives", [
    ["Reactivity order", "🪜", "Acyl chloride > acid anhydride > ester ≈ carboxylic acid > amide. The better the leaving group (Cl⁻ is great, NH₂⁻ is awful), the more reactive."],
    ["Nucleophilic acyl substitution", "🔁", "Nucleophile adds to C=O making a tetrahedral intermediate, then the leaving group leaves and C=O reforms. A more reactive derivative can be converted into a less reactive one, not the other way."],
    ["Amides are tough", "🛡️", "In an amide the N lone pair is delocalised into C=O (resonance), making the carbonyl less electrophilic and the C–N bond partly double. That is why proteins are stable but can be hydrolysed with heat and acid or base."]
  ], ["Rank the derivatives by how good the leaving group is.", "Move from a more reactive derivative toward a less reactive one.", "Example: acyl chloride + water gives the carboxylic acid quickly, but amide + water needs prolonged heating. Place yours in the order."],
    [["Which carboxylic acid derivative is the most reactive?", "Acyl chloride", "Ester", "Amide", "Carboxylic acid"],
      ["Which derivative is the least reactive?", "Amide", "Ester", "Acid anhydride", "Acyl chloride"],
      ["An acyl chloride reacts with an alcohol to give...", "an ester", "an amide", "an aldehyde", "a ketone"],
      ["An acyl chloride reacts with an amine to give...", "an amide", "an ester", "an alcohol", "an ether"],
      ["An acid anhydride reacts with water to give...", "two carboxylic acid molecules", "an ester", "an aldehyde and an alcohol", "an acyl chloride"],
      ["Why is an amide so unreactive?", "N lone-pair resonance reduces the C=O electrophilicity", "It has no carbonyl group", "It is ionic", "N is a great leaving group"],
      ["Which conversion is NOT easy?", "Ester → acyl chloride", "Acyl chloride → ester", "Anhydride → amide", "Acyl chloride → carboxylic acid"],
      ["The intermediate in nucleophilic acyl substitution is...", "tetrahedral", "planar carbocation", "a free radical", "a carbanion on oxygen"]]));

  // 4 esters
  const esQ = () => {
    const [K, pct] = pick([[1, 50], [9, 75], [16, 80], [49, 87.5]]);
    return num(`Ethanoic acid and ethanol, in equal amounts, reach an equilibrium with Kc = ${K} for acid + alcohol ⇌ ester + water. What percentage of the acid is converted to ester?`, pct,
      ["With equal starting moles, Kc = x² ÷ (1 − x)², where x is the fraction converted.", "Take the square root of both sides: √Kc = x ÷ (1 − x). Solve for x.", "Example: Kc = 4 gives x ÷ (1 − x) = 2, so x = 2/3 (about 67 %). Now do yours, then give a percentage."], "🧪");
  };
  b.push(les("Esters: Fischer esterification and hydrolysis", [
    ["Fischer esterification", "🍎", "Carboxylic acid + alcohol ⇌ ester + water, catalysed by strong acid (H₂SO₄). It is an equilibrium. To get more ester use <b>excess alcohol</b> or <b>remove the water</b> (Le Chatelier)."],
    ["Naming", "🏷️", "Name the alcohol part first, then the acid part with -oate: ethanoic acid + methanol → <b>methyl ethanoate</b>. Propanoic acid + ethanol → ethyl propanoate."],
    ["Saponification", "🧼", "Heating an ester with NaOH gives a carboxylate salt and an alcohol: R–COOR′ + OH⁻ → R–COO⁻ + R′OH. It is <b>irreversible</b> because the carboxylate cannot be attacked by the alcohol. This is how soap is made from fats."]
  ], ["Equilibrium or irreversible? Check the conditions (acid catalyst or hydroxide).", "Name the alcohol part of the ester first, and the acid part second.", "Example: methanoic acid + ethanol gives ethyl methanoate. Use the same naming pattern for yours."],
    [esQ, esQ,
      ["Ethanoic acid reacts with methanol and acid. The ester is...", "methyl ethanoate", "ethyl methanoate", "methyl propanoate", "ethyl ethanoate"],
      ["Propanoic acid reacts with ethanol and acid. The ester is...", "ethyl propanoate", "propyl ethanoate", "methyl propanoate", "ethyl butanoate"],
      ["To push Fischer esterification toward the ester you should...", "remove water or use excess alcohol", "add more water", "cool it to −100 °C", "remove the acid catalyst and stop"],
      ["Saponification of an ester with NaOH produces...", "a carboxylate salt and an alcohol", "a carboxylic acid and an alkene", "an amide and water", "an ether"],
      ["Why is saponification irreversible?", "The carboxylate ion is not attacked by the alcohol", "Ester is too stable", "Hydroxide is a weak base", "Water is removed as steam"],
      ["Many esters are used in food because they smell...", "fruity", "of rotten eggs", "of vinegar always", "of metal"]]));

  // 5 aldol
  const alQ = () => {
    const [name, C] = pick([["ethanal", 2], ["propanal", 3], ["butanal", 4], ["pentanal", 5]]);
    return num(`Two molecules of ${name} (${C} carbons each) undergo an aldol addition. How many carbon atoms are in the product?`, 2 * C,
      ["An aldol addition joins two molecules with a new C–C bond and loses no atoms.", "Add the carbons from both molecules.", "Example: two molecules of hexanal (6 carbons) would give a 12-carbon product. Now do yours."], "🔗");
  };
  b.push(les("Enolates and the aldol reaction", [
    ["Alpha hydrogens are acidic", "⚛️", "A C–H next to a C=O (alpha hydrogen) has pKa about 17–20 for aldehydes and ketones, because the conjugate base, an <b>enolate</b>, is resonance-stabilised (negative charge shared with oxygen)."],
    ["Aldol addition", "🔗", "The enolate of one molecule attacks the C=O of another, forming a new C–C bond. Two ethanal molecules give <b>3-hydroxybutanal</b> (a β-hydroxy aldehyde: aldol = aldehyde + alcohol)."],
    ["Condensation", "💧", "On heating, the aldol loses water to give an <b>α,β-unsaturated carbonyl</b> (but-2-enal here). A molecule with no α-H (benzaldehyde, methanal) cannot form an enolate, but can act as the partner (crossed aldol)."]
  ], ["Does each molecule have an alpha hydrogen? What is bonded to the carbonyl carbon?", "The enolate carbon (α) attacks the other molecule's C=O carbon.", "Example: acetone + benzaldehyde with base gives benzalacetone after dehydration. Work out yours the same way."],
    [alQ, alQ,
      ["Two ethanal molecules undergo an aldol addition. The product is...", "3-hydroxybutanal", "butanal", "ethyl ethanoate", "2-hydroxybutanal"],
      ["Which of these cannot form an enolate?", "Benzaldehyde", "Propanone", "Ethanal", "Butanone"],
      ["Dehydration of an aldol product gives...", "an α,β-unsaturated carbonyl compound", "a carboxylic acid", "an alkane", "an ether"],
      ["The enolate is stabilised by...", "resonance with the carbonyl oxygen", "a double positive charge", "hyperconjugation only", "hydrogen bonding to carbon"],
      ["A typical pKa for the α-H of a ketone is about...", "20", "5", "50", "1"],
      ["In an aldol reaction the nucleophile is the...", "enolate", "carbocation", "free radical", "alkyl halide"]]));

  // 6 amines
  b.push(les("Amines: structure and basicity", [
    ["Classes", "🧬", "Amines are classified by the number of carbons on nitrogen: 1° (RNH₂), 2° (R₂NH), 3° (R₃N). Nitrogen's lone pair makes amines <b>basic</b> and <b>nucleophilic</b>."],
    ["Basicity", "🧪", "Alkyl groups donate electron density, so alkylamines (pKa of ammonium ≈ 10–11) are stronger bases than ammonia (9.2). <b>Aromatic amines</b> like aniline (4.6) are weak bases because the lone pair is delocalised into the ring. <b>Amides</b> are not basic: the lone pair is tied up in resonance."],
    ["Salts", "🧂", "Amines react with acid to form ammonium salts (R–NH₃⁺ Cl⁻), which are water-soluble. Adding NaOH regenerates the free amine. Excess CH₃I turns an amine into a quaternary ammonium ion."]
  ], ["Is the nitrogen lone pair available, or is it tied up in resonance?", "Electron-donating alkyl groups boost basicity; delocalisation lowers it.", "Example: cyclohexylamine is far more basic than aniline. Compare yours the same way."],
    [["Which is the stronger base?", "Methylamine", "Ammonia", "Aniline", "Acetamide"],
      ["Why is aniline a weaker base than cyclohexylamine?", "Its lone pair is delocalised into the ring", "It has fewer hydrogens", "It is larger", "It has no nitrogen"],
      ["(CH₃)₂NH is classified as a...", "secondary amine", "primary amine", "tertiary amine", "quaternary ammonium ion"],
      ["(CH₃)₃N is classified as a...", "tertiary amine", "primary amine", "secondary amine", "amide"],
      ["An amine reacts with HCl to form...", "an ammonium salt", "an amide", "an alcohol", "a nitrile"],
      ["An amide is not basic because...", "the N lone pair is delocalised onto the carbonyl", "it has no nitrogen atom", "it is a metal", "the molecule is too small"],
      ["Which amine is the weakest base?", "Aniline", "Ethylamine", "Dimethylamine", "Trimethylamine"],
      ["Pyridine's nitrogen lone pair is basic because it lies...", "in the plane of the ring, outside the pi system", "inside the pi electron cloud", "on oxygen", "nowhere, it has none"]]));

  // 7 Diels-Alder
  b.push(les("The Diels–Alder reaction", [
    ["[4+2] cycloaddition", "🔶", "A conjugated <b>diene</b> (4 pi electrons) and a <b>dienophile</b> (2 pi electrons) form a six-membered ring in one step: two new sigma bonds form, one pi bond remains in the ring. 1,3-Butadiene + ethene → cyclohexene."],
    ["What makes it work", "⚙️", "The diene must be able to adopt the <b>s-cis</b> conformation. Dienophiles with electron-withdrawing groups (C=O, CN, NO₂) react faster. The reaction is concerted: 6 electrons in a cyclic transition state."],
    ["Stereochemistry", "🪞", "It is stereospecific: substituents that are <i>cis</i> on the dienophile stay <i>cis</i> in the ring. Cyclic dienes (cyclopentadiene) with maleic anhydride give the <b>endo</b> product."]
  ], ["Identify the diene and the dienophile, then draw the six-membered ring they would build.", "Count the pi electrons and the new sigma bonds: 4 + 2 gives a ring.", "Example: butadiene + propenal gives cyclohex-3-ene-1-carbaldehyde. Apply the same idea to yours."],
    [["1,3-Butadiene reacts with ethene in a Diels–Alder reaction. The product is...", "cyclohexene", "cyclohexane", "hexene", "benzene"],
      ["The diene must adopt which conformation to react?", "s-cis", "s-trans", "eclipsed in a ring", "twist-boat only"],
      ["Which dienophile is the most reactive toward butadiene?", "Maleic anhydride", "Ethane", "Propane", "Cyclohexane"],
      num("How many pi electrons (diene plus dienophile) take part in a Diels–Alder reaction?", 6,
        ["The diene has two double bonds in the reacting unit, the dienophile has one.", "Each pi bond has two electrons, and the arrow-pushing uses all three bonds.", "Example: a [3+2] reaction would use 3 pairs as well, just differently shared. Count yours."], "🔶"),
      num("How many new sigma bonds form in one Diels–Alder reaction?", 2,
        ["Count the new bonds between diene ends and dienophile carbons.", "The ring closes with bonds at both ends of the diene.", "Example: each cycloaddition forms the bonds that close a ring. Count yours."], "🔶"),
      num("How many carbons are in the ring formed in a Diels–Alder reaction?", 6,
        ["Four diene carbons plus two dienophile carbons.", "Add 4 and 2.", "Example: [4+2] means 4 atoms from one part and 2 from the other. Add yours."], "🔶"),
      ["In a Diels–Alder reaction, two substituents that are cis on the dienophile end up...", "cis in the product ring", "trans in the product ring", "lost as water", "on opposite faces always"],
      ["Diels–Alder reactions are described as...", "concerted", "stepwise through carbocations", "radical chain reactions", "acid-base reactions"]]));

  // 8 radical halogenation
  const rhQ = () => {
    const [nm, n] = pick([["ethane", 1], ["propane", 2], ["butane", 2], ["2-methylpropane", 2], ["pentane", 3], ["2,2-dimethylpropane", 1], ["cyclohexane", 1], ["methylcyclohexane", 5], ["2,3-dimethylbutane", 2], ["2,2-dimethylbutane", 3]]);
    return num(`How many different monochlorination products (constitutional isomers only) can ${nm} give?`, n,
      ["Count the groups of equivalent hydrogens: replacing H on equivalent carbons gives the same product.", "Use symmetry to decide which carbons are equivalent.", "Example: butane has two kinds of C–H (CH₃ and CH₂), so two products. Now find yours."], "☀️");
  };
  b.push(les("Radical halogenation of alkanes", [
    ["A chain reaction", "⛓️", "UV light or heat splits X₂ into radicals (<b>initiation</b>). Then X• removes H from the alkane, and the alkyl radical grabs X from another X₂ (<b>propagation</b>), making the chain go on. Two radicals meeting stops it (<b>termination</b>)."],
    ["Selectivity", "🎯", "Radical stability: 3° > 2° > 1° > methyl. <b>Bromine is far more selective</b> than chlorine: Br• picks the weakest C–H bond (tertiary), while Cl• reacts almost indiscriminately."],
    ["Counting products", "🧮", "Count sets of <b>equivalent hydrogens</b>. Ethane gives one chloroethane. Propane gives 1-chloropropane and 2-chloropropane. Substitution can continue to di- and trichloro products."]
  ], ["Which hydrogens are chemically equivalent by symmetry?", "One product per set of equivalent hydrogens (constitutional isomers only).", "Example: 2-methylpropane has 9 equivalent CH₃ hydrogens and 1 tertiary H: two products. Count yours."],
    [rhQ, rhQ, rhQ, rhQ,
      ["Which halogen is more selective in radical halogenation?", "Bromine", "Chlorine", "They are the same", "Fluorine"],
      ["UV light in radical halogenation causes...", "homolytic cleavage of X–X", "heterolytic cleavage of X–X", "formation of carbocations", "reduction of the alkane"],
      ["Radical stability order is...", "3° > 2° > 1°", "1° > 2° > 3°", "all the same", "2° > 3° > 1°"],
      ["Which step is termination?", "Two radicals combine", "X• takes an H from R–H", "R• reacts with X₂", "X₂ splits into radicals"]]));

  // 9 IR
  b.push(les("Infrared spectroscopy", [
    ["Bond vibrations", "📡", "IR light makes bonds stretch and bend. Different bonds absorb at different <b>wavenumbers</b> (cm⁻¹). Stronger, lighter bonds absorb at higher wavenumber. Only vibrations that change the dipole moment absorb."],
    ["Key peaks", "🔑", "O–H alcohol: broad ~3300. O–H acid: very broad 2500–3300. N–H: ~3300–3400. C–H: ~2900 (sp³), ~3100 (sp²), ~3300 sharp (sp). <b>C≡N or C≡C: 2100–2260</b>. <b>C=O: 1650–1750 (strong, about 1715 for ketones)</b>. C=C: ~1650."],
    ["Reading a spectrum", "🔍", "Look for a strong C=O first. Then check 3300 for O–H or N–H (broad or sharp), and below 3000 vs above 3000 for C–H types. A broad O–H plus C=O means a carboxylic acid."]
  ], ["Think about which bond gives the peak: O–H, C=O, C≡N...", "Triple bonds are at the highest wavenumbers after X–H; C=O is in the middle.", "Example: a strong peak at 1715 with nothing near 3300 suggests a ketone. Reason the same way for yours."],
    [["Which bond gives a strong absorption near 1715 cm⁻¹?", "C=O of a ketone", "C–H of an alkane", "O–H of an alcohol", "C≡N"],
      ["A broad absorption around 3300 cm⁻¹ is typical of...", "an alcohol O–H", "a C=O group", "a C≡N group", "a C–Cl bond"],
      ["A sharp peak near 2250 cm⁻¹ suggests...", "a nitrile, C≡N", "a ketone", "an ester", "an alkane"],
      ["A very broad band from 2500 to 3300 cm⁻¹ together with C=O suggests...", "a carboxylic acid", "an aldehyde", "an ether", "an alkane"],
      ["Which compound has NO strong peak near 1700 cm⁻¹?", "Ethanol", "Propanone", "Ethanal", "Ethanoic acid"],
      ["Ethers show no O–H or C=O. Which peak would you expect for diethyl ether?", "A C–O stretch near 1100 cm⁻¹", "A strong peak at 3300", "A strong peak at 1715", "A peak at 2250"],
      ["Primary amines (R–NH₂) show N–H stretches as...", "two bands near 3300–3400", "one very broad band at 2500–3300", "one strong peak at 1715", "nothing"],
      ["Which bond has the highest-wavenumber stretch?", "O–H bond (alcohol)", "C=O bond (carbonyl)", "C=C bond (alkene)", "C–C single bond"]]));

  // 10 NMR signals
  const nmrQ = () => {
    const [nm, n] = pick([["ethanol", 3], ["propane", 2], ["propanone (acetone)", 1], ["diethyl ether", 2], ["methyl ethanoate", 2], ["ethyl ethanoate", 3], ["2-methylpropan-2-ol", 2], ["benzene", 1], ["methylbenzene (toluene)", 4], ["1,4-dimethylbenzene", 2], ["butane", 2], ["propan-2-ol", 3], ["chloroethane", 2], ["cyclohexane", 1]]);
    return num(`How many signals does the ¹H NMR spectrum of ${nm} show (count each set of equivalent hydrogens, including O–H)?`, n,
      ["Hydrogens that are equivalent by symmetry give one signal.", "Group the hydrogens: CH₃ groups, CH₂ groups, ring positions, OH.", "Example: ethyl chloride has CH₃ and CH₂: 2 signals. Now count yours."], "🧲");
  };
  b.push(les("¹H NMR: how many signals?", [
    ["Magnets and spins", "🧲", "In a strong magnetic field ¹H nuclei absorb radio waves at slightly different frequencies depending on their surroundings. <b>Chemically different</b> hydrogens give different signals; equivalent hydrogens give one."],
    ["Equivalence", "🪞", "Hydrogens are equivalent if symmetry (or fast rotation) swaps them. All three H of a CH₃ are equivalent. In benzene all six are equivalent; in toluene there are 4 sets (CH₃, ortho, meta, para)."],
    ["Count carefully", "🔢", "Ethanol: CH₃, CH₂ and OH = 3 signals. Acetone: both CH₃ equivalent = 1 signal. Diethyl ether: the two ethyl groups are identical = 2 signals."]
  ], ["Draw the molecule and look for symmetry.", "Count each unique CH₃, CH₂, CH, ring position and OH.", "Example: propane has CH₃ (two equivalent) and CH₂ so 2 signals. Count yours."],
    [nmrQ, nmrQ, nmrQ, nmrQ, nmrQ, nmrQ,
      ["Which compound gives exactly ONE ¹H NMR signal?", "Cyclohexane", "Ethanol", "Propane", "Toluene"]]));

  // 11 splitting
  const spQ = () => {
    const n = ri(0, 6), nm = ["singlet", "doublet", "triplet", "quartet", "quintet", "sextet", "septet"][n];
    if (ri(0, 1) === 0) return mcq(`A hydrogen has ${n} equivalent neighbouring hydrogens on adjacent carbons. Its ¹H NMR signal is a...`, nm, wr(nm, ["singlet", "doublet", "triplet", "quartet", "quintet", "sextet", "septet"].filter((_, i) => i !== n && Math.abs(i - n) <= 3)),
      ["Use the n + 1 rule.", "Count the neighbouring H on the adjacent carbon(s), then add one to get the number of peaks.", "Example: 3 neighbours give 4 peaks, a quartet. Now do yours."], "🧲");
    return num(`A ¹H NMR signal appears as a ${nm}. How many neighbouring hydrogens split it?`, n,
      ["Number of peaks = n + 1.", `A ${nm} has ${n + 1} peak${n ? "s" : ""}. Subtract one.`, "Example: a triplet has 3 peaks, so 2 neighbours. Now do yours."], "🧲");
  };
  b.push(les("¹H NMR splitting: the n + 1 rule", [
    ["Neighbours split signals", "🧲", "The spins of H on adjacent carbons split a signal into <b>n + 1</b> peaks (n = number of equivalent neighbouring H). 0 neighbours: singlet. 1: doublet. 2: triplet. 3: quartet. 4: quintet. 6: septet."],
    ["Peak ratios", "📐", "The peak heights follow Pascal's triangle: doublet 1:1, triplet 1:2:1, quartet 1:3:3:1. An <b>ethyl group</b> (–CH₂CH₃) appears as a quartet (CH₂) plus a triplet (CH₃). An <b>isopropyl</b> (CH(CH₃)₂) has a septet and a doublet."],
    ["What does not split", "🚫", "H on the same carbon do not split each other. Protons on O–H or N–H usually appear as broad singlets (they exchange). Equivalent neighbours do not split each other either."]
  ], ["Count the hydrogens on the neighbouring carbon(s) only, not the same carbon.", "Peaks = neighbours + 1.", "Example: a CH₂ next to a CH₃ sees 3 neighbours and appears as a quartet. Apply it to yours."],
    [spQ, spQ, spQ, spQ,
      ["In an ethyl group, –CH₂–CH₃, the CH₂ signal is a...", "quartet", "triplet", "singlet", "doublet"],
      ["In an ethyl group, –CH₂–CH₃, the CH₃ signal is a...", "triplet", "quartet", "singlet", "septet"],
      ["The CH of an isopropyl group, –CH(CH₃)₂, is a...", "septet", "sextet", "triplet", "doublet"],
      ["Relative peak heights in a quartet are...", "1:3:3:1", "1:2:1", "1:1", "1:4:6:4:1"]]));

  // 12 shifts and integration
  const inQ = () => {
    const [a1, b1] = pick([[3, 2], [3, 1], [2, 1], [3, 4], [1, 2], [5, 3]]), k = pick([1, 2]), T = k * (a1 + b1);
    return num(`A compound has ${T} hydrogens in total. Its ¹H NMR has two signals with integration ratio ${a1}:${b1}. How many hydrogens give the first (${a1}-part) signal?`, a1 * k,
      ["The ratio compares the numbers of hydrogens, but the ratio may be scaled up.", `Add the ratio parts (${a1} + ${b1}) to see the scale factor against ${T}.`, "Example: 8 H split 3:1 means the scale factor is 2, so 6 H and 2 H. Now do yours."], "🧲");
  };
  b.push(les("¹H NMR: chemical shift and integration", [
    ["Chemical shift", "📏", "The shift δ (in ppm, relative to TMS at 0) shows the electronic environment. Electronegative atoms and pi systems <b>deshield</b> H, moving the signal downfield (higher ppm)."],
    ["Typical values", "🗺️", "Alkyl C–H: 0.9–1.7. H next to C=O: 2.0–2.5. H next to O or halogen: 3.3–4.5. Alkene H: 4.5–6.5. Aromatic H: 6.5–8. <b>Aldehyde H: 9–10</b>. Carboxylic acid O–H: 10–12."],
    ["Integration", "∫", "The area under each signal is proportional to the number of H. Integration 3:2 means ratio of H, e.g. a CH₃ and a CH₂. Scale to match the total number of H in the formula."]
  ], ["Which signal comes from H nearer an electronegative atom or a carbonyl?", "Ratio parts add up to a fraction of the total H.", "Example: integration 3:1 for 4 H total means 3 H and 1 H. Scale yours to its formula."],
    [inQ, inQ, inQ,
      ["Which hydrogen appears furthest downfield (highest ppm)?", "An aldehyde H (R–CHO)", "A CH₃ in an alkane", "A CH₂ next to a C=C", "A CH₃ next to a C=O"],
      ["Aromatic hydrogens typically appear at...", "6.5–8 ppm", "0.9–1.5 ppm", "9–10 ppm", "−2 to −1 ppm"],
      ["TMS (the reference compound) is defined as...", "0 ppm", "1 ppm", "10 ppm", "7.26 ppm"],
      ["Electronegative atoms near a hydrogen make its signal...", "move downfield (higher ppm)", "move upfield (lower ppm)", "disappear", "split into more peaks"],
      ["The area under an NMR signal tells you...", "the relative number of hydrogens", "the molar mass", "the boiling point", "the melting point"]]));

  // 13 13C NMR
  const cnQ = () => {
    const [nm, n] = pick([["ethane", 1], ["propane", 2], ["butane", 2], ["2-methylpropane", 2], ["propanone (acetone)", 2], ["benzene", 1], ["methylbenzene (toluene)", 5], ["1,4-dimethylbenzene", 3], ["1,2-dimethylbenzene", 4], ["ethanol", 2], ["methylcyclohexane", 5], ["butanone", 4], ["ethyl ethanoate", 4], ["2-methylpropan-2-ol", 2]]);
    return num(`How many signals does the ¹³C NMR spectrum of ${nm} show?`, n,
      ["Carbons that are equivalent by symmetry give one signal.", "Look at each distinct carbon: CH₃ groups, ring positions, carbonyl carbons.", "Example: propane has 2 (the CH₃ pair and the CH₂). Now count yours."], "🧲");
  };
  b.push(les("¹³C NMR", [
    ["One signal per type of carbon", "🧲", "¹³C NMR shows one peak for each set of <b>equivalent carbons</b>, usually with no splitting. Count the unique carbons by symmetry. Benzene: 1. Toluene: 5. Para-xylene: 3."],
    ["Shift regions", "🗺️", "Alkyl: 0–50 ppm. C–O or C–Cl: 50–90. Alkene and aromatic: 100–150. <b>C=O: 160–220</b> (ketones and aldehydes near 200, esters and acids 160–185)."],
    ["Using the number of peaks", "🧩", "A formula C₄H₁₀O with 2 signals fits tert-butanol (only CH₃ and the C–OH carbon are unique), not butan-1-ol (4 signals)."]
  ], ["Find symmetry planes or equivalent branches first.", "Each unique carbon gives one line; equivalent carbons share one.", "Example: ethanol has CH₃ and CH₂: 2 signals. Count yours."],
    [cnQ, cnQ, cnQ, cnQ, cnQ,
      ["A carbon peak near 200 ppm indicates...", "a ketone or aldehyde C=O", "an alkane CH₃", "an alkyne", "a C–H in benzene only"],
      ["Aromatic carbons appear at about...", "120–140 ppm", "5–30 ppm", "170–220 ppm", "0 ppm only"],
      ["Which isomer of C₄H₁₀O shows only 2 ¹³C signals?", "2-Methylpropan-2-ol", "Butan-1-ol", "Butan-2-ol", "Methoxypropane"]]));

  // 14 mass spec
  const msQ = () => {
    if (ri(0, 1) === 0) {
      const [nm, f, M] = pick([["ethanol", "C₂H₆O", 46], ["propanone", "C₃H₆O", 58], ["butane", "C₄H₁₀", 58], ["benzene", "C₆H₆", 78], ["methylbenzene", "C₇H₈", 92], ["ethanoic acid", "C₂H₄O₂", 60], ["ethylamine", "C₂H₇N", 45], ["phenol", "C₆H₆O", 94], ["ethyl ethanoate", "C₄H₈O₂", 88], ["diethyl ether", "C₄H₁₀O", 74], ["cyclohexane", "C₆H₁₂", 84]]);
      return num(`Find the molecular ion peak m/z of ${nm}, ${f} (use C = 12, H = 1, N = 14, O = 16).`, M,
        ["The molecular ion is the whole molecule minus one electron, so its m/z equals the molar mass (nominal).", "Add the atomic masses: 12 per C, 1 per H, 14 per N, 16 per O.", "Example: C₂H₄O has 24 + 4 + 16 = 44. Now do yours."], "⚖️");
    }
    const [M, fr, lost, what] = pick([[58, 43, 15, "a methyl group"], [88, 73, 15, "a methyl group"], [60, 43, 17, "an OH group"], [46, 31, 15, "a methyl group"], [74, 45, 29, "an ethyl group"], [92, 91, 1, "a hydrogen atom"], [106, 77, 29, "a CHO group"], [78, 77, 1, "a hydrogen atom"]]);
    return num(`A compound with M⁺ at m/z ${M} shows a strong fragment peak at m/z ${fr}. What mass was lost?`, lost,
      ["The lost piece is the difference between the molecular ion and the fragment.", "Subtract the fragment m/z from the molecular ion m/z.", "Example: M⁺ at 72 and a fragment at 57 means 15 was lost. Now do yours."], "💥");
  };
  b.push(les("Mass spectrometry", [
    ["The molecular ion", "⚖️", "A mass spectrometer ionises molecules and sorts ions by <b>m/z</b>. The molecular ion peak M⁺ gives the molar mass. Fragments appear at lower m/z; the tallest peak is the <b>base peak</b>."],
    ["Isotope patterns and the nitrogen rule", "🔬", "Chlorine gives M and M+2 peaks in a 3:1 ratio (³⁵Cl : ³⁷Cl). Bromine gives M and M+2 about 1:1. The <b>nitrogen rule</b>: an odd molecular mass means an odd number of N atoms."],
    ["Common losses", "✂️", "Loss of 15 = CH₃, 17 = OH, 18 = H₂O, 28 = CO or C₂H₄, 29 = C₂H₅ or CHO, 31 = OCH₃, 43 = C₃H₇ or CH₃CO."]
  ], ["Do you need the molar mass, a difference in peaks, or an isotope pattern?", "Subtract fragment from molecular ion to find the lost piece.", "Example: M⁺ = 100 and a fragment at 85 means loss of 15. Do the same for yours."],
    [msQ, msQ, msQ, msQ,
      ["A compound shows two molecular-ion peaks of equal height, 2 mass units apart. It contains...", "one bromine atom", "one chlorine atom", "one fluorine atom", "no halogens"],
      ["A compound shows M and M+2 peaks in a 3:1 ratio. It contains...", "one chlorine atom", "one bromine atom", "one iodine atom", "two bromine atoms"],
      ["A compound has an odd molecular mass. By the nitrogen rule it has...", "an odd number of nitrogen atoms", "no nitrogen", "an even number of nitrogen atoms", "two oxygens exactly"],
      ["The base peak in a mass spectrum is...", "the tallest peak", "the highest m/z peak", "the lowest m/z peak", "always M⁺"]]));

  // 15 UV conjugation
  const uvQ = () => {
    const [E, lam] = pick([[4, 310], [5, 248], [2, 620], [2.5, 496], [8, 155], [3.1, 400]]);
    return num(`The HOMO–LUMO gap of a dye is ${E} eV. Using hc = 1240 eV·nm, what wavelength (nm) of light does it absorb?`, lam,
      ["The molecule absorbs a photon whose energy equals the gap.", "λ (nm) = 1240 ÷ E (eV).", "Example: a gap of 3 eV gives λ = 1240 ÷ 3 ≈ 413 nm. Now compute yours exactly."], "🌈");
  };
  b.push(les("UV–visible spectroscopy and conjugation", [
    ["Electronic transitions", "🌈", "UV–vis light promotes an electron from the HOMO to the LUMO (π → π* for conjugated alkenes). The wavelength absorbed is λ = hc/ΔE: a <b>smaller gap</b> means a <b>longer wavelength</b>."],
    ["More conjugation, longer λ", "🔗", "Isolated C=C (ethene) absorbs at ~165 nm. Butadiene ~217, hexatriene ~258. Each added conjugated C=C shifts λmax to longer wavelength. With about 11 conjugated C=C (β-carotene) the absorption reaches the visible region, making it orange."],
    ["Colour", "🎨", "We see the colours <b>not absorbed</b>. A compound absorbing blue-violet light appears yellow-orange. Beer–Lambert (A = εbc) links absorbance to concentration."]
  ], ["Compare conjugation length or compute λ from the energy gap.", "Larger conjugation: smaller gap: longer wavelength.", "Example: hexatriene (3 conjugated C=C) absorbs at longer wavelength than butadiene (2). Compare yours."],
    [uvQ, uvQ,
      ["Which compound absorbs at the longest wavelength?", "1,3,5-Hexatriene", "1,3-Butadiene", "Ethene", "Ethane (no pi bonds)"],
      ["As conjugation increases, the HOMO–LUMO gap...", "decreases", "increases", "stays the same", "becomes zero"],
      ["β-Carotene is orange because it...", "absorbs blue-violet light with its long conjugated chain", "absorbs orange light", "reflects all light", "has no electrons"],
      ["A compound absorbs strongly at 450 nm (blue). It appears...", "yellow-orange", "blue", "colourless", "black"],
      ["Which transition causes UV absorption in an alkene?", "π → π*", "σ → σ* only", "n → n", "nuclear spin flip"],
      ["Which compound is colourless to the eye?", "Hexane", "β-Carotene", "A dye with long conjugation", "Chlorophyll"]]));

  // 16 chromatography
  const chQ = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const tM = pick([1, 2, 2.5, 4]), k = ri(1, 5);
      return num(`In HPLC the dead time is ${tM} min and a peak elutes at ${tM * (1 + k)} min. What is its retention factor k = (tR − tM) ÷ tM?`, k,
        ["tR − tM is the time the analyte spends on the stationary phase.", "Subtract the dead time from the retention time, then divide by the dead time.", "Example: tM = 2 min and tR = 6 min gives k = 4 ÷ 2 = 2. Now do yours."], "🧪");
    }
    if (t === 1) {
      const w = pick([0.5, 1, 2]), r = pick([5, 10, 15, 20]);
      return num(`A peak has retention time ${r * w} min and base width ${w} min. Plate number N = 16(tR ÷ w)². What is N?`, 16 * r * r,
        ["First find the ratio tR ÷ w.", "Square that ratio, then multiply by 16.", "Example: tR = 6, w = 2 gives ratio 3, so N = 16 × 9 = 144. Now do yours."], "🧪");
    }
    if (t === 2) {
      const w = pick([0.5, 1, 2]), Rs = pick([1, 1.5, 2, 3]);
      return num(`Two peaks, each with base width ${w} min, are separated by ${Rs * w} min. The resolution is Rs = 2Δt ÷ (w₁ + w₂). What is Rs?`, Rs,
        ["Rs compares the separation with the peak widths.", "Both widths are equal, so w₁ + w₂ is twice one width.", "Example: Δt = 3, widths 1 and 1 gives 2 × 3 ÷ 2 = 3. Now do yours."], "🧪");
    }
    const [k1, k2, al] = pick([[2, 3, 1.5], [2, 4, 2], [3, 6, 2], [4, 6, 1.5], [1, 2, 2], [4, 8, 2]]);
    return num(`Two compounds have retention factors k = ${k1} and k = ${k2}. What is the selectivity α = k₂ ÷ k₁?`, al,
      ["α compares how strongly two compounds are retained.", "Divide the larger k by the smaller k.", "Example: k values 2 and 5 give α = 2.5. Now do yours."], "🧪");
  };
  b.push(les("Chromatography: retention and resolution", [
    ["Separating mixtures", "🧪", "Chromatography separates compounds between a <b>stationary</b> and a <b>mobile</b> phase. Compounds more attracted to the stationary phase move more slowly. <b>Retention factor k = (tR − tM) ÷ tM</b>, where tM is the time an unretained compound takes."],
    ["Efficiency and resolution", "📊", "Plate number <b>N = 16 (tR ÷ w)²</b>: more plates, narrower peaks. <b>Selectivity α = k₂ ÷ k₁</b>. <b>Resolution Rs = 2(tR2 − tR1) ÷ (w1 + w2)</b>. Rs ≥ 1.5 means baseline separation."],
    ["HPLC and GC", "⚙️", "In <b>reversed-phase HPLC</b> the stationary phase is non-polar (C18), so polar compounds elute first and non-polar ones later. In <b>gas chromatography</b> the sample is vaporised; at similar polarity, lower-boiling compounds elute first."]
  ], ["Pick the formula that matches (k, N, Rs, or α).", "Substitute carefully; widths are in the same units as times.", "Example: peaks 2 min apart with widths 1 and 1 give Rs = 2 × 2 ÷ 2 = 2. Use the matching formula on yours."],
    [chQ, chQ, chQ, chQ, chQ,
      ["In reversed-phase HPLC (C18 column, polar mobile phase) the compound that elutes first is the most...", "polar", "non-polar", "heavy", "colourful"],
      ["Rs = 1.5 is generally considered...", "baseline resolution", "no separation", "poor resolution", "a measure of the pH"],
      ["In gas chromatography (similar polarity), the compound with the lower boiling point usually...", "elutes first", "elutes last", "never elutes", "dissolves in the column"]]));

  // 17 titration curves
  const ttQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const p = pick([3.8, 4.2, 4.5, 4.8, 5.0]), Ve = pick([11, 22, 33]), kind = ri(0, 2);
      const V = kind === 0 ? Ve / 2 : kind === 1 ? Ve / 11 : 10 * Ve / 11, d = kind === 0 ? 0 : kind === 1 ? -1 : 1;
      return num(`A weak acid with pKa ${p} is titrated with strong base. The equivalence point is at ${Ve} mL. What is the pH after adding ${V} mL of base? (Use Henderson–Hasselbalch.)`, Math.round((p + d) * 10) / 10,
        ["Before equivalence you have a buffer of HA and A⁻. Find the ratio [A⁻] ÷ [HA].", `[A⁻] is the base added (${V} mL) and [HA] is what is left (${r3(Ve - V)} mL). pH = pKa + log of that ratio.`, "Example: if half the acid is neutralised, the ratio is 1 and pH = pKa. Now do yours."], "🧪");
    }
    if (t === 1) {
      const Va = pick([20, 25, 40, 50]), Ca = pick([0.05, 0.1, 0.2]), Cb = pick([0.1, 0.2, 0.25]);
      const ve = Math.round(Ca * Va / Cb * 10) / 10;
      if (Math.abs(ve * 10 - Math.round(ve * 10)) < 1e-9 && Math.abs(Ca * Va / Cb - ve) < 1e-9)
        return num(`${Va} mL of ${Ca} M HCl is titrated with ${Cb} M NaOH. What volume of NaOH (mL) is needed to reach the equivalence point?`, ve,
          ["At equivalence, moles of acid equal moles of base (1:1).", "Ca × Va = Cb × Vb. Solve for Vb.", "Example: 10 mL of 0.1 M acid with 0.2 M base needs 5 mL. Now do yours."], "💧");
    }
    const Ve = pick([10, 20, 30, 40]);
    return num(`The half-equivalence point of a weak acid titration is reached after ${Ve / 2} mL of base. What volume of base is needed to reach the equivalence point (mL)?`, Ve,
      ["Half-equivalence means half of the acid has been neutralised.", "Double the volume at half-equivalence.", "Example: half-equivalence at 7 mL means equivalence at 14 mL. Now do yours."], "💧");
  };
  b.push(les("Acid–base titration curves", [
    ["Equivalence point", "📈", "At the <b>equivalence point</b> moles of acid = moles of base added (for 1:1): <b>Ca·Va = Cb·Vb</b>. The pH there depends on the salt formed: strong acid + strong base gives pH 7; weak acid + strong base gives pH &gt; 7; weak base + strong acid gives pH &lt; 7."],
    ["The buffer region", "🛡️", "Before equivalence a weak acid curve is a buffer: <b>pH = pKa + log([A⁻] ÷ [HA])</b>. At <b>half-equivalence</b> [A⁻] = [HA], so <b>pH = pKa</b>. A pH change of 1 means a 10:1 ratio."],
    ["Choosing an indicator", "🎨", "Choose an indicator whose colour change range sits on the steep part of the curve. Weak acid + strong base: phenolphthalein (pH 8.2–10). Strong acid + strong base: nearly any indicator. Weak base + strong acid: methyl orange (3.1–4.4)."]
  ], ["Decide whether the point is before, at half, or at equivalence.", "Half-equivalence: pH = pKa. A ratio of 10 changes pH by 1 unit.", "Example: pKa 4.5 at half-equivalence has pH 4.5; a 10:1 ratio of A⁻ to HA gives 5.5. Use that for yours."],
    [ttQ, ttQ, ttQ, ttQ,
      ["The pH at the equivalence point of a weak acid with a strong base is...", "greater than 7", "less than 7", "exactly 7", "equal to the pKa"],
      ["Which indicator suits a weak acid–strong base titration?", "Phenolphthalein", "Methyl orange", "Bromocresol green alone", "Litmus only"],
      ["The pH at the half-equivalence point of a weak acid equals...", "its pKa", "7", "its pKb", "14 minus the pKa"]]));

  // 18 redox and complexometric titrations
  const rdQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const V = pick([5, 10, 12.5, 20, 25]);
      return num(`A 25.0 mL sample of Fe²⁺ is titrated with 0.0200 M KMnO₄ (5 Fe²⁺ + MnO₄⁻ + 8 H⁺ → 5 Fe³⁺ + Mn²⁺ + 4 H₂O). The end point is at ${V} mL. What is the Fe²⁺ concentration in mol/L?`, Math.round(0.004 * V * 10000) / 10000,
        ["Moles of MnO₄⁻ = M × V. Each MnO₄⁻ reacts with five Fe²⁺.", `Moles of Fe²⁺ = 5 × (0.0200 × ${V} ÷ 1000). Then divide by 0.0250 L.`, "Example: 10 mL of 0.02 M permanganate gives 0.001 mol Fe²⁺, so 0.04 M in 25 mL. Now do yours."], "🧪");
    }
    if (t === 1) {
      const V = pick([5, 7.5, 10, 12.5, 15, 20]);
      return num(`A 25.0 mL water sample is titrated with 0.0100 M EDTA (1:1 with Ca²⁺). The end point is at ${V} mL. What is the Ca²⁺ concentration in mmol/L?`, Math.round(0.4 * V * 100) / 100,
        ["EDTA reacts with metal ions in a 1:1 ratio.", `Moles of Ca²⁺ = 0.0100 × (${V} ÷ 1000). Divide by 0.0250 L, then convert to mmol.`, "Example: 5 mL of 0.0100 M EDTA in 25 mL gives 2 mmol/L. Now do yours."], "💧");
    }
    const V = pick([10, 15, 20, 25, 30, 40]);
    return num(`The iodine in 25.0 mL of solution is titrated with 0.100 M thiosulfate (I₂ + 2 S₂O₃²⁻ → 2 I⁻ + S₄O₆²⁻). The end point is at ${V} mL. What is the I₂ concentration in mol/L?`, Math.round(0.002 * V * 10000) / 10000,
      ["Each I₂ needs two thiosulfate ions.", `Moles of I₂ = ½ × 0.100 × (${V} ÷ 1000). Divide by 0.0250 L.`, "Example: 10 mL of 0.1 M thiosulfate means 0.0005 mol I₂, so 0.02 M in 25 mL. Now do yours."], "🧪");
  };
  b.push(les("Redox and complexometric titrations", [
    ["Permanganate", "🟣", "KMnO₄ is purple and acts as its own indicator: the end point is the first permanent faint pink. In acid, MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O. So <b>moles Fe²⁺ = 5 × moles MnO₄⁻</b>."],
    ["EDTA", "🔗", "EDTA is a <b>hexadentate</b> chelating ligand that binds most metal ions 1:1 regardless of charge. It is used for water hardness (Ca²⁺ and Mg²⁺), with a metal-ion indicator such as Eriochrome Black T."],
    ["Iodine and thiosulfate", "🟤", "In iodometric titrations I₂ is titrated with thiosulfate: <b>I₂ + 2 S₂O₃²⁻ → 2 I⁻ + S₄O₆²⁻</b>. Starch gives a deep blue complex with I₂ and turns colourless at the end point. Always use the mole ratio from the balanced equation."]
  ], ["Write the mole ratio from the balanced equation first.", "Moles titrant = M × V (in litres); convert using the ratio; divide by the sample volume.", "Example: 8.0 mL of 0.05 M EDTA reacting 1:1 with metal ion in 20 mL gives 0.02 M. Use the same method on yours."],
    [rdQ, rdQ, rdQ, rdQ,
      ["Why does KMnO₄ not need a separate indicator?", "Its purple colour marks the end point", "It is colourless", "It reacts with the indicator", "It dissolves silver"],
      ["EDTA binds most metal ions in what ratio?", "1:1", "1:2", "2:1", "1:6"],
      ["Starch is used in iodine titrations because it...", "forms a deep blue complex with I₂", "neutralises the acid", "reduces thiosulfate", "dissolves iodine"]]));

  b.push(mix("Mixed practice", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  b.push(mix("Level 29 Challenge", at(b, [0, 1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));

  // ================= LEVEL 30 =================
  const c = [];

  // 1 crystal field theory
  const cfseOf = (n, high) => {
    let t, e;
    if (high) { t = Math.min(n, 3); e = Math.min(Math.max(n - 3, 0), 2); const rest = n - t - e, rt = Math.min(rest, 3); t += rt; e += rest - rt; }
    else { t = Math.min(n, 6); e = n - t; }
    return r3(Math.abs(-0.4 * t + 0.6 * e));
  };
  const unp = (n, high) => high ? (n <= 5 ? n : 10 - n) : (n <= 3 ? n : n <= 6 ? 6 - n : n <= 9 ? n - 6 : 0);
  const cfQ = () => {
    const n = ri(1, 9), both = n >= 4 && n <= 7, high = both ? ri(0, 1) === 1 : true;
    const fld = both ? (high ? "weak-field ligands (high spin)" : "strong-field ligands (low spin)") : "any ligands";
    return num(`An octahedral d${"⁰¹²³⁴⁵⁶⁷⁸⁹"[n]} complex has ${fld}. What is its crystal field stabilisation energy, as a positive number of Δₒ? (t₂g electrons give −0.4 Δₒ each, e_g electrons give +0.6 Δₒ each; ignore pairing energy)`, cfseOf(n, high),
      ["Place the electrons first: fill t₂g and e_g according to high spin or low spin.", "CFSE = −0.4 × (number in t₂g) + 0.6 × (number in e_g). Report the size of it.", "Example: d³ has 3 electrons in t₂g, so CFSE = −1.2 Δₒ, and the answer is 1.2. Now do yours."], "🧲");
  };
  c.push(les("Crystal field theory", [
    ["Splitting d orbitals", "🧲", "Ligands split the five d orbitals. In an <b>octahedral</b> complex the lower set is <b>t₂g</b> (three orbitals, −0.4 Δₒ each) and the upper set is <b>e_g</b> (two orbitals, +0.6 Δₒ each). A tetrahedral complex is inverted and smaller: Δₜ ≈ 4/9 Δₒ."],
    ["Strong or weak field", "🔌", "Spectrochemical series: I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO. For d⁴–d⁷, <b>weak-field</b> ligands (small Δₒ) give <b>high spin</b>; <b>strong-field</b> ligands (large Δₒ) give <b>low spin</b> (pair up in t₂g first)."],
    ["Colour", "🎨", "Light of energy equal to Δₒ excites an electron t₂g → e_g, so the complex is coloured (the complementary colour). d⁰ and d¹⁰ complexes have no d–d transition and are usually colourless."]
  ], ["Fill the lower t₂g orbitals first (one each), then decide whether to pair or go up to e_g.", "High spin: put electrons in all five orbitals before pairing. Low spin: pair in t₂g before using e_g.", "Example: low-spin d⁶ has six electrons in t₂g, giving −2.4 Δₒ. Do the same bookkeeping for yours."],
    [cfQ, cfQ, cfQ, cfQ,
      ["In an octahedral complex the lower-energy set of d orbitals is...", "t₂g", "e_g", "sigma", "pi-star"],
      ["Which ligand gives the largest splitting Δₒ?", "CN⁻", "I⁻", "Cl⁻", "H₂O"],
      ["Strong-field ligands in a d⁶ octahedral complex give...", "low spin, no unpaired electrons", "high spin, four unpaired electrons", "a tetrahedral shape", "d⁰"],
      ["Why are many transition metal complexes coloured?", "d–d transitions absorb visible light", "they emit radio waves", "they are all radioactive", "they contain carbon"],
      ["A complex that absorbs red light appears...", "green/blue-green", "red", "colourless", "black"],
      ["Which complex is expected to be colourless?", "Zn²⁺ (d¹⁰) complexes", "Cu²⁺ (d⁹) complexes", "Fe³⁺ (d⁵) complexes", "Ni²⁺ (d⁸) complexes"]]));

  // 2 magnetism
  const MAG = [["[Fe(CN)₆]³⁻", 1], ["[Fe(H₂O)₆]²⁺", 4], ["[Co(NH₃)₆]³⁺", 0], ["[CoF₆]³⁻", 4], ["[Ni(H₂O)₆]²⁺", 2], ["[Cu(H₂O)₆]²⁺", 1], ["[Mn(H₂O)₆]²⁺", 5], ["[Fe(CN)₆]⁴⁻", 0], ["[Cr(H₂O)₆]³⁺", 3], ["[Zn(NH₃)₄]²⁺", 0]];
  const MU = { 1: "1.73", 2: "2.83", 3: "3.87", 4: "4.90", 5: "5.92" };
  const magQ = () => {
    if (ri(0, 1) === 0) {
      const [f, n] = pick(MAG);
      return num(`How many unpaired electrons does ${f} have? (Fe(CN)₆ and Co(NH₃)₆ are low spin; F⁻ and H₂O complexes of Mn, Fe, CoF₆ are high spin.)`, n,
        ["Find the oxidation state of the metal and its d-electron count first.", "Then fill the t₂g and e_g orbitals using high or low spin and count the unpaired ones.", "Example: Ti³⁺ is d¹ with one unpaired electron. Work out yours."], "🧲");
    }
    const n = ri(1, 5), right = MU[n];
    return mcq(`The spin-only magnetic moment is μ = √(n(n + 2)) Bohr magnetons. A complex with ${n} unpaired electron${n > 1 ? "s" : ""} has μ about...`, right + " BM", wr(right, Object.values(MU)).map(x => x + " BM"),
      ["Put n into n(n + 2) first, then take the square root.", `For this n, n(n + 2) = ${n * (n + 2)}. Take its square root.`, "Example: n = 2 gives √8 ≈ 2.83 BM. Now do yours."], "🧲");
  };
  c.push(les("Magnetism and unpaired electrons", [
    ["Paramagnetic or diamagnetic", "🧲", "A complex with unpaired electrons is <b>paramagnetic</b> (pulled into a magnetic field). If all electrons are paired it is <b>diamagnetic</b> (weakly repelled)."],
    ["Spin-only moment", "📏", "<b>μ = √(n(n + 2)) BM</b>, where n is the number of unpaired electrons: n = 1 → 1.73, 2 → 2.83, 3 → 3.87, 4 → 4.90, 5 → 5.92 BM. Measuring μ reveals whether a complex is high or low spin."],
    ["Counting electrons", "🔢", "Oxidation state first: Fe in [Fe(CN)₆]³⁻ is +3 (d⁵). CN⁻ is strong-field, so low spin: five electrons in t₂g gives <b>1</b> unpaired. In [Fe(H₂O)₆]²⁺ (d⁶, high spin) there are <b>4</b> unpaired."]
  ], ["Work out the d-count (group number minus oxidation state), then fill orbitals.", "High spin means maximum unpaired; low spin means pairing in t₂g first.", "Example: low-spin d⁶ has zero unpaired electrons; high-spin d⁶ has four. Apply that to yours."],
    [magQ, magQ, magQ, magQ, magQ,
      ["A complex with no unpaired electrons is...", "diamagnetic", "paramagnetic", "ferromagnetic only", "radioactive"],
      ["Which complex is paramagnetic?", "[Cu(H₂O)₆]²⁺", "[Zn(NH₃)₄]²⁺", "[Co(NH₃)₆]³⁺", "[Fe(CN)₆]⁴⁻"]]));

  // 3 complexes
  const CX = [["[Co(NH₃)₆]³⁺", 3, 6], ["[Fe(CN)₆]⁴⁻", 2, 6], ["[Fe(CN)₆]³⁻", 3, 6], ["[Cu(NH₃)₄]²⁺", 2, 4], ["[PtCl₄]²⁻", 2, 4], ["[Co(en)₃]³⁺", 3, 6], ["[Cr(H₂O)₆]³⁺", 3, 6], ["[CoCl₄]²⁻", 2, 4], ["[Ag(NH₃)₂]⁺", 1, 2], ["[Ni(CO)₄]", 0, 4], ["[Fe(C₂O₄)₃]³⁻", 3, 6], ["[Zn(OH)₄]²⁻", 2, 4], ["[Cr(en)₂Cl₂]⁺", 3, 6], ["[Pt(NH₃)₂Cl₂]", 2, 4]];
  const cxQ = () => {
    const [f, ox, cn] = pick(CX);
    if (ri(0, 1) === 0) return num(`What is the oxidation state of the metal in ${f}? (NH₃, H₂O, CO and en are neutral; Cl⁻, CN⁻ and OH⁻ are −1; C₂O₄²⁻ is −2.)`, ox,
      ["Charge on the complex = metal oxidation state + sum of ligand charges.", "Add the ligand charges, then find what the metal must be.", "Example: [Ni(NH₃)₆]²⁺ has neutral ligands, so Ni is +2. Now do yours."], "⚛️");
    return num(`What is the coordination number of the metal in ${f}? (en and C₂O₄²⁻ each bind through two atoms.)`, cn,
      ["The coordination number counts donor atoms bonded to the metal, not ligands.", "Multiply each ligand's count by how many donor atoms it uses (en and oxalate use two).", "Example: [Cu(en)₂]²⁺ has two bidentate ligands, giving 4. Count yours."], "⚛️");
  };
  c.push(les("Complex ions: oxidation state and coordination number", [
    ["Metal plus ligands", "⚛️", "A <b>complex</b> is a metal ion bonded to ligands that donate electron pairs. The <b>coordination number</b> is the number of donor atoms attached to the metal (commonly 6 octahedral, 4 tetrahedral or square planar, 2 linear)."],
    ["Oxidation state", "🔢", "Complex charge = metal oxidation state + sum of ligand charges. In [Fe(CN)₆]⁴⁻: x + 6(−1) = −4, so Fe is +2."],
    ["Chelates", "🦀", "A <b>bidentate</b> ligand (ethylenediamine, en; oxalate) binds through two donor atoms; EDTA is <b>hexadentate</b>. Chelates are extra stable (the chelate effect, because of entropy)."]
  ], ["Identify each ligand's charge and how many donor atoms it uses.", "Charge balance gives the oxidation state; counting donor atoms gives the coordination number.", "Example: [CoCl₄]²⁻ has four Cl⁻, so Co + 4(−1) = −2 gives Co +2, with coordination number 4. Apply it to yours."],
    [cxQ, cxQ, cxQ, cxQ, cxQ,
      ["Ethylenediamine (en) is a...", "bidentate ligand", "monodentate ligand", "hexadentate ligand", "metal ion"],
      ["EDTA is a...", "hexadentate ligand", "bidentate ligand", "monodentate ligand", "cation"],
      ["The chelate effect means chelates are...", "more stable than similar complexes with monodentate ligands", "less stable", "always colourless", "always neutral"]]));

  // 4 naming and isomers
  const agQ = () => {
    const [f, n] = pick([["[Co(NH₃)₆]Cl₃", 3], ["[Co(NH₃)₅Cl]Cl₂", 2], ["[Co(NH₃)₄Cl₂]Cl", 1], ["[Pt(NH₃)₂Cl₂]", 0], ["[Cr(H₂O)₅Cl]Cl₂", 2], ["[Cr(H₂O)₄Cl₂]Cl", 1], ["[Pt(NH₃)₄]Cl₂", 2]]);
    return num(`Excess AgNO₃(aq) is added to one mole of ${f} in water. How many moles of AgCl precipitate? (Only free Cl⁻ outside the brackets precipitates.)`, n,
      ["Ligands inside the square brackets are bonded to the metal; ions outside are free.", "Count the Cl outside the brackets.", "Example: [Co(NH₃)₅Br]Cl₂ would give 2 mol AgCl. Now do yours."], "⚗️");
  };
  c.push(les("Naming and isomerism of complexes", [
    ["Naming rules", "🏷️", "Name ligands first, in alphabetical order, then the metal with its oxidation state in Roman numerals. Prefixes di-, tri-; NH₃ is <b>ammine</b>, H₂O is <b>aqua</b>, Cl⁻ is <b>chlorido</b>, CN⁻ is <b>cyanido</b>. Anionic complexes end in <b>-ate</b>: [Fe(CN)₆]⁴⁻ is hexacyanidoferrate(II)."],
    ["Isomers", "🔀", "<b>Geometric</b>: cis/trans in square planar MA₂B₂ (cisplatin is cis-[Pt(NH₃)₂Cl₂]) and octahedral MA₄B₂. <b>Optical</b>: [Co(en)₃]³⁺ is chiral. <b>Linkage</b>: NO₂⁻ binding through N or O. <b>Ionisation</b>: [Co(NH₃)₅Br]SO₄ and [Co(NH₃)₅SO₄]Br."],
    ["Counterions", "🧂", "Ions outside the square brackets dissociate in water; ligands inside stay bound. So [Co(NH₃)₅Cl]Cl₂ gives 3 ions and 2 free Cl⁻ that can precipitate with Ag⁺."]
  ], ["Inside brackets: bound to the metal. Outside: free ions.", "Remember the alphabetical order of ligands and -ate for anionic complexes.", "Example: [Co(NH₃)₆]Cl₃ is hexaamminecobalt(III) chloride. Use the same pattern for yours."],
    [agQ, agQ, agQ,
      ["[Co(NH₃)₆]Cl₃ is named...", "hexaamminecobalt(III) chloride", "cobalt hexaammonium trichloride", "hexaamminecobalt(II) chloride", "cobaltate(III) hexaammine chloride"],
      ["K₄[Fe(CN)₆] is named...", "potassium hexacyanidoferrate(II)", "potassium hexacyanoiron(IV)", "tetrapotassium iron cyanide", "potassium hexacyanidoferrate(III)"],
      ["Cisplatin, cis-[Pt(NH₃)₂Cl₂], shows which kind of isomerism?", "Geometric (cis/trans)", "Optical only", "Ionisation only", "None"],
      ["[Co(en)₃]³⁺ is chiral because...", "its three chelate rings form a non-superimposable propeller shape", "it has a carbon stereocentre", "it contains a double bond", "it is a square plane"],
      ["Square planar [PtA₂B₂] has how many geometric isomers?", "2", "1", "3", "4"]]));

  // 5 18-electron rule
  const eQ = () => {
    if (ri(0, 1) === 0) {
      const [f, g, n] = pick([["Cr(CO)₆", 6, 6], ["Fe(CO)₅", 8, 5], ["Ni(CO)₄", 10, 4], ["V(CO)₆", 5, 6], ["Mn(CO)₅", 7, 5], ["Co(CO)₄", 9, 4], ["Cr(CO)₅", 6, 5], ["Fe(CO)₄", 8, 4], ["Ni(CO)₃", 10, 3], ["Mo(CO)₆", 6, 6]]);
      return num(`How many valence electrons does ${f} have? (Metal group number = ${g}; each CO donates 2 electrons.)`, g + 2 * n,
        ["Count the metal's valence electrons (its group number) and add the electrons donated by the ligands.", `Each of the ${n} CO ligands donates 2 electrons.`, "Example: W(CO)₆ is 6 + 12 = 18. Now do yours."], "🔢");
    }
    const [nm, g, n] = pick([["Cr", 6, 6], ["Mo", 6, 6], ["W", 6, 6], ["Fe", 8, 5], ["Ru", 8, 5], ["Os", 8, 5], ["Ni", 10, 4], ["Pd", 10, 4]]);
    return num(`How many CO ligands does the neutral ${nm} (group ${g}) need to reach 18 valence electrons in ${nm}(CO)ₓ?`, n,
      ["The total must be 18: the metal electrons plus 2 per CO.", `18 − ${g} electrons must come from CO, 2 at a time.`, "Example: a group 8 metal needs 10 more electrons, so 5 CO. Now do yours."], "🔢");
  };
  c.push(les("The 18-electron rule", [
    ["Why 18?", "🔢", "Transition metals have nine valence orbitals (one s, three p, five d). Filling all nine with pairs gives <b>18 electrons</b> and a stable complex, especially with strong-field pi-acceptor ligands such as CO."],
    ["Counting", "🧮", "<b>Total = metal group number + 2 per two-electron ligand</b> (CO, PR₃, NH₃, H₂O) + 5 for η⁵-C₅H₅ or 6 for η⁶-benzene (neutral counting). Cr(CO)₆ = 6 + 12 = 18. Fe(CO)₅ = 8 + 10 = 18. Ni(CO)₄ = 10 + 8 = 18."],
    ["Exceptions", "⚠️", "17-electron species such as V(CO)₆ or Mn(CO)₅ are reactive (radical-like); Mn(CO)₅ dimerises into Mn₂(CO)₁₀ with an Mn–Mn bond, giving each Mn 18. Square-planar d⁸ complexes are stable at 16 electrons."]
  ], ["Metal group number first, then add ligand donations.", "CO gives two electrons each.", "Example: Fe(CO)₅ is 8 + 5 × 2 = 18. Use the same recipe on yours."],
    [eQ, eQ, eQ, eQ,
      ["Ferrocene, Fe(C₅H₅)₂, has how many valence electrons (Fe group 8, each C₅H₅ donates 5)?", "18", "16", "20", "10"],
      ["Mn(CO)₅ has 17 electrons, so it tends to...", "dimerise to Mn₂(CO)₁₀", "lose all CO at once", "become a gas always", "turn into Cr"],
      ["The 18-electron rule comes from filling...", "one s, three p and five d orbitals", "only the five d orbitals", "only the s orbital", "four f orbitals"]]));

  // 6 main group
  const OX = [["HClO", "Cl", 1], ["HClO₂", "Cl", 3], ["HClO₃", "Cl", 5], ["HClO₄", "Cl", 7], ["H₂SO₄", "S", 6], ["H₂SO₃", "S", 4], ["HNO₃", "N", 5], ["HNO₂", "N", 3], ["H₃PO₄", "P", 5], ["KMnO₄", "Mn", 7], ["K₂Cr₂O₇", "Cr", 6], ["MnO₂", "Mn", 4]];
  const oxQ = () => {
    const [f, el, ox] = pick(OX);
    return num(`What is the oxidation number of ${el} in ${f}? (H is +1, K is +1, O is −2.)`, ox,
      ["The oxidation numbers in a neutral compound add to zero.", "Add up the known charges (H, K, O) and find what the other element must be.", "Example: in HBrO₃, H is +1 and three O give −6, so Br is +5. Now do yours."], "⚛️");
  };
  c.push(les("Main-group trends: oxides, oxoacids, oxidation numbers", [
    ["Oxides across a period", "🌡️", "Oxides change from <b>basic</b> (Na₂O, MgO) through <b>amphoteric</b> (Al₂O₃, which reacts with both acids and bases) to <b>acidic</b> (SiO₂, P₄O₁₀, SO₃, Cl₂O₇). Metal oxides are basic; non-metal oxides are acidic."],
    ["Oxoacid strength", "💪", "For HₘXOₙ, the more non-hydroxyl (=O) oxygens, the stronger the acid: HClO < HClO₂ < HClO₃ < HClO₄. H₂SO₄ is stronger than H₂SO₃. Binary acids get stronger down a group: HF < HCl < HBr < HI."],
    ["Oxidation numbers", "🔢", "Add to zero for a neutral compound. O is usually −2 and H is +1. In HClO₄: 1 + x − 8 = 0, so Cl is +7. Highest oxidation states: +7 for Cl or Mn, +6 for S or Cr, +5 for N or P."]
  ], ["Check whether the element is a metal or non-metal, and count oxygens.", "Set up the charge sum to zero and solve.", "Example: in H₂SO₃, 2 + x − 6 = 0, so S is +4. Do the same with yours."],
    [oxQ, oxQ, oxQ,
      ["Which oxide is amphoteric?", "Al₂O₃", "Na₂O", "SO₃", "CO₂"],
      ["Which oxide forms an acidic solution in water?", "SO₃", "Na₂O", "MgO", "CaO"],
      ["Which is the strongest acid?", "HClO₄", "HClO", "HClO₂", "HClO₃"],
      ["Which hydrohalic acid is the strongest in water?", "HI", "HF", "HCl", "They are equal"],
      ["Na₂O dissolves in water to give a solution that is...", "strongly basic", "strongly acidic", "neutral", "an oxidising acid"],
      ["Why is HF a weaker acid than HI?", "The H–F bond is much stronger", "Fluorine is larger than iodine", "HF has more electrons", "HF is a solid"]]));

  // 7 particle in a box
  const pbQ = () => {
    const E1 = ri(1, 5), t = ri(0, 3);
    if (t === 0) { const n = ri(2, 5); return num(`A particle in a one-dimensional box has ground-state energy E₁ = ${E1} eV. Using Eₙ = n²E₁, what is the energy of level n = ${n} in eV?`, n * n * E1,
      ["Eₙ grows as the square of n.", "Square n, then multiply by E₁.", "Example: n = 6 with E₁ = 2 eV gives 36 × 2 = 72 eV. Now do yours."], "📦"); }
    if (t === 1) { const [ni, nf] = pick([[1, 2], [1, 3], [2, 3], [1, 4], [2, 4], [3, 4]]); return num(`E₁ = ${E1} eV for a particle in a box. How much energy (eV) does it absorb in going from n = ${ni} to n = ${nf}?`, (nf * nf - ni * ni) * E1,
      ["The photon energy equals the difference between the two levels.", "ΔE = (nf² − ni²) × E₁.", "Example: 2 → 5 with E₁ = 1 eV needs (25 − 4) = 21 eV. Now do yours."], "📦"); }
    if (t === 2) { const E8 = pick([8, 12, 20, 16]); return num(`A particle in a box has E₁ = ${E8} eV. The box is made twice as long (E ∝ 1/L²). What is the new ground-state energy in eV?`, E8 / 4,
      ["Energy goes as 1 ÷ L².", "Doubling L divides the energy by 2 squared.", "Example: halving the length would multiply the energy by 4. Now do yours."], "📦"); }
    const n = ri(2, 7); return num(`How many nodes (not counting the walls) does the wave function of level n = ${n} in a one-dimensional box have?`, n - 1,
      ["The ground state n = 1 has no nodes.", "Each step up in n adds one node.", "Example: n = 4 has 3 nodes. Now do yours."], "📦");
  };
  c.push(les("Quantum mechanics: the particle in a box", [
    ["Confinement quantises energy", "📦", "A particle confined to a 1-D box of length L has wave functions that fit whole half-wavelengths. Energies: <b>Eₙ = n²h² ÷ (8mL²)</b>, n = 1, 2, 3, ... So Eₙ = n² E₁."],
    ["Key consequences", "🔑", "The lowest energy (n = 1) is not zero: the <b>zero-point energy</b>. A bigger box or heavier particle means smaller energies and closer spacing. Level n has <b>n − 1 nodes</b> inside the box."],
    ["Applications", "💡", "The model explains why conjugated molecules (long chains of alternating bonds) absorb at longer wavelength as they get longer: the electrons live in a longer box, so the gap shrinks."]
  ], ["Use Eₙ = n² × E₁ and remember E depends on 1 ÷ L².", "Subtract level energies for a transition; scale with the length factor squared.", "Example: if E₁ = 3 eV, then E₃ = 27 eV. Now use it for yours."],
    [pbQ, pbQ, pbQ, pbQ, pbQ,
      ["A particle in a box can have zero energy.", "False; the lowest energy is the zero-point energy", "True", "True only for electrons", "True only at 0 K"],
      ["If the box gets longer, the energy levels become...", "closer together", "further apart", "unchanged", "negative"],
      ["A heavier particle in the same box has energy levels that are...", "lower", "higher", "identical", "random"]]));

  // 8 Boltzmann
  const bzQ = () => {
    if (ri(0, 1) === 0) {
      const [x, r] = pick([[0.5, "0.61"], [1, "0.37"], [2, "0.14"], [3, "0.05"]]);
      return mcq(`Two energy levels are separated by ΔE = ${x} kT (g = 1 for both). The population ratio N(upper) ÷ N(lower) = e^(−ΔE/kT) is about...`, r, wr(r, ["0.61", "0.37", "0.14", "0.05", "2.72", "1.65"]),
        ["The upper level is less populated than the lower, so the ratio is below 1.", `Compute e raised to the power −${x} on a calculator.`, "Example: ΔE = 4 kT gives e⁻⁴ ≈ 0.02. Now do yours."], "🌡️");
    }
    const [g1, g2] = pick([[1, 3], [1, 5], [1, 2], [1, 9], [2, 6], [3, 9]]);
    return num(`At a very high temperature (kT much larger than ΔE) the ratio N(upper) ÷ N(lower) = (g₂ ÷ g₁) e^(−ΔE/kT) approaches g₂ ÷ g₁. The lower level has degeneracy ${g1} and the upper has ${g2}. What is the ratio?`, g2 / g1,
      ["When kT is huge, the exponential factor becomes almost 1.", "Only the ratio of degeneracies is left.", "Example: g₁ = 2 and g₂ = 8 gives a ratio of 4. Now do yours."], "🌡️");
  };
  c.push(les("The Boltzmann distribution", [
    ["Populations of energy levels", "🌡️", "At temperature T, molecules spread over energy levels: <b>Nᵢ ∝ gᵢ e^(−Eᵢ/kT)</b>. The ratio of two levels is <b>N₂/N₁ = (g₂/g₁) e^(−ΔE/kT)</b>, where g is the degeneracy (number of states with that energy)."],
    ["Temperature effect", "🔥", "At low T almost every molecule is in the ground state. As T rises, upper levels fill. At very high T the exponential approaches 1, and populations follow the degeneracies. Per mole, use RT instead of kT (RT ≈ 2.48 kJ/mol at 298 K)."],
    ["Link to rates", "🚀", "The fraction of molecules with energy above Eₐ is about e^(−Eₐ/RT): that is the exponential factor in the Arrhenius equation."]
  ], ["Is the exponent negative? Higher energy means smaller population.", "Evaluate e^(−ΔE/kT) and multiply by g₂ ÷ g₁.", "Example: ΔE = 1 kT gives e⁻¹ ≈ 0.37. Use the same step for yours."],
    [bzQ, bzQ, bzQ,
      ["As temperature rises, the fraction of molecules in the upper level...", "increases", "decreases", "stays zero", "becomes negative"],
      ["At T → 0 K nearly all molecules are in the...", "ground state", "highest level", "second level", "none of the levels"],
      ["The Boltzmann factor for a level of energy E above the ground state is...", "e^(−E/kT)", "e^(E/kT)", "E ÷ kT", "kT ÷ E"],
      ["Degenerate levels are levels that have...", "the same energy", "different charges", "zero energy", "different masses"]]));

  // 9 entropy
  const enQ = () => {
    const n = ri(1, 3), f = x => x >= 10 ? x.toFixed(1) : x.toFixed(2), R = 8.314, L = 0.6931;
    const right = f(n * R * L);
    return mcq(`${n} mol of ideal gas expands isothermally to twice its volume. ΔS = nR ln(V₂/V₁) (R = 8.314 J/K·mol, ln 2 = 0.693). What is ΔS in J/K?`, right, wr(right, [f(n * R), f(n * R * L / 2), f(n * R * L * 2), f(n * R * 2)]),
      ["Doubling the volume means V₂ ÷ V₁ = 2.", "ΔS = n × R × ln 2 (positive, because the gas has more room).", "Example: 2 mol with a volume ratio of 2 gives 2 × 8.314 × 0.693 ≈ 11.5 J/K. Now do yours."], "🎈");
  };
  const wQ = () => {
    const [N, k] = pick([[4, 2], [3, 1], [5, 1], [4, 1], [5, 2], [6, 3], [6, 2]]);
    const comb = (n, r) => { let x = 1; for (let i = 1; i <= r; i++) x = x * (n - r + i) / i; return Math.round(x); };
    return num(`${N} distinguishable particles sit in a box split into two equal halves. In how many ways can exactly ${k} be in the left half? (This is W, the number of microstates.)`, comb(N, k),
      ["Choose which particles are on the left: a combination.", `W = N! ÷ (k!(N − k)!) with N = ${N} and k = ${k}.`, "Example: 4 particles with 1 on the left gives 4 ways. Now do yours."], "🎲");
  };
  c.push(les("Statistical entropy", [
    ["Boltzmann's equation", "🎲", "<b>S = k ln W</b>, where W is the number of microstates (ways to arrange the particles and energy) for the same macroscopic state, and k = 1.38×10⁻²³ J/K. More ways means more entropy."],
    ["Expansion of a gas", "🎈", "Each molecule has twice as many positions when the volume doubles. For n moles: <b>ΔS = nR ln(V₂/V₁)</b>. Doubling the volume gives ΔS = nR ln 2 = 5.76 J/K per mole."],
    ["Counting microstates", "🔢", "For distinguishable particles in two halves, the number of ways to put k on the left is the combination <b>N! ÷ (k!(N − k)!)</b>. The most probable macrostate (equal split) has the most microstates, which is why gases spread out."]
  ], ["Decide whether to use S = k ln W, nR ln(V₂/V₁), or a combination count.", "Entropy rises when volume increases or when microstates multiply.", "Example: 3 mol expanding to 2× volume gives 3R ln 2. Substitute yours."],
    [enQ, enQ, wQ, wQ, wQ,
      ["Which has the higher entropy at the same temperature?", "1 mol of gas", "1 mol of liquid", "1 mol of solid", "They are equal"],
      ["If a system's number of microstates W increases, S...", "increases", "decreases", "stays the same", "becomes zero"],
      ["A perfect crystal at 0 K has W = 1 and so S equals...", "zero", "k", "R", "infinity"]]));

  // 10 Clausius-Clapeyron
  const ccQ = () => {
    const s = pick([2000, 3000, 4000, 5000, 6000]), R = 8.314, f = x => x.toFixed(1);
    const right = f(s * R / 1000) + " kJ/mol";
    return mcq(`A plot of ln P against 1/T for a liquid has slope −${s} K. Using slope = −ΔHvap ÷ R (R = 8.314 J/K·mol), what is ΔHvap?`, right,
      wr(right, [f(s / R / 1000 * 1000 / 1000) + " kJ/mol", f(s * R / 2000) + " kJ/mol", f(s * R / 100) + " kJ/mol", f(s * R * 2 / 1000) + " kJ/mol"]),
      ["The slope contains the enthalpy of vaporisation over R.", "ΔHvap = −slope × R. Convert from J to kJ by dividing by 1000.", "Example: slope −3500 K gives 3500 × 8.314 ÷ 1000 ≈ 29.1 kJ/mol. Now do yours."], "📉");
  };
  c.push(les("Clausius–Clapeyron: vapor pressure and temperature", [
    ["The equation", "📉", "<b>ln P = −ΔHvap/(R T) + C</b>. A plot of ln P versus 1/T is a straight line with slope <b>−ΔHvap/R</b>. A steeper slope means a larger enthalpy of vaporisation."],
    ["Two-point form", "🧮", "<b>ln(P₂/P₁) = −(ΔHvap/R)(1/T₂ − 1/T₁)</b>. Use kelvin and R = 8.314 J/(K·mol). Higher T means higher vapor pressure."],
    ["Boiling point", "🍲", "A liquid boils when its vapor pressure equals the external pressure. Lowering the external pressure (mountains) lowers the boiling point, which is why water boils at about 95 °C at 2000 m."]
  ], ["Which quantity does the slope represent?", "Multiply the (positive) magnitude of the slope by R.", "Example: slope −4000 K gives about 33.3 kJ/mol. Do the same steps with yours."],
    [ccQ, ccQ, ccQ,
      ["A larger ΔHvap makes the vapor pressure of a liquid...", "more sensitive to temperature", "less sensitive to temperature", "independent of temperature", "constant"],
      ["On a plot of ln P versus 1/T, the slope equals...", "−ΔHvap/R", "ΔHvap × R", "R/ΔHvap", "T"],
      ["At a higher altitude water boils at a lower temperature because...", "the external pressure is lower", "the water is cleaner", "gravity heats it", "ΔHvap becomes zero"],
      ["The Clausius–Clapeyron equation requires temperature in...", "kelvin", "Celsius", "Fahrenheit", "any unit"],
      ["When the temperature rises, the vapor pressure of a liquid...", "rises", "falls", "stays constant", "becomes zero"]]));

  // 11 amino acids
  const aaQ = () => {
    const p1 = pick([2.0, 2.2, 2.4]), p2 = pick([9.6, 9.8, 10.0]);
    return num(`A neutral amino acid has pKa(–COOH) = ${p1} and pKa(–NH₃⁺) = ${p2}. What is its isoelectric point, pI = (pKa₁ + pKa₂) ÷ 2?`, Math.round((p1 + p2) * 5) / 10,
      ["The pI is the pH where the net charge is zero.", "For a neutral amino acid it sits halfway between the two pKa values.", "Example: pKa values 2.0 and 10.0 give pI = 6.0. Now do yours."], "🧬");
  };
  c.push(les("Amino acids and isoelectric point", [
    ["Zwitterions", "🧬", "An α-amino acid has –NH₃⁺ and –COO⁻ on the same carbon at neutral pH: a <b>zwitterion</b> (net charge 0). At low pH it is +1 (–COOH, –NH₃⁺); at high pH it is −1 (–COO⁻, –NH₂)."],
    ["The pI", "⚖️", "The <b>isoelectric point (pI)</b> is the pH of zero net charge. For a neutral amino acid, pI = (pKa₁ + pKa₂) ÷ 2 (about 6 for glycine). Acidic side chains (Asp, Glu) lower the pI; basic ones (Lys, Arg, His) raise it."],
    ["Charge vs pH", "🔌", "Below its pI an amino acid is net positive; above, net negative. In electrophoresis a molecule at pH below pI moves toward the negative electrode (cathode); at pH above pI it moves toward the positive (anode)."]
  ], ["Compare the solution pH with the pI to decide the net charge.", "The pI sits between the two relevant pKa values.", "Example: glycine (pKa 2.3 and 9.6) has pI near 6. Use that pattern for yours."],
    [aaQ, aaQ, aaQ,
      ["At pH well below its pI, an amino acid has a net charge that is...", "positive", "negative", "zero", "undefined"],
      ["At pH well above its pI, an amino acid has a net charge that is...", "negative", "positive", "zero", "undefined"],
      ["Which amino acid has the highest pI?", "Lysine", "Aspartate", "Glutamate", "Glycine"],
      ["At its pI an amino acid exists mainly as a...", "zwitterion", "cation", "anion", "gas"],
      ["Glutamate has a low pI because its side chain is...", "a carboxylic acid", "an amine", "a thiol", "an alkyl group"],
      ["An amino acid at pH below its pI moves in an electric field toward the...", "cathode (negative electrode)", "anode (positive electrode)", "both electrodes equally", "neither"]]));

  // 12 peptides and proteins
  const ppQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(3, 12); return num(`A peptide is made of ${n} amino acid residues in one chain. How many peptide (amide) bonds does it contain?`, n - 1,
      ["Each bond joins two neighbouring residues.", "Count the gaps between residues in a chain.", "Example: a chain of 5 residues has 4 gaps, so 4 bonds. Now do yours."], "🔗"); }
    if (t === 1) { const k = ri(2, 3); return num(`How many different ${k === 2 ? "dipeptides" : "tripeptides"} can be made from the 20 common amino acids if repeats are allowed (order matters)?`, 20 ** k,
      ["Each position can be any of 20 amino acids.", `Multiply 20 by itself once for every position (${k} of them).`, "Example: for 1-residue chains there are just 20; for 2 residues 20 × 20. Now do yours."], "🔗"); }
    const n = ri(3, 4); return num(`In how many different orders can ${n} different amino acids be joined into a chain, using each once?`, n === 3 ? 6 : 24,
      ["This is a factorial count.", `Multiply ${n} × ${n - 1} × ... × 1.`, "Example: 2 amino acids give 2 orders. Now do yours."], "🔗");
  };
  c.push(les("Peptides and protein structure", [
    ["The peptide bond", "🔗", "Amino acids join by <b>condensation</b>: the –COOH of one reacts with the –NH₂ of the next, losing H₂O to form an amide <b>peptide bond</b>. A chain of n residues has n − 1 peptide bonds. By convention it is written from the <b>N-terminus</b> to the <b>C-terminus</b>."],
    ["Four levels", "🏗️", "<b>Primary</b>: the amino acid sequence. <b>Secondary</b>: local α-helices and β-sheets held by backbone hydrogen bonds. <b>Tertiary</b>: the full 3-D fold (hydrophobic core, salt bridges, disulfide S–S bonds between cysteines). <b>Quaternary</b>: several chains together (haemoglobin has four)."],
    ["Denaturation", "🔥", "Heat, extreme pH or detergents break the weak interactions and unfold a protein (denaturation) without breaking peptide bonds. The shape, and therefore the function, is lost, like the white of an egg turning solid on cooking."]
  ], ["Count residues, then bonds: bonds are between neighbours.", "Combinations multiply the choices for each position.", "Example: 4 residues give 3 peptide bonds. Use the same counting for yours."],
    [ppQ, ppQ, ppQ, ppQ,
      ["Which level of protein structure is the amino acid sequence?", "Primary", "Secondary", "Tertiary", "Quaternary"],
      ["α-helices and β-sheets are examples of...", "secondary structure", "primary structure", "quaternary structure", "denaturation"],
      ["A disulfide bond forms between two...", "cysteine side chains", "glycine residues", "peptide bonds", "water molecules"],
      ["Denaturing a protein breaks mainly its...", "weak interactions that hold its fold", "peptide bonds", "carbon–carbon bonds", "nuclei"],
      ["Haemoglobin has four chains. That is its...", "quaternary structure", "primary structure", "secondary structure", "only a tertiary fold"]]));

  // 13 carbohydrates
  c.push(les("Carbohydrates", [
    ["Sugars", "🍬", "Glucose, C₆H₁₂O₆, is an <b>aldohexose</b> (an aldehyde with six carbons; its open chain has 4 stereocentres, so 2⁴ = 16 aldohexose stereoisomers). Fructose is a <b>ketohexose</b>. In water, glucose is mostly in a six-membered ring."],
    ["α and β anomers", "🔄", "Ring closure creates a new stereocentre at C1, the <b>anomeric carbon</b>, giving α and β forms that interconvert in water (mutarotation). β-D-glucose has all substituents equatorial and is the most stable."],
    ["Glycosidic bonds", "🔗", "Two sugars join by a <b>glycosidic bond</b> (losing water). Sucrose = glucose + fructose (table sugar), lactose = galactose + glucose, maltose = glucose + glucose. <b>Starch</b> uses α(1→4) links (digestible); <b>cellulose</b> uses β(1→4) links (humans cannot digest)."]
  ], ["Check what type of sugar (aldose or ketose), the number of carbons, and the linkage.", "α or β describes the configuration at the anomeric carbon (C1).", "Example: lactose is made of galactose and glucose joined by a β(1→4) glycosidic bond. Use that style for yours."],
    [num("How many stereocentres does the open-chain form of D-glucose have?", 4,
        ["Ignore C1, which is the aldehyde carbon, and C6, which is CH₂OH.", "The carbons from C2 to C5 each carry four different groups.", "Example: a ketohexose like fructose has three because C2 is the carbonyl. Count yours."], "🍬"),
      num("How many aldohexose stereoisomers exist in total (2ⁿ with n stereocentres)?", 16,
        ["There are four stereocentres in an aldohexose.", "2 to the power of the number of stereocentres.", "Example: an aldopentose has three stereocentres, so 8. Now do yours."], "🍬"),
      ["Sucrose is made of...", "glucose and fructose", "two glucose units", "glucose and galactose", "two fructose units"],
      ["Lactose is made of...", "galactose and glucose", "glucose and fructose", "two glucose units", "glucose and ribose"],
      ["Which polysaccharide can humans digest?", "Starch", "Cellulose", "Chitin", "Lignin"],
      ["Starch and cellulose differ in the...", "glycosidic link (α versus β)", "number of carbons per sugar", "sugar they contain", "element at the centre"],
      ["The anomeric carbon of glucose in the ring form is...", "C1", "C2", "C5", "C6"],
      ["Fructose is a...", "ketohexose", "aldohexose", "aldopentose", "disaccharide"]]));

  // 14 lipids and nucleic acids
  const dnaQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const A = ri(15, 35); return num(`In a sample of double-stranded DNA, adenine makes up ${A} % of the bases. By Chargaff's rules, what percentage is guanine?`, 50 - A,
      ["A pairs with T, and G pairs with C, so A = T and G = C.", "A + T + G + C = 100 %, with A = T and G = C. Solve for G.", "Example: if A is 20 %, then T is 20 %, and G = C = 30 %. Now do yours."], "🧬"); }
    if (t === 1) { const x = ri(2, 8), y = ri(2, 8); return num(`A DNA segment has ${x} A–T base pairs and ${y} G–C base pairs. How many hydrogen bonds hold the two strands together? (A–T has 2, G–C has 3.)`, 2 * x + 3 * y,
      ["Multiply each pair count by its number of hydrogen bonds.", "Then add the two totals.", "Example: 3 A–T pairs and 2 G–C pairs give 6 + 6 = 12. Now do yours."], "🧬"); }
    return num("A triglyceride is made of glycerol and fatty acids. How many ester bonds link them?", 3,
      ["Glycerol has three –OH groups.", "Each –OH forms one ester bond with a fatty acid.", "Example: a monoglyceride would have one. Now count for a triglyceride."], "🧈");
  };
  c.push(les("Lipids and nucleic acids", [
    ["Lipids", "🧈", "A <b>triglyceride</b> is glycerol with three fatty acids joined by ester bonds. Saturated fatty acids have no C=C (straight chains, solid fats); unsaturated ones have cis C=C bonds (kinks, liquid oils). <b>Phospholipids</b> have a polar head and two non-polar tails, so they form bilayers."],
    ["DNA and RNA", "🧬", "A nucleotide = sugar (deoxyribose or ribose) + phosphate + base (A, G, C, T; U in RNA). Strands run 5′ → 3′ and are linked by phosphodiester bonds. In DNA, <b>A pairs with T</b> (2 H-bonds) and <b>G with C</b> (3 H-bonds)."],
    ["Chargaff's rules", "📐", "In double-stranded DNA, A = T and G = C, so A + G = 50 % of the bases. A DNA with a lot of G–C pairs is more stable (more hydrogen bonds), so melts at a higher temperature."]
  ], ["Count bonds or use base pairing: A–T and G–C.", "The percentages of all four bases add to 100.", "Example: if T is 28 %, then A is 28 % and G = C = 22 %. Use the same logic for yours."],
    [dnaQ, dnaQ, dnaQ,
      ["Which base is found in RNA but not in DNA?", "Uracil", "Thymine", "Adenine", "Guanine"],
      ["Phospholipids form bilayers because they have...", "a polar head and non-polar tails", "no polar parts", "a metal centre", "only double bonds"],
      ["A DNA strand with more G–C pairs melts at a...", "higher temperature", "lower temperature", "the same temperature", "negative temperature"],
      ["Which fatty acid has a kinked chain?", "Oleic acid (one cis C=C)", "Stearic acid (saturated)", "Methane", "Palmitic acid"]]));

  // 15 Michaelis-Menten
  const mmQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const Vm = pick([100, 200, 40]), f = pick([1, 3, 4, 9]);
      return num(`An enzyme has Vmax = ${Vm} µmol/min and Km = 2 mM. At [S] = ${2 * f} mM, what is the rate v in µmol/min? (v = Vmax[S] ÷ (Km + [S]))`, Vm * f / (1 + f),
        ["Put [S] and Km in the same units, then use v = Vmax[S] ÷ (Km + [S]).", `[S] is ${f} times Km. The fraction is f ÷ (1 + f).`, "Example: [S] = 2 Km gives v = 2/3 of Vmax. Now do yours."], "🧫");
    }
    if (t === 1) {
      const Km = pick([1, 2, 5, 10]);
      return num(`An enzyme reaches half its maximum rate at a substrate concentration of ${Km} mM. What is its Km in mM?`, Km,
        ["Km is defined at one particular rate.", "When v = Vmax/2, [S] = Km.", "Example: half-maximum rate at 7 mM means Km = 7 mM. Read yours the same way."], "🧫");
    }
    const kc = pick([10, 20, 50, 100]);
    return num(`An enzyme solution contains 1 µM of enzyme sites and has Vmax = ${kc} µM/s. What is the turnover number kcat in s⁻¹ (kcat = Vmax ÷ [E]total)?`, kc,
      ["kcat is the number of substrate molecules each enzyme converts per second at saturation.", "Divide Vmax by the total enzyme concentration, which is 1 µM here.", "Example: Vmax = 30 µM/s with 2 µM enzyme gives 15 s⁻¹. Now do yours."], "🧫");
  };
  c.push(les("Enzyme kinetics: Michaelis–Menten", [
    ["The equation", "🧫", "<b>v = Vmax [S] ÷ (Km + [S])</b>. At low [S] the rate rises almost linearly; at high [S] the enzyme saturates and v approaches Vmax."],
    ["Km and kcat", "🔑", "<b>Km</b> is the substrate concentration at which v = Vmax/2; a low Km means tight binding. <b>kcat = Vmax ÷ [E]total</b> is the turnover number (molecules per enzyme per second). Efficiency is kcat/Km."],
    ["Reading rates", "📉", "If [S] = Km, v = ½ Vmax. If [S] = 3 Km, v = ¾ Vmax. If [S] = 9 Km, v = 0.9 Vmax. You never quite reach Vmax."]
  ], ["Identify what is given: Vmax, Km, [S], or [E].", "Substitute into v = Vmax[S] ÷ (Km + [S]) or kcat = Vmax ÷ [E].", "Example: Vmax = 80, [S] = Km gives v = 40. Use the same steps for yours."],
    [mmQ, mmQ, mmQ, mmQ,
      ["A low Km means the enzyme...", "binds its substrate tightly", "binds its substrate weakly", "works only at high pH", "has no active site"],
      ["At very high substrate concentration the rate approaches...", "Vmax", "Km", "zero", "kcat only"],
      ["The turnover number kcat has units of...", "s⁻¹", "mol/L", "J/mol", "mg"]]));

  // 16 inhibition and Lineweaver-Burk
  const lbQ = () => {
    if (ri(0, 1) === 0) {
      const Vm = pick([20, 25, 50, 100]);
      return num(`A Lineweaver–Burk plot (1/v against 1/[S]) has a y-intercept of ${1 / Vm}. What is Vmax? (y-intercept = 1/Vmax)`, Vm,
        ["The y-intercept is where 1/[S] = 0, the saturation limit.", "Vmax is the reciprocal of the y-intercept.", "Example: a y-intercept of 0.5 gives Vmax = 2. Now do yours."], "📈");
    }
    const [xi, Km] = pick([[0.5, 2], [0.25, 4], [0.2, 5], [0.1, 10]]);
    return num(`A Lineweaver–Burk plot crosses the x-axis at −${xi} mM⁻¹. What is Km in mM? (x-intercept = −1/Km)`, Km,
      ["The x-intercept equals minus the reciprocal of Km.", "Ignore the minus sign and take the reciprocal.", "Example: an x-intercept of −0.2 gives Km = 5 mM. Now do yours."], "📈");
  };
  c.push(les("Inhibition and Lineweaver–Burk plots", [
    ["Double reciprocal plot", "📈", "Invert the Michaelis–Menten equation: <b>1/v = (Km/Vmax)(1/[S]) + 1/Vmax</b>. Plotting 1/v against 1/[S] gives a straight line: slope = Km/Vmax, <b>y-intercept = 1/Vmax</b>, <b>x-intercept = −1/Km</b>."],
    ["Competitive inhibitors", "🥊", "Compete with substrate for the active site. Vmax is unchanged (overcome at high [S]), but the apparent <b>Km increases</b>. On the plot the lines meet on the y-axis."],
    ["Non-competitive inhibitors", "🔒", "Bind elsewhere and reduce the amount of active enzyme. <b>Vmax decreases</b>, Km is unchanged. The lines meet on the x-axis. (Uncompetitive inhibition lowers both Vmax and Km, giving parallel lines.)"]
  ], ["Which intercept gives Vmax and which gives Km?", "Take reciprocals of the intercepts and ignore the minus sign for Km.", "Example: y-intercept 0.1 gives Vmax = 10. Use it for yours."],
    [lbQ, lbQ, lbQ,
      ["A competitive inhibitor changes the apparent...", "Km (increases it)", "Vmax (decreases it)", "Vmax (increases it)", "neither Km nor Vmax"],
      ["A non-competitive inhibitor changes the...", "Vmax (decreases it)", "Km (increases it)", "Km (decreases it)", "substrate"],
      ["A competitive inhibitor can be overcome by...", "adding more substrate", "adding more inhibitor", "cooling the mixture", "removing the enzyme"],
      ["In a Lineweaver–Burk plot, lines for a competitive inhibitor intersect on the...", "y-axis", "x-axis", "origin only", "never intersect"]]));

  // 17 bioenergetics
  const beQ = () => {
    if (ri(0, 1) === 0) {
      const x = pick([10.5, 13.5, 16.5, 20.5, 25.5]);
      return num(`A reaction has ΔG°′ = +${x} kJ/mol. It is coupled to ATP hydrolysis (ΔG°′ = −30.5 kJ/mol). How much free energy does the coupled reaction release, in kJ/mol? (Give the positive number.)`, 30.5 - x,
        ["Add the two ΔG°′ values together.", "A coupled reaction is favourable if the sum is negative; the amount released is the size of that sum.", "Example: +14.5 coupled with −30.5 gives −16.0, so 16 kJ/mol is released. Now do yours."], "🔋");
    }
    const [n, E] = pick([[2, 0.2], [2, 0.5], [1, 0.4], [2, 0.1], [1, 0.2]]);
    return num(`A redox reaction transfers ${n} electron${n > 1 ? "s" : ""} with ΔE°′ = ${E} V. The free energy released is ΔG°′ = −nFΔE°′. Using F = 96.5 kJ/(V·mol), how many kJ/mol are released?`, Math.round(n * 96.5 * E * 10) / 10,
      ["Multiply the number of electrons, F and the voltage.", "Use kJ because F is given in kJ/(V·mol). Report the size of the energy.", "Example: n = 2 and ΔE = 0.1 V gives 2 × 96.5 × 0.1 = 19.3 kJ/mol. Now do yours."], "🔋");
  };
  c.push(les("Bioenergetics: ATP and coupled reactions", [
    ["Free energy in the cell", "🔋", "<b>ΔG = ΔG°′ + RT ln Q</b> decides direction in real cells; ΔG°′ is the standard value at pH 7. A reaction with negative ΔG is spontaneous (exergonic)."],
    ["Coupling", "🔗", "ATP + H₂O → ADP + Pᵢ has ΔG°′ ≈ <b>−30.5 kJ/mol</b>. Cells couple it to unfavourable steps: glucose + Pᵢ (ΔG°′ = +13.8) coupled with ATP hydrolysis gives glucose-6-phosphate with net ΔG°′ ≈ −16.7 kJ/mol."],
    ["Redox energy", "⚡", "For electron transfer, <b>ΔG°′ = −nFΔE°′</b>. NADH (E°′ = −0.32 V) passing electrons to O₂ (+0.82 V) releases a large amount of energy, used to pump protons and make ATP."]
  ], ["Add the ΔG°′ values for coupled reactions, or use −nFΔE°′ for redox.", "Check units: F = 96.5 kJ/(V·mol) gives kJ.", "Example: coupling +10 with −30.5 releases 20.5 kJ/mol. Use the same steps for yours."],
    [beQ, beQ, beQ,
      ["Coupling an unfavourable reaction to ATP hydrolysis works because...", "the overall ΔG becomes negative", "ATP is a catalyst only", "ATP raises the temperature", "ATP removes the enzyme"],
      ["A reaction with a negative ΔG is...", "spontaneous (exergonic)", "non-spontaneous", "at equilibrium", "impossible"],
      ["Standard biochemical conditions (ΔG°′) use pH...", "7", "0", "14", "1"]]));

  // 18 HH biochemistry
  const hhQ = () => {
    const p = pick([6.0, 6.1, 7.2, 4.8, 9.2]);
    if (ri(0, 1) === 0) {
      const d = pick([-2, -1, 0, 1, 2]), ratio = d === 0 ? 1 : 10 ** d;
      return num(`A buffer has pKa ${p}. The ratio [A⁻] ÷ [HA] is ${ratio}. What is the pH? (pH = pKa + log of the ratio)`, Math.round((p + d) * 10) / 10,
        ["The log of the ratio is a whole number here.", "log 10 = 1, log 1 = 0, log 0.1 = −1, and so on.", "Example: pKa 5.0 with ratio 100 gives pH 7.0. Now do yours."], "🧪");
    }
    const d = pick([-2, -1, 0, 1, 2]), ratio = d === 0 ? 1 : 10 ** d;
    return num(`A buffer has pKa ${p} and pH ${Math.round((p + d) * 10) / 10}. What is the ratio [A⁻] ÷ [HA]?`, ratio,
      ["Subtract the pKa from the pH. That equals the log of the ratio.", "Raise 10 to the power of that difference.", "Example: pH 6 with pKa 5 gives a ratio of 10. Now do yours."], "🧪");
  };
  c.push(les("Buffers in biochemistry", [
    ["Henderson–Hasselbalch", "🧪", "<b>pH = pKa + log([A⁻] ÷ [HA])</b>. When pH = pKa the two forms are equal. Each unit above pKa multiplies the ratio by 10."],
    ["Biological buffers", "🩸", "Blood is held near pH 7.4 mainly by the <b>bicarbonate</b> system (CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻, pKa ≈ 6.1). Inside cells, <b>phosphate</b> (pKa₂ ≈ 7.2) and proteins buffer. Histidine's side chain (pKa ≈ 6) acts as a buffer in many enzymes."],
    ["Working range", "📏", "A buffer works best within ±1 pH unit of its pKa, where both forms are present in useful amounts. For blood, [HCO₃⁻] ÷ [CO₂] is about 20 to 1 at pH 7.4 (log 20 ≈ 1.3)."]
  ], ["Compare the pH with the pKa: the difference is the log of the ratio.", "Use powers of ten for whole-number differences.", "Example: pH 7.2 with pKa 7.2 gives a ratio of 1. Use it for yours."],
    [hhQ, hhQ, hhQ, hhQ,
      ["Blood pH of 7.4 is maintained mainly by the...", "bicarbonate buffer", "acetate buffer", "citrate buffer in the lungs", "sodium chloride"],
      ["A buffer works best when pH is...", "within 1 unit of the pKa", "far above the pKa", "far below the pKa", "exactly 14"],
      ["When pH equals the pKa of a buffer, [A⁻] compared with [HA] is...", "equal", "ten times larger", "ten times smaller", "zero"]]));

  c.push(mix("Mixed practice", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  c.push(mix("Level 30 Challenge", at(c, [0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17])));

  Object.assign(CHEM_LEVELS, { 28: a, 29: b, 30: c });
})();
