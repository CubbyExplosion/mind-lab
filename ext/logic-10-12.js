// ext/logic-10-12.js  Mind Lab Logic & Puzzles levels 10-12 (60 lessons)
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const big = (t, s = 1.8) => `<span style="font-size:${s}em">${t}</span>`;
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben", "Kai", "Eli", "Nia", "Tom"];
  const mcq = (text, visual, right, wrongs, hints) => {
    right = String(right);
    const w = [...new Set(wrongs.map(String))].filter(x => x !== right).slice(0, 3);
    return { text, visual, choices: shuf([right, ...w]), answer: right, hints };
  };
  const num = (text, visual, answer, hints) => ({ text, visual, answer, hints });
  const ex = (list, ans) => { const ok = list.filter(e => String(e[1]) !== String(ans)); return (ok.length ? pick(ok) : list[0])[0]; };
  const names = n => shuf(NM).slice(0, n);
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => a / gcd(a, b) * b;
  const T = n => n * (n + 1) / 2;
  const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const fr = (a, b) => { const g = gcd(a, b); return `${a / g}/${b / g}`; };
  const tbl = rows => `<table style="margin:auto;border-collapse:collapse;font-size:1.3em">${rows.map(r => `<tr>${r.map(c => `<td style="border:2px solid #888;padding:4px 10px;text-align:center">${c}</td>`).join("")}</tr>`).join("")}</table>`;
  const fmtT = m => { m = ((m % 720) + 720) % 720; const h = Math.floor(m / 60) || 12; return `${h}:${String(m % 60).padStart(2, "0")}`; };
  const money = c => `$${(c / 100).toFixed(2)}`;

  // ======================= LEVEL 10 =======================
  const triNum = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const k = ri(4, 7), arr = Array.from({ length: k }, (_, i) => T(i + 1)), a = T(k + 1);
      return num("Triangular numbers grow in a special way. What number comes next?", big(arr.join(", ") + ", ❓"), a, [
        "Look at the jumps between neighbours. Do the jumps stay the same?",
        "The jumps grow by one each time. Work out what the next jump must be and add it on.",
        ex([["Example: 1, 3, 6, 10 has jumps of 2, 3, 4, so the next jump is 5 and the next number is 15. Now do yours.", 15], ["Example: 1, 3, 6, 10, 15, 21 has jumps of 2, 3, 4, 5, 6, so the next jump is 7 and the next number is 28. Now do yours.", 28]], a)]);
    }
    if (t === 1) {
      const n = ri(6, 14), a = T(n);
      return num(`What is the ${n}th triangular number? (1 + 2 + 3 + ... + ${n})`, big("🔺"), a, [
        "You could add one by one. Or pair the first number with the last one, the second with the second to last.",
        "Every pair has the same total. Count how many pairs there are, then multiply.",
        ex([["Example: 1 + 2 + ... + 8. The pairs are 1+8, 2+7, 3+6, 4+5. That is 4 pairs of 9, so 36. Now do yours.", 36], ["Example: 1 + 2 + ... + 6. The pairs are 1+6, 2+5, 3+4. That is 3 pairs of 7, so 21. Now do yours.", 21]], a)]);
    }
    if (t === 2) {
      const n = ri(4, 12), a = T(n);
      return num(`Bowling pins are set up in a triangle: 1 pin in the first row, 2 in the second, and so on. How many pins are in ${n} rows?`, big("🎳"), a, [
        "Each new row has one more pin than the row before.",
        "Add the pins row by row: 1 + 2 + 3 + ... up to the last row.",
        ex([["Example: 4 rows have 1 + 2 + 3 + 4 = 10 pins. Now do yours.", 10], ["Example: 5 rows have 1 + 2 + 3 + 4 + 5 = 15 pins. Now do yours.", 15]], a)]);
    }
    const right = T(ri(6, 13)), ws = new Set();
    while (ws.size < 3) { const x = ri(22, 95); if (!Array.from({ length: 14 }, (_, i) => T(i + 1)).includes(x)) ws.add(x); }
    return mcq("Which of these is a triangular number?", big("🔺"), right, [...ws], [
      "A triangular number is 1, or 1 + 2, or 1 + 2 + 3, and so on.",
      "Make the list by adding one more each time: 1, 3, 6, 10... Keep going until you reach the size of the choices.",
      "Example: Is 15 triangular? 1 + 2 + 3 + 4 + 5 = 15, yes. Is 16? The list goes 15, 21, so no. Now do yours."]);
  };

  const fibo = () => {
    const a = ri(1, 5), b = ri(1, 6), s = [a, b];
    for (let i = 0; i < 9; i++) s.push(s[i] + s[i + 1]);
    const t = ri(0, 2), hh3 = [["Example: 2, 3, 5, 8, 13, ❓ . 8 + 13 = 21. Now do yours.", 21], ["Example: 1, 4, 5, 9, 14, ❓ . 9 + 14 = 23. Now do yours.", 23]];
    if (t === 0) { const k = ri(5, 7); return num("Each number is the sum of the two numbers before it. What comes next?", big(s.slice(0, k).join(", ") + ", ❓"), s[k], ["Try adding two neighbours. Do they make the next number?", "Add the last two numbers you can see.", ex(hh3, s[k])]); }
    if (t === 1) {
      const h = ri(2, 5), arr = s.slice(0, h + 3).map((x, i) => (i === h ? "❓" : x)), ans = s[h];
      return num("Each number is the sum of the two numbers before it. What number is hidden?", big(arr.join(", ")), ans, [
        "Look at the two numbers just before the hidden one.", "The hidden number is the sum of those two. You can check it with the numbers after it.",
        ex([["Example: 2, 3, ❓, 8, 13. The two before are 2 and 3, so ❓ = 5 (and 3 + 5 = 8 checks out). Now do yours.", 5], ["Example: 3, 4, ❓, 11, 18. The two before are 3 and 4, so ❓ = 7 (and 4 + 7 = 11). Now do yours.", 7]], ans)]);
    }
    const arr = ["❓", s[1], s[2], s[3], s[4]], ans = s[0];
    return num("Each number is the sum of the two numbers before it. What is the first number?", big(arr.join(", ")), ans, [
      "The 3rd number is the 1st plus the 2nd.", "Take the 2nd number away from the 3rd number to find the first.",
      ex([["Example: ❓, 4, 9, 13. The 3rd number 9 is ❓ + 4, so ❓ = 9 − 4 = 5. Now do yours.", 5], ["Example: ❓, 2, 8, 10. The 3rd number 8 is ❓ + 2, so ❓ = 8 − 2 = 6. Now do yours.", 6]], ans)]);
  };

  const palin = () => {
    const t = ri(0, 3), isP = n => { const s = String(n); return s === s.split("").reverse().join(""); };
    if (t === 0) {
      let n; do n = ri(100, 989); while (isP(n));
      let a = n + 1; while (!isP(a)) a++;
      return num(`A palindrome reads the same forwards and backwards (like 262). What is the next palindrome bigger than ${n}?`, big("🪞"), a, [
        "A 3-digit palindrome looks like ABA. The first and last digits match.",
        "Copy the first digit to the end. If that number is still too small, make the middle digit bigger by one (or move on to the next first digit).",
        ex([["Example: the next palindrome after 341 is 343: copy the 3 to the end, 343, which is bigger than 341. Now do yours.", 343], ["Example: after 398, copying the first digit gives 393 (too small). Raise the middle: 3 9 3 becomes 4 0 4. Now do yours.", 404]], a)]);
    }
    if (t === 1) {
      const lo = ri(100, 500), hi = lo + ri(60, 400); let c = 0; for (let i = lo; i <= hi; i++) if (isP(i)) c++;
      return num(`How many palindromes are there from ${lo} to ${hi}? (Count ${lo} and ${hi} too.)`, big("🪞"), c, [
        "A 3-digit palindrome is a first digit, any middle digit, and the same first digit again.",
        "Go through each first digit that fits. For each one, think about which middle digits keep the number inside the range.",
        "Example: from 100 to 230. First digit 1: 101, 111, ... 191. First digit 2: 202, 212, 222 (232 is too big). Count them all. Now do yours."]);
    }
    if (t === 2) {
      const a = ri(1, 9), b = ri(0, 9), c = ri(0, 9), d = ri(0, 9), right = Number(`${a}${b}${c}${b}${a}`), wr = [Number(`${a}${b}${c}${a}${b}`), Number(`${a}${b}${c}${c}${a}`), Number(`${b}${a}${c}${b}${a}`), Number(`${a}${c}${b}${d}${a}`)].filter(x => !isP(x));
      return mcq("Which of these is a palindrome?", big("🪞"), right, wr, [
        "Read each choice from the left, then from the right.", "The first digit must match the last digit, and the second must match the 4th. Cross out the ones that fail.",
        "Example: 41314 is a palindrome (reverse: 41314). 41341 is not (reverse: 14314). Now do yours."]);
    }
    const n = ri(12, 89); if (n % 11 === 0 || n % 10 === 0) return palin();
    const r = Number(String(n).split("").reverse().join("")), a = n + r;
    return num(`Reverse the digits of ${n} and add it to ${n}. What is the total?`, big("🔁"), a, [
      "First find the reversed number: swap the tens digit and the ones digit.", "Add the original number and the reversed number.",
      ex([["Example: 27 reversed is 72. 27 + 72 = 99. Now do yours.", 99], ["Example: 58 reversed is 85. 58 + 85 = 143. Now do yours.", 143]], a)]);
  };

  const average = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const k = ri(3, 5), avg = ri(6, 40), total = avg * k, arr = []; let rest = total;
      for (let i = 0; i < k - 1; i++) { const x = ri(Math.max(1, avg - 5), avg + 5); arr.push(x); rest -= x; }
      if (rest < 1) return average(); arr.push(rest);
      return num(`What is the average (mean) of ${arr.join(", ")}?`, big("📊"), avg, ["The average is what each number would be if they were all shared out equally.", "Add all the numbers, then divide by how many numbers there are.", ex([["Example: the average of 4, 8, 12 is (4 + 8 + 12) ÷ 3 = 24 ÷ 3 = 8. Now do yours.", 8], ["Example: the average of 5, 9, 7, 7 is 28 ÷ 4 = 7. Now do yours.", 7]], avg)]);
    }
    if (t === 1) {
      const n = ri(2, 4), sc = Array.from({ length: n }, () => ri(70, 95)), g = ri(80, 90), need = g * (n + 1) - sc.reduce((x, y) => x + y, 0);
      if (need < 40 || need > 100) return average();
      return num(`Ava scored ${sc.join(", ")} on her first ${n} tests. What must she score on test ${n + 1} to have an average of ${g}?`, big("📝"), need, [
        "Think about the total points she needs over all the tests.", `The total needed is the average times the number of tests (${n + 1}). Then take away the points she already has.`,
        ex([["Example: Scores 70 and 80, and she wants an average of 80 over 3 tests. She needs 240 in total. 240 − 150 = 90. Now do yours.", 90], ["Example: Scores 50 and 60, and she wants an average of 70 over 3 tests. She needs 210 in total. 210 − 110 = 100. Now do yours.", 100]], need)]);
    }
    if (t === 2) {
      const k = ri(3, 8), a = ri(5, 30);
      return num(`The average of ${k} numbers is ${a}. What do the ${k} numbers add up to?`, big("📊"), k * a, ["Average = total ÷ how many numbers. Which way do you go to find the total?", "Undo the division: multiply the average by how many numbers there are.", "Example: the average of 5 numbers is 6. The total is 5 × 6 = 30. Now do yours."]);
    }
    const a = ri(6, 30), x = ri(2, 2 * a - 2);
    return num(`The average of two numbers is ${a}. One of the numbers is ${x}. What is the other number?`, big("📊"), 2 * a - x, ["Find the total of the two numbers first.", "The total is the average times 2. Then take away the number you know.", ex([["Example: the average of two numbers is 10 and one is 7. The total is 20 and 20 − 7 = 13. Now do yours.", 13], ["Example: the average of two numbers is 15 and one is 9. The total is 30 and 30 − 9 = 21. Now do yours.", 21]], 2 * a - x)]);
  };

  const medMode = () => {
    const k = pick([5, 7]); let arr;
    do { arr = Array.from({ length: k - 1 }, () => ri(1, 20)); } while (new Set(arr).size < k - 1);
    arr.push(pick(arr)); arr = shuf(arr);
    const sorted = [...arr].sort((a, b) => a - b), t = ri(0, 2);
    const modeV = arr.find(v => arr.filter(x => x === v).length === 2);
    const vis = big(arr.join(", "), 1.5);
    if (t === 0) return num("What is the median (the middle number when they are in order)?", vis, sorted[(k - 1) / 2], ["Put the numbers in order from smallest to biggest first.", "The median is the one in the exact middle of the ordered list. Count the same amount from each end.", ex([["Example: 9, 2, 8, 4, 5. In order: 2, 4, 5, 8, 9. The middle one is the 3rd number: 5. Now do yours.", 5], ["Example: 7, 1, 9. In order: 1, 7, 9. The middle one is 7. Now do yours.", 7]], sorted[(k - 1) / 2])]);
    if (t === 1) return num("What is the mode (the number that appears most often)?", vis, modeV, ["Look for a number that shows up more than once.", "Check each number in the list. Which one is written twice?", "Example: 3, 8, 5, 8, 2. The number 8 appears twice, so the mode is 8. Now do yours."]);
    return num("What is the range (the biggest number minus the smallest number)?", vis, sorted[k - 1] - sorted[0], ["Find the biggest and the smallest number in the list.", "Subtract: biggest minus smallest.", ex([["Example: 4, 9, 2, 7. The biggest is 9 and the smallest is 2, so the range is 7. Now do yours.", 7], ["Example: 15, 3, 11. The biggest is 15 and the smallest is 3, so the range is 12. Now do yours.", 12]], sorted[k - 1] - sorted[0])]);
  };

  const areaPerim = () => {
    const t = ri(0, 3), l = ri(4, 14), w = ri(2, l - 1);
    if (t === 0) return num(`A rectangle has an area of ${l * w} square cm and one side is ${l} cm. What is its perimeter in cm?`, big("▭"), 2 * (l + w), ["Area is length times width. You know the area and one side.", "Divide the area by the known side to find the other side. Then add all four sides.", ex([["Example: area 24 and one side 6. The other side is 24 ÷ 6 = 4. Perimeter: 6 + 4 + 6 + 4 = 20. Now do yours.", 20], ["Example: area 30 and one side 5. The other side is 6. Perimeter: 5 + 6 + 5 + 6 = 22. Now do yours.", 22]], 2 * (l + w))]);
    if (t === 1) return num(`A rectangle has a perimeter of ${2 * (l + w)} cm and one side is ${l} cm. What is its area in square cm?`, big("▭"), l * w, ["The perimeter goes all the way around: two lengths and two widths.", "Half the perimeter is one length plus one width. Take away the side you know to find the other side, then multiply.", ex([["Example: perimeter 20, one side 6. Half is 10, and 10 − 6 = 4. Area is 6 × 4 = 24. Now do yours.", 24], ["Example: perimeter 26, one side 9. Half is 13, and 13 − 9 = 4. Area is 9 × 4 = 36. Now do yours.", 36]], l * w)]);
    if (t === 2) { const s = ri(3, 13); return num(`A square has a perimeter of ${4 * s} cm. What is its area in square cm?`, big("🟦"), s * s, ["A square has four sides that are all equal.", "Divide the perimeter by 4 to get one side. Then multiply the side by itself.", "Example: perimeter 20. One side is 5. Area is 5 × 5 = 25. Now do yours."]); }
    return num(`A rectangle has an area of ${l * w} square cm and a perimeter of ${2 * (l + w)} cm. How long is its longer side in cm?`, big("▭"), l, ["Think of two numbers that multiply to the area.", "List the pairs of numbers that multiply to the area. Find the pair whose sum is half the perimeter.", ex([["Example: area 12 and perimeter 16. Half the perimeter is 8. Pairs for 12: 1×12, 2×6, 3×4. 2 + 6 = 8, so the sides are 2 and 6 and the longer one is 6. Now do yours.", 6], ["Example: area 20 and perimeter 18. Half is 9. Pairs: 1×20, 2×10, 4×5. 4 + 5 = 9, so the longer side is 5. Now do yours.", 5]], l)]);
  };

  const OPSE = () => {
    for (;;) {
      const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9), d = ri(1, 9);
      const f = pick([[`(${a} + ${b}) × ${c}`, (a + b) * c], [`${a} + ${b} × ${c}`, a + b * c], [`${a} × ${b} − ${c}`, a * b - c], [`${a} × (${b} + ${c})`, a * (b + c)], [`(${a} + ${b}) × ${c} − ${d}`, (a + b) * c - d], [`${a} + ${b} × ${c} − ${d}`, a + b * c - d], [`${a * c} ÷ ${c} + ${b} × ${d}`, a + b * d]]);
      if (f[1] > 0) return f;
    }
  };
  const lettered = (text, visual, right, all, hints) => {
    const ord = shuf(all), choices = ord.map((e, i) => `${"ABCD"[i]}) ${e[0]}`);
    return { text, visual, choices, answer: choices[ord.indexOf(right)], hints };
  };
  const orderOps = () => {
    const t = ri(0, 2), hh = ["Brackets come first. Then × and ÷. Then + and − from left to right.", "Work out any brackets first. Then do the × and ÷ before the + and −.", "Example: 3 + 4 × 2. Do 4 × 2 = 8 first, then 3 + 8 = 11. With brackets, (3 + 4) × 2 = 14. Now do yours."];
    if (t === 0) { const f = OPSE(); return num(`What is ${f[0]}?`, big("🧮"), f[1], hh); }
    if (t === 1) {
      for (;;) {
        const es = [OPSE(), OPSE(), OPSE(), OPSE()];
        if (new Set(es.map(e => e[1])).size < 4 || new Set(es.map(e => e[0])).size < 4) continue;
        return lettered(`Which expression is equal to ${es[0][1]}?`, big("🧮"), es[0], es, hh);
      }
    }
    for (;;) {
      const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9), ops = ["+", "−", "×"], o1 = pick(ops), o2 = pick(ops);
      if (o1 === o2) continue;
      const ap = (o, x, y) => (o === "+" ? x + y : o === "−" ? x - y : x * y);
      const opts = [[`(${a} ${o1} ${b}) ${o2} ${c}`, ap(o2, ap(o1, a, b), c)], [`${a} ${o1} (${b} ${o2} ${c})`, ap(o1, a, ap(o2, b, c))], [`(${a} ${o2} ${b}) ${o1} ${c}`, ap(o1, ap(o2, a, b), c)], [`${a} ${o2} (${b} ${o1} ${c})`, ap(o2, a, ap(o1, b, c))]];
      const tg = pick(opts);
      if (opts.filter(o => o[1] === tg[1]).length > 1 || tg[1] < 0 || new Set(opts.map(o => o[1])).size < 4) continue;
      return lettered(`Which way of writing it makes the answer ${tg[1]}?`, big("🧮"), tg, opts, ["Work out the answer for each choice, one at a time.", "Brackets first, then × before + and −. Compare each result with the target.", "Example: Which gives 14: (3 + 4) × 2 or 3 + 4 × 2? The first is 7 × 2 = 14. The second is 3 + 8 = 11. Now do yours."]);
    }
  };

  const cuts = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(2, 12); return num(`You cut a rope in a straight line ${n} times, one cut at a time on one piece. How many pieces do you have?`, big("✂️"), n + 1, ["Try it with 1 cut, then 2 cuts. How many pieces each time?", "Each cut makes exactly one more piece than before.", "Example: 4 cuts make 5 pieces. Now try yours."]); }
    if (t === 1) { const p = ri(4, 9), m = ri(2, 6); return num(`A carpenter cuts a log into ${p} pieces. Each cut takes ${m} minutes. How many minutes does the cutting take in all?`, big("🪵"), (p - 1) * m, ["How many cuts do you need to make a certain number of pieces?", `The number of cuts is one fewer than the pieces. Then multiply the cuts by the minutes per cut.`, "Example: 5 pieces need 4 cuts. At 3 minutes each, that is 12 minutes. Now do yours."]); }
    if (t === 2) { const p = ri(5, 15); return num(`How many cuts do you need to cut a ribbon into ${p} pieces?`, big("🎀"), p - 1, ["Think small: how many cuts to make 2 pieces? 3 pieces?", "The number of cuts is always one less than the number of pieces.", "Example: 6 pieces need 5 cuts. Now do yours."]); }
    const k = ri(3, 8), q = ri(3, 8); return num(`A ribbon is ${k * q} cm long. You cut it into pieces that are each ${k} cm long. How many cuts do you make?`, big("🎀"), q - 1, ["First find how many pieces you will get.", "Divide the length by the piece length to get the pieces. Cuts are one fewer than pieces.", "Example: a 20 cm ribbon into 4 cm pieces gives 5 pieces, so 4 cuts. Now do yours."]);
  };

  const speed = () => {
    const t = ri(0, 3), s = ri(3, 12) * 5, h = ri(2, 6), u = pick(["km", "miles"]);
    if (t === 0) return num(`A bike goes ${s} ${u} each hour. How far does it go in ${h} hours?`, big("🚲"), s * h, ["Distance is speed times time.", "Multiply the distance in one hour by the number of hours.", "Example: 20 km each hour for 3 hours is 60 km. Now do yours."]);
    if (t === 1) return num(`A car drives ${s * h} ${u} at ${s} ${u} per hour. How many hours does it take?`, big("🚗"), h, ["Time is distance divided by speed.", "How many times does the speed fit into the distance?", "Example: 90 km at 30 km per hour takes 90 ÷ 30 = 3 hours. Now do yours."]);
    if (t === 2) return num(`A train goes ${s * h} ${u} in ${h} hours at a steady speed. How many ${u} per hour is that?`, big("🚆"), s, ["Speed is how far you go in one hour.", "Divide the distance by the hours.", "Example: 120 km in 4 hours is 120 ÷ 4 = 30 km per hour. Now do yours."]);
    const a = ri(2, 8), b = ri(2, 8);
    return num(`Two friends ${a + b > 0 ? "start" : ""} ${(a + b) * h} ${u} apart and walk toward each other. One walks ${a} ${u} per hour and the other walks ${b} ${u} per hour. After how many hours do they meet?`, big("🚶🚶"), h, ["Each hour, the gap between them gets smaller. By how much?", "Add their two speeds to see how fast the gap closes, then divide the distance by that.", "Example: 24 km apart, speeds 3 and 5. The gap closes 8 km per hour. 24 ÷ 8 = 3 hours. Now do yours."]);
  };

  const rates = () => {
    const t = ri(0, 3);
    if (t === 0) { const k = ri(3, 8), u = ri(2, 9), m = ri(10, 15); return num(`${k} pencils cost $${k * u}. How much do ${m} pencils cost? (in dollars)`, big("✏️"), m * u, ["First find the price of just one pencil.", "Divide the cost by the number of pencils for the price of one. Then multiply by the new number.", "Example: 4 pens cost $12, so 1 pen is $3 and 7 pens are $21. Now do yours."]); }
    if (t === 1) { const a = ri(2, 9), tm = ri(2, 6), T2 = tm * ri(2, 6); return num(`A machine makes ${a * tm} toys in ${tm} minutes. How many toys does it make in ${T2} minutes?`, big("🏭"), a * T2, ["How many toys does the machine make in one minute?", "Find the toys per minute, then multiply by the new number of minutes.", "Example: 18 toys in 3 minutes is 6 each minute. In 5 minutes: 30 toys. Now do yours."]); }
    if (t === 2) { const n = ri(3, 9) + (Math.random() < 0.5 ? 0 : 5); return num(`${n} machines make ${n} toys in ${n} minutes. How many minutes do ${n * 20} machines need to make ${n * 20} toys?`, big("🏭"), n, ["How many toys does ONE machine make in that time?", "One machine makes one toy in that many minutes. More machines make more toys at the same time.", "Example: 3 machines make 3 toys in 3 minutes, so each machine takes 3 minutes per toy. 100 machines make 100 toys in the same 3 minutes. Now do yours."]); }
    const k = ri(2, 5) * 2, a = ri(2, 4), m = ri(2, 6) * 2; return num(`A recipe for ${k} people uses ${a * k / 2} cups of rice. How many cups are needed for ${m} people?`, big("🍚"), a * m / 2, ["How many cups does one person need?", "Divide the cups by the number of people, then multiply by the new number of people.", "Example: 4 people use 6 cups. 1 person uses 1.5 cups... or double it: 8 people use 12 cups. Now do yours."]);
  };

  const countSq = () => {
    const t = ri(0, 3), grid = (a, b) => `<div style="line-height:1.2;font-size:1.5em">${Array.from({ length: a }, () => "🟦".repeat(b)).join("<br>")}</div>`;
    if (t === 0) { const n = ri(3, 8); return num(`A big square is made of ${n} rows with ${n} small squares in each row. How many small squares are there?`, grid(Math.min(n, 5), Math.min(n, 5)), n * n, ["Rows times squares in each row.", "Multiply the number of rows by the squares in a row.", "Example: 4 rows of 4 is 16 small squares. Now do yours."]); }
    if (t === 1) { const n = ri(2, 5), a = Array.from({ length: n }, (_, i) => (i + 1) ** 2).reduce((x, y) => x + y, 0); return num(`How many squares of ALL sizes can you find in a ${n} by ${n} grid? (Count 1 by 1, 2 by 2, and bigger.)`, grid(n, n), a, ["Count the smallest squares first. Then look for squares made of 4 small ones, and so on.", "The number of squares of each size gets smaller as the squares get bigger. Add up every size.", "Example: in a 2 by 2 grid there are 4 small squares and 1 big one, so 5. In a 3 by 3 grid: 9 + 4 + 1 = 14. Now do yours."]); }
    if (t === 2) { const n = ri(3, 8); return num(`A strip is 1 square tall and ${n} squares long. How many rectangles of any size can you find in it?`, grid(1, n), T(n), ["Count rectangles of length 1, then of length 2, and so on.", "Length 1: n of them. Length 2: one fewer. Keep going down to 1, and add.", "Example: a strip of 4 has 4 + 3 + 2 + 1 = 10 rectangles. Now do yours."]); }
    const a = ri(2, 3), b = ri(2, 4); return num(`How many rectangles of any size (squares count too) are in a ${a} by ${b} grid?`, grid(a, b), T(a) * T(b), ["Think about choosing the left and right sides, and the top and bottom sides.", "Count the ways to pick the width positions, and the ways for the height positions. Multiply.", "Example: a 2 by 2 grid has 3 × 3 = 9 rectangles (3 ways for the width, 3 ways for the height). Now do yours."]);
  };

  const ca = (x, y) => `${x} across, ${y} up`;
  const mirror = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const same = "AHIMOTUVWXY".split(""), no = "BCDEFGJKLNPQRSZ".split("");
      return mcq("Hold a mirror to the side of a letter. Which letter looks exactly the same in the mirror?", big("🪞"), pick(same), shuf(no).slice(0, 3), ["Imagine flipping the letter from left to right.", "A letter that looks the same has a left half that matches its right half. Test each choice.", "Example: H looks the same when flipped. F does not, because its arms point one way. Now do yours."]);
    }
    const m = ri(4, 9), x = ri(0, m - 1), y = ri(1, 9);
    if (t === 1) return mcq(`The point (${x}, ${y}) is flipped over the up-and-down line at ${m} across (x = ${m}). Where does it land?`, big("🪞"), ca(2 * m - x, y), [ca(x, y), ca(m - x, y), ca(2 * m - x, y + 1), ca(x, 2 * m - y)], ["The mirror line is vertical. Which number changes when you flip left to right?", "How far is the point from the mirror line? The new point is the same distance on the other side. The second number stays the same.", "Example: (2, 5) flipped over the line at 6: it is 4 away, so it lands 4 on the other side, at 10. The point is (10, 5). Now do yours."]);
    return mcq(`The point (${y}, ${x}) is flipped over the flat line at ${m} up (y = ${m}). Where does it land?`, big("🪞"), ca(y, 2 * m - x), [ca(y, x), ca(y, m - x), ca(y + 1, 2 * m - x), ca(y + 2, 2 * m - x)], ["The mirror line is flat. Which number changes when you flip up to down?", "How far is the point from the mirror line? The new point is the same distance on the other side. The first number stays the same.", "Example: (3, 1) flipped over the line at 4 up: it is 3 below the line, so it lands 3 above, at 7. The point is (3, 7). Now do yours."]);
  };

  const twenty = () => {
    const t = ri(0, 1);
    if (t === 0) { const n = pick([4, 6, 8, 10, 12, 16, 20, 30, 50, 64, 100, 128, 200, 500, 1000]); return num(`I think of a number from 1 to ${n}. You can ask only yes/no questions. What is the fewest number of questions that is always enough to find my number?`, big("❓"), Math.ceil(Math.log2(n)), ["A good question cuts the list of possible numbers in half, like “Is it bigger than the middle?”", "Keep halving the list. Count how many halvings it takes to get down to one number.", ex([["Example: for 1 to 8, halving gives 4, then 2, then 1: that is 3 questions. Now do yours.", 3], ["Example: for 1 to 16, halving gives 8, 4, 2, 1: that is 4 questions. Now do yours.", 4]], Math.ceil(Math.log2(n)))]); }
    const q = ri(3, 9); return num(`After ${q} yes/no questions, how many different numbers can you tell apart at most? (Each question can double the possibilities.)`, big("❓"), 2 ** q, ["Each question has two answers: yes or no. What happens to the number of paths each time?", "Start with 1 and double it once for each question.", "Example: 3 questions can tell apart 2 × 2 × 2 = 8 numbers. Now do yours."]);
  };

  const coinWays = (target, coins) => { const w = Array(target + 1).fill(0); w[0] = 1; for (const c of coins) for (let i = c; i <= target; i++) w[i] += w[i - c]; return w[target]; };
  const coinMin = (target, coins) => { const m = Array(target + 1).fill(1e9); m[0] = 0; for (let i = 1; i <= target; i++) for (const c of coins) if (c <= i) m[i] = Math.min(m[i], m[i - c] + 1); return m[target]; };
  const coinCombos = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(2, 10) * 5; return num(`You have lots of nickels (5¢) and dimes (10¢). In how many different ways can you make ${n}¢?`, big("🪙"), coinWays(n, [5, 10]), ["Start with the most dimes you can use. Then fill the rest with nickels.", "Make a list: no dimes, then 1 dime, then 2 dimes... Each time the rest is made of nickels. Count the lines.", "Example: 20¢ with nickels and dimes: 2 dimes; 1 dime + 2 nickels; 4 nickels (no dimes). That is 3 ways. Now do yours."]); }
    if (t === 1) { const n = ri(6, 15); return num(`You have lots of pennies (1¢), nickels (5¢) and dimes (10¢). In how many different ways can you make ${n}¢?`, big("🪙"), coinWays(n, [1, 5, 10]), ["Sort by the biggest coin first: how many dimes could you use?", "For each number of dimes, count the ways to make the rest with nickels and pennies. Add them up.", "Example: 10¢ is made 4 ways: 1 dime; 2 nickels; 1 nickel + 5 pennies; 10 pennies. Now do yours with a different amount."]); }
    if (t === 2) { const n = ri(31, 99); return num(`What is the fewest number of coins (pennies, nickels, dimes, quarters) that make ${n}¢?`, big("🪙"), coinMin(n, [1, 5, 10, 25]), ["Use the biggest coins you can first.", "Take as many quarters as fit, then dimes, then nickels, then pennies. Count the coins.", ex([["Example: 41¢ = 1 quarter, 1 dime, 1 nickel, 1 penny = 4 coins. Now do yours.", 4], ["Example: 60¢ = 2 quarters + 1 dime = 3 coins. Now do yours.", 3]], coinMin(n, [1, 5, 10, 25]))]); }
    const n = ri(6, 12); return num(`In a game you only have tokens worth 1, 3 and 4 points. What is the fewest tokens that make exactly ${n} points?`, big("🎟️"), coinMin(n, [1, 3, 4]), ["Biggest first is a good start, but check whether another mix needs fewer tokens.", "Try using the 4s first, then try using some 3s instead. Compare the totals of tokens.", "Example: 6 points: 4 + 1 + 1 uses 3 tokens, but 3 + 3 uses only 2 tokens. Now do yours."]);
  };

  const shortRoute = () => {
    for (;;) {
      const nodes = "ABCDE".split(""), E = {};
      const add = (a, b) => { const k = [a, b].sort().join(""); if (!E[k]) E[k] = ri(1, 9); };
      for (let i = 0; i < 4; i++) add(nodes[i], nodes[i + 1]);
      for (let i = 0; i < 3; i++) { const a = pick(nodes), b = pick(nodes); if (a !== b) add(a, b); }
      const d = { A: 0, B: 1e9, C: 1e9, D: 1e9, E: 1e9 }, done = new Set();
      for (let r = 0; r < 5; r++) { let u = null; for (const n of nodes) if (!done.has(n) && (u === null || d[n] < d[u])) u = n; done.add(u); for (const k in E) if (k.includes(u)) { const v = k[0] === u ? k[1] : k[0]; d[v] = Math.min(d[v], d[u] + E[k]); } }
      const tg = pick(["D", "E"]), direct = E["A" + tg];
      if (Object.keys(E).length < 5 || direct === d[tg]) continue;
      return num(`Roads join some towns. The numbers are the length of each road in km:<br>${Object.keys(E).map(k => `${k[0]}–${k[1]}: ${E[k]}`).join(" &nbsp; ")}<br>What is the shortest way from A to ${tg}, in km?`, big("🗺️"), d[tg], ["Try the different routes from A. Write the total length of each.", "Add up the road lengths along each route and compare. Do not forget routes with 3 or 4 roads.", "Example: A–B 2, B–C 3, A–C 7. A to C direct is 7, but A–B–C is 2 + 3 = 5, which is shorter. Now do yours."]);
    }
  };

  const boatTrips = () => {
    const t = ri(0, 1);
    if (t === 0) {
      const k = ri(2, 4), n = ri(k + 2, k + 7), r = Math.ceil((n - k) / (k - 1)), ans = 2 * r + 1;
      return num(`A boat holds ${k} people. ${n} people want to cross a river. Someone has to bring the boat back each time, and only 1 person goes back. How many one-way trips (there and back count separately) are needed in all?`, big("🛶"), ans, ["After each trip across and one person coming back, how many more people are on the other side?", `Each “there and back” moves ${k - 1} more people for good. The last trip needs no return.`, "Example: boat holds 3, 5 people. Trip over (3), back (1), trip over (3): 3 trips and all 5 are across. Now do yours."]);
    }
    const k = ri(3, 8), n = ri(2, 9) * k + ri(1, k - 1);
    return num(`A ferry carries ${k} cars each trip across. ${n} cars are waiting. How many trips across are needed?`, big("⛴️"), Math.ceil(n / k), ["How many full loads can you make? Is there anything left over?", "Divide the cars by the size of a load. A part-load still needs a whole trip.", "Example: 17 cars, 5 per trip: 3 full trips carry 15, and the last 2 cars need a 4th trip. Now do yours."]);
  };

  const pages = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(12, 140); let c = 0; for (let i = 1; i <= n; i++) c += String(i).length; return num(`A book has ${n} pages numbered 1 to ${n}. How many digits are printed in all the page numbers together?`, big("📖"), c, ["Split the pages into groups: one-digit, two-digit and three-digit numbers.", "Pages 1 to 9 use 1 digit each. Pages 10 to 99 use 2 digits each. Pages from 100 use 3 each. Count the pages in each group.", "Example: pages 1 to 12. Pages 1-9 use 9 digits. Pages 10, 11, 12 use 6 digits. Total 15. Now do yours."]); }
    if (t === 1) { const n = ri(20, 70); let c = 0; for (let i = 1; i <= n; i++) if (String(i).includes("1")) c++; return num(`How many of the page numbers from 1 to ${n} have the digit 1 in them (like 1, 10, 21)?`, big("📖"), c, ["Check the ones place and the tens place separately.", "Count the numbers that end in 1. Then count the numbers where the tens digit is 1. Be careful not to count 11 twice.", "Example: from 1 to 30. Ending in 1: 1, 11, 21. Tens digit 1: 10 to 19 (that includes 11). Together that is 10 + 2 = 12 numbers. Now do yours."]); }
    const n = ri(30, 99); return num(`A book has ${n} pages numbered 1 to ${n}. How many pages have a two-digit page number?`, big("📖"), n - 9, ["Which page numbers have only one digit?", "Take away the one-digit pages from all the pages.", "Example: a book of 40 pages. 9 pages are one-digit, so 40 − 9 = 31 pages are two-digit. Now do yours."]);
  };

  const fracPuzzle = () => {
    const t = ri(0, 2);
    if (t === 0) { const b = pick([3, 4, 5, 6]), a = ri(1, b - 1), k = ri(2, 8), N = b * k; return num(`${a}/${b} of a number is ${a * k}. What is the number?`, big("🍕"), N, [`If ${a}/${b} of the number is ${a * k}, how big is one ${b === 3 ? "third" : "part"} of it?`, `Divide by the top number to find one part. The number is split into ${b} equal parts, so multiply by ${b}.`, "Example: 2/5 of a number is 8. One fifth is 4, so the whole number is 5 × 4 = 20. Now do yours."]); }
    if (t === 1) { const b = pick([3, 4, 5, 6]), a = ri(1, b - 2), k = ri(2, 8), N = b * k * ri(1, 3), left = N * (b - a) / b, [x] = names(1); return num(`${x} read ${a}/${b} of a book. ${left} pages are still left to read. How many pages does the whole book have?`, big("📖"), N, ["If a part is read, what fraction of the book is left?", "Work out the fraction that is left. Find the size of one part, then find the whole book.", "Example: Jo read 1/4 of a book and 15 pages are left. 3/4 is 15 pages, so 1/4 is 5 pages and the book has 20 pages. Now do yours."]); }
    const N = pick([12, 16, 20, 24, 36, 40]), f1 = 2, f2 = 4; return num(`Of ${N} kids, 1/${f1} like soccer, 1/${f2} like swimming, and the rest like chess. (Nobody likes two.) How many like chess?`, big("🧒"), N - N / f1 - N / f2, ["Find the number of kids in each group first.", "Work out half of the kids and a quarter of the kids. Take both away from the total.", "Example: 24 kids, 1/3 like cats, 1/6 like dogs. Cats: 8, dogs: 4. The rest: 24 − 12 = 12. Now do yours with the fractions in the question."]);
  };

  // ================= mixed and challenge =================
  const mixOf = (title, lessons, intro, listTitles) => {
    const f = () => pick(lessons).make();
    return L(title, f, [S("Review time!", "🔄", intro), S("Remember", "🧠", listTitles ? "This quiz has puzzles from: " + lessons.map(l => l.title).join(", ") + "." : "This quiz mixes puzzles from the whole level: number patterns, counting, logic and clue puzzles."), S("Tip", "💡", "Read every clue. Cross out answers that cannot be right. Check your answer before you tap.")]);
  };
  const finish = (lv, list) => {
    list.push(mixOf("Mixed practice", list.filter((_, i) => i % 3 === 0), "This lesson mixes puzzles you have learned in this level. Take your time.", true));
    list.push(mixOf(`Level ${lv} Challenge`, list.slice(0, 18), `Everything from level ${lv}. Think carefully, you can do it!`, false));
    return list;
  };

  const L10 = finish(10, [
    L("Triangular numbers", triNum, [S("Triangle of dots", "🔺", "1, 3, 6, 10, 15... are triangular numbers. Stack dots in rows of 1, 2, 3, 4 to see why."), S("Add them up", "➕", "The 4th triangular number is 1 + 2 + 3 + 4 = 10."), S("Pair trick", "💡", "Pair the first with the last, the second with the second to last. Every pair has the same total.")]),
    L("Add the last two", fibo, [S("A famous pattern", "🌀", "In this pattern each number is the sum of the two before it: 1, 1, 2, 3, 5, 8, 13..."), S("Missing numbers", "❓", "To find a hidden number, use subtraction to go backwards."), S("Tip", "💡", "Always check your answer by adding the two numbers before.")]),
    L("Palindromes", palin, [S("Mirror numbers", "🪞", "A palindrome reads the same forwards and backwards, like 121 or 4554."), S("Next one", "👉", "Copy the first digit to the end. If the number is too small, raise the middle."), S("Reverse and add", "🔁", "Add a number to its reverse. Many end up as palindromes!")]),
    L("Averages", average, [S("Fair share", "📊", "The average (mean) is what each number would be if everything was shared equally."), S("How to find it", "➗", "Add up all the numbers, then divide by how many there are."), S("Backwards", "🔙", "Total = average × how many numbers. Use this to find a missing number.")]),
    L("Median, mode and range", medMode, [S("Three kinds of middle", "📈", "Median = the middle number in order. Mode = the number that appears most. Range = biggest minus smallest."), S("Order first", "🔢", "Always sort the numbers from smallest to biggest before finding the median."), S("Example", "✏️", "3, 7, 7, 9, 12: median is 7, mode is 7, range is 12 − 3 = 9.")]),
    L("Area and perimeter riddles", areaPerim, [S("Two measures", "▭", "Perimeter is the distance all the way around. Area is how much space is inside."), S("Formulas", "🧮", "Area = length × width. Perimeter = 2 × (length + width)."), S("Riddles", "🔍", "Look for two numbers that multiply to the area and add up to half the perimeter.")]),
    L("Order of operations", orderOps, [S("The rules", "📏", "Brackets first. Then × and ÷. Then + and −, left to right."), S("Example", "🧮", "3 + 4 × 2 = 3 + 8 = 11, but (3 + 4) × 2 = 14."), S("Brackets change things", "🔁", "Moving the brackets can change the answer a lot.")]),
    L("Cuts and pieces", cuts, [S("Cut it", "✂️", "1 cut makes 2 pieces. 2 cuts make 3 pieces."), S("The rule", "📏", "The number of cuts is one less than the number of pieces."), S("Time", "⏱️", "If each cut takes the same time, multiply the number of cuts by the time for one cut.")]),
    L("Speed, distance and time", speed, [S("Three partners", "🚗", "Distance = speed × time. Time = distance ÷ speed. Speed = distance ÷ time."), S("Meeting", "🚶🚶", "When two people walk toward each other, add their speeds to see how fast the gap closes."), S("Tip", "💡", "Check that the units match: km with km per hour.")]),
    L("Same rate, bigger job", rates, [S("Unit rate", "1️⃣", "Find the amount for ONE first (one pencil, one minute, one person)."), S("Scale up", "📈", "Then multiply by the new number."), S("Careful!", "⚠️", "If all machines work at the same time, more machines does not mean more time.")]),
    L("Counting squares and rectangles", countSq, [S("Many sizes", "🟦", "A grid hides squares of many sizes, not just the small ones."), S("Count by size", "🔢", "Count the 1 by 1 squares, then 2 by 2, then 3 by 3, and add."), S("Rectangles", "▭", "A strip of n squares has n + (n−1) + ... + 1 rectangles.")]),
    L("Mirror images", mirror, [S("Flip", "🪞", "A mirror makes a flipped copy. Each point is the same distance on the other side."), S("Mirror line", "📏", "For an up-and-down line, only the across number changes."), S("Letters", "🔤", "H, A, M and O look the same in a side mirror. F and R do not.")]),
    L("Twenty questions", twenty, [S("Yes or no", "❓", "A yes/no question can cut the list of possible numbers in half."), S("Halving", "✂️", "From 1 to 16: ask “bigger than 8?” and you are left with 8 numbers. Keep halving."), S("Counting questions", "🔢", "q questions can tell apart 2 × 2 × ... (q times) numbers.")]),
    L("Coin combinations", coinCombos, [S("Coins", "🪙", "Penny 1¢, nickel 5¢, dime 10¢, quarter 25¢."), S("List it", "📝", "To count ways, go in order: use the most big coins, then fewer and fewer."), S("Fewest coins", "🏆", "Biggest coin first is usually best, but check for tricks with odd coin values.")]),
    L("Shortest route", shortRoute, [S("A map", "🗺️", "The numbers on roads are their lengths. A route is a list of roads."), S("Add them", "➕", "Add the lengths along each route."), S("Compare", "⚖️", "The shortest route is not always the one with the fewest roads.")]),
    L("Boats and ferries", boatTrips, [S("Trips", "🛶", "Count the trips across and the trips back."), S("Back trips", "↩️", "If someone must bring the boat back, that is a trip too."), S("Last trip", "🏁", "The very last trip needs no return.")]),
    L("Page numbers", pages, [S("Digits", "📖", "Pages 1 to 9 use one digit each. Pages 10 to 99 use two digits each."), S("Group it", "🧺", "Count the pages in each group, multiply by the digits, and add."), S("Tip", "💡", "Be careful at the edges, like 9 and 10 or 99 and 100.")]),
    L("Fractions of a number", fracPuzzle, [S("Parts", "🍕", "1/4 of a number means splitting it into 4 equal parts and taking 1 part."), S("Find one part", "1️⃣", "If 3/4 is 12, then 1/4 is 12 ÷ 3 = 4."), S("Find the whole", "🔙", "Multiply one part by the bottom number to get the whole.")])
  ]);

  // ======================= LEVEL 11 =======================
  const anyTerm = () => {
    const a = ri(2, 9), d = ri(2, 9), first = [0, 1, 2, 3].map(i => a + d * i).join(", ") + ", ...", t = ri(0, 2);
    if (t === 0) { const n = ri(20, 60), ans = a + d * (n - 1); return num(`A pattern goes ${first} What is the ${n}th number?`, big("📈"), ans, ["Find how much is added each step.", `From the 1st number to the ${n}th number there are ${n - 1} jumps. Multiply the jump by the number of jumps, then add the first number.`, "Example: 5, 8, 11, ... The 10th number is 5 + 9 × 3 = 32 (9 jumps of 3). Now do yours."]); }
    if (t === 1) { const n = ri(15, 50), v = a + d * (n - 1); return num(`A pattern goes ${first} Which place in the pattern holds the number ${v}? (The 1st place is ${a}.)`, big("📈"), n, ["Find how much is added each step.", "Take away the first number, then see how many jumps fit. The place number is one more than the number of jumps.", "Example: 4, 7, 10, ... Which place holds 31? 31 − 4 = 27, and 27 ÷ 3 = 9 jumps, so it is the 10th place. Now do yours."]); }
    const yes = Math.random() < 0.5, x = yes ? a + d * ri(12, 40) : a + d * ri(12, 40) + ri(1, d - 1);
    return mcq(`The pattern goes ${first} Will the number ${x} appear in it?`, big("📈"), yes ? "Yes" : "No", ["Yes", "No"], ["Every number in the pattern is the first number plus a whole number of jumps.", "Take the first number away. Does the jump size divide that exactly?", "Example: 3, 8, 13, ... Is 53 in it? 53 − 3 = 50 and 50 ÷ 5 = 10 exactly, so yes. Is 54? 51 ÷ 5 is not a whole number, so no. Now do yours."]);
  };

  const ratio = () => {
    const t = ri(0, 3), [what, p1, p2] = pick([["paint", "red", "white"], ["juice drink", "juice", "water"], ["concrete mix", "sand", "cement"], ["fruit salad", "apples", "grapes"]]);
    const a = ri(1, 5), b = ri(2, 6); if (a === b) return ratio();
    const k = ri(2, 8);
    if (t === 0) { const which = Math.random() < 0.5; return num(`A ${what} mix uses ${p1} and ${p2} in the ratio ${a}:${b}. You make ${k * (a + b)} cups in all. How many cups of ${which ? p1 : p2}?`, big("🥣"), k * (which ? a : b), ["The ratio says how many equal parts of each. How many parts in all?", "Add the parts of the ratio. Divide the total by that to find the size of one part.", "Example: ratio 2:3 with 20 cups. 5 parts, so 1 part = 4 cups. The first ingredient is 2 parts = 8 cups. Now do yours."]); }
    if (t === 1) return num(`The ratio of boys to girls in a club is ${a}:${b}. There are ${k * a} boys. How many girls are there?`, big("👦👧"), k * b, ["How many boys does one part stand for?", "Divide the boys by the boys' part of the ratio. Then multiply by the girls' part.", "Example: ratio 3:2 and 12 boys. One part = 4. Girls = 2 × 4 = 8. Now do yours."]);
    if (t === 2) return num(`${k * (a + b)} dollars is shared between two kids in the ratio ${a}:${b}. How many dollars does the kid with the bigger share get?`, big("💵"), k * Math.max(a, b), ["Add the numbers in the ratio to see how many parts there are.", "Divide the money by the number of parts. The bigger share has more parts.", "Example: $30 shared 1:4. 5 parts, so 1 part = $6 and the bigger share is 4 × 6 = $24. Now do yours."]);
    return num(`The ratio of cats to dogs at a shelter is ${a}:${b}. There are ${k * (a + b)} animals. How many MORE of the bigger group than the smaller group are there?`, big("🐱🐶"), k * Math.abs(a - b), ["First find how many animals one part stands for.", "The difference in parts times the size of one part is the difference in animals.", "Example: ratio 2:5 and 28 animals. 7 parts, 1 part = 4. The difference is 3 parts = 12. Now do yours."]);
  };

  const coinFlips = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(2, 7); return num(`You flip a coin ${n} times and write down heads or tails each time. How many different results (sequences) are possible?`, big("🪙"), 2 ** n, ["How many choices for the first flip? And for the second?", "Each flip doubles the number of possible results.", "Example: 3 flips: 2 × 2 × 2 = 8 results. Now do yours."]); }
    if (t === 1) { const n = ri(3, 5), k = ri(1, 2); return num(`You flip a coin ${n} times. In how many of the possible results do you get exactly ${k} head${k > 1 ? "s" : ""}?`, big("🪙"), comb(n, k), ["Think of the flips as places in a row. Which places are heads?", "Count the ways to choose which flips are heads. For 1 head, pick one place. For 2 heads, pick two places.", "Example: 4 flips, exactly 1 head: the head can be 1st, 2nd, 3rd or 4th, so 4 results. Now do yours."]); }
    if (t === 2) { const n = ri(2, 6); return num(`You flip a coin ${n} times. In how many of the possible results do you get at least one head?`, big("🪙"), 2 ** n - 1, ["Count all the results. Then think about the results with NO heads at all.", "There is only one result with no heads (all tails). Take it away from all the results.", "Example: 3 flips: 8 results, 1 has no heads, so 7 have at least one head. Now do yours."]); }
    const s = ri(3, 8), c = ri(1, 4); return num(`You spin a spinner with ${s} equal sections and flip ${c} coin${c > 1 ? "s" : ""}. How many different outcomes are possible?`, big("🎡🪙"), s * 2 ** c, ["Count the outcomes for the spinner, then for the coins.", "Multiply the spinner outcomes by the coin outcomes (each coin has 2).", "Example: a 4-section spinner and 2 coins: 4 × 2 × 2 = 16. Now do yours."]);
  };

  const teams = () => {
    const n = ri(5, 8), t = ri(0, 3), th = pick(["friends", "kids", "players"]);
    if (t === 0) return num(`Choose a team of 2 from ${n} ${th}. How many different teams are possible? (The order does not matter.)`, big("👥"), comb(n, 2), ["Pick the first person: how many ways? Then the second?", "Multiplying counts each team twice (A then B, and B then A). Divide by 2.", "Example: teams of 2 from 5: 5 × 4 = 20, divided by 2 is 10 teams. Now do yours."]);
    if (t === 1) { const k = ri(5, 7); return num(`Choose a team of 3 from ${k} ${th}. How many different teams are possible?`, big("👥"), comb(k, 3), ["Pick 3 in order first. Each team is counted several times.", "Multiply the choices for 3 picks. Each team can be ordered 6 ways (3 × 2 × 1), so divide by 6.", "Example: 3 from 5: 5 × 4 × 3 = 60 and 60 ÷ 6 = 10 teams. Now do yours."]); }
    if (t === 2) return num(`From ${n} ${th}, choose a captain and a different vice-captain. In how many ways can you do this?`, big("👑"), n * (n - 1), ["The two jobs are different, so the order matters.", "Choose the captain, then choose the vice-captain from those who are left. Multiply.", "Example: 5 players: 5 × 4 = 20 ways. Now do yours."]);
    return num(`${n} ${th} are in a club. How many teams of 2 can be made that do NOT include Mia? (Mia is one of the ${n}.)`, big("👥"), comb(n - 1, 2), ["Take Mia out of the group first.", "Count the teams of 2 from the people who are left.", "Example: 6 people, without Mia: 5 left. Teams of 2 from 5: 10. Now do yours."]);
  };

  const venn3 = () => {
    const r = Array.from({ length: 7 }, () => ri(1, 6)), ne = ri(1, 6), [a, b, c] = pick([["soccer", "chess", "art"], ["cats", "dogs", "fish"], ["pizza", "pasta", "rice"]]);
    const [oa, ob, oc, ab, ac, bc, abc] = r, N = r.reduce((x, y) => x + y, 0) + ne, t = ri(0, 1);
    const info = `${N} kids: only ${a}: ${oa}, only ${b}: ${ob}, only ${c}: ${oc}; ${a} and ${b} but not ${c}: ${ab}; ${a} and ${c} but not ${b}: ${ac}; ${b} and ${c} but not ${a}: ${bc}; all three: ${abc}.`;
    if (t === 0) { const which = ri(0, 2), tot = [oa + ab + ac + abc, ob + ab + bc + abc, oc + ac + bc + abc][which]; return num(`${info} How many kids like ${[a, b, c][which]} in all?`, big("⭕⭕⭕"), tot, ["Draw three overlapping circles and put the numbers in.", "The kids who like it are in its circle: the 'only' part, the two-way overlaps that include it, and the middle.", "Example: only A: 3; A and B: 2; A and C: 1; all three: 2. A in all: 3 + 2 + 1 + 2 = 8. Now do yours."]); }
    return num(`${info} How many kids like none of them? (Hint: the numbers add up to ${N} in all, including the kids who like none.)`, big("⭕⭕⭕"), ne, ["Add up all the kids in the circles.", "Add the seven numbers for the regions inside the circles. The kids left over are outside.", "Example: 20 kids and the circles hold 17. Then 20 − 17 = 3 kids are outside. Now do yours."]);
  };

  const fourSus = () => {
    for (;;) {
      const w = names(4), st = w.map((_, i) => { const j = ri(0, 3); let k = ri(0, 3); while (k === j) k = ri(0, 3); return { ty: pick(["is", "not", "or"]), j, k }; }), kk = pick([1, 2]);
      const tr = (s, c) => (s.ty === "is" ? c === s.j : s.ty === "not" ? c !== s.j : c === s.j || c === s.k);
      const ok = [0, 1, 2, 3].filter(c => st.filter(s => tr(s, c)).length === kk);
      if (ok.length !== 1) continue;
      const nm = (j, i) => (j === i ? "me" : w[j]);
      const lines = st.map((s, i) => `${w[i]}: “${s.ty === "is" ? `It was ${nm(s.j, i)}.` : s.ty === "not" ? `It was not ${nm(s.j, i)}.` : `It was ${nm(s.j, i)} or ${nm(s.k, i)}.`}”`);
      return mcq(`One of four kids broke the window. Exactly ${kk === 1 ? "one" : "two"} of the four kids ${kk === 1 ? "is" : "are"} telling the truth.<br>${lines.join("<br>")}<br>Who broke it?`, big("🪟"), w[ok[0]], w, ["Try each kid as the one who did it, one at a time.", `For each guess, count how many statements are true. Only one guess gives exactly ${kk === 1 ? "one" : "two"} true statements.`, "Example: A: “It was B.” B: “It was not B.” C: “It was A or C.” Exactly one is true. If B did it: A true, B false, C false: one true. So B. Check A: A false, B true, C true: two true, not A. Now do yours."]);
    }
  };

  const roundRobin = () => {
    const t = ri(0, 3), n = ri(4, 10);
    if (t === 0) return num(`${n} teams play in a league. Every team plays every other team once. How many games are played in all?`, big("🏆"), comb(n, 2), ["The first team plays all the other teams. How many games is that?", "The next team has already played the first. Keep adding one fewer each time.", "Example: 4 teams: 3 + 2 + 1 = 6 games. Now do yours."]);
    if (t === 1) return num(`${n} teams play in a league. Every team plays every other team twice (once at home, once away). How many games are there in all?`, big("🏆"), n * (n - 1), ["First count the games if each pair played only once.", "Each pair plays twice, so double it. Or: each team plays one fewer team than all, twice.", "Example: 4 teams, twice: 6 pairs × 2 = 12 games. Now do yours."]);
    if (t === 2) { const m = ri(2, 6) * 2; return num(`${m} teams play a league where every team plays one game in every round and meets every other team once. How many rounds are there?`, big("🏆"), m - 1, ["Each team must play all the other teams, one game per round.", "How many other teams does each team need to meet?", "Example: 6 teams: each plays 5 others, so 5 rounds. Now do yours."]); }
    const m = pick([4, 8, 16, 32, 6, 10, 12]); return num(`${m} teams play a knockout cup: the loser of each game is out. How many games are played until there is one winner?`, big("🏅"), m - 1, ["Every game knocks out exactly one team.", "How many teams must be knocked out so that only the winner is left?", "Example: 8 teams: 7 teams must lose, so 7 games. Now do yours."]);
  };

  const gridSums = () => {
    const g = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ri(1, 9))), rs = g.map(r => r.reduce((a, b) => a + b, 0)), cs = [0, 1, 2].map(c => g[0][c] + g[1][c] + g[2][c]), t = ri(0, 1);
    const rows = g.map((r, i) => [...r, `<b>${rs[i]}</b>`]);
    rows.push([...cs.map(c => `<b>${c}</b>`), `<b>${rs.reduce((a, b) => a + b, 0)}</b>`]);
    if (t === 0) { const r = ri(0, 2), c = ri(0, 2), ans = g[r][c]; rows[r][c] = "❓"; return num("The bold numbers are the totals of each row and column. What number is the ❓?", tbl(rows), ans, ["Look at the row (or the column) that has the ❓. Its total is in bold.", "Add the other numbers in that row and take them away from the row total.", "Example: a row has 4, ❓, 5 and its total is 15. 4 + 5 = 9, and 15 − 9 = 6. Now do yours."]); }
    const r1 = ri(0, 1), r2 = r1 + 1 + ri(0, 1) * (r1 === 0 ? 1 : 0), c1 = ri(0, 2); let c2 = ri(0, 2); while (c2 === c1) c2 = ri(0, 2);
    const ans = g[r1][c1] + g[r2][c2]; rows[r1][c1] = "❓"; rows[r2][c2] = "❓";
    return num("The bold numbers are the totals of each row and column. Two cells show ❓. What do the two ❓ numbers add up to?", tbl(rows), ans, ["Each ❓ is in a different row. Find each one using its row total.", "For each ❓: add the other numbers in its row and take that from the row total. Then add the two answers.", "Example: row 1 is 3, ❓, 2 with total 9 (❓ = 4). Row 2 is ❓, 5, 1 with total 10 (❓ = 4). They add to 8. Now do yours."]);
  };

  const digitSwap = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 9), b = ri(1, 9); return num(`AB is a two-digit number (A tens, B ones) and BA is the number with its digits swapped. AB + BA = ${11 * (a + b)}. What is A + B?`, big("🔀"), a + b, ["Write AB as 10 × A + B and BA as 10 × B + A.", "Add them: you get 11 groups of A and 11 groups of B. So divide the total by 11.", "Example: 53 + 35 = 88 = 11 × 8, and 5 + 3 = 8. Now do yours."]); }
    if (t === 1) { const a = ri(2, 9), b = ri(0, a - 1); return num(`AB is a two-digit number (A tens, B ones) and BA is its digits swapped. AB − BA = ${9 * (a - b)}. What is A − B?`, big("🔀"), a - b, ["Write AB as 10 × A + B and BA as 10 × B + A, then subtract.", "The difference is 9 groups of (A − B). Divide by 9.", "Example: 82 − 28 = 54 = 9 × 6, and 8 − 2 = 6. Now do yours."]); }
    const a = ri(2, 9), b = ri(0, a - 1), s = a + b, d = a - b; if ((s + d) % 2) return digitSwap();
    return num(`A two-digit number has digits that add up to ${s}. The tens digit is ${d} bigger than the ones digit. What is the number?`, big("🔢"), a * 10 + b, ["Call the digits tens and ones. You know their sum and their difference.", "Take away the difference from the sum, then halve: that gives the smaller digit. Then find the bigger digit.", "Example: digit sum 9 and the tens digit is 3 more. 9 − 3 = 6, half is 3 (ones digit), tens digit 6. The number is 63. Now do yours."]);
  };

  const clockAngle = () => {
    const t = ri(0, 2);
    if (t === 0) { const h = ri(1, 11), d = Math.abs(30 * h), ang = Math.min(d, 360 - d); return num(`What is the angle in degrees between the two hands of a clock at ${h} o'clock? (Give the smaller angle.)`, big("🕰️"), ang, ["A full clock is 360 degrees. There are 12 numbers around it.", "The space between two neighbouring numbers is 30 degrees. Count how many number gaps lie between the hands, and if it is more than 6, go the other way.", "Example: at 4 o'clock there are 4 gaps of 30 degrees, so 120 degrees. Now do yours."]); }
    if (t === 1) { const m = ri(2, 25); return num(`How many degrees does the minute hand turn in ${m} minutes?`, big("🕰️"), 6 * m, ["In 60 minutes the minute hand makes a full turn of 360 degrees.", "Find the degrees for 1 minute (360 ÷ 60), then multiply.", "Example: in 10 minutes it turns 10 × 6 = 60 degrees. Now do yours."]); }
    const hr = ri(1, 11), d = Math.abs(30 * hr + 15 - 180), ang = Math.min(d, 360 - d);
    return num(`What is the smaller angle in degrees between the hands at half past ${hr} (${hr}:30)? Remember the hour hand moves a little by 30 minutes.`, big("🕰️"), ang, ["At half past, the minute hand points straight down at the 6. The hour hand is halfway between two numbers.", "Count the 30-degree gaps from the hour hand to the 6, including the half gap (15 degrees).", "Example: at 3:30 the hour hand is 2.5 gaps from the 6: 2.5 × 30 = 75 degrees. Now do yours."]);
  };

  const paintedCube = () => {
    const n = ri(3, 6), t = ri(0, 3);
    const pre = `A ${n} by ${n} by ${n} cube is painted on the outside, then cut into small 1 by 1 by 1 cubes. `;
    if (t === 0) return num(pre + "How many small cubes have exactly 3 painted faces?", big("🧊"), 8, ["Which small cubes touch three outside faces at once?", "They sit at the corners of the big cube. How many corners does a cube have?", "Example: in a 4 by 4 by 4 cube, the corners have 3 painted faces. Count the corners. Now do yours."]);
    if (t === 1) return num(pre + "How many small cubes have exactly 2 painted faces?", big("🧊"), 12 * (n - 2), ["These are on the edges, but not at the corners.", `A cube has 12 edges. On each edge, take away the 2 corner cubes and count the cubes that are left. Then multiply by 12.`, "Example: in a 4 by 4 by 4 cube each edge has 4 − 2 = 2 middle cubes, so 12 × 2 = 24. Now do yours."]);
    if (t === 2) return num(pre + "How many small cubes have exactly 1 painted face?", big("🧊"), 6 * (n - 2) ** 2, ["These are in the middle of a face, away from the edges.", "On one face, take away the outer ring: what is left is a smaller square. Count it, then multiply by 6 faces.", "Example: in a 4 by 4 by 4 cube the middle of each face is 2 by 2 = 4, so 6 × 4 = 24. Now do yours."]);
    return num(pre + "How many small cubes have NO paint at all?", big("🧊"), (n - 2) ** 3, ["These are hidden inside, with no face on the outside.", "Peel off the outside layer. A smaller cube is left. How long is its side?", "Example: in a 4 by 4 by 4 cube the inside is 2 by 2 by 2 = 8. Now do yours."]);
  };

  const pizzaCuts = () => {
    const t = ri(0, 2), k = ri(2, 7);
    if (t === 0) return num(`You cut a round pizza with ${k} straight cuts. What is the MOST pieces you can make? (Cuts can cross each other anywhere.)`, big("🍕"), T(k) + 1, ["Start small: 1 cut gives 2 pieces. 2 cuts crossing give 4 pieces. What about 3?", "Each new cut can cross all the old cuts, and gets split into one more part than the cuts it crosses. Each part adds a piece.", "Example: the pieces for 1, 2, 3, 4 cuts are 2, 4, 7, 11. The extra pieces added are 2, 3, 4... Now work out yours."]);
    if (t === 1) return num(`You make ${k} straight cuts that ALL go through the middle of a round pizza (a different direction each time). How many pieces are there?`, big("🍕"), 2 * k, ["With 1 cut through the middle you get 2 pieces. With 2 cuts you get 4.", "Each cut through the middle adds 2 pieces.", "Example: 3 cuts through the middle make 6 pieces (like a pizza cut into sixths). Now do yours."]);
    return num(`You cut a rectangular cake with ${k} cuts that are all parallel (they never cross). How many pieces do you get?`, big("🍰"), k + 1, ["Cut it once: 2 pieces. Cut again in parallel: how many?", "Each parallel cut adds one more piece.", "Example: 4 parallel cuts make 5 pieces. Now do yours."]);
  };

  const jugBFS = (a, b, t) => {
    const seen = new Set(["0,0"]); let q = [[0, 0, 0]];
    while (q.length) {
      const nq = [];
      for (const [x, y, d] of q) {
        if (x === t || y === t) return d;
        const p = Math.min(x, b - y), p2 = Math.min(y, a - x);
        for (const [nx, ny] of [[a, y], [x, b], [0, y], [x, 0], [x - p, y + p], [x + p2, y - p2]]) { const k = nx + "," + ny; if (!seen.has(k)) { seen.add(k); nq.push([nx, ny, d + 1]); } }
      }
      q = nq;
    }
    return -1;
  };
  const JUGS = [];
  [[3, 5], [3, 7], [4, 7], [5, 7], [5, 8], [3, 8], [4, 9], [5, 9]].forEach(([a, b]) => { for (let t = 1; t < b; t++) if (t !== a) { const d = jugBFS(a, b, t); if (d > 1 && d <= 10) JUGS.push([a, b, t, d]); } });
  const jugs = () => {
    const [a, b, t, d] = pick(JUGS);
    return num(`You have a ${a}-liter jug and a ${b}-liter jug (no markings) and plenty of water. You want exactly ${t} liters in one of the jugs. A step is: fill a jug, empty a jug, or pour one into the other until it is empty or the other is full. What is the fewest number of steps?`, big("🫗"), d, ["Try filling the big jug and pouring into the small one. Write down how much is in each jug after each step.", "Keep a list of the pair (small jug, big jug) after every step. Try the different pours and look for the amount you want.", ex([["Example: jugs of 2 and 5 liters, get 1 liter. Fill the 5 (0,5). Pour into the 2: (2,3). Empty the 2: (0,3). Pour into the 2: (2,1). The 5-liter jug has 1 liter after 4 steps. Now do yours.", 4], ["Example: jugs of 2 and 3 liters, get 1 liter. Fill the 3 (0,3). Pour into the 2: (2,1). That is 2 steps. Now do yours.", 2]], d)]);
  };

  const lastDigit = () => {
    const t = ri(0, 1);
    if (t === 0) { const b = pick([2, 3, 4, 7, 8, 9]), n = ri(10, 60); let v = 1; for (let i = 0; i < n; i++) v = (v * b) % 10; return num(`What is the last digit of ${b}<sup>${n}</sup>? (That is ${b} multiplied by itself ${n} times.)`, big("🔟"), v, ["You do not need the whole number. Only the last digit matters when you multiply.", "Find the last digit of the first few powers. The last digits repeat in a cycle. Use the cycle to reach the power you need.", "Example: 2, 4, 8, 16, 32 end in 2, 4, 8, 6, 2. The cycle has 4 numbers, so 2<sup>9</sup> is the same as the first of the next cycle (9 = 4 + 4 + 1): last digit 2. Now do yours."]); }
    const a = ri(11, 99), b = ri(11, 99), c = ri(11, 99), r = ((a % 10) * (b % 10) * (c % 10)) % 10;
    return num(`What is the last digit of ${a} × ${b} × ${c}?`, big("🔟"), r, ["Only the last digits matter for the last digit of a product.", "Multiply just the last digits together, and keep only the last digit of each result.", "Example: 23 × 47 × 15. 3 × 7 = 21 (last digit 1), 1 × 5 = 5. The last digit is 5. Now do yours."]);
  };

  const sumProd = () => {
    const a = ri(2, 12), b = ri(2, 12); if (a === b) return sumProd();
    const lo = Math.min(a, b), hi = Math.max(a, b), t = ri(0, 2);
    const hh = ["Think about pairs of numbers that multiply to the product.", "List the pairs of factors of the product. Which pair also adds up to the sum?", "Example: sum 9 and product 20. The pairs for 20 are 1×20, 2×10, 4×5. 4 + 5 = 9, so the numbers are 4 and 5. Now do yours."];
    if (t === 0) return num(`Two different numbers add up to ${a + b} and multiply to ${a * b}. What is the bigger number?`, big("➕✖️"), hi, hh);
    if (t === 1) return num(`Two different numbers add up to ${a + b} and multiply to ${a * b}. What is the smaller number?`, big("➕✖️"), lo, hh);
    return mcq(`Which pair of numbers adds up to ${a + b} and multiplies to ${a * b}?`, big("➕✖️"), `${lo} and ${hi}`, [`${lo + 1} and ${hi - 1}`, `${lo - 1 || 1} and ${hi + 1}`, `${lo} and ${hi + 1}`, `${lo + 2} and ${hi - 2}`], ["Check the sum and the product for each pair.", "Add the two numbers in a pair to see if it matches the sum. Then multiply to check the product.", "Example: Which pair adds to 10 and multiplies to 21? 3 and 7: 3 + 7 = 10 and 3 × 7 = 21. Yes! Now do yours."]);
  };

  const countMult = () => {
    const t = ri(0, 2), m = ri(3, 9);
    if (t === 0) { const lo = ri(10, 80), hi = lo + ri(40, 150); return num(`How many multiples of ${m} are there from ${lo} to ${hi}? (Include ${lo} and ${hi} if they are multiples.)`, big("🔢"), Math.floor(hi / m) - Math.floor((lo - 1) / m), [`Count the multiples of ${m} up to ${hi}, then take away the ones below ${lo}.`, "To count the multiples up to a number, divide the number by the step and drop the remainder. Do this for the top number and for the number just before the start.", "Example: multiples of 4 from 10 to 30. Up to 30: 7. Up to 9: 2. So 7 − 2 = 5 (12, 16, 20, 24, 28). Now do yours."]); }
    if (t === 1) { const N = ri(40, 200); return num(`How many numbers from 1 to ${N} are NOT multiples of ${m}?`, big("🔢"), N - Math.floor(N / m), ["First count the multiples. Then take them from the total.", `Divide ${N} by ${m} and drop the remainder to count the multiples. Subtract from ${N}.`, "Example: 1 to 30, not multiples of 4: there are 7 multiples (30 ÷ 4 = 7 r 2), so 30 − 7 = 23. Now do yours."]); }
    const k = pick([2, 3, 4, 5, 6].filter(x => x !== m)), N = ri(60, 300); return num(`How many numbers from 1 to ${N} are multiples of BOTH ${m} and ${k}?`, big("🔢"), Math.floor(N / lcm(m, k)), [`A number that is a multiple of both is a multiple of their smallest common multiple.`, `Find the smallest number that both ${m} and ${k} divide into. Then count its multiples up to ${N}.`, "Example: both 4 and 6, up to 50. The smallest common multiple is 12. 50 ÷ 12 = 4 r 2, so 4 numbers. Now do yours."]);
  };

  const spinChance = () => {
    if (Math.random() < 0.6) {
      const n = pick([8, 10, 12]), isP = x => x > 1 && Array.from({ length: x - 2 }, (_, i) => i + 2).every(d => x % d);
      const [txt, f] = pick([["a multiple of 3", x => x % 3 === 0], ["bigger than 7", x => x > 7], ["a prime number", isP], ["NOT a multiple of 4", x => x % 4], ["an even number bigger than 4", x => x % 2 === 0 && x > 4]]);
      const c = Array.from({ length: n }, (_, i) => i + 1).filter(f).length;
      if (c < 1 || c >= n) return spinChance();
      return mcq(`A spinner has ${n} equal sections numbered 1 to ${n}. What is the chance of landing on ${txt}? (Give it as a simplified fraction.)`, big("🎡"), fr(c, n), [fr(n - c, n), fr(Math.min(c + 1, n - 1), n), fr(c, n + 2), fr(Math.max(c - 1, 1), n)], ["Count the sections that fit the rule.", "The chance is (sections that fit) out of (all sections). Then make the fraction as small as you can.", "Example: a spinner 1 to 10, chance of a multiple of 5: 2 out of 10, which is 1/5. Now do yours."]);
    }
    const r = ri(2, 6), g = ri(2, 6), b = ri(2, 6), n = r + g + b, [name, cnt] = pick([["red", r], ["green", g], ["blue", b]]);
    const non = n - cnt; if (non === 0) return spinChance();
    return mcq(`A bag has ${r} red, ${g} green and ${b} blue marbles. You pick one without looking. What is the chance it is NOT ${name}? (Give it as a simplified fraction.)`, big("🔴🟢🔵"), fr(non, n), [fr(cnt, n), fr(non, n - 1), fr(non + 1, n), fr(cnt, non)], ["Count the marbles that are not that color.", "The chance is (marbles that fit) out of (all marbles). Then simplify.", "Example: 3 red, 2 green, 5 blue. Chance of not blue: 5 out of 10 = 1/2. Now do yours."]);
  };

  const workTogether = () => {
    if (Math.random() < 0.6) {
      const [a, b, t] = pick([[6, 3, 2], [4, 12, 3], [6, 12, 4], [10, 15, 6], [12, 12, 6], [4, 4, 2], [20, 30, 12], [15, 10, 6], [3, 6, 2], [12, 4, 3], [30, 20, 12], [9, 18, 6]]);
      return num(`Ava can paint a fence alone in ${a} hours. Ben can paint the same fence alone in ${b} hours. If they work together, how many hours does it take?`, big("🖌️"), t, ["Imagine the fence is made of a number of equal sections that both times divide into.", "Find how many sections each person paints in one hour. Add them, then see how many hours the whole fence takes.", ex([["Example: Jo takes 6 hours and Al takes 3. Use 6 sections. Jo does 1 an hour, Al does 2. Together 3 an hour: 6 ÷ 3 = 2 hours. Now do yours.", 2], ["Example: Jo takes 4 hours and Al takes 12. Use 12 sections. Jo does 3 an hour, Al does 1. Together 4 an hour: 12 ÷ 4 = 3 hours. Now do yours.", 3]], t)]);
    }
    const p1 = ri(2, 6), d = ri(2, 12), cand = [];
    for (let p2 = 1; p2 <= p1 * d; p2++) if ((p1 * d) % p2 === 0 && p2 !== p1 && p2 <= 12) cand.push(p2);
    if (!cand.length) return workTogether();
    const p2 = pick(cand), ans = p1 * d / p2;
    return num(`${p1} painters finish a job in ${d} days. They all work at the same speed. How many days would ${p2} painter${p2 > 1 ? "s" : ""} need?`, big("🖌️"), ans, [`Find the total painter-days in the job (people times days).`, "Multiply the painters by the days to get the total work. Then divide by the new number of painters.", "Example: 4 painters take 6 days: 24 painter-days. 3 painters need 24 ÷ 3 = 8 days. Now do yours."]);
  };

  const L11 = finish(11, [
    L("Any place in a pattern", anyTerm, [S("Add the same each time", "📈", "In 4, 7, 10, 13... the jump is 3 every time."), S("The nth number", "🔢", "To reach the 10th number, take 9 jumps from the first. Number = first + jumps × jump size."), S("Going backwards", "🔙", "Take away the first number, divide by the jump, and add 1 to find the place.")]),
    L("Ratios", ratio, [S("Parts", "🥣", "A ratio like 2:3 means 2 parts of one thing for every 3 parts of another."), S("One part", "1️⃣", "Add the parts, divide the total by that to find one part."), S("Scale", "📏", "Multiply the one part by each ratio number.")]),
    L("Coin flips and choices", coinFlips, [S("Doubling", "🪙", "Each coin flip has 2 results, so each new flip doubles the number of results."), S("Choosing places", "📍", "To get exactly 1 head in 3 flips, the head can be first, second or third."), S("At least one", "☝️", "Count everything, then take away the case with none.")]),
    L("Picking teams", teams, [S("Order matters or not", "👥", "A team is the same whichever order you pick the people. A captain and vice-captain are different jobs."), S("Pick then fix", "✖️", "Multiply the choices, then divide by how many orders were counted twice."), S("Example", "✏️", "Teams of 2 from 5: 5 × 4 ÷ 2 = 10.")]),
    L("Venn with three circles", venn3, [S("Three circles", "⭕⭕⭕", "Three overlapping circles make 7 regions inside, and the area outside."), S("In a circle", "☝️", "A circle holds its 'only' part, its two overlaps and the middle."), S("Add carefully", "➕", "Add all seven regions to find the kids in at least one circle.")]),
    L("Four suspects", fourSus, [S("Statements", "🗣️", "Some statements say 'it was X', some say 'it was not X', and some say 'X or Y'."), S("Test a guess", "🔬", "Pretend each kid did it and count the true statements."), S("Match the rule", "✅", "Only one guess matches 'exactly one (or two) are telling the truth'.")]),
    L("Leagues and cups", roundRobin, [S("Every pair once", "🏆", "With 5 teams: 4 + 3 + 2 + 1 = 10 games."), S("Home and away", "🏠", "If every pair plays twice, double the games."), S("Knockout", "🏅", "Each game knocks out one team, so you need one fewer game than teams.")]),
    L("Totals in tables", gridSums, [S("Row and column totals", "📋", "The bold numbers are totals of the row or column next to them."), S("Find a missing cell", "❓", "Add the numbers you can see in the row and take them away from the total."), S("Check", "✅", "The row totals add up to the same grand total as the column totals.")]),
    L("Digit swaps", digitSwap, [S("Digits and value", "🔢", "A two-digit number AB is 10 × A + B."), S("Swap", "🔀", "AB + BA = 11 × (A + B). And AB − BA = 9 × (A − B)."), S("Find the digits", "🔍", "If you know the sum and the difference of two digits, find the smaller first.")]),
    L("Clock angles", clockAngle, [S("360 degrees", "🕰️", "A whole turn is 360 degrees. The clock has 12 numbers."), S("30 and 6", "📐", "Between two neighbouring numbers is 30 degrees. The minute hand moves 6 degrees per minute."), S("Half past", "⏰", "At half past, the hour hand is halfway between two numbers.")]),
    L("Painted cubes", paintedCube, [S("A painted cube", "🧊", "Paint the outside of a big cube, then cut it into small cubes."), S("Corners, edges, faces", "🔍", "Corners have 3 painted faces, edge pieces have 2, face pieces have 1, inside pieces have 0."), S("Count", "🔢", "There are 8 corners and 12 edges. Edge pieces are the edge minus its two corners.")]),
    L("Pizza cuts", pizzaCuts, [S("Cut it up", "🍕", "1 cut gives 2 pieces. 2 crossing cuts give 4. 3 cuts can give 7."), S("The pattern", "📈", "Each new cut adds one more piece than the one before: +2, +3, +4..."), S("Special cuts", "🎯", "Cuts through the middle add 2 pieces each. Parallel cuts add 1 piece each.")]),
    L("Water jugs", jugs, [S("Two jugs", "🫗", "You can fill, empty, or pour one jug into another."), S("Keep track", "📝", "Write (small, big) for the amount in each jug after every step."), S("Search", "🔍", "Try pouring both ways. The shortest list of steps wins.")]),
    L("Last digits", lastDigit, [S("Only the end", "🔟", "To find the last digit of a product you only need the last digits."), S("Cycles", "🔁", "Powers of 2 end in 2, 4, 8, 6, then repeat. Other numbers cycle too."), S("Use the cycle", "🎯", "Find where your power lands in the cycle.")]),
    L("Sum and product", sumProd, [S("Two clues", "➕✖️", "You know what two numbers add to and multiply to."), S("List factors", "📋", "List the pairs that multiply to the product."), S("Check the sum", "✅", "Pick the pair that adds to the sum.")]),
    L("Counting multiples", countMult, [S("Divide and drop", "➗", "To count multiples of 5 up to 47, divide: 47 ÷ 5 = 9 r 2. So 9 multiples."), S("A range", "📏", "Count up to the top, then take away the count up to just before the start."), S("Both", "🔗", "Multiples of both numbers are multiples of their smallest common multiple.")]),
    L("Chances as fractions", spinChance, [S("Out of", "🎡", "Chance = (ways that fit) out of (all the ways)."), S("Simplify", "✂️", "6 out of 10 is 3/5 when simplified."), S("Not", "🚫", "The chance of NOT something uses the sections that do not fit.")]),
    L("Working together", workTogether, [S("Share the job", "🖌️", "Two workers finish a job faster than one."), S("Sections", "🔲", "Pick a job size both times fit into. See how many sections each does per hour."), S("Same speed", "👷", "If people work at the same speed, people × days stays the same.")])
  ]);

  // ======================= LEVEL 12 =======================
  const secondDiff = () => {
    const s = pick([1, 2, 3]), b = ri(0, 4), c = ri(0, 5), f = n => s * n * (n - 1) / 2 + b * n + c, arr = [1, 2, 3, 4, 5].map(f), t = ri(0, 1);
    const hh = ["Write the jumps between the numbers under the pattern.", "Look at how the jumps change. If they grow by the same amount each time, keep that growth going.", "Example: 2, 3, 6, 11, 18. Jumps: 1, 3, 5, 7. The jumps grow by 2, so the next jump is 9 and the next number is 27. Now do yours."];
    if (t === 0) return num("The jumps in this pattern keep growing by the same amount. What number comes next?", big(arr.join(", ") + ", ❓"), f(6), hh);
    return num("The jumps in this pattern keep growing by the same amount. What is the number AFTER the next one? (The 7th number)", big(arr.join(", ") + ", ?, ❓"), f(7), ["Write the jumps between the numbers.", "Find how much the jumps grow by. Then extend the jumps twice.", "Example: 1, 2, 4, 7, 11. Jumps: 1, 2, 3, 4. Next jumps: 5 then 6. The next numbers: 16, 22. The 7th number is 22. Now do yours."]);
  };

  const powers = () => {
    const t = ri(0, 4), sup = (a, b) => `${a}<sup>${b}</sup>`;
    if (t === 0) { const n = ri(5, 12); return num(`What is ${sup(2, n)}?`, big("⚡"), 2 ** n, ["2 to the power n means 2 multiplied by itself n times.", "Double again and again: 2, 4, 8, 16...", "Example: 2<sup>6</sup>: 2, 4, 8, 16, 32, 64, so it is 64. Now do yours."]); }
    if (t === 1) { const a = ri(2, 8), b = ri(2, 8); return num(`${sup(2, a)} × ${sup(2, b)} = ${sup(2, "?")}. What is the missing power?`, big("⚡"), a + b, ["Write each power as a list of 2s multiplied together.", "Count all the 2s in the long multiplication.", "Example: 2<sup>3</sup> × 2<sup>2</sup> = (2×2×2) × (2×2) = five 2s = 2<sup>5</sup>. Now do yours."]); }
    if (t === 2) { const b = pick([2, 3, 4, 5]), e = ri(2, 5); return num(`${sup(b, "?")} = ${b ** e}. What is the missing power?`, big("⚡"), e, [`Multiply ${b} by itself and watch the numbers grow.`, `Count how many times you multiply ${b} before you reach the target.`, "Example: 3<sup>?</sup> = 81. 3, 9, 27, 81 means 3 × 3 × 3 × 3, so the power is 4. Now do yours."]); }
    if (t === 3) { const n = ri(3, 9), m = ri(2, 9); return num(`How many zeros are at the end of ${sup(10, n)} × ${sup(10, m)}?`, big("⚡"), n + m, ["10 to the power n is a 1 followed by n zeros.", "Multiplying powers of 10 combines their zeros.", "Example: 10<sup>2</sup> × 10<sup>3</sup> = 100 × 1000 = 100000, five zeros. Now do yours."]); }
    for (;;) {
      const cs = []; while (cs.length < 3) { const a = ri(2, 5), b = ri(2, 8); if (a ** b < 6000 && !cs.some(c => c[0] === a ** b)) cs.push([a ** b, sup(a, b)]); }
      const mx = [...cs].sort((x, y) => y[0] - x[0]); if (mx[0][0] === mx[1][0]) continue;
      return mcq("Which of these is the biggest number?", big("⚡"), mx[0][1], cs.filter(c => c !== mx[0]).map(c => c[1]), ["Work out each power by multiplying step by step.", "Write down the value of each one and compare. Do not guess from the numbers alone.", "Example: Which is bigger, 2<sup>6</sup> or 3<sup>4</sup>? 2<sup>6</sup> = 64 and 3<sup>4</sup> = 81, so 3<sup>4</sup>. Now do yours."]);
    }
  };

  const nFactors = n => { let c = 0; for (let i = 1; i <= n; i++) if (n % i === 0) c++; return c; };
  const factorCount = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 4), b = ri(1, 3), n = 2 ** a * 3 ** b; return num(`${n} = ${"2 × ".repeat(a)}${Array(b).fill(3).join(" × ")}. How many factors does ${n} have?`, big("🧩"), (a + 1) * (b + 1), ["Each factor uses some of the 2s and some of the 3s.", `You can use 0 up to ${a} of the 2s, and 0 up to ${b} of the 3s. Count the choices for each and multiply.`, "Example: 12 = 2 × 2 × 3. Use 0, 1 or 2 twos (3 choices) and 0 or 1 three (2 choices): 3 × 2 = 6 factors. Now do yours."]); }
    if (t === 1) { const p = pick([2, 3, 5, 7]), a = ri(2, 6); return num(`How many factors does ${p ** a} have? (${Array(a).fill(p).join(" × ")})`, big("🧩"), a + 1, ["Which numbers divide it? They are made from some of the same prime number.", "The factors are 1, then p, then p × p, and so on up to the whole number. Count them.", "Example: 8 = 2 × 2 × 2 has factors 1, 2, 4, 8. That is 4. Now do yours."]); }
    const k = pick([2, 3, 4, 6, 8]), cand = Array.from({ length: 56 }, (_, i) => i + 4), right = pick(cand.filter(n => nFactors(n) === k)), wr = shuf(cand.filter(n => nFactors(n) !== k)).slice(0, 3);
    return mcq(`Which of these numbers has exactly ${k} factors?`, big("🧩"), right, wr, ["Count the factors of each choice in pairs that multiply to the number.", "For each choice, list the pairs (1 × the number, 2 × ..., 3 × ...) until the pairs repeat. Count the factors and compare.", "Example: How many factors does 15 have? 1 × 15, 3 × 5: factors 1, 3, 5, 15, so 4. Now do yours."]);
  };

  const longestPiece = () => {
    const g = ri(2, 12), [p, q] = pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [3, 7], [5, 6], [2, 7], [4, 7]]), t = ri(0, 2);
    if (t === 0) return num(`Two ribbons are ${g * p} cm and ${g * q} cm long. You cut both into equal pieces that are as long as possible, with nothing left over. How long is each piece in cm?`, big("🎀"), g, ["Each ribbon length must be a whole number of pieces.", "You need the biggest number that divides both lengths exactly.", "Example: ribbons 12 cm and 18 cm. Factors of 12 and 18 shared: 1, 2, 3, 6. The longest piece is 6 cm. Now do yours."]);
    if (t === 1) return num(`You have ${g * p} candies and ${g * q} stickers. You make identical gift bags using ALL of them, each bag with the same candies and the same stickers. What is the most bags you can make?`, big("🎁"), g, ["The number of bags must divide the candies AND the stickers exactly.", "Find the biggest number that divides both amounts.", "Example: 8 candies and 12 stickers. Shared factors: 1, 2, 4. The most bags is 4 (2 candies and 3 stickers each). Now do yours."]);
    return num(`Two ribbons are ${g * p} cm and ${g * q} cm long. You cut both into equal pieces as long as possible, nothing left over. How many pieces do you have altogether?`, big("🎀"), p + q, ["First find the longest piece that fits both ribbons.", "Divide each ribbon by that piece length and add the two answers.", "Example: ribbons 12 and 18, pieces of 6 cm: 2 + 3 = 5 pieces. Now do yours."]);
  };

  const avgChange = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(3, 6), a = ri(10, 40), k = ri(1, 5), x = a + k * (n + 1); return num(`${n} kids have an average score of ${a}. A new kid joins with a score of ${x}. What is the new average?`, big("📊"), a + k, ["Find the total of the first group.", "Add the new score to the total, then divide by the new number of kids.", "Example: 3 kids average 10 (total 30). A new kid scores 14. New total 44, divided by 4 kids = 11. Now do yours."]); }
    if (t === 1) { const n = ri(3, 6), a = ri(10, 40), k = ri(1, 5), x = a - k * (n - 1) < 0 ? 0 : a + k * (n - 1); return num(`${n} kids have an average score of ${a}. A kid who scored ${x} leaves. What is the average of the ${n - 1} kids who are left?`, big("📊"), a - k, ["Find the total of all the kids first.", "Take the leaving kid's score away from the total, then divide by the kids who are left.", "Example: 4 kids average 10 (total 40). A kid with 16 leaves. 24 ÷ 3 = 8. Now do yours."]); }
    const n1 = ri(2, 5), n2 = ri(2, 5), a1 = ri(5, 20), k = ri(1, 4);
    const A2 = a1 + k * (n1 + n2); return num(`${n1} kids have an average score of ${a1}. ${n2} other kids have an average score of ${A2}. What is the average score of all ${n1 + n2} kids together?`, big("📊"), (n1 * a1 + n2 * A2) / (n1 + n2), ["You can not just average the two averages unless the groups are the same size.", "Find each group's total (average times the number of kids). Add the totals, then divide by all the kids.", "Example: 2 kids average 10 and 3 kids average 20. Totals: 20 and 60 = 80. 80 ÷ 5 = 16. Now do yours."]);
  };

  const percents = () => {
    const t = ri(0, 3);
    if (t === 0) { const p = pick([10, 20, 25, 50, 75, 5]), N = p === 5 ? ri(2, 12) * 20 : p === 75 || p === 25 ? ri(2, 12) * 4 : ri(2, 12) * 10; return num(`What is ${p}% of ${N}?`, big("％"), N * p / 100, ["Percent means 'out of 100'. Some percents are easy fractions: 50% is a half, 25% is a quarter, 10% is a tenth.", "Use an easy fraction or find 10% first. Then build the percent from it.", "Example: 25% of 40 is a quarter of 40, which is 10. Now do yours."]); }
    if (t === 1) { const [y, x] = pick([[20, 5], [20, 15], [25, 5], [50, 10], [40, 10], [200, 50], [10, 3], [50, 35], [20, 8], [25, 20]]); return num(`${x} out of ${y} is what percent?`, big("％"), x * 100 / y, ["Percent is a number out of 100. Make the fraction have 100 on the bottom.", `What do you multiply ${y} by to get 100? Do the same to the top.`, "Example: 6 out of 25: ×4 gives 24 out of 100, which is 24%. Now do yours."]); }
    if (t === 2) { const p = pick([10, 20, 25, 50]), N = p === 25 ? ri(2, 12) * 4 : ri(2, 12) * 10; return num(`A toy costs $${N}. It is on sale for ${p}% off. What is the sale price in dollars?`, big("🏷️"), N - N * p / 100, ["First find how many dollars the discount is.", "Find the percent of the price, then take it away from the price.", "Example: $40 with 25% off. 25% of 40 is 10. The sale price is 40 − 10 = $30. Now do yours."]); }
    const p = pick([10, 20, 25, 50]), N = p === 25 ? ri(2, 10) * 4 : ri(2, 10) * 10; return num(`A plant is ${N} cm tall. It grows ${p}% taller. How tall is it now, in cm?`, big("🌱"), N + N * p / 100, ["First find how many cm it grew.", "Find the percent of the height, then add it to the height.", "Example: 40 cm tall and grows 25%. 25% of 40 is 10. The new height is 50 cm. Now do yours."]);
  };

  const bestBuy = () => {
    const t = ri(0, 2);
    if (t === 0) {
      for (;;) {
        const ns = shuf([2, 3, 4, 5, 6, 8, 10]).slice(0, 3), us = ns.map(() => ri(20, 80) * 5), mn = Math.min(...us);
        if (us.filter(u => u === mn).length > 1) continue;
        const deals = ns.map((n, i) => ({ s: `${n} for ${money(n * us[i])}`, u: us[i] }));
        return mcq(`A shop sells the same snack in 3 packs: ${deals.map(d => d.s).join("; ")}. Which pack is the best buy (cheapest for each snack)?`, big("🛒"), deals.find(d => d.u === mn).s, deals.filter(d => d.u !== mn).map(d => d.s), ["Compare the price of ONE snack in each pack.", "Divide each pack's price by the number of snacks in it. The smallest result wins.", "Example: 4 for $2.00 is 50¢ each. 6 for $2.70 is 45¢ each. The 6-pack is better. Now do yours."]);
      }
    }
    if (t === 1) { const p = ri(2, 9), k = pick([3, 4, 5]), n = k * ri(2, 4); return num(`A shop has a deal: buy ${k} items and pay for only ${k - 1}. One item costs $${p}. How much do ${n} items cost in dollars?`, big("🛍️"), (n / k) * (k - 1) * p, ["How many groups of the deal are in all the items?", "Each group costs the price of one fewer items than it has. Multiply by the number of groups.", "Example: 3 for the price of 2, $5 each, 9 items: 3 groups, each costs $10, so $30. Now do yours."]); }
    const p = ri(2, 9) * 2; return num(`Buy one, get the second one half price. A notebook costs $${p}. How much do 4 notebooks cost in dollars?`, big("🛍️"), 3 * p, ["Two notebooks make one deal. What does one deal cost?", "A deal costs one full price plus a half price. Then you have 2 deals.", "Example: a $10 book: one deal is 10 + 5 = $15. For 4 books: 2 deals = $30. Now do yours."]);
  };

  const countPairs = () => {
    const r = ri(3, 8), b = ri(2, 7), n = r + b, t = ri(0, 2);
    const pre = `A bag has ${r} red marbles and ${b} blue marbles. You pick 2 marbles.`;
    if (t === 0) return num(`${pre} How many different pairs of marbles are possible? (Treat all the marbles as different.)`, big("🔴🔵"), comb(n, 2), ["Pick the first marble: how many ways? Then the second?", "Multiply the choices, then divide by 2, because a pair is the same in either order.", "Example: 5 marbles: 5 × 4 ÷ 2 = 10 pairs. Now do yours."]);
    if (t === 1) return num(`${pre} How many of the pairs are both red?`, big("🔴🔴"), comb(r, 2), ["Forget the blue ones. Only the red ones matter.", "Count the pairs you can make from just the red marbles: first choice times second choice, divided by 2.", "Example: 4 red marbles: 4 × 3 ÷ 2 = 6 red-red pairs. Now do yours."]);
    return num(`${pre} How many of the pairs have one red and one blue?`, big("🔴🔵"), r * b, ["Pick the red one, then the blue one.", "Each red marble can pair with every blue marble. Multiply.", "Example: 3 red and 4 blue: 3 × 4 = 12 mixed pairs. Now do yours."]);
  };

  const wordShuffle = () => {
    const wd = pick(["MOM", "DAD", "BOOK", "NOON", "TOOT", "LEVEL", "APPLE", "BANANA", "PLAY", "MOON", "ALL", "TREE", "BALL", "SEEDS", "CAT", "MATH", "PUZZLE"]);
    const c = {}; wd.split("").forEach(x => (c[x] = (c[x] || 0) + 1));
    const ans = Object.values(c).reduce((a, k) => a / fact(k), fact(wd.length));
    return num(`How many different "words" (they do not need to mean anything) can you make by rearranging all the letters of ${wd}?`, big("🔤"), ans, ["If all the letters were different, how many orders would there be?", "Multiply the choices for each place. Then, if a letter repeats, swapping the repeats does not give a new word, so divide for each repeated letter.", "Example: LOOP has 4 letters with O twice. 4 × 3 × 2 × 1 = 24, divided by 2 (for the two Os) = 12. Now do yours."]);
  };

  const diagonals = () => {
    const n = ri(4, 10), t = ri(0, 3), nm = { 4: "square", 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon", 9: "nonagon", 10: "decagon" }[n];
    if (t === 0) return num(`A ${nm} has ${n} sides. A diagonal joins two corners that are not next to each other. How many diagonals does it have?`, big("⬡"), n * (n - 3) / 2, ["From one corner, which corners can you join with a diagonal?", `From each corner there are (corners − 3) diagonals. Multiply by the number of corners, then divide by 2 because each diagonal has two ends.`, "Example: a hexagon (6 sides): 6 × 3 ÷ 2 = 9 diagonals. Now do yours."]);
    if (t === 1) return num(`What do the inside angles of a ${nm} (${n} sides) add up to, in degrees?`, big("⬡"), (n - 2) * 180, ["A triangle's angles add up to 180 degrees. You can split any polygon into triangles.", "Draw diagonals from one corner. You get (sides − 2) triangles. Multiply by 180.", "Example: a pentagon splits into 3 triangles: 3 × 180 = 540 degrees. Now do yours."]);
    if (t === 2) return num(`You pick one corner of a ${nm} (${n} sides) and draw all possible diagonals from it. How many triangles does this make inside?`, big("⬡"), n - 2, ["Try a square: one diagonal from a corner makes 2 triangles.", "The triangles use the diagonals as walls. There is always 2 fewer triangle than the number of sides.", "Example: a hexagon gives 4 triangles. Now do yours."]);
    return num(`How many diagonals can you draw from ONE corner of a ${nm} (${n} sides)?`, big("⬡"), n - 3, ["You cannot join a corner to itself or to the two neighbours.", "Take away those three corners from all the corners.", "Example: a hexagon has 6 corners, so 6 − 3 = 3 diagonals from one corner. Now do yours."]);
  };

  const liarCount = () => {
    for (;;) {
      const w = names(4), c = w.map(() => ri(1, 4)), sol = [0, 1, 2, 3, 4].filter(L2 => c.filter(x => x !== L2).length === L2);
      if (sol.length !== 1) continue;
      return num(`Four kids each make a statement. Truth-tellers always tell the truth. Liars always lie.<br>${w.map((x, i) => `${x}: “Exactly ${c[i]} of us four ${c[i] === 1 ? "is a liar" : "are liars"}.”`).join("<br>")}<br>How many of the four are liars?`, big("🤥"), sol[0], ["Try each possible number of liars: 0, 1, 2, 3 or 4. Which statements would be true for that number?", "If the number of liars is L, then the kids who say 'exactly L' are telling the truth and all the others are lying. Check that the number of liars matches L.", "Example: three kids say “exactly 1”, “exactly 2”, “exactly 2”. Try 1 liar: only the first would be truthful, so the other two are liars, which is 2, not 1. Try 2 liars: the last two are truthful, only the first is a liar, which is 1, not 2. Neither fits, so test every number the same way for yours."]);
    }
  };

  const nim = () => {
    const k = ri(2, 4), t = ri(0, 2);
    if (t === 0) { const n = (k + 1) * ri(2, 5) + ri(1, k); return num(`There are ${n} stones in a pile. Two players take turns taking 1 to ${k} stones. Whoever takes the LAST stone wins. You go first. How many stones should you take to be sure of winning?`, big("🪨"), n % (k + 1), [`If you leave a number of stones that is a multiple of ${k + 1}, your opponent is in trouble.`, `Whatever your opponent takes, you can take enough to make the total of the two moves ${k + 1}. So aim to leave a multiple of ${k + 1}.`, "Example: 11 stones, take 1 to 3. 11 is 8 + 3, and 8 is a multiple of 4. Take 3 and leave 8. Now do yours."]); }
    if (t === 1) { const m = k + 1, right = m * ri(2, 6), wr = [right + ri(1, k), right - ri(1, k), right + ri(1, k), right + 1].filter(x => x > 0 && x % m); return mcq(`Two players take turns taking 1 to ${k} stones from a pile. Whoever takes the last stone wins. For which starting pile does the player who goes FIRST lose if both play perfectly?`, big("🪨"), right, wr, ["The first player loses if every move leaves a pile the second player can win from.", `Look at the size of a pair of turns. A pair of turns can always make a total of ${k + 1}.`, "Example: take 1 to 3, win by taking the last. Which start loses for the first player: 9, 10, 11 or 12? The multiples of 4 lose, so 12. Now do yours."]); }
    const lose = Math.random() < 0.5, n = (k + 1) * ri(2, 6) + (lose ? 0 : ri(1, k)); return mcq(`A pile has ${n} stones. Players take 1 to ${k} stones; whoever takes the last stone wins. You go first and both play perfectly. Will you win?`, big("🪨"), lose ? "No, you will lose" : "Yes, you will win", ["Yes, you will win", "No, you will lose"], [`Think about whether you can leave a pile that is a multiple of ${k + 1}.`, `If the pile is already a multiple of ${k + 1}, you cannot leave one. Otherwise you can take the extra stones.`, "Example: with 1 to 3 stones, a pile of 10: take 2 and leave 8 (a multiple of 4), so the first player wins. A pile of 12 is already a multiple of 4, so the first player loses. Now do yours."]);
  };

  const subsets = () => {
    const n = ri(3, 7), t = ri(0, 3), th = pick(["toppings", "colors", "flavors"]);
    if (t === 0) return num(`A pizza shop has ${n} ${th}. You can pick any number of them, including none. How many different choices are there?`, big("🍕"), 2 ** n, ["For each topping you can say yes or no.", "Each topping doubles the number of choices.", "Example: 3 toppings: 2 × 2 × 2 = 8 choices. Now do yours."]);
    if (t === 1) return num(`A shop has ${n} ${th}. You must pick at least one. How many different choices are there?`, big("🍕"), 2 ** n - 1, ["Count all the yes-or-no choices first.", "One of those choices is picking nothing. Take it away.", "Example: 3 toppings: 8 choices, minus the empty one: 7. Now do yours."]);
    if (t === 2) return num(`A shop has ${n} ${th}. How many ways are there to pick exactly 2?`, big("🍕"), comb(n, 2), ["Pick the first, then the second. The order does not matter.", "Multiply the two choices and divide by 2.", "Example: 5 toppings, pick 2: 5 × 4 ÷ 2 = 10. Now do yours."]);
    return num(`A set has ${n} things. How many subsets does it have? (A subset can be empty or the whole set.)`, big("🧺"), 2 ** n, ["Each thing is either in a subset or not in it.", "Two choices for each thing, so multiply 2 for each thing.", "Example: {a, b} has 4 subsets: {}, {a}, {b}, {a, b}. Now do yours."]);
  };

  const knightMoves = () => {
    const files = "abcdefgh", nm = (x, y) => files[x] + (y + 1);
    for (;;) {
      const sx = ri(0, 7), sy = ri(0, 7), ex2 = ri(0, 7), ey = ri(0, 7);
      const d = Array.from({ length: 8 }, () => Array(8).fill(-1)); d[sx][sy] = 0; let q = [[sx, sy]];
      while (q.length) { const nq = []; for (const [x, y] of q) for (const [dx, dy] of [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]) { const a = x + dx, b = y + dy; if (a >= 0 && a < 8 && b >= 0 && b < 8 && d[a][b] < 0) { d[a][b] = d[x][y] + 1; nq.push([a, b]); } } q = nq; }
      const ans = d[ex2][ey]; if (ans < 2 || ans > 4) continue;
      return num(`A chess knight jumps 2 squares in one direction and 1 square sideways (like an L). On a chess board, what is the fewest knight jumps to get from ${nm(sx, sy)} to ${nm(ex2, ey)}? (Letters a to h go across, numbers 1 to 8 go up.)`, big("♞"), ans, ["List all the squares the knight can reach in one jump from the start.", "From each of those squares, list where it can jump next. Look for the target square. Keep going until you find it.", "Example: from a1, one jump reaches b3 or c2. From c2, the next jump can reach e1, e3, a3, b4, d4. So a1 to d4 takes 2 jumps. Now do yours."]);
    }
  };

  const brokenClock = () => {
    const t = ri(0, 2);
    if (t === 0) { const m = pick([2, 3, 4, 5, 6, 10]), h = ri(2, 9); return mcq(`A clock gains ${m} minutes every hour. It was set exactly right at 12:00. When the right time is ${h}:00, what time does the clock show?`, big("⏰"), fmtT(60 * h + m * h), [fmtT(60 * h + m), fmtT(60 * h - m * h), fmtT(60 * h + m * (h - 1)), fmtT(60 * h + m * h + 10)], ["How much extra time does the clock gain in total over those hours?", "Multiply the minutes gained per hour by the number of hours. Add that to the true time.", "Example: a clock gains 5 minutes an hour. After 4 hours it is 20 minutes fast. The true time 4:00 shows as 4:20. Now do yours."]); }
    if (t === 1) { const m = pick([2, 3, 4, 5, 6, 10]), h = ri(2, 9); return mcq(`A clock loses ${m} minutes every hour. It was set exactly right at 12:00. When the right time is ${h}:00, what time does the clock show?`, big("⏰"), fmtT(60 * h - m * h), [fmtT(60 * h + m * h), fmtT(60 * h - m), fmtT(60 * h - m * (h - 1)), fmtT(60 * h - m * h - 10)], ["How much time does the clock lose in total over those hours?", "Multiply the minutes lost per hour by the number of hours. Take that away from the true time.", "Example: a clock loses 5 minutes an hour. After 4 hours it is 20 minutes slow. The true time 4:00 shows as 3:40. Now do yours."]); }
    const m = pick([2, 3, 4, 5, 6, 10, 12, 15, 20, 30]); return num(`A clock gains ${m} minutes every hour. After how many hours is it exactly 1 hour (60 minutes) ahead?`, big("⏰"), 60 / m, ["How many minutes does it need to gain in total?", "Divide 60 by the minutes gained in one hour.", "Example: a clock gaining 10 minutes an hour is 60 minutes fast after 60 ÷ 10 = 6 hours. Now do yours."]);
  };

  const corners = () => {
    const x1 = ri(0, 7), y1 = ri(0, 7), x2 = x1 + ri(2, 7), y2 = y1 + ri(2, 7), t = ri(0, 2);
    if (t === 0) {
      const pts = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]], k = ri(0, 3), miss = pts[k], given = pts.filter((_, i) => i !== k);
      return mcq(`Three corners of a rectangle (its sides run straight across and straight up) are ${shuf(given).map(p => `(${p[0]}, ${p[1]})`).join(", ")}, written as (across, up). Where is the fourth corner?`, big("▭"), ca(miss[0], miss[1]), [ca(miss[1] === miss[0] ? miss[0] + 3 : miss[1], miss[0]), ca(miss[0] + 1, miss[1]), ca(miss[0], miss[1] + 1), ca(miss[0] + 2, miss[1] + 2)], ["Sketch the three points on a grid.", "In a rectangle with straight sides, two corners share the same across number, and two share the same up number. Find which number is missing a partner.", "Example: corners (1, 2), (5, 2), (5, 6). The across numbers are 1, 5, 5, so 1 needs a partner. The up numbers are 2, 2, 6, so 6 needs a partner. The missing corner is (1, 6). Now do yours."].map((h, i) => (i === 1 ? "In a rectangle with straight sides, two corners share the same across number, and two corners share the same up number. Find the number that has no partner in each direction." : h)));
    }
    if (t === 1) return num(`A rectangle on a grid has corners (${x1}, ${y1}), (${x2}, ${y1}), (${x2}, ${y2}) and (${x1}, ${y2}). What is its perimeter?`, big("▭"), 2 * ((x2 - x1) + (y2 - y1)), ["Find the length of the bottom side (same up number) and the side going up (same across number).", "Subtract the numbers to get each length, then add all four sides.", "Example: corners (1, 1), (4, 1), (4, 3), (1, 3). Bottom 3, side 2. Perimeter 2 × (3 + 2) = 10. Now do yours."]);
    return num(`On a city map, you walk along the grid lines (only across or up and down) from (${x1}, ${y1}) to (${x2}, ${y2}). What is the fewest blocks you must walk?`, big("🏙️"), (x2 - x1) + (y2 - y1), ["You need to go across and also up. How far in each direction?", "Subtract to find the across distance and the up distance, then add them.", "Example: from (1, 2) to (4, 6): across 3, up 4, so 7 blocks. Now do yours."]);
  };

  const pairSums = () => {
    const a = ri(1, 9), b = a + ri(1, 6), c = b + ri(1, 8), t = ri(0, 2);
    const pre = `Three different numbers are added in pairs. The pair sums are ${shuf([a + b, a + c, b + c]).join(", ")}.`;
    const hh = ["Add up the three pair sums. Each number was used twice.", "The total of the pair sums is double the total of the three numbers. Find the total of the three numbers, then take away pair sums to find each number.", "Example: pair sums 7, 9, 10. Total 26, half is 13 (all three numbers). The number left out of the pair 10 is 13 − 10 = 3. Now do yours."];
    if (t === 0) return num(`${pre} What is the biggest number?`, big("🔢"), c, hh);
    if (t === 1) return num(`${pre} What is the smallest number?`, big("🔢"), a, hh);
    return num(`${pre} What do the three numbers add up to?`, big("🔢"), a + b + c, ["Each number is in two of the pairs.", "Add the three pair sums. Every number was counted twice, so halve it.", "Example: pair sums 5, 6, 7 add to 18. Half is 9. Now do yours."]);
  };

  const ARGS = [
    ["it rains", "the grass gets wet", "it does not rain", "the grass does not get wet"],
    ["the bell rings", "the class ends", "the bell does not ring", "the class does not end"],
    ["Ava has a ticket", "Ava can go in", "Ava does not have a ticket", "Ava cannot go in"],
    ["the lamp is plugged in", "the lamp is on", "the lamp is not plugged in", "the lamp is not on"],
    ["Ben studies", "Ben passes the test", "Ben does not study", "Ben does not pass the test"],
    ["it is a square", "it has four sides", "it is not a square", "it does not have four sides"]
  ];
  const badArg = () => {
    const [P, Q, nP, nQ] = pick(ARGS), form = ri(0, 3), cap = s => s[0].toUpperCase() + s.slice(1);
    const rule = `If ${P}, then ${Q}.`;
    const FORMS = [
      [`${cap(P)}.`, `So ${Q}.`, true, "Yes, it must be true"],
      [`${cap(nQ)}.`, `So ${nP}.`, true, "Yes, it must be true"],
      [`${cap(Q)}.`, `So ${P}.`, false, "No, it might not be true"],
      [`${cap(nP)}.`, `So ${nQ}.`, false, "No, it might not be true"]
    ], f = FORMS[form];
    const hint2 = [
      "The rule says what happens when the first part is true. Is the first part true here?",
      "The rule works from the first part to the second. Here you know the second part is false. What would that mean for the first part?",
      "The rule only says what follows when the first part is true. Could the second part be true for another reason?",
      "The rule only talks about when the first part is true. Does it say anything about when the first part is false?"
    ][form];
    return mcq(`${cap(rule)} ${f[0]} ${f[1]} Does the last sentence HAVE to be true?`, big("🧠"), f[3], ["Yes, it must be true", "No, it might not be true"], [
      "Ask yourself: could the last sentence be false while all the sentences before it are true?", hint2,
      "Example: “If it is a dog, it has four legs. A table has four legs. So the table is a dog.” That is not forced: four legs can come from other things. Now do yours."]);
  };

  const L12 = finish(12, [
    L("Growing jumps", secondDiff, [S("Jumps that change", "📈", "In 1, 2, 4, 7, 11 the jumps are 1, 2, 3, 4: the jumps grow by 1 each time."), S("Extend the jumps", "🔧", "Write the jumps, see how they grow, and keep that going."), S("Add to the last", "➕", "New number = last number + next jump.")]),
    L("Powers", powers, [S("Power", "⚡", "2<sup>5</sup> means 2 × 2 × 2 × 2 × 2 = 32."), S("Add the powers", "➕", "2<sup>3</sup> × 2<sup>2</sup> = 2<sup>5</sup>: count all the 2s."), S("Tens", "🔟", "10<sup>n</sup> is a 1 with n zeros.")]),
    L("Counting factors fast", factorCount, [S("Build factors", "🧩", "12 = 2 × 2 × 3. A factor uses 0, 1 or 2 of the twos and 0 or 1 of the threes."), S("Multiply the choices", "✖️", "3 choices × 2 choices = 6 factors."), S("One prime", "☝️", "2<sup>4</sup> has factors 1, 2, 4, 8, 16: the power plus 1.")]),
    L("Equal pieces", longestPiece, [S("No leftovers", "🎀", "To cut two ribbons into equal pieces with none left, the piece length must divide both."), S("As long as possible", "📏", "The longest piece is the biggest shared factor."), S("How many", "🔢", "Divide each ribbon by the piece length and add.")]),
    L("When the average changes", avgChange, [S("Use totals", "📊", "Total = average × how many. Work with totals, not averages."), S("Add or remove", "➕➖", "Add (or remove) the score from the total, then divide by the new count."), S("Two groups", "👥", "Add both totals and divide by all the kids.")]),
    L("Percent puzzles", percents, [S("Out of 100", "％", "50% is a half. 25% is a quarter. 10% is a tenth."), S("Percent of", "🔢", "Find 10% by dividing by 10, then build up other percents."), S("Sale", "🏷️", "Take the discount away from the price.")]),
    L("Best buys", bestBuy, [S("Price for one", "🛒", "To compare packs, find the price of ONE item in each pack."), S("Deals", "🛍️", "A deal like 3 for the price of 2 saves one price in every group."), S("Check", "✅", "Always compare like with like.")]),
    L("Counting pairs", countPairs, [S("Pairs", "👥", "A pair is the same in either order."), S("Count pairs", "✖️", "Multiply the choices, then divide by 2."), S("Mixed pairs", "🔴🔵", "One red AND one blue: multiply the reds by the blues.")]),
    L("Word shuffles", wordShuffle, [S("Arrange letters", "🔤", "CAT has 3 different letters: 3 × 2 × 1 = 6 orders."), S("Repeats", "🔁", "If a letter repeats, swapping it with itself changes nothing, so divide."), S("Example", "✏️", "LOOP: 24 ÷ 2 = 12.")]),
    L("Polygons and diagonals", diagonals, [S("Diagonal", "⬡", "A diagonal joins two corners that are not neighbours."), S("Count", "🔢", "From each corner you can draw (corners − 3) diagonals. Divide the total by 2."), S("Angles", "📐", "Split into triangles: (sides − 2) triangles of 180 degrees each.")]),
    L("How many liars?", liarCount, [S("Statements about liars", "🤥", "Each kid says how many of the four are liars."), S("Try each number", "🔬", "Pretend the number of liars is 0, 1, 2, 3 or 4."), S("Check", "✅", "A kid is truthful only if their number matches. The number of kids who are not truthful must equal the number you tried.")]),
    L("Winning games", nim, [S("Take-away game", "🪨", "Players take 1 to 3 stones. The one who takes the last stone wins."), S("Magic number", "🔮", "Leave a multiple of 4. Whatever the other player takes, you take the rest of the 4."), S("Plan ahead", "🧠", "Work backwards from the last stone.")]),
    L("Pick any toppings", subsets, [S("Yes or no", "🍕", "For each topping you say yes or no."), S("Doubling", "✖️", "3 toppings: 2 × 2 × 2 = 8 ways, including none."), S("At least one", "☝️", "Take away the one choice with nothing.")]),
    L("Knight jumps", knightMoves, [S("The knight", "♞", "A knight jumps 2 one way and 1 the other way, like an L."), S("Look ahead", "🔍", "List where it can go in 1 jump, then 2 jumps."), S("Search", "🧭", "Stop when you first reach the target square.")]),
    L("Fast and slow clocks", brokenClock, [S("Gaining", "⏩", "A clock that gains 5 minutes an hour is 5 minutes fast after 1 hour, 10 after 2."), S("Losing", "⏪", "A clock that loses time shows an earlier time than the true one."), S("Total", "🧮", "Minutes gained or lost = rate × hours.")]),
    L("Corners and distances", corners, [S("Grid points", "🗺️", "(3, 5) is 3 across and 5 up."), S("Rectangle", "▭", "Two corners share the same across number and two share the same up number."), S("City blocks", "🏙️", "Walking on grid lines: distance = across + up.")]),
    L("Pair sums", pairSums, [S("Three numbers", "🔢", "You know a + b, a + c and b + c."), S("Add all pairs", "➕", "Adding them counts every number twice."), S("Halve", "➗", "Half of the total is a + b + c. Then take away a pair to find the third number.")]),
    L("Is the reasoning sound?", badArg, [S("If, then", "🧠", "“If it rains, the grass is wet” does not say the grass is only wet when it rains."), S("Forced", "✅", "Rain happened → wet grass is forced. Not wet → no rain is forced."), S("Not forced", "❌", "Wet grass → rain? Not forced. No rain → dry grass? Not forced.")])
  ]);

  Object.assign(LOGIC_LEVELS, { 10: L10, 11: L11, 12: L12 });
})();
