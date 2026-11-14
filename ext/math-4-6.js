// ext/math-4-6.js  Mind Lab Math levels 4-6 (60 lessons)
(() => {
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const IT = [["apples", "🍎"], ["stars", "⭐"], ["cookies", "🍪"], ["balloons", "🎈"], ["stickers", "🌟"], ["marbles", "🔵"], ["books", "📚"], ["pencils", "✏️"]];
  const rx = (lo, hi, ...avoid) => { let x, i = 0; do { x = ri(lo, hi); } while (avoid.includes(x) && ++i < 80); return x; };
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, teach) => { make.teach = () => teach; return { title, make }; };
  const mixOf = (title, lessons) => {
    const f = () => pick(lessons).make();
    f.teach = () => {
      const s = [S("Review time!", "🔄", "This lesson mixes ideas you have learned. Here is a quick reminder of each one, then the quiz.")];
      lessons.forEach(l => s.push(l.make.teach()[0]));
      return s;
    };
    return { title, make: f };
  };
  const first = list => list.find(Boolean);
  // split y into place-value parts, biggest first
  const parts = y => [1000, 100, 10, 1].map(p => (Math.floor(y / p) % 10) * p).filter(p => p > 0);
  const addSteps = (x, y) => { let c = x; const out = []; parts(y).forEach(p => { c += p; out.push(`+ ${p} = ${c}`); }); return `Start at ${x}: ${out.join(", ")}.`; };
  const subSteps = (x, y) => { let c = x; const out = []; parts(y).forEach(p => { c -= p; out.push(`− ${p} = ${c}`); }); return `Start at ${x}: ${out.join(", ")}.`; };
  const wrongAdj = (ans) => g => (Math.abs(g - ans) === 1 ? "So close! Check your last step again." : Math.abs(g - ans) === 10 || Math.abs(g - ans) === 100 ? "Almost! Check your carrying (or borrowing) between the places." : null);

  // ================= LEVEL 4 =================
  const place3 = () => {
    const h = ri(1, 9), t = ri(0, 9), o = ri(0, 9), xh = rx(1, 9, h), xt = ri(0, 9), xo = ri(0, 9);
    return {
      text: `${h} hundreds, ${t} tens and ${o} ones = ?`, visual: "🟥".repeat(h) + " " + "🟦".repeat(t) + " " + "🟨".repeat(o), answer: h * 100 + t * 10 + o,
      hints: ["A red block is 100, a blue block is 10 and a yellow block is 1. Work out what each part is worth.", `Hundreds first: how much is ${h} hundreds? Then add the tens part and the ones part. A zero means none of that block.`,
        `Example: ${xh} hundreds, ${xt} tens and ${xo} ones is ${xh * 100} + ${xt * 10} + ${xo} = ${xh * 100 + xt * 10 + xo}. Now do yours.`]
    };
  };
  const digitVal = () => {
    const ds = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3), n = ds[0] * 100 + ds[1] * 10 + ds[2], p = ri(0, 2), d = ds[p], mult = [100, 10, 1][p];
    return {
      text: `What is the value of the digit <b>${d}</b> in ${n}?`, choices: shuf([d * 100, d * 10, d]), answer: d * mult,
      hints: ["A digit is worth different amounts in different places: hundreds, tens or ones.", `Find where the ${d} sits. The left digit is hundreds, the middle is tens and the right is ones.`,
        "Example: in 652 the 5 is in the middle, the tens place, so it is worth 5 tens = 50. Now find yours."]
    };
  };
  const compare3 = () => {
    const a = ri(100, 999); let b = Math.random() < 0.5 ? Math.floor(a / 100) * 100 + ri(0, 99) : ri(100, 999);
    if (b === a) b = a < 999 ? a + 1 : a - 1;
    const big = Math.random() < 0.5, ans = big ? Math.max(a, b) : Math.min(a, b);
    return {
      text: `Which number is ${big ? "bigger" : "smaller"}?`, choices: [a, b], answer: ans,
      hints: ["Compare the digits from the left. The hundreds place matters most.", "If the hundreds digits match, compare the tens. If those match too, compare the ones.",
        "Example: 472 and 458. Both have 4 hundreds. Tens: 7 is more than 5, so 472 is bigger. Now try yours."]
    };
  };
  const round10 = () => {
    let n; do { n = ri(11, 199); } while (n % 10 === 5);
    const ans = n % 10 < 5 ? n - (n % 10) : n - (n % 10) + 10, x = n > 100 ? 37 : 163;
    return {
      text: `Round ${n} to the nearest ten.`, answer: ans,
      hints: ["Rounding means finding the closest ten. Look at the ones digit.", "If the ones digit is 0 to 4, stay at the lower ten. If it is 5 to 9, go up to the next ten.",
        `Example: ${x} has ${x % 10} ones. ${x % 10 < 5 ? "That is less than 5, so we go down to " + (x - (x % 10)) : "That is 5 or more, so we go up to " + (x - (x % 10) + 10)}. Now round yours.`]
    };
  };
  const add2r = () => {
    const oa = ri(2, 9), ob = ri(10 - oa, 9), ta = ri(1, 5), tb = ri(1, 4), a = ta * 10 + oa, b = tb * 10 + ob;
    const [x, y] = [[38, 27], [46, 35], [29, 48]].find(p => p[0] + p[1] !== a + b);
    return {
      text: `${a} + ${b} = ?`, answer: a + b, wrong: wrongAdj(a + b),
      hints: ["Add the ones first. If they make 10 or more, you get a new ten to carry.", "Add the ones, write the ones digit, carry the extra ten, then add the tens (and the carried ten).",
        `Example: ${x} + ${y}. Ones: ${x % 10} + ${y % 10} = ${x % 10 + y % 10}, so write ${(x % 10 + y % 10) % 10} and carry 1 ten. Tens: ${Math.floor(x / 10)} + ${Math.floor(y / 10)} + 1 = ${Math.floor(x / 10) + Math.floor(y / 10) + 1}. The answer is ${x + y}. Now do yours.`]
    };
  };
  const sub2r = () => {
    const ta = ri(3, 9), tb = ri(1, ta - 1), oa = ri(0, 7), ob = ri(oa + 1, 9), a = ta * 10 + oa, b = tb * 10 + ob;
    const [x, y] = [[52, 28], [63, 37], [71, 46]].find(p => p[0] - p[1] !== a - b);
    return {
      text: `${a} − ${b} = ?`, answer: a - b, wrong: wrongAdj(a - b),
      hints: ["Look at the ones. Can you take the bottom ones from the top ones? If not, you need to borrow a ten.", `Here ${oa} is smaller than ${ob}. Borrow 1 ten, which makes the ones ${oa + 10}. Then the tens column has one less ten.`,
        `Example: ${x} − ${y}. Ones: ${x % 10} is too small for ${y % 10}, so borrow: ${x % 10 + 10} − ${y % 10} = ${x % 10 + 10 - y % 10}. Tens: ${Math.floor(x / 10) - 1} − ${Math.floor(y / 10)} = ${Math.floor(x / 10) - 1 - Math.floor(y / 10)}. The answer is ${x - y}. Now do yours.`]
    };
  };
  const add3 = (lo, hi, lo2, hi2) => () => {
    const a = ri(lo, hi), b = ri(lo2, hi2);
    const [x, y] = [[245, 178], [367, 256], [418, 293]].find(p => p[0] + p[1] !== a + b);
    const ex = (lo > 999) ? [[2450, 1780], [3670, 2560], [4180, 2930]].find(p => p[0] + p[1] !== a + b) : [x, y];
    return {
      text: `${a} + ${b} = ?`, answer: a + b, wrong: wrongAdj(a + b),
      hints: ["Add one place at a time, starting with the ones. Carry when a place makes 10 or more.", "You can also add in jumps: start at the first number and add the hundreds, then the tens, then the ones.",
        `Example: ${ex[0]} + ${ex[1]}. ${addSteps(ex[0], ex[1])} So it is ${ex[0] + ex[1]}. Now do yours.`]
    };
  };
  const sub3 = (lo, hi, minGap) => () => {
    const a = ri(lo, hi), b = ri(minGap, a - minGap);
    const ex = (lo > 999) ? [[5320, 1870], [7050, 2480], [6240, 3590]].find(p => p[0] - p[1] !== a - b) : [[532, 187], [705, 248], [624, 359]].find(p => p[0] - p[1] !== a - b);
    return {
      text: `${a} − ${b} = ?`, answer: a - b, wrong: wrongAdj(a - b),
      hints: ["Take away one place at a time. You can borrow when a digit on top is too small.", "Another way: start at the big number and count back the hundreds, then the tens, then the ones.",
        `Example: ${ex[0]} − ${ex[1]}. ${subSteps(ex[0], ex[1])} So it is ${ex[0] - ex[1]}. Now do yours.`]
    };
  };
  const skipPat = () => {
    const step = pick([3, 4, 25, 100]), s = step * ri(1, 5), seq = [0, 1, 2, 3].map(i => s + i * step), ex = step === 3 ? [4, 8, 12, 16] : [6, 9, 12, 15];
    const exs = step === 3 ? [5, 8, 11, 14] : [2, 6, 10, 14];
    const exx = step === 3 ? [20, 23, 26, 29] : step === 4 ? [30, 34, 38, 42] : step === 25 ? [10, 35, 60, 85] : [150, 250, 350, 450];
    return {
      text: `${seq.join(", ")}, ?`, answer: s + 4 * step,
      hints: ["Does every number grow by the same amount? Find how much.", `Subtract the first number from the second. That is the jump. Then jump again from ${seq[3]}.`,
        `Example: ${exx.slice(0, 3).join(", ")}, ... jumps by ${exx[1] - exx[0]}, so after ${exx[2]} comes ${exx[2] + (exx[1] - exx[0])}. Now do yours.`]
    };
  };
  const clues = {
    3: "Think double plus one more group: § × 3 = (§ × 2) + §.",
    4: "Double it, then double again: § × 4 = (§ × 2) × 2.",
    6: "Use 5s and add one more group: § × 6 = (§ × 5) + §.",
    7: "Split 7 into 5 + 2: § × 7 = (§ × 5) + (§ × 2).",
    8: "Double three times: § × 8 = ((§ × 2) × 2) × 2.",
    9: "Do § × 10 and take away one group of §: § × 9 = (§ × 10) − §."
  };
  const times = k => () => {
    const n = ri(2, 10), x = rx(2, 10, n);
    return {
      text: `${n} × ${k} = ?`, answer: n * k, wrong: g => (g === n + k ? "That is adding. The × sign means equal groups, so we multiply." : null),
      hints: [`This means ${n} groups of ${k}. Count by ${k}s, ${n} times.`, clues[k].replace(/§/g, n),
        `Example: ${x} × ${k}. Count by ${k}s ${x} times: ${Array.from({ length: x }, (_, i) => k * (i + 1)).join(", ")}. The last one is ${x * k}. Now do yours.`]
    };
  };
  const timesTeach = k => [
    S(`Times ${k}`, `${k}, ${2 * k}, ${3 * k}, ${4 * k}, ${5 * k}`, `Multiplying by ${k} means counting by ${k}s. 3 × ${k} means 3 jumps of ${k}: <b>${k}, ${2 * k}, ${3 * k}</b>. So 3 × ${k} = ${3 * k}.`),
    S("A trick for " + k, "💡", clues[k].replace(/§/g, "the number")),
    S("Practice makes fast", "⚡", `Say the ${k} times table out loud: ${Array.from({ length: 10 }, (_, i) => k * (i + 1)).join(", ")}. Knowing these by heart makes lots of math easier.`)
  ];
  const arrays = () => {
    const r = ri(2, 6), c = ri(2, 8), it = pick(IT), ex = r === 3 && c === 4 ? [2, 5] : [3, 4];
    return {
      text: `Look at the array. How many ${it[0]} are there in all?`, visual: Array.from({ length: r }, () => it[1].repeat(c)).join("<br>"), answer: r * c,
      hints: ["An array has rows (across) and each row has the same number.", `There are ${r} rows. Add the number in one row again and again, once for each row, or multiply.`,
        `Example: ${ex[0]} rows with ${ex[1]} in each row is ${Array.from({ length: ex[0] }, () => ex[1]).join(" + ")} = ${ex[0] * ex[1]}. Now do yours.`]
    };
  };
  const timeUnits = () => {
    const ty = ri(0, 2);
    if (ty === 0) { const h = ri(2, 6), x = h === 3 ? 4 : 3; return { text: `How many minutes are in ${h} hours?`, answer: h * 60, hints: ["One hour has 60 minutes. You need that many for every hour.", `Count by 60s, ${h} times. Or use: 6 tens make 60, so think ${h} × 6 tens.`, `Example: ${x} hours is 60 + 60${x > 2 ? " + 60" : ""}${x > 3 ? " + 60" : ""} = ${x * 60} minutes. Now do yours.`] }; }
    if (ty === 1) { const d = ri(2, 6), x = d === 3 ? 4 : 3; return { text: `How many hours are in ${d} days?`, answer: d * 24, hints: ["One day has 24 hours. Use that for every day.", `Add 24 again and again, ${d} times. Or double 24 and keep going.`, `Example: ${x} days is ${Array.from({ length: x }, () => 24).join(" + ")} = ${x * 24} hours. Now do yours.`] }; }
    const w = ri(2, 9), x = w === 3 ? 4 : 3; return { text: `How many days are in ${w} weeks?`, answer: w * 7, hints: ["One week has 7 days. Use that for every week.", `Count by 7s, ${w} times.`, `Example: ${x} weeks is ${Array.from({ length: x }, () => 7).join(" + ")} = ${x * 7} days. Now do yours.`] };
  };
  const coins = () => {
    const types = shuf([["quarters", 25], ["dimes", 10], ["nickels", 5], ["pennies", 1]]).slice(0, 3).sort((a, b) => b[1] - a[1]);
    const cnt = types.map(t => (t[1] === 1 ? ri(1, 4) : ri(1, 3))), total = types.reduce((s, t, i) => s + t[1] * cnt[i], 0);
    const exs = [["1 quarter, 2 dimes and 1 nickel", "25, 45, 50", 50], ["2 quarters and 3 nickels", "25, 50, 55, 60, 65", 65], ["3 dimes, 1 nickel and 2 pennies", "10, 20, 30, 35, 36, 37", 37]];
    const ex = exs.find(e => e[2] !== total);
    return {
      text: `How many cents is ${types.map((t, i) => `${cnt[i]} ${nounFor(cnt[i], t[0]).replace(/^\d+ /, "")}`).join(", ").replace(/, ([^,]*)$/, " and $1")} worth?`, answer: total,
      hints: ["A quarter is 25 cents, a dime is 10, a nickel is 5 and a penny is 1.", "Start with the biggest coins and count on. Count by 25s, then by 10s, then by 5s, then by 1s.",
        `Example: ${ex[0]}. Count on: ${ex[1]}. That is ${ex[2]} cents. Now do yours.`]
    };
  };
  const fracName = () => {
    let n, s; do { n = pick([3, 4, 5, 6, 8]); s = ri(1, n - 1); } while (s === n - s);
    const ans = `${s}/${n}`, it = pick([["🟩", "⬜", "green"], ["🟦", "⬜", "blue"], ["🟨", "⬜", "yellow"]]);
    return {
      text: `The shape is cut into equal parts. What fraction is ${it[2]}?`, visual: it[0].repeat(s) + it[1].repeat(n - s), choices: shuf([ans, `${n - s}/${n}`, `${s}/${n - s}`, `${n}/${s}`]), answer: ans,
      hints: ["A fraction has two numbers. The bottom number tells how many equal parts in all.", "The top number tells how many parts we are talking about. Count the parts in all, then count the coloured ones.",
        "Example: 5 equal parts and 2 are coloured is 2/5. The coloured parts go on top and the total goes on the bottom. Now do yours."]
    };
  };
  const SH = [["triangle", 3, "🔺"], ["square", 4, "🟦"], ["rectangle", 4, "▭"], ["pentagon", 5, "⬟"], ["hexagon", 6, "⬡"], ["octagon", 8, "🛑"]];
  const shapes = () => {
    const sh = pick(SH);
    if (Math.random() < 0.5) return {
      text: `How many sides does a ${sh[0]} have?`, visual: sh[2], answer: sh[1],
      hints: ["The name of a shape often tells you its sides. Think of the picture.", "Count the straight lines that make up the edge of the shape. Mark each one so you do not count it twice.",
        "Example: a triangle has 3 sides and 3 corners. Now think about yours."]
    };
    const opts = SH.filter(s => s[1] === sh[1]);
    return {
      text: `Which shape has ${sh[1]} sides and ${sh[1]} corners?`,
      choices: shuf([sh[0], ...SH.filter(s => s[1] !== sh[1]).map(s => s[0]).slice(0, 3)]), answer: sh[0],
      hints: ["Sides are the straight edges. Corners are where two sides meet. A shape has the same number of each.", "Say the shape names and count the sides of each in your head. Which one matches?",
        "Example: a hexagon has 6 sides and 6 corners, a pentagon has 5. Now find yours."]
    };
  };
  const lengths = () => {
    const ty = ri(0, 2), n = ri(2, 9);
    const T = [["feet", "inches", 12, "In 1 foot there are 12 inches."], ["yards", "feet", 3, "In 1 yard there are 3 feet."], ["meters", "centimeters", 100, "In 1 meter there are 100 centimeters."]][ty];
    const x = n === 4 ? 5 : 4;
    return {
      text: `How many ${T[1]} are in ${n} ${T[0]}?`, answer: n * T[2],
      hints: [T[3], `You need ${n} groups of that. Multiply ${n} by the number in one.`, `Example: ${x} ${T[0]} is ${x} × ${T[2]} = ${x * T[2]} ${T[1]}. Now do yours.`]
    };
  };
  const word4 = () => {
    const n = pick(NM), it = pick(IT), ty = ri(0, 3);
    if (ty === 0) { const a = ri(20, 60), b = ri(10, 40), c = ri(5, 25); return { text: `${n} has ${a} ${it[0]} ${it[1]}, finds ${b} more, and then gives ${c} away. How many does ${n} have now?`, answer: a + b - c, hints: ["There are two steps. Which step makes the number bigger, and which makes it smaller?", "Step 1: add the ones that were found. Step 2: take away the ones given away.", "Example: 30 stars, find 20 more, give 10 away. 30 + 20 = 50, then 50 − 10 = 40. Now do yours."] }; }
    if (ty === 1) { const a = ri(30, 70), b = ri(5, 25), c = ri(5, 25); return { text: `A bus has ${a} kids. At the next stop ${b} kids get off and ${c} kids get on. How many kids are on the bus now?`, answer: a - b + c, hints: ["Getting off makes the number smaller. Getting on makes it bigger.", "Step 1: take away the kids who got off. Step 2: add the kids who got on.", "Example: 40 kids, 10 get off, 5 get on. 40 − 10 = 30, then 30 + 5 = 35. Now do yours."] }; }
    if (ty === 2) { const a = ri(15, 45), b = ri(15, 45), t = a + b + ri(10, 60); return { text: `${n} reads ${a} pages on Monday and ${b} pages on Tuesday. The book has ${t} pages. How many pages are left to read?`, answer: t - a - b, hints: ["First find how many pages have been read in all.", "Add Monday and Tuesday. Then take that away from the pages in the whole book.", "Example: A 100-page book, 20 read then 30 read. 20 + 30 = 50 read, 100 − 50 = 50 left. Now do yours."] }; }
    const b = ri(10, 50), a = b + ri(8, 40); return { text: `There are ${a} red ${it[0]} and ${b} blue ${it[0]}. How many more red than blue are there?`, visual: it[1], answer: a - b, hints: ["\"How many more\" asks for the difference between the two numbers.", "Take the smaller number away from the bigger number.", "Example: 50 red and 30 blue. 50 − 30 = 20 more red. Now do yours."] };
  };

  const l4 = [
    L("Hundreds, tens and ones", place3, [S("Three places", "🟥 = 100 &nbsp; 🟦 = 10 &nbsp; 🟨 = 1", "A 3-digit number has a <b>hundreds</b>, a <b>tens</b> and a <b>ones</b> place. A red block is 100, a blue block is 10 and a yellow block is 1."), S("Build a number", "🟥🟥🟥 🟦🟦🟦🟦 🟨🟨", "3 hundreds = 300, 4 tens = 40, 2 ones = 2. Put them together: 300 + 40 + 2 = <b>342</b>."), S("Zero means none", "🟥🟥 🟨🟨🟨", "2 hundreds, 0 tens and 3 ones makes <b>203</b>. The zero holds the tens place so the 2 stays 200.")]),
    L("What is the digit worth?", digitVal, [S("Place matters", "5 7 3", "In <b>573</b> the 5 is in the hundreds place, the 7 in the tens place and the 3 in the ones place."), S("Value of each digit", "500 + 70 + 3", "The 5 is worth <b>500</b>, the 7 is worth <b>70</b> and the 3 is worth <b>3</b>. Same digit, different place, different value!"), S("Expanded form", "573 = 500 + 70 + 3", "Writing a number as a sum of its place values is called <b>expanded form</b>.")]),
    L("Compare 3-digit numbers", compare3, [S("Start at the left", "472 vs 458", "To compare numbers, look at the biggest place first: the <b>hundreds</b>. The bigger hundreds digit wins."), S("Same hundreds?", "4<b>7</b>2 vs 4<b>5</b>8", "If the hundreds match, look at the <b>tens</b>. 7 tens is more than 5 tens, so 472 is bigger."), S("Still tied?", "🔍", "If the tens match too, compare the ones. Read the question to see if you want the bigger or smaller one!")]),
    L("Round to the nearest ten", round10, [S("Rounding", "40 ← 43 → 50", "Rounding finds the closest ten. 43 is between 40 and 50. It is closer to <b>40</b>."), S("The ones digit decides", "0 1 2 3 4 ⬇ &nbsp; 5 6 7 8 9 ⬆", "Look at the ones digit. <b>0 to 4:</b> round down. <b>5 to 9:</b> round up to the next ten."), S("Examples", "67 → 70", "67 has 7 ones, so it rounds up to <b>70</b>. 132 has 2 ones, so it rounds down to <b>130</b>.")]),
    L("Add with carrying (2-digit)", add2r, [S("Add the ones first", "38 + 27", "Start with the ones: 8 + 7 = 15. That is <b>1 ten and 5 ones</b>. Write 5 and carry the 1 ten."), S("Then the tens", "3 + 2 + 1 = 6", "Add the tens and the carried ten: 3 + 2 + 1 = <b>6 tens</b>."), S("Put it together", "38 + 27 = 65", "6 tens and 5 ones is <b>65</b>. Check: does it make sense? 38 is near 40 and 27 is near 30, so about 70. Yes!")]),
    L("Take away with borrowing (2-digit)", sub2r, [S("Can you take the ones?", "52 − 28", "Ones: 2 − 8 will not work. So we <b>borrow</b> one ten from the 5 tens."), S("Borrow a ten", "12 − 8 = 4", "Now the ones are 12, and 12 − 8 = <b>4</b>. The tens are now 4 (we lent one): 4 − 2 = <b>2</b>."), S("Check by adding", "24 + 28 = 52 ✅", "Put the answer 24 back with 28 and you get 52. It matches, so it is right!")]),
    L("Add 3-digit numbers", add3(120, 490, 110, 480), [S("Add one place at a time", "245 + 178", "Ones: 5 + 8 = 13 (write 3, carry 1 ten). Tens: 4 + 7 + 1 = 12 (write 2, carry 1 hundred). Hundreds: 2 + 1 + 1 = 4."), S("The answer", "245 + 178 = 423", "Write the digits: 4, 2, 3. The answer is <b>423</b>."), S("Jump method", "245 → 345 → 415 → 423", "Another way: add 100 (345), add 70 (415), add 8 (423). Pick the way you like best.")]),
    L("Subtract 3-digit numbers", sub3(300, 950, 110), [S("Take away step by step", "532 − 187", "Start at 532. Take away the hundreds: 532 − 100 = 432."), S("Then tens and ones", "432 − 80 = 352 &nbsp; 352 − 7 = 345", "Take away 80, then 7. You land on <b>345</b>."), S("Always check", "345 + 187 = 532 ✅", "Add your answer to the number you took away. If you get the start number back, you are right!")]),
    L("Skip counting patterns", skipPat, [S("Jumps of the same size", "20, 23, 26, 29", "A pattern can jump by 3s, 4s, 25s or 100s. Find how much it jumps each time."), S("Find the jump", "23 − 20 = 3", "Subtract two numbers that sit next to each other. That is the jump."), S("Keep going", "29 + 3 = 32", "Add the jump to the last number to find the next one.")]),
    L("Times 3", times(3), timesTeach(3)),
    L("Times 4", times(4), timesTeach(4)),
    L("Arrays", arrays, [S("Rows and columns", "🍎🍎🍎<br>🍎🍎🍎", "An <b>array</b> is objects in neat rows. Each row has the same number. This one has 2 rows of 3."), S("Add or multiply", "3 + 3 = 6 &nbsp; 2 × 3 = 6", "Add the row again and again, or multiply: rows × number in each row."), S("Turn it around", "3 × 2 = 2 × 3", "Turn the array and you get the same total. The order of multiplying does not matter!")]),
    L("Minutes, hours, days and weeks", timeUnits, [S("Time facts", "60 minutes = 1 hour", "1 hour = <b>60</b> minutes. 1 day = <b>24</b> hours. 1 week = <b>7</b> days."), S("Use multiplying", "2 hours = 2 × 60", "To change big units to small units, <b>multiply</b>. 2 hours is 2 × 60 = 120 minutes."), S("Tip", "🕐", "Remember which fact you need first, then count by that number.")]),
    L("Counting coins", coins, [S("Coin values", "25¢ &nbsp; 10¢ &nbsp; 5¢ &nbsp; 1¢", "A quarter is <b>25¢</b>, a dime is <b>10¢</b>, a nickel is <b>5¢</b> and a penny is <b>1¢</b>."), S("Count the biggest first", "25, 35, 45, 50", "Start with the biggest coins and count on. 1 quarter and 2 dimes and 1 nickel: 25, 35, 45, 50."), S("Skip count", "🪙", "Count quarters by 25s, dimes by 10s and nickels by 5s. Then count pennies by 1s.")]),
    L("Naming fractions", fracName, [S("Equal parts", "🟩⬜⬜⬜", "A fraction names equal parts of a whole. This shape has <b>4</b> equal parts and <b>1</b> is green."), S("Top and bottom", "1/4", "The <b>bottom</b> number tells how many equal parts in all. The <b>top</b> number tells how many we are talking about. So 1 of 4 is <b>1/4</b>."), S("Another one", "🟩🟩🟩⬜⬜ = 3/5", "5 equal parts, 3 are green. That is <b>3/5</b>.")]),
    L("Shapes: sides and corners", shapes, [S("Sides and corners", "🔺", "A <b>side</b> is a straight edge. A <b>corner</b> is where two sides meet. A triangle has 3 sides and 3 corners."), S("Shape names", "4 sides = square or rectangle", "Pentagon = 5 sides, hexagon = 6 sides, octagon = 8 sides. A stop sign 🛑 is an octagon."), S("Square vs rectangle", "▭ 🟦", "A square has 4 equal sides. A rectangle has 4 sides too, but only opposite sides are equal.")]),
    L("Feet, yards, meters", lengths, [S("Units of length", "12 in = 1 ft", "1 foot = <b>12</b> inches. 1 yard = <b>3</b> feet. 1 meter = <b>100</b> centimeters."), S("Big to small means multiply", "3 ft = 3 × 12 in", "When you change a big unit into a small unit, you need more of them. So <b>multiply</b>."), S("Example", "2 yards = 6 feet", "2 yards × 3 feet = 6 feet.")]),
    L("Story problems with two steps", word4, [S("Read slowly", "📖", "Some story problems need <b>two steps</b>. Find the numbers and see what happens first."), S("Add for more, subtract for less", "30 + 20 − 10", "Getting more? Add. Giving away or leaving? Subtract. Do the steps in the order of the story."), S("Check it", "✅", "Does your answer make sense in the story? Say it in a full sentence.")])
  ];
  l4.push(mixOf("Mixed practice", [l4[4], l4[5], l4[6], l4[9], l4[14]]));
  l4.push(mixOf("Level 4 Challenge", [l4[0], l4[3], l4[7], l4[10], l4[12], l4[15], l4[17]]));

  // ================= LEVEL 5 =================
  const round100 = () => {
    let n; do { n = ri(101, 990); } while (n % 100 === 50);
    const ans = n % 100 < 50 ? n - (n % 100) : n - (n % 100) + 100, x = n > 500 ? 234 : 678;
    return {
      text: `Round ${n} to the nearest hundred.`, answer: ans,
      hints: ["Rounding finds the closest hundred. Look at the tens digit.", "If the tens digit is 0 to 4, stay at the lower hundred. If it is 5 to 9, go up to the next hundred.",
        `Example: ${x} has ${Math.floor(x % 100 / 10)} tens. ${x % 100 < 50 ? "That is less than 5, so round down to " + (x - x % 100) : "That is 5 or more, so round up to " + (x - x % 100 + 100)}. Now round yours.`]
    };
  };
  const missingFactor = () => {
    const k = ri(2, 9), n = rx(2, 10), x = rx(2, 9, n), kk = rx(2, 9, k);
    return {
      text: `? × ${k} = ${n * k}`, answer: n, wrong: g => (g === n * k ? "That is the total. We need the missing number that is multiplied." : null),
      hints: ["One number is hiding. The total is the answer to the multiplying.", `Count by ${k}s until you reach ${n * k}. How many jumps?`, `Example: ? × ${kk} = ${x * kk}. Count by ${kk}s: ${Array.from({ length: x }, (_, i) => kk * (i + 1)).join(", ")}. That took ${x} jumps, so ? = ${x}. Now do yours.`]
    };
  };
  const divide = (lo, hi) => () => {
    const k = ri(lo, hi), q = ri(2, 10), t = q * k, it = pick(IT), n = pick(NM), x = rx(2, 9, q), kk = rx(lo, hi, k);
    const exT = x * kk;
    const hints = [`Division means sharing equally or making equal groups. Think: what times ${k} makes ${t}?`, `Count by ${k}s until you reach ${t}. How many counts did you make? You can also use a times fact backwards.`, `Example: ${exT} ÷ ${kk}. Count by ${kk}s: ${Array.from({ length: x }, (_, i) => kk * (i + 1)).join(", ")}. That is ${x} jumps, so ${exT} ÷ ${kk} = ${x}. Now do yours.`];
    if (Math.random() < 0.5) return { text: `${t} ÷ ${k} = ?`, answer: q, hints };
    return { text: `${n} shares ${t} ${it[0]} ${it[1]} equally among ${k} friends. How many does each friend get?`, answer: q, hints };
  };
  const mult10s = () => {
    const a = ri(2, 9), m = ri(2, 9), x = rx(2, 9, a), y = rx(2, 9, m);
    return {
      text: `${a} × ${m * 10} = ?`, answer: a * m * 10,
      hints: [`${m * 10} is ${m} tens. So you are finding ${a} groups of ${m} tens.`, `Multiply ${a} × ${m} first. Then that many tens means you put a zero on the end.`, `Example: ${x} × ${y * 10}. ${x} × ${y} = ${x * y}, so ${x * y} tens = ${x * y * 10}. Now do yours.`]
    };
  };
  const mult2by1 = () => {
    const a = ri(12, 39), b = ri(2, 5), x = a === 24 ? 32 : 24, xb = b === 3 ? 4 : 3;
    return {
      text: `${a} × ${b} = ?`, answer: a * b, wrong: wrongAdj(a * b),
      hints: ["Break the 2-digit number into tens and ones. Multiply each part.", `Tens part: ${Math.floor(a / 10) * 10} × ${b}. Ones part: ${a % 10} × ${b}. Then add the two answers.`,
        `Example: ${x} × ${xb}. ${Math.floor(x / 10) * 10} × ${xb} = ${Math.floor(x / 10) * 10 * xb}, ${x % 10} × ${xb} = ${x % 10 * xb}. ${Math.floor(x / 10) * 10 * xb} + ${x % 10 * xb} = ${x * xb}. Now do yours.`]
    };
  };
  const cmpFrac = () => {
    const d = ri(3, 12), a = ri(1, d - 1); let b = ri(1, d - 1); if (b === a) b = a === d - 1 ? a - 1 : a + 1;
    const big = Math.random() < 0.5, ans = big ? Math.max(a, b) : Math.min(a, b);
    return {
      text: `Which fraction is ${big ? "bigger" : "smaller"}?`, choices: [`${a}/${d}`, `${b}/${d}`], answer: `${ans}/${d}`,
      hints: ["Look at the bottom numbers. They are the same, so the pieces are the same size.", "When the pieces are the same size, more pieces means a bigger fraction. Compare the top numbers.",
        "Example: 2/5 and 4/5. The pieces are fifths for both. 4 pieces is more than 2 pieces, so 4/5 is bigger. Now try yours."]
    };
  };
  const fracSet = () => {
    const k = pick([2, 3, 4, 5]), m = ri(2, 8), t = k * m, it = pick(IT), x = rx(2, 6, m);
    return {
      text: `What is 1/${k} of ${t}?`, visual: it[1].repeat(t), answer: m,
      hints: [`1/${k} means one of ${k} equal parts. Share ${t} into ${k} equal groups.`, `Divide ${t} by ${k}. What times ${k} makes ${t}?`, `Example: 1/${k} of ${x * k} is ${x * k} ÷ ${k} = ${x}. Now do yours.`]
    };
  };
  const perim = () => {
    const ty = ri(0, 2);
    if (ty === 0) { const l = ri(4, 12), w = rx(2, 9, l); return { text: `A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter in cm?`, answer: 2 * (l + w), hints: ["Perimeter is the distance all the way around a shape.", "A rectangle has 2 long sides and 2 short sides. Add all four.", "Example: 8 cm long and 3 cm wide: 8 + 3 + 8 + 3 = 22. Now do yours."] }; }
    if (ty === 1) { const s = ri(3, 15); return { text: `A square has sides of ${s} cm. What is its perimeter in cm?`, visual: "🟦", answer: 4 * s, hints: ["Perimeter is the distance all the way around.", "A square has 4 sides that are all the same length. Add them, or multiply.", "Example: a square with sides of 6 cm has 6 + 6 + 6 + 6 = 24 cm around. Now do yours."] }; }
    const a = ri(3, 12), b = ri(3, 12), c = ri(3, 12); return { text: `A triangle has sides of ${a} cm, ${b} cm and ${c} cm. What is its perimeter in cm?`, visual: "🔺", answer: a + b + c, hints: ["Perimeter is the distance all the way around.", "A triangle has 3 sides. Add all three lengths.", "Example: sides 5, 6 and 9: 5 + 6 + 9 = 20. Now do yours."] };
  };
  const area = () => {
    const l = ri(2, 9), w = ri(2, 9), small = l <= 6 && w <= 6;
    return {
      text: `A rectangle is ${l} units long and ${w} units wide. What is its area in square units?`, visual: small ? Array.from({ length: w }, () => "🟩".repeat(l)).join("<br>") : undefined, answer: l * w,
      hints: ["Area is how many square units fit inside a shape.", `Make rows. There are ${w} rows. Each row has the same number of squares.`, "Example: 4 long and 3 wide has 3 rows of 4 squares. 4 × 3 = 12 square units. Now do yours."]
    };
  };
  const elapsed = () => {
    const sh = ri(1, 10), sm = ri(0, 11) * 5, d = ri(3, 17) * 5, tot = sm + d, eh = sh + Math.floor(tot / 60), em = tot % 60, f = (h, m) => `${((h - 1) % 12) + 1}:${String(m).padStart(2, "0")}`;
    const ex = d === 35 ? ["2:10", "2:25", 15] : ["4:10", "4:45", 35];
    return {
      text: `A show starts at ${f(sh, sm)} and ends at ${f(eh, em)}. How many minutes long is it?`, answer: d,
      hints: ["Elapsed time is how much time passes between the start and the end.", "Count up in jumps: first to the next o'clock, then add the rest of the minutes. Add your jumps together.",
        `Example: ${ex[0]} to ${ex[1]}. The hour is the same, so find the minutes between ${ex[0].split(":")[1]} and ${ex[1].split(":")[1]}: that is ${ex[2]} minutes. Now do yours.`]
    };
  };
  const change = () => {
    const pay = Math.random() < 0.7 ? 100 : 200, p = pay === 100 ? ri(11, 94) : ri(105, 195), n = pick(NM), x = pay === 100 ? 65 : 160;
    return {
      text: `${n} buys a toy for ${p}¢ and pays with $${pay / 100} (${pay}¢). How many cents change should ${n} get?`, answer: pay - p,
      hints: ["Change is what you get back. It is the difference between what you pay and the price.", `Count up from ${p}¢ to ${pay}¢ with friendly jumps: first to the next ten, then to the next hundred.`,
        `Example: a ${x}¢ toy and you pay ${pay}¢. ${x} up to ${x + 10 - x % 10} is ${10 - x % 10}. Then up to ${pay} is ${pay - (x + 10 - x % 10)}. ${10 - x % 10} + ${pay - (x + 10 - x % 10)} = ${pay - x}. Now do yours.`]
    };
  };
  const groupsWord = () => {
    const n = pick(NM), it = pick(IT), g = ri(3, 9), k = ri(3, 9), ty = ri(0, 1);
    if (ty === 0) return { text: `${n} has ${g} bags. Each bag has ${k} ${it[0]} ${it[1]}. How many ${it[0]} in all?`, answer: g * k, hints: ["Equal groups: every bag has the same amount.", "Multiply the number of bags by the number in each bag.", "Example: 4 bags with 6 in each: 4 × 6 = 24. Now do yours."] };
    return { text: `${n} packs ${g * k} ${it[0]} ${it[1]} into bags of ${k}. How many bags does ${n} need?`, answer: g, hints: ["Making equal groups from a total is division.", `How many groups of ${k} fit into ${g * k}? Think of the times table for ${k}.`, "Example: 24 in bags of 6. Count by 6s: 6, 12, 18, 24. That is 4 bags. Now do yours."] };
  };

  const l5 = [
    L("Round to the nearest hundred", round100, [S("Rounding to hundreds", "300 ← 342 → 400", "342 sits between 300 and 400. We find the closest hundred."), S("The tens digit decides", "0-4 ⬇ &nbsp; 5-9 ⬆", "Look at the <b>tens digit</b>. 0 to 4: round down. 5 to 9: round up. 342 has 4 tens, so it rounds down to <b>300</b>."), S("Another one", "768 → 800", "768 has 6 tens. That is 5 or more, so round up to <b>800</b>.")]),
    L("Add 4-digit numbers", add3(1200, 6800, 1100, 3000), [S("Place by place", "3,450 + 2,380", "Add the ones, tens, hundreds, then thousands. Carry whenever a place makes 10 or more."), S("Jump method", "3450 → 5450 → 5750 → 5830", "Add 2000, then 300, then 80. 3450 + 2000 = 5450, + 300 = 5750, + 80 = <b>5830</b>."), S("Estimate to check", "3000 + 2000 ≈ 5000", "Round both numbers first to see if your answer is close.")]),
    L("Subtract 4-digit numbers", sub3(2500, 9500, 1100), [S("Step by step", "6,240 − 2,380", "Start at 6240. Take away the thousands: 6240 − 2000 = 4240."), S("Then hundreds and tens", "4240 − 300 = 3940 &nbsp; 3940 − 80 = 3860", "Take away 300, then 80. The answer is <b>3860</b>."), S("Check by adding", "3860 + 2380 = 6240 ✅", "Add the answer to the number you took away to be sure.")]),
    L("Times 6", times(6), timesTeach(6)), L("Times 7", times(7), timesTeach(7)), L("Times 8", times(8), timesTeach(8)), L("Times 9", times(9), [S("Times 9", "9, 18, 27, 36, 45", "The 9 times table has a neat pattern: the digits of every answer add up to 9. Look: 1+8=9, 2+7=9, 3+6=9."), S("Take away trick", "7 × 9 = 70 − 7", "Do ×10 then take away one group: 7 × 10 = 70, minus 7 is <b>63</b>."), S("Finger trick", "🖐️🖐️", "Hold up 10 fingers. For 3 × 9, fold down finger 3. Two fingers are on the left (20) and seven on the right (7): <b>27</b>.")]),
    L("Find the missing factor", missingFactor, [S("A hidden number", "? × 6 = 42", "A factor is a number you multiply. One factor is hiding. You know the other one and the total."), S("Count by the known factor", "6, 12, 18, 24, 30, 36, 42", "Count by 6s until you reach 42. That took 7 jumps, so the missing number is <b>7</b>."), S("Check", "7 × 6 = 42 ✅", "Multiply your answer to see if you get the total.")]),
    L("Division: sharing (÷ 2 to 5)", divide(2, 5), [S("Sharing equally", "12 ÷ 3", "Division means sharing a total into <b>equal groups</b>. 12 shared among 3 friends: each gets 4."), S("Use a times fact", "3 × 4 = 12", "Division is the opposite of multiplying. 3 × 4 = 12, so 12 ÷ 3 = <b>4</b>."), S("Fact family", "12 ÷ 3 = 4 &nbsp; 12 ÷ 4 = 3", "The same three numbers make four facts: 3 × 4, 4 × 3, 12 ÷ 3 and 12 ÷ 4.")]),
    L("Division (÷ 6 to 9)", divide(6, 9), [S("Same idea, bigger numbers", "42 ÷ 6", "Ask: <b>what times 6 makes 42?</b>"), S("Count up", "6, 12, 18, 24, 30, 36, 42", "Count by 6s until you reach 42. That is 7 counts, so 42 ÷ 6 = <b>7</b>."), S("Check", "7 × 6 = 42 ✅", "Multiply the answer by the number you divided by. You should get the total.")]),
    L("Multiply by tens", mult10s, [S("Tens are groups", "4 × 30", "30 is 3 tens. So 4 × 30 means 4 groups of 3 tens."), S("Multiply then add a zero", "4 × 3 = 12 tens", "4 × 3 = 12, so 12 tens. 12 tens is <b>120</b>."), S("Pattern", "2 × 40 = 80", "Cover the zero, multiply the small numbers, then put the zero back.")]),
    L("Multiply 2-digit by 1-digit", mult2by1, [S("Break it apart", "24 × 3 = (20 × 3) + (4 × 3)", "Break the 2-digit number into tens and ones. Multiply each part by the single digit."), S("Multiply the parts", "60 and 12", "20 × 3 = 60 and 4 × 3 = 12."), S("Add them", "60 + 12 = 72", "So 24 × 3 = <b>72</b>. This is called the <b>distributive</b> trick!")]),
    L("Compare fractions (same bottom)", cmpFrac, [S("Same size pieces", "3/8 and 5/8", "When two fractions have the same bottom number, the pieces are the same size."), S("Compare the tops", "🟩🟩🟩⬜⬜ vs 🟩🟩🟩🟩🟩", "5 eighths is more than 3 eighths. So 5/8 is bigger."), S("Remember", "💡", "Same bottom: bigger top means a bigger fraction.")]),
    L("A fraction of a group", fracSet, [S("Fractions of a group", "🍎🍎🍎🍎🍎🍎", "1/3 of 6 apples means share 6 apples into <b>3 equal groups</b>. Each group is one third."), S("Use division", "6 ÷ 3 = 2", "1/3 of 6 is 6 ÷ 3 = <b>2</b>."), S("Half and quarter", "1/2 and 1/4", "1/2 of a number is divided by 2. 1/4 is divided by 4.")]),
    L("Perimeter", perim, [S("Around the edge", "🟦", "<b>Perimeter</b> is the distance all the way around a shape. Add up all the sides."), S("Rectangle", "7 + 3 + 7 + 3 = 20", "A rectangle has two long sides and two short sides. Add all four."), S("Square", "4 × 5 = 20", "A square has 4 equal sides. Multiply one side by 4.")]),
    L("Area of rectangles", area, [S("Area", "🟩🟩🟩<br>🟩🟩🟩", "<b>Area</b> is the number of square units inside a shape. This has 2 rows of 3 squares."), S("Rows times columns", "2 × 3 = 6", "Multiply the length by the width. The area is <b>6 square units</b>."), S("Not perimeter", "⚠️", "Area counts the squares inside. Perimeter measures the edge. Read the question to know which one!")]),
    L("How long did it take?", elapsed, [S("Elapsed time", "🕑 → 🕒", "<b>Elapsed time</b> is how much time passes from the start to the end."), S("Jump to the o'clock", "2:40 → 3:00 → 3:15", "From 2:40 to 3:00 is 20 minutes. From 3:00 to 3:15 is 15 minutes. 20 + 15 = <b>35 minutes</b>."), S("Same hour", "4:10 → 4:45", "If the hour does not change, just find the difference between the minutes.")]),
    L("Making change", change, [S("What is change?", "💵 − 🏷️", "When you pay with more money than the price, the shop gives you <b>change</b>."), S("Count up", "65¢ → 70¢ → 100¢", "Count up from the price to the money you gave. 65 to 70 is 5, then 70 to 100 is 30. 5 + 30 = <b>35¢</b>."), S("Or subtract", "100 − 65 = 35", "You can also subtract the price from what you paid.")]),
    L("Equal groups story problems", groupsWord, [S("Equal groups", "👜👜👜", "Story problems about equal groups use <b>multiplying</b> (find the total) or <b>dividing</b> (share or group the total)."), S("Total missing: multiply", "4 bags × 6 = 24", "If you know the groups and how many in each, multiply."), S("Groups missing: divide", "24 ÷ 6 = 4", "If you know the total and the group size, divide.")])
  ];
  l5.pop();
  l5.push(mixOf("Mixed practice", [l5[1], l5[3], l5[6], l5[8], l5[10], l5[12]]));
  l5.push(mixOf("Level 5 Challenge", [l5[0], l5[2], l5[5], l5[7], l5[9], l5[11], l5[13], l5[14], l5[17]]));

  // ================= LEVEL 6 =================
  const mult2big = () => {
    const a = ri(23, 79), b = ri(3, 9), x = a === 46 ? 38 : 46, xb = b === 6 ? 7 : 6;
    return {
      text: `${a} × ${b} = ?`, answer: a * b, wrong: wrongAdj(a * b),
      hints: ["Break the 2-digit number into tens and ones. Multiply each part, then add.", `Tens: ${Math.floor(a / 10) * 10} × ${b}. Ones: ${a % 10} × ${b}. Add those two results.`,
        `Example: ${x} × ${xb}. ${Math.floor(x / 10) * 10} × ${xb} = ${Math.floor(x / 10) * 10 * xb} and ${x % 10} × ${xb} = ${x % 10 * xb}. ${Math.floor(x / 10) * 10 * xb} + ${x % 10 * xb} = ${x * xb}. Now do yours.`]
    };
  };
  const mult100 = () => {
    const n = ri(2, 99), t = pick([10, 100]), x = n === 35 ? 46 : 35;
    return {
      text: `${n} × ${t} = ?`, answer: n * t,
      hints: [`Multiplying by ${t} moves every digit ${t === 10 ? "one place" : "two places"} to the left.`, `Put ${t === 10 ? "one zero" : "two zeros"} on the end of ${n}.`, `Example: ${x} × ${t} = ${x * t}. ${t === 10 ? "One zero" : "Two zeros"} were added. Now do yours.`]
    };
  };
  const remainder = () => {
    const k = ri(3, 9), q = ri(3, 11), r = ri(1, k - 1), t = q * k + r, askR = Math.random() < 0.5, xk = k === 5 ? 4 : 5;
    return {
      text: askR ? `${t} ÷ ${k}: what is the remainder (the number left over)?` : `${t} ÷ ${k}: how many full groups of ${k} can you make?`, answer: askR ? r : q,
      hints: ["Division with a remainder means the groups do not come out exactly even. Some are left over.", `Count by ${k}s and stop before you go over ${t}. The last count you can reach is your full groups. The rest is the remainder.`,
        `Example: 23 ÷ ${xk}. Count by ${xk}s: ${xk}, ${2 * xk}, ${3 * xk}, ${4 * xk}. The biggest not over 23 is ${Math.floor(23 / xk) * xk} (${Math.floor(23 / xk)} groups). 23 − ${Math.floor(23 / xk) * xk} = ${23 % xk} left over. Now do yours.`]
    };
  };
  const div2 = () => {
    const k = ri(2, 6), q = ri(11, 25), t = q * k, xk = k === 4 ? 3 : 4, xq = 12;
    return {
      text: `${t} ÷ ${k} = ?`, answer: q,
      hints: ["Break the big number into friendly parts that you can divide easily.", `Split ${t} into tens and ones, divide each part by ${k} where you can, and add the answers.`,
        `Example: ${xk * xq} ÷ ${xk}. ${xk * 10} ÷ ${xk} = 10 and ${xk * 2} ÷ ${xk} = 2. 10 + 2 = ${xq}. Now do yours.`]
    };
  };
  const order = () => {
    const ty = ri(0, 3), a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
    if (ty === 0) return { text: `${a} + ${b} × ${c} = ?`, answer: a + b * c, hints: ["Order of operations: multiply and divide before you add and subtract.", `Do ${b} × ${c} first. Then add ${a}.`, "Example: 4 + 3 × 5. First 3 × 5 = 15. Then 4 + 15 = 19. Now do yours."] };
    if (ty === 1) return { text: `(${a} + ${b}) × ${c} = ?`, answer: (a + b) * c, hints: ["Brackets come first. Do what is inside them before anything else.", `Add ${a} + ${b} first. Then multiply by ${c}.`, "Example: (2 + 4) × 5. Inside first: 2 + 4 = 6. Then 6 × 5 = 30. Now do yours."] };
    if (ty === 2) { const p = a * b + ri(1, 9); return { text: `${a} × ${b} + ${p - a * b} = ?`, answer: p, hints: ["Multiply first, then add.", `Do ${a} × ${b} first. Then add the last number.`, "Example: 3 × 6 + 2. First 3 × 6 = 18. Then 18 + 2 = 20. Now do yours."] }; }
    const t = a * b + ri(1, 9); return { text: `${t} − ${a} × ${b} = ?`, answer: t - a * b, hints: ["Multiply before you subtract.", `Do ${a} × ${b} first. Then take it away from ${t}.`, "Example: 30 − 4 × 5. First 4 × 5 = 20. Then 30 − 20 = 10. Now do yours."] };
  };
  const equivFrac = () => {
    const f = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5]]), k = ri(2, 5);
    return {
      text: `${f[0]}/${f[1]} = ?/${f[1] * k}`, answer: f[0] * k,
      hints: ["Equivalent fractions name the same amount. Whatever you do to the bottom, do to the top.", `The bottom number went from ${f[1]} to ${f[1] * k}. What did you multiply by?`,
        "Example: 1/3 = ?/12. The bottom was multiplied by 4 (3 × 4 = 12), so the top is multiplied by 4 too: 1 × 4 = 4. Now do yours."]
    };
  };
  const cmpFrac2 = () => {
    const ty = ri(0, 1);
    if (ty === 0) { const a = ri(2, 6), b = rx(7, 12, a); const big = Math.random() < 0.5; return { text: `Which fraction is ${big ? "bigger" : "smaller"}?`, choices: [`1/${a}`, `1/${b}`], answer: big ? `1/${a}` : `1/${b}`, hints: ["Both fractions have 1 on top. Think about how big the pieces are.", "The more pieces a whole is cut into, the smaller each piece is. Compare the bottom numbers.", "Example: 1/3 and 1/8. Cutting into 8 gives tiny pieces, so 1/3 is bigger. Now try yours."] }; }
    const t = ri(2, 5), a = ri(t + 1, 8), b = rx(t + 1, 10, a); const big = Math.random() < 0.5; return { text: `Which fraction is ${big ? "bigger" : "smaller"}?`, choices: [`${t}/${a}`, `${t}/${b}`], answer: big ? `${t}/${Math.min(a, b)}` : `${t}/${Math.max(a, b)}`, hints: ["Both fractions have the same top number. Look at the size of the pieces.", "Smaller bottom number means bigger pieces. Compare the bottom numbers.", "Example: 3/4 and 3/8. Fourths are bigger pieces than eighths, so 3/4 is bigger. Now try yours."] };
  };
  const addFrac = () => {
    const d = ri(5, 12), a = ri(1, d - 2), b = ri(1, d - 1 - a), s = a + b;
    return {
      text: `${a}/${d} + ${b}/${d} = ?`, choices: shuf([`${s}/${d}`, `${s}/${2 * d}`, `${s + 1}/${d}`, `${s - 1}/${d}`]), answer: `${s}/${d}`,
      hints: ["The bottom numbers match, so the pieces are the same size. You just count pieces.", "Add the top numbers. Keep the bottom number the same.", "Example: 2/9 + 4/9. Add the tops: 2 + 4 = 6. The bottom stays 9. So 6/9. Now do yours."]
    };
  };
  const fracSet2 = () => {
    const k = pick([3, 4, 5, 6]), n = ri(2, k - 1), m = ri(2, 8), t = k * m, it = pick(IT), xm = rx(2, 8, m);
    return {
      text: `What is ${n}/${k} of ${t}?`, visual: it[1].repeat(t), answer: n * m,
      hints: [`First find 1/${k} of ${t}: share it into ${k} equal groups.`, `Divide ${t} by ${k} to get one part. Then multiply by ${n} to get ${n} parts.`,
        `Example: 2/3 of ${3 * xm}. One third is ${3 * xm} ÷ 3 = ${xm}. Two thirds is ${xm} × 2 = ${2 * xm}. Now do yours.`]
    };
  };
  const areaBig = () => {
    if (Math.random() < 0.5) { const l = ri(6, 15), w = ri(3, 9); return { text: `A garden is ${l} m long and ${w} m wide. What is its area in square meters?`, visual: "🌱", answer: l * w, hints: ["Area is length times width.", "Multiply the length by the width. Split the larger number into tens and ones if it helps.", "Example: 12 m by 4 m. 12 × 4 = 48 square meters. Now do yours."] }; }
    const w = ri(3, 9), l = ri(6, 14); return { text: `A rectangle has an area of ${l * w} square units and is ${w} units wide. How long is it?`, answer: l, hints: ["Area = length × width. One number is missing, so use division.", `Divide the area by the width, ${w}.`, "Example: area 36 and width 4. 36 ÷ 4 = 9 long. Now do yours."] };
  };
  const missSide = () => {
    const ty = ri(0, 1);
    if (ty === 0) { const l = ri(5, 14), w = rx(2, 9, l); return { text: `A rectangle has a perimeter of ${2 * (l + w)} cm and a length of ${l} cm. How wide is it in cm?`, answer: w, hints: ["The perimeter is length + width + length + width.", "Take away the two lengths from the perimeter. What is left is the two widths. Share it into 2.", "Example: perimeter 20, length 7. 20 − 7 − 7 = 6 for two widths, so each width is 3. Now do yours."] }; }
    const s = ri(3, 15); return { text: `A square has a perimeter of ${4 * s} cm. How long is one side in cm?`, visual: "🟦", answer: s, hints: ["A square has 4 equal sides.", "Divide the perimeter by 4.", "Example: perimeter 24. 24 ÷ 4 = 6 cm per side. Now do yours."] };
  };
  const roundAny = () => {
    const p = pick([10, 100, 1000]); let n; do { n = ri(1001, 9999); } while (n % (p) === p / 2 && p > 1);
    const ans = Math.round(n / p) * p, nm = { 10: "ten", 100: "hundred", 1000: "thousand" }[p];
    return {
      text: `Round ${n} to the nearest ${nm}.`, answer: ans,
      hints: [`Find the ${nm}s digit. Then look at the digit just to its right.`, "If that next digit is 0 to 4 round down (keep the digit, zeros after). If it is 5 to 9 round up (add 1 to the digit).",
        `Example: 3,642 to the nearest ${nm} is ${Math.round(3642 / p) * p}. The digit to the right decides. Now do yours.`]
    };
  };
  const patt = () => {
    const step = ri(3, 15), up = Math.random() < 0.7, s = up ? ri(1, 20) : ri(60, 99), seq = [0, 1, 2, 3].map(i => s + (up ? 1 : -1) * i * step), nxt = s + (up ? 1 : -1) * 4 * step;
    if (Math.random() < 0.5) return { text: `${seq.join(", ")}, ?`, answer: nxt, hints: ["Look at how the numbers change from one to the next. Is it going up or down?", "Find the difference between two neighbours. That is the rule. Apply it to the last number.", "Example: 40, 34, 28, 22, ... goes down by 6, so next is 16. Now do yours."] };
    const rule = `${up ? "Add" : "Subtract"} ${step}`, others = shuf([`${up ? "Subtract" : "Add"} ${step}`, `${up ? "Add" : "Subtract"} ${step + 1}`, `Multiply by ${step}`]);
    return { text: `${seq.join(", ")}, ...<br>What is the rule?`, choices: shuf([rule, ...others]), answer: rule, hints: ["Is the pattern getting bigger or smaller?", "Find how much it changes between two numbers that sit next to each other.", "Example: 5, 12, 19, 26 grows by 7 each time, so the rule is Add 7. Now do yours."] };
  };
  const word6 = () => {
    const n = pick(NM), it = pick(IT), ty = ri(0, 3);
    if (ty === 0) { const a = ri(3, 8), b = ri(4, 9), c = ri(2, a * b - 1); return { text: `${n} buys ${a} packs of ${it[0]} ${it[1]}. Each pack has ${b}. ${n} gives ${c} away. How many are left?`, answer: a * b - c, hints: ["There are two steps. First find the total.", "Multiply the packs by the number in each pack. Then take away the ones given away.", "Example: 3 packs of 5, give 4 away. 3 × 5 = 15, 15 − 4 = 11. Now do yours."] }; }
    if (ty === 1) { const a = ri(3, 8), b = ri(4, 9), c = ri(2, 9); return { text: `A box holds ${b} ${it[0]}. ${n} has ${a} full boxes and ${c} more loose ${it[0]}. How many ${it[0]} in all?`, answer: a * b + c, hints: ["Find the amount in the full boxes first.", "Multiply the boxes by how many each holds. Then add the loose ones.", "Example: 4 boxes of 6 and 3 loose. 4 × 6 = 24, 24 + 3 = 27. Now do yours."] }; }
    if (ty === 2) { const k = ri(3, 6), m = ri(4, 9), e = ri(1, m - 1); return { text: `${k * m} ${it[0]} ${it[1]} are shared equally among ${k} friends. Then each friend gives away ${e}. How many does each friend have now?`, answer: m - e, hints: ["First find how many each friend gets.", "Divide the total by the number of friends. Then take away what each friend gives away.", "Example: 20 shared among 4 friends, each gives 2 away. 20 ÷ 4 = 5, 5 − 2 = 3. Now do yours."] }; }
    const p = ri(8, 25), d = ri(3, 6), t = p * d + ri(10, 40); return { text: `${n} reads ${p} pages a day for ${d} days. The book has ${t} pages. How many pages are left?`, answer: t - p * d, hints: ["First find how many pages ${n} has read in all.".replace("${n}", n), "Multiply pages per day by the number of days. Then subtract from the whole book.", "Example: 10 pages a day for 3 days in a 50-page book. 10 × 3 = 30, 50 − 30 = 20 left. Now do yours."] };
  };
  const multWord = () => {
    const n = pick(NM), it = pick(IT), a = ri(3, 9), b = ri(6, 12), ty = ri(0, 2);
    if (ty === 0) return { text: `${n} has ${a} boxes. Each box has ${b} ${it[0]} ${it[1]}. How many ${it[0]} in all?`, answer: a * b, hints: ["Equal groups: boxes with the same amount.", "Multiply the number of boxes by the number in each box.", "Example: 5 boxes of 8: 5 × 8 = 40. Now do yours."] };
    if (ty === 1) return { text: `Tickets cost $${b} each. ${n} buys ${a} tickets. How many dollars is that?`, answer: a * b, hints: ["Each ticket costs the same. Find the cost of all the tickets.", "Multiply the price by the number of tickets.", "Example: 4 tickets at $7 is 4 × 7 = $28. Now do yours."] };
    return { text: `A week has 7 days. How many days are in ${a + 2} weeks?`, answer: (a + 2) * 7, hints: ["Each week has the same number of days.", "Multiply the weeks by 7.", "Example: 3 weeks is 3 × 7 = 21 days. Now do yours."] };
  };
  const divWord = () => {
    const n = pick(NM), it = pick(IT), k = ri(3, 9), q = ri(4, 12), r = ri(1, k - 1), ty = ri(0, 3);
    if (ty === 0) return { text: `${n} shares ${k * q} ${it[0]} ${it[1]} equally among ${k} friends. How many does each friend get?`, answer: q, hints: ["Sharing equally is division.", `Divide the total by ${k}.`, "Example: 24 shared among 6 friends: 24 ÷ 6 = 4 each. Now do yours."] };
    if (ty === 1) return { text: `${n} puts ${k * q} ${it[0]} ${it[1]} into bags of ${k}. How many bags are filled?`, answer: q, hints: ["Making groups of a set size is division.", `How many groups of ${k} fit in the total?`, "Example: 30 in bags of 5. 30 ÷ 5 = 6 bags. Now do yours."] };
    if (ty === 2) return { text: `A van holds ${k} kids. ${q * k + r} kids need rides. How many full vans can be filled?`, answer: q, hints: ["Divide the kids by the seats. Only whole vans count here.", `Count by ${k}s without going past the number of kids.`, "Example: 5 kids per van and 17 kids: 5, 10, 15, so 3 full vans. Now do yours."] };
    return { text: `${n} has ${q * k + r} ${it[0]} ${it[1]} and makes piles of ${k}. How many are left over?`, answer: r, hints: ["Make as many full piles as you can. What is left does not fill a pile.", `Find the biggest number in the ${k} times table that is not over the total. Subtract it.`, "Example: 17 in piles of 5. 15 is in the table, so 17 − 15 = 2 left over. Now do yours."] };
  };
  const tenths = () => {
    const d = ri(1, 9);
    if (Math.random() < 0.5) return { text: `Which fraction is the same as 0.${d}?`, choices: shuf([`${d}/10`, `1/${d}`, `${d}/100`, `10/${d}`]), answer: `${d}/10`, hints: ["A decimal point separates wholes from parts. The first digit after the point is tenths.", "0.something with one digit means that many tenths, out of 10.", "Example: 0.3 means 3 tenths, which is 3/10. Now do yours."] };
    return { text: `Which decimal is the same as ${d}/10?`, choices: shuf([`0.${d}`, `${d}.0`, `0.0${d}`, `${d}0`]), answer: `0.${d}`, hints: ["Tenths go in the first place after the decimal point.", "Put the top number in the tenths place, with 0 as the whole number.", "Example: 7/10 is 7 tenths, written 0.7. Now do yours."] };
  };
  const pictGraph = () => {
    const k = pick([2, 5, 10]), it = pick([["⭐", "stars"], ["🍎", "apples"], ["🎈", "balloons"]]), a = ri(3, 8);
    if (Math.random() < 0.5) return { text: `In this picture graph each ${it[0]} stands for ${k} ${it[1]}. How many ${it[1]} does it show?`, visual: it[0].repeat(a), answer: a * k, hints: [`Each picture is worth ${k}, not 1.`, `Count the pictures, then count by ${k}s that many times.`, `Example: 3 pictures where each is worth ${k === 5 ? 10 : 5}: count ${k === 5 ? "10, 20, 30" : "5, 10, 15"}. Now do yours.`] };
    const b = rx(2, 8, a); return { text: `Each ${it[0]} stands for ${k} ${it[1]}.<br>Team A: ${it[0].repeat(a)}<br>Team B: ${it[0].repeat(b)}<br>How many more does the bigger team have?`, answer: Math.abs(a - b) * k, hints: ["Compare the two rows. Which row is longer, and by how many pictures?", `Find the difference in pictures, then multiply by ${k} because each picture is worth ${k}.`, "Example: rows of 6 and 4 pictures, each worth 5. The difference is 2 pictures, and 2 × 5 = 10. Now do yours."] };
  };

  const l6 = [
    L("Multiply 2-digit by 1-digit (big)", mult2big, [S("Break it apart", "47 × 6", "Split 47 into 40 and 7. Multiply each part by 6."), S("Two small problems", "40 × 6 = 240 &nbsp; 7 × 6 = 42", "40 × 6 = 240 and 7 × 6 = 42."), S("Add them", "240 + 42 = 282", "So 47 × 6 = <b>282</b>. Estimate to check: 50 × 6 = 300, close to 282.")]),
    L("Multiply by 10 and 100", mult100, [S("Place value shift", "35 × 10 = 350", "Times 10 moves every digit one place to the left. A zero fills the empty ones place."), S("Times 100", "35 × 100 = 3,500", "Times 100 moves digits two places left. Put two zeros on the end."), S("Pattern", "✨", "×10 adds one zero, ×100 adds two zeros. Easy!")]),
    L("Division with remainders", remainder, [S("Not always even", "17 ÷ 5", "Sometimes things cannot be shared exactly. 17 shared into groups of 5 makes 3 groups with 2 left over."), S("The remainder", "17 ÷ 5 = 3 R 2", "The left over part is the <b>remainder</b> (R). 3 × 5 = 15, and 17 − 15 = 2."), S("Remainder is small", "R &lt; the number you divide by", "The remainder is always smaller than what you divide by. If it is bigger, you can make another group!")]),
    L("Divide 2-digit numbers", div2, [S("Break into friendly parts", "84 ÷ 4", "Split 84 into 80 and 4. Both divide easily by 4."), S("Divide each part", "80 ÷ 4 = 20 &nbsp; 4 ÷ 4 = 1", "20 + 1 = <b>21</b>."), S("Check by multiplying", "21 × 4 = 84 ✅", "Multiply the answer by the number you divided by.")]),
    L("Order of operations", order, [S("Rules for order", "( ) then × ÷ then + −", "1) Brackets first. 2) Multiply and divide. 3) Add and subtract."), S("Multiply first", "2 + 3 × 4", "3 × 4 = 12 first, then 2 + 12 = <b>14</b>. If you added first you would get 20, which is wrong!"), S("Brackets change it", "(2 + 3) × 4 = 20", "Brackets mean do this first. 2 + 3 = 5, then 5 × 4 = 20.")]),
    L("Equivalent fractions", equivFrac, [S("Same amount, different name", "1/2 = 2/4", "Half of a pizza is the same as 2 out of 4 slices. Fractions that name the same amount are <b>equivalent</b>."), S("Multiply top and bottom", "1/2 × (3/3) = 3/6", "Multiply the top and bottom by the same number. 1 × 3 = 3 and 2 × 3 = 6."), S("Check", "🍕", "Equivalent fractions always match in size. 1/2 = 2/4 = 3/6 = 4/8.")]),
    L("Compare fractions (different)", cmpFrac2, [S("Think about piece size", "1/3 vs 1/8", "When the top is the same, the bottom number tells piece size. Fewer cuts means bigger pieces."), S("Smaller bottom = bigger piece", "1/3 &gt; 1/8", "A pizza cut into 3 slices has bigger slices than one cut into 8. So 1/3 is bigger."), S("Same top numbers", "3/4 vs 3/8", "3 bigger pieces is more than 3 small pieces. So 3/4 is bigger than 3/8.")]),
    L("Add fractions (same bottom)", addFrac, [S("Same size pieces", "2/8 + 3/8", "When the bottoms match, the pieces are the same size. Count the pieces."), S("Add the tops", "2 + 3 = 5", "Add the top numbers. The bottom stays the same: <b>5/8</b>."), S("Do not add the bottoms", "⚠️", "The bottom tells the piece size. It does not change when you add. 2/8 + 3/8 is not 5/16!")]),
    L("Fractions of a group", fracSet2, [S("Find one part first", "3/4 of 12", "For 3/4 of 12, first find 1/4: 12 ÷ 4 = 3."), S("Then multiply", "3 × 3 = 9", "You want 3 of those parts: 3 × 3 = <b>9</b>."), S("Method", "÷ then ×", "Divide by the bottom number. Multiply by the top number.")]),
    L("Area and missing sides", areaBig, [S("Area", "length × width", "Area is length times width. For a 12 m by 4 m garden: 12 × 4 = 48 square meters."), S("Missing side", "area ÷ width", "If you know the area and one side, divide to find the other side. 48 ÷ 4 = 12."), S("Check", "12 × 4 = 48 ✅", "Multiply back to see if you get the area.")]),
    L("Perimeter puzzles", missSide, [S("Perimeter", "l + w + l + w", "Perimeter is all the sides added up. A rectangle has two lengths and two widths."), S("Find a missing side", "20 − 7 − 7 = 6", "Perimeter 20 and length 7: take off two lengths (14). 6 is left for two widths. Each width is 3."), S("Squares", "24 ÷ 4 = 6", "A square has 4 equal sides. Divide the perimeter by 4.")]),
    L("Rounding to 10, 100, 1000", roundAny, [S("Find the place", "3,642", "To round to a place, look at that digit and then the digit to its right."), S("Right neighbour decides", "0-4 down &nbsp; 5-9 up", "If the neighbour is 0 to 4, keep the digit. If it is 5 to 9, add 1 to the digit. Everything after becomes zeros."), S("Examples", "3,642 → 3,600 → 4,000", "To the nearest hundred, 3,642 is 3,600. To the nearest thousand, it is 4,000.")]),
    L("Pattern rules", patt, [S("Number patterns", "7, 14, 21, 28", "A number pattern follows a rule. This one adds 7 each time."), S("Find the rule", "14 − 7 = 7", "Subtract neighbours to find the change. Going up means add, going down means subtract."), S("Use the rule", "28 + 7 = 35", "Apply the rule to the last number to get the next one.")]),
    L("Two-step story problems", word6, [S("Two jobs", "📖", "Some stories need two steps. Find what you need first, then do the second step."), S("Plan it", "× then −", "Write a plan: multiply to find a total, then add or subtract. Say each step out loud."), S("Check", "✅", "Does your answer make sense in the story?")]),
    L("Multiplying story problems", multWord, [S("Equal groups", "📦📦📦", "When every group has the same amount, <b>multiply</b> to find the total."), S("Look for clues", "each, every, per", "Words like <b>each</b>, <b>every</b> and <b>per</b> often mean multiply."), S("Write it", "3 × 8 = 24", "Write a number sentence, solve it, then answer in a sentence.")]),
    L("Division story problems", divWord, [S("Share or group", "🍪 ÷ 👥", "Division stories either <b>share equally</b> or <b>make groups</b> of a set size."), S("Leftovers", "17 ÷ 5 = 3 R 2", "Sometimes some are left over. Read the question: do they want full groups or the leftovers?"), S("Check", "3 × 5 + 2 = 17 ✅", "Multiply back and add the remainder to check.")]),
    L("Tenths and decimals", tenths, [S("Tenths", "🟩⬜⬜⬜⬜⬜⬜⬜⬜⬜", "One whole cut into 10 equal parts. One part is <b>one tenth</b>, written 1/10 or 0.1."), S("Decimal point", "0.3 = 3/10", "The first digit after the decimal point is the tenths place. 0.3 means 3 tenths."), S("Compare", "0.9 &gt; 0.2", "More tenths is bigger. 0.9 is 9 tenths, which is more than 2 tenths.")]),
    L("Picture graphs", pictGraph, [S("Read the key", "⭐ = 5", "A picture graph uses pictures. The <b>key</b> tells what each picture is worth."), S("Count by the key", "⭐⭐⭐ = 15", "3 pictures worth 5 each: 5, 10, 15."), S("Compare rows", "6 − 4 = 2 pictures", "To find how many more, find the difference in pictures, then multiply by what each is worth.")])
  ];
  l6.push(mixOf("Mixed practice", [l6[0], l6[2], l6[4], l6[5], l6[7]]));
  l6.push(mixOf("Level 6 Challenge", [l6[1], l6[3], l6[8], l6[10], l6[11], l6[13], l6[15], l6[16]]));
  l6.length = 20;

  Object.assign(MATH_LEVELS, { 4: l4, 5: l5, 6: l6 });
})();
