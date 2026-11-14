// ext/math-28-30.js  Mind Lab Math levels 28-30 (60 lessons): calculus 1 finishing, calculus 2 (integration, series, differential equations, polar), multivariable calculus, linear algebra, probability and statistics
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const esc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const clean = h => String(h).replace(/<[^>]+>/g, " ");
  const leaks = (q, idx) => {
    const re = new RegExp("(?<![0-9A-Za-z.])" + esc(q.answer) + "(?![0-9A-Za-z]|\\.[0-9])", "i");
    return idx.some(i => re.test(clean(q.hints[i])));
  };
  // a maker may throw or give a non-whole / negative number: it is simply asked again
  const G = fn => () => {
    let last;
    for (let i = 0; i < 80; i++) {
      let q; try { q = fn(); } catch (e) { continue; }
      last = q; if (!leaks(q, [0, 1])) return q;
    }
    if (last) return last;
    throw new Error("maker failed");
  };
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
  const need = v => { if (!Number.isInteger(v)) throw new Error("not whole: " + v); return v; };
  const Q = (text, answer, hints, o = {}) => { need(answer); if (answer < 0) throw new Error("negative"); return { text, answer, hints, ...o }; };
  const mf = x => String(x).replace(/−/g, "-");
  const C = (text, ans, wr, hints, o = {}) => ({ text, choices: cho(mf(ans), ...wr.map(mf)), answer: mf(ans), hints, ...o });
  const N = (text, val, hints, o = {}) => {
    const { step = 1, ...rest } = o;
    need(val);
    if (val >= 0) return { text, answer: val, hints, ...rest };
    const f = x => String(x);
    return { text, choices: cho(f(val), f(-val), f(val + step), f(val - step), f(-val + step), f(val + 2 * step)), answer: f(val), hints, ...rest };
  };
  const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const sup = n => String(n).replace(/\d/g, d => SUP[d]);
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const fr = (n, d) => { const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : `${n}/${d}`; };
  const PW = ["", "x", "x²", "x³", "x⁴", "x⁵"];
  const polyS = cs => {
    const n = cs.length - 1, out = [];
    cs.forEach((c, i) => {
      if (!c) return;
      const d = n - i, ab = Math.abs(c), body = (ab === 1 && d > 0) ? PW[d] : ab + PW[d];
      out.push(out.length ? `${c < 0 ? "−" : "+"} ${body}` : `${c < 0 ? "−" : ""}${body}`);
    });
    return out.join(" ") || "0";
  };
  const cf = c => (c === 1 ? "" : String(c));
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const comb = (n, k) => fact(n) / (fact(k) * fact(n - k));
  const sgn = v => (v < 0 ? "−" : "+");
  const TRI = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];
  // a multiple-choice lesson built from a bank of [question, answer, wrongs, hint1, hint2]
  const bankMk = (items, textFn, exFn) => () => {
    const it = pick(items), o = pick(items.filter(x => x !== it));
    return C(textFn(it), it[1], it[2], [it[3], it[4], exFn(o) + " Now do yours."]);
  };
  const dxe = o => `Example: ${o[0]} = ${o[1]}.`;

  // ================= LEVEL 28 =================
  const implicit = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const k = ri(2, 6), b = ri(1, 5), c = (k * k - 1) * b * b;
      return Q(`The curve x² − y² = ${c} passes through the point (${k * b}, ${b}). Using implicit differentiation, what is the slope dy/dx at that point?`, k,
        ["Differentiate both sides with respect to x. Remember that d/dx of y² is 2y · dy/dx.", "The two derivative terms give an equation with dy/dx in it. Solve for dy/dx, then put in the point.", "Example: x² − y² = 15 at (4, 1). 2x − 2y·y′ = 0, so y′ = x/y = 4/1 = 4. Now do yours."]);
    }
    if (t === 1) {
      const a = ri(1, 5), k = ri(1, 5);
      return N(`The curve xy = ${k * a * a} passes through the point (${a}, ${k * a}). Using implicit differentiation, what is the slope dy/dx at that point?`, -k,
        ["Use the product rule on xy: d/dx(xy) = y + x · dy/dx.", "The right side is a constant, so its derivative is 0. Solve y + x·y′ = 0 for y′, then put in the point.", "Example: xy = 12 at (2, 6): 6 + 2y′ = 0, so y′ = −3. Now do yours."]);
    }
    const s = ri(1, 4), a = ri(1, 4), b = 2 * s * a, k = 4 * s * s * a;
    return Q(`The curve y² = ${k}x passes through the point (${a}, ${b}). Using implicit differentiation, what is the slope dy/dx at that point?`, s,
      ["Differentiate both sides with respect to x: d/dx of y² is 2y · dy/dx.", `You get 2y · y′ = ${k}. Solve for y′ and put in the y-value of the point.`, "Example: y² = 8x at (2, 4): 2·4·y′ = 8, so y′ = 1. Now do yours."]);
  };
  const expLn = () => {
    const a = ri(1, 6), k = ri(1, 5), b = ri(1, 6), t = ri(0, 3);
    if (t === 0) return Q(`f(x) = ${cf(a)}e<sup>${k}x</sup>. What is f′(0)?`, a * k,
      ["The derivative of e^(kx) is k · e^(kx) (chain rule).", "Differentiate first, then put in x = 0. Remember e⁰ = 1.", "Example: f(x) = 4e^(7x) gives f′(x) = 28e^(7x), and f′(0) = 28. Now do yours."]);
    if (t === 1) return Q(`f(x) = ${cf(a)}e<sup>${k}x</sup>. What is the second derivative f″(0)?`, a * k * k,
      ["Differentiate twice. Each time the chain rule brings out a factor k.", "So f″(x) has the factor k twice. Put in x = 0 at the end.", "Example: f(x) = 2e^(3x): f′ = 6e^(3x), f″ = 18e^(3x), f″(0) = 18. Now do yours."]);
    if (t === 2) return Q(`f(x) = ${cf(a)}·ln(1 + ${cf(k)}x). What is f′(0)?`, a * k,
      ["The derivative of ln(u) is u′/u (chain rule).", "Here u = 1 + kx, so u′ is a plain number. Put in x = 0 at the end.", "Example: f(x) = 5 ln(1 + 3x): f′(x) = 5·3/(1 + 3x), and f′(0) = 15. Now do yours."]);
    return Q(`f(x) = (x + ${b})e<sup>${k}x</sup>. What is f′(0)?`, 1 + b * k,
      ["Use the product rule: f′ = (x + b)′ · e^(kx) + (x + b) · (e^(kx))′.", "At x = 0, e⁰ = 1. The first part gives 1 and the second part gives b times k.", "Example: f(x) = (x + 2)e^(5x): f′(0) = 1 + 2·5 = 11. Now do yours."]);
  };
  const TD = [
    ["d/dx tan x", "sec^2 x", ["sec x tan x", "-csc^2 x", "cot x"], "Write tan x as sin x over cos x and use the quotient rule, or recall the list of trig derivatives.", "The cosine is on the bottom of tan, so a power of its reciprocal appears."],
    ["d/dx sec x", "sec x tan x", ["sec^2 x", "-csc x cot x", "tan x"], "sec x is 1 over cos x. Use the chain rule or the quotient rule.", "The result is a product of two trig functions and has no minus sign."],
    ["d/dx cot x", "-csc^2 x", ["sec^2 x", "csc^2 x", "-sec^2 x"], "cot x is the partner of tan x that starts with 'co'.", "Functions that start with 'co' get a minus sign when differentiated; think of cos."],
    ["d/dx csc x", "-csc x cot x", ["csc x cot x", "-sec x tan x", "-csc^2 x"], "csc x is the reciprocal of sin x, so it is a 'co' function.", "A 'co' function gets a minus sign. The result has two trig factors."],
    ["d/dx arctan x", "1/(1+x^2)", ["1/(1-x^2)", "1/sqrt(1-x^2)", "x/(1+x^2)"], "arctan is an inverse trig function; there is a short list of these derivatives to remember.", "The derivative of arctan has a sum of squares on the bottom and no square root."],
    ["d/dx arcsin x", "1/sqrt(1-x^2)", ["1/(1+x^2)", "1/(1-x^2)", "-1/sqrt(1-x^2)"], "arcsin is an inverse trig function; use the short list of inverse trig derivatives.", "The derivative of arcsin has a square root on the bottom and is positive."],
    ["d/dx arccos x", "-1/sqrt(1-x^2)", ["1/sqrt(1-x^2)", "-1/(1+x^2)", "1/(1-x^2)"], "arccos is the 'co' partner of arcsin.", "It looks like the arcsin derivative but with the sign that 'co' functions get."],
    ["d/dx tan(2x)", "2 sec^2(2x)", ["sec^2(2x)", "2 tan(2x)", "2x sec^2(2x)"], "Use the chain rule: derivative of tan on the outside, then times the derivative of the inside.", "The inside is 2x, whose derivative is a plain number."],
    ["d/dx tan(5x)", "5 sec^2(5x)", ["sec^2(5x)", "5 tan(5x)", "5x sec^2(5x)"], "Use the chain rule: derivative of tan on the outside, then times the derivative of the inside.", "The inside is 5x, whose derivative is a plain number."],
    ["d/dx tan(x^2)", "2x sec^2(x^2)", ["sec^2(x^2)", "2x tan(x^2)", "x^2 sec^2(x^2)"], "Use the chain rule with the inside x².", "The derivative of the inside brings an extra factor in front."],
    ["d/dx sec(3x)", "3 sec(3x) tan(3x)", ["sec(3x) tan(3x)", "3 sec^2(3x)", "3x sec(3x) tan(3x)"], "Use the chain rule: derivative of sec on the outside, then times the derivative of the inside.", "The inside is 3x, so a plain number multiplies the usual sec derivative."]
  ];
  const trigDer2 = bankMk(TD, it => `Which is correct? ${it[0]} = ?`, dxe);
  const logDer = () => {
    if (ri(0, 2) < 2) {
      const b = pick([1, 3]), a = ri(1, 6), c = (b + 1) * ri(1, 3);
      return Q(`Let y = x<sup>${a}</sup>(x + ${b})<sup>${c}</sup>. Logarithmic differentiation gives y′/y = ${a}/x + ${c}/(x + ${b}). What is y′/y at x = 1?`, a + c / (1 + b),
        ["Just put x = 1 into the formula that is given.", `The first part is ${a}/1. For the second part the bottom is 1 + ${b}. Add the two parts.`, "Example: y′/y = 2/x + 6/(x + 2) at x = 1 is 2 + 6/3 = 4. Now do yours."]);
    }
    const a = 2 * ri(1, 4), k = ri(1, 6);
    return Q(`Let y = x<sup>${a}</sup>e<sup>${k}x</sup>. Taking ln of both sides, ln y = ${a} ln x + ${k}x. Differentiate to find y′/y, then evaluate at x = 2.`, a / 2 + k,
      ["Differentiate ln y = a·ln x + k·x term by term. The left side gives y′/y.", `The derivative of ${a} ln x is ${a}/x, and the derivative of ${k}x is a plain number. Then put x = 2.`, "Example: ln y = 6 ln x + 4x gives y′/y = 6/x + 4; at x = 3 that is 2 + 4 = 6. Now do yours."]);
  };
  const lhop = () => {
    const t = ri(0, 4), b = ri(1, 5), k = ri(1, 6);
    const same = "Direct substitution gives 0/0, so differentiate the top and bottom separately.";
    if (t === 0) return Q(`Use L'Hôpital's rule: what is the limit as x → 0 of (e<sup>${b * k}x</sup> − 1) ÷ (${b}x)?`, k,
      [same, "The derivative of e^(cx) is c·e^(cx). After differentiating, put in x = 0.", "Example: limit of (e^(40x) − 1) ÷ (8x) = 40e^(40x) ÷ 8 → 5. Now do yours."]);
    if (t === 1) { const a = b + ri(1, 5); return Q(`Use L'Hôpital's rule: what is the limit as x → 0 of (e<sup>${a}x</sup> − e<sup>${b}x</sup>) ÷ x?`, a - b,
      [same, "Differentiate each exponential with the chain rule, then put in x = 0.", "Example: limit of (e^(9x) − e^(2x)) ÷ x = (9e^(9x) − 2e^(2x)) ÷ 1 → 7. Now do yours."]); }
    if (t === 2) { const a = 2 * ri(1, 5); return Q(`Use L'Hôpital's rule (twice): what is the limit as x → 0 of (1 − cos(${a}x)) ÷ x²?`, a * a / 2,
      [same + " If you still get 0/0, do it again.", "The first derivative of the top is a·sin(ax); the bottom becomes 2x. Repeat once more.", "Example: limit of (1 − cos 6x) ÷ x² → 6 sin 6x ÷ 2x → 36 cos 6x ÷ 2 = 18. Now do yours."]); }
    if (t === 3) return Q(`Use L'Hôpital's rule: what is the limit as x → 0 of ln(1 + ${b * k}x) ÷ (${b}x)?`, k,
      [same, "The derivative of ln(1 + cx) is c ÷ (1 + cx). Then put in x = 0.", "Example: limit of ln(1 + 30x) ÷ (6x) = 30 ÷ (1 + 30x) ÷ 6 → 5. Now do yours."]);
    return Q(`Use L'Hôpital's rule: what is the limit as x → 0 of sin(${b * k}x) ÷ sin(${b}x)?`, k,
      [same, "The derivative of sin(cx) is c·cos(cx). Then put in x = 0, where cos 0 = 1.", "Example: limit of sin(28x) ÷ sin(4x) = 28 cos 28x ÷ 4 cos 4x → 7. Now do yours."]);
  };
  const linApprox = () => {
    const a = ri(1, 5), kind = ri(0, 2), t = ri(0, 2), p = ri(1, 6);
    let fs, f0, d;
    if (kind === 0) { fs = "x²"; f0 = a * a; d = 2 * a; } else if (kind === 1) { fs = "x³"; f0 = a ** 3; d = 3 * a * a; } else { fs = `x² + ${p}x`; f0 = a * a + p * a; d = 2 * a + p; }
    const intro = `The tangent-line approximation (linearization) is L(x) = f(a) + f′(a)(x − a). For f(x) = ${fs} at a = ${a}`;
    if (t === 0) return Q(`${intro}, what is the slope of L?`, d,
      ["The slope of the tangent line is f′(a).", `Differentiate f, then put in x = ${a}.`, "Example: f(x) = x³ at a = 2: f′ = 3x² = 12. Now do yours."]);
    if (t === 1) return N(`${intro}, L(x) = mx + c. What is the number c (the y-intercept of L)?`, f0 - d * a,
      [`Multiply out: L(x) = f(a) + f′(a)x − f′(a)·a. The c part is f(a) − f′(a)·a.`, `Work out f(${a}) and f′(${a}) first, then compute f(a) minus f′(a) times a.`, "Example: f(x) = x² at a = 3: f(3) = 9, f′(3) = 6, c = 9 − 6·3 = −9. Now do yours."]);
    return Q(`${intro}, what is L(${a + 1})?`, f0 + d,
      ["Put x = a + 1 into L(x). Then x − a is just 1.", `L(${a + 1}) = f(${a}) + f′(${a}) · 1.`, "Example: f(x) = x² at a = 4: L(5) = 16 + 8 = 24. Now do yours."]);
  };
  const mvt = () => {
    if (ri(0, 2) === 0) {
      const t = ri(2, 6), v = ri(20, 90);
      return Q(`A bus drives ${t * v} km in ${t} hours. By the Mean Value Theorem, at some moment its speed was exactly equal to its average speed. How many km/h was that?`, v,
        ["The Mean Value Theorem says some instant has the same rate as the average rate.", "Average speed = distance ÷ time.", "Example: 150 km in 3 hours: 150 ÷ 3 = 50 km/h at some moment. Now do yours."]);
    }
    const p = ri(1, 3), q = ri(0, 6), a = ri(0, 4), b = a + 2 * ri(1, 4);
    return Q(`f(x) = ${cf(p)}x² + ${q}x. The Mean Value Theorem guarantees a number c between ${a} and ${b} where f′(c) equals the average slope on [${a}, ${b}]. What is c?`, (a + b) / 2,
      ["Find the average slope (f(b) − f(a)) ÷ (b − a), then solve f′(c) = that number.", "For a quadratic, f′(c) is the average slope exactly at the midpoint of the interval.", "Example: f(x) = x² on [1, 7]: average slope = (49 − 1) ÷ 6 = 8, and 2c = 8 gives c = 4. Now do yours."]);
  };
  const extrema = () => {
    const kind = ri(0, 1), p = ri(1, 3), m = ri(2, 5), wantMax = ri(0, 1);
    let f, fs, fp;
    if (kind === 0) { f = x => x ** 3 - 3 * p * p * x; fs = `x³ − ${3 * p * p}x`; fp = `3x² − ${3 * p * p}`; } else { f = x => -x * x + 2 * p * x; fs = `−x² + ${2 * p}x`; fp = `−2x + ${2 * p}`; }
    const pts = [0, m]; if (p <= m) pts.push(p);
    const vals = pts.map(f), ans = wantMax ? Math.max(...vals) : Math.min(...vals);
    return N(`Find the absolute ${wantMax ? "maximum" : "minimum"} value of f(x) = ${fs} on the closed interval [0, ${m}].`, ans,
      ["On a closed interval, check both endpoints and any critical point inside the interval.", `f′(x) = ${fp}. Set it to 0 and keep only the x-values that lie inside [0, ${m}]. Then compare the values of f.`, "Example: f(x) = x² − 4x on [0, 5]: f′ = 2x − 4, critical x = 2. Values: f(0) = 0, f(2) = −4, f(5) = 5. So max 5, min −4. Now do yours."], { step: 2 });
  };
  const inflect = () => {
    if (ri(0, 2) < 2) {
      const a = ri(1, 3), k = ri(1, 5), c = ri(1, 9), d = ri(0, 9);
      return Q(`At what x-value does f(x) = ${polyS([a, -3 * a * k, c, d])} have its inflection point?`, k,
        ["An inflection point is where the concavity changes, which happens where f″(x) = 0.", `f″(x) = ${6 * a}x ${sgn(-6 * a * k)} ${6 * a * k}. Solve f″(x) = 0.`, "Example: f(x) = x³ − 9x² + 2x: f″ = 6x − 18, so x = 3. Now do yours."]);
    }
    const s = ri(1, 4), c = ri(1, 9);
    return Q(`f(x) = x⁴ − ${6 * s * s}x² + ${c}. At what positive x-value does the concavity change?`, s,
      ["Concavity changes where f″(x) = 0 (and f″ changes sign).", `f″(x) = 12x² − ${12 * s * s}. Solve for x and take the positive root.`, "Example: f(x) = x⁴ − 54x²: f″ = 12x² − 108 = 0 gives x² = 9, so x = 3. Now do yours."]);
  };
  const firstTest = () => {
    const t = ri(0, 2), p = ri(1, 4);
    if (t === 0) return Q(`f(x) = x³ − ${3 * p * p}x has two critical points, one positive and one negative. At the positive one, f′ changes from negative to positive. What is that x-value?`, p,
      ["Set f′(x) = 0. Since f′ = 3x² − (a number), you get x² = a number.", `3x² = ${3 * p * p}. Take the positive square root.`, "Example: f(x) = x³ − 12x: f′ = 3x² − 12 = 0, x² = 4, positive x = 2. Now do yours."]);
    if (t === 1) return Q(`f(x) = x³ − ${3 * p * p}x has a local maximum at x = −${p}. What is the local maximum value, f(−${p})?`, 2 * p ** 3,
      [`Put x = −${p} into f. Be careful with the signs of the cube and of the second term.`, `(−${p})³ is negative, and subtracting ${3 * p * p} times (−${p}) adds a positive number.`, "Example: f(x) = x³ − 12x at x = −2: −8 + 24 = 16. Now do yours."]);
    const c = ri(1, 9), SC = [["positive", "negative", "local maximum"], ["negative", "positive", "local minimum"], ["positive", "positive", "neither a max nor a min"], ["negative", "negative", "neither a max nor a min"]], it = pick(SC);
    return C(`f′(x) is ${it[0]} just to the left of x = ${c} and ${it[1]} just to the right. What happens to f at x = ${c}?`, it[2], ["local maximum", "local minimum", "neither a max nor a min"],
      ["Positive f′ means f is rising, negative f′ means f is falling.", "Think of walking along the graph: rising then falling, or falling then rising, or no change of direction.", "Example: f′ is negative before x = 5 and positive after: f falls then rises, a valley. Now do yours."]);
  };
  const newton = () => {
    if (ri(0, 2) < 2) {
      const x0 = ri(2, 9), mm = x0 + 2 * ri(1, 4);
      return Q(`Newton's method on f(x) = x² − ${x0 * mm} starts at x₀ = ${x0}. One step is x₁ = x₀ − f(x₀) ÷ f′(x₀). What is x₁?`, (x0 + mm) / 2,
        ["Find f(x₀) and f′(x₀) = 2x₀ first.", `f(${x0}) = ${x0 * x0} − ${x0 * mm} and f′(${x0}) = ${2 * x0}. Put them into the formula.`, "Example: f(x) = x² − 15 with x₀ = 3: f(3) = −6, f′(3) = 6, x₁ = 3 − (−6)/6 = 4. Now do yours."]);
    }
    const x0 = ri(1, 4), t = ri(1, 5), n = x0 ** 3 + 3 * x0 * x0 * t;
    return Q(`Newton's method on f(x) = x³ − ${n} starts at x₀ = ${x0}. One step is x₁ = x₀ − f(x₀) ÷ f′(x₀). What is x₁?`, x0 + t,
      ["Find f(x₀) and f′(x₀) = 3x₀² first.", `f(${x0}) = ${x0 ** 3} − ${n}, and f′(${x0}) = ${3 * x0 * x0}. Divide, then subtract.`, "Example: f(x) = x³ − 11 with x₀ = 2: f(2) = −3, f′(2) = 12, x₁ = 2 − (−3/12) = 2.25. (Yours comes out whole.) Now do yours."]);
  };
  const trap = () => {
    const FL = [["x²", x => x * x], ["x² + 1", x => x * x + 1], ["x³", x => x ** 3], ["2x + 3", x => 2 * x + 3], ["x² + x", x => x * x + x]], [fs, f] = pick(FL), h = pick([1, 2]), n = pick([2, 4]);
    let s = f(0) + f(n * h); for (let i = 1; i < n; i++) s += 2 * f(i * h);
    return Q(`Estimate the integral of f(x) = ${fs} from x = 0 to x = ${n * h} using the trapezoid rule with ${n} trapezoids of width ${h}. Estimate = (h ÷ 2)(f₀ + 2f₁ + … + 2fₙ₋₁ + fₙ).`, h * s / 2,
      [`Make a list of f at x = 0, ${h}, ${2 * h}, … up to ${n * h}.`, "The first and last values count once; all the middle values count twice. Add them, then multiply by h ÷ 2.", "Example: f(x) = x² from 0 to 4 with 2 trapezoids of width 2: values 0, 4, 16. (2/2)(0 + 2·4 + 16) = 24. Now do yours."]);
  };
  const usub = () => {
    if (ri(0, 2) < 2) {
      const m = ri(1, 3), a = ri(1, 3);
      return Q(`Use u = x² + 1 to find the integral from 0 to ${a} of ${2 * (m + 1)}x(x² + 1)<sup>${m}</sup> dx.`, (a * a + 1) ** (m + 1) - 1,
        ["With u = x² + 1 we get du = 2x dx. Look for 2x dx inside the integral.", `The integral becomes ${m + 1} times the integral of u^${m} du, which is u^${m + 1}. Then use the end values of x.`, "Example: the integral from 0 to 1 of 6x(x² + 1)² dx = [(x² + 1)³] from 0 to 1 = 8 − 1 = 7. Now do yours."]);
    }
    const m = ri(1, 2), a = ri(1, 2);
    return Q(`Use u = x³ + 1 to find the integral from 0 to ${a} of ${3 * (m + 1)}x²(x³ + 1)<sup>${m}</sup> dx.`, (a ** 3 + 1) ** (m + 1) - 1,
      ["With u = x³ + 1 we get du = 3x² dx. Look for 3x² dx inside the integral.", `The integral becomes ${m + 1} times the integral of u^${m} du, which is u^${m + 1}. Then use the end values of x.`, "Example: the integral from 0 to 1 of 6x²(x³ + 1) dx = [(x³ + 1)²] from 0 to 1 = 4 − 1 = 3. Now do yours."]);
  };
  const areaBet = () => {
    if (ri(0, 2) < 2) {
      const a = pick([3, 6]), p = ri(1, 9);
      return Q(`Find the area between the curves y = 3x² + ${p} (above) and y = x² from x = 0 to x = ${a}.`, 2 * a ** 3 / 3 + p * a,
        ["Area between curves = the integral of (top − bottom).", `Top − bottom = 2x² + ${p}. Integrate it from 0 to ${a}.`, "Example: y = 3x² + 2 above y = x² from 0 to 3: the integral of 2x² + 2 is 2x³/3 + 2x, giving 18 + 6 = 24. Now do yours."]);
    }
    const k = pick([6, 12]);
    return Q(`The line y = ${k}x and the parabola y = x² cross at x = 0 and x = ${k}. What is the area of the region between them?`, k ** 3 / 6,
      ["Between the crossing points, the line is above the parabola. Area = the integral of (line − parabola).", `Integrate ${k}x − x² from 0 to ${k}.`, "Example: y = 4x and y = x² cross at 0 and 4: the integral of 4x − x² is 2x² − x³/3, giving 32 − 64/3 = 32/3. (Yours comes out whole.) Now do yours."]);
  };
  const disks = () => {
    const t = ri(0, 1);
    if (t === 0) { const k = ri(1, 4), a = pick([3, 6]);
      return Q(`The line y = ${cf(k)}x from x = 0 to x = ${a} is spun around the x-axis, making a cone. Its volume by the disk method is π times the integral of (kx)² dx. What is the volume divided by π?`, k * k * a ** 3 / 3,
        ["Each disk has area π(radius)², and the radius is the height of the line.", `The integral of ${k * k}x² from 0 to ${a} is ${k * k}·a³ ÷ 3.`, "Example: y = 2x from 0 to 3: the integral of 4x² is 4·27/3 = 36, so the volume is 36π. Now do yours."]); }
    const a = 2 * ri(1, 5);
    return Q(`The curve y = √x from x = 0 to x = ${a} is spun around the x-axis. Its volume by the disk method is π times the integral of (√x)² dx. What is the volume divided by π?`, a * a / 2,
      ["The radius of each disk is √x, so its area is π · (√x)² = πx.", `The integral of x from 0 to ${a} is a²/2.`, "Example: y = √x from 0 to 4: the integral of x is 16/2 = 8, so volume 8π. Now do yours."]);
  };
  const avgVal = () => {
    const t = ri(0, 2);
    if (t === 0) { const b = 3 * ri(1, 5); return Q(`What is the average value of f(x) = x² on the interval [0, ${b}]? (Average = integral ÷ interval length.)`, b * b / 3,
      ["Average value = (1 ÷ (b − a)) times the integral of f from a to b.", `The integral of x² from 0 to ${b} is ${b}³ ÷ 3. Then divide by ${b}.`, "Example: f(x) = x² on [0, 6]: integral = 72, divided by 6 = 12. Now do yours."]); }
    if (t === 1) { const b = 2 * ri(1, 6), p = ri(1, 5), q = ri(0, 8); return Q(`What is the average value of f(x) = ${p}x + ${q} on the interval [0, ${b}]?`, p * b / 2 + q,
      ["Average value = (1 ÷ (b − a)) times the integral of f from a to b.", "For a straight line, the average is the height at the middle of the interval.", "Example: f(x) = 3x + 1 on [0, 4]: integral = 24 + ... = 28, divided by 4 = 7. Now do yours."]); }
    const b = 2 * ri(1, 4);
    return Q(`What is the average value of f(x) = x³ on the interval [0, ${b}]?`, b ** 3 / 4,
      ["Average value = (1 ÷ (b − a)) times the integral of f from a to b.", `The integral of x³ from 0 to ${b} is ${b}⁴ ÷ 4. Then divide by ${b}.`, "Example: f(x) = x³ on [0, 4]: integral = 64, divided by 4 = 16. Now do yours."]);
  };
  const improper = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const IM = [["1/x", "Diverges"], ["1/x²", "Converges"], ["1/√x", "Diverges"], ["1/x<sup>1.5</sup>", "Converges"], ["1/x³", "Converges"], ["1/x<sup>0.5</sup>", "Diverges"], ["1/x<sup>2.5</sup>", "Converges"], ["1/x<sup>0.9</sup>", "Diverges"]], it = pick(IM);
      const p = it[0].includes("sup") ? it[0].replace(/.*<sup>(.*)<\/sup>/, "$1") : it[0] === "1/x" ? "1" : it[0] === "1/√x" ? "0.5" : it[0].endsWith("²") ? "2" : "3";
      return C(`Does the improper integral of ${it[0]} dx from x = 1 to ∞ converge or diverge?`, it[1], ["Converges", "Diverges"],
        ["This is a p-integral: the integral of 1/x^p from 1 to ∞. It depends only on p.", `Here p = ${p}. Compare p with 1: the area is finite when the tail dies down fast enough.`, "Example: 1/x⁴ has p = 4, which is bigger than 1, so the area is finite and it converges. And 1/x^0.3 has p smaller than 1, so it diverges. Now do yours."]);
    }
    if (t === 1) { const k = ri(1, 12); return Q(`What is the integral of ${k}/x² dx from x = 1 to ∞?`, k,
      ["Integrate to get −k/x, then take the limit at ∞ and subtract the value at 1.", "The value at ∞ is 0 (the fraction shrinks to nothing). So the answer is 0 minus the value at x = 1.", "Example: the integral of 9/x² from 1 to ∞ = 0 − (−9/1) = 9. Now do yours."]); }
    const k = ri(1, 12);
    return Q(`What is the integral of ${k}e<sup>−x</sup> dx from x = 0 to ∞?`, k,
      ["An antiderivative of e^(−x) is −e^(−x).", "As x → ∞, e^(−x) → 0. At x = 0, e⁰ = 1. Subtract the lower value from the upper value.", "Example: the integral of 5e^(−x) from 0 to ∞ = 0 − (−5·1) = 5. Now do yours."]);
  };
  const ftc = () => {
    const t = ri(0, 2), c = ri(1, 9), x0 = ri(1, 5), k = ri(2, 4);
    if (t === 0) return Q(`Let F(x) = the integral from 1 to x of (t² + ${c}) dt. By the Fundamental Theorem of Calculus, what is F′(${x0})?`, x0 * x0 + c,
      ["The Fundamental Theorem says: the derivative of the integral from a to x of f(t) dt is f(x).", `You do not need to integrate. Replace t by ${x0} in t² + ${c}.`, "Example: F(x) = the integral from 2 to x of (t³ + 1) dt gives F′(2) = 2³ + 1 = 9. Now do yours."]);
    if (t === 1) return Q(`Let F(x) = the integral from 0 to ${k}x of (t² + ${c}) dt. What is F′(${x0})? (Use the chain rule: F′(x) = f(${k}x) · ${k}.)`, k * ((k * x0) ** 2 + c),
      ["The upper limit is not just x, so multiply by the derivative of the upper limit.", `Replace t by ${k}x0 in the inside function, then multiply by ${k}.`, "Example: F(x) = the integral from 0 to 3x of (t² + 1) dt, at x = 1: f(3) · 3 = (9 + 1) · 3 = 30. Now do yours."]);
    return Q(`Let F(x) = the integral from 0 to x² of (t + ${c}) dt. What is F′(${x0})? (Use the chain rule: F′(x) = f(x²) · 2x.)`, (x0 * x0 + c) * 2 * x0,
      ["The upper limit is x², so multiply by the derivative of the upper limit.", `Replace t by x² = ${x0 * x0} in t + ${c}, then multiply by 2x = ${2 * x0}.`, "Example: F(x) = the integral from 0 to x² of (t + 1) dt, at x = 3: (9 + 1) · 6 = 60. Now do yours."]);
  };

  const l28 = [
    L("Implicit differentiation", implicit, [S("When y is hiding", "x² + y² = 25", "Sometimes y is not alone on one side. Differentiate both sides anyway, and treat y as a function of x."), S("The extra factor", "d/dx y² = 2y · y′", "Every time you differentiate something with y in it, the chain rule adds a factor y′ (which is dy/dx)."), S("Then solve", "y′ = ?", "Collect the y′ terms on one side and solve for y′. Put in the point at the end.")]),
    L("Derivatives of e^(kx) and ln", expLn, [S("Exponential chain rule", "e^(kx) → k·e^(kx)", "The inside kx has derivative k, so k comes out front. At x = 0, e⁰ = 1."), S("Logarithm chain rule", "ln(u) → u′ ÷ u", "ln(1 + kx) has derivative k ÷ (1 + kx)."), S("Product rule", "(uv)′ = u′v + uv′", "Use it when two things are multiplied, like (x + b)e^(kx).")]),
    L("Derivatives of tan, sec and inverse trig", trigDer2, [S("The trig list", "tan → sec²", "tan x → sec² x, sec x → sec x tan x, cot x → −csc² x, csc x → −csc x cot x. The 'co' ones have minus signs."), S("Inverse trig", "arctan, arcsin", "arctan x → 1 ÷ (1 + x²). arcsin x → 1 ÷ √(1 − x²). arccos x → the same with a minus."), S("Chain rule", "inside′", "If the angle is not just x, multiply by the derivative of the inside.")]),
    L("Logarithmic differentiation", logDer, [S("Take ln first", "ln y", "For a messy product of powers, take ln of both sides. Products turn into sums."), S("Differentiate", "y′ ÷ y", "The derivative of ln y is y′ ÷ y. The derivative of ln x is 1 ÷ x."), S("Get y′", "y′ = y · (…)", "At the end multiply by y to get y′ itself.")]),
    L("L'Hôpital's rule", lhop, [S("The 0 ÷ 0 problem", "0/0", "Sometimes substituting gives 0 ÷ 0, which tells us nothing. L'Hôpital's rule helps."), S("The rule", "f′ ÷ g′", "Differentiate the top and the bottom separately (not the quotient rule!), then try the limit again."), S("Repeat if needed", "0/0 again?", "If you still get 0 ÷ 0, apply the rule once more.")]),
    L("Linear approximation", linApprox, [S("A line instead of a curve", "L(x)", "Close to the point a, a curve looks like its tangent line. We use the line as a quick estimate."), S("The formula", "L(x) = f(a) + f′(a)(x − a)", "Start at the height f(a) and move along the slope f′(a)."), S("Best near a", "📏", "The farther from a you go, the worse the estimate.")]),
    L("The Mean Value Theorem", mvt, [S("A promise", "average = instant", "If f is smooth on [a, b], at some point c the instant rate equals the average rate."), S("The equation", "f′(c) = (f(b) − f(a)) ÷ (b − a)", "The right side is the average slope."), S("Cars", "🚌", "If you average 60 km/h, at some moment your speedometer read exactly 60.")]),
    L("Absolute maximum and minimum", extrema, [S("Closed interval", "[a, b]", "A continuous function on a closed interval always has a highest and a lowest value."), S("Candidates", "ends + critical points", "They can only be at the two endpoints or at critical points inside."), S("Compare", "biggest, smallest", "Evaluate f at every candidate and pick the largest and smallest.")]),
    L("Inflection points", inflect, [S("Concavity changes", "f″ = 0", "An inflection point is where the curve switches between bending up and bending down."), S("Find it", "solve f″(x) = 0", "Differentiate twice and solve. Check that the sign of f″ really changes."), S("Picture", "〰️", "An S-shaped curve has its inflection point in the middle of the S.")]),
    L("The first derivative test", firstTest, [S("Look at the sign", "+ → −", "If f′ goes from positive to negative at c, the graph rises then falls: a local maximum."), S("Valley", "− → +", "Negative to positive means falling then rising: a local minimum."), S("No change", "+ → + or − → −", "If the sign does not change, it is neither a max nor a min.")]),
    L("Newton's method", newton, [S("Better guesses", "x₀ → x₁", "Newton's method finds where f(x) = 0 by following tangent lines to the x-axis."), S("The step", "x₁ = x₀ − f(x₀) ÷ f′(x₀)", "Repeat the step and the guesses get close to the root very fast."), S("Square roots", "x² − N = 0", "Solving x² − N = 0 finds √N.")]),
    L("The trapezoid rule", trap, [S("Trapezoids, not rectangles", "▱", "Joining the tops of the strips with straight lines gives trapezoids, usually a better estimate."), S("The formula", "(h/2)(f₀ + 2f₁ + … + fₙ)", "The first and last heights count once, the middle ones twice."), S("Width", "h", "h is the width of each strip.")]),
    L("Substitution in integrals", usub, [S("Undo the chain rule", "u = inside", "If you see a function and the derivative of its inside, let u be the inside."), S("Change everything", "du = u′ dx", "Replace the inside by u and the dx stuff by du. Then integrate in u."), S("Limits", "go back to x", "For a definite integral, put the original x-limits into the answer after going back to x.")]),
    L("Area between curves", areaBet, [S("Top minus bottom", "∫(top − bottom)", "The area between two curves is the integral of the upper curve minus the lower curve."), S("Limits", "where they cross", "The limits are where the curves meet, or the given x-values."), S("Check", "✔️", "The top minus bottom should be positive over the whole interval.")]),
    L("Volume by disks", disks, [S("Spin it", "🌀", "Spinning a curve around the x-axis makes a solid of revolution."), S("Slice into disks", "π · r²", "A thin slice is a disk with radius equal to the height of the curve."), S("Add them up", "V = π ∫ y² dx", "Integrate the area π·y² over the x-interval.")]),
    L("Average value of a function", avgVal, [S("The mean height", "f_avg", "The average value is the height of the rectangle that has the same area as the region under the curve."), S("Formula", "(1 ÷ (b − a)) ∫ f dx", "Integrate, then divide by the length of the interval."), S("Lines", "middle", "For a straight line the average is the value in the middle.")]),
    L("Improper integrals", improper, [S("Going to infinity", "∫₁^∞", "An integral can run to ∞ if the area stays finite. We use a limit of ∫ from 1 to b as b → ∞."), S("p-integrals", "1 ÷ xᵖ", "The integral of 1 ÷ x^p from 1 to ∞ converges when p > 1 and diverges when p ≤ 1."), S("Exponentials", "e^(−x)", "e^(−x) shrinks so fast that its area is finite.")]),
    L("The Fundamental Theorem, part 1", ftc, [S("Derivative of an integral", "d/dx ∫ f(t) dt", "Differentiating an integral with a variable upper limit gives back the inside function."), S("The rule", "F′(x) = f(x)", "Replace t with x. No integrating needed!"), S("Chain rule", "f(g(x)) · g′(x)", "If the upper limit is a function g(x), also multiply by g′(x).")])
  ];
  l28.push(mixOf("Mixed practice", [l28[0], l28[1], l28[4], l28[6], l28[7], l28[10], l28[11], l28[12], l28[17]]));
  l28.push(mixOf("Level 28 Challenge", [l28[2], l28[3], l28[5], l28[8], l28[9], l28[13], l28[14], l28[15], l28[16]]));

  // ================= LEVEL 29 =================
  const PF = [
    ["∫ x e^x dx", "x e^x - e^x + C", ["x e^x + e^x + C", "e^x + C", "x^2 e^x + C"], "Use integration by parts: ∫ u dv = uv − ∫ v du, with u = x.", "After the first step, the leftover integral is just the exponential itself."],
    ["∫ x cos x dx", "x sin x + cos x + C", ["x sin x - cos x + C", "-x sin x + cos x + C", "sin x + C"], "Use integration by parts with u = x and dv = cos x dx.", "The leftover integral is of a sine, which brings a minus sign."],
    ["∫ x sin x dx", "-x cos x + sin x + C", ["x cos x + sin x + C", "-x cos x - sin x + C", "cos x + C"], "Use integration by parts with u = x and dv = sin x dx.", "v is the integral of sine, which has a minus sign."],
    ["∫ ln x dx", "x ln x - x + C", ["x ln x + x + C", "1/x + C", "ln x - x + C"], "Write ln x as ln x · 1 and use u = ln x, dv = dx.", "The leftover integral simplifies to a plain 1."],
    ["∫ x e^(2x) dx", "x e^(2x)/2 - e^(2x)/4 + C", ["x e^(2x)/2 + e^(2x)/4 + C", "x e^(2x) - e^(2x) + C", "2x e^(2x) - 4 e^(2x) + C"], "Use u = x, dv = e^(2x) dx. Careful: v needs a factor 1/2.", "The leftover integral has a 1/2 in front, and integrating again gives another 1/2."],
    ["∫ x ln x dx", "x^2 ln x /2 - x^2/4 + C", ["x^2 ln x /2 + x^2/4 + C", "x ln x - x + C", "x^2 ln x /2 - x^2/2 + C"], "Use u = ln x and dv = x dx (so v = x²/2).", "The leftover integral is (x²/2)(1/x) = x/2, which integrates to a quarter of x²."],
    ["∫ x e^(-x) dx", "-x e^(-x) - e^(-x) + C", ["-x e^(-x) + e^(-x) + C", "x e^(-x) + e^(-x) + C", "x e^(-x) - e^(-x) + C"], "Use u = x and dv = e^(−x) dx. The integral of e^(−x) is −e^(−x).", "Two minus signs appear: one from v, and one that comes from subtracting ∫ v du."]
  ];
  const partsF = bankMk(PF, it => `Using integration by parts, which answer is correct? ${it[0]} = ?`, dxe);
  const LI = [
    ["∫ x e^x dx", "x", ["e^x", "dx", "x e^x"], "one factor is algebraic (x to a power) and the other is exponential"],
    ["∫ x ln x dx", "ln x", ["x", "dx", "x ln x"], "one factor is algebraic and the other is logarithmic"],
    ["∫ x² sin x dx", "x^2", ["sin x", "dx", "x^2 sin x"], "one factor is algebraic and the other is trigonometric"],
    ["∫ ln x dx", "ln x", ["x", "dx", "1/x"], "there is a logarithm, and the other factor is just 1 (from dx)"],
    ["∫ x cos 2x dx", "x", ["cos 2x", "dx", "2x"], "one factor is algebraic and the other is trigonometric"],
    ["∫ x³ ln x dx", "ln x", ["x^3", "dx", "x^3 ln x"], "one factor is algebraic and the other is logarithmic"],
    ["∫ x e^(3x) dx", "x", ["e^(3x)", "dx", "3x"], "one factor is algebraic and the other is exponential"],
    ["∫ arctan x dx", "arctan x", ["x", "dx", "1/(1+x^2)"], "there is an inverse trig function, and the other factor is just 1"],
    ["∫ x arctan x dx", "arctan x", ["x", "dx", "x arctan x"], "one factor is algebraic and the other is an inverse trig function"]
  ];
  const liateF = () => {
    const it = pick(LI), o = pick(LI.filter(x => x !== it));
    return C(`In ${it[0]}, integration by parts needs a choice of u (the part you differentiate). Which is the best choice for u?`, it[1], it[2],
      ["Use the LIATE order: Logarithmic, Inverse trig, Algebraic, Trig, Exponential. Choose u from the type that comes first.", `In this integral, ${it[3]}. Which of the two comes earlier in LIATE?`, `Example: for ${o[0]}, u = ${o[1]}. Now do yours.`]);
  };
  const SI = [["sin²x", "(1 - cos 2x)/2", ["(1 + cos 2x)/2", "1 - cos 2x", "sin 2x /2"]], ["cos²x", "(1 + cos 2x)/2", ["(1 - cos 2x)/2", "1 + cos 2x", "cos 2x /2"]], ["sin x cos x", "sin 2x /2", ["sin 2x", "cos 2x /2", "(1 - cos 2x)/2"]]];
  const trigInt = () => {
    if (ri(0, 1)) {
      const j = ri(1, 6), s = ri(0, 1);
      return Q(`Use ${s ? "cos²x = (1 + cos 2x)/2" : "sin²x = (1 − cos 2x)/2"}. The integral of ${s ? "cos" : "sin"}²x dx from 0 to ${2 * j}π equals ?·π. What is the number?`, j,
        ["Replace the squared trig function by the half-angle form, then integrate the two pieces.", "The cos 2x piece integrates to a sine, which is 0 at every multiple of π. Only the constant half survives.", "Example: the integral of sin²x from 0 to 10π: the half survives, ½ · 10π = 5π. Now do yours."]);
    }
    const it = pick(SI), o = pick(SI.filter(x => x !== it));
    return C(`Which identity is correct for ${it[0]}? It helps to integrate it.`, it[1], it[2],
      ["There are double-angle identities that turn squares into first powers of cos 2x.", "Check with x = 0: sin 0 = 0 and cos 0 = 1. The right form must give the right number at x = 0.", `Example: ${o[0]} = ${o[1]}. Now do yours.`]);
  };
  const trigSub = () => {
    const a = ri(2, 9), sh = ri(0, 2), ex = [`√(${a * a} − x²)`, `√(${a * a} + x²)`, `√(x² − ${a * a})`][sh];
    const A = [`x = ${a} sin θ`, `x = ${a} tan θ`, `x = ${a} sec θ`];
    return C(`Which trig substitution removes the square root in ∫ dx / ${ex}?`, A[sh], A.filter((_, i) => i !== sh).concat([`x = ${a} θ`]),
      ["Match the shape under the root with one of the three Pythagorean identities.", "A minus with the square number first matches one identity, a plus matches another, and x² first matches the third.", "Example: for √(25 + x²), the plus shape matches 1 + tan²θ = sec²θ, so x = 5 tan θ. Now do yours."]);
  };
  const partInt = () => {
    let a, b; do { a = ri(1, 6); b = ri(1, 6); } while (a === b);
    const A = ri(1, 5), B = ri(1, 5), want = ri(0, 1), cc = A + B, dd = -(A * b + B * a);
    return Q(`∫ (${cc}x ${sgn(dd)} ${Math.abs(dd)}) ÷ ((x − ${a})(x − ${b})) dx = A ln|x − ${a}| + B ln|x − ${b}| + C. Find ${want ? "B" : "A"}.`, want ? B : A,
      [`Split the fraction as A/(x − ${a}) + B/(x − ${b}). Each piece integrates to a logarithm with the same A or B in front.`, want ? `Put x = ${b} into the top and divide by (${b} − ${a}).` : `Put x = ${a} into the top and divide by (${a} − ${b}).`, "Example: (5x − 11)/((x − 1)(x − 4)) = A/(x − 1) + B/(x − 4). At x = 4: B = 9/3 = 3. Now do yours."]);
  };
  const simpson = () => {
    const FL = [["x²", x => x * x], ["x³", x => x ** 3], ["x² + 2x", x => x * x + 2 * x], ["x³ + x", x => x ** 3 + x], ["3x² + 1", x => 3 * x * x + 1]], [fs, f] = pick(FL), h = pick([1, 2, 3]), n = pick([2, 4]);
    const w = n === 2 ? [1, 4, 1] : [1, 4, 2, 4, 1]; let s = 0; w.forEach((c, i) => { s += c * f(i * h); });
    return Q(`Estimate the integral of f(x) = ${fs} from 0 to ${n * h} with Simpson's rule using n = ${n} strips of width ${h}. Estimate = (h ÷ 3)(${n === 2 ? "f₀ + 4f₁ + f₂" : "f₀ + 4f₁ + 2f₂ + 4f₃ + f₄"}).`, h * s / 3,
      [`List f at x = 0, ${h}, ${2 * h}, … up to ${n * h}.`, "Multiply the values by the weights in the formula (1, 4, 2, 4, … 1), add them, then multiply by h ÷ 3.", "Example: f(x) = x² from 0 to 2 with h = 1: (1/3)(0 + 4·1 + 4) = 8/3. (Yours comes out whole.) Now do yours."]);
  };
  const geoSeries = () => {
    const t = ri(0, 1), q = ri(2, 6), p = ri(1, q - 1), m = ri(1, 6);
    if (t === 0) return Q(`A series starts with ${(q - p) * m} and every term is ${p}/${q} of the one before: ${(q - p) * m} + ${(q - p) * m * p}/${q} + … What is the total sum?`, q * m,
      ["This is a geometric series. If the ratio r is between −1 and 1, the sum is first term ÷ (1 − r).", `Here r = ${p}/${q}. Work out 1 − r as a fraction first.`, "Example: first term 6, ratio 1/3: sum = 6 ÷ (2/3) = 9. Now do yours."]);
    return Q(`What is the sum of the infinite series with terms ${(q - p) * m}·(${p}/${q})ⁿ for n = 1, 2, 3, …? (It starts at n = 1, not at n = 0.)`, m * p,
      ["For a geometric series starting with term a, the sum is a ÷ (1 − r). Here the first term is the n = 1 term.", `The first term is ${(q - p) * m} · ${p}/${q}. The ratio is ${p}/${q}.`, "Example: terms 4·(1/2)ⁿ from n = 1: first term 2, ratio 1/2, sum = 2 ÷ (1/2) = 4. Now do yours."]);
  };
  const serTests = () => {
    const t = ri(0, 2);
    if (t === 0) { const p = pick([0.5, 1, 1.5, 2, 3, 4, 0.8, 1.2]); return C(`Does the p-series Σ 1/n<sup>${p}</sup> (n = 1, 2, 3, …) converge or diverge?`, p > 1 ? "Converges" : "Diverges", [p > 1 ? "Diverges" : "Converges"],
      ["A p-series is Σ 1/nᵖ. Whether it converges depends only on p.", `Here p = ${p}. Compare p with 1.`, "Example: Σ 1/n³ has p = 3, bigger than 1, so it converges; Σ 1/n^0.2 has p smaller than 1, so it diverges. Now do yours."]); }
    if (t === 1) { const R = [[1, 2], [2, 3], [3, 2], [4, 3], [5, 4], [3, 4], [1, 3], [2, 1], [7, 5], [5, 6]], r = pick(R); return C(`Does the geometric series Σ (${r[0]}/${r[1]})<sup>n</sup> (n = 0, 1, 2, …) converge or diverge?`, r[0] < r[1] ? "Converges" : "Diverges", [r[0] < r[1] ? "Diverges" : "Converges"],
      ["A geometric series Σ rⁿ depends only on the ratio r.", "Is the size of r smaller than 1, or not?", "Example: r = 1/5 is smaller than 1 so the terms shrink fast and it converges; r = 3/2 is bigger than 1 so the terms grow and it diverges. Now do yours."]); }
    const B = [["Σ n ÷ (n + 1)", "Diverges", "The terms get closer and closer to a number that is not zero."], ["Σ 1 ÷ (n² + 1)", "Converges", "Compare with a p-series that is slightly bigger term by term."], ["Σ n² ÷ (n² + 3)", "Diverges", "The terms get closer and closer to a number that is not zero."], ["Σ 1 ÷ (2n)", "Diverges", "Pull out the constant ½: what series is left?"], ["Σ 5 ÷ n²", "Converges", "Pull out the constant 5: what series is left?"], ["Σ 3ⁿ ÷ 2ⁿ", "Diverges", "Write it as a power of a single fraction."]], it = pick(B);
    return C(`Does ${it[0]} (n = 1, 2, 3, …) converge or diverge?`, it[1], ["Converges", "Diverges"],
      ["First check if the terms go to zero. If they do not, the series cannot converge.", it[2], "Example: Σ 2 ÷ n³: pull out the 2, the rest is a p-series with p = 3 > 1, so it converges. Now do yours."]);
  };
  const ratio = () => {
    const t = ri(0, 4), CV = "Converges", DV = "Diverges", IN = "Test is inconclusive", all = [CV, DV, IN];
    if (t === 0) { let p, q; do { p = ri(1, 9); q = ri(1, 9); } while (p === q); return C(`Use the ratio test on Σ n·${p}ⁿ ÷ ${q}ⁿ (n = 1, 2, 3, …). The limit of |aₙ₊₁ ÷ aₙ| is ${p}/${q}. What does the test say?`, p < q ? CV : DV, all.filter(x => x !== (p < q ? CV : DV)),
      ["Ratio test rule: limit L below 1 means the series converges; L above 1 means it diverges; L = 1 means no information.", `Compare ${p}/${q} with 1.`, "Example: L = 2/5 is smaller than 1, so the series converges. Now do yours."]); }
    if (t === 1) { const c = ri(2, 9); return C(`Use the ratio test on Σ ${c}ⁿ ÷ n! (n = 0, 1, 2, …). The ratio aₙ₊₁ ÷ aₙ equals ${c} ÷ (n + 1). What does the test say?`, CV, [DV, IN],
      ["Find the limit of the ratio as n gets huge.", `The fraction ${c} ÷ (n + 1) shrinks toward a certain number as n grows. Compare it with 1.`, "Example: for Σ 7ⁿ ÷ n!, the ratio 7 ÷ (n + 1) goes to 0, which is below 1. Now do yours."]); }
    if (t === 2) { const c = ri(2, 9); return C(`Use the ratio test on Σ n! ÷ ${c}ⁿ (n = 1, 2, 3, …). The ratio aₙ₊₁ ÷ aₙ equals (n + 1) ÷ ${c}. What does the test say?`, DV, [CV, IN],
      ["Find the limit of the ratio as n gets huge.", `The fraction (n + 1) ÷ ${c} grows without bound as n grows. Compare with 1.`, "Example: for Σ n! ÷ 10ⁿ, the ratio (n + 1) ÷ 10 grows without bound, so the series diverges. Now do yours."]); }
    const B = [["Σ 1 ÷ n²", "converges"], ["Σ 1 ÷ n", "diverges"], ["Σ 1 ÷ n³", "converges"], ["Σ 1 ÷ √n", "diverges"]], it = pick(B);
    return C(`Use the ratio test on ${it[0]} (n = 1, 2, 3, …). The limit of |aₙ₊₁ ÷ aₙ| is 1. What does the ratio test say?`, IN, [CV, DV],
      ["Look at the rule: what does the test say when the limit is exactly 1?", "Other series with very different behavior also have ratio limit 1, so the test cannot decide.", "Example: both Σ 1/n (diverges) and Σ 1/n² (converges) have ratio limit 1, so you need a different test. Now do yours."]);
  };
  const radius = () => {
    const t = ri(0, 2), k = ri(2, 9), c = ri(1, 6), f = pick(["", "n·", "n²·"]);
    if (t === 0) return Q(`What is the radius of convergence of Σ ${f}xⁿ ÷ ${k}ⁿ (n = 0, 1, 2, …)? (By the ratio test, the series converges when |x| ÷ ${k} is below 1.)`, k,
      ["The series converges when the ratio test limit is below 1.", `That limit is |x| ÷ ${k}, so convergence needs |x| below a number.`, "Example: Σ xⁿ ÷ 8ⁿ converges when |x| ÷ 8 < 1, so |x| < 8 and R = 8. Now do yours."]);
    if (t === 1) return Q(`What is the radius of convergence of Σ ${f}(x − ${c})ⁿ ÷ ${k}ⁿ? (The series converges when |x − ${c}| ÷ ${k} is below 1.)`, k,
      ["The centre is the number being subtracted from x. The radius is how far you can go from the centre.", `|x − ${c}| must be below a number: solve |x − ${c}| ÷ ${k} < 1.`, "Example: Σ (x − 4)ⁿ ÷ 6ⁿ has centre 4 and |x − 4| < 6, so R = 6. Now do yours."]);
    return Q(`The series Σ ${f}(x − ${c})ⁿ ÷ ${k}ⁿ converges when |x − ${c}| < ${k}. What is the right end of its interval of convergence (ignore the endpoint itself)?`, c + k,
      ["The interval is centred at the number being subtracted from x.", `The right end is the centre plus the radius ${k}.`, "Example: |x − 5| < 2 gives the interval from 3 to 7, so the right end is 7. Now do yours."]);
  };
  const taylor = () => {
    if (ri(0, 1)) {
      const n = ri(2, 5), c = ri(1, 9);
      return Q(`A function has f^(${n})(0) = ${c * fact(n)}. In its Maclaurin series, the coefficient of x<sup>${n}</sup> is f^(${n})(0) ÷ ${n}!. What is the coefficient?`, c,
        ["The Maclaurin coefficient of xⁿ is the nth derivative at 0 divided by n factorial.", `${n}! = ${fact(n)}. Divide.`, "Example: f⁗(0) = 72 and 4! = 24, so the coefficient of x⁴ is 72 ÷ 24 = 3. Now do yours."]);
    }
    const f0 = ri(1, 9), f1 = ri(1, 9), f2 = 2 * ri(1, 5), f3 = 6 * ri(1, 4);
    return Q(`A function has f(0) = ${f0}, f′(0) = ${f1}, f″(0) = ${f2}, f‴(0) = ${f3}. Its third-degree Taylor polynomial at 0 is f(0) + f′(0)x + f″(0)x²/2! + f‴(0)x³/3!. What is its value at x = 1?`, f0 + f1 + f2 / 2 + f3 / 6,
      ["Put x = 1, so every power of x is 1.", `The terms are ${f0}, ${f1}, ${f2}/2, and ${f3}/6. Add them.`, "Example: f(0) = 1, f′(0) = 2, f″(0) = 4, f‴(0) = 12: 1 + 2 + 4/2 + 12/6 = 7. Now do yours."]);
  };
  const KS = [["1 + x + x²/2! + x³/3! + …", "e^x"], ["x − x³/3! + x⁵/5! − …", "sin x"], ["1 − x²/2! + x⁴/4! − …", "cos x"], ["1 + x + x² + x³ + …", "1/(1-x)"], ["x − x²/2 + x³/3 − …", "ln(1+x)"]];
  const knownSer = () => {
    if (ri(0, 2) === 0) {
      const n = ri(2, 5), k = ri(2, 4);
      return Q(`The geometric series gives 1/(1 − u) = 1 + u + u² + u³ + … Put u = ${k}x. What is the coefficient of x<sup>${n}</sup> in the series for 1/(1 − ${k}x)?`, k ** n,
        [`Replace u by ${k}x in every term: u${sup(n)} becomes (${k}x)${sup(n)}.`, `(${k}x)${sup(n)} = ${k}${sup(n)} · x${sup(n)}. So the coefficient is ${k} to the power ${n}.`, "Example: coefficient of x³ in 1/(1 − 5x): (5x)³ = 125x³, so 125. Now do yours."]);
    }
    const it = pick(KS), o = pick(KS.filter(x => x !== it));
    return C(`Which function has the Maclaurin series ${it[0]}?`, it[1], KS.filter(x => x !== it).map(x => x[1]),
      ["Compare the first few terms and signs with the well-known series.", "Odd powers only suggests one family, even powers only another; all powers with factorials suggests a third.", `Example: ${o[0]} is the series of ${o[1]}. Now do yours.`]);
  };
  const sepDE = () => {
    const [p, b, r] = pick(TRI), flip = ri(0, 1);
    if (!flip) return Q(`Solve the separable equation dy/dx = x/y with y(0) = ${p}, for y > 0. What is y(${b})?`, r,
      ["Separate the variables: y dy = x dx. Then integrate both sides.", `You get y²/2 = x²/2 + C. Use y(0) = ${p} to find C, then put x = ${b}.`, "Example: dy/dx = x/y, y(0) = 3: y² = x² + 9. At x = 4, y² = 25, y = 5. Now do yours."]);
    return Q(`Solve the separable equation dy/dx = −x/y with y(0) = ${r}, for y > 0. What is y(${b})?`, p,
      ["Separate the variables: y dy = −x dx. Then integrate both sides.", `You get y² = −x² + C. Use y(0) = ${r} to find C, then put x = ${b}. This is a circle!`, "Example: dy/dx = −x/y, y(0) = 5: y² = 25 − x². At x = 3, y² = 16, y = 4. Now do yours."]);
  };
  const expDE = () => {
    const t = ri(0, 2), k = ri(2, 9), A = ri(2, 9), Y = ri(2, 9);
    if (t === 0) return Q(`A quantity y obeys dy/dt = k·y. At one moment y = ${Y} and dy/dt = ${k * Y}. What is k?`, k,
      ["The equation dy/dt = k·y says: the rate is k times the amount.", "Divide the rate by the amount.", "Example: y = 4 and dy/dt = 20: k = 20 ÷ 4 = 5. Now do yours."]);
    if (t === 1) { const neg = ri(0, 1), kk = neg ? `−${k}` : String(k);
      return C(`The quantity y satisfies dy/dt = ${kk}y with y(0) = ${A}. Which is the solution?`, `y = ${A} e^(${neg ? "-" : ""}${k}t)`, [`y = ${k} e^(${A}t)`, `y = ${A} + ${k}t`, `y = ${A} e^(${neg ? "" : "-"}${k}t)`],
        ["The solution of dy/dt = ky is y = y(0) · e^(kt).", "The starting amount goes in front, and the rate constant k (with its sign) goes in the exponent.", "Example: dy/dt = 3y with y(0) = 7 gives y = 7e^(3t). Now do yours."]); }
    return Q(`A population obeys dy/dt = ${k}y, and at time 0 it is ${A}. How fast is it growing at t = 0? (That is dy/dt at t = 0.)`, k * A,
      ["dy/dt = k·y, so the growth rate depends on the current size.", "At t = 0 the size is the starting value. Multiply by k.", "Example: dy/dt = 3y with y(0) = 5: rate = 3 · 5 = 15. Now do yours."]);
  };
  const euler = () => {
    const FS = [["x + y", (x, y) => x + y], ["2x + y", (x, y) => 2 * x + y], ["x·y", (x, y) => x * y], ["y + 1", (x, y) => y + 1], ["x + 2y", (x, y) => x + 2 * y]], [fs, f] = pick(FS), h = pick([1, 2]), y0 = ri(1, 4);
    const y1 = y0 + h * f(0, y0), y2 = y1 + h * f(h, y1);
    return Q(`Euler's method for dy/dx = ${fs} with y(0) = ${y0} and step size h = ${h}. Use yₙ₊₁ = yₙ + h·f(xₙ, yₙ) twice. What is y₂, the estimate of y(${2 * h})?`, y2,
      ["Start at (x₀, y₀) = (0, " + y0 + "). Each step moves h to the right and up by h times the slope.", `Step 1: the slope at (0, ${y0}) gives y₁. Step 2: use the slope at (${h}, y₁).`, "Example: dy/dx = x + y, y(0) = 1, h = 1: y₁ = 1 + 1·(0 + 1) = 2, y₂ = 2 + 1·(1 + 2) = 5. Now do yours."]);
  };
  const secondDE = () => {
    const t = ri(0, 2);
    if (t === 0) { let p, q; do { p = ri(1, 9); q = ri(1, 9); } while (p === q); return Q(`Try y = e^(rx) in y″ − ${p + q}y′ + ${p * q}y = 0. This gives r² − ${p + q}r + ${p * q} = 0. What is the larger solution r?`, Math.max(p, q),
      ["Solve the quadratic r² − Sr + P = 0: find two numbers that add to S and multiply to P.", `The two numbers add to ${p + q} and multiply to ${p * q}.`, "Example: r² − 9r + 14 = 0: numbers 2 and 7, larger is 7. Now do yours."]); }
    if (t === 1) { const k = ri(2, 9); return Q(`Try y = e^(rx) in y″ = ${k * k}y. This gives r² = ${k * k}. What is the positive solution r?`, k,
      ["y″ = r²·e^(rx), so the equation becomes a simple equation in r.", "Take the positive square root.", "Example: y″ = 49y gives r² = 49, so r = 7. Now do yours."]); }
    const k = ri(2, 9);
    return Q(`The equation y″ + ${k * k}y = 0 has solutions like sin(kx) and cos(kx). Putting y = sin(kx) gives −k² sin(kx) + ${k * k} sin(kx) = 0. What is the positive value of k?`, k,
      ["The terms must cancel, so k² must equal the number in the equation.", `k² = ${k * k}. Take the positive square root.`, "Example: y″ + 36y = 0 has solutions sin(6x) and cos(6x), so k = 6. Now do yours."]);
  };
  const polarConv = () => {
    const t = ri(0, 3);
    if (t === 0) { const [p, q, r] = pick(TRI); return Q(`A point has rectangular coordinates (${p}, ${q}). Its polar radius is r = √(x² + y²). What is r?`, r,
      ["The radius is the distance from the origin: use the Pythagorean theorem.", `Square ${p} and ${q}, add, then take the square root.`, "Example: (9, 12): 81 + 144 = 225, and √225 = 15. Now do yours."]); }
    if (t === 1) { const r = 2 * ri(1, 12), th = pick([0, 60, 300]); return Q(`A point has polar coordinates (r, θ) = (${r}, ${th}°). Its x-coordinate is r·cos θ. What is x? (cos 0° = 1, cos 60° = ½, cos 300° = ½)`, th === 0 ? r : r / 2,
      ["x = r cos θ. Use the cosine value given in the question.", "Multiply the radius by that cosine value.", "Example: (r, θ) = (14, 60°): x = 14 · ½ = 7. Now do yours."]); }
    if (t === 2) { const r = 2 * ri(1, 12), th = pick([30, 90, 150]); return Q(`A point has polar coordinates (r, θ) = (${r}, ${th}°). Its y-coordinate is r·sin θ. What is y? (sin 30° = ½, sin 90° = 1, sin 150° = ½)`, th === 90 ? r : r / 2,
      ["y = r sin θ. Use the sine value given in the question.", "Multiply the radius by that sine value.", "Example: (r, θ) = (18, 30°): y = 18 · ½ = 9. Now do yours."]); }
    const k = ri(2, 12);
    return Q(`The polar curve r = ${k} is a circle. In rectangular coordinates it is x² + y² = ?. What is the number on the right?`, k * k,
      ["Since r² = x² + y², square both sides of r = k.", `Square ${k}.`, "Example: r = 9 becomes x² + y² = 81. Now do yours."]);
  };
  const polarArea = () => {
    const t = ri(0, 2), k = 2 * ri(1, 6);
    if (t === 0) return Q(`The area in polar coordinates is ½∫r² dθ. For the circle r = ${k} (θ from 0 to 2π), the area is ?·π. What is the number?`, k * k,
      ["With r constant, ½∫r² dθ = ½ · r² · (angle range).", `The angle range is 2π, so ½ · ${k}² · 2π.`, "Example: r = 5, θ from 0 to 2π: ½ · 25 · 2π = 25π. Now do yours."]);
    if (t === 1) return Q(`The area in polar coordinates is ½∫r² dθ. For r = ${k} with θ from 0 to π (a half disk), the area is ?·π. What is the number?`, k * k / 2,
      ["With r constant, ½∫r² dθ = ½ · r² · (angle range).", `The angle range is π, so ½ · ${k}² · π.`, "Example: r = 6, θ from 0 to π: ½ · 36 · π = 18π. Now do yours."]);
    return Q(`The area in polar coordinates is ½∫r² dθ. For r = ${k} with θ from 0 to π/2 (a quarter disk), the area is ?·π. What is the number?`, k * k / 4,
      ["With r constant, ½∫r² dθ = ½ · r² · (angle range).", `The angle range is π/2, so ½ · ${k}² · π/2.`, "Example: r = 8, θ from 0 to π/2: ½ · 64 · π/2 = 16π. Now do yours."]);
  };

  const l29 = [
    L("Integration by parts: the results", partsF, [S("The formula", "∫ u dv = uv − ∫ v du", "It undoes the product rule. Pick u (to differentiate) and dv (to integrate)."), S("Typical results", "x eˣ − eˣ", "∫x eˣ dx = x eˣ − eˣ + C. After one step the leftover integral is simpler."), S("Check", "differentiate", "You can always check by differentiating your answer.")]),
    L("Choosing u: LIATE", liateF, [S("The order", "L I A T E", "Logarithmic, Inverse trig, Algebraic (powers of x), Trig, Exponential. Pick u from the type that comes first."), S("Why", "simpler after d/dx", "Logs and inverse trig become simpler to differentiate and harder to integrate, so they are good for u."), S("dv", "the rest", "Everything else, including dx, goes into dv.")]),
    L("Trig integrals and double angles", trigInt, [S("Half-angle forms", "sin²x = (1 − cos 2x)/2", "Squares of sine and cosine can be rewritten so they can be integrated."), S("The other one", "cos²x = (1 + cos 2x)/2", "The same idea with a plus sign."), S("Over a full cycle", "∫cos 2x = 0", "Over whole periods the cosine piece averages out, leaving half the interval length.")]),
    L("Trigonometric substitution", trigSub, [S("Square roots of squares", "√(a² − x²)", "When a root has x² plus or minus a number, a trig substitution helps."), S("The three cases", "sin · tan · sec", "√(a² − x²): x = a sin θ. √(a² + x²): x = a tan θ. √(x² − a²): x = a sec θ."), S("Why", "identities", "Each choice turns the root into a single trig function by a Pythagorean identity.")]),
    L("Partial fractions in integrals", partInt, [S("Split first", "A/(x − a) + B/(x − b)", "A fraction with two different factors on the bottom can be split into simple fractions."), S("Integrate each", "A ln|x − a|", "Each simple fraction integrates to a logarithm."), S("Find A and B", "cover-up", "Put x = a to find A, and x = b to find B.")]),
    L("Simpson's rule", simpson, [S("Parabolas on top", "⌒", "Simpson's rule uses small parabolas instead of straight lines, so it is more accurate than the trapezoid rule."), S("Weights", "1 · 4 · 2 · 4 · … · 1", "The pattern of weights starts and ends with 1, and alternates 4 and 2 in between."), S("Formula", "(h/3) · Σ", "Add the weighted values and multiply by h ÷ 3. n must be even.")]),
    L("Geometric series", geoSeries, [S("Adding forever", "a + ar + ar² + …", "If each term is r times the one before and |r| < 1, the total is finite."), S("Sum", "a ÷ (1 − r)", "a is the first term."), S("Start point", "n = 0 or n = 1", "If the sum starts later, use the first term that appears.")]),
    L("Testing series: p-series and geometric", serTests, [S("Do the terms shrink?", "aₙ → 0", "If the terms do not go to 0, the series diverges. (If they do, it still might diverge.)"), S("p-series", "Σ 1/nᵖ", "Converges when p > 1, diverges when p ≤ 1. For p = 1 this is the harmonic series."), S("Geometric", "Σ rⁿ", "Converges when |r| < 1, diverges otherwise.")]),
    L("The ratio test", ratio, [S("Compare neighbours", "aₙ₊₁ ÷ aₙ", "Find the limit L of the ratio of each term to the one before."), S("Verdict", "L < 1 · L > 1 · L = 1", "Below 1: converges. Above 1: diverges. Exactly 1: the test cannot tell."), S("Factorials", "n!", "Factorials in the denominator make the ratio go to 0, so those series converge.")]),
    L("Radius of convergence", radius, [S("A power series", "Σ cₙ(x − c)ⁿ", "A power series is like an infinite polynomial. It only works for x close enough to the centre c."), S("The radius R", "|x − c| < R", "Use the ratio test and solve for |x − c|. The number on the right is R."), S("Interval", "(c − R, c + R)", "The series converges in the interval centred at c with radius R.")]),
    L("Taylor and Maclaurin polynomials", taylor, [S("Match the derivatives", "f(0), f′(0), f″(0)…", "A Taylor polynomial copies the value and the first few derivatives of f at a point."), S("Coefficients", "f⁽ⁿ⁾(0) ÷ n!", "The coefficient of xⁿ is the nth derivative at 0, divided by n factorial."), S("Maclaurin", "centre 0", "A Taylor series centred at 0 is called a Maclaurin series.")]),
    L("Famous power series", knownSer, [S("Four to remember", "eˣ · sin x · cos x · 1/(1−x)", "eˣ = 1 + x + x²/2! + …   sin x = x − x³/3! + …   cos x = 1 − x²/2! + …   1/(1 − x) = 1 + x + x² + …"), S("Substitute", "x → kx", "To get the series for 1/(1 − kx), replace x by kx everywhere."), S("Logarithm", "ln(1 + x)", "ln(1 + x) = x − x²/2 + x³/3 − …")]),
    L("Separable differential equations", sepDE, [S("An equation with a derivative", "dy/dx = …", "A differential equation relates a function to its derivatives. The solution is a function."), S("Separate", "y dy = x dx", "Get all the y's on one side with dy, and all the x's on the other with dx. Then integrate both sides."), S("Initial value", "y(0) = …", "Use the given starting value to find the constant C.")]),
    L("Exponential growth and decay equations", expDE, [S("The most famous equation", "dy/dt = k·y", "The rate of change is proportional to the amount. Population growth and radioactive decay both work this way."), S("Solution", "y = y(0) · e^(kt)", "If k is positive it grows, if k is negative it decays."), S("Check", "derivative", "The derivative of A·e^(kt) is k·A·e^(kt), which is k times y.")]),
    L("Euler's method", euler, [S("Following the slope", "➡️", "If you cannot solve a differential equation, you can step along it using the slope at each point."), S("The step", "yₙ₊₁ = yₙ + h·f(xₙ, yₙ)", "Move h to the right, and up by h times the current slope."), S("Smaller steps", "h ↓", "Smaller steps give a more accurate path.")]),
    L("Second-order equations", secondDE, [S("Try e^(rx)", "y″ − Sy′ + Py = 0", "Guess y = e^(rx). Then y′ = r·e^(rx), y″ = r²·e^(rx)."), S("Characteristic equation", "r² − Sr + P = 0", "The e^(rx) cancels, leaving a quadratic in r. Each solution r gives a solution e^(rx)."), S("Oscillation", "y″ + k²y = 0", "This has solutions sin(kx) and cos(kx): a wave, like a spring.")]),
    L("Polar and rectangular coordinates", polarConv, [S("Two ways to describe a point", "(x, y) or (r, θ)", "Polar coordinates give the distance r from the origin and the angle θ."), S("Convert", "x = r cos θ, y = r sin θ", "And going back: r² = x² + y²."), S("Circles", "r = k", "A circle around the origin is the simplest polar curve.")]),
    L("Area in polar coordinates", polarArea, [S("Sectors", "½r²θ", "A slice of a circle with radius r and angle θ has area ½r²θ."), S("Add them up", "A = ½ ∫ r² dθ", "For a changing r, integrate the slices."), S("Whole circle", "πr²", "θ from 0 to 2π gives πr².")])
  ];
  l29.push(mixOf("Mixed practice", [l29[0], l29[2], l29[3], l29[5], l29[6], l29[8], l29[11], l29[13], l29[16]]));
  l29.push(mixOf("Level 29 Challenge", [l29[1], l29[4], l29[7], l29[9], l29[10], l29[12], l29[14], l29[15], l29[17]]));

  // ================= LEVEL 30 =================
  const partials = () => {
    const t = ri(0, 2), a = ri(1, 5), b = ri(1, 5), p = ri(1, 4), q = ri(1, 4), wx = ri(0, 1);
    if (t === 0) {
      const fx = 2 * p * a * b + q * b * b, fy = p * a * a + 2 * q * a * b;
      return Q(`f(x, y) = ${cf(p)}x²y + ${cf(q)}xy². What is ${wx ? "∂f/∂x" : "∂f/∂y"} at the point (${a}, ${b})?`, wx ? fx : fy,
        [wx ? "For ∂f/∂x, treat y as a constant and differentiate with respect to x only." : "For ∂f/∂y, treat x as a constant and differentiate with respect to y only.", `Differentiate each term, then put in x = ${a}, y = ${b}.`, "Example: f = 2x²y + xy² at (1, 3): ∂f/∂x = 4xy + y² = 12 + 9 = 21. Now do yours."]);
    }
    if (t === 1) {
      const fx = 3 * a * a + p * b, fy = p * a + 2 * b;
      return Q(`f(x, y) = x³ + ${cf(p)}xy + y². What is ${wx ? "∂f/∂x" : "∂f/∂y"} at the point (${a}, ${b})?`, wx ? fx : fy,
        [wx ? "For ∂f/∂x, treat y as a constant." : "For ∂f/∂y, treat x as a constant.", `Differentiate each term, then put in x = ${a}, y = ${b}.`, "Example: f = x³ + 2xy + y² at (2, 1): ∂f/∂y = 2x + 2y = 6. Now do yours."]);
    }
    const fx = p * b * b * b + 2 * a * q * b, fy = 3 * p * a * b * b + q * a * a;
    return Q(`f(x, y) = ${cf(p)}xy³ + ${cf(q)}x²y. What is ${wx ? "∂f/∂x" : "∂f/∂y"} at the point (${a}, ${b})?`, wx ? fx : fy,
      [wx ? "For ∂f/∂x, treat y as a constant." : "For ∂f/∂y, treat x as a constant.", `Differentiate each term, then put in x = ${a}, y = ${b}.`, "Example: f = xy³ + x²y at (2, 1): ∂f/∂x = y³ + 2xy = 5. Now do yours."]);
  };
  const gradient = () => {
    const t = ri(0, 2);
    if (t === 0) { const p = ri(1, 4), q = ri(1, 4), a = ri(1, 5), b = ri(1, 5), wx = ri(0, 1);
      return Q(`f(x, y) = ${cf(p)}x² + ${cf(q)}y². The gradient ∇f = (∂f/∂x, ∂f/∂y). What is the ${wx ? "x" : "y"}-component of ∇f at (${a}, ${b})?`, wx ? 2 * p * a : 2 * q * b,
        ["The gradient is the vector of the two partial derivatives.", `${wx ? "∂f/∂x" : "∂f/∂y"} only uses the ${wx ? "x" : "y"} term. Differentiate it and put in the point.`, "Example: f = 3x² + y² at (2, 5): ∇f = (6x, 2y) = (12, 10). Now do yours."]); }
    const a = ri(1, 6), b = ri(1, 6), p = ri(1, 6), q = ri(1, 6), u = pick([0, 1]);
    if (u === 0) return Q(`f(x, y) = ${cf(p)}x + ${cf(q)}y. The unit vector u = (3/5, 4/5) points in a direction. The directional derivative is ∇f · u. What is it?`, (3 * p + 4 * q) / 5,
      ["First find ∇f = (∂f/∂x, ∂f/∂y). For a plane these are constants.", "Take the dot product with u = (3/5, 4/5): multiply matching parts and add.", "Example: f = 5x + 10y, u = (3/5, 4/5): ∇f = (5, 10), dot = 3 + 8 = 11. Now do yours."]);
    return Q(`f(x, y) = xy. At the point (${a}, ${b}), what is the directional derivative in the direction of the unit vector u = (3/5, 4/5)? (It is ∇f · u.)`, (3 * b + 4 * a) / 5,
      ["First find ∇f = (∂f/∂x, ∂f/∂y) = (y, x), then put in the point.", "Take the dot product with u = (3/5, 4/5): multiply matching parts and add.", "Example: f = xy at (2, 6): ∇f = (6, 2), dot with (3/5, 4/5) = 18/5 + 8/5 = 26/5. (Yours comes out whole.) Now do yours."]);
  };
  const crit2 = () => {
    const p = ri(1, 4), q = ri(1, 4), a = ri(1, 6), b = ri(1, 6), wx = ri(0, 1);
    return Q(`f(x, y) = ${cf(p)}x² + ${cf(q)}y² − ${2 * p * a}x − ${2 * q * b}y. Find the critical point (where both partial derivatives are 0). What is its ${wx ? "x" : "y"}-coordinate?`, wx ? a : b,
      ["Set ∂f/∂x = 0 and ∂f/∂y = 0. Each equation has only one of the variables.", wx ? `∂f/∂x = ${2 * p}x − ${2 * p * a} = 0. Solve for x.` : `∂f/∂y = ${2 * q}y − ${2 * q * b} = 0. Solve for y.`, "Example: f = 2x² + y² − 12x − 8y: ∂f/∂x = 4x − 12 = 0 gives x = 3; ∂f/∂y = 2y − 8 = 0 gives y = 4. Now do yours."]);
  };
  const classify = () => {
    if (ri(0, 1)) {
      const A = ri(-6, 6), B = ri(-6, 6), K = ri(-5, 5), D = A * B - K * K;
      if (!A || !B) throw new Error("skip");
      return N(`At a critical point, f_xx = ${A}, f_yy = ${B} and f_xy = ${K}. The second derivative test uses D = f_xx · f_yy − (f_xy)². What is D?`, D,
        ["Multiply f_xx by f_yy, then subtract the square of f_xy.", "Square f_xy first (the result is never negative), then subtract it from the product.", "Example: f_xx = 3, f_yy = 4, f_xy = 2: D = 12 − 4 = 8. Now do yours."], { step: 3 });
    }
    let A, B, K, D; do { A = ri(-6, 6); B = ri(-6, 6); K = ri(-5, 5); D = A * B - K * K; } while (!A || D === 0);
    const ans = D < 0 ? "saddle point" : A > 0 ? "local minimum" : "local maximum";
    return C(`At a critical point, f_xx = ${A}, f_yy = ${B} and f_xy = ${K}. What kind of point is it?`, ans, ["saddle point", "local minimum", "local maximum"],
      ["Compute D = f_xx · f_yy − (f_xy)² first.", "If D is negative the surface is like a horse saddle. If D is positive, the sign of f_xx decides whether the bowl faces up or down.", "Example: f_xx = 2, f_yy = 5, f_xy = 1: D = 10 − 1 = 9 > 0 and f_xx > 0, so a bowl facing up: a local minimum. Now do yours."]);
  };
  const dblRect = () => {
    const a = ri(1, 6), b = ri(1, 6), p = ri(1, 4), q = ri(1, 4), k = ri(1, 9), t = ri(0, 3);
    if (t === 0) return Q(`Find the double integral of f(x, y) = ${k} over the rectangle 0 ≤ x ≤ ${a}, 0 ≤ y ≤ ${b}.`, k * a * b,
      ["The integral of a constant over a region is the constant times the area.", `The rectangle has area ${a} × ${b}.`, "Example: constant 5 over a 2 by 3 rectangle: 5 × 6 = 30. Now do yours."]);
    if (t === 1) return Q(`Find the double integral of f(x, y) = ${cf(p)}x + ${cf(q)}y over the rectangle 0 ≤ x ≤ ${a}, 0 ≤ y ≤ ${b}.`, p * a * a * b / 2 + q * a * b * b / 2,
      ["Do the inside integral first (with respect to y, treating x as a constant), then the outside one.", `The integral of x from 0 to ${a} gives a²/2; the integral of y from 0 to ${b} gives b²/2. Each piece is also multiplied by the length of the other side.`, "Example: f = x + y on 0 ≤ x ≤ 2, 0 ≤ y ≤ 4: (4/2)·4 + (16/2)·2 = 8 + 16 = 24. Now do yours."]);
    if (t === 2) return Q(`Find the double integral of f(x, y) = xy over the rectangle 0 ≤ x ≤ ${a}, 0 ≤ y ≤ ${b}.`, a * a * b * b / 4,
      ["Because xy is a product, the double integral is the product of two single integrals.", `The integral of x from 0 to ${a} is a²/2, and the integral of y from 0 to ${b} is b²/2.`, "Example: f = xy on 0 ≤ x ≤ 4, 0 ≤ y ≤ 2: (16/2)(4/2) = 8 · 2 = 16. Now do yours."]);
    return Q(`Find the double integral of f(x, y) = x² + y over the rectangle 0 ≤ x ≤ ${a}, 0 ≤ y ≤ ${b}.`, a ** 3 * b / 3 + a * b * b / 2,
      ["Integrate x² and y separately, each time remembering the other variable's range gives a factor.", `The first part is (${a}³ ÷ 3) times ${b}. The second part is (${b}² ÷ 2) times ${a}.`, "Example: f = x² + y on 0 ≤ x ≤ 3, 0 ≤ y ≤ 2: (27/3)·2 + (4/2)·3 = 18 + 6 = 24. Now do yours."]);
  };
  const triReg = () => {
    const a = ri(1, 8), p = ri(1, 6), t = ri(0, 3);
    if (t === 0) return Q(`The triangle is 0 ≤ y ≤ x, 0 ≤ x ≤ ${a}. Find the double integral of f(x, y) = ${p}. (Inner integral: y from 0 to x. Outer: x from 0 to ${a}.)`, p * a * a / 2,
      ["The inner integral of a constant from y = 0 to y = x gives the constant times x.", "Then integrate that result over x from 0 to the end value.", "Example: constant 4, x from 0 to 3: inner = 4x, outer = 4 · 9/2 = 18. Now do yours."]);
    if (t === 1) return Q(`The triangle is 0 ≤ y ≤ x, 0 ≤ x ≤ ${a}. Find the double integral of f(x, y) = ${cf(p)}y. (Inner integral: y from 0 to x. Outer: x from 0 to ${a}.)`, p * a ** 3 / 6,
      ["The inner integral of y from 0 to x is x²/2.", `So you must integrate ${p}·x²/2 over x from 0 to ${a}.`, "Example: f = 3y with x from 0 to 2: inner = 3x²/2, outer = 3 · 8/6 = 4. Now do yours."]);
    if (t === 2) return Q(`The triangle is 0 ≤ y ≤ x, 0 ≤ x ≤ ${a}. Find the double integral of f(x, y) = ${cf(p)}x. (Inner integral: y from 0 to x. Outer: x from 0 to ${a}.)`, p * a ** 3 / 3,
      ["The inner integral of x (a constant for the y-integral) from y = 0 to y = x gives x · x.", `So you must integrate ${p}·x² over x from 0 to ${a}.`, "Example: f = 3x with x from 0 to 2: inner = 3x², outer = 3 · 8/3 = 8. Now do yours."]);
    return Q(`What is the area of the triangle 0 ≤ y ≤ x, 0 ≤ x ≤ ${2 * a}? (Compute it as the double integral of 1.)`, 2 * a * a,
      ["The inner integral of 1 from y = 0 to y = x gives x.", `Then integrate x from 0 to ${2 * a}.`, "Example: triangle with x up to 6: area = 36/2 = 18. Now do yours."]);
  };
  const triple = () => {
    const a = ri(1, 4), b = ri(1, 4), c = ri(1, 4), k = ri(1, 6), t = ri(0, 2);
    if (t === 0) return Q(`Find the triple integral of f(x, y, z) = ${k} over the box 0 ≤ x ≤ ${a}, 0 ≤ y ≤ ${b}, 0 ≤ z ≤ ${c}.`, k * a * b * c,
      ["The integral of a constant over a solid is the constant times the volume.", `The box has volume ${a} × ${b} × ${c}.`, "Example: constant 3 over a 2 by 2 by 5 box: 3 × 20 = 60. Now do yours."]);
    if (t === 1) return Q(`Find the triple integral of f(x, y, z) = x over the box 0 ≤ x ≤ ${2 * a}, 0 ≤ y ≤ ${b}, 0 ≤ z ≤ ${c}.`, 2 * a * a * b * c,
      ["Only x changes, so the y and z ranges just multiply the result.", `The integral of x from 0 to ${2 * a} is ${2 * a}²/2. Multiply by ${b} and by ${c}.`, "Example: f = x on 0 ≤ x ≤ 4, 0 ≤ y ≤ 2, 0 ≤ z ≤ 3: (16/2) · 2 · 3 = 48. Now do yours."]);
    return Q(`Find the triple integral of f(x, y, z) = x + y + z over the cube 0 ≤ x, y, z ≤ ${2 * a}.`, 3 * (2 * a) ** 4 / 2,
      ["By symmetry the x, y and z parts are equal. Find one and multiply by 3.", `One part: the integral of x over the cube is (side²/2) · side · side = side⁴/2, with side = ${2 * a}.`, "Example: cube side 2: one part = 16/2 = 8, three parts = 24. Now do yours."]);
  };
  const diverg = () => {
    const a = ri(1, 5), b = ri(1, 5), c = ri(1, 4), t = ri(0, 4);
    if (t === 0) return Q(`The vector field F = (x², y²) has divergence ∂P/∂x + ∂Q/∂y. What is the divergence at (${a}, ${b})?`, 2 * a + 2 * b,
      ["Divergence adds the x-derivative of the first part and the y-derivative of the second part.", `Differentiate x² and y², then put in x = ${a} and y = ${b}.`, "Example: F = (x³, y) at (2, 5): 3x² + 1 = 13. Now do yours."]);
    if (t === 1) return Q(`The vector field F = (xy, xy) has divergence ∂P/∂x + ∂Q/∂y. What is the divergence at (${a}, ${b})?`, a + b,
      ["Divergence adds the x-derivative of the first part and the y-derivative of the second part.", "Differentiate the first xy with respect to x (y is a constant), and the second xy with respect to y.", "Example: F = (3xy, xy) at (2, 4): 3y + x = 12 + 2 = 14. Now do yours."]);
    if (t === 2) return Q(`The vector field F = (x³, y³) has divergence ∂P/∂x + ∂Q/∂y. What is the divergence at (${a}, ${b})?`, 3 * a * a + 3 * b * b,
      ["Divergence adds the x-derivative of the first part and the y-derivative of the second part.", `Use the power rule on each part, then put in x = ${a} and y = ${b}.`, "Example: F = (x², y³) at (3, 1): 2x + 3y² = 9. Now do yours."]);
    if (t === 3) return Q(`In 3D the vector field F = (x², y², z²) has divergence ∂P/∂x + ∂Q/∂y + ∂R/∂z. What is the divergence at (${a}, ${b}, ${c})?`, 2 * (a + b + c),
      ["In 3D there are three parts to add.", `Each part is 2 times its own variable. Put in x = ${a}, y = ${b}, z = ${c}.`, "Example: F = (x², y², z²) at (1, 1, 4) gives 2 + 2 + 8 = 12. Now do yours."]);
    return Q(`The vector field F = (x²y, xy²) has divergence ∂P/∂x + ∂Q/∂y. What is the divergence at (${a}, ${b})?`, 4 * a * b,
      ["Divergence adds the x-derivative of the first part and the y-derivative of the second part.", "∂/∂x of x²y treats y as a constant; ∂/∂y of xy² treats x as a constant. The two answers are equal.", "Example: F = (x²y, xy²) at (1, 2): 2xy + 2xy = 4 + 4 = 8. Now do yours."]);
  };
  const lagrange = () => {
    const t = ri(0, 3), s = ri(1, 8);
    if (t === 0) return Q(`Use Lagrange multipliers to maximize f(x, y) = xy on the line x + y = ${2 * s}. What is the maximum value of xy?`, s * s,
      ["Set ∇f = λ∇g: (y, x) = λ(1, 1). What does that say about x and y?", "x and y are equal, so put that into the constraint x + y to find them. Then multiply.", "Example: maximize xy with x + y = 12: x = y = 6, so xy = 36. Now do yours."]);
    if (t === 1) return Q(`Use Lagrange multipliers to minimize f(x, y) = x² + y² on the line x + y = ${2 * s}. What is the minimum value?`, 2 * s * s,
      ["Set ∇f = λ∇g: (2x, 2y) = λ(1, 1). What does that say about x and y?", "x and y are equal, so find them from the constraint. Then compute x² + y².", "Example: minimize x² + y² with x + y = 10: x = y = 5, so the value is 50. Now do yours."]);
    if (t === 2) return Q(`Use Lagrange multipliers to maximize f(x, y) = xy on the line 2x + y = ${4 * s}. What is the maximum value of xy?`, 4 * s * s / 2,
      ["Set ∇f = λ∇g: (y, x) = λ(2, 1). This gives a relation between y and x.", `It gives y = 2x. Put that into 2x + y = ${4 * s} to find x and y.`, "Example: maximize xy with 2x + y = 12: y = 2x, so 4x = 12, x = 3, y = 6, xy = 18. Now do yours."]);
    return Q(`Use Lagrange multipliers to maximize f(x, y) = xy on the line x + 3y = ${6 * s}. What is the maximum value of xy?`, 3 * s * s,
      ["Set ∇f = λ∇g: (y, x) = λ(1, 3). This gives a relation between x and y.", `It gives x = 3y. Put that into x + 3y = ${6 * s} to find x and y.`, "Example: maximize xy with x + 3y = 12: x = 3y, so 6y = 12, y = 2, x = 6, xy = 12. Now do yours."]);
  };
  const bayes = () => {
    const N0 = ri(5, 10) * 100, a = ri(2, 5) * 10, t = a - ri(0, 2) * 5, f = ri(1, 4) * 5, ctx = pick([["flu", "tests positive"], ["a cold", "gets a positive result"], ["a rash", "tests positive"]]);
    const ans = fr(t, t + f);
    return C(`In a town of ${N0} people, ${a} have ${ctx[0]}. The test is positive for ${t} of those ${a} people, and also for ${f} of the healthy people. If someone ${ctx[1]}, what fraction (simplified) of such people really have ${ctx[0]}?`, ans, [fr(t, a), fr(a, N0), fr(f, t + f), fr(t, N0)],
      ["Only look at the people with a positive test. They form the new group.", "Count everyone who tested positive (sick and healthy). The answer is the sick ones in this group divided by the whole group.", "Example: 10 sick people test positive and 30 healthy people also do: 10 out of 40 positives are sick, which is 1/4. Now do yours."]);
  };
  const matMul = () => {
    const A = [[ri(0, 4), ri(0, 4)], [ri(0, 4), ri(0, 4)]], B = [[ri(0, 4), ri(0, 4)], [ri(0, 4), ri(0, 4)]], r = ri(0, 1), c = ri(0, 1);
    const v = A[r][0] * B[0][c] + A[r][1] * B[1][c];
    return Q(`A = [[${A[0].join(", ")}], [${A[1].join(", ")}]] and B = [[${B[0].join(", ")}], [${B[1].join(", ")}]] (rows in brackets). In the product AB, what is the entry in row ${r + 1}, column ${c + 1}?`, v,
      ["Entry (row i, column j) = row i of A dotted with column j of B.", `Take row ${r + 1} of A and column ${c + 1} of B. Multiply matching numbers and add.`, "Example: A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]: entry (1, 1) = 1·5 + 2·7 = 19. Now do yours."]);
  };
  const det3 = () => {
    const M = [0, 1, 2].map(() => [ri(0, 4), ri(0, 4), ri(0, 4)]);
    const d = M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
    return N(`Find the determinant of the 3×3 matrix with rows [${M[0].join(", ")}], [${M[1].join(", ")}], [${M[2].join(", ")}]. (Expand along the first row: a(ei − fh) − b(di − fg) + c(dh − eg).)`, d,
      ["Use the first row a, b, c and the 2×2 determinants of what is left when you cover its row and column.", "The signs go plus, minus, plus across the top row. Compute the three small determinants first.", "Example: rows [1, 2, 0], [0, 1, 3], [2, 0, 1]: 1(1 − 0) − 2(0 − 6) + 0 = 13. Now do yours."], { step: 4 });
  };
  const inv2 = () => {
    let a, b, c, d; do { a = ri(1, 5); b = ri(0, 5); c = ri(0, 5); d = ri(1, 5); } while (a * d - b * c !== 1);
    const r = ri(0, 1), cc = ri(0, 1), inv = [[d, -b], [-c, a]];
    return N(`The matrix A = [[${a}, ${b}], [${c}, ${d}]] has determinant 1. Its inverse is [[d, −b], [−c, a]] ÷ determinant. What is the entry of A⁻¹ in row ${r + 1}, column ${cc + 1}?`, inv[r][cc],
      ["With determinant 1, the inverse is just [[d, −b], [−c, a]].", "Swap the diagonal entries and change the signs of the other two.", "Example: A = [[3, 2], [1, 1]] has determinant 1, so A⁻¹ = [[1, −2], [−1, 3]]. Now do yours."], { step: 2 });
  };
  const rankNull = () => {
    const n = ri(3, 8), r = ri(1, n - 1), m = ri(2, 6), t = ri(0, 2);
    if (t === 0) return Q(`A matrix has ${n} columns and rank ${r}. By the rank–nullity theorem (rank + nullity = number of columns), what is the dimension of its null space?`, n - r,
      ["Rank plus nullity equals the number of columns.", "Subtract the rank from the number of columns.", "Example: 7 columns and rank 4: nullity = 7 − 4 = 3. Now do yours."]);
    if (t === 1) return Q(`A system of ${m} equations in ${n} unknowns has a coefficient matrix of rank ${Math.min(r, m)}. How many free variables does the solution have? (free variables = unknowns − rank)`, n - Math.min(r, m),
      ["Each pivot variable is determined by the others; the rest are free.", "The number of pivots is the rank.", "Example: 6 unknowns and rank 2: 6 − 2 = 4 free variables. Now do yours."]);
    return Q(`A matrix has ${n} columns and its null space has dimension ${n - r}. What is its rank?`, r,
      ["Rank plus nullity equals the number of columns.", "Subtract the nullity from the number of columns.", "Example: 9 columns and nullity 2: rank = 9 − 2 = 7. Now do yours."]);
  };
  const binMV = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = 2 * ri(2, 40); return Q(`A fair coin is flipped ${n} times. The number of heads has mean np. What is the mean number of heads?`, n / 2,
      ["For a binomial count, the mean is n times p.", "p = 1/2 for a fair coin.", "Example: 30 flips: mean = 30 × ½ = 15. Now do yours."]); }
    if (t === 1) { const n = 4 * ri(1, 30); return Q(`A fair coin is flipped ${n} times. The variance of the number of heads is n·p·(1 − p). What is the variance?`, n / 4,
      ["Use the formula n × p × (1 − p) with p = ½.", "p(1 − p) = ½ × ½.", "Example: 20 flips: 20 × ¼ = 5. Now do yours."]); }
    const m = ri(1, 9);
    return Q(`A fair coin is flipped ${4 * m * m} times. The standard deviation of the number of heads is √(n·p·(1 − p)). What is it?`, m,
      ["First find the variance n · p · (1 − p), then take the square root.", `The variance is ${4 * m * m} × ¼. Take the square root of it.`, "Example: 36 flips: variance 9, standard deviation 3. Now do yours."]);
  };
  const stdErr = () => {
    const n = ri(2, 12) ** 2, root = Math.sqrt(n), s = ri(1, 9), sigma = s * root, t = ri(0, 1);
    if (t === 0) return Q(`Test scores have standard deviation σ = ${sigma}. The mean of a random sample of n = ${n} students is computed. The standard error is σ ÷ √n. What is it?`, s,
      ["The standard error shrinks as the sample gets larger.", `Divide ${sigma} by the square root of ${n}.`, "Example: σ = 30, n = 25: 30 ÷ 5 = 6. Now do yours."]);
    return Q(`The population standard deviation is σ = ${sigma}, and a sample mean has standard error ${s}. How many people were in the sample? (SE = σ ÷ √n)`, n,
      ["Rearrange SE = σ ÷ √n to find √n = σ ÷ SE.", "Then square the result to get n.", "Example: σ = 20, SE = 4: √n = 5, so n = 25. Now do yours."]);
  };
  const confInt = () => {
    const n = ri(2, 10) ** 2, root = Math.sqrt(n), s = ri(1, 6), sigma = s * root, mean = ri(60, 120), t = ri(0, 2);
    const se = s, me = 2 * se;
    const base = `A sample of n = ${n} has mean ${mean}, and the population standard deviation is σ = ${sigma}. For roughly 95% confidence use 2 standard errors (SE = σ ÷ √n).`;
    if (t === 0) return Q(`${base} What is the margin of error (2 × SE)?`, me,
      [`First find SE = ${sigma} ÷ √${n}.`, "Then double it for the margin of error.", "Example: σ = 20, n = 16: SE = 5, margin = 10. Now do yours."]);
    if (t === 1) return Q(`${base} What is the upper end of the confidence interval?`, mean + me,
      ["Interval = mean ± margin of error, where margin = 2 × SE.", `Compute SE = σ ÷ √n, double it, then add it to ${mean}.`, "Example: mean 50, σ = 20, n = 16: margin 10, upper end 60. Now do yours."]);
    return Q(`${base} What is the lower end of the confidence interval?`, mean - me,
      ["Interval = mean ± margin of error, where margin = 2 × SE.", `Compute SE = σ ÷ √n, double it, then subtract it from ${mean}.`, "Example: mean 50, σ = 20, n = 16: margin 10, lower end 40. Now do yours."]);
  };
  const ztest = () => {
    if (ri(0, 1)) {
      const n = ri(2, 10) ** 2, root = Math.sqrt(n), s = ri(1, 5), sigma = s * root, mu = ri(40, 90), z = ri(1, 4);
      return Q(`The claimed mean is μ₀ = ${mu}, σ = ${sigma}, and a sample of n = ${n} has mean ${mu + z * s}. What is the z-statistic z = (x̄ − μ₀) ÷ (σ ÷ √n)?`, z,
        ["First find the standard error σ ÷ √n.", `The difference x̄ − μ₀ is ${z * s}. Divide it by the standard error.`, "Example: μ₀ = 50, σ = 20, n = 16, x̄ = 60: SE = 5, z = 10 ÷ 5 = 2. Now do yours."]);
    }
    const z = pick(["0.5", "1.2", "1.8", "2.5", "3.1", "−2.3", "−0.8", "−3.4"]), zv = parseFloat(z.replace("−", "-")), rej = Math.abs(zv) > 2, R = "Reject H₀ (unlikely to be chance)", D = "Do not reject H₀";
    return C(`A hypothesis test gives z = ${z}. Using the cutoff |z| > 2 (about the 5% level), what do you conclude?`, rej ? R : D, [rej ? D : R],
      ["Compare the size of z (ignore the sign) with the cutoff.", "A z beyond the cutoff means the result would be very unusual if H₀ were true.", "Example: z = 2.8 is beyond 2 in size, so it is unlikely to be chance and we reject H₀. z = 1.1 is not beyond 2. Now do yours."]);
  };

  const l30 = [
    L("Partial derivatives", partials, [S("Two variables", "f(x, y)", "A function can depend on two inputs. A partial derivative changes one input and freezes the other."), S("How", "∂f/∂x", "To find ∂f/∂x, treat y as a constant number and differentiate with respect to x."), S("Meaning", "slope in one direction", "∂f/∂x is the slope when you walk in the x-direction on the surface.")]),
    L("The gradient and directional derivatives", gradient, [S("Gradient", "∇f = (f_x, f_y)", "The gradient is the vector of partial derivatives. It points uphill the steepest way."), S("Direction", "∇f · u", "The slope in the direction of a unit vector u is the dot product ∇f · u."), S("Unit vector", "|u| = 1", "(3/5, 4/5) has length 1.")]),
    L("Critical points of f(x, y)", crit2, [S("Flat spot", "f_x = 0 and f_y = 0", "A top, bottom or saddle of a surface has both partial derivatives equal to 0."), S("Solve both", "2 equations", "Solve the two equations together to find the point."), S("Candidates", "?", "Critical points are only candidates. We still need to classify them.")]),
    L("The second derivative test", classify, [S("The number D", "D = f_xx f_yy − (f_xy)²", "Compute D at a critical point."), S("Reading D", "D > 0 · D < 0", "D < 0: a saddle point. D > 0 and f_xx > 0: local minimum. D > 0 and f_xx < 0: local maximum."), S("D = 0", "?", "If D = 0 this test cannot decide.")]),
    L("Double integrals over rectangles", dblRect, [S("Volume under a surface", "∬ f dA", "A double integral adds up f over a region. Over a surface it gives volume."), S("Iterate", "∫∫ f dy dx", "Do the inside integral first (treat the other variable as a constant), then the outside."), S("Constants", "k × area", "A constant function gives constant times area.")]),
    L("Double integrals over triangles", triReg, [S("Limits can depend on x", "0 ≤ y ≤ x", "For a triangle, the inner limits depend on the outer variable."), S("Inside out", "∫₀ˣ … dy", "The inner integral gives an expression in x; then integrate that for x."), S("Area", "∬ 1 dA", "Integrating the number 1 gives the area of the region.")]),
    L("Triple integrals", triple, [S("Three dimensions", "∭ f dV", "A triple integral adds up f over a solid region."), S("Box", "a × b × c", "Over a box the limits are just numbers. A constant function gives constant times volume."), S("Order", "any order", "For a box you can integrate in any order.")]),
    L("Divergence", diverg, [S("Vector fields", "F = (P, Q)", "A vector field gives an arrow at every point, like wind on a weather map."), S("Divergence", "∂P/∂x + ∂Q/∂y", "How much the field spreads out from a point. Positive means a source, negative means a sink."), S("3D", "+ ∂R/∂z", "In 3D there is a third term.")]),
    L("Lagrange multipliers", lagrange, [S("Best value on a line", "max f subject to g = c", "To find a maximum or minimum along a constraint, compare gradients."), S("The condition", "∇f = λ∇g", "At the best point the two gradients point the same way (one is a multiple of the other)."), S("Solve", "constraint + gradients", "Use ∇f = λ∇g and the constraint together to find x and y.")]),
    L("Bayes' theorem", bayes, [S("Given a positive result", "P(sick | positive)", "A positive test does not always mean sick, because healthy people can test positive too."), S("Count the group", "positives only", "Out of everyone who tests positive, what fraction are really sick?"), S("Formula", "P(A|B) = P(B|A)P(A) ÷ P(B)", "Counting people gives the same answer as the formula.")]),
    L("Matrix multiplication", matMul, [S("Row times column", "AB", "To get the entry in row i and column j of AB, use row i of A and column j of B."), S("Dot product", "a₁b₁ + a₂b₂", "Multiply matching numbers and add."), S("Order matters", "AB ≠ BA", "Usually AB and BA are different matrices.")]),
    L("3×3 determinants", det3, [S("What it measures", "det", "The determinant of a matrix tells how it scales area or volume. It is 0 if the matrix squashes space flat."), S("Expand a row", "+ − +", "Use each entry of the first row times the 2×2 determinant left over, with signs plus, minus, plus."), S("2×2 determinant", "ad − bc", "Do the small ones first.")]),
    L("Inverse of a 2×2 matrix", inv2, [S("Undo the matrix", "A⁻¹", "The inverse undoes what A does: A A⁻¹ = I."), S("Formula", "[[d, −b], [−c, a]] ÷ (ad − bc)", "Swap a and d, change the signs of b and c, and divide by the determinant."), S("No inverse", "det = 0", "If the determinant is 0 there is no inverse.")]),
    L("Rank and nullity", rankNull, [S("Rank", "pivots", "The rank is the number of pivot columns after row reduction."), S("Nullity", "free variables", "The nullity is the dimension of the set of solutions of Ax = 0, which is the number of free variables."), S("The theorem", "rank + nullity = columns", "They always add up to the number of columns.")]),
    L("Mean and spread of a binomial", binMV, [S("Binomial count", "n trials, chance p", "The number of successes in n independent trials."), S("Mean", "np", "On average you get n times p successes."), S("Spread", "variance = np(1 − p)", "The standard deviation is the square root of the variance.")]),
    L("Standard error", stdErr, [S("A sample mean", "x̄", "Different samples have different means. The standard error tells how much they typically vary."), S("Formula", "SE = σ ÷ √n", "Bigger samples have a smaller standard error."), S("Square root law", "4× people → half the error", "To halve the error, you need four times as many people.")]),
    L("Confidence intervals", confInt, [S("A range of plausible values", "x̄ ± margin", "A confidence interval gives a range for the true mean."), S("About 95%", "x̄ ± 2 SE", "Roughly 95% of such intervals contain the true mean (the exact multiplier is 1.96, which we round to 2)."), S("Wider or narrower", "n ↑ → narrower", "A bigger sample makes the interval narrower.")]),
    L("Testing a claim with z", ztest, [S("Is it just chance?", "H₀", "The null hypothesis H₀ is the boring claim, such as 'the mean is μ₀'."), S("The z-statistic", "z = (x̄ − μ₀) ÷ SE", "How many standard errors the sample mean is from the claimed mean."), S("The cutoff", "|z| > 2", "If z is beyond about 2 in size, the result is unlikely to be chance (5% level), so we reject H₀.")])
  ];
  l30.push(mixOf("Mixed practice", [l30[0], l30[2], l30[4], l30[7], l30[10], l30[11], l30[13], l30[15]]));
  l30.push(mixOf("Level 30 Challenge", [l30[1], l30[3], l30[5], l30[6], l30[8], l30[9], l30[12], l30[14], l30[16], l30[17]]));

  Object.assign(MATH_LEVELS, { 28: l28, 29: l29, 30: l30 });
})();
