// ext/math-25-27.js  Mind Lab Math levels 25-27 (60 lessons): precalculus finishing, limits and statistics, calculus 1 and linear algebra basics
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const esc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const clean = h => String(h).replace(/<[^>]+>/g, " ");
  const leaks = (q, idx) => {
    const re = new RegExp("(?<![0-9A-Za-z.])" + esc(q.answer) + "(?![0-9A-Za-z]|\\.[0-9])", "i");
    return idx.some(i => re.test(clean(q.hints[i])));
  };
  const G = fn => () => { let q; for (let i = 0; i < 40; i++) { q = fn(); if (!leaks(q, [0, 1])) return q; } return q; };
  const L = (title, fn, slides) => { const mk = G(fn); mk.teach = () => slides; return { title, make: mk }; };
  const mixOf = (title, lessons) => {
    const f = () => pick(lessons).make();
    f.teach = () => {
      const s = [S("Review time!", "🔄", "This lesson mixes ideas you have learned. Here is a quick reminder of each one, then the quiz.")];
      lessons.forEach(l => s.push(l.make.teach()[0]));
      return s;
    };
    return { title, make: f };
  };
  const nrm = v => String(v).trim().toLowerCase().replace(/[^\w.\-]/g, "");
  const cho = (ans, ...o) => {
    const a = String(ans), seen = new Set([nrm(a)]), out = [];
    for (const x of shuf(o.map(String))) { if (!seen.has(nrm(x)) && out.length < 3) { seen.add(nrm(x)); out.push(x); } }
    return shuf([a, ...out]);
  };
  const Q = (text, answer, hints, o = {}) => ({ text, answer, hints, ...o });
  const mf = x => String(x).replace(/−/g, "-");
  const C = (text, ans, wr, hints, o = {}) => ({ text, choices: cho(mf(ans), ...wr.map(mf)), answer: mf(ans), hints, ...o });
  const N = (text, val, hints, o = {}) => {
    const { step = 1, ...rest } = o;
    val = Math.round(val * 1000) / 1000;
    if (val >= 0) return { text, answer: val, hints, ...rest };
    const f = x => String(Math.round(x * 1000) / 1000);
    return { text, choices: cho(f(val), f(-val), f(val + step), f(val - step), f(-val + step), f(val + 2 * step)), answer: f(val), hints, ...rest };
  };
  const SUB = "₀₁₂₃₄₅₆₇₈₉", SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const sup = n => String(n).replace(/\d/g, d => SUP[d]);
  const m = n => (n < 0 ? "−" + (-n) : String(n));
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const fr = (n, d) => { const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : `${n}/${d}`; };
  const PW = ["", "x", "x²", "x³", "x⁴", "x⁵", "x⁶", "x⁷"];
  const polyS = cs => {
    const n = cs.length - 1, out = [];
    cs.forEach((c, i) => {
      if (!c) return;
      const d = n - i, ab = Math.abs(c), body = (ab === 1 && d > 0) ? PW[d] : ab + PW[d];
      out.push(out.length ? `${c < 0 ? "−" : "+"} ${body}` : `${c < 0 ? "−" : ""}${body}`);
    });
    return out.join(" ") || "0";
  };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const comb = (n, k) => fact(n) / (fact(k) * fact(n - k));
  const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
  const flip = t => (ri(0, 1) ? [t[0], t[1], t[2]] : [t[1], t[0], t[2]]);

  // ================= LEVEL 25 =================
  const sinSum = () => {
    const [p1, q1, r1] = flip(pick(TRI)), [p2, q2, r2] = flip(pick(TRI));
    return Q(`Angles A and B are both acute. sin A = ${p1}/${r1} and cos B = ${q2}/${r2}. Then sin(A + B) = ?/${r1 * r2}. What is the missing numerator?`, p1 * q2 + q1 * p2,
      ["sin(A + B) = sin A cos B + cos A sin B. Two of those four pieces are not given yet.", "Find cos A and sin B with a right triangle (or sin² + cos² = 1). Then multiply the pairs and add; the denominators multiply to the number shown.", "Example: sin A = 20/29 and cos B = 4/5. Then cos A = 21/29 and sin B = 3/5. sin(A + B) = (20·4 + 21·3)/145 = 143/145. Now do yours."]);
  };
  const cosDiff = () => {
    const [p1, q1, r1] = flip(pick(TRI)), [p2, q2, r2] = flip(pick(TRI));
    return Q(`Angles A and B are both acute. cos A = ${q1}/${r1} and sin B = ${p2}/${r2}. Then cos(A − B) = ?/${r1 * r2}. What is the missing numerator?`, q1 * q2 + p1 * p2,
      ["cos(A − B) = cos A cos B + sin A sin B. Note the plus sign when it is a difference.", "Find sin A and cos B using a right triangle. Then multiply the matching pairs and add.", "Example: cos A = 21/29 and sin B = 3/5. Then sin A = 20/29 and cos B = 4/5. cos(A − B) = (21·4 + 20·3)/145 = 144/145. Now do yours."]);
  };
  const halfAng = () => {
    const q = pick([10, 13, 17, 25, 26, 29]); let p = ri(1, Math.floor(q * 0.7)); while (2 * p * p >= q * q) p--;
    return Q(`cos θ = ${q * q - 2 * p * p}/${q * q}, and θ/2 is an acute angle. Use sin²(θ/2) = (1 − cos θ)/2. Then sin(θ/2) = ?/${q}. What is the numerator?`, p,
      ["Put cos θ into (1 − cos θ)/2 and simplify the fraction.", "After simplifying you get a perfect square over " + q * q + ". Take the square root of top and bottom.", "Example: cos θ = 17/25. Then (1 − 17/25)/2 = (8/25)/2 = 4/25, so sin(θ/2) = 2/5. Now do yours."]);
  };
  const IDS = [
    ["tan x · cos x", "sin x", ["cos x", "tan x", "1"], "Write tan x as sin x ÷ cos x.", "Then the cos x on top and bottom cancel."],
    ["sin x ÷ tan x", "cos x", ["sin x", "sec x", "1"], "Dividing by tan x is the same as multiplying by cos x ÷ sin x.", "Look at what cancels."],
    ["1 − cos²x", "sin²x", ["cos²x", "tan²x", "1"], "Start with sin²x + cos²x = 1 and rearrange it.", "Move the cosine term to the other side."],
    ["1 + tan²x", "sec²x", ["cos²x", "csc²x", "sin²x"], "Divide the Pythagorean identity sin²x + cos²x = 1 by cos²x.", "Each term becomes a ratio; one of them is a reciprocal function squared."],
    ["sec x · cos x", "1", ["sin x", "tan x", "cos²x"], "sec x is the reciprocal of one of the basic functions.", "A number times its reciprocal is what?"],
    ["cot x · tan x", "1", ["0", "sin x", "sec x"], "cot x and tan x are reciprocals of each other.", "Think about multiplying reciprocals."],
    ["(1 − sin x)(1 + sin x)", "cos²x", ["sin²x", "1 + sin²x", "1"], "This is a difference of squares: (1 − a)(1 + a).", "After expanding, use the Pythagorean identity."],
    ["cot x · sin x", "cos x", ["sin x", "tan x", "csc x"], "Write cot x as cos x ÷ sin x.", "Look at what cancels."],
    ["sec²x − 1", "tan²x", ["sin²x", "cot²x", "cos²x"], "Compare with 1 + tan²x = sec²x.", "Rearrange that identity."],
    ["tan x ÷ sec x", "sin x", ["cos x", "tan²x", "1"], "Write both tan x and sec x using sine and cosine.", "Dividing by a fraction means flipping it; what cancels?"],
    ["csc²x − cot²x", "1", ["0", "sin²x", "tan²x"], "Use 1 + cot²x = csc²x.", "Rearrange that identity."],
    ["sin x · sec x", "tan x", ["cos x", "1", "cot x"], "sec x is 1 divided by cos x.", "What does sin x divided by cos x make?"],
    ["cos²x ÷ (1 − sin x)", "1 + sin x", ["1 − sin x", "cos x", "sin x"], "Replace cos²x by 1 − sin²x and factor it.", "One factor cancels with the bottom."],
    ["sin²x + cos²x + tan²x", "sec²x", ["1", "tan²x", "2"], "The first two terms together equal a famous constant.", "Then compare with 1 + tan²x."],
    ["sin²x ÷ (1 − cos x)", "1 + cos x", ["1 − cos x", "sin x", "cos x"], "Replace sin²x by 1 − cos²x, then factor it as a difference of squares.", "One factor cancels with the bottom."]
  ];
  const ident = () => {
    const it = pick(IDS);
    return C(`Simplify: ${it[0]}`, it[1], it[2], [it[3], it[4], "Example: simplify csc x · tan x. csc x = 1/sin x and tan x = sin x/cos x, so sin x cancels and the result is 1/cos x. Now do yours."]);
  };
  const ambig = () => {
    const b = pick([6, 8, 10, 12, 14, 16]), h = b / 2, t = ri(0, 3); let a, ans;
    if (t === 0) { a = ri(1, h - 1); ans = "0"; } else if (t === 1) { a = h; ans = "1"; } else if (t === 2) { a = ri(h + 1, b - 1); ans = "2"; } else { a = b + ri(0, 4); ans = "1"; }
    return C(`In triangle ABC, angle A = 30°, side b = ${b} and side a = ${a} (a is opposite angle A). How many different triangles can be made?`, ans, ["0", "1", "2"],
      ["Find the height h = b × sin 30° and compare a with it.", "Rule: a shorter than h means no triangle; a equal to h, or at least as long as b, means exactly one; a between h and b gives two.", "Example: A = 30°, b = 20, a = 15. h = 20 × ½ = 10. Since 10 < 15 < 20, two triangles. Now do yours."]);
  };
  const param = () => {
    const a = ri(1, 5), b = ri(0, 6), c = ri(1, 5), d = ri(0, 6), t = ri(1, 6), wx = ri(0, 1);
    return Q(`A moving point has x = ${a}t + ${b} and y = ${c}t + ${d}. At t = ${t}, what is its ${wx ? "x" : "y"}-coordinate?`, wx ? a * t + b : c * t + d,
      ["Parametric equations give x and y separately as functions of t.", `Put t = ${t} into the equation for ${wx ? "x" : "y"} only.`, "Example: x = 2t + 1, y = 3t + 4, t = 5: x = 11, y = 19. Now do yours."]);
  };
  const proj = () => {
    const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]); let a1, a2;
    do { a1 = ri(1, 12); a2 = ri(1, 12); } while ((a1 * p + a2 * q) % r);
    return Q(`The scalar projection of vector a = (${a1}, ${a2}) onto b = (${p}, ${q}) is (a · b) ÷ |b|. What is it?`, (a1 * p + a2 * q) / r,
      ["First find the dot product a · b and the length |b|.", "|b| = √(p² + q²) for b = (p, q). Then divide.", "Example: a = (4, 6), b = (3, 4). a · b = 12 + 24 = 36, |b| = 5, so 36/5. (Yours divides evenly.) Now do yours."]);
  };
  const cross = () => {
    const a = [ri(0, 5), ri(0, 5), ri(0, 5)], b = [ri(0, 5), ri(0, 5), ri(0, 5)], w = ri(0, 2);
    const nm = ["x", "y", "z"], v = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const fm = ["a₂b₃ − a₃b₂", "a₃b₁ − a₁b₃", "a₁b₂ − a₂b₁"];
    return N(`For a = (${a.join(", ")}) and b = (${b.join(", ")}), find the ${nm[w]}-component of the cross product a × b. (Use ${fm[w]}.)`, v[w],
      ["Match a₁, a₂, a₃ with the three numbers of a, and b₁, b₂, b₃ with those of b.", "Do the two products, then subtract in the order shown.", "Example: a = (1, 2, 3), b = (4, 5, 6): a₂b₃ − a₃b₂ = 2·6 − 3·5 = −3. Now do yours."], { step: 2 });
  };
  const cramer = () => {
    let a, b, c, d, x, y;
    do { a = ri(1, 6); b = ri(1, 6); c = ri(1, 6); d = ri(1, 6); } while (a * d - b * c === 0);
    x = ri(1, 9); y = ri(1, 9);
    const e = a * x + b * y, f = c * x + d * y, num = e * d - b * f, den = a * d - b * c;
    if (num / den !== x) return cramer();
    return Q(`Solve by Cramer's rule: ${a}x + ${b}y = ${e} and ${c}x + ${d}y = ${f}. What is x? (x = (e·d − b·f) ÷ (a·d − b·c))`, x,
      ["Use the formula in the question: put the numbers in for a, b, c, d, e and f.", "Compute the top and the bottom separately. Both can be negative; the quotient is x.", "Example: 3x + 2y = 12 and x + 4y = 14. Top: 12·4 − 2·14 = 20. Bottom: 3·4 − 2·1 = 10. So x = 2. Now do yours."]);
  };
  const demoivre = () => {
    if (ri(0, 1)) { const r = ri(2, 3), n = ri(2, 4); return Q(`Use De Moivre's theorem: what is the modulus (size) of (${r} cis 20°)${sup(n)}?`, r ** n,
      ["De Moivre: raise the modulus to the power n and multiply the angle by n.", "Only the modulus is asked, so ignore the angle.", "Example: (2 cis 10°)³ has modulus 2³ = 8 and angle 30°. Now do yours."]); }
    const th = pick([10, 15, 20, 25, 35, 40, 50, 70]), n = ri(2, 5);
    return Q(`Use De Moivre's theorem: (2 cis ${th}°)${sup(n)} has an angle of how many degrees (give a value from 0 to 359)?`, (th * n) % 360,
      ["The angle is multiplied by the power n.", "If the product is 360 or more, subtract 360 until it is between 0 and 359.", "Example: (3 cis 80°)⁵: 5 × 80 = 400, and 400 − 360 = 40°. Now do yours."]);
  };
  const rootsU = () => {
    const n = pick([3, 4, 5, 6, 8, 9, 10, 12]), t = ri(0, 1);
    if (t === 0) return Q(`The ${n} solutions of zⁿ = 1 (here n = ${n}) are spaced equally around the unit circle. What is the angle between neighbouring solutions, in degrees?`, 360 / n,
      ["The solutions split the full circle into equal parts.", "Full circle = 360°. Divide by the number of solutions.", "Example: z⁶ = 1 has 6 solutions, so 360 ÷ 6 = 60°. Now do yours."]);
    const k = ri(2, n - 1);
    return Q(`The ${n} solutions of zⁿ = 1 (n = ${n}) start at angle 0° and go round the circle. What is the angle of solution number ${k} after 1 (counting 1 itself as number 0)?`, k * 360 / n,
      ["First find the gap between neighbours: 360° divided by n.", "Solution number k is at k times that gap.", "Example: z⁸ = 1, solution number 3: gap 45°, so 3 × 45 = 135°. Now do yours."]);
  };
  const holes = () => {
    const a = ri(1, 7); let b, c, d; do { b = ri(1, 7); c = ri(1, 7); d = ri(1, 7); } while (b === a || c === a || c === d || d === a);
    const t = ri(0, 2), top = `(x − ${a})(x − ${b})`;
    if (t === 0) return Q(`f(x) = ${top} ÷ ((x − ${a})(x − ${c})). At what x-value is there a hole in the graph?`, a,
      ["A hole appears where a factor cancels from top and bottom.", "Find the factor that appears in both.", "Example: (x − 5)(x − 2) ÷ ((x − 5)(x − 9)) cancels (x − 5), so the hole is at x = 5. Now do yours."]);
    if (t === 1) return Q(`f(x) = ${top} ÷ ((x − ${a})(x − ${c})). At what positive x-value is the vertical asymptote?`, c,
      ["A vertical asymptote is a zero of the bottom that is NOT cancelled by the top.", "Cancel the common factor first. What factor remains on the bottom?", "Example: (x − 4)(x − 1) ÷ ((x − 4)(x − 8)): (x − 4) cancels, (x − 8) stays, so the asymptote is x = 8. Now do yours."]);
    return Q(`f(x) = ${top} ÷ ((x − ${a})(x − ${c})(x − ${d})). How many vertical asymptotes does it have? (Count only the distinct ones that are not holes.)`, c === b ? 1 : (d === b ? 1 : 2),
      ["Zeros of the bottom are x = " + [a, c, d].join(", ") + ". Some may cancel with the top.", "A zero of the bottom that also is a zero of the top is a hole, not an asymptote.", "Example: bottom zeros 2, 5, 7 and top zeros 2, 3. Only 2 cancels, leaving 2 asymptotes (x = 5, x = 7). Now do yours."]);
  };
  const partial = () => {
    let a, b; do { a = ri(1, 6); b = ri(1, 6); } while (a === b);
    const A = ri(1, 5), B = ri(1, 5), cc = A + B, dd = -(A * b + B * a);
    return Q(`${cc}x ${dd < 0 ? "−" : "+"} ${Math.abs(dd)} over (x − ${a})(x − ${b}) = A/(x − ${a}) + B/(x − ${b}). Find A.`, A,
      [`Multiply both sides by (x − ${a})(x − ${b}). Then pick an x that makes one of the two terms vanish.`, `Put x = ${a} into the numerator ${cc}x ${dd < 0 ? "−" : "+"} ${Math.abs(dd)}, and divide by (${a} − ${b}).`, "Example: (5x − 11)/((x − 1)(x − 4)). Put x = 1: top = −6, bottom factor (1 − 4) = −3, so A = 2. Now do yours."]);
  };
  const growthG = () => {
    const t = ri(0, 2);
    if (t === 0) { const g = ri(2, 3), d = ri(2, 6), k = ri(2, 4), n0 = ri(1, 6); return Q(`A colony of ${n0} cells ${g === 2 ? "doubles" : "triples"} every ${d} hours. How many cells after ${d * k} hours?`, n0 * g ** k,
      [`Count how many ${g === 2 ? "doublings" : "triplings"} fit in ${d * k} hours.`, "Multiply the start by the growth factor once for every period.", "Example: 3 cells doubling every 4 hours, 12 hours: 3 periods, so 3 × 2³ = 24. Now do yours."]); }
    if (t === 1) { const P = ri(1, 9) * 100, r = pick([10, 20]); return Q(`$${P} grows by ${r}% each year (compound growth, a savings account). How many dollars after 2 years?`, P * (1 + r / 100) ** 2,
      [`Each year multiply by ${1 + r / 100}.`, "Two years means multiplying twice, A = P(1 + r)².", "Example: $500 at 10% for 2 years: 500 × 1.1 × 1.1 = 605. Now do yours."]); }
    const g = pick([2, 3, 4]), n0 = ri(1, 5) * g ** 3, k = ri(1, 3);
    return growthG2(g, n0, k);
  };
  const growthG2 = (g, n0, k) => Q(`A bucket holds ${n0 * g ** k} liters. Each day its contents shrink to 1/${g} of the day before. How many liters after ${k} days?`, n0,
    ["Each day you divide by the same number.", `Divide ${k} times (or divide once by that number to the power ${k}).`, "Example: 81 liters shrinking to 1/3 each day for 2 days: 81 ÷ 9 = 9. Now do yours."]);
  const recur = () => {
    const p = ri(2, 3), q = ri(0, 3), s = ri(1, 4), k = ri(3, 5); let v = s; for (let i = 1; i < k; i++) v = p * v + q;
    return Q(`A sequence has a₁ = ${s} and aₙ₊₁ = ${p}·aₙ + ${q}. What is a${String(k).replace(/\d/g, d => SUB[d])}?`, v,
      ["Build the terms one at a time starting from a₁.", `To get the next term, multiply the last by ${p} and add ${q}. Repeat until you reach term ${k}.`, "Example: a₁ = 2, aₙ₊₁ = 3aₙ + 1. a₂ = 7, a₃ = 22, a₄ = 67. Now do yours."]);
  };
  const IND = [
    ["Proof by induction has two main steps. The first is the base case. What is the second?", "the inductive step: if true for k, then true for k + 1", ["checking 100 examples", "finding a counterexample", "dividing both sides by n"], "One step starts the chain, the other keeps it going.", "The second step links each number to the next one."],
    ["In the inductive step we assume the statement is true for n = k. What is this assumption called?", "the inductive hypothesis", ["the conclusion", "the base case", "a counterexample"], "It is the thing we are allowed to assume for now.", "It has the word 'hypothesis' in it."],
    ["Induction can prove a statement for", "every whole number n from the base case upward", ["only the first 100 numbers", "only prime numbers", "only even numbers"], "Think of an unending line of dominoes.", "If the first falls and each knocks over the next, how many fall?"],
    ["The base case of 1 + 2 + … + n = n(n + 1)/2 means checking it for n = 1. Which is the correct check?", "1 = 1·2/2", ["1 = 1·1/2", "2 = 1·2/2", "1 = 2·3/2"], "Put n = 1 in both sides: the left side is the sum of just one term.", "The right side becomes 1 times the next number, divided by 2."],
    ["P(n): 1 + 3 + 5 + … + (2n − 1) = n². What is the right side of P(k + 1)?", "(k + 1)²", ["k² + 1", "k² + 2", "k + 1²"], "Replace n by k + 1 everywhere, brackets included.", "The whole expression n is replaced, not just part of it."],
    ["To go from 1 + 2 + … + k to 1 + 2 + … + (k + 1), what do we add?", "k + 1", ["k", "k − 1", "1"], "One new last term appears.", "It is the next number in the list."],
    ["A student checks that a rule works for n = 1 to 10 and says that proves it forever. Is that induction?", "No: checking examples is not a proof", ["Yes: ten examples is enough", "Yes: but only for even numbers", "No: because 10 is too small"], "Examples can suggest a rule but cannot show it always works.", "A proof must also show that the rule passes from k to k + 1."]
  ];
  const induct = () => {
    const it = pick(IND);
    return C(it[0], it[1], it[2], [it[3], it[4], "Example: dominoes. The first domino falls (base case) and every falling domino knocks over the next one (inductive step), so all fall. Now do yours."]);
  };
  const WORDS = ["BOOK", "MOON", "LEVEL", "APPLE", "BANANA", "SEEDS", "ELEVEN", "TOOTH", "PEPPER", "ALLOW", "GOOSE", "SUMMER"];
  const perms = () => {
    const w = pick(WORDS), cnt = {}; [...w].forEach(c => { cnt[c] = (cnt[c] || 0) + 1; });
    let v = fact(w.length); Object.values(cnt).forEach(c => { v /= fact(c); });
    const reps = Object.entries(cnt).filter(e => e[1] > 1).map(e => `${e[0]} appears ${e[1]} times`).join(", ");
    return Q(`How many different arrangements of the letters of the word ${w} are there? (${reps})`, v,
      [`${w.length} letters can be arranged in ${w.length}! ways if all were different. But repeated letters cause duplicates.`, "Divide by the factorial of each repeat count.", "Example: NOON has 4 letters, with N twice and O twice: 4! ÷ (2! × 2!) = 24 ÷ 4 = 6. Now do yours."]);
  };
  const linmap = () => {
    const a = ri(0, 5), b = ri(0, 5), c = ri(0, 5), d = ri(0, 5), x = ri(1, 5), y = ri(1, 5), w = ri(0, 1);
    return Q(`The matrix [[${a}, ${b}], [${c}, ${d}]] (rows in brackets) transforms the point (${x}, ${y}). What is the ${w ? "second" : "first"} coordinate of the new point?`, w ? c * x + d * y : a * x + b * y,
      [`The ${w ? "second" : "first"} row of the matrix gives the ${w ? "second" : "first"} coordinate.`, "New coordinate = (row entry 1) × x + (row entry 2) × y.", "Example: [[2, 1], [0, 3]] on (4, 5): first = 2·4 + 1·5 = 13, second = 0·4 + 3·5 = 15. Now do yours."]);
  };

  const l25 = [
    L("Sum formulas for sine", sinSum, [S("Adding angles", "sin(A + B)", "sin(A + B) = sin A cos B + cos A sin B. It is not just sin A + sin B."), S("Missing pieces", "📐", "Often you know sin of one angle and cos of the other. Use a right triangle to find the missing ones."), S("Example", "sin 75°", "75° = 45° + 30°, so sin 75° = sin 45° cos 30° + cos 45° sin 30°.")]),
    L("Difference formula for cosine", cosDiff, [S("Subtracting angles", "cos(A − B)", "cos(A − B) = cos A cos B + sin A sin B. The sign flips to plus!"), S("Compare", "cos(A + B)", "For a sum the sign is minus: cos A cos B − sin A sin B."), S("Tip", "🔺", "Draw both right triangles to read off sines and cosines.")]),
    L("Half-angle formulas", halfAng, [S("Half an angle", "θ/2", "sin²(θ/2) = (1 − cos θ)/2 and cos²(θ/2) = (1 + cos θ)/2."), S("Take the root", "±√", "The sign depends on the quadrant of θ/2. For an acute angle it is positive."), S("Example", "cos θ = 1/2", "sin²(θ/2) = (1 − ½)/2 = ¼, so sin(θ/2) = ½ and θ/2 = 30°.")]),
    L("Proving identities", ident, [S("Simplify", "🧩", "To simplify a trig expression, rewrite everything with sine and cosine, then cancel."), S("Key identities", "sin²x + cos²x = 1", "Also 1 + tan²x = sec²x and 1 + cot²x = csc²x."), S("Tip", "Work on one side", "Change just one side until it matches the other.")]),
    L("The ambiguous case (SSA)", ambig, [S("Two sides and a non-included angle", "SSA", "Knowing side a, side b and angle A can give 0, 1 or 2 triangles."), S("The height", "h = b sin A", "Swing side a like a gate. If it cannot reach the base line there is no triangle."), S("The rule", "a < h → 0 · a = h → 1 · h < a < b → 2 · a ≥ b → 1", "For angle A acute.")]),
    L("Parametric equations", param, [S("Time as a helper", "x(t), y(t)", "Instead of y in terms of x, both x and y depend on a third variable t, like time."), S("Plug in t", "📍", "Each value of t gives one point (x, y) on the path."), S("Example", "x = 2t, y = t + 1", "t = 3 gives the point (6, 4).")]),
    L("Vector projection", proj, [S("A shadow", "➡️", "The projection of a onto b is the shadow of a lying along b."), S("Scalar projection", "(a · b) ÷ |b|", "Dot product divided by the length of b."), S("Example", "a = (4, 6), b = (3, 4)", "Dot 36, length 5, so 36/5 = 7.2.")]),
    L("The cross product in 3D", cross, [S("Perpendicular vector", "a × b", "In 3D the cross product is a new vector perpendicular to both a and b."), S("Components", "(a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁)", "Each component is a small 2×2 determinant."), S("Use", "area", "The length of a × b is the area of the parallelogram the two vectors make.")]),
    L("Cramer's rule", cramer, [S("Solve by determinants", "2 × 2 systems", "For ax + by = e and cx + dy = f, let D = ad − bc."), S("The formulas", "x = (ed − bf)/D, y = (af − ec)/D", "It works whenever D is not 0."), S("When D = 0", "⚠️", "Then the lines are parallel or the same, so no single solution.")]),
    L("De Moivre's theorem", demoivre, [S("Powers of complex numbers", "r cis θ", "In polar form, a complex number has a size r and an angle θ."), S("Raise to a power", "(r cis θ)ⁿ = rⁿ cis nθ", "Raise the size to the power and multiply the angle by n."), S("Example", "(2 cis 30°)³", "Size 8, angle 90°.")]),
    L("Roots of unity", rootsU, [S("Solutions of zⁿ = 1", "⭕", "There are exactly n complex solutions, all on the unit circle."), S("Equal spacing", "360° ÷ n", "They are equally spread, starting with z = 1 at angle 0°."), S("Example", "z⁴ = 1", "Angles 0°, 90°, 180°, 270°: the numbers 1, i, −1, −i.")]),
    L("Holes and asymptotes", holes, [S("Cancelling factors", "(x − a)/(x − a)", "A factor on top and bottom cancels, but the graph still has a missing point there: a <b>hole</b>."), S("Vertical asymptotes", "bottom = 0", "A zero of the bottom that does not cancel gives a vertical asymptote."), S("Check", "🔍", "Always factor top and bottom first.")]),
    L("Partial fractions", partial, [S("Splitting a fraction", "A/(x − a) + B/(x − b)", "A complicated fraction can be split into simple ones."), S("Cover-up trick", "x = a", "Multiply through by the bottom, then set x = a: only A survives."), S("Why", "∫", "Simple fractions are easier to integrate later.")]),
    L("Growth and decay", growthG, [S("Repeated multiplying", "×2 ×2 ×2", "Growth multiplies by the same factor each period; decay divides or multiplies by a fraction."), S("Formula", "A = P · gᵗ", "P is the start, g the growth factor, t the number of periods."), S("Percent", "10% up → × 1.1", "Add the percent to 1 to get the factor.")]),
    L("Recursive sequences", recur, [S("Rule from the last term", "aₙ₊₁ = f(aₙ)", "A recursive rule tells you how to get the next term from the one before."), S("Build up", "a₁, a₂, a₃…", "You must start from the first term and work forward."), S("Example", "a₁ = 1, aₙ₊₁ = 2aₙ + 1", "1, 3, 7, 15, 31…")]),
    L("Mathematical induction", induct, [S("Dominoes", "🁢🁢🁢", "To prove a statement for every n: show it holds for the first one, and that each one passing makes the next pass."), S("Two steps", "base + step", "Base case: check n = 1. Inductive step: assume P(k), prove P(k + 1)."), S("Why it works", "∞", "The first falls, which knocks the second, and so on forever.")]),
    L("Counting arrangements with repeats", perms, [S("All different", "n!", "n different letters can be arranged in n! ways."), S("Repeats", "n! ÷ (a! b! …)", "If a letter appears a times, divide by a! to remove the duplicates."), S("Example", "BOOK", "4! ÷ 2! = 12 arrangements.")]),
    L("Matrices as transformations", linmap, [S("Matrix times point", "[[a, b], [c, d]]", "A 2×2 matrix moves each point (x, y) to a new point."), S("Rows give coordinates", "(ax + by, cx + dy)", "Row 1 gives the new x, row 2 gives the new y."), S("Special matrices", "rotate · stretch · reflect", "Different matrices turn, stretch or flip the plane.")])
  ];
  l25.push(mixOf("Mixed practice", [l25[0], l25[3], l25[4], l25[7], l25[8], l25[10], l25[13], l25[15]]));
  l25.push(mixOf("Level 25 Challenge", [l25[1], l25[2], l25[5], l25[6], l25[9], l25[11], l25[12], l25[14], l25[16], l25[17]]));

  // ================= LEVEL 26 =================
  const limInf = () => {
    const t = ri(0, 2), d = ri(1, 4), k = ri(1, 6), a = d * k;
    if (t === 0) return Q(`What is the limit as x → ∞ of (${polyS([a, ri(1, 9), ri(1, 9)])}) ÷ (${polyS([d, ri(1, 9), ri(1, 9)])})?`, k,
      ["Both top and bottom are degree 2. For huge x only the x² terms matter.", "The limit is the ratio of the two leading coefficients.", "Example: (6x² + 5x + 1) ÷ (2x² + 7) → 6 ÷ 2 = 3. Now do yours."]);
    if (t === 1) return Q(`What is the limit as x → ∞ of (${polyS([ri(1, 9), ri(1, 9)])}) ÷ (${polyS([d, ri(1, 9), ri(1, 9)])})?`, 0,
      ["The top is degree 1 but the bottom is degree 2.", "When the bottom grows faster, the fraction shrinks toward a single value.", "Example: (4x + 1) ÷ (x² + 3) gets closer and closer to 0 as x grows. Now do yours."]);
    return Q(`What is the limit as x → ∞ of (${polyS([a, 0, ri(1, 9), ri(1, 9)])}) ÷ (${polyS([d, ri(1, 9), 0, ri(1, 9)])})?`, k,
      ["Both top and bottom are degree 3.", "Compare only the x³ terms: divide their coefficients.", "Example: (9x³ + x) ÷ (3x³ + 2x² + 5) → 9 ÷ 3 = 3. Now do yours."]);
  };
  const limFac = () => {
    if (ri(0, 1)) { const p = ri(1, 12); return Q(`What is the limit as x → ${p} of (x² − ${p * p}) ÷ (x − ${p})?`, 2 * p,
      ["Direct substitution gives 0 ÷ 0, so factor the top first.", "x² − p² = (x − p)(x + p). Cancel (x − p), then substitute.", "Example: limit as x → 4 of (x² − 16) ÷ (x − 4) = limit of (x + 4) = 8. Now do yours."]); }
    const p = ri(2, 9), q = ri(1, p - 1);
    return N(`What is the limit as x → ${p} of (${polyS([1, -(p + q), p * q])}) ÷ (x − ${p})?`, p - q,
      ["Direct substitution gives 0 ÷ 0, so factor the top first.", `The top factors as (x − ${p})(x − something). Cancel the common factor and substitute.`, "Example: limit as x → 5 of (x² − 8x + 15) ÷ (x − 5): top = (x − 5)(x − 3), limit of (x − 3) = 2. Now do yours."]);
  };
  const contin = () => {
    const a = ri(1, 4), b = ri(0, 5), c = ri(1, 4), d = ri(0, 4);
    return N(`f(x) = ${a}x + ${b} when x &lt; ${c}, and f(x) = ${d}x + k when x ≥ ${c}. Which value of k makes f continuous at x = ${c}?`, a * c + b - d * c,
      ["Continuous means the two pieces meet at x = " + c + ".", `Put x = ${c} into both pieces and set the results equal. Then solve for k.`, "Example: 2x + 1 for x < 3, and x + k for x ≥ 3. At 3: 2·3 + 1 = 7 and 3 + k = 7, so k = 4. Now do yours."], { step: 2 });
  };
  const trigLim = () => {
    const b = ri(1, 5), k = ri(1, 6), a = b * k, fn = pick(["sin", "tan"]);
    return Q(`Use lim (${fn} u)/u = 1 as u → 0. What is the limit as x → 0 of ${fn}(${a}x) ÷ (${b}x)?`, k,
      [`Make the angle ${a}x also appear on the bottom: multiply and divide by ${a}.`, `${fn}(${a}x)/(${a}x) → 1, so what remains is a ratio of the two plain numbers.`, "Example: sin(6x) ÷ (2x) = (sin 6x ÷ 6x) × (6 ÷ 2) → 1 × 3 = 3. Now do yours."]);
  };
  const infLim = () => {
    const a = ri(1, 9), t = ri(0, 4); let txt, ans;
    if (t === 0) { txt = `1/(x − ${a}) as x → ${a} from the right (x slightly bigger than ${a})`; ans = "∞"; }
    else if (t === 1) { txt = `1/(x − ${a}) as x → ${a} from the left (x slightly smaller than ${a})`; ans = "−∞"; }
    else if (t === 2) { txt = `1/(${a} − x) as x → ${a} from the right`; ans = "−∞"; }
    else if (t === 3) { txt = `1/(x − ${a})² as x → ${a} from either side`; ans = "∞"; }
    else { txt = `−1/(x − ${a})² as x → ${a}`; ans = "−∞"; }
    return C(`What does ${txt} head toward?`, ans, ["∞", "−∞", "0", "1"],
      ["Decide the sign of the bottom for numbers just next to the target.", "A tiny positive bottom makes the fraction hugely positive; a tiny negative one makes it hugely negative. A square is never negative.", "Example: 1/(x − 2) as x → 2 from the left: the bottom is a tiny negative, so the fraction goes to minus infinity. Now do yours."]);
  };
  const ivt = () => {
    const t = ri(0, 2), a = ri(0, 3), b = a + ri(2, 4), YES = "Yes, guaranteed", NO = "No, not guaranteed";
    if (t === 0) { const p = ri(1, 6), q = p + ri(4, 10), r = ri(p + 1, q - 1); return C(`f is continuous on [${a}, ${b}], with f(${a}) = ${p} and f(${b}) = ${q}. Must f take the value ${r} somewhere in between?`, YES, [NO],
      ["The Intermediate Value Theorem needs a continuous function.", "Check whether the target value sits between the two end values.", "Example: continuous f with f(0) = 2 and f(5) = 9; the value 6 is between 2 and 9, so yes. Now do yours."]); }
    if (t === 1) { const p = ri(1, 6), q = p + ri(4, 10), r = q + ri(1, 5); return C(`f is continuous on [${a}, ${b}], with f(${a}) = ${p} and f(${b}) = ${q}. Must f take the value ${r} somewhere in between?`, NO, [YES],
      ["Compare the target value with the values at the two ends.", "The theorem only promises values between the end values.", "Example: continuous f with f(0) = 2 and f(5) = 9: the value 12 is outside 2 to 9, so it is not promised. Now do yours."]); }
    const p = ri(2, 8), q = ri(2, 8);
    return C(`f is continuous on [${a}, ${b}], with f(${a}) = −${p} and f(${b}) = ${q}. Must the equation f(x) = 0 have a solution in [${a}, ${b}]?`, YES, [NO],
      ["Look at the signs of f at the two ends.", "Zero lies between a negative and a positive number.", "Example: continuous f with f(1) = −3 and f(4) = 5. Zero is between −3 and 5, so there is a solution. Now do yours."]);
  };
  const stdev = () => {
    if (ri(0, 1)) { const s = ri(1, 4), t = ri(5, 20), base = [2, 4, 4, 4, 5, 5, 7, 9].map(v => v * s + t - 5 * s);
      return Q(`The data are ${base.join(", ")} (mean ${t}). The population standard deviation is the square root of the average squared distance from the mean. What is it?`, 2 * s,
        ["Find each distance from the mean, square it, then average the squares.", "Take the square root of that average (the variance).", "Example: data 1, 5 (mean 3). Distances 2 and 2, squares 4 and 4, average 4, square root 2. Now do yours."]); }
    const d = ri(1, 9), mu = ri(10, 30);
    return Q(`The four numbers ${mu - d}, ${mu - d}, ${mu + d}, ${mu + d} have mean ${mu}. What is their standard deviation?`, d,
      ["Every number is the same distance from the mean.", "If every distance is the same, the typical distance is that number.", "Example: 8, 8, 14, 14 have mean 11; each is 3 away, so the standard deviation is 3. Now do yours."]);
  };
  const empir = () => {
    const mu = ri(5, 15) * 10, sd = pick([5, 10, 15]), ctx = pick(["Test scores", "Plant heights in mm", "Jump lengths in cm"]);
    const T = [
      [`between ${mu - sd} and ${mu + sd}`, "68"], [`between ${mu - 2 * sd} and ${mu + 2 * sd}`, "95"], [`above ${mu + sd}`, "16"],
      [`below ${mu - sd}`, "16"], [`between ${mu} and ${mu + sd}`, "34"], [`below ${mu + sd}`, "84"], [`above ${mu}`, "50"]
    ], it = pick(T);
    return C(`${ctx} follow a normal curve with mean ${mu} and standard deviation ${sd}. About what percent are ${it[0]}?`, it[1], ["68", "95", "16", "34", "84", "50", "99.7"],
      ["Work out how many standard deviations each boundary is from the mean.", "Rule: about 68% are within 1 SD, 95% within 2 SD. The curve is symmetric, so halves and tails follow from that.", "Example: mean 40, SD 5. Between 35 and 45 is within 1 SD, so about 68%. Between 40 and 45 is half of that. Now do yours."]);
  };
  const zscore = () => {
    const mu = ri(5, 15) * 10, sd = pick([4, 5, 10, 15]), k = ri(1, 4);
    if (ri(0, 1)) return Q(`A score is ${mu + k * sd}. The mean is ${mu} and the standard deviation is ${sd}. What is the z-score? (z = (x − mean) ÷ SD)`, k,
      ["z tells how many standard deviations a value is from the mean.", `Subtract the mean, then divide by ${sd}.`, "Example: x = 70, mean 60, SD 5: (70 − 60) ÷ 5 = 2. Now do yours."]);
    return Q(`The mean is ${mu} and the standard deviation is ${sd}. A value has z-score ${k}. What is the value?`, mu + k * sd,
      ["Each z unit equals one standard deviation above the mean.", "Value = mean + z × SD.", "Example: mean 60, SD 5, z = 3: 60 + 3 × 5 = 75. Now do yours."]);
  };
  const binom = () => {
    const n = ri(3, 6), k = ri(1, n - 1);
    return Q(`A fair coin is flipped ${n} times. The chance of exactly ${k} heads is ?/${2 ** n}. What is the numerator?`, comb(n, k),
      ["Count how many different sequences of flips have exactly that many heads.", `That count is "${n} choose ${k}". Each sequence has the same chance 1/${2 ** n}.`, "Example: 4 flips, exactly 1 head: 4 choose 1 = 4, so the chance is 4/16. Now do yours."]);
  };
  const expect = () => {
    const n = ri(3, 5), k = ri(2, 9); const vals = []; for (let i = 0; i < n; i++) vals.push(k + i * ri(1, 1));
    let s = vals.reduce((a, b) => a + b, 0); while (s % n) { vals[0]++; s++; }
    return Q(`A spinner for a video-game bonus has ${n} equal sections worth ${vals.join(", ")} points. What is the expected number of points per spin?`, s / n,
      ["Expected value is the long-run average.", "All sections are equally likely, so add the values and divide by how many there are.", "Example: sections 2, 4, 6: sum 12, divided by 3 = 4. Now do yours."]);
  };
  const condP = () => {
    const A = ri(10, 30), both = ri(3, A - 2), tot = A + ri(10, 30), ctx = pick([["play soccer", "also play chess"], ["have a pet", "have a dog"], ["took the bus", "were late"]]);
    return C(`In a group of ${tot} students, ${A} ${ctx[0]}, and ${both} of those ${ctx[1]}. If you pick a student who ${ctx[0]}, what is the chance they ${ctx[1].replace("also ", "")}? (simplified fraction)`, fr(both, A), [fr(both, tot), fr(A, tot), fr(A - both, A)],
      ["With 'given that', you only look at the smaller group that satisfies the condition.", "The denominator is the size of that group, not the whole class.", "Example: 20 students in all, 8 like art, 2 of those like music. Chance of music given art = 2/8 = 1/4. Now do yours."]);
  };
  const halfLife = () => {
    const h = ri(2, 10), k = ri(1, 4), n0 = ri(1, 6) * 2 ** k;
    return Q(`A sample of ${n0 * 10} grams of a safe lab material has a half-life of ${h} days. How many grams remain after ${h * k} days?`, n0 * 10 / 2 ** k,
      ["Half-life is the time it takes for half to disappear.", `Count how many half-lives fit in ${h * k} days, then halve that many times.`, "Example: 80 g with half-life 3 days, after 9 days: 3 halvings, 80 → 40 → 20 → 10. Now do yours."]);
  };
  const logScale = () => {
    const d = ri(1, 4), t = ri(0, 1);
    if (t === 0) return Q(`On the Richter scale each whole number step means 10 times larger ground shaking. How many times larger is a magnitude ${5 + d} quake than a magnitude 5 quake?`, 10 ** d,
      ["Each step up multiplies by 10.", `You go up ${d} step${d > 1 ? "s" : ""}, so multiply by 10 that many times.`, "Example: magnitude 7 versus 4 is 3 steps: 10 × 10 × 10 = 1000. Now do yours."]);
    return Q(`A sound of 10 decibels (dB) more has 10 times the power. A sound ${10 * d} dB louder has how many times the power?`, 10 ** d,
      ["Every 10 dB multiplies the power by 10.", `${10 * d} dB is ${d} groups of 10 dB.`, "Example: 30 dB louder is 3 groups of 10, so 10³ = 1000 times the power. Now do yours."]);
  };
  const sys3 = () => {
    const x = ri(1, 8), y = ri(1, 8), z = ri(1, 8), w = ri(0, 2), nm = ["x", "y", "z"];
    const S1 = x + y + z, T = x + y - z, U = x - y + z;
    if (T < 0 || U < 0) return sys3();
    const sol = [x, y, z][w], hint = w === 0 ? "Add the second and third equations: the y and z terms cancel." : w === 1 ? "Subtract the third equation from the first." : "Subtract the second equation from the first.";
    return Q(`Solve: x + y + z = ${S1}, x + y − z = ${T}, x − y + z = ${U}. What is ${nm[w]}?`, sol,
      ["Look for two equations that you can add or subtract to cancel variables.", hint, "Example: a + b + c = 10, a + b − c = 4 gives 2c = 6, so c = 3. Now do yours."]);
  };
  const riemann = () => {
    const FS = [["x²", x => x * x], ["x² + 1", x => x * x + 1], ["2x + 1", x => 2 * x + 1], ["x³", x => x * x * x]], f = pick(FS), n = ri(3, 5), left = ri(0, 1);
    let s = 0; for (let i = 0; i < n; i++) s += f[1](left ? i : i + 1);
    return Q(`Estimate the area under f(x) = ${f[0]} from x = 0 to x = ${n} with ${n} rectangles of width 1, using the ${left ? "left" : "right"} end of each strip for the height. What is the total area?`, s,
      [`The strips are at x = 0 to 1, 1 to 2, and so on. Each has width 1, so area = height.`, left ? "Left sum: use f(0), f(1), … up to f(" + (n - 1) + ")." : "Right sum: use f(1), f(2), … up to f(" + n + ").", "Example: f(x) = x on [0, 3], left heights 0, 1, 2: total 3. Now do yours."]);
  };
  const parab = () => {
    const p = ri(1, 12);
    return Q(`A parabola has the equation x² = ${4 * p}y. In x² = 4py the focus is at (0, p). What is p?`, p,
      ["Match the number in front of y with 4p.", "Divide that number by 4.", "Example: x² = 20y means 4p = 20, so p = 5. Now do yours."]);
  };
  const avgRate = () => {
    const t = ri(0, 2), a = ri(1, 5), b = a + ri(1, 5), p = ri(1, 6);
    if (t === 0) return Q(`What is the average rate of change of f(x) = x² between x = ${a} and x = ${b}?`, a + b,
      ["Average rate of change = (f(b) − f(a)) ÷ (b − a).", `Find f(${a}) and f(${b}), subtract, then divide.`, "Example: x² from 2 to 5: (25 − 4) ÷ 3 = 7. Now do yours."]);
    if (t === 1) return Q(`What is the average rate of change of f(x) = x² + ${p}x between x = ${a} and x = ${b}?`, a + b + p,
      ["Average rate of change = (f(b) − f(a)) ÷ (b − a).", `Work out f(${a}) and f(${b}) with the ${p}x included.`, "Example: x² + 2x from 1 to 4: f(4) = 24, f(1) = 3, (24 − 3) ÷ 3 = 7. Now do yours."]);
    return Q(`What is the average rate of change of f(x) = x³ between x = ${a} and x = ${b}?`, a * a + a * b + b * b,
      ["Average rate of change = (f(b) − f(a)) ÷ (b − a).", `Find f(${a}) and f(${b}), subtract, then divide. The division comes out even.`, "Example: x³ from 1 to 3: (27 − 1) ÷ 2 = 13. Now do yours."]);
  };

  const l26 = [
    L("Limits at infinity", limInf, [S("Going far out", "x → ∞", "A limit at infinity asks where f(x) settles when x grows without end."), S("Compare degrees", "top vs bottom", "Same degree: ratio of leading coefficients. Smaller degree on top: the limit is 0."), S("Why", "only the biggest term", "For huge x, the highest powers dominate everything else.")]),
    L("Limits by factoring", limFac, [S("The 0 ÷ 0 problem", "0/0", "If substituting gives 0/0, the expression may still have a limit."), S("Factor and cancel", "(x − p)(x + p)", "Cancel the factor that causes the zero, then substitute."), S("Remember", "🕳️", "The limit describes the hole, even though the function has no value there.")]),
    L("Continuity of piecewise functions", contin, [S("No jumps", "✏️", "A function is continuous if you can draw it without lifting your pencil."), S("Match at the join", "left = right", "Set the pieces equal at the point where the rule changes."), S("Solve", "k", "That gives an equation for the unknown number.")]),
    L("Famous trig limits", trigLim, [S("Small angles", "sin u / u → 1", "For tiny angles measured in radians, sin u is almost u."), S("Scaling", "sin(ax)/x → a", "Multiply and divide by a to use the famous limit."), S("Same for tan", "tan u / u → 1", "tan u is also almost u for tiny u.")]),
    L("Infinite limits", infLim, [S("Blowing up", "→ ∞", "Sometimes f(x) grows without bound near a point: a vertical asymptote."), S("Check the sign", "+ or −", "Tiny positive bottoms make +∞; tiny negative bottoms make −∞."), S("Squares", "(x − a)²", "A square on the bottom is always positive, so both sides agree.")]),
    L("The Intermediate Value Theorem", ivt, [S("No skipping", "🏔️", "A continuous function cannot skip over values: if it goes from 2 to 9 it passes through every value between."), S("Zeros", "− then +", "If f is negative at one end and positive at the other, it crosses zero somewhere."), S("Careful", "continuous!", "The theorem needs continuity. Jumps can skip values.")]),
    L("Standard deviation", stdev, [S("Spread", "📏", "Standard deviation measures how far data typically are from the mean."), S("Steps", "distance → square → average → root", "Find each distance from the mean, square, average, then take the square root."), S("Same data, shifted", "↔", "Adding a number to every value moves the mean but not the spread.")]),
    L("The 68-95-99.7 rule", empir, [S("Bell curve", "🔔", "Many measurements follow a normal curve, symmetric around the mean."), S("The rule", "68% · 95% · 99.7%", "About 68% lie within 1 SD of the mean, 95% within 2 SD and 99.7% within 3 SD."), S("Tails", "16% each side", "100 − 68 = 32, split into two tails of about 16% each.")]),
    L("z-scores", zscore, [S("Standard units", "z", "A z-score says how many standard deviations a value is above (or below) the mean."), S("Formula", "z = (x − mean) ÷ SD", "Subtract the mean, then divide by the SD."), S("Go backwards", "x = mean + z × SD", "Multiply z by the SD and add the mean.")]),
    L("Binomial probability", binom, [S("Many tries", "🪙", "When you repeat something with two outcomes, count the ways to get exactly k successes."), S("Counting", "n choose k", "C(n, k) counts the sequences with exactly k heads in n flips."), S("Chance", "C(n, k) ÷ 2ⁿ", "For a fair coin every sequence is equally likely.")]),
    L("Expected value", expect, [S("The long-run average", "🎡", "Expected value is what you get on average if you repeat many times."), S("Equal chances", "sum ÷ count", "When all outcomes are equally likely, just average them."), S("Weighted", "value × chance", "Otherwise multiply each value by its chance and add.")]),
    L("Conditional probability", condP, [S("Given that", "P(B | A)", "The chance of B once you know A has happened."), S("Shrink the world", "group A only", "Only the people in A count now. Divide by the size of A."), S("Formula", "P(A and B) ÷ P(A)", "Or count: (both) ÷ (A).")]),
    L("Half-life", halfLife, [S("Halving again and again", "½ → ¼ → ⅛", "After each half-life, half of what was left disappears."), S("Count periods", "time ÷ half-life", "That gives the number of times to halve."), S("Formula", "A = A₀ · (½)ⁿ", "n is the number of half-lives.")]),
    L("Logarithmic scales", logScale, [S("Powers of ten", "10ⁿ", "On a log scale each step up multiplies by 10."), S("Earthquakes", "📈", "A magnitude 6 quake shakes the ground 10 times more than a magnitude 5."), S("Sound", "dB", "Every 10 decibels is 10 times the power.")]),
    L("Three equations, three unknowns", sys3, [S("Eliminate", "➕➖", "Add or subtract equations to cancel one variable at a time."), S("Two at a time", "3 → 2 → 1", "Combine to get two equations in two unknowns, then one in one unknown."), S("Check", "✅", "Put your solution back into all three equations.")]),
    L("Area with rectangles", riemann, [S("Under a curve", "📊", "To estimate the area under a curve, chop it into thin strips and add the rectangles."), S("Left or right", "height choice", "Left sum uses the left edge of each strip for the height; right sum uses the right edge."), S("Better estimates", "thinner strips", "Thinner strips give a better answer. This idea becomes the integral.")]),
    L("Parabolas: the focus", parab, [S("A special point", "⦿", "Every parabola has a focus. Light parallel to its axis bounces to the focus."), S("Standard form", "x² = 4py", "The focus is at (0, p) and the directrix is the line y = −p."), S("Dish", "📡", "Satellite dishes and headlights use this property.")]),
    L("Average rate of change", avgRate, [S("Slope between two points", "Δy ÷ Δx", "The average rate of change over [a, b] is the slope of the line through the two points."), S("Formula", "(f(b) − f(a)) ÷ (b − a)", "Subtract the outputs, then divide by the difference of the inputs."), S("Next", "closer and closer", "Making b closer to a leads to the instant rate: the derivative.")])
  ];
  l26.push(mixOf("Mixed practice", [l26[0], l26[1], l26[4], l26[6], l26[9], l26[11], l26[13], l26[16]]));
  l26.push(mixOf("Level 26 Challenge", [l26[2], l26[3], l26[5], l26[7], l26[8], l26[10], l26[12], l26[14], l26[15], l26[17]]));

  // ================= LEVEL 27 =================
  const limDef = () => {
    const k = ri(1, 9);
    if (ri(0, 1)) { const a = ri(1, 6); return Q(`For f(x) = ${a}x², the difference quotient [f(x + h) − f(x)] ÷ h simplifies to ${2 * a}x + ${a}h. Let h → 0. What is the derivative f′(${k})?`, 2 * a * k,
      ["Letting h → 0 makes the part with h vanish.", `What remains is a multiple of x. Put x = ${k} into it.`, "Example: for f(x) = 3x², the quotient is 6x + 3h, which tends to 6x. At x = 2 that is 12. Now do yours."]); }
    const b = ri(1, 9);
    return Q(`For f(x) = x² + ${b}x, the difference quotient [f(x + h) − f(x)] ÷ h simplifies to 2x + h + ${b}. Let h → 0. What is f′(${k})?`, 2 * k + b,
      ["Letting h → 0 removes the h term.", `What remains is 2x + ${b}. Put in x = ${k}.`, "Example: for f(x) = x² + 4x, we get 2x + 4. At x = 3 that is 10. Now do yours."]);
  };
  const powRule = () => {
    const a = ri(1, 5), n = ri(2, 4), k = ri(1, 4);
    return Q(`Use the power rule to find f′(${k}) for f(x) = ${a}x${sup(n)}. (d/dx of xⁿ is n·xⁿ⁻¹)`, a * n * k ** (n - 1),
      ["Bring the power down in front and lower the power by 1.", `The derivative is ${a} · ${n} · x with a smaller power. Then put in x = ${k}.`, "Example: f(x) = 2x³: f′(x) = 6x². At x = 2 that is 24. Now do yours."]);
  };
  const polyDer = () => {
    const a = ri(1, 4), b = ri(-5, 5), c = ri(-6, 6), d = ri(1, 9), k = ri(-2, 3);
    return N(`f(x) = ${polyS([a, b, c, d])}. Find f′(${k}).`, 3 * a * k * k + 2 * b * k + c,
      ["Differentiate each term separately with the power rule. A plain number disappears.", `f′(x) = ${3 * a}x² + (2 × the x² coefficient)x + (the x coefficient). Then substitute x = ${k}.`, "Example: f(x) = x³ − 2x² + 5x + 1: f′(x) = 3x² − 4x + 5. At x = 2 that is 12 − 8 + 5 = 9. Now do yours."], { step: 3 });
  };
  const tangent = () => {
    const b = ri(0, 6), c = ri(0, 6), a = ri(1, 5);
    return Q(`f(x) = x² + ${b}x + ${c}. The tangent line at x = ${a} is the line through (${a}, f(${a})) with slope f′(${a}). What is the height of this tangent line at x = ${a + 1}?`, a * a + b * a + c + 2 * a + b,
      [`Find the point f(${a}) and the slope f′(${a}) = 2·${a} + ${b}.`, "Moving 1 to the right along the tangent line raises it by exactly the slope.", "Example: f(x) = x² at x = 3: point (3, 9), slope 6. At x = 4 the tangent line is at 9 + 6 = 15. Now do yours."]);
  };
  const prodRule = () => {
    const a = ri(1, 4), b = ri(1, 6), c = ri(1, 4), d = ri(1, 6), k = ri(1, 4);
    return Q(`Use the product rule (uv)′ = u′v + uv′ on f(x) = (${a}x + ${b})(${c}x + ${d}). What is f′(${k})?`, a * (c * k + d) + c * (a * k + b),
      [`Let u = ${a}x + ${b} and v = ${c}x + ${d}. Find u′ and v′ (just the numbers in front of x).`, `Evaluate u, v, u′, v′ at x = ${k}, then combine as u′v + uv′.`, "Example: f(x) = (2x + 1)(x + 3) at x = 1: u′v + uv′ = 2·4 + 3·1 = 11. Now do yours."]);
  };
  const quotRule = () => {
    const c = ri(1, 6), k = ri(1, 5), den = (k + c) ** 2;
    if (ri(0, 1)) return C(`Use the quotient rule to find f′(${k}) for f(x) = x ÷ (x + ${c}). (The derivative simplifies to ${c} ÷ (x + ${c})².)`, fr(c, den), [fr(c, k + c), fr(1, den), fr(k, den), fr(c * 2, den)],
      ["The simplified derivative is already given; just substitute x.", "Square the bottom after adding.", "Example: f(x) = x ÷ (x + 2): f′(x) = 2 ÷ (x + 2)². At x = 1: 2 ÷ 9. Now do yours."]);
    return C(`Use the quotient rule to find f′(${k}) for f(x) = (x − ${c}) ÷ (x + ${c}). (The derivative simplifies to ${2 * c} ÷ (x + ${c})².)`, fr(2 * c, den), [fr(c, den), fr(2 * c, k + c), fr(4 * c, den), fr(1, den)],
      ["The simplified derivative is given; substitute your x.", "Add first, then square the bottom.", "Example: f(x) = (x − 1) ÷ (x + 1): f′(x) = 2 ÷ (x + 1)². At x = 2: 2/9. Now do yours."]);
  };
  const chain = () => {
    const a = ri(1, 3), b = ri(0, 3), n = ri(2, 3), k = ri(1, 3);
    return Q(`Use the chain rule to find f′(${k}) for f(x) = (${a}x + ${b})${sup(n)}. (Outside derivative times inside derivative.)`, n * a * (a * k + b) ** (n - 1),
      [`Outside: the power n. Inside: ${a}x + ${b}, whose derivative is the number in front of x.`, `f′(x) = n · (${a}x + ${b})ⁿ⁻¹ · (inside derivative). Put x = ${k}.`, "Example: f(x) = (2x + 1)³ at x = 1: 3 · (3)² · 2 = 54. Now do yours."]);
  };
  const DER = (a) => [
    [`d/dx of sin(${a}x)`, `${a} cos(${a}x)`, [`${a} sin(${a}x)`, `−${a} cos(${a}x)`, `cos(${a}x)`]],
    [`d/dx of cos(${a}x)`, `−${a} sin(${a}x)`, [`${a} sin(${a}x)`, `${a} cos(${a}x)`, `−sin(${a}x)`]],
    [`d/dx of e^(${a}x)`, `${a}e^(${a}x)`, [`e^(${a}x)`, `${a}x·e^(${a}x−1)`, `e^(${a})`]],
    ["d/dx of ln x", "1/x", ["ln x", "x", "e^x"]],
    ["d/dx of e^x", "e^x", ["x·e^(x−1)", "ln x", "1"]],
    ["d/dx of sin x", "cos x", ["−cos x", "sin x", "−sin x"]],
    ["d/dx of cos x", "−sin x", ["sin x", "cos x", "−cos x"]]
  ];
  const trigDer = () => {
    const a = ri(2, 9), it = pick(DER(a));
    return C(`Which is correct? ${it[0]} =`, it[1], it[2],
      ["Recall the basic rule for this function, then use the chain rule if there is a number inside.", "The inside number comes out front as a multiplier; the type of function changes only for sine and cosine.", "Example: d/dx of sin(11x) is 11cos(11x): sine becomes cosine and the 11 comes out front. Now do yours."]);
  };
  const critical = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 5), tt = ri(1, 9); return Q(`f(x) = ${a}x² − ${2 * a * tt}x + 7 has its lowest point where f′(x) = 0. At what x?`, tt,
      ["Differentiate, set the derivative equal to 0, and solve.", `f′(x) = ${2 * a}x − ${2 * a * tt}.`, "Example: f(x) = 3x² − 12x: f′ = 6x − 12 = 0 gives x = 2. Now do yours."]); }
    if (t === 1) { const a = ri(1, 9); return Q(`f(x) = x³ − ${3 * a * a}x has two critical points (where f′ = 0). What is the positive one?`, a,
      ["Differentiate: the derivative of x³ is 3x².", `f′(x) = 3x² − ${3 * a * a}. Set it to 0 and solve for x.`, "Example: f(x) = x³ − 12x: f′ = 3x² − 12 = 0, x² = 4, so the positive critical point is 2. Now do yours."]); }
    const a = ri(1, 4), tt = ri(1, 8);
    return Q(`A ball's height is h(t) = −${a}t² + ${2 * a * tt}t (in metres, t in seconds). At what time t is it highest (where h′(t) = 0)?`, tt,
      ["The highest point is where the upward speed is exactly 0.", `h′(t) = −${2 * a}t + ${2 * a * tt}. Set it to 0.`, "Example: h(t) = −5t² + 20t: h′ = −10t + 20 = 0, so t = 2. Now do yours."]);
  };
  const optim = () => {
    const t = ri(0, 2);
    if (t === 0) { const s = ri(2, 15); return Q(`A farmer has ${4 * s} m of fence to make a rectangular garden. The largest possible area comes from a square. What is that area in square metres?`, s * s,
      ["Of all rectangles with the same perimeter, the square has the largest area.", "Perimeter = 4 × side. Find the side, then square it.", "Example: 40 m of fence: side 10, area 100. Now do yours."]); }
    if (t === 1) { const h = ri(2, 20); return Q(`Two numbers add to ${2 * h}. What is the largest possible product?`, h * h,
      ["The product is biggest when the two numbers are equal.", "Each number is half the sum.", "Example: sum 14, numbers 7 and 7, product 49. Now do yours."]); }
    const k = ri(1, 8);
    return Q(`A farmer uses ${4 * k} m of fence for 3 sides of a rectangular pen against a river (no fence on the river side). The best shape has width ${k} and length ${2 * k}. What is the maximum area?`, 2 * k * k,
      ["Area of a rectangle = width × length.", `Multiply ${k} by ${2 * k}.`, "Example: width 3, length 6: area 18. Now do yours."]);
  };
  const related = () => {
    const t = ri(0, 3), r = ri(2, 9), d = ri(1, 4);
    if (t === 0) return Q(`A circular puddle has radius ${r} cm and the radius grows at ${d} cm per second. Since A = πr², dA/dt = 2πr · dr/dt. The area grows at ?π cm² per second. What is the number?`, 2 * r * d,
      ["Put r and dr/dt into 2πr · dr/dt.", "Multiply the numbers; π stays outside.", "Example: r = 5, dr/dt = 2: 2 · 5 · 2 = 20, so 20π. Now do yours."]);
    if (t === 1) return Q(`A balloon has radius ${r} cm and the radius grows at ${d} cm per second. Since V = (4/3)πr³, dV/dt = 4πr² · dr/dt. The volume grows at ?π cm³ per second. What is the number?`, 4 * r * r * d,
      ["Put r and dr/dt into 4πr² · dr/dt.", "Square r first, then multiply.", "Example: r = 3, dr/dt = 1: 4 · 9 · 1 = 36, so 36π. Now do yours."]);
    if (t === 2) return Q(`A square's side is ${r} cm and grows at ${d} cm per second. Since A = s², dA/dt = 2s · ds/dt. How fast is the area growing, in cm² per second?`, 2 * r * d,
      ["Put s and ds/dt into 2s · ds/dt.", "Multiply the three numbers.", "Example: s = 4, ds/dt = 3: 2 · 4 · 3 = 24. Now do yours."]);
    return Q(`A cube's edge is ${r} cm and grows at ${d} cm per second. Since V = s³, dV/dt = 3s² · ds/dt. How fast is the volume growing, in cm³ per second?`, 3 * r * r * d,
      ["Put s and ds/dt into 3s² · ds/dt.", "Square s first, then multiply by 3 and by the rate.", "Example: s = 2, ds/dt = 5: 3 · 4 · 5 = 60. Now do yours."]);
  };
  const second = () => {
    const a = ri(1, 4), b = ri(-5, 5), k = ri(-2, 4);
    if (ri(0, 1)) return N(`f(x) = ${a}x³ ${b < 0 ? "−" : "+"} ${Math.abs(b) || 1}x². Find f″(${k}), the second derivative at x = ${k}.`, 6 * a * k + 2 * (b || 1),
      ["Differentiate twice: x³ → 3x² → 6x, and x² → 2x → 2.", `f″(x) = ${6 * a}x + 2 × (the x² coefficient). Then substitute.`, "Example: f(x) = 2x³ − x²: f′ = 6x² − 2x, f″ = 12x − 2. At x = 1: 10. Now do yours."], { step: 4 });
    const v = 6 * a * k + 2 * (b || 1);
    if (v === 0) return second();
    return C(`f(x) = ${a}x³ ${b < 0 ? "−" : "+"} ${Math.abs(b) || 1}x². At x = ${k}, is the graph concave up or concave down?`, v > 0 ? "Concave up" : "Concave down", ["Concave up", "Concave down"],
      ["Concavity is decided by the sign of the second derivative.", `f″(x) = ${6 * a}x + 2·(the x² coefficient). Evaluate it at x = ${k}.`, "Example: f(x) = x³ at x = −1: f″ = 6x = −6 is negative, so concave down. Now do yours."]);
  };
  const antider = () => {
    const n = ri(1, 5), t = ri(1, 6);
    if (ri(0, 1)) return Q(`∫ ${(n + 1) * t}x${n > 1 ? sup(n) : ""} dx = ?x${sup(n + 1)} + C. What number goes in the blank?`, t,
      ["Integration reverses the power rule: raise the power by 1, then divide by the new power.", `Divide ${(n + 1) * t} by the new power ${n + 1}.`, "Example: ∫ 12x³ dx = 12 ÷ 4 · x⁴ = 3x⁴ + C. Now do yours."]);
    return Q(`∫ ${n + 1}x${n > 1 ? sup(n) : ""} dx = xᵖ + C. What is p?`, n + 1,
      ["Integration raises the power by 1.", `The power starts at ${n}.`, "Example: ∫ 5x⁴ dx = x⁵ + C, so p = 5. Now do yours."]);
  };
  const defInt = () => {
    const n = ri(1, 3), a = (n + 1) * ri(1, 3), p = ri(0, 2), q = p + ri(1, 3);
    return Q(`Evaluate the definite integral of ${a}x${n > 1 ? sup(n) : ""} from x = ${p} to x = ${q}. (Find the antiderivative F, then F(${q}) − F(${p}).)`, a / (n + 1) * (q ** (n + 1) - p ** (n + 1)),
      [`Antiderivative: raise the power to ${n + 1} and divide ${a} by ${n + 1}.`, "Put in the top limit, put in the bottom limit, and subtract.", "Example: ∫ 6x² dx from 1 to 3: F = 2x³, F(3) − F(1) = 54 − 2 = 52. Now do yours."]);
  };
  const velDist = () => {
    let a, T; do { a = ri(1, 6); T = ri(2, 8); } while ((a * T * T) % 2);
    const b = ri(0, 5);
    return Q(`A scooter has speed v(t) = ${a}t + ${b} metres per second. The distance travelled is the area under the graph (the integral). How many metres in the first ${T} seconds?`, a * T * T / 2 + b * T,
      ["Distance = integral of speed.", `The antiderivative of ${a}t + ${b} is ${a}t²/2 + ${b}t. Put in t = ${T} (t = 0 gives 0).`, "Example: v = 2t + 1 for 3 seconds: t² + t = 9 + 3 = 12 metres. Now do yours."]);
  };
  const rowOp = () => {
    const a = ri(1, 5), b = ri(1, 6), c = ri(2, 4), d = ri(1, 9), e = ri(1, 9), col = ri(0, 1);
    return N(`Row 1 is [1, ${a} | ${b}] and row 2 is [${c}, ${d} | ${e}]. After the row operation R2 → R2 − ${c}·R1, what is the new ${col ? "last" : "middle"} entry of row 2?`, col ? e - c * b : d - c * a,
      ["Subtract " + c + " times each entry of row 1 from the matching entry of row 2.", `New entry = old entry of row 2 − ${c} × the matching entry of row 1.`, "Example: R1 = [1, 2 | 3], R2 = [4, 9 | 5], R2 → R2 − 4·R1: middle 9 − 8 = 1, last 5 − 12 = −7. Now do yours."], { step: 3 });
  };
  const indep = () => {
    const dep = ri(0, 1), a = ri(1, 6), b = ri(1, 6);
    let c, d; if (dep) { const k = ri(2, 4); c = k * a; d = k * b; } else { do { c = ri(1, 8); d = ri(1, 8); } while (a * d === b * c); }
    return C(`Are the vectors (${a}, ${b}) and (${c}, ${d}) linearly independent or dependent?`, dep ? "Dependent" : "Independent", ["Independent", "Dependent"],
      ["Dependent means one vector is a multiple of the other.", "Compute a·d − b·c. If it is 0, they point along the same line.", "Example: (2, 3) and (4, 6): 2·6 − 3·4 = 0, so dependent. (1, 2) and (3, 5): 5 − 6 = −1, independent. Now do yours."]);
  };
  const eigen = () => {
    const p = ri(2, 9); let q; do { q = ri(1, 9); } while (q === p);
    if (ri(0, 1)) return Q(`A 2×2 matrix has trace ${p + q} and determinant ${p * q}. Its eigenvalues solve λ² − (trace)λ + (determinant) = 0. What is the larger eigenvalue?`, Math.max(p, q),
      ["Write the equation λ² − Tλ + D = 0 with the given T and D.", "Find two numbers that add to T and multiply to D.", "Example: trace 7, determinant 12: numbers 3 and 4, so eigenvalues 3 and 4. Now do yours."]);
    const x = ri(1, 9);
    return Q(`For the triangular matrix [[${p}, ${x}], [0, ${q}]], the eigenvalues are the numbers on the diagonal. What is the larger one?`, Math.max(p, q),
      ["For a triangular matrix, the eigenvalues sit on the main diagonal.", "Read the diagonal entries and pick the bigger.", "Example: [[2, 5], [0, 7]] has eigenvalues 2 and 7, larger is 7. Now do yours."]);
  };

  const l27 = [
    L("The derivative from its definition", limDef, [S("Slope at a point", "limit of the slope", "The derivative f′(x) is the limit of [f(x + h) − f(x)] ÷ h as h → 0."), S("Steps", "expand · simplify · let h → 0", "Expand f(x + h), subtract f(x), divide by h, then let h shrink."), S("Meaning", "📈", "f′(x) is the instant rate of change and the slope of the tangent line.")]),
    L("The power rule", powRule, [S("Bring it down", "xⁿ → n·xⁿ⁻¹", "Multiply by the power, then reduce the power by 1."), S("Constants", "a·xⁿ", "A number in front just stays and multiplies."), S("Example", "x⁵", "The derivative is 5x⁴.")]),
    L("Derivatives of polynomials", polyDer, [S("Term by term", "+  −", "Differentiate each term separately, then add."), S("Special cases", "x → 1, number → 0", "The derivative of kx is k. The derivative of a plain number is 0."), S("Evaluate", "f′(k)", "Substitute at the end.")]),
    L("Tangent lines", tangent, [S("Touching the curve", "↗️", "The tangent line touches the curve at a point and has the slope f′ there."), S("Point and slope", "y = f(a) + f′(a)(x − a)", "Start at the point, then move with the slope."), S("Use", "estimate", "Near the touching point the tangent is a good estimate of the curve.")]),
    L("The product rule", prodRule, [S("Two factors", "u · v", "The derivative of a product is not the product of derivatives."), S("Rule", "(uv)′ = u′v + uv′", "Differentiate one at a time and add."), S("Example", "x · x", "(x · x)′ = 1·x + x·1 = 2x, matching (x²)′.")]),
    L("The quotient rule", quotRule, [S("A fraction", "u ÷ v", "For a fraction of two functions use the quotient rule."), S("Rule", "(u′v − uv′) ÷ v²", "Low times derivative of high, minus high times derivative of low, over low squared."), S("Squared bottom", "v²", "Do not forget to square the bottom.")]),
    L("The chain rule", chain, [S("Function inside a function", "f(g(x))", "A bracket raised to a power is an outer function acting on an inner one."), S("Rule", "outside′ × inside′", "Differentiate the outside, keep the inside, then multiply by the inside's derivative."), S("Example", "(3x + 1)²", "2(3x + 1) · 3 = 6(3x + 1).")]),
    L("Derivatives of sin, cos, e^x and ln x", trigDer, [S("Basic list", "sin → cos", "sin x → cos x, cos x → −sin x, eˣ → eˣ, ln x → 1/x."), S("Inside number", "sin(ax)", "The chain rule multiplies by a: d/dx sin(ax) = a cos(ax)."), S("Watch the sign", "−", "Only cosine has a minus sign in this list.")]),
    L("Critical points", critical, [S("Flat spots", "f′ = 0", "Tops and bottoms of smooth curves have a flat tangent, so f′ = 0."), S("Steps", "differentiate · set 0 · solve", "Those x-values are the critical points."), S("Meaning", "🏔️", "They are candidates for maximum or minimum values.")]),
    L("Optimization", optim, [S("Best possible", "max · min", "Optimization finds the biggest or smallest value of something."), S("Shortcuts", "equal sides", "For a fixed perimeter the square has the largest area. For a fixed sum, equal numbers give the largest product."), S("With calculus", "f′ = 0", "Write the quantity as a function, differentiate and set it to 0.")]),
    L("Related rates", related, [S("Everything changes together", "🎈", "If the radius changes with time, so does the area. Their rates are linked."), S("Differentiate with time", "d/dt", "Differentiate the formula with respect to t using the chain rule."), S("Example", "A = πr²", "dA/dt = 2πr · dr/dt.")]),
    L("The second derivative", second, [S("Derivative of the derivative", "f″", "f″ tells how the slope itself is changing."), S("Concavity", "up · down", "f″ positive: the curve bends up like a cup. f″ negative: bends down."), S("Motion", "🚗", "If f is position, f′ is speed and f″ is acceleration.")]),
    L("Antiderivatives", antider, [S("Undo the derivative", "∫", "An antiderivative is a function whose derivative is the one you started with."), S("Power rule backwards", "∫xⁿ dx = xⁿ⁺¹ ÷ (n + 1)", "Raise the power by 1, then divide by the new power."), S("+ C", "constant", "Many functions have the same derivative, so we add C.")]),
    L("Definite integrals", defInt, [S("Area under a curve", "∫ₐᵇ f(x) dx", "The definite integral is the net area between the curve and the x-axis from a to b."), S("Fundamental theorem", "F(b) − F(a)", "Find an antiderivative F, then subtract its values at the ends."), S("No + C", "cancels", "C disappears in the subtraction.")]),
    L("Distance from speed", velDist, [S("Speed over time", "📊", "The area under a speed-time graph is the distance travelled."), S("Integrate", "∫ v dt", "The integral of v(t) gives the position change."), S("Check", "units", "metres per second times seconds gives metres.")]),
    L("Row operations", rowOp, [S("Gaussian elimination", "rows", "To solve systems, use row operations to create zeros."), S("The move", "R2 → R2 − c·R1", "Subtract a multiple of one row from another, entry by entry."), S("Goal", "0 below the 1", "Make the first column [1, 0].")]),
    L("Linear independence", indep, [S("Not a multiple", "↗↗", "Two vectors are linearly dependent if one is a multiple of the other."), S("Test", "ad − bc", "For (a, b) and (c, d): if ad − bc = 0 they are dependent."), S("Meaning", "span", "Two independent vectors in the plane can reach every point by combining them.")]),
    L("Eigenvalues", eigen, [S("Stretch factors", "Av = λv", "An eigenvector is only stretched by the matrix, not turned. The stretch is the eigenvalue λ."), S("Finding them", "λ² − Tλ + D = 0", "T is the trace (sum of the diagonal), D is the determinant."), S("Triangular", "diagonal", "For a triangular matrix just read the diagonal.")])
  ];
  l27.push(mixOf("Mixed practice", [l27[0], l27[1], l27[3], l27[5], l27[8], l27[11], l27[13], l27[16]]));
  l27.push(mixOf("Level 27 Challenge", [l27[2], l27[4], l27[6], l27[7], l27[9], l27[10], l27[12], l27[14], l27[15], l27[17]]));

  Object.assign(MATH_LEVELS, { 25: l25, 26: l26, 27: l27 });
})();
