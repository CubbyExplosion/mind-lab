// ext/logic-7-9.js  Mind Lab Logic & Puzzles levels 7-9 (60 lessons)
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
  const nearW = a => shuf([1, -1, 2, -2, 3, 10, -10].map(d => a + d).filter(x => x >= 0 && x !== a));
  const names = n => shuf(NM).slice(0, n);
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => a / gcd(a, b) * b;
  const box = c => `<span style="display:inline-block;min-width:2.2em;text-align:center;border:2px solid #888;border-radius:6px;margin:2px;padding:0 4px">${c}</span>`;
  const pyr = rows => `<div style="text-align:center;font-family:monospace;font-size:1.25em;line-height:1.7">${rows.map(r => r.map(box).join("")).join("<br>")}</div>`;
  const perms = a => a.length <= 1 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p]));

  // ======================= LEVEL 7 =======================
  const twoRule = () => {
    const k = ri(1, 5), m = pick([2, 2, 3]), pf = Math.random() < 0.5;
    const ops = pf ? [x => x + k, x => x * m] : [x => x * m, x => x + k];
    let v = ri(1, 6); const arr = [v];
    for (let i = 0; i < 5; i++) { v = ops[i % 2](v); arr.push(v); }
    v = ops[1](v);
    return num("Two rules take turns. What number comes next?", big(arr.join(", ") + ", ❓"), v, [
      "Look at the jump from the 1st number to the 2nd, then from the 2nd to the 3rd. Are they the same kind of jump?",
      "Two different rules take turns, again and again. Find both rules, then work out which rule is used for the next jump.",
      ex([["Example: 3, 6, 8, 16, 18, 36 uses ×2, then +2, then ×2, then +2... The next jump is +2, so the next number is 38. Now do yours.", 38], ["Example: 2, 3, 6, 7, 14, 15 uses +1, then ×2, then +1... The next jump is ×2, so the next number is 30. Now do yours.", 30]], v)]);
  };
  const parity = () => {
    const w = p => (p ? "odd" : "even");
    if (Math.random() < 0.5) {
      const ps = [ri(0, 1), ri(0, 1), ri(0, 1)], os = [pick(["+", "×", "−"]), pick(["+", "×", "−"])];
      const js = o => (o === "×" ? "*" : o === "−" ? "-" : "+");
      const r = eval(`${ps[0] ? 3 : 2} ${js(os[0])} ${ps[1] ? 3 : 2} ${js(os[1])} ${ps[2] ? 3 : 2}`);
      const ans = ((r % 2) + 2) % 2 ? "Always odd" : "Always even";
      return mcq(`A is ${w(ps[0])}, B is ${w(ps[1])} and C is ${w(ps[2])}. Is A ${os[0]} B ${os[1]} C always odd or always even? (Do × first.)`, big("🔢"), ans, ["Always odd", "Always even"], [
        "Forget the real size of the numbers. Only think: odd or even?",
        "Rules: even + even = even, odd + odd = even, odd + even = odd. Subtracting works like adding. For ×, one even number makes the answer even. Do the × part first.",
        "Example: odd × odd + even. Odd × odd is odd, and odd + even is odd, so that one is always odd. Now do yours."]);
    }
    const a = ri(11, 99), b = ri(11, 99), c = ri(11, 99), o1 = pick(["+", "×"]), o2 = pick(["+", "−"]);
    const val = o1 === "×" ? a * b : a + b, r = o2 === "+" ? val + c : val - c;
    const ans = Math.abs(r) % 2 ? "Odd" : "Even";
    return mcq(`Without working it out: is ${a} ${o1} ${b} ${o2} ${c} odd or even?`, big("🔢"), ans, ["Odd", "Even"], [
      "You do not need to calculate. Look only at whether each number is odd or even (check the last digit).",
      "Do the first part and decide odd or even. Then use that with the last number: even ± even = even, odd ± odd = even, odd ± even = odd, odd × odd = odd, anything × even = even.",
      "Example: 23 × 40 + 17. 23 × 40 is even (40 is even). Even + 17 (odd) is odd. Now do yours."]);
  };
  const sumDiff = () => {
    const small = ri(5, 40), diff = ri(2, 20), bg = small + diff, tot = small + bg, [a, b] = names(2), th = pick(["stickers", "marbles", "cards", "coins"]), ab = Math.random() < 0.5;
    return num(`${a} and ${b} have ${tot} ${th} together. ${a} has ${diff} more than ${b}. How many does ${ab ? a : b} have?`, big("⚖️"), ab ? bg : small, [
      "If you take away the extra ones, both kids would have the same amount.",
      `Take the ${diff} extra away from the total. Then share what is left equally between the two kids. Put the extra back for the kid who has more.`,
      "Example: Two kids have 30 apples and one has 4 more. 30 − 4 = 26, and 26 ÷ 2 = 13 for the kid with fewer. The other kid has 13 + 4 = 17. Now do yours."]);
  };
  const sqCube = () => {
    const t = ri(0, 5);
    if (t === 0) { const n = ri(3, 15); return num(`What is ${n} × ${n} (that is ${n}²)?`, big("🟦"), n * n, ["A square number is a number times itself.", "Multiply the number by itself. Use a times table fact you know and build from it.", "Example: 6² = 6 × 6 = 36. Now do yours."]); }
    if (t === 1) { const n = ri(2, 6); return num(`What is ${n}³? (That means ${n} × ${n} × ${n}.)`, big("🧊"), n * n * n, ["A cube number multiplies a number by itself three times.", "First find the number times itself. Then multiply that answer by the number again.", "Example: 2³ = 2 × 2 × 2 = 4 × 2 = 8. Now do yours."]); }
    if (t === 2) { const k = ri(3, 12); return num(`The square numbers go 1, 4, 9, 16... Which square number comes right after ${k * k}?`, big("🟦"), (k + 1) * (k + 1), [`${k * k} is a number times itself. Which number?`, "Find the number that was multiplied by itself. The next square uses the next number up.", "Example: after 25 (5 × 5) comes 6 × 6 = 36. Now do yours."]); }
    if (t === 3) { const k = ri(3, 12), ws = new Set(); while (ws.size < 3) { const x = ri(5, 150); if (Math.sqrt(x) % 1 !== 0) ws.add(x); } return mcq("Which of these is a square number?", big("🟦"), k * k, [...ws], ["A square number is a whole number times itself.", "Try the times tables: 5 × 5, 6 × 6, 7 × 7, 8 × 8, 9 × 9, 10 × 10, 11 × 11, 12 × 12. Which choice shows up?", "Example: Is 49 a square number? Yes, 7 × 7 = 49. Is 50? No, nothing times itself makes 50. Now do yours."]); }
    if (t === 4) { const k = ri(4, 10); return num(`Add the first ${k} odd numbers: 1 + 3 + 5 + 7 + ... (${k} numbers). What is the total?`, big("➕"), k * k, ["Try adding the first 2 odd numbers, then 3, then 4. Look at the totals.", "1, 4, 9, 16... the totals for the first few odd numbers are special numbers. Which kind? Then use that for your count.", "Example: 1 + 3 + 5 + 7 + 9 (five numbers) = 25 = 5². Now do yours with a different count."]); }
    const k = ri(4, 14); return num(`Which number times itself makes ${k * k}?`, big("🟦"), k, ["This is the opposite of squaring.", "Try times table facts. Which number, multiplied by itself, lands on that number?", "Example: 81 = 9 × 9, so the answer for 81 is 9. Now do yours."]);
  };
  const vennOnly = () => {
    const both = ri(2, 8), oa = ri(3, 12), ob = ri(3, 12), ne = ri(1, 8), N = both + oa + ob + ne, [x, y] = pick([["soccer", "swimming"], ["cats", "dogs"], ["pizza", "pasta"], ["art", "music"]]), t = ri(0, 3);
    const base = `${N} kids were asked.`;
    let text, ans;
    if (t === 0) { text = `${base} ${oa + both} like ${x}, ${ob + both} like ${y}, and ${both} like both. How many like neither?`; ans = ne; }
    else if (t === 1) { text = `${base} ${oa + both} like ${x}, ${ob + both} like ${y}, and ${both} like both. How many like only ${x}?`; ans = oa; }
    else if (t === 2) { text = `${base} ${oa + both} like ${x}, ${ob + both} like ${y}, and ${ne} like neither. How many like both?`; ans = both; }
    else { text = `${base} ${oa} like only ${x}, ${ob} like only ${y}, and ${both} like both. How many like neither?`; ans = ne; }
    return num(text, big("⭕⭕"), ans, [
      "Draw two overlapping circles. The middle part is for kids who like both.",
      "Numbers for a whole circle include the middle part. 'Only' means that circle without the middle. Everyone in the circles plus the 'neither' kids makes the total.",
      "Example: 20 kids. 12 like cats, 9 like dogs, 4 like both. Only cats: 12 − 4 = 8. Only dogs: 9 − 4 = 5. In circles: 8 + 4 + 5 = 17. Neither: 20 − 17 = 3. Now do yours."]);
  };
  const culprit = () => {
    for (;;) {
      const w = names(3), [act, didnt] = pick([["ate the last cookie", "did not eat the last cookie"], ["broke the vase", "did not break the vase"], ["hid the ball", "did not hide the ball"], ["took the red crayon", "did not take the red crayon"]]);
      const st = w.map(() => ({ j: ri(0, 2), neg: Math.random() < 0.5 })), k = pick([1, 1, 2]);
      const ok = [0, 1, 2].filter(c => st.filter(s => (c === s.j) !== s.neg).length === k);
      if (ok.length !== 1) continue;
      const lines = st.map((s, i) => `${w[i]}: “${s.j === i ? "I" : w[s.j]} ${s.neg ? didnt : act}.”`);
      const stm = k === 1 ? "Exactly one of the three kids is telling the truth." : "Exactly two of the three kids are telling the truth.";
      return mcq(`Someone ${act}. ${stm} Who did it?<br>${lines.join("<br>")}`, big("🕵️"), w[ok[0]], w, [
        "Try each kid as the one who did it. Then check which statements would be true.",
        `For each guess, count the true statements. Only one guess gives exactly ${k === 1 ? "one" : "two"}.`,
        "Example: Tom says “Sue did it.” Sue says “I did not.” Kai says “I did not.” Exactly one is true. Try Sue: Tom true, Sue false, Kai true is two true, no. Try Tom: Tom false, Sue true, Kai true is two true, no. Try Kai: only Sue is true. So Kai did it. Now do yours."]);
    }
  };
  const DIRS = ["North", "East", "South", "West"];
  const turning = () => {
    let d = ri(0, 3); const s = d, parts = [], n = ri(3, 4);
    for (let i = 0; i < n; i++) { const t = pick([["turn right", 1], ["turn left", 3], ["turn around", 2]]); parts.push(t[0]); d = (d + t[1]) % 4; }
    return mcq(`You face ${DIRS[s]}. You ${parts.join(", then ")}. Which way do you face now?`, big("🧭"), DIRS[d], DIRS, [
      "Do one turn at a time. Turning right goes North → East → South → West → North.",
      "A right turn moves one step forward in that order. A left turn moves one step back. Turning around moves two steps.",
      "Example: Face North, turn right (East), turn around (West), turn left (South). You face South. Now do yours."]);
  };
  const triangle = () => {
    const t = ri(0, 2), a = ri(1, 9), b = ri(1, 9), c = ri(1, 9), d = ri(1, 9);
    const h = [
      "Each number is the sum of the two numbers just below it.",
      "Work from the bottom row up. Add the two boxes next to each other to fill the row above, again and again.",
      "Example: bottom row 2, 3, 4. Next row: 2 + 3 = 5 and 3 + 4 = 7. Top: 5 + 7 = 12. Now do yours."];
    if (t === 0) return num("Each box is the sum of the two boxes under it. What goes in the top box?", pyr([["❓"], [a + b, b + c], [a, b, c]]), a + 2 * b + c, h);
    if (t === 1) return num("Each box is the sum of the two boxes under it. What number goes in the ❓ box?", pyr([[a + 2 * b + c], ["&nbsp;", "&nbsp;"], [a, "❓", c]]), b, [
      "Each number is the sum of the two numbers just below it. Fill the empty middle row with letters if it helps.",
      "The top is the left middle box plus the right middle box. The ❓ box is counted in both of them, so it is counted twice.",
      ex([["Example: bottom 1, ❓, 3 with 12 on top. 1 + 3 = 4 and the top 12 is 4 plus two ❓. 12 − 4 = 8, and 8 ÷ 2 = 4, so ❓ = 4. Now do yours.", 4], ["Example: bottom 2, ❓, 2 with 14 on top. 2 + 2 = 4 and 14 − 4 = 10, 10 ÷ 2 = 5, so ❓ = 5. Now do yours.", 5]], b)]);
    return num("Each box is the sum of the two boxes under it. What goes in the top box?", pyr([["❓"], ["&nbsp;", "&nbsp;", "&nbsp;"], [a, b, c, d]]), a + 3 * b + 3 * c + d, h);
  };
  const handshake = () => {
    const n = ri(3, 10), ans = n * (n - 1) / 2, [what, ctx] = pick([["people", "Every person shakes hands with every other person once"], ["teams", "Every team plays every other team once"], ["friends", "Every friend gives every other friend one high-five"], ["dots", "Every dot is joined to every other dot with one line"]]);
    const e = en => `Example: ${en} ${what}. The first meets ${en - 1}, the next meets ${en - 2} more... ${Array.from({ length: en - 1 }, (_, i) => en - 1 - i).join(" + ")} = ${en * (en - 1) / 2}. Now do yours.`;
    return num(`There are ${n} ${what}. ${ctx}. How many in all?`, big("🤝"), ans, [
      "Count one at a time. The first one meets everyone else. How many is that?",
      "The next one has already met the first, so they have one fewer new meeting. Keep going and add all the numbers.",
      ex([[e(4), 6], [e(5), 10], [e(3), 3]], ans)]);
  };
  const missDigit = () => {
    const op = pick(["+", "+", "−"]); let a, b, c;
    if (op === "+") { a = ri(20, 899); b = ri(20, 899); c = a + b; } else { a = ri(100, 999); b = ri(20, a - 10); c = a - b; }
    const nums = [a, b, c].map(String), idx = ri(0, 2), s = nums[idx], pos = ri(0, s.length - 1), dg = Number(s[pos]);
    nums[idx] = s.slice(0, pos) + "❓" + s.slice(pos + 1);
    return num("Which digit does the ❓ stand for?", big(`${nums[0]} ${op} ${nums[1]} = ${nums[2]}`, 1.5), dg, [
      "Find the ❓. Which number is it in, and which place is it (ones, tens or hundreds)?",
      "Use the opposite operation to find the whole hidden number from the other two numbers. Then read off the digit in the right place.",
      ex([["Example: 3❓ + 25 = 61. 61 − 25 = 36, so ❓ is 6. Now do yours.", 6], ["Example: 4❓ + 18 = 65. 65 − 18 = 47, so ❓ is 7. Now do yours.", 7]], dg)]);
  };
  const chainIneq = () => {
    const n = ri(4, 5), lt = shuf("ABCDEFGH".split("")).slice(0, n), ord = shuf(lt);
    const cl = shuf(Array.from({ length: n - 1 }, (_, i) => Math.random() < 0.5 ? `${ord[i]} is smaller than ${ord[i + 1]}.` : `${ord[i + 1]} is bigger than ${ord[i]}.`));
    const t = pick(n === 5 ? ["big", "small", "mid", "second"] : ["big", "small", "second"]);
    const ans = t === "big" ? ord[n - 1] : t === "small" ? ord[0] : t === "mid" ? ord[2] : ord[n - 2];
    const q = { big: "Which letter stands for the biggest number?", small: "Which letter stands for the smallest number?", mid: "Which letter is in the middle (the 3rd smallest)?", second: "Which letter is the second biggest?" }[t];
    return mcq(`Each letter is a different number. ${cl.join(" ")} ${q}`, big("🔠"), ans, lt, [
      "Link the clues into one line, like a number line from smallest to biggest.",
      "Find a letter that appears in two clues. Put it between its two neighbours, and build the line one clue at a time.",
      "Example: “B is smaller than D. D is smaller than A.” The line is B, D, A. So A is the biggest and B is the smallest. Now do yours."]);
  };
  const arrange = () => {
    const t = ri(0, 3);
    if (t === 0) { const k = ri(3, 5), n = pick(["friends", "kids", "robots"]); return num(`In how many different orders can ${k} ${n} stand in a line?`, big("🚶"), Array.from({ length: k }, (_, i) => i + 1).reduce((a, b) => a * b), ["Fill the places one at a time. How many choices for the first place?", "After one is used there is one fewer choice for the next place. Multiply the number of choices for each place.", "Example: 3 kids in a line: 3 × 2 × 1 = 6 orders. Now do yours."]); }
    if (t === 1) { const n = ri(4, 8); return num(`${n} runners race. How many ways can gold and silver medals be given out?`, big("🥇🥈"), n * (n - 1), ["First pick who wins gold. How many choices?", "After gold is given, one runner is used up. How many are left for silver? Multiply the two numbers.", "Example: 5 runners, gold and silver: 5 × 4 = 20 ways. Now do yours."]); }
    if (t === 2) { const n = ri(4, 6); return num(`${n} runners race. How many ways can gold, silver and bronze medals be given out?`, big("🥇🥈🥉"), n * (n - 1) * (n - 2), ["Pick gold first, then silver, then bronze. How many choices for each?", "Each medal has one fewer runner to choose from. Multiply the three numbers.", "Example: 4 runners, three medals: 4 × 3 × 2 = 24 ways. Now do yours."]); }
    const ds = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, ri(3, 4)); const k = ds.length;
    return num(`How many different ${k}-digit numbers can you make using each of the digits ${ds.join(", ")} exactly once?`, big("🔢"), Array.from({ length: k }, (_, i) => i + 1).reduce((a, b) => a * b), ["Think of ones, tens and hundreds as places to fill. How many digits can go first?", "Once a digit is used it cannot be used again. Multiply the number of choices for each place.", "Example: digits 2, 5, 7 make 3 × 2 × 1 = 6 numbers. Now do yours."]);
  };
  const pigeon = () => {
    const t = ri(0, 3);
    if (t === 0) { const c = ri(2, 5), th = pick([["socks", "sock"], ["marbles", "marble"], ["ribbons", "ribbon"], ["crayons", "crayon"]]); return num(`A dark bag has ${th[0]} in ${c} colors. You cannot see. How many must you take out to be SURE two of them are the same color?`, big("🌑"), c + 1, ["Imagine the worst luck: every one you pick is a new color.", "In the worst case you pick one of each color. What does the very next pick have to do?", ex([["Example: 2 colors, need 2 the same: worst luck is 1 red and 1 blue (2 picks), so the 3rd pick must match. Answer 3. Now do yours.", 3], ["Example: 3 colors, need 2 the same: 3 different picks, so the 4th must match. Answer 4. Now do yours.", 4]], c + 1)]); }
    if (t === 1) { const c = ri(2, 4); return num(`A dark bag has socks in ${c} colors. How many must you take to be SURE three of them are the same color?`, big("🌑"), 2 * c + 1, ["Imagine the worst luck: you get as many as you can without having three of one color.", "In the worst case you have two of each color. What does the next pick have to do?", ex([["Example: 2 colors, need 3 the same: worst luck is 2 red and 2 blue (4 picks), so the 5th makes three. Answer 5. Now do yours.", 5], ["Example: 3 colors, need 3 the same: 2 of each is 6 picks, so the 7th makes three. Answer 7. Now do yours.", 7]], 2 * c + 1)]); }
    const [q, a] = pick([["A class has many kids. How many kids do you need to be SURE two were born in the same month?", 13], ["How many kids do you need to be SURE two were born on the same day of the week?", 8], ["A deck of cards has 4 suits. How many cards must you draw to be SURE two have the same suit?", 5], ["A shelf has 5 kinds of books. How many books must you pick to be SURE two are the same kind?", 6], ["There are 10 digits (0 to 9). How many numbers must you pick to be SURE two end in the same digit?", 11], ["A week has 7 days. How many people are needed to be SURE two have their birthday on the same weekday this year?", 8]]);
    return num(q, big("🧺"), a, ["Count the number of boxes (months, days, suits, kinds).", "Imagine the worst luck: each pick goes in a different box. After every box has one, what happens to the next pick?", "Example: 3 colors of socks, 2 the same: 3 picks could all differ, so you need 4. Now do yours."]);
  };
  const fmtT = m => { m = ((m % 720) + 720) % 720; const h = Math.floor(m / 60) || 12; return `${h}:${String(m % 60).padStart(2, "0")}`; };
  const clockJump = () => {
    const st = ri(1, 12) * 60 + ri(0, 11) * 5, d = ri(7, 48) * 5, t = ri(0, 2);
    const dtxt = `${Math.floor(d / 60) ? Math.floor(d / 60) + " hour" + (Math.floor(d / 60) > 1 ? "s" : "") + " " : ""}${d % 60 ? d % 60 + " minutes" : ""}`.trim();
    const hh = [
      "Add the hours first, then the minutes. If the minutes go past 60, that makes one more hour.",
      "Use stepping stones: go up to the next whole hour, then add the rest of the time.",
      ex([["Example: 2:40 plus 1 hour 50 minutes. 2:40 + 1 hour = 3:40. Then 20 minutes more reaches 4:00, and 30 more makes 4:30. Now do yours.", "4:30"], ["Example: 5:15 plus 2 hours 45 minutes. 5:15 + 2 hours = 7:15, and 45 minutes more is 8:00. Now do yours.", "8:00"]], "")];
    if (t === 0) { const a = fmtT(st + d); return mcq(`A movie starts at ${fmtT(st)} and lasts ${dtxt}. What time does it end?`, big("🎬"), a, [fmtT(st + d + 10), fmtT(st + d - 10), fmtT(st + d + 60), fmtT(st + d - 60)], hh); }
    if (t === 1) { const a = fmtT(st - d); return mcq(`It is ${fmtT(st)} now. What time was it ${dtxt} ago?`, big("⏰"), a, [fmtT(st - d + 10), fmtT(st - d - 10), fmtT(st - d + 60), fmtT(st - d - 60)], ["Going back in time means taking time away. Take away the hours first.", "Use stepping stones going down: go back to the whole hour, then take away the rest.", "Example: 6:20 minus 1 hour 50 minutes. 6:20 − 1 hour = 5:20. 5:20 − 20 minutes = 5:00. 5:00 − 30 minutes = 4:30. Now do yours."]); }
    return num(`A bus leaves at ${fmtT(st)} and arrives at ${fmtT(st + d)}. How many minutes is the trip?`, big("🚌"), d, ["Find the time from the start to the next whole hour.", "Go stepping stone by stone: to the next whole hour, then whole hours, then the leftover minutes. Add all the minutes.", "Example: 3:40 to 5:10: 20 minutes to 4:00, 60 minutes to 5:00, then 10 more. That is 20 + 60 + 10 = 90 minutes. Now do yours."]);
  };
  const coordWalk = () => {
    for (;;) {
      let x = ri(1, 8), y = ri(1, 8); const sx = x, sy = y, parts = []; let ok = true;
      for (let i = 0; i < 3; i++) {
        const m = pick(["right", "left", "up", "down"]), k = ri(1, 4);
        if (m === "right") x += k; else if (m === "left") x -= k; else if (m === "up") y += k; else y -= k;
        if (x < 0 || x > 9 || y < 0 || y > 9) { ok = false; break; }
        parts.push(`${m} ${k}`);
      }
      if (!ok) continue;
      return mcq(`Start at (${sx}, ${sy}). Move ${parts.join(", then ")}. Where do you end up? (First number: across. Second number: up.)`, big("🗺️"), `(${x}, ${y})`, [`(${y}, ${x})`, `(${x + 1}, ${y})`, `(${x}, ${y + 1})`, `(${x - 1}, ${y})`, `(${x}, ${y - 1})`], [
        "Right and left change the first number. Up and down change the second number.",
        "Do one move at a time. Write down the new place after each move, then do the next move from there.",
        ex([["Example: start (2, 2). Right 3 → (5, 2). Up 4 → (5, 6). Left 2 → (3, 6). Now do yours.", "(3, 6)"], ["Example: start (4, 1). Up 3 → (4, 4). Left 2 → (2, 4). Down 1 → (2, 3). Now do yours.", "(2, 3)"]], `(${x}, ${y})`)]);
    }
  };
  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterPat = () => {
    const t = ri(0, 2);
    const hh = ["Turn the letters into numbers: A = 1, B = 2, C = 3 and so on.", "Find the jump from letter to letter. If it is confusing, look at every other letter.", "Example: B, E, H, K jumps by 3 each time (2, 5, 8, 11), so the next letter is number 14, which is N. Now do yours."];
    if (t === 0) { const s = ri(1, 4), a = ri(0, 25 - 6 * s), arr = Array.from({ length: 5 }, (_, i) => ALPHA[a + s * i]), ans = ALPHA[a + 5 * s]; return mcq("Which letter comes next?", big(arr.join(", ") + ", ❓"), ans, shuf(ALPHA.split("")).slice(0, 8).concat([ALPHA[a + 4 * s + 1] || "A"]), hh); }
    if (t === 1) { const s = ri(1, 3), a = ri(6 * s, 25), arr = Array.from({ length: 5 }, (_, i) => ALPHA[a - s * i]), ans = ALPHA[a - 5 * s]; return mcq("Which letter comes next? (These go backwards!)", big(arr.join(", ") + ", ❓"), ans, shuf(ALPHA.split("")).slice(0, 8).concat([ALPHA[a - 4 * s - 1]]), hh); }
    const a = ri(0, 6), z = 25 - ri(0, 6), arr = [ALPHA[a], ALPHA[z], ALPHA[a + 1], ALPHA[z - 1], ALPHA[a + 2]], ans = ALPHA[z - 2];
    return mcq("Two patterns are mixed together. Which letter comes next?", big(arr.join(", ") + ", ❓"), ans, [ALPHA[z - 1], ALPHA[z - 3], ALPHA[a + 3], ALPHA[a + 2]], ["Look at every other letter. You will see two separate patterns.", "One pattern climbs up the alphabet. The other pattern goes down from the end. The next spot belongs to one of them: which one?", "Example: A, Z, B, Y, C is two patterns: A, B, C... going up and Z, Y... going down. The next is X. Now try yours: which pattern has its turn?"].map((x, i) => (i === 2 ? "Example: C, P, D, O, E: one pattern goes C, D, E (up) and the other goes P, O (down). The next spot is the down pattern's turn, so it is N. Now do yours." : x)));
  };
  const timesMany = () => {
    const three = Math.random() < 0.5, m2 = pick([2, 3, 4]), m3 = pick([2, 3, 5].filter(x => x !== m2)), x = ri(2, 9), [a, b, c] = names(3), th = pick(["stickers", "marbles", "cards", "books"]);
    const w = m => (m === 2 ? "twice as many" : `${m} times as many`);
    const sum = three ? 1 + m2 + m3 : 1 + m2, tot = x * sum, who = ri(0, three ? 2 : 1), mult = [1, m2, m3][who], person = [a, b, c][who];
    const text = three ? `${a} has some ${th}. ${b} has ${w(m2)} as ${a}. ${c} has ${w(m3)} as ${a}. Together they have ${tot} ${th}. How many does ${person} have?` : `${a} has some ${th}. ${b} has ${w(m2)} as ${a}. Together they have ${tot} ${th}. How many does ${person} have?`;
    return num(text, big("📦"), x * mult, [
      `Think of ${a}'s ${th} as one box. How many boxes does each kid have?`,
      "Add up all the boxes. The total number divided by the number of boxes tells you what one box holds.",
      "Example: Jo has 1 box, Al has 3 times as many, and together they have 20. That is 4 boxes, so 1 box = 5. Al has 3 boxes = 15. Now do yours."]);
  };
  const ages = () => {
    const t = ri(0, 3), [a, b] = names(2);
    if (t === 0) { const c = ri(3, 9), k = ri(3, 5), d = ri(2, 6); return num(`${a} is ${c}. ${a}'s dad is ${k} times as old as ${a}. How old will dad be when ${a} is ${c + d}?`, big("🎂"), k * c + d, ["First find dad's age now.", `Every year both of them get one year older. How many years until ${a} is ${c + d}? Add that many years to dad's age.`, "Example: Jo is 6 and mum is 5 times as old (30). When Jo is 9, that is 3 years later, so mum is 33. Now do yours."]); }
    if (t === 1) { const p = ri(4, 12), g = ri(2, 6), q = p + g, w = p + ri(3, 8); return num(`${a} is ${p} and ${b} is ${q}. How old will ${b} be when ${a} is ${w}?`, big("🎂"), w + g, ["The difference in their ages never changes.", `Find how many years older ${b} is. Add that to ${a}'s new age.`, "Example: Jo is 5 and Al is 8, a gap of 3 years. When Jo is 11, Al is 11 + 3 = 14. Now do yours."]); }
    if (t === 2) { const f = ri(2, 6), nowv = ri(6, 13), y = nowv + f, bk = ri(1, 4); return num(`${a} will be ${y} in ${f} years. How old was ${a} ${bk} years ago?`, big("🎂"), nowv - bk, ["Work out how old the child is right now first.", "Take away the years to come from the age then. Then go back in time from there.", "Example: Jo will be 12 in 5 years. Jo is 7 now. 3 years ago Jo was 4. Now do yours."]); }
    const p = ri(4, 12), q = ri(5, 14), n = ri(2, 6); return num(`${a} is ${p} and ${b} is ${q}. What will their ages add up to in ${n} years?`, big("🎂"), p + q + 2 * n, ["Both of them get older, not just one.", `Each of them gains ${n} years, so the total gains that twice.`, "Example: Jo is 5 and Al is 8. In 3 years they add up to 5 + 8 + 3 + 3 = 19. Now do yours."]);
  };

  // ================= mixed and challenge =================
  const mixOf = (title, lessons, intro, listTitles) => {
    const f = () => pick(lessons).make();
    return L(title, f, [S("Review time!", "🔄", intro), S("Remember", "🧠", listTitles ? "This quiz has puzzles from: " + lessons.map(l => l.title).join(", ") + "." : "This quiz mixes puzzles from the whole level: patterns, number tricks, logic, counting and clue puzzles."), S("Tip", "💡", "Read every clue. Cross out answers that cannot be right. Check your answer before you tap.")]);
  };
  const finish = (lv, list) => {
    list.push(mixOf("Mixed practice", list.filter((_, i) => i % 3 === 0), "This lesson mixes puzzles you have learned in this level. Take your time.", true));
    list.push(mixOf(`Level ${lv} Challenge`, list.slice(0, 18), `Everything from level ${lv}. Think carefully, you can do it!`, false));
    return list;
  };

  const L7 = finish(7, [
    L("Two rules take turns", twoRule, [S("Two rules", "🔁", "Some patterns use two rules that take turns, like ×2 and then +1."), S("Find both", "🔍", "Look at the first jump, then the second jump. Then see if the jumps repeat."), S("Example", "📈", "2, 4, 5, 10, 11, 22 uses ×2, +1, ×2, +1... The next jump is +1, so the next number is 23.")]),
    L("Odd or even?", parity, [S("Odd and even rules", "🔢", "even + even = even. odd + odd = even. odd + even = odd."), S("Times", "✖️", "If one of the numbers is even, the answer to × is even. Only odd × odd is odd."), S("No need to calculate", "💡", "To find out odd or even, you can just look at the last digit of each number.")]),
    L("Sum and difference", sumDiff, [S("Two numbers", "⚖️", "Sometimes you know the total and how much more one has than the other."), S("Take away the extra", "➖", "Remove the extra from the total, then split what is left into two equal halves."), S("Put it back", "➕", "The kid with more gets the half PLUS the extra.")]),
    L("Squares and cubes", sqCube, [S("Square numbers", "🟦", "A square number is a number times itself: 3 × 3 = 9. We write it 3²."), S("Cube numbers", "🧊", "A cube number multiplies three times: 2 × 2 × 2 = 8. We write it 2³."), S("Odd numbers add up", "➕", "1 + 3 = 4, 1 + 3 + 5 = 9. The first few odd numbers always add up to a square number.")]),
    L("Venn: both, only, neither", vennOnly, [S("Two circles", "⭕⭕", "The middle is for things that are in both groups. Outside the circles is for 'neither'."), S("Only", "☝️", "'Only soccer' is the soccer circle without the middle part."), S("Total", "🧮", "Total = only A + only B + both + neither.")]),
    L("Who did it?", culprit, [S("Statements", "🗣️", "Each kid says something. Some statements are true and some are false."), S("Test each guess", "🔬", "Pretend each kid did it. Count how many statements come out true."), S("Match the rule", "✅", "The right guess matches the rule, like 'exactly one is telling the truth'.")]),
    L("Turning around", turning, [S("Compass", "🧭", "North, East, South, West go around in a circle, in that order."), S("Turns", "↪️", "Turn right: next direction. Turn left: the one before. Turn around: skip one."), S("Tip", "💡", "Do one turn at a time and write down the direction.")]),
    L("Number triangles", triangle, [S("Pyramid", "🔺", "In a number triangle, each box is the sum of the two boxes below it."), S("Build up", "⬆️", "Add the pairs in the bottom row to fill in the row above."), S("Missing box", "❓", "To find a missing box, use the numbers you know and work backwards.")]),
    L("Handshakes", handshake, [S("Everyone meets everyone", "🤝", "If 4 people each shake hands once, how many shakes? Count carefully."), S("Add down", "➕", "The first meets 3, the next meets 2 new people, the next meets 1. So 3 + 2 + 1 = 6."), S("Tip", "💡", "With n people, add n−1, then n−2, down to 1.")]),
    L("Missing digits", missDigit, [S("Hidden digits", "🙈", "A ❓ hides one digit in a sum."), S("Opposite operation", "🔄", "Use subtraction to undo an addition, or addition to undo a subtraction."), S("Find the digit", "🎯", "Find the whole hidden number, then look at the place with the ❓.")]),
    L("Bigger and smaller chains", chainIneq, [S("Clues about size", "🔠", "Clues like 'A is smaller than B' tell you how letters compare."), S("Make a line", "📏", "Link the clues into one line from smallest to biggest."), S("Tip", "💡", "Write the letters in a column and add one clue at a time.")]),
    L("Arrangements", arrange, [S("Order matters", "🔀", "When the order matters, each spot has fewer choices than the one before."), S("Multiply", "✖️", "3 kids in a line: 3 choices first, 2 next, 1 last. 3 × 2 × 1 = 6."), S("Medals", "🥇", "Only some places? Stop multiplying after those places.")]),
    L("Socks in the dark", pigeon, [S("Worst luck", "🌑", "To be SURE, think about the worst luck you could have."), S("Boxes", "📦", "If you have 3 colors, you could pick one of each without a pair."), S("One more", "☝️", "The very next pick must match one you already have.")]),
    L("Clock and time jumps", clockJump, [S("Add time", "⏰", "Add whole hours first, then minutes."), S("Stepping stones", "🪨", "Jump to the next whole hour, then add the rest."), S("Going back", "⏪", "To go back in time, take away hours first, then minutes.")]),
    L("Coordinate walks", coordWalk, [S("Coordinates", "🗺️", "(3, 5) means 3 across and 5 up."), S("Moves", "👣", "Right adds to the first number, left takes away. Up adds to the second, down takes away."), S("Tip", "💡", "Write the new spot after every move.")]),
    L("Letter patterns", letterPat, [S("Letters are numbers", "🔤", "A = 1, B = 2, C = 3... Turn letters into numbers to see the jumps."), S("Backwards and mixed", "↔️", "Some patterns go backwards. Others weave two patterns together."), S("Tip", "💡", "Look at every other letter if the pattern looks odd.")]),
    L("Times as many", timesMany, [S("Boxes", "📦", "Let the smallest amount be one box. 'Twice as many' means 2 boxes."), S("Count the boxes", "🧮", "Add all the boxes together."), S("Share", "➗", "Divide the total by the number of boxes to find what one box holds.")]),
    L("Age puzzles", ages, [S("Ages move together", "🎂", "Every year, everybody gets exactly one year older."), S("The gap stays", "↔️", "The difference between two ages never changes."), S("Tip", "💡", "Work out ages now first, then move forward or back.")])
  ]);

  // ======================= LEVEL 8 =======================
  const stickPat = () => {
    const [nm, a, d] = pick([["squares", 4, 3], ["triangles", 3, 2], ["hexagons", 6, 5]]);
    const vis = `<div style="font-size:1.1em">Figure 1: ${a} sticks<br>Figure 2: ${a + d} sticks<br>Figure 3: ${a + 2 * d} sticks<br>(${nm} in a row, sharing sides)</div>`;
    const hh = n => [
      "How many sticks do you add each time you add one more shape?",
      "Start with the sticks in Figure 1. Then add the same number of sticks once for every step after Figure 1.",
      ex([["Example: squares in a row use 4, 7, 10... Figure 6 uses 4 + 5 × 3 = 19 sticks. Now do yours.", 19], ["Example: triangles in a row use 3, 5, 7... Figure 10 uses 3 + 9 × 2 = 21 sticks. Now do yours.", 21]], n)];
    if (Math.random() < 0.6) { const n = ri(7, 14), ans = a + d * (n - 1); return num(`How many sticks does Figure ${n} need?`, vis, ans, hh(ans)); }
    const n = ri(6, 14), T = a + d * (n - 1);
    return num(`Which figure uses ${T} sticks?`, vis, n, [
      "How many sticks are added each step? Figure 1 starts with some sticks already.",
      `Take away the sticks of Figure 1 from ${T}. Then see how many steps of the same size fit. The figure number is one more than the number of steps.`,
      ex([["Example: squares use 4, 7, 10... Which figure uses 22 sticks? 22 − 4 = 18 and 18 ÷ 3 = 6 steps, so it is Figure 7. Now do yours.", 7], ["Example: triangles use 3, 5, 7... Which figure uses 17 sticks? 17 − 3 = 14, 14 ÷ 2 = 7 steps, so Figure 8. Now do yours.", 8]], n)]);
  };
  const DR = {
    3: ["Add up the digits. If the digit sum is in the 3 times table, the number is divisible by 3.", "Example: 417. 4 + 1 + 7 = 12, and 12 is in the 3 times table, so 417 is divisible by 3."],
    4: ["Look only at the last two digits. If they make a number in the 4 times table, the whole number is divisible by 4.", "Example: 1,324. The last two digits are 24, which is in the 4 times table, so yes."],
    6: ["A number is divisible by 6 if it is even AND its digit sum is in the 3 times table.", "Example: 534 is even and 5 + 3 + 4 = 12 is in the 3 times table, so 534 is divisible by 6."],
    9: ["Add up the digits. If the digit sum is in the 9 times table, the number is divisible by 9.", "Example: 738. 7 + 3 + 8 = 18, which is in the 9 times table, so 738 is divisible by 9."]
  };
  const divis = () => {
    const d = pick([3, 4, 6, 9]), lo = Math.ceil(100 / d), hi = Math.floor(999 / d);
    const hh = [`Use a divisibility rule for ${d}.`, DR[d][0], DR[d][1] + " Now do yours."];
    if (Math.random() < 0.6) {
      const right = ri(lo, hi) * d, ws = new Set();
      while (ws.size < 3) { const w = ri(lo, hi) * d + ri(1, d - 1); if (w < 1000) ws.add(w); }
      return mcq(`Which of these numbers is divisible by ${d}?`, big("➗"), right, [...ws], hh);
    }
    const yes = Math.random() < 0.5, n = ri(lo, hi) * d + (yes ? 0 : ri(1, d - 1));
    return mcq(`Is ${n} divisible by ${d}?`, big("➗"), yes ? "Yes" : "No", ["Yes", "No"], hh);
  };
  const factorsOf = n => Array.from({ length: n }, (_, i) => i + 1).filter(k => n % k === 0);
  const factorHunt = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = pick([6, 8, 10, 12, 14, 15, 16, 18, 20, 24, 28, 30, 36, 40, 45, 48]), c = factorsOf(n).length; return num(`How many factors does ${n} have? (Factors divide ${n} exactly, including 1 and ${n}.)`, big("🧩"), c, ["Factors come in pairs that multiply to make the number. Start with 1 × the number.", "Try 2, 3, 4, 5... in order. Each one that divides exactly gives a pair. Stop when the pairs repeat. Then count all the factors.", ex([["Example: 10 = 1 × 10 and 2 × 5, so the factors are 1, 2, 5, 10. That is 4 factors. Now do yours.", 4], ["Example: 16 = 1 × 16, 2 × 8 and 4 × 4, so the factors are 1, 2, 4, 8, 16. That is 5 factors. Now do yours.", 5]], c)]); }
    if (t === 1) { const ps = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47], cs = [15, 21, 25, 27, 33, 35, 39, 45, 49, 51, 55, 57]; return mcq("Which of these is a prime number?", big("🔑"), pick(ps), shuf(cs).slice(0, 3), ["A prime number has exactly two factors: 1 and itself.", "Try dividing each choice by 2, 3, 5 and 7. Most of them divide exactly by one of these.", "Example: 21 = 3 × 7, so it is not prime. 23 cannot be divided by 2, 3, 5 or 7, so it is prime. Now do yours."]); }
    if (t === 2) { const n = pick([12, 18, 20, 24, 30, 36, 40, 42, 48]), f = factorsOf(n), nf = []; for (let k = 3; k < n; k++) if (n % k) nf.push(k); const right = pick(nf); return mcq(`Which of these is NOT a factor of ${n}?`, big("🧩"), right, shuf(f.filter(x => x > 1 && x < n)).slice(0, 3), ["A factor divides the number exactly with nothing left over.", "Try dividing the number by each choice. Which one leaves a remainder?", "Example: Which is NOT a factor of 20: 4, 5, 6 or 10? 20 ÷ 6 leaves a remainder, so 6 is not a factor. Now do yours."]); }
    const g = ri(3, 12), [p, q] = pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [3, 7], [5, 6]]);
    return num(`What is the biggest number that divides exactly into both ${g * p} and ${g * q}?`, big("🧩"), g, ["List the factors of both numbers.", "Find the factors the two lists share. The biggest shared one is the answer.", "Example: 12 and 18. Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. Shared: 1, 2, 3, 6. Biggest is 6. Now do yours."]);
  };
  const vennMult = () => {
    const N = pick([20, 24, 30, 36, 40]); let a, b;
    do { a = ri(2, 6); b = ri(2, 6); } while (a === b || lcm(a, b) > N);
    const L1 = [], both = [], neither = [];
    for (let k = 1; k <= N; k++) { const x = k % a === 0, y = k % b === 0; if (x && y) both.push(k); else if (x) L1.push(k); else if (!y) neither.push(k); }
    const t = ri(0, 2);
    const text = t === 0 ? `Look at the numbers 1 to ${N}. How many are multiples of both ${a} and ${b}?` : t === 1 ? `Look at the numbers 1 to ${N}. How many are multiples of ${a} but NOT of ${b}?` : `Look at the numbers 1 to ${N}. How many are multiples of neither ${a} nor ${b}?`;
    const ans = t === 0 ? both.length : t === 1 ? L1.length : neither.length;
    return num(text, big("⭕⭕"), ans, [
      `Make a list of the multiples of ${a}, then a list of the multiples of ${b}.`,
      "Numbers in both lists go in the middle of the Venn diagram. Numbers in only one list go in that circle alone. Numbers in no list are outside.",
      "Example: numbers 1 to 20, multiples of 2 and of 5. 2s: 2, 4, ... 20 (10 numbers). 5s: 5, 10, 15, 20. Both: 10 and 20, so 2 numbers. 2s only: 10 − 2 = 8. Now do yours."]);
  };
  const knights = () => {
    for (;;) {
      const w = names(3), st = w.map((_, i) => { const o = [0, 1, 2].filter(x => x !== i); return { t: ri(0, 3), j: pick(o), o }; });
      const tv = (s, tt) => { const [p, q] = s.o; return s.t === 0 ? !tt[s.j] : s.t === 1 ? tt[s.j] : s.t === 2 ? !tt[p] && !tt[q] : !tt[p] || !tt[q]; };
      const all = [];
      for (let m = 0; m < 8; m++) { const tt = [!!(m & 1), !!(m & 2), !!(m & 4)]; if (st.every((s, i) => tv(s, tt) === tt[i])) all.push(tt); }
      const tg = ri(0, 2);
      if (!all.length || !all.every(a => a[tg] === all[0][tg])) continue;
      const tx = (s, i) => s.t === 0 ? `${w[s.j]} is a liar.` : s.t === 1 ? `${w[s.j]} is a truth-teller.` : s.t === 2 ? `${w[s.o[0]]} and ${w[s.o[1]]} are both liars.` : `At least one of ${w[s.o[0]]} and ${w[s.o[1]]} is a liar.`;
      return mcq(`Truth-tellers always tell the truth. Liars always lie.<br>${st.map((s, i) => `${w[i]}: “${tx(s, i)}”`).join("<br>")}<br>Is ${w[tg]} a truth-teller or a liar?`, big("🤥"), all[0][tg] ? "Truth-teller" : "Liar", ["Truth-teller", "Liar"], [
        "Pick one person and pretend they are a truth-teller. Follow what that means for the others.",
        "If you get a clash (someone's statement does not match what they are), your pretend was wrong. Then try the other way.",
        "Example: Ann says “Bo is a liar.” Bo says “We are both liars.” If Bo were a truth-teller, “we are both liars” would be false, a clash. So Bo is a liar, and then Ann's statement is true, so Ann is a truth-teller. Now do yours."]);
    }
  };
  const seatRow = () => {
    for (;;) {
      const w = names(4), pos = shuf([0, 1, 2, 3]), pool = [];
      for (let i = 0; i < 4; i++) {
        pool.push({ t: `${w[i]} sits at one end of the row.`, f: p => p[i] === 0 || p[i] === 3 });
        for (let k = 0; k < 4; k++) { pool.push({ t: `${w[i]} sits in seat ${k + 1}.`, f: p => p[i] === k }); pool.push({ t: `${w[i]} does not sit in seat ${k + 1}.`, f: p => p[i] !== k }); }
        for (let j = 0; j < 4; j++) if (j !== i) {
          pool.push({ t: `${w[i]} sits right next to ${w[j]}.`, f: p => Math.abs(p[i] - p[j]) === 1 });
          pool.push({ t: `${w[i]} does not sit next to ${w[j]}.`, f: p => Math.abs(p[i] - p[j]) > 1 });
          pool.push({ t: `${w[i]} sits somewhere to the left of ${w[j]}.`, f: p => p[i] < p[j] });
        }
      }
      const tr = shuf(pool.filter(c => c.f(pos))), use = [], all = perms([0, 1, 2, 3]);
      let cand = all;
      for (const c of tr) { use.push(c); cand = cand.filter(c.f); if (cand.length === 1) break; }
      if (cand.length !== 1 || use.length > 5) continue;
      const k = ri(0, 3), ans = w[pos.indexOf(k)];
      return mcq(`Four kids sit in seats 1, 2, 3 and 4, from left to right.<br>${use.map(c => c.t).join("<br>")}<br>Who sits in seat ${k + 1}?`, big("💺"), ans, w, [
        "Draw four boxes in a row for the seats. Write the kids' names as you learn where they go.",
        "Start with the clues that name a seat or an end. Then use 'next to' and 'left of' clues to place the others. 'Not' clues cross out options.",
        "Example: Seats 1-4. Zed is in seat 1. Kim sits next to Zed. So Kim is in seat 2. Lou is left of Max, so Lou is in seat 3 and Max in seat 4. Now do yours."]);
    }
  };
  const diceFacts = () => {
    const t = ri(0, 4), hh = [
      "On every die, the faces on opposite sides add up to 7: 1 and 6, 2 and 5, 3 and 4.",
      "Use the pairs that add to 7. A die has 6 faces and its dots total 21 (1 + 2 + 3 + 4 + 5 + 6).",
      "Example: the top shows 2, so the bottom shows 7 − 2 = 5. Three dice with tops 1, 2, 3 have bottoms 6, 5, 4 (total 15). Now do yours."];
    if (t === 0) { const x = ri(1, 6); return num(`On a die, opposite faces add up to 7. The top face shows ${x}. How many dots are on the bottom face?`, big("🎲"), 7 - x, hh); }
    if (t === 1) { const n = ri(2, 5), tops = Array.from({ length: n }, () => ri(1, 6)); return num(`${n} dice are rolled. The top faces show ${tops.join(", ")}. What do the bottom faces add up to?`, big("🎲"), 7 * n - tops.reduce((a, b) => a + b), hh); }
    if (t === 2) { const c = [pick([1, 6]), pick([2, 5]), pick([3, 4])], v = shuf(c); return num(`A die sits on a table. You can see 3 faces: ${v.join(", ")}. How many dots are on the 3 faces you cannot see?`, big("🎲"), 21 - v.reduce((a, b) => a + b), ["All the faces together have 1 + 2 + 3 + 4 + 5 + 6 dots. How many is that?", "Add up the dots you can see. Take that away from the total of all the faces.", "Example: you see 1, 2, 3 (6 dots). All faces have 21 dots, so the hidden faces have 21 − 6 = 15. Now do yours."]); }
    if (t === 3) {
      const mk = bad => { const a = pick([1, 6]), b = pick([2, 5]), c = pick([3, 4]); const s = [a, b, c]; if (bad) { const i = ri(0, 2); s[i] = 7 - s[(i + 1) % 3]; } return s.sort((x, y) => x - y).join(", "); };
      const right = mk(false), ws = new Set(); while (ws.size < 3) { const w = mk(true); if (w !== right && new Set(w.split(", ")).size === 3 && w.split(", ").some(x => w.split(", ").includes(String(7 - x)))) ws.add(w); }
      return mcq("Three faces of a die meet at one corner. Which three numbers could they be?", big("🎲"), right, [...ws], ["Faces that meet at a corner are next to each other, never opposite.", "Opposite faces add to 7. A corner set cannot have a pair of numbers that add to 7.", "Example: 1, 2, 3 is possible (no pair adds to 7). 2, 5, 3 is not possible, because 2 + 5 = 7. Now do yours."]);
    }
    const n = ri(2, 4); return num(`${n} dice are stacked in a tower. Add the top face and the bottom face of each die. What is the total of all those faces?`, big("🎲"), 7 * n, ["On each die, the top and bottom faces are opposite.", "Opposite faces always add to the same number on every die. Use that for each die and add.", "Example: for 3 dice: 7 + 7 + 7 = 21. Now do yours with your number of dice."]);
  };
  const doubling = () => {
    const t = ri(0, 4);
    if (t === 0) { const n = ri(2, 6); return num(`Tower of Hanoi: you move ${n} discs from one peg to another. The fewest moves needed is double the moves for ${n - 1} discs, plus 1. (1 disc takes 1 move.) How many moves for ${n} discs?`, big("🗼"), 2 ** n - 1, ["Start with 1 disc: 1 move. Build up one disc at a time.", "Each new disc: double the last answer and add 1. Keep going until you reach the number of discs asked.", "Example: 1 disc: 1. 2 discs: 2 × 1 + 1 = 3. 3 discs: 2 × 3 + 1 = 7. Now do yours."]); }
    if (t === 1) { const k = ri(3, 7); return num(`You fold a sheet of paper in half ${k} times. How many layers thick is the folded paper?`, big("📄"), 2 ** k, ["Each fold doubles the layers.", "Start with 1 layer. Double it once for every fold.", "Example: 3 folds: 1 → 2 → 4 → 8 layers. Now do yours."]); }
    if (t === 2) { const D = ri(10, 40); return num(`Lily pads double every day. They cover the whole pond on day ${D}. On which day was the pond half covered?`, big("🪷"), D - 1, ["Doubling goes forward. What goes backward?", "If the pads double each day, the day before a full pond had half as many pads.", "Example: a full pond on day 12 means it was half full on day 11. Now do yours."]); }
    if (t === 3) { const D = ri(10, 40); return num(`Lily pads double every day. They cover the whole pond on day ${D}. On which day was the pond a quarter covered?`, big("🪷"), D - 2, ["A quarter is half of a half.", "One day before full is half full. One more day back is a quarter.", "Example: full on day 12, half on day 11, a quarter on day 10. Now do yours."]); }
    const h = ri(3, 8); return num(`A bacterium splits into 2 every hour. Starting with 1, how many are there after ${h} hours?`, big("🦠"), 2 ** h, ["Each hour every one splits into two. That doubles the number.", "Start with 1. Double it once for each hour.", "Example: after 4 hours: 1 → 2 → 4 → 8 → 16. Now do yours."]);
  };
  const gridPaths = () => {
    if (Math.random() < 0.5) {
      const a = ri(1, 3), b = ri(1, 3), C = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };
      return num(`A town has ${a} blocks across and ${b} blocks down. You walk from the top-left corner to the bottom-right corner, only going right or down. How many different routes are there?`, big("🏙️"), C(a + b, a), [
        "At each corner you can go right or down. Count the ways to reach each corner, one corner at a time.",
        "Write a number at each corner. The top row and left column are all 1. Every other corner is the number above it plus the number to its left.",
        "Example: a 1 by 2 grid. Top row 1, 1, 1. Second row 1, 2, 3. The last corner has 3 routes. Now do yours."]);
    }
    const g = [[1, 1, 1, 1], [1, 2, 3, 4], [1, 3, 6, 10]], i = ri(1, 2), j = ri(1, 3), ans = g[i][j];
    const rows = g.map((r, ri_) => r.map((v, ci) => (ri_ === i && ci === j ? "❓" : v)).map(v => String(v).padStart(3, " ").replace(/ /g, " ")).join(" ")).join("<br>");
    return num("This grid shows how many routes lead to each corner (going only right or down). What number goes in the ❓?", `<div style="font-family:monospace;font-size:1.3em;line-height:1.6">${rows}</div>`, ans, [
      "Look at the numbers next to the ❓. How could they make the ❓?",
      "Each box is made by adding the box above it and the box to its left.",
      "Example: in a grid with 1, 1, 1 on the top and 1, ❓ below, the ❓ is 1 (above) + 1 (left) = 2. Now do yours."]);
  };
  const OPS = [["+", "+"], ["+", "−"], ["−", "+"], ["×", "+"], ["×", "−"], ["+", "×"], ["−", "×"], ["×", "×"], ["−", "−"]];
  const evalOps = (a, o1, b, o2, c) => {
    const f = (x, o, y) => (o === "+" ? x + y : o === "−" ? x - y : x * y);
    return o2 === "×" && o1 !== "×" ? f(a, o1, b * c) : f(f(a, o1, b), o2, c);
  };
  const WRD = { "+": "plus", "−": "minus", "×": "times" };
  const opPuzzle = () => {
    for (;;) {
      const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9), [o1, o2] = pick(OPS), T = evalOps(a, o1, b, o2, c);
      if (T < 0 || T > 90) continue;
      const wr = shuf(OPS.filter(([p, q]) => evalOps(a, p, b, q, c) !== T)).slice(0, 3);
      return mcq(`Which two signs make this true? (First box, then second box. Do × before + and −.)`, big(`${a} ⬜ ${b} ⬜ ${c} = ${T}`, 1.5), `${WRD[o1]} then ${WRD[o2]}`, wr.map(([p, q]) => `${WRD[p]} then ${WRD[q]}`), [
        "Try one pair of signs at a time on the numbers.",
        "Remember: × is done before + and −. Work out the × part first when there is one.",
        "Example: 3 ⬜ 4 ⬜ 2 = 10. Try × then −: 3 × 4 = 12, 12 − 2 = 10. It works! Now do yours."]);
    }
  };
  const remRiddle = () => {
    for (;;) {
      const n = ri(12, 59), m1 = pick([3, 4, 5, 6, 7]), m2 = pick([3, 4, 5, 6, 7].filter(x => x !== m1)), cand = [];
      for (let k = 10; k <= 60; k++) if (k % m1 === n % m1 && k % m2 === n % m2) cand.push(k);
      let extra = "";
      if (cand.length !== 1) { const par = cand.filter(k => k % 2 === n % 2); if (cand.length > 4 || par.length !== 1) continue; extra = n % 2 ? " I am odd." : " I am even."; }
      return num(`I am a number from 10 to 60. When you divide me by ${m1}, the remainder is ${n % m1}. When you divide me by ${m2}, the remainder is ${n % m2}.${extra} What number am I?`, big("🕵️"), n, [
        "List numbers that leave the right remainder for one clue: start with the remainder, then keep adding the divisor.",
        "Make the same kind of list for the other clue. Look for numbers on both lists (stay between 10 and 60).",
        "Example: from 1 to 20, remainder 1 when divided by 4 (1, 5, 9, 13, 17) and remainder 2 when divided by 3 (2, 5, 8, 11, 14, 17, 20). Both lists: 5 and 17. 'I am bigger than 10' leaves 17. Now do yours."]);
    }
  };
  const ASN = [
    ["An even number plus an even number is even.", "Always", "Test 2 + 4, 6 + 8 and 10 + 12."],
    ["The sum of two odd numbers is odd.", "Never", "Test 3 + 5, 7 + 9 and 1 + 11."],
    ["A prime number is odd.", "Sometimes", "List the first four prime numbers and look at each one."],
    ["A multiple of 3 is even.", "Sometimes", "List 3, 6, 9, 12, 15 and check each."],
    ["A square is a rectangle.", "Always", "A rectangle has four square corners. Does a square have them?"],
    ["A rectangle is a square.", "Sometimes", "Picture a long thin rectangle. Then picture one with all sides equal."],
    ["A triangle has 4 sides.", "Never", "However you draw a triangle, count its sides."],
    ["A number ending in 5 is divisible by 5.", "Always", "Test 15, 35 and 125."],
    ["A number divisible by 3 is divisible by 6.", "Sometimes", "Test 6, 9 and 12."],
    ["A number divisible by 6 is divisible by 3.", "Always", "Test 6, 12, 18 and 24."],
    ["The product of two odd numbers is odd.", "Always", "Test 3 × 5, 7 × 9 and 1 × 11."],
    ["Two even numbers multiplied give an odd number.", "Never", "Test 2 × 4, 6 × 8 and 10 × 2."],
    ["Doubling a whole number gives an even number.", "Always", "Test 3, 7 and 10."],
    ["A number plus 1 is odd.", "Sometimes", "Test with an even number and an odd number."],
    ["A shape with 4 sides is a square.", "Sometimes", "Think of a door, and think of a square window."],
    ["A triangle has a right angle (a square corner).", "Sometimes", "Picture a triangle cut from the corner of a square, and a triangle with 3 equal sides."],
    ["Multiplying a whole number (bigger than 0) by 2 makes it bigger.", "Always", "Test 1, 5 and 20."],
    ["A number that ends in 0 is divisible by 10.", "Always", "Test 30, 140 and 2,500."],
    ["Adding two numbers gives an even number.", "Sometimes", "Test 2 + 4, 3 + 5 and 2 + 3."],
    ["A number divisible by 4 is odd.", "Never", "List 4, 8, 12, 16 and check each."]
  ];
  const alwaysNever = () => {
    const it = pick(ASN);
    return mcq(`Is this statement always true, sometimes true or never true?<br><b>${it[0]}</b>`, big("🤔"), it[1], ["Always", "Sometimes", "Never"], [
      "Try a few different examples. Does the sentence stay true every time?", it[2],
      "Example: “A number plus 2 is even.” Try 4 → 6 (even). Try 5 → 7 (odd). One yes and one no, so it is sometimes true. Now do yours."]);
  };
  const IFC = [
    [["it rains", "it does not rain"], ["the grass gets wet", "the grass stays dry"], ["the dog gets muddy", "the dog stays clean"]],
    [["Mia practices", "Mia does not practice"], ["Mia gets better", "Mia does not get better"], ["Mia wins the contest", "Mia does not win the contest"]],
    [["the sun is out", "the sun is hiding"], ["the ice melts", "the ice stays frozen"], ["the puddle grows", "the puddle does not grow"]],
    [["Leo reads every night", "Leo does not read every night"], ["Leo learns new words", "Leo does not learn new words"], ["Leo does well on the test", "Leo does not do well on the test"]],
    [["the light is on", "the light is off"], ["the room is bright", "the room is dark"], ["the cat can see the toy", "the cat cannot see the toy"]],
    [["the pot is on the stove", "the pot is not on the stove"], ["the water boils", "the water does not boil"], ["steam fills the kitchen", "no steam fills the kitchen"]],
    [["the seed gets water", "the seed gets no water"], ["the seed grows", "the seed does not grow"], ["the plant makes a flower", "the plant makes no flower"]],
    [["the robot has a battery", "the robot has no battery"], ["the robot moves", "the robot does not move"], ["the robot reaches the door", "the robot does not reach the door"]]
  ];
  const ifChain = () => {
    const [A, B, C] = pick(IFC), t = ri(0, 3), up = s => s[0].toUpperCase() + s.slice(1);
    const rules = `If ${A[0]}, then ${B[0]}. If ${B[0]}, then ${C[0]}.`;
    let fact, right, wr;
    if (t === 0) { fact = `${up(A[0])}.`; right = up(C[0]); wr = [up(B[1]), up(C[1]), "We cannot tell."]; }
    else if (t === 1) { fact = `${up(C[1])}.`; right = up(A[1]); wr = [up(A[0]), up(B[0]), "We cannot tell."]; }
    else if (t === 2) { fact = `${up(B[0])}.`; right = up(C[0]); wr = [up(A[0]), up(C[1]), up(B[1])]; }
    else { fact = `${up(A[1])}.`; right = "We cannot tell about the others."; wr = [up(B[1]), up(C[1]), up(B[0])]; }
    return mcq(`${rules}<br>We know: ${fact}<br>What must be true?`, big("➡️"), right, wr, [
      "Draw arrows: first thing → second thing → third thing. Where does the fact start?",
      "An arrow works forward: when the start is true, the end must be true. If the end is false, the start cannot be true. If the start is false, the arrow tells you nothing.",
      "Example: If it snows, school closes. If school closes, I stay home. If it snows, I stay home. And if I did NOT stay home, then school did not close and it did not snow. Now do yours."]);
  };
  const binary = () => {
    const n = ri(4, 5), vals = n === 4 ? [8, 4, 2, 1] : [16, 8, 4, 2, 1], lamp = on => (on ? "💡" : "⚫");
    const row = bits => `<div style="font-size:1.6em;letter-spacing:.2em">${bits.map(lamp).join(" ")}</div><div style="font-family:monospace;font-size:1.1em">${vals.join("&nbsp;&nbsp;&nbsp;")}</div>`;
    const t = ri(0, 2);
    if (t === 0) { const bits = vals.map(() => Math.random() < 0.5); return num("Each lamp has a value. Add the values of the lamps that are ON (💡). What number is shown?", row(bits), vals.reduce((s, v, i) => s + (bits[i] ? v : 0), 0), ["Look at the lamps that are on. Each one has a number under it.", "Add up the numbers under the lamps that are on. Ignore the lamps that are off.", "Example: with lamps worth 8, 4, 2, 1, the pattern ⚫ 💡 ⚫ 💡 has 4 + 1 = 5. Now do yours."]); }
    if (t === 1) {
      const target = ri(1, 2 ** n - 1), bits = vals.map(v => false); let r = target; vals.forEach((v, i) => { if (r >= v) { bits[i] = true; r -= v; } });
      const fmt = b => b.map(x => (x ? "on" : "off")).join(" ");
      const ws = new Set(); while (ws.size < 3) { const b = vals.map(() => Math.random() < 0.5), s = fmt(b); if (s !== fmt(bits)) ws.add(s); }
      return mcq(`The lamps are worth ${vals.join(", ")} from left to right. Which pattern shows the number ${target}?`, big("💡"), fmt(bits), [...ws], ["Start with the biggest lamp value. Does it fit into your number?", "If it fits, turn it on and subtract it. Then go to the next lamp and ask again.", "Example: show 11 with 8, 4, 2, 1. 8 fits (11 − 8 = 3), 4 does not, 2 fits (3 − 2 = 1), 1 fits. So on, off, on, on. Now do yours."]);
    }
    const k = ri(2, 6); return num(`You have ${k} lamps, each on or off. How many different patterns (including all lamps off) can you make?`, big("💡"), 2 ** k, ["Each lamp has two choices: on or off.", "Every new lamp doubles the number of patterns. Start with 1 lamp = 2 patterns.", "Example: 1 lamp: 2. 2 lamps: 4. 3 lamps: 8. Now do yours."]);
  };
  const WD = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const weekJump = () => {
    const s = ri(0, 6), n = ri(8, 100), fwd = Math.random() < 0.75, ans = WD[((fwd ? s + n : s - n) % 7 + 7) % 7];
    return mcq(`Today is ${WD[s]}. What day will it be ${fwd ? "in" : "was it"} ${n} days${fwd ? "" : " ago"}?`, big("📅"), ans, shuf(WD), [
      "A week has 7 days, so after 7 days it is the same day again.",
      `Divide ${n} by 7. The whole weeks do not change the day. Only the leftover days matter. ${fwd ? "Count the leftover days forward." : "Count the leftover days backward."}`,
      "Example: Monday + 17 days. 17 = 2 weeks + 3 days. Monday + 3 days = Thursday. Now do yours."]);
  };
  const ARW = [["⬆️", "up"], ["↗️", "up and right"], ["➡️", "right"], ["↘️", "down and right"], ["⬇️", "down"], ["↙️", "down and left"], ["⬅️", "left"], ["↖️", "up and left"]];
  const spinArrow = () => {
    const step = pick([1, 2, 2, 3]), st = ri(0, 7), n = ri(9, 20), arr = Array.from({ length: 5 }, (_, i) => ARW[(st + step * i) % 8][0]);
    const ans = ARW[(st + step * (n - 1)) % 8][1];
    return mcq(`The arrow keeps turning the same way each time. Which way does arrow number ${n} point?`, big(arr.join(" ") + " ..."), ans, shuf(ARW.map(a => a[1])), [
      "Look at how far the arrow turns from the 1st to the 2nd. Is it the same each time?",
      "The arrows come back to the first one after a full turn. Work out how many arrows make a full turn, then use the leftovers.",
      "Example: ⬆️ ➡️ ⬇️ ⬅️ repeats every 4 arrows. Arrow 10 is 4 + 4 + 2, so it matches arrow 2: right. Now do yours (your turns may be smaller, so count the full turn first)."]);
  };
  const scoreTable = () => {
    const t = ri(0, 2);
    if (t === 0) { const w = ri(1, 6), d = ri(0, 4), l = ri(0, 4); return num(`In a league a win gives 3 points, a draw gives 1 and a loss gives 0. A team has ${w} wins, ${d} draws and ${l} losses. How many points?`, big("🏆"), 3 * w + d, ["Work out the points from wins, from draws and from losses one at a time.", "Multiply the wins by 3. Add one point for each draw. Losses add nothing.", "Example: 4 wins, 2 draws, 1 loss = 12 + 2 + 0 = 14 points. Now do yours."]); }
    if (t === 1) { const g = ri(4, 9); let w; do { w = ri(1, g); } while (false); const d = g - w, P = 3 * w + d; return num(`A team played ${g} games and did not lose any (win = 3 points, draw = 1). It has ${P} points. How many games did it win?`, big("🏆"), w, [`Every game gave at least 1 point. If all ${g} games were draws, how many points would that be?`, "Each win gives 2 more points than a draw. How many extra points does the team have? Divide by 2.", "Example: 5 games, no losses, 11 points. All draws would be 5 points. 11 − 5 = 6 extra, and 6 ÷ 2 = 3 wins. Now do yours."]); }
    const w = ri(1, 5), d = ri(1, 5); return num(`A team has ${3 * w + d} points from ${w} wins and some draws, and no other results (win = 3, draw = 1). How many draws did it have?`, big("🏆"), d, ["First work out the points from the wins.", "Take the points from wins away from the total. What is left must come from the draws, 1 point each.", "Example: 14 points with 4 wins: 12 points from wins, so 2 draws. Now do yours."]);
  };
  const fakeCoin = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(2, 27); let c = 0, p = 1; while (p < n) { p *= 3; c++; } return num(`One of ${n} coins is fake and lighter. You have a balance scale. What is the fewest number of weighings that is always enough to find the fake?`, big("🪙"), c, ["Each weighing has three results: left lighter, right lighter, or balanced.", "Each weighing can split the coins into three groups. How many times can you split the coins into 3 groups before only 1 coin remains?", "Example: 9 coins. Weigh 3 vs 3 to find the group of 3 holding the fake. Then weigh 1 vs 1 to find the fake. That is 2 weighings. Now do yours."]); }
    if (t === 1) {
      const lighter = pick(["left", "right", "none"]); const where = { left: "the left 3", right: "the right 3", none: "the 3 not on the scale" }[lighter];
      const res = lighter === "left" ? pick(["The left side goes up.", "The right side goes down."]) : lighter === "right" ? pick(["The right side goes up.", "The left side goes down."]) : "The scale balances.";
      return mcq(`There are 9 coins and one is fake and lighter. You put 3 coins on each side of a balance. ${res} Where is the fake coin?`, big("⚖️"), where, ["the left 3", "the right 3", "the 3 not on the scale"], ["The fake coin is lighter. Which side of a balance goes up: the lighter side or the heavier side?", "If one side is lighter, the fake is on that side. If the scale balances, all those coins weigh the same.", "Example: 9 coins, 3 vs 3. If the left side goes down, the left is heavier, so the right side holds the lighter fake. Now do yours."]);
    }
    const k = ri(1, 4); return num(`With ${k} weighing${k > 1 ? "s" : ""} on a balance, what is the biggest number of coins you can look through to find one lighter fake coin?`, big("🪙"), 3 ** k, ["Think of how many groups one weighing can sort the coins into.", "Each weighing splits the coins into 3 groups. Every extra weighing multiplies the number of coins by 3.", "Example: 1 weighing: 3 coins. 2 weighings: 3 × 3 = 9 coins. Now do yours."]);
  };

  const L8 = finish(8, [
    L("Growing sticks", stickPat, [S("Shapes in a row", "⬜⬜⬜", "When you add one more square to a row, you add the same number of sticks each time."), S("Rule", "📏", "Sticks = the sticks in Figure 1 + the jump × (figure number − 1)."), S("Tip", "💡", "Make a table of figure and sticks to spot the jump.")]),
    L("Divisibility tricks", divis, [S("Quick checks", "➗", "You can tell if a number divides exactly without dividing."), S("3 and 9", "🔢", "Add the digits. If that sum is in the 3 (or 9) table, the number is too."), S("4 and 6", "✂️", "For 4 look at the last two digits. For 6 the number must be even and divisible by 3.")]),
    L("Factors and primes", factorHunt, [S("Factors", "🧩", "Factors are numbers that divide exactly. They come in pairs, like 3 × 4 = 12."), S("Prime", "🔑", "A prime has exactly two factors: 1 and itself. 2, 3, 5, 7, 11, 13..."), S("Biggest shared factor", "🤝", "List the factors of two numbers and pick the biggest one they share.")]),
    L("Venn: multiples", vennMult, [S("Multiples", "✖️", "Multiples of 3 are 3, 6, 9, 12... Skip count to list them."), S("Two circles", "⭕⭕", "A number in both lists goes in the middle."), S("Count", "🧮", "Only A = multiples of A minus the middle ones.")]),
    L("Knights and knaves", knights, [S("Two kinds of people", "🤥", "Truth-tellers always tell the truth. Liars always lie."), S("Pretend", "🔬", "Pretend someone is a truth-teller. Their statement must be true. Follow it."), S("Clash", "💥", "If you find a clash, switch your pretend.")]),
    L("Seats in a row", seatRow, [S("Clues about seats", "💺", "Clues say where people sit: a seat, an end, next to or left of someone."), S("Boxes", "📦", "Draw boxes for the seats and write names in as you find them."), S("Not clues", "🚫", "A 'does not' clue crosses out an option.")]),
    L("Dice facts", diceFacts, [S("Opposite faces", "🎲", "On a die, opposite faces add up to 7."), S("21 dots", "🔢", "All six faces have 1 + 2 + 3 + 4 + 5 + 6 = 21 dots."), S("Corners", "🔺", "Three faces at a corner are next to each other, so no two of them add to 7.")]),
    L("Hanoi and doubling", doubling, [S("Doubling", "✖️", "Some things double each step: paper folds, germs, lily pads."), S("Tower of Hanoi", "🗼", "Moves for n discs = double the moves for n−1 discs, plus 1."), S("Backwards", "⏪", "Going back one step halves the amount.")]),
    L("Paths on a grid", gridPaths, [S("Routes", "🏙️", "You can only go right or down. How many ways to reach the end?"), S("Corner counts", "🔢", "Write the number of ways to reach each corner."), S("Add", "➕", "A corner = the corner above it + the corner to its left.")]),
    L("Which signs?", opPuzzle, [S("Missing signs", "➕➖", "Put +, − or × in the boxes to make the answer true."), S("Order", "1️⃣", "× is done before + and −."), S("Try", "🔬", "Test each pair of signs. Check the answer.")]),
    L("Remainder riddles", remRiddle, [S("Remainder", "➗", "17 ÷ 5 = 3 with remainder 2. Numbers that leave remainder 2 are 2, 7, 12, 17..."), S("Two lists", "📝", "Make a list for each clue and find the number on both lists."), S("Range", "📏", "The riddle gives a range. Stay inside it.")]),
    L("Always, sometimes, never", alwaysNever, [S("Three answers", "🤔", "Some statements are true every time, some only sometimes, some never."), S("Test it", "🔬", "Try different examples. One that breaks the rule shows it is not 'always'."), S("Find both", "⚖️", "A true example and a false example means 'sometimes'.")]),
    L("If, then chains", ifChain, [S("Chain", "⛓️", "If A then B, and if B then C. Then A leads to C."), S("Backwards", "🔄", "If C is false, then A cannot be true."), S("Careful", "⚠️", "If A is false, the rules say nothing about B or C.")]),
    L("Binary lamps", binary, [S("Lamp values", "💡", "Computers count with lamps (on or off). Each lamp is worth double the one to its right: 8, 4, 2, 1."), S("Read a number", "➕", "Add the values of the lamps that are on."), S("Make a number", "🔧", "Start with the biggest value that fits and subtract.")]),
    L("Days far away", weekJump, [S("Weeks", "📅", "7 days later is the same day of the week."), S("Leftovers", "➗", "Divide the days by 7. Only the leftover days change the day."), S("Back in time", "⏪", "For days ago, count the leftover days backward.")]),
    L("Spinning arrows", spinArrow, [S("Turning", "🔄", "An arrow turns by the same amount each time."), S("Full turn", "⭕", "After a full turn the arrow is back where it started. Then the pattern repeats."), S("Use leftovers", "➗", "Divide the place number by the length of the repeat. Use the leftover.")]),
    L("League points", scoreTable, [S("Points", "🏆", "In many leagues a win gives 3 points, a draw 1 and a loss 0."), S("Work backward", "🔙", "Take the points from wins away to find the draws."), S("No losses", "🛡️", "If a team never lost, every game gave at least 1 point.")]),
    L("The fake coin", fakeCoin, [S("Balance", "⚖️", "A balance has three results: left lighter, right lighter, or balanced."), S("Three groups", "3️⃣", "Split coins into three groups. One weighing finds the group with the fake."), S("Powers of 3", "✖️", "With k weighings you can sort 3 × 3 × ... (k times) coins.")])
  ]);

  // ======================= LEVEL 9 =======================
  const addFast = () => {
    const t = ri(0, 3), hh = [
      "Try pairing the first number with the last number. What does each pair add up to?",
      "All the pairs make the same total. Count how many pairs there are, then multiply (if there is a number left in the middle, add it).",
      "Example: 1 + 2 + ... + 8: pairs 1 + 8, 2 + 7, 3 + 6, 4 + 5 = 9 each, 4 pairs, 4 × 9 = 36. Now do yours."];
    if (t === 0) { const n = pick([10, 12, 14, 16, 18, 20, 24, 30, 40, 50, 60, 100]); return num(`Add up all the whole numbers: 1 + 2 + 3 + ... + ${n}`, big("➕"), n * (n + 1) / 2, hh); }
    if (t === 1) { const k = ri(6, 25); return num(`Add the first ${k} even numbers: 2 + 4 + 6 + ... + ${2 * k}`, big("➕"), k * (k + 1), hh); }
    if (t === 2) { const a = ri(5, 30), len = ri(6, 20), b = a + len - 1; return num(`Add up: ${a} + ${a + 1} + ${a + 2} + ... + ${b}`, big("➕"), len * (a + b) / 2, hh); }
    const k = ri(6, 20); return num(`Add the first ${k} odd numbers: 1 + 3 + 5 + ... (${k} numbers).`, big("➕"), k * k, ["Add the first 2, then the first 3, then the first 4 odd numbers. What kind of numbers do you get?", "The total for the first n odd numbers is n × n. Use your count for n.", "Example: the first 6 odd numbers: 1 + 3 + 5 + 7 + 9 + 11 = 36 = 6 × 6. Now do yours."]);
  };
  const missTerm = () => {
    const t = ri(0, 3); let arr, hi, h1, h2, h3;
    if (t === 0) { const d = ri(2, 9), s = ri(1, 20); arr = Array.from({ length: 5 }, (_, i) => s + d * i); hi = ri(1, 3); h1 = "Find the jump between two numbers that are next to each other."; h2 = "The jump is the same each time. Add the jump to the number before the ❓, or take it from the number after."; h3 = "Example: 4, 9, ❓, 19, 24 jumps by 5, so ❓ = 9 + 5 = 14. Now do yours."; }
    else if (t === 1) { const r = pick([2, 3]), s = ri(1, 4); arr = Array.from({ length: 5 }, (_, i) => s * r ** i); hi = ri(1, 3); h1 = "Check whether each number is a multiple of the one before it."; h2 = "Each number is the one before times the same number. Multiply the number before the ❓, or divide the number after it."; h3 = "Example: 2, 6, ❓, 54, 162 multiplies by 3, so ❓ = 6 × 3 = 18. Now do yours."; }
    else if (t === 2) { arr = [ri(1, 5), ri(1, 5)]; for (let i = 2; i < 6; i++) arr.push(arr[i - 1] + arr[i - 2]); hi = ri(2, 4); h1 = "Try adding two numbers that sit next to each other."; h2 = "Each number is the sum of the two numbers before it. So a number is also the next number minus the one before it."; h3 = "Example: 2, 3, 5, ❓, 13: 3 + 5 = 8, and 5 + 8 = 13 fits. So ❓ = 8. Now do yours."; }
    else { const k = ri(1, 7); arr = Array.from({ length: 5 }, (_, i) => (k + i) ** 2); hi = ri(1, 3); h1 = "Are these numbers a number times itself?"; h2 = "Find which numbers were multiplied by themselves in the numbers you can see. The ❓ is in the same list."; h3 = "Example: 9, 16, ❓, 36, 49 are 3², 4², ?, 6², 7², so ❓ = 5² = 25. Now do yours."; }
    const ans = arr[hi], shown = arr.map((v, i) => (i === hi ? "❓" : v)).join(", ");
    return num("Which number goes in the ❓?", big(shown), ans, [h1, h2, h3]);
  };
  const PRIMES = [2, 3, 5, 7, 11, 13];
  const pf = n => { const r = []; for (const p of [2, 3, 5, 7, 11, 13]) while (n % p === 0) { r.push(p); n /= p; } return r; };
  const primeFac = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = pick([12, 18, 20, 28, 30, 42, 45, 50, 60, 66, 70, 75, 84, 90, 98, 105, 126]); const f = pf(n); return num(`What is the biggest prime factor of ${n}?`, big("🌳"), f[f.length - 1], ["Split the number into a product, then keep splitting until every piece is a prime number.", "Start by dividing by 2, then 3, then 5, then 7 while they fit. Pick the biggest prime you used.", "Example: 40 = 2 × 20 = 2 × 2 × 10 = 2 × 2 × 2 × 5. The primes are 2 and 5, and the biggest is 5. Now do yours."]); }
    if (t === 1) { const n = pick([8, 12, 16, 18, 20, 24, 27, 30, 36, 40, 45, 48, 60, 72]); return num(`Write ${n} as a product of prime numbers (repeats count). How many primes are in the product?`, big("🌳"), pf(n).length, ["Keep splitting until every piece is prime.", "Divide by the smallest prime that fits, again and again. Count how many divisions it takes to reach 1.", ex([["Example: 24 = 2 × 2 × 2 × 3 has 4 primes. Now do yours.", 4], ["Example: 18 = 2 × 3 × 3 has 3 primes. Now do yours.", 3]], pf(n).length)]); }
    if (t === 2) { const k = ri(3, 5), ps = Array.from({ length: k }, () => pick([2, 2, 3, 3, 5, 7])); const v = ps.reduce((a, b) => a * b); return num(`What number is ${ps.join(" × ")}?`, big("🌳"), v, ["Multiply step by step from the left.", "Do two numbers first, then multiply the answer by the next number.", "Example: 2 × 3 × 5 = 6 × 5 = 30. Now do yours."]); }
    const n = pick([36, 48, 60, 72, 90, 100, 108, 150]), f = pf(n), right = f.join(" × ");
    const d = f.find(p => n % (p * p) === 0), wr = [];
    const comp = []; for (let k = 4; k < n; k++) if (n % k === 0 && !PRIMES.includes(k) && k < 40) comp.push(k);
    if (comp.length) { const c = pick(comp); wr.push(`${c} × ${n / c}`); }
    const alt = f.slice(); alt[0] = alt[0] === 2 ? 3 : 2; wr.push(alt.join(" × "));
    const sh = f.slice(1); wr.push(sh.join(" × "));
    return mcq(`Which one is ${n} written as a product of prime numbers only?`, big("🌳"), right, wr, ["A prime number has only 1 and itself as factors. Which choices have a piece that is not prime?", "Cross out any choice with a non-prime piece (like 4, 6, 9 or 10). Then multiply the rest to check.", "Example: 12 = 2 × 2 × 3 is all primes. 3 × 4 is not (4 is not prime). Now do yours."]);
  };
  const meetAgain = () => {
    const sets = [[4, 6], [6, 8], [3, 4], [5, 6], [4, 10], [6, 9], [8, 12], [10, 15], [3, 5], [2, 3, 4], [3, 4, 6], [4, 6, 8], [2, 5, 10], [3, 6, 9], [6, 8, 12]], s = pick(sets), v = s.reduce(lcm);
    const [ctx, unit] = pick([["Buses leave a stop every", "minutes"], ["Lights blink every", "seconds"], ["Runners finish a lap every", "minutes"]]);
    const who = s.length === 2 ? `${ctx} ${s[0]} ${unit} and every ${s[1]} ${unit}` : `${ctx} ${s[0]}, ${s[1]} and ${s[2]} ${unit} (three of them)`;
    return num(`${who}. They all start together now. After how many ${unit} do they happen together again?`, big("🔁"), v, [
      "List the multiples of the first number, then the second.",
      "You want the first number that is in all the lists. That is the smallest common multiple.",
      "Example: every 4 and every 6. Multiples of 4: 4, 8, 12... Multiples of 6: 6, 12... They meet at 12. Now do yours."]);
  };
  const houses = () => {
    const COL = ["red", "blue", "green"], PETS = shuf(["cat", "dog", "fish", "bird", "rabbit"]).slice(0, 3), P6 = perms([0, 1, 2]), combos = [];
    P6.forEach(c => P6.forEach(p => combos.push({ c, p })));
    for (;;) {
      const sol = pick(combos), cp = (s, a) => s.c.indexOf(a), pp = (s, x) => s.p.indexOf(x), pool = [];
      for (let a = 0; a < 3; a++) {
        for (let x = 0; x < 3; x++) { pool.push({ t: `The ${PETS[x]} lives in the ${COL[a]} house.`, f: s => cp(s, a) === pp(s, x) }); pool.push({ t: `The ${PETS[x]} does not live in the ${COL[a]} house.`, f: s => cp(s, a) !== pp(s, x) }); }
        pool.push({ t: `The ${COL[a]} house is at one end of the row.`, f: s => cp(s, a) !== 1 }); pool.push({ t: `The ${COL[a]} house is in the middle.`, f: s => cp(s, a) === 1 });
        for (let b = 0; b < 3; b++) if (a !== b) { pool.push({ t: `The ${COL[a]} house is right next to the ${COL[b]} house.`, f: s => Math.abs(cp(s, a) - cp(s, b)) === 1 }); pool.push({ t: `The ${COL[a]} house is somewhere to the left of the ${COL[b]} house.`, f: s => cp(s, a) < cp(s, b) }); }
      }
      for (let x = 0; x < 3; x++) { pool.push({ t: `The ${PETS[x]} lives in the middle house.`, f: s => pp(s, x) === 1 }); pool.push({ t: `The ${PETS[x]} lives at one end of the row.`, f: s => pp(s, x) !== 1 }); }
      const tr = shuf(pool.filter(c => c.f(sol))), use = []; let cand = combos;
      for (const c of tr) { use.push(c); cand = cand.filter(s => c.f(s)); if (cand.length === 1) break; }
      if (cand.length !== 1 || use.length > 5) continue;
      const hh = ["Draw three boxes in a row for the houses. Write what you learn in the boxes.", "Start with a clue that says a position (middle, end) or a pair that must go together. 'Not' clues cross out options.", "Example: Houses 1-3. Red is in the middle. Blue is left of green, so blue is house 1 and green is house 3. If the fish lives in the blue house, the fish is in house 1. Now do yours."];
      const head = `Three houses stand in a row (left to right). Each has its own color and its own pet.<br>${use.map(c => c.t).join("<br>")}<br>`;
      if (Math.random() < 0.5) { const x = ri(0, 2); return mcq(head + `Which color is the house with the ${PETS[x]}?`, big("🏠"), COL[sol.c[sol.p.indexOf(x)]], COL, hh); }
      const a = ri(0, 2); return mcq(head + `Which pet lives in the ${COL[a]} house?`, big("🏠"), PETS[sol.p[sol.c.indexOf(a)]], PETS, hh);
    }
  };
  const diceSum = () => {
    const all = []; for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) all.push([i, j]);
    const cnt = f => all.filter(([a, b]) => f(a, b)).length, t = ri(0, 4);
    const hh = ["Make a table of all 36 ways two dice can land: 1-1, 1-2, ... 6-6.", "Write the total for every pair, or list only the pairs that fit the rule. Then count them. Remember 2 and 5 is different from 5 and 2.", "Example: how many ways to get a total of 4? 1+3, 2+2, 3+1 = 3 ways. Now do yours."];
    if (t === 0) { const s = ri(2, 12); return num(`You roll two dice. In how many of the 36 ways is the total exactly ${s}?`, big("🎲🎲"), cnt((a, b) => a + b === s), hh); }
    if (t === 1) { const s = ri(8, 11); return num(`You roll two dice. In how many of the 36 ways is the total ${s} or more?`, big("🎲🎲"), cnt((a, b) => a + b >= s), hh); }
    if (t === 2) { const s = ri(3, 6); return num(`You roll two dice. In how many of the 36 ways is the total ${s} or less?`, big("🎲🎲"), cnt((a, b) => a + b <= s), hh); }
    if (t === 3) { const [txt, f] = pick([["both dice show the same number", (a, b) => a === b], ["the total is even", (a, b) => (a + b) % 2 === 0], ["the total is a multiple of 5", (a, b) => (a + b) % 5 === 0], ["the dice differ by exactly 1", (a, b) => Math.abs(a - b) === 1], ["the first die is bigger than the second", (a, b) => a > b]]); return num(`You roll two dice. In how many of the 36 ways does this happen: ${txt}?`, big("🎲🎲"), cnt(f), hh); }
    return mcq("You roll two dice and add. Which total is the most likely?", big("🎲🎲"), 7, [2, 3, 4, 5, 10, 11, 12].map(String).sort(() => Math.random() - 0.5), ["Count the ways to make some totals, like 2, 3, 4 and 7.", "The totals in the middle have the most ways. List the ways for 6, 7 and 8 and compare.", "Example: a total of 3 has 2 ways (1+2, 2+1), a total of 4 has 3 ways. The more ways, the more likely. Now try the middle totals."]);
  };
  const marbles = () => {
    const r = ri(3, 9), b = ri(2, 8), n = r + b, t = ri(0, 3);
    if (t === 0) return mcq(`A bag has ${r} red and ${b} blue marbles. You take out one red marble and keep it. What is the chance the next marble is red? (Answer as “red out of total”.)`, big("🔴🔵"), `${r - 1} out of ${n - 1}`, [`${r} out of ${n}`, `${r - 1} out of ${n}`, `${r} out of ${n - 1}`, `${r - 1} out of ${n - 2}`], ["After taking a marble out, the bag changes. How many red and how many marbles in all are left?", "Count the red marbles left, and the total marbles left. The chance is red out of total.", "Example: a bag has 5 red and 3 blue. Take out a red one: 4 red out of 7 left. Now do yours."]);
    if (t === 1) return mcq(`A bag has ${r} red and ${b} blue marbles. You pick one without looking. What is the chance it is NOT red? (Answer as “number out of total”.)`, big("🔴🔵"), `${b} out of ${n}`, [`${r} out of ${n}`, `${b} out of ${r}`, `${n} out of ${b}`, `${b} out of ${n - 1}`], ["'Not red' means every marble that is a different color.", "Count the marbles that are not red. The total is all the marbles in the bag.", "Example: 4 red and 6 blue marbles. Not red = blue: 6 out of 10. Now do yours."]);
    if (t === 2) { const rr = b + ri(1, 6); return num(`A bag has ${rr} red and ${b} blue marbles. How many blue marbles must you add so that red and blue are equally likely?`, big("🔴🔵"), rr - b, ["Equally likely means the same number of each color.", "How many more red marbles are there than blue? Add that many blue.", "Example: 9 red and 4 blue. 9 − 4 = 5 more blue needed. Now do yours."]); }
    const k = ri(2, 5); return mcq(`A bag has ${r} red and ${b} blue marbles. You add ${k} more red marbles. What is the chance of picking red now? (Answer as “red out of total”.)`, big("🔴🔵"), `${r + k} out of ${n + k}`, [`${r + k} out of ${n}`, `${r} out of ${n + k}`, `${r + k} out of ${b + k}`, `${r} out of ${n}`], ["Adding red marbles changes both the red count and the total count.", "Add the new red marbles to the red count. Add them to the total too.", "Example: 3 red and 5 blue, add 2 red: red is 5, total is 10, so 5 out of 10. Now do yours."]);
  };
  const codeCount = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(2, 6), k = ri(2, 4), th = pick(["symbols", "colors", "letters"]); return num(`A lock code has ${k} places. Each place can be any of ${n} different ${th}, and repeats are allowed. How many different codes are there?`, big("🔐"), n ** k, ["For the first place, how many choices do you have? And for the second?", "Repeats are allowed, so every place has the same number of choices. Multiply the choices for all places.", "Example: 3 places, 4 symbols, repeats allowed: 4 × 4 × 4 = 64. Now do yours."]); }
    if (t === 1) { const k = ri(2, 4); return num(`How many ${k}-digit numbers are there? (They cannot start with 0.)`, big("🔢"), 9 * 10 ** (k - 1), ["The first digit cannot be 0, so it has fewer choices than the other digits.", "First digit: 9 choices (1 to 9). Each other digit: 10 choices (0 to 9). Multiply.", "Example: 2-digit numbers: 9 × 10 = 90. Now do yours."]); }
    const ds = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, ri(3, 5)), k = ri(2, 3), rule = pick(["even", "odd", "bigger than 50"]);
    const all = perms(ds).map(p => p.slice(0, k)), seen = new Set();
    const nums = all.map(p => Number(p.join(""))).filter(v => { if (seen.has(v)) return false; seen.add(v); return true; });
    const f = rule === "even" ? v => v % 2 === 0 : rule === "odd" ? v => v % 2 === 1 : v => v > (k === 2 ? 50 : 500);
    return num(`Use the digits ${ds.join(", ")} to make ${k}-digit numbers. A digit can be used only once in a number. How many of these numbers are ${rule === "bigger than 50" ? (k === 2 ? "bigger than 50" : "bigger than 500") : rule}?`, big("🔢"), nums.filter(f).length, ["Think about which place has the rule (the last digit decides odd or even; the first digit decides big).", "Choose that place first. Then fill the other places from the digits that are left. Multiply the choices.", "Example: digits 1, 2, 3, 4, two-digit even numbers: last digit 2 or 4 (2 choices), first digit from the 3 left: 2 × 3 = 6. Now do yours."]);
  };
  const gates = () => {
    const A = Math.random() < 0.5, B = Math.random() < 0.5, C = Math.random() < 0.5, onoff = v => (v ? "ON" : "OFF");
    const o1 = pick(["AND", "OR", "XOR"]), o2 = pick(["AND", "OR", "XOR"]), nx = Math.random() < 0.5, nz = Math.random() < 0.5;
    const ap = (o, x, y) => (o === "AND" ? x && y : o === "OR" ? x || y : x !== y);
    const x = nx ? !A : A, z = nz ? !C : C, inner = ap(o1, x, B), res = ap(o2, inner, z);
    return mcq(`A lamp is wired like this:<br><b>(${nx ? "NOT " : ""}A ${o1} B) ${o2} ${nz ? "NOT " : ""}C</b><br>Switch A is ${onoff(A)}, B is ${onoff(B)} and C is ${onoff(C)}. Is the lamp on? (XOR means exactly one of the two is ON.)`, big("💡"), res ? "On" : "Off", ["On", "Off"], [
      "Work in order: first the part in brackets, then the rest. Do each NOT first.",
      "AND needs both ON. OR needs at least one ON. XOR needs exactly one ON. NOT flips ON and OFF.",
      "Example: (A AND B) OR C with A ON, B OFF, C ON: A AND B is OFF, then OFF OR ON is ON. Now do yours."]);
  };
  const fmtSet = a => "{" + a.join(", ") + "}";
  const setOps = () => {
    let A, B;
    do { A = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, ri(4, 7)).sort((x, y) => x - y); B = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, ri(4, 7)).sort((x, y) => x - y); } while (!A.some(v => B.includes(v)));
    const both = A.filter(v => B.includes(v)), onlyA = A.filter(v => !B.includes(v)), uni = [...new Set([...A, ...B])], t = ri(0, 3);
    const q = [["How many numbers are in BOTH sets? (the overlap)", both.length], ["How many different numbers are in A or B or both? (the union)", uni.length], ["How many numbers are in A but not in B?", onlyA.length], ["How many numbers are in just one of the sets, not both?", uni.length - both.length]][t];
    return num(`A = ${fmtSet(A)}<br>B = ${fmtSet(B)}<br>${q[0]}`, big("🔵🔴"), q[1], [
      "Put the numbers from both sets into a Venn diagram: overlap in the middle.",
      "Numbers that appear in both lists go in the middle. Write each other number in its own circle. Then count the part the question asks about.",
      "Example: A = {1, 2, 3, 4}, B = {3, 4, 5}. Overlap: {3, 4} (2 numbers). Union: {1, 2, 3, 4, 5} (5). Now do yours."]);
  };
  const clockMod = () => {
    const m = pick([5, 6, 7, 8, 12]), t = ri(0, 3), a = ri(2, m - 1), b = ri(2, m - 1), intro = `On a clock with only the numbers 0 to ${m - 1}, after ${m - 1} comes 0 again.`;
    const hh = ["Do the calculation the usual way first.", `If the answer is ${m} or more, take away ${m} again and again until it fits on the clock.`, ex([["Example: on a clock with 0 to 6, 5 + 4 = 9, and 9 − 7 = 2. Now do yours.", 2], ["Example: on a clock with 0 to 4, 3 × 4 = 12, and 12 − 10 = 2. Now do yours.", 2], ["Example: on a clock with 0 to 7, 6 + 6 = 12, and 12 − 8 = 4. Now do yours.", 4]], 99)];
    if (t === 0) return num(`${intro} What is ${a} + ${b}?`, big("🕒"), (a + b) % m, hh);
    if (t === 1) return num(`${intro} What is ${a} × ${b}?`, big("🕒"), (a * b) % m, hh);
    if (t === 2) { const hi = Math.max(a, b), lo = Math.min(a, b); if (hi === lo) return clockMod(); return num(`${intro} What is ${lo} − ${hi}? (Going back past 0 wraps around to ${m - 1}.)`, big("🕒"), (((lo - hi) % m) + m) % m, ["Start at the first number on the clock and count backward.", `When you go back past 0, you jump to ${m - 1}. Count the steps carefully.`, `Example: on a clock with 0 to 6, 2 − 4: back 2 reaches 0, back 1 more reaches 6, back 1 more reaches 5. So the answer is 5. Now do yours.`]); }
    const x = ri(1, m - 1), y = ri(0, m - 1); return num(`${intro} What number can you put in the ❓ so that ${x} + ❓ lands on ${y}?`, big("🕒"), ((y - x) % m + m) % m, ["Count forward from the first number until you land on the target.", `If you pass ${m - 1}, you wrap to 0 and keep going. Count how many steps you took.`, "Example: on a clock with 0 to 6, 5 + ❓ lands on 2: 5 → 6 → 0 → 1 → 2 is 4 steps. Now do yours."]);
  };
  const symChain = () => {
    const E = ["🍎", "🍌", "🍇", "🍓"], [p, q, r] = shuf(E).slice(0, 3), x = ri(2, 9), y = ri(2, 9), z = ri(2, 9);
    const m = pick([2, 3]), l1 = `${Array(m).fill(p).join(" + ")} = ${m * x}`;
    const addOrMul = Math.random() < 0.5, l2 = addOrMul ? `${p} + ${q} = ${x + y}` : `${p} × ${q} = ${x * y}`;
    const l3 = Math.random() < 0.5 ? `${q} + ${r} = ${y + z}` : `${q} × ${r} = ${y * z}`;
    return num(`These are true. What number is ${r}?`, `<div style="font-size:1.4em;line-height:1.7">${l1}<br>${l2}<br>${l3}</div>`, z, [
      `Start with the line that has only one kind of fruit (${p}).`,
      `Once you know ${p}, put its number in the next line to find ${q}. Then use ${q} in the last line.`,
      "Example: 🍒 + 🍒 = 8, 🍒 + 🍋 = 11, 🍋 × 🍉 = 21. 🍒 = 4, so 🍋 = 7, and 7 × 🍉 = 21 means 🍉 = 3. Now do yours."]);
  };
  const fencePost = () => {
    const t = ri(0, 4);
    if (t === 0) { const d = ri(2, 6), c = ri(5, 12); return num(`A straight fence is ${d * c} meters long. There is a post at both ends and one every ${d} meters. How many posts?`, big("🚧"), c + 1, ["Count the gaps between posts first.", "The number of posts is one more than the number of gaps, because of the extra post at the end.", "Example: a 12 meter fence with posts every 3 meters has 4 gaps and 5 posts. Now do yours."]); }
    if (t === 1) { const d = ri(2, 6), c = ri(5, 12); return num(`A round pond has a path ${d * c} meters long all the way around. A lamp stands every ${d} meters, starting at one spot. How many lamps?`, big("🔦"), c, ["On a circle there is no 'end'. The last gap leads back to the first lamp.", "On a circle, the number of lamps is the same as the number of gaps.", "Example: a circle path of 20 meters with a lamp every 5 meters: 4 lamps. Now do yours."]); }
    if (t === 2) { const d = ri(1, 3), p = ri(5, 12); return num(`A log is ${d * p} meters long. You cut it into pieces that are ${d} meter${d > 1 ? "s" : ""} each. How many cuts do you need?`, big("🪵"), p - 1, ["How many pieces will there be?", "Each cut makes one more piece. So the number of cuts is one less than the number of pieces.", "Example: a 12 meter log cut into 3 meter pieces: 4 pieces, 3 cuts. Now do yours."]); }
    if (t === 3) { const f = ri(4, 12); return num(`Between each pair of floors there is one flight of stairs. How many flights do you climb to go from floor 1 up to floor ${f}?`, big("🏢"), f - 1, ["Count the gaps between floors, not the floors.", "From floor 1 to floor 2 is one flight. So the flights are one fewer than the floors.", "Example: floor 1 to floor 5: 4 flights. Now do yours."]); }
    const g = ri(2, 4), n = ri(3, 5), m = n + ri(2, 4); return num(`A clock takes ${g * (n - 1)} seconds to strike ${n} times. The strikes are the same distance apart in time. How long will it take to strike ${m} times?`, big("🕰️"), g * (m - 1), ["Think about the gaps between strikes, not the strikes.", "Find how long one gap is. Then count the gaps for the new number of strikes (one fewer than the strikes).", "Example: 3 strikes take 6 seconds: 2 gaps of 3 seconds. 5 strikes have 4 gaps = 12 seconds. Now do yours."]);
  };
  const stairWays = () => {
    const W = [1, 1, 2, 3, 5, 8, 13, 21, 34], n = ri(4, 8), t = ri(0, 2);
    if (t < 2) return num(`You climb stairs by taking 1 step or 2 steps at a time. Staircase with 1 step: 1 way. 2 steps: 2 ways. 3 steps: 3 ways. How many ways to climb a staircase with ${n} steps?`, big("🪜"), W[n], ["Think about the last move: it was either 1 step or 2 steps.", "The ways for n steps = the ways for (n−1) steps + the ways for (n−2) steps. Build the list up from 1, 2, 3.", "Example: 1, 2, 3, then 3 + 2 = 5 for 4 steps, then 5 + 3 = 8 for 5 steps. Now continue to yours."]);
    const k = ri(4, 7); const row = W.slice(1, k + 1).map((v, i) => (i === k - 2 ? "❓" : v)).join(", ");
    return num("Number of ways to climb 1 step, 2 steps, 3 steps, ... Each number is made from the two before it. What goes in the ❓?", big(row), W[k - 1], ["Look at three numbers in a row. How does the biggest relate to the other two?", "Each number is the sum of the two numbers before it.", "Example: 1, 2, 3, 5, ❓: 3 + 5 = 8. Now do yours."]);
  };
  const NEG = [
    ["All birds can fly.", "At least one bird cannot fly.", ["No bird can fly.", "Some birds can fly.", "All birds have wings."], "To break 'all', you only need one that does not fit."],
    ["No cat likes water.", "At least one cat likes water.", ["All cats like water.", "Some cats do not like water.", "No dog likes water."], "To break 'no', you only need one that does."],
    ["Every kid in the class has a pencil.", "At least one kid in the class has no pencil.", ["No kid in the class has a pencil.", "Every kid in the class has a pen.", "Some kids have a pencil."], "To break 'every', you only need one that does not."],
    ["Some apples are green.", "No apple is green.", ["All apples are green.", "Some apples are red.", "Some apples are not green."], "'Some' is only false when there are none at all."],
    ["It is sunny and warm.", "It is not sunny or it is not warm.", ["It is not sunny and not warm.", "It is sunny and cold.", "It is rainy and cold."], "'A and B' is false if just one of the two is false."],
    ["Tom has a cat or a dog.", "Tom has no cat and no dog.", ["Tom has no cat or no dog.", "Tom has a cat and a dog.", "Tom has a fish."], "'A or B' is false only when both are false."],
    ["All rectangles have four equal sides.", "At least one rectangle does not have four equal sides.", ["No rectangle has four equal sides.", "Some rectangles have four equal sides.", "All squares have four equal sides."], "To break 'all', you only need one that does not fit."],
    ["Every dog in the park is on a leash.", "At least one dog in the park is not on a leash.", ["No dog in the park is on a leash.", "Some dogs in the park are on a leash.", "Every cat in the park is on a leash."], "To break 'every', you only need one that does not."],
    ["Nobody in the room is wearing red.", "Somebody in the room is wearing red.", ["Everybody in the room is wearing red.", "Somebody in the room is wearing blue.", "Nobody in the room is wearing blue."], "To break 'nobody', you only need one person."],
    ["Mia plays piano and sings.", "Mia does not play piano or does not sing.", ["Mia does not play piano and does not sing.", "Mia plays piano but does not sing.", "Mia plays guitar."], "'A and B' is false if just one of the two is false."]
  ];
  const negate = () => {
    const it = pick(NEG);
    return mcq(`Which sentence says the OPPOSITE (it is true exactly when this one is false)?<br><b>${it[0]}</b>`, big("🔀"), it[1], it[2], [
      "Ask: what is the smallest change in the world that would make the sentence false?",
      it[3],
      "Example: “All socks are blue” is false if just one sock is not blue. So the opposite is “At least one sock is not blue.” Now do yours."]);
  };
  const digitBuild = () => {
    for (;;) {
      const ds = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4), all = perms(ds).filter(p => p[0] !== 0).map(p => Number(p.join(""))), [txt, f, pickMax] = pick([
        ["the biggest even number", v => v % 2 === 0, true], ["the smallest even number", v => v % 2 === 0, false], ["the biggest odd number", v => v % 2 === 1, true],
        ["the smallest odd number", v => v % 2 === 1, false], ["the biggest number that is a multiple of 5", v => v % 5 === 0, true], ["the smallest number that is a multiple of 5", v => v % 5 === 0, false]]);
      const c = all.filter(f); if (!c.length) continue;
      return num(`Use each of the digits ${ds.join(", ")} exactly once (no number may start with 0). What is ${txt} you can make?`, big("🔢"), pickMax ? Math.max(...c) : Math.min(...c), [
        "Think about which digits are allowed in the ones place for this rule (even, odd or 5/0).",
        "Choose the ones digit first. Then, for the biggest number, put the biggest remaining digits first. For the smallest, put the smallest first (but not 0 at the start).",
        "Example: digits 2, 5, 6, 9: the biggest even number. Ones digit 6 (or 2). Use 6 at the end, then 9, 5, 2: 9526. Now do yours."]);
    }
  };
  const symmetry = () => {
    const t = ri(0, 2);
    if (t === 0) { const [n, a] = pick([["equilateral triangle (3 equal sides)", 3], ["square", 4], ["rectangle that is not a square", 2], ["regular pentagon (5 equal sides)", 5], ["regular hexagon (6 equal sides)", 6], ["triangle with exactly two equal sides", 1], ["rhombus that is not a square", 2], ["regular octagon (8 equal sides)", 8], ["kite", 1]]); return num(`How many lines of symmetry does a ${n} have?`, big("🪞"), a, ["Imagine folding the shape along a line so that both halves match exactly.", "Try lines that go through the corners, and lines that go through the middle of sides. Count every fold that works.", "Example: a rectangle that is not a square has 2 lines of symmetry (one up and down, one across), but not the diagonals. A square has 4. Now think about yours."]); }
    if (t === 1) {
      const two = ["H", "I", "X"], one = ["A", "M", "T", "U", "V", "Y", "B", "C", "D", "E"], none = ["F", "G", "J", "L", "N", "P", "Q", "R", "S", "Z"];
      const kind = pick(["two", "none"]);
      if (kind === "two") return mcq("Which letter has exactly 2 lines of symmetry?", big("🔤"), pick(two), shuf(one).slice(0, 3), ["Fold the letter in your mind from top to bottom and from left to right.", "A letter with 2 lines of symmetry is the same after both folds. Check each choice for both folds.", "Example: H works left to right and top to bottom (2 lines). A works only left to right (1 line). Now do yours."]);
      return mcq("Which letter has NO line of symmetry?", big("🔤"), pick(none), shuf(one.concat(two)).slice(0, 3), ["Try folding the letter along a straight line. Do both halves match?", "Check up-and-down folds and side-to-side folds. The letter we want matches in neither.", "Example: A can be folded down the middle (symmetry). F cannot be folded to match either way. Now do yours."]);
    }
    const n = ri(3, 10); return num(`A regular shape has ${n} equal sides and ${n} equal angles. How many lines of symmetry does it have?`, big("🪞"), n, ["Think about a square (4 sides) and an equilateral triangle (3 sides). How many lines do they have?", "Regular shapes have as many lines of symmetry as they have sides.", "Example: a regular pentagon has 5 sides and 5 lines of symmetry. Now do yours."]);
  };
  const cardPick = () => {
    if (Math.random() < 0.7) {
      for (;;) {
        const cards = shuf([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).slice(0, 6), k = ri(2, 3), sol = cards.slice(0, k), T = sol.reduce((a, b) => a + b), ws = new Set();
        for (let tries = 0; tries < 60 && ws.size < 3; tries++) { const s = shuf(cards).slice(0, ri(2, 3)); if (s.reduce((a, b) => a + b) !== T) ws.add(s.sort((a, b) => a - b).join(" and ")); }
        if (ws.size < 3) continue;
        return mcq(`You have the cards ${cards.sort((a, b) => a - b).join(", ")}. Which cards add up to exactly ${T}?`, big("🃏"), sol.sort((a, b) => a - b).join(" and "), [...ws], [
          "Add the cards in each choice. Which total matches the target?",
          "You can also estimate: choices that are clearly too big or too small can be crossed out first. Then add the ones left.",
          "Example: cards 3, 5, 8, 9 target 14. 3 and 5 make 8 (no). 5 and 9 make 14 (yes!). Now do yours."]);
      }
    }
    const cards = shuf([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).slice(0, ri(5, 6)), k = ri(2, 3), srt = [...cards].sort((a, b) => b - a);
    const big_ = Math.random() < 0.5, pickd = big_ ? srt.slice(0, k) : srt.slice(-k);
    return num(`You have the cards ${[...cards].sort((a, b) => a - b).join(", ")}. What is the ${big_ ? "biggest" : "smallest"} total you can make using exactly ${k} cards?`, big("🃏"), pickd.reduce((a, b) => a + b), ["Think about which cards you should use to make the total as " + (big_ ? "big" : "small") + " as possible.", "Put the cards in order, then take the " + (big_ ? "biggest" : "smallest") + " ones. Add them.", "Example: cards 2, 5, 7, 9, 12. Biggest total with 2 cards: 12 + 9 = 21. Smallest with 2 cards: 2 + 5 = 7. Now do yours with your count."]);
  };

  const L9 = finish(9, [
    L("Adding fast", addFast, [S("Pairs", "🧮", "To add 1 + 2 + ... + 10, pair the first and last: 1 + 10, 2 + 9, 3 + 8..."), S("Same total", "🟰", "Every pair makes 11. There are 5 pairs. 5 × 11 = 55."), S("Odd numbers", "➕", "The first n odd numbers add up to n × n.")]),
    L("Missing terms", missTerm, [S("Hole in a pattern", "🕳️", "A number is missing in the middle. Use the numbers around it."), S("Find the rule", "🔍", "Check: adding the same number? Multiplying? Adding the two before?"), S("Check", "✅", "Put your number in and see that the rule still works on both sides.")]),
    L("Prime factors", primeFac, [S("Prime building blocks", "🌳", "Every number is made by multiplying primes. 12 = 2 × 2 × 3."), S("Factor tree", "🌲", "Split a number into a product again and again until all pieces are prime."), S("Check", "✅", "Multiply the primes back together to get the number.")]),
    L("Meeting again", meetAgain, [S("Repeating things", "🔁", "Two things happen every 4 and every 6 minutes. When do they happen together?"), S("List multiples", "📝", "4, 8, 12, 16... and 6, 12, 18..."), S("Smallest match", "🎯", "The first number in both lists is the answer. This is called the least common multiple.")]),
    L("Houses and pets", houses, [S("Clue puzzle", "🏠", "Three houses, three colors, three pets. Each clue tells you a little."), S("Table", "📊", "Draw a row of three boxes for the houses. Fill in colors and pets."), S("Eliminate", "✂️", "'Not' clues cross out options. When one option is left, write it in.")]),
    L("Two dice", diceSum, [S("36 ways", "🎲🎲", "Two dice can land in 6 × 6 = 36 ways. Order matters: 2 and 5 is not the same as 5 and 2."), S("Count the ways", "🧮", "List the pairs that give the total you want."), S("Middle is most likely", "🏔️", "A total of 7 has the most ways (6). 2 and 12 have the fewest (1).")]),
    L("Marbles and chances", marbles, [S("Chance as a fraction", "🔴🔵", "A chance can be written as 'red out of total'."), S("Bag changes", "🛍️", "If you take out a marble and keep it, both the red count and the total change."), S("Equal chance", "⚖️", "Red and blue are equally likely when you have the same number of each.")]),
    L("Codes and counting", codeCount, [S("Places", "🔐", "A code has places. Count the choices for each place."), S("Multiply", "✖️", "If repeats are allowed, every place has the same number of choices. Multiply them."), S("Rules", "📏", "If a rule limits a place (not 0, or even), fill that place first.")]),
    L("Logic gates", gates, [S("Switches and lamps", "💡", "Computers use gates. AND needs both ON. OR needs at least one ON."), S("NOT and XOR", "🔀", "NOT flips ON and OFF. XOR means exactly one is ON."), S("Order", "📋", "Work out the brackets first.")]),
    L("Sets", setOps, [S("Sets", "🔵🔴", "A set is a group of things written in curly brackets, like {1, 2, 3}."), S("Overlap and union", "⭕⭕", "The overlap is what is in both sets. The union is everything in either set (count each number once)."), S("Only one", "☝️", "A minus B means the numbers in A that are not in B.")]),
    L("Clock numbers", clockMod, [S("Wrap around", "🕒", "On a clock, after 11 comes 0 (or 12) again. Numbers wrap around."), S("Add then wrap", "➕", "Add normally, then take away the clock size until the number fits."), S("Backwards", "⏪", "Going back past 0 wraps to the biggest number.")]),
    L("Fruit equations", symChain, [S("Pictures are numbers", "🍎", "Each picture stands for a number. Different pictures are different numbers."), S("Start with one kind", "1️⃣", "Find a line with only one kind of picture and solve it."), S("Pass it on", "➡️", "Use what you found in the next line, then the next.")]),
    L("Fence posts", fencePost, [S("Off by one", "🚧", "A fence with 4 gaps needs 5 posts (one extra at the end)."), S("Circles", "⭕", "A circle has no end, so posts = gaps."), S("Cuts", "✂️", "Cutting a log into 4 pieces takes 3 cuts.")]),
    L("Stair ways", stairWays, [S("Steps", "🪜", "You can climb 1 step or 2 steps at a time. How many ways?"), S("Last move", "👣", "The last move was 1 step or 2 steps."), S("Add two", "➕", "Ways(n) = ways(n−1) + ways(n−2). It is the Fibonacci pattern!")]),
    L("Opposite sentences", negate, [S("Not the same", "🔀", "The opposite of a sentence is true exactly when the sentence is false."), S("All and some", "👥", "The opposite of 'all' is 'at least one is not'. The opposite of 'no' is 'at least one is'."), S("And, or", "🔗", "The opposite of 'A and B' is 'not A or not B'.")]),
    L("Digit builder", digitBuild, [S("Making numbers", "🔢", "Use each digit once to make the biggest or smallest number."), S("Ones place", "1️⃣", "Even numbers end in an even digit. Odd numbers end in an odd digit. Multiples of 5 end in 0 or 5."), S("Order", "📏", "Biggest number: biggest digits first. Smallest number: smallest digits first, but never start with 0.")]),
    L("Lines of symmetry", symmetry, [S("Folding", "🪞", "A line of symmetry folds a shape so both halves match."), S("Regular shapes", "⬡", "A regular shape has as many lines of symmetry as sides."), S("Letters", "🔤", "H has 2 lines, A has 1 line, F has none.")]),
    L("Pick the cards", cardPick, [S("Totals", "🃏", "Some puzzles ask you to choose cards that add to a target."), S("Estimate", "👀", "Cross out choices that are far too big or too small."), S("Biggest and smallest", "📏", "For the biggest total, take the biggest cards. For the smallest, take the smallest.")])
  ]);

  Object.assign(LOGIC_LEVELS, { 7: L7, 8: L8, 9: L9 });
})();
