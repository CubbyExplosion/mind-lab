// ext/logic-25-27.js  Mind Lab Logic & Puzzles levels 25-27 (60 lessons)
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const big = (t, s = 1.8) => `<span style="font-size:${s}em">${t}</span>`;
  const norm = v => String(v).trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w.\-]/g, "");
  const mcq = (text, visual, right, wrongs, hints) => {
    right = String(right);
    const seen = new Set([norm(right)]), w = [];
    for (const x of wrongs.map(String)) { const k = norm(x); if (!seen.has(k)) { seen.add(k); w.push(x); } }
    return { text, visual, choices: shuf([right, ...w.slice(0, 3)]), answer: right, hints };
  };
  const num = (text, visual, answer, hints) => ({ text, visual, answer, hints });
  const tfq = (text, visual, val, hints) => ({ text, visual, choices: ["true", "false"], answer: val ? "true" : "false", hints });
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => a / gcd(a, b) * b;
  const comb = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const mixOf = ms => () => pick(ms)();
  const MIXS = topics => [
    S("Review time!", "🔄", "This lesson mixes puzzles from earlier lessons in this level. Take your time with each one."),
    S("Remember", "🧠", topics),
    S("Tip", "💡", "Work out what kind of puzzle it is first. Then use the method you learned for that kind.")
  ];
  const showS = a => "{" + a.join(", ") + "}";
  const rset = (U, lo, hi) => shuf(Array.from({ length: U }, (_, i) => i + 1)).slice(0, ri(lo, hi)).sort((a, b) => a - b);
  const lines = ls => `<div style="font-size:1.3em;line-height:1.6">${ls.join("<br>")}</div>`;
  const W = s => s.replace(/¬/g, "not ").replace(/∧/g, " and ").replace(/∨/g, " or ").replace(/→/g, " implies ").replace(/↔/g, " iff ").replace(/⊕/g, " xor ").replace(/\s+/g, " ").replace(/\( /g, "(").replace(/ \)/g, ")").trim();
  const hy = s => `${s} (${W(s)})`;
  const TFw = b => (b ? "true" : "false");

  // ---------- tiny logic engine (p q r s with ¬ ∧ ∨ ⊕ → ↔) ----------
  const compile = src => {
    const t = src.match(/[pqrs]|[¬∧∨→↔⊕()]/g); let i = 0;
    const iff = () => { let a = imp(); while (t[i] === "↔") { i++; const x = a, y = imp(); a = e => x(e) === y(e); } return a; };
    const imp = () => { const a = or(); if (t[i] === "→") { i++; const b = imp(); return e => !a(e) || b(e); } return a; };
    const or = () => { let a = and(); while (t[i] === "∨" || t[i] === "⊕") { const op = t[i++], x = a, y = and(); a = op === "∨" ? (e => x(e) || y(e)) : (e => x(e) !== y(e)); } return a; };
    const and = () => { let a = not(); while (t[i] === "∧") { i++; const x = a, y = not(); a = e => x(e) && y(e); } return a; };
    const not = () => { if (t[i] === "¬") { i++; const a = not(); return e => !a(e); } return atom(); };
    const atom = () => { const c = t[i++]; if (c === "(") { const a = iff(); i++; return a; } return e => e[c]; };
    return iff();
  };
  const tt = (src, vars = ["p", "q", "r"]) => {
    const f = compile(src), n = vars.length, out = [];
    for (let k = 0; k < (1 << n); k++) { const e = {}; vars.forEach((v, j) => { e[v] = !!((k >> (n - 1 - j)) & 1); }); out.push(f(e)); }
    return out;
  };
  const sameTT = (a, b, vars) => { const x = tt(a, vars), y = tt(b, vars); return x.every((v, i) => v === y[i]); };
  const stripP = s => { if (s[0] !== "(" || s[s.length - 1] !== ")") return s; let d = 0; for (let i = 0; i < s.length; i++) { if (s[i] === "(") d++; if (s[i] === ")") d--; if (d === 0 && i < s.length - 1) return s; } return s.slice(1, -1); };
  const OPSYM = ["∧", "∨", "→", "↔", "⊕"];
  const genF = (vars, d) => {
    if (d === 0) { const v = pick(vars); return Math.random() < 0.3 ? "¬" + v : v; }
    const s = `(${genF(vars, d - 1)} ${pick(OPSYM)} ${genF(vars, ri(0, d - 1))})`;
    return Math.random() < 0.15 ? "¬" + s : s;
  };
  const negL = l => (l[0] === "¬" ? l.slice(1) : "¬" + l);

  // ======================= LEVEL 25 =======================
  const evalF = () => {
    const vars = pick([["p", "q"], ["p", "q", "r"], ["p", "q", "r"]]);
    let src; do { src = genF(vars, ri(1, 2)); } while (!/[∧∨→↔⊕]/.test(src));
    const env = {}; vars.forEach(v => { env[v] = Math.random() < 0.5; });
    const val = compile(src)(env);
    return tfq(`${vars.map(v => `${v} is ${TFw(env[v])}`).join(", ")}. Is this statement true or false?`, big(stripP(src), 1.5), val, [
      "Write the true or false value under each letter first. Then work from the innermost brackets outwards, one step at a time.",
      "Reminders: p → q is false only when p is true and q is false. p ↔ q is true when both sides match. p ⊕ q is true when the two sides differ. Do each ¬ before the rest.",
      "Example: with x true and y false, (x → y) ∨ ¬y: first x → y is false, ¬y is true, and false ∨ true is true. Now do yours."]);
  };
  const CL = [["it rains", "the game is cancelled"], ["Ana studies", "Ana passes"], ["the door is open", "the cat gets out"], ["the sun is out", "we go to the park"], ["the battery is charged", "the robot moves"], ["Leo trains", "Leo wins"]];
  const TR = [
    [(P, Q) => `${cap(P)} only if ${Q}.`, "p → q", ["q → p", "p ↔ q", "¬p → q"], "“Only if” points forward. Ask yourself: if P happens, what must also be true?", "Example: “I win only if I train” means: if I win, then I trained. Now do yours."],
    [(P, Q) => `${cap(P)} if ${Q}.`, "q → p", ["p → q", "p ∧ q", "p ↔ q"], "“If” puts the condition after the word “if”. Which statement is the condition and which is the result?", "Example: “The lamp glows if the switch is on” means: if the switch is on, then the lamp glows. Now do yours."],
    [(P, Q) => `${cap(P)} unless ${Q}.`, "¬q → p", ["q → p", "p ∧ ¬q", "p → ¬q"], "“Unless” means “if not”. What must happen if the second thing does not happen?", "Example: “We swim unless it storms” means: if it does not storm, then we swim. Now do yours."],
    [(P, Q) => `${cap(P)}, but not ${Q}.`, "p ∧ ¬q", ["p ∨ ¬q", "¬p ∧ q", "p → ¬q"], "“But” works like “and”. Both parts must hold at the same time.", "Example: “I have a dog but not a cat” is: dog and not cat. Now do yours."],
    [(P, Q) => `It is not true that both ${P} and ${Q}.`, "¬(p ∧ q)", ["¬p ∧ ¬q", "p ∧ ¬q", "¬p ∨ q"], "Say the sentence out loud. The “not” covers the whole “both … and …”.", "Example: “not both soup and salad” is ¬(soup ∧ salad): you can have one, but not both. Now do yours."],
    [(P, Q) => `Neither ${P} nor ${Q}.`, "¬p ∧ ¬q", ["¬p ∨ ¬q", "p ∨ q", "¬p → q"], "“Neither … nor …” says that the first does not happen and also the second does not happen.", "Example: “neither tea nor coffee” means: no tea and no coffee. Now do yours."],
    [(P, Q) => `${cap(P)} if and only if ${Q}.`, "p ↔ q", ["p → q", "q → p", "p ∧ q"], "“If and only if” goes both ways. Is it one arrow or two?", "Example: “A triangle is equal-sided if and only if all its angles are equal” goes in both directions. Now do yours."],
    [(P, Q) => `${cap(Q)} is necessary for ${P}.`, "p → q", ["q → p", "p ↔ q", "¬p → ¬q"], "“Necessary” means you cannot have the first without it. If P is true, what must be true?", "Example: “Oxygen is necessary for fire” means: if there is fire, there is oxygen. Now do yours."],
    [(P, Q) => `${cap(Q)} is sufficient for ${P}.`, "q → p", ["p → q", "p ↔ q", "¬q → ¬p"], "“Sufficient” means it is enough. If this one is true, what follows?", "Example: “Rain is sufficient for wet grass” means: if it rains, the grass is wet. Now do yours."]
  ];
  const translateQ = () => {
    const [P, Q] = pick(CL), t = pick(TR);
    return mcq(`Let p = “${P}” and q = “${Q}”. Which formula says: <b>${t[0](P, Q)}</b>`, big("📝"), hy(t[1]), t[2].map(hy), [
      "Find the two little statements and name them p and q. Then decide which one is the condition.",
      t[3], t[4]]);
  };
  const CLS = ["p ∨ ¬p", "p ∧ ¬p", "(p ∧ q) → p", "p → (p ∨ q)", "(p → q) ∨ (q → p)", "¬(p ∧ ¬p)", "(p ∧ (p → q)) → q", "((p → q) ∧ (q → r)) → (p → r)", "(p ∧ q) → (p ∨ q)", "¬(p ∧ q) ↔ (¬p ∨ ¬q)",
    "(p ∨ q) ∧ ¬p ∧ ¬q", "p ↔ ¬p", "(p → q) ∧ p ∧ ¬q", "(p ∧ q) ∧ ¬p", "¬(p ∨ ¬p)", "p → q", "p ∧ q", "p ∨ q", "(p ∨ q) → p", "p ↔ q", "(p → q) → p", "(p ∧ q) → ¬p", "p → (q ∧ ¬q)", "(p ∨ q) → (p ∧ q)", "(p → q) ∧ (q → r)"];
  const classifyQ = () => {
    const s = pick(CLS), rows = tt(s), kind = rows.every(x => x) ? "tautology" : rows.every(x => !x) ? "contradiction" : "neither";
    return mcq("Is this statement always true (a tautology), always false (a contradiction), or neither?", big(s, 1.5), kind, ["tautology", "contradiction", "neither"].filter(x => x !== kind).concat(["neither"]).slice(0, 2), [
      "Think about all the rows of its truth table, not just one.",
      "Try to find one row where it is true and one row where it is false. What does it mean if you can find both, or only one kind?",
      "Example: q ∨ ¬q. If q is true, the left part is true. If q is false, ¬q is true. Every row is true, so it is a tautology. Now do yours."]);
  };
  const condQ = () => {
    for (;;) {
      const vs = shuf(["p", "q"]), A = Math.random() < 0.5 ? vs[0] : "¬" + vs[0], B = Math.random() < 0.5 ? vs[1] : "¬" + vs[1];
      const base = `${A} → ${B}`;
      const cand = [`${negL(A)} ∨ ${B}`, `${negL(B)} → ${negL(A)}`, `¬(${A} ∧ ${negL(B)})`, `${B} → ${A}`, `${negL(A)} → ${negL(B)}`, `${A} ∧ ${negL(B)}`, `${A} ∨ ${negL(B)}`, `${negL(A)} ∧ ${B}`];
      const eq = cand.filter(c => sameTT(base, c, ["p", "q"])), ne = cand.filter(c => !sameTT(base, c, ["p", "q"]));
      if (eq.length < 3 || ne.length < 3) continue;
      if (Math.random() < 0.5) return mcq(`Which of these means exactly the same as <b>${base}</b>?`, big("⚖️"), hy(pick(eq)), ne.map(hy), [
        "Two statements mean the same when their truth tables match in every row.",
        "An if-then is false in just one row: left part true, right part false. The right answer is false in that row and only that row.",
        "Example: x → y has the same meaning as ¬x ∨ y, and also as ¬y → ¬x. Now do yours."]);
      return mcq(`Three of these mean the same as <b>${base}</b>. Which one does <b>not</b>?`, big("⚖️"), hy(pick(ne)), eq.slice(0, 3).map(hy), [
        "Check each choice against the if-then: it is false only when the left part is true and the right part is false.",
        "Find the row where " + base + " is false. The odd one out behaves differently in that row, or in another row.",
        "Example: x → y means the same as ¬x ∨ y and ¬y → ¬x, but not y → x. Now do yours."]);
    }
  };
  const falsifyQ = () => {
    const vs = ["p", "q", "r", "s"], na = ri(1, 2), nc = ri(1, 2), lit = v => (Math.random() < 0.4 ? { v, n: true } : { v, n: false });
    const A = vs.slice(0, na).map(lit), C = vs.slice(na, na + nc).map(lit), used = vs.slice(0, na + nc);
    const ls = x => (x.n ? "¬" : "") + x.v, side = (a, op) => (a.length > 1 ? `(${a.map(ls).join(` ${op} `)})` : ls(a[0]));
    const val = {}; A.forEach(x => { val[x.v] = !x.n; }); C.forEach(x => { val[x.v] = x.n; });
    const fmt = e => used.map(v => `${v}=${e[v] ? "T" : "F"}`).join(", ");
    const others = []; for (let k = 0; k < (1 << used.length); k++) { const e = {}; used.forEach((v, j) => { e[v] = !!((k >> j) & 1); }); if (fmt(e) !== fmt(val)) others.push(fmt(e)); }
    return mcq(`Which assignment makes <b>${side(A, "∧")} → ${side(C, "∨")}</b> false? (T = true, F = false)`, big("🔍", 1.6), fmt(val), shuf(others), [
      "An if-then is false in exactly one situation. Which one?",
      "The left part must be true and the right part must be false. For each letter, work out what value makes its piece do that (a ¬ flips things).",
      "Example: for (a ∧ ¬b) → c to be false: a must be T, ¬b must be T so b is F, and c must be F. That gives a=T, b=F, c=F. Now do yours."]);
  };
  const DOMQ = [["x is even", x => x % 2 === 0], ["x is greater than 3", x => x > 3], ["x² is less than 50", x => x * x < 50], ["x is prime", x => x > 1 && Array.from({ length: x - 2 }, (_, i) => i + 2).every(d => x % d)], ["x divides 12", x => 12 % x === 0], ["x + 3 is odd", x => (x + 3) % 2 === 1], ["x² is bigger than x", x => x * x > x], ["x is a multiple of 3", x => x % 3 === 0]];
  const domainQ = () => {
    const D = rset(12, 4, 5), [d, f] = pick(DOMQ), all = Math.random() < 0.5, val = all ? D.every(f) : D.some(f);
    return tfq(`Is this statement true or false?<br><b>${all ? "For every" : "There is an"} x in ${showS(D)}${all ? "," : " such that"} ${d}.</b>`, big(all ? "∀" : "∃", 2), val, [
      all ? "A “for every” statement needs the property to hold for each member. Test them one by one." : "A “there is” statement needs only one member with the property. Test them one by one.",
      all ? "One member that fails is enough to make a “for every” statement false." : "One member that works is enough to make a “there is” statement true. It is false only if none work.",
      "Example: in {2, 4, 5}, “for every x, x is even” is false because 5 fails; “there is an x that is even” is true because 2 works. Now do yours."]);
  };
  const orderQ = () => {
    const kinds = [["∀x ∃y R(x, y)", "Every x has at least one y that it points to.", R => [1, 2, 3, 4].every(x => [1, 2, 3, 4].some(y => R.has(x + "" + y)))],
      ["∃x ∀y R(x, y)", "Some x points to every y.", R => [1, 2, 3, 4].some(x => [1, 2, 3, 4].every(y => R.has(x + "" + y)))],
      ["∀y ∃x R(x, y)", "Every y is pointed to by at least one x.", R => [1, 2, 3, 4].every(y => [1, 2, 3, 4].some(x => R.has(x + "" + y)))],
      ["∃y ∀x R(x, y)", "Some y is pointed to by every x.", R => [1, 2, 3, 4].some(y => [1, 2, 3, 4].every(x => R.has(x + "" + y)))]];
    const k = pick(kinds), want = Math.random() < 0.5; let R, tries = 0;
    do { R = new Set(); const n = ri(5, 9); while (R.size < n) R.add(ri(1, 4) + "" + ri(1, 4)); if (want && Math.random() < 0.5) { const y = ri(1, 4); [1, 2, 3, 4].forEach(x => R.add(x + "" + y)); } } while (k[2](R) !== want && ++tries < 400);
    const pairs = [...R].sort().map(s => `(${s[0]}, ${s[1]})`).join(" ");
    return tfq(`R is the set of pairs: ${pairs}. The letters x and y can be 1, 2, 3 or 4. Is this true or false?<br><b>${k[0]}</b> &nbsp; (${k[1]})`, big("🔗", 1.6), k[2](R), [
      "Read the symbols from left to right: the first quantifier is chosen first, then the second one may depend on it.",
      "For “∀x ∃y”, take each x in turn and look for its own y. For “∃x ∀y”, you must find one single x that works with all y. Do the same with the roles swapped for the other two kinds.",
      "Example: R = (1,2) (2,2) (3,1) on {1,2,3}. ∀x ∃y R: each of 1, 2, 3 starts a pair, so true. ∃y ∀x R: no y is reached from all three, so false. Now do yours."]);
  };
  const setOpQ = () => {
    for (;;) {
      const A = rset(12, 4, 7), B = rset(12, 4, 7), C = rset(12, 3, 6), a = new Set(A), b = new Set(B), c = new Set(C);
      const T = [
        ["A ∪ B", () => new Set([...a, ...b]), "Add the sizes of A and B, then take away the elements counted twice (the ones in both).", "Example: A = {1,2,3}, B = {3,4}: the union is {1,2,3,4}, so 4. Now do yours."],
        ["A ∩ B", () => new Set([...a].filter(x => b.has(x))), "Look for the elements that are written in both sets.", "Example: A = {1,2,3}, B = {3,4}: only 3 is in both, so 1. Now do yours."],
        ["A − B (the elements of A that are not in B)", () => new Set([...a].filter(x => !b.has(x))), "Go through A and cross out every element that also appears in B.", "Example: A = {1,2,3}, B = {3,4}: cross out 3 and keep {1,2}, so 2. Now do yours."],
        ["(A ∪ B) − C", () => new Set([...a, ...b].filter(x => !c.has(x))), "First make the union of A and B. Then take out anything that is in C.", "Example: A = {1,2,3}, B = {3,4}, C = {2,4}: the union {1,2,3,4} loses 2 and 4, leaving {1,3}, so 2. Now do yours."],
        ["A ∩ B ∩ C", () => new Set([...a].filter(x => b.has(x) && c.has(x))), "An element must be in all three sets at once.", "Example: A = {1,2,3}, B = {2,3}, C = {3,4}: only 3 is in all three, so 1. Now do yours."],
        ["A ∩ (B ∪ C)", () => new Set([...a].filter(x => b.has(x) || c.has(x))), "Find B ∪ C first. Then keep the elements of A that are in it.", "Example: A = {1,2,3}, B = {2}, C = {3,4}: B ∪ C = {2,3,4}; A keeps {2,3}, so 2. Now do yours."]
      ];
      const [nm, f, h2, h3] = pick(T), res = f().size;
      if (res < 1 || new Set(A.filter(x => b.has(x))).size < 1) continue;
      return num(`A = ${showS(A)}<br>B = ${showS(B)}<br>C = ${showS(C)}<br>How many elements does <b>${nm}</b> have?`, big("🔵🟢"), res, ["Write out the new set, then count its elements.", h2, h3]);
    }
  };
  const compQ = () => {
    const N = ri(10, 14), A = rset(N, 4, 7), B = rset(N, 4, 7), a = new Set(A), b = new Set(B), U = Array.from({ length: N }, (_, i) => i + 1);
    const T = [
      ["Aᶜ (everything in the universe that is not in A)", U.filter(x => !a.has(x)).length, "Aᶜ is the rest of the universe. Count the universe, then take away A.", "Example: universe {1..8}, A = {2,3}: Aᶜ has 8 − 2 = 6 elements. Now do yours."],
      ["(A ∪ B)ᶜ", U.filter(x => !a.has(x) && !b.has(x)).length, "Find A ∪ B first, then everything outside it.", "Example: universe {1..8}, A = {2,3}, B = {3,4}: A ∪ B = {2,3,4}, outside it are 5 elements. Now do yours."],
      ["Aᶜ ∩ B", U.filter(x => !a.has(x) && b.has(x)).length, "These are the elements of B that are not in A.", "Example: universe {1..8}, A = {2,3}, B = {3,4}: B without A is {4}, so 1. Now do yours."],
      ["A △ B (the elements in exactly one of A and B)", U.filter(x => a.has(x) !== b.has(x)).length, "Do not count the elements that are in both. Count those that are in only one of the two sets.", "Example: A = {2,3}, B = {3,4}: in exactly one are 2 and 4, so 2. Now do yours."],
      ["(A ∩ B)ᶜ", U.filter(x => !(a.has(x) && b.has(x))).length, "Find the elements in both sets first. Everything else in the universe counts.", "Example: universe {1..8}, A = {2,3}, B = {3,4}: A ∩ B = {3}, so 8 − 1 = 7. Now do yours."]
    ];
    const t = pick(T);
    if (t[1] < 1) return compQ();
    return num(`The universe is {1, 2, …, ${N}}.<br>A = ${showS(A)}<br>B = ${showS(B)}<br>How many elements does <b>${t[0]}</b> have?`, big("🌍"), t[1], ["Mark each number of the universe: in A, in B, in both or in neither. Then count what the question asks for.", t[2], t[3]]);
  };
  const keyOf = x => (Array.isArray(x) ? "{" + x.map(keyOf).sort().join(",") + "}" : String(x));
  const showOf = x => (Array.isArray(x) ? (x.length ? "{" + x.map(showOf).join(", ") + "}" : "∅") : String(x));
  const elemQ = () => {
    const nums = shuf([1, 2, 3, 4, 5, 6]).slice(0, ri(2, 3)), A = nums.slice();
    for (let i = ri(1, 2); i > 0; i--) { const s = shuf([1, 2, 3, 4, 5, 6]).slice(0, ri(1, 2)); if (!A.some(e => keyOf(e) === keyOf(s))) A.push(s); }
    if (Math.random() < 0.3) A.push([]);
    const ak = new Set(A.map(keyOf)), want = Math.random() < 0.5, pool = A.concat([1, 2, 3, 4, 5, 6]); let st, val, tries = 0;
    do {
      if (Math.random() < 0.5) { const it = Math.random() < 0.5 ? pick(A) : (Math.random() < 0.5 ? ri(1, 6) : shuf([1, 2, 3, 4, 5, 6]).slice(0, ri(0, 2))); st = { it, kind: "∈" }; val = ak.has(keyOf(it)); }
      else { const S2 = shuf(pool).slice(0, ri(0, 2)); st = { it: S2, kind: "⊆" }; val = S2.every(e => ak.has(keyOf(e))); }
    } while (val !== want && ++tries < 300);
    return tfq(`A = ${showOf(A)}<br>Is this true or false?<br><b>${showOf(st.it)} ${st.kind} A</b>`, big("🧺"), val, [
      "∈ means “is one of the items of A”. ⊆ means “every item of the left set is an item of A”. Look at the outermost brackets of A.",
      "Brackets matter: 3 and {3} are different things. For ⊆, check the items of the left set one at a time against the items of A.",
      "Example: B = {1, {2}}. Then 1 ∈ B is true, {2} ∈ B is true, but 2 ∈ B is false. Also {1} ⊆ B is true, but {2} ⊆ B is false. Now do yours."]);
  };
  const cartQ = () => {
    for (;;) {
      const A = rset(8, 2, 5), B = rset(8, 2, 5), pr = []; A.forEach(a => B.forEach(b => pr.push([a, b])));
      const T = [
        [`How many pairs (a, b) are in A × B?`, pr.length, "Each element of A can be paired with each element of B. Multiply the two sizes.", "Example: A = {1,2}, B = {5,6,7}: 2 × 3 = 6 pairs. Now do yours."],
        [`How many pairs (a, b) in A × B have a &lt; b?`, pr.filter(p => p[0] < p[1]).length, "List the pairs systematically: take each a in turn and count the b values that are bigger.", "Example: A = {1,3}, B = {2,4}: (1,2) (1,4) (3,4) work, so 3. Now do yours."],
        [`How many pairs (a, b) in A × B have a + b even?`, pr.filter(p => (p[0] + p[1]) % 2 === 0).length, "A sum is even when both are even or both are odd. Count the evens and odds in each set.", "Example: A = {1,2}, B = {3,4,5}: odd–odd pairs 1 × 2 = 2, even–even pairs 1 × 1 = 1, so 3. Now do yours."],
        [`How many pairs (a, b) in A × B have a ≠ b?`, pr.filter(p => p[0] !== p[1]).length, "All the pairs, minus the pairs where the two entries are the same number.", "Example: A = {1,2}, B = {2,3}: 4 pairs, one of them is (2,2), so 3. Now do yours."],
        [`How many pairs (a, b) in A × B have a dividing b?`, pr.filter(p => p[1] % p[0] === 0).length, "For each a, count how many of the numbers in B it divides exactly.", "Example: A = {2,3}, B = {4,6,7}: 2 divides 4 and 6, 3 divides 6, so 3. Now do yours."]
      ];
      const t = pick(T); if (t[1] < 1) continue;
      return num(`A = ${showS(A)} and B = ${showS(B)}.<br>${t[0]}`, big("🧮"), t[1], ["A × B is the set of all ordered pairs with the first entry from A and the second from B.", t[2], t[3]]);
    }
  };
  const stir = (() => { const s = [[1]]; for (let n = 1; n <= 8; n++) { s[n] = []; for (let k = 0; k <= n; k++) s[n][k] = n === 0 ? (k === 0 ? 1 : 0) : (k === 0 ? 0 : (s[n - 1][k] || 0) * k + (s[n - 1][k - 1] || 0)); } return s; })();
  const blocksQ = () => {
    if (Math.random() < 0.3) {
      const n = ri(3, 5), b = stir[n].reduce((x, y) => x + y, 0);
      return num(`In how many ways can ${n} different friends be split into any number of non-empty teams? (The order of the teams does not matter.)`, big("👥"), b, [
        "Think about where one particular friend goes: in a team alone, or joined to a team made from the others.",
        "Count the splits by the number of teams: exactly 1 team, exactly 2 teams, and so on. Add the counts. Build up from smaller groups.",
        "Example: for 2 friends: both together, or apart, so 2 ways. For 3 friends you can build on that. Now do yours."]);
    }
    const n = ri(4, 7), k = ri(2, Math.min(4, n - 1));
    return num(`In how many ways can ${n} different friends be split into exactly ${k} non-empty teams? (The teams are not named and the order does not matter.)`, big("👥"), stir[n][k], [
      "Add the last friend to a split of the others: they either start a new team, or join one of the existing teams.",
      "Use: ways(n, k) = k × ways(n − 1, k) + ways(n − 1, k − 1). Fill a small table starting from ways(1, 1) = 1.",
      "Example: ways(3, 2) = 2 × ways(2, 2) + ways(2, 1) = 2 × 1 + 1 = 3. Now do yours."]);
  };
  const classQ = () => {
    const m = ri(3, 7), N = ri(m * 2 + 1, 30), cls = r => Array.from({ length: N }, (_, i) => i + 1).filter(x => x % m === r).length;
    const T = ri(0, 3);
    if (T === 0) return num(`On the numbers 1, 2, …, ${N}, say a ~ b when a and b leave the same remainder when divided by ${m}. How many different groups (equivalence classes) are there?`, big("🗂️"), m, ["Each number lands in the group of its remainder. How many different remainders exist?", "List the possible remainders when dividing by that number, starting at 0. Check that the list of numbers is long enough for each of them to show up.", "Example: same remainder on division by 4 on 1..20: remainders 0, 1, 2, 3, so 4 groups. Now do yours."]);
    if (T === 1) { const x = ri(1, N); return num(`On the numbers 1, 2, …, ${N}, say a ~ b when a and b leave the same remainder when divided by ${m}. How many numbers are in the class of ${x} (including ${x} itself)?`, big("🗂️"), cls(x % m), ["Find the remainder of the number, then count everyone with that remainder.", `The class is x, x ± ${m}, x ± ${2 * m}, … as long as it stays between 1 and ${N}.`, "Example: on 1..20 with remainder mod 5, the class of 7 is 2, 7, 12, 17: 4 numbers. Now do yours."]); }
    if (T === 2) return num(`On the numbers 1, 2, …, ${N}, say a ~ b when a and b leave the same remainder when divided by ${m}. How many numbers are in the biggest class?`, big("🗂️"), Math.max(...Array.from({ length: m }, (_, r) => cls(r))), ["Split 1..N into groups by remainder. Some groups get one extra number.", `${N} divided by ${m} gives full rounds plus a leftover. The leftover numbers start the first remainders again.`, "Example: on 1..22 with mod 5: 22 = 4 × 5 + 2, so the biggest class has 5 numbers. Now do yours."]);
    let pairs = 0; for (let r = 0; r < m; r++) pairs += cls(r) * cls(r);
    return num(`On the numbers 1, 2, …, ${N}, say a ~ b when a and b leave the same remainder when divided by ${m}. How many ordered pairs (a, b) satisfy a ~ b? (Pairs like (3, 3) count.)`, big("🗂️"), pairs, ["A pair is related only inside one class. Work out how big each class is.", "A class with c numbers gives c × c ordered pairs. Add this up over all classes.", "Example: classes of sizes 3 and 2 give 3 × 3 + 2 × 2 = 13 pairs. Now do yours."]);
  };
  const floorQ = () => {
    const T = ri(0, 2);
    if (T < 2) {
      let x; do { x = (ri(-59, 59) / 10); } while (Number.isInteger(x) || x === -1.2);
      const fl = Math.floor(x), ce = Math.ceil(x), isF = T === 0, right = isF ? fl : ce;
      return mcq(`What is ${isF ? "⌊" + x + "⌋ (the floor)" : "⌈" + x + "⌉ (the ceiling)"}?`, big("📏"), right, [right - 1, right + 1, isF ? ce : fl, right + (right > 0 ? 2 : -2)], [
        "Picture the number on a number line. Find the two whole numbers it sits between.",
        "The floor is the whole number just below it (or at it). The ceiling is the whole number just above it (or at it). Below means further left.",
        "Example: −1.2 lies between −2 and −1, so ⌊−1.2⌋ = −2 and ⌈−1.2⌉ = −1. Now do yours."]);
    }
    const b = ri(3, 9), a = ri(b + 2, 60); if (a % b === 0) return floorQ();
    return Math.random() < 0.5 ? num(`What is ⌊${a}/${b}⌋ + ⌈${a}/${b}⌉?`, big("📏"), Math.floor(a / b) + Math.ceil(a / b), ["Work out the division as a decimal or a whole number with remainder.", `The result is not a whole number, so the floor and the ceiling are two neighbours.`, "Example: ⌊17/5⌋ + ⌈17/5⌉ = 3 + 4 = 7. Now do yours."])
      : num(`${a} people need to be driven. Each car holds ${b}. What is the smallest number of cars?`, big("🚗"), Math.ceil(a / b), ["Divide the people by the seats. Can the answer be a part of a car?", "If there is a leftover, one more car is needed. That is the ceiling.", "Example: 17 people, 5 seats: 17 ÷ 5 = 3 and a bit, so 4 cars. Now do yours."]);
  };
  const algProofQ = () => {
    const a = ri(2, 6), b = ri(1, 6);
    if (Math.random() < 0.6) { const w = ri(0, 2), nm = ["k²", "k", "the number with no k"][w], v = [a * a, 2 * a * b, b * b][w];
      return num(`In a proof, a number is written n = ${a}k + ${b}. Multiply out n² = (${a}k + ${b})². What is the coefficient of <b>${nm}</b>?`, big("✍️"), v, [
        "Use (u + v)² = u² + 2uv + v², where u = " + a + "k and v = " + b + ".",
        w === 0 ? "The k² part comes only from squaring the first term." : w === 1 ? "The k part comes from the middle term 2uv." : "The part without k comes from squaring the last term.",
        "Example: (3k + 2)² = 9k² + 12k + 4. The coefficient of k² is 9, of k is 12, and the constant is 4. Now do yours."]); }
    const c = ri(2, 5), d = ri(1, 5);
    return num(`In a proof, n = ${a}k + ${b} and m = ${c}k + ${d}. Multiply out n × m. What is the coefficient of <b>k</b>?`, big("✍️"), a * d + b * c, [
      "Multiply each term of the first bracket by each term of the second.",
      "The k terms come from (first k-term × last number) plus (last number × second k-term).",
      "Example: (2k + 3)(4k + 5) = 8k² + 10k + 12k + 15, so the k coefficient is 22. Now do yours."]);
  };
  const RULES = [
    ["modus ponens", (P, Q) => [`If ${P}, then ${Q}.`, cap(P) + ".", `So ${Q}.`], "The first line is an if-then and the second line gives its “if” part.", "affirm"],
    ["modus tollens", (P, Q) => [`If ${P}, then ${Q}.`, `It is not true that ${Q}.`, `So it is not true that ${P}.`], "The first line is an if-then and the second line denies its “then” part.", "deny"],
    ["hypothetical syllogism", (P, Q, R) => [`If ${P}, then ${Q}.`, `If ${Q}, then ${R}.`, `So if ${P}, then ${R}.`], "Two if-then lines are chained, with the middle statement disappearing.", "chain"],
    ["disjunctive syllogism", (P, Q) => [`${cap(P)} or ${Q}.`, `It is not true that ${P}.`, `So ${Q}.`], "The first line offers two options and the second line rules one of them out.", "or"],
    ["affirming the consequent (a mistake)", (P, Q) => [`If ${P}, then ${Q}.`, cap(Q) + ".", `So ${P}.`], "The second line repeats the “then” part and the conclusion jumps back to the “if” part.", "bad1"],
    ["denying the antecedent (a mistake)", (P, Q) => [`If ${P}, then ${Q}.`, `It is not true that ${P}.`, `So it is not true that ${Q}.`], "The second line denies the “if” part and the conclusion denies the “then” part.", "bad2"],
    ["addition", (P, Q) => [cap(P) + ".", `So ${P} or ${Q}.`], "From one true statement, you build an “or” by adding anything.", "add"],
    ["simplification", (P, Q) => [`${cap(P)} and ${Q}.`, `So ${P}.`], "From an “and” statement you keep only one part.", "simp"]
  ];
  const ARGC = [["it rains", "the grass gets wet", "the shoes get muddy"], ["Ana studies", "Ana passes", "Ana is happy"], ["the alarm rings", "we wake up", "we are late"], ["the shop is open", "we buy bread", "we make toast"], ["the robot has power", "the robot moves", "the robot reaches the door"]];
  const ruleQ = () => {
    const i = ri(0, RULES.length - 1), r = RULES[i], [P, Q, R] = pick(ARGC), j = (i + ri(1, RULES.length - 1)) % RULES.length, o = RULES[j];
    const wrongs = shuf(RULES.filter((_, k) => k !== i).map(x => x[0])).slice(0, 3);
    return mcq("Which rule of reasoning (or mistake) does this argument use?<br><i>" + r[1](P, Q, R).join("<br>") + "</i>", big("🧩"), r[0], wrongs, [
      "Replace the sentences with letters P, Q (and R). Which pattern of letters do you see?",
      "Pattern clue: " + r[2],
      "Example: this argument is called " + o[0] + ":<br><i>" + o[1]("I train", "I get faster", "I win") .join(" ") + "</i> Now compare the pattern of yours."]);
  };
  const SIMP = [["(p ∧ q) ∨ (p ∧ ¬q)", "p"], ["p ∨ (p ∧ q)", "p"], ["p ∧ (p ∨ q)", "p"], ["(p ∨ q) ∧ (p ∨ ¬q)", "p"], ["¬(¬p ∨ ¬q)", "p ∧ q"], ["¬(¬p ∧ ¬q)", "p ∨ q"], ["p ∧ (¬p ∨ q)", "p ∧ q"], ["p ∨ (¬p ∧ q)", "p ∨ q"], ["¬(p → q)", "p ∧ ¬q"], ["(p → q) ∧ (p → ¬q)", "¬p"], ["(p ∨ q) ∧ ¬p", "¬p ∧ q"], ["¬(p ∨ q) ∨ p", "p ∨ ¬q"], ["(p ∧ q) ∨ ¬p", "¬p ∨ q"], ["p ∧ ¬(p ∧ q)", "p ∧ ¬q"], ["¬p → p", "p"], ["(p → q) → q", "p ∨ q"]];
  const SIMC = ["p", "q", "¬p", "¬q", "p ∧ q", "p ∨ q", "p ∧ ¬q", "¬p ∧ q", "p ∨ ¬q", "¬p ∨ q", "¬p ∧ ¬q", "¬p ∨ ¬q"];
  const simpQ = () => {
    const [f, s] = pick(SIMP), sw = Math.random() < 0.5, T = x => (sw ? x.replace(/[pq]/g, c => (c === "p" ? "q" : "p")) : x);
    const ff = T(f), right = T(s), wr = shuf(SIMC.map(T)).filter(c => !sameTT(c, right, ["p", "q"])).slice(0, 3);
    return mcq("Which short statement means exactly the same as the long one?", big(ff, 1.4), hy(right), wr.map(hy), [
      "Make a truth table for the long statement with two letters: only four rows.",
      "Write down its four results (true or false). Then find the short statement with exactly the same four results.",
      "Example: (p ∧ q) ∨ q has four results: T, F, T, F in the order TT, TF, FT, FF, which is the same as just q. Now do yours."]);
  };
  const ARGP = ["p", "q", "r", "¬p", "¬q", "¬r", "p → q", "q → r", "p → r", "p ∨ q", "q ∨ r", "p ∧ q", "¬p ∨ q", "p ↔ q", "¬q → ¬p", "q → p", "r → q", "¬q ∨ r", "p → ¬q"];
  const argQ = () => {
    const want = Math.random() < 0.5; let pr, cn, tries = 0, rowsOK;
    do {
      pr = shuf(ARGP).slice(0, ri(2, 3)); cn = pick(ARGP);
      const rs = ["TTT", "TTF", "TFT", "TFF", "FTT", "FTF", "FFT", "FFF"].map(k => ({ p: k[0] === "T", q: k[1] === "T", r: k[2] === "T" }));
      const fs = pr.map(compile), c = compile(cn), good = rs.filter(e => fs.every(f => f(e)));
      rowsOK = good.length >= 1 && !pr.includes(cn) && (good.every(e => c(e)) === want);
    } while (!rowsOK && ++tries < 600);
    const valid = (() => { const rs = Array.from({ length: 8 }, (_, k) => ({ p: !!(k & 4), q: !!(k & 2), r: !!(k & 1) })); const fs = pr.map(compile), c = compile(cn); return rs.filter(e => fs.every(f => f(e))).every(e => c(e)); })();
    return mcq(`Premises: ${pr.map(x => `<b>${x}</b>`).join(" and ")}.<br>Conclusion: <b>${cn}</b>.<br>Is the argument valid (the conclusion is true whenever all the premises are true)?`, big("⚖️"), valid ? "valid" : "invalid", [valid ? "invalid" : "valid"], [
      "A valid argument never has all its premises true while the conclusion is false.",
      "Find the rows of the truth table where every premise is true. Check the conclusion in those rows only.",
      "Example: premises a → b and b; conclusion a. The row a = F, b = T makes both premises true but the conclusion false, so that argument is invalid. Now do yours."]);
  };

  const mk25 = [evalF, translateQ, classifyQ, condQ, falsifyQ, domainQ, orderQ, setOpQ, compQ, elemQ, cartQ, blocksQ, classQ, floorQ, algProofQ, ruleQ, simpQ, argQ];
  const L25 = [
    L("Evaluating formulas", evalF, [S("Symbols", "🔣", "∧ means AND, ∨ means OR, ¬ means NOT, → means IF-THEN, ↔ means IF AND ONLY IF, ⊕ means exactly one."), S("Inside out", "🧅", "Put true or false under each letter. Evaluate the innermost brackets first."), S("Two special ones", "⚠️", "p → q is false only for (true, false). p ↔ q is true when both sides have the same value.")]),
    L("Only if, unless, and if", translateQ, [S("If", "➡️", "“P if Q” means Q → P. The thing after “if” is the condition."), S("Only if", "🔒", "“P only if Q” means P → Q. “Q is necessary for P” is P → Q too, and “Q is sufficient for P” is Q → P."), S("Unless", "🚫", "“P unless Q” means “if not Q then P”. “Neither P nor Q” means ¬P ∧ ¬Q.")]),
    L("Tautology or contradiction?", classifyQ, [S("Three kinds", "🏷️", "A tautology is true in every row. A contradiction is false in every row. Anything else is neither."), S("Search", "🔍", "To show something is not a tautology, find one row where it is false."), S("Examples", "📋", "p ∨ ¬p is a tautology. p ∧ ¬p is a contradiction. p → q is neither.")]),
    L("Same meaning as an if-then", condQ, [S("Rewrites", "🔁", "p → q means the same as ¬p ∨ q, and the same as ¬q → ¬p (the contrapositive)."), S("Negation", "🚫", "¬(p → q) means p ∧ ¬q. So ¬(p ∧ ¬q) means the same as p → q."), S("Not the same", "❌", "The converse q → p and the inverse ¬p → ¬q are different from p → q.")]),
    L("Making an if-then false", falsifyQ, [S("One way to fail", "💥", "A → B is false in exactly one case: A true and B false."), S("Pieces", "🧩", "A ∧ B is true only if both are true. A ∨ B is false only if both are false."), S("Work backwards", "⏪", "Set every piece of the left side true and every piece of the right side false.")]),
    L("Quantifiers on small sets", domainQ, [S("For every", "∀", "∀ means “for every”. One failure makes it false."), S("There is", "∃", "∃ means “there exists”. One success makes it true."), S("Method", "🧪", "Check the members of the small set one at a time.")]),
    L("Order of quantifiers", orderQ, [S("Order matters", "↕️", "∀x ∃y: each x may have its own y. ∃y ∀x: there is one y that works for all x."), S("Stronger", "💪", "Swapping to ∃y ∀x asks for more, so it is often false when ∀x ∃y is true."), S("Check", "📋", "List, for each x, which y values work. Then see if one y appears for everyone.")]),
    L("Set sizes", setOpQ, [S("Operations", "🔵", "A ∪ B: in A or B. A ∩ B: in both. A − B: in A but not in B."), S("Build in steps", "🪜", "Do the brackets first and write the new set, then count."), S("Check", "✅", "|A ∪ B| = |A| + |B| − |A ∩ B|.")]),
    L("Complements and symmetric difference", compQ, [S("Complement", "🌍", "Aᶜ is everything in the universe that is not in A."), S("Symmetric difference", "🔀", "A △ B has the elements in exactly one of the two sets."), S("Count", "🔢", "|A △ B| = |A| + |B| − 2 × |A ∩ B|.")]),
    L("Element or subset?", elemQ, [S("Element", "∈", "x ∈ A means x is one of the items of A."), S("Subset", "⊆", "S ⊆ A means every item of S is an item of A."), S("Nested sets", "🪆", "3 and {3} are different. The empty set ∅ is a subset of every set, but an element only if it is written inside.")]),
    L("Pairs from two sets", cartQ, [S("Ordered pairs", "🔗", "A × B holds all pairs (a, b) with a in A and b in B. Order matters."), S("Size", "✖️", "|A × B| = |A| × |B|."), S("With a rule", "📏", "To count pairs that fit a rule, go through each a and count the matching b.")]),
    L("Splitting a set into groups", blocksQ, [S("Partition", "🧺", "Cut a set into non-empty groups. Every item is in exactly one group."), S("New or join", "➕", "The last item either makes a new group alone, or joins one of the groups made from the others."), S("Table", "📝", "ways(n, k) = k × ways(n − 1, k) + ways(n − 1, k − 1). Totals for 1, 2, 3, 4, 5 items: 1, 2, 5, 15, 52.")]),
    L("Same-remainder groups", classQ, [S("Equivalence", "🟰", "A relation that is reflexive, symmetric and transitive splits a set into classes."), S("Remainders", "🕐", "Numbers with the same remainder on division by m belong to the same class."), S("Counting", "🔢", "There are m classes. Their sizes differ by at most one on 1..N.")]),
    L("Floor and ceiling", floorQ, [S("Floor", "⬇️", "⌊x⌋ is the greatest whole number that is not above x."), S("Ceiling", "⬆️", "⌈x⌉ is the smallest whole number that is not below x."), S("Negative numbers", "➖", "⌊−2.3⌋ = −3 and ⌈−2.3⌉ = −2. Floor always goes to the left on the number line.")]),
    L("Algebra inside a proof", algProofQ, [S("Write numbers as formulas", "✍️", "Even: n = 2k. Odd: n = 2k + 1. Remainder r on division by m: n = mk + r."), S("Expand", "🧮", "(ak + b)² = a²k² + 2abk + b². Then see what can be taken out as a common factor."), S("Example", "📌", "(2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd.")]),
    L("Name the rule", ruleQ, [S("Good rules", "✅", "Modus ponens: P → Q, P, so Q. Modus tollens: P → Q, not Q, so not P. Hypothetical syllogism chains two if-thens."), S("More good rules", "➕", "Disjunctive syllogism: P or Q, not P, so Q. Addition: from P, get P or Q. Simplification: from P and Q, get P."), S("Mistakes", "🚧", "From P → Q and Q you cannot conclude P. From P → Q and not P you cannot conclude not Q.")]),
    L("Simplify the formula", simpQ, [S("Same truth table", "📋", "Two formulas mean the same if every row gives the same result."), S("Handy laws", "🔧", "p ∨ (p ∧ q) = p. p ∧ (p ∨ q) = p. p ∨ (¬p ∧ q) = p ∨ q."), S("Method", "🧪", "Write the four rows, compute the long formula, then match it against the short choices.")]),
    L("Valid or invalid argument?", argQ, [S("Valid", "✅", "An argument is valid when the conclusion is true in every row where all premises are true."), S("Invalid", "❌", "Find a row where all premises are true and the conclusion is false. That one row proves it is invalid."), S("Not about truth", "🧠", "A valid argument can have false premises. Validity is about the form.")]),
    L("Mixed practice", mixOf(mk25), MIXS("Formulas, translations, set operations, quantifiers, groups, floor and ceiling, and arguments.")),
    L("Level 25 Challenge", mixOf(mk25), MIXS("Level 25 mixes propositional logic, quantifiers, sets and counting.")),
  ];

  // ======================= LEVEL 26 =======================
  const startQ = () => {
    const T = ri(0, 2); let desc, ok, h3;
    if (T === 0) { const a = pick([2, 3]), k = pick([2, 3]), b = pick([1, 2, 5, 10]); if (a === 3 && k === 3 && b === 1) return startQ(); desc = `${a}ⁿ &gt; ${b === 1 ? "" : b + " × "}n${k === 2 ? "²" : "³"}`; ok = n => Math.pow(a, n) > b * Math.pow(n, k); }
    else if (T === 1) { const c = pick([2, 3, 4, 5]); desc = `n! &gt; ${c}ⁿ`; ok = n => fact(n) > Math.pow(c, n); }
    else { const c = pick([5, 10, 20, 30, 50]); desc = `2ⁿ &gt; ${c} × n`; ok = n => Math.pow(2, n) > c * n; }
    let n0 = 1; for (let n = 1; n <= 60; n++) if (!ok(n)) n0 = n + 1;
    return num(`The statement “${desc}” is true for all n from some point on. What is the smallest n₀ such that it is true for n₀ and for every larger whole number? (Check n = 1, 2, 3, …)`, big("🪜"), n0, [
      "An induction proof needs a base case where the statement is true, then a step that keeps it true. First find where the statement starts to hold for good.",
      "Make a table of both sides for n = 1, 2, 3, … Find the last n where the statement fails. The start is the next number.",
      "Example: 2ⁿ &gt; n + 10. For n = 1, 2, 3 it fails (2, 4, 8 against 11, 12, 13). For n = 4: 16 &gt; 14 is true, and it stays true. So it starts at 4. Now do yours."]);
  };
  const charQ = () => {
    let r, s; do { r = ri(2, 7); s = ri(1, r - 1); } while ((r === 3 && s === 2));
    const S2 = r + s, P = r * s, T = ri(0, 2), rule = `a(n) = ${S2} × a(n−1) − ${P} × a(n−2)`;
    if (T < 2) return num(`A sequence follows the rule <b>${rule}</b>. Its growth rates are the solutions of x² = ${S2}x − ${P}. What is the ${T === 0 ? "larger" : "smaller"} solution?`, big("📈"), T === 0 ? r : s, [
      "Try a(n) = xⁿ in the rule and divide everything by the smallest power of x. You get a quadratic equation.",
      `Move everything to one side: x² − ${S2}x + ${P} = 0. Find two numbers that multiply to ${P} and add to ${S2}.`,
      "Example: a(n) = 5 × a(n−1) − 6 × a(n−2) gives x² − 5x + 6 = 0, which factors as (x − 2)(x − 3), so the solutions are 2 and 3. Now do yours."]);
    const a = [0, 1]; for (let i = 2; i <= 6; i++) a.push(S2 * a[i - 1] - P * a[i - 2]);
    const n = ri(4, 6);
    return num(`A sequence starts a(0) = 0, a(1) = 1 and follows <b>${rule}</b>. What is a(${n})?`, big("📈"), a[n], [
      "Use the rule again and again, using the two numbers just before.",
      `Each new term is ${S2} times the previous term, minus ${P} times the term before that. Write the terms in a list.`,
      "Example: with a(n) = 3 × a(n−1) − 2 × a(n−2) and a(0) = 0, a(1) = 1: the terms are 0, 1, 3, 7, 15. Now do yours."]);
  };
  const multiQ = () => {
    if (Math.random() < 0.25) { const n = ri(3, 8); return num(`When (x + y + z)<sup>${n}</sup> is multiplied out and like terms are collected, how many different terms appear?`, big("🧮"), comb(n + 2, 2), [
      "Each term is x^i y^j z^k with i + j + k = n. Count the ways to choose i, j, k.",
      "Count with sticks: n objects and 2 dividers in a row. Choose where the dividers go.",
      "Example: (a + b + c)² has 6 terms: a², b², c², ab, ac, bc. That is C(4, 2) = 6. Now do yours."]); }
    const n = ri(4, 7); let i = ri(0, n), j = ri(0, n - i); const k = n - i - j; if (i + j + k !== n || (i === n || j === n || k === n)) return multiQ();
    const ex = (e, v) => (e === 0 ? "" : e === 1 ? v : `${v}<sup>${e}</sup>`);
    return num(`In the expansion of (x + y + z)<sup>${n}</sup>, what is the coefficient of <b>${ex(i, "x")}${ex(j, "y")}${ex(k, "z")}</b>?`, big("🧮"), fact(n) / (fact(i) * fact(j) * fact(k)), [
      `Each factor contributes an x, a y or a z. The term needs ${i} x's, ${j} y's and ${k} z's out of ${n} factors. Count the arrangements.`,
      "This is arranging letters with repeats: n! divided by the factorial of each repeat count (0! = 1).",
      "Example: in (a + b + c)³ the coefficient of a²b is 3! ÷ (2! × 1!) = 3. Now do yours."]);
  };
  const hockeyQ = () => {
    const T = ri(0, 4);
    if (T < 3) { const r = ri(1, 3), n = ri(5, 12); let sum = 0; for (let i = r; i <= n; i++) sum += comb(i, r);
      return num(`Add these numbers from Pascal’s triangle: C(${r}, ${r}) + C(${r + 1}, ${r}) + … + C(${n}, ${r}). What is the total?`, big("🔺"), sum, [
        "These numbers run down a diagonal of Pascal’s triangle. Is there a shortcut for a sum along a diagonal?",
        "The sum of a diagonal from the edge down to some entry equals the entry just below and next to the last one. Use that, or add them one by one.",
        "Example: C(2,2) + C(3,2) + C(4,2) = 1 + 3 + 6 = 10, which is C(5, 3). Now do yours."]); }
    const n = ri(4, 12);
    if (T === 3) return num(`A set has ${n} members. How many of its subsets have an even number of members (including the empty set)?`, big("🔺"), Math.pow(2, n - 1), [
      "Compare the number of subsets of even size with the number of odd size.",
      "Pick all members except one in any way you like. Then the last member can be added or left out to fix the parity. How many choices for the first part?",
      "Example: with 3 members there are 8 subsets, 4 of even size (the empty set and 3 pairs). Now do yours with the same idea."]);
    return num(`Add C(${n}, 0) + C(${n}, 1) + C(${n}, 2) + … + C(${n}, ${n}). What is the total?`, big("🔺"), Math.pow(2, n), [
      "This is a whole row of Pascal’s triangle added up.",
      "A row adds up to the number of subsets of a set. Each member is either in or out.",
      "Example: row 3 is 1, 3, 3, 1 and adds to 8 = 2³. Now do yours."]);
  };
  const ontoQ = () => {
    const m = pick([2, 2, 3, 3, 4]), n = m === 2 ? ri(3, 7) : m === 3 ? ri(3, 6) : ri(4, 6);
    let tot = 0; for (let j = 0; j <= m; j++) tot += (j % 2 ? -1 : 1) * comb(m, j) * Math.pow(m - j, n);
    return num(`How many functions from a set of ${n} elements <b>onto</b> a set of ${m} elements are there? (Onto: every element of the target set is used at least once.)`, big("🎯"), tot, [
      "Count all functions first. Then remove the ones that miss at least one target element.",
      "Inclusion–exclusion: all functions, minus those missing one chosen target (times the number of targets), plus those missing two chosen targets, and so on.",
      "Example: 2 elements onto 2 targets: all 2² = 4 functions, minus the 2 functions that use only one target: 4 − 2 = 2. Now do yours."]);
  };
  const composeQ = () => {
    for (;;) {
      const mk = () => { const s = new Set(); const n = ri(3, 5); while (s.size < n) s.add(ri(1, 4) + "" + ri(1, 4)); return [...s].sort(); };
      const R = mk(), Sx = mk(), show = a => a.map(x => `(${x[0]}, ${x[1]})`).join(" ");
      if (Math.random() < 0.7) {
        const comp = new Set(); R.forEach(r => Sx.forEach(s => { if (r[1] === s[0]) comp.add(r[0] + s[1]); }));
        if (comp.size < 1) continue;
        return num(`R = ${show(R)}<br>S = ${show(Sx)}<br>The composition S∘R has the pair (a, c) when some b has (a, b) in R and (b, c) in S. How many pairs are in S∘R?`, big("🔗"), comp.size, [
          "Take each pair (a, b) of R and look for pairs of S that start with that b.",
          "Each match (a, b) with (b, c) gives the pair (a, c). Write them all down and remove any repeats before counting.",
          "Example: R = (1,2) (2,3), S = (2,4) (3,1): (1,2) meets (2,4) gives (1,4); (2,3) meets (3,1) gives (2,1). That is 2 pairs. Now do yours."]);
      }
      const set = new Set(R), els = [1, 2, 3, 4], M = {}; els.forEach(a => els.forEach(b => { M[a + "" + b] = set.has(a + "" + b); }));
      els.forEach(k => els.forEach(i => els.forEach(j => { if (M[i + "" + k] && M[k + "" + j]) M[i + "" + j] = true; })));
      const added = Object.values(M).filter(Boolean).length - set.size;
      if (added < 1) continue;
      return num(`R = ${show(R)} on the numbers 1, 2, 3, 4. How many pairs must be added to R to make it transitive, adding as few as possible?`, big("🔗"), added, [
        "Transitive means: if (a, b) and (b, c) are both in, then (a, c) must be in too.",
        "Find every chain a → b → c in the pairs. Add the missing shortcut. New pairs can create new chains, so repeat until nothing is missing. Then count the new ones.",
        "Example: R = (1,2) (2,3) (3,4): add (1,3), (2,4), then (1,4). That is 3 new pairs. Now do yours."]);
    }
  };
  const posetQ = () => {
    const N = ri(21, 70), T = ri(0, 2);
    if (T === 0) return num(`Look at the numbers 1 to ${N} ordered by “divides”. A chain is a list where each number divides the next one. How many numbers are in the longest chain?`, big("⛓️"), Math.floor(Math.log2(N)) + 1, [
      "To make a chain long, each step should multiply by something small.",
      "The smallest step is multiplying by 2. Start at 1 and keep going while the number stays within the limit.",
      "Example: for the numbers 1 to 20 the chain 1, 2, 4, 8, 16 has 5 numbers. Now do yours."]);
    if (T === 1) return num(`Look at the numbers 1 to ${N}. What is the biggest set of them in which no number divides another one?`, big("🚫"), N - Math.floor(N / 2), [
      "A number and its double are a pair that cannot both be chosen. Think about the big numbers.",
      "Any number up to half of the limit has its double inside the list. The numbers above half have no multiple in the list at all.",
      "Example: for 1 to 12, the numbers 7, 8, 9, 10, 11, 12 are a good set of 6. Now do yours."]);
    let pr = 0; for (let x = 2; x <= N; x++) if (Array.from({ length: x - 2 }, (_, i) => i + 2).every(d => x % d)) pr++;
    return num(`Look at the numbers 2 to ${N}. How many of them have no divisor in the list other than themselves (the ones sitting directly above 1)?`, big("⭐"), pr, [
      "A number with no divisor in the list besides itself cannot be built by multiplying two smaller numbers.",
      "These are the primes. Go through the numbers and cross out multiples of 2, 3, 5, 7.",
      "Example: for 2 to 10 the numbers 2, 3, 5, 7 remain, so 4. Now do yours."]);
  };
  const permQ = () => {
    const n = ri(5, 8); let p; do { p = shuf(Array.from({ length: n }, (_, i) => i + 1)); } while (p.every((v, i) => v === i + 1));
    const f = x => p[x - 1], cyc = []; const seen = new Set();
    for (let x = 1; x <= n; x++) if (!seen.has(x)) { let l = 0, y = x; do { seen.add(y); y = f(y); l++; } while (y !== x); cyc.push(l); }
    const sh = big(p.map((v, i) => `${i + 1}→${v}`).join(" &nbsp;"), 1.2), T = ri(0, 2), x = ri(1, n);
    if (T === 0) return num(`A shuffle sends each number to a new place: ${p.map((v, i) => `${i + 1}→${v}`).join(", ")}. How many separate cycles does it have? (A fixed number counts as a cycle of length 1.)`, sh, cyc.length, ["Start at 1 and follow the arrows until you return to 1. Then start from a number you have not met.", "Count each closed loop once. Tick off the numbers as you go.", "Example: 1→2, 2→1, 3→4, 4→5, 5→3 has the loops (1 2) and (3 4 5): 2 cycles. Now do yours."]);
    if (T === 1) return num(`A shuffle sends each number to a new place: ${p.map((v, i) => `${i + 1}→${v}`).join(", ")}. If you repeat it again and again, after how many repeats does everything first return to where it started?`, sh, cyc.reduce(lcm, 1), ["Break the shuffle into loops. Each loop returns home after as many repeats as its length.", "Everything is home together at the first repeat count that every loop length divides: the least common multiple.", "Example: loops of length 2 and 3 are both home after 6 repeats. Now do yours."]);
    let l = 0, y = x; do { y = f(y); l++; } while (y !== x);
    return num(`A shuffle sends each number to a new place: ${p.map((v, i) => `${i + 1}→${v}`).join(", ")}. Start at ${x} and follow the arrows. How many steps until you are first back at ${x}?`, sh, l, ["Follow the arrows: from the number to where it goes, and from there on.", "Count the arrows you follow until you return to the start.", "Example: 1→3, 3→2, 2→1: from 1 it takes 3 steps to get back. Now do yours."]);
  };
  const growthQ = () => {
    const T = ri(0, 3);
    if (T < 2) { const ORD = [["n itself", 0], ["n log n", 1], ["n squared", 2], ["n cubed", 3], ["2 to the power n", 4], ["3 to the power n", 5], ["n factorial", 6]], ch = shuf(ORD).slice(0, 4), fast = T === 0;
      const best = ch.slice().sort((a, b) => (fast ? b[1] - a[1] : a[1] - b[1]))[0];
      return mcq(`Which of these grows ${fast ? "fastest" : "slowest"} when n gets very large?`, big("🚀"), best[0], ch.filter(x => x !== best).map(x => x[0]), [
        "Imagine n = 100 or n = 1000. Which expression gets biggest (or smallest) there?",
        "Order from slow to fast: n, n log n, powers n², n³, then exponentials 2ⁿ, 3ⁿ, and the factorial n! is the biggest.",
        "Example: n² grows faster than n because n × n is bigger than n. And 3ⁿ beats 2ⁿ because each step multiplies by 3 instead of 2. Now do yours."]); }
    if (T === 2) { const X = pick([100, 1000, 10000, 100000, 1000000, 10000000, 100000000]); let n = 1; while (fact(n) <= X) n++;
      return num(`What is the smallest n so that n! (that is 1 × 2 × … × n) is bigger than ${X.toLocaleString("en-US")}?`, big("🏔️"), n, ["Build n! step by step, multiplying by the next number each time.", "Keep a running product: 1, 2, 6, 24, 120, … Stop at the first one above the target.", "Example: the smallest n with n! bigger than 10: 3! = 6 is too small and 4! = 24 is bigger, so the answer is 4. Now do yours."]); }
    const X = pick([1000, 5000, 10000, 100000, 1000000, 5000000]); let n = 0; while (Math.pow(2, n) <= X) n++;
    return num(`What is the smallest n so that 2ⁿ is bigger than ${X.toLocaleString("en-US")}?`, big("🏔️"), n, ["Keep doubling, starting from 1, and count the doublings.", "Remember 2¹⁰ = 1024 as a landmark, and double from there.", "Example: the smallest n with 2ⁿ bigger than 100 is 7, since 64 is too small and 128 is bigger. Now do yours."]);
  };
  const INF = [["the whole numbers 0, 1, 2, 3, …", true], ["all the integers …, −2, −1, 0, 1, 2, …", true], ["the even numbers", true], ["all the fractions p/q of whole numbers", true], ["all pairs (a, b) of whole numbers", true], ["all finite words made from the letters a to z", true], ["all the prime numbers", true], ["all finite sets of whole numbers", true],
    ["all the real numbers between 0 and 1", false], ["all endless strings of 0s and 1s", false], ["all subsets of the whole numbers", false], ["all the real numbers", false], ["all the points on a line segment", false]];
  const BIJ = [
    ["the even numbers 2, 4, 6, …", ["n → 2n", "double n"], [["n → n + 2", "add 2 to n"], ["n → n²", "square n"], ["n → 2ⁿ", "2 to the power n"], ["n → n/2", "halve n"]]],
    ["the odd numbers 1, 3, 5, …", ["n → 2n − 1", "double n, then subtract 1"], [["n → 2n", "double n"], ["n → n + 1", "add 1 to n"], ["n → n²", "square n"], ["n → 2n + 2", "double n, then add 2"]]],
    ["the square numbers 1, 4, 9, …", ["n → n²", "square n"], [["n → 2n", "double n"], ["n → n + 3", "add 3 to n"], ["n → 2ⁿ", "2 to the power n"], ["n → n³ − 1", "cube n, then subtract 1"]]],
    ["the multiples of 5: 5, 10, 15, …", ["n → 5n", "multiply n by 5"], [["n → n + 5", "add 5 to n"], ["n → n⁵", "n to the power 5"], ["n → 5ⁿ", "5 to the power n"], ["n → n/5", "divide n by 5"]]],
    ["the numbers 10, 11, 12, …", ["n → n + 9", "add 9 to n"], [["n → n + 10", "add 10 to n"], ["n → 10n", "multiply n by 10"], ["n → n − 9", "subtract 9 from n"], ["n → 9n", "multiply n by 9"]]],
    ["the multiples of 3: 3, 6, 9, …", ["n → 3n", "multiply n by 3"], [["n → n + 3", "add 3 to n"], ["n → 3ⁿ", "3 to the power n"], ["n → n³", "cube n"], ["n → n/3", "divide n by 3"]]]];
  const infQ = () => {
    if (Math.random() < 0.55) { const [d, c] = pick(INF);
      return mcq(`Is this set countable (its members can be put in a never-ending list 1st, 2nd, 3rd, … so that each one gets a place) or uncountable?<br><b>${d}</b>`, big("♾️"), c ? "countable" : "uncountable", [c ? "uncountable" : "countable"], [
        "Ask: can I describe a way to list them one after another so that every member shows up at some position?",
        "Sets built from finite pieces, with a clear way to order them, can be listed. But Cantor showed that some sets built from endless digits can never be listed completely.",
        "Example: the whole numbers 1, 2, 3, … can be listed trivially. The set of all fractions can be listed by going through them along diagonals. Now think about yours."]); }
    const [d, r, w] = pick(BIJ);
    return mcq(`Two infinite sets can be matched one-to-one. Which rule matches the counting numbers 1, 2, 3, … perfectly with ${d}?`, big("🔗"), r.join("  (") + ")", w.map(x => x[0] + "  (" + x[1] + ")"), [
      "Write the first few numbers of the target set under 1, 2, 3, 4, … and look for the connection.",
      "The rule must hit every member of the target exactly once, with nothing skipped and nothing repeated. Test n = 1, 2, 3.",
      "Example: matching 1, 2, 3, … with 4, 5, 6, … uses n → n + 3. Test: 1 → 4, 2 → 5, 3 → 6. Now do yours."]);
  };
  const congQ = () => {
    for (;;) {
      const m = ri(6, 30), a = ri(2, m - 1), g = gcd(a, m), T = ri(0, 1);
      if (T === 0) { const solv = Math.random() < 0.6, b = solv ? g * ri(0, Math.floor((m - 1) / g)) % m : ri(1, m - 1); if (a === 4 && m === 10) continue; if (!solv && b % g === 0) continue; const cnt = b % g === 0 ? g : 0;
        return num(`How many whole numbers x from 0 to ${m - 1} satisfy ${a}x ≡ ${b} (mod ${m})? (This means ${a}x leaves remainder ${b} when divided by ${m}.)`, big("🕐"), cnt, [
          "Look at the greatest common divisor of the multiplier and the modulus.",
          "If that divisor does not divide the right-hand number, there is no solution. If it does, there are exactly as many solutions as the divisor.",
          "Example: 4x ≡ 6 (mod 10): gcd(4, 10) = 2 and 2 divides 6, so there are 2 solutions (x = 4 and x = 9). Now do yours."]); }
      if (g !== 1) continue; const b = ri(1, m - 1); if (a === 3 && m === 7 && b === 4) continue; let x = 0; while ((a * x) % m !== b) x++;
      return num(`What is the smallest whole number x (starting from 0) with ${a}x ≡ ${b} (mod ${m})?`, big("🕐"), x, [
        "Try x = 0, 1, 2, … and look at the remainder of a × x each time.",
        `Stop when the remainder of ${a} × x on division by ${m} equals ${b}. Since gcd(${a}, ${m}) = 1, it will happen before x reaches ${m}.`,
        "Example: 3x ≡ 4 (mod 7): x = 6 gives 18, which leaves remainder 4 on division by 7 (the earlier x give 0, 3, 6, 2, 5, 1). Now do yours."]);
    }
  };
  const sqModQ = () => {
    const T = ri(0, 2);
    if (T === 0) { const m = pick([3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 16]); const s = new Set(); for (let n = 0; n < m; n++) s.add(n * n % m);
      return num(`When n is any whole number, how many different remainders can n² leave when divided by ${m}?`, big("🔲"), s.size, ["n and n + " + m + " leave the same remainder when squared, so you only need some of the n values.", `Square n = 0, 1, 2, … up to ${m - 1}, find each remainder on division by ${m}, and count the different ones.`, "Example: modulo 5: the squares of 0, 1, 2, 3, 4 are 0, 1, 4, 9, 16, with remainders 0, 1, 4, 4, 1. That is 3 different remainders. Now do yours."]); }
    if (T === 1) { const m = pick([7, 9, 13, 12, 19, 4, 8]); const s = new Set(); for (let n = 0; n < m; n++) s.add(n * n * n % m);
      return num(`When n is any whole number, how many different remainders can n³ leave when divided by ${m}?`, big("🔲"), s.size, ["n and n + " + m + " leave the same remainder when cubed, so only some n values need testing.", `Cube n = 0, 1, 2, … up to ${m - 1}, find each remainder on division by ${m}, and count the different ones.`, "Example: modulo 6: the cubes of 0..5 are 0, 1, 8, 27, 64, 125, with remainders 0, 1, 2, 3, 4, 5. That is 6 different remainders. Now do yours."]); }
    const p = pick([11, 13, 17, 19]), a = ri(0, p - 1); let c = 0; for (let x = 0; x < p; x++) if (x * x % p === a) c++;
    return num(`How many whole numbers x from 0 to ${p - 1} satisfy x² ≡ ${a} (mod ${p})?`, big("🔲"), c, ["Square every x from 0 to " + (p - 1) + " and keep the remainder on division by " + p + ".", "If x works, then " + p + " − x works as well. So solutions come in pairs, except for x = 0.", "Example: x² ≡ 4 (mod 7): x = 2 gives 4 and x = 5 gives 25 = 21 + 4, so 2 solutions. Now do yours."]);
  };
  const nestQ = () => {
    const qs = pick([["∀", "∀"], ["∀", "∃"], ["∃", "∀"], ["∃", "∃"]]), fl = q => (q === "∀" ? "∃" : "∀"), qw = q => (q === "∀" ? "for all" : "there is"),
      PR = [["x ≤ y", "x > y", "x is at most y", "x is above y"], ["x + y is even", "x + y is odd", "x + y is even", "x + y is odd"], ["x divides y", "x does not divide y", "x divides y", "x does not divide y"], ["x = y", "x ≠ y", "x equals y", "x differs from y"], ["P(x, y)", "¬P(x, y)", "P(x, y)", "not P(x, y)"]], [p, np, pw, npw] = pick(PR);
    const f = (a, b, s, sw) => `${a}x ${b}y ${s} (${qw(a)} x, ${qw(b)} y: ${sw})`;
    return mcq(`Which statement is the negation of: <b>${f(qs[0], qs[1], p, pw)}</b>`, big("🔀"), f(fl(qs[0]), fl(qs[1]), np, npw), [f(fl(qs[0]), qs[1], np, npw), f(fl(qs[0]), fl(qs[1]), p, pw), f(qs[0], qs[1], np, npw)], [
      "To negate, move the NOT through the statement from left to right.",
      "Every time the NOT passes a quantifier, ∀ and ∃ swap. When it reaches the statement itself, that gets negated.",
      "Example: the negation of ∀a ∃b a = b is ∃a ∀b a ≠ b. Now do yours."]);
  };
  const FLAW = [
    ["it divides by zero", "Let a = b. Then a² = ab, so a² − b² = ab − b², so (a + b)(a − b) = b(a − b). Cancel (a − b): a + b = b. So 2b = b, and 2 = 1.", "Which step cancels something? What is its value when a = b?"],
    ["it only checks examples", "Claim: n² + n + 41 is prime for every whole number n. Proof: n = 1 gives 43, n = 2 gives 47, n = 3 gives 53, and n = 4 gives 61, all prime. So it is always true.", "How many cases does the argument check, compared with how many cases the claim covers?"],
    ["it reasons backwards from the “then” part", "If it rains, the grass is wet. The grass is wet. So it rained.", "Could the grass be wet for another reason?"],
    ["it assumes what it wants to prove", "Claim: the sum of two even numbers is even. Proof: the sum is even, so it is 2k for some k. Therefore the sum of two even numbers is even.", "Which sentence uses the very thing we are asked to show?"],
    ["its induction step fails for the smallest case", "Claim: any group of n horses has the same color. Step: take n + 1 horses. Leave out one, the rest match. Leave out another, those match. The two groups overlap, so all match. Base: 1 horse. So all horses are one color.", "Try the step with n = 1, so n + 1 = 2. Do the two groups overlap?"],
    ["it only proves one direction", "Claim: n is even if and only if n² is even. Proof: if n is even, n = 2k, so n² = 4k² = 2(2k²), which is even. Done.", "Count the directions the claim needs. How many did the proof show?"],
    ["it forgets to flip an inequality", "We know −2 &lt; 3. Multiply both sides by −1: 2 &lt; −3. So 2 is smaller than −3.", "What happens to an inequality when you multiply both sides by a negative number?"],
    ["it jumps from one example to all cases", "There is an even prime number (the number 2). Therefore all prime numbers are even.", "One example is shown. Does it prove something about every prime?"]
  ];
  const FLEX = {
    "it divides by zero": "Example of this mistake: from 0 × 5 = 0 × 7 you cannot cancel the 0 to get 5 = 7.",
    "it only checks examples": "Example of this mistake: 1² &lt; 2, 2² &lt; 5 ... checking some cases is not enough to show a rule for all numbers.",
    "it reasons backwards from the “then” part": "Example of this mistake: “If you are in Paris, you are in France. You are in France. So you are in Paris.”",
    "it assumes what it wants to prove": "Example of this mistake: “This book is the best because it is better than all the others.” The reason repeats the claim.",
    "its induction step fails for the smallest case": "Example of this mistake: a domino chain where the first two dominoes are too far apart. The chain never starts to fall.",
    "it only proves one direction": "Example of this mistake: proving “if a shape is a square, it has four sides” does not prove “if it has four sides, it is a square”.",
    "it forgets to flip an inequality": "Example of this mistake: 1 &lt; 2. Multiply by −3 and keep the sign: −3 &lt; −6. That is wrong.",
    "it jumps from one example to all cases": "Example of this mistake: “My cat is gray, so all cats are gray.”"
  };
  const flawQ = () => {
    const [lab, txt, clue] = pick(FLAW), wr = shuf(FLAW.map(x => x[0]).filter(x => x !== lab)).slice(0, 3), ex = pick(Object.keys(FLEX).filter(k => k !== lab));
    return mcq(`Something is wrong with this “proof”. What is the main problem?<br><i>${txt}</i>`, big("🕵️"), lab, wr, [
      "Read the proof slowly, one step at a time. At which step would you stop and ask “why is this allowed?”",
      clue, FLEX[ex] + " Now find the mistake in yours."]);
  };
  const chairQ = () => {
    const n = ri(6, 12), k = ri(2, 5);
    if (Math.random() < 0.65) return num(`A club has ${n} members. In how many ways can it choose a committee of ${k} members and also pick one of those ${k} to be the chair?`, big("🪑"), k * comb(n, k), [
      "Pick the whole committee first. Then pick the chair from its members.",
      "The number of committees times the number of choices for the chair. (You could also pick the chair first from everyone, then the others.)",
      "Example: 5 members, committee of 2 with a chair: C(5, 2) × 2 = 20, or 5 × 4 = 20. Now do yours."]);
    const k2 = ri(3, 5);
    return num(`A club has ${n} members. In how many ways can it choose a committee of ${k2} and name one member as chair and a different member as secretary?`, big("🪑"), comb(n, k2) * k2 * (k2 - 1), [
      "Pick the committee first. Then fill the two named jobs from its members.",
      "Chair: any of the committee. Secretary: any of the others on the committee. Multiply with the number of committees.",
      "Example: 4 members, committee of 2 with a chair and a secretary: C(4, 2) × 2 × 1 = 12. Now do yours."]);
  };
  const partQ = () => {
    const p = (n, k, dist) => { const f = (rem, mx) => { if (rem === 0) return 1; let t = 0; for (let x = Math.min(rem, mx); x >= 1; x--) t += f(rem - x, dist ? x - 1 : x); return t; }; return f(n, k); };
    const T = ri(0, 2);
    if (T === 0) { const n = ri(5, 12); return num(`In how many ways can ${n} be written as a sum of positive whole numbers? (The order does not matter: 2 + 3 and 3 + 2 are the same way, and ${n} itself counts as a way.)`, big("🧩"), p(n, n, false), ["List sums with the biggest part first, so you do not count a way twice.", "Go through the biggest part from " + "the whole number downwards. For each, count the ways to split the rest into parts that are not bigger.", "Example: 4 can be written as 4, 3+1, 2+2, 2+1+1, 1+1+1+1. That is 5 ways. Now do yours."]); }
    if (T === 1) { const n = ri(6, 12), k = ri(2, 4); return num(`In how many ways can ${n} be written as a sum of parts that are each at most ${k}? (The order does not matter.)`, big("🧩"), p(n, k, false), ["Order the parts from biggest to smallest so you do not count a way twice.", `The biggest part is ${k} or less. Count the ways for each biggest part separately.`, "Example: 5 with parts at most 2: 2+2+1, 2+1+1+1, 1+1+1+1+1. That is 3 ways. Now do yours."]); }
    const n = ri(7, 14); return num(`In how many ways can ${n} be written as a sum of <b>different</b> positive whole numbers? (The order does not matter and no part may repeat.)`, big("🧩"), p(n, n, true), ["Write the parts from biggest to smallest, each strictly smaller than the one before.", "Go through the biggest part from the largest possible value downwards, and count the ways to build the rest from smaller different parts.", "Example: 6 as different parts: 6, 5+1, 4+2, 3+2+1. That is 4 ways. Now do yours."]);
  };
  const expectQ = () => {
    const T = ri(0, 4);
    if (T === 0) { const n = pick(Array.from({ length: 16 }, (_, i) => 10 + 2 * i).filter(x => x !== 12)); return num(`A fair coin is tossed ${n} times. On average, how many heads do you expect?`, big("🪙"), n / 2, ["Give each toss a score: 1 for heads, 0 for tails. The total of the scores is the number of heads.", "The average of a sum is the sum of the averages. What is the average score of one toss, and how many tosses are there?", "Example: a die is rolled 12 times. Each roll scores 1 for a six. Average per roll 1/6, so 12 × 1/6 = 2 sixes. Now do yours."]); }
    if (T === 1) { const n = pick([18, 24, 30, 36, 42, 48]); return num(`A fair die is rolled ${n} times. On average, how many sixes do you expect?`, big("🎲"), n / 6, ["Give each roll a score: 1 for a six, 0 otherwise.", "The average of the total is the sum of the averages. What is the chance of a six on one roll, and how many rolls are there?", "Example: a coin is tossed 14 times; average heads = 14 × 1/2 = 7. Now do yours."]); }
    if (T === 2) { const n = ri(3, 30); return num(`${n} guests each leave a hat at the door. The hats are given back completely at random. On average, how many guests get their own hat back?`, big("🎩"), 1, ["Give each guest a score: 1 if they get their own hat, 0 if not.", `One guest has a 1 in ${n} chance of getting their own hat. The average of the total is the sum of the averages.`, "Example: with 4 guests, each has chance 1/4 and there are 4 guests: 4 × 1/4. Now do yours."]); }
    if (T === 3) { const n = pick([5, 9, 13, 17, 21, 25]); return num(`A fair coin is tossed ${n} times in a row. On average, how many times do two neighbouring tosses show a head followed directly by a tail (HT)?`, big("🪙"), (n - 1) / 4, ["Look at each pair of neighbours. Give the pair a score of 1 if it shows HT.", `There are ${n - 1} neighbouring pairs. The chance that a pair is HT is (1/2) × (1/2). Add the averages.`, "Example: 3 tosses have 2 neighbouring pairs, each with chance 1/4, so the average is 2 × 1/4 = 0.5. Now do yours."]); }
    const n = pick([8, 9, 16, 17]); return num(`${n} friends each toss a fair coin. A pair of friends “matches” if both show heads. On average, how many matching pairs are there?`, big("👫"), comb(n, 2) / 4, ["Each pair of friends gets a score: 1 if both show heads.", `Count the pairs: ${n} friends give ${n} × ${n - 1} ÷ 2 pairs. Each pair matches with chance 1/2 × 1/2.`, "Example: 4 friends have 6 pairs, so the average is 6 × 1/4 = 1.5. Now do yours."]);
  };
  const patQ = () => {
    const pat = pick(["11", "00", "000", "111", "010", "101", "110", "001"]), n = ri(4, 9); let c = 0;
    for (let k = 0; k < (1 << n); k++) { const s = k.toString(2).padStart(n, "0"); if (!s.includes(pat)) c++; }
    return num(`How many 0-1 strings of length ${n} do <b>not</b> contain “${pat}” anywhere inside them?`, big("🔡"), c, [
      "Build good strings one digit at a time. Think about what the last digits are, and which digit you may add next.",
      `Let a(n) be the number of good strings of length n. Sort the good strings by how they end, and relate them to shorter good strings. Check small lengths by listing them.`,
      "Example: length 3 with no “11”: 000, 001, 010, 100, 101. That is 5. Length 2 gives 3 and length 1 gives 2; each is the sum of the previous two. Now do yours."]);
  };

  const mk26 = [startQ, charQ, multiQ, hockeyQ, ontoQ, composeQ, posetQ, permQ, growthQ, infQ, congQ, sqModQ, nestQ, flawQ, chairQ, partQ, expectQ, patQ];
  const L26 = [
    L("Where induction starts", startQ, [S("Base case", "1️⃣", "Induction needs a first case that is true. For inequalities the first case can be a bigger n than 1."), S("Small cases", "📋", "Test n = 1, 2, 3, … to see where the statement starts to hold for good."), S("Examples", "🪜", "2ⁿ &gt; n² starts at n = 5. n! &gt; 2ⁿ starts at n = 4.")]),
    L("Recurrence roots", charQ, [S("Guess a power", "🔑", "For a(n) = A × a(n−1) − B × a(n−2) try a(n) = xⁿ."), S("Quadratic", "x²", "Divide by a power of x and you get x² = A x − B. Its solutions are the growth rates."), S("Check", "✅", "If the roots are r and s, then a(n) = (rⁿ − sⁿ) ÷ (r − s) when a(0) = 0 and a(1) = 1.")]),
    L("Three-part expansions", multiQ, [S("Trinomial", "🧮", "(x + y + z)ⁿ is n factors, each giving an x, a y or a z."), S("Coefficient", "🔢", "The coefficient of xⁱyʲzᵏ is n! ÷ (i! × j! × k!)."), S("Terms", "🧩", "The number of different terms is C(n + 2, 2).")]),
    L("Hockey stick", hockeyQ, [S("Pascal", "🔺", "C(n, k) is the number in row n, position k."), S("Diagonal", "🏒", "C(r, r) + C(r+1, r) + … + C(n, r) = C(n+1, r+1). It looks like a hockey stick in the triangle."), S("Rows", "➕", "A whole row adds to 2ⁿ. Even-size subsets and odd-size subsets are equally many (2ⁿ⁻¹ each).")]),
    L("Counting onto functions", ontoQ, [S("Onto", "🎯", "A function is onto when every target element is hit at least once."), S("Subtract", "➖", "Total functions mᵖ minus the ones that miss some target."), S("Formula", "✅", "To 2 targets: 2ⁿ − 2. To 3 targets: 3ⁿ − 3 × 2ⁿ + 3.")]),
    L("Composing relations", composeQ, [S("Compose", "🔗", "S∘R contains (a, c) when R has (a, b) and S has (b, c) for some middle b."), S("Find middles", "🔍", "For each pair in R, look at the pairs of S that start with its second entry."), S("Transitive", "➡️", "A relation is transitive when it contains every shortcut a → c of a chain a → b → c.")]),
    L("Order by divisibility", posetQ, [S("Partial order", "📐", "“Divides” orders the numbers, but not all pairs can be compared (6 and 10 cannot)."), S("Chains", "⛓️", "A chain is a list where each divides the next. Longest chain: keep doubling."), S("Antichains", "🚫", "An antichain has no number dividing another. The biggest one on 1..N is the top half of the numbers.")]),
    L("Cycles of a permutation", permQ, [S("Follow arrows", "🔁", "A shuffle sends each number to another place. Follow the arrows from a number until you return."), S("Cycles", "⭕", "Every shuffle splits into separate loops, called cycles."), S("Order", "⏱️", "Repeating the shuffle returns everything home after the least common multiple of the cycle lengths.")]),
    L("How fast it grows", growthQ, [S("Ranking", "🚀", "From slow to fast: n, n log n, n², n³, 2ⁿ, 3ⁿ, n!."), S("Exponentials win", "💥", "Anything with n in the exponent beats every power of n in the end."), S("Landmarks", "🏔️", "2¹⁰ = 1024. 10! = 3,628,800.")]),
    L("Sizes of infinity", infQ, [S("Countable", "♾️", "A set is countable if its members can be put in a list 1st, 2nd, 3rd, … covering everyone."), S("Matching", "🔗", "Two infinite sets are the same size if some rule pairs them up perfectly. n → 2n matches all whole numbers with the even ones."), S("Cantor", "🎓", "Cantor proved that the real numbers between 0 and 1 cannot be listed, so some infinities are bigger.")]),
    L("Solving ax ≡ b", congQ, [S("Clock equation", "🕐", "ax ≡ b (mod m) asks which x make a × x leave remainder b on division by m."), S("gcd test", "🔑", "Let g = gcd(a, m). Solutions exist only if g divides b, and then there are g of them between 0 and m − 1."), S("Coprime case", "1️⃣", "If gcd(a, m) = 1 there is exactly one solution. Try x = 0, 1, 2, … until it works.")]),
    L("Squares in clock numbers", sqModQ, [S("Few remainders", "🔲", "Squares leave only some remainders. Modulo 4 only 0 or 1; modulo 3 only 0 or 1."), S("Test all", "📋", "Only n = 0 to m − 1 need testing, because n and n + m behave the same."), S("Use in proofs", "✍️", "If a number leaves a remainder that squares never leave, it cannot be a square.")]),
    L("Negating two quantifiers", nestQ, [S("Flip", "🔀", "¬∀ is ∃¬. ¬∃ is ∀¬."), S("Push through", "➡️", "Move the NOT through each quantifier, flipping it. Finish by negating the statement."), S("Check", "✅", "The negation of “everyone has a friend” is “someone has no friend at all”.")]),
    L("Spot the flaw", flawQ, [S("Common mistakes", "🕵️", "Dividing by zero. Checking only examples. Assuming what you must prove. Proving only one direction of an iff."), S("Induction traps", "🪜", "The base case or the step must work for the very first case. A step that fails at the start breaks the chain."), S("Habit", "🔍", "For each step, ask: why is this allowed?")]),
    L("Committee with a chair", chairQ, [S("Two stages", "🪑", "First pick the group, then pick its special members."), S("Multiply", "✖️", "C(n, k) groups, then k choices for the chair. Or n choices for the chair, then C(n − 1, k − 1) for the rest."), S("Double counting", "⚖️", "Both ways count the same thing, so k × C(n, k) = n × C(n − 1, k − 1).")]),
    L("Splitting a number into parts", partQ, [S("Partition", "🧩", "A partition of n is a sum of positive whole numbers equal to n. Order does not matter."), S("List smartly", "📝", "Write the parts from biggest to smallest, and go through the biggest part in order."), S("Counts", "🔢", "The partitions of 1, 2, 3, 4, 5, 6 are 1, 2, 3, 5, 7, 11 in number.")]),
    L("Indicator trick", expectQ, [S("Scores", "🎯", "Give every item a score of 1 if it has the property and 0 if not."), S("Add expectations", "➕", "The average total is the sum of the average scores. This works even if the items affect each other."), S("Average of a score", "📊", "The average score is the chance that the item has the property.")]),
    L("Forbidden patterns in strings", patQ, [S("Build up", "🔡", "Make good strings by adding one digit at a time."), S("Small cases", "📋", "List the good strings of length 1, 2, 3 and notice how each is built from the shorter ones."), S("Recurrences", "🔁", "No “11”: a(n) = a(n−1) + a(n−2). Counts 2, 3, 5, 8, 13, …")]),
    L("Mixed practice", mixOf(mk26), MIXS("Induction starts, recurrences, counting rules, relations, orders, shuffles, growth, infinity, clock equations and proofs.")),
    L("Level 26 Challenge", mixOf(mk26), MIXS("Level 26 mixes proofs, counting, relations, number theory and chance.")),
  ];

  // ======================= LEVEL 27 =======================
  const VN = "ABCDEFGH";
  const allPairs = n => { const r = []; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) r.push([i, j]); return r; };
  const eshow = es => es.map(e => `${VN[e[0]]}–${VN[e[1]]}`).join(", ");
  const wshow = es => es.map(e => `${VN[e[0]]}–${VN[e[1]]} (${e[2]})`).join(", ");
  const connGraph = (n, m) => {
    const set = new Set(), es = [];
    const add = (a, b) => { if (a === b) return false; const x = Math.min(a, b), y = Math.max(a, b), k = x + "-" + y; if (set.has(k)) return false; set.add(k); es.push([x, y]); return true; };
    for (let v = 1; v < n; v++) add(v, ri(0, v - 1));
    let guard = 0; while (es.length < m && guard++ < 200) add(ri(0, n - 1), ri(0, n - 1));
    return es;
  };
  const compCount = (n, es) => { const p = Array.from({ length: n }, (_, i) => i), f = x => (p[x] === x ? x : (p[x] = f(p[x]))); es.forEach(e => { p[f(e[0])] = f(e[1]); }); return new Set(p.map((_, i) => f(i))).size; };
  const hh = d => { d = d.slice(); for (;;) { d.sort((a, b) => b - a); if (d.every(x => x === 0)) return true; const x = d.shift(); if (x > d.length) return false; for (let i = 0; i < x; i++) { d[i]--; if (d[i] < 0) return false; } } };
  const degQ = () => {
    const n = ri(4, 6), want = Math.random() < 0.5; let d, tries = 0;
    do {
      if (want && Math.random() < 0.7) { const es = connGraph(n, ri(n - 1, n + 2)); d = Array(n).fill(0); es.forEach(e => { d[e[0]]++; d[e[1]]++; }); }
      else d = Array.from({ length: n }, () => ri(0, n - 1));
    } while ((d.reduce((a, b) => a + b, 0) % 2 !== 0 || hh(d) !== want) && ++tries < 800);
    d.sort((a, b) => b - a);
    return mcq(`Could ${n} towns be joined by roads (at most one road between two towns, no road from a town to itself) so that the numbers of roads at the towns are exactly ${d.join(", ")}?`, big("🛣️"), hh(d) ? "yes" : "no", [hh(d) ? "no" : "yes"], [
      "Each road is counted at two towns, so the total of all the numbers must be even. But even is not enough.",
      "Havel–Hakimi: take the biggest number d, remove it, and subtract 1 from the next d biggest numbers. Sort again and repeat. If a number would go below zero, or you run out of towns, it is impossible. If you reach all zeros, it is possible.",
      "Example for 3, 2, 2, 2, 1, 1, 1: remove 3, subtract 1 from the next three (2, 2, 2): you get 1, 1, 1, 1, 1, 1, which pair up perfectly, so it is possible. Now do yours."]);
  };
  const walkQ = () => {
    const n = ri(4, 5), es = connGraph(n, ri(n, n + 2)), adj = Array.from({ length: n }, () => new Set()); es.forEach(e => { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); });
    const a = ri(0, n - 1), T = ri(0, 1);
    if (T === 0) { let b = ri(0, n - 1); if (b === a) b = (a + 1) % n; const c = [...adj[a]].filter(x => adj[b].has(x)).length;
      return num(`A network has these roads: ${eshow(es)}. A walk of length 2 goes along two roads in a row. How many walks of length 2 are there from ${VN[a]} to ${VN[b]}?`, big("🚶"), c, [
        "A walk of length 2 has one middle town. It goes first town, middle town, last town.",
        "Count the towns that have a road to the first town and also a road to the last town.",
        "Example: roads P–Q, Q–R, P–R, R–S. Walks of length 2 from P to S: only P, R, S (R is joined to both). So 1. Now do yours."]); }
    let tot = 0; adj[a].forEach(x => { tot += adj[x].size; });
    return num(`A network has these roads: ${eshow(es)}. A walk of length 2 goes along two roads in a row (it may come straight back). How many walks of length 2 start at ${VN[a]}?`, big("🚶"), tot, [
      "Count the first roads you can take from the start town. Then count the second roads from each town you reach.",
      "Add up, over the neighbours of the start town, the number of roads at that neighbour (coming back is allowed).",
      "Example: roads P–Q, Q–R, P–R, R–S. From S: one road to R, then R has 3 roads, so 3 walks. Now do yours."]);
  };
  const compQ27 = () => {
    const n = ri(6, 8), es = shuf(allPairs(n)).slice(0, ri(3, 7)), c = compCount(n, es);
    if (Math.random() < 0.5) return num(`A network has ${n} towns ${VN.slice(0, n).split("").join(", ")} and these roads: ${eshow(es)}. How many separate connected groups of towns are there? (A town with no roads is a group by itself.)`, big("🏘️"), c, [
      "Start at one town and follow roads to every town you can reach. That is one group. Then start from a town you have not reached.",
      "Colour or cross off the towns of each group as you find them. Do not forget towns with no roads.",
      "Example: 5 towns P to T with roads P–Q, Q–R, S–T: groups {P, Q, R} and {S, T}, so 2. Now do yours."]);
    return num(`A network has ${n} towns ${VN.slice(0, n).split("").join(", ")} and these roads: ${eshow(es)}. What is the largest number of roads you could close without cutting any town off from a town it could reach before?`, big("🏘️"), es.length - n + c, [
      "A group of k towns needs only k − 1 roads to stay connected.",
      "Count the roads, and work out how many are really needed: towns minus the number of groups. The rest are extra.",
      "Example: 4 towns in one group with 5 roads need 3, so you can close 2. Now do yours."]);
  };
  const spanQ = () => {
    const T = ri(0, 3);
    if (T === 0) { const n = ri(4, 6); return num(`A complete network has ${n} towns, and every pair of towns has a road. How many different ways can you choose roads to keep so that all towns stay connected using the fewest roads (a spanning tree)?`, big("🌲"), Math.pow(n, n - 2), ["The fewest roads that connect everything form a tree. There is a famous formula for complete networks, by Cayley.", "For n towns the formula is n raised to the power n − 2.", "Example: 3 towns in a triangle: choose any 2 roads out of 3, so 3 trees, and 3¹ = 3. Now do yours."]); }
    if (T === 1) { const n = ri(4, 9); return num(`${n} towns are joined in a ring (each town has two roads). How many different spanning trees does the ring have?`, big("⭕"), n, ["A spanning tree has one road fewer than the number of towns. The ring has exactly as many roads as towns.", "Remove one road from the ring and everything stays connected. Does every choice of road give a different tree?", "Example: a ring of 3 towns (a triangle) has 3 spanning trees, one for each removed road. Now do yours."]); }
    if (T === 2) { const [a, b] = pick([[2, 3], [2, 4], [3, 3], [2, 5], [3, 4]]); return num(`${a} towns on the left are each joined to every one of ${b} towns on the right (and there are no other roads). How many spanning trees does this network have? (Formula: ${a}<sup>${b - 1}</sup> × ${b}<sup>${a - 1}</sup>.)`, big("🌉"), Math.pow(a, b - 1) * Math.pow(b, a - 1), ["The number of spanning trees of a complete two-sided network has a formula: the sizes appear as powers of each other.", `Use the formula given in the question: first size to the power (second size − 1) times second size to the power (first size − 1).`, "Example: 1 town joined to 3 towns: 1³⁻¹ × 3⁰ = 1, since that star is already a tree. Now do yours."]); }
    const a = ri(4, 6), b = ri(4, 6); return num(`Two rings of towns share exactly one town, like a figure eight: one ring has ${a} towns and the other has ${b} towns. How many different spanning trees does this network have?`, big("♾️"), a * b, ["A spanning tree has no loops but keeps every town connected. Each ring is a loop.", "Each ring must lose exactly one of its own roads. The two choices are independent: multiply them.", "Example: two triangles sharing a corner: 3 choices for the first triangle times 3 for the second, so 9. Now do yours."]);
  };
  const mstQ = () => {
    const n = ri(5, 6), base = connGraph(n, ri(n + 1, n + 3)), ws = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), es = base.map((e, i) => [e[0], e[1], ws[i]]);
    const sorted = es.slice().sort((a, b) => a[2] - b[2]), p = Array.from({ length: n }, (_, i) => i), f = x => (p[x] === x ? x : (p[x] = f(p[x]))); let tot = 0;
    sorted.forEach(e => { if (f(e[0]) !== f(e[1])) { p[f(e[0])] = f(e[1]); tot += e[2]; } });
    return num(`Cables join these towns, each with a cost: ${wshow(es)}. What is the smallest total cost of cables that connects all ${n} towns together?`, big("🔌"), tot, [
      "You want everything connected with the fewest and cheapest cables. Loops waste money.",
      "Kruskal’s way: sort the cables from cheapest to most expensive. Take each one unless it would make a loop with cables you already chose. Stop when all towns are connected.",
      "Example: P–Q (1), Q–R (2), P–R (3), R–S (4): take 1, 2, skip 3 (loop), take 4. Total 7. Now do yours."]);
  };
  const pathQ = () => {
    const n = ri(5, 6), base = connGraph(n, ri(n + 1, n + 3)), es = base.map(e => [e[0], e[1], ri(1, 9)]), D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 0 : 1e9)));
    es.forEach(e => { D[e[0]][e[1]] = Math.min(D[e[0]][e[1]], e[2]); D[e[1]][e[0]] = Math.min(D[e[1]][e[0]], e[2]); });
    for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) D[i][j] = Math.min(D[i][j], D[i][k] + D[k][j]);
    const a = ri(0, n - 2), b = ri(a + 1, n - 1);
    return num(`Roads and their lengths: ${wshow(es)}. What is the length of the shortest route from ${VN[a]} to ${VN[b]}?`, big("🧭"), D[a][b], [
      "The route with fewer roads is not always shorter. Add up the lengths along the way.",
      `Work outwards from ${VN[a]}: write the shortest known distance next to each town, and improve it whenever a route through another town is shorter.`,
      "Example: P–Q (2), Q–R (2), P–R (5): P to R directly is 5, but through Q it is 4, so the shortest is 4. Now do yours."]);
  };
  const matchQ = () => {
    const np = ri(4, 5), likes = Array.from({ length: np }, () => shuf([0, 1, 2, 3, 4].slice(0, np)).slice(0, ri(1, 2))), job = j => "ABCDE"[j];
    const owner = Array(np).fill(-1), tryP = (u, seen) => { for (const j of likes[u]) { if (seen.has(j)) continue; seen.add(j); if (owner[j] < 0 || tryP(owner[j], seen)) { owner[j] = u; return true; } } return false; };
    let best = 0; for (let u = 0; u < np; u++) if (tryP(u, new Set())) best++;
    const names = ["Mia", "Leo", "Ava", "Sam", "Zoe"];
    return num(`${np} kids want jobs, and each job can go to only one kid. The jobs each kid would accept: ${likes.map((l, i) => `${names[i]}: ${l.map(job).join(" or ")}`).join("; ")}. What is the largest number of kids who can get a job they would accept?`, big("🧑‍🔧"), best, [
      "Try giving jobs one kid at a time. If a kid’s jobs are already taken, ask whether the kid holding one of them could take another job.",
      "Look for a group of kids who between them accept fewer jobs than there are kids in the group: someone in that group must go without.",
      "Example: kids X, Y, Z. X: 1 or 2; Y: 1; Z: 1. Only two jobs (1 and 2) are wanted by three kids, so at most 2 get a job. Now do yours."]);
  };
  const planarQ = () => {
    const T = ri(0, 3);
    if (T === 3) { const V = ri(5, 14); return num(`What is the largest number of roads a map-like network (one you can draw on paper with no roads crossing) of ${V} towns can have, if no two towns have more than one road? (Use E ≤ 3V − 6.)`, big("🗺️"), 3 * V - 6, ["Each region of a drawing is bounded by at least 3 roads, and each road borders at most 2 regions.", "This gives the formula in the question. Put the number of towns in place of V.", "Example: for 5 towns the limit is 3 × 5 − 6 = 9 roads. Now do yours."]); }
    let V, F, E; do { V = ri(5, 10); F = ri(4, 9); E = V + F - 2; } while (E > 3 * V - 6);
    const known = [`V = ${V} towns`, `E = ${E} roads`, `F = ${F} regions (counting the outside)`];
    const ask = [`How many towns are there?`, `How many roads are there?`, `How many regions (counting the outside region) does it split the page into?`][T];
    return num(`A connected network is drawn on paper with no roads crossing. ${known.filter((_, i) => i !== T).join(" and ")}. ${ask}`, big("🗺️"), [V, E, F][T], [
      "For connected drawings with no crossings there is a relation between towns, roads and regions, found by Euler.",
      "Euler’s formula: V − E + F = 2. Put in the two numbers you know and solve for the missing one.",
      "Example: a pyramid drawing has 4 towns and 6 roads. Then 4 − 6 + F = 2, so F = 4 regions. Now do yours."]);
  };
  const colorCQ = () => {
    const T = ri(0, 2);
    if (T === 0) { const n = ri(3, 5), k = ri(3, 4); return num(`A tree-shaped network has ${n} towns. You may colour each town with any of ${k} colours, but towns joined by a road need different colours. How many colourings are there?`, big("🎨"), k * Math.pow(k - 1, n - 1), ["Colour one town first, then colour its neighbours one at a time, working outwards.", "The first town has all the colours to choose from. Each new town only has to avoid its one neighbour already coloured.", "Example: two towns joined by a road, 5 colours: 5 × 4 = 20. Now do yours."]); }
    if (T === 1) { const n = ri(3, 6), k = ri(3, 4); return num(`${n} towns are joined in a ring. You may colour each town with any of ${k} colours, but towns joined by a road need different colours. How many colourings are there? (Formula: (k − 1)<sup>n</sup> + (−1)<sup>n</sup> × (k − 1).)`, big("🎨"), Math.pow(k - 1, n) + (n % 2 ? -1 : 1) * (k - 1), ["The question gives a formula for rings. Decide what k and n are.", `Use k = ${k} and n = ${n}. Work out the power, and add or subtract according to whether n is even or odd.`, "Example: a ring of 4 towns with 2 colours: (2 − 1)⁴ + 1 × (2 − 1) = 1 + 1 = 2 (the colours must alternate). Now do yours."]); }
    const n = ri(3, 4), k = ri(n, 6); let t = 1; for (let i = 0; i < n; i++) t *= k - i;
    return num(`${n} towns are all joined to each other by roads. You may colour the towns with any of ${k} colours, but towns joined by a road need different colours. How many colourings are there?`, big("🎨"), t, ["Every town is joined to every other, so all the colours used must be different.", "Colour the towns one after the other. The first has all the colours, the second has one fewer, and so on.", "Example: 2 towns joined, 5 colours: 5 × 4 = 20. Now do yours with more towns."]);
  };
  const tourQ = () => {
    const T = ri(0, 2);
    if (T === 0) { const n = ri(5, 8); return num(`A delivery van starts at the depot and must visit ${n - 1} other towns, each exactly once, and return. Every pair of towns has a direct road. How many different round trips are there? (Driving the same trip in the opposite direction counts as a different trip.)`, big("🚚"), fact(n - 1), ["The depot is fixed as the start. Only the order of the other towns matters.", `Arrange the ${n - 1} other towns in a row: that is a number of orders you can count with a factorial.`, "Example: depot and 3 other towns: 3! = 6 round trips. Now do yours."]); }
    if (T === 1) { const n = ri(5, 8); return num(`A tour visits each of ${n} towns exactly once and returns to the start. Every pair of towns has a direct road. How many different tours are there if the same loop driven backwards counts as the same tour?`, big("🔄"), fact(n - 1) / 2, ["Fix one town as the start. Arrange the other towns in a row.", "Each loop is counted twice: once in each direction. So divide by 2.", "Example: 4 towns: 3! = 6 orders, divided by 2 gives 3 different loops. Now do yours."]); }
    const n = ri(3, 4); return num(`${n} houses on the left and ${n} houses on the right: every left house has a path to every right house, and there are no other paths. A tour visits every house exactly once and returns to the start. How many different tours are there if the same loop driven backwards counts as the same? (Formula: n! × (n − 1)! ÷ 2.)`, big("🏘️"), fact(n) * fact(n - 1) / 2, ["The question gives a formula. Decide what n is.", `With n = ${n}, work out n! and (n − 1)!, multiply them, then divide by 2.`, "Example: n = 2 gives 2! × 1! ÷ 2 = 1: the only tour is the square around the four houses. Now do yours."]);
  };
  const binQ = () => {
    const T = ri(0, 2);
    if (T === 2) { const n = pick([16, 36, 64, 100, 144]); return num(`A fair coin is tossed ${n} times. The number of heads has variance n × ½ × ½. What is its standard deviation (the square root of the variance)?`, big("📊"), Math.sqrt(n) / 2, ["Variance of one toss times the number of tosses. Then take a square root.", `The variance is ${n} × ¼. Find it, then find the number that multiplies by itself to give it.`, "Example: 4 tosses have variance 4 × ¼ = 1, and standard deviation √1 = 1. Now do yours."]); }
    const d = pick([2, 3, 4, 6]), nn = { 2: 4, 3: 9, 4: 16, 6: 36 }[d] * ri(1, 3);
    const word = d === 2 ? "a fair coin lands heads" : d === 3 ? "a spinner lands on red" : d === 4 ? "a spinner lands on blue" : "a fair die shows a six";
    return num(`An experiment is repeated ${nn} times. Each time, ${word} with chance 1 in ${d}. Let X be the number of successes. What is the ${T === 0 ? "mean (average) of X" : "variance of X"}?`, big("📊"), T === 0 ? nn / d : nn * (d - 1) / (d * d), [
      "Each trial is a score of 1 (success) or 0 (fail). X is the total of the scores.",
      T === 0 ? "The mean of the total is the number of trials times the chance of success." : "For independent trials, the variance adds up. One trial has variance p × (1 − p), where p is the chance of success. Multiply by the number of trials.",
      "Example: 25 trials with chance 1 in 5: mean = 25 × 1/5 = 5, variance = 25 × 1/5 × 4/5 = 4. Now do yours."]);
  };
  const waitQ = () => {
    if (Math.random() < 0.5) { const k = ri(4, 20); return num(`A fair ${k}-sided die is rolled again and again until one particular face comes up. On average, how many rolls does it take?`, big("🎲"), k, ["If each roll has chance p of success, think of how many rolls on average you need for one success.", "If the chance is 1 in k, you expect about k rolls. Write E = 1 + (1 − p) × E to see why.", "Example: a fair coin until the first head: E = 1 + ½ × E, so E = 2. Now do yours."]); }
    const P = [["HH", 6, "two heads in a row"], ["HT", 4, "a head followed directly by a tail"], ["HHH", 14, "three heads in a row"], ["HHT", 8, "two heads followed by a tail"], ["HTH", 10, "head, tail, head"]], [pat, v, d] = pick(P);
    return num(`A fair coin is tossed again and again until the pattern <b>${pat}</b> (${d}) appears in a row. On average, how many tosses does it take?`, big("🪙"), v, ["Think about how much of the pattern you have matched so far; that is the state you are in.", "Write an equation for the average number of extra tosses from each state, and solve the equations together. Patterns that can overlap with themselves take longer than those that cannot.", "Example: waiting for a single H: E = 1 + ½ × E, so E = 2. Now do yours."]);
  };
  const bdayQ = () => {
    if (Math.random() < 0.25) { const d = ri(6, 40); return num(`People each pick one of ${d} choices (like birthdays). How many people must be in a room to be completely sure that two of them picked the same choice?`, big("🎂"), d + 1, ["Imagine people filling up the choices one by one, all different.", "When every choice is used by exactly one person, the next person must repeat one.", "Example: with 5 choices, 5 people can all be different, so the 6th must repeat. Now do yours."]); }
    const d = pick([10, 12, 20, 30, 50, 100, 365]); let pr = 1, n = 0; while (1 - pr <= 0.5) { pr *= (d - n) / d; n++; }
    return num(`${d} equally likely choices (like birthdays): what is the smallest group of people for which the chance that at least two share the same choice is above 50%?`, big("🎂"), n, ["It is easier to find the chance that nobody shares, and take it from 1.", `Multiply the chances that each new person avoids all earlier ones: (${d} − 1) ÷ ${d}, then (${d} − 2) ÷ ${d}, and so on. Stop when the product drops below one half.`, "Example: with 4 choices, the chance that 3 people all differ is 1 × 3/4 × 2/4 = 0.375, so sharing has chance 0.625. With 2 people it is only 0.25. So 3 people are needed. Now do yours."]);
  };
  const markQ = () => {
    const a = ri(1, 9), c = ri(1, 9), T = ri(0, 2);
    const base = `Each day is sunny or rainy. After a sunny day, the next day is sunny with chance ${a} in 10. After a rainy day, the next day is sunny with chance ${c} in 10.`;
    if (T === 0) return num(`${base} Today is sunny. What is the chance (in percent) that the day after tomorrow is sunny?`, big("⛅"), a * a + (10 - a) * c, ["List the ways to be sunny in two days: tomorrow sunny then sunny, or tomorrow rainy then sunny.", "Multiply the chances along each route, then add the routes. Multiplying tenths by tenths gives hundredths, which are percents.", "Example: after sunny the chance of sunny is ½, after rainy it is ¼. Two days on, from sunny: ½ × ½ + ½ × ¼ = ⅜. Now do yours (in percent)."]);
    if (T === 1) return num(`${base} Today is sunny. What is the chance (in percent) that the day after tomorrow is rainy?`, big("🌧️"), 100 - (a * a + (10 - a) * c), ["There are only two outcomes for the day after tomorrow. It is rainy exactly when it is not sunny.", "Work out the chance of sunny in two days (add the two routes), then take it away from 100%.", "Example: if the chance of sunny is ⅜, the chance of rainy is ⅝. Now do yours (in percent)."]);
    return num(`${base} Today is rainy. What is the chance (in percent) that the day after tomorrow is sunny?`, big("⛅"), c * a + (10 - c) * c, ["Start from a rainy day. Tomorrow can be sunny or rainy; list both routes to a sunny day after tomorrow.", "Route 1: tomorrow sunny, then sunny again. Route 2: tomorrow rainy, then sunny. Multiply along each route in tenths and add.", "Example: after sunny the chance of sunny is ½, after rainy it is ¼. From rainy: ¼ × ½ + ¾ × ¼ = 5/16. Now do yours (in percent)."]);
  };
  const ruinQ = () => {
    if (Math.random() < 0.6) { const N = pick([4, 5, 10, 20, 25]), k = ri(1, N - 1); return num(`You play a fair game: each round you win 1 coin or lose 1 coin, with equal chance. You start with ${k} coins and stop when you have ${N} coins (win) or 0 coins (broke). What is the chance (in percent) that you reach ${N} coins?`, big("🪙"), k * 100 / N, ["In a fair game your average fortune never changes from round to round.", "At the end you hold either 0 or the goal. Your average fortune at the end equals your starting fortune.", "Example: start with 3 coins, goal 8: the chance of winning is 3 ÷ 8 = 37.5%. Now do yours (in percent)."]); }
    const N = pick([4, 5, 6, 8, 10, 12]), k = ri(1, N - 1);
    return num(`You play a fair game: each round you win 1 coin or lose 1 coin, with equal chance. You start with ${k} coins and stop at 0 coins or ${N} coins. On average, how many rounds does the game last? (Formula: start × (goal − start).)`, big("⏳"), k * (N - k), ["The question gives the formula. Decide what the start and the goal are.", `Multiply your starting coins (${k}) by the number of coins from the start to the goal.`, "Example: start 1, goal 3: 1 × 2 = 2 rounds on average. Now do yours."]);
  };
  const diceWaysQ = () => {
    const f = pick([6, 6, 4]), n = ri(3, 4); let ways = { 0: 1 };
    for (let i = 0; i < n; i++) { const nx = {}; for (const s in ways) for (let x = 1; x <= f; x++) nx[+s + x] = (nx[+s + x] || 0) + ways[s]; ways = nx; }
    const lo = n, hi = n * f, s = ri(lo + 1, hi - 1);
    return num(`${n} fair dice with ${f} faces (numbered 1 to ${f}) are rolled. In how many different ways can they show a total of ${s}? (Different order counts as different, like 1+2+3 and 3+2+1 on different dice.)`, big("🎲"), ways[s], ["Think of the dice as separate, so (1, 2) and (2, 1) are different outcomes.", `Fix the first die, then count the ways the remaining dice make up the rest. Build up from fewer dice.`, "Example: two six-sided dice, total 9: (3,6) (4,5) (5,4) (6,3), so 4 ways. Now do yours."]);
  };
  const neckQ = () => {
    const n = ri(3, 6), k = ri(2, 3); let t = 0; for (let i = 0; i < n; i++) t += Math.pow(k, gcd(i, n));
    return num(`A necklace has ${n} beads in a circle. Each bead can be one of ${k} colours. Two necklaces are the same if one can be turned (rotated) to look like the other. How many different necklaces are there?`, big("📿"), t / n, ["Counting all colourings overcounts, because many are just turned copies of each other.", "Burnside’s idea: for each way of turning (including not turning), count the colourings that look unchanged. Add these up and divide by the number of turnings.", "Example: 2 beads, 2 colours: turning by 0 keeps all 4, turning by 1 keeps 2 (AA and BB). The average is (4 + 2) ÷ 2 = 3. Now do yours."]);
  };
  const boolQ = () => {
    const T = ri(0, 3);
    if (T === 0) { const n = ri(2, 4); return num(`A logic rule takes ${n} true-or-false inputs and gives true or false. How many different rules are there altogether?`, big("🔌"), Math.pow(2, Math.pow(2, n)), ["A rule is decided by its truth table. First count the rows.", `${n} inputs give 2<sup>${n}</sup> rows. For each row, the rule says true or false. Count the choices.`, "Example: one input has 2 rows, so 2 × 2 = 4 rules (always true, always false, copy, flip). Now do yours."]); }
    if (T === 1) { const n = ri(2, 3), r = Math.pow(2, n), k = ri(1, r - 1); return num(`A logic rule takes ${n} true-or-false inputs. Its truth table has ${r} rows. How many different rules are true in exactly ${k} of the rows?`, big("🔌"), comb(r, k), ["Choose which rows give true. All other rows give false.", `Choose ${k} rows out of ${r}.`, "Example: 2 inputs have 4 rows. Rules true in exactly 1 row: choose 1 of 4 rows, so 4. Now do yours."]); }
    if (T === 2) { const n = ri(2, 3); return num(`A logic rule takes ${n} true-or-false inputs. How many different rules give <b>true</b> when every input is false?`, big("🔌"), Math.pow(2, Math.pow(2, n) - 1), ["One row of the truth table is fixed. How many rows are left to decide?", "Each remaining row can be true or false, so multiply two for each remaining row.", "Example: 1 input has 2 rows. Rules true on the all-false row: the other row is free, so 2. Now do yours."]); }
    const n = ri(2, 4); return num(`A logic rule takes ${n} true-or-false inputs. How many rows does its truth table have?`, big("🔌"), Math.pow(2, n), ["Each input can be true or false. The rows are all the combinations.", "Double the number of rows for each extra input.", "Example: 3 inputs give 2 × 2 × 2 = 8 rows. Now do yours with the number of inputs in the question."]);
  };

  const mk27 = [degQ, walkQ, compQ27, spanQ, mstQ, pathQ, matchQ, planarQ, colorCQ, tourQ, binQ, waitQ, bdayQ, markQ, ruinQ, diceWaysQ, neckQ, boolQ];
  const L27 = [
    L("Can degrees form a network?", degQ, [S("Degree", "🔢", "The degree of a town is the number of roads at it."), S("Even total", "➗", "Each road is counted twice, so the degrees must add to an even number."), S("Havel–Hakimi", "🔧", "Remove the biggest number d, subtract 1 from the next d biggest, and repeat. All zeros means it is possible.")]),
    L("Walks of length two", walkQ, [S("Walk", "🚶", "A walk of length 2 follows two roads in a row. It can return to where it started."), S("Middle town", "📍", "From A to B: count the middle towns joined to both A and B."), S("From one town", "🧮", "All walks of length 2 from A: add up the number of roads at each neighbour of A.")]),
    L("Components and cycles", compQ27, [S("Components", "🏘️", "A component is a group of towns that can reach each other by roads."), S("Tree", "🌳", "A group of k towns needs at least k − 1 roads to be connected."), S("Extra roads", "➕", "Extra roads = roads − towns + components. Each one closes a loop.")]),
    L("Counting spanning trees", spanQ, [S("Spanning tree", "🌲", "A set of roads that connects all towns using the fewest roads, with no loops."), S("Cayley", "🧮", "A complete network on n towns has nⁿ⁻² spanning trees."), S("Ring", "⭕", "A ring of n towns has n spanning trees: remove any one road.")]),
    L("Cheapest network", mstQ, [S("Goal", "🔌", "Connect all towns with the smallest total cost."), S("Kruskal", "📋", "Sort cables from cheapest to dearest. Take a cable unless it makes a loop."), S("Stop", "🛑", "Stop when you have one road fewer than the number of towns.")]),
    L("Cheapest route", pathQ, [S("Weights", "⚖️", "Roads have lengths. The shortest route is the one with the smallest total."), S("Improve", "🔄", "Keep a best known distance for each town and improve it through other towns."), S("Fewer roads is not shorter", "⚠️", "A route with more roads can still be shorter in total.")]),
    L("Matchings", matchQ, [S("Matching", "🤝", "Give each kid one job, with no job shared."), S("Swap", "🔁", "If a kid’s jobs are taken, ask the holder whether they can switch to another job."), S("Hall’s check", "🚧", "If k kids together accept fewer than k jobs, someone must go without.")]),
    L("Planar maps: Euler’s formula", planarQ, [S("Regions", "🗺️", "Drawn without crossings, a network splits the page into regions. The outside counts."), S("Euler", "✅", "For a connected drawing: V − E + F = 2."), S("Limit", "📏", "A simple network that can be drawn without crossings has at most 3V − 6 roads (V ≥ 3).")]),
    L("Counting proper colourings", colorCQ, [S("Rule", "🎨", "Joined towns must get different colours."), S("One by one", "1️⃣", "Colour the towns in turn and count the choices left for each."), S("Shapes", "📐", "Tree: k(k−1)ⁿ⁻¹. Complete network: k(k−1)(k−2)… Ring: (k−1)ⁿ + (−1)ⁿ(k−1).")]),
    L("Counting tours", tourQ, [S("Tour", "🚚", "Visit every town once and come back."), S("Fix the start", "📍", "Fix one town as the start, then arrange the others in order: (n − 1)! orders."), S("Direction", "🔄", "If the opposite direction counts as the same, divide by 2.")]),
    L("Mean and variance of counts", binQ, [S("Count of successes", "📊", "Repeat a trial n times with chance p of success. X is the number of successes."), S("Mean", "➗", "The mean of X is n × p."), S("Variance", "📈", "The variance of X is n × p × (1 − p). The standard deviation is its square root.")]),
    L("Waiting times", waitQ, [S("Chance 1 in k", "⏳", "If each try succeeds with chance 1 in k, you wait k tries on average."), S("States", "🔀", "For patterns of coin tosses, track how much of the pattern you have matched."), S("Surprise", "😮", "On average HH takes 6 tosses but HT only 4, because HH can overlap with itself.")]),
    L("Birthday problem", bdayQ, [S("Opposite", "🔄", "Find the chance that all are different, then take it from 1."), S("Multiply", "✖️", "(d−1)/d × (d−2)/d × … for each new person."), S("Famous", "🎂", "With 365 days, 23 people give a chance above 50% that two share a birthday.")]),
    L("Two-step chances", markQ, [S("Chain", "🔗", "Tomorrow depends only on today. This is called a Markov chain."), S("Routes", "🛤️", "To get two days ahead, list all routes through tomorrow and multiply along each route."), S("Add", "➕", "Add the chances of the routes that end where you want.")]),
    L("Gambler’s ruin", ruinQ, [S("Fair game", "⚖️", "In a fair game the average fortune stays the same."), S("Chance of winning", "🏆", "Start k, goal N: the chance to reach N is k ÷ N."), S("Duration", "⏳", "The average number of rounds is k × (N − k).")]),
    L("Ways to roll a total", diceWaysQ, [S("Different dice", "🎲", "Treat each die as separate, so (1, 2) and (2, 1) are different."), S("Build up", "🪜", "Count ways for 2 dice, then add a third die."), S("Table", "📋", "Ways for a total with n dice = sum of the ways for n − 1 dice with totals from 1 to the number of faces smaller.")]),
    L("Necklaces", neckQ, [S("Turning", "📿", "Necklaces that match after a turn are the same."), S("Burnside", "🧮", "Average, over all turns, the number of colourings that stay unchanged."), S("Fixed colourings", "🔒", "Turning by i steps keeps k^gcd(i, n) colourings, with gcd(0, n) = n.")]),
    L("Counting logic rules", boolQ, [S("Truth table", "📋", "A rule with n inputs has 2ⁿ rows."), S("Choose each row", "✅", "Each row can be true or false: 2^(2ⁿ) different rules."), S("Fix some rows", "🔒", "Fixing some rows cuts the choices. Exactly k true rows: C(2ⁿ, k) rules.")]),
    L("Mixed practice", mixOf(mk27), MIXS("Networks, trees, routes, matchings, colourings, tours, averages, waiting times, chance chains, necklaces and logic rules.")),
    L("Level 27 Challenge", mixOf(mk27), MIXS("Level 27 mixes graphs, counting, chance and logic.")),
  ];

  Object.assign(LOGIC_LEVELS, { 25: L25, 26: L26, 27: L27 });
})();
