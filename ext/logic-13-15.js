// ext/logic-13-15.js  Mind Lab Logic & Puzzles levels 13-15 (60 lessons)
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const big = (t, s = 1.8) => `<span style="font-size:${s}em">${t}</span>`;
  const normC = x => String(x).replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
  const mcq = (text, visual, right, wrongs, hints) => {
    right = String(right);
    const seen = new Set([normC(right)]), w = [];
    for (const x of wrongs.map(String)) { const k = normC(x); if (!seen.has(k)) { seen.add(k); w.push(x); } }
    return { text, visual, choices: shuf([right, ...w.slice(0, 3)]), answer: right, hints };
  };
  const num = (text, visual, answer, hints) => ({ text, visual, answer, hints });
  const ex = (list, ans) => { const ok = list.filter(e => String(e[1]) !== String(ans)); return (ok.length ? pick(ok) : list[0])[0]; };
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => a / gcd(a, b) * b;
  const neg = n => (n < 0 ? "−" + (-n) : String(n));
  const ch = n => (n < 0 ? "−" + (-n) + " (negative)" : n > 0 ? n + " (positive)" : "0");
  const frs = (a, b) => { const g = gcd(Math.abs(a), b); return b / g === 1 ? String(a / g) : `${a / g}/${b / g}`; };
  const T24 = m => { m = ((m % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); };
  const cell = v => `<span style="display:inline-block;min-width:2.2em;border:2px solid #888;border-radius:6px;margin:2px;padding:2px 6px">${v}</span>`;
  const isPrime = n => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben", "Kai", "Eli", "Nia", "Tom"];

  // ======================= LEVEL 13 =======================
  const negLine = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const s = -ri(2, 9), m = ri(3, 13), a = s + m;
      return mcq(`You stand on ${neg(s)} on a number line and walk ${m} steps to the right. Which number are you on now?`, big("↔️"), ch(a), [ch(s - m), ch(m), ch(-a), ch(a + 2)], [
        "Picture a number line. Does walking to the right make the number bigger or smaller?",
        "Start on the first number and count the steps one at a time. Watch what happens when you walk past zero.",
        "Example: start on −3 and walk 5 steps right: −2, −1, 0, 1, 2. You land on 2. Now do yours."]);
    }
    if (t === 1) {
      const s = ri(-2, 5), d = ri(6, 13), a = s - d;
      return mcq(`At night the temperature is ${neg(s)} degrees. By morning it falls by ${d} degrees. What is the temperature in the morning?`, big("🌡️"), ch(a), [ch(d - s), ch(s + d), ch(a + 2), ch(a - 1)], [
        "Falling means the number goes down. Think of a thermometer.",
        "Count down from the starting number. When you pass zero the numbers become negative.",
        "Example: it is 2 degrees and it falls by 5. Count down: 1, 0, −1, −2, −3. So −3 degrees. Now do yours."]);
    }
    if (t === 2) {
      const set = new Set(); while (set.size < 4) set.add(ri(-9, 9));
      const arr = [...set], kind = pick(["smallest", "biggest", "closest to zero"]);
      const abs = arr.map(Math.abs); if (kind === "closest to zero" && new Set(abs).size < 4) return negLine();
      const right = kind === "smallest" ? Math.min(...arr) : kind === "biggest" ? Math.max(...arr) : arr.reduce((p, c) => (Math.abs(c) < Math.abs(p) ? c : p));
      return mcq(`Which of these numbers is the <b>${kind}</b>?`, big(arr.map(neg).join(" &nbsp; "), 1.5), ch(right), arr.map(ch), [
        kind === "closest to zero" ? "Ignore the minus signs for a moment. How far is each number from zero?" : "On a number line, the numbers further to the left are smaller.",
        kind === "closest to zero" ? "The number with the fewest steps to zero wins. Both negative and positive numbers count." : "Every negative number is smaller than every positive number. Among negatives, the one with the bigger digit is the smaller number.",
        "Example: of −4, 2, −6, 5 the smallest is −6 (furthest left) and the one closest to zero is 2. Now do yours."]);
    }
    const a = ri(2, 9), b = ri(2, 9);
    return num(`How many steps is it along the number line from ${neg(-a)} to ${b}?`, big("↔️"), a + b, [
      "Count the steps from the first number to zero, then from zero to the second number.",
      "Add the two distances together. Zero is in the middle of the walk.",
      "Example: from −3 to 4 is 3 steps to reach zero and 4 more steps, so 7 steps. Now do yours."]);
  };

  const decim = () => {
    const t = ri(0, 2), f2 = h => (h / 100).toFixed(2);
    if (t === 0) {
      for (;;) {
        const vals = [ri(1, 9) * 100, ri(10, 99) * 10, ri(100, 999), ri(1, 9) * 100 + ri(1, 9) * 10]; // in thousandths
        if (new Set(vals).size < 4 || vals[1] % 100 === 0 || vals[2] % 10 === 0) continue;
        const strs = vals.map(v => String(v / 1000)), big_ = Math.random() < 0.5;
        const right = big_ ? Math.max(...vals) : Math.min(...vals);
        return mcq(`Which decimal is the <b>${big_ ? "biggest" : "smallest"}</b>?`, big(strs.join(" &nbsp; "), 1.4), String(right / 1000), strs, [
          "Do not just look at how many digits there are. Compare the tenths place first.",
          "Write each decimal with the same number of places (add zeros on the end), then compare them like whole numbers.",
          "Example: 0.5, 0.45, 0.405. Written as 0.500, 0.450, 0.405 the biggest is 0.5, the smallest is 0.405. Now do yours."]);
      }
    }
    if (t === 1) {
      const m = ri(11, 89), h = ri(1, 10);
      return mcq(`Which decimal is exactly halfway between ${f2(m - h)} and ${f2(m + h)}?`, big("↔️"), f2(m), [f2(m + 10), f2(m - 10), f2(m + 5), f2(m - 5)].filter(x => +x > 0), [
        "Halfway means the same distance from both numbers.",
        "Find the total gap between the two numbers, halve it, and add that to the smaller number. (Or add both and halve.)",
        "Example: halfway between 0.20 and 0.60. The gap is 0.40, half is 0.20, so 0.20 + 0.20 = 0.40. Now do yours."]);
    }
    const tenths = ri(1, 9), th = pick([1, 3, 5, 7]), mode = ri(0, 1);
    if (mode === 0) return num(`${(tenths / 10).toFixed(1)} is the same as how many hundredths?`, big("0.•"), tenths * 10, [
      "One tenth is split into ten hundredths.", "Multiply the number of tenths by ten.", "Example: 0.4 is 4 tenths, and 4 tenths is 40 hundredths. Now do yours."]);
    const v = tenths * 100 + th * 10 + ri(1, 9);
    return num(`${(v / 1000).toFixed(3)} is the same as how many thousandths?`, big("0.•••"), v, [
      "Think of the number with its decimal point moved all the way to the right of the last digit.", "The last digit is in the thousandths place, so the whole number you see after the point is the number of thousandths.",
      "Example: 0.047 is 47 thousandths and 0.52 is 520 thousandths. Now do yours."]);
  };

  const thinkNum = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const x = ri(3, 15), a = ri(2, 6), b = ri(3, 20);
      return num(`I think of a number, multiply it by ${a}, then add ${b}. The answer is ${x * a + b}. What was my number?`, big("🤔"), x, [
        "Work backwards, from the end to the start.",
        "Undo the last step first: undo adding by taking away. Then undo multiplying by dividing.",
        ex([["Example: times 3, then plus 4, gives 19. Undo: 19 − 4 = 15, then 15 ÷ 3 = 5. Now do yours.", 5], ["Example: times 2, then plus 6, gives 20. Undo: 20 − 6 = 14, then 14 ÷ 2 = 7. Now do yours.", 7]], x)]);
    }
    if (t === 1) {
      const x = ri(2, 12), a = ri(1, 6), m = ri(2, 5), s = ri(1, 9);
      return num(`I think of a number. I add ${a}, multiply by ${m}, then subtract ${s}. I get ${(x + a) * m - s}. What was my number?`, big("🤔"), x, [
        "There are three steps. Undo them one at a time, starting with the last one.",
        "Undo subtracting by adding. Then undo multiplying by dividing. Last, undo the adding.",
        "Example: add 2, times 3, subtract 1 gives 20. Undo: 20 + 1 = 21, 21 ÷ 3 = 7, 7 − 2 = 5. Now do yours."]);
    }
    const x = ri(10, 40), a = ri(2, 9);
    return num(`Start with ${x}. Add ${a}, double the result, subtract ${2 * a}, then halve it. What do you get?`, big("🎩"), x, [
      "Do the steps one at a time, in order. Is there a pattern in what you get?",
      "After doubling, the number is twice as big. Then you take away exactly what doubling added. Look at what is left.",
      "Example: start with 8. Add 3 gives 11. Double gives 22. Subtract 6 gives 16. Halve gives 8. Now do yours."]);
  };

  const undoIt = () => {
    for (;;) {
      const x0 = ri(4, 24), a = ri(2, 9), b = ri(2, 9), opsAll = [
        { t: "doubles them", f: x => x * 2, ok: () => true },
        { t: `buys ${a} more`, f: x => x + a, ok: () => true },
        { t: `gives away ${b}`, f: x => x - b, ok: x => x > b },
        { t: "gives half of them away", f: x => x / 2, ok: x => x % 2 === 0 }];
      const ops = shuf(opsAll).slice(0, 3); let x = x0, good = true;
      for (const o of ops) { if (!o.ok(x)) { good = false; break; } x = o.f(x); }
      if (!good || x < 1) continue;
      const nm = pick(NM);
      return num(`${nm} has some stickers. First ${nm} ${ops[0].t}. Then ${nm} ${ops[1].t}. Then ${nm} ${ops[2].t}. Now ${nm} has ${x} stickers. How many stickers did ${nm} start with?`, big("⭐"), x0, [
        "This is a working-backwards puzzle. Start from the end of the story.",
        "Undo the last thing that happened first, then the one before it. Buying is undone by taking away, doubling is undone by halving, and so on.",
        "Example: Ava doubles her stickers, then gives away 3, and ends with 9. Undo: 9 + 3 = 12, then half of 12 is 6. Now do yours."]);
    }
  };

  const consec = () => {
    const t = ri(0, 3);
    if (t === 0) { const m = ri(5, 40); return num(`The sum of three consecutive numbers is ${3 * m}. What is the middle number?`, big("🔢"), m, [
      "Consecutive numbers follow each other with no gaps.", "The numbers below and above the middle balance each other out. What is the sum if all three were equal to the middle?", "Example: 4 + 5 + 6 = 15 and 15 ÷ 3 = 5, the middle one. Now do yours."]); }
    if (t === 1) { const m = ri(6, 40); return num(`The sum of five consecutive numbers is ${5 * m}. What is the smallest of the five?`, big("🔢"), m - 2, [
      "Five numbers in a row: the middle one is the easy one to find.", "Divide the total by how many numbers to find the middle number, then count back from it.", "Example: 3 + 4 + 5 + 6 + 7 = 25. 25 ÷ 5 = 5 is the middle, and the smallest is 2 less, 3. Now do yours."]); }
    if (t === 2) { const k = ri(5, 60); return num(`Two consecutive numbers add up to ${2 * k + 1}. What is the bigger one?`, big("🔢"), k + 1, [
      "Two numbers in a row: one of them is exactly one bigger than the other.", "If you take away 1 from the sum, the two numbers would be equal. Split that evenly, then put the 1 back on the bigger number.", "Example: two consecutive numbers add to 15. 15 − 1 = 14, half is 7. So the numbers are 7 and 8. Now do yours."]); }
    const m = ri(3, 20) * 2; return num(`The sum of three consecutive even numbers is ${3 * m}. What is the biggest of the three?`, big("🔢"), m + 2, [
      "Even numbers in a row go up by the same small step each time.", "The middle number is the sum divided by three. The biggest is one jump of 2 above it.", "Example: 6 + 8 + 10 = 24 and 24 ÷ 3 = 8, the middle. The biggest is 8 + 2 = 10. Now do yours."]);
  };

  const triAngles = () => {
    const t = ri(0, 4);
    if (t === 0) { const a = ri(30, 80), b = ri(30, 80); return num(`A triangle has angles of ${a}° and ${b}°. How many degrees is the third angle?`, big("📐"), 180 - a - b, [
      "The three angles of any triangle always have the same total.", "Add the two angles you know and take the sum away from the total of a triangle.", "Example: angles 50° and 60°. The total of a triangle is 180°, so 180 − 110 = 70°. Now do yours."]); }
    if (t === 1) { const a = pick([30, 40, 50, 60, 70, 110, 120, 130, 140]); return num(`Two angles sit next to each other on a straight line. One is ${a}°. How many degrees is the other angle?`, big("📐"), 180 - a, [
      "A straight line is like a half turn.", "Angles that share a straight line add up to the half-turn total.", "Example: one angle is 100°, so the other is 180 − 100 = 80°. Now do yours."]); }
    if (t === 2) { const A = ri(10, 80) * 2; return num(`An isosceles triangle has a top angle of ${A}°. The two base angles are equal. How many degrees is one base angle?`, big("🔺"), (180 - A) / 2, [
      "The triangle has two equal angles at the bottom.", "Take the top angle away from the triangle total, then share what is left between the two equal angles.", "Example: top angle 40°. 180 − 40 = 140, and 140 split in two is 70° each. Now do yours."]); }
    if (t === 3) { const b = ri(35, 80); return num(`An isosceles triangle has two base angles of ${b}° each. How many degrees is the top angle?`, big("🔺"), 180 - 2 * b, [
      "You know two of the three angles, and they are equal.", "Add the two equal angles together, then subtract from the triangle total.", "Example: base angles 65° each. 65 + 65 = 130 and 180 − 130 = 50°. Now do yours."]); }
    const a = ri(50, 120), b = ri(40, 110), c = ri(30, 100); return num(`Four angles meet at a point and fill a full turn. Three of them are ${a}°, ${b}° and ${c}°. How many degrees is the fourth?`, big("🌀"), 360 - a - b - c, [
      "All the angles around a point make one whole turn.", "A whole turn is a bigger total than a straight line. Add the three you know and subtract from the whole-turn total.", "Example: angles 100°, 120° and 90° are around a point. 360 − 310 = 50° is the fourth. Now do yours."]);
  };

  const pyramid = () => {
    const a = ri(1, 9), b = ri(1, 9), c = ri(1, 9), m1 = a + b, m2 = b + c, top = m1 + m2, t = ri(0, 2);
    const draw = (tp, mm, bb) => `<div style="font-size:1.3em;line-height:1.5;text-align:center">${cell(tp)}<br>${mm.map(cell).join("")}<br>${bb.map(cell).join("")}</div>`;
    const base = ["Each block is the sum of the two blocks just below it."];
    if (t === 0) return num("Fill the top block of this number pyramid.", draw("❓", [m1, m2], [a, b, c]), top, [base[0], "You know the two blocks in the middle row. Add them.", "Example: middle row 5 and 8. The top block is 5 + 8 = 13. Now do yours."]);
    if (t === 1) return num("Find the missing block at the bottom left.", draw(top, [m1, m2], ["❓", b, c]), a, [base[0], "Look at the block above the missing one. It is the sum of the missing number and its neighbour. Work backwards.", "Example: a middle block is 9 and the bottom neighbour is 4, so the missing number is 9 − 4 = 5. Now do yours."]);
    return num("Find the missing block at the bottom middle.", draw(top, ["•", "•"], [a, "❓", c]), b, [
      "The middle row is hidden, so use only the top and the two ends. The middle bottom block gets counted twice in the top.",
      "Take the two end numbers away from the top number. What is left is two copies of the missing block.",
      "Example: top 20, bottom ends 3 and 5. 20 − 3 − 5 = 12, and half of 12 is 6. Now do yours."]);
  };

  const digitSum = () => {
    const t = ri(0, 2), ds = n => String(n).split("").reduce((s, d) => s + +d, 0);
    if (t === 0) {
      const right = 9 * ri(12, 99), ws = new Set(); while (ws.size < 3) { const w = 3 * ri(30, 330); if (w % 9 !== 0) ws.add(w); }
      return mcq("Which of these numbers can be divided by 9 with nothing left over?", big("9️⃣"), right, [...ws], [
        "There is a quick test for 9 that uses the digits.", "Add up the digits of each number. A number divides by 9 when its digit sum does too.",
        "Example: 738 has digit sum 7 + 3 + 8 = 18, which is in the 9 times table, so 738 divides by 9. 739 has digit sum 19, so it does not. Now do yours."]);
    }
    if (t === 1) {
      const a = ri(1, 9), c = ri(1, 9), s = a + c; let d = 0; while ((s + d) % 3 !== 0) d++;
      return num(`What is the smallest digit that can replace ❓ so that ${a}❓${c} divides by 3 exactly?`, big(`${a}❓${c}`), d, [
        "A number divides by 3 when the sum of its digits divides by 3.", "Add the two digits you can see. How much more do you need to reach the next number in the 3 times table? Zero is allowed.",
        "Example: 5╓7. The digits 5 + 7 = 12 is already in the 3 times table, so the smallest digit that works is 0. Now do yours."]);
    }
    const a = ri(1, 9), c = ri(1, 9), e = ri(1, 9), s = a + c + e; if (s % 9 === 0) return digitSum();
    const d = (9 - s % 9) % 9;
    return num(`Which digit replaces ❓ so that ${a}❓${c}${e} divides by 9 exactly?`, big(`${a}❓${c}${e}`), d, [
      "A number divides by 9 when the sum of its digits divides by 9.", "Add the digits you can see and find how far you are from the next number in the 9 times table.",
      "Example: 2╓4 needs 2 + 4 + ❓ to be 9. So ❓ = 3, and 234 = 9 × 26. Now do yours."]);
  };

  const maps = () => {
    const t = ri(0, 2), k = pick([2, 3, 4, 5, 10]), cm = ri(3, 12);
    if (t === 0) return num(`On a map, 1 cm stands for ${k} km. Two towns are ${cm} cm apart on the map. How many km apart are they really?`, big("🗺️"), cm * k, [
      "Every centimetre on the map is the same real distance.", "Multiply the map distance by the real distance for 1 cm.", "Example: 1 cm is 5 km and two towns are 4 cm apart: 4 × 5 = 20 km. Now do yours."]);
    if (t === 1) return num(`On a map, 1 cm stands for ${k} km. Two towns are ${cm * k} km apart. How many cm apart are they on the map?`, big("🗺️"), cm, [
      "You know the real distance. How many map centimetres fit into it?", "Divide the real distance by the real distance one centimetre stands for.", "Example: 1 cm is 5 km and a trip is 35 km: 35 ÷ 5 = 7 cm. Now do yours."]);
    const a = ri(2, 4), kk = a * ri(2, 5), c2 = ri(2, 6) * a;
    return num(`On a map, ${a} cm stands for ${kk} km. How many km do ${c2} cm stand for?`, big("🗺️"), c2 / a * kk, [
      "First find out how many km ONE centimetre stands for.", "Divide the km by the cm to get km for one centimetre, then multiply by the new length.", "Example: 2 cm stands for 6 km. 1 cm is 3 km, so 5 cm is 15 km. Now do yours."]);
  };

  const unitChain = () => {
    const t = ri(0, 3);
    if (t === 0) { const v = 6 * ri(2, 15); return num(`A bike goes ${v} km in one hour. How many metres does it go in one minute?`, big("🚲"), v * 1000 / 60, [
      "Change kilometres to metres, and hours to minutes.", "Work out the metres in an hour first, then share that between the minutes in an hour.", "Example: 12 km in an hour is 12 000 m. Share across 60 minutes: 12 000 ÷ 60 = 200 m per minute. Now do yours."]); }
    if (t === 1) { const v = 6 * ri(1, 12); return num(`A tap fills ${v} litres every minute. How many millilitres is that each second? (1 litre = 1000 mL)`, big("🚰"), v * 1000 / 60, [
      "Change litres to millilitres, and minutes to seconds.", "Multiply to get the mL in a whole minute, then split it between the seconds.", "Example: 3 litres a minute is 3000 mL a minute, which is 3000 ÷ 60 = 50 mL a second. Now do yours."]); }
    if (t === 2) { const d = ri(2, 9); return num(`How many minutes are there in ${d} days?`, big("⏰"), d * 1440, [
      "First change days to hours, then hours to minutes.", "A day has a fixed number of hours, and an hour has 60 minutes. Multiply them together before you scale up.", "Example: 2 days is 48 hours, and 48 × 60 = 2880 minutes. Now do yours."]); }
    const n = 2 * ri(2, 12); return num(`Pretend 2 inches is the same as 5 centimetres. How many centimetres is ${n} inches?`, big("📏"), n / 2 * 5, [
      "Find how many groups of 2 inches fit into the length.", "Each group of 2 inches is worth the same number of centimetres. Multiply the groups by that.", "Example: 6 inches is 3 groups of 2, so 3 × 5 = 15 cm. Now do yours."]);
  };

  const fracOfFrac = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = pick([2, 3, 4]), b = pick([2, 3, 5]), k = ri(2, 6), N = a * b * k; return num(`What is 1/${a} of 1/${b} of ${N}?`, big("🍕"), k, [
      "Do it in two steps. Start with the inside part.", "Find the first fraction of the number, then take the second fraction of that answer.", "Example: 1/2 of 1/3 of 18. 1/3 of 18 is 6 and 1/2 of 6 is 3. Now do yours."]); }
    if (t === 1) { const a = pick([3, 4, 5]), b = pick([2, 3, 4]); if (a === b) return fracOfFrac(); const left = frs(a - 1, a), ans = frs(a - 1, a * b);
      return mcq(`A pizza is cut into ${a} equal slices and ${NM[0]} eats one slice. Then Leo eats 1/${b} of what is left. What fraction of the WHOLE pizza did Leo eat?`, big("🍕"), ans, [left, frs(1, b), frs(1, a * b), frs(a - 1, a + b)], [
        "First find the part of the pizza that is left after the first slice.", "Leo eats a fraction of the part that is left, not of the whole pizza. Multiply the two fractions.",
        "Example: 1/4 is eaten, 3/4 is left. A friend eats 1/3 of that: 1/3 of 3/4 is 1/4 of the pizza. Now do yours."]); }
    const k = ri(2, 6), N = 3 * 4 * k * 5; return num(`There are ${N} sweets. 1/3 are red. 1/4 of the red ones are sour. How many sour red sweets are there?`, big("🍬"), N / 12, [
      "Find the red sweets first.", "Then find a fraction of the red sweets, not of all the sweets.", "Example: 24 sweets, 1/2 are red (12). 1/3 of those are sour: 4. Now do yours."]);
  };

  const estimate = () => {
    const t = ri(0, 2);
    if (t === 0) {
      let a, b; do { a = ri(31, 69); b = ri(11, 29); } while (a % 10 === 5 || b % 10 === 5);
      const r =Math.round(a / 10) * 10 * (Math.round(b / 10) * 10);
      return mcq(`Which is the best estimate of ${a} × ${b}?`, big("🧮"), r, [r * 10, r / 10, Math.round(r / 3 / 100) * 100 + 100], [
        "You do not need the exact answer. Round both numbers to the nearest ten.", "Multiply the rounded numbers. Count the zeros carefully so the size is right.", "Example: 38 × 21 is about 40 × 20 = 800. Now do yours."]);
    }
    if (t === 1) {
      const n = ri(2, 11), r = n * n + ri(1, 2 * n);
      return mcq(`The square root of ${r} is between which two whole numbers?`, big("√"), `${n} and ${n + 1}`, [`${n - 1} and ${n}`, `${n + 1} and ${n + 2}`, `${n + 2} and ${n + 3}`], [
        "Square root asks: which number times itself gives this?", "Find two square numbers that the number sits between. Their roots are the two whole numbers.", "Example: 40 is between 36 and 49, so its square root is between 6 and 7. Now do yours."]);
    }
    const a = ri(25, 99), b = ri(25, 99), d = String(a * b).length;
    return num(`How many digits does ${a} × ${b} have?`, big("🔢"), d, [
      "You do not need the exact product. Estimate it first.", "Round both numbers and multiply. Then count the digits, but be careful if your estimate is close to a round number like 1000 or 10 000.", "Example: 40 × 30 = 1200, which has 4 digits, so 41 × 28 has 4 digits too. Now do yours."]);
  };

  const pigeon = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(15, 50); return num(`${n} kids each have a birthday on one of the 7 days of the week. At least how many kids must share the same weekday?`, big("🎂"), Math.ceil(n / 7), [
      "Spread the kids out as evenly as you can over the days.", "If everybody was spread equally, how many would be on each day? The leftovers force one day to have an extra kid.", "Example: 10 kids on 3 days. Spread 3, 3, 3 and one kid is left, so some day has at least 4. Now do yours."]); }
    if (t === 1) { const k = ri(2, 6); return num(`A dark drawer holds socks of ${k} different colours. How many socks must you take out to be SURE you have a matching pair?`, big("🧦"), k + 1, [
      "Think about the worst luck you could have.", "The worst case: you take one sock of every colour and none match. What does the very next sock do?", "Example: 3 colours. Worst case is red, blue, green, then the 4th sock must match. Now do yours."]); }
    const k = ri(2, 5), m = ri(3, 4); return num(`A bag holds lots of balls in ${k} colours. How many must you take out to be SURE that ${m} of them are the same colour?`, big("⚽"), k * (m - 1) + 1, [
      "Think about the worst luck. How many balls of each colour can you take without having enough of one?", "In the worst case you have one fewer than needed of every colour. The next ball then finishes the job.", "Example: 3 colours, want 2 the same: worst case 3 different balls, so the 4th makes a pair. Now do yours."]);
  };

  const solids = () => {
    const n = ri(3, 8), t = ri(0, 3), nm = ["triangle", "square", "pentagon", "hexagon", "heptagon", "octagon"][n - 3];
    if (t === 0) return num(`A prism has a ${nm} as its base (and top). How many faces does it have in all?`, big("📦"), n + 2, [
      "Count the sides of the base: each one gives a flat side face.", "Add the two ends (top and bottom) to the side faces.", "Example: a triangular prism has 3 side faces plus 2 ends, 5 faces. Now do yours."]);
    if (t === 1) return num(`A prism has a ${nm} as its base. How many edges does it have?`, big("📦"), 3 * n, [
      "The top has some edges, the bottom has the same number, and some edges join them.", "Edges on the top + edges on the bottom + edges standing up between them.", "Example: a triangular prism: 3 top + 3 bottom + 3 standing = 9 edges. Now do yours."]);
    if (t === 2) return num(`A pyramid has a ${nm} as its base. How many faces does it have in all (including the base)?`, big("🔺"), n + 1, [
      "The base is one face. The other faces are the slanted sides.", "Each side of the base gets one slanted triangle. Add the base.", "Example: a square pyramid has 4 triangles plus the square base: 5 faces. Now do yours."]);
    return num(`A pyramid has a ${nm} as its base. How many corners (vertices) does it have?`, big("🔺"), n + 1, [
      "Count the corners of the base, then look at the top.", "Add the pointed top to the corners of the base.", "Example: a triangular pyramid has 3 corners in the base plus 1 at the top = 4. Now do yours."]);
  };

  const gears = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = pick([8, 10, 12, 15]), r = ri(2, 4), b = a * r, k = ri(2, 5); return num(`A small gear with ${a} teeth turns a big gear with ${b} teeth. The small gear makes ${k * r} full turns. How many full turns does the big gear make?`, big("⚙️"), k, [
      "Count teeth that pass the meeting point. Both gears move the same number of teeth.", "Multiply teeth by turns for the small gear. Then see how many big-gear turns that makes.", "Example: a 10-tooth gear turns 6 times and drives a 20-tooth gear: 60 teeth pass, so the big gear turns 60 ÷ 20 = 3 times. Now do yours."]); }
    if (t === 1) { const a = pick([6, 8, 9, 12]), b = pick([10, 15, 16, 18, 20]); if (a === b) return gears(); return num(`Two gears have ${a} and ${b} teeth. Both start with a mark pointing up. After how many turns of the first gear will both marks point up again at the same time?`, big("⚙️"), lcm(a, b) / a, [
      "The marks line up again when the same number of teeth have passed on both gears.", "Find the smallest number that both tooth counts divide into. Then see how many turns the first gear has made by then.", "Example: gears with 4 and 6 teeth. Both divide 12, so the first gear has turned 12 ÷ 4 = 3 times. Now do yours."]); }
    const n = ri(3, 9), cw = n % 2 === 1;
    return mcq(`${n} gears sit in a line and each touches the next one. The first gear turns clockwise. Which way does gear number ${n} turn?`, big("⚙️"), cw ? "clockwise" : "anticlockwise", ["clockwise", "anticlockwise"], [
      "Touching gears turn in opposite directions.", "The direction swaps at every gear. Look at whether the last gear is an odd or even number along the line.", "Example: with 3 gears, gear 1 clockwise, gear 2 anticlockwise, gear 3 clockwise. Now do yours with a different number of gears."]);
  };

  const dominoes = () => {
    const t = ri(0, 2);
    if (t === 0) { const r = ri(2, 8), c = 2 * ri(1, 4); return num(`A domino covers exactly 2 squares. How many dominoes are needed to cover a ${r} by ${c} board completely with no gaps?`, big("🀱"), r * c / 2, [
      "First find how many squares the board has.", "Each domino covers a pair of squares. Divide the squares by the size of that pair.", "Example: a 3 by 4 board has 12 squares, so 6 dominoes. Now do yours."]); }
    if (t === 1) { const r = ri(3, 7), c = ri(3, 7), k = ri(0, 2), sq = r * c - k, yes = sq % 2 === 0; return mcq(`A ${r} by ${c} board has ${k} square${k === 1 ? "" : "s"} removed. Can it be covered exactly by dominoes (no gaps, no overlap)? Just think about the number of squares.`, big("🀱"), yes ? "Yes" : "No", ["Yes", "No"], [
      "Count the squares that are left on the board.", "Dominoes always cover 2 squares each. What does that say about the number of squares being even or odd?", "Example: a 3 by 3 board has 9 squares, an odd number. Dominoes cover pairs, so 9 squares cannot be covered exactly. Now do yours."]); }
    return mcq("A chessboard (8 by 8) has two opposite corners cut off. Both removed squares are the same colour. Can 31 dominoes cover the 62 squares left?", big("♟️"), "No", ["Yes", "No"], [
      "A chessboard has two colours. What colours does a domino always cover?", "Every domino covers one light and one dark square. Count how many of each colour are left after removing two squares of one colour.",
      "Example: a 2 by 2 board has 2 light and 2 dark squares, so 2 dominoes fit. If you remove two light squares, 2 dark squares are left with nothing to pair. Now do yours."]);
  };

  const letterSums = () => {
    const t = ri(0, 2);
    if (t === 0) { const A = ri(2, 9); return num(`Each letter is a digit. If AA + A = ${11 * A + A}, what digit is A? (AA means a two-digit number with both digits A.)`, big("🔤"), A, [
      "AA is the same as eleven times A.", "AA + A is twelve times A in all. Work out what A must be.", "Example: BB + B = 48. That is 12 times B, so B = 4 (44 + 4 = 48). Now do yours."]); }
    if (t === 1) { const s = ri(2, 12); return num(`If AB + BA = ${11 * s} (two-digit numbers), what is A + B?`, big("🔤"), s, [
      "Write AB as ten times A plus B, and BA as ten times B plus A, then add.", "The sum contains both A and B eleven times. Divide by eleven.", "Example: 47 + 74 = 121 = 11 × 11, and 4 + 7 = 11. Now do yours."]); }
    const A = ri(3, 9); return num(`A × A = ${A * A} and A is a digit. What is A?`, big("🔤"), A, [
      "A digit multiplied by itself gives a square number.", "Which digit, multiplied by itself, gives the number in the question?", "Example: B × B = 25. Since 5 × 5 = 25, B = 5. Now do yours."]);
  };

  const triIneq = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const mk = ok => { const a = ri(3, 9), b = ri(a, 11); if (ok) { const c = ri(b, a + b - 1); return [a, b, c]; } return [ri(2, 7), ri(2, 8), 0]; };
      const good = mk(true).join(", "), bads = new Set();
      while (bads.size < 3) { const a = ri(2, 8), b = ri(a, 10), c = a + b + ri(0, 3); bads.add(`${a}, ${b}, ${c}`); }
      return mcq("Which three stick lengths can make a triangle?", big("🥢"), good, [...bads], [
        "To close up a triangle, the two short sticks together must stretch past the long stick.",
        "Add the two shortest sticks and compare the total with the longest stick. If the total is only equal or smaller, the sticks just lie flat.",
        "Example: 2, 3, 6 cannot form a triangle because 2 + 3 = 5 is less than 6. But 4, 5, 6 can because 4 + 5 = 9 is more than 6. Now do yours."]);
    }
    const a = ri(3, 9), b = ri(a + 2, 14);
    if (t === 1) return num(`Two sides of a triangle are ${a} cm and ${b} cm. The third side is a whole number of cm. What is the longest it can be?`, big("📏"), a + b - 1, [
      "The third side must be shorter than the other two sides put end to end.", "Add the two known sides. The third side must be smaller than that total, but still a whole number.", "Example: sides 4 and 6. The third side must be less than 10, so the longest is 9. Now do yours."]);
    return num(`Two sides of a triangle are ${a} cm and ${b} cm. The third side is a whole number of cm. What is the shortest it can be?`, big("📏"), b - a + 1, [
      "The two shorter sides together must still beat the longest side.", "If the third side is tiny, the short sides cannot reach across. It must be bigger than the gap between the two known sides.", "Example: sides 4 and 9. The third side must be more than 9 − 4 = 5, so the shortest is 6. Now do yours."]);
  };

  // ======================= LEVEL 14 =======================
  const upDown = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const s = ri(-8, 8), cs = [0, 0, 0].map(() => (Math.random() < 0.5 ? -1 : 1) * ri(2, 9)), a = s + cs[0] + cs[1] + cs[2];
      const sg = c => (c > 0 ? "+" : "−") + Math.abs(c);
      return mcq(`Start at ${neg(s)}. Then make these changes one after the other: ${cs.map(sg).join(", ")}. Where do you end?`, big("🌡️"), ch(a), [ch(a + 2), ch(a - 2), ch(a + 1), ch(-a)], [
        "Do the changes one at a time, in order. A plus moves you up and a minus moves you down.",
        "You can also add all the plus changes together, add all the minus changes together, and combine them with the start.",
        "Example: start at −2, then +5, −7: −2 + 5 = 3, then 3 − 7 = −4. Now do yours."]);
    }
    if (t === 1) {
      const a = ri(2, 9), b = ri(2, 9), f = ri(0, 2);
      const [txt, r] = f === 0 ? [`${a} − (−${b})`, a + b] : f === 1 ? [`−${a} − ${b}`, -(a + b)] : [`−${a} − (−${b})`, b - a];
      return mcq(`What is ${txt}?`, big("➕➖"), ch(r), [ch(a - b), ch(b - a), ch(a + b), ch(-(a + b))], [
        "Subtracting a negative number is a special case. Think about what taking away a debt does.",
        "Taking away a negative is the same as adding the matching positive. Then work out the sum on the number line.",
        "Example: 5 − (−2) becomes 5 + 2 = 7, and −4 − 3 means going 3 further down from −4 to −7. Now do yours."]);
    }
    const a = ri(5, 40), b = ri(5, 40), nm = pick(NM);
    return mcq(`${nm} owes a friend $${a} (that is −${a}) and then earns $${b}. How much money does ${nm} have now? A negative answer means ${nm} still owes money.`, big("💵"), ch(b - a), [ch(a - b), ch(a + b), ch(-(a + b))], [
      "Think of the debt as a negative number and the money earned as a positive number.",
      "Combine them: the positive money pays off the debt. Which one is bigger decides if anything is left.",
      "Example: owing $6 and earning $4 means you still owe $2, so −2. Owing $3 and earning $8 leaves $5. Now do yours."]);
  };

  const exprVal = () => {
    const a = ri(2, 6), b = ri(2, 6), k = ri(2, 5), m = ri(2, 5), t = ri(0, 2);
    if (t === 0) return num(`If a = ${a} and b = ${b}, what is ${k}a + ${m}b?`, big("🔤"), k * a + m * b, [
      "Replace each letter with its number. ka means k times a.", "Multiply first, then add.", "Example: if a = 2 and b = 3, then 4a + 5b = 4 × 2 + 5 × 3 = 8 + 15 = 23. Now do yours."]);
    if (t === 1) return num(`If a = ${a} and b = ${b}, what is ${k}(a + b)?`, big("🔤"), k * (a + b), [
      "The brackets mean: do the adding inside first.", "Work out a + b, then multiply the result by the number outside.", "Example: if a = 2 and b = 5, then 3(a + b) = 3 × 7 = 21. Now do yours."]);
    return num(`If a = ${a} and b = ${b}, what is a² + ${k}b?`, big("🔤"), a * a + k * b, [
      "a² means a times a, not a times 2.", "Square first, then multiply, then add.", "Example: if a = 3 and b = 4, then a² + 2b = 9 + 8 = 17. Now do yours."]);
  };

  const inequal = () => {
    const t = ri(0, 3);
    if (t === 0) { const a = ri(3, 9), b = ri(12, 25); return num(`What is the smallest whole number x that makes x + ${a} > ${b} true?`, big("⚖️"), b - a + 1, [
      "The sign > means “bigger than”, not “equal to”.", "Find the number that would make it exactly equal. The answer must be one step more than that.", "Example: x + 4 > 10. Equal would be x = 6, so x must be bigger: the smallest whole number is 7. Now do yours."]); }
    if (t === 1) { const k = ri(2, 6), M = ri(15, 40); return num(`What is the biggest whole number x that makes ${k}x < ${M} true?`, big("⚖️"), Math.floor((M - 1) / k), [
      "The sign < means “smaller than”.", "Find how many times the number in front fits into the limit. If it fits exactly, you must go one lower.", "Example: 3x < 14. 3 × 4 = 12 is under 14 and 3 × 5 = 15 is over, so the biggest is 4. Now do yours."]); }
    const a = ri(2, 9), b = a + ri(4, 12), f = ri(0, 2);
    const [txt, c] = f === 0 ? [`${a} < x < ${b}`, b - a - 1] : f === 1 ? [`${a} ≤ x ≤ ${b}`, b - a + 1] : [`${a} < x ≤ ${b}`, b - a];
    return num(`How many whole numbers x make ${txt} true? (≤ means “smaller than or equal to”.)`, big("⚖️"), c, [
      "List the numbers if you can, or count the steps. Check whether the end numbers are allowed.", "Take the difference between the two ends, then adjust for each end that is included.", "Example: 2 < x ≤ 6 allows 3, 4, 5, 6, which is 4 numbers. Now do yours."]);
  };

  const threeRatio = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 4), b = ri(2, 5), c = ri(1, 6), k = ri(2, 7), nm = pick(["red", "blue", "green"]); return num(`A bag has red, blue and green beads in the ratio ${a}:${b}:${c}. There are ${k * (a + b + c)} beads in all. How many beads are ${["red", "blue", "green"][0]}?`, big("🔴🔵🟢"), k * a, [
      "Add up all the parts of the ratio first.", "Divide the total by the number of parts to find one part. Then multiply by the parts for red.", "Example: ratio 1:2:3 with 12 beads. 1 + 2 + 3 = 6 parts, one part is 2, and the 3-part colour has 6. Now do yours."]); }
    if (t === 1) { const a = ri(2, 5), b = ri(2, 5), c = ri(2, 5), k = ri(2, 6); if (a === b) return threeRatio(); return num(`Cats to dogs is ${a}:${b}. Dogs to birds is ${b}:${c}. There are ${k * b} dogs. How many birds are there?`, big("🐱🐶🐦"), k * c, [
      "The dogs part is the same in both ratios, so it links the animals together.", "Find how many animals one “part” stands for using the dogs. Then use the birds part.", "Example: dogs to birds is 2:5 and there are 6 dogs. One part is 3, so there are 15 birds. Now do yours."]); }
    const a = ri(2, 5), b = ri(2, 5); if (a === b) return threeRatio(); const k = ri(2, 6), more = ri(1, 5);
    const x = k * a, y = k * b; return num(`Boys to girls is ${a}:${b}. There are ${x} boys. How many more girls would have to join to make ${y + more} girls in all?`, big("🧒"), more, [
      "Find how many girls there are now, using the ratio and the boys.", "One ratio part is the boys divided by the boys' part. Girls = one part times the girls' part. Then find the gap.", "Example: ratio 2:3 with 8 boys has 12 girls. To reach 15 girls, 3 more must join. Now do yours."]);
  };

  const pctChange = () => {
    const t = ri(0, 3);
    if (t === 0) { const p = pick([10, 20, 25, 50]), s = p === 25 ? 4 * ri(2, 12) * 5 : p === 50 ? 2 * ri(5, 40) : 10 * ri(3, 20); return num(`A game costs $${s}. The price goes UP by ${p}%. What is the new price in dollars?`, big("🎮"), s * (100 + p) / 100, [
      "Find the percent of the price first. That is how much it goes up by.", "Add the increase to the old price.", "Example: $40 goes up by 25%. 25% of 40 is 10, so the new price is $50. Now do yours."]); }
    if (t === 1) { const p = pick([10, 20, 25, 50]), s = p === 25 ? 4 * ri(2, 12) * 5 : p === 50 ? 2 * ri(5, 40) : 10 * ri(3, 20); return num(`A bike costs $${s}. In a sale the price goes DOWN by ${p}%. What is the sale price in dollars?`, big("🚲"), s * (100 - p) / 100, [
      "Find the percent of the price first. That is the discount.", "Take the discount away from the old price.", "Example: $60 with 50% off. Half of 60 is 30, so the sale price is $30. Now do yours."]); }
    if (t === 2) { const p = pick([10, 20, 50]), s = pick([100, 200]); return num(`A plant is ${s} cm tall. It grows ${p}% taller. Then it loses ${p}% of its NEW height. How tall is it now, in cm?`, big("🌱"), s * (100 + p) * (100 - p) / 10000, [
      "The second percent is taken from a different number than the first one.", "First work out the new height after growing. Then find the percent of THAT height and take it away.", "Example: 100 cm grows 20% to 120. Losing 20% of 120 is 24, so it ends at 96 cm. Now do yours."]); }
    const p = pick([10, 20, 25, 50]), orig = 20 * ri(2, 12), sale = orig * (100 - p) / 100;
    return num(`After ${p}% off, a jacket costs $${sale}. What was the price before the discount, in dollars?`, big("🧥"), orig, [
      "The sale price is what is left after the discount. What percent of the original did you pay?", `Work out what percent of the original price is left, then find the price of 1% or 10% and scale up.`,
      "Example: after 20% off, a hat costs $24. You pay 80% of the price: 10% is $3, so 100% is $30. Now do yours."]);
  };

  const squaresRoots = () => {
    const t = ri(0, 2);
    if (t === 0) { const s = ri(5, 15); return num(`A square garden has an area of ${s * s} square metres. What is its perimeter in metres?`, big("🌻"), 4 * s, [
      "The area of a square is its side times its side. Find the side first.", "Which number multiplied by itself gives the area? Then walk all the way round: 4 sides.", "Example: area 49 means side 7, and the perimeter is 4 × 7 = 28. Now do yours."]); }
    if (t === 1) { const a = ri(20, 150), b = a + ri(60, 140), c = []; for (let i = 1; i * i <= b; i++) if (i * i >= a) c.push(i * i); if (!c.length) return squaresRoots(); return num(`How many perfect squares are there from ${a} to ${b}? (Perfect squares are 1, 4, 9, 16, ...)`, big("🟦"), c.length, [
      "List the squares near the start of the range. Which is the first one inside it?", "Find the first square that is at least as big as the smaller number and the last one that is not bigger than the larger number. Count the square roots between them.", "Example: from 10 to 50 the squares are 16, 25, 36, 49: that is 4. Now do yours."]); }
    const sq = [], ws = new Set(); while (sq.length < 3) { const n = ri(12, 40); if (!sq.includes(n * n)) sq.push(n * n); }
    while (ws.size < 1) ws.add(pick([sq[0] + ri(1, 3), sq[1] + 2, sq[2] + 1, sq[0] * 2, 250 + ri(1, 8) * 3]));
    const non = [...ws][0]; if ([...sq].includes(non) || Math.sqrt(non) % 1 === 0) return squaresRoots();
    return mcq("Which of these numbers is NOT a perfect square?", big("🟦"), non, sq, [
      "A perfect square is a whole number times itself. Look at the last digit of each number.", "A square number can only end in 0, 1, 4, 5, 6 or 9. Also check numbers by squaring a whole number close to them.", "Example: 144 = 12 × 12 is a square, but 150 is between 144 and 169, so it is not. Now do yours."]);
  };

  const sieve = () => {
    const t = ri(0, 2);
    if (t === 0) { const N = pick([20, 30, 40, 50, 60]); let c = 0; for (let i = 2; i <= N; i++) if (isPrime(i)) c++; return num(`How many prime numbers are there from 1 up to ${N}?`, big("🔍"), c, [
      "A prime has exactly two factors: 1 and itself. 1 itself is not prime.", "Cross out multiples of 2, then 3, then 5, then 7 (but keep those numbers themselves). The numbers left are the primes.", "Example: from 1 to 12 the primes are 2, 3, 5, 7, 11, which is 5 primes. Now do yours."]); }
    if (t === 1) { const right = pick([53, 59, 61, 67, 71, 73, 79, 83, 89, 97]), ws = shuf([51, 57, 63, 65, 69, 77, 87, 91, 93, 95, 99]).slice(0, 3); return mcq("Which of these numbers is a prime number?", big("🔢"), right, ws, [
      "A prime has no factors except 1 and itself.", "Test each number: try dividing it by 3, 5, 7. If one of them goes in exactly, it is not prime.", "Example: 91 looks prime but 7 × 13 = 91. And 89 has no small factor, so it is prime. Now do yours."]); }
    let n = ri(24, 90); while (isPrime(n)) n++; let p = n + 1; while (!isPrime(p)) p++;
    return num(`What is the smallest prime number that is bigger than ${n}?`, big("🔍"), p, [
      "Check the numbers after the starting number one at a time.", "Skip even numbers (apart from 2). For each odd number, try dividing by 3, 5 and 7.", "Example: the smallest prime bigger than 24: 25 = 5 × 5, 26 is even, 27 = 3 × 9, 28 is even, and 29 is prime. Now do yours."]);
  };

  const triArea = () => {
    const t = ri(0, 3), b = 2 * ri(2, 9), h = ri(3, 12);
    if (t === 0) return num(`A triangle has a base of ${b} cm and a height of ${h} cm. What is its area in square cm?`, big("🔺"), b * h / 2, [
      "A triangle is half of a rectangle with the same base and height.", "Multiply base by height, then take half.", "Example: base 6, height 5: 6 × 5 = 30 and half of 30 is 15. Now do yours."]);
    if (t === 1) return num(`A triangle has an area of ${b * h / 2} square cm and a base of ${b} cm. How tall is the triangle (its height) in cm?`, big("🔺"), h, [
      "Area = half × base × height. Work backwards.", "Double the area to get base × height. Then divide by the base.", "Example: area 12, base 6. Doubled it is 24, and 24 ÷ 6 = 4 cm tall. Now do yours."]);
    if (t === 2) return num(`A parallelogram has a base of ${b} cm and a height of ${h} cm. What is its area in square cm?`, big("▱"), b * h, [
      "A parallelogram can be cut and moved to make a rectangle.", "Its area is the base times the height (the straight-up height, not the slanted side).", "Example: base 7, height 4: area is 7 × 4 = 28. Now do yours."]);
    const l1 = ri(3, 12), l2 = 2 * ri(2, 8); return num(`A right-angled triangle has two short sides of ${l1} cm and ${l2} cm that meet at the right angle. What is its area in square cm?`, big("📐"), l1 * l2 / 2, [
      "In a right-angled triangle, the two short sides can be used as the base and the height.", "Multiply the two short sides together and halve.", "Example: short sides 6 and 4 give 6 × 4 ÷ 2 = 12. Now do yours."]);
  };

  const circles = () => {
    const t = ri(0, 3);
    const note = " (Use 3 for π to keep it easy.)";
    if (t === 0) { const d = ri(2, 20); return num(`A circle has a diameter of ${d} cm. About how long is its edge (circumference)?${note}`, big("⭕"), 3 * d, [
      "The circumference is about three diameters long.", "Multiply the diameter by the number given for π.", "Example: a circle with diameter 10 has a circumference of 3 × 10 = 30. Now do yours."]); }
    if (t === 1) { const r = ri(2, 15); return num(`A circle has a radius of ${r} cm. About how long is its circumference?${note}`, big("⭕"), 6 * r, [
      "The radius is half of the diameter. Which one do you need to multiply by π?", "Double the radius to get the diameter, then multiply by the number given for π.", "Example: radius 5, diameter 10, circumference 30. Now do yours."]); }
    if (t === 2) { const r = ri(2, 10); return num(`A circle has a radius of ${r} cm. About what is its area in square cm? (Area = π × radius × radius.)${note}`, big("⭕"), 3 * r * r, [
      "Square the radius first: radius times radius.", "Then multiply by the number given for π.", "Example: radius 4: 4 × 4 = 16 and 3 × 16 = 48 square cm. Now do yours."]); }
    const d = pick([10, 20, 30, 40]), n = ri(3, 12); return num(`A wheel has a diameter of ${d} cm and rolls along the ground for ${n} full turns. How far does it travel, in cm?${note}`, big("🛞"), 3 * d * n, [
      "In one full turn the wheel travels as far as its circumference.", "Find the circumference, then multiply by the number of turns.", "Example: a wheel with circumference 30 cm making 4 turns goes 120 cm. Now do yours."]);
  };

  const volume = () => {
    const t = ri(0, 2);
    if (t === 0) { const l = ri(2, 9), w = ri(2, 6), h = ri(2, 8); return num(`A box is ${l} cm long, ${w} cm wide and ${h} cm high. How many 1-cm cubes fill it exactly?`, big("📦"), l * w * h, [
      "Think about one layer of cubes on the bottom. How many cubes are in it?", "Layer = length × width. Then count how many layers fit in the height.", "Example: a 3 by 2 by 4 box has layers of 6 cubes and 4 layers, so 24 cubes. Now do yours."]); }
    if (t === 1) { const l = ri(3, 8), w = ri(2, 7), h = ri(2, 9); return num(`A box has a volume of ${l * w * h} cubic cm. The bottom is ${l} cm by ${w} cm. How high is the box in cm?`, big("📦"), h, [
      "Volume = bottom area × height. Work backwards.", "Find the area of the bottom, then divide the volume by it.", "Example: volume 60, bottom 5 by 4 = 20. 60 ÷ 20 = 3 cm high. Now do yours."]); }
    for (;;) { const l = pick([10, 20, 25, 40, 50]), w = pick([10, 20, 40]), h = pick([10, 15, 20, 30, 50]); if ((l * w * h) % 1000) continue;
      return num(`A fish tank is ${l} cm long, ${w} cm wide and ${h} cm high. How many litres of water fill it? (1 litre = 1000 cubic cm)`, big("🐠"), l * w * h / 1000, [
        "First find the volume in cubic cm.", "Multiply length × width × height, then change cubic cm to litres by dividing by 1000.", "Example: a tank 20 by 10 by 30 has volume 6000 cubic cm, which is 6 litres. Now do yours."]); }
  };

  const timetable = () => {
    const t = ri(0, 2);
    if (t === 0) { const dep = ri(6 * 12, 20 * 12) * 5, dh = ri(0, 4), dm = ri(1, 11) * 5, arr = dep + dh * 60 + dm;
      return mcq(`A train leaves at ${T24(dep)} (24-hour clock). The trip takes ${dh} h ${dm} min. When does it arrive?`, big("🚂"), T24(arr), [T24(arr + 10), T24(arr - 10), T24(arr + 60), T24(arr - 60)], [
        "Add the hours first, then the minutes.", "If the minutes go past 60, carry one hour. On the 24-hour clock the afternoon hours count on past twelve.", "Example: leaves 08:50, trip 1 h 25 min. 08:50 + 1 h = 09:50, then 25 min more is 10:15. Now do yours."]); }
    if (t === 1) { const s = ri(6 * 12, 14 * 12) * 5, d = ri(20, 280); return num(`A bus leaves at ${T24(s)} and arrives at ${T24(s + d)} (24-hour clock). How many minutes does the trip take?`, big("🚌"), d, [
      "Count the full hours between the two times first.", "Change the hours to minutes and add the extra minutes. Be careful when the end minutes are smaller than the start minutes.", "Example: 09:40 to 11:10. 09:40 to 10:40 is 60 minutes, 10:40 to 11:10 is 30 more, so 90 minutes. Now do yours."]); }
    const h = ri(2, 9), now = ri(6 * 12, 17 * 12) * 5, dir = Math.random() < 0.5 ? 1 : -1;
    return mcq(`Ava lives in a place that is ${h} hours ${dir > 0 ? "ahead of" : "behind"} Leo’s town. At Leo’s place it is ${T24(now)}. What time is it at Ava’s place?`, big("🌍"), T24(now + dir * h * 60), [T24(now - dir * h * 60), T24(now + dir * (h + 1) * 60), T24(now + dir * (h - 1) * 60)], [
      "Ahead means their clock shows a later time. Behind means an earlier time.", "Add or subtract the hours from the friend’s time. Remember that after 23:59 the clock starts again at 00:00.", "Example: a place 3 hours ahead of 20:00 is at 23:00, and 5 hours ahead is at 01:00 the next day. Now do yours."]);
  };

  const avgSpeed = () => {
    const t = ri(0, 1);
    if (t === 0) {
      const pairs = [[30, 60], [40, 60], [20, 30], [60, 90], [30, 45], [40, 120], [10, 15], [20, 60]], [v1, v2] = pick(pairs), ans = 2 * v1 * v2 / (v1 + v2);
      const o = { text: `A car drives to a town at ${v1} km/h and drives back the same way at ${v2} km/h. What is its average speed for the whole round trip, in km/h?`, visual: big("🚗"), answer: ans,
        hints: ["Average speed is total distance divided by total time, not the middle of the two speeds.", "Pick a handy distance for the one-way trip (a number both speeds divide into). Work out the time for each half and add them up.", "Example: 2 trips of 60 km at 30 and 60 km/h. Times: 2 h and 1 h, total 3 h for 120 km, so 40 km/h. Now do yours."],
        wrong: g => (Number(g) === (v1 + v2) / 2 ? "That is the plain middle of the two speeds. The car spends more time going slowly, so the average speed is lower." : null) };
      return o;
    }
    for (;;) {
      const t1 = ri(1, 4), t2 = ri(1, 4), v1 = ri(3, 12) * 5, v2 = ri(3, 12) * 5, d = v1 * t1 + v2 * t2;
      if (d % (t1 + t2)) continue;
      return num(`A cyclist rides ${v1 * t1} km in ${t1} hour${t1 > 1 ? "s" : ""}, then ${v2 * t2} km in ${t2} hour${t2 > 1 ? "s" : ""}. What is the average speed for the whole ride, in km/h?`, big("🚴"), d / (t1 + t2), [
        "Average speed uses the total distance and the total time.", "Add the two distances, add the two times, then divide distance by time.", "Example: 60 km in 2 h, then 30 km in 1 h. 90 km in 3 h is 30 km/h. Now do yours."]);
    }
  };

  const mixtures = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 4), b = ri(2, 5), k = ri(2, 6); if (a === b) return mixtures(); return num(`A fruit drink is made with ${a} part${a > 1 ? "s" : ""} syrup to ${b} parts water. You make ${k * (a + b)} cups of drink. How many cups of syrup is that?`, big("🥤"), k * a, [
      "Add the parts to find how many equal parts the whole drink has.", "Find how many cups are in one part, then multiply by the syrup parts.", "Example: 1 part syrup to 3 parts water in 12 cups. 4 parts, so 3 cups each, so 3 cups of syrup. Now do yours."]); }
    if (t === 1) { const p = pick([5, 10, 20, 25, 40]), v = pick([100, 200, 300, 400, 500]); return num(`A salt solution is ${p}% salt by weight. How many grams of salt are in ${v} g of the solution?`, big("🧂"), p * v / 100, [
      "Percent means “out of every hundred”.", "Find a hundredth or a tenth of the amount and scale up to the percent you need.", "Example: 20% of 150 g: 10% is 15 g so 20% is 30 g. Now do yours."]); }
    const p = pick([20, 40, 50, 60]), a = pick([50, 100, 200]), b = pick([50, 100, 200]), tot = (p * a) / (a + b);
    if (!Number.isInteger(tot)) return mixtures();
    return num(`${a} mL of juice that is ${p}% fruit is mixed with ${b} mL of plain water. What percent of the mixture is now fruit?`, big("🧃"), tot, [
      "The amount of fruit does not change when you add water.", "Work out the amount of fruit in the first juice. Then divide it by the new total amount of liquid and turn it into a percent.", "Example: 100 mL of 40% juice has 40 mL fruit. Adding 100 mL of water gives 200 mL, and 40 ÷ 200 = 20%. Now do yours."]);
  };

  const twoEvents = () => {
    const items = [
      ["You flip a coin and roll a fair die. What is the chance of heads AND a 6?", "1/12", ["1/6", "1/8", "1/2", "2/3"]],
      ["You flip a coin and roll a fair die. What is the chance of tails AND an even number?", "1/4", ["1/2", "1/12", "1/3", "2/5"]],
      ["You flip two fair coins. What is the chance of two heads?", "1/4", ["1/2", "1/3", "1/8", "2/3"]],
      ["You roll two fair dice. What is the chance of two sixes?", "1/36", ["1/12", "1/6", "1/18", "1/3"]],
      ["You roll a fair die and flip a coin. What is the chance of a number bigger than 4 AND heads?", "1/6", ["1/3", "1/12", "1/2", "2/5"]],
      ["You flip three fair coins. What is the chance of three tails?", "1/8", ["1/6", "1/4", "3/8", "1/3"]],
      ["You roll two fair dice. What is the chance that both show an even number?", "1/4", ["1/2", "1/9", "1/3", "1/6"]],
      ["A spinner has 4 equal parts coloured red, blue, green, yellow. You spin it twice. What is the chance of red both times?", "1/16", ["1/8", "1/4", "1/2", "1/12"]]];
    const [q, r, w] = pick(items);
    return mcq(q, big("🎲"), r, w, [
      "Look at each event on its own first. The two events do not affect each other.", "Find the chance of the first event, the chance of the second event, and combine them for “and”. Is it adding or multiplying?",
      "Example: the chance of heads AND a 3 on a die is 1/2 of 1/6 = 1/12, the chances multiply. Now do yours with a different event."]);
  };

  const fairGames = () => {
    const sums = (pred) => { let c = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (pred(a + b, a, b)) c++; return c; };
    const G = [["the sum is 7", s => s === 7], ["the sum is 6 or 8", s => s === 6 || s === 8], ["the sum is 2, 3 or 4", s => s <= 4], ["both dice show the same number", (s, a, b) => a === b],
      ["the sum is 10, 11 or 12", s => s >= 10], ["the sum is 5", s => s === 5], ["the sum is 9 or more", s => s >= 9], ["the sum is an odd number", s => s % 2 === 1], ["the sum is 12", s => s === 12], ["the sum is 4 or less", s => s <= 4]];
    for (;;) {
      const g1 = pick(G), g2 = pick(G); if (g1 === g2) continue;
      const n1 = sums(g1[1]), n2 = sums(g2[1]); if (n1 > 18 && n2 > 18) continue;
      const [x, y] = names2();
      const right = n1 === n2 ? "Equal chances" : n1 > n2 ? x : y;
      return mcq(`${x} and ${y} roll two dice. ${x} scores a point if ${g1[0]}. ${y} scores a point if ${g2[0]}. Who is more likely to score on a roll?`, big("🎲🎲"), right, [x, y, "Equal chances"], [
        "List all the ways to get each result. Two dice give 36 rolls in all.", "Count the rolls that give each player a point and compare the two counts.",
        "Example: “sum is 3” can happen as 1+2 or 2+1 (2 ways); “sum is 4” can happen as 1+3, 2+2, 3+1 (3 ways). So 4 is more likely than 3. Now do yours."]);
    }
  };
  const names2 = () => { const a = pick(NM); let b = pick(NM); while (b === a) b = pick(NM); return [a, b]; };

  const roundTable = () => {
    const t = ri(0, 1);
    if (t === 0) { const n = ri(4, 7); return num(`${n} friends sit around a round table. Only who sits next to whom matters, not which chair they pick (turning the whole table does not make a new seating). How many different seatings are there?`, big("🍽️"), fact(n - 1), [
      "Fix one friend in a seat. Now the others have a fixed place to compare with.", "After the first friend sits, arrange the other friends in a line around the table. Multiply the choices for each seat.", "Example: 4 friends: fix one, the other 3 can sit in 3 × 2 × 1 = 6 ways. Now do yours."]); }
    const n = 2 * ri(4, 10), k = ri(1, n), opp = k + n / 2 > n ? k - n / 2 : k + n / 2;
    return num(`${n} chairs numbered 1 to ${n} are placed evenly around a round table. Who sits directly opposite the person in chair ${k}? Give the chair number.`, big("🪑"), opp, [
      "Opposite means exactly half way round the table.", "Count half of the chairs forward from chair k. If you go past the last chair, carry on from chair 1.", "Example: 10 chairs. Opposite chair 3 is 5 chairs away: chair 8. Opposite chair 7 is 5 away past 10: chair 2. Now do yours."]);
  };

  const pascalRows = (() => { const rows = [[1]]; for (let r = 1; r <= 10; r++) { const p = rows[r - 1], row = [1]; for (let i = 1; i < r; i++) row.push(p[i - 1] + p[i]); row.push(1); rows.push(row); } return rows; })();
  const pascal = () => {
    const t = ri(0, 2);
    if (t === 0) { const r = ri(4, 8), k = ri(1, r - 1), up = pascalRows[r - 1].map((v, i) => `${v}`); return num(`In Pascal’s triangle each number is the sum of the two numbers above it. One row is ${up.join(", ")}. What is number ${k + 1} (counting from the left) in the NEXT row?`, big("🔺"), pascalRows[r][k], [
      "Each inside number is made from the two numbers just above it, to the left and right.", "Add the number above-left and the number above-right. For the number in place k + 1 these sit in places k and k + 1 of the row above.", "Example: row 1, 3, 3, 1 gives the next row 1, 4, 6, 4, 1. The 3rd number is 3 + 3 = 6. Now do yours."]); }
    if (t === 1) { const r = ri(4, 9); return num(`The numbers in row ${r} of Pascal’s triangle (row 0 is just 1, row 1 is 1, 1, and so on) add up to what total?`, big("🔺"), 2 ** r, [
      "Add the numbers in the first few rows and look at the totals: 1, 2, 4...", "Each row total is double the one before it. How many doublings from row 0?", "Example: row 3 is 1, 3, 3, 1 = 8, which is 2 doubled 3 times. Now do yours."]); }
    const n = ri(4, 8); return num(`In Pascal’s triangle, the number in position 2 of row ${n} (counting 0, 1, 2, ... from the left) tells you how many ways to pick 2 things from ${n}. How many ways are there to pick 2 kids from ${n} kids?`, big("🧒"), comb(n, 2), [
      "Picking 2 from a group where order does not matter.", "Each kid pairs up with each other kid, but a pair counted from both sides is the same pair.", "Example: 3 kids A, B, C make 3 pairs: AB, AC, BC. Now do yours."]);
  };

  const numTricks = () => {
    const t = ri(0, 2);
    if (t === 0) { let a, c; do { a = ri(3, 9); c = ri(1, a - 2); } while (a - c < 2); const b = ri(0, 9), n = a * 100 + b * 10 + c, r = c * 100 + b * 10 + a; return num(`Take ${n}. Reverse its digits to get ${r}. Subtract the smaller number from the bigger one. What do you get?`, big("🎩"), n - r, [
      "Just do the subtraction carefully. Look at what happens to the middle digit.", "The middle digits cancel out. The answer is always in the ninety-nine times table.", "Example: 741 − 147 = 594 (and 594 = 99 × 6). Now do yours."]); }
    if (t === 1) { const a = ri(2, 9), b = ri(2, 9); if (a === b) return numTricks(); return num(`Add the number ${a}${b} to its reverse ${b}${a}. What is the total?`, big("🎩"), 10 * a + b + 10 * b + a, [
      "Add them as normal numbers. Then look at the total: is it in the 11 times table?", "The total always equals eleven times (the sum of the digits). Use that as a check.", "Example: 36 + 63 = 99 = 11 × 9, and 3 + 6 = 9. Now do yours."]); }
    const x = ri(8, 40), a = ri(3, 9), c = ri(1, a - 1); return num(`Think of ${x}. Add ${a}. Double it. Subtract ${2 * c}. Halve it. Then subtract your starting number. What do you end up with?`, big("🎩"), a - c, [
      "Do the steps one by one. Then ask yourself whether the answer would change if you started with a different number.",
      "Try the same steps with a tiny starting number of your own. The starting number cancels out at the end.",
      "Example: start with 5, add 4 gives 9, double gives 18, subtract 2 gives 16, halve gives 8, take away 5 leaves 3. Starting with 20 also leaves 3. Now do yours."]);
  };

  // ======================= LEVEL 15 =======================
  const signs = () => {
    const t = ri(0, 3);
    if (t === 0) { const a = ri(2, 9), b = ri(2, 9), s = pick([[-1, 1], [1, -1], [-1, -1]]), x = s[0] * a, y = s[1] * b;
      return mcq(`What is ${neg(x)} × ${y < 0 ? "(" + neg(y) + ")" : y}?`, big("✖️"), ch(x * y), [ch(-x * y), ch(x + y), ch(x - y)], [
        "First decide if the answer is positive or negative. Then multiply the sizes.", "Same signs give a positive answer. Different signs give a negative answer.", "Example: −3 × 4 = −12 (different signs), and −3 × (−4) = 12 (same signs). Now do yours."]); }
    if (t === 1) { const q = ri(2, 9), r = ri(2, 9), s = pick([[-1, 1], [1, -1], [-1, -1]]), p = s[0] * q * r, d = s[1] * q;
      return mcq(`What is ${neg(p)} ÷ ${d < 0 ? "(" + neg(d) + ")" : d}?`, big("➗"), ch(p / d), [ch(-p / d), ch(r + q), ch(p - d)], [
        "Division follows the same sign rules as multiplication.", "Work out the size of the answer first by dividing the sizes. Then decide on the sign: same signs or different signs?", "Example: −12 ÷ 3 = −4 and −12 ÷ (−3) = 4. Now do yours."]); }
    if (t === 2) { const n = ri(2, 5), m = ri(0, 2), pos = n % 2 === 0, parts = shuf([...Array.from({ length: n }, () => "(−" + ri(2, 5) + ")"), ...Array.from({ length: m }, () => String(ri(2, 5)))]);
      return mcq(`Is this product positive or negative? ${parts.join(" × ")}`, big("✖️"), pos ? "positive" : "negative", ["positive", "negative"], [
        "You do not need to work out the exact number. Count how many minus signs there are.", "Each pair of minus signs cancels out. Is there one minus sign left over?", "Example: (−2) × 3 × (−5) has two negatives, so it is positive. (−2) × (−3) × (−5) has three, so it is negative. Now do yours."]); }
    const n = ri(2, 9), brackets = Math.random() < 0.5;
    return mcq(brackets ? `What is (−${n})²?` : `What is −${n}²? (Square the ${n} first, then apply the minus.)`, big("✖️"), ch(brackets ? n * n : -n * n), [ch(brackets ? -n * n : n * n), ch(-2 * n), ch(2 * n)], [
      "Squaring means multiplying a number by itself. Look at whether the minus sign is inside the squaring.", "If the minus is inside the brackets, it gets squared too. If it is outside, it is applied after.", "Example: (−3)² = (−3) × (−3) = 9, but −3² = −(3 × 3) = −9. Now do yours."]);
  };

  const absVal = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(2, 40); return num(`What is the absolute value of −${n}, written |−${n}|?`, big("|x|"), n, [
      "Absolute value is the distance from zero, so it is never negative.", "Ignore the sign. How far from zero is the number?", "Example: |−7| = 7 and |7| = 7. Both are 7 steps from zero. Now do yours."]); }
    if (t === 1) { const a = ri(2, 20), b = ri(2, 20); return num(`How far apart are −${a} and ${b} on the number line?`, big("↔️"), a + b, [
      "They are on opposite sides of zero.", "Add the distance from the first number to zero and from zero to the second number.", "Example: −3 and 5 are 3 + 5 = 8 apart. Now do yours."]); }
    if (t === 2) { const k = ri(2, 9); return num(`How many whole numbers x (counting positive, negative and zero) make |x| < ${k} true?`, big("|x|"), 2 * k - 1, [
      "|x| < k means x is closer to zero than k steps.", "List the whole numbers on each side of zero, then add zero itself.", "Example: |x| < 3 allows −2, −1, 0, 1, 2, which is 5 numbers. Now do yours."]); }
    const set = new Set(); while (set.size < 4) set.add(ri(-12, 12)); const arr = [...set];
    if (new Set(arr.map(Math.abs)).size < 4 || arr.includes(0)) return absVal();
    const right = arr.reduce((p, c) => (Math.abs(c) > Math.abs(p) ? c : p));
    return mcq("Which number has the GREATEST absolute value?", big(arr.map(neg).join(" &nbsp; "), 1.5), ch(right), arr.map(ch), [
      "Absolute value only cares about the size, not about the sign.", "Which number is the furthest away from zero on the number line?", "Example: of −8, 3, 5 the one with the greatest absolute value is −8, because it is 8 steps from zero. Now do yours."]);
  };

  const twoStep = () => {
    const t = ri(0, 4), x = ri(2, 15);
    if (t === 0) { const a = ri(2, 9), b = ri(1, 20); return num(`Solve for x: ${a}x + ${b} = ${a * x + b}`, big("🔤"), x, [
      "Undo the equation one step at a time, in the opposite order to how it was built.", "Take away the number being added, then divide by the number in front of x.", "Example: 3x + 4 = 19. Take away 4: 3x = 15. Divide by 3: x = 5. Now do yours."]); }
    if (t === 1) { const a = ri(2, 9), b = ri(1, 20); return num(`Solve for x: ${a}x − ${b} = ${a * x - b}`, big("🔤"), x, [
      "x is multiplied and then something is taken away. Undo them in reverse order.", "Add the subtracted number to both sides, then divide by the number in front of x.", "Example: 4x − 3 = 17. Add 3: 4x = 20. Divide by 4: x = 5. Now do yours."]); }
    if (t === 2) { const a = ri(2, 6), b = ri(1, 12); return num(`Solve for x: x ÷ ${a} + ${b} = ${x + b}`, big("🔤"), x * a, [
      "x is divided and then something is added. Undo them in reverse order.", "Take away the added number, then multiply both sides by the number x was divided by.", "Example: x ÷ 2 + 3 = 8. Take away 3: x ÷ 2 = 5. Multiply by 2: x = 10. Now do yours."]); }
    if (t === 3) { const a = ri(2, 6), b = ri(1, 9); return num(`Solve for x: ${a}(x + ${b}) = ${a * (x + b)}`, big("🔤"), x, [
      "The brackets are multiplied by a number. Undo that first.", "Divide both sides by the number outside the brackets, then take away what is added inside.", "Example: 3(x + 2) = 24. Divide by 3: x + 2 = 8. Take away 2: x = 6. Now do yours."]); }
    const f = ri(2, 5), r = ri(2, 4); return num(`A taxi charges $${f} to start plus $${r} for every km. A trip costs $${f + r * x}. How many km was the trip?`, big("🚕"), x, [
      "Take away the part of the price that is charged only once.", "What is left is the price for the kilometres. Divide it by the price of one km.", "Example: a ride is $2 to start plus $3 per km and costs $14. 14 − 2 = 12 and 12 ÷ 3 = 4 km. Now do yours."]);
  };

  const fracSums = () => {
    const t = ri(0, 2), dens = [[2, 3], [2, 4], [3, 6], [4, 6], [3, 4], [2, 5], [5, 10], [3, 5], [4, 8], [6, 9]];
    const [d1, d2] = pick(dens), n1 = ri(1, d1 - 1), n2 = ri(1, d2 - 1), L2 = lcm(d1, d2), sum = n1 * (L2 / d1) + n2 * (L2 / d2);
    if (t === 0) { return mcq(`What is ${n1}/${d1} + ${n2}/${d2}?`, big("➕"), frs(sum, L2), [frs(n1 + n2, d1 + d2), frs(n1 + n2, d1 * d2), frs(sum + 1, L2), frs(sum - 1, L2)], [
      "You can only add fractions when the pieces are the same size.", "Change both fractions to the same bottom number, then add the tops only. Simplify if you can.", "Example: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Now do yours."]); }
    if (t === 1) { const x = n1 / d1, y = n2 / d2; if (x === y) return fracSums(); const right = x > y ? `${n1}/${d1}` : `${n2}/${d2}`;
      return mcq(`Which fraction is bigger: ${n1}/${d1} or ${n2}/${d2}?`, big("⚖️"), right, [`${n1}/${d1}`, `${n2}/${d2}`], [
        "Different bottom numbers mean different sized pieces, so you cannot just compare the tops.", "Change both fractions to the same bottom number, or turn them into decimals, then compare.", "Example: 2/3 or 3/5? 10/15 and 9/15, so 2/3 is bigger. Now do yours."]); }
    const a = pick([2, 3, 4, 5]), b = pick([2, 3, 4, 6]); if (a === b) return fracSums(); const eaten = lcm(a, b), leftN = eaten - eaten / a - eaten / b;
    if (leftN <= 0) return fracSums();
    return mcq(`A pizza is shared: Mia eats 1/${a} of it and Leo eats 1/${b} of it. What fraction of the whole pizza is left?`, big("🍕"), frs(leftN, eaten), [frs(eaten - eaten / a, eaten), frs(eaten - eaten / b, eaten), frs(2, a + b)], [
      "Find the total eaten first. Make the pieces the same size.", "Change both fractions to the same bottom number, add what was eaten, and subtract from a whole pizza.", "Example: 1/2 and 1/3 eaten is 3/6 + 2/6 = 5/6, so 1/6 is left. Now do yours."]);
  };

  const propTable = () => {
    const t = ri(0, 2), k = ri(2, 9), xs = [1, 2, 3, 4];
    const tb = `<table style="margin:auto;border-collapse:collapse;font-size:1.2em"><tr><td style="border:2px solid #888;padding:3px 10px"><b>x</b></td>${xs.map(x => `<td style="border:2px solid #888;padding:3px 10px">${x}</td>`).join("")}</tr><tr><td style="border:2px solid #888;padding:3px 10px"><b>y</b></td>${xs.map(x => `<td style="border:2px solid #888;padding:3px 10px">${k * x}</td>`).join("")}</tr></table>`;
    if (t === 0) { const n = ri(6, 12); return num(`In this table y is proportional to x. What is y when x = ${n}?`, tb, k * n, [
      "In a proportional table, y is always the same number of times x.", "Find the number that x is multiplied by to get y, then multiply it by the new x.", "Example: x = 1, 2, 3 and y = 5, 10, 15. y is 5 times x, so when x = 8, y = 40. Now do yours."]); }
    if (t === 1) return num("In this table y is proportional to x. What is the constant k in the rule y = kx?", tb, k, [
      "k is the number you multiply x by to get y.", "Divide any y by the x beside it. It is the same for every column.", "Example: x = 2 and y = 14 gives k = 14 ÷ 2 = 7. Now do yours."]);
    const x1 = ri(2, 6), x2 = x1 + ri(1, 5);
    return num(`y is proportional to x. When x = ${x1}, y = ${k * x1}. What is y when x = ${x2}?`, big("📈"), k * x2, [
      "Proportional means y = k × x for one fixed k.", "Use the pair you know to find k. Then use k with the new x.", "Example: x = 4 gives y = 12, so k = 3. When x = 7, y = 21. Now do yours."]);
  };

  const percentApps = () => {
    const t = ri(0, 3);
    if (t === 0) { const p = pick([5, 10, 20, 25]), c = 20 * ri(2, 15); return num(`A shirt costs $${c} before tax. Sales tax is ${p}%. What is the total price with tax, in dollars?`, big("🛍️"), c * (100 + p) / 100, [
      "Find the tax first as a percent of the price.", "Add the tax to the price before tax.", "Example: a $40 toy with 10% tax: tax is $4, total $44. Now do yours."]); }
    if (t === 1) { const P = 100 * ri(1, 10), r = pick([2, 3, 4, 5, 6]), y = ri(2, 5); return num(`You put $${P} in a bank that pays ${r}% simple interest each year. How many dollars of interest do you earn in ${y} years?`, big("🏦"), P * r * y / 100, [
      "Simple interest is the same amount every year.", "Find one year of interest (a percent of the money), then multiply by the number of years.", "Example: $200 at 5% for 3 years: $10 each year, so $30. Now do yours."]); }
    if (t === 2) { const c = 10 * ri(2, 20), p = pick([20, 30, 40, 50]); return num(`A shop buys a bag for $${c} and adds a ${p}% markup. What is the selling price in dollars?`, big("👜"), c * (100 + p) / 100, [
      "A markup is extra money added on top of what the shop paid.", "Find the markup as a percent of the cost and add it to the cost.", "Example: cost $50 with a 20% markup: markup is $10, selling price is $60. Now do yours."]); }
    const c = 20 * ri(2, 10), d = pick([10, 20, 25, 50]), tx = 10; return num(`A coat costs $${c}. It has ${d}% off. Then ${tx}% tax is added to the sale price. What is the final price in dollars?`, big("🧥"), c * (100 - d) / 100 * (100 + tx) / 100, [
      "Do the discount first, then the tax on the new price.", "The tax is a percent of the sale price, not of the original price.", "Example: a $100 item with 20% off is $80. Then 10% tax adds $8: $88. Now do yours."]);
  };

  const sciNot = () => {
    const t = ri(0, 2);
    if (t === 0) { const m = ri(11, 99), e = ri(3, 6), v = m * 10 ** (e - 1); return num(`Write as an ordinary number: ${(m / 10).toFixed(1)} × 10<sup>${e}</sup>`, big("10<sup>n</sup>"), v, [
      "10 to the power n is a 1 followed by n zeros.", "Multiplying by this moves the decimal point to the right by n places. Fill any gaps with zeros.", "Example: 2.5 × 10<sup>3</sup> = 2500, and 7.1 × 10<sup>2</sup> = 710. Now do yours."]); }
    if (t === 1) { const d = ri(1, 9), f = ri(1, 9), k = ri(3, 6), v = (d * 10 + f) * 10 ** (k - 1), good = `${d}.${f} × 10<sup>${k}</sup>`;
      return mcq(`Which is ${v.toLocaleString("en-US")} written in scientific notation?`, big("10<sup>n</sup>"), good, [`${d}.${f} × 10<sup>${k + 1}</sup>`, `${d}${f} × 10<sup>${k - 1}</sup>`, `${d}.${f} × 10<sup>${k - 1}</sup>`], [
        "In scientific notation the first number is at least 1 and less than 10.", "Place the decimal point after the first digit. The power of 10 counts how many places the point had to move.", "Example: 52,000 = 5.2 × 10<sup>4</sup> because the point moves 4 places. Now do yours."]); }
    const e1 = ri(3, 7), e2 = e1 + pick([-1, 1]), a = ri(11, 99) / 10, b = ri(11, 99) / 10, v1 = a * 10 ** e1, v2 = b * 10 ** e2, A = `${a.toFixed(1)} × 10<sup>${e1}</sup>`, B = `${b.toFixed(1)} × 10<sup>${e2}</sup>`;
    if (v1 === v2) return sciNot();
    return mcq("Which number is bigger?", big("10<sup>n</sup>"), v1 > v2 ? A : B, [A, B], [
      "Compare the powers of ten first. A bigger power usually means a much bigger number.", "If the powers differ by one, the number with the bigger power is ten times as big before you multiply by the front number. Check the front numbers too.", "Example: 9.5 × 10<sup>3</sup> = 9500 and 1.2 × 10<sup>4</sup> = 12000, so the second is bigger. Now do yours."]);
  };

  const coordPlane = () => {
    const t = ri(0, 3), P = (x, y) => `(${neg(x)}, ${neg(y)})`;
    if (t === 0) { const x = pick([-1, 1]) * ri(1, 8), y = pick([-1, 1]) * ri(1, 8), q = x > 0 ? (y > 0 ? "first" : "fourth") : (y > 0 ? "second" : "third"); return mcq(`In which quadrant is the point ${P(x, y)}? (Quadrants are numbered anticlockwise from the top right: first, second, third, fourth.)`, big("🧭"), q, ["first", "second", "third", "fourth"], [
      "The number before the comma is across (left or right) and the number after it is up or down.", "Check the signs. Positive across means right and positive up means up. Quadrants count anticlockwise starting at the top right.", "Example: (−3, 2) is left and up, which is the second quadrant (top left). Now do yours."]); }
    if (t === 1) { const axis = pick(["x-axis", "y-axis"]), right = axis === "x-axis" ? "only the second number (y)" : "only the first number (x)";
      return mcq(`A point is reflected (flipped) across the ${axis}. Which part of its coordinates changes sign?`, big("🪞"), right, ["only the first number (x)", "only the second number (y)", "both numbers", "neither number"], [
        axis === "x-axis" ? "The x-axis is the flat line going left and right. Flipping over it sends the point up or down." : "The y-axis is the line going up and down. Flipping over it sends the point left or right.",
        "Think about which direction the point moves: across, or up and down. That is the number that gets its opposite sign.", "Example: (2, 3) flipped across the x-axis is (2, −3), and across the y-axis is (−2, 3). Now do yours with the axis in the question."]); }
    if (t === 2) { const x1 = -ri(2, 9), x2 = ri(2, 9), y = ri(-8, 8); return num(`How far is it from the point ${P(x1, y)} to the point ${P(x2, y)}?`, big("📍"), x2 - x1, [
      "The points are on the same horizontal line, so only the across numbers matter.", "Count from the left point to the right point, passing through zero. Add the two distances.", "Example: from (−2, 1) to (5, 1) is 2 + 5 = 7. Now do yours."]); }
    const w = ri(2, 8), h = ri(2, 8), x = -ri(1, 5), y = -ri(1, 5);
    return mcq(`Three corners of a rectangle are ${P(x, y)}, ${P(x + w, y)} and ${P(x, y + h)}. Where is the fourth corner?`, big("▭"), P(x + w, y + h), [P(x + w, y - h), P(x - w, y + h), P(x + h, y + w), P(x + w + 1, y + h)], [
      "A rectangle has two corners with the same across number and two corners with the same up number.", "The missing corner takes the across number from one corner and the up number from the other.", "Example: corners (1, 1), (4, 1) and (1, 3) have the fourth corner at (4, 3). Now do yours."]);
  };

  const recapture = () => {
    const t = ri(0, 1);
    if (t === 0) { const R = ri(2, 5), C = R * ri(3, 8), M = ri(10, 40); return num(`Rangers catch and tag ${M} fish in a lake and let them go. Later they catch ${C} fish, and ${R} of them have tags. About how many fish live in the lake?`, big("🐟"), M * C / R, [
      "The tagged fish in the second catch show what share of all the fish was tagged.", "That share is the same as the tagged fish out of all fish: the first catch is the same fraction of the whole lake.", "Example: 10 tagged. Later catch 20, of which 4 are tagged: 4 out of 20 is 1/5, so 10 is 1/5 of the lake: 50 fish. Now do yours."]); }
    const s = pick([20, 25, 40, 50]), like = s / 5 * ri(1, 4), pop = s * ri(4, 20);
    return num(`${NM[ri(0, 5)]} asks ${s} random students if they like soccer, and ${like} say yes. There are ${pop} students in the school. About how many students like soccer?`, big("⚽"), like * pop / s, [
      "A random sample is a small model of the whole school.", "Find the fraction of the sample who said yes. Use the same fraction for the whole school.", "Example: 20 asked, 5 yes, 80 students in school: 1/4 of 80 = 20 students. Now do yours."]);
  };

  const longRun = () => {
    const t = ri(0, 2);
    if (t === 0) { const k = pick([2, 3, 4, 5, 6]), w = ri(1, 5) * 3 * 2, n = k * ri(5, 20); return num(`In a game you win $${w} with chance 1/${k} and nothing otherwise. You play ${n} times. About how many dollars do you win in total?`, big("🎯"), n * w / k, [
      "In the long run you win about 1 time in every k plays.", "Find how many wins to expect, then multiply by the prize.", "Example: chance 1/5 of winning $10, 50 plays: 10 wins, $100. Now do yours."]); }
    if (t === 1) { const n = 2 * ri(20, 100); return num(`A fair coin is flipped ${n} times. About how many heads do you expect?`, big("🪙"), n / 2, [
      "A fair coin lands heads about half the time in the long run.", "Take that fraction of the number of flips.", "Example: 60 flips gives about 30 heads. Now do yours."]); }
    const n = 6 * ri(5, 40); return num(`A fair die is rolled ${n} times. About how many times do you expect a 5 or a 6?`, big("🎲"), n / 3, [
      "Count how many of the six faces count as a win.", "That many out of six is the chance. Take that fraction of the rolls.", "Example: 60 rolls, a win on 1 or 2 (2 out of 6 = 1/3): about 20 wins. Now do yours."]);
  };

  const noReplace = () => {
    const r = ri(3, 5), b = ri(2, 4), n = r + b, t = ri(0, 2);
    if (t === 0) return mcq(`A bag has ${r} red and ${b} blue marbles. You take one at random, put it back, then take another. What is the chance that both are red?`, big("🔴"), frs(r * r, n * n), [frs(r * (r - 1), n * (n - 1)), frs(r, n), frs(2 * r, n * n)], [
      "Putting the marble back means the second pick is the same as the first.", "Find the chance of red once, then multiply it by itself.", "Example: 2 red and 1 blue, with replacement: (2/3) × (2/3) = 4/9. Now do yours."]);
    if (t === 1) return mcq(`A bag has ${r} red and ${b} blue marbles. You take one at random and do NOT put it back, then take another. What is the chance that both are red?`, big("🔴"), frs(r * (r - 1), n * (n - 1)), [frs(r * r, n * n), frs(r, n), frs(r * (r - 1), n * n)], [
      "After the first marble is kept out, there are fewer marbles in the bag.", "Both the number of red marbles and the total go down by one for the second pick. Multiply the two chances.", "Example: 2 red and 1 blue, no replacement: (2/3) × (1/2) = 1/3. Now do yours."]);
    return mcq(`A bag has ${r} red and ${b} blue marbles. You take out a red marble and keep it out. What is the chance that the next marble is also red?`, big("🔴"), frs(r - 1, n - 1), [frs(r, n), frs(r - 1, n), frs(r, n - 1)], [
      "How many red marbles and how many marbles in all are in the bag now?", "One red marble is gone, so both the red count and the total count are one smaller.", "Example: 3 red and 2 blue, one red taken: 2 red out of 4, so 2/4 = 1/2. Now do yours."]);
  };

  const parallelAng = () => {
    const a = pick([40, 50, 60, 65, 70, 75, 110, 115, 120, 130, 140]), t = ri(0, 4);
    const base = `Two parallel lines are crossed by a third line. One angle is ${a}°.`;
    const items = [
      [`${base} What is the size of the <b>alternate</b> angle (the Z-shape angle on the other side)?`, a],
      [`${base} What is the size of the <b>corresponding</b> angle (the matching angle in the same position at the other crossing, an F shape)?`, a],
      [`${base} What is the size of the <b>co-interior</b> angle (the angle inside the lines on the same side, a C shape)?`, 180 - a],
      [`${base} What is the size of the angle next to it on the straight line?`, 180 - a],
      [`${base} What is the size of the <b>vertically opposite</b> angle (directly across the crossing point)?`, a]][t];
    return num(items[0], big("🛤️"), items[1], [
      "Picture the shape the two angles make: a Z, an F, a C, an X or a straight line.",
      "Remember the rule for this kind of angle pair when the lines are parallel: are the angles equal, or do they add up to a straight line?",
      "Example: if one angle is 55°, its Z-shape partner is also 55°, and its C-shape partner is 125°. Now do yours."]);
  };

  const extAngle = () => {
    const n = pick([5, 6, 8, 9, 10, 12, 15, 18]), t = ri(0, 2), e = 360 / n;
    if (t === 0) return num(`A regular polygon has ${n} equal sides. What is the size of each exterior angle, in degrees? (The outside turn at each corner.)`, big("⬡"), e, [
      "Walking round the whole shape you turn a full circle in total.", "The exterior angles are all equal and add up to one whole turn. Share the turn between the corners.", "Example: a regular 4-sided shape: 360 ÷ 4 = 90° at each corner. Now do yours."]);
    if (t === 1) return num(`What is the size of each inside (interior) angle of a regular polygon with ${n} sides, in degrees?`, big("⬡"), 180 - e, [
      "At each corner, the inside angle and the outside turn together make a straight line.", "Find the outside turn first (a whole turn shared between the corners), then subtract it from the straight-line total.", "Example: regular 6-sided shape: outside turn 60°, inside 180 − 60 = 120°. Now do yours."]);
    return num(`Each exterior angle of a regular polygon is ${e}°. How many sides does the polygon have?`, big("⬡"), n, [
      "All the exterior angles together make a whole turn.", "Divide the whole turn by the size of one exterior angle.", "Example: exterior angle 60° gives 360 ÷ 60 = 6 sides. Now do yours."]);
  };

  const circlePi = () => {
    const t = ri(0, 3), r = ri(2, 12);
    const tail = " Give your answer as a number of π (type just the number).";
    if (t === 0) return num(`A circle has radius ${r} cm. Its area is ____ × π square cm.${tail}`, big("⭕"), r * r, [
      "Area of a circle = π × radius × radius.", "Leave π as it is and work out radius × radius.", "Example: radius 5 gives an area of 25π. Now do yours."]);
    if (t === 1) return num(`A circle has diameter ${2 * r} cm. Its area is ____ × π square cm.${tail}`, big("⭕"), r * r, [
      "The area formula needs the radius, not the diameter.", "Halve the diameter to get the radius, then square it.", "Example: diameter 8 means radius 4, so the area is 16π. Now do yours."]);
    if (t === 2) return num(`A circle has radius ${r} cm. Its circumference is ____ × π cm.${tail}`, big("⭕"), 2 * r, [
      "Circumference = π × diameter.", "The diameter is twice the radius. Leave π as it is.", "Example: radius 6 gives a circumference of 12π. Now do yours."]);
    const R = ri(4, 12), q = ri(2, R - 1); return num(`A round path is a ring between two circles of radius ${R} m (outside) and ${q} m (inside). Its area is ____ × π square m.${tail}`, big("🛤️"), R * R - q * q, [
      "The ring is the big circle with the small circle cut out.", "Find the area of each circle in πs and subtract the small from the big.", "Example: outer radius 5, inner radius 3: 25π − 9π = 16π. Now do yours."]);
  };

  const scaleSim = () => {
    const t = ri(0, 2), k = ri(2, 5);
    if (t === 0) { const a = ri(2, 6), b = ri(3, 9); return num(`Two triangles are the same shape (similar). The first has sides ${a} cm and ${b} cm. In the second, the side matching ${a} cm is ${a * k} cm. How long is the side that matches ${b} cm?`, big("📐"), b * k, [
      "Similar shapes have all sides enlarged by the same scale factor.", "Find what the first side was multiplied by, then use it on the other side.", "Example: sides 3 and 4 become 9 and ?. The factor is 3, so the other side is 12. Now do yours."]); }
    if (t === 1) { const l = ri(2, 8), w = ri(2, 6); return num(`A ${l} cm by ${w} cm rectangle is enlarged with scale factor ${k}. What is the area of the enlarged rectangle in square cm?`, big("▭"), l * k * w * k, [
      "Both the length and the width are multiplied by the scale factor.", "Find the new length and new width, then multiply them. The area grows by the scale factor TWICE.", "Example: a 2 by 3 rectangle enlarged by 2 is 4 by 6, area 24. Now do yours."]); }
    const l = ri(2, 6), kk = Math.min(k, 3); return num(`A cube of side ${l} cm is enlarged with scale factor ${kk}. How many times as big is its volume?`, big("🧊"), kk ** 3, [
      "Length, width and height are all multiplied by the scale factor.", "Volume uses three measurements multiplied together, so the factor appears three times.", "Example: scale factor 2 on a cube: 2 × 2 × 2 = 8 times the volume. Now do yours."]);
  };

  const surfaceArea = () => {
    const t = ri(0, 3);
    if (t === 0) { const s = ri(2, 9); return num(`A cube has sides of ${s} cm. What is its total surface area in square cm?`, big("🧊"), 6 * s * s, [
      "A cube has the same square on each of its faces.", "Find the area of one face, then multiply by the number of faces.", "Example: a cube with sides 3 cm has faces of 9 and 6 faces, so 54 square cm. Now do yours."]); }
    if (t === 1) { const l = ri(2, 9), w = ri(2, 7), h = ri(2, 8); return num(`A box is ${l} cm long, ${w} cm wide and ${h} cm high. What is its total surface area in square cm?`, big("📦"), 2 * (l * w + l * h + w * h), [
      "A box has three pairs of matching faces: top and bottom, front and back, left and right.", "Find the area of one face from each pair, add them, then double the total.", "Example: a 2 by 3 by 4 box: 6 + 8 + 12 = 26, doubled is 52. Now do yours."]); }
    if (t === 2) { const l = ri(3, 9), w = ri(2, 7), h = ri(2, 8); return num(`An open box (no lid) is ${l} cm long, ${w} cm wide and ${h} cm high. How many square cm of card are needed to make it?`, big("📦"), l * w + 2 * l * h + 2 * w * h, [
      "Without a lid there is one fewer face.", "Count the bottom once and the four sides: two long sides and two short sides.", "Example: an open 3 by 2 by 4 box: bottom 6, long sides 2 × 12, short sides 2 × 8 gives 46. Now do yours."]); }
    const s = ri(2, 6), cans = ri(2, 5); return num(`A cube with sides of ${s} cm is painted on all faces. One tin covers ${6 * s * s * cans} square cm. How many such cubes can one tin paint?`, big("🎨"), cans, [
      "Find the area one cube needs painted.", "Divide the area one tin covers by the area of one cube.", "Example: a cube of side 2 needs 24 square cm. A tin covering 120 paints 120 ÷ 24 = 5 cubes. Now do yours."]);
  };

  const oddSquares = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(4, 14), odds = Array.from({ length: n }, (_, i) => 2 * i + 1); return num(`What is ${odds.slice(0, 4).join(" + ")} + ... + ${odds[n - 1]}? (All the odd numbers from 1 up to ${odds[n - 1]}.)`, big("🟦"), n * n, [
      "Try adding the first two odd numbers, then the first three, then the first four. Look at the totals.", "The totals are special numbers. Count how many odd numbers you added and see how that links to the total.", "Example: 1 + 3 + 5 + 7 = 16, which is 4 × 4 (four odd numbers). Now do yours."]); }
    if (t === 1) { const n = ri(5, 15); return num(`The sum of the first n odd numbers is ${n * n}. What is n?`, big("🟦"), n, [
      "The sum of the first few odd numbers follows a pattern. Try adding the first two, then the first three, and so on.", "Those totals are square numbers. Which number multiplied by itself gives the sum?", "Example: if the sum is 49, then n = 7 because 7 × 7 = 49. Now do yours."]); }
    if (t === 2) { const n = ri(6, 30); return num(`What is ${n} × ${n} − ${n - 1} × ${n - 1}? Find a quick way.`, big("🟦"), 2 * n - 1, [
      "Try the same thing with small neighbouring numbers. What kind of numbers do you get?", "Each difference between neighbouring squares is an odd number. It is the number just below twice the bigger one.", "Example: 8² − 7² = 64 − 49 = 15 = 2 × 8 − 1. Now do yours."]); }
    const k = ri(5, 25); return num(`What is 2 + 4 + 6 + ... + ${2 * k}? (All the even numbers from 2 up to ${2 * k}.)`, big("🟦"), k * (k + 1), [
      "Pair up the numbers: the first with the last, the second with the second-to-last.", "Every pair has the same total. Count the pairs.", "Example: 2 + 4 + 6 + 8 = (2 + 8) + (4 + 6) = 10 + 10 = 20. Now do yours."]);
  };

  const counterEx = () => {
    const items = [
      ["Every prime number is odd.", "2", ["3", "5", "7", "11"], "A prime is only divisible by 1 and itself."],
      ["Every multiple of 3 is odd.", "6", ["9", "15", "21", "27"], "A multiple of 3 is 3 times a whole number."],
      ["If a number divides by 6, it also divides by 12.", "18", ["24", "36", "48", "60"], "Check which number divides by 6 but not by 12."],
      ["If a number divides by both 4 and 6, it divides by 24.", "12", ["24", "48", "72", "96"], "Check which number divides by 4 and 6, but not by 24."],
      ["The number n² + n + 11 is prime for every whole number n.", "10", ["2", "4", "5", "6"], "Work out n² + n + 11 for the choices and check if it is prime."],
      ["The sum of two primes is always even.", "2 and 3", ["3 and 5", "5 and 7", "7 and 11"], "Add each pair and check whether the total is even."],
      ["The product of two numbers is always bigger than both numbers.", "−2 and 3", ["4 and 5", "2 and 3", "3 and 6"], "Multiply each pair and compare the product with each of the numbers."],
      ["Squaring a number always makes it bigger.", "1/2", ["2", "3", "5"], "Square each choice and compare the result with the number you started with."],
      ["Adding a number to 5 always gives something bigger than 5.", "−4", ["3", "1", "7"], "Add each number to 5 and compare the result with 5."]];
    const [claim, right, wrongs, h2] = pick(items);
    return mcq(`Claim: “${claim}” Which choice is a <b>counterexample</b> that shows the claim is false?`, big("🔎"), right, wrongs, [
      "A counterexample is one case where the claim fails. Many cases that fit the claim do not prove it false.", h2,
      "Example: Claim: “All birds can fly.” A penguin is a bird that cannot fly, so it is a counterexample. A sparrow fits the claim and does not disprove it. Now do yours."]);
  };

  // ================= mixed and challenge =================
  const mixOf = (title, lessons, intro, listTitles) => {
    const f = () => pick(lessons).make();
    return L(title, f, [S("Review time!", "🔄", intro), S("Remember", "🧠", listTitles ? "This quiz has puzzles from: " + lessons.map(l => l.title).join(", ") + "." : "This quiz mixes puzzles from the whole level: number patterns, counting, shapes, chances and clue puzzles."), S("Tip", "💡", "Read every clue. Cross out answers that cannot be right. Check your answer before you tap.")]);
  };
  const finish = (lv, list) => {
    list.push(mixOf("Mixed practice", list.filter((_, i) => i % 3 === 0), "This lesson mixes puzzles you have learned in this level. Take your time.", true));
    list.push(mixOf(`Level ${lv} Challenge`, list.slice(0, 18), `Everything from level ${lv}. Think carefully, you can do it!`, false));
    return list;
  };

  const L13 = finish(13, [
    L("Below zero", negLine, [S("Negative numbers", "🧊", "Numbers below zero have a minus sign. −3 is 3 steps to the left of zero."), S("Walking the line", "↔️", "Walking right makes numbers bigger. Walking left makes them smaller, even past zero."), S("Order", "📏", "The further left, the smaller the number. −9 is smaller than −2.")]),
    L("Decimal detective", decim, [S("Place value", "0️⃣", "In 0.45 the 4 is in the tenths place and the 5 is in the hundredths place."), S("Compare fairly", "⚖️", "Add zeros so both numbers have the same number of places: 0.5 = 0.50, then compare."), S("Longer is not bigger", "⚠️", "0.5 is bigger than 0.45 even though 0.45 has more digits.")]),
    L("Think of a number", thinkNum, [S("Number puzzles", "🤔", "“I think of a number, do some steps and get an answer.” Your job is to find the first number."), S("Undo the steps", "↩️", "Go backwards. Adding is undone by taking away. Multiplying is undone by dividing."), S("Order matters", "🔢", "Undo the LAST step first, then the one before it.")]),
    L("Undo it: working backwards", undoIt, [S("Start at the end", "🏁", "Some puzzles tell you what happened and where it all ended up. Then work backwards."), S("Opposites", "↔️", "Doubling ↔ halving. Adding ↔ taking away."), S("Check", "✅", "Run the story forwards with your answer to make sure it ends at the right number.")]),
    L("Consecutive numbers", consec, [S("In a row", "🔢", "Consecutive numbers follow each other: 7, 8, 9."), S("The middle", "⚖️", "For an odd count of numbers in a row, the sum divided by the count is the middle number."), S("Even or odd steps", "🦘", "Consecutive even numbers go up by 2, like 10, 12, 14.")]),
    L("Triangle angles", triAngles, [S("Triangle total", "📐", "The three angles of any triangle add up to 180 degrees."), S("Lines and points", "🌀", "Angles on a straight line add up to 180°. Angles round a point add up to 360°."), S("Isosceles", "🔺", "An isosceles triangle has two equal sides and two equal angles.")]),
    L("Add-up pyramids", pyramid, [S("The rule", "🧱", "Each block is the sum of the two blocks below it."), S("Going up", "⬆️", "To fill in the top, add the blocks below."), S("Going down", "⬇️", "To find a missing bottom block, subtract. Sometimes the same block counts twice!")]),
    L("Digit sums", digitSum, [S("Rule for 3", "3️⃣", "A number divides by 3 if its digits add up to a number that divides by 3."), S("Rule for 9", "9️⃣", "A number divides by 9 if its digits add up to a number that divides by 9."), S("Example", "✏️", "4,356: 4 + 3 + 5 + 6 = 18, so it divides by 9 and by 3.")]),
    L("Maps and scales", maps, [S("Scale", "🗺️", "A map scale says how much real distance one centimetre stands for."), S("To real life", "➗", "Map distance × distance for 1 cm = real distance."), S("Back to the map", "↩️", "Real distance ÷ distance for 1 cm = map distance.")]),
    L("Unit chains", unitChain, [S("Two changes", "🔄", "Sometimes you must change two units, like km per hour into metres per minute."), S("One at a time", "1️⃣", "Change the top unit first, then the bottom unit. Write each step."), S("Handy facts", "📚", "1 km = 1000 m. 1 hour = 60 minutes. 1 minute = 60 seconds. 1 litre = 1000 mL.")]),
    L("Fractions of fractions", fracOfFrac, [S("Of means times", "✖️", "1/2 of 1/3 means 1/2 × 1/3 = 1/6."), S("Step by step", "👣", "Find the first part of the amount, then the second fraction of that part."), S("Use the right whole", "⚠️", "The second fraction is of what is left or what you found, not of the original whole.")]),
    L("Smart estimates", estimate, [S("Round first", "🎯", "Round numbers to something easy to work with, then calculate."), S("Square roots", "√", "√50 is between 7 and 8 because 49 < 50 < 64."), S("Digits", "🔢", "A product with 3 digits is between 100 and 999. Estimating helps count digits.")]),
    L("Pigeonhole", pigeon, [S("Pigeons in holes", "🕊️", "If 5 pigeons share 4 holes, some hole must have at least 2 pigeons."), S("Worst case", "🌧️", "To be SURE, imagine the worst luck, then add one more."), S("Spread evenly", "📊", "Divide the items by the boxes. Any leftover forces one box to have an extra.")]),
    L("Faces, edges and corners", solids, [S("Prism", "📦", "A prism has two matching ends and flat sides. Sides = number of sides of the end shape."), S("Pyramid", "🔺", "A pyramid has one base and triangle sides that meet at a point."), S("Count smartly", "🔢", "Count the top, the bottom and the standing parts separately, then add.")]),
    L("Gears", gears, [S("Teeth", "⚙️", "Meshing gears move the same number of teeth past the touching point."), S("Turns", "🔄", "Small gears turn more often than big gears. Teeth × turns is the same for both."), S("Direction", "↔️", "Touching gears turn in opposite directions.")]),
    L("Dominoes on boards", dominoes, [S("Two squares", "🀱", "A domino covers exactly 2 squares."), S("Count squares", "🔢", "If the number of squares is odd, you can never cover them all."), S("Colours", "♟️", "On a chessboard each domino covers one light and one dark square.")]),
    L("Letter sums", letterSums, [S("Letters are digits", "🔤", "In a letter puzzle each letter stands for one digit, and the same letter is the same digit."), S("Break it up", "🧩", "AB means 10 × A + B, so AA is 11 × A."), S("Test", "🧪", "Put your digit back in and check the sum.")]),
    L("Can it be a triangle?", triIneq, [S("Sticks", "🥢", "Three sticks only make a triangle if the two short ones are together longer than the long one."), S("Test", "⚖️", "Add the two shortest. Is the total bigger than the longest?"), S("Just equal", "⚠️", "If they are only equal, the sticks lie flat in a line. No triangle.")])
  ]);

  const L14 = finish(14, [
    L("Ups and downs", upDown, [S("Plus and minus", "➕➖", "Adding a positive number moves up. Adding a negative number moves down."), S("Taking away a negative", "🔄", "5 − (−3) = 5 + 3 = 8. Taking away a debt makes you richer."), S("Number line", "↔️", "Draw it if you are not sure. Move up for plus, down for minus.")]),
    L("Letters for numbers", exprVal, [S("Variables", "🔤", "A letter in maths stands for a number. 3a means 3 × a."), S("Swap in numbers", "🔄", "If a = 4, then 3a + 2 = 3 × 4 + 2 = 14."), S("Order", "📏", "Brackets first, then squares, then multiply, then add.")]),
    L("Inequalities", inequal, [S("Signs", "⚖️", "> means bigger than, < means smaller than, ≤ means smaller than or equal to."), S("Whole numbers", "🔢", "x < 5 with whole numbers allows 4, 3, 2, 1, 0."), S("Counting", "🧮", "Check whether each end number is allowed or not.")]),
    L("Ratios with three parts", threeRatio, [S("Three parts", "🔴🔵🟢", "A ratio like 2:3:5 shares a total into 2 + 3 + 5 = 10 equal parts."), S("One part", "1️⃣", "Divide the total by the number of parts to find one part."), S("Linking ratios", "🔗", "If a:b and b:c share the b part, use b to link all three together.")]),
    L("Percent change", pctChange, [S("Increase and decrease", "📈", "To increase by 20%, find 20% and add it. To decrease, take it away."), S("Two changes", "↔️", "Up 10% then down 10% does not get you back, because the second 10% is of a different number."), S("Working back", "🔙", "If you pay 80% of the price, find 10% and multiply to get 100%.")]),
    L("Squares and roots", squaresRoots, [S("Perfect squares", "🟦", "1, 4, 9, 16, 25, 36... come from multiplying a whole number by itself."), S("Roots", "√", "The square root of 49 is 7 because 7 × 7 = 49."), S("Square garden", "🌻", "Area = side × side. Perimeter = 4 × side.")]),
    L("Sieve of primes", sieve, [S("Prime", "🔍", "A prime has exactly two factors: 1 and itself."), S("Sieve", "🧪", "Cross out multiples of 2, 3, 5 and 7. The numbers left (up to 100) are prime."), S("Tricky ones", "⚠️", "51, 57 and 91 look prime but are not: 51 = 3 × 17, 57 = 3 × 19, 91 = 7 × 13.")]),
    L("Area of triangles", triArea, [S("Half a rectangle", "🔺", "A triangle is half of a rectangle with the same base and height."), S("Formula", "🧮", "Area = base × height ÷ 2."), S("Parallelogram", "▱", "Slide a corner over to make a rectangle: area = base × height.")]),
    L("Circles", circles, [S("Circle parts", "⭕", "The diameter goes across through the middle. The radius is half of it."), S("Around", "🛞", "The distance around is the circumference: about 3 times the diameter (pi is about 3.14)."), S("Inside", "🟠", "Area = π × radius × radius. Here we use 3 for π.")]),
    L("Volume of boxes", volume, [S("Layers", "📦", "Volume is how many 1-cm cubes fit inside. Count one layer and multiply by the layers."), S("Formula", "🧮", "Volume = length × width × height."), S("Litres", "🚰", "1000 cubic cm = 1 litre.")]),
    L("Timetables", timetable, [S("24-hour clock", "⏰", "15:30 means half past 3 in the afternoon. After 23:59 comes 00:00."), S("Adding time", "➕", "Add the hours, then the minutes. If minutes pass 60, carry 1 hour."), S("Time zones", "🌍", "A place ahead has a later time. A place behind has an earlier time.")]),
    L("Average speed", avgSpeed, [S("Total over total", "🚗", "Average speed = total distance ÷ total time."), S("Not the middle", "⚠️", "Going 30 km/h one way and 60 km/h back does NOT average 45. You spend longer going slowly."), S("Pick a distance", "📏", "Choose an easy one-way distance, find both times, add them up.")]),
    L("Mixtures", mixtures, [S("Parts", "🥤", "2 parts syrup to 3 parts water makes 5 parts in all."), S("Percent of", "🧂", "A 10% solution has 10 g of the ingredient in every 100 g."), S("Watering down", "💧", "Adding water keeps the amount of the ingredient the same but makes the total bigger.")]),
    L("Chance of two things", twoEvents, [S("Independent", "🎲", "A coin flip does not change a die roll. They are independent."), S("And means multiply", "✖️", "Chance of A and B = chance of A × chance of B."), S("Example", "✏️", "Heads is 1/2 and a 6 is 1/6, so both is 1/12.")]),
    L("Fair or unfair?", fairGames, [S("Fair game", "⚖️", "A game is fair if both players have the same chance to win."), S("Count ways", "🔢", "Two dice make 36 rolls. A sum of 7 happens 6 ways, but a sum of 2 happens only 1 way."), S("Compare", "📊", "The player whose result can happen in more ways is more likely to win.")]),
    L("Round tables", roundTable, [S("No start or end", "🍽️", "At a round table, turning everyone one seat round gives the same arrangement."), S("Fix one", "🪑", "Put one person in a seat. Then arrange the others in a line: (n − 1) × (n − 2) × ... × 1."), S("Opposite", "↔️", "Opposite is half a table away: half of the chairs.")]),
    L("Pascal’s triangle", pascal, [S("The triangle", "🔺", "Start with 1 at the top. Each number is the sum of the two above it."), S("Row sums", "➕", "Row 0: 1. Row 1: 2. Row 2: 4. Each row adds up to double the one before."), S("Choosing", "🧒", "The numbers count the ways to choose things: row 4 says there are 6 ways to choose 2 of 4.")]),
    L("Number tricks", numTricks, [S("Magic?", "🎩", "Some number tricks always work. Maths can explain why."), S("Reverse and subtract", "🔄", "For three digits, a number minus its reverse is always a multiple of 99."), S("Cancelling", "➖", "In a trick, the starting number often gets added and then taken away again.")])
  ]);

  const L15 = finish(15, [
    L("Signs in multiplying", signs, [S("Same signs", "➕", "Positive × positive and negative × negative both give a positive."), S("Different signs", "➖", "Positive × negative gives a negative."), S("Division", "➗", "Division follows the same sign rules as multiplication.")]),
    L("Absolute value", absVal, [S("Distance from zero", "|x|", "The absolute value |x| is how far x is from zero. It is never negative."), S("Both sides", "↔️", "|−5| = 5 and |5| = 5."), S("Distance between", "📏", "For points on opposite sides of zero, add their absolute values.")]),
    L("Two-step equations", twoStep, [S("Balance", "⚖️", "An equation is a balance. Do the same thing to both sides."), S("Undo in reverse", "↩️", "Undo adding or subtracting first, then undo multiplying or dividing."), S("Check", "✅", "Put your x back in the equation to see if both sides match.")]),
    L("Adding fractions", fracSums, [S("Same size pieces", "🍕", "You can only add fractions with the same bottom number."), S("Common bottom", "🔄", "Change 1/2 + 1/3 into 3/6 + 2/6 = 5/6."), S("Compare", "⚖️", "To see which fraction is bigger, give them the same bottom number first.")]),
    L("Proportional tables", propTable, [S("Constant", "📈", "In a proportional table y = k × x with the same k in every column."), S("Find k", "🔍", "Divide any y by its x: k = y ÷ x."), S("Use k", "✖️", "Once you know k, you can find y for any x.")]),
    L("Percent in real life", percentApps, [S("Tax and markup", "🛍️", "Tax and markup are percents added on top of a price."), S("Discounts", "🏷️", "A discount is a percent taken away. If tax comes after, it uses the new price."), S("Simple interest", "🏦", "Interest = money × rate × years, with the rate as a percent of 100.")]),
    L("Scientific notation", sciNot, [S("Big numbers", "🌌", "Scientists write 45,000 as 4.5 × 10<sup>4</sup>."), S("The rule", "📏", "The first number is at least 1 and less than 10. The power says how many places to move the point."), S("Compare", "⚖️", "A bigger power of ten means a much bigger number.")]),
    L("Four quadrants", coordPlane, [S("The plane", "🧭", "(x, y): x is across, y is up. Negative numbers go left and down."), S("Quadrants", "➕", "First is top right, then anticlockwise: second top left, third bottom left, fourth bottom right."), S("Reflections", "🪞", "Across the x-axis, y changes sign. Across the y-axis, x changes sign.")]),
    L("Sampling and estimating", recapture, [S("A sample", "🐟", "You can learn about a big group by looking at a small random sample."), S("Same fraction", "➗", "The share in the sample is used to estimate the share in the whole group."), S("Tag and recapture", "🏷️", "Tag some animals, let them go, catch some later, and see how many are tagged.")]),
    L("Long-run chances", longRun, [S("In the long run", "🎲", "A chance of 1/6 means about 1 time in 6 over many tries."), S("Expect", "🔮", "Expected number = chance × number of tries."), S("Winnings", "💰", "Multiply the expected number of wins by the prize.")]),
    L("Without replacement", noReplace, [S("Put it back or not", "🔴", "If you put the marble back, every pick has the same chances."), S("Keep it out", "🧺", "If you keep it, the bag changes: one fewer marble in the bag."), S("Multiply", "✖️", "Chance of both = chance of the first × chance of the second (with the changed bag).")]),
    L("Parallel line angles", parallelAng, [S("Z, F and C", "🛤️", "A line crossing two parallel lines makes Z shapes (alternate), F shapes (corresponding) and C shapes (co-interior)."), S("Equal pairs", "🟰", "Alternate and corresponding angles are equal."), S("Add to 180", "➕", "Co-interior angles (C shape) add up to 180°.")]),
    L("Regular polygon angles", extAngle, [S("Full turn", "🌀", "Walk around a polygon and you turn one full 360° in total."), S("Exterior angle", "⬡", "In a regular polygon each outside turn = 360 ÷ number of sides."), S("Interior angle", "📐", "Inside angle = 180 − outside angle.")]),
    L("Circles and π", circlePi, [S("Area", "⭕", "Area of a circle = π × r × r. Leave π in the answer."), S("Edge", "📏", "Circumference = π × diameter = 2 × π × r."), S("Rings", "🛤️", "A ring is a big circle with a small circle taken away.")]),
    L("Scale and similar shapes", scaleSim, [S("Scale factor", "🔍", "Enlarging by factor 3 makes every length 3 times as long."), S("Area", "▭", "Area grows by the scale factor times itself."), S("Volume", "🧊", "Volume grows by the scale factor times itself three times.")]),
    L("Surface area", surfaceArea, [S("Unfold it", "📦", "Surface area is the area of all the faces added up."), S("Pairs", "🔢", "A box has 3 pairs of matching faces: add one of each pair, then double."), S("Open boxes", "🥤", "No lid means one fewer face to count.")]),
    L("Odd numbers and squares", oddSquares, [S("A neat pattern", "🟦", "1 = 1, 1 + 3 = 4, 1 + 3 + 5 = 9, 1 + 3 + 5 + 7 = 16."), S("Why", "🧠", "Each odd number is the L-shape that grows a square to the next size."), S("Pairing", "🧩", "Add 2 + 4 + ... + 2k by pairing the first and last: every pair has the same total.")]),
    L("Counterexamples", counterEx, [S("Claims", "🔎", "A claim says something is ALWAYS true. One case where it fails makes it false."), S("Counterexample", "❌", "A counterexample fits the claim’s starting conditions but breaks its result."), S("Not a proof", "⚠️", "Many cases that work do not prove a claim. One case that fails does disprove it.")])
  ]);

  Object.assign(LOGIC_LEVELS, { 13: L13, 14: L14, 15: L15 });
})();
