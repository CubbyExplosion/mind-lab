// ext/logic-16-18.js  Mind Lab Logic & Puzzles levels 16-18 (60 lessons)
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
  const pt = (x, y) => `(${x}, ${y})`;
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const mixOf = ms => () => pick(ms)();
  const MIXS = topics => [
    S("Review time!", "🔄", "This lesson mixes puzzles from earlier lessons in this level. Take your time with each one."),
    S("Remember", "🧠", topics),
    S("Tip", "💡", "Work out what kind of puzzle it is first. Then use the method you learned for that kind.")
  ];
  const tbl = (rl, cl, v) => `<table style="margin:auto;border-collapse:collapse;font-size:1.05em"><tr><td></td>${cl.map(c => `<th style="padding:4px 10px">${c}</th>`).join("")}<th style="padding:4px 10px">Total</th></tr>${rl.map((r, i) => `<tr><th style="padding:4px 10px;text-align:left">${r}</th>${v[i].map(x => `<td style="border:1px solid #888;padding:4px 14px;text-align:center">${x}</td>`).join("")}</tr>`).join("")}</table>`;
  const eqs = lines => `<div style="font-size:1.3em;line-height:1.6">${lines.join("<br>")}</div>`;
  const clock = m => { m = ((m % 1440) + 1440) % 1440; const h = Math.floor(m / 60), mi = m % 60, h12 = h % 12 === 0 ? 12 : h % 12; return `${h12}:${String(mi).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`; };
  const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];

  // ======================= LEVEL 16 =======================
  const bothSides = () => {
    const x = ri(1, 12), a = ri(3, 9), c = ri(1, a - 2), b = ri(1, 12), d = b + (a - c) * x;
    return num(`Solve for x: ${a}x + ${b} = ${c}x + ${d}`, big("⚖️"), x, [
      "There are x's on both sides. Which side has fewer x's? Start by moving those.",
      "Take the smaller group of x's away from both sides. Then take the plain number away from the side that still has x, and divide.",
      "Example: 5x + 2 = 2x + 14. Take away 2x: 3x + 2 = 14. Take away 2: 3x = 12. Divide by 3: x = 4. Now do yours."]);
  };
  const twoUnk = () => {
    if (Math.random() < 0.5) {
      const k = ri(2, 5), x = ri(2, 9), s = x * (k + 1), askY = Math.random() < 0.5;
      return num(`Two numbers add up to ${s}. The bigger number is ${k} times the smaller number. What is the ${askY ? "bigger" : "smaller"} number?`, big("🔢"), askY ? k * x : x, [
        "Call the smaller number x. Then write the bigger number using x.",
        "Together they make a number of x's: one x plus several more x's. Set that equal to the total and solve.",
        "Example: two numbers add to 20 and the bigger is 3 times the smaller. x + 3x = 20, so 4x = 20 and x = 5. The bigger is 15. Now do yours."]);
    }
    const a = ri(2, 8), d = ri(1, 6), T = 3 * a + d, askB = Math.random() < 0.5;
    return num(`A pencil costs a certain amount. A pen costs ${d} more than a pencil. 2 pencils and 1 pen cost ${T} in all. How much does one ${askB ? "pen" : "pencil"} cost?`, big("✏️🖊️"), askB ? a + d : a, [
      "Call the price of a pencil p. Write the price of a pen using p.",
      "2 pencils plus 1 pen is how many pencil-prices plus the extra? Make an equation and solve for p.",
      "Example: a pen costs 2 more than a pencil. 2 pencils and a pen cost 14. So p + p + (p + 2) = 14, so 3p = 12 and p = 4. Now do yours."]);
  };
  const slopeQ = () => {
    const t = ri(0, 2), x1 = ri(0, 5), y1 = ri(1, 6);
    if (t === 0) { const m = ri(1, 6), dx = ri(1, 4);
      return num(`A straight line goes through (${x1}, ${y1}) and (${x1 + dx}, ${y1 + m * dx}). What is its slope?`, big("📈"), m, [
        "Slope tells how steep a line is: how much it rises for each step to the right.",
        "Find the rise (change in y) and the run (change in x). Then divide rise by run.",
        "Example: through (1, 2) and (3, 8). Rise 6, run 2, slope 6 ÷ 2 = 3. Now do yours."]); }
    if (t === 1) { let p, q; do { p = ri(1, 7); q = ri(2, 5); } while (gcd(p, q) !== 1);
      return mcq(`A line goes through (${x1}, ${y1}) and (${x1 + q}, ${y1 + p}). What is its slope?`, big("📈"), `${p}/${q}`, [`${q}/${p}`, `-${p}/${q}`, `${p + q}`, `${p}`], [
        "Slope is rise over run: the change up divided by the change across.",
        "Count how far y changes and how far x changes between the two points. Put the y change on top.",
        "Example: through (0, 1) and (4, 4). Rise 3, run 4, slope 3/4. Now do yours."]); }
    const m = ri(1, 5), dx = ri(1, 3), yy = m * dx + ri(0, 3);
    return mcq(`A line goes through (${x1}, ${yy + y1}) and (${x1 + dx}, ${yy + y1 - m * dx}). What is its slope?`, big("📉"), `-${m}`, [`${m}`, `-1/${m}`, `1/${m}`], [
      "As you move right, does the line go up or down? That tells you the sign of the slope.",
      "Divide the change in y (it is negative if y goes down) by the change in x.",
      "Example: through (1, 9) and (3, 5). y falls by 4 while x grows by 2, so the slope is -2. Now do yours."]);
  };
  const lineEval = () => {
    const m = ri(2, 7), b = ri(1, 9), x = ri(2, 9), t = ri(0, 2);
    if (t === 0) return num(`A line is y = ${m}x + ${b}. What is y when x = ${x}?`, big("📈"), m * x + b, [
      "Put the number in place of x.", "Multiply first, then add the plain number.", "Example: y = 3x + 2 when x = 4: 3 × 4 = 12, then 12 + 2 = 14. Now do yours."]);
    if (t === 1) return num(`A line is y = ${m}x + ${b}. What is x when y = ${m * x + b}?`, big("📈"), x, [
      "Put the y-value into the equation. Now it is an equation with only x left.",
      "Take away the plain number from both sides, then divide by the number in front of x.",
      "Example: y = 3x + 2 and y = 14. 14 − 2 = 12, then 12 ÷ 3 = 4. Now do yours."]);
    return num(`The line y = ${m}x + ${b} crosses the y-axis. What is y at that point?`, big("📈"), b, [
      "On the y-axis, x is zero.", "Put zero in place of x and see what is left.", "Example: y = 3x + 8 at x = 0 gives y = 0 + 8 = 8. Now do yours."]);
  };
  const hyp = () => {
    const [a, b, c] = pick(TRI), k = a > 9 ? 1 : ri(1, 3);
    const [txt, vis] = pick([[`A ladder leans on a wall. The foot is ${a * k} feet from the wall, and the ladder reaches ${b * k} feet up. How long is the ladder?`, "🪜"], [`A screen is ${a * k} inches wide and ${b * k} inches tall. How many inches is its diagonal?`, "📺"], [`A robot walks ${a * k} steps east, then ${b * k} steps north. How many steps away is it, in a straight line, from the start?`, "🤖"]]);
    return num(txt, big(vis), c * k, [
      "The two given sides meet at a right angle. You need the long side across from the corner.",
      "Square each short side, add the squares, then find the square root of the total.",
      "Example: legs 6 and 8. 36 + 64 = 100, and the square root of 100 is 10. Now do yours."]);
  };
  const leg = () => {
    const [a, b, c] = pick(TRI), k = a > 9 ? 1 : ri(1, 3), sw = Math.random() < 0.5, known = sw ? a * k : b * k, ans = sw ? b * k : a * k;
    return num(`A right triangle has a longest side of ${c * k} and one short side of ${known}. How long is the other short side?`, big("📐"), ans, [
      "The longest side is across from the right angle. Squares of the short sides add up to its square.",
      "Square the longest side, take away the square of the known short side, then find the square root.",
      "Example: longest side 10, one short side 6. 100 − 36 = 64, and the square root of 64 is 8. Now do yours."]);
  };
  const simpleInt = () => {
    const P = ri(1, 9) * 100, r = ri(2, 9), t = ri(2, 6), I = P * r * t / 100, k = ri(0, 2);
    if (k === 0) return num(`You put $${P} in a bank that pays ${r}% simple interest each year. How much interest do you earn in ${t} years?`, big("🏦"), I, [
      "Simple interest is the same amount every year.", "Find one year of interest first (a percent of the money), then multiply by the number of years.", "Example: $200 at 5% for 3 years. One year: $10. Three years: $30. Now do yours."]);
    if (k === 1) return num(`You put $${P} in a bank that pays ${r}% simple interest each year. How much money do you have after ${t} years (money plus interest)?`, big("🏦"), P + I, [
      "First find all the interest. Then remember what else you have.", "Interest for one year is a percent of the start amount. Multiply by the years, then add the start amount back.", "Example: $200 at 5% for 3 years earns $30 in interest, so you have $230. Now do yours."]);
    return num(`$${P} earns ${r}% simple interest each year. After some years the interest is $${I}. How many years is that?`, big("🏦"), t, [
      "Find how much interest one year gives.", "Divide the total interest by the interest of one year.", "Example: $200 at 5% gives $10 a year. $40 of interest is 4 years. Now do yours."]);
  };
  const atLeast = () => {
    const [k, n, what] = pick([[2, 2, "a coin lands heads at least once in 2 flips"], [2, 3, "a coin lands heads at least once in 3 flips"], [6, 2, "you roll at least one six in 2 rolls of a die"], [3, 2, "a spinner with 3 equal parts lands on red at least once in 2 spins (1 part is red)"], [4, 2, "a spinner with 4 equal parts lands on blue at least once in 2 spins (1 part is blue)"], [3, 3, "a spinner with 3 equal parts lands on red at least once in 3 spins (1 part is red)"], [6, 3, "you roll at least one six in 3 rolls of a die"]]);
    const den = k ** n, top = den - (k - 1) ** n;
    return mcq(`What is the chance that ${what}?`, big("🎲"), `${top}/${den}`, [`1/${den}`, `${(k - 1) ** n}/${den}`, `${n}/${k * n}`, `${den - 1}/${den}`], [
      "'At least once' is tricky to count directly. What is the opposite of 'at least once'?",
      "Find the chance of the opposite (it never happens) by multiplying the chances of each try. Then take that away from 1.",
      "Example: a coin flipped 3 times, at least one tail. Never a tail: 1/2 × 1/2 × 1/2 = 1/8. So the answer is 1 − 1/8 = 7/8. Now do yours."]);
  };
  const passwords = () => {
    const t = ri(0, 3);
    if (t === 0) { const k = ri(3, 6), n = ri(2, 4);
      return num(`A lock needs ${n} symbols in a row. Each symbol is one of ${k} shapes, and a shape can be used again. How many different codes are there?`, big("🔐"), k ** n, [
        "Think about the choices for the first symbol, then the second, and so on.", "Each place has the same number of choices. Multiply the number of choices for every place.", "Example: 2 places and 3 shapes, repeats allowed: 3 × 3 = 9 codes. Now do yours."]); }
    if (t === 1) { const k = ri(5, 9), n = ri(2, 3); let ans = 1; for (let i = 0; i < n; i++) ans *= k - i;
      return num(`A code uses ${n} different digits chosen from the numbers 1 to ${k}. No digit can be used twice. How many codes are possible?`, big("🔐"), ans, [
        "After you use one digit, one fewer is left for the next place.", "Multiply the choices place by place, with one fewer choice each time.", "Example: 2 different digits from 1 to 5: 5 × 4 = 20 codes. Now do yours."]); }
    if (t === 2) { const n = ri(2, 4);
      return num(`A ${n}-digit PIN uses digits 0 to 9, but it cannot start with 0. Digits may repeat. How many PINs are there?`, big("🔐"), 9 * 10 ** (n - 1), [
        "The first place has fewer choices than the others. How many?", "Multiply: first place choices, then the same number of choices for every other place.", "Example: a 2-digit PIN that cannot start with 0: 9 × 10 = 90. Now do yours."]); }
    const l = ri(1, 2), d = ri(1, 2);
    return num(`A code is ${l} letter${l > 1 ? "s" : ""} from A to E (5 letters, repeats allowed) followed by ${d} digit${d > 1 ? "s" : ""} from 0 to 9 (repeats allowed). How many codes are there?`, big("🔐"), 5 ** l * 10 ** d, [
      "Count the choices for each place separately.", "Multiply the choices of all the places together, letters and digits.", "Example: 1 letter from A to C and 1 digit from 0 to 9: 3 × 10 = 30 codes. Now do yours."]);
  };
  const geom = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 5), r = pick([2, 3, 4]), s = [0, 1, 2, 3].map(i => a * r ** i);
      return num("What number comes next?", big(s.join(", ") + ", ?", 1.5), a * r ** 4, [
        "Do the numbers go up by adding the same amount, or by multiplying?", "Divide the second number by the first to find what you multiply by each time. Then multiply the last number.", "Example: 2, 6, 18, 54, ? Each time multiply by 3, so the next is 162. Now do yours."]); }
    if (t === 1) { const a = ri(1, 5), r = pick([2, 3]), n = ri(5, 6), s = [0, 1, 2].map(i => a * r ** i);
      return num(`A pattern starts ${s.join(", ")}, ... and keeps multiplying by the same number. What is term number ${n}?`, big("🌱"), a * r ** (n - 1), [
        "Find the number you multiply by each time.", `Keep multiplying, step by step, until you reach term number ${n}. Term 1 is the first number.`, "Example: 1, 2, 4, ... term 5: 1, 2, 4, 8, 16. So term 5 is 16. Now do yours."]); }
    const a = ri(1, 4), r = pick([2, 3, 4]), s = [0, 1, 2, 3].map(i => a * r ** i);
    return num("These numbers grow by multiplying by the same number each time. What is that number?", big(s.join(", ") + ", ...", 1.5), r, [
      "Compare two neighbours. Is the second a multiple of the first?", "Divide any number in the list by the one before it.", "Example: 5, 20, 80, 320. 20 ÷ 5 = 4, so the multiplier is 4. Now do yours."]);
  };
  const CV = [["it is a dog", "it is not a dog", "it is an animal", "it is not an animal"], ["a number is divisible by 10", "a number is not divisible by 10", "it ends in 0", "it does not end in 0"], ["a shape is a square", "a shape is not a square", "it has four sides", "it does not have four sides"], ["it is raining", "it is not raining", "the ground is wet", "the ground is not wet"], ["you live in Paris", "you do not live in Paris", "you live in France", "you do not live in France"], ["a number is a multiple of 6", "a number is not a multiple of 6", "it is even", "it is not even"], ["a bird is a robin", "a bird is not a robin", "it has feathers", "it has no feathers"], ["the swimmer is in the pool", "the swimmer is not in the pool", "the swimmer is wet", "the swimmer is not wet"]];
  const converse = () => {
    const [P, nP, Q, nQ] = pick(CV), orig = `If ${P}, then ${Q}.`;
    const forms = { converse: `If ${Q}, then ${P}.`, inverse: `If ${nP}, then ${nQ}.`, contrapositive: `If ${nQ}, then ${nP}.` };
    if (Math.random() < 0.5) {
      const k = pick(Object.keys(forms));
      return mcq(`Start with: <b>${orig}</b><br>Which sentence is the <b>${k}</b>?`, big("🔁"), forms[k], Object.keys(forms).filter(x => x !== k).map(x => forms[x]).concat([orig]), [
        "Converse, inverse and contrapositive are three ways to change an if-then sentence. Look at which parts move and where 'not' goes.",
        "Converse: swap the two parts. Inverse: put 'not' on both parts. Contrapositive: swap the parts AND put 'not' on both.",
        "Example: 'If it is a cat, then it has fur.' Converse: 'If it has fur, then it is a cat.' Inverse: 'If it is not a cat, then it has no fur.' Contrapositive: 'If it has no fur, then it is not a cat.' Now do yours."]);
    }
    return mcq(`Suppose this is true: <b>${orig}</b><br>Which sentence must ALSO be true?`, big("🔁"), forms.contrapositive, [forms.converse, forms.inverse, `If ${Q}, then ${nP}.`], [
      "Only one way of rewriting an if-then sentence always says the same thing as the original.",
      "Swap the two parts and put 'not' on both. If something fails to have the second part, it cannot have had the first.",
      "Example: 'If it is a cat, then it has fur' means a thing with no fur is not a cat. So 'If it has no fur, then it is not a cat' must be true. Now do yours."]);
  };
  const negate = () => {
    const [A, B] = pick([["cookies", "baked"], ["birds", "red"], ["numbers on the card", "even"], ["students", "hungry"], ["shapes", "round"], ["flowers", "yellow"], ["boxes", "empty"], ["toys", "new"]]);
    const T = { all: `All of the ${A} are ${B}.`, none: `None of the ${A} are ${B}.`, notall: `At least one of the ${A} is not ${B}.`, one: `At least one of the ${A} is ${B}.`, most: `Most of the ${A} are ${B}.`, some: `Some of the ${A} are ${B}.` };
    const k = pick(["all", "some", "none"]);
    const right = k === "all" ? T.notall : k === "some" ? T.none : T.one;
    const others = k === "all" ? [T.none, T.one, T.most] : k === "some" ? [T.all, T.notall, T.one] : [T.all, T.notall, T.most];
    return mcq(`Which sentence is the <b>opposite</b> (the negation) of: <b>${T[k]}</b>`, big("🚫"), right, others, [
      "The negation is true exactly when the original sentence is false.",
      "Ask: what is the smallest thing that would make the original sentence false?",
      "Example: 'All the apples are ripe' is false as soon as just one apple is not ripe. So its negation is 'At least one apple is not ripe'. Now do yours."]);
  };
  const impl = () => {
    const mf = () => { const t = ri(0, 3);
      if (t === 0) { const n = ri(2, 30); return [`${n} is even`, n % 2 === 0]; }
      if (t === 1) { const n = ri(2, 30); return [`${n} is odd`, n % 2 === 1]; }
      if (t === 2) { const a = ri(2, 9), b = ri(2, 9), g = Math.random() < 0.5; return [`${a} × ${b} = ${a * b + (g ? 0 : pick([-2, -1, 1, 2]))}`, g]; }
      const a = ri(1, 20); let b = ri(1, 20); if (a === b) b++; return [`${a} is more than ${b}`, a > b]; };
    if (Math.random() < 0.7) { const p = mf(); let q = mf(); while (q[0] === p[0]) q = mf();
      return mcq(`True or false? If ${p[0]}, then ${q[0]}.`, big("➡️"), (!p[1] || q[1]) ? "true" : "false", ["false", "true"], [
        "First decide whether each part, by itself, is true or false.",
        "Think of a promise. When is a promise broken? Only then is the if-then sentence false.",
        "Example: 'If 4 is odd, then 5 is even.' The first part is false. A promise about a situation that never happens is not broken, so the sentence is true. Now do yours."]); }
    return mcq("For the sentence 'If P, then Q', which case makes the whole sentence <b>false</b>?", big("➡️"), "P is true and Q is false", ["P is false and Q is true", "P is false and Q is false", "P is true and Q is true"], [
      "Think of a promise: 'If you clean your room, you get a treat.'", "In which situation did the promise-maker break their promise?", "Example: 'If it rains, I bring an umbrella.' It is broken only if it rains and I leave the umbrella at home. Now do yours."]);
  };
  const timeZones = () => {
    const t = ri(0, 47) * 30, h = ri(2, 8), tt = ri(0, 2);
    if (tt === 0) return mcq(`Town A is ${h} hours ahead of Town B. It is ${clock(t)} in Town B. What time is it in Town A?`, big("🌍"), clock(t + h * 60), [clock(t - h * 60), clock(t + (h + 1) * 60), clock(t + (h - 1) * 60)], [
      "'Ahead' means their clock shows a later time.", "Add the hours to the time in Town B. Watch out for crossing 12:00 (AM and PM change).", "Example: Town A is 3 hours ahead of Town B. It is 11:00 AM in B, so it is 2:00 PM in A. Now do yours."]);
    if (tt === 1) return mcq(`Town C is ${h} hours behind Town B. It is ${clock(t)} in Town B. What time is it in Town C?`, big("🌍"), clock(t - h * 60), [clock(t + h * 60), clock(t - (h + 1) * 60), clock(t - (h - 1) * 60)], [
      "'Behind' means their clock shows an earlier time.", "Take the hours away from the time in Town B. Watch out for crossing 12:00.", "Example: Town C is 4 hours behind Town B. It is 2:00 PM in B, so it is 10:00 AM in C. Now do yours."]);
    const d = ri(2, 9);
    return mcq(`A plane leaves Town B at ${clock(t)} (Town B time) and flies for ${d} hours to Town A, which is ${h} hours ahead of Town B. What time is it in Town A when the plane lands?`, big("✈️"), clock(t + (d + h) * 60), [clock(t + (d - h) * 60), clock(t + d * 60), clock(t + (d + h + 1) * 60)], [
      "Two things change the clock: the time spent flying and the time difference between towns.", "First find the landing time in Town B's time. Then change it to Town A's time.", "Example: leave at 8:00 AM, fly 5 hours, destination 2 hours ahead. Landing is 1:00 PM at home time, so 3:00 PM there. Now do yours."]);
  };
  const weighted = () => {
    if (Math.random() < 0.5) { let n1, a1, n2, a2, ok = false;
      for (let i = 0; i < 300 && !ok; i++) { n1 = ri(2, 8); a1 = ri(60, 95); n2 = ri(2, 8); a2 = ri(60, 95); ok = (n1 * a1 + n2 * a2) % (n1 + n2) === 0 && a1 !== a2; }
      if (!ok) { n1 = 4; n2 = 4; a1 = 70; a2 = 90; }
      return num(`${n1} kids in Group A averaged ${a1} points. ${n2} kids in Group B averaged ${a2} points. What is the average of all ${n1 + n2} kids together?`, big("📊"), (n1 * a1 + n2 * a2) / (n1 + n2), [
        "You cannot just average the two averages when the groups have different sizes.",
        "Find each group's total points (kids times average), add the totals, then divide by all the kids.",
        "Example: 2 kids average 50 and 3 kids average 80. Totals: 100 + 240 = 340. 340 ÷ 5 = 68. Now do yours."]); }
    let w1, s1, s2, ok = false;
    for (let i = 0; i < 300 && !ok; i++) { w1 = pick([20, 25, 30, 40, 50, 60, 70, 75, 80]); s1 = ri(60, 100); s2 = ri(60, 100); ok = (w1 * s1 + (100 - w1) * s2) % 100 === 0 && s1 !== s2; }
    if (!ok) { w1 = 50; s1 = 80; s2 = 90; }
    return num(`In a class the quizzes count for ${w1}% of the grade and the test counts for ${100 - w1}%. Your quiz score is ${s1} and your test score is ${s2}. What is your final grade?`, big("🎓"), (w1 * s1 + (100 - w1) * s2) / 100, [
      "Each score counts for a share of the final grade. The shares add up to 100%.",
      "Take the share of each score (a percent of it), then add the two results.",
      "Example: 30% on a score of 80 and 70% on a score of 100. 24 + 70 = 94. Now do yours."]);
  };
  const rotate = () => {
    const x = ri(1, 9) * pick([1, -1]), y = ri(1, 9) * pick([1, -1]), k = pick(["ccw", "cw", "half"]);
    const R = { ccw: [-y, x], cw: [y, -x], half: [-x, -y] }, right = R[k];
    const name = k === "ccw" ? "90° counterclockwise (a quarter turn to the left)" : k === "cw" ? "90° clockwise (a quarter turn to the right)" : "180° (a half turn)";
    const wr = Object.keys(R).filter(z => z !== k).map(z => R[z]).concat([[x, -y]]);
    return mcq(`Turn the point ${pt(x, y)} by ${name} about the origin. Where does it land?`, big("🔄"), pt(...right), wr.map(p => pt(...p)), [
      k === "half" ? "A half turn sends the point to the opposite side of the origin." : "A quarter turn swaps the roles of x and y. Try it on the easy point (1, 0).",
      k === "ccw" ? "Counterclockwise quarter turn: the numbers swap places, and the new x gets the opposite sign of the old y." : k === "cw" ? "Clockwise quarter turn: the numbers swap places, and the new y gets the opposite sign of the old x." : "A half turn changes the sign of both coordinates.",
      "Example: turn (2, 5) by 90° counterclockwise. (1, 0) goes up to (0, 1), so (x, y) becomes (−y, x) = (-5, 2). Now do yours."]);
  };
  const EXC = [["gems", "coins"], ["zips", "zaps"], ["shells", "beads"], ["tokens", "pebbles"]];
  const exchange = () => {
    const [A, B] = pick(EXC), k = ri(2, 9), g = ri(2, 12), t = ri(0, 2);
    if (t === 0) return num(`1 ${A.slice(0, -1)} is worth ${k} ${B}. How many ${B} are ${g} ${A} worth?`, big("💱"), k * g, [
      "Each of your things is worth the same number of the other thing.", "Multiply the number you have by the value of one.", "Example: 1 star = 5 dots. 4 stars = 4 × 5 = 20 dots. Now do yours."]);
    if (t === 1) return num(`1 ${A.slice(0, -1)} is worth ${k} ${B}. How many ${A} can you get for ${k * g} ${B}?`, big("💱"), g, [
      "Going the other way, you need to split the big number into groups.", "Divide the number of the small coins by what one big coin is worth.", "Example: 1 star = 5 dots. 30 dots buy 30 ÷ 5 = 6 stars. Now do yours."]);
    const m = ri(2, 5), n = ri(2, 6);
    return num(`1 star is worth ${m} ${A}, and 1 ${A.slice(0, -1)} is worth ${n} ${B}. How many ${B} are ${g} stars worth?`, big("💱"), m * n * g, [
      "Change stars into the middle coin first, then change that into the last coin.", "Multiply along the chain: stars to the middle coin, then to the last coin, for all the stars.", "Example: 1 star = 2 gems, 1 gem = 3 coins. 2 stars = 4 gems = 12 coins. Now do yours."]);
  };
  const cylinder = () => {
    const r = ri(2, 8), h = ri(2, 10), t = ri(0, 2);
    if (t === 0) return num(`A can is a cylinder with radius ${r} and height ${h}. Its volume is a number times π. What is that number?`, big("🥫"), r * r * h, [
      "Volume of a cylinder: the area of the circle at the bottom times the height.", "The circle has area π × r × r. Leave π out and multiply the rest by the height.", "Example: radius 3, height 4. 3 × 3 × 4 = 36, so the volume is 36π. Now do yours."]);
    if (t === 1) return num(`The curved side of a cylinder (no top or bottom) has area 2 × π × r × h. For radius ${r} and height ${h}, the area is a number times π. What is that number?`, big("🥫"), 2 * r * h, [
      "Unroll the side: it becomes a rectangle.", "The rectangle is as long as the circle's edge (2 × π × r) and as tall as the cylinder. Leave π out.", "Example: radius 3, height 5. 2 × 3 × 5 = 30, so the area is 30π. Now do yours."]);
    return num(`A cylinder with radius ${r} has volume ${r * r * h}π. What is its height?`, big("🥫"), h, [
      "Volume = (π × r × r) × height. Use this to work backwards.", "Divide the number in front of π by r × r.", "Example: radius 3 and volume 36π. 36 ÷ 9 = 4, so the height is 4. Now do yours."]);
  };

  // ======================= LEVEL 17 =======================
  const lineTwo = () => {
    const m = ri(1, 5), b = ri(1, 8), x1 = ri(1, 4), x2 = x1 + ri(1, 3), p1 = pt(x1, m * x1 + b), p2 = pt(x2, m * x2 + b);
    if (Math.random() < 0.5) return num(`A line goes through ${p1} and ${p2}. It has the form y = mx + b. What is b?`, big("📏"), b, [
      "Find the slope m first (rise divided by run).", "Put the slope and one of the points into y = mx + b, and solve for b.", "Example: through (1, 5) and (3, 9). m = 2. Then 5 = 2 × 1 + b, so b = 3. Now do yours."]);
    return mcq(`Which equation gives the line through ${p1} and ${p2}?`, big("📏"), `y = ${m}x + ${b}`, [`y = ${b}x + ${m}`, `y = ${m}x - ${b}`, `y = ${m + 1}x + ${b}`], [
      "Work out the slope first. Then find where the line crosses the y-axis.", "Check each equation with one of the points. Only the right one works for both points.", "Example: through (1, 4) and (2, 7). Slope 3, then 4 = 3 × 1 + b gives b = 1. So y = 3x + 1. Now do yours."]);
  };
  const sl = (p, q) => { if (q < 0) { p = -p; q = -q; } const g = gcd(Math.abs(p), q); p /= g; q /= g; return q === 1 ? String(p) : `${p}/${q}`; };
  const parPerp = () => {
    let p, q; do { p = ri(1, 6) * pick([1, -1]); q = ri(1, 5); } while (gcd(Math.abs(p), q) !== 1);
    const s = sl(p, q), t = ri(0, 2), eq = q === 1 ? `y = ${p === 1 ? "" : p === -1 ? "-" : p}x + ${ri(1, 9)}` : `y = (${p}/${q})x + ${ri(1, 9)}`;
    if (t === 0) return mcq(`A line has the equation ${eq}. What is the slope of a line <b>parallel</b> to it?`, big("🛤️"), s, [sl(-p, q), sl(-q, p), sl(q, p)], [
      "Parallel lines never meet. What does that tell you about how steep they are?", "Parallel lines are equally steep, so they share the same slope. Read the slope from the equation.", "Example: a line parallel to y = 2x + 5 has slope 2 too. Now do yours."]);
    if (t === 1) return mcq(`A line has slope ${s}. What is the slope of a line <b>perpendicular</b> to it?`, big("➕"), sl(-q, p), [s, sl(q, p), sl(-p, q)], [
      "Perpendicular lines meet at a right angle. Their slopes are linked by flipping and changing sign.", "Flip the fraction upside down (slope 3 is 3/1) and change the sign.", "Example: slope 2/3 gives perpendicular slope -3/2. Now do yours."]);
    return mcq("The slopes of two perpendicular lines (neither vertical nor flat) always multiply to give which number?", big("✖️"), "-1", ["1", "0", "2"], [
      "Try an example pair: slope 2 and the slope of a line perpendicular to it, which is -1/2.", "Multiply a slope by the slope of a perpendicular line. Try it with two or three pairs.", "Example: 3 and -1/3 multiply to give -1; 4/5 and -5/4 also give -1. Now do yours."]);
  };
  const midDist = () => {
    const t = ri(0, 2);
    if (t === 0) { const [dx, dy, d] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]), x1 = ri(0, 6), y1 = ri(0, 6);
      return num(`How far is ${pt(x1, y1)} from ${pt(x1 + dx, y1 + dy)}? (Straight-line distance.)`, big("📏"), d, [
        "Draw a right triangle between the points. The straight line is its longest side.", "Find the horizontal and vertical differences, square both, add them, and take the square root.", "Example: from (0, 0) to (6, 8): 36 + 64 = 100, so the distance is 10. Now do yours."]); }
    const x1 = ri(1, 8), x2 = x1 + 2 * ri(1, 5), y1 = ri(1, 8), y2 = y1 + 2 * ri(1, 5), askX = t === 1;
    return num(`What is the ${askX ? "x" : "y"}-coordinate of the midpoint of ${pt(x1, y1)} and ${pt(x2, y2)}?`, big("📍"), askX ? (x1 + x2) / 2 : (y1 + y2) / 2, [
      "The midpoint is exactly halfway between the two points.", `Average the ${askX ? "x" : "y"}-values: add them and divide by 2.`, "Example: the midpoint of (2, 3) and (8, 7) has x = (2 + 8) ÷ 2 = 5 and y = (3 + 7) ÷ 2 = 5. Now do yours."]);
  };
  const elim = () => {
    const x = ri(1, 9), y = ri(1, 9), a = ri(1, 5), b = ri(1, 5), c = ri(1, 5), askX = Math.random() < 0.5;
    if (Math.random() < 0.5) { let cc = c; if (cc === a) cc = a % 5 + 1;
      return num(`Solve the pair of equations. What is ${askX ? "x" : "y"}?`, eqs([`${a}x + ${b}y = ${a * x + b * y}`, `${cc}x + ${b}y = ${cc * x + b * y}`]), askX ? x : y, [
        "Both equations have the same amount of y. What happens if you subtract one equation from the other?",
        "Subtracting makes the y's disappear. Solve the leftover equation for x, then put x into an equation to get y.",
        "Example: 3x + 2y = 16 and x + 2y = 8. Subtract: 2x = 8, so x = 4. Then 4 + 2y = 8 gives y = 2. Now do yours."]); }
    return num(`Solve the pair of equations. What is ${askX ? "x" : "y"}?`, eqs([`${a}x + ${b}y = ${a * x + b * y}`, `${c}x − ${b}y = ${c * x - b * y}`]), askX ? x : y, [
      "One equation has +y and the other has the same amount of -y. What happens if you add the equations?",
      "Adding makes the y's cancel. Solve the leftover equation for x, then put x into an equation to get y.",
      "Example: 2x + 3y = 12 and 4x − 3y = 6. Add: 6x = 18, so x = 3. Then 6 + 3y = 12 gives y = 2. Now do yours."]);
  };
  const expLaw = () => {
    const t = ri(0, 4), b = ri(2, 9);
    if (t === 0) { const m = ri(2, 6), n = ri(2, 6); return num(`${b}^${m} × ${b}^${n} = ${b}^?  What is the missing exponent?`, big("⚡"), m + n, [
      "Same base multiplied: think about writing out the repeated multiplication.", "Count how many times the base is multiplied in total.", "Example: 3² × 3⁴ = (3×3) × (3×3×3×3) = 3⁶, so the exponents add. Now do yours."]); }
    if (t === 1) { const m = ri(2, 4), n = ri(2, 4); return num(`(${b}^${m})^${n} = ${b}^?  What is the missing exponent?`, big("⚡"), m * n, [
      "A power of a power: you write the inner power several times.", "The inner power is multiplied together that many times. How many copies of the base is that altogether?", "Example: (5²)³ = 5² × 5² × 5² = 5⁶. Now do yours."]); }
    if (t === 2) { const n = ri(1, 4), m = n + ri(2, 5); return num(`${b}^${m} ÷ ${b}^${n} = ${b}^?  What is the missing exponent?`, big("⚡"), m - n, [
      "Dividing cancels matching copies of the base on the top and bottom.", "Cancel as many copies as the smaller exponent says. How many are left?", "Example: 4⁶ ÷ 4² = 4⁴, because two of the six copies cancel. Now do yours."]); }
    if (t === 3) { const p = ri(2, 3), bb = ri(2, 5); return num(`${bb}^-${p} is the same as 1 divided by what number?`, big("⚡"), bb ** p, [
      "A negative exponent means 'flip it to the bottom of a fraction'.", "The exponent becomes positive on the bottom. Work out that power.", "Example: 2^-3 = 1 ÷ 2³ = 1/8, so it is 1 divided by 8. Now do yours."]); }
    const a = ri(3, 6), c = ri(1, 3), d = ri(1, 2);
    return num(`x^${a} × x^${c} ÷ x^${d} = x^?  What is the missing exponent?`, big("⚡"), a + c - d, [
      "Multiplying adds the exponents. Dividing takes them away.", "Do the multiplying first, then the dividing, from left to right.", "Example: x⁵ × x² ÷ x³ = x⁷ ÷ x³ = x⁴. Now do yours."]);
  };
  const simpRoot = () => {
    const k = ri(2, 9), m = pick([2, 3, 5, 6, 7]), n = k * k * m;
    if (Math.random() < 0.5) return num(`√${n} can be written as ?√${m}. What is the missing number?`, big("√"), k, [
      "Look for a perfect square that goes into the number under the root.", `Split the number into (a perfect square) × ${m}. The square root of the perfect square comes out in front.`, "Example: √50 = √(25 × 2) = 5√2. Now do yours."]);
    return num(`√${n} can be written as ${k}√?. What number goes under the root sign?`, big("√"), m, [
      "Divide the number by the square of the number in front.", `${k} comes out of the root as ${k} × ${k} inside. Divide by that.`, "Example: √50 = 5√?: 25 comes out, and 50 ÷ 25 = 2, so it is 5√2. Now do yours."]);
  };
  const ratIrr = () => {
    const R = [["√49 (7)", "√49"], ["0.75", "0.75"], ["22/7", "22/7"], ["0.333... (the 3s go on forever)", "0.333..."], ["√0.25", "√0.25"], ["-3", "-3"], ["√81", "√81"], ["0.121212... (repeating)", "0.1212..."], ["√(1/4)", "√(1/4)"], ["√1.44", "√1.44"]];
    const I = [["√50", "√50"], ["π", "π"], ["√2", "√2"], ["√10", "√10"], ["√12", "√12"], ["2π", "2π"], ["3 + √2", "3 + √2"], ["√7", "√7"]];
    if (Math.random() < 0.5) { const isR = Math.random() < 0.5, [d] = isR ? pick(R) : pick(I);
      return mcq(`Is ${d} a rational or an irrational number?`, big("🔢"), isR ? "rational" : "irrational", [isR ? "irrational" : "rational"], [
        "A rational number can be written as a fraction of two whole numbers.", "Ask: is it a whole number, a fraction, or a decimal that stops or repeats? Does a square root come out exactly?", "Example: √16 = 4 is rational, but √15 is not a neat number, so it is irrational. Now do yours."]); }
    const irr = pick(I)[1], rs = shuf(R).slice(0, 3).map(x => x[1]);
    return mcq("Which of these is an <b>irrational</b> number?", big("🔢"), irr, rs, [
      "Irrational numbers have decimals that never stop and never repeat.", "Three of these can be written as fractions. Look for one that cannot. Check the square roots: does one come out exactly?", "Example: of 0.5, √9 and √3, only √3 is irrational, because 0.5 = 1/2 and √9 = 3. Now do yours."]);
  };
  const funcNot = () => {
    const t = ri(0, 3), x = ri(2, 9);
    if (t === 0) { const a = ri(2, 6), b = ri(1, 9); return num(`f(x) = ${a}x + ${b}. What is f(${x})?`, big("ƒ"), a * x + b, [
      "f(x) is just a rule. f(4) means 'use 4 as the input'.", "Put the input number in place of every x, then multiply, then add.", "Example: f(x) = 3x + 2, so f(5) = 3 × 5 + 2 = 17. Now do yours."]); }
    if (t === 1) { const k = ri(1, 9); return num(`f(x) = x² + ${k}. What is f(${x})?`, big("ƒ"), x * x + k, [
      "Put the input in place of x.", "Square the input first (multiply it by itself), then add the plain number.", "Example: f(x) = x² + 3, so f(4) = 16 + 3 = 19. Now do yours."]); }
    if (t === 2) { const a = ri(2, 5), b = ri(1, 6), c = ri(1, 5); return num(`f(x) = ${a}x + 1 and g(x) = x + ${c}. What is f(g(${x}))?`, big("ƒ"), a * (x + c) + 1, [
      "f(g(x)) means: do g first, then use its answer as the input of f.", "Find g of the number first. Then put that result into f.", "Example: f(x) = 2x + 1, g(x) = x + 3. g(2) = 5, then f(5) = 11. Now do yours."]); }
    const a = ri(2, 5), b = ri(1, 6), n = ri(3, 9);
    return num(`f(x) = ${a}x − ${a * n}. What is f(${n + x})?`, big("ƒ"), a * x, [
      "Put the input in place of x.", "Multiply the input by the number in front of x, then take away the other number.", "Example: f(x) = 4x − 8, so f(5) = 20 − 8 = 12. Now do yours."]);
  };
  const isFunc = () => {
    const xs = shuf([1, 2, 3, 4, 5, 6, 7]).slice(0, 4), ys = xs.map(() => ri(1, 9)), isF = Math.random() < 0.5;
    let pairs = xs.map((x, i) => [x, ys[i]]);
    if (!isF) { const i = ri(0, 2); let y2 = ri(1, 9); while (y2 === ys[i]) y2 = ri(1, 9); pairs[i + 1] = [xs[i], y2]; }
    return mcq(`Look at these (input, output) pairs: ${pairs.map(p => pt(...p)).join(" ")}. Is this a function?`, big("🎰"), isF ? "yes" : "no", [isF ? "no" : "yes"], [
      "A function gives exactly one output for each input.", "Look at the first numbers (the inputs). Does any input appear twice with different outputs?", "Example: (1, 5) (2, 5) (3, 6) is a function, even though 5 repeats. But (1, 5) (1, 6) is not, because the input 1 gives two outputs. Now do yours."]);
  };
  const negIneq = () => {
    const a = ri(2, 5), t = ri(2, 9), b = ri(1, 9), c = b - a * t, strict = Math.random() < 0.5;
    return num(`What is the greatest <b>whole number</b> x that makes this true? &nbsp; −${a}x + ${b} ${strict ? ">" : "≥"} ${neg(c)}`, big("↔️"), strict ? t - 1 : t, [
      "Solve it like an equation, but remember one special rule when dividing by a negative number.", "Dividing by a negative flips the sign: > becomes <, and ≥ becomes ≤. Then pick the biggest whole number that works (strict < excludes the boundary).", "Example: -2x + 3 > -5. Take away 3: -2x > -8. Divide by -2 and flip: x < 4. The greatest whole number is 3. Now do yours."]);
  };
  const boxDiag = () => {
    const Q = [[1, 2, 2, 3], [2, 3, 6, 7], [2, 4, 4, 6], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [3, 4, 12, 13], [6, 6, 7, 11], [2, 10, 11, 15]];
    const [l, w, h, d] = pick(Q), k = d <= 9 && Math.random() < 0.5 ? 2 : 1, dims = shuf([l, w, h]);
    return num(`A box is ${dims[0] * k} by ${dims[1] * k} by ${dims[2] * k}. How long is the longest straight stick that fits inside, corner to opposite corner?`, big("📦"), d * k, [
      "Use the Pythagorean theorem twice: first across the floor of the box, then up through the height.", "The corner-to-corner length is the square root of (length² + width² + height²).", "Example: a 2 by 3 by 6 box: 4 + 9 + 36 = 49, and the square root of 49 is 7. Now do yours."]);
  };
  const coneSph = () => {
    const t = ri(0, 3);
    if (t === 0) { let r, h; do { r = ri(2, 9); h = ri(3, 12); } while ((r * r * h) % 3 !== 0);
      return num(`A cone has radius ${r} and height ${h}. Its volume is (1/3) × π × r² × h, which is a number times π. What is that number?`, big("🍦"), r * r * h / 3, [
        "A cone holds one third of the cylinder with the same base and height.", "Work out r × r × h, then take one third of it. Leave π out.", "Example: radius 3, height 5: 9 × 5 = 45, one third is 15, so the volume is 15π. Now do yours."]); }
    if (t === 1) { const r = pick([3, 6]);
      return num(`A ball has radius ${r}. Its volume is (4/3) × π × r³, which is a number times π. What is that number?`, big("⚽"), 4 * r ** 3 / 3, [
        "r³ means r × r × r.", "Work out r × r × r, multiply by 4, then divide by 3. Leave π out.", "Example: radius 9 would give 729, times 4 is 2916, divided by 3 is 972, so the volume is 972π. Now do yours."]); }
    if (t === 2) { const r = ri(2, 9);
      return num(`The outside area of a ball is 4 × π × r². For radius ${r} it is a number times π. What is that number?`, big("⚽"), 4 * r * r, [
        "Square the radius first (r × r).", "Multiply the squared radius by 4. Leave π out.", "Example: radius 5. 5 × 5 = 25, times 4 = 100, so the area is 100π. Now do yours."]); }
    const r = pick([3, 6, 9]);
    return num(`A half ball (hemisphere) has radius ${r}. Its volume is two thirds of π × r³, which is a number times π. What is that number?`, big("🥣"), 2 * r ** 3 / 3, [
      "A hemisphere is half a ball: two thirds of π × r³.", "Compute r × r × r, multiply by 2, divide by 3.", "Example: radius 3: 27 × 2 = 54, ÷ 3 = 18, so the volume is 18π. Now do yours."]);
  };
  const twoWay = () => {
    const a = ri(3, 14), b = ri(3, 14), c = ri(3, 14), d = ri(3, 14), t = ri(0, 2);
    const [r0, r1] = pick([["Boys", "Girls"], ["Grade 7", "Grade 8"], ["Cat owners", "Dog owners"]]);
    const [c0, c1] = pick([["Likes soccer", "Likes chess"], ["Walks to school", "Rides the bus"], ["Has a sister", "No sister"]]);
    if (t === 0) { const row = Math.random() < 0.5;
      return num(`Here is a table of kids. How many kids are in the row <b>${row ? r0 : r1}</b> in all?`, tbl([r0, r1], [c0, c1], [[a, b, "?"], [c, d, "?"]]), row ? a + b : c + d, [
        "A total adds every cell in a row (or column).", "Add the two numbers that are in that row of the table.", "Example: a row has 6 and 9. The row total is 15. Now do yours."]); }
    if (t === 1) { const tr0 = a + b, tc0 = a + c;
      return num("Some numbers in the table are missing. How many kids go in the cell marked <b>?</b>", tbl([r0, r1], [c0, c1], [["?", b, tr0], [c, d, c + d], [tc0, b + d, a + b + c + d]]), a, [
        "Row totals and column totals both help you. Use a row that has only one unknown.", "The row total is the sum of its cells. Take the known cell away from the row total.", "Example: a row total is 20 and one cell is 8, so the other cell is 12. Now do yours."]); }
    const N = a + b + c + d, tr = a + b;
    return mcq(`Look at the table. Of the kids in the <b>${r0}</b> row, what fraction are in the column <b>${c0}</b>? (Write it in simplest form.)`, tbl([r0, r1], [c0, c1], [[a, b, tr], [c, d, c + d], [a + c, b + d, N]]), frs(a, tr), [frs(a, N), frs(b, tr), frs(a, a + c)], [
      "'Of the kids in the row' means you only look at that row. That row is your whole.", "The cell you want goes on top. The total of the row goes on the bottom. Simplify at the end.", "Example: a row has 3 in one cell and 9 in the other. The fraction for the first cell is 3/12 = 1/4. Now do yours."]);
  };
  const trend = () => {
    if (Math.random() < 0.6) { const x0 = ri(1, 3), y0 = ri(20, 50), m = ri(3, 9), x1 = x0 + ri(2, 5);
      return num(`A trend line passes through the point (${x0} hours, ${y0} points). Each extra hour of study adds ${m} points. What score does the trend line predict for ${x1} hours?`, big("📈"), y0 + m * (x1 - x0), [
        "Count how many extra hours there are beyond the known point.", "Multiply the extra hours by the points gained per hour, then add that to the starting score.", "Example: at 2 hours the score is 40, and each hour adds 5. For 4 hours: 2 more hours = 10 more points, so 50. Now do yours."]); }
    const lo = ri(10, 20), hi = lo + ri(4, 8), inside = Math.random() < 0.5, v = inside ? ri(lo + 1, hi - 1) : pick([hi + ri(5, 15), lo - ri(2, 8)]);
    return mcq(`Data were collected for ages ${lo} to ${hi}. Using the trend line to predict for age ${v} is called:`, big("🔮"), inside ? "interpolating" : "extrapolating", [inside ? "extrapolating" : "interpolating"], [
      "Is the new age inside the range of the data you have, or outside of it?", "'Inter' means between. 'Extra' means beyond. Which one fits this age?", "Example: data for ages 8 to 12 and a prediction for age 10 is inside (between). A prediction for age 30 is beyond. Now do yours."]);
  };
  const seriesSum = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(10, 60); return num(`What is 1 + 2 + 3 + ... + ${n}?`, big("➕"), n * (n + 1) / 2, [
      "Pair up the first and last numbers: 1 + the biggest, 2 + the second biggest, and so on.", "Every pair has the same total. Count how many pairs there are (half the count of numbers).", "Example: 1 + 2 + ... + 10: five pairs, each equal to 11, so 55. Now do yours."]); }
    if (t === 1) { const n = ri(5, 30); return num(`What is 2 + 4 + 6 + ... + ${2 * n}? (the first ${n} even numbers)`, big("➕"), n * (n + 1), [
      "These are double the numbers 1, 2, 3, ...", "Find 1 + 2 + ... + n by pairing, then double it.", "Example: 2 + 4 + 6 + 8 + 10 is double 1 + 2 + 3 + 4 + 5 = 15, so it is 30. Now do yours."]); }
    const a = ri(2, 9), d = ri(2, 6), n = ri(6, 14);
    return num(`An arithmetic list starts at ${a}, goes up by ${d} each time, and has ${n} numbers. What is the sum of the whole list?`, big("➕"), n * (2 * a + (n - 1) * d) / 2, [
      "Find the last number first, then pair the first with the last.", "The last number is the first plus (count − 1) steps. The sum is (first + last) × count ÷ 2.", "Example: 3, 5, 7, 9, 11, 13 (6 numbers). First + last = 16. 16 × 6 ÷ 2 = 48. Now do yours."]);
  };
  const deMorgan = () => {
    const isAnd = Math.random() < 0.5;
    const [A, B] = pick([["it is sunny", "it is warm"], ["I have a pen", "I have a pencil"], ["the door is open", "the window is open"], ["the cat is asleep", "the dog is asleep"], ["Mia is at home", "Leo is at home"]]);
    const right = isAnd ? "not A, or not B" : "not A, and not B";
    return mcq(`Let A = "${A}" and B = "${B}". Which statement means the same as: <b>It is NOT true that (A ${isAnd ? "and" : "or"} B)</b>?`, big("🧮"), right, isAnd ? ["not A, and not B", "A, or B", "not A, or B"] : ["not A, or not B", "A, and B", "not A, and B"], [
      "Think about when the original statement would be false.", isAnd ? "'A and B' fails as soon as one of the two is missing." : "'A or B' fails only when both are missing.", "Example: 'It is not true that (I have a hat or a scarf)' means I have no hat and no scarf. Now do yours."]);
  };
  const necSuff = () => {
    const I = [["a number is divisible by 6", "it is even", "sufficient but not necessary"], ["a number is even", "it is divisible by 4", "necessary but not sufficient"], ["a shape is a square", "it has four sides", "sufficient but not necessary"], ["a shape has four sides", "it is a square", "necessary but not sufficient"], ["a number is a multiple of 10", "it ends in 0", "both"], ["a shape is a triangle", "it has exactly three sides", "both"], ["a number is prime", "it is odd", "neither"], ["a number is a multiple of 3", "it is a multiple of 9", "necessary but not sufficient"], ["a number is a multiple of 9", "it is a multiple of 3", "sufficient but not necessary"], ["a number is odd", "it is divisible by 5", "neither"], ["a number ends in 5", "it is divisible by 5", "sufficient but not necessary"], ["a shape is a rectangle", "it is a square", "necessary but not sufficient"]];
    const [A, B, ans] = pick(I);
    return mcq(`Fact A: ${A}.<br>Fact B: ${B}.<br>Is fact A <b>sufficient</b>, <b>necessary</b>, both, or neither, as a condition for fact B?`, big("🔑"), ans, ["sufficient but not necessary", "necessary but not sufficient", "both", "neither"].filter(x => x !== ans), [
      "Test two directions. Does A always lead to B? Does B always need A?",
      "'Sufficient' means A alone is enough to guarantee B. 'Necessary' means B can never happen without A. Try to find a counterexample in each direction.",
      "Example: A = 'a number is divisible by 4', B = 'it is even'. A always gives B, so A is enough. But 6 is even and not divisible by 4, so A is not required. Now do yours."]);
  };
  const custom = () => {
    const F = [["2a + b", (a, b) => 2 * a + b], ["a × b + a", (a, b) => a * b + a], ["3a − b", (a, b) => 3 * a - b], ["a² + b", (a, b) => a * a + b]];
    for (let i = 0; i < 100; i++) {
      const [s, f] = pick(F), a = ri(2, 7), b = ri(1, 6), c = ri(1, 6), t = ri(0, 2);
      if (t === 0) { const v = f(a, b); if (v < 1) continue;
        return num(`In this puzzle, a ★ b means ${s}. What is ${a} ★ ${b}?`, big("★"), v, [
          "The star is just a made-up rule. Replace a and b with the numbers.", "Put the first number where a is and the second where b is, then calculate.", "Example: if a ★ b means 3a + b, then 2 ★ 5 = 6 + 5 = 11. Now do yours."]); }
      if (t === 1) { const v = f(a, b), w = f(v, c); if (v < 1 || w < 1) continue;
        return num(`In this puzzle, a ★ b means ${s}. What is (${a} ★ ${b}) ★ ${c}?`, big("★"), w, [
          "Brackets first: do the part inside the brackets.", "Use the answer of the bracket as the new first number, and ★ it with the last number.", "Example: if a ★ b means a + 2b, then (1 ★ 2) ★ 3 = 5 ★ 3 = 11. Now do yours."]); }
      const v = f(a, b); if (v < 1) continue;
      return num(`In this puzzle, a ★ b means ${s}. If ${a} ★ x = ${v}, what is x?`, big("★"), b, [
        "Put the numbers you know into the rule and keep x as a letter.", "You now have a normal equation with x. Undo the steps one at a time.", "Example: if a ★ b means 2a + b and 3 ★ x = 10, then 6 + x = 10, so x = 4. Now do yours."]);
    }
    return num("In this puzzle, a ★ b means 2a + b. What is 3 ★ 4?", big("★"), 10, ["Replace a and b.", "Put 3 where a is and 4 where b is.", "Example: if a ★ b means a + 2b, 1 ★ 2 = 5. Now do yours."]);
  };

  // ======================= LEVEL 18 =======================
  const expand = () => {
    const a = ri(1, 9), b = ri(1, 9), t = ri(0, 3);
    if (t === 0) return num(`(x + ${a})(x + ${b}) = x² + ?x + ${a * b}. What number is the ? ?`, big("✖️"), a + b, [
      "Multiply every part of the first bracket by every part of the second.", "The x terms come from x × b and a × x. Add them together.", "Example: (x + 2)(x + 5) = x² + 5x + 2x + 10 = x² + 7x + 10. Now do yours."]);
    if (t === 1) return num(`(x + ${a})(x + ${b}) = x² + ${a + b}x + ?. What number is the ? ?`, big("✖️"), a * b, [
      "The plain number comes from multiplying the two plain numbers.", "Multiply the plain number of the first bracket by the plain number of the second.", "Example: in (x + 3)(x + 4) the plain number is 3 × 4 = 12. Now do yours."]);
    if (t === 2) return num(`(x + ${a})² = x² + ?x + ${a * a}. What number is the ? ?`, big("✖️"), 2 * a, [
      "(x + a)² means (x + a) times (x + a).", "The two middle terms are equal, so you get two copies of the same term.", "Example: (x + 4)² = x² + 4x + 4x + 16 = x² + 8x + 16. Now do yours."]);
    const c = ri(2, 4);
    return num(`(${c}x + ${a})(x + ${b}) = ${c}x² + ?x + ${a * b}. What number is the ? ?`, big("✖️"), c * b + a, [
      "Multiply every part of the first bracket by every part of the second.", "Two products have just one x: the first term of the first bracket times the plain number of the second, and the other way round. Add them.", "Example: (2x + 3)(x + 4) = 2x² + 8x + 3x + 12 = 2x² + 11x + 12. Now do yours."]);
  };
  const factorQ = () => {
    let p = ri(1, 8), q = ri(2, 9); if (q <= p) q = p + ri(1, 3);
    const askQ = Math.random() < 0.6;
    return num(`x² + ${p + q}x + ${p * q} factors as (x + p)(x + q) with p smaller than q. What is ${askQ ? "q" : "p"}?`, big("🧩"), askQ ? q : p, [
      "You need two numbers that multiply to the plain number and add to the number in front of x.", "List pairs of whole numbers that multiply to the plain number. Which pair also adds to the middle number?", "Example: x² + 7x + 12. 3 × 4 = 12 and 3 + 4 = 7, so it is (x + 3)(x + 4). Now do yours."]);
  };
  const quadRoot = () => {
    const p = ri(1, 7), q = p + ri(1, 6), t = ri(0, 3);
    if (t === 0) return num(`Solve (x − ${p})(x − ${q}) = 0. What is the larger solution?`, big("🎯"), q, [
      "If two things multiply to zero, one of them must be zero.", "Set each bracket equal to zero and solve. Pick the bigger answer.", "Example: (x − 2)(x − 6) = 0 gives x = 2 or x = 6. Now do yours."]);
    if (t === 1) return num(`Solve x² − ${p + q}x + ${p * q} = 0. What is the larger solution?`, big("🎯"), q, [
      "First factor the left side into two brackets.", "Find two numbers that multiply to the plain number and add to the middle number (it is subtracted, so both brackets have a minus). Then set each bracket to zero.", "Example: x² − 9x + 20 = (x − 4)(x − 5) = 0, so x = 4 or 5. Now do yours."]);
    if (t === 2) return num(`Solve x² = ${p * p}. What is the positive solution?`, big("🎯"), p, [
      "You need a number that gives the target when multiplied by itself.", "Take the square root. (There is also a negative solution, but give the positive one.)", "Example: x² = 49 gives x = 7 (or -7). Now do yours."]);
    return num(`Solve x(x − ${p}) = 0. What is the solution that is not zero?`, big("🎯"), p, [
      "If a product is zero, one of the factors is zero.", "One factor is x itself. Set the other bracket to zero.", "Example: x(x − 8) = 0 gives x = 0 or x = 8. Now do yours."]);
  };
  const diffSq = () => {
    const t = ri(0, 2);
    if (t === 0) { const m = ri(20, 80), d = ri(1, 9); return num(`Use a trick to work out ${m + d}² − ${m - d}² in your head.`, big("✨"), 4 * m * d, [
      "a² − b² = (a + b)(a − b). It turns a hard subtraction into an easy multiplication.", "Add the two numbers, subtract them, then multiply the results.", "Example: 52² − 48² = (52 + 48)(52 − 48) = 100 × 4 = 400. Now do yours."]); }
    if (t === 1) { const m = pick([10, 20, 30, 40, 50, 100]), d = ri(1, 5); return num(`Work out ${m + d} × ${m - d} using (a + b)(a − b) = a² − b².`, big("✨"), m * m - d * d, [
      "The two numbers are the same distance above and below a round number.", "Square the round number in the middle, then take away the square of the distance.", "Example: 51 × 49 = 50² − 1² = 2500 − 1 = 2499. Now do yours."]); }
    const D = ri(2, 9), s = ri(5, 15);
    return num(`x² − y² = (x + y)(x − y). If x + y = ${s} and x − y = ${D}, what is x² − y²?`, big("✨"), s * D, [
      "You do not need to find x and y separately.", "Multiply the two numbers you are given.", "Example: x + y = 10 and x − y = 3 gives x² − y² = 30. Now do yours."]);
  };
  const linWord = () => {
    const t = ri(0, 2);
    if (t === 0) { const f = ri(2, 6), r = ri(2, 5), k = ri(3, 15);
      return num(`A taxi costs $${f} to start, plus $${r} for every kilometre. A trip costs $${f + r * k}. How many kilometres was the trip?`, big("🚕"), k, [
        "Take away the starting fee. What is left pays for the kilometres?", "Divide the money left by the cost of one kilometre.", "Example: start fee $3, $2 per km, total $19. 19 − 3 = 16, and 16 ÷ 2 = 8 km. Now do yours."]); }
    if (t === 1) { const x = ri(3, 12), b = ri(2, 6), d = b - ri(1, b - 1), a = ri(5, 20), c = a + (b - d) * x;
      return num(`Plan A costs $${a} to join plus $${b} a month. Plan B costs $${c} to join plus $${d} a month. After how many months do both plans cost the same in total?`, big("📱"), x, [
        "Write the total cost of each plan for m months. When are they equal?", "Set the two costs equal. Move the m's to one side and the plain numbers to the other, then divide.", "Example: Plan A: 5 + 4m. Plan B: 17 + 2m. 5 + 4m = 17 + 2m gives 2m = 12, m = 6. Now do yours."]); }
    const r = ri(2, 9), f = ri(3, 20), what = pick([["cost of each ticket", "tickets"], ["cost of each item", "items"]]);
    return mcq(`The total cost of going to a fair is y = ${r}x + ${f}, where x is the number of rides. What does the ${r} mean?`, big("🎡"), "the cost of each ride", ["the cost to get in, before any rides", "the number of rides", "the total cost"], [
      "In y = mx + b, the number in front of x tells how fast y changes.", "The number in front of x is the amount added each time x goes up by 1. The number on its own is the amount when x is zero.", "Example: y = 3x + 10, where x is movies: 3 is the price per movie and 10 is a fixed fee. Now do yours."]);
  };
  const expGrowth = () => {
    const t = ri(0, 2), h = ri(2, 5);
    if (t === 0) { const s = ri(1, 9), n = ri(2, 6);
      return num(`A pond has ${s} lily pad${s > 1 ? "s" : ""}. The number of pads doubles every ${h} days. How many pads are there after ${h * n} days?`, big("🪷"), s * 2 ** n, [
        "Count how many doublings happen: divide the days by the doubling time.", "Double the number again and again, once for each doubling.", "Example: 3 pads, doubling every 2 days, for 6 days is 3 doublings: 3, 6, 12, 24. Now do yours."]); }
    if (t === 1) { const s = ri(1, 5), n = ri(2, 4);
      return num(`A rumour is told to ${s} person${s > 1 ? "s" : ""}. Each hour the number of people who know it triples. How many people know it after ${n} hours?`, big("📣"), s * 3 ** n, [
        "Triple means multiply by 3, once for each hour.", "Start with the first number and multiply by 3, repeating for each hour.", "Example: 2 people, tripling for 2 hours: 2, 6, 18. Now do yours."]); }
    const s = ri(2, 12), n = ri(2, 5);
    return num(`A sample has ${s * 2 ** n} grams. Half of it breaks down every ${h} days. How many grams are left after ${h * n} days?`, big("⏳"), s, [
      "Count how many times it is cut in half.", "Halve the amount again and again, once per half-life period.", "Example: 80 grams halving 3 times: 40, 20, 10. Now do yours."]);
  };
  const compoundInt = () => {
    const t = ri(0, 2);
    if (t === 0) { const P = ri(1, 9) * 100, r = pick([10, 20]);
      const f = r === 10 ? 1.21 : 1.44; return num(`$${P} grows by ${r}% each year, and each year's interest is added to the money (compound interest). How much money is there after 2 years?`, big("🏦"), Math.round(P * f), [
        "Year 2's interest is worked out on the new, bigger amount.", `Find the amount after year 1 by adding ${r}% to it, then do the same thing again to that new amount.`, "Example: $200 at 10%: after year 1 $220, after year 2 $220 + $22 = $242. Now do yours."]); }
    if (t === 1) { const P = ri(1, 3) * 1000;
      return num(`$${P} grows by 10% each year, with interest added every year (compound). How much money is there after 3 years?`, big("🏦"), Math.round(P * 1.331), [
        "Do three rounds of 'add 10%'.", "Each year the amount is 1.1 times the year before (add one tenth). Do it three times in a row.", "Example: $100 at 10% for 3 years: 110, 121, 133.1. Now do yours."]); }
    const P = ri(1, 9) * 100, r = pick([10, 20]);
    return num(`$${P} earns ${r}% a year for 2 years. How many dollars MORE do you have with compound interest than with simple interest?`, big("🏦"), P * r * r / 10000, [
      "Both ways give the same interest in year 1. The difference appears in year 2.", "In compound interest, year 2 also earns interest on year 1's interest. Find that extra amount.", "Example: $200 at 10%. Year 1 interest is $20. Compound year 2 earns 10% of $20, which is the extra $2. Now do yours."]);
  };
  const transCombo = () => {
    const x = ri(1, 6), y = ri(1, 6), dx = ri(1, 4) * pick([1, -1]), dy = ri(1, 4) * pick([1, -1]);
    const ops = { tr: [`slide it ${Math.abs(dx)} ${dx > 0 ? "right" : "left"} and ${Math.abs(dy)} ${dy > 0 ? "up" : "down"}`, p => [p[0] + dx, p[1] + dy]], rx: ["reflect it in the x-axis", p => [p[0], -p[1]]], ry: ["reflect it in the y-axis", p => [-p[0], p[1]]], r180: ["rotate it 180° about the origin", p => [-p[0], -p[1]]] };
    const k = shuf(Object.keys(ops)).slice(0, 2), o1 = ops[k[0]], o2 = ops[k[1]];
    const right = o2[1](o1[1]([x, y])), wrong1 = o1[1](o2[1]([x, y])), wr = [wrong1, o1[1]([x, y]), o2[1]([x, y]), [x, y]];
    return mcq(`Start with the point ${pt(x, y)}. First ${o1[0]}. Then ${o2[0]}. Where does the point end up?`, big("🧭"), pt(...right), wr.map(p => pt(...p)), [
      "Do the moves one at a time, in the order given. Write down the point after each move.", "Reflecting in the x-axis changes the sign of y. Reflecting in the y-axis changes the sign of x. Rotating 180° changes both signs. Sliding adds or subtracts.", "Example: start (2, 1). Slide 3 right: (5, 1). Reflect in the x-axis: (5, -1). Now do yours."]);
  };
  const shadows = () => {
    const h = pick([4, 5, 6]), s = pick([2, 3, 4, 5]), k = ri(2, 9), S = s * k, H = h * k;
    if (Math.random() < 0.7) return num(`At noon a ${h}-foot post casts a ${s}-foot shadow. At the same time a tree casts a ${S}-foot shadow. How tall is the tree in feet?`, big("🌳"), H, [
      "The sun makes similar triangles: tall things and their shadows keep the same ratio.", "Find how many times longer the tree's shadow is than the post's shadow. The tree is that many times taller.", "Example: a 3-foot stick has a 2-foot shadow. A tower with a 40-foot shadow is 20 times as long, so it is 60 feet tall. Now do yours."]);
    return num(`A ${H}-metre building casts a ${S}-metre shadow. At the same time a person casts a ${s}-metre shadow. How tall is the person in metres?`, big("🏢"), h, [
      "Same sun, same angle: the two triangles are similar.", "The building's height is a number of times the person's height. The shadows have the same scale factor.", "Example: a 30 m tower has a 20 m shadow; a person with a 2 m shadow is 1/10 as long a shadow, so 3 m tall. Now do yours."]);
  };
  const trig = () => {
    const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), k = ri(1, 2), t = pick(["sin", "cos", "tan"]);
    const A = a * k, B = b * k, C = c * k, ratio = { sin: [A, C], cos: [B, C], tan: [A, B] }[t];
    const wr = [frs(B, C), frs(A, B), frs(C, A), frs(A, C), frs(B, A)].filter(x => x !== frs(...ratio));
    return mcq(`A right triangle has sides ${A}, ${B} and ${C} (${C} is the longest). Angle X is opposite the side of length ${A}. What is ${t} X? (Simplest form.)`, big("📐"), frs(...ratio), wr, [
      "Label the sides from angle X's point of view: opposite, adjacent (next to it), and hypotenuse (longest).",
      "sin = opposite ÷ hypotenuse. cos = adjacent ÷ hypotenuse. tan = opposite ÷ adjacent. Pick the right pair and simplify.",
      "Example: sides 6, 8, 10; angle Y is opposite 6. sin Y = 6/10 = 3/5, cos Y = 8/10 = 4/5, tan Y = 6/8 = 3/4. Now do yours."]);
  };
  const special = () => {
    const t = ri(0, 3), s = ri(2, 12);
    if (t === 0) return num(`In a 30°-60°-90° triangle, the shortest side is ${s}. How long is the hypotenuse?`, big("📐"), 2 * s, [
      "In this special triangle the sides always have the same pattern.", "The hypotenuse is twice the shortest side (the side opposite the 30° angle).", "Example: shortest side 5, so the hypotenuse is 10. Now do yours."]);
    if (t === 1) return num(`In a 30°-60°-90° triangle, the hypotenuse is ${2 * s}. How long is the shortest side?`, big("📐"), s, [
      "The hypotenuse is the longest side, opposite the right angle.", "The shortest side is half of the hypotenuse.", "Example: hypotenuse 14, shortest side 7. Now do yours."]);
    if (t === 2) return num(`In a 45°-45°-90° triangle the hypotenuse is ${2 * s}. Each of the two equal sides is a number times √2. What is that number?`, big("📐"), s, [
      "The two short sides are equal, and the hypotenuse is √2 times as long as one of them.", "Divide the hypotenuse by √2. Dividing by √2 is the same as multiplying by √2 and then halving.", "Example: hypotenuse 12 gives each side 12/√2 = 6√2, so the number is 6. Now do yours."]);
    return num(`A square has sides of length ${s}. Its diagonal is ${s}√2. If the diagonal is ${s * 3}√2, how long is each side?`, big("🔲"), s * 3, [
      "A square's diagonal splits it into two 45°-45°-90° triangles.", "The diagonal is √2 times a side. So the side is the number in front of √2.", "Example: diagonal 7√2 means each side is 7. Now do yours."]);
  };
  const inscribed = () => {
    const t = ri(0, 3), a = ri(2, 8) * 10;
    if (t === 0) return num(`An inscribed angle (corner on the circle) is ${a}°. How big is the central angle (at the centre) on the same arc?`, big("⭕"), 2 * a, [
      "The same arc can be seen from the centre and from the edge of the circle.", "The angle at the centre is twice the angle at the edge.", "Example: edge angle 35° means centre angle 70°. Now do yours."]);
    if (t === 1) return num(`The central angle on an arc is ${2 * a}°. How big is an inscribed angle on the same arc?`, big("⭕"), a, [
      "The angle at the centre and the angle at the edge are linked by a factor of 2.", "The angle at the edge is half of the angle at the centre.", "Example: centre angle 90° means edge angle 45°. Now do yours."]);
    if (t === 2) return num("A triangle is drawn inside a circle so that one side is a diameter. How many degrees is the angle at the opposite corner on the circle?", big("⭕"), 90, [
      "A diameter makes a half-turn at the centre. What is a half-turn in degrees?", "The inscribed angle on that arc is half of the central angle.", "Example: the same idea works for any diameter: the half-turn at the centre is 180° and the corner angle is half of it. Now do yours."]);
    return num(`Four corners of a quadrilateral sit on a circle. One angle is ${a}°. How big is the opposite angle?`, big("⭕"), 180 - a, [
      "In a four-sided shape inside a circle, opposite angles are linked.", "Opposite angles add up to 180°. Take the angle you know away from 180.", "Example: one angle is 100°, so the opposite angle is 80°. Now do yours."]);
  };
  const arcSector = () => {
    for (let i = 0; i < 100; i++) {
      const th = pick([60, 90, 120, 180, 270]), r = ri(2, 12), isArc = Math.random() < 0.5, v = isArc ? th / 360 * 2 * r : th / 360 * r * r;
      if (!Number.isInteger(v) || v < 1) continue;
      return num(isArc ? `A slice of a circle with radius ${r} has a ${th}° angle. The curved edge (arc) has length equal to a number times π. What is that number?` : `A circle has radius ${r}. A sector (pizza slice) has a ${th}° angle at the centre. Its area is a number times π. What is that number?`, big(isArc ? "🍕" : "🍰"), v, isArc ? [
        "The arc is a fraction of the whole circle's edge.", "Whole edge = 2 × π × r. Multiply by (angle ÷ 360). Leave π out of your answer.", "Example: radius 6, angle 90°: whole edge 12π, one quarter is 3π. Now do yours."] : [
        "The sector is a fraction of the whole circle's area.", "Whole area = π × r × r. Multiply by (angle ÷ 360). Leave π out of your answer.", "Example: radius 4, angle 90°: whole area 16π, one quarter is 4π. Now do yours."]);
    }
    return num("A circle has radius 6. A 90° sector has area a number times π. What is that number?", big("🍰"), 9, ["The sector is a fraction of the whole circle.", "Whole area = π × r × r; take the right fraction.", "Example: radius 4, 90°: 16π ÷ 4 = 4π. Now do yours."]);
  };
  const permComb = () => {
    const n = ri(5, 9), r = ri(2, 3), t = ri(0, 3);
    let P = 1, C = 1; for (let i = 0; i < r; i++) P *= n - i; C = P / (r === 2 ? 2 : 6);
    if (t === 0) return num(`${n} runners race. Gold, silver and bronze go to the first 3 places. In how many ways can the 3 medals be given out?`, big("🏅"), n * (n - 1) * (n - 2), [
      "Does the order of finishing matter here?", "Yes, order matters. Choices: any runner for gold, one fewer for silver, one fewer again for bronze. Multiply.", "Example: 4 runners, 2 medals (gold and silver): 4 × 3 = 12 ways. Now do yours."]);
    if (t === 1) return num(`A teacher picks ${r} kids from a group of ${n} to form a team. The order does not matter. How many different teams are possible?`, big("👥"), C, [
      "Here the order does not matter: a team of Ann and Bo is the same as Bo and Ann.", `First count the ordered lists (${r === 2 ? "n × (n − 1)" : "n × (n − 1) × (n − 2)"}). Then divide by the number of ways to order the team members.`, "Example: 5 kids, teams of 2. Ordered: 5 × 4 = 20. Each team is counted 2 times, so 10 teams. Now do yours."]);
    if (t === 2) return num(`how many different pairs of people can be made from a group of ${n} people?`, big("🤝"), n * (n - 1) / 2, [
      "Pairs have no order: Ann and Bo is the same pair as Bo and Ann.", "Count ordered pairs (n × (n − 1)) and divide by 2.", "Example: 6 people make 6 × 5 ÷ 2 = 15 pairs. Now do yours."]);
    return num(`A club has ${n} members. They choose a president and a treasurer (two different people, and the jobs are different). How many ways can they do it?`, big("🏛️"), n * (n - 1), [
      "Are the two jobs different? Does it matter who gets which?", "Yes, order matters. Choices for the first job, times the choices left for the second.", "Example: 5 members: 5 × 4 = 20 ways. Now do yours."]);
  };
  const orRule = () => {
    const [a, b] = pick([[2, 3], [2, 5], [3, 5], [3, 4], [2, 7]]), N = pick([20, 30, 40, 60, 24, 36]), l = a * b / gcd(a, b);
    const cnt = Math.floor(N / a) + Math.floor(N / b) - Math.floor(N / l);
    return num(`Cards are numbered 1 to ${N}. How many cards have a number that is a multiple of ${a} <b>or</b> a multiple of ${b} (or both)?`, big("🃏"), cnt, [
      "If you count the multiples of each, some numbers get counted twice. Which ones?", "Add the count of multiples of one number and of the other, then take away the numbers counted twice (multiples of both).", "Example: 1 to 20, multiples of 2 or 5: 10 + 4 − 2 = 12. Now do yours."]);
  };
  const quartiles = () => {
    const n = pick([7, 11]), d = Array.from({ length: n }, () => ri(1, 40)).sort((a, b) => a - b), med = d[(n - 1) / 2], h = (n - 1) / 2;
    const q1 = d[(h - 1) / 2], q3 = d[h + 1 + (h - 1) / 2], t = pick(["q1", "q3", "iqr", "range"]);
    const ans = t === "q1" ? q1 : t === "q3" ? q3 : t === "iqr" ? q3 - q1 : d[n - 1] - d[0];
    const name = t === "q1" ? "lower quartile (Q1: the median of the lower half, not counting the middle number)" : t === "q3" ? "upper quartile (Q3: the median of the upper half, not counting the middle number)" : t === "iqr" ? "interquartile range (Q3 − Q1)" : "range";
    return num(`Data: ${shuf(d).join(", ")}. What is the ${name}?`, big("📦"), ans, [
      "Put the numbers in order from smallest to biggest first.", t === "range" ? "The range is the biggest number minus the smallest." : "Find the median (middle). Split the data into a lower half and an upper half, leaving the median out. Q1 is the median of the lower half and Q3 is the median of the upper half.", "Example: 2, 4, 5, 7, 9, 10, 12. Median 7. Lower half 2, 4, 5 → Q1 = 4. Upper half 9, 10, 12 → Q3 = 10. IQR = 6. Now do yours."]);
  };
  const mad = () => {
    for (let i = 0; i < 400; i++) {
      const d = Array.from({ length: 5 }, () => ri(2, 20)), s = d.reduce((a, b) => a + b, 0); if (s % 5 !== 0) continue;
      const m = s / 5, dev = d.map(x => Math.abs(x - m)), sd = dev.reduce((a, b) => a + b, 0); if (sd % 5 !== 0 || sd === 0) continue;
      return num(`Data: ${d.join(", ")}. The mean is ${m}. What is the mean absolute deviation (the average distance of the numbers from the mean)?`, big("📏"), sd / 5, [
        "For each number, find its distance from the mean (ignore minus signs).", "Add the five distances up, then divide by 5.", "Example: data 3, 5, 7 with mean 5: distances 2, 0, 2. Total 4, divided by 3 is not neat, but the method is the same. Now do yours."]);
    }
    return num("Data: 2, 4, 6, 8, 10. The mean is 6. What is the mean absolute deviation?", big("📏"), 2, ["Find each distance from the mean.", "Add them and divide by 5.", "Example: 1, 3, 5 with mean 3: 2, 0, 2. Now do yours."]);
  };
  const parity = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(4, 12);
      return mcq(`${n} coins lie heads up in a row. In each move you must flip exactly 2 coins. Can you ever get all ${n} coins tails up?`, big("🪙"), n % 2 === 0 ? "yes, it can be done" : "no, it is impossible", [n % 2 === 0 ? "no, it is impossible" : "yes, it can be done"], [
        "To go from heads to tails, every coin must be flipped an odd number of times.", "Each move flips 2 coins, so the total number of flips is even. Is the total of all those odd counts even or odd?", "Example: 3 coins and 2 flips per move. We need 3 odd numbers to add up to an even total, which is impossible. With 4 coins it works: flip coins 1+2, then 3+4. Now do yours."]); }
    if (t === 1) { const n = ri(5, 11), d = ri(2, 4), ok = (n * d) % 2 === 0;
      return mcq(`At a party of ${n} people, can everyone shake hands with exactly ${d} other people?`, big("🤝"), ok ? "yes, it can be done" : "no, it is impossible", [ok ? "no, it is impossible" : "yes, it can be done"], [
        "Count handshake 'ends': every handshake has exactly two ends.", "Total handshake ends = people × handshakes each. This must be an even number. Is it?", "Example: 5 people with 3 handshakes each makes 15 ends, which is odd, so impossible. 6 people with 3 each makes 18, which can work. Now do yours."]); }
    const k = ri(3, 9), s = ri(k, k + 14), ok = (k % 2) === (s % 2);
    return mcq(`Can ${k} odd numbers add up to ${s}?`, big("➕"), ok ? "yes, it can be done" : "no, it is impossible", [ok ? "no, it is impossible" : "yes, it can be done"], [
      "Think about what happens to odd and even when you add odd numbers one at a time.", "Odd + odd = even. Odd + odd + odd = odd. So the answer depends on whether the count of odd numbers is even or odd.", "Example: 3 odd numbers always make an odd total (like 1 + 3 + 5 = 9), so they can never add to 10. Now do yours."]);
  };

  // ---------- slide helper for lessons ----------
  const mk16 = [bothSides, twoUnk, slopeQ, lineEval, hyp, leg, simpleInt, atLeast, passwords, geom, converse, negate, impl, timeZones, weighted, rotate, exchange, cylinder];
  const mk17 = [lineTwo, parPerp, midDist, elim, expLaw, simpRoot, ratIrr, funcNot, isFunc, negIneq, boxDiag, coneSph, twoWay, trend, seriesSum, deMorgan, necSuff, custom];
  const mk18 = [expand, factorQ, quadRoot, diffSq, linWord, expGrowth, compoundInt, transCombo, shadows, trig, special, inscribed, arcSector, permComb, orRule, quartiles, mad, parity];

  const L16 = [
    L("Variables on both sides", bothSides, [S("Two sides", "⚖️", "An equation is a balance. Whatever you do to one side, do to the other."), S("Gather the x's", "🧲", "Take away the smaller group of x's from both sides so x is only on one side."), S("Finish", "✅", "Then move the plain numbers away from the x side and divide.")]),
    L("Two unknowns", twoUnk, [S("Name the unknowns", "🔤", "Call one number x and write the other using x, like '3 times x' or 'x + 2'."), S("One equation", "🧩", "Put both into the total and you get one equation with one letter."), S("Check it", "✅", "Put your answer back into the story to make sure it fits.")]),
    L("Slope of a line", slopeQ, [S("Steepness", "⛰️", "Slope tells how steep a line is: the rise for each step across."), S("Rise over run", "↗️", "Slope = (change in y) ÷ (change in x). Go up = positive, down = negative."), S("Careful", "⚠️", "Take the points in the same order for both subtractions.")]),
    L("Lines: y = mx + b", lineEval, [S("The pieces", "🧱", "In y = mx + b, m is the slope and b is where the line crosses the y-axis."), S("Find y", "🔢", "Put the x-value in, multiply by m, then add b."), S("Find x", "↩️", "Given y, take away b, then divide by m.")]),
    L("Pythagoras: the long side", hyp, [S("Right triangles", "📐", "A right triangle has a square corner. The side across from it is the longest: the hypotenuse."), S("The rule", "🧮", "a² + b² = c², where c is the hypotenuse."), S("Triples", "🔢", "3-4-5, 5-12-13 and 8-15-17 are neat sets. Doubling them also works.")]),
    L("Pythagoras: the short side", leg, [S("Work backwards", "↩️", "If you know the hypotenuse and one leg, find the other leg."), S("The rule", "🧮", "a² = c² − b². Subtract, then take the square root."), S("Check", "✅", "The hypotenuse must be the longest side.")]),
    L("Simple interest", simpleInt, [S("What it is", "🏦", "Interest is money a bank pays you for keeping money with it."), S("Simple", "➗", "Interest = money × rate × years. The same amount each year."), S("Total", "💰", "Money after the time = start money + interest.")]),
    L("At least one", atLeast, [S("The trick", "🔄", "'At least one' is easier to find using the opposite: none at all."), S("Multiply", "✖️", "Chance of none = multiply the 'miss' chance for each try."), S("Take away", "➖", "Chance of at least one = 1 − chance of none.")]),
    L("Counting codes", passwords, [S("Place by place", "🔐", "Think about the choices for each place in the code."), S("Multiply", "✖️", "Multiply the number of choices of every place."), S("No repeats", "🚫", "If you cannot reuse something, each next place has one fewer choice.")]),
    L("Geometric sequences", geom, [S("Multiply", "✖️", "In a geometric sequence you multiply by the same number each time."), S("Find the multiplier", "➗", "Divide any term by the term before it."), S("Far terms", "🚀", "Keep multiplying, or multiply the first term by the multiplier once for each step.")]),
    L("Converse and contrapositive", converse, [S("If-then", "➡️", "'If P, then Q' can be changed in three ways."), S("Three changes", "🔁", "Converse: swap. Inverse: add 'not' to both. Contrapositive: swap AND add 'not'."), S("Which is safe?", "✅", "Only the contrapositive is always true when the original is true.")]),
    L("The opposite of a statement", negate, [S("Negation", "🚫", "The negation of a statement is true exactly when the statement is false."), S("All", "🅰️", "The opposite of 'all are' is 'at least one is not'."), S("Some and none", "🔀", "The opposite of 'some are' is 'none are'. The opposite of 'none are' is 'at least one is'.")]),
    L("If-then: true or false?", impl, [S("A promise", "🤝", "'If P then Q' is a promise. It is only broken when P happens and Q does not."), S("Four cases", "🗂️", "False only for: P true and Q false. All other cases are true."), S("Surprise", "😮", "If P is false the promise is never tested, so the sentence counts as true.")]),
    L("Time zones", timeZones, [S("Ahead or behind", "🌍", "Ahead = later time on the clock. Behind = earlier time."), S("Add or take away", "⏰", "Add the hours for 'ahead'. Take them away for 'behind'."), S("Flights", "✈️", "Add the flight time, then adjust for the time difference.")]),
    L("Weighted averages", weighted, [S("Not all equal", "⚖️", "Some groups or scores count more than others."), S("Totals", "➕", "Multiply each average by its size (or weight), add, then divide."), S("Between", "📏", "The weighted average is always between the lowest and highest score.")]),
    L("Turning points", rotate, [S("Quarter turn", "🔄", "Turning (x, y) a quarter turn swaps x and y and changes one sign."), S("Which sign?", "➖", "Counterclockwise: (x, y) → (−y, x). Clockwise: (x, y) → (y, −x)."), S("Half turn", "🔃", "A half turn: (x, y) → (−x, −y).")]),
    L("Exchange rates", exchange, [S("Rates", "💱", "An exchange rate says how much of one money equals one of another."), S("Multiply or divide", "✖️", "To get more small coins, multiply. To get big coins, divide."), S("Chains", "🔗", "Change one step at a time and multiply along the chain.")]),
    L("Cylinders", cylinder, [S("Stack of circles", "🥫", "A cylinder is circles stacked up. Volume = π × r × r × height."), S("Side", "📜", "The curved side unrolls into a rectangle: 2 × π × r by height."), S("Leave π", "π", "You can leave π in the answer, like 36π.")]),
    L("Mixed practice", mixOf(mk16), MIXS("Equations, slope, Pythagoras, interest, chances, codes, sequences, if-then logic, time zones, rotations and cylinders.")),
    L("Level 16 Challenge", mixOf(mk16), MIXS("Level 16 mixes everything: equations, lines, right triangles, chances, counting and logic."))
  ];

  const L17 = [
    L("Line through two points", lineTwo, [S("Two steps", "📏", "First find the slope m. Then use a point to find b."), S("Find b", "🔎", "b = y − m × x, using either point."), S("Write it", "✍️", "Put m and b into y = mx + b.")]),
    L("Parallel and perpendicular", parPerp, [S("Parallel", "🛤️", "Parallel lines have the same slope."), S("Perpendicular", "➕", "Perpendicular lines have slopes that are negative reciprocals: flip it and change the sign."), S("Product", "✖️", "The two slopes multiply to −1.")]),
    L("Midpoints and distance", midDist, [S("Midpoint", "📍", "Average the x's and average the y's."), S("Distance", "📏", "Make a right triangle: distance² = (change in x)² + (change in y)²."), S("Neat ones", "🔢", "Differences of 3 and 4, or 5 and 12, give whole-number distances.")]),
    L("Two equations: adding and subtracting", elim, [S("Cancel", "➖", "Add or subtract the equations so one letter disappears."), S("Match", "🔗", "Look for the same amount (subtract) or opposite amounts (add) of a letter."), S("Back in", "↩️", "Put your answer in an equation to find the other letter.")]),
    L("Exponent rules", expLaw, [S("Same base, multiply", "⚡", "a^m × a^n = a^(m+n). Add the exponents."), S("Divide and power", "➗", "a^m ÷ a^n = a^(m−n). (a^m)^n = a^(m×n)."), S("Negative", "🔄", "a^−n = 1 ÷ a^n.")]),
    L("Simplifying roots", simpRoot, [S("Perfect squares", "🔲", "4, 9, 16, 25, 36, 49 ... are perfect squares."), S("Pull out", "🧲", "√(k² × m) = k√m. Find a perfect square inside."), S("Check", "✅", "k × k × m should give the original number.")]),
    L("Rational or irrational?", ratIrr, [S("Rational", "➗", "A rational number can be written as a fraction of whole numbers. Its decimal stops or repeats."), S("Irrational", "♾️", "Irrational decimals go on forever without repeating, like π and √2."), S("Roots", "√", "The square root of a perfect square is rational. Others are irrational.")]),
    L("Function notation", funcNot, [S("A rule", "ƒ", "f(x) is a rule with input x. f(3) means use 3 as the input."), S("Replace", "🔁", "Put the input in place of every x."), S("Nested", "🪆", "f(g(2)): work out g(2) first, then use it in f.")]),
    L("Is it a function?", isFunc, [S("One output", "🎰", "A function gives exactly one output for each input."), S("Check inputs", "👀", "Look for an input that appears twice with different outputs."), S("Repeats are fine", "🔁", "Two inputs may share an output. That is still a function.")]),
    L("Inequalities with negatives", negIneq, [S("Solve it", "↔️", "Solve an inequality like an equation."), S("The flip", "🔃", "When you multiply or divide by a negative, reverse the sign."), S("Whole numbers", "🔢", "Then find the biggest whole number that fits.")]),
    L("Corner to corner in a box", boxDiag, [S("Twice", "📦", "Use Pythagoras twice: across the floor, then up."), S("Shortcut", "⚡", "d² = l² + w² + h²."), S("Neat boxes", "🔢", "2, 3, 6 gives 7. 1, 2, 2 gives 3. 2, 4, 4 gives 6.")]),
    L("Cones and balls", coneSph, [S("Cone", "🍦", "Cone volume = (1/3) × π × r² × h."), S("Ball", "⚽", "Ball volume = (4/3) × π × r³. Outside area = 4 × π × r²."), S("Leave π", "π", "Give the number in front of π.")]),
    L("Two-way tables", twoWay, [S("Rows and columns", "🗂️", "A two-way table sorts people two ways at once."), S("Totals", "➕", "Row totals and column totals help you find missing cells."), S("Of those who...", "🎯", "'Of the kids in this row' means only that row is your whole.")]),
    L("Trend lines", trend, [S("Trend", "📈", "A trend line shows the pattern in data and helps predict."), S("Predict", "🔮", "Start at a point on the line and add the slope for each step."), S("Be careful", "⚠️", "Predicting inside the data is safer than predicting far outside it.")]),
    L("Adding a long list", seriesSum, [S("Pair up", "🤝", "Add the first and last, the second and second last, and so on."), S("Same total", "🟰", "In a list that grows evenly, every pair has the same total."), S("Formula", "📐", "Sum = (first + last) × count ÷ 2.")]),
    L("De Morgan's laws", deMorgan, [S("Not (A and B)", "🧮", "False when at least one is missing: not A, or not B."), S("Not (A or B)", "🚫", "False only when both are missing: not A, and not B."), S("Swap", "🔄", "Negating swaps 'and' with 'or'.")]),
    L("Necessary or sufficient?", necSuff, [S("Sufficient", "✅", "A is sufficient for B if A alone guarantees B."), S("Necessary", "🔑", "A is necessary for B if B cannot happen without A."), S("Test", "🧪", "Try to find a counterexample in each direction.")]),
    L("Made-up operations", custom, [S("Invent a rule", "★", "Mathematicians invent new operations with symbols."), S("Replace", "🔁", "Put the numbers into the rule where the letters are."), S("Brackets", "🪆", "Do the inside of the brackets first.")]),
    L("Mixed practice", mixOf(mk17), MIXS("Lines, distance, pairs of equations, exponents, roots, functions, solids, tables and logic.")),
    L("Level 17 Challenge", mixOf(mk17), MIXS("Level 17 mixes lines, algebra, functions, solids, data and logic."))
  ];

  const L18 = [
    L("Multiplying brackets", expand, [S("All pairs", "✖️", "Multiply every part of the first bracket by every part of the second."), S("Combine", "➕", "Add the two x terms together."), S("Shortcut", "⚡", "(x + a)(x + b) = x² + (a + b)x + ab.")]),
    L("Factoring x² + bx + c", factorQ, [S("Backwards", "↩️", "Factoring is multiplying brackets backwards."), S("Two numbers", "🔍", "Find two numbers that multiply to c and add to b."), S("Write it", "✍️", "(x + p)(x + q).")]),
    L("Solving quadratics", quadRoot, [S("Zero product", "0️⃣", "If A × B = 0 then A = 0 or B = 0."), S("Two answers", "✌️", "Set each bracket to zero. You usually get two solutions."), S("Square equations", "🔲", "x² = 49 has solutions 7 and −7.")]),
    L("Difference of squares", diffSq, [S("The pattern", "✨", "a² − b² = (a + b)(a − b)."), S("Mental maths", "🧠", "Use it to calculate things like 51 × 49 quickly."), S("Without finding", "🪄", "If you know the sum and the difference, just multiply them.")]),
    L("Linear word problems", linWord, [S("Starting plus rate", "🚕", "Many costs are: starting amount + rate × amount used."), S("Compare plans", "⚖️", "To find when two plans are equal, set the two costs equal."), S("Meaning", "💡", "In y = mx + b, m is the rate and b is the start.")]),
    L("Growing and shrinking", expGrowth, [S("Repeated multiplying", "🌱", "Doubling and tripling multiply again and again."), S("Count the steps", "🔢", "Work out how many doublings fit in the time."), S("Halving", "⏳", "To go back in time, double instead.")]),
    L("Compound interest", compoundInt, [S("Interest on interest", "🏦", "Compound interest earns interest on the interest too."), S("Multiply", "✖️", "Each year multiply by (1 + rate): 10% means × 1.1."), S("Compare", "⚖️", "Compound is a bit more than simple, and the gap grows.")]),
    L("Moves in a row", transCombo, [S("Slide", "➡️", "A slide adds to or subtracts from the coordinates."), S("Flip", "🪞", "Reflect in the x-axis: y changes sign. In the y-axis: x changes sign."), S("In order", "📋", "Do the moves one at a time, in the order given.")]),
    L("Shadows and similar triangles", shadows, [S("Same sun", "☀️", "The sun makes similar triangles for tall things and their shadows."), S("Scale", "🔍", "Find how many times bigger one shadow is. The height scales the same."), S("Check", "✅", "Taller things have longer shadows.")]),
    L("Sine, cosine, tangent", trig, [S("Name sides", "📐", "Opposite the angle, adjacent (next to it), and hypotenuse."), S("SOH CAH TOA", "🧠", "sin = opp/hyp, cos = adj/hyp, tan = opp/adj."), S("Simplify", "✂️", "Write the fraction in simplest form.")]),
    L("Special right triangles", special, [S("30-60-90", "📐", "Sides are in the ratio 1 : √3 : 2."), S("45-45-90", "📏", "Sides are in the ratio 1 : 1 : √2."), S("Squares", "🔲", "A square's diagonal is √2 times its side.")]),
    L("Angles in circles", inscribed, [S("Centre and edge", "⭕", "The angle at the centre is twice the angle at the edge on the same arc."), S("Half circle", "🌓", "An angle on a diameter is 90°."), S("Four corners", "🔷", "Opposite angles of a four-sided shape in a circle add to 180°.")]),
    L("Arcs and sectors", arcSector, [S("A fraction", "🍕", "A sector is a fraction of a circle: angle ÷ 360."), S("Arc", "〰️", "Arc = fraction × 2πr."), S("Area", "🍰", "Sector area = fraction × πr².")]),
    L("Order matters or not?", permComb, [S("Order matters", "🏅", "Race places and jobs: multiply choices, one fewer each time."), S("Order does not", "👥", "Teams and pairs: count ordered lists, then divide by the orderings."), S("Pairs", "🤝", "n people make n × (n − 1) ÷ 2 pairs.")]),
    L("Either one or the other", orRule, [S("Count both", "🃏", "Add the two groups."), S("Double counted", "⚠️", "Numbers in both groups were counted twice."), S("Take away", "➖", "A or B = A + B − (both).")]),
    L("Quartiles and the box plot", quartiles, [S("Order first", "📶", "Put the data in order."), S("Four parts", "📦", "The median splits the data in two; the quartiles split each half."), S("IQR", "📏", "IQR = Q3 − Q1, the spread of the middle half.")]),
    L("How spread out is it?", mad, [S("Distance", "📏", "How far is each number from the mean?"), S("No minus", "➕", "Use positive distances."), S("Average them", "➗", "Mean absolute deviation = average of the distances.")]),
    L("Parity tricks", parity, [S("Odd or even", "🔢", "Odd + odd = even. Even + odd = odd."), S("Count ends", "🤝", "Handshakes: each has two ends, so the total of ends is even."), S("Impossible", "🚫", "A parity argument can show something can never happen.")]),
    L("Mixed practice", mixOf(mk18), MIXS("Brackets, factoring, growth, interest, similar triangles, trig, circles, counting, data and parity.")),
    L("Level 18 Challenge", mixOf(mk18), MIXS("Level 18 mixes algebra, growth, geometry, counting, data and reasoning."))
  ];

  Object.assign(LOGIC_LEVELS, { 16: L16, 17: L17, 18: L18 });
})();
