// ext/money-10-12.js  Mind Lab Money Skills levels 10-12 (60 lessons)
(() => {
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const THINGS = [["📖", "book"], ["🧢", "cap"], ["🎒", "backpack"], ["⚽", "ball"], ["🎨", "paint set"], ["🧩", "puzzle"], ["🪁", "kite"], ["👕", "shirt"]];
  const PLUR = [["👕", "shirts"], ["🧢", "caps"], ["🎒", "backpacks"], ["📖", "books"], ["🧩", "puzzles"], ["🪁", "kites"], ["⚽", "balls"]];
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
  const mul = (m, lo, hi) => m * ri(Math.ceil(lo / m), Math.floor(hi / m));
  const dollars = c => "$" + (c / 100).toFixed(2);
  const re = a => new RegExp("(?<![\\d.])" + String(a).replace(/\./g, "\\.") + "(?![\\d])");
  // build a worked-example hint that does not contain the real answer
  const ex = (fn, a) => { let r, i = 0; do { r = fn(); } while (re(a).test(r) && ++i < 120); return r; };
  const num = (text, a, h1, h2, exFn, more) => Object.assign({ text, answer: a, hints: [h1, h2, ex(exFn, a)] }, more || {});
  const mq = (items, hints) => () => { const it = pick(items); return { text: it.q, choices: shuf([it.a, ...it.w]), answer: it.a, hints }; };
  const H_MC = ["Read each choice slowly and think about what the words mean.", "Cross out the choices that are unsafe, unfair or do not make sense. Which one is left?", "Example: if the question is about keeping money safe, pick the choice that protects it and asks a parent when you are unsure."];
  const rpick = (a, n) => shuf(a).slice(0, n);

  // ---------------- question makers ----------------
  const M = {
    roundDollar() {
      return () => {
        const d = ri(2, 99), c = pick([ri(1, 49), ri(50, 99)]), ans = c >= 50 ? d + 1 : d;
        return num(`Round $${d}.${String(c).padStart(2, "0")} to the nearest dollar. (Type the number of dollars.)`, ans,
          "Look at the cents. They show which whole dollar the price is closer to.",
          "If the cents are less than fifty, keep the dollars the same. If the cents are fifty or more, go up to the next whole dollar.",
          () => { const ed = ri(2, 99), ec = pick([ri(1, 49), ri(50, 99)]); return `Example: $${ed}.${String(ec).padStart(2, "0")} has ${ec} cents. ${ec >= 50 ? "That is 50 or more, so go up to" : "That is less than 50, so stay at"} $${ec >= 50 ? ed + 1 : ed}. Now do yours.`; });
      };
    },
    compareDec() {
      return () => {
        const d = ri(1, 9), least = Math.random() < 0.5, vals = rpick([5, 9, 15, 19, 45, 50, 54, 90, 95], 3).map(c => d * 100 + c);
        const ans = least ? Math.min(...vals) : Math.max(...vals), de = d % 9 + 1;
        return { text: `Which price is the ${least ? "LEAST" : "GREATEST"}?`, choices: vals.map(dollars), answer: dollars(ans),
          hints: ["Line up the decimal points. Compare the whole dollars first.", "If the dollars match, compare the dimes place (the first digit after the point), then the pennies place.", `Example: ${dollars(de * 100 + 45)}, ${dollars(de * 100 + 5)} and ${dollars(de * 100 + 50)} all have ${de} dollars. The dimes digits are 4, 0 and 5. The least has the 0, so it is ${dollars(de * 100 + 5)}. Now do yours.`] };
      };
    },
    coupon() {
      return () => {
        const [e, n] = pick(THINGS), p = ri(12, 90), off = pick([2, 3, 4, 5, 6, 8, 10]);
        return num(`${e} A ${n} costs $${p}. You have a coupon for $${off} off. How many dollars do you pay?`, p - off,
          "A coupon takes money off the price. Does the price go up or down?",
          "Subtract the coupon amount from the price.",
          () => { const a = ri(12, 90), b = pick([2, 3, 4, 5]); return `Example: a $${a} item with a $${b} coupon: ${a} − ${b} = $${a - b}. Now do yours.`; });
      };
    },
    bogo() {
      return () => {
        const [e, pl] = pick(PLUR), P = 2 * ri(5, 40), pairs = ri(1, 3), N = 2 * pairs;
        return num(`${e} A shop sells ${pl} for $${P} each. Sale: buy one, get one half off (the second one costs half price). You buy ${N}. What is the total in dollars?`, pairs * P * 3 / 2,
          "Items come in pairs. In each pair, one costs the full price and one costs half.",
          "Find half of the price. Add it to the full price to get the cost of one pair. Then multiply by the number of pairs.",
          () => { const a = 2 * ri(5, 40), k = ri(1, 3); return `Example: items at $${a}. Half is $${a / 2}. One pair costs ${a} + ${a / 2} = $${a * 3 / 2}. With ${k} pair${k > 1 ? "s" : ""}, the total is $${k * a * 3 / 2}. Now do yours.`; });
      };
    },
    spendTable() {
      return () => {
        const cats = rpick([["🍿", "Snacks"], ["🧸", "Toys"], ["📚", "Books"], ["🎮", "Games"], ["🎁", "Gifts"], ["🖍️", "Art supplies"]], 4);
        let amts; do { amts = cats.map(() => 5 * ri(1, 14)); } while (new Set(amts).size < 4);
        const table = cats.map((c, i) => `${c[0]} ${c[1]}: $${amts[i]}`).join("<br>");
        const kind = ri(0, 3), mx = Math.max(...amts), mn = Math.min(...amts), tot = amts.reduce((s, x) => s + x, 0);
        const exT = (what) => () => { const a = 5 * ri(2, 12), b = 5 * ri(2, 12), c = 5 * ri(2, 12); return what === "tot" ? `Example: $${a}, $${b} and $${c} add up to $${a + b + c}. Now do yours.` : `Example: $${Math.max(a, b)} and $${Math.min(a, b)}: the difference is ${Math.max(a, b)} − ${Math.min(a, b)} = $${Math.abs(a - b)}. Now do yours.`; };
        if (kind === 0) return { text: `Mia tracked her spending for a month:<br>${table}<br>Which kind of spending was the BIGGEST?`, choices: rpick(cats.map((c, i) => [c[1], amts[i]]).filter(x => x[1] !== mx), 2).map(x => x[0]).concat(cats[amts.indexOf(mx)][1]).sort(() => Math.random() - 0.5), answer: cats[amts.indexOf(mx)][1],
          hints: ["Read the amount next to each kind of spending.", "Look for the greatest number in the list.", "Example: Pizza $12, Movie $20, Book $8. The greatest amount is $20, so the movie is the biggest. Now do yours."] };
        if (kind === 1) return num(`Mia tracked her spending for a month:<br>${table}<br>How many dollars did she spend in all?`, tot,
          "To find how much was spent in all, put every amount together.", "Add all four amounts. Add the biggest ones first if that is easier.", exT("tot"));
        if (kind === 2) return num(`Mia tracked her spending for a month:<br>${table}<br>How many MORE dollars did she spend on ${cats[amts.indexOf(mx)][1]} than on ${cats[amts.indexOf(mn)][1]}?`, mx - mn,
          "Comparing two amounts and asking how many more means finding the difference.", "Subtract the smaller amount from the bigger one.", exT("dif"));
        if (mx % 2 === 0) return num(`Mia tracked her spending for a month:<br>${table}<br>She wants to cut her spending on ${cats[amts.indexOf(mx)][1]} in half. How many dollars would she save?`, mx / 2,
          "Cutting something in half means taking away one half of it.", "Find half of the biggest amount. That is how much she would save.",
          () => { const a = 2 * ri(5, 30); return `Example: half of $${a} is $${a / 2}, so cutting it in half saves $${a / 2}. Now do yours.`; });
        return num(`Mia tracked her spending for a month:<br>${table}<br>How many dollars did she spend on ${cats[amts.indexOf(mx)][1]} and ${cats[amts.indexOf(mn)][1]} together?`, mx + mn,
          "Together means you put the two amounts together.", "Add the two amounts from the list.", exT("tot"));
      };
    },
    bulk() {
      return () => {
        const n = pick([4, 6, 8, 10, 12]), s = ri(2, 9), save = ri(2, Math.floor(n * s / 3)), T = n * s - save, it = pick(["juice boxes", "pencils", "granola bars", "notebooks", "markers"]);
        return num(`Single ${it} cost $${s} each. A pack of ${n} costs $${T}. How many dollars do you save by buying the pack instead of ${n} singles?`, save,
          "First find what the same number of singles would cost. Then compare it with the pack price.",
          "Multiply the price of one by how many are in the pack. Then subtract the pack price.",
          () => { const k = pick([4, 6, 8]), p = ri(2, 6), pk = k * p - ri(1, 3); return `Example: ${k} singles at $${p} cost ${k} × ${p} = $${k * p}. A pack costs $${pk}. You save ${k * p} − ${pk} = $${k * p - pk}. Now do yours.`; });
      };
    },
    minutes() {
      return () => {
        const w = pick([8, 12, 16, 20, 24]), h = ri(1, 5), m = pick([15, 30, 45]), nm = pick(NM), extra = w * m / 60;
        return num(`${nm} earns $${w} an hour. ${nm} works ${h} hour${h > 1 ? "s" : ""} and ${m} minutes. How many dollars does ${nm} earn?`, w * h + extra,
          "Pay for whole hours is easy. For the extra minutes, think of them as part of an hour.",
          "Fifteen minutes is one fourth of an hour, thirty minutes is one half and forty-five minutes is three fourths. Find that part of one hour's pay and add it to the whole hours.",
          () => { const a = pick([8, 12, 16]), b = ri(1, 4), c = pick([15, 30, 45]); return `Example: $${a} an hour for ${b} hour${b > 1 ? "s" : ""} and ${c} minutes. Whole hours: ${a} × ${b} = ${a * b}. Extra: ${c} minutes is ${c === 15 ? "one fourth" : c === 30 ? "one half" : "three fourths"} of $${a}, which is $${a * c / 60}. Total: $${a * b + a * c / 60}. Now do yours.`; });
      };
    },
    giftCard() {
      return () => {
        const nm = pick(NM), B = 5 * ri(8, 24), a = ri(5, 25), b = ri(5, 25), more = Math.random() < 0.4, add = 5 * ri(1, 6);
        if (B - a - b <= 0) return M.giftCard()();
        const ans = B - a - b + (more ? add : 0);
        return num(`${nm} has a $${B} gift card. ${nm} buys a game for $${a} and a snack for $${b}.${more ? ` Then a grandparent adds $${add} to the card.` : ""} How many dollars are on the card now?`, ans,
          "Money spent makes the balance go down. Money added makes it go up.",
          "Start with the balance. Subtract each purchase. If money is added, add it at the end.",
          () => { const s = 5 * ri(6, 20), x = ri(4, 15), y = ri(4, 15); return `Example: a $${s} card, spend $${x} and $${y}: ${s} − ${x} − ${y} = $${s - x - y}. Now do yours.`; });
      };
    },
    leftover() {
      return () => {
        const nm = pick(NM), I = 10 * ri(8, 30), a = 5 * ri(2, 8), b = 5 * ri(1, 5), c = 5 * ri(2, 8);
        if (I - a - b - c <= 0) return M.leftover()();
        return num(`${nm} earns $${I} this month from a dog-walking business. ${nm} pays $${a} for supplies and $${b} for flyers, and puts $${c} in savings. How many dollars are left to spend?`, I - a - b - c,
          "Money earned is income. Everything paid out or set aside comes off the income.",
          "Add up the supplies, flyers and savings. Then subtract that total from the money earned.",
          () => { const i = 10 * ri(8, 30), x = 5 * ri(2, 6), y = 5 * ri(1, 4); return `Example: earn $${i}, pay $${x} and $${y}. ${x} + ${y} = ${x + y}, and ${i} − ${x + y} = $${i - x - y}. Now do yours.`; });
      };
    },
    convertTime() {
      return () => {
        const k = ri(0, 3), nm = pick(NM);
        if (k === 0) { const d = ri(2, 12); return num(`${nm} earns $${d} every day for a week (7 days). How many dollars is that in all?`, d * 7, "A week has the same amount of money each day, so use multiplying.", "Multiply the money for one day by the number of days in a week.", () => { const a = ri(2, 12), b = ri(2, 5); return `Example: $${a} a day for ${b} days is ${a} × ${b} = $${a * b}. Now do yours.`; }); }
        if (k === 1) { const w = ri(5, 40); return num(`${nm} saves $${w} every week. There are 52 weeks in a year. How many dollars is that in one year?`, w * 52, "A year is many weeks. Use multiplying.", "Multiply the weekly amount by the number of weeks in a year. Break fifty-two into fifty and two if that helps.", () => { const a = ri(5, 40), b = ri(3, 6); return `Example: $${a} a week for ${b} weeks is ${a} × ${b} = $${a * b}. Now do yours.`; }); }
        if (k === 2) { const m = ri(10, 90); return num(`${nm} earns $${m} every month. There are 12 months in a year. How many dollars is that in one year?`, m * 12, "A year has the same number of months as a dozen.", "Multiply the monthly amount by a dozen. You can do ten times it and then two times it, and add.", () => { const a = ri(10, 90); return `Example: $${a} a month. ${a} × 10 = ${a * 10} and ${a} × 2 = ${a * 2}. Together: $${a * 12}. Now do yours.`; }); }
        const yr = 12 * ri(20, 90); return num(`A subscription costs $${yr} for one year. How many dollars does that work out to each month?`, yr / 12, "A year is made of twelve months. Share the cost equally among them.", "Divide the yearly cost by the number of months in a year.", () => { const a = 12 * ri(10, 60); return `Example: $${a} a year ÷ 12 months = $${a / 12} a month. Now do yours.`; });
      };
    },
    average() {
      return () => {
        const m = ri(5, 20), n = pick([4, 5]);
        let v, tries = 0;
        do { v = Array.from({ length: n - 1 }, () => ri(Math.max(1, m - 6), m + 6)); v.push(n * m - v.reduce((s, x) => s + x, 0)); tries++; } while ((v[n - 1] < 1 || v[n - 1] > m + 8) && tries < 200);
        if (v[n - 1] < 1) return M.average()();
        return num(`Zoe's allowance for ${n} weeks was ${v.map(x => "$" + x).join(", ")}. What is her average (mean) allowance per week in dollars?`, m,
          "The average is what each week would be if all the weeks had the same amount.",
          "Add all the amounts, then divide the sum by how many weeks there are.",
          () => { const a = ri(4, 12), b = ri(4, 12), c = 3 * ri(4, 12) - a - b; return c > 0 ? `Example: $${a}, $${b} and $${c}. The sum is ${a + b + c}, and ${a + b + c} ÷ 3 = $${(a + b + c) / 3}. Now do yours.` : `Example: $4, $6 and $8. The sum is 18, and 18 ÷ 3 = $6. Now do yours.`; });
      };
    },
    trip() {
      return () => {
        const p = ri(10, 60), n = ri(3, 6), t = p * n, a = ri(Math.floor(t * 0.2), Math.floor(t * 0.4)), b = ri(Math.floor(t * 0.2), Math.floor(t * 0.4)), c = t - a - b;
        return num(`A trip costs $${a} for gas, $${b} for food and $${c} for tickets. ${n} people share the cost equally. How many dollars does each person pay?`, p,
          "Find the cost of the whole trip first. Then think about sharing it.",
          "Add the three costs to get the total. Then divide by the number of people.",
          () => { const q = ri(8, 30), k = ri(3, 5), t2 = q * k, x = Math.floor(t2 / 3), y = Math.floor(t2 / 3); return `Example: $${x} + $${y} + $${t2 - x - y} = $${t2} for ${k} people. ${t2} ÷ ${k} = $${q} each. Now do yours.`; });
      };
    },
    giving() {
      return () => {
        const E = mul(20, 40, 400), pc = pick([5, 10, 20, 25]), nm = pick(NM), g = E * pc / 100, left = Math.random() < 0.5;
        return num(`${nm} earns $${E} from odd jobs and decides to give ${pc}% to a charity.${left ? " How many dollars does " + nm + " keep?" : " How many dollars is the gift?"}`, left ? E - g : g,
          left ? "First find the part that is given away. The rest is what is kept." : "Percent means out of every hundred. Turn the percent into an easy fraction or use ten percent as a starting point.",
          left ? "Find the percent of the earnings, then subtract it from the earnings." : "Ten percent is one tenth. Five percent is half of that. Twenty-five percent is one fourth.",
          () => { const e2 = mul(20, 40, 400), p2 = pick([10, 20, 25]); return `Example: ${p2}% of $${e2} is $${e2 * p2 / 100}.${left ? ` Kept: ${e2} − ${e2 * p2 / 100} = $${e2 - e2 * p2 / 100}.` : ""} Now do yours.`; });
      };
    },
    petCost() {
      return () => {
        const nm = pick(NM), o = pick([["a pet fish", "a tank and supplies", "food"], ["a pet hamster", "a cage and supplies", "food and bedding"], ["soccer", "cleats and a ball", "league fees"], ["the guitar", "a guitar", "lessons"]]);
        const S0 = 5 * ri(6, 30), m = 5 * ri(1, 8), n = ri(3, 12);
        return num(`${nm} starts ${o[0]}. The start-up cost (${o[1]}) is $${S0}. The monthly cost (${o[2]}) is $${m}. How many dollars does ${nm} spend in total in ${n} months?`, S0 + m * n,
          "There is a one-time cost and a cost that repeats every month.",
          "Multiply the monthly cost by the number of months. Then add the one-time start-up cost.",
          () => { const s = 5 * ri(4, 20), mm = 5 * ri(1, 6), k = ri(3, 8); return `Example: $${s} to start plus $${mm} a month for ${k} months: ${mm} × ${k} = ${mm * k}, and ${s} + ${mm * k} = $${s + mm * k}. Now do yours.`; });
      };
    },

    // ----- level 11 -----
    timeHalf() {
      return () => {
        const w = 2 * ri(4, 15), h = ri(2, 10), nm = pick(NM), ot = 3 * w / 2 * h;
        if (Math.random() < 0.5) return num(`Overtime is paid at "time and a half" (one and a half times the usual wage). ${nm}'s usual wage is $${w} an hour. How many dollars does ${nm} earn for ${h} hours of overtime?`, ot,
          "Time and a half means each overtime hour pays the usual wage plus half of it.", "Find half of the usual wage and add it to the usual wage. That is one overtime hour. Then multiply by the overtime hours.",
          () => { const a = 2 * ri(4, 15), b = ri(2, 6); return `Example: usual wage $${a}. Half is $${a / 2}, so one overtime hour pays $${a * 3 / 2}. For ${b} hours: $${a * 3 * b / 2}. Now do yours.`; });
        return num(`${nm} earns $${w} an hour. One week ${nm} works 40 regular hours and ${h} hours of overtime at time and a half. How many dollars does ${nm} earn that week?`, 40 * w + ot,
          "There are two parts to the pay: regular hours and overtime hours. Find each part, then put them together.",
          "Regular pay is the wage times forty. Overtime pay is one and a half times the wage, times the overtime hours. Add the two parts.",
          () => { const a = 2 * ri(4, 15), b = ri(2, 6); return `Example: $${a} an hour, ${b} overtime hours. Regular: ${a} × 40 = ${a * 40}. Overtime: $${a * 3 / 2} × ${b} = ${a * 3 * b / 2}. Total: $${a * 40 + a * 3 * b / 2}. Now do yours.`; });
      };
    },
    commission() {
      return () => {
        const pc = pick([5, 10, 20, 25, 50]), nm = pick(NM);
        if (Math.random() < 0.7) { const Sv = mul(20, 200, 3000); return num(`${nm} earns ${pc}% commission on everything ${nm} sells. ${nm} sells $${Sv} of bikes. How many dollars is ${nm}'s commission?`, Sv * pc / 100,
          "Commission is a percent of the sales, not of anything else.", "Turn the percent into a fraction or build it from ten percent. Then find that part of the sales.",
          () => { const s2 = mul(20, 200, 3000), p2 = pick([10, 20, 25]); return `Example: ${p2}% of $${s2} sales is $${s2 * p2 / 100}. Now do yours.`; }); }
        const C = ri(10, 80) * 10; return num(`${nm} earned $${C} in commission at a rate of ${pc}%. How many dollars of sales did ${nm} make?`, C * 100 / pc,
          "The commission is only a small part of the sales. The sales are the whole.", "If the percent is a simple fraction, the commission is that fraction of the sales. Work backwards by multiplying the commission.",
          () => { const c2 = ri(10, 80) * 10, p2 = pick([10, 20, 25]); return `Example: $${c2} earned at ${p2}%. ${p2}% is ${p2 === 10 ? "one tenth" : p2 === 20 ? "one fifth" : "one fourth"}, so sales are ${c2} × ${100 / p2} = $${c2 * 100 / p2}. Now do yours.`; });
      };
    },
    netPay() {
      return () => {
        const G = mul(20, 100, 800), pc = pick([10, 20, 25]), nm = pick(NM), cut = G * pc / 100, took = Math.random() < 0.5;
        return num(`${nm}'s gross pay is $${G}. Taxes and other deductions take ${pc}%. ${took ? "How many dollars are taken out?" : "How many dollars is " + nm + "'s net (take-home) pay?"}`, took ? cut : G - cut,
          took ? "Deductions are a percent of the gross pay." : "Net pay is what is left after the deductions are taken away from the gross pay.",
          took ? "Find the percent of the gross pay." : "Find the percent of the gross pay, and then subtract it from the gross pay.",
          () => { const g = mul(20, 100, 800), p = pick([10, 20, 25]); return `Example: gross $${g}, ${p}% taken out is $${g * p / 100}.${took ? "" : ` Net: ${g} − ${g * p / 100} = $${g - g * p / 100}.`} Now do yours.`; });
      };
    },
    taxTip() {
      return () => {
        const [t, p] = pick([[10, 20], [5, 15], [10, 15], [5, 20]]), Mv = mul(20, 40, 200);
        return num(`A meal costs $${Mv} before tax. Sales tax is ${t}%. You also leave a ${p}% tip on the meal price (before tax). How many dollars do you pay in all?`, Mv + Mv * t / 100 + Mv * p / 100,
          "There are three amounts to add: the meal, the tax and the tip. Both percents are taken from the meal price.",
          "Find the tax amount and the tip amount separately. Then add them to the meal price.",
          () => { const m = mul(20, 40, 200); return `Example: meal $${m}, tax 10% is $${m / 10}, tip 20% is $${m / 5}. Total: ${m} + ${m / 10} + ${m / 5} = $${m + m / 10 + m / 5}. Now do yours.`; });
      };
    },
    discTax() {
      return () => {
        let P, d, t, sale, tries = 0;
        do { P = mul(20, 40, 400); d = pick([10, 20, 25, 50]); t = pick([5, 10]); sale = P - P * d / 100; tries++; } while ((Number.isInteger(sale) === false || sale * t % 100 !== 0) && tries < 300);
        const e = pick(THINGS);
        return num(`${e[0]} A ${e[1]} costs $${P}. It is ${d}% off. Then ${t}% sales tax is added to the sale price. How many dollars do you pay?`, sale + sale * t / 100,
          "Do the steps in order: first the discount, then the tax on the new price.",
          "Take the percent off the price. Then find the tax on that lower price and add it.",
          () => { const p = mul(20, 40, 400), dd = pick([10, 20]), s2 = p - p * dd / 100; return `Example: $${p} with ${dd}% off is $${s2}. Tax of 10% on $${s2} is $${s2 / 10}. You pay $${s2 + s2 / 10}. Now do yours.`.replace(/\$(\d+)\.5/g, "$$$1.50"); });
      };
    },
    twoDisc() {
      return () => {
        const P = mul(20, 40, 300), d = pick([10, 20, 25, 50]), c = pick([3, 5, 10]), [e, n] = pick(THINGS);
        return num(`${e} A ${n} costs $${P}. The store takes ${d}% off, and then you use a $${c} coupon on the sale price. How many dollars do you pay?`, P - P * d / 100 - c,
          "There are two savings: a percent and a coupon. Use them one after the other.",
          "Take the percent off first. Then subtract the coupon from the new price.",
          () => { const p = mul(20, 40, 300), dd = pick([10, 20, 50]), cc = pick([2, 4, 5]); return `Example: $${p}, ${dd}% off leaves $${p - p * dd / 100}. Coupon of $${cc}: ${p - p * dd / 100} − ${cc} = $${p - p * dd / 100 - cc}. Now do yours.`; });
      };
    },
    markup() {
      return () => {
        const C = mul(20, 20, 200), pc = pick([10, 20, 25, 50, 100]), [e, n] = pick(THINGS);
        return num(`${e} A shop buys a ${n} for $${C} and adds a markup of ${pc}% to set its selling price. What is the selling price in dollars?`, C + C * pc / 100,
          "A markup is extra added on top of what the shop paid.",
          "Find the percent of the cost. Then add it to the cost.",
          () => { const c = mul(20, 20, 200), p = pick([10, 20, 50]); return `Example: cost $${c}, markup ${p}% is $${c * p / 100}. Selling price: ${c} + ${c * p / 100} = $${c + c * p / 100}. Now do yours.`; });
      };
    },
    profitPct() {
      return () => {
        let C, p, S1, tries = 0;
        do { C = pick([20, 40, 50, 80, 100, 200]); p = pick([10, 20, 25, 50, 100]); S1 = C * (100 + p) / 100; tries++; } while (!Number.isInteger(S1) && tries < 100);
        return num(`A baker spends $${C} on ingredients and sells the baked goods for $${S1}. The profit is what percent of the cost? (Type the number only.)`, p,
          "First find the profit in dollars. Then compare the profit with the cost.",
          "Profit is the selling price minus the cost. Then ask: what fraction of the cost is the profit? Turn that fraction into a percent.",
          () => { const c = pick([20, 40, 50, 100]), q = pick([10, 20, 50]), s = c * (100 + q) / 100; return `Example: cost $${c}, sold for $${s}. Profit $${s - c}. ${s - c} out of ${c} is ${q} out of 100, which is ${q}%. Now do yours.`; });
      };
    },
    rule72() {
      return () => {
        const r = pick([2, 3, 4, 6, 8, 9, 12]), yrs = 72 / r;
        if (Math.random() < 0.6) return num(`The Rule of 72 says: years to double = 72 ÷ interest rate. An account earns ${r}% a year. About how many years until the money doubles?`, yrs,
          "The Rule of 72 gives a quick estimate of how long it takes money to double.", "Divide seventy-two by the interest rate (the percent number).",
          () => { const rr = pick([2, 3, 4, 6, 8, 9, 12]); return `Example: at ${rr}%, 72 ÷ ${rr} = ${72 / rr} years. Now do yours.`; });
        return num(`Money in an account doubles in about ${yrs} years by the Rule of 72. What interest rate (percent) does that match? (Type the number only.)`, r,
          "The Rule of 72 can be worked backwards. The years and the rate are linked by seventy-two.", "Divide seventy-two by the number of years to find the rate.",
          () => { const rr = pick([2, 3, 4, 6, 8, 9, 12]); return `Example: doubling in ${72 / rr} years means 72 ÷ ${72 / rr} = ${rr}%. Now do yours.`; });
      };
    },
    loanCost() {
      return () => {
        const n = pick([6, 10, 12, 24]), m = ri(20, 200), t = m * n, I = 5 * ri(2, Math.max(2, Math.floor(t * 0.2 / 5))), B = t - I, nm = pick(NM);
        return num(`${nm} borrows $${B} and repays $${m} each month for ${n} months. How many extra dollars (interest) does ${nm} pay back beyond the amount borrowed?`, I,
          "Find the total of all the payments first. Then compare it with what was borrowed.",
          "Multiply the monthly payment by the number of months. Then subtract the amount borrowed. The difference is the interest.",
          () => { const k = pick([6, 12]), p = ri(20, 100), b = k * p - 5 * ri(2, 20); return `Example: borrow $${b}, pay $${p} for ${k} months. Total paid: ${p} × ${k} = ${p * k}. Interest: ${p * k} − ${b} = $${p * k - b}. Now do yours.`; });
      };
    },
    downPay() {
      return () => {
        const P = mul(400, 2000, 20000), pc = pick([5, 10, 20, 25]), d = P * pc / 100, rem = Math.random() < 0.5, [e, n] = pick([["🚗", "used car"], ["🏠", "tiny house"], ["🚲", "e-bike"], ["⛵", "boat"]]);
        return num(`${e} A ${n} costs $${P}. The down payment is ${pc}% of the price. ${rem ? "How many dollars are still left to pay after the down payment?" : "How many dollars is the down payment?"}`, rem ? P - d : d,
          rem ? "A down payment is paid first. The rest is still owed." : "A down payment is a percent of the price paid at the start.",
          rem ? "Find the down payment first as a percent of the price, then subtract it from the price." : "Turn the percent into a fraction, or build it from ten percent, and find that part of the price.",
          () => { const p = mul(400, 2000, 20000), q = pick([10, 20, 25]); return `Example: price $${p}, down payment ${q}% is $${p * q / 100}.${rem ? ` Left to pay: ${p} − ${p * q / 100} = $${p - p * q / 100}.` : ""} Now do yours.`; });
      };
    },
    costUse() {
      return () => {
        if (Math.random() < 0.55) { const u = pick([4, 5, 8, 10, 20, 25, 40]), per = ri(2, 12), nm = pick(["jacket", "bike helmet", "backpack", "pair of boots"]); return num(`A ${nm} costs $${u * per} and is used ${u} times. What is the cost per use in dollars?`, per,
          "Cost per use tells you how much each time costs you.", "Divide the price by the number of times it is used.",
          () => { const a = pick([4, 5, 10, 20]), b = ri(2, 12); return `Example: $${a * b} used ${a} times is ${a * b} ÷ ${a} = $${b} per use. Now do yours.`; }); }
        let pa, ua, pb, ub; do { ua = pick([10, 20, 25, 50]); pa = ua * ri(2, 6); ub = pick([2, 4, 5, 8]); pb = ub * ri(2, 6); } while (pa / ua === pb / ub);
        const ans = pa / ua < pb / ub ? "Shoes A" : "Shoes B";
        return { text: `Shoes A cost $${pa} and are worn ${ua} times. Shoes B cost $${pb} and are worn ${ub} times. Which costs LESS per wear?`, choices: ["Shoes A", "Shoes B"], answer: ans,
          hints: ["The cheaper price is not always the better deal. Compare the cost for each time they are worn.", "Divide each price by its number of wears. The lower answer wins.", "Example: Hat X is $20 for 10 wears ($2 each). Hat Y is $9 for 3 wears ($3 each). Hat X costs less per wear. Now do yours."] };
      };
    },
    subs() {
      return () => {
        const m = ri(3, 15), A = 12 * m - ri(2, Math.max(3, Math.floor(m * 3))), nm = pick(["music app", "game club", "reading app", "art class app"]);
        return num(`A ${nm} costs $${m} a month, or $${A} for a whole year if you pay once. How many dollars do you save by paying for the year?`, 12 * m - A,
          "Find what twelve months would cost when paid month by month. Then compare.",
          "Multiply the monthly price by twelve. Then subtract the yearly price.",
          () => { const a = ri(3, 15), b = 12 * a - ri(2, 6); return `Example: $${a} a month × 12 = $${12 * a}. The year plan is $${b}. Savings: ${12 * a} − ${b} = $${12 * a - b}. Now do yours.`; });
      };
    },

    // ----- level 12 -----
    raise() {
      return () => {
        const P = mul(20, 100, 800), pc = pick([5, 10, 20, 25, 50]), nm = pick(NM), up = Math.random() < 0.5;
        return num(`${nm} earns $${P} a week. ${nm} gets a ${pc}% raise. ${up ? "How many dollars does " + nm + " earn each week after the raise?" : "How many more dollars is that each week?"}`, up ? P + P * pc / 100 : P * pc / 100,
          up ? "A raise adds a percent of the old pay to the old pay." : "The extra amount is the percent of the old pay.",
          up ? "Find the percent of the old pay. Then add it to the old pay." : "Turn the percent into a fraction, or build it from ten percent.",
          () => { const p = mul(20, 100, 800), q = pick([10, 20, 25]); return `Example: $${p} with a ${q}% raise: ${q}% of ${p} is ${p * q / 100}.${up ? ` New pay: ${p} + ${p * q / 100} = $${p + p * q / 100}.` : ""} Now do yours.`; });
      };
    },
    priceUp() {
      return () => {
        const P = mul(20, 20, 400), pc = pick([5, 10, 20, 25, 50]), [e, n] = pick(THINGS);
        return num(`${e} Last year a ${n} cost $${P}. Because of inflation, the price rose ${pc}%. What does it cost now, in dollars?`, P + P * pc / 100,
          "Inflation means prices go up. The new price is the old price plus the increase.",
          "Find the percent of the old price, then add it to the old price.",
          () => { const p = mul(20, 20, 400), q = pick([5, 10, 20]); return `Example: $${p} up ${q}%: the increase is $${p * q / 100}, so the new price is ${p} + ${p * q / 100} = $${p + p * q / 100}. Now do yours.`; });
      };
    },
    compound3() {
      return () => {
        const k = ri(1, 5), nm = pick(NM), v = ri(0, 2);
        if (v === 0) return num(`${nm} saves $${1000 * k} at 10% interest a year. Interest is added each year and then earns interest too. How many dollars are in the account after 3 years?`, 1331 * k,
          "This is compound interest. Each year you take ten percent of the new, bigger balance.", "Find ten percent of the balance and add it. Do that again for year two, and again for year three.",
          () => { const b = 100 * ri(1, 9); return `Example: $${b} at 10% for 2 years. Year 1: ${b} + ${b / 10} = ${b * 11 / 10}. Year 2: ${b * 11 / 10} + ${b * 11 / 100} = $${b * 121 / 100}. Now do three years for yours.`; });
        if (v === 1) return num(`${nm} saves $${1000 * k}. Account A pays 10% SIMPLE interest and account B pays 10% COMPOUND interest. After 3 years, how many MORE dollars does account B have than account A?`, 31 * k,
          "Simple interest is the same every year. Compound interest grows each year because the interest earns interest.",
          "Find the balance for each account after three years, then subtract. For simple interest, take ten percent of the start each year. For compound interest, take ten percent of the new balance each year.",
          () => { const b = 100 * ri(1, 9); return `Example: $${b} for 2 years at 10%. Simple: ${b} + ${b / 10} + ${b / 10} = ${b * 12 / 10}. Compound: ${b * 121 / 100}. Difference: ${b * 121 / 100 - b * 12 / 10}. Now do three years for yours.`; });
        return num(`${nm} saves $${25 * (k + 1)} at 20% interest a year, compounded yearly. How many dollars are in the account after 2 years?`, 36 * (k + 1),
          "Do it one year at a time. The second year uses the new balance.", "Find twenty percent of the start (one fifth) and add it. Then find twenty percent of the new balance and add that.",
          () => { const b = 5 * ri(1, 12) * 5; return `Example: $${b} at 20%. Year 1: ${b} + ${b / 5} = ${b * 6 / 5}. Year 2: ${b * 6 / 5} + ${b * 6 / 25} = $${b * 36 / 25}. Now do yours.`; });
      };
    },
    netWorth() {
      return () => {
        const nm = pick(NM), a = 10 * ri(5, 30), b = 10 * ri(3, 20), c = 5 * ri(2, 10), d = 5 * ri(2, Math.floor((a + b + c) / 10));
        return num(`${nm}'s savings account has $${a}. ${nm}'s bike is worth $${b} and a game console is worth $${c}. ${nm} owes a parent $${d}. What is ${nm}'s net worth in dollars? (Net worth = what you own minus what you owe.)`, a + b + c - d,
          "Net worth compares everything you own with everything you owe.", "Add up the things owned. Then subtract the amount owed.",
          () => { const x = 10 * ri(4, 20), y = 10 * ri(3, 15), z = 5 * ri(2, 8); return `Example: own $${x} and $${y}, owe $${z}. ${x} + ${y} = ${x + y}, and ${x + y} − ${z} = $${x + y - z}. Now do yours.`; });
      };
    },
    payoff() {
      return () => {
        let p, e, n1, n2, B, tries = 0;
        do { p = 5 * ri(2, 20); e = 5 * ri(1, 10); n2 = ri(3, 12); B = (p + e) * n2; n1 = B / p; tries++; } while ((!Number.isInteger(n1) || n1 <= n2 || n1 > 36) && tries < 3000);
        if (!Number.isInteger(n1) || n1 <= n2) { p = 50; e = 50; n2 = 6; B = 600; n1 = 12; }
        return num(`A debt of $${B} is paid off with equal payments (ignore interest). Paying $${p} a month takes ${n1} months. How many months sooner is it paid off if you pay $${p + e} a month instead?`, n1 - n2,
          "Find how many months each plan takes. Then compare the two.",
          "Divide the debt by each monthly payment to get the months. Then subtract the smaller number of months from the larger.",
          () => { const xx = pick([5, 10, 15, 20]), k1 = ri(2, 4), kk = pick([2, 3, 4]), bd = xx * kk * k1, yy = xx * kk; return `Example: $${bd} paid at $${xx} a month takes ${bd / xx} months. At $${yy} a month it takes ${bd / yy} months. That is ${bd / xx - bd / yy} months sooner. Now do yours.`; });
      };
    },
    rent() {
      return () => {
        if (Math.random() < 0.6) { const r = 50 * ri(10, 40), y = ri(2, 6); return num(`A family pays $${r} a month in rent. How many dollars is that over ${y} years?`, r * 12 * y,
          "There are twelve months in each year. Find the rent for one year first.", "Multiply the monthly rent by twelve, then multiply by the number of years.",
          () => { const a = 50 * ri(10, 30), b = ri(2, 4); return `Example: $${a} a month × 12 = $${a * 12} a year. For ${b} years: $${a * 12 * b}. Now do yours.`; }); }
        const u = 10 * ri(2, 12), r = 50 * ri(10, 30); return num(`Rent is $${r} a month. The landlord raises it by $${u} a month. How many extra dollars will the family pay over one year?`, u * 12,
          "Only the increase matters for the extra cost. It happens every month.", "Multiply the monthly increase by the number of months in a year.",
          () => { const a = 10 * ri(2, 12); return `Example: a $${a} monthly increase over 12 months is ${a} × 12 = $${a * 12}. Now do yours.`; });
      };
    },
    stockMove() {
      return () => {
        const n = ri(3, 20), b = ri(10, 60), ch = ri(2, 15), up = Math.random() < 0.5, c = up ? b + ch : b - ch, nm = pick(NM);
        return num(`${nm} owns ${n} shares of a company. The price per share ${up ? "rose" : "fell"} from $${b} to $${c}. By how many dollars did the value of ${nm}'s shares ${up ? "go up" : "go down"}? (Type a positive number.)`, n * ch,
          "Find how much the price of ONE share changed. Then think about all the shares.", "Subtract the smaller price from the bigger price. Then multiply by the number of shares.",
          () => { const k = ri(3, 12), x = ri(10, 50), d = ri(2, 9); return `Example: ${k} shares, price from $${x} to $${x + d}. One share changed by $${d}. All ${k}: ${k} × ${d} = $${k * d}. Now do yours.`; });
      };
    },
    dividend() {
      return () => {
        const n = 4 * ri(2, 25), d = pick([25, 50, 75, 100, 150, 200]), nm = pick(NM);
        return num(`A company pays a dividend of ${d >= 100 ? "$" + (d / 100).toFixed(2) : d + "¢"} per share each year. ${nm} owns ${n} shares. How many dollars of dividends does ${nm} get in a year?`, n * d / 100,
          "A dividend is paid for every share you own.", "Multiply the dividend for one share by the number of shares. Work in cents if that is easier, then change back to dollars.",
          () => { const k = 4 * ri(2, 20), dd = pick([25, 50, 100]); return `Example: ${k} shares, ${dd}¢ each. ${k} × ${dd} = ${k * dd}¢, which is $${k * dd / 100}. Now do yours.`; });
      };
    },
    diversify() {
      return () => {
        let g1, g2, l1, l2, tries = 0;
        do { g1 = ri(10, 80); g2 = ri(10, 80); l1 = ri(5, 60); l2 = ri(5, 60); tries++; } while (g1 + g2 - l1 - l2 <= 0 && tries < 100);
        const nm = pick(NM);
        return num(`${nm} spreads $400 across four investments over a year. A grew by $${g1}, B fell by $${l1}, C grew by $${g2} and D fell by $${l2}. What was the net gain overall, in dollars?`, g1 + g2 - l1 - l2,
          "Net means after the gains and the losses are put together.", "Add the gains together and add the losses together. Then subtract the total losses from the total gains.",
          () => { const a = ri(10, 50), b = ri(10, 50), c = ri(5, 20), d = ri(5, 20); return `Example: gains $${a} and $${b}, losses $${c} and $${d}. Gains: ${a + b}. Losses: ${c + d}. Net: $${a + b - c - d}. Now do yours.`; });
      };
    },
    expensePct() {
      return () => {
        const tot = pick([20, 25, 40, 50, 200, 250, 400, 500, 1000]), p = 5 * ri(2, 14), part = tot * p / 100, nm = pick(NM), what = pick(["rent", "food", "savings", "transport", "fun"]);
        if (!Number.isInteger(part)) return M.expensePct()();
        return num(`${nm} earns $${tot}. Of that, $${part} goes to ${what}. What percent of ${nm}'s income is that? (Type the number only.)`, p,
          "A percent compares a part with the whole, out of one hundred.", "Make a fraction: the part over the whole. Then turn it into a percent by finding how many out of one hundred.",
          () => { const t = pick([20, 50, 200, 400]), q = 5 * ri(2, 14); return `Example: $${t * q / 100} out of $${t}. That is ${t * q / 100}/${t}, which is ${q} out of 100, so ${q}%. Now do yours.`; });
      };
    },
    original() {
      return () => {
        const d = pick([10, 20, 25, 50]), O = mul(20, 40, 400), sale = O - O * d / 100, [e, n] = pick(THINGS);
        return num(`${e} A ${n} is ${d}% off. The sale price is $${sale}. What was the original price in dollars?`, O,
          "The sale price is what is left after the discount. It is only a part of the original price.",
          "Work out what percent of the original price you PAY. Then use that to work backwards to the whole.",
          () => { const o = mul(20, 40, 400), dd = pick([20, 25, 50]), s = o - o * dd / 100; return `Example: ${dd}% off, sale price $${s}. You pay ${100 - dd}% of the original. ${100 - dd}% is $${s}, so 1% is ${s / (100 - dd)} and 100% is $${o}. Now do yours.`; });
      };
    },
    drive() {
      return () => {
        const g = pick([20, 25, 30]), k = ri(2, 10), pr = ri(3, 5);
        return num(`🚗 A car travels ${g} miles on each gallon of gas. A trip is ${g * k} miles. Gas costs $${pr} a gallon. How many dollars does the gas for the trip cost?`, k * pr,
          "Find how many gallons the trip uses. Then find the cost of that gas.", "Divide the trip miles by the miles per gallon to get gallons. Then multiply by the price of a gallon.",
          () => { const gg = pick([20, 25, 30]), kk = ri(2, 6), pp = ri(3, 5); return `Example: ${gg * kk} miles at ${gg} miles per gallon is ${kk} gallons. At $${pp} a gallon: ${kk} × ${pp} = $${kk * pp}. Now do yours.`; });
      };
    },
    utility() {
      return () => {
        let u, r, tries = 0;
        do { u = mul(25, 100, 800); r = pick([8, 10, 12, 15, 16, 20]); tries++; } while ((u * r) % 100 !== 0 && tries < 500);
        return num(`A home uses ${u} units of electricity this month. Each unit costs ${r}¢. How many dollars is the electric bill?`, u * r / 100,
          "The price is given in cents. The bill is asked for in dollars.", "Multiply the units by the cents per unit. Then change cents to dollars by dividing by one hundred.",
          () => { const a = 100 * ri(1, 6), b = pick([10, 20]); return `Example: ${a} units at ${b}¢ is ${a * b}¢. Divide by 100: $${a * b / 100}. Now do yours.`; });
      };
    },
    targetPrice() {
      return () => {
        const p = ri(3, 15), n = 5 * ri(2, 10), t = p * n, g = 5 * ri(2, Math.floor(t * 0.3 / 5) || 2), cost = t - g;
        if (cost < 10) return M.targetPrice()();
        const m = Math.floor(cost * 0.6), o = cost - m;
        return num(`Ivy spends $${m} on materials and $${o} on a booth to sell crafts. She makes ${n} bracelets and wants $${g} profit in all. What price should she charge for each bracelet, in dollars?`, p,
          "To earn a profit, the money from sales must cover the costs AND the profit.", "Add the costs and the profit goal. Then divide by the number of bracelets.",
          () => { const k = 5 * ri(2, 8), pp = ri(2, 9), tt = pp * k, gg = Math.floor(tt / 5), cc = tt - gg; return `Example: costs $${cc} plus profit $${gg} is $${tt}. For ${k} items: ${tt} ÷ ${k} = $${pp} each. Now do yours.`; });
      };
    },
    deductible() {
      return () => {
        const D = pick([100, 250, 500]), X = mul(100, 200, 1500), R = D + X, nm = pick(NM);
        if (Math.random() < 0.5) return num(`${nm}'s bike is stolen and insurance covers the cost over a $${D} deductible. The bike is worth $${R}. How many dollars does the insurance pay?`, X,
          "The deductible is the part you pay before insurance helps.", "Subtract the deductible from the value. Insurance pays what is left.",
          () => { const d = pick([100, 200]), x = mul(100, 200, 900); return `Example: a $${d + x} loss with a $${d} deductible: ${d + x} − ${d} = $${x} paid by insurance. Now do yours.`; });
        return num(`A repair costs $${R}. Insurance has a $${D} deductible and then pays 80% of the rest, so ${nm} pays the deductible plus 20% of the rest. How many dollars does ${nm} pay in all?`, D + X / 5,
          "You pay in two steps: the deductible first, then a share of what is left.", "Subtract the deductible from the repair cost. Take twenty percent (one fifth) of what is left. Add that to the deductible.",
          () => { const d = pick([100, 200]), x = mul(100, 200, 900); return `Example: repair $${d + x}, deductible $${d}. Rest: $${x}. One fifth of that is $${x / 5}. You pay ${d} + ${x / 5} = $${d + x / 5}. Now do yours.`; });
      };
    }
  };

  // ---------------- multiple-choice banks ----------------
  const INF10 = [
    { q: "Inflation means...", a: "Prices slowly rising over time", w: ["Prices always falling", "Coins getting smaller"] },
    { q: "If prices rise but your pay stays the same, you can buy...", a: "Less than before", w: ["More than before", "Exactly the same, always"] },
    { q: "A candy bar cost 50¢ long ago and costs $1.50 now. This shows...", a: "Prices went up over time", w: ["Prices went down", "The store made a mistake"] },
    { q: "Why might a worker ask for a raise?", a: "So pay keeps up with higher prices", w: ["So prices will fall", "To pay fewer taxes"] },
    { q: "If money sits in a jar for 30 years, it will probably buy...", a: "Less than it does today", w: ["More than today", "Exactly the same, for certain"] },
    { q: "Which can help savings keep up with rising prices?", a: "Earning interest", w: ["Keeping cash in a shoebox", "Spending it all today"] },
    { q: "A movie ticket cost much less years ago than it does today. This is an example of...", a: "Prices rising over time", w: ["Saving", "Sales tax"] },
    { q: "A small rise in prices each year is...", a: "Normal in many places", w: ["Always a disaster", "Impossible"] }
  ];
  const APP10 = [
    { q: "Someone you do not know texts asking for the passcode sent to your phone. You should...", a: "Never share it and tell a parent", w: ["Send it quickly", "Post it online"] },
    { q: "Before sending money in an app, you should...", a: "Check carefully who it is going to", w: ["Send it fast without checking", "Ask a stranger to check"] },
    { q: "Why use a different strong password for each money account?", a: "If one is stolen, the others stay safe", w: ["So you can remember fewer", "So friends can log in"] },
    { q: "Someone you only met online asks you to send money for a prize. You should...", a: "Say no and tell a parent", w: ["Send a little", "Send it all"] },
    { q: "Who should approve a kid's online purchases?", a: "A parent or guardian", w: ["Any stranger", "Nobody"] },
    { q: "In-game purchases use...", a: "Real money, so ask a parent first", w: ["Pretend money only", "Free tokens always"] },
    { q: "A text says your account is locked and to click a link right away. This is probably...", a: "A trick called phishing", w: ["A real prize", "A bank gift"] },
    { q: "Banking on public Wi-Fi is risky because...", a: "Other people might be able to snoop", w: ["It is too slow to count", "It costs coins"] }
  ];
  const SELF10 = [
    { q: "An employee is...", a: "Someone who works for a business and is paid by it", w: ["Someone who owns the whole bank", "Someone who never works"] },
    { q: "A self-employed person...", a: "Works for themselves and finds their own customers", w: ["Always has a boss", "Gets paid without working"] },
    { q: "Which person is self-employed?", a: "A neighbor who runs their own lawn-mowing business", w: ["A cashier paid by a store", "A teacher paid by a school"] },
    { q: "An advantage of being an employee is...", a: "Steady pay on a schedule", w: ["Keeping all the profit", "Never having a boss"] },
    { q: "An advantage of running your own business is...", a: "You make many of the decisions", w: ["Pay is always guaranteed", "There are no costs"] },
    { q: "Who pays a self-employed person?", a: "Their customers", w: ["Their boss", "Nobody"] },
    { q: "A business owner's income can be uneven because...", a: "Sales and costs can change", w: ["The same amount always arrives", "The government sets it daily"] },
    { q: "A skill that helps in almost every job is...", a: "Working well with others", w: ["Ignoring directions", "Arriving late"] }
  ];
  const WORDS10 = [
    { q: "Income is...", a: "Money coming in", w: ["Money you spend", "Money you owe"] },
    { q: "An expense is...", a: "Money you spend", w: ["Money you earn", "Money you save"] },
    { q: "A budget is...", a: "A plan for how to use your money", w: ["A kind of bank", "A kind of coin"] },
    { q: "A surplus means...", a: "Income is more than expenses", w: ["Expenses are more than income", "You owe the bank"] },
    { q: "A deficit means...", a: "Spending is more than income", w: ["Income is more than spending", "Nothing was spent"] },
    { q: "Which should come first in a budget?", a: "Needs", w: ["Wants", "Extras"] },
    { q: "Money set aside for a future goal is...", a: "Savings", w: ["An expense", "A fee"] },
    { q: "If income is $50 and expenses are $60, there is a...", a: "Deficit", w: ["Surplus", "Profit"] },
    { q: "Tracking your spending helps you...", a: "See where your money goes", w: ["Make it vanish", "Skip the budget"] }
  ];
  const INS11 = [
    { q: "Insurance is...", a: "Paying a regular amount so a company helps with big costs", w: ["A loan that never ends", "A bank account for kids"] },
    { q: "A premium is...", a: "The amount you pay for insurance", w: ["The money insurance pays you back", "A discount coupon"] },
    { q: "Why do families buy health insurance?", a: "To help pay big medical bills", w: ["To get free candy", "To never see a doctor"] },
    { q: "Car insurance helps pay for...", a: "Damage from an accident", w: ["Gas for every trip", "Car washes"] },
    { q: "A deductible is...", a: "What you pay first before insurance helps", w: ["A bonus from the company", "The monthly fee"] },
    { q: "Why do many people buy home or renter's insurance?", a: "To help replace things lost to fire or storms", w: ["To make rent free", "To get a bigger yard"] },
    { q: "Insurance works because...", a: "Many people pay in and share the risk", w: ["Nobody ever has problems", "The company prints money"] },
    { q: "An insurance policy is...", a: "The written agreement with the company", w: ["A pet", "A coupon book"] }
  ];
  const TAX11 = [
    { q: "Income tax is taken from...", a: "The money people earn", w: ["Only things people buy", "Only houses"] },
    { q: "Sales tax is added to...", a: "Things you buy", w: ["Your paycheck", "Your house"] },
    { q: "Property tax is paid by...", a: "People who own land or buildings", w: ["Only kids", "People who own no property at all"] },
    { q: "Taxes help pay for...", a: "Schools, roads and parks", w: ["A store's candy", "A family's vacation"] },
    { q: "A tax return is...", a: "A form that reports income and taxes", w: ["A shopping receipt", "A coupon"] },
    { q: "Why do governments collect taxes?", a: "To pay for services people share", w: ["To make people poor", "To buy toys"] },
    { q: "A tax refund happens when...", a: "You paid more tax than you owed and get some back", w: ["You owe extra", "You skip the form"] },
    { q: "Which is NOT usually paid for with taxes?", a: "Your own pizza dinner", w: ["Public libraries", "Fire departments"] }
  ];
  const SUP11 = [
    { q: "When something is scarce and many people want it, its price usually...", a: "Goes up", w: ["Goes down", "Becomes zero"] },
    { q: "Supply means...", a: "How much of something is for sale", w: ["How many people want it", "What it costs to make"] },
    { q: "Demand means...", a: "How much people want to buy something", w: ["How much is for sale", "What a store pays rent"] },
    { q: "A store has too many winter coats left in spring. It will probably...", a: "Lower the price", w: ["Raise the price", "Hide the coats"] },
    { q: "A farm has a huge apple harvest. The price of apples tends to...", a: "Fall", w: ["Rise", "Double"] },
    { q: "A new toy everyone wants sells out. The seller might...", a: "Make more or raise the price", w: ["Lower the price", "Close the store forever"] },
    { q: "A competitor is a business that...", a: "Sells similar things to the same customers", w: ["Never sells anything", "Buys all the prices"] },
    { q: "Competition between stores often leads to...", a: "Lower prices or better service", w: ["Higher prices only", "No stores"] }
  ];
  const EARLY11 = [
    { q: "Why is starting to save early helpful?", a: "Money has more time to earn interest", w: ["Banks give prizes for age", "You need to save less"] },
    { q: "Two friends each save $20 a month. One starts at age 10, the other at age 20. After many years, who probably has more?", a: "The one who started at 10", w: ["The one who started at 20", "They have exactly the same"] },
    { q: "Which habit builds savings best?", a: "Saving a little every week", w: ["Saving only when you feel like it", "Never saving"] },
    { q: "\"Pay yourself first\" means...", a: "Set aside savings as soon as you get money", w: ["Spend on yourself before anything else", "Pay friends last"] },
    { q: "A long-term goal is...", a: "Something you save toward for many years", w: ["Something you buy today", "A coupon that expires"] },
    { q: "An emergency fund is best kept...", a: "Somewhere safe and easy to reach", w: ["In a risky investment", "Lent to a friend"] },
    { q: "A short-term goal is...", a: "Something you can reach in weeks or months", w: ["Something that takes 40 years", "Something you never plan for"] },
    { q: "Automatic savings means...", a: "Money moves to savings without you doing it each time", w: ["The bank gives free money", "You can never use the account"] }
  ];
  const FINE11 = [
    { q: "A late fee is charged when...", a: "You pay a bill after the due date", w: ["You pay early", "You pay in cash"] },
    { q: "An annual fee is...", a: "A yearly charge for having an account or card", w: ["A birthday gift", "A tax refund"] },
    { q: "A free trial that turns into a paid plan means...", a: "Cancel in time or you will be charged", w: ["It stays free forever", "The company pays you"] },
    { q: "\"Terms and conditions\" are...", a: "The rules you agree to", w: ["A type of coin", "A bank slogan"] },
    { q: "Why read the fine print?", a: "To find extra costs and rules", w: ["To make the print bigger", "Because it is always blank"] },
    { q: "An ad says \"90% off*\". The star usually means...", a: "There are conditions to read about", w: ["It is a special coin", "It is a game"] },
    { q: "\"Shipping and handling\" is...", a: "An extra charge for delivery", w: ["A discount", "A tax refund"] },
    { q: "A subscription charges you...", a: "Again and again on a schedule", w: ["Once, forever", "Never"] },
    { q: "The best way to avoid surprise fees is to...", a: "Read the details and ask a parent", w: ["Click yes quickly", "Skip all the rules"] }
  ];
  const DEBT12 = [
    { q: "Which borrowing is often seen as helping you build something valuable over time?", a: "A loan for education or a home", w: ["A loan for a shopping spree on wants", "A loan to buy snacks every day"] },
    { q: "Which debt is risky?", a: "Charging wants on a card you cannot pay off", w: ["A planned loan you can afford", "Saving up first"] },
    { q: "Interest on a loan is...", a: "The cost of borrowing", w: ["A gift from the bank", "A kind of savings"] },
    { q: "Before borrowing, a smart question is...", a: "Can I afford the monthly payments?", w: ["Is it the biggest loan?", "Will my friends borrow too?"] },
    { q: "Paying only the minimum on a credit card...", a: "Makes debt last longer and cost more", w: ["Erases debt faster", "Removes the interest"] },
    { q: "If you owe several debts, a smart plan is to...", a: "Make a list and pay extra on the one with the highest interest", w: ["Ignore them", "Borrow more to pay them"] },
    { q: "A cosigner is...", a: "Someone who promises to pay if you cannot", w: ["A bank teller", "A tax form"] },
    { q: "Borrowing from friends and not repaying can...", a: "Hurt friendships", w: ["Build credit", "Earn interest"] }
  ];
  const ECON12 = [
    { q: "Banks make loans using...", a: "Money that people have deposited", w: ["Money printed at the door", "Only the owners' toys"] },
    { q: "When interest rates on loans go up, borrowing usually becomes...", a: "More expensive", w: ["Cheaper", "Free"] },
    { q: "Exports are...", a: "Goods sold to other countries", w: ["Goods bought from other countries", "Taxes on income"] },
    { q: "Imports are...", a: "Goods bought from other countries", w: ["Goods sold to other countries", "Gifts to the bank"] },
    { q: "Trade between countries helps because...", a: "Places can get things they cannot easily make themselves", w: ["Every country makes everything", "It stops all prices"] },
    { q: "A recession is...", a: "A time when the economy shrinks and jobs can be harder to find", w: ["A big sale at stores", "A new kind of coin"] },
    { q: "Entrepreneurs help the economy by...", a: "Creating products and jobs", w: ["Closing all businesses", "Avoiding customers"] },
    { q: "Money is useful because it is...", a: "Accepted in trade and can store value", w: ["Very heavy", "Only for the rich"] },
    { q: "When businesses hire more people, usually...", a: "More families have income to spend", w: ["Fewer families have income", "Prices turn into zero"] }
  ];
  const SCAM12 = [
    { q: "Phishing is...", a: "Tricking people into giving private information by pretending to be someone trusted", w: ["A fishing contest", "A kind of savings"] },
    { q: "Identity theft is...", a: "Someone using your personal information to pretend to be you", w: ["Losing your lunch money", "Changing your name legally"] },
    { q: "A message pushes you to act NOW or lose out. This is a...", a: "Warning sign of a scam", w: ["Sign of a great deal", "Sign of a safe site"] },
    { q: "A caller says you owe money and must pay with gift cards. You should...", a: "Hang up and tell a trusted adult", w: ["Buy the cards", "Read out the codes"] },
    { q: "A message claims to be from your bank. The safest step is to...", a: "Ask a parent to contact the bank using a number they already know", w: ["Click the link in the message", "Reply with your PIN"] },
    { q: "A site offers a brand-new phone for $5. This is probably...", a: "Too good to be true", w: ["A normal sale", "A gift from the store"] },
    { q: "A strong password is...", a: "Long, mixed up and not shared", w: ["Your name", "1234"] },
    { q: "An online \"friend\" asks to borrow money. Best choice?", a: "Say no and tell a parent", w: ["Send some", "Give them your savings"] },
    { q: "If you think you clicked a scam link, you should...", a: "Tell a parent right away", w: ["Hide it", "Click more links"] }
  ];

  // ---------------- level 10 ----------------
  const l10 = [
    L("Rounding to the dollar", M.roundDollar(), [S("Nearest dollar", "$6.37 → $6", "To round money to the nearest dollar, look at the cents. They tell you which whole dollar is closer."), S("The rule", "under 50¢ down · 50¢ or more up", "If the cents are less than 50, keep the dollars. If they are 50 or more, add one dollar."), S("Why?", "🛒", "Rounding helps you guess a total quickly in a store.")]),
    L("Comparing decimal prices", M.compareDec(), [S("Line them up", "$4.09 · $4.90 · $4.19", "Line up the decimal points. Compare the dollars first."), S("Then the dimes", "0 dimes · 9 dimes · 1 dime", "If the dollars match, compare the first digit after the point, then the next."), S("Beware", "$4.09 is less than $4.90", "More digits does not mean bigger. Check place by place.")]),
    L("Coupons: dollars off", M.coupon(), [S("A coupon", "🏷️ $5 off", "A coupon takes money off the price. You pay less."), S("Subtract", "$34 − $5 = $29", "Subtract the coupon amount from the price."), S("Check", "29 + 5 = 34", "Add the coupon back to check your answer.")]),
    L("Buy one, get one half off", M.bogo(), [S("A pair", "1 full + 1 half", "In this sale the first item costs full price. The second costs half price."), S("Cost of a pair", "$20 + $10 = $30", "Add the full price and the half price to find what one pair costs."), S("More pairs", "2 pairs = 2 × $30 = $60", "Multiply the cost of one pair by the number of pairs.")]),
    L("Reading a spending table", M.spendTable(), [S("A list of amounts", "🍿 $15 · 🎮 $25", "A table lists kinds of spending and how much money went to each."), S("Questions to ask", "biggest? total? how much more?", "Find the biggest by comparing. Find the total by adding. Find how much more by subtracting."), S("Use it", "📋", "Tracking spending shows where you can save.")]),
    L("Bulk savings", M.bulk(), [S("Packs and singles", "pack of 6 or 6 singles?", "Buying a pack is sometimes cheaper than buying the same number of singles."), S("Price of the singles", "6 × $3 = $18", "Multiply the price of one by how many are in the pack."), S("Compare", "$18 − $15 = $3 saved", "Subtract the pack price. The difference is your savings.")]),
    L("Hours and minutes of pay", M.minutes(), [S("Part of an hour", "30 min = half an hour", "Fifteen minutes is one fourth of an hour. Thirty minutes is one half. Forty-five minutes is three fourths."), S("Whole hours first", "$12 × 2 = $24", "Find the pay for the whole hours."), S("Add the part", "half of $12 = $6 → $30", "Find the pay for the extra minutes and add it.")]),
    L("Gift card balance", M.giftCard(), [S("A balance", "🎁 $50", "A gift card holds money. That amount is the balance."), S("Spend", "$50 − $12 − $9 = $29", "Each purchase takes money away. Subtract each one."), S("Add money", "$29 + $10 = $39", "If someone adds money, the balance goes up.")]),
    L("What is left over", M.leftover(), [S("Income", "💵 money in", "Income is the money you earn or receive."), S("Take away", "supplies + flyers + savings", "Add up everything you pay out or set aside."), S("What is left", "income − total", "Subtract the total from the income. That is the money left to spend.")]),
    L("Days, weeks, months, years", M.convertTime(), [S("Time facts", "7 days · 52 weeks · 12 months", "A week has 7 days. A year has 52 weeks or 12 months."), S("Going up", "$5 a day × 7 = $35", "To find a bigger time, multiply."), S("Going down", "$120 a year ÷ 12 = $10", "To find a smaller time, divide.")]),
    L("Average (mean)", M.average(), [S("Fair share", "4 weeks, one average", "The average is what each week would be if all the weeks were equal."), S("Add, then divide", "6 + 10 + 8 = 24 ÷ 3", "Add all the amounts, then divide by how many there are."), S("Answer", "$8 each week", "A budget can use your average spending to plan ahead.")]),
    L("Trip costs per person", M.trip(), [S("Total first", "gas + food + tickets", "Add all the costs of the trip to find the total."), S("Share", "$180 ÷ 4 people", "Divide the total by the number of people sharing."), S("Check", "4 × $45 = $180", "Multiply back to check.")]),
    L("Giving a share", M.giving(), [S("Giving", "💝", "Many people give a part of what they earn to help others."), S("Find the part", "10% of $60 = $6", "Ten percent is one tenth. Divide by ten."), S("What you keep", "$60 − $6 = $54", "Subtract the gift to see what you keep.")]),
    L("Prices change over time", mq(INF10, H_MC), [S("Inflation", "📈", "<b>Inflation</b> is when prices slowly rise over time."), S("What it does", "$1 buys less", "If prices rise and your money stays the same, it buys less than before."), S("Keep up", "💪", "Raises and interest help money keep up with rising prices.")]),
    L("Payment apps and safety", mq(APP10, H_MC), [S("Digital money", "📱", "Apps can send and pay money. That makes safety extra important."), S("Never share", "🔒", "Never share a passcode, PIN or password with anyone who asks. Real banks do not ask for them."), S("Ask a parent", "👨‍👩‍👧", "Ask a parent before buying, sending or signing up for anything.")]),
    L("Employee or self-employed?", mq(SELF10, H_MC), [S("Employee", "👷", "An <b>employee</b> works for a business and is paid by it."), S("Self-employed", "🧑‍🌾", "A <b>self-employed</b> person runs their own work and is paid by customers."), S("Both are real jobs", "⚖️", "Each has good points: steady pay or being your own boss.")]),
    L("Spending plan words", mq(WORDS10, H_MC), [S("In and out", "💵 ⇄ 🧾", "<b>Income</b> is money coming in. An <b>expense</b> is money going out."), S("More or less", "surplus · deficit", "A <b>surplus</b> is more income than expenses. A <b>deficit</b> is more spending than income."), S("Plan", "📋", "A <b>budget</b> is a plan for your money. Needs come first.")]),
    L("The cost of a hobby or pet", M.petCost(), [S("One-time cost", "🐠 tank $60", "Some things have a start-up cost you pay once."), S("Repeating cost", "food $10 a month", "Some costs come again every month."), S("Total", "60 + 10 × 6 = $120", "Multiply the monthly cost by the months. Add the start-up cost.")])
  ];
  l10.push(mixOf("Mixed practice", [l10[0], l10[2], l10[3], l10[5], l10[7]]));
  l10.push(mixOf("Level 10 Challenge", [l10[4], l10[6], l10[8], l10[9], l10[10], l10[11], l10[12], l10[13], l10[17]]));

  // ---------------- level 11 ----------------
  const l11 = [
    L("Time and a half", M.timeHalf(), [S("Overtime", "⏰", "<b>Overtime</b> is work beyond the usual hours. It often pays more."), S("Time and a half", "$10 → $15 an hour", "Time and a half means one and a half times the usual wage. Add half the wage to the wage."), S("Add up", "regular + overtime", "Find the regular pay and the overtime pay, then add them.")]),
    L("Commission", M.commission(), [S("Paid for selling", "🚲 sales", "A salesperson may earn a <b>commission</b>, a percent of what they sell."), S("Find the percent", "10% of $500 = $50", "Ten percent is one tenth. Divide the sales by ten."), S("Backwards", "$50 at 10% → $500 sales", "To find sales from commission, multiply by the number of parts in the whole.")]),
    L("Gross pay to net pay", M.netPay(), [S("Gross", "💵 $400", "<b>Gross pay</b> is the pay before anything is taken out."), S("Deductions", "20% = $80", "Taxes and other deductions are a percent of the gross pay."), S("Net", "$400 − $80 = $320", "<b>Net pay</b> is what is left. It is the money you take home.")]),
    L("Tax and tip together", M.taxTip(), [S("Three parts", "meal + tax + tip", "A restaurant total is the meal plus the tax plus the tip."), S("Find each", "10% of $40 = $4 · 20% = $8", "Use the meal price for both percents."), S("Add", "40 + 4 + 8 = $52", "Add the three amounts for the total.")]),
    L("Discount, then tax", M.discTax(), [S("Order matters", "sale first, tax second", "The discount lowers the price. Tax is then added to the lower price."), S("Step one", "$80 − 25% = $60", "Take the percent off."), S("Step two", "tax 10% of $60 = $6 → $66", "Find the tax on the new price and add it.")]),
    L("Percent off and a coupon", M.twoDisc(), [S("Two savings", "% off, then 🏷️ coupon", "Sometimes a sale and a coupon work together."), S("Percent first", "$60 − 25% = $45", "Take the percent off the price."), S("Then the coupon", "$45 − $5 = $40", "Subtract the coupon from the sale price.")]),
    L("Markup", M.markup(), [S("Why markup?", "🏪", "A shop buys goods for a price and sells them for more. The extra is the <b>markup</b>."), S("Find it", "50% of $40 = $20", "A markup is a percent of the cost."), S("Selling price", "$40 + $20 = $60", "Add the markup to the cost.")]),
    L("Profit as a percent", M.profitPct(), [S("Profit", "sell $60 − cost $50 = $10", "Profit is the selling price minus the cost."), S("Compare", "$10 out of $50", "Write the profit as a fraction of the cost."), S("Percent", "10/50 = 20/100 = 20%", "Turn the fraction into a number out of 100.")]),
    L("The Rule of 72", M.rule72(), [S("Doubling", "$100 → $200", "How long does it take for savings to double? There is a quick rule of thumb."), S("The rule", "72 ÷ rate = years", "Divide 72 by the interest rate. At 6% it is about 12 years."), S("Estimate only", "about", "The Rule of 72 gives a good estimate, not an exact answer.")]),
    L("How much does a loan really cost?", M.loanCost(), [S("Borrowing", "🏦 $500", "When you borrow, you pay back more than you borrowed."), S("Total paid", "$45 × 12 = $540", "Multiply the monthly payment by the number of months."), S("Interest", "$540 − $500 = $40", "The extra amount is the interest, the cost of borrowing.")]),
    L("Down payments", M.downPay(), [S("Pay some now", "💰", "A <b>down payment</b> is part of the price paid at the start. The rest may be borrowed."), S("Find it", "20% of $5,000 = $1,000", "A down payment is a percent of the price."), S("What remains", "$5,000 − $1,000 = $4,000", "Subtract the down payment to see what is still owed.")]),
    L("Cost per use", M.costUse(), [S("Is it worth it?", "👟", "A pricey item used many times can cost less per use than a cheap item used once."), S("Divide", "$60 ÷ 30 uses = $2", "Divide the price by the number of uses."), S("Compare", "$2 vs $3", "The lower cost per use is the better deal.")]),
    L("Subscriptions", M.subs(), [S("Monthly bills", "📱", "A <b>subscription</b> charges you again and again on a schedule."), S("A year of months", "$6 × 12 = $72", "Multiply the monthly price by 12 to see a year's cost."), S("Compare plans", "$72 vs $60", "Pay by the year if it costs less in all.")]),
    L("Insurance", mq(INS11, H_MC), [S("Sharing risk", "🛡️", "<b>Insurance</b> is a plan where many people pay in so the company can help those who have big costs."), S("Words", "premium · deductible", "The <b>premium</b> is what you pay. The <b>deductible</b> is what you pay first when you make a claim."), S("Kinds", "🚗 🏠 🏥", "Car, home and health insurance are common kinds.")]),
    L("Kinds of taxes", mq(TAX11, H_MC), [S("Three taxes", "income · sales · property", "Income tax comes from earnings. Sales tax is added to purchases. Property tax is paid on land and buildings."), S("Why", "🏫 🛣️ 🌳", "Taxes pay for schools, roads, parks and safety."), S("Returns", "📄", "A tax return reports income and taxes. A refund comes back if too much was paid.")]),
    L("Supply and demand", mq(SUP11, H_MC), [S("Supply", "📦", "<b>Supply</b> is how much of something is for sale."), S("Demand", "🙋🙋🙋", "<b>Demand</b> is how much people want to buy."), S("Price", "📈📉", "Lots of demand and little supply push prices up. Lots of supply and little demand push prices down.")]),
    L("Start saving early", mq(EARLY11, H_MC), [S("Time helps", "⏳", "Money in an account earns interest. The longer it stays, the more it can grow."), S("Small steps", "$5 a week", "Small amounts saved often add up."), S("Pay yourself first", "💰", "Set aside savings as soon as you get money.")]),
    L("Fees and fine print", mq(FINE11, H_MC), [S("Extra costs", "🧾", "Some deals come with fees, like late fees, annual fees and shipping."), S("Free trials", "🆓 → 💳", "Some free trials turn into paid plans if you do not cancel."), S("Read first", "🔍", "Read the details and ask a parent before you agree to anything.")])
  ];
  l11.push(mixOf("Mixed practice", [l11[0], l11[1], l11[2], l11[3], l11[4]]));
  l11.push(mixOf("Level 11 Challenge", [l11[5], l11[6], l11[7], l11[8], l11[9], l11[10], l11[11], l11[12], l11[13]]));

  // ---------------- level 12 ----------------
  const l12 = [
    L("Percent raises", M.raise(), [S("A raise", "📈", "A raise is a percent more than your old pay."), S("Find it", "10% of $200 = $20", "Find the percent of the old pay."), S("New pay", "$200 + $20 = $220", "Add the raise to the old pay.")]),
    L("Prices go up", M.priceUp(), [S("Inflation", "🏷️↑", "When prices rise by a percent, the new price is the old price plus that percent of it."), S("Find the rise", "5% of $40 = $2", "Five percent is half of ten percent."), S("New price", "$40 + $2 = $42", "Add the rise to the old price.")]),
    L("Compound interest over years", M.compound3(), [S("Interest on interest", "🏦", "With <b>compound interest</b>, each year's interest joins the balance and earns interest too."), S("Year by year", "$1,000 → $1,100 → $1,210", "Take 10% of the new balance each year and add it."), S("More than simple", "simple $300 · compound $331", "Compound interest grows faster than simple interest over several years.")]),
    L("Net worth", M.netWorth(), [S("Own and owe", "🏦 🚲 vs 🧾", "<b>Assets</b> are things you own that have value. <b>Debts</b> are what you owe."), S("Subtract", "assets − debts", "Your <b>net worth</b> is assets minus debts."), S("Grow it", "📈", "Saving more and owing less raises your net worth.")]),
    L("Paying off debt faster", M.payoff(), [S("Months to pay", "$600 ÷ $50 = 12 months", "Divide the debt by the monthly payment to find the months."), S("Pay more", "$600 ÷ $100 = 6 months", "A bigger payment finishes the debt sooner."), S("Sooner", "12 − 6 = 6 months", "Subtract to see how many months you save. Real debts also save interest.")]),
    L("Rent over time", M.rent(), [S("Monthly to yearly", "$800 × 12", "Rent is paid every month. Multiply by 12 for a year."), S("Many years", "$9,600 × 3", "Multiply the year's rent by the number of years."), S("Raises", "+ $20 a month", "A rise in rent adds up over the whole year.")]),
    L("Stock price changes", M.stockMove(), [S("Shares", "📊", "A <b>share</b> is a small piece of a company. Its price can go up or down."), S("One share", "$20 → $23 is +$3", "Find how much one share changed."), S("All shares", "$3 × 10 shares = $30", "Multiply by the number of shares you own.")]),
    L("Dividends", M.dividend(), [S("Sharing profit", "💵", "A <b>dividend</b> is a share of a company's profit paid to its owners."), S("Per share", "50¢ × 20 shares", "A dividend is paid for each share you own."), S("Total", "1,000¢ = $10", "Change cents to dollars by dividing by 100.")]),
    L("Spreading out risk", M.diversify(), [S("Diversify", "🥚🥚🥚", "<b>Diversifying</b> means spreading money across many investments, not just one."), S("Some win, some lose", "+$50 −$20 +$30 −$10", "Gains and losses happen together."), S("Net", "gains $80 − losses $30 = +$50", "Add the gains, add the losses, then subtract.")]),
    L("What percent of your income?", M.expensePct(), [S("Part and whole", "$50 of $200", "A percent compares a part with the whole."), S("Make a fraction", "50/200 = 25/100", "Change the fraction to a number out of 100."), S("Percent", "25%", "Budgets often show each cost as a percent of income.")]),
    L("Finding the original price", M.original(), [S("Work backwards", "sale price $60, 25% off", "If you know the sale price and the discount, you can find the original."), S("What you pay", "100% − 25% = 75%", "The sale price is the percent you still pay."), S("Original", "75% = $60, so 25% = $20, 100% = $80", "Find one part, then multiply to get the whole.")]),
    L("Cost of a drive", M.drive(), [S("Miles per gallon", "🚗⛽", "Cars travel a certain number of miles on one gallon of gas."), S("Gallons used", "120 miles ÷ 30 = 4 gallons", "Divide the trip miles by miles per gallon."), S("Cost", "4 × $4 = $16", "Multiply the gallons by the price per gallon.")]),
    L("Utility bills", M.utility(), [S("Units used", "💡", "A home pays for electricity, water or gas by the unit."), S("Multiply", "300 units × 12¢ = 3,600¢", "Multiply the units by the price per unit."), S("Dollars", "3,600¢ = $36", "Divide cents by 100 for dollars.")]),
    L("Setting a price for profit", M.targetPrice(), [S("Costs and profit", "💡", "A seller wants sales to cover the costs and leave some profit."), S("Add them", "$30 + $20 + $10 = $60", "Add the costs and the profit goal."), S("Divide", "$60 ÷ 20 items = $3 each", "Divide by the number of items to find the price of one.")]),
    L("Insurance deductibles", M.deductible(), [S("Deductible", "$250", "A <b>deductible</b> is the amount you pay before insurance helps."), S("What insurance pays", "$1,000 − $250 = $750", "Subtract the deductible from the cost of the loss."), S("Sharing", "you pay a part too", "Some plans also make you pay a share of what is left.")]),
    L("Good debt and risky debt", mq(DEBT12, H_MC), [S("Borrowing", "🏦", "Debt can help people buy something valuable like a home or an education, if they can afford the payments."), S("Risky debt", "💳⚠️", "Borrowing for wants you cannot pay for can lead to years of trouble."), S("Smart steps", "📝", "Know the interest, make a plan to pay, and pay the high-interest debt first.")]),
    L("How the economy works", mq(ECON12, H_MC), [S("Banks and loans", "🏦", "Banks lend out money that people deposit and charge interest."), S("Trade", "🚢", "Countries sell <b>exports</b> and buy <b>imports</b>. Trade lets places get what they cannot easily make."), S("Ups and downs", "📊", "The economy grows and shrinks. In a <b>recession</b> jobs can be harder to find.")]),
    L("Scams and identity", mq(SCAM12, H_MC), [S("Phishing", "🎣", "<b>Phishing</b> messages pretend to be from a trusted place to get your private information."), S("Warning signs", "⏰ 🎁", "Pressure to act now, prizes that cost money and payment by gift cards are signs of a scam."), S("Protect yourself", "🔒", "Use strong passwords, never share codes and tell a parent right away.")])
  ];
  l12.push(mixOf("Mixed practice", [l12[0], l12[1], l12[2], l12[3], l12[4]]));
  l12.push(mixOf("Level 12 Challenge", [l12[5], l12[6], l12[7], l12[8], l12[9], l12[10], l12[11], l12[12], l12[13], l12[14]]));

  Object.assign(MONEY_LEVELS, { 10: l10, 11: l11, 12: l12 });
})();
