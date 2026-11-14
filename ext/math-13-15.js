// ext/math-13-15.js  Mind Lab Math levels 13-15 (60 lessons)
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const esc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const clean = h => String(h).replace(/<[^>]+>/g, " ");
  const leaks = (q, idx) => {
    const re = new RegExp("(?<![0-9A-Za-z.])" + esc(q.answer) + "(?![0-9A-Za-z]|\\.[0-9])", "i");
    return idx.some(i => re.test(clean(q.hints[i])));
  };
  const G = fn => () => { let q; for (let i = 0; i < 40; i++) { q = fn(); if (!leaks(q, [0, 1, 2])) return q; } return q; };
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
  const C = (text, ans, wr, hints, o = {}) => ({ text, choices: cho(ans, ...wr), answer: String(ans), hints, ...o });
  const CL = (...a) => { const q = C(...a), i = q.choices.indexOf(q.answer); q.choices = q.choices.map((c, j) => "ABCD"[j] + ": " + c); q.answer = q.choices[i]; return q; };
  // number answer: typed if not negative, otherwise multiple choice
  const N = (text, val, hints, o = {}) => {
    const { step = 1, ...rest } = o;
    val = Math.round(val * 1000) / 1000;
    if (val >= 0) return { text, answer: val, hints, ...rest };
    const f = x => String(Math.round(x * 1000) / 1000);
    return { text, choices: cho(f(val), f(-val), f(val + step), f(val - step), f(-val + step), f(val + 2 * step)), answer: f(val), hints, ...rest };
  };
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const lcm = (a, b) => a * b / gcd(a, b);
  const fr = (n, d) => {
    const g = gcd(n, d); n /= g; d /= g;
    if (d === 1) return String(n);
    if (n > d) { const w = Math.floor(n / d), r = n % d; return r ? `${w} ${r}/${d}` : String(w); }
    return `${n}/${d}`;
  };
  const frI = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : `${n}/${d}`; };
  const m = n => (n < 0 ? "−" + (-n) : String(n));          // display with a real minus sign
  const par = n => (n < 0 ? `(−${-n})` : String(n));
  const sgn = n => (n < 0 ? `− ${-n}` : `+ ${n}`);
  const ps = (b, e) => `${b}<sup>${e}</sup>`;
  const dist = (...a) => a;

  // ================= LEVEL 13 =================
  const ratioShare = () => {
    const p = pick([[1, 2], [2, 3], [1, 3], [2, 5], [1, 4], [3, 4], [3, 7], [4, 5], [2, 7], [1, 5]]), k = ri(3, 12), T = k * (p[0] + p[1]);
    const it = pick([["red", "blue", "marbles"], ["boys", "girls", "students"], ["cats", "dogs", "pets"], ["apples", "pears", "pieces of fruit"], ["fiction", "non-fiction", "books"]]);
    const w = ri(0, 1);
    return Q(`The ratio of ${it[0]} to ${it[1]} is ${p[0]}:${p[1]}. There are ${T} ${it[2]} in all. How many are ${it[w]}?`, k * p[w], [
      "Add the two parts of the ratio first. That tells you how many equal parts the whole is split into.",
      "Divide the total by the number of equal parts to find the size of ONE part. Then multiply by the number of parts you need.",
      "Example: boys:girls = 3:5 with 40 students. 3 + 5 = 8 parts. 40 ÷ 8 = 5 in each part. Girls = 5 × 5 = 25. Now do yours."]);
  };
  const speedQ = () => {
    const t = ri(0, 2), r = pick([12, 15, 18, 24, 30, 36, 45, 48, 60, 75]), h = ri(2, 8), d = r * h, v = pick(["A car", "A train", "A cyclist", "A bus"]);
    if (t === 0) return Q(`${v} travels at ${r} km per hour for ${h} hours. How many km does it travel?`, d, [
      "Distance, speed and time are linked. Speed tells how far you go in ONE hour.", "Multiply the speed by the number of hours.", "Example: a bike rides at 14 km per hour for 5 hours. 14 × 5 = 70 km. Now do yours."]);
    if (t === 1) return Q(`${v} travels ${d} km at ${r} km per hour. How many hours does the trip take?`, h, [
      "The speed says how many km you cover in one hour. How many of those hours fit in the whole trip?", "Divide the distance by the speed.", "Example: a bus goes 150 km at 50 km per hour. 150 ÷ 50 = 3 hours. Now do yours."]);
    return Q(`${v} travels ${d} km in ${h} hours at a steady speed. How many km per hour is that?`, r, [
      "A speed is a unit rate: the distance for ONE hour.", "Divide the distance by the number of hours.", "Example: a runner goes 36 km in 4 hours. 36 ÷ 4 = 9 km per hour. Now do yours."]);
  };
  const pctWhole = () => {
    const p = pick([10, 20, 25, 30, 40, 50, 60, 75, 5]), w = ri(2, 25) * 20, part = w * p / 100;
    return Q(`${p}% of a number is ${part}. What is the number?`, w, [
      "The part is only some of the whole, so the whole must be bigger than the part.",
      "Divide the part by the percent number to find what 1% is. Then multiply by 100 to get the whole.",
      "Example: 30% of a number is 12. 12 ÷ 30 = 0.4 is 1%. 0.4 × 100 = 40. Now do yours."]);
  };
  const taxTip = () => {
    const P = ri(2, 12) * 20, k = ri(0, 2), r = k === 2 ? pick([5, 10]) : pick([5, 10, 15, 20, 25]), a = P * r / 100;
    const hint = ["First find the percent of the price. That is the extra amount.", `Change ${r}% to a decimal or use 10% and build up. ${k ? "Then add the extra amount to the price." : "That amount is your answer."}`,
      k ? "Example: a $60 meal, 15% tip. 10% is $6, 5% is $3, so the tip is $9. The total is 60 + 9 = $69. Now do yours." : "Example: a $60 meal, 15% tip. 10% is $6, 5% is $3, so the tip is 6 + 3 = $9. Now do yours."];
    if (k === 0) return Q(`A meal costs $${P}. You leave a ${r}% tip. How many dollars is the tip?`, a, hint);
    if (k === 1) return Q(`A meal costs $${P}. You add a ${r}% tip. What is the total in dollars?`, P + a, hint);
    return Q(`A game costs $${P}. The sales tax is ${r}%. What is the total in dollars?`, P + a, hint);
  };
  const fracDiv = () => {
    let a, b, c, d;
    do { b = ri(2, 8); a = ri(1, b - 1); d = ri(2, 8); c = ri(1, d - 1); } while (a * d === b * c);
    const ans = fr(a * d, b * c);
    return C(`${a}/${b} ÷ ${c}/${d} = ?`, ans, [fr(a * c, b * d), fr(b * c, a * d), fr(a * d, b * d), fr(a * d + 1, b * c)], [
      "Dividing by a fraction is the same as multiplying by its reciprocal (the fraction flipped upside down).",
      "Keep the first fraction, change ÷ to ×, and flip the second fraction. Multiply the tops, multiply the bottoms, then simplify.",
      "Example: 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 1/2. Now do yours."]);
  };
  const glasses = () => {
    const fz = pick([[1, 2], [1, 3], [2, 3], [3, 4], [1, 4], [2, 5], [3, 8], [1, 6]]), n = ri(3, 12), tot = fr(n * fz[0], fz[1]);
    const s = pick([[`A jug holds ${tot} liters of juice. Each glass takes ${fz[0]}/${fz[1]} liter. How many glasses can be filled?`], [`A ribbon is ${tot} meters long. Each piece is ${fz[0]}/${fz[1]} meter. How many pieces can be cut?`], [`A bag has ${tot} kg of rice. Each scoop is ${fz[0]}/${fz[1]} kg. How many scoops are in the bag?`]]);
    return Q(s[0], n, [
      "Dividing by a fraction asks: how many of those small pieces fit into the whole amount?",
      "Turn a mixed number into an improper fraction. Then multiply by the flipped fraction (the reciprocal).",
      "Example: a rope is 2 1/4 m and each piece is 3/4 m. 2 1/4 = 9/4. 9/4 × 4/3 = 3 pieces. Now do yours."]);
  };
  const decDiv = () => {
    const b = pick([0.2, 0.4, 0.5, 0.25, 0.6, 1.5, 0.3, 0.05, 0.8, 1.2]), q = Math.random() < 0.5 ? ri(5, 90) / 10 : ri(2, 60), a = Math.round(q * b * 1000) / 1000;
    return Q(`${a} ÷ ${b} = ?`, q, [
      "Dividing by a decimal is tricky. First make the number you divide BY (the divisor) a whole number.",
      "Multiply both numbers by 10, 100 or 1,000 (the same for both) until the divisor is a whole number. Then divide.",
      "Example: 7.2 ÷ 0.9. Multiply both by 10: 72 ÷ 9 = 8. Now do yours."]);
  };
  const lcmQ = () => {
    const p = pick([[4, 6], [6, 8], [3, 5], [4, 10], [6, 9], [8, 12], [5, 7], [9, 12], [10, 15], [6, 10], [12, 18], [4, 9], [8, 10]]), l = lcm(p[0], p[1]);
    const hints = ["The LCM is the smallest number that is a multiple of BOTH numbers.", "List the multiples of the bigger number, one by one, until you find one that the other number also divides into.",
      "Example: 6 and 15. Multiples of 15: 15, 30. 6 goes into 30, so the LCM is 30. Now do yours."];
    if (Math.random() < 0.5) return Q(`What is the least common multiple (LCM) of ${p[0]} and ${p[1]}?`, l, hints);
    return Q(`Bus A leaves every ${p[0]} minutes and bus B leaves every ${p[1]} minutes. They both leave now. In how many minutes will they next leave together?`, l, hints);
  };
  const oppAbs = () => {
    const n = pick([-1, 1]) * ri(1, 15), t = ri(0, 2);
    if (t === 0) return N(`What is the opposite of ${m(n)}?`, -n, ["Opposites are the same distance from zero but on different sides of it.", "Flip the sign: a positive number becomes negative, and a negative number becomes positive.", "Example: the opposite of −9 is 9, and the opposite of 4 is −4. Now do yours."]);
    if (t === 1) return Q(`What is |${m(n)}|? (the absolute value)`, Math.abs(n), ["Absolute value means distance from zero on the number line. Distance is never negative.", "Ignore the sign and just say how many steps the number is from 0.", "Example: |−6| = 6 because −6 is 6 steps from zero, and |5| = 5. Now do yours."]);
    let a = pick([-1, 1]) * ri(1, 12), b = pick([-1, 1]) * ri(1, 12);
    while (Math.abs(a) === Math.abs(b)) b = pick([-1, 1]) * ri(1, 12);
    const w = Math.abs(a) > Math.abs(b) ? a : b, o = w === a ? b : a;
    return C(`Which number has the greater absolute value?`, String(w), [String(o)], ["Absolute value is the distance from zero. Think about which number is farther from zero.", "Ignore the signs and compare how big each number is.", "Example: −8 and 5. |−8| = 8 and |5| = 5, so −8 has the greater absolute value. Now do yours."]);
  };
  const orderInts = () => {
    const t = ri(0, 2);
    if (t === 2) {
      let a = ri(-9, 9), b = ri(-9, 9); while (a === b) b = ri(-9, 9);
      const ans = a > b ? ">" : "<";
      return CL(`Which symbol makes this true?  ${m(a)} ? ${m(b)}`, ans, ["<", ">", "="], ["On a number line, the number farther to the right is greater.", "Picture both numbers on the number line. Negative numbers closer to zero are greater than negative numbers farther from zero.", "Example: −2 and −7. −2 is to the right of −7, so −2 > −7. Now do yours."]);
    }
    const s = new Set(); while (s.size < 4) s.add(ri(-9, 9));
    const arr = [...s], ans = t === 0 ? Math.min(...arr) : Math.max(...arr);
    return C(`Which number is the ${t === 0 ? "least" : "greatest"}?`, ans, arr.filter(x => x !== ans), [
      t === 0 ? "On the number line, numbers get smaller as you go left." : "On the number line, numbers get greater as you go right.",
      "Remember: a negative number is always less than a positive number, and −8 is less than −2.", "Example: from −3, 2, −6, 0 the least is −6 (farthest left) and the greatest is 2. Now do yours."]);
  };
  const quadrantQ = () => {
    const x = pick([-1, 1]) * ri(1, 9), y = pick([-1, 1]) * ri(1, 9), t = ri(0, 2);
    const qn = (a, b) => (a > 0 && b > 0 ? "Quadrant I" : a < 0 && b > 0 ? "Quadrant II" : a < 0 && b < 0 ? "Quadrant III" : "Quadrant IV");
    if (t === 0) return C(`In which quadrant is the point (${x}, ${y})?`, qn(x, y), ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], [
      "Look at the signs of x and y. x tells left or right, y tells down or up.", "Quadrants go around counterclockwise starting at the top right: I (+,+), II (−,+), III (−,−), IV (+,−).", "Example: (−4, 5) is left and up, so it is in Quadrant II. Now do yours."]);
    if (t === 1) {
      const ax = ri(0, 1) ? "x-axis" : "y-axis", nx = ax === "x-axis" ? [x, -y] : [-x, y];
      return C(`Reflect the point (${x}, ${y}) across the ${ax}. What is the new point?`, `(${nx[0]}, ${nx[1]})`, [`(${-x}, ${-y})`, `(${y}, ${x})`, ax === "x-axis" ? `(${-x}, ${y})` : `(${x}, ${-y})`], [
        "A reflection is a mirror image. The point lands the same distance from the axis, on the other side.", ax === "x-axis" ? "Reflecting across the x-axis flips up and down, so only the y-number changes sign." : "Reflecting across the y-axis flips left and right, so only the x-number changes sign.",
        "Example: reflect (2, 3) across the x-axis. It goes to (2, −3). Reflect it across the y-axis instead and you get (−2, 3). Now do yours."]);
    }
    const target = pick(["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"]), ok = { "Quadrant I": [1, 1], "Quadrant II": [-1, 1], "Quadrant III": [-1, -1], "Quadrant IV": [1, -1] };
    const pt = (sx, sy) => `(${sx * ri(1, 9)}, ${sy * ri(1, 9)})`, o = Object.keys(ok).filter(k => k !== target).map(k => pt(...ok[k]));
    return C(`Which point is in ${target}?`, pt(...ok[target]), o, ["Think about the signs. Each quadrant has its own pair of signs for (x, y).", "Quadrant I is (+,+), II is (−,+), III is (−,−) and IV is (+,−). Check the signs of each choice.", "Example: which point is in Quadrant IV? (3, −2) works, because x is positive and y is negative. Now do yours."]);
  };
  const coordDist = () => {
    let a = ri(-9, 9), b = ri(-9, 9); while (Math.abs(a - b) < 2) b = ri(-9, 9);
    const c = ri(-9, 9), horiz = Math.random() < 0.5, p1 = horiz ? `(${a}, ${c})` : `(${c}, ${a})`, p2 = horiz ? `(${b}, ${c})` : `(${c}, ${b})`;
    return Q(`How far apart are the points ${p1} and ${p2}?`, Math.abs(a - b), [
      `Look at the two points. They share the same ${horiz ? "y" : "x"}-number, so they sit on one ${horiz ? "horizontal" : "vertical"} line.`,
      "If they are on the same side of zero, subtract the absolute values. If one is on each side, add the absolute values.", "Example: (−2, 1) and (4, 1). They are 2 left and 4 right of zero, so the distance is 2 + 4 = 6. Now do yours."]);
  };
  const expQ = () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 20), t = ri(0, 5);
    const forms = [
      () => { const base = pick([[2, ri(4, 6)], [3, 4], [10, ri(2, 4)], [a, 2], [a, 3]]); return [ps(base[0], base[1]), Math.pow(base[0], base[1])]; },
      () => [`${c} + ${ps(a, 2)}`, c + a * a],
      () => [`${c} × ${ps(a, 2)}`, c * a * a],
      () => [`(${a} + ${b})<sup>2</sup>`, (a + b) * (a + b)],
      () => { const big = a * a + ri(3, 30); return [`${big} − ${ps(a, 2)}`, big - a * a]; },
      () => [`${ps(a, 2)} + ${ps(b, 3)}`, a * a + b * b * b]
    ];
    const f = forms[t](), tx = f[0];
    return Q(`Find the value of ${tx}`, f[1], [
      "An exponent tells how many times to multiply the base by itself. It does NOT mean multiply by the small number.",
      "Work out parentheses first, then the exponent, then multiply or divide, then add or subtract.", "Example: 4 + 3<sup>2</sup> = 4 + (3 × 3) = 4 + 9 = 13. Now do yours."]);
  };
  const evalExpr = () => {
    const a = ri(2, 9), b = ri(2, 9), p = ri(2, 6), q = ri(2, 6), c = ri(2, 12), t = ri(0, 4);
    const f = [[`${p}a + ${q}b`, p * a + q * b], [`ab + ${c}`, a * b + c], [`${p}a + b²`, p * a + b * b], [`a² − b`, a * a - b], [`${p}(a + b)`, p * (a + b)]][t];
    if (f[1] < 0) return evalExpr();
    return Q(`Find the value of ${f[0]} when a = ${a} and b = ${b}.`, f[1], [
      "Put each number in place of its letter. A number written next to a letter, or two letters together, means multiply.", "Write the expression with the numbers in, then follow the order of operations: parentheses, exponents, multiply, add.",
      "Example: 3x + y when x = 5 and y = 2 becomes 3 × 5 + 2 = 15 + 2 = 17. Now do yours."]);
  };
  const equivExpr = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const a = ri(2, 9), b = ri(2, 9), s = ri(0, 1) ? "+" : "-", sy = s;
      return C(`Which expression is equivalent to ${a}(x ${s === "+" ? "+" : "−"} ${b})?`, `${a}x ${sy} ${a * b}`, [`${a}x ${sy} ${b}`, `x ${sy} ${a * b}`, `${a}x ${sy} ${a + b}`], [
        "The distributive property says the number outside multiplies EVERY term inside the parentheses.", "Multiply the outside number by x, and then multiply it by the second number too.", "Example: 5(x + 2) = 5 × x + 5 × 2 = 5x + 10. Now do yours."]);
    }
    if (t === 1) {
      const p = ri(2, 9), q = ri(2, 9);
      return C(`Which expression is equivalent to ${p}x + ${q}x?`, `${p + q}x`, [`${p + q}x^2`, `${p * q}x`, `${p + q}`, `${p}${q}x`], [
        "Like terms have the same letter. You can combine them by adding the numbers in front.", "Add the two numbers in front of x. The letter part stays the same, and it does not get squared.", "Example: 4x + 3x = (4 + 3)x = 7x. Now do yours."]);
    }
    const g = ri(2, 6), a = ri(2, 5), b = ri(2, 5);
    return C(`Which is equivalent to ${g * a}x + ${g * b}?`, `${g}(${a}x + ${b})`, [`${g}(${a}x + ${g * b})`, `${g}(${g * a}x + ${b})`, `${a}(${g}x + ${g * b})`], [
      "Factoring is the opposite of distributing. Look for a number that divides into both terms.", "Find a common factor of both numbers, write it outside parentheses, and put what is left of each term inside. Multiply back out to check.",
      "Example: 12x + 18 = 6(2x + 3), because 6 × 2x = 12x and 6 × 3 = 18. Now do yours."]);
  };
  const oneStepEq = () => {
    const t = ri(0, 3);
    if (t === 0) { const p = ri(2, 9), x = ri(2, 20) / 2; return Q(`Solve for x:  ${p}x = ${Math.round(p * x * 100) / 100}`, x, ["An equation is like a balance. Do the same thing to both sides.", "The x is being multiplied. Undo that by dividing both sides by the number next to x.", "Example: 4x = 18. Divide both sides by 4 and x = 4.5. Now do yours."]); }
    if (t === 1) { const p = ri(2, 9), q = ri(2, 12); return Q(`Solve for x:  x ÷ ${p} = ${q}`, p * q, ["An equation is like a balance. Do the same thing to both sides.", "The x is being divided. Undo that by multiplying both sides by the number it was divided by.", "Example: x ÷ 5 = 6. Multiply both sides by 5 and x = 30. Now do yours."]); }
    const x = ri(5, 90) / 10, a = ri(11, 89) / 10;
    if (t === 2) return Q(`Solve for x:  x + ${a} = ${Math.round((a + x) * 10) / 10}`, x, ["An equation is like a balance. Do the same thing to both sides.", "The x has a number added to it. Undo that by subtracting the same number from both sides.", "Example: x + 2.5 = 9.1. Subtract 2.5 from both sides and x = 6.6. Now do yours."]);
    return Q(`Solve for x:  x − ${a} = ${Math.round(x * 10) / 10}`, Math.round((a + x) * 10) / 10, ["An equation is like a balance. Do the same thing to both sides.", "A number was taken away from x. Undo that by adding the same number to both sides.", "Example: x − 3.5 = 4.2. Add 3.5 to both sides and x = 7.7. Now do yours."]);
  };
  const ineqQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const op = pick([">", "<", "≥", "≤"]), c = ri(3, 15), eq = op === "≥" || op === "≤", up = op === ">" || op === "≥";
      const ok = up ? c + ri(eq ? 0 : 1, 6) : c - ri(eq ? 0 : 1, 6), bad = [up ? c - ri(1, 4) : c + ri(1, 4), up ? c - ri(5, 8) : c + ri(5, 8), eq ? (up ? c - 1 : c + 1) : c];
      return C(`Which number is a solution of x ${op} ${c}?`, ok, bad, ["A solution is a number that makes the inequality true. Try each number in place of x.", eq ? "The line under the symbol means the number itself is allowed too." : "Without a line under the symbol, the number itself is NOT allowed.", "Example: for x > 6, the number 8 works (8 > 6) but 6 does not (6 is not greater than 6). Now do yours."]);
    }
    if (t === 1) {
      const c = ri(5, 60), w = pick([["at least", "≥"], ["at most", "≤"], ["more than", ">"], ["fewer than", "<"]]), v = pick(["h", "n", "p"]);
      const wc = pick([["A ride needs a height of", `inches. Let ${v} be the height.`], ["A bus can carry", `riders. Let ${v} be the riders.`], ["A bag is allowed to weigh", `pounds. Let ${v} be the weight.`]]);
      return CL(`${wc[0]} ${w[0]} ${c} ${wc[1]} Which inequality fits?`, `${v} ${w[1]} ${c}`, [`${v} ${w[1] === "≥" ? "≤" : w[1] === "≤" ? "≥" : w[1] === ">" ? "<" : ">"} ${c}`, `${v} ${w[1] === "≥" ? ">" : w[1] === "≤" ? "<" : w[1] === ">" ? "≥" : "≤"} ${c}`, `${v} = ${c}`], [
        "Turn the words into a symbol. Decide: is it a limit from above or from below?", "\"At least\" and \"at most\" include the number (≥ and ≤). \"More than\" and \"fewer than\" do not include it (> and <).", "Example: \"at most 20\" means 20 or less, so n ≤ 20. Now do yours."]);
    }
    const c = ri(3, 14), op = pick([">", "<", "≥", "≤"]), yes = ri(0, 1), tv = c + ri(0, 1) * (op === ">" || op === "≥" ? 1 : -1);
    const ans = ((op === ">" && tv > c) || (op === "<" && tv < c) || (op === "≥" && tv >= c) || (op === "≤" && tv <= c)) ? "Yes" : "No";
    return C(`Is ${tv} a solution of x ${op} ${c}?`, ans, ans === "Yes" ? ["No"] : ["Yes"], ["Put the number in place of x and read the statement. Is it true?", "Check whether the number is exactly equal to the limit. Does the symbol allow equal?", "Example: is 5 a solution of x ≥ 5? 5 ≥ 5 is true, so yes. Is 5 a solution of x > 5? No. Now do yours."]);
  };
  const tableRule = () => {
    const kind = ri(0, 2), a = kind === 0 ? ri(2, 9) : ri(2, 12), xs = kind === 2 ? [a + 2, a + 3, a + 4] : [1, 2, 3];
    const f = x => (kind === 0 ? a * x : kind === 1 ? x + a : x - a);
    const tab = `x: ${xs.join(", ")} &nbsp;→&nbsp; y: ${xs.map(f).join(", ")}`;
    if (Math.random() < 0.5) { const x = kind === 2 ? a + ri(5, 12) : ri(8, 15); return Q(`${tab}<br>Using the same rule, what is y when x = ${x}?`, f(x), ["Look at how x turns into y in each pair. The same rule works every time.", "Is y always x times something, or x plus something, or x minus something? Test the rule on every pair.", "Example: x: 1, 2, 3 → y: 5, 6, 7. The rule is y = x + 4, so when x = 10, y = 14. Now do yours."]); }
    const right = kind === 0 ? `y = ${a}x` : kind === 1 ? `y = x + ${a}` : `y = x - ${a}`;
    return C(`${tab}<br>Which equation matches the table?`, right, [`y = ${a}x`, `y = x + ${a}`, `y = x - ${a}`, `y = ${a} - x`], ["Find how the first x turns into its y. Then check that the same rule works for the other pairs.", "Compare x and y. Is y much bigger because of multiplying, or just a little bigger or smaller because of adding or subtracting?", "Example: x: 1, 2, 3 → y: 6, 12, 18. y is 6 times x, so the rule is y = 6x. Now do yours."]);
  };
  const l13 = [
    L("Sharing in a ratio", ratioShare, [S("Parts of a whole", "🔴🔴🔵🔵🔵", "A ratio of 2:3 splits things into 2 + 3 = <b>5 equal parts</b>."), S("One part", "40 ÷ 8 = 5", "Divide the total by the number of parts to find the size of one part."), S("Multiply back", "3 parts × 5 = 15", "Multiply one part by how many parts each group gets.")]),
    L("Speed, distance and time", speedQ, [S("Speed is a rate", "🚗 60 km per hour", "Speed tells how far you go in <b>one hour</b>."), S("Three jobs", "d = r × t", "Distance = speed × time. Divide to find time or speed."), S("Check units", "km ÷ km/h = h", "Make sure your answer has the right unit.")]),
    L("Find the whole from a percent", pctWhole, [S("Part and whole", "30% of ? = 12", "Sometimes you know the part and the percent, and need the whole."), S("Find 1%", "12 ÷ 30 = 0.4", "Divide the part by the percent to find 1%."), S("Times 100", "0.4 × 100 = 40", "Multiply by 100 to get the whole (100%).")]),
    L("Tax and tips", taxTip, [S("Extra amount", "🧾", "Tax and tips are a percent of the price."), S("Build the percent", "15% = 10% + 5%", "Find 10% (divide by 10), then halve it for 5%."), S("Total", "price + extra", "Add the extra amount to the price for the total.")]),
    L("Fraction ÷ fraction", fracDiv, [S("Flip it", "1/2 ÷ 1/4", "To divide by a fraction, multiply by its <b>reciprocal</b> (flip it)."), S("Keep, change, flip", "1/2 × 4/1 = 2", "Keep the first, change ÷ to ×, flip the second."), S("Simplify", "6/4 = 1 1/2", "Simplify your answer or write it as a mixed number.")]),
    L("How many fit? (fraction stories)", glasses, [S("Dividing asks", "🥛 ÷ 1/2 L", "\"How many pieces fit?\" is a division question."), S("Improper fractions", "2 1/4 = 9/4", "Change mixed numbers to improper fractions first."), S("Multiply by the flip", "9/4 × 4/3 = 3", "Then multiply by the reciprocal of the piece size.")]),
    L("Dividing by decimals", decDiv, [S("Whole divisor", "7.2 ÷ 0.9", "It is easier to divide by a whole number."), S("Slide both", "72 ÷ 9", "Multiply both numbers by 10 (or 100) so the divisor is whole. The answer stays the same."), S("Divide", "= 8", "Divide as usual and keep the decimal point in place.")]),
    L("Least common multiple", lcmQ, [S("Multiples", "4, 8, 12, 16 …", "Multiples are what you get by skip-counting."), S("Shared multiple", "6: 6, 12, 18 &nbsp; 4: 4, 8, 12", "A common multiple is on both lists. The smallest one is the <b>LCM</b>."), S("Stories", "🚌🚌", "Buses meeting again, lights blinking together: these are LCM stories.")]),
    L("Opposites and absolute value", oppAbs, [S("Opposites", "−5 and 5", "Opposites are the same distance from zero on opposite sides."), S("Absolute value", "|−5| = 5", "Absolute value is the distance from zero. It is never negative."), S("Compare", "|−8| &gt; |5|", "The number farther from zero has the greater absolute value.")]),
    L("Order of integers", orderInts, [S("Number line", "−5 −4 −3 −2 −1 0 1 2 3", "Right is greater. Left is less."), S("Negatives", "−2 &gt; −7", "Among negatives, the one closer to zero is greater."), S("Symbols", "&lt; &gt;", "The open side of the symbol faces the greater number.")]),
    L("All four quadrants", quadrantQ, [S("Four quadrants", "I II<br>III IV", "The axes split the plane into four quadrants, numbered counterclockwise from the top right."), S("Signs", "(+,+) (−,+) (−,−) (+,−)", "The signs of x and y tell the quadrant."), S("Reflect", "(2, 3) → (2, −3)", "A reflection across the x-axis changes the sign of y. Across the y-axis it changes the sign of x.")]),
    L("Distance on the coordinate plane", coordDist, [S("Same line", "(−2, 1) (4, 1)", "Points with the same y-number are on a horizontal line."), S("Same side", "|7 − 3| = 4", "Both on the same side of zero: subtract the absolute values."), S("Opposite sides", "2 + 4 = 6", "One on each side of zero: add the absolute values.")]),
    L("Exponents in expressions", expQ, [S("Repeated multiplication", "3<sup>4</sup> = 3×3×3×3", "The small raised number says how many times the base is multiplied."), S("Not the same", "2<sup>3</sup> ≠ 2×3", "2<sup>3</sup> = 8, but 2 × 3 = 6."), S("Order", "( ) then exponent", "Parentheses, then exponents, then × ÷, then + −.")]),
    L("Evaluate with letters", evalExpr, [S("Replace", "a = 4", "A letter stands for a number. Swap the number in."), S("Next to each other", "3a = 3 × a", "A number beside a letter means multiply."), S("Order of operations", "3×4 + 2", "Follow the order of operations to finish.")]),
    L("Equivalent expressions", equivExpr, [S("Distribute", "3(x + 2) = 3x + 6", "Multiply the outside number by each term inside."), S("Combine like terms", "4x + 3x = 7x", "Add the numbers in front of the same letter."), S("Factor", "6x + 9 = 3(2x + 3)", "Pull out a common factor: it is distributing backwards.")]),
    L("Solve one-step equations", oneStepEq, [S("Balance", "⚖️", "Whatever you do to one side, do to the other."), S("Inverse", "+ ↔ −   × ↔ ÷", "Use the opposite operation to get x alone."), S("Check", "x = 4.5 → 4×4.5 = 18 ✅", "Put your answer back in to check.")]),
    L("Inequalities", ineqQ, [S("More than one answer", "x &gt; 4", "An inequality can have many solutions: 5, 6, 7 and more."), S("Symbols", "&gt; &lt; ≥ ≤", "≥ means \"greater than or equal to\". ≤ means \"less than or equal to\"."), S("Words", "at least → ≥", "\"At least\" is ≥. \"At most\" is ≤.")]),
    L("Input-output rules", tableRule, [S("A rule", "x → ? → y", "A table pairs each x with a y by the same rule."), S("Find the rule", "1→5, 2→6", "Compare x and y. Add, subtract or multiply?"), S("Equation", "y = x + 4", "Write the rule as an equation and use it for any x.")])
  ];

  l13.push(mixOf("Mixed practice", [l13[0], l13[2], l13[4], l13[6], l13[8], l13[11], l13[14]]));
  l13.push(mixOf("Level 13 Challenge", [l13[1], l13[3], l13[5], l13[7], l13[9], l13[10], l13[12], l13[13], l13[15], l13[16], l13[17]]));

  // ================= LEVEL 14 =================
  const convQ = () => {
    const U = [["feet", "inches", 12], ["yards", "feet", 3], ["pounds", "ounces", 16], ["gallons", "quarts", 4], ["hours", "minutes", 60], ["minutes", "seconds", 60], ["meters", "centimeters", 100], ["kilograms", "grams", 1000], ["quarts", "cups", 4], ["days", "hours", 24]];
    const u = pick(U), n = ri(2, 9), t = ri(0, 2);
    if (t === 0) return Q(`How many ${u[1]} are in ${n} ${u[0]}?`, n * u[2], ["Use a ratio table. Write what 1 unit is worth, then scale up.", `Multiply the number of ${u[0]} by how many ${u[1]} make 1 ${u[0].replace(/s$/, "")}.`, "Example: 1 week = 7 days, so 3 weeks = 3 × 7 = 21 days. Now do yours."]);
    if (t === 1) return Q(`${n * u[2]} ${u[1]} equals how many ${u[0]}?`, n, ["You are going from a small unit to a bigger unit, so the number gets smaller.", `Divide by the number of ${u[1]} in one ${u[0].replace(/s$/, "")}.`, "Example: 56 days ÷ 7 days in a week = 8 weeks. Now do yours."]);
    const r = ri(2, 9), w = pick([["A snail crawls", "cm each minute", "cm in 1 hour"], ["A plant grows", "mm each minute", "mm in 1 hour"], ["A machine makes", "toys each minute", "toys in 1 hour"]]);
    return Q(`${w[0]} ${r} ${w[1]}. How many ${w[2]} (60 minutes)?`, r * 60, ["This is a rate. The rate for ONE minute is given, and you want a whole hour.", "There are 60 minutes in an hour. Scale the rate up by that amount.", "Example: a plant grows 2 mm each day. In 7 days it grows 2 × 7 = 14 mm. Now do yours."]);
  };
  const triArea = () => {
    const b = ri(3, 16), h = ri(2, 14); if ((b * h) % 2) return triArea();
    const t = ri(0, 2), A = b * h / 2;
    if (t === 0) return Q(`A triangle has a base of ${b} cm and a height of ${h} cm. What is its area in square cm?`, A, ["A triangle is half of a rectangle (or parallelogram) with the same base and height.", "Multiply the base by the height, then take half of that. The height must be straight up and down from the base.", "Example: base 10 and height 6. 10 × 6 = 60, half of 60 is 30. Now do yours."]);
    if (t === 1) return Q(`A triangle has an area of ${A} square cm and a base of ${b} cm. What is its height in cm?`, h, ["Start with Area = base × height ÷ 2 and think backwards.", "Double the area first to undo the ÷ 2. Then divide by the base.", "Example: area 24 and base 8. Double 24 is 48. 48 ÷ 8 = 6. Now do yours."]);
    return Q(`A right triangle has two short sides (legs) of ${b} m and ${h} m. What is its area in square m?`, A, ["In a right triangle, the two legs make the base and the height.", "Multiply the legs together, then take half.", "Example: legs 6 and 8. 6 × 8 = 48, half is 24. Now do yours."]);
  };
  const paraTrap = () => {
    const t = ri(0, 2);
    if (t === 0) { const b = ri(3, 15), h = ri(2, 12); return Q(`A parallelogram has a base of ${b} cm and a height of ${h} cm. What is its area in square cm?`, b * h, ["A parallelogram can be cut and moved to make a rectangle. Use the height that goes straight up, not the slanted side.", "Multiply the base by the height.", "Example: base 9 and height 4 gives 9 × 4 = 36. Now do yours."]); }
    if (t === 1) { const b = ri(3, 15), h = ri(2, 12); return Q(`A parallelogram has an area of ${b * h} square m and a height of ${h} m. What is its base in m?`, b, ["Area = base × height. Think backwards.", "Divide the area by the height.", "Example: area 56 and height 7. 56 ÷ 7 = 8. Now do yours."]); }
    let a = ri(3, 12), c = ri(3, 12), h = ri(2, 10); while ((a + c) % 2 && h % 2) h = ri(2, 10);
    return Q(`A trapezoid has parallel sides of ${a} cm and ${c} cm and a height of ${h} cm. What is its area in square cm?`, (a + c) * h / 2, ["A trapezoid has two parallel sides called bases. Think of the average length of the two bases.", "Add the two bases, multiply by the height, and take half.", "Example: bases 4 and 8, height 5. (4 + 8) = 12, 12 × 5 = 60, half is 30. Now do yours."]);
  };
  const composite = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(4, 10), b = ri(3, 8), c = ri(2, 6), d = ri(2, 6); return Q(`An L-shaped floor is made from one ${a} m by ${b} m rectangle and one ${c} m by ${d} m rectangle. What is the total area in square m?`, a * b + c * d, ["Break a shape that looks complicated into simple shapes you know.", "Find the area of each rectangle on its own, then add them.", "Example: a 5 by 2 rectangle and a 3 by 3 rectangle give 10 + 9 = 19. Now do yours."]); }
    if (t === 1) { const W = ri(8, 15), H = ri(6, 12), w = ri(2, 5), h = ri(2, 5); return Q(`A ${W} cm by ${H} cm sheet has a ${w} cm by ${h} cm rectangle cut out of it. How many square cm of the sheet are left?`, W * H - w * h, ["First find the area of the whole sheet as if nothing were cut out.", "Find the area of the hole, then subtract it from the whole.", "Example: a 10 by 6 sheet with a 2 by 3 hole: 60 − 6 = 54. Now do yours."]); }
    const b = ri(2, 6) * 2, h = ri(3, 9), tr = ri(2, 8);
    return Q(`A house shape is a rectangle ${b} m wide and ${h} m tall with a triangle roof on top. The roof has a base of ${b} m and a height of ${tr} m. What is the total area in square m?`, b * h + b * tr / 2, ["Split the picture into a rectangle and a triangle.", "Rectangle: base × height. Triangle: base × height ÷ 2. Add the two areas.", "Example: a 4 by 5 rectangle with a roof of base 4 and height 3: 20 + 6 = 26. Now do yours."]);
  };
  const surfArea = () => {
    const t = ri(0, 2);
    if (t === 0) { const l = ri(2, 9), w = ri(2, 8), h = ri(2, 8); return Q(`A box is ${l} cm long, ${w} cm wide and ${h} cm tall. What is its surface area in square cm?`, 2 * (l * w + l * h + w * h), ["Surface area is the area of all the faces added together. A box has 6 faces in 3 matching pairs.", "Find top/bottom (length × width), front/back (length × height) and the two sides (width × height). Add the three areas, then double.", "Example: a 2 by 3 by 4 box: 2×3 = 6, 2×4 = 8, 3×4 = 12. 6 + 8 + 12 = 26, doubled is 52. Now do yours."]); }
    if (t === 1) { const s = ri(2, 10); return Q(`A cube has edges of ${s} cm. What is its surface area in square cm?`, 6 * s * s, ["A cube has 6 faces and they are all the same square.", "Find the area of one square face, then multiply by the number of faces.", "Example: a cube with edges of 3 cm has faces of 9 square cm, and 6 × 9 = 54. Now do yours."]); }
    const l = ri(3, 9), w = ri(3, 8), h = ri(2, 7);
    return Q(`A box with NO lid is ${l} cm long, ${w} cm wide and ${h} cm tall. What is the total area of its 5 faces in square cm?`, l * w + 2 * l * h + 2 * w * h, ["With no lid, one of the big faces is missing. Only count the faces that are really there.", "Count the bottom once (length × width) and the 4 side walls (two of length × height and two of width × height). Add them.", "Example: a 4 by 3 by 2 open box: bottom 12, two long walls 2 × 8 = 16, two short walls 2 × 6 = 12. 12 + 16 + 12 = 40. Now do yours."]);
  };
  const fracVol = () => {
    if (Math.random() < 0.5) {
      const a = ri(1, 5), b = ri(1, 5), c = ri(1, 5), v = a * b * c;
      return C(`A box is ${fr(a, 2)} cm long, ${fr(b, 2)} cm wide and ${fr(c, 2)} cm tall. What is its volume in cubic cm?`, fr(v, 8), [fr(v, 2), fr(v, 4), fr(a + b + c, 2), fr(v, 6)], [
        "Volume of a box = length × width × height. It works for fractions too.", "Multiply the three fractions: multiply all the tops, then all the bottoms. Then simplify.", "Example: 1/2 × 3/2 × 1/2 = 3/8 cubic cm. Now do yours."]);
    }
    const e = pick([2, 3]), l = ri(1, 4), w = ri(1, 4), h = ri(1, 4);
    return Q(`A box is ${l} units long, ${w} units wide and ${h} units tall. It is filled with small cubes that have edges of 1/${e} unit. How many small cubes fit?`, l * w * h * e * e * e, [
      `Count how many small cubes fit along each edge of ONE unit. That is the same as the bottom number of the fraction.`, `One unit cube holds ${e} × ${e} × ${e} small cubes. Find the volume of the box in unit cubes, then multiply.`, "Example: a 1 by 2 by 2 box and cubes with 1/2 edges. One unit cube holds 8 small cubes. The box holds 4 unit cubes, so 4 × 8 = 32. Now do yours."]);
  };
  const polyCoord = () => {
    let x1 = ri(-6, 6), x2 = ri(-6, 6), y1 = ri(-6, 6), y2 = ri(-6, 6);
    while (Math.abs(x1 - x2) < 2) x2 = ri(-6, 6);
    while (Math.abs(y1 - y2) < 2) y2 = ri(-6, 6);
    const t = ri(0, 2), W = Math.abs(x1 - x2), H = Math.abs(y1 - y2);
    if (t === 0) return C(`Three corners of a rectangle are (${x1}, ${y1}), (${x2}, ${y1}) and (${x2}, ${y2}). What is the fourth corner?`, `(${x1}, ${y2})`, [`(${x2}, ${y1})`, `(${y2}, ${x1})`, `(${x1}, ${y1})`, `(${x2}, ${y2})`], ["The sides of this rectangle are straight across and straight up and down, so opposite corners share an x or a y.", "Two corners share the first number x, and two share the second number y. Find which x and y each corner needs.", "Example: corners (1, 2), (5, 2), (5, 6). The missing corner lines up with (1, 2) in x and with (5, 6) in y, so it is (1, 6). Now do yours."]);
    if (t === 1) return Q(`A rectangle has corners (${x1}, ${y1}), (${x2}, ${y1}), (${x2}, ${y2}) and (${x1}, ${y2}). What is its area in square units?`, W * H, ["Find the length of two sides that meet at a corner.", "Find the width by comparing the x-numbers and the height by comparing the y-numbers (careful with negatives). Then multiply.", "Example: corners (−1, 2) and (3, 5) on opposite sides. Width 4, height 3, area 12. Now do yours."]);
    return Q(`A rectangle has corners (${x1}, ${y1}), (${x2}, ${y1}), (${x2}, ${y2}) and (${x1}, ${y2}). What is its perimeter in units?`, 2 * (W + H), ["The perimeter is the distance around. First find how long each side is.", "Find the width from the x-numbers and the height from the y-numbers. Then add all four sides.", "Example: width 4 and height 3 gives 4 + 3 + 4 + 3 = 14. Now do yours."]);
  };
  const freqTable = () => {
    const lo = ri(2, 6), cnt = [];
    do { cnt.length = 0; for (let i = 0; i < 5; i++) cnt.push(ri(1, 6)); } while (cnt.filter(c => c === Math.max(...cnt)).length > 1);
    const rows = cnt.map((c, i) => `${lo + i}: ${"●".repeat(c)}`).join("<br>");
    const tab = `<b>Quiz scores</b> (each ● is one student)<br>${rows}`;
    const t = ri(0, 2);
    if (t === 0) return Q(`${tab}<br>How many students took the quiz?`, cnt.reduce((a, b) => a + b, 0), ["Each dot is one student. You need all the dots.", "Count the dots in each row and add the rows together.", "Example: rows with 2, 3 and 1 dots mean 2 + 3 + 1 = 6 students. Now do yours."]);
    if (t === 1) { const v = lo + ri(1, 3); return Q(`${tab}<br>How many students scored more than ${v}?`, cnt.reduce((a, c, i) => a + (lo + i > v ? c : 0), 0), ["\"More than\" does not include the score itself. Which rows count?", "Only use the rows with a score bigger than the one in the question, and add up their dots.", "Example: for scores 4: ●● , 5: ●●● , 6: ●, the number who scored more than 4 is 3 + 1 = 4. Now do yours."]); }
    return Q(`${tab}<br>Which score is the mode (the most common score)?`, lo + cnt.indexOf(Math.max(...cnt)), ["The mode is the value with the most dots.", "Find the longest row. Its label is the mode, not the number of dots.", "Example: rows 3: ●● , 4: ●●●●, 5: ● have the longest row at 4, so the mode is 4. Now do yours."]);
  };
  const madQ = () => {
    const dev = pick([[-2, -1, 1, 2], [-3, -1, 1, 3], [-4, -2, 2, 4], [-5, -1, 1, 5], [-3, -3, 3, 3], [-6, -2, 2, 6], [-2, -2, 2, 2], [-4, 0, 0, 4], [-1, -1, 1, 1], [-5, -3, 3, 5], [-4, -1, 1, 4], [-6, 0, 0, 6], [-2, 0, 0, 2], [-8, -4, 4, 8]]);
    const mean = ri(10, 30), data = shuf(dev.map(d => d + mean)), mad = dev.reduce((a, d) => a + Math.abs(d), 0) / dev.length;
    return Q(`Find the mean absolute deviation (MAD) of ${data.join(", ")}.`, mad, [
      "MAD tells how far the numbers are from the mean on average. Start by finding the mean.", "Find each number's distance from the mean (ignore minus signs), add the distances, and divide by how many numbers there are.",
      "Example: 10, 12, 20. The mean is 14. Distances: 4, 2, 6. They add to 12, and 12 ÷ 3 = 4. Now do yours."]);
  };
  const fiveNum = () => {
    const t = ri(0, 2);
    if (t === 2) {
      const x1 = ri(1, 10), x2 = x1 + ri(1, 5), x3 = x2 + 2 * ri(0, 3), x4 = x3 + ri(1, 5), x5 = x4 + ri(1, 4), x6 = x5 + ri(1, 4), x7 = x6 + ri(1, 4), x8 = x7 + ri(1, 4);
      return Q(`Here are 8 numbers in order: ${[x1, x2, x3, x4, x5, x6, x7, x8].join(", ")}. What is the first quartile (Q1)?`, (x2 + x3) / 2, ["Q1 is the median of the lower half of the data.", "Split the data into a lower half (4 numbers) and an upper half. Q1 is the middle of the lower half: the number between the 2nd and 3rd values.", "Example: lower half 3, 5, 9, 11. The middle is between 5 and 9, so Q1 = 7. Now do yours."]);
    }
    const mn = ri(1, 20), q1 = mn + ri(2, 8), md = q1 + ri(2, 8), q3 = md + ri(2, 8), mx = q3 + ri(2, 10);
    const sum = `Minimum ${mn}, Q1 ${q1}, median ${md}, Q3 ${q3}, maximum ${mx}.`;
    if (t === 0) return Q(`A box plot shows: ${sum} What is the range?`, mx - mn, ["The range tells how spread out ALL the data is.", "Subtract the smallest value from the largest value.", "Example: minimum 3 and maximum 20 gives a range of 20 − 3 = 17. Now do yours."]);
    return Q(`A box plot shows: ${sum} What is the interquartile range (IQR)?`, q3 - q1, ["The IQR tells how spread out the MIDDLE half of the data is. It is the length of the box.", "Subtract Q1 from Q3. Do not use the minimum and maximum.", "Example: Q1 = 8 and Q3 = 15 gives an IQR of 15 − 8 = 7. Now do yours."]);
  };
  const outlierQ = () => {
    const base = [], mid = ri(10, 25); for (let i = 0; i < 5; i++) base.push(mid + ri(-3, 3));
    const high = Math.random() < 0.6, o = high ? mid + ri(25, 60) : Math.max(0, mid - ri(12, 18));
    const data = shuf([...base, o]), t = ri(0, 2);
    if (t === 0) return Q(`Which value is the outlier in this data? ${data.join(", ")}`, o, ["An outlier is a value that is far away from all the others.", "Most of the numbers sit close together. Which one is set apart from the group?", "Example: in 5, 6, 7, 6, 31 the number 31 is the outlier, because the rest are all near 6. Now do yours."]);
    if (t === 1) return C(`This data has an outlier: ${data.join(", ")}. Which measure of center describes a typical value better?`, "the median", ["the mean"], ["An outlier can pull the mean toward it.", "The median is the middle value, so one very big or very small number hardly changes it.", "Example: for 2, 3, 4, 3, 90 the mean is 20, but a typical value is about 3, which the median shows. Now do yours."]);
    return C(`The data ${data.join(", ")} has a ${high ? "very high" : "very low"} outlier. If the outlier is removed, what happens to the mean?`, high ? "it gets smaller" : "it gets larger", [high ? "it gets larger" : "it gets smaller", "it stays the same"], ["Think about which way the outlier was pulling the mean.", high ? "A very high number pulls the mean up. Take it away and the mean comes back down." : "A very low number pulls the mean down. Take it away and the mean moves back up.", "Example: 4, 5, 6 and 50 have a high mean. Without 50 the mean is 5, a lot lower. Now do yours."]);
  };
  const pctOfQ = () => {
    let w, p, part;
    do { w = pick([4, 5, 10, 20, 25, 40, 50, 200]); part = ri(1, w - 1); p = part * 100 / w; } while (p !== Math.floor(p));
    const s = pick([`Mia answered ${part} out of ${w} quiz questions correctly. What percent is that?`, `A team won ${part} of its ${w} games. What percent of the games did it win?`, `${part} out of ${w} seeds sprouted. What percent sprouted?`]);
    return Q(s, p, ["A percent is a part out of 100. Write the part and the whole as a fraction first.", "Make an equivalent fraction with 100 on the bottom, or divide the part by the whole and multiply by 100.", "Example: 3 out of 5. 3/5 = 60/100, so it is 60%. Now do yours."]);
  };
  const absWorld = () => {
    const t = ri(0, 2);
    if (t === 0) { const d = ri(3, 20), e = ri(2, 15); return Q(`A diver is ${d} meters below sea level (−${d}). A bird flies ${e} meters above sea level. How many meters apart are they?`, d + e, ["Sea level is zero. One is below zero and one is above.", "When numbers are on opposite sides of zero, add their distances from zero.", "Example: a fish at −6 and a gull at 9 are 6 + 9 = 15 meters apart. Now do yours."]); }
    if (t === 1) { const b = ri(5, 90); return Q(`Sam's bank balance is −$${b}. How many dollars does Sam owe?`, b, ["A negative balance means money is owed.", "The amount owed is the distance from zero, which is the absolute value.", "Example: a balance of −$30 means $30 is owed. Now do yours."]); }
    let a = ri(2, 15), b = ri(2, 15); while (a === b) b = ri(2, 15);
    const lo = Math.max(a, b);
    return C(`Which temperature is colder: −${a}°C or −${b}°C?`, `-${lo}°C`, [`-${Math.min(a, b)}°C`], ["Colder means farther down the number line, to the left.", "For negative numbers, the one with the bigger number part is farther from zero, so it is smaller.", "Example: −2°C and −9°C. −9 is farther below zero, so −9°C is colder. Now do yours."]);
  };
  const eqStory = () => {
    const v = pick(["x", "n", "t"]), t = ri(0, 3), a = ri(3, 12), b = a + ri(4, 20), p = ri(2, 9), q = ri(3, 12), nm = pick(["Mia", "Leo", "Ava", "Sam", "Zoe", "Max"]);
    if (t === 0) return CL(`${nm} had some stickers (${v}). After getting ${a} more, ${nm} has ${b} stickers. Which equation fits?`, `${v} + ${a} = ${b}`, [`${v} - ${a} = ${b}`, `${a}${v} = ${b}`, `${v} + ${b} = ${a}`], ["Ask: what happened to the starting amount? Was something added, taken away, multiplied or shared?", "\"Got more\" means the unknown amount plus something. The total is on the other side of the equals sign.", "Example: Kim had some marbles (m) and found 5 more. Now she has 12. The equation is m + 5 = 12. Now do yours."]);
    if (t === 1) return CL(`${nm} had some stickers (${v}). After giving away ${a}, ${nm} has ${b - a} stickers left. Which equation fits?`, `${v} - ${a} = ${b - a}`, [`${v} + ${a} = ${b - a}`, `${a}${v} = ${b - a}`, `${v} - ${b - a} = ${a}`.replace(/.*/, `${v} ÷ ${a} = ${b - a}`)], ["Ask: what happened to the starting amount?", "\"Gave away\" means the unknown amount minus something. What is left is on the other side.", "Example: Kim had some marbles (m) and lost 4. She has 9 left. The equation is m − 4 = 9. Now do yours."]);
    if (t === 2) return CL(`${p} boxes each hold the same number of pencils (${v}). There are ${p * q} pencils in all. Which equation fits?`, `${p}${v} = ${p * q}`, [`${v} + ${p} = ${p * q}`, `${v} ÷ ${p} = ${p * q}`, `${v} - ${p} = ${p * q}`], ["Equal groups point to multiplication.", "The number of boxes times the number in each box makes the total.", "Example: 3 bags each hold the same number of apples (a), 15 in all: 3a = 15. Now do yours."]);
    return CL(`${nm} shares some candies (${v}) equally among ${p} friends. Each friend gets ${q} candies. Which equation fits?`, `${v} ÷ ${p} = ${q}`, [`${p}${v} = ${q}`, `${v} + ${p} = ${q}`, `${v} - ${p} = ${q}`], ["Sharing equally points to division.", "The unknown amount is split into equal groups, and one group has the amount each friend gets.", "Example: some cookies (c) shared among 4 kids, 3 each: c ÷ 4 = 3. Now do yours."]);
  };
  const formulaQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const l = ri(3, 15), w = ri(2, 10); return Q(`Use P = 2l + 2w to find the perimeter when l = ${l} and w = ${w}.`, 2 * l + 2 * w, ["A formula uses letters for measures. Replace each letter with its number.", "Work out 2 × l and 2 × w, then add them.", "Example: l = 7 and w = 3 gives P = 2 × 7 + 2 × 3 = 14 + 6 = 20. Now do yours."]); }
    if (t === 1) { const l = ri(3, 15), w = ri(2, 12); return Q(`The area of a rectangle is A = l × w. The area is ${l * w} and l = ${l}. What is w?`, w, ["Put the numbers you know into the formula, and you get a simple equation.", "The equation is l × w = A. Undo the multiplication by dividing the area by the length.", "Example: area 40, l = 8. 8 × w = 40, so w = 40 ÷ 8 = 5. Now do yours."]); }
    if (t === 2) { const r = ri(5, 25), tm = ri(2, 9); return Q(`Use d = r × t to find d when r = ${r} and t = ${tm}.`, r * tm, ["The letters stand for distance (d), rate (r) and time (t). Replace r and t with their numbers.", "Multiply the rate by the time.", "Example: r = 12 and t = 3 gives d = 12 × 3 = 36. Now do yours."]); }
    const l = ri(2, 8), w = ri(2, 7), h = ri(2, 6);
    return Q(`Use V = l × w × h. A box has volume ${l * w * h}, l = ${l} and w = ${w}. What is h?`, h, ["Put the numbers you know into the formula. The only unknown is h.", `First multiply l × w. Then divide the volume by that product to find h.`, "Example: V = 60, l = 5, w = 3. 5 × 3 = 15, and 60 ÷ 15 = 4. Now do yours."]);
  };
  const numLineIneq = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const c = ri(-5, 12), open = Math.random() < 0.5, right = Math.random() < 0.5, sym = right ? (open ? ">" : "≥") : (open ? "<" : "≤");
      const all = [">", "≥", "<", "≤"];
      return CL(`On a number line there is a${open ? "n open" : " closed"} circle at ${c} and the shading goes to the ${right ? "right" : "left"}. Which inequality is shown?`, `x ${sym} ${c}`, all.filter(s => s !== sym).map(s => `x ${s} ${c}`), [
        "Two things decide the symbol: the direction of the shading and whether the circle is open or closed.", "Shading to the right means greater; to the left means less. A closed circle means the number is included (the line under the symbol).", "Example: a closed circle at 2 with shading to the left shows x ≤ 2. Now do yours."]);
    }
    if (t === 1) {
      const c = ri(10, 60), k = pick([["at most", `A bus holds at most ${c} riders. Which number of riders is possible?`, 1], ["at least", `You need at least ${c} points to win. Which score wins?`, -1], ["fewer than", `Fewer than ${c} tickets are left. Which number of tickets could be left?`, 1], ["more than", `A tank must have more than ${c} liters. Which amount works?`, -1]]);
      const ok = k[2] === 1 ? (k[0] === "at most" ? c - ri(0, 6) : c - ri(1, 6)) : (k[0] === "at least" ? c + ri(0, 6) : c + ri(1, 6));
      const bad = k[2] === 1 ? [c + ri(1, 5), c + ri(6, 10), k[0] === "at most" ? c + 1 : c] : [c - ri(1, 5), c - ri(6, 10), k[0] === "at least" ? c - 1 : c];
      return C(k[1], ok, bad, ["Turn the words into an inequality first, then test each choice.", k[0] === "at most" || k[0] === "at least" ? "\"At most\" and \"at least\" allow the number itself." : "\"More than\" and \"fewer than\" do NOT allow the number itself.", "Example: \"at most 10\" means 10 or fewer. 8 works and 12 does not. Now do yours."]);
    }
    const a = ri(2, 9), x = ri(1, 12), b = a + x + ri(-2, 2), op = pick([">", "<", "≥", "≤"]);
    const ok = (op === ">" && x + a > b) || (op === "<" && x + a < b) || (op === "≥" && x + a >= b) || (op === "≤" && x + a <= b);
    return C(`Is x = ${x} a solution of x + ${a} ${op} ${b}?`, ok ? "Yes" : "No", [ok ? "No" : "Yes"], ["Replace x with the number and work out the left side first.", "Compare the result with the other side using the symbol. Is the statement true?", "Example: is x = 4 a solution of x + 3 > 8? 4 + 3 = 7, and 7 > 8 is false, so no. Now do yours."]);
  };
  const likeTerms = () => {
    const t = ri(0, 2), p = ri(2, 9), q = ri(1, 9), r = ri(2, 9), s = ri(1, 9);
    if (t === 0) return C(`Simplify: ${p}x + ${q} + ${r}x + ${s}`, `${p + r}x + ${q + s}`, [`${q + s}x + ${p + r}`, `${p + r + q + s}x`, `${p * r}x + ${q + s}`, `${p + r}x + ${q}`], ["Group the terms with x together, and group the plain numbers together.", "Add the numbers in front of x. Then add the plain numbers separately. They cannot be added to the x terms.", "Example: 2x + 5 + 3x + 1 = (2 + 3)x + (5 + 1) = 5x + 6. Now do yours."]);
    if (t === 1) { const big = p + r; return C(`Simplify: ${big}x + ${q} - ${r}x`, `${p}x + ${q}`, [`${p}x - ${q}`, `${big + r}x + ${q}`, `${p + q}x`, `${big - q}x + ${r}`], ["Like terms have the same letter part. Find the two terms that have x.", "Subtract the numbers in front of x. The plain number stays as it is.", "Example: 9x + 4 − 5x = (9 − 5)x + 4 = 4x + 4. Now do yours."]); }
    const k = pick(["x", "y", "n"]), o = pick(["x", "y", "n"].filter(z => z !== k));
    return C(`Which two terms are like terms?`, `${p}${k} and ${r}${k}`, [`${p}${k} and ${r}${o}`, `${p}${k} and ${r}`, `${p}${k} and ${r}${k}^2`], ["Like terms have exactly the same letter part (same letter, same exponent).", "The numbers in front can be different. Look only at what comes after the number.", "Example: 3a and 7a are like terms, but 3a and 7b are not, and neither are 3a and 7a^2. Now do yours."]);
  };
  const orderFDP = () => {
    const pool = shuf([5, 10, 20, 25, 30, 40, 45, 50, 60, 70, 75, 80, 90]).slice(0, 4), most = Math.random() < 0.5;
    const form = (p, i) => [`${p}%`, String(p / 100), frI(p, 100)][(i + ri(0, 2)) % 3];
    const forms = pool.map((p, i) => form(p, i));
    if (new Set(forms).size < 4) return orderFDP();
    const target = most ? Math.max(...pool) : Math.min(...pool), ans = forms[pool.indexOf(target)];
    return C(`Which number is the ${most ? "greatest" : "least"}?`, ans, forms.filter((f, i) => pool[i] !== target), [
      "These numbers are written in different forms. Change them all to the same form before you compare.", "Change each one to a decimal (or a percent). A percent is a fraction out of 100, so 25% = 0.25.", "Example: 3/5, 0.55 and 58%. As decimals: 0.6, 0.55 and 0.58. The greatest is 3/5. Now do yours."]);
  };
  const l14 = [
    L("Converting with ratio tables", convQ, [S("Unit ratio", "1 yard = 3 feet", "Every unit conversion is a ratio."), S("Ratio table", "1→3, 2→6, 3→9", "Scale both numbers by the same amount."), S("Direction", "big → small: ×", "Small units to big units: divide. Big to small: multiply.")]),
    L("Area of triangles", triArea, [S("Half a rectangle", "📐", "A triangle is half of a rectangle with the same base and height."), S("Formula", "A = b × h ÷ 2", "Multiply base by height, then halve."), S("Height", "↕", "The height goes straight up from the base at a right angle.")]),
    L("Parallelograms and trapezoids", paraTrap, [S("Parallelogram", "▱ A = b × h", "Slide a corner to make a rectangle. Use the straight-up height."), S("Trapezoid", "⏢", "A trapezoid has two parallel sides (bases)."), S("Trapezoid area", "(b₁ + b₂) × h ÷ 2", "Add the bases, multiply by the height, halve.")]),
    L("Area of composite shapes", composite, [S("Split it", "⬛➕🔺", "Cut a shape into rectangles and triangles."), S("Add or subtract", "whole − hole", "Add the pieces, or subtract a cut-out from a big shape."), S("Units", "square cm", "Area is always in square units.")]),
    L("Surface area of boxes", surfArea, [S("All the faces", "📦", "Surface area is the total area of every face."), S("Matching pairs", "top=bottom, front=back", "A box has 3 pairs of equal faces. Find each area and add."), S("A net", "✚", "Unfold a box flat. The net shows every face once.")]),
    L("Volume with fraction edges", fracVol, [S("Same formula", "V = l × w × h", "Volume works the same with fractions."), S("Multiply fractions", "1/2 × 1/2 × 3/2 = 3/8", "Multiply the tops and the bottoms."), S("Small cubes", "8 half-cubes = 1", "A cube with edge 1/2 fits 8 times in a unit cube.")]),
    L("Shapes on the coordinate plane", polyCoord, [S("Match numbers", "(1,2) (5,2)", "In a rectangle, corners on the same side share x or y."), S("Side lengths", "|5 − 1| = 4", "Find a side by taking the difference of the matching numbers."), S("Then use formulas", "A = l × w", "Perimeter and area follow from the side lengths.")]),
    L("Reading frequency tables and dot plots", freqTable, [S("Dot plot", "●●●", "Each dot shows one value or person."), S("Totals", "2 + 3 + 1", "Add all the dots to find how many in all."), S("Mode", "tallest column", "The mode is the value with the most dots.")]),
    L("Mean absolute deviation", madQ, [S("Spread", "↔", "MAD measures how far numbers are from the mean on average."), S("Find distances", "|7 − 5| = 2", "Distance from the mean, ignoring signs."), S("Average them", "total ÷ count", "Add the distances and divide by how many numbers.")]),
    L("Quartiles and box plots", fiveNum, [S("Five numbers", "min, Q1, median, Q3, max", "A box plot shows five numbers."), S("Range", "max − min", "The range is the whole spread."), S("IQR", "Q3 − Q1", "The interquartile range is the length of the box: the middle half.")]),
    L("Outliers", outlierQ, [S("Far away", "5, 6, 6, 7, 40", "An outlier is a value far from the rest."), S("Effect", "mean moves a lot", "An outlier pulls the mean toward it."), S("Median", "stays steady", "The median hardly changes, so it is better with outliers.")]),
    L("What percent is it?", pctOfQ, [S("Out of 100", "3/5 = 60/100", "A percent is a fraction with 100 on the bottom."), S("Divide", "3 ÷ 5 = 0.6", "Or divide the part by the whole."), S("Times 100", "0.6 → 60%", "Multiply by 100 to get the percent.")]),
    L("Distance and absolute value in stories", absWorld, [S("Zero is a place", "🌊 sea level", "Zero can be sea level, no money, or freezing."), S("Opposite sides", "−6 and 9: 6 + 9", "Add the distances when one is below zero and one above."), S("Colder", "−9 &lt; −2", "More negative means lower or colder.")]),
    L("Writing equations from stories", eqStory, [S("Pick the operation", "+ − × ÷", "Get more: add. Lose some: subtract. Equal groups: multiply. Share: divide."), S("Unknown letter", "n", "Use a letter for what you do not know."), S("Equation", "n + 5 = 12", "Write the story as an equation.")]),
    L("Using formulas", formulaQ, [S("Letters stand in", "P = 2l + 2w", "A formula uses letters for measures."), S("Substitute", "l = 7, w = 3", "Replace the letters with numbers."), S("Backwards", "A = l × w, find w", "Sometimes you know the answer and need a letter: undo the operation.")]),
    L("Inequalities on number lines", numLineIneq, [S("Open or closed", "○ ●", "Open circle: not included. Closed circle: included."), S("Direction", "← →", "Shade right for greater, left for less."), S("Words", "at most, at least", "Turn words into symbols, then test numbers.")]),
    L("Combine like terms", likeTerms, [S("Like terms", "3x and 5x", "Same letter part. You can combine them."), S("Add the numbers", "3x + 5x = 8x", "The letter stays the same."), S("Not like", "3x and 5", "A letter term and a plain number cannot combine.")]),
    L("Fractions, decimals and percents", orderFDP, [S("Same thing", "1/2 = 0.5 = 50%", "These are three ways to write the same amount."), S("Convert", "25% = 0.25", "Percent ÷ 100 = decimal."), S("Compare", "same form first", "Change them all to decimals before comparing.")])
  ];
  l14.push(mixOf("Mixed practice", [l14[1], l14[2], l14[4], l14[8], l14[9], l14[11], l14[16]]));
  l14.push(mixOf("Level 14 Challenge", [l14[0], l14[3], l14[5], l14[6], l14[7], l14[10], l14[12], l14[13], l14[14], l14[15], l14[17]]));

  // ================= LEVEL 15 =================
  const nz0 = (lo, hi) => { let x; do { x = ri(lo, hi); } while (x === 0); return x; };
  const addInts = () => {
    const a = nz0(-15, 15), b = nz0(-15, 15); if (a > 0 && b > 0) return addInts();
    return N(`${par(a)} + ${par(b)} = ?`, a + b, ["Picture a number line. Adding a positive number moves right; adding a negative number moves left.",
      "Same signs: add the numbers and keep the sign. Different signs: subtract the smaller distance from the larger, and keep the sign of the number farther from zero.", "Example: (−6) + 2. Different signs: 6 − 2 = 4, and −6 is farther from zero, so the answer is −4. Now do yours."]);
  };
  const subInts = () => {
    const a = nz0(-12, 12), b = nz0(-12, 12);
    return N(`${par(a)} − ${par(b)} = ?`, a - b, ["Subtracting is the same as adding the opposite. Change the − into a + and flip the sign of the second number.",
      "Rewrite it as an addition problem, then use the rules for adding integers (same sign: add; different signs: subtract).", "Example: 3 − (−5) = 3 + 5 = 8, and (−4) − 2 = (−4) + (−2) = −6. Now do yours."]);
  };
  const mulInts = () => {
    const a = nz0(-9, 9), b = nz0(-9, 9);
    return N(`${par(a)} × ${par(b)} = ?`, a * b, ["First find the sign. Then multiply the numbers as if they were positive.",
      "Same signs give a positive answer. Different signs give a negative answer.", "Example: (−4) × 3 = −12 (different signs), and (−5) × (−2) = 10 (same signs). Now do yours."]);
  };
  const divInts = () => {
    const d = nz0(-9, 9), q = nz0(-12, 12);
    return N(`${m(d * q)} ÷ ${par(d)} = ?`, q, ["Division follows the same sign rules as multiplication.", "Divide the numbers as if they were positive. Then decide the sign: same signs give positive, different signs give negative.", "Example: −24 ÷ 6 = −4 (different signs), and −24 ÷ (−6) = 4 (same signs). Now do yours."]);
  };
  const opsInts = () => {
    const a = ri(-9, -2), b = ri(2, 9), c = ri(2, 20), d = ri(2, 6), k = ri(2, 7), t = ri(0, 4);
    const f = [
      [`${par(a)} × ${b} + ${c}`, a * b + c], [`${c} − ${b} × ${par(a)}`, c - b * a], [`${m(-d * k)} ÷ ${d} + ${c}`, -k + c],
      [`(${m(a)} + ${b}) × ${par(-d)}`, (a + b) * -d], [`(${m(a)})<sup>2</sup> − ${c}`, a * a - c]][t];
    return N(`Find the value of ${f[0]}`, f[1], ["Follow the order of operations: parentheses, exponents, then multiply and divide, then add and subtract.", "Do the multiplication or division first, with the sign rules. Then add or subtract from left to right.", "Example: 5 + (−3) × 4 = 5 + (−12) = −7. Now do yours."]);
  };
  const decAddSub = () => {
    const a = nz0(-90, 90) / 10, b = nz0(-90, 90) / 10, sub = Math.random() < 0.5, v = Math.round((sub ? a - b : a + b) * 100) / 100;
    return N(`${m(a)} ${sub ? "−" : "+"} ${par(b)} = ?`, v, [
      "Line up the decimal points and use the same rules as for integers.", sub ? "Change the subtraction to adding the opposite. Then use the rules for adding numbers with signs." : "Same signs: add and keep the sign. Different signs: subtract the smaller distance from the larger.",
      "Example: −2.5 + 4.75 = 4.75 − 2.5 = 2.25 (the positive number is farther from zero). Now do yours."], { step: 0.1 });
  };
  const fs = (n, d) => (n < 0 ? `−${-n}/${d}` : `${n}/${d}`);
  const fp = (n, d) => (n < 0 ? `(−${-n}/${d})` : `${n}/${d}`);
  const fracSigned = () => {
    const d1 = pick([2, 3, 4, 5, 6, 8]), d2 = pick([2, 3, 4, 5, 6, 8]), n1 = nz0(-(d1 - 1), d1 - 1), n2 = nz0(-(d2 - 1), d2 - 1), sub = Math.random() < 0.5;
    const num = n1 * d2 + (sub ? -n2 : n2) * d1, den = d1 * d2, other = n1 * d2 + (sub ? n2 : -n2) * d1;
    return C(`${fs(n1, d1)} ${sub ? "−" : "+"} ${fp(n2, d2)} = ?`, frI(num, den), [frI(n1 + n2, d1 + d2), frI(-num, den), frI(other, den), frI(num, d1 + d2)], [
      "Find a common denominator first. Then work with the top numbers, using the integer sign rules.", sub ? "Subtracting means adding the opposite. Then add the top numbers (with their signs) over the common denominator." : "Rewrite both fractions with the common denominator, add the top numbers using the sign rules, and keep the bottom.",
      "Example: −1/2 + 1/4 = −2/4 + 1/4 = −1/4. Now do yours. Simplify if you can."]);
  };
  const fracMulDiv = () => {
    const d1 = pick([2, 3, 4, 5, 6, 8]), d2 = pick([2, 3, 4, 5, 6, 8]), n1 = nz0(-(d1 - 1), d1 - 1), n2 = nz0(-(d2 - 1), d2 - 1), div = Math.random() < 0.5;
    const ans = div ? frI(n1 * d2, d1 * n2) : frI(n1 * n2, d1 * d2), alt = div ? frI(n1 * n2, d1 * d2) : frI(n1 * d2, d1 * n2);
    return C(`${fs(n1, d1)} ${div ? "÷" : "×"} ${fp(n2, d2)} = ?`, ans, [alt, frI(-(div ? n1 * d2 : n1 * n2), div ? d1 * n2 : d1 * d2), frI(n1 * d2 + n2 * d1, d1 * d2), frI(n1 * n2, d1 + d2)], [
      "Fractions follow the same sign rules as integers: same signs give a positive answer, different signs give a negative.",
      div ? "For division, keep the first fraction, flip the second one (reciprocal), and multiply. Then decide the sign and simplify." : "Multiply the tops and multiply the bottoms. Then decide the sign and simplify.",
      div ? "Example: (−1/2) ÷ (1/4) = (−1/2) × 4 = −2. Now do yours." : "Example: (−2/3) × (3/4) = −6/12 = −1/2. Now do yours."]);
  };
  const fracToDec = () => {
    if (Math.random() < 0.5) {
      const d = pick([2, 4, 5, 8, 10, 20, 25, 40]), n = ri(1, d - 1);
      return Q(`Write ${n}/${d} as a decimal.`, Math.round(n / d * 10000) / 10000, ["A fraction is a division: the top number divided by the bottom number.", "Divide the top by the bottom with long division, or make the bottom 10, 100 or 1,000 by multiplying the top and bottom by the same number.", "Example: 7/20 = 35/100 = 0.35, and 3/8 = 3 ÷ 8 = 0.375. Now do yours."]);
    }
    const d = pick([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 20]), n = ri(1, d - 1), g = gcd(n, d); let r = d / g; while (r % 2 === 0) r /= 2; while (r % 5 === 0) r /= 5;
    return C(`Does ${n}/${d} become a terminating decimal (it ends) or a repeating decimal (it goes on forever)?`, r === 1 ? "it terminates" : "it repeats", [r === 1 ? "it repeats" : "it terminates"], [
      "First simplify the fraction. Then look at the prime factors of the bottom number.", "If the simplified bottom number has only 2s and 5s as prime factors, the decimal ends. Any other prime factor, like 3 or 7, makes it repeat.", "Example: 3/12 = 1/4 and 4 = 2 × 2, so it ends (0.25). 2/9: 9 = 3 × 3, so it repeats (0.222…). Now do yours."]);
  };
  const constK = () => {
    const t = ri(0, 2), k = pick([2, 3, 4, 5, 6, 7, 8, 9, 12, 1.5, 2.5, 3.5, 0.5]);
    if (t === 0) {
      const s = new Set(); while (s.size < 3) s.add(ri(1, 10));
      const xs = [...s].sort((a, b) => a - b), f = x => Math.round(k * x * 100) / 100;
      return Q(`x: ${xs.join(", ")} &nbsp;→&nbsp; y: ${xs.map(f).join(", ")}<br>y is proportional to x. What is the constant of proportionality (k)?`, k, ["In a proportional relationship, y ÷ x is always the same number. That number is k.", "Pick one pair from the table and divide y by x.", "Example: x: 2, 4 and y: 10, 20. 10 ÷ 2 = 5, so k = 5 and y = 5x. Now do yours."]);
    }
    if (t === 1) {
      const yes = Math.random() < 0.5, c = ri(1, 5), k2 = ri(2, 6), xs = [1, 2, 3, 4], y = xs.map(x => k2 * x + (yes ? 0 : c));
      return C(`x: ${xs.join(", ")} &nbsp;→&nbsp; y: ${y.join(", ")}<br>Is y proportional to x?`, yes ? "Yes" : "No", [yes ? "No" : "Yes"], ["Proportional means y ÷ x is the SAME number for every pair.", "Divide y by x for the first two pairs. Do you get the same answer both times?", "Example: x: 1, 2 and y: 3, 5. 3 ÷ 1 = 3 but 5 ÷ 2 = 2.5, so not proportional. Now do yours."]);
    }
    const h = ri(2, 12), kk = pick([6, 7, 8, 9, 12, 15, 2.5, 7.5]);
    return Q(`Leo earns $${kk} for each hour he works, so y = ${kk}x, where x is the hours. How many dollars does he earn in ${h} hours?`, Math.round(kk * h * 100) / 100, ["The equation y = kx tells how to get y from x. Here k is the amount earned in ONE hour.", "Replace x with the number of hours and multiply.", "Example: y = 4x with x = 5 gives y = 4 × 5 = 20. Now do yours."]);
  };
  const solveProp = () => {
    if (Math.random() < 0.55) {
      const p = pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 7], [3, 8], [5, 7], [4, 9]]), k = ri(2, 9), a = p[0], b = p[1], c = a * k, d = b * k, u = ri(0, 3);
      const shown = [a, b, c, d], ans = shown[u]; shown[u] = "n";
      return Q(`Solve the proportion: ${shown[0]}/${shown[1]} = ${shown[2]}/${shown[3]}`, ans, ["In a proportion the two ratios are equal. Find what the known top numbers or bottom numbers were multiplied by.", "Look at one pair of numbers where both are known. The scale factor is how many times bigger one is than the other. Or cross multiply and divide.", "Example: 2/5 = 8/n. The tops go 2 → 8, which is × 4, so n = 5 × 4 = 20. Now do yours."]);
    }
    const r = pick([0.5, 0.75, 1.25, 1.5, 2.5, 3.5]), n1 = ri(2, 8); let n2 = ri(3, 12); while (n2 === n1) n2 = ri(3, 12);
    const it = pick(["pens", "apples", "notebooks", "stickers"]);
    return Q(`${n1} ${it} cost $${(r * n1).toFixed(2)}. At the same price, how many dollars do ${n2} ${it} cost?`, Math.round(r * n2 * 100) / 100, ["Equal prices make this a proportion. Find the cost of ONE first (the unit rate).", "Divide the total cost by the number of items to get the price of one. Then multiply by the new number of items.", "Example: 4 books cost $10. One costs 10 ÷ 4 = $2.50, so 6 books cost 6 × 2.50 = $15. Now do yours."]);
  };
  const scaleQ = () => {
    const un = pick([["cm", "km"], ["in", "ft"], ["cm", "m"], ["mm", "m"]]), s = pick([2, 4, 5, 10, 20, 25, 50, 100]), n = ri(2, 12), toReal = Math.random() < 0.5;
    if (toReal) return Q(`A map scale says 1 ${un[0]} = ${s} ${un[1]}. Two places are ${n} ${un[0]} apart on the map. How many ${un[1]} apart are they in real life?`, n * s, ["A scale is a ratio between the drawing and the real thing.", "Each map unit stands for a certain real distance. Multiply the map distance by the scale number.", "Example: scale 1 cm = 3 km. 5 cm on the map is 5 × 3 = 15 km. Now do yours."]);
    return Q(`A drawing uses a scale of 1 ${un[0]} = ${s} ${un[1]}. A real length is ${n * s} ${un[1]}. How long is it on the drawing, in ${un[0]}?`, n, ["A scale is a ratio between the drawing and the real thing.", "Each drawing unit stands for a certain real length. Divide the real length by the scale number.", "Example: scale 1 cm = 4 m. A real length of 20 m is 20 ÷ 4 = 5 cm on the drawing. Now do yours."]);
  };
  const pctChange = () => {
    const old = ri(1, 10) * 20, p = pick([5, 10, 15, 20, 25, 30, 40, 50, 60]), up = Math.random() < 0.5, nw = old * (up ? 100 + p : 100 - p) / 100, t = ri(0, 1);
    if (t === 0) return Q(`A price went from $${old} to $${nw}. What is the percent ${up ? "increase" : "decrease"}?`, p, ["Percent change compares the change to the ORIGINAL amount.", "Find how much it changed (subtract). Then divide that change by the original and write it as a percent.", "Example: from $50 to $60 is a change of 10. 10 ÷ 50 = 0.2, so a 20% increase. Now do yours."]);
    return Q(`A game costs $${old}. The price ${up ? "goes up" : "goes down"} by ${p}%. What is the new price in dollars?`, nw, ["Find the change first: the percent of the original price.", up ? "Add the change to the original price." : "Subtract the change from the original price.", "Example: $40 with a 25% increase. 25% of 40 is 10, so the new price is 40 + 10 = $50. Now do yours."]);
  };
  const markDisc = () => {
    const t = ri(0, 3);
    if (t === 0) { const P = ri(2, 12) * 20, d = pick([10, 15, 20, 25, 30, 40, 50]); return Q(`A jacket costs $${P}. It is ${d}% off. What is the sale price in dollars?`, P - P * d / 100, ["The discount is a percent of the original price.", "Find the discount amount, then subtract it from the price. (Or find what percent you still pay.)", "Example: $60 with 25% off. 25% of 60 is 15, so the sale price is 60 − 15 = $45. Now do yours."]); }
    if (t === 1) { const c = ri(2, 12) * 20, mk = pick([10, 20, 25, 30, 50, 100]); return Q(`A store buys a toy for $${c} and marks the price up by ${mk}%. What is the selling price in dollars?`, c + c * mk / 100, ["A markup is an extra percent of the cost that the store adds.", "Find the markup amount (percent of the cost), then add it to the cost.", "Example: cost $40, markup 50%. 50% of 40 is 20, so the selling price is 40 + 20 = $60. Now do yours."]); }
    if (t === 2) { const P = pick([25, 50, 75, 100, 150, 200, 250]), r = pick([4, 6, 8, 10]); return Q(`A bike costs $${P}. The sales tax is ${r}%. What is the total price in dollars?`, Math.round((P + P * r / 100) * 100) / 100, ["Sales tax is a percent of the price that gets added on.", "Find the tax amount, then add it to the price.", "Example: $50 with 8% tax. 8% of 50 is 4, so the total is $54. Now do yours."]); }
    const O = ri(2, 12) * 20, d = pick([10, 20, 25, 40, 50]), sale = O - O * d / 100;
    return Q(`After a ${d}% discount, a coat costs $${sale}. What was the original price in dollars?`, O, ["After the discount you pay only part of the original price. What percent do you pay?", `You pay ${100 - d}% of the original. Divide the sale price by that percent, then multiply by 100.`, "Example: after 20% off, a hat costs $24. You pay 80%. 24 ÷ 80 = 0.3 is 1%, and 0.3 × 100 = $30. Now do yours."]);
  };
  const simpleInt = () => {
    const P = ri(1, 20) * 100, r = pick([2, 3, 4, 5, 6, 8]), tm = ri(1, 6), I = P * r * tm / 100, t = ri(0, 2);
    const f = "Simple interest: I = P × r × t, where P is the money you start with, r is the yearly rate (as a decimal) and t is the number of years.";
    if (t === 0) return Q(`You put $${P} in an account that pays ${r}% simple interest per year. How many dollars of interest do you earn in ${tm} years?`, I, [f, `Change ${r}% to a decimal, then multiply P × r × t.`, "Example: $200 at 5% for 3 years. 200 × 0.05 × 3 = $30. Now do yours."]);
    if (t === 1) return Q(`You put $${P} in an account that pays ${r}% simple interest per year. How many dollars are in the account after ${tm} years?`, P + I, [f, "First find the interest. Then add it to the money you started with.", "Example: $200 at 5% for 3 years earns $30 in interest, so the account holds 200 + 30 = $230. Now do yours."]);
    return Q(`$${P} earns $${I} in simple interest at ${r}% per year. For how many years was it saved?`, tm, [f, "Find the interest for ONE year (P × r). Then see how many of those years make the total interest.", "Example: $300 at 4% earns $12 each year. If the total interest is $36, then 36 ÷ 12 = 3 years. Now do yours."]);
  };
  const twoStepEq = () => {
    const t = ri(0, 2), q = nz0(-12, 12), p = ri(2, 9);
    if (t === 0) { const x = nz0(-6, 12); return N(`Solve for x:  ${p}x ${sgn(q)} = ${m(p * x + q)}`, x, ["Two steps are needed. Undo the adding or subtracting first, then undo the multiplying.", "Add or subtract the same number on both sides to get the x term alone. Then divide both sides by the number in front of x.", "Example: 3x + 4 = 19. Subtract 4: 3x = 15. Divide by 3: x = 5. Now do yours."]); }
    if (t === 1) { const x = nz0(-6, 12); return N(`Solve for x:  ${p}x ${sgn(q)} = ${m(p * x + q)}`.replace(/^/, ""), x, ["Two steps are needed. Undo the adding or subtracting first, then undo the multiplying.", "Move the plain number to the other side by doing the opposite. Then divide both sides by the number in front of x.", "Example: 5x − 3 = 12. Add 3: 5x = 15. Divide by 5: x = 3. Now do yours."]); }
    const k = nz0(-5, 8), x = p * k;
    return N(`Solve for x:  x/${p} ${sgn(q)} = ${m(k + q)}`, x, ["Two steps are needed. Undo the adding or subtracting first, then undo the dividing.", "Do the opposite of the plain number on both sides. Then multiply both sides by the number x is divided by.", "Example: x/4 + 2 = 5. Subtract 2: x/4 = 3. Multiply by 4: x = 12. Now do yours."]);
  };
  const parenEq = () => {
    const p = ri(2, 8), q = nz0(-9, 9), x = nz0(-6, 12);
    return N(`Solve for x:  ${p}(x ${sgn(q)}) = ${m(p * (x + q))}`, x, ["There are two ways: divide both sides by the number outside first, or distribute and then solve.", "Divide both sides by the number outside the parentheses. Then undo the adding or subtracting inside.", "Example: 3(x + 2) = 18. Divide by 3: x + 2 = 6. Subtract 2: x = 4. Now do yours."]);
  };
  const twoStepIneq = () => {
    const flip = { ">": "<", "<": ">", "≥": "≤", "≤": "≥" }, op = pick([">", "<", "≥", "≤"]), n = nz0(-6, 10), p = ri(2, 8);
    if (Math.random() < 0.5) {
      const q = nz0(-12, 12), r = p * n + q;
      return CL(`Solve:  ${p}x ${sgn(q)} ${op} ${m(r)}`, `x ${op} ${n}`, [`x ${flip[op]} ${n}`, `x ${op} ${n + 1}`, `x ${flip[op]} ${-n}`], ["Solve it like an equation: undo the adding or subtracting first, then undo the multiplying.", "Dividing by a positive number does NOT flip the symbol. Keep the same symbol all the way.", "Example: 2x + 3 > 11. Subtract 3: 2x > 8. Divide by 2: x > 4. Now do yours."]);
    }
    const r = -p * n;
    return CL(`Solve:  −${p}x ${op} ${m(r)}`, `x ${flip[op]} ${n}`, [`x ${op} ${n}`, `x ${op} ${-n}`, `x ${flip[op]} ${-n}`], ["Solve it like an equation, but watch out for the number you divide by.", "When you divide (or multiply) both sides of an inequality by a NEGATIVE number, the symbol flips around.", "Example: −3x > 12. Divide by −3 and flip: x < −4. Now do yours."]);
  };
  const l15 = [
    L("Adding integers", addInts, [S("Number line", "← −3 −2 −1 0 1 2 3 →", "Adding a positive moves right. Adding a negative moves left."), S("Same signs", "(−3) + (−4) = −7", "Add the numbers and keep the sign."), S("Different signs", "(−6) + 2 = −4", "Subtract the smaller distance from the larger. Keep the sign of the number farther from zero.")]),
    L("Subtracting integers", subInts, [S("Add the opposite", "3 − (−5) = 3 + 5", "Subtracting a number is the same as adding its opposite."), S("Two negatives", "− (−5) → + 5", "Subtracting a negative gives a positive."), S("Then add", "= 8", "Use your rules for adding integers.")]),
    L("Multiplying integers", mulInts, [S("Signs", "(+)(+) = +   (−)(−) = +", "Same signs give a positive product."), S("Different", "(−4) × 3 = −12", "Different signs give a negative product."), S("Count", "odd negatives → −", "An odd number of negative factors gives a negative answer.")]),
    L("Dividing integers", divInts, [S("Same rules", "−24 ÷ 6", "Division follows the multiplication sign rules."), S("Signs", "−24 ÷ 6 = −4", "Different signs: negative."), S("Check", "−4 × 6 = −24 ✅", "Multiply the answer by the divisor to check.")]),
    L("Order of operations with integers", opsInts, [S("Same order", "( ) ^ × ÷ + −", "Parentheses, exponents, multiply and divide, then add and subtract."), S("Careful", "(−3)² = 9", "Square the negative number inside the parentheses to get a positive."), S("Step by step", "5 + (−3)×4 = −7", "Do one step at a time and keep the signs.")]),
    L("Adding and subtracting decimals with signs", decAddSub, [S("Line up", "−2.5 + 4.75", "Line up the decimal points."), S("Signs", "different signs: subtract", "Use the same rules as for integers."), S("Result", "= 2.25", "The sign matches the number farther from zero.")]),
    L("Adding and subtracting fractions with signs", fracSigned, [S("Common denominator", "−1/2 + 1/4 = −2/4 + 1/4", "Make the bottoms match first."), S("Tops with signs", "−2 + 1 = −1", "Use the integer rules on the tops."), S("Simplify", "−1/4", "Keep the bottom and simplify.")]),
    L("Multiplying and dividing fractions with signs", fracMulDiv, [S("Sign first", "(−)(+) = −", "Same signs: positive. Different: negative."), S("Multiply", "(−2/3) × (3/4) = −6/12", "Tops times tops, bottoms times bottoms."), S("Divide", "÷ → × the flip", "For division, flip the second fraction and multiply.")]),
    L("Fractions as decimals", fracToDec, [S("Divide", "3/8 = 3 ÷ 8 = 0.375", "A fraction is a division."), S("Terminating", "1/4 = 0.25", "Some decimals end."), S("Repeating", "1/3 = 0.333…", "Some decimals go on forever with a repeating digit.")]),
    L("Constant of proportionality", constK, [S("Same ratio", "y ÷ x", "In a proportional relationship y ÷ x is always the same number, k."), S("Equation", "y = kx", "Use k to write an equation."), S("Test", "3÷1, 5÷2 ≠", "If the ratios are not all equal, it is not proportional.")]),
    L("Solving proportions", solveProp, [S("Equal ratios", "2/5 = 8/n", "A proportion says two ratios are equal."), S("Scale factor", "2 × 4 = 8", "Find what the known numbers were multiplied by."), S("Unit rate", "$ for one", "Or find the cost of one and multiply.")]),
    L("Scale drawings", scaleQ, [S("A scale", "1 cm = 25 km", "A scale compares the drawing to the real thing."), S("To real life", "drawing × scale", "Multiply to find the real size."), S("To the drawing", "real ÷ scale", "Divide to find the drawing size.")]),
    L("Percent increase and decrease", pctChange, [S("Change", "new − old", "Find how much the amount changed."), S("Compare to the old", "change ÷ old", "Divide by the ORIGINAL amount."), S("Percent", "0.2 = 20%", "Then write it as a percent.")]),
    L("Discounts, markups and tax", markDisc, [S("Discount", "price − discount", "Take the percent off the price."), S("Markup and tax", "price + extra", "Add the percent on top of the price."), S("Backwards", "100% − 20% = 80%", "To find an original price, divide by the percent you paid.")]),
    L("Simple interest", simpleInt, [S("Interest", "💰", "Interest is money earned for saving money."), S("Formula", "I = P × r × t", "P is the starting money, r the yearly rate as a decimal, t the years."), S("Total", "P + I", "Add the interest to the starting money to get the total.")]),
    L("Two-step equations", twoStepEq, [S("Two steps", "3x + 4 = 19", "Undo adding or subtracting first."), S("Then undo ×", "3x = 15 → x = 5", "Then divide (or multiply) to get x alone."), S("Check", "3×5 + 4 = 19 ✅", "Put x back in to check.")]),
    L("Equations with parentheses", parenEq, [S("Divide first", "3(x + 2) = 18", "Divide both sides by the number outside."), S("Then undo", "x + 2 = 6 → x = 4", "Undo the plus or minus inside."), S("Or distribute", "3x + 6 = 18", "You can also distribute first and solve a two-step equation.")]),
    L("Two-step inequalities", twoStepIneq, [S("Like equations", "2x + 3 > 11", "Solve the same way as an equation."), S("Stay the same", "x &gt; 4", "Adding, subtracting, and dividing by a positive keep the symbol."), S("Flip!", "−3x &gt; 12 → x &lt; −4", "Dividing or multiplying by a NEGATIVE flips the symbol.")])
  ];
  l15.push(mixOf("Mixed practice", [l15[0], l15[1], l15[2], l15[3], l15[4], l15[12], l15[15]]));
  l15.push(mixOf("Level 15 Challenge", [l15[5], l15[6], l15[7], l15[8], l15[9], l15[10], l15[11], l15[13], l15[14], l15[16], l15[17]]));

  Object.assign(MATH_LEVELS, { 13: l13, 14: l14, 15: l15 });
})();
