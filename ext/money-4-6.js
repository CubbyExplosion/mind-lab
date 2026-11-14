// ext/money-4-6.js  Mind Lab Money Skills levels 4-6 (60 lessons)
(() => {
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const BIG = [["📖", "book"], ["🧢", "cap"], ["🎒", "backpack"], ["⚽", "ball"], ["🎨", "paint set"], ["🧩", "puzzle"], ["🪁", "kite"], ["👕", "shirt"]];
  const COINS = { penny: { v: 1, size: 52, bg: "#c77b45" }, nickel: { v: 5, size: 58, bg: "#cfd3d9" }, dime: { v: 10, size: 46, bg: "#e8ebef" }, quarter: { v: 25, size: 66, bg: "#d4d8de" } };
  const KINDS = ["penny", "nickel", "dime", "quarter"];
  const chip = k => `<span class="coin" style="width:${COINS[k].size}px;height:${COINS[k].size}px;background:${COINS[k].bg}">${k}</span>`;
  const chips = (k, n) => Array.from({ length: n }, () => chip(k)).join("");
  const bill = d => `<span class="bill b${d}">$${d}</span>`;
  const bills = (d, n) => Array.from({ length: n }, () => bill(d)).join("");
  const worth = c => KINDS.reduce((s, k) => s + (c[k] || 0) * COINS[k].v, 0);
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
  const dollars = c => "$" + (c / 100).toFixed(2);
  const nl = (fn, bad) => { let r, i = 0; do { r = fn(); } while (r.includes(bad) && i++ < 40); return r; };
  const mc = (ans, cands) => {
    const s = [ans];
    shuf(cands).forEach(x => { if (x > 0 && !s.includes(x) && s.length < 3) s.push(x); });
    for (let k = 1; s.length < 3; k++) { const x = ans + 10 * k; if (!s.includes(x)) s.push(x); }
    return { choices: shuf(s.map(dollars)), answer: dollars(ans) };
  };
  const coinWord = (n, k) => k === "penny" ? (n > 1 ? "pennies" : "penny") : (n > 1 ? k + "s" : k);
  const greedy = t => {
    const p = []; let n = 0;
    [[25, "quarter"], [10, "dime"], [5, "nickel"], [1, "penny"]].forEach(([v, nm]) => { const k = Math.floor(t / v); if (k) { p.push(`${k} ${coinWord(k, nm)}`); n += k; t -= k * v; } });
    return { p, n };
  };
  const picture = (bk, ck, maxC, minC = 60) => {
    let b, c, t, tries = 0, cnt;
    do {
      b = {}; c = {};
      bk.forEach(k => { b[k] = ri(0, k === 1 ? 3 : 2); });
      ck.forEach(k => { c[k] = ri(0, k === "quarter" ? 3 : k === "penny" ? 4 : 3); });
      t = bk.reduce((s, k) => s + k * 100 * b[k], 0) + worth(c);
      cnt = bk.reduce((s, k) => s + b[k], 0) + ck.reduce((s, k) => s + c[k], 0);
      tries++;
    } while ((t > maxC || t < minC || cnt < 2 || cnt > 11) && tries < 500);
    const visual = bk.slice().sort((x, y) => y - x).map(k => bills(k, b[k])).join(" ") + " " + ck.slice().sort((x, y) => COINS[y].v - COINS[x].v).map(k => chips(k, c[k])).join("");
    return { t, visual };
  };
  const mq = (items, hints) => () => { const it = pick(items); return { text: it.q, choices: shuf([it.a, ...it.w]), answer: it.a, hints }; };

  // ---------------- question makers ----------------
  const M = {
    countMix(kinds, maxT) {
      return () => {
        let c, t, tries = 0;
        do { c = {}; kinds.forEach(k => { c[k] = ri(0, k === "quarter" ? 3 : 4); }); t = worth(c); tries++; } while ((t > maxT || t < 30 || kinds.reduce((s, k) => s + c[k], 0) < 3) && tries < 400);
        const ord = kinds.slice().sort((a, b) => COINS[b].v - COINS[a].v);
        const a = ri(1, 3), b = ri(1, 3), d = ri(1, 4), ex = a * 25 + b * 10 + d;
        return { text: "How many cents is this altogether?", visual: ord.map(k => chips(k, c[k])).join(""), answer: t,
          hints: ["Start with the coins worth the most and count them first.", "Skip count the big coins (25s or 10s), then count on with the smaller coins one at a time.",
            `Example: ${a} ${coinWord(a, "quarter")}, ${b} ${coinWord(b, "dime")} and ${d} ${coinWord(d, "penny")}. Count the quarters, then the dimes, then the pennies. That makes ${ex}¢. Now do yours.`] };
      };
    },
    dollarCents() {
      return () => {
        const d = ri(1, 9), c = ri(1, 99), t = d * 100 + c, ed = rx(1, 9, d), ec = 5 * ri(1, 19);
        if (Math.random() < 0.6) return { text: `How many cents is ${dollars(t)}?`, answer: t,
          hints: ["A dollar is worth 100 cents. Think about the dollars part first.", `${d} dollar${d > 1 ? "s are" : " is"} ${d} group${d > 1 ? "s" : ""} of 100¢. Then add the cents part.`,
            `Example: $${ed}.${String(ec).padStart(2, "0")} is ${ed * 100}¢ plus ${ec}¢. Now do yours.`] };
        return { text: `Which is the same as ${t}¢?`, ...mc(t, [c * 100 + d, t + 10, t - 10, t + 100, t - 100]),
          hints: ["Split the cents into whole dollars and the cents that are left over.", "Every 100¢ is one dollar. How many hundreds are in the number? What is left?",
            `Example: ${ed * 100 + ec}¢ is ${ed} dollars and ${ec} cents, so ${dollars(ed * 100 + ec)}. Now do yours.`] };
      };
    },
    quarters() {
      return () => {
        const st = ri(0, 2);
        if (st === 0) { const n = ri(2, 12), e = rx(2, 12, n); return { text: `How many cents are ${n} quarters?`, visual: n <= 8 ? chips("quarter", n) : undefined, answer: 25 * n,
          hints: ["Every quarter is worth the same amount.", `Skip count by 25s, once for each quarter. There are ${n}.`, `Example: ${e} quarters means counting by 25 ${e} times. 25, 50, 75 shows that 3 quarters is 75¢. Now count yours.`] }; }
        if (st === 1) { const k = ri(1, 5), e = rx(1, 5, k); return { text: `How many quarters make $${k}?`, answer: 4 * k,
          hints: ["Think about how many quarters make 1 dollar.", `4 quarters make $1 (25, 50, 75, 100). Do that ${k} time${k > 1 ? "s" : ""}.`, `Example: $${e} needs ${e} group${e > 1 ? "s" : ""} of 4 quarters. Now find how many groups yours needs.`] }; }
        const q = ri(2, 12) * 25, e = rx(2, 12, q / 25) * 25; return { text: `How many quarters make ${q}¢?`, answer: q / 25,
          hints: ["Each quarter is 25¢. How many 25s fit?", "Skip count by 25s until you get to the total. How many counts did it take?", `Example: to make ${e}¢, count 25, 50 and so on until ${e}. It takes ${e / 25} counts, so ${e / 25} quarters. Now do yours.`] };
      };
    },
    fewestCoins() {
      return () => {
        const t = ri(6, 99), e = rx(26, 99, t), g = greedy(t), ge = greedy(e);
        return { text: `What is the FEWEST number of coins that make ${t}¢?`, answer: g.n,
          hints: ["To use the fewest coins, start with the biggest coins.", "Take the biggest coin that fits (quarter 25¢, dime 10¢, nickel 5¢, penny 1¢). Then see what is left and repeat.",
            `Example: ${e}¢ = ${ge.p.join(", ")}. That is ${ge.n} coins. Now do yours.`] };
      };
    },
    coinsBills() {
      return () => {
        const { t, visual } = picture([1, 5], ["quarter", "dime", "nickel"], 1000);
        return { text: "How many cents is this altogether?", visual, answer: t,
          hints: ["Each $1 bill is 100¢ and each $5 bill is 500¢. Count the bills first.", "After the bills, count on with the quarters, then the dimes, then the nickels.", "Example: a $5 bill and 2 quarters is 500, then 525, 550. That is 550¢. Now do yours."] };
      };
    },
    compareCoins() {
      const ds = c => KINDS.slice().reverse().filter(k => c[k]).map(k => `${c[k]} ${coinWord(c[k], k)}`).join(" and ");
      return () => {
        let a, b, tries = 0;
        do {
          const ka = shuf(KINDS).slice(0, 2), kb = shuf(KINDS).slice(0, 2); a = {}; b = {};
          ka.forEach(k => { a[k] = ri(1, 4); }); kb.forEach(k => { b[k] = ri(1, 4); }); tries++;
        } while ((worth(a) === worth(b) || ds(a) === ds(b) || Math.abs(worth(a) - worth(b)) > 40) && tries < 300);
        const hi = Math.random() < 0.5, ans = (worth(a) > worth(b)) === hi ? ds(a) : ds(b);
        return { text: `Which is worth ${hi ? "MORE" : "LESS"}?`, choices: shuf([ds(a), ds(b)]), answer: ans,
          hints: ["Don't just count the coins. Find what each group is worth.", "Work out the total cents for each group, then compare the two totals.", "Example: 2 dimes (20¢) or 1 quarter (25¢)? 25 is more than 20, so the quarter is worth more. Now do yours."] };
      };
    },
    changeCents(from, step) {
      return () => {
        const price = step === 1 ? ri(6, from - 6) : step * ri(1, from / step - 1), [e, n] = pick(BIG), ep = rx(6, from - 6, price);
        return { text: `A ${n} ${e} costs ${price}¢. You pay with ${from === 100 ? "one dollar" : from + "¢"}. How much change do you get?`, visual: from === 100 ? bill(1) : chips("quarter", 2), answer: from - price,
          hints: ["Change is the money you get back when you pay more than the price.", `Count up from the price, ${price}, to ${from}. Count up to the next ten first, then by tens.`,
            `Example: price ${ep}¢, pay ${from}¢. From ${ep} count up to ${Math.ceil(ep / 10) * 10}, then on to ${from}. Add the jumps for the change. Now do yours.`] };
      };
    },
    changeWhole(froms) {
      return () => {
        const from = pick(froms), price = from <= 20 ? ri(1, from - 1) : ri(5, from - 4), [e, n] = pick(BIG), ep = rx(3, from - 2, price);
        return { text: `You pay with a $${from} bill for a ${n} ${e} that costs $${price}. How much change do you get back?`, visual: [5, 10, 20].includes(from) ? bill(from) : undefined, answer: from - price,
          hints: ["Change is what the store gives back when you pay with more than the price.", `Count up from $${price} to $${from}, or subtract: $${from} minus the price.`, `Example: pay $${from} for something that costs $${ep}. $${from} − $${ep} = $${from - ep}. Now do yours.`] };
      };
    },
    addWhole(max) {
      return () => {
        const a = ri(10, max - 10), b = ri(10, max - a), [e1, n1] = pick(BIG), [e2, n2] = pick(BIG.filter(x => x[1] !== n1)), ea = rx(11, 40), eb = rx(11, 40);
        return { text: `A ${n1} ${e1} costs $${a} and a ${n2} ${e2} costs $${b}. How many dollars for both?`, answer: a + b,
          hints: ["Buying both means putting the two prices together.", "Add the tens first, then the ones. Or start at the bigger price and count on.", `Example: $${ea} + $${eb}: ${Math.floor(ea / 10) * 10} + ${Math.floor(eb / 10) * 10} = ${Math.floor(ea / 10) * 10 + Math.floor(eb / 10) * 10}, then add the ones ${ea % 10} + ${eb % 10}. Now do yours.`] };
      };
    },
    subWhole(max) {
      return () => {
        const have = ri(25, max), spend = ri(8, have - 5), [e, n] = pick(BIG), eh = rx(30, 90, have), es = rx(8, 25, spend);
        return { text: `You have $${have}. You buy a ${n} ${e} for $${spend}. How many dollars do you have left?`, answer: have - spend,
          hints: ["Spending means you will have less.", "Take away the price. Take off the tens first, then the ones.", `Example: $${eh} − $${es} = $${eh - es} left. Do it in steps: take away the tens, then the ones. Now do yours.`] };
      };
    },
    allowance() {
      return () => {
        const per = ri(2, 8), n = ri(3, 9), nm = pick(NM), ep = rx(2, 8, per), en = rx(2, 5, n);
        return { text: `${nm} gets $${per} allowance each week. How many dollars does ${nm} get in ${n} weeks?`, answer: per * n,
          hints: ["The same amount comes in again and again, so think about repeated adding.", `Skip count by ${per}s, ${n} times.`, `Example: $${ep} a week for ${en} weeks: count by ${ep}s ${en} times. That is $${ep * en}. Now do yours.`] };
      };
    },
    weeksToGoal(maxPer, maxWeeks, withStart) {
      return () => {
        const per = ri(2, maxPer), weeks = ri(3, maxWeeks), start = withStart ? ri(1, 4) * 5 : 0, goal = start + per * weeks, nm = pick(NM), [e, n] = pick(BIG);
        const ep = rx(2, 9, per), ew = rx(3, 8, weeks);
        return { text: `${nm} wants a ${n} ${e} that costs $${goal}. ${nm} ${withStart ? `already has $${start} and ` : ""}saves $${per} each week. How many weeks until ${nm} has enough?`, answer: weeks,
          hints: [withStart ? "First find how much more money is still needed." : "Find how many groups of the weekly amount fit into the price.", withStart ? `Take away what ${nm} already has from the price. Then see how many $${per} jumps fit in what is left.` : `Count by ${per}s until you reach the price. How many counts?`,
            `Example: a $${ep * ew} toy and $${ep} saved each week${withStart ? " (nothing saved yet)" : ""}. Count by ${ep}s: it takes ${ew} counts, so ${ew} weeks. Now do yours.`] };
      };
    },
    balance(two) {
      return () => {
        const s = 5 * ri(2, 18), d = 5 * ri(1, 8), nm = pick(NM), es = rx(10, 60, s);
        if (!two) return Math.random() < 0.5
          ? { text: `${nm} has $${s} in the bank and puts in $${d} more. How much is in the bank now?`, answer: s + d, hints: ["A deposit puts money in the bank, so the balance goes up.", "Add the deposit to what was already there.", `Example: $${es} in the bank plus a $10 deposit makes $${es + 10}. Now do yours.`] }
          : { text: `${nm} has $${s + d} in the bank and takes out $${d}. How much is left in the bank?`, answer: s, hints: ["A withdrawal takes money out, so the balance goes down.", "Subtract the amount taken out from the money that was in the bank.", `Example: $${es + 10} in the bank, take out $10, and $${es} is left. Now do yours.`] };
        const w = 5 * ri(1, Math.floor((s + d) / 5) - 1);
        return { text: `${nm} has $${s} in the bank. ${nm} puts in $${d}, and later takes out $${w}. How much is in the bank now?`, answer: s + d - w,
          hints: ["Put in means add. Take out means subtract. Go in order.", "Do the deposit first, then take away the withdrawal from your new total.", `Example: $${es}, put in $5, take out $10: $${es} + $5 = $${es + 5}, then − $10 = $${es - 5}. Now do yours.`] };
      };
    },
    splitMoney() {
      const f = () => {
        const tot = 5 * ri(3, 10), a = 5 * ri(1, Math.floor(tot / 10)), b = 5 * ri(1, Math.max(1, Math.floor((tot - a) / 5) - 1)), nm = pick(NM);
        if (a + b >= tot) return f();
        if (Math.random() < 0.35 && tot % 10 === 0) return { text: `${nm} gets $${tot} and saves half of it. How many dollars does ${nm} save?`, answer: tot / 2,
          hints: ["Half means splitting into 2 equal parts.", "Share the money into 2 equal groups. How much is in one group?", "Example: half of $18 is $9, because 9 + 9 = 18. Now do yours."] };
        return { text: `${nm} gets $${tot}. ${nm} puts $${a} in the SAVE jar and $${b} in the SPEND jar. The rest goes in the SHARE jar. How many dollars go in the SHARE jar?`, answer: tot - a - b,
          hints: ["The rest means what is left after the other two jars.", "Add the money in the first two jars, then take that away from the total.", "Example: $22 total, $5 in one jar and $8 in another. 5 + 8 = 13 and 22 − 13 = 9 left. Now do yours."] };
      };
      return f;
    },
    pricesQty(maxP) {
      return () => {
        const p = ri(2, maxP), n = ri(3, 8), nm = pick(NM), it = pick([["pencils", "✏️"], ["erasers", "🧽"], ["stickers", "⭐"], ["cards", "🃏"], ["notebooks", "📓"], ["toy cars", "🚗"]]), ep = rx(2, 9, p), en = rx(2, 6, n);
        return { text: `${it[1]} ${nm} buys ${n} ${it[0]}. Each one costs $${p}. How many dollars is that?`, answer: p * n,
          hints: ["Each one costs the same, so you add the price again and again.", `Skip count by ${p}s, ${n} times, or multiply ${n} × ${p}.`, `Example: ${en} things at $${ep} each is ${en} × ${ep} = $${en * ep}. Now do yours.`] };
      };
    },
    unitPrice(maxP, maxN) {
      return () => {
        const p = ri(2, maxP), n = ri(2, maxN), tot = p * n, it = pick(["pencils", "apples", "stickers", "erasers", "toy cars", "cookies"]), ep = rx(2, 9, p), en = rx(2, 6, n);
        if (maxN > 6 && Math.random() < 0.4) { const m = n * ri(2, 3); return { text: `${n} ${it} cost $${tot}. How many dollars do ${m} ${it} cost?`, answer: p * m,
          hints: ["First find out how much ONE costs.", `Share $${tot} equally among ${n}. Then multiply by ${m}.`, "Example: 3 things cost $6, so one costs $2. Then 6 things cost $12. Now do yours."] }; }
        return { text: `${n} ${it} cost $${tot}. Each one costs the same. How many dollars does ONE cost?`, answer: p,
          hints: ["Sharing the cost equally is dividing.", `Divide $${tot} into ${n} equal parts. Or ask: ${n} times what number makes ${tot}?`, `Example: ${en} things cost $${ep * en}. ${en} times ${ep} is ${ep * en}, so one costs $${ep}. Now do yours.`] };
      };
    },
    profit(allowLoss) {
      return () => {
        const nm = pick(NM), n = ri(5, 15), p = ri(1, 3) * (Math.random() < 0.5 ? 1 : 2), rev = n * p;
        if (allowLoss && Math.random() < 0.4) { const rv = ri(6, 40), c = ri(6, 40); if (rv !== c) return { text: `${nm}'s stand made $${rv} and the supplies cost $${c}. Is that a profit or a loss?`, choices: ["Profit", "Loss"], answer: rv > c ? "Profit" : "Loss",
          hints: ["Profit means you made more than you spent. A loss means you spent more than you made.", "Compare the two amounts. Which one is bigger, the money made or the money spent?", "Example: made $12, spent $9. 12 is more than 9, so that is a gain of $3. Made $5, spent $8 would be the other kind of result."] }; }
        const cost = ri(Math.max(2, Math.floor(rev / 4)), Math.max(3, Math.floor(rev / 2))), ex = rx(10, 30), ec = rx(3, 9);
        return { text: `${nm} sells ${n} cups of lemonade for $${p} each. The supplies cost $${cost}. How many dollars of profit did ${nm} make?`, answer: rev - cost,
          hints: ["Profit is the money you made minus the money you spent.", `First find the money made: ${n} cups at $${p} each. Then take away $${cost}.`, `Example: $${ex} made and $${ec} spent. Profit is ${ex} − ${ec} = $${ex - ec}. Now do yours, but find the money made first.`] };
      };
    },
    interest5() {
      return () => {
        const b = 10 * ri(2, 10), i = ri(1, 5), nm = pick(NM), eb = rx(2, 10, b / 10) * 10, ei = rx(1, 5, i);
        return { text: `${nm} has $${b} in a savings account. The bank adds $${i} in interest. How many dollars does ${nm} have now?`, answer: b + i,
          hints: ["Interest is extra money the bank gives you for keeping money there.", "Interest gets added to the money you already have.", `Example: $${eb} plus $${ei} interest is $${eb + ei}. Now do yours.`] };
      };
    },
    picChoice(bk, ck, maxC) {
      return () => {
        const { t, visual } = picture(bk, ck, maxC);
        return { text: "How much money is this?", visual, ...mc(t, [t + 10, t - 10, t + 100, t - 100, t + 25, t - 25, t + 5, t - 5]),
          hints: ["Count the bills first, then the coins. Dollars come before cents.", "Say the dollars, then count on with the quarters, dimes and nickels. Write the answer with a dollar sign and a decimal point.", "Example: a $5 bill and 2 quarters: 5 dollars, then 50 cents more. That is $5.50. Now do yours."] };
      };
    },
    writeMoney() {
      return () => {
        let d = ri(1, 9), c; do { c = ri(11, 99); } while (c % 11 === 0 || c % 10 === 0);
        const rev = Number(String(c).split("").reverse().join(""));
        if (Math.random() < 0.5) return { text: `Which one is ${d} dollars and ${c} cents?`, choices: shuf([`$${d}.${c}`, `$${d}.${rev}`, `$${c}.${d}`]), answer: `$${d}.${c}`,
          hints: ["Dollars go before the decimal point. Cents go after it.", "Write the dollars first, then a point, then the two cents digits in the same order you say them.", "Example: 4 dollars and 60 cents is $4.60. Now write yours."] };
        return { text: `Which words match <b>$${d}.${c}</b>?`, choices: shuf([`${d} dollars and ${c} cents`, `${c} dollars and ${d} cents`, `${d} dollars and ${rev} cents`]), answer: `${d} dollars and ${c} cents`,
          hints: ["The number before the point is dollars. The number after it is cents.", "Read the left side as dollars, then the right side as cents.", "Example: $3.25 is 3 dollars and 25 cents. Now read yours."] };
      };
    },
    compareAmt() {
      return () => {
        const d = ri(1, 8); let a = ri(11, 99), b = ri(11, 99); while (a === b) b = ri(11, 99);
        const list = [...new Set([d * 100 + a, d * 100 + b, (Math.random() < 0.5 ? d + 1 : d) * 100 + rx(1, 9)])];
        const big = Math.random() < 0.5, ans = big ? Math.max(...list) : Math.min(...list);
        return { text: `Which amount is ${big ? "the GREATEST" : "the LEAST"}?`, choices: shuf(list.map(dollars)), answer: dollars(ans),
          hints: ["Compare the dollars first. If they match, compare the cents.", "Line the amounts up with the decimal points. Compare from the left: dollars, then tens of cents, then cents.", "Example: $4.05 and $4.50. Both have 4 dollars. 50 cents is more than 5 cents, so $4.50 is greater."] };
      };
    },
    addCents() {
      return () => {
        const a = ri(11, 60), b = ri(11, 99 - a), ea = rx(11, 50, a), eb = rx(11, 40, b);
        return { text: `You have ${a}¢ and find ${b}¢ more. How many cents do you have now?`, answer: a + b,
          hints: ["Finding more means you add.", "Add the tens, then add the ones. Put the two parts together.", `Example: ${ea}¢ + ${eb}¢. Tens: ${Math.floor(ea / 10) * 10} + ${Math.floor(eb / 10) * 10}. Ones: ${ea % 10} + ${eb % 10}. Then add those two answers. Now do yours.`] };
      };
    },
    subCents() {
      return () => {
        const a = ri(35, 99), b = ri(11, a - 5), ea = rx(40, 90, a), eb = rx(11, 30);
        return { text: `You have ${a}¢ and spend ${b}¢. How many cents are left?`, answer: a - b,
          hints: ["Spending means you have less, so subtract.", "Take away the tens first, then the ones. Or count back from the bigger number.", `Example: ${ea}¢ − ${eb}¢. Take off ${Math.floor(eb / 10) * 10} to get ${ea - Math.floor(eb / 10) * 10}, then take off ${eb % 10} more. Now do yours.`] };
      };
    },
    decAdd(n) {
      return () => {
        const pr = Array.from({ length: n }, () => (n === 2 ? ri(1, 4) * 100 : ri(0, 2) * 100) + 5 * ri(1, 19));
        const it = shuf(BIG).slice(0, n), tot = pr.reduce((s, x) => s + x, 0);
        const e1 = 100 * ri(1, 3) + 5 * ri(1, 9), e2 = 100 * ri(1, 3) + 5 * ri(1, 9);
        const ex = nl(() => `Example: ${dollars(e1)} + ${dollars(e2)}. Add the dollars, add the cents, then put them together to get ${dollars(e1 + e2)}.`, dollars(tot));
        const list = it.map((x, i) => `a ${x[1]} ${x[0]} for ${dollars(pr[i])}`);
        const said = n === 2 ? list.join(" and ") : list.slice(0, -1).join(", ") + ", and " + list[n - 1];
        return { text: `You buy ${said}. How much is the total?`, ...mc(tot, [tot + 100, tot - 100, tot + 10, tot - 10, tot + 50, tot - 50]),
          hints: ["Add all the prices. Line up the decimal points so dollars sit with dollars and cents with cents.", "Add the cents first. If they make 100 or more, you carry 1 dollar. Then add the dollars.", ex] };
      };
    },
    decSub() {
      return () => {
        const have = 100 * ri(3, 14) + 5 * ri(0, 19), cost = 5 * ri(10, Math.floor((have - 50) / 5)), left = have - cost;
        const eh = 100 * ri(4, 9) + 5 * ri(1, 18), ec = 100 * ri(1, 3) + 5 * ri(1, 18);
        const ex = nl(() => `Example: ${dollars(eh)} − ${dollars(ec)}. Count up from ${dollars(ec)} to ${dollars(eh)} to find the difference, ${dollars(eh - ec)}.`, dollars(left));
        return { text: `${pick(NM)} has ${dollars(have)} and spends ${dollars(cost)}. How much money is left?`, ...mc(left, [left + 100, left - 100, left + 10, left - 10, left + 50, left - 50]),
          hints: ["Spending means you take away.", "Line up the decimal points. Subtract the cents first (borrow a dollar if you need to), then the dollars.", ex] };
      };
    },
    changeDec() {
      return () => {
        const b = pick([5, 10, 20]), price = 5 * ri(10, b * 20 - 1), ch = b * 100 - price, [e, n] = pick(BIG);
        const ep = 100 * ri(1, 4) + 5 * ri(1, 18);
        return { text: `A ${n} ${e} costs ${dollars(price)}. You pay with a $${b} bill. How much change do you get?`, visual: bill(b), ...mc(ch, [ch + 100, ch - 100, ch + 10, ch - 10, ch + 50, ch - 50]),
          hints: ["Change is what you get back: the bill minus the price.", "Count up from the price to the next whole dollar, then count up to the bill.", `Example: price ${dollars(ep)}, paid with $5. Up to $${Math.ceil(ep / 100)} adds ${dollars(Math.ceil(ep / 100) * 100 - ep)}, then up to $5 adds the rest. Now do yours.`] };
      };
    },
    roundDollar() {
      return () => {
        let c; do { c = ri(101, 999); } while (c % 100 === 50);
        const ans = Math.round(c / 100), ec = rx(101, 999, c);
        return { text: `Round ${dollars(c)} to the nearest dollar. (Type the number of dollars.)`, answer: ans,
          hints: ["Rounding finds the closest whole dollar. Look at the cents.", "If the cents are less than 50, stay at the dollars you have. If they are 50 or more, go up to the next dollar.", `Example: ${dollars(ec)} has ${ec % 100} cents. ${ec % 100 < 50 ? "That is less than 50, so it stays at" : "That is 50 or more, so it goes up to"} $${Math.round(ec / 100)}. Now round yours.`] };
      };
    },
    estimate() {
      return () => {
        let a, b; do { a = ri(101, 799); } while (a % 100 === 50); do { b = ri(101, 799); } while (b % 100 === 50);
        const r = Math.round(a / 100) + Math.round(b / 100), [e1, n1] = pick(BIG), [e2, n2] = pick(BIG.filter(x => x[1] !== n1));
        const set = shuf([r + 1, r - 1, r + 2].filter(x => x > 0)).slice(0, 2);
        return { text: `A ${n1} ${e1} costs ${dollars(a)} and a ${n2} ${e2} costs ${dollars(b)}. About how much for both?`, choices: shuf([r, ...set].map(x => "about $" + x)), answer: "about $" + r,
          hints: ["About means you do not need the exact answer. Round each price first.", "Round each price to the nearest dollar, then add the two whole numbers.", "Example: $2.30 and $4.80. Round: $2 and $5. Then 2 + 5 = about $7. Now do yours."] };
      };
    },
    discount() {
      return () => {
        const st = ri(0, 2);
        if (st === 0) { const p = 2 * ri(2, 20), ep = rx(2, 20, p / 2) * 2; return { text: `A shirt costs $${p}. It is HALF OFF today. What does it cost now?`, answer: p / 2,
          hints: ["Half off means you pay half the price.", "Find half of the price: split it into 2 equal parts.", `Example: half off $${ep} means you pay $${ep / 2}. Now do yours.`] }; }
        const p = ri(10, 40), off = ri(2, 8), ep = rx(10, 40, p), eo = rx(2, 8, off);
        if (st === 1) return { text: `A game costs $${p}. A coupon takes $${off} off. How much do you pay?`, answer: p - off,
          hints: ["Taking money off the price makes it cost less.", "Subtract the coupon amount from the price.", `Example: a $${ep} toy with $${eo} off is ${ep} − ${eo} = $${ep - eo}. Now do yours.`] };
        return { text: `A toy costs $${p}. It goes on sale for $${p - off}. How many dollars do you save?`, answer: off,
          hints: ["Saving is the difference between the old price and the sale price.", "Subtract the sale price from the old price.", `Example: $${ep} down to $${ep - eo} saves ${ep} − ${ep - eo} = $${eo}. Now do yours.`] };
      };
    },
    betterBuy() {
      return () => {
        const u1 = ri(1, 5), u2 = rx(1, 5, u1), n1 = ri(2, 6), n2 = rx(2, 6, n1), it = pick(["pencils", "apples", "erasers", "juice boxes"]);
        const cheaper = u1 < u2 ? "Pack A" : "Pack B";
        return { text: `Which is the better buy?<br>Pack A: ${n1} ${it} for $${n1 * u1}<br>Pack B: ${n2} ${it} for $${n2 * u2}`, choices: ["Pack A", "Pack B"], answer: cheaper,
          hints: ["A better buy means a lower price for each one.", "Find the cost of ONE in each pack by dividing the price by the number of items. The smaller cost is the better buy.", "Example: 2 for $8 is $4 each. 4 for $12 is $3 each. $3 is less than $4, so the pack of 4 is the better buy."] };
      };
    },
    budget() {
      return () => {
        const a = 5 * ri(4, 12), b = 5 * ri(1, 6), c = 5 * ri(2, Math.floor((a + b) / 5) - 1), nm = pick(NM);
        return { text: `${nm} gets $${a} from chores and $${b} as a gift. ${nm} spends $${c} on a book. How many dollars are left?`, answer: a + b - c,
          hints: ["Money coming in is income. Money going out is spending.", "Add all the money that came in, then take away the money spent.", "Example: $20 and $5 come in, $10 is spent. 20 + 5 = 25, then 25 − 10 = $15 left. Now do yours."] };
      };
    },
    savePlan() {
      return () => {
        const s = 5 * ri(1, 8), per = ri(2, 9), w = ri(3, 10), nm = pick(NM), es = 5 * rx(1, 6, s / 5), ep = rx(2, 6, per), ew = rx(3, 6, w);
        return { text: `${nm} has saved $${s}. ${nm} will save $${per} each week for ${w} more weeks. How many dollars will ${nm} have then?`, answer: s + per * w,
          hints: ["Two steps: first find how much will be added, then add what is already saved.", `Find ${w} weeks of $${per}, then add the $${s} already saved.`, `Example: $${es} saved, plus $${ep} for ${ew} weeks. ${ep} × ${ew} = ${ep * ew}, and ${es} + ${ep * ew} = $${es + ep * ew}. Now do yours.`] };
      };
    },
    interest6() {
      return () => {
        const x = 10 * ri(2, 12), nm = pick(NM), ex = rx(2, 12, x / 10) * 10;
        if (Math.random() < 0.5) return { text: `A bank pays $1 each year for every $10 you save. ${nm} saves $${x}. How many dollars of interest is that in one year?`, answer: x / 10,
          hints: ["Count how many groups of $10 are in the savings.", "Each group of $10 earns $1. How many tens fit in the savings?", `Example: $${ex} has ${ex / 10} groups of $10, so it earns $${ex / 10}. Now do yours.`] };
        return { text: `A bank pays $1 each year for every $10 you save. ${nm} saves $${x}. How many dollars does ${nm} have after one year?`, answer: x + x / 10,
          hints: ["First find the interest, then add it to the savings.", "Interest is $1 for each $10. Find how many tens are in the savings, then add that to the savings.", `Example: $${ex} earns $${ex / 10}, so ${ex} + ${ex / 10} = $${ex + ex / 10} after a year. Now do yours.`] };
      };
    }
  };

  // ---------------- multiple-choice banks ----------------
  const JOB = [
    { q: "What is a paycheck?", a: "Money you get for doing a job", w: ["A kind of coin", "A gift you must give back"] },
    { q: "Why do grown-ups go to work?", a: "To earn money for things they need", w: ["Because money grows on trees", "Only to play games"] },
    { q: "What is a job?", a: "Work you do to earn money", w: ["A game you play", "A kind of coin"] },
    { q: "You do extra chores and your family pays you. This money is...", a: "Earned", w: ["Borrowed", "Lost"] },
    { q: "Who helps people who are sick?", a: "A doctor", w: ["A baker", "A mail carrier"] },
    { q: "Who brings letters and packages to homes?", a: "A mail carrier", w: ["A farmer", "A teacher"] },
    { q: "A customer is...", a: "A person who buys something", w: ["A person who sells it", "A kind of store"] }
  ];
  const SAFE4 = [
    { q: "A game asks for a parent's credit card. What do you do?", a: "Ask a parent first", w: ["Type in the card number", "Ask a friend to type it"] },
    { q: "Why do we keep a bank PIN secret?", a: "So no one can take your money", w: ["So it is more fun", "Because it is heavy"] },
    { q: "Where is a safe place to keep your savings at home?", a: "A piggy bank or box in your room", w: ["On the school bus", "In a stranger's bag"] },
    { q: "An email says you won money but wants your parent's password. What is it?", a: "A trick", w: ["A real gift", "A school test"] },
    { q: "Someone online says: send me gift cards and I'll be your friend. What do you do?", a: "Say no and tell a parent", w: ["Send one card", "Keep it a secret"] },
    { q: "Who should help with a big online purchase?", a: "A parent", w: ["A stranger", "Nobody"] },
    { q: "You carry some money to the park. What is a good plan?", a: "Keep it in a zipped pocket or wallet", w: ["Carry it loose in your hand", "Show it to everyone"] }
  ];
  const NEED4 = [
    { q: "Which is a need?", a: "Warm clothes in winter", w: ["A new toy", "A candy bar"] },
    { q: "Which is a want?", a: "A video game", w: ["Clean water", "A place to sleep"] },
    { q: "Your shoes are too small to wear. New shoes are a...", a: "Need", w: ["Want"] },
    { q: "A third toy robot when you already have two is a...", a: "Want", w: ["Need"] },
    { q: "You have $10 and need lunch. What is the smart first step?", a: "Pay for lunch, then think about wants", w: ["Buy a toy first", "Spend it all on candy"] },
    { q: "Which is a need for a family?", a: "Food for dinner", w: ["A fancy hat", "A new game console"] },
    { q: "Why do we think about needs before wants?", a: "Needs keep us safe and healthy", w: ["Wants are bad", "Needs are always cheaper"] }
  ];
  const SAVE4 = [
    { q: "You want a $30 toy and have $10. What is a good plan?", a: "Save a little each week", w: ["Take it without paying", "Forget your goal"] },
    { q: "A saving goal is...", a: "Something you save up to buy", w: ["Something you lose", "A kind of coin"] },
    { q: "Which helps you reach a saving goal?", a: "Putting some money aside each week", w: ["Spending every coin right away", "Hiding it and forgetting it"] },
    { q: "You get $5. You want a $4 toy now and also want to save. What could you do?", a: "Buy the toy and save the $1 left", w: ["Spend $5 and owe $1", "Throw away the $1"] },
    { q: "Why can saving be hard?", a: "You wait before you get what you want", w: ["Coins are heavy", "Banks are closed"] },
    { q: "A friend says to spend it all today. What is a smart answer?", a: "I will save some for later", w: ["Okay, spend everything", "I will throw it away"] },
    { q: "When you reach your goal, you can...", a: "Buy the thing you saved for", w: ["Give the money to nobody", "Start over with nothing"] }
  ];
  const GS5 = [
    { q: "A toy is a good. What is a haircut?", a: "A service", w: ["A good", "A coin"] },
    { q: "Which is a GOOD (a thing you can hold)?", a: "A pencil", w: ["A haircut", "A bus ride"] },
    { q: "Which is a SERVICE?", a: "A teacher helping students", w: ["A banana", "A shoe"] },
    { q: "A bike shop fixes your bike. Fixing the bike is a...", a: "Service", w: ["Good"] },
    { q: "Which one is a service?", a: "Mowing a lawn", w: ["A lawn mower", "A bag of seeds"] },
    { q: "A person who buys goods or services is a...", a: "Consumer", w: ["Producer", "Banker"] },
    { q: "A person who makes goods or gives services is a...", a: "Producer", w: ["Consumer", "Customer"] }
  ];
  const TRADE5 = [
    { q: "You have $10. A book costs $10 and a puzzle costs $10. Picking the book means...", a: "You can't buy the puzzle with that money", w: ["You can buy both", "You get free money"] },
    { q: "What is a trade-off?", a: "Giving up one thing to get another", w: ["Trading coins at a bank", "Getting everything you want"] },
    { q: "Which is a smart way to choose between two things?", a: "Think about which you will use or enjoy more", w: ["Pick the first one you see", "Pick what your friend has"] },
    { q: "Mia spends all her money on candy today. What might happen?", a: "She can't buy the toy she wanted later", w: ["She will have more money tomorrow", "The candy turns into coins"] },
    { q: "Why does comparing prices at two stores help?", a: "You can find a better price", w: ["You spend more", "You lose your receipt"] },
    { q: "A budget helps you...", a: "Plan how to use your money", w: ["Make new coins", "Spend without thinking"] },
    { q: "Why can waiting to buy something be smart?", a: "You may save enough or find it on sale", w: ["Prices always fall to zero", "Waiting is never smart"] }
  ];
  const ONLINE5 = [
    { q: "You want to buy something inside a game. What do you do first?", a: "Ask a parent", w: ["Tap buy fast", "Ask a stranger"] },
    { q: "A pop-up says \"Buy now! Only 1 minute left!\" It is trying to...", a: "Rush you into buying", w: ["Help you save", "Teach you math"] },
    { q: "Who should type card details for an online buy?", a: "A parent or guardian", w: ["You, quietly", "A new online friend"] },
    { q: "A $200 game is for sale for $1. It might be...", a: "A scam", w: ["A gift", "A school rule"] },
    { q: "You spent real money in a game by mistake. What do you do?", a: "Tell a parent right away", w: ["Hide it", "Buy more to fix it"] },
    { q: "Which should you never post online?", a: "Your home address", w: ["Your favorite color", "A funny joke"] },
    { q: "Someone offers free game coins if you tell them your password. What do you do?", a: "Don't share it and tell a parent", w: ["Give the password", "Give half the password"] }
  ];
  const GIVE5 = [
    { q: "What does a food bank do?", a: "Gives food to people who need it", w: ["Sells candy", "Fixes cars"] },
    { q: "Which way of giving does not cost money?", a: "Volunteering your time", w: ["Keeping your toys", "Spending allowance on candy"] },
    { q: "In the save, spend and give plan, what does GIVE mean?", a: "Share to help others", w: ["Buy for yourself", "Put in the bank"] },
    { q: "A good rule when choosing a gift is to think about...", a: "What the other person would like", w: ["What is cheapest", "What you want to keep"] },
    { q: "Your class raises $40 for an animal shelter. The shelter uses it to...", a: "Care for animals", w: ["Buy video games", "Pay for a vacation"] },
    { q: "Is it okay to give a little if you don't have much?", a: "Yes, any amount can help", w: ["No, only big gifts count", "Only grown-ups can give"] },
    { q: "What is a donation?", a: "A gift of money or things to help", w: ["A price tag", "A loan you must pay back"] }
  ];
  const LOAN6 = [
    { q: "A loan is money you...", a: "Borrow and must pay back", w: ["Keep for free", "Find on the street"] },
    { q: "When you borrow from a bank, you usually pay back...", a: "The money plus a little extra", w: ["Less than you borrowed", "Nothing at all"] },
    { q: "What is debt?", a: "Money you owe", w: ["Money you saved", "A kind of coin"] },
    { q: "Which is a good habit with borrowed money?", a: "Pay it back on time", w: ["Forget about it", "Borrow more to hide it"] },
    { q: "A friend who has not paid you back before asks to borrow $20. A smart reply is...", a: "Politely say no, or ask to be paid back first", w: ["Say yes and never ask again", "Give them $40"] },
    { q: "Interest on a loan is...", a: "A fee for borrowing", w: ["A prize", "A tax on candy"] },
    { q: "Which costs you more: borrowing $10 and paying back $12, or paying back $10?", a: "Paying back $12", w: ["Paying back $10"] }
  ];
  const ADS6 = [
    { q: "Why do stores put candy near the checkout?", a: "To tempt you to buy it", w: ["To help you save", "To keep it cold"] },
    { q: "An ad says \"Everyone has one!\" What should you ask yourself?", a: "Do I really need it?", w: ["Where is the biggest one?", "How can I buy two?"] },
    { q: "What does a sale sign mean?", a: "The price is lower for a while", w: ["It is free", "It is broken"] },
    { q: "Is something on sale always a good deal?", a: "No, only if you need it", w: ["Yes, always", "Yes, if it is shiny"] },
    { q: "A receipt shows...", a: "What you bought and what you paid", w: ["Your bank PIN", "Where you live"] },
    { q: "Why compare prices before buying?", a: "To pay less for the same thing", w: ["To spend more", "To waste time"] },
    { q: "Ads are made to...", a: "Make you want to buy something", w: ["Teach you for free", "Pay your bills"] }
  ];
  const WORDS6 = [
    { q: "Income is...", a: "Money you receive", w: ["Money you owe", "Money you spend"] },
    { q: "An expense is...", a: "Money you spend", w: ["Money you receive", "A kind of bank"] },
    { q: "A budget is...", a: "A plan for your money", w: ["A kind of coin", "A store sale"] },
    { q: "Profit is...", a: "Money left after costs are paid", w: ["The cost of supplies", "Money you owe"] },
    { q: "Which is income?", a: "Allowance from your parents", w: ["Buying lunch", "Paying a library fine"] },
    { q: "Which is an expense?", a: "Buying a notebook", w: ["Birthday money you receive", "Pay for a lawn job you did"] },
    { q: "If your income is more than your expenses, you...", a: "Have money left to save", w: ["Owe money", "Have no money"] }
  ];
  const H_MC = ["Read each choice slowly and think about what the words mean.", "Cross out the choices that are unsafe, unfair or do not make sense. Which one is left?", "Example: if the question is about keeping money safe, pick the choice that protects it and asks a parent when you are unsure."];

  // ---------------- level 4 ----------------
  const l4 = [
    L("Counting coins to $1", M.countMix(KINDS, 100), [S("All four coins", chip("quarter") + chip("dime") + chip("nickel") + chip("penny"), "Remember: quarter 25¢, dime 10¢, nickel 5¢, penny 1¢."), S("Biggest first", "25, 50, 60, 65", "Count the biggest coins first, then count on: 2 quarters is 50¢, plus a dime is 60¢, plus a nickel is 65¢."), S("Tip", "💡", "100 cents make one dollar. If you reach 100, you have a whole dollar!")]),
    L("Dollars and cents", M.dollarCents(), [S("Dollars and cents", "$2.35", "The number before the point is <b>dollars</b>. The two numbers after it are <b>cents</b>. $2.35 is 2 dollars and 35 cents."), S("Turn it into cents", "$2.35 = 200¢ + 35¢ = 235¢", "Each dollar is 100¢. Change the dollars to cents, then add the cents."), S("Going back", "235¢ = $2.35", "Every 100¢ is a dollar. 235¢ has two hundreds, so 2 dollars, and 35¢ left over.")]),
    L("Counting quarters", M.quarters(), [S("The quarter", chip("quarter") + " = 25¢", "A quarter is worth 25¢. It is called a quarter because it is one fourth of a dollar."), S("Skip count by 25", "25, 50, 75, 100", "Two quarters are 50¢, three are 75¢ and four are 100¢, which is $1."), S("Dollars and quarters", chips("quarter", 4) + " = $1", "Every dollar is 4 quarters. So $3 is 4 + 4 + 4 = 12 quarters.")]),
    L("Fewest coins", M.fewestCoins(), [S("Use big coins", chip("quarter") + chip("dime"), "To make an amount with the fewest coins, use the biggest coins you can first."), S("Step by step", "41¢ = 25 + 10 + 5 + 1", "41¢: one quarter (25¢), then 16¢ is left. One dime, 6¢ left. One nickel, 1¢ left. One penny. That's 4 coins."), S("Tip", "💡", "Quarter, dime, nickel, penny. Take the biggest that fits, then repeat.")]),
    L("Coins and bills together", M.coinsBills(), [S("Bills are dollars", bill(5) + bill(1), "A $1 bill is 100¢. A $5 bill is 500¢. Count the bills first."), S("Then the coins", "500, 600, then 625, 635", "Count the bills, then count on with quarters, dimes and nickels."), S("Tip", "💡", "Write the total in cents. $1 = 100¢, so $6.35 is 635¢.")]),
    L("Which is worth more?", M.compareCoins(), [S("Groups of coins", chips("dime", 2) + " or " + chip("quarter"), "To compare two groups of coins, find the <b>total</b> for each group."), S("Total each group", "2 dimes = 20¢ · 1 quarter = 25¢", "Add up each group. Never guess by how many coins there are."), S("Then compare", "25 &gt; 20", "The bigger total is worth more. Here the quarter wins!")]),
    L("Change from 50¢", M.changeCents(50, 5), [S("What is change?", "50¢ − 35¢", "When you pay with more than the price, the store gives you the extra back. That is <b>change</b>."), S("Count up", "35 → 40 → 50", "Start at the price, 35¢. Count up to 40¢ (5 more), then up to 50¢ (10 more). Change is 15¢."), S("Or subtract", "50 − 35 = 15", "You can also subtract the price from what you paid.")]),
    L("Change from $1", M.changeCents(100, 5), [S("Paying with a dollar", bill(1), "A dollar is 100¢. If something costs 65¢ and you pay $1, you get change."), S("Count up to 100", "65 → 70 → 100", "From 65 go up to 70 (5¢), then to 100 (30¢). 5 + 30 = 35¢ change."), S("Check", "65 + 35 = 100 ✅", "The price plus the change should equal what you paid.")]),
    L("Change from $20", M.changeWhole([20]), [S("A bigger bill", bill(20), "A $20 bill is worth 20 dollars. When you pay with it, the store gives back the extra."), S("Count up", "13 → 20", "A toy costs $13. Count up from 13 to 20: that is 7 dollars of change."), S("Or subtract", "20 − 13 = 7", "Subtract the price from the bill. Then check by adding: 13 + 7 = 20.")]),
    L("Adding dollars to $50", M.addWhole(50), [S("Add prices", "📖 $23 + 🧢 $14", "To find the cost of two things, add their prices."), S("Tens, then ones", "20 + 10 = 30, 3 + 4 = 7, 30 + 7 = 37", "Add the tens first, then the ones, then put them together: $37."), S("Check", "37 − 14 = 23 ✅", "Subtract one price from your total. You should get the other price.")]),
    L("Subtracting dollars", M.subWhole(50), [S("Spending money", "$45 → buy a $12 toy", "When you buy something, you have less money afterwards."), S("Take away", "45 − 10 = 35, 35 − 2 = 33", "Take away the tens first, then the ones. You have $33 left."), S("Check", "33 + 12 = 45 ✅", "Add what is left to the price. You should get your starting money.")]),
    L("Allowance", M.allowance(), [S("What is allowance?", "💵 each week", "An <b>allowance</b> is money a family may give a child each week for helping out."), S("Same amount, again and again", "$3 + $3 + $3 + $3", "If you get the same amount each week, skip count. $3 for 4 weeks is 3, 6, 9, 12."), S("Tip", "💡", "Use your fingers to keep track of how many weeks you have counted.")]),
    L("Weeks to save", M.weeksToGoal(6, 8, false), [S("A saving plan", "🎯 $20 goal · $4 each week", "To reach a goal, save the same amount every week."), S("Count to the goal", "4, 8, 12, 16, 20", "Skip count by $4 until you hit $20. It took 5 counts, so 5 weeks."), S("Check", "5 × 4 = 20 ✅", "Multiply the weeks by the weekly amount. You should get the goal.")]),
    L("Bank balance", M.balance(false), [S("Your balance", "🏦", "The <b>balance</b> is how much money is in your bank account."), S("Deposit and withdraw", "deposit = in (+) · withdraw = out (−)", "A <b>deposit</b> puts money in, so the balance goes up. A <b>withdrawal</b> takes money out, so it goes down."), S("Example", "$30 + $10 = $40", "You have $30 and deposit $10. Now the balance is $40.")]),
    L("Saving goals", mq(SAVE4, H_MC), [S("A goal", "🎯", "A <b>saving goal</b> is something you want to buy later, so you put money aside."), S("Make a plan", "🐷 + 🐷 + 🐷", "Save a little each week. Small amounts add up over time."), S("Stay on track", "💪", "Waiting is hard, but when you reach your goal, you can buy it with money you saved yourself.")]),
    L("Jobs and pay", mq(JOB, H_MC), [S("Jobs", "👩‍🍳 👨‍🔧 👩‍🏫", "A <b>job</b> is work that people do to earn money. There are many kinds of jobs."), S("Pay", "💵", "Money you earn from working is called <b>pay</b>. People use it to buy what they need."), S("Customers", "🛒", "A <b>customer</b> buys things or services. Workers help customers, and customers pay.")]),
    L("Needs and wants", mq(NEED4, H_MC), [S("Needs first", "💧 🍲 🏠", "Needs keep us safe and healthy: water, food, clothes, a home."), S("Then wants", "🎮 🍦 🧸", "Wants are fun extras. They are okay too, after the needs are paid for."), S("A question to ask", "🤔", "Could I stay safe and healthy without it? If yes, it is a want.")]),
    L("Keeping money safe", mq(SAFE4, H_MC), [S("Private things", "🔒", "Passwords, PINs and card numbers are private. Only you and your parents should know them."), S("Tricks", "🎣", "Some online messages promise prizes or free coins to trick you into sharing private things."), S("What to do", "👨‍👩‍👧", "Stop. Do not reply. Tell a parent right away.")])
  ];
  l4.push(mixOf("Mixed practice", [l4[0], l4[1], l4[6], l4[8], l4[10]]));
  l4.push(mixOf("Level 4 Challenge", [l4[2], l4[3], l4[4], l4[5], l4[7], l4[9], l4[11], l4[12], l4[13]]));

  // ---------------- level 5 ----------------
  const l5 = [
    L("Money with a dollar sign", M.picChoice([1, 5], ["quarter", "dime", "nickel"], 700), [S("Dollars and cents", "$3.75", "We write money with a <b>$</b> sign and a <b>decimal point</b>. $3.75 is 3 dollars and 75 cents."), S("Count it up", bills(1, 3) + chips("quarter", 3), "Count the bills for the dollars. Then count the coins for the cents: 25, 50, 75."), S("Write it", "3 + 0.75 = $3.75", "Put the dollars before the point and the cents after it. Always use two digits for cents.")]),
    L("Writing money", M.writeMoney(), [S("Before and after the point", "$7.35", "Dollars come <b>before</b> the point. Cents come <b>after</b> it."), S("Say it", "7 dollars and 35 cents", "Read the left side as dollars, then say and, then read the right side as cents."), S("Careful", "$7.35 is not $35.07", "The order of the digits matters. Say the dollars first!")]),
    L("Which amount is bigger?", M.compareAmt(), [S("Compare dollars first", "$4.05 and $3.90", "Look at the dollars first. 4 dollars is more than 3 dollars, so $4.05 is more."), S("Same dollars?", "$4.50 vs $4.05", "If the dollars match, look at the cents. 50 cents is more than 5 cents."), S("Line them up", "4.50<br>4.05", "Put the decimal points in a line. Then compare from the left.")]),
    L("Adding cents", M.addCents(), [S("Add the cents", "35¢ + 28¢", "To add money in cents, add just like normal numbers."), S("Tens, then ones", "30 + 20 = 50, 5 + 8 = 13, 50 + 13 = 63", "Add the tens, add the ones, then put them together: 63¢."), S("Check", "63 − 28 = 35 ✅", "Subtract one part from the total. You should get the other part.")]),
    L("Subtracting cents", M.subCents(), [S("Spending cents", "80¢ − 35¢", "Spending means taking away."), S("Count back", "80 − 30 = 50, 50 − 5 = 45", "Take away the tens first, then the ones: 45¢ left."), S("Check", "45 + 35 = 80 ✅", "Add what is left to what you spent. You should get your starting amount.")]),
    L("Change from a dollar", M.changeCents(100, 1), [S("Change from $1", bill(1), "If you pay $1 (100¢), change is 100¢ minus the price."), S("Count up", "63 → 65 → 70 → 100", "From 63 go up to 65, then 70, then 100. 2 + 5 + 30 = 37¢ change."), S("Check", "63 + 37 = 100 ✅", "Price plus change makes 100¢, the dollar you paid.")]),
    L("Adding dollars to $100", M.addWhole(100), [S("Bigger prices", "🎒 $45 + 👕 $27", "Prices can be bigger numbers. We still just add them."), S("Tens, then ones", "40 + 20 = 60, 5 + 7 = 12, 60 + 12 = 72", "Add tens, add ones, then put them together: $72."), S("Check", "72 − 27 = 45 ✅", "Take one price away from the total to check.")]),
    L("Change from $50 and $100", M.changeWhole([50, 100]), [S("Big bills", "$50 · $100", "People also pay with $50 or $100 bills. Change works the same way."), S("Count up", "$38 → $40 → $50", "Price $38. Count up to $40 (2), then to $50 (10). Change is $12."), S("Check", "38 + 12 = 50 ✅", "Price plus change equals the bill you paid with.")]),
    L("Buying many", M.pricesQty(12), [S("Same price, many items", "✏️ $3 × 5", "If each item costs the same, multiply the price by how many you buy."), S("Skip count", "3, 6, 9, 12, 15", "5 pencils at $3 each: skip count by 3 five times to get $15."), S("Tip", "💡", "Multiplication is repeated adding.")]),
    L("Cost of one", M.unitPrice(9, 6), [S("Sharing the cost", "$12 for 4 pencils", "If 4 things cost $12 and each costs the same, divide to find one."), S("Divide", "12 ÷ 4 = 3", "Ask: 4 times what number makes 12? 4 × 3 = 12, so one costs $3."), S("Check", "4 × 3 = 12 ✅", "Multiply back to check.")]),
    L("Save, spend and share", M.splitMoney(), [S("Three jars", "🐷 🛒 🤝", "Many families use three jars: <b>save</b>, <b>spend</b> and <b>share</b>."), S("Split the money", "$20 = 5 + 8 + ?", "Add up the jars you know: 5 + 8 = 13. Then 20 − 13 = 7 goes in the last jar."), S("Half", "half of 12 = 6", "Half means splitting into two equal parts.")]),
    L("Saving up", M.weeksToGoal(6, 9, true), [S("A head start", "🎯 $30 goal · $10 saved", "Sometimes you already have some money. First find how much more you need."), S("What is left", "30 − 10 = 20", "Take away what you have from the goal. Then see how many weekly amounts make that."), S("Weeks", "20 ÷ 5 = 4", "Saving $5 a week, you need 4 weeks.")]),
    L("Lemonade stand profit", M.profit(false), [S("Money made", "🍋 7 cups × $2", "Money made is the number sold times the price: 7 × 2 = $14."), S("Costs", "supplies = $5", "Costs are what you spent to make and sell your things."), S("Profit", "14 − 5 = $9", "<b>Profit</b> is the money made minus the costs.")]),
    L("Bank interest", M.interest5(), [S("Interest", "🏦 + 💵", "Banks pay you a little extra, called <b>interest</b>, for keeping your money there."), S("Add it on", "$40 + $2 = $42", "Interest is added to your savings, so you end up with more."), S("Why save in a bank?", "🔒", "Your money is safe in the bank, and it can grow a little.")]),
    L("Goods and services", mq(GS5, H_MC), [S("Goods", "🍎 🧸 👟", "<b>Goods</b> are things you can hold, like apples, toys and shoes."), S("Services", "✂️ 🚌 🧑‍🏫", "<b>Services</b> are jobs people do for you, like cutting hair, driving a bus or teaching."), S("Who is who", "🏭 → 🛒", "A <b>producer</b> makes goods or gives services. A <b>consumer</b> buys and uses them.")]),
    L("Choices and trade-offs", mq(TRADE5, H_MC), [S("You can't have it all", "📖 or 🧩?", "Money is limited, so we often must <b>choose</b>. Picking one thing means giving up another."), S("Trade-off", "⚖️", "A <b>trade-off</b> is what you give up when you choose."), S("Choose well", "🤔", "Think about which choice you will enjoy or use the most. Compare prices and plan with a budget.")]),
    L("Shopping online safely", mq(ONLINE5, H_MC), [S("Always ask", "👨‍👩‍👧", "Online buying uses real money. Always ask a parent before you buy anything."), S("Pressure tricks", "⏰", "\"Hurry, last chance!\" messages try to rush you. Slow down and ask a parent."), S("Too good to be true", "🎁❓", "A huge prize for a tiny price may be a scam. Never share passwords.")]),
    L("Giving and charity", mq(GIVE5, H_MC), [S("Give", "🎁", "Giving is part of a money plan. You can give money, things or time."), S("Charities", "🥫 🐶", "Food banks and animal shelters use gifts to help people and animals."), S("Any amount helps", "🌱", "Even a small gift matters, especially when many people give.")])
  ];
  l5.push(mixOf("Mixed practice", [l5[0], l5[3], l5[5], l5[8], l5[10]]));
  l5.push(mixOf("Level 5 Challenge", [l5[1], l5[2], l5[4], l5[6], l5[7], l5[9], l5[11], l5[12], l5[13]]));

  // ---------------- level 6 ----------------
  const l6 = [
    L("Money up to $10", M.picChoice([1, 5], ["quarter", "dime", "nickel", "penny"], 1000), [S("Bills and coins", bill(5) + bill(1) + chip("quarter"), "Count the bills for dollars, then the coins for cents."), S("Dollars first", "5, 6, then 0.25", "A $5 bill and a $1 bill make $6. A quarter adds 25 cents: $6.25."), S("Write it", "$6.25", "Dollar sign, dollars, decimal point, two digits of cents.")]),
    L("Adding prices with cents", M.decAdd(2), [S("Line up the points", "$1.25<br>+$2.50", "Write the prices so the decimal points line up. Dollars with dollars, cents with cents."), S("Cents, then dollars", "25 + 50 = 75¢, 1 + 2 = 3", "Add the cents, then the dollars. The total is $3.75."), S("Carry", "90¢ + 30¢ = 120¢", "If the cents make 100 or more, that is 1 more dollar. 120¢ = $1.20.")]),
    L("Taking away with cents", M.decSub(), [S("Spending", "$5.00 − $2.35", "Subtract to find how much money is left after spending."), S("Count up", "$2.35 → $2.50 → $3 → $5", "Count up from the price to what you had: 15¢, 50¢, then $2. That is $2.65."), S("Check", "$2.65 + $2.35 = $5.00 ✅", "Add what is left to what you spent.")]),
    L("Change from $5, $10, $20", M.changeDec(), [S("Change with cents", bill(5), "Price $3.65, paid with $5. Count up to find the change."), S("Count up", "$3.65 → $3.70 → $4 → $5", "5¢ to reach $3.70, 30¢ to reach $4, then $1 to reach $5: $1.35."), S("Check", "$3.65 + $1.35 = $5.00 ✅", "Price plus change makes the bill.")]),
    L("Rounding to the dollar", M.roundDollar(), [S("Closest dollar", "$3.40 → $3", "To round, find the closest whole dollar. Look at the cents."), S("The 50 rule", "less than 50¢ → down · 50¢ or more → up", "$3.40 has 40¢, so it rounds down to $3. $3.60 has 60¢, so it rounds up to $4."), S("Why round?", "💡", "Rounding helps you guess a price quickly in your head.")]),
    L("Estimating totals", M.estimate(), [S("About how much", "$2.30 + $4.80", "Estimating means finding a number that is close, without exact math."), S("Round, then add", "$2 + $5 = $7", "Round each price to the nearest dollar, then add the whole numbers."), S("Why?", "🛒", "Estimating helps you check if you have enough money while you shop.")]),
    L("Sales and coupons", M.discount(), [S("Half off", "$20 → $10", "Half off means you pay half. Split the price into 2 equal parts."), S("Dollars off", "$25 − $5 = $20", "A coupon that takes $5 off means you subtract $5."), S("How much saved?", "$30 → $24 saves $6", "To see how much you saved, subtract the sale price from the old price.")]),
    L("Cost of one, cost of many", M.unitPrice(12, 9), [S("Cost of one", "6 for $18 → $3 each", "Divide the total by the number of items to find one."), S("Then multiply", "12 items = 12 × $3", "Once you know the cost of one, multiply to find any number of items."), S("Check", "6 × 3 = 18 ✅", "Multiply back to check your division.")]),
    L("Better buy", M.betterBuy(), [S("Compare packs", "Pack A or Pack B?", "Two packs can have different sizes and prices. Which is cheaper per item?"), S("Cost of one", "$12 ÷ 4 = $3 · $8 ÷ 2 = $4", "Divide each price by how many are in the pack."), S("Pick the lower", "$3 &lt; $4", "The lower cost for one item is the better buy.")]),
    L("Shopping list", M.decAdd(3), [S("Three items", "🍎 $1.25 · 🍞 $2.50 · 🧃 $0.75", "Add all the prices. Line up the decimal points."), S("Cents, then dollars", "25 + 50 + 75 = 150¢", "The cents make 150¢, which is $1.50. Carry the dollar!"), S("Finish", "1 + 2 + 0 + 1 = $4.50", "Add the dollars and the carried dollar to the cents: $4.50.")]),
    L("Making a budget", M.budget(), [S("Money in, money out", "💵 → 🛒", "A <b>budget</b> is a plan for money coming in (income) and going out (expenses)."), S("Add, then subtract", "20 + 5 − 10 = 15", "Add the money that came in. Subtract the money spent. What is left is yours to save."), S("Save first", "🐷", "Smart planners set aside savings before spending on wants.")]),
    L("Saving plan", M.savePlan(), [S("Two parts", "$10 saved + $4 a week", "You have a head start and you save more each week."), S("Find the new money", "$4 × 5 = $20", "Multiply the weekly amount by the number of weeks."), S("Add the start", "10 + 20 = $30", "Add the new savings to what you already had.")]),
    L("How long to reach a goal", M.weeksToGoal(15, 12, true), [S("Bigger goals", "🚲 $90", "Big goals take more weeks. A plan helps."), S("What is still needed", "90 − 30 = 60", "Take away what you already have from the goal."), S("Divide into weeks", "60 ÷ 10 = 6", "If you save $10 a week, 6 weeks get you there.")]),
    L("Profit and loss", M.profit(true), [S("Money made, money spent", "💵 − 🧾", "Business owners count money made and money spent."), S("Profit", "made $30, spent $12 → profit $18", "If you made more than you spent, the difference is <b>profit</b>."), S("Loss", "made $10, spent $14 → loss", "If you spent more than you made, it is a <b>loss</b>.")]),
    L("Interest on savings", M.interest6(), [S("Interest again", "🏦 $1 for every $10", "Some banks pay interest as a rate, like $1 for every $10 saved."), S("Count the tens", "$50 = five tens", "Find how many tens are in your savings. That is the dollars of interest."), S("Add it", "$50 + $5 = $55", "Your new total is your savings plus the interest.")]),
    L("Borrowing and loans", mq(LOAN6, H_MC), [S("Borrowing", "🤝 💵", "Borrowing means getting money that you must <b>pay back</b>."), S("Interest", "$10 → $12", "Banks often charge a fee, called <b>interest</b>, for lending money. You pay back more than you borrowed."), S("Be responsible", "✅", "Only borrow what you can pay back, and pay it back on time. Money owed is called <b>debt</b>.")]),
    L("Ads and smart shopping", mq(ADS6, H_MC), [S("Ads", "📺 📣", "Ads are made to make you <b>want</b> something. That is their job."), S("Sales", "🏷️", "A sale means a lower price, but it is only a good deal if you really need the thing."), S("Think first", "🤔", "Ask: Do I need it? Can I afford it? Is there a better price?")]),
    L("Money words", mq(WORDS6, H_MC), [S("Income and expenses", "⬆️ ⬇️", "<b>Income</b> is money that comes in. An <b>expense</b> is money you spend."), S("Budget", "📋", "A <b>budget</b> is a plan for your income and expenses."), S("Profit", "💰", "<b>Profit</b> is what is left of money made after you pay your costs.")])
  ];
  l6.push(mixOf("Mixed practice", [l6[1], l6[2], l6[3], l6[6], l6[9]]));
  l6.push(mixOf("Level 6 Challenge", [l6[0], l6[4], l6[5], l6[7], l6[8], l6[10], l6[11], l6[13], l6[14]]));

  Object.assign(MONEY_LEVELS, { 4: l4, 5: l5, 6: l6 });
})();
