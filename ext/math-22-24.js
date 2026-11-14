// ext/math-22-24.js  Mind Lab Math levels 22-24 (60 lessons): geometry finishing, algebra 2, precalculus
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const esc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const clean = h => String(h).replace(/<[^>]+>/g, " ");
  const leaks = (q, idx) => {
    const re = new RegExp("(?<![0-9A-Za-z.])" + esc(q.answer) + "(?![0-9A-Za-z]|\\.[0-9])", "i");
    return idx.some(i => re.test(clean(q.hints[i])));
  };
  const G = fn => () => { let q; for (let i = 0; i < 40; i++) { q = fn(); if (!leaks(q, [0, 1])) return q; } return q; };
  const L = (title, fn, slides) => { const mk = G(fn); mk.teach = () => slides; return { title, make: mk }; };
  const mixOf = (title, lessons) => {
    const f = () => pick(lessons).make();
    f.teach = () => {
      const s = [S("Review time!", "🔄", "This lesson mixes ideas you have learned. Here is a quick reminder of each one, then the quiz.")];
      lessons.forEach(l => s.push(l.make.teach()[0]));
      return s;
    };
    return { title, make: f };
  };
  const nrm = v => String(v).trim().toLowerCase().replace(/[^\w.\-]/g, "");
  const cho = (ans, ...o) => {
    const a = String(ans), seen = new Set([nrm(a)]), out = [];
    for (const x of shuf(o.map(String))) { if (!seen.has(nrm(x)) && out.length < 3) { seen.add(nrm(x)); out.push(x); } }
    return shuf([a, ...out]);
  };
  const Q = (text, answer, hints, o = {}) => ({ text, answer, hints, ...o });
  const mf = x => String(x).replace(/−/g, "-");
  const C = (text, ans, wr, hints, o = {}) => ({ text, choices: cho(mf(ans), ...wr.map(mf)), answer: mf(ans), hints, ...o });
  const N = (text, val, hints, o = {}) => {
    const { step = 1, ...rest } = o;
    val = Math.round(val * 1000) / 1000;
    if (val >= 0) return { text, answer: val, hints, ...rest };
    const f = x => String(Math.round(x * 1000) / 1000);
    return { text, choices: cho(f(val), f(-val), f(val + step), f(val - step), f(-val + step), f(val + 2 * step)), answer: f(val), hints, ...rest };
  };
  const SUB = "₀₁₂₃₄₅₆₇₈₉", SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const sub = n => String(n).replace(/\d/g, d => SUB[d]);
  const sup = n => String(n).replace(/\d/g, d => SUP[d]);
  const m = n => (n < 0 ? "−" + (-n) : String(n));
  const pt = (x, y) => `(${x}, ${y})`;
  const PW = ["", "x", "x²", "x³", "x⁴", "x⁵", "x⁶", "x⁷"];
  const polyS = cs => {
    const n = cs.length - 1, out = [];
    cs.forEach((c, i) => {
      if (!c) return;
      const d = n - i, ab = Math.abs(c), body = (ab === 1 && d > 0) ? PW[d] : ab + PW[d];
      out.push(out.length ? `${c < 0 ? "−" : "+"} ${body}` : `${c < 0 ? "−" : ""}${body}`);
    });
    return out.join(" ") || "0";
  };
  const evalP = (cs, x) => cs.reduce((a, c) => a * x + c, 0);
  const mulP = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };
  const nz = (lo, hi) => { let x; do { x = ri(lo, hi); } while (x === 0); return x; };
  const TR = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [6, 8, 10]];

  // ================= LEVEL 22 =================
  const pyr = () => {
    const sq = ri(0, 1) === 0; let l, w, h;
    do { l = ri(3, 12); w = sq ? l : ri(3, 12); h = ri(3, 15); } while ((l * w * h) % 3);
    return Q(`A pyramid has ${sq ? `a square base, ${l} by ${l},` : `a rectangular base, ${l} by ${w},`} and a height of ${h}. What is its volume?`, l * w * h / 3,
      ["A pyramid holds exactly one third of the box with the same base and the same height.", "Volume = (base area × height) ÷ 3. Start by finding the base area.", "Example: base 6 by 5, height 9. Base area 30, then 30 × 9 = 270, and 270 ÷ 3 = 90. Now do yours."]);
  };
  const cylSA = () => {
    const r = ri(2, 9), h = ri(2, 12), t = ri(0, 2);
    const tail = "Give the number that goes in front of π.";
    if (t === 0) return Q(`A cylinder has radius ${r} and height ${h}. The area of its curved side is 2πrh. ${tail}`, 2 * r * h,
      ["Put the radius and the height into 2πrh and multiply the plain numbers.", "2 × r × h gives the number in front of π.", "Example: r = 3, h = 5: 2 × 3 × 5 = 30, so the area is 30π. Now do yours."]);
    if (t === 1) return Q(`A cylinder has radius ${r}. The two circular ends together have area 2πr². ${tail}`, 2 * r * r,
      ["Each end is a circle with area πr². There are two ends.", "Find r × r, then double it.", "Example: r = 4. Each end is 16π, two ends make 32π. Now do yours."]);
    return Q(`Total surface area of a cylinder is 2πr² + 2πrh. With r = ${r} and h = ${h}, what is the number in front of π?`, 2 * r * r + 2 * r * h,
      ["Total surface = two circular ends + the curved side.", "Work out 2r² and 2rh separately, then add them.", "Example: r = 3, h = 4: ends 2 × 9 = 18, side 2 × 3 × 4 = 24, total 42π. Now do yours."]);
  };
  const sphere = () => {
    const t = ri(0, 2), r3 = 3 * ri(1, 3), r = ri(2, 12);
    if (t === 0) return Q(`A sphere has radius ${r}. Its surface area is 4πr². Give the number in front of π.`, 4 * r * r,
      ["Square the radius first, then multiply by 4.", "4 × r × r gives the number in front of π.", "Example: r = 5: 4 × 25 = 100, so the area is 100π. Now do yours."]);
    if (t === 1) return Q(`A sphere has radius ${r3}. Its volume is (4/3)πr³. Give the number in front of π.`, 4 * r3 ** 3 / 3,
      ["Cube the radius (r × r × r), then take four thirds of it.", "Divide r³ by 3 first, then multiply by 4.", "Example: r = 6: 6³ = 216, ÷ 3 = 72, × 4 = 288, so the volume is 288π. Now do yours."]);
    return Q(`A hemisphere (half a sphere) has radius ${r3}. Its volume is (2/3)πr³. Give the number in front of π.`, 2 * r3 ** 3 / 3,
      ["A hemisphere is half of a sphere, so use two thirds instead of four thirds.", "Cube the radius, divide by 3, then multiply by 2.", "Example: r = 6: 216 ÷ 3 = 72, × 2 = 144, so the volume is 144π. Now do yours."]);
  };
  const SOL = [["cube", 8, 12, 6], ["tetrahedron", 4, 6, 4], ["octahedron", 6, 12, 8], ["triangular prism", 6, 9, 5], ["square pyramid", 5, 8, 5], ["pentagonal prism", 10, 15, 7], ["pentagonal pyramid", 6, 10, 6], ["hexagonal prism", 12, 18, 8], ["hexagonal pyramid", 7, 12, 7], ["icosahedron", 12, 30, 20], ["dodecahedron", 20, 30, 12]];
  const euler = () => {
    const [nm, V, E, F] = pick(SOL), t = ri(0, 2);
    const hs = ["Euler's rule for solids: vertices − edges + faces = 2.", "Rearrange V − E + F = 2 so the missing number is alone, then use the two you know."];
    const ex = "Example: a solid has 9 vertices and 14 edges. F = 2 − 9 + 14 = 7. Now do yours.";
    if (t === 0) return Q(`A ${nm} has ${E} edges and ${F} faces. How many vertices does it have?`, V, [...hs, ex]);
    if (t === 1) return Q(`A ${nm} has ${V} vertices and ${F} faces. How many edges does it have?`, E, [...hs, ex]);
    return Q(`A ${nm} has ${V} vertices and ${E} edges. How many faces does it have?`, F, [...hs, ex]);
  };
  const areaRatio = () => {
    const k = ri(2, 6), t = ri(0, 3), A = ri(2, 12);
    if (t === 0) return Q(`Two similar shapes have a scale factor of 1 : ${k}. The small one has area ${A} square cm. What is the area of the big one, in square cm?`, A * k * k,
      ["When lengths grow by a scale factor, areas grow by that factor squared.", "Square the scale factor, then multiply by the small area.", "Example: scale factor 3, small area 5. 3² = 9, and 9 × 5 = 45. Now do yours."]);
    if (t === 1) return Q(`Two similar shapes have areas ${A} and ${A * k * k} square cm. What is the scale factor from the small shape to the big one?`, k,
      ["Divide the big area by the small area to get the area ratio.", "The area ratio is the scale factor squared. Which number times itself gives the ratio?", "Example: areas 2 and 50. 50 ÷ 2 = 25, and 5 × 5 = 25, so the scale factor is 5. Now do yours."]);
    if (t === 2) return Q(`A shape has perimeter ${A + 4} cm. A similar shape is enlarged by scale factor ${k}. What is the new perimeter in cm?`, (A + 4) * k,
      ["Perimeter is a length, so it grows by the plain scale factor (not squared).", "Multiply the old perimeter by the scale factor.", "Example: perimeter 10, scale factor 3. 10 × 3 = 30. Now do yours."]);
    return Q(`A square is enlarged by a scale factor of ${k}. How many times bigger does its AREA become?`, k * k,
      ["Think of a 1 by 1 square. Make each side the scale factor longer.", "Area = side × side, so the factor is used twice.", "Example: scale factor 4 gives a 4 by 4 square from a 1 by 1 square, which is 16 times the area. Now do yours with a different factor."]);
  };
  const solids = () => {
    const k = ri(2, 4), t = ri(0, 3), V = ri(2, 9);
    if (t === 0) return Q(`Two similar solids have a scale factor of 1 : ${k}. The small one has volume ${V} cubic cm. What is the volume of the big one?`, V * k ** 3,
      ["Volume uses three directions, so it grows by the scale factor cubed.", "Cube the scale factor, then multiply by the small volume.", "Example: scale factor 2, small volume 5. 2³ = 8, and 8 × 5 = 40. Now do yours."]);
    if (t === 1) return Q(`Two similar solids have volumes ${V} and ${V * k ** 3} cubic cm. What is the scale factor from small to big?`, k,
      ["Divide the big volume by the small volume.", "That ratio is the scale factor cubed. Which number multiplied by itself three times gives it?", "Example: volumes 3 and 24. 24 ÷ 3 = 8, and 2 × 2 × 2 = 8, so the scale factor is 2. Now do yours."]);
    if (t === 2) return Q(`A solid has surface area ${V} square cm. A similar solid is ${k} times as long in every direction. What is its surface area?`, V * k * k,
      ["Surface area is an area, so it grows by the scale factor squared.", "Square the scale factor, then multiply by the old surface area.", "Example: scale factor 3, surface area 4. 3² = 9, and 9 × 4 = 36. Now do yours."]);
    return Q(`Every edge of a cube is made ${k} times as long. How many times bigger is the VOLUME?`, k ** 3,
      ["Picture a 1 by 1 by 1 cube whose edges all grow.", "Volume = length × width × height, so the factor is used three times.", "Example: edges become 2 times longer, so volume becomes 2 × 2 × 2 = 8 times bigger. Now do yours with another factor."]);
  };
  const midpoint = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const x1 = ri(1, 9), y1 = ri(1, 9), x2 = x1 + 2 * ri(1, 5), y2 = y1 + 2 * ri(0, 5), mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      return C(`What is the midpoint of A${pt(x1, y1)} and B${pt(x2, y2)}?`, pt(mx, my), [pt(x1 + x2, y1 + y2), pt(my, mx), pt(mx + 1, my), pt((x2 - x1) / 2, (y2 - y1) / 2)],
        ["The midpoint is the average of the two points, one coordinate at a time.", "Add the two x-values and halve them. Do the same for the y-values.", "Example: midpoint of (2, 4) and (8, 10): x is (2 + 8) ÷ 2, y is (4 + 10) ÷ 2. Now do yours."]);
    }
    if (t === 1) {
      const x1 = ri(1, 9), y1 = ri(1, 9), dx = ri(1, 6), dy = ri(1, 6), mx = x1 + dx, my = y1 + dy, xs = ri(0, 1);
      return Q(`M${pt(mx, my)} is the midpoint of A${pt(x1, y1)} and B. What is the ${xs ? "x" : "y"}-coordinate of B?`, xs ? x1 + 2 * dx : y1 + 2 * dy,
        ["The midpoint is the average, so the end point is as far past M as A is before M.", `Use B = 2 × M − A, for the ${xs ? "x" : "y"}-values only.`, "Example: M = (5, 7), A = (2, 3). B's x = 2 × 5 − 2 = 8. Now do yours."]);
    }
    const x1 = ri(1, 8), y1 = ri(1, 8), dx = ri(1, 5), dy = ri(1, 5), xs = ri(0, 1);
    return Q(`P is one third of the way from A${pt(x1, y1)} to B${pt(x1 + 3 * dx, y1 + 3 * dy)}. What is the ${xs ? "x" : "y"}-coordinate of P?`, xs ? x1 + dx : y1 + dy,
      ["Find how far B is from A in this direction, then go one third of that.", `Take one third of the ${xs ? "x" : "y"}-difference and add it to A's ${xs ? "x" : "y"}.`, "Example: A = (1, 2), B = (10, 8). Difference in x is 9, a third is 3, so P's x is 1 + 3 = 4. Now do yours."]);
  };
  const centroid = () => {
    const t = ri(0, 1);
    if (t === 0) {
      const mm = ri(3, 9), x1 = ri(1, 2 * mm), x2 = ri(1, Math.min(2 * mm, 3 * mm - 1 - x1)), x3 = 3 * mm - x1 - x2;
      const my = ri(3, 9), y1 = ri(1, 2 * my), y2 = ri(1, Math.min(2 * my, 3 * my - 1 - y1)), y3 = 3 * my - y1 - y2, xs = ri(0, 1);
      return Q(`A triangle has vertices ${pt(x1, y1)}, ${pt(x2, y2)} and ${pt(x3, y3)}. What is the ${xs ? "x" : "y"}-coordinate of its centroid?`, xs ? mm : my,
        ["The centroid is where the three medians cross. Its coordinates are averages of the vertices.", `Add the three ${xs ? "x" : "y"}-values and divide by 3.`, "Example: vertices (1, 2), (5, 4), (3, 9). Centroid x = (1 + 5 + 3) ÷ 3 = 3. Now do yours."]);
    }
    const s = ri(2, 9), t2 = ri(0, 2);
    if (t2 === 0) return Q(`A median of a triangle is ${3 * s} cm long. How far is the centroid from the vertex, along that median?`, 2 * s,
      ["The centroid splits every median into two parts in a 2 : 1 ratio.", "The part from the vertex is the longer part, two thirds of the median.", "Example: a median of 12 cm. Two thirds of 12 is 8 cm from the vertex. Now do yours."]);
    if (t2 === 1) return Q(`The centroid is ${s} cm from the midpoint of a side, along a median. How long is the whole median?`, 3 * s,
      ["The short part (centroid to side) is one third of the median.", "So the whole median is three times the short part.", "Example: the short part is 4 cm, so the median is 12 cm. Now do yours."]);
    return Q(`On a median, the part from the vertex to the centroid is ${2 * s} cm. How long is the part from the centroid to the side?`, s,
      ["The two parts are in a 2 : 1 ratio.", "The part near the side is half of the part near the vertex.", "Example: vertex part 10 cm, so the side part is 5 cm. Now do yours."]);
  };
  const cyclic = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(50, 130), d = ri(50, 130); const w = ri(0, 1); return Q(`A quadrilateral ABCD is inscribed in a circle. Angle ${w ? "A" : "B"} = ${w ? a : d}°. What is the opposite angle ${w ? "C" : "D"}?`, 180 - (w ? a : d),
      ["Opposite angles of a quadrilateral inscribed in a circle add up to the same total.", "That total is a straight line, 180°.", "Example: if angle A = 70°, then angle C = 180° − 70° = 110°. Now do yours."]); }
    if (t === 1) { const x = ri(10, 40), p = ri(0, 30), q = 180 - 3 * x - p; return Q(`Opposite angles of a cyclic quadrilateral are (2x + ${p})° and (x + ${q})°. Find x.`, x,
      ["Opposite angles add to 180°, so write an equation.", "(2x + p) + (x + q) = 180. Collect the x terms and the plain numbers.", "Example: (2x + 10) + (x + 20) = 180 gives 3x + 30 = 180, 3x = 150, x = 50. Now do yours."]); }
    const a = ri(60, 120); return Q(`In cyclic quadrilateral ABCD, an exterior angle at D is ${a}°. What is the interior angle at the opposite vertex B?`, a,
      ["An exterior angle sits on a straight line with its interior angle.", "Its partner interior angle is 180 minus it, and that one has an opposite angle that is supplementary to it.", "Example: exterior angle 80°, interior at D = 100°, opposite angle at B = 80°. Now do yours."]);
  };
  const ALT = (m1, n1, k) => ({ p: k * m1 * m1, q: k * n1 * n1, h: k * m1 * n1 });
  const altitude = () => {
    let a, b; do { a = ri(1, 6); b = ri(1, 6); } while (a === b);
    const { p, q, h } = ALT(a, b, ri(1, 3)), t = ri(0, 2);
    if (t === 0) return Q(`The altitude to the hypotenuse of a right triangle splits the hypotenuse into pieces ${p} and ${q}. How long is the altitude?`, h,
      ["The altitude is the geometric mean of the two pieces of the hypotenuse.", "altitude² = (piece 1) × (piece 2). Multiply, then take the square root.", "Example: pieces 4 and 9. 4 × 9 = 36 and √36 = 6. Now do yours."]);
    if (t === 1) return Q(`In a right triangle the altitude to the hypotenuse is ${h}. One piece of the hypotenuse is ${p}. How long is the other piece?`, q,
      ["altitude² = (piece 1) × (piece 2).", "Square the altitude, then divide by the piece you know.", "Example: altitude 6, one piece 4. 36 ÷ 4 = 9. Now do yours."]);
    return Q(`The altitude to the hypotenuse of a right triangle is ${h} and it cuts the hypotenuse into pieces ${p} and ${q}. How long is the whole hypotenuse?`, p + q,
      ["The hypotenuse is made of the two pieces side by side.", "You do not need the altitude here, just combine the pieces.", "Example: pieces 4 and 9 make a hypotenuse of 13. Now do yours."]);
  };
  const STM = [
    ["an animal is a dog", "it is a mammal", "an animal is not a dog", "it is not a mammal"],
    ["a number is divisible by 6", "it is even", "a number is not divisible by 6", "it is not even"],
    ["a shape is a square", "it has four sides", "a shape is not a square", "it does not have four sides"],
    ["a number is a multiple of 10", "it ends in 0", "a number is not a multiple of 10", "it does not end in 0"],
    ["an angle is a right angle", "it measures 90°", "an angle is not a right angle", "it does not measure 90°"],
    ["two angles are vertical angles", "they are equal", "two angles are not vertical angles", "they are not equal"],
    ["a triangle is equilateral", "it is isosceles", "a triangle is not equilateral", "it is not isosceles"],
    ["a number is a multiple of 9", "it is a multiple of 3", "a number is not a multiple of 9", "it is not a multiple of 3"]
  ];
  const contra = () => {
    const [p, q, np, nq] = pick(STM), t = ri(0, 2);
    const s = (a, b) => `If ${a}, then ${b}.`;
    const orig = s(p, q), conv = s(q, p), inv = s(np, nq), con = s(nq, np), junk = s(nq, p);
    const names = ["converse", "inverse", "contrapositive"], want = names[t];
    const ans = [conv, inv, con][t];
    return C(`The statement is: "${orig}" Which one is its ${want}?`, ans, [conv, inv, con, junk].filter(x => x !== ans),
      [t === 0 ? "The converse flips the two parts around, nothing else changes." : t === 1 ? "The inverse keeps the order but says the opposite of each part." : "The contrapositive both flips the parts AND says the opposite of each.", "Check each choice: did the order change? Did each part get a 'not'?", "Example: 'If it is a cat, then it is an animal.' Converse: 'If it is an animal, then it is a cat.' Inverse: 'If it is not a cat, then it is not an animal.' Contrapositive: 'If it is not an animal, then it is not a cat.' Now do yours."]);
  };
  const geoProb = () => {
    const t = ri(0, 3);
    if (t === 0 || t === 1) {
      const T = 20 * ri(1, 6) + (ri(0, 1) ? 0 : 0), p = 5 * ri(2, 18), s = T * p / 100, un = t === 1;
      return Q(`A dartboard has an area of ${T} square cm. A shaded part has area ${s} square cm. A dart lands at random. What is the chance, in percent, that it lands ${un ? "OUTSIDE" : "INSIDE"} the shaded part?`, un ? 100 - p : p,
        ["Chance = favourite area ÷ total area, then change it to a percent.", un ? "First find the chance of hitting the shaded part, then take it away from 100." : "Divide the shaded area by the whole area, then multiply by 100.", "Example: board 50, shaded 10. 10 ÷ 50 = 0.2, which is 20%. Now do yours."]);
    }
    if (t === 2) { const a = pick([36, 72, 90, 108, 144, 180, 216, 252, 270, 288]); return Q(`A spinner is a circle. A shaded sector has a central angle of ${a}°. What is the chance, in percent, that the spinner lands on the shaded part?`, a * 100 / 360,
      ["The whole circle is 360°. Chance = sector angle ÷ 360.", "Divide the angle by 360, then multiply by 100 for a percent.", "Example: a 90° sector. 90 ÷ 360 = 1/4, which is 25%. Now do yours."]); }
    const P = pick([10, 20, 25, 40, 50]), w = ri(1, P - 1) * (P === 40 ? 1 : 1), ww = P === 40 ? 2 * ri(1, 19) : w;
    return Q(`A bus comes every ${P} minutes. You arrive at a random time. What is the chance, in percent, that you wait ${ww} minutes or less?`, ww * 100 / P,
      ["The bus time is a stretch of minutes. Good waiting times are part of that stretch.", `Chance = ${ww} ÷ ${P}, written as a percent.`, "Example: a bus every 20 minutes and a wait of 5 minutes or less. 5 ÷ 20 = 1/4, which is 25%. Now do yours."]);
  };
  const ident = () => {
    const [a, b, c] = pick(TR), sw = ri(0, 1), o = sw ? b : a, ad = sw ? a : b, t = ri(0, 2);
    const hs = ["Use the identity sin²θ + cos²θ = 1, or draw a right triangle and find the missing side.", "Build a right triangle with the ratio you know, get the missing side with Pythagoras, then read off the new ratio."];
    if (t === 0) return C(`θ is an acute angle and sin θ = ${o}/${c}. What is cos θ?`, `${ad}/${c}`, [`${c}/${ad}`, `${o}/${ad}`, `${ad}/${o}`, `${c - o}/${c}`], [...hs, "Example: sin θ = 3/5, so the sides are 3, 4, 5. cos θ is adjacent ÷ hypotenuse = 4/5. Now do yours."]);
    if (t === 1) return C(`θ is an acute angle and cos θ = ${ad}/${c}. What is sin θ?`, `${o}/${c}`, [`${c}/${o}`, `${ad}/${o}`, `${o}/${ad}`, `${c - ad}/${c}`], [...hs, "Example: cos θ = 12/13, so the sides are 5, 12, 13. sin θ is opposite ÷ hypotenuse = 5/13. Now do yours."]);
    return C(`θ is an acute angle and sin θ = ${o}/${c}. What is tan θ?`, `${o}/${ad}`, [`${ad}/${o}`, `${o}/${c}`, `${ad}/${c}`, `${c}/${ad}`], [...hs, "Example: sin θ = 3/5 gives sides 3, 4, 5. tan θ is opposite ÷ adjacent = 3/4. Now do yours."]);
  };
  const IT = [["sin", "1/2", 30], ["sin", "√2/2", 45], ["sin", "√3/2", 60], ["cos", "1/2", 60], ["cos", "√2/2", 45], ["cos", "√3/2", 30], ["tan", "1", 45], ["tan", "√3", 60], ["tan", "√3/3", 30]];
  const invTrig = () => {
    const [f, v, d] = pick(IT);
    return Q(`θ is an acute angle and ${f} θ = ${v}. What is θ in degrees?`, d,
      ["Think of the two special right triangles: the 45-45-90 and the 30-60-90.", f === "tan" ? "tan = opposite ÷ adjacent. Which special triangle has legs in this ratio?" : `${f === "sin" ? "sin = opposite ÷ hypotenuse" : "cos = adjacent ÷ hypotenuse"}. Which special triangle gives this ratio, and which angle is it?`, "Example: sin θ = 1/2 is a different question from tan θ = 1. For tan θ = 1 the legs are equal, which is the 45-45-90 triangle, so θ = 45°. Now do yours."]);
  };
  const RD = [[30, "π/6"], [45, "π/4"], [60, "π/3"], [90, "π/2"], [120, "2π/3"], [135, "3π/4"], [150, "5π/6"], [180, "π"], [210, "7π/6"], [225, "5π/4"], [240, "4π/3"], [270, "3π/2"], [300, "5π/3"], [315, "7π/4"], [330, "11π/6"], [360, "2π"]];
  const radians = () => {
    const [d, r] = pick(RD), others = RD.filter(x => x[0] !== d).map(x => x[1]);
    if (ri(0, 1) === 0) return C(`What is ${d}° in radians?`, r, shuf(others).slice(0, 4),
      ["A half turn is 180°, which is π radians.", "Multiply the degrees by π/180 and simplify the fraction.", "Example: 20° = 20π/180 = π/9. Now do yours."]);
    return Q(`How many degrees is ${r} radians?`, d,
      ["π radians is a half turn, which is 180°.", "Replace π with 180 and do the arithmetic.", "Example: π/9 radians = 180 ÷ 9 = 20°. Now do yours."]);
  };
  const arcRad = () => {
    const [k, d] = pick([[1, 3], [1, 2], [1, 4], [1, 6], [2, 3], [3, 4], [5, 6], [3, 2]]), ang = (k === 1 ? "π" : k + "π") + "/" + d;
    if (ri(0, 1) === 0) { const r = d * ri(1, 3); return Q(`A circle has radius ${r}. An arc has central angle ${ang} radians. The arc length is s = rθ. Give the number in front of π.`, r * k / d,
      ["With the angle in radians, arc length is just radius × angle.", "Multiply r by the fraction, and keep the π.", "Example: r = 6, angle π/3. s = 6 × π/3 = 2π. The number in front is 2. Now do yours."]); }
    const r = 2 * d * ri(1, 2); return Q(`A circle has radius ${r}. A sector has central angle ${ang} radians. Sector area is ½r²θ. Give the number in front of π.`, r * r * k / (2 * d),
      ["With the angle in radians, sector area = one half × r² × angle.", "Square r, multiply by the fraction of π, then halve.", "Example: r = 4, angle π/2. ½ × 16 × π/2 = 4π. The number in front is 4. Now do yours."]);
  };
  const T60 = [[3, 8, 7], [5, 8, 7], [7, 15, 13], [8, 15, 13], [5, 21, 19]], T120 = [[3, 5, 7], [7, 8, 13], [5, 16, 19]];
  const lawCos = () => {
    const w = ri(0, 1), k = ri(1, 2), [a, b, c] = pick(w ? T120 : T60).map(x => x * k), sw = ri(0, 1);
    return Q(`In a triangle two sides are ${sw ? b : a} and ${sw ? a : b}, and the angle between them is ${w ? 120 : 60}°. How long is the third side?`, c,
      ["Use the Law of Cosines: c² = a² + b² − 2ab·cos C.", `For this angle, cos = ${w ? "−1/2" : "1/2"}. Work out c², then take the square root.`, "Example: sides 5 and 8 with a 60° angle. c² = 25 + 64 − 40 = 49, so c = 7. Now do yours."]);
  };
  const HER = [[3, 4, 5], [5, 5, 6], [13, 14, 15], [13, 13, 10], [9, 10, 17], [7, 15, 20], [10, 10, 12], [8, 15, 17], [6, 25, 29], [17, 25, 26]];
  const heron = () => {
    const [a, b, c] = pick(HER), s = (a + b + c) / 2, A = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    if (ri(0, 2) === 0) return Q(`A triangle has sides ${a}, ${b} and ${c}. What is its semi-perimeter s (half the perimeter)?`, s,
      ["Add the three sides to get the perimeter.", "Then take half of it.", "Example: sides 4, 6, 8 have perimeter 18, so s = 9. Now do yours."]);
    return Q(`Use Heron's formula to find the area of a triangle with sides ${a}, ${b} and ${c}.`, A,
      ["Heron's formula: Area = √( s(s − a)(s − b)(s − c) ), where s is half the perimeter.", "First find s. Then find each s − side and multiply everything under the root.", "Example: sides 3, 4, 5. s = 6. 6 × 3 × 2 × 1 = 36 and √36 = 6. Now do yours."]);
  };

  const l22 = [
    L("Volume of pyramids", pyr, [S("One third of a box", "🔺", "A pyramid is exactly <b>one third</b> of the prism with the same base and height."), S("The formula", "V = ⅓ × B × h", "B is the <b>base area</b>, h is the height straight up."), S("Example", "6 × 5 × 9 ÷ 3", "= 90. Find the base area, multiply by the height, divide by 3.")]),
    L("Surface area of cylinders", cylSA, [S("Unroll it", "🥫", "A cylinder has two circles (top and bottom) and one curved side that unrolls into a rectangle."), S("Formulas", "ends 2πr², side 2πrh", "Total = 2πr² + 2πrh = 2πr(r + h)."), S("Example", "r = 3, h = 4", "2π(9) + 2π(12) = 42π.")]),
    L("Spheres in terms of π", sphere, [S("Sphere formulas", "⚽", "Surface area = 4πr². Volume = (4/3)πr³."), S("Leave π alone", "36π", "Answers are often left 'in terms of π', like 36π, so you only compute the number in front."), S("Hemisphere", "half a sphere", "A hemisphere has half the volume: (2/3)πr³.")]),
    L("Euler's formula for solids", euler, [S("Count the parts", "🧊", "A solid has <b>vertices</b> (corners), <b>edges</b> (lines) and <b>faces</b> (flat sides)."), S("Euler's rule", "V − E + F = 2", "It works for every simple solid with flat faces."), S("Example", "cube: 8 − 12 + 6", "= 2 ✓. Use the rule to find a missing count.")]),
    L("Scale factors and area", areaRatio, [S("Similar shapes", "🔍", "Similar shapes have the same form. Every length is multiplied by the same <b>scale factor</b> k."), S("Areas square it", "area × k²", "Area is two-dimensional, so it grows by k × k."), S("Example", "k = 3", "A shape with area 5 becomes 5 × 9 = 45. Perimeter only grows by k.")]),
    L("Scale factors and volume", solids, [S("Three directions", "📦", "Volume has length, width and height, so it grows by <b>k × k × k = k³</b>."), S("Compare", "length ×k, area ×k², volume ×k³", "Each kind of measure uses the scale factor a different number of times."), S("Example", "k = 2", "A cube with volume 3 becomes 3 × 8 = 24.")]),
    L("Midpoints and dividing a segment", midpoint, [S("Average the points", "(x₁ + x₂)/2", "The midpoint's x is the average of the x's. Same for y."), S("Example", "(2, 4) and (8, 10)", "Midpoint = (5, 7)."), S("Going backwards", "B = 2M − A", "If you know the midpoint and one end, double the midpoint and subtract the end you know.")]),
    L("Triangle centers: the centroid", centroid, [S("Medians", "📐", "A <b>median</b> goes from a vertex to the middle of the opposite side. The three medians meet at the <b>centroid</b>."), S("Average the vertices", "((x₁ + x₂ + x₃)/3, …)", "The centroid's coordinates are the averages of the vertices."), S("2 : 1 rule", "⅔ + ⅓", "The centroid cuts each median so the part by the vertex is twice as long as the other part.")]),
    L("Cyclic quadrilaterals", cyclic, [S("Corners on a circle", "⭕", "If all four vertices of a quadrilateral lie on a circle, it is <b>cyclic</b>."), S("Opposite angles", "A + C = 180°", "Opposite angles add to 180°. So do B + D."), S("Use it", "2x + 10 and x + 20", "Set the sum equal to 180 and solve for x.")]),
    L("Right triangle altitude", altitude, [S("Drop the altitude", "📏", "In a right triangle, draw a line from the right angle straight down to the hypotenuse. It makes two smaller triangles like the big one."), S("Geometric mean", "h² = p × q", "The altitude squared equals the product of the two pieces of the hypotenuse."), S("Example", "p = 4, q = 9", "h² = 36, so h = 6.")]),
    L("If-then statements", contra, [S("Parts of a statement", "If P, then Q", "P is the <b>hypothesis</b>, Q is the <b>conclusion</b>."), S("Three relatives", "converse · inverse · contrapositive", "Converse: flip (If Q, then P). Inverse: negate both. Contrapositive: flip AND negate."), S("Which is always true?", "statement ⇔ contrapositive", "A true statement and its contrapositive always say the same thing. The converse and inverse might be false.")]),
    L("Geometric probability", geoProb, [S("Area as chance", "🎯", "If a dart lands at random, the chance of hitting a region is its share of the whole area."), S("The formula", "region ÷ whole", "Divide, then multiply by 100 to make a percent."), S("Other shapes", "angle ÷ 360 or time ÷ total", "Spinners use angles. Waiting times use minutes.")]),
    L("The Pythagorean identity", ident, [S("Always true", "sin²θ + cos²θ = 1", "This works for every angle. It comes from the Pythagorean theorem."), S("Use a triangle", "3 – 4 – 5", "If sin θ = 3/5, the opposite side is 3 and the hypotenuse is 5. The adjacent side is 4."), S("Read off", "cos = 4/5, tan = 3/4", "Pick the sides you need for each ratio.")]),
    L("Inverse trig with special angles", invTrig, [S("Going backwards", "sin θ = 1/2", "Instead of finding a ratio from an angle, find the angle from the ratio."), S("Special values", "30°, 45°, 60°", "sin: 1/2, √2/2, √3/2 · cos: √3/2, √2/2, 1/2 · tan: √3/3, 1, √3."), S("Tip", "sin and cos mirror each other", "sin 30° = cos 60°. Learn the table and find your ratio in it.")]),
    L("Radians", radians, [S("A new unit", "π radians = 180°", "A radian measures an angle by the length of the arc on a circle of radius 1."), S("Convert", "× π/180 or × 180/π", "Degrees to radians: multiply by π/180. Radians to degrees: multiply by 180/π."), S("Landmarks", "π/2 = 90°, π/3 = 60°", "Also π/4 = 45° and π/6 = 30°.")]),
    L("Arc length and sectors in radians", arcRad, [S("Easy arc length", "s = rθ", "When the angle θ is in radians, the arc length is simply radius × angle."), S("Sector area", "A = ½r²θ", "Again the angle must be in radians."), S("Example", "r = 6, θ = π/3", "s = 2π and A = ½ × 36 × π/3 = 6π.")]),
    L("Law of Cosines", lawCos, [S("When Pythagoras is not enough", "c² = a² + b² − 2ab cos C", "Use it for any triangle where you know two sides and the angle between them."), S("Special angles", "cos 60° = ½, cos 120° = −½", "At 90° the last term vanishes and you get the Pythagorean theorem back."), S("Example", "5, 8 and 60°", "c² = 25 + 64 − 40 = 49, so c = 7.")]),
    L("Heron's formula", heron, [S("Area from three sides", "△", "You do not need the height. Just the three sides."), S("Formula", "A = √( s(s−a)(s−b)(s−c) )", "Here s is the semi-perimeter, half of a + b + c."), S("Example", "3, 4, 5", "s = 6, so A = √(6 × 3 × 2 × 1) = 6.")])
  ];
  l22.push(mixOf("Mixed practice", [l22[0], l22[3], l22[4], l22[6], l22[9], l22[11], l22[12], l22[14]]));
  l22.push(mixOf("Level 22 Challenge", [l22[1], l22[2], l22[5], l22[7], l22[8], l22[10], l22[13], l22[15], l22[16], l22[17]]));

  // ================= LEVEL 23 =================
  const cx = (re, im) => {
    if (im === 0) return String(re);
    const ab = Math.abs(im), body = (ab === 1 ? "" : ab) + "i";
    return re === 0 ? (im < 0 ? "-" : "") + body : `${re} ${im < 0 ? "-" : "+"} ${body}`;
  };
  const IP = ["1", "i", "-1", "-i"];
  const iPow = () => {
    const t = ri(0, 2);
    const hs = ["The powers of i repeat in a cycle of 4: i, −1, −i, 1, then again.", "Divide the exponent by 4 and look only at the remainder. A remainder of 0 behaves like the 4th power."];
    if (t === 0) { const n = ri(5, 99); return C(`Simplify i${sup(n)}.`, IP[n % 4], IP, [...hs, "Example: i¹⁰. 10 ÷ 4 leaves 2, and i² = −1, so i¹⁰ = −1. Now do yours."]); }
    if (t === 1) { const a = ri(2, 30), b = ri(2, 30), e = a + b; return C(`Simplify i${sup(a)} · i${sup(b)}.`, IP[e % 4], IP, ["Multiplying powers with the same base: add the exponents.", "Add the exponents, then use the cycle of 4 on the total.", "Example: i⁵ · i⁶ = i¹¹. 11 ÷ 4 leaves 3, and i³ = −i. Now do yours."]); }
    const n = ri(3, 40); return C(`Simplify (i${sup(n)})².`, n % 2 ? "-1" : "1", n % 2 ? ["1", "i", "-i"] : ["-1", "i", "-i"], ["Squaring doubles the exponent, so you get i to the power 2n.", "i² = −1. Is the exponent a multiple of 4, or only of 2?", "Example: (i³)² = i⁶ = i² = −1, while (i⁴)² = i⁸ = 1. Now do yours."]);
  };
  const cplxArith = () => {
    const a = ri(1, 7), b = ri(1, 7), c = ri(1, 7), d = ri(1, 7), t = ri(0, 2);
    if (t === 0) return C(`Add: (${a} + ${b}i) + (${c} + ${d}i)`, cx(a + c, b + d), [cx(a + c, b - d), cx(a - c, b + d), cx(a + d, b + c), cx(a * c, b * d)],
      ["Add the real parts together and the i parts together.", "Real + real, imaginary + imaginary.", "Example: (2 + 3i) + (4 + 5i) = 6 + 8i. Now do yours."]);
    if (t === 1) return C(`Multiply: (${a} + ${b}i)(${c} + ${d}i)`, cx(a * c - b * d, a * d + b * c), [cx(a * c + b * d, a * d + b * c), cx(a * c - b * d, a * d - b * c), cx(a * c, b * d), cx(a * c + b * d, a * d - b * c)],
      ["Expand like FOIL. Remember i² = −1.", "The i·i term becomes −1 times its number, so it moves into the real part with the opposite sign.", "Example: (1 + 2i)(3 + i) = 3 + i + 6i + 2i² = 3 + 7i − 2 = 1 + 7i. Now do yours."]);
    return C(`What is the complex conjugate of ${cx(a, b)}?`, cx(a, -b), [cx(-a, b), cx(-a, -b), cx(b, a)],
      ["The conjugate keeps the real part exactly the same.", "Only the sign of the imaginary part flips.", "Example: the conjugate of 3 + 4i is 3 − 4i. Now do yours."]);
  };
  const cplxMag = () => {
    const [a, b, c] = pick(TR), k = ri(1, 3), t = ri(0, 2);
    if (t === 0) return Q(`Find the magnitude |${k * a} + ${k * b}i|.`, k * c,
      ["The magnitude is the distance from the origin to the point, found with the Pythagorean theorem.", "Square both parts, add them, and take the square root.", "Example: |3 + 4i| = √(9 + 16) = √25 = 5. Now do yours."]);
    if (t === 1) { const p = ri(1, 9), q = ri(1, 9); return Q(`Multiply (${p} + ${q}i)(${p} − ${q}i).`, p * p + q * q,
      ["A number times its conjugate has no imaginary part left.", "It equals (real part)² + (imaginary part)².", "Example: (2 + 5i)(2 − 5i) = 4 + 25 = 29. Now do yours."]); }
    return Q(`A point in the complex plane is ${k * a} + ${k * b}i. How far is it from the origin?`, k * c,
      ["Treat the real part as the horizontal leg and the imaginary part as the vertical leg.", "The distance is the hypotenuse of that right triangle.", "Example: 6 + 8i is 10 away, because 36 + 64 = 100. Now do yours with different numbers."]);
  };
  const remThm = () => {
    const d = ri(2, 3), cs = Array.from({ length: d + 1 }, (_, i) => i === 0 ? pick([1, 1, 2]) : ri(-5, 6)), a = nz(-3, 3);
    return N(`What is the remainder when ${polyS(cs)} is divided by (x ${a > 0 ? "−" : "+"} ${Math.abs(a)})?`, evalP(cs, a),
      ["The Remainder Theorem: the remainder when dividing by (x − a) is the value P(a).", `You do not need long division. Put x = ${a} into the polynomial.`, "Example: x² + 3x − 1 divided by (x − 2): P(2) = 4 + 6 − 1 = 9. Now do yours."]);
  };
  const factThm = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 6), r = nz(-6, 6), c = a * r; return N(`For what value of k is (x − ${a}) a factor of x² + kx ${c < 0 ? "−" : "+"} ${Math.abs(c)}?`, -(a + r),
      ["If (x − a) is a factor, then P(a) = 0.", `Put x = ${a} in, set the result equal to 0, and solve for k.`, "Example: (x − 2) a factor of x² + kx − 8: 4 + 2k − 8 = 0, so k = 2. Now do yours."], { step: 1 }); }
    if (t === 1) {
      const rs = [nz(-3, 4), nz(-3, 4), nz(-3, 4)], cs = mulP(mulP([1, -rs[0]], [1, -rs[1]]), [1, -rs[2]]);
      const yes = ri(0, 1) === 0; let a = yes ? pick(rs) : nz(-4, 5); if (!yes) while (rs.includes(a)) a = nz(-4, 5) + (rs.includes(a) ? 7 : 0);
      const isF = evalP(cs, a) === 0;
      return C(`Is (x ${a > 0 ? "−" : "+"} ${Math.abs(a)}) a factor of ${polyS(cs)}?`, isF ? "Yes" : "No", [isF ? "No" : "Yes"],
        ["(x − a) is a factor exactly when P(a) = 0.", `Test x = ${a} in the polynomial. Is the result zero?`, "Example: is (x − 1) a factor of x² + 2x − 3? P(1) = 1 + 2 − 3 = 0, so yes. Now do yours."]);
    }
    const a = ri(2, 9);
    return C(`P(${a}) = 0 for a polynomial P. Which of these must be a factor of P(x)?`, `x - ${a}`, [`x + ${a}`, `x - ${a * a}`, `${a}x - 1`],
      ["The Factor Theorem links a zero of P to a factor.", "A zero at x = a gives a factor with a minus sign in front of the number.", "Example: P(5) = 0 means (x − 5) is a factor. Now do yours."]);
  };
  const vieta = () => {
    const r = ri(1, 9), s = ri(1, 9), t = ri(0, 3), b = -(r + s), c = r * s;
    const eq = `x² ${b < 0 ? "−" : "+"} ${Math.abs(b)}x + ${c} = 0`;
    if (t === 0) return Q(`What is the sum of the roots of ${eq}?`, r + s,
      ["For x² + bx + c = 0, the roots add up to −b.", "Read off b, then change its sign.", "Example: x² − 9x + 20 = 0 has roots adding to 9. Now do yours."]);
    if (t === 1) return Q(`What is the product of the roots of ${eq}?`, c,
      ["For x² + bx + c = 0, the roots multiply to c.", "The constant term is the answer.", "Example: x² − 9x + 20 = 0 has roots that multiply to 20. Now do yours."]);
    if (t === 2) return Q(`Two numbers add to ${r + s} and multiply to ${c}. What is the larger one?`, Math.max(r, s),
      ["These two numbers are the roots of x² − (sum)x + (product) = 0.", "Look for two numbers with that product that also add to that sum.", "Example: sum 9, product 20. Try 4 and 5: 4 × 5 = 20 and 4 + 5 = 9. The larger is 5. Now do yours."]);
    const a = pick([2, 3]); return Q(`The quadratic ${a}x² ${b * a < 0 ? "−" : "+"} ${Math.abs(b * a)}x + ${c * a} = 0 has two roots. What is their sum?`, r + s,
      ["For ax² + bx + c = 0 the sum of the roots is −b ÷ a.", "Change the sign of b, then divide by a.", "Example: 2x² − 14x + 20 = 0: sum = 14 ÷ 2 = 7. Now do yours."]);
  };
  const ENDS = ["Both ends point up", "Both ends point down", "Left end down, right end up", "Left end up, right end down"];
  const endBeh = () => {
    const d = ri(2, 7), lead = nz(-5, 5), cs = [lead, ...Array.from({ length: d }, () => ri(-6, 6))];
    const idx = d % 2 === 0 ? (lead > 0 ? 0 : 1) : (lead > 0 ? 2 : 3);
    return C(`What happens to the two ends of the graph of y = ${polyS(cs)}?`, ENDS[idx], ENDS.filter((_, i) => i !== idx),
      ["Only the term with the highest power matters far from the origin.", "Is that power even or odd? Is its coefficient positive or negative?", "Example: y = −x³ + 5: odd power and negative coefficient, so the left side goes up and the right goes down. Now do yours."]);
  };
  const turn = () => {
    const n = ri(3, 9), t = ri(0, 2);
    if (t === 0) return Q(`What is the greatest number of turning points a degree-${n} polynomial can have?`, n - 1,
      ["A turning point is a place where the graph switches between going up and going down.", "The most is one less than the degree.", "Example: a degree-4 polynomial can have at most 3 turning points. Now do yours."]);
    if (t === 1) return Q(`What is the greatest number of real roots a degree-${n} polynomial can have?`, n,
      ["A polynomial can never have more roots than its degree.", "The number of roots is at most the degree.", "Example: a degree-5 polynomial has at most 5 real roots. Now do yours."]);
    return Q(`A polynomial graph has ${n} turning points. What is the smallest degree it could have?`, n + 1,
      ["Turning points are at most one less than the degree.", "So the degree must be at least one more than the number of turning points.", "Example: 3 turning points means the degree is at least 4. Now do yours."]);
  };
  const MAXK = { 2: 8, 3: 5, 4: 4, 5: 4, 10: 4 };
  const logDef = () => {
    const b = pick([2, 3, 4, 5, 10]), k = ri(1, MAXK[b]), t = ri(0, 2);
    if (t === 0) return Q(`Evaluate log${sub(b)} ${b ** k}.`, k,
      ["log with a base asks: what power of the base gives the number?", `Ask yourself: ${b} to what power is ${b ** k}?`, "Example: log₃ 27 = 3, because 3³ = 27. Now do yours."]);
    if (t === 1) return Q(`Find the exponent: ${b}^? = ${b ** k}`, k,
      ["Multiply the base by itself until you reach the number.", "Count how many times the base is used.", "Example: 2^? = 16. 2 × 2 × 2 × 2 = 16, so the exponent is 4. Now do yours."]);
    return Q(`Evaluate log${sub(b)} 1 + log${sub(b)} ${b}.`, 1,
      ["Any base to the power 0 equals 1. And any base to the power 1 equals itself.", "Work out each log separately, then add.", "Example: log₅ 1 + log₅ 5 = 0 + 1 = 1. Now do yours with your base."]);
  };
  const logRule = () => {
    const b = pick([2, 3, 5, 10]), i = ri(1, 4), j = ri(1, 3), t = ri(0, 3);
    if (t === 0) return Q(`Evaluate log${sub(b)} ${b ** i} + log${sub(b)} ${b ** j}.`, i + j,
      ["Work out each log on its own using what power of the base gives the number.", "Then add the two answers.", "Example: log₂ 8 + log₂ 4 = 3 + 2 = 5. Now do yours."]);
    if (t === 1) return Q(`Evaluate log${sub(b)} ${b ** (i + j)} − log${sub(b)} ${b ** j}.`, i,
      ["Work out each log on its own using what power of the base gives the number.", "Then subtract the second answer from the first.", "Example: log₂ 32 − log₂ 4 = 5 − 2 = 3. Now do yours."]);
    if (t === 2) { const n = ri(2, 3); return Q(`Evaluate log${sub(b)} (${b ** j})${sup(n)}.`, n * j,
      ["Bring the power in front: log (x^n) = n · log x.", `First find log${sub(b)} of the number in the bracket, then multiply by the outside power.`, "Example: log₂ (4)³ = 3 × log₂ 4 = 3 × 2 = 6. Now do yours."]); }
    const k = ri(0, 2), want = ["MN", "M/N", "M^p"][k], opts = [`log${sub("b")} M + log${sub("b")} N`, `log${sub("b")} M − log${sub("b")} N`, `p · log${sub("b")} M`];
    return C(`Which equals log${sub("b")} (${want})?`, opts[k], opts.filter((_, i) => i !== k).concat([`log${sub("b")} M · log${sub("b")} N`]),
      ["Think of the exponent rules: b^m · b^n and b^m ÷ b^n and (b^m)^p. Logs are exponents.", "Match the operation inside the log with the matching exponent rule.", "Example: log₂ (8 · 4) = log₂ 8 + log₂ 4 = 3 + 2 = 5, which is log₂ 32. Now do yours."]);
  };
  const expLog = () => {
    const b = pick([2, 3, 4, 5, 10]), k = ri(2, Math.min(4, MAXK[b])), v = b ** k;
    if (ri(0, 1) === 0) return C(`Write ${b}${sup(k)} = ${v} as a logarithm.`, `log${sub(b)} ${v} = ${k}`, [`log${sub(k)} ${v} = ${b}`, `log${sub(v)} ${b} = ${k}`, `log${sub(b)} ${k} = ${v}`],
      ["The base of the power becomes the small number under 'log'.", "The exponent is what the log equals.", "Example: 2⁵ = 32 becomes log₂ 32 = 5. Now do yours."]);
    return C(`Write log${sub(b)} ${v} = ${k} in exponent form.`, `${b}${sup(k)} = ${v}`, [`${k}${sup(b)} = ${v}`, `${v}${sup(k)} = ${b}`, `${b}${sup(v)} = ${k}`],
      ["The small number under 'log' is the base of the power.", "The number the log equals is the exponent.", "Example: log₃ 81 = 4 becomes 3⁴ = 81. Now do yours."]);
  };
  const expEq = () => {
    const b = pick([2, 3, 4, 5, 10]), k = ri(2, MAXK[b]), c = ri(1, 3), t = ri(0, 3);
    if (t === 0) return Q(`Solve: ${b}^x = ${b ** k}`, k,
      ["Write the right side as a power of the same base.", "Then the exponents must match.", "Example: 3^x = 81. Since 81 = 3⁴, x = 4. Now do yours."]);
    if (t === 1) return Q(`Solve: ${b}^(x + ${c}) = ${b ** (k + c)}`, k,
      ["Write the right side as a power of the same base.", `Set the exponents equal: x + ${c} = (the exponent you found).`, "Example: 2^(x + 1) = 32. 32 = 2⁵, so x + 1 = 5, x = 4. Now do yours."]);
    if (t === 2) return Q(`Solve: ${b}^(2x) = ${b ** (2 * k)}`, k,
      ["Write the right side as a power of the same base.", "Set 2x equal to that exponent, then divide by 2.", "Example: 3^(2x) = 81. 81 = 3⁴, so 2x = 4, x = 2. Now do yours."]);
    return Q(`Solve: ${b}^(x − ${c}) = ${b ** k}`, k + c,
      ["Write the right side as a power of the same base.", `Set x − ${c} equal to that exponent.`, "Example: 5^(x − 1) = 25. 25 = 5², so x − 1 = 2, x = 3. Now do yours."]);
  };
  const logEq = () => {
    const t = ri(0, 3);
    if (t === 0) { const b = pick([2, 3, 4, 5, 10]), k = ri(1, Math.min(4, MAXK[b])); return Q(`Solve: log${sub(b)} x = ${k}`, b ** k,
      ["Turn the log into an exponent: the base raised to the answer equals x.", "x = (base) to the power (number on the right).", "Example: log₃ x = 2 means x = 3² = 9. Now do yours."]); }
    if (t === 1) { const b = pick([2, 3, 5]), k = ri(2, 4), c = ri(1, 3); return Q(`Solve: log${sub(b)} (x + ${c}) = ${k}`, b ** k - c,
      ["Turn the log into an exponent first: the base raised to the right side equals what is inside.", `Then subtract ${c} from both sides.`, "Example: log₂ (x + 1) = 3. So x + 1 = 8 and x = 7. Now do yours."]); }
    if (t === 2) { const b = pick([2, 4, 10]), k = ri(1, 3); return Q(`Solve: log${sub(b)} (2x) = ${k}`, b ** k / 2,
      ["Turn the log into an exponent first: the base raised to the right side equals 2x.", "Then divide by 2.", "Example: log₂ (2x) = 4. So 2x = 16 and x = 8. Now do yours."]); }
    const b = pick([2, 3, 5]), k = ri(2, 3), c = ri(1, 5); return Q(`Solve: log${sub(b)} (x − ${c}) = ${k}`, b ** k + c,
      ["Turn the log into an exponent first: the base raised to the right side equals what is inside.", `Then add ${c} to both sides.`, "Example: log₃ (x − 2) = 2. So x − 2 = 9 and x = 11. Now do yours."]);
  };
  const invFn = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(2, 6), b = ri(-5, 8), x = ri(1, 9), y = a * x + b; return Q(`f(x) = ${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)}. Find f⁻¹(${y}).`, x,
      ["f⁻¹(y) asks: which input x makes f(x) equal that y?", `Solve ${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${y} for x.`, "Example: f(x) = 3x + 2, find f⁻¹(11). 3x + 2 = 11, so x = 3. Now do yours."]); }
    if (t === 1) { const b = ri(1, 6), y = ri(b + 1, b + 8); return Q(`f(x) = x/2 + ${b}. Find f⁻¹(${y}).`, 2 * (y - b),
      ["f⁻¹(y) asks: which input x makes f(x) equal that y?", `Solve x/2 + ${b} = ${y}. Undo the +${b} first, then the ÷2.`, "Example: f(x) = x/2 + 1, find f⁻¹(4). x/2 = 3, so x = 6. Now do yours."]); }
    const a = ri(2, 5), b = ri(1, 8);
    return C(`Find the inverse of f(x) = ${a}x − ${b}.`, `f⁻¹(x) = (x + ${b})/${a}`, [`f⁻¹(x) = (x − ${b})/${a}`, `f⁻¹(x) = ${a}x + ${b}`, `f⁻¹(x) = x/${a} − ${b}`],
      ["To undo f, reverse its steps in the opposite order.", "f multiplies then subtracts, so the inverse adds first and then divides.", "Example: f(x) = 3x − 2 has inverse (x + 2)/3. Now do yours."]);
  };
  const piece = () => {
    const a = ri(2, 4), b = ri(1, 6), c = ri(2, 5), e = ri(1, 5), t = ri(0, 1), x0 = t ? ri(c, c + 4) : ri(0, c - 1);
    const val = t ? x0 * x0 - e : a * x0 + b;
    return N(`f(x) = ${a}x + ${b} if x &lt; ${c}<br>f(x) = x² − ${e} if x ≥ ${c}<br>Find f(${x0}).`, val,
      ["First decide which rule applies: compare the input with the cut-off number.", `Is ${x0} less than ${c}, or at least ${c}? Use only that line.`, "Example: f(x) = x + 1 if x < 3, and 2x if x ≥ 3. For f(5), 5 ≥ 3 so use 2x, which gives 10. Now do yours."]);
  };
  const transf = () => {
    const h = ri(2, 6), k = ri(2, 6), n = ri(2, 4);
    const bank = [[`f(x − ${h})`, `Shifted right ${h}`], [`f(x + ${h})`, `Shifted left ${h}`], [`f(x) + ${k}`, `Shifted up ${k}`], [`f(x) − ${k}`, `Shifted down ${k}`],
      ["−f(x)", "Flipped over the x-axis"], ["f(−x)", "Flipped over the y-axis"], [`${n}f(x)`, `Stretched vertically by ${n}`], [`f(${n}x)`, `Squeezed horizontally by ${n}`],
      [`f(x − ${h}) + ${k}`, `Right ${h} and up ${k}`], [`f(x + ${h}) − ${k}`, `Left ${h} and down ${k}`]];
    const [fx, ans] = pick(bank);
    return C(`How does the graph of g(x) = ${fx} compare with the graph of f(x)?`, ans, bank.map(b => b[1]).filter(x => x !== ans),
      ["Changes inside the brackets work sideways, and they act the opposite way you might expect. Changes outside the brackets work up and down.", "A minus sign on the whole function or on x means a flip. A number multiplying means a stretch or squeeze.", "Example: g(x) = f(x − 2) + 3 moves right 2 (inside, opposite) and up 3 (outside). Now do yours."]);
  };
  const radEq = () => {
    const t = ri(0, 2);
    if (t === 0) { const b = ri(3, 9), a = ri(1, b * b - 1); return Q(`Solve: √(x + ${a}) = ${b}`, b * b - a,
      ["Square both sides to remove the square root.", `After squaring, the right side is ${b} × ${b}. Then subtract ${a}.`, "Example: √(x + 2) = 5. Square: x + 2 = 25, so x = 23. Now do yours."]); }
    if (t === 1) { const r = ri(2, 9), a = r % 2 ? 1 : 2, x = (r * r + a) / 2; return Q(`Solve: √(2x − ${a}) = ${r}`, x,
      ["Square both sides to remove the square root.", `Then solve 2x − ${a} = (the squared number): add ${a}, then divide by 2.`, "Example: √(2x − 1) = 3. Square: 2x − 1 = 9, x = 5. Now do yours."]); }
    const a = ri(1, 6), b = a + ri(2, 7); return Q(`Solve: √x + ${a} = ${b}`, (b - a) ** 2,
      ["Get the square root alone first.", `Subtract ${a} from both sides, then square both sides.`, "Example: √x + 2 = 7. √x = 5, so x = 25. Now do yours."]);
  };
  const ratEq = () => {
    const t = ri(0, 2);
    if (t === 0) { const b = ri(2, 7), c = ri(2, 9), k = ri(1, 5); return Q(`Solve: ${b * k}/x = ${b}/${c}`, c * k,
      ["Cross-multiply to get rid of the fractions.", "Multiply each top by the other bottom and set them equal.", "Example: 6/x = 2/5. Cross-multiply: 2x = 30, so x = 15. Now do yours."]); }
    if (t === 1) { const x = ri(2, 9), k = ri(1, 6), a = x * k, b = ri(1, 5); return Q(`Solve: ${a}/x + ${b} = ${k + b}`, x,
      ["Get the fraction alone first.", `Subtract ${b} from both sides, then solve (number)/x = (smaller number).`, "Example: 12/x + 1 = 5. 12/x = 4, so x = 3. Now do yours."]); }
    const d = ri(2, 6), a = ri(1, 9), c0 = Math.ceil((a + 1) / d), c = ri(c0, c0 + 6);
    return Q(`Solve: (x + ${a})/${d} = ${c}`, c * d - a, ["Multiply both sides by the bottom number.", `That gives x + ${a} = (something). Subtract ${a}.`, "Example: (x + 3)/4 = 5. x + 3 = 20, so x = 17. Now do yours."]);
  };
  const l23 = [
    L("Powers of i", iPow, [S("A new number", "i² = −1", "The number <b>i</b> is defined so that i × i = −1."), S("The cycle", "i, −1, −i, 1", "i¹ = i, i² = −1, i³ = −i, i⁴ = 1, and then it repeats."), S("Shortcut", "exponent ÷ 4", "Only the remainder matters. i⁷: 7 ÷ 4 leaves 3, so i⁷ = i³ = −i.")]),
    L("Complex number arithmetic", cplxArith, [S("Complex numbers", "a + bi", "They have a real part a and an imaginary part b."), S("Add and multiply", "real with real, i with i", "Adding is easy. For multiplying, use FOIL and swap i² for −1."), S("Conjugate", "a + bi ↔ a − bi", "Flip only the sign of the imaginary part.")]),
    L("Magnitude of a complex number", cplxMag, [S("The complex plane", "📍", "Draw a + bi as the point (a, b). Real is across, imaginary is up."), S("Distance from the origin", "|a + bi| = √(a² + b²)", "It is the Pythagorean theorem again."), S("Conjugate trick", "(a + bi)(a − bi) = a² + b²", "The answer has no i left.")]),
    L("The Remainder Theorem", remThm, [S("Skip the long division", "⚡", "To find the remainder when P(x) is divided by (x − a), just work out P(a)."), S("Example", "P(x) = x² + 3x − 1", "Divide by (x − 2): P(2) = 4 + 6 − 1 = 9."), S("Careful with signs", "(x + 3) means a = −3", "(x + 3) is (x − (−3)), so use x = −3.")]),
    L("The Factor Theorem", factThm, [S("Zero means factor", "P(a) = 0", "If P(a) = 0 then (x − a) is a factor of P(x), and the other way too."), S("Example", "x² − 5x + 6", "At x = 2: 4 − 10 + 6 = 0, so (x − 2) is a factor."), S("Find a missing number", "k", "Put in the zero, set P(a) = 0, and solve for k.")]),
    L("Sum and product of roots", vieta, [S("Roots tell a story", "x² + bx + c = 0", "If the roots are r and s, then the equation is (x − r)(x − s) = 0."), S("Two shortcuts", "r + s = −b, rs = c", "Sum is minus the middle number, product is the last number."), S("When a is not 1", "sum = −b/a", "For ax² + bx + c the sum is −b/a and the product is c/a.")]),
    L("End behavior of polynomials", endBeh, [S("Look far away", "↗ ↘", "Far from the origin, the highest-power term wins."), S("Even degree", "x², x⁴, …", "Both ends go the same way: up if the leading coefficient is positive, down if negative."), S("Odd degree", "x³, x⁵, …", "The ends go opposite ways. Positive leading coefficient: down on the left, up on the right.")]),
    L("Degree, roots and turning points", turn, [S("Degree = biggest power", "x⁵ → degree 5", "The degree controls how wiggly a graph can be."), S("Roots", "at most n", "A degree-n polynomial has at most n real roots."), S("Turning points", "at most n − 1", "A turn is where the graph switches direction. A degree-4 graph turns at most 3 times.")]),
    L("Logarithms", logDef, [S("Undo a power", "log₂ 8 = 3", "A logarithm asks: what exponent do I need? 2 to the power 3 gives 8."), S("Read it", "log_b x", "'Log base b of x' means the power you put on b to get x."), S("Two facts", "log 1 = 0, log_b b = 1", "Because b⁰ = 1 and b¹ = b.")]),
    L("Rules of logarithms", logRule, [S("Product rule", "log MN = log M + log N", "Multiplying inside becomes adding outside."), S("Quotient rule", "log M/N = log M − log N", "Dividing inside becomes subtracting."), S("Power rule", "log Mᵖ = p · log M", "The exponent jumps down in front.")]),
    L("Exponents and logs: two ways to write", expLog, [S("Same fact", "2⁵ = 32 ⇔ log₂ 32 = 5", "Both say that 2 to the 5th power makes 32."), S("The base stays the base", "base ↔ small number", "In the power, the base is the big number. In the log, it is the small number under 'log'."), S("Tip", "log equals the exponent", "The answer of a log is always an exponent.")]),
    L("Solving exponential equations", expEq, [S("Match the bases", "3^x = 81", "Write both sides as powers of the same base: 81 = 3⁴."), S("Match the exponents", "x = 4", "If the bases are the same, the exponents must be equal."), S("Harder ones", "2^(x+1) = 32", "32 = 2⁵ so x + 1 = 5. Then solve the little equation.")]),
    L("Solving logarithmic equations", logEq, [S("Turn it into a power", "log₂ x = 5", "That means x = 2⁵ = 32."), S("Inside the log", "log₃ (x + 1) = 2", "That means x + 1 = 3² = 9, so x = 8."), S("Always check", "inside must be positive", "You cannot take the log of zero or a negative number.")]),
    L("Inverse functions", invFn, [S("Undo it", "f⁻¹", "The inverse function reverses what f does: if f(3) = 11 then f⁻¹(11) = 3."), S("Find it", "swap and solve", "Write y = f(x), swap x and y, then solve for y. Or undo the steps in reverse order."), S("Check", "f(f⁻¹(x)) = x", "Doing both should bring you back to where you started.")]),
    L("Piecewise functions", piece, [S("Different rules", "{", "A piecewise function uses different formulas for different inputs."), S("Pick the rule", "x &lt; c or x ≥ c", "Compare your input with the cut-off value, then use only that line."), S("Example", "f(x) = x + 1 if x &lt; 3; 2x if x ≥ 3", "f(2) = 3 (first rule), f(5) = 10 (second rule).")]),
    L("Transformations of functions", transf, [S("Inside the brackets", "f(x − h)", "Changes inside move the graph sideways, and they act opposite: x − 3 moves RIGHT 3."), S("Outside the brackets", "f(x) + k", "Changes outside move the graph up or down in the way you expect."), S("Flips and stretches", "−f(x), f(−x), a·f(x)", "−f(x) flips over the x-axis, f(−x) over the y-axis, a·f(x) stretches up and down.")]),
    L("Radical equations", radEq, [S("Remove the root", "√x = 5", "Square both sides to get rid of the square root."), S("Isolate first", "√x + 2 = 7", "Get the square root alone on one side before you square."), S("Check your answer", "squaring can fool you", "Put the answer back in the original equation to make sure it works.")]),
    L("Rational equations", ratEq, [S("Cross-multiply", "a/b = c/d → ad = bc", "When two fractions are equal, multiply across."), S("Fraction with x", "12/x = 4", "Multiply both sides by x, then divide."), S("Never zero on the bottom", "x ≠ 0", "A bottom can never be zero, so check your answer.")])
  ];
  l23.push(mixOf("Mixed practice", [l23[0], l23[2], l23[3], l23[5], l23[8], l23[11], l23[13], l23[16]]));
  l23.push(mixOf("Level 23 Challenge", [l23[1], l23[4], l23[6], l23[7], l23[9], l23[10], l23[12], l23[14], l23[15], l23[17]]));

  // ================= LEVEL 24 =================
  const BV = { sin: { 30: "1/2", 45: "√2/2", 60: "√3/2" }, cos: { 30: "√3/2", 45: "√2/2", 60: "1/2" }, tan: { 30: "√3/3", 45: "1", 60: "√3" } };
  const refOf = a => (a <= 90 ? a : a <= 180 ? 180 - a : a <= 270 ? a - 180 : 360 - a);
  const qOf = a => (a < 90 ? 1 : a < 180 ? 2 : a < 270 ? 3 : 4);
  const sgOf = (f, a) => { const q = qOf(a); return f === "sin" ? (q <= 2 ? 1 : -1) : f === "cos" ? (q === 1 || q === 4 ? 1 : -1) : (q === 1 || q === 3 ? 1 : -1); };
  const exact = (f, a) => {
    if (a % 90 === 0) { const r = a % 360; return f === "sin" ? ["0", "1", "0", "-1"][r / 90] : ["1", "0", "-1", "0"][r / 90]; }
    return (sgOf(f, a) < 0 ? "-" : "") + BV[f][refOf(a)];
  };
  const VALS = ["0", "1", "-1", "1/2", "-1/2", "√2/2", "-√2/2", "√3/2", "-√3/2"];
  const AN = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];
  const unitCircle = () => {
    const f = pick(["sin", "cos", "tan"]), a = pick(AN), ans = exact(f, a), r = refOf(a);
    const wr = [(ans[0] === "-" ? ans.slice(1) : "-" + ans), ...["sin", "cos", "tan"].filter(g => g !== f).map(g => exact(g, a)), (sgOf(f, a) < 0 ? "-" : "") + BV[f][pick([30, 45, 60].filter(z => z !== r))]];
    return C(`What is the exact value of ${f} ${a}°?`, ans, wr,
      ["Find the reference angle first (the acute angle to the x-axis), then decide the sign from the quadrant.", `The reference angle uses the special triangles. The quadrant tells you whether ${f} is positive or negative there.`, "Example: cos 150°. Reference angle 30°, cos 30° = √3/2, and cos is negative in quadrant II. So cos 150° = −√3/2. Now do yours."]);
  };
  const refAngle = () => {
    let a; do { a = ri(91, 359); } while (a % 90 === 0);
    return Q(`What is the reference angle of ${a}°? (The acute angle between the terminal side and the x-axis.)`, refOf(a),
      ["Decide which quadrant the angle is in.", a < 180 ? "In quadrant II subtract the angle from 180°." : a < 270 ? "In quadrant III subtract 180° from the angle." : "In quadrant IV subtract the angle from 360°.", "Example: 200° is in quadrant III, so 200° − 180° = 20°. Now do yours."]);
  };
  const SC = [["sin is positive and cos is negative", "Quadrant II"], ["sin is negative and cos is negative", "Quadrant III"], ["sin is negative and cos is positive", "Quadrant IV"], ["sin and cos are both positive", "Quadrant I"],
    ["tan is negative and sin is positive", "Quadrant II"], ["tan is negative and cos is positive", "Quadrant IV"], ["tan is positive and cos is negative", "Quadrant III"], ["tan and sin are both positive", "Quadrant I"]];
  const quadSign = () => {
    if (ri(0, 1) === 0) { const [c, ans] = pick(SC); return C(`Which quadrant has the angle if ${c}?`, ans, ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"].filter(x => x !== ans),
      ["Remember: x is cos and y is sin. Where is x positive? Where is y positive?", "tan = sin ÷ cos, so it is positive when sin and cos have the same sign.", "Example: sin positive and cos positive means x and y are both positive, which is quadrant I. Now do yours with your clues."]); }
    let a; do { a = ri(100, 350); } while (a % 90 === 0);
    const f = pick(["sin", "cos", "tan"]);
    return C(`Is ${f} ${a}° positive or negative?`, sgOf(f, a) > 0 ? "Positive" : "Negative", [sgOf(f, a) > 0 ? "Negative" : "Positive"],
      ["Find the quadrant of the angle first.", f === "sin" ? "sin is the y-value: positive above the x-axis." : f === "cos" ? "cos is the x-value: positive to the right of the y-axis." : "tan = y ÷ x: positive when x and y have the same sign.", "Example: 250° is in quadrant III. There x and y are both negative, so sin and cos are negative and tan is positive. Now do yours."]);
  };
  const RA = [[0, "0"], [30, "π/6"], [45, "π/4"], [60, "π/3"], [90, "π/2"], [120, "2π/3"], [135, "3π/4"], [150, "5π/6"], [180, "π"], [210, "7π/6"], [225, "5π/4"], [240, "4π/3"], [270, "3π/2"], [300, "5π/3"], [315, "7π/4"], [330, "11π/6"]];
  const radTrig = () => {
    const [a, lab] = pick(RA), f = a % 90 === 0 ? pick(["sin", "cos"]) : pick(["sin", "cos", "tan"]), ans = exact(f, a);
    return C(`What is the exact value of ${f}(${lab})?`, ans, VALS.filter(v => v !== ans),
      ["Change the radians to degrees first (π is 180°), or think directly on the unit circle.", "Use the reference angle and the quadrant sign. On the axes, sin is the y-value and cos is the x-value.", "Example: sin(π/2). π/2 is 90°, the top of the unit circle, where y = 1. A different angle needs its own check. Now do yours."]);
  };
  const ampPer = () => {
    const a = ri(2, 9), b = pick([2, 3, 4, 5, 6, 8, 9, 10, 12]), t = ri(0, 3), fn = pick(["sin", "cos"]);
    if (t === 0) return Q(`What is the amplitude of y = ${a} ${fn}(${b}x)?`, a,
      ["The amplitude is how far the wave goes above its middle line.", "It is the number multiplying the trig function (take away any minus sign).", "Example: y = 4 sin(3x) has amplitude 4. Now do yours."]);
    if (t === 1) return Q(`What is the period, in degrees, of y = ${a} ${fn}(${b}x)?`, 360 / b,
      ["The basic sin and cos waves repeat every 360°.", "Divide 360 by the number multiplying x.", "Example: y = sin(4x) has period 360 ÷ 4 = 90°. Now do yours."]);
    if (t === 2) return Q(`How many full waves of y = ${a} ${fn}(${b}x) fit between 0° and 360°?`, b,
      ["The number multiplying x tells you how many times faster the wave repeats.", "That number is the count of full waves in 360°.", "Example: y = sin(3x) completes 3 waves in 360°. Now do yours."]);
    return Q(`A wave has amplitude ${a} and completes ${b} cycles in 360°. In y = A sin(Bx), what is B?`, b,
      ["B controls how many cycles fit in 360°.", "B equals the number of cycles in one full turn.", "Example: 5 cycles in 360° means y = A sin(5x). Now do yours."]);
  };
  const waveMax = () => {
    const a = ri(2, 7), d = ri(-4, 8), b = ri(2, 5), fn = pick(["sin", "cos"]), eq = `y = ${a} ${fn}(${b}x) ${d < 0 ? "−" : "+"} ${Math.abs(d)}`, t = ri(0, 3);
    if (d === 0) return waveMax();
    if (t === 0) return N(`What is the maximum value of ${eq}?`, a + d, ["The sin or cos part goes from −1 to 1, and then it is multiplied by the amplitude.", "The highest it can be is the amplitude, and then the shift is added.", "Example: y = 3 sin(x) + 2 has maximum 3 + 2 = 5. Now do yours."]);
    if (t === 1) return N(`What is the minimum value of ${eq}?`, d - a, ["The lowest the trig part can be is −1, then it is multiplied by the amplitude.", "Subtract the amplitude from the shift.", "Example: y = 3 sin(x) + 2 has minimum 2 − 3 = −1. Now do yours."]);
    if (t === 2) return N(`What is the midline of ${eq}? (y = ?)`, d, ["The midline is the horizontal line halfway between the highest and lowest points.", "It is the number added or subtracted at the end of the formula.", "Example: y = 4 cos(x) − 3 has midline y = −3. Now do yours."]);
    return Q(`What is the distance from the highest to the lowest point (the total height) of ${eq}?`, 2 * a,
      ["From the midline the wave goes up by the amplitude and down by the amplitude.", "So the total height is twice the amplitude. The shift does not change it.", "Example: y = 3 sin(x) + 2 has total height 6. Now do yours."]);
  };
  const dbl = () => {
    const [a, b, c] = pick(TR.slice(0, 5)), sw = ri(0, 1), o = sw ? b : a, ad = sw ? a : b, t = ri(0, 1), c2 = c * c;
    const hs = ["First find cos θ and sin θ from a right triangle with the given ratio.", t === 0 ? "sin 2θ = 2 · sin θ · cos θ." : "cos 2θ = cos²θ − sin²θ."];
    if (t === 0) return C(`θ is acute and sin θ = ${o}/${c}. What is sin 2θ?`, `${2 * o * ad}/${c2}`, [`${2 * o}/${c}`, `${o * ad}/${c2}`, `${2 * o * c}/${c2}`, `${2 * ad}/${c}`],
      [...hs, "Example: sin θ = 3/5, cos θ = 4/5. sin 2θ = 2 × 3/5 × 4/5 = 24/25. Now do yours."]);
    const ans = (ad * ad - o * o) >= 0 ? `${ad * ad - o * o}/${c2}` : `-${o * o - ad * ad}/${c2}`;
    return C(`θ is acute and sin θ = ${o}/${c}. What is cos 2θ?`, ans, [`${o * o - ad * ad >= 0 ? o * o - ad * ad : "-" + (ad * ad - o * o)}/${c2}`.replace("--", "-"), `${2 * o * ad}/${c2}`, `${ad * ad + o * o}/${c2}`, `${ad * ad - o * o}/${c}`],
      [...hs, "Example: sin θ = 3/5, cos θ = 4/5. cos 2θ = 16/25 − 9/25 = 7/25. Now do yours."]);
  };
  const TE = [["sin x = 1/2", 30, 150], ["sin x = √2/2", 45, 135], ["sin x = √3/2", 60, 120], ["cos x = 1/2", 60, 300], ["cos x = √2/2", 45, 315], ["cos x = √3/2", 30, 330], ["tan x = 1", 45, 225], ["tan x = √3", 60, 240],
    ["sin x = −1/2", 210, 330], ["sin x = −√2/2", 225, 315], ["sin x = −√3/2", 240, 300], ["cos x = −1/2", 120, 240], ["cos x = −√2/2", 135, 225], ["cos x = −√3/2", 150, 210]];
  const trigEq = () => {
    const [e, lo, hi] = pick(TE), big = ri(0, 1);
    return Q(`Solve ${e} for 0° ≤ x &lt; 360°. Give the ${big ? "larger" : "smaller"} solution (in degrees).`, big ? hi : lo,
      ["Ignore the sign and find the reference angle from the special triangles.", "Then pick the two quadrants where that function has the right sign, and place the angle in each.", "Example: sin x = 1/2 is positive, so quadrants I and II. The reference angle is 30°, giving 30° and 180° − 30°. Use that idea for your equation."]);
  };
  const vecMag = () => {
    const [a, b, c] = pick(TR), k = ri(1, 3), t = ri(0, 2), sw = ri(0, 1);
    if (t === 0) return Q(`Find the magnitude (length) of the vector ⟨${k * a}, ${k * b}⟩.`, k * c, ["The magnitude is √(x² + y²).", "Square each part, add, and take the square root.", "Example: ⟨3, 4⟩ has magnitude √(9 + 16) = 5. Now do yours."]);
    if (t === 1) return Q(`The vector from the point (${k}, ${k}) to the point (${k + k * a}, ${k + k * b}) has what length?`, k * c, ["First find the horizontal and vertical changes between the points.", "Then find the length with the Pythagorean theorem.", "Example: from (0, 0) to (6, 8): changes 6 and 8, length 10. Now do yours."]);
    const known = sw ? k * b : k * a; return Q(`The vector ⟨${known}, y⟩ has magnitude ${k * c}. What is y? (y is positive)`, sw ? k * a : k * b, ["Write magnitude² = x² + y².", "Square the magnitude, subtract the square of the known part, and take the square root.", "Example: ⟨3, y⟩ with magnitude 5: 25 − 9 = 16, y = 4. Now do yours."]);
  };
  const dot = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 6), b = ri(1, 6), c = ri(1, 6), d = ri(1, 6); return Q(`Find the dot product ⟨${a}, ${b}⟩ · ⟨${c}, ${d}⟩.`, a * c + b * d, ["Multiply the first parts, multiply the second parts, then add.", "(a · c) + (b · d). The answer is a single number, not a vector.", "Example: ⟨2, 3⟩ · ⟨4, 5⟩ = 8 + 15 = 23. Now do yours."]); }
    if (t === 1) { const k = ri(1, 6), c = ri(2, 5), d = ri(1, 6), b = ri(1, 5), tot = k * c + b * d; return Q(`⟨k, ${b}⟩ · ⟨${c}, ${d}⟩ = ${tot}. Find k.`, k, ["Write out the dot product with k, and set it equal to the total.", `k × ${c} + ${b} × ${d} = ${tot}. Solve for k.`, "Example: ⟨k, 2⟩ · ⟨3, 4⟩ = 17 means 3k + 8 = 17, k = 3. Now do yours."]); }
    const a = ri(1, 6), b = ri(1, 6), perp = ri(0, 1) === 0, u = [a, b], v = perp ? [b, -a] : [b, a + ri(1, 3)];
    const dv = u[0] * v[0] + u[1] * v[1];
    return C(`Are the vectors ⟨${u[0]}, ${u[1]}⟩ and ⟨${v[0] < 0 ? "−" : ""}${Math.abs(v[0])}, ${v[1] < 0 ? "−" : ""}${Math.abs(v[1])}⟩ perpendicular?`, dv === 0 ? "Yes" : "No", [dv === 0 ? "No" : "Yes"],
      ["Two vectors are perpendicular exactly when their dot product is zero.", "Work out the dot product and see whether it is 0.", "Example: ⟨1, 2⟩ · ⟨2, −1⟩ = 2 − 2 = 0, so they are perpendicular. Now do yours."]);
  };
  const mat = (a, b, c, d) => `[${a} ${b}; ${c} ${d}]`;
  const matMul = () => {
    const t = ri(0, 2);
    if (t === 0) { const A = [ri(1, 5), ri(1, 5), ri(1, 5), ri(1, 5)], B = [ri(1, 5), ri(1, 5), ri(1, 5), ri(1, 5)], r = ri(0, 1), c = ri(0, 1);
      return Q(`A = ${mat(...A)} and B = ${mat(...B)} (rows are separated by a semicolon). What is the entry in row ${r + 1}, column ${c + 1} of the product AB?`, A[2 * r] * B[c] + A[2 * r + 1] * B[2 + c],
        [`Take row ${r + 1} of A and column ${c + 1} of B.`, "Multiply them pair by pair, then add (like a dot product).", "Example: row [1 2] and column [3 4]: 1 × 3 + 2 × 4 = 11. Now do yours."]); }
    if (t === 1) { const x = ri(2, 4), y = ri(2, 4), z = ri(2, 4), w = ri(2, 4), ok = ri(0, 1) === 0, p = ok ? y : (y === w ? y + 1 : w);
      const ans = y === p ? `${x} × ${w === p ? z : z}` : "Not possible";
      const q = ok ? z : z; const sz = y === p ? `${x} × ${q}` : "Not possible";
      return C(`A is a ${x} × ${y} matrix and B is a ${p} × ${q} matrix. What is the size of AB?`, sz, ["Not possible", `${x} × ${y}`, `${p} × ${q}`, `${y} × ${q}`].filter(s => s !== sz),
        ["The number of columns of A must equal the number of rows of B.", "If they match, the result has A's rows and B's columns. If not, you cannot multiply.", "Example: a 2 × 3 times a 3 × 4 gives a 2 × 4. A 2 × 3 times a 2 × 4 is not possible. Now do yours."]); }
    const a = [ri(1, 5), ri(1, 5), ri(1, 5)], b = [ri(1, 5), ri(1, 5), ri(1, 5)];
    return Q(`A row [${a.join(" ")}] is multiplied by a column [${b.join("; ")}] (top to bottom). What single number is the result?`, a[0] * b[0] + a[1] * b[1] + a[2] * b[2], ["Multiply the first with the first, second with second, third with third.", "Add the three products.", "Example: [1 2 3] and [4; 5; 6] gives 4 + 10 + 18 = 32. Now do yours."]);
  };
  const det2 = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 9), b = ri(1, 9), c = ri(1, 9), d = ri(1, 9); return N(`Find the determinant of ${mat(a, b, c, d)}.`, a * d - b * c, ["For [a b; c d] the determinant is ad − bc.", "Multiply along the main diagonal, then take away the product of the other diagonal.", "Example: [2 3; 1 4]: 2 × 4 − 3 × 1 = 5. Now do yours."]); }
    if (t === 1) { const b = ri(1, 6), d = ri(2, 5), m2 = ri(1, 5), c = d * m2; return Q(`For what value of x is the determinant of ${mat("x", b, c, d)} equal to 0?`, b * m2,
      ["Write the determinant: x times the bottom-right, minus the product of the other two.", `Set x · ${d} − ${b} · ${c} = 0 and solve for x.`, "Example: [x 2; 6 3]: 3x − 12 = 0, so x = 4. Now do yours."]); }
    const a = ri(1, 6), b = ri(1, 6), k = ri(1, 4), sing = ri(0, 1) === 0, c = sing ? k * a : k * a + ri(1, 3), d = k * b;
    return C(`Does the matrix ${mat(a, b, c, d)} have an inverse?`, a * d - b * c === 0 ? "No" : "Yes", [a * d - b * c === 0 ? "Yes" : "No"],
      ["A matrix has an inverse exactly when its determinant is not zero.", "Work out ad − bc. Is it 0?", "Example: [1 2; 2 4] has determinant 4 − 4 = 0, so no inverse. Now do yours."]);
  };
  const GR = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [4, 5], [3, 5]];
  const infSer = () => {
    const [p, q] = pick(GR), k = ri(1, 6), t = ri(0, 2);
    if (t < 2) { const a = (q - p) * k; return Q(`A geometric series has first term ${a} and common ratio ${p}/${q}. What is the sum of the infinite series?`, a * q / (q - p),
      ["When |r| is less than 1, an infinite geometric series adds up to a finite number.", "Use S = a ÷ (1 − r). Work out 1 − r as a fraction first.", "Example: first term 6, ratio 1/2. S = 6 ÷ (1/2) = 12. Now do yours."]); }
    const rs = [["1/2", 1], ["3/2", 0], ["-1/3", 1], ["2", 0], ["0.9", 1], ["-2", 0], ["1", 0], ["1/10", 1], ["-1/2", 1], ["5/4", 0]], [r, ok] = pick(rs);
    return C(`Does the infinite geometric series with common ratio ${r} have a finite sum?`, ok ? "Yes" : "No", [ok ? "No" : "Yes"],
      ["An infinite geometric series has a sum only if the terms shrink toward zero.", "That happens when the ratio is between −1 and 1 (not including them).", "Example: ratio 1/4 has a finite sum, but ratio 3 does not, since the terms keep growing. Now do yours."]);
  };
  const sigma = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(3, 8), a = ri(1, 5), b = ri(0, 6); let s = 0; for (let k = 1; k <= n; k++) s += a * k + b; return Q(`Evaluate ∑<sub>k=1</sub><sup>${n}</sup> (${a}k + ${b}).`, s, ["The sigma means add up the expression for k = 1, 2, 3, … up to the top number.", "Write out each term and add them all.", "Example: ∑ from k=1 to 3 of (2k + 1) = 3 + 5 + 7 = 15. Now do yours."]); }
    if (t === 1) { const n = ri(3, 7); let s = 0; for (let k = 1; k <= n; k++) s += k * k; return Q(`Evaluate ∑<sub>k=1</sub><sup>${n}</sup> k².`, s, ["Square each whole number from 1 up to the top, then add.", "Write the squares in a row and add them up.", "Example: ∑ from k=1 to 3 of k² = 1 + 4 + 9 = 14. Now do yours."]); }
    const n = ri(4, 20); return Q(`Evaluate ∑<sub>k=1</sub><sup>${n}</sup> k, the sum of 1 + 2 + … + ${n}. (Use n(n + 1)/2.)`, n * (n + 1) / 2, ["The sum of the first n whole numbers has a shortcut.", "Multiply n by n + 1, then halve.", "Example: n = 10: 10 × 11 ÷ 2 = 55. Now do yours."]);
  };
  const binom = () => {
    const n = ri(3, 7), k = ri(1, n - 1), a = ri(1, 3), t = ri(0, 2), cn = (nn, kk) => { let r = 1; for (let i = 1; i <= kk; i++) r = r * (nn - kk + i) / i; return Math.round(r); };
    if (t === 0) return Q(`What is the coefficient of x${sup(k)} in the expansion of (x + 1)${sup(n)}?`, cn(n, k), ["The coefficients come from Pascal's triangle, row n.", `They are the numbers C(${n}, k) for each power.`, "Example: (x + 1)⁴ has coefficients 1, 4, 6, 4, 1, so x² has coefficient 6. Now do yours."]);
    if (t === 1) return Q(`What is the coefficient of x${sup(k)} in the expansion of (x + ${a})${sup(n)}?`, cn(n, k) * a ** (n - k), ["Each term is C(n, k) · x^k · (number)^(n − k).", "Work out C(n, k), then multiply by the number raised to the power n − k.", "Example: coefficient of x² in (x + 2)³ is C(3, 2) × 2¹ = 3 × 2 = 6. Now do yours."]);
    return Q(`How many terms are there in the expansion of (x + y)${sup(n)}?`, n + 1, ["The powers of x go from n down to 0.", "Count them, including the power 0.", "Example: (x + y)² has x², xy, y², which is 3 terms. Now do yours."]);
  };
  const ELL = [[5, 3], [5, 4], [10, 6], [10, 8], [13, 5], [13, 12], [17, 8], [17, 15], [15, 9], [15, 12], [25, 7], [25, 24], [20, 12], [20, 16], [26, 10], [26, 24]];
  const conic = () => {
    const t = ri(0, 3);
    if (t < 2) { const [a, b] = pick(ELL), c = Math.sqrt(a * a - b * b);
      if (t === 0) return Q(`An ellipse is x²/${a * a} + y²/${b * b} = 1. Find c, the distance from the center to each focus, using c² = a² − b².`, c, ["The bigger denominator is a², the smaller is b².", "Subtract the smaller denominator from the bigger one, then take the square root.", "Example: x²/25 + y²/9 = 1: 25 − 9 = 16, c = 4. Now do yours."]);
      return Q(`An ellipse is x²/${a * a} + y²/${b * b} = 1. How long is its major axis (the longest width)?`, 2 * a, ["The major axis goes through the center to both ends along the longer direction.", "Take the square root of the bigger denominator, then double it.", "Example: x²/49 + y²/16 = 1: a = 7, so the major axis is 14. Now do yours."]); }
    const [a, b, c] = pick(TR); return t === 2
      ? Q(`A hyperbola is x²/${a * a} − y²/${b * b} = 1. Find c, the distance from the center to each focus, using c² = a² + b².`, c, ["For a hyperbola, add the two denominators (instead of subtracting).", "Add the two denominators, then take the square root.", "Example: x²/9 − y²/16 = 1: 9 + 16 = 25, c = 5. Now do yours."])
      : Q(`A hyperbola is x²/${a * a} − y²/${b * b} = 1. How far apart are its two vertices?`, 2 * a, ["The vertices are on the x-axis at ±a.", "Take the square root of the denominator under x², then double it.", "Example: x²/16 − y²/9 = 1: a = 4, vertices 8 apart. Now do yours."]);
  };
  const co = (c, s) => (c === 1 ? "" : c) + "√" + s;
  const polar = () => {
    const t = ri(0, 2);
    if (t === 0) { const r = ri(2, 9), th = pick([0, 90, 180, 270]), O = [`(${r}, 0)`, `(0, ${r})`, `(-${r}, 0)`, `(0, -${r})`], i = th / 90;
      return C(`Convert the polar point (${r}, ${th}°) to rectangular coordinates (x, y).`, O[i], O.filter((_, j) => j !== i),
        ["Use x = r cos θ and y = r sin θ.", "At these special angles, cos and sin are 0, 1 or −1.", "Example: (4, 90°): x = 4 cos 90° = 0, y = 4 sin 90° = 4, so the point is (0, 4). Now do yours with your angle."]); }
    if (t === 1) { const r = 2 * ri(1, 6), th = pick([30, 45, 60]), h = r / 2;
      const ans = th === 30 ? `(${co(h, 3)}, ${h})` : th === 60 ? `(${h}, ${co(h, 3)})` : `(${co(h, 2)}, ${co(h, 2)})`;
      const wr = th === 30 ? [`(${h}, ${co(h, 3)})`, `(${co(r, 3)}, ${r})`, `(${h}, ${h})`] : th === 60 ? [`(${co(h, 3)}, ${h})`, `(${r}, ${co(r, 3)})`, `(${h}, ${h})`] : [`(${h}, ${h})`, `(${co(r, 2)}, ${co(r, 2)})`, `(${co(h, 2)}, ${h})`];
      return C(`Convert the polar point (${r}, ${th}°) to rectangular coordinates (x, y).`, ans, wr, ["Use x = r cos θ and y = r sin θ with the special-angle values.", "Work out cos and sin of the angle from the special triangles, then multiply each by r.", "Example: (4, 45°): x = 4 × √2/2 = 2√2, y = 2√2. Now do yours."]); }
    const [a, b, c] = pick(TR), k = ri(1, 2);
    return Q(`A point has rectangular coordinates (${k * a}, ${k * b}). What is r in its polar form (r, θ)?`, k * c, ["r is the distance from the origin to the point.", "Use r = √(x² + y²).", "Example: (3, 4) has r = √(9 + 16) = 5. Now do yours."]);
  };
  const limits = () => {
    const t = ri(0, 4);
    if (t === 0) { const a = ri(1, 5), b = ri(1, 6), c = ri(1, 9); return Q(`Find the limit as x → ${a} of (x² + ${b}x + ${c}).`, a * a + b * a + c, ["For a smooth polynomial, the limit is just the value you get by putting the number in.", `Replace every x with ${a}.`, "Example: limit as x → 2 of (x² + x + 1) = 4 + 2 + 1 = 7. Now do yours."]); }
    if (t === 1) { const a = ri(1, 12); return Q(`Find the limit as x → ${a} of (x² − ${a * a}) ÷ (x − ${a}).`, 2 * a, ["Putting the number in gives 0/0, so factor the top first.", "Top = (x − a)(x + a). Cancel the matching bracket, then put the number in.", "Example: (x² − 9) ÷ (x − 3) = x + 3, so the limit as x → 3 is 6. Now do yours."]); }
    if (t === 2) { const k = ri(1, 4), p = ri(1, 6), q = p + ri(1, 5); return Q(`Find the average rate of change of f(x) = ${k === 1 ? "" : k}x² between x = ${p} and x = ${q}.`, k * (p + q), ["Average rate of change = (f(q) − f(p)) ÷ (q − p), the slope of the secant line.", "For kx² this simplifies nicely: k × (p + q).", "Example: f(x) = x² between 2 and 5: (25 − 4) ÷ 3 = 7 = 2 + 5. Now do yours."]); }
    if (t === 3) { const c = ri(2, 5), m2 = ri(1, 6), a = c * m2, b = ri(1, 9), d = ri(1, 9); return Q(`Find the limit as x → ∞ of (${a}x + ${b}) ÷ (${c}x + ${d}).`, m2, ["For huge x, the plain numbers matter less and less.", "Only the x terms matter in the end: divide the number on top of x by the number under x.", "Example: (6x + 1) ÷ (2x + 5) tends to 6 ÷ 2 = 3. Now do yours."]); }
    const a = ri(1, 6), b = ri(1, 9); return N(`Find the limit as x → −${a} of (x² + ${a + b}x + ${a * b}) ÷ (x + ${a}).`, b - a, ["Putting the number in gives 0/0, so factor the top.", `The top factors into (x + ${a})(x + ${b}). Cancel, then put the number in.`, "Example: (x² + 5x + 6) ÷ (x + 2) = x + 3, so as x → −2 it tends to 1. Now do yours."]);
  };
  const l24 = [
    L("The unit circle: exact values", unitCircle, [S("Special angles", "30° · 45° · 60°", "Their sine and cosine values come from the two special triangles."), S("Reference angle", "the acute angle", "For other angles, find the reference angle, take its value, and fix the sign."), S("Signs", "+ + · − + · − − · + −", "Sine is positive in quadrants I and II. Cosine is positive in I and IV. Tangent is positive in I and III.")]),
    L("Reference angles", refAngle, [S("Angle to the x-axis", "📐", "A reference angle is the acute angle between the terminal side and the nearest x-axis."), S("By quadrant", "II: 180 − θ  III: θ − 180  IV: 360 − θ", "In quadrant I the angle is its own reference."), S("Example", "200°", "Quadrant III: 200 − 180 = 20°.")]),
    L("Signs of trig functions", quadSign, [S("x and y", "cos = x, sin = y", "On the unit circle, cosine is the x-coordinate and sine is the y-coordinate."), S("Quadrant signs", "All · Sin · Tan · Cos", "I: all positive. II: only sin. III: only tan. IV: only cos."), S("Tangent", "tan = sin ÷ cos", "Positive when sin and cos have the same sign.")]),
    L("Trig of radian angles", radTrig, [S("Radians on the circle", "π/6, π/4, π/3", "These are 30°, 45° and 60°. Multiples of them give the other special angles."), S("On the axes", "0, π/2, π, 3π/2", "(1, 0), (0, 1), (−1, 0), (0, −1). Cosine is x and sine is y."), S("Method", "convert → reference → sign", "Change to degrees if it helps, find the reference angle, then the sign.")]),
    L("Amplitude and period", ampPer, [S("Wave shape", "y = A sin(Bx)", "A makes the wave taller. B makes it faster."), S("Amplitude", "|A|", "How far the wave rises above its middle line."), S("Period", "360° ÷ B", "How long one full wave takes. B waves fit in 360°.")]),
    L("Midline, maximum and minimum", waveMax, [S("Shifted waves", "y = A sin(Bx) + D", "D moves the whole wave up (or down)."), S("Midline", "y = D", "The line halfway between the top and the bottom."), S("Max and min", "D + A and D − A", "The top is D plus the amplitude, the bottom is D minus it.")]),
    L("Double-angle formulas", dbl, [S("Doubling the angle", "2θ", "There are formulas for sin 2θ and cos 2θ using the trig values of θ."), S("The formulas", "sin 2θ = 2 sin θ cos θ", "cos 2θ = cos²θ − sin²θ."), S("Example", "sin θ = 3/5, cos θ = 4/5", "sin 2θ = 24/25 and cos 2θ = 7/25.")]),
    L("Solving trig equations", trigEq, [S("Two answers", "0° ≤ x &lt; 360°", "Between 0° and 360°, most trig equations have two solutions."), S("Reference first", "sin x = 1/2 → 30°", "Ignore the sign for a moment to find the reference angle."), S("Use the signs", "sin + in I and II", "Place the reference angle in each quadrant where the function has the right sign.")]),
    L("Length of a vector", vecMag, [S("Vectors", "⟨a, b⟩", "A vector has a direction and a size. It is written with two components."), S("Magnitude", "√(a² + b²)", "The size of a vector comes from the Pythagorean theorem."), S("Between two points", "change in x, change in y", "Subtract the coordinates to find the vector from one point to the other.")]),
    L("The dot product", dot, [S("Multiply and add", "⟨a, b⟩ · ⟨c, d⟩ = ac + bd", "The dot product of two vectors is a single number."), S("Perpendicular test", "dot product = 0", "If the dot product is zero the vectors are at a right angle."), S("Example", "⟨1, 2⟩ · ⟨2, −1⟩", "2 − 2 = 0, so they are perpendicular.")]),
    L("Multiplying matrices", matMul, [S("Rows times columns", "▦", "Each entry of AB is a row of A matched with a column of B, multiplied pair by pair and added."), S("Size rule", "m × n times n × p = m × p", "The inside numbers must match. The outside numbers give the new size."), S("Example", "[1 2] and [3; 4]", "1 × 3 + 2 × 4 = 11.")]),
    L("Determinants", det2, [S("A number from a matrix", "|a b; c d|", "For a 2 × 2 matrix the determinant is ad − bc."), S("Example", "[2 3; 1 4]", "2 × 4 − 3 × 1 = 5."), S("Inverse test", "det ≠ 0", "A matrix has an inverse exactly when its determinant is not zero.")]),
    L("Infinite geometric series", infSer, [S("Adding forever", "a + ar + ar² + …", "If the terms shrink, the total settles at a number."), S("The formula", "S = a ÷ (1 − r)", "This works only when −1 &lt; r &lt; 1."), S("Example", "6, 3, 1.5, …", "a = 6, r = 1/2, so S = 6 ÷ ½ = 12.")]),
    L("Sigma notation", sigma, [S("Add them up", "∑", "The big sigma means: add all the terms."), S("Reading it", "∑ from k = 1 to 4", "Plug k = 1, 2, 3, 4 into the expression and add the results."), S("Shortcut", "1 + 2 + … + n = n(n + 1)/2", "Handy for adding the first n whole numbers.")]),
    L("The binomial theorem", binom, [S("Expanding powers", "(x + y)ⁿ", "The expansion has n + 1 terms."), S("Pascal's triangle", "1 4 6 4 1", "Row n gives the coefficients of (x + 1)ⁿ."), S("With numbers", "C(n, k) · aⁿ⁻ᵏ", "For (x + a)ⁿ, the x^k term has coefficient C(n, k) times a to the power n − k.")]),
    L("Ellipses and hyperbolas", conic, [S("Conic sections", "⬭", "An ellipse looks like a stretched circle. A hyperbola has two open branches."), S("Ellipse", "x²/a² + y²/b² = 1", "Major axis 2a (for a bigger than b). Foci at distance c where c² = a² − b²."), S("Hyperbola", "x²/a² − y²/b² = 1", "Vertices at ±a. Foci at distance c where c² = a² + b².")]),
    L("Polar coordinates", polar, [S("Distance and direction", "(r, θ)", "Polar coordinates say how far (r) and in which direction (θ) from the origin."), S("To rectangular", "x = r cos θ, y = r sin θ", "Use the special-angle values."), S("Back again", "r = √(x² + y²)", "The distance from the origin.")]),
    L("Limits and rates of change", limits, [S("Getting close", "x → a", "A limit asks what value f(x) heads toward as x gets close to a."), S("Try substituting", "plug in a", "For a smooth function, put the number in. If you get 0/0, factor and cancel first."), S("Rate of change", "(f(b) − f(a)) ÷ (b − a)", "The average rate of change is the slope between two points. Limits turn this into instant speed.")])
  ];
  l24.push(mixOf("Mixed practice", [l24[0], l24[3], l24[4], l24[7], l24[8], l24[10], l24[12], l24[16]]));
  l24.push(mixOf("Level 24 Challenge", [l24[1], l24[2], l24[5], l24[6], l24[9], l24[11], l24[13], l24[14], l24[15], l24[17]]));

  Object.assign(MATH_LEVELS, { 22: l22, 23: l23, 24: l24 });
})();
