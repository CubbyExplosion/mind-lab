// ext/coding-10-12.js  Mind Lab Coding levels 10-12 (60 lessons, unplugged pseudo-code)
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = t => [
    S("Review time!", "🔄", "This lesson mixes ideas you already know. Take your time and think about each one."),
    S("Remember", "🧠", t),
    S("Tip", "💡", "Go slowly. Trace the code one line at a time and write down the numbers as you go.")
  ];
  const ind = n => "&nbsp;&nbsp;&nbsp;".repeat(n);
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const numChoices = (a, spread) => {
    const s = new Set([a]); let t = 0;
    while (s.size < 4 && t++ < 200) { const d = a + ri(-spread, spread); if (d !== a && d >= 0) s.add(d); }
    return shuf([...s]);
  };
  const nk = x => String(x).toLowerCase().replace(/[^a-z0-9]/g, "");
  const strChoices = (right, wrongs) => { const seen = new Set([nk(right)]), out = []; for (const w of wrongs) { if (!seen.has(nk(w))) { seen.add(nk(w)); out.push(w); } } return shuf([right, ...out.slice(0, 3)]); };
  const num = (text, answer, hints, visual) => ({ text, visual, answer, hints });
  const txt = (text, answer, hints, visual) => ({ text, visual, textInput: true, answer, hints });
  const mc = (text, right, wrongs, hints, visual) => ({ text, visual, choices: strChoices(right, wrongs), answer: right, hints });
  const nc = (text, answer, spread, hints, visual) => ({ text, visual, choices: numChoices(answer, spread), answer, hints });
  const lst = a => "[" + a.join(", ") + "]";
  const uniq = (n, lo, hi) => shuf(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: strChoices(r, w), answer: r, hints: [nudge, c, example] };
  };

  // =====================================================================
  // LEVEL 10
  // =====================================================================
  const gridCell = () => {
    const R = ri(3, 4), C = ri(3, 4);
    const g = Array.from({ length: R }, () => Array.from({ length: C }, () => ri(1, 9)));
    const r = ri(0, R - 1), c = ri(0, C - 1);
    return nc(`What is <b>grid[${r}][${c}]</b>?`, g[r][c], 4, [
      "In grid[row][column], the first number picks the row and the second picks the column. Both count from zero.",
      "Find the row first (count from the top, starting at zero). Then move along that row to the right column.",
      "Example: g = [[5, 6], [7, 8]]. g[1][0]: row one is [7, 8], and its first item is 7. Now do yours."
    ], code(["grid = ["].concat(g.map((row, i) => ind(1) + lst(row) + (i < R - 1 ? "," : "")), ["]"])));
  };

  const gridSum = () => {
    const kind = pick(["row", "col", "diag"]);
    const R = ri(3, 4), C = kind === "diag" ? R : ri(3, 4);
    const g = Array.from({ length: R }, () => Array.from({ length: C }, () => ri(1, 9)));
    const vis = code(["grid = ["].concat(g.map((row, i) => ind(1) + lst(row) + (i < R - 1 ? "," : "")), ["]"]));
    let s = 0, label;
    if (kind === "row") { const r = ri(0, R - 1); s = g[r].reduce((a, b) => a + b, 0); label = `row ${r}`; }
    else if (kind === "col") { const c = ri(0, C - 1); for (let r = 0; r < R; r++) s += g[r][c]; label = `column ${c}`; }
    else { for (let i = 0; i < R; i++) s += g[i][i]; label = "the diagonal grid[0][0], grid[1][1], grid[2][2] ..."; }
    return num(`What is the sum of <b>${label}</b>?`, s, [
      "A row goes across and a column goes down. Rows and columns both count from zero.",
      "Write down only the numbers you need, then add them up. The diagonal uses the same number for the row and the column.",
      "Example: g = [[1, 2], [3, 4]]. Row 1 is 3 and 4, so its sum is 7. Column 0 is 1 and 3, so its sum is 4. Now do yours."
    ], vis);
  };

  const CW = ["cat", "sun", "moon", "star", "code", "bug", "game", "loop", "robot", "pixel", "apple", "tree"];
  const concatQ = () => {
    let a = pick(CW), b = pick(CW); while (a === b) b = pick(CW);
    const t = ri(0, 3);
    const gl = [
      "The plus sign between two pieces of text glues them together, end to start. It does not add numbers.",
      "Write the first piece, then write the second piece right after it. A space only appears if you put one inside the quotes.",
      "Example: x = \"pan\", y = \"cake\". x + y glues them into pancake. Now do yours."
    ];
    if (t === 0) return txt("What does print(a + b) show?", a + b, gl, code([`a = "${a}"`, `b = "${b}"`, "print(a + b)"]));
    if (t === 1) return txt("What does print(a + \"-\" + b) show?", a + "-" + b, gl, code([`a = "${a}"`, `b = "${b}"`, "print(a + \"-\" + b)"]));
    if (t === 2) return num("How many letters are in the text that print(a + b) shows?", (a + b).length, [
      "First glue the two words together. Then count every letter of the new word.",
      "You can also count the letters of each word and put the two counts together.",
      "Example: x = \"sky\", y = \"fall\". Glued: skyfall. That has 3 + 4 = 7 letters. Now do yours."
    ], code([`a = "${a}"`, `b = "${b}"`, "print(a + b)"]));
    const w = pick(["ha", "go", "yo", "no", "ok"]), n = ri(2, 4);
    return txt(`In this code, text * n repeats the text n times. What does print(w * ${n}) show?`, w.repeat(n), [
      "A string times a number repeats the string that many times, one copy after another.",
      "Write the small piece again and again, all in one row with no spaces.",
      "Example: z = \"la\" and z * 3 makes lalala. Now do yours."
    ], code([`w = "${w}"`, `print(w * ${n})`]));
  };

  const SW = ["robot", "pixel", "python", "coder", "laptop", "screen", "keyboard", "loop", "cursor", "window"];
  const stringFn = () => {
    const w = pick(SW), t = ri(0, 3);
    if (t === 0) return num(`What is len(word)?`, w.length, [
      "len() counts every character in the text.",
      "Point at each letter and count them one at a time.",
      "Example: len(\"apple\") is 5 because a-p-p-l-e has five letters. Now do yours."
    ], code([`word = "${w}"`, "print(len(word))"]));
    if (t === 1) return txt("What does word.upper() give?", w.toUpperCase(), [
      "upper() changes every letter into a capital letter.",
      "Write the same word again, with each letter as a capital.",
      "Example: \"hello\".upper() gives HELLO. Now do yours."
    ], code([`word = "${w}"`, "print(word.upper())"]));
    if (t === 2) { const i = ri(0, w.length - 1); return txt(`What is word[${i}]?`, w[i], [
      "Letters have positions too, and the first letter is position zero.",
      "Count the letters from the left. The number in brackets is how many steps to move from the first letter.",
      "Example: in \"banana\", word[1] is a, because b is position zero and a is next. Now do yours."
    ], code([`word = "${w}"`, `print(word[${i}])`])); }
    const letter = pick([...new Set(w.split(""))]);
    const ans = w.split(letter).join("*");
    return txt(`What does word.replace("${letter}", "*") give?`, ans, [
      "replace(old, new) swaps every copy of the old letter for the new one. Other letters stay the same.",
      "Go through the word one letter at a time and change only the matching letters.",
      "Example: \"banana\".replace(\"a\", \"#\") gives b#n#n#. Now do yours."
    ], code([`word = "${w}"`, `print(word.replace("${letter}", "*"))`]));
  };

  const typeQ = () => {
    const a = ri(2, 9), b = ri(2, 9), t = ri(0, 3);
    if (t === 0) return mc("What does this program print?", `${a}${b}`, [String(a + b), String(a * b), String(Math.abs(a - b))], [
      "Look at the quote marks. Text in quotes is a string, not a number.",
      "With strings, the plus sign glues the pieces together instead of adding.",
      "Example: x = \"4\", y = \"6\". x + y glues the text into 46, it does not make 10. Now do yours."
    ], code([`a = "${a}"`, `b = "${b}"`, "print(a + b)"]));
    if (t === 1) return mc("What does this program print?", String(a + b), [`${a}${b}`, String(a * b), String(a + b + 1)], [
      "Look at the quote marks. No quotes means these are real numbers.",
      "With real numbers, the plus sign does maths.",
      "Example: x = 4, y = 6. x + y is 10, because these are numbers. Now do yours."
    ], code([`a = ${a}`, `b = ${b}`, "print(a + b)"]));
    if (t === 2) { const n = ri(10000, 99999); return num(`What does len("${n}") give? (The quotes make it text.)`, 5, [
      "len() counts characters. The quotes mean the digits are just characters.",
      "Count the digits one at a time.",
      "Example: len(\"2024\") is 4 because it has four characters. Now do yours."
    ]); }
    const s = ri(100, 999);
    return num(`What does len("${s}") give? (The quotes make it text.)`, 3, [
      "len() counts characters. The quotes mean the digits are just characters.",
      "Count the digits one at a time.",
      "Example: len(\"2024\") is 4 because it has four characters. Now do yours."
    ]);
  };

  const divmodQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const m = ri(65, 400), hrs = Math.floor(m / 60), left = m % 60, ask = pick(["h", "m"]);
      return num(ask === "h" ? `A video is ${m} minutes long. How many <b>full hours</b> is that? (hours = minutes div 60)` : `A video is ${m} minutes long. After the full hours, how many <b>minutes are left</b>? (left = minutes mod 60)`, ask === "h" ? hrs : left, [
        "div gives how many whole groups fit. mod gives what is left over.",
        "Count how many groups of sixty fit into the number. The part that does not fit is the leftover.",
        "Example: 130 minutes. Two groups of 60 fit (120), so 130 div 60 = 2 and 130 mod 60 = 10. Now do yours."
      ]); }
    if (t === 1) { const d = ri(3, 9), n = ri(20, 80), ask = pick(["div", "mod"]);
      return num(`What is ${n} ${ask} ${d}?`, ask === "div" ? Math.floor(n / d) : n % d, [
        "div gives how many whole times the small number fits. mod gives what is left over after that.",
        "Count by the small number until you cannot go further without passing the big number.",
        "Example: 23 div 5 = 4 because 5 x 4 = 20, and 23 mod 5 = 3 because 23 - 20 = 3. Now do yours."
      ]); }
    const box = ri(4, 12), eggs = ri(box * 2 + 1, box * 6 - 1), full = Math.floor(eggs / box);
    return num(`${eggs} eggs go into boxes that hold ${box}. How many <b>full boxes</b> can you make?`, full, [
      "This is div: how many whole groups fit.",
      "Ask how many times the box size fits into the number of eggs.",
      "Example: 17 eggs, boxes of 4. Four boxes use 16 eggs, so 4 full boxes, and 1 egg is left. Now do yours."
    ]);
  };

  const countAbove = () => {
    const a = Array.from({ length: 8 }, () => ri(1, 20)), t = ri(8, 13);
    const big = a.filter(x => x > t);
    if (big.length < 2) return countAbove();
    const sum = Math.random() < 0.5;
    return num(sum ? "What does it print? (the total of the items that pass the test)" : "What does it print?", sum ? big.reduce((x, y) => x + y, 0) : big.length, [
      "Go through the list in order. Only act on an item when the IF test is true.",
      "Keep one running box and update it only for the items that pass the test.",
      "Example: list [3, 9, 5], test x &gt; 4. Items 9 and 5 pass. A counter ends at 2, a total ends at 14. Now do yours."
    ], code([`list = ${lst(a)}`, "box = 0", "for each x in list:", ind(1) + `IF x &gt; ${t}:`, ind(2) + (sum ? "box = box + x" : "box = box + 1"), "print(box)"]));
  };

  const WD = [
    ["adds up all the numbers", l => ["t = 0", "for each x in list:", ind(1) + "t = t + x", "print(t)"]],
    ["counts the even numbers", l => ["t = 0", "for each x in list:", ind(1) + "IF x mod 2 == 0:", ind(2) + "t = t + 1", "print(t)"]],
    ["finds the biggest number", l => ["t = list[0]", "for each x in list:", ind(1) + "IF x &gt; t:", ind(2) + "t = x", "print(t)"]],
    ["finds the smallest number", l => ["t = list[0]", "for each x in list:", ind(1) + "IF x &lt; t:", ind(2) + "t = x", "print(t)"]],
    ["counts how many items are in the list", l => ["t = 0", "for each x in list:", ind(1) + "t = t + 1", "print(t)"]],
    ["adds up only the even numbers", l => ["t = 0", "for each x in list:", ind(1) + "IF x mod 2 == 0:", ind(2) + "t = t + x", "print(t)"]],
    ["finds the average", l => ["t = 0", "for each x in list:", ind(1) + "t = t + x", "print(t div len(list))"]],
    ["counts the numbers bigger than 5", l => ["t = 0", "for each x in list:", ind(1) + "IF x &gt; 5:", ind(2) + "t = t + 1", "print(t)"]],
    ["multiplies all the numbers together", l => ["t = 1", "for each x in list:", ind(1) + "t = t * x", "print(t)"]]
  ];
  const whatDoes = () => {
    const i = ri(0, WD.length - 1), a = Array.from({ length: 5 }, () => ri(1, 12));
    const wrongs = WD.filter((_, k) => k !== i).map(w => w[0]);
    return mc("What does this code do?", WD[i][0], shuf(wrongs), [
      "Do not worry about the exact numbers. Look at what the loop does to the box on every round.",
      "Check three things: how the box starts, whether there is an IF inside the loop, and what is printed at the end.",
      "Example: a box starts at 0 and gets 1 added only when x is bigger than 100. That counts how many items are over a hundred. Now do yours."
    ], code([`list = ${lst(a)}`].concat(WD[i][1](a))));
  };

  const whileTwo = () => {
    for (;;) {
      const op = pick(["+", "*"]); let x, k, lim;
      if (op === "+") { k = ri(2, 6); x = ri(0, 5); lim = x + k * ri(3, 6) + ri(0, k - 1); }
      else { k = pick([2, 3]); x = ri(1, 3); lim = ri(20, 120); }
      let v = x, s = 0; while (v < lim && s < 50) { v = op === "+" ? v + k : v * k; s++; }
      if (s < 2 || s > 8) continue;
      const ask = pick(["steps", "x"]);
      return num(`What is <b>${ask}</b> when the loop ends?`, ask === "steps" ? s : v, [
        "A while loop tests its condition before every round. It stops the first time the test is false.",
        "Make a small table with a column for x and a column for steps. Add a new row for each round.",
        "Example: x = 1, steps = 0, while x &lt; 10: x = x + 4, steps = steps + 1. Rounds: x 5 (steps 1), x 9 (steps 2), x 13 (steps 3). Now 13 is not less than 10, so stop. Now do yours."
      ], code([`x = ${x}`, "steps = 0", `while x &lt; ${lim}:`, ind(1) + `x = x ${op} ${k}`, ind(1) + "steps = steps + 1"]));
    }
  };

  const countdown = () => {
    const t = ri(0, 2);
    if (t === 0) { const s = pick([2, 3]), b = ri(1, 4), a = b + s * ri(2, 5); let tot = 0; for (let i = a; i >= b; i -= s) tot += i;
      return num("What is <b>total</b> at the end?", tot, [
        "The loop counts downward. The step says how much to take away each time.",
        "List every value i takes, from the start down to the end, stopping before you go past the end number. Then add them.",
        "Example: for i from 9 down to 3 step 3 uses 9, 6 and 3. Their sum is 18. Now do yours."
      ], code(["total = 0", `for i from ${a} down to ${b} step ${s}:`, ind(1) + "total = total + i"])); }
    if (t === 1) { const s = pick([2, 3, 4]), a = ri(3, 9) * s + ri(0, s - 1), b = 0; let n = 0;
      for (let i = a; i > b; i -= s) n++;
      return num("How many times does the loop body run?", n, [
        "Each round takes away the step from n. The loop keeps going while n is more than zero.",
        "Write the value of n before each round and stop when it is no longer more than zero.",
        "Example: n = 10, take away 4 each time: 10, 6, 2 are all more than 0, then n becomes -2. That is 3 rounds. Now do yours."
      ], code([`n = ${a}`, "count = 0", "while n &gt; 0:", ind(1) + `n = n - ${s}`, ind(1) + "count = count + 1"])); }
    const a = ri(5, 12), s = pick([1, 2]); let n = 0;
    for (let i = a; i >= 1; i -= s) n++;
    return num(`How many numbers does this print?`, n, [
      "The loop starts at the top number and counts down. Count each number that gets printed.",
      "Remember that the loop includes the last number too, as long as it is not below the end value.",
      "Example: for i from 6 down to 1 step 2 prints 6, 4, 2. That is 3 numbers. Now do yours."
    ], code([`for i from ${a} down to 1 step ${s}:`, ind(1) + "print(i)"]));
  };

  const productLoop = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(3, 5); let p = 1; for (let i = 1; i <= n; i++) p *= i;
      return num("What does it print?", p, [
        "The box p starts at one, not zero. Why? Zero times anything is zero.",
        "Each round multiplies p by the new value of i. Keep the running result after each round.",
        "Example: for i from 1 to 3: p = 1, then 1 x 1 = 1, then 1 x 2 = 2, then 2 x 3 = 6. Now do yours."
      ], code(["p = 1", `for i from 1 to ${n}:`, ind(1) + "p = p * i", "print(p)"])); }
    if (t === 1) { const n = ri(3, 6); let s = 0; for (let i = 1; i <= n; i++) s += i * i;
      return num("What does it print?", s, [
        "Each round adds the square of i (i times i) to the total.",
        "Write i * i for each round, then add them one after another.",
        "Example: for i from 1 to 3: 1 + 4 + 9 = 14. Now do yours."
      ], code(["total = 0", `for i from 1 to ${n}:`, ind(1) + "total = total + i * i", "print(total)"])); }
    if (t === 2) { const n = ri(6, 14); let s = 0; for (let i = 1; i <= n; i++) if (i % 2 === 0) s += i;
      return num("What does it print?", s, [
        "Only even numbers get added. Odd numbers are skipped by the IF.",
        "List the numbers from one up to the end value, cross out the odd ones, and add what is left.",
        "Example: for i from 1 to 7 the even numbers are 2, 4, 6. Their sum is 12. Now do yours."
      ], code(["total = 0", `for i from 1 to ${n}:`, ind(1) + "IF i mod 2 == 0:", ind(2) + "total = total + i", "print(total)"])); }
    const k = pick([2, 3]), n = ri(3, 5); let p = 1; for (let i = 0; i < n; i++) p *= k;
    return num("What does it print?", p, [
      "The loop runs the same number of times as the count shows. Each round multiplies p.",
      "Start with p, multiply once per round, and keep track of the round number.",
      "Example: p = 1 and 3 rounds of p = p * 4 gives 4, then 16, then 64. Now do yours."
    ], code(["p = 1", `for round from 1 to ${n}:`, ind(1) + `p = p * ${k}`, "print(p)"]));
  };

  const starQ = () => {
    const f = pick([["row", r => r], ["row * 2", r => r * 2], ["2 * row - 1", r => 2 * r - 1]]);
    const n = ri(3, 6), lastOnly = Math.random() < 0.4;
    let tot = 0; for (let r = 1; r <= n; r++) tot += f[1](r);
    return num(lastOnly ? `How many stars are printed on the <b>last row</b>?` : `How many stars are printed in all?`, lastOnly ? f[1](n) : tot, [
      "Each round prints one row. The number of stars depends on the row number.",
      lastOnly ? "Use the largest value of row in the rule." : "Work out the stars for each row, one by one, then add up all the rows.",
      "Example: for row from 1 to 3, with 'row' stars on each row: 1 + 2 + 3 = 6 stars in all, and 3 on the last row. Now do yours."
    ], code([`for row from 1 to ${n}:`, ind(1) + `print "⭐" repeated (${f[0]}) times`]));
  };

  const boolQ = () => {
    const x = ri(1, 12), y = ri(1, 12), a = ri(2, 10), b = ri(2, 10);
    const T = [
      [`x &gt; ${a} AND y &lt; ${b}`, x > a && y < b],
      [`x &gt; ${a} OR y &gt; ${b}`, x > a || y > b],
      [`NOT (x &gt; ${a})`, !(x > a)],
      [`NOT (x &gt; ${a} AND y &gt; ${b})`, !(x > a && y > b)],
      [`(x &lt; ${a} OR y &lt; ${b}) AND x != y`, (x < a || y < b) && x !== y],
      [`x == y OR NOT (y &lt; ${b})`, x === y || !(y < b)],
      [`NOT (x &lt; ${a} OR y &lt; ${b})`, !(x < a || y < b)]
    ];
    const [e, v] = pick(T);
    return mc(`Here x = ${x} and y = ${y}. Is this test true or false?`, v ? "true" : "false", [v ? "false" : "true"], [
      "Work out each small comparison first. Each one is just true or false.",
      "Then combine them. AND needs both true. OR needs at least one true. NOT flips the answer. Do brackets first.",
      "Example: x = 5, y = 2. (x &gt; 3 AND y &gt; 4) gives true AND false, which is false. NOT of that is true. Now do yours."
    ], code([e]));
  };

  const linearSteps = () => {
    const a = uniq(8, 1, 30), found = Math.random() < 0.7;
    const target = found ? pick(a) : pick(Array.from({ length: 30 }, (_, i) => i + 1).filter(v => !a.includes(v)));
    return num("Linear search looks at the items one by one from the start. How many items does it look at before it stops?", found ? a.indexOf(target) + 1 : a.length, [
      "Linear search stops as soon as it finds the target. If the target is not there, it must look at everything.",
      "Count the items from the left, including the one that matches.",
      "Example: list [4, 9, 2, 7], target 2. It looks at 4, then 9, then 2 and stops. That is 3 looks. For a target of 5 it would look at all 4. Now do yours."
    ], code([`list = ${lst(a)}`, `target = ${target}`]));
  };

  const selStates = a => {
    const s = [a.slice()], b = a.slice();
    for (let i = 0; i < b.length - 1; i++) {
      let m = i; for (let j = i + 1; j < b.length; j++) if (b[j] < b[m]) m = j;
      [b[i], b[m]] = [b[m], b[i]]; s.push(b.slice());
    }
    return s;
  };
  const selSort = () => {
    for (;;) {
      const a = uniq(5, 1, 20), st = selStates(a), k = ri(1, 3);
      if (lst(st[k]) === lst(st[k - 1]) || lst(st[k]) === lst(st[k + 1])) continue;
      return mc(`Selection sort: each pass finds the smallest item in the unsorted part and swaps it into the first spot of that part. What does the list look like after <b>pass ${k}</b>?`, lst(st[k]), [lst(st[k - 1]), lst(st[k + 1]), lst(st[0].slice().reverse())], [
        "Each pass fixes one more item at the front. Pass one decides the very first spot.",
        "In each pass: look through the part that is not sorted yet, find the smallest, and swap it with the first item of that part.",
        "Example: [5, 2, 9, 1]. Pass 1: smallest is 1, swap with 5, giving [1, 2, 9, 5]. Pass 2: smallest of the rest is 2, already in place. Now do yours."
      ], code([`list = ${lst(a)}`]));
    }
  };

  const COLORS = [
    ["red", 255, 0, 0, "Only one light is on, and it is the first of the three."],
    ["green", 0, 255, 0, "Only the middle light is on."],
    ["blue", 0, 0, 255, "Only the last light is on."],
    ["white", 255, 255, 255, "All three lights are at full power."],
    ["black", 0, 0, 0, "There is no light at all."],
    ["yellow", 255, 255, 0, "Two lights are at full power and the last one is off."],
    ["cyan", 0, 255, 255, "The first light is off and the other two are at full power."],
    ["magenta", 255, 0, 255, "The middle light is off and the other two are at full power."],
    ["gray", 128, 128, 128, "All three lights are equal and in the middle of their range."]
  ];
  const rgbQ = () => {
    const t = ri(0, 3);
    const hints = c => [
      "A pixel mixes red, green and blue light, in that order. Each number says how strong a light is, from zero (off) to 255 (full).",
      c,
      "Example: (255, 128, 0) is full red, half green and no blue. Mixed together that looks orange. Now do yours."
    ];
    if (t === 3) return num("Each of red, green and blue can be any whole number from 0 to 255. How many different values is that for one color channel?", 256, [
      "Count the numbers from the lowest to the highest. Do not forget that zero counts too.",
      "It is one more than the highest number, because the count starts at zero.",
      "Example: numbers 0 to 3 are 0, 1, 2, 3. That is 4 numbers, one more than 3. Now do yours."
    ]);
    const [n, r, g, b, clue] = pick(COLORS);
    if (t === 0 || t === 1) return mc(`A pixel has red = ${r}, green = ${g}, blue = ${b}. What color is it?`, n, COLORS.filter(c => c[0] !== n).map(c => c[0]), hints(clue),
      `<div style="display:inline-block;width:70px;height:70px;border-radius:12px;border:3px solid #888;background:#888"></div>`.replace("#888;background:#888", "#888;background:#ddd"));
    const fmt = c => `(${c[1]}, ${c[2]}, ${c[3]})`;
    return mc(`Which (red, green, blue) numbers make <b>${n}</b>?`, fmt([n, r, g, b]), COLORS.filter(c => c[0] !== n).map(fmt), hints(`Think about which lights should be on or off to make this color.`),
      `<div style="display:inline-block;width:70px;height:70px;border-radius:12px;border:3px solid #888;background:rgb(${r},${g},${b})"></div>`);
  };

  const asciiQ = () => {
    const t = ri(0, 3), up = i => String.fromCharCode(65 + i), lo = i => String.fromCharCode(97 + i);
    const h = [
      "Computers store letters as numbers. The letters of the alphabet get numbers in order, one after another.",
      "Count how many letters you are away from the letter you know, then move the number by the same amount.",
      "Example: if A is 65, then C is 67 because C is two letters after A. Now do yours."
    ];
    if (t === 0) { const i = ri(1, 25); return num(`In the code, A = 65, B = 66, C = 67 and so on. What is the code for <b>${up(i)}</b>?`, 65 + i, h); }
    if (t === 1) { const i = ri(1, 25); return txt(`In the code, A = 65, B = 66, C = 67 and so on. Which capital letter has the code <b>${65 + i}</b>?`, up(i), [
      "The code goes up by one for each letter. Work out how far above 65 the number is.",
      "Count that many letters after A.",
      "Example: code 68 is three above 65, so it is three letters after A, which is D. Now do yours."
    ]); }
    if (t === 2) { const i = ri(1, 25); return num(`Small letters start at a = 97, b = 98 and so on. What is the code for <b>${lo(i)}</b>?`, 97 + i, h); }
    const i = ri(0, 24); return num(`The letter ${up(i)} has code ${65 + i}. What is the code of the letter that comes right after it?`, 66 + i, [
      "The next letter in the alphabet has the next code.",
      "Add one to the code you are given.",
      "Example: if M has code 77, the letter after it has code 78. Now do yours."
    ]);
  };

  const testPick = () => {
    for (;;) {
      const a = ri(8, 14), b = a + ri(5, 7), lowBug = Math.random() < 0.5;
      const rule = `Allowed ages are from ${a} to ${b}, including both ${a} and ${b}`;
      const good = x => x >= a && x <= b;
      const bad = lowBug ? (x => x > a && x <= b) : (x => x >= a && x < b);
      const mid = Math.floor((a + b) / 2), out = b + ri(3, 6);
      const cand = [a, b, mid, out];
      const diff = cand.filter(x => good(x) !== bad(x));
      if (diff.length !== 1) continue;
      const code1 = lowBug ? `IF age &gt; ${a} AND age &lt;= ${b}:` : `IF age &gt;= ${a} AND age &lt; ${b}:`;
      return nc(`${rule}. This code has a bug. Which age is the best test to <b>show</b> the bug?`, diff[0], 8, [
        "Bugs like to hide at the edges of a rule, where it changes from allowed to not allowed.",
        "Compare each comparison in the code with the words of the rule. Look at the smallest and largest allowed ages.",
        "Example: a rule says scores from 50 to 100 pass, but the code says score &gt; 50. Score 50 shows the bug, but 75 does not. Now do yours."
      ], code([code1, ind(1) + 'print("allowed")']));
    }
  };

  // =====================================================================
  // LEVEL 11
  // =====================================================================
  const listOps = () => {
    const a = uniq(ri(3, 4), 1, 20), ops = [], states = [a.slice()];
    while (ops.length < 3) {
      const t = pick(["append", "pop", "insert", "remove", "popfirst"]);
      if (t === "append") { const x = ri(1, 30); a.push(x); ops.push(`list.append(${x})`); }
      else if (t === "pop" && a.length > 2) { a.pop(); ops.push("list.pop()"); }
      else if (t === "insert") { const i = ri(0, a.length), x = ri(1, 30); a.splice(i, 0, x); ops.push(`list.insert(${i}, ${x})`); }
      else if (t === "remove" && a.length > 2) { const v = a[ri(0, a.length - 1)]; a.splice(a.indexOf(v), 1); ops.push(`list.remove(${v})`); }
      else if (t === "popfirst" && a.length > 2) { a.shift(); ops.push("list.pop(0)"); }
      else continue;
      states.push(a.slice());
    }
    const fin = lst(a);
    return mc("What does the list look like at the end?", fin, [lst(states[0]), lst(states[1]), lst(states[2]), lst(a.slice().reverse())], [
      "Do one line at a time and rewrite the whole list after each line.",
      "append adds to the end, insert(i, x) puts x at position i, pop() removes the last item, pop(0) removes the first, and remove(v) deletes the value v.",
      "Example: [4, 7]. append(9) gives [4, 7, 9]. insert(0, 2) gives [2, 4, 7, 9]. pop() gives [2, 4, 7]. Now do yours."
    ], code([`list = ${lst(states[0])}`].concat(ops)));
  };

  const aliasQ = () => {
    const a = uniq(3, 1, 9), share = Math.random() < 0.5, kind = pick(["append", "set"]), x = ri(10, 30);
    const line = kind === "append" ? `b.append(${x})` : `b[0] = ${x}`;
    const changed = kind === "append" ? lst(a.concat([x])) : lst([x, a[1], a[2]]);
    const same = lst(a);
    const wrong = kind === "append" ? lst([x].concat(a)) : lst([a[0], a[1], x]);
    return mc("What does print(a) show at the end?", share ? changed : same, [share ? same : changed, wrong, lst(a.concat([x, x]))], [
      "Ask yourself: is b a brand new list, or just a second name for the same list?",
      "A plain b = a does not copy the list. Both names point at one list. A copy makes a new, separate list.",
      "Example: a = [1, 2]. With b = a, then b.append(3), a also becomes [1, 2, 3]. With b = copy of a, a stays [1, 2]. Now do yours."
    ], code([`a = ${lst(a)}`, share ? "b = a" : "b = copy of a", line, "print(a)"]));
  };

  const filterQ = () => {
    for (;;) {
      const a = Array.from({ length: 8 }, () => ri(1, 20)), t = ri(8, 13);
      const rule = pick([["x mod 2 == 0", x => x % 2 === 0], [`x &gt; ${t}`, x => x > t], ["x mod 3 == 0", x => x % 3 === 0], ["x mod 2 == 1", x => x % 2 === 1]]);
      const keep = a.filter(rule[1]);
      if (keep.length < 2) continue;
      const k = pick(["len", "last", "sum"]);
      const ans = k === "len" ? keep.length : k === "last" ? keep[keep.length - 1] : keep.reduce((p, q) => p + q, 0);
      return num(k === "len" ? "How many items are in <b>new</b> at the end?" : k === "last" ? "What is the <b>last</b> item of new?" : "What is the <b>sum</b> of the items in new?", ans, [
        "Filtering means keeping only the items that pass the test. The others are left out.",
        "Go through the list from left to right. Write down only the items that pass the IF test.",
        "Example: list [4, 9, 6], rule x mod 2 == 0. Items 4 and 6 pass, so new is [4, 6]. Now do yours."
      ], code([`list = ${lst(a)}`, "new = []", "for each x in list:", ind(1) + `IF ${rule[0]}:`, ind(2) + "new.append(x)"]));
    }
  };

  const mapQ = () => {
    const a = uniq(ri(4, 5), 1, 9), r = pick([["x * 2 + 1", x => x * 2 + 1], ["x + 10", x => x + 10], ["x * x", x => x * x], ["x * 3 - 2", x => x * 3 - 2]]);
    const out = a.map(r[1]);
    if (Math.random() < 0.5) { const i = ri(0, a.length - 1);
      return num(`What is <b>new[${i}]</b>?`, out[i], [
        "Mapping means the same rule is used on every item, and the new list has the same length as the old one.",
        "Find the item in the old list at the same position, then use the rule on it.",
        "Example: list [3, 5], rule x * 2. The new list is [6, 10], so new[1] is 10. Now do yours."
      ], code([`list = ${lst(a)}`, "new = []", "for each x in list:", ind(1) + `new.append(${r[0]})`])); }
    return num("What is the <b>sum</b> of all the items in new?", out.reduce((p, q) => p + q, 0), [
      "First build the whole new list, one item for each item in the old list.",
      "Use the rule on each old item in turn, then add up all the results.",
      "Example: list [3, 5], rule x * 2. The new list is [6, 10]. Its sum is 16. Now do yours."
    ], code([`list = ${lst(a)}`, "new = []", "for each x in list:", ind(1) + `new.append(${r[0]})`]));
  };

  const NAMES = ["Ava", "Ben", "Cy", "Dan", "Eli", "Fay", "Gus", "Hana"];
  const recordQ = () => {
    const ns = shuf(NAMES).slice(0, 4), sc = uniq(4, 5, 40), p = ns.map((n, i) => ({ n, s: sc[i] }));
    const vis = code(["players = ["].concat(p.map((q, i) => ind(1) + `{name: "${q.n}", score: ${q.s}}` + (i < 3 ? "," : "")), ["]"]));
    const t = ri(0, 3);
    if (t === 0) { const best = p.reduce((a, b) => (b.s > a.s ? b : a)); return txt("Which player has the <b>highest score</b>? (type the name)", best.n, [
      "Compare the score property of every player, not the names.",
      "Find the biggest score first, then read the name of the player who owns it.",
      "Example: {name: \"Zed\", score: 3} and {name: \"Mia\", score: 9}. The biggest score is 9, so the answer is the name next to it. Now do yours."
    ], vis); }
    if (t === 1) { const i = ri(0, 3); return txt(`What is <b>players[${i}].name</b>?`, p[i].n, [
      "Lists count from zero. The number picks the player and the dot picks one property.",
      "Move that many players along from the first, then read the name property.",
      "Example: in [{name: \"Zed\"}, {name: \"Mia\"}], players[1].name is Mia. Now do yours."
    ], vis); }
    if (t === 2) { const th = ri(15, 28); return num(`How many players have a score <b>over ${th}</b>?`, p.filter(q => q.s > th).length, [
      "Look at the score of each player and compare it with the limit.",
      "Count one for each score that is strictly more than the limit.",
      "Example: scores 4, 12, 20 with limit 10. Two scores are more than 10, so the count is 2. Now do yours."
    ], vis); }
    const i = ri(0, 3); return num(`What is <b>players[${i}].score</b>?`, p[i].s, [
      "Lists count from zero. The number picks the player and the dot picks one property.",
      "Move that many players along from the first, then read the score property.",
      "Example: in [{score: 7}, {score: 12}], players[1].score is 12. Now do yours."
    ], vis);
  };

  const breakQ = () => {
    const t = ri(0, 1);
    if (t === 0) { const b = ri(4, 8), n = ri(b + 1, 10); let s = 0; for (let i = 1; i <= n; i++) { if (i === b) break; s += i; }
      return num("What does it print? (break leaves the loop at once)", s, [
        "break stops the whole loop right away, even if there are more rounds left.",
        "Add numbers up one at a time, and stop before adding the number the IF catches.",
        "Example: for i from 1 to 9, IF i == 4 then break, total adds i. Total = 1 + 2 + 3 = 6, then the loop ends. Now do yours."
      ], code(["total = 0", `for i from 1 to ${n}:`, ind(1) + `IF i == ${b}:`, ind(2) + "break", ind(1) + "total = total + i", "print(total)"])); }
    const m = pick([2, 3, 4]), n = ri(8, 14); let s = 0; for (let i = 1; i <= n; i++) { if (i % m === 0) continue; s += i; }
    return num("What does it print? (continue skips the rest of this round and goes on to the next)", s, [
      "continue skips only the current round. The loop carries on with the next value of i.",
      "Cross out each i that makes the IF true. Add up the numbers that are left.",
      "Example: for i from 1 to 6, IF i mod 3 == 0 then continue. Only 3 and 6 are skipped, so total = 1 + 2 + 4 + 5 = 12. Now do yours."
    ], code(["total = 0", `for i from 1 to ${n}:`, ind(1) + `IF i mod ${m} == 0:`, ind(2) + "continue", ind(1) + "total = total + i", "print(total)"]));
  };

  const pairsQ = () => {
    const n = ri(3, 7), t = ri(0, 1); let c = 0;
    for (let i = 1; i <= n; i++) for (let j = (t ? 1 : i + 1); j <= (t ? i : n); j++) c++;
    return num("How many times does the inner line run?", c, [
      "The inner loop starts a different place each time, so the number of rounds changes with i.",
      "Make a list: for each value of i, write how many values j takes. Then add the counts.",
      t ? "Example: n = 3, j from 1 to i. i = 1 gives 1, i = 2 gives 2, i = 3 gives 3. Total 6. Now do yours."
        : "Example: n = 3, j from i + 1 to n. i = 1 gives 2, i = 2 gives 1, i = 3 gives 0. Total 3. Now do yours."
    ], code(["count = 0", `for i from 1 to ${n}:`, ind(1) + (t ? "for j from 1 to i:" : `for j from i + 1 to ${n}:`), ind(2) + "count = count + 1"]));
  };

  const powerRec = () => {
    const t = ri(0, 3);
    if (t === 0 || t === 1) { const b = ri(2, 4), e = ri(2, 4);
      return num(t === 0 ? `What does power(${b}, ${e}) give?` : `How many times is power called in all when you run power(${b}, ${e})? (count the first call too)`, t === 0 ? Math.pow(b, e) : e + 1, [
        "Follow the calls down until the base case stops them, then work the answers back up.",
        t === 0 ? "The base case is e == 0, which gives one. Every other call multiplies b by the call with e one smaller." : "Each call has an e one smaller than before. The calls stop when e reaches the base case.",
        "Example: power(2, 2) = 2 * power(2, 1) = 2 * (2 * power(2, 0)) = 2 * (2 * 1) = 4, and that used 3 calls. Now do yours."
      ], code(["function power(b, e):", ind(1) + "IF e == 0: return 1", ind(1) + "return b * power(b, e - 1)"]));
    }
    const a = ri(2, 9), b = ri(2, 6);
    return num(`What does mult(${a}, ${b}) give?`, a * b, [
      "This function does multiplying by adding again and again. Follow the calls down, then back up.",
      "Each call adds a once and asks for one fewer b, until b reaches zero.",
      "Example: mult(4, 2) = 4 + mult(4, 1) = 4 + (4 + mult(4, 0)) = 4 + 4 + 0 = 8. Now do yours."
    ], code(["function mult(a, b):", ind(1) + "IF b == 0: return 0", ind(1) + "return a + mult(a, b - 1)"]));
  };

  const mergeQ = () => {
    const na = ri(3, 4), nb = ri(3, 4), all = uniq(na + nb, 1, 40), a = all.slice(0, na).sort((x, y) => x - y), b = all.slice(na).sort((x, y) => x - y);
    const m = all.slice().sort((x, y) => x - y), k = ri(3, 5);
    return num(`Merging two sorted lists: always take the smaller of the two front items. What is the <b>item number ${k}</b> in the merged list (counting from 1)?`, m[k - 1], [
      "Look only at the front item of each list. Take the smaller one, then look at the fronts again.",
      "Keep going until you have taken the number of items you need. Count each one you take.",
      "Example: A = [2, 8], B = [5, 6]. Take 2, then 5, then 6, then 8. The merged list is [2, 5, 6, 8]. Now do yours."
    ], code([`A = ${lst(a)}`, `B = ${lst(b)}`]));
  };

  const sortCompare = () => {
    const n = ri(4, 9), t = ri(0, 2);
    if (t === 0) return num(`A pass of bubble sort compares neighbours in a list of ${n} items. How many comparisons does <b>pass 1</b> make?`, n - 1, [
      "Neighbours come in pairs. Think how many pairs sit side by side in a row of items.",
      "A row of items has one fewer pair than items.",
      "Example: 5 items have pairs 1-2, 2-3, 3-4, 4-5. That is 4 pairs. Now do yours."
    ]);
    if (t === 1) { const p = ri(2, Math.min(4, n - 1)); return num(`Each bubble sort pass does one fewer comparison than the pass before, because the biggest item is already at the end. With ${n} items, how many comparisons does <b>pass ${p}</b> make?`, n - p, [
      "Pass one makes one fewer comparison than the number of items. Each later pass makes one fewer than the pass before.",
      "Take away one for every pass after the first.",
      "Example: 6 items. Pass 1 makes 5, pass 2 makes 4, pass 3 makes 3. Now do yours."
    ]); }
    return num(`How many comparisons does a full bubble sort make in all for ${n} items? (pass 1 makes ${n - 1}, pass 2 makes ${n - 2}, and so on down to 1)`, n * (n - 1) / 2, [
      "Add up the comparisons from every pass: the biggest count first, then one fewer each time, down to one.",
      "You can pair the biggest with the smallest to make adding quicker.",
      "Example: 4 items: 3 + 2 + 1 = 6 comparisons. Now do yours."
    ]);
  };

  const BO = [
    ["print(list[0])", "Same steps no matter how long (constant)"],
    ["print(list[1])", "Same steps no matter how long (constant)"],
    ["n = len(list)<br>print(n)", "Same steps no matter how long (constant)"],
    ["for x in list:<br>&nbsp;&nbsp;&nbsp;print(x)", "Steps grow with the length (linear)"],
    ["total = 0<br>for x in list:<br>&nbsp;&nbsp;&nbsp;total = total + x", "Steps grow with the length (linear)"],
    ["for x in list:<br>&nbsp;&nbsp;&nbsp;print(x)<br>for y in list:<br>&nbsp;&nbsp;&nbsp;print(y)", "Steps grow with the length (linear)"],
    ["for a in list:<br>&nbsp;&nbsp;&nbsp;for b in list:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(a, b)", "Steps grow with length times length (squared)"],
    ["for i in list:<br>&nbsp;&nbsp;&nbsp;for j in list:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IF i == j: count = count + 1", "Steps grow with length times length (squared)"]
  ];
  const bigO = () => {
    if (Math.random() < 0.65) {
      const [c, r] = pick(BO);
      return mc("The list has n items. How does the number of steps grow when n gets bigger?", r, ["Same steps no matter how long (constant)", "Steps grow with the length (linear)", "Steps grow with length times length (squared)"], [
        "Ask: does the code touch every item, or only a fixed few items?",
        "A loop through the list is one pass. A loop inside a loop makes a pass for every item. Two loops one after the other are still just passes, one after another.",
        "Example: a loop inside a loop over 10 items does 10 x 10 = 100 steps. Printing only the first item takes 1 step whatever the length. Now do yours."
      ], code(c.split("<br>")));
    }
    const f = pick([2, 3, 4, 10]), sq = Math.random() < 0.5, n = pick([10, 20, 50, 100]);
    return num(sq ? `A loop inside a loop over a list of ${n} items takes ${n * n} steps. The list becomes ${f} times longer. How many steps now?` : `A single loop over a list of ${n} items takes ${n} steps. The list becomes ${f} times longer. How many steps now?`, sq ? Math.pow(n * f, 2) : n * f, [
      "First work out the new length of the list.",
      sq ? "A loop inside a loop takes the new length times the new length." : "A single loop takes about one step per item.",
      "Example: a loop inside a loop on 5 items takes 25 steps. With 15 items it takes 15 x 15 = 225 steps. Now do yours."
    ]);
  };

  const deMorgan = () => {
    const a = ri(3, 9), b = ri(3, 9), useAnd = Math.random() < 0.5;
    const orig = useAnd ? `NOT (x &gt; ${a} AND y &lt; ${b})` : `NOT (x &gt; ${a} OR y &lt; ${b})`;
    const nx = `x is ${a} or less`, ny = `y is ${b} or more`, px = `x is more than ${a}`, py = `y is less than ${b}`;
    const right = useAnd ? `${nx} OR ${ny}` : `${nx} AND ${ny}`;
    const wr = useAnd ? [`${nx} AND ${ny}`, `${px} OR ${py}`, `${nx} OR ${py}`] : [`${nx} OR ${ny}`, `${px} AND ${py}`, `${nx} AND ${py}`];
    return mc("Which one means exactly the same as this test?", right, wr, [
      "NOT flips true and false. When it moves inside the brackets, each comparison flips to its opposite.",
      "The word between the two comparisons also flips when NOT moves in: AND and OR swap places.",
      "Example: NOT (a &gt; 1 AND b &gt; 2) means a is 1 or less, OR b is 2 or less. Now do yours."
    ], code([orig]));
  };

  const shiftQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(1, 9), k = ri(1, 3); return num(`Shifting bits left by ${k} place${k > 1 ? "s" : ""} (n &lt;&lt; ${k}) doubles the number ${k === 1 ? "once" : k + " times"}. What is ${n} &lt;&lt; ${k}?`, n << k, [
      "Each shift left doubles the number.",
      "Double the number once for every place you shift.",
      "Example: 3 shifted left by 2: 3 doubled is 6, doubled again is 12. Now do yours."
    ]); }
    if (t === 1) { const k = ri(1, 3), n = ri(10, 60); return num(`Shifting bits right by ${k} place${k > 1 ? "s" : ""} (n &gt;&gt; ${k}) halves the number each time and drops any remainder. What is ${n} &gt;&gt; ${k}?`, n >> k, [
      "Each shift right halves the number and throws away the leftover.",
      "Halve the number once for every place you shift. Keep only the whole part each time.",
      "Example: 25 shifted right by 2: half of 25 is 12 (drop the .5), half of 12 is 6. Now do yours."
    ]); }
    const bits = ri(1, 7), s = bits.toString(2).padStart(4, "0"), left = s.slice(1) + "0";
    return mc(`Shift the bits of <b>${s}</b> one place to the left (the leftmost bit falls off and a 0 comes in on the right). What do you get?`, left, [s, "0" + s.slice(0, 3), s.split("").reverse().join("")], [
      "Every bit moves one place to the left. The left end loses a bit and the right end gets a new zero.",
      "Slide the whole row one step left. Check that you still have four bits.",
      "Example: 0101 shifted left becomes 1010. Now do yours."
    ]);
  };

  const bitwise = () => {
    const op = pick(["AND", "OR", "XOR"]);
    let a = ri(1, 14), b = ri(1, 14);
    const f = { AND: (x, y) => x & y, OR: (x, y) => x | y, XOR: (x, y) => x ^ y }[op];
    const r = f(a, b), s = x => x.toString(2).padStart(4, "0");
    const wr = ["AND", "OR", "XOR"].filter(o => o !== op).map(o => s({ AND: a & b, OR: a | b, XOR: a ^ b }[o]));
    return mc(`Work bit by bit. ${op} on two bits: ${op === "AND" ? "1 only if both are 1" : op === "OR" ? "1 if at least one is 1" : "1 if the two bits are different"}. What is ${s(a)} ${op} ${s(b)}?`, s(r), wr.concat([s(15 - r)]), [
      "Line the two numbers up and work on one column at a time, from left to right.",
      "Each column gives one bit of the answer. Do not carry anything over, columns do not affect each other.",
      "Example: 1100 AND 1010. Columns: 1,1 gives 1; 1,0 gives 0; 0,1 gives 0; 0,0 gives 0. So 1000. Now do yours."
    ]);
  };

  const dataSize = () => {
    const t = ri(0, 2);
    if (t === 0) { const w = ri(4, 30), h = ri(4, 30), bp = pick([1, 3]);
      return num(`A picture is ${w} pixels wide and ${h} pixels tall. Each pixel needs ${bp} byte${bp > 1 ? "s" : ""}. How many bytes is the whole picture?`, w * h * bp, [
        "First find how many pixels there are in all. A picture is a grid of rows and columns.",
        "Multiply the pixels by the bytes needed for each one.",
        "Example: a 5 by 4 picture with 2 bytes per pixel has 20 pixels, so 40 bytes. Now do yours."
      ]); }
    if (t === 1) { const b = ri(2, 20); return num(`One byte is 8 bits. How many bits are in ${b} bytes?`, b * 8, [
      "Every byte holds the same number of bits.",
      "Multiply the number of bytes by the bits in one byte.",
      "Example: 3 bytes = 3 x 8 = 24 bits. Now do yours."
    ]); }
    const kb = ri(2, 9) * 1000; return num(`One kilobyte is 1000 bytes. How many kilobytes is ${kb} bytes?`, kb / 1000, [
      "Kilo means one thousand. Work out how many groups of a thousand fit.",
      "Divide the number of bytes by one thousand.",
      "Example: 6000 bytes = 6000 div 1000 = 6 kilobytes. Now do yours."
    ]);
  };

  const COMP = [
    ["Which part is the 'brain' that follows the program's instructions one after another?", "CPU", ["RAM", "Speaker", "Keyboard"], "It does the calculating, one tiny instruction at a time.", "💻"],
    ["Which part holds the programs and data you are using right now, but forgets them when the power goes off?", "RAM", ["CPU", "SSD", "Monitor"], "It is fast, short-term memory.", "🧠"],
    ["Where are your files kept, even when the computer is turned off?", "Storage", ["RAM", "CPU", "Monitor"], "It is the long-term place for photos, games and documents.", "💾"],
    ["Which of these is an <b>output</b> device?", "Speaker", ["Keyboard", "Mouse", "Microphone"], "It sends something out for you to hear, see or feel.", "🔊"],
    ["Which of these is an <b>input</b> device?", "Microphone", ["Monitor", "Speaker", "Printer"], "It sends something in to the computer.", "🎤"],
    ["Which program manages the whole computer and runs all the other apps?", "Operating system", ["Web browser", "Keyboard", "A text file"], "It starts first and looks after memory, files and apps. Windows is one example.", "⚙️"],
    ["Which part draws the pictures and 3D graphics for games?", "GPU", ["RAM", "Speaker", "Hard drive"], "Its name has the word 'graphics' in it.", "🎮"],
    ["Which of these is <b>software</b> (not hardware)?", "A game app", ["Mouse", "Screen", "Keyboard"], "You cannot touch it. It is a set of instructions.", "📱"],
    ["Which is faster for the computer to read from?", "RAM", ["Storage drive", "They are exactly the same"], "It is the short-term memory, built for speed.", "⚡"],
    ["What lets a computer join the internet at home without a cable?", "Wi-Fi", ["HDMI", "USB stick", "Printer"], "It sends data through the air to a router.", "📶"]
  ];

  const CIPH = [
    ["Scrambling a message so only the right person can read it is called ...", "encryption", ["decryption", "compression", "debugging"], "The word starts with 'en', meaning put into a secret code.", "🔐"],
    ["Turning a scrambled message back into the original is called ...", "decryption", ["encryption", "compression", "looping"], "The word starts with 'de', which means undo.", "🔓"],
    ["The secret scrambled message is called the ...", "ciphertext", ["plaintext", "codeword", "password"], "Think of the message after the secret code was used.", "✉️"],
    ["The normal message, before it is scrambled, is called the ...", "plaintext", ["ciphertext", "keytext", "hashtext"], "Think of the message anyone could read.", "📄"],
    ["The secret number or word that lets you scramble and unscramble a message is the ...", "key", ["bug", "loop", "window"], "Without it, the secret message stays locked.", "🔑"],
    ["A cipher that moves every letter forward by the same number of places is called a ... cipher.", "Caesar", ["Roman", "Binary", "Pirate"], "It is named after a famous leader of ancient Rome.", "🏛️"],
    ["Which password is the strongest?", "gold-tiger-7-lamp-rain", ["password1", "12345678", "mynameismax"], "Long, random and not about you is best.", "🛡️"],
    ["Who should you tell your password to?", "Only a parent", ["A friend who asks nicely", "Anyone who says they work for the game", "A stranger in a chat"], "Nobody online ever needs it, even if they say they do.", "🤫"],
    ["An email says 'Click now to win a prize!' and asks for your login. This trick is called ...", "phishing", ["debugging", "looping", "streaming"], "It sounds like a sport you do with a rod and bait.", "🎣"],
    ["The padlock beside a web address means ...", "The connection is encrypted", ["The site is always safe", "The site is free", "Your computer is locked"], "It is about how the data travels, not about whether the site is good.", "🔒"]
  ];

  const stateQ = () => {
    const M = pick([
      { name: "door", start: ["closed", "open", "locked"], ev: ["push", "pull", "lock", "unlock"], t: { closed: { push: "open", pull: "closed", lock: "locked", unlock: "closed" }, open: { push: "open", pull: "closed", lock: "open", unlock: "open" }, locked: { push: "locked", pull: "locked", lock: "locked", unlock: "closed" } } },
      { name: "lamp", start: ["off", "dim", "bright"], ev: ["press", "hold"], t: { off: { press: "dim", hold: "off" }, dim: { press: "bright", hold: "off" }, bright: { press: "off", hold: "off" } } },
      { name: "hero", start: ["idle", "running", "jumping"], ev: ["right", "jump", "land", "stop"], t: { idle: { right: "running", jump: "jumping", land: "idle", stop: "idle" }, running: { right: "running", jump: "jumping", land: "running", stop: "idle" }, jumping: { right: "jumping", jump: "jumping", land: "idle", stop: "jumping" } } }
    ]);
    const s0 = pick(M.start), seq = Array.from({ length: ri(3, 4) }, () => pick(M.ev));
    let s = s0; seq.forEach(e => { s = M.t[s][e]; });
    const rows = [];
    M.start.forEach(st => rows.push(`${st}: ` + M.ev.map(e => `${e} → ${M.t[st][e]}`).join(", ")));
    return mc(`A ${M.name} is a state machine. It starts in the state <b>${s0}</b>. The events are ${seq.join(", then ")}. What state is it in at the end?`, s, M.start.filter(x => x !== s), [
      "A state machine is always in exactly one state. An event can move it to another state.",
      "Look up the current state in the table, find the event, and read the new state. Repeat for the next event.",
      "Example: a lamp is off. The press event goes to dim. The press event again goes to bright. Now do yours."
    ], code(rows));
  };

  // =====================================================================
  // LEVEL 12
  // =====================================================================
  const nestedQ = () => {
    const ns = shuf(NAMES).slice(0, 3), d = {};
    ns.forEach(n => { d[n] = Array.from({ length: ri(3, 4) }, () => ri(1, 9)); });
    const vis = code(["scores = {"].concat(ns.map((n, i) => ind(1) + `"${n}": ${lst(d[n])}` + (i < 2 ? "," : "")), ["}"]));
    const n = pick(ns), t = ri(0, 3);
    const h = [
      "Read from left to right. The name in quotes picks a list, and the number then picks an item inside that list.",
      "Find the list for the name first. Only then count positions inside it, starting from zero.",
      "Example: s = {\"Zed\": [5, 8], \"Mia\": [2, 9]}. s[\"Mia\"][0] is the first item of Mia's list, which is 2. Now do yours."
    ];
    if (t === 0 || t === 1) { const i = ri(0, d[n].length - 1); return num(`What is <b>scores["${n}"][${i}]</b>?`, d[n][i], h, vis); }
    if (t === 2) return num(`What is <b>len(scores["${n}"])</b>?`, d[n].length, [
      "len counts the items in the list found under that name.",
      "Find the name, then count the numbers in its list.",
      "Example: for {\"Mia\": [2, 9, 4]}, len(s[\"Mia\"]) is 3. Now do yours."
    ], vis);
    return num(`What is the <b>sum</b> of all the numbers in scores["${n}"]?`, d[n].reduce((a, b) => a + b, 0), [
      "Find the list under the name first. Ignore the other names.",
      "Add up every number in that one list.",
      "Example: for {\"Mia\": [2, 9, 4]}, the sum is 2 + 9 + 4 = 15. Now do yours."
    ], vis);
  };

  const mkBr = (n) => {
    let s = "", stack = [], open = 0;
    for (let i = 0; i < 2 * n; i++) {
      const canOpen = open < n, canClose = stack.length > 0;
      if (canOpen && (!canClose || Math.random() < 0.55)) { const c = pick(["(", "["]); stack.push(c); s += c; open++; }
      else { const c = stack.pop(); s += c === "(" ? ")" : "]"; }
    }
    return s;
  };
  const brCheck = s => { const st = []; let mx = 0; for (const ch of s) { if ("([".includes(ch)) { st.push(ch); mx = Math.max(mx, st.length); } else { const o = st.pop(); if (!o || (o === "(") !== (ch === ")")) return { ok: false, mx }; } } return { ok: st.length === 0, mx }; };
  const bracketQ = () => {
    for (;;) {
      let s = mkBr(ri(3, 4)); const t = ri(0, 2);
      if (t === 0) { const cs = s.split(""); const i = ri(0, cs.length - 1); cs.splice(i, 1); s = cs.join(""); }
      else if (t === 1 && Math.random() < 0.7) { const cs = s.split(""); const i = ri(0, cs.length - 1); cs[i] = { "(": "[", "[": "(", ")": "]", "]": ")" }[cs[i]]; s = cs.join(""); }
      const r = brCheck(s);
      if (Math.random() < 0.7 || !r.ok) return mc(`A stack checks brackets: push each opening bracket, and for each closing bracket pop the top and make sure it matches. Are the brackets in this text <b>balanced</b>?`, r.ok ? "balanced" : "not balanced", [r.ok ? "not balanced" : "balanced"], [
        "Read one character at a time. Opening brackets go on the stack. A closing bracket must match the top one.",
        "It fails if a closing bracket does not match the top, if you try to pop an empty stack, or if something is left on the stack at the end.",
        "Example: \"([)]\" fails. When the first ) arrives, the top of the stack is [, which does not match. Now do yours."
      ], code([s]));
      return num("These brackets are balanced. What is the <b>most</b> items the stack holds at one time?", r.mx, [
        "Every opening bracket adds one to the stack. Every closing bracket takes one away.",
        "Keep a running count while you read, and remember the highest it reaches.",
        "Example: \"(()())\". The count goes 1, 2, 1, 2, 1, 0. The highest is 2. Now do yours."
      ], code([s]));
    }
  };

  const digitsQ = () => {
    const n = ri(100, 9999), t = ri(0, 2); let m = n, s = 0, c = 0;
    while (m > 0) { s += m % 10; m = Math.floor(m / 10); c++; }
    const vis = code([`n = ${n}`, "total = 0", "count = 0", "while n &gt; 0:", ind(1) + "total = total + (n mod 10)", ind(1) + "n = n div 10", ind(1) + "count = count + 1"]);
    const h = [
      "n mod 10 is the last digit. n div 10 chops that last digit off. Each round handles one digit.",
      "The loop stops when n has been chopped down to zero. Write n down after every round.",
      "Example: n = 305. Round 1: add 5, n becomes 30. Round 2: add 0, n becomes 3. Round 3: add 3, n becomes 0. total = 8, count = 3. Now do yours."
    ];
    if (t === 0) return num("What is <b>total</b> at the end?", s, h, vis);
    if (t === 1) return num("What is <b>count</b> at the end?", c, h, vis);
    return num(`What is the <b>first digit added</b> to total?`, n % 10, h, vis);
  };

  const reduceQ = () => {
    const t = ri(0, 3), a = Array.from({ length: 4 }, () => ri(1, 5));
    if (t === 0) return num("What does it print?", a.reduce((x, y) => x * y, 1), [
      "Keep a running result that changes with each item.",
      "The result starts at one. Multiply it by each item in turn.",
      "Example: [2, 3, 4] with r = 1: 1 x 2 = 2, 2 x 3 = 6, 6 x 4 = 24. Now do yours."
    ], code([`list = ${lst(a)}`, "r = 1", "for each x in list:", ind(1) + "r = r * x", "print(r)"]));
    if (t === 1) return num("What does it print?", Math.max(...a), [
      "r always keeps the biggest item seen so far.",
      "Compare each item with r. Only when the item is bigger does r change.",
      "Example: [3, 8, 5] with r = 0: r becomes 3, then 8, then stays 8. Now do yours."
    ], code([`list = ${lst(a)}`, "r = 0", "for each x in list:", ind(1) + "r = max(r, x)", "print(r)"]));
    if (t === 2) { const d = [ri(1, 9), ri(0, 9), ri(1, 9)]; return num("What does it print? (it builds a number out of digits)", d[0] * 100 + d[1] * 10 + d[2], [
      "Each round shifts the old result one place to the left (times ten) and adds the new digit.",
      "Write r after every round: it grows by one digit each time.",
      "Example: [4, 0, 7] with r = 0: 0 x 10 + 4 = 4, then 4 x 10 + 0 = 40, then 40 x 10 + 7 = 407. Now do yours."
    ], code([`list = ${lst(d)}`, "r = 0", "for each x in list:", ind(1) + "r = r * 10 + x", "print(r)"])); }
    const k = ri(1, 3); return num("What does it print? (r keeps the total so far; the last number printed is the answer)", a.reduce((x, y) => x + y, 0) + k, [
      "The box r starts with a number already in it, not zero.",
      "Start from that number and add each item in turn.",
      "Example: [2, 5] with r = 10: 10 + 2 = 12, then 12 + 5 = 17. Now do yours."
    ], code([`list = ${lst(a)}`, `r = ${k}`, "for each x in list:", ind(1) + "r = r + x", "print(r)"]));
  };

  const classQ = () => {
    if (Math.random() < 0.5) {
      const calls = [], v = { a: 0, b: 0 };
      for (let i = 0; i < 4; i++) {
        const o = pick(["a", "b"]);
        if (Math.random() < 0.2) { v[o] = 0; calls.push(`${o}.reset()`); }
        else { const n = ri(1, 6); v[o] += n; calls.push(`${o}.add(${n})`); }
      }
      const w = pick(["a", "b"]);
      return num(`What does print(${w}.count) show?`, v[w], [
        "a and b are two separate objects. Each has its own count, and a method only changes the object it is called on.",
        "Keep two boxes, one for a and one for b. Update the right box for each line.",
        "Example: x.add(3), y.add(5), x.add(1). x.count is 4 and y.count is 5. Now do yours."
      ], code(["class Counter:", ind(1) + "count = 0", ind(1) + "add(n): count = count + n", ind(1) + "reset(): count = 0", "a = Counter()", "b = Counter()"].concat(calls)));
    }
    for (;;) {
      let hp = 10; const calls = [];
      for (let i = 0; i < 4; i++) {
        if (Math.random() < 0.55) { const n = ri(1, 4); hp -= n; calls.push(`h.hit(${n})`); }
        else { const n = ri(2, 5); hp = Math.min(10, hp + n); calls.push(`h.heal(${n})`); }
      }
      if (hp < 1) continue;
      return num("What does print(h.hp) show?", hp, [
        "Follow the calls in order and keep the hp box up to date. hit takes hp away. heal adds to it.",
        "heal can never push hp above the highest value in the class code, so check the min() on that line.",
        "Example: hp = 10. h.hit(4) gives 6. h.heal(9) would give 15, but min(10, 15) caps it at 10. Now do yours."
      ], code(["class Hero:", ind(1) + "hp = 10", ind(1) + "hit(n): hp = hp - n", ind(1) + "heal(n): hp = min(10, hp + n)", "h = Hero()"].concat(calls)));
    }
  };

  const gcdQ = () => {
    for (;;) {
      const g = ri(2, 9), a0 = g * ri(2, 9), b0 = g * ri(2, 9);
      if (a0 === b0) continue;
      let a = a0, b = b0, r = 0; while (b !== 0) { const t = b; b = a % b; a = t; r++; }
      if (r < 2) continue;
      const rounds = Math.random() < 0.4;
      return num(rounds ? "How many times does the loop run?" : "What does it print?", rounds ? r : a, [
        "Trace it with a table: write a and b after every round of the loop.",
        "In each round the new b is the remainder (a mod b), and the new a is the old b. Stop when b is zero.",
        "Example: a = 12, b = 8. Round 1: a = 8, b = 4. Round 2: a = 4, b = 0. It stops and prints 4, after 2 rounds. Now do yours."
      ], code([`a = ${a0}`, `b = ${b0}`, "while b != 0:", ind(1) + "t = b", ind(1) + "b = a mod b", ind(1) + "a = t", "print(a)"]));
    }
  };

  const primeQ = () => {
    const n = ri(10, 60); let d = 2; while (n % d !== 0) d++;
    const code1 = code([`n = ${n}`, "d = 2", "while n mod d != 0:", ind(1) + "d = d + 1", "print(d)"]);
    if (Math.random() < 0.5) return num("What does it print? (it finds the smallest number above 1 that divides n)", d, [
      "Try d = 2, 3, 4 and so on. Stop at the first d that divides n with nothing left over.",
      "n mod d is zero when d divides n exactly. Check each d in order.",
      "Example: n = 21. 21 mod 2 = 1, 21 mod 3 = 0, so it stops and prints 3. Now do yours."
    ], code1);
    return mc("A number is <b>prime</b> if the only way it divides is by 1 and itself. Is n prime, if you use the program's result?", d === n ? "yes" : "no", [d === n ? "no" : "yes"], [
      "Look at what the program prints. If it stops early, the number has another divisor.",
      "If the program only stops when d reaches n itself, nothing smaller divides n.",
      "Example: for n = 15 the program stops at 3, which is smaller than 15, so 15 is not prime. For n = 13 it only stops at 13, so 13 is prime. Now do yours."
    ], code1);
  };

  const callsQ = () => {
    if (Math.random() < 0.6) { const n = ri(2, 5), f = [0, 1, 1, 2, 3, 5, 8]; const calls = 2 * f[n + 1] - 1;
      return num(`How many times does the function run in all when you start with fib(${n})? (count the first call too)`, calls, [
        "Each call that is not a base case makes two more calls. Draw them as a tree.",
        "Count every box in the tree. fib(1) and fib(0) are the end of a branch.",
        "Example: fib(2) calls fib(1) and fib(0). That is 3 calls in all with the first. Now do yours."
      ], code(["function fib(n):", ind(1) + "IF n &lt;= 1: return n", ind(1) + "return fib(n - 1) + fib(n - 2)"])); }
    const n = ri(3, 8);
    return num(`How many times does the function run in all when you start with countdown(${n})? (count the first call too, and the call that stops)`, n + 1, [
      "Each call makes just one more call, with n one smaller. The last call is the one that stops.",
      "List the values of n in each call, from the start down to the stop.",
      "Example: countdown(2) runs with n = 2, 1 and 0. That is 3 calls. Now do yours."
    ], code(["function countdown(n):", ind(1) + "IF n == 0: return", ind(1) + "print(n)", ind(1) + "countdown(n - 1)"]));
  };

  const mergeSortQ = () => {
    if (Math.random() < 0.5) { const k = ri(2, 6);
      return num(`Merge sort splits a list in half again and again until every piece has one item. A list has ${Math.pow(2, k)} items. How many times must the splitting be done, level by level, before the pieces have one item?`, k, [
        "Each split cuts the pieces in half. Count the halvings until you reach one.",
        "Halve the size and count each time. Stop at one item.",
        "Example: 8 items become 4, then 2, then 1. That is 3 halvings. Now do yours."
      ]); }
    const n = pick([6, 8]), a = Array.from({ length: n }, () => ri(1, 30)), half = n / 2, right = Math.random() < 0.5;
    const part = right ? a.slice(half) : a.slice(0, half);
    return mc(`Merge sort splits this list into two halves. What is the <b>${right ? "right" : "left"}</b> half?`, lst(part), [lst(right ? a.slice(0, half) : a.slice(half)), lst(a.filter((_, i) => i % 2 === 0)), lst(a.slice(1, half + 1))], [
      "The split just cuts the list in the middle. Nothing is sorted or moved yet.",
      "The two halves are the same size. The left half uses the first items and the right half uses the rest.",
      "Example: [9, 2, 7, 4]. The left half is [9, 2] and the right half is [7, 4]. Now do yours."
    ], code([`list = ${lst(a)}`]));
  };

  const TN = "ABCDEF";
  const mkGraph = (n, extra) => {
    const e = [], has = (a, b) => e.some(x => (x[0] === a && x[1] === b) || (x[0] === b && x[1] === a));
    for (let i = 1; i < n; i++) e.push([ri(0, i - 1), i]);
    let t = 0; while (extra > 0 && t++ < 200) { const a = ri(0, n - 1), b = ri(0, n - 1); if (a !== b && !has(a, b)) { e.push([a, b]); extra--; } }
    return e.map(([a, b]) => (a < b ? [a, b] : [b, a])).sort((x, y) => x[0] - y[0] || x[1] - y[1]);
  };
  const gDraw = e => code(["Roads: " + e.map(x => TN[x[0]] + " - " + TN[x[1]]).join(", ")]);
  const graphDeg = () => {
    for (;;) {
      const n = 5, e = mkGraph(n, ri(1, 3)), deg = Array(n).fill(0); e.forEach(x => { deg[x[0]]++; deg[x[1]]++; });
      const t = ri(0, 2);
      if (t === 0) { const i = ri(0, n - 1); return num(`A map has towns (nodes) joined by roads (edges). How many roads touch town <b>${TN[i]}</b>?`, deg[i], [
        "Look through the whole list and notice every road that has this town on either end.",
        "A road A - B counts for both A and B. Count the roads that mention the town, whichever side it is on.",
        "Example: Roads: A - B, B - C, B - D. Town B appears in 3 roads. Town C appears in 1. Now do yours."
      ], gDraw(e)); }
      if (t === 1) { const mx = Math.max(...deg); if (deg.filter(d => d === mx).length !== 1) continue; return txt("Which town has the <b>most</b> roads touching it? (type the letter)", TN[deg.indexOf(mx)], [
        "Work out how many roads touch each town. Keep a tally for every letter.",
        "Make one tally for each of the towns, go through the roads, and add one to both ends of each road.",
        "Example: Roads: A - B, B - C, B - D. Town B has 3 roads, more than any other. Now do yours."
      ], gDraw(e)); }
      return num("If you add up the number of roads touching every town, what do you get? (Hint: each road touches two towns)", 2 * e.length, [
        "Every road has two ends, and each end touches a town.",
        "First count how many roads there are in all, then think about the two ends of each one.",
        "Example: 3 roads give 3 x 2 = 6 road ends in all. Now do yours."
      ], gDraw(e));
    }
  };

  const graphPath = () => {
    for (;;) {
      const n = 6, e = mkGraph(n, ri(1, 3)), adj = Array.from({ length: n }, () => []); e.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
      const s = ri(0, n - 1), t = ri(0, n - 1);
      if (s === t) continue;
      const dist = Array(n).fill(-1); dist[s] = 0; const q = [s];
      while (q.length) { const u = q.shift(); adj[u].forEach(v => { if (dist[v] < 0) { dist[v] = dist[u] + 1; q.push(v); } }); }
      if (dist[t] < 2) continue;
      return num(`What is the fewest number of roads you must travel to get from town <b>${TN[s]}</b> to town <b>${TN[t]}</b>?`, dist[t], [
        "Start at the first town. Find every town you can reach in one road, then every town you can reach in two roads, and so on.",
        "Search outward in rings. Stop at the first ring that contains the town you want.",
        "Example: Roads: A - B, B - C, C - D, A - D. From A, one road reaches B and D. Two roads reach C. Now do yours."
      ], gDraw(e));
    }
  };

  const treeQ = () => {
    const b = pick([2, 2, 3]), t = ri(0, 2);
    const nodes = d => Math.pow(b, d - 1);
    const intro = `In a tree where every node has ${b} children, the root is level 1. `;
    if (t === 0) { const d = b === 2 ? ri(3, 6) : ri(2, 4); return num(intro + `How many nodes are on level ${d}?`, nodes(d), [
      "Each level has the branching number times as many nodes as the level above it.",
      "Start with one node on level 1 and multiply again for every level you go down.",
      "Example: with 2 children each: level 1 has 1, level 2 has 2, level 3 has 4. Now do yours."
    ]); }
    if (t === 1) { const L = b === 2 ? ri(3, 6) : ri(3, 4); return num(intro + `The tree has ${L} levels. How many <b>leaves</b> (nodes on the bottom level) does it have?`, nodes(L), [
      "The leaves are the nodes on the last level.",
      "Work out how many nodes are on the last level by multiplying once for each step down from the root.",
      "Example: with 2 children each and 3 levels, the leaves are on level 3, and that level has 4 nodes. Now do yours."
    ]); }
    const L = b === 2 ? ri(3, 5) : 3; let tot = 0; for (let d = 1; d <= L; d++) tot += nodes(d);
    return num(intro + `The tree has ${L} levels. How many nodes are there in <b>all</b>?`, tot, [
      "Work out how many nodes are on each level, then add all the levels together.",
      "Level 1 has one node. Each next level has more nodes by multiplying again.",
      "Example: with 2 children each and 3 levels: 1 + 2 + 4 = 7. Now do yours."
    ]);
  };

  const gate = (op, a, b) => ({ AND: a & b, OR: a | b, XOR: a ^ b, NAND: 1 - (a & b), NOR: 1 - (a | b) }[op]);
  const gatesQ = () => {
    const A = ri(0, 1), B = ri(0, 1), C = ri(0, 1), g1 = pick(["AND", "OR", "XOR", "NAND", "NOR"]), g3 = pick(["AND", "OR", "XOR"]);
    const useNot = Math.random() < 0.6, g2 = pick(["AND", "OR", "XOR"]);
    const x = gate(g1, A, B), y = useNot ? 1 - C : gate(g2, B, C), out = gate(g3, x, y);
    return { text: "A circuit works on bits (0 and 1). What is <b>out</b>?", visual: code([`A = ${A}, B = ${B}, C = ${C}`, `x = A ${g1} B`, useNot ? "y = NOT C" : `y = B ${g2} C`, `out = x ${g3} y`]), choices: [0, 1], answer: out, hints: [
      "Work down the lines in order. Write the value of each new letter next to it.",
      "AND: 1 only if both are 1. OR: 1 if at least one is 1. XOR: 1 if the two are different. NAND and NOR are AND and OR flipped. NOT flips a bit.",
      "Example: A = 1, B = 0. x = A XOR B is 1 (different). y = NOT B is 1. out = x AND y is 1. Now do yours."
    ] };
  };

  const hexColor = () => {
    const t = ri(0, 2);
    const C = [["#FF0000", "red"], ["#00FF00", "green"], ["#0000FF", "blue"], ["#FFFFFF", "white"], ["#000000", "black"], ["#FFFF00", "yellow"], ["#00FFFF", "cyan"], ["#FF00FF", "magenta"]];
    if (t === 0) { const [h, n] = pick(C); return mc(`A color code #RRGGBB has two hex digits each for red, green and blue. FF is the strongest and 00 is none. What color is <b>${h}</b>?`, n, C.filter(c => c[1] !== n).map(c => c[1]), [
      "Split the code into three pairs: red, green and blue, in that order.",
      "Say which of the three lights are at full strength (FF) and which are off (00).",
      "Example: #FF8000 has full red, half green and no blue. That looks orange. Now do yours."
    ], `<div style="display:inline-block;width:70px;height:70px;border-radius:12px;border:3px solid #888;background:#ddd"></div>`); }
    const v = ri(1, 15) * 16 + ri(0, 15), hx = v.toString(16).toUpperCase().padStart(2, "0");
    return num(`In hex, the pair <b>${hx}</b> is a number. Remember: first digit x 16 + second digit (A = 10, B = 11, C = 12, D = 13, E = 14, F = 15). What is ${hx} in decimal?`, v, [
      "The first digit is worth sixteen each. The second digit is worth one each.",
      "Change any letters to their numbers first, then multiply the first digit by sixteen and add the second.",
      "Example: 2C = 2 x 16 + 12 = 44. Now do yours."
    ]);
  };

  const atbashWords = ["code", "loop", "game", "byte", "data", "bug", "cat", "dog", "sun", "moon", "tree", "star"];
  const atb = w => w.split("").map(c => String.fromCharCode(219 - c.charCodeAt(0))).join("");
  const atbash = () => {
    const w = pick(atbashWords), enc = Math.random() < 0.5;
    return txt(enc ? `Atbash swaps the first and last letters, the second and second-last, and so on. What does <b>${w}</b> become?` : `Atbash swaps the first and last letters, the second and second-last, and so on. Decode this: <b>${atb(w)}</b>`, enc ? atb(w) : w, [
      "Each letter swaps with the letter in the same position counting from the other end of the alphabet.",
      "Number the letters 1 to 26. A letter at position p swaps with the letter at position 27 minus p.",
      "Example: abc becomes zyx, because a swaps with z, b with y, c with x. Now do yours."
    ], code(["A B C D E F G H I J K L M", "Z Y X W V U T S R Q P O N"]));
  };

  const ERR = [
    ["A program says <b>IndexError: list index out of range</b>. What went wrong?", "It asked for a list spot that does not exist", ["It divided by zero", "It used a variable that was never made", "A bracket is missing"], "Think about how many items the list has and the number used in the square brackets.", "🚨"],
    ["A program says <b>ZeroDivisionError</b>. What went wrong?", "It tried to divide a number by zero", ["It used a list spot that does not exist", "A word was spelled wrongly in quotes", "The loop is too short"], "The error name tells you which maths rule was broken.", "🚨"],
    ["A program says <b>NameError: score is not defined</b>. What went wrong?", "It used a variable that was never created", ["It divided by zero", "It added text to a number", "The list was empty"], "Think about using a box before you have given it a value.", "🚨"],
    ["A program says <b>SyntaxError</b>. What does that mean?", "The code breaks the grammar rules of the language", ["The answer is wrong", "The computer is too slow", "The list is too long"], "Think of a sentence with missing punctuation. The computer cannot even read it.", "🚨"],
    ["The screen freezes and the program never ends. What is the most likely cause?", "A loop whose test never becomes false", ["A missing comment", "Too many variables", "A list that is too short"], "Think about what stops a while loop and what happens if nothing ever changes.", "♾️"],
    ["A program says <b>TypeError: cannot add text and a number</b>. What went wrong?", "It tried to add text to a number", ["It used a list spot that does not exist", "It forgot to close a loop", "A variable was never created"], "Look at the two different kinds of things the plus sign was given.", "🚨"],
    ["The program runs with no error message but prints the wrong answer. This is a ...", "logic bug", ["syntax error", "crash", "typing error"], "The computer did exactly what you said, but what you said was wrong.", "🐛"],
    ["What is the first thing to do when you see an error message?", "Read it and look at the line number", ["Delete the whole program", "Ignore it and run again", "Turn off the computer"], "The message is a clue left by the computer.", "🔍"],
    ["Which tool lets you see the value of a variable while the program runs?", "A print statement", ["A comment", "A bracket", "A new file"], "You can ask the program to show the value on the screen.", "🖨️"],
    ["A comment in code is ...", "text for people that the computer ignores", ["a command the computer runs first", "an error message", "a kind of loop"], "Comments explain the code to the human reader.", "💬"]
  ];

  const HTMLQ = [
    ["Which tag makes the biggest heading on a web page?", "h1", ["p", "img", "li"], "The letter stands for 'heading' and the number is the size level.", "🌐"],
    ["Which tag makes a paragraph of text?", "p", ["h1", "img", "li"], "Its name is the first letter of the word for a block of sentences.", "🌐"],
    ["Which tag shows a picture?", "img", ["li", "p", "title"], "Its name is a short form of the word 'image'.", "🖼️"],
    ["Which tag makes a clickable link?", "a", ["h1", "li", "img"], "Its name is short for 'anchor', like a ship's anchor holding two places together.", "🔗"],
    ["Which tag makes one bullet in a list?", "li", ["h1", "img", "title"], "Its name is short for 'list item'.", "📋"],
    ["What does <b>HTML</b> do?", "Gives the page its structure: headings, paragraphs and pictures", ["Sets the colors and fonts", "Makes the page react to clicks", "Stores the web server"], "Think of it as the skeleton of a page.", "🦴"],
    ["What does <b>CSS</b> do?", "Styles the page: colors, fonts and layout", ["Gives the page its structure", "Makes the page react to clicks", "Connects the page to the internet"], "Think of paint and decoration.", "🎨"],
    ["What does <b>JavaScript</b> do on a web page?", "Makes the page react and change", ["Sets the colors and fonts", "Writes the headings", "Chooses the web address"], "Think of buttons and games that respond when you click.", "🕹️"],
    ["Most tags come in pairs. What is different about the closing tag?", "It has a slash before the name", ["It is written in capital letters", "It has no name", "It comes first"], "Look at how the closing tag is marked to say 'this part ends here'.", "🌐"],
    ["Which tag sets the name shown on the browser tab?", "title", ["h1", "img", "li"], "It is the name of the page.", "🗂️"]
  ];

  const CT = [
    ["You split a big game into menus, the player and the enemies. This is ...", "decomposition", ["abstraction", "pattern recognition", "debugging"], "You made one big job into smaller jobs.", "🧩"],
    ["A subway map shows only stations and lines, not every building. This is ...", "abstraction", ["decomposition", "iteration", "debugging"], "Details that do not matter are left out.", "🗺️"],
    ["You notice that every level uses the same 'make an enemy' steps, so you write them once. Spotting what repeats is ...", "pattern recognition", ["abstraction", "debugging", "decomposition"], "You looked for things that are alike.", "🔎"],
    ["Writing exact step-by-step instructions to solve a problem is making an ...", "algorithm", ["abstraction", "variable", "input"], "It is a recipe a computer can follow.", "📜"],
    ["Finding and fixing a mistake in your code is called ...", "debugging", ["decomposition", "iteration", "abstraction"], "Think of getting rid of bugs.", "🐛"],
    ["Doing the same steps again and again with a loop is called ...", "iteration", ["abstraction", "debugging", "decomposition"], "It means repeating.", "🔁"],
    ["A game needs a character's position and health, but not their favorite color. Choosing what to keep is ...", "abstraction", ["debugging", "iteration", "pattern recognition"], "You keep the important details and ignore the rest.", "🎮"],
    ["Running a program on many different inputs to see if it always works is called ...", "testing", ["abstraction", "iteration", "decomposition"], "You check that the answers are what you expect.", "🧪"],
    ["You build a quiz app by making separate pieces for questions, scoring and the final screen. This is ...", "decomposition", ["abstraction", "iteration", "pattern recognition"], "A big task becomes several small tasks.", "🧱"]
  ];

  // ---------------------------------------------------------------------
  const lessons10 = [
    L("Lists inside lists", gridCell, [S("A grid is a list of lists", "🔲", "A <b>2D list</b> is a list whose items are also lists. It is like a table with rows and columns."), S("Two numbers", "grid[1][2]", "grid[row][column]. The first number picks the <b>row</b> (counting from the top), the second picks the <b>column</b> (from the left). Both start at <b>0</b>."), S("Example", "📍", "If grid = [[5, 6, 7], [8, 9, 1]], then grid[1][2] is row 1 = [8, 9, 1], column 2 = <b>1</b>.")]),
    L("Rows, columns and diagonals", gridSum, [S("Going across and down", "↔️↕️", "A <b>row</b> goes across. A <b>column</b> goes down."), S("The diagonal", "↘️", "The diagonal of a square grid uses grid[0][0], grid[1][1], grid[2][2] and so on: the row number and column number are equal."), S("Tip", "💡", "Write the numbers you need on paper first, then add them.")]),
    L("Gluing strings", concatQ, [S("Strings", "🔤", "A <b>string</b> is text in quotes. The <b>+</b> sign between two strings glues them together: \"sun\" + \"set\" makes \"sunset\"."), S("Repeating", "✖️", "A string times a number repeats it: \"ab\" * 3 makes \"ababab\"."), S("Tip", "💡", "Spaces are letters too. They only appear if you put them inside the quotes.")]),
    L("String tools", stringFn, [S("Built-in tools", "🧰", "Strings come with tools. <b>len(word)</b> counts the letters. <b>word.upper()</b> makes capitals."), S("Positions", "0️⃣", "<b>word[0]</b> is the first letter, word[1] the second, and so on. Counting starts at zero."), S("Replace", "🔁", "<b>word.replace(\"a\", \"*\")</b> swaps every a for a star. Example: \"banana\" becomes b*n*n*.")]),
    L("Text or number?", typeQ, [S("Quotes matter", "❝❞", "\"5\" in quotes is text. 5 without quotes is a number. They are different things to a computer."), S("Plus has two jobs", "➕", "Number + number adds: 5 + 3 = 8. Text + text glues: \"5\" + \"3\" = \"53\"."), S("Counting digits", "🔢", "len() on text counts the characters, even if they are digits.")]),
    L("Whole and leftover", divmodQ, [S("div and mod", "🍕", "<b>div</b> says how many whole groups fit. <b>mod</b> gives what is left over."), S("Example", "🥚", "17 eggs in boxes of 5: 17 div 5 = 3 full boxes, and 17 mod 5 = 2 eggs left."), S("Uses", "🕒", "Programs use div and mod for clocks (minutes into hours), pages, and splitting things into groups.")]),
    L("Count the ones that pass", countAbove, [S("A counter with a test", "🧮", "Start a box at 0. Loop through a list and use an IF. Add 1 only when the test is true. This counts the items that pass."), S("A total with a test", "➕", "Instead of adding 1, add the item itself: this totals only the items that pass."), S("Tip", "💡", "Cross out the items that fail first, then work with what is left.")]),
    L("What does this code do?", whatDoes, [S("Reading code", "👓", "You can often tell what code does without any numbers. Look at how the box starts, what happens in the loop, and what is printed."), S("Clues", "🕵️", "Start at 0 and add x: a total. Start at 0 and add 1: a count. Start at list[0] and compare: a biggest or smallest."), S("Tip", "💡", "Look for IF too. It means only some items count.")]),
    L("While loops with steps", whileTwo, [S("Test first", "🔁", "A <b>while</b> loop checks its test before every round. If the test is false, it stops."), S("Two boxes", "📦📦", "Often one box changes and another counts the rounds. A table with one column for each box keeps track."), S("Growing fast", "🌱", "x = x * 2 doubles every round, so it reaches big numbers in very few rounds.")]),
    L("Counting down", countdown, [S("Down and step", "⬇️", "A loop can count down: <b>for i from 9 down to 3 step 3</b> uses 9, 6 and 3."), S("Stop rule", "🛑", "It stops before it would go past the end number."), S("Tip", "💡", "Write out every value of i, then add or count them.")]),
    L("Products and sums in loops", productLoop, [S("Different starts", "1️⃣0️⃣", "A total starts at <b>0</b> because adding zero changes nothing. A product starts at <b>1</b> because multiplying by one changes nothing."), S("Squares", "🟦", "i * i is the square of i: 1, 4, 9, 16, 25 ..."), S("Tip", "💡", "Write the box after every round.")]),
    L("Star patterns", starQ, [S("Loops make shapes", "⭐", "A loop can print a row of stars for every row. The number of stars can depend on the row number."), S("Row rules", "📐", "'row' stars gives 1, 2, 3 ... 'row * 2' gives 2, 4, 6 ... '2 * row - 1' gives 1, 3, 5 ..."), S("Total", "🧮", "Work out each row, then add the rows to count all the stars.")]),
    L("Compound conditions", boolQ, [S("Small tests, big tests", "🧱", "Break a long test into small true/false comparisons, then combine them."), S("AND, OR, NOT", "🔀", "<b>AND</b> needs both true. <b>OR</b> needs at least one true. <b>NOT</b> flips the answer."), S("Brackets", "( )", "Do the inside of the brackets first.")]),
    L("How many looks?", linearSteps, [S("Linear search", "🔍", "Linear search looks at the items one by one from the start until it finds the target."), S("Found", "✅", "If the target is the 3rd item, it makes 3 looks and stops."), S("Not there", "❌", "If the target is not in the list, it must look at every item before it can say so.")]),
    L("Selection sort", selSort, [S("Pick the smallest", "🎯", "Selection sort looks through the unsorted part, finds the smallest item, and swaps it into the first spot of that part."), S("Pass by pass", "1️⃣2️⃣3️⃣", "After pass 1 the first spot is right. After pass 2 the first two are right, and so on."), S("Tip", "💡", "Only the two swapped items change in each pass.")]),
    L("Colors from numbers", rgbQ, [S("Red, green, blue", "🔴🟢🔵", "Every pixel mixes red, green and blue light. Each is a number from 0 (off) to 255 (full)."), S("Mixing light", "💡", "Red + green makes yellow. Green + blue makes cyan. Red + blue makes magenta. All three make white."), S("How many?", "256", "From 0 to 255 there are 256 different strengths for each light.")]),
    L("Letters are numbers", asciiQ, [S("Codes", "🔡", "Computers store letters as numbers. In the ASCII code, A = 65, B = 66, C = 67 ... Z = 90."), S("Small letters", "🔤", "Small letters start at a = 97, b = 98, and so on."), S("Counting along", "➡️", "To find a letter's code, count how many letters it is after A (or a) and add that to 65 (or 97).")]),
    L("Choosing a good test", testPick, [S("Edge cases", "🚧", "Bugs hide at the <b>edges</b> of a rule, where it changes from allowed to not allowed."), S("Compare", "⚖️", "Check each comparison sign in the code against the words of the rule. Does it include the end value or not?"), S("Pick the edge", "🎯", "A value in the middle usually works even when the code is wrong. Test the edge values.")]),
    L("Mixed practice", mix(gridCell, gridSum, concatQ, stringFn, typeQ, divmodQ, countAbove, whileTwo, countdown, boolQ), MIXS("2D lists, strings, div and mod, loops with tests, while loops, counting down and compound conditions.")),
    L("Level 10 Challenge", mix(gridSum, concatQ, stringFn, divmodQ, whatDoes, whileTwo, countdown, productLoop, starQ, boolQ, linearSteps, selSort, rgbQ, asciiQ, testPick), MIXS("everything from level 10: grids, strings, loops, searching, sorting, colors, letter codes and testing."))
  ];

  const lessons11 = [
    L("List tools", listOps, [S("Changing a list", "🧰", "<b>append(x)</b> adds to the end. <b>insert(i, x)</b> puts x at position i. <b>pop()</b> removes the last item. <b>pop(0)</b> removes the first."), S("Remove by value", "🗑️", "<b>remove(v)</b> deletes the first item that equals v."), S("Tip", "💡", "Rewrite the whole list after every line.")]),
    L("Same list or a copy?", aliasQ, [S("Two names", "🏷️🏷️", "b = a does <b>not</b> copy a list. It gives the same list a second name."), S("Shared", "🔗", "If a and b are two names for one list, changing it through b also changes a."), S("A real copy", "📄📄", "A copy makes a new separate list. Changing the copy leaves the original alone.")]),
    L("Filtering a list", filterQ, [S("Keep what passes", "🔍", "<b>Filtering</b> builds a new list holding only the items that pass a test."), S("Pattern", "🧱", "new = [], then for each x: IF test: new.append(x)."), S("Tip", "💡", "Write down the items that pass, in the same order.")]),
    L("Mapping a list", mapQ, [S("Same rule for all", "🗺️", "<b>Mapping</b> uses the same rule on every item and builds a new list."), S("Same length", "📏", "The new list is as long as the old one. Item 0 of the new list comes from item 0 of the old list."), S("Tip", "💡", "Do the rule on each item, one by one.")]),
    L("Records and fields", recordQ, [S("Objects in a list", "🗃️", "A list can hold <b>objects</b>, each with properties like name and score."), S("Reaching in", "players[1].name", "players[1] is the second player. The dot then reads one property of that player."), S("Searching", "🏆", "To find the best, compare one property (the score) across all the objects, then read another property (the name).")]),
    L("Break and continue", breakQ, [S("break", "🛑", "<b>break</b> ends the whole loop at once."), S("continue", "⏭️", "<b>continue</b> skips the rest of this round and starts the next one."), S("Tip", "💡", "Cross out skipped rounds, then do the rest.")]),
    L("Pairs of numbers", pairsQ, [S("Inner loop starts", "🔁🔁", "The inner loop can start at a different place each time, for example from i + 1."), S("Counting", "🧮", "For each i, count how many values j takes, and add the counts."), S("Pairs", "🤝", "Starting j at i + 1 counts each pair once. This is used to compare every item with every other.")]),
    L("Recursion with numbers", powerRec, [S("Function calls itself", "🔄", "A recursive function calls itself with a smaller problem."), S("Base case", "🛑", "The <b>base case</b> stops the calls. For power, e == 0 gives 1."), S("Back up", "⬆️", "Follow the calls down to the base case, then work the answers back up.")]),
    L("Merging sorted lists", mergeQ, [S("Two sorted lists", "🧩", "If two lists are already sorted, you can merge them into one sorted list quickly."), S("Take the smaller front", "👆", "Compare the first items of both lists. Take the smaller one. Repeat."), S("Used in merge sort", "🗂️", "Merge sort splits a list, sorts the halves, then merges them.")]),
    L("Counting comparisons", sortCompare, [S("Pairs of neighbours", "↔️", "Bubble sort compares neighbours. A row of n items has n - 1 neighbour pairs."), S("Getting shorter", "📉", "Each pass puts the biggest item at the end, so the next pass is one comparison shorter."), S("Total", "➕", "Add (n - 1) + (n - 2) + ... + 1. For 5 items: 4 + 3 + 2 + 1 = 10.")]),
    L("How steps grow", bigO, [S("Fast or slow?", "⏱️", "Programmers ask how the number of steps grows when the list gets longer."), S("Three kinds", "📈", "<b>Constant</b>: same steps whatever the length. <b>Linear</b>: about one step per item. <b>Squared</b>: length times length."), S("Loops", "🔁", "One loop is linear. A loop inside a loop is squared. Two loops one after the other are still linear.")]),
    L("NOT with AND and OR", deMorgan, [S("Flipping a test", "🔀", "NOT (A AND B) means at least one of them is false: (NOT A) OR (NOT B)."), S("The other way", "↔️", "NOT (A OR B) means both are false: (NOT A) AND (NOT B)."), S("Tip", "💡", "When NOT moves inside, each comparison flips and AND and OR swap.")]),
    L("State machines", stateQ, [S("States", "🚦", "A <b>state machine</b> is always in one state, like a door being closed, open or locked."), S("Events", "⚡", "An <b>event</b> can move it to a new state. A table says which new state each event gives."), S("Tip", "💡", "Track the current state after each event.")]),
    L("Shifting bits", shiftQ, [S("Slide left", "⬅️", "Shifting bits left by one place <b>doubles</b> a number. 0011 (3) becomes 0110 (6)."), S("Slide right", "➡️", "Shifting right by one place <b>halves</b> it and drops the remainder. 0110 (6) becomes 0011 (3)."), S("Many places", "🔢", "Shifting by k places doubles or halves k times.")]),
    L("Bitwise AND, OR, XOR", bitwise, [S("Column by column", "🧱", "Bitwise operations work on each pair of bits separately."), S("The three rules", "⚖️", "<b>AND</b>: 1 only if both are 1. <b>OR</b>: 1 if at least one is 1. <b>XOR</b>: 1 if the bits are different."), S("No carrying", "🚫", "Unlike adding, nothing is carried between columns.")]),
    L("How big is the data?", dataSize, [S("Bits and bytes", "🔢", "A byte is 8 bits."), S("Pictures", "🖼️", "A picture is a grid of pixels. Pixels x bytes per pixel = bytes for the picture."), S("Kilobytes", "📦", "Kilo means 1000. 1 kilobyte = 1000 bytes.")]),
    L("Inside a computer", facts(COMP, "Think about what job the part does.", "Example: a mouse sends your clicks to the computer, so it is an input device."), [S("Hardware", "🖥️", "<b>Hardware</b> is the parts you can touch. <b>Software</b> is the programs."), S("Main parts", "🧠", "The <b>CPU</b> follows instructions. <b>RAM</b> is short-term memory. <b>Storage</b> keeps files when the power is off."), S("Input and output", "⌨️🔊", "Input devices send information in. Output devices send it out.")]),
    L("Secret messages and safety", facts(CIPH, "Think about what the word means.", "Example: a long password with random words is harder to guess than a short common one."), [S("Encryption", "🔐", "<b>Encryption</b> scrambles a message. <b>Decryption</b> unscrambles it with the right key."), S("Plain and cipher", "✉️", "The normal message is <b>plaintext</b>. The scrambled one is <b>ciphertext</b>."), S("Stay safe", "🛡️", "Never share your password except with a parent. Be careful of tricks like phishing.")]),
    L("Mixed practice", mix(listOps, aliasQ, filterQ, mapQ, recordQ, breakQ, pairsQ, powerRec, mergeQ, sortCompare), MIXS("list tools, filtering and mapping, records, break and continue, recursion, merging and sorting.")),
    L("Level 11 Challenge", mix(listOps, aliasQ, filterQ, mapQ, recordQ, breakQ, pairsQ, powerRec, mergeQ, sortCompare, bigO, deMorgan, stateQ, shiftQ, bitwise, dataSize), MIXS("everything from level 11: lists, records, loops, recursion, sorting, bits, logic and state machines."))
  ];

  const lessons12 = [
    L("Dictionaries of lists", nestedQ, [S("Lists inside a dictionary", "📚", "A dictionary can hold lists as values: scores[\"Ava\"] is a whole list."), S("Two steps", "🔑➡️📍", "scores[\"Ava\"][1]: first the name picks the list, then the number picks an item inside it."), S("Tip", "💡", "Find the list first, then forget the other names.")]),
    L("Matching brackets", bracketQ, [S("A stack for brackets", "📚", "A computer can check brackets with a <b>stack</b>. Push each opening bracket."), S("Closing", "🔚", "For each closing bracket, pop the top and check that it is the matching kind."), S("Balanced", "⚖️", "The text is balanced only if every closing bracket matched and the stack is empty at the end.")]),
    L("Digits of a number", digitsQ, [S("Last digit", "🔢", "<b>n mod 10</b> gives the last digit of n. For 472 it is 2."), S("Chop it off", "✂️", "<b>n div 10</b> removes the last digit. 472 becomes 47."), S("Loop", "🔁", "Repeat until n is 0, and you have visited every digit.")]),
    L("Building a result", reduceQ, [S("Running result", "🧮", "<b>Reducing</b> a list means keeping one result that changes with every item."), S("Starting value", "1️⃣0️⃣", "Use 0 to add, 1 to multiply. For biggest, start low."), S("Building numbers", "🏗️", "r = r * 10 + digit builds a number from its digits.")]),
    L("Classes and objects", classQ, [S("A blueprint", "📐", "A <b>class</b> is a blueprint. Each <b>object</b> made from it has its own copy of the values."), S("Methods", "🛠️", "A <b>method</b> is a function inside the class. a.add(3) runs the method on object a only."), S("Tip", "💡", "Keep a separate box for every object.")]),
    L("Greatest common divisor", gcdQ, [S("Euclid's idea", "📏", "The GCD is the biggest number that divides both numbers. Euclid found a quick way to find it."), S("The loop", "🔁", "Replace (a, b) with (b, a mod b) until b is 0. The answer is a."), S("Tip", "💡", "Write a table with a and b after each round.")]),
    L("Finding primes", primeQ, [S("Prime", "🔢", "A <b>prime</b> number has only two divisors: 1 and itself. 7 and 13 are prime. 9 is not (3 divides it)."), S("Trial division", "🔍", "Try d = 2, 3, 4 ... and stop at the first d where n mod d is 0."), S("Result", "✅", "If the first divisor you find is n itself, n is prime.")]),
    L("Counting recursive calls", callsQ, [S("Call tree", "🌳", "A recursive function that calls itself twice grows a tree of calls."), S("Count the boxes", "📦", "Every call is a box in the tree. The base cases are the ends of the branches."), S("Compare", "⚖️", "A function that calls itself once makes a single line of calls.")]),
    L("Merge sort", mergeSortQ, [S("Divide", "✂️", "Merge sort cuts the list into two halves, then cuts each half again, until every piece has one item."), S("Conquer", "🧩", "One item is already sorted. Then it merges the pieces back together in order."), S("Levels", "📉", "Halving 8 items gives 4, 2, 1. That is 3 levels.")]),
    L("Graphs: towns and roads", graphDeg, [S("Nodes and edges", "🗺️", "A <b>graph</b> is dots (<b>nodes</b>) joined by lines (<b>edges</b>), like towns and roads."), S("Degree", "🔢", "The number of edges that touch a node is its <b>degree</b>."), S("Handshake", "🤝", "Each edge has two ends, so the degrees of all nodes add up to twice the number of edges.")]),
    L("Shortest route", graphPath, [S("Fewest roads", "🛣️", "The shortest path in a graph uses the fewest edges."), S("Rings", "🎯", "Start at one node. Everything one edge away is ring 1, then ring 2, and so on."), S("Stop early", "🏁", "The first ring that contains your target gives the answer.")]),
    L("Trees", treeQ, [S("Parents and children", "🌳", "A <b>tree</b> has a <b>root</b> at the top. Each node can have <b>children</b>. A node with no children is a <b>leaf</b>."), S("Growing wider", "📈", "If every node has 2 children, level 1 has 1 node, level 2 has 2, level 3 has 4, level 4 has 8."), S("Folders", "📁", "Folders on a computer form a tree.")]),
    L("Logic gates", gatesQ, [S("Bits in, bit out", "🔌", "A <b>logic gate</b> takes bits (0 or 1) and gives one bit."), S("The gates", "🚪", "AND: both 1. OR: at least one 1. XOR: bits differ. NOT flips. NAND and NOR are AND and OR flipped."), S("Chains", "🔗", "Real computers chain millions of gates together.")]),
    L("Hex colors", hexColor, [S("Web colors", "🎨", "Web pages write colors as #RRGGBB: two hex digits each for red, green and blue."), S("Strength", "💪", "00 is none. FF is full (255). 80 is about half."), S("Examples", "🌈", "#FF0000 is red. #FFFF00 is yellow (full red + full green). #000000 is black.")]),
    L("Atbash cipher", atbash, [S("A mirror alphabet", "🪞", "The <b>Atbash</b> cipher is an old secret code that swaps the alphabet with its mirror: A with Z, B with Y, C with X."), S("A trick", "27 - p", "If a letter is in position p (A = 1), it swaps with position 27 - p."), S("Same both ways", "↔️", "Encoding and decoding use exactly the same rule.")]),
    L("Reading error messages", facts(ERR, "Think about what kind of mistake the message points to.", "Example: an error on line 5 tells you the line to check first."), [S("Errors help", "🚨", "An error message is a clue. It names the kind of mistake and the line number."), S("Kinds", "🧾", "<b>Syntax</b>: broken grammar. <b>Runtime</b>: crashes while running. <b>Logic</b>: runs but gives a wrong answer."), S("Fixing", "🔧", "Read it, go to that line, and use print to look at values.")]),
    L("The web page trio", facts(HTMLQ, "Think about what the name stands for.", "Example: the tag ul holds a bullet list, and each bullet inside it is a li."), [S("HTML", "🦴", "<b>HTML</b> is the structure of a page: headings, paragraphs, pictures and links."), S("CSS", "🎨", "<b>CSS</b> is the style: colors, fonts and layout."), S("JavaScript", "🕹️", "<b>JavaScript</b> is the behavior: what happens when you click.")]),
    L("Thinking like a computer scientist", facts(CT, "Think about which problem-solving habit the story shows.", "Example: drawing only what matters on a map and leaving out the rest is abstraction."), [S("Break it down", "🧩", "<b>Decomposition</b> splits a big problem into small ones."), S("Spot and simplify", "🔎", "<b>Pattern recognition</b> finds what repeats. <b>Abstraction</b> keeps what matters and ignores the rest."), S("Steps", "📜", "An <b>algorithm</b> is a set of clear steps. <b>Debugging</b> and <b>testing</b> make it right.")]),
    L("Mixed practice", mix(nestedQ, bracketQ, digitsQ, reduceQ, classQ, gcdQ, primeQ, callsQ, graphDeg, graphPath, treeQ, gatesQ), MIXS("dictionaries of lists, stacks, digits, reducing, classes, Euclid, primes, recursion, graphs, trees and logic gates.")),
    L("Level 12 Challenge", mix(nestedQ, bracketQ, digitsQ, reduceQ, classQ, gcdQ, primeQ, callsQ, mergeSortQ, graphDeg, graphPath, treeQ, gatesQ, hexColor, atbash, facts(ERR, "Think about what kind of mistake the message points to.", "Example: an error on line 5 tells you the line to check first."), facts(CT, "Think about which problem-solving habit the story shows.", "Example: drawing only what matters on a map and leaving out the rest is abstraction.")), MIXS("everything from level 12: data structures, algorithms, graphs, trees, logic, colors, ciphers, errors and computational thinking."))
  ];

  Object.assign(CODING_LEVELS, { 10: lessons10, 11: lessons11, 12: lessons12 });
})();
