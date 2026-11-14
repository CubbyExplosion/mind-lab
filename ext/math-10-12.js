// ext/math-10-12.js  Mind Lab Math levels 10-12 (60 lessons)
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
  const cho = (ans, ...o) => {
    const seen = new Set([nz(ans)]), out = [];
    for (const x of shuf(o)) { if (!seen.has(nz(x)) && out.length < 3) { seen.add(nz(x)); out.push(x); } }
    return shuf([ans, ...out]);
  };
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => a * b / gcd(a, b);
  const fm = x => String(+x.toFixed(6));
  const dec = (n, k) => n.toFixed(k);
  const wrongAdj = ans => g => (Math.abs(g - ans) === 1 ? "So close! Check your last step again." : Math.abs(g - ans) % 10 === 0 && g !== ans ? "Almost! Check your carrying, borrowing or zeros." : null);
  const fracStr = (n, d) => {
    const g = gcd(n, d); n /= g; d /= g;
    if (d === 1) return String(n);
    if (n > d) { const w = Math.floor(n / d), r = n % d; return r ? `${w} ${r}/${d}` : String(w); }
    return `${n}/${d}`;
  };
  const sup = (b, e) => `${b}<sup>${e}</sup>`;

  // ================= LEVEL 10 =================
  const mult32 = () => {
    const a = ri(112, 489), o = ri(2, 9), t = ri(1, 4) * 10, b = t + o;
    const ex = pick([[213, 12], [321, 14], [145, 23], [132, 31]].filter(p => !(p[0] === a && p[1] === b))), eo = ex[1] % 10, et = ex[1] - eo;
    return { text: `${a} × ${b} = ?`, answer: a * b, wrong: wrongAdj(a * b),
      hints: ["Use an area model: break the second number into tens and ones, and multiply by each part.",
        `Split ${b} into ${t} and ${o}. Work out ${a} × ${o} and ${a} × ${t} on their own, then add the two answers.`,
        `Example: ${ex[0]} × ${ex[1]}. ${ex[0]} × ${eo} = ${ex[0] * eo} and ${ex[0]} × ${et} = ${ex[0] * et}. Add: ${ex[0] * eo + ex[0] * et}. Now do yours.`] };
  };
  const remStory = () => {
    const d = ri(4, 9), n = ri(30, 200), r0 = n % d; if (!r0) return remStory();
    const q = Math.floor(n / d), t = ri(0, 2), c = pick([["students", "van"], ["eggs", "box"], ["cookies", "bag"], ["stickers", "page"], ["books", "shelf"]]);
    const base = `${n} ${c[0]} are packed into ${c[1]}s. Each ${c[1]} holds ${d} ${c[0]}.`;
    const tx = [`${base} How many ${c[1]}s are needed to hold all of them?`, `${base} How many ${c[1]}s are completely full?`, `${base} How many ${c[0]} are left over after the full ${c[1]}s are filled?`][t];
    const ans = [q + 1, q, r0][t];
    return { text: tx, answer: ans, wrong: g => (t === 0 && g === q ? "Those are only the full ones. What happens to the leftovers?" : null),
      hints: ["Divide first, with long division. You will get a quotient and a remainder.",
        ["The leftovers still need a place to go, so think about whether you need one more container.", "Only count the containers that are completely filled. The remainder is not a full one.", "The remainder is what is left after all the full groups are made."][t],
        "Example: 25 kids ride in cars of 4. 25 ÷ 4 = 6 R 1. Six cars are full, 1 kid is left over, so 7 cars are needed to carry everyone. Now do yours."] };
  };
  const divZero = () => {
    const d = ri(2, 9), q = pick([ri(1, 9) * 100 + ri(1, 9), ri(1, 9) * 100 + ri(1, 9) * 10, ri(1, 9) * 1000 + ri(1, 9)]), n = d * q;
    return { text: `${n} ÷ ${d} = ?`, answer: q, wrong: wrongAdj(q),
      hints: ["Divide one place at a time. Careful: some places may not hold a whole group.",
        "If the next digit is too small to divide, write a 0 in the answer for that place, then bring down the next digit.",
        "Example: 618 ÷ 6. 6 into 6 is 1. 6 into 1 is 0, so write 0 and bring down the 8. 6 into 18 is 3. The answer is 103. Now do yours."] };
  };
  const factorsList = n => { const f = []; for (let i = 2; i <= n; i++) while (n % i === 0) { f.push(i); n /= i; } return f; };
  const primeFact = () => {
    const n = pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 50, 60, 63, 72]), f = factorsList(n);
    if (Math.random() < 0.55) {
      const ans = f.join(" × "), merged = [f[0] * f[1], ...f.slice(2)].join(" × "), nextP = x => (x === 2 ? 3 : x === 3 ? 5 : x === 5 ? 7 : 11);
      const alt = f.slice(0, -1).concat(nextP(f[f.length - 1])).join(" × ");
      return { text: `Which is the prime factorization of ${n}?`, choices: cho(ans, merged, alt, f.concat(2).join(" × "), [1, ...f].join(" × ")), answer: ans,
        hints: ["Prime factorization means writing the number as a product of prime numbers only.", "Use a factor tree. Split the number into two factors, then keep splitting until every branch is a prime. Multiply your choice to check it.",
          "Example: 54 = 6 × 9 = (2 × 3) × (3 × 3), so 54 = 2 × 3 × 3 × 3. All of those are prime. Now check your choices."] };
    }
    const i = ri(0, f.length - 1), shown = f.map((x, j) => (j === i ? "?" : x)).join(" × ");
    return { text: `${n} = ${shown}, and all the numbers are prime. What is the missing prime?`, answer: f[i],
      hints: ["Multiply the primes you can see. Then think about what number is still needed to reach the total.", "Divide the big number by the product of the primes you can see. The result is the missing prime.",
        "Example: 66 = 2 × ? × 11. 2 × 11 = 22 and 66 ÷ 22 = 3, so the missing prime is 3. Now do yours."] };
  };
  const gcfQ = () => {
    const g = ri(2, 12), pairs = [[2, 3], [2, 5], [3, 4], [3, 5], [2, 7], [4, 5], [3, 7], [5, 6], [4, 7], [5, 7]], p = pick(pairs), sw = Math.random() < 0.5;
    const a = g * p[sw ? 1 : 0], b = g * p[sw ? 0 : 1], ex = pick([[14, 21], [16, 40], [18, 27]].filter(e => !(e[0] === a && e[1] === b)));
    const e = { "14,21": "14: 1, 2, 7, 14. 21: 1, 3, 7, 21. The greatest factor in both lists is 7.", "16,40": "16: 1, 2, 4, 8, 16. 40: 1, 2, 4, 5, 8, 10, 20, 40. The greatest factor in both lists is 8.", "18,27": "18: 1, 2, 3, 6, 9, 18. 27: 1, 3, 9, 27. The greatest factor in both lists is 9." }[ex.join()];
    return { text: `What is the greatest common factor (GCF) of ${a} and ${b}?`, answer: g,
      hints: ["The GCF is the biggest number that divides both numbers with nothing left over.", "List all the factors of each number. Circle the ones that are in both lists, then pick the biggest.",
        `Example: ${ex[0]} and ${ex[1]}. ${e} Now do yours.`] };
  };
  const bench = () => {
    const b = pick([5, 6, 8, 10, 12]);
    let a, tgt, d, i = 0;
    do { a = ri(1, b - 1); const ds = [[Math.abs(a / b), "0"], [Math.abs(a / b - 0.5), "1/2"], [Math.abs(a / b - 1), "1"]].sort((x, y) => x[0] - y[0]); tgt = ds[0][1]; d = ds[1][0] - ds[0][0]; } while (d < 0.04 && ++i < 200);
    return { text: `Is ${a}/${b} closest to 0, to 1/2, or to 1?`, choices: ["0", "1/2", "1"], answer: tgt,
      hints: ["Picture a number line from 0 to 1 with 1/2 in the middle. Where would the fraction land?", `Find half of the bottom number (${b} ÷ 2). Compare the top number to that half, and to 0 and ${b}.`,
        "Example: 7/8. Half of 8 is 4, and 7 is much closer to 8 than to 4 or 0. So 7/8 is close to a whole. Now do yours."] };
  };
  const mixedStr = (W, r, d) => (r ? (W ? `${W} ${r}/${d}` : `${r}/${d}`) : String(W));
  const addMixed = () => {
    let d, w1, w2, a, b, W, r, i = 0;
    do { d = pick([5, 7, 8, 9, 10, 12]); w1 = ri(1, 6); w2 = ri(1, 6); a = ri(1, d - 1); b = ri(1, d - 1); const t = (w1 + w2) * d + a + b; W = Math.floor(t / d); r = t % d; } while ((r === 0 || gcd(r, d) > 1) && ++i < 200);
    const ans = mixedStr(W, r, d);
    return { text: `${w1} ${a}/${d} + ${w2} ${b}/${d} = ?`, choices: cho(ans, mixedStr(W + 1, r, d), mixedStr(W, r, d * 2), mixedStr(w1 + w2, a + b, d), mixedStr(W - 1, r, d)), answer: ans,
      hints: ["Add the whole numbers together and add the fractions together.", `Add the tops of the fractions (the bottom stays ${d}). If that fraction is bigger than 1 whole, trade ${d}/${d} for 1 whole.`,
        "Example: 2 3/4 + 1 3/4. Wholes: 2 + 1 = 3. Fractions: 3/4 + 3/4 = 6/4 = 1 2/4. 3 + 1 2/4 = 4 2/4. Now do yours."] };
  };
  const subMixed = () => {
    let d, w1, w2, a, b, W, r, i = 0;
    do { d = pick([5, 7, 8, 9, 10, 12]); w1 = ri(2, 8); w2 = ri(1, w1 - 1); a = ri(0, d - 1); b = ri(1, d - 1); const t = (w1 * d + a) - (w2 * d + b); W = Math.floor(t / d); r = t % d; } while ((t0(w1, a, w2, b, d) <= 0 || r === 0 || gcd(r, d) > 1) && ++i < 300);
    function t0(x, y, z, u, dd) { return (x * dd + y) - (z * dd + u); }
    const ans = mixedStr(W, r, d), fa = a ? ` ${a}/${d}` : "";
    return { text: `${w1}${fa} − ${w2} ${b}/${d} = ?`, choices: cho(ans, mixedStr(W + 1, r, d), mixedStr(w1 - w2, Math.abs(a - b), d), mixedStr(W, d - r, d), mixedStr(W - 1, r, d)), answer: ans,
      hints: ["Compare the fractions first. Can you subtract the bottom fraction from the top fraction?", `If the top fraction is smaller, regroup: take 1 whole from the whole number and turn it into ${d}/${d}, then add it to the fraction.`,
        "Example: 5 1/4 − 2 3/4. 1/4 is less than 3/4, so regroup: 5 1/4 = 4 5/4. 4 5/4 − 2 3/4 = 2 2/4. Now do yours."] };
  };
  const FD = [[1, 2, "0.5"], [1, 4, "0.25"], [3, 4, "0.75"], [1, 5, "0.2"], [2, 5, "0.4"], [3, 5, "0.6"], [4, 5, "0.8"], [7, 10, "0.7"], [9, 100, "0.09"], [23, 100, "0.23"], [3, 20, "0.15"], [7, 20, "0.35"], [3, 25, "0.12"], [9, 25, "0.36"], [1, 20, "0.05"], [17, 50, "0.34"]];
  const fracDec = () => {
    const it = pick(FD);
    if (Math.random() < 0.5) {
      const o = shuf(FD.filter(x => x[2] !== it[2])).slice(0, 3).map(x => x[2]);
      return { text: `Which decimal equals ${it[0]}/${it[1]}?`, choices: cho(it[2], ...o, dec(it[0] / it[1] * 10, 1)), answer: it[2],
        hints: ["Try to turn the bottom number into 10 or 100 by multiplying. Multiply the top by the same number.", "A fraction with 100 on the bottom is read as hundredths: the top number gives the digits after the decimal point.",
          "Example: 3/50. 50 × 2 = 100, so 3/50 = 6/100 = 0.06. Now do yours."] };
    }
    const o = shuf(FD.filter(x => x[2] !== it[2])).slice(0, 4).map(x => `${x[0]}/${x[1]}`);
    return { text: `Write ${it[2]} as a fraction in simplest form.`, choices: cho(`${it[0]}/${it[1]}`, ...o), answer: `${it[0]}/${it[1]}`,
      hints: ["Read the decimal as tenths or hundredths and write it as a fraction first.", "Then divide the top and bottom by the same number until you cannot simplify any more.",
        "Example: 0.45 = 45/100. Both divide by 5: 9/20. Now do yours."] };
  };
  const thousandths = () => {
    const a = ri(1, 9), b = ri(1, 9), c = rx(1, 9, b), t = ri(0, 2), n = `${ri(0, 9)}.${a}${b}${c}`;
    if (t === 0) { const place = ri(0, 2), dg = [a, b, c][place], nm = ["tenths", "hundredths", "thousandths"][place]; return { text: `In ${n}, which digit is in the ${nm} place?`, answer: dg,
      hints: ["After the decimal point the places go: tenths, hundredths, thousandths.", "Count the places to the right of the decimal point. The first one is tenths, the second is hundredths.", "Example: in 6.274 the 7 is in the hundredths place. Now do yours."] }; }
    if (t === 1) { const ans = `0.${a}${b}${c}`; return { text: `${a} tenths + ${b} hundredths + ${c} thousandths = ?`, choices: cho(ans, `0.${c}${b}${a}`, `0.${a}0${b}${c}`, `${a}.${b}${c}`, `0.0${a}${b}${c}`), answer: ans,
      hints: ["Write each part in its own decimal place, starting right after the decimal point.", "Tenths come first, then hundredths, then thousandths. Put a 0 in any place that is empty.", "Example: 4 tenths + 0 hundredths + 5 thousandths = 0.405. Now do yours."] }; }
    const ans = `${a}${b}${c}/1000`; return { text: `Which fraction is the same as 0.${a}${b}${c}?`, choices: cho(ans, `${a}${b}${c}/100`, `${a}${b}${c}/10`, `${a}${b}/1000`, `${c}${b}${a}/1000`), answer: ans,
      hints: ["Count the digits after the decimal point. Three digits means thousandths.", "Write the digits as the top number and 1000 as the bottom number.", "Example: 0.047 = 47/1000. Now do yours."] };
  };
  const tenHund = () => {
    const a = ri(1, 9), b = ri(1, 9) + ri(0, 1) * 10 * ri(0, 8), ex = pick([[2, 15], [4, 8], [6, 23]]);
    if (Math.random() < 0.6) return { text: `${a}/10 + ${b}/100 = ?/100`, answer: a * 10 + b,
      hints: ["The bottoms are different. Change tenths into hundredths first.", `Multiply the top and bottom of ${a}/10 by 10. Then add the tops over 100.`,
        `Example: ${ex[0]}/10 + ${ex[1]}/100. ${ex[0]}/10 = ${ex[0] * 10}/100. Then ${ex[0] * 10} + ${ex[1]} = ${ex[0] * 10 + ex[1]}, so ${ex[0] * 10 + ex[1]}/100. Now do yours.`] };
    const c = ri(1, 9), d = ri(1, 9), ans = `0.${c}${d}`;
    return { text: `Write ${c}/10 + ${d}/100 as a decimal.`, choices: cho(ans, `0.${d}${c}`, `${c}.${d}`, `0.0${c + d > 9 ? 9 : c + d}`, `0.${c + d > 9 ? 9 : c + d}`), answer: ans,
      hints: ["Tenths are the first place after the decimal point and hundredths are the second.", "Write the tenths digit first, then the hundredths digit, right after the point.", "Example: 4/10 + 7/100 = 0.47. Now do yours."] };
  };
  const unkAngle = () => {
    const t = ri(0, 3), a = ri(15, 80), b = ri(15, 70);
    if (t === 0) return { text: `Two angles sit side by side on a straight line. One is ${a + 20}°. How big is the other angle in degrees?`, visual: "📐", answer: 180 - a - 20,
      hints: ["Angles that make a straight line add up to 180°.", "Subtract the angle you know from the total for a straight line.", "Example: a straight line has a 130° angle and an unknown angle. 180 − 130 = 50°. Now do yours."] };
    if (t === 1) return { text: `A right angle is split into two angles. One is ${a}°. How big is the other angle in degrees?`, visual: "📐", answer: 90 - a,
      hints: ["A right angle is 90°. The two smaller angles share it.", "Subtract the angle you know from 90.", "Example: a right angle is split into 35° and a mystery angle. 90 − 35 = 55°. Now do yours."] };
    if (t === 2) return { text: `Three angles meet at a point and fill a whole turn. Two are ${a + 50}° and ${b + 60}°. How big is the third in degrees?`, visual: "🔄", answer: 360 - a - 50 - b - 60,
      hints: ["Angles all the way around a point make a full turn of 360°.", "Add the two angles you know, then subtract from 360.", "Example: 120° and 100° leave 360 − 120 − 100 = 140°. Now do yours."] };
    return { text: `Three angles sit side by side on a straight line. Two of them are ${a}° and ${b}°. How big is the third angle in degrees?`, visual: "📐", answer: 180 - a - b,
      hints: ["All the angles on a straight line add up to 180°.", "Add the two angles you know, then subtract that total from 180.", "Example: angles of 50° and 70° on a line. 50 + 70 = 120 and 180 − 120 = 60°. Now do yours."] };
  };
  const LINES = [["Two lines that never meet and stay the same distance apart", "parallel"], ["Two lines that meet at a right angle (90°)", "perpendicular"], ["Two lines that cross each other at a point", "intersecting"],
    ["The two rails of a straight railroad track", "parallel"], ["The corner where a wall meets the floor in a room", "perpendicular"], ["Two roads that cross in the shape of an X", "intersecting"],
    ["The top and bottom edges of a rectangle", "parallel"], ["The hour and minute hands at 3:00", "perpendicular"], ["The lines in the plus sign +", "perpendicular"], ["The lines on a notebook page", "parallel"]];
  const lineQ = () => {
    const it = pick(LINES);
    return { text: `${it[0]} are...`, choices: ["parallel", "perpendicular", "intersecting"], answer: it[1],
      hints: ["Three words: parallel lines never meet, perpendicular lines cross at 90°, and intersecting lines cross at any angle.", "Ask: do they ever meet? If they do, is the corner a square corner?",
        "Example: the two long edges of a ruler never meet, so they are parallel. Now think about yours."] };
  };
  const triQ = () => {
    if (Math.random() < 0.5) {
      const s = ri(3, 9), t = pick([0, 1, 2]), dif = rx(2, 12, s), x = [s, s, s], y = [s, s, dif], z = [s, dif, rx(2, 12, s, dif)];
      const sides = shuf([x, y, z][t]).join(" cm, ") + " cm", ans = ["equilateral", "isosceles", "scalene"][t];
      if (t === 1 && (dif >= 2 * s)) return triQ();
      return { text: `A triangle has sides of ${sides}. What kind of triangle is it?`, choices: ["equilateral", "isosceles", "scalene"], answer: ans,
        hints: ["Compare the side lengths. How many of them are the same?", "Three words: equilateral (all sides equal), isosceles (two sides equal) and scalene (no sides equal). Count the matching sides.",
          "Example: sides of 4, 4 and 7 have two matching sides. Two equal sides make an isosceles triangle. Now do yours."] };
    }
    const k = pick([["one angle is exactly 90°", "right"], ["all three angles are smaller than 90°", "acute"], ["one angle is bigger than 90°", "obtuse"], ["it has a square corner", "right"], ["it has one wide, open angle", "obtuse"]]);
    return { text: `A triangle where ${k[0]} is called a(n) ___ triangle.`, choices: ["right", "acute", "obtuse"], answer: k[1],
      hints: ["Triangles can be named by their biggest angle.", "Right means 90°, acute means smaller than 90°, and obtuse means bigger than 90°.", "Example: a triangle with angles 40°, 60° and 80° has no angle of 90° or more, so all its angles are acute. Now do yours."] };
  };
  const linePlot = () => {
    const vals = pick([["1/4", "1/2", "3/4", "1"], ["1/2", "1", "1 1/2", "2"]]), nums = [0.25, 0.5, 0.75, 1], numsB = [0.5, 1, 1.5, 2], nv = vals[0] === "1/4" ? nums : numsB;
    const c = [ri(1, 4), ri(1, 4), ri(1, 4), ri(1, 4)], t = ri(0, 2), unit = vals[0] === "1/4" ? "inch" : "cup";
    const vis = vals.map((v, i) => `${v}: ${"✖️".repeat(c[i])}`).join("<br>"), head = `The line plot shows the length of each ribbon in ${unit}s. Each ✖️ is one ribbon.`;
    if (t === 0) { const i = ri(0, 3); return { text: `${head} How many ribbons are ${vals[i]} ${unit} long?`, visual: vis, answer: c[i], hints: ["Find the number on the line, then count the ✖️ marks above it.", "Count slowly, one mark at a time.", "Example: 3 ✖️ above 1/2 means 3 ribbons are 1/2 long. Now do yours."] }; }
    if (t === 1) { const i = ri(1, 2); return { text: `${head} How many ribbons are longer than ${vals[i - 1]} ${unit}?`, visual: vis, answer: c.slice(i).reduce((a, b) => a + b, 0), hints: ["Longer than means bigger than, so skip that mark and all the smaller ones.", "Add up the ✖️ marks for all the lengths to the right of that number.", "Example: marks of 2, 1 and 3 above lengths bigger than 1/2: 2 + 1 + 3 = 6. Now do yours."] }; }
    return { text: `${head} How many ribbons are there in all?`, visual: vis, answer: c.reduce((a, b) => a + b, 0), hints: ["Every ✖️ stands for one ribbon.", "Count the marks above every length and add them together.", "Example: marks of 1, 2, 2 and 3 make 1 + 2 + 2 + 3 = 8 ribbons. Now do yours."] };
  };
  const CU = [["pounds", "ounces", 16, "lb", "oz"], ["gallons", "quarts", 4, "gal", "qt"], ["quarts", "pints", 2, "qt", "pt"], ["pints", "cups", 2, "pt", "c"], ["yards", "feet", 3, "yd", "ft"], ["feet", "inches", 12, "ft", "in"]];
  const customary = () => {
    if (Math.random() < 0.6) {
      const u = pick(CU), n = ri(2, 9);
      return { text: `${n} ${u[0]} = ? ${u[1]}`, answer: n * u[2],
        hints: [`${u[1]} are smaller than ${u[0]}, so the number will get bigger.`, `Multiply by how many ${u[1]} make one ${u[0].replace(/s$/, "")}. Remember: 1 ${u[3]} = ${u[2]} ${u[4]}.`, "Example: 3 gallons to quarts. 1 gallon = 4 quarts, so 3 × 4 = 12 quarts. Now do yours."] };
    }
    const k = pick([["gallons", "cups", 16, "1 gallon = 4 quarts, 1 quart = 2 pints, 1 pint = 2 cups"], ["quarts", "cups", 4, "1 quart = 2 pints, 1 pint = 2 cups"], ["yards", "inches", 36, "1 yard = 3 feet, 1 foot = 12 inches"]]), n = ri(2, 6);
    return { text: `${n} ${k[0]} = ? ${k[1]}`, answer: n * k[2],
      hints: ["This takes two steps. Change to the middle unit first, then to the smaller unit.", `Facts to use: ${k[3]}. Find out how many ${k[1]} are in just one ${k[0].replace(/s$/, "")} first.`, "Example: 2 quarts to cups. 2 × 2 = 4 pints, then 4 × 2 = 8 cups. Now do yours."] };
  };
  const roundDec = () => {
    const N = ri(1100, 9899), t = ri(0, 2), s = dec(N / 1000, 3);
    const whole = Math.floor((N + 500) / 1000), tenth = Math.floor((N + 50) / 100) / 10, hund = Math.floor((N + 5) / 10) / 100;
    const nm = ["whole number", "tenth", "hundredth"][t], ans = [String(whole), dec(tenth, 1), dec(hund, 2)][t];
    const o = [String(whole - 1), String(whole + 1), dec(tenth - 0.1, 1), dec(tenth + 0.1, 1), dec(hund - 0.01, 2), dec(hund + 0.01, 2), dec(Math.floor(N / 100) / 10, 1), dec(Math.floor(N / 10) / 100, 2), String(Math.floor(N / 1000))];
    const pool = o.filter(x => (t === 0 ? !x.includes(".") : x.split(".")[1] && x.split(".")[1].length === t)).filter(x => x !== ans);
    return { text: `Round ${s} to the nearest ${nm}.`, choices: cho(ans, ...pool), answer: ans,
      hints: [`Find the ${["ones", "tenths", "hundredths"][t]} place. Then look at the digit just to its right.`, "If that next digit is 5 or more, round up. If it is 4 or less, keep the digit the same. Then drop the digits after it.",
        "Example: round 3.482 to the nearest tenth. The tenths digit is 4 and the next digit is 8, so round up to 3.5. Now do yours."] };
  };
  const unitPrice = () => {
    if (Math.random() < 0.55) {
      const n = pick([2, 3, 4, 5, 6, 8, 10]), p = ri(2, 12), it = pick([["pens", "pen"], ["apples", "apple"], ["pencils", "pencil"], ["notebooks", "notebook"], ["muffins", "muffin"]]);
      return { text: `${n} ${it[0]} cost $${n * p}. How many dollars does one ${it[1]} cost?`, answer: p, wrong: g => (g === n * p ? "That is the price for all of them. How much for just one?" : null),
        hints: ["Unit price means the price of ONE item.", "Share the total cost equally among the items. Which operation shares equally?", "Example: 4 muffins cost $12. 12 ÷ 4 = $3 for one muffin. Now do yours."] };
    }
    let n1, n2, c1, c2, a, b, i = 0;
    do { n1 = pick([2, 3, 4, 5, 6, 8, 10]); n2 = pick([2, 3, 4, 5, 6, 8, 10]); c1 = ri(2, 24); c2 = ri(2, 24); a = c1 * n2; b = c2 * n1; } while ((a === b || n1 === n2) && ++i < 200);
    const ans = a < b ? "Deal A" : "Deal B", it = pick(["oranges", "juice boxes", "granola bars", "stickers"]);
    return { text: `Deal A: ${n1} ${it} for $${c1}. Deal B: ${n2} ${it} for $${c2}. Which deal is the better buy (lower price for each one)?`, choices: ["Deal A", "Deal B"], answer: ans,
      hints: ["To compare, find the price of ONE item in each deal.", "Divide each deal's price by its number of items. The smaller result is the better buy.", "Example: 4 for $6 is $1.50 each. 5 for $10 is $2 each. 4 for $6 is the better buy. Now do yours."] };
  };

  const l10 = [
    L("Multiply 3-digit by 2-digit", mult32, [S("Two rows", "213 × 12", "Break 12 into 10 and 2. Multiply 213 by each part."), S("Partial products", "2130 and 426", "213 × 10 = 2130 and 213 × 2 = 426."), S("Add", "2130 + 426 = 2556", "Add the two partial products. Estimate first: 200 × 10 = 2000, so we are close.")]),
    L("Remainders in stories", remStory, [S("Divide first", "25 ÷ 4 = 6 R 1", "Do the division to get a quotient and a remainder."), S("Read the question", "🚗", "Does the question ask about full groups, the leftovers, or how many groups you need in all?"), S("Leftovers", "6 R 1 → 7 cars", "If everyone needs a seat, the leftovers need one more car.")]),
    L("Division with zeros", divZero, [S("One place at a time", "618 ÷ 6", "6 goes into 6 once. Write 1."), S("Too small!", "1 ÷ 6 = 0", "6 does not go into 1, so write a 0 in the answer. Then bring down the 8."), S("Finish", "18 ÷ 6 = 3", "The answer is <b>103</b>. Never skip the zero!")]),
    L("Prime factorization", primeFact, [S("Prime building blocks", "2 3 5 7 11", "Every number can be built by multiplying primes."), S("Factor tree", "36 → 6 × 6 → 2×3×2×3", "Split a number into two factors. Keep splitting until all the branches are prime."), S("Write it", "36 = 2 × 2 × 3 × 3", "Collect the primes at the ends of the branches.")]),
    L("Greatest common factor", gcfQ, [S("Common factors", "12: 1 2 3 4 6 12", "A common factor divides both numbers."), S("List both", "18: 1 2 3 6 9 18", "Look for the numbers that are in both lists: 1, 2, 3 and 6."), S("Greatest", "GCF = 6", "The biggest number in both lists is the <b>greatest common factor</b>.")]),
    L("Fractions near 0, 1/2 and 1", bench, [S("Benchmarks", "0 &nbsp; 1/2 &nbsp; 1", "Three easy numbers help us judge a fraction: 0, 1/2 and 1."), S("Half of the bottom", "5/12 → half of 12 is 6", "Compare the top to half of the bottom. If it is about half, the fraction is close to 1/2."), S("Close to 1", "11/12", "When the top is almost the same as the bottom, the fraction is nearly 1 whole.")]),
    L("Add mixed numbers", addMixed, [S("Wholes and fractions", "2 3/4 + 1 3/4", "Add the wholes: 2 + 1 = 3."), S("Add the fractions", "3/4 + 3/4 = 6/4", "6/4 is more than 1 whole: it is 1 2/4."), S("Combine", "3 + 1 2/4 = 4 2/4", "Put the wholes and the fraction together: <b>4 2/4</b>.")]),
    L("Subtract mixed numbers", subMixed, [S("Subtract the fractions", "5 1/4 − 2 3/4", "1/4 is smaller than 3/4, so we cannot subtract yet."), S("Regroup", "5 1/4 = 4 5/4", "Take 1 whole from 5 and make it 4/4. Now 1/4 + 4/4 = 5/4."), S("Finish", "4 5/4 − 2 3/4 = 2 2/4", "Subtract the wholes and the fractions: <b>2 2/4</b>.")]),
    L("Fractions and decimals", fracDec, [S("Tenths and hundredths", "7/10 = 0.7", "A fraction with 10 or 100 on the bottom is easy to write as a decimal."), S("Make the bottom 100", "3/4 = 75/100", "Multiply the top and bottom by 25 to get 75/100 = 0.75."), S("Back again", "0.25 = 25/100 = 1/4", "Write the decimal as a fraction, then simplify.")]),
    L("Thousandths", thousandths, [S("Three places", "0.482", "Tenths (4), hundredths (8), thousandths (2)."), S("As a fraction", "0.482 = 482/1000", "Three digits after the point means thousandths."), S("Zeros matter", "0.047", "0.047 has no tenths. Write a 0 to hold the place.")]),
    L("Tenths plus hundredths", tenHund, [S("Different bottoms", "3/10 + 24/100", "You cannot add yet. The pieces are different sizes."), S("Same bottoms", "3/10 = 30/100", "Multiply the top and bottom of the tenths by 10."), S("Add", "30/100 + 24/100 = 54/100", "Add the tops: <b>54/100</b>, which is 0.54.")]),
    L("Find the missing angle", unkAngle, [S("Know the totals", "90° 180° 360°", "A right angle is 90°. A straight line is 180°. A full turn is 360°."), S("Subtract", "180 − 130 = 50", "Take the angle you know away from the total."), S("Check", "130 + 50 = 180 ✅", "Add them back to check.")]),
    L("Parallel and perpendicular", lineQ, [S("Parallel", "═══", "Parallel lines never meet and always stay the same distance apart."), S("Perpendicular", "┼", "Perpendicular lines cross at a right angle (90°), like the corner of a page."), S("Intersecting", "╳", "Intersecting lines cross each other at a point. Perpendicular lines are a special kind.")]),
    L("Types of triangles", triQ, [S("By sides", "equilateral, isosceles, scalene", "<b>Equilateral</b>: all sides equal. <b>Isosceles</b>: two sides equal. <b>Scalene</b>: no sides equal."), S("By angles", "right, acute, obtuse", "<b>Right</b>: one 90° angle. <b>Acute</b>: all angles less than 90°. <b>Obtuse</b>: one angle more than 90°."), S("Tip", "🔺", "A triangle can have only one right angle or one obtuse angle.")]),
    L("Line plots with fractions", linePlot, [S("Read the line", "1/4 1/2 3/4 1", "A line plot has numbers along the bottom. Each ✖️ is one piece of data."), S("Count the marks", "✖️✖️✖️", "Count the ✖️ marks above a number to see how many have that length."), S("Compare", "longer than 1/2", "For \"longer than\", look only at the numbers to the right.")]),
    L("Customary units", customary, [S("Facts to know", "16 oz = 1 lb", "1 pound = 16 ounces. 1 gallon = 4 quarts. 1 quart = 2 pints. 1 pint = 2 cups."), S("Big to small", "3 gal × 4", "Changing to a smaller unit? Multiply."), S("Two steps", "2 qt → 4 pt → 8 c", "Sometimes change one unit at a time.")]),
    L("Round decimals", roundDec, [S("Find the place", "3.482", "Say which place you are rounding to: ones, tenths or hundredths."), S("Look next door", "8 → up", "Look at the digit right after it. 5 or more rounds up."), S("Drop the rest", "3.5", "After rounding, drop the digits to the right.")]),
    L("Unit price and better buys", unitPrice, [S("One item", "$12 for 4", "Unit price is the price of 1 item."), S("Divide", "12 ÷ 4 = $3", "Divide the total cost by the number of items."), S("Compare", "$1.50 vs $2", "The lower price for each one is the better buy.")])
  ];
  l10.push(mixOf("Mixed practice", [l10[0], l10[2], l10[4], l10[6], l10[8], l10[11], l10[16]]));
  l10.push(mixOf("Level 10 Challenge", [l10[1], l10[3], l10[5], l10[7], l10[9], l10[10], l10[12], l10[13], l10[14], l10[15], l10[17]]));

  // ================= LEVEL 11 =================
  const pow10 = () => {
    const n = ri(2, 6), t = ri(0, 3);
    if (t === 0) return { text: `${sup("10", n)} = ?`, answer: Math.pow(10, n),
      hints: ["The little raised number (the exponent) tells how many tens to multiply together.", "A power of 10 is a 1 followed by zeros. The exponent tells you how many zeros.", "Example: 10<sup>3</sup> = 10 × 10 × 10 = 1,000. Now do yours."] };
    if (t === 1) { const k = ri(2, 9), m = ri(2, 5); return { text: `${k} × ${sup("10", m)} = ?`, answer: k * Math.pow(10, m),
      hints: ["First work out the power of 10. Then multiply by the number in front.", `The exponent ${m} tells you how many zeros the power of 10 has. Put that many zeros after ${k}.`, "Example: 4 × 10<sup>3</sup> = 4 × 1,000 = 4,000. Now do yours."] }; }
    if (t === 2) { const ans = sup("10", n); return { text: `Which power of 10 equals ${(Math.pow(10, n)).toLocaleString("en-US")}?`, choices: cho(ans, sup("10", n - 1), sup("10", n + 1), sup("10", n * 2), `${n} × 10`), answer: ans,
      hints: ["Count the zeros in the number.", "The exponent is the same as the number of zeros after the 1.", "Example: 10,000 has 4 zeros, so it is 10<sup>4</sup>. Now do yours."] }; }
    const k = ri(2, 8), m = ri(2, 4), v = k * Math.pow(10, m), ans = `${k} × ${sup("10", m)}`;
    return { text: `Which expression equals ${v.toLocaleString("en-US")}?`, choices: cho(ans, `${k} × ${sup("10", m + 1)}`, `${k} × ${sup("10", m - 1)}`, `${k * 10} × ${sup("10", m + 1)}`, `${m} × ${sup("10", k)}`), answer: ans,
      hints: ["Write the number as a digit times a power of 10.", "Count the zeros after the first digit. That is the exponent.", "Example: 6,000 = 6 × 10<sup>3</sup>, because 3 zeros follow the 6. Now check your choices."] };
  };
  const decPow = () => {
    const d = ri(1, 2), N = ri(11, 999), x = N / Math.pow(10, d), p = ri(1, 3), mul = Math.random() < 0.5, base = Math.pow(10, p);
    const res = mul ? x * base : x / base;
    if (!mul && N < 100 && p > 1) return decPow();
    const ans = fm(res), sh = q => fm(mul ? x * Math.pow(10, q) : x / Math.pow(10, q));
    return { text: `${fm(x)} ${mul ? "×" : "÷"} ${base.toLocaleString("en-US")} = ?`, choices: cho(ans, sh(p + 1), sh(p - 1), fm(mul ? x / base : x * base)), answer: ans,
      hints: [`The decimal point moves ${mul ? "right when you multiply" : "left when you divide"} by 10, 100 or 1,000.`, `Count the zeros in ${base.toLocaleString("en-US")}. Move the decimal point that many places. Add zeros if you run out of digits.`,
        mul ? "Example: 2.35 × 100. Two zeros, so move the point 2 places right: 235. Now do yours." : "Example: 47.2 ÷ 10. One zero, so move the point 1 place left: 4.72. Now do yours."] };
  };
  const div2d = () => {
    const d = ri(11, 29), q = ri(12, 89), r = Math.random() < 0.3 ? ri(1, d - 1) : 0, n = d * q + r;
    const ex = pick([[12, 15], [13, 12], [21, 14]].filter(e => !(e[0] === d && e[1] === q))), exn = ex[0] * ex[1];
    return { text: r ? `${n} ÷ ${d}: what is the remainder?` : `${n} ÷ ${d} = ?`, answer: r || q, wrong: wrongAdj(r || q),
      hints: [`Estimate with friendly numbers first. Round ${d} to the nearest ten. How many times would that fit into the first digits of ${n}?`, "Do long division. Divide, multiply, subtract and bring down. If your guess is too big or too small, adjust it.",
        `Example: ${exn} ÷ ${ex[0]} = ${ex[1]}, because ${ex[1]} × ${ex[0]} = ${exn}. Use the same plan, then multiply back to check yours.`] };
  };
  const orderOps = () => {
    const t = ri(0, 3), a = ri(2, 12), b = ri(2, 9), c = ri(2, 9), k = ri(2, 6), d = ri(2, 4);
    const hs = ["Brackets first, then multiplication and division from left to right, then addition and subtraction.", "Remember: multiply and divide BEFORE you add and subtract, unless brackets tell you otherwise.", "Example: 3 + 4 × 2. Multiply first: 4 × 2 = 8. Then 3 + 8 = 11. Now do yours."];
    if (t === 0) return { text: `${a} + ${b} × ${c} = ?`, answer: a + b * c, wrong: g => (g === (a + b) * c ? "You added first. Multiplication comes before addition." : null), hints: hs };
    if (t === 1) return { text: `(${a} + ${b}) × ${c} = ?`, answer: (a + b) * c, wrong: g => (g === a + b * c ? "Do the brackets first!" : null), hints: hs };
    if (t === 2) { const x = c * k, A = a + 4; return { text: `${A} × ${b} − ${x} ÷ ${c} = ?`, answer: A * b - k, hints: hs }; }
    const m = ri(a + 1, a + 6); return { text: `${d} × (${m} − ${a}) + ${b} = ?`, answer: d * (m - a) + b, hints: hs };
  };
  const writeExpr = () => {
    const A = ri(2, 9), B = ri(2, 9), C = ri(2, 9), t = ri(0, 4);
    const T = [
      [`Add ${A} and ${B}, then multiply by ${C}.`, `(${A} + ${B}) × ${C}`, [`${A} + ${B} × ${C}`, `(${A} × ${B}) + ${C}`, `${A} + (${B} × ${C})`, `${A} × ${B} × ${C}`]],
      [`Multiply ${A} by ${B}, then subtract ${C}.`, `${A} × ${B} − ${C}`, [`${A} × (${B} − ${C})`, `${A} − ${B} × ${C}`, `${A} × ${B} + ${C}`, `${C} − ${A} × ${B}`]],
      [`Twice the sum of ${A} and ${B}.`, `2 × (${A} + ${B})`, [`2 × ${A} + ${B}`, `2 + ${A} + ${B}`, `2 × ${A} × ${B}`, `(2 + ${A}) × ${B}`]],
      [`Subtract ${B} from ${A + B}, then divide by ${C}.`, `(${A + B} − ${B}) ÷ ${C}`, [`${A + B} − ${B} ÷ ${C}`, `${A + B} − (${B} ÷ ${C})`, `(${B} − ${A + B}) ÷ ${C}`, `${C} ÷ (${A + B} − ${B})`]],
      [`${A} more than the product of ${B} and ${C}.`, `${B} × ${C} + ${A}`, [`(${B} + ${C}) × ${A}`, `${A} × ${B} + ${C}`, `${B} + ${C} + ${A}`, `${A} × ${B} × ${C}`]]];
    const it = T[t];
    return { text: `Which expression matches the words?<br><i>${it[0]}</i>`, choices: cho(it[1], ...it[2]), answer: it[1],
      hints: ["Read the words in order and write the math for each step as you go.", "Words like \"then\" and \"the sum of\" tell you which step must happen first. That step goes inside brackets.",
        "Example: \"Subtract 2 from 9, then multiply by 4\" is (9 − 2) × 4. The brackets show the subtraction happens first. Now do yours."] };
  };
  const addDec3 = () => {
    const A = ri(1100, 9900), B = ri(11, 600) * 10, plus = Math.random() < 0.55;
    const big = Math.max(A, B + 1100) , a = plus ? A : big, v = plus ? A + B : a - B, r = v / 1000, ans = dec(r, 3);
    return { text: plus ? `${dec(A / 1000, 3)} + ${dec(B / 1000, 2)} = ?` : `${dec(a / 1000, 3)} − ${dec(B / 1000, 2)} = ?`, choices: cho(ans, dec(r + 0.01, 3), dec(r - 0.01, 3), dec(r + 0.1, 3), dec(r - 0.1, 3)), answer: ans,
      hints: ["Line up the decimal points. Add a zero as a place holder so both numbers have 3 decimal places.", `${plus ? "Add" : "Subtract"} from the right, just like whole numbers. Bring the decimal point straight down.`, "Example: 2.350 + 1.275: thousandths 0 + 5, hundredths 5 + 7 = 12 (carry 1), tenths 3 + 2 + 1, ones 2 + 1. The sum is 3.625. Now do yours."] };
  };
  const multDecWhole = () => {
    const d = ri(1, 2), N = ri(12, 99) + (d === 1 ? ri(0, 1) * 100 : 0), k = ri(2, 9), R = N * k, ans = fm(R / Math.pow(10, d));
    return { text: `${fm(N / Math.pow(10, d))} × ${k} = ?`, choices: cho(ans, fm(R / Math.pow(10, d + 1)), fm(R / Math.pow(10, d - 1)), fm(R / Math.pow(10, d) + 0.1), fm(R / Math.pow(10, d) - 0.1)), answer: ans,
      hints: ["Ignore the decimal point and multiply like whole numbers.", `Then count the digits after the decimal point in the original decimal. Put the point so your answer has that many decimal places. Estimate first to check!`, "Example: 1.4 × 3. 14 × 3 = 42. One decimal place, so 4.2. Check: 1 × 3 = 3, a bit more is 4.2. Now do yours."] };
  };
  const multDecDec = () => {
    const t = ri(0, 2), A = ri(2, 9), B = ri(2, 9), X = ri(11, 49);
    if (t === 0) { const R = A * B, ans = fm(R / 100); return { text: `0.${A} × 0.${B} = ?`, choices: cho(ans, fm(R / 10), fm(R / 1000), fm(R / 10000)), answer: ans,
      hints: ["Multiply the digits as whole numbers, ignoring the points.", "Each factor has 1 decimal place, so the answer needs 2 decimal places in all. Add zeros in front if you need to.", "Example: 0.3 × 0.4. 3 × 4 = 12, with 2 decimal places: 0.12. Now do yours."] }; }
    if (t === 1) { const R = X * B, ans = fm(R / 100); return { text: `${fm(X / 10)} × 0.${B} = ?`, choices: cho(ans, fm(R / 10), fm(R / 1000), fm(R)), answer: ans,
      hints: ["Multiply as whole numbers first.", "Count the decimal places in both factors and add them. That is how many decimal places the product has.", "Example: 2.5 × 0.6. 25 × 6 = 150. Two places in all: 1.50, which is 1.5. Now do yours."] }; }
    const R = A * B, ans = fm(R / 1000);
    return { text: `0.${A} × 0.0${B} = ?`, choices: cho(ans, fm(R / 100), fm(R / 10000), fm(R / 10)), answer: ans,
      hints: ["Multiply the digits as whole numbers, ignoring the points and the zero.", "Count the decimal places: one in the first factor and two in the second. The answer has three decimal places.", "Example: 0.2 × 0.03. 2 × 3 = 6, with 3 places: 0.006. Now do yours."] };
  };
  const divDec = () => {
    const d = ri(1, 2), Q = ri(12, 99), k = ri(2, 9), D = Q * k, q = Q / Math.pow(10, d), ans = fm(q);
    return { text: `${fm(D / Math.pow(10, d))} ÷ ${k} = ?`, choices: cho(ans, fm(q * 10), fm(q / 10), fm(q + 0.1), fm(q - 0.1)), answer: ans,
      hints: ["Divide like a whole number. Put the decimal point in the answer right above the point in the number you are dividing.", `Estimate first: is your answer a little more or a little less than a friendly number? Divide place by place, and check by multiplying by ${k}.`,
        "Example: 8.4 ÷ 4. 4 into 8 is 2, put the point, then 4 into 4 is 1. The answer is 2.1. Check: 2.1 × 4 = 8.4. Now do yours."] };
  };
  const lcd = () => {
    let a, b, i = 0; do { a = ri(2, 12); b = ri(2, 12); } while ((a === b || lcm(a, b) > 36 || a % b === 0 || b % a === 0) && ++i < 300);
    const ex = pick([[4, 6, "12"], [3, 5, "15"], [6, 8, "24"]].filter(e => e[0] !== a && e[0] !== b));
    return { text: `What is the least common denominator of ${ri(1, 1)}/${a} and ${ri(1, 1)}/${b}? (the smallest number both ${a} and ${b} go into)`, answer: lcm(a, b),
      hints: ["The least common denominator is the least common multiple of the two bottom numbers.", "List the multiples of each bottom number and find the first one they share.", `Example: ${ex[0]} and ${ex[1]}. Multiples of ${ex[0]}: ${[1, 2, 3, 4, 5, 6].map(x => x * ex[0]).join(", ")}. Multiples of ${ex[1]}: ${[1, 2, 3, 4, 5].map(x => x * ex[1]).join(", ")}. The first match is ${ex[2]}. Now do yours.`] };
  };
  const unlikeFr = plus => () => {
    let b, d, a, c, num, den, i = 0;
    do {
      b = pick([2, 3, 4, 5, 6, 8, 10, 12]); d = pick([2, 3, 4, 5, 6, 8, 10, 12]); a = ri(1, b - 1); c = ri(1, d - 1); den = lcm(b, d);
      num = plus ? a * den / b + c * den / d : a * den / b - c * den / d;
    } while ((b === d || den > 24 || num <= 0 || (!plus && num <= 0)) && ++i < 400);
    if (b === d || num <= 0) return unlikeFr(plus)();
    const ans = fracStr(num, den), mediant = plus ? fracStr(a + c, b + d) : fracStr(Math.abs(a - c) || 1, Math.abs(b - d) || 1);
    return { text: `${a}/${b} ${plus ? "+" : "−"} ${c}/${d} = ?  (simplest form)`, choices: cho(ans, mediant, fracStr(num + 1, den), fracStr(num + 2, den), fracStr(Math.max(1, num - 1), den)), answer: ans,
      hints: ["The bottoms are different, so the pieces are different sizes. Make them the same first.", `Find a common denominator (a number both ${b} and ${d} go into). Rewrite both fractions, ${plus ? "add" : "subtract"} the tops, and keep the bottom. Simplify at the end.`,
        plus ? "Example: 1/4 + 1/6. Common denominator 12: 3/12 + 2/12 = 5/12. Now do yours." : "Example: 3/4 − 1/6. Common denominator 12: 9/12 − 2/12 = 7/12. Now do yours."] };
  };
  const mixedUnlike = () => {
    const plus = Math.random() < 0.55, p = pick([[2, 4], [2, 6], [3, 6], [2, 8], [4, 8], [5, 10], [3, 9], [4, 12], [2, 10]]), sw = Math.random() < 0.5;
    const b = sw ? p[0] : p[1], d = sw ? p[1] : p[0], w1 = ri(2, 6), w2 = ri(1, w1), a = ri(1, b - 1), c = ri(1, d - 1), den = lcm(b, d);
    let n1 = (w1 * b + a) * den / b, n2 = (w2 * d + c) * den / d;
    if (!plus && n1 <= n2) return mixedUnlike();
    const num = plus ? n1 + n2 : n1 - n2, ans = fracStr(num, den);
    const wrongA = fracStr(plus ? num + den / b : num + den / d, den), wrongB = fracStr(num + 1, den), wrongC = fracStr(Math.max(1, num - 1), den), wrongD = fracStr(Math.max(1, plus ? num - den : num + den), den);
    return { text: `${w1} ${a}/${b} ${plus ? "+" : "−"} ${w2} ${c}/${d} = ?  (simplest form)`, choices: cho(ans, wrongA, wrongB, wrongC, wrongD), answer: ans,
      hints: ["Make the fraction parts have the same bottom number first.", `Rewrite both fractions with a common denominator. Then ${plus ? "add" : "subtract"} the wholes and the fractions. ${plus ? "Trade for a whole if the fraction part is more than 1." : "Regroup if the top fraction is smaller."}`,
        plus ? "Example: 1 1/2 + 2 3/4. 1/2 = 2/4. Wholes: 3. Fractions: 2/4 + 3/4 = 5/4 = 1 1/4. Total 4 1/4. Now do yours." : "Example: 3 1/2 − 1 3/4. 1/2 = 2/4. 3 2/4 = 2 6/4. 2 6/4 − 1 3/4 = 1 3/4. Now do yours."] };
  };
  const multFr = () => {
    let a, b, c, d, i = 0; do { b = ri(2, 9); d = ri(2, 9); a = ri(1, b - 1); c = ri(1, d - 1); } while (a * c === 1 && i++ < 5);
    const ans = fracStr(a * c, b * d);
    return { text: `${a}/${b} × ${c}/${d} = ?  (simplest form)`, choices: cho(ans, `${a * c}/${b * d}`, fracStr(a * d, b * c), fracStr(a + c, b + d), fracStr(a * c, b + d)), answer: ans,
      hints: ["To multiply fractions, multiply the tops together and multiply the bottoms together.", "After you multiply, check whether the top and bottom share a factor. If they do, divide both by it.",
        "Example: 2/3 × 3/4 = 6/12. Both divide by 6, so it is 1/2. Now do yours."] };
  };
  const scaleQ = () => {
    if (Math.random() < 0.5) {
      const N = ri(3, 20), t = ri(0, 2), f = [pick(["2/3", "3/4", "1/2", "4/5", "5/8"]), `${pick([3, 5, 7, 9])}/${pick([3, 5, 7, 9])}`, pick(["5/4", "7/4", "3/2", "9/5", "11/8"])][t], parts = f.split("/").map(Number);
      const rel = parts[0] < parts[1] ? "less than" : parts[0] === parts[1] ? "equal to" : "greater than";
      return { text: `Without multiplying, how does ${N} × ${f} compare with ${N}?`, choices: ["less than " + N, "equal to " + N, "greater than " + N], answer: `${rel} ${N}`,
        hints: ["Look at the fraction you are multiplying by. Is it less than 1, equal to 1, or more than 1?", "Multiplying by a fraction less than 1 makes a number smaller. By exactly 1 it stays the same. By more than 1 it grows.", "Example: 10 × 3/2. 3/2 is more than 1, so the answer is greater than 10. Now do yours."] };
    }
    const N = ri(4, 20), ans = `${N} × 3/4`, w = [`${N} × 5/4`, `${N} × 7/6`, `${N} × 9/8`, `${N} × 6/6`, `${N} × 11/10`].filter(x => x !== ans);
    return { text: `Which product is LESS than ${N}?`, choices: cho(ans, ...shuf(w).slice(0, 3)), answer: ans,
      hints: ["Compare each fraction with 1. Which fraction has a top smaller than its bottom?", "Only a fraction less than 1 makes the product smaller than the number you started with.", "Example: which is less than 8: 8 × 5/4 or 8 × 2/3? Only 2/3 is less than 1, so 8 × 2/3. Now do yours."] };
  };
  const divUnit = () => {
    const b = ri(2, 8), k = ri(2, 9), it = pick(["🍕", "🍰", "🥧", "🍫"]);
    if (Math.random() < 0.5) return { text: `How many pieces of size 1/${b} are in ${k} whole ${k === 1 ? "one" : "ones"}? (${k} ÷ 1/${b})`, visual: it.repeat(Math.min(k, 6)), answer: k * b,
      hints: [`Each whole can be cut into ${b} equal pieces of 1/${b}.`, `Multiply the number of wholes by the pieces in each whole.`, "Example: 3 ÷ 1/4. Each whole has 4 quarters, so 3 × 4 = 12 quarters. Now do yours."] };
    const ans = `1/${b * k}`;
    return { text: `${k === 2 ? "Two" : k} friends share 1/${b} of a ${pick(["pizza", "cake", "pie"])} equally. What fraction of the whole does each friend get?`, visual: it, choices: cho(ans, `${k}/${b}`, `1/${b + k}`, `${k}/${b * k}`, `${b}/${k}`), answer: ans,
      hints: ["Sharing a piece into equal parts makes the pieces smaller, not bigger.", `Cut 1/${b} into ${k} equal parts. Each part is a fraction of the original piece, so multiply the bottom number.`, "Example: 1/3 shared by 2 friends: each gets 1/6, because 3 × 2 = 6. Now do yours."] };
  };
  const fracDiv = () => {
    let a, b, i = 0; do { b = ri(2, 8); a = ri(1, 14); } while ((a === b || a % b === 0 || a === 1) && ++i < 100);
    const it = pick([["pizzas", "friends"], ["pies", "people"], ["ropes", "pieces"], ["lemon bars", "kids"]]), ans = fracStr(a, b);
    return { text: `${a} ${it[0]} are shared equally by ${b} ${it[1]}. How much does each one get? (simplest form)`, choices: cho(ans, fracStr(b, a), `${a * b}`, fracStr(a, a + b), a > b ? fracStr(a - b, b) : fracStr(a + 1, b)), answer: ans,
      hints: ["A fraction bar means divide. The top number is divided by the bottom number.", "Write the sharing as a fraction: how much there is on top, how many are sharing on the bottom. Simplify if you can, and write a mixed number if it is bigger than 1.",
        "Example: 3 ÷ 4 is 3/4, and 5 ÷ 4 is 5/4 = 1 1/4. Now do yours."] };
  };
  const cmpDec3 = () => {
    const mk = () => { const N = ri(1, 999); return N; }, disp = N => { let m = 3; if (N % 10 === 0) m = 2; if (N % 100 === 0) m = 1; return (N / 1000).toFixed(ri(m, 3)); };
    if (Math.random() < 0.5) {
      let a, b, i = 0; do { a = pick([mk(), mk(), Math.floor(mk() / 100) * 100 + ri(0, 9)]); b = Math.random() < 0.5 ? a + ri(-90, 90) : mk(); } while ((b < 1 || b > 999 || (a === b && i > 30)) && ++i < 200);
      const ans = a > b ? "greater than" : a < b ? "less than" : "equal to";
      return { text: `Complete it: ${disp(a)} ___ ${disp(b)}`, choices: ["greater than", "less than", "equal to"], answer: ans,
        hints: ["Line up the decimal points. You can add zeros at the end of a decimal without changing its value.", "Compare digit by digit from the left: tenths first, then hundredths, then thousandths. The first difference decides.", "Example: 0.4 and 0.38. Write 0.4 as 0.40. Tenths: 4 is more than 3, so 0.4 &gt; 0.38. Now do yours."] };
    }
    const set = new Set(); while (set.size < 3) set.add(mk()); const v = [...set], big = Math.random() < 0.5, tgt = big ? Math.max(...v) : Math.min(...v), ds = v.map(x => disp(x));
    return { text: `Which decimal is the ${big ? "greatest" : "least"}?`, choices: ds, answer: ds[v.indexOf(tgt)], wrong: null,
      hints: ["Longer decimals are not always bigger. Compare place by place from the left.", "Add zeros so every decimal has 3 places, like 0.4 = 0.400. Then compare them like whole numbers.", "Example: 0.5, 0.45, 0.405. As thousandths: 500, 450, 405. So 0.405 is the least. Now do yours."] };
  };
  const coordQ = () => {
    const t = ri(0, 2), x = ri(1, 7), y = ri(1, 7);
    if (t === 0) { const r = ri(1, 5), u = ri(1, 5), ans = `(${x + r}, ${y + u})`; return { text: `Start at (${x}, ${y}). Go ${r} right and ${u} up. Where do you end up?`, visual: "📍", choices: cho(ans, `(${x + u}, ${y + r})`, `(${x + r}, ${y})`, `(${x}, ${y + u})`, `(${x - 1}, ${y + 1})`), answer: ans,
      hints: ["An ordered pair is (across, up). The first number goes along the x-axis, the second goes up the y-axis.", "Moving right changes the first number. Moving up changes the second number.", "Example: start at (2, 3), go 4 right and 1 up: (2 + 4, 3 + 1) = (6, 4). Now do yours."] }; }
    if (t === 1) { const ans = `(${x}, 0)`; return { text: "Which point is on the x-axis (the line that goes across)?", choices: cho(ans, `(0, ${x})`, `(${x}, ${y})`, `(${y}, ${x})`), answer: ans,
      hints: ["The x-axis is the horizontal line at the bottom. How high up are the points on it?", "Points on the x-axis are not up at all, so the second number (the up number) must be 0.", "Example: (5, 0) is on the x-axis, and (0, 5) is on the y-axis. Now pick yours."] }; }
    const a = pick(["first", "second"]), ans = a === "first" ? "how far across (right)" : "how far up";
    return { text: `In the ordered pair (${x}, ${y}), what does the ${a} number tell you?`, choices: ["how far across (right)", "how far up", "how far down", "how far left"], answer: ans,
      hints: ["An ordered pair gives directions from the starting point (0, 0), called the origin.", "Always go across first, then up. The first number is for x and the second is for y.", "Example: (3, 6) means 3 across and 6 up. Now do yours."] };
  };

  const l11 = [
    L("Powers of 10", pow10, [S("Exponents", "10<sup>3</sup>", "10<sup>3</sup> means 10 × 10 × 10 = 1,000. The little number is the <b>exponent</b>."), S("Count the zeros", "10<sup>5</sup> = 100,000", "The exponent tells how many zeros come after the 1."), S("With a digit", "4 × 10<sup>3</sup>", "4 × 1,000 = 4,000. Put 3 zeros after the 4.")]),
    L("Decimals times and divided by 10, 100, 1000", decPow, [S("Move the point", "2.35 × 100", "To multiply by 10, 100 or 1,000, move the decimal point right 1, 2 or 3 places."), S("Divide", "47.2 ÷ 10", "To divide, move the point left. 47.2 ÷ 10 = 4.72."), S("Fill with zeros", "0.5 × 100 = 50", "If you run out of digits, add zeros.")]),
    L("Divide by 2-digit numbers", div2d, [S("Estimate", "156 ÷ 12", "Round 12 to 10. Estimate how many fit."), S("Long division", "÷ 12", "Divide, multiply, subtract, bring down. Adjust a guess that is too big or small."), S("Check", "13 × 12 = 156", "Multiply the answer by the divisor and add the remainder to check.")]),
    L("Order of operations", orderOps, [S("The order", "( ) then × ÷ then + −", "Do brackets first. Then multiply and divide from left to right. Then add and subtract from left to right."), S("Example", "3 + 4 × 2", "Multiply first: 4 × 2 = 8. Then add: 3 + 8 = 11."), S("Brackets change it", "(3 + 4) × 2", "Brackets first: 7 × 2 = 14.")]),
    L("Writing expressions", writeExpr, [S("Words to math", "sum, product, more than", "<b>Sum</b> means add. <b>Product</b> means multiply. <b>More than</b> means add."), S("Then means order", "(9 − 2) × 4", "\"Subtract 2 from 9, then multiply by 4.\" The first step goes in brackets."), S("Check", "🧐", "Read your expression back in words. Does it say the same thing?")]),
    L("Add and subtract decimals to thousandths", addDec3, [S("Line up", "2.350<br>+1.275", "Line up the decimal points. Add zeros so every number has the same decimal places."), S("Work from the right", "0 + 5, 5 + 7 …", "Add or subtract thousandths first, then hundredths, then tenths."), S("Point down", "3.625", "Bring the decimal point straight down.")]),
    L("Multiply decimals by whole numbers", multDecWhole, [S("Ignore the point", "1.4 × 3", "Multiply 14 × 3 = 42."), S("Count places", "1 decimal place", "1.4 has 1 decimal place, so the answer has 1 decimal place: 4.2."), S("Estimate", "≈ 1 × 3", "1.4 is a little more than 1, so the answer should be a little more than 3. 4.2 makes sense.")]),
    L("Multiply decimals by decimals", multDecDec, [S("Whole-number first", "0.3 × 0.4", "Multiply 3 × 4 = 12."), S("Count all places", "1 + 1 = 2", "There is one place in each factor, so the answer has 2 decimal places."), S("Place the point", "0.12", "12 with two decimal places is <b>0.12</b>.")]),
    L("Divide decimals by whole numbers", divDec, [S("Point up", "8.4 ÷ 4", "Put the decimal point in the answer straight above the point in the number."), S("Divide as usual", "8 ÷ 4 = 2, 4 ÷ 4 = 1", "Divide place by place."), S("Check", "2.1 × 4 = 8.4 ✅", "Multiply back to check.")]),
    L("Add fractions with unlike bottoms", unlikeFr(true), [S("Make them match", "1/4 + 1/6", "Find a common denominator: 12."), S("Rename", "3/12 + 2/12", "1/4 = 3/12 and 1/6 = 2/12."), S("Add the tops", "5/12", "Add the tops and keep the bottom. Simplify if you can.")]),
    L("Subtract fractions with unlike bottoms", unlikeFr(false), [S("Make them match", "3/4 − 1/6", "Find a common denominator: 12."), S("Rename", "9/12 − 2/12", "3/4 = 9/12 and 1/6 = 2/12."), S("Subtract the tops", "7/12", "Subtract the tops and keep the bottom.")]),
    L("Add and subtract mixed numbers (unlike)", mixedUnlike, [S("Match the fractions", "1 1/2 + 2 3/4", "Change 1/2 to 2/4."), S("Add wholes, then fractions", "3 + 5/4", "3 wholes and 2/4 + 3/4 = 5/4, which is 1 1/4."), S("Combine", "4 1/4", "3 + 1 1/4 = <b>4 1/4</b>.")]),
    L("Multiply fractions", multFr, [S("Tops times tops", "2/3 × 3/4", "Multiply the tops: 2 × 3 = 6."), S("Bottoms times bottoms", "3 × 4 = 12", "Multiply the bottoms. You get 6/12."), S("Simplify", "6/12 = 1/2", "Divide the top and bottom by 6.")]),
    L("Multiplying makes bigger or smaller", scaleQ, [S("Fraction less than 1", "10 × 1/2 = 5", "Multiplying by a fraction less than 1 makes the answer smaller."), S("Fraction more than 1", "10 × 3/2 = 15", "Multiplying by a fraction greater than 1 makes the answer bigger."), S("Exactly 1", "10 × 5/5 = 10", "A fraction equal to 1 does not change the number.")]),
    L("Divide with unit fractions", divUnit, [S("Whole into pieces", "3 ÷ 1/4", "How many quarters fit in 3 wholes? Each whole holds 4 quarters."), S("Multiply", "3 × 4 = 12", "So 3 ÷ 1/4 = 12."), S("Sharing a piece", "1/3 ÷ 2 = 1/6", "Cutting a piece into smaller parts makes the bottom number bigger.")]),
    L("Fractions are division", fracDiv, [S("Fraction bar", "3 ÷ 4 = 3/4", "A fraction is a division problem. The top is divided by the bottom."), S("Sharing", "🍕 3 pizzas, 4 people", "If 3 pizzas are shared by 4 people, each gets 3/4 of a pizza."), S("More than one", "5 ÷ 4 = 1 1/4", "If the top is bigger, you get a mixed number.")]),
    L("Compare decimals to thousandths", cmpDec3, [S("Line up", "0.4 vs 0.38", "Line up the decimal points."), S("Add zeros", "0.40 vs 0.38", "Zeros at the end do not change the value."), S("Compare from the left", "4 &gt; 3", "Tenths first. The first difference decides which is bigger.")]),
    L("The coordinate plane", coordQ, [S("Two axes", "x across, y up", "The <b>x-axis</b> goes across and the <b>y-axis</b> goes up. They meet at (0, 0)."), S("Ordered pairs", "(3, 6)", "(3, 6) means go 3 across and 6 up."), S("Moving", "→ ↑", "Right changes x. Up changes y.")])
  ];
  l11.push(mixOf("Mixed practice", [l11[0], l11[2], l11[3], l11[6], l11[9], l11[12], l11[17]]));
  l11.push(mixOf("Level 11 Challenge", [l11[1], l11[4], l11[5], l11[7], l11[8], l11[10], l11[11], l11[13], l11[14], l11[15], l11[16]]));

  // ================= LEVEL 12 =================
  const volForm = () => {
    const l = ri(2, 12), w = ri(2, 9), h = ri(2, 9);
    if (Math.random() < 0.6) return { text: `A box is ${l} cm long, ${w} cm wide and ${h} cm tall. What is its volume in cubic centimeters?`, visual: "📦", answer: l * w * h, wrong: g => (g === l * w ? "That is only the area of the bottom. Multiply by the height too." : null),
      hints: ["Volume is how much space is inside. For a box, use length × width × height.", "Multiply the three measurements. Do two of them first, then multiply by the third.", "Example: a box 5 by 3 by 2. 5 × 3 = 15, and 15 × 2 = 30 cubic units. Now do yours."] };
    return { text: `A box has a volume of ${l * w * h} cubic cm. It is ${l} cm long and ${w} cm wide. How tall is it in cm?`, visual: "📦", answer: h,
      hints: ["Volume = length × width × height. Here you know the volume and two of the sides.", `First find the area of the bottom (${l} × ${w}). Then ask: what do you multiply that by to get the volume?`, "Example: volume 60, length 5, width 3. 5 × 3 = 15 and 60 ÷ 15 = 4, so the height is 4. Now do yours."] };
  };
  const unitCubes = () => {
    const l = ri(2, 5), w = ri(2, 4), h = ri(2, 4), t = ri(0, 2), layer = Array(w).fill("🟦".repeat(l)).join("<br>");
    const text = t === 0 ? `A box is filled with unit cubes. One layer looks like the picture (${l} cubes long, ${w} cubes wide). There are ${h} layers. How many cubes are in the box?` : t === 1 ? `One layer of a box has ${l} cubes in each row and ${w} rows. How many cubes are in ONE layer?` : `A box has layers of ${l * w} cubes. It has ${h} layers. How many cubes are in the box?`;
    const ans = t === 0 ? l * w * h : t === 1 ? l * w : l * w * h;
    return { text, visual: layer, answer: ans,
      hints: [t === 1 ? "Count the cubes in one row, then count how many rows there are." : "Find the number of cubes in one layer first.", t === 1 ? "Multiply the cubes in a row by the number of rows." : "Then count how many layers there are and multiply.", "Example: a layer of 4 by 3 cubes has 12 cubes. With 2 layers there are 24 cubes. Now do yours."] };
  };
  const compVol = () => {
    const a = [ri(2, 8), ri(2, 6), ri(2, 5)], b = [ri(2, 5), ri(2, 6), ri(2, 5)], ans = a[0] * a[1] * a[2] + b[0] * b[1] * b[2];
    return { text: `A building is made from two boxes stuck together. Box 1 is ${a[0]} m by ${a[1]} m by ${a[2]} m. Box 2 is ${b[0]} m by ${b[1]} m by ${b[2]} m. What is the total volume in cubic meters?`, visual: "🏢", answer: ans,
      hints: ["Find the volume of each box separately.", "The boxes do not overlap, so add the two volumes together.", "Example: boxes 2×3×4 and 1×2×5. 24 + 10 = 34 cubic meters. Now do yours."] };
  };
  const SH = [["Every square is a rectangle.", true], ["Every rectangle is a square.", false], ["Every square is a rhombus.", true], ["Every rhombus is a square.", false], ["Every rectangle is a parallelogram.", true],
    ["Every parallelogram is a rectangle.", false], ["Every square is a parallelogram.", true], ["Every square is a quadrilateral.", true], ["Every quadrilateral is a rectangle.", false], ["Every rhombus is a parallelogram.", true],
    ["Every triangle has 4 sides.", false], ["Every parallelogram is a quadrilateral.", true]];
  const shapeHier = () => {
    if (Math.random() < 0.75) { const it = pick(SH); return { text: `True or false? ${it[0]}`, choices: ["True", "False"], answer: it[1] ? "True" : "False",
      hints: ["Think about the rules (definition) of each shape. A shape can belong to more than one group.", "Does the first shape always follow every rule of the second shape? Test it with a drawing.", "Example: every dog is an animal, but not every animal is a dog. Groups can be inside other groups. Now think about yours."] }; }
    const q = pick([["Which shape has 4 equal sides AND 4 right angles?", "square"], ["Which shape is both a rectangle and a rhombus?", "square"], ["Which shape has 4 right angles, but its sides are not all equal?", "rectangle"]]);
    return { text: q[0], choices: cho(q[1], "square", "rectangle", "trapezoid", "triangle"), answer: q[1],
      hints: ["List the rules for each shape in the clue.", "Which shape follows all the rules at once?", "Example: a shape that is both a rectangle and a parallelogram is a rectangle, because all rectangles are parallelograms. Now do yours."] };
  };
  const metricDec = () => {
    const U = [["km", "m", 1000], ["m", "cm", 100], ["kg", "g", 1000], ["L", "mL", 1000], ["cm", "mm", 10]], u = pick(U);
    if (Math.random() < 0.55) { const x = ri(11, 99) / 10, R = Math.round(x * u[2]); return { text: `${x} ${u[0]} = ? ${u[1]}`, answer: R,
      hints: [`You are going to a smaller unit (${u[1]}), so the number gets bigger.`, `Multiply by ${u[2]}. That moves the decimal point ${String(u[2]).length - 1} place${u[2] > 10 ? "s" : ""} to the right.`, "Example: 2.4 km to m. 2.4 × 1000 = 2400 m. Now do yours."] }; }
    const R = ri(11, 99) / (u[2] === 10 ? 1 : 1), n = ri(12, 989) * (u[2] / 10), ans = fm(n / u[2]);
    return { text: `${n} ${u[1]} = ? ${u[0]}`, choices: cho(ans, fm(n / u[2] * 10), fm(n / u[2] / 10), fm(n * u[2])), answer: ans,
      hints: [`You are going to a bigger unit (${u[0]}), so the number gets smaller.`, `Divide by ${u[2]}. That moves the decimal point ${String(u[2]).length - 1} place${u[2] > 10 ? "s" : ""} to the left.`, "Example: 3500 m to km. 3500 ÷ 1000 = 3.5 km. Now do yours."] };
  };
  const medianQ = () => {
    const even = Math.random() < 0.4, n = even ? 6 : pick([5, 7]);
    let v, m, i = 0;
    do { v = Array.from({ length: n }, () => ri(1, 30)); const s = [...v].sort((a, b) => a - b); m = even ? (s[n / 2 - 1] + s[n / 2]) / 2 : s[(n - 1) / 2]; } while ((m % 1 !== 0) && ++i < 300);
    if (m % 1 !== 0) return medianQ();
    return { text: `What is the median of ${v.join(", ")}?`, answer: m,
      hints: ["The median is the middle number when the data is in order from least to greatest.", even ? "There are two middle numbers. Add them and divide by 2 to find the number halfway between." : "Put the numbers in order first. Then find the one with the same number of values on each side.", "Example: 9, 2, 7, 4, 5. In order: 2, 4, 5, 7, 9. The middle is 5. Now do yours."] };
  };
  const twoRules = () => {
    const a = ri(2, 5), m = ri(2, 4), r2 = a * m, k = ri(5, 7), s1 = [0, 1, 2, 3].map(i => i * a), s2 = [0, 1, 2, 3].map(i => i * r2);
    if (Math.random() < 0.5) return { text: `Rule 1: start at 0, add ${a}.<br>Rule 2: start at 0, add ${r2}.<br>Rule 1 makes ${s1.join(", ")}... Rule 2 makes ${s2.join(", ")}...<br>Each number in Rule 2 is how many times the matching number in Rule 1?`, answer: m,
      hints: ["Compare the numbers that are in the same position in both lists.", "Divide a number in Rule 2 by the matching number in Rule 1. It works for every pair except the zeros.", "Example: Rule 1 gives 2, 4, 6 and Rule 2 gives 8, 16, 24. 8 ÷ 2 = 4, so each is 4 times as much. Now do yours."] };
    return { text: `Rule 1: start at 0, add ${a}.<br>Rule 2: start at 0, add ${r2}.<br>The ${k}th number in Rule 1 is ${(k - 1) * a}. What is the ${k}th number in Rule 2?`, answer: (k - 1) * r2,
      hints: ["Each number in Rule 2 is the same number of times as its partner in Rule 1.", `Find how many times as much Rule 2 is compared to Rule 1 (compare ${a} and ${r2}). Multiply the Rule 1 number by that.`, "Example: Rule 1 adds 2 and Rule 2 adds 6. Rule 2 is 3 times Rule 1. If Rule 1 gives 8, Rule 2 gives 24. Now do yours."] };
  };
  const percentMean = () => {
    const t = ri(0, 2), fr = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [7, 10], [9, 20], [3, 25], [17, 50], [1, 10], [13, 20]]);
    const pc = fr[0] * 100 / fr[1];
    if (t === 0) return { text: `Write ${fr[0]}/${fr[1]} as a percent. (Type the number only.)`, answer: pc,
      hints: ["Percent means \"out of 100\". Make the bottom number 100.", `Multiply the top and bottom by the same number so the bottom becomes 100. The new top number is the percent.`, "Example: 3/20 = 15/100 = 15%. Now do yours."] };
    if (t === 1) { const ans = fm(pc / 100); return { text: `Write ${pc}% as a decimal.`, choices: cho(ans, fm(pc / 10), fm(pc), fm(pc / 1000), fm(pc / 100 + 0.1)), answer: ans,
      hints: ["Percent means out of 100. Dividing by 100 moves the decimal point.", "Move the decimal point 2 places to the left (you may need to add a zero).", "Example: 35% = 0.35 and 6% = 0.06. Now do yours."] }; }
    const d = ri(2, 98); const ans = `${d}%`; return { text: `Which percent equals ${fm(d / 100)}?`, choices: cho(ans, `${d / 10 >= 1 ? fm(d / 10) : d * 10}%`, `${d * 10}%`, `${fm(d / 100)}%`, `${100 - d}%`), answer: ans,
      hints: ["To change a decimal to a percent, go the other way: multiply by 100.", "Move the decimal point 2 places to the right.", "Example: 0.72 = 72% and 0.5 = 50%. Now do yours."] };
  };
  const percentOf = () => {
    const p = pick([10, 20, 25, 50, 75, 5, 30, 40]), base = p === 5 ? 20 * ri(1, 12) : p === 25 || p === 75 ? 4 * ri(2, 25) : 10 * ri(2, 30), t = ri(0, 2), amt = base * p / 100;
    const h1 = ["Percent means out of 100. Find an easy way: 10% is one tenth, 50% is half, 25% is a quarter.", "Break the percent into friendly parts. For 10% divide by 10. For 5% take half of 10%. For 75% add 50% and 25%.", "Example: 20% of 60. 10% of 60 is 6, so 20% is 12. Now do yours."];
    if (t === 0) return { text: `What is ${p}% of ${base}?`, answer: amt, hints: h1 };
    if (t === 1) return { text: `A game costs $${base}. It is ${p}% off. How many dollars is the discount?`, visual: "🎮", answer: amt, hints: h1 };
    return { text: `A game costs $${base}. It is ${p}% off. What is the sale price in dollars?`, visual: "🎮", answer: base - amt, wrong: g => (g === amt ? "That is the discount. The sale price is what you pay after taking it off." : null),
      hints: ["Find the discount first. Then subtract it from the price.", "Use friendly percents: 10% is one tenth, 50% is half, 25% is a quarter. Then take that amount off.", "Example: $40 with 25% off. 25% of 40 is 10. 40 − 10 = $30. Now do yours."] };
  };
  const ratioQ = () => {
    const pairs = [["🔴", "red", "🔵", "blue"], ["🍎", "apples", "🍌", "bananas"], ["🐶", "dogs", "🐱", "cats"], ["⚽", "soccer balls", "🏀", "basketballs"]], p = pick(pairs), a = ri(2, 8), b = rx(2, 8, a), t = ri(0, 2);
    const vis = p[0].repeat(a) + "<br>" + p[2].repeat(b);
    if (t === 0) return { text: `There are ${a} ${p[1]} and ${b} ${p[3]}. What is the ratio of ${p[1]} to ${p[3]}?`, visual: vis, choices: cho(`${a}:${b}`, `${b}:${a}`, `${a}:${a + b}`, `${a + b}:${a}`), answer: `${a}:${b}`,
      hints: ["A ratio compares two amounts. The order matters!", "\"Ratio of X to Y\" puts X first and Y second. Count each group.", "Example: 3 cats and 5 dogs. The ratio of cats to dogs is 3:5, and dogs to cats is 5:3. Now do yours."] };
    if (t === 1) return { text: `There are ${a} ${p[1]} and ${b} ${p[3]}. What is the ratio of ${p[3]} to ${p[1]}?`, visual: vis, choices: cho(`${b}:${a}`, `${a}:${b}`, `${b}:${a + b}`, `${a + b}:${b}`), answer: `${b}:${a}`,
      hints: ["A ratio compares two amounts. The first thing named goes first.", "Read the question again: which group is named first? Count it, then count the second group.", "Example: 2 red and 7 blue. Ratio of blue to red is 7:2. Now do yours."] };
    return { text: `There are ${a} ${p[1]} and ${b} ${p[3]}. What is the ratio of ${p[1]} to ALL of the objects?`, visual: vis, choices: cho(`${a}:${a + b}`, `${a}:${b}`, `${b}:${a + b}`, `${a + b}:${a}`), answer: `${a}:${a + b}`,
      hints: ["\"All of the objects\" means the total, both groups together.", "Find the total first. Then write the part, a colon, then the total.", "Example: 3 cats and 5 dogs. Total 8. The ratio of cats to all pets is 3:8. Now do yours."] };
  };
  const equivRatio = () => {
    const a = ri(2, 6), b = rx(2, 9, a), k = ri(2, 6), t = ri(0, 2);
    if (t === 0) return { text: `${a}:${b} = ${a * k}:?`, answer: b * k, hints: ["Equivalent ratios are made by multiplying both numbers by the same amount.", `What did you multiply ${a} by to get ${a * k}? Do the same to ${b}.`, "Example: 3:4 = 9:?. 3 × 3 = 9, so 4 × 3 = 12. Now do yours."] };
    if (t === 1) return { text: `${a}:${b} = ?:${b * k}`, answer: a * k, hints: ["Both numbers in a ratio get multiplied by the same amount.", `What did you multiply ${b} by to get ${b * k}? Do the same to ${a}.`, "Example: 2:5 = ?:20. 5 × 4 = 20, so 2 × 4 = 8. Now do yours."] };
    const it = pick([["cups of flour", "cups of sugar"], ["red beads", "blue beads"], ["blue paint", "yellow paint"]]);
    return { text: `A recipe uses ${a} ${it[0]} for every ${b} ${it[1]}. How many ${it[1]} are needed for ${a * k} ${it[0]}?`, answer: b * k,
      hints: ["Keep the same ratio. Both amounts grow by the same number of times.", `How many times bigger is ${a * k} than ${a}? Multiply the other amount by that.`, "Example: 2 cups of flour for every 3 of sugar. For 6 flour (3 times as much) you need 3 × 3 = 9 sugar. Now do yours."] };
  };
  const unitRate = () => {
    const r = ri(2, 12), n = ri(3, 9), t = ri(0, 2);
    if (t === 0) return { text: `A car travels ${r * n} km in ${n} hours at a steady speed. How many km does it travel in 1 hour?`, visual: "🚗", answer: r,
      hints: ["A unit rate tells how much for ONE of something.", "Divide the total distance by the number of hours.", "Example: 120 km in 4 hours. 120 ÷ 4 = 30 km each hour. Now do yours."] };
    if (t === 1) return { text: `${n} notebooks cost $${r * n}. What is the cost of 1 notebook in dollars?`, visual: "📓", answer: r,
      hints: ["A unit rate tells the cost of ONE item.", "Divide the total cost by the number of items.", "Example: 5 pens cost $15, so one pen costs 15 ÷ 5 = $3. Now do yours."] };
    const k = ri(3, 9);
    return { text: `Mia reads ${r} pages every day. At that rate, how many pages does she read in ${k} days?`, visual: "📖", answer: r * k,
      hints: ["The unit rate says how much happens in ONE day. More days means more pages.", "Multiply the pages in one day by the number of days.", "Example: 7 pages a day for 4 days is 7 × 4 = 28 pages. Now do yours."] };
  };
  const intQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const a = ri(1, 15), b = rx(1, 15, a), ans = String(-Math.min(a, b)); return { text: `Which is greater: −${a} or −${b}?`, choices: [`-${a}`, `-${b}`], answer: ans === `-${a}` ? `-${a}` : `-${b}`,
      hints: ["Picture a number line. Numbers farther to the right are greater.", "For negative numbers, the one closer to zero is greater.", "Example: −2 is greater than −7, because −2 is closer to zero. Now do yours."] }; }
    if (t === 1) { const s = -ri(2, 9), c = ri(s * -1 + 1, s * -1 + 8), ans = String(s + c); return { text: `The temperature is ${s}°C. It goes up by ${c} degrees. What is the new temperature in °C?`, visual: "🌡️", choices: cho(ans, String(-(Math.abs(s) + c)), String(c - s), String(s - c), String(c - Math.abs(s) - 1)), answer: ans,
      hints: ["Going up means moving to the right on the number line.", "Start at the negative number and count up. When you pass zero, the answer is positive.", "Example: −3°C and up 5 degrees: −3 + 5 = 2°C. Now do yours."] }; }
    if (t === 2) { const s = ri(1, 8), c = ri(s + 1, s + 9), ans = String(s - c); return { text: `The temperature is ${s}°C. It drops by ${c} degrees. What is the new temperature in °C?`, visual: "🌡️", choices: cho(ans, String(c - s), String(-(s + c)), String(s + c), String(s - c + 1)), answer: ans,
      hints: ["Dropping means moving to the left on the number line.", "Start at the temperature and count down. Going past zero gives a negative number.", "Example: 4°C and a drop of 7 degrees: 4 − 7 = −3°C. Now do yours."] }; }
    const v = ri(2, 20); return { text: `What is the opposite of ${v > 10 ? "−" : ""}${v}?`, choices: cho(v > 10 ? String(v) : `-${v}`, v > 10 ? `-${v + 1}` : String(v), `${v > 10 ? "-" : ""}${v}`, "0", v > 10 ? String(v - 1) : `-${v + 1}`), answer: v > 10 ? String(v) : `-${v}`,
      hints: ["Opposites are the same distance from zero but on different sides.", "Flip the side of zero. A positive number becomes negative and a negative number becomes positive.", "Example: the opposite of 6 is −6, and the opposite of −9 is 9. Now do yours."] };
  };
  const oneStepEq = () => {
    const v = pick(["n", "x", "y", "a"]), t = ri(0, 3), x = ri(2, 15), a = ri(2, 9), hs = ["An equation says two sides are equal. Use the opposite (inverse) operation to get the letter alone.", "Whatever you do to one side, do to the other side. Addition and subtraction undo each other, and so do multiplication and division.", "Example: n + 4 = 11. Subtract 4 from both sides: n = 7. Now do yours."];
    if (t === 0) return { text: `${v} + ${a} = ${x + a}.   ${v} = ?`, answer: x, hints: hs };
    if (t === 1) return { text: `${v} − ${a} = ${x}.   ${v} = ?`, answer: x + a, hints: hs };
    if (t === 2) return { text: `${a}${v} = ${a * x}.   ${v} = ?`, answer: x, hints: hs };
    return { text: `${v} ÷ ${a} = ${x}.   ${v} = ?`, answer: x * a, hints: hs };
  };
  const evalVar = () => {
    const n = ri(2, 9), a = ri(2, 6), b = ri(1, 12), t = ri(0, 3), v = pick(["n", "x", "k"]);
    const hs = ["Replace the letter with the number it equals. Then follow the order of operations.", "Remember: a number next to a letter, like 3n, means multiply. Do multiplication before adding or subtracting.", "Example: if n = 4, then 2n + 3 = 2 × 4 + 3 = 8 + 3 = 11. Now do yours."];
    if (t === 0) return { text: `If ${v} = ${n}, what is ${a}${v} + ${b}?`, answer: a * n + b, hints: hs };
    if (t === 1) return { text: `If ${v} = ${n}, what is ${a}${v} − ${Math.min(b, a * n - 1)}?`, answer: a * n - Math.min(b, a * n - 1), hints: hs };
    if (t === 2) return { text: `If ${v} = ${n}, what is ${v} × ${v} + ${b}?`, answer: n * n + b, hints: hs };
    return { text: `If ${v} = ${n}, what is ${a} × (${v} + ${b})?`, answer: a * (n + b), hints: hs };
  };
  const sqCube = () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(2, 15); return { text: `${sup(n, 2)} = ?`, answer: n * n, hints: ["A small 2 means \"squared\": multiply the number by itself.", "Multiply the base by itself, two copies in all.", "Example: 7<sup>2</sup> = 7 × 7 = 49. Now do yours."] }; }
    if (t === 1) { const n = ri(2, 6); return { text: `${sup(n, 3)} = ?`, answer: n * n * n, hints: ["A small 3 means \"cubed\": three copies of the number multiplied together.", "Multiply the base, then multiply by the base again, then once more.", "Example: 3<sup>3</sup> = 3 × 3 × 3 = 9 × 3 = 27. Now do yours."] }; }
    if (t === 2) { const n = ri(2, 12); return { text: `What number times itself equals ${n * n}? (the square root of ${n * n})`, answer: n, hints: ["The square root undoes squaring.", "Think of your times tables: which number multiplied by itself gives the number?", "Example: the square root of 49 is 7, because 7 × 7 = 49. Now do yours."] }; }
    const n = ri(2, 5), b = ri(1, 3); return { text: `${sup(n, 2)} + ${b} × ${n} = ?`, answer: n * n + b * n, hints: ["Work out the power first, then multiply, then add.", "Order of operations: exponents, then multiply and divide, then add and subtract.", "Example: 3<sup>2</sup> + 2 × 4 = 9 + 8 = 17. Now do yours."] };
  };
  const meanMiss = () => {
    const t = ri(0, 2), n = pick([4, 5]), m = ri(5, 20), tot = n * m;
    if (t === 0) { let v; do { v = Array.from({ length: n - 1 }, () => ri(Math.max(1, m - 6), m + 6)); } while (tot - v.reduce((a, b) => a + b, 0) < 1);
      return { text: `The mean of ${n} numbers is ${m}. ${n - 1} of them are ${v.join(", ")}. What is the missing number?`, answer: tot - v.reduce((a, b) => a + b, 0),
        hints: ["The mean times the number of values gives the total of all the values.", "Find the total of all the numbers, then subtract the ones you already know.", "Example: the mean of 3 numbers is 6, and two of them are 4 and 7. Total = 18. 18 − 4 − 7 = 7. Now do yours."] }; }
    if (t === 1) { const v = Array.from({ length: n }, () => ri(1, 20)), s = v.reduce((a, b) => a + b, 0), adj = v.slice(); adj[0] += (n - (s % n)) % n; return { text: `What is the mean of ${adj.join(", ")}?`, answer: adj.reduce((a, b) => a + b, 0) / n,
      hints: ["The mean shares the total out equally.", `Add all the numbers. Then divide by how many numbers there are (${n}).`, "Example: 4, 8, 6, 10 add to 28, and 28 ÷ 4 = 7. Now do yours."] }; }
    const q = pick([["most often", "mode"], ["in the middle when put in order", "median"], ["biggest minus smallest", "range"], ["the total shared out equally", "mean"]]);
    return { text: `Which measure tells the number that is ${q[0]}?`, choices: ["mean", "median", "mode", "range"], answer: q[1],
      hints: ["There are four ideas: mean, median, mode and range. Think about what each one does.", "Mean shares equally, median is the middle, mode is the most common, and range is how spread out the data is.", "Example: for 2, 3, 3, 8 the number that appears most often is 3, so that is the mode. Now do yours."] };
  };
  const probQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const r = ri(1, 7), b = ri(1, 7), g = ri(1, 6), tot = r + b + g, ans = fracStr(r, tot); return { text: `A bag has ${r} red, ${b} blue and ${g} green marbles. You pick one without looking. What is the chance (probability) of red?`, visual: "🔴".repeat(r) + "🔵".repeat(b) + "🟢".repeat(g),
      choices: cho(ans, fracStr(b, tot), fracStr(r, r + b), fracStr(tot, r), fracStr(r + 1, tot)), answer: ans,
      hints: ["Probability = the number of ways to get what you want, over the total number of outcomes.", "Count the red marbles, then count ALL the marbles. Write it as a fraction and simplify.", "Example: 2 red out of 10 marbles is 2/10 = 1/5. Now do yours."] }; }
    if (t === 1) { const e = pick([["rolling a 6 on a number cube", "1/6"], ["rolling an even number on a number cube", "1/2"], ["rolling a number less than 3 on a number cube", "1/3"], ["rolling a number greater than 4 on a number cube", "1/3"], ["flipping a coin and getting heads", "1/2"], ["rolling a 7 on a number cube", "0"]]);
      return { text: `A fair number cube has the numbers 1 to 6. What is the probability of ${e[0]}?`, visual: "🎲", choices: cho(e[1], "1/6", "1/2", "1/3", "2/3", "0", "1"), answer: e[1],
        hints: ["Count how many outcomes are what you want. Then count all the possible outcomes (6 for a cube).", "Write the wanted outcomes over the total. If it cannot happen, the probability is 0.", "Example: rolling an odd number on a cube. 1, 3 and 5 are odd, so 3 out of 6 = 1/2. Now do yours."] }; }
    const e = pick([["The sun will rise tomorrow.", "certain"], ["You roll a 9 on a regular number cube.", "impossible"], ["You flip a coin and it lands on heads.", "equally likely as tails"], ["A bag has 9 red and 1 blue marble. You pick red.", "very likely"], ["A bag has 9 red and 1 blue marble. You pick blue.", "unlikely"]]);
    return { text: `How likely is this? "${e[0]}"`, choices: cho(e[1], "certain", "impossible", "very likely", "unlikely", "equally likely as tails"), answer: e[1],
      hints: ["Probability words go from impossible (0) to certain (1).", "Ask: can it happen at all? Is it almost sure, or hardly ever?", "Example: \"A cat will bark like a dog\" is impossible. \"A fair coin lands heads\" is as likely as tails. Now do yours."] };
  };

  const l12 = [
    L("Volume of boxes", volForm, [S("Volume", "📦", "<b>Volume</b> is the space inside a 3D shape. We measure it in cubic units."), S("Formula", "V = l × w × h", "Volume of a box = length × width × height."), S("Missing side", "60 ÷ (5 × 3)", "To find a missing side, divide the volume by the other sides multiplied.")]),
    L("Counting unit cubes", unitCubes, [S("One cube", "🟦", "A unit cube has volume 1 cubic unit."), S("Layers", "4 × 3 = 12 per layer", "Count the cubes in one layer: row length × number of rows."), S("Stack them", "12 × 2 layers", "Multiply by the number of layers to get the volume.")]),
    L("Volume of two boxes together", compVol, [S("Break it apart", "🏢", "A shape made of two boxes can be split into two simple boxes."), S("Find each", "2×3×4 = 24", "Work out each volume separately."), S("Add", "24 + 10 = 34", "Add the volumes. Do not forget the units: cubic meters.")]),
    L("Shape families", shapeHier, [S("Groups inside groups", "⬛ ⊂ ▭", "A square is a special rectangle, because it has 4 right angles."), S("Rhombus and parallelogram", "◇", "A rhombus has 4 equal sides and opposite sides parallel, so it is a parallelogram."), S("Not the other way", "▭ ≠ ⬛", "Not every rectangle is a square, because a rectangle's sides may be different lengths.")]),
    L("Metric units with decimals", metricDec, [S("Big to small: multiply", "2.4 km = 2400 m", "To go to a smaller unit, multiply by 10, 100 or 1,000. The decimal point moves right."), S("Small to big: divide", "3500 m = 3.5 km", "To go to a bigger unit, divide. The decimal point moves left."), S("Key facts", "1 km = 1000 m", "1 m = 100 cm, 1 cm = 10 mm, 1 kg = 1000 g, 1 L = 1000 mL.")]),
    L("Median", medianQ, [S("Put in order", "9, 2, 7, 4, 5 → 2, 4, 5, 7, 9", "Always order the numbers from least to greatest first."), S("The middle", "5", "With an odd count, the median is the middle number."), S("Two middles", "4, 6 → 5", "With an even count, find the number halfway between the two middle ones.")]),
    L("Two number patterns", twoRules, [S("Two rules", "0, 2, 4, 6 &nbsp; 0, 6, 12, 18", "Two patterns can start at the same number but grow at different speeds."), S("Compare partners", "6 ÷ 2 = 3", "Divide a number in the second pattern by its partner in the first pattern."), S("Predict", "3 times as much", "If Rule 2 is always 3 times Rule 1, you can find any term from its partner.")]),
    L("Percent, fractions and decimals", percentMean, [S("Out of 100", "45% = 45/100", "<b>Percent</b> means \"per hundred\"."), S("To decimal", "45% = 0.45", "Divide by 100: move the decimal point 2 places left."), S("From a fraction", "3/20 = 15/100 = 15%", "Make the bottom 100 and the top is the percent.")]),
    L("Percent of a number", percentOf, [S("Friendly percents", "10%, 25%, 50%", "10% = divide by 10. 50% = half. 25% = a quarter."), S("Build others", "20% = 10% + 10%", "Make other percents from these. 5% is half of 10%."), S("Sale price", "price − discount", "A sale price is the original price minus the discount.")]),
    L("Introduction to ratios", ratioQ, [S("Compare two amounts", "🔴🔴🔴 🔵🔵🔵🔵🔵", "3 red and 5 blue. The ratio of red to blue is <b>3:5</b>."), S("Order matters", "5:3 ≠ 3:5", "The ratio of blue to red is 5:3."), S("Part to whole", "3:8", "Red to all the marbles is 3:8, because there are 8 in all.")]),
    L("Equivalent ratios", equivRatio, [S("Multiply both", "3:4 = 9:12", "Multiply both numbers by the same number to get an equivalent ratio."), S("Recipes", "🍰", "If you make a recipe 3 times as big, every ingredient is 3 times as much."), S("Fill the gap", "2:5 = ?:20", "5 × 4 = 20, so 2 × 4 = 8.")]),
    L("Unit rates", unitRate, [S("Rate for one", "120 km in 4 h", "A <b>unit rate</b> tells how much for ONE unit."), S("Divide", "120 ÷ 4 = 30 km/h", "Divide the total by the number of units."), S("Use it", "30 km/h × 3 h", "Multiply the unit rate by any number of units.")]),
    L("Negative numbers", intQ, [S("The number line", "-3 -2 -1 0 1 2 3", "Numbers left of zero are negative. Right of zero are positive."), S("Which is greater?", "-2 &gt; -7", "The farther right, the greater. Closer to zero is greater for negatives."), S("Temperature", "🌡️", "Up means move right. Down means move left. You can cross zero.")]),
    L("One-step equations", oneStepEq, [S("Balance", "⚖️", "An equation is like a balanced scale. Do the same to both sides."), S("Undo it", "n + 4 = 11 → n = 11 − 4", "Use the opposite operation to get the letter alone."), S("Check", "7 + 4 = 11 ✅", "Put your answer back in to check.")]),
    L("Expressions with letters", evalVar, [S("A letter is a number", "n = 4", "A letter can stand for a number. If n = 4, put 4 in its place."), S("Next to a letter", "3n = 3 × n", "A number next to a letter means multiply."), S("Order", "2n + 3 = 2×4 + 3 = 11", "Then follow the order of operations.")]),
    L("Squares and cubes", sqCube, [S("Squared", "7<sup>2</sup> = 7 × 7", "A small 2 means multiply the number by itself: 49."), S("Cubed", "3<sup>3</sup> = 3 × 3 × 3", "A small 3 means three copies multiplied: 27."), S("Square root", "√49 = 7", "The square root undoes squaring.")]),
    L("Mean and other averages", meanMiss, [S("Mean", "4, 8, 6, 10 → 7", "Add them and divide by how many there are."), S("Missing number", "mean × count = total", "To find a missing value, find the total first, then subtract what you know."), S("Compare measures", "mean, median, mode, range", "Mean shares equally, median is the middle, mode is most common, range is the spread.")]),
    L("Probability", probQ, [S("From 0 to 1", "impossible … certain", "Probability tells how likely something is. 0 is impossible. 1 is certain."), S("A fraction", "2 red of 10 = 2/10", "Probability = ways to get what you want ÷ all outcomes."), S("Fair", "🎲 6 outcomes", "On a fair number cube each of the 6 numbers is equally likely.")])
  ];
  l12.push(mixOf("Mixed practice", [l12[0], l12[2], l12[4], l12[8], l12[11], l12[13], l12[15]]));
  l12.push(mixOf("Level 12 Challenge", [l12[1], l12[3], l12[5], l12[6], l12[7], l12[9], l12[10], l12[12], l12[14], l12[16], l12[17]]));

  Object.assign(MATH_LEVELS, { 10: l10, 11: l11, 12: l12 });
})();
