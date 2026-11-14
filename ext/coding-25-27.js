// ext/coding-25-27.js  Mind Lab Coding levels 25-27 (60 lessons): discrete math for computing, algorithm analysis, computer architecture, operating systems, paradigms, data structures (CS2), graph algorithms, dynamic programming, testing, databases
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = t => [
    S("Review time!", "🔄", "This lesson mixes ideas you already know. Take your time and think about each one."),
    S("Remember", "🧠", t),
    S("Tip", "💡", "Go slowly. Write the values down step by step, and check your answer once before you press the button.")
  ];
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const sp = "&nbsp;&nbsp;&nbsp;&nbsp;";
  const nk = x => String(x).toLowerCase().replace(/[^a-z0-9]/g, "");
  const strChoices = (right, wrongs) => { const seen = new Set([nk(right)]), out = []; for (const w of wrongs) { if (!seen.has(nk(w))) { seen.add(nk(w)); out.push(w); } } return shuf([right, ...out.slice(0, 3)]); };
  const num = (text, answer, hints, visual) => ({ text, visual, answer, hints });
  const mc = (text, right, wrongs, hints, visual) => ({ text, visual, choices: strChoices(right, wrongs), answer: right, hints });
  const yn = (text, ok, hints, visual) => ({ text, visual, choices: ["yes", "no"], answer: ok ? "yes" : "no", hints });
  const tf = (text, ok, hints, visual) => ({ text, visual, choices: ["true", "false"], answer: ok ? "true" : "false", hints });
  const lst = a => "[" + a.join(", ") + "]";
  const uniq = (n, lo, hi) => shuf(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: strChoices(r, w), answer: r, hints: [nudge, c || nudge, example] };
  };
  const table = (head, rows) => `<table style="border-collapse:collapse;margin:auto;font-size:0.95em"><tr>${head.map(h => `<th style="border:1px solid #889;padding:3px 10px;background:#dde4ff;color:#1a2a55">${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td style="border:1px solid #889;padding:3px 10px">${c}</td>`).join("")}</tr>`).join("")}</table>`;
  const fact = n => n <= 1 ? 1 : n * fact(n - 1);
  const choose = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const perm = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r *= n - i; return r; };
  const sup = { 2: "²", 3: "³" };
  const nPow = e => e === 0 ? "1" : e === 1 ? "n" : "n^" + e;

  // ======================= LEVEL 25 =======================
  const setsQ = () => {
    const f = ri(0, 4);
    if (f === 0) { const a = ri(6, 30), b = ri(6, 30), c = ri(1, Math.min(a, b) - 1); return num(`|A| = ${a}, |B| = ${b} and |A ∩ B| = ${c}. What is |A ∪ B|?`, a + b - c, ["Adding |A| and |B| counts the shared items twice.", "Fix the double count by taking away the overlap once.", "Example: |A| = 10, |B| = 7 and overlap 3 gives 10 + 7 - 3 = 14. Now do yours."]); }
    if (f === 1) { const a = ri(6, 30), b = ri(6, 30), c = ri(1, Math.min(a, b) - 1); return num(`|A| = ${a}, |B| = ${b} and |A ∩ B| = ${c}. How many items are in A but not in B?`, a - c, ["Start with everything in A.", "Some of A's items are also in B. Those are the ones counted by the overlap.", "Example: A has 12 items and 5 of them are also in B, so 12 - 5 = 7 are only in A. Now do yours."]); }
    if (f === 2) { const a = ri(6, 20), b = ri(6, 20), c = ri(1, Math.min(a, b) - 1), u = a + b - c + ri(0, 9); return num(`In a club of ${u} students, ${a} play chess, ${b} code and ${c} do both. How many do neither?`, u - (a + b - c), ["First find how many students do at least one of the two things.", "At least one = chess + code - both. Neither = the whole club minus that number.", "Example: 30 students, 10 chess, 12 code, 4 both: 10 + 12 - 4 = 18 do at least one, so 30 - 18 = 12 do neither. Now do yours."]); }
    if (f === 3) { const n = ri(3, 9); return num(`A set has ${n} elements. How many subsets does it have (counting the empty set and the set itself)?`, 2 ** n, ["For each element you choose: in the subset or out.", "Two choices for each of the ${n} elements, one after another, multiply together.".replace("${n}", n), "Example: a set of 3 elements has 2 x 2 x 2 = 8 subsets. Now do yours."]); }
    const a = ri(2, 9), b = ri(2, 9);
    return num(`Set A has ${a} elements and set B has ${b}. How many ordered pairs (x, y) with x from A and y from B are there?`, a * b, ["Pick x first, then pick y.", "Each of the choices for x can go with every choice for y. Multiply.", "Example: 3 shirts and 4 hats make 3 x 4 = 12 outfits. Now do yours."]);
  };
  const WORDS = ["LEVEL", "BANANA", "APPLE", "SEEDS", "MOON", "TOOTH", "ERROR", "COOKIE", "BOOK", "ALL"];
  const arrOf = w => { const c = {}; for (const ch of w) c[ch] = (c[ch] || 0) + 1; let r = fact(w.length); for (const k in c) r /= fact(c[k]); return r; };
  const permQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const n = ri(3, 7); return num(`In how many different orders can ${n} different books be placed on a shelf?`, fact(n), ["Choose the first book, then the second, and so on.", "The number of choices goes down by one each time. Multiply them.", "Example: 4 books can be ordered in 4 x 3 x 2 x 1 = 24 ways. Now do yours."]); }
    if (f === 1) { const n = ri(5, 9), k = ri(2, 4); return num(`A race has ${n} runners. How many different ways can first, second${k > 2 ? " and third" : ""}${k > 3 ? " and fourth" : ""} place be filled (${k} places)?`, perm(n, k), ["The order matters, and no runner can win two places.", `Multiply ${k} numbers, starting at the number of runners and counting down by one each time.`, "Example: 6 runners and 2 places: 6 x 5 = 30 ways. Now do yours."]); }
    if (f === 2) { const w = pick(WORDS); return num(`How many different "words" (any order, real or not) can you make from all the letters of ${w}?`, arrOf(w), ["If every letter were different it would be a factorial. But repeated letters make some orders look identical.", "Divide the factorial of the length by the factorial of each repeat count.", "Example: for AABC, 4! / 2! = 12 orders. Now do yours."]); }
    const n = ri(3, 7);
    return num(`${n} people sit around a round table. Rotations of the same seating count as the same arrangement. How many arrangements are there?`, fact(n - 1), ["Fix one person in place. Rotating everyone does not make a new arrangement.", "Now arrange the remaining people in the other seats: a factorial of one less than the number of people.", "Example: 4 people at a round table: fix one, then 3! = 6 ways. Now do yours."]);
  };
  const combQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const n = ri(5, 12), k = ri(2, 4); return num(`A team needs ${k} players chosen from ${n} students (the order does not matter). How many different teams are possible?`, choose(n, k), ["Order does not matter, so this is not just counting down.", `Count ordered choices (${k} numbers counting down from ${n}), then divide by ${k}! because every team was counted in all its orders.`, "Example: 2 from 5: (5 x 4) / 2! = 10. Now do yours."]); }
    if (f === 1) { const n = ri(4, 15); return num(`${n} students each shake hands once with every other student. How many handshakes happen?`, choose(n, 2), ["A handshake is a pair of students, and the order inside a pair does not matter.", "Count pairs: n x (n - 1) ordered pairs, then halve because each handshake was counted twice.", "Example: 5 students: (5 x 4) / 2 = 10 handshakes. Now do yours."]); }
    if (f === 2) { const n = ri(5, 10), k = ri(2, 4); return num(`How many binary strings of length ${n} have exactly ${k} ones?`, choose(n, k), ["Choose which positions hold the ones. The rest are zeros.", "That is a choice of positions where the order of choosing does not matter.", "Example: length 4 with exactly 2 ones: 4 choose 2 = 6 strings. Now do yours."]); }
    const n = ri(5, 9), k = ri(2, 3);
    return num(`A pizza shop has ${n} toppings. How many different pizzas can you make with exactly ${k} different toppings?`, choose(n, k), ["The order you list toppings in does not change the pizza.", "Use n choose k: count the ordered lists and divide by the number of ways to order k items.", "Example: 2 toppings from 6: (6 x 5) / 2 = 15. Now do yours."]);
  };
  const pascalQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const n = ri(3, 9); return num(`The numbers in row ${n} of Pascal's triangle (row 0 is just 1) are the values of n choose k. What is the sum of the whole row?`, 2 ** n, ["The row lists how many subsets there are of each size.", "Adding all sizes together gives the total number of subsets of an n-element set.", "Example: row 3 is 1, 3, 3, 1 and its sum is 8. Now do yours."]); }
    if (f === 1) { const n = ri(4, 10), k = ri(1, n - 2); return num(`In Pascal's triangle, the two numbers directly above a spot are ${choose(n - 1, k - 1)} and ${choose(n - 1, k)}. What number goes in the spot?`, choose(n, k), ["Each number in Pascal's triangle is built from the two above it.", "Add the two numbers above.", "Example: above are 3 and 3, so the spot holds 6. Now do yours."]); }
    if (f === 2) { const n = ri(3, 9); return num(`A bit string has length ${n}. How many different bit strings are there in all?`, 2 ** n, ["Every position is 0 or 1.", "Multiply the 2 choices once per position.", "Example: length 3 gives 2 x 2 x 2 = 8 strings. Now do yours."]); }
    const n = ri(3, 9);
    return num(`A set has ${n} elements. How many of its subsets have an even number of elements (0 counts as even)?`, 2 ** (n - 1), ["Exactly half of all subsets have an even size when n is at least 1.", "Take the total number of subsets and halve it.", "Example: a 4-element set has 16 subsets, so 8 have even size. Now do yours."]);
  };
  const TT = [
    ["p → q", (p, q, r) => !p || q],
    ["q → p", (p, q, r) => !q || p],
    ["(p ∧ q) → r", (p, q, r) => !(p && q) || r],
    ["p → (q ∨ r)", (p, q, r) => !p || q || r],
    ["¬(p ∧ q)", (p, q, r) => !(p && q)],
    ["p ⊕ q (exactly one is true)", (p, q, r) => p !== q],
    ["(p → q) ∧ (q → p)", (p, q, r) => (!p || q) && (!q || p)],
    ["¬p → q", (p, q, r) => p || q],
    ["(p ∨ q) ∧ ¬r", (p, q, r) => (p || q) && !r]
  ];
  const T_ = b => b ? "T" : "F";
  const truthQ = () => {
    const [d, fn] = pick(TT);
    if (Math.random() < 0.65) {
      const p = Math.random() < 0.5, q = Math.random() < 0.5, r = Math.random() < 0.5;
      return tf(`If p = ${T_(p)}, q = ${T_(q)} and r = ${T_(r)}, is the statement  ${d}  true?`, fn(p, q, r), ["Put the values into the statement and work from the inside out.", "Remember: an implication p → q is only false when p is true and q is false.", "Example: p = F, q = T gives p → q = true, because a false start makes the promise hold. Now do yours."]);
    }
    let cnt = 0; for (let i = 0; i < 8; i++) if (fn(!!(i & 4), !!(i & 2), !!(i & 1))) cnt++;
    return num(`The truth table for p, q and r has 8 rows. In how many rows is  ${d}  true?`, cnt, ["Go through the 8 combinations one by one.", "Count only the rows where the whole statement comes out true. A statement that does not use r still has r's two values in every row.", "Example: p ∧ q is true only when p and q are both true. With r too, that is 2 of the 8 rows. Now do yours."]);
  };
  const PQ = [["a number is divisible by 6", "it is divisible by 3"], ["a shape is a square", "it has four sides"], ["x > 10", "x > 5"], ["a program has a syntax error", "it will not compile"], ["a list is sorted", "binary search works on it"], ["n is a multiple of 4", "n is even"], ["a graph is a tree", "it has no cycles"], ["a string is empty", "its length is 0"]];
  const contraQ = () => {
    const [P, Q] = pick(PQ), kind = ri(0, 3);
    const orig = `If ${P}, then ${Q}.`;
    const forms = { contra: `If not (${Q}), then not (${P}).`, conv: `If ${Q}, then ${P}.`, inv: `If not (${P}), then not (${Q}).`, same: orig };
    if (kind === 3) return mc(`Which statement is always equivalent (true exactly when) to: "${orig}"`, forms.contra, [forms.conv, forms.inv, `If not (${Q}), then ${P}.`], ["Two of the rewritten forms flip the order, and two use 'not'. Only one does both.", "The equivalent form swaps the two parts AND negates both.", "Example: 'If it rains, the grass is wet' is equivalent to 'If the grass is not wet, it did not rain'. Now do yours."]);
    const name = ["the contrapositive", "the converse", "the inverse"][kind], key = ["contra", "conv", "inv"][kind];
    const clue = ["Swap the two parts and put 'not' on both.", "Swap the two parts, with no 'not'.", "Keep the order and put 'not' on both parts."][kind];
    return mc(`What is ${name} of: "${orig}"`, forms[key], Object.keys(forms).filter(k => k !== key && k !== "same").map(k => forms[k]).concat([`If not (${Q}), then ${P}.`]), ["Name the two parts of the statement: the 'if' part and the 'then' part.", clue.replace("Swap", "To build it, swap").replace("Keep", "To build it, keep"), "Example: for 'If a, then b', the converse is 'If b, then a'. Now do yours."]);
  };
  const modQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const a = ri(2, 9), b = ri(2, 12), m = ri(3, 13); let r = 1; for (let i = 0; i < b; i++) r = (r * a) % m; return num(`What is ${a}^${b} mod ${m}?`, r, ["Do not compute the huge number. Reduce mod m after every multiplication.", "Start with 1. Repeat b times: multiply by a, then take the remainder by m.", "Example: 3^4 mod 5: 3, then 9 mod 5 = 4, then 12 mod 5 = 2, then 6 mod 5 = 1. Now do yours."]); }
    if (f === 1) { const a = ri(10, 99), b = ri(10, 99), m = ri(3, 12); return num(`What is (${a} x ${b}) mod ${m}?`, (a * b) % m, ["You may reduce each factor first: (a mod m) x (b mod m), then reduce again.", "Find a mod m and b mod m, multiply them, then take mod m once more.", "Example: (14 x 9) mod 5 = (4 x 4) mod 5 = 16 mod 5 = 1. Now do yours."]); }
    if (f === 2) { const m = ri(3, 9), a = ri(5, 60); const same = Math.random() < 0.5; const b = same ? a + m * ri(1, 6) : a + ri(1, m - 1) + m * ri(0, 5); return yn(`Is ${b} ≡ ${a} (mod ${m})? (Do they leave the same remainder when divided by ${m}?)`, (b - a) % m === 0, ["Congruent means the same remainder, or the difference is a multiple of m.", "Subtract the smaller from the larger and see whether the difference divides evenly by m.", "Example: 17 and 5 mod 6: 17 - 5 = 12 is a multiple of 6, so yes. Now do yours."]); }
    const m = pick([5, 7, 11, 13]), a = ri(2, m - 2); let x = 1; while ((a * x) % m !== 1) x++;
    return num(`Find x from 1 to ${m - 1} with (${a} x x) mod ${m} = 1 (the inverse of ${a} mod ${m}).`, x, ["Try the values of x one by one: 1, 2, 3, and so on.", "For each x multiply by the number and take the remainder by m. Stop when the remainder is 1.", "Example: the inverse of 3 mod 7: 3 x 5 = 15 and 15 mod 7 = 1, so it is 5. Now do yours."]);
  };
  const stepsEuclid = (a, b) => { let n = 0; while (b) { [a, b] = [b, a % b]; n++; } return n; };
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const divQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const p = pick([2, 3, 5]), q = pick([7, 11, 13]), a = ri(1, 4), b = ri(1, 3); return num(`n = ${p}^${a} x ${q}^${b}. How many positive divisors does n have?`, (a + 1) * (b + 1), ["A divisor uses each prime from 0 times up to its full power.", `For ${p} you can use it 0 to ${a} times, which is one more than the power. Do the same for ${q}, then multiply the counts.`, "Example: n = 2^2 x 3^1 has (2 + 1) x (1 + 1) = 6 divisors. Now do yours."]); }
    if (f === 1) { const n = ri(12, 60); let c = 0; for (let i = 1; i <= n; i++) if (n % i === 0) c++; return num(`How many positive divisors does ${n} have?`, c, ["Divisors come in pairs that multiply to the number.", "Check 1, 2, 3, ... up to the square root, and count each pair (a perfect square root counts once).", "Example: 12 has 1, 2, 3, 4, 6, 12, which is 6 divisors. Now do yours."]); }
    if (f === 2) { const g = ri(2, 8), x = ri(2, 6), y = ri(2, 6); if (gcd(x, y) !== 1) return divQ(); const a = g * x, b = g * y; return num(`gcd(${a}, ${b}) = ${g}. What is lcm(${a}, ${b})?`, (a * b) / g, ["There is a famous link: gcd x lcm = a x b.", "Multiply the two numbers, then divide by the gcd.", "Example: gcd(12, 18) = 6, so lcm = 12 x 18 / 6 = 36. Now do yours."]); }
    const b = ri(10, 49), a = ri(50, 200);
    return num(`Euclid's algorithm for gcd(${a}, ${b}) keeps replacing (a, b) by (b, a mod b) until b becomes 0. How many steps (replacements) does it take?`, stepsEuclid(a, b), ["Write each pair on its own line and stop when the second number is 0.", "Count one step for each time you take a remainder and make a new pair.", "Example: gcd(48, 18): (48, 18) -> (18, 12) -> (12, 6) -> (6, 0), which is 3 steps. Now do yours."]);
  };
  const indQ = () => {
    const f = ri(0, 3), n = ri(3, 12);
    if (f === 0) return num(`By induction, 1 + 2 + ... + n = n(n+1)/2. What is 1 + 2 + ... + ${n}?`, n * (n + 1) / 2, ["Use the formula the induction proved.", "Replace n with the number and compute.", "Example: for n = 6: 6 x 7 / 2 = 21. Now do yours."]);
    if (f === 1) return num(`By induction, the sum of the first n odd numbers is n x n. What is 1 + 3 + 5 + ... for the first ${n} odd numbers?`, n * n, ["Use the result that induction proved.", "The sum of the first n odd numbers is a perfect square.", "Example: the first 4 odd numbers 1 + 3 + 5 + 7 = 16. Now do yours."]);
    if (f === 2) return num(`By induction, 1² + 2² + ... + n² = n(n+1)(2n+1)/6. What is 1² + 2² + ... + ${n}²?`, n * (n + 1) * (2 * n + 1) / 6, ["Use the proven formula.", "Compute n, n + 1 and 2n + 1, multiply, then divide by 6.", "Example: n = 3: 3 x 4 x 7 / 6 = 14 (1 + 4 + 9). Now do yours."]);
    const I = [
      ["1 + 2 + ... + k = k(k+1)/2", "k + 1", ["k", "k(k+1)", "2k + 1"]],
      ["1 + 3 + ... + (2k - 1) = k²", "2k + 1", ["2k - 1", "k + 1", "k²"]],
      ["1 + 2 + 4 + ... + 2^(k-1) = 2^k - 1", "2^k", ["2^(k-1)", "2^(k+1)", "k + 1"]],
      ["1² + ... + k² = k(k+1)(2k+1)/6", "(k + 1)²", ["k²", "k + 1", "2(k + 1)"]]
    ], [stm, add, wr] = pick(I);
    return mc(`The inductive step assumes: ${stm}. To prove it for k + 1, what new term is added to the left side?`, add, wr, ["The left side is a sum. Going from k to k + 1 adds exactly one more term.", "Look at the pattern of the terms: what would the next one be after the term for k?", "Example: for 1 + 2 + ... + k, the new term for k + 1 is k + 1, so the step adds one more number. Now do yours (look at the pattern given)."]);
  };
  const recQ = () => {
    const f = ri(0, 4); let d, ans;
    if (f === 0) { const a = ri(1, 5), dd = ri(2, 6), n = ri(4, 10); ans = a + (n - 1) * dd; d = [`T(1) = ${a}`, `T(n) = T(n - 1) + ${dd}`, `Find T(${n})`]; }
    else if (f === 1) { const n = ri(3, 8); ans = 2 ** n - 1; d = ["T(1) = 1", "T(n) = 2 x T(n - 1) + 1", `Find T(${n})`]; }
    else if (f === 2) { const k = ri(2, 6), n = 2 ** k; ans = n * k; d = ["T(1) = 0", "T(n) = 2 x T(n / 2) + n", `Find T(${n})`]; }
    else if (f === 3) { const k = ri(2, 8), n = 2 ** k; ans = k + 1; d = ["T(1) = 1", "T(n) = T(n / 2) + 1", `Find T(${n})`]; }
    else { const b = ri(0, 4), n = ri(3, 9); ans = b + n * (n + 1) / 2; d = [`T(0) = ${b}`, "T(n) = T(n - 1) + n", `Find T(${n})`]; }
    return num("Solve this recurrence by expanding it step by step.", ans, ["Start from the smallest value you are given and build up one step at a time.", "Compute T for each next input using the rule. For halving rules, go 1, 2, 4, 8, ...", "Example: T(1) = 2, T(n) = T(n - 1) + 3 gives T(2) = 5, T(3) = 8, T(4) = 11. Now do yours."], code(d));
  };
  const lg = (a, b) => { let k = 0, x = 1; while (x < a) { x *= b; k++; } return x === a ? k : -1; };
  const masterQ = () => {
    const C = [[1, 2, 0], [2, 2, 1], [4, 2, 1], [2, 2, 2], [8, 2, 2], [3, 3, 1], [9, 3, 1], [1, 2, 1], [2, 2, 0], [4, 2, 2], [8, 2, 1], [9, 3, 3]];
    const [a, b, d] = pick(C), e = lg(a, b);
    let r;
    if (d > e) r = nPow(d); else if (d === e) r = d === 0 ? "log n" : nPow(d) + " log n"; else r = nPow(e);
    const T = x => `Θ(${x})`;
    const wr = [nPow(d), nPow(e), nPow(e) + " log n", nPow(d) + " log n", nPow(Math.max(d, e) + 1)].filter(x => x !== r).map(T);
    return mc(`Using the master theorem, solve T(n) = ${a} T(n / ${b}) + n^${d}  (with n^0 = 1).`, T(r), wr, ["Compare the work at the leaves with the work spent splitting at the top.", `Compute the leaf exponent: the power x so that ${b}^x = ${a}. Compare it with ${d}. If bigger, leaves win; equal, add a log n; smaller, the top wins.`, "Example: T(n) = 4 T(n/2) + n: the leaf exponent is 2, which beats 1, so the answer is Θ(n^2). Now do yours."]);
  };
  const GR = [["log n", 1], ["n", 2], ["n log n", 3], ["n^2", 4], ["n^3", 5], ["2^n", 6], ["n!", 7]];
  const asymQ = () => {
    const f = ri(0, 2);
    if (f === 0) { const s = shuf(GR).slice(0, ri(3, 4)); const hi = Math.random() < 0.7; const sorted = [...s].sort((x, y) => hi ? y[1] - x[1] : x[1] - y[1]); return mc(`Which function grows ${hi ? "fastest" : "slowest"} as n gets large?`, sorted[0][0], sorted.slice(1).map(x => x[0]), ["Imagine n = 1000 or more. Which one explodes, and which one barely moves?", "The order from slowest to fastest is: log n, n, n log n, n^2, n^3, 2^n, n!.", "Example: between n and n^2, the square grows faster once n is big. Now do yours."]); }
    if (f === 1) { const x = pick(GR), y = pick(GR); return yn(`Is ${x[0]} in O(${y[0]})? (Does it grow no faster than ${y[0]}?)`, x[1] <= y[1], ["O(g) is an upper bound: the function must grow no faster than g.", "Use the order from slowest to fastest: log n, n, n log n, n^2, n^3, 2^n, n!. Compare their places.", "Example: n is in O(n^2) (yes), but n^2 is not in O(n) (no). Now do yours."]); }
    const p = ri(1, 4), r = ri(1, 5), a = ri(2, 9), b = ri(2, 9);
    return yn(`Is f(n) = ${a}n^${p} + ${b}n in O(n^${r})?`, r >= p, ["Big-O ignores constants and keeps only the fastest-growing term.", "Find the highest power in f and compare it with the power inside O(...). O(n^r) works when r is at least that power.", "Example: 5n^3 + n is in O(n^4) (yes) but not in O(n^2) (no). Now do yours."]);
  };
  const INV = [
    ["A loop invariant is a statement that is...", "true before the loop and after every pass", ["true only at the very end", "false at the start and true later", "about the speed of the loop"], "It must hold again and again as the loop runs."],
    ["To prove a loop correct, which three things do you show?", "initialization, maintenance and termination", ["compilation, linking and running", "input, output and storage", "start, middle and a guess"], "Think: true at the start, stays true each pass, and the loop eventually stops."],
    ["A precondition of a function is...", "what must be true before the function is called", ["what is true after it returns", "the name of the function", "the time it takes"], "'Pre' means before."],
    ["A postcondition of a function is...", "what is guaranteed to be true after it returns", ["what the caller must provide", "how many lines it has", "its hidden variables"], "'Post' means after."],
    ["Binary search has the precondition that the list must be...", "sorted", ["short", "all positive", "stored in a file"], "Why can you throw away half after one comparison?"],
    ["Why must a loop make progress toward its end?", "otherwise it may never terminate", ["to save memory", "to make it print more", "so that its variables get names"], "A loop that never changes what it checks can run forever."],
    ["Partial correctness means...", "if the program stops, the answer is right", ["it always stops", "it is right for half of the inputs", "it is fast"], "It does not promise that the program ends."],
    ["Total correctness is partial correctness plus...", "a proof that the program always terminates", ["extra comments", "a faster algorithm", "more tests"], "Add the guarantee that is missing from partial correctness."],
    ["In a selection sort, after k passes the invariant says the first k items are...", "the k smallest items, in order", ["the k largest, in any order", "untouched", "all equal"], "Each pass puts the next smallest item in place."],
    ["Does passing many tests prove an algorithm correct?", "no, tests can only show bugs, a proof covers all inputs", ["yes, if there are at least 100 tests", "yes, if it runs fast", "only if the code is short"], "Can a test list include every possible input?"]
  ];
  const invQ = facts(INV, "Think about what must be true for a loop or function to be trusted.", "Example: before a loop, the invariant 'sum holds the total so far' is true because sum starts at 0.");
  const relQ = () => {
    const n = ri(3, 4), el = Array.from({ length: n }, (_, i) => i + 1);
    const mode = ri(0, 3); let rel = [];
    const has = (a, b) => rel.some(p => p[0] === a && p[1] === b);
    const add = (a, b) => { if (!has(a, b)) rel.push([a, b]); };
    if (mode === 0) { el.forEach(a => add(a, a)); for (let i = 0; i < ri(1, 3); i++) { const a = pick(el), b = pick(el); add(a, b); add(b, a); } }
    else if (mode === 1) { for (let i = 0; i < ri(2, 4); i++) { const a = pick(el), b = pick(el); add(a, b); add(b, a); } }
    else if (mode === 2) { for (let i = 0; i < ri(2, 3); i++) add(pick(el), pick(el)); el.forEach(a => add(a, a)); }
    else { for (let i = 0; i < ri(3, 5); i++) add(pick(el), pick(el)); }
    if (!rel.length) add(1, 2);
    const refl = el.every(a => has(a, a)), symm = rel.every(([a, b]) => has(b, a));
    const trans = rel.every(([a, b]) => rel.every(([c, d]) => b !== c || has(a, d)));
    const prop = pick(["reflexive", "symmetric", "transitive", "an equivalence relation"]);
    const ok = prop === "reflexive" ? refl : prop === "symmetric" ? symm : prop === "transitive" ? trans : refl && symm && trans;
    const clue = { "reflexive": "Reflexive: every element is related to itself, so (1,1), (2,2), ... must all be there.", "symmetric": "Symmetric: for every pair (a, b) the reversed pair (b, a) must be there too.", "transitive": "Transitive: whenever (a, b) and (b, c) are both there, (a, c) must be there too.", "an equivalence relation": "An equivalence relation must be reflexive, symmetric and transitive: check all three." }[prop];
    return yn(`A relation on the set {${el.join(", ")}} has the pairs ${rel.map(p => `(${p[0]},${p[1]})`).join(" ")}. Is it ${prop}?`, ok, ["Check the definition against the list of pairs.", clue, "Example: {(1,1), (2,2)} on {1, 2} is reflexive, symmetric and transitive. Now do yours."]);
  };
  const funcQ = () => {
    const f = ri(0, 3), a = ri(2, 5), b = ri(2, 6);
    if (f === 0) return num(`How many different functions are there from a set with ${a} elements to a set with ${b} elements?`, b ** a, ["Each input needs exactly one output, chosen on its own.", `For every one of the ${a} inputs you have ${b} choices. Multiply the choices.`, "Example: from 2 elements to 3 elements: 3 x 3 = 9 functions. Now do yours."]);
    if (f === 1) { const x = ri(2, 4), y = ri(x, 7); return num(`How many one-to-one (injective) functions are there from a set with ${x} elements to a set with ${y} elements?`, perm(y, x), ["One-to-one means no two inputs share an output.", "The first input has all the outputs to choose from; each next one has one fewer.", "Example: from 2 elements into 4: 4 x 3 = 12 functions. Now do yours."]); }
    if (f === 2) { const x = ri(3, 6), y = ri(2, x - 1); return yn(`Can a function from a ${x}-element set to a ${y}-element set be one-to-one?`, false, ["Think about the pigeonhole principle: how many inputs and outputs are there?", "One-to-one needs a different output for each input. Are there enough outputs?", "Example: 4 inputs and 6 outputs can be one-to-one, but 6 inputs and 4 outputs cannot. Now do yours."]); }
    const n = ri(3, 7);
    return num(`How many bijections (one-to-one and onto) are there from a set with ${n} elements to another set with ${n} elements?`, fact(n), ["A bijection pairs up the elements perfectly.", "Pick the output for the first element, then the next, with fewer choices each time.", "Example: for 3 elements, 3 x 2 x 1 = 6 bijections. Now do yours."]);
  };
  const degQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const e = ri(4, 30); return num(`A graph has ${e} edges. What is the sum of all the vertex degrees?`, 2 * e, ["Each edge touches two vertices.", "So every edge adds 1 to two different degrees.", "Example: 5 edges give a degree sum of 10. Now do yours."]); }
    if (f === 1) { const n = ri(4, 14); return num(`How many edges does the complete graph on ${n} vertices have (every pair joined by one edge)?`, choose(n, 2), ["Every pair of vertices gets one edge.", "Count pairs: n x (n - 1) / 2.", "Example: 5 vertices: 5 x 4 / 2 = 10 edges. Now do yours."]); }
    if (f === 2) { const n = ri(4, 30); return num(`A tree has ${n} vertices. How many edges does it have?`, n - 1, ["A tree is connected with no cycles.", "Adding each new vertex needs exactly one new edge, and the first vertex needs none.", "Example: a tree with 5 vertices has 4 edges. Now do yours."]); }
    const e = ri(3, 12), k = ri(1, 3), deg = Array.from({ length: e }, () => 0); const n = ri(4, 8);
    const ds = Array.from({ length: n - 1 }, () => ri(1, 4)); let s = ds.reduce((x, y) => x + y, 0); const last = s % 2 === 0 ? 2 : 3; ds.push(last); s += last;
    return num(`A graph has ${n} vertices with degrees ${lst(ds)}. How many edges does it have?`, s / 2, ["Add up all the degrees first.", "The degree sum counts every edge twice, so divide the sum by 2.", "Example: degrees [2, 2, 2, 2] sum to 8, so there are 4 edges. Now do yours."]);
  };
  const eulerQ = () => {
    const odd = pick([0, 2, 2, 4, 6]), n = ri(Math.max(4, odd), 8), ds = [];
    for (let i = 0; i < n; i++) ds.push(i < odd ? pick([1, 3, 5]) : pick([2, 4, 6]));
    const sd = shuf(ds);
    if (Math.random() < 0.4) return num(`A connected graph has degrees ${lst(sd)}. How many vertices have an odd degree?`, odd, ["Look at each degree and ask: is it odd or even?", "Count only the odd ones.", "Example: degrees [1, 2, 3, 4] have 2 odd ones. Now do yours."]);
    const r = odd === 0 ? "an Euler circuit" : odd === 2 ? "an Euler path but no circuit" : "neither";
    return mc(`A connected graph has degrees ${lst(sd)}. What kind of walk that uses every edge exactly once must exist?`, r, ["an Euler circuit", "an Euler path but no circuit", "neither"], ["Count the vertices with an odd degree.", "0 odd vertices: a closed circuit. Exactly 2 odd vertices: an open path. Any other number: impossible.", "Example: degrees [2, 2, 4]: no odd vertices, so you can finish where you started. Now do yours."]);
  };
  const pigQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const k = ri(3, 9), n = ri(k + 1, 40); return num(`${n} balls are put into ${k} boxes. At least how many balls must share some box? (the guaranteed minimum for the fullest box)`, Math.ceil(n / k), ["If the balls were spread as evenly as possible, how full would each box be?", "Divide n by k and round up.", "Example: 10 balls in 4 boxes: 10 / 4 = 2.5, round up to 3. Now do yours."]); }
    if (f === 1) { const c = ri(2, 8); return num(`A drawer has socks in ${c} different colors. How many socks must you pull out (without looking) to be sure of a matching pair?`, c + 1, ["Think about the unluckiest draw: every sock a different color.", "After you use up one sock of every color, the next one must match something.", "Example: with 3 colors you may draw 3 different ones, so the 4th makes a pair. Now do yours."]); }
    if (f === 2) { const n = ri(13, 60); return num(`Among ${n} people, at least how many must have a birthday in the same month (12 months)?`, Math.ceil(n / 12), ["The 12 months are the boxes, the people are the balls.", "Divide the number of people by 12 and round up.", "Example: 25 people: 25 / 12 is a bit over 2, so at least 3. Now do yours."]); }
    const s = ri(2, 4), m = ri(2, 4);
    return num(`A deck has ${s} suits. How many cards must you draw to be sure of ${m} cards of the same suit?`, s * (m - 1) + 1, ["Think of the unluckiest draw: you take as many as you can without reaching the target in any suit.", "That is (target - 1) cards in each suit. One more card then forces the target.", "Example: 3 suits and 2 of a kind: you can hold 3 x 1 = 3 cards safely, so the 4th does it. Now do yours."]);
  };
  const A25 = [setsQ, permQ, combQ, pascalQ, truthQ, contraQ, modQ, divQ, indQ, recQ, masterQ, asymQ, invQ, relQ, funcQ, degQ, eulerQ, pigQ];
  const lessons25 = [
    L("Sets and counting", setsQ, [
      S("Union and overlap", "🔵", "|A ∪ B| = |A| + |B| - |A ∩ B|. The items in both sets were counted twice, so subtract them once."),
      S("Power set", "🧺", "A set with n elements has <b>2^n</b> subsets: every element is in or out."),
      S("Pairs", "✖️", "The pairs (x, y) with x from A and y from B number |A| x |B|. This is the <b>product rule</b>.")]),
    L("Permutations", permQ, [
      S("Order matters", "🔢", "Arranging n different things in a row gives <b>n!</b> orders: n x (n-1) x ... x 1."),
      S("Choosing places", "🏁", "Filling k places from n things in order: P(n, k) = n x (n-1) x ... (k numbers)."),
      S("Repeats and circles", "🔁", "Repeated letters: divide by the factorial of each repeat count. Round table: fix one person, then (n-1)!.")]),
    L("Combinations", combQ, [
      S("Order does not matter", "🧮", "Choosing k things from n when order does not matter: <b>C(n, k) = n! / (k! (n-k)!)</b>."),
      S("Pairs", "🤝", "C(n, 2) = n(n-1)/2 counts handshakes between n people."),
      S("Bit strings", "💾", "A length-n bit string with exactly k ones is a choice of which k positions are ones: C(n, k).")]),
    L("Pascal's triangle", pascalQ, [
      S("Add the two above", "🔺", "Each number in <b>Pascal's triangle</b> is the sum of the two above it. Row n lists C(n, 0), C(n, 1), ... C(n, n)."),
      S("Row sums", "➕", "Row n adds up to 2^n, because it counts all subsets of an n-element set by size."),
      S("Even and odd", "⚖️", "Exactly half of all subsets have even size: 2^(n-1) of them.")]),
    L("Truth tables and implication", truthQ, [
      S("Implication", "➡️", "p → q means 'if p then q'. It is false in exactly one case: p true and q false."),
      S("Other operators", "🔣", "∧ is AND, ∨ is OR, ¬ is NOT, ⊕ is exclusive OR (exactly one is true)."),
      S("Rows", "📋", "n variables give 2^n rows. Work out the inside of the brackets first.")]),
    L("Converse and contrapositive", contraQ, [
      S("Four forms", "🔄", "From 'If P then Q': the <b>converse</b> is 'If Q then P'; the <b>inverse</b> is 'If not P then not Q'; the <b>contrapositive</b> is 'If not Q then not P'."),
      S("Which are equal", "⚖️", "A statement and its contrapositive are <b>always</b> equivalent. The converse and inverse can be false even when the original is true."),
      S("Why it matters", "🧩", "Proofs often show the contrapositive instead, which is sometimes much easier.")]),
    L("Modular arithmetic", modQ, [
      S("Same remainder", "🕐", "a ≡ b (mod m) means a and b leave the same remainder when divided by m, or m divides a - b."),
      S("Reduce early", "✂️", "(a x b) mod m = ((a mod m) x (b mod m)) mod m. Reduce after each step so numbers stay small."),
      S("Inverses", "🔁", "x is the inverse of a mod m when (a x x) mod m = 1. Used in cryptography.")]),
    L("Divisors, LCM and Euclid", divQ, [
      S("Counting divisors", "🔍", "If n = p^a x q^b with primes p and q, it has (a+1)(b+1) divisors."),
      S("gcd and lcm", "🔗", "gcd(a, b) x lcm(a, b) = a x b. Find one to get the other."),
      S("Euclid is fast", "⚡", "Replace (a, b) with (b, a mod b) until b = 0. The number of steps grows only like log of the numbers.")]),
    L("Proof by induction", indQ, [
      S("Dominoes", "🁢", "Show the <b>base case</b> (the first domino falls). Show the <b>inductive step</b>: if domino k falls, domino k + 1 falls. Then all fall."),
      S("The step", "🪜", "Assume the formula for k, add the next term, and show it equals the formula for k + 1."),
      S("Famous results", "📐", "1 + ... + n = n(n+1)/2; the first n odd numbers sum to n²; 1 + 2 + 4 + ... + 2^(n-1) = 2^n - 1.")]),
    L("Solving recurrences", recQ, [
      S("A rule that calls itself", "🌀", "A <b>recurrence</b> gives T(n) in terms of smaller values, like T(n) = T(n-1) + c."),
      S("Expand it", "📖", "Write T(n), T(n-1), T(n-2) ... until you reach the base case, then add the pieces up."),
      S("Common answers", "📈", "T(n-1) + c grows like n. T(n/2) + 1 grows like log n. 2T(n/2) + n grows like n log n. 2T(n-1) + 1 doubles each time.")]),
    L("The master theorem", masterQ, [
      S("The shape", "🌳", "Divide-and-conquer costs often look like T(n) = a T(n/b) + n^d: a subproblems, each 1/b the size, plus n^d work to split and join."),
      S("Compare", "⚖️", "Let e be the power with b^e = a. If d &lt; e, answer Θ(n^e). If d = e, answer Θ(n^d log n). If d &gt; e, answer Θ(n^d)."),
      S("Examples", "🧪", "Merge sort: a = 2, b = 2, d = 1, so Θ(n log n). Binary search: a = 1, b = 2, d = 0, so Θ(log n).")]),
    L("Order of growth", asymQ, [
      S("The ladder", "🪜", "From slow to fast: <b>log n, n, n log n, n², n³, 2ⁿ, n!</b>."),
      S("O, upper bound", "⬆️", "f is in O(g) when f grows no faster than g (up to a constant). Keep only the biggest term."),
      S("Be careful", "⚠️", "3n² + 5n is in O(n²), and also in O(n³), because O only gives an upper bound.")]),
    L("Correctness and invariants", invQ, [
      S("Pre and post", "📜", "A <b>precondition</b> is true before a function runs. A <b>postcondition</b> is guaranteed after it returns."),
      S("Loop invariants", "🔒", "An <b>invariant</b> is true before the loop, stays true after each pass, and at the end it helps prove the answer is right."),
      S("Partial and total", "✅", "<b>Partial</b> correctness: if it stops, the answer is right. <b>Total</b> correctness also proves it stops.")]),
    L("Relations", relQ, [
      S("Pairs", "🔗", "A <b>relation</b> on a set is a set of ordered pairs (a, b), meaning 'a is related to b'."),
      S("Three properties", "✔️", "<b>Reflexive</b>: every (a, a) is there. <b>Symmetric</b>: (a, b) forces (b, a). <b>Transitive</b>: (a, b) and (b, c) force (a, c)."),
      S("Equivalence", "🟰", "A relation with all three is an <b>equivalence relation</b>. It splits the set into groups of 'same' things.")]),
    L("Counting functions", funcQ, [
      S("Every input, one output", "🎯", "A function from set A to set B gives each element of A exactly one element of B. That is |B|^|A| functions."),
      S("One-to-one", "1️⃣", "<b>Injective</b> means no two inputs share an output. It needs |B| at least |A|, and there are P(|B|, |A|) of them."),
      S("Onto and bijective", "🔀", "<b>Onto</b> hits every output. A <b>bijection</b> is both, with n! of them between two n-element sets.")]),
    L("Degrees and edges", degQ, [
      S("Handshake lemma", "🤝", "The sum of all degrees equals twice the number of edges. So the number of odd-degree vertices is always even."),
      S("Special graphs", "🕸️", "A complete graph on n vertices has n(n-1)/2 edges. A tree on n vertices has n - 1 edges."),
      S("Use it", "🔧", "Given the degrees, add them up and divide by 2 to count edges.")]),
    L("Euler paths", eulerQ, [
      S("Walk every edge once", "🚶", "An <b>Euler circuit</b> uses every edge exactly once and returns to the start. An <b>Euler path</b> uses every edge once but may end elsewhere."),
      S("The degree test", "🔢", "For a connected graph: 0 odd-degree vertices means a circuit; exactly 2 means a path; anything else means neither."),
      S("History", "🌉", "Euler used this idea in 1736 to show a famous bridge walk in Königsberg was impossible.")]),
    L("The pigeonhole principle", pigQ, [
      S("More than holes", "🕊️", "Put n pigeons in k holes. If n &gt; k, some hole holds at least 2."),
      S("Stronger form", "📦", "Some hole holds at least <b>ceil(n / k)</b> pigeons."),
      S("Unluckiest draw", "🍀", "To force a result, imagine the worst luck: take as many as you can without succeeding, then one more.")]),
    L("Mixed practice", mix(...A25), MIXS("counting (permutations and combinations), logic, modular arithmetic, induction, recurrences, growth rates and graph facts.")),
    L("Level 25 Challenge", mix(...A25, ...A25), MIXS("everything from level 25: discrete math for computing and algorithm analysis."))
  ];

  // ======================= LEVEL 26 =======================
  const FLT = [
    ["How many bits does a standard double-precision float use in total?", "64", ["32", "16", "128"], "Single precision uses half as many bits as this format."],
    ["In a 64-bit double, how many bits hold the exponent?", "11", ["8", "23", "52"], "The 64 bits are one sign bit, a short exponent field and a long fraction field."],
    ["In a 64-bit double, how many bits hold the fraction (mantissa)?", "52", ["11", "23", "63"], "It is the largest of the three fields."],
    ["How many bits does a single-precision float (float32) use?", "32", ["16", "64", "8"], "Its name says single, as opposed to double."],
    ["Why does 0.1 + 0.2 not give exactly 0.3 in most languages?", "0.1 and 0.2 cannot be stored exactly in binary", ["the CPU cannot add decimals", "the computer rounds every number to a whole", "the numbers are too large"], "Think about which decimal fractions are exact in base 2."],
    ["What is the safest way to test whether two floats are 'equal'?", "check that they differ by less than a tiny tolerance", ["use == and hope", "convert both to text first", "compare only the sign bits"], "Rounding errors can leave tiny differences."],
    ["Which of these can a binary float store exactly?", "0.75", ["0.1", "0.3", "0.7"], "Exact values are sums of powers of two such as halves, quarters and eighths."],
    ["What does the sign bit of a float tell you?", "whether the number is positive or negative", ["how large the exponent is", "whether it has a fraction", "how many digits it has"], "Only one bit is used, so it can only answer a yes/no question."],
    ["Why should money be stored as whole cents in integers, not floats?", "floats can make small rounding errors", ["integers are slower", "floats cannot be positive", "cents are shorter to type"], "Think back to 0.1 + 0.2."],
    ["Adding a tiny number to a very large float can...", "leave the large number unchanged because of rounding", ["crash the program", "make the number negative", "double the large number"], "A float only keeps a fixed number of significant bits."]
  ];
  const floatQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const e = ri(4, 11), m = ri(3, 23); return num(`A custom float format has 1 sign bit, ${e} exponent bits and ${m} fraction bits. How many bits is it in total?`, 1 + e + m, ["Add the three fields together.", "One bit for the sign, plus the exponent bits, plus the fraction bits.", "Example: 1 + 5 + 10 = 16 bits (that is a half-precision float). Now do yours."]); }
    if (f === 1) { const b = ri(4, 10); return num(`A format uses ${b} bits in total. How many different bit patterns does it have?`, 2 ** b, ["Every bit can be 0 or 1.", "Multiply 2 by itself once for each bit.", "Example: 3 bits give 8 patterns. Now do yours."]); }
    const [q, r, w, c] = pick(FLT);
    return { text: q, choices: strChoices(r, w), answer: r, hints: ["Think about how binary floating point stores a number: sign, exponent and fraction.", c, "Example: a bit pattern has only finitely many values, so most real numbers must be rounded to the nearest one. Now do yours."] };
  };
  const cacheQ = () => {
    const sz = pick([4, 8]), pool = uniq(ri(3, 5), 0, 20), seq = Array.from({ length: ri(8, 10) }, () => pick(pool));
    const line = Array(sz).fill(-1); let hits = 0;
    for (const a of seq) { const i = a % sz; if (line[i] === a) hits++; else line[i] = a; }
    const f = ri(0, 2);
    if (f === 0) return num(`A direct-mapped cache has ${sz} lines. A block address goes to line (address mod ${sz}). The program reads the blocks ${seq.join(", ")} in order, starting with an empty cache. How many are hits?`, hits, ["Keep a table of what each line holds right now.", "For each read: find the line with mod. If that line already holds the same address it is a hit; otherwise it is a miss and the line now holds the new address.", "Example: 2 lines, reads 1, 3, 1: all go to line 1, so 1 miss, then 3 replaces 1 (miss), then 1 replaces 3 (miss): 0 hits. Now do yours."]);
    if (f === 1) return num(`A direct-mapped cache has ${sz} lines (line = address mod ${sz}) and starts empty. The reads are ${seq.join(", ")}. How many are misses?`, seq.length - hits, ["Keep a table of what each line holds.", "A read is a miss when its line is empty or holds a different address; the new address then replaces it.", "Example: 2 lines, reads 0, 2, 0 all go to line 0: 3 misses. Now do yours."]);
    const a = ri(8, 60);
    return num(`A direct-mapped cache has ${sz} lines. Which line number (0 to ${sz - 1}) does block address ${a} go to?`, a % sz, ["The line is chosen by the remainder after dividing.", `Divide the address by ${sz} and look at the remainder.`, "Example: address 13 with 4 lines: 13 mod 4 = 1. Now do yours."]);
  };
  const LOC = [
    ["The order from fastest to slowest memory is usually:", "registers, cache, RAM, disk", ["disk, RAM, cache, registers", "RAM, registers, disk, cache", "cache, disk, registers, RAM"], "The closer to the CPU, the faster and the smaller."],
    ["Reading array items one after another uses which kind of locality?", "spatial locality", ["temporal locality", "recursive locality", "no locality"], "The items are stored next to each other in memory."],
    ["Using the same variable again and again soon after the first use is...", "temporal locality", ["spatial locality", "random access", "lazy loading"], "Think about time: the same thing again soon."],
    ["Why does a cache make programs faster?", "programs tend to reuse nearby or recent data", ["it holds more data than RAM", "it makes the CPU clock faster", "it compresses the code"], "It bets on a habit that programs have."],
    ["An array is stored row by row (row-major). Which loop order is usually faster?", "go along each row in the inner loop", ["go down each column in the inner loop", "both are exactly equal", "jump to random places"], "You want the items you read next to be neighbors in memory."],
    ["What is a cache line (or block)?", "a small chunk of memory loaded together", ["one bit of storage", "a wire to the disk", "the name of a variable"], "The cache loads more than just the single byte you asked for."],
    ["Which is the largest but slowest storage?", "hard drive or SSD", ["registers", "L1 cache", "the program counter"], "Think about capacity versus speed."],
    ["What happens on a cache miss?", "the data is fetched from the slower level below", ["the program stops with an error", "the data is deleted", "the cache doubles its size"], "The cache did not have it, so someone else must."],
    ["Which of these is volatile (loses its data when power is off)?", "RAM", ["SSD", "hard drive", "a USB stick"], "Storage that stays after shutdown is not volatile."],
    ["Why are registers the fastest storage?", "they sit inside the CPU itself", ["they are the biggest", "they are made of paper", "they are on the network"], "Distance matters for speed."]
  ];
  const locQ = facts(LOC, "Think about speed, size and distance from the CPU.", "Example: L1 cache is tiny and very fast, RAM is bigger and slower, disks are the biggest and slowest.");
  const pipeQ = () => {
    const k = ri(3, 6), n = ri(4, 20), f = ri(0, 3), s = ri(1, 4);
    if (f === 0) return num(`A pipeline has ${k} stages and each stage takes 1 cycle. With no stalls, how many cycles to finish ${n} instructions?`, k + n - 1, ["The first instruction needs every stage. After that, one instruction finishes per cycle.", "Total = stages + (instructions - 1).", "Example: 4 stages and 6 instructions: 4 + 5 = 9 cycles. Now do yours."]);
    if (f === 1) return num(`Without a pipeline, each of ${n} instructions takes all ${k} cycles one after another. How many cycles in total?`, k * n, ["Each instruction uses the whole datapath before the next begins.", "Multiply cycles per instruction by the number of instructions.", "Example: 3 cycles each and 5 instructions: 15 cycles. Now do yours."]);
    if (f === 2) return num(`A ${k}-stage pipeline runs ${n} instructions, but a hazard causes ${s} stall cycle${s > 1 ? "s" : ""} in total. How many cycles in all?`, k + n - 1 + s, ["First find the ideal pipelined time.", "A stall wastes cycles, so add them to the ideal time.", "Example: ideal 9 cycles plus 2 stalls is 11 cycles. Now do yours."]);
    return num(`How many cycles does the pipeline save? A ${k}-stage pipeline runs ${n} instructions (no stalls), compared with running them one at a time without a pipeline.`, k * n - (k + n - 1), ["Compute the time for each method.", "Unpipelined time is stages x instructions. Pipelined time is stages + instructions - 1. Subtract.", "Example: 4 stages, 6 instructions: 24 - 9 = 15 cycles saved. Now do yours."]);
  };
  const cpuQ = () => {
    const f = ri(0, 2), g = pick([1, 2, 4]);
    if (f === 0) { const I = g * ri(1, 6), c = ri(1, 5); return num(`A program runs ${I} billion instructions at an average of ${c} cycles per instruction on a ${g} GHz CPU (${g} billion cycles per second). How many seconds does it take?`, I * c / g, ["Time = number of cycles divided by cycles per second.", "First find the total cycles: instructions x cycles per instruction.", "Example: 6 billion instructions, 2 cycles each, 3 GHz: 12 billion cycles / 3 billion per second = 4 seconds. Now do yours."]); }
    if (f === 1) { const mhz = pick([1000, 2000, 3000, 4000]), c = pick([1, 2, 4, 5]); return num(`A CPU runs at ${mhz} MHz with an average of ${c} cycle${c > 1 ? "s" : ""} per instruction. How many million instructions per second (MIPS) can it execute?`, mhz / c, ["Each instruction needs several cycles.", "Divide the cycles per second (in millions) by the cycles per instruction.", "Example: 1200 MHz and 3 cycles per instruction gives 400 MIPS. Now do yours."]); }
    const I = g * ri(1, 4), c = ri(1, 5), T = I * c / g;
    return num(`A program of ${I} billion instructions takes ${T} seconds on a ${g} GHz CPU. What is the average cycles per instruction (CPI)?`, c, ["First work out how many cycles the CPU ran in total.", "Total cycles = seconds x cycles per second. Then divide by the number of instructions.", "Example: 4 billion instructions, 6 seconds on a 2 GHz CPU: 12 billion cycles / 4 billion = 3 CPI. Now do yours."]);
  };
  const addrQ = () => {
    const f = ri(0, 2), base = ri(1, 9) * 100, size = pick([2, 4, 8]);
    if (f === 0) { const i = ri(3, 20); return num(`An array starts at memory address ${base}. Each item takes ${size} bytes. At what address is the item with index ${i} (the first item is index 0)?`, base + i * size, ["Index 0 sits at the start. Each index moves forward by the item size.", "address = start + index x size", `Example: start 200, size 4, index 5: 200 + 5 x 4 = 220. Now do yours.`]); }
    const C = ri(3, 8), r = ri(1, 6), c = ri(0, C - 1);
    if (f === 1) return num(`A 2D array is stored row by row (row-major) with ${C} columns. Rows and columns are numbered from 0. What is the position in the flat list of item [${r}][${c}]?`, r * C + c, ["Each full row before yours takes up one whole row of items.", "position = row x columns + column", "Example: 5 columns, item [2][3]: 2 x 5 + 3 = 13. Now do yours."]);
    return num(`A 2D array of ${C} columns is stored row-major starting at address ${base}, with ${size} bytes per item. What is the address of item [${r}][${c}]?`, base + (r * C + c) * size, ["First find the position of the item in the flat list.", "position = row x columns + column, then address = start + position x item size", `Example: start 100, 4 columns, size 2, item [1][2]: position 6, address 100 + 12 = 112. Now do yours.`]);
  };
  const bitsQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const u = pick(["KB", "MB", "GB"]), k = ri(0, 7), size = 2 ** k, base = { KB: 10, MB: 20, GB: 30 }[u]; return num(`A byte-addressable memory has ${size} ${u}. (1 KB = 2^10 bytes, 1 MB = 2^20, 1 GB = 2^30.) How many address bits are needed?`, base + k, ["Write the size as a power of two in bytes.", "The number of address bits is the power of two.", "Example: 4 KB = 2^2 x 2^10 = 2^12 bytes, so 12 bits. Now do yours."]); }
    if (f === 1) { const n = ri(10, 19); return num(`A byte-addressable computer has ${n}-bit addresses. How many KB of memory can it address? (1 KB = 1024 bytes)`, 2 ** (n - 10), ["The number of addresses is 2 to the power of the number of bits.", "Each KB is 2^10 bytes, so remove 10 from the exponent.", "Example: 14 bits gives 2^14 bytes = 2^4 KB = 16 KB. Now do yours."]); }
    if (f === 2) { const k = ri(8, 13); return num(`A page is ${2 ** k} bytes. How many bits are needed for the offset inside a page?`, k, ["The offset must be able to count every byte in the page.", "Find the power of two that equals the page size.", "Example: a 1024-byte page needs 10 offset bits. Now do yours."]); }
    const a = ri(4, 10), b = ri(1, 3);
    return num(`A computer has ${2 ** a} KB of memory split into pages of ${2 ** b} KB. How many pages (frames) is that?`, 2 ** (a - b), ["Divide the memory size by the page size.", "Both are powers of two, so subtract the exponents.", "Example: 64 KB with 4 KB pages: 16 frames. Now do yours."]);
  };
  const adderQ = () => {
    const f = ri(0, 2);
    if (f === 0 || f === 1) {
      const a = ri(0, 1), b = ri(0, 1), c = f === 1 ? ri(0, 1) : 0, t = a + b + c;
      const right = `sum ${t % 2}, carry ${t >> 1}`;
      return mc(f === 0 ? `A half adder adds two bits A = ${a} and B = ${b}. What does it output?` : `A full adder adds A = ${a}, B = ${b} and carry-in = ${c}. What does it output?`, right, ["sum 0, carry 0", "sum 1, carry 0", "sum 0, carry 1", "sum 1, carry 1"].filter(x => x !== right), ["Add the bits as ordinary numbers first.", "The sum bit is the total mod 2, and the carry is whether the total reached 2 or more.", "Example: A = 1, B = 1, carry-in = 1: total 3 = binary 11, so sum 1, carry 1. Now do yours."]);
    }
    const a = ri(1, 14), b = ri(1, 15 - 0), s = a + b, bin = x => x.toString(2).padStart(4, "0");
    return mc(`Add these binary numbers: ${bin(a)} + ${bin(b)}. What is the result in binary?`, s.toString(2), [(s + 1).toString(2), (s > 1 ? s - 1 : s + 2).toString(2), (a | b).toString(2)], ["Add from the right, one column at a time, and carry when a column reaches 2.", "Or convert both numbers to ordinary numbers, add them, and convert back.", "Example: 0011 + 0101 = 3 + 5 = 8 = 1000. Now do yours."]);
  };
  const BX = [
    ["NOT (A AND B)", (a, b, c) => !(a && b), "(NOT A) OR (NOT B)", (a, b, c) => !a || !b],
    ["NOT (A OR B)", (a, b, c) => !(a || b), "(NOT A) OR (NOT B)", (a, b, c) => !a || !b],
    ["NOT (A OR B)", (a, b, c) => !(a || b), "(NOT A) AND (NOT B)", (a, b, c) => !a && !b],
    ["A AND (B OR C)", (a, b, c) => a && (b || c), "(A AND B) OR (A AND C)", (a, b, c) => (a && b) || (a && c)],
    ["A OR (B AND C)", (a, b, c) => a || (b && c), "(A OR B) AND C", (a, b, c) => (a || b) && c],
    ["A OR (B AND C)", (a, b, c) => a || (b && c), "(A OR B) AND (A OR C)", (a, b, c) => (a || b) && (a || c)],
    ["A AND (A OR B)", (a, b, c) => a && (a || b), "A", (a, b, c) => a],
    ["A OR ((NOT A) AND B)", (a, b, c) => a || (!a && b), "A OR B", (a, b, c) => a || b],
    ["A XOR B", (a, b, c) => a !== b, "(A OR B) AND NOT (A AND B)", (a, b, c) => (a || b) && !(a && b)],
    ["A XOR A", (a, b, c) => a !== a, "A", (a, b, c) => a],
    ["NOT (NOT A)", (a, b, c) => !(!a), "A", (a, b, c) => a],
    ["A AND B", (a, b, c) => a && b, "NOT ((NOT A) AND (NOT B))", (a, b, c) => !(!a && !b)]
  ];
  const boolQ = () => {
    const it = pick(BX);
    if (Math.random() < 0.65) {
      let eq = true; for (let i = 0; i < 8; i++) { const a = !!(i & 4), b = !!(i & 2), c = !!(i & 1); if (it[1](a, b, c) !== it[3](a, b, c)) eq = false; }
      return yn(`Do these two expressions give the same output for every input?  (1) ${it[0]}   (2) ${it[2]}`, eq, ["Test every combination of the inputs, or use a law you know.", "Useful laws: De Morgan (NOT flips AND with OR), distribution, and absorption (A AND (A OR B) = A). Check the exact form carefully.", "Example: NOT (A AND B) and NOT A AND NOT B differ when A = 1, B = 0. Now do yours."]);
    }
    let cnt = 0; for (let i = 0; i < 8; i++) if (it[1](!!(i & 4), !!(i & 2), !!(i & 1))) cnt++;
    return num(`In how many of the 8 input combinations of A, B and C is  ${it[0]}  true?`, cnt, ["Go through all 8 rows: A, B, C from 000 to 111.", "Count the rows where the whole expression comes out true. A variable the expression does not use still doubles the rows.", "Example: A AND B is true when A = B = 1; with C free that is 2 rows out of 8. Now do yours."]);
  };
  const ptQ = () => {
    const f = ri(0, 3), off = pick([10, 12, 13]);
    if (f === 0) { const vb = ri(16, 32); return num(`A virtual address has ${vb} bits and a page is 2^${off} bytes. How many bits make up the page number?`, vb - off, ["The address is split into a page number and an offset.", "The offset takes some bits; the rest is the page number.", "Example: 32-bit address, 12-bit offset: 20 bits for the page number. Now do yours."]); }
    if (f === 1) { const vb = ri(off + 2, off + 7); return num(`A virtual address has ${vb} bits and a page is 2^${off} bytes. How many entries does a single-level page table have?`, 2 ** (vb - off), ["There is one entry for every possible virtual page.", "Find the page-number bits, then raise 2 to that power.", "Example: 16-bit address, 12-bit offset: 4 page bits, 16 entries. Now do yours."]); }
    if (f === 2) { const vb = ri(off + 2, off + 6), e = pick([2, 4, 8]); return num(`A virtual address has ${vb} bits and a page is 2^${off} bytes. Each page-table entry takes ${e} bytes. How many bytes is the whole page table?`, 2 ** (vb - off) * e, ["First count the entries.", "Entries = 2 to the power of the page-number bits. Multiply by the entry size.", "Example: 8 entries of 4 bytes is 32 bytes. Now do yours."]); }
    const a = ri(6, 10), b = pick([1, 2, 3]);
    return num(`Physical memory is ${2 ** a} KB and each frame is ${2 ** b} KB. How many frames does the page table have to be able to point to?`, 2 ** (a - b), ["Divide the memory size by the frame size.", "With powers of two, subtract the exponents.", "Example: 32 KB and 4 KB frames: 8 frames. Now do yours."]);
  };
  const fsQ = () => {
    const f = ri(0, 3), blk = pick([2, 4, 8]), size = ri(5, 100), blocks = Math.ceil(size / blk);
    if (f === 0) return num(`A file is ${size} KB and the file system uses ${blk} KB blocks. How many blocks does the file use?`, blocks, ["Files are stored in whole blocks.", "Divide the file size by the block size, then round up.", "Example: 10 KB with 4 KB blocks: 10 / 4 = 2.5, so 3 blocks. Now do yours."]);
    if (f === 1) return num(`A file is ${size} KB and the file system uses ${blk} KB blocks. How many KB are wasted in the last block (internal fragmentation)?`, blocks * blk - size, ["Count how many blocks are used and how much space they offer in total.", "Space reserved minus the file size is the waste.", "Example: 10 KB in 4 KB blocks: 3 blocks = 12 KB, waste 2 KB. Now do yours."]);
    if (f === 2) { const p = ri(8, 12); return num(`An inode has ${p} direct pointers and each points to one ${blk} KB block. How many KB can a file hold using only direct pointers?`, p * blk, ["Each pointer reaches one block.", "Multiply the number of pointers by the block size.", "Example: 10 pointers and 4 KB blocks: 40 KB. Now do yours."]); }
    const n = ri(3, 12), s2 = ri(1, 9);
    return num(`${n} small files each of ${s2} KB are saved with ${blk} KB blocks, and a block belongs to only one file. How many blocks are used in all?`, n * Math.ceil(s2 / blk), ["Work out the blocks for one file first.", "Each file needs whole blocks. Multiply by the number of files.", "Example: 5 files of 3 KB with 4 KB blocks: 1 block each, 5 blocks. Now do yours."]);
  };
  const semQ = () => {
    const v0 = ri(0, 3), n = ri(5, 8), ops = Array.from({ length: n }, () => Math.random() < 0.55 ? "P" : "V");
    let sem = v0, blocked = 0;
    for (const o of ops) { if (o === "P") { if (sem > 0) sem--; else blocked++; } else { if (blocked > 0) blocked--; else sem++; } }
    const f = ri(0, 1);
    const rules = "P (wait) lowers the value by 1 if it is above 0, otherwise the process waits. V (signal) wakes one waiting process if there is one, otherwise raises the value by 1.";
    return num(`A semaphore starts at ${v0}. These operations happen in order: ${ops.join(" ")}. ${rules} ${f === 0 ? "What is the semaphore value at the end?" : "How many processes are still waiting at the end?"}`, f === 0 ? sem : blocked, ["Keep two numbers as you go: the semaphore value and the number of waiting processes.", "Follow the rules for each operation in turn. A V first wakes a waiting process, if there is one.", "Example: start 1, operations P P V: P makes it 0, the second P waits, V wakes it. The value stays 0 and nobody waits. Now do yours."]);
  };
  const KER = [
    ["Which mode can run any CPU instruction and reach all hardware?", "kernel mode", ["user mode", "safe mode", "sleep mode"], "Only the most trusted code gets full power."],
    ["A program asks the operating system to open a file. This request is called a...", "system call", ["software patch", "boot loader", "compiler flag"], "It is the doorway from user programs into the kernel."],
    ["What is an interrupt?", "a signal that makes the CPU stop and handle an event", ["a program that never stops", "a type of memory", "a bug in a loop"], "Keyboard presses and timers use them."],
    ["What happens in a context switch?", "the OS saves one process's state and loads another's", ["the screen changes color", "the program gets deleted", "the disk is formatted"], "Think of sharing one CPU between many processes."],
    ["Which of these is NOT a typical job of an operating system?", "writing your homework", ["scheduling processes", "managing memory", "handling files"], "Look for the one that is not about managing the computer."],
    ["In Unix-like systems, which call creates a new process by copying the current one?", "fork", ["print", "join", "open"], "It splits one process into two."],
    ["A process waiting for disk data is usually in which state?", "blocked (waiting)", ["running", "finished", "deleted"], "It cannot continue until something outside happens."],
    ["What does a device driver do?", "lets the OS talk to a particular hardware device", ["draws pictures on the web", "compresses the files", "checks spelling"], "Hardware speaks its own language."],
    ["Why do user programs run in user mode?", "so one buggy program cannot damage the system", ["so they run faster", "so they use less disk", "so they can skip the compiler"], "It is about protection."],
    ["What is a file descriptor?", "a small number that stands for an open file", ["the size of a file", "a file's password", "the color of an icon"], "Programs hold on to it after calling open."]
  ];
  const kernQ = facts(KER, "Think about how the operating system shares and protects the computer.", "Example: a system call lets a normal program ask the kernel to do something it is not allowed to do itself.");
  const PAR = [
    ["A program is a list of commands that change variables step by step, with loops and assignments.", "imperative"],
    ["A program is built from objects that bundle data with methods and send messages to each other.", "object-oriented"],
    ["A program is built by combining pure functions; values are not changed, new ones are returned.", "functional"],
    ["You state what result you want (like a query) and the system works out how.", "declarative"],
    ["You write facts and rules, and the system answers questions by searching them.", "declarative"],
    ["Inheritance and polymorphism are the main tools.", "object-oriented"],
    ["map, filter and reduce replace most loops, and recursion replaces counters.", "functional"],
    ["for loops, while loops and x = x + 1.", "imperative"],
    ["HTML describes what the page should contain, not the steps to draw it.", "declarative"],
    ["Encapsulation: hide the data inside and only allow access through methods.", "object-oriented"],
    ["A function with no side effects always gives the same output for the same input.", "functional"]
  ];
  const PCL = {
    "imperative": "It tells the computer exactly how, step by step, changing state.",
    "object-oriented": "The main building block is a thing with its own data and behavior.",
    "functional": "The main building block is a function that does not change anything outside itself.",
    "declarative": "It describes the goal rather than the steps to reach it."
  };
  const paraQ = () => {
    const [d, r] = pick(PAR);
    return mc(`Which programming paradigm does this describe? "${d}"`, r, ["imperative", "object-oriented", "functional", "declarative"].filter(x => x !== r), ["Think about what the main building block of the program is: commands, objects, functions, or a description of the goal.", PCL[r], "Example: SQL says what rows you want, not how to loop through the table. Now do yours."]);
  };
  const TY = [
    ["Types are checked before the program runs, at compile time. This is called...", "static typing", ["dynamic typing", "weak typing", "late binding"], "Which word means 'fixed beforehand'?"],
    ["Types are checked while the program runs, and a variable can hold any type. This is called...", "dynamic typing", ["static typing", "type inference", "strict typing"], "Which word means 'changing as it goes'?"],
    ["Type inference means...", "the compiler works out types without being told", ["the programmer writes all types", "types are deleted", "types change at random"], "Inference is a kind of guessing from clues."],
    ["What is the type of the expression 3 < 5?", "boolean", ["integer", "string", "list"], "Comparisons answer a yes/no question."],
    ["What is the type of 7 / 2.0 in most languages (integer divided by a decimal)?", "decimal (float)", ["boolean", "string", "list"], "Mixing a whole number and a decimal gives the wider type."],
    ["What do generics (like List of T) let you do?", "write code that works for many types", ["skip testing", "avoid all errors", "make code run slower"], "T is a placeholder."],
    ["In many languages, what is the type of 'abc' + 'def' when + joins text?", "string", ["integer", "boolean", "float"], "Joining text gives text."],
    ["A type checker finds a bug when you...", "pass text to a function that needs a number", ["add a comment", "rename a variable", "use a blank line"], "Types protect against mixing up kinds of data."],
    ["An enum type is...", "a type with a fixed list of named values", ["a type for any number", "a loop counter", "a file format"], "Think of days of the week or traffic-light colors."],
    ["A 'strongly typed' language usually...", "refuses to mix incompatible types without a clear conversion", ["has no types at all", "always runs faster", "only allows integers"], "Strong refers to how strict it is."]
  ];
  const typeQ = facts(TY, "Think about when the types get checked and how strict the language is.", "Example: in a statically typed language, passing text to a number-only function is caught before the program runs.");
  const passQ = () => {
    const f = ri(0, 3), k = ri(2, 9), v = ri(1, 20), len = ri(2, 5), arr = Array.from({ length: len }, () => ri(1, 9));
    const note = " (Numbers are copied when passed. A list is passed as a reference to the same list.)";
    if (f === 0) return num("What does this program print?" + note, v, ["Does the function change the caller's variable, or only its own copy?", "A number parameter is a copy. Changing the copy does not change the original.", "Example: n = 5; change(n) where change adds 2 to its own x still leaves n as 5. Now do yours."], code(["function change(x):", sp + `x = x + ${k}`, `n = ${v}`, "change(n)", "print n"]));
    if (f === 1) return num("What does this program print?" + note, len + 1, ["The function receives the same list, not a copy.", "Changing the list inside the function changes the list the caller sees.", "Example: a list of 2 items, after the function adds one item, has 3. Now do yours."], code(["function add(list):", sp + `append ${k} to list`, `a = ${lst(arr)}`, "add(a)", "print length of a"]));
    if (f === 2) return num("What does this program print?" + note, len, ["Look closely: does the function change the list, or does it make the name point somewhere else?", "Assigning a new list to the parameter only changes the function's own name. The caller's list is untouched.", "Example: a list of 3 items stays at 3 if the function only does list = [9]. Now do yours."], code(["function reset(list):", sp + `list = [${k}]`, `a = ${lst(arr)}`, "reset(a)", "print length of a"]));
    return num("What does this program print?" + note, k, ["The function receives the same list and changes an item inside it.", "Changing an item of the shared list is visible to the caller afterwards.", "Example: set the first item to 7 inside the function and the caller's first item becomes 7. Now do yours."], code(["function setFirst(list):", sp + `list[0] = ${k}`, `a = ${lst(arr)}`, "setFirst(a)", "print a[0]"]));
  };
  const curryQ = () => {
    const f = ri(0, 3), k = ri(2, 9), m = ri(2, 12);
    if (f === 0) return num("What does this program print?", k + m, ["add(k) returns a new function that remembers k.", "inc(m) then adds the remembered k to m.", "Example: add(3) gives a function that adds 3, so it turns 10 into 13. Now do yours."], code(["add = a => (b => a + b)", `inc = add(${k})`, `print inc(${m})`]));
    if (f === 1) return num("What does this program print?", k * m, ["mul(k) returns a function that remembers k and multiplies.", "The returned function multiplies its input by the remembered k.", "Example: mul(4) gives a function that turns 5 into 20. Now do yours."], code(["mul = a => (b => a * b)", `scale = mul(${k})`, `print scale(${m})`]));
    if (f === 2) { const c = ri(2, 4), d = ri(1, 5), x = ri(1, 5); return num("What does this program print?", (x * c + d) * c + d, ["twice(f)(x) means f(f(x)): apply f two times.", "Compute f(x) first, then feed that result back in.", "Example: f(x) = x + 2, twice from 1 gives 3, then 5. Now do yours."], code([`f = x => x * ${c} + ${d}`, "twice = g => (x => g(g(x)))", `print twice(f)(${x})`])); }
    const a = ri(1, 9), b = ri(2, 5), x = ri(1, 9);
    return num("What does this program print?", x * b + a, ["compose(f, g)(x) means f(g(x)): g runs first.", "Run g on x, then run f on that result.", "Example: f adds 1, g doubles, compose(f, g)(5) is f(10) = 11. Now do yours."], code([`f = x => x + ${a}`, `g = x => x * ${b}`, "compose = (f, g) => (x => f(g(x)))", `print compose(f, g)(${x})`]));
  };
  const LETT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const famQ = () => {
    let par = {}, depth = { A: 0 }, nxt = 1, kids = { A: [] };
    const addKid = p => { const c = LETT[nxt++]; par[c] = p; depth[c] = depth[p] + 1; kids[p].push(c); kids[c] = []; return c; };
    const c1 = ri(2, 3); for (let i = 0; i < c1; i++) addKid("A");
    kids.A.forEach((c, i) => { const n = i === 0 ? ri(1, 2) : ri(0, 2); for (let j = 0; j < n; j++) addKid(c); });
    Object.keys(depth).filter(x => depth[x] === 2).forEach(g => { if (Math.random() < 0.4) addKid(g); });
    const names = Object.keys(depth), facts_ = names.filter(x => x !== "A").map(x => `parent(${par[x]}, ${x})`);
    const f = ri(0, 3);
    const vis = code(shuf(facts_));
    if (f === 0) { const cnt = names.filter(x => depth[x] >= 2).length; return num("Given these facts, how many answers does the rule  grandparent(X, Z) :- parent(X, Y), parent(Y, Z)  produce?", cnt, ["A grandparent is a parent of a parent.", "Count the pairs (X, Z) where X is a parent of someone who is a parent of Z. Each grandchild has exactly one grandparent here.", "Example: facts parent(P,Q), parent(Q,R), parent(Q,S) give grandparent(P,R) and grandparent(P,S): 2 answers. Now do yours."], vis); }
    if (f === 1) return num("Rules: ancestor(X, Y) :- parent(X, Y).  ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).  How many people Y satisfy ancestor(A, Y)?", names.length - 1, ["Anyone you can reach by following parent links downward from A counts.", "Count every person except A, because everyone here comes from A.", "Example: if P has child Q and Q has child R, then ancestor(P, Y) is true for Q and R: 2 people. Now do yours."], vis);
    if (f === 2) { let cnt = 0; for (const p in kids) cnt += kids[p].length * (kids[p].length - 1); return num("Rule: sibling(X, Y) :- parent(P, X), parent(P, Y), X != Y.  How many (X, Y) answers does it give? (Order counts: (B, C) and (C, B) are two answers.)", cnt, ["Siblings share a parent. Look at each parent's children.", "A parent with k children gives k x (k - 1) ordered pairs. Add them up over all parents.", "Example: a parent with 3 children gives 3 x 2 = 6 answers. Now do yours."], vis); }
    const deep = pick(names.filter(x => depth[x] >= 2));
    return num(`Using the ancestor rules, how many answers X are there for ancestor(X, ${deep})? (How many ancestors does ${deep} have?)`, depth[deep], ["Follow the parent links upward from that person.", "Count each person you reach until you hit A (include A).", "Example: if R's parent is Q, Q's parent is P, and P has no parent, R has 2 ancestors. Now do yours."], vis);
  };
  const A26 = [floatQ, cacheQ, locQ, pipeQ, cpuQ, addrQ, bitsQ, adderQ, boolQ, ptQ, fsQ, semQ, kernQ, paraQ, typeQ, passQ, curryQ, famQ];
  const lessons26 = [
    L("Floating-point numbers", floatQ, [
      S("Three fields", "🔢", "A float stores a <b>sign</b>, an <b>exponent</b> and a <b>fraction</b>. Double precision uses 1 + 11 + 52 = 64 bits; single uses 1 + 8 + 23 = 32."),
      S("Rounding", "📏", "Many decimals like 0.1 have no exact binary form, so 0.1 + 0.2 is not exactly 0.3."),
      S("Be careful", "⚠️", "Compare floats using a small tolerance, and use whole cents (integers) for money.")]),
    L("Direct-mapped cache", cacheQ, [
      S("Small and fast", "⚡", "A <b>cache</b> keeps copies of recently used memory blocks close to the CPU."),
      S("Where does it go?", "📍", "In a <b>direct-mapped</b> cache a block can live in only one line: line = block address mod number of lines."),
      S("Hit or miss", "🎯", "If the line already holds that block, it is a <b>hit</b>. If not, it is a <b>miss</b> and the block replaces what was there.")]),
    L("The memory hierarchy", locQ, [
      S("A pyramid", "🔺", "Registers are fastest and tiny. Then cache, then RAM, then SSD or disk: bigger but slower each step."),
      S("Locality", "📍", "<b>Temporal</b>: use the same data again soon. <b>Spatial</b>: use data next to what you just used. Caches depend on both."),
      S("Loop order", "↔️", "Arrays are stored row by row, so walking along a row is faster than jumping down a column.")]),
    L("Pipelines", pipeQ, [
      S("An assembly line", "🏭", "A <b>pipeline</b> splits an instruction into stages (fetch, decode, execute, ...). While one instruction executes, the next one is being decoded."),
      S("The count", "🧮", "k stages and n instructions need k + n - 1 cycles when nothing goes wrong. Without a pipeline, k x n."),
      S("Hazards", "🛑", "A <b>hazard</b> (like needing a result that is not ready yet) causes a <b>stall</b>, which adds wasted cycles.")]),
    L("CPU time and CPI", cpuQ, [
      S("The formula", "⏱️", "Time = instructions x cycles per instruction (CPI) / clock rate."),
      S("Clock rate", "🕰️", "1 GHz means 1 billion cycles each second. 1000 MHz is the same."),
      S("MIPS", "📊", "Millions of instructions per second = clock rate in MHz / CPI.")]),
    L("Addresses of array items", addrQ, [
      S("Flat memory", "📚", "Memory is a long row of numbered bytes. An array lies in one block of it."),
      S("1D formula", "📏", "address of item i = start + i x item size."),
      S("2D formula", "🗂️", "Row-major: position = row x columns + column. Then use the 1D formula.")]),
    L("Address bits and sizes", bitsQ, [
      S("Powers of two", "🔟", "An n-bit address can name 2^n different bytes. 1 KB = 2^10, 1 MB = 2^20, 1 GB = 2^30 bytes."),
      S("Offsets", "🧭", "A page of 2^k bytes needs k bits to say which byte inside it. The remaining address bits choose the page."),
      S("Counting pages", "📦", "Number of pages (or frames) = memory size / page size.")]),
    L("Adders", adderQ, [
      S("Half adder", "➕", "A <b>half adder</b> adds two bits: sum = A XOR B, carry = A AND B."),
      S("Full adder", "🔗", "A <b>full adder</b> also takes a carry-in. Chain them to add bigger numbers (a ripple-carry adder)."),
      S("Binary addition", "💻", "Just like decimal: add column by column, and carry 1 whenever a column adds up to 2 or more.")]),
    L("Boolean algebra laws", boolQ, [
      S("Same circuit?", "🔌", "Two Boolean expressions are <b>equivalent</b> if they give the same output for every input. Check all rows of the truth table."),
      S("Laws", "📚", "De Morgan: NOT (A AND B) = (NOT A) OR (NOT B). Distribution: A AND (B OR C) = (A AND B) OR (A AND C). Absorption: A AND (A OR B) = A."),
      S("Simpler circuits", "✂️", "Using the laws, designers shrink circuits so they use fewer gates.")]),
    L("Page table size", ptQ, [
      S("Page number and offset", "✂️", "A virtual address splits into a page number (high bits) and an offset (low bits)."),
      S("One entry per page", "📒", "A single-level page table has 2^(page-number bits) entries. Size = entries x entry size."),
      S("Frames", "🖼️", "Physical memory is cut into frames the same size as pages. Frames = physical memory / frame size.")]),
    L("Files, blocks and waste", fsQ, [
      S("Blocks", "🧱", "A file system stores files in fixed-size <b>blocks</b>. A file always uses whole blocks."),
      S("Wasted space", "🗑️", "The unused part of the last block is <b>internal fragmentation</b>: blocks x block size - file size."),
      S("Inodes", "🗂️", "An <b>inode</b> holds a file's details and pointers to its blocks. Direct pointers reach blocks straight away.")]),
    L("Semaphores", semQ, [
      S("A counter with rules", "🚦", "A <b>semaphore</b> is a counter that controls access to a shared resource."),
      S("P and V", "🔧", "P (wait): if the value is above 0, lower it; otherwise the process waits. V (signal): wake a waiting process, or raise the value."),
      S("Mutual exclusion", "🔒", "A semaphore starting at 1 works as a lock: only one process at a time gets past P.")]),
    L("Kernel and system calls", kernQ, [
      S("Two modes", "🛡️", "The CPU has <b>user mode</b> for normal programs and <b>kernel mode</b> for the operating system's core."),
      S("System calls", "🚪", "A program asks the kernel for help (open a file, create a process) with a <b>system call</b>."),
      S("Interrupts", "🔔", "Devices and timers send <b>interrupts</b> that make the CPU switch to handler code, and the OS can then switch processes.")]),
    L("Programming paradigms", paraQ, [
      S("Styles of thinking", "🎨", "A <b>paradigm</b> is a style of organizing programs. Many languages mix several."),
      S("Four big ones", "🧩", "<b>Imperative</b>: commands that change state. <b>Object-oriented</b>: objects with data and methods. <b>Functional</b>: pure functions. <b>Declarative</b>: say what you want, not how."),
      S("No best one", "⚖️", "Each is good at different jobs: queries are declarative, games often use objects, data pipelines like functions.")]),
    L("Type systems", typeQ, [
      S("When are types checked?", "🔎", "<b>Static</b> typing checks types before running (compile time). <b>Dynamic</b> typing checks while running."),
      S("Strict or loose", "📏", "A <b>strongly typed</b> language refuses to mix incompatible types without a clear conversion."),
      S("Helpers", "🧰", "<b>Type inference</b> works out types for you. <b>Generics</b> let one piece of code handle many types.")]),
    L("Values and references", passQ, [
      S("Copies", "📄", "When you pass a number to a function, the function gets its own <b>copy</b>. Changing it does not change the original."),
      S("References", "🔗", "A list or object is passed as a <b>reference</b> to the same data. Changing its contents is visible to the caller."),
      S("Rebinding", "🔄", "Assigning a brand new list to the parameter only changes the function's own name for it; the caller's list stays.")]),
    L("Currying and function results", curryQ, [
      S("Functions returning functions", "🎁", "add = a => (b => a + b) returns a function that remembers a. This is <b>currying</b>."),
      S("Partial application", "🔧", "inc = add(1) fixes the first input and leaves a ready-made function waiting for the second."),
      S("Combining", "🔗", "compose(f, g)(x) = f(g(x)): g runs first. twice(f)(x) = f(f(x)).")]),
    L("Logic programming", famQ, [
      S("Facts and rules", "📜", "In <b>logic programming</b> (like Prolog) you write facts, such as parent(A, B), and rules built from them."),
      S("Rules", "🧠", "grandparent(X, Z) :- parent(X, Y), parent(Y, Z) means: X is a grandparent of Z if X is a parent of someone Y who is a parent of Z."),
      S("Recursion", "🌀", "ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y) lets the system follow chains of any length.")]),
    L("Mixed practice", mix(...A26), MIXS("floating point, caches, pipelines, CPU time, addressing, adders, Boolean laws, page tables, file systems, semaphores, the kernel, paradigms, types, references and currying.")),
    L("Level 26 Challenge", mix(...A26, ...A26), MIXS("everything from level 26: computer architecture, operating systems and programming paradigms."))
  ];

  // ======================= LEVEL 27 =======================
  const clg = x => { let k = 0, p = 1; while (p < x) { p *= 2; k++; } return k; };
  const sortLbQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const n = ri(3, 7); return num(`How many different orders (permutations) can ${n} distinct items be in? A comparison sort must be able to tell them all apart.`, fact(n), ["Count the ways to arrange the items.", "It is a factorial.", "Example: 4 items have 4 x 3 x 2 x 1 = 24 orders. Now do yours."]); }
    if (f === 1) { const n = ri(3, 8); return num(`Every comparison answers yes or no. What is the fewest comparisons a sorting algorithm needs in the worst case to sort ${n} distinct items? (ceil of log2 of ${n}!)`, clg(fact(n)), ["With k yes/no questions you can tell apart at most 2^k outcomes.", `You need 2^k to be at least ${n}! (the number of orders). Find the smallest k that works.`, "Example: 3 items have 6 orders; 2^2 = 4 is too small, 2^3 = 8 is enough, so 3 comparisons. Now do yours."]); }
    if (f === 2) { const L_ = ri(5, 200); return num(`A decision tree has ${L_} leaves. What is the smallest height (number of comparisons on the longest path) it can have?`, clg(L_), ["A binary tree of height h has at most 2^h leaves.", "Find the smallest h with 2^h at least as big as the number of leaves.", "Example: 20 leaves: 2^4 = 16 is too few, 2^5 = 32 is enough, so height 5. Now do yours."]); }
    const n = ri(4, 20);
    return num(`Quicksort with the last item as pivot is given an already sorted list of ${n} items. In the worst case it compares (n-1) + (n-2) + ... + 1 times. How many comparisons is that?`, n * (n - 1) / 2, ["Each round the pivot ends up at one end, so only one item is removed.", "Add the numbers from 1 up to n - 1. Use the sum formula.", "Example: n = 5: 4 + 3 + 2 + 1 = 10. Now do yours."]);
  };
  const lomuto = arr => { const a = arr.slice(), hi = a.length - 1, p = a[hi]; let i = -1; for (let j = 0; j < hi; j++) if (a[j] <= p) { i++; [a[i], a[j]] = [a[j], a[i]]; } [a[i + 1], a[hi]] = [a[hi], a[i + 1]]; return { a, idx: i + 1 }; };
  const qsQ = () => {
    const arr = uniq(ri(6, 7), 1, 30), r = lomuto(arr), f = ri(0, 1), p = arr[arr.length - 1];
    if (f === 0) return num(`Quicksort partition with the LAST item as the pivot (${p}). After partitioning ${lst(arr)}, at which index (counting from 0) does the pivot end up?`, r.idx, ["After partitioning, everything smaller than the pivot is on its left.", "The pivot's index equals the number of items smaller than the pivot.", "Example: pivot 5 in [8, 2, 9, 1, 5]: two items (2 and 1) are smaller, so index 2. Now do yours."]);
    const wr = [lst(arr), lst(arr.slice().sort((x, y) => x - y)), lst([p, ...arr.slice(0, -1)])];
    return mc(`Lomuto partition uses the last item (${p}) as the pivot. Scan left to right; whenever an item is no bigger than the pivot, swap it into the next slot of the 'small' zone at the front. Finally swap the pivot just after the small zone. What is ${lst(arr)} afterwards?`, lst(r.a), wr, ["Keep a boundary i just before the small zone. It starts at -1.", "For each item before the pivot: if item is at most the pivot, increase i and swap items i and j. At the end swap the pivot with item i + 1.", "Example: [3, 7, 1, 5] pivot 5: 3 swaps with itself, 7 is skipped, 1 swaps with 7 -> [3, 1, 7, 5]; finally swap 5 and 7 -> [3, 1, 5, 7]. Now do yours."]);
  };
  const heapQ = () => {
    const vals = uniq(8, 1, 40), h = [];
    const up = i => { let sw = 0; while (i > 0) { const p = (i - 1) >> 1; if (h[p] > h[i]) { [h[p], h[i]] = [h[i], h[p]]; i = p; sw++; } else break; } return { i, sw }; };
    const n0 = ri(4, 6); for (let k = 0; k < n0; k++) { h.push(vals[k]); up(h.length - 1); }
    const before = h.slice(), x = vals[7]; h.push(x); const r = up(h.length - 1), f = ri(0, 2);
    const base = `Min-heap array (index 0 is the root, children of i are 2i+1 and 2i+2): ${lst(before)}. Insert ${x} at the end and sift it up (swap with the parent while the parent is bigger). `;
    if (f === 0) return num(base + "At which index does it end up?", r.i, ["Start at the next free index at the end of the array.", "The parent of index i is (i - 1) divided by 2, rounded down. Swap upward while the parent is bigger than the new value.", "Example: heap [2, 5, 4], insert 1 at index 3: parent index 1 (5) is bigger so swap to index 1; parent index 0 (2) is bigger so swap to index 0. Final index 0. Now do yours."]);
    if (f === 1) return num(base + "How many swaps happen?", r.sw, ["Compare the new value with its parent over and over.", "Count each swap until the parent is smaller or the value reaches the root.", "Example: inserting 1 into [2, 5, 4] takes 2 swaps. Now do yours."]);
    return mc(base + "What does the array look like now?", lst(h), [lst([...before, x]), lst([x, ...before]), lst(h.slice().sort((a, b) => a - b))], ["Place the new item at the end first.", "Then swap it with its parent while the parent is bigger. Only the items on its path to the root move.", "Example: [2, 5, 4] plus 3 -> parent of index 3 is index 1 (5), swap; parent index 0 is 2, stop: [2, 3, 4, 5]. Now do yours."]);
  };
  const fibN = h => h <= 1 ? 1 : h === 2 ? 2 : fibN(h - 1) + fibN(h - 2) + 1;
  const ROT = [
    ["A node is too heavy on the left, and the extra weight is in its left child's LEFT subtree (left-left case).", "one right rotation", ["one left rotation", "left rotation on the child, then right rotation on the node", "right rotation on the child, then left rotation on the node"], "The tall side is straight down the left. Rotate toward the opposite side."],
    ["A node is too heavy on the right, and the extra weight is in its right child's RIGHT subtree (right-right case).", "one left rotation", ["one right rotation", "left rotation on the child, then right rotation on the node", "right rotation on the child, then left rotation on the node"], "The tall side is straight down the right. Rotate toward the opposite side."],
    ["A node is too heavy on the left, but the extra weight is in its left child's RIGHT subtree (left-right case).", "left rotation on the child, then right rotation on the node", ["one right rotation", "one left rotation", "right rotation on the child, then left rotation on the node"], "The tall part bends. You must first straighten it, then rotate the top."],
    ["A node is too heavy on the right, but the extra weight is in its right child's LEFT subtree (right-left case).", "right rotation on the child, then left rotation on the node", ["one left rotation", "one right rotation", "left rotation on the child, then right rotation on the node"], "The tall part bends. You must first straighten it, then rotate the top."]
  ];
  const avlQ = () => {
    const f = ri(0, 2);
    if (f === 0) { const h = ri(3, 8); return num(`An AVL tree keeps the heights of the two subtrees of every node within 1 of each other. Define N(1) = 1, N(2) = 2, and N(h) = N(h-1) + N(h-2) + 1 for the fewest nodes in an AVL tree with h levels. What is N(${h})?`, fibN(h), ["The thinnest AVL tree has one subtree of height h - 1 and the other of height h - 2.", "Add the smallest trees of those two heights plus 1 for the root.", "Example: N(3) = N(2) + N(1) + 1 = 2 + 1 + 1 = 4. Now do yours."]); }
    if (f === 1) { const l = ri(0, 6), r = ri(0, 6); return yn(`A node has a left subtree of height ${l} and a right subtree of height ${r}. Is this node balanced for an AVL tree (heights differ by at most 1)?`, Math.abs(l - r) <= 1, ["Subtract the two heights.", "Ignore the sign: the gap must be 0 or 1.", "Example: heights 3 and 5 differ by 2, so that node is NOT balanced. Now do yours."]); }
    const [q, r, w, c] = pick(ROT);
    return { text: q + " Which fix restores balance?", choices: strChoices(r, w), answer: r, hints: ["Decide whether the heavy part is in a straight line or bends.", c, "Example: a straight chain going down to the left is fixed with one rotation to the right. Now do yours."] };
  };
  const treeSzQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const h = ri(3, 9); return num(`What is the most nodes a binary tree with ${h} levels can have?`, 2 ** h - 1, ["Level 1 has 1 node, and each level can double the one above.", "Add 1 + 2 + 4 + ... for all the levels. That is one less than a power of two.", "Example: 3 levels hold 1 + 2 + 4 = 7. Now do yours."]); }
    if (f === 1) { const n = ri(5, 100); return num(`A complete binary tree has ${n} nodes. How many levels does it have (the root is level 1)?`, Math.floor(Math.log2(n)) + 1, ["Full levels hold 1, 2, 4, 8, ... nodes.", "Find how many of those fit in n nodes; the last level may be partly filled.", "Example: 10 nodes: 1 + 2 + 4 = 7 fill 3 levels, 3 more start a 4th level, so 4 levels. Now do yours."]); }
    if (f === 2) { const i = ri(3, 25); return num(`A full binary tree (every node has 0 or 2 children) has ${i} internal nodes. How many leaves does it have?`, i + 1, ["Try small trees: 1 internal node has 2 leaves.", "Every internal node adds one more leaf than it removes. Leaves = internal + 1.", "Example: 4 internal nodes give 5 leaves. Now do yours."]); }
    const m = ri(3, 10);
    return num(`In a B-tree node that can have at most ${m} children, what is the greatest number of keys it can hold?`, m - 1, ["Keys sit between children, like fence posts between sections.", "k keys split the node into k + 1 child pointers.", "Example: a node with at most 5 children has at most 4 keys. Now do yours."]);
  };
  const hashQ = () => {
    const m = pick([7, 8, 10, 11]), n = ri(4, m - 3), keys = uniq(n, 10, 99);
    const tab = Array(m).fill(null); let last = 0, probes = 0;
    for (const k of keys) { let i = k % m, pr = 1; while (tab[i] !== null) { i = (i + 1) % m; pr++; } tab[i] = k; last = i; probes = pr; }
    const f = ri(0, 2), lk = keys[n - 1], base = `A hash table with ${m} slots uses h(k) = k mod ${m}. Keys are inserted in this order: ${keys.join(", ")}. `;
    if (f === 0) return num(base + `On a collision it uses linear probing (try the next slot, wrapping around). In which slot does ${lk} end up?`, last, ["Insert the keys one at a time and keep a list of which slots are full.", "Start at k mod m. If that slot is taken, try the next slot, and the next, until you find an empty one.", "Example: 5 slots, keys 7 and 12: 7 goes to slot 2; 12 also wants slot 2, so it moves to slot 3. Now do yours."]);
    if (f === 1) return num(base + `With linear probing, how many slots are examined to place ${lk} (count the first try and any collisions)?`, probes, ["Place the earlier keys first so you know which slots are taken.", "Count the first slot you try, plus every extra slot after a collision.", "Example: a key that lands on its own empty slot examines 1 slot; if the next slot is also needed, 2. Now do yours."]);
    const ch = Array(m).fill(0); keys.forEach(k => ch[k % m]++);
    return num(base + "With chaining (each slot keeps a list), what is the length of the longest chain?", Math.max(...ch), ["Work out k mod m for every key.", "Count how many keys land in each slot. The biggest count is the answer.", "Example: slots 2, 5, 2, 2, 7 give slot 2 three keys, so the longest chain is 3. Now do yours."]);
  };
  const TW = ["car", "card", "care", "cat", "cart", "dog", "dot", "dote", "do", "door", "tea", "ten", "tent", "to"];
  const trieQ = () => {
    const ws = shuf(TW).slice(0, ri(5, 7)), pre = new Set(); ws.forEach(w => { for (let i = 1; i <= w.length; i++) pre.add(w.slice(0, i)); });
    const f = ri(0, 2), vis = ws.join(", ");
    if (f === 0) return num(`A trie stores the words: ${vis}. Each node is one letter on a path from the root (the root itself holds no letter). How many nodes does the trie have, not counting the root?`, pre.size, ["Words that start the same share nodes at the beginning.", "Count the different prefixes: every distinct prefix of every word is one node.", "Example: 'to' and 'tea' share the 't', so words 'to', 'tea' need nodes t, to, te, tea = 4. Now do yours."]);
    if (f === 1) { const p = pick(["c", "ca", "d", "do", "t", "te"]); return num(`A trie stores the words: ${vis}. How many of these words start with "${p}"?`, ws.filter(w => w.startsWith(p)).length, ["Follow the prefix down from the root.", "Count the stored words that begin with exactly those letters.", "Example: among 'cat, dog, car', words starting with 'ca' are 2. Now do yours."]); }
    const total = ws.reduce((s, w) => s + w.length, 0);
    return num(`Storing the words ${vis} separately takes ${total} letters. A trie shares prefixes. How many fewer letter-nodes does the trie need?`, total - pre.size, ["First count the letters if stored separately (given).", "Then count the trie nodes (distinct prefixes). Subtract.", "Example: 'car' and 'cat' separate = 6 letters; trie nodes c, ca, car, cat = 4; saved 2. Now do yours."]);
  };
  const ufQ = () => {
    const n = ri(6, 9), par = Array.from({ length: n + 1 }, (_, i) => i), find = x => par[x] === x ? x : (par[x] = find(par[x]));
    const ops = []; for (let i = 0; i < ri(4, 6); i++) { let a = ri(1, n), b = ri(1, n); if (a === b) b = a % n + 1; ops.push([a, b]); par[find(a)] = find(b); }
    const roots = {}; for (let i = 1; i <= n; i++) roots[find(i)] = (roots[find(i)] || 0) + 1;
    const f = ri(0, 2), base = `Elements 1 to ${n} start as separate sets. Union operations are applied in order: ${ops.map(o => `union(${o[0]},${o[1]})`).join(", ")}. `;
    if (f === 0) return num(base + "How many sets are there now?", Object.keys(roots).length, ["Start with n separate sets.", "Each union that joins two different sets lowers the count by 1. A union of elements already together changes nothing.", "Example: 5 elements, union(1,2), union(2,1): only the first one merges, so 4 sets. Now do yours."]);
    if (f === 1) return num(base + "How big is the largest set?", Math.max(...Object.values(roots)), ["Track which elements are grouped together after each union.", "Merge groups step by step, then count the biggest group.", "Example: union(1,2) then union(2,3) puts 1, 2, 3 in one set of size 3. Now do yours."]);
    const x = ri(1, n), y = (x + ri(1, n - 1) - 1) % n + 1;
    return yn(base + `Are ${x} and ${y} in the same set?`, find(x) === find(y), ["Build the groups after all the unions.", "Two elements are together if a chain of unions connects them.", "Example: after union(1,2) and union(2,3), 1 and 3 are together. Now do yours."]);
  };
  const NN = "ABCDE";
  const mkGraph = () => { const E = []; for (let i = 0; i < 4; i++) E.push([i, i + 1, ri(1, 9)]); shuf([[0, 2], [0, 3], [0, 4], [1, 3], [1, 4], [2, 4]]).slice(0, ri(2, 3)).forEach(([a, b]) => E.push([a, b, ri(1, 9)])); return E; };
  const gView = E => code(shuf(E.map(e => `${NN[e[0]]} - ${NN[e[1]]} : ${e[2]}`)));
  const dijkstraQ = () => {
    const E = mkGraph(), d = [0, 1e9, 1e9, 1e9, 1e9], done = Array(5).fill(false);
    for (let k = 0; k < 5; k++) { let u = -1; for (let i = 0; i < 5; i++) if (!done[i] && (u < 0 || d[i] < d[u])) u = i; done[u] = true; E.forEach(([a, b, w]) => { if (a === u && d[a] + w < d[b]) d[b] = d[a] + w; if (b === u && d[b] + w < d[a]) d[a] = d[b] + w; }); }
    const t = ri(2, 4);
    return num(`Undirected roads with lengths (written as town - town : length). What is the shortest total distance from A to ${NN[t]}?`, d[t], ["Start at A with distance 0 and keep the best known distance to every town.", "Always settle the closest unsettled town next, then check whether going through it gives a shorter way to its neighbors.", "Example: A-B 2, B-C 2, A-C 5: the best way to C is through B, 2 + 2 = 4, not 5. Now do yours."], gView(E));
  };
  const kruskalQ = () => {
    const E = mkGraph(), s = E.slice().sort((x, y) => x[2] - y[2]), par = [0, 1, 2, 3, 4], find = x => par[x] === x ? x : (par[x] = find(par[x]));
    let tot = 0; for (const [a, b, w] of s) { if (find(a) !== find(b)) { par[find(a)] = find(b); tot += w; } }
    return num("Find a minimum spanning tree with Kruskal's algorithm: take the cheapest edge first, and skip any edge that would make a cycle. What is the total length of the tree?", tot, ["The tree must connect all 5 towns using exactly 4 edges.", "Sort the edges from smallest to largest. Add each unless its two ends are already connected.", "Example: edges 1, 2, 2 on three towns where the 2-edges close a loop: take 1, take one 2, skip the other. Total 3. Now do yours."], gView(E));
  };
  const EDP = [["kitten", "sitting"], ["flaw", "lawn"], ["cat", "cut"], ["sunday", "saturday"], ["book", "back"], ["table", "tablet"], ["gift", "gate"], ["horse", "ros"], ["dog", "dig"], ["plan", "plane"], ["intention", "execution"], ["spark", "speak"]];
  const edit = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)); for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; };
  const editQ = () => {
    const [a, b] = pick(EDP);
    return num(`The edit distance is the fewest single-letter changes (insert a letter, delete a letter, or replace a letter) that turn one word into the other. What is the edit distance from "${a}" to "${b}"?`, edit(a, b), ["Line the words up and look for letters that already match in order.", "Each mismatch costs one change. Try to keep as many matching letters as possible, and only insert or delete when the lengths differ.", "Example: 'cat' to 'cart': insert one 'r', so the distance is 1. Now do yours."]);
  };
  const gridQ = () => {
    const R = ri(3, 5), C = ri(3, 5), bl = new Set(), f = ri(0, 3);
    if (f !== 3) for (let i = 0; i < ri(1, 2); i++) { const r = ri(0, R - 1), c = ri(0, C - 1); if ((r || c) && (r !== R - 1 || c !== C - 1)) bl.add(r + "," + c); }
    const w = Array.from({ length: R }, () => Array(C).fill(0)); w[0][0] = 1;
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) { if (bl.has(r + "," + c)) { w[r][c] = 0; continue; } if (r || c) w[r][c] = (r ? w[r - 1][c] : 0) + (c ? w[r][c - 1] : 0); }
    const vis = `<div style="line-height:1.3;font-size:1.5em">` + Array.from({ length: R }, (_, r) => Array.from({ length: C }, (_, c) => r === 0 && c === 0 ? "🤖" : r === R - 1 && c === C - 1 ? "⭐" : bl.has(r + "," + c) ? "🧱" : "⬜").join("")).join("<br>") + "</div>";
    return num(`The robot 🤖 moves only right or down, never onto a wall 🧱, and wants to reach the star ⭐. How many different routes are there?`, w[R - 1][C - 1], ["Think about how many ways there are to reach each square.", "Ways to reach a square = ways to reach the square above + ways to reach the square to its left. A wall square has 0 ways. The start has 1.", "Example: in a 2 x 2 open grid the start has 1, the top-right 1, the bottom-left 1, and the bottom-right 1 + 1 = 2. Now do yours."], vis);
  };
  const covQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const k = ri(2, 6); return num(`A function has ${k} separate if statements one after another, and no loops. How many different paths run through it from start to finish?`, 2 ** k, ["Each if is either taken or skipped.", "Two choices for each if. Multiply them.", "Example: 3 ifs give 2 x 2 x 2 = 8 paths. Now do yours."]); }
    if (f === 1) { const k = ri(2, 8); return num(`A function has ${k} separate if statements. Branch coverage needs every outcome of every if (true and false) to happen at least once. How many branch outcomes must be covered in all?`, 2 * k, ["Each if has two outcomes.", "Count them and multiply by the number of ifs.", "Example: 3 ifs have 6 outcomes. Now do yours."]); }
    if (f === 2) { const t = pick([4, 5, 10, 20, 25, 50]), s = ri(1, t); return num(`Tests run ${s} of the ${t} statements in a program. What percent statement coverage is that?`, s * 100 / t, ["Coverage is a part divided by the whole.", "Divide the covered statements by all the statements and multiply by 100.", "Example: 3 of 5 statements = 3 / 5 x 100 = 60 percent. Now do yours."]); }
    const A = ri(3, 9), xs = Array.from({ length: ri(2, 3) }, () => ri(0, 14)), out = new Set();
    xs.forEach(x => { out.add(x > A ? "a1" : "a0"); out.add(x % 2 === 0 ? "b1" : "b0"); });
    return num(`The code has two ifs:  if x > ${A}  (A)  and then  if x is even  (B). A test suite runs x = ${xs.join(", ")}. Branch coverage counts the 4 outcomes (A true, A false, B true, B false). How many of the 4 are covered?`, out.size, ["Go through each test value and note what A and B do for it.", "Collect the different outcomes seen: A true, A false, B true, B false. Count the distinct ones.", "Example: with A at 5, x = 8 gives A true and B true; x = 2 gives A false and B true: 3 outcomes covered. Now do yours."]);
  };
  const TST = [
    ["Which tests check one small function on its own?", "unit tests", ["system tests", "acceptance tests", "load tests"], "The word hints at a single unit."],
    ["Which tests check that several parts work together?", "integration tests", ["unit tests", "spelling tests", "typing tests"], "The word hints at joining parts."],
    ["What is a regression test for?", "making sure an old feature did not break after a change", ["testing the first version", "measuring speed", "checking the colors"], "Regress means to go backwards."],
    ["What is a mock object in a test?", "a fake stand-in for a real part, like a database", ["a very slow computer", "a test that always fails", "a loop counter"], "Real parts may be slow or unsafe to use in tests."],
    ["In test-driven development, what is written first?", "a failing test", ["the finished program", "the documentation", "the logo"], "Red, then green, then refactor."],
    ["Mutation testing makes small changes to your code to see whether...", "your tests notice them", ["the code runs faster", "the compiler complains", "users are happy"], "If a broken copy of the code still passes, the tests are weak."],
    ["Fuzzing a program means...", "feeding it many random or odd inputs to find crashes", ["reading the code aloud", "removing all comments", "making it shorter"], "Imagine throwing garbage at the program."],
    ["Black-box testing means testing...", "without looking at the code, only inputs and outputs", ["only the comments", "only the loops", "with the code covered up forever"], "Imagine the program is a sealed box."],
    ["What is a flaky test?", "a test that sometimes passes and sometimes fails with no code change", ["a test that is too short", "a test that never runs", "a test for flakes"], "Look at the word: it is unreliable."],
    ["What does continuous integration (CI) do?", "automatically builds and tests the code after each change", ["deletes old code", "prints the code", "speeds up the CPU"], "A robot checks every change."],
    ["A property-based test checks that...", "a rule holds for many generated inputs", ["one fixed example works", "the code is pretty", "the file name is correct"], "Instead of one example, it tries many."]
  ];
  const testIdeasQ = facts(TST, "Think about what the test looks at and when it is run.", "Example: unit tests check a single function; integration tests check how parts fit together.");
  const FR_ = ["🍎 apple", "🍌 banana", "🍇 grapes", "🍊 orange"];
  const gbQ = () => {
    const rows = Array.from({ length: ri(6, 8) }, () => [pick(FR_), ri(1, 9)]), g = {}, c = {}, mx = {};
    rows.forEach(([n, k]) => { g[n] = (g[n] || 0) + k; c[n] = (c[n] || 0) + 1; mx[n] = Math.max(mx[n] || 0, k); });
    const names = Object.keys(g), vis = table(["fruit", "kg"], rows), f = ri(0, 3), n = pick(names);
    if (f === 0) { const T = ri(5, 15); return num(`Table "box". Query: SELECT fruit, SUM(kg) FROM box GROUP BY fruit HAVING SUM(kg) > ${T}. How many rows does it return?`, names.filter(x => g[x] > T).length, ["GROUP BY makes one row per fruit.", "HAVING keeps only the groups whose total passes the test. Find each fruit's total first.", "Example: totals apple 12, pear 4 with HAVING SUM > 10 keeps only apple: 1 row. Now do yours."], vis); }
    if (f === 1) return num(`Table "box". Query: SELECT SUM(kg) FROM box WHERE fruit = '${n}'. What number does it return?`, g[n], ["WHERE keeps only the matching rows.", "Add the kg values of those rows.", "Example: apple rows 3 and 4 give SUM = 7. Now do yours."], vis);
    if (f === 2) return num(`Table "box". Query: SELECT COUNT(*) FROM box WHERE fruit = '${n}'. What number does it return?`, c[n], ["Count how many rows match the condition; the kg values do not matter.", "Find every row for that fruit and count them.", "Example: if apple appears in 3 rows the answer is 3. Now do yours."], vis);
    return num("Table \"box\". Query: SELECT fruit, MAX(kg) FROM box GROUP BY fruit. How many rows does it return?", names.length, ["GROUP BY makes one result row for each different value of fruit.", "Count the different fruits in the table.", "Example: a table with apple, apple, pear gives 2 groups. Now do yours."], vis);
  };
  const joinQ = () => {
    const m = ri(3, 5), n = ri(4, 8), ord = Array.from({ length: n }, (_, i) => [i + 1, ri(1, m)]), have = new Set(ord.map(o => o[1])), lone = m - have.size;
    const vis = `<div style="margin-bottom:6px">customers: id ${Array.from({ length: m }, (_, i) => i + 1).join(", ")}</div>` + table(["order", "customer_id"], ord);
    const f = ri(0, 3);
    if (f === 0) return num("Query: SELECT * FROM customers INNER JOIN orders ON customers.id = orders.customer_id. How many rows does it return?", n, ["INNER JOIN keeps only pairs that match.", "Every order has exactly one customer here, so count the orders that find a match.", "Example: 3 orders that all match a customer give 3 rows. Now do yours."], vis);
    if (f === 1) return num("Query: SELECT * FROM customers LEFT JOIN orders ON customers.id = orders.customer_id. How many rows does it return?", n + lone, ["LEFT JOIN keeps every customer, even those with no orders (one row with blanks).", "Start with the matching pairs, then add one row for each customer who has no order.", "Example: 3 matching pairs plus 1 customer with no orders gives 4 rows. Now do yours."], vis);
    if (f === 2) return num("How many customers have no orders at all?", lone, ["Look at which customer_id values appear in the orders table.", "Compare with the list of all customer ids and count the missing ones.", "Example: customers 1 to 4 and orders only for 1, 1, 3: customers 2 and 4 are missing, so 2. Now do yours."], vis);
    return num("Query: SELECT * FROM customers CROSS JOIN orders (every customer paired with every order). How many rows does it return?", m * n, ["A cross join pairs every row of one table with every row of the other.", "Multiply the number of customers by the number of orders.", "Example: 3 customers and 4 orders give 12 rows. Now do yours."], vis);
  };
  const NF = [
    ["A table is in first normal form (1NF) when...", "every cell holds a single value, with no lists", ["it has no primary key", "it has exactly two columns", "it is stored in a file"], "Think: one value per cell."],
    ["Second normal form (2NF) removes...", "columns that depend on only part of a composite key", ["all duplicate rows", "all numbers", "the primary key"], "It matters when the key has more than one column."],
    ["Third normal form (3NF) removes...", "columns that depend on other non-key columns", ["the table name", "all foreign keys", "indexes"], "Facts should depend on the key, not on each other."],
    ["Why do designers normalize tables?", "to avoid repeating data and update mistakes", ["to make queries impossible", "to use more disk", "to remove all keys"], "Repeating a fact in many rows causes trouble."],
    ["A customer's address is stored in every one of her orders. If she moves, what problem appears?", "an update anomaly: some rows may keep the old address", ["the table becomes faster", "the order numbers change", "a syntax error"], "Many copies of one fact must all be changed."],
    ["In ACID, 'A' (atomicity) means...", "a transaction happens completely or not at all", ["the data is always in an array", "queries are always fast", "all users can see all data"], "Atom means cannot be split."],
    ["In ACID, 'C' (consistency) means...", "a transaction keeps the database valid under its rules", ["data is copied twice", "it is always cached", "only one user may connect"], "Rules such as keys and balances must stay true."],
    ["In ACID, 'I' (isolation) means...", "transactions running together do not disturb each other", ["data is hidden from the owner", "the database is offline", "each user has a private server"], "Imagine each transaction running alone."],
    ["In ACID, 'D' (durability) means...", "committed changes survive a crash", ["data is deleted after a day", "the database is very hard to read", "each row is a duplicate"], "Think: it lasts."],
    ["What is a foreign key?", "a column that refers to the primary key of another table", ["a key that opens the server", "the first column of every table", "a secret password"], "It is how tables point to each other."],
    ["When you transfer money, which ACID property ensures that taking from one account and adding to the other do not get split?", "atomicity", ["durability", "isolation only", "indexing"], "Both steps must happen together or not at all."]
  ];
  const nfQ = facts(NF, "Think about avoiding repeated data and keeping data safe.", "Example: storing a city name in every row invites mismatched spellings; a separate cities table avoids it.");
  const SRT = [
    ["Which sorting algorithm is stable (equal items keep their original order) among these?", "merge sort", ["heap sort", "selection sort", "quicksort (usual version)"], "Stable sorts compare neighbors carefully and never jump equal items over each other."],
    ["Which of these is NOT stable in its usual form?", "selection sort", ["insertion sort", "merge sort", "bubble sort"], "It swaps items across long distances."],
    ["The worst case of quicksort with a bad pivot is...", "O(n^2)", ["O(n)", "O(log n)", "O(n log n)"], "Each round removes only one item."],
    ["Merge sort needs extra memory of about...", "O(n)", ["O(1)", "O(log log n)", "O(n^2)"], "It copies the pieces while merging."],
    ["Which sort works in place with O(n log n) in the worst case?", "heap sort", ["merge sort", "counting sort", "bubble sort"], "It uses the input array as a heap."],
    ["Counting sort works in about O(n + k) time. What is k?", "the size of the range of values", ["the number of sorts", "the number of comparisons", "the pivot"], "It counts how many of each value appear."],
    ["Insertion sort is very fast when the list is...", "already nearly sorted", ["reversed", "random", "huge and shuffled"], "Few shifts are needed."],
    ["No comparison sort can beat what time in the worst case?", "n log n", ["n", "log n", "n squared"], "Remember the decision tree argument."],
    ["Why is stability useful?", "you can sort by one key and keep an earlier order for ties", ["it saves memory", "it makes sorting O(n)", "it removes duplicates"], "Think of sorting students by grade after sorting them by name."],
    ["Bubble sort has an average time of...", "O(n^2)", ["O(n)", "O(log n)", "O(n log n)"], "It uses nested passes."]
  ];
  const sortPropQ = facts(SRT, "Think about the idea behind each sort: swapping, merging, or building a heap.", "Example: merge sort splits in halves and merges, so it takes O(n log n) time in every case.");
  const A27 = [sortLbQ, qsQ, heapQ, avlQ, treeSzQ, hashQ, trieQ, ufQ, dijkstraQ, kruskalQ, editQ, gridQ, covQ, testIdeasQ, gbQ, joinQ, nfQ, sortPropQ];
  const lessons27 = [
    L("The sorting lower bound", sortLbQ, [
      S("Decision trees", "🌳", "A comparison sort is a tree of yes/no questions. Each leaf is one possible sorted order."),
      S("Counting leaves", "🍃", "n items have n! orders, so the tree needs at least n! leaves and height at least log2(n!)."),
      S("Result", "📏", "That is about n log n, so no comparison sort can be faster in the worst case.")]),
    L("Quicksort partition", qsQ, [
      S("The pivot", "📌", "Quicksort picks a <b>pivot</b>, moves smaller items before it and bigger ones after it, then sorts both sides."),
      S("Lomuto scheme", "🔀", "Keep a boundary. Scan the list; swap each item that is at most the pivot into the small zone. Finally put the pivot after that zone."),
      S("Speed", "⚡", "Balanced splits give O(n log n). A sorted list with a last-item pivot gives O(n^2): (n-1) + (n-2) + ... comparisons.")]),
    L("Inserting into a heap", heapQ, [
      S("Heap in an array", "🏔️", "A min-heap stores the smallest at index 0. Children of i are 2i+1 and 2i+2; the parent of i is (i-1) div 2."),
      S("Sift up", "⬆️", "Insert at the end, then swap with the parent while the parent is bigger."),
      S("Cost", "⏱️", "A heap with n items has about log2 n levels, so an insertion takes O(log n) swaps at most.")]),
    L("AVL trees", avlQ, [
      S("Self-balancing", "⚖️", "An <b>AVL tree</b> is a binary search tree where, at every node, the two subtree heights differ by at most 1."),
      S("Rotations", "🔄", "When an insert breaks the balance, <b>rotations</b> fix it. Straight (left-left or right-right) needs one rotation; a bent case needs two."),
      S("Thin but valid", "🌿", "The thinnest AVL tree of height h has N(h) = N(h-1) + N(h-2) + 1 nodes, so height stays about log n.")]),
    L("Tree sizes", treeSzQ, [
      S("Levels", "🏢", "A binary tree with h levels holds at most 2^h - 1 nodes."),
      S("Full and complete", "🌳", "A <b>full</b> binary tree has leaves = internal nodes + 1. A <b>complete</b> tree with n nodes has floor(log2 n) + 1 levels."),
      S("B-trees", "🗄️", "A B-tree node with at most m children holds at most m - 1 keys. Databases use them to keep trees short and wide.")]),
    L("Hash table probing", hashQ, [
      S("Collisions", "💥", "Two keys can land in the same slot. This is a <b>collision</b>."),
      S("Linear probing", "➡️", "Try the next slot, then the next (wrapping around), until you find an empty one."),
      S("Chaining", "⛓️", "Alternatively each slot keeps a list of its keys. A long chain slows searches, so tables resize when they get full.")]),
    L("Tries", trieQ, [
      S("Prefix tree", "🌲", "A <b>trie</b> stores words letter by letter along paths from the root, so words that start the same share nodes."),
      S("Counting", "🔢", "Number of nodes = number of different prefixes of the stored words."),
      S("Uses", "🔍", "Autocomplete: follow the typed prefix down, then list every word below it.")]),
    L("Union-find", ufQ, [
      S("Groups", "👥", "<b>Union-find</b> keeps track of which elements are in the same group (set)."),
      S("Two moves", "🔧", "<b>union(a, b)</b> merges the groups of a and b. <b>find(x)</b> says which group x is in."),
      S("Counting groups", "🧮", "Start with n groups. A union that merges two different groups lowers the count by 1.")]),
    L("Dijkstra's shortest path", dijkstraQ, [
      S("Greedy and safe", "🧭", "<b>Dijkstra's algorithm</b> finds the shortest distance from a start node when all edge lengths are positive."),
      S("Steps", "📝", "Start at distance 0. Repeatedly pick the unsettled node with the smallest known distance, then try to improve its neighbors."),
      S("Tip", "💡", "Write the best known distance beside each town and cross it out when a shorter route appears.")]),
    L("Minimum spanning trees", kruskalQ, [
      S("Connect cheaply", "🛤️", "A <b>minimum spanning tree</b> joins all nodes with the least total edge length, using n - 1 edges and no cycle."),
      S("Kruskal's algorithm", "📋", "Sort the edges by length. Take each in turn unless it would close a cycle."),
      S("Cycle check", "🔁", "Use union-find: if an edge's ends are already in the same group, skip it.")]),
    L("Edit distance", editQ, [
      S("Three moves", "✏️", "<b>Edit distance</b> counts the fewest insertions, deletions and replacements to turn one word into another."),
      S("Dynamic programming", "🧱", "A table d[i][j] holds the distance between the first i letters of one word and the first j of the other."),
      S("The rule", "📐", "If the letters match, copy the diagonal value. Otherwise take 1 + the smallest of left, above and diagonal.")]),
    L("Grid paths", gridQ, [
      S("Count routes", "🗺️", "Moving only right or down, the number of routes to a square is the sum of the routes to the square above and to the left."),
      S("Walls", "🧱", "A wall square has 0 routes. The start has 1 route."),
      S("Open grids", "🔢", "With no walls in a grid of r rows and c columns, the count is C(r + c - 2, r - 1).")]),
    L("Code coverage", covQ, [
      S("How much was tested?", "📊", "<b>Statement coverage</b>: the share of lines that ran. <b>Branch coverage</b>: the share of if outcomes (true and false) that happened."),
      S("Paths", "🛤️", "k separate ifs create 2^k paths, so testing every path becomes impossible quickly."),
      S("Not enough", "⚠️", "High coverage does not prove the code is correct. It only shows what ran, not whether it was checked.")]),
    L("Kinds of tests and ideas", testIdeasQ, [
      S("Levels of tests", "🪜", "<b>Unit</b> tests check one function. <b>Integration</b> tests check parts together. <b>Regression</b> tests make sure old things still work."),
      S("Helpers", "🧰", "<b>Mocks</b> stand in for real parts. <b>Fuzzing</b> throws random input at the program. <b>Mutation testing</b> checks the tests themselves."),
      S("Habits", "🔁", "<b>Test-driven development</b>: write a failing test, make it pass, then tidy up. <b>CI</b> runs the tests after every change.")]),
    L("GROUP BY and HAVING", gbQ, [
      S("Groups", "🧺", "GROUP BY turns rows with the same value into one group. Then SUM, COUNT, MAX or AVG work on each group."),
      S("WHERE and HAVING", "🔍", "WHERE filters rows before grouping. HAVING filters groups after grouping."),
      S("One row per group", "📋", "The result has one row for each group (each different value you grouped by).")]),
    L("How joins count rows", joinQ, [
      S("Inner join", "🤝", "INNER JOIN keeps only rows that match on both sides."),
      S("Left join", "⬅️", "LEFT JOIN keeps every row of the left table; if nothing matches, the right side is filled with blanks (NULL)."),
      S("Cross join", "✖️", "CROSS JOIN pairs every row with every row: m x n rows.")]),
    L("Normal forms and ACID", nfQ, [
      S("Normalizing", "🧹", "<b>1NF</b>: one value per cell. <b>2NF</b>: no part-key dependencies. <b>3NF</b>: columns depend on the key, not on other columns."),
      S("Why", "🎯", "Each fact is stored once, so updates cannot leave contradictory copies (anomalies)."),
      S("ACID", "🔒", "A transaction is <b>Atomic</b>, keeps data <b>Consistent</b>, is <b>Isolated</b> from others, and <b>Durable</b> once committed.")]),
    L("Properties of sorting algorithms", sortPropQ, [
      S("Stable", "🧷", "A sort is <b>stable</b> if equal items keep their original order. Merge, insertion and bubble sort are stable."),
      S("Time and space", "📈", "Merge sort: O(n log n) time, O(n) extra space. Heap sort: O(n log n), in place. Quicksort: O(n log n) usually, O(n^2) worst."),
      S("Special cases", "🎒", "Insertion sort loves nearly sorted lists. Counting sort beats n log n when the values come from a small range.")]),
    L("Mixed practice", mix(...A27), MIXS("sorting bounds, quicksort, heaps, AVL trees, hashing, tries, union-find, shortest paths, spanning trees, edit distance, grid counting, testing, SQL grouping and joins, normal forms.")),
    L("Level 27 Challenge", mix(...A27, ...A27), MIXS("everything from level 27: data structures, graph algorithms, dynamic programming, testing and databases."))
  ];

  Object.assign(CODING_LEVELS, { 25: lessons25, 26: lessons26, 27: lessons27 });
})();
