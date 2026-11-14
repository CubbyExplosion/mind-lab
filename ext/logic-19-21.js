// ext/logic-19-21.js  Mind Lab Logic & Puzzles levels 19-21 (60 lessons)
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
  const neg = n => (n < 0 ? "−" + (-n) : String(n));
  const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const mixOf = ms => () => pick(ms)();
  const MIXS = topics => [
    S("Review time!", "🔄", "This lesson mixes puzzles from earlier lessons in this level. Take your time with each one."),
    S("Remember", "🧠", topics),
    S("Tip", "💡", "Work out what kind of puzzle it is first. Then use the method you learned for that kind.")
  ];
  const rhs = (m, b) => { let s = m === 1 ? "x" : m === -1 ? "−x" : m + "x"; if (b) s += (b < 0 ? " − " : " + ") + Math.abs(b); return s; };
  const quad = (a, b, c) => { let s = (a === 1 ? "" : a === -1 ? "−" : a) + "x²"; if (b) s += (b < 0 ? " − " : " + ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + "x"; if (c) s += (c < 0 ? " − " : " + ") + Math.abs(c); return s; };
  const poly = cs => {
    let s = "";
    cs.forEach((c, i) => {
      const d = cs.length - 1 - i; if (!c) return;
      const ac = Math.abs(c), body = (ac === 1 && d > 0 ? "" : ac) + (d === 0 ? "" : d === 1 ? "x" : "x" + ["", "", "²", "³", "⁴"][d]);
      s += s ? (c < 0 ? " − " : " + ") + body : (c < 0 ? "−" : "") + body;
    });
    return s;
  };
  const eqs = lines => `<div style="font-size:1.3em;line-height:1.6">${lines.join("<br>")}</div>`;
  const sub = (b, n) => `${b}<sub>${n}</sub>`;
  const lg = (b, x) => `log<sub>${b}</sub> ${x}`;

  // ======================= LEVEL 19 =======================
  const arithNth = () => {
    const a = ri(2, 12), d = ri(2, 9), seq = [0, 1, 2, 3].map(i => a + i * d).join(", ");
    if (Math.random() < 0.5) {
      const n = ri(6, 20);
      return num(`A pattern goes ${seq}, ... What is the ${n}th number in it?`, big("🪜"), a + (n - 1) * d, [
        "Each number adds the same jump. How many jumps lie between the first number and the one you want?",
        "The number of jumps is one less than the position. Multiply the jump size by that, then add it to the first number.",
        "Example: 4, 7, 10, ... The 6th number: 5 jumps of 3 is 15, and 4 + 15 = 19. Now do yours."]);
    }
    const k = ri(6, 25), v = a + (k - 1) * d;
    return num(`A pattern goes ${seq}, ... Which position is the number ${v} in?`, big("🪜"), k, [
      "Find the jump size first. Then see how far your number is above the first number.",
      "Take away the first number, divide by the jump size to count the jumps, then remember the first number has no jump before it.",
      "Example: 4, 7, 10, ... Where is 22? 22 − 4 = 18, 18 ÷ 3 = 6 jumps, so it is the 7th number. Now do yours."]);
  };
  const subst = () => {
    const x = ri(1, 8), p = ri(1, 4), q = ri(1, 6), y = p * x + q, r = ri(2, 5), s = ri(1, 4), t = r * x + s * y, askX = Math.random() < 0.5;
    return num(`Solve this pair. What is ${askX ? "x" : "y"}?`, eqs([`y = ${p === 1 ? "" : p}x + ${q}`, `${r}x + ${s === 1 ? "" : s}y = ${t}`]), askX ? x : y, [
      "One equation already says what y is equal to. Where could you use that in the other equation?",
      "Swap the whole expression for y into the other equation. Now only x is left. Solve for x, then go back for y if you need it.",
      "Example: y = 2x + 1 and x + y = 10. Then x + (2x + 1) = 10, so 3x = 9, x = 3, and y = 7. Now do yours."]);
  };
  const absEq = () => {
    const a = ri(5, 15), b = ri(1, a - 1), c = Math.random() < 0.5 ? 0 : ri(1, 6), larger = Math.random() < 0.5;
    const eq = c ? `|x − ${a}| + ${c} = ${b + c}` : `|x − ${a}| = ${b}`;
    return num(`Solve ${eq}. What is the ${larger ? "larger" : "smaller"} solution?`, big("📏"), larger ? a + b : a - b, [
      "Absolute value means distance from zero. First get the absolute value part alone on one side.",
      "The inside of the bars can be that distance forwards or backwards. Make two equations and solve both, then pick the one you are asked for.",
      "Example: |x − 5| = 2 means x − 5 = 2 or x − 5 = −2, so x = 7 or x = 3. Now do yours."]);
  };
  const compIneq = () => {
    for (;;) {
      const p = pick([2, 3, 4, 5]), q = ri(-6, 6), A = ri(-8, 10), C = A + ri(6, 30), sl = Math.random() < 0.5, sr = Math.random() < 0.5;
      if (!q) continue;
      let cnt = 0;
      for (let x = -60; x <= 60; x++) { const v = p * x + q; if ((sl ? v > A : v >= A) && (sr ? v < C : v <= C)) cnt++; }
      if (cnt < 3 || cnt > 9) continue;
      return num(`How many whole numbers x make this true?<br>${neg(A)} ${sl ? "&lt;" : "≤"} ${p}x ${q < 0 ? "−" : "+"} ${Math.abs(q)} ${sr ? "&lt;" : "≤"} ${neg(C)}`, big("↔️"), cnt, [
        "Do the same step to all three parts at once. Get x alone in the middle.",
        "Take away the plain number from all three parts, then divide all three by the number in front of x. Then list the whole numbers in between. Check the end symbols: ≤ includes the end.",
        "Example: 1 &lt; 2x + 1 ≤ 9. Take away 1: 0 &lt; 2x ≤ 8. Divide by 2: 0 &lt; x ≤ 4. The whole numbers are 1, 2, 3, 4, so that is 4 numbers. Now do yours."]);
    }
  };
  const variation = () => {
    if (Math.random() < 0.5) {
      const k = ri(2, 9), x1 = ri(2, 6), x2 = ri(7, 15);
      return num(`y varies directly with x (y = k × x). When x = ${x1}, y = ${k * x1}. What is y when x = ${x2}?`, big("📈"), k * x2, [
        "Direct variation means y is always the same number of times x. Find that number first.",
        "Divide a y-value by its x-value to find the multiplier. Then multiply the new x by it.",
        "Example: when x = 3, y = 12, so the multiplier is 4. When x = 5, y = 20. Now do yours."]);
    }
    const P = pick([12, 18, 24, 36, 48, 60]), ds = [2, 3, 4, 6, 9, 12].filter(d => P % d === 0), x1 = pick(ds), x2 = pick(ds.filter(d => d !== x1));
    const [u, w] = pick([["workers", "days"], ["pumps", "hours"], ["taps", "minutes"]]);
    return num(`${x1} ${u} finish a job in ${P / x1} ${w}. They all work at the same speed. How many ${w} would ${x2} ${u} need?`, big("🔁"), P / x2, [
      "More workers means the job takes less time. The total amount of work stays the same.",
      "Multiply the number of workers by the time to find the total work. Then divide that total by the new number of workers.",
      "Example: 4 pumps take 6 hours, so the total is 24. With 8 pumps it takes 24 ÷ 8 = 3 hours. Now do yours."]);
  };
  const discQ = () => {
    const target = pick(["two", "one", "none"]);
    for (;;) {
      const a = ri(1, 3), b = ri(-8, 8), c = ri(-6, 8), D = b * b - 4 * a * c;
      if (!b && !c) continue;
      if ((D > 0 ? "two" : D === 0 ? "one" : "none") !== target) continue;
      return mcq(`How many real solutions does ${quad(a, b, c)} = 0 have?`, big("🧮"), target === "two" ? "two different solutions" : target === "one" ? "exactly one solution" : "no real solutions",
        ["two different solutions", "exactly one solution", "no real solutions"], [
        "There is a number made from a, b and c that tells you how many solutions there are.",
        "Work out b² − 4ac. If it is above zero, the parabola crosses the x-axis twice. If it is exactly zero, it touches once. If it is below zero, it never reaches the axis.",
        "Example: x² + 2x + 5 = 0. b² − 4ac = 4 − 20 = −16. That is below zero, so the parabola never touches the x-axis. Now do yours."]);
    }
  };
  const vertexQ = () => {
    const h = ri(1, 8), a = ri(1, 4), k = ri(1, 9), c = a * h * h + k, askX = Math.random() < 0.5;
    return num(`The parabola is y = ${quad(a, -2 * a * h, c)}. ${askX ? "At what x is y the smallest?" : "What is the smallest value of y?"}`, big("🥣"), askX ? h : k, [
      "A parabola that opens up has a lowest point exactly in the middle of its two sides.",
      "The x of the lowest point is the opposite of the middle number, divided by two times the number in front of x². For the lowest y, put that x back into the equation.",
      "Example: y = x² − 6x + 11. The lowest x is 6 ÷ 2 = 3. Then y = 9 − 18 + 11 = 2. Now do yours."]);
  };
  const PR19 = [["even", x => x % 2 === 0], ["odd", x => x % 2 === 1], ["a multiple of 3", x => x % 3 === 0], ["a multiple of 5", x => x % 5 === 0], ["a multiple of 4", x => x % 4 === 0], ["bigger than 8", x => x > 8], ["bigger than 14", x => x > 14], ["less than 7", x => x < 7], ["less than 12", x => x < 12]];
  const condP = () => {
    for (;;) {
      const N = pick([12, 20, 24, 30]), ps = shuf(PR19).slice(0, 2), A = ps[0], B = ps[1];
      const all = Array.from({ length: N }, (_, i) => i + 1), inA = all.filter(A[1]), both = inA.filter(B[1]), inB = all.filter(B[1]);
      if (inA.length < 3 || both.length < 1 || both.length === inA.length) continue;
      const right = frs(both.length, inA.length);
      return mcq(`A number from 1 to ${N} is picked at random. <b>Given</b> that it is ${A[0]}, what is the chance that it is also ${B[0]}?`, big("🎲"), right,
        [frs(both.length, N), frs(both.length, inB.length), frs(inA.length, N), frs(inB.length, N)], [
        "The word 'given' shrinks the group. Only look at the numbers that fit the condition.",
        "Count how many numbers fit the condition. Then count how many of those ALSO fit the second thing. Write the second count over the first.",
        "Example: 1 to 10, given odd, chance of bigger than 6. The odd numbers are 1, 3, 5, 7, 9. Of those, 7 and 9 are bigger than 6. So the chance is 2/5. Now do yours."]);
    }
  };
  const expVal = () => {
    const n = pick([4, 5, 6, 8]); let vals, sum;
    do { vals = Array.from({ length: n }, () => pick([0, 0, 1, 2, 3, 4, 5, 6, 8, 10])); sum = vals.reduce((a, b) => a + b, 0); } while (sum % n !== 0 || sum === 0);
    const avg = sum / n, wheel = `A spinner has ${n} equal sectors with prizes of: ${vals.map(v => "$" + v).join(", ")}.`;
    if (Math.random() < 0.5) return num(`${wheel} On average, how many dollars does one spin win?`, big("🎡"), avg, [
      "Every sector is equally likely, so every prize counts the same.",
      "Add up all the prizes, then share the total equally among the sectors.",
      "Example: prizes $0, $2, $4, $6. The total is 12. Shared among 4 sectors, that is $3 each. Now do yours."]);
    const cost = Math.max(1, avg + pick([-2, -1, 0, 1, 2])), right = cost === avg ? "fair: it breaks even" : cost < avg ? "the player wins in the long run" : "the player loses in the long run";
    return mcq(`${wheel} It costs $${cost} to spin. In the long run, what happens?`, big("🎡"), right, ["fair: it breaks even", "the player wins in the long run", "the player loses in the long run"], [
      "First find the average prize for one spin. Then compare it with the cost.",
      "Add the prizes and share them among the sectors. If the average prize is the same as the cost, nobody gains. Otherwise see which one is bigger.",
      "Example: average prize $3 and cost $5. The cost is more than the average prize, so the player loses a little each spin. Now do yours."]);
  };
  const QN = [
    ["Every bird can fly.", "At least one bird cannot fly.", "No bird can fly.", "At least one bird can fly.", "A single bird that does not fit would already show the sentence is wrong."],
    ["All prime numbers are odd.", "At least one prime number is even.", "All prime numbers are even.", "No prime number is odd.", "To break an 'all' sentence you only need one example that does not fit."],
    ["Some squares are red.", "No square is red.", "All squares are red.", "Some squares are not red.", "'Some' is only false when there is not even one."],
    ["No cat likes swimming.", "At least one cat likes swimming.", "All cats like swimming.", "Some cat does not like swimming.", "'No cat' is wrong as soon as you find a single cat that does."],
    ["Every student in the class has a pet.", "At least one student has no pet.", "No student has a pet.", "Every student has no pet.", "One student without a pet is enough to break it. You do not need all of them."],
    ["All multiples of 4 are even.", "At least one multiple of 4 is odd.", "All multiples of 4 are odd.", "No multiple of 4 is even.", "The opposite of 'all' needs just one that does not fit."],
    ["Some months have 31 days.", "No month has 31 days.", "Every month has 31 days.", "Some months do not have 31 days.", "For 'some' to be false, you must be able to say 'none'."],
    ["No triangle has four sides.", "At least one triangle has four sides.", "Every triangle has four sides.", "Some triangle does not have four sides.", "A single example of what the sentence forbids makes it false."],
    ["Every dog in the park is friendly.", "At least one dog in the park is not friendly.", "No dog in the park is friendly.", "At least one dog in the park is friendly.", "You only need one dog that breaks the rule."]
  ];
  const quantNeg = () => {
    const [s, r, w1, w2, clue] = pick(QN);
    return mcq(`Which sentence is the <b>opposite</b> of: "${s}"`, big("🔀"), r, [w1, w2, "It cannot be known"].slice(0, 3), [
      "Ask yourself: what is the smallest thing that would prove this sentence wrong?", clue,
      "Example: the opposite of 'All socks are red' is 'At least one sock is not red', not 'No sock is red'. Now do yours."]);
  };
  const exactlyOne = () => {
    for (;;) {
      const PR = [["even", x => x % 2 === 0], ["odd", x => x % 2 === 1], ["a multiple of 3", x => x % 3 === 0], ["a multiple of 4", x => x % 4 === 0], ["a multiple of 5", x => x % 5 === 0], ["bigger than 10", x => x > 10], ["bigger than 15", x => x > 15], ["less than 8", x => x < 8], ["less than 5", x => x < 5], ["a square number", x => [1, 4, 9, 16].includes(x)], ["a prime number", x => [2, 3, 5, 7, 11, 13, 17, 19].includes(x)]];
      const ps = shuf(PR).slice(0, 3), sol = [];
      for (let x = 1; x <= 20; x++) if (ps.filter(p => p[1](x)).length === 1) sol.push(x);
      if (sol.length < 2 || sol.length > 6) continue;
      return num(`A secret number is from 1 to 20. <b>Exactly one</b> of these three clues is true (the other two are false):<br>• It is ${ps[0][0]}.<br>• It is ${ps[1][0]}.<br>• It is ${ps[2][0]}.<br>What is the <b>biggest</b> number it could be?`, big("🕵️"), sol[sol.length - 1], [
        "Try a number and count how many clues it makes true. You need exactly one, not two, not zero.",
        "Start from the biggest numbers and work down. The first number that makes exactly one clue true is your answer.",
        "Example: for the clues 'even' and 'bigger than 3', try 4: both are true, so 4 is out. Try 1: none are true, so 1 is out. Test each number like this. Now do yours."]);
    }
  };
  const sysCount = () => {
    const t = pick(["one", "none", "inf"]), m = ri(1, 5), b = ri(1, 8), k = ri(2, 3);
    let l2, right;
    if (t === "one") { const m2 = pick([-2, -1, 1, 2, 3, 4].filter(v => v !== m)); l2 = `y = ${rhs(m2, ri(1, 8))}`; right = "exactly one solution"; }
    else if (t === "none") { const c = b + pick([-2, -1, 1, 2, 3]); l2 = Math.random() < 0.5 ? `y = ${rhs(m, c)}` : `${k}y = ${rhs(k * m, k * c)}`; right = "no solution"; }
    else { l2 = `${k}y = ${rhs(k * m, k * b)}`; right = "infinitely many solutions"; }
    return mcq("How many solutions does this pair of lines have?", eqs([`y = ${rhs(m, b)}`, l2]), right, ["exactly one solution", "no solution", "infinitely many solutions"], [
      "Write both equations as y = something. Then compare the slopes and the starting heights.",
      "Lines with different slopes cross exactly once. Lines with the same slope never cross unless they are the very same line.",
      "Example: y = 2x + 1 and y = 2x + 4 have the same slope but start at different heights, so they never meet and have no solution. Now do yours."]);
  };
  const simSolids = () => {
    const [a, b] = pick([[1, 2], [2, 3], [1, 3], [2, 5], [3, 4], [1, 4], [3, 5]]), mode = pick(["area", "vol", "weight"]);
    if (mode === "area") { const m = ri(2, 9); return num(`Two similar shapes have matching sides in the ratio ${a} : ${b}. The smaller one has an area of ${a * a * m} cm². What is the area of the larger one in cm²?`, big("🔷"), m * b * b, [
      "When every length is scaled by the same factor, area does not scale by that same factor. Think of length times width.",
      "Area changes by the length ratio squared. Work out how many times bigger each length is, multiply it by itself, and use that.",
      "Example: sides in ratio 1 : 2, small area 5. Area ratio is 1 : 4, so the big area is 20. Now do yours."]); }
    if (mode === "vol") { const m = ri(2, 6); return num(`Two similar boxes have matching edges in the ratio ${a} : ${b}. The smaller box holds ${a ** 3 * m} cm³. How many cm³ does the larger box hold?`, big("📦"), m * b ** 3, [
      "Volume has three directions: length, width and height. All three get scaled.",
      "Volume changes by the length ratio multiplied by itself three times. Scale it up from the small box.",
      "Example: edges in ratio 1 : 2, small box 3 cm³. Volume ratio is 1 : 8, so the big box holds 24 cm³. Now do yours."]); }
    const m = ri(2, 6);
    return num(`Two statues have the same shape and are made of the same stone. They are ${a} m and ${b} m tall. The small one weighs ${a ** 3 * m} kg. How many kg does the tall one weigh?`, big("🗿"), m * b ** 3, [
      "Weight depends on how much stone there is, which is the volume.",
      "Scale the height ratio three times (length, width and depth) to get the weight ratio. Then scale the small weight up.",
      "Example: statues 1 m and 2 m tall, small one 4 kg. Weight ratio is 1 : 8, so the big one is 32 kg. Now do yours."]);
  };
  const ratCancel = () => {
    const a = ri(2, 9), n = ri(2, 12), t = pick(["sq", "fac", "common"]);
    if (t === "sq") { let x = n; if (x === a) x = a + 3; return num(`Simplify, then find the value of (x² − ${a * a}) ÷ (x − ${a}) when x = ${x}.`, big("✂️"), x + a, [
      "The top is a difference of two squares. Can you factor it so something matches the bottom?",
      "Factor the top into two brackets. One bracket matches the bottom, so cancel it. Then put the number in what is left.",
      "Example: (x² − 16) ÷ (x − 4) = (x − 4)(x + 4) ÷ (x − 4) = x + 4. At x = 6 that is 10. Now do yours."]); }
    if (t === "fac") { const b = ri(1, 9); return num(`Simplify, then find the value of (x² + ${a + b}x + ${a * b}) ÷ (x + ${a}) when x = ${n}.`, big("✂️"), n + b, [
      "Try to factor the top into two brackets. One of them should match the bottom.",
      "Find two numbers that multiply to the last number and add to the middle number. One of them goes with the bracket on the bottom. Cancel it and use what is left.",
      "Example: (x² + 7x + 10) ÷ (x + 2) = (x + 2)(x + 5) ÷ (x + 2) = x + 5. At x = 1 that is 6. Now do yours."]); }
    return num(`Simplify, then find the value of (x² + ${a}x) ÷ x when x = ${n}.`, big("✂️"), n + a, [
      "Both parts on top have a letter in common. Pull it out first.",
      "Take x out of the top as a common factor. It cancels with the x on the bottom. Put the number in what remains.",
      "Example: (x² + 5x) ÷ x = x + 5. At x = 2 that is 7. Now do yours."]);
  };
  const intercepts = () => {
    const a = ri(2, 7), b = ri(2, 7), m = ri(1, 5), c = a * b * m, askX = Math.random() < 0.5;
    return num(`The line ${a}x + ${b}y = ${c} crosses the ${askX ? "x" : "y"}-axis at what ${askX ? "x" : "y"}-value?`, big("✚"), askX ? b * m : a * m, [
      askX ? "On the x-axis the height is zero. What does that do to the y part?" : "On the y-axis the sideways position is zero. What does that do to the x part?",
      askX ? "Put zero in for y. The y part disappears. Then divide to find x." : "Put zero in for x. The x part disappears. Then divide to find y.",
      "Example: 2x + 3y = 12. For the x-intercept put y = 0: 2x = 12, so x = 6. Now do yours."]);
  };
  const stepFare = () => {
    if (Math.random() < 0.5) {
      const s = ri(2, 5), r = ri(2, 4), w = ri(1, 7), d = (w + pick([0.1, 0.3, 0.5, 0.7, 0.9])).toFixed(1);
      return num(`A taxi costs $${s} to start plus $${r} for every mile <b>or part of a mile</b>. How many dollars is a ${d}-mile trip?`, big("🚕"), s + r * Math.ceil(Number(d)), [
        "Part of a mile still gets charged as a whole mile. Round the trip up.",
        "Round the distance UP to the next whole number of miles. Multiply by the price per mile and add the starting fee.",
        "Example: $3 start plus $2 per mile or part, for 2.4 miles. Round up to 3 miles: 3 × 2 + 3 = $9. Now do yours."]);
    }
    const a = ri(3, 6), b = ri(2, 4), h = ri(1, 4), mm = pick([10, 20, 30, 40, 50]);
    return num(`Parking costs $${a} for the first hour, then $${b} for each extra hour <b>or part of an hour</b>. How many dollars for ${h} hour${h > 1 ? "s" : ""} and ${mm} minutes?`, big("🅿️"), a + b * h, [
      "The leftover minutes still count as another whole hour. Count how many hours you are charged for.",
      "Total hours charged is the whole hours plus one more for the extra minutes. The first hour has a different price from the rest.",
      "Example: $4 first hour, $2 per extra hour or part. For 2 hours 15 minutes you pay for 3 hours: 4 + 2 × 2 = $8. Now do yours."]);
  };
  const geoSum = () => {
    const a = ri(1, 4), r = pick([2, 2, 3]), n = r === 2 ? ri(4, 8) : ri(4, 5), t = Array.from({ length: n }, (_, i) => a * r ** i);
    return num(`Add up all ${n} numbers: ${t.slice(0, 4).join(" + ")} + ... (each is ${r} times the one before; the last is ${t[n - 1]}).`, big("➕"), t.reduce((x, y) => x + y, 0), [
      "Each number is the one before times the same multiplier. Adding them one at a time works, but there is a shortcut.",
      "Shortcut: first number × (multiplier to the power of how many numbers, minus 1) ÷ (multiplier minus 1).",
      "Example: 1 + 3 + 9 + 27 (4 numbers, times 3 each). 1 × (81 − 1) ÷ 2 = 40. Now do yours."]);
  };
  const TT = [["p AND (NOT q)", (p, q) => p && !q], ["NOT (p OR q)", (p, q) => !(p || q)], ["(p OR q) AND r", (p, q, r) => (p || q) && r], ["p → q  (if p then q)", (p, q) => !p || q], ["p XOR q  (exactly one is true)", (p, q) => p !== q], ["(p AND q) OR r", (p, q, r) => (p && q) || r], ["(NOT p) OR q", (p, q) => !p || q], ["p ↔ q  (both the same)", (p, q) => p === q], ["NOT (p AND q)", (p, q) => !(p && q)], ["(p → q) AND (q → r)", (p, q, r) => (!p || q) && (!q || r)]];
  const truthQ = () => {
    const [e, f] = pick(TT), p = Math.random() < 0.5, q = Math.random() < 0.5, r = Math.random() < 0.5, T = v => (v ? "TRUE" : "FALSE");
    return mcq(`p is ${T(p)}, q is ${T(q)} and r is ${T(r)}. Is <b>${e}</b> true or false?`, big("🔣"), f(p, q, r) ? "true" : "false", ["true", "false"], [
      "Put the true/false value in for each letter, then work from the inside out.",
      "AND needs both sides on. OR needs at least one side on. NOT flips the value. The arrow → breaks only when the first part holds and the second part does not.",
      "Example: p TRUE, q FALSE. 'p AND (NOT q)': NOT q is TRUE, then TRUE AND TRUE is TRUE. Now do yours."]);
  };

  // ======================= LEVEL 20 =======================
  const perfSq = () => {
    const h = ri(2, 12), t = pick(["sq", "root", "solve"]);
    if (t === "sq") return num(`What number completes the square? x² + ${2 * h}x + ? is a perfect square.`, big("🟦"), h * h, [
      "A perfect square looks like (x + something) times itself. Half of the middle number is that something.",
      "Take half of the middle number, then multiply it by itself.",
      "Example: x² + 10x + ? Half of 10 is 5, and 5 × 5 = 25. Now do yours."]);
    if (t === "root") return num(`x² − ${2 * h}x + ${h * h} = (x − ?)². What is the missing number?`, big("🟦"), h, [
      "Look at the last number. It must be the square of the number in the bracket.",
      "The number in the bracket is also half of the middle number (ignore the sign).",
      "Example: x² − 14x + 49 = (x − 7)², because 7 × 7 = 49 and 7 + 7 = 14. Now do yours."]);
    const k = h + ri(1, 8);
    return num(`Solve (x + ${h})² = ${k * k}. What is the positive solution?`, big("🟦"), k - h, [
      "Take the square root of both sides. Remember the square root of a perfect square.",
      "The number in the bracket must equal the root. Then take away the number that was added to x.",
      "Example: (x + 2)² = 25. Then x + 2 = 5, so x = 3. Now do yours."]);
  };
  const quadForm = () => {
    const a = pick([1, 2, 3]), r1 = ri(1, 6), r2 = r1 + ri(1, 5), b = -a * (r1 + r2), c = a * r1 * r2, t = pick(["root", "big", "small"]);
    const eq = `${quad(a, b, c)} = 0`;
    if (t === "root") return num(`For ${eq}, what is √(b² − 4ac), the square root part of the quadratic formula?`, big("🧮"), a * (r2 - r1), [
      "Find a, b and c from the equation. Keep the sign of b.",
      "Square b, then take away four times a times c. Then take the square root of the result.",
      "Example: x² − 6x + 5 = 0. b² = 36, 4ac = 20, 36 − 20 = 16, and √16 = 4. Now do yours."]);
    return num(`Use the quadratic formula on ${eq}. What is the ${t === "big" ? "larger" : "smaller"} solution?`, big("🧮"), t === "big" ? r2 : r1, [
      "The formula is x = (−b ± √(b² − 4ac)) ÷ 2a. Start with what is under the root.",
      "Work out the root part first. Then add it to −b for one answer and subtract it for the other, and divide by two times a.",
      "Example: x² − 6x + 5 = 0. √(36 − 20) = 4. x = (6 + 4) ÷ 2 = 5 or (6 − 4) ÷ 2 = 1. Now do yours."]);
  };
  const vieta = () => {
    const r1 = ri(1, 7), r2 = r1 + ri(1, 5), S1 = r1 + r2, P = r1 * r2, t = pick(["sq", "sum", "prod"]), a = ri(2, 4);
    if (t === "sq") return num(`The equation x² − ${S1}x + ${P} = 0 has two solutions. Without solving it, what is the sum of their squares?`, big("🪄"), r1 * r1 + r2 * r2, [
      "The two solutions add to one number and multiply to another, and you can read both from the equation.",
      "Sum of squares = (sum)² − 2 × (product). The sum is the middle number with its sign flipped; the product is the last number.",
      "Example: x² − 5x + 4 = 0. Sum 5, product 4. Sum of squares = 25 − 8 = 17 (the solutions 1 and 4: 1 + 16 = 17). Now do yours."]);
    if (t === "sum") return num(`${a}x² − ${a * S1}x + ${a * P} = 0 has two solutions. What is their sum?`, big("🪄"), S1, [
      "Divide the whole equation by the number in front of x² to make it simpler.",
      "The two solutions add up to the opposite of the middle number, divided by the number in front of x².",
      "Example: 3x² − 15x + 12 = 0. The sum is 15 ÷ 3 = 5. Now do yours."]);
    return num(`${a}x² − ${a * S1}x + ${a * P} = 0 has two solutions. What is their product?`, big("🪄"), P, [
      "Divide the whole equation by the number in front of x² to make it simpler.",
      "The two solutions multiply to the last number divided by the number in front of x².",
      "Example: 3x² − 15x + 12 = 0. The product is 12 ÷ 3 = 4. Now do yours."]);
  };
  const lineParab = () => {
    const a = ri(1, 6), b = a + ri(1, 5), Sx = a + b, P = a * b;
    return num(`The line y = ${Sx}x − ${P} meets the parabola y = x² at two points. One meeting point has x = ${a}. What is x at the other meeting point?`, big("🤝"), b, [
      "Where they meet, both heights are equal. Set x² equal to the line's rule and move everything to one side.",
      "You get a quadratic that starts with x². Its two solutions add up to the opposite of the middle number.",
      "Example: y = 5x − 6 meets y = x² at x = 2. The sum of the two meeting x-values is 5, so the other is 5 − 2 = 3. Now do yours."]);
  };
  const halfLife = () => {
    const n = ri(2, 5), m = ri(2, 9), h = pick([2, 3, 4, 5, 6]), A = m * 2 ** n, what = pick(["A special sample", "A medicine in the body", "A glowing paint"]);
    if (Math.random() < 0.5) return num(`${what} has a half-life of ${h} hours (half of it is left after every ${h} hours). You start with ${A} grams. How many grams are left after ${n * h} hours?`, big("⏳"), m, [
      "First count how many half-lives have passed. Each one cuts the amount in half.",
      "Divide the time by the half-life to count the halvings. Then halve the amount that many times.",
      "Example: 80 g, half-life 2 hours, after 6 hours. That is 3 half-lives: 80 → 40 → 20 → 10. Now do yours."]);
    return num(`${what} has a half-life of ${h} hours. You start with ${A} grams. After how many hours will ${m} grams be left?`, big("⏳"), n * h, [
      "Keep halving the amount until you reach the target. Count how many halvings it takes.",
      "Multiply the number of halvings by the length of one half-life.",
      "Example: 80 g to 10 g with a half-life of 2 hours: 80 → 40 → 20 → 10 is 3 halvings, so 6 hours. Now do yours."]);
  };
  const logQ = () => {
    const [b, mx] = pick([[2, 8], [3, 5], [4, 4], [5, 4], [10, 5]]), e = ri(1, mx), N = b ** e, t = pick(["val", "inv", "mult"]);
    if (t === "val") return num(`What is ${lg(b, N)} ?`, big("🪜"), e, [
      "A logarithm asks: which power of the base gives this number?",
      "Keep multiplying the base by itself and count how many times it takes to reach the number.",
      "Example: log<sub>3</sub> 27 = 3, because 3 × 3 × 3 = 27. Now do yours."]);
    if (t === "inv") return num(`${lg(b, "x")} = ${e}. What is x?`, big("🪜"), N, [
      "The log tells you the power. Turn it back into a power of the base.",
      "x is the base multiplied by itself that many times.",
      "Example: log<sub>2</sub> x = 5 means x = 2 × 2 × 2 × 2 × 2 = 32. Now do yours."]);
    return num(`How many times must you multiply by ${b} to turn 1 into ${N}?`, big("🪜"), e, [
      "Start at one and multiply by the base again and again.",
      "Count the multiplications until you land exactly on the target number.",
      "Example: from 1 to 81 by multiplying by 3: 3, 9, 27, 81 is 4 times. Now do yours."]);
  };
  const radEq = () => {
    const t = pick(["a", "b", "c"]);
    if (t === "a") { const b = ri(2, 9), a = ri(1, b * b - 1); return num(`Solve √(x + ${a}) = ${b}. What is x?`, big("√"), b * b - a, [
      "Get rid of the square root by doing the opposite: squaring both sides.",
      "Square both sides, then take away the number that is added to x.",
      "Example: √(x + 3) = 4 gives x + 3 = 16, so x = 13. Now do yours."]); }
    if (t === "b") { const k = pick([2, 3, 5]), j = ri(1, 4); return num(`Solve √(${k}x) = ${k * j}. What is x?`, big("√"), k * j * j, [
      "Square both sides to remove the square root.",
      "After squaring you have a number equal to the multiple of x. Divide by the number in front of x.",
      "Example: √(2x) = 6 gives 2x = 36, so x = 18. Now do yours."]); }
    const b = ri(2, 9), a = ri(1, 12), isNeg = Math.random() < 0.5;
    return mcq(`Does √(x + ${a}) = ${isNeg ? "−" : ""}${b} have a solution?`, big("√"), isNeg ? "no" : "yes", ["yes", "no"], [
      "Think about what sort of number a square root sign can give.",
      "The square root sign gives zero or a positive number. Compare that with the number on the other side.",
      "Example: √(x + 1) = −2 has no solution, because a square root is never negative. But √(x + 1) = 2 works with x = 3. Now do yours."]);
  };
  const remainder = () => {
    for (;;) {
      const cs = pick([[1, ri(1, 5), ri(1, 6)], [1, ri(1, 4), ri(0, 5), ri(1, 6)], [2, ri(-3, 4), ri(1, 6)]]), a = ri(1, 4), plus = Math.random() < 0.35, at = plus ? -a : a;
      const val = cs.reduce((acc, c) => acc * at + c, 0);
      if (val < 0) continue;
      return num(`What is the remainder when ${poly(cs)} is divided by (x ${plus ? "+" : "−"} ${a})?`, big("➗"), val, [
        "There is a shortcut called the remainder theorem. You do not need to do long division.",
        "The remainder is the value of the polynomial when x is the number that makes the bracket equal zero. Find that number, then substitute it in.",
        "Example: x² + 3x + 1 divided by (x − 2). Put x = 2: 4 + 6 + 1 = 11. The remainder is 11. Now do yours."]);
    }
  };
  const binomial = () => {
    const n = ri(3, 5), k = ri(1, n - 1), a = pick([2, 3]);
    return num(`What is the coefficient of x${k === 1 ? "" : "^" + k} in the expansion of (x + ${a})^${n}?`, big("🔺"), comb(n, k) * a ** (n - k), [
      "Pascal's triangle gives the counting numbers. Find the row that matches the power.",
      "Each term is (Pascal number) × (the power of x) × (the plain number raised to what is left over). The plain number's power plus the power of x adds to the full power.",
      "Example: coefficient of x in (x + 2)³. Pascal row 1, 3, 3, 1, so 3 × 2² = 12. Now do yours."]);
  };
  const geoProb = () => {
    if (Math.random() < 0.5) {
      for (;;) {
        const W = pick([4, 5, 8, 10, 20]), H = pick([4, 5, 8, 10, 20]), w = ri(1, W), h = ri(1, H), pc = w * h * 100 / (W * H);
        if (!Number.isInteger(pc) || pc < 4 || pc > 80) continue;
        return num(`A dart lands at a random spot on a ${W} by ${H} board. A rectangle ${w} by ${h} is painted inside it. What percent chance is there that the dart lands in the painted rectangle?`, big("🎯"), pc, [
          "The chance equals the painted area compared with the whole board's area.",
          "Work out both areas, divide small by big, then turn the fraction into a percent.",
          "Example: a 2 by 5 rectangle on a 10 by 10 board. 10 ÷ 100 = 10%. Now do yours."]);
      }
    }
    const [r, R] = pick([[1, 2], [3, 5], [2, 5], [3, 10], [4, 5], [1, 5], [1, 10], [7, 10]]);
    return num(`A round target has radius ${R * 2} cm. The bullseye in the middle has radius ${r * 2} cm. A dart lands at random on the target. What percent chance is there of hitting the bullseye?`, big("🎯"), r * r * 100 / (R * R), [
      "Compare the area of the small circle with the area of the big one. Both use π, so π cancels.",
      "Area depends on radius times radius. Divide the small radius squared by the big radius squared, then change it to a percent.",
      "Example: bullseye radius 3, target radius 6. 9 ÷ 36 = 1/4, which is 25%. Now do yours."]);
  };
  const TRP = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
  const cofunc = () => {
    if (Math.random() < 0.5) {
      const A = ri(1, 17) * 5;
      return num(`sin ${A}° = cos(?°). What is the missing angle?`, big("📐"), 90 - A, [
        "In a right triangle, the sine of one acute angle is the cosine of the other acute angle.",
        "The two acute angles add up to ninety degrees. Find the partner angle.",
        "Example: sin 20° = cos 70°, because 20 + 70 = 90. Now do yours."]);
    }
    const [o, ad, h] = pick(TRP), cosQ = Math.random() < 0.5;
    return mcq(`A is an acute angle with sin A = ${o}/${h}. What is ${cosQ ? "cos A" : "tan A"}?`, big("📐"), cosQ ? `${ad}/${h}` : `${o}/${ad}`, [`${o}/${h}`, `${ad}/${h}`, `${o}/${ad}`, `${ad}/${o}`, `${h}/${ad}`], [
      "Draw a right triangle. Sine uses opposite over hypotenuse, so you know two of the sides.",
      "Find the missing side with Pythagoras. Cosine is adjacent over hypotenuse, tangent is opposite over adjacent.",
      "Example: sin A = 20/29. The missing side is √(841 − 400) = 21. So cos A = 21/29 and tan A = 20/21. Now do yours."]);
  };
  const sumSq = () => {
    if (Math.random() < 0.6) {
      const n = ri(3, 12);
      return num(`What is 1² + 2² + 3² + ... + ${n}² ?`, big("🟪"), n * (n + 1) * (2 * n + 1) / 6, [
        "You could square and add each one, but there is a formula that is faster.",
        "The sum of the first n squares is n × (n + 1) × (2n + 1) ÷ 6.",
        "Example: 1² + 2² + 3² + 4². 4 × 5 × 9 ÷ 6 = 30, and 1 + 4 + 9 + 16 = 30. Now do yours."]);
    }
    const n = ri(3, 7);
    return num(`What is 1³ + 2³ + 3³ + ... + ${n}³ ?`, big("🟪"), (n * (n + 1) / 2) ** 2, [
      "Add up the plain numbers first: 1 + 2 + 3 and so on. Something nice happens to that total.",
      "The sum of the first n cubes equals the sum of 1 to n, squared.",
      "Example: 1³ + 2³ + 3³. 1 + 2 + 3 = 6 and 6² = 36, and 1 + 8 + 27 = 36. Now do yours."]);
  };
  const threeUnk = () => {
    const x = ri(1, 12), y = ri(1, 12), z = ri(1, 12), T = x + y + z, A = x + y, B = y + z, t = pick(["z", "x", "y"]);
    return num(`Three numbers x, y and z fit all three equations. What is ${t}?`, eqs([`x + y + z = ${T}`, `x + y = ${A}`, `y + z = ${B}`]), t === "z" ? z : t === "x" ? x : y, [
      "Compare the big equation with one of the small ones. What is left over?",
      t === "y" ? "Add the two small equations. That counts y twice. Then take away the big equation." : t === "z" ? "Take the equation with x and y away from the big equation. Only one letter is left." : "Take the equation with y and z away from the big equation. Only one letter is left.",
      "Example: a + b + c = 20, a + b = 13, so c = 20 - 13 = 7. Now do yours."]);
  };
  const region = () => {
    const m1 = pick([1, 2, -1]), c1 = ri(-2, 5), m2 = pick([1, 2, -1, -2]), c2 = c1 + ri(2, 8), px = ri(0, 8), py = ri(0, 14);
    const ge = Math.random() < 0.5, lt = Math.random() < 0.5;
    const v1 = m1 * px + c1, v2 = m2 * px + c2, ok1 = ge ? py >= v1 : py > v1, ok2 = lt ? py < v2 : py <= v2;
    const right = ok1 && ok2 ? "both" : ok1 ? "only the first" : ok2 ? "only the second" : "neither";
    return mcq(`The point (${px}, ${py}). Which inequalities does it satisfy?<br>First: y ${ge ? "≥" : "&gt;"} ${rhs(m1, c1)}<br>Second: y ${lt ? "&lt;" : "≤"} ${rhs(m2, c2)}`, big("🗺️"), right, ["both", "only the first", "only the second", "neither"], [
      "Test each inequality separately. Put the x and the y of the point into each one.",
      "For each one, work out the right side using the point's x. Then compare it with the point's y using the symbol. Watch whether the symbol includes equals.",
      "Example: point (2, 5) and y &gt; x + 1. The right side is 3, and 5 &gt; 3 is true. Now do yours."]);
  };
  const catchUp = () => {
    const t = ri(2, 6), diff = ri(2, 8), d = t * diff, v1 = ri(3, 8), v2 = v1 + diff;
    const tx = `Leo walks at ${v1} km/h and is already ${d} km ahead of Mia. Mia cycles at ${v2} km/h along the same path.`;
    if (Math.random() < 0.5) return num(`${tx} How many hours until Mia catches up with Leo?`, big("🚲"), t, [
      "How much of the gap does Mia close every hour?",
      "She closes the gap at the difference between the two speeds. Divide the starting gap by that.",
      "Example: a 12 km gap, speeds 4 and 7 km/h. She gains 3 km each hour, and 12 ÷ 3 = 4 hours. Now do yours."]);
    return num(`${tx} How many km does Mia ride before she catches up with Leo?`, big("🚲"), v2 * t, [
      "First find how long it takes her to close the gap. Then think about how far she rides in that time.",
      "Time to catch up = gap ÷ difference of speeds. Then distance = her speed × that time.",
      "Example: a 12 km gap, speeds 4 and 7 km/h. It takes 4 hours, and she rides 7 × 4 = 28 km. Now do yours."]);
  };
  const revPct = () => {
    const orig = pick([40, 60, 80, 120, 140, 160, 200, 240, 250, 400]), p = pick([10, 20, 25, 30, 40, 50]);
    if (Math.random() < 0.5) return num(`After a ${p}% discount, a jacket costs $${orig * (100 - p) / 100}. How many dollars did it cost before the discount?`, big("🏷️"), orig, [
      "The sale price is not the original price. It is a percent of the original price.",
      "The sale price is the original price times (100% minus the discount). Turn that into a decimal and divide the sale price by it.",
      "Example: a 20% discount gives $48. 48 is 80% of the original, so 48 ÷ 0.8 = $60. Now do yours."]);
    return num(`A game costs $${orig * (100 + p) / 100} with ${p}% tax added. How many dollars was it before tax?`, big("🏷️"), orig, [
      "The total includes the tax, so it is more than the original. It is a percent of the original.",
      "The total is the original price times (100% plus the tax). Turn that into a decimal and divide the total by it.",
      "Example: a 10% tax gives $55. 55 is 110% of the original, so 55 ÷ 1.1 = $50. Now do yours."]);
  };
  const starsBars = () => {
    const k = ri(2, 4), n = ri(k, 7);
    if (Math.random() < 0.5) return num(`${n} identical candies are shared among ${k} kids. A kid may get none. How many different ways are there to share them?`, big("🍬"), comb(n + k - 1, k - 1), [
      "Line up the candies in a row and put dividers between the kids' shares.",
      "You need one fewer divider than kids. Count all the spots (candies plus dividers) and choose where the dividers go.",
      "Example: 3 candies, 2 kids. 4 spots, 1 divider: 4 ways (0+3, 1+2, 2+1, 3+0). Now do yours."]);
    return num(`${n} identical candies are shared among ${k} kids and every kid gets <b>at least one</b>. How many different ways are there?`, big("🍬"), comb(n - 1, k - 1), [
      "Give each kid one candy first. Or think about the gaps between candies in a row.",
      "The dividers must go in different gaps between the candies. Choose which gaps to use.",
      "Example: 4 candies, 2 kids, at least one each: 3 gaps, choose 1 divider: 3 ways (1+3, 2+2, 3+1). Now do yours."]);
  };
  const shiftQ = () => {
    const h = ri(1, 9), k = ri(1, 9), t = pick(["v", "p"]);
    if (t === "v") { const askX = Math.random() < 0.5; return num(`The parabola y = (x − ${h})² + ${k} has its lowest point (vertex) somewhere. What is the ${askX ? "x" : "y"}-coordinate of the vertex?`, big("↗️"), askX ? h : k, [
      "The parabola y = x² has its vertex at the origin. What does the bracket and the added number do to it?",
      "A number taken away inside the bracket slides the graph right. A number added outside lifts it up.",
      "Example: y = (x − 2)² + 3 has its vertex at (2, 3). Now do yours."]); }
    const a = ri(4, 9), b = ri(4, 9), dx = ri(1, 3), dy = ri(1, 3), left = Math.random() < 0.5, down = Math.random() < 0.5, askX = Math.random() < 0.5;
    return num(`The graph of y = f(x) has a peak at (${a}, ${b}). Where is the peak of y = f(x ${left ? "+" : "−"} ${dx}) ${down ? "−" : "+"} ${dy}? Give its ${askX ? "x" : "y"}-coordinate.`, big("↗️"), askX ? (left ? a - dx : a + dx) : (down ? b - dy : b + dy), [
      "Inside the bracket moves the graph sideways, outside moves it up or down. Inside works backwards.",
      "x − something moves the graph right. x + something moves it left. A number added outside moves it up, taken away moves it down.",
      "Example: peak at (5, 6). For f(x − 2) + 1 the peak moves 2 right and 1 up to (7, 7). Now do yours."]);
  };

  // ======================= LEVEL 21 =======================
  const sigmaQ = () => {
    const s = pick([1, 1, 2, 3]), n = ri(s + 3, 9);
    if (Math.random() < 0.6) {
      const p = ri(1, 4), q = ri(0, 5); let tot = 0; for (let k = s; k <= n; k++) tot += p * k + q;
      return num(`What is ∑ (k = ${s} to ${n}) of (${p === 1 ? "" : p}k${q ? " + " + q : ""}) ?`, big("∑"), tot, [
        "The sign ∑ means 'add up'. Let k take every whole number from the start to the end.",
        "Write out each term by putting each value of k into the rule. Then add them all.",
        "Example: ∑ (k = 1 to 3) of (2k + 1) = 3 + 5 + 7 = 15. Now do yours."]);
    }
    let tot = 0; for (let k = s; k <= n; k++) tot += k * k;
    return num(`What is ∑ (k = ${s} to ${n}) of k² ?`, big("∑"), tot, [
      "The sign ∑ means 'add up'. Let k take every whole number from the start to the end.",
      "Square each k, write the answers in a list and add them. Be careful about where the list starts.",
      "Example: ∑ (k = 2 to 4) of k² = 4 + 9 + 16 = 29. Now do yours."]);
  };
  const infSum = () => {
    const [k, a] = pick([[2, 8], [2, 16], [2, 24], [2, 32], [2, 40], [3, 54], [3, 108], [4, 192]]), t = [a, a / k, a / k ** 2, a / k ** 3];
    return num(`What number does this endless sum get closer and closer to?<br>${t.join(" + ")} + ...`, big("♾️"), a * k / (k - 1), [
      "Each number is the one before multiplied by a fraction smaller than one. The pieces get tiny.",
      "The total = first number ÷ (1 − the fraction). Find the fraction from two neighbouring terms.",
      "Example: 10 + 5 + 2.5 + ... The fraction is 1/2, so 10 ÷ (1 − 1/2) = 10 ÷ 1/2 = 20. Now do yours."]);
  };
  const logRules = () => {
    const b = pick([2, 3, 5]), m = ri(2, 5), n = ri(1, m - 1), t = pick(["add", "sub", "pow", "prod"]);
    if (t === "add") return num(`What is ${lg(b, b ** m)} + ${lg(b, b ** n)} ?`, big("🪜"), m + n, [
      "You can work out each logarithm on its own, or use the rule for adding logs.",
      "Each log is a power of the base. Find both powers, then add.",
      "Example: log<sub>2</sub> 8 + log<sub>2</sub> 4 = 3 + 2 = 5. Now do yours."]);
    if (t === "sub") return num(`What is ${lg(b, b ** m)} − ${lg(b, b ** n)} ?`, big("🪜"), m - n, [
      "Find what power of the base each number is.",
      "Work out each logarithm, then subtract the second from the first.",
      "Example: log<sub>3</sub> 81 − log<sub>3</sub> 3 = 4 − 1 = 3. Now do yours."]);
    if (t === "pow") { const p = ri(2, 4); return num(`What is log<sub>${b}</sub> ((${b ** m})^${p}) ?`, big("🪜"), m * p, [
      "A power inside a log can be brought out to the front as a multiplier.",
      "Find the log of the inside number first, then multiply by the outside power.",
      "Example: log<sub>2</sub> (4³) = 3 × log<sub>2</sub> 4 = 3 × 2 = 6. Now do yours."]); }
    return num(`${lg(b, b ** m)} + ${lg(b, b ** n)} = ${lg(b, "?")}. What number goes in place of the ?`, big("🪜"), b ** (m + n), [
      "Adding logs matches multiplying the numbers inside them.",
      "Multiply the two numbers inside the logs. The sum of the logs is the log of that product.",
      "Example: log<sub>2</sub> 4 + log<sub>2</sub> 8 = log<sub>2</sub> 32, because 4 × 8 = 32. Now do yours."]);
  };
  const expEq = () => {
    const t = pick(["a", "b", "c", "d"]);
    if (t === "a") { const [b, mx] = pick([[2, 8], [3, 5], [5, 4], [10, 5]]), e = ri(2, mx); return num(`Solve ${b}^x = ${b ** e}.`, big("🚀"), e, [
      "Write the right-hand number as a power of the base on the left.",
      "Multiply the base by itself until you reach the number. How many bases did you multiply?",
      "Example: 3^x = 81. 3 × 3 × 3 × 3 = 81, so x = 4. Now do yours."]); }
    if (t === "b") { const b = pick([2, 3]), e = ri(4, 7), c = ri(1, 3); return num(`Solve ${b}^(x + ${c}) = ${b ** e}.`, big("🚀"), e - c, [
      "Write the right-hand number as a power of the base, then match the powers.",
      "The whole exponent on the left must equal the exponent you found. Then take away what is added to x.",
      "Example: 2^(x + 1) = 32. 32 = 2⁵, so x + 1 = 5 and x = 4. Now do yours."]); }
    if (t === "c") { const b = pick([2, 3]), k = pick([2, 3]), x = ri(2, 4); return num(`Solve ${b}^(${k}x) = ${b ** (k * x)}.`, big("🚀"), x, [
      "Write the right-hand number as a power of the base, then match the powers.",
      "The exponent is a multiple of x. Divide the exponent you found by the number in front of x.",
      "Example: 2^(3x) = 64. 64 = 2⁶, so 3x = 6 and x = 2. Now do yours."]); }
    const [big_, sm, r] = pick([[4, 2, 2], [8, 2, 3], [9, 3, 2], [27, 3, 3], [25, 5, 2], [16, 2, 4]]), x = ri(2, 5);
    return num(`Solve ${big_}^x = ${sm}^${x * r}.`, big("🚀"), x, [
      "The bases are different, but one is a power of the other. Rewrite the bigger base using the smaller one.",
      "Write the bigger base as the smaller base to a power. Then the exponents must match: divide.",
      "Example: 4^x = 2⁶. 4 = 2², so (2²)^x = 2^(2x) = 2⁶, giving 2x = 6 and x = 3. Now do yours."]);
  };
  const domainQ = () => {
    const a = ri(1, 12), t = pick(["root", "div", "rev", "root2"]);
    if (t === "root") return num(`√(x − ${a}) only works for some x. What is the smallest whole number x that can be used?`, big("🚪"), a, [
      "You cannot take the square root of a negative number (in real numbers).",
      "The inside must be zero or more. Find the smallest x that makes the inside zero.",
      "Example: √(x − 4) needs x − 4 ≥ 0, so the smallest x is 4. Now do yours."]);
    if (t === "div") return num(`1 ÷ (x − ${a}) works for every x except one number. What is that number?`, big("🚪"), a, [
      "You can never divide by zero.",
      "Find the x that makes the bottom equal to zero.",
      "Example: 1 ÷ (x − 6) fails at x = 6. Now do yours."]);
    if (t === "rev") return num(`√(${a} − x) only works for some x. What is the biggest x that can be used?`, big("🚪"), a, [
      "You cannot take the square root of a negative number (in real numbers).",
      "The inside must be zero or more. Find the biggest x that keeps the inside from going below zero.",
      "Example: √(7 − x) needs 7 − x ≥ 0, so x can be 7 at most. Now do yours."]);
    const k = pick([2, 3, 4]);
    return num(`√(${k}x − ${k * a}) only works for some x. What is the smallest x that can be used?`, big("🚪"), a, [
      "You cannot take the square root of a negative number (in real numbers).",
      "The inside must be zero or more. Make the inside equal to zero and solve.",
      "Example: √(2x − 10) needs 2x − 10 ≥ 0, so 2x ≥ 10 and x ≥ 5. Now do yours."]);
  };
  const compFn = () => {
    const p = ri(2, 5), q = ri(1, 6), r = ri(2, 5), s = ri(1, 6), fg = Math.random() < 0.5, c = pick([true, false]);
    const f = `f(x) = ${p}x + ${q}`, g = `g(x) = ${r}x + ${s}`;
    if (fg) return num(`${f} and ${g}. When you simplify f(g(x)) you get a x + b. What is ${c ? "a" : "b"}?`, eqs([f, g]), c ? p * r : p * s + q, [
      "For f(g(x)), put the whole rule for g in place of x inside f.",
      c ? "Multiply the number in front of x in f by the number in front of x in g." : "Multiply the plain number in g by the number in front of x in f, then add the plain number from f.",
      "Example: f(x) = 2x + 1, g(x) = 3x + 4. f(g(x)) = 2(3x + 4) + 1 = 6x + 9. Now do yours."]);
    return num(`${f} and ${g}. When you simplify g(f(x)) you get a x + b. What is ${c ? "a" : "b"}?`, eqs([f, g]), c ? p * r : r * q + s, [
      "For g(f(x)), put the whole rule for f in place of x inside g.",
      c ? "Multiply the number in front of x in g by the number in front of x in f." : "Multiply the plain number in f by the number in front of x in g, then add the plain number from g.",
      "Example: f(x) = 2x + 1, g(x) = 3x + 4. g(f(x)) = 3(2x + 1) + 4 = 6x + 7. Now do yours."]);
  };
  const invFn = () => {
    const t = pick(["lin", "cube", "div"]);
    if (t === "lin") { const p = ri(2, 6), q = ri(1, 9), x0 = ri(2, 9); return num(`f(x) = ${p}x + ${q}. What input x gives the output ${p * x0 + q}? (This is f⁻¹(${p * x0 + q}).)`, big("↩️"), x0, [
      "An inverse function undoes the original. Work backwards.",
      "Take away the plain number, then undo the multiplication by dividing.",
      "Example: f(x) = 3x + 2 gives 14. 14 − 2 = 12, then 12 ÷ 3 = 4. Now do yours."]); }
    if (t === "cube") { const x0 = ri(2, 5), q = ri(1, 9); return num(`f(x) = x³ + ${q}. What input x gives the output ${x0 ** 3 + q}?`, big("↩️"), x0, [
      "Work backwards: undo the last thing the function did first.",
      "Take away the plain number, then find which number multiplied by itself three times gives what is left.",
      "Example: f(x) = x³ + 1 gives 28. 28 − 1 = 27, and 3 × 3 × 3 = 27, so x = 3. Now do yours."]); }
    const p = ri(2, 5), q = ri(1, 9), w = ri(2, 8);
    return num(`f(x) = (x − ${q}) ÷ ${p}. What input x gives the output ${w}?`, big("↩️"), p * w + q, [
      "Work backwards: undo the last step first.",
      "The function divides last, so multiply first. Then undo the subtraction.",
      "Example: f(x) = (x − 1) ÷ 3 gives 4. 4 × 3 = 12, then 12 + 1 = 13. Now do yours."]);
  };
  const circleQ = () => {
    const h = ri(1, 9), k = ri(1, 9), r = ri(2, 9), t = pick(["rad", "cx", "pos"]), eq = `(x − ${h})² + (y − ${k})² = ${r * r}`;
    if (t === "rad") return num(`A circle has the equation ${eq}. What is its radius?`, big("⭕"), r, [
      "The number on the right side is not the radius itself.",
      "That number is the radius multiplied by itself. Take its square root.",
      "Example: (x − 1)² + (y − 2)² = 25 has radius 5. Now do yours."]);
    if (t === "cx") { const askX = Math.random() < 0.5; return num(`A circle has the equation ${eq}. What is the ${askX ? "x" : "y"}-coordinate of its center?`, big("⭕"), askX ? h : k, [
      "Each bracket has a letter and a number taken away. That number tells you the center.",
      `Look at the bracket with ${askX ? "x" : "y"}. The center's ${askX ? "x" : "y"} is the number taken away.`,
      "Example: (x − 3)² + (y − 8)² = 4 has its center at (3, 8). Now do yours."]); }
    const want = pick(["inside", "on the circle", "outside"]);
    const hintsP = [
      "Find how far the point is from the center, sideways and up or down.",
      "Square both distances and add them. Compare with the number on the right side: smaller means inside, equal means on it, bigger means outside.",
      "Example: circle (x − 1)² + (y − 1)² = 25 and point (2, 2). 1 + 1 = 2, which is less than 25, so the point is inside. Now do yours."];
    if (want === "on the circle") {
      const tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]), rr = tr[2], sx = pick([-1, 1]), sy = pick([-1, 1]);
      return mcq(`A circle has the equation (x − ${h})² + (y − ${k})² = ${rr * rr}. Is the point (${neg(h + sx * tr[0])}, ${neg(k + sy * tr[1])}) inside, on, or outside the circle?`, big("⭕"), "on the circle", ["inside", "on the circle", "outside"], hintsP);
    }
    for (;;) {
      const dx = ri(-8, 8), dy = ri(-8, 8), d2 = dx * dx + dy * dy, cl = d2 < r * r ? "inside" : d2 === r * r ? "on the circle" : "outside";
      if (cl !== want) continue;
      return mcq(`A circle has the equation ${eq}. Is the point (${neg(h + dx)}, ${neg(k + dy)}) inside, on, or outside the circle?`, big("⭕"), cl, ["inside", "on the circle", "outside"], hintsP);
    }
  };
  const RD = { 30: "π/6", 45: "π/4", 60: "π/3", 90: "π/2", 120: "2π/3", 135: "3π/4", 150: "5π/6", 180: "π", 225: "5π/4", 240: "4π/3", 270: "3π/2", 300: "5π/3" };
  const radians = () => {
    const ds = Object.keys(RD).map(Number), d = pick(ds);
    if (Math.random() < 0.5) return mcq(`Which is ${d}° written in radians?`, big("🔄"), RD[d], shuf(ds.filter(x => x !== d)).slice(0, 4).map(x => RD[x]), [
      "A half turn is 180°, and that equals π radians.",
      "Write the angle as a fraction of 180°. Then use that fraction of π.",
      "Example: 40° is 40/180 = 2/9 of a half turn, so it is 2π/9 radians. Now do yours."]);
    return num(`How many degrees is ${RD[d]} radians?`, big("🔄"), d, [
      "π radians is a half turn. How many degrees is a half turn?",
      "Replace π with the degrees of a half turn and work out the fraction.",
      "Example: 2π/9 radians: 2 × 180° ÷ 9 = 40°. Now do yours."]);
  };
  const L60 = [[3, 8, 7], [5, 8, 7], [8, 15, 13], [7, 15, 13], [5, 21, 19]], L120 = [[3, 5, 7], [7, 8, 13], [5, 16, 19]];
  const lawCos = () => {
    const t = pick(["60", "120", "ang"]);
    if (t === "60") { const [a, b, c] = pick(L60); return num(`In a triangle, two sides are ${a} and ${b} with a ${60}° angle between them. How long is the third side?`, big("📐"), c, [
      "Use the law of cosines: c² = a² + b² − 2ab cos C.",
      "The cosine of sixty degrees is one half. So 2ab cos C becomes just a times b. Work out c² and take the square root.",
      "Example: sides 2 and 3 with 60° between. 4 + 9 - 6 = 7, so the third side is √7. Now do yours."]); }
    if (t === "120") { const [a, b, c] = pick(L120); return num(`In a triangle, two sides are ${a} and ${b} with a 120° angle between them. How long is the third side?`, big("📐"), c, [
      "Use the law of cosines: c² = a² + b² − 2ab cos C.",
      "The cosine of 120° is minus one half. So the last part turns into a plus. Work out c² and take the square root.",
      "Example: sides 2 and 3 with 120° between. 4 + 9 + 6 = 19, so the third side is √19. Now do yours."]); }
    const is60 = Math.random() < 0.5, [a, b, c] = is60 ? pick(L60) : pick(L120);
    return mcq(`A triangle has sides ${a}, ${b} and ${c}. What is the angle opposite the side of length ${c}?`, big("📐"), is60 ? "60°" : "120°", ["60°", "90°", "120°", "45°"], [
      "Compare the square of the longest side with the sum of the squares of the other two.",
      "Right angle: equal. Smaller angle: the longest side squared is less than the sum. Wide angle: it is more. Then use c² = a² + b² − 2ab cos C to see which special angle fits.",
      "Example: sides 3, 4, 5: 9 + 16 = 25, equal, so it is a right angle (90°). Now do yours."]);
  };
  const binomProb = () => {
    const n = ri(3, 6), k = ri(0, n), tot = 2 ** n, right = frs(comb(n, k), tot), wr = [];
    for (let j = 0; j <= n; j++) if (j !== k) wr.push(frs(comb(n, j), tot));
    wr.push(frs(1, n + 1), frs(k, n));
    return mcq(`A fair coin is flipped ${n} times. What is the chance of exactly ${k} head${k === 1 ? "" : "s"}?`, big("🪙"), right, shuf(wr), [
      "Count the ways to get that many heads out of all the flips, and count all possible results.",
      "The number of ways is 'n choose k' (use Pascal's triangle). The number of results is 2 multiplied by itself once for each flip. Make a fraction.",
      "Example: 4 flips, exactly 1 head. 4 ways out of 16 results = 1/4. Now do yours."]);
  };
  const stdDev = () => {
    if (Math.random() < 0.6) {
      for (;;) {
        const n = pick([4, 5]), dev = Array.from({ length: n - 1 }, () => ri(-4, 4)); dev.push(-dev.reduce((a, b) => a + b, 0));
        const ss = dev.reduce((a, b) => a + b * b, 0);
        if (Math.abs(dev[n - 1]) > 5 || ss % n !== 0 || ss === 0) continue;
        const m = ri(8, 30), data = shuf(dev.map(d => m + d));
        return num(`The numbers ${data.join(", ")} have a mean of ${m}. What is their variance (the average of the squared distances from the mean)?`, big("📊"), ss / n, [
          "Find how far each number is from the mean. Some are above and some below.",
          "Square each distance so that none is negative. Add the squares and divide by how many numbers there are.",
          "Example: 1, 3, 5, 7 with mean 4. Distances −3, −1, 1, 3. Squares 9, 1, 1, 9. Total 20, divided by 4 is 5. Now do yours."]);
      }
    }
    const s = ri(1, 6), m = ri(10, 40), c = pick([1, 2, 3]), data = shuf(Array.from({ length: 2 * c }, (_, i) => (i < c ? m - s : m + s)));
    return num(`The numbers ${data.join(", ")} have a mean of ${m}. What is their standard deviation?`, big("📊"), s, [
      "Find how far each number is from the mean.",
      "Every number is the same distance from the mean. Square it, average the squares, then take the square root.",
      "Example: 2, 2, 8, 8 with mean 5. Every distance is 3, the squares are all 9, the average is 9, and √9 = 3. Now do yours."]);
  };
  const empirical = () => {
    const mu = pick([50, 70, 100, 120]), sg = pick([2, 4, 5, 10, 15]), t = pick(["one", "two", "above", "half", "n1", "n2"]), N = pick([200, 400, 500, 1000]);
    const pre = `Test scores follow a bell-shaped (normal) curve with a mean of ${mu} and a standard deviation of ${sg}.`;
    const ans = (txt, v, ex) => num(`${pre} ${txt}`, big("🔔"), v, [
      "Work out how many standard deviations each end of the range is from the mean.",
      "Use the three-number rule of thumb for bell curves, which goes with 1, 2 and 3 standard deviations from the mean on both sides. The bell is symmetric, so half a range is half the percent.",
      ex]);
    if (t === "one") return ans(`About what percent of scores are between ${mu - sg} and ${mu + sg}?`, 68, "Example: mean 60, standard deviation 4, scores from 52 to 68. That is 2 standard deviations each way, so about 95%. Now do yours.");
    if (t === "two") return ans(`About what percent of scores are between ${mu - 2 * sg} and ${mu + 2 * sg}?`, 95, "Example: mean 60, standard deviation 4, scores from 48 to 72. That is 3 standard deviations each way, so about 99.7%. Now do yours.");
    if (t === "above") return ans(`About what percent of scores are above ${mu + sg}?`, 16, "Example: mean 60, standard deviation 4, scores above 68. Between 52 and 68 is 95%, so 5% is outside, 2.5% each side. Now do yours.");
    if (t === "half") return ans(`About what percent of scores are between ${mu} and ${mu + sg}?`, 34, "Example: mean 60, standard deviation 4, between 60 and 68. 95% is between 52 and 68, so half of that is 47.5%. Now do yours.");
    if (t === "n1") return ans(`${N} students take the test. About how many score between ${mu - sg} and ${mu + sg}?`, N * 68 / 100, "Example: 300 students, scores within 2 standard deviations. 95% of 300 is 285. Now do yours.");
    return ans(`${N} students take the test. About how many score between ${mu - 2 * sg} and ${mu + 2 * sg}?`, N * 95 / 100, "Example: 300 students, scores within 1 standard deviation. 68% of 300 is 204. Now do yours.");
  };
  const NQ = [
    ["For every whole number x (0, 1, 2, ...), there is a whole number y with y &gt; x.", true, "Pick any x you like. Can you always name a y that is bigger?"],
    ["There is a whole number y such that, for every whole number x (0, 1, 2, ...), y &gt; x.", false, "Here y must be chosen first and must beat every x, even x = y itself."],
    ["For every whole number x (0, 1, 2, ...), there is a whole number y with x + y = 0.", false, "Try x = 1. Is there a whole number y that works?"],
    ["For every integer x (..., −1, 0, 1, ...), there is an integer y with x + y = 0.", true, "Try a few x values, positive and negative. What would y be each time?"],
    ["There is a whole number y such that x + y = x for every whole number x.", true, "Look for one special number that changes nothing when added."],
    ["For every real number x, there is a real number y with x × y = 1.", false, "Try the most awkward number for multiplying: zero."],
    ["For every real number x except 0, there is a real number y with x × y = 1.", true, "For each x, what would y have to be? Does that always exist?"],
    ["For every real number x, there is a real number y with y × y = x.", false, "Try a negative x. Can any real number times itself be negative?"],
    ["For every positive real number x, there is a real number y with y × y = x.", true, "For each positive x, think about its square root."],
    ["There is a number y such that y × x = 0 for every number x.", true, "Look for one special number that wipes out everything it multiplies."]
  ];
  const nested = () => {
    const [s, v, clue] = pick(NQ);
    return mcq(`True or false? ${s}`, big("🔗"), v ? "true" : "false", ["true", "false"], [
      "Read the order of the words carefully. 'For every x there is a y' means y can depend on x. 'There is a y for every x' with y chosen first is stronger.", clue,
      "Example: 'For every whole number x, there is a y with y = x + 1' is true: just pick y after seeing x. Now do yours."]);
  };
  const CT = [
    ["There is no biggest whole number.", "Suppose there is a biggest whole number.", "Suppose every whole number is the biggest.", "Suppose the biggest whole number is zero.", "To disprove 'there is none', pretend there is one and see what breaks."],
    ["There are infinitely many prime numbers.", "Suppose there are only finitely many prime numbers.", "Suppose every number is prime.", "Suppose there are exactly two primes.", "The opposite of 'never ends' is 'it ends somewhere'."],
    ["The square root of 2 is not a fraction of whole numbers.", "Suppose √2 is a fraction a/b in lowest terms.", "Suppose √2 is a whole number.", "Suppose √2 has a decimal that stops after one digit.", "Pretend the claim is false, so the opposite is true."],
    ["Among 13 people, two have birthdays in the same month.", "Suppose all 13 people have different birth months.", "Suppose all 13 people were born in the same month.", "Suppose there are only 12 people.", "The opposite of 'two share' is that nobody shares."],
    ["If n² is even, then n is even.", "Suppose n² is even but n is odd.", "Suppose n² is odd and n is odd.", "Suppose n is even but n² is odd.", "To break an if-then, keep the first part true and make the second part false."],
    ["There is no smallest positive fraction.", "Suppose there is a smallest positive fraction.", "Suppose zero is the smallest fraction.", "Suppose every fraction is positive.", "To disprove 'there is none', pretend there is one."],
    ["The sum of two even numbers is never odd.", "Suppose two even numbers have an odd sum.", "Suppose two odd numbers have an even sum.", "Suppose two even numbers have an even sum.", "The opposite of 'never' is 'it happens at least once'."],
    ["No square number ends in the digit 2.", "Suppose some square number ends in the digit 2.", "Suppose every square number ends in the digit 2.", "Suppose some cube ends in the digit 2.", "The opposite of 'no' is 'at least one'."]
  ];
  const contra = () => {
    const [claim, r, w1, w2, clue] = pick(CT);
    return mcq(`You want to prove by contradiction: "${claim}" What do you assume at the start?`, big("💥"), r, [w1, w2, "Suppose nothing at all."], [
      "A proof by contradiction starts by assuming the opposite of what you want to prove.", clue,
      "Example: to prove 'There is no largest even number', you would assume 'There is a largest even number.' Now do yours."]);
  };
  const oneOne = () => {
    const t = pick(["inj", "onto", "count"]);
    if (t === "inj") {
      const outs = Math.random() < 0.5 ? shuf(["A", "B", "C", "D"]) : Array.from({ length: 4 }, () => pick(["A", "B", "C", "D"]));
      const ok = new Set(outs).size === 4;
      return mcq(`A rule sends 1, 2, 3, 4 to letters:<br>${outs.map((o, i) => `${i + 1} → ${o}`).join(",  ")}<br>Is it one-to-one (no two inputs share an output)?`, big("🔀"), ok ? "yes" : "no", ["yes", "no"], [
        "Look for two different inputs that land on the same letter.",
        "Write down the letters used. If any letter appears twice, the rule is not one-to-one.",
        "Example: 1 → X, 2 → Y, 3 → X. Inputs 1 and 3 share X, so it is NOT one-to-one. Now do yours."]);
    }
    const outs = Array.from({ length: 5 }, () => pick(["X", "Y", "Z"])), used = new Set(outs).size;
    if (t === "onto") return mcq(`A rule sends 1, 2, 3, 4, 5 to letters from {X, Y, Z}:<br>${outs.map((o, i) => `${i + 1} → ${o}`).join(",  ")}<br>Is every letter X, Y and Z hit by at least one input ("onto")?`, big("🔀"), used === 3 ? "yes" : "no", ["yes", "no"], [
      "Check each of the three letters one by one. Is it an output of some input?",
      "If even one of the three letters never appears, the rule is not onto.",
      "Example: 1 → X, 2 → X, 3 → Y with letters {X, Y, Z}. Z is never hit, so it is NOT onto. Now do yours."]);
    return num(`A rule sends 1, 2, 3, 4, 5 to letters:<br>${outs.map((o, i) => `${i + 1} → ${o}`).join(",  ")}<br>How many different letters are used as outputs?`, big("🔀"), used, [
      "Read the outputs one at a time and note which letters you have seen.",
      "Do not count a letter twice. Count only the different ones.",
      "Example: 1 → P, 2 → Q, 3 → P, 4 → P gives P and Q, which is 2 different letters. Now do yours."]);
  };
  const euclid = () => {
    for (;;) {
      const g = ri(2, 12), p = ri(2, 15), q = ri(2, 15);
      if (p === q || gcd(p, q) !== 1) continue;
      const a = Math.max(p, q) * g, b = Math.min(p, q) * g;
      if (Math.random() < 0.7) return num(`Use Euclid's trick to find the greatest common factor of ${a} and ${b}.`, big("🔧"), g, [
        "Divide the bigger number by the smaller one and look only at the remainder.",
        "Now divide the smaller number by that remainder. Keep going with the last two numbers until the remainder is zero. The last number you divided by is the answer.",
        "Example: 84 and 36. 84 ÷ 36 leaves 12. 36 ÷ 12 leaves 0. So the answer is 12. Now do yours."]);
      if (g > 6 || p > 9 || q > 9) continue;
      return num(`What is the lowest common multiple of ${a} and ${b}? (Tip: find the greatest common factor first.)`, big("🔧"), a * b / g, [
        "Find the greatest common factor of the two numbers first.",
        "Multiply the two numbers together, then divide by their greatest common factor.",
        "Example: 12 and 18. The greatest common factor is 6. 12 × 18 = 216 and 216 ÷ 6 = 36. Now do yours."]);
    }
  };
  const recur = () => {
    const s = ri(1, 4), p = ri(2, 3), q = ri(1, 3), k = p === 3 ? ri(4, 5) : ri(4, 6);
    let a = s; for (let i = 1; i < k; i++) a = p * a + q;
    return num(`A sequence starts with ${s}. Each next term is ${p} times the term before, plus ${q}. What is term number ${k}?`, big("🔁"), a, [
      "Start with the first term and follow the rule to get the second, then the third, and so on.",
      "Write the terms in a list. To get each one, multiply the one before and then add the extra number.",
      "Example: start 1, rule 'double then add 1': 1, 3, 7, 15. The 4th term is 15. Now do yours."]);
  };

  const mk19 = [arithNth, subst, absEq, compIneq, variation, discQ, vertexQ, condP, expVal, quantNeg, exactlyOne, sysCount, simSolids, ratCancel, intercepts, stepFare, geoSum, truthQ];
  const mk20 = [perfSq, quadForm, vieta, lineParab, halfLife, logQ, radEq, remainder, binomial, geoProb, cofunc, sumSq, threeUnk, region, catchUp, revPct, starsBars, shiftQ];
  const mk21 = [sigmaQ, infSum, logRules, expEq, domainQ, compFn, invFn, circleQ, radians, lawCos, binomProb, stdDev, empirical, nested, contra, oneOne, euclid, recur];

  const L19 = [
    L("Patterns that add", arithNth, [S("Same jump", "🪜", "In a pattern that adds the same number each time, that number is the jump."), S("The shortcut", "⚡", "nth number = first number + (n − 1) × jump. The first number has no jumps yet."), S("Going back", "↩️", "To find a position: take away the first number, divide by the jump, then add one.")]),
    L("Swap it in: substitution", subst, [S("One tells all", "🔤", "If one equation says y = something, you know what y is."), S("Swap", "🔁", "Put that something in place of y in the other equation. Now only x is left."), S("Back again", "↩️", "Solve for x, then use the first equation to find y.")]),
    L("Absolute value equations", absEq, [S("Distance", "📏", "|x − 5| means the distance from x to 5."), S("Two sides", "↔️", "A distance can go left or right, so there are usually two answers."), S("Alone first", "1️⃣", "Get the bars alone on one side before you split into two equations.")]),
    L("Between two limits", compIneq, [S("Three parts", "🍔", "Do the same step to all three parts of an inequality like 2 &lt; 3x − 1 ≤ 11."), S("Alone in the middle", "🎯", "Get x alone in the middle, then read off the range."), S("Ends", "🔚", "&lt; leaves the end out. ≤ keeps it in. Count whole numbers carefully.")]),
    L("Direct and inverse", variation, [S("Direct", "📈", "Direct variation: y = k × x. Double x and y doubles too."), S("Inverse", "🔁", "Inverse variation: x × y stays the same. Double x and y halves."), S("Find the constant", "🔑", "First find k (or the fixed product), then use it for the new value.")]),
    L("How many solutions?", discQ, [S("The tell-tale number", "🧮", "For ax² + bx + c = 0, work out b² − 4ac."), S("Three cases", "🗂️", "Above zero: two solutions. Exactly zero: one. Below zero: none you can use."), S("Picture", "🥣", "The parabola crosses the x-axis twice, touches it once, or misses it.")]),
    L("Lowest point of a parabola", vertexQ, [S("Middle", "🥣", "A parabola is symmetric. Its lowest point is in the middle."), S("Formula", "📐", "For ax² + bx + c, the lowest point is at x = −b ÷ (2a)."), S("Then y", "📏", "Put that x back into the equation to get the smallest y.")]),
    L("Chance, given something", condP, [S("A smaller group", "🎲", "'Given' tells you the group has shrunk to those that fit the condition."), S("Count", "🔢", "Count the whole group that fits. Then count how many of them fit the second thing."), S("Fraction", "➗", "Second count ÷ first count.")]),
    L("Average prize", expVal, [S("Expected value", "🎡", "Expected value is the average prize over many plays."), S("Add and share", "➕", "For equal chances, add the prizes and divide by how many there are."), S("Fair game", "⚖️", "A game is fair when the cost equals the average prize.")]),
    L("Opposites with all and some", quantNeg, [S("All", "🅰️", "'All are' is broken by a single one that is not."), S("Some and none", "🔀", "'Some are' is false only if none are. 'None are' is false if one is."), S("Not the extreme", "⚠️", "The opposite of 'all' is NOT 'none'. It is 'at least one is not'.")]),
    L("Exactly one is true", exactlyOne, [S("Count the trues", "🕵️", "Test a number against each clue and count how many are true."), S("Only one", "1️⃣", "You need exactly one true clue. Two true or none true both fail."), S("Be tidy", "📝", "Go through the numbers in order so you miss none.")]),
    L("One, none or endless?", sysCount, [S("Slopes", "↗️", "Compare the slopes of the two lines."), S("Same slope", "🛤️", "Same slope and different heights: parallel, no meeting. Same slope and same height: same line."), S("Different slope", "✖️", "Different slopes cross exactly once.")]),
    L("Scaling solids", simSolids, [S("Length", "📏", "If a length grows by a factor, every length grows by it."), S("Area", "🟦", "Area grows by the factor squared."), S("Volume and weight", "📦", "Volume (and weight of the same material) grows by the factor cubed.")]),
    L("Cancel and evaluate", ratCancel, [S("Factor", "✂️", "Factor the top (and bottom) of a fraction with letters."), S("Cancel", "❌", "A bracket that appears on top and bottom can be cancelled."), S("Then substitute", "🔢", "Put the number into the simpler expression.")]),
    L("Where it crosses the axes", intercepts, [S("x-intercept", "➡️", "It is where the line meets the x-axis, so y = 0."), S("y-intercept", "⬆️", "It is where the line meets the y-axis, so x = 0."), S("Cover up", "🙈", "Cover up the term with the other letter and solve what is left.")]),
    L("Charges by the started unit", stepFare, [S("Round up", "⬆️", "'Or part of' means every started unit is charged in full."), S("Steps", "🪜", "Cost jumps up in steps instead of rising smoothly."), S("Start fee", "🚕", "Add any starting fee once, not for every unit.")]),
    L("Adding growing lists", geoSum, [S("Times the same", "✖️", "In 1 + 2 + 4 + 8, each number is double the one before."), S("Shortcut", "⚡", "Sum = first × (ratio^count − 1) ÷ (ratio − 1)."), S("Check", "✅", "Add the first few by hand to make sure it matches.")]),
    L("True and false tables", truthQ, [S("Two values", "🔣", "Every statement is either TRUE or FALSE."), S("Connectors", "🔗", "AND needs both true. OR needs at least one. NOT flips. → is false only for TRUE then FALSE."), S("Inside out", "🪆", "Work out the inside of brackets first.")]),
    L("Mixed practice", mixOf(mk19), MIXS("Patterns, equations, inequalities, parabolas, chances, scaling, lines and logic.")),
    L("Level 19 Challenge", mixOf(mk19), MIXS("Level 19 mixes algebra, parabolas, chance, scaling and logic."))
  ];

  const L20 = [
    L("Completing the square", perfSq, [S("Perfect square", "🟦", "x² + 6x + 9 = (x + 3)². The square of a bracket."), S("The trick", "🪄", "Half of the middle number, squared, is the missing last number."), S("Solving", "🔓", "(x + 2)² = 25 means x + 2 = 5 or −5.")]),
    L("The quadratic formula", quadForm, [S("The formula", "🧮", "x = (−b ± √(b² − 4ac)) ÷ 2a."), S("Under the root", "√", "Work out b² − 4ac first. It is called the discriminant."), S("Plus and minus", "±", "Add the root for one answer, subtract it for the other.")]),
    L("Roots without solving", vieta, [S("Two solutions", "🔢", "For x² + bx + c = 0, the two solutions add to −b and multiply to c."), S("With a", "🪄", "If there is a number a in front of x², divide: sum = −b ÷ a, product = c ÷ a."), S("Use it", "⚡", "Sum of squares = sum² − 2 × product.")]),
    L("Line meets parabola", lineParab, [S("Set equal", "🤝", "Where two graphs meet, their y-values are equal."), S("A quadratic", "🥣", "Setting x² equal to a line gives a quadratic."), S("Sum of meeting points", "➕", "The two meeting x-values add up to the opposite of the middle number.")]),
    L("Half-life", halfLife, [S("Halving", "⏳", "A half-life is the time for an amount to drop to half."), S("Count them", "🔢", "Time ÷ half-life = number of halvings."), S("Halve again", "➗", "Halve the amount that many times.")]),
    L("Logarithms", logQ, [S("What is a log?", "🪜", "log<sub>2</sub> 8 = 3 asks: how many 2s multiply to make 8?"), S("Powers", "⚡", "log<sub>b</sub> x = e means b^e = x."), S("Count it", "🔢", "Multiply the base again and again and count.")]),
    L("Square root equations", radEq, [S("Undo it", "√", "To remove a square root, square both sides."), S("Then solve", "🔓", "Now solve the simple equation that is left."), S("Never negative", "🚫", "A square root sign gives zero or a positive number.")]),
    L("Remainder shortcut", remainder, [S("Long division", "➗", "Dividing a polynomial by (x − a) can leave a remainder."), S("The shortcut", "⚡", "The remainder is the value of the polynomial at x = a."), S("For x + a", "↔️", "Dividing by (x + a): put in x = −a.")]),
    L("Expanding powers", binomial, [S("Pascal's row", "🔺", "Row n of Pascal's triangle gives the counting numbers."), S("Each term", "🧩", "Term = Pascal number × x-power × plain-number power."), S("Powers add up", "➕", "The two powers always add to n.")]),
    L("Chance as area", geoProb, [S("Random spot", "🎯", "If a dart lands anywhere at random, chance is a ratio of areas."), S("Small ÷ big", "➗", "Chance = painted area ÷ whole area."), S("Percent", "💯", "Multiply by 100 to get a percent.")]),
    L("Sine and cosine partners", cofunc, [S("Partners", "📐", "In a right triangle, sin of one angle = cos of the other."), S("Add to 90", "➕", "The two acute angles add up to 90°."), S("From sides", "📏", "sin = opposite ÷ hypotenuse, cos = adjacent ÷ hypotenuse, tan = opposite ÷ adjacent.")]),
    L("Sums of squares and cubes", sumSq, [S("Squares", "🟪", "1² + 2² + ... + n² = n(n + 1)(2n + 1) ÷ 6."), S("Cubes", "🧊", "1³ + 2³ + ... + n³ = (1 + 2 + ... + n)²."), S("Check", "✅", "Test the formula on a small n first.")]),
    L("Three unknowns", threeUnk, [S("Three letters", "🔤", "Three equations can pin down three unknown numbers."), S("Compare", "➖", "Take one equation away from another to remove letters."), S("Fill in", "↩️", "Once you know one letter, the rest follow.")]),
    L("Which points work?", region, [S("Test a point", "🗺️", "Put the point's x and y into the inequality."), S("Both?", "✅", "For a pair of inequalities the point must satisfy both."), S("Edges", "🔚", "≥ and ≤ include the edge. &gt; and &lt; do not.")]),
    L("Catching up", catchUp, [S("The gap", "↔️", "The gap shrinks by the difference of the speeds each hour."), S("Time", "⏱️", "Time to catch up = gap ÷ speed difference."), S("Distance", "📏", "Distance = speed × time.")]),
    L("Undoing a percent", revPct, [S("A part of the original", "🏷️", "After a discount, the new price is a percent of the old price."), S("Divide", "➗", "Divide the new price by that percent (as a decimal) to get the old price."), S("Tax too", "➕", "With tax added, it is more than 100% of the original.")]),
    L("Sharing identical things", starsBars, [S("Stars and bars", "🍬", "Candies are stars. Dividers (bars) split them between kids."), S("Count spots", "🔢", "Stars plus bars make a row. Choose where the bars go."), S("At least one", "☝️", "If every kid needs one, use the gaps between candies.")]),
    L("Sliding graphs", shiftQ, [S("Inside", "↔️", "f(x − h) slides the graph right by h. f(x + h) slides it left."), S("Outside", "↕️", "f(x) + k lifts the graph up by k."), S("Vertex form", "🥣", "y = (x − h)² + k has its vertex at (h, k).")]),
    L("Mixed practice", mixOf(mk20), MIXS("Quadratics, logs, roots, polynomials, chances, trig partners, sums, speeds, percents and counting.")),
    L("Level 20 Challenge", mixOf(mk20), MIXS("Level 20 mixes algebra, growth, geometry, counting and logic."))
  ];

  const L21 = [
    L("Sigma: add them up", sigmaQ, [S("The symbol", "∑", "∑ is a big S for 'sum'. It adds up many terms."), S("Read it", "👀", "Under it: where k starts. On top: where k stops. Beside it: the rule."), S("Write it out", "✍️", "List each term, then add.")]),
    L("Endless sums", infSum, [S("Shrinking pieces", "♾️", "If each term is a fraction of the one before, the pieces get tiny."), S("It settles", "🎯", "Even with endless terms the total can settle near one number."), S("Formula", "⚡", "Total = first term ÷ (1 − fraction).")]),
    L("Rules for logs", logRules, [S("Add", "➕", "log a + log b = log (a × b)."), S("Subtract", "➖", "log a − log b = log (a ÷ b)."), S("Power", "⚡", "log (a^p) = p × log a.")]),
    L("Powers as unknowns", expEq, [S("Same base", "🧱", "Write both sides as powers of the same base."), S("Match exponents", "🟰", "If the bases match, the exponents must be equal."), S("Different bases", "🔁", "4 = 2², 8 = 2³, 9 = 3². Use that to rewrite.")]),
    L("What numbers can go in?", domainQ, [S("Domain", "🚪", "The domain is all the inputs a rule can accept."), S("No negative roots", "√", "The inside of a square root cannot be negative."), S("No zero bottoms", "🚫", "You can never divide by zero.")]),
    L("Building f(g(x))", compFn, [S("Chain", "🔗", "f(g(x)) means do g first, then f."), S("Replace", "🔁", "Put the whole rule for g in place of x inside f."), S("Order matters", "↔️", "g(f(x)) is usually different from f(g(x)).")]),
    L("Inverse functions", invFn, [S("Undo", "↩️", "An inverse function undoes the original."), S("Backwards", "⏪", "Do the opposite steps in reverse order."), S("Check", "✅", "Put your answer into the original function to see the given output.")]),
    L("Circles on a grid", circleQ, [S("Equation", "⭕", "(x − h)² + (y − k)² = r² is a circle with center (h, k) and radius r."), S("Radius", "📏", "The number on the right is r², so take its square root."), S("Where is a point?", "📍", "Work out (x − h)² + (y − k)². Compare with r².")]),
    L("Radians", radians, [S("A new unit", "🔄", "Radians measure angles using π. A half turn is π."), S("Degrees to radians", "➗", "Write the degrees as a fraction of 180, then times π."), S("Common ones", "🧠", "90° is π/2, 60° is π/3, 45° is π/4, 30° is π/6.")]),
    L("Law of cosines", lawCos, [S("Any triangle", "📐", "The Pythagoras idea works for any triangle with a correction."), S("The law", "🧮", "c² = a² + b² − 2ab cos C."), S("Special angles", "⭐", "cos 60° = 1/2, cos 90° = 0, cos 120° = −1/2.")]),
    L("Coin flips, exactly k", binomProb, [S("Count ways", "🪙", "Ways to get k heads in n flips = n choose k."), S("All results", "🔢", "n flips have 2 × 2 × ... = 2^n results."), S("Fraction", "➗", "Chance = ways ÷ results. Make it simple.")]),
    L("Standard deviation", stdDev, [S("Spread", "📊", "Standard deviation tells how far numbers usually are from the mean."), S("Steps", "🪜", "Distances from the mean, square them, average (variance), square root."), S("Small and large", "📏", "A small standard deviation means the data is bunched together.")]),
    L("The bell curve rule", empirical, [S("Normal curve", "🔔", "Many measurements form a bell shape around the mean."), S("68-95-99.7", "💯", "About 68% within 1 standard deviation of the mean, 95% within 2, 99.7% within 3."), S("Halves", "✂️", "The bell is symmetric, so half of a range is half of the percent.")]),
    L("For every, there is", nested, [S("Order matters", "🔗", "'For every x there is a y' lets y depend on x."), S("Picked first", "1️⃣", "'There is a y that works for every x' is much stronger."), S("Counterexample", "🔎", "To disprove 'for every', find one x that fails.")]),
    L("Proof by contradiction", contra, [S("Assume the opposite", "🔄", "Pretend the claim you want is false."), S("Chase it", "🔗", "Follow the logic until something impossible happens."), S("Contradiction", "💥", "If the pretend world is impossible, the claim must be true.")]),
    L("One-to-one and onto", oneOne, [S("One-to-one", "1️⃣", "No two different inputs give the same output."), S("Onto", "🎯", "Every possible output is hit by some input."), S("Check", "👀", "List the outputs. Repeats mean not one-to-one. Missing letters mean not onto.")]),
    L("Euclid's trick", euclid, [S("Remainders", "➗", "Divide the bigger by the smaller and keep the remainder."), S("Repeat", "🔁", "Divide the smaller by the remainder, and so on, until it comes out even."), S("The answer", "🎯", "The last divisor is the greatest common factor. lcm = a × b ÷ gcf.")]),
    L("Rules that build on themselves", recur, [S("Recurrence", "🔁", "Each term is made from the one before."), S("Start", "🏁", "You must be told the first term."), S("List", "📝", "Write the terms one after another, applying the rule each time.")]),
    L("Mixed practice", mixOf(mk21), MIXS("Sums, logs, powers, functions, circles, radians, triangles, chance, statistics, logic and number tricks.")),
    L("Level 21 Challenge", mixOf(mk21), MIXS("Level 21 mixes algebra, functions, geometry, statistics and proof.")),
  ];

  Object.assign(LOGIC_LEVELS, { 19: L19, 20: L20, 21: L21 });
})();
