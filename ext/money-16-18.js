// ext/money-16-18.js  Mind Lab Money Skills levels 16-18 (60 lessons)
(() => {
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const D = x => (Number.isInteger(x) ? "$" + x : "$" + x.toFixed(2));
  const r2 = x => +x.toFixed(2);
  const re = a => new RegExp("(?<![\\d.])" + String(a).replace(/\./g, "\\.") + "(?![\\d])");
  const ex = (fn, a) => { let r, i = 0; do { r = fn(); } while (re(a).test(r) && ++i < 150); return r; };
  const q = (text, a, h1, h2, exFn, more) => Object.assign({ text, answer: a, hints: [h1, h2, ex(exFn, a)] }, more || {});
  const mcq = (text, a, w, h1, h2, h3, more) => Object.assign({ text, choices: shuf([a, ...w]), answer: a, hints: [h1, h2, typeof h3 === "function" ? h3() : h3] }, more || {});
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides.map(s => S(s[0], s[1], s[2])); return { title, make }; };
  const mixOf = (title, lessons) => {
    const f = () => pick(lessons).make();
    f.teach = () => {
      const s = [S("Review time!", "🔄", "This lesson mixes ideas you have learned. Here is a quick reminder of each one, then the quiz.")];
      lessons.forEach(l => s.push(l.make.teach()[0]));
      return s;
    };
    return { title, make: f };
  };
  // multiple choice lesson from items [question, right, [wrongs], hint1, hint2]
  const mcL = (title, items, h3, slides) => L(title, () => { const it = pick(items); return mcq(it[0], it[1], it[2], it[3], it[4], h3); }, slides);
  const tm = m => { const h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? "PM" : "AM", h12 = h % 12 === 0 ? 12 : h % 12; return h12 + ":" + String(mm).padStart(2, "0") + " " + ap; };
  const nm0 = () => pick(NM);

  // ======================= LEVEL 16 (7th grade, second half) =======================
  const l16 = [];
  l16.push(L("The multiplier shortcut", () => {
    const k = ri(0, 2), p = pick([20, 40, 60, 80, 100, 120, 200, 240]), nm = pick(NM);
    if (k === 0) { const r = pick([5, 10, 15, 25]); return q(`${nm} buys a game for $${p}. Sales tax is ${r}%. Use the multiplier ${r2(1 + r / 100)}. What is the total in dollars?`, r2(p * (1 + r / 100)),
      "Adding a percent is the same as multiplying by one number. The multiplier is already given.", "Multiply the price by the multiplier. You do not need a separate tax step.",
      () => { const a = pick([20, 40, 60]), r = pick([10, 20]); return `Example: $${a} with ${r}% tax. The multiplier is ${r2(1 + r / 100)}. ${a} × ${r2(1 + r / 100)} = ${r2(a * (1 + r / 100))}. Now do yours.`; }); }
    if (k === 1) { const r = pick([10, 20, 25, 30, 40, 50]); return q(`A jacket costs $${p}. It is ${r}% off. Use the multiplier ${r2(1 - r / 100)}. What is the sale price in dollars?`, r2(p * (1 - r / 100)),
      "Taking a percent off is the same as multiplying by one number. The multiplier is given.", "Multiply the original price by the multiplier to get the new price in one step.",
      () => { const a = pick([20, 40, 60, 80]), r = pick([10, 20, 50]); return `Example: $${a} and ${r}% off. The multiplier is ${r2(1 - r / 100)}. ${a} × ${r2(1 - r / 100)} = ${r2(a * (1 - r / 100))}. Now do yours.`; }); }
    const up = Math.random() < 0.5, r = pick([5, 10, 15, 20, 25, 30]), a = up ? r2(1 + r / 100) : r2(1 - r / 100);
    const wr = up ? [r2(1 - r / 100), r2(r / 100), r2(1 + r / 10)] : [r2(1 + r / 100), r2(r / 100), r2(1 - r / 10)];
    return mcq(`A price ${up ? "goes up" : "goes down"} ${r}%. Which number do you multiply the old price by?`, String(a), wr.map(String),
      up ? "The new price is the whole old price plus a little extra." : "The new price is the whole old price with a little taken away.",
      "Start from 1 (which stands for 100%, the whole price). Then change it by the percent written as a decimal.",
      `Example: a price goes ${up ? "up" : "down"} 40%. 40% is 0.40, so the multiplier is 1 ${up ? "+" : "−"} 0.40 = ${up ? "1.4" : "0.6"}. Now do yours.`);
  }, [["One-step percents", "✖️", "To add 8% tax, multiply by <b>1.08</b>. The 1 keeps the whole price and the 0.08 adds the tax."], ["Percent off", "🏷️", "To take 20% off, multiply by <b>0.80</b>. You keep 100% − 20% = 80% of the price."], ["Tip", "💡", "Multiplier = <b>1 ± the percent as a decimal</b>. Plus for up, minus for down."]]));

  l16.push(L("Percent error", () => {
    const a = 20 * ri(1, 10), pct = pick([5, 10, 15, 20, 25]), d = a * pct / 100, nm = pick(NM), over = Math.random() < 0.5, e = over ? a + d : a - d;
    if (Math.random() < 0.6) return q(`${nm} estimated a trip would cost $${e}. It really cost $${a}. What is the percent error? (Use: difference ÷ real amount × 100)`, pct,
      "Percent error tells how far off the guess was compared with the real amount.", "First find the difference between the guess and the real cost. Then divide by the real cost and write it as a percent.",
      () => { const x = 20 * ri(1, 8), y = pick([5, 10, 20]), dd = x * y / 100; return `Example: guess $${x + dd}, real $${x}. Difference ${dd}. ${dd} ÷ ${x} = ${y / 100}, which is ${y}%. Now do yours.`; });
    return q(`${nm} estimated a trip would cost $${e}. It really cost $${a}. By how many dollars was the estimate off?`, d,
      "You want the size of the gap, not which number is bigger.", "Subtract the smaller number from the larger number.",
      () => { const x = ri(3, 20) * 10, dd = ri(2, 9) * 5 + 1; return `Example: guess $${x + dd}, real $${x}. The gap is ${x + dd} − ${x} = ${dd}. Now do yours.`; });
  }, [["How good was the guess?", "🎯", "<b>Percent error</b> compares a guess with the real amount. It shows how far off you were, as a percent."], ["The steps", "🧮", "1) Find the difference. 2) Divide by the <b>real</b> amount. 3) Multiply by 100. Guess $110, real $100: 10 ÷ 100 = 10%."], ["Why care?", "💡", "Smart planners compare estimates with real costs so the next budget is closer."]]));

  l16.push(L("Interest for months", () => {
    const k = ri(1, 8), r = pick([2, 3, 4, 5, 6]), m = pick([3, 6, 9]), P = 400 * k, nm = pick(NM);
    return q(`${nm} puts $${P} in an account that pays ${r}% simple interest per year. How many dollars of interest after ${m} months?`, r2(P * r / 100 * m / 12),
      "The rate is for a whole year, but the money stays only part of a year.", "Interest for one year = P × rate. Then take the fraction of a year that the money stays: months divided by twelve.",
      () => { const x = 400 * ri(1, 6) + 400, y = pick([2, 5]), mm = pick([3, 6]); return `Example: $${x} at ${y}% for ${mm} months. One year: ${x} × ${y / 100} = ${x * y / 100}. Part of a year: × ${mm}/12 = ${r2(x * y / 100 * mm / 12)}. Now do yours.`; });
  }, [["A year's rate", "📆", "A bank rate such as 4% is usually <b>per year</b>. For less than a year, you earn only a share of it."], ["Months as a fraction", "🧩", "3 months = 3/12 = 1/4 year. 6 months = 1/2 year. 9 months = 3/4 year."], ["Formula", "💡", "<b>Interest = Principal × rate × time</b> (time in years). $800 at 5% for 6 months: 800 × 0.05 × 0.5 = $20."]]));

  l16.push(L("Solve for the unknown", () => {
    const k = ri(0, 3), nm = pick(NM);
    if (k === 0) { const a = ri(2, 12) * 5, b = ri(2, 9) * 2, w = ri(3, 12); return q(`${nm} has $${a} and saves $${b} each week. After how many weeks will ${nm} have $${a + b * w}?`, w,
      "The money grows by the same amount each week. Think of start + (weekly amount × weeks) = goal.", "Take away the starting money from the goal first. Then divide by the weekly amount.",
      () => { const s = ri(2, 8) * 5, x = ri(2, 6), n = ri(3, 9); return `Example: start $${s}, save $${x} a week, goal $${s + x * n}. ${s + x * n} − ${s} = ${x * n}. ${x * n} ÷ ${x} = ${n} weeks. Now do yours.`; }); }
    if (k === 1) { const f = ri(2, 8) * 5, m = ri(2, 9) * 2, n = ri(3, 12); return q(`A gym charges a $${f} sign-up fee plus $${m} each month. ${nm} paid $${f + m * n} in total. For how many months?`, n,
      "The sign-up fee is paid only one time. The monthly price repeats.", "Subtract the sign-up fee from the total. Then divide what is left by the monthly price.",
      () => { const s = ri(2, 6) * 5, x = ri(3, 9), n = ri(2, 8); return `Example: fee $${s}, $${x} a month, total $${s + x * n}. ${s + x * n} − ${s} = ${x * n}; ${x * n} ÷ ${x} = ${n} months. Now do yours.`; }); }
    if (k === 2) { const p = ri(3, 12), fee = ri(2, 6) * 5, n = ri(3, 10); return q(`${nm} orders some posters for $${p} each plus $${fee} shipping. The total is $${fee + p * n}. How many posters were ordered?`, n,
      "Shipping is a one-time cost. Only the posters are bought many times.", "Subtract the shipping from the total. Then divide by the price of one poster.",
      () => { const x = ri(3, 8), s = ri(1, 4) * 5, n = ri(2, 7); return `Example: $${x} each plus $${s} shipping, total $${x * n + s}. ${x * n + s} − ${s} = ${x * n}; ${x * n} ÷ ${x} = ${n}. Now do yours.`; }); }
    const s = ri(2, 12) * 5, b = ri(3, 12), w = ri(3, 10); return q(`${nm} started with $${s} and saved the same amount each week. After ${w} weeks ${nm} has $${s + b * w}. How many dollars were saved each week?`, b,
      "Part of the money was already there at the start. Find what was added.", "Subtract the starting money from the final amount. Then divide by the number of weeks.",
      () => { const a = ri(2, 8) * 5, x = ri(2, 8), n = ri(3, 9); return `Example: start $${a}, after ${n} weeks $${a + x * n}. Added: ${x * n}. ${x * n} ÷ ${n} = $${x} a week. Now do yours.`; });
  }, [["A money equation", "⚖️", "Total = start + (amount each time × number of times). Example: 30 + 5w = 55."], ["Undo the steps", "↩️", "To find <b>w</b>: first subtract the start (55 − 30 = 25), then divide by the amount each time (25 ÷ 5 = 5)."], ["Check", "✅", "Put your answer back in. 30 + 5 × 5 = 55. It works!"]]));

  l16.push(L("When are two plans equal?", () => {
    const x = ri(2, 12), r1 = ri(5, 15), d = ri(2, 6), rb = r1 + d, f2 = ri(0, 6) * 5, f1 = f2 + d * x, k = ri(0, 2);
    const intro = `Plan A: $${f1} to join plus $${r1} a month. Plan B: $${f2} to join plus $${rb} a month.`;
    const exF = () => { const a = ri(3, 8), b = a + ri(2, 4), n = ri(2, 6), f = ri(0, 4) * 5; return `Example: A has fee $${f + (b - a) * n} and $${a}/mo; B has fee $${f} and $${b}/mo. Fee gap ${(b - a) * n}, monthly gap ${b - a}. ${(b - a) * n} ÷ ${b - a} = ${n} months. Now do yours.`; };
    if (k === 0) return q(`${intro} After how many months do both plans cost the same in total?`, x,
      "Plan A starts higher but grows slower. At some month they meet.", "Divide the difference in joining fees by the difference in monthly prices.", exF);
    if (k === 1) return q(`${intro} What is the total cost of either plan at the month when they are equal?`, f1 + r1 * x,
      "First find the month when the two totals match. Then compute one total.", "The plans meet after (fee gap) ÷ (monthly gap) months. Then total = fee + monthly price × months, for either plan.", exF);
    const n = x + ri(1, 6); return mcq(`${intro} ${nm0()} stays ${n} months. Which plan costs less in total?`, "Plan A", ["Plan B", "They cost the same"],
      "Think about when the two plans cost the same, and what happens after that.", "Once past the matching month, the plan with the lower monthly price keeps pulling ahead.",
      "Example: Plan X $20 + $5 a month; Plan Y $0 + $10 a month. They match at 4 months. For 6 months X is cheaper because its monthly price is lower. Now do yours.");
  }, [["Two plans", "📱", "Plan A: big joining fee, small monthly price. Plan B: small fee, bigger monthly price. Which is better depends on <b>how long</b> you stay."], ["The meeting point", "🤝", "They are equal when the extra fee is paid back by the monthly savings: <b>fee gap ÷ monthly gap</b>."], ["Tip", "💡", "Stay longer than the meeting point and the plan with the lower monthly price wins."]]));

  l16.push(L("Flooring cost by area", () => {
    const k = ri(0, 2), a = ri(8, 20), b = ri(6, 16), p = ri(2, 9), nm = pick(NM);
    const exF = () => { const x = ri(4, 12), y = ri(4, 12), z = ri(2, 8); return `Example: a ${x} ft by ${y} ft room at $${z} per square foot. Area = ${x} × ${y} = ${x * y}. Cost = ${x * y} × ${z} = $${x * y * z}. Now do yours.`; };
    if (k === 0) return q(`${nm}'s room is ${a} feet long and ${b} feet wide. What is its area in square feet?`, a * b,
      "Area tells how much floor there is to cover.", "Multiply the length by the width.", () => { const x = ri(4, 12), y = ri(4, 12); return `Example: a ${x} ft by ${y} ft room has area ${x} × ${y} = ${x * y} square feet. Now do yours.`; });
    if (k === 1) return q(`New flooring costs $${p} per square foot. ${nm}'s room is ${a} feet by ${b} feet. What is the total cost in dollars?`, a * b * p,
      "Cost depends on how many square feet you need.", "Find the area first (length × width). Then multiply by the price for each square foot.", exF);
    const sq = a * b; return q(`Flooring costs $${p} per square foot. ${nm} can spend $${sq * p}. How many square feet can ${nm} cover?`, sq,
      "Budget divided by the price of one square foot tells how many you can buy.", "Divide the money by the price for each square foot.", () => { const x = ri(2, 8), n = ri(20, 90); return `Example: $${x * n} at $${x} per square foot. ${x * n} ÷ ${x} = ${n} square feet. Now do yours.`; });
  }, [["Area", "📐", "Area is the number of square units that cover a flat surface. For a rectangle: <b>length × width</b>."], ["Cost by area", "🏠", "Flooring, carpet and tile are priced per <b>square foot</b>. Cost = area × price per square foot."], ["Tip", "💡", "Do it in two steps: area first, then cost. Always write the units."]]));

  l16.push(L("Fence cost by perimeter", () => {
    const k = ri(0, 2), a = ri(6, 20), b = ri(4, 14), p = ri(2, 9), nm = pick(NM);
    if (k === 0) return q(`${nm} fences a garden ${a} ft long and ${b} ft wide on all four sides. Fence costs $${p} per foot. What is the total cost in dollars?`, 2 * (a + b) * p,
      "Fence goes along the edges, all the way around.", "Perimeter = 2 × (length + width). Multiply the perimeter by the price for each foot.",
      () => { const x = ri(4, 12), y = ri(4, 12), z = ri(2, 8); return `Example: ${x} ft by ${y} ft at $${z} per foot. Perimeter = 2 × (${x} + ${y}) = ${2 * (x + y)}. Cost = ${2 * (x + y)} × ${z} = $${2 * (x + y) * z}. Now do yours.`; });
    if (k === 1) return q(`${nm}'s garden is ${a} ft long and ${b} ft wide. One long side is against a wall, so it needs no fence. Fence costs $${p} per foot. What is the cost in dollars?`, (a + 2 * b) * p,
      "Count only the sides that need fence. How many feet is that?", "One long side is not needed, so the fence is one long side plus two short sides. Multiply by the price for each foot.",
      () => { const x = ri(5, 12), y = ri(3, 9), z = ri(2, 6); return `Example: ${x} ft by ${y} ft, one long side free, $${z} a foot. Fence = ${x} + ${y} + ${y} = ${x + 2 * y} ft. Cost = $${(x + 2 * y) * z}. Now do yours.`; });
    const s = ri(3, 12); return q(`${nm} has $${4 * s * p} to buy fence at $${p} per foot for a square pen. How long is each side in feet?`, s,
      "A square has four equal sides.", "Divide the money by the price per foot to get the total feet. Then share that length among the equal sides.",
      () => { const x = ri(2, 8), z = ri(2, 6); return `Example: $${4 * x * z} at $${z} a foot. Total feet = ${4 * x}. Each side = ${4 * x} ÷ 4 = ${x} ft. Now do yours.`; });
  }, [["Perimeter", "🔲", "Perimeter is the distance around a shape. For a rectangle: <b>2 × (length + width)</b>."], ["Fence costs", "🪵", "Fences are priced per foot. Total cost = perimeter × price per foot."], ["Tip", "💡", "If a wall or house already blocks a side, do not pay for that side. Draw it and count the sides you need."]]));

  l16.push(L("Pizza deal: circles", () => {
    const k = ri(0, 2), nm = pick(NM);
    if (k === 0) { const r = ri(2, 10); return q(`A round pizza has a radius of ${r} inches. Use π ≈ 3.14. What is its area in square inches? (Area = π × r × r)`, r2(3.14 * r * r),
      "Area of a circle uses the radius multiplied by itself.", "Multiply the radius by itself first. Then multiply by 3.14.",
      () => { const x = ri(2, 6); return `Example: radius ${x}. ${x} × ${x} = ${x * x}. ${x * x} × 3.14 = ${r2(3.14 * x * x)}. Now do yours.`; }); }
    if (k === 1) { const d = 2 * ri(2, 9); return q(`${nm} orders a round pizza with a diameter of ${d} inches. Use π ≈ 3.14. What is its area in square inches?`, r2(3.14 * (d / 2) * (d / 2)),
      "The diameter goes all the way across. The area formula needs the radius.", "The radius is half the diameter. Then area = 3.14 × radius × radius.",
      () => { const x = 2 * ri(2, 6); return `Example: diameter ${x} means radius ${x / 2}. Area = 3.14 × ${x / 2} × ${x / 2} = ${r2(3.14 * x * x / 4)}. Now do yours.`; }); }
    const d = pick([8, 10, 12, 14, 16, 18, 20]); return mcq(`Which gives you more pizza: one round ${d}-inch pizza, or two round ${d / 2}-inch pizzas?`, `One ${d}-inch pizza`, [`Two ${d / 2}-inch pizzas`, "They are exactly the same"],
      "Area grows with the radius multiplied by itself, not with the radius alone.", "Doubling the width of a circle makes the area much more than double. Compare the areas, not the widths.",
      "Example: a 4-inch pizza has radius 2 and area 3.14 × 4 = 12.56. A 2-inch pizza has radius 1 and area 3.14. Two small ones = 6.28, which is less than 12.56. Now do yours.");
  }, [["Area of a circle", "🍕", "A circle's area = <b>π × radius × radius</b>. We use π ≈ 3.14."], ["Radius or diameter", "↔️", "The radius goes from the middle to the edge. It is <b>half</b> of the diameter."], ["Bigger is a better deal", "💡", "Doubling the width makes the area <b>four times</b> as big. That is why one large pizza can hold more than two small ones."]]));

  l16.push(L("How much paint?", () => {
    const k = ri(0, 2), w = ri(8, 16), h = pick([8, 9, 10]), cut = pick([10, 15, 20, 21]), cover = pick([50, 100, 200]), nm = pick(NM);
    const area = w * h - cut;
    if (k === 0) return q(`A wall is ${w} ft wide and ${h} ft tall. A window and door take up ${cut} square feet. How many square feet need paint?`, area,
      "Paint goes on the wall, not on the window or the door.", "Find the whole wall's area (width × height). Then subtract the area that does not get paint.",
      () => { const x = ri(8, 14), y = pick([8, 9]), c = pick([10, 12, 15]); return `Example: a ${x} by ${y} wall with ${c} square feet of window. ${x} × ${y} = ${x * y}. ${x * y} − ${c} = ${x * y - c}. Now do yours.`; });
    const gal = Math.ceil(area / cover);
    if (k === 1) return q(`${nm} needs to paint ${area} square feet. One gallon covers ${cover} square feet. How many gallons must ${nm} buy? (You cannot buy part of a gallon.)`, gal,
      "Divide the area by what one gallon covers. Think about what happens to a leftover bit.", "If the answer has a leftover part, round UP to the next whole gallon.",
      () => { const c = pick([50, 100]), n = ri(2, 4), e = ri(1, c / 2 - 1); return `Example: ${n * c + e} square feet, one gallon covers ${c}. ${n * c + e} ÷ ${c} is a little over ${n}, so buy ${n + 1} gallons. Now do yours.`; });
    const p = ri(2, 6) * 5; return q(`${nm} needs ${gal} gallons of paint at $${p} per gallon. What is the paint cost in dollars?`, gal * p,
      "The number of gallons is already known. Each costs the same.", "Multiply the number of gallons by the price of one gallon.",
      () => { const g = ri(2, 6), x = ri(2, 6) * 5; return `Example: ${g} gallons at $${x}. ${g} × ${x} = $${g * x}. Now do yours.`; });
  }, [["Paintable area", "🎨", "Wall area = width × height. Then <b>subtract</b> windows and doors, because you do not paint those."], ["Coverage", "🪣", "A can says how many square feet one gallon covers. Gallons = area ÷ coverage."], ["Round up", "⬆️", "You cannot buy 2.3 gallons. If there is any leftover, <b>round up</b> to 3 gallons."]]));

  l16.push(L("Up then down", () => {
    const k = ri(0, 3), p = 100 * ri(1, 5), r = pick([10, 20, 30, 40, 50]), f = p * (1 + r / 100) * (1 - r / 100);
    if (k === 0) return q(`A $${p} item goes up ${r}% and then goes down ${r}%. What is the final price in dollars?`, r2(f),
      "The second change is a percent of the NEW price, not the old one.", "Find the price after the increase first. Then take the percent off that new price.",
      () => { const x = 100 * ri(1, 3), y = pick([10, 20]); const u = x * (1 + y / 100); return `Example: $${x} up ${y}% is $${u}. Then ${y}% off $${u} is $${r2(u * (1 - y / 100))}. Now do yours.`; });
    if (k === 1) return q(`A $${p} item is marked down ${r}%, and later the sale price is marked back up ${r}%. What is the final price in dollars?`, r2(f),
      "The marked-up percent is taken from the sale price, which is smaller.", "Find the sale price first. Then add the percent of the sale price.",
      () => { const x = 100 * ri(1, 3), y = pick([10, 20]); const u = x * (1 - y / 100); return `Example: $${x} down ${y}% is $${u}. Then up ${y}% is $${r2(u * (1 + y / 100))}. Now do yours.`; });
    if (k === 2) return q(`A $${p} item goes up ${r}% and then comes back down ${r}%. How many dollars BELOW the starting price is the final price?`, r2(p - f),
      "Compare the final price with the starting price.", "Work out the final price after both changes. Then subtract it from the start.",
      () => { const x = 100 * ri(1, 3), y = pick([10, 20]); const u = x * (1 + y / 100), fin = u * (1 - y / 100); return `Example: $${x}, up ${y}% then down ${y}%, ends at $${r2(fin)}. Start − end = ${x} − ${r2(fin)} = ${r2(x - fin)}. Now do yours.`; });
    return mcq(`A price rises ${r}% and then falls ${r}%. Compared with the starting price, the final price is...`, "lower", ["the same", "higher"],
      "The percent that comes second is based on a different number than the first.", "The second change is based on the new price, so the two changes do not cancel exactly.",
      "Example: $100 up 50% is $150. Down 50% of $150 is $75, which is less than $100. Now do yours.");
  }, [["Not opposites", "↕️", "Going up 20% and then down 20% does <b>not</b> bring you back to the start."], ["Why?", "🔎", "$100 up 20% = $120. Down 20% of $120 is $24, so the price is $96. The second percent is taken from a different amount."], ["Tip", "💡", "Do changes one at a time. Always use the <b>latest price</b> as the base."]]));

  l16.push(L("Refund or owe?", () => {
    const k = ri(0, 2), w = ri(10, 40) * 100, d = ri(1, 9) * 50, t = w - d, nm = pick(NM);
    if (k === 0) return q(`During the year $${w} was withheld from ${nm}'s paychecks for income tax. The tax actually owed is $${t}. How many dollars is the refund?`, d,
      "Withheld means the government already took it. Did too much or too little get taken?", "Subtract the tax owed from the amount withheld.",
      () => { const a = ri(10, 30) * 100, b = ri(1, 6) * 50 + 25; return `Example: withheld $${a}, tax owed $${a - b}. $${a} − $${a - b} = $${b} refund. Now do yours.`; });
    if (k === 1) return q(`Only $${t} was withheld from ${nm}'s pay, but the tax owed is $${w}. How many dollars does ${nm} still owe?`, d,
      "Compare what was taken with what is owed. Which is bigger?", "Subtract the amount withheld from the tax owed.",
      () => { const a = ri(10, 30) * 100, b = ri(1, 6) * 50 + 25; return `Example: withheld $${a - b}, tax owed $${a}. $${a} − $${a - b} = $${b} still owed. Now do yours.`; });
    const more = Math.random() < 0.5; return mcq(`Withheld: $${more ? w : t}. Tax owed: $${more ? t : w}. What happens at tax time?`, more ? "A refund" : "You owe more", more ? ["You owe more", "Nothing, it is exactly even"] : ["A refund", "Nothing, it is exactly even"],
      "Compare the two numbers. Which one is larger?", "Think about whether too much or too little was already paid in during the year.",
      "Example: withheld $900, owed $700, so $200 comes back as a refund. Withheld $500, owed $700, so you pay $200. Now do yours.");
  }, [["Withholding", "💼", "Employers take income tax out of each paycheck and send it to the government. This is called <b>withholding</b>."], ["At tax time", "🧾", "You add up the real tax. If more was withheld, you get a <b>refund</b>. If less, you <b>owe</b> the difference."], ["Tip", "💡", "A big refund just means you lent the government your money all year, with no interest."]]));

  l16.push(mcL("What builds credit?", [
    ["Which habit helps build a good credit score the most?", "Paying every bill on time", ["Opening many new cards at once", "Never using any credit at all", "Paying bills a month late"], "Lenders want to know that you do what you promise.", "The biggest part of a credit score is your history of repaying on schedule."],
    ["Using $900 of a $1,000 limit on a card each month tends to...", "hurt a credit score", ["improve a credit score", "have no effect at all", "erase your debt"], "Lenders like it when borrowers do not use all the credit they are offered.", "Using most of your limit looks risky. Lower use looks safer."],
    ["A late payment on a credit report can stay for about...", "7 years", ["1 week", "2 days", "It disappears the next day"], "Credit reports keep history for a long time.", "Think of years, not days."],
    ["Which of these is NOT a normal part of a credit score?", "Your favorite color", ["Payment history", "How much you owe", "How long you have had credit"], "Credit scores use money history only.", "One option has nothing to do with money or borrowing."],
    ["Why do lenders check your credit score?", "To guess how likely you are to repay", ["To see how old you are", "To pick your job", "To find your friends"], "A lender is deciding whether to trust you with money.", "The score is a quick summary of how well you have repaid in the past."],
    ["A person with a higher score usually gets...", "lower interest rates", ["higher interest rates", "no choices at all", "free money"], "Trusted borrowers are rewarded.", "Lenders charge less when they think the risk is small."],
    ["Checking your own credit report...", "does not hurt your score", ["always lowers your score", "costs hundreds of dollars", "is against the law"], "It is a smart habit, like checking your own grades.", "It is called a 'soft' look, and it is safe."],
    ["Which action would most likely LOWER a credit score?", "Missing several payments", ["Paying a card in full", "Keeping an old account open", "Paying a loan on time"], "Look for the choice that shows a lender you were not reliable.", "Late or missed payments tell lenders you may not repay."],
    ["Someone who has never borrowed anything has...", "little or no credit history", ["a perfect score", "a very bad score", "a score set by their age"], "A score needs history to be built from.", "No borrowing means nothing to measure yet."]
  ], "Example: Which helps credit more, paying a bill on time or paying it late? On time, because lenders watch whether you repay as promised. Now do yours.",
    [["Your credit score", "📈", "A <b>credit score</b> is a number that shows how well you have handled borrowed money. Higher is better."], ["What counts", "🧾", "The biggest parts: <b>paying on time</b>, how much of your limit you use, and how long you have had credit."], ["Tip", "💡", "Pay on time, use only a little of your limit, and be patient. Good credit builds slowly."]]));

  l16.push(mcL("Leases and renters insurance", [
    ["A lease is...", "a contract to rent a place for a set time", ["a loan for buying a car", "a kind of savings account", "a shopping coupon"], "It is an agreement between a renter and an owner.", "It sets rent, length of time and rules."],
    ["A security deposit is...", "money paid first that may be returned if there is no damage", ["rent paid in advance for free", "a tax on renting", "a prize for signing"], "It protects the owner in case something is damaged.", "It is usually given back after you move out, if the place is in good shape."],
    ["Renters insurance usually helps pay for...", "your belongings if they are stolen or burned", ["the building itself", "your rent each month", "your groceries"], "Think about who owns the things inside the home.", "The owner insures the building. Renters insure what they own."],
    ["Before signing a lease you should...", "read it and ask about anything you do not understand", ["sign quickly so nobody else gets it", "skip the fine print", "let a stranger sign for you"], "Contracts are binding.", "Understanding the rules protects you from surprise costs."],
    ["Rent that is paid late can lead to...", "late fees", ["a free month", "a lower rent", "extra storage"], "Contracts often set penalties for missing due dates.", "Look for the extra charge."],
    ["Breaking a lease early may mean...", "paying a fee or the rest of the rent", ["getting a bonus", "nothing at all", "the owner pays you"], "You made a promise for a set length of time.", "Leaving early can cost money."],
    ["The premium on renters insurance is...", "the amount you pay for the coverage", ["the amount paid out for a loss", "the monthly rent", "the security deposit"], "It is the price of the insurance.", "You pay it regularly, usually monthly or yearly."],
    ["Who pays for electricity in an apartment?", "It depends on the lease", ["Always the owner", "Always the government", "Nobody"], "Different leases handle bills in different ways.", "Check what the lease says is included in rent."]
  ], "Example: Who protects a renter's TV from theft, the building owner's insurance or renters insurance? Renters insurance, because the TV belongs to the renter. Now do yours.",
    [["Renting a home", "🏢", "A <b>lease</b> is a contract with the rent, the length of time and the rules. Keep a copy."], ["Deposits and fees", "🔑", "A <b>security deposit</b> is returned if there is no damage. Late rent can mean <b>late fees</b>."], ["Renters insurance", "🛡️", "It covers your own things, like a laptop or clothes, if they are stolen or damaged. It is usually cheap."]]));

  l16.push(L("Was / now prices", () => {
    const nm = pick(NM);
    if (Math.random() < 0.65) { let w, pct; do { w = pick([40, 50, 60, 80, 100, 120, 150, 200, 250]); pct = pick([10, 20, 25, 30, 40, 50]); } while (!Number.isInteger(w * pct / 100)); const n = w - w * pct / 100;
      return q(`A sign says "Was $${w}, Now $${n}". What percent off is that?`, pct,
        "Percent off compares the amount saved with the original price.", "Subtract to find the dollars saved. Divide by the old (was) price and write it as a percent.",
        () => { const a = pick([40, 50, 100, 200]), pp = pick([10, 20, 25, 50]); return `Example: Was $${a}, Now $${a - a * pp / 100}. Saved $${a * pp / 100}. ${a * pp / 100} ÷ ${a} = ${pp / 100}, so ${pp}%. Now do yours.`; }); }
    return mcq(pick(["A store always lists a very high 'was' price, then a 'sale' price. What is a smart move?", "A shirt is 'Was $90, Now $40' but other stores sell it for $35 every day. What does that tell you?", "A deal says 'Compare at $200' next to a $100 price. What should you do?", "A tag shows a crossed-out price you have never seen in this store. What is wise?"]),
      "Check what the item costs in other places", ["Trust the crossed-out price", "Buy right away before thinking", "Ignore the price and buy"],
      "A crossed-out price is the seller's number. It may not be real.", "Look at real prices from several sellers before deciding if it is a good deal.",
      "Example: A bike is 'Was $300, now $200'. Other stores sell it at $190. The sale is not a real bargain. Now do yours.");
  }, [["Was and now", "🏷️", "Stores show a <b>was</b> price and a <b>now</b> price. Percent off = dollars saved ÷ was price."], ["Anchoring", "⚓", "A big crossed-out price makes the new price feel small. This is called <b>anchoring</b>."], ["Tip", "💡", "A real deal is cheap compared with <b>other stores</b>, not just compared with a crossed-out number."]]));

  l16.push(L("Event budget", () => {
    const k = ri(0, 2), g = pick([10, 20, 25, 40, 50]), f = ri(2, 8), c = g * ri(1, 4), nm = pick(NM);
    if (k === 0) return q(`${nm}'s club party has a room fee of $${c} and food that costs $${f} per guest. ${g} guests come. What is the total cost in dollars?`, c + f * g,
      "Some costs happen once and some happen for each guest.", "Multiply food cost by guests. Then add the one-time room fee.",
      () => { const a = ri(2, 6) * 10, b = ri(2, 6), n = pick([10, 20]); return `Example: fee $${a}, food $${b} each, ${n} guests. ${b} × ${n} = ${b * n}; plus ${a} = $${a + b * n}. Now do yours.`; });
    if (k === 1) return q(`An event costs $${c + f * g} in all and ${g} people will come. What ticket price, in dollars, makes the event break even?`, (c + f * g) / g,
      "Break even means ticket money equals the total cost.", "Divide the total cost by the number of people.",
      () => { const n = pick([10, 20, 25]), t = ri(3, 9); return `Example: cost $${n * t}, ${n} people. ${n * t} ÷ ${n} = $${t} each. Now do yours.`; });
    const t = f + c / g + ri(1, 5); return q(`${nm} runs an event with ${g} guests. Tickets cost $${t} each. The total cost of the event is $${c + f * g}. How many dollars are left over as profit?`, g * t - c - f * g,
      "Money in is the ticket sales. Money out is the total cost.", "Multiply the ticket price by the guests. Then subtract the total cost.",
      () => { const n = pick([10, 20]), p = ri(5, 9), co = n * ri(2, 4); return `Example: ${n} tickets at $${p} = $${n * p}. Cost $${co}. Profit = ${n * p} − ${co} = $${n * p - co}. Now do yours.`; });
  }, [["Planning an event", "🎉", "List every cost. Some are <b>one-time</b> (room) and some are <b>per guest</b> (food)."], ["Break-even ticket", "⚖️", "<b>Break-even ticket price = total cost ÷ number of guests</b>."], ["Profit", "💡", "Profit = money in − money out. Tickets above break-even leave money for the next event."]]));

  l16.push(L("Clock hours to pay", () => {
    const k = ri(0, 1), s = ri(7, 11) * 60 + pick([0, 30]), dur = ri(10, 18) * 30, br = pick([0, 30, 60]), e = s + dur, w = ri(5, 12) * 2, paid = (dur - br) / 60, nm = pick(NM);
    const brTxt = br ? ` ${nm} takes an unpaid ${br}-minute break.` : "";
    if (k === 0) return q(`${nm} works from ${tm(s)} to ${tm(e)}.${brTxt} How many hours is ${nm} paid for?`, paid,
      "Find the time between start and end. Then take away the break.", "Count the hours from the start to the end. Change minutes to hours (30 minutes = 0.5 hour) and subtract the unpaid break.",
      () => { const b = ri(3, 5); return `Example: 9:00 AM to ${b}:00 PM with an unpaid 30-minute break. 9 to ${b + 12} is ${b + 12 - 9} hours; minus 0.5 = ${b + 12 - 9 - 0.5} hours. Now do yours.`; });
    return q(`${nm} earns $${w} an hour and works from ${tm(s)} to ${tm(e)}.${brTxt} How much is ${nm} paid in dollars?`, paid * w,
      "Pay is hours paid times the hourly wage. Break time is not paid.", "Find the paid hours (end minus start, minus any unpaid break). Then multiply by the hourly wage.",
      () => { const x = ri(5, 10) * 2 + 1; return `Example: 6 paid hours at $${x} an hour. 6 × ${x} = $${6 * x}. Now do yours.`; });
  }, [["Elapsed time", "⏰", "From 9:00 AM to 5:00 PM is 8 hours. From 9:00 AM to 5:30 PM is 8.5 hours."], ["Unpaid breaks", "🥪", "If a break is unpaid, take it away from the hours. 30 minutes = 0.5 hour."], ["Pay", "💵", "<b>Pay = paid hours × hourly wage</b>. 7.5 hours at $12 = $90."]]));

  l16.push(L("Cost per serving", () => {
    const k = ri(0, 2), sv = pick([4, 5, 8, 10, 12, 20, 25, 40]), c = ri(2, 9) * 5, nm = pick(NM);
    if (k === 0) return q(`A box of cereal costs ${D(r2(sv * c / 100))} and has ${sv} servings. What is the cost per serving in dollars?`, c / 100,
      "Cost per serving is the price of one serving.", "Divide the price of the box by the number of servings.",
      () => { const s = pick([4, 5, 10]), cc = ri(2, 8) * 5 + 1; return `Example: a ${D(r2(s * cc / 100))} box with ${s} servings. ${r2(s * cc / 100)} ÷ ${s} = ${cc / 100} each. Now do yours.`; });
    if (k === 1) return q(`Each serving of a snack costs ${D(c / 100)}. ${nm} spends ${D(r2(sv * c / 100))}. How many servings does ${nm} get?`, sv,
      "Think: how many of the one-serving prices fit into the money?", "Divide the total spent by the price of one serving.",
      () => { const cc = ri(2, 8) * 5, n = ri(3, 12); return `Example: servings at ${D(cc / 100)}, total ${D(r2(n * cc / 100))}. ${r2(n * cc / 100)} ÷ ${cc / 100} = ${n}. Now do yours.`; });
    const lo = c, hi = c + 5 * ri(1, 2), aCheap = Math.random() < 0.5, ca = aCheap ? lo : hi, cb = aCheap ? hi : lo, ans = aCheap ? "Pack A" : "Pack B";
    return mcq(`Pack A: ${D(r2(sv * ca / 100))} for ${sv} servings. Pack B: ${D(r2(sv * 2 * cb / 100))} for ${sv * 2} servings. Which pack costs less per serving?`, ans, [aCheap ? "Pack B" : "Pack A", "They cost the same"],
      "The packs have different sizes, so compare the cost of ONE serving in each.", "Divide each price by its number of servings, then compare the two results.",
      "Example: Pack X $6 for 3 servings = $2 each. Pack Y $10 for 10 servings = $1 each. Y is cheaper per serving. Now do yours.");
  }, [["Per serving", "🥣", "<b>Cost per serving = price ÷ number of servings</b>. A $6 box with 12 servings costs $0.50 a serving."], ["Compare packs", "⚖️", "A bigger pack is not always cheaper. Work out the cost of <b>one serving</b> for each pack."], ["Tip", "💡", "Look for 'servings per container' on the label and do the division."]]));

  l16.push(mcL("Giving wisely", [
    ["Before giving money to a charity, a smart step is to...", "check that it is real and how it spends its money", ["give your bank number to a caller", "give to the first one that asks", "give only if they pressure you"], "Not every group that asks for money is honest.", "Look for trusted information about the group before giving."],
    ["Which is a warning sign of a fake charity?", "It pressures you to give right now", ["It shares clear reports", "It explains who it helps", "It lets you take time to decide"], "Honest groups let you think.", "Look for pushing and hurrying."],
    ["Giving your time to help a cause is called...", "volunteering", ["borrowing", "investing", "withholding"], "You give effort instead of money.", "It is a way to help without spending cash."],
    ["Setting aside a share of your money each month for giving is part of...", "a budget", ["a loan", "a tax return", "a scam"], "Planning ahead makes giving steady.", "It is one line in your plan, next to saving and spending."],
    ["Why keep a receipt when you donate?", "It is proof of the gift", ["To spend it later", "To sell it", "It has no use"], "Records matter when taxes are done.", "You may need to show what you gave."],
    ["Which is the safest way to donate online?", "Go to the group's own website that you typed in yourself", ["Click a link in a surprise message", "Send gift cards to a stranger", "Send cash in the mail to an unknown person"], "Be careful where you send money.", "Type the address yourself or ask a parent for help."],
    ["Besides money, a person can give to others by...", "donating clothes or food", ["keeping everything", "hiding things", "buying things for themselves"], "Useful things also help.", "Many groups collect items people need."],
    ["Why might a family choose one charity and give to it regularly?", "A steady gift helps the group plan", ["It is required by law", "It is a bank rule", "It makes the gift free"], "Regular help is easy for groups to count on.", "Planning works better when the amount is steady."]
  ], "Example: Is a group that pushes you to give instantly a good sign or a warning sign? A warning sign, because honest groups let you take time to decide. Now do yours.",
    [["Giving", "🤝", "Giving can be money, time or things. Choose causes you care about."], ["Check first", "🔍", "Look up the group before giving. Honest groups share <b>clear reports</b> and do not pressure you."], ["Make a plan", "📅", "Put giving in your budget. Small steady gifts add up."]]));

  l16.push(mixOf("Mixed practice", [l16[0], l16[3], l16[5], l16[9], l16[13]]));
  l16.push(mixOf("Level 16 Challenge", [l16[1], l16[2], l16[4], l16[6], l16[7], l16[8], l16[10], l16[14], l16[15], l16[16]]));

  // ======================= LEVEL 17 (8th grade, first half) =======================
  const l17 = [];
  l17.push(L("Doubling growth", () => {
    const k = ri(0, 2), nm = pick(NM);
    if (k === 0) { const n = ri(4, 10); return q(`${nm} gets a job that pays $1 on day 1, $2 on day 2, $4 on day 3, and keeps doubling each day. How many dollars does the job pay on day ${n}?`, Math.pow(2, n - 1),
      "Each day's pay is twice the day before.", "Start at 1 and double it again and again. On day 1 you have not doubled yet, so day n has n − 1 doublings.",
      () => { const x = ri(3, 5); return `Example: the pay on day ${x}: 1, 2, 4${x > 3 ? ", 8" : ""}${x > 4 ? ", 16" : ""}. So day ${x} pays $${Math.pow(2, x - 1)}. Now do yours.`; }); }
    if (k === 1) { const P = ri(1, 9) * 100, n = ri(2, 5); return q(`An account is worth $${P}. Its value doubles every 10 years. How many dollars will it be worth after ${n * 10} years?`, P * Math.pow(2, n),
      "Count how many 10-year periods fit. Each one doubles the money.", `Double the amount once for each 10-year period, and do that ${n} times.`,
      () => { const x = ri(10, 40) * 10, m = ri(2, 4); return `Example: $${x} doubling ${m} times: ${Array.from({ length: m }, (_, i) => x * Math.pow(2, i + 1)).join(", ")}. The last number is the answer. Now do yours.`; }); }
    const P = ri(1, 9) * 50, n = ri(2, 6); return q(`$${P} grows to $${P * Math.pow(2, n)} by doubling again and again. How many times did it double?`, n,
      "Each doubling makes the money twice as big.", "Keep doubling the starting amount and count the steps until you reach the final amount.",
      () => { const x = ri(1, 9) * 50, m = ri(2, 4); return `Example: $${x} → ${Array.from({ length: m }, (_, i) => x * Math.pow(2, i + 1)).join(" → ")}. That took ${m} doublings. Now do yours.`; });
  }, [["Doubling", "✌️", "Doubling means × 2. Start with $1: 1, 2, 4, 8, 16, 32... The jumps get bigger each time."], ["Fast growth", "🚀", "Adding $5 a day grows slowly. <b>Doubling</b> starts slow, then races ahead. This is called exponential growth."], ["Tip", "💡", "Write the list out. After n doublings the amount is the start × 2 × 2 × ... (n times)."]]));

  l17.push(L("Rate from two points", () => {
    const k = ri(0, 1), rate = ri(2, 12), fee = ri(1, 8) * 5, x1 = ri(2, 6), x2 = x1 + ri(2, 6), nm = pick(NM);
    const text = `A party company charges the same fee plus the same price per guest. For ${x1} guests the bill is $${fee + rate * x1}. For ${x2} guests the bill is $${fee + rate * x2}.`;
    if (k === 0) return q(`${text} What is the price per guest in dollars?`, rate,
      "Compare the two bills. The fee is in both of them, so the difference comes from extra guests.", "Divide the difference in the bills by the difference in the number of guests.",
      () => { const a = ri(2, 5), b = a + ri(2, 4), r = ri(2, 9), f = ri(1, 5) * 5; return `Example: ${a} guests cost $${f + r * a} and ${b} guests cost $${f + r * b}. Bill difference ${r * (b - a)}, guest difference ${b - a}. ${r * (b - a)} ÷ ${b - a} = $${r} each. Now do yours.`; });
    return q(`${text} What is the fixed fee in dollars?`, fee,
      "First find the price per guest from the two bills.", "Price per guest = bill difference ÷ guest difference. Then take the cost of the guests away from one bill; the rest is the fee.",
      () => { const a = ri(2, 5), b = a + ri(2, 4), r = ri(2, 9), f = ri(1, 5) * 5 + 3; return `Example: ${a} guests $${f + r * a}, ${b} guests $${f + r * b}. Rate $${r}. ${a} guests cost ${r * a}, so the fee is ${f + r * a} − ${r * a} = $${f}. Now do yours.`; });
  }, [["Two clues", "📍", "A steady price rule (fee + rate × amount) can be found from <b>two</b> data points."], ["The rate", "📈", "Rate = (change in cost) ÷ (change in amount). It is the price for one more item."], ["The fee", "🧾", "Then fee = cost − rate × amount, using either data point."]]));

  l17.push(L("Ticket puzzles", () => {
    const n = ri(8, 20), p = ri(8, 15), qq = p - ri(2, 6), x = ri(2, n - 2), T = p * x + qq * (n - x), nm = pick(NM), k = ri(0, 1);
    const exF = () => { const m = ri(5, 10), a = ri(6, 9), b = a - ri(2, 4), y = ri(2, m - 2); return `Example: ${m} tickets, some at $${a} and the rest at $${b}, total $${a * y + b * (m - y)}. If all were $${b}, it would cost ${b * m}. The extra ${a * y + b * (m - y) - b * m} ÷ ($${a} − $${b}) = ${y} of the $${a} kind. Now do yours.`; };
    if (k === 0) return q(`${nm} buys ${n} tickets. Some cost $${p} and the rest cost $${qq}. The total is $${T}. How many tickets cost $${p}?`, x,
      "Imagine all the tickets were the cheaper kind. How much would that cost?", "Find the extra money over that cost. Each pricier ticket adds the price gap on top of a cheaper one.", exF);
    return q(`${nm} buys ${n} tickets. Some cost $${p} and the rest cost $${qq}. The total is $${T}. How many tickets cost $${qq}?`, n - x,
      "Imagine all the tickets were the cheaper kind. How much would that cost?", `Find the extra money over that cost to see how many cost $${p}. The rest cost $${qq}.`, exF);
  }, [["A puzzle", "🎟️", "Two kinds of tickets, a known total count and a known total cost. How many of each?"], ["Trick", "🧠", "Pretend ALL tickets are the cheaper kind. The extra money you actually spent tells you how many are the pricier kind."], ["Check", "✅", "Always check: the counts add to the total number of tickets and the money adds to the total cost."]]));

  l17.push(L("First month's interest", () => {
    const b = 1200 * ri(1, 10), r = pick([6, 12, 18, 24]), nm = pick(NM), k = ri(0, 2), i = b * r / 1200, pay = i + ri(2, 9) * 10;
    if (k === 0) return q(`${nm} owes $${b} on a loan with a yearly rate of ${r}%. About how many dollars of interest are charged for the first month? (yearly rate ÷ 12)`, i,
      "Interest is charged each month on what is owed. The rate given is for a whole year.", "Divide the yearly rate by the number of months in a year to get the monthly rate. Then take that percent of the balance.",
      () => { const x = 1200 * ri(1, 5), y = pick([6, 12]); return `Example: $${x} at ${y}% a year. ${y}% ÷ 12 = ${y / 12}% a month. ${x} × ${y / 12 / 100} = $${x * y / 1200}. Now do yours.`; });
    if (k === 1) return q(`${nm} owes $${b} at ${r}% per year. This month's interest is $${i}, and ${nm} pays $${pay}. How many dollars of the payment go toward the balance?`, pay - i,
      "Part of each payment pays the interest first. The rest lowers the debt.", "Subtract the interest from the payment.",
      () => { const a = ri(3, 9) * 10, c = a + ri(2, 8) * 10; return `Example: payment $${c}, interest $${a}. ${c} − ${a} = $${c - a} lowers the debt. Now do yours.`; });
    return q(`${nm} owes $${b} at ${r}% per year. After one month's interest of $${i}, ${nm} pays $${pay}. What is the new balance in dollars?`, b + i - pay,
      "Add the interest to the balance, then subtract the payment.", "Balance + interest − payment.",
      () => { const x = 600 * ri(1, 4), y = x / 100 * 1, p = 100; return `Example: balance $${x}, interest $${y}, payment $${p}. ${x} + ${y} − ${p} = $${x + y - p}. Now do yours.`; });
  }, [["Interest each month", "🗓️", "Loans add interest every month. Monthly rate = yearly rate ÷ 12. Interest = balance × monthly rate."], ["Where a payment goes", "🔀", "A payment first covers the interest. What is left lowers the <b>balance</b>."], ["Why start slow?", "🐢", "At first the balance is big, so most of the payment is interest. Paying extra early saves a lot."]]));

  l17.push(L("Credit utilization", () => {
    const lim = pick([500, 1000, 1500, 2000, 4000]), pct = pick([10, 20, 25, 30, 40, 50, 60, 75]), bal = lim * pct / 100, nm = pick(NM), k = ri(0, 2);
    if (k === 0) return q(`${nm}'s card limit is $${lim} and the balance is $${bal}. What percent of the limit is used?`, pct,
      "Utilization compares the balance with the limit.", "Divide the balance by the limit and write the result as a percent.",
      () => { const l = pick([200, 400, 1000]), p = pick([10, 25, 50]); return `Example: limit $${l}, balance $${l * p / 100}. ${l * p / 100} ÷ ${l} = ${p / 100}, so ${p}%. Now do yours.`; });
    if (k === 1) return q(`${nm}'s card limit is $${lim}. Lenders like use to stay under 30%. What is the most ${nm} should have on the card, in dollars?`, lim * 30 / 100,
      "Find 30% of the limit.", "Multiply the limit by 0.30.",
      () => { const l = pick([200, 400, 1000]); return `Example: limit $${l}. 30% of ${l} = ${l} × 0.30 = $${l * 30 / 100}. Now do yours.`; });
    return q(`A card has a $${lim} limit and is ${pct}% used. How many dollars is the balance?`, bal,
      "Find the percent of the limit.", "Change the percent to a decimal and multiply by the limit.",
      () => { const l = pick([200, 400, 1000]), p = pick([10, 25, 50]); return `Example: limit $${l}, ${p}% used. ${l} × ${p / 100} = $${l * p / 100}. Now do yours.`; });
  }, [["Utilization", "💳", "<b>Credit utilization</b> = balance ÷ limit. It tells how much of your available credit you are using."], ["Aim low", "📉", "Many experts suggest staying under about <b>30%</b>. Lower looks safer to lenders."], ["Example", "🧮", "A $1,000 limit with $200 charged is 200 ÷ 1,000 = 20% used."]]));

  l17.push(L("College: net price", () => {
    const sticker = ri(10, 40) * 1000, sch = ri(1, 5) * 1000, gr = ri(1, 4) * 1000, sav = ri(1, 4) * 1000, nm = pick(NM), k = ri(0, 2);
    const net = sticker - sch - gr;
    if (k === 0) return q(`A year of college has a sticker price of $${sticker}. ${nm} gets a $${sch} scholarship and a $${gr} grant (both are free money). What is the net price in dollars?`, net,
      "Scholarships and grants do not need to be paid back, so they lower the price.", "Subtract the scholarship and the grant from the sticker price.",
      () => { const a = ri(10, 30) * 1000, b = ri(1, 4) * 1000, c = ri(1, 3) * 1000; return `Example: sticker $${a}, scholarship $${b}, grant $${c}. ${a} − ${b} − ${c} = $${a - b - c}. Now do yours.`; });
    if (k === 1 && net > sav) return q(`The net price of a year of college is $${net}. ${nm}'s family has saved $${sav} for it. How many dollars are still needed?`, net - sav,
      "Savings cover part of the net price.", "Subtract the savings from the net price.",
      () => { const a = ri(8, 25) * 1000, b = ri(1, 5) * 1000; return `Example: net price $${a}, savings $${b}. ${a} − ${b} = $${a - b} still needed. Now do yours.`; });
    const yrs = ri(2, 4); return q(`${nm}'s net price is $${net} a year. What is the total net price for ${yrs} years?`, net * yrs,
      "The same net price repeats every year.", "Multiply the net price by the number of years.",
      () => { const a = ri(8, 20) * 1000, y = ri(2, 4); return `Example: $${a} a year for ${y} years. ${a} × ${y} = $${a * y}. Now do yours.`; });
  }, [["Sticker vs net", "🎓", "The <b>sticker price</b> is the published cost. The <b>net price</b> is what you really pay after free money."], ["Free vs borrowed", "🎁", "Scholarships and grants are <b>free</b>. Loans must be paid back <b>with interest</b>."], ["Tip", "💡", "Subtract all free money first. Then decide how much to cover with savings, work and (last) loans."]]));

  l17.push(L("Property tax", () => {
    const val = 120000 * ri(1, 3), rate = pick([1, 1.5, 2]), tax = val * rate / 100, nm = pick(NM), k = ri(0, 2);
    if (k === 0) return q(`${nm}'s family home is valued at $${val}. The property tax rate is ${rate}% each year. How many dollars is the yearly property tax?`, tax,
      "Property tax is a percent of the home's value.", "Change the percent to a decimal and multiply by the value.",
      () => { const v = 100000 * ri(1, 4), r = pick([1, 2]); return `Example: $${v} at ${r}%. ${v} × ${r / 100} = $${v * r / 100}. Now do yours.`; });
    if (k === 1) return q(`A home's property tax is $${tax} a year. How many dollars is that each month?`, tax / 12,
      "A year has 12 months.", "Divide the yearly tax by 12.",
      () => { const t = 12 * ri(50, 300) + 1; return `Example: $${t * 1} a year ÷ 12 = $${r2(t / 12)} a month. Now do yours.`; });
    return q(`The property tax rate is ${rate}%. ${nm}'s yearly tax bill is $${tax}. What is the home's value in dollars?`, val,
      "The tax is a small percent of the value. The value is much bigger.", "Divide the tax by the rate written as a decimal.",
      () => { const v = 100000 * ri(1, 4), r = pick([1, 2]); return `Example: tax $${v * r / 100} at ${r}%. ${v * r / 100} ÷ ${r / 100} = $${v}. Now do yours.`; });
  }, [["Property tax", "🏡", "Owners of land and buildings pay <b>property tax</b> each year, often to pay for schools, roads and fire stations."], ["How it is found", "🧮", "Tax = value × rate. A $200,000 home at 1% pays $2,000 a year."], ["Renters too", "🔑", "Renters do not pay it directly, but the owner counts it when setting the rent."]]));

  l17.push(L("Employer match", () => {
    const s = pick([30000, 40000, 50000, 60000, 80000]), c = ri(2, 8), m = ri(3, 6), nm = pick(NM), k = ri(0, 2), got = Math.min(c, m);
    if (k === 0) return q(`${nm} earns $${s} a year and puts ${c}% into a retirement plan. The employer matches dollar for dollar up to ${m}% of pay. How many dollars does the employer add in a year?`, s * got / 100,
      "The match stops at the limit, even if you put in more.", `Take the smaller of what ${nm} puts in and the match limit. Find that percent of the pay.`,
      () => { const a = pick([20000, 40000]), p = ri(2, 4), l = ri(2, 4); return `Example: pay $${a}, puts in ${p}%, match limit ${l}%. Smaller is ${Math.min(p, l)}%. ${a} × ${Math.min(p, l) / 100} = $${a * Math.min(p, l) / 100}. Now do yours.`; });
    if (k === 1) return q(`${nm} earns $${s} a year and puts ${c}% into a retirement plan. The employer matches dollar for dollar up to ${m}%. How many dollars go into the account in a year (both together)?`, s * (c + got) / 100,
      "Add what the worker puts in and what the employer adds.", `The worker adds ${c}% of pay. The employer adds a match, but only up to its limit.`,
      () => { const a = pick([20000, 40000]), p = ri(2, 4), l = ri(2, 4); return `Example: pay $${a}, worker ${p}%, limit ${l}%. Worker ${a * p / 100} + employer ${a * Math.min(p, l) / 100} = $${a * (p + Math.min(p, l)) / 100}. Now do yours.`; });
    const c2 = ri(1, m - 1); return q(`${nm} earns $${s} a year. The employer matches up to ${m}%, but ${nm} only puts in ${c2}%. How many dollars of free match money is ${nm} missing out on each year?`, s * (m - c2) / 100,
      "Compare what the match could be with what it is.", "Find the percent of pay that is missed (the limit minus what is put in). Then take that percent of the pay.",
      () => { const a = pick([20000, 40000]), p = ri(1, 2), l = p + ri(1, 3); return `Example: pay $${a}, limit ${l}%, puts in ${p}%. Missed ${l - p}%. ${a} × ${(l - p) / 100} = $${a * (l - p) / 100}. Now do yours.`; });
  }, [["Free money", "🎁", "Some employers <b>match</b> what you put in a retirement plan. If you add 4% and they match, they add another 4%."], ["The limit", "🛑", "The match stops at a limit. Adding more than the limit still helps you, but the employer adds no more."], ["Tip", "💡", "Always put in at least enough to get the whole match. Skipping it is like turning down part of your pay."]]));

  l17.push(L("Fund fees", () => {
    const B = 10000 * ri(1, 8), e1 = pick([0.1, 0.2, 0.5, 0.75, 1]), nm = pick(NM), k = ri(0, 2);
    let e2 = pick([0.1, 0.2, 0.5, 0.75, 1]); while (e2 === e1) e2 = pick([0.1, 0.2, 0.5, 0.75, 1]);
    if (k === 0) return q(`A fund charges a yearly fee (expense ratio) of ${e1}%. ${nm} has $${B} in it. How many dollars is the fee for one year?`, r2(B * e1 / 100),
      "The fee is a small percent of the money in the fund.", "Change the percent to a decimal and multiply by the balance.",
      () => { const b = 10000 * ri(1, 4), e = pick([0.5, 1]); return `Example: $${b} with a ${e}% fee. ${b} × ${e / 100} = $${b * e / 100}. Now do yours.`; });
    if (k === 1) { const hi = Math.max(e1, e2), lo = Math.min(e1, e2); return q(`Fund X charges ${hi}% a year and Fund Y charges ${lo}%. ${nm} has $${B}. How many dollars more does Fund X cost in one year?`, r2(B * (hi - lo) / 100),
      "Compare the fees in dollars for the same balance.", "Find the difference between the two rates, then take that percent of the balance.",
      () => { const b = 10000 * ri(1, 4); return `Example: 1% versus 0.5% on $${b}. Difference 0.5%. ${b} × 0.005 = $${b * 0.005}. Now do yours.`; }); }
    const hi = Math.max(e1, e2), lo = Math.min(e1, e2); return mcq(`Two funds earn the same before fees. Fund X charges ${hi}% and Fund Y charges ${lo}%. Which one leaves you with more money?`, "Fund Y", ["Fund X", "They leave the same"],
      "Fees are taken out of your money every year.", "If the earnings are equal, the fund that takes less in fees leaves more for you.",
      "Example: Fund P has a 2% fee, Fund Q a 0.5% fee. With equal earnings, Q keeps more for you. Now do yours.");
  }, [["Fund fees", "🏦", "A fund charges a yearly fee called the <b>expense ratio</b>, as a percent of your money."], ["Small numbers add up", "📊", "1% of $10,000 is $100 every year. Over decades, fees can cost thousands."], ["Tip", "💡", "When funds are alike, the one with the <b>lower fee</b> keeps more money for you."]]));

  l17.push(L("Cost of owning a car", () => {
    const pay = ri(15, 35) * 10, ins = ri(5, 15) * 10, gas = ri(4, 12) * 10, nm = pick(NM), k = ri(0, 2), mo = pay + ins + gas;
    const text = `${nm}'s car costs $${pay} a month in payments, $${ins} a month in insurance and $${gas} a month in gas.`;
    if (k === 0) return q(`${text} What is the total cost each month in dollars?`, mo,
      "Add up every monthly car cost.", "Add the payment, the insurance and the gas.",
      () => { const a = ri(15, 30) * 10, b = ri(5, 10) * 10 + 5, c = ri(3, 8) * 10; return `Example: $${a} + $${b} + $${c} = $${a + b + c}. Now do yours.`; });
    if (k === 1) return q(`${text} What is the total cost for one year in dollars?`, mo * 12,
      "First find one month, then think about how many months are in a year.", "Add the three costs. Then multiply by 12.",
      () => { const a = ri(15, 30) * 10 + 5, b = ri(5, 10) * 10, c = ri(3, 8) * 10; return `Example: $${a} + $${b} + $${c} = $${a + b + c} a month. × 12 = $${(a + b + c) * 12}. Now do yours.`; });
    const inc = mo + ri(3, 12) * 50; return q(`${text} ${nm} has a monthly car budget of $${inc}. How many dollars of the budget are left after car costs?`, inc - mo,
      "Subtract the total car cost from the budget.", "Add the three monthly costs first. Then subtract from the budget.",
      () => { const a = ri(3, 8) * 100, b = ri(1, 7) * 10 + 5; return `Example: budget $${a}, costs $${b}. ${a} − ${b} = $${a - b} left. Now do yours.`; });
  }, [["More than the price tag", "🚗", "A car costs more than its price. There are payments, <b>insurance</b>, gas, repairs and fees."], ["Add it up", "➕", "Add each monthly cost. For a year, multiply the monthly total by 12."], ["Tip", "💡", "Before buying, check that all the car costs fit your budget, not just the payment."]]));

  l17.push(L("Payback time", () => {
    const p = ri(3, 12) * 10, n = ri(3, 12), C = p * n, nm = pick(NM), k = ri(0, 2);
    if (k === 0) return q(`${nm} spends $${C} to start a small business that earns $${p} profit each month. After how many months has ${nm} earned back the start-up cost?`, n,
      "Payback is when total profit equals what you spent to start.", "Divide the start-up cost by the profit each month.",
      () => { const a = ri(2, 9) * 10, m = ri(3, 8); return `Example: cost $${a * m}, profit $${a} a month. ${a * m} ÷ ${a} = ${m} months. Now do yours.`; });
    if (k === 1) return q(`A business cost $${C} to start. ${nm} wants to earn it all back in ${n} months. How many dollars of profit must it make each month?`, p,
      "Spread the start-up cost evenly over the months.", "Divide the cost by the number of months.",
      () => { const a = ri(2, 9) * 10, m = ri(3, 8); return `Example: cost $${a * m} in ${m} months. ${a * m} ÷ ${m} = $${a} a month. Now do yours.`; });
    const m = n + ri(2, 6); return q(`${nm} spent $${C} to start a business that earns $${p} profit each month. After ${m} months, how many dollars of real profit has ${nm} made (after paying back the start-up cost)?`, p * m - C,
      "First find all the profit earned. Then take out the money spent at the start.", "Multiply the monthly profit by the months. Then subtract the start-up cost.",
      () => { const a = ri(2, 9) * 10, x = ri(3, 6), y = x + ri(2, 4); return `Example: cost $${a * x}, profit $${a} a month, ${y} months. ${a * y} earned − ${a * x} = $${a * y - a * x}. Now do yours.`; });
  }, [["Start-up cost", "🏪", "A new business often spends money <b>before</b> it earns any. That is the start-up cost."], ["Payback", "⏳", "<b>Payback time = start-up cost ÷ profit each month</b>."], ["After payback", "💰", "Once the cost is repaid, more profit is truly yours. Real profit = total earned − start-up cost."]]));

  l17.push(mcL("Reading scatter plots", [
    ["A scatter plot shows hours worked and money earned. The dots rise from left to right. This pattern shows...", "more hours go with more money", ["more hours go with less money", "no connection at all", "the data must be wrong"], "Look at which way the dots move as you go right.", "Dots going up as you go right means both numbers grow together."],
    ["Dots in a scatter plot of price and number sold slope DOWN to the right. This means...", "higher prices go with fewer sales", ["higher prices go with more sales", "price does not matter", "sales never change"], "Follow the dots from left to right.", "When one number goes up and the other goes down, the trend is negative."],
    ["Dots are scattered everywhere with no pattern. This means...", "there is little or no connection", ["a strong connection", "a perfect connection", "money is rising"], "Look for a clear direction.", "No direction in the dots means no clear link."],
    ["One dot sits far away from all the others. It is called an...", "outlier", ["average", "interest", "balance"], "It does not fit the pattern.", "It is an unusual value."],
    ["A line of best fit helps you...", "predict a value from the trend", ["add up the dots", "hide the data", "change the data"], "It runs through the middle of the dots.", "Use the line to guess new values."],
    ["The more a family earns, the more they usually spend. A scatter plot of earnings and spending would likely show...", "a rising trend", ["a falling trend", "dots in a circle", "only one dot"], "Think about whether both grow together.", "Higher earnings and higher spending go up together."],
    ["Does a link in a scatter plot prove that one thing causes the other?", "No, it may only show they move together", ["Yes, always", "Yes, if the line is straight", "Only for money data"], "Two things can change together for other reasons.", "Ice cream sales and sunburns both rise in summer, but one does not cause the other."],
    ["A shop plots the temperature and the number of cold drinks sold. As temperature goes up, sales go up. This is...", "a positive relationship", ["a negative relationship", "no relationship", "an outlier"], "Both numbers go in the same direction.", "Same direction is called positive."]
  ], "Example: Hours of studying and test score rise together on a plot. Which way do the dots slope? Up to the right, so the link is positive. Now do yours.",
    [["Scatter plots", "📊", "A <b>scatter plot</b> puts a dot for each pair of numbers, such as hours worked and money earned."], ["Trends", "📈", "Dots going up to the right = <b>positive</b>. Going down = <b>negative</b>. Scattered with no shape = <b>no link</b>."], ["Careful", "⚠️", "A trend does not prove one thing <b>causes</b> the other. Look for an <b>outlier</b> that does not fit."]]));

  l17.push(L("Chance and cost", () => {
    const k = ri(0, 2), n = pick([2, 4, 5, 10, 20, 25, 50]), c = n * ri(2, 9) * 5, nm = pick(NM);
    if (k === 0) return q(`There is a 1 in ${n} chance that a $${c} phone breaks this year. On average, how many dollars of repair cost per phone per year does that mean?`, c / n,
      "Chance times cost gives the average cost over many phones.", "Multiply the chance (one out of the number) by the cost. That equals the cost divided by the number.",
      () => { const m = pick([4, 5, 10]), cc = m * ri(2, 9) * 5; return `Example: a 1 in ${m} chance of a $${cc} repair. ${cc} ÷ ${m} = $${cc / m}. Now do yours.`; });
    if (k === 1) return q(`The chance that something goes wrong is 1 in ${n}. What is that as a percent?`, 100 / n,
      "A percent is a chance out of 100.", "Divide 100 by the number.",
      () => { const m = pick([4, 5, 10, 20]); return `Example: 1 in ${m}. 100 ÷ ${m} = ${100 / m}%. Now do yours.`; });
    const t = n * ri(2, 8), ret = t / n; return q(`A store sold ${t} gadgets and ${ret} came back as returns. What percent were returned?`, 100 / n,
      "Compare the returned amount to the total sold.", "Divide returns by total sold. Then multiply by 100 to get a percent.",
      () => { const m = pick([4, 5, 10, 20]), tt = m * ri(2, 6); return `Example: ${tt} sold, ${tt / m} returned. ${tt / m} ÷ ${tt} = ${1 / m}, which is ${100 / m}%. Now do yours.`; });
  }, [["Risk as a number", "🎲", "Risk is how likely something is to go wrong. '1 in 10' means about 10 out of 100, which is 10%."], ["Average cost", "🧮", "Average cost of a risk = <b>chance × cost</b>. A 1 in 5 chance of a $100 repair averages $20."], ["Why insurance", "🛡️", "Insurance spreads big, rare costs across many people so no one faces them alone."]]));

  l17.push(mcL("Passwords and two-step login", [
    ["Which is the strongest password?", "A long mix of words, numbers and symbols that is not about you", ["your birthday", "12345678", "the word password"], "Guessable passwords are weak.", "Length and surprise make a password strong."],
    ["Two-step verification means...", "you need your password AND a second proof, like a code", ["you type the password twice", "you use two names", "you share the password with a friend"], "It adds one more layer.", "The second step is something only you have."],
    ["Should you use the same password for every account?", "No, one leak could open all of them", ["Yes, it is easier to remember", "Yes, if it is long", "Yes, if you change one letter"], "Think about what happens if one site is hacked.", "A single leaked password would unlock everything."],
    ["A message asks you to send your password to 'fix' your account. You should...", "ignore it, it is probably a scam", ["send it quickly", "send half of it", "tell a friend your password"], "Real companies do not ask for passwords in messages.", "This is phishing."],
    ["A tool that stores strong, different passwords for you is called a...", "password manager", ["pop-up", "cookie jar", "bank teller"], "It remembers so that you do not have to.", "You only need one strong master password."],
    ["When is it safe to share your banking password?", "Never with anyone who contacts you", ["With a caller who knows your name", "With a website's chat bot", "With a classmate"], "Keep it private.", "Even someone who knows your name can be a scammer."],
    ["You use a public computer. When finished, you should...", "log out and close the page", ["leave it open", "save your password", "leave the screen on"], "Think about the next person who sits down.", "Logging out stops them from seeing your account."],
    ["Why is it a good idea to change a password after a data breach?", "The old one may be known to criminals", ["Passwords expire every day", "It makes the account faster", "The bank asks for money"], "A breach means information leaked.", "A leaked password should be replaced."]
  ], "Example: Should a password be your pet's name or a long random mix? A long random mix, because pet names are easy to guess. Now do yours.",
    [["Passwords", "🔐", "A strong password is <b>long</b>, hard to guess and different on every account."], ["Two steps", "📲", "<b>Two-step verification</b> asks for your password plus a code. Even a stolen password is not enough."], ["Never share", "🚫", "Real banks never ask for your password by message. Ask a trusted adult if you are unsure."]]));

  l17.push(mcL("Interest rates and the economy", [
    ["When the central bank raises interest rates, borrowing usually becomes...", "more expensive", ["cheaper", "free", "impossible"], "Think about what it costs to take a loan.", "Higher rates mean more interest on loans."],
    ["Higher interest rates on savings accounts mean savers earn...", "more", ["less", "nothing", "a fixed gift"], "Savings pay interest.", "A higher rate rewards savers."],
    ["Lower interest rates make people more likely to...", "borrow and spend", ["stop shopping", "close bank accounts", "hide cash"], "Borrowing becomes cheaper.", "Cheaper loans encourage spending."],
    ["Prices rising across the whole economy is called...", "inflation", ["recession", "profit", "deposit"], "It makes each dollar buy less.", "It is a general rise in prices."],
    ["Why might a central bank raise rates when prices rise too fast?", "To slow spending and cool prices", ["To print more money", "To give gifts", "To reduce wages to zero"], "Costly loans mean less spending.", "Less spending slows price increases."],
    ["If you have a loan with a fixed rate, the rate...", "stays the same for the whole loan", ["changes every day", "changes whenever you spend", "falls to zero"], "Fixed means it does not move.", "The same percent applies all the way through."],
    ["A loan with a variable rate...", "can go up or down over time", ["never changes", "is always free", "always goes up"], "Variable means it can vary.", "The rate follows changes in the market."],
    ["When businesses can borrow cheaply they often...", "expand and hire", ["close early", "stop selling", "pay no workers"], "Cheaper loans make growing easier.", "More borrowing can mean more jobs."]
  ], "Example: When borrowing gets cheaper, do people usually borrow more or less? More, because loans cost less. Now do yours.",
    [["Interest rates", "📉", "The <b>interest rate</b> is the price of borrowing money. It also decides how much savers earn."], ["Up and down", "🔼", "When rates <b>rise</b>, loans cost more and people spend less. When rates <b>fall</b>, loans are cheaper and spending tends to grow."], ["Fixed or variable", "🔧", "A <b>fixed</b> rate stays the same. A <b>variable</b> rate can change over time."]]));

  l17.push(L("Side income and tax savings", () => {
    const e = ri(5, 20) * 20, x = ri(1, 4) * 20, t = pick([20, 25, 30]), prof = e - x, nm = pick(NM), k = ri(0, 2);
    if (k === 0) return q(`${nm} earns $${e} from a side job and spends $${x} on supplies. What is the profit in dollars?`, prof,
      "Profit is what is left after the costs.", "Subtract the costs from the money earned.",
      () => { const a = ri(5, 15) * 20 + 10, b = ri(1, 3) * 20; return `Example: earned $${a}, supplies $${b}. ${a} − ${b} = $${a - b} profit. Now do yours.`; });
    const w = Math.round(prof * t) / 100;
    if (k === 1) return q(`${nm}'s side job made $${prof} in profit. ${nm} sets aside ${t}% for taxes. How many dollars should be set aside?`, r2(w),
      "Taxes are a percent of the profit.", "Change the percent to a decimal and multiply by the profit.",
      () => { const a = ri(5, 15) * 20, p = pick([20, 25]); return `Example: profit $${a}, set aside ${p}%. ${a} × ${p / 100} = $${r2(a * p / 100)}. Now do yours.`; });
    return q(`${nm}'s side job made $${prof} in profit. ${nm} sets aside ${t}% for taxes. How many dollars are left to keep?`, r2(prof - w),
      "Find the tax part first, then think about what remains.", `Multiply the profit by ${t}% to find the tax. Then subtract it from the profit.`,
      () => { const a = ri(5, 15) * 20, p = pick([20, 25]); return `Example: profit $${a}, tax ${p}%. Tax ${r2(a * p / 100)}. Keep ${a} − ${r2(a * p / 100)} = $${r2(a - a * p / 100)}. Now do yours.`; });
  }, [["Side income", "🧰", "Money from a side job is still income, and it may be taxed. Nobody withholds it for you."], ["Profit first", "🧮", "<b>Profit = money earned − costs</b>. Tax is based on profit."], ["Set aside", "🏦", "Put a share (say 20-30%) of the profit in a separate place right away, so the tax bill is no surprise."]]));

  l17.push(L("Exchange rate with a fee", () => {
    const d = 100 * ri(1, 6), f = pick([2, 3, 5]), R = pick([2, 3, 4, 5, 8, 10]), nm = pick(NM), k = ri(0, 1);
    const fee = d * f / 100;
    if (k === 0) return q(`${nm} exchanges $${d} at a booth that charges a ${f}% fee. How many dollars are charged as the fee?`, fee,
      "The fee is a percent of the money exchanged.", "Turn the percent into a decimal and multiply by the amount.",
      () => { const a = 100 * ri(1, 4), p = pick([2, 5]); return `Example: $${a} with a ${p}% fee. ${a} × ${p / 100} = $${a * p / 100}. Now do yours.`; });
    return q(`Suppose $1 buys ${R} units of a foreign currency. ${nm} exchanges $${d} and pays a ${f}% fee first. How many units does ${nm} get?`, (d - fee) * R,
      "The fee comes out of the dollars before they are exchanged.", "Find the fee, subtract it from the dollars, then multiply what is left by the rate.",
      () => { const a = 100 * ri(1, 3), p = pick([2, 5]), r = pick([2, 3, 4]); return `Example: $${a}, ${p}% fee, rate ${r}. Fee ${a * p / 100}. Left ${a - a * p / 100}. × ${r} = ${(a - a * p / 100) * r} units. Now do yours.`; });
  }, [["Exchange rates", "💱", "Another country's money has a different value. The <b>exchange rate</b> tells how many units one dollar buys."], ["Fees", "🧾", "Exchange booths and cards may charge a <b>fee</b>. It comes out of your money before you convert."], ["Tip", "💡", "Do it in order: subtract the fee, then multiply by the rate."]]));

  l17.push(L("Compare two loans", () => {
    const loan = 1800 * ri(1, 3), n1 = pick([12, 24]), n2 = n1 === 12 ? 24 : 36;
    const nm = pick(NM), k = ri(0, 1);
    const A = { m: loan / n1 + 10, n: n1 }, B = { m: loan / n2 + 6, n: n2 };
    const tA = r2(A.m * A.n), tB = r2(B.m * B.n);
    if (k === 0) { const m = ri(2, 9) * 10 + 5, n = pick([6, 12, 18, 24]); return q(`${nm} borrows and pays $${m} a month for ${n} months. How many dollars is that in total?`, m * n,
      "Payments repeat every month.", "Multiply the monthly payment by the number of months.",
      () => { const a = ri(2, 9) * 10, b = pick([6, 12]); return `Example: $${a} a month for ${b} months. ${a} × ${b} = $${a * b}. Now do yours.`; }); }
    if (Math.random() < 0.5) return q(`${nm} borrows $${loan} and pays back $${r2(A.m)} a month for ${A.n} months. How many dollars of interest and fees are paid? (total paid − amount borrowed)`, r2(tA - loan),
      "Interest is the extra paid on top of the amount borrowed.", "Find the total paid (payment × months). Then subtract the amount borrowed.",
      () => { const a = ri(2, 6) * 100, m = 12, p = a / m + 7; return `Example: borrow $${a}, pay $${r2(p)} for ${m} months = $${r2(p * m)}. Extra: ${r2(p * m)} − ${a} = $${r2(p * m - a)}. Now do yours.`; });
    const cheaper = tA < tB ? "Loan A" : "Loan B";
    return mcq(`Loan A: borrow $${loan}, pay $${r2(A.m)} a month for ${A.n} months. Loan B: borrow $${loan}, pay $${r2(B.m)} a month for ${B.n} months. Which costs less in total?`, cheaper, [cheaper === "Loan A" ? "Loan B" : "Loan A", "They cost the same"],
      "A lower monthly payment does not always mean a lower total.", "Multiply each payment by its number of months and compare the two totals.",
      "Example: Loan X pays $50 for 10 months = $500. Loan Y pays $30 for 20 months = $600. X costs less in total even though the payment is bigger. Now do yours.");
  }, [["Total cost", "🧾", "<b>Total paid = monthly payment × number of months</b>. Interest is the total paid minus the amount borrowed."], ["Small payment trap", "🪤", "A longer loan has a smaller payment, but you often pay more interest in total."], ["Tip", "💡", "Compare the <b>total</b> cost and check what monthly payment fits your budget."]]));

  l17.push(mixOf("Mixed practice", [l17[0], l17[3], l17[4], l17[8], l17[9], l17[13]]));
  l17.push(mixOf("Level 17 Challenge", [l17[1], l17[2], l17[5], l17[6], l17[7], l17[10], l17[12], l17[14], l17[15], l17[16]]));

  // ======================= LEVEL 18 (8th grade, second half) =======================
  const l18 = [];
  l18.push(L("Compounding more often", () => {
    const k = ri(0, 2), nm = pick(NM);
    if (k === 0) { const f = ri(1, 6); return q(`${nm} puts $${400 * f} in an account at 10% per year. The interest is added twice a year (5% each time). What is the balance in dollars after one year?`, 441 * f,
      "Interest is added in two steps, and the second step earns interest on the first.", "Multiply by 1.05 for the first half-year. Then multiply the result by 1.05 again.",
      () => { const x = 100 * ri(1, 5); return `Example: $${x} at 6% a year, added twice (3% each time): ${x} × 1.03 = ${r2(x * 1.03)}, × 1.03 = ${r2(x * 1.0609)}. Now do yours.`; }); }
    if (k === 1) { const f = ri(1, 6); return q(`An account holds $${100 * f}. It earns 20% per year, added as 10% twice a year. What is the balance in dollars after one year?`, 121 * f,
      "Think of two steps of 10% each, one after the other.", "Multiply by 1.10, then multiply the new amount by 1.10 again.",
      () => { const x = 100 * ri(2, 5); return `Example: $${x} at 10% twice: ${x} × 1.1 = ${r2(x * 1.1)}; ${r2(x * 1.1)} × 1.1 = ${r2(x * 1.21)}. Now do yours.`; }); }
    const f = ri(1, 6); return q(`${nm} puts $${400 * f} at 10% per year. Interest added once a year gives $${440 * f}. Added twice (5% each time) gives $${441 * f}. How many dollars more does adding twice a year earn?`, f,
      "Compare the two ending balances.", "Subtract the smaller balance from the larger one.",
      () => { const a = ri(3, 8) * 50 + 7; return `Example: $${a + 12} compared with $${a}. The gap is ${a + 12} − ${a} = $12. Now do yours.`; });
  }, [["Compounding", "🔁", "<b>Compound</b> interest earns interest on interest. Adding it more often helps a little more."], ["Two steps", "🪜", "10% a year paid twice is 5% twice. $400 → ×1.05 → $420 → ×1.05 → $441. Paid once, it would be $440."], ["Tip", "💡", "The more often interest is added, the more you earn. But the gains from a higher rate or more time are usually bigger."]]));

  l18.push(L("Tiered prices", () => {
    const a = pick([5, 10]), p1 = ri(4, 9), p2 = p1 - ri(1, 3), m = a + ri(2, 12), nm = pick(NM), k = ri(0, 2);
    const tx = `A shop sells stickers: the first ${a} cost $${p1} each, and every sticker after that costs $${p2} each.`;
    if (k === 0) return q(`${tx} ${nm} buys ${m}. What is the total cost in dollars?`, a * p1 + (m - a) * p2,
      "Price the two groups separately: the first ones and the extra ones.", `Cost of the first ${a} plus cost of the extra ones at the lower price.`,
      () => { const f = pick([4, 5]), x = ri(5, 8), y = x - ri(1, 2), n = f + ri(2, 6); return `Example: first ${f} at $${x}, rest at $${y}, buy ${n}. ${f} × ${x} = ${f * x}; ${n - f} × ${y} = ${(n - f) * y}. Total $${f * x + (n - f) * y}. Now do yours.`; });
    if (k === 1) return q(`${tx} How many dollars does it cost to buy exactly ${a} stickers?`, a * p1,
      "How many stickers are in the first (higher-priced) group?", "All of them are at the first price. Multiply.",
      () => { const f = pick([5, 10]), x = ri(3, 9) + 10; return `Example: ${f} items at $${x}. ${f} × ${x} = $${f * x}. Now do yours.`; });
    return q(`${tx} ${nm} buys ${m}. How many dollars are saved compared with paying $${p1} for every sticker?`, (m - a) * (p1 - p2),
      "Only the stickers after the first group get the lower price.", "Count the extra stickers. Multiply by how much cheaper each one is.",
      () => { const f = pick([4, 5]), x = ri(5, 8), d = ri(1, 2), n = f + ri(2, 6); return `Example: first ${f} at $${x}, then $${d} less. Buy ${n}: ${n - f} extra × ${d} = $${(n - f) * d} saved. Now do yours.`; });
  }, [["Tiers", "🪜", "Some prices change after a certain amount. The first group costs one price; the rest cost another."], ["Do it in parts", "🧩", "Find the cost of each group, then add. First 10 at $5 = $50. Next 4 at $3 = $12. Total $62."], ["Tip", "💡", "Write down where the price changes before you start calculating."]]));

  l18.push(L("Percent or percentage points?", () => {
    const k = ri(0, 2), a = pick([2, 4, 5, 8, 10]), pct = pick([25, 50, 100]), b = a + a * pct / 100, nm = pick(NM);
    if (k === 0) return q(`A savings rate rises from ${a}% to ${b}%. By how many percentage points did it rise?`, b - a,
      "Percentage points are the plain difference between the two percents.", "Subtract the old percent from the new percent.",
      () => { const x = ri(2, 6), y = x + ri(1, 4); return `Example: from ${x}% to ${y}%. ${y} − ${x} = ${y - x} percentage points. Now do yours.`; });
    if (k === 1) return q(`A savings rate rises from ${a}% to ${b}%. The rate itself grew by what percent? (percent change = increase ÷ old rate × 100)`, pct,
      "Percent change compares the increase with where it started.", "Find the increase in points. Divide by the old rate and write as a percent.",
      () => { const x = pick([2, 4, 5, 10]), p = pick([20, 50]), y = x + x * p / 100; return `Example: from ${x}% to ${y}%. Increase ${y - x}. ${y - x} ÷ ${x} = ${p / 100}, so ${p}%. Now do yours.`; });
    return mcq(`A loan rate goes from ${a}% to ${b}%. A headline says 'Rates up ${b - a} points'. What does '${b - a} points' mean?`, `${b}% minus ${a}%`, [`${b - a}% of ${a}%`, `${a}% minus ${b}%`],
      "A 'point' here is one step of one percent on the scale.", "Percentage points describe the plain difference between two percent numbers.",
      "Example: a rate goes from 3% to 5%. That is 2 points because 5 − 3 = 2. Now do yours.");
  }, [["Two ways", "🔀", "A rate going from 4% to 6% rose <b>2 percentage points</b>. Compared to where it began, it rose <b>50%</b> (2 ÷ 4)."], ["Why it matters", "📰", "News can use either. They are very different sounding numbers for the same change."], ["Tip", "💡", "Points = subtract. Percent change = increase ÷ old × 100."]]));

  l18.push(L("Raise versus inflation", () => {
    const k = ri(0, 2), r = ri(2, 8), i = ri(1, 9), S = 1000 * ri(2, 9), nm = pick(NM);
    if (k === 0) { const rr = ri(5, 9), ii = ri(1, 4); return q(`${nm} gets a ${rr}% raise. Prices rise ${ii}% over the year. By how many percentage points did the raise beat price growth?`, rr - ii,
      "Compare the raise with how fast prices went up.", "Subtract the price growth from the raise.",
      () => { const x = ri(5, 9), y = ri(1, 4); return `Example: raise ${x}%, prices ${y}%. ${x} − ${y} = ${x - y} points ahead. Now do yours.`; }); }
    if (k === 1) return q(`${nm} earns $${S} a month and gets a ${r}% raise. What is the new monthly pay in dollars?`, r2(S * (1 + r / 100)),
      "A raise adds a percent of the old pay.", "Multiply the old pay by 1 plus the raise as a decimal.",
      () => { const x = 1000 * ri(1, 4), p = pick([2, 5]); return `Example: $${x} with a ${p}% raise. ${x} × ${1 + p / 100} = $${r2(x * (1 + p / 100))}. Now do yours.`; });
    const up = r > i, same = r === i;
    return mcq(`${nm} gets a ${r}% raise. Prices rise ${i}% over the same time. What happens to what ${nm} can buy?`, same ? "It stays about the same" : up ? "It can buy a little more" : "It can buy a little less", same ? ["It can buy a little more", "It can buy a little less"] : up ? ["It can buy a little less", "It stays about the same"] : ["It can buy a little more", "It stays about the same"],
      "Compare how fast the pay grew with how fast the prices grew.", "If pay grows faster than prices, buying power rises. If slower, it falls.",
      "Example: pay up 3%, prices up 5%. Prices won the race, so a person can buy a little less. Now do yours.");
  }, [["Buying power", "🛒", "Prices usually rise (<b>inflation</b>). If your pay rises slower than prices, you can buy less than before."], ["Real raise", "📏", "A raise of 4% when prices rise 4% means you are just keeping up. Only the part above inflation is a <b>real</b> raise."], ["Tip", "💡", "Compare the raise percent with the inflation percent."]]));

  l18.push(L("Effective tax rate", () => {
    const inc = 10000 * ri(3, 12), pct = pick([10, 12, 15, 18, 20, 25]), tax = inc * pct / 100, nm = pick(NM), k = ri(0, 2);
    if (k === 0) return q(`${nm} earned $${inc} and paid $${tax} in income tax. What percent of the income was paid? (This is the effective tax rate.)`, pct,
      "The effective rate compares all the tax paid with all the income.", "Divide the tax by the income and write it as a percent.",
      () => { const a = 10000 * ri(2, 6), p = pick([10, 20]); return `Example: income $${a}, tax $${a * p / 100}. ${a * p / 100} ÷ ${a} = ${p / 100}, so ${p}%. Now do yours.`; });
    if (k === 1) return q(`${nm} earned $${inc}. The effective tax rate was ${pct}%. How many dollars of tax were paid?`, tax,
      "Find a percent of the income.", "Change the percent to a decimal and multiply by the income.",
      () => { const a = 10000 * ri(2, 6), p = pick([10, 20]); return `Example: income $${a} at ${p}%. ${a} × ${p / 100} = $${a * p / 100}. Now do yours.`; });
    return mcq("The 'marginal' tax rate is the rate on...", "your last (highest) dollars of income", ["all your income equally", "your savings", "your sales purchases"],
      "Think about the top bracket you reach.", "In a bracket system, only the income inside each bracket gets that bracket's rate.",
      "Example: if income over $50,000 is taxed at 20%, then the 20% applies only to dollars above $50,000. Now do yours.");
  }, [["Two rates", "🧮", "The <b>marginal rate</b> is the rate on your last dollars. The <b>effective rate</b> is all the tax divided by all the income."], ["Why different?", "📚", "Lower brackets are taxed at lower rates, so the overall (effective) rate is lower than the top bracket's rate."], ["Formula", "💡", "<b>Effective rate = tax paid ÷ income × 100</b>."]]));

  l18.push(L("Renting or owning", () => {
    const rent = ri(8, 20) * 100, mort = ri(7, 18) * 100, tax = ri(1, 4) * 1000, mnt = ri(1, 3) * 500, nm = pick(NM), k = ri(0, 2);
    if (k === 0) return q(`${nm}'s rent is $${rent} a month. How many dollars is the rent for one year?`, rent * 12,
      "A year has 12 months.", "Multiply the monthly rent by 12.",
      () => { const x = ri(5, 15) * 100 + 50; return `Example: $${x} a month × 12 = $${x * 12}. Now do yours.`; });
    if (k === 1) return q(`An owner pays $${mort} a month on a mortgage, $${tax} a year in property tax and about $${mnt} a year for repairs. What is the total yearly cost in dollars?`, mort * 12 + tax + mnt,
      "Put every cost on a yearly basis before adding.", "Multiply the monthly mortgage by 12. Then add the property tax and the repairs.",
      () => { const m = ri(6, 12) * 100, t = ri(1, 3) * 1000, r = ri(1, 3) * 500; return `Example: $${m} a month, $${t} tax, $${r} repairs. ${m} × 12 = ${m * 12}; + ${t} + ${r} = $${m * 12 + t + r}. Now do yours.`; });
    const own = mort * 12 + tax + mnt, rt = rent * 12; const hi = Math.max(own, rt), lo = Math.min(own, rt);
    return q(`Renting costs $${rt} a year. Owning costs $${own} a year. How many dollars more does the costlier choice cost in a year?`, hi - lo,
      "Find the difference between the two yearly totals.", "Subtract the smaller total from the larger.",
      () => { const a = ri(10, 20) * 1000 + 300, b = ri(4, 9) * 1000 + 200; return `Example: $${a} versus $${b}. ${a} − ${b} = $${a - b}. Now do yours.`; });
  }, [["Rent or own?", "🏠", "Renters pay rent. Owners pay a <b>mortgage</b>, property tax, insurance and repairs."], ["Yearly view", "📆", "Put everything on a yearly basis to compare. Monthly costs × 12, plus yearly bills."], ["Not only price", "⚖️", "Owning builds value in the home but costs more upfront. Renting is flexible. Money alone does not decide it."]]));

  l18.push(L("Portfolio mix", () => {
    const tot = 1000 * ri(2, 20), s = pick([40, 50, 60, 70]), b = pick([10, 20, 30]), cash = 100 - s - b, nm = pick(NM), k = ri(0, 2);
    if (k === 0) return q(`${nm}'s investments total $${tot}. ${s}% are in stock funds. How many dollars are in stock funds?`, tot * s / 100,
      "Find a percent of the total.", "Change the percent to a decimal and multiply by the total.",
      () => { const t = 1000 * ri(2, 8), p = pick([40, 50]); return `Example: $${t} with ${p}% in stocks. ${t} × ${p / 100} = $${t * p / 100}. Now do yours.`; });
    if (k === 1) return q(`${nm}'s investments are ${s}% stock funds and ${b}% bond funds. The rest is cash. What percent is cash?`, cash,
      "All the parts together make 100%.", "Add the stock and bond percents and subtract from 100.",
      () => { const x = pick([30, 40]), y = pick([20, 30]); return `Example: ${x}% stocks and ${y}% bonds. ${x} + ${y} = ${x + y}. 100 − ${x + y} = ${100 - x - y}% cash. Now do yours.`; });
    return q(`${nm} holds $${tot * s / 100} in stock funds. That is ${s}% of the whole portfolio. What is the whole portfolio worth in dollars?`, tot,
      "The stock part is only a share of the total. The total is bigger.", "Divide the stock dollars by the percent written as a decimal.",
      () => { const t = 1000 * ri(2, 8), p = pick([40, 50]); return `Example: $${t * p / 100} is ${p}% of the total. ${t * p / 100} ÷ ${p / 100} = $${t}. Now do yours.`; });
  }, [["A mix", "🥧", "A <b>portfolio</b> is everything you have invested. Many people hold a mix: stocks, bonds and cash."], ["Parts of a whole", "➗", "The percents add to 100%. 60% stocks + 30% bonds leaves 10% for cash."], ["Why a mix?", "🛡️", "Mixing different kinds of investments (diversifying) helps keep one bad year from hurting too much."]]));

  l18.push(L("Dollar-cost averaging", () => {
    const sets = [[60, [10, 20, 20]], [100, [10, 20, 20]], [120, [10, 15, 30]], [60, [5, 10, 10]], [40, [4, 8, 8]], [60, [6, 12, 12]], [50, [5, 10, 10]]], [A, ps] = pick(sets), nm = pick(NM), k = ri(0, 2);
    const sh = ps.map(p => A / p), totSh = sh.reduce((x, y) => x + y, 0), inv = A * 3, avg = r2(inv / totSh);
    const tx = `Each month ${nm} invests $${A}. The share prices in the three months are $${ps[0]}, $${ps[1]} and $${ps[2]}.`;
    const i = ri(0, 2);
    if (k === 0) return q(`${tx} How many shares does ${nm} buy in month ${i + 1}?`, sh[i],
      "Shares bought = money invested ÷ price per share.", "Divide the monthly amount by that month's share price.",
      () => { const a = ri(2, 6) * 10, p = pick([5, 10]); return `Example: $${a * 1} when the price is $${p}? ${a} ÷ ${p} = ${r2(a / p)} shares. Now do yours.`; });
    if (k === 1) return q(`${tx} How many shares does ${nm} own after the three months?`, totSh,
      "Find the shares for each month first, then put them together.", "Divide $" + A + " by each price, then add the three results.",
      () => { const a = 40, p = [4, 8, 8], s = p.map(x => a / x); return `Example: $${a} at $${p[0]}, $${p[1]}, $${p[2]} gives ${s.join(" + ")} = ${s.reduce((x, y) => x + y, 0)} shares. Now do yours.`; });
    return q(`${tx} What is ${nm}'s average cost per share in dollars? (total invested ÷ total shares)`, avg,
      "Average cost = everything you paid ÷ everything you got.", "Find the total dollars invested and the total shares owned, then divide.",
      () => { const a = 20, p = [2, 4, 4], s = p.map(x => a / x), t = s.reduce((x, y) => x + y, 0); return `Example: $${a} three times at $${p[0]}, $${p[1]}, $${p[2]}. Dollars ${a * 3}; shares ${t}. ${a * 3} ÷ ${t} = $${r2(a * 3 / t)}. Now do yours.`; });
  }, [["Steady investing", "📅", "<b>Dollar-cost averaging</b> means investing the same dollar amount on a schedule, like $50 each month."], ["Price changes", "🔄", "When the price is low, your dollars buy more shares. When it is high, they buy fewer."], ["Average cost", "🧮", "<b>Average cost per share = total dollars ÷ total shares</b>. It is lower than the plain average of the prices when prices vary."]]));

  l18.push(L("Depreciation", () => {
    const V = pick([16000, 24000, 32000]), r = pick([10, 20, 25]), nm = pick(NM), k = ri(0, 2), v1 = V * (1 - r / 100), v2 = V * (1 - r / 100) * (1 - r / 100);
    if (k === 0) return q(`A car worth $${V} loses ${r}% of its value in a year. What is it worth after one year, in dollars?`, r2(v1),
      "Depreciation means the value goes down.", "Multiply by 1 minus the percent as a decimal.",
      () => { const x = pick([10000, 20000]), p = pick([10, 20]); return `Example: $${x} losing ${p}%. ${x} × ${1 - p / 100} = $${x * (1 - p / 100)}. Now do yours.`; });
    if (k === 1) return q(`A car worth $${V} loses ${r}% of its value each year. What is it worth after two years, in dollars?`, r2(v2),
      "The second year's loss is a percent of the value after year one.", "Find the value after year one. Then lose the same percent from that.",
      () => { const x = 10000, p = 10; return `Example: $${x} losing ${p}% a year: year 1 → ${x * 0.9}, year 2 → ${x * 0.81}. Now do yours.`; });
    return q(`A car worth $${V} loses ${r}% of its value each year. How many dollars of value does it lose over two years?`, r2(V - v2),
      "Compare the starting value with the value after two years.", "Work out the value after two years. Then subtract from the starting value.",
      () => { const x = 10000, p = 20; return `Example: $${x} losing ${p}% a year goes to ${x * 0.64} after two years. Lost = ${x} − ${x * 0.64} = $${x - x * 0.64}. Now do yours.`; });
  }, [["Losing value", "📉", "Cars and phones lose value as they age. This is called <b>depreciation</b>."], ["Each year", "🧮", "A car that loses 20% a year keeps 80%. After year 1: × 0.80. After year 2: × 0.80 again."], ["Assets", "💡", "Things that lose value are not savings. Think about it before you spend a lot on them."]]));

  l18.push(L("Health insurance bill", () => {
    const d = pick([500, 1000, 1500]), c = pick([10, 20, 25]), rest = 1000 * ri(1, 5), B = d + rest, nm = pick(NM), k = ri(0, 2), co = rest * c / 100;
    const tx = `${nm}'s medical bill is $${B}. The plan has a $${d} deductible, then pays the rest except for ${c}% coinsurance that ${nm} pays.`;
    if (k === 0) return q(`${tx} After the deductible, how many dollars of the bill remain?`, rest,
      "The deductible is the first part you pay yourself.", "Subtract the deductible from the bill.",
      () => { const b = ri(2, 6) * 1000, dd = 500; return `Example: bill $${b}, deductible $${dd}. ${b} − ${dd} = $${b - dd} remain. Now do yours.`; });
    if (k === 1) return q(`${tx} How many dollars is ${nm}'s total share (deductible plus coinsurance)?`, d + co,
      "Two parts add up: the deductible and the coinsurance on what remains.", `Subtract the deductible from the bill. Take ${c}% of what remains. Add the deductible back.`,
      () => { const b = ri(2, 6) * 1000, dd = 500, p = pick([10, 20]); return `Example: bill $${b}, deductible $${dd}, ${p}% coinsurance. Remaining ${b - dd}. ${p}% is ${(b - dd) * p / 100}. Total ${(b - dd) * p / 100 + dd}. Now do yours.`; });
    return q(`${tx} How many dollars does the insurance company pay?`, B - d - co,
      "Insurance pays what is left after the patient's share.", "Find the patient's share (deductible plus coinsurance). Subtract it from the bill.",
      () => { const b = 3000, dd = 500, p = 20; return `Example: bill $${b}, patient pays ${dd} + ${(b - dd) * p / 100} = ${dd + (b - dd) * p / 100}. Insurance pays ${b - dd - (b - dd) * p / 100}. Now do yours.`; });
  }, [["Deductible", "🩺", "The <b>deductible</b> is what you pay first each year before the plan helps."], ["Coinsurance", "🤝", "After the deductible, you may pay a percent (say 20%) of the bill. The plan pays the rest."], ["Order", "💡", "1) Subtract the deductible. 2) Take the coinsurance percent of what is left. 3) Add the deductible back to get your total."]]));

  l18.push(mcL("Kinds of business", [
    ["A business owned and run by one person is a...", "sole proprietorship", ["corporation", "nonprofit", "government agency"], "Think of one owner.", "The owner and the business are treated as one."],
    ["An LLC protects owners by...", "separating personal money from business debts", ["making taxes disappear", "guaranteeing profit", "removing all risk"], "LLC stands for limited liability company.", "Limited liability means limited personal risk."],
    ["A group that works for a cause and uses extra money for that cause is a...", "nonprofit", ["sole proprietorship", "shop for profit", "bank"], "It does not pay out profit to owners.", "Its goal is a mission, not profit."],
    ["Owners of a corporation own it through...", "shares of stock", ["rent", "coupons", "gift cards"], "They hold pieces of ownership.", "Each piece is called a share."],
    ["A franchise is...", "a license to run a business using a known brand", ["a kind of tax", "a free business", "a bank loan"], "Think of well-known chain stores run by local owners.", "The owner follows the brand's rules and pays fees."],
    ["Which business needs the most startup money?", "A factory that builds cars", ["A babysitting service", "A dog-walking service", "A lemonade stand"], "Think about equipment and buildings.", "Large machines and buildings cost a lot."],
    ["A business plan usually includes...", "what you sell, who buys it, and how much it will cost", ["only a logo", "only a name", "nothing about money"], "It is a map for the business.", "It answers who, what and how much."],
    ["Profit is...", "money left after all costs are paid", ["all the money coming in", "the cost of supplies", "a loan from the bank"], "Costs are subtracted first.", "Revenue minus costs equals profit."]
  ], "Example: A single person who runs a small dog-walking business is a sole proprietorship or a corporation? A sole proprietorship, because one person owns and runs it. Now do yours.",
    [["Types", "🏪", "A business can be one owner (<b>sole proprietorship</b>), a company that limits owners' risk (<b>LLC</b>), or one owned by shareholders (<b>corporation</b>)."], ["Nonprofits", "❤️", "A <b>nonprofit</b> uses extra money for its mission, such as helping animals or schools."], ["Planning", "📝", "A good business plan says what you sell, who will buy, and what it costs."]]));

  l18.push(mcL("Measuring the economy", [
    ["GDP measures...", "the value of all goods and services made in a country", ["the number of stores", "the weather", "the number of banks"], "It is a big total for a country.", "It adds up the value of what is produced."],
    ["The unemployment rate is the percent of...", "people who want work but cannot find it", ["people who are retired", "children in school", "people who own a business"], "It counts people looking for jobs.", "It is not the same as everyone without a job."],
    ["Inflation is measured by watching...", "how prices of common goods change", ["how tall people are", "how many cars exist", "weather patterns"], "It tracks a basket of everyday items.", "A rise in the price of that basket is inflation."],
    ["A recession is a time when...", "the economy shrinks and many people lose jobs", ["everyone gets raises", "prices stop at zero", "banks close forever"], "It is a slow period for the economy.", "Spending and production fall."],
    ["When GDP is growing, the economy is usually...", "expanding", ["shrinking", "frozen", "empty"], "Growth means more is made.", "More production means a growing economy."],
    ["Which tends to rise when many people lose jobs?", "unemployment", ["GDP", "stock of cash in wallets", "temperatures"], "More people are looking for work.", "Count the people without jobs who want one."],
    ["Deflation means...", "prices are falling in general", ["prices rising fast", "wages doubling", "taxes ending"], "It is the opposite of inflation.", "General prices fall."],
    ["Why do leaders watch these numbers?", "To judge how healthy the economy is", ["To pick sports winners", "To set the weather", "To choose holidays"], "They help decide on policies.", "They show if the economy is doing well or poorly."]
  ], "Example: Does unemployment measure people who want jobs and cannot find them, or people on vacation? People who want jobs and cannot find them. Now do yours.",
    [["Big numbers", "🌎", "<b>GDP</b> is the value of everything a country makes in a year. It shows if the economy is growing."], ["Jobs and prices", "👷", "The <b>unemployment rate</b> shows how many job seekers cannot find work. <b>Inflation</b> shows how fast prices rise."], ["Ups and downs", "🎢", "Economies grow, then sometimes shrink in a <b>recession</b>, then grow again."]]));

  l18.push(mcL("Too good to be true", [
    ["An advertisement promises 'Double your money in a week, guaranteed!' This is probably...", "a scam", ["a safe plan", "a government program", "a savings account"], "Real investments always have some risk.", "Guaranteed huge profits quickly are a classic warning sign."],
    ["A scheme that pays old investors with new investors' money is called a...", "Ponzi scheme", ["savings plan", "budget", "dividend"], "The money is not coming from real profits.", "It collapses when new investors stop joining."],
    ["Which is a warning sign of investment fraud?", "Pressure to act immediately", ["A clear written explanation", "A license you can check", "Time to ask questions"], "Fraudsters rush you.", "Real advisors let you think."],
    ["An 'investment' asks you to recruit friends to earn money. This is a sign of...", "a pyramid scheme", ["a savings account", "a fair business", "a gift"], "Money comes mostly from signing up others.", "Recruiting is the main way anyone makes money."],
    ["The best protection against scams is...", "slowing down, asking an adult, and checking facts", ["acting fast", "trusting every ad", "sharing your bank details"], "Think before you act.", "Time and advice stop most scams."],
    ["Someone you only met online asks you to send money for a special investment. You should...", "say no and tell a trusted adult", ["send a little to try it", "give your passwords", "keep it a secret"], "Strangers online can pretend to be anyone.", "Do not send money to people you do not know."],
    ["Higher promised returns usually come with...", "higher risk", ["lower risk", "no risk", "free money"], "Risk and reward go together.", "If it promises huge returns with no risk, doubt it."],
    ["A fake 'prize' says you must pay a fee to get your winnings. This is...", "a common scam", ["how contests normally work", "a government rule", "a bank policy"], "Real prizes do not ask you to pay first.", "Paying to collect a prize is a red flag."]
  ], "Example: A message promises 'No risk, 50% every month!' Is it believable or a warning sign? A warning sign, because no real investment can promise that. Now do yours.",
    [["Red flags", "🚩", "Guaranteed huge returns, pressure to act fast, secrecy and asking you to recruit others are all <b>warning signs</b>."], ["Famous tricks", "🪤", "A <b>Ponzi scheme</b> pays old investors with new investors' money. A <b>pyramid scheme</b> pays people to sign up others."], ["Stay safe", "🛡️", "Slow down. Check facts. Talk to a trusted adult before sending money anywhere."]]));

  l18.push(L("Reading an income statement", () => {
    const R = 1000 * ri(2, 10), cogs = R * pick([30, 40, 50]) / 100, ex = R * pick([10, 20]) / 100, nm = pick(NM), k = ri(0, 2);
    const tx = `${nm}'s shop had sales of $${R}, cost of goods sold $${cogs} and other expenses $${ex}.`;
    if (k === 0) return q(`${tx} What is the gross profit in dollars? (sales − cost of goods sold)`, R - cogs,
      "Gross profit only subtracts the cost of the goods sold.", "Subtract the cost of goods sold from the sales.",
      () => { const a = ri(2, 6) * 1000, b = ri(1, 3) * 1000; return `Example: sales $${a}, cost of goods $${b}. ${a} − ${b} = $${a - b}. Now do yours.`; });
    if (k === 1) return q(`${tx} What is the net profit in dollars?`, R - cogs - ex,
      "Net profit is what is left after every cost.", "Subtract both the cost of goods sold and the other expenses from sales.",
      () => { const a = ri(3, 8) * 1000, b = ri(1, 2) * 1000, c = 500; return `Example: sales $${a}, goods $${b}, expenses $${c}. ${a} − ${b} − ${c} = $${a - b - c}. Now do yours.`; });
    return q(`${tx} The net profit is $${R - cogs - ex}. What percent of sales is that? (net margin)`, r2((R - cogs - ex) / R * 100),
      "Margin compares profit with sales.", "Divide net profit by sales, then multiply by 100.",
      () => { const a = 1000 * ri(2, 5), p = pick([10, 20, 25]); return `Example: profit $${a * p / 100} on sales of $${a}. ${a * p / 100} ÷ ${a} = ${p / 100}, so ${p}%. Now do yours.`; });
  }, [["Income statement", "📋", "An <b>income statement</b> lists a business's sales, costs and profit for a period of time."], ["Two profits", "➖", "<b>Gross profit</b> = sales − cost of goods. <b>Net profit</b> = gross profit − other expenses (rent, wages)."], ["Margin", "💡", "<b>Net margin = net profit ÷ sales × 100.</b> It shows how much of each sales dollar is kept."]]));

  l18.push(L("Cost of living", () => {
    const sa = ri(30, 60) * 1000, ra = ri(8, 14) * 100, sb = sa + ri(2, 8) * 1000, rb = ra + ri(3, 8) * 100, nm = pick(NM), k = ri(0, 2);
    const leftA = sa - ra * 12, leftB = sb - rb * 12;
    const tx = `City A: salary $${sa}, rent $${ra} a month. City B: salary $${sb}, rent $${rb} a month.`;
    if (k === 0) return q(`${nm} is comparing two job offers. ${tx} After rent for the year, how many dollars are left in City A?`, leftA,
      "Rent is paid every month for 12 months.", "Multiply the monthly rent by 12. Subtract it from the salary.",
      () => { const s = ri(3, 6) * 10000, r = ri(6, 10) * 100 + 50; return `Example: salary $${s}, rent $${r} a month. Rent for a year ${r * 12}. ${s} − ${r * 12} = $${s - r * 12}. Now do yours.`; });
    if (k === 1) return q(`${nm} is comparing two job offers. ${tx} After a year of rent, how many dollars are left in City B?`, leftB,
      "Rent is paid every month for 12 months.", "Multiply the monthly rent by 12. Subtract it from the salary.",
      () => { const s = ri(3, 6) * 10000, r = ri(6, 10) * 100 + 50; return `Example: salary $${s}, rent $${r} a month. Rent for a year ${r * 12}. ${s} − ${r * 12} = $${s - r * 12}. Now do yours.`; });
    const better = leftA > leftB ? "City A" : leftB > leftA ? "City B" : "Equal";
    return mcq(`${nm} is comparing two job offers. ${tx} Which city leaves more money after a year of rent?`, better, ["City A", "City B", "Equal"].filter(x => x !== better).slice(0, 2),
      "A bigger salary does not always mean more money left.", "Work out salary minus a year of rent for each city and compare.",
      "Example: City X pays $50,000 with $1,000 monthly rent → $38,000 left. City Y pays $55,000 with $1,800 rent → $33,400 left. X leaves more. Now do yours.");
  }, [["Cost of living", "🏙️", "Prices differ from place to place. A bigger paycheck may not go as far where rent is high."], ["Compare what is left", "🧮", "Yearly salary − yearly rent (monthly rent × 12) shows what remains for everything else."], ["Tip", "💡", "Compare more than salary: rent, food, transport and taxes can all change."]]));

  l18.push(mcL("Contracts and cosigning", [
    ["A cosigner on a loan is...", "someone who promises to pay if the borrower does not", ["a person who gets the money", "a bank worker", "a tax collector"], "They back up the borrower.", "If the borrower fails to pay, the cosigner must."],
    ["Before signing a contract you should...", "read it all and ask about anything unclear", ["sign first, read later", "let someone else sign", "skip the small print"], "A signature is a promise.", "Understand it before you agree."],
    ["A contract is...", "a legal agreement between two or more people", ["a bank account", "a type of tax", "a list of prices"], "It binds those who sign it.", "It states what each side must do."],
    ["Cosigning a loan for a friend can hurt your credit if...", "the friend misses payments", ["the friend pays on time", "the loan is repaid", "you never see the loan"], "You share the responsibility.", "Missed payments show up on both people's records."],
    ["A clause saying 'automatic renewal' means...", "the contract continues unless you cancel", ["it ends on its own", "it is free forever", "it cannot be signed"], "Look at what happens if you do nothing.", "You may need to cancel before a deadline."],
    ["Why get important agreements in writing?", "It records what was promised", ["It makes the deal free", "It removes the tax", "It cancels the contract"], "Spoken promises are hard to prove.", "Paper gives proof of the terms."],
    ["If someone asks you to sign a contract with blank spaces, you should...", "not sign until it is filled in", ["sign anyway", "write in your bank number", "ask them to fill it in later"], "Someone could fill the blanks with anything.", "Never sign an incomplete contract."],
    ["Minors (kids) often cannot sign most contracts alone because...", "the law requires an adult to agree", ["children cannot read", "contracts are free for kids", "banks ban kids"], "Laws protect young people.", "A parent or guardian usually has to sign."]
  ], "Example: If a friend asks you to cosign a loan, who must pay if the friend stops paying? You, the cosigner. Now do yours.",
    [["Contracts", "📜", "A <b>contract</b> is a legal promise. It lists what each side must do, the price and what happens if someone breaks it."], ["Cosigning", "✍️", "A <b>cosigner</b> agrees to pay if the borrower cannot. It is a big risk, so think hard."], ["Read first", "👓", "Read everything, ask questions, and never sign blank spaces. A trusted adult can help."]]));

  l18.push(L("A first apartment budget", () => {
    const inc = ri(18, 40) * 100, rent = Math.round(inc * pick([25, 30]) / 100 / 10) * 10, food = ri(3, 6) * 100, trans = ri(1, 3) * 100, ph = ri(4, 8) * 10, nm = pick(NM), k = ri(0, 2);
    const spent = rent + food + trans + ph;
    const tx = `${nm}'s monthly take-home pay is $${inc}. Rent is $${rent}, food $${food}, transport $${trans} and phone $${ph}.`;
    if (k === 0) return q(`${tx} How many dollars are left each month?`, inc - spent,
      "Add the costs, then compare with the pay.", "Add rent, food, transport and phone. Subtract the total from the pay.",
      () => { const a = ri(20, 30) * 100, b = ri(5, 9) * 100, c = ri(3, 5) * 100, d = ri(1, 2) * 100 + 40; return `Example: pay $${a}; costs ${b}, ${c}, ${d}. Total ${b + c + d}. ${a} − ${b + c + d} = $${a - b - c - d}. Now do yours.`; });
    if (k === 1) return q(`${tx} What percent of the pay goes to rent? Round to the nearest whole number.`, Math.round(rent / inc * 100),
      "Percent of pay = rent divided by pay.", "Divide the rent by the pay. Multiply by 100 and round.",
      () => { const a = 2000, r = 500; return `Example: rent $${r}, pay $${a}. ${r} ÷ ${a} = 0.25, so 25%. Now do yours.`; });
    return q(`A common guide says rent should be about 30% of take-home pay. If ${nm}'s pay is $${inc} a month, what is the most rent by that guide, in dollars?`, inc * 30 / 100,
      "Find 30% of the pay.", "Multiply the pay by 0.30.",
      () => { const a = ri(15, 30) * 100 + 50; return `Example: pay $${a}. ${a} × 0.30 = $${r2(a * 0.3)}. Now do yours.`; });
  }, [["Take-home pay", "💵", "<b>Take-home pay</b> is what is left after taxes. Build your budget from this number."], ["Needs first", "🏠", "List fixed needs first: rent, food, transport, phone, utilities. Then see what remains for saving and fun."], ["The 30% guide", "📏", "Many people try to keep rent near <b>30%</b> of take-home pay so there is room for other needs and savings."]]));

  l18.push(L("Units to reach a profit goal", () => {
    const price = ri(8, 20), v = ri(2, price - 3), F = ri(2, 10) * 50, n = ri(5, 40), target = n * (price - v) - F, nm = pick(NM);
    const g = target > 0 ? target : 0;
    if (g > 0 && Math.random() < 0.6) return q(`${nm} sells crafts for $${price} each. Materials cost $${v} per craft. Fixed costs are $${F}. How many crafts must ${nm} sell to make a profit of $${g}?`, (g + F) / (price - v),
      "Each sale adds the price minus the materials to the pot. Fixed costs and the profit goal both have to be covered.", "Add the fixed costs and the goal. Then divide by the money each craft adds (price minus materials).",
      () => { const p = ri(8, 12), m = ri(2, 4), f = 100, nn = ri(20, 40); const t = nn * (p - m) - f; return `Example: price $${p}, materials $${m}, fixed $${f}, goal $${t}. (${t} + ${f}) ÷ (${p} − ${m}) = ${nn} crafts. Now do yours.`; });
    if (Math.random() < 0.5) return q(`${nm} sells crafts for $${price} each. Materials cost $${v} each. How many dollars does each craft add toward covering fixed costs and profit?`, price - v,
      "Each sale brings in the price but uses up the materials cost.", "Subtract the materials cost from the price.",
      () => { const p = ri(8, 15), m = ri(2, p - 3); return `Example: price $${p}, materials $${m}. ${p} − ${m} = $${p - m}. Now do yours.`; });
    return q(`${nm} sells crafts for $${price} each. Materials cost $${v} each. Fixed costs are $${F}. How many crafts must ${nm} sell just to break even? (If the answer is not whole, round up.)`, Math.ceil(F / (price - v)),
      "Break even means profit of zero.", "Divide the fixed costs by the money each craft adds (price minus materials). Round up to a whole craft.",
      () => { const p = ri(8, 12), m = ri(2, 4), f = ri(2, 6) * 50 + 25; return `Example: price $${p}, materials $${m}, fixed $${f}. Each adds ${p - m}. ${f} ÷ ${p - m} = ${r2(f / (p - m))}, round up to ${Math.ceil(f / (p - m))}. Now do yours.`; });
  }, [["Each sale", "🧶", "When you sell one item, you keep <b>price − materials</b>. That amount helps pay the fixed costs and then becomes profit."], ["Break even", "⚖️", "Break-even sales = fixed costs ÷ (price − materials). Round up."], ["A profit goal", "🎯", "Units for a goal = (fixed costs + goal) ÷ (price − materials)."]]));

  l18.push(mixOf("Mixed practice", [l18[0], l18[2], l18[4], l18[6], l18[8], l18[13]]));
  l18.push(mixOf("Level 18 Challenge", [l18[1], l18[3], l18[5], l18[7], l18[9], l18[10], l18[11], l18[12], l18[14], l18[15], l18[16], l18[17]]));

  Object.assign(MONEY_LEVELS, { 16: l16, 17: l17, 18: l18 });
})();
