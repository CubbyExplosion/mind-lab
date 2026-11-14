// ext/coding-13-15.js  Mind Lab Coding levels 13-15 (60 lessons, unplugged pseudo-code)
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = t => [
    S("Review time!", "🔄", "This lesson mixes ideas you already know. Take your time and think about each one."),
    S("Remember", "🧠", t),
    S("Tip", "💡", "Go slowly. Trace the code one line at a time and write down the values as you go.")
  ];
  const ind = n => "&nbsp;&nbsp;&nbsp;".repeat(n);
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const LT = "&lt;", GT = "&gt;";
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
  const yn = (text, ok, hints, visual) => ({ text, visual, choices: ["yes", "no"], answer: ok ? "yes" : "no", hints });
  const lst = a => "[" + a.join(", ") + "]";
  const uniq = (n, lo, hi) => shuf(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: strChoices(r, w), answer: r, hints: [nudge, c || nudge, example] };
  };
  const table = (head, rows) => `<table style="border-collapse:collapse;margin:auto;font-size:0.95em"><tr>${head.map(h => `<th style="border:1px solid #889;padding:3px 10px;background:#dde4ff;color:#1a2a55">${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td style="border:1px solid #889;padding:3px 10px">${c}</td>`).join("")}</tr>`).join("")}</table>`;
  const LET = "ABCDEFGH";

  // =====================================================================
  // LEVEL 13
  // =====================================================================
  const precQ = () => {
    const a = ri(2, 9), b = ri(2, 6), c = ri(2, 6), d = ri(1, 9), r = ri(1, c - 1), d2 = ri(1, a);
    const [e, ans] = pick([
      [`${a} + ${b} * ${c}`, a + b * c],
      [`(${a} + ${b}) * ${c}`, (a + b) * c],
      [`${a * b} div ${b} + ${c}`, a + c],
      [`${a * c + r} mod ${c} * ${b}`, r * b],
      [`${a} * ${b} + ${c} * ${d}`, a * b + c * d],
      [`${a} + ${b} * ${c} - ${d2}`, a + b * c - d2],
      [`${a} * (${b} + ${c}) - ${d2}`, a * (b + c) - d2]
    ]);
    return num(`What does this expression give?<br><b>${e}</b>`, ans, [
      "Not every operator goes first. Which kinds of operators are done before the others?",
      "Order: brackets first, then * div mod (left to right), then + and - (left to right). Rewrite the line after each step.",
      "Example: 2 + 3 * 4. Multiply first: 3 * 4 = 12. Then add: 2 + 12 = 14. Now do yours."
    ]);
  };

  const timeQ = () => {
    const U = pick([[60, "minutes", "hours"], [60, "seconds", "minutes"], [24, "hours", "days"], [7, "days", "weeks"], [12, "months", "years"]]);
    const k = ri(2, 9), r = ri(1, U[0] - 1), t = k * U[0] + r, dv = Math.random() < 0.5;
    return num(`A timer shows <b>${t}</b> ${U[1]}. What is <b>${t} ${dv ? "div" : "mod"} ${U[0]}</b>?<br>(${dv ? `That is how many full ${U[2]} fit.` : `That is how many ${U[1]} are left over.`})`, dv ? k : r, [
      "div tells how many whole groups fit. mod tells what is left over after taking out the whole groups.",
      "Take away whole groups of the second number again and again. Count the groups for div. What remains is the mod.",
      "Example: 130 minutes. 130 div 60 = 2 full hours. 130 mod 60 = 10 minutes left over. Now do yours."
    ]);
  };

  const STM = [
    ["a = a + b", v => { v.a = v.a + v.b; }], ["b = a * 2", v => { v.b = v.a * 2; }], ["c = a + b", v => { v.c = v.a + v.b; }],
    ["c = c + b", v => { v.c = v.c + v.b; }], ["a = c - b", v => { v.a = v.c - v.b; }], ["b = b + 1", v => { v.b = v.b + 1; }],
    ["a = a * 2", v => { v.a = v.a * 2; }], ["c = a", v => { v.c = v.a; }], ["b = c", v => { v.b = v.c; }]
  ];
  const threeVars = () => {
    for (;;) {
      const v = { a: ri(1, 9), b: ri(1, 9), c: ri(1, 9) }, start = { ...v };
      const st = shuf(STM).slice(0, 4);
      st.forEach(s => s[1](v));
      const w = pick(["a", "b", "c"]);
      if (v[w] < 0 || v[w] > 99) continue;
      return num(`What is the value of <b>${w}</b> at the end?`, v[w], [
        "Keep three boxes: a, b and c. Each line changes only the box on its left side of the = sign.",
        "Work from the top. After each line, write the new value of the box that changed and keep the others the same. Use the newest values.",
        "Example: a = 2, b = 3. Line 'a = a + b' makes a = 5. Line 'b = a * 2' then makes b = 10. Now do yours."
      ], code([`a = ${start.a}`, `b = ${start.b}`, `c = ${start.c}`, ...st.map(s => s[0])]));
    }
  };

  const composeQ = () => {
    for (;;) {
      const p = ri(1, 9), m = ri(2, 5), s = ri(1, 5), x = ri(1, 9);
      const F = { f: [`x + ${p}`, y => y + p], g: [`x * ${m}`, y => y * m], h: [`x - ${s}`, y => y - s] };
      const [o, i] = shuf(["f", "g", "h"]).slice(0, 2);
      const ans = F[o][1](F[i][1](x));
      if (ans < 0) continue;
      return num(`What does <b>${o}(${i}(${x}))</b> give?`, ans, [
        "When one call sits inside another, the inside one runs first. Its answer becomes the input of the outside one.",
        "Step one: put the number in the inside function. Step two: put that result into the outside function.",
        "Example: f(x) = x + 1 and g(x) = x * 3. f(g(2)): g(2) = 6, then f(6) = 7. Now do yours."
      ], code([`function ${o}(x): return ${F[o][0]}`, `function ${i}(x): return ${F[i][0]}`]));
    }
  };

  const earlyRet = () => {
    const A = ri(4, 9), B = ri(1, 5), n = ri(1, 20);
    const ans = n < A ? n * 2 : n % 2 === 0 ? n / 2 : n + B;
    return num(`What does <b>f(${n})</b> return?`, ans, [
      "A function stops at the first return it reaches. Lines after that one never run.",
      "Go down the lines in order. Check each if. When an if is true, do its return and stop. If it is false, move to the next line.",
      "Example: function g(n): if n ${LT} 3 return 0; if n mod 2 == 0 return 8; return 9. g(6): 6 is not below 3, but it is even, so it returns 8. Now do yours.".replace("${LT}", LT)
    ], code(["function f(n)", ind(1) + `if n ${LT} ${A}: return n * 2`, ind(1) + "if n mod 2 == 0: return n div 2", ind(1) + `return n + ${B}`]));
  };

  const shortC = () => {
    const hs = [
      "Short-circuit means the computer stops checking as soon as the answer is certain.",
      "AND is already false if its first part is false. OR is already true if its first part is true. In those cases the rest is skipped.",
      "Example: 'a and b' where a is false. The whole thing must be false, so b is never looked at. Now do yours."
    ];
    if (Math.random() < 0.5) {
      const x = ri(1, 9), t = ri(2, 8), op = pick(["and", "or"]);
      const first = x > t;
      const second = pick([`10 div x ${GT} 1`, "x mod 2 == 0", `x * 2 ${LT} 15`]);
      return yn(`Is the second check <b>(${second})</b> ever looked at?`, op === "and" ? first : !first, hs, code([`x = ${x}`, `if x ${GT} ${t} ${op} ${second}: print("go")`]));
    }
    const names = shuf(["sunny", "windy", "warm", "dry", "calm"]).slice(0, 3), op = pick(["and", "or"]);
    const vals = names.map(() => Math.random() < 0.5);
    let cnt = 3;
    for (let i = 0; i < 3; i++) { if ((op === "and" && !vals[i]) || (op === "or" && vals[i])) { cnt = i + 1; break; } }
    return { text: `How many of the three checks does the computer look at?`, visual: code(names.map((n, i) => `${n} = ${vals[i]}`).concat([`if ${names.join(" " + op + " ")}: print("yes")`])), choices: [1, 2, 3], answer: cnt, hints: hs };
  };

  const nestedTri = () => {
    const N = ri(3, 6);
    const kinds = [[`1 to i`, i => i], [`1 to ${N} - i`, i => N - i], [`i to ${N}`, i => N - i + 1], [`1 to 2`, () => 2]];
    const [lab, f] = pick(kinds);
    let total = 0;
    for (let i = 1; i <= N; i++) total += f(i);
    return num("How many times does <b>print(\"*\")</b> run in total?", total, [
      "The inner loop starts over every time the outer loop moves on. Count the inner loop for each value of i.",
      "Make a small list: for i = 1 how many stars, for i = 2 how many stars, and so on. Then add the list.",
      "Example: for i from 1 to 3, inner loop j from 1 to i. That prints 1 star, then 2 stars, then 3 stars: 1 + 2 + 3 = 6. Now do yours."
    ], code([`for i from 1 to ${N}`, ind(1) + `for j from ${lab}`, ind(2) + "print(\"*\")"]));
  };

  const fibLoop = () => {
    const a0 = ri(0, 2), b0 = ri(1, 3), k = ri(3, 6), w = pick(["a", "b"]);
    let a = a0, b = b0;
    for (let i = 0; i < k; i++) { const t = a + b; a = b; b = t; }
    return num(`What does the program print?`, w === "a" ? a : b, [
      "Make a table with columns a and b. Each round, the new b is the sum of the old a and old b, and the new a is the old b.",
      "Do the rounds one at a time and write a new row each time. Use the OLD values to make the new ones.",
      "Example: a = 1, b = 2. One round: t = 3, a = 2, b = 3. Second round: t = 5, a = 3, b = 5. Now do yours."
    ], code([`a = ${a0}`, `b = ${b0}`, `repeat ${k} times`, ind(1) + "t = a + b", ind(1) + "a = b", ind(1) + "b = t", `print(${w})`]));
  };

  const cstep = n => (n % 2 ? 3 * n + 1 : n / 2);
  const csteps = n => { let s = 0; while (n !== 1) { n = cstep(n); s++; } return s; };
  const collatzQ = () => {
    const rule = ["Rule: if n is even, the next number is n div 2. If n is odd, the next number is 3 * n + 1."];
    if (Math.random() < 0.5) {
      const n = pick([3, 4, 5, 6, 8, 10, 12, 13, 16, 20]);
      return num(`${rule[0]}<br>Start at <b>${n}</b>. How many steps does it take to reach 1?`, csteps(n), [
        "Write the numbers one after another. Count the arrows between them, not the numbers.",
        "At each number ask: even or odd? Then apply the matching rule. Stop when you land on 1.",
        "Example: start at 6. 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1. Count the arrows to get the steps. Now do yours."
      ]);
    }
    const n = ri(3, 15), k = ri(2, 4);
    let m = n; for (let i = 0; i < k; i++) m = cstep(m);
    return num(`${rule[0]}<br>Start at <b>${n}</b>. What number do you reach after <b>${k}</b> steps?`, m, [
      "Do one step at a time, and write down each number you get.",
      "At each number ask: even or odd? Then apply the matching rule. Stop after the right number of steps.",
      "Example: start at 7. Step 1: odd, so 3 * 7 + 1 = 22. Step 2: even, so 22 div 2 = 11. Now do yours."
    ]);
  };

  const fizzQ = () => {
    const [a, b] = shuf([2, 3, 4, 5]).slice(0, 2), n = ri(1, 40);
    const ans = n % a === 0 && n % b === 0 ? "FizzBuzz" : n % a === 0 ? "Fizz" : n % b === 0 ? "Buzz" : String(n);
    return mc(`What does the program print for <b>n = ${n}</b>?`, ans, ["Fizz", "Buzz", "FizzBuzz", String(n)], [
      "Check the tests in order from the top. The first true test decides what is printed.",
      "For each test, work out n mod the number. A remainder of zero means n divides evenly.",
      "Example: n = 9 with tests 'mod 3' for Fizz and 'mod 2' for Buzz. 9 mod 3 = 0, but 9 mod 2 is not 0, so only Fizz. Now do yours."
    ], code([`if n mod ${a} == 0 and n mod ${b} == 0: print("FizzBuzz")`, `else if n mod ${a} == 0: print("Fizz")`, `else if n mod ${b} == 0: print("Buzz")`, "else: print(n)"]));
  };

  const SF = ["planet", "garden", "rocket", "window", "pencil", "bridge", "cookie", "jungle", "castle", "silver", "button", "puzzle"];
  const strFind = () => {
    const w = pick(SF), t = ri(0, 2);
    if (t === 0) {
      const ch = pick(w.split("")), idx = w.indexOf(ch);
      return num(`What does <b>word.indexOf("${ch}")</b> give? (It is the position of the first match, counting from zero.)`, idx, [
        "indexOf looks along the word from the left and tells you where the first match is. Positions start at zero.",
        "Count the letters one by one from the left, starting at zero, until you meet the letter. Ignore later copies.",
        "Example: \"banana\".indexOf(\"n\") is 2, because b is 0, a is 1 and n is 2. Now do yours."
      ], code([`word = "${w}"`]));
    }
    if (t === 1) {
      const ch = pick([...new Set(w.split(""))]), to = pick("xyzq".split(""));
      return txt(`What does <b>word.replace("${ch}", "${to}")</b> give? (It changes every match.)`, w.split(ch).join(to), [
        "replace swaps every copy of the old letter. Other letters stay the same.",
        "Copy the word letter by letter. Change a letter only when it matches the old one.",
        "Example: \"balloon\".replace(\"o\", \"u\") gives balluun. Now do yours."
      ], code([`word = "${w}"`]));
    }
    const i = ri(0, w.length - 3), sub = w.slice(i, i + 3), yes = Math.random() < 0.5;
    const bad = sub.slice(0, 2) + (sub[2] === "z" ? "q" : "z");
    return yn(`Is <b>word.contains("${yes ? sub : bad}")</b> true?`, yes, [
      "contains asks: does this exact bit of text appear somewhere inside the word, in that order?",
      "Slide the small piece along the word. Every letter of the piece must match, one right after the other.",
      "Example: \"rainbow\".contains(\"bow\") is true. \"rainbow\".contains(\"row\") is false, because the letters are not side by side in that order. Now do yours."
    ], code([`word = "${w}"`]));
  };

  const SENT = ["i like to code on rainy days", "robots can help us build big things", "my cat sleeps all afternoon", "we planted seeds in the garden", "learning to code is fun", "the moon rises over the quiet hills", "birds sing at the start of the day", "a small bug can stop a big program"];
  const splitJoin = () => {
    const s = pick(SENT), ws = s.split(" "), t = ri(0, 2);
    const vis = code([`text = "${s}"`, "words = text.split(\" \")"]);
    if (t === 0) return num("What is <b>len(words)</b>?", ws.length, [
      "split(\" \") cuts the text at every space. The pieces go into a list.",
      "Count the words in the sentence. Each word becomes one item of the list.",
      "Example: \"red green blue\".split(\" \") gives a list of three items. Now do yours."
    ], vis);
    if (t === 1) { const i = ri(0, ws.length - 1); return txt(`What is <b>words[${i}]</b>?`, ws[i], [
      "Each word is an item in the list. The first item is at position zero.",
      "Count the words from the left. The number in the brackets is how many words to skip.",
      "Example: for \"red green blue\", words[1] is green, because red is at position zero. Now do yours."
    ], vis); }
    const i = ri(0, ws.length - 1);
    return num(`How many letters are in <b>words[${i}]</b>?`, ws[i].length, [
      "First find the word at that position (start counting at zero). Then count its letters.",
      "Do it in two steps: pick the word from the list, then count only the letters of that word.",
      "Example: for \"red green blue\", words[1] is green, which has 5 letters. Now do yours."
    ], vis);
  };

  const revRot = () => {
    const n = ri(5, 6), a = uniq(n, 1, 9), k = ri(0, n - 1), t = ri(0, 2);
    let r, lab;
    if (t === 0) { r = [...a].reverse(); lab = "reverse(nums)"; }
    else if (t === 1) { const m = ri(1, 2); r = [...a.slice(m), ...a.slice(0, m)]; lab = `rotateLeft(nums, ${m})`; }
    else { const m = ri(1, 2); r = [...a.slice(n - m), ...a.slice(0, n - m)]; lab = `rotateRight(nums, ${m})`; }
    return num(`rotateLeft(list, m) moves the first m items to the end. rotateRight(list, m) moves the last m items to the front.<br>What is <b>result[${k}]</b>?`, r[k], [
      "First write out the whole new list. Then pick the item at the position asked for, counting from zero.",
      "Reverse: write the list backwards. Rotate: move the items as the description says, keeping their order.",
      "Example: [1, 2, 3, 4]. reverse gives [4, 3, 2, 1]. rotateLeft by 1 gives [2, 3, 4, 1]. Now do yours."
    ], code([`nums = ${lst(a)}`, `result = ${lab}`]));
  };

  const setsQ = () => {
    const A = Array.from({ length: ri(5, 6) }, () => ri(1, 8)), B = Array.from({ length: ri(5, 6) }, () => ri(1, 8));
    const sa = new Set(A), sb = new Set(B), t = ri(0, 3);
    const vis = code([`A = ${lst(A)}`, `B = ${lst(B)}`]);
    const hs = [
      "A set keeps each value only once. Duplicates disappear.",
      "First cross out repeated values in A and in B so each value is listed once. Then compare the two clean lists.",
      "Example: A = [1, 1, 2], B = [2, 3]. set(A) has 2 items. Union is {1, 2, 3}: 3 items. Both lists share just 2: 1 item. Now do yours."
    ];
    if (t === 0) return num("How many items are in <b>set(A)</b>?", sa.size, hs, vis);
    if (t === 1) return num("How many items are in the <b>union</b> (everything in A or B, each once)?", new Set([...A, ...B]).size, hs, vis);
    if (t === 2) return num("How many items are in the <b>intersection</b> (values that are in both A and B)?", [...sa].filter(x => sb.has(x)).length, hs, vis);
    return num("How many different values are in A but <b>not</b> in B?", [...sa].filter(x => !sb.has(x)).length, hs, vis);
  };

  const wrapQ = () => {
    const bits = pick([3, 4, 5, 6, 8]), M = 2 ** bits;
    if (Math.random() < 0.3) return num(`A counter has <b>${bits} bits</b>. Its biggest value is ${M - 1}. What does it show after adding 1 to the biggest value?`, 0, [
      "A counter cannot grow forever. When it is full, adding one more makes it start over.",
      "Think of an odometer or a clock: after the last number, it goes back to the beginning.",
      "Example: a 2-bit counter holds 0 to 3. At 3, adding 1 wraps around to the start. Now do yours."
    ]);
    const add = ri(3, 12), start = M - ri(1, add - 1);
    return num(`A counter has <b>${bits} bits</b>, so it holds ${M} values (0 to ${M - 1}) and wraps around after the biggest one. It shows <b>${start}</b>. What does it show after adding <b>${add}</b>?`, (start + add) % M, [
      "When the counter passes its biggest value, it goes back to zero and keeps counting.",
      "Add the numbers. Then take away the size of the counter (how many values it holds) as many times as needed. This is the same as mod.",
      "Example: a 3-bit counter holds 8 values. At 6, add 5. 6 + 5 = 11, and 11 mod 8 = 3. Now do yours."
    ]);
  };

  const baseQ = () => {
    if (Math.random() < 0.6) {
      const b = pick([3, 5, 8]), len = ri(2, 3), ds = Array.from({ length: len }, (_, i) => ri(i === 0 ? 1 : 0, b - 1));
      const val = ds.reduce((a, d) => a * b + d, 0);
      return num(`A number written in <b>base ${b}</b> is <b>${ds.join("")}</b>. What is it in ordinary (base 10) numbers?`, val, [
        `In base ${b}, each place is worth ${b} times the place to its right (just like tens in base 10).`,
        "List the place values from the right: 1, then the base, then the base times itself. Multiply each digit by its place value and add.",
        "Example: 21 in base 3 = 2 * 3 + 1 = 7. Now do yours."
      ]);
    }
    const b = pick([5, 8]), n = ri(b, b * b - 1), s = n.toString(b);
    return txt(`Write the ordinary number <b>${n}</b> in <b>base ${b}</b>.`, s, [
      "Find how many whole groups of the base fit into the number. That is the left digit. What is left over is the right digit.",
      "Use div and mod with the base: the left digit is n div base, the right digit is n mod base.",
      "Example: 11 in base 3. 11 div 3 = 3, 11 mod 3 = 2. The 3 is too big for one digit, so go again: 3 div 3 = 1, 3 mod 3 = 0. So 11 is 102 in base 3. Now do yours (it has two digits)."
    ]);
  };

  const passQ = () => {
    const A = pick([[10, "digits only (0 to 9)"], [26, "lowercase letters only"], [52, "lowercase and capital letters"], [36, "lowercase letters and digits"]]);
    const len = A[0] > 30 ? ri(2, 3) : ri(3, 4);
    if (Math.random() < 0.65) return num(`A password uses ${A[1]}, and is <b>${len}</b> characters long. How many different passwords are possible?`, A[0] ** len, [
      "Each position can be any of the allowed characters, and the choices in different positions do not affect each other.",
      "Multiply: the number of choices for the first spot, times the number of choices for the second spot, and so on for every spot.",
      "Example: 3 characters from 5 choices each: 5 * 5 * 5 = 125 passwords. Now do yours."
    ]);
    return nc(`A password uses ${A[1]}. Adding <b>one more character</b> to its length makes the number of possible passwords how many times bigger?`, A[0], Math.max(4, Math.round(A[0] / 3)), [
      "A new position multiplies the possibilities by the number of choices for that position.",
      "Count how many different characters are allowed in one spot. That is the multiplier.",
      "Example: with 6 allowed characters, a 2-character password has 36 options and a 3-character one has 216, which is 6 times more. Now do yours."
    ]);
  };

  const PETS = ["Milo", "Luna", "Coco", "Bean", "Pip", "Rex", "Nova", "Fig"];
  const tableQ = () => {
    const names = shuf(PETS).slice(0, 6), ages = uniq(6, 1, 12);
    const rows = names.map((n, i) => [n, pick(["cat", "dog", "fish", "bird"]), ages[i]]);
    const vis = table(["name", "kind", "age"], rows), t = ri(0, 3);
    const hs = [
      "A table has rows (one per pet) and columns (name, kind, age). Read only the rows and columns the question asks about.",
      "First find the rows that match the condition. Then answer exactly what is asked: count them, or read one column.",
      "Example: table with rows (Bo, cat, 4), (Ty, dog, 6), (Al, cat, 2). Count of kind == cat is 2. Age of Ty is 6. Now do yours."
    ];
    if (t === 0) { const k = pick(rows)[1]; return num(`How many rows have <b>kind == "${k}"</b>?`, rows.filter(r => r[1] === k).length, hs, vis); }
    if (t === 1) { const r = pick(rows); return num(`What is the <b>age</b> in the row where name == "${r[0]}"?`, r[2], hs, vis); }
    if (t === 2) { const m = ri(3, 9); return num(`How many rows have <b>age ${GT} ${m}</b>?`, rows.filter(r => r[2] > m).length, hs, vis); }
    const oldest = rows.reduce((a, b) => (b[2] > a[2] ? b : a));
    return txt("Which <b>name</b> has the biggest age?", oldest[0], hs, vis);
  };

  const lessons13 = [
    L("Order of operations", precQ, [S("Who goes first?", "🧮", "Computers follow an order: <b>brackets</b> first, then <b>* div mod</b>, then <b>+ and -</b>. Equal ones go left to right."), S("Example", "✏️", "2 + 3 * 4: multiply first, 3 * 4 = 12, then 2 + 12 = 14. With brackets, (2 + 3) * 4 = 20."), S("Tip", "💡", "Rewrite the line after each step and cross out what you have finished.")]),
    L("Clock math with div and mod", timeQ, [S("Groups", "⏱️", "<b>div</b> counts how many full groups fit. <b>mod</b> gives what is left over."), S("Clock example", "🕐", "130 minutes = 2 hours and 10 minutes. 130 div 60 = 2 and 130 mod 60 = 10."), S("Tip", "💡", "Programs use div and mod to turn seconds into minutes, or days into weeks.")]),
    L("Three boxes", threeVars, [S("Three variables", "📦", "Each variable is a box with a value. A line like <b>b = a * 2</b> changes only box b."), S("Use the newest", "🆕", "When a line uses a variable, use its current value, even if an earlier line changed it."), S("Table it", "📋", "Make a small table with a column for each variable. Add a row after every line.")]),
    L("Functions inside functions", composeQ, [S("Inside first", "🎁", "In f(g(3)), the inside call g(3) runs first. Its result goes into f."), S("Example", "✏️", "f(x) = x + 1 and g(x) = x * 3. g(2) = 6, then f(6) = 7."), S("Order matters", "↔️", "g(f(2)) is not the same: f(2) = 3, then g(3) = 9.")]),
    L("Return stops the function", earlyRet, [S("First return wins", "🛑", "A function ends as soon as it runs a <b>return</b>. Lines below it are skipped."), S("Example", "✏️", "if n ${LT} 3 return 0. For n = 1 the function stops right there.".replace("${LT}", LT)), S("Tip", "💡", "Go down the lines. The first if that is true gives the answer. If none is true, use the last return.")]),
    L("Short-circuit checks", shortC, [S("Lazy checking", "😴", "In <b>A and B</b>, if A is false the whole thing is false, so B is skipped."), S("Same for or", "🔀", "In <b>A or B</b>, if A is true the whole thing is true, so B is skipped."), S("Why it helps", "🛡️", "It can skip checks that would crash, like dividing by zero.")]),
    L("Loops inside loops: counting", nestedTri, [S("Restart", "🔁", "The inner loop starts over for every step of the outer loop."), S("Table", "📋", "Make a list: for each value of i, how many times does the inner loop run? Add them up."), S("Triangle", "🔺", "If the inner loop runs i times, then for i = 1 to 4 you get 1 + 2 + 3 + 4 = 10.")]),
    L("Fibonacci with a loop", fibLoop, [S("Growing pattern", "🐚", "Fibonacci numbers: each is the sum of the two before. 1, 1, 2, 3, 5, 8 ..."), S("Three boxes", "📦", "A loop uses a, b and a helper t. t = a + b, then a = b, then b = t."), S("Order matters", "⚠️", "If you change a before using it, you get the wrong sum.")]),
    L("The Collatz puzzle", collatzQ, [S("A famous puzzle", "🌀", "Pick a number. If it is even, halve it. If it is odd, do 3 * n + 1."), S("Example", "✏️", "6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1."), S("Unsolved", "🧩", "Nobody has proved it always reaches 1. Computers have tested a huge number of starting values.")]),
    L("Fizz and Buzz", fizzQ, [S("A classic test", "🎤", "Programmers often write a loop that prints Fizz, Buzz or a number."), S("Order of tests", "🔢", "Test the both-case first, or it will never be reached."), S("Mod", "➗", "n mod 3 == 0 means n divides evenly by 3.")]),
    L("Finding and replacing", strFind, [S("indexOf", "📍", "<b>indexOf</b> gives the position of the first match. Positions start at zero. If it is missing, many languages give -1."), S("replace", "🔄", "<b>replace(old, new)</b> swaps matches for new text."), S("contains", "🔍", "<b>contains</b> is true when the text appears inside, in the same order.")]),
    L("Split into words", splitJoin, [S("split", "✂️", "<b>text.split(\" \")</b> cuts a sentence at each space and gives a list of words."), S("Use the list", "📋", "words[0] is the first word. len(words) counts the words."), S("join", "🧵", "<b>join</b> does the opposite and glues a list of words back into text.")]),
    L("Reverse and rotate", revRot, [S("Reverse", "🔙", "<b>reverse</b> turns the list around: the last item becomes first."), S("Rotate", "🎡", "<b>Rotating</b> moves items off one end and onto the other, keeping their order."), S("Tip", "💡", "Write the new list out in full, then read the position you need.")]),
    L("Sets", setsQ, [S("No repeats", "🧺", "A <b>set</b> holds each value only once. [1, 1, 2] as a set is {1, 2}."), S("Union and intersection", "🔵🔴", "<b>Union</b> is everything in either set. <b>Intersection</b> is only what both sets share."), S("Use", "💡", "Sets are great for removing duplicates and checking if a value is there.")]),
    L("Counters that wrap", wrapQ, [S("Limited bits", "🔢", "A counter with n bits holds 2 to the power n values. 8 bits holds 256 values (0 to 255)."), S("Wrap around", "🔄", "Past the biggest value it starts again at 0. This is an <b>overflow</b>."), S("Mod", "➗", "The new value is (old + added) mod (how many values fit).")]),
    L("Other number bases", baseQ, [S("Bases", "🔟", "We count in base 10. Computers use base 2. Other bases use the same idea with a different size of group."), S("Place values", "🏠", "In base 3 the places are 1, 3, 9, 27 ... So 21 in base 3 = 2 * 3 + 1 = 7."), S("Going back", "↩️", "To write a number in a base, use div and mod by the base, again and again.")]),
    L("How many passwords?", passQ, [S("Multiply the choices", "✖️", "If each of 3 spots has 10 choices, there are 10 * 10 * 10 = 1000 combinations."), S("Longer is stronger", "🔒", "Each extra character multiplies the number of possibilities."), S("Bigger alphabet", "🔤", "Using capitals, digits and symbols gives more choices for every spot. A long password with variety is best.")]),
    L("Tables and rows", tableQ, [S("Databases", "🗄️", "A <b>database</b> stores data in tables. Each <b>row</b> is one thing, each <b>column</b> is a kind of fact about it."), S("Asking questions", "❓", "A query picks the rows that match, like 'kind is cat'. Then it reads or counts them."), S("Keys", "🔑", "A column with a different value in every row, like an ID, helps find one row quickly.")]),
    L("Mixed practice", mix(precQ, timeQ, threeVars, composeQ, earlyRet, shortC, nestedTri, fibLoop, collatzQ, fizzQ), MIXS("operator order, div and mod, variables, functions, return, short-circuit logic and loops.")),
    L("Level 13 Challenge", mix(precQ, timeQ, threeVars, composeQ, earlyRet, shortC, nestedTri, fibLoop, collatzQ, fizzQ, strFind, splitJoin, revRot, setsQ, wrapQ, baseQ, passQ, tableQ), MIXS("everything from level 13: expressions, loops, strings, lists and sets, bases, passwords and tables."))
  ];

  // =====================================================================
  // LEVEL 14
  // =====================================================================
  const gameLoop = () => {
    const EV = [["coin", "score + 10", s => { s.sc += 10; }], ["gem", "score + 25", s => { s.sc += 25; }], ["star", "score + 50", s => { s.sc += 50; }], ["enemy", "lives - 1", s => { s.lv -= 1; }], ["spikes", "lives - 1", s => { s.lv -= 1; }]];
    const evs = Array.from({ length: ri(5, 7) }, () => pick(EV));
    const s = { sc: 0, lv: 2 };
    for (const e of evs) { if (s.lv === 0) break; e[2](s); }
    const askLives = Math.random() < 0.4;
    return num(`The player starts with score 0 and 2 lives. Events happen in this order: <b>${evs.map(e => e[0]).join(", ")}</b>. When lives reach 0 the game is over, and later events are ignored. What is the ${askLives ? "number of lives left" : "final score"}?`, askLives ? s.lv : s.sc, [
      "Keep two boxes, score and lives. Process the events from left to right.",
      "Rules: coin adds 10, gem adds 25, star adds 50. An enemy or spikes takes away 1 life. After each event, check whether lives hit zero. If so, stop.",
      "Example: lives = 1. Events: coin, enemy, star. Coin: score 10. Enemy: lives 0, game over. The star is ignored, so the final score is 10. Now do yours."
    ], code(["coin: score + 10", "gem: score + 25", "star: score + 50", "enemy: lives - 1", "spikes: lives - 1"]));
  };

  const wrapScreen = () => {
    const W = ri(8, 15), x0 = ri(0, W - 1), v = ri(2, 7), f = ri(3, 6);
    return num("A sprite moves right each frame. When it passes the edge it wraps to the left. What does the program print?", (x0 + v * f) % W, [
      "Each frame adds the speed. mod keeps the position inside the screen by wrapping.",
      "Do one frame at a time. After each addition, take the result mod the width. Or add everything first and then do one mod.",
      "Example: width 10, x = 8, speed 3, 2 frames. 8 + 3 = 11, mod 10 = 1. Then 1 + 3 = 4. Now do yours."
    ], code([`W = ${W}`, `x = ${x0}`, `repeat ${f} times`, ind(1) + `x = (x + ${v}) mod W`, "print(x)"]));
  };

  const collideQ = () => {
    const mk = () => ({ x: ri(0, 8), y: ri(0, 8), w: ri(2, 4), h: ri(2, 4) });
    const ov = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
    const want = Math.random() < 0.5;
    let a, b;
    do { a = mk(); b = mk(); } while (ov(a, b) !== want);
    const d = r => `x=${r.x}, y=${r.y}, width=${r.w}, height=${r.h}`;
    return yn("Two boxes in a game. Each box starts at (x, y) and covers its width to the right and its height downward. Do they overlap?", want, [
      "Two boxes overlap only if they overlap sideways AND up and down.",
      "A box covers x from its x up to x + width (not including the end), and y from its y up to y + height. Compare these ranges for the two boxes.",
      "Example: A covers x 0 to 3 and B covers x 3 to 5. They only touch at 3, so no sideways overlap, so no collision. Now do yours."
    ], code([`A: ${d(a)}`, `B: ${d(b)}`]));
  };

  const linkedQ = () => {
    const n = ri(4, 5), ids = shuf(LET.split("")).slice(0, n), vals = uniq(n, 1, 9);
    const nodes = ids.map((id, i) => ({ id, v: vals[i], next: i < n - 1 ? ids[i + 1] : null }));
    const vis = code(["Nodes:"].concat(shuf(nodes).map(o => `${o.id}: value ${o.v}, next ${o.next || "none"}`)).concat([`head = ${ids[0]}`]));
    const t = ri(0, 2);
    const hs = [
      "A linked list is a chain. Each node tells you the next node to visit.",
      "Start at the head. Read its value, then jump to the node it points to as 'next'. Stop when next is none.",
      "Example: head = X. X: value 4, next Y. Y: value 7, next none. Following next once from X reaches Y with value 7. Now do yours."
    ];
    if (t === 0) { const k = ri(1, n - 1); return num(`Start at the head and follow <b>next</b> ${k} time${k > 1 ? "s" : ""}. What is the value of the node you reach?`, vals[k], hs, vis); }
    if (t === 1) return num("What is the value of the <b>last</b> node (the one whose next is none)?", vals[n - 1], hs, vis);
    return num("How many nodes are in the list?", n, hs, vis);
  };

  const HW = ["cat", "dog", "sun", "box", "map", "pen", "owl", "fox", "bee", "hat", "cup"];
  const hashOf = (w, size) => w.split("").reduce((a, c) => a + c.charCodeAt(0) - 96, 0) % size;
  const hashQ = () => {
    const size = pick([5, 7, 10]), w = pick(HW);
    const hs = [
      "A hash function turns a word into a bucket number. Here a = 1, b = 2, c = 3 and so on.",
      "Add the positions of the letters in the alphabet. Then take the total mod the number of buckets.",
      "Example: word 'ace' with 4 buckets. a + c + e = 1 + 3 + 5 = 9. 9 mod 4 = 1, so bucket 1. Now do yours."
    ];
    if (Math.random() < 0.6) return num(`A hash table has <b>${size}</b> buckets. The hash of a word is (sum of its letter positions) mod ${size}. Which bucket does <b>"${w}"</b> go in?`, hashOf(w, size), hs);
    let w2 = pick(HW); while (w2 === w) w2 = pick(HW);
    return yn(`A hash table has <b>${size}</b> buckets (hash = sum of letter positions mod ${size}). Do <b>"${w}"</b> and <b>"${w2}"</b> go in the same bucket?`, hashOf(w, size) === hashOf(w2, size), hs);
  };

  const bIns = (t, v) => { if (!t) return { v, l: null, r: null }; if (v < t.v) t.l = bIns(t.l, v); else t.r = bIns(t.r, v); return t; };
  const bBuild = a => a.reduce((t, v) => bIns(t, v), null);
  const bH = t => (t ? 1 + Math.max(bH(t.l), bH(t.r)) : 0);
  const bDepth = (t, x) => (t.v === x ? 1 : 1 + bDepth(x < t.v ? t.l : t.r, x));
  const bstQ = () => {
    for (;;) {
      const a = uniq(6, 1, 15), tr = bBuild(a), t = ri(0, 2);
      const vis = code([`Insert in this order: ${a.join(", ")}`, "Smaller goes left, bigger goes right."]);
      const hs = [
        "Build the tree: the first number is the root. Each next number goes left if smaller and right if bigger, moving down until a spot is free.",
        "Draw it on paper. Write each number as you insert it, comparing with the nodes from the root downwards.",
        "Example: insert 5, 2, 8, 1. 5 is the root. 2 goes left of 5. 8 goes right of 5. 1 goes left of 2. That makes 3 levels. Now do yours."
      ];
      if (t === 0) { const x = pick(a.slice(1)); return num(`How many nodes are looked at to find <b>${x}</b> (counting the root and ${x} itself)?`, bDepth(tr, x), hs, vis); }
      if (t === 1) return num("How many levels does the finished tree have (a single root alone is 1 level)?", bH(tr), hs, vis);
      const left = a.slice(1).find(v => v < a[0]);
      if (left === undefined) continue;
      return num("What is the <b>left child of the root</b>? (The first number inserted that is smaller than the root.)", left, hs, vis);
    }
  };

  const mkGraph = (n, extra) => {
    const nodes = LET.slice(0, n).split(""), edges = [];
    const has = (a, b) => edges.some(e => (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a));
    for (let i = 1; i < n; i++) edges.push([nodes[ri(0, i - 1)], nodes[i]]);
    for (let t = 0, c = 0; t < 60 && c < extra; t++) { const a = pick(nodes), b = pick(nodes); if (a !== b && !has(a, b)) { edges.push([a, b]); c++; } }
    const adj = {}; nodes.forEach(x => { adj[x] = []; });
    edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
    nodes.forEach(x => adj[x].sort());
    return { nodes, edges, adj };
  };
  const bfs = (g, s) => { const seen = [s], q = [s]; while (q.length) { const c = q.shift(); for (const m of g.adj[c]) if (!seen.includes(m)) { seen.push(m); q.push(m); } } return seen; };
  const dfs = (g, s) => { const seen = []; const go = c => { seen.push(c); for (const m of g.adj[c]) if (!seen.includes(m)) go(m); }; go(s); return seen; };
  const visitQ = () => {
    const g = mkGraph(6, ri(1, 2)), isB = Math.random() < 0.5, order = isB ? bfs(g, "A") : dfs(g, "A");
    const idx = Math.random() < 0.5 ? order.length - 1 : ri(2, order.length - 2);
    const lab = idx === order.length - 1 ? "the <b>last</b> node visited" : `visited number <b>${idx + 1}</b>`;
    return mc(`Start at A. Visit neighbors in alphabetical order. Using ${isB ? "<b>breadth-first</b> (a queue: finish all neighbors before going deeper)" : "<b>depth-first</b> (go as deep as you can, then back up)"}, which node is ${lab}?`, order[idx], g.nodes.filter(x => x !== order[idx]), [
      "Draw the graph, then write the visiting order in a row as you go. Never visit the same node twice.",
      isB ? "Breadth-first: visit A, then all of A's neighbors in order, then the neighbors of those, and so on, level by level." : "Depth-first: from the current node, go to its first unvisited neighbor and keep going. When stuck, back up one step and try the next neighbor.",
      "Example graph: A: B, C. B: A, D. C: A. D: B. Breadth-first order is A, B, C, D. Depth-first order is A, B, D, C. Now do yours."
    ], code(g.nodes.map(x => `${x}: ${g.adj[x].join(", ")}`)));
  };

  const dijk = () => {
    const g = mkGraph(5, 2), w = g.edges.map(e => [e[0], e[1], ri(1, 9)]);
    const d = { A: 0 }; g.nodes.forEach(x => { if (x !== "A") d[x] = 999; });
    for (let r = 0; r < 6; r++) w.forEach(([a, b, c]) => { if (d[a] + c < d[b]) d[b] = d[a] + c; if (d[b] + c < d[a]) d[a] = d[b] + c; });
    return num("What is the total length of the <b>shortest route</b> from A to E? (Roads work both ways.)", d.E, [
      "The shortest route is the one with the smallest total of road lengths, not always the one with the fewest roads.",
      "List every route from A to E without visiting a town twice. Add up the lengths on each route and compare. Or work outward from A, finding the best distance to each town.",
      "Example: A-B 2, B-C 2, A-C 5. Direct A to C is 5, but A to B to C is 4. The shortest is 4. Now do yours."
    ], code(w.map(e => `${e[0]} - ${e[1]} : ${e[2]}`)));
  };

  const partQ = () => {
    const a = uniq(7, 1, 9), p = a[0], less = a.slice(1).filter(x => x < p), t = ri(0, 2);
    const vis = code([`list = ${lst(a)}`, `pivot = ${p} (the first item)`]);
    const hs = [
      "Partitioning sorts the items into 'smaller than the pivot' and 'bigger than the pivot'. The pivot goes between them.",
      "Go through the other items one by one. Smaller ones go to the left group, bigger ones to the right group, keeping their original order.",
      "Example: [4, 7, 2, 9, 1] with pivot 4. Smaller: 2 and 1. Bigger: 7 and 9. Result: [2, 1] 4 [7, 9]. The pivot is at index 2. Now do yours."
    ];
    if (t === 0) return num("How many items are smaller than the pivot (they go to its left)?", less.length, hs, vis);
    if (t === 1) return num("After partitioning, at which <b>index</b> (counting from zero) does the pivot end up?", less.length, hs, vis);
    const firstBig = a.slice(1).find(x => x > p);
    if (firstBig === undefined) return num("How many items are smaller than the pivot (they go to its left)?", less.length, hs, vis);
    return num("Which item is the <b>first</b> one (reading from left to right) that goes to the <b>right</b> of the pivot?", firstBig, hs, vis);
  };

  const countSort = () => {
    for (;;) {
      const a = Array.from({ length: 8 }, () => ri(0, 4)), cnt = [0, 0, 0, 0, 0];
      a.forEach(x => cnt[x]++);
      const t = ri(0, 2), vis = code([`data = ${lst(a)}`]);
      const hs = [
        "Counting sort uses a list of counters. counts[k] tells how many times the value k appears in the data.",
        "Go through the data and add one to the counter of each value you see. To rebuild the sorted list, write each value as many times as its counter says, from small to big.",
        "Example: data = [2, 0, 2, 1]. counts = [1, 1, 2]. Sorted data: 0, 1, 2, 2. Now do yours."
      ];
      if (t === 0) { const k = ri(0, 4); return num(`What is <b>counts[${k}]</b> (how many times does ${k} appear)?`, cnt[k], hs, vis); }
      if (t === 1) { const s = [...a].sort((x, y) => x - y), i = ri(0, 7); return num(`After counting sort, what is the item at <b>index ${i}</b> of the sorted list?`, s[i], hs, vis); }
      const mx = Math.max(...cnt); if (cnt.filter(c => c === mx).length > 1) continue;
      return num("Which value appears the <b>most</b> times?", cnt.indexOf(mx), hs, vis);
    }
  };

  const hanoiQ = () => {
    const n = ri(2, 7), t = ri(0, 2);
    const hs = [
      "To move n discs you must first move n - 1 discs away, move the biggest disc once, then move the n - 1 discs back on top.",
      "So moves(n) = 2 * moves(n - 1) + 1. Start from one disc, which needs exactly one move, and build upward.",
      "Example: 1 disc takes 1 move. 2 discs take 2 * 1 + 1 = 3 moves. 3 discs take 2 * 3 + 1 = 7 moves. Now do yours."
    ];
    if (t === 0) return num(`The Towers of Hanoi puzzle moves discs one at a time and never puts a bigger disc on a smaller one. What is the fewest number of moves for <b>${n}</b> discs?`, 2 ** n - 1, hs);
    if (t === 1) return num(`With <b>${n}</b> discs the puzzle takes ${2 ** n - 1} moves. How many moves does it take with <b>${n + 1}</b> discs?`, 2 ** (n + 1) - 1, hs);
    return num(`The fewest moves for ${n} discs is ${2 ** n - 1}. How many moves does the biggest disc itself make in the best solution?`, 1, [
      "In the best solution, the biggest disc only moves when all the smaller ones are out of its way.",
      "Once it is on the target peg, it never needs to move again. Count the number of times it moves.",
      "Example: with 2 discs, the small disc moves aside, the big disc moves once to the target, and the small disc moves on top. The big disc moved one time. Now do yours."
    ]);
  };

  const RW = ["star", "frog", "bird", "map", "lamp", "code", "fish"];
  const recStr = () => {
    const w = pick(RW), k = ri(0, 2);
    const defs = [
      [["function f(s)", ind(1) + "if s is empty: return \"\"", ind(1) + "return f(rest of s) + first letter of s"], w.split("").reverse().join(""), "What does f(\"" + w + "\") return?", true],
      [["function f(s)", ind(1) + "if s is empty: return 0", ind(1) + "return 1 + f(rest of s)"], w.length, "What does f(\"" + w + "\") return?", false],
      [["function f(s)", ind(1) + "if s is empty: return \"\"", ind(1) + "return first letter of s + first letter of s + f(rest of s)"], w.split("").map(c => c + c).join(""), "What does f(\"" + w + "\") return?", true]
    ];
    const [lines, ans, text, isTxt] = defs[k];
    const hs = [
      "A recursive function handles the first letter and then asks itself to handle the rest. The empty string is where it stops.",
      "Unroll the calls on paper: f of the whole word, then f of the word without its first letter, and so on until empty. Then build the answer on the way back.",
      "Example: g(s) returns the first letter + g(rest) with g(empty) = empty. g(\"ab\") = a + g(\"b\") = a + b + g(empty) = ab. Now do yours with the rule above."
    ];
    return isTxt ? txt(text, ans, hs, code(lines)) : num(text, ans, hs, code(lines));
  };

  const dpQ = () => {
    if (Math.random() < 0.55) {
      const n = ri(3, 8), w = [1, 1]; for (let i = 2; i <= n; i++) w[i] = w[i - 1] + w[i - 2];
      return num(`You climb a staircase of <b>${n}</b> steps. Each move goes up 1 or 2 steps. In how many different ways can you reach the top?`, w[n], [
        "To land on a step you came from the step just below or the one two below. So count the ways to reach those two steps.",
        "Make a table: ways to reach step 0 is 1 and step 1 is 1. Each step after that is the sum of the two before it.",
        "Example: 4 steps. Ways: step 0 = 1, step 1 = 1, step 2 = 2, step 3 = 3, step 4 = 5. Now do yours with your number of steps."
      ]);
    }
    const R = ri(2, 4), C = ri(2, 4), dp = Array.from({ length: R }, () => Array(C).fill(1));
    for (let i = 1; i < R; i++) for (let j = 1; j < C; j++) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    const grid = Array.from({ length: R }, (_, i) => Array.from({ length: C }, (_, j) => (i === 0 && j === 0 ? "🤖" : i === R - 1 && j === C - 1 ? "⭐" : "⬜")).join("")).join("<br>");
    return num(`A robot starts at 🤖 and moves only <b>right</b> or <b>down</b> to reach ⭐. How many different routes are there?`, dp[R - 1][C - 1], [
      "A square can be reached from the square above it or from the square to its left. So its route count comes from those two.",
      "Fill each square with a number: the squares in the top row and left column each have 1 route. Every other square is the sum of the number above and the number to the left.",
      "Example: a 2 by 3 grid. Top row: 1, 1, 1. Bottom row: 1, then 1 + 1 = 2, then 2 + 1 = 3. The bottom right shows 3 routes. Now do yours."
    ], `<div style="font-size:1.6em;line-height:1.3">${grid}</div>`);
  };

  const prefixQ = () => {
    const a = Array.from({ length: 6 }, () => ri(1, 9)), pre = []; a.reduce((s, x, i) => (pre[i] = s + x), 0);
    const vis = code([`data = ${lst(a)}`, `prefix = ${lst(pre)}`]);
    const hs = [
      "The prefix list holds running totals: prefix[k] is the sum of data from the start up to and including position k.",
      "To get the sum of a stretch in the middle, take the running total at the end and subtract the running total just before the start.",
      "Example: data = [2, 3, 4], prefix = [2, 5, 9]. Sum of positions 1 to 2 = prefix[2] - prefix[0] = 9 - 2 = 7. Now do yours."
    ];
    if (Math.random() < 0.3) { const k = ri(2, 5); return num(`What is <b>prefix[${k}]</b>?`, pre[k], hs, vis); }
    const i = ri(1, 3), j = ri(i + 1, 5);
    return num(`Using the prefix list, what is the sum of <b>data[${i}]</b> up to <b>data[${j}]</b> (both included)?`, pre[j] - pre[i - 1], hs, vis);
  };

  const jsonQ = () => {
    const who = pick(["Mia", "Leo", "Zoe", "Sam", "Ivy"]), sc = ri(10, 90), K = ["cat", "dog", "fish", "bird", "rabbit"];
    const ks = shuf(K).slice(0, 3), ag = uniq(3, 1, 12);
    const vis = code(["{", ind(1) + `"name": "${who}",`, ind(1) + `"score": ${sc},`, ind(1) + "\"pets\": [", ...ks.map((k, i) => ind(2) + `{ "kind": "${k}", "age": ${ag[i]} }${i < 2 ? "," : ""}`), ind(1) + "]", "}"]);
    const hs = [
      "Read the path from left to right. A name in a path picks a key; a number in brackets picks an item in a list (starting at zero).",
      "Start with the whole object. Take the first piece of the path, then look inside what you found for the next piece.",
      "Example: data = { \"box\": [ {\"n\": 5}, {\"n\": 8} ] }. data.box[1].n: box is the list, [1] is the second item, and n is 8. Now do yours."
    ];
    const t = ri(0, 2), i = ri(0, 2);
    if (t === 0) return txt("What is <b>data.name</b>?", who, hs, vis);
    if (t === 1) return txt(`What is <b>data.pets[${i}].kind</b>?`, ks[i], hs, vis);
    return num(`What is <b>data.pets[${i}].age</b>?`, ag[i], hs, vis);
  };

  const APIQ = [
    ["A web server answers a request with the status code 404. What does that mean?", "the page was not found", ["the request worked perfectly", "the server crashed", "you must pay first"], "Think about a missing page."],
    ["The status code 200 means ...", "OK: the request worked", ["page not found", "server error", "access is blocked"], "It is the good news code."],
    ["The status code 500 usually means ...", "a problem on the server", ["a typing mistake by the visitor", "the request worked", "the page moved to a new house"], "Think about who has the problem: the visitor or the website's computer?"],
    ["Which request type asks a server to send data back, like opening a page?", "GET", ["POST", "DELETE", "SHRINK"], "The word describes what you do to receive something."],
    ["Which request type sends new data to a server, like submitting a form?", "POST", ["GET", "LOOK", "READ"], "Think of mailing something to the server."],
    ["JSON is ...", "a text format for data using keys and values", ["a kind of video file", "a programming language for games only", "a type of virus"], "You saw it with curly brackets and names in quotes."],
    ["An API is ...", "a set of rules that lets programs talk to each other", ["a type of keyboard", "a bug in a program", "a web browser"], "Think about two programs that need to share information."],
    ["When your browser asks for a web page, the browser is the ...", "client", ["server", "cable", "router only"], "Which side asks, and which side answers?"],
    ["The computer that holds web pages and answers requests is the ...", "server", ["client", "mouse", "monitor"], "It serves pages to others."],
    ["DNS turns ...", "website names into number addresses", ["pictures into text", "big files into small ones", "passwords into emails"], "Computers find each other by numbers, but people like names."],
    ["A cookie in a web browser is ...", "a small piece of data a site stores on your device", ["a virus that eats files", "a kind of picture", "a paid upgrade"], "It is saved so the site can remember something about you."]
  ];
  const GITQ = [
    ["In version control, a <b>commit</b> is ...", "a saved snapshot of your project with a message", ["a bug in the code", "a copy that is deleted", "a password"], "Think of saving a checkpoint in a game."],
    ["A <b>branch</b> is ...", "a separate line of work where you can try ideas safely", ["a broken file", "a kind of loop", "a deleted folder"], "Think of a tree: it splits but stays connected."],
    ["<b>Merging</b> means ...", "combining the work from two branches", ["deleting all history", "renaming a file", "making the computer faster"], "Two paths come together."],
    ["A <b>repository</b> is ...", "a project folder together with its saved history", ["a type of cable", "a password manager", "a web browser"], "It holds the files and all their past versions."],
    ["To <b>clone</b> a repository is to ...", "make a copy of it on your computer", ["erase it", "change its color", "turn it into a picture"], "Think about copying exactly."],
    ["<b>Push</b> sends your commits ...", "up to the shared copy", ["to the trash", "to your printer", "into the future"], "It goes from your computer to the shared place."],
    ["<b>Pull</b> gets ...", "new commits from the shared copy", ["a new keyboard", "extra memory", "a free game"], "It comes the other way from push."],
    ["A <b>merge conflict</b> happens when ...", "two people changed the same part of a file in different ways", ["the internet is slow", "a file is too small", "someone forgot a password"], "Two cooks changed the same line of a recipe."],
    ["A <b>pull request</b> asks teammates to ...", "review changes before they are merged", ["delete the project", "buy the code", "turn off the computer"], "It is a polite request for a second pair of eyes."],
    ["A good commit message ...", "says briefly what changed and why", ["is always empty", "contains your password", "is just a random letter"], "Think about the person reading the history later."],
    ["A big benefit of version control is that you can ...", "go back to an older version if something breaks", ["never make a mistake", "skip testing", "run code without a computer"], "History is saved."]
  ];

  const AW = [["listen", "silent"], ["race", "care"], ["evil", "live"], ["night", "thing"], ["stone", "notes"], ["heart", "earth"], ["below", "elbow"], ["dusty", "study"], ["angel", "angle"], ["brake", "baker"]];
  const sortL = w => w.split("").sort().join("");
  const anaQ = () => {
    if (Math.random() < 0.5) {
      const [a, b] = pick(AW), yes = Math.random() < 0.5;
      let x = a, y = b;
      if (!yes) { const i = ri(0, y.length - 1); y = y.slice(0, i) + (y[i] === "x" ? "z" : "x") + y.slice(i + 1); }
      return yn(`Are <b>${x}</b> and <b>${y}</b> anagrams (the same letters in a different order)?`, sortL(x) === sortL(y) && x !== y, [
        "Anagrams use exactly the same letters, the same number of times.",
        "A trick: sort the letters of each word alphabetically. If the two sorted words are the same, the words are anagrams.",
        "Example: 'tea' and 'eat' both sort to aet, so they are anagrams. 'tea' and 'ten' sort to aet and ent, so they are not. Now do yours."
      ]);
    }
    const w = pick(AW.flat().concat(["robot", "plane", "magic"]));
    return txt(`If you sort the letters of <b>"${w}"</b> in alphabetical order, what word-like text do you get?`, sortL(w), [
      "Alphabetical order means a first, then b, then c, and so on. Repeated letters stay together.",
      "List the letters of the word. Then pick the earliest letter in the alphabet first, then the next, and so on until none are left.",
      "Example: 'moon' sorts to mnoo (m, n, o, o). Now do yours."
    ]);
  };

  const lessons14 = [
    L("A game loop", gameLoop, [S("Score and lives", "🎮", "A game keeps state in variables, like <b>score</b> and <b>lives</b>. Events change them."), S("Game over", "💀", "When lives reach 0, the game ends and nothing more counts."), S("Trace it", "📋", "Go through the events in order. After each one, write the new score and lives.")]),
    L("Wrapping around the screen", wrapScreen, [S("Edges", "🖥️", "When a sprite leaves one side, many games bring it back on the other side. This is <b>wrapping</b>."), S("Mod does it", "➗", "x = (x + speed) mod width keeps x between 0 and width - 1."), S("Example", "✏️", "Width 10. At x = 8, moving 3 gives 11, and 11 mod 10 = 1.")]),
    L("Do the boxes collide?", collideQ, [S("Boxes", "🟦", "Games use boxes to detect hits. Each box has x, y, width and height."), S("Two ranges", "↔️↕️", "They overlap only if the x ranges overlap AND the y ranges overlap."), S("Touching", "🤝", "A box covers x up to x + width. If one box starts exactly where the other ends, they only touch.")]),
    L("Linked lists", linkedQ, [S("A chain", "⛓️", "A <b>linked list</b> is a chain of nodes. Each node holds a value and a <b>next</b> pointer."), S("Follow", "👉", "Start at the head. Jump to next, again and again, until next is none."), S("Why", "💡", "Adding a node in the middle is easy: just change a pointer.")]),
    L("Hash tables", hashQ, [S("Buckets", "🪣", "A <b>hash table</b> has numbered buckets. A hash function turns a word into a bucket number."), S("Example", "✏️", "Add up letter positions (a = 1, b = 2 ...) and take mod the number of buckets."), S("Collisions", "💥", "Two words can land in the same bucket. That is a <b>collision</b>, and the table must handle it.")]),
    L("Binary search trees", bstQ, [S("Left and right", "🌳", "In a <b>binary search tree</b>, smaller values go left of a node and bigger values go right."), S("Insert", "➕", "Start at the root and compare. Go left or right until you find a free spot."), S("Search", "🔎", "To find a value you follow one path down. You never need to look at every node.")]),
    L("Visiting a graph", visitQ, [S("Two ways", "🗺️", "To visit every node of a graph you can go <b>breadth-first</b> or <b>depth-first</b>."), S("Breadth-first", "🌊", "Visit all neighbors, then their neighbors, level by level. It uses a <b>queue</b>."), S("Depth-first", "🕳️", "Go as deep as you can, then back up. It uses a <b>stack</b> or recursion.")]),
    L("Roads with lengths", dijk, [S("Weights", "⚖️", "In a <b>weighted graph</b> each edge has a number, like the length of a road."), S("Shortest route", "🛣️", "The shortest route has the smallest <b>total</b> weight. It may use more roads."), S("Dijkstra", "👨‍💻", "Dijkstra's algorithm finds the best distance to every town by spreading out from the start.")]),
    L("Partitioning", partQ, [S("Quick sort idea", "⚡", "<b>Quicksort</b> picks a <b>pivot</b>. Smaller items go left, bigger go right."), S("Pivot in place", "📍", "After partitioning, the pivot is already in its final sorted position."), S("Repeat", "🔁", "Then quicksort sorts the left part and the right part the same way.")]),
    L("Counting sort", countSort, [S("Counters", "🔢", "When values are small whole numbers, count how many of each there are."), S("counts list", "📋", "counts[k] is how many times the value k appears."), S("Rebuild", "🏗️", "Write each value as many times as its count, from smallest to biggest. It is sorted.")]),
    L("Towers of Hanoi", hanoiQ, [S("The puzzle", "🗼", "Move a stack of discs from one peg to another, one disc at a time. A bigger disc never goes on a smaller one."), S("Recursion", "🔁", "Move n - 1 discs away, move the biggest, move n - 1 discs back on top."), S("The rule", "✏️", "moves(n) = 2 * moves(n - 1) + 1. One disc: 1. Two: 3. Three: 7. Four: 15.")]),
    L("Recursion on text", recStr, [S("First and rest", "✂️", "A recursive function on text handles the <b>first letter</b> and calls itself on the <b>rest</b>."), S("Base case", "🛑", "It stops at the empty text. This is the base case."), S("Unroll", "📜", "Write the calls one under another. Then work back up to build the answer.")]),
    L("Counting ways", dpQ, [S("Break it down", "🧩", "Some problems are solved by combining the answers of smaller versions."), S("Stairs", "🪜", "Ways to reach step n = ways to reach step n - 1 + ways to reach step n - 2."), S("Table", "📋", "Fill a table from small to big and keep the answers. This is called <b>dynamic programming</b>.")]),
    L("Prefix sums", prefixQ, [S("Running totals", "➕", "A <b>prefix sum</b> list stores the total so far at each position."), S("Quick range", "⚡", "Sum from i to j = prefix[j] - prefix[i - 1]. One subtraction instead of many additions."), S("Example", "✏️", "data [2, 3, 4], prefix [2, 5, 9]. Sum of the last two = 9 - 2 = 7.")]),
    L("Reading JSON", jsonQ, [S("Keys and values", "🗝️", "<b>JSON</b> writes data as keys and values inside curly brackets. Lists use square brackets."), S("Paths", "🛤️", "data.pets[1].age means: key pets, then the second item, then its age."), S("Everywhere", "🌐", "Websites send JSON to apps all the time.")]),
    L("The web talks: APIs", facts(APIQ, "Think about what the word is used for on the web.", "Example: a GET request is like asking a librarian to bring you a book, and the answer is a status code plus the data."), [S("Request and response", "📨", "A client sends a <b>request</b>. A server sends back a <b>response</b> with a status code."), S("Codes", "🔢", "200 means OK. 404 means not found. 500 means a server error."), S("API", "🔌", "An <b>API</b> is a menu of requests that programs are allowed to make.")]),
    L("Saving your work: Git", facts(GITQ, "Think about what a team needs when many people work on one project.", "Example: saving a game checkpoint lets you return to it if you lose, just like a commit."), [S("Version control", "🗂️", "<b>Git</b> keeps a history of your project. You can go back to any saved point."), S("Teamwork", "👥", "Branches let people work separately. Merging joins the work together."), S("Sharing", "☁️", "Push uploads your work. Pull downloads other people's work.")]),
    L("Anagrams", anaQ, [S("Same letters", "🔤", "<b>Anagrams</b> use the same letters in a different order, like listen and silent."), S("Sort trick", "🧰", "Sort the letters of both words. If the sorted words match, they are anagrams."), S("Programs", "💻", "Computers use sorted letters as a quick fingerprint for words.")]),
    L("Mixed practice", mix(gameLoop, wrapScreen, collideQ, linkedQ, hashQ, bstQ, visitQ, dijk, partQ, countSort, hanoiQ), MIXS("game state, wrapping, collisions, linked lists, hash tables, trees, graphs, sorting and Hanoi.")),
    L("Level 14 Challenge", mix(gameLoop, wrapScreen, collideQ, linkedQ, hashQ, bstQ, visitQ, dijk, partQ, countSort, hanoiQ, recStr, dpQ, prefixQ, jsonQ, anaQ, facts(APIQ, "Think about what the word is used for on the web.", "Example: a GET request asks for data and the answer has a status code."), facts(GITQ, "Think about what a team needs when many people work on one project.", "Example: a commit is a saved checkpoint.")), MIXS("everything from level 14: games, data structures, graphs, sorting, recursion, JSON, web and Git words."))
  ];

  // =====================================================================
  // LEVEL 15
  // =====================================================================
  const twosQ = () => {
    const bits = pick([4, 4, 8]), M = 2 ** bits, t = ri(0, 2);
    const lo = -(M / 2), hi = M / 2 - 1;
    const hs = [
      "In two's complement the left bit has a negative value. The other bits count up as normal.",
      "Add up the place values of the 1 bits, but the leftmost place is worth minus half of the total size instead of plus.",
      "Example: in 4 bits, 1101 = -8 + 4 + 1 = -3. And 0101 = 4 + 1 = 5. Now do yours."
    ];
    if (t === 0) {
      const v = bits === 4 ? ri(1, 8) : ri(1, 20), bs = (M - v).toString(2).padStart(bits, "0");
      return { text: `The ${bits}-bit two's complement pattern <b>${bs}</b> is a <b>negative</b> number. How far from zero is it (its size without the minus sign)?`, choices: numChoices(v, 3), answer: v, hints: [
        "The left bit is 1, so the number is negative. To find its size, undo the negative: flip all the bits, then add 1.",
        "Or add up the places with the left place counted as negative, and then drop the minus sign from your total.",
        "Example: in 4 bits, 1101. Flip to 0010, add 1 to get 0011, which is 3. So 1101 is -3 and its size is 3. Now do yours."
      ] };
    }
    if (t === 1) {
      return { text: `What is the <b>biggest</b> number that fits in <b>${bits} bits</b> using two's complement?`, choices: shuf([hi, M - 1, hi - 1, M / 2 + 1]), answer: hi, hints: [
        "Half of the patterns (the ones starting with 1) are negative. The other half (starting with 0) are zero and positive.",
        "The biggest positive pattern is a 0 followed by all ones. Add up the places of those ones.",
        "Example: with 3 bits the biggest is 011, which is 2 + 1 = 3. Now do yours."
      ] };
    }
    const v = ri(1, 7), neg = ((-v) + 16).toString(2).padStart(4, "0");
    return txt(`To get the <b>negative</b> of a number in 4-bit two's complement: flip all the bits, then add 1. What is the 4-bit pattern for <b>-${v}</b>? (Start from ${v.toString(2).padStart(4, "0")}.)`, neg, [
      "Write the pattern for the positive number first, using 4 bits.",
      "Flip every bit (0 becomes 1 and 1 becomes 0). Then add 1 in binary to the flipped pattern.",
      "Example: for -2. Start with 0010. Flip to get 1101. Add 1 to get 1110. So -2 is 1110. Now do yours."
    ]);
  };

  const popQ = () => {
    if (Math.random() < 0.75) {
      const n = ri(5, 255), c = n.toString(2).split("").filter(x => x === "1").length;
      return num(`How many <b>1 bits</b> are in the binary form of <b>${n}</b>?`, c, [
        "Write the number in binary first. Then count only the ones.",
        "To write it in binary: take away the biggest power of two that fits (128, 64, 32 ...), mark that place with a 1, and keep going with what is left.",
        "Example: 13 = 8 + 4 + 1, so it is 1101 in binary. That has three ones. Now do yours."
      ]);
    }
    const k = ri(1, 7);
    return num(`A byte (8 bits) has exactly <b>${k}</b> bits set to 1. After a NOT (every bit flips), how many bits are 1?`, 8 - k, [
      "NOT flips each bit. Every 1 becomes 0, and every 0 becomes 1.",
      "The bits that were 0 are the ones that become 1. How many zeros were there in a byte with that many ones?",
      "Example: a byte with 3 ones has 5 zeros. After NOT the five zeros are ones, so there are 5 ones. Now do yours."
    ]);
  };

  const windowQ = () => {
    const a = Array.from({ length: 7 }, () => ri(1, 9)), k = ri(2, 3), sums = [];
    for (let i = 0; i + k <= a.length; i++) sums.push(a.slice(i, i + k).reduce((x, y) => x + y, 0));
    const vis = code([`data = ${lst(a)}`, `window size k = ${k}`]);
    const hs = [
      "A window is k items side by side. Slide it one step at a time along the list.",
      "To slide: add the new item that enters on the right and take away the item that leaves on the left.",
      "Example: data [3, 1, 4, 1], k = 2. Windows: 3+1 = 4, 1+4 = 5, 4+1 = 5. Biggest is 5. Now do yours."
    ];
    if (Math.random() < 0.5) return num("What is the <b>biggest</b> sum of k items side by side?", Math.max(...sums), hs, vis);
    const i = ri(0, sums.length - 1);
    return num(`What is the sum of the window that starts at <b>index ${i}</b>?`, sums[i], hs, vis);
  };

  const pairsQ = () => {
    for (;;) {
      const a = uniq(6, 1, 12), tg = ri(8, 16);
      let c = 0; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (a[i] + a[j] === tg) c++;
      if (!c) continue;
      return num(`How many different <b>pairs</b> of items in the list add up to the target? (Each pair counts once.)`, c, [
        "Take one item and ask which other number is needed to reach the target. Then look for that number in the list.",
        "Go through the items one by one. For each, work out target minus the item and check if that number is somewhere else in the list. Each pair shows up twice, so count carefully.",
        "Example: list [1, 4, 5, 6], target 7. 1 + 6 = 7 and nothing else works with 4 and 5? 4 + 5 = 9, no. So just one pair. Now do yours."
      ], code([`list = ${lst(a)}`, `target = ${tg}`]));
    }
  };

  const heapQ = () => {
    const h = uniq(7, 1, 30).sort((x, y) => x - y), t = ri(0, 3);
    const vis = code([`heap = ${lst(h)}`, "index:  " + h.map((_, i) => i).join(",  ")]);
    const hs = [
      "A heap is stored in a list but acts like a tree. The item at index i has two children and one parent in the list, found by simple formulas.",
      "Left child: 2 * i + 1. Right child: 2 * i + 2. Parent: (i - 1) div 2. Remember: the first index is zero.",
      "Example: for the item at index 1, the children are at 2 * 1 + 1 = 3 and 4. The parent of index 4 is (4 - 1) div 2 = 1. Now do yours."
    ];
    if (t === 0) { const i = ri(0, 2); return num(`At which index is the <b>left child</b> of the item at index ${i}?`, 2 * i + 1, hs, vis); }
    if (t === 1) { const i = ri(0, 2); return num(`At which index is the <b>right child</b> of the item at index ${i}?`, 2 * i + 2, hs, vis); }
    if (t === 2) { const j = ri(1, 6); return num(`At which index is the <b>parent</b> of the item at index ${j}?`, Math.floor((j - 1) / 2), hs, vis); }
    const i = ri(0, 2); return num(`What is the <b>value</b> of the left child of the item at index ${i}?`, h[2 * i + 1], hs, vis);
  };

  const pre = t => (t ? [t.v, ...pre(t.l), ...pre(t.r)] : []);
  const inn = t => (t ? [...inn(t.l), t.v, ...inn(t.r)] : []);
  const post = t => (t ? [...post(t.l), ...post(t.r), t.v] : []);
  const travQ = () => {
    const a = uniq(5, 1, 15), tr = bBuild(a), k = pick([["preorder", pre, "the node first, then its left part, then its right part"], ["inorder", inn, "the left part first, then the node, then the right part"], ["postorder", post, "the left part, then the right part, then the node last"]]);
    const o = k[1](tr), i = ri(0, 4);
    return num(`Insert the numbers in order: <b>${a.join(", ")}</b> (smaller goes left, bigger goes right). In the <b>${k[0]}</b> walk (${k[2]}), which number is printed at position ${i + 1}?`, o[i], [
      "First build the tree from the insertion order. The first number is the root.",
      "Then walk the tree with the rule given, doing the same rule inside every sub-tree.",
      "Example: insert 4, 2, 6. Tree: root 4, left 2, right 6. Inorder: 2, 4, 6. Preorder: 4, 2, 6. Postorder: 2, 6, 4. Now do yours."
    ]);
  };

  const compQ = () => {
    const n = 6, nodes = LET.slice(0, n).split(""), edges = [], k = ri(2, 4);
    while (edges.length < k) { const a = pick(nodes), b = pick(nodes); if (a !== b && !edges.some(e => (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a))) edges.push([a, b]); }
    const par = {}; nodes.forEach(x => { par[x] = x; });
    const fd = x => (par[x] === x ? x : fd(par[x]));
    edges.forEach(([a, b]) => { par[fd(a)] = fd(b); });
    const comps = new Set(nodes.map(fd)).size;
    const vis = code([`towns: ${nodes.join(" ")}`, `roads: ${edges.map(e => e[0] + "-" + e[1]).join(", ")}`]);
    if (Math.random() < 0.55) return num("How many separate groups of towns are there? (Towns joined by roads, directly or through other towns, are one group. A town with no road is a group by itself.)", comps, [
      "Pick a town and mark everything you can reach by following roads. That is one group.",
      "Then pick an unmarked town and do it again. Count how many times you start a new group.",
      "Example: towns P Q R S with roads P-Q and R-S. Groups: {P, Q} and {R, S}, which makes 2. Now do yours."
    ], vis);
    let a, b; do { a = pick(nodes); b = pick(nodes); } while (a === b);
    return yn(`Can you travel from <b>${a}</b> to <b>${b}</b> using the roads?`, fd(a) === fd(b), [
      "Start at the first town. Mark every town you can reach, then every town reachable from those, and so on.",
      "If the second town ends up marked, there is a way. If you run out of new towns first, there is none.",
      "Example: roads P-Q and Q-R. From P you reach Q and then R. But S has no roads, so P cannot reach S. Now do yours."
    ], vis);
  };

  const memoQ = () => {
    const fib = n => (n <= 2 ? 1 : fib(n - 1) + fib(n - 2)), t = ri(0, 2), n = ri(4, 8);
    const calls = k => (k <= 2 ? 1 : 1 + calls(k - 1) + calls(k - 2));
    const cc = k => (k <= 2 ? 1 : 2 * k - 3);
    const hs = [
      "Memoization means saving each answer in a cache, so the same thing is never worked out twice.",
      "Draw the tree of calls. Without a cache, repeated calls like fib(3) are rebuilt many times. With a cache, a repeated call returns at once but still counts as one call.",
      "Example: fib(4) with rules fib(1) = fib(2) = 1. Without cache: calls fib(4), fib(3), fib(2), fib(1), fib(2) = 5 calls. With cache, the second fib(2) still counts as a call. Now do yours."
    ];
    if (t === 0) return num(`fib(1) = fib(2) = 1 and fib(n) = fib(n - 1) + fib(n - 2). How many calls does <b>fib(${n})</b> make in total (counting itself) with <b>no cache</b>?`, calls(n), hs);
    if (t === 1) return num(`fib(1) = fib(2) = 1 and fib(n) = fib(n - 1) + fib(n - 2). With a <b>cache</b> a call whose answer is stored returns at once (it still counts as one call). How many calls does <b>fib(${n})</b> make in total?`, cc(n), hs);
    return num(`How many <b>more</b> calls does fib(${n}) make without a cache than with a cache?`, calls(n) - cc(n), hs);
  };

  const inheritQ = () => {
    const [cn, snd] = pick([["Dog", "Woof!"], ["Cat", "Meow!"], ["Cow", "Moo!"], ["Duck", "Quack!"], ["Sheep", "Baa!"]]);
    const bn = pick(["Animal", "Pet", "Creature"]), bs = pick(["Hello!", "Sound!", "I am alive!", "Hi there!"]);
    const over = Math.random() < 0.6, sup = over && Math.random() < 0.4, t = ri(0, 2);
    const lines = [`class ${bn}`, ind(1) + `speak(): print "${bs}"`, `class ${cn} extends ${bn}`];
    if (over) lines.push(ind(1) + `speak(): ${sup ? `super.speak() then print "${snd}"` : `print "${snd}"`}`);
    const hs = [
      "A child class gets everything from its parent class. If it defines a method with the same name, its own version is used instead (override).",
      "Ask which class the object was made from. Look in that class first for the method. Only if it is missing, look in the parent. super.speak() runs the parent's version.",
      "Example: class Bird has speak() printing 'Tweet'. class Parrot extends Bird has its own speak() printing 'Hello'. A Parrot prints 'Hello'. Without its own speak(), it would print 'Tweet'. Now do yours."
    ];
    if (t === 0 || t === 1) {
      const useChild = t === 0, out = useChild ? (over ? (sup ? `${bs} then ${snd}` : snd) : bs) : bs;
      const wr = [bs, snd, `${bs} then ${snd}`, `${snd} then ${bs}`];
      return mc(`What does <b>x.speak()</b> print when <b>x = new ${useChild ? cn : bn}()</b>?`, out, wr.filter(w => w !== out), hs, code(lines));
    }
    const out = over ? (sup ? `${bs} then ${snd}` : snd) : bs;
    return mc(`A new <b>${cn}</b> object runs <b>speak()</b>. What is printed?`, out, [bs, snd, `${bs} then ${snd}`, `${snd} then ${bs}`].filter(w => w !== out), hs, code(lines));
  };

  const WW = ["planet", "rocket", "garden", "window", "pencil", "bridge", "cookie", "jungle", "castle", "silver", "robot", "kitten"];
  const wildQ = () => {
    const w = pick(WW);
    let p;
    const t = ri(0, 2);
    if (t === 0) { const i = ri(0, w.length - 1); p = w.slice(0, i) + "?" + w.slice(i + 1); }
    else if (t === 1) p = w.slice(0, ri(2, 3)) + "*";
    else p = "*" + w.slice(ri(3, 4));
    if (Math.random() < 0.55) {
      const idx = [...p].findIndex(c => c !== "?" && c !== "*");
      if (idx >= 0) p = p.slice(0, idx) + (p[idx] === "x" ? "z" : "x") + p.slice(idx + 1);
    } else if (Math.random() < 0.5 && p.includes("?")) p = p.replace("?", "??");
    const re = new RegExp("^" + p.replace(/\?/g, ".").replace(/\*/g, ".*") + "$");
    return yn(`In a pattern, <b>?</b> matches exactly one letter and <b>*</b> matches any number of letters (even none). Does the pattern <b>${p}</b> match the word <b>${w}</b>?`, re.test(w), [
      "Line the pattern up with the word, left to right. Letters must match exactly. A ? stands for one letter.",
      "Count carefully: each ? uses up exactly one letter. A * can use up many letters, so check what comes after it from the end of the word.",
      "Example: 'c?t' matches 'cat' (c, any letter, t) but not 'cart' (too long). 'ca*' matches 'cat' and 'cart'. Now do yours."
    ]);
  };

  const EQV = [
    ["Which is always the same as <b>NOT (A AND B)</b>?", "(NOT A) OR (NOT B)", ["(NOT A) AND (NOT B)", "A OR B", "A AND (NOT B)"], "De Morgan: flip the inside operator when you push the NOT in. Check with A = true and B = false."],
    ["Which is always the same as <b>NOT (A OR B)</b>?", "(NOT A) AND (NOT B)", ["(NOT A) OR (NOT B)", "A AND B", "NOT A OR B"], "When you push the NOT inside, AND and OR swap places."],
    ["Which is always the same as <b>NOT (NOT A)</b>?", "A", ["NOT A", "always true", "always false"], "Two flips of a switch."],
    ["Which is always the same as <b>A OR (NOT A)</b>?", "always true", ["A", "always false", "NOT A"], "Try both values of A."],
    ["Which is always the same as <b>A AND (NOT A)</b>?", "always false", ["A", "always true", "NOT A"], "Can something be true and not true at once?"],
    ["Which is always the same as <b>A OR (A AND B)</b>?", "A", ["B", "A AND B", "A OR B"], "If A is true the whole thing is true. If A is false, then A AND B is false too."],
    ["Which is always the same as <b>A AND (A OR B)</b>?", "A", ["B", "A AND B", "A OR B"], "If A is false the whole thing is false. If A is true, the OR is true as well."],
    ["Which is always the same as <b>A AND true</b>?", "A", ["true", "false", "NOT A"], "AND with true changes nothing."],
    ["Which is always the same as <b>A OR true</b>?", "always true", ["A", "NOT A", "always false"], "One true input is enough for OR."],
    ["Which is always the same as <b>A XOR A</b>?", "always false", ["A", "always true", "NOT A"], "XOR is true only when the two inputs differ."],
    ["Which is always the same as <b>A XOR true</b>?", "NOT A", ["A", "always true", "always false"], "XOR with true flips the other input."]
  ];

  const HUFF = [
    { A: "0", B: "10", C: "110", D: "111" },
    { E: "0", T: "10", R: "110", S: "111" },
    { X: "1", Y: "01", Z: "00" }
  ];
  const huffQ = () => {
    const tb = pick(HUFF), ks = Object.keys(tb);
    if (Math.random() < 0.5) {
      const msg = Array.from({ length: ri(6, 9) }, () => (Math.random() < 0.45 ? ks[0] : pick(ks)));
      return num(`A code gives short bit strings to common letters. How many bits does the message <b>${msg.join("")}</b> take?`, msg.reduce((s, c) => s + tb[c].length, 0), [
        "Look up each letter in the code table and see how long its bit string is.",
        "Add up the lengths of the bit strings for all the letters in the message, one letter at a time.",
        "Example: table P = 0, Q = 11. The message PQP takes 1 + 2 + 1 = 4 bits. Now do yours."
      ], code(ks.map(k => `${k} = ${tb[k]}`)));
    }
    const msg = Array.from({ length: ri(3, 4) }, () => pick(ks)), bits = msg.map(c => tb[c]).join("");
    return txt(`Decode the bits <b>${bits}</b> using the table. (No code is the start of another, so there is only one way to read it.)`, msg.join(""), [
      "Read from the left. As soon as the bits so far match a code in the table, write that letter and start again.",
      "Because no code is the start of another code, the first match is always right.",
      "Example: table P = 0, Q = 11. Bits 0110: 0 is P, then 11 is Q, then 0 is P. So PQP. Now do yours."
    ], code(ks.map(k => `${k} = ${tb[k]}`)));
  };

  const checkQ = () => {
    if (Math.random() < 0.5) {
      const d = Array.from({ length: 5 }, () => ri(0, 9)), s = d.reduce((a, b) => a + b, 0);
      return num(`A code adds all its digits. The check digit is that sum mod 10. What is the check digit for <b>${d.join("")}</b>?`, s % 10, [
        "Add all the digits first. Only then use mod.",
        "mod 10 keeps just the last digit of the total, like the ones place.",
        "Example: digits 3 8 5. The sum is 16, and 16 mod 10 = 6. Now do yours."
      ]);
    }
    const d = Array.from({ length: 4 }, () => ri(0, 9)), s = d[0] + 3 * d[1] + d[2] + 3 * d[3], c = (10 - (s % 10)) % 10;
    return num(`A barcode check digit is made like this: multiply the digits by 1, 3, 1, 3, add them up, then the check digit is the number that makes the total a multiple of 10. What is the check digit for <b>${d.join("")}</b>?`, c, [
      "Step 1: multiply the first and third digits by 1, and the second and fourth by 3. Step 2: add them up.",
      "Look at the ones place of the total. The check digit is what you must add to reach the next multiple of 10 (zero if you are already on one).",
      "Example: digits 2 5. Weights 1, 3. Total = 2 + 15 = 17. To reach 20 you need 3, so the check digit is 3. Now do yours."
    ]);
  };

  const rrQ = () => {
    const q = ri(2, 3), need = { A: ri(2, 7), B: ri(2, 7), C: ri(2, 7) }, rem = { ...need }, fin = {}, queue = ["A", "B", "C"];
    let time = 0;
    while (queue.length) {
      const j = queue.shift(), run = Math.min(q, rem[j]);
      time += run; rem[j] -= run;
      if (rem[j] > 0) queue.push(j); else fin[j] = time;
    }
    const j = pick(["A", "B", "C"]);
    return num(`A computer shares time between tasks in turns (<b>round robin</b>). Each turn runs a task for up to ${q} time units. If it is not done, it goes to the back of the line. Order: A, B, C. Tasks need A = ${need.A}, B = ${need.B}, C = ${need.C} units. At what time does task <b>${j}</b> finish?`, fin[j], [
      "Keep a line of tasks and a clock that starts at zero. Each turn adds the time the task actually used to the clock.",
      "A task that needs less than the slice only uses what it needs. If it still has work left, put it at the back of the line with its new remaining time.",
      "Example: slice 2, tasks P needs 3 and Q needs 1. P runs 2 (clock 2), Q runs 1 and finishes (clock 3), P runs 1 and finishes (clock 4). Now do yours."
    ]);
  };

  const AIQ = [
    ["The examples a computer learns from are called ...", "training data", ["a firewall", "a password", "a compiler"], "Think of what a student studies before a test."],
    ["A model learns mostly from photos taken in sunny weather and then does badly in the rain. This shows ...", "bias in the data", ["a syntax error", "a slow network", "a virus"], "The examples did not show the whole picture."],
    ["Data kept aside to check a model after training is called ...", "test data", ["backup data", "password data", "source code"], "A student gets a quiz after studying."],
    ["In machine learning, a <b>label</b> is ...", "the correct answer attached to an example", ["a sticker on the computer", "the name of the program", "a kind of loop"], "A photo of a cat might carry the label 'cat'."],
    ["A model that does great on its training examples but badly on new ones is ...", "overfitting", ["debugging", "compiling", "streaming"], "It memorized instead of learning the general idea."],
    ["A <b>feature</b> in machine learning is ...", "a measurable detail used as input, like height or color", ["a bug fix", "the final answer", "a speaker in the computer"], "It is a fact about each example."],
    ["A chatbot sometimes states something wrong in a confident way. What is wise to do?", "check important facts in a trusted source", ["trust every answer", "never use computers", "delete your homework"], "Even clever tools make mistakes."],
    ["A spam filter learns by studying emails that people have marked as ...", "spam or not spam", ["long or short", "old or new", "red or blue"], "It needs examples with correct labels."],
    ["A neural network is loosely inspired by ...", "connections between brain cells", ["the roads of a city", "a library catalog", "a toaster"], "Think about biology."],
    ["To make a fair model, the training examples should be ...", "varied and cover many kinds of people and situations", ["all exactly alike", "taken from one single place", "chosen at random without looking"], "A model can only learn from what it sees."]
  ];

  const CYBQ = [
    ["Scrambling data so only someone with the key can read it is called ...", "encryption", ["compression", "formatting", "debugging"], "Think of a secret code."],
    ["A fake message that tricks you into giving away a password is called ...", "phishing", ["debugging", "streaming", "tweening"], "The attacker 'fishes' for your information."],
    ["Two-step login asks for your password plus ...", "a second proof, like a code sent to your phone", ["your favorite color", "the same password again", "your home address"], "Having two different kinds of proof makes stealing an account harder."],
    ["A good website stores passwords as ...", "hashes (scrambled one-way codes)", ["plain text lists", "pictures", "emails to everyone"], "Even the site's owners should not be able to read your password."],
    ["A padlock and https in the address bar mean ...", "the connection to the site is encrypted", ["the site is always trustworthy", "the site is free", "the page is from a school"], "It protects the trip of the data, not the honesty of the site."],
    ["Software updates are important because they often ...", "fix security holes", ["make the screen bigger", "delete your files", "slow the internet on purpose"], "Attackers look for known weak spots."],
    ["A <b>firewall</b> ...", "blocks unwanted network traffic", ["cools the computer", "makes games faster", "stores your backups"], "It stands guard at the door of a network."],
    ["<b>Malware</b> is ...", "software made to cause harm", ["a hardware part", "a kind of cable", "a safe game"], "'Mal' means bad."],
    ["A good backup is ...", "a copy of your files kept in a different place", ["a shortcut icon", "a renamed file", "a second window"], "If one place is lost, the copy must survive."],
    ["Which password is the strongest?", "a long passphrase of random words and numbers", ["password123", "your name", "12345"], "Think about how many combinations an attacker must try."],
    ["Programs should check what users type in because ...", "bad input can trick a program into doing harm", ["users never make mistakes", "typing is slow", "it makes the screen prettier"], "Never trust input without checking it."]
  ];

  const ETHQ = [
    ["<b>Open-source</b> software is ...", "software whose code anyone can read and often improve", ["software nobody can ever use", "software that costs a lot", "software with no code"], "The word 'open' tells you the code is visible."],
    ["Using someone's code, music or art without permission can break ...", "copyright", ["gravity", "a loop", "a variable"], "It is about the rights of the maker."],
    ["Your <b>digital footprint</b> is ...", "the trail of information you leave online", ["a shoe print on a keyboard", "the size of your screen", "a kind of virus"], "Things you post or search can last a long time."],
    ["A program that treats groups of people unfairly because of its data has ...", "bias", ["a speed boost", "a short loop", "free memory"], "Fairness depends on what the program learned from."],
    ["<b>Accessible</b> design means ...", "people with different needs can use it, for example with captions or screen readers", ["only experts can use it", "it works only on one device", "it needs a fast network"], "Good tools are for everyone."],
    ["Before sharing a photo that shows a friend online you should ...", "ask their permission", ["tag everyone you can", "just post it quickly", "hide who took it"], "It is their picture too."],
    ["A <b>license</b> on code tells you ...", "what others may do with it", ["how fast it runs", "which color it uses", "how many lines it has"], "It is a set of permissions."],
    ["If someone is unkind to you online, a good plan is to ...", "not reply, save the evidence and tell a trusted adult", ["send meaner messages back", "keep it a secret", "post their address"], "Keep calm and get help."],
    ["Giving <b>credit</b> in a project means ...", "saying where an idea, picture or code came from", ["hiding your sources", "changing the author's name", "deleting the original"], "Be honest about who made what."],
    ["A healthy way to use screens is to ...", "take breaks and still sleep, play and talk with people", ["use them all night", "never stop for food", "skip all outdoor time"], "Balance matters."],
    ["<b>Green computing</b> means ...", "using less energy and recycling old devices", ["leaving computers on all night", "painting computers green", "buying a new device every week"], "It is about the planet."]
  ];

  const nnQ = () => {
    for (;;) {
      const [la, lb] = pick([["cat", "dog"], ["small", "big"], ["cold", "hot"], ["short", "tall"]]);
      const swap = Math.random() < 0.5, A = swap ? lb : la, B = swap ? la : lb;
      const lowPts = uniq(3, 1, 7), highPts = uniq(3, 12, 20).sort((a, b) => a - b), pts = [...lowPts.map(v => [v, A]), ...highPts.map(v => [v, B])];
      const q = ri(4, 16), k = Math.random() < 0.5 ? 1 : 3;
      const ds = pts.map(([v, l]) => [Math.abs(v - q), l, v]).sort((a, b) => a[0] - b[0]);
      if (ds.some(d => d[0] === 0) || ds[k - 1][0] === ds[k][0]) continue;
      const lbs = ds.slice(0, k).map(d => d[1]);
      const ans = lbs.filter(x => x === A).length > lbs.length / 2 ? A : B;
      return mc(`Known examples (number → label): ${pts.map(p => `${p[0]} → ${p[1]}`).join(", ")}. A new example is <b>${q}</b>. Using the <b>${k === 1 ? "nearest 1 neighbor" : "3 nearest neighbors (majority wins)"}</b>, what label does it get?`, ans, [A, B].filter(x => x !== ans), [
        "Nearest neighbor guesses a label by looking at the closest known examples.",
        k === 1 ? "Work out how far each known number is from the new number. The closest one gives the label." : "Work out how far each known number is from the new number. Take the three closest, then pick the label that appears most among them.",
        "Example: known 2 → A, 3 → A, 10 → B. New number 6: distances 4, 3, 4... the closest known is 3 (distance 3), so the label is A. Now do yours."
      ]);
    }
  };

  const lessons15 = [
    L("Negative numbers in bits", twosQ, [S("Two's complement", "➖", "Computers store negative whole numbers with <b>two's complement</b>. The left bit counts as a negative place value."), S("Example", "✏️", "In 4 bits the places are -8, 4, 2, 1. So 1101 = -8 + 4 + 1 = -3."), S("Making a negative", "🔄", "Flip all the bits and add 1. 0010 (2) becomes 1101, then 1110 (-2).")]),
    L("Counting one bits", popQ, [S("Population count", "1️⃣", "Counting how many 1 bits a number has is called a <b>popcount</b>."), S("Method", "📋", "Write the number as a sum of powers of two. The number of powers is the number of ones."), S("NOT", "🔁", "NOT flips every bit, so ones and zeros swap. In a byte, ones plus zeros is always 8.")]),
    L("Sliding window", windowQ, [S("A window", "🪟", "A <b>sliding window</b> looks at k items side by side and moves along the list."), S("Slide", "➡️", "Add the item that enters and take away the item that leaves. No need to add everything again."), S("Use", "💡", "It finds the best stretch in a list quickly.")]),
    L("Pairs that add up", pairsQ, [S("The target", "🎯", "Given a list and a target, can two items add to it?"), S("Complement", "🧩", "For an item x, the partner needed is target - x. Look for it in the list."), S("Count once", "1️⃣", "The pair (a, b) and the pair (b, a) are the same pair.")]),
    L("Heaps in a list", heapQ, [S("A tree in a list", "🌲", "A <b>heap</b> keeps its tree inside a plain list. The smallest item of a min-heap is at index 0."), S("Formulas", "🧮", "Children of index i: 2i + 1 and 2i + 2. Parent of index j: (j - 1) div 2."), S("Use", "⚡", "Heaps give the smallest item quickly. They power priority queues.")]),
    L("Walking a tree", travQ, [S("Three walks", "🚶", "<b>Preorder</b>: node, left, right. <b>Inorder</b>: left, node, right. <b>Postorder</b>: left, right, node."), S("Sorted!", "🔢", "Inorder on a binary search tree gives the numbers in sorted order."), S("Recursive", "🔁", "Each walk repeats the same rule inside every smaller tree.")]),
    L("Groups in a graph", compQ, [S("Connected", "🔗", "Two towns are <b>connected</b> if you can travel between them along roads."), S("Components", "🏝️", "A graph can have separate islands. Each island is a <b>connected component</b>."), S("Finding them", "🔎", "Start at an unmarked node, mark everything reachable, and count how many times you start.")]),
    L("Remembering answers", memoQ, [S("Repeated work", "♻️", "A recursive function can solve the same smaller problem many times."), S("Cache", "🗃️", "<b>Memoization</b> saves each answer in a cache. Next time, it is looked up."), S("Big saving", "🚀", "Without a cache fib(n) takes about 2 to the power n steps. With one it takes about n steps.")]),
    L("Inheritance", inheritQ, [S("Parent and child", "👪", "A <b>child class</b> <b>extends</b> a parent class and gets its methods for free."), S("Override", "✍️", "A child can write its own method with the same name. The child's version is used."), S("super", "⬆️", "super.speak() runs the parent's version first.")]),
    L("Wildcard patterns", wildQ, [S("Wildcards", "🃏", "A <b>wildcard</b> stands for letters you do not care about."), S("Two kinds", "❓✳️", "<b>?</b> matches exactly one letter. <b>*</b> matches any number of letters, even none."), S("Use", "💻", "Search tools use wildcards to find many files at once, like *.png.")]),
    L("Same logic, different shape", facts(EQV, "Try the expression with true and false values and compare.", "Example: NOT (X AND Y) acts like (NOT X) OR (NOT Y). For X = true and Y = false, both give true."), [S("Equivalent", "⚖️", "Two logic expressions are <b>equivalent</b> if they give the same result for every input."), S("De Morgan", "🔄", "NOT (A AND B) = (NOT A) OR (NOT B). NOT (A OR B) = (NOT A) AND (NOT B)."), S("Truth table", "📋", "To be sure, try every combination of inputs.")]),
    L("Squeezing data: codes", huffQ, [S("Short for common", "📦", "To shrink a message, give <b>short codes to common letters</b> and long codes to rare ones. This is the idea behind Huffman coding."), S("Prefix rule", "🚧", "No code may be the start of another code. Then a bit string can be decoded without confusion."), S("Count bits", "🔢", "Total size = the sum of the code lengths of all the letters.")]),
    L("Check digits", checkQ, [S("Spot mistakes", "🔍", "Numbers like barcodes end with a <b>check digit</b> made from the other digits."), S("Compute", "🧮", "The computer repeats the calculation. If the check digit does not match, a digit was mistyped or misread."), S("Hashes", "#️⃣", "A hash is a longer, stronger fingerprint used to check that a file did not change.")]),
    L("Sharing the CPU", rrQ, [S("Taking turns", "🔄", "A computer runs many tasks by giving each a short turn. This is <b>scheduling</b>."), S("Round robin", "🎡", "Each task runs for up to a time slice. If not finished, it goes to the back of the line."), S("Simulate", "📋", "Keep a clock and a line of tasks, and update both after every turn.")]),
    L("How machines learn", facts(AIQ, "Think about how a person learns from examples.", "Example: to learn what a bird is, you look at many labeled pictures of birds. Computers do something similar with data."), [S("Learning from examples", "🤖", "<b>Machine learning</b> lets a program learn patterns from many examples instead of fixed rules."), S("Data matters", "📊", "<b>Training data</b> teaches the model. <b>Test data</b> checks it. Unfair data gives unfair results (<b>bias</b>)."), S("Careful use", "🧠", "Models can be wrong. Check important answers.")]),
    L("Nearest neighbor", nnQ, [S("Look around", "👀", "To label something new, find the known examples that are closest to it."), S("Distance", "📏", "On a number line, the distance is the difference between the numbers, ignoring the sign."), S("k neighbors", "🗳️", "With k = 3, look at the three closest examples and let them vote.")]),
    L("Staying secure", facts(CYBQ, "Think about how an attacker thinks and how to defend.", "Example: two-step login helps because a stolen password alone is not enough to get in."), [S("Threats", "⚠️", "Attackers use <b>phishing</b>, <b>malware</b> and weak passwords."), S("Defenses", "🛡️", "Use long passwords, two-step login, updates, backups and a <b>firewall</b>."), S("Hashing and encryption", "🔐", "Sites should <b>hash</b> passwords. <b>Encryption</b> protects data while it travels.")]),
    L("Technology and people", facts(ETHQ, "Think about being fair, honest and kind with technology.", "Example: asking permission before sharing a friend's photo shows respect for their privacy."), [S("Credit and rules", "📜", "Respect <b>copyright</b> and <b>licenses</b>. Give credit to the people whose work you use."), S("Fair and open", "⚖️", "Good programmers think about <b>bias</b> and <b>accessibility</b>, so tools work for everyone."), S("Be kind", "💛", "Protect privacy, think about your <b>digital footprint</b> and ask a trusted adult when something online feels wrong.")]),
    L("Mixed practice", mix(twosQ, popQ, windowQ, pairsQ, heapQ, travQ, compQ, memoQ, inheritQ, wildQ), MIXS("negative binary numbers, bit counting, windows, heaps, tree walks, graphs, caching, classes and wildcards.")),
    L("Level 15 Challenge", mix(twosQ, popQ, windowQ, pairsQ, heapQ, travQ, compQ, memoQ, inheritQ, wildQ, huffQ, checkQ, rrQ, nnQ, facts(EQV, "Try the expression with true and false values and compare.", "Example: NOT (X AND Y) acts like (NOT X) OR (NOT Y)."), facts(AIQ, "Think about how a person learns from examples.", "Example: labeled pictures teach a model what a bird is."), facts(CYBQ, "Think about how an attacker thinks and how to defend.", "Example: two-step login adds a second proof."), facts(ETHQ, "Think about being fair, honest and kind with technology.", "Example: asking permission respects privacy.")), MIXS("everything from level 15: bits, algorithms, trees and graphs, logic, compression, scheduling, learning machines, security and ethics."))
  ];

  Object.assign(CODING_LEVELS, { 13: lessons13, 14: lessons14, 15: lessons15 });
})();
