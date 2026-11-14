// ext/logic-28-30.js  Mind Lab Logic & Puzzles levels 28-30 (60 lessons)
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
  const txt = (text, visual, answer, hints) => ({ text, visual, textInput: true, answer, hints });
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => a / gcd(a, b) * b;
  const comb = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const phi = n => { let c = 0; for (let i = 1; i <= n; i++) if (gcd(i, n) === 1) c++; return c; };
  const pw = (b, e, m) => { let r = 1; b %= m; for (let i = 0; i < e; i++) r = r * b % m; return r; };
  const ordMod = (a, n) => { let k = 1, x = a % n; while (x !== 1) { x = x * a % n; k++; } return k; };
  const frac = (a, b) => { const g = gcd(a, b) || 1; a /= g; b /= g; return b === 1 ? String(a) : a + "/" + b; };
  const r2 = x => Math.round(x * 100) / 100;
  const mixOf = ms => () => pick(ms)();
  const MIXS = topics => [
    S("Review time!", "🔄", "This lesson mixes puzzles from earlier lessons in this level. Take your time with each one."),
    S("Remember", "🧠", topics),
    S("Tip", "💡", "Work out what kind of puzzle it is first. Then use the method you learned for that kind.")
  ];
  const lines = ls => `<div style="font-size:1.25em;line-height:1.6">${ls.join("<br>")}</div>`;
  const TB = (rows, head) => `<table style="border-collapse:collapse;font-size:1.2em;margin:auto">` + (head ? `<tr>${head.map(h => `<th style="border:1px solid #889;padding:4px 10px;background:#eef2ff;color:#1a2a55">${h}</th>`).join("")}</tr>` : "") + rows.map(r => `<tr>${r.map(c => `<td style="border:1px solid #889;padding:4px 10px;text-align:center">${c}</td>`).join("")}</tr>`).join("") + `</table>`;
  const vname = i => String.fromCharCode(64 + i);

  // =====================================================================
  // LEVEL 28
  // =====================================================================
  const relQ = () => {
    const kinds = [
      ["relations (any collection of ordered pairs)", n => n * n, 3],
      ["reflexive relations (every pair (x, x) must be included)", n => n * n - n, 4],
      ["symmetric relations (if (x, y) is in, so is (y, x))", n => n * (n + 1) / 2, 4],
      ["relations that are both reflexive and symmetric", n => n * (n - 1) / 2, 4],
      ["relations that contain no pair (x, x) at all", n => n * n - n, 4]
    ];
    const k = pick(kinds), n = ri(2, k[2]), e = k[1](n);
    return num(`How many different <b>${k[0]}</b> are there on a set with ${n} elements?`, big("🔗"), 2 ** e, [
      "A relation is a set of ordered pairs from the set × itself. Decide which pairs are forced and which pairs you are free to include or leave out.",
      "Count the free choices, call it f. Each free pair is either in or out, so the answer is 2 multiplied by itself f times. For symmetric, a pair of mirror pairs counts as one choice.",
      "Example: symmetric relations on 2 elements {a, b}. Free choices: (a, a), (b, b), and the mirror pair {(a, b), (b, a)}. That is 3 choices, so 2³ = 8. Now do yours."]);
  };
  const closQ = () => {
    const n = ri(4, 5), m = ri(3, 5), s = new Set();
    while (s.size < m) { const a = ri(1, n), b = ri(1, n); if (a !== b) s.add(a + ">" + b); }
    const E = [...s].map(x => x.split(">").map(Number));
    const r = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false));
    E.forEach(([a, b]) => { r[a][b] = true; });
    for (let k = 1; k <= n; k++) for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) if (r[i][k] && r[k][j]) r[i][j] = true;
    let c = 0; for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) if (r[i][j]) c++;
    return num(`A relation on {1, …, ${n}} has these pairs. Add the fewest new pairs that make it transitive. How many pairs does the result have in total?`, big(E.map(e => `${e[0]}→${e[1]}`).join(" &nbsp; "), 1.4), c, [
      "Transitive means: if a→b and b→c are both there, then a→c must be there too. Follow each arrow one step further.",
      "For every starting number, list everything you can reach by following arrows any number of steps. Each reachable (start, end) pair counts once. A loop back to the start gives a pair like (a, a).",
      "Example: pairs 1→2, 2→3. From 1 you reach 2 and 3, from 2 you reach 3. The closure is 1→2, 1→3, 2→3: three pairs. Now do yours."]);
  };
  const BELL = [1, 1, 2, 5, 15, 52, 203];
  const bellQ = () => {
    const t = ri(0, 3), n = t < 2 ? ri(2, 6) : ri(3, 7);
    if (t === 0) return num(`How many different equivalence relations are there on a set with ${n} elements?`, big("🧩"), BELL[n], [
      "Every equivalence relation splits the set into groups (classes) that do not overlap. Different splits give different relations.",
      "So count the ways to split the set into groups, where the order of the groups and the order inside a group do not matter. The numbers 1, 2, 5, 15, 52 grow quickly (they are called Bell numbers).",
      "Example: for 3 elements a, b, c the splits are abc | a,bc | b,ac | c,ab | a,b,c. Count them, then use the Bell numbers for yours."]);
    if (t === 1) return num(`In how many ways can ${n} different people be split into teams (any number of teams, nobody left out, the order of teams does not matter)?`, big("👥"), BELL[n], [
      "This is the same as splitting a set into non-empty groups. A person alone makes a team of one.",
      "Use the Bell numbers: they count all splits of a set. Build them up: the number for n is the sum of C(n−1, k) times the number for k, for k from 0 up to n−1.",
      "Example: 3 people: all together (1), one alone with the other two (3), all alone (1): 5 ways. Now do yours."]);
    if (t === 2) return num(`In how many ways can ${n} different people be split into exactly <b>two</b> non-empty teams (the teams are not labelled)?`, big("👥"), 2 ** (n - 1) - 1, [
      "Give each person a team label A or B, then notice that swapping the labels gives the same split, and that nobody-in-a-team is not allowed.",
      "Count labellings: 2 choices per person. Remove the two labellings where everyone is in one team, then divide by 2 because the teams are not labelled.",
      "Example: 3 people: 2³ = 8 labellings, minus 2 = 6, divided by 2 = 3 splits. Now do yours."]);
    return num(`In how many ways can ${n} different people be split into exactly <b>${n - 1}</b> non-empty teams?`, big("👥"), comb(n, 2), [
      "Almost everyone is alone. Think about what the single team of two looks like.",
      "Exactly one team has two people and all the others are alone. So the split is decided by choosing which two people team up.",
      "Example: 4 people into 3 teams: choose the pair, C(4, 2) = 6 ways. Now do yours."]);
  };
  const latQ = () => {
    const N = pick([60, 72, 90, 84, 120, 36, 48, 100, 144, 180]);
    const D = []; for (let i = 1; i <= N; i++) if (N % i === 0) D.push(i);
    const a = pick(D.filter(x => x > 1 && x < N)); let b; do { b = pick(D.filter(x => x > 1 && x < N)); } while (b === a || a % b === 0 || b % a === 0);
    const t = ri(0, 3);
    const head = `The numbers ${D.join(", ")} (the divisors of ${N}) are ordered by “divides”: x is below y when x divides y.`;
    if (t === 0) return num(`${head} What is the <b>greatest lower bound</b> of ${a} and ${b} (the biggest element below both)?`, big("🔻"), gcd(a, b), [
      "Which numbers are below both? They divide both. You want the biggest of those.",
      "In the divisibility order, the greatest lower bound is the greatest common divisor.",
      "Example: for 8 and 12 the common divisors are 1, 2, 4, so the greatest lower bound is 4. Now do yours."]);
    if (t === 1) return num(`${head} What is the <b>least upper bound</b> of ${a} and ${b} (the smallest element above both)?`, big("🔺"), lcm(a, b), [
      "Elements above both are multiples of both. You want the smallest one.",
      "In the divisibility order, the least upper bound is the least common multiple. It is also given by a × b divided by the greatest common divisor.",
      "Example: for 4 and 6 the common multiples start 12, 24, so the least upper bound is 12. Now do yours."]);
    if (t === 2) return num(`How many elements are in the divisibility order of the divisors of ${N}?`, big("📋"), D.length, [
      "Count the numbers that divide it without a remainder. Write the prime factorisation first.",
      "If the number is p^a × q^b × r^c, the number of divisors is (a+1)(b+1)(c+1). Each prime power can be used 0 up to its full exponent.",
      "Example: 12 = 2² × 3 has (2+1)(1+1) = 6 divisors: 1, 2, 3, 4, 6, 12. Now do yours."]);
    return num(`${head} How many elements are below or equal to ${a} in this order (including ${a} itself)?`, big("⬇️"), D.filter(x => a % x === 0).length, [
      "Elements below or equal to a number are the numbers that divide it. Only look at the ones in the list.",
      "Count all divisors of the given number. Use its prime factorisation and multiply (exponent + 1) for each prime.",
      "Example: below or equal to 18 are 1, 2, 3, 6, 9, 18: that is 6 elements. Now do yours."]);
  };
  const linExtQ = () => {
    const n = ri(4, 5), base = shuf(Array.from({ length: n }, (_, i) => i)), m = ri(2, 4), cons = new Set();
    while (cons.size < m) { const i = ri(0, n - 2), j = ri(i + 1, n - 1); cons.add(base[i] + ">" + base[j]); }
    const C = [...cons].map(x => x.split(">").map(Number));
    let cnt = 0; const perm = [], used = Array(n).fill(false);
    const go = () => {
      if (perm.length === n) { const pos = {}; perm.forEach((v, i) => { pos[v] = i; }); if (C.every(([a, b]) => pos[a] < pos[b])) cnt++; return; }
      for (let v = 0; v < n; v++) if (!used[v]) { used[v] = true; perm.push(v); go(); perm.pop(); used[v] = false; }
    };
    go();
    return num(`${n} jobs ${Array.from({ length: n }, (_, i) => vname(i + 1)).join(", ")} must be done one at a time. Rules: ${C.map(([a, b]) => `${vname(a + 1)} before ${vname(b + 1)}`).join("; ")}. How many different orders obey all the rules?`, big("🗂️"), cnt, [
      "Without rules there are n! orders. Each rule cuts some of them out. Try listing orders in a systematic way.",
      "Pick which job can go first (it must not have to wait for another job). Then repeat for the rest. Count every branch.",
      "Example: 3 jobs, rule A before B. Orders of A, B, C with A before B: ABC, ACB, CAB: 3 orders. Now do yours."]);
  };
  const setsetQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(0, 3); return num(`A set A has ${n} element${n === 1 ? "" : "s"}. How many elements does the set of all subsets of all subsets of A have? That is |P(P(A))|.`, big("🪆"), 2 ** (2 ** n), [
      "Work in two steps: first count the subsets of A. That gives the size of P(A).",
      "P(A) is itself a set. Count how many subsets a set of that size has: it is 2 raised to its size.",
      "Example: if A has 2 elements, P(A) has 4 elements, so P(P(A)) has 2⁴ = 16 elements. Now do yours."]); }
    if (t === 1) { const n = ri(2, 3), k = n === 2 ? ri(1, 4) : ri(2, 3); return num(`A has ${n} elements. How many subsets of <b>P(A)</b> have exactly ${k} element${k === 1 ? "" : "s"}? (These are collections of exactly ${k} subset${k === 1 ? "" : "s"} of A.)`, big("🪆"), comb(2 ** n, k), [
      "First find how many elements P(A) has. Then choose k of them.",
      "P(A) has 2ⁿ elements when A has n. Choosing k of those 2ⁿ objects is a plain “choose” count.",
      "Example: A has 2 elements, so P(A) has 4 elements. Collections of exactly 3 of them: C(4, 3) = 4. Now do yours."]); }
    if (t === 2) { const n = ri(2, 6); return num(`A has ${n} elements. How many ordered pairs (X, a) are there with X a subset of A and a an element of A? That is |P(A) × A|.`, big("✖️"), 2 ** n * n, [
      "A cartesian product has (size of first set) × (size of second set) pairs.",
      "The first set is all subsets of A. Its size is 2ⁿ. The second set is A itself. Multiply.",
      "Example: A has 3 elements: 8 subsets × 3 elements = 24 pairs. Now do yours."]); }
    const n = ri(3, 7);
    return num(`A has ${n} elements. How many subsets of A have <b>at least 2</b> elements?`, big("🔢"), 2 ** n - 1 - n, [
      "Count all subsets, then take away the ones that are too small.",
      "Too small means: the empty set, and the sets with exactly one element. There is one empty set, and as many one-element sets as A has elements.",
      "Example: A has 4 elements: 16 subsets, minus 1 empty, minus 4 singletons = 11. Now do yours."]);
  };
  const REG = [
    ["A ∪ B", (a, b, c) => a || b], ["A ∩ B", (a, b, c) => a && b], ["A ∖ B (in A but not in B)", (a, b, c) => a && !b],
    ["(A ∩ B) ∖ C", (a, b, c) => a && b && !c], ["A △ B (in exactly one of A, B)", (a, b, c) => a !== b], ["(A ∪ B) ∖ C", (a, b, c) => (a || b) && !c],
    ["A ∩ B ∩ C", (a, b, c) => a && b && c], ["A ∪ B ∪ C", (a, b, c) => a || b || c], ["(A ∪ C) ∩ B", (a, b, c) => (a || c) && b],
    ["the elements in none of the three sets", (a, b, c) => !a && !b && !c], ["the elements in exactly one of the three sets", (a, b, c) => a + b + c === 1],
    ["(A ∩ B) ∪ C", (a, b, c) => (a && b) || c], ["C ∖ (A ∪ B)", (a, b, c) => c && !a && !b]
  ];
  const vennQ = () => {
    const cnt = Array.from({ length: 8 }, () => ri(1, 9)); // index = a*4+b*2+c
    const e = pick(REG); let s = 0;
    for (let k = 0; k < 8; k++) if (e[1](!!(k & 4), !!(k & 2), !!(k & 1))) s += cnt[k];
    return num(`A Venn diagram of three sets A, B, C in a universe of elements has these counts. How many elements are in <b>${e[0]}</b>?`, lines([
      `only A: ${cnt[4]} &nbsp; only B: ${cnt[2]} &nbsp; only C: ${cnt[1]}`, `A and B only: ${cnt[6]} &nbsp; A and C only: ${cnt[5]} &nbsp; B and C only: ${cnt[3]}`, `all three: ${cnt[7]} &nbsp; none of them: ${cnt[0]}`]), s, [
      "Check each of the eight regions one by one: does it belong to the set described? Tick the regions that do.",
      "Add the counts of the ticked regions only. Be careful with the words: ∪ means in at least one, ∩ means in both, ∖ means “but not in”, △ means in exactly one.",
      "Example: counts only A 2, only B 3, A and B only 4. The set A ∪ B uses all three regions: 2 + 3 + 4 = 9 (plus any region with C that also lies in A or B). Now do yours."]);
  };
  const IDEN = [
    ["A ∖ (B ∪ C) = (A ∖ B) ∩ (A ∖ C)", (a, b, c) => a && !(b || c), (a, b, c) => (a && !b) && (a && !c)],
    ["A ∖ (B ∩ C) = (A ∖ B) ∪ (A ∖ C)", (a, b, c) => a && !(b && c), (a, b, c) => (a && !b) || (a && !c)],
    ["(A ∪ B) ∖ C = A ∪ (B ∖ C)", (a, b, c) => (a || b) && !c, (a, b, c) => a || (b && !c)],
    ["A △ (B △ C) = (A △ B) △ C", (a, b, c) => a !== (b !== c), (a, b, c) => (a !== b) !== c],
    ["A ∩ (B △ C) = (A ∩ B) △ (A ∩ C)", (a, b, c) => a && (b !== c), (a, b, c) => (a && b) !== (a && c)],
    ["A ∪ (B △ C) = (A ∪ B) △ (A ∪ C)", (a, b, c) => a || (b !== c), (a, b, c) => (a || b) !== (a || c)],
    ["(A ∖ B) ∖ C = A ∖ (B ∖ C)", (a, b, c) => a && !b && !c, (a, b, c) => a && !(b && !c)],
    ["A ∖ (B ∖ C) = (A ∖ B) ∪ (A ∩ C)", (a, b, c) => a && !(b && !c), (a, b, c) => (a && !b) || (a && c)],
    ["(A ∩ B) ∪ C = (A ∪ C) ∩ (B ∪ C)", (a, b, c) => (a && b) || c, (a, b, c) => (a || c) && (b || c)],
    ["A △ B = (A ∪ B) ∖ (A ∩ B)", (a, b, c) => a !== b, (a, b, c) => (a || b) && !(a && b)],
    ["the complement of (A ∪ B) = (complement of A) ∪ (complement of B)", (a, b, c) => !(a || b), (a, b, c) => !a || !b],
    ["the complement of (A ∩ B) = (complement of A) ∪ (complement of B)", (a, b, c) => !(a && b), (a, b, c) => !a || !b],
    ["A ∖ B = A ∩ (complement of B)", (a, b, c) => a && !b, (a, b, c) => a && !b],
    ["A ∩ (B ∪ C) = (A ∩ B) ∪ C", (a, b, c) => a && (b || c), (a, b, c) => (a && b) || c],
    ["A △ A = A", (a, b, c) => false, (a, b, c) => a],
    ["(A ∖ B) ∪ (B ∖ A) = A △ B", (a, b, c) => (a && !b) || (b && !a), (a, b, c) => a !== b]
  ];
  const idenQ = () => {
    const it = pick(IDEN); let ok = true;
    for (let k = 0; k < 8; k++) { const a = !!(k & 4), b = !!(k & 2), c = !!(k & 1); if (it[1](a, b, c) !== it[2](a, b, c)) ok = false; }
    return tfq(`True or false? This set identity holds for <b>all</b> sets A, B, C: ${it[0]}`, big("⚖️"), ok, [
      "A set identity is true only if both sides contain exactly the same elements, whatever the sets are. Think of a single element and where it could sit: in or out of each set.",
      "There are 8 ways an element can sit relative to A, B, C. Check both sides for each way. One way where they disagree is enough to show the identity is not always true.",
      "Example: A ∪ B = A ∩ B? Take an element in A only: it is in the left side but not in the right side, so the identity does not always hold. Now do yours."]);
  };
  const COMP = [
    ["¬ and ∧", true], ["¬ and ∨", true], ["¬ and →", true], ["→ and ⊕", true], ["NAND alone", true], ["NOR alone", true], ["↔ and ⊕ and ∧", true],
    ["∧ and ∨", false], ["∧, ∨ and →", false], ["∧ and ⊕", false], ["↔ and ⊕", false], ["∧ and →", false], ["¬ and ↔", false], ["→ and ∨", false], ["¬ and ⊕", false]
  ];
  const compQ = () => {
    const c = pick(COMP);
    return tfq(`True or false? Using only <b>${c[0]}</b> (and as many copies and variables as you like) you can build every possible logic rule.`, big("🧱"), c[1], [
      "To build every rule you need something that can make a “not”, and something that combines. Ask whether the tools are able to turn a true into a false.",
      "A set is stuck if every rule it builds keeps some property, for example: all inputs true always gives true, or the rule is “linear” (only ⊕ and ↔ style). Stuck sets cannot make ¬.",
      "Example: {∧, ∨} can only build rules that give true when every input is true, so it can never build ¬p. It is not complete. {¬, ∧} is complete because p ∨ q = ¬(¬p ∧ ¬q). Now do yours."]);
  };
  const LITS = ["p", "q", "r"];
  const litTxt = (v, neg) => (neg ? "¬" : "") + v;
  const satQ = () => {
    const nc = ri(3, 5), cls = [];
    for (let i = 0; i < nc; i++) { const k = ri(2, 3), vs = shuf(LITS).slice(0, k); cls.push(vs.map(v => [v, Math.random() < 0.5])); }
    let c = 0;
    for (let a = 0; a < 8; a++) { const e = { p: !!(a & 4), q: !!(a & 2), r: !!(a & 1) }; if (cls.every(cl => cl.some(([v, ng]) => e[v] !== ng))) c++; }
    const f = cls.map(cl => "(" + cl.map(([v, ng]) => litTxt(v, ng)).join(" ∨ ") + ")").join(" ∧ ");
    if (Math.random() < 0.5) return num(`For how many of the 8 true/false settings of p, q, r is this statement true?`, big(f, 1.3), c, [
      "Each bracket is a clause: it needs at least one of its parts to be true. The whole statement needs every clause satisfied.",
      "Try the 8 settings in order. For each one check every clause. Count the settings where no clause fails.",
      "Example: (p ∨ q) ∧ (¬p ∨ q) is true when q is true (4 of the 8 settings) and false when q is false. So the count is 4. Now do yours."]);
    return tfq(`True or false? There is a way to set p, q, r to true or false that makes this whole statement true.`, big(f, 1.3), c > 0, [
      "You only need to find one setting that makes every bracket true. If you cannot, try to explain why every setting breaks a bracket.",
      "Start with the short clauses: they force a lot. Then try the rest. Each bracket needs at least one true part.",
      "Example: (p) ∧ (¬p ∨ q) forces p true and then q true: that setting works. But (p) ∧ (¬p) cannot work. Now do yours."]);
  };
  const fmtCl = cl => (cl.length ? "(" + cl.join(" ∨ ") + ")" : "the empty clause (a contradiction)");
  const srt = cl => cl.slice().sort((a, b) => a.replace("¬", "").localeCompare(b.replace("¬", "")) || (a.length - b.length));
  const resQ = () => {
    const vars = shuf(["p", "q", "r", "s"]), x = vars[0], rest = vars.slice(1);
    for (;;) {
      const o1 = [], o2 = [];
      for (const v of rest) { const u = ri(0, 3); if (u === 1) o1.push(Math.random() < 0.5 ? v : "¬" + v); else if (u === 2) o2.push(Math.random() < 0.5 ? v : "¬" + v); }
      const all = [...new Set([...o1, ...o2])];
      if (all.some(l => all.includes("¬" + l))) continue;
      if (o1.length + o2.length === 0 && Math.random() < 0.7) continue;
      const A = srt([x, ...o1]), B = srt(["¬" + x, ...o2]), R = srt(all);
      const wrongs = [fmtCl(srt([...all, x])), fmtCl(srt(o1.length ? o1 : [...all, "¬" + x])), fmtCl(srt(all.length ? [all[0]] : [x])), fmtCl(srt(all.map(l => (l.startsWith("¬") ? l.slice(1) : "¬" + l)))), fmtCl(srt([...all, "¬" + x]))];
      return mcq(`Resolution rule: from two clauses where one has ${x} and the other has ¬${x}, you may combine the rest. What clause follows from ${fmtCl(A)} and ${fmtCl(B)}?`, big("🔗"), fmtCl(R), wrongs, [
        "Find the letter that appears plainly in one clause and negated in the other. That letter is cancelled.",
        "Keep every other part of both clauses, joined with ∨, and write each part once. The cancelled letter does not appear in the result. If nothing is left, you have found a contradiction.",
        "Example: (a ∨ b) and (¬a ∨ c) give (b ∨ c). And (a) with (¬a) gives the empty clause. Now do yours."]);
    }
  };
  const DG = [
    ["every vertex has an arrow going out of it (∀x ∃y E(x, y))", g => g.v.every(x => g.v.some(y => g.e(x, y)))],
    ["some vertex has arrows going to every other vertex (∃x ∀y (y ≠ x → E(x, y)))", g => g.v.some(x => g.v.every(y => y === x || g.e(x, y)))],
    ["whenever there is an arrow from x to y, there is also one from y to x (∀x ∀y (E(x, y) → E(y, x)))", g => g.v.every(x => g.v.every(y => !g.e(x, y) || g.e(y, x)))],
    ["some vertex has no arrow coming in (∃x ¬∃y E(y, x))", g => g.v.some(x => g.v.every(y => !g.e(y, x)))],
    ["no vertex has an arrow to itself (∀x ¬E(x, x))", g => g.v.every(x => !g.e(x, x))],
    ["every vertex has an arrow coming in (∀x ∃y E(y, x))", g => g.v.every(x => g.v.some(y => g.e(y, x)))],
    ["for any two arrows x→y and y→z there is an arrow x→z (transitive)", g => g.v.every(x => g.v.every(y => g.v.every(z => !(g.e(x, y) && g.e(y, z)) || g.e(x, z))))],
    ["there are two different vertices with arrows both ways between them (∃x ∃y (x ≠ y ∧ E(x, y) ∧ E(y, x)))", g => g.v.some(x => g.v.some(y => x !== y && g.e(x, y) && g.e(y, x)))]
  ];
  const graphLogQ = () => {
    const n = 4, set = new Set(), m = ri(3, 7);
    while (set.size < m) { const a = ri(1, n), b = ri(1, n); if (a !== b || Math.random() < 0.15) set.add(a + ">" + b); }
    const g = { v: [1, 2, 3, 4], e: (a, b) => set.has(a + ">" + b) };
    const d = pick(DG);
    return tfq(`The vertices are 1, 2, 3, 4 and the arrows are listed. True or false? <b>${d[0]}</b>`, big([...set].map(x => x.replace(">", "→")).join(" &nbsp; "), 1.3), d[1](g), [
      "Translate the symbols into plain words. ∀ means “for every”, ∃ means “there is at least one”. Then test the plain-words claim on the four vertices.",
      "For “for every” you must check all cases, and one failure ends it. For “there is” you only need to find one example, or be sure none exists.",
      "Example: arrows 1→2, 2→1, 2→3. “Every vertex has an arrow going out” fails for vertex 3, so it is not true for this graph. Now do yours."]);
  };
  const chainQ = () => {
    const t = ri(0, 3), n = ri(3, 8);
    if (t === 0) return num(`Look at the subsets of a ${n}-element set. What is the largest collection of subsets in which <b>no subset is inside another</b> (an antichain)?`, big("🕸️"), comb(n, Math.floor(n / 2)), [
      "Subsets of the same size can never be inside each other. So one whole layer is an antichain.",
      "Sperner’s theorem says you cannot beat the biggest layer. The biggest layer is the middle one: subsets of size about half of n.",
      "Example: a 4-element set: the middle layer is the 2-element subsets, C(4, 2) = 6. No bigger antichain exists. Now do yours."]);
    if (t === 1) return num(`In the subsets of a ${n}-element set, a chain is a list X₁ ⊂ X₂ ⊂ … where each is strictly inside the next. How many sets are in the <b>longest</b> chain?`, big("⛓️"), n + 1, [
      "To make a long chain, add one element at a time. Start from the smallest possible set.",
      "Start at the empty set, add one element at each step, and end at the whole set. Count the sets including the first and last.",
      "Example: for 3 elements: ∅, {a}, {a, b}, {a, b, c}: that is 4 sets. Now do yours."]);
    if (t === 2) { const a = ri(0, 2), b = ri(a + 2, Math.min(n + 1, a + 5)); return num(`S has ${a} element${a === 1 ? "" : "s"} and T has ${b} elements, and S ⊆ T. How many sets X satisfy S ⊆ X ⊆ T?`, big("🎚️"), 2 ** (b - a), [
      "X must contain everything in S and may only use things from T. Which elements are still free to choose?",
      "The free elements are the ones in T but not in S. Each one is either in X or not in X.",
      "Example: S has 1 element, T has 3: 2 free elements, 2² = 4 choices of X. Now do yours."]); }
    const k = ri(0, n - 1);
    return num(`Inside the subsets of a ${n}-element set, how many subsets have exactly one element more than a given subset with ${k} element${k === 1 ? "" : "s"} and contain it?`, big("➕"), n - k, [
      "Such a subset is the given subset plus one extra element. Which elements could be the extra one?",
      "The extra element must come from the elements not yet in the subset. Count them.",
      "Example: in a 5-element set, a 2-element subset can be extended by one of the other 3 elements: 3 ways. Now do yours."]);
  };
  const ORDN = [7, 9, 10, 11, 13, 14, 15, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 31];
  const ordQ = () => {
    const n = pick(ORDN); let a; do { a = ri(2, n - 1); } while (gcd(a, n) !== 1);
    return num(`Take powers of ${a} in clock arithmetic modulo ${n}: ${a}, ${a}², ${a}³, … Find the smallest k ≥ 1 with ${a}^k ≡ 1 (mod ${n}).`, big("🔄"), ordMod(a, n), [
      "Multiply by the base again and again, reducing by the clock size each time. Stop when you first land on 1.",
      "Keep one running value. New value = (old value × base) mod clock size. Count how many multiplications it takes to reach 1 for the first time.",
      "Example: powers of 3 modulo 7: 3, 2, 6, 4, 5, 1. It reaches 1 at the sixth power, so the answer would be 6. Now do yours."]);
  };
  const maxRollQ = () => {
    const t = ri(0, 3), s = pick([4, 6, 6, 8, 10]), n = ri(2, 3);
    if (t === 0) { const m = ri(2, s); return num(`Roll ${n} fair ${s}-sided dice (the dice are different, so (1, 2) and (2, 1) count separately). In how many outcomes is the <b>highest</b> number exactly ${m}?`, big("🎲"), m ** n - (m - 1) ** n, [
      "First count the outcomes where every die is at most the number. Then take away those where every die is smaller, so the highest is not reached.",
      "Outcomes with everything at most m: m multiplied by itself once per die. Outcomes with everything at most one less: the same with m − 1. Subtract.",
      "Example: 2 dice with 6 sides, highest exactly 3: 3² − 2² = 9 − 4 = 5 outcomes. Now do yours."]); }
    if (t === 1) { const m = ri(1, s - 1); return num(`Roll ${n} fair ${s}-sided dice (different dice). In how many outcomes is the <b>lowest</b> number exactly ${m}?`, big("🎲"), (s - m + 1) ** n - (s - m) ** n, [
      "Count outcomes where every die is at least the number, then take away those where every die is bigger.",
      "Numbers at least m on one die: s − m + 1 of them. Numbers bigger than m: s − m. Raise each to the number of dice and subtract.",
      "Example: 2 dice with 6 sides, lowest exactly 4: 3² − 2² = 5. Now do yours."]); }
    if (t === 2) { const k = ri(2, 4); return num(`Roll ${k} different dice, each with ${s + 2} sides. In how many outcomes do all the dice show <b>different</b> numbers?`, big("🎲"), fact(s + 2) / fact(s + 2 - k), [
      "The first die can show anything. What is left for the second die once the first is used?",
      "Multiply the number of choices for each die in turn: each die has one fewer choice than the one before.",
      "Example: 3 dice with 5 sides: 5 × 4 × 3 = 60. Now do yours."]); }
    const m = ri(2, s);
    return num(`Roll ${n} fair ${s}-sided dice (different dice). In how many outcomes is every die at most ${m}?`, big("🎲"), m ** n, [
      "Each die is allowed to show the numbers 1 up to the limit. How many choices does one die have?",
      "The dice are independent, so multiply the number of allowed values once for each die.",
      "Example: 3 dice, each at most 2: 2 × 2 × 2 = 8. Now do yours."]);
  };
  const montyQ = () => {
    const n = ri(3, 10);
    if (Math.random() < 0.6) {
      const right = frac(n - 1, n);
      return mcq(`There are ${n} doors and one prize. You pick a door. The host, who knows where the prize is, opens ${n - 2} other doors with no prize and offers you a switch to the last closed door. What is the chance you win if you <b>switch</b>?`, big("🚪"), right,
        [frac(1, n), "1/2", frac(n - 2, n), frac(1, n - 1)], [
        "Your first pick was right only rarely. What happens to the leftover probability when the host removes empty doors?",
        "If your first pick was wrong, the host’s remaining closed door must hold the prize. So switching wins exactly when your first pick was wrong.",
        "Example: 4 doors, host opens 2 empty ones. Your first pick is wrong with chance 3/4, and then switching wins. So switching wins with chance 3/4. Now do yours."]);
    }
    const m = Math.max(n, 4), right = frac(m - 1, m * (m - 2));
    return mcq(`There are ${m} doors and one prize. You pick a door. The host, who knows where the prize is, opens just <b>one</b> other door with no prize. You switch to one of the other ${m - 2} closed doors, picked at random. What is the chance you win?`, big("🚪"), right,
      [frac(1, m - 2), frac(1, m), frac(m - 1, m), frac(1, 2)], [
      "Split into two cases: your first pick was right, or it was wrong. Only one of these cases lets a switch win.",
      "Chance first pick was wrong: (n−1)/n. Given that, the prize is among the other closed doors, and you choose one of them at random, each with equal chance.",
      "Example: 5 doors, switch to a random one of the other 3: (4/5) × (1/3) = 4/15. Now do yours."]);
  };
  const fr100 = (a, b) => a / b;
  const simpQ = () => {
    let D = null;
    for (let i = 0; i < 4000 && !D; i++) {
      const t = () => ri(2, 12) * 10, s = tot => ri(Math.ceil(tot * 0.3), Math.floor(tot * 0.95));
      const aT = [t(), t()], bT = [t(), t()], aS = [s(aT[0]), s(aT[1])], bS = [s(bT[0]), s(bT[1])];
      if (aS[0] * bT[0] > bS[0] * aT[0] && aS[1] * bT[1] > bS[1] * aT[1] && (aS[0] + aS[1]) * (bT[0] + bT[1]) < (bS[0] + bS[1]) * (aT[0] + aT[1])) D = { aT, bT, aS, bS };
    }
    if (!D) D = { aT: [90, 260], bT: [270, 80], aS: [81, 190], bS: [234, 55] };
    const t = ri(0, 3), gname = ["group 1", "group 2"];
    const show = lines([`Drug A: ${gname[0]} ${D.aS[0]} of ${D.aT[0]} helped, ${gname[1]} ${D.aS[1]} of ${D.aT[1]} helped`, `Drug B: ${gname[0]} ${D.bS[0]} of ${D.bT[0]} helped, ${gname[1]} ${D.bS[1]} of ${D.bT[1]} helped`]);
    const H = ["Turn each “helped out of total” into a rate by dividing, or compare by cross-multiplying.", "For the overall rate, first add the helped counts and the totals for the whole drug, then divide. Do not average the two group rates.", "Example: A helps 1 of 2 in a small group and 8 of 10 in a big group: overall 9 of 12. B helps 0 of 1 and 2 of 11: overall 2 of 12. Compare totals, not just groups. Now do yours."];
    if (t === 0) return mcq("A study compares two drugs in two groups of patients. Which drug has the higher success rate in <b>group 1</b>?", show, fr100(D.aS[0], D.aT[0]) > fr100(D.bS[0], D.bT[0]) ? "Drug A" : "Drug B", ["Drug A", "Drug B"], H);
    if (t === 1) return mcq("A study compares two drugs in two groups of patients. Which drug has the higher success rate in <b>group 2</b>?", show, fr100(D.aS[1], D.aT[1]) > fr100(D.bS[1], D.bT[1]) ? "Drug A" : "Drug B", ["Drug A", "Drug B"], H);
    if (t === 2) return mcq("A study compares two drugs in two groups. If you ignore the groups and look at <b>all patients together</b>, which drug has the higher success rate?", show, (D.aS[0] + D.aS[1]) / (D.aT[0] + D.aT[1]) > (D.bS[0] + D.bS[1]) / (D.bT[0] + D.bT[1]) ? "Drug A" : "Drug B", ["Drug A", "Drug B"], H);
    return num("A study compares two drugs in two groups. In total, how many patients did <b>drug B</b> help (add both groups)?", show, D.bS[0] + D.bS[1], H);
  };
  const dfaQ = () => {
    const ST = ["A", "B", "C"], T = {};
    ST.forEach(s => { T[s] = [pick(ST), pick(ST)]; });
    const acc = pick(["A", "B", "C"]);
    const n = ri(5, 8); const w = Array.from({ length: n }, () => ri(0, 1)).join("");
    let cur = "A"; for (const ch of w) cur = T[cur][+ch];
    const table = TB(ST.map(s => [s === "A" ? "A (start)" : s, T[s][0], T[s][1]]), ["state", "reads 0 → go to", "reads 1 → go to"]);
    const vis = `<div>${table}<div style="margin-top:6px;font-size:1.1em">Accepting state: <b>${acc}</b></div></div>`;
    const H = ["Put a finger on the start state. Read the input one symbol at a time, from left to right.", "For each symbol look up the row of your current state and the column of the symbol. Move to the state in the table. Do not skip any symbol.", "Example: if A reads 1 → B and B reads 0 → A, then from A the input 10 goes A → B → A. Now do yours."];
    if (Math.random() < 0.5) return mcq(`A little machine starts in state A and reads the input <b>${w}</b> from left to right. In which state does it end?`, vis, cur, ST, H);
    return tfq(`A little machine starts in state A and reads the input <b>${w}</b>. It accepts if it ends in the accepting state. Does it accept?`, vis, cur === acc, H);
  };

  const mk28 = [relQ, closQ, bellQ, latQ, linExtQ, setsetQ, vennQ, idenQ, compQ, satQ, resQ, graphLogQ, chainQ, ordQ, maxRollQ, montyQ, simpQ, dfaQ];
  const L28 = [
    L("Counting relations", relQ, [S("A relation", "🔗", "A relation on a set is a collection of ordered pairs. With n elements there are n × n possible pairs."), S("Free choices", "🎛️", "Each free pair is in or out: that is 2 choices. With f free pairs there are 2^f relations."), S("Forced pairs", "🔒", "Reflexive forces the n pairs (x, x). Symmetric links (x, y) and (y, x) so they count as one choice.")]),
    L("Transitive closure", closQ, [S("Transitive", "➡️", "A relation is transitive if a→b and b→c always give a→c."), S("Closure", "🧲", "The transitive closure adds only the pairs that are forced. It is “everything reachable by following arrows”."), S("Loops", "🔁", "If you can go from a back to a, the pair (a, a) is in the closure too.")]),
    L("Splitting a set: Bell numbers", bellQ, [S("Splits", "🧩", "An equivalence relation is the same thing as a split of the set into non-empty groups."), S("Bell numbers", "🔔", "The number of splits of 1, 2, 3, 4, 5, 6 elements is 1, 2, 5, 15, 52, 203."), S("Two groups", "✌️", "Exactly two groups: (2ⁿ − 2) ÷ 2 = 2^(n−1) − 1. Exactly n − 1 groups: choose the one pair, C(n, 2).")]),
    L("Meet and join", latQ, [S("Order by dividing", "🔻", "In the divisibility order, x is below y when x divides y."), S("Meet and join", "🤝", "The greatest lower bound is the gcd. The least upper bound is the lcm."), S("Counting divisors", "🔢", "Number of divisors of p^a × q^b is (a + 1)(b + 1).")]),
    L("Linear extensions", linExtQ, [S("Rules about order", "🗂️", "Rules like “A before B” make a partial order. A full order obeying all the rules is a linear extension."), S("Count carefully", "✍️", "Pick a job that can go first, remove it, repeat. Add up all branches."), S("Shortcut", "💡", "If two rules are separate, count the free jobs by choosing their places among the positions.")]),
    L("Sets of sets", setsetQ, [S("Power set", "🪆", "P(A), the set of all subsets of A, has 2ⁿ elements when A has n."), S("Power set again", "🪆", "P(P(A)) has 2^(2ⁿ) elements. It grows very fast."), S("Choosing", "🎯", "Collections of k subsets: choose k from the 2ⁿ subsets, C(2ⁿ, k).")]),
    L("Reading a Venn diagram", vennQ, [S("Eight regions", "⭕", "Three sets cut the universe into eight regions, including the outside."), S("Tick and add", "✅", "To count a set described by symbols, tick the regions it uses and add their counts."), S("Symbols", "🔣", "∪ at least one, ∩ both, ∖ but not, △ exactly one of the two.")]),
    L("Set identity: always true?", idenQ, [S("Same elements", "⚖️", "Two sets are equal if they have the same elements."), S("Eight cases", "🔍", "An element is in or out of each of A, B, C. That gives 8 cases. Check both sides in every case."), S("One counterexample", "❌", "One case where the sides differ shows the identity is not always true.")]),
    L("Which connectives are enough?", compQ, [S("Complete sets", "🧱", "A set of connectives is complete if every logic rule can be built from it."), S("Complete examples", "✅", "{¬, ∧}, {¬, ∨}, {¬, →}, NAND alone and NOR alone are complete."), S("Stuck sets", "🚧", "{∧, ∨} always gives true when all inputs are true, so it cannot build ¬p. {⊕, ↔} only builds “linear” rules.")]),
    L("Satisfiable or not?", satQ, [S("Clauses", "📎", "A clause is a bracket of literals joined by ∨. It needs at least one true literal."), S("Satisfiable", "🎯", "A set of clauses is satisfiable if one setting of the letters makes all clauses true."), S("Search", "🧭", "Try short clauses first. They force values. Then check the rest.")]),
    L("Resolution", resQ, [S("Cancel a letter", "✂️", "From (x ∨ A) and (¬x ∨ B) you may conclude (A ∨ B)."), S("Why it works", "💡", "If x is true then B must hold. If x is false then A must hold. Either way A ∨ B."), S("Empty clause", "🛑", "(x) with (¬x) gives the empty clause. That is a contradiction, so the clauses can never be all true.")]),
    L("Logic on a graph", graphLogQ, [S("Structures", "🕸️", "A graph is a structure: some vertices, and a relation E(x, y) for arrows."), S("All and some", "🔤", "∀ asks you to check every case. ∃ asks you to find one."), S("Translate", "🗣️", "Always say the formula in plain words first. Then test it on the actual graph.")]),
    L("Chains and antichains", chainQ, [S("Chain", "⛓️", "A chain of subsets grows by adding elements, each set inside the next."), S("Antichain", "🕸️", "An antichain has no set inside another. One whole layer (same size) works."), S("Sperner", "🏆", "The biggest antichain of subsets of an n-set is the middle layer: C(n, ⌊n/2⌋).")]),
    L("How long until it cycles?", ordQ, [S("Powers on a clock", "🔄", "Powers of a number modulo n always repeat if the number shares no factor with n."), S("Order", "📏", "The order of a is the smallest k ≥ 1 with a^k ≡ 1 (mod n)."), S("Check", "🔍", "The order always divides φ(n), the count of numbers below n that share no factor with n.")]),
    L("Highest roll", maxRollQ, [S("Different dice", "🎲", "Treat each die as separate. Outcomes are lists like (3, 5)."), S("At most m", "⬆️", "Every die at most m: m choices on each die, so m^n outcomes."), S("Exactly the highest", "🏔️", "Highest exactly m = (all at most m) − (all at most m − 1).")]),
    L("Monty Hall and cousins", montyQ, [S("Host knows", "🚪", "The host never opens the prize door. That is why his choice tells you something."), S("Wrong first pick", "🎯", "Switching wins exactly when your first pick was wrong. That has chance (n − 1)/n."), S("Open just one", "1️⃣", "If the host opens only one door, split into cases and share the chance among the doors you can switch to.")]),
    L("Simpson’s paradox", simpQ, [S("Rates", "📊", "A rate is successes divided by the total."), S("Whole vs parts", "🧩", "Drug A can win inside every group and still lose overall."), S("Why", "💡", "The groups have different sizes. Add the counts first, then divide. Never average the group rates.")]),
    L("Running a finite machine", dfaQ, [S("States", "🤖", "A finite machine has a few states. Each symbol it reads moves it to a new state."), S("Follow the table", "📋", "Start in the start state. For each symbol look up the table row for your state."), S("Accepting", "✅", "After the last symbol, the machine accepts if it is in an accepting state.")]),
    L("Mixed practice", mixOf(mk28), MIXS("Relations, Bell numbers, power sets, Venn counts, set identities, satisfiability, resolution, quantifiers on graphs, antichains, orders, dice counting, Monty Hall, Simpson, finite machines.")),
    L("Level 28 Challenge", mixOf(mk28), MIXS("Level 28 mixes relations, sets, logic, counting, chance and machines."))
  ];

  // =====================================================================
  // LEVEL 29
  // =====================================================================
  const dfaCountQ = () => {
    const ST = ["A", "B", "C"], T = {};
    ST.forEach(s => { T[s] = [pick(ST), pick(ST)]; });
    const acc = shuf(ST).slice(0, ri(1, 2));
    const n = ri(2, 5);
    let cur = { A: 1, B: 0, C: 0 };
    for (let i = 0; i < n; i++) { const nx = { A: 0, B: 0, C: 0 }; ST.forEach(s => { nx[T[s][0]] += cur[s]; nx[T[s][1]] += cur[s]; }); cur = nx; }
    const c = acc.reduce((a, s) => a + cur[s], 0);
    const table = TB(ST.map(s => [s === "A" ? "A (start)" : s, T[s][0], T[s][1]]), ["state", "reads 0 → go to", "reads 1 → go to"]);
    return num(`This machine starts in state A. It accepts a string if it ends in ${acc.length > 1 ? "one of the states " + acc.join(" or ") : "state " + acc[0]}. How many of the ${2 ** n} binary strings of length ${n} does it accept?`, table, c, [
      "Do not test every string. Instead keep track of how many strings end in each state after each symbol.",
      "Start with one string (the empty one) in the start state. At each step, every string splits into two: send its count along the 0 arrow and again along the 1 arrow. Add the counts that land in the same state.",
      "Example: A reads 0 → A and 1 → B; B reads 0 → A and 1 → A. After 1 symbol: A has 1, B has 1. After 2 symbols: A gets 1 + 1 + 1 = 3 (from A via 0, and from B via 0 and 1), B gets 1. Now do yours."]);
  };
  const REGL = [
    ["the number of 1s is even", true], ["the string ends in 01", true], ["the string contains 101 somewhere", true], ["the length is a multiple of 3", true],
    ["the number of 1s is a multiple of 4", true], ["there are never two 1s in a row", true], ["the first and last symbols are the same", true],
    ["read as a binary number, the value is divisible by 3", true], ["the third symbol from the end is 1", true], ["all the a’s come before all the b’s", true],
    ["there are equally many 0s and 1s", false], ["the string is aⁿbⁿ (n a’s followed by exactly n b’s)", false], ["the string reads the same forwards and backwards", false],
    ["the brackets are balanced, like (()())", false], ["the length is a perfect square", false], ["the number of 1s is a prime number", false],
    ["the string is some word written twice, like 1011 1011", false], ["there are more 1s than 0s", false], ["the length is a power of two", false]
  ];
  const regularQ = () => {
    const it = pick(REGL);
    return tfq(`True or false? A machine with only a fixed, small number of states can check, symbol by symbol, whether <b>${it[0]}</b>.`, big("🤖"), it[1], [
      "Ask what the machine would have to remember while reading. Can it keep that in a few states, however long the input is?",
      "Things like “odd or even so far”, “the last two symbols” or “the remainder so far” need only a few states. Things like “how many so far, compared with later” need unlimited memory.",
      "Example: “the number of a’s is even” needs 2 states (even, odd). “The number of a’s equals the number of b’s” needs a counter that can grow without limit, so no fixed machine can do it. Now do yours."]);
  };
  const RGX = ["(ab)*", "a*b*", "(a|b)*a", "a(a|b)*b", "(a|b)*bb(a|b)*", "a*ba*", "(aa)*", "a?b+", "(a|b)(a|b)(a|b)", "b*(ab*a)*b*", "(a|b)*ab", "a+b?a*"];
  const regexQ = () => {
    const p = pick(RGX), re = new RegExp("^(?:" + p + ")$");
    const ws = new Set();
    while (ws.size < 6) { const n = ri(1, 6); ws.add(Array.from({ length: n }, () => (Math.random() < 0.5 ? "a" : "b")).join("")); }
    const W = [...ws], c = W.filter(w => re.test(w)).length;
    return num(`A pattern matches a string only if the <b>whole</b> string fits. Here * means “any number of times, including none”, + means “at least once”, ? means “once or not at all”, and | means “or”. How many of these strings match <b>${p}</b>?`, big(W.join(" &nbsp; "), 1.3), c, [
      "Test the strings one at a time. For each one, try to cut it into pieces that follow the pattern from left to right.",
      "Remember the whole string must be used. Brackets with * can repeat as a block. Check lengths and first and last letters first: they rule many strings out.",
      "Example: pattern (ab)* and strings ab, aba, abab, ba. ab fits, aba does not (an extra a), abab fits, ba does not. So 2 match. Now do yours."]);
  };
  const traceQ = () => {
    const t = ri(0, 5);
    if (t === 0) { const a = ri(2, 6), b = ri(2, 9); return num(`What is y when this program stops?`, code(["x = " + a, "y = 0", "while x > 0:", "&nbsp;&nbsp;y = y + " + b, "&nbsp;&nbsp;x = x − 1"]), a * b, [
      "Play computer. Write down x and y after each pass through the loop.",
      "The loop body runs once for each value of x, counting down to 0. Each pass adds the same number to y.",
      "Example: x = 3, adding 4 each pass: y goes 4, 8, 12 and then stops. Now do yours."]); }
    if (t === 1) { const n = ri(3, 12); let x = n, c = 0; while (x !== 1) { x = x % 2 ? 3 * x + 1 : x / 2; c++; }
      return num(`How many times does the loop body run before this program stops?`, code(["n = " + n, "while n ≠ 1:", "&nbsp;&nbsp;if n is even: n = n ÷ 2", "&nbsp;&nbsp;else: n = 3 × n + 1"]), c, [
      "Write down the value of n after each pass. Count the passes until n is 1.",
      "Even: halve it. Odd: triple it and add one. Keep a tally of how many steps you have done.",
      "Example: start 6: 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1. That is 8 steps for 6. Now do yours."]); }
    if (t === 2) { const s = ri(3, 9), n = ri(20, 99); const q = Math.floor(n / s), r = n % s, askQ = Math.random() < 0.5;
      return num(`What is ${askQ ? "k" : "n"} when this program stops?`, code(["n = " + n, "k = 0", "while n ≥ " + s + ":", "&nbsp;&nbsp;n = n − " + s, "&nbsp;&nbsp;k = k + 1"]), askQ ? q : r, [
      "Each pass takes the same amount away from n and adds one to k. Stop when n gets too small.",
      "This is repeated subtraction, so it is division with remainder. k counts how many times you subtracted. n is what is left.",
      "Example: n = 17, take away 5 each time: 12, 7, 2. That is k = 3 and n = 2. Now do yours."]); }
    if (t === 3) { let a = ri(6, 40), b = ri(6, 40); const g = gcd(a, b); const a0 = a, b0 = b; return num(`What number is a when this program stops?`, code(["a = " + a0, "b = " + b0, "while a ≠ b:", "&nbsp;&nbsp;if a > b: a = a − b", "&nbsp;&nbsp;else: b = b − a"]), g, [
      "Keep subtracting the smaller from the larger. Track both numbers after each pass.",
      "Subtracting the smaller from the larger never changes the greatest common divisor of the two numbers. When they become equal, that common value is the answer.",
      "Example: a = 8, b = 12: (8, 4), (4, 4). It stops with a = 4. Now do yours."]); }
    if (t === 4) { const n = ri(100, 9999); let s = 0, m = n; while (m > 0) { s += m % 10; m = Math.floor(m / 10); }
      return num(`What is s when this program stops?`, code(["n = " + n, "s = 0", "while n > 0:", "&nbsp;&nbsp;s = s + (n mod 10)", "&nbsp;&nbsp;n = n ÷ 10 (drop the remainder)"]), s, [
      "n mod 10 is the last digit. Dividing by 10 and dropping the remainder removes that last digit.",
      "So the loop adds up the digits one by one, from the right. Do it for each digit.",
      "Example: n = 305: add 5, then 0, then 3. s = 8. Now do yours."]); }
    const N = ri(20, 600); let x = 1, k = 0; while (x < N) { x *= 2; k++; }
    return num(`What is k when this program stops?`, code(["x = 1", "k = 0", "while x < " + N + ":", "&nbsp;&nbsp;x = 2 × x", "&nbsp;&nbsp;k = k + 1"]), k, [
      "Track x: it doubles each pass. Count the passes until x reaches the limit or goes past it.",
      "x after k passes is 2 multiplied by itself k times. Find the first power of 2 that is at least the limit.",
      "Example: limit 20: x = 2, 4, 8, 16, 32 → 5 passes. Now do yours."]);
  };
  const code = ls => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${ls.join("<br>")}</div>`;
  const stopQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const s = ri(5, 40), d = ri(2, 7); const stops = s % d === 0;
      return mcq("Does this program stop, or run forever?", code(["n = " + s, "while n ≠ 0:", "&nbsp;&nbsp;n = n − " + d]), stops ? "it stops" : "it runs forever", ["it stops", "it runs forever"], [
      "Watch what happens to n. It goes down by the same amount each time. Will it ever land exactly on the number in the test?",
      "The loop only ends when n is exactly the target. If n jumps over it, the loop continues with negative numbers and never ends.",
      "Example: n = 9, subtract 3: 6, 3, 0 stops. n = 10, subtract 3: 7, 4, 1, −2, … jumps over 0 and never stops. Now do yours."]); }
    if (t === 1) { const st = ri(0, 10), d = ri(2, 6), T = st + ri(5, 30); const stops = (T - st) % d === 0;
      return mcq("Does this program stop, or run forever?", code(["n = " + st, "while n ≠ " + T + ":", "&nbsp;&nbsp;n = n + " + d]), stops ? "it stops" : "it runs forever", ["it stops", "it runs forever"], [
      "The loop ends only when n equals the target exactly. n climbs by the same step each time.",
      "Work out the gap between the start and the target. If the step does not divide the gap, n jumps over the target and never comes back.",
      "Example: start 2, target 11, step 3: 5, 8, 11 stops. Start 2, target 12, step 3: 5, 8, 11, 14 … never stops. Now do yours."]); }
    if (t === 2) { const d = pick([-3, -2, -1, 0, 1, 2]), S0 = ri(5, 30);
      return mcq("Does this program stop, or run forever?", code(["x = " + S0, "while x > 0:", "&nbsp;&nbsp;x = x " + (d < 0 ? "− " + (-d) : "+ " + d)]), d < 0 ? "it stops" : "it runs forever", ["it stops", "it runs forever"], [
      "The test is “x is bigger than 0”. What does each pass do to x: make it smaller, bigger, or leave it?",
      "If x gets smaller by a fixed amount, it eventually drops to 0 or below. If x stays the same or grows, the test stays true forever.",
      "Example: x = 7, x = x − 2: 5, 3, 1, −1 stops. x = 7, x = x + 1: 8, 9, 10, … never stops. Now do yours."]); }
    const n = ri(3, 12);
    return mcq("Does this program stop, or run forever?", code([pick(["for i from 1 to " + n + ":", "for each of the " + n + " numbers in the list:"]), "&nbsp;&nbsp;print the number"]), "it stops", ["it stops", "it runs forever"], [
      "Look for a loop whose count is fixed in advance, or one that depends on a changing test.",
      "A “for” loop over a fixed number of items always ends after that many passes, whatever happens inside.",
      "Example: “for i from 1 to 5: print i” prints five lines and ends. “while True: print i” never ends. Now do yours."]);
  };
  const DEC = [
    ["whether a given number is prime", true], ["whether a given statement of logic with letters p, q, r is a tautology", true], ["whether a given text matches a given simple pattern (regular expression)", true],
    ["whether a given program stops within 1000 steps on a given input", true], ["whether a given graph can be coloured with 3 colours (even if it takes very long)", true], ["whether a given number is a perfect square", true],
    ["whether any given program will eventually stop on a given input", false], ["whether two given programs give the same output for every input", false], ["whether a given program ever prints the word “hello”", false],
    ["whether a given equation with whole-number unknowns, like x³ + y³ = z³ + 5, has a whole-number solution (all such equations)", false], ["whether a given program runs forever on at least one input", false],
    ["whether a given sentence of full predicate logic is always true", false]
  ];
  const decQ = () => {
    const it = pick(DEC);
    return tfq(`True or false? Someone can write a program that always stops and always answers correctly for the question: <b>${it[0]}</b>?`, big("💻"), it[1], [
      "Ask whether you can just run or check it for a fixed, limited amount of work, or whether you would have to watch something that may never end.",
      "Questions about what a program will do “in the end”, or “for every input”, are about the future of a possibly endless run. Those are usually the impossible ones (the halting problem and its relatives).",
      "Example: “Does this program stop within 100 steps?” can be decided: run it for 100 steps. “Does this program ever stop?” cannot be decided by any program in general. Now do yours."]);
  };
  const HARD = [
    ["sorting a list of numbers", "fast method known (in P)"], ["finding the shortest road between two towns on a map", "fast method known (in P)"], ["building the cheapest network joining all towns (minimum spanning tree)", "fast method known (in P)"],
    ["deciding whether a graph has a walk using every edge exactly once", "fast method known (in P)"], ["deciding whether a number is prime", "fast method known (in P)"], ["matching students to jobs when each wants only some jobs (bipartite matching)", "fast method known (in P)"],
    ["finding whether a graph can be coloured with 3 colours", "NP-complete (no fast method known)"], ["finding whether some numbers in a list add up to exactly a given total (subset sum)", "NP-complete (no fast method known)"],
    ["finding a tour visiting every town exactly once and returning (Hamiltonian cycle)", "NP-complete (no fast method known)"], ["deciding whether a logic formula in clauses of three letters can be made true (3-SAT)", "NP-complete (no fast method known)"],
    ["finding a group of k people who all know each other (clique)", "NP-complete (no fast method known)"], ["deciding, for any program, whether it ever stops", "impossible for any program"], ["deciding whether two programs always do the same thing", "impossible for any program"]
  ];
  const hardQ = () => {
    const it = pick(HARD), all = ["fast method known (in P)", "NP-complete (no fast method known)", "impossible for any program"];
    return mcq(`How is this problem usually classified? <b>${it[0]}</b>`, big("🧗"), it[1], all.filter(x => x !== it[1]), [
      "Think about two things: can a program solve it at all, and if so does a quick method exist, or do we only know slow search?",
      "A quick method means the work grows like a small power of the input size. For NP-complete problems, a proposed answer is quick to check but nobody knows a quick way to find one. Some questions about all programs cannot be solved at all.",
      "Example: sorting is quick (known). Subset sum is quick to check but hard to find. “Will this program stop?” can never be answered by a program for all cases. Now do yours."]);
  };
  const loopQ = () => {
    const t = ri(0, 5), n = ri(4, 12);
    if (t === 0) { const m = ri(3, 9); return num(`How many times does the inner line run in total?`, code(["for i from 1 to " + n + ":", "&nbsp;&nbsp;for j from 1 to " + m + ":", "&nbsp;&nbsp;&nbsp;&nbsp;do the work"]), n * m, [
      "Count how often the inner loop starts, and how many passes each start has.",
      "The outer loop runs a fixed number of times, and each time the inner loop runs a fixed number of times. Multiply.",
      "Example: outer 3 times, inner 4 times: 12 times in total. Now do yours."]); }
    if (t === 1) return num(`How many times does the inner line run in total?`, code(["for i from 1 to " + n + ":", "&nbsp;&nbsp;for j from i to " + n + ":", "&nbsp;&nbsp;&nbsp;&nbsp;do the work"]), n * (n + 1) / 2, [
      "The inner loop gets shorter as i grows. How long is it when i is 1? When i is the last value?",
      "The inner counts form a list that goes down by one each time, ending at 1. Add them all up: 1 + 2 + … up to the biggest.",
      "Example: n = 4: inner runs 4, 3, 2, 1 times: total 10. Now do yours."]);
    if (t === 2) return num(`How many times does the inner line run in total?`, code(["for i from 1 to " + n + ":", "&nbsp;&nbsp;for j from 1 to i − 1:", "&nbsp;&nbsp;&nbsp;&nbsp;do the work"]), n * (n - 1) / 2, [
      "When i is 1, the inner loop does not run at all. When i is 2, it runs once. See the pattern?",
      "The inner counts are 0, 1, 2, …, up to one less than n. Add them: that is the number of pairs you can pick from n things.",
      "Example: n = 4: inner runs 0, 1, 2, 3 times: total 6. Now do yours."]);
    if (t === 3) { const N = ri(7, 1000); let k = 0, x = N; while (x >= 1) { x = Math.floor(x / 2); k++; } return num(`A sorted list has ${N} names. Binary search always looks at the middle and throws away half. At most how many names must it look at to be sure to find any name, or to be sure it is not there?`, big("🔍"), k, [
      "Each look removes about half of what is left. How many halvings until nothing is left?",
      "Find how many times you can halve the list (round down each time, counting the last step) until it is empty. Equivalent: the smallest k with 2^k greater than the list size.",
      "Example: 10 names: 10 → 5 → 2 → 1 → 0, that is 4 looks. Now do yours."]); }
    if (t === 4) { const N = ri(8, 1024); let k = 0, x = N; while (x > 1) { x = Math.floor(x / 2); k++; } return num(`How many times does the loop body run?`, code(["n = " + N, "while n > 1:", "&nbsp;&nbsp;n = n ÷ 2 (drop any remainder)"]), k, [
      "Write n after each pass. It gets halved and rounded down.",
      "Count how many halvings it takes to get from n down to 1. This is the whole-number part of log base 2.",
      "Example: 20 → 10 → 5 → 2 → 1: 4 passes. Now do yours."]); }
    const m = ri(4, 12); return num(`How many times does the work line run in total?`, code(["for i from 1 to " + m + ":", "&nbsp;&nbsp;for j from i + 1 to " + m + ":", "&nbsp;&nbsp;&nbsp;&nbsp;for k from j + 1 to " + m + ":", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;do the work"]), comb(m, 3), [
      "The loops force i < j < k. So each run picks three different numbers in increasing order.",
      "Each choice of three different numbers from the list appears exactly once, in increasing order. Count the choices of three.",
      "Example: m = 4: the triples are 123, 124, 134, 234: that is 4. Now do yours."]);
  };
  const RSAP = [[3, 5], [3, 7], [5, 7], [3, 11], [5, 11], [7, 11], [5, 13], [7, 13]];
  const rsaQ = () => {
    const [p, q] = pick(RSAP), n = p * q, ph = (p - 1) * (q - 1);
    const es = [3, 5, 7, 9, 11, 13].filter(e => gcd(e, ph) === 1 && e < ph); const e = pick(es);
    let d = 1; while ((e * d) % ph !== 1) d++;
    const t = ri(0, 3), m = ri(2, n - 1);
    const Hn = ["Follow the toy recipe step by step. The primes p and q are small here, so everything can be done by hand.", "", ""];
    if (t === 0) return num(`Toy encryption: the secret primes are p = ${p} and q = ${q}. The public number is n = p × q. What is n?`, big("🔐"), n, [
      "Multiply the two primes.", "n is just the product of the two secret primes. It is public, but factoring a huge n is very hard.", "Example: p = 3, q = 5 gives n = 15. Now do yours."]);
    if (t === 1) return num(`Toy encryption: p = ${p}, q = ${q}. The number φ = (p − 1)(q − 1) is the count of numbers below n = ${n} that share no factor with n. What is φ?`, big("🔐"), ph, [
      "Subtract one from each prime first. Then multiply.", "φ = (p − 1) × (q − 1). Do not multiply p and q.", "Example: p = 3, q = 7: (2)(6) = 12. Now do yours."]);
    if (t === 2) return num(`Toy encryption with n = ${n} and φ = ${ph}. The public exponent is e = ${e}. The secret exponent d is the smallest positive number with e × d ≡ 1 (mod ${ph}). What is d?`, big("🔐"), d, [
      "You need the multiplicative inverse of e on a clock with φ hours. Try d = 1, 2, 3, … and look at the remainder of e × d.",
      "Compute e × d, divide by the clock size, and look at the remainder. Stop at the first d where the remainder is 1.",
      "Example: e = 3 on a clock of 8: 3 × 1 = 3, 3 × 2 = 6, 3 × 3 = 9 ≡ 1. So d = 3. Now do yours."]);
    return num(`Toy encryption with n = ${n} and e = ${e}. To encrypt a message number m, compute the remainder of m^e divided by n. Encrypt m = ${m}.`, big("🔐"), pw(m, e, n), [
      "Raise m to the power e, but reduce modulo n after each multiplication so the numbers stay small.",
      "Start with 1. Multiply by m, take the remainder after dividing by n. Do this e times.",
      "Example: n = 15, e = 3, m = 4: 4, 16 → 1, 4. So the code is 4. Now do yours."]);
  };
  const PRIMS = [5, 7, 11, 13, 17, 19, 23];
  const genQ = () => {
    const p = pick(PRIMS), t = ri(0, 2);
    if (t === 0) return num(`How many primitive roots (generators whose powers reach every non-zero clock value) are there modulo the prime ${p}?`, big("🔑"), phi(p - 1), [
      "A generator must have the largest possible order. For a prime p, the largest possible order is one less than p.",
      "The number of generators is φ(p − 1): count the numbers up to p − 1 that share no factor with p − 1.",
      "Example: modulo 7, φ(6) = 2 generators (the numbers 3 and 5). Now do yours."]);
    let g; do { g = ri(2, p - 1); } while (false);
    if (t === 1) return num(`Modulo ${p}, what is the order of ${g}? (The smallest k ≥ 1 with ${g}^k ≡ 1.)`, big("🔑"), ordMod(g, p), [
      "List the powers of the number, reducing each time. Stop at the first 1.",
      "The order always divides p − 1, so you only need to test divisors of p − 1.",
      "Example: modulo 7, powers of 2: 2, 4, 1. The order is 3. Now do yours."]);
    return tfq(`True or false? Modulo ${p}, the powers of ${g} reach <b>every</b> non-zero value (${g} is a primitive root).`, big("🔑"), ordMod(g, p) === p - 1, [
      "A primitive root has order p − 1. Find the order of the number.",
      "You do not need all powers: if some power ≡ 1 is reached before p − 1 steps, the number is not a generator. Check the divisors of p − 1.",
      "Example: modulo 7, 2 has order 3 (2, 4, 1), which is less than 6, so it is not a generator. Now do yours."]);
  };
  const groupQ = () => {
    const n = pick([6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24]), t = ri(0, 4);
    if (t === 0) { const a = ri(2, n - 1); return num(`In the clock group of numbers 0 to ${n - 1} with addition modulo ${n}, how many different values does ${a} reach when you keep adding ${a} to itself (including 0)? This is the order of ${a}.`, big("🕰️"), n / gcd(a, n), [
      "Keep adding the number, reducing by the clock size. When do you return to 0?",
      "The first return to 0 happens after n ÷ gcd(a, n) steps.",
      "Example: on a clock of 12, 8: 8, 4, 0 returns after 3 steps, and 12 ÷ gcd(8, 12) = 12 ÷ 4 = 3. Now do yours."]); }
    if (t === 1) return num(`How many numbers from 0 to ${n - 1} generate the whole additive clock group modulo ${n} (their multiples reach every value)?`, big("🕰️"), phi(n), [
      "A number generates everything exactly when it shares no factor with the clock size.",
      "Count the numbers from 1 up to the clock size that share no factor with it. This count is called φ (the totient).",
      "Example: on a clock of 10, the generators are 1, 3, 7, 9: that is 4. Now do yours."]);
    if (t === 2) { const ds = []; for (let d = 2; d < n; d++) if (n % d === 0) ds.push(d); const d = pick(ds); return num(`In the additive clock group modulo ${n}, how many numbers have order exactly ${d}?`, big("🕰️"), phi(d), [
      "A subgroup with that many elements exists exactly once in a cyclic group. Its generators are the elements of that order.",
      "The number of elements of order d in a cyclic group is φ(d): numbers up to d that share no factor with d.",
      "Example: in the clock of 12, elements of order 4 number φ(4) = 2 (they are 3 and 9). Now do yours."]); }
    if (t === 3) return num(`How many symmetries (rotations and flips) does a regular ${n}-sided polygon have, including doing nothing?`, big("🔷"), 2 * n, [
      "Count the rotations first. Then count the flips (reflections).",
      "There are as many rotations as sides. There are as many flips as there are rotations. Add them.",
      "Example: a square has 4 rotations and 4 flips, 8 symmetries. Now do yours."]);
    const m = pick([5, 6, 7, 8, 9, 10, 12, 14, 15, 18, 20]);
    return num(`How many numbers from 1 to ${m - 1} have a multiplicative inverse modulo ${m}? (These form a group under multiplication.)`, big("✖️"), phi(m), [
      "A number has an inverse on a clock when it shares no factor with the clock size.",
      "Count the numbers below the clock size that share no common factor with it.",
      "Example: modulo 8 the invertible numbers are 1, 3, 5, 7: that is 4. Now do yours."]);
  };
  const shuffleQ = () => {
    const n = 5, a = shuf([1, 2, 3, 4, 5]), b = shuf([1, 2, 3, 4, 5]), t = ri(0, 2);
    const show = lines([`σ sends 1,2,3,4,5 to ${a.join(", ")}`, `τ sends 1,2,3,4,5 to ${b.join(", ")}`]);
    if (t === 0) { const k = ri(1, 5); return num(`Do τ first, then σ. Where does ${k} end up? That is σ(τ(${k})).`, show, a[b[k - 1] - 1], [
      "Follow one number through two steps. First look it up in τ, then look the result up in σ.",
      "Read the list for τ at position k to get the middle number. Then read the list for σ at that position.",
      "Example: σ sends 1,2,3 to 2,3,1 and τ sends 1,2,3 to 3,1,2. Where does 1 go? τ: 1→3, then σ: 3→1. So 1 ends at 1. Now do yours."]); }
    if (t === 1) { const k = ri(1, 5); return num(`What number does the <b>inverse</b> of σ send ${k} to? (The inverse undoes σ.)`, show, a.indexOf(k) + 1, [
      "The inverse of σ goes backwards. Find which number σ sent to k.",
      "Look in the list for σ for the position where k appears. That position is the answer.",
      "Example: σ sends 1,2,3 to 3,1,2. The inverse sends 1 back to 2, because σ sent 2 to 1. Now do yours."]); }
    let inv = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (a[i] > a[j]) inv++;
    return mcq("Is σ an <b>even</b> or <b>odd</b> shuffle? (Count the pairs that are out of order: an even number of them means even.)", show, inv % 2 ? "odd" : "even", ["even", "odd"], [
      "An inversion is a pair of positions where the bigger number comes first. Check every pair of positions.",
      "Count the inversions carefully, left to right: for each number count the smaller numbers that come after it. Then check if the total is even or odd.",
      "Example: 2, 3, 1 has inversions (2,1) and (3,1): two of them, so it is even. Now do yours."]);
  };
  const monoQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const k = ri(2, 7); return num(`What is the smallest length of a list of different numbers that <b>forces</b> an increasing run or a decreasing run (not necessarily next to each other) of length ${k + 1}?`, big("📈"), k * k + 1, [
      "Think of the longest list that avoids both: arrange the numbers in blocks, each block going one way, the blocks going the other way.",
      "The longest list that avoids both has k blocks of k numbers each. Add one more number to force a run.",
      "Example: for runs of length 3, the longest safe list has 2 blocks of 2 numbers (like 2 1 4 3), length 4. So 5 numbers force it. Now do yours."]); }
    if (t === 1) { const a = ri(2, 6), b = ri(2, 6); return num(`What is the smallest length of a list of different numbers that forces an <b>increasing</b> run of length ${a} or a <b>decreasing</b> run of length ${b}?`, big("📉"), (a - 1) * (b - 1) + 1, [
      "Build the longest list that avoids both. Use blocks: each block decreases, with just short enough runs.",
      "The longest safe list has (a − 1) blocks of (b − 1) numbers. Add one number.",
      "Example: increasing run of 3 or decreasing run of 4: safe length is 2 × 3 = 6, so 7 forces it. Now do yours."]); }
    const seq = shuf(Array.from({ length: 9 }, (_, i) => i + 1)).slice(0, ri(7, 8));
    const best = seq.map(() => 1); for (let i = 0; i < seq.length; i++) for (let j = 0; j < i; j++) if (seq[j] < seq[i]) best[i] = Math.max(best[i], best[j] + 1);
    return num("What is the length of the longest increasing run you can pick from this list (left to right, not necessarily neighbours)?", big(seq.join(" "), 1.5), Math.max(...best), [
      "For each number, think about the longest increasing run that ends at it.",
      "Work from left to right. The best run ending at a number is one more than the best run ending at some smaller number to its left. Write these values under the list.",
      "Example: 3 1 4 2 5: runs ending at each: 1, 1, 2, 2, 3. The longest is 3 (3, 4, 5). Now do yours."]);
  };
  const stationQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      for (;;) { const a = ri(1, 9) * 10, b = ri(1, 9) * 10; if ((b * 100) % (a + b) === 0) {
        return num(`Weather is Sunny or Rainy each day. After a sunny day, the next day is rainy with chance ${a}%. After a rainy day, the next day is sunny with chance ${b}%. In the long run, what percent of days are sunny?`, big("🌦️"), (b * 100) / (a + b), [
        "In the long run the flow from sunny to rainy equals the flow from rainy to sunny.",
        "Let s be the fraction of sunny days. Then s × (switch chance from sunny) = (1 − s) × (switch chance from rainy). Solve for s.",
        "Example: sunny→rainy 20%, rainy→sunny 30%: s × 20 = (1 − s) × 30, so s = 60%. Now do yours."]); } }
    }
    if (t === 1) { const a = ri(1, 9) * 10, N = ri(2, 9) * 100; return num(`Out of ${N} sunny days, about how many are followed by a <b>sunny</b> day, if after a sunny day the next day is rainy with chance ${a}%?`, big("🌦️"), N * (100 - a) / 100, [
      "Find the chance that a sunny day is followed by a sunny day. It is what is left after the rainy chance.",
      "Multiply that chance by the number of sunny days.",
      "Example: 200 sunny days, rainy chance 30%: sunny chance 70%, so 140. Now do yours."]); }
    const a = ri(1, 9) * 10, b = ri(1, 9) * 10, N = 100;
    return num(`On Monday it is sunny for sure. Sunny is followed by rainy with chance ${a}%. Rainy is followed by sunny with chance ${b}%. Out of 1000 such weeks, about how many are sunny on Wednesday?`, big("🌦️"), Math.round(1000 * ((1 - a / 100) * (1 - a / 100) + (a / 100) * (b / 100))), [
      "Wednesday is two steps after Monday. Split into the two routes: sunny then sunny, or rainy then sunny.",
      "Chance of route 1: (sunny stays sunny) × (sunny stays sunny). Chance of route 2: (sunny to rainy) × (rainy to sunny). Add the two routes, then take that share of 1000.",
      "Example: stay-sunny 80%, rainy-to-sunny 50%, sunny-to-rainy 20%: 0.8 × 0.8 + 0.2 × 0.5 = 0.74, so 740 of 1000. Now do yours."]);
  };
  const condDiceQ = () => {
    const C = [["the sum is 8", (x, y) => x + y === 8], ["the sum is 7", (x, y) => x + y === 7], ["the sum is at least 10", (x, y) => x + y >= 10], ["at least one die shows 6", (x, y) => x === 6 || y === 6], ["the dice show different numbers", (x, y) => x !== y], ["the first die is even", (x, y) => x % 2 === 0], ["the sum is even", (x, y) => (x + y) % 2 === 0], ["the larger die shows at least 5", (x, y) => Math.max(x, y) >= 5]];
    const E = [["the first die shows 3", (x, y) => x === 3], ["the first die shows 6", (x, y) => x === 6], ["the dice show the same number", (x, y) => x === y], ["the sum is at least 9", (x, y) => x + y >= 9], ["at least one die shows 1", (x, y) => x === 1 || y === 1], ["the first die is bigger than the second", (x, y) => x > y], ["the sum is 6", (x, y) => x + y === 6]];
    for (;;) {
      const c = pick(C), e = pick(E); let cc = 0, ce = 0, ee = 0;
      for (let x = 1; x <= 6; x++) for (let y = 1; y <= 6; y++) { if (c[1](x, y)) cc++; if (e[1](x, y)) ee++; if (c[1](x, y) && e[1](x, y)) ce++; }
      if (cc === 0 || ce === 0 || ce === cc) continue;
      return mcq(`Two fair dice are rolled (36 equally likely outcomes). You are told that <b>${c[0]}</b>. What is the chance that <b>${e[0]}</b>?`, big("🎲🎲"), frac(ce, cc), [frac(ce, 36), frac(ee, 36), frac(ce, ee), frac(cc, 36), frac(cc - ce, cc)], [
        "The clue shrinks the list of possible outcomes. Only outcomes that fit the clue are still possible.",
        "Count the outcomes that fit the clue (the new total). Then count how many of those also fit the question. The chance is the second count over the first.",
        "Example: told the sum is 5, chance the first die is 1: outcomes with sum 5: 4 of them; only (1, 4) has first die 1, so 1/4. Now do yours."]);
    }
  };
  const boundQ = () => {
    const t = ri(0, 2);
    if (t === 0) { for (;;) { const mu = ri(2, 40), a = ri(mu + 1, mu * 5); if ((mu * 100) % a === 0 && mu < a) return num(`The average of a list of non-negative numbers is ${mu}. At most what percent of the numbers can be ${a} or more? (Markov’s bound: at most average ÷ ${a}.)`, big("📏"), (mu * 100) / a, [
      "If too many numbers were big, the average would be pushed up. The bound turns this into a number.",
      "The most you can allow is the average divided by the threshold. Turn the fraction into a percent.",
      "Example: average 6, threshold 30: at most 6 ÷ 30 = 20% of the numbers can be 30 or more. Now do yours."]); } }
    if (t === 1) { const k = pick([2, 5, 10]), s = ri(2, 9), m = ri(40, 90); return num(`Test scores have mean ${m} and standard deviation ${s}. At most what percent of the students can score <b>${k * s} or more away</b> from the mean (above or below)? Use Chebyshev: at most 1 ÷ k² of the values are k standard deviations or farther away.`, big("📏"), 100 / (k * k), [
      "First express the distance in standard deviations: divide the distance by the standard deviation.",
      "Call that number k. The bound is one divided by k × k. Then write it as a percent.",
      "Example: distance 20 with standard deviation 5 is k = 4 standard deviations. Bound: 1 ÷ 16 = 6.25%. Now do yours."]); }
    const k = pick([2, 5, 10]), s = ri(2, 9);
    return num(`A list has a standard deviation of ${s}. At least what percent of its values must lie within ${k * s} of the mean? (At least 100% − (100 ÷ k²)%, where k is the distance in standard deviations.)`, big("📏"), 100 - 100 / (k * k), [
      "The values outside the band have an upper limit. The values inside the band are the rest.",
      "Find k (the band width in standard deviations). The outside is at most 100 divided by k × k percent. Subtract that from 100.",
      "Example: k = 4: outside at most 6.25%, so inside at least 93.75%. Now do yours."]);
  };
  const DER = [1, 0, 1, 2, 9, 44, 265, 1854];
  const fixKQ = () => {
    const n = ri(4, 7), k = ri(0, n - 2);
    return num(`${n} friends each bring a gift and the gifts are shuffled so each friend gets one gift. In how many ways do <b>exactly ${k}</b> friends get their own gift back?`, big("🎁"), comb(n, k) * DER[n - k], [
      "Choose which friends get their own gift back. Then deal with the remaining friends.",
      "The other friends must all get someone else’s gift. That is a derangement (nobody in place). The derangement numbers for 2, 3, 4, 5 are 1, 2, 9, 44.",
      "Example: 4 friends, exactly 1 correct: choose that friend (4 ways), the other 3 form a derangement (2 ways): 8. Now do yours."]);
  };
  const SN = (n, k) => { const T = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0)); T[0][0] = 1; for (let i = 1; i <= n; i++) for (let j = 1; j <= k; j++) T[i][j] = T[i - 1][j - 1] + j * T[i - 1][j]; return T[n][k]; };
  const PK = (n, k) => { if (n === 0) return 1; if (k === 0) return 0; if (n < 0) return 0; return PK(n, k - 1) + PK(n - k, k); };
  const boxQ = () => {
    const n = ri(4, 8), k = ri(2, 4);
    if (Math.random() < 0.5) return num(`In how many ways can ${n} <b>different</b> balls be put into ${k} <b>identical</b> boxes so that no box is empty?`, big("📦"), SN(n, k), [
      "Identical boxes mean only the groups matter. Different balls mean it matters who is in which group.",
      "This is splitting the set of balls into exactly that many non-empty groups. Use the recursion: the last ball is either alone (S(n−1, k−1)) or joins one of k groups (k × S(n−1, k)).",
      "Example: 4 balls into 2 boxes: 7 ways (the last ball alone: 1; joins one of 2 groups from 3 balls into 2: 2 × 3 = 6; total 7). Now do yours."]);
    return num(`In how many ways can ${n} <b>identical</b> balls be put into ${k} <b>identical</b> boxes (boxes may stay empty)?`, big("📦"), PK(n, k), [
      "Only the sizes of the piles matter, not the order. So list the ways to write the number as a sum of at most that many positive parts.",
      "List the sums in order of size, biggest part first, so you do not miss any or repeat any.",
      "Example: 5 balls into 2 boxes: 5, 4+1, 3+2: that is 3 ways. Now do yours."]);
  };

  const mk29 = [dfaCountQ, regularQ, regexQ, traceQ, stopQ, decQ, hardQ, loopQ, rsaQ, genQ, groupQ, shuffleQ, monoQ, stationQ, condDiceQ, boundQ, fixKQ, boxQ];
  const L29 = [
    L("Counting accepted strings", dfaCountQ, [S("Count by states", "🔢", "To count the strings a machine accepts, keep how many strings are in each state."), S("Step", "👣", "Each symbol: send the count along the 0 arrow and along the 1 arrow, and add up what lands in each state."), S("Finish", "🏁", "After the last symbol, add the counts of the accepting states.")]),
    L("What a machine can check", regularQ, [S("Fixed memory", "🧠", "A finite machine has no counter that grows. It only knows its current state."), S("Can do", "✅", "Parity, the last few symbols, remainders mod a number, and “has this pattern appeared”."), S("Cannot do", "🚫", "Matching up counts like aⁿbⁿ, balanced brackets, palindromes: they need unlimited memory.")]),
    L("Pattern matching", regexQ, [S("Patterns", "🧵", "A regular expression describes a family of strings."), S("Symbols", "🔣", "* means any number of times (even 0). + means at least once. ? means once or not at all. | means or."), S("Whole string", "📏", "The pattern must match the entire string, not just a part of it.")]),
    L("Tracing a tiny program", traceQ, [S("Play computer", "🖥️", "Follow the program line by line and write down each variable."), S("Loops", "🔁", "A while-loop repeats as long as its test is true. Update the variables each time round."), S("Table", "📋", "A small table with one row per pass helps you avoid slips.")]),
    L("Does it ever stop?", stopQ, [S("Stopping", "🛑", "A loop stops when its test becomes false. Does that ever happen?"), S("Jumping over", "🦘", "A test like “n ≠ 0” can be skipped over if the step does not fit exactly."), S("Fixed loops", "🧮", "A for-loop with a fixed count always stops.")]),
    L("Can any program decide it?", decQ, [S("Deciding", "⚖️", "A program decides a question if it always stops with the right yes or no."), S("Halting problem", "⏳", "Turing showed no program can decide, for every program and input, whether it stops."), S("Relatives", "🧬", "Many questions about what a program does in the end are also undecidable. Questions with a fixed amount of work are fine.")]),
    L("Easy or hard problems", hardQ, [S("Quick methods", "⚡", "Class P: problems with a method whose work grows like a small power of the input size."), S("NP-complete", "🧗", "Answers are quick to check, but nobody knows a quick method to find them."), S("Impossible", "⛔", "Some problems have no method at all, however slow.")]),
    L("Counting loop steps", loopQ, [S("Nested loops", "🪆", "Multiply when the inner loop does not depend on the outer one."), S("Changing inner loops", "📐", "If the inner length changes, add up the lengths: 1 + 2 + … gives n(n + 1) ÷ 2."), S("Halving", "✂️", "Halving until nothing is left takes about log base 2 of n steps.")]),
    L("Toy RSA", rsaQ, [S("Two primes", "🔐", "Pick two secret primes p and q. Publish n = p × q."), S("Keys", "🗝️", "Choose e with no factor in common with (p − 1)(q − 1). Then d is its inverse on that clock."), S("Lock and unlock", "🔒", "Encrypt: m^e mod n. Decrypt: c^d mod n. Real keys use primes with hundreds of digits.")]),
    L("Generators", genQ, [S("Order", "📏", "The order of a number modulo p is how many powers it takes to return to 1."), S("Primitive root", "🔑", "A primitive root has order p − 1: its powers reach every non-zero value."), S("How many", "🔢", "A prime p has φ(p − 1) primitive roots.")]),
    L("Groups from clocks", groupQ, [S("Order of an element", "🕰️", "Adding a on a clock of n returns to 0 after n ÷ gcd(a, n) steps."), S("Generators", "🔑", "a generates everything exactly when gcd(a, n) = 1. There are φ(n) of them."), S("Symmetry groups", "🔷", "A regular n-gon has n rotations and n flips: 2n symmetries.")]),
    L("Composing shuffles", shuffleQ, [S("Compose", "🔀", "(σ∘τ)(k) means do τ first, then σ."), S("Inverse", "↩️", "The inverse undoes the shuffle: find where the number came from."), S("Even or odd", "⚖️", "Count out-of-order pairs. An even count is an even shuffle.")]),
    L("Monotone runs", monoQ, [S("Pigeonhole for lists", "📈", "In any long list of different numbers there is a long increasing or decreasing run."), S("Erdős–Szekeres", "🏆", "A list of (a − 1)(b − 1) + 1 numbers must have an increasing run of length a or a decreasing run of length b."), S("Computing", "🧮", "For the longest increasing run, find the best run ending at each number.")]),
    L("Long-run chances", stationQ, [S("Chains", "🔗", "A weather chain gives the chance of tomorrow from today."), S("Balance", "⚖️", "In the long run, the flow between two states is balanced."), S("Steps", "👣", "For two steps, add up the routes through the middle day.")]),
    L("Chance when you know a clue", condDiceQ, [S("Clue", "🕵️", "A clue shrinks the list of possible outcomes."), S("Count", "🔢", "Chance = (outcomes fitting clue and question) ÷ (outcomes fitting the clue)."), S("Not out of 36", "⚠️", "After a clue, the total is smaller. Do not divide by 36.")]),
    L("Probability bounds", boundQ, [S("Markov", "📏", "For non-negative numbers, the share that is at least a is at most average ÷ a."), S("Chebyshev", "📐", "The share k standard deviations or more from the mean is at most 1 ÷ k²."), S("Inside", "🎯", "At least 1 − 1 ÷ k² of the values lie within k standard deviations.")]),
    L("Exactly k in place", fixKQ, [S("Fixed points", "📍", "A gift returned to its owner is a fixed point."), S("Two steps", "🪜", "Choose the k fixed friends, then derange the rest."), S("Derangements", "🌀", "D(2)=1, D(3)=2, D(4)=9, D(5)=44, D(6)=265, D(7)=1854.")]),
    L("Balls and boxes, all ways", boxQ, [S("Four questions", "📦", "Balls different or identical? Boxes different or identical? Empty boxes allowed?"), S("Different balls, identical boxes", "🎾", "Count the splits into exactly k non-empty groups (Stirling numbers)."), S("Identical balls, identical boxes", "⚪", "Count the ways to write n as a sum of at most k positive parts.")]),
    L("Mixed practice", mixOf(mk29), MIXS("Machines, regular patterns, tracing programs, halting and decidability, hard problems, loop counts, toy RSA, groups, shuffles, monotone runs, chains, conditional chances, bounds, derangements and balls in boxes.")),
    L("Level 29 Challenge", mixOf(mk29), MIXS("Level 29 mixes computation, algebra and counting."))
  ];

  // =====================================================================
  // LEVEL 30
  // =====================================================================
  const nimQ = () => {
    const k = ri(3, 4), P = Array.from({ length: k }, () => ri(1, 15)), x = P.reduce((a, b) => a ^ b, 0), t = ri(0, 2);
    const rule = "Nim: players take turns removing any number of stones from one pile; whoever takes the last stone wins.";
    const vis = big(P.join(" &nbsp; "), 1.8);
    if (t === 0) return mcq(`${rule} The piles are shown. Does the player about to move win with perfect play, or lose?`, vis, x ? "wins" : "loses", ["wins", "loses"], [
      "There is a quick test using binary numbers. Write each pile in binary and combine the columns.",
      "Add the pile sizes in binary without carrying (XOR). If the result is 0 the position is lost for the player to move. Otherwise it is a win.",
      "Example: piles 1, 2, 3: 01 ⊕ 10 ⊕ 11 = 00. The player to move loses. Piles 1, 2, 4: result 7, not 0, so the mover wins. Now do yours."]);
    if (t === 1) return num(`${rule} What is the <b>nim-sum</b> (the piles combined with XOR, adding binary digits with no carrying) of these piles?`, vis, x, [
      "Write each pile as a binary number with the same number of digits. In each column, count the ones.",
      "A column gives 1 if it has an odd number of ones and 0 if it has an even number. Read the binary result back as a normal number.",
      "Example: 5 (101), 3 (011), 1 (001): column sums 2, 1, 2 give 010, which is 2. Now do yours."]);
    for (let g = 0; g < 300; g++) {
      const Q = Array.from({ length: k }, () => ri(1, 15)), y = Q.reduce((a, b) => a ^ b, 0);
      if (!y) continue;
      const cand = Q.filter(p => (p ^ y) < p), p = pick(cand);
      return num(`${rule} The piles are shown and you move first. How many stones should you take from the pile of <b>${p}</b> to leave a position where the other player loses?`, big(Q.join(" &nbsp; "), 1.8), p - (p ^ y), [
        "Find the nim-sum of all piles first. Your move must make the nim-sum 0.",
        "Pick a pile whose size XOR the nim-sum is smaller than the pile. That new size is what the pile should become. The stones you take are the old size minus the new size.",
        "Example: piles 2, 4, 5 have nim-sum 3 (010, 100, 101 combine to 011). Pile 2 combined with 3 gives 1, which is smaller, so take 1 stone from the pile of 2. Now do yours."]);
    }
    return num(`${rule} What is the nim-sum of these piles?`, vis, x, ["Write each pile in binary and combine columns.", "A column is 1 if it has an odd number of ones.", "Example: 6 (110), 3 (011): nim-sum is 101 = 5. Now do yours."]);
  };
  const SUBS = [[1, 2], [1, 3], [2, 3], [1, 2, 3], [1, 3, 4], [1, 4], [2, 5], [1, 2, 5], [3, 4, 5]];
  const grundyQ = () => {
    const S0 = pick(SUBS), N = ri(5, 14), g = [];
    for (let n = 0; n <= N; n++) { const seen = new Set(S0.filter(s => s <= n).map(s => g[n - s])); let m = 0; while (seen.has(m)) m++; g.push(m); }
    const rule = `A game: from a pile, a player removes ${S0.length > 1 ? "either " + S0.slice(0, -1).join(", ") + " or " + S0[S0.length - 1] : S0[0]} stones. A player who cannot move loses. The <b>Grundy number</b> of a pile is the smallest whole number (0, 1, 2, …) that is not among the Grundy numbers of the piles you can move to.`;
    if (Math.random() < 0.6) return num(`${rule} What is the Grundy number of a pile of ${N} stones?`, big("🧮"), g[N], [
      "Start from small piles. A pile where you cannot move has Grundy number 0. Build upwards, one pile size at a time.",
      "For each size, list the Grundy numbers of the piles you can move to, then take the smallest number that is missing from that list.",
      "Example: removing 1 or 2: sizes 0, 1, 2, 3 have numbers 0, 1, 2, 0. For size 3 you can move to 2 and 1 with numbers 2 and 1, so the missing smallest is 0. Now do yours."]);
    return tfq(`${rule} True or false? The player to move from a pile of ${N} stones <b>loses</b> with perfect play.`, big("🧮"), g[N] === 0, [
      "A position is lost for the player to move exactly when every move leads to a winning position for the other player.",
      "Compute the Grundy numbers from small piles upwards. A pile is lost if its Grundy number is 0.",
      "Example: removing 1 or 2: pile 3 has only moves to piles 2 and 1, both winning for the next player, so pile 3 is lost. Now do yours."]);
  };
  const pruferQ = () => {
    const n = ri(6, 9), seq = Array.from({ length: n - 2 }, () => ri(1, n)), t = ri(0, 2);
    const vis = big(seq.join(" , "), 1.6);
    const head = `A labelled tree on the vertices 1 to ${n} is stored as a Prüfer code (repeatedly remove the smallest leaf and write down the vertex it was attached to): `;
    if (t === 0) { const v = ri(1, n); return num(`${head}the code is shown. What is the <b>degree</b> of vertex ${v} (its number of neighbours) in the tree?`, vis, seq.filter(x => x === v).length + 1, [
      "In the code, a vertex appears once for each neighbour that was removed as a leaf, except the last neighbour it keeps.",
      "The degree of a vertex is the number of times it appears in the code, plus one.",
      "Example: code 2 2 3 on 5 vertices: vertex 2 appears twice, so its degree is 3. Vertex 1 appears 0 times, so degree 1. Now do yours."]); }
    if (t === 1) return num(`${head}the code is shown. How many <b>leaves</b> (degree 1 vertices) does the tree have?`, vis, n - new Set(seq).size, [
      "A leaf is a vertex of degree one. Which vertices never appear in the code?",
      "A vertex is a leaf exactly when it does not appear in the code. Count the vertices from 1 to n that are missing.",
      "Example: code 2 2 3 on 5 vertices: 1, 4 and 5 are missing, so 3 leaves. Now do yours."]);
    let m = 1; while (seq.includes(m)) m++;
    return num(`${head}the code is shown. Which vertex is removed first (the smallest leaf)?`, vis, m, [
      "The first vertex removed is the smallest leaf. A leaf never appears in the code.",
      "Find the smallest label from 1 upwards that is not in the code.",
      "Example: code 2 2 3 on 5 vertices: 1 is missing from the code, so 1 is removed first. Now do yours."]);
  };
  const bipQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = 6, set = new Set(), m = ri(5, 7);
      while (set.size < m) { const a = ri(1, n), b = ri(1, n); if (a < b) set.add(a + "-" + b); }
      const adj = Array.from({ length: n + 1 }, () => []); set.forEach(e => { const [a, b] = e.split("-").map(Number); adj[a].push(b); adj[b].push(a); });
      const col = Array(n + 1).fill(-1); let ok = true;
      for (let s = 1; s <= n; s++) { if (col[s] >= 0) continue; col[s] = 0; const st = [s]; while (st.length) { const u = st.pop(); for (const w of adj[u]) { if (col[w] < 0) { col[w] = 1 - col[u]; st.push(w); } else if (col[w] === col[u]) ok = false; } } }
      return tfq("True or false? The vertices of this graph can be split into two teams so that every edge joins one team to the other (the graph is bipartite).", big([...set].join(" &nbsp; "), 1.3), ok, [
        "Try to colour the vertices with two colours so that neighbours always differ. Start anywhere and keep going.",
        "Colour one vertex red, its neighbours blue, their other neighbours red, and so on. If you ever need to colour a neighbour the same colour as its partner, the graph is not two-team. An odd cycle always causes this.",
        "Example: edges 1-2, 2-3, 1-3 make a triangle, an odd cycle, so it is not bipartite. Edges 1-2, 2-3, 3-4, 4-1 make a 4-cycle and it is. Now do yours."]); }
    if (t === 1) { const n = ri(5, 14); return num(`What is the largest number of edges a graph on ${n} vertices can have if it has <b>no triangle</b>? (Mantel’s theorem.)`, big("🔺"), Math.floor(n * n / 4), [
      "The best triangle-free graph is one that joins two teams completely, with no edges inside a team.",
      "Split the vertices into two teams as evenly as you can. Every vertex of one team is joined to every vertex of the other, so the edges are the team sizes multiplied.",
      "Example: 7 vertices: teams of 3 and 4 give 3 × 4 = 12 edges. Now do yours."]); }
    const a = ri(2, 6), b = ri(2, 6);
    return num(`A complete bipartite graph has ${a} vertices in one team and ${b} in the other, and every vertex is joined to every vertex of the other team. How many edges does it have?`, big("🔗"), a * b, [
      "Each vertex in the first team has an edge to every vertex in the second team.",
      "Multiply the size of the first team by the size of the second team.",
      "Example: teams of 3 and 4 have 3 × 4 = 12 edges. Now do yours."]);
  };
  const flowQ = () => {
    const big5 = Math.random() < 0.5;
    const nodes = big5 ? ["S", "A", "B", "C", "T"] : ["S", "A", "B", "T"];
    const E = big5 ? [["S", "A"], ["S", "B"], ["A", "C"], ["B", "C"], ["B", "T"], ["C", "T"], ["A", "B"]] : [["S", "A"], ["S", "B"], ["A", "B"], ["A", "T"], ["B", "T"]];
    const cap = E.map(() => ri(1, 9)), inner = nodes.slice(1, -1);
    let best = Infinity;
    for (let m = 0; m < (1 << inner.length); m++) {
      const side = new Set(["S"]); inner.forEach((v, i) => { if (m & (1 << i)) side.add(v); });
      let c = 0; E.forEach(([a, b], i) => { if (side.has(a) && !side.has(b)) c += cap[i]; });
      best = Math.min(best, c);
    }
    return num("Water flows along pipes from S to T. Each pipe has a capacity, shown below, and it can carry flow only in the direction of the arrow. What is the largest total flow from S to T? (Hint idea: the largest flow equals the cheapest cut.)", lines(E.map(([a, b], i) => `${a} → ${b}: ${cap[i]}`)), best, [
      "Try to find the narrowest place where all the water must pass. Split the points into two sides, one with S and one with T.",
      "For every way of splitting, add the capacities of pipes that go from the S side to the T side. The smallest such total is the largest possible flow (the max-flow min-cut theorem).",
      "Example: S→A 3, A→T 2, S→T 1. Cut {S}: 3 + 1 = 4. Cut {S, A}: 2 + 1 = 3. The smaller is 3, so the maximum flow is 3. Now do yours."]);
  };
  const gridQ = () => {
    const R = ri(3, 4), C = ri(3, 4), G = Array.from({ length: R }, () => Array.from({ length: C }, () => ri(1, 9)));
    const mx = Math.random() < 0.5, D = G.map(r => r.slice());
    for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) {
      if (i === 0 && j === 0) continue;
      const opts = []; if (i > 0) opts.push(D[i - 1][j]); if (j > 0) opts.push(D[i][j - 1]);
      D[i][j] = G[i][j] + (mx ? Math.max(...opts) : Math.min(...opts));
    }
    return num(`Start in the top-left square and walk to the bottom-right square, moving only <b>right</b> or <b>down</b>. Add up the numbers of the squares you step on (including the first and last). What is the ${mx ? "largest" : "smallest"} total you can get?`, TB(G), D[R - 1][C - 1], [
      "Do not try all the paths. Work out the best total for each square, starting from the top-left.",
      "For each square, the best total is its own number plus the better of the two totals from the square above and the square to the left. In the first row and column there is only one way in.",
      "Example: grid 1 2 / 3 4, largest total: top-left 1, then 1+2 = 3 and 1+3 = 4, then bottom-right 4 + the better of 3 and 4 = 8. Now do yours."]);
  };
  const coinQ = () => {
    const sets = [[1, 3, 4], [1, 5, 6], [1, 4, 6], [1, 7, 10], [1, 5, 8], [1, 3, 5, 6], [1, 6, 10]], D = pick(sets), A = ri(6, 30);
    const best = Array(A + 1).fill(Infinity); best[0] = 0;
    for (let a = 1; a <= A; a++) D.forEach(d => { if (d <= a) best[a] = Math.min(best[a], best[a - d] + 1); });
    let r = A, g = 0; [...D].sort((x, y) => y - x).forEach(d => { g += Math.floor(r / d); r %= d; });
    if (Math.random() < 0.55) return num(`You have unlimited coins worth ${D.join(", ")}. What is the <b>fewest</b> coins that make exactly ${A}?`, big("🪙"), best[A], [
      "Taking the biggest coin first is not always best. Work out the answer for every smaller amount.",
      "Fewest coins for an amount = 1 + the smallest of (fewest for amount − coin) over every coin that fits. Fill in a table from 0 upwards.",
      "Example: coins 1, 3, 4 and amount 6: greedy gives 4 + 1 + 1 (3 coins) but 3 + 3 uses 2. The table gives 2. Now do yours."]);
    return num(`A cashier uses the <b>greedy</b> method: always take the biggest coin that still fits, repeat. With coins worth ${D.join(", ")}, how many coins does the cashier use for ${A}?`, big("🪙"), g, [
      "Follow the method exactly. Take the largest coin that is not more than the amount left.",
      "After taking it, subtract and repeat with the remaining amount. Count coins as you go.",
      "Example: coins 1, 5, 6 and amount 10: take 6, then 1, 1, 1, 1 = 5 coins in total. Now do yours."]);
  };
  const codeQ2 = () => {
    const t = ri(0, 4);
    if (t === 0) { const n = ri(6, 9), a = Array.from({ length: n }, () => ri(0, 1)), b = Array.from({ length: n }, () => ri(0, 1)); return num("The <b>Hamming distance</b> between two bit strings of the same length is the number of positions where they differ. What is the distance between these two strings?", big(a.join("") + "<br>" + b.join(""), 1.6), a.filter((x, i) => x !== b[i]).length, [
      "Line the strings up and compare them position by position.",
      "Count the positions where one string has 0 and the other has 1.",
      "Example: 1011 and 1101 differ in positions 2 and 3: distance 2. Now do yours."]); }
    if (t === 1) { const d = ri(2, 8); const kind = ri(0, 1);
      if (kind === 0) return num(`A code’s words are all at least ${d} apart (minimum distance ${d}). How many bit errors can it always <b>detect</b>?`, big("📡"), d - 1, [
        "Detecting means noticing something went wrong. A damaged word must not turn into another valid word.",
        "If at most d − 1 bits flip, you cannot reach another code word, because those are at least d away.",
        "Example: minimum distance 3 detects up to 2 errors. Now do yours."]);
      return num(`A code’s words are all at least ${d} apart (minimum distance ${d}). What is the largest number of bit errors it can always <b>correct</b> by choosing the nearest code word?`, big("📡"), Math.floor((d - 1) / 2), [
        "To correct, the damaged word must still be closer to the original than to any other code word.",
        "Errors up to the whole-number part of (d − 1) ÷ 2 keep the damaged word nearer to the original.",
        "Example: minimum distance 5 corrects 2 errors. Now do yours."]); }
    if (t === 2) { const n = ri(6, 9), a = Array.from({ length: n }, () => ri(0, 1)); return num("Add an <b>even parity bit</b> to the end of this message so the total number of 1s is even. Which bit do you add?", big(a.join(""), 1.6), a.reduce((x, y) => x + y, 0) % 2, [
      "Count the ones in the message.",
      "If the number of ones is odd, you need one more 1 to make it even. If it is already even, add a 0.",
      "Example: 1101 has three ones (odd), so add 1 to get 11011 with four ones. Now do yours."]); }
    if (t === 3) { const n = ri(5, 12); return num(`How many bit strings of length ${n} are at distance <b>exactly 1</b> from a given string, or are equal to it? (Count the string itself too.)`, big("📡"), n + 1, [
      "Changing exactly one bit gives a string at distance one. How many bits can you choose to flip?",
      "There are as many neighbours as there are positions. Add one for the string itself.",
      "Example: length 4: 4 neighbours plus the string itself = 5. Now do yours."]); }
    const n = ri(5, 10); return num(`How many bit strings of length ${n} are at distance <b>exactly 2</b> from a given string?`, big("📡"), comb(n, 2), [
      "Distance two means exactly two bits are flipped. You choose which positions.",
      "Choose 2 positions out of n. Order does not matter.",
      "Example: length 5: C(5, 2) = 10. Now do yours."]);
  };
  const lg = (N, b) => { let k = 0, x = 1; while (x < N) { x *= b; k++; } return k; };
  const infoQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const N = ri(5, 1000); return num(`I think of one of ${N} numbers. Every question you ask has a yes/no answer. What is the fewest questions that will <b>always</b> find my number?`, big("❓"), lg(N, 2), [
      "Each answer can at best cut the possibilities in half. How many halvings do you need to get to one?",
      "Find the smallest k with 2 multiplied by itself k times at least as large as the number of possibilities.",
      "Example: 20 possibilities: 2⁴ = 16 is too small, 2⁵ = 32 is enough, so 5 questions. Now do yours."]); }
    if (t === 1) { const n = ri(3, 8); const f = fact(n); return num(`Sorting ${n} different numbers by comparing two at a time. Each comparison gives “bigger” or “smaller”. At least how many comparisons does <b>any</b> method need in the worst case?`, big("🔢"), lg(f, 2), [
      "The list can be in any of n! orders. Each comparison can at best split the possibilities in half.",
      "Work out n! (the number of orders). Then find the smallest k with 2^k at least as large as n!.",
      "Example: 4 numbers: 24 orders, 2⁴ = 16 is too small, 2⁵ = 32 is enough, so 5. Now do yours."]); }
    if (t === 2) { const N = ri(4, 80); return num(`One of ${N} coins is fake and heavier. A balance scale has three outcomes: left heavier, right heavier, or equal. What is the fewest weighings that will <b>always</b> find the fake?`, big("⚖️"), lg(N, 3), [
      "Each weighing has three outcomes. Each can at best split the coins into three equal groups.",
      "Find the smallest k with 3 multiplied by itself k times at least as large as the number of coins.",
      "Example: 10 coins: 3² = 9 is too small, 3³ = 27 is enough, so 3 weighings. Now do yours."]); }
    const k = ri(2, 6), ways = pick([2, 3]);
    return num(`A process makes ${k} choices one after another. Each choice has ${ways} possible outcomes. How many different outcome lists can it produce?`, big("🌳"), ways ** k, [
      "Each new choice multiplies the number of possibilities.",
      "Multiply the number of outcomes by itself once for each choice.",
      "Example: 3 choices of 2 outcomes each: 2 × 2 × 2 = 8. Now do yours."]);
  };
  const avgPairQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const k = pick([2, 4, 5, 10]), n = ri(5, 15); return num(`A random string of length ${n} is made by picking each letter independently and fairly from ${k} letters. On average, how many <b>neighbouring pairs</b> of equal letters does it have?`, big("🔤"), r2((n - 1) / k), [
      "Use the average of a sum: add up the chances of each neighbouring pair being equal.",
      "There are n − 1 neighbouring pairs, and each is equal with chance 1 ÷ (number of letters). Multiply the two.",
      "Example: length 5 over 2 letters: 4 pairs, each equal with chance 1/2: average 2. Now do yours."]); }
    if (t === 1) { const n = ri(4, 14); return num(`A fair coin is flipped ${n} times. On average, how many times do two <b>heads in a row</b> appear (counting each neighbouring pair of flips that are both heads)?`, big("🪙"), r2((n - 1) / 4), [
      "Count neighbouring pairs of flips. Each pair has its own chance to be heads-heads.",
      "Number of pairs is one fewer than the flips. Each is both-heads with chance one in four. Multiply.",
      "Example: 5 flips: 4 pairs × 1/4 = 1. Now do yours."]); }
    if (t === 2) { const n = ri(4, 15); return num(`A deck of ${n} different cards is shuffled. On average, how many times is a card <b>smaller than the card right after it</b> (an ascent)?`, big("🃏"), r2((n - 1) / 2), [
      "For any two neighbouring cards, which is smaller is equally likely either way.",
      "Each of the n − 1 neighbouring pairs is an ascent with chance one half. Add the chances.",
      "Example: 6 cards: 5 pairs × 1/2 = 2.5. Now do yours."]); }
    const n = ri(3, 15); return num(`A fair coin is flipped ${n} times. A <b>run</b> is a block of equal results in a row (HHH is one run). On average, how many runs are there?`, big("🪙"), r2(1 + (n - 1) / 2), [
      "A new run starts at the first flip, and again every time the result changes from the flip before.",
      "The first flip always starts a run. Each of the other flips starts a run with chance one half (it differs from the one before). Add them up.",
      "Example: 5 flips: 1 + 4 × 1/2 = 3. Now do yours."]);
  };
  const genFnQ = () => {
    const k = ri(2, 3), lo = [], hi = [];
    for (let i = 0; i < k; i++) { const l = ri(0, 2); lo.push(l); hi.push(l + ri(1, 4)); }
    let poly = [1]; for (let i = 0; i < k; i++) { const nx = Array(poly.length + hi[i] + 1).fill(0); poly.forEach((c, a) => { for (let b = lo[i]; b <= hi[i]; b++) nx[a + b] += c; }); poly = nx; }
    const ts = poly.map((c, i) => [c, i]).filter(x => x[0] > 0), n = pick(ts)[1];
    const names = ["Ann", "Ben", "Cy"];
    return num(`${n} sweets are shared out among ${k} children (all sweets are given out; sweets are identical). ${names.slice(0, k).map((nm, i) => `${nm} must get between ${lo[i]} and ${hi[i]}`).join("; ")}. In how many ways can this be done?`, big("🍬"), poly[n], [
      "Each child’s allowed amount is like a list of choices. The number of ways is the number of choices that add up to the total.",
      "Multiply the polynomials (1 + x + … written for each child’s allowed amounts). The number in front of x to the power of the total is the answer. Or count by hand: fix the first children, see what is left for the last.",
      "Example: 3 sweets between two children, each gets 0 to 2: (0,3) no, (1,2), (2,1), (3,0) no: 2 ways. Now do yours."]);
  };
  const liarQ = () => {
    const style = ri(0, 2), n = style === 1 ? ri(3, 8) : pick([4, 6, 8]);
    const sols = [];
    for (let m = 0; m < (1 << n); m++) {
      const truth = Array.from({ length: n }, (_, i) => !!(m & (1 << i))), liars = truth.filter(x => !x).length;
      let ok = true;
      for (let i = 0; i < n; i++) {
        const st = style === 0 ? liars >= i + 1 : style === 1 ? liars === i + 1 : !truth[(i + 1) % n];
        if (st !== truth[i]) ok = false;
      }
      if (ok) sols.push(liars);
    }
    const liars = sols[0], askL = Math.random() < 0.5;
    const says = style === 0 ? "Person k says: “At least k of us are liars.” (k = 1, 2, …)" : style === 1 ? "Person k says: “Exactly k of us are liars.” (k = 1, 2, …)" : "Each person says: “The next person in the circle is a liar.” (The last person talks about the first.)";
    return num(`${n} people each speak. Truth-tellers always tell the truth and liars always lie. ${says} There are ${n} people. How many are ${askL ? "liars" : "truth-tellers"}?`, big("🗣️"), askL ? liars : n - liars, [
      "Guess how many liars there are, then check whether each person’s statement matches that guess. A statement is true exactly when the person is a truth-teller.",
      "Work out which people are telling the truth if the guess were right. Their number must match: truth-tellers plus liars add up to everyone. Try the guesses in turn.",
      "Example: 3 people, person k says “Exactly k of us are liars”. If there are 2 liars, only person 2 tells the truth, which fits: 1 truth-teller + 2 liars. Now do yours."]);
  };
  const diagQ = () => {
    const n = ri(4, 5), rows = Array.from({ length: n }, () => Array.from({ length: n }, () => ri(0, 1)).join(""));
    const flipped = rows.map((r, i) => (r[i] === "0" ? "1" : "0")).join("");
    const vis = lines(rows.map((r, i) => `row ${i + 1}: ${r}`));
    if (Math.random() < 0.6) return txt("Cantor’s diagonal trick: build a new string whose k-th digit is the <b>opposite</b> of the k-th digit of row k. Type the new string.", vis, flipped, [
      "Take row 1 and look at its first digit. Then row 2 and its second digit, and so on down the diagonal.",
      "Flip each diagonal digit: 0 becomes 1 and 1 becomes 0. Write the flipped digits in order.",
      "Example: rows 01, 10: diagonal digits 0 and 0, flipped 1 and 1. The new string is 11. Now do yours."]);
    const k = ri(1, n);
    return mcq(`Use Cantor’s trick: the new string’s k-th digit is the opposite of the k-th digit of row k. What is the <b>digit number ${k}</b> of the new string?`, vis, flipped[k - 1], ["0", "1"], [
      "You need only the diagonal digit of one row: which row, and which position in it?",
      "Look at row k, position k. The new digit is the opposite of that one.",
      "Example: row 2 is 10, position 2 is 0, so the new digit number 2 is 1. Now do yours."]);
  };
  const PAR = [
    ["Is the sentence “This sentence is false.” true or false?", "neither: either answer causes a contradiction", ["true", "false"], "Suppose it is true. What does it say about itself? Now suppose it is false.", "If it is true then it must be false, and if it is false then it says something that is then correct. Both ways clash.", "Example: “This sentence is true.” has no such clash, it just says it is true."],
    ["A barber shaves exactly the men who do not shave themselves. Who shaves the barber?", "no one can: such a barber cannot exist", ["the barber himself", "some other man"], "Ask whether the barber shaves himself, and follow the rule.", "If he shaves himself, the rule says he does not. If he does not, the rule says he does. So the story is impossible.", "Example: a barber who shaves exactly the men in the next town is perfectly possible."],
    ["Let R be “the set of all sets that do not contain themselves”. Is R a member of R?", "if yes then no, and if no then yes: a contradiction", ["yes, it is a member", "no, it is not a member"], "Test both: assume R is a member of R, then assume it is not.", "Membership of R means “does not contain itself”. Either assumption flips to the other. This is Russell’s paradox.", "Example: the set of all spoons is not a spoon, so it is a member of R; but R itself breaks the pattern."],
    ["What did Gödel’s first incompleteness theorem show, roughly?", "in a consistent system of arithmetic there are true statements it cannot prove", ["every true statement can be proved", "arithmetic contradicts itself"], "It is about what a fixed set of rules can and cannot reach.", "Gödel built a statement that says “I cannot be proved” inside arithmetic. If it could be proved, the system would prove a falsehood.", "Example: a rule book might not settle every question about its own rules."],
    ["The sentence “This sentence has five words.” is…", "true: it really has five words", ["a paradox", "false"], "Count the words, one at a time.", "The sentence talks about itself, but there is nothing contradictory: you can simply count.", "Example: “This sentence has six words.” would be false, not a paradox."],
    ["The sentence “This sentence is true.” can be…", "either true or false without a contradiction", ["only true", "neither true nor false in any way"], "Assume it is true and see whether that causes trouble. Then assume it is false.", "Both assumptions are consistent: there is nothing that settles which one it is. It is not a contradiction, just undecided.", "Example: compare with the liar sentence, which has no consistent assignment at all."],
    ["Suppose a program H could always tell whether any program stops on a given input. A trick program D asks H about itself and then does the opposite. What follows?", "H cannot exist: D would contradict it", ["D runs forever", "H must be wrong only sometimes"], "What does H say about D running on D, and what does D then do?", "If H says D stops, D loops forever. If H says D loops, D stops. Either way H is wrong, so no such H can exist.", "Example: this is the same shape as the barber who shaves exactly those who do not shave themselves."],
    ["Could a list contain every infinite string of 0s and 1s?", "no: flipping the diagonal gives a string that is not on the list", ["yes, with a long enough list", "yes, if the strings are sorted"], "Try to build a string that differs from every string on any list you are given.", "Make the new string differ from row k at position k. Then it differs from every row.", "Example: for rows 00 and 11 the diagonal digits are 0 and 1, flipped to 1 and 0, so the new string 10 is not on the list."]
  ];
  const parQ = () => {
    const p = pick(PAR);
    return mcq(p[0], big("🌀"), p[1], p[2], [p[3], p[4], p[5] + " Now do yours."]);
  };
  const rerollQ = () => {
    const s = pick([4, 6, 8, 10, 12, 20]), t = ri(0, 2), m = s / 2;
    if (t === 0) return num(`You roll one fair ${s}-sided die (numbers 1 to ${s}). What is the average of the number it shows?`, big("🎲"), (s + 1) / 2, [
      "Add all the possible numbers and divide by how many there are. Or use symmetry: pair the smallest with the largest.",
      "The average of the numbers 1 to s is the middle value: (1 + s) ÷ 2.",
      "Example: a 6-sided die has average 7 ÷ 2 = 3.5. Now do yours."]);
    if (t === 1) return num(`You roll a fair ${s}-sided die. You may keep the number, or roll once more and <b>must</b> keep the second number. You want the highest number. You should roll again if the first number is at most what?`, big("🎲"), m, [
      "Rolling again gives the average of one roll. Compare your first number with that average.",
      "Keep the number if it is bigger than the average of a fresh roll. Roll again if it is smaller. Because the average is half-way between whole numbers here, find the largest whole number below it.",
      "Example: for a 6-sided die the average is 3.5, so you roll again on 3 or less. Now do yours."]);
    let e = 0; for (let v = m + 1; v <= s; v++) e += v / s; e += (m / s) * ((s + 1) / 2);
    return num(`You roll a fair ${s}-sided die. You may keep the number, or roll once more and <b>must</b> keep the second number. You play the best strategy. On average, what number do you end up with?`, big("🎲"), r2(e), [
      "Split into two cases: first numbers you keep, and first numbers you throw away.",
      "Keep the numbers above the average of one roll: each contributes its own value with chance 1/s. The others are replaced by a fresh roll, whose average is (s + 1) ÷ 2. Add the two parts.",
      "Example: 4-sided die: keep 3 or 4: (3 + 4) ÷ 4 = 1.75; reroll on 1 or 2 (chance 1/2) with average 2.5 → 1.25. Total 3. Now do yours."]);
  };
  const GR = [
    ["the whole numbers 0 to 6 with addition modulo 7", true], ["the whole numbers 1 to 4 with multiplication modulo 5", true], ["the whole numbers 1 to 5 with multiplication modulo 6", false],
    ["all whole numbers with addition", true], ["the positive whole numbers with addition", false], ["all whole numbers with subtraction", false], ["the even whole numbers with addition", true],
    ["the odd whole numbers with addition", false], ["the non-zero fractions with multiplication", true], ["all real numbers with multiplication", false], ["the two numbers 1 and −1 with multiplication", true],
    ["the whole numbers 0 to 5 with multiplication modulo 6", false], ["the whole numbers 1 to 6 with multiplication modulo 7", true], ["the whole numbers 1 to 7 with multiplication modulo 8", false]
  ];
  const grpQ = () => {
    if (Math.random() < 0.75) { const g = pick(GR); return tfq(`True or false? <b>${g[0]}</b> form a group.`, big("🧩"), g[1], [
      "Check the four group rules: the operation stays inside the set (closed), it is associative, there is an identity, and every element has an inverse.",
      "Look for the rule that fails. Common failures: leaving the set, no identity in the set, or an element with no inverse (like 0 under multiplication).",
      "Example: the positive whole numbers with addition: there is no identity (0 is missing) and no negatives, so not a group. Now do yours."]); }
    const n = pick([8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24]);
    return num(`How many elements does the group of invertible numbers modulo ${n} (under multiplication) have?`, big("🧩"), phi(n), [
      "Which numbers from 1 up have an inverse on a clock? Think about common factors with the clock size.",
      "Count the numbers below the clock size that share no common factor with it (the φ count).",
      "Example: modulo 9: 1, 2, 4, 5, 7, 8 are invertible: 6 of them. Now do yours."]);
  };
  const cubeQ = () => {
    const n = ri(3, 8), t = ri(0, 3);
    const H = ["A cube has 8 corners and 12 edges, and a line (n = 1) has 2 corners and 1 edge. Build the pattern for n dimensions: each corner is a string of n bits.", "", ""];
    if (t === 0) return num(`The n-dimensional hypercube has a corner for every string of n bits, and an edge between corners that differ in exactly one bit. For n = ${n}, how many corners?`, big("🧊"), 2 ** n, [
      "Each corner is a string of n bits. How many different strings are there?", "Each bit has two possible values, and there are n bits. Multiply.", "Example: n = 3: 2 × 2 × 2 = 8 corners. Now do yours."]);
    if (t === 1) return num(`The n-dimensional hypercube has a corner for every string of n bits, and an edge between corners that differ in exactly one bit. For n = ${n}, how many edges?`, big("🧊"), n * 2 ** (n - 1), [
      "Each corner has as many edges as it has bits it can flip.", "Corners times edges per corner counts each edge twice (once from each end). So halve it.", "Example: n = 3: 8 corners × 3 edges ÷ 2 = 12 edges. Now do yours."]);
    if (t === 2) { const k = ri(1, n - 1); return num(`In the n-dimensional hypercube with n = ${n}, how many corners are exactly ${k} edge${k === 1 ? "" : "s"} away from one chosen corner (so differ from it in exactly ${k} bit${k === 1 ? "" : "s"})?`, big("🧊"), comb(n, k), [
      "Being k steps away means k bits are different. Which bits?", "Choose the k positions to flip out of n. Order does not matter.", "Example: n = 4, distance 2: C(4, 2) = 6. Now do yours."]); }
    const m = ri(2, 6); return num(`In the hypercube with n = ${m}, how many different shortest routes are there from a corner to the opposite corner (all bits different)? Each step flips one bit.`, big("🧊"), fact(m), [
      "A shortest route flips each of the differing bits exactly once. The only choice is the order.",
      "The number of ways to put the n bits in order is n factorial.",
      "Example: n = 3: 3 × 2 × 1 = 6 routes. Now do yours."]);
  };
  const FIB = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  const zeckQ = () => {
    const n = ri(4, 100); let r = n; const used = [];
    for (let i = FIB.length - 1; i >= 0; i--) if (FIB[i] <= r) { used.push(FIB[i]); r -= FIB[i]; }
    const t = ri(0, 2), head = `Every number is a sum of Fibonacci numbers (1, 2, 3, 5, 8, 13, 21, 34, 55, 89) where no two used are neighbours in the list. This split is unique (Zeckendorf). For ${n}: `;
    const H = ["Take the biggest Fibonacci number that is not more than the number. Then repeat with what is left.", "The greedy method gives the right split. After taking a Fibonacci number, the leftover is always smaller than the next Fibonacci number down, so the used numbers are never neighbours.", ""];
    const ex = "Example: 30 = 21 + 8 + 1 (take 21, left 9; take 8, left 1; take 1). Now do yours.";
    if (t === 0) return num(head + "how many Fibonacci numbers are in the split?", big("🐚"), used.length, [H[0], H[1], ex]);
    if (t === 1) return num(head + "what is the <b>largest</b> Fibonacci number in the split?", big("🐚"), used[0], [H[0], H[1], ex]);
    return num(head + "what is the <b>smallest</b> Fibonacci number in the split?", big("🐚"), used[used.length - 1], [H[0], H[1], ex]);
  };

  const mk30 = [nimQ, grundyQ, pruferQ, bipQ, flowQ, gridQ, coinQ, codeQ2, infoQ, avgPairQ, genFnQ, liarQ, diagQ, parQ, rerollQ, grpQ, cubeQ, zeckQ];
  const L30 = [
    L("Nim and the XOR trick", nimQ, [S("Nim-sum", "🧮", "Write the piles in binary and add each column without carrying. The result is the nim-sum."), S("Win or lose", "🏆", "If the nim-sum is 0, the player to move loses. If not, there is a move that makes it 0."), S("The move", "🎯", "Find a pile whose size XOR the nim-sum is smaller. Shrink it to that.")]),
    L("Grundy numbers", grundyQ, [S("Mex", "🔢", "The mex is the smallest whole number not in a list."), S("Grundy number", "🧠", "g(n) = mex of g(n − move) over all moves. A pile with no move has 0."), S("Zero means lost", "🛑", "A position with Grundy number 0 is lost for the player to move.")]),
    L("Prüfer codes", pruferQ, [S("The code", "📜", "Remove the smallest leaf, write down its neighbour, repeat. After n − 2 steps you stop."), S("Degree", "🔗", "A vertex of degree d appears d − 1 times in the code."), S("Leaves", "🍃", "Leaves never appear in the code.")]),
    L("Bipartite and triangle-free", bipQ, [S("Two teams", "👥", "A graph is bipartite if the vertices split into two teams and every edge crosses between teams."), S("Odd cycles", "🔺", "A graph is bipartite exactly when it has no odd cycle."), S("Most edges", "🏆", "Without triangles, at most ⌊n²/4⌋ edges: split evenly into two teams and join across.")]),
    L("Max flow = min cut", flowQ, [S("Flow", "💧", "Flow follows the arrows and stays within each capacity."), S("Cut", "✂️", "A cut splits the points into an S side and a T side. Its value is the total capacity going from S side to T side."), S("Theorem", "🏁", "The largest flow equals the smallest cut.")]),
    L("Best path in a grid", gridQ, [S("Move rules", "➡️", "You can only go right or down. That makes every square reachable from only two others."), S("Best so far", "📋", "For each square, best total = own number + best of (above, left)."), S("Fill the table", "🧾", "Fill row by row from the top-left. The bottom-right entry is the answer.")]),
    L("Greedy or not?", coinQ, [S("Greedy", "🤏", "Greedy means always taking the biggest coin that fits."), S("Sometimes wrong", "⚠️", "With coins 1, 3, 4 and amount 6, greedy uses 3 coins but 3 + 3 uses only 2."), S("Table method", "📋", "Fewest(a) = 1 + the smallest fewest(a − coin). Fill from 0 upwards.")]),
    L("Codes that fix errors", codeQ2, [S("Distance", "📡", "The Hamming distance counts the positions where two strings differ."), S("Detect and correct", "🛠️", "Minimum distance d detects d − 1 errors and corrects ⌊(d − 1) ÷ 2⌋."), S("Parity", "➕", "A parity bit makes the number of 1s even. It detects one flipped bit.")]),
    L("How much information?", infoQ, [S("Halving", "❓", "A yes/no question can at best halve the possibilities. N possibilities need ⌈log₂ N⌉ questions."), S("Three outcomes", "⚖️", "A balance has three outcomes, so N coins need ⌈log₃ N⌉ weighings."), S("Sorting", "🔢", "n numbers have n! orders, so at least ⌈log₂ n!⌉ comparisons are needed.")]),
    L("Averages by pairs", avgPairQ, [S("Add the chances", "➕", "The average of a count is the sum of the chances of each part happening."), S("Neighbours", "👫", "A list of n has n − 1 neighbouring pairs."), S("Runs", "🏃", "Each flip after the first starts a new run with chance 1/2.")]),
    L("Coefficients that count", genFnQ, [S("Polynomials count", "🧮", "Write 1 + x + x² + … for the amounts a child may get. Multiply for all children."), S("Read off", "👓", "The number in front of x^n is the number of ways to reach a total of n."), S("By hand", "✍️", "Or fix the first children’s amounts and see what is left for the last child.")]),
    L("Truth and lies by checking cases", liarQ, [S("Guess and check", "🔍", "Guess the number of liars, then see which statements are true."), S("Consistent", "✅", "A speaker is a truth-teller exactly when the statement is true. The guess must match."), S("Circles", "⭕", "In a circle, statements about the neighbour make the speakers alternate.")]),
    L("Diagonal trick", diagQ, [S("A list", "📚", "Imagine a list of infinite strings of 0s and 1s."), S("Flip the diagonal", "↘️", "Make a new string by flipping the k-th digit of the k-th string."), S("Not on the list", "🚫", "The new string differs from every string at some place, so it is missing. No list holds them all.")]),
    L("Paradoxes", parQ, [S("Self-reference", "🌀", "Sentences and sets that talk about themselves can cause contradictions."), S("Famous ones", "📚", "The liar, the barber, Russell’s set, and the halting trick program all have this shape."), S("Not all are paradoxes", "✅", "A sentence like “This sentence has five words” talks about itself and is simply true.")]),
    L("When to roll again", rerollQ, [S("Average", "🎲", "One s-sided die averages (s + 1) ÷ 2."), S("Reroll rule", "🔁", "If you can reroll once, keep the first number only if it beats that average."), S("Value", "💰", "Expected value = kept numbers’ contribution + (chance of rerolling) × average.")]),
    L("Is it a group?", grpQ, [S("Four rules", "📜", "Closed, associative, has an identity, and every element has an inverse."), S("Common failures", "❌", "Not closed (odd + odd), no identity (positive numbers with +), no inverse (0 under ×)."), S("Clock groups", "🕰️", "Multiplication modulo n makes a group on the numbers sharing no factor with n.")]),
    L("The hypercube", cubeQ, [S("Bits as corners", "🧊", "Corners are strings of n bits. Edges flip one bit."), S("Counting", "🔢", "2ⁿ corners, n × 2ⁿ⁻¹ edges, and C(n, k) corners at distance k."), S("Routes", "🛣️", "A shortest route to the opposite corner flips each bit once, in any order: n! routes.")]),
    L("Fibonacci sums", zeckQ, [S("Fibonacci", "🐚", "1, 2, 3, 5, 8, 13, 21, 34, 55, 89 …"), S("Greedy split", "🤏", "Take the biggest that fits, then repeat with the rest."), S("Unique", "✨", "No two used numbers are neighbours, and the split is the only one like that.")]),
    L("Mixed practice", mixOf(mk30), MIXS("Games, trees and networks, flows, dynamic programming, codes, information, averages, generating functions, liars, diagonal arguments, paradoxes, groups, hypercubes, Fibonacci sums.")),
    L("Level 30 Challenge", mixOf(mk30), MIXS("Level 30 mixes games, graphs, algorithms, chance and logic."))
  ];

  Object.assign(LOGIC_LEVELS, { 28: L28, 29: L29, 30: L30 });
})();
