// ext/math-7-9.js  Mind Lab Math levels 7-9 (60 lessons)
(() => {
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
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
  const nz = x => String(x).toLowerCase().replace(/[^\w.\-]/g, "");
  // multiple-choice list: the answer plus up to 3 distinct wrong choices
  const cho = (ans, ...o) => {
    const seen = new Set([nz(ans)]), out = [];
    for (const x of shuf(o)) { if (!seen.has(nz(x)) && out.length < 3) { seen.add(nz(x)); out.push(x); } }
    return shuf([ans, ...out]);
  };
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => a * b / gcd(a, b);
  const parts = y => [1000, 100, 10, 1].map(p => (Math.floor(y / p) % 10) * p).filter(p => p > 0);
  const isPrime = n => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
  const dec = (n, k) => n.toFixed(k);
  const wrongAdj = ans => g => (Math.abs(g - ans) === 1 ? "So close! Check your last step again." : Math.abs(g - ans) % 10 === 0 && g !== ans ? "Almost! Check your carrying, borrowing or zeros." : null);
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tensW = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const w99 = n => (n < 20 ? ones[n] : tensW[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : ""));
  const w999 = n => { const h = Math.floor(n / 100), r = n % 100; return (h ? ones[h] + " hundred" + (r ? " " : "") : "") + (r ? w99(r) : ""); };
  const words = n => { const t = Math.floor(n / 1000), r = n % 1000; return (t ? w999(t) + " thousand" + (r ? " " : "") : "") + (r ? w999(r) : ""); };
  const clock = (h, m) => `${h}:${String(m).padStart(2, "0")}`;
  const $ = c => "$" + (c / 100).toFixed(2);

  // ================= LEVEL 7 =================
  const placeV = () => {
    const s = ri(0, 2);
    if (s === 0) {
      const ds = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4), p = ri(0, 3), n = +ds.join(""), d = ds[p], v = d * [1000, 100, 10, 1][p];
      return { text: `What is the value of the digit <b>${d}</b> in ${n}?`, choices: shuf([d * 1000, d * 100, d * 10, d]), answer: v,
        hints: ["A digit is worth a different amount in each place: thousands, hundreds, tens or ones.", `Find where the ${d} sits. Count the places from the right: ones, tens, hundreds, thousands.`,
          "Example: in 5316 the 3 is in the hundreds place, so it is worth 3 hundreds = 300. Now find yours."] };
    }
    if (s === 1) {
      const a = ri(1, 9), b = ri(0, 9), c = ri(0, 9), d = ri(0, 9), ea = rx(1, 9, a);
      return { text: `${a} thousands, ${b} hundreds, ${c} tens and ${d} ones = ?`, answer: a * 1000 + b * 100 + c * 10 + d,
        hints: ["Write each part as a number first: thousands, hundreds, tens, ones. A zero means none of that part.", `${a} thousands is ${a * 1000}. Work out each of the other parts the same way, then put them together.`,
          `Example: ${ea} thousands, 3 hundreds, 0 tens and 7 ones is ${ea * 1000} + 300 + 0 + 7 = ${ea * 1000 + 307}. Now do yours.`] };
    }
    const n = ri(20, 89) * 100 + ri(0, 9) * 10 + ri(0, 9), k = pick([[1000, "more"], [100, "more"], [10, "more"], [1000, "less"], [100, "less"], [10, "less"]]);
    const ans = k[1] === "more" ? n + k[0] : n - k[0];
    return { text: `What is ${k[0]} ${k[1]} than ${n}?`, answer: ans, wrong: wrongAdj(ans),
      hints: [`Only one place changes (the ${k[0] === 1000 ? "thousands" : k[0] === 100 ? "hundreds" : "tens"} place). Which way does it go?`, `${k[1] === "more" ? "Add" : "Subtract"} ${k[0]} by changing just that one digit, and leave the other digits alone.`,
        "Example: 1000 more than 4250 is 5250, because only the thousands digit goes up by 1. Now do yours."] };
  };
  const cmp4 = () => {
    if (Math.random() < 0.5) {
      const a = ri(1000, 9999), b = Math.random() < 0.6 ? Math.floor(a / 100) * 100 + ri(0, 99) : ri(1000, 9999), c = ri(1000, 9999);
      const set = [...new Set([a, b, c])]; if (set.length < 3) return cmp4();
      const big = Math.random() < 0.5, ans = big ? Math.max(...set) : Math.min(...set);
      return { text: `Which number is the ${big ? "greatest" : "least"}?`, choices: shuf(set), answer: ans,
        hints: ["Compare the digits from the left. The thousands place matters most.", "If the thousands digits match, compare the hundreds, then the tens, then the ones.", "Example: 5420, 5390 and 5402. All have 5 thousands. Hundreds: 4, 3, 4, so 5390 is least. Now try yours."] };
    }
    const a = ri(1000, 9999); let b = Math.random() < 0.5 ? a + ri(-90, 90) : ri(1000, 9999); if (b === a) b = a + 7;
    return { text: `Complete it: ${a} ______ ${b}`, choices: ["is less than", "is greater than"], answer: a < b ? "is less than" : "is greater than",
      hints: ["The sign opens toward the bigger number, like a hungry mouth.", "Compare the digits from the left until they are different. The bigger digit wins.", "Example: 3860 ? 3810. The hundreds match; tens: 6 is more than 1, so 3860 &gt; 3810. Now do yours."] };
  };
  const mult3 = () => {
    const a = ri(110, 399), b = ri(2, 9), ps = parts(a), ex = pick([[214, 3], [132, 4], [305, 2]].filter(p => p[0] !== a));
    const exps = parts(ex[0]);
    return { text: `${a} × ${b} = ?`, answer: a * b, wrong: wrongAdj(a * b),
      hints: ["Break the big number into hundreds, tens and ones. Multiply each part, then add.", `Split ${a} into ${ps.join(", ")}. Multiply each part by ${b}, then add the answers together.`,
        `Example: ${ex[0]} × ${ex[1]}. ${exps.map(p => `${p} × ${ex[1]} = ${p * ex[1]}`).join(", ")}. Add: ${exps.map(p => p * ex[1]).join(" + ")} = ${ex[0] * ex[1]}. Now do yours.`] };
  };
  const multTens = () => {
    const a = ri(2, 9), b = ri(2, 9), t = ri(0, 2), x = t === 1 ? a : a * 10, y = t === 0 ? b : b * 10, z = x * y;
    return { text: `${x} × ${y} = ?`, answer: z,
      hints: ["Multiply the plain number facts first and ignore the zeros for now.", "Then put the zeros back: count the zeros in both numbers and add that many zeros at the end.",
        "Example: 40 × 30. Basic fact: 4 × 3 = 12. There are two zeros in all, so 1200. Now do yours."] };
  };
  const div3 = () => {
    const d = ri(2, 9), q = ri(12, Math.floor(999 / d)), n = q * d;
    return { text: `${n} ÷ ${d} = ?`, answer: q, wrong: wrongAdj(q),
      hints: ["Divide one place at a time, starting with the biggest place. Multiply back to check.", `Think: how many times does ${d} fit into the first digits of ${n}? Subtract, bring down the next digit and keep going.`,
        "Example: 252 ÷ 6. 6 goes into 25 four times (24), remainder 1. Bring down 2 to make 12. 6 goes into 12 twice. The answer is 42. Now do yours."] };
  };
  const missingF = () => {
    const a = ri(3, 12), b = ri(3, 12), p = a * b, t = ri(0, 3);
    const text = t === 0 ? `? × ${b} = ${p}` : t === 1 ? `${p} ÷ ? = ${b}` : t === 2 ? `? ÷ ${a} = ${b}` : `${a} × ? = ${p}`;
    const ans = t === 0 ? a : t === 1 ? a : t === 2 ? p : b;
    return { text, answer: ans,
      hints: ["Multiplication and division are partners. They undo each other, like a fact family.", t === 2 ? "Division undone is multiplying: think of the missing number as groups times the size of each group." : "Use the other operation to find the missing number. Which fact do you know?",
        "Example: ? × 7 = 56. Ask 56 ÷ 7 = 8, so the missing number is 8. Check: 8 × 7 = 56. Now do yours."] };
  };
  const FR = [2, 3, 4, 5, 6, 8, 10, 12];
  const unitFr = () => {
    const a = pick(FR), b = pick(FR); if (a === b) return unitFr();
    const k = pick([1, 1, 2, 3]), big = Math.random() < 0.5, bigger = Math.min(a, b), smaller = Math.max(a, b);
    if (k >= bigger) return unitFr();
    const ansDen = big ? bigger : smaller, ex = pick([[3, 6], [4, 10], [2, 5]].filter(p => !(p.includes(a) && p.includes(b))));
    return { text: `Which fraction is ${big ? "bigger" : "smaller"}?`, choices: [`${k}/${a}`, `${k}/${b}`], answer: `${k}/${ansDen}`,
      hints: ["Both fractions have the same top number. Think about how big each piece is.", "The more pieces a whole is cut into, the smaller each piece is. Look at the bottom numbers.",
        `Example: ${k}/${ex[0]} and ${k}/${ex[1]}. A whole cut into ${ex[1]} pieces has smaller pieces than ${ex[0]} pieces, so ${k}/${ex[1]} is smaller and ${k}/${ex[0]} is bigger. Now do yours.`] };
  };
  const frLine = () => {
    const n = ri(3, 10), k = ri(1, n - 1);
    return { text: `A number line from 0 to 1 is cut into ${n} equal jumps. The pin 📍 is after the jumps shown. What fraction is the pin at?`, visual: `0 ${"🟦".repeat(k)}📍${"⬜".repeat(n - k)} 1`,
      choices: cho(`${k}/${n}`, `${n - k}/${n}`, `${k}/${n - k}`, `${n}/${k}`, `${k + 1}/${n}`), answer: `${k}/${n}`,
      hints: ["The bottom number is how many equal jumps there are from 0 to 1.", "The top number is how many jumps you have taken to get to the pin. Count the blue jumps.",
        "Example: a line cut into 5 jumps, with the pin after 2 jumps, is at 2/5. Now do yours."] };
  };
  const addTenths = () => {
    const a = ri(2, 9), b = ri(2, 9), w = ri(0, 2), s = a + b, ans = dec(w + s / 10, 1);
    const ex = pick([[2, 3], [4, 4], [6, 7]].filter(p => p[0] + p[1] !== s));
    return { text: `${dec(w + a / 10, 1)} + 0.${b} = ?`, choices: cho(ans, dec(w + s / 10 + 0.1, 1), dec(w + s / 10 - 0.1, 1), dec(w + s / 10 + 1, 1), dec(w + s, 1)), answer: ans,
      hints: ["Think in tenths. Add the tenths digits like ordinary numbers.", "Remember that 10 tenths make 1 whole. If your tenths reach 10 or more, move 1 whole to the ones place.",
        `Example: 0.${ex[0]} + 0.${ex[1]}. ${ex[0]} tenths + ${ex[1]} tenths = ${ex[0] + ex[1]} tenths = ${dec((ex[0] + ex[1]) / 10, 1)}. Now do yours.`] };
  };
  const timeHour = () => {
    const h = ri(1, 12), mm = pick([10, 15, 20, 25, 35, 40, 45, 50]), d = pick([20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80]);
    const f = dd => { const t = h * 60 + mm + dd; return clock(((Math.floor(t / 60) - 1) % 12) + 1, t % 60); };
    const next = h % 12 + 1;
    return { text: `It is ${clock(h, mm)}. What time will it be in ${d} minutes?`, visual: "🕒", choices: cho(f(d), f(d + 10), f(d - 10), f(d + 5), f(d - 5)), answer: f(d),
      hints: ["Jump to the next o'clock time first. Then add the minutes that are left over.", `How many minutes from ${clock(h, mm)} to ${next}:00? Take those away from ${d} and add what is left to ${next}:00.`,
        "Example: 2:40 plus 50 minutes. 20 minutes gets to 3:00. 30 minutes are left, so it is 3:30. Now do yours."] };
  };
  const moneyDec = () => {
    const a = ri(1, 9) * 100 + ri(1, 19) * 5, b = ri(1, 9) * 100 + ri(1, 19) * 5;
    if (Math.random() < 0.5) return { text: `A book costs ${$(a)} and a pen costs ${$(b)}. How much for both?`, visual: "📘✏️", choices: cho($(a + b), $(a + b + 10), $(a + b - 100), $(a + b + 100), $(a + b - 10)), answer: $(a + b),
      hints: ["Line up the decimal points. Add the cents first, then the dollars.", "100 cents make 1 dollar. If your cents reach 100 or more, carry 1 dollar over to the dollars column.",
        "Example: $2.75 + $1.50. Cents: 75 + 50 = 125 = 1 dollar and 25 cents. Dollars: 2 + 1 + 1 = 4. So $4.25. Now do yours."] };
    const pay = pick([1000, 2000]), c = ri(2, 9) * 100 + ri(1, 19) * 5, ans = pay - c;
    return { text: `You pay ${$(pay)} for a toy that costs ${$(c)}. How much change do you get?`, visual: "🧸", choices: cho($(ans), $(ans + 100), $(ans - 100), $(ans + 10), $(ans - 10)), answer: $(ans),
      hints: ["Change is what is left, so subtract the price from the money you paid.", "Count up from the price to the money you paid: first to the next dollar, then to the next whole dollars.", "Example: pay $10.00 for $6.40. $6.40 up to $7.00 is 60 cents, then $7 up to $10 is $3. Change: $3.60. Now do yours."] };
  };
  const areaL = () => {
    const a = ri(3, 9), b = ri(2, 8), c = ri(2, 6), d = ri(2, 6);
    if (Math.random() < 0.5) return { text: `An L-shaped room is made from two rectangles. One is ${a} m by ${b} m. The other is ${c} m by ${d} m. What is the total area in square meters?`, visual: "🟫", answer: a * b + c * d,
      hints: ["Find the area of each rectangle on its own: length × width.", "The two rectangles do not overlap, so add their areas together.", "Example: rectangles 5 by 2 and 3 by 3. 5 × 2 = 10 and 3 × 3 = 9. 10 + 9 = 19. Now do yours."] };
    const p = ri(8, 12), q = ri(6, 9), r = ri(2, 4), s = ri(2, 4);
    return { text: `A ${p} m by ${q} m rectangle has a ${r} m by ${s} m rectangle cut out of a corner. What area is left in square meters?`, visual: "✂️", answer: p * q - r * s,
      hints: ["First find the area of the big rectangle. Then find the area of the piece that was cut out.", "Take the cut-out area away from the big area.", "Example: 6 by 5 rectangle with a 2 by 2 piece cut out. 30 − 4 = 26. Now do yours."] };
  };
  const UNITS = [["the mass of a pencil", "grams"], ["the mass of a watermelon", "kilograms"], ["the water in a bathtub", "liters"], ["a spoonful of medicine", "milliliters"], ["the mass of a bag of flour", "kilograms"],
    ["the mass of a paper clip", "grams"], ["a big bottle of juice", "liters"], ["a cup of tea", "milliliters"], ["the mass of an elephant", "kilograms"], ["the water in a fish tank", "liters"], ["the mass of a grape", "grams"], ["a small squirt of soap", "milliliters"]];
  const unitsQ = () => {
    const it = pick(UNITS);
    return { text: `Which unit is best to measure ${it[0]}?`, choices: cho(it[1], "grams", "kilograms", "liters", "milliliters"), answer: it[1],
      hints: ["Is it mass (how heavy) or capacity (how much liquid)? Grams and kilograms are for mass; liters and milliliters are for liquid.", "Small things use the small unit (gram, milliliter). Big things use the big unit (kilogram, liter). Which size is this?",
        "Example: a feather is light, so we use grams. A bucket of water is big, so we use liters. Now pick for yours."] };
  };
  const barGraph = () => {
    const k = pick([2, 5, 10]), cats = pick([[["🐶", "Dogs"], ["🐱", "Cats"], ["🐠", "Fish"]], [["🍎", "Apples"], ["🍌", "Bananas"], ["🍇", "Grapes"]], [["⚽", "Soccer"], ["🏀", "Basketball"], ["🎾", "Tennis"]]]);
    const v = [ri(2, 9), ri(2, 9), ri(2, 9)]; v[1] = rx(2, 9, v[0]);
    const vis = cats.map((c, i) => `${c[0]} ${c[1]}: ${"🟦".repeat(v[i])}`).join("<br>"), t = ri(0, 2);
    const ex = `Each 🟦 stands for ${k}.<br>`;
    if (t === 0) return { text: ex + `How many votes does ${cats[0][1]} have?`, visual: vis, answer: v[0] * k, hints: [`Each block is worth ${k}, not 1.`, `Count the blocks, then skip count by ${k} that many times.`, "Example: 4 blocks, each worth 5, is 5, 10, 15, 20 = 20. Now do yours."] };
    if (t === 1) return { text: ex + `How many more votes does ${cats[0][1]} have than ${cats[1][1]}? (Use the bigger minus the smaller.)`, visual: vis, answer: Math.abs(v[0] - v[1]) * k, hints: ["Find how many blocks the two bars differ by.", `Multiply that number of blocks by ${k}.`, "Example: bars of 7 and 4 blocks, each worth 2. The difference is 3 blocks, and 3 × 2 = 6. Now do yours."] };
    return { text: ex + `How many votes in total for ${cats[1][1]} and ${cats[2][1]}?`, visual: vis, answer: (v[1] + v[2]) * k, hints: ["Find the votes for each bar first.", `Each block is worth ${k}. Work out each bar, then add them.`, "Example: 3 blocks and 2 blocks, each worth 10: 30 + 20 = 50. Now do yours."] };
  };
  const mulProp = () => {
    const a = ri(3, 9), b = ri(6, 9), t = ri(0, 2);
    if (t === 0) { const s = ri(2, 4), r = b - s; return { text: `${a} × ${b} = (${a} × ${s}) + (${a} × ?)`, answer: r,
      hints: ["Break the second number into two smaller numbers that add up to it. This is the distributive property.", `The two numbers inside the brackets should add up to ${b}. One of them is ${s}.`, "Example: 6 × 7 = (6 × 5) + (6 × ?). 5 + 2 = 7, so the missing number is 2. Now do yours."] }; }
    if (t === 1) return { text: `${a} × ${b} = ${b} × ?`, answer: a, hints: ["Multiplying in a different order gives the same answer. This is the commutative property.", "Swap the two numbers around. What is missing?", "Example: 4 × 9 = 9 × ?. Swap them: the missing number is 4. Now do yours."] };
    const x = ri(2, 5), y = ri(2, 4), z = ri(2, 5);
    return { text: `(${x} × ${y}) × ${z} = ${x} × (${y} × ?)`, answer: z, hints: ["You can group factors in a different way and still get the same product. This is the associative property.", "Look at which numbers are left outside the brackets on the left side. Which one is missing on the right?", "Example: (2 × 3) × 5 = 2 × (3 × ?). The left side uses 2, 3 and 5, so ? is 5. Now do yours."] };
  };
  const oddEven = () => {
    const a = ri(11, 99), b = ri(11, 99), plus = Math.random() < 0.5, pa = a % 2, pb = b % 2, res = plus ? (pa + pb) % 2 : pa * pb;
    return { text: `Without working it out: is ${a} ${plus ? "+" : "×"} ${b} odd or even?`, choices: ["odd", "even"], answer: res ? "odd" : "even",
      hints: ["Look at the last digit of each number. Is each number odd or even?", `Test it with tiny numbers that have the same kinds of parity (odd or even), such as 2, 4, 3 or 5, and see what ${plus ? "adding" : "multiplying"} gives.`,
        plus ? "Example: 3 × 4 = 12. One odd and one even number multiplied gave an even answer. Now test yours." : "Example: 4 + 7 = 11. An even plus an odd gave an odd answer. Now test yours."] };
  };
  const QUAD = [["4 equal sides and 4 right angles", "square"], ["4 equal sides, but no right angles (a tilted diamond)", "rhombus"], ["opposite sides equal and 4 right angles, but not all sides equal", "rectangle"],
    ["only 1 pair of parallel sides", "trapezoid"], ["opposite sides parallel and equal, with no right angles, and sides not all equal", "parallelogram"], ["4 sides, all the same length, 4 square corners", "square"],
    ["a long thin shape with 2 long sides, 2 short sides and 4 right angles", "rectangle"], ["4 sides all equal that looks like a squashed square", "rhombus"]];
  const quadQ = () => {
    const it = pick(QUAD);
    return { text: `Which shape is this? It has ${it[0]}.`, choices: cho(it[1], "square", "rectangle", "rhombus", "trapezoid", "parallelogram"), answer: it[1],
      hints: ["All of these shapes are quadrilaterals: they have 4 sides. Look at the sides and angles in the clue.", "Ask: are all the sides equal? Are there right angles? How many pairs of parallel sides?",
        "Example: 4 equal sides and no right angles is a rhombus; 4 equal sides and 4 right angles is a square. Now think about yours."] };
  };
  const twoStep3 = () => {
    const t = ri(0, 3), nm = pick(NM), a = ri(3, 9), b = ri(4, 9), c = ri(3, 20), c0 = ri(3, a * b - 1);
    if (t === 0) return { text: `A shop has ${a} boxes with ${b} pencils in each box. It sells ${c0} pencils. How many pencils are left?`, answer: a * b - c0, hints: ["Underline the question. What do you need to find first?", "Step 1: multiply to find the total pencils. Step 2: take away the ones sold.", "Example: 4 boxes of 6, then 5 sold: 4 × 6 = 24, 24 − 5 = 19. Now do yours."] };
    if (t === 1) return { text: `${nm} buys ${a} packs of ${b} stickers and then finds ${c} more stickers. How many stickers does ${nm} have?`, answer: a * b + c, hints: ["Find the stickers in the packs first.", "Step 1: multiply packs by stickers in each pack. Step 2: add the stickers that were found.", "Example: 3 packs of 5 and 4 more: 3 × 5 = 15, 15 + 4 = 19. Now do yours."] };
    if (t === 2) return { text: `${nm} reads ${b} pages a day for ${a} days, then reads ${c} pages more on the weekend. How many pages is that in all?`, answer: a * b + c, hints: ["What do you find first: the pages from the days, or the weekend?", "Step 1: pages a day times number of days. Step 2: add the weekend pages.", "Example: 5 pages for 4 days, plus 8 more: 20 + 8 = 28. Now do yours."] };
    const w = ri(3, 9), per = ri(2, 9), sp = ri(1, per * w - 1);
    return { text: `${nm} saves $${per} each week for ${w} weeks, then spends $${sp}. How many dollars are left?`, answer: per * w - sp, hints: ["Find what was saved in all before thinking about spending.", "Step 1: dollars per week times the number of weeks. Step 2: subtract what was spent.", "Example: $3 a week for 5 weeks is $15. Spend $4 and $11 is left. Now do yours."] };
  };

  const l7 = [
    L("Place value to 10,000", placeV, [S("Four places", "1 2 3 4", "In a 4-digit number the places are <b>thousands, hundreds, tens, ones</b>, from left to right."), S("Value of a digit", "7 in 7,402", "The 7 is in the thousands place, so it is worth <b>7,000</b>."), S("Adding 10, 100, 1000", "4250 + 1000", "Only one digit changes: 4250 + 1000 = <b>5250</b>.")]),
    L("Compare 4-digit numbers", cmp4, [S("Start from the left", "4,820 vs 4,790", "Compare the biggest places first. Thousands are the same, so look at the hundreds."), S("Find the first difference", "8 &gt; 7", "Hundreds: 8 is more than 7, so 4,820 is bigger."), S("Signs", "&lt; &nbsp; &gt;", "The sign opens toward the bigger number.")]),
    L("Multiply 3-digit by 1-digit", mult3, [S("Break it apart", "214 × 3", "Split 214 into 200, 10 and 4. Multiply each part by 3."), S("Three small facts", "600 + 30 + 12", "200 × 3 = 600, 10 × 3 = 30 and 4 × 3 = 12."), S("Add them", "= 642", "600 + 30 + 12 = <b>642</b>. Estimate: 200 × 3 = 600, so we are close.")]),
    L("Multiply multiples of 10", multTens, [S("Basic fact first", "40 × 30", "Cover the zeros. 4 × 3 = 12."), S("Count the zeros", "0 and 0", "There are 2 zeros in 40 and 30 together."), S("Put them back", "1200", "12 with 2 zeros on the end is <b>1200</b>.")]),
    L("Divide 3-digit numbers", div3, [S("Step by step", "252 ÷ 6", "Start with the first digits. 6 goes into 25 four times."), S("Subtract, bring down", "25 − 24 = 1, then 12", "Subtract 24 from 25 to get 1. Bring down the 2 to make 12."), S("Finish", "12 ÷ 6 = 2", "So 252 ÷ 6 = <b>42</b>. Check: 42 × 6 = 252.")]),
    L("Fact families and missing numbers", missingF, [S("Fact family", "7 × 8 = 56", "7 × 8 = 56, 8 × 7 = 56, 56 ÷ 7 = 8 and 56 ÷ 8 = 7 all go together."), S("Undo it", "? × 7 = 56", "To find the missing factor, divide: 56 ÷ 7 = 8."), S("Check", "8 × 7 = 56 ✅", "Always multiply back to check.")]),
    L("Unit fractions: bigger or smaller", unitFr, [S("Cutting pieces", "🍕", "The more pieces you cut a whole into, the smaller each piece is."), S("Compare 1/3 and 1/6", "1/3 &gt; 1/6", "Sixths are smaller than thirds, so 1/6 is smaller."), S("Same top number", "2/5 &gt; 2/8", "When the tops match, the smaller bottom number means the bigger fraction.")]),
    L("Fractions on a number line", frLine, [S("Equal jumps", "0 ▫▫▫▫ 1", "Cut the line from 0 to 1 into equal jumps. The bottom number is how many jumps."), S("Count the jumps", "📍 after 3 of 5", "The top number is how many jumps you took. 3 jumps out of 5 is 3/5."), S("The end", "5/5 = 1", "When you have taken all the jumps you are at 1 whole.")]),
    L("Add tenths", addTenths, [S("Tenths", "0.3 = 3/10", "The first digit after the point is the tenths place."), S("Add the tenths", "0.4 + 0.3", "4 tenths + 3 tenths = 7 tenths = 0.7."), S("Make a whole", "0.7 + 0.6 = 1.3", "10 tenths make 1 whole. 13 tenths is 1 whole and 3 tenths.")]),
    L("Time across the hour", timeHour, [S("Jump to the hour", "2:40 → 3:00", "From 2:40, 20 minutes gets you to 3:00."), S("Add the rest", "50 − 20 = 30", "If you must add 50 minutes, 30 minutes are left over."), S("Land on the time", "3:30", "3:00 plus 30 minutes is <b>3:30</b>.")]),
    L("Dollars and cents", moneyDec, [S("Line up the point", "$2.75 + $1.50", "Line up the decimal points. Add cents first, then dollars."), S("Carry 100 cents", "75 + 50 = 125¢", "125 cents is 1 dollar and 25 cents."), S("Change", "$10 − $6.40", "To find change, subtract the price, or count up from the price to the money paid.")]),
    L("Area of L-shapes", areaL, [S("Split it", "🟫🟫 / 🟫", "An L-shape is two rectangles. Find each area: length × width."), S("Add them", "10 + 9 = 19", "The pieces do not overlap, so just add."), S("Cut-outs", "30 − 4", "If a piece is cut out, subtract its area from the big rectangle.")]),
    L("Liters, grams and kilograms", unitsQ, [S("Mass", "g and kg", "<b>Grams</b> measure light things. <b>Kilograms</b> (1,000 grams) measure heavier things."), S("Liquid", "mL and L", "<b>Milliliters</b> measure small amounts. <b>Liters</b> (1,000 mL) measure bigger amounts."), S("Pick by size", "🍇 vs 🍉", "A grape is a few grams. A watermelon is a few kilograms.")]),
    L("Bar graphs with a scale", barGraph, [S("Read the key", "🟦 = 5", "Each block can be worth more than 1. The key tells you how much."), S("Count and multiply", "4 blocks × 5", "4 blocks worth 5 each = 20."), S("Compare bars", "7 − 4 = 3 blocks", "To find how many more, find the difference in blocks and multiply by the scale.")]),
    L("Multiplication properties", mulProp, [S("Any order", "4 × 9 = 9 × 4", "You can multiply in any order. That is the <b>commutative</b> property."), S("Break apart", "6 × 7 = 6×5 + 6×2", "Split one number into parts: 30 + 12 = 42. That is the <b>distributive</b> property."), S("Regroup", "(2×3)×5 = 2×(3×5)", "Group the factors in a different way. That is the <b>associative</b> property.")]),
    L("Odd and even rules", oddEven, [S("Odd or even", "12 14 | 13 15", "Even numbers end in 0, 2, 4, 6, 8. Odd numbers end in 1, 3, 5, 7, 9."), S("Adding", "odd + odd", "Odd + odd = even. Even + even = even. Odd + even = odd."), S("Multiplying", "even × anything", "Even × anything = even. Odd × odd = odd.")]),
    L("Quadrilaterals", quadQ, [S("Four sides", "⬜", "A <b>quadrilateral</b> is any shape with 4 sides."), S("Special ones", "square, rectangle, rhombus", "A square has 4 equal sides and 4 right angles. A rectangle has 4 right angles. A rhombus has 4 equal sides."), S("Parallel", "trapezoid, parallelogram", "A trapezoid has just one pair of parallel sides. A parallelogram has two pairs.")]),
    L("Two-step word problems", twoStep3, [S("Read twice", "📖", "Read the problem and underline the question."), S("Plan two steps", "× then +", "First multiply to find a total. Then add or subtract the extra part."), S("Check", "✅", "Does your answer make sense? Re-read the question.")])
  ];
  l7.push(mixOf("Mixed practice", [l7[0], l7[2], l7[4], l7[7], l7[9], l7[12], l7[16]]));
  l7.push(mixOf("Level 7 Challenge", [l7[1], l7[3], l7[5], l7[8], l7[10], l7[11], l7[13], l7[14], l7[15], l7[17]]));

  // ================= LEVEL 8 =================
  const estimate = () => {
    const big = Math.random() < 0.4, u = big ? 1000 : 100, lo = big ? 1200 : 120, hi = big ? 9800 : 980;
    const ok = x => { const r = x % u; return r < u * 0.45 || r > u * 0.55; };
    let a, b, i = 0; do { a = ri(lo, hi); b = ri(lo, hi); } while ((!ok(a) || !ok(b) || (Math.round(a / u) - Math.round(b / u) < 1)) && ++i < 300);
    const plus = Math.random() < 0.5, ra = Math.round(a / u) * u, rb = Math.round(b / u) * u;
    return { text: `Estimate ${a} ${plus ? "+" : "−"} ${b} by rounding each number to the nearest ${u}.`, answer: plus ? ra + rb : ra - rb,
      hints: [`Look at the digit just to the right of the ${u === 100 ? "hundreds" : "thousands"} place. If it is 5 or more, round up.`, `Round both numbers first. Then ${plus ? "add" : "subtract"} the two rounded numbers.`,
        "Example: 348 + 412. Round: 300 and 400. Then 300 + 400 = 700. Now do yours."] };
  };
  const mult22 = () => {
    const a = ri(12, 29), b = ri(11, 39), t = Math.floor(b / 10) * 10, o = b - t, ans = a * b;
    if (o === 0) return mult22();
    return { text: `${a} × ${b} = ?`, answer: ans, wrong: wrongAdj(ans),
      hints: ["Use an area model. Break the second number into tens and ones.", `Split ${b} into ${t} and ${o}. Multiply ${a} × ${t}, then ${a} × ${o}, then add the two answers.`,
        "Example: 14 × 12. 14 × 10 = 140 and 14 × 2 = 28. 140 + 28 = 168. Now do yours."] };
  };
  const div10 = () => {
    const q = ri(2, 99), t = ri(0, 3), n = [q * 10, q * 100, q * 100, q * 1000][t], d = [10, 100, 10, 100][t], ans = n / d;
    if (ans % 1 !== 0) return div10();
    return { text: `${n} ÷ ${d} = ?`, answer: ans,
      hints: ["Dividing by 10 makes every digit move one place to the right.", `${d} has ${d === 10 ? "one zero" : "two zeros"}. Take that many zeros off the end of ${n}.`,
        "Example: 4500 ÷ 100. Take off two zeros to get 45. Now do yours."] };
  };
  const longDiv = () => {
    const d = ri(3, 9), n = ri(100, 999); if (n % d === 0) return longDiv();
    const q = Math.floor(n / d), r = n % d, askR = Math.random() < 0.5;
    return { text: askR ? `${n} ÷ ${d}: what is the remainder?` : `${n} ÷ ${d}: what is the whole-number part of the answer (the quotient)?`, answer: askR ? r : q,
      hints: ["Use long division: divide, multiply, subtract, bring down. Repeat.", askR ? `The remainder is what is left at the end, and it must be smaller than ${d}.` : `Check at the end: your quotient times ${d}, plus the remainder, should give back ${n}.`,
        "Example: 157 ÷ 4. 4 into 15 is 3 (12), leftover 3. Bring down 7 to make 37. 4 into 37 is 9 (36), leftover 1. So 39 R 1. Now do yours."] };
  };
  const factorsOf = n => { const f = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; };
  const factorQ = () => {
    const n = pick([12, 16, 18, 20, 24, 28, 30, 36, 40, 42, 48]), f = factorsOf(n);
    if (Math.random() < 0.5) {
      const not = []; for (let i = 2; i < n; i++) if (n % i) not.push(i);
      const ans = pick(f.filter(x => x > 1 && x < n));
      return { text: `Which number is a factor of ${n}?`, choices: cho(ans, ...shuf(not).slice(0, 3)), answer: ans,
        hints: ["A factor divides a number exactly, with nothing left over.", `Try dividing ${n} by each choice. Which one goes in evenly?`, "Example: is 5 a factor of 30? 30 ÷ 5 = 6 exactly, so yes. Is 4? 30 ÷ 4 leaves a remainder, so no. Now try yours."] };
    }
    return { text: `How many factors does ${n} have? (Count 1 and ${n} too.)`, answer: f.length,
      hints: ["Factors come in pairs that multiply to make the number.", `Start at 1 × ${n}. Then try 2, 3, 4, and so on. Stop when the pairs start to repeat.`, "Example: 10 has 1×10 and 2×5, so its factors are 1, 2, 5, 10: that is 4 factors. Now do yours."] };
  };
  const multQ = () => {
    if (Math.random() < 0.6) {
      const [a, b] = pick([[2, 3], [3, 4], [4, 6], [2, 5], [3, 5], [4, 5], [6, 8], [3, 6], [2, 7], [4, 10], [6, 9]]);
      return { text: `What is the smallest number that both ${a} and ${b} go into?`, answer: lcm(a, b),
        hints: ["This is called the least common multiple. A multiple is in the times table of a number.", "Write out the multiples of each number and look for the first one that is in both lists.", "Example: 4 and 10. Multiples of 4: 4, 8, 12, 16, 20. Multiples of 10: 10, 20. The first match is 20. Now do yours."] };
    }
    const d = ri(3, 9), k = ri(4, 12), ans = d * k, bad = []; for (let i = 0; i < 40; i++) { const x = ri(10, 99); if (x % d) bad.push(x); }
    return { text: `Which of these is a multiple of ${d}?`, choices: cho(ans, ...bad.slice(0, 5)), answer: ans,
      hints: ["A multiple of a number is in its times table.", `Check each choice: does ${d} divide it evenly?`, "Example: is 42 a multiple of 6? 6 × 7 = 42, so yes. Now try yours."] };
  };
  const primeQ = () => {
    const pr = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59], co = []; for (let i = 12; i < 60; i++) if (!isPrime(i)) co.push(i);
    const t = ri(0, 2), h = ["A prime number has exactly two factors: 1 and itself.", "Try dividing by 2, 3, 5 and 7. If any of them goes in evenly, the number is composite.", "Example: 51 ÷ 3 = 17, so 51 is composite. 47 is not divisible by 2, 3, 5 or 7, so it is prime. Now do yours."];
    if (t === 0) { const n = Math.random() < 0.5 ? pick(pr) : pick(co); return { text: `Is ${n} prime or composite?`, choices: ["prime", "composite"], answer: isPrime(n) ? "prime" : "composite", hints: h }; }
    if (t === 1) { const a = pick(pr); return { text: "Which of these numbers is prime?", choices: cho(a, ...shuf(co).slice(0, 3)), answer: a, hints: h }; }
    const a = pick(co); return { text: "Which of these numbers is composite?", choices: cho(a, ...shuf(pr).slice(0, 3)), answer: a, hints: h };
  };
  const equivQ = () => {
    const b = pick([2, 3, 4, 5, 6, 8]), a = ri(1, b - 1), m = ri(2, 6), t = ri(0, 2);
    if (t === 0) return { text: `${a}/${b} = ?/${b * m}`, answer: a * m, hints: ["Equivalent fractions name the same amount. Whatever you do to the bottom, do to the top.", `The bottom number went from ${b} to ${b * m}. What was it multiplied by?`, "Example: 2/3 = ?/12. 3 × 4 = 12, so the top is 2 × 4 = 8. Now do yours."] };
    if (t === 1) return { text: `${a}/${b} = ${a * m}/?`, answer: b * m, hints: ["Whatever you do to the top, do to the bottom.", `The top went from ${a} to ${a * m}. What was it multiplied by?`, "Example: 3/4 = 9/?. 3 × 3 = 9, so the bottom is 4 × 3 = 12. Now do yours."] };
    return { text: `${a * m}/${b * m} = ${a}/?`, answer: b, hints: ["Divide the top and the bottom by the same number to get a simpler fraction.", `What number divides both ${a * m} and ${b * m}? It is the number the fraction was multiplied by.`, "Example: 8/12 = 2/?. 8 ÷ 4 = 2, so the bottom is 12 ÷ 4 = 3. Now do yours."] };
  };
  const simplify = () => {
    const b = pick([3, 4, 5, 7, 8, 9, 10]), a = ri(1, b - 1); if (gcd(a, b) !== 1) return simplify();
    const m = pick([4, 6, 8, 9, 10]), p = m % 2 === 0 ? 2 : 3, ans = `${a}/${b}`, part = `${a * m / p}/${b * m / p}`;
    return { text: `Write ${a * m}/${b * m} in simplest form.`, choices: cho(ans, part, `${a}/${b * m}`, `${a * m}/${b}`, `${a + 1}/${b}`), answer: ans,
      hints: ["Simplest form means the top and bottom have no common factor left except 1.", `Find the biggest number that divides both ${a * m} and ${b * m}, then divide both by it.`, "Example: 6/9. Both divide by 3, which gives 2/3. Nothing else divides 2 and 3, so 2/3 is simplest. Now do yours."] };
  };
  const cmpFr = () => {
    const bs = [2, 3, 4, 5, 6, 8, 10, 12], b = pick(bs), d = pick(bs); if (b === d) return cmpFr();
    const a = ri(1, b - 1), c = ri(1, d - 1); if (a * d === c * b) return cmpFr();
    const big = Math.random() < 0.5, aBig = a * d > c * b, ans = big === aBig ? `${a}/${b}` : `${c}/${d}`;
    return { text: `Which fraction is ${big ? "bigger" : "smaller"}?`, choices: [`${a}/${b}`, `${c}/${d}`], answer: ans,
      hints: ["The bottom numbers are different, so you cannot compare the tops yet.", `Rewrite both fractions with the same bottom number. Multiplying ${b} × ${d} always works.`, "Example: 1/2 and 3/8. 1/2 = 4/8, and 4/8 is more than 3/8, so 1/2 is bigger. Now do yours."] };
  };
  const mixedQ = () => {
    const d = pick([2, 3, 4, 5, 6, 8]), n = ri(1, d - 1), w = ri(1, 5), imp = w * d + n;
    if (Math.random() < 0.5) return { text: `Write ${w} ${n}/${d} as an improper fraction.`, choices: cho(`${imp}/${d}`, `${w * n + d}/${d}`, `${w + n}/${d}`, `${imp}/${w * d}`, `${imp + d}/${d}`), answer: `${imp}/${d}`,
      hints: ["Change the whole number into fractions with the same bottom number, then add the extra part.", `Each whole is ${d}/${d}. Multiply the whole number by ${d}, then add the top of the fraction part.`, "Example: 2 1/3. 2 × 3 = 6, plus 1 is 7. So 7/3. Now do yours."] };
    return { text: `Write ${imp}/${d} as a mixed number.`, choices: cho(`${w} ${n}/${d}`, `${n} ${w}/${d}`, `${w + 1} ${n}/${d}`, `${w} ${d - n}/${d}`, `${w + 2} ${n}/${d}`), answer: `${w} ${n}/${d}`,
      hints: ["Find how many whole ones fit in the fraction. Divide the top by the bottom.", `Divide ${imp} by ${d}. The quotient is the whole number and the remainder is the new top.`, "Example: 11/4. 11 ÷ 4 = 2 remainder 3, so 2 3/4. Now do yours."] };
  };
  const addSubFr = () => {
    const n = pick([5, 6, 7, 8, 9, 10, 12]), plus = Math.random() < 0.5;
    let a, b; if (plus) { a = ri(1, n - 2); b = ri(1, n - 1 - a); } else { a = ri(2, n - 1); b = ri(1, a - 1); }
    const r = plus ? a + b : a - b, ans = `${r}/${n}`;
    return { text: `${a}/${n} ${plus ? "+" : "−"} ${b}/${n} = ?`, choices: cho(ans, `${r}/${n * 2}`, `${plus ? a - b : a + b}/${n}`, `${r + 1}/${n}`, `${r}/${n + n - 1}`), answer: ans,
      hints: ["The bottom numbers match, so the pieces are the same size.", `Only the tops change: ${plus ? "add" : "subtract"} them. The bottom number stays ${n}.`, "Example: 5/9 − 2/9. 5 − 2 = 3, and the bottom stays 9. The answer is 3/9. Now do yours."] };
  };
  const hundredths = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const k = pick([3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 16, 23, 27, 35, 38, 41, 56, 63, 74, 82, 97]), ans = dec(k / 100, 2), rev = Number(String(k).split("").reverse().join(""));
      return { text: `Which decimal equals ${k}/100?`, choices: cho(ans, dec(k / 10, 1), dec(k / 1000, 3), dec(rev / 100, 2), dec(k, 1)), answer: ans,
        hints: ["Hundredths are the second place after the decimal point.", "Write the top number so that it ends in the hundredths place. Fill empty places with zeros.", "Example: 9/100 is 0.09 (0 tenths, 9 hundredths). 45/100 is 0.45. Now do yours."] };
    }
    if (t === 1) { const k = ri(11, 99); if (k % 10 === 0) return hundredths(); return { text: `0.${k} = ?/100`, answer: k, hints: ["Look at the digits after the decimal point. They tell you the hundredths.", "Two digits after the point means hundredths. Read them as one number.", "Example: 0.61 = 61/100. Now do yours."] }; }
    const k = ri(1, 9); return { text: `Which fraction is 0.0${k}?`, choices: cho(`${k}/100`, `${k}/10`, `${k * 10}/100`, `${k}/1000`, `1/${k}`), answer: `${k}/100`, hints: ["Count the places after the decimal point. Zero then a digit means hundredths.", "The first place is tenths and the second is hundredths. Which place is the digit in?", "Example: 0.03 has 3 in the hundredths place, so it is 3/100. Now do yours."] };
  };
  const addDec = () => {
    const a = ri(110, 899), b = ri(110, 599), plus = Math.random() < 0.6, x = Math.max(a, b) + 1, y = Math.min(a, b), v = plus ? a + b : x - y, r = v / 100, ans = dec(r, 2);
    return { text: plus ? `${dec(a / 100, 2)} + ${dec(b / 100, 2)} = ?` : `${dec(x / 100, 2)} − ${dec(y / 100, 2)} = ?`, choices: cho(ans, dec(r + 0.1, 2), dec(r - 0.1, 2), dec(r + 1, 2), dec(r * 10, 2)), answer: ans,
      hints: ["Line up the decimal points so tenths sit under tenths and hundredths under hundredths.", `${plus ? "Add" : "Subtract"} like whole numbers, starting at the right. Put the decimal point straight down.`, "Example: 1.25 + 0.30 = 1.55. Add hundredths 5 + 0, tenths 2 + 3, ones 1 + 0. Now do yours."] };
  };
  const angleQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const deg = pick([ri(10, 85), 90, ri(95, 175), 180]), ans = deg < 90 ? "acute" : deg === 90 ? "right" : deg < 180 ? "obtuse" : "straight";
      return { text: `What kind of angle measures ${deg}°?`, choices: ["acute", "right", "obtuse", "straight"], answer: ans, hints: ["Compare the angle with a right angle, which is 90°.", "Less than 90° is acute, exactly 90° is right, between 90° and 180° is obtuse, and 180° is straight.", "Example: 45° is less than 90°, so it is acute. 130° is between 90° and 180°, so it is obtuse. Now do yours."] };
    }
    if (t === 1) {
      const it = pick([[3, "right"], [9, "right"], [6, "straight"], [1, "acute"], [2, "acute"], [4, "obtuse"], [5, "obtuse"], [11, "acute"], [8, "obtuse"]]);
      return { text: `At ${it[0]} o'clock, the hands of a clock make what kind of angle?`, visual: "🕒", choices: ["acute", "right", "obtuse", "straight"], answer: it[1], hints: ["Each hour on a clock is 30° of turning from 12.", "Count the hours from the hour hand to 12. Multiply by 30 to get the degrees, then name the angle.", "Example: at 10 o'clock the hands are 60° apart (2 hours), which is smaller than a right angle. Now do yours."] };
    }
    const kind = pick([["smaller than a right angle", "acute"], ["bigger than a right angle but smaller than a straight line", "obtuse"], ["a perfect square corner", "right"], ["a straight line", "straight"]]);
    return { text: `An angle that is ${kind[0]} is called...`, choices: ["acute", "right", "obtuse", "straight"], answer: kind[1], hints: ["Think about the corner of a page: that is a right angle.", "Acute means small and sharp. Obtuse means wide and open.", "Example: an angle of 100° is wider than a right angle, so it is obtuse. Now do yours."] };
  };
  const SYM = [["a square", 4], ["a rectangle (not a square)", 2], ["an equilateral triangle", 3], ["a regular hexagon", 6], ["a regular pentagon", 5], ["an isosceles triangle", 1], ["the letter H", 2], ["the letter A", 1], ["a heart ❤️", 1], ["a butterfly 🦋", 1], ["a parallelogram (not a rectangle)", 0]];
  const symQ = () => {
    const it = pick(SYM);
    return { text: `How many lines of symmetry does ${it[0]} have?`, choices: cho(it[1], 0, 1, 2, 3, 4, 5, 6), answer: it[1],
      hints: ["A line of symmetry folds a shape so that both halves match exactly.", "Imagine folding the shape in different ways: down the middle, across, and corner to corner. Count the folds that match.", "Example: a plain kite shape folds exactly one way, along its long middle line, so it has 1 line of symmetry. Now think about yours."] };
  };
  const UC = [["meters", "centimeters", 100], ["kilometers", "meters", 1000], ["kilograms", "grams", 1000], ["liters", "milliliters", 1000], ["hours", "minutes", 60], ["minutes", "seconds", 60], ["yards", "feet", 3], ["feet", "inches", 12]];
  const convQ = () => {
    const u = pick(UC), n = ri(2, 12), down = Math.random() < 0.6;
    return down ? { text: `${n} ${u[0]} = ? ${u[1]}`, answer: n * u[2], hints: [`${u[1]} are smaller units than ${u[0]}, so you will need more of them.`, `Multiply by the number of ${u[1]} in one ${u[0].replace(/s$/, "")}.`, "Example: 4 kilograms to grams. 1 kilogram is 1000 grams, so 4 × 1000 = 4000. Now do yours."] }
      : { text: `${n * u[2]} ${u[1]} = ? ${u[0]}`, answer: n, hints: [`${u[0]} are bigger units than ${u[1]}, so you will need fewer of them.`, `Divide by the number of ${u[1]} in one ${u[0].replace(/s$/, "")}.`, "Example: 3000 grams to kilograms. 3000 ÷ 1000 = 3. Now do yours."] };
  };
  const dataQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      let v, m, i = 0; do { m = ri(4, 12); v = [ri(2, 15), ri(2, 15), ri(2, 15)]; } while ((4 * m - v[0] - v[1] - v[2] < 1 || 4 * m - v[0] - v[1] - v[2] > 18) && ++i < 500); v.push(4 * m - v[0] - v[1] - v[2]);
      return { text: `What is the mean (average) of ${shuf(v).join(", ")}?`, answer: m, hints: ["The mean is the total shared out equally.", "Add all the numbers, then divide by how many numbers there are (4).", "Example: 4, 6, 8, 10 add up to 28 and 28 ÷ 4 = 7. Now do yours."] };
    }
    if (t === 1) {
      const mo = ri(2, 15), o = shuf([...Array(20).keys()].map(x => x + 1).filter(x => x !== mo)).slice(0, 3), d = shuf([mo, mo, mo, ...o]);
      return { text: `What is the mode of ${d.join(", ")}?`, answer: mo, hints: ["The mode is the number that shows up most often.", "Count how many times each number appears. Which one is there the most?", "Example: 2, 5, 5, 9, 5, 1. The 5 appears 3 times, so the mode is 5. Now do yours."] };
    }
    const lo = ri(1, 20), hi = lo + ri(8, 40), mid = [lo + ri(1, 7), lo + ri(1, 7), lo + ri(1, 7)];
    return { text: `What is the range of ${shuf([lo, hi, ...mid]).join(", ")}?`, answer: hi - lo, hints: ["The range tells how spread out the numbers are.", "Find the biggest and the smallest number, then subtract.", "Example: 3, 12, 7, 9: biggest 12, smallest 3, range 12 − 3 = 9. Now do yours."] };
  };

  const l8 = [
    L("Estimate by rounding", estimate, [S("Round first", "487 → 500", "Round each number to the place the question asks for. Look at the next digit: 5 or more goes up."), S("Then calculate", "500 + 300", "Add or subtract the rounded numbers. They are easy to work with."), S("Estimate vs exact", "≈", "An estimate is close to the real answer. It helps you check if your answer is sensible.")]),
    L("Multiply 2-digit by 2-digit", mult22, [S("Area model", "14 × 12", "Split 12 into 10 and 2."), S("Two products", "14 × 10 = 140 &nbsp; 14 × 2 = 28", "Multiply 14 by each part."), S("Add", "140 + 28 = 168", "So 14 × 12 = <b>168</b>.")]),
    L("Divide by 10 and 100", div10, [S("Shift right", "4500 ÷ 10", "Dividing by 10 shifts every digit one place to the right: 450."), S("By 100", "4500 ÷ 100", "Dividing by 100 shifts two places: 45."), S("Zeros", "00 off", "For numbers ending in zeros, just take off that many zeros.")]),
    L("Long division with remainders", longDiv, [S("Divide, multiply, subtract", "157 ÷ 4", "4 into 15 is 3. 3 × 4 = 12. 15 − 12 = 3."), S("Bring down", "37", "Bring down the 7 to make 37. 4 into 37 is 9."), S("Remainder", "39 R 1", "37 − 36 = 1 is left. The answer is 39 remainder 1.")]),
    L("Factors", factorQ, [S("Factor pairs", "2 × 6 = 12", "Factors are numbers that multiply to make a number. 12 = 1×12, 2×6 and 3×4."), S("List them", "1, 2, 3, 4, 6, 12", "Every factor divides the number evenly."), S("Always", "1 and itself", "1 and the number itself are always factors.")]),
    L("Multiples and common multiples", multQ, [S("Multiples", "4, 8, 12, 16", "Multiples are numbers in a times table."), S("Common", "4: 4 8 12 &nbsp; 6: 6 12", "Multiples that appear in both lists are common multiples."), S("Least", "12", "The smallest common multiple of 4 and 6 is <b>12</b>.")]),
    L("Prime and composite numbers", primeQ, [S("Prime", "2 3 5 7 11", "A prime number has exactly two factors: 1 and itself."), S("Composite", "12 = 3 × 4", "A composite number has more than two factors."), S("Test it", "÷ 2, 3, 5, 7", "To test a number under 100, try dividing by 2, 3, 5 and 7.")]),
    L("Equivalent fractions", equivQ, [S("Same amount", "1/2 = 2/4", "Different fractions can name the same amount."), S("Multiply both", "2/3 = 8/12", "Multiply the top and the bottom by the same number: ×4."), S("Divide both", "8/12 = 2/3", "You can also divide the top and bottom by the same number.")]),
    L("Simplify fractions", simplify, [S("Simplest form", "6/8", "A fraction is in simplest form when you cannot divide the top and bottom by the same number any more."), S("Divide by a common factor", "6÷2 / 8÷2", "6 and 8 both divide by 2: 3/4."), S("Check", "3 and 4", "3 and 4 have no common factor, so 3/4 is simplest.")]),
    L("Compare unlike fractions", cmpFr, [S("Different bottoms", "3/4 vs 2/3", "First make the bottoms the same."), S("Common bottom", "9/12 vs 8/12", "3/4 = 9/12 and 2/3 = 8/12."), S("Compare tops", "9 &gt; 8", "9/12 is more than 8/12, so 3/4 is bigger.")]),
    L("Mixed numbers", mixedQ, [S("Whole and part", "2 3/4", "A mixed number has a whole number and a fraction."), S("To improper", "2×4 + 3 = 11", "Multiply the whole by the bottom, add the top: 11/4."), S("Back again", "11 ÷ 4 = 2 R 3", "Divide the top by the bottom: 2 wholes and 3 left, so 2 3/4.")]),
    L("Add and subtract like fractions", addSubFr, [S("Same size pieces", "3/8 + 2/8", "When the bottoms match, the pieces are the same size."), S("Change the tops", "3 + 2 = 5", "Add or subtract only the tops."), S("Keep the bottom", "5/8", "The bottom number stays the same.")]),
    L("Hundredths", hundredths, [S("Two places", "0.37", "The first digit after the point is tenths, the second is hundredths."), S("As a fraction", "0.37 = 37/100", "Read the digits as one number over 100."), S("Zero holder", "7/100 = 0.07", "Single digits need a zero in the tenths place.")]),
    L("Add and subtract decimals", addDec, [S("Line up", "1.25<br>+0.30", "Line up the decimal points."), S("Start right", "5 + 0, 2 + 3, 1 + 0", "Add from the right, carry when you reach 10."), S("Point down", "1.55", "Bring the decimal point straight down into the answer.")]),
    L("Types of angles", angleQ, [S("Right", "∟ 90°", "A right angle is 90°, like a corner of a page."), S("Acute and obtuse", "&lt; 90° / &gt; 90°", "<b>Acute</b> is smaller than 90°. <b>Obtuse</b> is between 90° and 180°."), S("Straight", "180°", "A straight angle is a straight line, 180°.")]),
    L("Lines of symmetry", symQ, [S("Fold it", "🦋", "A line of symmetry splits a shape into two mirror halves."), S("Count folds", "square: 4", "A square can fold 4 ways: two across, two corner to corner."), S("Some have none", "parallelogram: 0", "A slanted parallelogram has no fold that matches.")]),
    L("Convert units", convQ, [S("Big to small", "1 m = 100 cm", "Going to a smaller unit? Multiply."), S("Small to big", "300 cm = 3 m", "Going to a bigger unit? Divide."), S("Know your facts", "1 km = 1000 m", "1 kg = 1000 g, 1 L = 1000 mL, 1 h = 60 min, 1 min = 60 s.")]),
    L("Mean, mode and range", dataQ, [S("Mean", "4, 6, 8, 10 → 7", "Add them up and divide by how many numbers there are."), S("Mode", "2, 5, 5, 9 → 5", "The number that appears most often."), S("Range", "12 − 3 = 9", "Biggest minus smallest.")])
  ];
  l8.push(mixOf("Mixed practice", [l8[0], l8[3], l8[7], l8[9], l8[11], l8[14], l8[16]]));
  l8.push(mixOf("Level 8 Challenge", [l8[1], l8[2], l8[4], l8[5], l8[6], l8[8], l8[10], l8[12], l8[13], l8[15], l8[17]]));

  // ================= LEVEL 9 =================
  const place6 = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const ds = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6), p = ri(0, 5), n = +ds.join(""), d = ds[p], v = d * Math.pow(10, 5 - p);
      return { text: `What is the value of the digit <b>${d}</b> in ${n}?`, choices: cho(v, d, d * 10, d * 100, d * 1000, d * 10000, d * 100000), answer: v,
        hints: ["Each place is 10 times the place to its right: ones, tens, hundreds, thousands, ten thousands, hundred thousands.", `Find the ${d} and count its place from the right. Then multiply the digit by that place value.`, "Example: in 843,172 the 4 is in the ten thousands place, so it is worth 40,000. Now find yours."] };
    }
    if (t === 1) {
      const n = ri(11, 999) * 100 + ri(0, 9) * 10, ans = n * 10;
      return { text: `What is 10 times as much as ${n}?`, answer: ans,
        hints: ["Multiplying by 10 moves every digit one place to the left.", "A 0 fills the empty ones place at the end.", "Example: 10 times 3,450 is 34,500. Now do yours."] };
    }
    const n = ri(10001, 999999), s = String(n), sw = (q, i) => q.slice(0, i) + q[i + 1] + q[i] + q.slice(i + 2);
    return { text: `Which number is "${words(n)}"?`, choices: cho(n, +sw(s, 0), +sw(s, s.length - 2), n + 1000, n - 10, n * 10, n + 100), answer: n,
      hints: ["Read the number in chunks: the part before the word thousand, then the rest.", "Write the thousands part first, then the last three digits. Put a 0 in any empty place.", "Example: \"forty-two thousand, three hundred five\" is 42,305 (a 0 in the tens place). Now do yours."] };
  };
  const roundBig = () => {
    const u = pick([1000, 10000, 100000]), n = ri(12000, 987654); if (n % u === u / 2) return roundBig();
    const ans = Math.round(n / u) * u;
    return { text: `Round ${n} to the nearest ${u}.`, answer: ans,
      hints: [`Find the ${u === 1000 ? "thousands" : u === 10000 ? "ten thousands" : "hundred thousands"} place, then look at the digit just to its right.`, "If that digit is 5 or more, round up. If it is 4 or less, keep the digit and round down. Every place after becomes 0.", "Example: 38,472 to the nearest thousand. The hundreds digit is 4, so keep 38 thousand: 38,000. Now do yours."] };
  };
  const addSubBig = () => {
    const a = ri(12000, 899999), b = ri(12000, 899999), plus = Math.random() < 0.5, x = Math.max(a, b) + 1234, y = Math.min(a, b), ans = plus ? a + b : x - y;
    return { text: plus ? `${a} + ${b} = ?` : `${x} − ${y} = ?`, answer: ans, wrong: wrongAdj(ans),
      hints: ["Line up the places and work from the right, one column at a time.", plus ? "Carry a 1 to the next column whenever a column adds up to 10 or more." : "Borrow from the next column whenever the top digit is smaller than the bottom digit.",
        "Example: 45,230 + 28,975. Add column by column from the right, carrying 1 when a column reaches 10. The total is 74,205. Now do yours."] };
  };
  const mult41 = () => {
    const a = ri(1100, 4999), b = ri(2, 9), ps = parts(a);
    return { text: `${a} × ${b} = ?`, answer: a * b, wrong: wrongAdj(a * b),
      hints: ["Multiply each place by the single digit, starting from the ones. Carry as you go.", `Or split ${a} into ${ps.join(", ")}. Multiply each by ${b}, then add.`, "Example: 1,230 × 3: 1000 × 3 = 3000, 200 × 3 = 600, 30 × 3 = 90. Total 3,690. Now do yours."] };
  };
  const mult22b = () => {
    const a = ri(21, 89), b = ri(21, 59), t = Math.floor(b / 10) * 10, o = b - t; if (o === 0) return mult22b();
    return { text: `${a} × ${b} = ?`, answer: a * b, wrong: wrongAdj(a * b),
      hints: ["Use partial products: multiply by the tens of the second number, then by the ones.", `${a} × ${t}, then ${a} × ${o}. Add the two partial products.`, "Example: 34 × 25. 34 × 20 = 680 and 34 × 5 = 170. 680 + 170 = 850. Now do yours."] };
  };
  const div41 = () => {
    const d = ri(3, 9), q = ri(150, Math.floor(9999 / d)), n = q * d;
    return { text: `${n} ÷ ${d} = ?`, answer: q, wrong: wrongAdj(q),
      hints: ["Use long division, one digit at a time, from the left.", `If ${d} is bigger than the first digit, use the first two digits. After each step: multiply, subtract, bring down.`, "Example: 1,848 ÷ 4. 18 ÷ 4 = 4 R 2; bring down 4 → 24 ÷ 4 = 6; bring down 8 → 8 ÷ 4 = 2. So 462. Now do yours."] };
  };
  const timesAs = () => {
    const nm = pick(NM), nm2 = pick(NM.filter(x => x !== nm)), k = ri(2, 9), a = ri(3, 12), t = ri(0, 2);
    if (t === 0) return { text: `${nm} has ${a} stickers. ${nm2} has ${k} times as many. How many stickers does ${nm2} have?`, answer: a * k, hints: ["\"k times as many\" means multiply.", `Multiply ${nm}'s stickers by ${k}.`, "Example: 5 stickers and 3 times as many is 5 × 3 = 15. Now do yours."] };
    if (t === 1) return { text: `${nm2} has ${a * k} marbles. That is ${k} times as many as ${nm} has. How many marbles does ${nm} have?`, answer: a, hints: ["The bigger number is the smaller number times the \"times as many\" number.", "Undo the multiplying: divide.", "Example: 18 is 3 times as many as ?. 18 ÷ 3 = 6. Now do yours."] };
    return { text: `A red ribbon is ${a} cm long. A blue ribbon is ${k} times as long. How many cm longer is the blue ribbon than the red?`, answer: a * k - a, hints: ["First find the blue ribbon's length.", "Then subtract the red length to see how much longer.", "Example: red 4 cm, blue 3 times as long is 12 cm; 12 − 4 = 8 cm longer. Now do yours."] };
  };
  const divRules = () => {
    const d = pick([2, 3, 5, 9, 10]), yes = Math.random() < 0.5, base = ri(12, 110) * d, n = yes ? base : base + ri(1, d - 1);
    const ok = n % d === 0, rule = { 2: "last digit being even", 3: "digit sum being in the 3 times table", 5: "last digit being 0 or 5", 9: "digit sum being in the 9 times table", 10: "last digit being 0" }[d];
    const ds = String(n).split("").reduce((s, c) => s + +c, 0);
    return { text: `Is ${n} divisible by ${d}?`, choices: ["yes", "no"], answer: ok ? "yes" : "no",
      hints: [`There is a quick rule for ${d}: it uses the ${rule}.`, d === 3 || d === 9 ? `Add up all the digits of ${n}: you get ${ds}. Is that number in the ${d} times table?` : `Look at the last digit of ${n}. Does it match the rule?`,
        "Example: is 4,725 divisible by 9? Digits add to 18, which is in the 9 times table, so yes. Now do yours."] };
  };
  const fracTimes = () => {
    const d = pick([3, 4, 5, 6, 8, 10]), a = ri(1, d - 1), k = ri(2, 9);
    return { text: `${k} × ${a}/${d} = ?/${d}`, answer: k * a, hints: [`${a}/${d} means ${a} pieces of size 1/${d}. ${k} groups of that is more pieces.`, `Multiply ${k} by ${a} to count the pieces. The size of each piece, 1/${d}, stays the same.`, "Example: 4 × 3/5 = ?/5. 4 × 3 = 12, so it is 12/5. Now do yours."] };
  };
  const addUnlike = () => {
    const pairs = [[2, 4], [2, 6], [3, 6], [4, 8], [5, 10], [2, 8], [3, 9], [4, 12], [3, 12], [6, 12]];
    const [d1, D] = pick(pairs), f = D / d1, a = ri(1, d1 - 1), b = ri(1, 6); if (a * f + b >= D) return addUnlike();
    const s = a * f + b, ans = `${s}/${D}`;
    return { text: `${a}/${d1} + ${b}/${D} = ?<br>(Answer with ${D} as the bottom number.)`, choices: cho(ans, `${a + b}/${d1 + D}`, `${a + b}/${D}`, `${a + b}/${d1}`, `${s + 1}/${D}`), answer: ans,
      hints: ["You can only add fractions when the pieces are the same size, so the bottom numbers must match.", `Change ${a}/${d1} into a fraction with ${D} as its bottom number (multiply top and bottom by ${f}), then add the tops.`, "Example: 1/2 + 1/4. 1/2 = 2/4. Then 2/4 + 1/4 = 3/4. Now do yours."] };
  };
  const tenthsHund = () => {
    const a = ri(1, 9), b = ri(1, 9), t = ri(0, 1);
    if (t === 0) {
      const ans = `0.${a}${b}`;
      return { text: `Which decimal is ${a}/10 + ${b}/100?`, choices: cho(ans, `0.${b}${a}`, `0.0${a + b > 9 ? 9 : a + b}`, `${a}.${b}`, `0.${a + b > 9 ? 9 : a + b}`), answer: ans, hints: ["Tenths go in the first place after the decimal point and hundredths in the second.", "Write the tenths digit first, then the hundredths digit.", "Example: 2/10 + 7/100 = 0.27. Now do yours."] };
    }
    return { text: `0.${a} = ?/100`, answer: a * 10, hints: ["Tenths can be changed to hundredths: 1 tenth is 10 hundredths.", "Multiply the tenths digit by 10 to get hundredths.", "Example: 0.4 = 40/100. Now do yours."] };
  };
  const cmpDec = () => {
    const w = ri(0, 3), x = ri(1, 9), y = ri(1, 9), z = ri(1, 9), A = `${w}.${x}`, B = `${w}.${y}${z}`; if (Number(A) === Number(B)) return cmpDec();
    const big = Math.random() < 0.5, ans = (Number(A) > Number(B)) === big ? A : B;
    return { text: `Which is ${big ? "greater" : "smaller"}: ${A} or ${B}?`, choices: shuf([A, B]), answer: ans,
      hints: ["Compare the digits from the left, place by place. More digits does not mean a bigger number.", "Compare the wholes first, then the tenths. Only look at the hundredths if the tenths match.", "Example: 0.4 or 0.38? Tenths: 4 is more than 3, so 0.4 is greater. Now do yours."] };
  };
  const angleFacts = () => {
    const t = ri(0, 3), a = ri(10, 80);
    if (t === 0) return { text: `Two angles make a right angle (90°). One is ${a}°. How big is the other angle in degrees?`, answer: 90 - a, hints: ["A right angle is 90°.", "The two angles add up to 90°. Subtract the one you know.", "Example: 90° with one angle 30° leaves 90 − 30 = 60°. Now do yours."] };
    if (t === 1) { const b = ri(100, 170); return { text: `Two angles make a straight line (180°). One is ${b}°. How big is the other angle in degrees?`, answer: 180 - b, hints: ["A straight line is 180°.", "The two angles add up to 180°. Subtract the one you know.", "Example: 180° with one angle 120° leaves 60°. Now do yours."] }; }
    if (t === 2) { const b = ri(40, 90), c = ri(30, 80); return { text: `A triangle has angles ${b}° and ${c}°. What is the third angle in degrees?`, answer: 180 - b - c, hints: ["The three angles of any triangle add up to 180°.", "Add the two angles you know, then subtract from 180.", "Example: angles 50° and 60°. 50 + 60 = 110. 180 − 110 = 70°. Now do yours."] }; }
    const b = ri(60, 140), c = ri(60, 140); return { text: `Angles around a point make a full turn (360°). Two angles are ${b}° and ${c}°. What is the third in degrees?`, answer: 360 - b - c, hints: ["A full turn is 360°.", "Add the two angles you know, then subtract the total from 360.", "Example: 100° and 120° leave 360 − 220 = 140°. Now do yours."] };
  };
  const areaPer = () => {
    const l = ri(5, 20), w = ri(3, 12), t = ri(0, 2);
    if (t === 0) return { text: `A rectangle has an area of ${l * w} square cm and a width of ${w} cm. What is its length in cm?`, answer: l, hints: ["Area = length × width.", "Undo the multiplying: divide the area by the width.", "Example: area 48, width 6: 48 ÷ 6 = 8. Now do yours."] };
    if (t === 1) return { text: `A rectangle has a perimeter of ${2 * (l + w)} cm and a length of ${l} cm. What is its width in cm?`, answer: w, hints: ["Perimeter = 2 × (length + width).", "Halve the perimeter to get length + width, then subtract the length.", "Example: perimeter 30, length 9: half is 15, and 15 − 9 = 6. Now do yours."] };
    return { text: `A square has a perimeter of ${4 * l} cm. What is its area in square cm?`, answer: l * l, hints: ["A square has 4 equal sides.", "Divide the perimeter by 4 to get one side. Then multiply the side by itself.", "Example: perimeter 20: side 5, area 25. Now do yours."] };
  };
  const metricFix = () => {
    const a = ri(2, 9), b = ri(1, 9) * 50, t = ri(0, 3), c = ri(11, 99);
    if (t === 0) return { text: `${a} km ${b} m = ? m`, answer: a * 1000 + b, hints: ["1 km is 1000 m.", "Change the kilometers to meters, then add the meters.", "Example: 3 km 200 m = 3000 + 200 = 3200 m. Now do yours."] };
    if (t === 1) return { text: `${a} L ${b} mL = ? mL`, answer: a * 1000 + b, hints: ["1 L is 1000 mL.", "Change the liters to milliliters, then add the rest.", "Example: 2 L 500 mL = 2000 + 500 = 2500 mL. Now do yours."] };
    if (t === 2) return { text: `${c} cm = ? mm`, answer: c * 10, hints: ["A millimeter is much smaller than a centimeter, so you need more of them.", "1 cm is 10 mm. Multiply.", "Example: 7 cm = 7 × 10 = 70 mm. Now do yours."] };
    return { text: `${a} kg ${b} g = ? g`, answer: a * 1000 + b, hints: ["1 kg is 1000 g.", "Change the kilograms to grams, then add the grams.", "Example: 4 kg 300 g = 4000 + 300 = 4300 g. Now do yours."] };
  };
  const elapsed = () => {
    const h = ri(1, 9), mm = pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]), d = ri(35, 175), tot = h * 60 + mm + d, eh = Math.floor(tot / 60), em = tot % 60;
    return { text: `A movie starts at ${clock(h, mm)} and ends at ${clock(eh, em)}. How many minutes long is it?`, visual: "🎬", answer: d,
      hints: ["Find the hours first, then the extra minutes.", `Count from ${clock(h, mm)} up to the next full hour, then add the whole hours, then the minutes after.`, "Example: 2:20 to 4:05. 2:20 to 3:00 is 40 min, 3:00 to 4:00 is 60 min, 4:00 to 4:05 is 5 min. 40 + 60 + 5 = 105. Now do yours."] };
  };
  const estProd = () => {
    if (Math.random() < 0.5) {
      let a = ri(21, 89), b = ri(21, 89); if (a % 10 === 5) a++; if (b % 10 === 5) b++;
      return { text: `Estimate ${a} × ${b} by rounding each number to the nearest ten.`, answer: Math.round(a / 10) * 10 * Math.round(b / 10) * 10, hints: ["Round each number to the nearest ten first. Look at the ones digit.", "Multiply the two rounded numbers. Use the basic fact and add the zeros.", "Example: 38 × 52 is about 40 × 50 = 2000. Now do yours."] };
    }
    let a = ri(120, 890), b = ri(3, 9); if (a % 100 >= 45 && a % 100 <= 55) a += 20;
    return { text: `Estimate ${a} × ${b} by rounding ${a} to the nearest hundred.`, answer: Math.round(a / 100) * 100 * b, hints: ["Round the big number to the nearest hundred first. Look at the tens digit.", "Then multiply the rounded number by the single digit.", "Example: 298 × 4 is about 300 × 4 = 1200. Now do yours."] };
  };
  const patt9 = () => {
    const t = ri(0, 2);
    if (t === 0) { const m = ri(2, 6), p = ri(1, 9), x = ri(2, 12); return { text: `Rule: multiply by ${m}, then add ${p}.<br>Input ${x}. What is the output?`, answer: x * m + p, hints: ["Follow the rule one step at a time, in order.", `First multiply the input by ${m}. Then add ${p} to that.`, "Example: rule \"× 3, then + 2\" with input 4: 4 × 3 = 12, 12 + 2 = 14. Now do yours."] }; }
    if (t === 1) { const s = ri(2, 20), d = ri(2, 9), n = ri(6, 9); return { text: `A pattern starts at ${s} and adds ${d} each time. What is the ${n}th number? (The 1st is ${s}.)`, answer: s + (n - 1) * d, hints: ["To get the 2nd number you add once, to get the 3rd you add twice, and so on.", `For the ${n}th number, add ${d} exactly ${n - 1} times.`, "Example: starts at 5, adds 3. The 4th number is 5 + 3 × 3 = 14. Now do yours."] }; }
    const m = ri(2, 9), ins = shuf([1, 2, 3, 4, 5, 6]).slice(0, 3), isMul = Math.random() < 0.5, add = ri(2, 9);
    const outs = ins.map(i => (isMul ? i * m : i + add)), ans = isMul ? `× ${m}` : `+ ${add}`;
    return { text: `Find the rule.<br>${ins.map((v, i) => `In ${v} → Out ${outs[i]}`).join("<br>")}`, choices: cho(ans, isMul ? `+ ${m}` : `× ${add}`, isMul ? `× ${m + 1}` : `+ ${add + 1}`, isMul ? `+ ${outs[0] - ins[0]}` : `× ${outs[0]}`), answer: ans,
      hints: ["Look at one pair. How can you get from the input to the output?", "Test your rule on the other pairs too. It must work for every row.", "Example: In 2 → Out 6, In 3 → Out 9. Multiplying by 3 works for both, so the rule is × 3. Now do yours."] };
  };

  const l9 = [
    L("Place value to 1,000,000", place6, [S("Six places", "321,456", "The places go: ones, tens, hundreds, thousands, ten thousands, hundred thousands."), S("10 times", "×10 →", "Each place is 10 times the place to its right."), S("Words", "forty-two thousand, three hundred five", "Say the thousands part, then the rest. 42,305.")]),
    L("Round large numbers", roundBig, [S("Pick the place", "38,472", "Find the place you are rounding to, like thousands."), S("Look right", "4 → down", "Look at the next digit. 5 or more rounds up; 4 or less stays."), S("Zeros", "38,000", "All the places after become zeros.")]),
    L("Add and subtract big numbers", addSubBig, [S("Line up", "45,230<br>+28,975", "Line up the places. Work from the right."), S("Carry or borrow", "10 → carry 1", "Carry when a column reaches 10. Borrow when the top digit is too small."), S("Estimate", "≈", "Round the numbers and check your answer is close.")]),
    L("Multiply 4-digit by 1-digit", mult41, [S("Place by place", "1,230 × 3", "Multiply each place by 3."), S("Partial products", "3000 + 600 + 90", "1000 × 3, 200 × 3, 30 × 3."), S("Add", "= 3,690", "Add the partial products.")]),
    L("Multiply 2-digit by 2-digit (big)", mult22b, [S("Two rows", "34 × 25", "Multiply 34 by the ones (5), then by the tens (20)."), S("Partial products", "170 and 680", "34 × 5 = 170. 34 × 20 = 680."), S("Add", "850", "170 + 680 = <b>850</b>.")]),
    L("Divide 4-digit by 1-digit", div41, [S("Left to right", "1848 ÷ 4", "Start with the first digits: 18 ÷ 4 = 4 R 2."), S("Bring down", "24 ÷ 4 = 6", "Bring down the next digit and keep dividing."), S("Check", "462 × 4", "Multiply back to check: 462 × 4 = 1848.")]),
    L("Times as many", timesAs, [S("Compare by multiplying", "3 times as many", "\"3 times as many\" means 3 groups the same size."), S("Find the big one", "5 × 3 = 15", "Multiply the small number by the times number."), S("Find the small one", "15 ÷ 3 = 5", "Divide to go the other way.")]),
    L("Divisibility rules", divRules, [S("By 2, 5, 10", "last digit", "2: last digit is even. 5: last digit is 0 or 5. 10: last digit is 0."), S("By 3 and 9", "digit sum", "Add the digits. If the sum is in the 3 (or 9) times table, so is the number."), S("Use it", "4,725", "4+7+2+5 = 18, which is in the 9 times table, so 4,725 is divisible by 9.")]),
    L("Whole number times a fraction", fracTimes, [S("Count pieces", "3/5 = 3 pieces", "3/5 is 3 pieces, each 1/5."), S("Groups", "4 × 3/5", "4 groups of 3 pieces is 12 pieces."), S("Still fifths", "12/5", "The piece size stays 1/5, so the answer is 12/5.")]),
    L("Add fractions with different bottoms", addUnlike, [S("Same size", "1/2 + 1/4", "Only add when the pieces are the same size."), S("Change one", "1/2 = 2/4", "Turn 1/2 into fourths."), S("Add tops", "2/4 + 1/4 = 3/4", "Now the bottoms match. Add the tops.")]),
    L("Tenths and hundredths", tenthsHund, [S("Two places", "0.27", "2 tenths and 7 hundredths."), S("As fractions", "2/10 + 7/100", "This is 20/100 + 7/100 = 27/100."), S("Tenths to hundredths", "0.4 = 40/100", "Multiply the tenths by 10 to get hundredths.")]),
    L("Compare decimals", cmpDec, [S("Whole first", "1.2 vs 0.9", "Compare the whole numbers first."), S("Tenths next", "0.4 vs 0.38", "If the wholes match, compare tenths: 4 &gt; 3."), S("Not by length", "0.4 &gt; 0.38", "A longer decimal is not always bigger.")]),
    L("Angle facts", angleFacts, [S("Totals", "90° 180° 360°", "Right angle 90°, straight line 180°, full turn 360°."), S("Triangle", "180°", "The 3 angles of a triangle add up to 180°."), S("Find the rest", "180 − 110", "Add the known angles and subtract from the total.")]),
    L("Area and perimeter puzzles", areaPer, [S("Formulas", "A = l × w", "Area = length × width. Perimeter = 2 × (length + width)."), S("Missing side", "48 ÷ 6", "Undo the multiplying with division."), S("Squares", "4 equal sides", "A square's perimeter is 4 times its side.")]),
    L("Metric conversions", metricFix, [S("Big to small", "1 km = 1000 m", "Multiply to change to a smaller unit."), S("Mixed units", "3 km 200 m", "Change the big part, then add the rest: 3200 m."), S("Facts", "1 kg = 1000 g", "1 L = 1000 mL too.")]),
    L("How long did it take?", elapsed, [S("Hours first", "2:20 → 3:00", "Count up to the next hour."), S("Whole hours", "3:00 → 4:00", "Then count whole hours."), S("Leftover minutes", "40 + 60 + 5", "Add all the pieces together.")]),
    L("Estimate products", estProd, [S("Round", "38 → 40", "Round each factor to make easy numbers."), S("Multiply", "40 × 50", "4 × 5 = 20, then add two zeros: 2000."), S("Close enough", "≈", "An estimate tells you the size of the answer.")]),
    L("Rules and patterns", patt9, [S("Rule machine", "In → Out", "Follow the rule in order, step by step."), S("Growing patterns", "5, 8, 11, 14", "The 4th number is the start plus 3 jumps."), S("Find the rule", "×3", "Test the rule on every pair.")])
  ];
  l9.push(mixOf("Mixed practice", [l9[0], l9[2], l9[4], l9[5], l9[8], l9[12], l9[15]]));
  l9.push(mixOf("Level 9 Challenge", [l9[1], l9[3], l9[6], l9[7], l9[9], l9[10], l9[11], l9[13], l9[14], l9[16], l9[17]]));

  Object.assign(MATH_LEVELS, { 7: l7, 8: l8, 9: l9 });
})();
