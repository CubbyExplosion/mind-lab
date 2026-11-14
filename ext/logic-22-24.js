// ext/logic-22-24.js  Mind Lab Logic & Puzzles levels 22-24 (60 lessons)
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
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const frs = (a, b) => { const g = gcd(Math.abs(a), b); return b / g === 1 ? String(a / g) : `${a / g}/${b / g}`; };
  const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const perm = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r *= n - i; return r; };
  const modpow = (b, e, m) => { let r = 1; b %= m; while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e = Math.floor(e / 2); } return r; };
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const mixOf = ms => () => pick(ms)();
  const MIXS = topics => [
    S("Review time!", "🔄", "This lesson mixes puzzles from earlier lessons in this level. Take your time with each one."),
    S("Remember", "🧠", topics),
    S("Tip", "💡", "Work out what kind of puzzle it is first. Then use the method you learned for that kind.")
  ];
  const divsOf = n => { const d = []; for (let i = 1; i <= n; i++) if (n % i === 0) d.push(i); return d; };
  const eqs = lines => `<div style="font-size:1.3em;line-height:1.6">${lines.join("<br>")}</div>`;

  // ======================= LEVEL 22 =======================
  const inclEx = () => {
    const [a, b] = pick([[2, 3], [3, 5], [4, 6], [2, 5], [3, 4], [5, 7], [6, 9], [4, 10], [6, 8], [3, 7], [4, 5]]);
    const l = a * b / gcd(a, b); let N = ri(40, 250); if (N === 30) N = 31;
    const u = Math.floor(N / a) + Math.floor(N / b) - Math.floor(N / l), neither = Math.random() < 0.4;
    return num(`How many whole numbers from 1 to ${N} are ${neither ? `divisible by neither ${a} nor ${b}` : `divisible by ${a} or ${b} (or both)`}?`, big("🔢"), neither ? N - u : u, [
      "Count the multiples of each number on its own. Some numbers are multiples of both, and they get counted twice.",
      "A number divisible by both is a multiple of the smallest number that both go into. Count those too (divide and drop the leftover) and take them away once." + (neither ? " For “neither”, take your total away from the whole list." : ""),
      "Example: from 1 to 30, divisible by 2 or 3: 15 + 10 − 5 = 20 (the 5 are multiples of 6). Now do yours."]);
  };
  const legendre = (n, p) => { let c = 0; for (let q = p; q <= n; q *= p) c += Math.floor(n / q); return c; };
  const trailZ = () => {
    if (Math.random() < 0.5) {
      let n = ri(12, 150); if (n === 30) n = 31;
      return num(`How many zeros are at the end of ${n}! (that is 1 × 2 × 3 × … × ${n})?`, big("🔟"), legendre(n, 5), [
        "Each zero comes from a factor 10, which is 2 × 5. Which of those two is rarer in a long product?",
        "Count the factors of 5: multiples of 5, plus one extra for multiples of 25, and so on. Divide and drop the leftover each time.",
        "Example: 30!: 30 ÷ 5 = 6, and 30 ÷ 25 = 1 more, so 7 zeros. Now do yours."]);
    }
    const p = pick([2, 3, 5, 7]); let n = ri(10, 100); if (n === 20) n = 21;
    return num(`${n}! means 1 × 2 × 3 × … × ${n}. What is the biggest k so that ${p}<sup>k</sup> divides ${n}! exactly?`, big("🧮"), legendre(n, p), [
      `Every multiple of ${p} adds at least one factor ${p} to the product.`,
      `Count the multiples of ${p}, then extra ones for multiples of ${p * p}, then ${p * p * p}, and so on. Divide and drop the leftover each time.`,
      "Example: highest power of 3 in 20!: 20 ÷ 3 = 6, 20 ÷ 9 = 2, so 6 + 2 = 8. Now do yours."]);
  };
  const sumDiv = () => {
    if (Math.random() < 0.5) {
      const n = pick([12, 20, 24, 30, 36, 40, 42, 45, 48, 50, 56, 60, 66, 70, 72, 80, 84, 90, 96, 100]);
      return num(`Add up ALL the divisors of ${n} (including 1 and ${n}). What is the total?`, big("➕"), divsOf(n).reduce((a, b) => a + b, 0), [
        "Find the divisors in pairs: if 2 goes in, so does the number ÷ 2.",
        "List every pair that multiplies to the number, write them all down in a list, then add them up carefully.",
        "Example: divisors of 18 are 1, 2, 3, 6, 9, 18 (pairs 1×18, 2×9, 3×6). Total 39. Now do yours."]);
    }
    let n; if (Math.random() < 0.2) n = pick([6, 28]); else do { n = ri(8, 60); } while (n === 10 || n === 6 || n === 28);
    const s = divsOf(n).reduce((a, b) => a + b, 0) - n, r = s === n ? "perfect" : s > n ? "abundant" : "deficient";
    return mcq(`Add the divisors of ${n} that are smaller than ${n}. Is ${n} perfect (sum equal), abundant (sum bigger) or deficient (sum smaller)?`, big("⚖️"), r, ["perfect", "abundant", "deficient"], [
      "List all the divisors of the number except the number itself.",
      "Add them up and compare the total with the number. Equal, bigger and smaller each have a name.",
      "Example: 10 has 1 + 2 + 5 = 8, which is smaller than 10, so 10 is deficient. Now do yours."]);
  };
  const powMod = () => {
    const m = pick([5, 7, 9, 11, 13]); let a; do { a = ri(2, 12); } while (gcd(a, m) !== 1 || a % m === 1);
    if (Math.random() < 0.6) { const e = ri(30, 300);
      return num(`What is the remainder when ${a}<sup>${e}</sup> is divided by ${m}?`, big("♻️"), modpow(a, e, m), [
        "Powers do not grow forever in remainders. They repeat in a cycle. Write the first few remainders.",
        "Keep multiplying by the base and keeping only the remainder, until the pattern repeats. Then see where the exponent lands in the cycle.",
        "Example: 3<sup>50</sup> ÷ 7: remainders 3, 2, 6, 4, 5, 1 repeat (cycle of 6). 50 = 8 × 6 + 2, so it is the 2nd one: 2. Now do yours."]); }
    let b; do { b = ri(2, 12); } while (gcd(b, m) !== 1);
    const e = ri(10, 80), f = ri(10, 80);
    return num(`What is the remainder when ${a}<sup>${e}</sup> + ${b}<sup>${f}</sup> is divided by ${m}?`, big("♻️"), (modpow(a, e, m) + modpow(b, f, m)) % m, [
      "Find the remainder of each power on its own, then combine them.",
      "Each power's remainders repeat in a cycle. Find both, add them, and take the remainder of the sum.",
      "Example: 2<sup>10</sup> + 3<sup>5</sup> ÷ 7: 2<sup>10</sup> gives 2, 3<sup>5</sup> gives 5, and 2 + 5 = 7 leaves 0. Now do yours."]);
  };
  const amgm = () => {
    const r = ri(2, 9), t = pick([1, 2, 3]);
    if (t === 1) return num(`For positive numbers x, what is the smallest value of x + ${r * r}/x?`, big("📉"), 2 * r, [
      "The two parts x and the fraction multiply to a fixed number.",
      "When two positive numbers have a fixed product, their sum is smallest when they are equal. Find that equal value.",
      "Example: x + 100/x is smallest when x = 100/x, so x = 10, giving 10 + 10 = 20. Now do yours."]);
    if (t === 2) return num(`Two positive numbers (not always whole) multiply to ${r * r}. What is the smallest their sum can be?`, big("📉"), 2 * r, [
      "Try some pairs with this product and look at their sums.",
      "The sum is smallest when the two numbers are equal. What number times itself gives the product?",
      "Example: product 100 gives 10 and 10, with sum 20. Now do yours."]);
    return num(`Two positive numbers (not always whole) add up to ${2 * r}. What is the biggest their product can be?`, big("📈"), r * r, [
      "Try some pairs with this total and look at their products.",
      "The product is biggest when the two numbers are equal. Split the total evenly.",
      "Example: total 20 gives 10 and 10, with product 100. Now do yours."]);
  };
  const telescope = () => {
    const t = pick([1, 2, 3]);
    if (t === 1) { const n = ri(5, 40);
      return mcq(`What is 1/(1×2) + 1/(2×3) + 1/(3×4) + … + 1/(${n}×${n + 1})?`, big("🔭"), `${n}/${n + 1}`, [`${n - 1}/${n}`, `1/${n + 1}`, `${n + 1}/${n + 2}`, `${n}/${n + 2}`], [
        "Each fraction can be split into a difference of two simpler fractions.",
        "1/(k×(k+1)) = 1/k − 1/(k+1). Write out the first few differences and see what cancels.",
        "Example: 1/(1×2) + 1/(2×3) + 1/(3×4) = (1 − 1/2) + (1/2 − 1/3) + (1/3 − 1/4) = 1 − 1/4 = 3/4. Now do yours."]); }
    if (t === 2) { const s = ri(4, 13), n = s * s - 1;
      return num(`What is (√2 − √1) + (√3 − √2) + (√4 − √3) + … + (√${n + 1} − √${n})?`, big("🔭"), s - 1, [
        "Look at the end of each bracket and the start of the next one.",
        "Almost everything cancels. Only the very first and the very last pieces are left.",
        "Example: (√2 − √1) + (√3 − √2) + … + (√9 − √8) = √9 − √1 = 3 − 1 = 2. Now do yours."]); }
    const n = ri(8, 60);
    return num(`What is (2/1) × (3/2) × (4/3) × … × (${n + 1}/${n})?`, big("🔭"), n + 1, [
      "Look at each top and the bottom of the next fraction.",
      "Each top cancels with the next bottom. What is left at the very start and the very end?",
      "Example: (2/1) × (3/2) × (4/3) × (5/4) = 5/1 = 5. Now do yours."]);
  };
  const MP = [
    ["it rains", "it does not rain", "the grass is wet", "the grass is not wet"],
    ["the shape is a square", "the shape is not a square", "the shape has four sides", "the shape does not have four sides"],
    ["Mia studies", "Mia does not study", "Mia passes the test", "Mia does not pass the test"],
    ["the battery is flat", "the battery is not flat", "the torch is dark", "the torch is not dark"],
    ["the number is divisible by 6", "the number is not divisible by 6", "the number is even", "the number is not even"],
    ["the animal is a dog", "the animal is not a dog", "the animal has fur", "the animal does not have fur"],
    ["the gate is open", "the gate is not open", "the cat can get out", "the cat cannot get out"],
    ["the plant gets water", "the plant does not get water", "the plant grows", "the plant does not grow"]
  ];
  const modus = () => {
    const [P, nP, Q, nQ] = pick(MP), t = pick(["pon", "tol", "aff", "den"]), none = "Nothing certain follows.";
    const fact_ = { pon: P, tol: nQ, aff: Q, den: nP }[t];
    const right = { pon: cap(Q) + ".", tol: cap(nP) + ".", aff: none, den: none }[t];
    const wr = { pon: [cap(nQ) + ".", cap(nP) + ".", none], tol: [cap(P) + ".", cap(Q) + ".", none], aff: [cap(P) + ".", cap(nP) + ".", cap(nQ) + "."], den: [cap(Q) + ".", cap(nQ) + ".", cap(P) + "."] }[t];
    const ex = {
      pon: "Example: “If a shape is a triangle, it has three sides.” A shape is a triangle. So it has three sides.",
      tol: "Example: “If a shape is a triangle, it has three sides.” A shape does not have three sides. So it is not a triangle.",
      aff: "Example: “If an animal is a cat, it has whiskers.” An animal has whiskers. It might be a cat or a mouse, so nothing is certain.",
      den: "Example: “If a shape is a square, it has four sides.” A shape is not a square. It could still have four sides (a rectangle), so nothing is certain."
    }[t];
    return mcq(`The rule is: “If ${P}, then ${Q}.” We also know that ${fact_}. Which conclusion is certain?`, big("🧩"), right, wr, [
      "Read “If A, then B” as a one-way street: A leads to B, but B does not have to lead back to A.",
      "Check which part of the rule the fact talks about: the “if” part, the “then” part, or the opposite of one of them. Only some of these cases force an answer.",
      ex + " Now do yours."]);
  };
  const subsets = () => {
    const n = ri(4, 9), t = pick(["all", "size", "has", "nonempty", "even"]), set = "abcdefghij".slice(0, n).split("").join(", ");
    const vis = `{ ${set} }`;
    if (t === "all") return num(`A set has ${n} different things: ${vis}. How many subsets does it have in all (including the empty set and the whole set)?`, big("🗂️"), 2 ** n, [
      "For each thing you decide: in the subset or not. That is a choice of 2 each time.",
      "Multiply the 2 choices for every thing.",
      "Example: a set of 3 things has 2 × 2 × 2 = 8 subsets. Now do yours."]);
    if (t === "size") { const k = ri(2, n - 2);
      return num(`A set has ${n} different things: ${vis}. How many subsets have exactly ${k} things in them?`, big("🗂️"), comb(n, k), [
        "Choosing a subset of a certain size is choosing which things go in. Order does not matter.",
        "Use “n choose k”: multiply down from n for k numbers, then divide by k × (k − 1) × … × 1.",
        "Example: subsets of size 2 from 11 things: (11 × 10) ÷ (2 × 1) = 55. Now do yours."]); }
    if (t === "has") return num(`A set has ${n} different things: ${vis}. How many of its subsets contain the thing “a”?`, big("🗂️"), 2 ** (n - 1), [
      "If “a” is in, you do not have a choice for “a” any more. What about the others?",
      "Each of the other things is still in or out: 2 choices each.",
      "Example: a set of 3 things; subsets with the first thing: 2 × 2 = 4. Now do yours."]);
    if (t === "nonempty") return num(`A set has ${n} different things: ${vis}. How many subsets are neither empty nor the whole set?`, big("🗂️"), 2 ** n - 2, [
      "First count all the subsets. Then think about which two special ones you must remove.",
      "All subsets is 2 for each thing multiplied together. Take away the empty set and the whole set.",
      "Example: a set of 3 things has 8 subsets, so 8 − 2 = 6 that are neither empty nor whole. Now do yours."]);
    return num(`A set has ${n} different things: ${vis}. How many of its subsets have an EVEN number of things (the empty set counts as 0)?`, big("🗂️"), 2 ** (n - 1), [
      "Pair each subset with the one you get by switching the thing “a” in or out. What happens to the size?",
      "Switching one thing always changes odd to even or even to odd, so the subsets split into two equal groups.",
      "Example: a set of 3 things has 8 subsets, half of them even: 4 (the empty set and three of size 2). Now do yours."]);
  };
  const diophantine = () => {
    if (Math.random() < 0.65) {
      for (let tries = 0; tries < 200; tries++) {
        const a = ri(2, 9), b = ri(2, 9); if (a === b) continue;
        const c = ri(20, 70); let cnt = 0; for (let x = 0; x * a <= c; x++) if ((c - a * x) % b === 0) cnt++;
        if (cnt < 1 || cnt > 8) continue;
        return num(`How many ways can you pay exactly ${c} cents using only stamps worth ${a} cents and stamps worth ${b} cents (any number of each, even none of one kind)?`, big("✉️"), cnt, [
          "Decide how many of one kind of stamp you use. Then see whether the rest can be made with the other kind.",
          `Try 0, 1, 2, … of the ${a}-cent stamps. What is left must divide exactly by ${b}. Count the times it works.`,
          "Example: 17 cents with 2-cent and 5-cent stamps. 5-cent stamps: 1 gives 12 left (6 two-cent stamps), 3 gives 2 left (1 two-cent stamp). 0 and 2 leave odd amounts. So 2 ways. Now do yours."]);
      }
    }
    const pairs = [[3, 5], [3, 7], [3, 8], [4, 5], [4, 7], [4, 9], [5, 6], [5, 7], [5, 8], [5, 9], [6, 7], [7, 8], [7, 9], [8, 9]], [a, b] = pick(pairs);
    return num(`Stamps come only in values of ${a} cents and ${b} cents. What is the LARGEST amount you cannot pay exactly?`, big("✉️"), a * b - a - b, [
      "List the amounts you can make in order: single stamps, then sums.",
      `Once you can make ${a} amounts in a row, you can make every amount after them (just add ${a}-cent stamps). The answer is just before that first run.`,
      "Example: stamps 3 and 4 make 3, 4, 6, 7, 8, 9, 10, … From 6 on, every amount works, so the largest you cannot make is 5. Now do yours."]);
  };
  const DIG = [
    { t: "3-digit numbers (100 to 999) have all three digits different", lo: 100, hi: 999, f: d => d[0] !== d[1] && d[1] !== d[2] && d[0] !== d[2], h2: "The first digit cannot be 0. Then the second can be anything except the first, and the third anything except the two used.", ex: "Example: 2-digit numbers with different digits: 9 choices for the first, then 9 for the second, so 81." },
    { t: "3-digit numbers have only odd digits (1, 3, 5, 7, 9)", lo: 100, hi: 999, f: d => d.every(x => x % 2), h2: "Each of the three places has the same list of allowed digits. Multiply the number of choices.", ex: "Example: 2-digit numbers with only even digits (0, 2, 4, 6, 8): first digit cannot be 0, so 4 × 5 = 20." },
    { t: "3-digit numbers are even and have all digits different", lo: 100, hi: 999, f: d => d[2] % 2 === 0 && d[0] !== d[1] && d[1] !== d[2] && d[0] !== d[2], h2: "Split into cases: the last digit is 0, or the last digit is 2, 4, 6 or 8 (then the first digit cannot be 0).", ex: "Example: 2-digit even numbers with different digits. Ends in 0: 9. Ends in 2, 4, 6, 8: 8 each = 32. Total 41." },
    { t: "3-digit numbers have a digit sum that is a multiple of 9", lo: 100, hi: 999, f: d => (d[0] + d[1] + d[2]) % 9 === 0, h2: "A number is a multiple of 9 exactly when its digit sum is. So count the multiples of 9 in the range.", ex: "Example: 2-digit multiples of 9: 18, 27, …, 99, which is 10 numbers." },
    { t: "3-digit numbers have no zero digit", lo: 100, hi: 999, f: d => d.every(x => x > 0), h2: "Each place now has 9 allowed digits. Multiply.", ex: "Example: 2-digit numbers with no zero: 9 × 9 = 81." },
    { t: "3-digit numbers have at least one digit 7", lo: 100, hi: 999, f: d => d.includes(7), h2: "Count the opposite: numbers with no 7 at all. Take that away from all the 3-digit numbers.", ex: "Example: 2-digit numbers with at least one 7: 90 − (8 × 9) = 18." },
    { t: "4-digit numbers have all four digits different", lo: 1000, hi: 9999, f: d => new Set(d).size === 4, h2: "First digit cannot be 0 (9 choices). Then each next place has one fewer allowed digit than the one before, starting from 9.", ex: "Example: 3-digit numbers with different digits: 9 × 9 × 8 = 648." },
    { t: "3-digit numbers have digits in strictly increasing order (like 139)", lo: 100, hi: 999, f: d => d[0] < d[1] && d[1] < d[2], h2: "Once you choose which three different digits to use, there is only one way to order them. Digit 0 can never be used. So it is a choosing problem.", ex: "Example: 2-digit numbers with increasing digits (like 27): choose 2 of the digits 1 to 9: (9 × 8) ÷ 2 = 36." }
  ];
  const digitCount = () => {
    const D = pick(DIG); let c = 0;
    for (let n = D.lo; n <= D.hi; n++) if (D.f(String(n).split("").map(Number))) c++;
    return num(`How many ${D.t}?`, big("🔟"), c, ["Think place by place: how many digits can go in each place?", D.h2, D.ex + " Now do yours."]);
  };
  const invariant = () => {
    if (Math.random() < 0.6) {
      const n = ri(5, 12), h0 = ri(0, n), h1 = ri(0, n), ok = (h0 % 2) === (h1 % 2);
      return mcq(`There are ${n} coins on a table, ${h0} showing heads. In each move you must flip exactly two coins. Can you ever get exactly ${h1} heads?`, big("🪙"), ok ? "Yes" : "No", ["Yes", "No"], [
        "Look at what happens to the number of heads in one move: how can it change?",
        "Flipping two coins changes the number of heads by 2, or by 0. So something stays the same about the number of heads.",
        "Example: 8 coins, 3 heads, moves flip two coins. Heads change by 2 or 0, so the count stays odd. Getting 6 heads is impossible. Now do yours."]);
    }
    const n = ri(5, 30), odd = (n * (n + 1) / 2) % 2 === 1;
    return mcq(`The numbers 1, 2, 3, …, ${n} are on a board. You erase any two numbers and write their difference (the bigger minus the smaller). You repeat until one number is left. Is that last number odd or even?`, big("📋"), odd ? "Odd" : "Even", ["Odd", "Even"], [
      "Look at the total of everything on the board. What happens to it in one move?",
      "Replacing a and b with their difference changes the total by an even amount, so whether the total is odd or even never changes.",
      "Example: numbers 1, 2, 3, 4 have total 10 (even). So the last number is even. Now do yours."]);
  };
  const TR = [
    ["(A or B) and not C", (a, b, c) => (a || b) && !c], ["A and (B or C)", (a, b, c) => a && (b || c)], ["not (A and B)", (a, b, c) => !(a && b)],
    ["A → B (if A then B)", (a, b, c) => !a || b], ["(A → B) and (B → C)", (a, b, c) => (!a || b) && (!b || c)], ["A or (B and C)", (a, b, c) => a || (b && c)],
    ["(A and B) or (not A and C)", (a, b, c) => (a && b) || (!a && c)], ["not A or not B or C", (a, b, c) => !a || !b || c], ["(A or B) → C", (a, b, c) => !(a || b) || c],
    ["A and B and not C", (a, b, c) => a && b && !c], ["(A or C) and (B or C)", (a, b, c) => (a || c) && (b || c)], ["A → (B and C)", (a, b, c) => !a || (b && c)]
  ];
  const truthRows = () => {
    const [name, f] = pick(TR), want = Math.random() < 0.6; let c = 0;
    for (let i = 0; i < 8; i++) if (!!f(!!(i & 4), !!(i & 2), !!(i & 1)) === want) c++;
    return num(`A, B and C can each be true or false (8 rows in all). In how many rows is “${name}” ${want ? "TRUE" : "FALSE"}?`, big("📋"), c, [
      "Write the 8 rows: every mix of true and false for A, B and C.",
      "Work out the smaller parts first, then the whole thing, one row at a time. Remember “→” is false only when the first part is true and the second is false.",
      "Example: “A and B” over 4 rows (A and B only). It is true in just one row, where both are true. Now do yours."]);
  };
  const derange = () => {
    const n = pick([3, 4, 5]), t = pick(["none", "one", "some"]), items = n === 3 ? "3 letters and 3 envelopes" : n === 4 ? "4 hats and 4 owners" : "5 books and 5 owners";
    const D = [1, 0, 1, 2, 9, 44];
    if (t === "none") return num(`${cap(items)} get mixed up and handed back at random. In how many of the ${fact(n)} possible ways does NOBODY get their own?`, big("🎩"), D[n], [
      "Call the right match for each “home”. You need arrangements where every item is in a wrong place.",
      "For small cases, list them. A quick rule: D(n) = (n − 1) × (D(n−1) + D(n−2)), with D(1) = 0 and D(2) = 1.",
      "Example: with 2 items there is only 1 way (swap them). Build up from D(1) = 0 and D(2) = 1 with the rule, one size at a time. Now do yours."]);
    if (t === "one") return num(`${items} get mixed up and handed back at random. In how many ways does EXACTLY one get their own?`, big("🎩"), n * D[n - 1], [
      "Pick which one is right, then make sure none of the rest are right.",
      "The number of choices for the lucky one, times the number of ways the others can all be wrong (one fewer item).",
      "Example: with 6 items, exactly one right: 6 × (ways 5 items are all wrong, which is 44) = 264. Now do yours."]);
    return num(`${items} get mixed up and handed back at random. In how many of the ${fact(n)} ways does AT LEAST one get their own?`, big("🎩"), fact(n) - D[n], [
      "“At least one” is the opposite of “nobody”.",
      "Take the number of ways where nobody gets their own away from all the ways.",
      "Example: with 6 items there are 720 ways in all, 265 with nobody right, so 455 have at least one. Now do yours."]);
  };
  const pathsAvoid = () => {
    const W = ri(3, 6), H = ri(3, 6), bx = ri(1, W - 1), by = ri(1, H - 1);
    const g = (w, h, ax, ay) => { const dp = Array.from({ length: w + 1 }, () => Array(h + 1).fill(0)); dp[0][0] = 1; for (let x = 0; x <= w; x++) for (let y = 0; y <= h; y++) { if (x === ax && y === ay) { dp[x][y] = 0; continue; } if (x || y) dp[x][y] = (x ? dp[x - 1][y] : 0) + (y ? dp[x][y - 1] : 0); } return dp[w][h]; };
    const must = Math.random() < 0.4;
    if (must) return num(`You walk from the bottom-left corner to the top-right corner of a grid that is ${W} blocks wide and ${H} blocks tall, moving only right or up. How many paths pass through the point ${bx} across and ${by} up?`, big("🗺️"), comb(bx + by, bx) * comb(W - bx + H - by, W - bx), [
      "Split every path at the special point: the part before it and the part after it.",
      "Count the paths to the point, count the paths from the point to the end, and multiply.",
      "Example: in a 2 by 2 grid through the point (1, 1): paths to it 2, paths from it 2, so 4. Now do yours."]);
    return num(`You walk from the bottom-left corner to the top-right corner of a grid that is ${W} blocks wide and ${H} blocks tall, moving only right or up. The point ${bx} across and ${by} up is blocked. How many paths avoid it?`, big("🗺️"), g(W, H, bx, by), [
      "Count all paths first. Then think about how many go through the blocked point.",
      "Paths through the blocked point = (paths to it) × (paths from it to the end). Take that away from all the paths.",
      "Example: 2 by 2 grid with (1, 1) blocked: all 6, through it 2 × 2 = 4, so 2 avoid it. Now do yours."]);
  };
  const secondDiff = () => {
    const a = ri(1, 4), b = ri(0, 5), c = ri(0, 6), f = n => a * n * n + b * n + c, seq = [1, 2, 3, 4].map(f).join(", "), t = pick(["next", "tenth", "second"]);
    if (t === "next") return num(`A pattern goes ${seq}, … The jumps between numbers are not the same, but the jumps between the jumps are. What is the next number?`, big("📈"), f(5), [
      "Write down the jumps between the numbers. Then write down the jumps between those jumps.",
      "The second row of jumps stays the same each time. Extend it, then work back up.",
      "Example: 5, 20, 45, 80, … jumps 15, 25, 35, so the next jump is 45 and the next number is 125. Now do yours."]);
    if (t === "tenth") { const n = ri(8, 15); return num(`A pattern goes ${seq}, … and its second jumps are always the same. What is the ${n}th number?`, big("📈"), f(n), [
      "The number in front of n² in the rule is half of the second jump.",
      "Subtract (first half-jump × n²) from each term to see what is left: it should be a simple adding pattern.",
      "Example: 6, 22, 48, 84. Second jump is 10, so use 5n². Left over: 1, 2, 3, 4, which is n. Rule: 5n² + n; the 5th is 130. Now do yours."]); }
    return num(`A pattern goes ${seq}, … Its jumps change by the same amount each time. How much do the jumps change by?`, big("📈"), 2 * a, [
      "Find the jumps between neighbouring numbers first.",
      "Now find the jump between those jumps. It should be the same each time.",
      "Example: 6, 22, 48, 84: jumps 16, 26, 36; the jumps change by 10. Now do yours."]);
  };
  const pythGen = () => {
    const m = ri(2, 9), n = ri(1, m - 1), t = pick(["hyp", "leg1", "leg2", "per"]), a = m * m - n * n, b = 2 * m * n, c = m * m + n * n;
    const ex = "Example: m = 10, n = 1 gives legs 100 − 1 = 99 and 2 × 10 × 1 = 20, hypotenuse 100 + 1 = 101.";
    const h = [`Take two whole numbers m (bigger) and n (smaller) and make a right triangle: legs m² − n² and 2mn, and long side m² + n².`, "", ex + " Now do yours."];
    if (t === "hyp") { h[1] = "The long side (hypotenuse) is m² + n². Square each and add."; return num(`Use m = ${m} and n = ${n}. A right triangle has legs m² − n² and 2×m×n. How long is its longest side (hypotenuse), m² + n²?`, big("📐"), c, h); }
    if (t === "leg1") { h[1] = "Square m, square n, and take the second away from the first."; return num(`Use m = ${m} and n = ${n}. How long is the leg m² − n²?`, big("📐"), a, h); }
    if (t === "leg2") { h[1] = "Multiply 2 by m by n."; return num(`Use m = ${m} and n = ${n}. How long is the leg 2×m×n?`, big("📐"), b, h); }
    h[1] = "Work out the three sides with the rules, then add them."; return num(`Use m = ${m} and n = ${n}. The sides are m² − n², 2×m×n and m² + n². What is the distance all the way round (perimeter)?`, big("📐"), a + b + c, h);
  };
  const allDiff = () => {
    const n = pick([6, 8, 10, 12, 20]), k = ri(2, 3), top = perm(n, k), bot = n ** k;
    if (Math.random() < 0.4) return num(`A fair ${n}-sided die is rolled ${k} times. In how many of the ${bot} equally likely outcomes are all the rolls different?`, big("🎲"), top, [
      "The first roll can be anything. Then the second roll must avoid what has been used.",
      "Multiply the number of choices for each roll: n, then one fewer, and so on.",
      "Example: a 5-sided die rolled 2 times with different results: 5 × 4 = 20. Now do yours."]);
    return mcq(`A fair ${n}-sided die is rolled ${k} times. What is the chance that all the rolls are different?`, big("🎲"), frs(top, bot), [frs(bot - top, bot), frs(n, bot), frs((n - 1) ** k, bot), frs(top, bot * 2)], [
      "Count the outcomes where all rolls are different, and compare with all the outcomes.",
      "Different outcomes: n × (n − 1) × …, one factor for each roll. All outcomes: n multiplied by itself for each roll. Simplify the fraction.",
      "Example: a 4-sided die rolled 2 times: different 4 × 3 = 12 out of 16, which is 3/4. Now do yours."]);
  };
  const josephus = () => {
    const sim = n => { const a = []; for (let i = 1; i <= n; i++) a.push(i); let i = 0; while (a.length > 1) { i = (i + 1) % a.length; a.splice(i, 1); i %= a.length; } return a[0]; };
    if (Math.random() < 0.2) { const k = ri(3, 6); return mcq(`${2 ** k} people stand in a circle, numbered 1 to ${2 ** k}. Starting at 1, you skip one person and remove the next, again and again round the circle. Which number is the LAST person left? (Hint: this is a special size.)`, big("⭕"), "1", ["1", "2", String(2 ** k), String(2 ** k - 1)], [
      "Try a small size like 4 or 8 and see who is left.",
      "In a circle with a power of two people, each full round removes exactly half and leaves the numbering in the same pattern.",
      "Example: 6 people (not a power of 2): 2, 4, 6, 3 and 1 are removed and 5 is left. Powers of 2 behave in a neater way. Now do yours."]); }
    const n = ri(6, 60); let nn = n; if (nn === 13) nn = 14;
    return num(`${nn} people stand in a circle, numbered 1 to ${nn}. Starting at 1, you skip one person and remove the next (so 2 goes first, then 4, and so on round and round). Which number is the LAST person left?`, big("⭕"), sim(nn), [
      "Try small circles first and write down who is left each time.",
      "Find the biggest power of 2 that is not more than the number of people. The winner is 2 × (people − that power) + 1.",
      "Example: 13 people: biggest power of 2 is 8, so 2 × (13 − 8) + 1 = 11. Now do yours."]);
  };

  const mk22 = [inclEx, trailZ, sumDiv, powMod, amgm, telescope, modus, subsets, diophantine, digitCount, invariant, truthRows, derange, pathsAvoid, secondDiff, pythGen, allDiff, josephus];
  const L22 = [
    L("Multiples of either", inclEx, [S("Don't count twice", "🔢", "Numbers that are multiples of both are counted in both lists."), S("The fix", "➖", "Add the two counts, then take away the count of multiples of both. Those are the multiples of the smallest number both go into."), S("Neither", "🚫", "To count numbers that are neither, take the “either” count away from the whole list.")]),
    L("Zeros at the end of a factorial", trailZ, [S("Factorial", "❗", "n! means 1 × 2 × 3 × … × n."), S("Zeros come from 5s", "🔟", "Each zero needs a 2 and a 5. There are plenty of 2s, so count the 5s."), S("Count them", "🧮", "Multiples of 5, plus extra for 25, 125, … Divide and drop the leftover each time.")]),
    L("Adding up divisors", sumDiv, [S("Pairs", "👫", "Divisors come in pairs: 12 = 1×12 = 2×6 = 3×4."), S("Add them", "➕", "Write them all down and add. 1 + 2 + 3 + 4 + 6 + 12 = 28."), S("Perfect numbers", "⭐", "Add the divisors except the number itself. Equal to it means perfect (6 and 28). Bigger is abundant, smaller is deficient.")]),
    L("Remainders of big powers", powMod, [S("A cycle", "♻️", "Remainders of powers repeat. 3, 9, 27, … by 7 leave 3, 2, 6, 4, 5, 1, then again 3, 2, …"), S("Find the length", "📏", "Keep going until you meet 1 (or the start) again. That is the cycle length."), S("Use the exponent", "🎯", "Divide the exponent by the cycle length. The leftover tells you where you land in the cycle.")]),
    L("Smallest sum, biggest product", amgm, [S("Equal is best", "⚖️", "If two positive numbers multiply to a fixed number, their sum is smallest when they are equal."), S("Same idea backwards", "🔄", "If two positive numbers add to a fixed number, their product is biggest when they are equal."), S("Try it", "🧪", "Product 36: 4 × 9 gives sum 13, 6 × 6 gives sum 12. Equal wins.")]),
    L("Sums that cancel", telescope, [S("Telescope", "🔭", "Some sums fold up like a telescope: almost everything cancels."), S("Split", "✂️", "1/(k(k+1)) = 1/k − 1/(k+1). The middle parts cancel in pairs."), S("What is left", "🎯", "Only the very first and the very last pieces survive.")]),
    L("If-then: what is certain?", modus, [S("One way", "➡️", "“If A, then B” means A leads to B. It does not say B leads to A."), S("Two sure moves", "✅", "A is true, so B is true. Or B is false, so A is false."), S("Two traps", "⚠️", "B is true tells you nothing about A. A is false tells you nothing about B.")]),
    L("Counting subsets", subsets, [S("In or out", "🗂️", "Each thing is either in a subset or out: 2 choices."), S("Multiply", "✖️", "With n things there are 2 × 2 × … × 2 (n times) = 2<sup>n</sup> subsets."), S("Size k", "🧮", "Subsets with exactly k things: n choose k, no order.")]),
    L("Stamps and coin sums", diophantine, [S("Whole numbers only", "✉️", "You can only use whole stamps. Try 0, 1, 2, … of one kind."), S("Check the rest", "🔍", "What is left must divide exactly by the other value."), S("Largest impossible", "🚧", "For coprime values a and b, the largest impossible amount is ab − a − b.")]),
    L("Counting numbers with rules", digitCount, [S("Place by place", "🔟", "Count the choices for each place, then multiply."), S("Careful with 0", "⚠️", "The first digit of a normal number cannot be 0."), S("Opposite trick", "🔄", "For “at least one”, count the numbers with none, and take that away from all of them.")]),
    L("What never changes: invariants", invariant, [S("Invariant", "🔒", "Something that stays the same after every allowed move."), S("Odd or even", "🔢", "Often it is whether a count is odd or even."), S("Use it", "🎯", "If the goal would need the invariant to change, the goal is impossible.")]),
    L("Counting true rows", truthRows, [S("All rows", "📋", "With 3 statements there are 2 × 2 × 2 = 8 rows."), S("Build up", "🧱", "Work out “not”, “and”, “or” parts first, then combine them."), S("If-then", "➡️", "“A → B” is false in exactly one case: A true and B false.")]),
    L("Nothing in its place", derange, [S("Derangement", "🎩", "An arrangement where no item is in its own place."), S("Small cases", "📝", "With 2 items: 1 way. With 3 items: 2 ways. With 4 items: 9 ways."), S("Rule", "🔁", "D(n) = (n − 1) × (D(n−1) + D(n−2)). The count with 5 items is 44.")]),
    L("Paths that avoid a spot", pathsAvoid, [S("All paths", "🗺️", "Paths on a grid with right and up moves: choose which moves go right."), S("Through a point", "📍", "Paths to the point times paths from the point to the end."), S("Avoid", "🚧", "Paths that avoid the point = all paths − paths through the point.")]),
    L("Patterns of patterns", secondDiff, [S("Jumps", "📈", "Write the jumps between neighbouring numbers."), S("Jumps of jumps", "📊", "If those jumps change by a steady amount, the pattern comes from n²."), S("Half rule", "½", "The number in front of n² is half the steady change.")]),
    L("Making right triangles", pythGen, [S("Two numbers", "📐", "Pick whole numbers m > n."), S("Three sides", "✨", "m² − n², 2mn and m² + n² always make a right triangle."), S("Check", "✅", "m = 2, n = 1: sides 3, 4, 5. And 3² + 4² = 5².")]),
    L("All different", allDiff, [S("Try again if same", "🎲", "Count outcomes where nothing repeats."), S("Fewer each time", "➖", "First roll: n choices. Second: n − 1. Third: n − 2."), S("Chance", "🥧", "Chance = good outcomes ÷ all outcomes (n multiplied k times).")]),
    L("Circle elimination", josephus, [S("The circle", "⭕", "People stand in a circle and every second one is removed."), S("Powers of 2", "2️⃣", "If there are 2, 4, 8, 16, … people, number 1 is the survivor."), S("The formula", "🎯", "Take the biggest power of 2 that fits, call it p. The survivor is 2 × (n − p) + 1.")]),
    L("Mixed practice", mixOf(mk22), MIXS("Counting tricks, remainders, cancelling sums, if-then logic, subsets, digits, invariants and paths.")),
    L("Level 22 Challenge", mixOf(mk22), MIXS("Level 22 mixes counting, number tricks and logic.")),
  ];

  // ======================= LEVEL 23 =======================
  const linCong = () => {
    const m = pick([7, 9, 11, 13, 15, 17]); let a; do { a = ri(2, m - 1); } while (gcd(a, m) !== 1);
    if (a === 3 && m === 7) return linCong();
    const x0 = ri(1, m - 1), b = a * x0 % m;
    if (Math.random() < 0.3) { let inv = 0; for (let x = 1; x < m; x++) if (a * x % m === 1) inv = x;
      return num(`Find the number x between 1 and ${m - 1} so that ${a} × x leaves remainder 1 when divided by ${m}. (It is called the inverse of ${a} mod ${m}.)`, big("🔑"), inv, [
        "Try x = 1, 2, 3, … and check the remainder of a × x each time.",
        `Multiply ${a} by each number in turn. Stop when the remainder after dividing by ${m} is 1.`,
        "Example: inverse of 3 mod 7: 3×1=3, 3×2=6, 3×3=9 leaves 2, 3×4=12 leaves 5, 3×5=15 leaves 1, so x = 5. Now do yours."]); }
    if (b === 0) return linCong();
    return num(`What is the smallest positive whole number x so that ${a}x leaves remainder ${b} when divided by ${m}?`, big("🔑"), x0, [
      "Try x = 1, 2, 3, … and look at the remainder each time.",
      `Each time x goes up by 1, the remainder goes up by ${a} (and wraps around ${m}). Keep going until you reach the one you want.`,
      "Example: 3x leaves 4 when divided by 7: x=1 gives 3, x=2 gives 6, x=3 gives 2, x=4 gives 5, x=5 gives 1, x=6 gives 4. So x = 6. Now do yours."]);
  };
  const crt = () => {
    const sets = [[3, 4], [3, 5], [4, 5], [5, 7], [3, 7], [4, 7], [5, 6], [7, 8], [3, 8], [5, 8]];
    if (Math.random() < 0.2) { const N = ri(1, 59), r = [3, 4, 5].map(m => N % m);
      return num(`A number leaves remainder ${r[0]} when divided by 3, remainder ${r[1]} when divided by 4 and remainder ${r[2]} when divided by 5. What is the smallest positive number that does this?`, big("🧩"), N, [
        "Start with the biggest divisor and list numbers with the right remainder for it.",
        "Step through that list and keep only the numbers that also work for the next divisor. Then the last one.",
        "Example: remainder 1 by 2, 2 by 3, 3 by 5. Numbers with remainder 3 by 5: 3, 8, 13, 18, 23. Of those, remainder 2 by 3: 8 and 23. Of those, remainder 1 by 2: 23. Now do yours."]); }
    const [m1, m2] = pick(sets), N = ri(1, m1 * m2 - 1);
    return num(`A number leaves remainder ${N % m1} when divided by ${m1} and remainder ${N % m2} when divided by ${m2}. What is the smallest positive number that does this?`, big("🧩"), N, [
      `List numbers that leave the right remainder when divided by ${Math.max(m1, m2)}.`,
      `Go through that list: ${Math.max(m1, m2)} more each time. Stop at the first one that also gives the right remainder for ${Math.min(m1, m2)}.`,
      "Example: remainder 1 by 2 and 2 by 3: numbers with remainder 2 by 3 are 2, 5, 8. The first of these with remainder 1 by 2 is 5. Now do yours."]);
  };
  const totient = () => {
    let n = ri(8, 60); if (n === 12) n = 14;
    let c = 0; for (let k = 1; k <= n; k++) if (gcd(k, n) === 1) c++;
    const t = pick([1, 2, 3]);
    const h = ["A number is coprime to n if it shares no prime factor with n.", "Find the distinct primes of n. For each prime p multiply n by (p − 1)/p. You can also list the numbers that share a factor and take them away.", "Example: n = 12 has primes 2 and 3. 12 × 1/2 × 2/3 = 4. Now do yours."];
    if (t === 1) return num(`How many whole numbers from 1 to ${n} have no common factor with ${n} except 1?`, big("🔢"), c, h);
    if (t === 2) return num(`How many fractions k/${n} with k from 1 to ${n} cannot be simplified?`, big("🍕"), c, h);
    return num(`Euler’s totient φ(${n}) counts the numbers from 1 to ${n} that are coprime to ${n}. What is φ(${n})?`, big("🔢"), c, h);
  };
  const rootPow = () => {
    const r1 = ri(1, 8), r2 = ri(1, 8), s = r1 + r2, p = r1 * r2, t = pick(["sq", "cu", "diff", "recip"]);
    if (s === 5 && p === 4) return rootPow();
    const eq = `x² − ${s}x + ${p} = 0`;
    if (t === "sq") return num(`The roots of ${eq} are r and t. Find r² + t² without having to be told them separately.`, big("🌱"), r1 * r1 + r2 * r2, [
      "For x² − sx + p = 0, the roots add to s and multiply to p.",
      "r² + t² = (r + t)² − 2rt. Use the sum and the product.",
      "Example: x² − 5x + 4 = 0 has sum 5 and product 4: 25 − 8 = 17. Now do yours."]);
    if (t === "cu") return num(`The roots of ${eq} are r and t. Find r³ + t³.`, big("🌱"), r1 ** 3 + r2 ** 3, [
      "For x² − sx + p = 0, the roots add to s and multiply to p.",
      "r³ + t³ = (r + t)³ − 3rt(r + t). Use the sum and the product.",
      "Example: x² − 5x + 4 = 0: 125 − 3×4×5 = 65. Now do yours."]);
    if (t === "diff") return num(`The roots of ${eq} are r and t. Find (r − t)².`, big("🌱"), (r1 - r2) ** 2, [
      "For x² − sx + p = 0, the roots add to s and multiply to p.",
      "(r − t)² = (r + t)² − 4rt.",
      "Example: x² − 5x + 4 = 0: 25 − 16 = 9. Now do yours."]);
    return mcq(`The roots of ${eq} are r and t. What is 1/r + 1/t?`, big("🌱"), frs(s, p), [frs(p, s), frs(s * s, p), frs(1, p), frs(s, p + 1)], [
      "Put the two fractions over the same bottom: 1/r + 1/t = (t + r)/(rt).",
      "The top is the sum of the roots and the bottom is their product. Read both from the equation.",
      "Example: x² − 5x + 4 = 0: sum 5, product 4, so 5/4. Now do yours."]);
  };
  const IP = ["1", "i", "−1", "−i"];
  const powI = () => {
    const t = pick(["one", "prod", "four"]);
    if (t === "one") { const n = ri(5, 100); return mcq(`i is the number with i² = −1. What is i<sup>${n}</sup>?`, big("🌀"), IP[n % 4], IP.filter(x => x !== IP[n % 4]), [
      "The powers of i repeat: i, −1, −i, 1, and then again.",
      "The cycle has 4 steps. Divide the power by 4 and use the remainder to see where you land.",
      "Example: i<sup>22</sup>: 22 = 5 × 4 + 2, and the 2nd in the cycle is −1. Now do yours."]); }
    if (t === "prod") { const a = ri(3, 40), b = ri(3, 40), r = IP[(a + b) % 4];
      return mcq(`i is the number with i² = −1. What is i<sup>${a}</sup> × i<sup>${b}</sup>?`, big("🌀"), r, IP.filter(x => x !== r), [
        "When you multiply powers of the same base, the exponents add.",
        "Add the exponents. Then use the 4-step cycle of the powers of i.",
        "Example: i<sup>6</sup> × i<sup>7</sup> = i<sup>13</sup>, and 13 leaves remainder 1 when divided by 4, so it is i. Now do yours."]); }
    const n = ri(2, 60);
    return mcq(`i is the number with i² = −1. What is i<sup>${n}</sup> + i<sup>${n + 1}</sup> + i<sup>${n + 2}</sup> + i<sup>${n + 3}</sup>?`, big("🌀"), "0", ["0", "1", "i", "−1", "−i"].filter(x => x !== "0").slice(0, 3), [
      "Four powers in a row: look at one full cycle.",
      "The four values in a cycle are 1, i, −1, −i in some order. What do they add to?",
      "Example: i<sup>3</sup> + i<sup>4</sup> + i<sup>5</sup> + i<sup>6</sup> = −i + 1 + i − 1. Add them and see. Now do yours."]);
  };
  const cplx = () => {
    const t = pick(["size", "conj", "re", "im"]);
    if (t === "size") { const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]]);
      return num(`The size (modulus) of the complex number ${a} + ${b}i is √(${a}² + ${b}²). How big is it?`, big("🧭"), c, [
        `Think of the number as a point: ${a} across and ${b} up. How far is it from the start?`,
        "That distance is the long side of a right triangle. Square both numbers, add, then take the square root.",
        "Example: 20 + 21i has size √(400 + 441) = 29. Now do yours."]); }
    if (t === "conj") { const a = ri(1, 9), b = ri(1, 9);
      return num(`What is (${a} + ${b}i) × (${a} − ${b}i)?`, big("🧭"), a * a + b * b, [
        "These two are a pair that differ only in one sign (conjugates). Multiply like brackets.",
        "The middle parts cancel and i × i = −1, so the last part changes sign. What is left?",
        "Example: (11 + 2i)(11 − 2i) = 121 + 4 = 125. Now do yours."]); }
    for (;;) { const a = ri(1, 9), b = ri(1, 9), c = ri(1, 9), d = ri(1, 9), re = a * c - b * d, im = a * d + b * c;
      if (t === "re" && re < 0) continue;
      return num(`Multiply (${a} + ${b}i)(${c} + ${d}i). What is the ${t === "re" ? "real part (the number without i)" : "imaginary part (the number in front of i)"}?`, big("🧭"), t === "re" ? re : im, [
        "Multiply every part of the first bracket by every part of the second, like normal brackets.",
        t === "re" ? "i × i = −1. The plain numbers are the first × first and the last term with its sign changed." : "The i parts are first × last and last × first. Add them.",
        "Example: (1 + 2i)(3 + 4i) = 3 + 4i + 6i + 8i² = 3 − 8 + 10i = −5 + 10i. Now do yours."]); }
  };
  const FIB = [0, 1, 1]; for (let i = 3; i < 60; i++) FIB[i] = FIB[i - 1] + FIB[i - 2];
  const fibTrick = () => {
    const t = pick(["sum", "odd", "even"]), vis = "1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …";
    if (t === "sum") { const n = ri(6, 20); let s = 0; for (let i = 1; i <= n; i++) s += FIB[i];
      return num(`Fibonacci numbers: ${vis} (each is the sum of the two before). What is the sum of the first ${n} of them?`, big("🐚"), s, [
        "Add up the first few and compare each total with a Fibonacci number a little further on.",
        "The sum of the first n Fibonacci numbers is one less than the Fibonacci number two places after position n.",
        "Example: first 5: 1 + 1 + 2 + 3 + 5 = 12, and the 7th is 13, so 13 − 1 = 12. Now do yours."]); }
    if (t === "odd") { const n = ri(4, 14); let s = 0; for (let i = 1; i <= n; i++) s += FIB[2 * i - 1];
      return num(`Fibonacci numbers: ${vis}. What is the sum of the first ${n} numbers in odd positions (1st, 3rd, 5th, …)?`, big("🐚"), s, [
        "Add the first few (1st, 3rd, 5th, …) and compare with the list.",
        "The total of the odd-position ones equals the Fibonacci number at the next even position after the last one you used.",
        "Example: 1st + 3rd + 5th = 1 + 2 + 5 = 8, which is the 6th Fibonacci number. Now do yours."]); }
    const N = ri(10, 60), c = Math.floor(N / 3);
    return num(`Fibonacci numbers: ${vis}. How many of the first ${N} Fibonacci numbers are EVEN?`, big("🐚"), c, [
      "Look at the odd/even pattern of the list: odd, odd, even, …",
      "Two odds add to an even; an odd and an even add to an odd. So the pattern repeats in blocks of the same size.",
      "Example: in the first 9, evens are at positions 3, 6 and 9: that is 3. Now do yours."]);
  };
  const IND = [
    { s: "1 + 2 + 3 + … + n = n(n + 1)/2", base: 1, add: "k + 1", goal: "(k + 1)(k + 2)/2", wg: ["k(k + 1)/2 + 1", "(k + 1)(k + 1)/2", "(k + 2)(k + 3)/2"] },
    { s: "1 + 3 + 5 + … + (2n − 1) = n²", base: 1, add: "2k + 1", goal: "(k + 1)²", wg: ["k² + 1", "(k + 2)²", "k² + 2k"] },
    { s: "2 + 4 + 6 + … + 2n = n(n + 1)", base: 2, add: "2k + 2", goal: "(k + 1)(k + 2)", wg: ["k(k + 1) + 2", "(k + 1)(k + 1)", "(k + 2)(k + 3)"] },
    { s: "1 + 2 + 4 + … + 2<sup>n−1</sup> = 2<sup>n</sup> − 1", base: 1, add: "2<sup>k</sup>", goal: "2<sup>k+1</sup> − 1", wg: ["2<sup>k</sup> − 2", "2<sup>k+1</sup>", "2<sup>k+2</sup> − 1"] },
    { s: "1² + 2² + … + n² = n(n + 1)(2n + 1)/6", base: 1, add: "(k + 1)²", goal: "(k + 1)(k + 2)(2k + 3)/6", wg: ["k(k + 1)(2k + 1)/6 + 1", "(k + 1)(k + 2)(2k + 1)/6", "(k + 2)(k + 3)(2k + 5)/6"] },
    { s: "1×2 + 2×3 + … + n(n + 1) = n(n + 1)(n + 2)/3", base: 2, add: "(k + 1)(k + 2)", goal: "(k + 1)(k + 2)(k + 3)/3", wg: ["k(k + 1)(k + 2)/3 + 1", "(k + 1)(k + 2)(k + 2)/3", "(k + 2)(k + 3)(k + 4)/3"] }
  ];
  const INDC = [
    ["In a proof by induction, what is the “inductive hypothesis”?", "We assume the statement is true for n = k", ["We assume the statement is false for n = k", "We check the statement for n = 1", "We prove the statement for every n at once"]],
    ["What job does the “base case” do?", "It shows the statement is true for the first value, such as n = 1", ["It assumes the statement is true for n = k", "It shows the step from k to k + 1", "It shows the statement is false for n = 0"]],
    ["What must the “inductive step” show?", "If it is true for n = k, then it is true for n = k + 1", ["It is true for n = 1", "It is true for every n up to 100", "It is false for n = k + 1"]],
    ["You check n = 1, 2, 3, 4 and a claim works every time. Is that a proof for every n?", "No, it only shows the pattern holds so far", ["Yes, four cases are enough", "Yes, if the numbers are small", "Yes, as long as there is no counterexample yet"]],
    ["Why does induction work, like a row of dominoes?", "The first one falls, and each falling one knocks over the next", ["Every domino falls by itself", "Only the last one needs to be pushed", "The middle ones fall first"]]
  ];
  const induct = () => {
    const t = pick(["base", "add", "goal", "con"]), I = pick(IND);
    if (t === "base") return num(`You want to prove by induction: ${I.s}. For the base case n = 1, what is the value of the LEFT side?`, big("🎹"), I.base, [
      "The left side for n = 1 is just the first term (the sum has only one term).",
      "Put n = 1 into the pattern of the left side and work it out.",
      "Example: for 3 + 6 + 9 + … + 3n, the left side at n = 1 is just 3. Now do yours."]);
    if (t === "add") return mcq(`You want to prove by induction: ${I.s}. You assume it is true for n = k. To get to n = k + 1, what do you add to both sides?`, big("🎹"), I.add, shuf(IND.filter(x => x !== I)).map(x => x.add).concat(["k"]), [
      "Going from k terms to k + 1 terms means adding one more term to the left side.",
      "The new term is the pattern’s rule with n = k + 1.",
      "Example: for 5 + 10 + … + 5n, the new term is 5(k + 1). Now do yours."]);
    if (t === "goal") return mcq(`You want to prove by induction: ${I.s}. What must the right side become for n = k + 1?`, big("🎹"), I.goal, I.wg, [
      "Replace every n in the right side with k + 1.",
      "Put k + 1 in each place n appeared and keep the brackets.",
      "Example: the right side n(n + 3) becomes (k + 1)(k + 4). Now do yours."]);
    const c = pick(INDC);
    return mcq(c[0], big("🎹"), c[1], c[2], [
      "Think of the two parts of induction: how it starts and how it keeps going.",
      "The first part handles one small case. The second part is an if-then about the next number.",
      "Example: for dominoes, you push the first one, and each one falling knocks the next. Now do yours."]);
  };
  const SYL = [
    { p: ["All A are B.", "All B are C."], r: "All A are C.", w: ["All C are A.", "Some A are not C.", "No A are C."] },
    { p: ["All A are B.", "Some C are A."], r: "Some C are B.", w: ["All C are B.", "No C are B.", "All B are A."] },
    { p: ["No A are B.", "All C are A."], r: "No C are B.", w: ["Some C are B.", "All B are C.", "All C are B."] },
    { p: ["All A are B.", "No B are C."], r: "No A are C.", w: ["Some A are C.", "All C are A.", "All A are C."] },
    { p: ["Some A are B.", "All B are C."], r: "Some A are C.", w: ["All A are C.", "No A are C.", "All C are A."] }
  ];
  const THINGS = [["zibs", "zabs", "zubs"], ["wugs", "fips", "dops"], ["glims", "frons", "tweks"], ["bloops", "snarfs", "plinks"], ["mogs", "tavs", "relks"], ["quibs", "lorns", "vips"]];
  const syllogism = () => {
    if (Math.random() < 0.2) { const th = pick(THINGS);
      return mcq(`All ${th[0]} are ${th[1]}. Some ${th[1]} are ${th[2]}. Which one MUST be true?`, big("🧩"), `We cannot tell if any ${th[0]} are ${th[2]}`, [`Some ${th[0]} are ${th[2]}.`, `No ${th[0]} are ${th[2]}.`, `All ${th[0]} are ${th[2]}.`], [
        "Draw circles: ones for the first sentence, then see how much the second sentence tells you.",
        "The second sentence says some of a bigger group, but not which. They might be outside the smaller group.",
        "Example: All poodles are dogs. Some dogs are brown. Must some poodles be brown? No. Now do yours."]); }
    const T = pick(SYL), th = pick(THINGS), tt = s => s.replace(/\b[ABC]\b/g, m => ({ A: th[0], B: th[1], C: th[2] }[m]));
    return mcq(`${tt(T.p[0])} ${tt(T.p[1])} Which conclusion MUST be true?`, big("🧩"), tt(T.r), T.w.map(tt), [
      "Draw circles for the groups. Put the first sentence in, then the second.",
      "A conclusion must be true in every possible drawing, not just in one. Try to draw a picture that breaks each choice.",
      "Example: All dogs are animals. All animals breathe. So all dogs breathe. Now do yours."]);
  };
  const threeSets = () => {
    const ab = ri(0, 5), ac = ri(0, 5), bc = ri(0, 5), abc = ri(1, 4), oa = ri(2, 9), ob = ri(2, 9), oc = ri(2, 9), none = ri(2, 9);
    const A = oa + ab + ac + abc, B = ob + ab + bc + abc, C = oc + ac + bc + abc, AB = ab + abc, AC = ac + abc, BC = bc + abc;
    const un = oa + ob + oc + ab + ac + bc + abc, total = un + none, t = pick(["union", "none", "onlyA"]);
    const info = `${A} like pizza, ${B} like pasta, ${C} like salad. ${AB} like pizza and pasta, ${AC} like pizza and salad, ${BC} like pasta and salad, and ${abc} like all three.`;
    const hint3 = "Example: pizza 10, pasta 8, salad 6; pizza&pasta 3, pizza&salad 2, pasta&salad 2, all three 1. At least one: 10 + 8 + 6 − 3 − 2 − 2 + 1 = 18. Now do yours.";
    if (t === "union") return num(`In a class: ${info} How many like at least one of the three?`, big("🍕"), un, ["Adding the three groups counts the people in two groups twice, and in all three groups three times.", "Add the three groups, subtract the three pair-overlaps, then add back the all-three people (they got removed too many times).", hint3]);
    if (t === "none") return num(`A class has ${total} students. ${info} How many like none of them?`, big("🍕"), none, ["First find how many like at least one of the three.", "Use: add the three groups, subtract the three overlaps, add back the all-three people. Then take the result away from the whole class.", hint3]);
    return num(`In a class: ${info} How many like pizza ONLY (not pasta, not salad)?`, big("🍕"), oa, ["Start with everyone who likes pizza and take away those who also like something else.", "Take away the pizza-and-pasta and pizza-and-salad groups, but the all-three people were taken away twice, so put them back once.", "Example: pizza 10, pizza&pasta 3, pizza&salad 2, all three 1: 10 − 3 − 2 + 1 = 6. Now do yours."]);
  };
  const bayes = () => {
    const q = pick([50, 100, 200]), s = pick([80, 90, 100]), f = q === 50 ? 10 : pick([5, 10]);
    const TP = q * s / 100, FP = (1000 - q) * f / 100, t = pick(["pos", "fp", "frac"]);
    const setup = `A machine checks 1000 apples for a hidden bruise. ${q} apples really have a bruise. The machine says “bruise” for ${s} out of every 100 bruised apples, and also (wrongly) for ${f} out of every 100 good apples.`;
    if (t === "pos") return num(`${setup} How many apples does it say “bruise” for in total?`, big("🍎"), TP + FP, ["Two groups get the “bruise” signal: bruised apples that are caught, and good apples that are wrongly flagged.", "Work out each group as a part of its own total (the bruised ones, and the good ones), then add.", "Example: 200 apples, 50 bruised, caught 100% and 10% of good ones flagged: 50 + 15 = 65. Now do yours."]);
    if (t === "fp") return num(`${setup} How many good apples are wrongly flagged?`, big("🍎"), FP, ["Count the good apples first: the whole 1000 minus the bruised ones.", "Take the false-alarm percent of the good apples.", "Example: 200 apples, 50 bruised, 10 out of 100 good ones flagged: 150 good, 15 flagged. Now do yours."]);
    return mcq(`${setup} If the machine says “bruise” for an apple, what fraction of such apples really are bruised?`, big("🍎"), frs(TP, TP + FP), [frs(TP, q), frs(FP, TP + FP), frs(q, 1000), frs(TP, 1000)], ["Imagine all 1000 apples and count: how many are flagged correctly, and how many are flagged wrongly?", "The fraction is the correctly flagged apples divided by ALL flagged apples (correct plus wrong).", "Example: 200 apples, 50 bruised, all caught, 15 good ones flagged: 50 of 65 flagged are bruised = 10/13. Now do yours."]);
  };
  const expectCount = () => {
    const t = pick(["heads", "six", "hh", "hat"]);
    if (t === "heads") { const n = 2 * ri(6, 40); return num(`A fair coin is flipped ${n} times. On average, how many heads would you expect?`, big("🪙"), n / 2, ["For one flip, the expected number of heads is the chance of heads.", "Expected numbers add up: multiply the single-flip average by the number of flips.", "Example: 10 flips with a coin that lands heads half the time: 5. Now do yours (same idea)."]); }
    if (t === "six") { const n = 6 * ri(2, 9); return num(`A fair die is rolled ${n} times. On average, how many sixes would you expect?`, big("🎲"), n / 6, ["For one roll, the expected number of sixes is the chance of a six.", "Expected numbers add up: multiply the one-roll average by the number of rolls.", "Example: 60 rolls, looking for a five: 60 ÷ 6 = 10. Now do yours."]); }
    if (t === "hh") { const k = ri(3, 15), n = 4 * k + 1; return num(`A fair coin is flipped ${n} times. A “double head” is two heads in a row (in positions next to each other). On average, how many double heads would you expect? (Overlaps count: HHH has two.)`, big("🪙"), k, ["Look at each pair of neighbours. How many pairs are there?", "Each pair is two heads with chance 1/4. Expected counts add: (number of pairs) × 1/4.", "Example: 9 flips: 8 pairs, 8 × 1/4 = 2. Now do yours."]); }
    const n = ri(5, 30); return num(`${n} people each put a hat in a pile. The hats are handed back completely at random. On average, how many people get their own hat back?`, big("🎩"), 1, ["Look at one person. What is the chance they get their own hat?", "Each person has the chance 1 divided by the number of people. Add up the chances for everybody.", "Example: 4 people: each has chance 1/4. Add the four chances. Now do yours."]);
  };
  const TRI = []; for (let a = 3; a <= 30; a++) for (let b = a; b <= 30; b++) for (let c = b; c <= 30 && c < a + b; c++) {
    const P = (a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c), r = Math.round(Math.sqrt(P)); if (r * r === P && r % 4 === 0 && !(a === 3 && b === 4 && c === 5)) TRI.push([a, b, c, r / 4]);
  }
  const heron = () => {
    const [a, b, c, A] = pick(TRI);
    return num(`A triangle has sides ${a}, ${b} and ${c}. Use Heron’s formula, area = √(s(s−${a})(s−${b})(s−${c})) where s is half the perimeter. What is the area?`, big("🔺"), A, [
      "First find s: add the three sides and halve.",
      "Work out s minus each side, multiply the four numbers together, and take the square root.",
      "Example: sides 3, 4, 5: s = 6; 6 × 3 × 2 × 1 = 36; √36 = 6. Now do yours."]);
  };
  const chords = () => {
    const t = pick(["chord", "tan", "tanchord"]);
    if (t === "chord") { for (;;) { const a = ri(2, 9), b = ri(2, 9), p = a * b, c = ri(2, 12); if (p % c !== 0 || c === a || c === b) continue; const d = p / c, sol = Math.random() < 0.5 ? d : c, given = sol === d ? c : d;
      return num(`Two chords cross inside a circle. One is cut into pieces ${a} and ${b}. The other is cut into a piece ${given} and a piece x. What is x?`, big("⭕"), sol, ["When chords cross, the two pieces of one multiply to the same number as the two pieces of the other.", `Multiply ${a} by ${b}, then divide by the piece you know to find x.`, "Example: pieces 3 and 8 on one chord; 4 and x on the other. 3 × 8 = 24, so x = 24 ÷ 4 = 6. Now do yours."]); } }
    const tg = ri(4, 12); const dv = divsOf(tg * tg).filter(e => e < tg && e >= 2); if (!dv.length) return chords();
    const e = pick(dv), w = tg * tg / e;
    if (t === "tan") return num(`From a point outside a circle, a tangent touches the circle. A straight line (secant) from the same point enters the circle: the outside part is ${e} and the whole line through the circle is ${w}. How long is the tangent?`, big("⭕"), tg, ["There is a rule linking the tangent length with the whole secant and its outside part.", `Tangent squared = (outside part) × (whole secant). Multiply, then take the square root.`, "Example: outside part 7 and whole secant 28: 7 × 28 = 196, tangent = 14. Now do yours."]);
    return num(`From a point outside a circle, a tangent of length ${tg} touches the circle. A secant from the same point has outside part ${e}. How long is the part of the secant INSIDE the circle (the chord)?`, big("⭕"), w - e, ["The tangent squared equals the outside part times the whole secant.", "Find the whole secant by dividing the tangent squared by the outside part. The inside part is the whole minus the outside.", "Example: tangent 14, outside part 7: whole = 196 ÷ 7 = 28, inside = 28 − 7 = 21. Now do yours."]);
  };
  const bisector = () => {
    let p, q, u, v, ok = false;
    for (let i = 0; i < 80 && !ok; i++) { p = ri(2, 6); q = ri(2, 6); if (p === q) continue; v = ri(1, 4); u = v + ri(1, 2); ok = (p + q) * u > (p + q) * v && Math.abs(p - q) * u < (p + q) * v; }
    if (!ok) { p = 3; q = 2; u = 3; v = 2; }
    const AB = p * u, AC = q * u, BC = (p + q) * v, t = pick(["bd", "dc", "ab"]);
    const ex = "Example: AB = 6, AC = 4, BC = 10. BD : DC = 6 : 4 = 3 : 2, so BD = 6 and DC = 4. Now do yours.";
    const h1 = "An angle bisector from A cuts the opposite side BC at D into pieces in the same ratio as the two sides next to the angle: BD : DC = AB : AC.";
    if (t === "bd") return num(`In triangle ABC, AB = ${AB}, AC = ${AC} and BC = ${BC}. The bisector of angle A meets BC at D. How long is BD?`, big("📐"), p * v, [h1, "Add the ratio parts, then share BC in that ratio.", ex]);
    if (t === "dc") return num(`In triangle ABC, AB = ${AB}, AC = ${AC} and BC = ${BC}. The bisector of angle A meets BC at D. How long is DC?`, big("📐"), q * v, [h1, "Add the ratio parts, then share BC in that ratio.", ex]);
    return num(`In triangle ABC, AC = ${AC}, BD = ${p * v} and DC = ${q * v}, where D is where the bisector of angle A meets BC. How long is AB?`, big("📐"), AB, [h1, "Use the ratio BD : DC. AB is to AC the same way.", "Example: AC = 4, BD = 6, DC = 4: AB = 4 × 6 ÷ 4 = 6. Now do yours."]);
  };
  const digitsPow = () => {
    if (Math.random() < 0.3) { const b = ri(8, 40), a = b + ri(3, 20); const v = (2n ** BigInt(a)) * (5n ** BigInt(b));
      return num(`How many digits does 2<sup>${a}</sup> × 5<sup>${b}</sup> have?`, big("🔢"), String(v).length, ["Pair up as many 2s and 5s as you can. Each pair makes a 10.", `That leaves the extra 2s. A power of 10 just adds zeros at the end. How many digits does the leftover number have, plus the zeros?`, "Example: 2<sup>7</sup> × 5<sup>3</sup> = 10<sup>3</sup> × 2<sup>4</sup> = 16 followed by 3 zeros = 5 digits. Now do yours."]); }
    const L = { 2: 0.301, 3: 0.477, 5: 0.699, 7: 0.845, 4: 0.602, 6: 0.778, 8: 0.903, 9: 0.954 };
    for (let i = 0; i < 300; i++) { const a = pick([2, 3, 4, 5, 6, 7, 8, 9]), n = ri(12, 90), d = String(BigInt(a) ** BigInt(n)).length;
      if (Math.floor(n * L[a]) + 1 !== d) continue;
      return num(`How many digits does ${a}<sup>${n}</sup> have? (Use log<sub>10</sub> ${a} ≈ ${L[a]}.)`, big("🔢"), d, ["The number of digits of a number is one more than the whole part of its log base 10.", `log of ${a}<sup>${n}</sup> is ${n} × log ${a}. Multiply, drop the decimals, and add 1.`, "Example: 2<sup>10</sup>: 10 × 0.301 = 3.01; whole part 3, plus 1 gives 4 digits (1024). Now do yours."]); }
    return num(`How many digits does 2<sup>20</sup> have? (Use log<sub>10</sub> 2 ≈ 0.301.)`, big("🔢"), 7, ["The number of digits is one more than the whole part of its log.", "Multiply the exponent by the log. Drop the decimals, add 1.", "Example: 2<sup>10</sup>: 10 × 0.301 = 3.01 so 4 digits. Now do yours."]);
  };
  const PM = [
    ["Assume the opposite is true and show it leads to something impossible.", "By contradiction"],
    ["Check it for the first case, then show that if it works for one case it works for the next.", "By induction"],
    ["Instead of “if P then Q”, prove “if not Q then not P”.", "By contrapositive"],
    ["Find just one example that breaks the claim.", "By counterexample"],
    ["Split the possibilities into groups (like even and odd) and prove each group on its own.", "By cases"],
    ["Start from what is given and follow valid steps straight to the claim.", "A direct proof"],
    ["Suppose there is a smallest number that makes the claim false, and show that is impossible.", "By contradiction"],
    ["Show it for n = 1, then show that going from k to k + 1 keeps it true.", "By induction"],
    ["Show that a number which is not Q cannot be P, to prove P → Q.", "By contrapositive"],
    ["Say: “Take n = 7. The claim says X, but it is false for 7.”", "By counterexample"],
    ["Say: “If n is even … and if n is odd …” and finish both parts.", "By cases"],
    ["Write out the algebra line by line from the starting facts to the target.", "A direct proof"]
  ];
  const proofMethod = () => {
    const [d, m] = pick(PM), [d2, m2] = pick(PM.filter(z => z[1] !== m)), all = ["By contradiction", "By induction", "By contrapositive", "By counterexample", "By cases", "A direct proof"];
    return mcq(`A proof goes like this: “${d}” Which method is it?`, big("🏛️"), m, shuf(all.filter(x => x !== m)), [
      "Think about the shape of the argument: where does it start and what does it end with?",
      "Some methods start by assuming the opposite, some split into groups, some go one step at a time, and some just show one example. Match the shape.",
      `Example: the proof “${d2}” is ${m2.toLowerCase().replace("a direct proof", "a direct proof")}. Now match yours.`]);
  };
  const lockers = () => {
    const N = ri(30, 200), t = pick(["count", "last", "one"]);
    if (t === "count") return num(`${N} lockers are all closed. Student 1 opens every locker. Student 2 changes every 2nd locker (opens it if closed, closes it if open). Student 3 changes every 3rd locker, and so on up to student ${N}. How many lockers are open at the end?`, big("🔐"), Math.floor(Math.sqrt(N)), [
      "A locker is changed once for each of its divisors. When does a locker end up open?",
      "It ends up open if it was changed an odd number of times. Which numbers have an odd number of divisors?",
      "Example: 20 lockers: the open ones are 1, 4, 9, 16, which is 4. Now do yours (same idea, different number of lockers)."]);
    if (t === "last") return num(`${N} lockers are all closed. Student 1 opens every locker, student 2 changes every 2nd, student 3 changes every 3rd, and so on up to student ${N}. What is the number of the highest locker that is open at the end?`, big("🔐"), Math.floor(Math.sqrt(N)) ** 2, [
      "A locker is changed once for each divisor of its number.",
      "Open at the end means an odd number of divisors. Divisors usually come in pairs, except for one special kind of number.",
      "Example: 20 lockers: the open lockers are 1, 4, 9, 16. The highest is 16. Now do yours."]);
    let m = ri(20, 150); if (m === 12) m = 13; const r = Math.floor(Math.sqrt(m)) ** 2 === m;
    return mcq(`${m} lockers (and ${m} students): student 1 opens every locker, student 2 changes every 2nd, student 3 changes every 3rd, and so on. Is locker number ${m} open or closed at the end?`, big("🔐"), r ? "Open" : "Closed", ["Open", "Closed"], [
      "Any locker is changed once for each divisor of its number. Think about which students change your locker.",
      "Count the divisors of your number: an odd count means open. Divisors come in pairs, except when a number multiplied by itself gives your locker number.",
      "Example: locker 12 has divisors 1, 2, 3, 4, 6, 12 (6 of them, even): closed. Now do yours."]);
  };

  const mk23 = [linCong, crt, totient, rootPow, powI, cplx, fibTrick, induct, syllogism, threeSets, bayes, expectCount, heron, chords, bisector, digitsPow, proofMethod, lockers];
  const L23 = [
    L("Division in clock numbers", linCong, [S("Clock numbers", "🕒", "“Mod 7” means we only keep the remainder after dividing by 7."), S("Solving", "🔑", "To solve ax leaves b, try x = 1, 2, 3, … and watch the remainders."), S("Inverse", "↩️", "The inverse of a is the x where a × x leaves remainder 1. It exists when a and the modulus share no factor.")]),
    L("Chinese remainders", crt, [S("Two clues", "🧩", "Two remainder clues fit exactly one number in each block of m × n."), S("Step through", "🪜", "List numbers that fit the bigger clue, stepping by that divisor. Test each against the other clue."), S("Smallest", "🎯", "Start the list at the remainder itself, so you find the smallest.")]),
    L("Counting coprime numbers", totient, [S("Coprime", "🤝", "Two numbers are coprime when they share no factor except 1."), S("φ(n)", "🔢", "φ(n) counts the numbers from 1 to n that are coprime to n."), S("Shortcut", "⚡", "For each prime p dividing n, multiply n by (p − 1)/p.")]),
    L("Roots without solving", rootPow, [S("Sum and product", "🌱", "For x² − sx + p = 0, the roots add to s and multiply to p."), S("Square trick", "✨", "r² + t² = (r + t)² − 2rt."), S("Other forms", "🧰", "r³ + t³ = (r + t)³ − 3rt(r + t), and (r − t)² = (r + t)² − 4rt.")]),
    L("Powers of i", powI, [S("Imaginary i", "🌀", "i is a number with i² = −1."), S("The cycle", "🔁", "i, −1, −i, 1, then it repeats every 4 powers."), S("Use remainders", "➗", "Divide the power by 4. The remainder tells you the place in the cycle (remainder 0 is the last one, 1).")]),
    L("Complex numbers", cplx, [S("Two parts", "🧭", "a + bi has a real part a and an imaginary part b."), S("Multiply", "✖️", "(a + bi)(c + di) = (ac − bd) + (ad + bc)i, because i² = −1."), S("Size", "📏", "The size of a + bi is √(a² + b²). A pair a + bi and a − bi multiplies to a² + b².")]),
    L("Fibonacci tricks", fibTrick, [S("The list", "🐚", "1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …"), S("Sums", "➕", "The first n numbers add to the number two places after n, minus 1."), S("Evens", "2️⃣", "Odd, odd, even, odd, odd, even … every third one is even.")]),
    L("Induction: the steps", induct, [S("Dominoes", "🎹", "Induction proves a claim for every whole number."), S("Two parts", "🪜", "Base case: check n = 1. Step: assume it works for k, show it works for k + 1."), S("The step", "➡️", "Use the assumption, add one more term, and make the result look like the formula with k + 1.")]),
    L("Which conclusion must follow?", syllogism, [S("Circles", "⭕", "Draw each group as a circle."), S("All, some, no", "🧩", "“All A are B”: circle A inside circle B. “No A are B”: circles apart. “Some”: they overlap."), S("Must", "🔒", "A conclusion must hold in every picture that matches the sentences.")]),
    L("Three overlapping sets", threeSets, [S("Add", "➕", "|A| + |B| + |C| counts people in two sets twice."), S("Subtract", "➖", "Take away |A∩B|, |A∩C| and |B∩C|."), S("Add back", "🔁", "People in all three were counted 3 times and removed 3 times, so add them back once.")]),
    L("Bayes by counting", bayes, [S("Imagine 1000", "🍎", "Turn chances into real counts of things."), S("Two groups", "👥", "A signal comes from real cases and from false alarms."), S("Fraction", "🥧", "Chance it is real given the signal = real signals ÷ all signals.")]),
    L("Expected counts", expectCount, [S("Add averages", "🧮", "The average number of successes is the sum of the chances of each try."), S("Easy", "✅", "Even if tries depend on each other, averages still add."), S("Examples", "🎲", "10 coin flips: 10 × 1/2 = 5 heads on average.")]),
    L("Heron's formula", heron, [S("Only sides", "🔺", "You can find the area from just the three sides."), S("The formula", "📐", "s = (a + b + c) ÷ 2, area = √(s(s−a)(s−b)(s−c))."), S("Check", "✅", "3, 4, 5: s = 6, 6 × 3 × 2 × 1 = 36, area 6.")]),
    L("Crossing chords and tangents", chords, [S("Chords", "⭕", "Two chords crossing: (piece × piece) on one = (piece × piece) on the other."), S("Tangent", "👆", "A tangent touches the circle once."), S("Rule", "📏", "tangent² = outside part × whole secant.")]),
    L("Angle bisector rule", bisector, [S("Bisector", "📐", "A line that cuts an angle exactly in half."), S("The ratio", "⚖️", "It cuts the opposite side in the same ratio as the two sides next to the angle."), S("Share", "🍰", "Share the side in that ratio.")]),
    L("How many digits?", digitsPow, [S("Logs count digits", "🔢", "Digits of N = (whole part of log<sub>10</sub> N) + 1."), S("Powers", "⚡", "log(aⁿ) = n × log a."), S("Pairs make tens", "🔟", "Each 2 × 5 is a 10, which only adds a zero.")]),
    L("Which proof method?", proofMethod, [S("Direct", "➡️", "Start from the facts and go straight to the claim."), S("Opposites", "🔄", "Contradiction assumes the claim is false. Contrapositive proves “not Q → not P”."), S("Others", "🧰", "Induction builds up one step. Cases split into groups. A counterexample breaks a claim with one example.")]),
    L("Lockers and switches", lockers, [S("Toggle", "🔐", "Each student switches the lockers that are multiples of their number."), S("Divisors", "🔢", "A locker is switched once for each of its divisors."), S("Squares", "🟦", "Odd number of divisors happens only for perfect squares.")]),
    L("Mixed practice", mixOf(mk23), MIXS("Remainders, complex numbers, induction, sets, chance, geometry theorems and proof methods.")),
    L("Level 23 Challenge", mixOf(mk23), MIXS("Level 23 mixes number theory, algebra, geometry, chance and proof.")),
  ];

  // ======================= LEVEL 24 =======================
  const committee = () => {
    const n = ri(7, 13), k = ri(3, Math.min(n - 3, 7)), t = pick(["in", "out", "inout", "either"]);
    const names = "Ann, Ben, Cy, Di, Ed, Flo, Gus, Hal, Ivy, Jo, Kim, Lee, Max".split(", ").slice(0, n);
    const base = `A club has ${n} members. A committee of ${k} is chosen.`;
    if (t === "in") return num(`${base} Ann must be on the committee. How many committees are possible?`, big("👥"), comb(n - 1, k - 1), ["If Ann is certain to be on it, how many places are left and how many people are left to choose from?", "Choose the remaining places from the remaining people. Order does not matter.", "Example: 6 people, committee of 3 with Ann on it: choose 2 from 5: (5 × 4) ÷ 2 = 10. Now do yours."]);
    if (t === "out") return num(`${base} Ben cannot be on the committee. How many committees are possible?`, big("👥"), comb(n - 1, k), ["If Ben is out, how many people can still be chosen?", "Choose the full committee from the people left. Order does not matter.", "Example: 6 people, committee of 3 without Ben: choose 3 from 5: 10. Now do yours."]);
    if (t === "inout") return num(`${base} Ann must be on it and Ben must not be on it. How many committees are possible?`, big("👥"), comb(n - 2, k - 1), ["Ann takes one place. Ben is not allowed. How many places and how many people are left?", "Choose the remaining places from the people who are neither Ann nor Ben.", "Example: 6 people, committee of 3, Ann in and Ben out: choose 2 from 4: 6. Now do yours."]);
    return num(`${base} At least one of Ann and Ben must be on it. How many committees are possible?`, big("👥"), comb(n, k) - comb(n - 2, k), ["“At least one of two” is the opposite of “neither of the two”.", "Count all committees, then take away the committees that have neither Ann nor Ben.", "Example: 6 people, committee of 3, at least one of Ann and Ben: 20 − (choose 3 from 4 = 4) = 16. Now do yours."]);
  };
  const together = () => {
    const n = ri(5, 7), t = pick(["tog", "apart", "three"]), vis = big("🧍".repeat(n), 1.2);
    if (t === "tog") return num(`${n} friends line up in a row for a photo. Two of them, Ann and Ben, must stand next to each other. How many different lines are possible?`, vis, 2 * fact(n - 1), ["Think of Ann and Ben glued together as one block.", "Arrange the block and the others in a row, then multiply by the ways to order Ann and Ben inside the block.", "Example: 4 friends with two glued: block + 2 others = 3 things, 3! = 6, times 2 = 12. Now do yours."]);
    if (t === "apart") return num(`${n} friends line up in a row. Ann and Ben must NOT stand next to each other. How many different lines are possible?`, vis, fact(n) - 2 * fact(n - 1), ["Count the lines with no rule at all. Then count the lines where they ARE together.", "Take the “together” lines away from all lines.", "Example: 4 friends: all 24, together 12, so apart is 12. Now do yours."]);
    return num(`${n} friends line up in a row. Three of them, Ann, Ben and Cy, must stand together in any order. How many different lines are possible?`, vis, 6 * fact(n - 2), ["Glue the three into one block and count the block as a single thing.", "Arrange the block with the others, then multiply by the ways to order the three inside the block.", "Example: 5 friends with 3 glued: block + 2 others = 3 things, 3! = 6, times 6 = 36. Now do yours."]);
  };
  const tiling = () => {
    const S_ = pick([[1, 3], [1, 2, 3], [2, 3], [1, 4], [1, 2, 4]]), n = ri(6, 12), w = [1];
    for (let i = 1; i <= n; i++) { let c = 0; for (const s of S_) if (i - s >= 0) c += w[i - s]; w[i] = c; }
    const nm = S_.map(s => `1×${s}`).join(", ");
    return num(`A strip of ${n} squares (1 wide) is covered with tiles of lengths ${S_.join(", ")} (any number of each, order matters, no gaps). How many different coverings are there?`, big("🧱"), w[n], [
      "Look at the first tile you place. What is left after it?",
      "The number of ways for a strip of length n is the sum of the ways for the shorter strips you get after the first tile. Build up from small strips.",
      "Example: tiles of length 1 and 2: ways(1)=1, ways(2)=2, ways(3)=ways(2)+ways(1)=3, ways(4)=5. Now do yours with your own tile lengths."]);
  };
  const CAT = [1, 1, 2, 5, 14, 42, 132];
  const catalan = () => {
    const t = pick(["br", "path", "tri"]);
    if (t === "br") { const n = ri(4, 6); return num(`How many ways can you write ${n} pairs of brackets so that every bracket closes properly? (For 2 pairs: ()() and (()) make 2.)`, big("🧮"), CAT[n], ["Look at small cases and see how they build into bigger ones.", "The counts go 1, 1, 2, 5, 14, … These are Catalan numbers: C(n) = (2n choose n) ÷ (n + 1).", "Example: for 3 pairs the list is ((())), (()()), (())(), ()(()), ()()(): 5 ways. Now do yours."]); }
    if (t === "path") { const n = ri(4, 6); return num(`You walk from one corner to the opposite corner of an ${n} by ${n} grid, moving only right or up, and never going above the diagonal line. How many paths are there?`, big("🧮"), CAT[n], ["Every path has n right moves and n up moves. The “never above” rule cuts down the total.", "These counts are the Catalan numbers: C(n) = (2n choose n) ÷ (n + 1).", "Example: 2 by 2 grid: all 6 paths, but only 2 never go above the diagonal. Now do yours."]); }
    const sides = ri(6, 8); return num(`In how many ways can a flat polygon with ${sides} sides be cut into triangles by drawing diagonals that do not cross? (A square has 2 ways.)`, big("🧮"), CAT[sides - 2], ["Fix one side and think about which corner makes the triangle on top of it.", "The counts for 3, 4, 5, 6, … sides go 1, 2, 5, 14, … (Catalan numbers). For n sides the answer is C(n − 2).", "Example: a pentagon has 5 ways. Now do yours (a bigger polygon)."]);
  };
  const wilson = () => {
    const t = pick(["a", "b", "c"]), p = pick(t === "c" ? [5, 11, 13, 17, 19] : [5, 7, 11, 13, 17, 19]);
    const h = ["For a prime p, the numbers 2 to p − 2 split into pairs that multiply to 1 mod p, so almost everything cancels.", "Only 1 and p − 1 are left over, and p − 1 acts like −1. Use that to find the remainder you need.", "Example: p = 3: 2! = 2, and 2 is 3 − 1. Now do yours."];
    if (t === "a") return num(`What is the remainder when ${p - 1}! is divided by ${p}?`, big("🧙"), p - 1, h);
    if (t === "b") return num(`What is the remainder when ${p - 2}! is divided by ${p}?`, big("🧙"), 1, [h[0], "(p − 1)! leaves p − 1. Divide that by (p − 1) in the mod world: what is left?", "Example: p = 7: 6! leaves 6, and 6! = 6 × 5!. Since 6 acts like −1, what must 5! act like? Use the same idea. Now do yours."]);
    return num(`What is the remainder when ${p - 3}! is divided by ${p}?`, big("🧙"), (p - 1) / 2, [h[0], "(p − 1)! = (p − 1)(p − 2)(p − 3)! and the first two factors act like −1 and −2. What number times 2 acts like −1?", "Example: p = 7: 4! = 24 leaves 3. Check: 2 × 3 = 6, which acts like −1. Now do yours."]);
  };
  const sq2 = (n) => { const r = []; for (let a = 1; a * a < n; a++) { const b = Math.round(Math.sqrt(n - a * a)); if (b >= a && b * b + a * a === n) r.push([a, b]); } return r; };
  const twoSquares = () => {
    if (Math.random() < 0.5) {
      const bad = []; for (let n = 3; n <= 100; n++) { let ok = false; for (let x = 0; x * x <= n; x++) { const y = Math.round(Math.sqrt(n - x * x)); if (x * x + y * y === n) ok = true; } if (!ok) bad.push(n); }
      const good = []; for (let n = 5; n <= 100; n++) if (sq2(n).length) good.push(n);
      const r = pick(bad.filter(z => z !== 21));
      return mcq(`Which of these numbers can NOT be written as the sum of two square numbers (like 25 = 9 + 16)?`, big("⬜"), r, shuf(good).slice(0, 3), [
        "Try to find two squares (1, 4, 9, 16, 25, 36, 49, 64, 81) that add up to each number.",
        "A prime that is 3 more than a multiple of 4 (like 3, 7, 11) makes trouble if it appears an odd number of times in the number’s prime factors.",
        "Example: 21 = 3 × 7 has both 3 and 7 once, so 21 is not a sum of two squares, but 10 = 1 + 9 is. Now do yours."]);
    }
    const cands = []; for (let n = 5; n <= 100; n++) { const r = sq2(n); if (r.length === 1 && r[0][0] !== r[0][1] || (r.length === 1)) cands.push([n, r[0]]); }
    const [n, [a, b]] = pick(cands.filter(c => c[0] !== 13));
    return num(`${n} is the sum of two square numbers made from whole numbers a and b (a² + b² = ${n}, with a and b bigger than 0). What is a + b?`, big("⬜"), a + b, [
      "List the squares that are smaller than the number: 1, 4, 9, 16, 25, 36, …",
      "Take each square away from the number. If what is left is also a square, you found the pair.",
      "Example: 13: take away 1 → 12 (no), 4 → 9 (yes). So a and b are 2 and 3. Now do yours."]);
  };
  const giant = () => {
    for (let i = 0; i < 200; i++) {
      const A = ri(2, 9), B = ri(2, 9); if (A === B) continue;
      const p = ri(2, 6), q = ri(2, 6), g = ri(5, 20), x = g * p, y = g * q, l = BigInt(A) ** BigInt(p), r = BigInt(B) ** BigInt(q);
      if (l === r || (A === 2 && B === 3 && x === 30)) continue;
      return mcq(`Which is bigger: ${A}<sup>${x}</sup> or ${B}<sup>${y}</sup>?`, big("🏔️"), l > r ? `${A}^${x}` : `${B}^${y}`.replace(/\^(\d+)/, "^$1"), [l > r ? `${B}^${y}` : `${A}^${x}`], [
        "Both exponents share a common factor. Can you take the same root of both numbers?",
        "Divide both exponents by their largest common factor (take that root of each number). Then compare two much smaller numbers.",
        "Example: 2<sup>30</sup> and 3<sup>20</sup>: take the 10th root: 2³ = 8 and 3² = 9, so 3<sup>20</sup> is bigger. Now do yours."]);
    }
    return mcq("Which is bigger: 2^40 or 3^24?", big("🏔️"), "3^24", ["2^40"], ["Both exponents share a factor.", "Take the same root of both.", "Example: 2^30 vs 3^20: roots 8 and 9. Now do yours."]);
  };
  const funcRules = () => {
    const t = pick(["add", "mul", "step", "dbl"]);
    if (t === "add") { const a = ri(2, 9), n = ri(6, 20); return num(`A function f has f(x + y) = f(x) + f(y) for all whole numbers x and y, and f(1) = ${a}. What is f(${n})?`, big("🎛️"), a * n, ["Write n as 1 + 1 + 1 + … and use the rule.", "Each extra 1 adds f(1) once. So f of n is n copies of f(1) added up.", "Example: f(x + y) = f(x) + f(y) and f(1) = 4: f(3) = f(1) + f(1) + f(1) = 12. Now do yours."]); }
    if (t === "mul") { const a = ri(2, 4), k = ri(3, 5); return num(`A function f has f(x × y) = f(x) × f(y) for all whole numbers x and y, and f(2) = ${a}. What is f(${2 ** k})?`, big("🎛️"), a ** k, [`Write ${2 ** k} as a product of 2s.`, "Use the rule to split f of a product into a product of f(2)’s.", "Example: f(x × y) = f(x) × f(y) with f(2) = 5: f(4) = f(2 × 2) = 5 × 5 = 25. Now do yours."]); }
    if (t === "step") { const c = ri(1, 9), d = ri(2, 8), n = ri(5, 15); return num(`A function f has f(0) = ${c} and f(x + 1) = f(x) + ${d}. What is f(${n})?`, big("🎛️"), c + d * n, ["Each step up by 1 changes the output the same way.", "From x = 0 to x = n there are n steps. Add the step n times to the start.", "Example: f(0) = 2 and f(x + 1) = f(x) + 5: f(4) = 2 + 4 × 5 = 22. Now do yours."]); }
    const c = ri(1, 5), n = ri(3, 8); return num(`A function f has f(0) = ${c} and f(x + 1) = 2 × f(x). What is f(${n})?`, big("🎛️"), c * 2 ** n, ["Each step up by 1 doubles the output.", "From x = 0 to x = n there are n doublings of the start.", "Example: f(0) = 3 and f(x + 1) = 2 × f(x): f(2) = 3 × 2 × 2 = 12. Now do yours."]);
  };
  const readRel = () => {
    const V = ["A", "B", "C", "D"];
    for (let tries = 0; tries < 200; tries++) {
      const E = []; for (const x of V) for (const y of V) if (x !== y && Math.random() < 0.45) E.push([x, y]);
      const out = V.map(x => E.filter(e => e[0] === x).length), inn = V.map(x => E.filter(e => e[1] === x).length);
      const t = pick(["every", "somebody", "count1", "count0"]);
      const list = E.map(e => `${e[0]}→${e[1]}`).join(", ");
      const intro = `In a group of 4 friends A, B, C, D, an arrow X→Y means X can send a message to Y. The arrows are: ${list}.`;
      if (E.length < 3) continue;
      if (t === "every") return mcq(`${intro} True or false: everyone can send a message to at least one other friend.`, big("📬"), out.every(o => o >= 1) ? "True" : "False", ["True", "False"], ["Go through each friend one at a time. Look for arrows that start at them.", "“Everyone” means no one may be missing. One friend without an outgoing arrow is enough to make it false.", "Example: arrows A→B, B→C, C→A with D having none: D has no outgoing arrow, so “everyone sends” is false. Now do yours."]);
      if (t === "somebody") return mcq(`${intro} True or false: there is a friend who can send a message to ALL three of the others.`, big("📬"), out.some(o => o === 3) ? "True" : "False", ["True", "False"], ["Count the arrows that start at each friend.", "A friend who reaches everyone else has exactly 3 outgoing arrows. Does any friend have that many?", "Example: arrows A→B, A→C, A→D, B→C: A has 3 outgoing arrows, so it is true. Now do yours."]);
      if (t === "count1") { const c = out.filter(o => o === 1).length; if (!c) continue; return num(`${intro} How many friends can send a message to exactly ONE other friend?`, big("📬"), c, ["Count the arrows that start at each friend.", "Make a small table: friend and number of outgoing arrows. Then count the ones with exactly one.", "Example: A→B, A→C, B→C, C→A: A has 2, B has 1, C has 1, D has 0. So 2 friends send to exactly one. Now do yours."]); }
      const c = inn.filter(o => o === 0).length; if (!c) continue;
      return num(`${intro} How many friends cannot receive a message from anybody?`, big("📬"), c, ["Look at the ends of the arrows (where they point to).", "A friend who is never at the pointed end receives nothing. Check each friend.", "Example: A→B, B→C, C→A, D→A: D is never at an arrow tip, so 1 friend receives nothing. Now do yours."]);
    }
    return num("In a group of 4 friends A, B, C, D, the arrows are A→B, B→C, C→D. How many friends cannot receive a message from anybody?", big("📬"), 1, ["Look at where arrows point to.", "Who is never at the pointed end?", "Example: X→Y only: X receives nothing. Now do yours."]);
  };
  const RELS = [
    ["x = y (the numbers are equal)", 1, 1, 1], ["x < y (numbers)", 0, 0, 1], ["x ≤ y (numbers)", 1, 0, 1],
    ["x and y leave the same remainder when divided by 5", 1, 1, 1], ["x divides y (whole numbers 1, 2, 3, …)", 1, 0, 1],
    ["x ≠ y (the numbers are different)", 0, 1, 0], ["x + y = 10 (whole numbers)", 0, 1, 0], ["x is a parent of y (people)", 0, 0, 0],
    ["x is taller than y (people)", 0, 0, 1], ["x and y are in the same class at school", 1, 1, 1], ["x and y differ by exactly 1 (numbers)", 0, 1, 0],
    ["x − y is an even number", 1, 1, 1], ["x × y is an even number", 0, 1, 0]
  ];
  const relProps = () => {
    const R = pick(RELS), pi = pick([1, 2, 3]), nm = ["", "reflexive", "symmetric", "transitive"][pi];
    const d = ["", "every x is related to itself", "whenever x is related to y, then y is related to x", "whenever x is related to y and y is related to z, then x is related to z"][pi];
    const ex = ["", "Example: “x is shorter than y”. Is x shorter than x? No, so it is not reflexive. Now do yours.", "Example: “x is older than y”. If x is older than y, y is not older than x, so it is not symmetric. Now do yours.", "Example: “x is the mother of y”. If x is mother of y and y is mother of z, x is not mother of z, so it is not transitive. Now do yours."][pi];
    return mcq(`A relation says: “${R[0]}”. Is this relation ${nm}? (${nm[0].toUpperCase() + nm.slice(1)} means ${d}.)`, big("🔗"), R[pi] ? "Yes" : "No", ["Yes", "No"], [
      "Read the property carefully. It must hold for every possible choice, not just a few.",
      "To say No, you only need one example that breaks it. To say Yes, you must be sure no example can break it. Try small numbers or simple cases.",
      ex]);
  };
  const countFns = () => {
    const t = pick(["all", "inj", "bij", "fix"]);
    if (t === "bij") { const n = ri(3, 6); return num(`How many one-to-one and onto functions are there from a set of ${n} things to another set of ${n} things? (Each thing goes to its own partner.)`, big("🔀"), fact(n), ["Each thing in the first set must get a different partner, and every partner must be used.", "Choose a partner for the first thing, then the second, and so on, with one fewer choice each time.", "Example: for 2 things: 2 × 1 = 2. Now do yours."]); }
    const a = ri(2, 5), b = ri(a, 6);
    if (t === "all") return num(`A function sends each of ${a} things in set A to one of ${b} things in set B. How many different functions are there?`, big("🔀"), b ** a, ["Each thing in A makes its own choice of where to go.", "Multiply the number of choices of each thing in A.", "Example: 2 things sent to 7 targets: 7 × 7 = 49. Now do yours."]);
    if (t === "inj") return num(`A function sends ${a} things in set A to ${b} things in set B, and no two things of A may go to the same thing in B (one-to-one). How many such functions are there?`, big("🔀"), perm(b, a), ["Each choice uses up a target, so the next thing has fewer targets.", "Multiply: b for the first thing, b − 1 for the next, and so on, for each thing in A.", "Example: 2 things to 7 targets, no sharing: 7 × 6 = 42. Now do yours."]);
    return num(`A function sends each of ${a} things in set A to one of ${b} things in set B. In how many of these functions does one particular thing in A go to one particular thing in B?`, big("🔀"), b ** (a - 1), ["One thing has no choice. What about the rest?", "Multiply the choices of all the other things in A.", "Example: 3 things, 2 targets, with the first fixed: 2 × 2 = 4. Now do yours."]);
  };
  const pencil = () => {
    const V = "ABCDEF".split("").slice(0, ri(5, 6));
    for (let tries = 0; tries < 100; tries++) {
      const E = []; const has = (x, y) => E.some(e => (e[0] === x && e[1] === y) || (e[0] === y && e[1] === x));
      for (let i = 1; i < V.length; i++) E.push([V[ri(0, i - 1)], V[i]]);
      const extra = ri(1, 4); for (let k = 0; k < extra; k++) { const x = pick(V), y = pick(V); if (x !== y && !has(x, y)) E.push([x, y]); }
      const deg = V.map(v => E.filter(e => e[0] === v || e[1] === v).length), odd = deg.filter(d => d % 2).length;
      const list = E.map(e => `${e[0]}–${e[1]}`).join(", "), t = pick(["odd", "trace", "edges"]);
      if (t === "odd") return num(`A drawing has points ${V.join(", ")} joined by lines: ${list}. How many points have an ODD number of lines meeting at them?`, big("✏️"), odd, ["Count the lines that touch each point, one point at a time.", "Make a small table: point and number of lines touching it. Then count the odd ones.", "Example: lines A–B, B–C, A–C, C–D: A has 2, B has 2, C has 3, D has 1. Two odd points. Now do yours."]);
      if (t === "trace") return mcq(`A drawing has points ${V.join(", ")} joined by lines: ${list}. Can you trace over every line exactly once without lifting your pencil (you may start and end anywhere)?`, big("✏️"), odd === 0 || odd === 2 ? "Yes" : "No", ["Yes", "No"], ["Count how many lines meet at each point.", "Euler’s rule: it can be done exactly when the number of points with an odd count is 0 or 2 (and the drawing is in one piece).", "Example: a square with both diagonals: each corner has 3 lines, so 4 odd points. It cannot be traced in one go. Now do yours."]);
      const sum = deg.reduce((a, b) => a + b, 0);
      return num(`In a drawing the numbers of lines meeting at the points are ${deg.join(", ")}. How many lines does the drawing have in all?`, big("✏️"), sum / 2, ["Each line has two ends, and each end touches a point.", "Adding up all the counts counts every line twice. Halve the total.", "Example: counts 2, 2, 3, 1 add to 8, so there are 4 lines. Now do yours."]);
    }
    return num("In a drawing the numbers of lines meeting at the points are 2, 2, 3, 3, 2. How many lines does the drawing have in all?", big("✏️"), 6, ["Each line has two ends.", "Add the counts and halve.", "Example: 2, 2, 3, 1 gives 4. Now do yours."]);
  };
  const edgesNet = () => {
    const t = pick(["reg", "tree", "miss", "deg"]);
    if (t === "reg") { for (;;) { const n = ri(4, 12), k = ri(2, 5); if (k >= n || (n * k) % 2) continue; if (n === 4 && k === 3) continue; return num(`A network has ${n} computers and every computer is joined by cables to exactly ${k} others. How many cables are there?`, big("🕸️"), n * k / 2, ["Count the cable ends. How many ends are there in all?", "Every cable has 2 ends, so the number of cables is half of the number of ends.", "Example: 4 computers each with 3 cables: 12 cable ends, so 6 cables. Now do yours."]); } }
    if (t === "tree") { const n = ri(5, 40); return num(`${n} villages must be joined by roads so that you can travel between any two villages, using the fewest roads possible (no loops). How many roads are needed?`, big("🕸️"), n - 1, ["Start with one village. Each new road should bring in one new village.", "The first village needs no road. Every other village needs exactly one new road to join in.", "Example: 4 villages need 3 roads. Now do yours."]); }
    if (t === "miss") { const n = ri(5, 12), r = ri(n - 1, n + 2); return num(`There are ${n} towns. Right now ${r} different pairs of towns have a road between them. How many MORE roads are needed so that every pair of towns has its own road?`, big("🕸️"), comb(n, 2) - r, ["Count all the pairs of towns there could be.", "The number of pairs is n × (n − 1) ÷ 2. Take the existing roads away.", "Example: 4 towns have 6 pairs. With 3 roads, 3 more are needed. Now do yours."]); }
    for (;;) { const n = ri(6, 14), d = ri(3, 5); if ((n * d) % 2 || n === 8 && d === 3) continue; return num(`At a party ${n} guests each shake hands with exactly ${d} other guests. How many handshakes happen in all?`, big("🕸️"), n * d / 2, ["Count the hand ends: each guest has the same number of handshakes.", "Every handshake has two ends, so halve the total of the ends.", "Example: 8 guests each shaking hands with 3 others: 24 ends, so 12 handshakes. Now do yours."]); }
  };
  const colorsQ = () => {
    const t = pick(["cyc", "kn", "tree", "wheel"]);
    if (t === "cyc") { const n = ri(3, 11); return num(`${n} towns stand in a ring. Each is joined by a road to the next, and the last to the first. Towns joined by a road must get different colors. What is the smallest number of colors that works?`, big("🎨"), n % 2 ? 3 : 2, ["Color the towns one after another around the ring and see what happens at the end.", "With two colors you must alternate. Does that work when you come back to the first town?", "Example: a ring of 12 towns works with 2 colors (alternate). A ring of 3 needs more. Now do yours."]); }
    if (t === "kn") { const n = ri(3, 6); return num(`${n} towns have a road between every pair of towns. Towns joined by a road need different colors. What is the smallest number of colors?`, big("🎨"), n, ["Pick any town. How many other towns are joined to it, and to each other?", "Every town is joined to every other town, so no two towns can share a color.", "Example: 7 towns all joined to each other need 7 colors. Now do yours."]); }
    if (t === "tree") { const n = ri(4, 15); return num(`${n} towns are joined by roads with no loops, and every town can be reached from every other. Towns joined by a road need different colors. What is the smallest number of colors?`, big("🎨"), 2, ["Color one town. Its neighbours must differ from it.", "Without loops you can always keep alternating the colors as you move away from the first town.", "Example: a line of 5 towns alternates red, blue, red, blue, red. Now do yours."]); }
    const n = ri(4, 9); return num(`A hub town is joined to every town in a ring of ${n} towns, and each ring town is also joined to the next one around the ring. Joined towns need different colors. What is the smallest number of colors?`, big("🎨"), n % 2 ? 4 : 3, ["The hub needs its own color, since it is joined to everyone.", "The ring needs 2 colors if it has an even number of towns, and 3 if odd. Add the hub’s color.", "Example: a hub with a ring of 10: the ring needs 2, plus 1 for the hub = 3. Now do yours."]);
  };
  const winLose = () => {
    const sets = [[1, 6], [1, 3], [2, 3], [1, 3, 4], [1, 4, 5], [2, 5], [1, 2, 3], [3, 4]], S_ = pick(sets), N = ri(10, 24), win = [false];
    for (let i = 1; i <= 40; i++) win[i] = S_.some(s => i - s >= 0 && !win[i - s]);
    const rules = `Two players take turns taking ${S_.length === 2 ? S_.join(" or ") : S_.slice(0, -1).join(", ") + " or " + S_[S_.length - 1]} stones from a pile. Whoever takes the last stone wins.`;
    if (Math.random() < 0.5) return mcq(`${rules} The pile has ${N} stones and you move first. With perfect play, do you win?`, big("🪨"), win[N] ? "Yes" : "No", ["Yes", "No"], ["Work from small piles up. With 0 stones left on your turn, you have already lost.", "A pile is a win for the player to move if some allowed move leaves a pile that is a loss. Fill in a list from 0 up to your number.", "Example: allowed 1 or 2 stones. Piles 0 loses, 1 wins, 2 wins, 3 loses (any move leaves a winning pile), 4 wins. Now do yours (with your own rules)."]);
    let c = 0; for (let i = 1; i <= N; i++) if (!win[i]) c++;
    return num(`${rules} For how many pile sizes from 1 to ${N} does the player who moves first LOSE (with perfect play)?`, big("🪨"), c, ["Work out each pile size from small to big: win or lose for the player about to move.", "A pile is a loss when every allowed move leaves a winning pile. Then count the losses.", "Example: allowed 1 or 2 stones, piles 1 to 9: losing piles are 3, 6, 9: that is 3. Now do yours."]);
  };
  const waiting = () => {
    const [a, b] = pick([[1, 2], [1, 3], [1, 4], [1, 6], [2, 3]]), k = ri(2, 3), t = pick(["exact", "none"]);
    const item = b === 2 ? "a fair coin that lands heads" : b === 6 ? "a fair die that shows a six" : `a spinner that lands on blue with chance ${a}/${b}`;
    const fail = b - a;
    if (t === "exact") return mcq(`You try with ${item} over and over. What is the chance that the FIRST success happens exactly on try number ${k}?`, big("⏳"), frs(fail ** (k - 1) * a, b ** k), [frs(a ** k, b ** k), frs(fail ** k, b ** k), frs(a * k, b), frs(fail ** (k - 1), b ** (k - 1))], ["The first success on try k means k − 1 failures first, then a success.", "Multiply the chance of each failure k − 1 times, then the chance of success once.", "Example: a coin lands heads for the first time on flip 4: (1/2) × (1/2) × (1/2) × (1/2) = 1/16. Now do yours."]);
    return mcq(`You try with ${item} ${k} times. What is the chance of NO success at all in those ${k} tries?`, big("⏳"), frs(fail ** k, b ** k), [frs(a ** k, b ** k), frs(1 * (b ** k - fail ** k), b ** k), frs(fail * k, b), frs(fail, b ** k)], ["No success means every single try fails.", "Multiply the chance of a failure by itself once for each try.", "Example: four coin flips with no heads: (1/2) × (1/2) × (1/2) × (1/2) = 1/16. Now do yours."]);
  };
  const indep = () => {
    const t = pick(["yn", "both", "cond"]);
    for (let tries = 0; tries < 300; tries++) {
      const a = pick([20, 25, 30, 40, 50, 60, 80]), b = pick([10, 20, 25, 40, 50, 60, 80]), N = 100; if ((a * b) % N) continue;
      let c = a * b / N, ind = true;
      if (t === "yn" && Math.random() < 0.5) { c += pick([-3, -2, 2, 3]); ind = false; if (c < Math.max(0, a + b - N) || c > Math.min(a, b) || c < 1) continue; }
      if (c < 1 || c > Math.min(a, b)) continue;
      if (t === "yn") return mcq(`In a school of 100 students, ${a} play music, ${b} play sport and ${c} do both. Are “plays music” and “plays sport” independent events?`, big("🎯"), ind ? "Yes" : "No", ["Yes", "No"], ["Independent means one fact does not change the chance of the other.", "Compare: (chance of music) × (chance of sport) with (chance of both). If they are equal, the events are independent.", "Example: 100 students, 36 music, 25 sport, 9 both: 0.36 × 0.25 = 0.09 = 9/100, so independent. Now do yours."]);
      if (t === "both") return num(`In a school of 100 students, ${a} play music and ${b} play sport. The two things are independent. How many students do both?`, big("🎯"), c, ["For independent events, multiply the chances.", "Chance of both = (chance of music) × (chance of sport). Then turn it back into a number of students out of 100.", "Example: 100 students, 45 play chess, 20 play tennis, independent: 0.45 × 0.2 = 0.09, so 9 students do both. Now do yours."]);
      return mcq(`In a school of 100 students, ${a} play music, ${b} play sport and ${c} do both. A student who plays sport is chosen. What is the chance that this student also plays music?`, big("🎯"), frs(c, b), [frs(c, a), frs(c, 100), frs(a, 100), frs(b, 100)], ["Only the students who play sport matter now. They are the new whole.", "Chance = (students who do both) divided by (students who play sport). Simplify the fraction.", "Example: 100 students, 44 play chess, 25 play tennis, 10 both. A tennis player: 10/25 = 2/5 plays chess. Now do yours."]);
    }
    return mcq("In a school of 100 students, 50 play music, 20 play sport and 10 do both. Are the two events independent?", big("🎯"), "Yes", ["Yes", "No"], ["Compare the product of the chances with the chance of both.", "Equal means independent.", "Example: 40 and 25 with 10 both: 0.4 × 0.25 = 0.1, independent. Now do yours."]);
  };
  const nand = (a, b) => (a && b ? 0 : 1);
  const NAND_C = [
    { s: "NAND(A, A)", f: (a, b) => nand(a, a), n: 1, name: "NOT A" },
    { s: "NAND( NAND(A, B), NAND(A, B) )", f: (a, b) => { const x = nand(a, b); return nand(x, x); }, n: 3, name: "AND" },
    { s: "NAND( NAND(A, A), NAND(B, B) )", f: (a, b) => nand(nand(a, a), nand(b, b)), n: 3, name: "OR" },
    { s: "NAND( NAND(A, NAND(A, B)), NAND(B, NAND(A, B)) )", f: (a, b) => { const x = nand(a, b); return nand(nand(a, x), nand(b, x)); }, n: 4, name: "XOR (different)" }
  ];
  const nandQ = () => {
    const C = pick(NAND_C), t = pick(["eval", "eval", "name", "count"]);
    const intro = "NAND gives 0 only when both inputs are 1, otherwise 1.";
    if (t === "eval") { const a = ri(0, 1), b = ri(0, 1); return mcq(`${intro} A circuit is built from NAND gates: ${C.s}. If A = ${a} and B = ${b}, what is the output?`, big("🔌"), String(C.f(a, b)), ["0", "1"], ["Work from the inside outwards: the innermost NANDs first.", "Replace each inner NAND by its 0 or 1 and then do the next one. NAND is 0 only if both inputs are 1.", "Example: NAND( NAND(1, 1), 1 ): inside is 0, then NAND(0, 1) = 1. Now do yours."]); }
    if (t === "name") return mcq(`${intro} A circuit is built from NAND gates: ${C.s}. Which simple gate does the circuit act like?`, big("🔌"), C.name, shuf(["NOT A", "AND", "OR", "XOR (different)", "NOR"].filter(x => x !== C.name)), ["Try all four inputs (0,0), (0,1), (1,0), (1,1) and write down the outputs.", "Compare your table with these: AND is 1 only when both are 1; OR is 0 only when both are 0; XOR is 1 when the inputs differ.", "Example: NAND(A, B) alone gives 1, 1, 1, 0 for inputs (0,0), (0,1), (1,0), (1,1). Write the same kind of table for yours and compare it with the gates. Now do yours."]);
    return num(`${intro} How many NAND gates are used in this circuit: ${C.s}?`, big("🔌"), C.n, ["Count each time the word NAND appears.", "Every NAND( … ) is one gate, including those inside others.", "Example: NAND( NAND(A, B), B ) has 2 gates. Now do yours."]);
  };

  const mk24 = [committee, together, tiling, catalan, wilson, twoSquares, giant, funcRules, readRel, relProps, countFns, pencil, edgesNet, colorsQ, winLose, waiting, indep, nandQ];
  const L24 = [
    L("Committees with rules", committee, [S("Must be in", "👥", "If a person must be in, one place is filled. Choose the rest from everyone else."), S("Cannot be in", "🚫", "If a person is out, choose from the people who remain."), S("At least one", "🔄", "Count all, then take away the ones with none of the special people.")]),
    L("Together or apart", together, [S("Glue", "🧍", "To keep people together, treat them as one block."), S("Order inside", "🔀", "Then multiply by the ways to order the people inside the block."), S("Apart", "↔️", "Apart = all lines − lines where they are together.")]),
    L("Tiling a strip", tiling, [S("First tile", "🧱", "Look at the tile at the start of the strip."), S("Build up", "🪜", "ways(n) = the sum of ways(n − tile length) for each tile length."), S("Start", "🏁", "ways(0) = 1, because a finished strip is one way of doing it.")]),
    L("Catalan numbers", catalan, [S("The list", "🧮", "1, 1, 2, 5, 14, 42, 132, …"), S("Many places", "🌍", "Matching brackets, paths that stay under a line, and ways to cut a polygon into triangles."), S("Formula", "✨", "C(n) = (2n choose n) ÷ (n + 1).")]),
    L("Wilson's trick", wilson, [S("Pairs", "🧙", "For a prime p, each number from 2 to p − 2 has a partner that it multiplies to 1 with, mod p."), S("Cancel", "♻️", "So (p − 1)! leaves just the factor p − 1 behind."), S("Result", "🎯", "(p − 1)! leaves remainder p − 1 when divided by p.")]),
    L("Sums of two squares", twoSquares, [S("Squares", "⬜", "1, 4, 9, 16, 25, 36, …"), S("Try pairs", "🔍", "Subtract a square and see whether the rest is a square."), S("Which fail", "🚫", "A prime that is 3 more than a multiple of 4 (3, 7, 11, …) must appear an even number of times, or the number fails.")]),
    L("Comparing giant powers", giant, [S("Common factor", "🏔️", "If both exponents share a factor, split it out."), S("Same root", "√", "Take the same root of both and compare the small results."), S("Check", "✅", "2<sup>30</sup> vs 3<sup>20</sup>: roots 2³ = 8 and 3² = 9.")]),
    L("Function rules", funcRules, [S("Use the rule", "🎛️", "Break the input into small pieces the rule talks about."), S("Add and multiply", "➕", "f(x + y) = f(x) + f(y) gives f(n) = n × f(1). f(xy) = f(x)f(y) turns a product into a product."), S("Steps", "🪜", "f(x + 1) = f(x) + d adds d each step; doubling doubles each step.")]),
    L("Reading arrows", readRel, [S("Arrows", "📬", "An arrow X→Y is a pair in a relation."), S("Count outgoing", "🔢", "For each friend, count the arrows that start there, and the ones that end there."), S("Quantifiers", "🔍", "“Everyone” fails if one person is missing. “Someone” needs just one.")]),
    L("Properties of relations", relProps, [S("Reflexive", "🔁", "Everything is related to itself."), S("Symmetric", "↔️", "If x relates to y, then y relates to x."), S("Transitive", "⛓️", "If x relates to y and y relates to z, then x relates to z.")]),
    L("Counting functions", countFns, [S("Choices", "🔀", "Each thing in the first set picks a target."), S("All", "✖️", "With b targets and a things: b multiplied by itself a times."), S("One-to-one", "1️⃣", "Targets can’t repeat, so the choices go b, b − 1, b − 2, …")]),
    L("Pencil trails", pencil, [S("Euler", "✏️", "A drawing can be traced in one go if 0 or 2 points have an odd number of lines."), S("Count lines", "🔢", "Count how many lines touch each point."), S("Handshake", "🤝", "Add all the counts and halve it to get the number of lines.")]),
    L("Edges in networks", edgesNet, [S("Two ends", "🕸️", "Every cable has 2 ends, so lines = total ends ÷ 2."), S("Trees", "🌳", "To join n places with no loops you need n − 1 lines."), S("All pairs", "👫", "All pairs of n places: n(n − 1) ÷ 2.")]),
    L("How many colors?", colorsQ, [S("Neighbours differ", "🎨", "Joined towns need different colors."), S("Rings", "⭕", "A ring of even length needs 2 colors; odd needs 3."), S("Everything joined", "🕸️", "If every pair is joined, you need one color per town.")]),
    L("Win or lose positions", winLose, [S("Last stone wins", "🪨", "Zero stones on your turn means you lost."), S("Fill a table", "📝", "A pile is a win if some move leaves a losing pile."), S("Loss", "❌", "A pile is a loss if every move leaves a winning pile.")]),
    L("Waiting for the first success", waiting, [S("Fail, fail, win", "⏳", "First success on try k means k − 1 failures and then a success."), S("Multiply", "✖️", "Multiply the chances of each result in turn."), S("No success", "🚫", "No success in k tries: all k fail.")]),
    L("Independent events", indep, [S("Independent", "🎯", "One event does not change the chance of the other."), S("Test", "⚖️", "P(A) × P(B) = P(A and B)."), S("Given", "🔍", "P(A given B) = people in both ÷ people in B.")]),
    L("Everything from NAND", nandQ, [S("NAND", "🔌", "Output 0 only when both inputs are 1."), S("Build", "🧱", "NAND(A, A) flips A. Two NANDs can make AND and OR."), S("Evaluate", "🧮", "Work from the inside gates outwards.")]),
    L("Mixed practice", mixOf(mk24), MIXS("Counting rules, number tricks, functions, relations, graphs, games, chance and logic circuits.")),
    L("Level 24 Challenge", mixOf(mk24), MIXS("Level 24 mixes counting, graphs, functions, chance and formal logic.")),
  ];

  Object.assign(LOGIC_LEVELS, { 22: L22, 23: L23, 24: L24 });
})();
