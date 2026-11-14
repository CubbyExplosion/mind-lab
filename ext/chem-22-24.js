// ext/chem-22-24.js  Mind Lab Chemistry levels 22-24 (grade 10 second half, grade 11 both halves): advanced high-school / AP-style chemistry
// equilibrium and Ksp, acids/bases/titrations/buffers, thermodynamics, kinetics and mechanisms, electrochemistry, organic basics, nuclear chemistry, lab analysis
(() => {
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
  const mcq = (text, right, wrongs, hints, visual) => ({ text: U(text), choices: shuf([right, ...wrongs].map(U)), answer: U(right), hints: hints.map(U), visual });
  const others = (arr, not, n) => shuf(arr.filter(x => x !== not)).slice(0, n);
  const uniq = arr => arr.filter((x, i) => arr.indexOf(x) === i);
  const sup = s => `<sup>${s}</sup>`;
  const tsup = n => String(n).replace(/-/g, "⁻").replace(/\d/g, d => SUPM[+d]);
  const sci = (m, e) => `${m}×10${tsup(-e)}`;
  const r1 = x => Math.round(x * 10) / 10;
  const r2 = x => Math.round(x * 100) / 100;
  const hasNeg = x => x < 0;
  // a number-checked pick: try a generator until a condition is true
  const until = (gen, ok) => { let v; for (let i = 0; i < 400; i++) { v = gen(); if (ok(v)) return v; } return v; };
  const sgn = (x, unit) => (x < 0 ? "-" : "+") + Math.abs(x) + " " + unit;

  const f3 = x => String(Math.round(x * 1000) / 1000);
  const chargeSup = c => `<sup>${c}</sup>`;

  // ================= LEVEL 22 =================
  const a = [];

  const KX = [
    ["N₂(g) + 3H₂(g) ⇌ 2NH₃(g)", "[NH₃]² / ([N₂][H₂]³)", "[NH₃] / ([N₂][H₂])", "([N₂][H₂]³) / [NH₃]²", "[NH₃]² / ([N₂][H₂]²)"],
    ["2SO₂(g) + O₂(g) ⇌ 2SO₃(g)", "[SO₃]² / ([SO₂]²[O₂])", "[SO₃] / ([SO₂][O₂])", "([SO₂]²[O₂]) / [SO₃]²", "[SO₃]² / ([SO₂][O₂])"],
    ["H₂(g) + I₂(g) ⇌ 2HI(g)", "[HI]² / ([H₂][I₂])", "[HI] / ([H₂][I₂])", "([H₂][I₂]) / [HI]²", "2[HI] / ([H₂][I₂])"],
    ["N₂O₄(g) ⇌ 2NO₂(g)", "[NO₂]² / [N₂O₄]", "[NO₂] / [N₂O₄]", "[N₂O₄] / [NO₂]²", "2[NO₂] / [N₂O₄]"],
    ["PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)", "[PCl₃][Cl₂] / [PCl₅]", "[PCl₅] / ([PCl₃][Cl₂])", "[PCl₃][Cl₂] / [PCl₅]²", "[PCl₃][Cl₂]² / [PCl₅]"],
    ["CO(g) + 2H₂(g) ⇌ CH₃OH(g)", "[CH₃OH] / ([CO][H₂]²)", "[CH₃OH] / ([CO][H₂])", "([CO][H₂]²) / [CH₃OH]", "[CH₃OH]² / ([CO][H₂])"],
    ["4NH₃(g) + 5O₂(g) ⇌ 4NO(g) + 6H₂O(g)", "[NO]⁴[H₂O]⁶ / ([NH₃]⁴[O₂]⁵)", "[NO][H₂O] / ([NH₃][O₂])", "([NH₃]⁴[O₂]⁵) / ([NO]⁴[H₂O]⁶)", "[NO]⁴[H₂O]⁶ / ([NH₃]⁵[O₂]⁴)"],
    ["CaCO₃(s) ⇌ CaO(s) + CO₂(g)", "[CO₂]", "[CaO][CO₂] / [CaCO₃]", "[CaO] / [CaCO₃]", "1 / [CO₂]"],
    ["C(s) + CO₂(g) ⇌ 2CO(g)", "[CO]² / [CO₂]", "[CO]² / ([C][CO₂])", "[CO] / [CO₂]", "[CO₂] / [CO]²"],
    ["Zn(s) + Cu²⁺(aq) ⇌ Zn²⁺(aq) + Cu(s)", "[Zn²⁺] / [Cu²⁺]", "[Zn²⁺][Cu] / ([Zn][Cu²⁺])", "[Cu²⁺] / [Zn²⁺]", "[Zn²⁺][Cu²⁺] / ([Zn][Cu])"],
    ["Fe³⁺(aq) + SCN⁻(aq) ⇌ FeSCN²⁺(aq)", "[FeSCN²⁺] / ([Fe³⁺][SCN⁻])", "([Fe³⁺][SCN⁻]) / [FeSCN²⁺]", "[FeSCN²⁺] / [Fe³⁺]", "[Fe³⁺][SCN⁻]"]
  ];
  a.push(les("Writing Kc expressions", [
    ["Products over reactants", "⚖️", "For aA + bB ⇌ cC + dD the equilibrium constant is <b>Kc = [C]<sup>c</sup>[D]<sup>d</sup> / ([A]<sup>a</sup>[B]<sup>b</sup>)</b>. Square brackets mean concentration in mol/dm³. Products go on <b>top</b>."],
    ["Coefficients become powers", "🔢", "For N₂ + 3H₂ ⇌ 2NH₃ the coefficient 3 becomes the power on [H₂] and the 2 becomes the power on [NH₃]: <b>Kc = [NH₃]² / ([N₂][H₂]³)</b>."],
    ["Leave out solids", "🧱", "Pure <b>solids and liquids</b> have a constant 'concentration', so they are left out of K. For CaCO₃(s) ⇌ CaO(s) + CO₂(g) only the gas stays: <b>Kc = [CO₂]</b>."]
  ], ["Products go on top and reactants on the bottom. Which species must be left out altogether?", "Every coefficient becomes an exponent, and pure solids and liquids do not appear in the expression.", "Example: 2NO₂(g) ⇌ N₂O₄(g) gives Kc = [N₂O₄] / [NO₂]². Now write yours the same way."],
    KX.map(([rx, r, w1, w2, w3]) => [`Which is the correct Kc expression for:<br><b>${rx}</b>`, r, w1, w2, w3])));

  const kcQ = () => {
    const t = ri(0, 3), ex = ["Example: 2NO₂ ⇌ N₂O₄ with [NO₂] = 0.5 and [N₂O₄] = 1.0 gives Kc = 1.0 / 0.5² = 4. Now do yours."];
    if (t === 0) { const A = pick([0.1, 0.2, 0.5]), B = pick([0.1, 0.2, 0.5]), k = ri(2, 20), C = Math.round(k * A * B * 1000) / 1000;
      return num(`A(g) + B(g) ⇌ C(g). At equilibrium [A] = ${A}, [B] = ${B} and [C] = ${C} mol/dm³. What is Kc?`, k, ["Write the Kc expression first: products over reactants.", "Put the three concentrations into Kc = [C] / ([A][B]) and divide.", "Example: X + Y ⇌ Z with [X] = 0.2, [Y] = 0.5, [Z] = 0.6 gives Kc = 0.6 / (0.2 × 0.5) = 6. Now do yours."], "⚖️"); }
    if (t === 1) { const A = pick([0.1, 0.2, 0.5]), k = ri(2, 10), B = Math.round(k * A * A * 1000) / 1000;
      return num(`2A(g) ⇌ B(g). At equilibrium [A] = ${A} and [B] = ${B} mol/dm³. What is Kc?`, k, ["The coefficient 2 in front of A matters.", "Kc = [B] / [A]². Square the concentration of A before dividing.", ex[0]], "⚖️"); }
    if (t === 2) { const a1 = pick([0.1, 0.2, 0.05]), n = ri(2, 6);
      return num(`H₂(g) + I₂(g) ⇌ 2HI(g). At equilibrium [H₂] = [I₂] = ${a1} and [HI] = ${f3(n * a1)} mol/dm³. What is Kc?`, n * n, ["The product HI has coefficient 2, so it is squared on the top.", "Kc = [HI]² / ([H₂][I₂]). Square the HI concentration, multiply the two reactants, then divide.", "Example: [H₂] = [I₂] = 0.1 and [HI] = 0.7 gives Kc = 0.49 / 0.01 = 49. Now do yours."], "⚖️"); }
    const v = until(() => [pick([0.1, 0.2, 0.5]), pick([0.1, 0.2, 0.5]), pick([0.01, 0.02, 0.05, 0.1])], ([b, c, d]) => { const k = b * c / d; return Math.abs(k - Math.round(k)) < 1e-9 && k >= 1 && k <= 40; });
    return num(`A(g) ⇌ B(g) + C(g). At equilibrium [A] = ${v[2]}, [B] = ${v[0]} and [C] = ${v[1]} mol/dm³. What is Kc?`, Math.round(v[0] * v[1] / v[2]), ["Two products multiply on the top; one reactant is on the bottom.", "Kc = [B][C] / [A]. Multiply first, then divide.", ex[0]], "⚖️");
  };
  a.push(les("Calculating Kc from concentrations", [
    ["Substitute and calculate", "🧮", "Write the Kc expression, then <b>substitute the equilibrium concentrations</b>. Equilibrium values only, not starting values."],
    ["Worked example", "📝", "H₂ + I₂ ⇌ 2HI with [H₂] = 0.1, [I₂] = 0.1, [HI] = 0.4: Kc = 0.4² / (0.1 × 0.1) = 0.16 / 0.01 = <b>16</b>."],
    ["Size of K", "📏", "Large K (much more than 1): mostly products at equilibrium. Small K (much less than 1): mostly reactants. K has no units in most school problems."]
  ], ["Think about what a very big or very small K tells you about the equilibrium mixture.", "For calculations, put the equilibrium concentrations in and respect the exponents.", "Example: 2NO₂ ⇌ N₂O₄ with [NO₂] = 0.5 and [N₂O₄] = 1.0 gives Kc = 1.0 / 0.5² = 4. Now do yours."],
    [kcQ, kcQ, kcQ, kcQ, kcQ, kcQ,
      ["K is very large (much more than 1). At equilibrium there are mostly...", "products", "reactants", "equal amounts of both"],
      ["K is very small (much less than 1). At equilibrium there are mostly...", "reactants", "products", "equal amounts of both"]]));

  const qQ = () => {
    const t = ri(0, 2), K = pick([1, 2, 4, 5, 10]);
    const ratio = pick([0.1, 0.25, 0.5, 1, 2, 3, 4, 5, 8, 10, 20].filter(x => x !== K));
    const q = ri(0, 7) === 0 ? K : ratio, ans = q === K ? "It is already at equilibrium" : q < K ? "It shifts right (towards products)" : "It shifts left (towards reactants)";
    const wr = ["It shifts right (towards products)", "It shifts left (towards reactants)", "It is already at equilibrium"].filter(x => x !== ans);
    const h = ["Calculate Q from the concentrations right now, using the same expression as K.", "Compare Q with K: if Q is smaller than K there are too few products; if Q is bigger there are too many.", "Example: K = 4 and Q = 9. Q is bigger than K, so the mixture has too many products and it shifts left. Now do yours."];
    if (t === 0) { const A = pick([0.1, 0.2, 0.5]); return mcq(`A ⇌ B has Kc = ${K}. The mixture contains [A] = ${A} and [B] = ${f3(q * A)} mol/dm³. Which way does the reaction go?`, ans, wr, h, "🧭"); }
    if (t === 1) { const A = pick([0.1, 0.2, 0.5]); return mcq(`2A ⇌ B has Kc = ${K}. The mixture contains [A] = ${A} and [B] = ${f3(q * A * A)} mol/dm³. Which way does the reaction go?`, ans, wr, ["Q uses the same expression as K, so square [A].", h[1], h[2]], "🧭"); }
    const A = pick([0.1, 0.2, 0.5]), B = pick([0.1, 0.2, 0.5]); return mcq(`A + B ⇌ C has Kc = ${K}. The mixture contains [A] = ${A}, [B] = ${B} and [C] = ${f3(q * A * B)} mol/dm³. Which way does the reaction go?`, ans, wr, ["Q = [C] / ([A][B]) with the concentrations right now.", h[1], h[2]], "🧭");
  };
  a.push(les("Reaction quotient Q versus K", [
    ["What is Q?", "🧭", "The <b>reaction quotient Q</b> has the same form as K but uses the concentrations <b>at any moment</b>, not just at equilibrium."],
    ["Compare Q and K", "⚖️", "<b>Q &lt; K</b>: too few products, so the reaction goes <b>forward</b> (right). <b>Q &gt; K</b>: too many products, so it goes <b>backward</b> (left). <b>Q = K</b>: at equilibrium."],
    ["Worked example", "📝", "A ⇌ B with K = 4, [A] = 0.5, [B] = 1.0: Q = 1.0 / 0.5 = 2. Since 2 &lt; 4 the reaction shifts right until Q rises to 4."]
  ], ["Find Q first, then compare it with the K you are given.", "Smaller Q than K means the system still needs more products; larger means it needs fewer.", "Example: K = 4 and Q = 9. Q is bigger than K, so the mixture has too many products and it shifts left. Now do yours."],
    [qQ, qQ, qQ, qQ, qQ, qQ,
      ["If Q is less than K, the reaction...", "makes more products", "makes more reactants", "stops completely"],
      ["When Q equals K, the system is...", "at equilibrium", "far from equilibrium", "unable to react"]]));

  const iceQ = () => {
    const t = ri(0, 4);
    if (t === 0) { const s = ri(3, 8), x = ri(1, s - 1);
      return num(`In a 1.0 dm³ vessel, H₂(g) + I₂(g) ⇌ 2HI(g) starts with ${s} mol H₂ and ${s} mol I₂ and no HI. At equilibrium there are ${2 * x} mol HI. How many mol of H₂ remain?`, s - x, ["Each 2 mol of HI formed uses up 1 mol of H₂.", "H₂ left = start − amount reacted, where the amount reacted is half the HI formed.", "Example: start 6 mol each; 4 mol HI formed means 2 mol H₂ reacted, so 4 left. Now do yours with your numbers."], "🧊"); }
    if (t === 1) { const x = ri(1, 4);
      return num(`N₂(g) + 3H₂(g) ⇌ 2NH₃(g). At equilibrium ${x} mol of N₂ have reacted. How many mol of NH₃ were formed?`, 2 * x, ["Use the mole ratio from the balanced equation.", "Compare the coefficient of NH₃ with the coefficient of N₂ in the equation.", "Example: in 2SO₂ + O₂ ⇌ 2SO₃, if 3 mol O₂ react then 6 mol SO₃ form. Now do yours."], "🧊"); }
    if (t === 2) { const x = ri(1, 4), extra = ri(1, 4);
      return num(`N₂(g) + 3H₂(g) ⇌ 2NH₃(g) starts with ${3 * x + extra} mol of H₂. At equilibrium ${x} mol of N₂ have reacted. How many mol of H₂ remain?`, extra, ["Each mol of N₂ that reacts uses 3 mol of H₂.", "H₂ left = start − 3 × (mol N₂ that reacted).", "Example: start with 10 mol H₂; 2 mol N₂ reacted uses 6 mol H₂, leaving 4. Now do yours."], "🧊"); }
    if (t === 3) { const v = until(() => { const s = ri(3, 8), x = ri(1, s - 1); return [s, x]; }, ([s, x]) => (2 * x) % (s - x) === 0), [s, x] = v;
      return num(`In a 1.0 dm³ vessel H₂ + I₂ ⇌ 2HI starts with ${s} mol each of H₂ and I₂. At equilibrium ${x} mol of each have reacted. Find Kc.`, Math.pow(2 * x / (s - x), 2), ["Build the ICE table: equilibrium H₂ = I₂ = start − x and HI = 2x.", "Kc = [HI]² / ([H₂][I₂]). Use the equilibrium amounts (1.0 dm³, so mol = mol/dm³).", "Example: start 4 each, 2 reacted: H₂ = I₂ = 2, HI = 4, Kc = 16 / (2 × 2) = 4. Now do yours."], "🧊"); }
    const s = ri(3, 8), y = ri(1, Math.floor((s - 1) / 2));
    return num(`In a 1.0 dm³ vessel, 2A(g) ⇌ B(g) starts with ${s} mol of A and no B. At equilibrium ${y} mol of B have formed. How many mol of A remain?`, s - 2 * y, ["Each mol of B formed uses up 2 mol of A.", "A left = start − 2 × (mol B formed).", "Example: start 9 mol A; 3 mol B formed uses 6 mol A, leaving 3. Now do yours."], "🧊");
  };
  a.push(les("ICE tables: Initial, Change, Equilibrium", [
    ["The ICE table", "🧊", "An <b>ICE table</b> has three rows: <b>I</b>nitial amounts, <b>C</b>hange, and <b>E</b>quilibrium (I + C). The change row follows the coefficients."],
    ["Using the ratio", "📝", "N₂ + 3H₂ ⇌ 2NH₃. If x mol of N₂ react: N₂ changes by −x, H₂ by −3x, NH₃ by +2x. Reactants go down, products go up."],
    ["Then find K", "🧮", "Add each Change to its Initial value to get the <b>equilibrium</b> amounts, then put those into the K expression."]
  ], ["Use the coefficients in the balanced equation as a ratio.", "Reactants decrease by their coefficient times x; products increase by theirs.", "Example: A + B ⇌ 2C starts with 6 mol each; if 1 mol of each reacts, C = 2 mol and A = B = 5 mol. Now do yours."],
    [iceQ, iceQ, iceQ, iceQ, iceQ, iceQ, iceQ, iceQ]));

  const kmQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const K = pick([0.5, 0.25, 0.2, 0.1, 0.125, 0.05, 0.04]);
      return num(`At a given temperature A ⇌ B has K = ${K}. What is K for the reverse reaction B ⇌ A?`, Math.round(1 / K), ["Reversing a reaction swaps products and reactants in the expression.", "The new K is 1 divided by the old K.", "Example: forward K = 0.01 means reverse K = 1 / 0.01 = 100. Now do yours."], "🔄"); }
    if (t === 1) { const K = pick([2, 3, 4, 5, 6]);
      return num(`A ⇌ B has K = ${K}. What is K for 2A ⇌ 2B?`, K * K, ["Doubling all the coefficients doubles every exponent in the expression.", "Multiplying the equation by n raises K to the power n.", "Example: if K = 7 for A ⇌ B then K = 49 for 2A ⇌ 2B. Use a different K for yours."], "✖️"); }
    if (t === 2) { const K = pick([2, 3, 4, 5, 6, 7, 10]);
      return num(`2A ⇌ 2B has K = ${K * K}. What is K for A ⇌ B?`, K, ["Halving the coefficients halves every exponent.", "Halving the equation means taking the square root of K.", "Example: K = 64 for 2X ⇌ 2Y means K = 8 for X ⇌ Y. Now do yours."], "✂️"); }
    const k1 = ri(2, 9), k2 = ri(2, 9);
    return num(`Step 1: A ⇌ B has K = ${k1}. Step 2: B ⇌ C has K = ${k2}. What is K for the overall reaction A ⇌ C?`, k1 * k2, ["When you add reactions, B cancels out.", "Add the equations and multiply their K values.", "Example: K = 2 and K = 5 for two steps gives 2 × 5 = 10 overall. Now do yours."], "➕");
  };
  a.push(les("Changing the equation: reverse, multiply, add", [
    ["Reverse it", "🔄", "Reverse a reaction and the new K is <b>1/K</b>. If forward K = 0.25, reverse K = 4."],
    ["Multiply it", "✖️", "Multiply all coefficients by n and the new K is <b>K<sup>n</sup></b>. Double the equation: K². Halve it: √K."],
    ["Add reactions", "➕", "When two reactions add together to give a new one, the new K is the <b>product</b> of the two K values: K = K₁ × K₂."]
  ], ["Decide whether the equation was reversed, multiplied, halved or added.", "Reverse: 1/K. Multiply by n: K to the power n. Add reactions: multiply the Ks.", "Example: forward K = 0.1 gives reverse K = 10. Now apply the right rule to yours."],
    [kmQ, kmQ, kmQ, kmQ, kmQ, kmQ, kmQ]));

  const SALTS = [["AgCl", "Ag", "+", 1, "Cl", "−", 1], ["BaSO₄", "Ba", "2+", 1, "SO₄", "2−", 1], ["PbI₂", "Pb", "2+", 1, "I", "−", 2], ["Ca(OH)₂", "Ca", "2+", 1, "OH", "−", 2], ["Mg(OH)₂", "Mg", "2+", 1, "OH", "−", 2],
    ["Ag₂CrO₄", "Ag", "+", 2, "CrO₄", "2−", 1], ["Ag₂S", "Ag", "+", 2, "S", "2−", 1], ["Al(OH)₃", "Al", "3+", 1, "OH", "−", 3], ["CaF₂", "Ca", "2+", 1, "F", "−", 2], ["Ca₃(PO₄)₂", "Ca", "2+", 3, "PO₄", "3−", 2],
    ["Fe(OH)₃", "Fe", "3+", 1, "OH", "−", 3], ["Ag₂CO₃", "Ag", "+", 2, "CO₃", "2−", 1], ["PbCl₂", "Pb", "2+", 1, "Cl", "−", 2], ["Zn(OH)₂", "Zn", "2+", 1, "OH", "−", 2]];
  const kspQ = () => {
    const [salt, c, cc, m, an, ac, n] = pick(SALTS), P = (m2, n2) => `[${c}${chargeSup(cc)}]${m2 > 1 ? sup(m2) : ""}[${an}${chargeSup(ac)}]${n2 > 1 ? sup(n2) : ""}`;
    const right = P(m, n), cand = uniq([m !== n ? P(n, m) : "", (m > 1 || n > 1) ? P(1, 1) : "", right + ` / [${salt}]`, `${m + 1}[${c}${chargeSup(cc)}] × ${n + 1}[${an}${chargeSup(ac)}]`, `[${salt}] / (${right})`].filter(x => x));
    return mcq(`Which is the correct Ksp expression for <b>${salt}</b>?`, right, shuf(cand).slice(0, 3), ["Write the dissolving equation first: the solid breaks into its ions.", "Put each ion in square brackets, raise it to the power of its coefficient, multiply them, and leave the solid out.", "Example: MgF₂(s) ⇌ Mg²⁺ + 2F⁻ gives Ksp = [Mg²⁺][F⁻]². Now do yours."], "🧂");
  };
  a.push(les("Ksp: solubility product expressions", [
    ["Sparingly soluble salts", "🧂", "A little of a 'insoluble' salt does dissolve. The balance <b>solid ⇌ ions</b> has its own constant, the <b>solubility product Ksp</b>."],
    ["Writing Ksp", "✍️", "AgCl(s) ⇌ Ag⁺ + Cl⁻ gives <b>Ksp = [Ag⁺][Cl⁻]</b>. PbI₂(s) ⇌ Pb²⁺ + 2I⁻ gives <b>Ksp = [Pb²⁺][I⁻]²</b>. The solid is left out."],
    ["Small Ksp", "🔬", "A very small Ksp means very few ions in solution, so the salt is only slightly soluble. Ksp changes with temperature only."]
  ], ["Write the dissolving equation, then ask what goes on the top.", "Ions only, each raised to the power of its coefficient; no solid and no denominator.", "Example: MgF₂(s) ⇌ Mg²⁺ + 2F⁻ gives Ksp = [Mg²⁺][F⁻]². Now do yours."],
    [kspQ, kspQ, kspQ, kspQ, kspQ, kspQ,
      ["Why is the solid left out of the Ksp expression?", "Its concentration is a constant", "Solids always dissolve completely", "Solids have no charge"],
      ["A very small Ksp means the salt is...", "only slightly soluble", "very soluble", "a gas"]]));

  const solQ = () => {
    const t = ri(0, 3), e = ri(3, 7), aa = e, ids = [sci(1, aa)];
    const ex2 = "Example: for AB with s = 1×10⁻² the Ksp is s × s = (1×10⁻²)² = 1×10⁻⁴. Now do yours.";
    if (t === 0) return mcq(`The salt AB (one A⁺ and one B⁻ per formula) has molar solubility s = ${sci(1, e)} mol/dm³. What is its Ksp?`, sci(1, 2 * e), uniq([sci(1, e), sci(2, 2 * e), sci(4, 2 * e)]), ["For AB, s mol/dm³ dissolve and give s of each ion.", "Ksp = [A⁺][B⁻] = s × s = s².", ex2], "🧂");
    if (t === 1) return mcq(`The salt AB (one A⁺ and one B⁻ per formula) has Ksp = ${sci(1, 2 * e)}. What is its molar solubility in mol/dm³?`, sci(1, e), uniq([sci(1, 2 * e), sci(2, e), sci(1, e + 1)]), ["Ksp = s × s for this kind of salt, so solubility is s.", "Take the square root of Ksp (halve the exponent).", "Example: Ksp = 1×10⁻⁸ for AB gives s = 1×10⁻⁴. Now do yours."], "🧂");
    if (t === 2) return mcq(`The salt AB₂ (e.g. PbI₂) has molar solubility s = ${sci(1, e)} mol/dm³. What is its Ksp?`, sci(4, 3 * e), uniq([sci(1, 3 * e), sci(4, 2 * e), sci(2, 3 * e)]), ["Each formula unit gives one A²⁺ and two B⁻ ions, so [B⁻] = 2s.", "Ksp = [A²⁺][B⁻]² = s × (2s)² = 4s³.", "Example: for AB₂ with s = 1×10⁻², Ksp = 4 × (1×10⁻²)³ = 4×10⁻⁶. Now do yours."], "🧂");
    return mcq(`The salt AB₂ (e.g. PbI₂) has Ksp = ${sci(4, 3 * e)}. What is its molar solubility in mol/dm³?`, sci(1, e), uniq([sci(4, e), sci(2, e), sci(1, 3 * e)]), ["For AB₂, Ksp = 4s³.", "Divide Ksp by 4, then take the cube root (divide the exponent by 3).", "Example: Ksp = 4×10⁻⁹ for AB₂ gives s³ = 1×10⁻⁹ so s = 1×10⁻³. Now do yours."], "🧂");
  };
  a.push(les("Molar solubility from Ksp", [
    ["Solubility, s", "🧪", "<b>Molar solubility s</b> is how many mol of the salt dissolve in 1 dm³. Each mol dissolved releases ions in the ratio of the formula."],
    ["AB salts", "1️⃣", "For AgCl: [Ag⁺] = [Cl⁻] = s, so <b>Ksp = s²</b>. If Ksp = 1×10⁻¹⁰ then s = 1×10⁻⁵ mol/dm³."],
    ["AB₂ salts", "2️⃣", "For PbI₂: [Pb²⁺] = s and [I⁻] = 2s, so <b>Ksp = s(2s)² = 4s³</b>. Be careful: the 2 is cubed too."]
  ], ["Say how many of each ion one formula unit makes, in terms of s.", "Write Ksp using s and solve: s² for AB, 4s³ for AB₂.", "Example: for AB with s = 1×10⁻³, Ksp = 1×10⁻⁶. Now do yours."],
    [solQ, solQ, solQ, solQ, solQ, solQ,
      ["AgCl has Ksp = 1×10⁻¹⁰ and AgI has Ksp = 1×10⁻¹⁶ (same AB type). Which is more soluble in water?", "AgCl", "AgI", "They are equally soluble"],
      ["For an AB salt, the solubility s is found from Ksp by taking...", "the square root", "the cube root", "the reciprocal"]]));

  const prQ = () => {
    const k = ri(6, 12), x = ri(2, 6), y = ri(2, 6), qe = x + y, same = ri(0, 7) === 0;
    const k2 = same ? qe : k;
    const ans = qe === k2 ? "No more dissolves: it is exactly saturated" : qe < k2 ? "Yes, a precipitate forms" : "No, it stays dissolved";
    const all = ["Yes, a precipitate forms", "No, it stays dissolved", "No more dissolves: it is exactly saturated"];
    return mcq(`The salt AX (1:1) has Ksp = ${sci(1, k2)}. Two solutions are mixed so that [A⁺] = ${sci(1, x)} and [X⁻] = ${sci(1, y)} mol/dm³. Does AX precipitate?`, ans, all.filter(z => z !== ans), ["Work out the ion product Q = [A⁺][X⁻] by adding the exponents when you multiply powers of ten.", "A precipitate forms only if Q is bigger than Ksp. A smaller negative exponent means a bigger number.", "Example: Ksp = 1×10⁻⁸ and Q = 1×10⁻⁶. Q is bigger, so a precipitate forms. Now do yours."], "🌧️");
  };
  a.push(les("Will a precipitate form?", [
    ["Ion product Q", "🌧️", "Mix two solutions and calculate the <b>ion product Q</b> using Ksp's expression with the new concentrations."],
    ["Compare Q with Ksp", "⚖️", "<b>Q &gt; Ksp</b>: a precipitate forms. <b>Q = Ksp</b>: saturated. <b>Q &lt; Ksp</b>: everything stays dissolved."],
    ["Powers of ten", "🔟", "Multiply by <b>adding exponents</b>: 10⁻³ × 10⁻⁴ = 10⁻⁷. Remember 10⁻⁷ is smaller than 10⁻⁶."]
  ], ["Multiply the two ion concentrations to get Q.", "Compare Q with Ksp: bigger Q means precipitate.", "Example: Ksp = 1×10⁻⁸ and Q = 1×10⁻⁶. Q is bigger, so a precipitate forms. Now do yours."],
    [prQ, prQ, prQ, prQ, prQ, prQ,
      ["When Q is greater than Ksp, the solution is...", "supersaturated and will precipitate", "unsaturated", "perfectly neutral"],
      ["When Q is less than Ksp, ...", "no precipitate forms", "a precipitate forms", "the temperature rises"]]));

  const ciQ = () => {
    const k = ri(8, 12), c = ri(1, 3);
    return mcq(`AgCl has Ksp = ${sci(1, k)}. What is its molar solubility (mol/dm³) in a solution that already contains ${sci(1, c)} mol/dm³ Cl⁻ from NaCl? (Use s = Ksp / [Cl⁻].)`, sci(1, k - c), uniq([sci(1, k), sci(1, k + c), sci(1, c)]).filter(z => z !== sci(1, k - c)).slice(0, 3), ["The Cl⁻ from NaCl is already there, so [Cl⁻] is almost just the NaCl value.", "s = [Ag⁺] = Ksp / [Cl⁻]. Subtract exponents when dividing powers of ten.", "Example: Ksp = 1×10⁻¹⁰ and [Cl⁻] = 1×10⁻¹: s = 1×10⁻¹⁰ / 1×10⁻¹ = 1×10⁻⁹. Now do yours."], "🧂");
  };
  a.push(les("The common-ion effect", [
    ["Same ion again", "👯", "If a solution already contains one of the salt's ions, the salt dissolves <b>less</b>. This is the <b>common-ion effect</b>."],
    ["Why?", "⚖️", "Adding Cl⁻ to AgCl(s) ⇌ Ag⁺ + Cl⁻ pushes the equilibrium left (Le Chatelier), so more solid forms and less stays dissolved."],
    ["Calculating", "🧮", "In 0.1 mol/dm³ NaCl, [Cl⁻] ≈ 0.1, so s = [Ag⁺] = Ksp / 0.1. That is far smaller than in pure water. Other ions without a common ion barely matter."]
  ], ["Ask: does the added substance share an ion with the salt?", "A shared ion pushes the dissolving equilibrium back towards the solid.", "Example: adding Na₂SO₄ to saturated BaSO₄ adds SO₄²⁻, so less BaSO₄ stays dissolved. Now do yours."],
    [ciQ, ciQ, ciQ,
      ["Solid AgCl is in a saturated solution. Adding some NaCl makes the amount of dissolved AgCl...", "decrease", "increase", "stay exactly the same"],
      ["Adding Na₂SO₄ to a saturated solution of BaSO₄ makes the solubility of BaSO₄...", "decrease", "increase", "become infinite"],
      ["Which solution dissolves the LEAST CaF₂?", "0.1 mol/dm³ NaF", "0.1 mol/dm³ NaCl", "pure water"],
      ["Adding KNO₃ to a saturated solution of AgCl changes its solubility...", "hardly at all, since there is no common ion", "a lot, since K⁺ is common", "to zero"],
      ["Mg(OH)₂ dissolves better in acid because H⁺ ions...", "remove OH⁻ ions", "add more OH⁻ ions", "add Mg²⁺ ions"],
      ["Why does the common ion lower solubility?", "The equilibrium shifts towards the solid", "The salt reacts with the added ion to make a gas", "The temperature drops"]]));

  const wpQ = () => {
    const v = until(() => [ri(3, 9), ri(1, 3)], ([aa, c]) => (aa + c) % 2 === 0), [aa, c] = v, ph = (aa + c) / 2, C = c === 1 ? "0.1" : c === 2 ? "0.01" : "0.001";
    return num(`A weak acid HA has Ka = ${sci(1, aa)} and concentration ${C} mol/dm³. Using [H⁺] = √(Ka × C), what is the pH?`, ph, ["Multiply Ka by the concentration, written as a power of ten.", "Take the square root by halving the exponent, then pH = −log[H⁺] is the size of that exponent.", "Example: Ka = 1×10⁻⁶ and C = 0.01 give Ka × C = 1×10⁻⁸, [H⁺] = 1×10⁻⁴, pH = 4. Now do yours."], "🍋");
  };
  a.push(les("pH of a weak acid", [
    ["Weak acids ionise a little", "🍋", "HA ⇌ H⁺ + A⁻ with <b>Ka = [H⁺][A⁻] / [HA]</b>. A small Ka means only a few molecules ionise."],
    ["The shortcut", "✂️", "Since [H⁺] = [A⁻] and [HA] ≈ the starting concentration C: <b>Ka ≈ [H⁺]² / C</b>, so <b>[H⁺] = √(Ka × C)</b>."],
    ["Worked example", "📝", "Ka = 1×10⁻⁵, C = 0.1. Ka × C = 1×10⁻⁶, so [H⁺] = 1×10⁻³ and <b>pH = 3</b>. A strong acid of the same concentration would have pH 1."]
  ], ["Combine Ka and the starting concentration under a square root.", "Write Ka × C as a power of ten, halve the exponent, then read off the pH.", "Example: Ka = 1×10⁻⁶ and C = 0.01 gives pH 4. Now do yours."],
    [wpQ, wpQ, wpQ, wpQ, wpQ, wpQ,
      ["A weak acid has a larger Ka than another weak acid. It is...", "the stronger acid", "the weaker acid", "a base"],
      ["0.1 mol/dm³ of a weak acid has a pH compared with 0.1 mol/dm³ of a strong acid that is...", "higher", "lower", "exactly the same"]]));

  const pkQ = () => {
    const t = ri(0, 4), aa = ri(3, 9);
    if (t === 0) return num(`An acid has Ka = ${sci(1, aa)}. What is its pKa?`, aa, ["pKa = −log Ka.", "The pKa is simply the size of the negative exponent.", "Example: Ka = 1×10⁻⁴ gives pKa = 4. Now do yours."], "🔟");
    if (t === 1) return mcq(`An acid has pKa = ${aa}. What is its Ka?`, sci(1, aa), uniq([sci(1, aa + 1), sci(aa, 1), sci(1, 14 - aa)]).filter(z => z !== sci(1, aa)).slice(0, 3), ["Ka = 10 to the power of −pKa.", "A larger pKa means a smaller Ka and a weaker acid.", "Example: pKa = 6 gives Ka = 1×10⁻⁶. Now do yours."], "🔟");
    if (t === 2) return num(`A weak acid HA has pKa = ${aa}. What is the pKb of its conjugate base A⁻ at 25 °C?`, 14 - aa, ["For a conjugate pair, Ka × Kb = Kw = 1×10⁻¹⁴.", "Taking −log: pKa + pKb = 14.", "Example: pKa = 5 gives pKb = 14 − 5 = 9. Now do yours."], "🔗");
    if (t === 3) return mcq(`A weak acid has pKa = ${aa}. What is Kb for its conjugate base?`, sci(1, 14 - aa), uniq([sci(1, aa), sci(1, 14 + aa), sci(1, 7), sci(1, 12)]).filter(z => z !== sci(1, 14 - aa)).slice(0, 3), ["Ka × Kb = 1×10⁻¹⁴ for a conjugate pair.", "Add the exponents of Ka and Kb: they must total 14.", "Example: Ka = 1×10⁻⁴ gives Kb = 1×10⁻¹⁰. Now do yours."], "🔗");
    const p = shuf([3, 4, 5, 6, 7, 8]).slice(0, 2), ans = p[0] < p[1] ? "Acid A" : "Acid B";
    return mcq(`Acid A has pKa = ${p[0]} and acid B has pKa = ${p[1]}. Which is the stronger acid?`, ans, ["Acid A", "Acid B", "They are equally strong"].filter(z => z !== ans), ["A smaller pKa means a larger Ka.", "Larger Ka means the acid ionises more, so it is stronger.", "Example: pKa 2 beats pKa 6 because 10⁻² is bigger than 10⁻⁶. Now compare yours."], "🥊");
  };
  a.push(les("Ka, pKa and pKb", [
    ["The p scale", "🔟", "<b>pKa = −log Ka</b>. For Ka = 1×10⁻⁵, pKa = 5. <b>Smaller pKa = stronger acid.</b>"],
    ["Conjugate pairs", "🔗", "For an acid and its conjugate base at 25 °C: <b>Ka × Kb = Kw = 1×10⁻¹⁴</b>, so <b>pKa + pKb = 14</b>."],
    ["Worked example", "📝", "Ethanoic acid has pKa ≈ 4.8. Its conjugate base ethanoate has pKb ≈ 14 − 4.8 = 9.2: a weak base, as expected."]
  ], ["Use the negative-exponent trick: pK is the size of the exponent.", "Conjugate pairs: Ka × Kb = 1×10⁻¹⁴, so pKa + pKb = 14.", "Example: Ka = 1×10⁻⁴ gives pKa = 4 and the conjugate base has pKb = 10. Now do yours."],
    [pkQ, pkQ, pkQ, pkQ, pkQ, pkQ,
      ["Which acid is the strongest?", "pKa = 2", "pKa = 5", "pKa = 9"],
      ["A strong acid's conjugate base is...", "a very weak base", "a very strong base", "always neutral"]]));

  const sbQ = () => {
    const t = ri(0, 4), c = ri(1, 4);
    if (t === 0) return num(`What is the pH of ${sci(1, c)} mol/dm³ NaOH? (NaOH is a strong base; pH + pOH = 14.)`, 14 - c, ["NaOH gives one OH⁻ per formula, so [OH⁻] equals the concentration.", "pOH is the size of the exponent; then pH = 14 − pOH.", "Example: [OH⁻] = 1×10⁻⁵ gives pOH 5 and pH 9. Now do yours."], "🧴");
    if (t === 1) return num(`What is the pH of ${sci(5, c + 1)} mol/dm³ Ba(OH)₂? (Fully ionised; each formula gives 2 OH⁻.)`, 14 - c, ["Count the hydroxide ions: Ba(OH)₂ gives two per formula.", "[OH⁻] = 2 × concentration. Then pOH = −log[OH⁻] and pH = 14 − pOH.", "Example: 5×10⁻⁴ mol/dm³ Ba(OH)₂ gives [OH⁻] = 1×10⁻³, pOH 3, pH 11. Now do yours."], "🧴");
    if (t === 2) { const p = ri(1, 3), k = ri(1, 3);
      return num(`A strong acid has pH ${p}. It is diluted ${Math.pow(10, k)} times with water. What is the new pH?`, p + k, ["Diluting 10 times lowers [H⁺] by a factor of 10.", "Each 10-fold dilution of a strong acid raises the pH by 1.", "Example: pH 2 diluted 100 times gives pH 4. Now do yours."], "💧"); }
    if (t === 3) { const p = ri(11, 13), k = ri(1, 3);
      return num(`A strong base solution has pH ${p}. It is diluted ${Math.pow(10, k)} times with water. What is the new pH?`, p - k, ["Diluting lowers [OH⁻] by a factor of 10 for each 10-fold step.", "Each 10-fold dilution of a strong base lowers the pH by 1.", "Example: pH 13 diluted 100 times gives pH 11. Now do yours."], "💧"); }
    return num(`What is the pH of ${sci(5, c + 1)} mol/dm³ H₂SO₄? (Treat it as fully ionised, giving 2 H⁺ per formula.)`, c, ["Each H₂SO₄ gives two H⁺ ions.", "[H⁺] = 2 × concentration, then pH = −log[H⁺].", "Example: 5×10⁻⁴ mol/dm³ H₂SO₄ gives [H⁺] = 1×10⁻³ and pH 3. Now do yours."], "🧪");
  };
  a.push(les("Strong bases and dilution", [
    ["pOH", "🧴", "For bases, find <b>pOH = −log[OH⁻]</b> and then <b>pH = 14 − pOH</b> (at 25 °C)."],
    ["Count the ions", "🔢", "Ba(OH)₂ and Ca(OH)₂ give <b>2 OH⁻</b> per formula, so [OH⁻] is twice the concentration. H₂SO₄ gives about 2 H⁺ in the same way."],
    ["Dilution", "💧", "Diluting a strong acid 10 times raises pH by 1. Diluting a strong base 10 times lowers pH by 1. (Neither can pass pH 7 by dilution alone.)"]
  ], ["Find the ion concentration first, counting how many OH⁻ or H⁺ each formula gives.", "Acid: pH = −log[H⁺]. Base: pOH = −log[OH⁻], then pH = 14 − pOH.", "Example: 0.001 mol/dm³ NaOH has pOH 3 so pH 11. Now do yours."],
    [sbQ, sbQ, sbQ, sbQ, sbQ, sbQ, sbQ]));

  const tit1 = () => {
    const t = ri(0, 2), f2 = m => (m / 1000).toFixed(m % 10 ? 3 : 2);
    if (t === 0) { const v = until(() => [pick([50, 100, 200]), pick([50, 100, 200, 250, 400]), pick([10, 20, 25, 30, 40, 50])], ([ca, cb, va]) => ca !== cb && (ca * va) % cb === 0 && ca * va / cb >= 5 && ca * va / cb <= 100), [ca, cb, va] = v;
      return num(`${va} cm³ of HCl of concentration ${f2(ca)} mol/dm³ is neutralised exactly by NaOH of concentration ${f2(cb)} mol/dm³. What volume of NaOH is needed (in cm³)?`, ca * va / cb, ["HCl + NaOH → NaCl + H₂O is 1 : 1, so the moles are equal.", "C₁V₁ = C₂V₂ for a 1 : 1 reaction. Solve for the missing volume.", "Example: 20 cm³ of 0.1 mol/dm³ acid needs 10 cm³ of 0.2 mol/dm³ base, since 0.1 × 20 = 0.2 × 10. Now do yours."], "🧪"); }
    if (t === 1) { const v = until(() => [pick([50, 100, 200, 250]), pick([10, 20, 25, 40, 50]), pick([10, 20, 25, 40, 50])], ([cb, vb, va]) => va !== vb && (cb * vb) % va === 0), [cb, vb, va] = v;
      return num(`${vb} cm³ of NaOH of concentration ${f2(cb)} mol/dm³ neutralises ${va} cm³ of HCl of unknown concentration. What is the HCl concentration in mmol/dm³? (1 mol/dm³ = 1000 mmol/dm³)`, cb * vb / va, ["Moles of NaOH = concentration × volume, and HCl reacts 1 : 1.", "Then c(HCl) = c(NaOH) × V(NaOH) / V(HCl), keeping the answer in mmol/dm³.", "Example: 20 cm³ of 100 mmol/dm³ base neutralises 40 cm³ of acid, which is 50 mmol/dm³. Now do yours."], "🧪"); }
    const v = until(() => [pick([100, 200, 50, 250]), pick([10, 20, 30, 40, 50])], ([c, vv]) => (c * vv) % 1000 === 0), [c, vv] = v;
    return num(`${vv} cm³ of ${f2(c)} mol/dm³ NaOH is added in a titration. How many mmol of NaOH is this? (mmol = mol/dm³ × cm³)`, c * vv / 1000, ["Moles = concentration × volume (in dm³). Using cm³ and mol/dm³ gives millimoles.", "Multiply the concentration by the volume in cm³.", "Example: 0.5 mol/dm³ × 6 cm³ = 3 mmol. Now do yours."], "🧪");
  };
  a.push(les("Titration calculations (1 : 1)", [
    ["Titration", "🧪", "In a <b>titration</b> a solution of known concentration (in the burette) is added until it exactly neutralises a measured volume of the unknown. That point is the <b>end-point</b>."],
    ["The recipe", "📝", "1) n = c × V for the known solution. 2) Use the equation's mole ratio. 3) Find the unknown. For a 1 : 1 reaction: <b>c₁V₁ = c₂V₂</b>."],
    ["Worked example", "🧮", "25 cm³ of 0.10 mol/dm³ HCl needs 20 cm³ of NaOH. n(HCl) = 0.10 × 25 = 2.5 mmol = n(NaOH). So c(NaOH) = 2.5 / 20 = 0.125 mol/dm³."]
  ], ["Moles of the known solution first, then link with the equation.", "For a 1 : 1 reaction the moles are equal: c × V on one side equals c × V on the other.", "Example: 20 cm³ of 0.1 mol/dm³ acid needs 10 cm³ of 0.2 mol/dm³ base. Now do yours."],
    [tit1, tit1, tit1, tit1, tit1, tit1]));

  const tit2 = () => {
    const t = ri(0, 4), f2 = m => (m / 1000).toFixed(m % 10 ? 3 : 2);
    if (t === 0) { const v = until(() => [pick([50, 100, 200]), pick([100, 200, 250, 400]), pick([10, 20, 25, 30, 40, 50])], ([ca, cb, va]) => (2 * ca * va) % cb === 0 && 2 * ca * va / cb >= 5 && 2 * ca * va / cb <= 100), [ca, cb, va] = v;
      return num(`${va} cm³ of H₂SO₄ of concentration ${f2(ca)} mol/dm³ is neutralised by NaOH of concentration ${f2(cb)} mol/dm³ (H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O). What volume of NaOH is needed (cm³)?`, 2 * ca * va / cb, ["First find the moles of acid, then use the 1 : 2 ratio.", "n(NaOH) = 2 × n(H₂SO₄); volume of NaOH = n(NaOH) / concentration.", "Example: 10 cm³ of 0.1 mol/dm³ H₂SO₄ is 1 mmol and needs 2 mmol NaOH, which is 10 cm³ of 0.2 mol/dm³. Now do yours."], "⚗️"); }
    if (t === 1) { const v = until(() => [pick([50, 100, 200]), pick([10, 20, 25, 40, 50]), pick([100, 200, 250, 400])], ([cb, vb, ca]) => (2 * cb * vb) % ca === 0 && 2 * cb * vb / ca >= 5 && 2 * cb * vb / ca <= 100), [cb, vb, ca] = v;
      return num(`${vb} cm³ of Ca(OH)₂ of concentration ${f2(cb)} mol/dm³ is neutralised by HCl of concentration ${f2(ca)} mol/dm³ (Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O). What volume of HCl is needed (cm³)?`, 2 * cb * vb / ca, ["Moles of Ca(OH)₂ first. The equation shows HCl is needed in a 2 : 1 ratio.", "n(HCl) = 2 × n(Ca(OH)₂); volume of HCl = n(HCl) / concentration.", "Example: 10 cm³ of 0.1 mol/dm³ Ca(OH)₂ is 1 mmol and needs 2 mmol HCl, which is 20 cm³ of 0.1 mol/dm³. Now do yours."], "⚗️"); }
    if (t === 2) { const n = ri(1, 8), m = pick([[2, "H₂SO₄"], [3, "H₃PO₄"], [2, "H₂CO₃"]]);
      return num(`${n} mmol of ${m[1]} is completely neutralised by NaOH. How many mmol of NaOH are needed?`, n * m[0], ["Count how many H⁺ ions one molecule of the acid can give.", "mmol NaOH = number of H⁺ per molecule × mmol of acid.", "Example: 4 mmol of H₂SO₄ needs 2 × 4 = 8 mmol NaOH. Now do yours."], "⚗️"); }
    if (t === 3) { const v = until(() => [pick([100, 200, 250, 400]), pick([10, 20, 30, 40, 50]), pick([10, 20, 25, 50])], ([cb, vb, va]) => (cb * vb) % (2 * va) === 0), [cb, vb, va] = v;
      return num(`${vb} cm³ of NaOH of concentration ${f2(cb)} mol/dm³ neutralises ${va} cm³ of H₂SO₄ of unknown concentration. What is the H₂SO₄ concentration in mmol/dm³?`, cb * vb / (2 * va), ["Find the moles of NaOH, then halve it for the acid (H₂SO₄ + 2NaOH).", "c(acid) = n(NaOH) / 2 divided by the acid's volume.", "Example: 20 cm³ of 100 mmol/dm³ NaOH gives 2 mmol, so 1 mmol of H₂SO₄; in 10 cm³ that is 100 mmol/dm³. Now do yours."], "⚗️"); }
    const n = ri(1, 6);
    return num(`${2 * n} mmol of NaOH neutralises how many mmol of H₂SO₄?`, n, ["H₂SO₄ gives two H⁺ per molecule.", "mmol of acid = mmol of NaOH ÷ 2.", "Example: 10 mmol NaOH neutralises 5 mmol of H₂SO₄. Use a different number for yours."], "⚗️");
  };
  a.push(les("Titrations with 1 : 2 ratios", [
    ["Not always 1 : 1", "⚗️", "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. One molecule of H₂SO₄ needs <b>two</b> NaOH. Always read the ratio from the balanced equation."],
    ["Method", "📝", "Work out moles of the known solution, multiply or divide by the ratio, then divide by the volume (or concentration) of the other solution."],
    ["Worked example", "🧮", "20 cm³ of 0.10 mol/dm³ H₂SO₄ = 2 mmol, needs 4 mmol NaOH. With 0.20 mol/dm³ NaOH that is 4 / 0.20 = <b>20 cm³</b>."]
  ], ["Moles of the known solution first, then the ratio.", "Use the balanced equation: for every 1 acid, how many base?", "Example: 10 cm³ of 0.1 mol/dm³ H₂SO₄ is 1 mmol and needs 2 mmol NaOH, which is 10 cm³ of 0.2 mol/dm³. Now do yours."],
    [tit2, tit2, tit2, tit2, tit2, tit2]));

  a.push(les("Titration curves and indicators", [
    ["The curve", "📈", "A <b>titration curve</b> plots pH against volume added. Near the <b>equivalence point</b> the pH jumps steeply. The curve for a strong acid + strong base is centred on pH 7."],
    ["Weak acid or base", "🍋", "Weak acid + strong base: equivalence pH is <b>above 7</b>. Strong acid + weak base: equivalence pH is <b>below 7</b>. At the <b>half-equivalence point</b> of a weak acid, pH = pKa."],
    ["Choosing an indicator", "🌈", "The indicator must change colour inside the steep part. <b>Methyl orange</b> (about pH 3 to 4.4) suits strong acid + weak base. <b>Phenolphthalein</b> (about pH 8 to 10) suits weak acid + strong base. Either suits strong + strong."]
  ], ["Think about which ions are left in solution at the equivalence point.", "Salts of a strong acid with a strong base are neutral; a weak parent makes the salt acidic or basic.", "Example: ethanoic acid titrated with NaOH leaves ethanoate, a weak base, so the equivalence pH is above 7. Now do yours."], [
    ["At the equivalence point of a strong acid + strong base titration, the pH is about...", "7", "3", "11"],
    ["At the equivalence point of a weak acid + strong base titration, the pH is...", "above 7", "below 7", "exactly 7"],
    ["At the equivalence point of a strong acid + weak base titration, the pH is...", "below 7", "above 7", "exactly 7"],
    ["Which indicator suits ethanoic acid titrated with NaOH?", "Phenolphthalein", "Methyl orange", "Universal paper only"],
    ["Which indicator suits HCl titrated with ammonia solution?", "Methyl orange", "Phenolphthalein", "Neither works"],
    ["At the half-equivalence point of a weak acid titration, pH equals...", "pKa", "7", "pKw"],
    ["The equivalence point is where...", "moles of acid and base match the equation exactly", "the indicator is added", "the burette is empty"],
    ["The end-point is...", "where the indicator changes colour", "where the acid is made", "the start of the titration"],
    ["A good indicator for a titration changes colour...", "within the steep part of the curve", "at the very start", "only at pH 14"]
  ]));

  const bufQ = () => {
    const t = ri(0, 3), pk = pick([3.8, 4.8, 6.4, 7.2, 9.3]);
    if (t <= 1) { const lr = pick([-2, -1, 0, 1, 2]), ratio = lr === -2 ? "0.01" : lr === -1 ? "0.1" : lr === 0 ? "1" : lr === 1 ? "10" : "100", ph = Math.round((pk + lr) * 10) / 10;
      const ch = uniq([-2, -1, 0, 1, 2].map(d => String(Math.round((pk + d) * 10) / 10)));
      return mcq(`A buffer is made from a weak acid with pKa = ${pk}. The ratio [A⁻] / [HA] is ${ratio}. What is the pH? (pH = pKa + log([A⁻]/[HA]))`, String(ph), others(ch, String(ph), 3), ["Use the Henderson-Hasselbalch equation: pH = pKa + log([A⁻]/[HA]).", "log of 1 is 0, of 10 is 1, of 100 is 2, of 0.1 is −1, of 0.01 is −2. Add that to pKa.", "Example: pKa = 5.0 and ratio 100 gives pH = 5.0 + 2 = 7.0. Now do yours."], "🧫"); }
    if (t === 2) { const d = pick([-1, 1]), ph = Math.round((pk + d) * 10) / 10, ans = d === 1 ? "10" : "0.1";
      return mcq(`A buffer with pKa = ${pk} has pH ${ph}. What is the ratio [A⁻] / [HA]?`, ans, ["10", "0.1", "1", "100"].filter(z => z !== ans).slice(0, 3), ["Subtract pKa from pH to get the log of the ratio.", "A pH above pKa means more A⁻ than HA; below means more HA.", "Example: a buffer with pH 6.5 and pKa 5.5 has log(ratio) = 1, so the ratio is 10. Now work out yours."], "🧫"); }
    return mcq(`A buffer has equal concentrations of weak acid and its conjugate base. Its pH equals...`, "pKa", ["pKa + 1", "7", "14 − pKa"], ["Equal concentrations make the ratio 1.", "log 1 = 0, so the log term vanishes.", "Example: with a ratio of 10 the pH is pKa + 1; with equal amounts the extra term is zero. Now finish yours."], "🧫");
  };
  a.push(les("Buffers and Henderson-Hasselbalch", [
    ["What is a buffer?", "🛡️", "A <b>buffer</b> resists changes in pH. It contains a weak acid HA and its conjugate base A⁻ (for example ethanoic acid and sodium ethanoate)."],
    ["How it works", "⚙️", "Add H⁺: A⁻ mops it up (A⁻ + H⁺ → HA). Add OH⁻: HA neutralises it (HA + OH⁻ → A⁻ + H₂O). The ratio changes only a little, so the pH hardly moves."],
    ["The equation", "🧮", "<b>pH = pKa + log([A⁻] / [HA])</b>. Equal amounts: pH = pKa. Ten times more A⁻: pH = pKa + 1. Ten times less: pKa − 1."]
  ], ["Use pH = pKa + log of the ratio of base to acid.", "log 1 = 0, log 10 = 1, log 100 = 2; log 0.1 = −1.", "Example: pKa = 5.0 and ratio 100 gives pH = 5.0 + 2 = 7.0. Now do yours."],
    [bufQ, bufQ, bufQ, bufQ, bufQ, bufQ,
      ["Which pair would make a good buffer?", "ethanoic acid and sodium ethanoate", "HCl and NaCl", "NaOH and NaCl"],
      ["A buffer works best when [A⁻] and [HA] are...", "similar to each other", "very different", "both zero"],
      ["Adding a little acid to a buffer, the pH changes...", "only slightly", "a lot", "to exactly 7"]]));

  const SALTH = [["NaCl", "HCl", "NaOH", "neutral"], ["KNO₃", "HNO₃", "KOH", "neutral"], ["KBr", "HBr", "KOH", "neutral"], ["NH₄Cl", "HCl", "NH₃", "acidic"], ["NH₄NO₃", "HNO₃", "NH₃", "acidic"],
    ["CH₃COONa", "CH₃COOH", "NaOH", "basic"], ["Na₂CO₃", "H₂CO₃", "NaOH", "basic"], ["NaF", "HF", "NaOH", "basic"], ["Na₃PO₄", "H₃PO₄", "NaOH", "basic"], ["AlCl₃", "HCl", "Al(OH)₃", "acidic"], ["KCN", "HCN", "KOH", "basic"], ["Na₂SO₄", "H₂SO₄", "NaOH", "neutral"]];
  a.push(les("Salt hydrolysis: acidic, basic or neutral salts", [
    ["Salts and pH", "🧂", "A salt's ions can react with water. Ions from a <b>weak</b> acid or base change the pH of the solution."],
    ["The rule", "📏", "Strong acid + strong base: <b>neutral</b>. Strong acid + weak base: <b>acidic</b> (the cation, e.g. NH₄⁺, donates H⁺). Weak acid + strong base: <b>basic</b> (the anion, e.g. CH₃COO⁻, accepts H⁺)."],
    ["Worked example", "📝", "NH₄Cl comes from HCl (strong) and NH₃ (weak). NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺, so the solution is <b>acidic</b>."]
  ], ["Ask which acid and which base made the salt, and whether each is strong or weak.", "The weak parent decides: its conjugate ion reacts with water. Two strong parents give a salt that does not.", "Example: sodium ethanoate comes from a weak acid and a strong base, so its solution is basic. Now do yours."],
    SALTH.map(([s, ac, bs, r]) => () => mcq(`Is a solution of <b>${s}</b> (made from ${ac} and ${bs}) acidic, basic or neutral?`, r, ["acidic", "basic", "neutral"].filter(z => z !== r), ["Think about which parent acid and base are strong and which are weak.", "A weak parent leaves behind a conjugate ion that reacts with water; two strong parents do not.", "Example: sodium ethanoate (weak acid, strong base) is basic. Now do yours."], "🧂"))));

  a.push(les("Acid-base theories and amphoteric substances", [
    ["Brønsted-Lowry", "🤝", "An acid is a <b>proton (H⁺) donor</b>; a base is a <b>proton acceptor</b>. Water can do both, so it is <b>amphiprotic</b>."],
    ["Lewis theory", "🧲", "A <b>Lewis acid</b> accepts an electron pair (BF₃, Al³⁺, H⁺). A <b>Lewis base</b> donates an electron pair (NH₃, OH⁻, H₂O). This covers reactions with no H⁺ at all."],
    ["Polyprotic acids", "🪜", "H₃PO₄ loses its protons <b>one at a time</b>: H₃PO₄ → H₂PO₄⁻ → HPO₄²⁻ → PO₄³⁻. Each step is weaker: Ka1 &gt; Ka2 &gt; Ka3."]
  ], ["Decide whether the species gives away or takes in H⁺ (Brønsted) or an electron pair (Lewis).", "Amphoteric or amphiprotic means it can act as both an acid and a base.", "Example: HCO₃⁻ can donate H⁺ to become CO₃²⁻ or accept H⁺ to become H₂CO₃, so it is amphiprotic. Now do yours."], [
    ["In the Brønsted-Lowry theory, a base is a...", "proton acceptor", "proton donor", "electron-pair donor only"],
    ["Which is a Lewis acid?", "BF₃", "NH₃", "OH⁻"],
    ["Which is a Lewis base?", "NH₃", "BF₃", "Al³⁺"],
    ["Which species is amphiprotic?", "HCO₃⁻", "Cl⁻", "NH₄⁺"],
    ["Which species is amphiprotic?", "H₂O", "NO₃⁻", "Na⁺"],
    ["How many protons can H₃PO₄ donate in total?", "3", "1", "2"],
    ["For a polyprotic acid, which dissociation is the strongest?", "The first (Ka1)", "The last", "They are all equal"],
    ["In NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, water acts as a...", "Brønsted acid", "Brønsted base", "catalyst only"],
    ["Which oxide is amphoteric (reacts with acids and bases)?", "Al₂O₃", "Na₂O", "SO₃"]
  ]));

  a.push(mix("Mixed practice", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])));
  a.push(mix("Level 22 Challenge", at(a, [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16, 17])));

  // ================= LEVEL 23 =================
  const b = [];

  const calQ = () => {
    const t = ri(0, 2), m = pick([50, 100, 150, 200, 250]), dT = ri(2, 20), q = Math.round(m * 4.2 * dT);
    if (t === 0) return num(`${m} g of water is heated and its temperature rises by ${dT} °C. How much heat q (in J) did it absorb? (c = 4.2 J/g/°C)`, q, ["Use q = m × c × ΔT.", "Multiply the mass, the specific heat capacity (4.2) and the temperature change.", "Example: 20 g of water warmed by 5 °C absorbs 20 × 4.2 × 5 = 420 J. Now do yours."], "🌡️");
    if (t === 1) return num(`A sample of water absorbs ${q} J of heat and its temperature rises. If its mass is ${m} g, by how many °C does it rise? (c = 4.2 J/g/°C)`, dT, ["Rearrange q = m × c × ΔT to find ΔT.", "ΔT = q divided by (m × c). Work out m × c first.", "Example: 100 g of water absorbing 840 J: ΔT = 840 / (100 × 4.2) = 2 °C. Now do yours."], "🌡️");
    return num(`Water absorbs ${q} J of heat and warms by ${dT} °C. What is the mass of the water in g? (c = 4.2 J/g/°C)`, m, ["Rearrange q = m × c × ΔT to find the mass.", "m = q divided by (c × ΔT). Work out c × ΔT first.", "Example: 840 J warms some water by 4 °C, so m = 840 / (4.2 × 4) = 50 g. Now do yours with your numbers."], "🌡️");
  };
  b.push(les("Calorimetry: q = mcΔT", [
    ["Measuring heat", "🌡️", "A <b>calorimeter</b> measures heat by the temperature change of water. The heat absorbed by the water is <b>q = m × c × ΔT</b>."],
    ["Symbols", "🔤", "<b>m</b> = mass of water (g); <b>c</b> = specific heat capacity (4.2 J/g/°C for water); <b>ΔT</b> = final minus initial temperature (°C)."],
    ["Worked example", "📝", "100 g of water warms by 10 °C: q = 100 × 4.2 × 10 = <b>4200 J</b> = 4.2 kJ. A burning fuel gave out that much heat."]
  ], ["Which three quantities multiply to give the heat?", "q = m × c × ΔT, with c = 4.2 J/g/°C. Rearrange if you need m or ΔT.", "Example: 20 g of water warmed by 5 °C absorbs 20 × 4.2 × 5 = 420 J. Now do yours."],
    [calQ, calQ, calQ, calQ, calQ, calQ, calQ]));

  const molHQ = () => {
    const v = until(() => [pick([50, 100, 200]), ri(3, 20), pick([0.01, 0.02, 0.025, 0.05, 0.1, 0.2])], ([m, dT, n]) => { const x = m * 4.2 * dT / 1000 / n; return Math.abs(x - Math.round(x)) < 1e-6 && x <= 500; });
    let [m, dT, n] = v; if (Math.abs(m * 4.2 * dT / 1000 / n - Math.round(m * 4.2 * dT / 1000 / n)) > 1e-6) { m = 200; dT = 5; n = 0.1; }
    const x = Math.round(m * 4.2 * dT / 1000 / n);
    return num(`Burning ${n} mol of a fuel heats ${m} g of water by ${dT} °C (c = 4.2 J/g/°C). How many kJ per mole were released?`, x, ["First find the heat q in joules, then convert to kJ.", "Divide the heat in kJ by the number of moles to get kJ per mole.", "Example: 0.5 mol warms 100 g of water by 5 °C: q = 2100 J = 2.1 kJ, per mole = 2.1 / 0.5 = 4.2 kJ/mol. Now do yours."], "🔥");
  };
  b.push(les("Enthalpy change per mole from a calorimeter", [
    ["From heat to ΔH", "🔥", "The heat the water gains equals the heat the reaction gave out (if we ignore losses). Divide by the moles that reacted to get kJ <b>per mole</b>."],
    ["Three steps", "📝", "1) q = m × c × ΔT (in J). 2) Divide by 1000 to get kJ. 3) Divide by moles: <b>ΔH = −q / n</b>. The minus sign means exothermic."],
    ["Worked example", "🧮", "0.02 mol of fuel heats 100 g water by 10 °C. q = 100 × 4.2 × 10 = 4200 J = 4.2 kJ. ΔH = −4.2 / 0.02 = <b>−210 kJ/mol</b>."]
  ], ["Find q in joules first.", "Convert to kJ, then divide by the moles of fuel. (Give the size of the answer.)", "Example: 0.5 mol warms 100 g of water by 5 °C: q = 2100 J = 2.1 kJ, per mole = 4.2 kJ/mol. Now do yours."],
    [molHQ, molHQ, molHQ, molHQ, molHQ, molHQ,
      ["When a reaction warms the surroundings, ΔH is...", "negative", "positive", "zero"]]));

  const BE = [
    ["H₂ + Cl₂ → 2HCl", "H–H 436, Cl–Cl 242, H–Cl 431", 678, 862, "H–H and Cl–Cl broken; two H–Cl formed"],
    ["H₂ + Br₂ → 2HBr", "H–H 436, Br–Br 193, H–Br 366", 629, 732, "H–H and Br–Br broken; two H–Br formed"],
    ["H₂ + F₂ → 2HF", "H–H 436, F–F 158, H–F 568", 594, 1136, "H–H and F–F broken; two H–F formed"],
    ["N₂ + 3H₂ → 2NH₃", "N≡N 945, H–H 436, N–H 391", 2253, 2346, "one N≡N and three H–H broken; six N–H formed"],
    ["2H₂ + O₂ → 2H₂O", "H–H 436, O=O 498, O–H 464", 1370, 1856, "two H–H and one O=O broken; four O–H formed"]
  ];
  const beQ = () => {
    const [eq, tb, br, fo, why] = pick(BE), t = ri(0, 2);
    const h3 = "Example: if breaking bonds costs 300 kJ and making bonds releases 500 kJ, the net is 500 − 300 = 200 kJ released. Now do yours.";
    if (t === 0) return num(`Bond energies (kJ/mol): ${tb}. For ${eq}, how much energy (kJ) is needed to break all the bonds in the reactants? (${why}.)`, br, ["Breaking bonds takes in energy. Count every bond in the reactants.", "Multiply each bond energy by how many of that bond there are, then add.", "Example: breaking 1 X–X bond (200) and 2 Y–Y bonds (100 each) takes 400 kJ. Now do yours."], "🔨");
    if (t === 1) return num(`Bond energies (kJ/mol): ${tb}. For ${eq}, how much energy (kJ) is released when the product bonds form? (${why}.)`, fo, ["Making bonds gives out energy. Count every bond in the products.", "Multiply each bond energy by the number of such bonds in the products, then add.", "Example: forming 2 Z–Z bonds (300 each) releases 600 kJ. Now do yours."], "🧱");
    return num(`Bond energies (kJ/mol): ${tb}. ${eq} is exothermic. How many kJ more energy is released making the product bonds than is used breaking the reactant bonds?`, fo - br, ["Work out the energy to break bonds and the energy released making bonds.", "Subtract: energy released − energy absorbed.", h3], "⚖️");
  };
  b.push(les("Bond enthalpies", [
    ["Breaking and making", "🔨", "<b>Breaking</b> bonds takes in energy (endothermic). <b>Making</b> bonds gives out energy (exothermic)."],
    ["The formula", "🧮", "<b>ΔH = (energy to break bonds) − (energy released making bonds)</b>. If more is released than absorbed, ΔH is negative (exothermic)."],
    ["Worked example", "📝", "H₂ + Cl₂ → 2HCl: break 436 + 242 = 678 kJ; make 2 × 431 = 862 kJ. ΔH = 678 − 862 = <b>−184 kJ</b>."]
  ], ["Decide which bonds are broken (reactants) and which are made (products).", "Total each side as (bond energy × number of bonds); ΔH = broken − made.", "Example: if breaking costs 300 kJ and making releases 500 kJ, the net is 200 kJ released. Now do yours."],
    [beQ, beQ, beQ, beQ, beQ, beQ,
      ["Breaking a bond...", "absorbs energy", "releases energy", "does not change energy"],
      ["A reaction is exothermic when the bonds formed are...", "stronger overall than the bonds broken", "weaker overall than the bonds broken", "the same as the bonds broken"]]));

  const HF = { "CO₂(g)": -394, "H₂O(l)": -286, "CH₄(g)": -75, "NH₃(g)": -46, "NO(g)": 90, "NO₂(g)": 33, "SO₂(g)": -297, "SO₃(g)": -396, "CaO(s)": -635, "CaCO₃(s)": -1207, "Fe₂O₃(s)": -824, "Al₂O₃(s)": -1676 };
  const HFR = [
    ["CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)", ["CH₄(g)", "CO₂(g)", "H₂O(l)"], 891, "released", "−75, −394 and −286"],
    ["CaCO₃(s) → CaO(s) + CO₂(g)", ["CaCO₃(s)", "CaO(s)", "CO₂(g)"], 178, "absorbed", "−1207, −635 and −394"],
    ["2NO(g) + O₂(g) → 2NO₂(g)", ["NO(g)", "NO₂(g)"], 114, "released", "+90 and +33"],
    ["N₂(g) + 3H₂(g) → 2NH₃(g)", ["NH₃(g)"], 92, "released", "−46"],
    ["2SO₂(g) + O₂(g) → 2SO₃(g)", ["SO₂(g)", "SO₃(g)"], 198, "released", "−297 and −396"],
    ["Fe₂O₃(s) + 2Al(s) → Al₂O₃(s) + 2Fe(s)", ["Fe₂O₃(s)", "Al₂O₃(s)"], 852, "released", "−824 and −1676"]
  ];
  const hfQ = () => {
    const [eq, sp, ans, dir] = pick(HFR), vals = sp.map(s => `ΔHf(${s}) = ${HF[s] > 0 ? "+" : ""}${HF[s]}`).join(", ");
    return num(`Using standard enthalpies of formation (kJ/mol): ${vals}; elements in their standard states = 0. For <b>${eq}</b>, how many kJ are ${dir}? (Give the size of ΔH.)`, ans, ["ΔH = (sum of ΔHf of products) − (sum of ΔHf of reactants), each multiplied by its coefficient.", "Elements such as O₂, H₂, Fe and Al have ΔHf = 0. Don't forget the coefficients.", "Example: for C(s) + O₂(g) → CO₂(g) with ΔHf(CO₂) = −394: ΔH = −394 − 0 = −394, so 394 kJ is released. Now do yours."], "📚");
  };
  b.push(les("Enthalpy of formation and ΔH of reaction", [
    ["Formation", "📚", "The <b>standard enthalpy of formation ΔHf</b> is the energy change when 1 mol of a compound forms from its elements in their standard states. For elements themselves, <b>ΔHf = 0</b>."],
    ["The formula", "🧮", "<b>ΔH = Σ ΔHf(products) − Σ ΔHf(reactants)</b>. Multiply each value by its coefficient in the equation first."],
    ["Worked example", "📝", "2NO + O₂ → 2NO₂ with ΔHf(NO) = +90 and ΔHf(NO₂) = +33: ΔH = 2(33) − 2(90) = 66 − 180 = <b>−114 kJ</b>."]
  ], ["Products minus reactants, using the ΔHf table given in the question.", "Multiply by the coefficients and remember elements are zero.", "Example: C + O₂ → CO₂ with ΔHf(CO₂) = −394 gives ΔH = −394 − 0 = −394 kJ. Now do yours."],
    [hfQ, hfQ, hfQ, hfQ, hfQ, hfQ,
      ["What is ΔHf of O₂(g) in its standard state?", "0", "-100", "+100"],
      ["A negative ΔHf means forming the compound from its elements...", "releases energy", "absorbs energy", "needs a catalyst"]]));

  b.push(les("Entropy: disorder and states", [
    ["What is entropy?", "🌀", "<b>Entropy (S)</b> measures how spread out the energy and particles are: the number of ways they can be arranged. More disorder means higher entropy."],
    ["Order of states", "🧊", "Entropy rises from <b>solid → liquid → gas</b>. Dissolving a solid, heating a substance, and making more gas particles all raise entropy."],
    ["Second law", "🔮", "In an isolated system the total entropy never decreases. Things spread out unless energy is put in to keep them ordered."]
  ], ["Compare how freely the particles can move and spread.", "Gases are more disordered than liquids, liquids more than solids; hotter and more particles also mean more disorder.", "Example: ice melting into water raises entropy because the particles can move more freely. Now do yours."], [
    ["Which has the highest entropy?", "1 mol of H₂O(g)", "1 mol of H₂O(l)", "1 mol of H₂O(s)"],
    ["Which has the lowest entropy?", "1 mol of CO₂(s)", "1 mol of CO₂(l)", "1 mol of CO₂(g)"],
    ["Which has more entropy?", "Water at 90 °C", "Water at 10 °C", "They are always equal"],
    ["Which has more entropy?", "2 mol of gas", "1 mol of the same gas", "Neither: gases have no entropy"],
    ["Dissolving sugar in water usually...", "increases entropy", "decreases entropy", "does not change entropy"],
    ["Which change has an increase in entropy?", "Boiling water", "Freezing water", "Condensing steam"],
    ["Which change has a decrease in entropy?", "Gas condensing to a liquid", "Ice melting", "Liquid evaporating"],
    ["The second law says that the total entropy of an isolated system...", "never decreases", "always decreases", "is always zero"],
    ["A perfectly ordered crystal at 0 K has entropy of...", "zero", "a large positive number", "a negative number"]
  ]));

  const dsR = [
    ["N₂(g) + 3H₂(g) → 2NH₃(g)", "decreases", "4 mol of gas become 2 mol"],
    ["CaCO₃(s) → CaO(s) + CO₂(g)", "increases", "a gas is made from solids"],
    ["2H₂O₂(l) → 2H₂O(l) + O₂(g)", "increases", "a gas is made from liquids"],
    ["2SO₂(g) + O₂(g) → 2SO₃(g)", "decreases", "3 mol of gas become 2 mol"],
    ["N₂O₄(g) → 2NO₂(g)", "increases", "1 mol of gas becomes 2 mol"],
    ["H₂O(g) → H₂O(l)", "decreases", "a gas becomes a liquid"],
    ["H₂(g) + Cl₂(g) → 2HCl(g)", "stays almost the same", "2 mol of gas become 2 mol of gas"],
    ["NaCl(s) → Na⁺(aq) + Cl⁻(aq)", "increases", "a solid becomes free ions in solution"],
    ["CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)", "decreases", "3 mol of gas become 1 mol of gas plus liquid"],
    ["C(s) + O₂(g) → CO₂(g)", "stays almost the same", "1 mol of gas becomes 1 mol of gas"],
    ["2KClO₃(s) → 2KCl(s) + 3O₂(g)", "increases", "a gas is made from solids"],
    ["Ag⁺(aq) + Cl⁻(aq) → AgCl(s)", "decreases", "free ions become a solid"]
  ];
  b.push(les("Predicting the sign of ΔS", [
    ["Count the gas", "🎈", "The biggest effect on entropy is the number of <b>moles of gas</b>. More gas particles after the reaction: <b>ΔS positive</b>. Fewer: <b>ΔS negative</b>."],
    ["Other clues", "🔎", "Solid or liquid turning into gas: ΔS positive. Ions precipitating into a solid: ΔS negative. Solid dissolving into ions: ΔS positive."],
    ["Worked example", "📝", "2SO₂(g) + O₂(g) → 2SO₃(g): 3 mol gas → 2 mol gas, so the system gets more ordered and <b>ΔS is negative</b>."]
  ], ["Compare the states and the number of moles of gas on each side.", "More gas moles after: entropy increases. Fewer gas moles after: it decreases. Equal gas moles: little change.", "Example: 2H₂(g) + O₂(g) → 2H₂O(l) goes from 3 mol gas to a liquid, so entropy decreases. Now do yours."],
    dsR.map(([rx, ans, why]) => () => mcq(`Does the entropy of the system increase or decrease for:<br><b>${rx}</b>`, ans, ["increases", "decreases", "stays almost the same"].filter(z => z !== ans), ["Compare the states and the moles of gas on each side.", "Which side has more moles of gas or a more spread-out state? That side is the more disordered one.", "Example: 2H₂(g) + O₂(g) → 2H₂O(l) goes from 3 mol gas to a liquid, so the system becomes more ordered. Now do yours."], "🎈"))));

  const gQ = () => {
    const t = ri(0, 1), T = pick([300, 400, 500]), y = pick([50, 100, 150, 200]), ty = T * y / 1000;
    if (t === 0) { const g = ri(5, 60), H = Math.round(ty + g);
      return num(`A reaction has ΔH = +${H} kJ and ΔS = +${y} J/K at T = ${T} K. Calculate ΔG in kJ using ΔG = ΔH − TΔS.`, g, ["Convert ΔS from J/K to kJ/K before multiplying (divide by 1000).", "Work out TΔS in kJ first, then subtract it from ΔH.", "Example: ΔH = +40 kJ, ΔS = +50 J/K, T = 200 K gives TΔS = 10 kJ and ΔG = 40 − 10 = 30 kJ. Now do yours."], "🧮"); }
    const g = ri(5, Math.max(6, Math.floor(ty) - 1)), H = Math.round(ty - g);
    return num(`A reaction has ΔH = −${H} kJ and ΔS = −${y} J/K at T = ${T} K. Calculate the size of ΔG in kJ. (ΔG = ΔH − TΔS; the answer is positive.)`, g, ["Convert ΔS to kJ/K by dividing by 1000. Watch the double minus: −T × (−ΔS) is positive.", "ΔG = ΔH + T|ΔS| when ΔS is negative. Then combine with ΔH.", "Example: ΔH = −10 kJ, ΔS = −50 J/K, T = 400 K gives ΔG = −10 + 20 = 10 kJ. Now do yours."], "🧮");
  };
  b.push(les("Gibbs free energy: ΔG = ΔH − TΔS", [
    ["Combining the two", "⚖️", "Whether a reaction happens by itself depends on both energy and entropy. <b>ΔG = ΔH − TΔS</b> combines them (T in kelvin)."],
    ["Units!", "⚠️", "ΔH is usually in <b>kJ</b> but ΔS is in <b>J/K</b>. Divide ΔS by 1000 (or multiply ΔH by 1000) so both use the same unit."],
    ["Sign of ΔG", "🚦", "<b>ΔG &lt; 0</b>: spontaneous (it can happen by itself). <b>ΔG &gt; 0</b>: not spontaneous. <b>ΔG = 0</b>: at equilibrium."]
  ], ["Match units: ΔS in J/K needs dividing by 1000.", "ΔG = ΔH − TΔS, using the absolute temperature scale.", "Example: ΔH = +40 kJ, ΔS = +50 J/K, T = 200 K gives ΔG = 40 − 10 = 30 kJ. Now do yours."],
    [gQ, gQ, gQ, gQ, gQ, gQ,
      ["If ΔG is negative the reaction is...", "spontaneous", "not spontaneous", "at equilibrium"],
      ["Temperature in ΔG = ΔH − TΔS must be in...", "kelvin", "Celsius", "either one"]]));

  b.push(les("When is a reaction spontaneous?", [
    ["Four cases", "🚦", "Both signs matter. <b>ΔH −, ΔS +</b>: always spontaneous. <b>ΔH +, ΔS −</b>: never spontaneous."],
    ["Temperature decides", "🌡️", "<b>ΔH −, ΔS −</b>: spontaneous only at <b>low T</b> (the −ΔH wins). <b>ΔH +, ΔS +</b>: spontaneous only at <b>high T</b> (the −TΔS wins)."],
    ["Examples", "📝", "Ice melting (ΔH +, ΔS +) is spontaneous above 0 °C. Water freezing (ΔH −, ΔS −) is spontaneous below 0 °C."]
  ], ["Write down the signs of ΔH and ΔS first.", "In ΔG = ΔH − TΔS, the −TΔS term gets more important as T rises.", "Example: ΔH positive and ΔS positive means spontaneous only when T is large enough. Now do yours."], [
    ["A reaction has ΔH negative and ΔS positive. It is spontaneous...", "at all temperatures", "at no temperature", "only at high temperature"],
    ["A reaction has ΔH positive and ΔS negative. It is spontaneous...", "at no temperature", "at all temperatures", "only at low temperature"],
    ["A reaction has ΔH positive and ΔS positive. It is spontaneous...", "only at high temperature", "only at low temperature", "at all temperatures"],
    ["A reaction has ΔH negative and ΔS negative. It is spontaneous...", "only at low temperature", "only at high temperature", "at no temperature"],
    ["Which combination is spontaneous only at high temperatures?", "ΔH positive, ΔS positive", "ΔH negative, ΔS negative", "ΔH negative, ΔS positive"],
    ["Which combination is never spontaneous?", "ΔH positive, ΔS negative", "ΔH negative, ΔS positive", "ΔH negative, ΔS negative"],
    ["Ice melts by itself above 0 °C because...", "the entropy gain outweighs the energy cost at higher T", "melting is exothermic", "ΔS is negative"],
    ["A spontaneous reaction is always...", "able to happen without continuous energy input (it may be slow)", "very fast", "exothermic"]
  ]));

  const xQ = () => {
    const T = pick([200, 300, 400, 500, 600, 800, 1000]), y = pick([50, 100, 150, 200, 250]), H = T * y / 1000;
    return num(`A reaction has ΔH = +${H} kJ and ΔS = +${y} J/K. Above what temperature (in K) does it become spontaneous? (Set ΔG = 0: T = ΔH / ΔS.)`, T, ["At the changeover ΔG = 0, so ΔH = TΔS.", "T = ΔH / ΔS. Convert ΔH to joules so the units match ΔS.", "Example: ΔH = +30 kJ, ΔS = +100 J/K: T = 30 000 / 100 = 300 K. Now do yours."], "🔀");
  };
  b.push(les("The crossover temperature", [
    ["Where ΔG = 0", "🔀", "When ΔH and ΔS are both positive, the reaction becomes spontaneous above a certain temperature. At that temperature <b>ΔG = 0</b>."],
    ["Solve it", "🧮", "0 = ΔH − TΔS gives <b>T = ΔH / ΔS</b>. Use the same energy units: convert kJ to J (×1000) or J to kJ (÷1000)."],
    ["Worked example", "📝", "ΔH = +40 kJ, ΔS = +100 J/K: T = 40 000 J / 100 J/K = <b>400 K</b>. Above 400 K, ΔG is negative."]
  ], ["Set ΔG to zero and rearrange for T.", "T = ΔH / ΔS, making the units match first.", "Example: ΔH = +30 kJ, ΔS = +100 J/K: T = 30 000 / 100 = 300 K. Now do yours."],
    [xQ, xQ, xQ, xQ, xQ, xQ,
      ["If ΔH and ΔS are both positive, the reaction becomes spontaneous when T is...", "above ΔH/ΔS", "below ΔH/ΔS", "exactly 0 K"]]));

  b.push(les("Free energy and the equilibrium constant", [
    ["ΔG° and K", "🔗", "The standard free energy change and the equilibrium constant are linked: <b>ΔG° = −RT ln K</b>."],
    ["Reading the sign", "🚦", "<b>ΔG° &lt; 0</b>: K &gt; 1 (products favoured). <b>ΔG° &gt; 0</b>: K &lt; 1 (reactants favoured). <b>ΔG° = 0</b>: K = 1."],
    ["ΔG versus ΔG°", "⚖️", "At equilibrium the actual <b>ΔG = 0</b> (no further change), even if ΔG° is not zero. A reaction with a tiny K is not 'impossible', just very unfavourable."]
  ], ["Think about what a large or small K means for the amount of products.", "Negative ΔG° goes with products being favoured.", "Example: a reaction with ΔG° strongly negative has K much larger than 1. Now do yours."], [
    ["ΔG° is large and negative. K is...", "much greater than 1", "much less than 1", "exactly 1"],
    ["ΔG° is large and positive. K is...", "much less than 1", "much greater than 1", "exactly 1"],
    ["ΔG° = 0 means K is...", "1", "0", "infinite"],
    ["At equilibrium, the actual ΔG of the reaction is...", "0", "negative", "positive"],
    ["K is greater than 1. Which statement fits?", "Products are favoured at equilibrium", "The reaction is very fast", "ΔG° is positive"],
    ["Which relation links ΔG° and K?", "ΔG° = −RT ln K", "ΔG° = RT + K", "ΔG° = K / T"],
    ["A reaction has ΔG° slightly positive. At equilibrium you expect...", "mostly reactants", "mostly products", "only products"]
  ]));

  const roQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const o = ri(0, 2), f = pick([2, 3]), A = pick([0.1, 0.2]), r1v = pick([2, 3, 4, 5]), r2v = r1v * Math.pow(f, o), ans = ["zero order", "first order", "second order"][o];
      return mcq(`Experiment 1: [A] = ${A} mol/dm³, rate = ${r1v}×10⁻³ mol/dm³/s.<br>Experiment 2: [A] = ${f3(A * f)} mol/dm³, rate = ${r2v}×10⁻³ mol/dm³/s.<br>What is the order of reaction with respect to A?`, ans, ["zero order", "first order", "second order"].filter(z => z !== ans), ["Compare how many times the concentration grew with how many times the rate grew.", "Rate factor = (concentration factor)^order. If the rate does not change, the order is the smallest possible.", "Example: [A] doubles and the rate quadruples (×4 = 2²), so it is second order. Now do yours."], "📊"); }
    const x = ri(0, 2), y = ri(0, 2); if (x + y === 0) return roQ();
    const term = (s, o) => o === 0 ? "" : o === 1 ? `[${s}]` : `[${s}]${sup(o)}`, law = (x2, y2) => "rate = k" + term("A", x2) + term("B", y2);
    if (t === 1) { const r0 = pick([1, 2, 3]), rA = r0 * Math.pow(2, x), rB = r0 * Math.pow(2, y), all = [];
      for (let i = 0; i <= 2; i++) for (let j = 0; j <= 2; j++) if (i + j > 0 && !(i === x && j === y)) all.push(law(i, j));
      return mcq(`Exp 1: [A] = 0.10, [B] = 0.10, rate = ${r0}×10⁻⁴.<br>Exp 2: [A] = 0.20, [B] = 0.10, rate = ${rA}×10⁻⁴.<br>Exp 3: [A] = 0.10, [B] = 0.20, rate = ${rB}×10⁻⁴.<br>What is the rate law?`, law(x, y), shuf(all).slice(0, 3), ["Change one reactant at a time and see what happens to the rate.", "Doubling a concentration: rate unchanged means order 0, doubled means order 1, quadrupled means order 2.", "Example: doubling [A] doubles the rate and doubling [B] quadruples it, so rate = k[A][B]². Now do yours."], "📊"); }
    return num(`A reaction has the rate law ${law(x, y).replace("rate", "rate")}. What is the overall order of the reaction?`, x + y, ["The overall order is the sum of the individual orders.", "Add the exponents on the concentrations (a bare [X] counts as 1).", "Example: rate = k[A]²[B] has overall order 2 + 1 = 3. Now do yours."], "🔢");
  };
  b.push(les("Finding orders from initial-rate data", [
    ["Rate law", "📊", "The <b>rate law</b> is <b>rate = k[A]<sup>m</sup>[B]<sup>n</sup></b>. The orders m and n come from experiments, not from the equation's coefficients."],
    ["Method of initial rates", "🔬", "Change one concentration at a time. If doubling [A] leaves the rate unchanged: <b>order 0</b>. Doubles the rate: <b>order 1</b>. Quadruples it: <b>order 2</b>."],
    ["Overall order", "➕", "The <b>overall order</b> is the sum of the orders. rate = k[A]²[B] is third order overall."]
  ], ["Compare two experiments where only one concentration changed.", "Rate factor = (concentration factor) to the power of the order.", "Example: [A] doubles and the rate quadruples, so [A] is second order. Now do yours."],
    [roQ, roQ, roQ, roQ, roQ, roQ, roQ]));

  const kQ = () => {
    const t = ri(0, 2), A = pick([0.1, 0.2, 0.5]), B = pick([0.1, 0.2, 0.5]), k = ri(2, 40);
    if (t === 0) return num(`For a first-order reaction, rate = k[A]. When [A] = ${A} mol/dm³ the rate is ${f3(k * A)} mol/dm³/s. What is k (in s⁻¹)?`, k, ["Rearrange rate = k[A] to get k.", "k = rate / [A].", "Example: rate 0.6 and [A] = 0.2 gives k = 0.6 / 0.2 = 3. Now do yours."], "🧮");
    if (t === 1) return num(`For a second-order reaction, rate = k[A]². When [A] = ${A} mol/dm³ the rate is ${f3(k * A * A)} mol/dm³/s. What is k (in dm³/mol/s)?`, k, ["Rearrange rate = k[A]² to get k.", "k = rate / [A]². Square the concentration first.", "Example: rate 0.12 and [A] = 0.2 gives k = 0.12 / 0.04 = 3. Now do yours."], "🧮");
    return num(`For the rate law rate = k[A][B], the rate is ${f3(k * A * B)} mol/dm³/s when [A] = ${A} and [B] = ${B} mol/dm³. What is k (in dm³/mol/s)?`, k, ["Rearrange rate = k[A][B] to get k.", "k = rate / ([A] × [B]). Multiply the two concentrations first.", "Example: rate 0.06, [A] = 0.2 and [B] = 0.1 gives k = 0.06 / 0.02 = 3. Now do yours."], "🧮");
  };
  b.push(les("Calculating the rate constant k and its units", [
    ["Find k", "🧮", "Once you know the rate law, put in one experiment's rate and concentrations and solve for <b>k</b>. k does not change with concentration, only with temperature."],
    ["Units of k", "📏", "The units depend on the overall order: zero order: mol dm⁻³ s⁻¹; <b>first order: s⁻¹</b>; <b>second order: dm³ mol⁻¹ s⁻¹</b>."],
    ["Worked example", "📝", "rate = k[A]² with [A] = 0.1 and rate = 0.02: k = 0.02 / 0.01 = <b>2 dm³ mol⁻¹ s⁻¹</b>."]
  ], ["Rearrange the rate law for k.", "k = rate divided by the concentration terms, with their exponents.", "Example: rate 0.06, [A] = 0.2 and [B] = 0.1 for rate = k[A][B] gives k = 3. Now do yours."],
    [kQ, kQ, kQ, kQ, kQ, kQ,
      ["What are the units of k for a first-order reaction?", "s⁻¹", "dm³ mol⁻¹ s⁻¹", "mol dm⁻³ s⁻¹"],
      ["What are the units of k for a second-order reaction?", "dm³ mol⁻¹ s⁻¹", "s⁻¹", "mol dm⁻³ s⁻¹"],
      ["What are the units of k for a zero-order reaction?", "mol dm⁻³ s⁻¹", "s⁻¹", "dm³ mol⁻¹ s⁻¹"],
      ["What does k depend on?", "Temperature (and catalyst)", "Concentration only", "The volume of the flask"]]));

  const hlQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(1, 4), T = pick([2, 3, 5, 6, 10, 12]), m = Math.pow(2, n) * pick([5, 10, 15]);
      return num(`A first-order sample of ${m} g has a half-life of ${T} hours. How many grams remain after ${n * T} hours?`, m / Math.pow(2, n), ["Count how many half-lives have passed.", "Halve the mass once for each half-life.", "Example: 48 g with a half-life of 2 hours, after 4 hours (2 half-lives): 48 → 24 → 12 g. Now do yours."], "☢️"); }
    if (t === 1) { const n = ri(2, 4), T = pick([2, 3, 4, 5, 8, 10]), m = pick([5, 10, 20]) * Math.pow(2, n);
      return num(`A first-order sample falls from ${m} g to ${m / Math.pow(2, n)} g. Its half-life is ${T} days. How many days did this take?`, n * T, ["Find how many times the mass was halved.", "Time = number of half-lives × half-life.", "Example: 80 g falls to 10 g, with half-life 3 days: that is 3 halvings, so 9 days. Now do yours."], "☢️"); }
    const T = pick([1, 5, 20, 50, 100]), kk = { 1: "0.693", 5: "0.1386", 20: "0.03465", 50: "0.01386", 100: "0.00693" }[T];
    return num(`A first-order reaction has k = ${kk} s⁻¹. Using t½ = 0.693 / k, what is its half-life in seconds?`, T, ["For first-order reactions the half-life depends only on k.", "t½ = 0.693 divided by k.", "Example: k = 0.0231 s⁻¹ gives t½ = 0.693 / 0.0231 = 30 s. Now do yours."], "⏱️");
  };
  b.push(les("First-order half-life", [
    ["Half-life", "⏱️", "The <b>half-life t½</b> is the time for the concentration to fall to half. For a <b>first-order</b> reaction it is <b>constant</b>, whatever the starting amount."],
    ["Links to k", "🔗", "For first-order reactions <b>t½ = 0.693 / k</b> (0.693 is ln 2). A larger k means a shorter half-life."],
    ["Fraction left", "🍰", "After n half-lives the fraction left is (1/2)<sup>n</sup>: ½, ¼, ⅛, 1/16 … Example: 80 g with t½ = 5 h leaves 20 g after 10 h."]
  ], ["Count half-lives: time divided by t½.", "After each half-life the amount halves. For k, use t½ = 0.693 / k.", "Example: 48 g with a half-life of 2 hours, after 4 hours (2 half-lives): 48 → 24 → 12 g. Now do yours."],
    [hlQ, hlQ, hlQ, hlQ, hlQ, hlQ,
      ["The half-life of a first-order reaction...", "stays the same as the reaction proceeds", "gets longer and longer", "gets shorter and shorter"],
      ["A bigger rate constant k means a...", "shorter half-life", "longer half-life", "half-life of zero"]]));

  b.push(les("Integrated rate laws and graphs", [
    ["Straight-line graphs", "📈", "Plot the right quantity against time and a straight line tells you the order. <b>Zero order</b>: [A] vs t. <b>First order</b>: ln[A] vs t. <b>Second order</b>: 1/[A] vs t."],
    ["The slope", "📐", "Zero and first order slope downwards: <b>slope = −k</b>. Second order (1/[A] vs t) slopes upwards: <b>slope = +k</b>."],
    ["Half-lives", "⏱️", "First order: constant half-life. Zero order: half-life gets shorter as the reaction goes on. Second order: half-life gets longer."]
  ], ["Decide what quantity gives a straight line for each order.", "Each order has its own quantity that gives a straight line against time; recall which goes with which.", "Example: if ln[A] against time is a straight line, the reaction is first order. Now do yours."], [
    ["A plot of ln[A] against time is a straight line. The reaction is...", "first order", "zero order", "second order"],
    ["A plot of 1/[A] against time is a straight line. The reaction is...", "second order", "first order", "zero order"],
    ["A plot of [A] against time is a straight line. The reaction is...", "zero order", "first order", "second order"],
    ["For a first-order reaction, the slope of ln[A] against time is...", "-k", "+k", "1/k"],
    ["For a second-order reaction, the slope of 1/[A] against time is...", "+k", "-k", "0"],
    ["Which reaction has a constant half-life?", "First order", "Zero order", "Second order"],
    ["Which reaction has a half-life that gets longer as it proceeds?", "Second order", "First order", "Zero order"],
    ["For a zero-order reaction, [A] against time is...", "a straight line sloping down", "a curve that levels off", "a horizontal line"]
  ]));

  b.push(les("Reaction mechanisms: intermediates and catalysts", [
    ["Steps", "🪜", "Most reactions happen in several <b>elementary steps</b> that add up to the overall equation. The number of particles colliding in a step is its <b>molecularity</b>: unimolecular (1), bimolecular (2), termolecular (3, rare)."],
    ["Intermediates", "🌉", "An <b>intermediate</b> is made in one step and used up in a later step. It does not appear in the overall equation."],
    ["Catalysts", "🔑", "A <b>catalyst</b> is used up in one step and <b>regenerated</b> in a later one. It also does not appear in the overall equation. Mnemonic: intermediates appear <i>after</i> they are first made, catalysts are there <i>before</i>."]
  ], ["List the steps and find species that appear on both sides across the steps but not in the overall equation.", "If a species is made first and consumed later it is an intermediate; if it is consumed first and made again it is a catalyst.", "Example: Step 1 A + C → AC; Step 2 AC + B → D + C. AC is made then used (intermediate); C is used then remade (catalyst). Now do yours."], [
    ["Mechanism: Step 1 O₃ + Cl → O₂ + ClO; Step 2 ClO + O → O₂ + Cl. Which species is the catalyst?", "Cl", "ClO", "O₂"],
    ["Mechanism: Step 1 O₃ + Cl → O₂ + ClO; Step 2 ClO + O → O₂ + Cl. Which species is the intermediate?", "ClO", "Cl", "O₃"],
    ["Mechanism: Step 1 H₂O₂ + I⁻ → H₂O + IO⁻; Step 2 H₂O₂ + IO⁻ → H₂O + O₂ + I⁻. Which species is the catalyst?", "I⁻", "IO⁻", "H₂O"],
    ["Mechanism: Step 1 H₂O₂ + I⁻ → H₂O + IO⁻; Step 2 H₂O₂ + IO⁻ → H₂O + O₂ + I⁻. Which species is the intermediate?", "IO⁻", "I⁻", "O₂"],
    ["Mechanism: Step 1 NO₂ + NO₂ → NO₃ + NO; Step 2 NO₃ + CO → NO₂ + CO₂. Which species is the intermediate?", "NO₃", "NO", "CO₂"],
    ["Mechanism: Step 1 NO₂ + NO₂ → NO₃ + NO; Step 2 NO₃ + CO → NO₂ + CO₂. What is the overall reaction?", "NO₂ + CO → NO + CO₂", "2NO₂ + CO → NO₃ + CO₂", "NO₃ + NO → NO₂ + CO₂"],
    ["An elementary step where two particles collide is called...", "bimolecular", "unimolecular", "zero-order"],
    ["An elementary step with one particle breaking apart is...", "unimolecular", "bimolecular", "termolecular"],
    ["An intermediate appears in...", "the mechanism but not the overall equation", "the overall equation only", "neither the mechanism nor the equation"]
  ]));

  const rdQ = () => {
    const sp = shuf(["A", "B", "C"]), [P, Q] = sp, t = ri(0, 2);
    const w = ["rate = k[" + P + "]", "rate = k[" + P + "][" + Q + "]", "rate = k[" + P + "]²", "rate = k[" + Q + "]", "rate = k[" + P + "]²[" + Q + "]", "rate = k[" + Q + "]²"];
    const ex = ["Slow step 2NO₂ → NO₃ + NO means rate = k[NO₂]². Now do yours.", "The slow step is the bottleneck, like the narrowest part of a funnel. Use its reactants and their coefficients as exponents."];
    if (t === 0) return mcq(`A mechanism has a slow first step: ${P} → products (a single particle). What is the rate law?`, "rate = k[" + P + "]", w.filter(z => z !== "rate = k[" + P + "]").slice(0, 3), ["The slowest step controls the overall rate.", "In an elementary step the exponents equal the coefficients of the reactants.", "Example: slow step X → Y gives rate = k[X]. Now do yours."], "🐢");
    if (t === 1) return mcq(`A mechanism has a slow first step: ${P} + ${Q} → products. What is the rate law?`, "rate = k[" + P + "][" + Q + "]", w.filter(z => z !== "rate = k[" + P + "][" + Q + "]").slice(0, 3), ["The slowest step controls the overall rate.", "In an elementary step the exponents equal the coefficients of the reactants.", "Example: slow step X + Z → products gives rate = k[X][Z]. Now do yours."], "🐢");
    return mcq(`A mechanism has a slow first step: 2${P} → products. What is the rate law?`, "rate = k[" + P + "]²", w.filter(z => z !== "rate = k[" + P + "]²").slice(0, 3), ["The slowest step controls the overall rate.", "In an elementary step the exponents equal the coefficients of the reactants.", ex[0]], "🐢");
  };
  b.push(les("The rate-determining step", [
    ["The bottleneck", "🐢", "In a multi-step mechanism the <b>slowest step</b> is the <b>rate-determining step</b>. It sets the speed of the whole reaction, like the narrowest part of a funnel."],
    ["Rate law from the slow step", "📝", "For an <b>elementary</b> step the orders equal the coefficients: slow step <b>A + B → …</b> gives rate = k[A][B]; slow step <b>2A → …</b> gives rate = k[A]²."],
    ["Fast steps", "⚡", "Fast steps after the slow step do not affect the rate. Species made and used in fast steps don't appear in the rate law."]
  ], ["Find the slow step in the mechanism.", "Write the rate law from the slow step's reactants, using their coefficients as exponents.", "Example: slow step X + Z → products gives rate = k[X][Z]. Now do yours."],
    [rdQ, rdQ, rdQ, rdQ, rdQ, rdQ,
      ["The rate-determining step is the...", "slowest step", "fastest step", "last step"],
      ["Mechanism: slow step 2NO₂ → NO₃ + NO, fast step NO₃ + CO → NO₂ + CO₂. The rate law is...", "rate = k[NO₂]²", "rate = k[NO₂][CO]", "rate = k[CO]"],
      ["Reaction steps after the slow step...", "do not change the rate law", "set the rate law", "are never allowed"]]));

  const tfQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(1, 4);
      return num(`A reaction rate doubles for every 10 °C rise. By what factor does the rate increase when the temperature rises by ${n * 10} °C?`, Math.pow(2, n), ["Count how many 10 °C steps there are.", "Each 10 °C step multiplies the rate by 2.", "Example: a 20 °C rise is two steps, so 2 × 2 = 4 times faster. Now do yours."], "🌡️"); }
    if (t === 1) { const n = ri(1, 3);
      return num(`A reaction rate triples for every 10 °C rise. By what factor does the rate increase when the temperature rises by ${n * 10} °C?`, Math.pow(3, n), ["Count how many 10 °C steps there are.", "Each 10 °C step multiplies the rate by 3.", "Example: a 20 °C rise is two steps, so 3 × 3 = 9 times faster. Now do yours."], "🌡️"); }
    const n = ri(1, 3), n2 = ri(2, 3);
    return num(`A reaction rate multiplies by ${n2} for every 10 °C rise. At 20 °C its rate is 1 unit. What is its rate at ${20 + n * 10} °C?`, Math.pow(n2, n), ["Count the 10 °C steps between the two temperatures.", "Multiply the starting rate by the factor once for every 10 °C step.", "Example: factor 2, 20 °C to 40 °C is two steps: 1 × 2 × 2 = 4. Now do yours."], "🌡️");
  };
  b.push(les("Temperature, collisions and activation energy", [
    ["Collision theory", "💥", "A reaction needs particles to collide <b>with enough energy</b> (at least the <b>activation energy, Ea</b>) and in the right orientation."],
    ["Heating helps", "🔥", "A higher temperature means more molecules have energy ≥ Ea and they collide more often, so the rate rises sharply. A common rule of thumb: the rate roughly <b>doubles per 10 °C</b>."],
    ["Arrhenius", "📈", "<b>k = A e<sup>−Ea/RT</sup></b>. A plot of ln k against 1/T is a straight line with slope <b>−Ea/R</b>: a bigger Ea means k is more sensitive to temperature."]
  ], ["Think about the fraction of molecules with energy of at least Ea.", "Count the 10 °C steps and apply the factor each time.", "Example: factor 2 for 30 °C is three steps: 2 × 2 × 2 = 8. Now do yours."],
    [tfQ, tfQ, tfQ, tfQ, tfQ, tfQ,
      ["Raising the temperature speeds up a reaction mainly because...", "more molecules have energy of at least Ea", "Ea gets smaller", "the reactants get heavier"],
      ["A reaction with a bigger Ea is...", "more sensitive to temperature changes", "faster at all temperatures", "unaffected by temperature"],
      ["The slope of ln k against 1/T equals...", "-Ea/R", "+Ea/R", "k"]]));

  const epQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const ea = pick([40, 50, 60, 80, 100]), dh = pick([20, 30, 40]);
      return num(`An exothermic reaction has Ea(forward) = ${ea} kJ/mol and ΔH = −${dh} kJ/mol. What is Ea for the reverse reaction (kJ/mol)?`, ea + dh, ["Reverse reaction starts from the products' energy level.", "Ea(reverse) = Ea(forward) − ΔH. Remember ΔH is negative here.", "Example: Ea = 50 and ΔH = −10 gives Ea(reverse) = 50 − (−10) = 60. Now do yours."], "⛰️"); }
    if (t === 1) { const dh = pick([20, 30, 40]), ea = dh + pick([30, 40, 60]);
      return num(`An endothermic reaction has Ea(forward) = ${ea} kJ/mol and ΔH = +${dh} kJ/mol. What is Ea for the reverse reaction (kJ/mol)?`, ea - dh, ["Reverse reaction starts at the higher products' energy level and goes down to the same peak.", "Ea(reverse) = Ea(forward) − ΔH.", "Example: Ea = 75 and ΔH = +25 gives Ea(reverse) = 75 − 25 = 50. Now do yours."], "⛰️"); }
    const ea = pick([60, 80, 100, 120]), dd = pick([20, 30, 40]);
    return num(`A catalyst lowers the forward activation energy from ${ea} kJ/mol by ${dd} kJ/mol. What is the new Ea (kJ/mol)?`, ea - dd, ["A catalyst gives an alternative route with a lower peak.", "New Ea = old Ea − the reduction.", "Example: from 90 lowered by 25 gives 65 kJ/mol. Now do yours."], "🔑");
  };
  b.push(les("Energy profiles and catalysts", [
    ["Reading a profile", "⛰️", "An <b>energy profile</b> plots energy along the reaction path. The peak is the <b>transition state</b>. <b>Ea(forward)</b> = peak − reactants; <b>Ea(reverse)</b> = peak − products. <b>ΔH</b> = products − reactants."],
    ["Linking them", "🔗", "<b>Ea(reverse) = Ea(forward) − ΔH</b>. For an exothermic reaction (ΔH negative) the reverse Ea is bigger."],
    ["Catalysts", "🔑", "A catalyst gives a new route with a <b>lower Ea</b> for both directions. It does <b>not</b> change ΔH, K or the final amounts. It only gets there faster."]
  ], ["Sketch the profile: reactants, peak, products.", "The reverse barrier is the forward barrier minus ΔH.", "Example: Ea = 50 and ΔH = −10 gives Ea(reverse) = 60. Now do yours."],
    [epQ, epQ, epQ, epQ, epQ, epQ,
      ["A catalyst changes...", "the activation energy", "ΔH", "the equilibrium constant K"],
      ["A catalyst speeds up the forward and reverse reactions...", "equally", "only the forward one", "only the reverse one"],
      ["The highest point on an energy profile is the...", "transition state", "product", "catalyst"]]));

  b.push(mix("Mixed practice", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])));
  b.push(mix("Level 23 Challenge", at(b, [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17])));

  // ================= LEVEL 24 =================
  const c = [];

  const SP = [["Mg²⁺", "Mg", -2.37], ["Al³⁺", "Al", -1.66], ["Zn²⁺", "Zn", -0.76], ["Fe²⁺", "Fe", -0.44], ["Ni²⁺", "Ni", -0.26], ["Pb²⁺", "Pb", -0.13], ["Cu²⁺", "Cu", 0.34], ["Ag⁺", "Ag", 0.80], ["Br₂", "Br⁻", 1.07], ["Cl₂", "Cl⁻", 1.36]];
  const ev = e => (e > 0 ? "+" : e < 0 ? "−" : "") + Math.abs(e).toFixed(2) + " V";
  const tbl = list => list.map(s => `${s[0]}/${s[1]} ${ev(s[2])}`).join("; ");
  const redoxQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const L = shuf(SP).slice(0, 3), top = L.reduce((p, q) => q[2] > p[2] ? q : p);
      return mcq(`Standard electrode potentials: ${tbl(L)}. Which is the strongest <b>oxidising agent</b>?`, top[0], L.filter(x => x !== top).map(x => x[0]), ["An oxidising agent gets reduced, so it wants electrons badly.", "The most positive E° belongs to the species that gains electrons most easily.", "Example: with E° of −0.5 V, +0.2 V and +0.9 V, the species in the +0.9 V couple is the strongest oxidiser. Now do yours."], "🔋"); }
    if (t === 1) { const L = shuf(SP).slice(0, 3), low = L.reduce((p, q) => q[2] < p[2] ? q : p);
      return mcq(`Standard electrode potentials: ${tbl(L)}. Which is the strongest <b>reducing agent</b>? (Pick from the reduced forms.)`, low[1], L.filter(x => x !== low).map(x => x[1]), ["A reducing agent gives away electrons, so it is oxidised.", "The most negative E° belongs to the reduced form that loses electrons most easily.", "Example: with E° of −0.5 V, +0.2 V and +0.9 V, the reduced form in the −0.5 V couple is the strongest reducer. Now do yours."], "🔋"); }
    const [X, Y] = shuf(SP.slice(0, 8)).slice(0, 2), yes = Y[2] > X[2];
    return mcq(`E°: ${X[0]}/${X[1]} ${ev(X[2])} and ${Y[0]}/${Y[1]} ${ev(Y[2])}. Will ${X[1]}(s) react when placed in a solution of ${Y[0]}(aq)?`, yes ? "Yes, it reacts" : "No reaction", [yes ? "No reaction" : "Yes, it reacts"], ["The solid metal would be oxidised and the ion reduced.", "A metal reduces any ion whose E° is more positive than its own.", "Example: zinc (−0.76 V) reduces Cu²⁺ (+0.34 V) so it reacts. Now compare yours."], "🧲");
  };
  c.push(les("Standard reduction potentials", [
    ["The table", "📋", "A table of <b>standard reduction potentials E°</b> (in volts) ranks half-reactions written as reductions: Mg²⁺ + 2e⁻ → Mg has −2.37 V; Cu²⁺ + 2e⁻ → Cu has +0.34 V."],
    ["Oxidising agents", "🔋", "The <b>more positive</b> E°, the stronger the oxidising agent (the oxidised form on the left): F₂, Cl₂ and Ag⁺ are strong oxidisers."],
    ["Reducing agents", "⚡", "The <b>more negative</b> E°, the stronger the reducing agent (the reduced form on the right): Mg, Al and Zn give up electrons easily. A metal displaces ions with a more positive E°."]
  ], ["Compare the E° numbers: which is the most positive and which is the most negative?", "Most positive E° = strongest oxidiser (ion/molecule). Most negative E° = strongest reducer (the metal or reduced form).", "Example: of Zn (−0.76 V) and Cu (+0.34 V), zinc is the stronger reducing agent. Now do yours."],
    [redoxQ, redoxQ, redoxQ, redoxQ, redoxQ, redoxQ,
      ["The more positive the E°, the stronger the...", "oxidising agent on the left", "reducing agent on the left", "base"],
      ["Which metal is a stronger reducing agent than zinc?", "Magnesium", "Copper", "Silver"]]));

  const ecQ = () => {
    const L = shuf(SP.slice(0, 8)).slice(0, 2).sort((p, q) => p[2] - q[2]), [lo, hi] = L;
    if (ri(0, 3) === 0) { const ans = `${hi[0]}/${hi[1]}`;
      return mcq(`A cell joins the ${lo[0]}/${lo[1]} half-cell (E° = ${ev(lo[2])}) and the ${hi[0]}/${hi[1]} half-cell (E° = ${ev(hi[2])}). In the cell, which couple is the <b>cathode</b> (where reduction happens)?`, ans, [`${lo[0]}/${lo[1]}`, "Neither: both are anodes"], ["The cathode is where reduction happens.", "The couple with the more positive E° is reduced; the other is reversed and oxidised at the anode.", "Example: for Zn (−0.76 V) and Cu (+0.34 V) the copper couple is the cathode. Now do yours."], "🔋"); }
    const d = hi[2] - lo[2], right = d.toFixed(2) + " V";
    const cand = uniq([Math.abs(hi[2] + lo[2]).toFixed(2) + " V", Math.abs(hi[2]).toFixed(2) + " V", Math.abs(lo[2]).toFixed(2) + " V", (d + 0.2).toFixed(2) + " V", Math.max(0.1, d - 0.2).toFixed(2) + " V"]).filter(x => x !== right);
    return mcq(`A galvanic cell joins the ${lo[0]}/${lo[1]} half-cell (E° = ${ev(lo[2])}) and the ${hi[0]}/${hi[1]} half-cell (E° = ${ev(hi[2])}). What is E°cell?`, right, cand.slice(0, 3), ["Identify the cathode (more positive E°) and the anode (more negative E°).", "E°cell = E°(cathode) − E°(anode). Subtracting a negative number adds.", "Example: Zn (−0.76 V) and Ag (+0.80 V): E°cell = 0.80 − (−0.76) = 1.56 V. Now do yours."], "🔋");
  };
  c.push(les("Calculating E°cell", [
    ["Two half-cells", "🔋", "A <b>galvanic cell</b> joins two half-cells. The couple with the <b>more positive E°</b> is the <b>cathode</b> (reduction). The other runs backwards as the <b>anode</b> (oxidation)."],
    ["The formula", "🧮", "<b>E°cell = E°(cathode) − E°(anode)</b>. Do not change the E° values when you balance electrons: voltage does not depend on how many electrons are shifted."],
    ["Worked example", "📝", "Zn²⁺/Zn (−0.76 V) and Cu²⁺/Cu (+0.34 V): cathode = Cu, anode = Zn. E°cell = 0.34 − (−0.76) = <b>+1.10 V</b>."]
  ], ["Think about what happens to electrons in oxidation and in reduction (OIL RIG).", "In a galvanic cell the more positive E° couple gains electrons and the other couple loses them. For voltages, subtract the loser's E° from the gainer's E°.", "Example: Zn (−0.76 V) and Ag (+0.80 V) gives 0.80 − (−0.76) = 1.56 V. Now do yours."],
    [ecQ, ecQ, ecQ, ecQ, ecQ, ecQ,
      ["Oxidation always happens at the...", "anode", "cathode", "salt bridge"],
      ["Reduction always happens at the...", "cathode", "anode", "wire"]]));

  c.push(les("E°cell, ΔG° and spontaneity", [
    ["Voltage and spontaneity", "🚦", "A positive <b>E°cell</b> means the reaction is spontaneous: a galvanic cell that can power things. A negative E°cell means it is not spontaneous without an outside push (electrolysis)."],
    ["Link to ΔG°", "🔗", "<b>ΔG° = −nFE°</b> (n = moles of electrons, F = 96 500 C/mol). Positive E° gives negative ΔG°. Large positive E° also means a large K."],
    ["Dead battery", "🪫", "As a cell runs, concentrations change until Q = K. Then E = 0 and ΔG = 0: the battery is flat (at equilibrium)."]
  ], ["Connect the sign of E° to the sign of ΔG°.", "ΔG° = −nFE°, so the sign flips between E° and ΔG°.", "Example: E°cell = +0.50 V means spontaneous, ΔG° negative and K greater than 1. Now do yours."], [
    ["E°cell is positive. The reaction is...", "spontaneous as written", "not spontaneous", "at equilibrium"],
    ["E°cell is negative. To make the reaction happen you need...", "an external electrical supply (electrolysis)", "no extra energy", "a lower temperature only"],
    ["E°cell is positive. ΔG° is...", "negative", "positive", "always zero"],
    ["E°cell is positive. K is...", "greater than 1", "less than 1", "exactly 1"],
    ["In ΔG° = −nFE°, what does n stand for?", "moles of electrons transferred", "number of cells in a battery", "the neutron number"],
    ["When a battery is completely flat, E is...", "0 V", "its standard value", "negative infinity"],
    ["Which cell reaction is spontaneous?", "One with a positive E°cell", "One with a negative E°cell", "One with E°cell = 0 V and Q much bigger than K"],
    ["A galvanic cell turns...", "chemical energy into electrical energy", "electrical energy into chemical energy", "light into sound"]
  ]));

  const ELY = [
    ["molten sodium chloride", "cathode", "sodium metal", "chlorine gas", "hydrogen gas"],
    ["molten sodium chloride", "anode", "chlorine gas", "sodium metal", "oxygen gas"],
    ["molten lead(II) bromide", "cathode", "lead metal", "bromine gas", "hydrogen gas"],
    ["molten lead(II) bromide", "anode", "bromine gas", "lead metal", "oxygen gas"],
    ["molten aluminium oxide (with cryolite)", "cathode", "aluminium metal", "oxygen gas", "hydrogen gas"],
    ["molten aluminium oxide (with cryolite)", "anode", "oxygen gas", "aluminium metal", "hydrogen gas"],
    ["concentrated aqueous sodium chloride (brine)", "cathode", "hydrogen gas", "sodium metal", "chlorine gas"],
    ["concentrated aqueous sodium chloride (brine)", "anode", "chlorine gas", "oxygen gas", "hydrogen gas"],
    ["dilute aqueous sodium sulfate", "cathode", "hydrogen gas", "sodium metal", "sulfur"],
    ["dilute aqueous sodium sulfate", "anode", "oxygen gas", "sulfur dioxide", "hydrogen gas"],
    ["aqueous copper(II) sulfate with inert electrodes", "cathode", "copper metal", "hydrogen gas", "oxygen gas"],
    ["aqueous copper(II) sulfate with inert electrodes", "anode", "oxygen gas", "copper metal", "sulfur"],
    ["aqueous silver nitrate with inert electrodes", "cathode", "silver metal", "hydrogen gas", "nitrogen gas"],
    ["aqueous copper(II) sulfate with copper electrodes", "anode", "the copper electrode dissolves", "oxygen gas forms", "hydrogen gas forms"]
  ];
  c.push(les("Electrolysis: predicting the products", [
    ["Electrolysis", "🔌", "<b>Electrolysis</b> uses electricity to force a non-spontaneous reaction. <b>Cathode</b> (negative): reduction, positive ions gain electrons. <b>Anode</b> (positive): oxidation, negative ions lose electrons."],
    ["Molten salts", "🔥", "In a molten compound only its own ions are present: the <b>metal forms at the cathode</b> and the <b>non-metal at the anode</b> (Na and Cl₂ from NaCl; Al and O₂ from Al₂O₃)."],
    ["Aqueous solutions", "💧", "Water adds H⁺ and OH⁻. At the cathode a metal below hydrogen in reactivity (Cu, Ag) forms, otherwise <b>H₂</b>. At the anode a halide gives its halogen if concentrated; otherwise <b>O₂</b> forms."]
  ], ["Cathode = positive ions are reduced; anode = negative ions are oxidised.", "In molten salts only two ions exist. In solutions, water competes: reactive metals stay as ions and hydrogen forms instead.", "Example: molten potassium chloride gives potassium at the cathode and chlorine at the anode. Now do yours."],
    ELY.map(([sol, el, r, w1, w2]) => () => mcq(`What forms at the <b>${el}</b> during the electrolysis of ${sol}?`, r, [w1, w2], ["Cathode = positive ions are reduced; anode = negative ions are oxidised.", "In molten salts only two ions exist. In solutions, water competes: reactive metals stay as ions and hydrogen forms instead.", "Example: molten potassium chloride gives potassium at the cathode and chlorine at the anode. Now do yours."], "🔌"))));

  const faQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const I = pick([2, 5, 10, 20]), tt = pick([100, 200, 300, 600, 1000]);
      return num(`A current of ${I} A flows for ${tt} s. How much charge Q (in coulombs) passes?`, I * tt, ["Charge depends on how big the current is and how long it flows.", "Q = I × t, with t in seconds.", "Example: 3 A for 50 s carries 3 × 50 = 150 C. Now do yours."], "⚡"); }
    if (t === 1) { const I = pick([2, 4, 5, 10]), tt = pick([100, 200, 500, 1000]);
      return num(`${I * tt} C of charge passes in a circuit with a steady current of ${I} A. For how many seconds did the current flow?`, tt, ["Rearrange Q = I × t.", "t = Q / I.", "Example: 600 C at 3 A flows for 600 / 3 = 200 s. Now do yours."], "⚡"); }
    if (t === 2) { const n = ri(1, 5);
      return num(`How many moles of electrons carry a charge of ${n * 96500} C? (Faraday constant F = 96 500 C/mol.)`, n, ["Divide the total charge by the charge on one mole of electrons.", "n = Q / F with F = 96 500 C/mol.", "Example: 48 250 C is 48 250 / 96 500 = 0.5 mol of electrons. Now do yours."], "⚡"); }
    const I = pick([10, 20, 50]), n = ri(1, 4);
    return num(`A current of ${I} A flows for ${96500 * n / I} s. How many moles of electrons pass? (F = 96 500 C/mol.)`, n, ["First find the charge Q = I × t.", "Then moles of electrons = Q / 96 500.", "Example: 10 A for 1930 s is 19 300 C, which is 0.2 mol. Now do yours with your numbers."], "⚡");
  };
  c.push(les("Faraday's laws: charge and electrons", [
    ["Charge and current", "⚡", "Electric charge Q (coulombs) = current I (amperes) × time t (seconds): <b>Q = I × t</b>."],
    ["The Faraday constant", "🔢", "One mole of electrons carries about <b>96 500 C</b> (the Faraday constant, F). So <b>moles of electrons = Q / 96 500</b>."],
    ["Worked example", "📝", "5 A for 1930 s: Q = 9650 C, so n(e⁻) = 9650 / 96 500 = <b>0.1 mol</b>."]
  ], ["Look for charge, current and time.", "Q = I × t and n(e⁻) = Q / 96 500.", "Example: 3 A for 50 s carries 150 C. Now do yours."],
    [faQ, faQ, faQ, faQ, faQ, faQ,
      ["The unit of electric charge is the...", "coulomb", "ampere", "volt"],
      ["The charge on one mole of electrons is about...", "96 500 C", "6 C", "1 000 000 C"]]));

  const mdQ = () => {
    const I = pick([10, 20, 50]), t = ri(0, 2);
    if (t <= 1) { const M = pick([["silver", "Ag⁺ + e⁻ → Ag", 1, 108, "Ag"], ["copper", "Cu²⁺ + 2e⁻ → Cu", 2, 64, "Cu"], ["aluminium", "Al³⁺ + 3e⁻ → Al", 3, 27, "Al"], ["magnesium", "Mg²⁺ + 2e⁻ → Mg", 2, 24, "Mg"], ["sodium", "Na⁺ + e⁻ → Na", 1, 23, "Na"], ["nickel", "Ni²⁺ + 2e⁻ → Ni", 2, 59, "Ni"]]);
      const [nm, rx, z, ar, sy] = M, n = until(() => ri(1, 6), n0 => (n0 * ar) % z === 0), time = 96500 * n / I;
      return num(`${nm[0].toUpperCase() + nm.slice(1)} is deposited by electrolysis (${rx}). A current of ${I} A flows for ${time} s. What mass of ${sy} forms, in g? (F = 96 500 C/mol; Ar of ${sy} = ${ar}.)`, n * ar / z, ["Find the charge, then the moles of electrons passed.", "Moles of metal = moles of electrons ÷ the number of electrons in the half-equation. Then mass = moles × Ar.", "Example: 0.4 mol of electrons for Cu²⁺ + 2e⁻ → Cu gives 0.2 mol Cu, which is 0.2 × 64 = 12.8 g. Now do yours with your numbers."], "🥈"); }
    const g = pick([["hydrogen at the cathode (2H⁺ + 2e⁻ → H₂)", 2], ["oxygen at the anode (4OH⁻ → O₂ + 2H₂O + 4e⁻)", 4]]), n = until(() => ri(1, 8), n0 => n0 % g[1] === 0 || g[1] === 2), time = 96500 * n / I;
    return num(`A current of ${I} A flows for ${time} s through dilute sulfuric acid, forming ${g[0]}. What volume of gas is made, in dm³? (F = 96 500 C/mol; 1 mol of gas = 24 dm³.)`, n / g[1] * 24, ["Charge gives moles of electrons; the half-equation gives moles of gas per electron.", "Moles of gas = moles of electrons ÷ (electrons per molecule of gas), then × 24 dm³/mol.", "Example: 0.5 mol of electrons forming hydrogen gives 0.25 mol H₂, which is 6 dm³. Now do yours."], "🎈");
  };
  c.push(les("Mass and volume from electrolysis", [
    ["The chain", "🔗", "Current × time → charge → moles of electrons → moles of product → mass or volume."],
    ["Use the half-equation", "⚖️", "Cu²⁺ + 2e⁻ → Cu: <b>2 mol of electrons per mol of Cu</b>. Ag⁺ + e⁻ → Ag: 1 mol per mol. Al³⁺ + 3e⁻ → Al: 3 mol per mol."],
    ["Worked example", "📝", "10 A for 9650 s: Q = 96 500 C = 1 mol e⁻. For copper: 0.5 mol Cu = 0.5 × 64 = <b>32 g</b>. For hydrogen gas: 0.5 mol H₂ = 12 dm³ at room conditions."]
  ], ["Charge first, then moles of electrons.", "Use the electrons per atom or molecule in the half-equation, then convert with Ar or 24 dm³.", "Example: 0.4 mol electrons for Cu²⁺ + 2e⁻ → Cu gives 0.2 mol Cu = 12.8 g. Now do yours."],
    [mdQ, mdQ, mdQ, mdQ, mdQ, mdQ, mdQ]));

  const rfQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const f = pick([4, 5, 10]), s = ri(1, f - 1), rf = (s / f).toFixed(2), alts = uniq([(f / s).toFixed(2), (s / (f - s)).toFixed(2), ((f - s) / f).toFixed(2), (s / 10).toFixed(2)]).filter(x => x !== rf);
      return mcq(`In paper chromatography the solvent front moved ${f} cm and a spot moved ${s} cm from the baseline. What is the Rf value?`, rf, alts.slice(0, 3), ["Rf compares two distances measured from the baseline.", "Rf = distance moved by the spot ÷ distance moved by the solvent front.", "Example: a spot at 2 cm with the solvent front at 8 cm has Rf = 2 / 8 = 0.25. Now do yours."], "🖍️"); }
    if (t === 1) { const v = until(() => [pick([5, 10, 15, 20]), pick([0.2, 0.4, 0.5, 0.6, 0.8])], ([f, r]) => Math.abs(f * r - Math.round(f * r)) < 1e-9), [f, r] = v;
      return num(`A substance has Rf = ${r}. The solvent front travels ${f} cm. How far (in cm) does the spot move from the baseline?`, Math.round(f * r), ["Rearrange Rf = spot distance / front distance.", "Spot distance = Rf × distance moved by the front.", "Example: Rf = 0.5 and a front of 12 cm gives a spot 6 cm from the baseline. Now do yours."], "🖍️"); }
    return pick([
      mcq("Why is the baseline in chromatography drawn in pencil, not pen?", "Pencil does not dissolve in the solvent", ["Pen ink is too dark to see", "Pencil makes the spots move faster"], ["Think about what the solvent does to the line as it rises.", "Ink contains coloured substances that can dissolve and travel too.", "Example: a pen line would smear into coloured streaks, hiding the real results. Now answer yours."], "🖍️"),
      mcq("Rf values are always...", "between 0 and 1", ["greater than 1", "negative"], ["Compare which distance is bigger: the spot's or the solvent front's.", "The spot cannot travel further than the solvent front.", "Example: a spot that moved 3 cm when the front moved 6 cm has 3/6, a fraction. Now answer yours."], "🖍️"),
      mcq("Two spots have the same Rf in the same solvent on the same paper. They are probably...", "the same substance", ["different substances", "impossible to compare"], ["Rf is a property of a substance under fixed conditions.", "Equal Rf values suggest equal substances.", "Example: if two inks both travel 0.40 of the front's distance, they may be the same dye. Now answer yours."], "🖍️"),
      mcq("A substance more soluble in the solvent and less attracted to the paper will have...", "a higher Rf", ["a lower Rf", "an Rf of exactly 0"], ["Think about which substance the solvent carries further.", "More dissolved and less stuck to the paper means it travels further.", "Example: a substance stuck to the paper stays near the baseline, giving a low Rf. Now answer yours."], "🖍️"),
      mcq("The solvent level at the start must be...", "below the baseline", ["above the baseline", "at the top of the paper"], ["What would happen to the spots if they sat in the liquid?", "The spots must start above the liquid so they can travel up the paper.", "Example: if the baseline is under the solvent, the sample washes into the beaker. Now answer yours."], "🖍️")
    ]);
  };
  c.push(les("Chromatography and Rf values", [
    ["Separating mixtures", "🖍️", "<b>Chromatography</b> separates substances: a <b>mobile phase</b> (solvent) carries them over a <b>stationary phase</b> (paper). Substances that dissolve better and stick less travel further."],
    ["Rf value", "📏", "<b>Rf = distance moved by the spot ÷ distance moved by the solvent front</b>, both measured from the baseline. It is always between 0 and 1."],
    ["Identifying", "🔎", "Same substance, same solvent and paper give the same Rf. Compare unknown spots with known samples. Draw the baseline in <b>pencil</b>."]
  ], ["Measure both distances from the baseline.", "Rf = spot distance divided by front distance.", "Example: a spot at 2 cm with the solvent front at 8 cm has Rf = 2 / 8 = 0.25. Now do yours."],
    [rfQ, rfQ, rfQ, rfQ, rfQ, rfQ, rfQ]));

  const CELLQ = () => { const n = ri(2, 8); return num(`A lead-acid battery cell gives about 2 V. How many volts do ${n} cells in series give?`, n * 2, ["Cells in series add their voltages.", "Multiply the number of cells by 2 V.", "Example: 4 cells of 2 V give 8 V. Now do yours."], "🔋"); };
  c.push(les("Batteries and corrosion", [
    ["Batteries", "🔋", "A battery is galvanic cells in series. <b>Dry cells</b> use zinc as the anode. <b>Lead-acid</b> car batteries (Pb, PbO₂ and H₂SO₄) give 2 V per cell, so six cells make 12 V, and they are <b>rechargeable</b>. Lithium-ion cells are light and rechargeable."],
    ["Rusting", "🟤", "Iron rusts when it is oxidised in the presence of <b>both oxygen and water</b>. Salt speeds it up by helping the current flow."],
    ["Protection", "🛡️", "<b>Paint or oil</b> keeps out air and water. <b>Galvanising</b> coats iron with zinc. <b>Sacrificial protection</b>: a more reactive metal (Mg, Zn) corrodes instead of the iron. <b>Stainless steel</b> contains chromium."]
  ], ["Think about what iron needs to rust and which metals oxidise more easily than iron.", "A more reactive metal (lower E°) is oxidised first and protects the iron.", "Example: bolting a zinc block to a ship's iron hull means zinc corrodes instead. Now do yours."], [
    CELLQ, CELLQ,
    ["What two things does iron need to rust?", "Oxygen and water", "Nitrogen and carbon dioxide", "Light and heat only"],
    ["Zinc is used to galvanise iron. Why does it protect even when scratched?", "Zinc is oxidised in preference to iron", "Zinc is stronger than iron", "Zinc makes the iron colder"],
    ["Which metal block would be a good sacrificial anode on an iron ship?", "Magnesium", "Copper", "Gold"],
    ["Why does salt water make iron rust faster?", "It helps the electric current flow", "It removes oxygen", "It cools the metal"],
    ["Which battery type can be recharged?", "Lead-acid", "A standard zinc-carbon dry cell", "A match"],
    ["In a dry cell, the anode is made of...", "zinc", "gold", "glass"],
    ["Tin plating protects steel only while the coating is...", "unbroken", "wet", "thick and scratched"],
    ["Stainless steel resists rust because it contains...", "chromium", "sugar", "plastic"]
  ]));

  const NAMES = ["methane", "ethane", "propane", "butane", "pentane", "hexane", "heptane", "octane", "nonane", "decane"];
  const FORM = n => `C${n > 1 ? SUBM[0].length ? String(n).replace(/\d/g, d => SUBM[+d]) : n : ""}H${String(2 * n + 2).replace(/\d/g, d => SUBM[+d])}`;
  const alkQ = () => {
    const t = ri(0, 3), n = ri(1, 10);
    if (t === 0) return mcq(`What is the name of the straight-chain alkane with ${n} carbon atom${n > 1 ? "s" : ""}?`, NAMES[n - 1], others(NAMES, NAMES[n - 1], 3), ["Learn the stems: meth-, eth-, prop-, but- for 1 to 4 carbons.", "From 5 carbons the stem comes from Greek numbers (pent-, hex-, hept-, oct-, non-, dec-). All alkanes end in -ane.", "Example: 3 carbons is propane, 6 carbons is hexane. Now do yours."], "⛓️");
    if (t === 1) { const m = ri(3, 12); return num(`How many hydrogen atoms are in an alkane with ${m} carbon atoms? (General formula C<sub>n</sub>H<sub>2n+2</sub>.)`, 2 * m + 2, ["Alkanes follow a pattern based on the number of carbons.", "H = 2 × (carbons) + 2.", "Example: 4 carbons give 2 × 4 + 2 = 10 hydrogens. Now do yours."], "⛓️"); }
    if (t === 2) { const m = ri(2, 12); return num(`An alkane has ${2 * m + 2} hydrogen atoms. How many carbon atoms does it have?`, m, ["Use H = 2C + 2 backwards.", "Subtract 2 from the number of hydrogens, then halve it.", "Example: 12 hydrogens give (12 − 2) / 2 = 5 carbons. Now do yours."], "⛓️"); }
    return mcq(`Which is the molecular formula of ${NAMES[n - 1]}?`, FORM(n), others(uniq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(k => k !== n).map(k => FORM(k))), FORM(n), 3), ["Count the carbons from the name, then use H = 2C + 2.", "Make sure the number of hydrogens matches the alkane pattern, not just the carbon number.", "Example: pentane has 5 carbons so 12 hydrogens: C₅H₁₂. Now do yours."], "⛓️");
  };
  c.push(les("Alkanes: names and formulas", [
    ["Saturated hydrocarbons", "⛓️", "<b>Alkanes</b> contain only carbon and hydrogen with <b>single bonds</b> (saturated). General formula <b>C<sub>n</sub>H<sub>2n+2</sub></b>."],
    ["The stems", "🔤", "1 meth-, 2 eth-, 3 prop-, 4 but-, 5 pent-, 6 hex-, 7 hept-, 8 oct-, 9 non-, 10 dec-. Add <b>-ane</b>: methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀."],
    ["Branches", "🌿", "A side group is named too: <b>2-methylpropane</b> is a three-carbon chain with a CH₃ on carbon 2. Its formula is still C₄H₁₀."]
  ], ["Learn the stems first; the ending tells you the family.", "Carbons set the name; hydrogens follow H = 2C + 2.", "Example: hexane has 6 carbons and 14 hydrogens. Now do yours."],
    [alkQ, alkQ, alkQ, alkQ, alkQ, alkQ, alkQ,
      ["Alkanes are called saturated because they...", "have only single bonds", "contain water", "dissolve in water"],
      ["What is the formula of 2-methylpropane?", "C₄H₁₀", "C₃H₈", "C₅H₁₂"]]));

  const alkeQ = () => {
    const t = ri(0, 2), n = ri(2, 10);
    if (t === 0) return num(`An alkene has ${n} carbon atoms. How many hydrogen atoms does it have? (General formula C<sub>n</sub>H<sub>2n</sub>.)`, 2 * n, ["Alkenes have two fewer hydrogens than the alkane with the same number of carbons.", "H = 2 × (carbons).", "Example: butene (4 carbons) has 8 hydrogens. Now do yours."], "🔗");
    if (t === 1) return num(`An alkyne has ${n} carbon atoms. How many hydrogen atoms does it have? (General formula C<sub>n</sub>H<sub>2n−2</sub>.)`, 2 * n - 2, ["An alkyne has a triple bond, so even fewer hydrogens than an alkene.", "H = 2 × (carbons) − 2.", "Example: butyne (4 carbons) has 6 hydrogens. Now do yours."], "🔗");
    const m = pick([["C₂H₄", "ethene", "alkene"], ["C₃H₆", "propene", "alkene"], ["C₂H₂", "ethyne", "alkyne"], ["C₃H₄", "propyne", "alkyne"]]);
    return mcq(`The hydrocarbon ${m[0]} has one multiple bond. Is it an alkene or an alkyne?`, m[2], ["alkene", "alkyne", "alkane"].filter(x => x !== m[2]), ["Compare its hydrogens with the alkane that has the same carbons.", "Count how many fewer hydrogens it has than 2n + 2: two fewer or four fewer?", "Example: C₄H₈ fits C<sub>n</sub>H<sub>2n</sub> so it is an alkene. Now do yours."], "🔗");
  };
  c.push(les("Alkenes and alkynes", [
    ["Unsaturated", "🔗", "<b>Alkenes</b> have a C=C double bond, general formula <b>C<sub>n</sub>H<sub>2n</sub></b> (ethene C₂H₄, propene C₃H₆). <b>Alkynes</b> have a C≡C triple bond, general formula <b>C<sub>n</sub>H<sub>2n−2</sub></b> (ethyne C₂H₂)."],
    ["Naming", "🏷️", "Alkenes end in <b>-ene</b>, alkynes in <b>-yne</b>. Longer chains give the bond position: but-1-ene has the double bond after carbon 1."],
    ["Test", "🧪", "Orange <b>bromine water</b> turns colourless with an alkene or alkyne (unsaturated), but not with an alkane. Alkenes are very reactive because of the double bond."]
  ], ["Count the carbons first.", "Alkene: 2n hydrogens. Alkyne: 2n − 2 hydrogens. Alkane: 2n + 2.", "Example: pentene has 5 carbons and 10 hydrogens. Now do yours."],
    [alkeQ, alkeQ, alkeQ, alkeQ, alkeQ, alkeQ,
      ["Which reagent test shows that a hydrocarbon is unsaturated?", "Orange bromine water turns colourless", "Litmus turns red", "Limewater turns milky"],
      ["Alkenes are more reactive than alkanes because of the...", "C=C double bond", "extra hydrogen atoms", "metal atoms"]]));

  const FG = [["CH₃CH₂OH", "ethanol", "alcohol"], ["CH₃COOH", "ethanoic acid", "carboxylic acid"], ["CH₃CHO", "ethanal", "aldehyde"], ["CH₃COCH₃", "propanone", "ketone"], ["CH₃COOCH₃", "methyl ethanoate", "ester"], ["CH₃NH₂", "methylamine", "amine"], ["CH₃CH₂Cl", "chloroethane", "halogenoalkane"], ["CH₂=CH₂", "ethene", "alkene"], ["CH₃CH₂CH₂OH", "propan-1-ol", "alcohol"], ["HCOOH", "methanoic acid", "carboxylic acid"], ["CH₃CH₂COOCH₃", "methyl propanoate", "ester"], ["CH₃CH₂CHO", "propanal", "aldehyde"]];
  c.push(les("Functional groups", [
    ["What is a functional group?", "🧩", "A <b>functional group</b> is the part of a molecule that decides how it reacts. Molecules with the same group react in similar ways."],
    ["The common ones", "📋", "<b>–OH</b> alcohol; <b>–COOH</b> carboxylic acid; <b>C=O</b> at the end of a chain: aldehyde, in the middle: ketone; <b>–COO–</b> ester; <b>–NH₂</b> amine; <b>–Cl, –Br</b> halogenoalkane; <b>C=C</b> alkene."],
    ["Spot it", "🔎", "CH₃CH₂OH has –OH: ethanol, an alcohol. CH₃COOH has –COOH: ethanoic acid. CH₃COCH₃ has C=O between two carbons: propanone, a ketone."]
  ], ["Look for the group of atoms that is not just C and H single bonds.", "An O–H, a C=O, a –C(=O)–O– link, a nitrogen or a halogen each point to a different family. Which one does it have?", "Example: CH₃CH₂NH₂ contains –NH₂, which is the amine group. Now do yours."],
    FG.map(([f, nm, g]) => () => mcq(`Which functional group family does <b>${f}</b> (${nm}) belong to?`, g, others(["alcohol", "carboxylic acid", "aldehyde", "ketone", "ester", "amine", "halogenoalkane", "alkene"], g, 3), ["Find the group of atoms that is not just C and H single bonds.", "An O–H, a C=O, a –C(=O)–O– link, a nitrogen or a halogen each point to a different family. Which one does it have?", "Example: CH₃CH₂NH₂ contains –NH₂, which is the amine group. Now do yours."], "🧩"))));

  c.push(les("Isomers", [
    ["Same formula, different structure", "🔀", "<b>Isomers</b> have the <b>same molecular formula</b> but different structures. C₄H₁₀ is butane (straight chain) or 2-methylpropane (branched)."],
    ["Counting", "🔢", "Number of alkane structural isomers: C₄H₁₀ has 2, C₅H₁₂ has 3, C₆H₁₄ has 5, C₇H₁₆ has 9. They grow quickly as the chain grows."],
    ["Different groups", "🧬", "Isomers can have different functional groups: ethanol CH₃CH₂OH and methoxymethane CH₃OCH₃ are both C₂H₆O. Their properties differ a lot (ethanol is a liquid, methoxymethane a gas)."]
  ], ["Compare what is identical and what is different between the molecules.", "Count atoms of each element; if the totals match but the arrangement differs, they are isomers.", "Example: C₃H₈O can be propan-1-ol or propan-2-ol, so they are isomers. Now do yours."], [
    ["How many structural isomers does pentane (C₅H₁₂) have, including itself?", "3", "2", "5"],
    ["How many structural isomers does butane (C₄H₁₀) have, including itself?", "2", "3", "1"],
    ["How many structural isomers does hexane (C₆H₁₄) have, including itself?", "5", "4", "9"],
    ["Which is an isomer of butane (C₄H₁₀)?", "2-methylpropane", "propane", "butene"],
    ["Which is an isomer of ethanol (C₂H₆O)?", "methoxymethane (CH₃OCH₃)", "ethane", "ethanoic acid"],
    ["Which is an isomer of pentane (C₅H₁₂)?", "2,2-dimethylpropane", "hexane", "2-methylpropane"],
    ["Isomers have the same...", "molecular formula", "boiling point", "structure"],
    ["Propan-1-ol and propan-2-ol differ in...", "the position of the –OH group", "the number of carbon atoms", "their molecular formula"],
    ["Which pair are isomers?", "C₂H₅OH and CH₃OCH₃", "CH₄ and C₂H₆", "C₂H₄ and C₂H₆"]
  ]));

  const RX = [
    ["CH₄ + 2O₂ → CO₂ + 2H₂O", "combustion"], ["C₃H₈ + 5O₂ → 3CO₂ + 4H₂O", "combustion"], ["C₂H₄ + Br₂ → C₂H₄Br₂", "addition"], ["C₂H₄ + H₂ → C₂H₆ (nickel catalyst)", "addition"], ["CH₄ + Cl₂ → CH₃Cl + HCl (UV light)", "substitution"], ["C₂H₆ + Br₂ → C₂H₅Br + HBr (UV light)", "substitution"],
    ["CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O", "esterification (condensation)"], ["C₂H₅OH → C₂H₄ + H₂O (hot catalyst)", "elimination (dehydration)"], ["C₂H₄ + H₂O → C₂H₅OH (steam, catalyst)", "addition"], ["CH₃COOC₂H₅ + H₂O → CH₃COOH + C₂H₅OH (acid)", "hydrolysis"]
  ];
  const RXN = ["combustion", "addition", "substitution", "esterification (condensation)", "elimination (dehydration)", "hydrolysis"];
  c.push(les("Organic reaction types", [
    ["Addition", "➕", "In <b>addition</b> two molecules join into one: C₂H₄ + Br₂ → C₂H₄Br₂. It happens with unsaturated compounds (C=C) and uses up the double bond."],
    ["Substitution", "🔁", "In <b>substitution</b> one atom or group replaces another: CH₄ + Cl₂ → CH₃Cl + HCl (needs UV light). Alkanes undergo substitution, not addition."],
    ["Others", "🧪", "<b>Combustion</b> with oxygen gives CO₂ and H₂O. <b>Esterification</b> joins an acid and an alcohol and releases water. <b>Elimination</b> removes a small molecule (like H₂O) to make a C=C. <b>Hydrolysis</b> splits a molecule using water."]
  ], ["Compare the reactants and products: does a molecule get bigger, swap a part, or lose a small molecule?", "Count reactants and products: two molecules joining, an atom swapped for another, a reaction with oxygen, or water being made or used each point to a different type.", "Example: C₂H₄ + Cl₂ → C₂H₄Cl₂ is addition because two molecules join into one. Now do yours."],
    RX.map(([eq, ty]) => () => mcq(`What type of reaction is <b>${eq}</b>?`, ty, others(RXN, ty, 3), ["Compare the reactants and products: does a molecule get bigger, swap a part, or lose a small molecule?", "Count reactants and products: two molecules joining, an atom swapped for another, a reaction with oxygen, or water being made or used each point to a different type.", "Example: C₂H₄ + Cl₂ → C₂H₄Cl₂ is addition because two molecules join into one. Now do yours."], "⚗️"))));

  const cbQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = pick([1, 3, 5, 7, 9]);
      return num(`How many moles of O₂ are needed to burn 1 mol of the alkane C${n}H${2 * n + 2} completely? (C<sub>n</sub>H<sub>2n+2</sub> + (3n+1)/2 O₂ → nCO₂ + (n+1)H₂O.)`, (3 * n + 1) / 2, ["Count the O atoms needed in the products: 2 per CO₂ plus 1 per H₂O.", "O₂ moles = half the number of O atoms needed.", "Example: for C₂H₆ the products 2CO₂ + 3H₂O contain 7 oxygen atoms, which is 3.5 mol of O₂ per mol of C₂H₆. Now do yours."], "🔥"); }
    if (t === 1) { const n = ri(2, 9);
      return num(`How many moles of CO₂ form when 1 mol of the alkane C${n}H${2 * n + 2} burns completely?`, n, ["Every carbon atom ends up in a CO₂ molecule.", "Moles of CO₂ equals the number of carbons.", "Example: 1 mol of C₄H₁₀ gives 4 mol of CO₂. Use a different alkane for yours."], "🔥"); }
    if (t === 2) { const n = ri(2, 9);
      return num(`How many moles of H₂O form when 1 mol of the alkane C${n}H${2 * n + 2} burns completely?`, n + 1, ["Every pair of hydrogen atoms ends up in one H₂O.", "Moles of H₂O = (number of hydrogens) ÷ 2.", "Example: 1 mol of C₃H₈ has 8 H, so 4 mol H₂O. Now do yours."], "🔥"); }
    const n = pick([2, 4, 6, 8]);
    return num(`How many moles of O₂ are needed to burn 1 mol of the alkene C${n}H${2 * n} completely? (C<sub>n</sub>H<sub>2n</sub> + (3n/2) O₂ → nCO₂ + nH₂O.)`, 3 * n / 2, ["Count the O atoms in the products: 2 per CO₂ and 1 per H₂O.", "For an alkene, products are n CO₂ and n H₂O, needing 3n oxygen atoms, so O₂ = 3n/2.", "Example: for C₂H₄: 2CO₂ + 2H₂O needs 6 O atoms = 3 mol O₂. Use a different alkene for yours."], "🔥");
  };
  c.push(les("Combustion of hydrocarbons", [
    ["Complete combustion", "🔥", "A hydrocarbon burning in plenty of oxygen gives only <b>CO₂ and H₂O</b>. Not enough oxygen gives CO (poisonous) or carbon (soot)."],
    ["Balancing", "⚖️", "1) Carbons → CO₂. 2) Hydrogens ÷ 2 → H₂O. 3) Count all O atoms on the right and halve for O₂. Propane: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O."],
    ["Ratios", "🔢", "Moles of CO₂ = number of carbons; moles of H₂O = hydrogens ÷ 2. For alkanes, O₂ needed = (3n + 1)/2 moles per mole."]
  ], ["Count how many CO₂ and H₂O molecules you get first.", "Add up the oxygen atoms in the products, then halve to get O₂.", "Example: propane C₃H₈ gives 3 CO₂ and 4 H₂O: 6 + 4 = 10 O atoms = 5 O₂. Now do yours."],
    [cbQ, cbQ, cbQ, cbQ, cbQ, cbQ,
      ["Incomplete combustion of a hydrocarbon can produce the poisonous gas...", "carbon monoxide", "carbon dioxide", "oxygen"],
      ["Complete combustion of a hydrocarbon produces...", "carbon dioxide and water", "carbon monoxide and hydrogen", "only carbon"]]));

  const plQ = () => {
    const t = ri(0, 1);
    if (t === 0) { const n = pick([100, 200, 500, 1000]);
      return num(`A poly(ethene) chain is made from ${n} ethene molecules (C₂H₄, Mr = 28). Ignoring the end groups, what is the relative mass of the polymer chain?`, 28 * n, ["Addition polymerisation joins the monomers without losing any atoms.", "Chain mass = number of monomers × Mr of one monomer.", "Example: 50 units of a monomer with Mr 42 give 50 × 42 = 2100. Now do yours."], "🧵"); }
    const n = pick([50, 100, 250, 400]);
    return num(`A poly(ethene) chain is made from ${n} ethene molecules (C₂H₄). How many carbon atoms are in the chain backbone?`, 2 * n, ["Each ethene unit has two carbons and they all join the chain.", "Carbons = 2 × number of monomers.", "Example: 30 ethene units give 60 carbons. Now do yours."], "🧵");
  };
  c.push(les("Polymers", [
    ["Addition polymers", "🧵", "Many small <b>monomers</b> with a C=C bond join into a long <b>polymer</b> with no other product: ethene → poly(ethene); chloroethene → PVC; propene → poly(propene); tetrafluoroethene → PTFE."],
    ["Condensation polymers", "🔗", "Monomers with two functional groups join and lose a small molecule (usually <b>water</b>). Diamine + dicarboxylic acid → <b>nylon</b>. Diol + diacid → <b>polyester</b>. Amino acids → <b>proteins</b>. Glucose → starch."],
    ["Plastics and the planet", "🌍", "Most addition polymers are not biodegradable, so they last a long time. Recycling and biodegradable polymers (like PLA from plants) help to reduce waste."]
  ], ["Look at how the monomer joins up: by opening a bond, or by losing a small molecule when two end groups meet?", "Think about which atoms or groups the monomer has at its ends or in its middle that let it link into a chain.", "Example: chloroethene (C=C) makes PVC by addition. Now do yours."], [
    plQ, plQ,
    ["The monomer of poly(ethene) is...", "ethene", "ethane", "ethanol"],
    ["PVC is made from the monomer...", "chloroethene", "chloroethane", "ethanoic acid"],
    ["Addition polymerisation needs a monomer with a...", "C=C double bond", "–COOH group only", "metal ion"],
    ["Condensation polymerisation also produces...", "a small molecule such as water", "only the polymer", "a metal"],
    ["Nylon is made from...", "a diamine and a dicarboxylic acid", "ethene", "glucose only"],
    ["Proteins are condensation polymers of...", "amino acids", "ethene molecules", "alkanes"],
    ["Why can plastics in the environment be a problem?", "Most do not rot (not biodegradable)", "They are too heavy to move", "They dissolve completely in water"]
  ]));

  const NUC = [["uranium-238", 238, 92, "α", 234, 90], ["radium-226", 226, 88, "α", 222, 86], ["polonium-210", 210, 84, "α", 206, 82], ["thorium-232", 232, 90, "α", 228, 88], ["radon-222", 222, 86, "α", 218, 84], ["carbon-14", 14, 6, "β", 14, 7], ["sodium-24", 24, 11, "β", 24, 12], ["strontium-90", 90, 38, "β", 90, 39], ["cobalt-60", 60, 27, "β", 60, 28], ["sodium-22", 22, 11, "β+", 22, 10], ["fluorine-18", 18, 9, "β+", 18, 8]];
  const nuQ = () => {
    const [nm, A, Z, ty, A2, Z2] = pick(NUC), word = ty === "α" ? "alpha decay (emits ⁴₂He)" : ty === "β" ? "beta-minus decay (emits an electron)" : "positron decay (emits a positron)";
    const h = ty === "α" ? "Example: an alpha particle carries away 4 mass units and 2 protons, so a nucleus with A = 100, Z = 50 becomes A = 96, Z = 48. Now do yours." : ty === "β" ? "Example: in beta-minus decay a neutron becomes a proton, so A = 40, Z = 18 becomes A = 40, Z = 19. Now do yours." : "Example: in positron decay a proton becomes a neutron, so A = 40, Z = 19 becomes A = 40, Z = 18. Now do yours.";
    if (ri(0, 1) === 0) return num(`${nm[0].toUpperCase() + nm.slice(1)} (mass number ${A}, atomic number ${Z}) undergoes ${word}. What is the <b>mass number</b> of the new nucleus?`, A2, [ty === "α" ? "An alpha particle is a helium nucleus: 4 particles in total." : ty === "β" ? "A beta particle is an electron with almost no mass." : "A positron has almost no mass.", ty === "α" ? "Subtract the alpha particle's mass number (4) from the starting mass number." : "Compare the total number of protons plus neutrons before and after: an electron or positron adds or removes none.", h], "☢️");
    return num(`${nm[0].toUpperCase() + nm.slice(1)} (mass number ${A}, atomic number ${Z}) undergoes ${word}. What is the <b>atomic number</b> of the new nucleus?`, Z2, [ty === "α" ? "The alpha particle takes away 2 protons." : ty === "β" ? "A neutron turns into a proton in the nucleus." : "A proton turns into a neutron in the nucleus.", ty === "α" ? "Subtract 2 from the atomic number." : ty === "β" ? "The atomic number goes up by 1." : "The atomic number goes down by 1.", h], "☢️");
  };
  c.push(les("Nuclear equations", [
    ["Balancing nuclei", "☢️", "In a nuclear equation the <b>mass numbers</b> (top) and the <b>atomic numbers</b> (bottom) must each balance on both sides."],
    ["Alpha and beta", "🔄", "<b>Alpha</b> (⁴₂He): A drops by 4, Z drops by 2. <b>Beta-minus</b> (electron): A stays the same, Z rises by 1 (neutron → proton). <b>Positron</b>: A same, Z drops by 1. <b>Gamma</b>: no change in A or Z."],
    ["Worked example", "📝", "U-238 (Z = 92) → alpha decay → A = 238 − 4 = <b>234</b>, Z = 92 − 2 = <b>90</b> (thorium-234)."]
  ], ["Decide which kind of decay it is and what it carries away.", "Think about the mass, charge and penetrating power of each type of radiation.", "Example: A = 100, Z = 50 emitting an alpha particle becomes A = 96, Z = 48. Now do yours."],
    [nuQ, nuQ, nuQ, nuQ, nuQ, nuQ,
      ["Which radiation is stopped by a sheet of paper?", "Alpha", "Beta", "Gamma"],
      ["Which radiation needs thick lead or concrete to reduce it?", "Gamma", "Alpha", "Beta"],
      ["In beta-minus decay, a ... changes into a ...", "neutron into a proton", "proton into a neutron", "proton into an alpha particle"]]));

  const cdQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(1, 4), frac = ["1/2", "1/4", "1/8", "1/16"][n - 1];
      return num(`A bone has ${frac} of the original carbon-14 left. The half-life of carbon-14 is 5730 years. How old is the bone, in years?`, 5730 * n, ["Work out how many halvings take you from 1 down to that fraction.", "Age = number of half-lives × the half-life of carbon-14.", "Example: 1/32 left means 5 half-lives, so 5 × 5730 years. Now do yours."], "🦴"); }
    if (t === 1) { const n = ri(2, 4), a0 = pick([5, 10, 20]) * Math.pow(2, n);
      return num(`A sample of iodine-131 (half-life 8 days) starts at ${a0} mg. How many mg remain after ${8 * n} days?`, a0 / Math.pow(2, n), ["Count the half-lives that have passed (days ÷ 8).", "Halve the mass once for each half-life.", "Example: 40 mg after 16 days (2 half-lives): 40 → 20 → 10 mg. Now do yours."], "💊"); }
    const n = ri(2, 4), a0 = pick([100, 200, 400]) * Math.pow(2, n - 1);
    return num(`A radioactive source has an activity of ${a0 * 2} counts per minute. Its half-life is 6 hours. What is the activity after ${6 * n} hours (counts per minute)?`, a0 * 2 / Math.pow(2, n), ["Activity falls by half in each half-life, just like the mass does.", "Divide by 2 for every half-life that has passed.", "Example: 800 counts per minute after 2 half-lives falls to 200. Now do yours."], "📟");
  };
  c.push(les("Radioactive dating and half-life uses", [
    ["Carbon dating", "🦴", "Living things take in carbon-14 from the air. When they die, no new C-14 comes in and it decays with a half-life of <b>5730 years</b>. Count how much is left to find the age (up to roughly 50 000 years)."],
    ["Method", "📝", "Fraction left 1/2 → 1 half-life; 1/4 → 2; 1/8 → 3. <b>Age = (number of half-lives) × t½</b>."],
    ["Other uses", "💊", "Short-lived isotopes such as technetium-99m (6 hours) are used in medical scans. Uranium-238 in rocks (half-life billions of years) dates Earth materials."]
  ], ["Find how many times the amount has been halved.", "Multiply that number of half-lives by the half-life in years or days.", "Example: 1/8 left means 3 half-lives. Now do yours."],
    [cdQ, cdQ, cdQ, cdQ, cdQ, cdQ,
      ["Carbon-14 dating is used on...", "once-living things like wood and bone", "metal coins", "granite rocks that are millions of years old"],
      ["After death an organism's carbon-14 amount...", "decreases over time", "stays the same", "increases"],
      ["Why are short half-life isotopes used in medical scans?", "They decay quickly and leave the body soon", "They never decay", "They are not radioactive"]]));

  const grQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const M = pick([["BaSO₄", 233, "barium chloride", "sulfate", 1], ["CaCO₃", 100, "sodium carbonate", "calcium", 1], ["AgCl", 143.5, "silver nitrate", "chloride", 2], ["AgBr", 188, "silver nitrate", "bromide", 1]]), n = M[1] % 1 ? 2 * ri(1, 5) : ri(1, 6);
      return num(`An excess of reagent is added to a solution containing ${n} mmol of ${M[3]} ions. All of it forms solid ${M[0]} (Mr = ${M[1]}) in a 1 : 1 ratio. What mass of ${M[0]} is formed, in mg? (1 mmol × Mr = mass in mg.)`, n * M[1], ["Moles of precipitate equal moles of ion because the ratio is 1 : 1.", "mass (mg) = mmol × Mr.", "Example: 4 mmol of a precipitate with Mr 100 gives 400 mg. Now do yours."], "⚖️"); }
    if (t === 1) { const M = pick([["BaSO₄", 233], ["CaCO₃", 100], ["AgBr", 188]]), n = ri(1, 9);
      return num(`A student collects, dries and weighs ${n * M[1]} mg of ${M[0]} (Mr = ${M[1]}) from a sample. How many mmol of ${M[0]} is this?`, n, ["Convert mass to moles by dividing by the relative formula mass.", "mmol = mass in mg ÷ Mr.", "Example: 500 mg of a compound with Mr 100 is 5 mmol. Now do yours."], "⚖️"); }
    const n = ri(2, 6);
    return num(`Pb²⁺ reacts with iodide: Pb²⁺ + 2I⁻ → PbI₂(s). If ${2 * n} mmol of I⁻ react completely, how many mmol of PbI₂ precipitate?`, n, ["Use the mole ratio in the equation.", "2 mol of I⁻ makes 1 mol of PbI₂.", "Example: 10 mmol of I⁻ makes 5 mmol of PbI₂. Now do yours."], "🟡");
  };
  c.push(les("Gravimetric analysis", [
    ["Weighing a precipitate", "⚖️", "In <b>gravimetric analysis</b> you add an excess of a reagent to precipitate an ion, then <b>filter, wash, dry and weigh</b> the solid. The mass gives the amount of ion."],
    ["The steps", "📝", "1) Mass of precipitate. 2) Moles = mass ÷ Mr. 3) Use the equation's ratio to get moles of the ion. 4) Convert back to mass or concentration."],
    ["Good practice", "🧼", "Wash the precipitate to remove other ions. <b>Dry to constant mass</b> (weigh again after more heating until the mass stops changing). Use an excess of reagent so all the ion precipitates."]
  ], ["Moles from mass first: mass divided by Mr.", "Use the 1 : 1 or 2 : 1 ratio from the equation.", "Example: 400 mg of a precipitate with Mr 100 is 4 mmol. Now do yours."],
    [grQ, grQ, grQ, grQ, grQ, grQ,
      ["Why is a precipitate dried to constant mass?", "To be sure all the water has gone", "To make it more coloured", "To make it dissolve"],
      ["Why is the reagent added in excess in gravimetric analysis?", "So that all of the ion precipitates", "To make the solid dissolve", "To make the solution neutral"]]));

  c.push(mix("Mixed practice", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])));
  c.push(mix("Level 24 Challenge", at(c, [1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17])));

  Object.assign(CHEM_LEVELS, { 22: a, 23: b, 24: c });
})();
