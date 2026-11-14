// ext/math-16-18.js  Mind Lab Math levels 16-18 (60 lessons)
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
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const frI = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : `${n}/${d}`; };
  const m = n => (n < 0 ? "−" + (-n) : String(n));
  const par = n => (n < 0 ? `(−${-n})` : String(n));
  const sgn = n => (n < 0 ? `− ${-n}` : `+ ${n}`);
  const ps = (b, e) => `${b}<sup>${e}</sup>`;
  const cf = (a, v) => (a === 1 ? v : a === -1 ? "−" + v : m(a) + v);
  const rd = v => Math.round(v * 1000) / 1000;
  const nz0 = (lo, hi) => { let x; do { x = ri(lo, hi); } while (x === 0); return x; };
  const pt = (x, y) => `(${m(x)}, ${m(y)})`;
  const commas = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // ================= LEVEL 16 =================
  const circum = () => {
    const t = ri(0, 3), r = ri(2, 15), d = ri(2, 20);
    const f = "Circumference is the distance around a circle. C = π × d, or C = 2 × π × r. Here π is about 3.14.";
    if (t === 0) return Q(`A circle has a radius of ${r} cm. What is its circumference? Use π = 3.14.`, rd(2 * 3.14 * r), [f, "The diameter is twice the radius. Then multiply the diameter by 3.14.", "Example: radius 5 cm means diameter 10 cm. C = 3.14 × 10 = 31.4 cm. Now do yours."]);
    if (t === 1) return Q(`A circle has a diameter of ${d} cm. What is its circumference? Use π = 3.14.`, rd(3.14 * d), [f, "You already have the diameter, so you can use C = π × d directly.", "Example: diameter 10 cm. C = 3.14 × 10 = 31.4 cm. Now do yours with a different diameter."]);
    if (t === 2) return Q(`The distance around a round pond is ${rd(3.14 * d)} m. What is the diameter of the pond? Use π = 3.14.`, d, [f, "Circumference ÷ π gives the diameter. You are working backwards.", "Example: C = 62.8 and π = 3.14. 62.8 ÷ 3.14 = 20, so the diameter is 20. Now do yours."]);
    return Q(`A bike wheel has a diameter of ${d} cm. How far does it roll in 10 full turns? Use π = 3.14 and answer in cm.`, rd(3.14 * d * 10), ["One full turn rolls the wheel a distance equal to its circumference.", f, "Example: a wheel with diameter 20 cm has C = 3.14 × 20 = 62.8 cm, so 10 turns = 628 cm. Now do yours with your own wheel."]);
  };
  const circArea = () => {
    const t = ri(0, 2), r = ri(2, 15), d = 2 * ri(1, 10);
    const f = "Area of a circle: A = π × r × r (use the RADIUS, not the diameter). Here π is about 3.14.";
    if (t === 0) return Q(`A circle has a radius of ${r} cm. What is its area? Use π = 3.14.`, rd(3.14 * r * r), [f, "Multiply the radius by itself first. Then multiply by 3.14.", "Example: r = 5. 5 × 5 = 25. 25 × 3.14 = 78.5 square cm. Now do yours."]);
    if (t === 1) return Q(`A circle has a diameter of ${d} cm. What is its area? Use π = 3.14.`, rd(3.14 * (d / 2) * (d / 2)), [f, "The formula needs the radius. The radius is half of the diameter.", "Example: diameter 10 means radius 5. Area = 3.14 × 5 × 5 = 78.5. Now do yours."]);
    return Q(`A circle has an area of ${rd(3.14 * r * r)} square cm. What is its radius? Use π = 3.14.`, r, [f, "Divide the area by 3.14 first. You will get the radius times itself.", "Example: A = 78.5. 78.5 ÷ 3.14 = 25. What number times itself is 25? 5. So r = 5. Now do yours."]);
  };
  const halfCircle = () => {
    const t = ri(0, 2), r = ri(2, 12);
    if (t === 0) return Q(`A half circle (semicircle) has a radius of ${r} cm. What is its area? Use π = 3.14.`, rd(3.14 * r * r / 2), ["A half circle is half of a whole circle. Find the whole circle first.", "Area of the whole circle = 3.14 × r × r. Then cut it in half.", "Example: r = 4. Whole circle: 3.14 × 16 = 50.24. Half is 25.12. Now do yours."]);
    if (t === 1) return Q(`The curved edge of a half circle is half of the full circle's circumference. If the straight edge (the diameter) is ${2 * r} cm, how long is the curved edge? Use π = 3.14.`, rd(3.14 * r), ["The full circle's circumference is π × d. The curved edge is half of that.", "Multiply the diameter by 3.14, then divide by 2.", "Example: diameter 10. 3.14 × 10 = 31.4. Half is 15.7. Now do yours."]);
    return Q(`A half circle has a radius of ${r} cm. What is its perimeter (the curved edge plus the straight edge)? Use π = 3.14.`, rd(3.14 * r + 2 * r), ["The perimeter has two pieces: the curved edge and the straight edge (the diameter).", "Curved edge = 3.14 × r. Straight edge = 2 × r. Add them.", "Example: r = 5. Curved: 3.14 × 5 = 15.7. Straight: 10. Perimeter = 25.7. Now do yours."]);
  };
  const anglePairs = () => {
    const t = ri(0, 4);
    if (t === 0) { const a = ri(10, 80); return Q(`Two angles are complementary. One is ${a}°. What is the other angle?`, 90 - a, ["Complementary angles fit together to make a right angle.", "A right angle is 90°. Take away the angle you know.", "Example: complementary to 30°. 90 − 30 = 60°. Now do yours."]); }
    if (t === 1) { let a; do { a = ri(20, 160); } while (a === 90); return Q(`Two angles are supplementary. One is ${a}°. What is the other angle?`, 180 - a, ["Supplementary angles fit together to make a straight line.", "A straight line is 180°. Take away the angle you know.", "Example: supplementary to 100°. 180 − 100 = 80°. Now do yours."]); }
    if (t === 2) { const a = ri(20, 160); return Q(`Two straight lines cross. One of the angles is ${a}°. What is the measure of the angle directly across from it (its vertical angle)?`, a, ["Look at the picture of an X. Angles across from each other are twins.", "Vertical angles are always equal to each other.", "Example: if one angle in an X is 70°, the one across from it is also 70°. Now do yours."]); }
    if (t === 3) { let a; do { a = ri(20, 160); } while (a === 90); return Q(`Two straight lines cross. One of the angles is ${a}°. What is the measure of an angle right NEXT to it (sharing a side)?`, 180 - a, ["Angles that sit next to each other on a straight line add up to a special total.", "Two neighbors on a straight line make 180°. Subtract the one you know.", "Example: neighbor of 70° is 180 − 70 = 110°. Now do yours."]); }
    const s = pick([3, 4, 5, 6, 9, 10, 12]), p = ri(1, s - 1), q = s - p;
    return Q(`Two angles that make a straight line measure ${cf(p, "x")}° and ${cf(q, "x")}°. What is x?`, 180 / s, ["Angles on a straight line add up to 180°.", "Write an equation: add the two angle expressions and set it equal to 180. Combine the x terms, then divide.", "Example: 2x and 4x make a straight line. 6x = 180, so x = 30. Now do yours."]);
  };
  const triOk = () => {
    const t = Math.random() < 0.5 ? 0 : 1;
    if (t === 0) {
      const a = ri(3, 12), b = ri(3, 12), ok = [a, b, ri(Math.abs(a - b) + 1, a + b - 1)].sort((x, y) => x - y);
      const bad = [];
      for (let i = 0; i < 6; i++) { const p = ri(2, 10), q = ri(2, 10); bad.push([p, q, p + q + ri(0, 3)].sort((x, y) => x - y).join(", ")); }
      return C("Which three side lengths CAN make a triangle?", ok.join(", "), bad, ["Picture three sticks. If the two shorter ones are too short, they cannot meet at the corner.", "Add the two shorter sides. They must be longer than the longest side.", "Example: 4, 5, 10 cannot (4 + 5 = 9, which is less than 10). But 4, 5, 8 can (9 is more than 8). Now check yours."]);
    }
    const a = ri(4, 12), b = ri(4, 12), lo = Math.abs(a - b), hi = a + b, ok = ri(lo + 1, hi - 1);
    return C(`Two sides of a triangle are ${a} cm and ${b} cm. Which could be the length of the third side?`, `${ok} cm`, [`${hi} cm`, `${hi + ri(1, 3)} cm`, `${lo} cm`, `${Math.max(1, lo - ri(1, 2))} cm`].filter(x => x !== `${ok} cm`), ["The third side has to reach between the other two sides. It cannot be too long or too short.", "It must be shorter than the SUM of the two sides, and longer than their DIFFERENCE.", "Example: sides 5 and 8. The third side must be between 3 and 13, so 10 works but 13 does not. Now do yours."]);
  };
  const prismVol = () => {
    const t = ri(0, 3);
    if (t === 0) { const l = ri(2, 12), w = ri(2, 12), h = ri(2, 12); return Q(`A box is ${l} cm long, ${w} cm wide and ${h} cm tall. What is its volume in cubic cm?`, l * w * h, ["Volume of a prism = area of the base × height.", "Find the area of the bottom (length × width), then multiply by the height.", "Example: 3 by 4 by 5. Base = 12. Volume = 12 × 5 = 60. Now do yours."]); }
    if (t === 1) { const b = 2 * ri(1, 6), h = ri(3, 9), L = ri(3, 12); return Q(`A triangular prism has a triangle end with base ${b} cm and height ${h} cm. The prism is ${L} cm long. What is its volume?`, b * h * L / 2, ["The base of this prism is a triangle. Find the triangle's area first.", "Triangle area = ½ × base × height. Then multiply by the length of the prism.", "Example: triangle base 6, height 4, length 10. Area = 12. Volume = 12 × 10 = 120. Now do yours."]); }
    if (t === 2) { const B = ri(5, 40), h = ri(2, 12); return Q(`A prism has a base area of ${B} square cm and a height of ${h} cm. What is its volume?`, B * h, ["The base area is already given for you.", "Volume = base area × height.", "Example: base area 20, height 6. Volume = 120. Now do yours."]); }
    const B = ri(5, 30), h = ri(3, 12); return Q(`A prism has a volume of ${B * h} cubic cm and a base area of ${B} square cm. What is its height?`, h, ["Volume = base area × height. You are looking for the missing piece.", "Divide the volume by the base area.", "Example: volume 150, base area 30. 150 ÷ 30 = 5. Now do yours."]);
  };
  const prismSA = () => {
    const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]), Lg = ri(4, 12), t = ri(0, 2);
    const base = `A triangular prism has right-triangle ends with sides ${a} cm, ${b} cm and ${c} cm. The prism is ${Lg} cm long.`;
    if (t === 0) return Q(`${base} What is its TOTAL surface area?`, a * b + (a + b + c) * Lg, ["A triangular prism has 2 triangle ends and 3 rectangles.", "Two triangle ends: 2 × ½ × a × b (the two short sides of the right triangle). Three rectangles: perimeter of the triangle × length.", "Example: sides 3, 4, 5 and length 10. Ends: 12. Rectangles: 12 × 10 = 120. Total = 132. Now do yours."]);
    if (t === 1) return Q(`${base} What is the area of the three rectangle sides together?`, (a + b + c) * Lg, ["The three rectangles wrap around the prism like a label on a can.", "Their total area is the perimeter of the triangle × the length of the prism.", "Example: triangle 3, 4, 5 and length 10. Perimeter = 12. 12 × 10 = 120. Now do yours."]);
    return Q(`${base} What is the area of ONE triangle end?`, a * b / 2, ["The ends are right triangles. Their two short sides meet at the right angle.", "Area = ½ × one short side × the other short side.", "Example: short sides 6 and 8. ½ × 6 × 8 = 24. Now do yours."]);
  };
  const crossBank = [
    ["a cube is sliced by a flat cut parallel to one of its faces", "Square", "Think about the shape of each face of the cube. A cut parallel to a face copies that shape."],
    ["a rectangular box is sliced by a flat cut parallel to its top", "Rectangle", "A cut parallel to the top copies the shape of the top."],
    ["a cylinder (like a can) is sliced across, parallel to its flat bottom", "Circle", "The flat bottom is the shape this cut will copy."],
    ["a cylinder (like a can) is sliced straight down through its middle, top to bottom", "Rectangle", "Picture cutting a can of soup top to bottom. Look at the flat cut surface: it has straight sides and square corners."],
    ["a sphere (a ball) is sliced by any flat cut", "Circle", "Every direction looks the same on a ball."],
    ["a cone is sliced across, parallel to its round bottom", "Circle", "Slicing parallel to the bottom copies the shape of the bottom."],
    ["a cone is sliced straight down through its point and the middle of its bottom", "Triangle", "Picture a party hat cut down the middle. The cut surface has a point on top."],
    ["a square pyramid is sliced across, parallel to its square bottom", "Square", "A cut parallel to the bottom copies the shape of the bottom."],
    ["a square pyramid is sliced straight down through its top point and the middle of its bottom", "Triangle", "The cut goes from the point down to a straight edge on the bottom."],
    ["a triangular prism (like a tent) is sliced parallel to its triangle ends", "Triangle", "A cut parallel to the end copies the shape of the end."]
  ];
  const crossSec = () => {
    const it = pick(crossBank);
    return C(`What shape is the cross section when ${it[0]}?`, it[1], ["Square", "Rectangle", "Circle", "Triangle"].filter(x => x !== it[1]), ["A cross section is the flat shape you see on the cut surface. Imagine slicing bread.", it[2], "Example: a ball cut in half is a circle. A cube cut parallel to a face is a square. Now think about yours."]);
  };
  const probSimple = () => {
    const t = ri(0, 2), cols = shuf(["red", "blue", "green", "yellow"]).slice(0, 3);
    if (t === 0) {
      const T = pick([4, 5, 10, 20, 25, 50]), a = ri(1, T - 2), b = ri(1, T - a - 1), c = T - a - b, cnt = [a, b, c], i = ri(0, 2);
      return Q(`A bag has ${a} ${cols[0]}, ${b} ${cols[1]} and ${c} ${cols[2]} marbles. You pick one without looking. What is the chance of ${cols[i]}, as a percent? (Type just the number.)`, cnt[i] * 100 / T, ["Probability = favorite outcomes ÷ all possible outcomes.", "Count all marbles first. Then make a fraction. Change it to a percent by multiplying by 100.", "Example: 3 red out of 10 marbles = 3/10 = 30%. Now do yours."]);
    }
    if (t === 1) {
      const T = ri(8, 20), a = ri(1, 5), b = ri(1, 5), c = T - a - b, cnt = [a, b, c], i = ri(0, 2), k = cnt[i];
      return C(`A bag has ${a} ${cols[0]}, ${b} ${cols[1]} and ${c} ${cols[2]} marbles. You pick one without looking. What is the probability of ${cols[i]}?`, frI(k, T), [frI(T - k, T), frI(k, T - k), frI(k + 1, T), frI(1, T), frI(k, T + 1)], ["Probability is a fraction: how many ways to win out of all the ways.", "The bottom of the fraction is the total number of marbles. The top is how many are your color.", "Example: 2 red and 6 blue marbles. P(red) = 2/8 = 1/4. Now do yours."]);
    }
    const p = 5 * ri(1, 19);
    return Q(`The chance of rain tomorrow is ${p}%. What is the chance that it does NOT rain, as a percent? (Type just the number.)`, 100 - p, ["Rain or no rain are the only two choices, so their chances share a whole.", "All the chances together make 100%. Subtract the chance you know.", "Example: a 30% chance of snow means a 70% chance of no snow. Now do yours."]);
  };
  const expProb = () => {
    const t = ri(0, 2), n = pick([10, 20, 25, 40, 50]), k = ri(1, n - 1), it = pick(["lands on red", "lands on blue", "lands on the star", "lands on green"]);
    if (t === 0 && (k * 100) % n === 0) return Q(`You spin a spinner ${n} times and it ${it} ${k} times. What is the experimental probability of that, as a percent? (Type just the number.)`, k * 100 / n, ["Experimental probability comes from what actually happened in the trial.", "Divide the number of times it happened by the number of tries. Then multiply by 100.", "Example: 6 successes in 20 tries = 6/20 = 30%. Now do yours."]);
    const mult = ri(2, 10), tot = mult * n;
    return Q(`In ${n} tries, a spinner ${it} ${k} times. If you spin it ${tot} times in all, about how many times would you expect that to happen?`, k * mult, ["Use the pattern from your tries to predict the future.", `${tot} is a bigger number of spins than ${n}. Find how many times bigger, then scale up the count.`, "Example: 3 wins in 10 tries. In 50 tries you expect 3 × 5 = 15 wins. Now do yours."]);
  };
  const countOut = () => {
    const t = ri(0, 3);
    if (t === 0) { const a = ri(2, 8), b = ri(2, 8); return Q(`You have ${a} shirts and ${b} pairs of pants. How many different outfits (one shirt and one pair of pants) can you make?`, a * b, ["Each shirt can go with every pair of pants.", "Multiply the number of choices for each part.", "Example: 3 shirts and 4 pants make 3 × 4 = 12 outfits. Now do yours."]); }
    if (t === 1) { const n = ri(2, 5); return Q(`You flip a coin ${n} times. How many different results are possible (like HHT)?`, 2 ** n, ["Each flip has 2 choices, and each flip doubles the number of results.", "Multiply 2 by itself once for each flip.", "Example: 3 flips = 2 × 2 × 2 = 8 results. Now do yours with your number of flips."]); }
    if (t === 2) { const a = ri(2, 4), b = ri(2, 5), c = ri(2, 4); return Q(`A lunch deal lets you pick 1 of ${a} main dishes, 1 of ${b} sides and 1 of ${c} drinks. How many different meals are possible?`, a * b * c, ["There are three choices to make, one after the other.", "Multiply the number of choices for the main, the side and the drink.", "Example: 2 mains, 3 sides, 2 drinks = 2 × 3 × 2 = 12 meals. Now do yours."]); }
    const n = ri(2, 4); return Q(`A lock uses a code of ${n} digits. Each digit can be any of 0 to 9, and digits can repeat. How many codes are possible?`, 10 ** n, ["Each spot in the code has the same number of choices.", "There are 10 digits (0 to 9) for each spot. Multiply 10 by itself once for each spot.", "Example: a 2-digit code has 10 × 10 = 100 codes. Now do yours."]);
  };
  const evt = [["flip a coin and get heads", 1, 2], ["roll a die and get an even number", 1, 2], ["roll a die and get a 6", 1, 6], ["roll a die and get a number bigger than 4", 2, 6], ["spin a spinner with 4 equal parts and land on the 1 part marked blue", 1, 4], ["spin a spinner with 5 equal parts and land on one of the 2 green parts", 2, 5], ["spin a spinner with 8 equal parts and land on one of the 3 red parts", 3, 8]];
  const indep = () => {
    const i = ri(0, evt.length - 1); let j; do { j = ri(0, evt.length - 1); } while (j === i || evt[i][0].split(" ")[0] === evt[j][0].split(" ")[0] && evt[i][0].split(" ")[1] === evt[j][0].split(" ")[1]);
    const A = evt[i], B = evt[j], n = A[1] * B[1], d = A[2] * B[2];
    return C(`You ${A[0]}, then you ${B[0]}. What is the probability of BOTH happening?`, frI(n, d), [frI(A[1] + B[1], A[2] + B[2]), frI(n, d * 2), frI(n * 2, d), frI(A[1] * B[2] + B[1] * A[2], d), frI(A[1] + B[1], d)], ["The two events do not affect each other, so they are independent.", "Find each probability as a fraction. Then multiply the fractions and simplify.", "Example: P(heads) = 1/2 and P(a 6) = 1/6. Both: 1/2 × 1/6 = 1/12. Now do yours."]);
  };
  const sampleBank = [
    ["the favorite sport of students in a school", "Ask 40 students picked at random from the school list", ["Ask only the students on the basketball team", "Ask only students who are in the gym at lunch", "Ask the 5 students who sit near you"]],
    ["the favorite pet of people in a town", "Call 100 homes picked at random from the town phone list", ["Ask only people who are leaving a pet store", "Ask only your own neighbors on one street", "Ask only people at a dog park"]],
    ["how students get to school", "Ask every 10th student in the roll book", ["Ask only students who arrive on bikes", "Ask only your best friends", "Ask only students who are late"]],
    ["the favorite lunch of a school", "Pick 50 names out of a hat holding every student's name", ["Ask only the students in the lunch line for pizza", "Ask only the first 10 students who arrive", "Ask only the cafeteria workers"]],
    ["how many people in a city like a new park", "Ask 200 people picked at random from the city list", ["Ask only people who already live next to the park", "Ask only people at the playground", "Ask only the mayor's friends"]],
    ["which book genre 7th graders like most", "Ask 30 seventh graders picked at random from all classes", ["Ask only the members of the book club", "Ask only students in the library", "Ask only the students in one class who sit in front"]]
  ];
  const sampling = () => {
    if (Math.random() < 0.5) {
      const s = pick([20, 25, 40, 50]), k = ri(2, s - 3), mult = ri(3, 12), T = s * mult;
      return Q(`A random sample of ${s} students found that ${k} of them walk to school. About how many of the ${T} students in the whole school walk to school?`, k * mult, ["A random sample is a small copy of the whole group, so the same fraction should hold for everyone.", `${T} is bigger than ${s}. Find how many times bigger, then multiply the count by that number.`, "Example: 3 of 10 sampled like soup. In a school of 200 (20 times more), about 3 × 20 = 60 like soup. Now do yours."]);
    }
    const it = pick(sampleBank);
    return C(`You want to find out ${it[0]}. Which way gives the best (fairest) sample?`, it[1], it[2], ["A good sample is fair. It should look like the whole group, not just one part of it.", "Ask yourself: does every person in the group have an equal chance of being picked?", "Example: to learn the favorite color of a school, asking only the art club is not fair, but picking names at random is. Now check yours."]);
  };
  const names5 = () => shuf(["Ana", "Ben", "Cy", "Dee", "Eli", "Fay", "Gus", "Hal"]);
  const compData = () => {
    const t = ri(0, 2), set5 = (lo, hi) => Array.from({ length: 5 }, () => ri(lo, hi));
    let A, B, a, b;
    for (let k = 0; k < 50; k++) {
      A = set5(10, 40); B = set5(10, 40);
      if (t === 2) { A[4] += (5 - A.reduce((x, y) => x + y, 0) % 5) % 5; B[4] += (5 - B.reduce((x, y) => x + y, 0) % 5) % 5; }
      const med = s => [...s].sort((x, y) => x - y)[2], rng = s => Math.max(...s) - Math.min(...s), mean = s => s.reduce((x, y) => x + y, 0) / 5;
      const f = t === 0 ? med : t === 1 ? rng : mean;
      a = f(A); b = f(B);
      if (a !== b) break;
    }
    const nm = t === 0 ? "median" : t === 1 ? "range" : "mean";
    const how = t === 0 ? ["Put each list in order from least to greatest. The median is the middle number.", "Find the median of each team, then subtract the smaller from the larger.", "Example: A = 3, 5, 9, 12, 20 (median 9); B = 2, 4, 6, 7, 8 (median 6). The difference is 3. Now do yours."]
      : t === 1 ? ["The range is the greatest number minus the least number.", "Find the range of each team. Then subtract the smaller range from the larger.", "Example: A = 3, 5, 9, 12, 20 has range 17; B = 2, 4, 6, 7, 8 has range 6. The difference is 11. Now do yours."]
        : ["The mean is the sum of the numbers divided by how many there are.", "Find the mean of each team (add them up, divide by 5). Then subtract the smaller from the larger.", "Example: A = 2, 4, 6, 8, 10 has mean 6; B = 1, 2, 3, 4, 5 has mean 3. The difference is 3. Now do yours."];
    return Q(`Team A scored: ${A.join(", ")}.<br>Team B scored: ${B.join(", ")}.<br>How far apart are the ${nm}s of the two teams? (Subtract the smaller from the larger.)`, Math.abs(a - b), how);
  };
  const distribute = () => {
    const p = ri(2, 9), q = ri(2, 9), v = pick(["x", "n", "a", "y"]), t = ri(0, 2), neg = Math.random() < 0.4;
    if (t === 2) { const a = ri(2, 5), b = ri(2, 9); return C(`Which expression equals ${p}(${a}${v} ${neg ? "−" : "+"} ${b})?`, `${p * a}${v} ${neg ? "−" : "+"} ${p * b}`, [`${p * a}${v} ${neg ? "−" : "+"} ${b}`, `${p + a}${v} ${neg ? "−" : "+"} ${p + b}`, `${p * a}${v} ${neg ? "+" : "−"} ${p * b}`], ["Distribute: multiply the number outside by EACH term inside the parentheses.", "Multiply the outside number by the term with the letter, then by the plain number. Keep the sign between them.", "Example: 3(2x + 5) = 6x + 15. Now do yours."]); }
    const ans = `${p}${v} ${neg ? "−" : "+"} ${p * q}`;
    return C(`Which expression equals ${p}(${v} ${neg ? "−" : "+"} ${q})?`, ans, [`${p}${v} ${neg ? "−" : "+"} ${q}`, `${v} ${neg ? "−" : "+"} ${p * q}`, `${p}${v} ${neg ? "+" : "−"} ${p * q}`, `${p}${v} ${neg ? "−" : "+"} ${p + q}`], ["Distribute: multiply the number outside by EACH term inside the parentheses.", "Both terms inside get multiplied, not just the first. Keep the sign between them.", "Example: 4(x + 3) = 4x + 12. Now do yours."]);
  };
  const factorQ = () => {
    const g = ri(2, 9), a = ri(1, 6), b = ri(1, 9), neg = Math.random() < 0.4, v = pick(["x", "n", "y"]), tm = (c, w) => (c === 1 ? w : c + w);
    if (Math.random() < 0.4) { const g2 = gcd(g * a, g * b); return Q(`What is the greatest common factor of ${g * a}${v} and ${g * b}? (Just the number.)`, g2, ["Look only at the numbers. Find the biggest number that divides both of them.", "List the factors of each number and find the biggest one they share.", "Example: the GCF of 12 and 18 is 6 (6 goes into both, and nothing bigger does). Now do yours."]); }
    const gg = gcd(g * a, g * b), A = g * a / gg, B = g * b / gg, s = neg ? "−" : "+";
    return C(`Factor the expression ${g * a}${v} ${s} ${g * b} using the greatest common factor.`, `${gg}(${tm(A, v)} ${s} ${B})`, [`${gg + 1}(${tm(A, v)} ${s} ${B})`, `${A}(${tm(gg, v)} ${s} ${B})`, `${gg}(${tm(A, v)} ${neg ? "+" : "−"} ${B})`, `${gg}(${tm(A, v)} ${s} ${gg * B})`], ["Factoring is distributing backwards. Find a number that goes into both terms.", "Pull out the GREATEST common factor and divide each term by it. Put what is left inside parentheses.", "Example: 8x + 12 = 4(2x + 3) because 4 is the GCF of 8 and 12. Now do yours."]);
  };
  const ineqStory = () => {
    const t = ri(0, 2);
    if (t === 0) { const c = ri(2, 6), f = ri(2, 10), k = ri(3, 12), T = f + c * k + ri(0, c - 1); return Q(`You have $${T}. Getting into a fair costs $${f}, and each ride costs $${c}. What is the greatest number of rides you can afford?`, k, ["Write what you spend: the fee plus the cost of the rides. It must be at most your money.", "Subtract the fee from your money. Then see how many rides fit in what is left (round DOWN).", "Example: $30, fee $4, rides $5 each. 30 − 4 = 26. 26 ÷ 5 = 5.2, so 5 rides. Now do yours."]); }
    if (t === 1) { const c = ri(2, 6), b = ri(2, 20), k = ri(3, 12), Gl = b + c * (k - 1) + ri(1, c); return Q(`You need at least ${Gl} points to win a prize. You already have ${b} points, and each game earns ${c} points. What is the fewest number of games you need to play?`, k, ["You need to reach the goal, not stay below it. How many more points are needed?", "Subtract the points you have from the goal. Divide by the points per game. If it does not divide evenly, round UP.", "Example: need 50, have 10, games give 6 each. 50 − 10 = 40. 40 ÷ 6 = 6.67, so 7 games. Now do yours."]); }
    const c = ri(2, 9), f = ri(2, 15), T = ri(4, 12) * 10 + 20;
    return C(`Tickets cost $${c} each plus a $${f} fee. You can spend at most $${T}. Which inequality shows this, with x as the number of tickets?`, `${c}x + ${f} ≤ ${T}`, [`${c}x + ${f} ≥ ${T}`, `${f}x + ${c} ≤ ${T}`, `${c}x ≤ ${T}`, `${c + f}x ≤ ${T}`], ["Look for the key words: 'at most' tells you which symbol to use.", "The cost is the price times the number of tickets, plus the fee. This must be less than or equal to the limit.", "Example: Pens cost $2 each plus $3 shipping, and you can spend at most $20: 2x + 3 ≤ 20. Now do yours."]);
  };
  const pctErr = () => {
    const A = pick([20, 25, 40, 50, 80, 100, 200, 250, 400]), e = pick([2, 4, 5, 10, 12, 15, 20, 25]), d = A * e / 100;
    if (!Number.isInteger(d)) return pctErr();
    const M = Math.random() < 0.5 ? A + d : A - d, it = pick([["You guessed there were", "jelly beans in a jar, but there were really"], ["A scale read", "grams, but the true mass was"], ["You estimated the trip would take", "minutes, but it really took"], ["A sign said", "people came, but the true number was"]]);
    return Q(`${it[0]} ${M} ${it[1]} ${A}. What is the percent error? (Type just the number.)`, e, ["Percent error tells how far off you were, compared to the TRUE value.", "Find the error (the difference between the two numbers, ignoring the sign). Divide it by the TRUE value, then multiply by 100.", "Example: guessed 45, true 50. Error = 5. 5 ÷ 50 = 0.10 = 10%. Now do yours."]);
  };
  const l16 = [
    L("Circumference", circum, [S("Around the circle", "⭕", "Circumference is the distance around a circle."), S("The formula", "C = π × d", "π is about 3.14. The diameter is twice the radius, so C = 2 × π × r too."), S("Example", "d = 10 → C = 31.4", "3.14 × 10 = 31.4.")]),
    L("Area of circles", circArea, [S("Inside the circle", "🔵", "Area is how much flat space is inside."), S("The formula", "A = π × r × r", "Use the RADIUS. The radius is half of the diameter."), S("Example", "r = 5 → A = 78.5", "5 × 5 = 25. 25 × 3.14 = 78.5 square units.")]),
    L("Half circles", halfCircle, [S("Half a circle", "🌓", "A semicircle is half of a circle."), S("Area", "½ × π × r × r", "Find the whole circle's area and cut it in half."), S("Perimeter", "curve + straight edge", "The perimeter has half the circumference plus the straight diameter.")]),
    L("Angle pairs", anglePairs, [S("Complementary", "∠ + ∠ = 90°", "Two angles that make a right angle."), S("Supplementary", "∠ + ∠ = 180°", "Two angles that make a straight line."), S("Vertical angles", "✖", "When two lines cross, the angles across from each other are equal.")]),
    L("Can it be a triangle?", triOk, [S("Three sticks", "📏📏📏", "Not every three lengths can make a triangle."), S("The rule", "short + short > long", "The two shorter sides must add up to MORE than the longest side."), S("Third side", "|a − b| < c < a + b", "The third side is longer than the difference and shorter than the sum.")]),
    L("Volume of prisms", prismVol, [S("Layers", "🧱", "A prism is a stack of identical layers."), S("Formula", "V = B × h", "B is the area of the base. h is the height (or length) of the prism."), S("Triangle base", "B = ½ × b × h", "If the base is a triangle, find its area first.")]),
    L("Surface area of triangular prisms", prismSA, [S("The net", "▲ ▭ ▭ ▭ ▲", "A triangular prism unfolds into 2 triangles and 3 rectangles."), S("Rectangles", "perimeter × length", "The three rectangles together have area (perimeter of triangle) × (length)."), S("Add it up", "ends + rectangles", "Add the area of both triangle ends to the rectangles.")]),
    L("Cross sections", crossSec, [S("Slice it", "🔪", "A cross section is the flat shape you get when you slice through a solid."), S("Parallel cuts", "copy the base", "A cut parallel to a face or base gives the same shape as that face or base."), S("Straight-down cuts", "top to bottom", "A cut straight down through the top of a can gives a rectangle. A cut straight down a cone gives a triangle.")]),
    L("Probability of simple events", probSimple, [S("Chance", "🎲", "Probability tells how likely something is, from 0 (never) to 1 (always)."), S("Formula", "P = wins ÷ all", "Count the ways to win and divide by all the equally likely outcomes."), S("Not happening", "P(not) = 1 − P", "The chance it does NOT happen is 100% minus the chance it does.")]),
    L("Experimental probability", expProb, [S("Try it", "🔁", "Experimental probability comes from real tries."), S("Formula", "times it happened ÷ tries", "For 12 successes in 40 tries it is 12/40 = 30%."), S("Predict", "scale up", "Use the same fraction to predict a bigger number of tries.")]),
    L("Counting outcomes", countOut, [S("Choices", "👕👖", "If you make choices one after another, you can multiply."), S("Example", "3 shirts × 4 pants = 12", "Each shirt goes with every pair of pants."), S("Many steps", "a × b × c", "Multiply the number of choices at each step.")]),
    L("Probability of two events", indep, [S("Independent", "🪙 🎲", "Independent events do not change each other."), S("Multiply", "P(A) × P(B)", "The chance that both happen is the product of the chances."), S("Example", "1/2 × 1/6 = 1/12", "Heads on a coin and a 6 on a die.")]),
    L("Samples and predictions", sampling, [S("A sample", "👥", "A sample is a small group that stands for a big group."), S("Fair sample", "random", "A random sample gives every person an equal chance to be picked."), S("Predict", "scale up", "Use the sample's fraction to predict for the whole group.")]),
    L("Comparing two data sets", compData, [S("Center", "mean, median", "Mean is the average. Median is the middle number when the list is in order."), S("Spread", "range", "Range is the greatest minus the least."), S("Compare", "subtract", "Find the same measure for both groups, then subtract.")]),
    L("Expanding expressions", distribute, [S("Distribute", "3(x + 4)", "Multiply the number outside by every term inside."), S("Result", "3x + 12", "3 × x = 3x and 3 × 4 = 12."), S("Careful", "−", "A minus sign stays with the number that follows it.")]),
    L("Factoring expressions", factorQ, [S("Backwards", "6x + 9", "Factoring is distributing in reverse."), S("Find the GCF", "GCF of 6 and 9 is 3", "Pull out the greatest number that divides every term."), S("Write it", "3(2x + 3)", "Check by distributing again.")]),
    L("Inequality stories", ineqStory, [S("Key words", "at most, at least", "'At most' means ≤. 'At least' means ≥."), S("Write it", "5x + 12 ≤ 60", "Turn the story into an inequality."), S("Solve and think", "whole numbers", "Solve like an equation. Then think about whether the answer must be a whole number.")]),
    L("Percent error", pctErr, [S("Off by how much?", "🎯", "Percent error compares your mistake to the true value."), S("Formula", "|guess − true| ÷ true × 100", "Subtract, ignore the sign, divide by the TRUE number."), S("Example", "45 vs 50 → 10%", "The error is 5, and 5 ÷ 50 = 10%.")])
  ];
  l16.push(mixOf("Mixed practice", [l16[0], l16[1], l16[3], l16[5], l16[8], l16[14], l16[15]]));
  l16.push(mixOf("Level 16 Challenge", [l16[2], l16[4], l16[6], l16[7], l16[9], l16[10], l16[11], l16[12], l16[13], l16[16], l16[17]]));

  // ================= LEVEL 17 =================
  const bases = ["x", "a", "n", "y", "m", "2", "3", "5", "10"];
  const prodRule = () => {
    const b = pick(bases), p = ri(2, 9), q = ri(2, 9), t = ri(0, 1);
    const h = ["When you multiply powers with the SAME base, you combine them. Think of writing out all the factors.", "Keep the base and ADD the exponents.", "Example: x<sup>2</sup> × x<sup>3</sup> = x<sup>5</sup>, because 2 + 3 = 5. Now do yours."];
    if (t === 0) return Q(`${ps(b, p)} × ${ps(b, q)} = ${ps(b, "?")}. What is the missing exponent?`, p + q, h);
    return Q(`${ps(b, p)} × ${ps(b, "?")} = ${ps(b, p + q)}. What is the missing exponent?`, q, ["The exponents are added when you multiply powers with the same base.", "Subtract: the total exponent minus the exponent you know.", "Example: x<sup>2</sup> × x<sup>?</sup> = x<sup>7</sup>. 7 − 2 = 5, so the missing exponent is 5. Now do yours."]);
  };
  const quotRule = () => {
    const b = pick(bases), q = ri(2, 6), p = q + ri(1, 6), t = ri(0, 1);
    if (t === 0) return Q(`${ps(b, p)} ÷ ${ps(b, q)} = ${ps(b, "?")}. What is the missing exponent?`, p - q, ["When you divide powers with the same base, some of the factors cancel out.", "Keep the base and SUBTRACT the exponents (top exponent minus bottom exponent).", "Example: x<sup>7</sup> ÷ x<sup>3</sup> = x<sup>4</sup>, because 7 − 3 = 4. Now do yours."]);
    return Q(`${ps(b, "?")} ÷ ${ps(b, q)} = ${ps(b, p - q)}. What is the missing exponent?`, p, ["Division subtracts exponents. Work backwards.", "The top exponent minus the bottom exponent gives the answer exponent. So top = answer + bottom.", "Example: x<sup>?</sup> ÷ x<sup>2</sup> = x<sup>3</sup>. 3 + 2 = 5. Now do yours."]);
  };
  const powPow = () => {
    const b = pick(bases), p = ri(2, 6), q = ri(2, 5);
    if (Math.random() < 0.6) return Q(`(${ps(b, p)})<sup>${q}</sup> = ${ps(b, "?")}. What is the missing exponent?`, p * q, ["A power of a power means you repeat the whole power several times.", "Keep the base and MULTIPLY the exponents.", "Example: (x<sup>2</sup>)<sup>3</sup> = x<sup>6</sup>, because 2 × 3 = 6. Now do yours."]);
    return Q(`(${ps(b, "?")})<sup>${q}</sup> = ${ps(b, p * q)}. What is the missing exponent inside the parentheses?`, p, ["Raising a power to a power multiplies the exponents. Work backwards.", "Divide the final exponent by the outside exponent.", "Example: (x<sup>?</sup>)<sup>3</sup> = x<sup>12</sup>. 12 ÷ 3 = 4. Now do yours."]);
  };
  const zeroNeg = () => {
    const t = ri(0, 2), b = pick([2, 3, 4, 5, 10]), n = ri(1, 3);
    if (t === 0) { const e = pick([5, 7, 12, 25, 100, 3]); return Q(`What is ${e}<sup>0</sup>?`, 1, ["Any number to the power of zero follows one special rule.", "Look at the pattern: 5<sup>2</sup> = 25, 5<sup>1</sup> = 5, 5<sup>0</sup> = 5 ÷ 5 = ?", "Example: 9<sup>0</sup> is 1, and so is 200<sup>0</sup>. Now do yours."]); }
    if (t === 1) return C(`What is ${b}<sup>−${n}</sup>?`, `1/${b ** n}`, [`−${b ** n}`, `1/${b * n}`, `−${b * n}`, `${b ** n}`, `−1/${b ** n}`, `1/${b ** n + 1}`], ["A negative exponent does not make the number negative. It flips it.", `A negative exponent means you take 1 over the power: 1 divided by the base with the positive exponent.`, "Example: 2<sup>−3</sup> = 1/2<sup>3</sup> = 1/8. Now do yours."]);
    return Q(`${ps("x", "−" + (n + 1))} = 1 ÷ ${ps("x", "?")}. What is the missing exponent?`, n + 1, ["A negative exponent flips the power to the bottom of a fraction.", "The exponent on the bottom is the positive version of the negative exponent.", "Example: x<sup>−4</sup> = 1 ÷ x<sup>4</sup>. Now do yours with your own exponent."]);
  };
  const sqrtQ = () => {
    const n = ri(2, 20), t = ri(0, 2), c = ri(1, 20);
    if (t === 0) return Q(`√${n * n} = ?`, n, ["A square root asks: what number times itself gives this number?", "Think of the perfect squares you know: 1, 4, 9, 16, 25, 36 ...", "Example: √81 = 9 because 9 × 9 = 81. Now do yours."]);
    if (t === 1) return Q(`What is the positive solution of x<sup>2</sup> = ${n * n}?`, n, ["Solving x² = a number means finding what number squared gives it.", "Take the square root of both sides. (There is also a negative solution, but give the positive one.)", "Example: x² = 49 gives x = 7 (and also −7). Now do yours."]);
    return Q(`Find the value of √${n * n} + ${c}`, n + c, ["Find the square root first, then do the addition.", "The square root is the number that multiplied by itself gives the number under the root sign.", "Example: √64 + 5 = 8 + 5 = 13. Now do yours."]);
  };
  const cubeRootQ = () => {
    const n = ri(2, 10), t = ri(0, 2);
    if (t === 0) return Q(`∛${n ** 3} = ?`, n, ["A cube root asks: what number multiplied by itself THREE times gives this number?", "Try small numbers: 2 × 2 × 2 = 8, 3 × 3 × 3 = 27, and so on.", "Example: ∛125 = 5 because 5 × 5 × 5 = 125. Now do yours."]);
    if (t === 1) return Q(`What is the solution of x<sup>3</sup> = ${n ** 3}?`, n, ["Undo cubing by taking the cube root of both sides.", "Look for the number that, multiplied by itself three times, makes it.", "Example: x³ = 64 gives x = 4 because 4 × 4 × 4 = 64. Now do yours."]);
    const k = Math.min(n, 6);
    return N(`∛(−${k ** 3}) = ?`, -k, ["A cube root of a negative number IS possible, because a negative times a negative times a negative is negative.", "Ignore the minus sign first, find the cube root, then decide the sign.", "Example: ∛(−8) = −2 because (−2)(−2)(−2) = −8. Now do yours."]);
  };
  const estRoot = () => {
    if (Math.random() < 0.5) {
      const lo = ri(2, 12); let n; do { n = ri(lo * lo + 1, (lo + 1) * (lo + 1) - 1); } while (n === lo * lo);
      return C(`√${n} is between which two whole numbers?`, `${lo} and ${lo + 1}`, [`${lo - 1} and ${lo}`, `${lo + 1} and ${lo + 2}`, `${lo - 2} and ${lo - 1}`, `${Math.floor(n / 2)} and ${Math.floor(n / 2) + 1}`], ["Find the perfect squares just below and just above the number.", "The square roots of those two perfect squares are the whole numbers you are looking for.", "Example: √30 is between √25 = 5 and √36 = 6, so between 5 and 6. Now do yours."]);
    }
    const k = ri(3, 12), d = ri(1, k - 1), up = Math.random() < 0.5, n = up ? k * k + d : (k + 1) * (k + 1) - d;
    return Q(`√${n} is closest to which whole number?`, up ? k : k + 1, ["Find the two perfect squares on either side of the number.", "See which perfect square your number is closer to. Its square root is the answer.", "Example: 28 is closer to 25 than to 36, so √28 is closest to 5. Now do yours."]);
  };
  const sciWrite = () => {
    const ci = ri(11, 99), e = ri(3, 8), c = ci / 10, t = ri(0, 2);
    if (t === 0) return C(`Write ${commas(ci * 10 ** (e - 1))} in scientific notation.`, `${c} × 10<sup>${e}</sup>`, [`${c} × 10<sup>${e + 1}</sup>`, `${c} × 10<sup>${e - 1}</sup>`, `${ci} × 10<sup>${e - 1}</sup>`], ["Scientific notation has a number from 1 up to (but not including) 10, times a power of 10.", "Move the decimal point so only one digit is left in front of it. Count how many places you moved. That is the exponent.", "Example: 52,000 = 5.2 × 10<sup>4</sup> (the decimal moved 4 places). Now do yours."]);
    if (t === 1) return C(`Write 0.${"0".repeat(e - 1)}${ci} in scientific notation.`, `${c} × 10<sup>−${e}</sup>`, [`${c} × 10<sup>${e}</sup>`, `${c} × 10<sup>−${e + 1}</sup>`, `${c} × 10<sup>−${e - 1}</sup>`], ["A very small number has a NEGATIVE exponent. You move the decimal to the right to get a number from 1 to 10.", "Count how many places the decimal moves to the right. That count, made negative, is the exponent.", "Example: 0.0031 = 3.1 × 10<sup>−3</sup> (the decimal moved 3 places). Now do yours."]);
    return Q(`Write ${c} × 10<sup>${e}</sup> as an ordinary number. (No commas.)`, ci * 10 ** (e - 1), ["A positive exponent means a big number. You move the decimal point to the right.", `The exponent tells how many places to move the decimal point right. Fill empty places with zeros.`, "Example: 3.2 × 10<sup>4</sup> = 32000. Now do yours."]);
  };
  const sciOps = () => {
    const t = ri(0, 2);
    if (t === 0) { const [a, b] = pick([[2, 3], [1.5, 4], [2, 2], [3, 3], [2.5, 3], [1, 7], [2, 4]]), x = ri(2, 9), y = ri(2, 9); return Q(`(${a} × 10<sup>${x}</sup>) × (${b} × 10<sup>${y}</sup>) = ${a * b} × 10<sup>?</sup>. What is the missing exponent?`, x + y, ["Multiply the numbers in front, and the powers of 10 separately.", "When you multiply powers of 10, you add the exponents.", "Example: (2 × 10<sup>3</sup>) × (4 × 10<sup>5</sup>) = 8 × 10<sup>8</sup>, because 3 + 5 = 8. Now do yours."]); }
    if (t === 1) { const b = pick([2, 3, 4]), k = pick([2, 3]), n = ri(2, 6), x = n + ri(1, 6); return Q(`(${b * k} × 10<sup>${x}</sup>) ÷ (${b} × 10<sup>${n}</sup>) = ${k} × 10<sup>?</sup>. What is the missing exponent?`, x - n, ["Divide the numbers in front, and the powers of 10 separately.", "When you divide powers of 10, you subtract the exponents.", "Example: (8 × 10<sup>9</sup>) ÷ (2 × 10<sup>4</sup>) = 4 × 10<sup>5</sup>, because 9 − 4 = 5. Now do yours."]); }
    const b = pick([2, 3, 4]), k = pick([2, 3]), n = ri(2, 5), x = n + ri(1, 4);
    return Q(`A bridge is ${b * k} × 10<sup>${x}</sup> mm long. A toy bridge is ${b} × 10<sup>${n}</sup> mm long. How many times longer is the real bridge than the toy? (Type an ordinary number.)`, k * 10 ** (x - n), ["Divide the big length by the small length.", "Divide the front numbers, then subtract the exponents. Then write it as an ordinary number.", "Example: (6 × 10<sup>5</sup>) ÷ (3 × 10<sup>2</sup>) = 2 × 10<sup>3</sup> = 2000. Now do yours."]);
  };
  const rationalQ = () => {
    const irr = ["√2", "√3", "√5", "√6", "√7", "√10", "√11", "π"], rat = ["√4", "√9", "√16", "√25", "√36", "√49", "0.5", "0.25", "3/4", "−7", "1/3", "0.75", "−2/5", "12"];
    if (Math.random() < 0.3) {
      const n = ri(2, 60), sq = Math.sqrt(n) === Math.floor(Math.sqrt(n));
      return C(`Is √${n} rational or irrational?`, sq ? "Rational" : "Irrational", [sq ? "Irrational" : "Rational", "Neither"], ["Ask whether the number under the root sign is a perfect square.", "If it is a perfect square, the root is a whole number and can be written as a fraction. If not, the decimal never ends or repeats.", "Example: √25 = 5 is rational, but √26 is irrational because 26 is not a perfect square. Now do yours."]);
    }
    if (Math.random() < 0.5) { const a = pick(irr); return C("Which of these numbers is IRRATIONAL?", a, shuf(rat).slice(0, 3), ["A rational number can be written as a fraction of two whole numbers (including whole numbers and decimals that end or repeat).", "Check each choice. Roots of perfect squares are whole numbers. An irrational number has a decimal that goes on forever without repeating.", "Example: √16 = 4 is rational, but √3 = 1.7320508... never ends, so it is irrational. Now check yours."]); }
    const a = pick(rat); return C("Which of these numbers is RATIONAL?", a, shuf(irr).slice(0, 3), ["A rational number can be written as a fraction of two whole numbers.", "Square roots of numbers that are NOT perfect squares, and π, are irrational. Look for the one that is different.", "Example: 0.2 = 1/5 is rational, but √2 is not. Now check yours."]);
  };
  const bothSides = () => {
    let a, c, b, d, x;
    do { a = ri(2, 8); c = pick([-4, -3, -2, -1, 1, 2, 3, 4, 5, 6]); b = nz0(-12, 12); x = nz0(-8, 10); d = b + (a - c) * x; } while (a === c || d === 0);
    return N(`Solve for x:  ${cf(a, "x")} ${sgn(b)} = ${cf(c, "x")} ${sgn(d)}`, x, ["Get all the x terms on one side and all the plain numbers on the other.", "Subtract the smaller x term from both sides first. Then move the plain number, then divide.", "Example: 5x + 2 = 2x + 14. Subtract 2x: 3x + 2 = 14. Subtract 2: 3x = 12. Divide by 3: x = 4. Now do yours."]);
  };
  const distEq = () => {
    let a, c, b, d, x, k;
    if (Math.random() < 0.5) {
      do { a = ri(2, 6); c = pick([-3, -2, -1, 1, 2, 3, 4, 5]); b = nz0(-8, 8); x = nz0(-8, 10); d = a * b + (a - c) * x; } while (a === c || d === 0);
      return N(`Solve for x:  ${a}(x ${sgn(b)}) = ${cf(c, "x")} ${sgn(d)}`, x, ["First use the distributive property to remove the parentheses.", "After distributing, get the x terms on one side and the plain numbers on the other.", "Example: 3(x + 2) = x + 12. Distribute: 3x + 6 = x + 12. Subtract x: 2x + 6 = 12. Then 2x = 6, so x = 3. Now do yours."]);
    }
    do { a = ri(2, 6); c = pick([-3, -2, 1, 2, 3, 4]); b = nz0(-6, 6); k = nz0(-9, 9); x = nz0(-8, 10); d = a * b + k + (a - c) * x; } while (a === c || d === 0);
    return N(`Solve for x:  ${a}(x ${sgn(b)}) ${sgn(k)} = ${cf(c, "x")} ${sgn(d)}`, x, ["Distribute first. Then combine the plain numbers on the left side.", "Move the x terms to one side, the plain numbers to the other, and divide.", "Example: 2(x + 1) + 3 = x + 9. Distribute: 2x + 2 + 3 = x + 9, so 2x + 5 = x + 9. Subtract x: x + 5 = 9, so x = 4. Now do yours."]);
  };
  const numSol = () => {
    const t = ri(0, 2), a = ri(2, 7), b = nz0(-9, 9), v = pick(["x", "n"]);
    const o = ["One solution", "No solution", "Infinitely many solutions"];
    const h = ["Simplify each side of the equation. Then compare the two sides.", "If the x terms cancel and you get a TRUE statement like 5 = 5, every number works. If you get a FALSE statement like 3 = 7, nothing works. If you can solve for x, there is one answer.", "Example: 2x + 1 = 2x + 5. Subtract 2x: 1 = 5. That is false, so there is no solution. Now do yours."];
    if (t === 0) { let c; do { c = nz0(-20, 20); } while (c === a * b); return C(`How many solutions does this equation have?  ${a}(${v} ${sgn(b)}) = ${a}${v} ${sgn(c)}`, o[1], [o[0], o[2]], h); }
    if (t === 1) return C(`How many solutions does this equation have?  ${a}(${v} ${sgn(b)}) = ${a}${v} ${sgn(a * b)}`, o[2], [o[0], o[1]], h);
    let c; do { c = pick([-3, -2, 1, 3, 4, 5, 8]); } while (c === a);
    return C(`How many solutions does this equation have?  ${a}${v} ${sgn(b)} = ${cf(c, v)} ${sgn(nz0(-9, 9))}`, o[0], [o[1], o[2]], h);
  };
  const slopeTwo = () => {
    if (Math.random() < 0.6) {
      const mm = nz0(-5, 5), dx = nz0(-4, 4), x1 = ri(-5, 5), y1 = ri(-5, 5);
      return N(`What is the slope of the line through ${pt(x1, y1)} and ${pt(x1 + dx, y1 + mm * dx)}?`, mm, ["Slope tells how steep a line is: how much it rises for each step to the right.", "Slope = (change in y) ÷ (change in x). Subtract the y values and the x values in the SAME order.", "Example: points (1, 2) and (3, 8). Change in y = 6, change in x = 2. Slope = 3. Now do yours."]);
    }
    const dx = nz0(-6, 6), dy = nz0(-8, 8), x1 = ri(-5, 5), y1 = ri(-5, 5);
    return C(`What is the slope of the line through ${pt(x1, y1)} and ${pt(x1 + dx, y1 + dy)}?`, frI(dy, dx), [frI(dx, dy), frI(-dy, dx), frI(dy + 1, dx), frI(dy, dx + 1)], ["Slope is rise over run: how far the line goes up or down, over how far it goes across.", "Subtract the y values for the top of the fraction and the x values for the bottom. Keep the same order. Simplify.", "Example: (0, 1) and (4, 7). Rise 6, run 4. Slope = 6/4 = 3/2. Now do yours."]);
  };
  const readSI = () => {
    const mm = nz0(-6, 6), b = nz0(-9, 9), t = ri(0, 3), eq = `y = ${cf(mm, "x")} ${sgn(b)}`;
    if (t === 0) return N(`In the equation ${eq}, what is the slope?`, mm, ["The equation is in the form y = mx + b. One of those letters is the slope.", "m is the number multiplied by x. Watch its sign.", "Example: in y = 4x − 3 the slope is 4. In y = −2x + 5 the slope is −2. Now do yours."]);
    if (t === 1) return N(`In the equation ${eq}, what is the y-intercept (the y value where the line crosses the y-axis)?`, b, ["The equation is in the form y = mx + b. One of those letters is the y-intercept.", "b is the plain number added or subtracted at the end. It keeps its sign.", "Example: in y = 4x − 3 the y-intercept is −3. Now do yours."]);
    const w = pick([["A taxi ride costs a flat fee plus a price for every mile: y = {m}x + {b}. What is the price per mile?", "m"], ["A plant grows every week: y = {m}x + {b}, where x is weeks and y is height in cm. How many cm does it grow each week?", "m"], ["A gym charges a signup fee plus monthly cost: y = {m}x + {b}, where x is months. What is the signup fee in dollars?", "b"], ["A tank has some water in it already: y = {m}x + {b}, where x is minutes. How many liters were in it at the start?", "b"]]);
    const a1 = ri(2, 9), b1 = ri(2, 30);
    return Q(w[0].replace("{m}", a1).replace("{b}", b1), w[1] === "m" ? a1 : b1, ["In y = mx + b, m is the rate (the change for each x) and b is the starting value (when x = 0).", w[1] === "m" ? "Which number is multiplied by x? That number is the rate of change." : "Which number is added with no x next to it? That is the number at the start.", "Example: y = 3x + 10 means 3 per step (slope) and 10 at the start (intercept). Now find yours."]);
  };
  const writeSI = () => {
    const mm = nz0(-6, 6), b = nz0(-9, 9), ans = `y = ${cf(mm, "x")} ${sgn(b)}`;
    const wr = [`y = ${cf(b, "x")} ${sgn(mm)}`, `y = ${cf(mm, "x")} ${sgn(-b)}`, `y = ${cf(-mm, "x")} ${sgn(b)}`, `y = ${cf(-mm, "x")} ${sgn(-b)}`, `y = ${cf(mm + 1, "x")} ${sgn(b)}`];
    if (Math.random() < 0.5) return C(`A line has slope ${m(mm)} and y-intercept ${m(b)}. Which equation is it?`, ans, wr, ["Use the form y = mx + b. Decide which given number is m and which is b.", "The slope goes right next to x. The y-intercept is the number added (or subtracted) at the end.", "Example: slope 2 and y-intercept −3 gives y = 2x − 3. Now do yours."]);
    return C(`A line crosses the y-axis at ${pt(0, b)}. Each time x goes up by 1, y goes ${mm > 0 ? "up" : "down"} by ${Math.abs(mm)}. Which equation is it?`, ans, wr, ["Use y = mx + b. The point where the line crosses the y-axis gives you one of the numbers.", `The change in y for each step of 1 in x is the slope. Going down means the slope is negative.`, "Example: crosses at (0, 4) and goes down 3 for each 1 to the right: y = −3x + 4. Now do yours."]);
  };
  const compareRates = () => {
    const kA = ri(2, 9), n = ri(2, 6), same = Math.random() < 0.2, kB = same ? kA : kA + nz0(-2, 2);
    if (kB < 1) return compareRates();
    const ans = kA === kB ? "They are the same" : kA < kB ? "Store A" : "Store B";
    return C(`Store A sells grapes at the rate y = ${kA}x, where x is pounds and y is dollars. At Store B, ${n} pounds of grapes cost $${n * kB}. Which store has the LOWER price per pound?`, ans, ["Store A", "Store B", "They are the same"].filter(x => x !== ans), ["To compare, find the price for ONE pound at each store.", "In y = kx, the number k is the price per pound. At the other store, divide the cost by the pounds.", "Example: Store C has y = 3x. Store D sells 4 pounds for $16, so $4 per pound. Store C is cheaper per pound. Now do yours."]);
  };
  const interceptQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const mm = nz0(-5, 5), x0 = nz0(-6, 6), b = -mm * x0; return N(`Where does the line y = ${cf(mm, "x")} ${sgn(b)} cross the x-axis? Give the x value.`, x0, ["On the x-axis, the y value is zero.", "Put y = 0 into the equation and solve for x.", "Example: y = 2x − 6. Let y = 0: 0 = 2x − 6, so 2x = 6 and x = 3. Now do yours."]); }
    const A = ri(2, 6), B = ri(2, 6), x0 = ri(1, 6), y0 = ri(1, 6), Cc = A * B * ri(1, 4);
    if (t === 1) return Q(`Find the x-intercept of the line ${A}x + ${B}y = ${Cc}. Give the x value.`, Cc / A, ["The x-intercept is where the line crosses the x-axis. There, y = 0.", "Put y = 0 into the equation. Then divide both sides by the number in front of x.", "Example: 3x + 4y = 24. Let y = 0: 3x = 24, so x = 8. Now do yours."]);
    return Q(`Find the y-intercept of the line ${A}x + ${B}y = ${Cc}. Give the y value.`, Cc / B, ["The y-intercept is where the line crosses the y-axis. There, x = 0.", "Put x = 0 into the equation. Then divide both sides by the number in front of y.", "Example: 3x + 4y = 24. Let x = 0: 4y = 24, so y = 6. Now do yours."]);
  };
  const l17 = [
    L("Multiplying powers", prodRule, [S("Same base", "x² × x³", "x² = x·x and x³ = x·x·x. Together that is 5 x's."), S("Rule", "x² × x³ = x⁵", "Keep the base, ADD the exponents."), S("Careful", "same base only", "The rule works only when the bases are the same.")]),
    L("Dividing powers", quotRule, [S("Cancel", "x⁵ ÷ x² ", "Two x's on the bottom cancel two on the top."), S("Rule", "x⁵ ÷ x² = x³", "Keep the base, SUBTRACT the exponents."), S("Check", "x³ × x² = x⁵ ✅", "Multiply back to check.")]),
    L("Power of a power", powPow, [S("Repeat", "(x²)³", "(x²)³ = x² × x² × x²."), S("Rule", "(x²)³ = x⁶", "Keep the base, MULTIPLY the exponents."), S("Compare", "add or multiply?", "Same base multiplied: add. Power of a power: multiply.")]),
    L("Zero and negative exponents", zeroNeg, [S("Zero", "5⁰ = 1", "Any number (except 0) to the power 0 is 1."), S("Negative", "2⁻³ = 1/2³", "A negative exponent means 1 over the positive power."), S("Not negative", "2⁻³ = 1/8", "A negative exponent does not make the answer negative.")]),
    L("Square roots", sqrtQ, [S("Undo squaring", "√49 = 7", "A square root asks what number times itself makes this number."), S("Perfect squares", "1, 4, 9, 16, 25, 36, 49", "These are squares of whole numbers."), S("Solve", "x² = 49", "Take the square root. x = 7 (or −7).")]),
    L("Cube roots", cubeRootQ, [S("Undo cubing", "∛27 = 3", "A cube root asks what number times itself three times makes this number."), S("Perfect cubes", "1, 8, 27, 64, 125", "These are cubes of whole numbers."), S("Negatives", "∛(−8) = −2", "Cube roots of negative numbers are negative.")]),
    L("Estimating square roots", estRoot, [S("Sandwich", "√30", "Find the perfect squares on each side: 25 and 36."), S("Between", "5 < √30 < 6", "So √30 is between 5 and 6."), S("Closer to", "30 is nearer 25", "So √30 is closer to 5.")]),
    L("Scientific notation", sciWrite, [S("Big numbers", "4.5 × 10⁴ = 45,000", "Move the decimal right. Positive exponent."), S("Small numbers", "0.0045 = 4.5 × 10⁻³", "Move the decimal left. Negative exponent."), S("Rule", "1 ≤ number < 10", "The front number must be at least 1 and less than 10.")]),
    L("Calculating with scientific notation", sciOps, [S("Multiply", "(2×10³)(3×10²) = 6×10⁵", "Multiply the front numbers. ADD the exponents."), S("Divide", "(8×10⁶)÷(2×10²) = 4×10⁴", "Divide the front numbers. SUBTRACT the exponents."), S("Tidy up", "keep it between 1 and 10", "If the front number gets to 10 or more, shift the decimal.")]),
    L("Rational or irrational?", rationalQ, [S("Rational", "1/2, 0.75, 4, √9", "Can be written as a fraction. Decimals end or repeat."), S("Irrational", "√2, π", "Cannot be written as a fraction. The decimal never ends and never repeats."), S("Tip", "√ of non-squares", "The square root of a number that is not a perfect square is irrational.")]),
    L("Variables on both sides", bothSides, [S("Both sides", "5x + 2 = 2x + 14", "There are x terms on each side."), S("Collect", "3x + 2 = 14", "Subtract 2x from both sides."), S("Solve", "x = 4", "Subtract 2, then divide by 3.")]),
    L("Equations with parentheses (harder)", distEq, [S("Distribute", "3(x + 2)", "Multiply the outside by each term inside: 3x + 6."), S("Combine", "3x + 6 = x + 12", "Combine like terms."), S("Solve", "2x = 6 → x = 3", "Collect the x terms and solve.")]),
    L("How many solutions?", numSol, [S("One", "x = 3", "Most equations give one answer."), S("None", "1 = 5", "If the x's cancel and the numbers are different, there is NO solution."), S("Infinite", "7 = 7", "If both sides end up the same, EVERY number works.")]),
    L("Slope from two points", slopeTwo, [S("Rise over run", "rise ÷ run", "Slope = change in y ÷ change in x."), S("Subtract", "(y₂ − y₁) ÷ (x₂ − x₁)", "Subtract in the same order for y and x."), S("Meaning", "up = +, down = −", "Lines that go up to the right have positive slope; lines that go down have negative slope.")]),
    L("Slope-intercept form", readSI, [S("The form", "y = mx + b", "m is the slope. b is the y-intercept."), S("Read it", "y = 3x − 2", "Slope 3, y-intercept −2."), S("Stories", "rate and start", "m is the rate of change. b is the starting amount.")]),
    L("Writing y = mx + b", writeSI, [S("Two numbers", "m and b", "You need the slope and the y-intercept."), S("Plug in", "m = 2, b = −3", "Put them into y = mx + b."), S("Result", "y = 2x − 3", "Keep the signs.")]),
    L("Comparing proportional relationships", compareRates, [S("Unit rate", "y = kx", "In y = kx, k is the rate for 1 unit."), S("From a point", "$16 for 4", "Divide to find the rate for 1."), S("Compare", "lower or higher", "Put both rates side by side and compare.")]),
    L("Intercepts", interceptQ, [S("x-intercept", "y = 0", "The line crosses the x-axis where y is 0."), S("y-intercept", "x = 0", "The line crosses the y-axis where x is 0."), S("Solve", "3x + 4y = 24", "Put 0 in for one variable and solve for the other.")])
  ];
  l17.push(mixOf("Mixed practice", [l17[0], l17[1], l17[2], l17[3], l17[4], l17[5], l17[10]]));
  l17.push(mixOf("Level 17 Challenge", [l17[6], l17[7], l17[8], l17[9], l17[11], l17[12], l17[13], l17[14], l17[15], l17[16], l17[17]]));

  // ================= LEVEL 18 =================
  const trips = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [9, 40, 41], [20, 21, 29]];
  const pyHyp = () => {
    const [a, b, c] = pick(trips), t = ri(0, 3);
    const hs = ["In a right triangle, the two short sides (legs) squared and added equal the long side (hypotenuse) squared: a² + b² = c².", "Square each leg and add them. Then take the square root of the total.", "Example: legs 6 and 8. 36 + 64 = 100. √100 = 10. Now do yours."];
    if (t === 0) return Q(`A right triangle has legs of ${a} and ${b}. How long is the hypotenuse?`, c, hs);
    if (t === 1) return Q(`A ladder's foot is ${a} m from a wall, and the ladder reaches ${b} m up the wall. How long is the ladder? (in meters)`, c, hs);
    if (t === 2) return Q(`A screen is ${a} cm wide and ${b} cm tall. How long is its diagonal? (in cm)`, c, hs);
    return Q(`You walk ${a} km east and then ${b} km north. How far in a straight line are you from where you began? (in km)`, c, hs);
  };
  const pyLeg = () => {
    const [a, b, c] = pick(trips), sw = Math.random() < 0.5, k = sw ? a : b, ans = sw ? b : a, t = ri(0, 1);
    const hs = ["The hypotenuse is the longest side. Use a² + b² = c², with c the hypotenuse.", "Square the hypotenuse and subtract the square of the leg you know. Then take the square root.", "Example: hypotenuse 10, one leg 6. 100 − 36 = 64. √64 = 8. Now do yours."];
    if (t === 0) return Q(`A right triangle has a hypotenuse of ${c} and one leg of ${k}. How long is the other leg?`, ans, hs);
    return Q(`A ${c} m ladder leans on a wall. Its foot is ${k} m from the wall. How high up the wall does it reach? (in meters)`, ans, hs);
  };
  const rightTest = () => {
    const want = pick(["Right", "Acute", "Obtuse"]);
    let s;
    for (let i = 0; i < 400; i++) {
      if (want === "Right") { const [a, b, c] = pick(trips), k = pick([1, 1, 2]); s = [a * k, b * k, c * k]; break; }
      const a = ri(3, 12), b = ri(3, 12), c = ri(Math.max(a, b), a + b - 1), z = [a, b, c].sort((x, y) => x - y);
      const d = z[0] ** 2 + z[1] ** 2 - z[2] ** 2;
      if (z[0] + z[1] > z[2] && (want === "Acute" ? d > 0 : d < 0)) { s = z; break; }
    }
    s = s || [3, 4, 5];
    const [x, y, z] = s, d = x * x + y * y - z * z, ans = d === 0 ? "Right" : d > 0 ? "Acute" : "Obtuse";
    return C(`A triangle has sides ${x}, ${y} and ${z}. Is it a right, acute or obtuse triangle?`, ans, ["Right", "Acute", "Obtuse"], ["Compare the squares of the sides. Use the longest side as c.", "Add the squares of the two shorter sides and compare to the square of the longest. Equal means right. If a² + b² is bigger, the triangle is pointy (acute). If it is smaller, it is wide (obtuse).", "Example: 5, 6, 7: 25 + 36 = 61 and 49 is smaller than 61, so acute. And 2, 3, 4: 4 + 9 = 13 is less than 16, so obtuse. Now do yours."]);
  };
  const distPts = () => {
    const [a, b, c] = pick(trips.slice(0, 6)), sx = Math.random() < 0.5 ? 1 : -1, sy = Math.random() < 0.5 ? 1 : -1, x1 = ri(-4, 4), y1 = ri(-4, 4), sw = Math.random() < 0.5;
    const dx = sw ? a : b, dy = sw ? b : a;
    return Q(`What is the distance between ${pt(x1, y1)} and ${pt(x1 + sx * dx, y1 + sy * dy)}?`, c, ["Draw a right triangle: one leg goes across, the other goes up or down. The distance is the hypotenuse.", "Find the horizontal and vertical differences, square them, add them, and take the square root.", "Example: (0, 0) and (6, 8). Differences 6 and 8. 36 + 64 = 100. √100 = 10. Now do yours."]);
  };
  const cylQ = () => {
    const r = ri(2, 9), h = ri(2, 12), t = ri(0, 2);
    if (t === 0) return Q(`A cylinder has a radius of ${r} cm and a height of ${h} cm. Its volume is ____ × π cubic cm. What number goes in the blank?`, r * r * h, ["The volume of a cylinder is the area of the circle on the bottom times the height.", "V = π × r × r × h. Leave π as a symbol and multiply the other numbers.", "Example: r = 3, h = 5. 3 × 3 × 5 = 45, so V = 45π. Now do yours."]);
    if (t === 1) return Q(`A cylinder has a diameter of ${2 * r} cm and a height of ${h} cm. Its volume is ____ × π cubic cm. What number goes in the blank?`, r * r * h, ["The formula uses the radius. How is the radius related to the diameter?", "Halve the diameter to get r. Then multiply r × r × h.", "Example: diameter 6, h = 5. r = 3. 3 × 3 × 5 = 45, so V = 45π. Now do yours."]);
    return Q(`A cylinder has a radius of ${r} cm and a volume of ${r * r * h}π cubic cm. How tall is it? (in cm)`, h, ["V = π × r × r × h. You know V and r, so you can find h.", "Divide the number in front of π by r × r.", "Example: r = 3, V = 45π. 45 ÷ 9 = 5. The height is 5. Now do yours."]);
  };
  const coneQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const r = ri(2, 9), h = 3 * ri(1, 6); return Q(`A cone has a radius of ${r} cm and a height of ${h} cm. Its volume is ____ × π cubic cm. What number goes in the blank?`, r * r * h / 3, ["A cone is one-third of a cylinder with the same base and height.", "V = ⅓ × π × r × r × h. Multiply r × r × h, then divide by 3.", "Example: r = 3, h = 6. 3 × 3 × 6 = 54. 54 ÷ 3 = 18, so V = 18π. Now do yours."]); }
    if (t === 1) { const r = ri(2, 6), h = 3 * ri(1, 5); return Q(`A cone has a volume of ${r * r * h / 3}π cubic cm and a radius of ${r} cm. How tall is it? (in cm)`, h, ["V = ⅓ × π × r × r × h. You know V and r.", "Multiply the number in front of π by 3, then divide by r × r.", "Example: V = 18π, r = 3. 18 × 3 = 54. 54 ÷ 9 = 6. The height is 6. Now do yours."]); }
    const k = 3 * ri(2, 30); return Q(`A cylinder has a volume of ${k}π cubic cm. A cone has the same base and the same height. The cone's volume is ____ × π cubic cm. What number goes in the blank?`, k / 3, ["The cone and the cylinder share the same base and the same height.", "A cone holds exactly one-third as much as the cylinder.", "Example: a cylinder of 60π gives a cone of 20π. Now do yours."]);
  };
  const sphereQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const r = pick([3, 6, 9]); return Q(`A sphere has a radius of ${r} cm. Its volume is ____ × π cubic cm. What number goes in the blank?`, 4 * r ** 3 / 3, ["The volume of a sphere is four-thirds times π times the radius cubed.", "V = ⁴⁄₃ × π × r × r × r. Multiply r × r × r, then multiply by 4 and divide by 3.", "Example: r = 3. 3 × 3 × 3 = 27. 27 × 4 = 108. 108 ÷ 3 = 36, so V = 36π. Now do yours."]); }
    if (t === 1) { const r = ri(2, 12); return Q(`A sphere has a radius of ${r} cm. Its surface area is ____ × π square cm. What number goes in the blank? (Surface area = 4 × π × r × r)`, 4 * r * r, ["The surface area formula is given for you: 4 × π × r × r.", "Multiply r by itself, then multiply by 4.", "Example: r = 5. 5 × 5 = 25. 25 × 4 = 100, so SA = 100π. Now do yours."]); }
    const r = pick([3, 6, 9]); return Q(`A sphere has a diameter of ${2 * r} cm. Its volume is ____ × π cubic cm. What number goes in the blank?`, 4 * r ** 3 / 3, ["The formula uses the radius. Halve the diameter first.", "V = ⁴⁄₃ × π × r × r × r.", "Example: diameter 6, so r = 3. 3 × 3 × 3 = 27. 27 × 4 ÷ 3 = 36, so V = 36π. Now do yours."]);
  };
  const distinctXY = () => { let x, y; do { x = nz0(-8, 8); y = nz0(-8, 8); } while (Math.abs(x) === Math.abs(y)); return [x, y]; };
  const translate = () => {
    const [x, y] = distinctXY(), dx = nz0(-6, 6), dy = nz0(-6, 6);
    return C(`Point P is at ${pt(x, y)}. It is translated ${Math.abs(dx)} units ${dx > 0 ? "right" : "left"} and ${Math.abs(dy)} units ${dy > 0 ? "up" : "down"}. Where is the new point?`, pt(x + dx, y + dy), [pt(x + dx, y - dy), pt(x - dx, y + dy), pt(x + dy, y + dx), pt(x - dx, y - dy)], ["A translation slides every point the same way. Right and left change x. Up and down change y.", "Right or up means add. Left or down means subtract. Change x first, then y.", "Example: (2, 1) moved 3 left and 4 up becomes (2 − 3, 1 + 4) = (−1, 5). Now do yours."]);
  };
  const reflect = () => {
    const [x, y] = distinctXY(), t = ri(0, 1), ans = t === 0 ? pt(x, -y) : pt(-x, y);
    return C(`Point P is at ${pt(x, y)}. It is reflected across the ${t === 0 ? "x-axis" : "y-axis"}. Where is the new point?`, ans, [t === 0 ? pt(-x, y) : pt(x, -y), pt(-x, -y), pt(y, x), pt(-y, -x)], ["A reflection flips the point over the line, like a mirror. The mirror line stays put.", t === 0 ? "Flipping over the x-axis moves the point to the other side vertically. One coordinate changes sign and the other stays the same." : "Flipping over the y-axis moves the point to the other side horizontally. One coordinate changes sign and the other stays the same.", "Example: (3, 2) reflected across the x-axis is (3, −2). Across the y-axis it is (−3, 2). Now do yours."]);
  };
  const rotateQ = () => {
    const [x, y] = distinctXY(), t = ri(0, 2), nm = ["90° counterclockwise", "90° clockwise", "180°"][t], ans = [pt(-y, x), pt(y, -x), pt(-x, -y)][t];
    const rule = ["(x, y) becomes (−y, x)", "(x, y) becomes (y, −x)", "(x, y) becomes (−x, −y)"][t];
    return C(`Point P is at ${pt(x, y)}. It is rotated ${nm} about the origin. Where is the new point?`, ans, [pt(-y, x), pt(y, -x), pt(-x, -y), pt(x, -y), pt(-x, y)], ["Rotating turns the point around the origin. Picture a clock hand turning.", "There is a rule for this turn: " + rule + ". Use it carefully with signs.", "Example: (2, 5) rotated 180° is (−2, −5). Rotated 90° counterclockwise it is (−5, 2). Now do yours."]);
  };
  const dilate = () => {
    const t = ri(0, 2);
    if (t === 0) { const [x, y] = distinctXY(), k = ri(2, 4); return C(`Point P is at ${pt(x, y)}. It is dilated from the origin by a scale factor of ${k}. Where is the new point?`, pt(k * x, k * y), [pt(x + k, y + k), pt(k * x, y), pt(x, k * y), pt(k * x, k * y + k)], ["A dilation stretches the figure away from the origin (or shrinks it) by the scale factor.", "Multiply BOTH coordinates by the scale factor.", "Example: (2, −3) with scale factor 3 becomes (6, −9). Now do yours."]); }
    if (t === 1) { const s = ri(2, 8), f = pick([2, 3, 4, 5, 0.5, 0.25]), n = s * f; if (!Number.isInteger(n)) return dilate(); return Q(`A shape is dilated. A side of length ${s} becomes a side of length ${n}. What is the scale factor? (Type a number or a decimal.)`, f, ["The scale factor compares a new side to the matching old side.", "Divide the NEW length by the OLD length.", "Example: a side of 4 becomes 10. 10 ÷ 4 = 2.5. Now do yours."]); }
    const f = ri(2, 5), A = ri(2, 12); return Q(`A shape has an area of ${A} square cm. It is dilated by a scale factor of ${f}. What is the area of the new shape in square cm?`, A * f * f, ["When all lengths are scaled by a factor, the AREA is scaled by that factor TWICE (length × width).", "Multiply the old area by the scale factor squared.", "Example: area 3, scale factor 2. 2 × 2 = 4. New area = 3 × 4 = 12. Now do yours."]);
  };
  const simTri = () => {
    if (Math.random() < 0.5) {
      const k = pick([2, 3, 4, 5, 1.5, 2.5]), a = 2 * ri(2, 8), b = 2 * ri(2, 8);
      return Q(`Two triangles are similar. In the small triangle two sides are ${a} and ${b}. In the big triangle the side matching ${a} is ${a * k}. How long is the side matching ${b}?`, b * k, ["Similar shapes have the same shape but different sizes. All sides are scaled by the same number.", "Find the scale factor: new side ÷ old side. Then multiply the other side by it.", "Example: sides 4 and 6 match 10 and ?. The scale factor is 10 ÷ 4 = 2.5. 6 × 2.5 = 15. Now do yours."]);
    }
    const [p, q] = pick([[2, 3], [3, 2], [4, 3], [3, 4], [5, 4], [5, 2]]), u = ri(1, 4), v = ri(2, 8);
    return Q(`A ${p * u} m pole casts a shadow of ${q * u} m. At the same time, a tree casts a shadow of ${q * v} m. How tall is the tree? (in meters)`, p * v, ["The sun makes similar triangles with the pole and the tree: the same shape, different sizes.", "Find how many times longer the tree's shadow is than the pole's shadow. The tree is that many times taller.", "Example: a 2 m post has a 3 m shadow. A tree with a 12 m shadow is 4 times as long, so the tree is 2 × 4 = 8 m tall. Now do yours."]);
  };
  const transversal = () => {
    let a; do { a = ri(40, 140); } while (a === 90);
    const rels = [["corresponding angle", a, "Corresponding angles are in the same spot at each crossing. They are equal."], ["alternate interior angle", a, "Alternate interior angles are on opposite sides of the transversal, between the lines. They are equal."], ["alternate exterior angle", a, "Alternate exterior angles are on opposite sides of the transversal, outside the lines. They are equal."], ["vertical angle", a, "Vertical angles are across from each other. They are equal."], ["same-side interior angle (they are on the same side of the transversal, between the two parallel lines)", 180 - a, "Same-side interior angles add up to 180°."], ["neighbor on a straight line (a linear pair)", 180 - a, "Angles that form a straight line add up to 180°."]];
    const r = pick(rels);
    return Q(`Two parallel lines are cut by a transversal. Angle 1 measures ${a}°. Angle 2 is its ${r[0]}. How many degrees is angle 2?`, r[1], ["Parallel lines and a crossing line make a few special angle pairs. Some are equal and some add up to 180°.", r[2] + " Use the rule to decide whether to copy the angle or subtract from 180.", "Example: if angle 1 is 70°, its corresponding angle is 70°, and its linear-pair neighbor is 180 − 70 = 110°. Now do yours."]);
  };
  const triAngles = () => {
    const t = ri(0, 2);
    if (t === 0) { const [p, q, r] = pick([[1, 2, 3], [2, 3, 4], [1, 1, 2], [3, 4, 5], [1, 2, 6], [2, 3, 5], [1, 4, 5]]), s = p + q + r; return Q(`The three angles of a triangle measure ${cf(p, "x")}°, ${cf(q, "x")}° and ${cf(r, "x")}°. What is x?`, 180 / s, ["The three angles of a triangle always add up to the same total.", "Add the x terms together and set the sum equal to 180. Then divide.", "Example: x, 2x and 3x. 6x = 180, so x = 30. Now do yours."]); }
    if (t === 1) { const a = ri(20, 80), b = ri(20, 80); return Q(`In a triangle, two angles inside are ${a}° and ${b}°. What is the exterior angle at the third corner? (the angle outside, formed by extending a side)`, a + b, ["An exterior angle is the angle outside the triangle, next to one inside angle.", "The exterior angle equals the sum of the two inside angles that are NOT next to it.", "Example: inside angles 50° and 60° give an exterior angle of 110° at the other corner. Now do yours."]); }
    const a = ri(20, 80), b = ri(20, 80); return Q(`An exterior angle of a triangle is ${a + b}°. One of the two far-away inside angles is ${a}°. What is the other far-away inside angle?`, b, ["The exterior angle equals the sum of the two far-away inside angles.", "Subtract the angle you know from the exterior angle.", "Example: exterior 110°, one inside angle 50°. 110 − 50 = 60°. Now do yours."]);
  };
  const sysSub = () => {
    let x, y, p, q, r, s;
    do { x = nz0(-6, 8); y = nz0(-6, 8); p = nz0(-4, 4); q = y - p * x; r = ri(1, 4); s = r * x + y; } while (q === 0 || r + p === 0);
    const wantX = Math.random() < 0.5;
    return N(`Solve the system:<br>y = ${cf(p, "x")} ${sgn(q)}<br>${cf(r, "x")} + y = ${m(s)}<br>What is ${wantX ? "x" : "y"}?`, wantX ? x : y, ["One equation already says what y equals. Put that expression in for y in the other equation.", "After substituting, you have an equation with only x. Solve it. Then use the first equation to find y.", "Example: y = 2x and x + y = 12. Substitute: x + 2x = 12, so 3x = 12 and x = 4. Then y = 8. Now do yours."]);
  };
  const sysElim = () => {
    let x, y;
    do { x = nz0(-6, 8); y = nz0(-6, 8); } while (false);
    if (Math.random() < 0.5) {
      const p = ri(1, 5), q = ri(1, 5), s1 = p * x + y, s2 = q * x - y, wantX = Math.random() < 0.5;
      return N(`Solve the system:<br>${cf(p, "x")} + y = ${m(s1)}<br>${cf(q, "x")} − y = ${m(s2)}<br>What is ${wantX ? "x" : "y"}?`, wantX ? x : y, ["Look at the y terms. One is +y and the other is −y.", "Add the two equations together. The y terms cancel and you can solve for x. Then put x in an equation to find y.", "Example: x + y = 9 and 3x − y = 7. Adding: 4x = 16, so x = 4. Then y = 5. Now do yours."]);
    }
    let b, c; do { b = ri(1, 5); c = ri(1, 5); } while (b === c);
    const s1 = x + b * y, s2 = x + c * y, wantX = Math.random() < 0.5;
    return N(`Solve the system:<br>x + ${cf(b, "y")} = ${m(s1)}<br>x + ${cf(c, "y")} = ${m(s2)}<br>What is ${wantX ? "x" : "y"}?`, wantX ? x : y, ["Both equations have the same x term. Subtracting one equation from the other will cancel x.", "Subtract the equations. You get an equation with only y. Solve it, then put y back to find x.", "Example: x + 2y = 11 and x + 5y = 20. Subtract: 3y = 9, so y = 3. Then x = 5. Now do yours."]);
  };
  const funcQ = () => {
    const t = ri(0, 3);
    if (t === 0) { const mm = nz0(-5, 6), b = nz0(-9, 9), x = nz0(-6, 8); return N(`If f(x) = ${cf(mm, "x")} ${sgn(b)}, what is f(${m(x)})?`, mm * x + b, ["f(x) is a function rule. The number in the parentheses is the input that replaces x.", "Put the input in place of x everywhere in the rule, then calculate. Be careful with negatives.", "Example: f(x) = 3x − 2. f(4) = 3 × 4 − 2 = 10. Now do yours."]); }
    if (t === 1) { const c = nz0(-9, 9), a = ri(1, 3), x = nz0(-5, 5); return N(`If f(x) = ${a === 1 ? "" : a}x<sup>2</sup> ${sgn(c)}, what is f(${m(x)})?`, a * x * x + c, ["Put the input in place of x. The exponent only applies to x.", "Square the input first (a negative squared is positive). Then multiply, then add or subtract.", "Example: f(x) = 2x² + 1. f(−3) = 2 × 9 + 1 = 19. Now do yours."]); }
    if (t === 2) { const mm = ri(2, 6), b = nz0(-9, 9), x = nz0(-6, 8); return N(`The function is f(x) = ${mm}x ${sgn(b)}. For what input x is f(x) = ${m(mm * x + b)}?`, x, ["This time you know the OUTPUT and need the input.", "Set the rule equal to the output and solve the equation for x.", "Example: f(x) = 3x + 2 and f(x) = 14. 3x + 2 = 14, so 3x = 12 and x = 4. Now do yours."]); }
    const pairs = n => { const xs = shuf([1, 2, 3, 4, 5, 6, -1, -2, 0]).slice(0, n); return xs.map(x => [x, ri(-4, 9)]); };
    const str = ps2 => "{" + ps2.map(p => `(${m(p[0])}, ${m(p[1])})`).join(", ") + "}";
    const good = () => str(pairs(ri(3, 4)));
    const bad = () => { const p = pairs(3), q = p[0][1]; p.push([p[0][0], q + nz0(-3, 3)]); return str(shuf(p)); };
    const hs = ["A function gives exactly ONE output for each input. Inputs are the first numbers in each pair.", "Look for an x value (the first number) that appears twice with DIFFERENT y values. The same y value used twice is fine.", "Example: {(1, 2), (1, 5)} is not a function because input 1 has two outputs. {(1, 2), (3, 2)} is a function. Now check yours."];
    if (Math.random() < 0.5) return C("Which set of ordered pairs is NOT a function?", bad(), [good(), good(), good()], hs);
    return C("Which set of ordered pairs IS a function?", good(), [bad(), bad(), bad()], hs);
  };
  const twoWay = () => {
    const rows = pick([["Girls", "Boys"], ["6th graders", "7th graders"], ["Cats", "Dogs"]]), cols = pick([["like pizza", "do not"], ["walk", "ride the bus"], ["have a sibling", "have no sibling"]]);
    const rt = pick([10, 20, 25, 50]), a = ri(1, rt - 1), b = rt - a, c = ri(3, 20), d = ri(3, 20), t = ri(0, 3);
    const cell = "border:1px solid #888;padding:4px 10px;text-align:center";
    const tbl = `<table style="border-collapse:collapse;margin:6px auto"><tr><td style="${cell}"></td><td style="${cell}"><b>${cols[0]}</b></td><td style="${cell}"><b>${cols[1]}</b></td></tr><tr><td style="${cell}"><b>${rows[0]}</b></td><td style="${cell}">${a}</td><td style="${cell}">${b}</td></tr><tr><td style="${cell}"><b>${rows[1]}</b></td><td style="${cell}">${c}</td><td style="${cell}">${d}</td></tr></table>`;
    const hint3 = "Example: a table has row 1: 5 and 7; row 2: 3 and 9. The total for row 1 is 5 + 7 = 12; the total for column 1 is 5 + 3 = 8; all together is 24. Now do yours.";
    if (t === 0) return Q(`How many are in the group "${rows[0]}" in all?`, a + b, ["The table counts people in two ways at once. A row holds one group.", "Add the numbers across the row for that group.", hint3], { visual: tbl });
    if (t === 1) return Q(`How many are in the column "${cols[0]}" in all (both rows together)?`, a + c, ["A column holds everyone who matches one answer.", "Add the numbers going down that column.", hint3], { visual: tbl });
    if (t === 2) return Q(`How many are counted in the whole table?`, a + b + c + d, ["Every cell in the table counts someone once.", "Add all four numbers in the table.", hint3], { visual: tbl });
    return Q(`What percent of the "${rows[0]}" group ${cols[0]}? (Type just the number.)`, a * 100 / rt, ["Use only the row for that group. The group's total is the bottom of your fraction.", "Divide the cell in that row by the row total, then multiply by 100.", "Example: row total 20, and 5 of them do it: 5/20 = 25%. Now do yours."], { visual: tbl });
  };
  const l18 = [
    L("Pythagorean theorem: the hypotenuse", pyHyp, [S("Right triangle", "📐", "A right triangle has one 90° corner. The sides next to it are the legs. The longest side is the hypotenuse."), S("The rule", "a² + b² = c²", "Square both legs, add them, and you get the hypotenuse squared."), S("Example", "6, 8 → 10", "36 + 64 = 100, and √100 = 10.")]),
    L("Pythagorean theorem: a missing leg", pyLeg, [S("Rearrange", "a² = c² − b²", "If you know the hypotenuse, subtract the square of the other leg."), S("Example", "c = 10, b = 6", "100 − 36 = 64, and √64 = 8."), S("Check", "6² + 8² = 10²", "Add the squares of the legs to be sure.")]),
    L("Is it a right triangle?", rightTest, [S("Test", "a² + b² vs c²", "Use the longest side as c."), S("Right", "a² + b² = c²", "If they are equal, it is a right triangle."), S("Acute or obtuse", "greater or less", "If a² + b² is greater than c², the triangle is acute. If it is less, the triangle is obtuse.")]),
    L("Distance between points", distPts, [S("Make a triangle", "📍➡️📍", "Draw a horizontal and a vertical line between two points."), S("Legs", "difference in x, in y", "The legs are the differences in x and in y."), S("Distance", "√(dx² + dy²)", "Use the Pythagorean theorem to find the hypotenuse.")]),
    L("Volume of cylinders", cylQ, [S("A can", "🥫", "A cylinder is a stack of circles."), S("Formula", "V = π r² h", "Area of the circle times the height."), S("Leave π", "45π", "Often we write the answer with π in it, such as 45π.")]),
    L("Volume of cones", coneQ, [S("A cone", "🍦", "A cone is a pointy cylinder."), S("Formula", "V = ⅓ π r² h", "It holds one-third of the cylinder with the same base and height."), S("Example", "r = 3, h = 6 → 18π", "9 × 6 = 54, and 54 ÷ 3 = 18.")]),
    L("Spheres", sphereQ, [S("A ball", "⚽", "A sphere is perfectly round."), S("Volume", "V = ⁴⁄₃ π r³", "r × r × r, times 4, divided by 3."), S("Surface area", "SA = 4 π r²", "Square the radius and multiply by 4.")]),
    L("Translations", translate, [S("Slide", "➡️⬆️", "A translation slides a shape without turning or flipping it."), S("Right/left", "x changes", "Right adds to x. Left subtracts from x."), S("Up/down", "y changes", "Up adds to y. Down subtracts from y.")]),
    L("Reflections", reflect, [S("Mirror", "🪞", "A reflection flips a shape over a line."), S("Over the x-axis", "(x, y) → (x, −y)", "The y value changes sign."), S("Over the y-axis", "(x, y) → (−x, y)", "The x value changes sign.")]),
    L("Rotations", rotateQ, [S("Turn", "🔄", "A rotation turns a shape around a point. Here, the origin."), S("180°", "(x, y) → (−x, −y)", "Both coordinates change sign."), S("90°", "counterclockwise (−y, x)", "Clockwise 90° is (y, −x).")]),
    L("Dilations", dilate, [S("Resize", "🔍", "A dilation makes a shape bigger or smaller with the same shape."), S("Scale factor", "new ÷ old", "Bigger than 1 grows. Between 0 and 1 shrinks."), S("Area", "factor²", "Area grows by the scale factor squared.")]),
    L("Similar triangles", simTri, [S("Same shape", "△ ▲", "Similar triangles have equal angles and sides in the same ratio."), S("Scale", "new ÷ old", "Find the scale factor from a pair of matching sides."), S("Shadows", "pole and tree", "Shadows at the same time make similar triangles.")]),
    L("Parallel lines and a transversal", transversal, [S("Crossing line", "═╱═", "A transversal crosses two parallel lines. It makes 8 angles."), S("Equal pairs", "corresponding, alternate", "Corresponding, alternate interior, alternate exterior and vertical angles are equal."), S("Add to 180", "same-side, linear pair", "Same-side interior angles and linear pairs add up to 180°.")]),
    L("Angles in triangles", triAngles, [S("Sum", "180°", "The inside angles of a triangle add up to 180°."), S("Exterior", "outside angle", "An exterior angle equals the two far-away inside angles added."), S("Use algebra", "x + 2x + 3x = 180", "Write an equation and solve.")]),
    L("Systems: substitution", sysSub, [S("Two equations", "y = 2x, x + y = 12", "A system has two equations and one answer for both."), S("Substitute", "x + 2x = 12", "Replace y with what it equals."), S("Finish", "x = 4, y = 8", "Solve, then find the other variable.")]),
    L("Systems: elimination", sysElim, [S("Cancel", "+y and −y", "If two equations have opposite terms, adding them cancels a variable."), S("Or subtract", "same term", "If they have the same term, subtract."), S("Back-solve", "put it in", "Put the answer back into an equation to find the other variable.")]),
    L("Functions", funcQ, [S("A rule", "f(x) = 2x + 1", "A function takes an input x and gives exactly one output."), S("Evaluate", "f(3) = 7", "Put the input in place of x and calculate."), S("One output", "no repeated inputs", "An input can't have two different outputs.")]),
    L("Two-way tables", twoWay, [S("Two ways", "📋", "A two-way table sorts data by two questions at once."), S("Totals", "rows and columns", "Add across a row or down a column for totals."), S("Percent", "part ÷ total", "Use the row or column total as the whole.")])
  ];
  l18.push(mixOf("Mixed practice", [l18[0], l18[1], l18[3], l18[4], l18[7], l18[8], l18[13]]));
  l18.push(mixOf("Level 18 Challenge", [l18[2], l18[5], l18[6], l18[9], l18[10], l18[11], l18[12], l18[14], l18[15], l18[16], l18[17]]));

  Object.assign(MATH_LEVELS, { 16: l16, 17: l17, 18: l18 });
})();
