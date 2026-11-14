// ext/math-19-21.js  Mind Lab Math levels 19-21 (60 lessons): algebra 1 and geometry
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
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const frI = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : `${n}/${d}`; };
  const m = n => (n < 0 ? "−" + (-n) : String(n));
  const show = s => String(s).replace("-", "−");
  const sgn = n => (n < 0 ? `− ${-n}` : `+ ${n}`);
  const nz0 = (lo, hi) => { let x; do { x = ri(lo, hi); } while (x === 0); return x; };
  const pt = (x, y) => `(${m(x)}, ${m(y)})`;
  const sb = (v, h) => (h === 0 ? v : `(${v} ${h < 0 ? "+" : "−"} ${Math.abs(h)})`);
  const lin = (k, b) => (k === 1 ? "" : k === -1 ? "−" : String(k)) + "x" + (b ? ` ${b < 0 ? "−" : "+"} ${Math.abs(b)}` : "");
  const poly = (a, b, c) => {
    const parts = [];
    [[a, "x²"], [b, "x"], [c, ""]].forEach(([co, v]) => {
      if (!co) return;
      const ab = Math.abs(co), body = (ab === 1 && v) ? v : ab + v;
      parts.push(parts.length ? `${co < 0 ? "−" : "+"} ${body}` : `${co < 0 ? "−" : ""}${body}`);
    });
    return parts.length ? parts.join(" ") : "0";
  };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const permN = (n, r) => { let p = 1; for (let i = 0; i < r; i++) p *= n - i; return p; };
  const combN = (n, r) => permN(n, r) / fact(r);
  const ord = n => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");

  // ================= LEVEL 19 =================
  const domRange = () => {
    const t = ri(0, 2), fmt = ps => `{${ps.map(p => `(${p[0]}, ${p[1]})`).join(", ")}}`;
    if (t === 0) {
      const xs = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 5), ps = xs.map(x => [x, ri(1, 5)]);
      return Q(`A relation has the pairs ${fmt(ps)}. How many different numbers are in the RANGE?`, new Set(ps.map(p => p[1])).size,
        ["The range is the set of all the outputs (the second number in each pair). Repeats count only once.", "Write down just the second numbers, then cross out any repeats and count what is left.", "Example: {(1, 2), (2, 2), (3, 5)}. The outputs are 2, 2, 5. Different ones: 2 and 5, so 2 numbers. Now do yours."]);
    }
    if (t === 1) {
      const ps = [0, 1, 2, 3, 4].map(() => [ri(1, 4), ri(1, 9)]);
      return Q(`A relation has the pairs ${fmt(ps)}. How many different numbers are in the DOMAIN?`, new Set(ps.map(p => p[0])).size,
        ["The domain is the set of all the inputs (the first number in each pair). Repeats count only once.", "Write down just the first numbers, then cross out repeats and count what is left.", "Example: {(3, 1), (3, 4), (5, 2)}. The inputs are 3, 3, 5. Different ones: 3 and 5, so 2 numbers. Now do yours."]);
    }
    const yes = ri(0, 1) === 0, xs = shuf([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 4), ps = xs.map(x => [x, ri(1, 9)]);
    if (!yes) { const k = ri(1, 3); ps[k] = [ps[0][0], ps[0][1] + ri(1, 3)]; }
    return C(`Is this relation a function? ${fmt(shuf(ps))}`, yes ? "Yes" : "No", [yes ? "No" : "Yes"],
      ["A function gives each input exactly one output. Look at the first numbers of the pairs.", "Does any input appear twice with two different outputs? Check every first number.", "Example: {(1, 4), (2, 4), (3, 7)}. Each input appears once, so it works even though 4 repeats as an output. Now check yours."]);
  };
  const compose = () => {
    const t = ri(0, 2), k = ri(1, 6);
    const ex = "Example: f(x) = x + 2 and g(x) = 3x. f(g(1)): g(1) = 3, then f(3) = 5. Now do yours.";
    if (t === 0) {
      const a = ri(1, 4), b = ri(0, 6), c = ri(1, 4), d = ri(0, 6), g = c * k + d;
      return N(`f(x) = ${lin(a, b)} and g(x) = ${lin(c, d)}. What is f(g(${k}))?`, a * g + b,
        ["f(g(x)) means do g first, then use that result as the input of f.", `Step 1: find g(${k}). Step 2: put that number into f.`, ex]);
    }
    if (t === 1) {
      const a = ri(1, 4), b = ri(0, 6), c = ri(1, 4), d = ri(0, 6), f = a * k + b;
      return N(`f(x) = ${lin(a, b)} and g(x) = ${lin(c, d)}. What is g(f(${k}))?`, c * f + d,
        ["g(f(x)) means do f first, then use that result as the input of g.", `Step 1: find f(${k}). Step 2: put that number into g.`, "Example: f(x) = 2x and g(x) = x + 5. g(f(3)): f(3) = 6, then g(6) = 11. Now do yours."]);
    }
    const b = ri(1, 5), k2 = ri(1, 5);
    return N(`f(x) = x² and g(x) = x + ${b}. What is f(g(${k2}))?`, (k2 + b) * (k2 + b),
      ["Do the inside function g first. Then square that result.", `g(${k2}) means ${k2} + ${b}. Then f squares whatever comes out.`, "Example: f(x) = x² and g(x) = x + 1. f(g(2)): g(2) = 3, then f(3) = 9. Now do yours."]);
  };
  const arithTerm = () => {
    const t = ri(0, 2), a = ri(1, 12), d = ri(2, 9);
    const sq = n => [0, 1, 2, 3].map(i => a + i * d).join(", ") + ", …";
    if (t === 0) { const n = ri(8, 20); return Q(`Sequence: ${sq()} What is the ${ord(n)} term?`, a + (n - 1) * d,
      ["Each term adds the same number (the common difference). Find it first.", `The rule is a<sub>n</sub> = a<sub>1</sub> + (n − 1) × d. Here n is ${n}.`, "Example: 5, 8, 11, … has d = 3. The 10th term is 5 + 9 × 3 = 32. Now do yours."]); }
    if (t === 1) { const n = ri(6, 12); return Q(`An arithmetic sequence starts at ${a}, and its ${ord(n)} term is ${a + (n - 1) * d}. What is the common difference?`, d,
      ["From the 1st term to the ____ term you add the difference several times. How many times?", `You add d exactly ${n - 1} times. So (last − first) ÷ ${n - 1} gives d.`, "Example: 4 is the 1st term and 22 is the 7th. 22 − 4 = 18 and 18 ÷ 6 = 3. Now do yours."]); }
    const n = ri(8, 20);
    return Q(`Sequence: ${sq()} Which term number is ${a + (n - 1) * d}?`, n,
      [`First subtract the 1st term (${a}) from the number you are looking for.`, "Divide that by the common difference. Then add 1, because the first term used no steps.", "Example: in 3, 7, 11, … which term is 31? 31 − 3 = 28, 28 ÷ 4 = 7, 7 + 1 = 8th term. Now do yours."]);
  };
  const arithSum = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(10, 40); return Q(`Add all the whole numbers 1 + 2 + 3 + … + ${n}.`, n * (n + 1) / 2,
      ["Pair the first and last: 1 + last, 2 + the second-to-last, and so on. Every pair has the same sum.", `There are ${n} numbers, so there are ${n}/2 pairs. Each pair adds to ${n + 1}.`, "Example: 1 + 2 + … + 10. Pairs make 11 and there are 5 pairs: 55. Now do yours."]); }
    if (t === 1) { const a = ri(1, 9), d = ri(2, 6), n = ri(5, 12), last = a + (n - 1) * d;
      return Q(`An arithmetic series has first term ${a}, last term ${last}, and ${n} terms. What is the sum?`, n * (a + last) / 2,
        ["The sum of an arithmetic series is (number of terms ÷ 2) × (first + last).", `Add the first and last terms, then multiply by the number of terms, then halve it.`, "Example: 2, 5, 8, 11 (4 terms). (2 + 11) × 4 ÷ 2 = 26. Now do yours."]); }
    const n = ri(4, 15);
    return Q(`What is the sum of the first ${n} odd numbers? (1 + 3 + 5 + …)`, n * n,
      ["Try small cases: 1 = 1, 1 + 3 = 4, 1 + 3 + 5 = 9. Look at the sums.", "The sums are 1×1, 2×2, 3×3. The number of terms tells you what to multiply.", "Example: the first 4 odd numbers: 1 + 3 + 5 + 7 = 16, which is 4 × 4. Now do yours with your own count."]);
  };
  const geomTerm = () => {
    const t = ri(0, 2), r = ri(2, 3), a = ri(1, 5), sq = [0, 1, 2].map(i => a * r ** i).join(", ") + ", …";
    if (t === 0) { const n = ri(4, r === 3 ? 5 : 7); return Q(`Geometric sequence: ${sq} What is the ${ord(n)} term?`, a * r ** (n - 1),
      ["In a geometric sequence you multiply by the same number each time (the ratio).", `Find the ratio, then multiply the first term by the ratio (n − 1) = ${n - 1} times.`, "Example: 2, 6, 18, … has ratio 3. The 4th term is 2 × 3 × 3 × 3 = 54. Now do yours."]); }
    if (t === 1) return Q(`In the sequence ${sq} what is the common ratio?`, r,
      ["Divide a term by the term just before it.", `Try the second term ÷ the first term.`, "Example: 5, 20, 80, … 20 ÷ 5 = 4 and 80 ÷ 20 = 4, so the ratio is 4. Now do yours."]);
    return Q(`Geometric sequence: ${sq} What is the next term after the ones shown?`, a * r ** 3,
      ["Multiply the last shown term by the ratio.", `The ratio is the same each step. Divide the 2nd term by the 1st to find it.`, "Example: 3, 6, 12, … ratio 2, so the next term after 12 is 24. Now do yours."]);
  };
  const pointSlope = () => {
    const t = ri(0, 1);
    if (t === 0) {
      const k = ri(1, 5), x1 = ri(1, 5), y1 = ri(0, 8), x2 = x1 + ri(1, 5);
      return Q(`A line passes through (${x1}, ${y1}) with slope ${k}. Using y − y<sub>1</sub> = m(x − x<sub>1</sub>), what is y when x = ${x2}?`, y1 + k * (x2 - x1),
        ["Point-slope form is y − y₁ = m(x − x₁). Put the point and the slope in.", `Find how far x moves from ${x1}, then multiply by the slope ${k} and add to y₁.`, "Example: through (1, 2) with slope 3, find y at x = 4. x moves 3, so y goes up 9: y = 11. Now do yours."]);
    }
    const k = ri(2, 6), x1 = nz0(-5, 6), y1 = nz0(-5, 8);
    const rt = `y ${y1 < 0 ? "+" : "−"} ${Math.abs(y1)} = ${k}(x ${x1 < 0 ? "+" : "−"} ${Math.abs(x1)})`;
    const w1 = `y ${y1 < 0 ? "−" : "+"} ${Math.abs(y1)} = ${k}(x ${x1 < 0 ? "−" : "+"} ${Math.abs(x1)})`;
    const w2 = `y ${x1 < 0 ? "+" : "−"} ${Math.abs(x1)} = ${k}(x ${y1 < 0 ? "+" : "−"} ${Math.abs(y1)})`;
    const w3 = `y ${y1 < 0 ? "+" : "−"} ${Math.abs(y1)} = ${k + 1}(x ${x1 < 0 ? "+" : "−"} ${Math.abs(x1)})`;
    return C(`Which equation is the line through ${pt(x1, y1)} with slope ${k}?`, rt, [w1, w2, w3],
      ["Point-slope form is y − y₁ = m(x − x₁). The y-coordinate goes with y and the x-coordinate goes with x.", "Watch the signs: subtracting a negative number turns into adding.", "Example: through (−2, 5) with slope 4 is y − 5 = 4(x + 2), because x − (−2) = x + 2. Now do yours."]);
  };
  const stdIntercepts = () => {
    const A = ri(2, 6); let B; do { B = ri(2, 6); } while (B === A);
    const k = ri(1, 2), Cc = A * B * k, xi = B * k, yi = A * k, t = ri(0, 2), eq = `${A}x + ${B}y = ${Cc}`;
    if (t === 0) return Q(`What is the x-intercept of ${eq}? (Give the x number.)`, xi,
      ["The x-intercept is where the line crosses the x-axis. What is y there?", `Put y = 0 into the equation, then solve for x.`, "Example: 2x + 5y = 20. Let y = 0: 2x = 20, so x = 10. Now do yours."]);
    if (t === 1) return Q(`What is the y-intercept of ${eq}? (Give the y number.)`, yi,
      ["The y-intercept is where the line crosses the y-axis. What is x there?", `Put x = 0 into the equation, then solve for y.`, "Example: 4x + 3y = 24. Let x = 0: 3y = 24, so y = 8. Now do yours."]);
    return Q(`Add the x-intercept and the y-intercept of ${eq}.`, xi + yi,
      ["Find each intercept by setting the other variable to 0.", "Set y = 0 to get x, and set x = 0 to get y. Then add them.", "Example: 2x + 3y = 12 has intercepts 6 and 4, so the total is 10. Now do yours."]);
  };
  const parPerp = () => {
    const t = ri(0, 2), n = nz0(-5, 5), d = ri(1, 4), s = frI(n, d);
    const par = s, perp = frI(-d, n), recip = frI(d, n), neg = frI(-n, d);
    if (t === 0) return C(`A line has slope ${show(s)}. What slope does a PARALLEL line have?`, par, [neg, perp, recip],
      ["Lines that never meet go in the same direction.", "Think about what slope means: how steep. Same steepness, same direction.", "Example: a line with slope 3/4 and another line that never meets it. Its slope is also 3/4. Now do yours."]);
    if (t === 1) return C(`A line has slope ${show(s)}. What slope does a PERPENDICULAR line have?`, perp, [par, neg, recip],
      ["Perpendicular lines meet at a right angle. Their slopes are negative reciprocals.", "Flip the fraction upside down, then change the sign.", "Example: slope 2/5 flips to 5/2, and the sign changes: −5/2. Now do yours."]);
    const kind = ri(0, 2); let s2;
    if (kind === 0) s2 = s; else if (kind === 1) s2 = perp; else do { s2 = frI(nz0(-5, 5), ri(1, 4)); } while (s2 === s || s2 === perp);
    const ans = kind === 0 ? "Parallel" : kind === 1 ? "Perpendicular" : "Neither";
    return C(`Line 1 has slope ${show(s)} and line 2 has slope ${show(s2)}. How are the lines related?`, ans, ["Parallel", "Perpendicular", "Neither"],
      ["Compare the two slopes. Are they exactly the same? Or does one flip and change sign?", "Try multiplying the two slopes. What do you get?", "Example: slopes 3 and 3 match. Slopes 4 and −1/4 multiply to −1. Slopes 2 and 5 do neither. Now check yours."]);
  };
  const LIT = [
    ["A = l × w", "w", "A ÷ l", ["A × l", "l ÷ A", "A − l"], "w is multiplied by l. Undo that."],
    ["d = r × t", "t", "d ÷ r", ["d × r", "r ÷ d", "d − r"], "t is multiplied by r. Undo that."],
    ["P = 2l + 2w", "l", "(P − 2w) ÷ 2", ["P − 2w", "(P − w) ÷ 2", "P ÷ 2 + w"], "First move the 2w away, then undo the 2 that multiplies l."],
    ["y = mx + b", "x", "(y − b) ÷ m", ["(y + b) ÷ m", "y ÷ m − b", "(y − b) × m"], "First get rid of the b that is added, then the m that multiplies x."],
    ["V = B × h ÷ 3", "h", "3V ÷ B", ["V ÷ (3B)", "3V × B", "V − 3B"], "Undo the ÷ 3 first, then undo the × B."],
    ["I = p × r × t", "r", "I ÷ (p × t)", ["I × p × t", "I − p − t", "I ÷ p + t"], "r is multiplied by both p and t. Divide by both."],
    ["A = ½ × b × h", "b", "2A ÷ h", ["A ÷ (2h)", "2A × h", "A − 2h"], "Undo the half by doubling, then undo the multiplication by h."],
    ["ax + b = c", "x", "(c − b) ÷ a", ["(c + b) ÷ a", "c ÷ a − b", "(c − b) × a"], "Get rid of b first, then deal with a."],
    ["S = a + b + c", "c", "S − a − b", ["S + a + b", "a + b − S", "S ÷ (a + b)"], "c has a and b added to it. Undo that."]
  ];
  const literal = () => {
    if (ri(0, 3) === 0) {
      const b = ri(2, 12), h = 2 * ri(1, 6), A = b * h / 2;
      return Q(`Use A = ½bh solved for b: b = 2A ÷ h. A triangle has area ${A} and height ${h}. What is the base b?`, b,
        ["Put the area and height into b = 2A ÷ h.", `Double the area first (2 × ${A}), then divide by ${h}.`, "Example: A = 15 and h = 5. b = 30 ÷ 5 = 6. Now do yours."]);
    }
    const it = pick(LIT);
    return C(`Solve ${it[0]} for ${it[1]}.`, `${it[1]} = ${it[2]}`, it[3].map(w => `${it[1]} = ${w}`),
      ["Get the letter you want alone by undoing operations, one step at a time, like in a number equation.", it[4], "Example: solve c = 3a + 2 for a. Subtract 2, then divide by 3: a = (c − 2) ÷ 3. Now do yours."]);
  };
  const absEq = () => {
    const t = ri(0, 3), a = ri(4, 12), b = ri(1, a - 1);
    if (t === 0) return Q(`Solve |x − ${a}| = ${b}. What is the SMALLER solution?`, a - b,
      ["The distance from x to a number can go either way, so there are two solutions.", `x − ${a} can equal ${b} or −${b}. Solve both.`, "Example: |x − 5| = 2 means x − 5 = 2 or x − 5 = −2, so x = 7 or x = 3. Now do yours."]);
    if (t === 1) return Q(`Solve |x − ${a}| = ${b}. What is the LARGER solution?`, a + b,
      ["The distance from x to a number can go either way, so there are two solutions.", `x − ${a} can equal ${b} or −${b}. Solve both.`, "Example: |x − 6| = 4 means x − 6 = 4 or x − 6 = −4, so x = 10 or x = 2. Now do yours."]);
    if (t === 2) return Q(`The solutions of |x − ${a}| = ${b} are two numbers. What is their sum?`, 2 * a,
      ["Find both solutions, then add them.", `The solutions are the same distance either side of ${a}.`, "Example: |x − 5| = 2 gives 7 and 3, which add up to 10. Now do yours."]);
    const c = pick([-ri(1, 6), 0, ri(1, 6)]), want = c < 0 ? 0 : c === 0 ? 1 : 2;
    return C(`How many solutions does |x − ${ri(1, 9)}| = ${m(c)} have?`, String(want), ["0", "1", "2", "3"],
      ["An absolute value is a distance, so it can't be less than 0.", "Think about each case: a negative number on the right, zero, or a positive number.", "Example: |x| = 5 has two solutions (5 and −5). |x| = 0 has one. |x| = −4 has none. Now do yours."]);
  };
  const compoundIneq = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const a = ri(0, 6), b = a + ri(4, 9), lo = ri(0, 1), hi = ri(0, 1), s1 = lo ? "≤" : "<", s2 = hi ? "≤" : "<";
      let cnt = 0; for (let x = 0; x <= b + 1; x++) if ((lo ? x >= a : x > a) && (hi ? x <= b : x < b)) cnt++;
      return Q(`How many whole numbers x make ${a} ${s1} x ${s2} ${b} true?`, cnt,
        ["Whole numbers are 0, 1, 2, 3, … List the ones that fit between the two ends.", "A ≤ sign includes the end number. A < sign leaves it out.", "Example: 2 < x ≤ 6 holds for 3, 4, 5, 6, which is 4 numbers. Now do yours."]);
    }
    if (t === 1) {
      const c = ri(1, 4), a = c + ri(1, 5), b = a + ri(4, 9);
      return Q(`Solve ${a} ≤ x + ${c} < ${b}. What is the largest whole number that works for x?`, b - c - 1,
        [`Subtract ${c} from every part of the inequality.`, "The right side uses <, so x can't equal the end number. The largest whole number is one less.", "Example: 3 ≤ x + 1 < 8 becomes 2 ≤ x < 7. The largest whole number is 6. Now do yours."]);
    }
    const l = ri(2, 5), u = l + ri(3, 6), out = pick([l - 1, u + 1]);
    return C(`Which number is a solution of x < ${l} or x > ${u}?`, String(out), [l, u, Math.floor((l + u) / 2), l + 1].map(String),
      ["With OR, a number only has to satisfy ONE of the two parts.", "Test each choice on both parts. Is it smaller than the low number or bigger than the high number?", "Example: x < 2 or x > 9. The number 10 works (bigger than 9). The number 5 fails both. Now do yours."]);
  };
  const absIneq = () => {
    const t = ri(0, 3), k = ri(2, 9), a = ri(5, 12), b = ri(2, 5);
    if (t === 0) return Q(`How many integers x make |x| < ${k} true?`, 2 * k - 1,
      [`|x| < ${k} means x is less than ${k} away from 0, on either side.`, `List the integers from −${k - 1} to ${k - 1}, counting 0 too.`, "Example: |x| < 3 holds for −2, −1, 0, 1, 2, which is 5 numbers. Now do yours."]);
    if (t === 1) return Q(`How many integers x make |x| ≤ ${k} true?`, 2 * k + 1,
      [`|x| ≤ ${k} means x is at most ${k} away from 0, on either side.`, `The end numbers −${k} and ${k} count too. Don't forget 0.`, "Example: |x| ≤ 2 holds for −2, −1, 0, 1, 2, which is 5 numbers. Now do yours."]);
    if (t === 2) return Q(`What is the greatest value of x that satisfies |x − ${a}| ≤ ${b}?`, a + b,
      [`|x − ${a}| ≤ ${b} means x is within ${b} of ${a}.`, `x can be as low as ${a} − ${b} and as high as ${a} + ${b}. Which end do they ask for?`, "Example: |x − 10| ≤ 3 means 7 ≤ x ≤ 13. The greatest is 13. Now do yours."]);
    return Q(`How many integers x make |x − ${a}| < ${b} true?`, 2 * b - 1,
      [`The numbers must be less than ${b} away from ${a}.`, `Count the integers on each side of ${a}, then add ${a} itself.`, "Example: |x − 8| < 3 holds for 6, 7, 8, 9, 10, which is 5 numbers. Now do yours."]);
  };
  const sysWord = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const x = ri(3, 15), y = ri(3, 15), p = ri(6, 12), q = ri(3, p - 2), tot = p * x + q * y;
      return Q(`A show sold ${x + y} tickets. Adult tickets cost $${p} and child tickets cost $${q}. The total was $${tot}. How many ADULT tickets were sold?`, x,
        ["Let a be the adult tickets and c the child tickets. Write one equation for the count and one for the money.", `a + c = ${x + y} and ${p}a + ${q}c = ${tot}. Use substitution or elimination.`, "Example: 5 tickets, adults $3 and kids $1, total $11. a + c = 5, 3a + c = 11. Subtract: 2a = 6, a = 3. Now do yours."]);
    }
    if (t === 1) {
      const x = ri(3, 12), y = ri(3, 12), p = ri(2, 6), q = ri(p + 1, 9);
      return Q(`Pens cost $${p} each and notebooks cost $${q} each. Sam bought ${x + y} items and spent $${p * x + q * y}. How many NOTEBOOKS did he buy?`, y,
        ["Let p be pens and n notebooks. One equation counts items and one adds the money.", `p + n = ${x + y} and ${p}p + ${q}n = ${p * x + q * y}. Solve the system.`, "Example: 6 items, pens $1 and notebooks $2, total $9. p + n = 6, p + 2n = 9. Subtract: n = 3. Now do yours."]);
    }
    const x = ri(8, 25), y = ri(1, x - 1);
    return Q(`Two numbers add up to ${x + y} and their difference is ${x - y}. What is the larger number?`, x,
      ["Write two equations: x + y = the sum and x − y = the difference.", "Add the two equations together. The y terms cancel.", "Example: sum 14 and difference 4. Add: 2x = 18, so x = 9 (and y = 5). Now do yours."]);
  };
  const sysClass = () => {
    const t = ri(0, 2), mm = nz0(-5, 5), b = nz0(-8, 8), eq = (a, c) => `y = ${lin(a, c)}`;
    if (t === 0) { let m2; do { m2 = mm + pick([-2, -1, 1, 2]); } while (m2 === 0); const b2 = nz0(-8, 8);
      return C(`How many solutions does this system have?<br>${eq(mm, b)}<br>${eq(m2, b2)}`, "One solution", ["No solution", "Infinitely many solutions"],
        ["Put both equations in y = mx + b form. Compare the slopes (m).", `The first line has slope ${m(mm)} and intercept ${m(b)}. Compare with the second line.`, "Example: y = 2x + 1 and y = 5x + 1 have different slopes. Lines with different slopes cross once. Now check yours."]); }
    if (t === 1) { const b2 = b + nz0(-3, 3);
      return C(`How many solutions does this system have?<br>${eq(mm, b)}<br>${eq(mm, b2)}`, "No solution", ["One solution", "Infinitely many solutions"],
        ["Put both equations in y = mx + b form. Compare the slopes (m) and then the intercepts (b).", `The first line has slope ${m(mm)} and intercept ${m(b)}. What about the second?`, "Example: y = 3x + 1 and y = 3x + 6 climb at the same rate but start at different heights, so they never touch. Now check yours."]); }
    const k = ri(2, 3);
    return C(`How many solutions does this system have?<br>${eq(mm, b)}<br>${k}y = ${lin(k * mm, k * b)}`, "Infinitely many solutions", ["One solution", "No solution"],
      ["Divide the second equation by its number in front of y, so it looks like y = mx + b.", `The first line has slope ${m(mm)} and intercept ${m(b)}. What do you get for the second?`, "Example: y = x + 2 and 2y = 2x + 4. Divide the second by 2: y = x + 2. It is the same line, so every point works. Now check yours."]);
  };
  const polyAdd = () => {
    const A = [ri(2, 7), ri(1, 9), ri(1, 9)], B = [ri(1, 5), ri(1, 9), ri(1, 9)], sub = ri(0, 1) === 1, i = ri(0, 2);
    const nm = ["x² term", "x term", "constant term"][i], res = sub ? A[i] - B[i] : A[i] + B[i];
    return N(`(${poly(...A)}) ${sub ? "−" : "+"} (${poly(...B)})<br>What is the coefficient of the ${nm} in the answer? (For the constant, give the number.)`, res,
      [sub ? "Subtract every term of the second polynomial. Line up like terms: x² with x², x with x, numbers with numbers." : "Line up like terms: x² with x², x with x, numbers with numbers. Then add each pair.", `Look only at the ${nm} of each polynomial and ${sub ? "subtract" : "add"} those two numbers.`, `Example: (3x² + 5x + 2) ${sub ? "−" : "+"} (x² + 2x + 1): the x terms give 5 ${sub ? "−" : "+"} 2 = ${sub ? 3 : 7}. Now do yours.`]);
  };
  const foil = () => {
    const t = ri(0, 3), p = ri(1, 9), q = ri(1, 9);
    if (t === 0) return Q(`Multiply (x + ${p})(x + ${q}). What is the coefficient of x in the answer?`, p + q,
      ["Use FOIL: First, Outer, Inner, Last. The x terms come from Outer and Inner.", `Outer gives ${q}x and Inner gives ${p}x. Add them.`, "Example: (x + 2)(x + 5): Outer 5x, Inner 2x, so the x coefficient is 7. Now do yours."]);
    if (t === 1) return Q(`Multiply (x + ${p})(x + ${q}). What is the constant term (the number with no x)?`, p * q,
      ["Use FOIL. The number with no x comes from the Last terms.", "Multiply the two numbers in the brackets.", "Example: (x + 3)(x + 4) has constant 3 × 4 = 12. Now do yours."]);
    if (t === 2) return N(`Multiply (x − ${p})(x + ${q}). What is the coefficient of x in the answer?`, q - p,
      ["Use FOIL. The x terms come from Outer and Inner. Keep the minus sign.", `Outer gives ${q}x and Inner gives −${p}x. Add them.`, "Example: (x − 2)(x + 6): Outer 6x, Inner −2x, so the x coefficient is 4. Now do yours."]);
    const a = ri(2, 5), b = ri(1, 6), c = ri(1, 6);
    return Q(`Multiply (${a}x + ${b})(x + ${c}). What is the coefficient of x in the answer?`, a * c + b,
      ["Use FOIL. The x terms come from Outer and Inner.", `Outer is ${a}x × ${c}. Inner is ${b} × x. Add them.`, "Example: (2x + 3)(x + 4): Outer 8x, Inner 3x, so 11x. Now do yours."]);
  };
  const factorTri = () => {
    const t = ri(0, 3), p = ri(1, 9), q = ri(1, 9);
    if (t === 0) return Q(`x² + ${p + q}x + ${p * q} = (x + ${p})(x + ?)`, q,
      [`Find two numbers that multiply to ${p * q} and add to ${p + q}. One of them is given.`, `The numbers multiply to the constant term. Divide ${p * q} by ${p}.`, "Example: x² + 7x + 12 = (x + 3)(x + ?). 12 ÷ 3 = 4, and 3 + 4 = 7 ✓. Now do yours."]);
    if (t === 1) return Q(`x² − ${p + q}x + ${p * q} = (x − ${p})(x − ?)`, q,
      [`Both numbers are negative, so they multiply to a positive and add to −${p + q}.`, `Divide the constant ${p * q} by ${p}.`, "Example: x² − 9x + 20 = (x − 4)(x − ?). 20 ÷ 4 = 5, and 4 + 5 = 9 ✓. Now do yours."]);
    if (t === 2) { const a = Math.max(p, q) + ri(0, 2), b = ri(1, a - 1);
      return Q(`x² + ${a - b}x − ${a * b} = (x + ${a})(x − ?)`, b,
        [`The constant is negative, so the numbers have opposite signs. Their product is ${a * b}.`, `Divide ${a * b} by ${a}. Then check that ${a} minus your number gives ${a - b}.`, "Example: x² + 3x − 10 = (x + 5)(x − ?). 10 ÷ 5 = 2, and 5 − 2 = 3 ✓. Now do yours."]); }
    return Q(`Find two numbers that multiply to ${p * q} and add to ${p + q}. What is the LARGER number?`, Math.max(p, q),
      ["List the factor pairs of the product. Which pair has the right sum?", `Test pairs that multiply to ${p * q} and check which pair adds to ${p + q}.`, "Example: product 18, sum 11: pairs 1·18, 2·9, 3·6. 2 + 9 = 11, so the larger is 9. Now do yours."]);
  };
  const special = () => {
    const t = ri(0, 4), k = ri(2, 12), a = ri(2, 5), b = ri(1, 7);
    if (t === 0) return Q(`x² − ${k * k} = (x + ${k})(x − ?)`, k,
      ["This is a difference of squares: a² − b² = (a + b)(a − b).", `What number times itself gives ${k * k}?`, "Example: x² − 49 = (x + 7)(x − 7), because 7 × 7 = 49. Now do yours."]);
    if (t === 1) return Q(`${a * a}x² − ${b * b} = (${a}x + ${b})(${a}x − ?)`, b,
      ["This is a difference of squares: A² − B² = (A + B)(A − B).", `The first bracket already shows the pair: ${a}x and one other number.`, "Example: 9x² − 16 = (3x + 4)(3x − 4). Now do yours."]);
    if (t === 2) return Q(`(x + ${k})² = x² + ?x + ${k * k}. What number goes in the ? spot?`, 2 * k,
      ["(x + k)² means (x + k)(x + k). Use FOIL.", `The middle term comes from two equal parts: Outer and Inner both give ${k}x.`, "Example: (x + 5)² = x² + 10x + 25. The middle is 2 × 5 = 10. Now do yours."]);
    if (t === 3) return Q(`x² + ${2 * k}x + ${k * k} = (x + ?)²`, k,
      ["A perfect square trinomial has the form x² + 2kx + k².", `Half of the middle number is k. Check that k × k matches the last number ${k * k}.`, "Example: x² + 14x + 49 = (x + 7)², since 14 ÷ 2 = 7 and 7 × 7 = 49. Now do yours."]);
    return Q(`(x − ${k})² = x² − ${2 * k}x + ?. What goes in the ? spot?`, k * k,
      ["Square a difference with FOIL: the last term is (−k) × (−k).", `A negative times a negative is positive. What is ${k} × ${k}?`, "Example: (x − 6)² = x² − 12x + 36. The last term is 6 × 6 = 36. Now do yours."]);
  };

  // ================= LEVEL 20 =================
  const zeroProd = () => {
    const t = ri(0, 3), a = ri(1, 9); let b; do { b = ri(1, 9); } while (b === a);
    const lo = Math.min(a, b), hi = Math.max(a, b);
    if (t === 0) return Q(`Solve (x − ${a})(x − ${b}) = 0. What is the SMALLER solution?`, lo,
      ["If two things multiply to 0, at least one of them is 0.", `Set each bracket equal to 0 and solve: x − ${a} = 0 or x − ${b} = 0.`, "Example: (x − 2)(x − 7) = 0 gives x = 2 or x = 7. Now do yours."]);
    if (t === 1) return Q(`Solve (x − ${a})(x − ${b}) = 0. What is the LARGER solution?`, hi,
      ["If two things multiply to 0, at least one of them is 0.", `Set each bracket equal to 0 and solve: x − ${a} = 0 or x − ${b} = 0.`, "Example: (x − 3)(x − 8) = 0 gives x = 3 or x = 8. Now do yours."]);
    if (t === 2) return Q(`Solve (x + ${a})(x − ${b}) = 0. What is the POSITIVE solution?`, b,
      ["If two things multiply to 0, at least one of them is 0.", `x + ${a} = 0 gives a negative number. The other bracket gives the positive one.`, "Example: (x + 4)(x − 6) = 0 gives x = −4 or x = 6. The positive one is 6. Now do yours."]);
    return Q(`Solve x(x − ${a}) = 0. What is the solution that is NOT zero?`, a,
      ["Either x = 0 or the other bracket = 0.", `Set x − ${a} = 0 and solve.`, "Example: x(x − 9) = 0 gives x = 0 or x = 9. The one that isn't zero is 9. Now do yours."]);
  };
  const solveFactor = () => {
    const t = ri(0, 3), p = ri(1, 9); let q; do { q = ri(1, 9); } while (q === p);
    if (t === 0) return Q(`Solve x² − ${p + q}x + ${p * q} = 0 by factoring. What is the larger solution?`, Math.max(p, q),
      [`Find two numbers that multiply to ${p * q} and add to ${p + q}. Those make the brackets.`, "Write (x − ?)(x − ?) = 0, then each bracket is 0 for one solution.", "Example: x² − 7x + 12 = (x − 3)(x − 4) = 0, so x = 3 or 4. Now do yours."]);
    if (t === 1) return Q(`Solve x² − ${p + q}x + ${p * q} = 0 by factoring. What is the smaller solution?`, Math.min(p, q),
      [`Find two numbers that multiply to ${p * q} and add to ${p + q}. Those make the brackets.`, "Write (x − ?)(x − ?) = 0, then each bracket is 0 for one solution.", "Example: x² − 9x + 14 = (x − 2)(x − 7) = 0, so x = 2 or 7. Now do yours."]);
    if (t === 2) return N(`Solve x² + ${p + q}x + ${p * q} = 0 by factoring. What is the larger solution?`, -Math.min(p, q),
      [`The numbers multiply to ${p * q} and add to ${p + q}, so the brackets are (x + ?)(x + ?).`, "Each bracket (x + number) is 0 when x is the NEGATIVE of that number.", "Example: x² + 7x + 12 = (x + 3)(x + 4) = 0, so x = −3 or −4. The larger is −3. Now do yours."]);
    return Q(`The equation x² − ${p + q}x + ${p * q} = 0 has two solutions. What is their product?`, p * q,
      ["Factor to find the two solutions, then multiply them.", `The solutions are the numbers that multiply to ${p * q} and add to ${p + q}.`, "Example: x² − 7x + 10 = 0 has solutions 2 and 5, and 2 × 5 = 10. Now do yours."]);
  };
  const sqrtMethod = () => {
    const t = ri(0, 3), k = ri(2, 12), a = ri(k + 1, k + 8);
    if (t === 0) return Q(`Solve x² = ${k * k}. What is the positive solution?`, k,
      ["Take the square root of both sides. There is a + and a − answer.", `Which positive number times itself makes ${k * k}?`, "Example: x² = 64 gives x = 8 or x = −8. The positive one is 8. Now do yours."]);
    if (t === 1) return Q(`Solve (x − ${a})² = ${k * k}. What is the LARGER solution?`, a + k,
      [`Take the square root of both sides first. That gives x − ${a} = ±(a number).`, `Add ${a} to both sides. Use the + number for the larger one.`, "Example: (x − 5)² = 9 gives x − 5 = 3 or −3, so x = 8 or 2. Now do yours."]);
    if (t === 2) return Q(`Solve (x − ${a})² = ${k * k}. What is the SMALLER solution?`, a - k,
      [`Take the square root of both sides first. That gives x − ${a} = ±(a number).`, `Add ${a} to both sides. Use the − number for the smaller one.`, "Example: (x − 9)² = 16 gives x − 9 = 4 or −4, so x = 13 or 5. Now do yours."]);
    const c = ri(1, 9);
    return Q(`Solve x² + ${c} = ${k * k + c}. What is the positive solution?`, k,
      [`Get x² alone: subtract ${c} from both sides.`, "Then take the square root of both sides.", "Example: x² + 4 = 29 gives x² = 25, so x = 5 or −5. The positive one is 5. Now do yours."]);
  };
  const axisSym = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 3), h = ri(1, 6), c = ri(0, 9);
      return Q(`What is the axis of symmetry of y = ${poly(a, -2 * a * h, c)}? (Give x = ? as the number.)`, h,
        ["The axis of symmetry is the line x = −b ÷ (2a).", `Here a = ${a} and b = ${-2 * a * h}. Put them into the formula.`, "Example: y = x² − 8x + 3 has a = 1, b = −8, so x = 8 ÷ 2 = 4. Now do yours."]); }
    if (t === 1) { const a = ri(1, 3), h = ri(1, 6), c = ri(0, 9);
      return Q(`What is the y-intercept of y = ${poly(a, -2 * a * h, c)}?`, c,
        ["The y-intercept is where the graph crosses the y-axis. What is x there?", "Put x = 0 in. Only one term is left.", "Example: y = 2x² − 5x + 7. At x = 0, y = 7. Now do yours."]); }
    const h = nz0(-6, 6), k = ri(1, 9);
    return N(`The parabola y = (x ${h < 0 ? "+" : "−"} ${Math.abs(h)})² + ${k} has its axis of symmetry at x = ?`, h,
      ["In y = (x − h)² + k the axis is x = h. Careful with the sign inside the bracket.", `x − h and x + number: (x + 3) is the same as x − (−3).`, "Example: y = (x + 2)² + 1 has x − (−2), so the axis is x = −2. Now do yours."], { step: 1 });
  };
  const vertexForm = () => {
    const t = ri(0, 3), a = pick([1, 2, 3, -1, -2]), h = nz0(-5, 6), k = nz0(-6, 9);
    const f = `y = ${a === 1 ? "" : a === -1 ? "−" : a}${sb("x", h)}² ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
    if (t === 0) return N(`What is the x-coordinate of the vertex of ${f}?`, h,
      ["Vertex form is y = a(x − h)² + k. The vertex is (h, k).", "The number inside the bracket with x flips its sign to give h.", "Example: y = 2(x + 4)² + 1 has vertex (−4, 1). Now do yours."]);
    if (t === 1) return N(`What is the y-coordinate of the vertex of ${f}?`, k,
      ["Vertex form is y = a(x − h)² + k. The vertex is (h, k).", "The number added at the end is k.", "Example: y = 3(x − 2)² − 5 has vertex (2, −5). Now do yours."]);
    if (t === 2) return C(`Does ${f} have a highest point or a lowest point?`, a > 0 ? "A lowest point" : "A highest point", [a > 0 ? "A highest point" : "A lowest point", "Neither"],
      ["Look at the number a in front of the bracket. Is it positive or negative?", "A positive a makes a U-shape. A negative a makes an upside-down U.", "Example: y = −3(x − 1)² + 2 flips upside down, so it peaks at its vertex. y = 3(x − 1)² + 2 dips to its vertex. Now do yours."]);
    return N(`For ${f}, what is y when x = ${h + 1}?`, a + k,
      [`Put x = ${h + 1} into the bracket first.`, `The bracket becomes (${h + 1} − ${m(h)}), which is 1. Then square it, multiply by a, and add k.`, "Example: y = 2(x − 3)² + 4 at x = 4: (4 − 3)² = 1, 2 × 1 + 4 = 6. Now do yours."]);
  };
  const expGrow = () => {
    const t = ri(0, 3), s = ri(2, 9), b = pick([2, 3, 4]);
    if (t === 0) { const n = ri(3, 5); return Q(`A plant culture starts at ${s} cells and ${b === 2 ? "doubles" : b === 3 ? "triples" : "quadruples"} every hour. How many cells after ${n} hours?`, s * b ** n,
      ["Each hour you multiply by the same number. That's exponential growth.", `The amount is start × ${b}^hours.`, "Example: 3 cells doubling for 4 hours is 3 × 2 × 2 × 2 × 2 = 48. Now do yours."]); }
    if (t === 1) { const n = ri(3, 5); return Q(`y = ${s} × ${b}<sup>x</sup>. What is y when x = ${n}?`, s * b ** n,
      ["Work out the power first, then multiply by the number in front.", `${b}<sup>${n}</sup> means ${b} multiplied by itself ${n} times.`, "Example: y = 2 × 3^x at x = 2: 3² = 9, then 2 × 9 = 18. Now do yours."]); }
    if (t === 2) return Q(`A table shows x: 0, 1, 2 and y: ${s}, ${s * b}, ${s * b * b}. The pattern continues. What is y when x = 4?`, s * b ** 4,
      ["Find what each y is multiplied by to get the next y.", `Divide the second y by the first y to find the multiplier.`, "Example: y = 2, 6, 18 is times 3 each step. Next: 54, then 162. Now do yours."]);
    const n = ri(3, 6);
    return Q(`Bacteria double every hour. A dish has ${s} now and ${s * 2 ** n} later. How many hours passed?`, n,
      ["Keep doubling the start amount and count the doublings.", `Start at ${s}. Double it, double again… until you reach ${s * 2 ** n}.`, "Example: 5 → 10 → 20 → 40 → 80 took 4 doublings. Now do yours."]);
  };
  const expDecay = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(2, 4), s = ri(1, 6) * 2 ** n * 5; return Q(`A medicine amount of ${s} mg halves every hour. How many mg are left after ${n} hours?`, s / 2 ** n,
      ["Halving means multiplying by ½ each time. That's exponential decay.", `Cut the amount in half ${n} times.`, "Example: 80 mg halves 3 times: 40, 20, 10. Now do yours."]); }
    if (t === 1) { const n = ri(2, 3), s = ri(1, 4) * 3 ** n; return Q(`A stack of ${s} cards loses one third of what's left each round. How many are left after ${n} rounds?`, Math.round(s * (2 / 3) ** n),
      ["Losing one third leaves two thirds each time.", `Multiply by 2/3, ${n} times. Divide by 3 first, then double.`, "Example: 27 loses a third: 18, then 12. Now do yours."]); }
    if (t === 2) { const n = ri(3, 5), end = ri(1, 5) * 5; return Q(`A pool of medicine halves every hour. It was ${end * 2 ** n} mg at the start and is now ${end} mg. How many hours passed?`, n,
      ["Count how many halvings it takes to go from the start to the end amount.", `Halve ${end * 2 ** n} again and again until you reach ${end}.`, "Example: 96 → 48 → 24 → 12 is 3 halvings. Now do yours."]); }
    const pcts = [[10, 1000], [20, 500], [50, 400], [25, 800]], [pc, s0] = pick(pcts), n = 2;
    return Q(`A bike worth $${s0} loses ${pc}% of its value each year. What is it worth after ${n} years?`, Math.round(s0 * (1 - pc / 100) ** n),
      [`Each year it keeps ${100 - pc}% of its value. Multiply by ${(100 - pc) / 100} each year.`, `Find ${pc}% of the value, subtract it, and then do the same again with the new value.`, "Example: $200 loses 50% each year: $100, then $50. Now do yours."]);
  };
  const growthDecay = () => {
    const t = ri(0, 2);
    if (t === 0) { const g = ri(0, 1) === 0, f = g ? pick([1.5, 2, 3, 1.2, 1.1, 4]) : pick([0.5, 0.8, 0.9, 0.25, 0.75]), a = ri(2, 9);
      return C(`Is y = ${a} × ${f}<sup>x</sup> growth or decay?`, g ? "Growth" : "Decay", [g ? "Decay" : "Growth", "Neither"],
        ["Look at the number that is raised to the power x (the base).", "A base bigger than 1 makes numbers climb. A base between 0 and 1 makes them shrink.", "Example: y = 4 × 3^x climbs, and y = 4 × 0.5^x shrinks. Now do yours."]); }
    for (let i = 0; i < 50; i++) {
      const r = pick([10, 20, 25, 50]), s0 = pick([100, 200, 400, 800, 1000, 16, 64, 160]), n = ri(2, 3), v = s0 * (1 + r / 100) ** n;
      if (Number.isInteger(Math.round(v * 1e6) / 1e6)) {
        const val = Math.round(v);
        return t === 1
          ? Q(`$${s0} grows by ${r}% each year. How much is it worth after ${n} years?`, val,
            [`Each year it becomes ${100 + r}% of the year before. Multiply by ${(100 + r) / 100}.`, "Do it one year at a time. The second year uses the new amount, not the starting amount.", "Example: $100 grows 10% a year: $110, then $121. Now do yours."])
          : Q(`A town has ${s0} people and grows ${r}% each year. How many people after ${n} years?`, val,
            [`Each year it becomes ${100 + r}% of the year before. Multiply by ${(100 + r) / 100}.`, "Do it one year at a time, using the new total each time.", "Example: 200 people grows 50%: 300, then 450. Now do yours."]);
      }
    }
    return Q("$100 grows 10% each year. How much after 2 years?", 121, ["Multiply by 1.1 each year.", "Do it one year at a time.", "Example: $200 grows 50%: $300, then $450. Now do yours."]);
  };
  const simpRad = () => {
    const t = ri(0, 2), a = ri(2, 9), b = pick([2, 3, 5, 6, 7]);
    if (t === 0) return Q(`√${a * a * b} = ?√${b}. What number goes in the ? spot?`, a,
      [`Look for a perfect square that divides ${a * a * b}.`, `${a * a * b} = (a perfect square) × ${b}. The square root of the perfect square comes outside.`, "Example: √50 = √(25 × 2) = 5√2. Now do yours."]);
    if (t === 1) return Q(`√${a * a * b} = ${a}√?. What number goes under the root sign?`, b,
      [`Break ${a * a * b} into ${a * a} × something.`, `Divide ${a * a * b} by ${a * a}. What is left stays under the root.`, "Example: √72 = √(36 × 2) = 6√2, so 2 stays inside. Now do yours."]);
    const ans = `${a}√${b}`;
    return C(`Which is √${a * a * b} in simplest form?`, ans, [`${a * a}√${b}`, `${b}√${a}`, `${a + 1}√${b}`],
      [`Find the biggest perfect square that goes into ${a * a * b}.`, "Take its square root and write it in front of the root sign. What is left stays inside.", "Example: √48 = √(16 × 3) = 4√3. Now do yours."]);
  };
  const radOps = () => {
    const t = ri(0, 3), r = pick([2, 3, 5, 6, 7]), a = ri(2, 9), c = ri(1, a - 1);
    if (t === 0) return Q(`${a}√${r} + ${c}√${r} = ?√${r}. What number goes in the ? spot?`, a + c,
      ["√r is like a unit. You can add them like 'terms with the same letter'.", "Add the numbers in front. The root stays the same.", "Example: 4√3 + 2√3 = 6√3. Now do yours."]);
    if (t === 1) return Q(`${a}√${r} − ${c}√${r} = ?√${r}. What number goes in the ? spot?`, a - c,
      ["√r is like a unit. You can subtract them like 'terms with the same letter'.", "Subtract the numbers in front. The root stays the same.", "Example: 9√5 − 4√5 = 5√5. Now do yours."]);
    if (t === 2) { const s = ri(2, 6), k = ri(2, 5), u = k * k * s; let w = s; // u = k²s so sqrt(s)*sqrt(u) = k*s
      return Q(`√${s} × √${u} = ?`, k * s,
        ["Multiply under the roots: √a × √b = √(a × b). Then simplify.", `${s} × ${u} makes a perfect square. Find its square root.`, "Example: √2 × √8 = √16 = 4. Now do yours."]); }
    return Q(`(${a}√${r}) × (${c}√${r}) = ?`, a * c * r,
      ["Multiply the numbers in front, and multiply the roots.", `√${r} × √${r} = ${r}. Then multiply by the front numbers.`, "Example: (2√3) × (4√3) = 8 × 3 = 24. Now do yours."]);
  };
  const right45 = () => {
    const t = ri(0, 3), L = ri(2, 12);
    if (t === 0) return Q(`A 45°-45°-90° triangle has legs of ${L}. Its hypotenuse is ?√2. What goes in the ? spot?`, L,
      ["In a 45-45-90 triangle the hypotenuse is the leg × √2.", "So the number in front of √2 is the same as the leg.", "Example: legs 5 means hypotenuse 5√2. Now do yours."]);
    if (t === 1) return Q(`A 45°-45°-90° triangle has hypotenuse ${L}√2. How long is each leg?`, L,
      ["The hypotenuse is leg × √2, so the leg is the hypotenuse ÷ √2.", "The √2 cancels, leaving just the number in front.", "Example: hypotenuse 7√2 means legs of 7. Now do yours."]);
    if (t === 2) { const e = 2 * ri(1, 6); return Q(`A 45°-45°-90° triangle has legs of ${e}. What is its area?`, e * e / 2,
      ["The legs are the base and the height. Area = ½ × base × height.", `Both the base and the height are ${e}.`, "Example: legs of 6 give area ½ × 6 × 6 = 18. Now do yours."]); }
    return Q(`A square has a diagonal of ${L}√2. What is the length of one side?`, L,
      ["A square's diagonal cuts it into two 45-45-90 triangles.", "The diagonal is the hypotenuse, and the sides are the legs. Divide by √2.", "Example: a diagonal of 9√2 means sides of 9. Now do yours."]);
  };
  const right30 = () => {
    const t = ri(0, 4), s = ri(2, 12);
    if (t === 0) return Q(`In a 30°-60°-90° triangle the shortest side is ${s}. What is the hypotenuse?`, 2 * s,
      ["In a 30-60-90 triangle the hypotenuse is double the shortest side.", `Double ${s}.`, "Example: shortest side 5 gives hypotenuse 10. Now do yours."]);
    if (t === 1) return Q(`In a 30°-60°-90° triangle the hypotenuse is ${2 * s}. What is the shortest side?`, s,
      ["The shortest side is half the hypotenuse in a 30-60-90 triangle.", `Halve ${2 * s}.`, "Example: hypotenuse 14 gives shortest side 7. Now do yours."]);
    if (t === 2) return Q(`In a 30°-60°-90° triangle the shortest side is ${s}. The longer leg is ?√3. What goes in the ? spot?`, s,
      ["The long leg is the short side × √3.", "So the number in front of √3 is the shortest side.", "Example: short side 4 gives long leg 4√3. Now do yours."]);
    if (t === 3) return Q(`In a 30°-60°-90° triangle the longer leg is ${s}√3. How long is the shortest side?`, s,
      ["The long leg is the short side × √3, so divide by √3.", "The √3 cancels, leaving the number in front.", "Example: long leg 6√3 gives short side 6. Now do yours."]);
    return Q(`In a 30°-60°-90° triangle the longer leg is ${s}√3. What is the hypotenuse?`, 2 * s,
      ["First find the shortest side, because the long leg is short × √3.", "The hypotenuse is double the shortest side.", "Example: long leg 5√3: short side 5, hypotenuse 10. Now do yours."]);
  };
  const polySum = () => {
    const t = ri(0, 3), n = ri(3, 12);
    if (t === 0) return Q(`What is the sum of the interior angles of a polygon with ${n} sides?`, (n - 2) * 180,
      ["Cut the polygon into triangles from one corner. Each triangle has 180°.", `The number of triangles is the number of sides minus 2.`, "Example: a hexagon (6 sides) makes 4 triangles: 4 × 180 = 720°. Now do yours."]);
    if (t === 1) return Q(`The interior angles of a polygon add up to ${(n - 2) * 180}°. How many sides does it have?`, n,
      ["Divide the total by 180 to count the triangles.", "The number of sides is the number of triangles plus 2.", "Example: 540° ÷ 180 = 3 triangles, so 5 sides. Now do yours."]);
    if (t === 2) { const a = ri(60, 110), b = ri(70, 120), c = ri(80, 130);
      return Q(`A quadrilateral has angles ${a}°, ${b}° and ${c}°. What is the fourth angle?`, 360 - a - b - c,
        ["The angles of any quadrilateral add up to 360°.", "Add the three known angles and subtract from 360.", "Example: angles 90, 100, 80 add to 270, so the last is 90. Now do yours."]); }
    const a = ri(80, 130), b = ri(90, 140), c = ri(80, 130), d = ri(80, 140);
    return Q(`A pentagon has angles ${a}°, ${b}°, ${c}° and ${d}°. What is the fifth angle?`, 540 - a - b - c - d,
      ["A pentagon's angles add up to 540°.", "Add the four known angles and subtract from 540.", "Example: a pentagon with angles 100, 100, 100, 100 needs 140 more. Now do yours."]);
  };
  const regPoly = () => {
    const t = ri(0, 3), ns = [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24], n = pick(ns);
    if (t === 0) return Q(`What is each interior angle of a regular polygon with ${n} sides? (Degrees)`, (n - 2) * 180 / n,
      ["Find the total of the interior angles first, then share it equally.", `The total is (n − 2) × 180 with n = ${n}. Divide by ${n}.`, "Example: a regular hexagon: 720 ÷ 6 = 120°. Now do yours."]);
    if (t === 1) return Q(`What is each exterior angle of a regular polygon with ${n} sides? (Degrees)`, 360 / n,
      ["The exterior angles of any polygon add up to 360°.", `Share 360 equally among the ${n} corners.`, "Example: a regular pentagon: 360 ÷ 5 = 72°. Now do yours."]);
    if (t === 2) return Q(`Each exterior angle of a regular polygon is ${360 / n}°. How many sides does it have?`, n,
      ["Exterior angles of any polygon add up to 360°.", `Divide 360 by ${360 / n}.`, "Example: exterior angle 60° means 360 ÷ 60 = 6 sides. Now do yours."]);
    return Q(`Each interior angle of a regular polygon is ${(n - 2) * 180 / n}°. How many sides does it have?`, n,
      ["The exterior angle is 180° minus the interior angle. Then 360 ÷ exterior gives the sides.", `Find 180 − ${(n - 2) * 180 / n} first.`, "Example: interior 135°, exterior 45°, 360 ÷ 45 = 8 sides. Now do yours."]);
  };
  const midseg = () => {
    const t = ri(0, 4), h = ri(2, 12);
    if (t === 0) return Q(`In a triangle, a midsegment joins the midpoints of two sides. The third side is ${2 * h}. How long is the midsegment?`, h,
      ["A midsegment is parallel to the third side and half as long.", `Halve ${2 * h}.`, "Example: third side 18 gives a midsegment of 9. Now do yours."]);
    if (t === 1) return Q(`A midsegment of a triangle is ${h} long. How long is the side it is parallel to?`, 2 * h,
      ["A midsegment is half the length of the side it is parallel to.", `So that side is double the midsegment.`, "Example: midsegment 7 means the side is 14. Now do yours."]);
    if (t === 2) { const b1 = ri(2, 10), b2 = b1 + 2 * ri(1, 5);
      return Q(`A trapezoid has parallel sides ${b1} and ${b2}. How long is its midsegment?`, (b1 + b2) / 2,
        ["The midsegment of a trapezoid is the average of the two parallel sides.", "Add the two parallel sides and divide by 2.", "Example: parallel sides 4 and 10: (4 + 10) ÷ 2 = 7. Now do yours."]); }
    if (t === 3) { const a = 2 * ri(2, 8), b = 2 * ri(2, 8), c = 2 * ri(2, 8);
      return Q(`A triangle has sides ${a}, ${b} and ${c}. The three midsegments make a smaller triangle. What is its perimeter?`, (a + b + c) / 2,
        ["Each midsegment is half of one side of the big triangle.", "So the small triangle's perimeter is half the big triangle's perimeter.", "Example: sides 6, 8, 10 add to 24, so the small triangle has perimeter 12. Now do yours."]); }
    const b1 = ri(2, 10), mid = b1 + ri(2, 6);
    return Q(`A trapezoid has a midsegment of ${mid} and one parallel side of ${b1}. How long is the other parallel side?`, 2 * mid - b1,
      ["The midsegment is the average of the parallel sides, so the two sides add to double the midsegment.", `Double the midsegment, then subtract the known side.`, "Example: midsegment 8 and one side 5: 16 − 5 = 11. Now do yours."]);
  };
  const CONG = [
    ["all three sides of one triangle are equal to the three sides of the other", "SSS"],
    ["three pairs of matching sides are equal", "SSS"],
    ["two sides and the angle BETWEEN them are equal", "SAS"],
    ["two pairs of equal sides, with the equal angles sitting between those sides", "SAS"],
    ["two angles and the side BETWEEN them are equal", "ASA"],
    ["two pairs of equal angles, and the side joining the two angles is equal", "ASA"],
    ["two angles and a side NOT between them are equal", "AAS"],
    ["two pairs of equal angles, and a side that is not between those angles is equal", "AAS"],
    ["both are right triangles with equal hypotenuses and one pair of equal legs", "HL"],
    ["a right angle, equal hypotenuses, and one equal leg", "HL"],
    ["only the three angles are equal", "Not enough"],
    ["two sides and an angle that is NOT between them are equal", "Not enough"]
  ];
  const congRule = () => {
    const it = pick(CONG), ls = shuf(["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"]);
    return C(`In △${ls[0]}${ls[1]}${ls[2]} and △${ls[3]}${ls[4]}${ls[5]}, ${it[0]}. Which rule (if any) proves the triangles are congruent?`, it[1], ["SSS", "SAS", "ASA", "AAS", "HL", "Not enough"],
      ["Think about which parts match: sides (S), angles (A), and where each angle sits.", "Is the angle between the two sides, between the angles, or somewhere else? Do all the facts together fix the shape?", "Example: two sides and the angle between them gives SAS. Three equal angles only is not enough, because a bigger or smaller copy has the same angles. Now do yours."]);
  };
  const ineq2 = () => {
    const t = ri(0, 2), k = pick([1, 2, 3, -1, -2]), b = ri(-4, 6), sy = pick([">", "<", "≥", "≤"]);
    const rhs = `${lin(k, b)}`;
    if (t === 0) {
      const x = ri(-3, 5), y = ri(-6, 12), v = k * x + b;
      const ok = sy === ">" ? y > v : sy === "<" ? y < v : sy === "≥" ? y >= v : y <= v;
      return C(`Is the point ${pt(x, y)} a solution of y ${sy} ${rhs}?`, ok ? "Yes" : "No", [ok ? "No" : "Yes"],
        ["Put the point's x-value into the right side. Then compare the point's y-value with the result.", `Work out ${k}(${m(x)}) ${sgn(b)}, then check whether y ${sy} that number.`, "Example: is (2, 7) a solution of y > 2x + 1? 2(2) + 1 = 5 and 7 > 5, so it works. Now do yours."]);
    }
    if (t === 1) return C(`Should the boundary line of y ${sy} ${rhs} be solid or dashed?`, (sy === "≥" || sy === "≤") ? "Solid" : "Dashed", [(sy === "≥" || sy === "≤") ? "Dashed" : "Solid"],
      ["Look closely at the inequality sign. Does it include 'equal to'?", "If points ON the line count as solutions, the line is drawn to show that.", "Example: y ≥ x includes the line itself. y > x does not. Now do yours."]);
    const up = sy === ">" || sy === "≥";
    return C(`Which side of the line do you shade for y ${sy} ${rhs}?`, up ? "Above the line" : "Below the line", [up ? "Below the line" : "Above the line"],
      ["Think about which y-values are allowed: bigger than the line or smaller than the line.", "Bigger y-values sit higher on the graph.", "Example: y > x + 1 asks for y-values above the line, so shade above. Now do yours."]);
  };
  const SCAT = [
    ["hours spent studying and test score", "Positive"], ["a child's age and height", "Positive"], ["outdoor temperature and ice cream sales", "Positive"],
    ["height and shoe size", "Positive"], ["hours of practice and free-throws made", "Positive"],
    ["age of a car and its value", "Negative"], ["miles driven and gas left in the tank", "Negative"], ["temperature outside and sales of hot cocoa", "Negative"],
    ["height above sea level and air pressure", "Negative"], ["minutes a candle has burned and its height", "Negative"],
    ["shoe size and the day of the month someone was born", "No correlation"], ["number of letters in a name and math score", "No correlation"], ["a dice roll and the day's rainfall", "No correlation"]
  ];
  const scatter = () => {
    if (ri(0, 2) === 0) { const k = ri(2, 6), b = ri(1, 9), x = ri(3, 12);
      return Q(`A line of best fit for a scatter plot is y = ${k}x + ${b}. Predict y when x = ${x}.`, k * x + b,
        ["Use the line like a rule. Put the x-value in.", `Multiply ${k} by ${x}, then add ${b}.`, "Example: y = 3x + 2 at x = 4 predicts 3 × 4 + 2 = 14. Now do yours."]); }
    const it = pick(SCAT);
    return C(`What kind of correlation would a scatter plot of "${it[0]}" most likely show?`, it[1], ["Positive", "Negative", "No correlation"],
      ["Imagine the dots. When the first quantity goes up, what does the other tend to do?", "Both going up together is one kind of trend; one up and one down is another; no pattern at all is the third.", "Example: 'age of a puppy and its weight' rises together. 'Speed and travel time to a fixed place' moves in opposite ways. Now do yours."]);
  };

  // ================= LEVEL 21 =================
  const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29], [12, 16, 20]];
  const trigRatio = () => {
    let [a, b, c] = pick(TRI); if (ri(0, 1)) [a, b] = [b, a];
    const t = ri(0, 2), nm = ["sin", "cos", "tan"][t];
    const ans = t === 0 ? frI(a, c) : t === 1 ? frI(b, c) : frI(a, b);
    return C(`In a right triangle, the side opposite angle A is ${a}, the side next to A (adjacent) is ${b}, and the hypotenuse is ${c}. What is ${nm} A?`, ans, [frI(a, c), frI(b, c), frI(a, b), frI(b, a), frI(c, a)],
      ["Remember SOH-CAH-TOA: each trig ratio is one side divided by another side.", `For ${nm}, which two sides go on top and bottom? Then reduce the fraction if you can.`, "Example: opposite 5, adjacent 12, hypotenuse 13: sin = 5/13, cos = 12/13, tan = 5/12. Now do yours."]);
  };
  const trigSpecial = () => {
    const t = ri(0, 3), h = 2 * ri(2, 14);
    if (t === 0) return Q(`sin 30° = 1/2. A ramp is ${h} m long and rises at 30°. How high does it go?`, h / 2,
      ["sin = opposite ÷ hypotenuse, so opposite = hypotenuse × sin.", `Multiply ${h} by 1/2.`, "Example: a 20 m ramp at 30° rises 20 × 1/2 = 10 m. Now do yours."]);
    if (t === 1) return Q(`sin 30° = 1/2. A kite string makes a 30° angle with the ground and the kite is ${h / 2} m high. How long is the string?`, h,
      ["sin = opposite ÷ hypotenuse. The height is the opposite side.", `So ${h / 2} = hypotenuse × 1/2. Undo the × 1/2.`, "Example: height 6 m at 30°: string = 6 ÷ 1/2 = 12 m. Now do yours."]);
    if (t === 2) { const a = ri(3, 30); return Q(`tan 45° = 1. A ladder leans at 45° and its foot is ${a} m from the wall. How high up the wall does it reach?`, a,
      ["tan = opposite ÷ adjacent. Here opposite is the height, adjacent is the distance from the wall.", "Since tan 45° = 1, the height equals the distance from the wall.", "Example: foot 8 m from the wall at 45° means 8 m high. Now do yours."]); }
    return Q(`cos 60° = 1/2. A rope of ${h} m makes a 60° angle with the ground. How far along the ground does it reach (the adjacent side)?`, h / 2,
      ["cos = adjacent ÷ hypotenuse, so adjacent = hypotenuse × cos.", `Multiply ${h} by 1/2.`, "Example: a 16 m rope at 60° reaches 16 × 1/2 = 8 m. Now do yours."]);
  };
  const trigComp = () => {
    const t = ri(0, 3), x = ri(10, 80);
    if (t === 0) return Q(`sin ${x}° = cos ?°. What number goes in the ? spot?`, 90 - x,
      ["The sine of an angle equals the cosine of its complement.", "Complementary angles add up to 90°.", "Example: sin 20° = cos 70°, because 20 + 70 = 90. Now do yours."]);
    if (t === 1) return Q(`cos ${x}° = sin ?°. What number goes in the ? spot?`, 90 - x,
      ["The cosine of an angle equals the sine of its complement.", "Complementary angles add up to 90°.", "Example: cos 35° = sin 55°, because 35 + 55 = 90. Now do yours."]);
    if (t === 2) return Q(`In a right triangle, angle A is ${x}° and sin A = cos B. What is angle B?`, 90 - x,
      ["The two sharp angles of a right triangle add up to 90°.", `Subtract ${x} from 90.`, "Example: if A = 40°, then B = 50°, and sin 40° = cos 50°. Now do yours."]);
    for (let i = 0; i < 60; i++) {
      const a = ri(1, 3), b = ri(1, 3), xx = ri(5, 20), c = 90 - (a + b) * xx;
      if (c >= 0 && c <= 40) return Q(`If sin(${a === 1 ? "" : a}x°) = cos(${b === 1 ? "" : b}x° + ${c}°), what is x?`, xx,
        ["When sin of one angle equals cos of another, the two angles add up to 90°.", `Write ${a === 1 ? "" : a}x + ${b === 1 ? "" : b}x + ${c} = 90 and solve.`, "Example: sin(x) = cos(2x) gives 3x = 90, so x = 30. Now do yours."]);
    }
    return Q("If sin(x°) = cos(2x°), what is x?", 30, ["The two angles add to 90°.", "x + 2x = 90.", "Example: sin(x) = cos(3x) gives 4x = 90. Now do yours."]);
  };
  const arcCentral = () => {
    const t = ri(0, 3), ns = [3, 4, 5, 6, 8, 9, 10, 12], n = pick(ns);
    if (t === 0) { const a = ri(20, 170); return Q(`A central angle measures ${a}°. How many degrees is the arc it cuts off?`, a,
      ["A central angle has its point at the center of the circle.", "An arc has the same measure as its central angle.", "Example: a central angle of 65° cuts an arc of 65°. Now do yours."]); }
    if (t === 1) return Q(`An arc is exactly 1/${n} of a circle. How many degrees is the arc?`, 360 / n,
      ["A full circle is 360°.", `Divide 360 by ${n}.`, "Example: 1/8 of a circle is 360 ÷ 8 = 45°. Now do yours."]);
    if (t === 2) { const a = ri(30, 300); return Q(`A circle is split into two arcs. One arc is ${a}°. How many degrees is the other arc?`, 360 - a,
      ["The two arcs together make the whole circle.", "Subtract from 360.", "Example: if one arc is 100°, the other is 260°. Now do yours."]); }
    const a = ri(40, 120), b = ri(40, 120);
    return Q(`Three arcs fill a circle: arc AB = ${a}°, arc BC = ${b}°, and arc CA. How many degrees is arc CA?`, 360 - a - b,
      ["All the arcs of a circle add to 360°.", "Add the two known arcs and subtract from 360.", "Example: arcs 90 and 130 leave 140. Now do yours."]);
  };
  const inscribed = () => {
    const t = ri(0, 3), a = ri(10, 85);
    if (t === 0) return Q(`An arc measures ${2 * a}°. What is the inscribed angle that cuts off this arc?`, a,
      ["An inscribed angle has its point ON the circle. It is half of its arc.", `Halve ${2 * a}.`, "Example: an arc of 80° has an inscribed angle of 40°. Now do yours."]);
    if (t === 1) return Q(`An inscribed angle measures ${a}°. How many degrees is its arc?`, 2 * a,
      ["An inscribed angle is half of the arc it cuts off.", "So the arc is double the angle.", "Example: an inscribed angle of 35° cuts an arc of 70°. Now do yours."]);
    if (t === 2) return Q(`AB is a diameter of a circle and C is another point on the circle. How many degrees is angle ACB?`, 90,
      ["A diameter cuts the circle into two halves. How many degrees is half a circle?", "The inscribed angle is half of the arc it sees.", "Example: an arc of 120° gives an angle of 60°. A half-circle arc gives an angle of half of that. Now do yours."]);
    return Q(`ABCD is inscribed in a circle (it is a cyclic quadrilateral). Angle A is ${a + 50}°. What is the opposite angle C?`, 180 - a - 50,
      ["Opposite angles of a cyclic quadrilateral add up to 180°.", "Subtract the known angle from 180.", "Example: if angle A = 100°, then angle C = 80°. Now do yours."]);
  };
  const arcLen = () => {
    for (let i = 0; i < 80; i++) {
      const r = ri(3, 18), th = pick([30, 45, 60, 90, 120, 180, 270]);
      if ((2 * r * th) % 360 === 0) return Q(`A circle has radius ${r} cm. An arc covers ${th}° of it. The arc length is ?π cm. What number goes in the ? spot?`, 2 * r * th / 360,
        [`The arc is ${th}/360 of the whole circumference.`, `Circumference = 2πr = 2 × ${r} × π. Multiply that by ${th}/360, and keep the π.`, "Example: r = 6 and 60°. Circumference is 12π, and 60/360 = 1/6, so the arc is 2π. Now do yours."]);
    }
    return Q("A circle has radius 6 cm. An arc covers 60° of it. The arc length is ?π cm.", 2, ["The arc is 60/360 of the circumference.", "Circumference = 12π.", "Example: r = 3 at 120° gives 2π. Now do yours."]);
  };
  const sector = () => {
    for (let i = 0; i < 80; i++) {
      const r = ri(2, 18), th = pick([30, 45, 60, 90, 120, 180, 270]);
      if ((r * r * th) % 360 === 0) return Q(`A sector of a circle has radius ${r} cm and angle ${th}°. Its area is ?π cm². What number goes in the ? spot?`, r * r * th / 360,
        [`The sector is ${th}/360 of the whole circle's area.`, `The circle's area is π × ${r} × ${r}. Multiply by ${th}/360 and keep the π.`, "Example: r = 6 and 60°. Area of the circle is 36π, and 1/6 of it is 6π. Now do yours."]);
    }
    return Q("A sector has radius 6 cm and angle 60°. Its area is ?π cm².", 6, ["The sector is 60/360 of the circle.", "The circle's area is 36π.", "Example: r = 4 at 90° gives 4π. Now do yours."]);
  };
  const TAN3 = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25], [10, 24, 26], [15, 20, 25]];
  const tangent = () => {
    const [r, tl, d] = pick(TAN3), t = ri(0, 3);
    const base = "A tangent line is perpendicular to the radius at the point where it touches the circle, which makes a right triangle.";
    if (t === 0) return Q(`A point is ${d} cm from the center of a circle with radius ${r} cm. How long is the tangent segment from the point to the circle?`, tl,
      [base, `The radius and the tangent are the legs. The distance to the center is the hypotenuse (${d}).`, "Example: radius 5 and distance 13 give a tangent of √(169 − 25) = 12. Now do yours."]);
    if (t === 1) return Q(`A circle has radius ${r} cm. A tangent segment from an outside point is ${tl} cm long. How far is the point from the center?`, d,
      [base, "The radius and the tangent are the two legs. The distance to the center is the hypotenuse.", "Example: radius 3 and tangent 4 give √(9 + 16) = 5. Now do yours."]);
    if (t === 2) return Q(`A tangent segment is ${tl} cm and the outside point is ${d} cm from the center. What is the radius?`, r,
      [base, "The distance to the center is the hypotenuse. Find the missing leg.", "Example: tangent 12 and distance 13 give √(169 − 144) = 5. Now do yours."]);
    const x = ri(4, 20);
    return Q(`Two tangent segments are drawn to a circle from the same outside point. One is ${x} cm long. How long is the other?`, x,
      ["Tangent segments from the same outside point are equal in length.", "Think of the kite shape they make with the two radii.", "Example: if one tangent segment is 9 cm, the other is 9 cm too. Now do yours."]);
  };
  const circleEq = () => {
    const t = ri(0, 4), h = nz0(-6, 6), k = nz0(-6, 6), r = ri(2, 9);
    const eq = `${sb("x", h)}² + ${sb("y", k)}² = ${r * r}`;
    if (t === 0) return Q(`A circle has the equation ${eq}. What is its radius?`, r,
      ["The equation of a circle is (x − h)² + (y − k)² = r². The number on the right is r².", `Take the square root of ${r * r}.`, "Example: (x − 1)² + (y − 2)² = 49 has radius 7. Now do yours."]);
    if (t === 1) return N(`What is the x-coordinate of the center of ${eq}?`, h,
      ["The center is (h, k) in (x − h)² + (y − k)² = r².", "Careful: (x + 3) means h = −3, because x − (−3) = x + 3.", "Example: (x − 4)² + (y + 1)² = 9 has center (4, −1). Now do yours."]);
    if (t === 2) return N(`What is the y-coordinate of the center of ${eq}?`, k,
      ["The center is (h, k) in (x − h)² + (y − k)² = r².", "Careful: (y + 3) means k = −3, because y − (−3) = y + 3.", "Example: (x − 4)² + (y + 1)² = 9 has center (4, −1). Now do yours."]);
    if (t === 3) return Q(`The circle x² + y² = ${r * r} is centered at the origin. What is its radius?`, r,
      ["With center (0, 0) the equation is x² + y² = r².", "The number on the right is r², so take its square root.", "Example: x² + y² = 36 has radius 6. Now do yours."]);
    const trip = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]), on = ri(0, 1) === 0, a = trip[0], b = on ? trip[1] : trip[1] + ri(1, 2);
    return C(`Is the point ${pt(h + a, k + b)} on the circle ${sb("x", h)}² + ${sb("y", k)}² = ${trip[2] * trip[2]}?`, on ? "Yes" : "No", [on ? "No" : "Yes"],
      ["Put the point's x and y into the left side. Does it equal the number on the right?", `Work out (x − h) and (y − k) separately, square them, and add.`, "Example: is (4, 3) on x² + y² = 25? 16 + 9 = 25, so yes. Now do yours."]);
  };
  const chords = () => {
    const t = ri(0, 1);
    if (t === 0) {
      const p = pick([12, 16, 18, 20, 24, 30, 36]), divs = []; for (let i = 2; i < p; i++) if (p % i === 0) divs.push(i);
      const a = pick(divs), c = pick(divs), b = p / a, d = p / c;
      return Q(`Two chords cross inside a circle. One is cut into pieces ${a} and ${b}. The other is cut into pieces ${c} and ?. What is the missing length?`, d,
        ["When two chords cross, the products of the pieces on each chord are equal.", `Multiply ${a} × ${b}. Then divide that by ${c}.`, "Example: pieces 3 and 8 on one chord, and 4 and ? on the other: 24 ÷ 4 = 6. Now do yours."]);
    }
    const S = pick([[2, 8, 4], [3, 12, 6], [4, 9, 6], [2, 18, 6], [5, 20, 10], [1, 16, 4], [3, 27, 9], [4, 25, 10]]);
    return Q(`From an outside point, a tangent touches a circle and a secant passes through it. The outside part of the secant is ${S[0]} and the whole secant is ${S[1]}. How long is the tangent?`, S[2],
      ["For a tangent and a secant: tangent² = (outside part) × (whole secant).", `Multiply ${S[0]} × ${S[1]}, then take the square root.`, "Example: outside part 3, whole secant 12: 36, so the tangent is 6. Now do yours."]);
  };
  const discr = () => {
    const t = ri(0, 1);
    if (t === 0) { const a = ri(1, 5), b = nz0(-9, 9), c = nz0(-6, 9);
      return N(`For ${poly(a, b, c)} = 0, what is the discriminant b² − 4ac?`, b * b - 4 * a * c,
        [`Read off a, b and c from the equation: a = ${a}, b = ${b}, c = ${c}. Keep the signs.`, "Square b first, then subtract 4 times a times c. Careful if c is negative.", "Example: x² − 6x + 5: b² = 36, 4ac = 20, so 36 − 20 = 16. Now do yours."]); }
    const want = ri(0, 2); let a, b, c, D;
    for (let i = 0; i < 400; i++) { a = ri(1, 4); b = nz0(-8, 8); c = nz0(-7, 7); D = b * b - 4 * a * c; if ((want === 0 && D < 0) || (want === 1 && D === 0) || (want === 2 && D > 0)) break; }
    return C(`How many real solutions does ${poly(a, b, c)} = 0 have?`, String(D > 0 ? 2 : D === 0 ? 1 : 0), ["0", "1", "2"],
      ["Work out the discriminant b² − 4ac. Its sign tells you how many real solutions there are.", "Positive: two solutions. Zero: one. Negative: none. Compute it for your equation.", "Example: x² + 2x + 5 has 4 − 20 = −16, a negative discriminant. x² − 4x + 4 has 16 − 16 = 0. Now do yours."]);
  };
  const quadForm = () => {
    const t = ri(0, 3), a = pick([1, 1, 2, 3]); let r1 = ri(1, 8), r2; do { r2 = ri(1, 8); } while (r2 === r1);
    const lo = Math.min(r1, r2), hi = Math.max(r1, r2), b = -a * (r1 + r2), c = a * r1 * r2, eq = `${poly(a, b, c)} = 0`;
    const f = `The quadratic formula is x = (−b ± √(b² − 4ac)) ÷ 2a.`;
    if (t === 0) return Q(`Use the quadratic formula to solve ${eq}. What is the LARGER solution?`, hi,
      [f, `Here a = ${a}, b = ${b}, c = ${c}. Work out b² − 4ac first and take its square root.`, "Example: x² − 7x + 12 = 0: √(49 − 48) = 1, so x = (7 ± 1) ÷ 2 = 4 or 3. Now do yours."]);
    if (t === 1) return Q(`Use the quadratic formula to solve ${eq}. What is the SMALLER solution?`, lo,
      [f, `Here a = ${a}, b = ${b}, c = ${c}. Work out b² − 4ac first and take its square root.`, "Example: x² − 8x + 12 = 0: √(64 − 48) = 4, so x = (8 ± 4) ÷ 2 = 6 or 2. Now do yours."]);
    if (t === 2) return Q(`For ${eq}, what is the value of √(b² − 4ac) in the quadratic formula?`, a * (hi - lo),
      [f, `Here a = ${a}, b = ${b}, c = ${c}. Find b² and 4ac, subtract, then take the square root.`, "Example: x² − 7x + 10 = 0: 49 − 40 = 9, √9 = 3. Now do yours."]);
    return N(`Use the quadratic formula to solve ${poly(a, -b, c)} = 0. What is the LARGER solution?`, -lo,
      [f, `Here a = ${a}, b = ${-b}, c = ${c}. Remember −b changes the sign of b.`, "Example: x² + 7x + 12 = 0: √(49 − 48) = 1, x = (−7 ± 1) ÷ 2 = −3 or −4. The larger is −3. Now do yours."]);
  };
  const complSq = () => {
    const t = ri(0, 3), p = ri(1, 9);
    if (t === 0) return Q(`What number completes the square? x² + ${2 * p}x + ? = (x + ${p})²`, p * p,
      ["Take half of the middle number, then square it.", `Half of ${2 * p} is ${p}.`, "Example: x² + 10x + ? needs (10 ÷ 2)² = 25. Now do yours."]);
    if (t === 1) return Q(`What number completes the square? x² − ${2 * p}x + ? = (x − ${p})²`, p * p,
      ["Take half of the middle number, then square it. A negative middle number still gives a positive result.", `Half of ${2 * p} is ${p}.`, "Example: x² − 12x + ? needs (12 ÷ 2)² = 36. Now do yours."]);
    if (t === 2) { const c = ri(1, 20); return Q(`To solve x² + ${2 * p}x = ${c} by completing the square, you add ${p * p} to both sides. What is the number on the right side after adding?`, c + p * p,
      ["Add the same number to BOTH sides to keep the equation balanced.", `The right side was ${c}. Add ${p * p} to it.`, "Example: x² + 6x = 7. Add 9 to both sides: right side becomes 16. Now do yours."]); }
    const k = ri(p + 1, p + 8), c = k * k - p * p;
    return Q(`Solve x² + ${2 * p}x = ${c} by completing the square. What is the positive solution?`, k - p,
      [`Add ${p * p} to both sides, so the left side is a perfect square.`, `The left side becomes (x + ${p})² and the right side is ${c + p * p}. Take the square root.`, "Example: x² + 4x = 5 gives (x + 2)² = 9, x + 2 = 3, x = 1. Now do yours."]);
  };
  const vertConv = () => {
    const t = ri(0, 2), h = nz0(-5, 6), k = nz0(-9, 9), b = -2 * h, c = h * h + k, eq = `y = ${poly(1, b, c)}`;
    if (t === 0) return N(`Write ${eq} as y = (x − h)² + k. What is h?`, h,
      ["Complete the square: take half of the x coefficient. That is −h.", `Half of ${b} is ${-h}, so the bracket is (x ${h < 0 ? "+" : "−"} ${Math.abs(h)}).`, "Example: y = x² − 6x + 5: half of −6 is −3, so (x − 3)² and h = 3. Now do yours."]);
    if (t === 1) return N(`Write ${eq} as y = (x − h)² + k. What is k?`, k,
      ["Complete the square first. Then k is whatever is left over.", `Subtract h² (the square of half of ${b}) from the constant ${c}.`, "Example: y = x² − 6x + 5: (x − 3)² = x² − 6x + 9, so k = 5 − 9 = −4. Now do yours."]);
    return C(`What is the vertex of ${eq}?`, pt(h, k), [pt(-h, k), pt(h, -k), pt(k, h)],
      ["Complete the square to get y = (x − h)² + k. The vertex is (h, k).", "h is the x-value of the axis of symmetry: half of the x coefficient, with the sign flipped. Find k by putting h back in.", "Example: y = x² − 6x + 5 has axis x = 3 and y = 9 − 18 + 5 = −4, so the vertex is (3, −4). Now do yours."]);
  };
  const factorA = () => {
    const t = ri(0, 1);
    if (t === 0) { const p = ri(2, 5), q = ri(1, 7), s = ri(1, 7);
      return Q(`${poly(p, p * s + q, q * s)} = (${p}x + ${q})(x + ?)`, s,
        [`The constant ${q * s} is ${q} × (the missing number).`, `Divide ${q * s} by ${q}. Then check the middle term with Outer + Inner.`, "Example: 2x² + 11x + 12 = (2x + 3)(x + ?). 12 ÷ 3 = 4, check: 2 × 4 + 3 = 11 ✓. Now do yours."]); }
    let p = ri(2, 4), r = ri(2, 4); while (p === r) r = ri(2, 4);
    const q = ri(1, 6), s = ri(1, 6);
    return Q(`${poly(p * r, p * s + r * q, q * s)} = (${p}x + ${q})(${r}x + ?)`, s,
      [`The constant ${q * s} is ${q} × (the missing number).`, `Divide ${q * s} by ${q}. Then check that ${p} × (your number) + ${r} × ${q} gives the middle term.`, "Example: 6x² + 19x + 15 = (2x + 3)(3x + ?). 15 ÷ 3 = 5, check: 2 × 5 + 3 × 3 = 19 ✓. Now do yours."]);
  };
  const rational = () => {
    const t = ri(0, 3), p = ri(1, 8), q = ri(1, 8), k = ri(1, 9);
    if (t === 0) return Q(`Simplify (x² + ${p + q}x + ${p * q}) ÷ (x + ${p}), then find its value when x = ${k}.`, k + q,
      ["Factor the top, then cancel the matching bracket with the bottom.", `The top is (x + ${p})(x + ${q}). What is left after cancelling?`, "Example: (x² + 5x + 6) ÷ (x + 2) = x + 3. At x = 4 that is 7. Now do yours."]);
    if (t === 1) { const e = p + ri(1, 5); return Q(`Simplify (x² − ${e * e}) ÷ (x − ${e}), then find its value when x = ${k}.`, k + e,
      ["The top is a difference of squares: x² − e² = (x + e)(x − e).", `Cancel (x − ${e}) from the top and bottom.`, "Example: (x² − 16) ÷ (x − 4) = x + 4. At x = 3 that is 7. Now do yours."]); }
    if (t === 2) { const a = ri(2, 5); return Q(`Simplify (${a}x + ${a * p}) ÷ (x + ${p}), then find its value.`, a,
      ["Factor out the common number on top.", `The top is ${a}(x + ${p}). Cancel with the bottom.`, "Example: (4x + 12) ÷ (x + 3) = 4(x + 3) ÷ (x + 3) = 4. Now do yours."]); }
    return Q(`For (x + 4) ÷ (x − ${p}), which value of x is NOT allowed?`, p,
      ["You can't divide by zero. Find when the bottom is 0.", `Solve x − ${p} = 0.`, "Example: (x + 1) ÷ (x − 9) can't use x = 9. Now do yours."]);
  };
  const permu = () => {
    const t = ri(0, 3), n = ri(4, 9);
    if (t === 0) return Q(`${n} runners race. How many different ways can gold, silver and bronze be given out?`, permN(n, 3),
      ["Order matters: gold-silver-bronze is different from silver-gold-bronze.", `${n} choices for gold, then one fewer for silver, then one fewer again for bronze. Multiply.`, "Example: 5 runners: 5 × 4 × 3 = 60 ways. Now do yours."]);
    if (t === 1) { const k = ri(4, 7); return Q(`In how many different orders can ${k} books be lined up on a shelf?`, fact(k),
      ["Every book can go in any open spot, so the choices shrink by one each time.", `Multiply ${k} × ${k - 1} × … × 1.`, "Example: 4 books: 4 × 3 × 2 × 1 = 24. Now do yours."]); }
    if (t === 2) return Q(`A club of ${n} students picks a president and a secretary (different students). How many ways can they be chosen?`, permN(n, 2),
      ["Order matters because the two jobs are different.", `${n} choices for president, then one fewer for secretary.`, "Example: 6 students: 6 × 5 = 30 ways. Now do yours."]);
    return Q(`${n}P3 means the number of ways to arrange 3 things chosen from ${n}. What is ${n}P3?`, permN(n, 3),
      [`${n}P3 = ${n} × (${n} − 1) × (${n} − 2). Multiply the first three numbers counting down.`, `Start at ${n}, then ${n - 1}, then ${n - 2}.`, "Example: 6P2 = 6 × 5 = 30. Now do yours."]);
  };
  const combi = () => {
    const t = ri(0, 3), n = ri(4, 9);
    if (t === 0) return Q(`A teacher picks 2 helpers from a group of ${n} students. Order doesn't matter. How many different pairs are possible?`, combN(n, 2),
      ["Picking A then B is the same pair as B then A. So divide the 'ordered' count by the repeats.", `Ordered ways: ${n} × ${n - 1}. Each pair is counted twice, so divide by 2.`, "Example: 5 students, pairs: 5 × 4 ÷ 2 = 10. Now do yours."]);
    if (t === 1) return Q(`${n}C3 means the number of ways to choose 3 things from ${n}. What is ${n}C3?`, combN(n, 3),
      [`Find ${n} × ${n - 1} × ${n - 2} first. Each group of 3 is counted 3 × 2 × 1 times.`, `Divide by 6.`, "Example: 5C3 = 5 × 4 × 3 ÷ 6 = 10. Now do yours."]);
    if (t === 2) return Q(`A coach chooses a team of 3 players from ${n}. Order doesn't matter. How many different teams can there be?`, combN(n, 3),
      ["The same 3 players in any order make one team.", `Start with ${n} × ${n - 1} × ${n - 2}, then divide by the 6 ways to order 3 players.`, "Example: 6 players, team of 3: 6 × 5 × 4 ÷ 6 = 20. Now do yours."]);
    const sc = pick([["picking 3 flavors of ice cream for a cone, in order from bottom to top", "Permutation"], ["choosing 3 friends to invite to a party", "Combination"], ["awarding 1st, 2nd and 3rd prizes", "Permutation"], ["choosing 4 books to take on a trip", "Combination"], ["setting a 4-digit code with different digits", "Permutation"], ["dealing a hand of 5 cards", "Combination"]]);
    return C(`Is ${sc[0]} a permutation (order matters) or a combination (order doesn't matter)?`, sc[1], ["Permutation", "Combination"],
      ["Ask yourself: if the same things are chosen in a different order, is it a different result?", "If swapping the order gives a new result, order matters.", "Example: picking a captain and a co-captain matters in order. Picking two teammates does not. Now do yours."]);
  };

  // ================= LESSON TABLES =================
  const l19 = [
    L("Domain and range", domRange, [S("Inputs and outputs", "➡️", "The domain is all the inputs (first numbers). The range is all the outputs (second numbers)."), S("Is it a function?", "1 in → 1 out", "Each input must have only ONE output."), S("Count carefully", "repeats once", "A number that repeats is listed only once in the domain or range.")]),
    L("Putting functions together", compose, [S("f of g of x", "f(g(x))", "Work from the inside out: do g first, then put the result into f."), S("Example", "f(x) = x + 2, g(x) = 3x", "f(g(1)): g(1) = 3, then f(3) = 5."), S("Order matters", "f(g) ≠ g(f)", "Doing f first and g second can give a different answer.")]),
    L("Arithmetic sequences", arithTerm, [S("Add the same", "5, 8, 11, 14", "An arithmetic sequence goes up (or down) by the same amount each time: the common difference d."), S("The rule", "aₙ = a₁ + (n − 1)d", "To reach term n, you add d exactly (n − 1) times."), S("Example", "5, 8, 11 …", "d = 3. The 10th term is 5 + 9 × 3 = 32.")]),
    L("Adding up a sequence", arithSum, [S("Gauss's trick", "1 + 2 + … + 10", "Pair the first with the last: each pair adds to 11. There are 5 pairs, so 55."), S("The rule", "n ÷ 2 × (first + last)", "Works for any arithmetic series."), S("Odd numbers", "1 + 3 + 5 = 9", "The first n odd numbers add up to n × n.")]),
    L("Geometric sequences", geomTerm, [S("Multiply by the same", "2, 6, 18, 54", "A geometric sequence multiplies by the same number each time: the common ratio r."), S("The rule", "aₙ = a₁ × rⁿ⁻¹", "Multiply the first term by r exactly (n − 1) times."), S("Find r", "term ÷ previous term", "6 ÷ 2 = 3, and 18 ÷ 6 = 3.")]),
    L("Point-slope form", pointSlope, [S("A line from a point", "y − y₁ = m(x − x₁)", "If you know one point and the slope, you can write the line right away."), S("Example", "(2, 5), slope 3", "y − 5 = 3(x − 2)."), S("Watch the signs", "x − (−4) = x + 4", "Subtracting a negative turns into adding.")]),
    L("Standard form and intercepts", stdIntercepts, [S("Standard form", "Ax + By = C", "A line can be written with x and y on the same side."), S("x-intercept", "set y = 0", "Where the line crosses the x-axis, y is 0."), S("y-intercept", "set x = 0", "Where the line crosses the y-axis, x is 0.")]),
    L("Parallel and perpendicular lines", parPerp, [S("Parallel", "same slope", "Parallel lines never meet, so they have the same slope."), S("Perpendicular", "slopes multiply to −1", "Flip the fraction and change the sign: 2/3 becomes −3/2."), S("Check", "2/3 × −3/2 = −1 ✓", "Multiply to check.")]),
    L("Solving for a letter", literal, [S("Formulas are equations", "A = l × w", "You can rearrange them to get any letter alone."), S("Undo steps", "inverse operations", "Undo what's done to the letter, one step at a time, in reverse order."), S("Example", "A = l × w → w = A ÷ l", "w is multiplied by l, so divide both sides by l.")]),
    L("Absolute value equations", absEq, [S("Distance from zero", "|5| = |−5| = 5", "Absolute value is a distance, so it is never negative."), S("Two solutions", "|x − 3| = 2", "x − 3 = 2 or x − 3 = −2, so x = 5 or x = 1."), S("No solution?", "|x| = −4", "A distance can't be negative, so there are no solutions.")]),
    L("Compound inequalities", compoundIneq, [S("AND", "2 < x ≤ 6", "x must be in both parts at once: between the numbers."), S("OR", "x < 2 or x > 6", "x only needs to fit one of the parts: outside the middle."), S("Open or closed", "< vs ≤", "< leaves out the end number. ≤ keeps it.")]),
    L("Absolute value inequalities", absIneq, [S("Within a distance", "|x| < 3", "x is less than 3 steps from zero: −3 < x < 3."), S("Around a center", "|x − 5| ≤ 2", "x is within 2 of 5: 3 ≤ x ≤ 7."), S("Count the integers", "−2, −1, 0, 1, 2", "Count both sides and the center.")]),
    L("Systems in stories", sysWord, [S("Two unknowns", "a + c = 5", "Name what you don't know. Then write one equation for each fact."), S("Count and money", "3a + c = 11", "One equation counts items, the other adds up cost."), S("Solve", "subtract or substitute", "Use elimination or substitution to find both numbers.")]),
    L("How many solutions?", sysClass, [S("Different slopes", "cross once", "Two lines with different slopes meet at exactly one point."), S("Same slope, different start", "never meet", "Parallel lines have no solution."), S("Same line", "all points", "If both equations are really the same line, there are infinitely many solutions.")]),
    L("Adding and subtracting polynomials", polyAdd, [S("Like terms", "x² with x²", "Only add or subtract terms with the same letter and power."), S("Subtracting", "flip every sign", "Subtracting a bracket changes the sign of every term inside it."), S("Example", "(3x + 2) − (x + 5)", "= 3x + 2 − x − 5 = 2x − 3.")]),
    L("Multiplying binomials (FOIL)", foil, [S("FOIL", "F O I L", "First, Outer, Inner, Last: multiply each pair."), S("Example", "(x + 2)(x + 3)", "x² + 3x + 2x + 6 = x² + 5x + 6."), S("Combine", "3x + 2x = 5x", "Add the Outer and Inner terms together.")]),
    L("Factoring x² + bx + c", factorTri, [S("Backwards FOIL", "x² + 5x + 6", "Find two numbers that multiply to the last number and add to the middle number."), S("Example", "2 × 3 = 6, 2 + 3 = 5", "So x² + 5x + 6 = (x + 2)(x + 3)."), S("Negatives", "x² − 7x + 12", "Both numbers are negative: (x − 3)(x − 4).")]),
    L("Special products", special, [S("Difference of squares", "a² − b² = (a + b)(a − b)", "The middle terms cancel out."), S("Perfect square", "(x + k)² = x² + 2kx + k²", "The middle term is double k."), S("Example", "x² − 49", "= (x + 7)(x − 7).")])
  ];
  l19.push(mixOf("Mixed practice", [l19[0], l19[2], l19[5], l19[6], l19[9], l19[12], l19[15]]));
  l19.push(mixOf("Level 19 Challenge", [l19[1], l19[3], l19[4], l19[7], l19[8], l19[10], l19[11], l19[13], l19[14], l19[16], l19[17]]));

  const l20 = [
    L("Zero product property", zeroProd, [S("Multiply to zero", "A × B = 0", "If two numbers multiply to 0, at least one of them is 0."), S("Solve", "(x − 2)(x − 7) = 0", "Set each bracket to 0: x = 2 or x = 7."), S("Careful", "(x + 4) = 0", "x + 4 = 0 gives x = −4.")]),
    L("Solving quadratics by factoring", solveFactor, [S("Step 1", "= 0", "Move everything to one side so it equals 0."), S("Step 2", "factor", "x² − 7x + 12 = (x − 3)(x − 4)."), S("Step 3", "zero product", "x = 3 or x = 4.")]),
    L("The square root method", sqrtMethod, [S("Undo the square", "x² = 25", "Take the square root of both sides."), S("Two answers", "x = 5 or −5", "Both 5 × 5 and (−5) × (−5) equal 25."), S("Brackets", "(x − 3)² = 16", "x − 3 = 4 or −4, so x = 7 or −1.")]),
    L("Axis of symmetry", axisSym, [S("Mirror line", "🪞", "A parabola is the same on both sides of its axis of symmetry."), S("The formula", "x = −b ÷ 2a", "For y = ax² + bx + c."), S("y-intercept", "c", "Put x = 0 in and only c is left.")]),
    L("Vertex form", vertexForm, [S("The form", "y = a(x − h)² + k", "The vertex is the point (h, k)."), S("Signs", "(x + 3) → h = −3", "The sign inside the bracket flips."), S("Opens", "a > 0 up, a < 0 down", "Up means a lowest point. Down means a highest point.")]),
    L("Exponential growth", expGrow, [S("Multiply again and again", "2, 4, 8, 16", "Exponential growth multiplies by the same number each step."), S("The rule", "y = a × bˣ", "a is the start. b is the multiplier."), S("Example", "3 × 2⁴", "= 3 × 16 = 48.")]),
    L("Exponential decay", expDecay, [S("Shrinking by a factor", "80, 40, 20, 10", "Each step multiplies by a fraction between 0 and 1."), S("Percent decay", "lose 20%", "Losing 20% means you keep 80%: multiply by 0.8."), S("Do it stepwise", "one year at a time", "Each year uses the new amount.")]),
    L("Percent growth and decay", growthDecay, [S("Base bigger than 1", "growth", "A base like 1.5 makes things climb."), S("Base between 0 and 1", "decay", "A base like 0.5 makes things shrink."), S("Percent", "+10% → × 1.1", "Add the percent to 100% and write it as a decimal.")]),
    L("Simplifying radicals", simpRad, [S("Pull out squares", "√50 = √(25 × 2)", "Find a perfect square that divides the number."), S("Result", "= 5√2", "The square root of the perfect square comes out front."), S("Why", "√(a × b) = √a × √b", "You can split a root over a product.")]),
    L("Radical operations", radOps, [S("Add like roots", "4√3 + 2√3 = 6√3", "The roots must match. Add the numbers in front."), S("Multiply", "√2 × √8 = √16 = 4", "Multiply under the roots, then simplify."), S("Same root twice", "√3 × √3 = 3", "A root times itself gives the number inside.")]),
    L("45°-45°-90° triangles", right45, [S("Two equal legs", "📐", "A triangle with two 45° angles is isosceles."), S("The rule", "hypotenuse = leg × √2", "Both legs are the same length."), S("Squares", "diagonal = side × √2", "A square's diagonal cuts it into two 45-45-90 triangles.")]),
    L("30°-60°-90° triangles", right30, [S("The sides", "1 : √3 : 2", "Short side : long leg : hypotenuse."), S("Short side", "s", "The hypotenuse is 2s and the long leg is s√3."), S("Example", "s = 5", "Hypotenuse 10 and long leg 5√3.")]),
    L("Angles in polygons", polySum, [S("Triangles inside", "🔺", "Cut a polygon from one corner into triangles."), S("The rule", "(n − 2) × 180°", "n is the number of sides."), S("Example", "hexagon: 4 × 180 = 720°", "A hexagon makes 4 triangles.")]),
    L("Regular polygons", regPoly, [S("All equal", "⬡", "A regular polygon has equal sides and equal angles."), S("Interior angle", "(n − 2) × 180 ÷ n", "Share the total equally."), S("Exterior angle", "360 ÷ n", "The exterior angles of any polygon add up to 360°.")]),
    L("Midsegments", midseg, [S("Triangle midsegment", "halfway across", "It joins the midpoints of two sides. It is parallel to the third side and half as long."), S("Trapezoid midsegment", "the average", "Add the two parallel sides and divide by 2."), S("Perimeters", "half size", "The midsegment triangle has half the perimeter of the big triangle.")]),
    L("Proving triangles congruent", congRule, [S("Congruent", "same shape and size", "Matching sides and angles are equal."), S("The shortcuts", "SSS, SAS, ASA, AAS, HL", "Each rule needs only three facts."), S("Not enough", "AAA and SSA", "Three equal angles only, or two sides and a NON-included angle, can't prove it.")]),
    L("Inequalities with two variables", ineq2, [S("Shade a region", "y > 2x + 1", "Every point in the shaded area is a solution."), S("Test a point", "plug in x and y", "Put the point in and see if the inequality is true."), S("The line", "solid or dashed", "≥ and ≤ use a solid line. > and < use a dashed line.")]),
    L("Scatter plots and trends", scatter, [S("A picture of data", "📈", "A scatter plot shows pairs of numbers as dots."), S("Correlation", "up, down, or none", "Dots that rise show a positive trend. Dots that fall show a negative trend. A cloud shows none."), S("Line of best fit", "y = mx + b", "Use the line to predict a new value.")])
  ];
  l20.push(mixOf("Mixed practice", [l20[0], l20[1], l20[3], l20[5], l20[8], l20[11], l20[12]]));
  l20.push(mixOf("Level 20 Challenge", [l20[2], l20[4], l20[6], l20[7], l20[9], l20[10], l20[13], l20[14], l20[15], l20[16], l20[17]]));

  const l21 = [
    L("Sine, cosine and tangent", trigRatio, [S("SOH-CAH-TOA", "📐", "Sine = Opposite ÷ Hypotenuse, Cosine = Adjacent ÷ Hypotenuse, Tangent = Opposite ÷ Adjacent."), S("Opposite and adjacent", "relative to angle A", "Opposite is across from the angle. Adjacent is next to it."), S("Example", "3-4-5 triangle", "If the opposite side is 3: sin A = 3/5, cos A = 4/5, tan A = 3/4.")]),
    L("Trig with special angles", trigSpecial, [S("Three facts", "sin 30° = 1/2", "Also cos 60° = 1/2 and tan 45° = 1."), S("Find a side", "side = ratio × side", "Use the right ratio to link the side you know to the one you want."), S("Example", "20 m ramp at 30°", "Height = 20 × 1/2 = 10 m.")]),
    L("Sine and cosine of complements", trigComp, [S("Two sharp angles", "A + B = 90°", "In a right triangle the two acute angles are complements."), S("The link", "sin A = cos B", "The side opposite A is the side adjacent to B."), S("Example", "sin 20° = cos 70°", "20 + 70 = 90.")]),
    L("Arcs and central angles", arcCentral, [S("Central angle", "⭕", "Its point is at the center of the circle."), S("Same as its arc", "angle = arc", "A central angle and the arc it cuts have the same measure."), S("Whole circle", "360°", "All the arcs add up to 360°.")]),
    L("Inscribed angles", inscribed, [S("On the circle", "🔵", "An inscribed angle has its point on the circle."), S("Half the arc", "angle = arc ÷ 2", "It is half of the arc it cuts off."), S("Special cases", "diameter → 90°", "An angle inside a semicircle is a right angle. Opposite angles of a cyclic quadrilateral add to 180°.")]),
    L("Arc length", arcLen, [S("A slice of the edge", "🍕", "Arc length is a fraction of the circumference."), S("The fraction", "angle ÷ 360", "A 90° arc is 1/4 of the way around."), S("Example", "r = 6, 60°", "Circumference 12π × 1/6 = 2π.")]),
    L("Sector area", sector, [S("A slice of the area", "🥧", "A sector is a fraction of the circle's area."), S("The fraction", "angle ÷ 360", "Same fraction as for arcs."), S("Example", "r = 6, 60°", "36π × 1/6 = 6π.")]),
    L("Tangent lines", tangent, [S("Touching once", "⭕➖", "A tangent line touches the circle at one point."), S("Right angle", "tangent ⟂ radius", "This makes a right triangle with the center."), S("Equal tangents", "from one point", "Two tangent segments from the same point are equal.")]),
    L("Equation of a circle", circleEq, [S("The form", "(x − h)² + (y − k)² = r²", "Center (h, k), radius r."), S("Signs flip", "(x + 3) → h = −3", "Careful with the signs inside the brackets."), S("On the circle?", "plug in", "A point is on the circle when the equation comes out true.")]),
    L("Chords, secants and tangents", chords, [S("Crossing chords", "a × b = c × d", "The pieces of one chord multiply to the same number as the pieces of the other."), S("Tangent and secant", "t² = outside × whole", "The square of the tangent equals outside part × whole secant."), S("Example", "3 × 8 = 4 × 6", "Both products are 24.")]),
    L("The discriminant", discr, [S("A secret number", "b² − 4ac", "For ax² + bx + c = 0, this number tells you how many real solutions."), S("Three cases", "+, 0, −", "Positive: 2 solutions. Zero: 1. Negative: none."), S("Example", "x² − 4x + 4", "16 − 16 = 0, so one solution.")]),
    L("The quadratic formula", quadForm, [S("The formula", "x = (−b ± √(b² − 4ac)) ÷ 2a", "It solves any quadratic equation."), S("Steps", "a, b, c", "Read off a, b, c, then work out the part under the root first."), S("Two answers", "+ and −", "The ± gives the two solutions.")]),
    L("Completing the square", complSq, [S("Make a perfect square", "x² + 6x + 9", "Half of the middle number, squared, completes the square."), S("Balance", "add to both sides", "Whatever you add to one side, add to the other."), S("Solve", "(x + 3)² = 16", "Take the square root of both sides.")]),
    L("From standard to vertex form", vertConv, [S("Complete the square", "x² − 6x + 5", "Half of −6 is −3, so (x − 3)² = x² − 6x + 9."), S("Fix the constant", "5 − 9 = −4", "Subtract what you added: y = (x − 3)² − 4."), S("Vertex", "(3, −4)", "Read off (h, k).")]),
    L("Factoring when a is not 1", factorA, [S("Bigger first term", "2x² + 11x + 12", "The first brackets have x terms that multiply to give 2x²."), S("Guess and check", "(2x + 3)(x + 4)", "The last numbers multiply to 12."), S("Check the middle", "Outer + Inner", "2 × 4 + 3 × 1 = 11 ✓.")]),
    L("Simplifying rational expressions", rational, [S("Factor first", "x² − 9 = (x + 3)(x − 3)", "Then cancel matching brackets."), S("Example", "(x² − 9) ÷ (x − 3)", "= x + 3."), S("Can't divide by 0", "x ≠ 3", "The bottom can never be zero.")]),
    L("Permutations", permu, [S("Order matters", "ABC ≠ CBA", "A permutation counts different orders as different."), S("Slots", "5 × 4 × 3", "Choices shrink by one each time."), S("Arranging all", "n! ", "4 books can be lined up in 4 × 3 × 2 × 1 = 24 ways.")]),
    L("Combinations", combi, [S("Order doesn't matter", "AB = BA", "A combination counts a group once."), S("Divide the repeats", "5 × 4 ÷ 2 = 10", "Each group of 2 was counted 2 times."), S("Which one?", "order → permutation", "If swapping the order changes the result, use a permutation.")])
  ];
  l21.push(mixOf("Mixed practice", [l21[0], l21[3], l21[4], l21[7], l21[10], l21[14], l21[16]]));
  l21.push(mixOf("Level 21 Challenge", [l21[1], l21[2], l21[5], l21[6], l21[8], l21[9], l21[11], l21[12], l21[13], l21[15], l21[17]]));

  Object.assign(MATH_LEVELS, { 19: l19, 20: l20, 21: l21 });
})();
