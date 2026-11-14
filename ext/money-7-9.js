// ext/money-7-9.js  Mind Lab Money Skills levels 7-9 (60 lessons)
(() => {
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const BIG = [["📖", "book"], ["🧢", "cap"], ["🎒", "backpack"], ["⚽", "ball"], ["🎨", "paint set"], ["🧩", "puzzle"], ["🪁", "kite"], ["👕", "shirt"]];
  const COINS = { penny: { v: 1, size: 52, bg: "#c77b45" }, nickel: { v: 5, size: 58, bg: "#cfd3d9" }, dime: { v: 10, size: 46, bg: "#e8ebef" }, quarter: { v: 25, size: 66, bg: "#d4d8de" } };
  const chip = k => `<span class="coin" style="width:${COINS[k].size}px;height:${COINS[k].size}px;background:${COINS[k].bg}">${k}</span>`;
  const chips = (k, n) => Array.from({ length: n }, () => chip(k)).join("");
  const bill = d => `<span class="bill b${d}">$${d}</span>`;
  const bills = (d, n) => Array.from({ length: n }, () => bill(d)).join("");
  const worth = c => Object.keys(c).reduce((s, k) => s + (c[k] || 0) * COINS[k].v, 0);
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
  const nl = (fn, bad) => { let r, i = 0; do { r = fn(); } while (r.includes(bad) && i++ < 60); return r; };
  const mc = (ans, cands) => {
    const s = [ans];
    shuf(cands).forEach(x => { if (x > 0 && !s.includes(x) && s.length < 3) s.push(x); });
    for (let k = 1; s.length < 3; k++) { const x = ans + 10 * k; if (!s.includes(x)) s.push(x); }
    return { choices: shuf(s.map(dollars)), answer: dollars(ans) };
  };
  const near = t => [t + 100, t - 100, t + 10, t - 10, t + 50, t - 50, t + 25, t - 25];
  const mq = (items, hints) => () => { const it = pick(items); return { text: it.q, choices: shuf([it.a, ...it.w]), answer: it.a, hints }; };
  const said = a => a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
  const W = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  const picture = (bk, ck, maxC, minC) => {
    let b, c, t, tries = 0, cnt;
    do {
      b = {}; c = {};
      bk.forEach(k => { b[k] = ri(0, k === 1 ? 3 : 2); });
      ck.forEach(k => { c[k] = ri(0, k === "quarter" ? 3 : k === "penny" ? 4 : 3); });
      t = bk.reduce((s, k) => s + k * 100 * b[k], 0) + worth(c);
      cnt = bk.reduce((s, k) => s + b[k], 0) + ck.reduce((s, k) => s + c[k], 0);
      tries++;
    } while ((t > maxC || t < minC || cnt < 3 || cnt > 12) && tries < 800);
    const visual = bk.slice().sort((x, y) => y - x).map(k => bills(k, b[k])).join(" ") + " " + ck.slice().sort((x, y) => COINS[y].v - COINS[x].v).map(k => chips(k, c[k])).join("");
    return { t, visual };
  };
  // hints for finding a percent of an amount (words, so numbers in hints never clash with answers)
  const PH = p => {
    if (p === 50) return ["50% is the same as one half.", "Split the amount into two equal parts. One part is 50%."];
    if (p === 25) return ["25% is the same as one fourth.", "Split the amount into four equal parts. One part is 25%."];
    if (p === 75) return ["75% is three fourths.", "Find one fourth first (four equal parts), then take three of those parts."];
    if (p === 10) return ["10% is the same as one tenth.", "Divide the amount by ten."];
    if (p === 5) return ["5% is half of 10%.", "Find 10% by dividing by ten, then take half of that."];
    if (p === 1) return ["1% means one out of every one hundred.", "Divide the amount by one hundred."];
    if (p === 15) return ["15% is 10% plus 5%.", "Find 10% (divide by ten), find 5% (half of that), then add them."];
    return ["Start with 10%, which is one tenth of the amount.", `${p}% is ${W[p / 10]} lots of 10%. Multiply your 10% by ${W[p / 10]}.`];
  };

  // ---------------- question makers ----------------
  const M = {
    pic(bk, ck, maxC, minC) {
      return () => {
        const { t, visual } = picture(bk, ck, maxC, minC);
        const ex = nl(() => { const a = pick([5, 10, 20]), q = ri(1, 3), b = ri(1, 3); return `Example: a $${a} bill, a $1 bill and ${q} quarters${b > 1 ? " and " + b + " dimes" : ""}: ${a} + 1 = ${a + 1}, then ${q * 25 + (b > 1 ? b * 10 : 0)} cents more makes ${dollars((a + 1) * 100 + q * 25 + (b > 1 ? b * 10 : 0))}. Now do yours.`; }, dollars(t));
        return { text: "How much money is this?", visual, ...mc(t, near(t)),
          hints: ["Count the bills first for the dollars. Then count the coins for the cents.", "Add the bill values together. Then count the coins, biggest first, and write the total with a dollar sign and a decimal point.", ex] };
      };
    },
    addN(n, lo, hi, cap) {
      return () => {
        let pr, tot, tries = 0;
        do { pr = Array.from({ length: n }, () => 5 * ri(lo / 5, hi / 5)); tot = pr.reduce((s, x) => s + x, 0); tries++; } while (tot > cap && tries < 300);
        const it = shuf(BIG).slice(0, n), list = it.map((x, i) => `a ${x[1]} ${x[0]} for ${dollars(pr[i])}`);
        const ex = nl(() => { const e1 = 100 * ri(1, 6) + 5 * ri(1, 19), e2 = 100 * ri(1, 6) + 5 * ri(1, 19); return `Example: ${dollars(e1)} + ${dollars(e2)}. Cents: ${e1 % 100} + ${e2 % 100} = ${e1 % 100 + e2 % 100}. Dollars: ${Math.floor(e1 / 100)} + ${Math.floor(e2 / 100)} = ${Math.floor(e1 / 100) + Math.floor(e2 / 100)}. Put them together: ${dollars(e1 + e2)}. Now do yours.`; }, dollars(tot));
        return { text: `You buy ${said(list)}. How much is the total?`, ...mc(tot, near(tot)),
          hints: ["Add all the prices. Line up the decimal points so dollars sit with dollars and cents with cents.", "Add the cents first. If they make 100 or more, carry one dollar over to the dollars. Then add the dollars.", ex] };
      };
    },
    changeBig(bl) {
      return () => {
        const b = pick(bl), price = 5 * ri(20, b * 20 - 1), ch = b * 100 - price, [e, n] = pick(BIG);
        const ep = 5 * ri(20, 190), eb = 20;
        const ex = nl(() => `Example: price ${dollars(ep)}, paid with $${eb}. Count up to $${Math.ceil(ep / 100)}: ${dollars(Math.ceil(ep / 100) * 100 - ep)}. Then up to $${eb}: $${eb - Math.ceil(ep / 100)}. Add the jumps: ${dollars(eb * 100 - ep)}. Now do yours.`, dollars(ch));
        return { text: `A ${n} ${e} costs ${dollars(price)}. You pay with a $${b} bill. How much change do you get?`, visual: [5, 10, 20].includes(b) ? bill(b) : undefined, ...mc(ch, near(ch)),
          hints: ["Change is the bill minus the price.", "Count up from the price to the next whole dollar. Then count up from there to the bill. Add the jumps.", ex] };
      };
    },
    round10() {
      return () => {
        const d = ri(11, 99), c = ri(0, 99), x = d * 100 + c, ans = d % 10 >= 5 ? (Math.floor(d / 10) + 1) * 10 : Math.floor(d / 10) * 10;
        const ed = rx(11, 99, d);
        return { text: `Round ${dollars(x)} to the nearest $10. (Type the number of dollars.)`, answer: ans,
          hints: ["Rounding to the nearest ten means finding the closest multiple of ten. Look at the ones digit of the dollars.", "If the ones digit is 4 or less, go down to the ten below. If it is 5 or more, go up to the next ten.", `Example: $${ed}.50 has ${ed % 10} in the ones place. ${ed % 10 >= 5 ? "That is 5 or more, so go up to" : "That is 4 or less, so stay at"} $${ed % 10 >= 5 ? (Math.floor(ed / 10) + 1) * 10 : Math.floor(ed / 10) * 10}. Now round yours.`] };
      };
    },
    est3() {
      return () => {
        const p = Array.from({ length: 3 }, () => { let x; do { x = ri(101, 899); } while (x % 100 === 50); return x; });
        const r = p.reduce((s, x) => s + Math.round(x / 100), 0), it = shuf(BIG).slice(0, 3);
        const set = shuf([r + 1, r - 1, r + 2, r - 2].filter(x => x > 0)).slice(0, 2);
        return { text: `You want ${it.map((x, i) => `a ${x[1]} ${x[0]} (${dollars(p[i])})`).join(", ")}. About how much will all three cost?`, choices: shuf([r, ...set].map(x => "about $" + x)), answer: "about $" + r,
          hints: ["About means a close answer, not an exact one. Round each price first.", "Round each price to the nearest dollar (50 cents or more goes up). Then add the three whole numbers.", "Example: $1.30, $2.80 and $4.10 round to $1, $3 and $4. Then 1 + 3 + 4 = about $8. Now do yours."] };
      };
    },
    times(step, plo, phi, qlo, qhi) {
      return () => {
        const p = step * ri(plo, phi), q = ri(qlo, qhi), nm = pick(NM), it = pick([["pencils", "✏️"], ["stickers", "⭐"], ["erasers", "🧽"], ["cards", "🃏"], ["markers", "🖍️"], ["toy cars", "🚗"]]), tot = p * q;
        const ex = nl(() => { const ep = step * ri(plo, phi), eq = ri(2, 6); return `Example: ${eq} items at ${dollars(ep)}. Dollars: ${Math.floor(ep / 100)} × ${eq} = ${Math.floor(ep / 100) * eq}. Cents: ${ep % 100} × ${eq} = ${(ep % 100) * eq}. Add: ${dollars(ep * eq)}. Now do yours.`; }, dollars(tot));
        return { text: `${it[1]} ${nm} buys ${q} ${it[0]} at ${dollars(p)} each. What is the total cost?`, ...mc(tot, near(tot).concat([tot + 5, tot - 5])),
          hints: ["Every item costs the same, so multiply the price by how many you buy.", q > 10 ? "Break the number into tens and ones. Multiply the price by each part, then add the two answers." : "Multiply the dollars part, then the cents part, and add the two answers together (change cents over 100 into dollars).", ex] };
      };
    },
    share(lo, hi, nlo, nhi, stepC) {
      return () => {
        const per = stepC === 1 ? ri(lo, hi) : stepC * ri(lo / stepC, hi / stepC), n = ri(nlo, nhi), tot = per * n, nm = pick(NM), what = pick(["pizza", "snack", "movie ticket", "party"]);
        const ex = nl(() => { const ep = stepC === 1 ? ri(lo, hi) : stepC * ri(lo / stepC, hi / stepC), en = ri(2, 6); return `Example: ${dollars(ep * en)} shared by ${en} is ${dollars(ep * en)} ÷ ${en} = ${dollars(ep)}, because ${en} × ${dollars(ep)} = ${dollars(ep * en)}. Now do yours.`; }, dollars(per));
        return { text: `${n} friends share a ${dollars(tot)} ${what} bill equally. How much does each friend pay?`, ...mc(per, near(per).concat([per + 5, per - 5])),
          hints: ["Sharing equally means dividing.", "Change the money to cents and divide, or divide the dollars first and then the leftover. Check by multiplying back.", ex] };
      };
    },
    fracOff() {
      return () => {
        const f = pick([["one half", 2], ["one fourth", 4], ["one third", 3]]), p = 12 * ri(2, 8), off = p / f[1], [e, n] = pick(BIG), ep = 12 * rx(2, 8, p / 12);
        return { text: `A ${n} ${e} costs $${p}. It is ${f[0]} off. How many dollars do you pay?`, answer: p - off,
          hints: [`Find ${f[0]} of the price first. That is the part taken off.`, `Split the price into ${W[f[1]]} equal parts. One part is the amount taken off. Then subtract it from the price.`, `Example: $${ep} with ${f[0]} off. One of ${W[f[1]]} equal parts is $${ep / f[1]}. So you pay ${ep} − ${ep / f[1]} = $${ep - ep / f[1]}. Now do yours.`] };
      };
    },
    unit3() {
      return () => {
        const ns = shuf([2, 3, 4, 5, 6, 8, 10, 12]).slice(0, 3);
        let us; do { us = ns.map(() => 5 * ri(5, 30)); } while (new Set(us).size < 3);
        const it = pick(["pencils", "juice boxes", "apples", "erasers", "granola bars"]), tag = ["Pack A", "Pack B", "Pack C"];
        const lo = Math.min(...us), ans = tag[us.indexOf(lo)];
        return { text: `Which pack costs the LEAST for each one?<br>${ns.map((n, i) => `${tag[i]}: ${n} ${it} for ${dollars(n * us[i])}`).join("<br>")}`, choices: tag, answer: ans,
          hints: ["Compare the cost of ONE item in each pack, not the whole price.", "Divide each pack's price by the number of items in it. The smallest answer wins.", "Example: 2 for $5.00 is $2.50 each. 4 for $8.00 is $2.00 each. $2.00 is less, so the pack of 4 is the better buy. Now do yours."] };
      };
    },
    weekBudget() {
      return () => {
        const a = 5 * ri(4, 8), b = 5 * ri(2, 6), c = 5 * ri(1, 4), d = 5 * ri(1, Math.floor((a + b - c) / 5) - 1), nm = pick(NM);
        return { text: `${nm} gets $${a} allowance and earns $${b} doing chores. ${nm} spends $${c} on snacks and $${d} on a toy. How many dollars are left?`, answer: a + b - c - d,
          hints: ["Money coming in is income. Money going out is expenses.", "Add up all the money that came in. Add up all the money spent. Then subtract the spending from the income.", "Example: $20 and $5 come in. $6 and $4 are spent. Income is 25, spending is 10, and 25 − 10 = $15 left. Now do yours."] };
      };
    },
    monthsSave() {
      return () => {
        const s = 5 * ri(1, 10), m = ri(3, 15), k = ri(3, 9), nm = pick(NM), es = 5 * rx(1, 8, s / 5), em = rx(3, 9, m), ek = rx(3, 6, k);
        if (Math.random() < 0.5) return { text: `${nm} has $${s} saved and adds $${m} each month. How many dollars will ${nm} have after ${k} months?`, answer: s + m * k,
          hints: ["Two steps: find how much will be added, then add what is already saved.", `Multiply the monthly amount by ${k}, then add the amount saved so far.`, `Example: $${es} saved, plus $${em} a month for ${ek} months. ${em} × ${ek} = ${em * ek}, and ${es} + ${em * ek} = $${es + em * ek}. Now do yours.`] };
        return { text: `${nm} has $${s} saved and adds $${m} each month. ${nm} wants $${s + m * k}. How many months will it take?`, answer: k,
          hints: ["First find how much more is needed.", `Take away what ${nm} already has. Then see how many monthly amounts fit into what is left.`, `Example: goal $${es + em * ek}, have $${es}, save $${em} a month. Need ${em * ek}. ${em} × ${ek} = ${em * ek}, so ${ek} months. Now do yours.`] };
      };
    },
    hourly() {
      return () => {
        const r = ri(6, 12), h = ri(2, 6), nm = pick(NM), er = rx(6, 12, r), eh = rx(2, 6, h);
        if (Math.random() < 0.6) return { text: `${nm} earns $${r} an hour walking dogs. ${nm} works ${h} hours. How many dollars does ${nm} earn?`, answer: r * h,
          hints: ["Pay by the hour means the same amount for every hour.", `Multiply the pay for one hour by ${h}, the number of hours.`, `Example: $${er} an hour for ${eh} hours is ${er} × ${eh} = $${er * eh}. Now do yours.`] };
        return { text: `${nm} earns $${r} an hour. ${nm} needs $${r * h} for a new bike helmet. How many hours must ${nm} work?`, answer: h,
          hints: ["Find how many hourly pays fit into the amount needed.", `Divide the goal by the pay for one hour. Or skip count by ${r}s until you reach it.`, `Example: $${er * eh} needed at $${er} an hour. ${er} × ${eh} = ${er * eh}, so ${eh} hours. Now do yours.`] };
      };
    },
    profitMulti() {
      return () => {
        let p, n, s1, s2, rev, tries = 0;
        do { p = ri(1, 3); n = ri(15, 40); s1 = ri(5, 20); s2 = ri(3, 15); rev = n * p; tries++; } while (rev - s1 - s2 < 5 && tries < 100);
        const nm = pick(NM), it = pick([["cups of lemonade", "🍋"], ["cookies", "🍪"], ["bracelets", "📿"], ["paper airplanes", "✈️"]]), ex = rx(20, 50), ec = rx(5, 15);
        return { text: `${it[1]} ${nm} sells ${n} ${it[0]} for $${p} each. ${nm} paid $${s1} for supplies and $${s2} for a sign. How many dollars of profit did ${nm} make?`, answer: rev - s1 - s2,
          hints: ["Profit is the money made minus ALL the money spent.", "Find the money made first (number sold times the price). Then add up the costs and subtract them.", `Example: made $${ex}, costs were $${ec} and $${ec + 2}. Costs add to ${2 * ec + 2}, and ${ex} − ${2 * ec + 2} = $${ex - 2 * ec - 2}. Now do yours.`] };
      };
    },
    checkbook() {
      return () => {
        let s, d, c1, c2, tries = 0;
        do { s = 5 * ri(6, 30); d = 5 * ri(2, 12); c1 = 5 * ri(2, 10); c2 = 5 * ri(2, 10); tries++; } while (s + d - c1 - c2 < 5 && tries < 50);
        const nm = pick(NM);
        return { text: `${nm}'s bank account has $${s}. ${nm} deposits $${d}, then pays $${c1} by debit card and $${c2} by check. What is the new balance in dollars?`, answer: s + d - c1 - c2,
          hints: ["A deposit adds money. A debit card payment and a check take money out.", "Add the deposit. Then subtract each payment one at a time, in order.", "Example: start $60, deposit $10, pay $20 and $5. 60 + 10 = 70, 70 − 20 = 50, 50 − 5 = $45. Now do yours."] };
      };
    },
    // ---- level 8 ----
    tenPct() {
      return () => {
        const st = ri(0, 2), nm = pick(NM);
        if (st === 0) { const a = 10 * ri(2, 60), e = 10 * rx(2, 60, a / 10); return { text: `What is 10% of $${a}?`, answer: a / 10,
          hints: PH(10).concat([`Example: 10% of $${e} is ${e} ÷ 10 = $${e / 10}. Now do yours.`]) }; }
        if (st === 1) { const a = 100 * ri(1, 9), e = 100 * rx(1, 9, a / 100); return { text: `${nm} earns $${a}. What is 1% of that?`, answer: a / 100,
          hints: PH(1).concat([`Example: 1% of $${e} is ${e} ÷ 100 = $${e / 100}. Now do yours.`]) }; }
        const a = 20 * ri(2, 20), e = 20 * rx(2, 20, a / 20); return { text: `What is 5% of $${a}?`, answer: a / 20,
          hints: PH(5).concat([`Example: 10% of $${e} is ${e / 10}, and half of that is ${e / 20}. So 5% of $${e} is $${e / 20}. Now do yours.`]) };
      };
    },
    pctOff(pcts, step, lo, hi) {
      return () => {
        const p = pick(pcts), price = step * ri(lo, hi), off = price * p / 100, [e, n] = pick(BIG), ep = step * rx(lo, hi, price / step), eo = ep * p / 100;
        if (Math.random() < 0.6) return { text: `A ${n} ${e} costs $${price}. It is ${p}% off. How many dollars do you pay?`, answer: price - off,
          hints: [PH(p)[0] + " That is the part taken off.", PH(p)[1] + " Then subtract it from the price.", `Example: ${p}% off $${ep} takes off $${eo}. You pay ${ep} − ${eo} = $${ep - eo}. Now do yours.`] };
        return { text: `A ${n} ${e} costs $${price}. It is ${p}% off. How many dollars do you SAVE?`, answer: off,
          hints: PH(p).concat([`Example: ${p}% of $${ep} is $${eo}. Now do yours.`]) };
      };
    },
    tax(rates, step, lo, hi) {
      return () => {
        const r = pick(rates), price = step * ri(lo, hi), tx = price * r / 100, [e, n] = pick(BIG), ep = step * rx(lo, hi, price / step), et = ep * r / 100;
        if (Math.random() < 0.55) return { text: `A ${n} ${e} costs $${price}. The sales tax is ${r}%. What is the total you pay, in dollars?`, answer: price + tx,
          hints: ["Sales tax is extra money added to the price.", "Find the tax: take the percent of the price. Then add the tax to the price.", `Example: $${ep} with ${r}% tax. Tax is $${et}, and ${ep} + ${et} = $${ep + et}. Now do yours.`] };
        return { text: `A ${n} ${e} costs $${price}. The sales tax is ${r}%. How many dollars is the TAX?`, answer: tx,
          hints: ["Sales tax is a percent of the price.", "Take the percent of the price. Think about 1%, 5% or 10% pieces to build it.", `Example: ${r}% of $${ep} is $${et}. Now do yours.`] };
      };
    },
    tip(rates, step, lo, hi) {
      return () => {
        const r = pick(rates), b = step * ri(lo, hi), t = b * r / 100, nm = pick(NM), eb = step * rx(lo, hi, b / step), et = eb * r / 100;
        if (Math.random() < 0.5) return { text: `${nm}'s family meal costs $${b}. They leave a ${r}% tip. How many dollars is the tip?`, answer: t,
          hints: ["A tip is a percent of the bill.", PH(r)[1], `Example: a ${r}% tip on $${eb} is $${et}. Now do yours.`] };
        return { text: `${nm}'s family meal costs $${b}. They leave a ${r}% tip. What is the bill plus the tip, in dollars?`, answer: b + t,
          hints: ["Find the tip first, then add it to the bill.", PH(r)[1] + " Then add the tip to the bill.", `Example: $${eb} plus a ${r}% tip: tip is $${et}, total is ${eb} + ${et} = $${eb + et}. Now do yours.`] };
      };
    },
    unitSize(typed) {
      return () => {
        const sizes = shuf([8, 10, 12, 16, 20, 24]), n1 = sizes[0], n2 = sizes[1], it = pick(["ounces of cereal", "ounces of juice", "ounces of yogurt", "grams of rice"]);
        const unit = it.split(" ")[0];
        if (typed) { const n = pick([8, 10, 12, 16, 20, 25]), u = ri(12, 60), en = rx(4, 10); return { text: `A box with ${n} ${it} costs ${dollars(n * u)}. How many cents does ONE ${unit.replace(/s$/, "")} cost?`, answer: u,
          hints: ["Unit price means the price for one unit.", "Change the price to cents, then divide by the number of units.", `Example: ${en * 5} units cost ${dollars(en * 5 * 10)}, which is ${en * 5 * 10} cents. ${en * 5 * 10} ÷ ${en * 5} = ${10}¢ each. Now do yours.`] }; }
        let u1, u2; do { u1 = ri(15, 60); u2 = ri(15, 60); } while (u1 === u2);
        const ans = u1 < u2 ? "Box A" : "Box B";
        return { text: `Which is the better buy?<br>Box A: ${n1} ${it} for ${dollars(n1 * u1)}<br>Box B: ${n2} ${it} for ${dollars(n2 * u2)}`, choices: ["Box A", "Box B"], answer: ans,
          hints: ["A better buy costs less for each unit.", "Divide each box's price (in cents) by its number of units. Compare the two answers.", "Example: 10 units for $2.00 is 20¢ each. 8 units for $1.84 is 23¢ each. 20¢ is less, so the first box is the better buy. Now do yours."] };
      };
    },
    hourlyWeeks() {
      return () => {
        const r = ri(8, 15), h = ri(8, 20), w = ri(2, 6), nm = pick(NM), er = rx(8, 15, r), eh = rx(8, 20, h);
        const st = ri(0, 2);
        if (st === 0) return { text: `${nm} works ${h} hours a week at $${r} an hour. How many dollars does ${nm} earn in one week?`, answer: r * h,
          hints: ["Pay for a week is the hourly pay times the hours.", "Multiply the dollars per hour by the hours worked. Break the hours into tens and ones if it helps.", `Example: $${er} an hour for ${eh} hours is ${er} × ${eh} = $${er * eh}. Now do yours.`] };
        if (st === 1) return { text: `${nm} earns $${r} an hour and works ${h} hours each week. How many dollars is that in ${w} weeks?`, answer: r * h * w,
          hints: ["First find one week of pay. Then use the number of weeks.", "Multiply pay per hour by the hours to get a week. Then multiply that by the number of weeks.", `Example: $${er} an hour, ${eh} hours a week, 2 weeks: ${er} × ${eh} = ${er * eh}, then × 2 = $${er * eh * 2}. Now do yours.`] };
        const g = r * h * w, c = 5 * ri(2, 8);
        return { text: `${nm} earns $${r * h} a week. A bike costs $${g + c}, and ${nm} already has $${c}. How many weeks of pay does ${nm} need?`, answer: w,
          hints: ["Find how much more is needed after the money already saved.", "Take away what is saved. Then divide what is left by the pay for one week.", `Example: goal $${eh * 10 + 5}, have $5, earn $10 a week. Need ${eh * 10}, so ${eh} weeks. Now do yours.`] };
      };
    },
    simpleInt(rates, ys, ask) {
      return () => {
        const P = 100 * ri(1, 10), r = pick(rates), t = pick(ys), I = P * r * t / 100, nm = pick(NM);
        const eP = 100 * rx(1, 10, P / 100), et = pick(ys), eI = eP * r * et / 100;
        const whole = ask === "total" || (ask === "mix" && Math.random() < 0.4);
        const base = `${nm} puts $${P} in a savings account that pays ${r}% simple interest each year, for ${t} years.`;
        if (whole) return { text: `${base} How many dollars are in the account at the end?`, answer: P + I,
          hints: ["Simple interest is the same amount every year. Find the interest, then add it to the savings.", "Find one year of interest (the percent of the savings), multiply by the number of years, then add the savings.", `Example: $${eP} at ${r}% for ${et} years. One year is $${eP * r / 100}, ${et} years is $${eI}, and the total is ${eP} + ${eI} = $${eP + eI}. Now do yours.`] };
        return { text: `${base} How many dollars of interest is that in all?`, answer: I,
          hints: ["Find the interest for one year first.", "One year of interest is the percent of the savings. Then multiply by the number of years.", `Example: $${eP} at ${r}% for ${et} years. One year is $${eP * r / 100}, so ${et} years is $${eI}. Now do yours.`] };
      };
    },
    fracIncome() {
      return () => {
        const inc = 20 * ri(2, 12), f = pick([["one half", 2], ["one fourth", 4], ["one fifth", 5], ["one tenth", 10]]), nm = pick(NM), ei = 20 * rx(2, 12, inc / 20);
        if (Math.random() < 0.5) return { text: `${nm} earns $${inc} and saves ${f[0]} of it. How many dollars does ${nm} save?`, answer: inc / f[1],
          hints: [`${f[0]} means one of ${W[f[1]]} equal parts.`, `Divide the money into ${W[f[1]]} equal parts. How much is in one part?`, `Example: $${ei} split in ${W[f[1]]} equal parts gives $${ei / f[1]} in each part. So ${f[0]} of $${ei} is $${ei / f[1]}. Now do yours.`] };
        return { text: `${nm} earns $${inc} and saves ${f[0]} of it. How many dollars does ${nm} have left to spend?`, answer: inc - inc / f[1],
          hints: ["Find the saved part first. The rest is what can be spent.", `Divide the money into ${W[f[1]]} equal parts. One part is saved. Subtract it from the total.`, `Example: $${ei}, save ${f[0]}. The saved part is $${ei / f[1]}. ${ei} − ${ei / f[1]} = $${ei - ei / f[1]}. Now do yours.`] };
      };
    },
    profitItem() {
      return () => {
        let p, c, n, f, tries = 0;
        do { p = ri(3, 9); c = ri(1, p - 1); n = ri(10, 40); f = ri(5, 30); tries++; } while (n * (p - c) - f < 5 && tries < 100);
        const it = pick(["bracelets", "keychains", "cookies", "paper cranes"]), ep = rx(4, 9), ec = rx(1, ep - 1), en = rx(5, 12);
        return { text: `A stand makes ${it} for $${c} each and sells them for $${p} each. It sells ${n} and also paid $${f} to rent a table. How many dollars of profit?`, answer: n * (p - c) - f,
          hints: ["Profit is money made minus all costs. Here the costs are the making cost for each item and the table.", "Find the gain on ONE item (sale price minus making cost). Multiply by the number sold. Then subtract the table cost.", `Example: sell for $${ep}, make for $${ec}, sell ${en}, table $3. Gain per item ${ep - ec}. ${en} × ${ep - ec} = ${en * (ep - ec)}, minus 3 is $${en * (ep - ec) - 3}. Now do yours.`] };
      };
    },
    // ---- level 9 ----
    placeValue() {
      return () => {
        const d = ri(1, 9); let a, b; do { a = ri(1, 9); b = ri(1, 9); } while (a === b || a === d || b === d);
        const amt = `$${d}.${a}${b}`, st = ri(0, 3);
        if (st === 0) return { text: `In ${amt}, which digit is in the TENTHS place (the dimes)?`, choices: shuf([d, a, b]), answer: a,
          hints: ["The decimal point separates dollars from cents. Tenths are the first place after it.", "Look right after the decimal point. The first digit there is tenths, the second is hundredths.", "Example: in $5.82, the 8 is in the tenths place and the 2 is in the hundredths place. Now look at yours."] };
        if (st === 1) return { text: `In ${amt}, which digit is in the HUNDREDTHS place (the pennies)?`, choices: shuf([d, a, b]), answer: b,
          hints: ["Hundredths are the second place after the decimal point.", "Go past the decimal point, then move one more place to the right.", "Example: in $5.82, the 2 is in the hundredths place. Now look at yours."] };
        if (st === 2) return { text: `In ${amt}, how many cents does the digit ${a} stand for?`, answer: a * 10,
          hints: ["Find which place the digit is in. Tenths of a dollar are dimes.", "A digit in the tenths place is worth that many dimes. A dime is worth ten cents.", "Example: in $4.62, the 6 is in the tenths place, so it is 6 dimes. Now find yours in cents."] };
        return { text: `How many whole dimes are in ${amt}?`, answer: d * 10 + a,
          hints: ["A dollar has ten dimes.", "Multiply the dollars by ten, then add the dimes from the tenths place. Ignore the pennies.", "Example: in $2.37, there are 2 × 10 = 20 dimes from the dollars, plus 3 more. Now do yours."] };
      };
    },
    mult12() { return M.times(5, 30, 200, 11, 25); },
    pctOf() {
      return () => {
        const p = pick([10, 20, 25, 30, 40, 50, 60, 75]), a = 20 * ri(2, 15), nm = pick(NM), ea = 20 * rx(2, 15, a / 20), ev = ea * p / 100;
        const what = pick(["on books", "on snacks", "on a game", "on a gift"]);
        return { text: `${nm} gets $${a}. ${nm} spends ${p}% of it ${what}. How many dollars is that?`, answer: a * p / 100,
          hints: PH(p).concat([`Example: ${p}% of $${ea} is $${ev}. Now do yours.`]) };
      };
    },
    breakEven() {
      return () => {
        const g = ri(1, 5), u = ri(4, 30), c = ri(1, 5), p = c + g, f = g * u, it = pick(["smoothies", "lemonade cups", "greeting cards", "keychains"]), eg = rx(1, 5, g), eu = rx(4, 12, u);
        return { text: `A stand pays $${f} for a table and supplies. Each of its ${it} costs $${c} to make and sells for $${p}. How many must it sell just to break even (cover the $${f})?`, answer: u,
          hints: ["Break even means money made equals money spent.", "Find the gain on ONE item (sale price minus making cost). Then see how many gains it takes to cover the starting cost.", `Example: a $${eg * eu} cost, with a gain of $${eg} on each item. ${eg * eu} ÷ ${eg} = ${eu} items. Now do yours.`] };
      };
    },
    compound2() {
      return () => {
        const P = 100 * ri(1, 5), r = pick([10, 20]), y1 = P * (100 + r) / 100, y2 = y1 * (100 + r) / 100, nm = pick(NM), eP = 100 * rx(1, 5, P / 100);
        const st = ri(0, 2), base = `${nm} saves $${P} at ${r}% interest per year. The interest is added to the money each year, so the next year's interest is on the bigger amount.`;
        if (st === 0) return { text: `${base} How many dollars are in the account after 2 years?`, answer: y2,
          hints: ["Do it one year at a time. Year two starts with the new bigger amount.", "Find the interest for year one and add it. Then find the interest on that new total and add it again.", `Example: $${eP} at 10% for 2 years. Year one: ${eP} + ${eP / 10} = ${eP * 1.1}. Year two: ${eP * 1.1} + ${eP * 1.1 / 10} = $${eP * 1.21}. Now do yours.`] };
        if (st === 1) return { text: `${base} How many dollars of interest does ${nm} earn in the SECOND year?`, answer: y2 - y1,
          hints: ["The second year's interest is figured on the money at the start of year two.", "First find the total after year one. Then take the percent of that bigger total.", `Example: $${eP} at 10%. After year one: $${eP * 1.1}. Interest in year two is 10% of that, $${eP * 1.1 / 10}. Now do yours.`] };
        return { text: `${base} After 2 years, how many dollars of interest has ${nm} earned in all?`, answer: y2 - P,
          hints: ["Interest in all is the final total minus the amount you started with.", "Work out the total after two years, one year at a time. Then subtract the starting savings.", `Example: $${eP} at 10% grows to $${eP * 1.21} in 2 years. ${eP * 1.21} − ${eP} = $${eP * 1.21 - eP} of interest. Now do yours.`] };
      };
    },
    exchange() {
      return () => {
        const cur = pick(["zets", "pips", "marks", "gems"]), k = ri(2, 9), n = ri(2, 25), nm = pick(NM), ek = rx(2, 9, k), en = rx(2, 12, n), st = ri(0, 2);
        if (st === 0) return { text: `In the make-believe land of Zeta, $1 buys ${k} ${cur}. ${nm} swaps $${n}. How many ${cur} does ${nm} get?`, answer: n * k,
          hints: ["Each dollar buys the same number of the other money.", "Multiply the number of dollars by the number you get for one dollar.", `Example: if $1 buys ${ek} ${cur}, then $${en} buys ${en} × ${ek} = ${en * ek} ${cur}. Now do yours.`] };
        if (st === 1) return { text: `In the make-believe land of Zeta, $1 buys ${k} ${cur}. A toy costs ${n * k} ${cur}. How many dollars is that?`, answer: n,
          hints: ["Going the other way means dividing.", `Divide the ${cur} by how many you get for one dollar.`, `Example: ${en * ek} ${cur} at ${ek} per dollar is ${en * ek} ÷ ${ek} = $${en}. Now do yours.`] };
        const a = ri(5, 30), b = a + pick([-3, -2, -1, 1, 2, 3]);
        return { text: `In the make-believe land of Zeta, $1 buys ${k} ${cur}. A kite costs $${a} at Shop A and ${b * k} ${cur} at Shop B. Which shop is cheaper?`, choices: ["Shop A", "Shop B"], answer: a < b ? "Shop A" : "Shop B",
          hints: ["Change both prices into the same money before comparing.", `Change Shop B's price from ${cur} into dollars by dividing. Then compare the two dollar prices.`, `Example: $1 buys 4 ${cur}. A toy costs $10 at one shop and 36 ${cur} at another. 36 ÷ 4 = $9, so the second shop is cheaper. Now do yours.`] };
      };
    },
    budget503020() {
      return () => {
        const inc = 10 * ri(3, 40), nm = pick(NM), c = pick([["NEEDS (50%)", 50], ["WANTS (30%)", 30], ["SAVINGS (20%)", 20]]), ei = 10 * rx(3, 40, inc / 10);
        if (Math.random() < 0.7) return { text: `A popular plan splits money into 50% needs, 30% wants and 20% savings. ${nm} gets $${inc}. How many dollars go to ${c[0]}?`, answer: inc * c[1] / 100,
          hints: PH(c[1]).concat([`Example: with $${ei}, ${c[1]}% is $${ei * c[1] / 100}. Now do yours.`]) };
        return { text: `A popular plan splits money into 50% needs, 30% wants and 20% savings. ${nm} gets $${inc}. How many dollars are left for wants and savings together?`, answer: inc / 2,
          hints: ["Wants and savings together make one percent total. Add the two percents.", "Needs take half of the money. What is the rest?", `Example: with $${ei}, the needs take $${ei / 2}, so $${ei / 2} is left for the other two. Now do yours.`] };
      };
    },
    creditInt() {
      return () => {
        const B = 100 * ri(1, 8), r = pick([1, 2, 3, 5]), nm = pick(NM), eB = 100 * rx(1, 8, B / 100), er = pick([1, 2, 3, 5]);
        if (Math.random() < 0.5) return { text: `${nm} owes $${B} on a credit card that charges ${r}% interest each month. How many dollars of interest is added after one month?`, answer: B * r / 100,
          hints: ["Interest is a percent of the money you owe.", `Find ${r}% of the amount owed. Build it from 1% (divide by one hundred).`, `Example: ${er}% of $${eB} is $${eB * er / 100}. Now do yours.`] };
        return { text: `${nm} owes $${B} on a credit card that charges ${r}% interest each month. ${nm} pays nothing this month. How many dollars does ${nm} owe next month?`, answer: B + B * r / 100,
          hints: ["Find the interest first, then add it to what was owed.", `Interest is ${r}% of the amount owed. Divide by one hundred to find 1%, then multiply. Add that to the balance.`, `Example: owe $${eB} at ${er}% a month. Interest is $${eB * er / 100}, and ${eB} + ${eB * er / 100} = $${eB + eB * er / 100}. Now do yours.`] };
      };
    },
    pctChange() {
      return () => {
        const b = 20 * ri(2, 10), p = pick([10, 20, 25, 50]), up = Math.random() < 0.5, nw = b * (100 + (up ? p : -p)) / 100, nm = pick(BIG), eb = 20 * rx(2, 10, b / 20);
        const st = ri(0, 1);
        if (st === 0) return { text: `A ${nm[1]} ${nm[0]} cost $${b}. The price went ${up ? "UP" : "DOWN"} ${p}%. What is the new price in dollars?`, answer: nw,
          hints: [`Find ${p}% of the old price. Then ${up ? "add it to" : "subtract it from"} the old price.`, PH(p)[1] + ` Then ${up ? "add" : "subtract"}.`, `Example: $${eb} going ${up ? "up" : "down"} ${p}% changes by $${eb * p / 100}, so the new price is $${eb + (up ? 1 : -1) * eb * p / 100}. Now do yours.`] };
        const set = shuf([10, 20, 25, 50].filter(x => x !== p)).slice(0, 2);
        return { text: `A ${nm[1]} ${nm[0]} price ${up ? "went up" : "dropped"} from $${up ? b : nw} to $${up ? nw : b}. By what percent did it ${up ? "go up" : "drop"} ${up ? "(compared with the old price)" : "(compared with the old price)"}?`, choices: shuf([p, ...set].map(x => x + "%")), answer: p + "%",
          hints: ["Find how many dollars the price changed. Then compare that with the OLD price.", "Divide the change by the old price. Is it one half, one fourth, one fifth or one tenth of the old price?", "Example: a price goes from $40 to $50. It changed $10, and $10 is one fourth of $40, so it went up 25%. Now do yours."] };
      };
    },
    // placeholder for level 9 unit (typed or compare)
    unitMix() {
      const a = M.unitSize(true), b = M.unitSize(false);
      return () => (Math.random() < 0.5 ? a() : b());
    }
  };

  // ---------------- multiple-choice banks ----------------
  const NEED7 = [
    { q: "Opportunity cost is...", a: "The next best thing you give up when you choose", w: ["The price on the tag", "The change you get back"] },
    { q: "Sam has $15 for a game or a book. He picks the game. The book is his...", a: "Opportunity cost", w: ["Profit", "Interest"] },
    { q: "Which is a smart step before a big purchase?", a: "Compare prices in more than one place", w: ["Buy from the first store you see", "Never ask any questions"] },
    { q: "Scarcity means...", a: "There is not enough of something for everyone to have all they want", w: ["Something is free for everyone", "Something is very cheap"] },
    { q: "You need a coat for winter and want a poster. You can afford only one. What is a smart choice?", a: "The coat, because it is a need", w: ["The poster, because it is a want", "Neither one, ever"] },
    { q: "When lots of people want something that is hard to get, its price usually...", a: "Goes up", w: ["Goes down to zero", "Stays exactly the same"] },
    { q: "Which is a want?", a: "A fancy backpack when your old one works fine", w: ["Water to drink", "A coat in snow"] },
    { q: "Waiting a week to buy a game that is about to go on sale could...", a: "Save you money", w: ["Make the game free", "Always cost more"] }
  ];
  const PAY7 = [
    { q: "A debit card takes money from...", a: "Your bank account", w: ["The store's account", "Nowhere, it is free"] },
    { q: "A credit card lets you...", a: "Borrow money you must pay back", w: ["Spend money that is free", "Get gifts from the bank"] },
    { q: "Which way of paying uses money you already have?", a: "Cash", w: ["A credit card", "A loan"] },
    { q: "Who should know your bank PIN?", a: "Only you and a trusted parent", w: ["Your classmates", "Anyone who asks"] },
    { q: "You pay with a credit card but never pay the bill. What happens?", a: "You owe more because of interest", w: ["The store gives it free", "The debt disappears"] },
    { q: "A gift card is...", a: "A card with money to spend at certain stores", w: ["A loan from the bank", "Free money forever"] },
    { q: "Why keep a receipt?", a: "To show what you bought and paid", w: ["To hide the price", "To use as a coin"] },
    { q: "Why is a bank safer than a pocket for a lot of money?", a: "It is kept secure and tracked", w: ["It makes the money invisible", "It makes the money bigger"] }
  ];
  const SCAM7 = [
    { q: "A message says \"You won! Click here and type your card number.\" It is probably...", a: "A scam", w: ["A prize you earned", "A school lesson"] },
    { q: "A pop-up says your game account will be deleted unless you give your password. What do you do?", a: "Do not share it and tell a parent", w: ["Type it fast", "Send it to a friend"] },
    { q: "Why do scammers make you hurry?", a: "So you don't have time to think", w: ["Because they are polite", "Because they are tired"] },
    { q: "Which is a sign of a scam?", a: "Asking you to pay with gift cards", w: ["A store receipt", "A price tag"] },
    { q: "A stranger online says you get free game coins if you share your login. What is it?", a: "A trick", w: ["A fair deal", "A school rule"] },
    { q: "Which makes the strongest password?", a: "A long mix of letters, numbers and symbols", w: ["Your first name", "The numbers 1234"] },
    { q: "Should you use the same password for every account?", a: "No, use a different one for each", w: ["Yes, it is easier", "Yes, if it is short"] },
    { q: "A text from an unknown number asks you to send money. What do you do?", a: "Do not reply, and show a parent", w: ["Send a little", "Send all you have"] }
  ];
  const COMM7 = [
    { q: "Taxes are money people pay to...", a: "The government, to pay for shared things", w: ["A store, for candy", "A bank, for a loan"] },
    { q: "Which is paid for with taxes?", a: "Public roads", w: ["A private toy", "Your snack at a shop"] },
    { q: "A public library is paid for mostly by...", a: "Taxes from the community", w: ["One family", "Candy sales"] },
    { q: "Sales tax is added...", a: "At the register, to the price", w: ["To your bank balance", "To your allowance"] },
    { q: "Fire trucks and police cars are paid for mainly by...", a: "Taxes", w: ["Toy stores", "Gift cards"] },
    { q: "Volunteering your time is a way to...", a: "Help your community without spending money", w: ["Earn interest", "Pay sales tax"] },
    { q: "When a family buys food from a local farm, it helps...", a: "Keep money in the community", w: ["Close the farm", "Make prices fall to zero"] },
    { q: "Who decides how tax money is used?", a: "Leaders chosen by the community", w: ["Whoever has the most coins", "Nobody at all"] }
  ];
  const FIX8 = [
    { q: "Rent is called a fixed expense because...", a: "It is the same amount each month", w: ["It changes every day", "It is never paid"] },
    { q: "Which is a variable expense?", a: "Groceries", w: ["Monthly rent", "A set monthly phone fee"] },
    { q: "Which is a fixed expense?", a: "A monthly bus pass", w: ["Eating out", "Buying snacks"] },
    { q: "An emergency fund is money saved for...", a: "Surprise costs like repairs", w: ["Fun trips only", "Paying a friend back"] },
    { q: "If expenses are more than income, a person is...", a: "Spending more than they earn", w: ["Saving a lot", "Making a profit"] },
    { q: "Which budget step comes first?", a: "Write down your income", w: ["Spend everything", "Buy wants"] },
    { q: "To spend less on a variable expense, you can...", a: "Choose cheaper options", w: ["Pay more for the same thing", "Ignore the price"] },
    { q: "A good budget habit is to...", a: "Check it every month and adjust", w: ["Make it once and forget it", "Hide it from everyone"] },
    { q: "If money is short, which should you cut first?", a: "Wants, like eating out", w: ["Needs, like rent", "Needs, like medicine"] }
  ];
  const BANK8 = [
    { q: "A savings account is best for...", a: "Money you do not need right away", w: ["Daily snacks", "Paying cash at stores"] },
    { q: "A checking account is used for...", a: "Everyday spending and paying bills", w: ["Locking money away for years", "Making toys"] },
    { q: "What is an ATM?", a: "A machine that lets you get cash or deposit money", w: ["A type of loan", "A bank worker's title"] },
    { q: "A bank fee is...", a: "A charge for using a bank service", w: ["A free gift", "Interest you earn"] },
    { q: "In the United States, money in many banks is protected up to a limit by...", a: "The government", w: ["The store down the street", "Nothing at all"] },
    { q: "Why compare savings accounts?", a: "Some pay more interest than others", w: ["They all pay the same", "So you can pay more fees"] },
    { q: "A bank statement lists...", a: "Deposits, withdrawals and your balance", w: ["Your friends' names", "The weather"] },
    { q: "An overdraft happens when...", a: "You spend more than is in your account", w: ["You save too much", "You earn interest"] }
  ];
  const CREDIT8 = [
    { q: "A credit score shows...", a: "How well you pay back what you borrow", w: ["How tall you are", "How much cash you carry"] },
    { q: "Paying a credit card bill in full and on time avoids...", a: "Interest charges", w: ["Getting a receipt", "Paying for food"] },
    { q: "An interest rate on a loan is...", a: "A percent charged for borrowing", w: ["The size of the bank", "A kind of coin"] },
    { q: "Which loan costs less: 3% interest or 12% interest?", a: "3%", w: ["12%", "They cost the same"] },
    { q: "If you pay only the minimum on a credit card bill...", a: "It takes longer and you pay more interest", w: ["The debt vanishes", "You pay less in total"] },
    { q: "Borrowing for wants you cannot afford can lead to...", a: "Debt for a long time", w: ["Free money", "A bigger allowance"] },
    { q: "Why pay a loan on time?", a: "Late payments cost fees and hurt your credit score", w: ["Late payments earn prizes", "The bank forgets late payments"] },
    { q: "A lender is...", a: "Someone who gives a loan", w: ["Someone who borrows", "Someone who sells toys"] }
  ];
  const PAY8 = [
    { q: "Gross pay is...", a: "Pay before taxes are taken out", w: ["Pay after taxes", "Only the tips"] },
    { q: "Net pay is...", a: "The pay you take home after taxes", w: ["Pay before taxes", "Money you owe"] },
    { q: "Which is usually bigger?", a: "Gross pay", w: ["Net pay", "They are always equal"] },
    { q: "A salary is...", a: "A set amount paid for a year of work", w: ["Pay for one hour only", "A kind of tip"] },
    { q: "A wage is often paid...", a: "By the hour", w: ["Once in a lifetime", "By the mile"] },
    { q: "A tip is...", a: "Extra money for good service", w: ["A tax", "A loan"] },
    { q: "A raise means...", a: "More pay for the same work", w: ["Less pay", "A new tax"] },
    { q: "A job pays $12 an hour. How do you find pay for 4 hours?", a: "Multiply 12 by 4", w: ["Add 12 and 4", "Subtract 4 from 12"] }
  ];
  const INV9 = [
    { q: "A stock is...", a: "A small piece of ownership in a company", w: ["A loan to a friend", "A kind of coupon"] },
    { q: "Investing means...", a: "Putting money into something hoping it grows over time", w: ["Spending it on wants", "Hiding it and forgetting it"] },
    { q: "Risk in investing means...", a: "The value could go down as well as up", w: ["The profit is guaranteed", "The bank keeps it safe from change"] },
    { q: "Diversifying means...", a: "Spreading money across different investments", w: ["Putting it all in one thing", "Spending it all at once"] },
    { q: "How is saving different from investing?", a: "Savings are safer, but investments can grow more and can also lose", w: ["They are exactly the same", "Savings always lose money"] },
    { q: "A dividend is...", a: "A share of a company's profit paid to its owners", w: ["A fee for borrowing", "A kind of tax"] },
    { q: "Which is a good investing habit?", a: "Invest for many years instead of chasing a quick win", w: ["Follow a hot tip from a stranger", "Borrow money to invest"] },
    { q: "Someone promises huge, guaranteed returns with no risk. You should...", a: "Be very careful, it is probably a scam", w: ["Hand over your savings", "Tell all your friends to join"] }
  ];
  const H_MC = ["Read each choice slowly and think about what the words mean.", "Cross out the choices that are unsafe, unfair or do not make sense. Which one is left?", "Example: if the question is about keeping money safe, pick the choice that protects it and asks a parent when you are unsure."];

  // ---------------- level 7 ----------------
  const l7 = [
    L("Counting money to $30", M.pic([1, 5, 10], ["quarter", "dime", "nickel"], 3000, 700), [S("Bills and coins", bill(10) + bill(5) + bill(1) + chip("quarter"), "Count the bills first. A $10, a $5 and a $1 make 16 dollars. Then count the coins for the cents."), S("Count on", "10, 15, 16, then 16.25", "Say each bill, then count on with the quarters, dimes and nickels."), S("Write it", "$16.25", "Dollar sign, dollars, a decimal point, then two digits for cents.")]),
    L("Adding three prices", M.addN(3, 100, 1500, 3500), [S("Add them all", "$4.50 + $3.25 + $2.75", "To find a total for several things, add all the prices. Line up the decimal points."), S("Cents first", "50 + 25 + 75 = 150¢", "The cents make 150¢. That is 1 dollar and 50 cents, so carry 1 dollar."), S("Then dollars", "4 + 3 + 2 + 1 = $10.50", "Add the dollars and the carried dollar to the cents: $10.50.")]),
    L("Change from big bills", M.changeBig([20, 50]), [S("Paying with a bill", bill(20), "The bill is worth more than the price, so the store gives you change."), S("Count up", "$12.40 → $13 → $20", "Count up 60¢ to reach $13. Then count up $7 to reach $20. Add the jumps: $7.60."), S("Check", "$12.40 + $7.60 = $20.00", "Price plus change should equal the bill.")]),
    L("Rounding to the nearest $10", M.round10(), [S("Nearest ten", "$37.80 → $40", "Rounding to the nearest ten finds the closest multiple of ten dollars."), S("Look at the ones digit", "4 or less: down · 5 or more: up", "$37.80 has 7 in the ones place. That is 5 or more, so round up to $40."), S("Why?", "💡", "Rounding helps you guess prices quickly in your head.")]),
    L("Estimating a shopping total", M.est3(), [S("About how much?", "$1.30 + $2.80 + $4.10", "Estimating means finding an answer that is close without exact math."), S("Round each one", "$1 + $3 + $4", "Round each price to the nearest dollar. 50 cents or more goes up."), S("Add", "1 + 3 + 4 = about $8", "Add the rounded prices to get your estimate.")]),
    L("Price times quantity", M.times(25, 5, 24, 2, 8), [S("Same price, many items", "$1.75 × 4", "When every item costs the same, multiply the price by how many you buy."), S("Dollars and cents", "1 × 4 = 4 and 75 × 4 = 300¢", "Multiply the dollars and the cents separately. 300¢ is $3."), S("Add", "$4 + $3 = $7.00", "Put the two parts together for the total.")]),
    L("Sharing a bill", M.share(50, 400, 2, 6, 25), [S("Share equally", "$6.00 ÷ 4", "When friends share a bill equally, divide the total by the number of friends."), S("Use cents", "600 ÷ 4 = 150", "$6.00 is 600 cents. 600 ÷ 4 = 150 cents, which is $1.50 each."), S("Check", "4 × $1.50 = $6.00", "Multiply back to check your answer.")]),
    L("Fractions off", M.fracOff(), [S("Part of the price", "$24, one fourth off", "One fourth off means a fourth of the price is taken off."), S("Find the part", "24 ÷ 4 = 6", "Split the price into four equal parts. One part is $6."), S("Subtract", "24 − 6 = $18", "You pay the price minus the amount taken off.")]),
    L("Best price for one", M.unit3(), [S("Cost of one", "4 for $6.00", "To compare packs, find the price for ONE item in each pack."), S("Divide", "$6.00 ÷ 4 = $1.50", "Divide the price by the number of items."), S("Pick the smallest", "$1.50 &lt; $2.00", "The pack with the lowest cost for one item is the best buy.")]),
    L("Weekly budget", M.weekBudget(), [S("Money in", "💵 allowance + chores", "Add up all the money you receive. That is your income."), S("Money out", "🛒 snacks + toy", "Add up everything you spend. Those are your expenses."), S("What is left", "income − expenses", "Subtract spending from income to see what is left to save.")]),
    L("Saving over months", M.monthsSave(), [S("A saving plan", "$20 saved + $8 a month", "You start with some savings and add the same amount each month."), S("New money", "$8 × 5 = $40", "Multiply the monthly amount by the number of months."), S("Add the start", "$20 + $40 = $60", "Add the new savings to what you already had.")]),
    L("Earning by the hour", M.hourly(), [S("Hourly pay", "$8 an hour", "Many jobs pay a set amount for every hour you work."), S("Multiply", "$8 × 5 hours = $40", "Multiply the pay for one hour by the number of hours."), S("Work backwards", "$40 ÷ $8 = 5 hours", "To find the hours you need, divide the goal by the hourly pay.")]),
    L("Profit with more costs", M.profitMulti(), [S("Money made", "30 cups × $2 = $60", "Money made is the number sold times the price."), S("All the costs", "supplies $12 + sign $5 = $17", "Add up everything you spent to run the stand."), S("Profit", "60 − 17 = $43", "<b>Profit</b> is the money made minus all the costs.")]),
    L("Your bank balance", M.checkbook(), [S("Deposits and payments", "🏦", "A <b>deposit</b> adds money. A debit card payment or a check takes money out."), S("In order", "60 + 10 − 20 − 5", "Start with the balance. Add deposits. Subtract each payment."), S("Result", "= $45", "The new balance is what is left in the account.")]),
    L("Choices and opportunity cost", mq(NEED7, H_MC), [S("Limits", "💵", "We never have enough money for everything, so we choose. This is called <b>scarcity</b>."), S("Opportunity cost", "🎮 or 📖?", "The next best thing you give up when you choose is your <b>opportunity cost</b>."), S("Choose wisely", "🤔", "Needs come first. Compare prices, and wait for sales when you can.")]),
    L("Cash, debit and credit", mq(PAY7, H_MC), [S("Cash and debit", "💵 💳", "Cash and debit cards use money you already have. A debit card takes it from your bank account."), S("Credit", "💳", "A credit card is a loan. You must pay it back, and waiting can add interest."), S("Keep it safe", "🔒", "Keep your PIN secret and keep your receipts.")]),
    L("Spotting scams", mq(SCAM7, H_MC), [S("Too good to be true", "🎁❓", "Surprise prizes and free coins are often tricks to steal private information."), S("Pressure", "⏰", "Scammers say \"hurry!\" so you don't stop and think."), S("What to do", "👨‍👩‍👧", "Don't click, don't reply, don't share passwords. Show a parent.")]),
    L("Taxes and community", mq(COMM7, H_MC), [S("Taxes", "🏛️", "People pay <b>taxes</b> to the government. The money pays for things we share."), S("Shared things", "🛣️ 📚 🚒", "Roads, libraries, schools, fire trucks and parks are often paid for with taxes."), S("Sales tax", "🧾", "Sales tax is added to the price at the register.")])
  ];
  l7.push(mixOf("Mixed practice", [l7[0], l7[1], l7[2], l7[5], l7[6]]));
  l7.push(mixOf("Level 7 Challenge", [l7[3], l7[4], l7[7], l7[8], l7[9], l7[10], l7[11], l7[12], l7[13]]));

  // ---------------- level 8 ----------------
  const l8 = [
    L("Counting money to $100", M.pic([1, 5, 10, 20], ["quarter", "dime", "nickel", "penny"], 10000, 1500), [S("Big bills", bill(20) + bill(10) + bill(5), "Count the biggest bills first: $20, $10 and $5 make $35."), S("Then the rest", "35, then 36, then 36.50", "Add the $1 bills, then the coins. Quarters, dimes, nickels, pennies."), S("Write it", "$36.50", "Always give two digits for cents.")]),
    L("Adding bigger totals", M.addN(3, 500, 4000, 10000), [S("Line up", "$24.75<br>+ $13.50<br>+ $8.25", "Line up the decimal points. Add the cents column first."), S("Carry", "75 + 50 + 25 = 150¢", "150 cents is $1.50. Write the 50 and carry the 1 dollar."), S("Dollars", "24 + 13 + 8 + 1 = $46.50", "Add the dollars and the carried dollar: $46.50.")]),
    L("Change from $50 and $100", M.changeBig([50, 100]), [S("Big change", "$100 − $63.45", "Pay with a big bill and the change can be big too."), S("Count up", "$63.45 → $63.50 → $64 → $100", "5¢ to $63.50, then 50¢ to $64, then $36 to $100. Add: $36.55."), S("Check", "$63.45 + $36.55 = $100", "Price plus change equals the bill.")]),
    L("Price times quantity with cents", M.times(5, 30, 150, 3, 9), [S("Multiply a price", "$2.75 × 4", "Break the price into dollars and cents."), S("Two parts", "2 × 4 = 8 and 75 × 4 = 300¢", "Multiply each part by 4. 300¢ is $3."), S("Add", "$8 + $3 = $11.00", "Put the two answers together.")]),
    L("Dividing a bill", M.share(100, 500, 3, 8, 5), [S("Fair shares", "$9.60 ÷ 4", "Divide the total by the number of people sharing."), S("In cents", "960 ÷ 4 = 240", "$9.60 is 960 cents. 960 ÷ 4 = 240 cents, or $2.40."), S("Check", "4 × $2.40 = $9.60", "Multiply back to check.")]),
    L("Finding 10%, 5% and 1%", M.tenPct(), [S("What is a percent?", "10% = 10 out of 100", "Percent means out of one hundred. 10% is the same as one tenth."), S("10%", "10% of $60 = $6", "Divide by ten. Easy: move the digits one place."), S("5% and 1%", "5% of $60 = $3 · 1% of $600 = $6", "5% is half of 10%. 1% is dividing by one hundred.")]),
    L("Percent off", M.pctOff([10, 25, 50], 20, 2, 12), [S("A sale", "25% off $40", "A percent off means you take that percent of the price away."), S("Find the percent", "25% = one fourth, so $10", "Split $40 into four equal parts. One part is $10."), S("Subtract", "40 − 10 = $30", "You pay the price minus the part taken off.")]),
    L("Sales tax", M.tax([5, 10], 20, 2, 10), [S("Tax is extra", "$40 + 10% tax", "Sales tax is added on top of the price."), S("Find the tax", "10% of $40 = $4", "Take the percent of the price."), S("Add", "40 + 4 = $44", "The total is the price plus the tax.")]),
    L("Tips", M.tip([10, 20], 10, 2, 10), [S("What is a tip?", "🍽️", "A tip is extra money for good service, like at a restaurant."), S("Find the tip", "20% of $40", "10% of $40 is $4. 20% is two lots of 10%, so $8."), S("Total", "40 + 8 = $48", "The total is the bill plus the tip.")]),
    L("Unit price", M.unitSize(false), [S("Compare sizes", "Box A or Box B?", "Boxes come in different sizes. Compare the price for ONE unit, like one ounce."), S("Divide", "$2.00 ÷ 10 = 20¢ each", "Divide the price (in cents) by the number of units."), S("Pick the lower", "20¢ &lt; 23¢", "The lower cost per unit is the better buy.")]),
    L("Work, weeks and wages", M.hourlyWeeks(), [S("Weekly pay", "$10 × 12 hours = $120", "Multiply the hourly pay by the hours worked in a week."), S("More weeks", "$120 × 3 = $360", "Multiply a week of pay by the number of weeks."), S("To reach a goal", "goal ÷ weekly pay", "Divide what you still need by a week of pay.")]),
    L("Simple interest", M.simpleInt([2, 5, 10], [1, 2, 3], "mix"), [S("Interest", "🏦 $200 at 5%", "<b>Interest</b> is extra money from the bank. A rate like 5% is a percent of your savings per year."), S("One year", "5% of $200 = $10", "Find the percent of the savings for one year."), S("More years", "$10 × 3 = $30", "<b>Simple interest</b> is the same each year, so multiply by the years.")]),
    L("Parts of your income", M.fracIncome(), [S("Fractions of money", "one fourth of $60", "You can save a fraction of what you earn, like one half or one fourth."), S("Divide", "60 ÷ 4 = $15", "Split the money into equal parts. One part is the fraction."), S("What is left", "60 − 15 = $45", "Subtract the saved part to see what is left to spend.")]),
    L("Profit per item", M.profitItem(), [S("Gain on one", "sell $6 − make $2 = $4", "The gain on one item is the sale price minus the making cost."), S("All the items", "$4 × 10 = $40", "Multiply the gain by the number sold."), S("Other costs", "40 − 8 = $32 profit", "Subtract extra costs, like renting a table.")]),
    L("Fixed and variable costs", mq(FIX8, H_MC), [S("Fixed", "🏠", "A <b>fixed expense</b> is the same amount each month, like rent."), S("Variable", "🍎", "A <b>variable expense</b> changes, like groceries or fun."), S("Plan", "📋", "Pay fixed costs first, then plan the variable ones. Keep an emergency fund.")]),
    L("Banks and accounts", mq(BANK8, H_MC), [S("Two accounts", "🏦", "A <b>checking</b> account is for spending and bills. A <b>savings</b> account is for money you keep."), S("Tools", "🏧", "ATMs give cash and take deposits. Statements show your balance."), S("Watch out", "⚠️", "Banks may charge fees. Overdrafts happen when you spend more than you have.")]),
    L("Credit and debt", mq(CREDIT8, H_MC), [S("Borrowing", "🤝", "A <b>lender</b> gives a loan. You pay it back plus <b>interest</b>."), S("Rates", "3% vs 12%", "A lower interest rate costs you less."), S("Credit score", "📈", "A good score comes from paying on time. Late payments hurt it.")]),
    L("Paychecks", mq(PAY8, H_MC), [S("Gross and net", "💵 → 💵", "<b>Gross pay</b> is before taxes. <b>Net pay</b> is what you take home."), S("Wage and salary", "⏰ 📅", "A <b>wage</b> is pay by the hour. A <b>salary</b> is a set amount for the year."), S("Tips and raises", "⭐", "A tip is extra for good service. A raise is more pay for the same job.")])
  ];
  l8.push(mixOf("Mixed practice", [l8[0], l8[1], l8[3], l8[4], l8[5]]));
  l8.push(mixOf("Level 8 Challenge", [l8[2], l8[6], l8[7], l8[8], l8[9], l8[10], l8[11], l8[12], l8[13]]));

  // ---------------- level 9 ----------------
  const l9 = [
    L("Decimal place value", M.placeValue(), [S("Places after the point", "$3.47", "In $3.47, the 4 is in the <b>tenths</b> place (dimes). The 7 is in the <b>hundredths</b> place (pennies)."), S("What they are worth", "4 dimes = 40¢ · 7 pennies = 7¢", "A digit in the tenths place is worth that many dimes. A digit in the hundredths place is worth that many cents."), S("Dimes in a dollar", "10 dimes = $1", "To count whole dimes in $3.47: 3 × 10 = 30, plus 4 = 34 dimes.")]),
    L("Adding four prices", M.addN(4, 100, 4000, 20000), [S("Many prices", "$12.50 + $8.25 + $19.95 + $4.30", "Add them in pairs if it helps. Always line up the decimal points."), S("Pairs", "12.50 + 8.25 = 20.75 · 19.95 + 4.30 = 24.25", "Add two prices, add the other two, then add the two answers."), S("Final", "20.75 + 24.25 = $45.00", "Check by estimating: 13 + 8 + 20 + 4 is about 45.")]),
    L("Making change from $100 and $200", M.changeBig([100, 200]), [S("Counting up", "$100 − $37.80", "Count up from the price to the next dollar, then up to the bill."), S("Jumps", "$37.80 → $38 → $100", "20¢ to reach $38, then $62 to reach $100. Total: $62.20."), S("Check", "$37.80 + $62.20 = $100", "Price plus change is the bill.")]),
    L("Multiplying by bigger numbers", M.mult12(), [S("Break it up", "$3.50 × 12", "Break 12 into 10 and 2. Multiply by each part."), S("Two pieces", "$3.50 × 10 = $35 · $3.50 × 2 = $7", "Multiplying by 10 is easy. Then add the second piece."), S("Add", "$35 + $7 = $42", "Add the two answers.")]),
    L("Dividing money", M.share(105, 899, 3, 9, 1), [S("Divide dollars and cents", "$12.60 ÷ 6", "Change to cents: 1260 ÷ 6 = 210 cents, or $2.10."), S("Or in parts", "12 ÷ 6 = 2 and 60¢ ÷ 6 = 10¢", "Divide the dollars. Then divide the cents. Add the answers."), S("Check", "6 × $2.10 = $12.60", "Multiply back to check.")]),
    L("Percent of an amount", M.pctOf(), [S("Build from 10%", "10% of $80 = $8", "Divide by ten to find 10%."), S("Use pieces", "30% = 3 × $8 = $24", "A percent that is a multiple of ten is that many lots of 10%."), S("Fractions", "25% = one fourth, 50% = one half", "Some percents are easy fractions: 25% is a fourth, 50% is a half, 75% is three fourths.")]),
    L("Sale prices", M.pctOff([20, 30, 40, 60, 75], 20, 2, 15), [S("Percent off", "30% off $60", "Find the percent of the price. That is the savings."), S("Compute", "10% = $6, so 30% = $18", "Find 10%, then multiply by three."), S("Sale price", "60 − 18 = $42", "Subtract the savings from the price.")]),
    L("Sales tax", M.tax([4, 6, 8], 50, 1, 10), [S("Tax rates", "4%, 6%, 8%", "Different places have different sales tax rates."), S("Find the tax", "6% of $50 = $3", "1% of $50 is 50¢. 6% is six lots of 50¢, which is $3."), S("Total", "50 + 3 = $53", "Add the tax to the price.")]),
    L("Tips at 15% and 20%", M.tip([15, 20], 20, 2, 10), [S("Common tips", "15% and 20%", "Tips of 15% and 20% are common for good service."), S("15%", "15% of $40 = $4 + $2 = $6", "10% is $4. 5% is half of that, $2. Add them."), S("20%", "20% of $40 = $8", "20% is double 10%.")]),
    L("Unit price", M.unitMix(), [S("Price for one", "12 ounces for $3.00", "Unit price is the price for ONE unit, like one ounce."), S("Divide", "300¢ ÷ 12 = 25¢", "Change dollars to cents, then divide by the number of units."), S("Compare", "25¢ vs 24¢", "The lower unit price is the better buy.")]),
    L("Simple interest over years", M.simpleInt([3, 4, 5, 6], [2, 3, 4, 5], "mix"), [S("Simple interest", "P × rate × years", "Interest = savings × rate × years. The rate is a percent."), S("One year first", "$300 at 4% = $12", "Find 4% of $300. That is one year."), S("Many years", "$12 × 3 = $36", "Multiply by the number of years. The total is the savings plus this interest.")]),
    L("Compound interest", M.compound2(), [S("Interest on interest", "🏦 → 🏦", "With <b>compound interest</b>, last year's interest is added to the savings. Next year's interest is on the bigger amount."), S("Year one", "$100 at 10%: 100 + 10 = $110", "Find the interest and add it."), S("Year two", "110 + 11 = $121", "Interest is 10% of $110, which is $11. It grows faster than simple interest.")]),
    L("Exchange rates", M.exchange(), [S("Money from other lands", "$1 → 4 zets", "Different lands use different money. An <b>exchange rate</b> says how much of one money buys another."), S("Dollars to zets", "$5 × 4 = 20 zets", "Multiply the dollars by the rate."), S("Zets to dollars", "20 ÷ 4 = $5", "Divide to go the other way.")]),
    L("The 50/30/20 plan", M.budget503020(), [S("A plan", "50% · 30% · 20%", "Put 50% toward needs, 30% toward wants and 20% toward savings."), S("Find each part", "20% of $200 = $40", "Find 10% ($20) and double it."), S("Use it", "📋", "Try it with an allowance or a first job to see where your money goes.")]),
    L("Break-even point", M.breakEven(), [S("Start-up costs", "table + supplies = $24", "A business spends money first. It breaks even when it has earned that back."), S("Gain per item", "sell $5 − make $2 = $3", "Subtract the making cost from the sale price."), S("Break even", "24 ÷ 3 = 8 items", "Divide the start-up cost by the gain on one item.")]),
    L("Credit card interest", M.creditInt(), [S("Owing money", "💳", "If you do not pay your credit card bill in full, the bank charges interest on what you owe."), S("Monthly rate", "2% of $300 = $6", "Find the percent of the balance. 1% of $300 is $3, so 2% is $6."), S("It adds up", "$300 + $6 = $306", "The balance grows each month until it is paid.")]),
    L("Percent change", M.pctChange(), [S("Going up or down", "$40 → $50", "A price can rise or fall by a percent."), S("Find the change", "up 25% of $40 = $10", "Find the percent of the old price."), S("New price", "40 + 10 = $50", "Add the change if it went up, subtract it if it went down.")]),
    L("Investing and risk", mq(INV9, H_MC), [S("Investing", "📈", "To <b>invest</b> is to put money into something, like a company's <b>stock</b>, hoping it grows."), S("Risk", "⚖️", "Investments can go up or down in value. Savings are safer, but usually grow less."), S("Be smart", "🧠", "Spread money across many choices, think long term, and be careful of promises of guaranteed riches.")])
  ];
  l9.push(mixOf("Mixed practice", [l9[1], l9[2], l9[3], l9[4], l9[5]]));
  l9.push(mixOf("Level 9 Challenge", [l9[6], l9[7], l9[8], l9[10], l9[11], l9[12], l9[13], l9[14], l9[16]]));

  Object.assign(MONEY_LEVELS, { 7: l7, 8: l8, 9: l9 });
})();
