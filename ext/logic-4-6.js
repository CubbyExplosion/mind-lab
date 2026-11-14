// ext/logic-4-6.js  Mind Lab Logic & Puzzles levels 4-6 (60 lessons)
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const big = (t, s = 1.8) => `<span style="font-size:${s}em">${t}</span>`;
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const ORDW = n => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][n % 10] || "th"));
  const mcq = (text, visual, right, wrongs, hints) => {
    right = String(right);
    const w = [...new Set(wrongs.map(String))].filter(x => x !== right).slice(0, 3);
    return { text, visual, choices: shuf([right, ...w]), answer: right, hints };
  };
  const num = (text, visual, answer, hints) => ({ text, visual, answer, hints });
  const uniq = (arr, n) => shuf([...new Set(arr)]).slice(0, n);

  // ================= shared pools =================
  const PN = [["🔴", "red"], ["🔵", "blue"], ["🟢", "green"], ["🟡", "yellow"], ["🟣", "purple"], ["🟠", "orange"], ["⭐", "star"], ["❤️", "heart"], ["🍎", "apple"], ["🍌", "banana"], ["🐶", "dog"], ["🐱", "cat"]];
  const GP = [["🐶", "dog"], ["🐱", "cat"], ["🐭", "mouse"], ["🐰", "rabbit"], ["🦊", "fox"], ["🐻", "bear"], ["🐼", "panda"], ["🐸", "frog"], ["🐵", "monkey"], ["🐔", "chicken"], ["🐧", "penguin"], ["🐢", "turtle"], ["🐙", "octopus"], ["🐠", "fish"], ["🦋", "butterfly"], ["🐞", "ladybug"], ["🐝", "bee"], ["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🍓", "strawberry"], ["🍉", "watermelon"], ["🌙", "moon"], ["🌈", "rainbow"], ["🚗", "car"], ["🚲", "bike"], ["⭐", "star"], ["🌞", "sun"]];
  const lbl = x => `${x[0]} ${x[1]}`;
  const VI = [
    ["🍎", "apple", "red", "fruit"], ["🍓", "strawberry", "red", "fruit"], ["🍌", "banana", "yellow", "fruit"], ["🍋", "lemon", "yellow", "fruit"],
    ["🍏", "green apple", "green", "fruit"], ["🍊", "orange", "orange", "fruit"], ["🍇", "grapes", "purple", "fruit"],
    ["🚒", "fire truck", "red", "vehicle"], ["🚕", "taxi", "yellow", "vehicle"], ["🚌", "bus", "yellow", "vehicle"],
    ["🐸", "frog", "green", "animal"], ["🐞", "ladybug", "red", "animal"], ["🐥", "chick", "yellow", "animal"],
    ["🌹", "rose", "red", "flower"], ["🌻", "sunflower", "yellow", "flower"],
    ["🥦", "broccoli", "green", "vegetable"], ["🥒", "cucumber", "green", "vegetable"], ["🥕", "carrot", "orange", "vegetable"]
  ];
  const PLU = { fruit: "fruits", vehicle: "vehicles", animal: "animals", flower: "flowers", vegetable: "vegetables" };

  // ================= number sequences =================
  const seqStep = (steps, len, hi) => () => {
    for (;;) {
      const d = pick(steps), start = d > 0 ? ri(0, Math.max(0, hi - d * len)) : ri(-d * len, hi);
      const arr = Array.from({ length: len }, (_, i) => start + d * i), nxt = start + d * len;
      if (nxt < 0 || nxt > hi + Math.abs(d)) continue;
      return num("What number comes next?", big(arr.join(", ") + ", ❓"), nxt, [
        "Look at how much the numbers change from one to the next.",
        d > 0 ? "The numbers go up by the same amount every time. Find that amount, then add it to the last number." : "The numbers go down by the same amount every time. Find that amount, then subtract it from the last number.",
        d > 0 ? "Example: 10, 15, 20, 25 goes up by 5 each time, so the next number is 30. Now do yours." : "Example: 40, 36, 32, 28 goes down by 4 each time, so the next number is 24. Now do yours."]);
    }
  };
  const seqAlt = () => {
    const [a, b] = pick([[2, 5], [3, 1], [5, 2], [10, 1], [4, 2], [5, -2], [6, -3], [10, -4], [8, -3], [3, 6]]);
    const start = ri(8, 20), arr = [start];
    for (let i = 0; i < 6; i++) arr.push(arr[i] + (i % 2 ? b : a));
    const nxt = arr[6] + (6 % 2 ? b : a);
    return num("What number comes next? (The jumps follow a pattern too!)", big(arr.join(", ") + ", ❓"), nxt, [
      "The jumps are not always the same. Write the jump between each pair of numbers.",
      "The jumps repeat in a pattern: jump one, jump two, jump one again... Which jump comes next?",
      "Example: 2, 5, 6, 9, 10 has jumps +3, +1, +3, +1. The next jump is +3, so the next number is 13. Now do yours."]);
  };
  const seqMul = () => {
    const t = pick(["double", "triple", "half"]);
    let arr, nxt, how;
    if (t === "double") { const s = ri(1, 5); arr = [s, s * 2, s * 4, s * 8]; nxt = s * 16; how = "Each number is double the one before it."; }
    else if (t === "triple") { const s = ri(1, 3); arr = [s, s * 3, s * 9, s * 27]; nxt = s * 81; how = "Each number is 3 times the one before it."; }
    else { const b = ri(1, 9); arr = [b * 16, b * 8, b * 4, b * 2]; nxt = b; how = "Each number is half of the one before it."; }
    return num("What number comes next?", big(arr.join(", ") + ", ❓"), nxt, [
      "Check the jumps. Are they the same each time? If not, think about multiplying or splitting in half.",
      `Compare the first two numbers. What could you do to the first to get the second? Try it on the next pair too. (${t === "half" ? "These numbers get smaller." : "These numbers grow fast."})`,
      "Example: 3, 6, 12, 24 doubles every time, so the next number is 48. And 80, 40, 20 halves every time, so the next is 10. Now do yours."]);
  };
  const seqSpecial = () => {
    const t = pick(["square", "tri", "fib", "gap"]);
    let arr, nxt, h2, ex;
    if (t === "square") { const k = ri(1, 5); arr = [0, 1, 2, 3].map(i => (k + i) * (k + i)); nxt = (k + 4) * (k + 4); h2 = "Try multiplying small numbers by themselves: 1 × 1, 2 × 2, 3 × 3... Which ones match the numbers you see?"; ex = "Example: 4 = 2 × 2 and 9 = 3 × 3, so the number after 9 in this pattern is 4 × 4 = 16."; }
    else if (t === "tri") { const k = ri(2, 4); const tr = n => n * (n + 1) / 2; arr = [0, 1, 2, 3].map(i => tr(k + i)); nxt = tr(k + 4); h2 = "Write the gaps between the numbers. The gaps grow by 1 each time."; ex = "Example: 1, 3, 6 has gaps 2, 3, so the next gap is 4 and the next number is 6 + 4 = 10."; }
    else if (t === "fib") { const a = ri(1, 4), b = ri(1, 4); arr = [a, b]; for (let i = 2; i < 6; i++) arr.push(arr[i - 1] + arr[i - 2]); nxt = arr[5] + arr[4]; h2 = "Try adding two numbers that sit next to each other. What do you get?"; ex = "Example: 1, 1, 2, 3, 5: 2 + 3 = 5, and 3 + 5 = 8 would come next in that pattern."; }
    else { const s = ri(1, 5), g = ri(1, 2); arr = [s]; for (let i = 0; i < 4; i++) arr.push(arr[i] + g + i); nxt = arr[4] + g + 4; h2 = "Write the gaps between the numbers. The gaps are not the same: they change in a pattern."; ex = "Example: 2, 3, 5, 8 has gaps 1, 2, 3, so the next gap is 4 and the next number is 12."; }
    return num("What number comes next?", big(arr.join(", ") + ", ❓"), nxt, ["Look at the gaps between the numbers. Are the gaps the same?", h2, ex + " Now do yours."]);
  };
  const nthTerm = () => {
    const d = ri(2, 9), s = ri(1, 9), seq = [0, 1, 2, 3].map(i => s + d * i), n = ri(7, 12), tab = `<div style="font-family:monospace;font-size:1.2em">Place: &nbsp;1 &nbsp;&nbsp;2 &nbsp;&nbsp;3 &nbsp;&nbsp;4 &nbsp;&nbsp;...<br>Number: ${seq.join(" , ")} ...</div>`;
    const ed = pick([2, 3, 4, 5, 6, 7, 8, 9].filter(x => x !== d));
    if (Math.random() < 0.6) {
      return num(`The pattern keeps going the same way. What number is in place ${n}?`, tab, s + d * (n - 1), [
        "Find how much the number grows from one place to the next.",
        `Place ${n} is ${n - 4} steps after place 4. Every step adds the same amount to the number in place 4.`,
        `Example: 3, 7, 11, 15 grows by 4. Place 6 is 2 steps after place 4: 15 + 4 + 4 = 23. Now do yours.`]);
    }
    const target = s + d * (n - 1);
    return num(`The pattern keeps going the same way. Which place has the number ${target}?`, tab, n, [
      "Find how much the number grows from one place to the next.",
      `Count how many jumps it takes to get from the last number shown (place 4) up to ${target}. Add that count to 4.`,
      "Example: 3, 7, 11, 15 grows by 4. To reach 27 from 15 you need 3 jumps (19, 23, 27), so 27 is in place 4 + 3 = 7. Now do yours."]);
  };

  // ================= picture patterns =================
  const cell = (e, n) => `<span style="display:inline-block;text-align:center;margin:0 3px;font-size:1.5em">${e}<br><small style="font-size:.5em">${n}</small></span>`;
  const patternNth = (kLo, kHi, nHi, count) => () => {
    const k = ri(kLo, kHi), core = shuf(PN).slice(0, k), shown = Math.max(6, 2 * k), n = ri(shown + 1, nHi);
    const row = Array.from({ length: shown }, (_, i) => core[i % k][0]).join(" ") + " ...";
    if (count && Math.random() < 0.5) {
      const j = ri(0, k - 1), cnt = Math.floor(n / k) + ((n % k) >= j + 1 ? 1 : 0);
      return num(`If the pattern keeps going, how many ${core[j][0]} are in the first ${n} pictures?`, big(row), cnt, [
        "Find the part that repeats. How many pictures are in it?",
        `The pattern repeats every ${k} pictures. How many full groups of ${k} fit in ${n}? How many pictures are left over, and does the ${core[j][0]} appear in them?`,
        "Example: 🔴 🔵 🔴 🔵 ... In the first 7 pictures there are 3 full pairs (3 🔴) and one picture left over, which is a 🔴, so 4 🔴. Now do yours."]);
    }
    const a = core[(n - 1) % k];
    return mcq(`If the pattern keeps going, what is the ${ORDW(n)} picture?`, big(row), lbl(a), core.filter(x => x !== a).map(lbl), [
      "Find the part that repeats. How many pictures are in it?",
      `The pattern repeats every ${k} pictures, so picture ${k}, ${2 * k}, ${3 * k}... all match the last picture of the group. Count on from the one nearest to ${n}.`,
      "Example: 🍎 🍌 🍇 repeats every 3. The 6th picture ends a group (🍇), so the 7th starts again with 🍎. Now do yours."]);
  };
  const patternBreak = () => {
    const k = ri(2, 3), core = shuf(PN).slice(0, k), len = ri(8, 10), p = ri(k + 1, len);
    const arr = Array.from({ length: len }, (_, i) => core[i % k][0]);
    arr[p - 1] = pick(core.filter(x => x[0] !== core[(p - 1) % k][0]))[0];
    return num("One picture breaks the pattern. Which place is it in? (Count from the left.)", arr.map((e, i) => cell(e, i + 1)).join(""), p, [
      "Look at the start of the pattern. What small group repeats?",
      "Check the pictures one by one. Which picture is not what the pattern says should come next?",
      "Example: 🍎 🍌 🍎 🍌 🍌 🍌 repeats 🍎 🍌. The 5th picture should be 🍎 but it is a 🍌, so the 5th breaks the pattern. Now do yours."]);
  };
  const seqRule = () => {
    const d = pick([2, 3, 4, 5, 6, 7, 8, 9]), up = Math.random() < 0.5, start = up ? ri(1, 20) : ri(40, 70);
    const arr = [0, 1, 2, 3].map(i => start + (up ? d : -d) * i), w = (u, x) => `${u ? "add" : "subtract"} ${x}`;
    return mcq("Which rule makes this pattern?", big(arr.join(", ")), w(up, d), [w(!up, d), w(up, d + 1), w(up, d - 1)], [
      "Look at the first two numbers. How far apart are they? Are they going up or down?",
      "Check that the same jump works for the next pair too.",
      "Example: 5, 8, 11, 14 goes up by 3 every time, so the rule is add 3. Now do yours."]);
  };

  // ================= function machines =================
  const OP = {
    add: a => ({ min: 0, sym: `+ ${a}`, word: `add ${a}`, f: x => x + a, inv: y => y - a, tip: "Adding makes the number bigger." }),
    sub: a => ({ min: a, sym: `− ${a}`, word: `subtract ${a}`, f: x => x - a, inv: y => y + a, tip: "Taking away makes the number smaller." }),
    mul: a => ({ min: 1, sym: `× ${a}`, word: `multiply by ${a}`, f: x => x * a, inv: y => y / a, tip: `Multiplying by ${a} means ${a} equal groups. Skip count by ${a}s.` }),
    mulAdd: (a, b) => ({ min: 1, sym: `× ${a}, + ${b}`, word: `multiply by ${a}, then add ${b}`, f: x => x * a + b, inv: y => (y - b) / a, tip: `Do the multiplying by ${a} first. Then add ${b}.` }),
    mulSub: (a, b) => ({ min: Math.ceil(b / a), sym: `× ${a}, − ${b}`, word: `multiply by ${a}, then subtract ${b}`, f: x => x * a - b, inv: y => (y + b) / a, tip: `Do the multiplying by ${a} first. Then take away ${b}.` })
  };
  const mkOp = k => k === "add" ? OP.add(ri(2, 9)) : k === "sub" ? OP.sub(ri(2, 9)) : k === "mul" ? OP.mul(ri(2, 5)) : k === "mulAdd" ? OP.mulAdd(ri(2, 4), ri(1, 5)) : OP.mulSub(ri(2, 4), ri(1, 3));
  const machPair = (kinds, hi) => { const op = mkOp(pick(kinds)); return { op, x: ri(Math.max(op.min, 1), Math.max(op.min + 3, hi)) }; };
  const machine = (kinds, hi) => () => {
    const { op, x } = machPair(kinds, hi); let e;
    do { e = machPair(kinds, hi); } while (e.op.word === op.word && e.x === x);
    return num(`A magic machine changes numbers. IN: ${x}. The machine will <b>${op.word}</b>. What comes OUT?`, big(`📥 ${x} → ⚙️ ${op.sym} → ❓`, 1.5), op.f(x), [
      "Start with the IN number and do exactly what the machine says.", op.tip,
      `Example: IN ${e.x}, the machine does ${e.op.word}. OUT is ${e.op.f(e.x)}. Now do yours.`]);
  };
  const machineBack = (kinds, hi) => () => {
    const { op, x } = machPair(kinds, hi); let e;
    do { e = machPair(kinds, hi); } while (e.op.word === op.word && e.x === x);
    return num(`A magic machine will <b>${op.word}</b>. The number that came OUT is ${op.f(x)}. What number went IN?`, big(`📥 ❓ → ⚙️ ${op.sym} → 📤 ${op.f(x)}`, 1.5), x, [
      "Work backwards: start from the OUT number and undo the machine.",
      "Undo the last step first. The opposite of adding is taking away. The opposite of multiplying is dividing.",
      `Example: the machine does ${e.op.word} and OUT is ${e.op.f(e.x)}. Undoing it gives IN ${e.x}. Now do yours.`]);
  };
  const RULEPOOL = () => { const p = []; for (let a = 1; a <= 9; a++) { p.push(OP.add(a)); p.push(OP.sub(a)); } for (let a = 2; a <= 5; a++) p.push(OP.mul(a)); for (let a = 2; a <= 4; a++) for (let b = 1; b <= 3; b++) { p.push(OP.mulAdd(a, b)); p.push(OP.mulSub(a, b)); } return p; };
  const POOL = RULEPOOL();
  const machineRule = kinds => () => {
    for (;;) {
      const right = POOL.filter(o => kinds.some(k => (k === "add" && /^add/.test(o.word)) || (k === "sub" && /^subtract/.test(o.word)) || (k === "mul" && /^multiply by \d$/.test(o.word)) || (k === "mulAdd" && /then add/.test(o.word)) || (k === "mulSub" && /then subtract/.test(o.word)))), op = pick(right);
      const xs = uniq([2, 3, 4, 5, 6, 7, 8, 9].filter(x => x >= op.min), 3);
      if (xs.length < 3) continue;
      const fits = o => xs.every(x => o.f(x) === op.f(x));
      if (POOL.some(o => o.word !== op.word && fits(o))) continue;
      const wrongs = shuf(POOL.filter(o => o.word !== op.word && right.includes(o))).map(o => o.word);
      return mcq("The machine uses ONE rule. Which rule is it?", big(xs.map(x => `📥 ${x} → 📤 ${op.f(x)}`).join("<br>"), 1.3), op.word, wrongs.slice(0, 3), [
        "Look at one IN and its OUT. Did the number get bigger or smaller? By how much?",
        "Try your rule on EVERY row. A rule only works if it makes all the rows right.",
        "Example: 📥 2 → 📤 5 and 📥 4 → 📤 9. Add 3 gives 5 but then 4 → 7, which is wrong. Multiply by 2, then add 1 works for both. Now do yours."]);
    }
  };

  // ================= odd one out (numbers) =================
  const OK = {
    even: { d: "even numbers", t: x => x % 2 === 0, lo: 1, hi: 40, flip: 1, tip: "Even numbers end in 0, 2, 4, 6 or 8.", ex: "6, 9, 12, 14 → three are in the 3 times table (6, 9, 12), so 14 is not." },
    m5: { d: "in the 5 times table", t: x => x % 5 === 0, lo: 1, hi: 60, tip: "Numbers in the 5 times table end in 0 or 5.", ex: "10, 25, 30, 41 → three end in 0 or 5, so 41 is not." },
    m10: { d: "in the 10 times table", t: x => x % 10 === 0, lo: 1, hi: 100, tip: "Numbers in the 10 times table end in 0.", ex: "20, 50, 70, 65 → three end in 0, so 65 is not." },
    m3: { d: "in the 3 times table", t: x => x % 3 === 0, lo: 1, hi: 60, tip: "Count by 3s: 3, 6, 9, 12, 15... Is the number on that list?", ex: "6, 9, 12, 14 → three are in the 3 times table, so 14 is not." },
    m4: { d: "in the 4 times table", t: x => x % 4 === 0, lo: 1, hi: 60, tip: "Count by 4s: 4, 8, 12, 16, 20... Is the number on that list?", ex: "8, 12, 20, 22 → three are in the 4 times table, so 22 is not." },
    m6: { d: "in the 6 times table", t: x => x % 6 === 0, lo: 1, hi: 72, tip: "Count by 6s: 6, 12, 18, 24, 30... Is the number on that list?", ex: "12, 18, 30, 33 → three are in the 6 times table, so 33 is not." },
    m7: { d: "in the 7 times table", t: x => x % 7 === 0, lo: 1, hi: 70, tip: "Count by 7s: 7, 14, 21, 28, 35... Is the number on that list?", ex: "14, 21, 49, 50 → three are in the 7 times table, so 50 is not." },
    m9: { d: "in the 9 times table", t: x => x % 9 === 0, lo: 1, hi: 90, tip: "Count by 9s: 9, 18, 27, 36, 45... Is the number on that list?", ex: "18, 27, 63, 64 → three are in the 9 times table, so 64 is not." },
    sq: { d: "square numbers (like 9 = 3 × 3)", t: x => Number.isInteger(Math.sqrt(x)), lo: 1, hi: 100, tip: "Square numbers are a number times itself: 1, 4, 9, 16, 25, 36, 49...", ex: "4, 16, 25, 30 → three are square numbers, so 30 is not." }
  };
  const oddNum = kinds => () => {
    const k = OK[pick(kinds)], all = Array.from({ length: k.hi - k.lo + 1 }, (_, i) => k.lo + i);
    const flipped = k.flip && Math.random() < 0.5, t = flipped ? (x => !k.t(x)) : k.t, desc = flipped ? "odd numbers" : k.d;
    const three = uniq(all.filter(t), 3), one = pick(all.filter(x => !t(x)));
    const nums = shuf(three.concat(one));
    return mcq(`Three of these numbers are ${desc}. Which one is <b>not</b>?`, big(nums.join(" &nbsp; ")), one, three, [
      "Check the numbers one at a time against the rule in the question.",
      flipped ? "Odd numbers end in 1, 3, 5, 7 or 9. Check the last digit of each number." : k.tip,
      `Example: ${k.ex} Now do yours.`]);
  };

  // ================= Venn diagrams =================
  const VT = [["🐶", "dogs", "🐱", "cats"], ["⚽", "soccer", "🏀", "basketball"], ["🍎", "apples", "🍌", "bananas"], ["🍕", "pizza", "🍦", "ice cream"], ["🏊", "swimming", "🚴", "biking"], ["📖", "books", "🎨", "painting"]];
  const vbox = (A, B, a, b, c, d, showN) => `<div style="display:inline-flex;align-items:stretch;line-height:1.3"><div style="border:3px solid #e0574f;border-radius:40px 0 0 40px;padding:8px 14px;text-align:center">Only ${A}<br><b style="font-size:1.4em">${a}</b></div><div style="border:3px solid #7a4fe0;padding:8px 14px;text-align:center;margin:0 -3px">Both<br><b style="font-size:1.4em">${b}</b></div><div style="border:3px solid #2f7fe0;border-radius:0 40px 40px 0;padding:8px 14px;text-align:center">Only ${B}<br><b style="font-size:1.4em">${c}</b></div></div>` + (showN ? `<br><small>Neither: <b>${d}</b></small>` : "");
  const vennCount = types => () => {
    const t = pick(types), v = pick(VT), A = v[0], B = v[2], hi = types.includes("neither") ? 6 : 7, a = ri(1, hi), b = ri(1, hi), c = ri(1, hi), d = ri(1, 6), nm = `<b>${v[1]}</b>`, nb = `<b>${v[3]}</b>`;
    const Q = {
      a: [`Kids in a club were asked. How many kids like ${nm} (in all)?`, a + b, "The circle for " + v[1] + " has two parts: the 'Only' part and the 'Both' part.", "Add the two parts that are inside the " + v[1] + " circle.", "Example: Only 🍎: 3, Both: 2. Kids who like 🍎 in all = 3 + 2 = 5."],
      b: [`Kids in a club were asked. How many kids like ${nb} (in all)?`, b + c, "The circle for " + v[3] + " has two parts: the 'Only' part and the 'Both' part.", "Add the two parts that are inside the " + v[3] + " circle.", "Example: Only 🍎: 3, Both: 2, Only 🍌: 4. Kids who like 🍌 in all = 2 + 4 = 6."],
      both: [`How many kids like <b>both</b> ${v[1]} and ${v[3]}?`, b, "Which part of the picture is for kids who like both?", "Look at the middle part where the two circles overlap.", "Example: Only 🍎: 3, Both: 2, Only 🍌: 4. The kids who like both are in the middle: 2."],
      only: [`How many kids like <b>only</b> ${v[1]}?`, a, "'Only' means not the middle part.", "Find the box called 'Only " + v[1] + "' and read its number.", "Example: Only 🍎: 3, Both: 2. Kids who like only 🍎 = 3."],
      one: [`How many kids like <b>exactly one</b> of them (${v[1]} or ${v[3]}, but not both)?`, a + c, "Exactly one means NOT the middle part.", "Add the two 'Only' parts and skip 'Both'.", "Example: Only 🍎: 3, Both: 2, Only 🍌: 4. Exactly one = 3 + 4 = 7."],
      any: [`How many kids like <b>at least one</b> of them?`, a + b + c, "At least one means one OR both.", "Add all three parts that are inside the circles. Leave out 'Neither'.", "Example: Only 🍎: 3, Both: 2, Only 🍌: 4, Neither: 1. At least one = 3 + 2 + 4 = 9."],
      all: [`How many kids were asked in all?`, a + b + c + d, "Everybody is somewhere in the picture, even the kids outside the circles.", "Add all four numbers: Only, Both, Only and Neither.", "Example: Only 🍎: 3, Both: 2, Only 🍌: 4, Neither: 1. In all = 3 + 2 + 4 + 1 = 10."],
      neither: [`How many kids like <b>neither</b> ${v[1]} nor ${v[3]}?`, d, "Neither means outside both circles.", "Read the number that is written outside the circles.", "Example: Only 🍎: 3, Both: 2, Only 🍌: 4, Neither: 1. Neither = 1."]
    }[t];
    return num(Q[0], vbox(A + " " + v[1], B + " " + v[3], a, b, c, d, types.includes("neither") || t === "all"), Q[1], [Q[2], Q[3], Q[4]]);
  };
  const vennBoth = () => {
    const a = ri(1, 8), b = ri(1, 8), c = ri(1, 8), d = ri(0, 5), n = a + b + c + d, v = pick(VT);
    return num(`In a class of ${n} kids, ${a + b} like ${v[1]}, ${b + c} like ${v[3]}, and ${d} like neither. How many kids like <b>both</b>?`, big(`${v[0]} ${v[2]}`), b, [
      `First find how many kids like at least one. That is ${n} minus the ${d} who like neither.`,
      `Add the ${v[1]} kids and the ${v[3]} kids. The kids who like both were counted twice, so compare your total with the real number who like at least one.`,
      "Example: 10 kids, 6 like tea, 5 like milk, 1 likes neither. 9 like at least one. 6 + 5 = 11, which is 2 too many, so 2 like both. Now do yours."]);
  };
  const vennPlace = () => {
    const ci = pick(["red", "yellow", "green"]), ki = pick(["fruit", "vehicle", "animal", "flower"]), it = pick(VI), inC = it[2] === ci, inK = it[3] === ki;
    const right = inC && inK ? "in the middle (both)" : inC ? `only in the ${ci} circle` : inK ? `only in the ${ki} circle` : "outside both circles";
    return mcq(`Circle 1 is for <b>${ci} things</b>. Circle 2 is for <b>${PLU[ki]}</b>. Where does ${it[0]} (${it[1]}) go?`, big(`🔴 ${ci} things &nbsp; 🔵 ${PLU[ki]}`, 1.1), right,
      [`only in the ${ci} circle`, `only in the ${ki} circle`, "in the middle (both)", "outside both circles"], [
      `Ask two questions about ${it[0]}: is it ${ci}? is it a ${ki}?`,
      "Yes to both → the middle. Yes to just one → that circle only. No to both → outside the circles.",
      "Example: a red 🍓 with circles 'red things' and 'animals' is red but not an animal, so it goes only in the red circle. Now do yours."]);
  };

  // ================= and / or / not =================
  const andOrNot = types => () => {
    const t = pick(types), cs = ["red", "yellow", "green"], ks = ["fruit", "vehicle", "animal", "flower"];
    let text, right, wrongs, hints;
    if (t === "and") {
      const pairs = []; cs.forEach(c => ks.forEach(k => { if (VI.some(i => i[2] === c && i[3] === k)) pairs.push([c, k]); }));
      const [c, k] = pick(pairs), r = pick(VI.filter(i => i[2] === c && i[3] === k)), ws = uniq(VI.filter(i => !(i[2] === c && i[3] === k)).map(lbl), 3);
      text = `Which one is <b>${c}</b> AND a <b>${k}</b>?`; right = lbl(r); wrongs = ws;
      hints = ["AND means BOTH clues must be true.", `Check each picture: is it ${c}? Is it a ${k}? It needs a yes to both.`, "Example: 'yellow AND a vehicle' fits a 🚕 taxi (yellow and a vehicle) but not a 🍌 banana (yellow, but not a vehicle). Now do yours."];
    } else if (t === "or") {
      const c = pick(cs), k = pick(ks), fit = i => i[2] === c || i[3] === k, r = pick(VI.filter(fit)), ws = uniq(VI.filter(i => !fit(i)).map(lbl), 3);
      text = `Which one is <b>${c}</b> OR a <b>${k}</b>? (Only one of these fits.)`; right = lbl(r); wrongs = ws;
      hints = ["OR means at least ONE clue is true.", `Check each picture: is it ${c}? Is it a ${k}? One yes is enough.`, "Example: 'yellow OR an animal' fits a 🐸 frog (an animal) and a 🍌 banana (yellow). A 🚒 fire truck fits neither. Now do yours."];
    } else if (t === "not") {
      const kind = pick(["color", "kind"]), val = kind === "color" ? pick(["red", "yellow"]) : "fruit", idx = kind === "color" ? 2 : 3;
      const r = pick(VI.filter(i => i[idx] !== val)), ws = uniq(VI.filter(i => i[idx] === val).map(lbl), 3);
      text = `Which one is <b>NOT</b> ${kind === "color" ? val : "a " + val}?`; right = lbl(r); wrongs = ws;
      hints = ["NOT means the opposite.", `Three of these ARE ${kind === "color" ? val : "a " + val}. Find the one that is not.`, "Example: 'NOT red' among 🍎 🍓 🌹 🍌 → the 🍌 banana is not red. Now do yours."];
    } else {
      const c = pick(["red", "yellow"]), k = pick(["fruit", "vehicle", "flower"]), fit = i => i[2] === c && i[3] !== k;
      const pool = VI.filter(fit); if (!pool.length) return andOrNot(["and"])();
      const r = pick(pool), ws = uniq(VI.filter(i => !fit(i)).map(lbl), 3);
      text = `Which one is <b>${c}</b> but <b>NOT</b> a <b>${k}</b>?`; right = lbl(r); wrongs = ws;
      hints = ["Two clues: one must be true and the other must be false.", `It must be ${c}. And it must NOT be a ${k}.`, "Example: 'green but NOT an animal' fits 🥦 broccoli (green, not an animal) but not 🐸 frog (green, but an animal). Now do yours."];
    }
    return mcq(text, undefined, right, wrongs, hints);
  };

  // ================= ranking =================
  const RK = [["taller", "shorter", "tallest", "shortest"], ["faster", "slower", "fastest", "slowest"], ["older", "younger", "oldest", "youngest"], ["heavier", "lighter", "heaviest", "lightest"]];
  const rank = n => () => {
    const w = pick(RK), order = shuf(NM).slice(0, n), cl = [];
    for (let i = 0; i < n - 1; i++) cl.push(Math.random() < 0.5 ? `${order[i]} is ${w[0]} than ${order[i + 1]}.` : `${order[i + 1]} is ${w[1]} than ${order[i]}.`);
    const types = ["top", "bottom"]; if (n >= 3) types.push("second"); if (n >= 4) types.push("third"); if (n >= 5) types.push("fourth", "middle");
    const t = pick(types.filter(x => x !== "middle" || n % 2));
    const idx = { top: 0, bottom: n - 1, second: 1, third: 2, fourth: 3, middle: (n - 1) / 2 }[t], who = order[idx];
    const q = t === "top" ? `Who is the ${w[2]}?` : t === "bottom" ? `Who is the ${w[3]}?` : t === "middle" ? "Who is in the middle?" : `Who is ${ORDW(idx + 1)} from the ${w[2]} end? (Counting the ${w[2]} as 1st)`;
    const h2 = t === "top" ? `The ${w[2]} is never the one described as ${w[1]} than someone. Which name never loses?` : t === "bottom" ? `The ${w[3]} is never the one described as ${w[0]} than someone. Which name never wins?` : `Put all the names in a line using the clues. Then count from the ${w[2]} end.`;
    return mcq(`Use the clues.<br>${shuf(cl).join("<br>")}<br>${q}`, undefined, who, order.filter(x => x !== who), [
      "Line the names up in your head. Each clue tells you who goes first.", h2,
      `Example: Ann is ${w[0]} than Bo. Bo is ${w[0]} than Cy. The line is Ann, Bo, Cy. So Ann is the ${w[2]}. Now do yours.`]);
  };

  // ================= logic grid =================
  const perms = n => n === 1 ? [[0]] : perms(n - 1).flatMap(p => Array.from({ length: n }, (_, i) => [...p.slice(0, i), n - 1, ...p.slice(i)]));
  const PERMS = { 3: perms(3), 4: perms(4) };
  const GTH = [
    { items: [["🐶", "dog"], ["🐱", "cat"], ["🐰", "rabbit"], ["🐟", "fish"]], v: "has", nv: "does not have", b: "have", who: "Who has" },
    { items: [["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🍓", "strawberry"]], v: "eats", nv: "does not eat", b: "eat", who: "Who eats" },
    { items: [["⚽", "soccer ball"], ["🏀", "basketball"], ["🎾", "tennis ball"], ["🏐", "volleyball"]], v: "has", nv: "does not have", b: "have", who: "Who has" },
    { items: [["🥛", "milk"], ["🧃", "juice"], ["💧", "water"], ["🍵", "tea"]], v: "drinks", nv: "does not drink", b: "drink", who: "Who drinks" }
  ];
  const logicGrid = (n, maxPos) => () => {
    const th = pick(GTH), names = shuf(NM).slice(0, n), items = shuf(th.items).slice(0, n), sol = pick(PERMS[n]), negs = [], poss = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) (sol[i] === j ? poss : negs).push({ p: i, it: j, pos: sol[i] === j });
    const pool = shuf(shuf(poss).slice(0, maxPos).concat(negs)), clues = []; let cand = PERMS[n];
    for (const c of pool) {
      const nc = cand.filter(pm => (pm[c.p] === c.it) === c.pos);
      if (nc.length < cand.length) { clues.push(c); cand = nc; if (cand.length === 1) break; }
    }
    const txt = c => `${names[c.p]} ${c.pos ? th.v : th.nv} the ${lbl(items[c.it])}.`;
    const ask = Math.random() < 0.5, i = ri(0, n - 1);
    const q = ask ? `${th.who} the ${lbl(items[sol[i]])}?` : `What does ${names[i]} ${th.b}?`;
    const right = ask ? names[i] : lbl(items[sol[i]]);
    const ch = ask ? names : items.map(lbl);
    return mcq(`${names.join(", ")} each ${th.b} a different one of ${items.map(x => x[0]).join(" ")}.<br>${clues.map(txt).join("<br>")}<br><b>${q}</b>`, undefined, right, ch.filter(x => x !== right), [
      "Start with a clue that tells you exactly who has what, if there is one. Otherwise start by crossing things out.",
      "Make a little table. Every clue with 'not' crosses out a box. When a person has only one box left, that one is theirs. Then cross it out for the others.",
      "Example: Ann, Bo and Cy have a 🐶, a 🐱 and a 🐰. Ann does not have the 🐶. Ann does not have the 🐱. So Ann has the 🐰. Now do yours."]);
  };

  // ================= truth tellers and liars =================
  const PLC = [["🎒 bag", "📦 box"], ["🛏️ bed", "🛋️ couch"], ["🌳 tree", "🏠 house"], ["🧺 basket", "🚗 car"], ["🏫 school", "🏞️ park"], ["🍽️ table", "📚 shelf"]];
  const THG = ["cat 🐱", "ball ⚽", "key 🔑", "toy 🧸", "cookie 🍪", "hat 🎩"];
  const truthBasic = () => {
    const n = pick(NM), truth = Math.random() < 0.5, pl = shuf(pick(PLC)), th = pick(THG), p1 = pl[0], p2 = pl[1];
    return mcq(`${n} ${truth ? "always tells the truth" : "always tells lies"}.<br>${n} says: “The ${th} is in the ${p1}.”<br>The ${th} is in one of these two places. Where is it?`, undefined, truth ? p1 : p2, [truth ? p2 : p1], [
      "First ask: does this person tell the truth, or always lie?",
      "A truth-teller says what is real. A liar says the opposite of what is real. So the statement is either true or false for sure.",
      "Example: Ann always lies. She says “The dog is in the yard.” That is false, so the dog is NOT in the yard. With only two places, it must be in the other one. Now do yours."]);
  };
  const truthChain = () => {
    const [a, b] = shuf(NM).slice(0, 2), tk = Math.random() < 0.5 ? "truth" : "liar", said = Math.random() < 0.5 ? "truth" : "liar";
    const phr = x => x === "truth" ? "always tells the truth" : "always lies", nm = x => x === "truth" ? "truth-teller" : "liar", opp = x => x === "truth" ? "liar" : "truth";
    const hints = [
      "A truth-teller's words are always true. A liar's words are always false. Decide if the sentence is true or false.",
      "Once you know if the sentence is true or false, you know if the speaker tells the truth or lies.",
      "Example: Ann always tells the truth. Bo says “Ann always lies.” That is false, so Bo is a liar. Now do yours."];
    if (Math.random() < 0.5) {
      // known person speaks about the other
      const ans = tk === "truth" ? said : opp(said);
      return mcq(`${a} ${phr(tk)}.<br>${a} says: “${b} ${phr(said)}.”<br>What is ${b}?`, undefined, nm(ans), [nm(opp(ans))], [
        `${a}'s sentence is ${tk === "truth" ? "true" : "false"}, because of how ${a} speaks. Does that help with ${b}?`, hints[1], hints[2]]);
    }
    const stmtTrue = said === tk;
    return mcq(`${a} ${phr(tk)}.<br>${b} says: “${a} ${phr(said)}.”<br>What is ${b}?`, undefined, nm(stmtTrue ? "truth" : "liar"), [nm(stmtTrue ? "liar" : "truth")], [
      `You already know what ${a} is. Is ${b}'s sentence about ${a} true or false?`, hints[1], hints[2]]);
  };

  // ================= number riddles =================
  const numRiddle = (lo, hi, maxC) => () => {
    for (;;) {
      const n = ri(lo, hi), cl = [], ds = String(n).split("").map(Number), s = ds.reduce((p, c) => p + c, 0), dsum = x => String(x).split("").reduce((p, c) => p + +c, 0);
      cl.push([n % 2 ? "I am odd." : "I am even.", x => x % 2 === n % 2]);
      const a = Math.max(lo - 1, n - ri(2, 20)), b = Math.min(hi + 1, n + ri(2, 20));
      cl.push([`I am more than ${a}.`, x => x > a]); cl.push([`I am less than ${b}.`, x => x < b]);
      cl.push([`My digits add up to ${s}.`, x => dsum(x) === s]);
      cl.push([`The digit in my ones place is ${n % 10}.`, x => x % 10 === n % 10]);
      cl.push([`The digit in my tens place is ${Math.floor(n / 10) % 10}.`, x => Math.floor(x / 10) % 10 === Math.floor(n / 10) % 10]);
      if (hi >= 100) cl.push([`The digit in my hundreds place is ${Math.floor(n / 100)}.`, x => Math.floor(x / 100) === Math.floor(n / 100)]);
      [3, 4, 5, 6, 7, 9].forEach(k => cl.push(n % k === 0 ? [`I am in the ${k} times table.`, x => x % k === 0] : [`I am NOT in the ${k} times table.`, x => x % k !== 0]));
      let cands = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i); const used = [];
      for (const c of shuf(cl)) {
        const nc = cands.filter(c[1]);
        if (nc.length < cands.length) { used.push(c[0]); cands = nc; if (cands.length === 1) break; }
      }
      if (cands.length !== 1 || used.length < 2 || used.length > maxC) continue;
      return num(`I am a number from ${lo} to ${hi}.<br>${used.join("<br>")}<br><b>What number am I?</b>`, undefined, n, [
        "Think of the numbers that could fit the first clue. Then cross out numbers with each new clue.",
        "Clues like 'digits add up to' or 'times table' cross out lots of numbers. Test your guess against EVERY clue.",
        "Example: I am from 20 to 40. I am even. I am in the 9 times table. Multiples of 9 there are 27 and 36. Only 36 is even. Now do yours."]);
    }
  };

  // ================= grids =================
  const gridHtml = (rows, axes) => {
    const n = rows.length, m = rows[0].length;
    const td = c => `<td style="border:2px solid #9aa8d8;width:1.9em;height:1.9em;text-align:center;font-size:1.4em">${c}</td>`;
    const lab = t => `<td style="font-size:.9em;color:#667;padding:0 6px;text-align:center">${t}</td>`;
    const colRow = "<tr>" + lab("") + Array.from({ length: m }, (_, j) => lab(`<b>${j + 1}</b>`)).join("") + "</tr>";
    let h = `<table style="border-collapse:collapse;margin:auto">`;
    if (axes === "rc") h += colRow;
    rows.forEach((r, i) => { h += "<tr>" + (axes === "xy" ? lab(`<b>${n - i}</b>`) : axes === "rc" ? lab(`<b>${i + 1}</b>`) : "") + r.map(td).join("") + "</tr>"; });
    if (axes === "xy") h += colRow;
    return h + "</table>";
  };
  const mkGrid = n => { const p = shuf(GP).slice(0, n * n); return Array.from({ length: n }, (_, r) => p.slice(r * n, r * n + n)); };
  const gridAt = () => {
    const g = mkGrid(3), r = ri(0, 2), c = ri(0, 2), it = g[r][c], vis = gridHtml(g.map(x => x.map(y => y[0])), "rc"), t = pick(["at", "row", "col"]);
    const h1 = "Rows go across (side to side). Columns go up and down. Row 1 is the top row and column 1 is the left column.";
    if (t === "at") return mcq(`What is in <b>row ${r + 1}</b>, <b>column ${c + 1}</b>?`, vis, lbl(it), uniq(g.flat().filter(x => x !== it).map(lbl), 3), [h1, `Go down to row ${r + 1} first, then slide along that row to column ${c + 1}.`, "Example: row 2, column 3 means go down to the 2nd row, then move over to the 3rd square. Now do yours."]);
    if (t === "row") return num(`Which <b>row</b> is the ${it[0]} ${it[1]} in?`, vis, r + 1, [h1, "Count down from the top row until you reach the row with the picture.", "Example: if a picture is in the 2nd line from the top, it is in row 2. Now do yours."]);
    return num(`Which <b>column</b> is the ${it[0]} ${it[1]} in?`, vis, c + 1, [h1, "Count over from the left side until you reach the column with the picture.", "Example: if a picture is the 3rd one from the left, it is in column 3. Now do yours."]);
  };
  const tup = (x, y) => `(${x}, ${y})`;
  const gridWhere = n => () => {
    const g = mkGrid(n), r = ri(0, n - 1), c = ri(0, n - 1), it = g[r][c], x = c + 1, y = n - r, vis = gridHtml(g.map(z => z.map(w => w[0])), "xy");
    const hs = ["A point (x, y) says how far <b>across</b> from the left (x) and then how far <b>up</b> from the bottom (y).", "", "Example: (2, 3) means go across 2 squares, then up 3 squares. Now do yours."];
    if (Math.random() < 0.5) {
      const near = [tup(y, x), tup(x, Math.min(n, y + 1)), tup(Math.max(1, x - 1), y), tup(Math.min(n, x + 1), Math.min(n, y + 1)), tup(x, Math.max(1, y - 1))];
      hs[1] = "Find the picture, count across from the left for x, then count up from the bottom for y. Write x first.";
      return mcq(`Where is the ${it[0]} ${it[1]}? Give its (x, y) place.`, vis, tup(x, y), near, hs);
    }
    hs[1] = `Go across ${x} squares from the left side, then up ${y} squares from the bottom.`;
    return mcq(`What is at <b>${tup(x, y)}</b>?`, vis, lbl(it), uniq(g.flat().filter(z => z !== it).map(lbl), 3), hs);
  };
  const DIRS = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
  const gridMove = (n, steps, maxStep) => () => {
    for (;;) {
      const g = mkGrid(n); let r = ri(0, n - 1), c = ri(0, n - 1); const start = g[r][c], mv = []; let ok = true;
      for (let s = 0; s < steps; s++) {
        const opts = Object.keys(DIRS).filter(d => !mv.length || d !== mv[mv.length - 1][0]);
        const d = pick(opts), [dr, dc] = DIRS[d]; let k = ri(1, maxStep);
        while (k > 0 && (r + dr * k < 0 || r + dr * k >= n || c + dc * k < 0 || c + dc * k >= n)) k--;
        if (k < 1) { ok = false; break; }
        r += dr * k; c += dc * k; mv.push([d, k]);
      }
      if (!ok || g[r][c] === start) continue;
      const it = g[r][c], moves = mv.map(m => `${m[0]} ${m[1]}`).join(", then ");
      return mcq(`Start on the ${start[0]} ${start[1]}. Go <b>${moves}</b>. Which picture do you land on?`, gridHtml(g.map(z => z.map(w => w[0]))), lbl(it), uniq(g.flat().filter(z => z !== it).map(lbl), 3), [
        "Put your finger on the start picture. Do the first move, then the next one.",
        "Move one square at a time. Up goes toward the top row, down goes toward the bottom row. Left and right slide along the row.",
        "Example: start on a picture and go right 2, then down 1. Slide 2 squares to the right, then drop 1 row down. Now do yours."]);
    }
  };

  // ================= if / then and groups =================
  const IFS = [
    ["it rains", "the street is wet", "It is raining.", "It is not raining.", "The street is wet.", "The street is not wet."],
    ["Mia has a dog", "Mia has a pet", "Mia has a dog.", "Mia does not have a dog.", "Mia has a pet.", "Mia does not have a pet."],
    ["a shape is a square", "it has 4 sides", "The shape is a square.", "The shape is not a square.", "The shape has 4 sides.", "The shape does not have 4 sides."],
    ["it is Saturday", "there is no school", "It is Saturday.", "It is not Saturday.", "There is no school.", "There is school."],
    ["a number ends in 0", "it is in the 5 times table", "The number ends in 0.", "The number does not end in 0.", "The number is in the 5 times table.", "The number is not in the 5 times table."],
    ["an animal is a bird", "it has feathers", "The animal is a bird.", "The animal is not a bird.", "The animal has feathers.", "The animal does not have feathers."],
    ["Leo is at the beach", "Leo is outside", "Leo is at the beach.", "Leo is not at the beach.", "Leo is outside.", "Leo is not outside."],
    ["Ava is in the pool", "Ava is wet", "Ava is in the pool.", "Ava is not in the pool.", "Ava is wet.", "Ava is not wet."],
    ["a fruit is a banana", "it is yellow", "The fruit is a banana.", "The fruit is not a banana.", "The fruit is yellow.", "The fruit is not yellow."]
  ];
  const CANT = "We can't tell.";
  const ifThen = types => () => {
    const [rp, rq, P, nP, Q, nQ] = pick(IFS), t = pick(types), rule = `<b>If ${rp}, then ${rq}.</b>`;
    const h1 = "Read the rule slowly. 'If A, then B' only tells you what happens when A is true.";
    const h3 = "Example: If it snows, the ground is cold. If it snows, the ground is cold for sure. But if the ground is cold, it might not have snowed. Now do yours.";
    if (t === "mp") return mcq(`${rule}<br>${P}<br>What must be true?`, undefined, Q, [nQ, CANT], [h1, "The first part of the rule is true here. So what follows?", h3]);
    if (t === "tollens") return mcq(`${rule}<br>${nQ}<br>What must be true?`, undefined, nP, [P, CANT], [h1, "If the first part were true, the second part would have to happen. But it did not happen. Could the first part be true?", h3]);
    if (t === "affirm") return mcq(`${rule}<br>${Q}<br>What must be true?`, undefined, CANT, [P, nP], [h1, "The second part could be true for other reasons too. Does it prove the first part?", h3]);
    return mcq(`${rule}<br>${nP}<br>What must be true?`, undefined, CANT, [Q, nQ], [h1, "The rule only tells you what happens when the first part is true. What if it is not?", h3]);
  };
  const SY = [
    { S: "dogs", P: "animals", s: "a dog", p: "an animal", x: "Rex" }, { S: "roses", P: "flowers", s: "a rose", p: "a flower", x: "Thing A" },
    { S: "squares", P: "shapes", s: "a square", p: "a shape", x: "Shape B" }, { S: "apples", P: "fruits", s: "an apple", p: "a fruit", x: "Thing C" },
    { S: "trucks", P: "vehicles", s: "a truck", p: "a vehicle", x: "Thing D" }, { S: "sparrows", P: "birds", s: "a sparrow", p: "a bird", x: "Tweet" },
    { S: "violins", P: "instruments", s: "a violin", p: "an instrument", x: "Thing E" }, { S: "whales", P: "mammals", s: "a whale", p: "a mammal", x: "Willy" },
    { S: "cats", P: "mammals", s: "a cat", p: "a mammal", x: "Tom" }
  ];
  const syllogism = () => {
    const e = pick(SY), t = pick(["yes", "cant", "no"]), YES = "Yes, for sure.", NO = "No, for sure.", ch = [YES, NO, CANT];
    const base = `All ${e.S} are ${e.P}.`;
    const h = ["Think of two groups: a small group inside a bigger group.", "", "Example: All ducks are birds. Daisy is a duck, so Daisy is a bird. But if Daisy is a bird she could be an owl, so we can't tell she is a duck. Now do yours."];
    if (t === "yes") { h[1] = `Everything in the group of ${e.S} is also in the group of ${e.P}.`; return mcq(`${base}<br>${e.x} is ${e.s}.<br>Is ${e.x} ${e.p}?`, undefined, YES, ch, h); }
    if (t === "cant") { h[1] = `There are many kinds of ${e.P}, not only ${e.S}. Could ${e.x} be a different kind?`; return mcq(`${base}<br>${e.x} is ${e.p}.<br>Is ${e.x} ${e.s}?`, undefined, CANT, ch, h); }
    h[1] = `If ${e.x} were ${e.s}, ${e.x} would have to be ${e.p}. But it is not.`;
    return mcq(`${base}<br>${e.x} is <b>not</b> ${e.p}.<br>Is ${e.x} ${e.s}?`, undefined, NO, ch, h);
  };

  // ================= balance puzzles =================
  const SYM = ["🍎", "🍌", "🍇", "⭐", "🔔", "🍪", "🎈"];
  const scale = lv => () => {
    const [x, y, z] = shuf(SYM), a = ri(2, 9); let b = ri(2, 9); while (b === a) b = ri(2, 9);
    const mk = (lines, q, ans, h) => num(q, big(lines.join("<br>"), 1.4), ans, h);
    const types = lv === 4 ? ["two", "three"] : lv === 5 ? ["one", "total", "two2"] : ["back", "diff", "chain"];
    const t = pick(types);
    if (t === "two") return mk([`${x} + ${x} = ${2 * a}`], `What number is ${x}?`, a, ["Two of the same shape add up to the total. Split the total into two equal parts.", "Think: what number plus itself makes the total?", "Example: 🍪 + 🍪 = 14, so 🍪 is 7, because 7 + 7 = 14. Now do yours."]);
    if (t === "three") { const c = ri(2, 6); return mk([`${x} + ${x} + ${x} = ${3 * c}`], `What number is ${x}?`, c, ["Three of the same shape add up to the total. Split the total into three equal parts.", "Think: which number added three times makes the total? Try counting by 3s.", "Example: 🍪 + 🍪 + 🍪 = 12, so 🍪 is 4, because 4 + 4 + 4 = 12. Now do yours."]); }
    if (t === "one") return mk([`${x} = ${a}`, `${x} + ${y} = ${a + b}`], `What number is ${y}?`, b, ["Use the first line. You already know one shape.", `Put ${a} in place of ${x} in the second line. What must ${y} be to make the total?`, "Example: 🍪 = 3 and 🍪 + 🍎 = 10. So 3 + ? = 10, and 🍎 is 7. Now do yours."]);
    if (t === "total") return mk([`${x} = ${a}`, `${y} = ${b}`], `What is ${x} + ${x} + ${y}?`, 2 * a + b, ["You know what each shape is worth. Replace each one with its number.", "Write the sum with numbers. Add the first two, then add the last.", "Example: 🍪 = 3 and 🍎 = 5. 🍪 + 🍪 + 🍎 = 3 + 3 + 5 = 11. Now do yours."]);
    if (t === "two2") return mk([`${x} + ${x} = ${2 * a}`, `${x} + ${y} = ${a + b}`], `What number is ${y}?`, b, ["Start with the line that has only one kind of shape.", `From the first line find ${x}. Then use it in the second line.`, "Example: 🍪 + 🍪 = 8, so 🍪 is 4. Then 🍪 + 🍎 = 10 means 4 + ? = 10, so 🍎 is 6. Now do yours."]);
    if (t === "back") return mk([`${x} + ${x} = ${2 * a}`, `${x} + ${y} = ${a + b}`], `What is ${y} + ${y} + ${x}?`, 2 * b + a, ["First find what each shape is worth.", `Find ${x} from the first line. Then use it to find ${y}. Then add up the new line.`, "Example: 🍪 + 🍪 = 8 (so 🍪 = 4) and 🍪 + 🍎 = 10 (so 🍎 = 6). Then 🍎 + 🍪 + 🍪 = 6 + 4 + 4 = 14. Now do yours."]);
    if (t === "diff") return mk([`${x} + ${y} = ${a + b}`, `${x} + ${x} + ${y} = ${2 * a + b}`], `What number is ${x}?`, a, ["Compare the two lines. What is different between them?", `The second line has one more ${x}. How much bigger is its total?`, "Example: 🍪 + 🍎 = 9 and 🍪 + 🍪 + 🍎 = 12. The second total is 3 more, and it has one extra 🍪, so 🍪 is 3. Now do yours."]);
    const c = ri(2, 9);
    return mk([`${x} = ${a}`, `${x} + ${y} = ${a + b}`, `${y} + ${z} = ${b + c}`], `What number is ${z}?`, c, ["Work down the lines in order. Each line gives you a new shape.", `Use the first line to find ${y}. Then use ${y} in the last line.`, "Example: 🍪 = 2, 🍪 + 🍎 = 7 (so 🍎 = 5), and 🍎 + 🍇 = 9 (so 🍇 = 4). Now do yours."]);
  };

  // ================= missing numbers =================
  const eqMissing = () => {
    const t = pick(["a1", "a2", "s1", "s2", "tens"]), hi = 30;
    const eq = (s, ans, h2, ex) => num("Find the missing number.", big(s), ans, ["Think: what number goes in the box to make the sentence true?", h2, `Example: ${ex} Now do yours.`]);
    if (t === "a1") { const a = ri(2, 12), b = ri(2, hi - a); return eq(`❓ + ${a} = ${a + b}`, b, "To find a missing number in an adding problem, subtract the part you know from the total.", "❓ + 4 = 11. 11 − 4 = 7, so ❓ is 7."); }
    if (t === "a2") { const a = ri(2, 12), b = ri(2, hi - a); return eq(`${a} + ❓ = ${a + b}`, b, "Count up from the first number to the total, or subtract the part you know from the total.", "5 + ❓ = 12. Count up from 5 to 12 → 7 steps, so ❓ is 7."); }
    if (t === "s1") { const a = ri(2, 12), b = ri(2, hi - a); return eq(`❓ − ${a} = ${b}`, a + b, "The missing number is the start. Taking away " + a + " left " + b + ". What was there before?", "❓ − 3 = 8. Add back the 3: 8 + 3 = 11, so ❓ is 11."); }
    if (t === "s2") { const a = ri(10, hi), b = ri(2, a - 1); return eq(`${a} − ❓ = ${a - b}`, b, "How many were taken away to get from the start to what is left?", "15 − ❓ = 9. From 15 down to 9 is 6, so ❓ is 6."); }
    const a = ri(1, 8) * 10, b = ri(1, 8) * 10;
    return eq(`❓ + ${b} = ${a + b}`, a, "These are tens. Think of tens: how many tens are missing?", "❓ + 30 = 80. 8 tens minus 3 tens is 5 tens, so ❓ is 50.");
  };

  // ================= word pairs =================
  const an = (items, example) => () => {
    const [a, b, c, r, w, clue] = pick(items);
    return mcq(`<b>${a}</b> is to <b>${b}</b> as <b>${c}</b> is to ...?`, undefined, r, w, ["How are the first two words connected? Say it in a sentence.", clue, `Example: ${example} Now do yours.`]);
  };
  const AN1 = [
    ["Hand", "glove", "foot", "shoe", ["hat", "coat", "scarf"], "A glove is worn on a hand. What do you wear on a foot?"],
    ["Bird", "nest", "bee", "hive", ["pond", "cave", "barn"], "A nest is a bird's home. Where is a bee's home?"],
    ["Day", "night", "up", "down", ["high", "over", "sky"], "Day and night are opposites. What is the opposite of up?"],
    ["Cow", "milk", "hen", "eggs", ["wool", "honey", "fur"], "A cow gives us milk. What does a hen give us?"],
    ["Fish", "swim", "bird", "fly", ["run", "dig", "sleep"], "A fish moves by swimming. How does a bird move through the air?"],
    ["Eye", "see", "ear", "hear", ["smell", "taste", "touch"], "You see with your eye. What do you do with your ear?"],
    ["Puppy", "dog", "kitten", "cat", ["cow", "horse", "bird"], "A puppy is a baby dog. What is a kitten?"],
    ["Hot", "cold", "big", "small", ["tall", "huge", "wide"], "Hot and cold are opposites. What is the opposite of big?"],
    ["Teacher", "school", "doctor", "hospital", ["zoo", "farm", "store"], "A teacher works at a school. Where does a doctor work?"],
    ["Sun", "day", "moon", "night", ["rain", "cloud", "spring"], "The sun comes out in the day. When does the moon shine?"],
    ["Pencil", "write", "scissors", "cut", ["read", "sing", "jump"], "You write with a pencil. What do you do with scissors?"],
    ["Cold", "ice", "hot", "fire", ["snow", "water", "wind"], "Ice is very cold. What is very hot?"]
  ];
  const AN2 = [
    ["Calf", "cow", "lamb", "sheep", ["goat", "pig", "duck"], "A calf is a baby cow. What is a lamb?"],
    ["Wheel", "car", "wing", "airplane", ["road", "sky", "cloud"], "A wheel is part of a car. A wing is part of what?"],
    ["Page", "book", "petal", "flower", ["leaf", "tree", "seed"], "A page is part of a book. A petal is part of what?"],
    ["Spring", "flowers", "winter", "snow", ["sun", "beach", "swimming"], "Flowers bloom in spring. What do we often see in winter?"],
    ["Painter", "brush", "writer", "pen", ["paint", "paper", "easel"], "A painter paints with a brush. What does a writer write with?"],
    ["Finger", "hand", "toe", "foot", ["leg", "arm", "knee"], "A finger is part of a hand. A toe is part of a what?"],
    ["Dog", "bark", "cat", "meow", ["roar", "quack", "moo"], "A dog makes the sound bark. What sound does a cat make?"],
    ["Same", "different", "together", "apart", ["near", "close", "with"], "Same and different are opposites. What is the opposite of together?"],
    ["Second", "minute", "minute", "hour", ["day", "second", "week"], "60 seconds make a minute. What do 60 minutes make?"],
    ["Thermometer", "temperature", "ruler", "length", ["weight", "time", "color"], "A thermometer measures temperature. What does a ruler measure?"],
    ["Cub", "bear", "joey", "kangaroo", ["rabbit", "wolf", "lion"], "A cub is a baby bear. A joey is a baby what?"],
    ["Chef", "kitchen", "farmer", "farm", ["school", "ocean", "hospital"], "A chef works in a kitchen. Where does a farmer work?"]
  ];
  const numAn2 = () => {
    const r = pick(["double", "add", "sub", "half"]), k = r === "add" ? pick([5, 10, 20]) : pick([3, 5, 10]);
    let a, b, f;
    if (r === "double") { a = ri(2, 9); b = ri(10, 15); f = x => x * 2; }
    else if (r === "add") { a = ri(2, 9); b = ri(10, 40); f = x => x + k; }
    else if (r === "sub") { a = ri(12, 30); b = ri(31, 60); f = x => x - k; }
    else { a = 2 * ri(2, 9); b = 2 * ri(5, 9); f = x => x / 2; }
    return num(`<b>${a}</b> is to <b>${f(a)}</b> as <b>${b}</b> is to ...?`, undefined, f(b), [
      "How do you get from the first number to the second number?",
      "Find that rule (add, take away, double, or split in half) and use the same rule on the third number.",
      "Example: 10 is to 5 as 6 is to 3, because both numbers are cut in half. Now do yours."]);
  };

  // ================= days, chances, combos, codes, magic, sudoku =================
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayLogic = maxd => () => {
    const i = ri(0, 6), d = ri(2, maxd), t = pick(["after", "before", "yday"]);
    const hs = h2 => ["Count one day at a time. Say the day names in order.", h2, "Example: Today is Thursday. In 3 days: Friday, Saturday, Sunday → Sunday. (After Sunday comes Monday again.) Now do yours."];
    if (t === "after") return mcq(`Today is <b>${DAYS[i]}</b>. What day will it be in <b>${d} days</b>?`, "📅", DAYS[(i + d) % 7], uniq(DAYS.filter(x => x !== DAYS[(i + d) % 7]), 3), hs("Move forward one day at a time. After Sunday, start again at Monday."));
    if (t === "before") return mcq(`Today is <b>${DAYS[i]}</b>. What day was it <b>${d} days ago</b>?`, "📅", DAYS[((i - d) % 7 + 7) % 7], uniq(DAYS.filter(x => x !== DAYS[((i - d) % 7 + 7) % 7]), 3), hs("Move backward one day at a time. Before Monday comes Sunday."));
    return mcq(`<b>Yesterday</b> was ${DAYS[i]}. What day will it be <b>tomorrow</b>?`, "📅", DAYS[(i + 2) % 7], uniq(DAYS.filter(x => x !== DAYS[(i + 2) % 7]), 3), hs("First find today. Then find the day after today."));
  };
  const chances = () => {
    const cols = [["🔴", "red"], ["🔵", "blue"], ["🟢", "green"]], bag = cols.map(c => [c, ri(0, 6)]);
    const tot = bag.reduce((p, c) => p + c[1], 0), vis = big(bag.map(([c, n]) => c[0].repeat(n)).join(" ") || "—", 1.4);
    const hn = "Count how many marbles of each color are in the bag.";
    const t = pick(["chance", "chance", "most", "least"]);
    if (t === "chance") {
      const [c, n] = pick(bag), right = n === 0 ? "impossible" : n === tot ? "certain" : n * 2 > tot ? "likely" : n * 2 < tot ? "unlikely" : null;
      if (!right || tot < 2) return chances();
      return mcq(`You pick one marble from the bag without looking. How likely is it to be ${c[1]}?`, vis, right, ["certain", "likely", "unlikely", "impossible"], [hn, "Compare that color with the whole bag. None of it → can never happen. All of it → always happens. More than half → likely. Less than half → unlikely.", "Example: a bag with 5 🔴 and 1 🔵. A 🔴 is likely, a 🔵 is unlikely, and a 🟢 is impossible. Now do yours."]);
    }
    const counts = bag.map(b => b[1]), target = t === "most" ? Math.max(...counts) : Math.min(...counts.filter(x => x > 0));
    const hit = bag.filter(b => b[1] === target);
    if (hit.length !== 1 || tot < 3 || bag.filter(b => b[1] > 0).length < 2) return chances();
    const cs = bag.filter(b => b[1] > 0).map(b => b[0][1]);
    return mcq(`You pick one marble without looking. Which color are you ${t === "most" ? "<b>most</b>" : "<b>least</b>"} likely to pick?`, vis, hit[0][0][1], cs, [hn, t === "most" ? "The color with the biggest number of marbles is the most likely." : "The color with the smallest number of marbles (but at least one) is the least likely.", "Example: a bag with 4 🔴, 1 🔵 and 2 🟢. Most likely is red (4), least likely is blue (1). Now do yours."]);
  };
  const combos = () => {
    const t = pick(["outfit", "cone", "three", "fives"]), h2 = "Pick one of the first kind. How many choices does it have with the second kind? Do the same for each one.";
    if (t === "outfit") { const a = ri(2, 4), b = ri(2, 4); return num(`Zoe has ${a} shirts and ${b} pairs of pants. She picks one shirt and one pair of pants. How many different outfits can she make?`, big("👕".repeat(a) + " &nbsp; " + "👖".repeat(b), 1.5), a * b, ["Pick one shirt. How many pants can go with it?", h2, "Example: 2 hats and 3 scarves. Each hat goes with 3 scarves, so 3 + 3 = 6 (or 2 × 3 = 6) combos. Now do yours."]); }
    if (t === "cone") { const a = ri(2, 4), b = ri(2, 3); return num(`An ice cream stand has ${a} flavors and ${b} toppings. You pick one flavor and one topping. How many different treats can you make?`, big("🍦".repeat(a) + " &nbsp; " + "🍫".repeat(b), 1.5), a * b, ["Pick one flavor. How many toppings can go with it?", h2, "Example: 2 hats and 3 scarves. Each hat goes with 3 scarves, so 3 + 3 = 6 combos. Now do yours."]); }
    if (t === "three") { const a = ri(2, 3), b = ri(2, 3); return num(`Leo has ${a} shirts, ${b} pairs of pants and 2 hats. He picks one of each. How many different outfits can he make?`, big("👕".repeat(a) + " " + "👖".repeat(b) + " 🧢🎩", 1.4), a * b * 2, ["Find the outfits with shirts and pants first.", "Each of those outfits can go with either hat. So the number of outfits doubles.", "Example: 2 shirts, 2 pants and 3 hats. Shirts and pants make 4 outfits. Each one goes with 3 hats: 4 × 3 = 12. Now do yours."]); }
    const n = ri(3, 6);
    return num(`${n} friends each give every other friend one high-five. Each pair high-fives only once. How many high-fives happen?`, big("🙌".repeat(n), 1.4), n * (n - 1) / 2, ["Draw dots for the friends. Draw a line for each high-five.", "The first friend high-fives everyone else. The next friend has one fewer NEW high-fives, and so on. Add them up.", "Example: 3 friends A, B, C: A-B, A-C, B-C is 3 high-fives. With 4 friends it is 3 + 2 + 1 = 6. Now do yours."]);
  };
  const WD = ["cab", "bad", "bed", "dad", "bag", "fed", "bee", "add", "age", "ice", "fig", "hug", "jam", "gem"];
  const CW = ["cat", "dog", "cow", "pig", "hen", "bee", "ant", "sun", "car", "bus", "hat", "cup", "pen", "map", "top", "fox", "owl", "bat", "box", "bed"];
  const enc = (w, s) => w.split("").map(ch => String.fromCharCode((ch.charCodeAt(0) - 97 + s) % 26 + 97)).join("");
  const AL = Array.from({ length: 26 }, (_, i) => `${String.fromCharCode(65 + i)}=${i + 1}`).join(" ");
  const codeSum = () => {
    const w = pick(WD), v = w.split("").reduce((p, c) => p + c.charCodeAt(0) - 96, 0);
    return num(`In a secret code, each letter is worth its place in the alphabet. What do the letters of <b>${w.toUpperCase()}</b> add up to?`, `<small>${AL}</small>`, v, ["Find the number for each letter first.", "Write the three numbers down, then add them up.", "Example: the word “AID” is 1 + 9 + 4 = 14. Now do yours."]);
  };
  const codeShift = () => {
    const s = ri(1, 3), w = pick(CW), ex = "pin";
    return { text: `In a secret code, every letter moves <b>${s}</b> step${s > 1 ? "s" : ""} forward in the alphabet (A → ${String.fromCharCode(65 + s)}). The coded word is <b>${enc(w, s).toUpperCase()}</b>. What is the real word?`, visual: undefined, textInput: true, answer: w, hints: [
      "Each coded letter is further along in the alphabet than the real letter. So you need to go back.",
      `Undo the code: move every letter back ${s} step${s > 1 ? "s" : ""}. Do one letter at a time. (If you go back past A, jump to Z.)`,
      `Example: with this same code, “${enc(ex, s).toUpperCase()}” becomes “${ex}” because each letter moves back ${s}. Now do yours.`] };
  };
  const rotate = g => g[0].map((_, j) => g.map((_, i) => g[2 - i][j]));
  const magic = lv => () => {
    let g = [[2, 7, 6], [9, 5, 1], [4, 3, 8]];
    for (let i = ri(0, 3); i > 0; i--) g = rotate(g);
    if (Math.random() < 0.5) g = g.map(r => r.slice().reverse());
    const m = lv === 5 ? 1 : ri(1, 3), k = lv === 5 ? ri(0, 5) : ri(0, 10);
    g = g.map(r => r.map(v => v * m + k));
    const sum = 3 * (5 * m + k), cells = [];
    const r1 = ri(0, 2), c1 = ri(0, 2), ans = g[r1][c1], show = g.map(r => r.map(String));
    show[r1][c1] = "❓";
    if (lv === 6) { let r2, c2; do { r2 = ri(0, 2); c2 = ri(0, 2); } while (r2 === r1 || c2 === c1); show[r2][c2] = "⬜"; }
    const intro = lv === 5 ? `In a magic square every row, column and long corner-to-corner line adds up to <b>${sum}</b>.` : "In a magic square every row, column and long corner-to-corner line adds up to the same number. (The ⬜ box is empty too.)";
    return num(`${intro}<br>What number goes in the ❓ box?`, gridHtml(show), ans, [
      lv === 5 ? "Find the row or column with the ❓. The three boxes must add up to the magic number." : "First find the magic number. Look for a row or column with no empty box and add it up.",
      lv === 5 ? "Add the two numbers you can see in that line. How much more do you need to reach the magic number?" : "Now choose the line with the ❓ and one empty box that has only the ❓ missing. Add the numbers you can see and find what is needed.",
      "Example: a row shows 4, ❓ and 2, and the magic number is 12. 4 + 2 = 6, and 12 − 6 = 6. Now do yours."]);
  };
  const solveCount = (g, box) => {
    let cnt = 0;
    const ok = (r, c, v) => { for (let i = 0; i < 4; i++) if (g[r][i] === v || g[i][c] === v) return false; if (box) { const br = r & 2, bc = c & 2; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) if (g[br + i][bc + j] === v) return false; } return true; };
    const go = () => {
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (!g[r][c]) {
        for (let v = 1; v <= 4; v++) if (ok(r, c, v)) { g[r][c] = v; go(); g[r][c] = 0; if (cnt > 1) return; }
        return;
      }
      cnt++;
    };
    go(); return cnt;
  };
  const sudoku = () => {
    const base = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 3, 4, 1], [4, 1, 2, 3]], bands = shuf([0, 1]), rows = bands.flatMap(b => shuf([2 * b, 2 * b + 1])), cb = shuf([0, 1]), cols = cb.flatMap(b => shuf([2 * b, 2 * b + 1])), sy = shuf([1, 2, 3, 4]);
    const full = rows.map(r => cols.map(c => sy[base[r][c] - 1]));
    for (let k = 8; k >= 4; ) {
      const idx = shuf(Array.from({ length: 16 }, (_, i) => i)).slice(0, k), g = full.map(r => r.slice());
      idx.forEach(i => { g[Math.floor(i / 4)][i % 4] = 0; });
      if (solveCount(g.map(r => r.slice()), true) === 1) {
        const t = idx[0], show = g.map(r => r.map(v => v ? String(v) : "⬜")); show[Math.floor(t / 4)][t % 4] = "❓";
        return num("Fill the grid with 1, 2, 3 and 4. Each row, each column and each 2 × 2 box must have all four numbers once. What number goes in the ❓ box?", gridHtml(show), full[Math.floor(t / 4)][t % 4], [
          "Every row, column and 2 × 2 box needs 1, 2, 3 and 4 exactly once.",
          "Look at the row, the column and the 2 × 2 box of the ❓. Which numbers are already there? The number that is missing from all of them must be the one.",
          "Example: a row shows 1, 3, 4 and ❓. The only number missing from 1, 2, 3, 4 is 2. Now do yours."]);
      }
      if (Math.random() < 0.15) k--;
    }
  };

  // ================= mixed and challenge =================
  const mixOf = (title, lessons, intro, listTitles) => {
    const f = () => pick(lessons).make();
    return L(title, f, [S("Review time!", "🔄", intro), S("Remember", "🧠", listTitles ? "This quiz has puzzles from: " + lessons.map(l => l.title).join(", ") + "." : "This quiz mixes puzzles from the whole level: patterns, number machines, Venn diagrams, clue puzzles, grids, if/then logic and balance puzzles."), S("Tip", "💡", "Read every clue. Cross out answers that cannot be right. Check your answer before you tap.")]);
  };
  const finish = (lv, list) => {
    list.push(mixOf("Mixed practice", list.filter((_, i) => i % 3 === 0), "This lesson mixes puzzles you have learned in this level. Take your time.", true));
    list.push(mixOf(`Level ${lv} Challenge`, list.slice(0, 18), `Everything from level ${lv}. Think carefully, you can do it!`, false));
    return list;
  };

  // ================= LEVEL 4 =================
  const L4 = finish(4, [
    L("Number trails", seqStep([-2, -5, -10, 2, 3, 5, 10], 5, 99), [S("Number trails", "🔢", "A number trail goes up or down by the same amount each time."), S("Find the jump", "👣", "Look at two numbers next to each other. How far apart are they? That is the jump."), S("Tip", "💡", "Going down? Subtract the jump. Going up? Add it.")]),
    L("Long picture patterns", patternNth(2, 3, 12, false), [S("Patterns repeat", "🔴🔵🔴🔵", "A pattern has a small group that repeats again and again. We call it the core."), S("Far away pictures", "🔍", "To find the 10th picture, you do not need to draw all of them. Count by the size of the core."), S("Tip", "💡", "If the core has 3 pictures, then picture 3, 6, 9 and 12 all match the last picture of the core.")]),
    L("Fix the pattern", patternBreak, [S("A mistake!", "🙈", "Sometimes one picture breaks the pattern."), S("Find the core", "🔎", "Use the start of the pattern to find the core, the part that repeats."), S("Check each one", "✅", "Go through the pictures one at a time. The one that does not match is the mistake.")]),
    L("What is the rule?", seqRule, [S("Rules", "📏", "A rule tells you how to get from one number to the next."), S("Add or subtract", "➕➖", "Rules like 'add 4' or 'subtract 3' are used all the time."), S("Tip", "💡", "Test your rule on every pair of numbers.")]),
    L("Number machines", machine(["add", "sub"], 20), [S("Magic machines", "⚙️", "A machine takes a number IN, changes it by a rule and sends a number OUT."), S("Follow the rule", "📥➡️📤", "If the machine adds 3 and you put in 5, then 8 comes out."), S("Tip", "💡", "Always start with the IN number.")]),
    L("Which number does not fit?", oddNum(["even", "m5", "m10"]), [S("Number groups", "🔢", "Numbers can belong to groups, like even numbers or the 5 times table."), S("Even numbers", "2 4 6 8", "Even numbers end in 0, 2, 4, 6 or 8. Odd numbers end in 1, 3, 5, 7 or 9."), S("Times tables", "5 10 15", "Numbers in the 5 times table end in 0 or 5. Numbers in the 10 times table end in 0.")]),
    L("Venn: counting", vennCount(["a", "b", "both", "only"]), [S("Venn diagrams", "⭕⭕", "A Venn diagram uses overlapping circles to sort things."), S("Three parts", "🟥🟪🟦", "Left part: only the first thing. Middle: both. Right part: only the second thing."), S("Tip", "💡", "A whole circle is its own 'Only' part PLUS the 'Both' part.")]),
    L("Venn: where does it go?", vennPlace, [S("Two questions", "❓❓", "Each thing gets two questions, one for each circle."), S("Where it goes", "📍", "Yes and yes → the middle. Yes to one → that circle only. No to both → outside the circles."), S("Tip", "💡", "Ask the questions one at a time.")]),
    L("Who is first?", rank(4), [S("Order clues", "📋", "Clues like 'Ann is taller than Bo' help you put people in a line."), S("Link the clues", "🔗", "If Ann is taller than Bo and Bo is taller than Cy, then the line is Ann, Bo, Cy."), S("Tip", "💡", "Find the name that is never the smaller one. That is first!")]),
    L("Who has what?", logicGrid(3, 2), [S("Matching puzzles", "🧩", "Each person has one thing, and no two people have the same thing."), S("Cross out", "❌", "A 'does not' clue crosses out one box. A 'has' clue tells you the answer for that person."), S("Tip", "💡", "When a person has only one box left, it is theirs. Cross it out for the others.")]),
    L("Number riddles", numRiddle(10, 50, 4), [S("Riddle clues", "🕵️", "Each clue crosses out many numbers."), S("Useful clues", "🔎", "Clues about even or odd, tens and ones digits, and times tables help a lot."), S("Tip", "💡", "Always test your answer against every clue.")]),
    L("Grid treasure", gridAt, [S("Rows and columns", "🔲", "Rows go across. Columns go up and down."), S("Find a spot", "📍", "Row 2, column 3 means: go down to the 2nd row, then over to the 3rd square."), S("Tip", "💡", "Row 1 is the top row. Column 1 is the left column.")]),
    L("Grid moves", gridMove(3, 2, 2), [S("Moving on a grid", "🧭", "Moves tell you which way to go and how many squares."), S("Directions", "⬆️⬇️⬅️➡️", "Up is toward the top row. Down is toward the bottom row. Left and right slide along the row."), S("Tip", "💡", "Put your finger on the start and move one square at a time.")]),
    L("AND, OR, NOT", andOrNot(["and", "or", "not"]), [S("AND", "✅✅", "<b>AND</b> means BOTH clues must be true."), S("OR", "✅❌", "<b>OR</b> means at least ONE clue is true."), S("NOT", "🚫", "<b>NOT</b> means the opposite. 'NOT red' means any color except red.")]),
    L("If this, then that", ifThen(["mp", "mp", "affirm"]), [S("If, then", "➡️", "'If it rains, then the street is wet.' This is a rule."), S("Using the rule", "☔", "If the first part is true, the second part must be true too."), S("Careful!", "⚠️", "If only the second part is true, you can't tell. The street could be wet for another reason.")]),
    L("Balance puzzles", scale(4), [S("Same shapes", "⚖️", "A shape stands for a hidden number."), S("Two the same", "🍎+🍎", "If 🍎 + 🍎 = 10, then each 🍎 is half of 10."), S("Tip", "💡", "Check your answer by putting the number back into the puzzle.")]),
    L("Missing numbers", eqMissing, [S("The box", "❓", "A box ❓ hides a number. Your job is to find it."), S("Opposite jobs", "🔁", "Adding and taking away undo each other. Use the opposite to find the box."), S("Tip", "💡", "Put your answer back in. Does the sentence work?")]),
    L("Word pairs", an(AN1, "Sock is to foot as hat is to head, because both are worn on that body part."), [S("Word pairs", "🔗", "'Hand is to glove' tells how two words go together."), S("Same link", "↔️", "Then 'foot is to ...' uses the SAME link, so you find the word that goes with foot."), S("Tip", "💡", "Say the link in a sentence, like 'A glove goes on a hand'.")])
  ]);

  // ================= LEVEL 5 =================
  const L5 = finish(5, [
    L("Days and dates", dayLogic(6), [S("Days in order", "📅", "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Then Monday starts again!"), S("Count on", "👆", "To find the day in 3 days, count forward 3 days from today."), S("Tip", "💡", "Going back in time? Count backward. Yesterday is one day back.")]),
    L("Up and down patterns", seqAlt, [S("Two jumps", "↕️", "Some patterns use two different jumps, one after the other."), S("Example", "2, 5, 6, 9, 10", "The jumps are +3, +1, +3, +1... they repeat."), S("Tip", "💡", "Write each jump between the numbers. Then see which one comes next.")]),
    L("Doubling and halving", seqMul, [S("Fast growing", "📈", "Some patterns multiply. 2, 4, 8, 16 doubles each time."), S("Splitting", "✂️", "Other patterns divide. 80, 40, 20, 10 halves each time."), S("Tip", "💡", "If the jumps are not the same, try multiplying or dividing.")]),
    L("Far away pictures", patternNth(3, 4, 30, true), [S("Big numbers", "🔭", "To find the 25th picture, use the core length. Counting by the core size gets you close fast."), S("Leftovers", "➗", "Find how many full groups fit. The pictures left over tell you which one it is."), S("Tip", "💡", "If the core has 4 pictures, picture 24 ends a group, so picture 25 starts the next one.")]),
    L("Two-step machines", machine(["add", "sub", "mul", "mulAdd"], 12), [S("Bigger machines", "⚙️", "Some machines do two things, like 'multiply by 2, then add 1'."), S("In order", "1️⃣2️⃣", "Do the steps in the order they are given."), S("Tip", "💡", "Write each step down: first the multiplying, then the adding.")]),
    L("Find the machine rule", machineRule(["add", "sub", "mul", "mulAdd"]), [S("Secret rules", "🕵️", "You see some IN and OUT numbers. Can you work out the rule?"), S("Try a rule", "🧪", "Guess a rule from the first row, then test it on the other rows."), S("Tip", "💡", "A rule is only right if it works for EVERY row.")]),
    L("Number groups", oddNum(["even", "m3", "m4", "m5", "m10"]), [S("Groups", "🔢", "The 3 times table is 3, 6, 9, 12, 15. The 4 times table is 4, 8, 12, 16, 20."), S("Test a number", "🧪", "To test 21 for the 3 times table, count by 3s: 3, 6, 9, 12, 15, 18, 21. Yes!"), S("Tip", "💡", "Say the times table to yourself and look for the number.")]),
    L("Venn: more counting", vennCount(["one", "all", "any", "a", "b", "neither"]), [S("Four parts", "🟥🟪🟦⬜", "Only the first, both, only the second, and neither (outside the circles)."), S("Exactly one", "1️⃣", "'Exactly one' means only-first plus only-second. Leave out the middle."), S("Tip", "💡", "'At least one' means everything inside the circles. 'In all' adds the outside too.")]),
    L("Order of five", rank(5), [S("Longer lines", "📋", "With five people the clues make a longer chain."), S("Middle and ends", "↔️", "In a line of five, the 3rd place is the middle."), S("Tip", "💡", "Write the order on paper, one name at a time.")]),
    L("Logic grid", logicGrid(3, 0), [S("Only 'does not' clues", "❌", "Sometimes all the clues say what someone does NOT have."), S("Eliminate", "🧹", "Cross out each 'not'. A person with one box left has found their match."), S("Tip", "💡", "Then cross that match off for the other people. Keep going!")]),
    L("Truth-tellers and liars", truthBasic, [S("Two kinds of people", "🗣️", "A truth-teller always says what is true. A liar always says what is false."), S("Flip it", "🔄", "If a liar says it is in the bag, it is NOT in the bag."), S("Tip", "💡", "With only two places, 'not here' means 'the other place'.")]),
    L("Bigger riddles", numRiddle(10, 99, 5), [S("Bigger numbers", "🔢", "Now the numbers go up to 99."), S("Start big", "🎯", "Clues about digits add up and times tables remove the most numbers."), S("Tip", "💡", "List a few possible numbers and test them one by one.")]),
    L("Grid coordinates", gridWhere(4), [S("(x, y)", "📍", "A place on a grid can be written as (x, y). x is across, y is up."), S("Start at the corner", "⬅️⬇️", "Start at the bottom-left corner. Go across x squares, then up y squares."), S("Tip", "💡", "Always say across first, then up.")]),
    L("Chances", chances, [S("How likely?", "🎲", "Some things are certain, likely, unlikely or impossible."), S("Marbles", "🔴🔵", "If a bag has only red marbles, picking red is certain and picking blue is impossible."), S("Tip", "💡", "More marbles of a color means more likely.")]),
    L("If, then, or can't tell", ifThen(["mp", "affirm", "deny"]), [S("Rules", "➡️", "'If A, then B' means: when A is true, B must be true."), S("Careful", "⚠️", "If B is true, you can't tell about A. If A is not true, you can't tell about B."), S("Tip", "💡", "Only 'A is true' gives you a sure answer.")]),
    L("Balance puzzles", scale(5), [S("Two shapes", "🍎🍌", "Different shapes can have different numbers."), S("Swap in", "🔁", "If 🍎 = 4, replace each 🍎 with 4 in the other lines."), S("Tip", "💡", "Do one line at a time.")]),
    L("Magic squares", magic(5), [S("Magic squares", "🔮", "In a magic square every row, column and corner line adds to the same number."), S("Find the box", "🔍", "Find the line with the empty box. Add the other two numbers."), S("Tip", "💡", "The empty box is the magic number minus the two numbers you see.")]),
    L("Word pairs", mix2(an(AN2, "Ring is to finger as crown is to head, because both are worn on that body part."), numAn2), [S("Link the words", "🔗", "A word pair has a link, like 'part of', 'baby of', 'opposite' or 'used for'."), S("Number pairs", "🔢", "Number pairs have a link too: add, take away, double or half."), S("Tip", "💡", "Say the link out loud, then use it on the second pair.")])
  ]);
  function mix2(a, b) { const f = () => (Math.random() < 0.6 ? a : b)(); return f; }

  // ================= LEVEL 6 =================
  const L6 = finish(6, [
    L("Special number patterns", seqSpecial, [S("Famous patterns", "🌟", "Some patterns are special: square numbers (1, 4, 9, 16), and numbers with growing gaps (1, 3, 6, 10)."), S("Add the last two", "➕", "Another famous pattern adds the last two numbers: 1, 1, 2, 3, 5, 8."), S("Tip", "💡", "Write the gaps. If the gaps are not the same, look at how the gaps change.")]),
    L("The pattern in place n", nthTerm, [S("Place numbers", "🔢", "Every number in a pattern has a place: 1st, 2nd, 3rd, and so on."), S("Same jump", "👣", "If the pattern grows by the same amount each time, you can jump straight to a far-away place."), S("Tip", "💡", "Count how many steps from a place you know, then multiply by the jump.")]),
    L("Secret codes", mix2(codeSum, codeShift), [S("Letters as numbers", "🔤", "A=1, B=2, C=3... Letters can be turned into numbers."), S("Shift codes", "🔐", "In a shift code every letter moves forward the same number of steps. A→B, B→C if the shift is 1."), S("Decode", "🔓", "To decode, move every letter back by the same number. After Z comes A again.")]),
    L("Machines backwards", machineBack(["add", "sub", "mul", "mulAdd", "mulSub"], 15), [S("Backwards", "⏪", "You see what comes OUT and need to find what went IN."), S("Undo", "↩️", "Undo the steps in the opposite order. Add ↔ subtract. Multiply ↔ divide."), S("Check", "✅", "Run the machine forward with your answer. Do you get OUT?")]),
    L("Hard machine rules", machineRule(["mul", "mulAdd", "mulSub"]), [S("Two-step rules", "⚙️", "Rules can multiply and then add or subtract."), S("Find the first step", "🔎", "Look at how the OUT numbers grow when IN goes up by 1. That is the number you multiply by."), S("Then fix", "🔧", "After multiplying, see what you must add or subtract to match the OUT number.")]),
    L("Harder number groups", oddNum(["m3", "m4", "m6", "m7", "m9", "sq"]), [S("More groups", "🔢", "Times tables for 6, 7 and 9 and square numbers are special groups."), S("Square numbers", "⬛", "1, 4, 9, 16, 25... A square number is a number times itself, like 5 × 5 = 25."), S("Tip", "💡", "Count by the number in the question until you pass the one you are checking.")]),
    L("Venn: find the overlap", vennBoth, [S("Overlap", "🔀", "Kids who like both things are counted in both groups."), S("Too many", "➕", "If you add the two group sizes, the 'both' kids are counted twice."), S("Fix it", "🧮", "Subtract the real number of kids who like at least one. What is left over is 'both'.")]),
    L("All, some, none", syllogism, [S("Groups inside groups", "🧺", "'All dogs are animals' means dogs are a small group inside the big group of animals."), S("What you can know", "✅", "If Rex is a dog, then Rex is an animal for sure."), S("What you can't know", "❓", "If Tom is an animal, he might be a dog, a cat or something else. You can't tell.")]),
    L("Order of six", rank(6), [S("Long lines", "📋", "With six people, link all the clues into one line."), S("Count from an end", "👆", "4th from the tallest end is the same as 3rd from the shortest end."), S("Tip", "💡", "Write the names in a column as you link each clue.")]),
    L("Logic grid with four", logicGrid(4, 2), [S("Four and four", "🧩", "With four people and four things you need more clues."), S("Table", "📊", "Draw a table. Cross out boxes for 'not' clues. Circle boxes for 'has' clues."), S("Tip", "💡", "When you circle a box, cross out the rest of its row and column.")]),
    L("Truth-teller chains", truthChain, [S("What people say", "🗣️", "A person can talk about another person: “Bo always lies.”"), S("True or false?", "⚖️", "First decide if the sentence is true or false."), S("Then the speaker", "🎯", "A truth-teller says only true sentences. A liar says only false sentences.")]),
    L("Three-digit riddles", numRiddle(100, 400, 5), [S("Three digits", "🔢", "Now the numbers have hundreds, tens and ones."), S("Digit clues", "🔎", "'The hundreds digit is 3' means the number is from 300 to 399."), S("Tip", "💡", "Use big clues first, then test the rest.")]),
    L("Long grid moves", gridMove(5, 3, 3), [S("Bigger grid", "🗺️", "On a 5 by 5 grid, moves can be longer."), S("Group the steps", "👣", "'Right 3' is three squares to the right, one square at a time."), S("Tip", "💡", "Never go past the edge of the grid.")]),
    L("Counting choices", combos, [S("Combos", "👕👖", "With 3 shirts and 2 pairs of pants, each shirt goes with each pair."), S("Multiply", "✖️", "3 shirts × 2 pants = 6 outfits."), S("Handshakes", "🙌", "For friends who each high-five once, add: with 4 friends it is 3 + 2 + 1.")]),
    L("If, then: all kinds", ifThen(["mp", "tollens", "affirm", "deny"]), [S("Rule", "➡️", "'If A, then B' means: when A is true, B must be true."), S("Backwards check", "🔄", "If B is NOT true, then A cannot be true either. If A were true, B would have to be."), S("Can't tell", "❓", "If B is true, or A is not true, you can't tell about the other one.")]),
    L("Balance puzzles: three steps", scale(6), [S("Many lines", "⚖️", "Use one line to learn about one shape. Then use that shape in the next line."), S("Compare lines", "🔍", "If two lines are almost the same, the difference tells you a shape."), S("Tip", "💡", "Write the number next to the shape each time you learn it.")]),
    L("Bigger magic squares", magic(6), [S("No magic number", "🔮", "Now you must find the magic number yourself."), S("Find it", "🔍", "Look for a row or column with no empty box and add it up. That is the magic number."), S("Then", "🧩", "Use the magic number to fill the empty boxes.")]),
    L("Mini sudoku", sudoku, [S("Sudoku rules", "🔢", "Use 1, 2, 3 and 4. Each row, each column and each 2 × 2 box has every number once."), S("Look for one blank", "👀", "Find a row, column or box with only one blank. That blank is easy."), S("Tip", "💡", "Check the row, the column and the box for the ❓.")])
  ]);

  Object.assign(LOGIC_LEVELS, { 4: L4, 5: L5, 6: L6 });
})();
